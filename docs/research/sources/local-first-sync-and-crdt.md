# Local-First, Zero-Server Note App: Sync & CRDT Research

Research brief for building a note app where notes never touch the vendor's servers and
sync through the user's own cloud drive (iCloud Drive / Google Drive, optionally
OneDrive / Dropbox / WebDAV), with end-to-end encryption, ink + rich text + page
structure, and optional serverless real-time collaboration.

---

## 1. Local-first software principles (Ink & Switch)

The foundational text is Martin Kleppmann et al., *"Local-first software: you own your data,
in spite of the cloud"* (Ink & Switch, 2019). It defines **seven ideals** a system should
satisfy simultaneously:

1. **No spinners (fast)** — respond to input from local data, no network round-trips.
2. **Multi-device** — work syncs across all of a user's devices, not trapped on one.
3. **Network optional (offline)** — full read/write offline; sync when connectivity returns.
4. **Seamless collaboration** — concurrent editing that merges without conflicts (Google-Docs-like).
5. **The Long Now (longevity)** — data survives the vendor shutting down; standard, exportable formats.
6. **Security & privacy by default** — end-to-end encryption so "servers that store a copy of your
   files only hold encrypted data that they cannot read."
7. **User control** — full ownership: copy, modify, back up, delete without platform restriction.

Key evaluative claims from the essay, directly relevant to this project:

- **Cloud apps** (Google Docs, Figma, Trello) win on collaboration + multi-device but fail
  longevity, offline, privacy, and control.
- **File-sync services** (Dropbox, Google Drive) give fast local access, offline, and good
  longevity, but do **manual/messy conflict resolution** — the infamous
  "Budget draft 2 (Jane's version) final final 3.xls" problem. This is precisely the failure
  mode a CRDT layer must fix when syncing over a consumer cloud drive.
- **Git** is genuinely local-first (distributed, offline, user-controlled) but has "no capability
  for real-time, fine-grained collaboration" and treats binary files (ink, PDFs) as opaque blobs.
- **CRDTs** are positioned as the foundational technology: "multi-user from the ground up,"
  merge concurrent edits automatically at keystroke granularity, and — critically for a
  zero-server design — "can sync their state via any communication channel (server, P2P,
  Bluetooth, or even a USB stick)."

The essay also flags the two hard problems the Ink & Switch prototypes (Trellis, Pixelpusher,
PushPin) hit, both of which shape this design: (a) **CRDTs accumulate a large change history**,
which creates performance problems if every keystroke is retained forever; and (b) **P2P
networking (NAT traversal) is unreliable** in production. Both push toward chunked/compacted
documents and a relay-assisted (not pure-P2P) real-time layer.

---

## 2. CRDT libraries and suitability

We need CRDT support for three distinct sub-documents per note: **ink strokes**, **rich text**,
and **page/outline structure**. No single library is ideal for all three, so the choice is
partly "which library, which sub-model."

### Yjs

- YATA algorithm, pure JavaScript, tiny bundle (~18 kB min+gz), by far the largest ecosystem:
  ProseMirror, Tiptap, CodeMirror, Monaco, Quill, plus network providers (y-webrtc, y-websocket,
  Hocuspocus). ~920K weekly downloads.
- **Garbage collection is core to its design** — it discards tombstones of deleted content,
  keeping documents small and memory low. The maintainer (dmonad) argues benchmarks that
  disable GC are misleading.
- Weaknesses for us: **no native move operation** (reordering pages / tree nodes requires
  delete+insert, which can produce broken/empty references on concurrent moves); no built-in
  time-travel (you must store encoded snapshots yourself using state vectors + delete sets);
  rich text is via relative positions + formatting attributes rather than a Peritext-grade model.

### Automerge 2 / 3

- Rust core compiled to WASM; RGA + LWW; **full Git-like DAG history** with branch/fork/merge
  as a first-class product feature and fine-grained change attribution.
- **Automerge 3.0** is a major step: same on-disk file format and near-fully backwards-compatible
  API as v2, but a **compressed runtime representation** cutting memory "by over 10x" (their
  Moby-Dick paste example: 700 MB in v2 → 1.3 MB in v3; one document's load time went from
  17 hours to 9 seconds). v3 makes collaborative strings the default (native JS strings) and
  renames the non-collaborative type to `ImmutableString`; the old `Text` class is removed.
- Best fit when **version history and branching are product features** and you want a rich JSON
  document model with explicit local-first design. Historically slower/larger than Yjs for pure
  text, but v3 closed much of that gap. Editor bindings (e.g. ProseMirror) are less mature than Yjs's.

### Loro

