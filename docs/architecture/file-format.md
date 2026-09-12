# Sane Notes — On-Disk & Bundle File Format (`.sanenote`)

> **Audience:** an autonomous coding agent implementing serialisation in `packages/sane_core`,
> `packages/sane_sync`, and the import/export code. Zero prior context assumed.
> **Status:** normative byte-level specification. A reader/writer that disagrees with the byte tables here
> is wrong. Multi-byte integers are **big-endian** unless stated. All keyword-encoded structures use
> **CBOR** (RFC 8949) with deterministic (canonical) encoding.
> **Owns:** the exact bytes of the `.sanenote` bundle, snapshot files, op-log segment files, blob files, and
> the manifest. **Does not own:** CRDT semantics (→ [`./document-model.md`](./document-model.md)), how bytes
> move (→ [`./sync.md`](./sync.md)), or how bytes are encrypted (→ [`./crypto.md`](./crypto.md); this doc
> defines *where* ciphertext sits, that doc defines *how* it is produced).
> **Decision records:** [`../adr/0005-document-model-and-crdt.md`](../adr/0005-document-model-and-crdt.md),
> [`../adr/0004-local-first-zero-server.md`](../adr/0004-local-first-zero-server.md).
> **Primary evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
> §4 (file-based sync, atomic writes, hybrid snapshot+segment layout), §9 (`.sanenote` bundle, export).

---

## 0. Two representations, one format

The same logical format has two physical shapes. They share the container grammar; they differ in *sharding*
and *encryption*:

