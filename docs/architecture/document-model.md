# Sane Notes — Document Model & CRDT Semantics

> **Audience:** a future autonomous coding agent (and any engineer) implementing `packages/sane_core`
> (document model + CRDT) with zero prior context.
> **Status:** foundational architecture. Normative. Every implementation of the document tree, the op-log,
> and the merge logic MUST conform to this file. Where this doc says **MUST/SHOULD/MAY**, read them as
> RFC 2119 keywords.
> **Owns:** the in-memory and on-the-wire *semantics* of a Sane Notes document — entities, ids, operations,
> clocks, conflict resolution, tombstones, garbage collection.
> **Does not own:** the byte layout on disk (→ [`./file-format.md`](./file-format.md)), how bytes move between
> devices (→ [`./sync.md`](./sync.md)), or how bytes are encrypted (→ [`./crypto.md`](./crypto.md)).
> **Decision record:** [`../adr/0005-document-model-and-crdt.md`](../adr/0005-document-model-and-crdt.md).
> **Primary evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
> (§2 CRDT libraries, §3 modeling ink, "Recommended data model").
> **Cross-links:** product vision → [`../product/vision-and-principles.md`](../product/vision-and-principles.md) ·
> stack decision → [`../adr/0001-flutter-single-codebase.md`](../adr/0001-flutter-single-codebase.md) ·
> threat model → [`../security/threat-model.md`](../security/threat-model.md).

---

## 0. TL;DR for the implementer

1. A Sane Notes workspace is a **tree of small, independently-syncable CRDT documents**, not one giant
   document. The unit of load/sync/merge is the **page**. This is the single most important decision:
   it bounds memory, file size, and merge cost (research §3 "Chunked / paged documents").
2. Everything that ever changes is expressed as an **operation** appended to a per-device, single-writer
   **op-log**. Operations are stamped with a **Hybrid Logical Clock (HLC)**. The op-log is the source of
   truth; in-memory objects and on-disk snapshots are derived, replayable views of it.
3. Three CRDT sub-models cover everything: an **add-wins Unique Set** (object membership, ink strokes),
   **LWW registers** (mutable scalar properties, resolved by HLC), and a **movable-list / movable-tree**
   (ordering and re-parenting via fractional-index position registers). Rich text is a fourth, specialised
   model: a **Peritext-style sequence CRDT**.
4. Deletion is a **tombstone op**, never a destructive erase. Tombstones drive Trash/undelete and are
   garbage-collected only after a bounded retention window *and* a causal-stability check.
5. We **build the CRDT ourselves in pure Dart** (`sane_core`), informed by Yjs/Automerge/Loro/Peritext,
   rather than binding a WASM/Rust library in v1. Rationale and exit criteria are in
   [ADR-0005](../adr/0005-document-model-and-crdt.md). A Rust core (Loro/Automerge via
   `flutter_rust_bridge`) is a sanctioned later optimisation, gated by the same triggers as
   [ADR-0001](../adr/0001-flutter-single-codebase.md).

---

## 1. Entity hierarchy

The hierarchy from the locked product decisions:

```
Workspace                         (one per app install; the root)
└── Profile*                      (multiple local profiles per device; guest is a Profile)
    └── Notebook*                 (subject / colour / cover / look)
        └── Page*                 (paper template; fixed-size | infinite | pdf-backed)
            └── Layer*            (z-ordered planes within a page)
                └── Object*       (Stroke | TextBlock | Image | Shape | AudioAnchor
                                   | Link | Sticker | Table)
```

Two structural CRDT documents realise this tree, plus one CRDT document per page:

| CRDT document | Scope | What it holds | CRDT type |
|---|---|---|---|
| **Library doc** | one per Profile | the Notebook→Page tree, ordering, and per-node metadata | movable-tree |
| **Page doc** | one per Page | that page's Layers and Objects, and the rich-text/ink state | composite (see §4) |
| **Workspace doc** | one per Workspace | Profiles list, device registry, workspace settings | movable-tree + LWW |

Rationale for splitting the library from page contents: opening the app, browsing, reordering, and renaming
must be instant and must sync cheaply even when the heavy page payloads are still evicted in the cloud
(research §3, §4; the Ink & Switch "no spinners" ideal). A 1,000-page notebook's *structure* is a few
hundred KB; its *contents* are gigabytes. They MUST NOT share a sync unit.

### 1.1 Identifiers

Every entity has a stable, globally-unique, location-independent id. Ids are **never** derived from
user-visible names (names are encrypted metadata; see [`./crypto.md`](./crypto.md) §"Metadata").

```dart
/// 128-bit identity: 64-bit device seed + 64-bit monotone local counter.
/// Rendered as 26-char Crockford base32 (no I,L,O,U) for logs/URLs.
/// Creation is inherently conflict-free: two devices creating at once mint
/// two different ids (research §3 "Immutable stroke objects in an add-wins set").
class ObjectId {
  final int deviceSeed;   // 64-bit, random per device install (NOT the syncing deviceId)
  final int localCounter; // 64-bit, ++ on every mint, persisted
  // toString() => Crockford base32 of the 16 bytes.
}
```

- `deviceSeed` is a random 64-bit value chosen once per install; it is distinct from the **`DeviceId`**
  used for op-log attribution (§3.2) so that a leaked object id reveals nothing about which physical
  device is syncing. (Trade-off: a determined attacker with many ids could cluster by `deviceSeed`; we
  accept this because ids live only inside encrypted payloads.)
- `localCounter` MUST be persisted (in the local drift DB) and survive crashes; on restart, seed it from
  `max(persisted, now-derived floor)`.
