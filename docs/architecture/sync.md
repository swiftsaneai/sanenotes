# Sane Notes — Sync over User-Owned Cloud Drives

> **Audience:** an autonomous coding agent implementing `packages/sane_sync` and the federated cloud-drive
> plugins under `plugins/` (Swift for iCloud, Kotlin + Dart for Google Drive). Zero prior context assumed.
> **Status:** normative architecture for the v1 file-based sync engine. Real-time collaboration transport is
> a separate concern (→ [`../adr/0013-collaboration-transport.md`](../adr/0013-collaboration-transport.md)).
> **Owns:** how encrypted bytes move between a device's local store and the user's own cloud drive; the
> single-writer layout; change detection; conflict avoidance/resolution; the iCloud Drive and Google Drive
> adapters and their quotas/limits.
> **Does not own:** byte layout (→ [`./file-format.md`](./file-format.md)), CRDT merge (→
> [`./document-model.md`](./document-model.md)), key management (→ [`./crypto.md`](./crypto.md)).
> **Decision record:** [`../adr/0006-sync-over-user-cloud-drives.md`](../adr/0006-sync-over-user-cloud-drives.md),
> [`../adr/0004-local-first-zero-server.md`](../adr/0004-local-first-zero-server.md).
> **Primary evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
> §4 (file-based sync, iCloud specifics, Drive appDataFolder), §"Recommended sync design";
> [`../research/sources/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md)
> §9 (UIDocument/NSFileCoordinator/CloudKit);
> [`../research/sources/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md)
> §7 (SAF, Drive REST, appDataFolder).

---

## 0. Principles (the non-negotiables)

1. **The cloud drive is dumb, encrypted transport.** No Sane Notes server ever stores note content. The
   user's own iCloud Drive / Google Drive (later OneDrive/Dropbox/WebDAV) is a bytes-in/bytes-out store that
   only ever holds ciphertext (→ [`./crypto.md`](./crypto.md); research §4). All merging happens on-device.