| Representation | Where | Sharding | Encryption | Purpose |
|---|---|---|---|---|
| **Sync store** | user's cloud drive & local app cache | per-page directories, per-device op-log segments, per-blob files | **every byte ciphertext** | the live, mergeable, multi-device store ([`./sync.md`](./sync.md)) |
| **`.sanenote` export bundle** | a file the user saves/shares | one Zip64 (or folder) per notebook or page | **optional** (cleartext export on the user's own device is the longevity guarantee) | portability, backup, hand-off, the "your data outlives the app" ideal |

Both are described below. The `.sanenote` bundle is the **canonical, documented, published format** (the
research §9 longevity requirement); the sync store is the bundle "exploded" for single-writer conflict-free
sync. A `.sanenote` export is produced by folding the sync store to snapshots, optionally decrypting, and
zipping.

---

## 1. `.sanenote` bundle layout

A `.sanenote` is a **Zip64 archive** (preferred, single file) **or** an equivalent directory (used as the
on-disk cache). Zip is chosen for universal tooling (the "open with any zip tool" longevity property). No
compression at the zip layer for already-compressed members (STORE); DEFLATE only for the manifest and small
JSON.

```
example.sanenote                         (Zip64 container)
├── MANIFEST.cbor            # bundle manifest (§4). The ONLY entry a reader must parse first.
├── MANIFEST.sig             # optional detached Ed25519 signature over MANIFEST.cbor (§4.4)
├── FORMAT                   # 16 ASCII bytes: "sanenote/1\n" + padding — human/greppable version marker
├── pages/
│   └── <pageId>/            # pageId = Crockford base32 of the 16-byte ObjectId
│       ├── snapshot.<gen>.snap        # compacted CRDT snapshot (§2), <gen> zero-padded u64 hex
│       ├── ops/
│       │   └── <deviceId>.<seq>.oplog # single-writer append-only op-log segment (§3)
│       └── page.meta.cbor             # small per-page manifest fragment (§4.3)
├── blobs/
│   └── <blobId>.blob        # content-addressed payloads: ink geometry, PDF, audio, images (§5)
├── thumbnails/
│   └── <pageId>.webp        # derived previews (non-authoritative; regenerable)
└── index/
    └── search.sqlite        # derived FTS + ink index (non-authoritative; regenerable)
```

- Entries under `thumbnails/` and `index/` are **derived and non-authoritative**: a correct reader can
  delete and regenerate them. They are excluded from the manifest hash tree. Never treat them as source of
  truth.
- In the **sync store**, the same tree exists but: `<pageId>`, `<blobId>`, `<deviceId>` are **opaque random
  ids** (not derived from content), and `snapshot`, `oplog`, `blob`, and `page.meta` bytes are ciphertext
  (AEAD framed, §6). `thumbnails/` and `index/` are **not** synced (regenerated locally).

---

## 2. Snapshot file — `snapshot.<gen>.snap`

A snapshot is the folded CRDT state of one page at a compaction watermark. It exists so a returning device
loads O(state) not O(history) (research §3 "Compaction / snapshots"; §9). Snapshots are content-addressed
and generations are monotone; the newest complete generation wins.

### 2.1 Header (fixed 64 bytes)

| Offset | Size | Field | Notes |
|---:|---:|---|---|
| 0 | 4 | `magic` | ASCII `"SNSN"` (0x53 4E 53 4E) |
| 4 | 1 | `formatVersion` | u8, = 1 |
| 5 | 1 | `flags` | bit0 `encrypted`, bit1 `zstd`, bit2 `columnar`, bits3–7 reserved(0) |
| 6 | 2 | `headerLen` | u16, = 64 (allows future growth) |
| 8 | 16 | `pageId` | 128-bit ObjectId (opaque id in sync store) |
| 24 | 8 | `generation` | u64, monotone; higher = newer |
| 32 | 8 | `baseHlcPacked` | u64 = highest `(physicalMs<<16|logical)` folded in (the compaction watermark) |
| 40 | 8 | `opCountFolded` | u64, ops folded into this snapshot (diagnostics) |
| 48 | 4 | `schemaVersion` | u32, document-model schema at write time |
| 52 | 4 | `sectionCount` | u32, number of body sections (§2.2) |
| 56 | 8 | `bodyHash` | truncated 64-bit BLAKE3 of the body (fast integrity check; full hash in manifest) |

If `flags.encrypted`, the header is written **cleartext** (readers need `pageId`/`generation`/watermark to
route without decrypting) and the **body** is one AEAD message (§6); `bodyHash` is over the *ciphertext*.

### 2.2 Body — sequence of sections

The body is `sectionCount` length-delimited sections. Each section:

```
varint sectionType     (see table)
varint sectionByteLen
sectionByteLen bytes    (CBOR or columnar payload)
```

| `sectionType` | Contents | Encoding |
|---:|---|---|
| 1 `META` | page record (kind, template, size, background, trashed…) | CBOR map |
| 2 `LAYERS` | layer records + z-order fractional indices | CBOR array |
| 3 `OBJECTS` | non-stroke objects (text meta, image, shape, table, links, audio anchors) | CBOR array |
| 4 `STROKES` | stroke records: id, brushId, geometryRef, bounds, LWW style regs + their HLCs | **columnar** (§2.3) |
| 5 `TEXT` | Peritext state per TextBlock: char sequence + tombstones + mark op-sets | CBOR + columnar chars |
| 6 `TREE` | (Library doc snapshots only) movable-tree node table | CBOR array |
| 7 `TOMBSTONES` | live tombstone set with deletion HLCs not yet GC-eligible | columnar |
| 8 `ORSET` | OR-Set add-tags still required for causal safety | columnar |
| 9 `HLCVEC` | per-device HLC watermark vector at this generation | CBOR map |

Unknown `sectionType`s are **preserved verbatim** on rewrite (forward-compat, §7). Sections are ordered by
type ascending for deterministic hashing.

### 2.3 Columnar stroke encoding (`STROKES`)

Strokes dominate object count, so they use a columnar, delta+varint layout instead of CBOR-per-object.
For N strokes:

```
varint N
column: ids            N × 16 bytes                       (raw ObjectId; not delta'd)
column: createHlc      N × varint (delta-zigzag vs prev packed HLC)
column: brushIdRefs    N × varint (index into a string pool at end of section)
column: geometryRefs   N × 32 bytes (BlobRef multihash) OR varint pool index
column: bounds         N × 4×f32 (or quantised u16 with a per-section scale)
column: colorTokenLWW  N × (varint tokenPoolIndex, packedHlc delta)
column: widthMulLWW     N × (f16 value, packedHlc delta)
column: opacityLWW      N × (u8 value, packedHlc delta)
column: zIndex          N × varint (FracIndex string pool index)
column: layerRef        N × varint (index into LAYERS)
column: flags           N × u8 (bit0 erased, bit1 locked, …)
string pool             (brushIds, colour tokens, FracIndex keys) length-prefixed UTF-8
```

Rationale: columnar + delta puts like-typed values together so zstd finds the redundancy; this is what gets
the 5,000-stroke page's CRDT metadata to ~0.2 MB (→ [`./document-model.md`](./document-model.md) §7). The
`bodyHash`/manifest hash make truncation detectable.

### 2.4 Atomic write

Snapshots are written **temp-then-rename** (research §4 "Atomic writes"): write `snapshot.<gen>.snap.tmp`,
`fsync`, atomically `rename` to final, then update the manifest, then (only after the manifest is durable)
delete superseded generations. A crash at any point leaves a complete older generation usable. In the sync
store the "rename" is the cloud adapter's atomic-publish primitive (→ [`./sync.md`](./sync.md)
§"atomicity").