- **Do not** reuse `ObjectId`s. Ever. Tombstones keep dead ids reserved.

### 1.2 Entity field tables & type sketches

Field legend — **Kind** column:
`ID` = immutable identity · `IMM` = immutable after creation · `LWW` = Last-Writer-Wins register
(HLC-resolved) · `SET` = add-wins set membership · `POS` = fractional-index position register ·
`SEQ` = sequence-CRDT (rich text) · `DERIVED` = not stored, recomputed.

#### Workspace

| Field | Type | Kind | Notes |
|---|---|---|---|
| `id` | `ObjectId` | ID | singleton per install |
| `schemaVersion` | `int` | LWW | document-model schema (§9) |
| `profiles` | `Set<ObjectId>` | SET | add-wins set of Profile ids |
| `devices` | `Map<DeviceId, DeviceRecord>` | LWW-map | device registry (name, pubkey, lastSeenHlc) |
| `settings` | `Map<String, Value>` | LWW-map | workspace-wide prefs |
| `activeLookId` | `String` | LWW | default look/theme (see design tokens) |

```dart
class DeviceRecord {
  final DeviceId id;
  String displayName;          // LWW
  Uint8List signingPublicKey;  // IMM (Ed25519, see crypto.md)
  Hlc lastSeenHlc;             // LWW; drives GC causal-stability (§8)
  bool revoked;                // LWW; revoked device's future ops are rejected
}
```

#### Profile

| Field | Type | Kind | Notes |
|---|---|---|---|
| `id` | `ObjectId` | ID | |
| `displayName` | `String` | LWW | e.g. "Riya — College" |
| `avatarBlob` | `BlobRef?` | LWW | content-addressed image |
| `isGuest` | `bool` | IMM | guest profile is first-class; never requires identity |
| `notebooks` | tree | movable-tree | root of the Library doc for this profile |
| `trashRetentionDays` | `int` | LWW | default 30; bounds tombstone GC (§8) |
| `identityBinding` | `IdentityRef?` | LWW | optional link to a signed-in account (Google/Apple/MS/phone) — used only for sharing/entitlements, never to gate note-taking |

#### Notebook

| Field | Type | Kind | Notes |
|---|---|---|---|
| `id` | `ObjectId` | ID | |
| `title` | `String` | LWW | encrypted metadata |
| `colorToken` | `String` | LWW | references a design token, not a raw hex |
| `coverBlob` | `BlobRef?` | LWW | |
| `lookId` | `String` | LWW | one of the 17 looks |
| `parent` | `ObjectId?` | POS+LWW | parent node in the tree (null = top level); re-parenting is a move op |
| `position` | `FracIndex` | POS | order among siblings |
| `pages` | tree children | movable-tree | contained Pages (and sub-notebooks/sections) |
| `tags` | `Set<String>` | SET | add-wins tag set |
| `trashed` | `bool` | LWW | soft-delete flag; see also tombstone op |
| `deletedAt` | `Hlc?` | LWW | set when trashed; retention timer basis |

> Sections/subjects are modelled as Notebook nodes with a `kind` discriminator rather than a distinct
> entity, so the movable-tree handles arbitrary nesting uniformly (research "Recommended data model":
> "Notebooks, sections, pages, and their order/nesting").

#### Page

| Field | Type | Kind | Notes |
|---|---|---|---|
| `id` | `ObjectId` | ID | |
| `parent` | `ObjectId` | POS+LWW | owning Notebook/section |
| `position` | `FracIndex` | POS | order among siblings |
| `kind` | `PageKind` | IMM | `paged` \| `infinite` \| `pdfBacked` |
| `template` | `PaperTemplate` | LWW | ruling/grid/dots/cornell/music; colour; spacing |
| `size` | `PageSize` | LWW | for `paged`: A4/Letter/etc + orientation; ignored for `infinite` |
| `canvasBounds` | `Rect?` | DERIVED | for `infinite`: bounding box of content (recomputed) |
| `pdfRef` | `BlobRef?` | IMM | for `pdfBacked`: the source PDF blob (immutable) |
| `pdfPageIndex` | `int?` | IMM | which PDF page this Page renders over |
| `layers` | `List<ObjectId>` | movable-list | ordered Layer ids (z-order) |
| `background` | `ColorToken` | LWW | |
| `trashed` / `deletedAt` | `bool` / `Hlc?` | LWW | soft-delete |

```dart
enum PageKind { paged, infinite, pdfBacked }

class PaperTemplate {
  final String ruling;   // 'blank'|'lines'|'grid'|'dots'|'cornell'|'music'|'isometric'
  final String colorToken;
  final double spacingPt; // line/grid pitch in points
}
```

#### Layer

| Field | Type | Kind | Notes |
|---|---|---|---|
| `id` | `ObjectId` | ID | |
| `name` | `String` | LWW | "Ink", "Annotations", "Highlights" |
| `position` | `FracIndex` | POS | z-order within page |
| `visible` | `bool` | LWW | |
| `locked` | `bool` | LWW | |
| `opacity` | `double` | LWW | 0..1 |
| `objects` | `Set<ObjectId>` | SET | add-wins set of Object ids on this layer |

#### Object — common base

All drawable/placeable objects share a base. Only the **membership** of an object in its Layer is the
add-wins set; the object *record* itself is an LWW-register bundle keyed by `ObjectId`.