- Rust + WASM, based on a Replayable Event Graph; integrates the **Fugue** algorithm (minimizes
  interleaving anomalies in concurrent text) and Peritext-inspired concurrent rich-text styling.
- **Movable Tree CRDT** (from "A Highly-Available Move Operation for Replicated Trees") — the only
  one of the three with a correct native move for hierarchical data. This is directly valuable for
  a **page/outline/notebook tree** where users reorder and re-parent items concurrently.
- Native **time-travel / version control** by preserving the full editing history "with low overhead,"
  plus snapshot export. Encoded sizes are competitive with Yjs and smaller than Automerge on text
  workloads; the tradeoff is that keeping full history means a **WASM bundle >1 MB** and higher
  memory than a GC'd Yjs document. Loro added shallow/"gc" snapshots to bound history growth.
- Ecosystem is early: fewer turnkey editor bindings, more manual transport wiring.

### Diamond Types / Eg-walker

- **Eg-walker** ("event graph walker," EuroSys 2025; authors include Diamond Types' Joseph Gentle
  and Martin Kleppmann) is the algorithm behind the Diamond Types project *(the DT↔eg-walker
  lineage is widely attributed but not stated in the arXiv abstract — treat as background)*.
- It targets the exact pain point the Ink & Switch essay raised: CRDTs are "slow to load and
  consume a lot of memory," while OT struggles when files "have diverged substantially due to
  offline editing." Eg-walker stores an **event graph** and replays it, using **"an order of
  magnitude less memory in the steady state"** than CRDTs and loading documents "orders of
  magnitude faster," while merging long-running offline branches far faster than OT and
  "comparable with existing CRDT algorithms" in the worst case. It works "everywhere CRDTs are
  used, including peer-to-peer systems without a central server." Diamond Types itself reportedly
  achieved ~5,000× speedups over earlier CRDTs via columnar encoding + a B-tree internal structure
  *(from search summary; unverified in a primary doc)*.
- Status: research-grade / less turnkey than Yjs. Interesting as a future core, or as the
  intellectual model for our op-log design, more than a v1 dependency.

### Peritext (rich text)

- Ink & Switch's **Peritext** (PACMHCI, CSCW 2022) is the only serious CRDT treatment of
  **overlapping inline formatting**. It layers on top of a plain-text CRDT (their prototype uses
  RGA/Causal Trees on Automerge, but "in principle it could extend any plain text CRDT").
