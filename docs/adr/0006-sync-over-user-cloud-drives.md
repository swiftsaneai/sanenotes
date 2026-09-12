# ADR-0006: Sync over user-owned cloud drives

- **Status:** Accepted
- **Date:** 2026-09-13
- **Deciders:** Maintainer (Jatin Kumar Singh)
- **Relates to:** [ADR-0004 local-first](./0004-local-first-zero-server.md),
  [ADR-0005 document model & CRDT](./0005-document-model-and-crdt.md),
  [ADR-0007 E2EE & keys](./0007-end-to-end-encryption-and-keys.md),
  [ADR-0013 collaboration transport](./0013-collaboration-transport.md); specified in
  [`../architecture/sync.md`](../architecture/sync.md).
- **Evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
  §4 (file-based sync, iCloud/Drive specifics, conflict copies), §"Recommended sync design";
  [`../research/sources/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md)
  §9; [`../research/sources/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md) §7.

## Context

[ADR-0004](./0004-local-first-zero-server.md) forbids a server of record; sync must ride the **user's own**
cloud. Consumer cloud drives do **messy conflict resolution** ("conflicted copy" files) that we must never
expose. The research gives the robust pattern: use the drive as **dumb, encrypted transport** and make files
**single-writer** so the drive never needs a conflict copy (research §4). Each backend has sharp edges: iCloud
**cannot be force-synced** and evicts files to placeholders; Google Drive's **`appDataFolder`** can't be
shared, can't be trashed, and is deleted on uninstall; the Drive **Android API is retired** (REST only). We
must choose a layout and adapter model that works uniformly across five platforms.

## Decision

1. **The cloud drive is dumb, E2E-encrypted transport.** Adapters move only opaque ciphertext
   ([ADR-0007](./0007-end-to-end-encryption-and-keys.md)); all merge is on-device
   ([ADR-0005](./0005-document-model-and-crdt.md)).
2. **Single-writer, append-only op-log segments** (`ops/<deviceId>.<seq>.oplog`) are the primary write path.
   Because each file has one writer, **no cross-device write conflicts occur and the drive never makes a
   conflict copy** (research §4). The manifest is likewise **sharded per device**.
3. **Hybrid layout:** per-page directory = periodically-rewritten **compacted snapshot** (whole-doc) +
   per-device op-log tail + content-addressed blobs + manifest shards
   ([`../architecture/file-format.md`](../architecture/file-format.md) §1,
   [`../architecture/sync.md`](../architecture/sync.md) §1). Returning devices load the latest snapshot and
   replay tails.
4. **Any residual whole-doc conflict is CRDT-merged silently** and republished as one resolved snapshot — the
   user never sees a conflict file (research §4). Compaction is lease-coordinated to make this rare.
5. **Google Drive: visible folder with `drive.file` scope** for notes (longevity/user-control), never the
   broad `drive` scope; **`appDataFolder`** only for device-local state (cursors), because it can't be
   shared/trashed and dies on uninstall (research §4/§7). App-layer Trash is mandatory regardless.
6. **iCloud Drive: ubiquity container via `NSFileCoordinator`/`NSFilePresenter` + `NSMetadataQuery`**, handling
   eviction/placeholders and never forcing sync; the UI tolerates seconds-to-hours latency and offers "Sync
   now" (research §4). We deliberately **do not** use CloudKit as the engine (Apple-only; breaks cross-platform
   uniformity) — a CloudKit fast-path is a possible future option, not v1.
7. **Change detection: push where available, poll otherwise, always with backoff.** Drive **Changes API** with
   `changes.watch` push (or `changes.list` polling); iCloud `NSMetadataQuery`; **v1 ships Drive polling**, push
   (via an optional content-free notifier) is an optimisation.
8. **Uniform `CloudDriveAdapter` interface** so OneDrive/Dropbox/WebDAV are added as small plugins later
   ([`../architecture/sync.md`](../architecture/sync.md) §9).
9. **Atomic snapshot publish** (temp→rename / resumable-upload-then-manifest-commit); **hash-verified reads**
   via the manifest BLAKE3 tree; **exponential backoff + jitter** on 403/429; **size padding** and **lazy blob
   fetch** to respect quotas.