| Field | Type | Kind | Notes |
|---|---|---|---|
| `id` | `ObjectId` | ID | |
| `type` | `ObjectType` | IMM | `stroke`\|`text`\|`image`\|`shape`\|`audioAnchor`\|`link`\|`sticker`\|`table` |
| `layer` | `ObjectId` | LWW | which layer it belongs to (moving between layers is an LWW write + set-membership move) |
| `transform` | `Affine2D` | — | decomposed into independent registers below (research Principle 4: independence mirrors intent) |
| `x`, `y` | `double` | LWW (each) | position; **separate registers** so concurrent move+resize both survive |
| `scaleX`, `scaleY` | `double` | LWW (each) | |
| `rotation` | `double` | LWW | radians |
| `zIndex` | `FracIndex` | POS | order within the layer |
| `opacity` | `double` | LWW | |
| `groupId` | `ObjectId?` | LWW | grouping is a shared LWW register value |
| `createdHlc` | `Hlc` | IMM | from the create op |
| `locked` | `bool` | LWW | |

> **Principle 4 (independence).** `x`, `y`, `scaleX`, `scaleY`, `rotation` are *separate* LWW registers,
> never a single "transform" register. A concurrent *move* on device A and *rotate* on device B MUST both
> survive (research §3 "LWW properties", collaborative-image example). Never collapse them.

#### Stroke (the ink object)

The most performance-critical object. Its geometry is captured **once at creation and never mutated**
(research §3 "Immutable stroke objects"). The heavy sample data is offloaded to a content-addressed blob;
the CRDT holds only the id, a pointer, and mutable style registers.

| Field | Type | Kind | Notes |
|---|---|---|---|
| *(base fields)* | | | see Object base |
| `brushId` | `String` | IMM | preset id in `sane_brushes` (fountain/ballpoint/pencil/marker/highlighter/…) |
| `geometryRef` | `BlobRef` | IMM | multihash of the compressed sample stream (see below) |
| `pointCount` | `int` | IMM | denormalised for quick bounds/estimates |
| `bounds` | `Rect` | IMM | axis-aligned bbox of the raw samples (pre-transform) |
| `colorToken` | `ColorToken` | LWW | mutable *after* drawing (recolour) |
| `widthMul` | `double` | LWW | post-hoc width multiplier |
| `opacity` | `double` | LWW | |
| `erased` | `bool` | LWW/tombstone | see §5 for the add-wins erase semantics |

The **sample stream** referenced by `geometryRef` (stored as an immutable blob, spec in
[`./file-format.md`](./file-format.md) §"Stroke geometry blob"):

```dart
/// One captured sample. Matches the document model's Stroke point tuple:
/// x, y, pressure, tilt, azimuth, timestamp (locked decision 4).
class InkSample {
  final double x, y;       // page-space, f32 on disk
  final double pressure;   // 0..1, quantised u16 on disk
  final double tiltRad;    // altitude angle; u8 quantised
  final double azimuthRad; // barrel/orientation; u8 quantised
  final int tDeltaUs;      // microseconds since previous sample; varint on disk
}
```

Apple Pencil Pro / S Pen / USI extras (squeeze, barrel-roll, hover) that affect a stroke are captured into
the sample stream or a per-stroke sidecar at creation time (see
[`../research/sources/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md),
[`../research/sources/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md)); they
are IMM once captured.

#### TextBlock (rich text)

| Field | Type | Kind | Notes |
|---|---|---|---|
| *(base fields)* | | | |
| `content` | `RichTextCrdt` | SEQ | Peritext-style sequence CRDT (§4.2) |
| `width` | `double` | LWW | text box width; height is DERIVED from layout |
| `style` | `BlockStyle` | LWW | default font/size/colour token for the block |

#### Image / Sticker

| Field | Type | Kind | Notes |
|---|---|---|---|
| *(base fields)* | | | |
| `blobRef` | `BlobRef` | IMM | content-addressed image blob |
| `naturalSize` | `Size` | IMM | |
| `cropRect` | `Rect` | LWW | |
| `stickerId` | `String?` | IMM | for Sticker: preset id (else null) |

#### Shape (recognised / vector)

| Field | Type | Kind | Notes |
|---|---|---|---|
| *(base fields)* | | | |
| `shapeKind` | `ShapeKind` | LWW | line/rect/ellipse/arrow/polygon/path |
| `geometry` | `VectorPath` | LWW | control points; small enough to live inline, not in a blob |
| `stroke` | `StrokeStyle` | LWW | width token, colour token, dash |
| `fill` | `FillStyle?` | LWW | |
| `sourceStrokeId` | `ObjectId?` | IMM | if produced by shape recognition from a Stroke |

#### AudioAnchor (ink↔audio sync)

Powers Notability-style "tap ink to replay the moment it was written"
([`../research/sources/notability.md`](../research/sources/notability.md)).

| Field | Type | Kind | Notes |
|---|---|---|---|
| `id` | `ObjectId` | ID | |
| `recordingId` | `ObjectId` | IMM | the audio recording this anchors into |
| `audioMs` | `int` | IMM | offset into the recording |
| `targetId` | `ObjectId` | IMM | the Object (usually a Stroke) drawn at that instant |
| `pageId` | `ObjectId` | IMM | |

A **Recording** is itself an object: `{id, blobRef (encrypted Opus blob), durationMs, startedHlc, codec}`,
all IMM except a LWW `title`.

#### Link / Backlink

| Field | Type | Kind | Notes |
|---|---|---|---|
| `id` | `ObjectId` | ID | |
| `sourceId` | `ObjectId` | IMM | object or text-range anchor that owns the link |
| `target` | `LinkTarget` | LWW | `{kind: page|notebook|object|url|heading, ref}` |
| `label` | `String?` | LWW | |