- Mechanism: each character has a stable `opId` (`counter@nodeId`); formatting is stored as
  **`addMark` span operations anchored to character IDs** with a `before`/`after` anchor.
  `before` makes a span *grow* when text is inserted at its boundary (good for bold); `after`
  makes it *not* grow (essential for links, so appended text doesn't become part of the link).
- Merging = collect all ops from both sides and apply in `opId` order; formatting ops are
  commutative (they accumulate into per-gap "op-sets"), and incompatible overlaps (red vs blue
  highlight) resolve by deterministic **last-writer-wins on `opId`**. Convergence, causality,
  and intention preservation were proven and property-tested.
- Limitation: **inline formatting only** (bold/italic/link/comment), not block elements
  (headings, lists, tables) — those you model separately in your own structure CRDT.
- Practically: Automerge and Loro now ship Peritext-style rich text; with Yjs you get its own
  (control-character-based) rich-text model, which Peritext's authors note is prone to certain
  anomalies.

**Suitability summary.** Rich text → Peritext-style model (native in Loro/Automerge; Yjs has a
good-enough alternative with the largest editor ecosystem). Page/outline tree → a **movable-tree
CRDT** (Loro native; otherwise a list-with-move built by hand). Ink strokes → **not a text CRDT
problem at all** (see §3).

---

## 3. Modeling ink documents

Ink is fundamentally different from text: a stroke, once drawn, is an immutable geometric object;
users rarely "edit inside" a stroke, they add, erase, move, restyle, and reorder strokes. The
right model (per Matthew Weidner's *Designing Data Structures for Collaborative Apps*, and the
whiteboard pattern therein) is:

### Immutable stroke objects in an add-wins set

- **Unique Set CRDT** of strokes. Each stroke gets a unique id at creation
  (`deviceId + counter`, i.e. a dot/Lamport-style tag). Creation is inherently conflict-free —
  two devices drawing at once just create two different strokes.
- The stroke's geometry (the point/pressure/tilt samples, the tool, initial color) is captured
  **once at creation and never mutated** — store it as an immutable blob. This keeps the CRDT
  metadata tiny relative to the payload.
- Erase / delete is an **add-wins (observed-remove) set** decision: model membership so that a
  concurrent "draw" vs "erase" of the *same* stroke resolves add-wins, or (more commonly for ink)
  simply treat erase as its own tombstone op. Add-wins avoids the "my stroke vanished because you
  erased near it" surprise.

### LWW properties for mutable per-stroke attributes

- Anything the user can change *after* drawing — color, stroke width multiplier, opacity, layer/
  z-order, position (if strokes are movable), grouping — is an **independent Last-Writer-Wins
  register** on the stroke object.
- **Independence mirrors intent** (Weidner's Principle 4): keep position `(x,y)` separate from
  size `(w,h)` separate from color, each its own register, so a concurrent *move* and *recolor*
  both survive instead of one clobbering the other. Same reasoning as the collaborative-image
  example (separate left/top/width/height registers).
- Reordering uses **list-with-move**: a Unique Set of entries, each holding the value plus an
  **LWW register storing a fractional-index position**; moving updates only the position register.

### Op-logs with hybrid logical clocks

- Represent everything as an append-only **op-log**: `create-stroke`, `erase-stroke`,
  `set-attr(stroke, key, value)`, plus text/structure ops. Each op carries a
  **Hybrid Logical Clock (HLC)** timestamp = `(physical_ms, logical_counter, deviceId)`.
- HLCs give a total order that (a) respects causality, (b) stays close to wall-clock time
  (good for human-readable version history and LWW tie-breaks), and (c) tolerates clock skew
  between devices. LWW registers pick the winner by HLC; `deviceId` breaks exact ties
  deterministically — the same rule Peritext uses on `opId` and Standard Notes-style systems use.
- An op-log is also the natural on-disk sync unit (see §4) and the substrate eg-walker/Automerge
  already use.

### Chunked / paged documents to keep files small

- The Ink & Switch essay's own warning: **CRDT change history grows unboundedly**; naive designs
  store every character/point edit forever. Ink is worse than text because a single stroke is
  thousands of samples.
- Mitigations:
  - **Chunk by page/canvas region.** A note = many pages; a page = its own CRDT document/file.
    Only load and sync the pages actually opened. This bounds memory and file size and makes
    per-page conflict handling local.
  - **Compaction / snapshots.** Periodically fold the op-log into a compact snapshot (Loro's
    shallow snapshot, Yjs GC, Automerge 3's compressed format) and keep only recent ops as a tail.
    Keep a bounded number of historical snapshots for version history (§9).
  - **Separate the heavy payload.** Store raw stroke sample data (and rasterized thumbnails) as
    content-addressed attachment blobs (§8); the CRDT holds only stroke ids + LWW attributes +
    a hash pointer. This keeps the mergeable document small and the big data immutable & cacheable.

---

## 4. File-based sync over cloud drives

The core trick: use the user's cloud drive as a **dumb, encrypted transport** and let the CRDT
layer do all merging, so the cloud provider's own conflict handling never has to be trusted.

### One file per note vs op-log segments per device

Two viable layouts, and a recommended hybrid:

- **One file per note (whole-doc):** simplest; the file *is* the serialized CRDT. Problem:
  two devices writing the same note file concurrently → the cloud provider makes a **conflict
  copy** (iCloud) or a competing revision (Drive), and you must detect + CRDT-merge them.
  Also rewrites the whole (possibly large) file on every save.
- **Op-log segments, one append-only file per device (log-structured):** each device writes
  **only its own** file(s), e.g. `notes/<noteId>/ops/<deviceId>.<seq>.oplog`. Because a given
  file has a **single writer**, there are *no cross-device write conflicts* on any file — the
  cloud never needs to make a conflict copy. Readers merge all devices' logs via the CRDT.
  This is the cleanest fit for consumer cloud drives and is what makes "zero-server" merging robust.
- **Recommended hybrid:** per-note directory containing (a) periodic **compacted snapshots**
  (whole-doc, occasionally rewritten by whichever device compacts) + (b) **per-device op-log
  segment files** for the recent tail. New device loads latest snapshot + replays all tails;
  segments are pruned once folded into a newer snapshot. Bounds both file count and file size.

### Atomic writes

- Never write in place. **Write to a temp file, fsync, then atomically rename** over the target
  (same directory / same volume). On failure the reader still sees the last complete version.
- Append-only segment files sidestep most of this, but snapshot rewrites must be atomic-rename.
- Include a content hash / length in a small manifest so a truncated or partially-synced file
  is detectable and ignored until complete.

### iCloud Drive specifics (NSFileCoordinator / ubiquity)

- All access must go through **`NSFileCoordinator`** (with **`NSFilePresenter`**) to coordinate
  with the sync daemon; file presenters are "very expensive objects" (heavy IPC) so register few.
- Files may be **evicted to the cloud as placeholders**; check `isUbiquitousItem`, trigger
  `startDownloadingUbiquitousItem(at:)`, and observe download state via **`NSMetadataQuery`**.
- **You cannot force a sync.** iOS schedules sync by network/battery/thermal/usage; background
  refresh gives only ~30s; CloudKit/metadata is throttled (~30s minimum intervals). Unidirectional
  propagation delays (iOS→macOS) and stuck "Waiting" states are common. Design the UI to tolerate
  seconds-to-hours latency and expose a manual "sync now" affordance.
- **Conflicts:** document-based apps (`UIDocument`/`NSDocument`) get some automatic handling;
  file-based apps must use **`NSFileVersion`** to detect conflict versions and resolve them —
  Apple's guidance is to resolve "quietly whenever possible." With per-device op-log segments,
  conflicts effectively never arise on individual files; if a snapshot ever conflicts, CRDT-merge
  the `NSFileVersion` variants and write a new resolved snapshot.
- Bear is the reference point for "iCloud as the whole sync engine": it uses **CloudKit** (not
  file sync) precisely because it's faster than Dropbox/Drive, relies on the user's existing iCloud
  credentials (no separate login), and — with **Advanced Data Protection** — becomes end-to-end
  encrypted so "only you … can decrypt your data." Tradeoff: Apple-ecosystem-bound, and Bear
  leaves note titles/tags unencrypted for functionality.

### Google Drive: appDataFolder vs visible folder

- **`appDataFolder`** (scope `drive.appdata`, a non-sensitive scope) is a **hidden per-app folder**:
  users can't see it in the Drive UI and other apps can't read it — good for a self-managing sync
  store users won't accidentally corrupt. Limits: **no sharing** (`notSupportedForAppDataFolderFiles`),
  **no trashing** (only permanent delete), files can't move out of it, and it's **deleted if the
  user uninstalls your app**. It counts against the user's normal Drive quota.
- **Visible folder** (e.g. `/MyNotes/`, scope `drive.file` for app-created files) trades tidiness
  for **user longevity/control** — the user can see, back up, and keep the raw encrypted bundle
  even after uninstalling. For a longevity-first note app, a visible folder is usually preferable;
  `appDataFolder` suits device/config state.
- **Change detection:** use the **Changes API** (`changes.list` with a `startPageToken`) for
  efficient incremental polling, and register **push notifications (watch channels)** to get
  webhook-style change pushes instead of tight polling. Respect per-user/per-app **rate limits &
  quotas**; back off on 403/429.

### Conflict-copy handling generally

- iCloud creates conflict versions; **Dropbox** creates "conflicted copy" files; **Drive** keeps
  competing revisions. The single-writer op-log layout avoids all of these. Where a whole-doc file
  is unavoidable, treat *any* sibling/conflict file as just another replica to feed into the CRDT
  merge, then delete the extras — never surface a conflict file to the user.

### OneDrive / Dropbox / WebDAV

- Same principles: treat as a bytes-in/bytes-out store for encrypted op-log segments + snapshots,
  poll deltas where an API exists (Dropbox `/files/list_folder/continue`, OneDrive delta query),
  fall back to mtime/etag scanning for plain WebDAV. Atomic rename + single-writer files carry over.

---

## 5. Comparison of existing designs

| App | Sync transport | E2E encryption | Notable design points |
|---|---|---|---|
| **Obsidian Sync** | Vendor relay servers | Optional, user-set **encryption password** (separate from account); **scrypt** KDF + **AES-256-GCM**; vendor "cannot access your notes" | Server keeps *unencrypted metadata* (device, timestamps, mapping of encrypted path↔content) for sync/versioning; deterministic file-hash encryption enables dedup + version history. Files stay as **local Markdown** on disk regardless. |
| **Logseq** | Local Markdown files + optional paid Sync | Sync is E2EE (Rust `rsapi`), graphs are plain local Markdown/org files | Works fine over any file-sync drive too; local-first by storing human-readable files. *(specifics unverified from primary doc)* |
| **Anytype** | **any-sync** protocol (self-hostable) | Ed25519 keys per user; backup nodes "store encrypted data they cannot read" | CRDT as a **DAG of changes**; four node roles (sync/file/consensus/coordinator); mDNS local discovery + coordinator for global; **local copy is primary**, network optional; **spaces** with ACLs; IPLD file storage. Strong model for decentralized zero-server-of-record. |
| **Joplin** | Pluggable **sync targets**: file system, WebDAV, Dropbox, OneDrive, Joplin Cloud | Optional E2EE via password-derived **master key**; per-item encrypted "JED" envelope (identifier + version + method + master-key id), chunked encryption for mobile | Best reference for "one app, many user-owned backends." Warns: activate E2EE on one device first to avoid multiple conflicting master keys. |
| **Standard Notes** | Vendor server (E2EE) | **Argon2id** (mem 64 MiB, 5 iters, p=1, 128-bit salt, 512-bit out) → root key split into **master key (local)** + **server password**; **items keys** encrypt items, themselves encrypted by master key; **XChaCha20-Poly1305** (256-bit key, 192-bit nonce) | Gold-standard **envelope/hierarchical key** design: password change re-encrypts only items keys, not all data; new default items key per password change for forward secrecy. |
| **Bear** | **CloudKit** (iCloud) | Via Apple keys + **Advanced Data Protection** = E2EE; titles/tags left cleartext | Zero separate login; fast; Apple-only ecosystem. |
| **Notesnook** | Vendor server (zero-knowledge) | **Argon2** to derive master key (predictable per-user salt = fixed client salt + email); **Argon2id** for server auth; **XChaCha20-Poly1305-IETF** via **libsodium** everywhere | Per-item envelope: base64 cipher + 192-bit nonce + salt + algo id + item id. **Recovery key** is the only backup if password lost. |

**Takeaways for us:** (1) Standard Notes / Notesnook give the cleanest **envelope-encryption + per-item
key** blueprint. (2) Obsidian/Logseq/Joplin prove the **local-plain-files + optional E2EE sync**
longevity story and the "bring your own backend" model. (3) Anytype proves a fully **decentralized,
node-based** CRDT design is production-viable. (4) Everyone who leaks metadata (Obsidian: paths,
timestamps; Bear: titles/tags) does so as a deliberate functionality tradeoff — decide ours explicitly.

---

## 6. End-to-end encryption at rest in the cloud

Because the cloud drive is untrusted transport, **every byte written must already be ciphertext.**
Recommended scheme, synthesizing Standard Notes / Notesnook:

### Cipher & KDF choices

- **AEAD cipher: XChaCha20-Poly1305** (192-bit nonce → random nonces are collision-safe without a
  counter; ideal for many independent files/devices). AES-256-GCM is a fine alternative with hardware
  acceleration but its 96-bit nonce needs careful management. Both are used in the wild (SN/Notesnook
  = XChaCha20-Poly1305; Obsidian = AES-256-GCM).
- **Password KDF: Argon2id** (memory-hard). Reference params from Standard Notes: **64 MiB memory,
  5 iterations, parallelism 1**, 128-bit random salt (derive salt from a stored random seed + user
  id via SHA-256 so the server can never hand every user the same salt).
- **Sub-key derivation: HKDF** to expand one master secret into purpose-specific keys.

### Envelope encryption (per-item keys)

- Derive a **master key** from the passphrase/PRF secret (never leaves the device).
- Generate random **items keys** (or one per note/page); encrypt each note/stroke/attachment with
  a random **content key**, encrypt the content key with the items key, encrypt items keys with the
  master key. Sync the wrapped keys.
- Payoff: a passphrase change re-wraps only the items keys, not gigabytes of notes; you can rotate
  keys, share a single note by sharing one content key, and bound blast radius per item.

### Where does the per-user key come from?

Offer a **ladder of key sources**, best-to-fallback:

1. **Passkey PRF extension (WebAuthn `prf`)** — derive a stable 32-byte secret directly from the
   user's passkey with no password. The authenticator evaluates a hardware-backed HMAC over
   `hash("WebAuthn PRF\0" + salt)` and returns exactly 32 bytes usable as a WebCrypto key. Two salts
   (`first`/`second`) per ceremony enable **key rotation** (ask for current with `first`, next with
   `second`). Feed the PRF output through HKDF to get the master key. Support (as of 2026): Android
   (Chrome/Edge/Samsung + Google Password Manager), **iCloud Keychain** (Safari 18+, Chrome 132+,
   Firefox 139+), Windows Hello (Win11 25H2+); 1Password yes, Bitwarden fragmented. This is the
   strongest UX: passwordless *and* E2EE, with the secret gated by biometrics and synced by the
   platform (iCloud Keychain / Google Password Manager) across the user's own devices.
2. **Platform keychains for the derived/wrapped keys** — store the wrapped master key in **iCloud
   Keychain** (syncs across the user's Apple devices, hardware-protected) and in the **Android
   Keystore** (hardware-backed, non-exportable; use it to wrap/unwrap the master key with a
   StrongBox/TEE key, optionally gated by `setUserAuthenticationRequired` biometrics). These keep
   raw key material off disk and out of backups in the clear.
3. **Passphrase + Argon2id** — classic fallback for cross-platform / no-passkey users.

### Escrow / recovery

- **Recovery code**: generate a high-entropy code at setup, use it to wrap an escrow copy of the
  master key; the user stores it offline (Notesnook's model — "without password *and* recovery key,
  notes cannot be decrypted by anyone"). No vendor recovery = true zero-knowledge.
- Optionally offer **Shamir split** or a sealed escrow to the user's own cloud, never to the vendor.

---

## 7. Real-time collaboration without a vendor server

- **y-webrtc** propagates Yjs updates **peer-to-peer over WebRTC**. Signaling servers only do
  **peer discovery via a shared room name**; "no sensitive information (WebRTC connection info,
  shared data) is shared over the signaling servers," and if a **room password** is set it
  **encrypts all signaling traffic**, so even an untrusted signaling server can't MITM. This is the
  canonical "relay sees only ciphertext / metadata" design.
- **Limits:** each peer connects to every other peer → practical cap ~35 peers (20 + up to 15),
  "not suited for a large number of collaborators on one doc"; and **NAT traversal needs STUN/TURN**
  (a TURN relay may be required, and a TURN relay *does* carry traffic — but if the app-layer data
  is already E2E encrypted, the relay sees only ciphertext).
- **Relay-only server that sees ciphertext:** the pragmatic middle ground — a tiny y-websocket/
  relay that forwards already-encrypted CRDT updates and never has keys. This solves NAT + presence
  + late-joiner catch-up without becoming a server of record. This matches Anytype's model (sync
  nodes hold encrypted data they can't read) and the Ink & Switch note that CRDTs sync "via any
  channel."
- **Share links:** encode a note id + a wrapped content key in the URL fragment (`#...`, never sent
  to any server); the recipient's client uses it to join the room and decrypt. Revocation requires
  rotating the content key and re-wrapping for remaining members.

---

## 8. Attachments (audio / PDF / images)

- **Content-addressed immutable blobs.** Hash the plaintext (or ciphertext) → store as
  `attachments/<hash>` in the cloud drive; the note CRDT holds only the hash + metadata (mime,
  size, wrapped content key). Immutable + content-addressed = free dedup, trivial caching, no merge
  conflicts (a blob never changes).
- **Encrypt per-attachment** with its own random content key (envelope-wrapped like items). Large
  files: chunk + stream-encrypt (XChaCha20-Poly1305 per chunk) so mobile can encrypt/decrypt without
  loading the whole file — Joplin chunks for exactly this reason.
- **Lazy sync:** don't force-download every attachment; fetch on open (mirrors iCloud eviction/
  placeholder behavior and Drive's on-demand model). Keep a small local cache with an LRU budget.
- **Garbage collection:** when no note references a blob after a grace period, mark for deletion —
  but respect version history / trash retention before actually purging.

---

## 9. Version history, trash / undelete, export

- **Version history** falls out of the op-log + periodic snapshots: keep a bounded ring of past
  snapshots (e.g. hourly for a day, daily for a month) plus the op tail, so any point can be
  reconstructed. Automerge's DAG or Loro's native time-travel give this "for free"; with Yjs you
  persist encoded snapshots yourself. Obsidian Sync's model (retain N days of versions) is a good
  UX reference.
- **Trash / undelete:** deletion is a **tombstone op** (CRDT-friendly and mergeable), not a
  destructive erase — the note moves to a Trash view and is only physically purged after a retention
  window. This also handles the "device A deletes while device B edits" race gracefully (edits win
  until purge, or add-wins per policy). Note the Drive `appDataFolder` caveat: **no trashing there**,
  so implement trash at the app layer, not by relying on the drive's trash.
- **Export / open formats (longevity — ideal #5):**
  - **Markdown** for text (lossy on ink/positions but maximally portable).
  - **PDF** for read-only fidelity (renders ink + text + layout).
  - **`.sanenote` bundle** = a documented open container (a zip/folder) holding: `note.json`
    (structure + text as portable JSON/Peritext export), `strokes/` (open stroke format: points,
    pressure, tilt, tool, color, timestamps), `attachments/` (original blobs), and a `manifest.json`
    (ids, HLC vector, schema version). Ship a **published format spec** so the data outlives the app —
    the essay's core longevity requirement. Provide plain-file, cleartext export on the user's own
    device (decrypted) so ownership is real, not just theoretical.

---

## Recommended data model

A note is a small **tree of documents**, each an independently syncable CRDT, so files stay small
(§3 chunking) and different sub-models use the right CRDT:

- **Library / workspace tree (movable-tree CRDT).** Notebooks, sections, pages, and their order/
  nesting. Native in Loro (Movable Tree); otherwise list-with-move (Unique Set + LWW
  fractional-index position register). Nodes carry LWW metadata (title, icon, tags, `trashed` flag,
  `deletedAt`).
- **Per-page documents**, one CRDT (and one sync file-set) per page:
  - **Rich-text layer** — Peritext-style: plain-text sequence CRDT with unique `opId`s + `addMark`
    spans anchored `before`/`after`, LWW on overlap. (Loro/Automerge native; Yjs alternative.)
  - **Block/structure layer** — headings, list nesting, tables, block order: a small movable-tree /
    list-with-move CRDT (Peritext is inline-only, so blocks live here).
  - **Ink layer** — **Unique Set of immutable stroke objects**; membership is add-wins/observed-remove;
    each stroke has LWW registers for color, width, opacity, z-order, position, group id. Heavy sample
    data + thumbnails offloaded to content-addressed attachment blobs; the CRDT holds only ids +
    attributes + hash.
- **Ops & clocks.** Everything is an op in an append-only **op-log**; each op stamped with a **Hybrid
  Logical Clock** `(physical_ms, counter, deviceId)`. LWW resolves by HLC, ties by `deviceId`.
  Compact the log into snapshots periodically; keep a bounded history for version history/undo.
- **Attachments.** Content-addressed, per-blob-encrypted, immutable; referenced by hash; lazily synced.
- **Keys.** Per-item (or per-page) content keys, wrapped by items keys, wrapped by the master key
  (envelope). Master key from passkey-PRF (preferred) / platform keychain / Argon2id passphrase;
  escrow via user-held recovery code.

## Recommended sync design (v1 file-based, v2 realtime)

**v1 — file-based over the user's cloud drive (ship this first):**

- **Layout:** per-note directory = **compacted snapshot** (whole-doc CRDT, occasionally rewritten)
  + **per-device append-only op-log segment files** (`ops/<deviceId>.<seq>.enc`) for the recent tail,
  + `attachments/<hash>.enc`, + `manifest.json` (encrypted; ids, HLC vector, schema version, hashes).
- **Single-writer files** → no cross-device write conflicts → the cloud drive **never needs to make
  a conflict copy**. A new/returning device loads the latest snapshot + replays every device's tail
  and CRDT-merges. Prune segments once folded into a newer snapshot.
- **Everything encrypted before it hits the drive** (XChaCha20-Poly1305 + envelope keys). The drive
  is dumb transport; it can't read anything.
- **Backends:** iCloud Drive via `NSFileCoordinator`/`NSFilePresenter` + `NSMetadataQuery`, handling
  eviction/placeholders and never forcing sync; Google Drive **visible folder** (`drive.file`, for
  longevity) via **Changes API + watch push**, `appDataFolder` for device state only; OneDrive/
  Dropbox/WebDAV via delta APIs or etag/mtime scanning. Atomic temp-write + rename for any whole-doc
  rewrite. If a whole-doc file ever conflicts (iCloud `NSFileVersion`, Dropbox "conflicted copy"),
  CRDT-merge all variants silently and write one resolved snapshot — never show the user a conflict file.
- **Change detection:** push/webhook where available (Drive watch), else polled deltas, else metadata
  query; graceful UI for seconds-to-hours latency + a manual "sync now."

**v2 — optional real-time, still zero-server-of-record:**

- **y-webrtc-style P2P** for same-doc live editing: signaling server does discovery only; **room
  password encrypts signaling**; app-layer CRDT updates are E2E encrypted so any **TURN relay sees
  only ciphertext**. Falls back to the v1 file layer when peers are offline (they reconcile via the
  cloud drive). Small groups only (~dozens of peers max).
- **Optional relay-only catch-up server** that forwards already-encrypted updates and holds no keys,
  for presence + late-joiner sync without becoming authoritative (Anytype-style encrypted sync node).
- **Share links** carry `noteId + wrapped content key` in the URL **fragment** (never sent to a
  server); revocation = rotate the content key and re-wrap for remaining members.

## Threats & mitigations

- **Cloud provider / storage breach reads notes.** → Client-side E2EE of every byte
  (XChaCha20-Poly1305 + envelope keys); provider stores only ciphertext (the essay's ideal #6).
- **Weak passphrase brute-forced from stolen ciphertext.** → **Argon2id** (memory-hard, 64 MiB/5
  iters), per-user random salt derived from a stored seed so no shared/weak salts; prefer
  **passkey-PRF** (hardware secret, no guessable password at all).
- **Metadata leakage** (titles, paths, timestamps, sizes — cf. Obsidian paths, Bear titles/tags).
  → Encrypt file/note names (store opaque ids, keep the name→id map only inside encrypted payloads);
  pad/round sizes; avoid deterministic filename hashes unless dedup is worth the confirmation-attack
  risk (Obsidian accepts that tradeoff). Decide and document what metadata is intentionally cleartext.
- **Cloud "conflict copies" corrupt or fork data.** → Single-writer op-log segments (no conflicts by
  construction); treat any conflict variant as another replica and CRDT-merge; atomic rename;
  manifest hash to reject partial/truncated files.
- **CRDT history blow-up / slow load** (the essay's own warning). → Chunk per page; compact to
  snapshots (Loro shallow snapshot / Yjs GC / Automerge 3 compression); offload heavy stroke/attachment
  payloads to immutable content-addressed blobs.
- **Lost device / lost passphrase = permanent data loss** (true zero-knowledge has no vendor reset).
  → User-held **recovery code** wrapping an escrow key; wrapped master key synced via **iCloud
  Keychain / Android Keystore / Google Password Manager**; clear UX that recovery code loss is fatal.
- **Malicious / untrusted signaling or TURN relay.** → Room-password-encrypted signaling; E2E-encrypted
  payloads so relays carry only ciphertext; authenticate peers by public key (Ed25519, Anytype-style).
- **Compromised device with app unlocked.** → Hardware-backed keys gated by biometrics
  (`setUserAuthenticationRequired` on Android Keystore; Secure Enclave / passkey user-verification);
  auto-lock; don't persist decrypted master key in plaintext.
- **Silent data corruption / bit-rot in the cloud.** → AEAD auth tags detect tampering/corruption;
  content-addressed blobs are self-verifying; keep multiple snapshot generations for recovery.
- **Vendor shutdown (longevity).** → Local plain files or a documented open **`.sanenote`** bundle +
  Markdown/PDF export on the user's own device; sync backend is the user's own cloud, so the app
  disappearing doesn't strand the data (ideals #5, #7).
- **Provider quota exhaustion / throttling** (Drive quota, iCloud throttle, `appDataFolder` counts
  against quota). → Compact aggressively, dedup attachments, lazy-fetch, exponential backoff on
  403/429, surface storage-full state to the user.

---

## Sources

- Ink & Switch — Local-first software: you own your data, in spite of the cloud — https://www.inkandswitch.com/essay/local-first/
- Ink & Switch — Peritext: A CRDT for Rich-Text Collaboration — https://www.inkandswitch.com/peritext/
- Matthew Weidner — Designing Data Structures for Collaborative Apps — https://mattweidner.com/2022/02/10/collaborative-data-design.html
- PkgPulse — Yjs vs Automerge vs Loro: CRDT Libraries 2026 — https://www.pkgpulse.com/guides/yjs-vs-automerge-vs-loro-crdt-libraries-2026
- Loro — JS/WASM Benchmarks (Performance) — https://www.loro.dev/docs/performance
- Yjs Community — Yjs vs Loro (new CRDT lib) — https://discuss.yjs.dev/t/yjs-vs-loro-new-crdt-lib/2567
- Automerge — Automerge 3.0 blog — https://automerge.org/blog/automerge-3/
- arXiv — Collaborative Text Editing with Eg-walker: Better, Faster, Smaller — https://arxiv.org/abs/2409.14252
- Carlo Zottmann — iOS iCloud Drive Synchronization Deep Dive — https://zottmann.org/2025/09/08/ios-icloud-drive-synchronization-deep.html
- Google Drive API — Store application-specific data (appDataFolder) — https://developers.google.com/drive/api/guides/appdata
- Standard Notes — Encryption specification — https://docs.standardnotes.com/specification/encryption/ (via r.jina.ai reader)
- Obsidian — Obsidian Sync: Security and privacy — https://obsidian.md/help/Obsidian+Sync/Security+and+privacy
- Joplin — End-to-end encryption (E2EE) — https://joplinapp.org/help/apps/sync/e2ee/
- Joplin — E2EE spec (dev) — https://joplinapp.org/help/dev/spec/e2ee/
- Notesnook — How is my data encrypted — https://help.notesnook.com/how-is-my-data-encrypted (via r.jina.ai reader)
- Anytype — any-sync protocol overview — https://tech.anytype.io/any-sync/overview (via r.jina.ai reader)
- Bear — Sync & Privacy FAQ — https://bear.app/faq/syncing-privacy/ (via r.jina.ai reader)
- Corbado — Passkeys and the WebAuthn PRF extension — https://www.corbado.com/blog/passkeys-prf-webauthn (via r.jina.ai reader)
- y-webrtc (GitHub) — WebRTC provider for Yjs — https://github.com/yjs/y-webrtc
- PowerSync — Local-First Software (Ink & Switch summary) — https://powersync.com/blog/local-first-software-origins-and-evolution