---

## 3. Op-log segment file — `<deviceId>.<seq>.oplog`

The recent tail of history, as append-only, **single-writer** files. Because a given segment file has exactly
one writer (the device that owns `deviceId`), **no two devices ever write the same file**, so the cloud drive
never needs a conflict copy (research §4 "One file per note vs op-log segments" — this is the crux of robust
zero-server merge).

### 3.1 Header (fixed 32 bytes, cleartext)

| Offset | Size | Field | Notes |
|---:|---:|---|---|
| 0 | 4 | `magic` | ASCII `"SNOL"` |
| 4 | 1 | `formatVersion` | u8 = 1 |
| 5 | 1 | `flags` | bit0 `encrypted`, bit1 `zstdPerRecord`, others reserved |
| 6 | 2 | `headerLen` | u16 = 32 |
| 8 | 16 | `deviceId` | 128-bit author; matches filename |
| 24 | 8 | `segmentSeq` | u64; segments for a device are `0,1,2,…`; rotate at a size cap (§3.4) |

### 3.2 Record framing (repeat until EOF/short read)

```
varint recordLen        (length of the following payload, excluding this varint and the CRC)
recordLen bytes payload  (cleartext CBOR Op, OR AEAD ciphertext frame if flags.encrypted — §6)
4 bytes  crc32c          (Castagnoli CRC of the payload bytes)
```

- **Append-only, never rewrite.** New ops are appended; existing bytes are immutable. This makes writes
  crash-safe (a torn final record fails its length/CRC and is ignored until the append completes) and makes
  cloud sync a pure "upload the grown tail" (range append or re-put; → [`./sync.md`](./sync.md)).
- A reader stops at the first record whose `recordLen` runs past EOF or whose `crc32c` fails, treating the
  file as valid up to that point (a partially-synced tail). It re-reads later when more bytes arrive.
- The **cleartext CBOR Op** matches the `Op` shape in
  [`./document-model.md`](./document-model.md) §2.2: `{hlc, type, target, field?, value?, deps?}`.

### 3.3 Encrypted record frame (sync store)

When `flags.encrypted`, each record payload is:

```
24 bytes  nonce           (XChaCha20 192-bit random nonce)
M bytes   ciphertext       (AEAD of the CBOR Op)
16 bytes  tag              (Poly1305)
```

AAD (authenticated, not encrypted) = `magic || formatVersion || deviceId || segmentSeq || recordIndex`, so a
record cannot be moved between files/positions without detection (defends against cut-and-paste tampering by
a malicious drive). Per-record encryption is deliberate: it preserves append-only single-writer semantics
(you can append a new encrypted record without rewriting the file) at the cost of a 40-byte per-op overhead —
acceptable because ops are already batched (§3.4). Key derivation for the segment is in
[`./crypto.md`](./crypto.md) §"Per-page keys".

### 3.4 Batching & rotation

- Ops are flushed in **batches** (coalesce a burst of writing into one append + one upload), not one file op
  per stroke sample. Target flush cadence ≈ 250 ms of activity or 64 KB, whichever first.
- Rotate to `segmentSeq+1` when a segment reaches a size cap (default **4 MB** cleartext) so any single
  re-upload stays small and the cloud change unit is bounded.
- After compaction folds a segment into a snapshot and that snapshot is durable on ≥2 replicas, the segment
  is deleted (→ [`./document-model.md`](./document-model.md) §8; [`./sync.md`](./sync.md) §"compaction").

---

## 4. Manifest — `MANIFEST.cbor`

The manifest is the **root index and integrity anchor** of a bundle/sync-notebook. A reader parses it first;
everything else is discovered from it. Deterministic CBOR; the top level is a map with integer keys (compact,
stable) — shown here with names.

### 4.1 Manifest structure