Backlinks are **DERIVED**: never stored as their own edges. An index (`sane_search`) scans Link objects and
inverts them. This keeps the CRDT free of the "dangling edge on concurrent delete" class of bug — a link to
a tombstoned target simply renders as broken and is filterable.

#### Table

| Field | Type | Kind | Notes |
|---|---|---|---|
| *(base fields)* | | | |
| `rows` | movable-list | movable-list | ordered row ids |
| `cols` | movable-list | movable-list | ordered column ids |
| `cells` | `Map<(rowId,colId), CellRef>` | LWW-map | cell → TextBlock or Object id |
| `colWidths`, `rowHeights` | `Map<Id,double>` | LWW-map | |

Row/column insert/reorder use the same **movable-list** machinery as layers (§4.3); cell contents are
independent CRDT sub-documents so two people editing different cells never conflict.

---

## 2. Operations & the op-log

### 2.1 The op-log is the source of truth

Every mutation is an **operation** appended to the local device's append-only op-log. In-memory objects and
on-disk snapshots are *materialised views*: `state = fold(merge(all devices' op-logs))`. This is the
substrate that eg-walker and Automerge already use (research §3 "Op-logs with hybrid logical clocks") and is
what makes single-writer, conflict-free file sync possible ([`./sync.md`](./sync.md) §"single-writer").

### 2.2 Operation shape

```dart
class Op {
  final Hlc hlc;              // (physicalMs, logical, deviceId) — total order + causality
  final OpType type;         // registry-tagged; see below
  final ObjectId target;     // object the op applies to (or its container)
  final String? field;       // for setAttr: which LWW register
  final Value? value;        // new value / payload
  final List<Hlc>? deps;     // OPTIONAL explicit causal deps (see §2.4); usually empty
}
```

On-disk, an op is CBOR-encoded then framed and (for sync) AEAD-encrypted; the exact frame is in
[`./file-format.md`](./file-format.md) §"Op-log segment". Ops are **immutable and content-addressable**:
two devices that generate the "same" logical op still produce distinct records (distinct HLCs), which is
correct — CRDT merge dedups by effect, not by record identity.

### 2.3 Operation registry (v1)

| `OpType` | Applies to | Effect | CRDT rule |
|---|---|---|---|
| `createObject` | Layer/Page | mint an object, add id to container set | add-wins set add |
| `deleteObject` | object | tombstone the object | add-wins set remove (observed) |
| `setAttr` | object | set one LWW register `field := value` | LWW by HLC |
| `moveObject` | object | change `position`/`parent`/`layer` | LWW on POS register |
| `createNode` | tree | add Notebook/Page/Section node | movable-tree add |
| `moveNode` | tree | re-parent/reorder a node | movable-tree move (§4.3) |
| `deleteNode` | tree | tombstone a tree node (Trash) | tombstone + retention |
| `textInsert` | TextBlock | insert a run of characters | Peritext insert (§4.2) |
| `textDelete` | TextBlock | delete a character range | Peritext delete (tombstone) |
| `addMark` / `removeMark` | TextBlock | inline formatting span | Peritext mark (commutative) |
| `blockOp` | TextBlock | block structure (heading/list/table) | movable-list on blocks |
| `setKeyMeta` | Notebook/Page | encrypted-metadata LWW (title/tags) | LWW / add-wins set for tags |

**Registry discipline (forward-compat, §9):** each `OpType` has a stable integer tag. A device that
encounters an op tag it does not understand MUST (a) preserve the raw op verbatim, (b) refuse to run
compaction that would fold or drop it, and (c) surface an "update required to safely edit" state. It MUST
NOT silently skip an unknown op, because dropping an op breaks convergence.

### 2.4 Causality: do we need vector clocks?

The locked model says "per-object vector clocks (HLC)". We realise this as follows, and it is important to
get the nuance right:

- The **HLC itself carries enough causal information for LWW tie-breaking and human-ordered history**, but
  an HLC is a scalar, not a vector — it does *not* by itself prove "op B happened-after op A."
- For the CRDTs we use (add-wins set, LWW registers, movable-tree, Peritext), **strict causal delivery is
  not required for convergence**: these are designed to converge under arbitrary delivery order as long as
  every op is *eventually* delivered exactly once and total order is derivable (HLC gives the total order).
- Where we *do* need a happens-before edge (e.g. the movable-tree's cycle-avoidance uses the "last mover
  wins by timestamp" rule from *A Highly-Available Move Operation for Replicated Trees*), the HLC total
  order supplies it deterministically.
- We therefore keep a **per-device HLC vector at the sync layer** — `Map<DeviceId, Hlc>` = "the highest HLC
  I have durably merged from each device" — stored in the manifest. This vector is what a returning device
  diffs against to know which op-log segments it still needs (→ [`./sync.md`](./sync.md) §"catch-up"), and
  what the GC uses for causal stability (§8). Individual ops do **not** each carry a full vector clock (that
  would be O(devices) per op and is unnecessary); the optional `deps` field exists only for the rare op
  that must pin an explicit dependency, and is empty in the common path.

> **Decision:** "per-object vector clocks" in the product brief is implemented as **HLC total order per op
> + one HLC-vector watermark per device at the sync boundary**, which is equivalent for our CRDT set and far
> cheaper. Recorded as a risk-acknowledged refinement in [ADR-0005](../adr/0005-document-model-and-crdt.md).

---

## 3. Hybrid Logical Clocks (HLC)

### 3.1 Why HLC

We need a timestamp that (a) respects causality within a device's own stream, (b) stays close to wall-clock
so version history reads sensibly and LWW "latest edit wins" matches user intuition, and (c) tolerates the
clock skew that is guaranteed across a student's phone, tablet, and a borrowed lab machine (research §3
"Op-logs with hybrid logical clocks"). Pure Lamport clocks drift from wall time; pure wall clocks reorder
under skew. HLC is the standard answer (Kulkarni et al., 2014).