## Consequences

**Positive**
- Robust zero-server merge with **no user-visible conflicts** — directly fixing the category's #1 complaint.
- Uniform adapter contract across five platforms; new backends are plugins, not core changes.
- Least-privilege scopes and a visible, user-owned encrypted folder → strong Play Data-safety / App Store
  story and real user control (they keep the bundle after uninstall).

**Negative / costs**
- **Latency is the provider's** — iCloud especially (can't force sync, ~30 s background budget, throttling).
  UI must be latency-tolerant; large catch-ups may span app sessions.
- **Quota is the user's** — "Drive full" and iCloud-full are first-class states; we must compact/dedup/pad and
  fetch lazily to be frugal.
- **Manifest sharding + compaction leasing** add coordination code and edge cases (concurrent compaction,
  stale devices).
- **appDataFolder limits** force app-layer Trash and a visible folder — slightly less tidy, but longevity wins.
- **Watch-channel lifecycle** (expiry/renewal) and a possible tiny notifier service add ops surface if we
  enable push.

**Neutral**
- v1 polling-only Drive keeps the "no first-party service touches notes" property absolute; push is an opt-in
  later improvement.

## Alternatives considered

| Alternative | Verdict |
|---|---|
| **One file per note (whole-doc)** | Simplest, but concurrent writes → conflict copies + full-file rewrites on every save. Rejected as primary; used only as the compacted snapshot (rewritten rarely, atomically). |
| **CloudKit as the sync engine** (Bear's model) | Faster on Apple, no separate login, E2EE with ADP — but Apple-ecosystem-bound; breaks cross-platform uniformity (locked decision 1). Deferred as an optional Apple fast-path. |
| **Google Drive `appDataFolder` for notes** | Tidy/hidden, but no sharing, no trashing, deleted on uninstall, counts against quota. Rejected for notes; used for device state only. |
| **Our own sync server (even E2EE)** | Violates [ADR-0004](./0004-local-first-zero-server.md) (server of record). Rejected. |
| **Broad `drive` scope** | Over-privileged; harms Data-safety story and user trust. Rejected for least-privilege `drive.file`. |
| **Poll-only, no push, forever** | Simple and zero-server, but higher latency/quota use. Chosen for v1; push kept as an optimisation. |

## Threats

| Threat | Mitigation |
|---|---|
| Cloud provider reads notes | E2EE every byte; adapter only handles ciphertext ([ADR-0007](./0007-end-to-end-encryption-and-keys.md)) |
| Conflict copies fork/corrupt data | single-writer op-log segments + per-device manifest shards (no conflicts by construction); silent CRDT-merge of any snapshot variant |
| Partial/truncated synced file | record length+CRC; manifest BLAKE3 hash tree; ignore until complete ([`../architecture/file-format.md`](../architecture/file-format.md) §3–4) |
| Malicious drive tampers/reorders/rolls back | AEAD tags + position-bound AAD; manifest hash-chain detects rollback |
| Metadata leakage (paths/titles/sizes/timing) | opaque random ids (never names or content hashes as paths); encrypted manifest fields; size padding |
| Quota exhaustion / API throttling | backoff+jitter on 403/429; aggressive compaction; blob dedup; lazy fetch; "Drive full"/"iCloud full" UX |
| Sync never fires (iCloud won't force) | poll + foreground + manual "Sync now"; latency-tolerant UI |
| Stale offline device resurrects deleted data | causal-stability GC gate before any purge ([ADR-0005](./0005-document-model-and-crdt.md) §8) |
| OAuth token theft (Drive) | short-lived tokens, platform secure storage, least-privilege scope; token compromise still yields only ciphertext |

## Notes / follow-ups

- **verify** current Drive quota/QPS, watch-channel TTL, and iOS background-sync behaviour before hard-coding
  intervals ([`../architecture/sync.md`](../architecture/sync.md) §12).
- Decide push-notifier: **default polling-only v1**; if adopted, the notifier must be content-free and hold no
  keys (consistent with [ADR-0013](./0013-collaboration-transport.md)).
- Choose Dart Drive client (`googleapis`/`googleapis_auth` vs minimal hand-rolled) — lean `googleapis` for v1,
  **verify** maintenance.