```jsonc
// (shown as JSON for readability; on disk it is canonical CBOR)
{
  "0 format":        "sanenote",
  "1 formatVersion": 1,             // container framing version
  "2 schemaVersion": 5,             // document-model schema version
  "3 bundleId":      "<ULID>",      // stable id of this bundle / notebook root
  "4 kind":          "notebook",    // "notebook" | "page" | "workspace-backup"
  "5 createdHlc":    "<packedHlc+device>",
  "6 updatedHlc":    "<packedHlc+device>",
  "7 encryption":    { /* see §4.2, or null for a cleartext export */ },
  "8 hlcVector":     { "<deviceId>": "<packedHlc>", ... },   // per-device watermark (doc-model §2.4)
  "9 pages": [
    {
      "pageId":     "<id>",
      "snapshotGen": 42,
      "snapshotHash":"<blake3-256>",       // full hash; header carries only a 64-bit prefix
      "segments":   [ {"deviceId":"<id>","seq":7,"bytes":81234,"hash":"<blake3>"}, ... ],
      "metaHash":   "<blake3-256>"         // hash of page.meta.cbor
    }
  ],
  "10 blobs": [
    { "blobId":"<id>", "mime":"audio/opus", "size":12977000,
      "wrappedKeyRef":"<keyId>",           // see crypto.md; absent in a cleartext export
      "hash":"<blake3-256 of ciphertext>" }
  ],
  "11 devices": [ {"deviceId":"<id>","name":"Riya iPad","pubKey":"<ed25519>"} ],
  "12 migrations": [ {"from":4,"to":5,"appliedHlc":"..."} ],   // audit trail
  "13 prev": "<blake3 of previous MANIFEST.cbor>"              // hash-chain for tamper-evidence/history
}
```

### 4.2 `encryption` block (sync store & encrypted exports)

```jsonc
"encryption": {
  "scheme": "sane-e2ee/1",
  "aead":   "xchacha20poly1305",          // or "aes256gcm"
  "kdf":    "argon2id",                    // password path; see crypto.md for full ladder
  "kdfParams": { "memKiB": 65536, "iters": 5, "parallelism": 1, "saltRef": "<id>" },
  "masterKeyWrap": { "method": "keychain" | "keystore" | "passkey-prf" | "recovery-code",
                     "params": { ... } },
  "itemsKeys": [ {"keyId":"<id>","wrappedBy":"master","wrap":"<ciphertext>"} ],
  "manifestNonce": "<24B>",                // the manifest's own field-level metadata is encrypted (§6.2)
}
```

Key material itself is never in the manifest in the clear — only *wrapped* keys and references. Full key
hierarchy in [`./crypto.md`](./crypto.md).

### 4.3 `page.meta.cbor`

A small per-page fragment duplicated out of the manifest so a single page can be synced/opened without the
whole notebook manifest: `{pageId, kind, title(enc), template, size, snapshotGen, segmentList, updatedHlc}`.
The manifest is authoritative on conflict; `page.meta` is a convenience shard.

### 4.4 Integrity & signatures

- **Hash tree.** The manifest stores BLAKE3-256 of every snapshot, segment, blob, and page-meta. A reader
  MUST verify a member's hash before trusting it; a mismatch = corrupt/partial → ignore and re-fetch (defends
  bit-rot and a tampering drive; research "Threats: Silent data corruption").
- **Manifest hash-chain.** `prev` links each manifest to its predecessor's hash, giving an append-only,
  tamper-evident history (rollback by a malicious drive is detectable: the chain breaks or regresses).
- **Signature (optional, recommended for shared bundles).** `MANIFEST.sig` = Ed25519 signature over
  `MANIFEST.cbor` by the writing device's signing key (registered in `devices`). Lets a recipient verify a
  shared `.sanenote` came from a claimed device. In a solo store it is optional.

---

## 5. Blob files — `blobs/<blobId>.blob`

Immutable, content-addressed payloads (research §8). One file per blob; never mutated (a change = a new blob
= a new id).

### 5.1 Blob framing

| Offset | Size | Field | Notes |
|---:|---:|---|---|
| 0 | 4 | `magic` | ASCII `"SNBL"` |
| 4 | 1 | `formatVersion` | u8 = 1 |
| 5 | 1 | `flags` | bit0 `encrypted`, bit1 `chunked` |
| 6 | 2 | `headerLen` | u16 |
| 8 | 2 | `mimeLen` | u16 |
| 10 | `mimeLen` | `mime` | UTF-8, e.g. `application/ink-v1` |
| … | 8 | `plaintextSize` | u64 |
| … | var | body | raw or chunk-encrypted payload (§5.2) |

### 5.2 Large-blob chunking

Audio and PDFs are large; mobile must not load them whole to decrypt (research §8 "chunk + stream-encrypt").
When `flags.chunked`, the body is a sequence of independently-AEAD'd chunks:

```
varint chunkSize            (plaintext chunk size, e.g. 256 KiB, constant except last)
repeat:
  24B nonce | ciphertext | 16B tag     (AAD = blobId || chunkIndex, so chunks can't be reordered)
```

This lets the player decrypt-and-stream audio from any offset (seek), and the PDF renderer fetch only the
pages it shows. Chunk size 256 KiB by default (tune per platform).

### 5.3 Stroke geometry blob (`application/ink-v1`)

The immutable sample stream referenced by `Stroke.geometryRef`
([`./document-model.md`](./document-model.md) §1.2):

```
varint sampleCount
u8     channelMask         (bit0 pressure, bit1 tilt, bit2 azimuth, bit3 tExplicit)
f32    originX, originY     (samples stored as deltas from origin)
column x:        sampleCount × varint zigzag delta (fixed-point, 1/32 pt)
column y:        sampleCount × varint zigzag delta
column pressure: sampleCount × u16 (0..65535)             (if channelMask.pressure)
column tilt:     sampleCount × u8                          (if channelMask.tilt)
column azimuth:  sampleCount × u8                          (if channelMask.azimuth)
column tDelta:   sampleCount × varint microseconds         (if channelMask.tExplicit)
```

Then the whole blob body is zstd-framed (unless already tiny). This is the format that hits ~13 B/sample raw
→ ~3 B/sample stored (→ [`./document-model.md`](./document-model.md) §7).

---

## 6. Encryption placement (what is ciphertext, what is not)

This section defines *where* ciphertext lives; [`./crypto.md`](./crypto.md) defines *how* it is made.

- **Sync store: every authoritative byte is ciphertext.** Snapshot bodies, op-log records, blob bodies, and
  the metadata fields inside the manifest are AEAD-encrypted. Only the minimal routing headers stay cleartext
  (magic, versions, ids, generations, HLC watermark) — these are opaque random ids and coarse counters that
  reveal structure but not content.
- **Cleartext routing headers are a deliberate metadata trade-off.** A curious cloud provider can see: how
  many pages, how many devices, rough op counts, rough sizes, and sync timing. It cannot see titles, text,
  ink, audio, or which page is which. We accept this (it is far less than Obsidian leaks — paths — or Bear —
  titles; research §5). Sizes are **padded** to bucket boundaries (§6.3) to blunt size-fingerprinting.
- **Export bundle:** encryption is **optional**. A cleartext export on the user's own device is the
  longevity/ownership guarantee (research §9 "Provide plain-file, cleartext export … so ownership is real").
  An encrypted export (for cloud backup) uses the same envelope as the sync store.

### 6.1 AEAD parameters

Default **XChaCha20-Poly1305** (192-bit nonce → random nonces are collision-safe across many
files/devices/chunks without a shared counter — the reason research §6 prefers it for this exact
many-independent-files case). **AES-256-GCM** is a permitted alternative where hardware acceleration matters
(its 96-bit nonce needs care; we then derive per-message nonces, never random). One scheme per store, named
in `encryption.aead`.

### 6.2 Manifest field-level encryption

The manifest's *structure* (page list, sizes, hashes) is cleartext (needed to route), but human-meaningful
fields (page titles, notebook names, tags) are stored as **separately-encrypted values** inside it
(`{"enc": "<nonce||ct||tag>"}`), never plaintext. The name→id map lives only inside encrypted payloads
(research "Threats: metadata leakage").

### 6.3 Size padding

Ciphertext members are padded up to bucket boundaries before upload to reduce size fingerprinting:
snapshots/op-segments padded to the next of {4, 16, 64, 256 KiB, 1, 4 MiB}; blobs to the next 64 KiB. Padding
is random bytes inside the AEAD (or a trailing padding length in a padded framing). Trade-off: a few % storage
overhead for meaningfully less metadata leakage.

---

## 7. Versioning & migration (file layer)

Mirrors [`./document-model.md`](./document-model.md) §9; this is the *byte* side.