### 3.2 Representation

```dart
class Hlc implements Comparable<Hlc> {
  final int physicalMs;  // 48 bits used: Unix ms since epoch (good past year 10 000)
  final int logical;     // 16 bits: monotone counter within the same physicalMs
  final DeviceId device; // 128-bit tiebreak; also the op's author

  @override
  int compareTo(Hlc o) {
    // strict total order
    if (physicalMs != o.physicalMs) return physicalMs.compareTo(o.physicalMs);
    if (logical != o.logical) return logical.compareTo(o.logical);
    return device.compareTo(o.device); // deterministic final tiebreak
  }
}
```

On disk the `(physicalMs<<16 | logical)` pair packs into **8 bytes** big-endian (sorts lexicographically =
sorts by time); the 16-byte `DeviceId` follows. Total stamp = **24 bytes** uncompressed, typically ~3–6
bytes after columnar delta+varint encoding in a snapshot.

- `DeviceId` is a random 128-bit value minted at install, registered in `Workspace.devices` with the
  device's Ed25519 signing public key (see [`./crypto.md`](./crypto.md) §"Device identity"). It is the
  attribution author and the LWW final tiebreaker. It is distinct from `ObjectId.deviceSeed` (§1.1).

### 3.3 Update algorithm (normative)

```
// State per device: l = last physical seen, c = last logical.
now() -> current wall-clock ms.

on LOCAL event (generating a new op):
    l_old = l
    l = max(l_old, now())
    c = (l == l_old) ? c + 1 : 0
    if c overflows 16 bits: l += 1; c = 0        // borrow into physical
    emit Hlc(l, c, thisDevice)

on RECEIVE of remote op with stamp (l_m, c_m):     // during merge
    l_old = l
    l = max(l_old, l_m, now())
    if      l == l_old && l == l_m: c = max(c, c_m) + 1
    else if l == l_old:             c = c + 1
    else if l == l_m:               c = c_m + 1
    else:                           c = 0
    if c overflows 16 bits: l += 1; c = 0
```

**Clock-skew guard.** Reject/clamp a received stamp whose `physicalMs` exceeds `now()` by more than a
configurable `maxDrift` (default **60 s**): clamp `l` to `now() + maxDrift` and log an anomaly. This bounds
the damage a device with a wildly-wrong clock (or a malicious peer) can do to LWW ordering — otherwise a peer
that stamps year-2099 would win every LWW forever. See threat "Clock-skew LWW hijack" in
[ADR-0005](../adr/0005-document-model-and-crdt.md).

### 3.4 What HLC decides

- **LWW register winner:** the op with the greatest `Hlc` (by `compareTo`) wins; ties are impossible after
  the `DeviceId` tiebreak.
- **Peritext overlap resolution:** identical rule — greatest `opId`/`Hlc` wins on incompatible mark overlap
  (research §2 "Peritext").
- **Movable-tree move ordering:** the move with the greatest `Hlc` is the effective final parent/position.
- **Version-history timeline:** snapshots and the op tail sort by `physicalMs` for a human-readable timeline
  (→ [`./file-format.md`](./file-format.md) §"Version history").

---

## 4. CRDT semantics per model

Four CRDT models cover every entity. Each is small, well-understood, and independently testable.

### 4.1 Add-wins Unique Set (object membership, ink)

Used for: Layer→Object membership, Profile→Notebook set, tag sets, `Workspace.profiles`.