2. **Single-writer files ⇒ no cloud conflict copies.** Each device writes only its own op-log segments; whole
   files are never co-written, so iCloud/Drive/Dropbox never need to fork a "conflicted copy." This is the
   single design choice that makes zero-server merge robust (research §4 "Op-log segments, one append-only
   file per device").
3. **Merge is the CRDT's job, not the drive's.** If a whole-doc file (a snapshot) ever *does* conflict, we
   treat every variant as just another replica, CRDT-merge them, and write one resolved snapshot — the user
   never sees a conflict file (research §4 "Conflict-copy handling").
4. **Tolerate seconds-to-hours latency.** iCloud will not sync on command; design the UI for eventual sync
   and always expose a manual "Sync now" (research §4 "You cannot force a sync").
5. **Everything encrypted before it touches the drive.** The adapter layer never sees plaintext; it moves
   opaque, already-encrypted, already-padded blobs (→ [`./file-format.md`](./file-format.md) §6).

---

## 1. On-drive layout

The sync store mirrors the `.sanenote` bundle tree (→ [`./file-format.md`](./file-format.md) §1) but exploded
per page and per device, with **opaque random ids** (never content- or name-derived) and ciphertext bodies:

```
<SaneNotesRoot>/                         # a visible folder (Drive) or ubiquity container (iCloud)
├── manifest.cbor                        # notebook/workspace root manifest (ciphertext fields)
├── manifest.cbor.<deviceId>            # per-device manifest shard (single-writer; merged on read)
├── keys/                                # wrapped key material (never plaintext) — crypto.md
│   └── <keyId>.wrap
├── pages/
│   └── <pageId>/                        # pageId = opaque 16-byte random id
│       ├── snapshot.<gen>.snap          # whole-doc; rewritten by the compacting device (rare)
│       └── ops/
│           └── <deviceId>.<seq>.oplog   # SINGLE-WRITER append-only; the common write path
└── blobs/
    └── <blobId>.blob                    # content-addressed (random id in store), immutable, chunk-encrypted
```

- **Manifest is sharded per device** (`manifest.cbor.<deviceId>`) precisely so the manifest is also
  single-writer. Readers merge all shards (LWW/OR-Set over the manifest's own CRDT fields) into the effective
  manifest. A periodically-rewritten consolidated `manifest.cbor` (by the compacting device) bounds shard
  count.
- **Why a visible folder (Drive) not appData:** longevity/user-control — the user can see, back up, and keep
  the encrypted bundle even after uninstalling (research §4 "Visible folder … trades tidiness for user
  longevity/control"). `appDataFolder` is used only for **device-local state** that should vanish on
  uninstall (e.g. this device's sync cursors), never for notes.

---

## 2. The sync loop

A device runs one sync loop per configured backend. It is a reconciliation, not a stream:

```
loop (on change-signal, on foreground, on manual "Sync now", on interval backoff):
  1. PULL manifest shards + changed op-log segments + changed snapshots (change detection §4)
  2. VERIFY each member's hash against the merged manifest; drop partial/tampered members (file-format §4.4)
  3. DECRYPT (crypto.md) and MERGE ops/snapshots into local state (document-model.md CRDT rules)
  4. LAZILY fetch only the blobs the UI needs now (never force-download attachments)
  5. PUSH this device's own new op-log segment appends + any snapshot it compacted + its manifest shard
  6. UPDATE local sync cursor / HLC watermark; schedule next wake
```

Steps 1 and 5 touch only files this device is allowed to read/write; step 5 writes **only single-writer
files** (this device's `ops/<thisDeviceId>.*`, its manifest shard, and — if it compacted — a new snapshot
generation written temp-then-rename). There is never a read-modify-write race on a shared file.

### 2.1 What a returning/new device does (catch-up)

Research §4 "recommended hybrid": a returning device **loads the latest snapshot generation, then replays
every device's op-log tail** (all `ops/*.oplog` with HLCs above the snapshot watermark), CRDT-merging. It
diffs the manifest's `hlcVector` against its own to know exactly which segments/ranges it still needs
(→ [`./document-model.md`](./document-model.md) §2.4). It fetches page snapshots lazily (only for pages the
user opens) so a 1,000-page notebook opens instantly with structure and streams contents on demand.

---

## 3. Atomicity, ordering & integrity

- **Append-only segments** need no rename: appended bytes either arrive whole (validated by length+CRC, →
  [`./file-format.md`](./file-format.md) §3.2) or are ignored until they do. A torn upload is self-healing.
- **Snapshot rewrites are atomic:** temp-then-rename on local FS; on the drive, use the adapter's
  atomic-publish (iCloud coordinated write; Drive resumable-upload-then-metadata-commit) and only update the
  manifest after the new snapshot is durable. Old generations are deleted only after the manifest referencing
  the new one is durable (research §4 "Atomic writes").
- **Hash-verified reads:** the manifest's BLAKE3 hash tree lets a reader reject a partially-synced or
  tampered member and wait/re-fetch (research "Threats: silent data corruption"). AEAD tags independently
  detect any bit-flip inside a member.
- **HLC total order** gives deterministic merge regardless of the order segments arrive (→ document-model
  §3), so out-of-order or delayed delivery (guaranteed on iCloud) is correct, just slower.

---

## 4. Change detection

Push where available, poll where not, always with backoff (research §4 "Change detection"):

| Backend | Preferred | Fallback |
|---|---|---|
| iCloud Drive | `NSMetadataQuery` live-update notifications on the ubiquity container | periodic coordinated directory scan |
| Google Drive | **Changes API** `changes.watch` push channel (webhook) | `changes.list` incremental polling with `startPageToken` |
| Dropbox | `/files/list_folder/longpoll` | `list_folder/continue` polling |
| OneDrive | delta query subscription | `delta` polling |
| WebDAV | — (no push) | `PROPFIND` etag/mtime scan on interval |

A device also syncs on foreground, on app background-refresh windows, and on explicit "Sync now." It never
assumes push fires promptly.

---

## 5. iCloud Drive adapter (Apple platforms)

Implemented as the iCloud implementation of the `sane_cloud_drive` federated plugin
(`plugins/sane_cloud_drive`, Swift) exposing a narrow Dart API. All access
goes through the document/coordination stack, never raw `FileManager` on the ubiquity container.

### 5.1 APIs (research
[`../research/sources/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md) §9)

| Concern | API | Notes |
|---|---|---|
| Container | iCloud Drive **ubiquity container** (app entitlement) | the `<SaneNotesRoot>` lives here; visible in the Files app for user control |
| Read/write coordination | **`NSFileCoordinator`** + **`NSFilePresenter`** | mandatory — coordinates with the sync daemon so we never race it. Presenters are "very expensive objects" (heavy IPC) → register **few** (one per open page at most), not per file |
| Change detection | **`NSMetadataQuery`** | observe item add/modify/remove and download state; the live event source |
| Eviction/placeholders | `isUbiquitousItem`, `startDownloadingUbiquitousItem(at:)`, `evictUbiquitousItem(at:)` | files may be **placeholders**; trigger download before reading; check `ubiquitousItemDownloadingStatus` |
| Conflict detection | **`NSFileVersion`** (`unresolvedConflictVersionsOfItem(at:)`) | for the rare snapshot conflict; resolve silently (§5.3) |
| Optional document wrapper | `UIDocument` (safe-save, autosave, `.inConflict`) | may wrap snapshot files; **not** used for op-log segments (they're single-writer append-only) |

### 5.2 Behaviour & limits (research §4 "iCloud Drive specifics")

- **You cannot force a sync.** iOS schedules by network/battery/thermal/usage; background refresh gives only
  ~30 s; CloudKit/metadata is throttled (~30 s minimum intervals). Unidirectional propagation delays and
  stuck "Waiting…" states are common. → UI shows per-item sync state and a manual "Sync now"; never block the
  editor on sync.
- **Placeholders/eviction:** treat every read as "may need download first"; lazy-fetch blobs (audio/PDF) via
  `startDownloadingUbiquitousItem` on open, evict under local cache pressure.
- **Coordinated writes only:** wrap every write in `NSFileCoordinator.coordinate(writingItemAt:…)`; wrap
  reads in the reading variant. Register a single `NSFilePresenter` per open page.

### 5.3 Conflict handling

With single-writer op-log segments, per-file conflicts on segments **cannot arise** (one writer). The only
conflictable file is a **snapshot** (rewritten by whichever device compacts). If two devices compact the same
page concurrently, iCloud yields `NSFileVersion` conflict variants → the adapter reads all variants,
CRDT-merges them (they are just replicas of the same folded state), writes one resolved snapshot generation
via a coordinated atomic write, and marks the others resolved (`NSFileVersion` `isResolved = true`). The user
never sees a conflict file (research §4). To make even this rare, **compaction is coordinated** (§8): a device
takes a soft lease before compacting.

### 5.4 Why not CloudKit as the engine?

Bear uses CloudKit as its whole sync engine and it is faster than file sync (research §4 "Bear is the
reference point"). We deliberately **do not** make CloudKit the engine because it is Apple-ecosystem-bound and
we need one sync model across five platforms (locked decision 1: single codebase, cross-platform parity).
iCloud Drive *file* sync gives us the same substrate as Google Drive, keeping the adapter contract uniform.
(A CloudKit fast-path for Apple-only users is a possible future optimisation — record as an option in
[ADR-0006](../adr/0006-sync-over-user-cloud-drives.md), not v1.)

---

## 6. Google Drive adapter (all platforms)

Two integration paths depending on platform; both hit the **Drive REST API v3** (the Drive Android API is
retired — research
[`../research/sources/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md) §7).

### 6.1 Integration paths

| Path | When | Mechanism |
|---|---|---|
| **Drive REST API v3** (primary, all platforms) | signed-in Google account, direct sync | OAuth token → `files`, `changes`, resumable uploads; runs from Dart via the REST client, or Kotlin `SyncAdapter` on Android for background sync |
| **Storage Access Framework (SAF)** (Android, backend-less) | user picks a Drive/any-provider folder | `ACTION_OPEN_DOCUMENT_TREE` grants a directory; `takePersistableUriPermission()` persists it across reboots; read/write via `DocumentsProvider`/`DocumentFile`. Prefer `ACTION_OPEN_DOCUMENT` (live handle) over `ACTION_GET_CONTENT` (imports a copy) |

SAF is the "no OAuth, user-chosen provider, works with Drive/Dropbox/OneDrive/local uniformly" path on
Android (research §7). The REST path is required on iOS/web/desktop and for push notifications.

### 6.2 Scopes & folder choice (research §4, §7)

| Scope | Visibility | Use |
|---|---|---|
| **`drive.file`** | app-created files, visible in the user's Drive | **primary** — the `<SaneNotesRoot>` visible folder; longevity/user-control; least-privilege (only files we create) |
| **`drive.appdata`** (`appDataFolder`) | hidden per-app folder | **device-local state only** (sync cursors, this device's config) — never notes |

`appDataFolder` limits that force the visible-folder choice for notes (research §4): **no sharing**
(`notSupportedForAppDataFolderFiles`), **no trashing** (permanent delete only — so app-layer Trash is
mandatory anyway, → [`./file-format.md`](./file-format.md) §8), files can't move out, and it is **deleted on
app uninstall**. It counts against the user's Drive quota either way. We never request the broad
`https://www.googleapis.com/auth/drive` scope (over-privileged, harms Play Data-safety story).

### 6.3 Change detection & push

- **Poll:** `changes.getStartPageToken` once, then `changes.list(pageToken)` incrementally; persist the
  `newStartPageToken` as the device's cursor (research §7 "Changes collection"). This is the reliable
  baseline everywhere.
- **Push:** `changes.watch` registers a **watch channel** (webhook) that posts change notifications, avoiding
  tight polling. A webhook needs a public HTTPS endpoint — which we do **not** want to make note-content-aware.
  Options, in order: (a) rely on polling only (simplest, zero server — the v1 default); (b) a **tiny stateless
  notifier** that receives Drive's content-free "something changed" ping and forwards a wake via push
  notification, holding no keys and seeing no note content (consistent with the "relay sees only ciphertext"
  posture, → [ADR-0013](../adr/0013-collaboration-transport.md)). Decide per [ADR-0006]; **v1 ships polling**,
  push is an optimisation.

### 6.4 Uploads, atomicity, conflict copies

- **Append/rewrite:** Drive files are immutable-content updates (a new revision). For an op-log segment, we
  re-`update` the file with the grown tail (or, better, **rotate to a new segment file at the size cap**, →
  [`./file-format.md`](./file-format.md) §3.4, so each upload is small and a segment is written once). Use
  **resumable uploads** for anything > a few hundred KB (audio blobs).
- **Atomic snapshot publish:** upload the new snapshot as a new file (`snapshot.<gen+1>.snap`), confirm
  success, then update the manifest shard, then delete the old generation. Never overwrite a snapshot in
  place.
- **"Conflict copies":** Drive keeps **competing revisions** rather than sibling files; with single-writer
  files this never triggers. If a snapshot ever gets two revisions (concurrent compaction), fetch both
  revisions (`revisions.list`/`get`), CRDT-merge, publish a resolved one (research §4).

### 6.5 Quotas & limits (research §4/§7; **verify current numbers before shipping**)

- Drive API enforces **per-user and per-project rate limits**; on **403 `rateLimitExceeded`/`userRateLimit`**
  or **429** → **exponential backoff with jitter** (mandatory), respect `Retry-After`. **verify** exact
  QPS/quota numbers against current Google docs.
- Storage counts against the **user's Drive quota** (both visible folder and `appDataFolder`). Surface
  "Drive full" as a first-class state; compact aggressively, dedup blobs, and pad conservatively (→
  [`./file-format.md`](./file-format.md) §6.3) to limit footprint.
- Watch channels **expire** and must be renewed; handle channel expiry/`sync` messages. **verify** max TTL.

---

## 7. Other backends (later)

Same contract — bytes-in/bytes-out for encrypted single-writer segments + snapshots + blobs (research §4
"OneDrive / Dropbox / WebDAV"):

| Backend | Delta/push | Notes |
|---|---|---|
| **OneDrive** | delta query + subscriptions | Graph API; app folder available; same visible-folder preference |
| **Dropbox** | `list_folder/continue` + `longpoll`; "conflicted copy" siblings → merge & delete | |
| **WebDAV** | none; etag/mtime `PROPFIND` scan | atomic rename via `MOVE`; the lowest common denominator |

The adapter interface (below) is designed so a new backend is a small plugin, not a core change.

---

## 8. Compaction coordination

Compaction (folding op tails into a new snapshot + GC, → [`./document-model.md`](./document-model.md) §8) is
the only operation that rewrites a shared file, so it is coordinated to avoid concurrent-compaction conflicts:

- A device takes a **soft lease** before compacting a page: it writes `pages/<id>/compaction.lease` (a
  single-writer file `lease.<deviceId>` with an HLC + TTL). A device compacts only if no unexpired lease from
  a higher-priority device exists (priority = lowest `DeviceId`, deterministic). Leases are advisory, not
  correctness-critical: if two devices compact anyway, §5.3/§6.4 merge-resolves the snapshots. The lease just
  makes that rare.
- Only an **idle** device compacts (page open, no active writing, on power/wifi ideally) to avoid competing
  with the low-latency ink path for I/O.

---

## 9. The adapter interface (`sane_sync`)

A backend is a `CloudDriveAdapter`; `sane_sync` orchestrates the loop (§2) over it. Kept deliberately dumb —
no CRDT, no crypto, just bytes and change events.

```dart
abstract class CloudDriveAdapter {
  String get id;                                   // 'icloud' | 'gdrive' | 'dropbox' | ...

  Future<void> connect(AuthContext auth);          // OAuth / SAF grant / ubiquity entitlement
  Future<DriveCursor> currentCursor();             // startPageToken / metadata anchor

  // Change detection
  Stream<DriveChange> watch();                     // push where available; adapter falls back to poll
  Future<List<DriveChange>> pollSince(DriveCursor c);

  // Bytes (all ciphertext; opaque paths)
  Future<Bytes> read(DrivePath p, {Range? range}); // range read for chunked blobs
  Future<DrivePath> writeNew(DrivePath p, Bytes b);// create; resumable for large
  Future<void> appendOrReplace(DrivePath p, Bytes tail); // segment growth
  Future<void> atomicPublish(DrivePath tmp, DrivePath finalP); // temp→rename / revision commit
  Future<void> delete(DrivePath p);                // note: appDataFolder = permanent delete only

  // Conflicts (rare; snapshots only)
  Future<List<Bytes>> conflictVariants(DrivePath p); // NSFileVersion / Drive revisions / Dropbox siblings
  Future<void> resolveConflict(DrivePath p, Bytes resolved);

  DriveLimits get limits;                          // quota hints, max upload, backoff policy
}
```

`sane_sync` is responsible for encryption (calls `sane_crypto`), hashing/verification (manifest hash tree),
CRDT merge (calls `sane_core`), lazy blob fetch + LRU cache, backoff, and surfacing sync state to the UI.

---

## 10. Sync UX contract

Because latency is unavoidable (§5.2), the sync state is a first-class, honest UI surface (product principle:
trustworthy sync; the category's #1 complaint per
[`../product/vision-and-principles.md`](../product/vision-and-principles.md)):

- Per-page and global states: `upToDate` · `syncing` · `pendingUpload(n)` · `pendingDownload(n)` ·
  `offline` · `driveFull` · `authNeeded` · `conflictResolvedSilently` (log only).
- Always-available **"Sync now"** (best-effort; cannot force iCloud but triggers our loop + download requests).
- **Never** block writing or reading on sync; local-first means the editor is always live from the local
  store (research "no spinners").
- Surface **quota** and **auth-expiry** clearly; both are recoverable states, not errors.

---

## 11. Threats (sync layer) → mitigations

Condensed from research "Threats & mitigations"; full per-decision list in
[ADR-0006](../adr/0006-sync-over-user-cloud-drives.md).

| Threat | Mitigation |
|---|---|
| Cloud provider reads notes | client-side E2EE of every byte; adapter only ever handles ciphertext (crypto.md) |
| Cloud "conflict copies" fork/corrupt data | single-writer op-log segments (no conflicts by construction); merge any snapshot variant, never surface a conflict file |
| Partial/truncated synced file | length+CRC on segment records; manifest BLAKE3 hash tree; ignore until complete |
| Malicious drive tampers/reorders bytes | AEAD tags + per-record AAD (position-bound); manifest hash-chain detects rollback |
| Metadata leakage (paths, titles, sizes) | opaque random ids (never names/hashes as paths); encrypted manifest fields; size padding (file-format §6) |
| Provider quota exhaustion / throttling | exponential backoff + jitter on 403/429; aggressive compaction; blob dedup; lazy fetch; "Drive full" UX |
| Sync never fires (iCloud) | poll + foreground + manual "Sync now"; UI tolerant of hours-long latency |
| Stale offline device resurrects deleted data | causal-stability GC gate (document-model §8) before any physical purge |

---

## 12. Open questions / verify list

- **Drive quota/QPS numbers, watch-channel TTL:** **verify** against current Google Drive API docs before
  hard-coding backoff/renew intervals.
- **Background sync on iOS:** confirm how much `NSMetadataQuery` + background refresh actually delivers in
  practice on iOS 17+; the ~30 s budget may need a "sync on next foreground" fallback for large catch-ups.
  **verify** on-device.
- **Dart Drive REST client:** use `googleapis`/`googleapis_auth` (**verify** maintenance) vs a hand-rolled
  minimal client (smaller dep surface). Lean `googleapis` for v1.
- **SAF long-handle stability:** confirm `takePersistableUriPermission` survives Drive provider updates and
  document-id churn across Android versions. **verify** on-device.
- **Push notifier micro-service:** decide in [ADR-0006] whether the optional content-free Drive→push notifier
  ships in v1 or stays polling-only. Default: polling-only v1.