- **`formatVersion`** is per-file (every header) **and** in the manifest. Bump when byte framing changes.
- **Read policy:** a reader MAY parse any `formatVersion ≤` its max; on a higher one it goes read-only and
  prompts to update (never writes bytes an older peer can't parse).
- **Unknown CBOR keys / unknown snapshot sections are preserved** on rewrite (round-trip), so a newer writer
  → older reader → newer writer cycle loses nothing.
- **Compaction re-encodes** a snapshot to the current `formatVersion`; that is a local, non-semantic change
  and needs no op.
- **The `FORMAT` sentinel file** (`"sanenote/1\n"`) exists purely so a human or a `file`/`grep` can identify
  a bundle without a CBOR parser. It is advisory; the manifest is authoritative.

---

## 8. Version history & Trash on disk

Falls out of snapshots + op tail (research §9):

- **Version history** = the retained ring of snapshot generations plus the op-log tail. Keep a bounded ring:
  default **hourly × 24, daily × 30, then monthly × 12** (configurable); GC prunes the rest (→
  [`./document-model.md`](./document-model.md) §8.2). Reconstructing any retained point = load nearest
  snapshot ≤ target, replay ops up to target HLC.
- **Trash** = tree nodes with `trashed=true` and a live tombstone, still present on disk within the retention
  window. Physical purge happens only at compaction under the causal-stability gate (doc-model §8). Note the
  Google Drive `appDataFolder` caveat (research §4/§9): **no drive-level trashing there**, so Trash is always
  an app-layer concept, never delegated to the drive.

---

## 9. Export & interop formats

The `.sanenote` bundle is canonical; we also export **lossy portable** formats (research §9). Import/export
lives in `sane_pdf`, `sane_core`, and dedicated exporters.

| Target | Fidelity | Notes |
|---|---|---|
| **`.sanenote`** | lossless | the canonical open bundle; ship a published spec (this doc) |
| **PDF** | read-only, high visual fidelity | renders ink + text + template; optional ink-as-annotation layer for round-trip (PDFKit / pdfium) |
| **PNG / SVG** | per-page raster / vector | SVG preserves stroke paths as vectors; PNG for universal share |
| **Markdown** | text + image refs, ink as embedded PNG/SVG | maximally portable, lossy on ink positions (research §9) |
| **JSON** | structural dump of the folded document | for programmatic access / debugging; Peritext export for text |

Import: PDF (as `pdfBacked` pages), images, Markdown; competitor bundles (`.goodnotes`, `.note`) are
**out of v1 scope** (documented in the product roadmap), but the open `.sanenote` spec means third parties
can write converters.

---

## 10. Worked size example (recap, canonical)

For the 60-minute lecture page (5,000 strokes + audio) fully specified in
[`./document-model.md`](./document-model.md) §7, the on-disk `.sanenote` members are approximately:

| Member | Bytes |
|---|---|
| `pages/<id>/snapshot.0.snap` (STROKES columnar + TEXT + META) | ~0.2 MB |
| `pages/<id>/ops/*.oplog` (tail before compaction) | ~0.6 MB → 0 after compaction |
| `blobs/<inkGeom ids>.blob` (5,000 stroke geometry blobs, or coalesced) | ~0.6–1.0 MB total |
| `blobs/<audio>.blob` (Opus mono, chunked) | ~11–14 MB |
| `thumbnails/<id>.webp` + `index/search.sqlite` | ~0.1–0.3 MB (derived) |
| **Bundle total** | **~12–16 MB**, audio-dominated |

Design consequence (repeat from doc-model §7): audio is lazy-fetched and chunk-encrypted; the mergeable state
is ~1 MB; opening the page never requires downloading the audio blob.

---

## 11. Open questions / verify list

- **Zip64 vs custom container:** Zip64 chosen for tooling ubiquity; confirm a maintained Dart Zip64
  reader/writer that streams large members without loading them whole (`archive` package — **verify**
  Zip64 + streaming support), else use a directory bundle and zip only on explicit export.
- **BLAKE3 in Dart:** confirm a maintained `blake3` pub package for the hash tree; fall back to SHA-256
  multihash if absent. **verify.**
- **zstd in Dart:** confirm a maintained `zstandard`/FFI binding for stroke/snapshot compression; fall back
  to `GZip`/`brotli` if needed. **verify.**
- **CBOR canonical encoder:** confirm `cbor` pub package produces deterministic/canonical output (needed so
  hashes are stable across devices). **verify.**
- **f16 (half) for width/pressure:** Dart lacks native f16; implement pack/unpack helpers. **verify** perf.
- **Coalescing stroke geometry blobs:** decide whether each stroke is its own blob (simple, more files) or
  strokes are packed into per-page geometry blobs (fewer files, must re-pack on erase). Lean per-stroke for
  v1, revisit if file count hurts drive quotas. **Decide in the storage spike.**