- **Add** = `createObject`/`createNode`/tag-add op; each element carries the `Hlc` of its add.
- **Remove** = `deleteObject`/tag-remove; an **observed-remove**: the remove records *which add-instances it
  saw* (by the added element's `Hlc`). An element is present iff it has at least one add whose `Hlc` is not
  covered by a remove.
- **Concurrent add vs remove → add wins** (research §3): if device A re-draws/creates while device B removes,
  the element survives, because B's remove could only observe adds it had already seen, not A's concurrent
  add. This gives the crucial "my stroke didn't vanish because you erased near it" property.
- Implementation: an OR-Set. To bound metadata we do not keep every add-tag forever; once a remove is
  causally stable (all devices have seen it, §8) the tombstone and its observed tags are GC-eligible.

```dart
class OrSet<T> {
  // element -> set of live add-tags (Hlc); empty set == absent (tombstoned)
  final Map<T, Set<Hlc>> _adds = {};
  final Map<T, Set<Hlc>> _removedTags = {};
  bool contains(T e) => (_adds[e]?.difference(_removedTags[e] ?? {}) ?? {}).isNotEmpty;
}
```

### 4.2 Rich-text sequence CRDT (Peritext-style)

Used for: `TextBlock.content`, table cell text, note titles are *not* rich (plain LWW string).

We implement the Peritext model (research §2 "Peritext") in Dart inside `sane_core`:

- **Characters** live in a plain-text sequence CRDT. Each character has a stable `opId = Hlc`. We use an
  RGA/Fugue-style causal-tree list so concurrent inserts interleave deterministically and minimise the
  "interleaving anomaly" (research: Loro's Fugue). Insert = `textInsert`, delete = `textDelete` (a
  per-character tombstone).
- **Formatting** is stored as **`addMark` span operations anchored to character ids** with a `before`/`after`
  anchor:
  - `before` anchor → the span **grows** when text is inserted at its boundary (correct for **bold/italic**:
    typing at the end of a bold run stays bold).
  - `after` anchor → the span does **not** grow (correct for **links/comments**: appended text is not part of
    the link). Getting this wrong is the classic link-expansion bug; the anchor choice is per mark type and
    is fixed in the mark registry.
- **Merge** = collect all ops from both sides, apply in `opId` (`Hlc`) order. Mark ops are **commutative**
  (they accumulate into per-gap op-sets). **Incompatible overlaps** (red vs blue highlight) resolve by
  **LWW on `opId`** — deterministic and convergent (research §2). Compatible marks (bold + italic) simply
  coexist.
- **Scope:** Peritext covers **inline** formatting only (bold/italic/underline/strike/colour/link/comment).
  **Block** structure (headings, list nesting, tables, callouts) is NOT Peritext — it lives in the
  movable-list block layer (§4.3), because Peritext is explicitly inline-only (research §2 "Limitation").

```dart
abstract class RichTextCrdt {
  void insert(int index, String text, Hlc at);
  void delete(int index, int length, Hlc at);
  void addMark(MarkType type, RangeAnchor start, RangeAnchor end, Value? attr, Hlc at);
  void removeMark(MarkType type, RangeAnchor start, RangeAnchor end, Hlc at);
  PlainSpans render(); // materialised runs for the editor
}
enum MarkGrowth { grows, fixed }   // 'before' vs 'after' anchoring, per MarkType
```

> **Library note.** A Dart port of Yjs exists (`y_crdt`, **verify** maintenance/coverage) and gives a
> control-character-based rich-text model with the largest editor-ecosystem lineage. Peritext's authors note
> that model is prone to certain overlap anomalies (research §2). We therefore implement the Peritext
> semantics directly rather than depend on Yjs's text model; if `y_crdt` proves production-solid it is an
> acceptable v1 shortcut for *plain* text with the anomaly risk documented. Automerge/Loro (via
> `flutter_rust_bridge`) ship Peritext-grade text natively and are the sanctioned Rust-core upgrade path
> ([ADR-0005](../adr/0005-document-model-and-crdt.md)).

### 4.3 Movable list & movable tree (ordering, re-parenting)

Used for: the Notebook→Page tree (movable-tree), Layer z-order, block order, table rows/cols (movable-list).

- **Position = fractional index.** Each ordered element holds an **LWW register storing a fractional-index
  string** (research §3 "Reordering uses list-with-move"). To move an element, write a new fractional index
  strictly between its new neighbours; only the position register changes, so a concurrent move+edit both
  survive. Two concurrent moves to the "same" gap produce two distinct indices that sort deterministically
  (tiebreak by `Hlc.device`), then converge — no broken/empty references (the failure mode Yjs's
  delete+insert reordering suffers, research §2).
- **Tree re-parenting** additionally uses the **movable-tree** rule from *A Highly-Available Move Operation
  for Replicated Trees* (research §2, Loro's Movable Tree): a `moveNode(node, newParent, pos)` op sets the
  node's parent register (LWW by `Hlc`). To prevent cycles under concurrency (A moves X under Y while B moves
  Y under X), at fold time we detect any cycle and **undo the lower-`Hlc` move of the cycle** (deterministic
  because `Hlc` totally orders the moves). This is the standard, proven algorithm; do not invent a variant.

```dart
/// Fractional index between two neighbours. Port of the well-known
/// `fractional-indexing` algorithm (base-62/95 string keys). No canonical
/// Dart package as of writing — port from the JS reference. (verify)
class FracIndex implements Comparable<FracIndex> {
  final String key; // e.g. "a0", "a0V", ... ; lexicographic order == list order
  static FracIndex between(FracIndex? lo, FracIndex? hi, DeviceId tiebreak);
}
```

### 4.4 LWW registers & LWW-maps

Used for: every scalar mutable property (colour, width, visibility, title, settings…).

- A register stores `(value, Hlc)`. A `setAttr` with a greater `Hlc` overwrites. Reads return the current
  value. This is the simplest CRDT and covers the bulk of fields.
- **LWW-map** = a map whose keys are managed by an OR-Set (add-wins) and whose values are LWW registers.
  Used for `settings`, `devices`, table cells, `colWidths`.
- **Independence rule (repeat, because it is violated constantly):** never bundle independent user intents
  into one register. `x` and `y` are two registers, not one `point`. `stroke.colorToken` and
  `stroke.widthMul` are two registers. Bundling causes one user's concurrent change to clobber another's
  unrelated change (research §3, Weidner Principle 4).

---

## 5. Ink erase semantics (a worked example)

Ink erase deserves its own section because it is the most-noticed correctness surface for a pen app and the
research calls it out specifically.

Two erase modes, both expressed without ever mutating a stroke's geometry:

1. **Object eraser** ("erase whole stroke"): a `deleteObject(strokeId)` op → observed-remove from the layer
   set. Concurrent redraw-vs-erase resolves **add-wins** (§4.1): a stroke the other device was still drawing
   is not deleted.
2. **Pixel/segment eraser** ("erase part of a stroke"): geometry is immutable, so we **do not** edit the
   original stroke. Instead we (a) tombstone the original stroke and (b) `createObject` one or two *new*
   strokes for the surviving fragments, referencing new geometry blobs. The split is a local, deterministic
   geometric operation; because it is expressed as delete+create ops, it merges cleanly and undo simply
   reverses the three ops. (Trade-off: heavy pixel-erasing on a huge stroke creates churn; mitigate by
   coalescing rapid erases into one op batch before commit.)

`Stroke.erased` LWW exists only as a fast-path soft-hide for the object eraser before compaction folds it
into the set removal; the set membership is authoritative.

---

## 6. Attachments & content addressing

Heavy, immutable payloads (ink sample streams, PDFs, images, audio) are **never** stored inside the CRDT.
They are **content-addressed blobs**: hash the plaintext → `BlobRef`; the CRDT holds only the ref + metadata
(research §8).

```dart
class BlobRef {
  final Multihash hash;  // BLAKE3-256 of the *plaintext* (see note); multihash-prefixed
  final int size;        // plaintext bytes
  final String mime;     // 'application/ink-v1', 'application/pdf', 'audio/opus', 'image/webp', ...
}
```

- **Immutable + content-addressed ⇒ free dedup, trivial caching, zero merge conflicts** (a blob never
  changes; two devices that capture identical bytes converge on one blob) — research §8.
- **Hash-of-plaintext vs hash-of-ciphertext.** Hash-of-plaintext gives cross-device dedup but is a
  *confirmation oracle* (an attacker who guesses a file can confirm its presence). We default to
  **hash-of-plaintext for dedup within a single user's own store** (the attacker model there is weak) and
  document the trade-off; the cloud filename is a *separate* random id, not the hash, so the drive never sees
  the content hash (→ [`./crypto.md`](./crypto.md) §"Metadata", [`./sync.md`](./sync.md) §"naming"). Each
  blob is encrypted under its own random content key.
- **Lifecycle:** a blob is live while any object references it; reference-counting is DERIVED from the folded
  state. Unreferenced blobs are GC-eligible after the Trash retention window (§8, research §8 "Garbage
  collection").

---

## 7. Size model — a 60-minute lecture (5,000 strokes + audio)

Worked estimate for the canonical stress case (a full lecture page with continuous audio). Numbers are
engineering estimates for capacity planning and the perf budgets in the product brief; treat exact bytes as
**verify-with-a-benchmark**, the *orders of magnitude* as load-bearing.

Assumptions: 5,000 strokes, ~40 samples/stroke average (short handwriting strokes), 240 Hz capture on
ProMotion; audio = 60 min mono voice.

| Component | Model | Raw | Stored (compressed) |
|---|---|---|---|
| Ink samples | 5,000 × 40 × ~13 B/sample (x,y f32; pressure u16; tilt/az u8; t varint) | ~2.6 MB | **~0.6–1.0 MB** (delta+zigzag varint + zstd; ink compresses ~3–5×) |
| Stroke CRDT metadata | 5,000 × (id 16B + createHlc 8B + brushId + colour/width/opacity LWW w/ HLCs + z-index) ≈ 70 B | ~0.35 MB | **~0.2 MB** (columnar) |
| Audio (Opus mono) | 24 kbps × 3600 s → recommend 24–32 kbps for lecture voice | — | **~11–14 MB** |
| Audio anchors | ~1 per few seconds, say 800 × ~40 B | ~32 KB | **~20 KB** |
| Thumbnails / preview | 1 page WebP + tile cache | — | **~0.1–0.3 MB** |
| Op-log tail (pre-compaction) | ~5,000 create + ~5,000 style/z ops × ~60 B | ~0.6 MB | folds into snapshot on compaction |
| **Page bundle total** | | | **~12–16 MB**, dominated by audio |

Read-outs for design:

- **Audio dominates** by ~10×. The ink itself is small. This validates offloading audio to a
  content-addressed, lazily-synced, chunk-encrypted blob (research §8) and *not* forcing its download to
  open the page.
- A **1,000-page notebook** of similar pages ≈ 12–16 GB if every page had an hour of audio — obviously
  atypical, but it confirms: (a) the Library doc (structure only) must stay independent and tiny; (b)
  attachments must be lazy-fetch with an LRU cache; (c) the cloud quota UX must be first-class
  ([`./sync.md`](./sync.md) §"quota").
- The **mergeable CRDT document for the page is ~1 MB** even with 5,000 strokes, because geometry is
  offloaded. Merging and loading 1 MB is well within the perf budgets; loading 14 MB of audio is not, hence
  lazy.

---

## 8. Tombstones, retention & garbage collection

Deletion is a **tombstone op**, never a destructive erase (research §9 "Trash / undelete"). This is what
makes "device A deletes while device B edits" safe and what powers Trash/undelete.

### 8.1 Tombstone lifecycle

```
live ──delete op──▶ trashed (visible in Trash, retention timer starts at deletedAt Hlc)
trashed ──restore op──▶ live         (undelete = LWW un-set of `trashed`)
trashed ──(retention elapsed AND causally stable)──▶ GC-eligible ──compaction──▶ purged
```

- **Retention window** = `Profile.trashRetentionDays` (default 30). A tombstone younger than the window is
  never purged, so Trash always shows recent deletions on every device.
- **Causal stability gate.** A tombstone (and the OR-Set add-tags it subsumed, and any blob it orphaned) may
  be *physically purged* only once it is **causally stable**: every registered, non-revoked device's
  `lastSeenHlc` in `Workspace.devices` is `≥` the tombstone's `Hlc`. Otherwise a device that has been offline
  since before the delete could resurrect the object on next sync (the OR-Set "concurrent add wins" rule
  would treat its stale add as concurrent). This is the standard CRDT GC safety condition and it is
  **mandatory** — purging early causes data resurrection bugs.
- **Never-seen devices.** A device that has not synced for `> staleDeviceDays` (default 180) and is not the
  purging device is treated as *stale*: the UI may prompt to "remove old device" (drops it from
  `Workspace.devices`), which unblocks GC. Removing a device is itself an op.

### 8.2 What gets GC'd

| Artefact | Purge condition |
|---|---|
| OR-Set add-tags of a removed element | element removed **and** removal causally stable |
| Text-character tombstones | delete causally stable (fold into a compacted snapshot) |
| Trashed tree nodes & their subtrees | retention elapsed **and** causally stable |
| Orphaned content-addressed blobs | zero live refs for a full retention window **and** stable |
| Old op-log segments | fully folded into a newer snapshot **and** that snapshot durable on ≥2 replicas |
| Old snapshots (version history) | keep a bounded ring (e.g. hourly×24, daily×30); prune the rest (§ file-format "Version history") |

### 8.3 GC is a compaction pass

GC runs as part of **compaction** (§ file-format), which folds the op-log into a fresh snapshot and drops
purgeable tombstones. Compaction is performed by whichever device holds the page open and is idle; it writes
a new snapshot generation atomically and only then prunes old segments (→ [`./sync.md`](./sync.md)
§"compaction"). Because snapshots are content-addressed and generations are monotone, a mid-compaction crash
never corrupts state — readers keep using the previous generation.

---

## 9. Schema versioning & migration

Two independent version numbers, do not conflate them:

| Version | Lives in | Governs | Bump when |
|---|---|---|---|
| `formatVersion` | file headers + manifest | *byte framing* of segments/snapshots/manifest | the on-disk container layout changes |
| `schemaVersion` | manifest + `Workspace` LWW | *document-model semantics* (entities, op registry) | you add/change entity fields or op types |

Rules (normative):

1. **Unknown fields are preserved.** CBOR maps round-trip unknown keys untouched, so an older reader that
   writes back a newer document does not silently drop new fields. (This is why we use CBOR maps, not
   positional tuples, for records.)
2. **Op-type registry is append-only.** Tags are never reused or repurposed. An unknown op tag triggers the
   forward-compat discipline in §2.3 (preserve, don't compact, prompt to update).
3. **`formatVersion` mismatch on read:** a reader MAY read a `formatVersion` ≤ its own; it MUST refuse to
   *write* a container whose `formatVersion` exceeds its own (would produce bytes older peers can't parse).
   A reader that meets a higher `formatVersion` than it supports treats the document read-only and prompts to
   update.
4. **Migrations** are pure functions `migrate_N_to_N+1(state) -> state`, registered in `sane_core`, run in
   sequence on load when a document's `schemaVersion` is below the app's. A migration MUST be:
   - **deterministic** (all devices produce identical migrated state from identical input),
   - **idempotent** where possible,
   - expressed as **ordinary ops** where it changes shared state, so the migration itself merges (a
     migration that rewrites state out-of-band would fork replicas). Structural container migrations
     (re-encoding a snapshot) are local and need not be ops, because they don't change semantics.
5. **Never** ship a migration that requires all devices to upgrade simultaneously; the mixed-version window is
   permanent in a BYO-cloud, offline-first system. Design every schema bump to be readable (if degraded) by
   the previous version.

---

## 10. Reference: how a stroke becomes durable (end-to-end)

Ties this doc to its neighbours; the numbered path is the contract between packages.

1. `sane_ink` captures pointer samples (pressure/tilt/azimuth/time), smooths & predicts, and closes a
   stroke → produces `InkSample[]` + `bounds`.
2. `sane_core` mints an `ObjectId`, serialises the samples to the immutable **stroke geometry blob** (→
   [`./file-format.md`](./file-format.md)), computes its `BlobRef`, and appends **two ops**:
   `createObject(stroke, {brushId, geometryRef, bounds, colorToken, …})` and the layer set-add (often the
   same op), each stamped with a fresh `Hlc`.
3. The ops are written to the local op-log segment (drift DB + the append-only segment file), and the blob is
   written to the local content-addressed store.
4. `sane_sync` encrypts the new op-frames and the blob (→ [`./crypto.md`](./crypto.md)) and uploads them to
   the user's cloud drive as single-writer segment appends + a new `blobs/<id>` object (→
   [`./sync.md`](./sync.md)).
5. Another device pulls the segment, decrypts, merges the ops (add-wins set add; LWW registers), lazily
   fetches the geometry blob when the page scrolls into view, and `sane_render` tessellates & paints it.
6. Later, an idle device compacts the page: folds the op tail into a new snapshot generation, GCs stable
   tombstones (§8), prunes folded segments.

Every arrow above is conflict-free by construction: single-writer files (no cloud conflict copies),
add-wins/LWW/movable CRDTs (no lost updates), content-addressed blobs (no attachment conflicts), HLC total
order (deterministic tiebreaks).

---

## 11. Open questions / verify list

- **`FracIndex` package:** no canonical Dart `fractional-indexing` port identified — port the JS reference or
  vendor one; **verify** before relying on a pub package.
- **`y_crdt` maintenance:** confirm the Dart Yjs port's coverage and health before using it even as a
  plain-text stopgap; **verify**.
- **BLAKE3 in Dart:** confirm a maintained `blake3` pub package (else fall back to SHA-256 multihash);
  **verify**.
- **Vector-clock nuance:** §2.4 refines "per-object vector clocks" to "HLC total order + per-device
  watermark." Confirm no product feature actually needs full per-object vectors (e.g. fine-grained blame);
  if it does, add an opt-in causal-graph index rather than fattening every op.
- **Peritext block-embed anchoring:** decide how an inline object (image in text flow) anchors — as a special
  character in the sequence CRDT vs a block in the movable-list; leaning "special character." **Decide in
  the editor spike.**
