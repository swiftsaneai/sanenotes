# Backlog — area: storage

25 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-CORE-001](storage.md#sn-core-001) **Build the sane_core document model, CRDT and storage foundation** (epic · M0 Foundations)
  - [SN-CORE-006](storage.md#sn-core-006) **Implement ObjectId and DeviceId identity types** · p1 · task · S · M0 Foundations
  - [SN-CORE-011](storage.md#sn-core-011) **Implement Result and Failure sealed types** · p1 · task · S · M0 Foundations
  - [SN-CORE-002](storage.md#sn-core-002) **Implement document model entities** · p1 · task · M · M0 Foundations
  - [SN-CORE-012](storage.md#sn-core-012) **Define document-store repository interfaces** · p1 · task · S · M0 Foundations
  - [SN-CORE-003](sync.md#sn-core-003) **Implement add-wins set, LWW registers and HLC clocks** · p0 · feature · L · M0 Foundations
  - [SN-CORE-008](sync.md#sn-core-008) **Implement movable-tree and movable-list CRDT with fractional indexing** · p1 · feature · M · M0 Foundations
  - [SN-CORE-009](sync.md#sn-core-009) **Implement Peritext-style rich-text sequence CRDT** · p1 · feature · L · M0 Foundations
  - [SN-CORE-010](sync.md#sn-core-010) **Implement operation model, op-log and op-type registry** · p0 · feature · M · M0 Foundations
  - [SN-CORE-013](storage.md#sn-core-013) **Verify and select serialization and CRDT dependencies** · p2 · spike · S · M0 Foundations
  - [SN-CORE-024](qa.md#sn-core-024) **Build CRDT convergence property-based test harness** · p0 · test · L · M0 Foundations
  - [SN-CORE-019](sync.md#sn-core-019) **Implement ink erase CRDT semantics** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-CORE-017](storage.md#sn-core-017) **Implement shared on-disk codecs: delta, zigzag varint, zstd and CBOR** · p1 · task · M · M1 Ink Editor Alpha
  - [SN-CORE-004](storage.md#sn-core-004) **Implement drift/SQLite schema, migrations and storage isolate** · p0 · feature · L · M1 Ink Editor Alpha
  - [SN-CORE-014](storage.md#sn-core-014) **Implement content-addressed blob store with chunked framing** · p1 · task · M · M1 Ink Editor Alpha
  - [SN-CORE-015](storage.md#sn-core-015) **Implement snapshot file writer and reader with columnar strokes** · p1 · task · M · M1 Ink Editor Alpha
  - [SN-CORE-016](storage.md#sn-core-016) **Implement op-log segment file writer and reader** · p1 · task · M · M1 Ink Editor Alpha
  - [SN-CORE-005](storage.md#sn-core-005) **Implement .sanenote bundle reader/writer and manifest** · p0 · feature · L · M1 Ink Editor Alpha
  - [SN-CORE-022](storage.md#sn-core-022) **Implement schema versioning and migration framework** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-CORE-018](storage.md#sn-core-018) **Implement tombstone lifecycle and Trash retention** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-CORE-026](storage.md#sn-core-026) **Implement corruption recovery, atomic writes and format fuzz corpus** · p0 · security · M · M1 Ink Editor Alpha
  - [SN-CORE-020](storage.md#sn-core-020) **Implement compaction and causal-stability garbage collection** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-CORE-021](storage.md#sn-core-021) **Implement version history and snapshot ring retention** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-CORE-023](storage.md#sn-core-023) **Implement JSON structural export and import of the folded document** · p2 · feature · M · M2 Library & Documents
  - [SN-CORE-027](perf.md#sn-core-027) **Benchmark 1,000-page notebook open and CRDT merge performance** · p2 · test · S · M2 Library & Documents
  - [SN-GCMP-021](editor.md#sn-gcmp-021) **Add note-creation replay (session time-lapse over the timeline)** · p3 · feature · M · Backlog

---

## Issues

### SN-AND-018

<a id="sn-and-018"></a>

**Implement SAF document access with persistable URI permissions**

| Field | Value |
|---|---|
| GitHub | #71 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | android-tablet, android-phone |
| Areas | storage, sync, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-SYNC-004](sync.md#sn-sync-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-PLATFORM-3`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
Notes need no broad storage permission: the Storage Access Framework handles user-owned file access (docs/platform/android.md §5, §9). The sane_cloud_drive Android impl opens a document tree, persists the permission, and reads/writes ciphertext blobs only — supporting the user's own Google Drive sync and local import/export without a Sane Notes note-storage server (locked decision 3). Prefer OPEN_DOCUMENT/OPEN_DOCUMENT_TREE (persistent handle) over GET_CONTENT (copy) for editable notes.

#### Scope
**In:** ACTION_OPEN_DOCUMENT_TREE + takePersistableUriPermission; read/write of ciphertext blobs to a user-picked location; ACTION_OPEN_DOCUMENT / ACTION_CREATE_DOCUMENT for single-file import/export; path canonicalisation/confinement of any URI from file content.
**Out:** the Google Drive REST/Changes API sync engine (SN-SYNC-004, consumed here); encryption itself (SN-CRY-*); the iCloud adapter (SN-SYNC-003).

#### Acceptance criteria
- [ ] The app requests no broad READ/WRITE_EXTERNAL_STORAGE permission; all file access goes through SAF pickers.
- [ ] OPEN_DOCUMENT_TREE returns a tree Uri and takePersistableUriPermission keeps a durable handle across restarts; the app degrades gracefully if the permission is later revoked.
- [ ] Only ciphertext blobs are written to user-picked locations — plaintext note content never leaves sane_crypto (verified by a test that inspects written bytes).
- [ ] A URI or path derived from imported file content is canonicalised and confined; a traversal attempt (../, symlink) is rejected (CWE-22).
- [ ] Editable notes use a persistent OPEN_DOCUMENT handle, not a GET_CONTENT copy.

#### Technical notes
Kotlin: Intent ACTION_OPEN_DOCUMENT_TREE / ACTION_OPEN_DOCUMENT / ACTION_CREATE_DOCUMENT, ContentResolver.takePersistableUriPermission, DocumentFile (docs/platform/android.md §5, §8). sane_cloud_drive federated plugin (ADR-0012); consumed by sane_sync (SN-SYNC-004). Bytes are ciphertext from sane_crypto. Least-privilege, in-context permission (ADR-0012 rule 6).

#### Security & privacy
SAF avoids broad storage scope (MASVS-STORAGE-1/2); only ciphertext leaves the device (locked decision 3). Any path from file content is untrusted: canonicalise and confine to prevent traversal (CWE-22, MASVS-PLATFORM-3). Persisted URI permissions are the minimum needed; a revoked permission fails closed, never crashing or exposing data.

#### UX notes
The user picks exactly where their (encrypted) notes live via the system file picker — transparent, revocable, no scary storage prompt (docs/platform/android.md §9). Import/export lands in a view/confirm flow, never auto-overwriting. Errors (revoked access, missing file) are friendly and recoverable.

#### Test plan
plugins/sane_cloud_drive/test/saf_permission_test.dart (persist/revoke handling); plugins/sane_cloud_drive/test/ciphertext_only_test.dart (written bytes are ciphertext); a security test rejecting a traversal path; patrol integration test driving the real SAF picker on a device.

#### Dependencies
SN-SYNC-004 (Google Drive adapter consumes this SAF layer).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-CORE-001

<a id="sn-core-001"></a>

**Build the sane_core document model, CRDT and storage foundation**

| Field | Value |
|---|---|
| GitHub | #10 |
| Type | epic |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | storage, sync |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-2`, `MASVS-CODE-4`, `OWASP-A08`, `ASVS-V1`, `CWE-502` |
| Extra labels | agent-ready, innovation |

#### Context
`sane_core` is the lowest model layer of Sane Notes and the single most correctness-critical package: it owns the in-memory and on-the-wire *semantics* of a note (entities, ids, operations, clocks, conflict resolution, tombstones) and the local system-of-record persistence. Everything else — ink, editor, sync, search — is a materialised view of the op-log this package defines. It implements [ADR-0004](docs/adr/0004-local-first-zero-server.md) (device is system of record, zero-server), [ADR-0005](docs/adr/0005-document-model-and-crdt.md) (own the CRDT in pure Dart) and the two normative specs [`docs/architecture/document-model.md`](docs/architecture/document-model.md) and [`docs/architecture/file-format.md`](docs/architecture/file-format.md). It satisfies the M0 exit criterion "sane_core model + CRDT unit-tested headlessly" and delivers the M1 local-persistence foundation (drift schema + content-addressed blob store + `.sanenote` bundle v1). The CRDT is called out in ADR-0005 as the highest-risk single component, so its convergence test harness is an early deliverable.

#### Scope
**In:** the child issues below — entities, ids, HLC, the four CRDT models, the op-log, drift/SQLite persistence, the content-addressed blob store, the `.sanenote` bundle reader/writer, compression codecs, schema versioning/migration, tombstones/GC/compaction, version history, corruption recovery, JSON export/import, and the convergence + performance test harnesses. `sane_core` stays **pure Dart** (must not import `package:flutter`, per the package DAG in [`docs/architecture/overview.md`](docs/architecture/overview.md) §5).
**Out:** encryption (produced by `sane_crypto`; this package writes the cleartext local representation and defines *where* ciphertext sits per file-format §6), cloud transport (SN-SYNC-001), ink capture/geometry math (SN-INK-001), rendering (sane_render), and all UI.

#### Acceptance criteria
- [ ] All child issues below are merged and their DoD met.
- [ ] `sane_core` builds and its full test suite runs headlessly with no widget harness and no `package:flutter` import (arch-lint green).
- [ ] Write a stroke, close, reopen: strokes are byte-for-byte identical (op-log + snapshot round-trip).
- [ ] The convergence harness ([SN-CORE-024](qa.md#sn-core-024)) proves add-wins/LWW/movable/Peritext converge, are commutative and idempotent across randomised op orderings.
- [ ] A synthetic 1,000-page notebook's Library structure loads in < 1 s ([SN-CORE-027](perf.md#sn-core-027)), independent of page contents.

#### Technical notes
Package `packages/sane_core` (pure Dart), root of the model DAG; may import only `sane_crypto` for hashing/key types. Follows the entity hierarchy Workspace→Profile→Notebook→Page→Layer→Object and the op-log-is-source-of-truth model. Children: [SN-CORE-002](storage.md#sn-core-002) [SN-CORE-003](sync.md#sn-core-003) [SN-CORE-004](storage.md#sn-core-004) [SN-CORE-005](storage.md#sn-core-005) [SN-CORE-006](storage.md#sn-core-006) [SN-CORE-008](sync.md#sn-core-008) [SN-CORE-009](sync.md#sn-core-009) [SN-CORE-010](sync.md#sn-core-010) [SN-CORE-011](storage.md#sn-core-011) [SN-CORE-012](storage.md#sn-core-012) [SN-CORE-013](storage.md#sn-core-013) [SN-CORE-014](storage.md#sn-core-014) [SN-CORE-015](storage.md#sn-core-015) [SN-CORE-016](storage.md#sn-core-016) [SN-CORE-017](storage.md#sn-core-017) [SN-CORE-018](storage.md#sn-core-018) [SN-CORE-019](sync.md#sn-core-019) [SN-CORE-020](storage.md#sn-core-020) [SN-CORE-021](storage.md#sn-core-021) [SN-CORE-022](storage.md#sn-core-022) [SN-CORE-023](storage.md#sn-core-023) [SN-CORE-024](qa.md#sn-core-024) [SN-CORE-026](storage.md#sn-core-026) [SN-CORE-027](perf.md#sn-core-027). Implements PRD-STOR-001..008, PRD-SYNC-004, PRD-SYNC-010.

#### Security & privacy
This package is the zero-knowledge boundary's on-device half. Threats: silent CRDT divergence/data loss (mitigate with property + differential + fuzz tests), untrusted-file deserialization (CWE-502) on `.sanenote` import, decompression bombs (CWE-409/CWE-1333), integrity failures from a tampering drive (CWE-354), and PII leakage via logs. Controls: fail-closed parsing, resource caps before decode, hash-tree verification, object ids logged only as opaque short hashes, no note content in logs. MASVS-STORAGE-1/2, MASVS-CRYPTO-2, MASVS-CODE-4, OWASP-A08, ASVS V1.

#### UX notes
No direct UI, but this model is what makes user-visible guarantees real: Trash & undelete (design Library screens; [`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md)), version-history timeline, and "your data outlives the app" export. Every recoverable failure surfaces as a `Result`/`Failure` mapped to a localised, user-safe message via `sane_ui` l10n — never a raw exception string. Baseline: nothing in this layer logs content, coordinates or ids in the clear.

#### Test plan
Aggregate of children: unit tests under `packages/sane_core/test/**`, the property-based convergence harness (`packages/sane_core/test/crdt/convergence_property_test.dart`), format round-trip + fuzz (`packages/sane_core/test/format/`), and the 1,000-page benchmark (`packages/sane_core/test/perf/notebook_open_bench_test.dart`). CI must be green before any editor work (M1) begins.

#### Dependencies
Monorepo scaffold SN-FND-002 and CI SN-FND-003 (from Foundations). Later encryption comes from SN-CRY-001 and cloud transport from SN-SYNC-001; this epic deliberately does not block on them (it writes the cleartext local form).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (document-model.md, file-format.md, ADR-0005)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-002

<a id="sn-core-002"></a>

**Implement document model entities**

| Field | Value |
|---|---|
| GitHub | #178 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-006](storage.md#sn-core-006), [SN-CORE-011](storage.md#sn-core-011) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-PRIVACY-1`, `ASVS-V1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
The locked document model (decision #4) fixes the entity hierarchy Workspace→Profile→Notebook→Page→Layer→Object with eight object types (Stroke, TextBlock, Image, Shape, AudioAnchor, Link, Sticker, Table). [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §1.2 gives the exact field tables and the per-field CRDT *kind* (ID/IMM/LWW/SET/POS/SEQ/DERIVED). These immutable value objects are the shared vocabulary every other package speaks, so they must be modelled precisely and be serialisable to CBOR. Getting the field-independence right (separate `x`/`y`/`scaleX`/`scaleY`/`rotation` registers) is Principle 4 and is violated constantly if not encoded in the types.

#### Scope
**In:** immutable Dart value objects for Workspace, Profile, Notebook, Page (+`PageKind`, `PaperTemplate`, `PageSize`), Layer, the Object base, and the eight object types incl. `Stroke` (with `brushId`, `geometryRef`, `pointCount`, `bounds` IMM + `colorToken`/`widthMul`/`opacity`/`erased` mutable), `InkSample` tuple, `BlobRef` (BLAKE3-256 multihash + size + mime), `DeviceRecord`, and the enums. CBOR map serialisation with **unknown-key preservation**.
**Out:** the CRDT wrappers/registers that make fields mergeable ([SN-CORE-003](sync.md#sn-core-003), [SN-CORE-008](sync.md#sn-core-008), [SN-CORE-009](sync.md#sn-core-009)), persistence ([SN-CORE-004](storage.md#sn-core-004)), and the geometry-blob byte layout ([SN-CORE-014](storage.md#sn-core-014)).

#### Acceptance criteria
- [ ] Every entity/field from document-model §1.2 exists with the correct type and a `/// Kind:` dartdoc tag matching the spec (ID/IMM/LWW/SET/POS/SEQ/DERIVED).
- [ ] `Object` decomposes transform into **independent** registers: `x`, `y`, `scaleX`, `scaleY`, `rotation` are separate fields, never one `transform`/`point` value (a test asserts no combined transform field exists).
- [ ] All entities are immutable (`final` fields, value equality); a mutation returns a new instance.
- [ ] CBOR encode→decode round-trips every entity losslessly, and a record carrying an **unknown** map key round-trips that key untouched (forward-compat, document-model §9 rule 1).
- [ ] `PageKind` is IMM; `pdfRef`/`pdfPageIndex` are IMM and only valid for `pdfBacked`; a validation test rejects a `pdfBacked` page with no `pdfRef`.

#### Technical notes
`packages/sane_core/lib/src/model/*.dart`. Use the `cbor` package (canonical mode; confirm determinism in [SN-CORE-013](storage.md#sn-core-013)) with maps (not positional tuples) so unknown keys survive. Depends on [SN-CORE-006](storage.md#sn-core-006) (ids) and [SN-CORE-011](storage.md#sn-core-011) (Result for validation). `Stroke` matches PRD-STOR-002 point tuple (x,y,pressure,tilt,azimuth,timestamp). Sections/subjects are Notebook nodes with a `kind` discriminator, not a separate entity. Backlinks are DERIVED (never stored). Implements PRD-STOR-001, PRD-STOR-002.

#### Security & privacy
Threats: malformed/oversized entity records from import (CWE-20 improper input validation); metadata leakage. Controls: validate type/range on decode (e.g. `opacity` in 0..1, non-negative sizes), cap collection sizes before building, keep human-meaningful fields (titles, tags) as *encrypted* values in the model's serialised form (field-level, file-format §6.2 — here modelled as opaque bytes, encrypted by sane_crypto). Ids and content never logged in the clear. MASVS-STORAGE-1, MASVS-PRIVACY-1, ASVS V1.

#### UX notes
No direct UI; these types back every editor and library surface (Library, page rail, layers panel per [`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md)). `colorToken`/`lookId`/`colorToken` reference design tokens, never raw hex, so themes and all 17 looks stay consistent. Baseline privacy: no content in logs.

#### Test plan
`packages/sane_core/test/model/entities_test.dart` (field kinds, immutability, validation), `cbor_roundtrip_test.dart` (lossless + unknown-key preservation), `stroke_test.dart` (independent transform registers, pdfBacked invariants).

#### Dependencies
[SN-CORE-006](storage.md#sn-core-006), [SN-CORE-011](storage.md#sn-core-011). CBOR encoder choice validated by [SN-CORE-013](storage.md#sn-core-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-004

<a id="sn-core-004"></a>

**Implement drift/SQLite schema, migrations and storage isolate**

| Field | Value |
|---|---|
| GitHub | #180 |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-012](storage.md#sn-core-012), [SN-CORE-011](storage.md#sn-core-011) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `OWASP-A03`, `OWASP-A08`, `ASVS-V5`, `CWE-89` |
| Extra labels | agent-ready |

#### Context
The device is the system of record ([ADR-0004](docs/adr/0004-local-first-zero-server.md)); structured data (workspace→profiles→notebooks→pages→layers→objects plus the search index and op-log) must persist locally in SQLite via drift, with instant offline reads/writes and no network round-trip (PRD-STOR-001). This is the concrete implementation of the repository interfaces ([SN-CORE-012](storage.md#sn-core-012)) and the durable home of the op-log, object rows, blob index, per-device HLC watermark and the monotone `localCounter`. Because a bug here is local data loss, it is p0.

#### Scope
**In:** the drift schema (tables for ops/op-log segments, objects, layers, pages, notebooks/tree, profiles, blob index + refcount, snapshot registry, HLC watermark vector, `localCounter`, `schemaVersion`); the drift-backed implementations of [SN-CORE-012](storage.md#sn-core-012) repositories running in a **background storage isolate**; drift migration scaffolding tied to `schemaVersion`; durable `LocalCounterSource`; batched op-append.
**Out:** the on-disk `.sanenote` bundle/segment/snapshot *files* ([SN-CORE-005](storage.md#sn-core-005)/[SN-CORE-015](storage.md#sn-core-015)/[SN-CORE-016](storage.md#sn-core-016)) — those are the sync/export representation; the content-addressed blob *files* ([SN-CORE-014](storage.md#sn-core-014)); at-rest encryption of the DB (PRD-STOR-003 → sane_crypto/SN-CRY, referenced); compaction/GC ([SN-CORE-020](storage.md#sn-core-020)).

#### Acceptance criteria
- [ ] drift DB opens, and the storage repositories pass the shared `store_contract` suite from [SN-CORE-012](storage.md#sn-core-012) (same tests, real backend).
- [ ] All reads/writes run off the UI isolate (drift background isolate); a test asserts no drift call happens on the root isolate in the draw/commit path (overview §6 invariant).
- [ ] Write a stroke → close DB → reopen: the object + its op are present and identical (durability); `localCounter` survives restart with no id reuse.
- [ ] All queries are parameterised (no string-concatenated SQL); a review/lint check confirms no raw interpolation (CWE-89).
- [ ] A no-op migration from `schemaVersion` N→N runs cleanly and a forward migration hook is exercised by [SN-CORE-022](storage.md#sn-core-022).

#### Technical notes
`packages/sane_core/lib/src/store/drift/` (`database.dart`, tables, `*_repository.dart`). Pure-Dart drift with a background-isolate connection (drift supports this natively — overview §6). Depends on [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-012](storage.md#sn-core-012), [SN-CORE-011](storage.md#sn-core-011). Blob *bytes* live in the content-addressed store ([SN-CORE-014](storage.md#sn-core-014)); the DB holds only the blob index + refcount. Implements PRD-STOR-001; the sync unit files are derived, not the DB itself. Do not write SQL from any other package (overview §5 rule 8).

#### Security & privacy
Threats: SQL injection (CWE-89) if any query interpolates input; local data exposure at rest (PRD-STOR-003 — DB encryption is applied by the crypto layer, referenced); PII in logs. Controls: parameterised queries only, opaque-id addressing, at-rest encryption delegated to sane_crypto with this schema encryption-agnostic, ids logged as short hashes. MASVS-STORAGE-1/2, OWASP-A03/A08, ASVS V5. No content/coordinates in query logs.

#### UX notes
No direct UI; this is what makes the app work fully offline with no spinners (the [ADR-0004](docs/adr/0004-local-first-zero-server.md) ideal). Storage errors surface as `StorageFailure` → localised messages; empty state (fresh install) yields an empty workspace, not an error. Baseline: no content in logs.

#### Test plan
`packages/sane_core/test/store/drift/drift_contract_test.dart` (runs `store_contract`), `durability_test.dart` (close/reopen), `isolate_offload_test.dart` (no root-isolate DB calls on hot path), `sql_param_test.dart` (parameterisation). Uses an in-memory drift DB for CI.

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-012](storage.md#sn-core-012), [SN-CORE-011](storage.md#sn-core-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-005

<a id="sn-core-005"></a>

**Implement .sanenote bundle reader/writer and manifest**

| Field | Value |
|---|---|
| GitHub | #181 |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage, sharing-export |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-016](storage.md#sn-core-016), [SN-CORE-014](storage.md#sn-core-014) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `MASVS-CRYPTO-2`, `OWASP-A08`, `OWASP-A03`, `ASVS-V5`, `CWE-22`, `CWE-409`, `CWE-347` |
| Extra labels | agent-ready, innovation |

#### Context
The `.sanenote` bundle is the canonical, documented, published open format and the longevity guarantee — "your data outlives the app" ([ADR-0004](docs/adr/0004-local-first-zero-server.md) ideal, PRD-STOR-004, [`docs/architecture/file-format.md`](docs/architecture/file-format.md) §1/§4). It is a Zip64 archive (or directory) whose `MANIFEST.cbor` is the root index and integrity anchor, discovering pages (snapshots + segments), blobs, devices and a hash-chain. This issue assembles the parts ([SN-CORE-015](storage.md#sn-core-015) snapshots, [SN-CORE-016](storage.md#sn-core-016) segments, [SN-CORE-014](storage.md#sn-core-014) blobs) into a bundle and reads them back, with full integrity verification. Import parses an untrusted file, so it is a hostile-input boundary — p0.

#### Scope
**In:** the Zip64/directory container (STORE for pre-compressed members, DEFLATE for manifest/small JSON), the `FORMAT` sentinel (`sanenote/1`), the layout (`pages/<pageId>/`, `blobs/`, derived `thumbnails/`+`index/` excluded from the hash tree); `MANIFEST.cbor` (canonical CBOR, integer keys) with the page list, blob list, device list, HLC vector, migration audit trail and the `prev` **hash-chain**; the BLAKE3 **hash tree** verification of every member before trust; optional detached `MANIFEST.sig` (Ed25519) verify for shared bundles; page.meta.cbor shards; write (fold→bundle) and read (verify→materialise) paths.
**Out:** the actual encryption/decryption of members and signing keys (sane_crypto/SN-CRY; this defines where ciphertext/sig sit), PDF/PNG/SVG/Markdown export (sane_pdf + exporters), competitor imports (out of v1), and corruption-recovery fallbacks/fuzz ([SN-CORE-026](storage.md#sn-core-026)).

#### Acceptance criteria
- [ ] Write a notebook to a `.sanenote` and read it back to an identical folded document (lossless round-trip), for a multi-page notebook with strokes, text, images and audio.
- [ ] A reader parses `MANIFEST.cbor` first and verifies each member's BLAKE3 hash before use; a member with a mismatched hash is ignored/re-fetched, never trusted (fail closed).
- [ ] The `prev` hash-chain is validated; a regressed/broken chain (rollback by a tampering drive) is detected and surfaced.
- [ ] Zip/member extraction is path-confined: an entry name attempting `../` traversal is rejected (CWE-22); decompression is size-capped (CWE-409).
- [ ] A higher `formatVersion` than supported opens **read-only** with an "update to edit" state and never writes bytes older peers cannot parse (file-format §7).
- [ ] For a shared bundle, a present `MANIFEST.sig` is verified against the writing device's registered key; an invalid signature is surfaced (CWE-347).

#### Technical notes
`packages/sane_core/lib/src/format/bundle.dart`, `manifest.dart`. Depends on [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-016](storage.md#sn-core-016), [SN-CORE-014](storage.md#sn-core-014), and the codecs [SN-CORE-017](storage.md#sn-core-017). Zip64 streaming: confirm the `archive` package streams large members else use a directory bundle ([SN-CORE-013](storage.md#sn-core-013)). Parsing runs **off the UI isolate** and imports into a new isolated notebook (secure-coding checklist §1). Manifest field-level encryption of titles/tags is honoured (values are opaque here, encrypted by sane_crypto, file-format §6.2). Implements PRD-STOR-004; export list PRD-STOR-005 (this issue delivers the `.sanenote` target only).

#### Security & privacy
Threats: malicious `.sanenote` import — zip-slip path traversal (CWE-22), decompression bomb (CWE-409), untrusted deserialization (OWASP-A08/CWE-502), forged manifest/signature (CWE-347), rollback by a tampering drive. Controls: path canonicalisation/confinement, size caps before decode, hash-tree + hash-chain verification, off-isolate parsing into an isolated notebook, fail-closed on any mismatch, optional signature verify. MASVS-STORAGE-1, MASVS-CODE-4, MASVS-CRYPTO-2, OWASP-A03/A08, ASVS V5. Cleartext routing-header metadata trade-off is documented (file-format §6).

#### UX notes
Backs Export/Import and backup ([`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md) share/export; PRD-04 export foundations). A corrupt/partial import fails into a clear, localised "this file couldn't be opened" error, never a crash or partial silent state; a version-too-new bundle opens read-only with an update prompt. Baseline: no paths/content in logs. This is a differentiator: a published open format competitors lack.

#### Test plan
`packages/sane_core/test/format/bundle_roundtrip_test.dart`, `manifest_test.dart` (hash tree, hash-chain, read-only on higher formatVersion), `import_security_test.dart` (zip-slip rejected, bomb capped, off-isolate, isolated notebook), `signature_test.dart`. Malformed-bundle fuzz corpus in [SN-CORE-026](storage.md#sn-core-026).

#### Dependencies
[SN-CORE-015](storage.md#sn-core-015), [SN-CORE-016](storage.md#sn-core-016), [SN-CORE-014](storage.md#sn-core-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-006

<a id="sn-core-006"></a>

**Implement ObjectId and DeviceId identity types**

| Field | Value |
|---|---|
| GitHub | #182 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | storage |
| Size | S |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | — |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-STORAGE-2`, `CWE-330`, `CWE-190`, `ASVS-V6` |
| Extra labels | agent-ready, good first issue |

#### Context
Every entity in the document tree needs a stable, globally-unique, location-independent id, and every operation needs a device attribution id. These are the atoms the whole CRDT rests on, defined in [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §1.1 and §3.2. Ids must be conflict-free to mint (two offline devices creating at once must produce different ids with no coordination) and must reveal nothing about the physical device when they leak, because they live inside encrypted payloads but the threat model still treats them as observable.

#### Scope
**In:** `ObjectId` (128-bit = 64-bit random `deviceSeed` + 64-bit monotone `localCounter`), its Crockford base32 (no I,L,O,U) 26-char rendering for logs/URLs, parse/round-trip, `Comparable`, equality/hashCode; `DeviceId` (random 128-bit minted once at install, used for op attribution and the LWW final tiebreak). A `LocalCounterSource` interface for persisting/restoring the monotone counter (implemented against drift in [SN-CORE-004](storage.md#sn-core-004)).
**Out:** the Ed25519 signing keypair bound to a `DeviceId` (that is `sane_crypto`/SN-CRY-002), and durable counter storage (drift, [SN-CORE-004](storage.md#sn-core-004)) — here only the interface + an in-memory impl for tests.

#### Acceptance criteria
- [ ] `ObjectId` is 16 bytes; `toString()` is exactly 26 Crockford base32 chars and never contains I, L, O or U; `ObjectId.parse(id.toString()) == id`.
- [ ] `deviceSeed` and `DeviceId` are generated from a CSPRNG (`Random.secure()`), never a non-secure `Random`.
- [ ] `localCounter` increments on every mint, is 64-bit, and on restart seeds from `max(persisted, now-derived floor)`; a unit test simulates a crash/restart and asserts no id is ever reused.
- [ ] Counter increment past 2^63 is guarded (asserts/`StateError`), documenting the overflow bound (CWE-190).
- [ ] `ObjectId.deviceSeed` is provably distinct from `DeviceId` in the API (different types) so a leaked object id cannot be joined to a syncing device id.

#### Technical notes
`packages/sane_core/lib/src/ids/object_id.dart`, `device_id.dart`. Pure Dart. Use `dart:math` `Random.secure()` for seeds. Crockford base32 encode/decode helper in `packages/sane_core/lib/src/ids/base32.dart`. Do not derive ids from user-visible names (names are encrypted metadata). Reserve dead ids forever (tombstones keep them; see [SN-CORE-018](storage.md#sn-core-018)). Referenced by every entity ([SN-CORE-002](storage.md#sn-core-002)) and the HLC ([SN-CORE-003](sync.md#sn-core-003)). Implements the identity contract behind PRD-STOR-001/PRD-STOR-002.

#### Security & privacy
Threats: predictable ids (CWE-330 use of insufficiently random values) enabling guessing/enumeration; device fingerprinting by clustering `deviceSeed`; counter overflow (CWE-190). Controls: CSPRNG for all seeds; type-separated `deviceSeed` vs `DeviceId` so an id leak reveals no device; overflow guard; ids logged only as opaque short hashes (MASVS-STORAGE-2). MASVS-CRYPTO-2, ASVS V6. Document the accepted residual: an attacker holding many ids could cluster by `deviceSeed` (accepted because ids live only in encrypted payloads, per document-model §1.1).

#### UX notes
No UI. Ids appear only in logs (as short hashes) and internal debug views. Baseline privacy control: never surface a raw id, name or coordinate.

#### Test plan
`packages/sane_core/test/ids/object_id_test.dart` (encode/decode round-trip, alphabet exclusions, ordering), `device_id_test.dart`, `local_counter_test.dart` (crash/restart no-reuse, overflow guard). Property test: 1e6 mints across two seeds never collide.

#### Dependencies
None (foundational). Durable counter persistence lands with [SN-CORE-004](storage.md#sn-core-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-011

<a id="sn-core-011"></a>

**Implement Result and Failure sealed types**

| Field | Value |
|---|---|
| GitHub | #186 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | storage |
| Size | S |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | — |
| Security controls | `MASVS-STORAGE-2`, `MASVS-CODE-4`, `ASVS-V7`, `CWE-209` |
| Extra labels | agent-ready, good first issue |

#### Context
The coding standard ([`docs/architecture/overview.md`](docs/architecture/overview.md) §8.1, [ADR-0003](docs/adr/0003-state-management-and-app-structure.md)) mandates that expected/recoverable failures are returned as a `Result<T, Failure>` sealed type from `sane_core`, pattern-matched with Dart 3 `switch`; packages must not throw across boundaries for these, and must not return `null` to mean error. This type is imported by nearly every other package, so it must exist first and be tiny, immutable and well-documented.

#### Scope
**In:** the sealed `Result<T, F>` with `Ok(value)` / `Err(failure)`, ergonomic helpers (`map`, `mapErr`, `flatMap`/`andThen`, `getOrElse`, `isOk`), and the sealed `Failure` base plus the per-domain hierarchy skeleton (`StorageFailure`, `SyncFailure`, `CryptoFailure`, `AuthFailure`, `FormatFailure`), each carrying a stable machine `code`, a user-safe message *key* (for l10n), and an optional `cause`.
**Out:** domain-specific failure subtypes' full enumerations (each owning package extends its base), and the l10n message catalogue (lives in `sane_ui`/app l10n).

#### Acceptance criteria
- [ ] `Result` is a `sealed class`; a `switch` over it is exhaustive without a default (compile-checked).
- [ ] `Failure` subtypes are immutable value objects (`==`/`hashCode`), carry a stable string `code` and a message *key*, never a raw exception string or PII.
- [ ] `map`/`mapErr`/`flatMap`/`getOrElse` have unit-tested laws (identity, composition) and explicit return types (no `dynamic`).
- [ ] A lint/test asserts no public API in `sane_core` returns `null` to signal failure.
- [ ] Every `Failure` has `///` dartdoc describing when it is produced and the safe user message key.

#### Technical notes
`packages/sane_core/lib/src/result/result.dart`, `failure.dart`. Pure Dart, no dependencies. Prefer hand-written sealed classes (or `freezed`) per the immutability rule. The message key resolves via `sane_ui`/app l10n at the UI edge, so `Failure` never contains localized text. Used by [SN-CORE-004](storage.md#sn-core-004), [SN-CORE-005](storage.md#sn-core-005), [SN-CORE-012](storage.md#sn-core-012), and cross-area packages.

#### Security & privacy
Threats: sensitive-info exposure through error strings (CWE-209) — a raw decrypt/parse exception could leak a path, key fragment or content. Controls: `Failure` carries only a stable machine code + a safe message key + a non-sensitive cause chain; a redaction test asserts `toString()` of every `Failure` contains no content/paths/tokens. MASVS-STORAGE-2, MASVS-CODE-4, ASVS V7 (error handling).

#### UX notes
The `Failure.messageKey` is the contract to `sane_ui`: every recoverable error becomes a localised, actionable toast/dialog (empty/error/offline states across all 17 looks + dark mode are rendered by the consuming widgets, not here). Baseline: no raw exception text ever reaches the user.

#### Test plan
`packages/sane_core/test/result/result_test.dart` (exhaustiveness via a fixture switch, monad laws), `failure_redaction_test.dart` (no PII in any `Failure.toString()`).

#### Dependencies
None.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-012

<a id="sn-core-012"></a>

**Define document-store repository interfaces**

| Field | Value |
|---|---|
| GitHub | #187 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | storage |
| Size | S |
| SDLC | design |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-011](storage.md#sn-core-011), [SN-CORE-006](storage.md#sn-core-006) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `ASVS-V1`, `CWE-20` |
| Extra labels | agent-ready, good first issue |

#### Context
[`docs/architecture/overview.md`](docs/architecture/overview.md) §5 rule 8 states that no package writes SQL or touches the filesystem directly — persistence is reached only through `sane_core`'s repository interfaces, which keeps the store swappable and testable and keeps the model DAG clean. Defining these interfaces early lets model, sync and search code compile and be unit-tested against in-memory fakes long before the drift implementation ([SN-CORE-004](storage.md#sn-core-004)) exists.

#### Scope
**In:** abstract repository/store interfaces returning `Result`: `WorkspaceRepository`, `LibraryRepository` (notebook/page tree), `PageRepository` (layers/objects for a page), `OpLogStore` (append/read segments, per-device), `BlobStore` (put/get/exists/refs by `BlobRef`), `SnapshotStore` (read/write generations), and `HlcWatermarkStore` (per-device watermark vector). An in-memory reference implementation of each for tests.
**Out:** the drift/SQLite and on-disk implementations ([SN-CORE-004](storage.md#sn-core-004), [SN-CORE-014](storage.md#sn-core-014), [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-016](storage.md#sn-core-016)), and any Flutter/isolate wiring.

#### Acceptance criteria
- [ ] Every interface method returns `Result<T, StorageFailure>` (or a stream for watches); none throws for expected errors, none returns `null` for "not found".
- [ ] `BlobStore.put` is idempotent for identical bytes (content-addressed): putting the same plaintext twice yields the same `BlobRef` and stores one copy.
- [ ] `OpLogStore` exposes append-only semantics: appended ops are immutable; a read returns ops in HLC order; there is no update/delete-op API.
- [ ] The in-memory implementations pass a shared contract test suite that the drift impl will later reuse.
- [ ] All interfaces are documented with `///` and have explicit return types (no `dynamic`).

#### Technical notes
`packages/sane_core/lib/src/store/*.dart` + `packages/sane_core/lib/src/store/memory/*.dart`. Depends on [SN-CORE-002](storage.md#sn-core-002) (entities), [SN-CORE-006](storage.md#sn-core-006) (ids/`LocalCounterSource`), [SN-CORE-011](storage.md#sn-core-011) (Result). Shared contract tests live in `packages/sane_core/test/store/store_contract.dart` and are parameterised so [SN-CORE-004](storage.md#sn-core-004) runs the same suite. Repositories run on the storage isolate in production (overview §6); interfaces must be isolate-friendly (serialisable args/returns only). Implements PRD-STOR-001.

#### Security & privacy
Threats: an interface that leaks raw filesystem paths or forces callers to build SQL invites path traversal / injection (CWE-20). Controls: opaque `ObjectId`/`BlobRef` addressing only (no caller-supplied paths), Result-typed errors with no path in the message, all validation behind the interface. MASVS-STORAGE-1, MASVS-CODE-4, ASVS V1.

#### UX notes
No UI. The interfaces define where empty/not-found/offline states originate (returned as `Result`), which the app then renders as empty/error/loading states across the 17 looks. Baseline: no PII in errors.

#### Test plan
`packages/sane_core/test/store/store_contract.dart` (shared), `memory_store_test.dart` (runs the contract against the in-memory impls; content-address idempotency; op-log ordering; not-found returns `Err`).

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002), [SN-CORE-011](storage.md#sn-core-011), [SN-CORE-006](storage.md#sn-core-006).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-013

<a id="sn-core-013"></a>

**Verify and select serialization and CRDT dependencies**

| Field | Value |
|---|---|
| GitHub | #188 |
| Type | spike |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | storage, devx |
| Size | S |
| SDLC | design |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-3`, `OWASP-A06`, `ASVS-V1`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
The architecture docs carry an explicit **verify list** of external dependencies the storage/CRDT layer needs but for which no canonical, health-checked Dart package was confirmed at planning time: BLAKE3 hashing, zstd compression, a canonical/deterministic CBOR encoder, a `fractional-indexing` port, `y_crdt` (as a plain-text stopgap only), and f16 pack/unpack helpers ([`docs/architecture/document-model.md`](docs/architecture/document-model.md) §11, [`docs/architecture/file-format.md`](docs/architecture/file-format.md) §11, [ADR-0005](docs/adr/0005-document-model-and-crdt.md) follow-ups). A wrong choice here (non-deterministic CBOR, unmaintained BLAKE3) silently breaks cross-device hash equality or convergence, so it is time-boxed and ends in a written decision.

#### Scope
**In:** evaluate + pick (or decide to vendor/port) each dependency; write findings + the decision into a short ADR-style note and update the verify lists; provide a thin `sane_core` abstraction seam for each (`Hasher`, `Compressor`, `CborCodec`) so the concrete choice is swappable and mockable. Confirm canonical CBOR determinism with a cross-run byte-equality test; confirm BLAKE3 availability else fall back to SHA-256 multihash; confirm zstd binding else fall back to GZip/brotli.
**Out:** the full codec implementation ([SN-CORE-017](storage.md#sn-core-017)) — this spike only selects and seams.

#### Acceptance criteria
- [ ] A written decision records, per dependency: chosen package + exact version (or "vendor/port"), maintenance/health assessment, licence, and fallback.
- [ ] Canonical CBOR determinism is proven: the same entity encodes to identical bytes across two runs/processes (needed so content hashes match cross-device).
- [ ] BLAKE3 decision is made with a working SHA-256 multihash fallback path if no maintained package exists.
- [ ] zstd decision is made with a GZip/brotli fallback path.
- [ ] `Hasher`/`Compressor`/`CborCodec` seams exist with fake impls for tests; nothing else in `sane_core` imports the concrete packages directly.

#### Technical notes
`packages/sane_core/lib/src/codec/` seams + `docs/adr/` note (or an addendum to ADR-0005). Candidate checks: `cbor`, `blake3`, `zstandard`/FFI, a ported `fractional-indexing`, `y_crdt`. Record supply-chain posture (pinned version, OSV-Scanner clean). Unblocks [SN-CORE-014](storage.md#sn-core-014), [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-017](storage.md#sn-core-017), and confirms the [SN-CORE-008](sync.md#sn-core-008) FracIndex and [SN-CORE-009](sync.md#sn-core-009) text choices.

#### Security & privacy
Threats: pulling in an unmaintained/compromised dependency (OWASP-A06 vulnerable & outdated components, CWE-1104 use of unmaintained third-party components) into the most trusted package. Controls: pin exact versions, run OSV-Scanner + dependency-review, prefer maintained/audited libs, keep a fallback, seam everything so a bad dep is swappable. MASVS-CODE-3, ASVS V1.

#### UX notes
None beyond baseline (no UI, no content logged). Baseline: the decision note documents any user-visible consequence (e.g. a slower fallback compressor) for later perf issues.

#### Test plan
`packages/sane_core/test/codec/cbor_determinism_test.dart` (byte-equality across runs), `hasher_seam_test.dart`, `compressor_seam_test.dart` (fake + fallback). Manual: OSV-Scanner run recorded in the note.

#### Dependencies
None (informs downstream codec/format issues).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-014

<a id="sn-core-014"></a>

**Implement content-addressed blob store with chunked framing**

| Field | Value |
|---|---|
| GitHub | #189 |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-017](storage.md#sn-core-017), [SN-CORE-006](storage.md#sn-core-006), [SN-CORE-012](storage.md#sn-core-012) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `OWASP-A08`, `ASVS-V5`, `CWE-354`, `CWE-409` |
| Extra labels | agent-ready, innovation |

#### Context
Heavy, immutable payloads (ink sample streams, PDFs, images, audio) are never stored inside the CRDT — they are content-addressed blobs referenced by `BlobRef` ([`docs/architecture/document-model.md`](docs/architecture/document-model.md) §6, PRD-STOR-008). Content addressing gives free dedup, trivial caching and zero merge conflicts (a blob never changes; two devices capturing identical bytes converge on one blob). This issue implements the on-disk blob file format (SNBL, [`docs/architecture/file-format.md`](docs/architecture/file-format.md) §5) including chunked large blobs and the `application/ink-v1` stroke-geometry encoding.

#### Scope
**In:** the `BlobStore` file backend: SNBL header framing (magic, formatVersion, flags, mime, plaintextSize), whole-blob and **chunked** bodies (256 KiB default chunks so audio/PDF stream without loading whole), the `application/ink-v1` geometry blob encode/decode (channel mask, origin, columnar delta/varint sample columns, zstd-framed) matching PRD-STOR-002; hash-of-plaintext `BlobRef` (BLAKE3-256 multihash) with dedup; refcount/liveness derived from folded state (GC eligibility handled elsewhere).
**Out:** encryption of chunks (AEAD placement is defined here as *where* ciphertext sits per file-format §6; the AEAD itself is sane_crypto/SN-CRY), the sync upload of blobs (SN-SYNC-001), and orphan GC ([SN-CORE-020](storage.md#sn-core-020)).

#### Acceptance criteria
- [ ] Putting identical plaintext twice yields one stored blob and the same `BlobRef` (content-address dedup).
- [ ] A 14 MB payload stored `chunked` can be read from an arbitrary offset without loading the whole file (seek test); each chunk's integrity is independently verifiable.
- [ ] `application/ink-v1` encode→decode round-trips a 5,000-sample stroke losslessly (within the documented quantisation) and hits ~0.6–1.0 MB for the canonical lecture page (order-of-magnitude assertion, document-model §7).
- [ ] Reading a blob whose bytes fail their hash returns `Err(FormatFailure)` and does not surface partial data (fail closed, CWE-354).
- [ ] A blob is immutable: there is no in-place mutate API; a change produces a new id.

#### Technical notes
`packages/sane_core/lib/src/blob/blob_store_file.dart`, `ink_v1.dart`. Depends on [SN-CORE-017](storage.md#sn-core-017) (codecs), [SN-CORE-006](storage.md#sn-core-006) (`BlobRef`/ids), [SN-CORE-012](storage.md#sn-core-012) (interface). Chunk AAD = blobId||chunkIndex (defined here for the crypto layer to honour). Hash-of-plaintext dedup is per-user-store only (confirmation-oracle trade-off documented, document-model §6); the cloud filename is a separate random id (sync concern). Default per-stroke geometry blobs for v1 (coalescing deferred, file-format §11). Consumed by [SN-CORE-005](storage.md#sn-core-005) and [SN-CORE-019](sync.md#sn-core-019).

#### Security & privacy
Threats: integrity-check bypass / silent corruption from a tampering source (CWE-354) — verify hash before trusting bytes, fail closed; decompression bombs in ink-v1/zstd (CWE-409) — cap output; content-hash confirmation oracle (documented residual). Controls: mandatory hash verification, output caps, immutable-by-construction, hash-of-plaintext scoped to the local store only. MASVS-STORAGE-1, MASVS-CRYPTO-2, OWASP-A08, ASVS V5. No blob content/paths logged.

#### UX notes
No direct UI; enables lazy-loaded audio/PDF (open a page without downloading its audio blob — document-model §7) and instant dedup of pasted images. Baseline: no content/paths in logs.

#### Test plan
`packages/sane_core/test/blob/blob_store_file_test.dart` (dedup, immutability, chunk seek, hash-fail closed), `ink_v1_test.dart` (round-trip + size). Fuzz malformed SNBL headers (extended in [SN-CORE-026](storage.md#sn-core-026)).

#### Dependencies
[SN-CORE-017](storage.md#sn-core-017), [SN-CORE-006](storage.md#sn-core-006), [SN-CORE-012](storage.md#sn-core-012).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-015

<a id="sn-core-015"></a>

**Implement snapshot file writer and reader with columnar strokes**

| Field | Value |
|---|---|
| GitHub | #190 |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-017](storage.md#sn-core-017), [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-008](sync.md#sn-core-008), [SN-CORE-009](sync.md#sn-core-009) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `OWASP-A08`, `ASVS-V5`, `CWE-354`, `CWE-125` |
| Extra labels | agent-ready |

#### Context
A snapshot is the folded CRDT state of one page at a compaction watermark, so a returning device loads O(state) not O(history) ([`docs/architecture/file-format.md`](docs/architecture/file-format.md) §2, PRD-STOR-007/PRD-SYNC-004). Snapshots are content-addressed and generations are monotone; the newest complete generation wins. This issue implements the SNSN byte format including the columnar stroke section that gets a 5,000-stroke page's CRDT metadata down to ~0.2 MB.

#### Scope
**In:** the SNSN 64-byte header (magic, formatVersion, flags, pageId, generation, baseHlcPacked watermark, opCountFolded, schemaVersion, sectionCount, bodyHash); the length-delimited body sections (META, LAYERS, OBJECTS, STROKES, TEXT, TREE, TOMBSTONES, ORSET, HLCVEC) sorted by type ascending for deterministic hashing; the **columnar STROKES** encoding (ids, delta-zigzag createHlc, pooled brushIds/tokens/FracIndex, quantised bounds, LWW columns with packed-HLC deltas, flags); unknown-section preservation on rewrite; the fold→snapshot writer and the snapshot→state reader.
**Out:** atomic temp-then-rename orchestration and generation pruning ([SN-CORE-026](storage.md#sn-core-026)/[SN-CORE-020](storage.md#sn-core-020)), the manifest ([SN-CORE-005](storage.md#sn-core-005)), encryption (AEAD body per file-format §6, sane_crypto).

#### Acceptance criteria
- [ ] A folded page state writes to SNSN and reads back to an identical folded state (round-trip), for pages with strokes, text and layers.
- [ ] Sections are ordered by type ascending; `bodyHash` (truncated BLAKE3) matches on write/read; a corrupted body byte is detected and returns `Err` (fail closed, CWE-354).
- [ ] An **unknown** sectionType is preserved verbatim across a read→write cycle (forward-compat, file-format §7).
- [ ] The columnar STROKES section round-trips a 5,000-stroke page and stays ~0.2 MB (order-of-magnitude assertion, document-model §7).
- [ ] A truncated snapshot (short read) is rejected without out-of-bounds access (CWE-125) and the previous generation remains usable.

#### Technical notes
`packages/sane_core/lib/src/format/snapshot.dart`, `columnar_strokes.dart`. Depends on [SN-CORE-017](storage.md#sn-core-017) (codecs) and the CRDT folders [SN-CORE-003](sync.md#sn-core-003)/[SN-CORE-008](sync.md#sn-core-008)/[SN-CORE-009](sync.md#sn-core-009) (to fold state into sections and rebuild it). Header stays cleartext even when the body is encrypted (routing), per file-format §2.1. Generation is monotone u64. Consumed by [SN-CORE-005](storage.md#sn-core-005) (bundle), [SN-CORE-020](storage.md#sn-core-020) (compaction writes new generations), [SN-CORE-021](storage.md#sn-core-021) (version history rings).

#### Security & privacy
Threats: silent truncation/corruption from a tampering drive (CWE-354/CWE-125); parsing an untrusted snapshot from sync/import (OWASP-A08). Controls: bodyHash verification + full manifest hash (§4.4), bounds-checked section reader that fails closed, unknown-section preservation (no data loss across versions). MASVS-STORAGE-1, MASVS-CODE-4, ASVS V5. No content logged.

#### UX notes
No direct UI; enables instant page open and underlies the version-history timeline ([SN-CORE-021](storage.md#sn-core-021)). A corrupt newest generation transparently falls back to the previous one — the user never sees a broken page. Baseline: no content in logs.

#### Test plan
`packages/sane_core/test/format/snapshot_roundtrip_test.dart`, `columnar_strokes_test.dart` (round-trip + size), `snapshot_corruption_test.dart` (bad hash, truncation → Err), `unknown_section_test.dart`. Fuzz extended in [SN-CORE-026](storage.md#sn-core-026).

#### Dependencies
[SN-CORE-017](storage.md#sn-core-017), [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-008](sync.md#sn-core-008), [SN-CORE-009](sync.md#sn-core-009).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-016

<a id="sn-core-016"></a>

**Implement op-log segment file writer and reader**

| Field | Value |
|---|---|
| GitHub | #191 |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage, sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-017](storage.md#sn-core-017), [SN-CORE-010](sync.md#sn-core-010) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-RESILIENCE-3`, `OWASP-A08`, `ASVS-V5`, `CWE-354`, `CWE-125` |
| Extra labels | agent-ready |

#### Context
The recent tail of history is stored as append-only, **single-writer** op-log segment files, one writer per `deviceId` so no two devices ever write the same file — the crux of robust zero-server merge with no cloud conflict copies ([`docs/architecture/file-format.md`](docs/architecture/file-format.md) §3, PRD-SYNC-004). This issue implements the SNOL byte format: header, per-record framing with CRC, torn-tail tolerance, batching and rotation.

#### Scope
**In:** the SNOL 32-byte header (magic, formatVersion, flags, deviceId, segmentSeq); record framing (`varint recordLen | payload | crc32c`) where the payload is a cleartext CBOR `Op` (or an AEAD frame slot when encrypted); append-only writer with **batched flush** (~250 ms of activity or 64 KB, whichever first); reader that stops at the first bad `recordLen`/CRC treating the file as valid up to that point (partial sync tail) and re-reads when more bytes arrive; **rotation** to `segmentSeq+1` at a 4 MB cap.
**Out:** the op semantics ([SN-CORE-010](sync.md#sn-core-010)), encryption of records (AAD/nonce defined here for sane_crypto to honour), cloud upload of segments (SN-SYNC-001), and compaction that deletes folded segments ([SN-CORE-020](storage.md#sn-core-020)).

#### Acceptance criteria
- [ ] Appended records are immutable; a reader returns ops in write order and each record's crc32c validates.
- [ ] A **torn final record** (partial write / partial sync) is ignored; the file reads as valid up to the last complete record and the torn tail is re-read once completed (crash-safe, CWE-125 avoided).
- [ ] Batching coalesces a burst of writing into one append (not one write per sample); a test asserts a 250 ms burst yields one flush.
- [ ] Rotation creates `segmentSeq+1` at the 4 MB cap; segments for a device are `0,1,2,…` and never rewritten.
- [ ] Encrypted-frame slots reserve the 24 B nonce + tag layout and set AAD = magic||formatVersion||deviceId||segmentSeq||recordIndex (so a record cannot be moved between files/positions undetected).

#### Technical notes
`packages/sane_core/lib/src/format/oplog_segment.dart`. Depends on [SN-CORE-017](storage.md#sn-core-017) (varint/crc) and [SN-CORE-010](sync.md#sn-core-010) (`Op` CBOR). crc32c = Castagnoli. Single-writer invariant is the contract with sync; document it. The DB op-append ([SN-CORE-004](storage.md#sn-core-004)) and the segment file are kept consistent (write op to both; segment is the sync/export shard). Consumed by [SN-CORE-005](storage.md#sn-core-005) and [SN-CORE-020](storage.md#sn-core-020).

#### Security & privacy
Threats: cut-and-paste tampering by a malicious drive (mitigated by per-record AAD binding position/file); silent truncation (CWE-354/CWE-125); untrusted remote segment parsing (OWASP-A08). Controls: CRC + fail-up-to-last-valid, AAD position binding for the encrypted path, bounds-checked reader, single-writer files. MASVS-STORAGE-1, MASVS-RESILIENCE-3, ASVS V5. No op payloads logged.

#### UX notes
No direct UI; makes writing crash-safe (a power loss mid-stroke never corrupts the log) and sync a pure "upload the grown tail." Baseline: no content in logs.

#### Test plan
`packages/sane_core/test/format/oplog_segment_test.dart` (append/read order, crc), `torn_tail_test.dart` (partial record ignored, resumes), `batch_rotation_test.dart` (flush coalescing, 4 MB rotation), `aad_binding_test.dart` (position-move detected). Fuzz extended in [SN-CORE-026](storage.md#sn-core-026).

#### Dependencies
[SN-CORE-017](storage.md#sn-core-017), [SN-CORE-010](sync.md#sn-core-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-017

<a id="sn-core-017"></a>

**Implement shared on-disk codecs: delta, zigzag varint, zstd and CBOR**

| Field | Value |
|---|---|
| GitHub | #192 |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-013](storage.md#sn-core-013) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `OWASP-A03`, `ASVS-V5`, `CWE-409`, `CWE-190` |
| Extra labels | agent-ready |

#### Context
The on-disk representation depends on a small set of shared low-level codecs used by the blob store, snapshot files and op-log segments: zigzag+delta varint (for columnar stroke samples and packed HLCs), a zstd frame wrapper, canonical CBOR, and f16 (half-float) pack/unpack (Dart lacks native f16). [`docs/architecture/file-format.md`](docs/architecture/file-format.md) §2.3, §5.3 and §11 specify these; centralising them avoids divergent, subtly-incompatible encoders and makes the compression ratios in [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §7 (ink ~13 B→~3 B/sample) reproducible.

#### Scope
**In:** `varint` (LEB128) + `zigzag` encode/decode, `deltaEncode`/`deltaDecode` for monotone/near-monotone int columns, a `Compressor` (zstd via the chosen binding, GZip/brotli fallback) with a framed API, canonical CBOR encode/decode via the `CborCodec` seam, `f16` pack/unpack helpers, and a columnar buffer builder/reader (length-prefixed sections + string pool). Bounds-checked readers that fail closed on truncation.
**Out:** the file *containers* that use these codecs ([SN-CORE-014](storage.md#sn-core-014) blobs, [SN-CORE-015](storage.md#sn-core-015) snapshots, [SN-CORE-016](storage.md#sn-core-016) segments), and the dependency selection ([SN-CORE-013](storage.md#sn-core-013)).

#### Acceptance criteria
- [ ] varint/zigzag/delta round-trip every int in the i64 range; a truncated buffer returns an `Err(FormatFailure)` rather than reading past the end (CWE-125 avoided).
- [ ] zstd compress→decompress round-trips arbitrary bytes; decompression enforces a caller-supplied **max output size** and aborts on exceeding it (decompression-bomb guard, CWE-409).
- [ ] Canonical CBOR is deterministic: identical input → identical bytes across runs (asserted).
- [ ] f16 pack/unpack round-trips representable values within tolerance and clamps out-of-range without NaN surprises.
- [ ] The columnar builder/reader encodes and decodes a 5,000-sample stroke column set and hits the target ~3 B/sample after zstd (order-of-magnitude assertion).

#### Technical notes
`packages/sane_core/lib/src/codec/` (`varint.dart`, `zigzag.dart`, `delta.dart`, `compressor.dart`, `f16.dart`, `columnar.dart`). Depends on the seams/choices from [SN-CORE-013](storage.md#sn-core-013). Big-endian for framing per file-format §0. Overflow guards on varint length prefixes (CWE-190). These codecs are hot on write; keep allocations low but do not micro-optimise past correctness. Feeds all on-disk format issues.

#### Security & privacy
Threats: decompression/zip bombs (CWE-409), integer overflow in length prefixes (CWE-190), out-of-bounds reads on crafted buffers (input from imported `.sanenote`/remote segments — OWASP-A03/injection-adjacent malformed data). Controls: mandatory max-output caps before decode, bounds-checked readers that fail closed, overflow-guarded varints. MASVS-STORAGE-1, MASVS-CODE-4, ASVS V5. No content logged.

#### UX notes
None beyond baseline (no UI). Baseline: codec errors surface as `FormatFailure` → localised "file couldn't be read" message downstream; no raw bytes/paths in the error.

#### Test plan
`packages/sane_core/test/codec/varint_test.dart`, `delta_test.dart`, `compressor_test.dart` (round-trip + bomb cap), `cbor_canonical_test.dart`, `f16_test.dart`, `columnar_test.dart`. Fuzz truncated/oversized inputs (extended in [SN-CORE-026](storage.md#sn-core-026)).

#### Dependencies
[SN-CORE-013](storage.md#sn-core-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-018

<a id="sn-core-018"></a>

**Implement tombstone lifecycle and Trash retention**

| Field | Value |
|---|---|
| GitHub | #193 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage, sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `MASVS-RESILIENCE-3`, `OWASP-A04`, `ASVS-V11`, `CWE-459` |
| Extra labels | agent-ready |

#### Context
Deletion in Sane Notes is a **tombstone op, never a destructive erase** — this is what makes "device A deletes while device B edits" safe and what powers Trash/undelete ([`docs/architecture/document-model.md`](docs/architecture/document-model.md) §8, PRD-STOR-006, PRD-LB-039/060/065). This issue implements the tombstone model and the retention window; the causal-stability *purge* and compaction are a separate M4 issue because they need the multi-device watermark.

#### Scope
**In:** tombstone ops (`deleteObject`/`deleteNode`) and the `trashed`/`deletedAt` LWW fields; the lifecycle live→trashed→restore (undelete = LWW un-set of `trashed`)→(retention elapsed) GC-eligible; `Profile.trashRetentionDays` (default 30) bounding eligibility; the OR-Set observed-remove wiring so a trashed object's add-tags are marked for later GC; a query API for Trash contents (per profile/notebook) and restore.
**Out:** the actual physical purge under the causal-stability gate + compaction ([SN-CORE-020](storage.md#sn-core-020)), the Trash UI (library area), and blob orphan collection ([SN-CORE-020](storage.md#sn-core-020)).

#### Acceptance criteria
- [ ] Deleting a notebook/page/object writes a tombstone op and sets `trashed=true`/`deletedAt=Hlc`; the item disappears from normal views but appears in Trash on every device.
- [ ] Restore (un-set `trashed`) brings the item back with all contents intact; a two-replica test shows restore vs concurrent edit both survive.
- [ ] An item younger than `trashRetentionDays` is **never** GC-eligible (a test with a 30-day window asserts non-eligibility at day 29, eligibility signalled at day 31 — subject to the stability gate handled in [SN-CORE-020](storage.md#sn-core-020)).
- [ ] Concurrent delete (device A) vs edit (device B) is safe: the object is not lost mid-edit and the CRDT converges deterministically.
- [ ] Tombstones retain the minimum metadata (deletion Hlc + subsumed add-tags) needed for causal safety and nothing more (CWE-459 incomplete cleanup addressed by the later GC).

#### Technical notes
`packages/sane_core/lib/src/tombstone/tombstone.dart`, `trash_repository.dart`. Depends on [SN-CORE-003](sync.md#sn-core-003) (OR-Set/LWW), [SN-CORE-010](sync.md#sn-core-010) (tombstone ops), [SN-CORE-002](storage.md#sn-core-002). `trashRetentionDays` is a `Profile` LWW field. Note the Google Drive appDataFolder caveat: Trash is always an app-layer concept, never delegated to the drive (file-format §8). Implements PRD-STOR-006; the purge/stability gate is [SN-CORE-020](storage.md#sn-core-020).

#### Security & privacy
Threats: **data resurrection** (an offline device re-adds a deleted item on reconnect) — prevented not here but by the causal-stability gate in [SN-CORE-020](storage.md#sn-core-020); premature/incomplete cleanup leaving orphaned metadata (CWE-459); privacy expectation that deleted means gone within retention (MASVS-PRIVACY-2). Controls: tombstone-not-erase, bounded retention, minimum-metadata tombstones, deterministic convergence (MASVS-RESILIENCE-3). OWASP-A04, ASVS V11. No content/ids in logs beyond short hashes.

#### UX notes
Backs the Trash screen and undelete ([`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md) Library; PRD-LB-039). Trash always shows recent deletions on every device; restore is undoable. Empty Trash state and the 30-day auto-purge messaging render across the 17 looks. Baseline: no content in logs.

#### Test plan
`packages/sane_core/test/tombstone/tombstone_test.dart` (delete/restore, trashed/deletedAt), `retention_test.dart` (day-29 vs day-31 eligibility), `delete_vs_edit_test.dart` (two-replica safety). Extended in [SN-CORE-024](qa.md#sn-core-024) and purged by [SN-CORE-020](storage.md#sn-core-020) tests.

#### Dependencies
[SN-CORE-003](sync.md#sn-core-003), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-002](storage.md#sn-core-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-020

<a id="sn-core-020"></a>

**Implement compaction and causal-stability garbage collection**

| Field | Value |
|---|---|
| GitHub | #195 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | storage, sync |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-018](storage.md#sn-core-018), [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-016](storage.md#sn-core-016), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `MASVS-RESILIENCE-3`, `OWASP-A04`, `ASVS-V11`, `CWE-459`, `CWE-362` |
| Extra labels | agent-ready, innovation |

#### Context
CRDT history grows unboundedly unless compacted, and tombstones/OR-Set add-tags/orphaned blobs must be physically purged — but only once it is **safe**. [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §8 makes the **causal-stability gate** mandatory: purge only after a retention window **and** every registered, non-revoked device's watermark ≥ the tombstone's Hlc; otherwise an offline device resurrects deleted data on reconnect. Compaction folds the op tail into a fresh snapshot and drops purgeable tombstones, atomically. This depends on the multi-device watermark, so it lands with sync (M4).

#### Scope
**In:** the compaction pass (fold op-log tail → new monotone snapshot generation via [SN-CORE-015](storage.md#sn-core-015), then prune folded segments only after the new snapshot is durable on ≥2 replicas); the causal-stability computation from the per-device HLC watermark vector; GC of OR-Set add-tags, text-character tombstones, trashed subtrees, orphaned content-addressed blobs (zero live refs for a full retention window), and old op-log segments; stale-device handling (`staleDeviceDays` default 180, remove-device is itself an op) to unblock GC; the snapshot-ring pruning policy hook.
**Out:** version-history retention tiers/UI ([SN-CORE-021](storage.md#sn-core-021)), the cloud durability/replica accounting (SN-SYNC-002, referenced), device revocation key rotation (SN-CRY-002, referenced), tombstone creation ([SN-CORE-018](storage.md#sn-core-018)).

#### Acceptance criteria
- [ ] A tombstone is purged **only** when retention has elapsed **and** all non-revoked devices' watermark ≥ its Hlc; a test with an offline device below the watermark proves the tombstone is retained and the object is **not** resurrected on that device's reconnect.
- [ ] Compaction writes a new snapshot generation atomically and prunes old segments only after the new snapshot is durable on ≥2 replicas; a mid-compaction crash leaves the previous generation intact (no corruption, uses [SN-CORE-026](storage.md#sn-core-026) atomic write).
- [ ] Orphaned blobs (zero live refs for a full retention window and causally stable) are collected; a referenced blob is never collected.
- [ ] A stale device (> 180 days, not the purging device) can be removed via an op, which then unblocks GC; removal is itself convergent.
- [ ] Compaction is idempotent and deterministic: two idle devices compacting the same page converge to equivalent state (content-addressed, monotone generations).

#### Technical notes
`packages/sane_core/lib/src/compaction/compactor.dart`, `gc.dart`, `causal_stability.dart`. Depends on [SN-CORE-018](storage.md#sn-core-018) (tombstones), [SN-CORE-015](storage.md#sn-core-015) (snapshot write), [SN-CORE-016](storage.md#sn-core-016) (segment prune), [SN-CORE-005](storage.md#sn-core-005) (manifest generation/durability). Watermark vector per document-model §2.4; "durable on ≥2 replicas" accounting comes from the sync layer (SN-SYNC-002, referenced). Runs on an idle device holding the page. Implements document-model §8, PRD-STOR-008, PRD-SYNC-013 context.

#### Security & privacy
Threats: **data resurrection** from premature purge (the core risk — mitigated by the mandatory stability gate); incomplete cleanup leaving recoverable deleted content (CWE-459) undermining the privacy promise (MASVS-PRIVACY-2); a compaction race corrupting the snapshot (CWE-362) mitigated by atomic monotone generations. Controls: causal-stability gate, atomic write + generation fallback, durability-before-prune, deterministic idempotent compaction (MASVS-RESILIENCE-3). OWASP-A04, ASVS V11. No content in logs.

#### UX notes
No direct UI; keeps notebooks fast over time (bounded history) and makes "deleted is really gone after retention" true — the privacy-dashboard promise ([`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md); PRD-PRIV). The "remove old device" prompt (to unblock GC) surfaces on the Multi-device screen. Baseline: no content in logs.

#### Test plan
`packages/sane_core/test/compaction/causal_stability_test.dart` (offline-device no-resurrection), `compactor_test.dart` (atomic generation, prune-after-durable, crash safety), `gc_test.dart` (orphan blobs, add-tags, stale-device unblock), `compaction_determinism_test.dart`.

#### Dependencies
[SN-CORE-018](storage.md#sn-core-018), [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-016](storage.md#sn-core-016), [SN-CORE-005](storage.md#sn-core-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-021

<a id="sn-core-021"></a>

**Implement version history and snapshot ring retention**

| Field | Value |
|---|---|
| GitHub | #196 |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-020](storage.md#sn-core-020) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `OWASP-A04`, `ASVS-V11`, `CWE-459` |
| Extra labels | agent-ready, needs-decision |

#### Context
Version history falls out of retained snapshot generations plus the op-log tail: reconstruct any retained point by loading the nearest snapshot ≤ target and replaying ops up to the target Hlc ([`docs/architecture/file-format.md`](docs/architecture/file-format.md) §8, [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §8.2, PRD-STOR-007). It is what lets a student roll a page back after a bad edit. The exact retention *tiers* are a pending maintainer decision (CLAUDE.md §13: proposed Free ≥30 d / Pro ≥365 d), so this issue implements the mechanism and the proposed default, gated behind config.

#### Scope
**In:** the bounded snapshot-generation ring (default **hourly×24, daily×30, monthly×12**, configurable) with pruning of the rest at compaction; a `VersionHistory` read API that lists retained points (by physicalMs, human-readable timeline) and materialises any retained point (nearest snapshot ≤ target + op replay to target Hlc); a diff/preview hook (list changed objects between two points).
**Out:** the version-history UI/timeline (editor/library area), the Free-vs-Pro entitlement gating of retention length (sane_billing/SN-BILL — this issue exposes the config, marks the tier lengths `needs-decision`), and cloud storage of old generations (sync).

#### Acceptance criteria
- [ ] Any retained point reconstructs to the exact document state at that Hlc (nearest snapshot + op replay), verified against a scripted edit history.
- [ ] The ring keeps hourly×24 / daily×30 / monthly×12 by default and prunes the rest at compaction; retained-count is asserted after a simulated month of edits.
- [ ] Retention length is read from config (default = the proposed Free tier) with a clear seam for the entitlement-driven Pro value; the tier lengths are flagged `needs-decision` and implemented behind that config, not hardcoded per plan.
- [ ] Listing retained points returns a monotonic, human-ordered timeline (by physicalMs).
- [ ] Pruned generations are fully removed (no recoverable content beyond retention, CWE-459) — a privacy test confirms.

#### Technical notes
`packages/sane_core/lib/src/history/version_history.dart`, `snapshot_ring.dart`. Depends on [SN-CORE-015](storage.md#sn-core-015) (snapshot generations) and [SN-CORE-020](storage.md#sn-core-020) (compaction/pruning). Timeline ordering uses Hlc.physicalMs (document-model §3.4). The retention config seam is consumed by sane_billing later. Implements PRD-STOR-007. **Maintainer decision (needs-decision):** the Free/Pro retention-tier lengths (proposed 30 d / 365 d) — implement the proposed default now, gate behind config.

#### Security & privacy
Threats: retained history keeping deleted/edited-away content longer than the user expects (privacy, MASVS-PRIVACY-2) and incomplete pruning (CWE-459). Controls: bounded ring, full pruning at compaction, retention config surfaced in the privacy dashboard, no recoverable content past retention. OWASP-A04, ASVS V11. No content in logs.

#### UX notes
Backs the version-history timeline ([`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md); PRD-STOR-007) where a user scrubs and restores a prior page state; the free-vs-pro retention difference is surfaced in Settings/Billing. Restore renders across the 17 looks with clear "restored to <time>" feedback. Baseline: no content in logs.

#### Test plan
`packages/sane_core/test/history/version_history_test.dart` (reconstruct any point), `snapshot_ring_test.dart` (retention counts, pruning), `retention_privacy_test.dart` (pruned content unrecoverable), `retention_config_test.dart` (default + Pro seam).

#### Dependencies
[SN-CORE-015](storage.md#sn-core-015), [SN-CORE-020](storage.md#sn-core-020).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-022

<a id="sn-core-022"></a>

**Implement schema versioning and migration framework**

| Field | Value |
|---|---|
| GitHub | #197 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-010](sync.md#sn-core-010) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-RESILIENCE-3`, `OWASP-A08`, `ASVS-V1`, `CWE-1288` |
| Extra labels | agent-ready |

#### Context
Sane Notes is offline-first and BYO-cloud, so a **mixed-version window is permanent**: devices on different app versions must read each other's documents forever. [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §9 and [`docs/architecture/file-format.md`](docs/architecture/file-format.md) §7 define two independent version numbers — `formatVersion` (byte framing) and `schemaVersion` (document-model semantics) — and normative rules for forward/backward compatibility and migrations. Getting this wrong risks silent data loss across versions, so it is foundational.

#### Scope
**In:** the two version constants + where they live (file headers/manifest, `Workspace` LWW); the migration registry of pure `migrate_N_to_N+1(state) -> state` functions run in sequence on load when below the app's `schemaVersion`; the discipline that migrations are **deterministic, idempotent where possible, and expressed as ordinary ops** where they change shared state (so they merge); the read/write policy (read `formatVersion ≤` own; refuse to write bytes newer than own; higher formatVersion → read-only + prompt); unknown-key/section preservation wiring; the migration audit trail in the manifest.
**Out:** any specific migration (none exist yet at v1 schema 1) beyond a test fixture N→N+1; the op-registry forward-compat mechanics themselves ([SN-CORE-010](sync.md#sn-core-010)).

#### Acceptance criteria
- [ ] `formatVersion` and `schemaVersion` are distinct, documented, and never conflated (separate constants + tests).
- [ ] A fixture migration N→N+1 runs on load, is deterministic (same input → same output on any device) and idempotent (re-running is a no-op).
- [ ] A migration that changes shared state emits ordinary ops (so two devices migrating independently converge), verified by a two-replica test.
- [ ] Reading a document with `formatVersion` > supported opens read-only and prompts to update; writing such bytes is refused.
- [ ] Unknown CBOR keys / unknown snapshot sections survive a read→write cycle through a migration (no field dropped, CWE-1288 improper validation of specified index avoided; forward-compat rule 1).

#### Technical notes
`packages/sane_core/lib/src/migration/` (`versions.dart`, `migration_registry.dart`). Depends on [SN-CORE-002](storage.md#sn-core-002) (entities), [SN-CORE-010](sync.md#sn-core-010) (ops for op-expressed migrations). Structural container migrations (re-encoding a snapshot to current formatVersion) are local, non-semantic, need no op. Never ship a migration requiring all devices to upgrade simultaneously. Implements document-model §9 and file-format §7; the manifest migration audit trail is written by [SN-CORE-005](storage.md#sn-core-005).

#### Security & privacy
Threats: a buggy/ambiguous migration forking replicas or dropping fields (data loss, MASVS-RESILIENCE-3); accepting a maliciously-crafted higher-version document (OWASP-A08). Controls: deterministic + idempotent migrations, op-expressed shared-state changes, refuse-to-write-newer, unknown-data preservation, read-only fallback. ASVS V1. No content logged.

#### UX notes
No direct UI, but the "update to edit" read-only state and "update required to safely edit" (from [SN-CORE-010](sync.md#sn-core-010)) must render as non-destructive banners that never lose data. Baseline: no content in logs.

#### Test plan
`packages/sane_core/test/migration/versioning_test.dart` (distinct versions, read/write policy), `migration_determinism_test.dart` (fixture N→N+1, idempotent, op-expressed convergence), `unknown_data_preservation_test.dart`.

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002), [SN-CORE-010](sync.md#sn-core-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-023

<a id="sn-core-023"></a>

**Implement JSON structural export and import of the folded document**

| Field | Value |
|---|---|
| GitHub | #198 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | storage, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-009](sync.md#sn-core-009), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `OWASP-A03`, `OWASP-A08`, `ASVS-V5`, `CWE-502`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
A structural **JSON** dump of the folded document is the portable, programmatic-access/debugging export named in [`docs/architecture/file-format.md`](docs/architecture/file-format.md) §9 and PRD-STOR-005; it is lossy on the op-log/CRDT internals but faithful to the materialised state (entities, layers, objects, Peritext text as spans). It underpins developer tooling, debugging convergence issues, and interop for third parties who cannot yet parse `.sanenote`.

#### Scope
**In:** a deterministic JSON serialiser of the folded document (workspace/profile/notebook/page/layer/object tree, with strokes as `geometryRef` + style, text as Peritext-exported plain spans, blobs as `BlobRef` metadata); a matching importer that validates and rebuilds a document as ordinary create ops **into a new isolated notebook**; schema/version tagging in the JSON.
**Out:** PDF/PNG/SVG/Markdown export (sane_pdf + exporters), the `.sanenote` bundle ([SN-CORE-005](storage.md#sn-core-005)), and any UI (the export/share screen lives in the sharing area).

#### Acceptance criteria
- [ ] Export→import→export produces byte-identical JSON (round-trip stability) for a multi-object page.
- [ ] Text is exported via the Peritext `render()` spans and re-imported to equivalent content; strokes export as `geometryRef`+style (geometry stays in blobs, not inlined).
- [ ] Import validates every field (type/range/size) and rejects malformed/oversized input with `Err(FormatFailure)` before building any op (CWE-20/CWE-502), and imports into a **new isolated notebook** (never mutating an existing one).
- [ ] Import is size-capped and parsed off the UI isolate; a hostile JSON (deep nesting, huge arrays) is rejected within caps, not OOM.
- [ ] The JSON carries `schemaVersion`/`formatVersion` and a mismatch is handled per [SN-CORE-022](storage.md#sn-core-022) policy.

#### Technical notes
`packages/sane_core/lib/src/export/json_export.dart`, `json_import.dart`. Depends on [SN-CORE-002](storage.md#sn-core-002) (entities), [SN-CORE-003](sync.md#sn-core-003) (folded state), [SN-CORE-009](sync.md#sn-core-009) (text spans), [SN-CORE-004](storage.md#sn-core-004) (read the folded doc). Import emits ordinary create ops ([SN-CORE-010](sync.md#sn-core-010)) so the result is a normal CRDT document. Deterministic key ordering for stable diffs. Implements PRD-STOR-005 (JSON target only). Secure-coding checklist §1 (untrusted input) applies to import.

#### Security & privacy
Threats: untrusted JSON deserialization (CWE-502), improper input validation (CWE-20), resource exhaustion from deep/huge structures (OWASP-A03-adjacent). Controls: strict schema validation before build, size/depth caps, off-isolate parsing, import into an isolated notebook, fail closed. MASVS-STORAGE-1, MASVS-CODE-4, OWASP-A08, ASVS V5. Exported JSON on the user's own device may be cleartext (longevity), documented; no content logged.

#### UX notes
No direct UI here; feeds the Export screen ([`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md) share/export; PRD-04 export foundations). A failed import shows a clear localised error and never partially mutates data. Baseline: no content/paths in logs.

#### Test plan
`packages/sane_core/test/export/json_roundtrip_test.dart` (stable round-trip), `json_import_security_test.dart` (validation, caps, off-isolate, isolated notebook, hostile input rejected), `json_version_test.dart` (schema tagging/mismatch).

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-009](sync.md#sn-core-009), [SN-CORE-004](storage.md#sn-core-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-026

<a id="sn-core-026"></a>

**Implement corruption recovery, atomic writes and format fuzz corpus**

| Field | Value |
|---|---|
| GitHub | #200 |
| Type | security |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | storage, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-005](storage.md#sn-core-005), [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-016](storage.md#sn-core-016), [SN-CORE-014](storage.md#sn-core-014) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `MASVS-RESILIENCE-3`, `OWASP-A08`, `OWASP-A03`, `ASVS-V5`, `CWE-502`, `CWE-354`, `CWE-409`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
The local store and the `.sanenote` bundle can be corrupted by bit-rot, a tampering/faulty cloud drive, a mid-write crash, or a hostile import; the guarantee is that Sane Notes **fails closed** and recovers to a consistent state, never surfacing partial/forged data and never losing more than the un-synced tail ([`docs/architecture/file-format.md`](docs/architecture/file-format.md) §2.4/§4.4, CLAUDE.md §7.8, secure-coding-checklist §1). This issue implements the cross-cutting recovery behaviour and stands up the format fuzz corpus that keeps every parser honest. It is p0 (data-loss/security).

#### Scope
**In:** atomic temp-then-rename + fsync orchestration for snapshots/manifest with generation fallback (a crash at any point leaves a complete older generation usable, and readers keep using the previous generation during compaction); hash-tree/hash-chain verification driving fail-closed behaviour; torn-tail tolerance for op-log segments wired end-to-end; a recovery routine that, on a corrupt newest generation, falls back to the previous generation + replays the valid segment tail; the **fuzz corpus + fuzz harness** for SNSN, SNOL, SNBL, ink-v1 and `.sanenote` bundle parsers (malformed headers, truncation, oversized lengths, zip-slip names, decompression bombs, forged hashes).
**Out:** the parsers themselves ([SN-CORE-005](storage.md#sn-core-005)/[SN-CORE-014](storage.md#sn-core-014)/[SN-CORE-015](storage.md#sn-core-015)/[SN-CORE-016](storage.md#sn-core-016)) and the CRDT convergence harness ([SN-CORE-024](qa.md#sn-core-024)).

#### Acceptance criteria
- [ ] A crash injected between temp-write and rename, and between rename and manifest-update, always leaves a loadable prior generation (no torn state visible), verified by fault-injection tests.
- [ ] Every parser, given each fuzz-corpus input, returns `Err(FormatFailure)` or valid-up-to-last-good — it never crashes, reads out of bounds, allocates unbounded memory, or returns partial data as if complete (fail closed).
- [ ] A forged member hash (drive tampering) is detected and the member is ignored/re-fetched (CWE-354); a rolled-back manifest hash-chain is detected (rollback attack).
- [ ] A zip-slip entry name and a decompression bomb in an imported `.sanenote` are both rejected within caps (CWE-22/CWE-409).
- [ ] Recovery from a corrupt newest snapshot generation restores the page from the previous generation + valid op tail with no user data loss beyond the corrupted delta.

#### Technical notes
`packages/sane_core/lib/src/format/atomic_write.dart`, `recovery.dart`; corpus + harness under `packages/sane_core/test/format/fuzz/`. Depends on all four format issues. In the sync store the "rename" maps to the cloud adapter's atomic-publish primitive (SN-SYNC-001, referenced). Parsing runs off the UI isolate. This is the verification backbone for M2's "import a hostile/malformed file fails closed" exit criterion. Wire the corpus into CI (a parser regression fails the build).

#### Security & privacy
Threats: untrusted deserialization (CWE-502), integrity-check bypass (CWE-354), decompression bombs (CWE-409), path traversal (CWE-22), rollback by a tampering drive. Controls: fail-closed parsing with resource caps, atomic writes with generation fallback, hash-tree + hash-chain verification, off-isolate parsing, a CI fuzz gate. MASVS-STORAGE-1, MASVS-CODE-4, MASVS-RESILIENCE-3, OWASP-A03/A08, ASVS V5. No content/paths in logs.

#### UX notes
No direct UI; the felt guarantee is that a bad cloud sync, a corrupt file, or a crash never bricks a notebook — the user sees a clear localised "couldn't open / recovered older version" message, never a crash or silent partial data. Baseline: no paths/content in logs.

#### Test plan
`packages/sane_core/test/format/atomic_write_test.dart` (fault injection), `recovery_test.dart` (generation fallback + tail replay), `fuzz/parser_fuzz_test.dart` (corpus across all parsers → always fail-closed), `tamper_test.dart` (forged hash, rolled-back chain). CI fuzz job wired.

#### Dependencies
[SN-CORE-005](storage.md#sn-core-005), [SN-CORE-015](storage.md#sn-core-015), [SN-CORE-016](storage.md#sn-core-016), [SN-CORE-014](storage.md#sn-core-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GWEB-002

<a id="sn-gweb-002"></a>

**Coordinate concurrent browser tabs with Web Locks and a cross-tab change channel**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | storage, sync, compat |
| Size | L |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-008](storage.md#sn-web-008), [SN-GWEB-001](perf.md#sn-gweb-001) |
| Security controls | `CWE-362`, `MASVS-STORAGE-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context

On every native surface the app is a single process with a single database owner. On web it is not: `docs/platform/compatibility-matrix.md` lists multi-window as "browser tabs" for the web row, and users will absolutely open two tabs of `app.sane.<tld>` — one for a lecture notebook, one for a PDF — or restore a whole window of tabs after a crash. Both tabs run the same code against the **same origin storage**: one OPFS SQLite database file, one op-log, one blob store ([SN-WEB-008](storage.md#sn-web-008)). SQLite over OPFS sync access handles is an exclusive-writer design; a second tab taking the handle either fails to open or, worse, corrupts state if both sides assume ownership. Nothing in the backlog currently says who wins, how the loser behaves, or how a change made in tab A reaches tab B's UI. This issue makes concurrent tabs a defined, tested state instead of an accident, using the Web Locks API (Baseline in all four target browsers) for single-writer election and `BroadcastChannel` for change fan-out.

#### Scope

**In:** a `WebSessionCoordinator` in `app/lib/platform/web/session/` that (a) acquires a named Web Lock (`sane.db.writer`) for the lifetime of the tab that owns the database, (b) elects a new owner within 2 s when the owner tab closes or crashes, (c) publishes committed op batches, lock/unlock, sign-out and settings changes over a `BroadcastChannel('sane.notes')` carrying **ids and sequence numbers only, never content**, (d) makes non-owner tabs fully readable and editable by routing their writes through the owner (or by handing the lock over on user intent), and (e) shows the honest state in the UI. Also: a stale-lock timeout, a reconciliation pass on lock acquisition (replay op-log segments written by the previous owner), and the multi-tab rows in the compatibility matrix.

**Out:** the storage backend ([SN-WEB-008](storage.md#sn-web-008)), the worker facade ([SN-GWEB-001](perf.md#sn-gweb-001)), cloud sync between devices ([SN-WEB-019](sync.md#sn-web-019)), CRDT merge semantics ([SN-CORE-003](sync.md#sn-core-003)), and real-time collaboration between *users* ([SN-COL-001](collaboration.md#sn-col-001)).

#### Acceptance criteria

- [ ] Two tabs open on the same notebook: a stroke drawn in tab A appears in tab B within **1 s** without a reload, and no duplicate or lost op is observable after 200 alternating edits.
- [ ] Only one tab holds `sane.db.writer` at a time, provable from `navigator.locks.query()`; the second tab never opens a second SQLite write handle.
- [ ] Killing the owner tab (task-manager kill, not a clean close) transfers ownership to a surviving tab in ≤ 2 s and the surviving tab replays any partially written op-log segment without corruption.
- [ ] A non-owner tab is never read-only-by-surprise: either it edits through the owner or the UI states "Editing continues in another tab — click to take over", with a one-click takeover.
- [ ] No `BroadcastChannel` message contains note text, ink coordinates, titles, key material or file paths — asserted by a test over the message schema.
- [ ] Sign-out, app-lock and key-scrub in one tab lock **every** tab within 1 s ([SN-WEB-031](security.md#sn-web-031), [SN-SEC-020](security.md#sn-sec-020)).
- [ ] With `BroadcastChannel` or Web Locks unavailable, the app degrades to a single-writer warning banner and polling refresh rather than corrupting state.

#### Technical notes

Use `navigator.locks.request(name, {mode:'exclusive'}, …)` held for the tab's lifetime, plus `{steal:false, ifAvailable:true}` probes for the takeover UI. Channel messages are small CBOR/JSON envelopes `{v, kind, deviceId, opSeq, notebookIdHash}`; the receiving tab pulls the actual ops from the shared database through the storage worker, so the channel is a *signal*, not a transport. Reuse the reconciliation entry point from [SN-CORE-010](sync.md#sn-core-010)'s op-log reader rather than writing a second replay path. Document the model in `docs/platform/web.md` §4 and add the rows to `docs/platform/compatibility-matrix.md`.

#### Security & privacy

Threats: **race-condition corruption** of the op-log and blob store (CWE-362, CWE-667) — mitigated by exclusive locks, atomic segment writes ([SN-CORE-026](storage.md#sn-core-026)) and replay-on-acquire; **cross-tab information disclosure** — `BroadcastChannel` is same-origin, but an XSS foothold could subscribe, so no content, titles or keys ride the channel (CWE-200, MASVS-PRIVACY-1); **lock starvation / DoS** from a hung tab (CWE-400) — stale-lock timeout with an explicit takeover; **security-state desynchronisation** — a locked or signed-out session in one tab must not stay unlocked in another, which is a real access-control bug on a shared computer (OWASP-A01, CWE-359).

#### UX notes

Three states on the Editor chrome per `docs/design/screens-and-flows.md` §7.1: silent (owner), "Synced from another tab" toast on first cross-tab update, and the takeover affordance. Copy is plain and non-alarming. Tokens and components come from `sane_ui` ([SN-DS-019](design-system.md#sn-ds-019) toast, [SN-DS-003](design-system.md#sn-ds-003) buttons). The takeover control is keyboard reachable with a visible focus ring and announced through a live region ([SN-WEB-021](a11y.md#sn-web-021)).

#### Test plan

- `app/test/platform/web/session_coordinator_test.dart` — election, stale-lock timeout, message schema, degraded mode.
- `app/test/security/broadcast_no_content_test.dart` — fuzz the publisher with content-bearing objects; assert the serialiser drops everything not in the allow-list.
- `app/integration_test/web/two_tab_edit_test.dart` — Playwright two-context scenario (edit fan-out, owner kill, takeover, sign-out propagation), added to the [SN-WEB-023](qa.md#sn-web-023) harness.
- Manual: Safari iPadOS two-tab pass recorded in the Tier 2 matrix.

#### Dependencies

[SN-WEB-008](storage.md#sn-web-008) (single-writer storage), [SN-GWEB-001](perf.md#sn-gweb-001) (worker facade that owns the handle). Interacts with [SN-WEB-031](security.md#sn-web-031) and [SN-SEC-020](security.md#sn-sec-020) (lock state), [SN-CORE-026](storage.md#sn-core-026) (atomic writes).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GWEB-003

<a id="sn-gweb-003"></a>

**Flush and restore work across browser page-lifecycle transitions**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | storage, perf, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-008](storage.md#sn-web-008), [SN-GWEB-001](perf.md#sn-gweb-001) |
| Security controls | `MASVS-STORAGE-1`, `CWE-404`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context

A native app is told when it is going away. A web page is not: browsers **freeze**, **discard** and **kill** tabs without warning to reclaim memory, put them in the back/forward cache on navigation, and on mobile may never fire `unload` at all. The only reliable last-chance signals are `visibilitychange` (to `hidden`) and `pagehide`; `beforeunload` is unreliable, blocked in some contexts and hostile to users. Sane Notes on web holds real state in memory at any moment: the wet stroke, uncommitted ops queued for the storage worker, an in-flight autosave, a recording buffer ([SN-WEB-026](audio.md#sn-web-026)), and a derived key that must be scrubbed ([SN-WEB-031](security.md#sn-web-031)). Nothing in the backlog currently owns this transition. [SN-WEB-009](storage.md#sn-web-009) covers *eviction* of data already written, and [SN-REL-008](release.md#sn-rel-008) covers *deploy* safety; neither covers "the user switched tabs, the OS reclaimed the tab, and the last 40 seconds of writing were only in RAM". This is a data-loss path, which is why it is p0.

#### Scope

**In:** a `WebLifecycleController` in `app/lib/platform/web/lifecycle/` that listens to `visibilitychange`, `pagehide`, `freeze`, `resume` and `pageshow(persisted)` and, on hide: commits the active stroke, flushes the op queue to OPFS synchronously through the storage worker, checkpoints the recorder, persists the ephemeral UI state needed to restore (open notebook, page, viewport, tool, selection) in a bounded local record, and scrubs the in-memory key if the auto-lock policy says so; on resume/`pageshow`: revalidates the database handle (a bfcache-restored page may have lost its lock — [SN-GWEB-002](storage.md#sn-gweb-002)), re-reads anything another tab changed, and restores the viewport without a visible reload; plus a discard-recovery path on next launch ("Continue where you left off") and a bfcache-compatibility audit of every listener we register.

**Out:** eviction of persisted data ([SN-WEB-009](storage.md#sn-web-009), [SN-WEB-032](storage.md#sn-web-032)), sync to the cloud ([SN-WEB-019](sync.md#sn-web-019)), the service-worker update handshake ([SN-WEB-011](compat.md#sn-web-011), [SN-REL-008](release.md#sn-rel-008)), and native app-lifecycle handling.

#### Acceptance criteria

- [ ] Drawing a stroke and immediately switching tabs, then killing the tab from the browser task manager, loses **zero** committed strokes; the flush on `hidden` completes within **50 ms** for a typical queue and is bounded (never blocks the hide for more than 200 ms).
- [ ] `pagehide` and `visibilitychange` are the only teardown hooks; `beforeunload` is used **only** to warn about genuinely unsavable state, and a test asserts it is not registered on the normal path (so bfcache stays eligible).
- [ ] A back-navigation that restores the page from bfcache resumes with a live database handle, a correct viewport and no duplicate listeners; no "restored" page ever writes with a stale lock.
- [ ] After a tab discard, the next launch offers to restore the previous notebook, page and viewport; declining leaves the library untouched.
- [ ] Hiding the tab while recording checkpoints the audio segment ([SN-AUD-008](audio.md#sn-aud-008)) and the transcript position; resuming continues without a gap.
- [ ] With auto-lock enabled, hiding the tab scrubs the in-memory key within 1 s and the restored page requires re-auth ([SN-WEB-031](security.md#sn-web-031)).
- [ ] The restore record contains no note content — only ids, a page index and a viewport rect — asserted by a test.

#### Technical notes

Register listeners once, at app root, in `app/lib/platform/web/lifecycle/`; use `dart:js_interop` for the events Flutter does not surface (`freeze`, `resume`, `pageshow.persisted`). The hide-path flush must be **synchronous at the storage layer** — this is exactly why the OPFS sync access handle lives in a worker ([SN-GWEB-001](perf.md#sn-gweb-001)) and why the queue must be drainable without awaiting a network. Follow the `AppLifecycleListener` seam used on native so shared code sees one abstraction. Note the WebKit caveat in `docs/platform/web.md` §4: an un-interacted origin is evicted after 7 days, so the restore record is best-effort and never the only copy.

#### Security & privacy

Threats: **unsaved-work loss** (availability, TM-D-*) — the core control here; **key lifetime overrun** — a hidden tab holding a derived key on a shared computer is the web's weakest-link scenario, so hide triggers the scrub policy ([SN-WEB-031](security.md#sn-web-031), [SN-SEC-020](security.md#sn-sec-020), MASVS-STORAGE-2, CWE-522); **state leakage into restore metadata** — the restore record is ids and geometry only, never titles or content (CWE-200, MASVS-PRIVACY-1); **resource exhaustion** — the flush is bounded and cancellable so a huge queue cannot hang the browser's hide path (CWE-400). No listener may log content (CWE-532).

#### UX notes

Silent on the happy path. On relaunch after a discard, a single non-modal card on the Library ("Pick up where you left off — Physics, page 12") built from `sane_ui` ([SN-DS-016](design-system.md#sn-ds-016)), dismissible and keyboard reachable, never auto-opening a locked notebook. If a hide happened mid-recording, the recorder bar shows the checkpoint state rather than a silent stop ([SN-AUD-010](audio.md#sn-aud-010)).

#### Test plan

- `app/test/platform/web/lifecycle_controller_test.dart` — event ordering, bounded flush, restore-record schema, scrub-on-hide, no `beforeunload` on the normal path.
- `app/integration_test/web/lifecycle_flush_test.dart` — Playwright: draw, hide, kill context, relaunch, assert stroke present and restore card shown; bfcache round-trip via cross-document navigation.
- `app/test/security/restore_record_no_content_test.dart` — fuzzed content objects never reach the record.
- Manual: iPadOS Safari tab-discard and Chrome Android memory-pressure runs recorded in the Tier 2 matrix.

#### Dependencies

[SN-WEB-008](storage.md#sn-web-008) (storage), [SN-GWEB-001](perf.md#sn-gweb-001) (worker flush path). Interacts with [SN-GWEB-002](storage.md#sn-gweb-002) (lock revalidation), [SN-WEB-031](security.md#sn-web-031) (key scrub), [SN-AUD-008](audio.md#sn-aud-008) (recording checkpoints).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GWEB-015

<a id="sn-gweb-015"></a>

**Detect blocked or ephemeral browser storage and run an honest session-only mode**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | storage, privacy, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-008](storage.md#sn-web-008), [SN-WEB-009](storage.md#sn-web-009) |
| Security controls | `MASVS-STORAGE-1`, `CWE-404`, `CWE-359`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context

[SN-WEB-008](storage.md#sn-web-008) builds the OPFS/SQLite-WASM store and [SN-WEB-009](storage.md#sn-web-009) handles quota, `persist()` and eviction warnings — both assuming storage **exists**. On the web it often does not, or does not survive the window: a Chrome incognito / Firefox private / Safari private window gives an ephemeral, tiny or entirely separate store that is destroyed on close; enterprise and school policies and browser settings can block site data outright; "Block third-party cookies and site data" configurations and some privacy extensions break IndexedDB or OPFS; and a locked-down kiosk browser may throw on the very first write. Sane Notes on a school computer is a realistic primary scenario, so this is not an edge case. The failure today would be the worst possible one: the editor opens, the user writes for 40 minutes, and every save silently fails or vanishes at window close. Nothing in the backlog mentions private browsing or blocked storage, and the durability banner from [SN-WEB-009](storage.md#sn-web-009) assumes a store that can be made persistent.

#### Scope

**In:** a startup **storage-capability probe** (can we open OPFS? can we get a sync access handle? does IndexedDB open? does `persist()` succeed or is it permanently denied? is the store ephemeral?) run before the first write and cached for the session; a **session-only mode** in which the app works fully in memory with an explicit, always-visible state ("Nothing is being saved on this computer"); a forced decision point at the first meaningful save — sign in and sync to your cloud, export a file, or continue knowing the work is temporary; hard suppression of durability-implying UI (auto-save toast, "Saved" indicators) in this mode; a warning before window/tab close in session-only mode (the one legitimate `beforeunload` use, per [SN-GWEB-003](storage.md#sn-gweb-003)); a "leave nothing behind" teardown for shared computers (clear in-memory state, scrub keys, `Clear-Site-Data` where available); and the capability rows in the compatibility matrix.

**Out:** the storage backend ([SN-WEB-008](storage.md#sn-web-008)), quota/eviction handling for a working store ([SN-WEB-009](storage.md#sn-web-009)), eviction recovery from cloud ([SN-WEB-032](storage.md#sn-web-032)), the web key posture ([SN-WEB-031](security.md#sn-web-031)), and the guest trial flow ([SN-WEB-022](onboarding.md#sn-web-022)).

#### Acceptance criteria

- [ ] In a private/incognito window on Chrome, Safari and Firefox, the app starts, states clearly that work will not be kept on this computer, and remains fully usable.
- [ ] With site data blocked entirely (browser setting or policy), the app does not crash, does not spin, and does not silently drop writes: it enters session-only mode within 2 s of launch.
- [ ] No "Saved" or auto-save affordance is ever shown in session-only mode; the persistent state chip says "Not saved on this device" and links to the three options.
- [ ] Attempting to close the tab with unsaved work in session-only mode shows the browser's confirmation — and this is the **only** place the app registers `beforeunload` ([SN-GWEB-003](storage.md#sn-gweb-003) asserts this).
- [ ] Choosing "sign in and sync" from session-only mode moves the in-memory document to the user's cloud without a round trip through local disk, and the state chip updates to the durable state.
- [ ] Export from session-only mode works for every format ([SN-SHR-002](sharing-export.md#sn-shr-002)) so a user can always get their work out.
- [ ] "Finish on this computer" (shared-machine teardown) clears memory, scrubs keys ([SN-WEB-031](security.md#sn-web-031)) and issues `Clear-Site-Data` where supported; a follow-up inspection shows no OPFS, IndexedDB, Cache Storage or `localStorage` residue.
- [ ] The probe result appears in the capability report ([SN-WEB-023](qa.md#sn-web-023)) and in Settings → About → Diagnostics, as booleans only.

#### Technical notes

Probe defensively: every storage API can **throw** rather than return false in a blocked context, so wrap each call and treat an exception as "unavailable" (checklist §0, fail closed). `navigator.storage.estimate()` returning a near-zero quota and `persist()` returning false permanently are both signals of an ephemeral store. Keep the in-memory document path identical to the persisted one by routing through the same repository interfaces ([SN-CORE-012](storage.md#sn-core-012)) with a memory-backed implementation, so session-only mode is a backend swap rather than a second app. Reference `docs/platform/web.md` §4 and ADR-0010 decision 3.

#### Security & privacy

This is primarily an **availability and honesty** control (TM-D-*): silently losing a user's notes is the worst outcome the product can produce, so the app must never imply durability it does not have (CWE-404, `PRD-CO-000`). It is also a **shared-computer privacy** control: on a library or classroom machine, session-only mode plus an explicit teardown is the safer default, and the teardown must remove residue that a later user could read (CWE-359, CWE-200, MASVS-PRIVACY-1, MASVS-STORAGE-1). Keys derived in this mode live only in memory and are scrubbed on hide/close ([SN-WEB-031](security.md#sn-web-031), CWE-522, MASVS-STORAGE-2). The probe reads capability booleans only, logs no identifiers, and never fingerprints (CWE-532, `PRD-PRIV-007`).

#### UX notes

One persistent, quiet chip in the Editor/Library chrome rather than a repeated modal, with the three options one tap away — the tone from `docs/design/tone-of-voice`: factual, no scare language, no blame on the browser. The first-save decision sheet is dismissible and re-openable from the chip. "Finish on this computer" appears in the account/profile menu whenever session-only mode is active. All surfaces use `sane_ui` components ([SN-DS-016](design-system.md#sn-ds-016), [SN-DS-019](design-system.md#sn-ds-019)), are keyboard reachable, and announce state changes through a live region ([SN-WEB-021](a11y.md#sn-web-021)).

#### Test plan

- `app/test/platform/web/storage_probe_test.dart` — each API throwing, returning false, or returning a near-zero quota maps to the right mode.
- `app/test/platform/web/session_only_repo_test.dart` — memory repository satisfies the same contract suite as the persisted one.
- `app/integration_test/web/private_window_test.dart` — Playwright incognito context: banner, no save affordance, export works, close warning fires.
- `app/test/security/teardown_residue_test.dart` — after teardown, every storage surface reports empty.
- Manual: Safari private tab on iPadOS and a policy-blocked enterprise Chrome profile, recorded in the Tier 2 matrix.

#### Dependencies

[SN-WEB-008](storage.md#sn-web-008) (storage backend and repositories), [SN-WEB-009](storage.md#sn-web-009) (durability UX it degrades from). Interacts with [SN-WEB-031](security.md#sn-web-031) (key scrub), [SN-GWEB-003](storage.md#sn-gweb-003) (`beforeunload` policy), [SN-WEB-018](auth.md#sn-web-018) (`Clear-Site-Data` on sign-out).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-008

<a id="sn-web-008"></a>

**Implement OPFS and SQLite-WASM (drift) persistence in a Worker**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | storage, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-CORE-004](storage.md#sn-core-004), [SN-WEB-002](compat.md#sn-web-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `OWASP-A03`, `CWE-89`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Local-first means the browser **is** the device store on web (`docs/adr/0010-web-pwa-strategy.md` decision 3). The chosen stack is **drift on SQLite-WASM over OPFS sync access handles inside a Worker**: OPFS (`navigator.storage.getDirectory()` + `createSyncAccessHandle()`, Worker-only) is the performance tier available on Chrome/Edge 86+, Firefox 111+ and Safari 15.2+, IndexedDB is the compatibility fallback, and `localStorage` is for small preferences only — **never** note content (`docs/platform/web.md` §4). Putting the database in a Worker also keeps persistence off the UI thread, which the architecture requires so that a write can never add a millisecond to ink latency (CLAUDE.md §8, `docs/architecture/overview.md` §6). This issue delivers the same `sane_core` repository contract as native, backed by the web store, implementing `PRD-STOR-001` and `PRD-STOR-002` on web.

#### Scope
**In:** a web storage backend under `app/lib/platform/web/storage/` wiring drift's web build to SQLite-WASM over OPFS in a dedicated Worker; a content-addressed blob store for ink/PDF/audio payloads in OPFS; an IndexedDB fallback when sync access handles are unavailable; schema creation and migration; a preference store on `localStorage` limited to non-content keys; quota-aware writes.
**Out:** encryption at rest and key handling ([SN-WEB-031](security.md#sn-web-031)), persistence/eviction UX ([SN-WEB-009](storage.md#sn-web-009)), sync to the user's cloud ([SN-WEB-019](sync.md#sn-web-019)), and the shared schema definition itself ([SN-CORE-004](storage.md#sn-core-004)).

#### Acceptance criteria
- [ ] Creating a notebook, writing 500 strokes across 5 pages, reloading the tab and reopening reproduces the document **byte-for-byte** at the stroke-serialisation level.
- [ ] The database and all blob I/O run in a Worker; a profile capture during continuous writing shows no storage work on the main thread and no frame over 16.7 ms.
- [ ] Opening a 1,000-page notebook completes in **< 1 s** on Chrome desktop (budget parity with native, `docs/platform/performance-budgets.md`).
- [ ] When `createSyncAccessHandle` is unavailable, the IndexedDB fallback engages automatically and all functional tests still pass (slower is acceptable, data loss is not).
- [ ] Every storage call is wrapped so a `QuotaExceededError` produces a typed `Failure` and a user-safe message, never an unhandled exception or a partially written note.
- [ ] Two tabs open on the same origin do not corrupt the database: the second tab either shares the Worker or fails closed with a clear "open in another tab" state.
- [ ] No note content, title or blob is ever written to `localStorage` or `sessionStorage` — asserted by a test that scans both stores after a scripted session.

#### Technical notes
Implement the `sane_core` repository interfaces ([SN-CORE-002](storage.md#sn-core-002), [SN-CORE-004](storage.md#sn-core-004)) so `app/` code is unaware of the backend; `packages/sane_core` stays pure Dart with no web import (package DAG, `docs/architecture/overview.md` §5). Use **parameterised queries via drift only** — never string-built SQL (secure-coding checklist §9.1). Content-address blobs with the same hash function as native ([SN-CORE-004](storage.md#sn-core-004)) so `.sanenote` bundles and sync segments are portable. Keep the Worker's message protocol typed and minimal. Cross-origin isolation is not required for OPFS, but the Worker must keep functioning when it is enabled ([SN-WEB-015](security.md#sn-web-015)). Implements `PRD-STOR-001`, `PRD-STOR-002`, `PRD-STOR-008` and ADR-0010 decision 3.

#### Security & privacy
Threats: SQL injection through any hand-built query (OWASP-A03, CWE-89); unbounded blob writes filling the user's disk or being used as a decompression-bomb landing zone (CWE-400); note content leaking into `localStorage`, which is readable by any script running on the origin and is where an XSS payload would look first (MASVS-STORAGE-1, CWE-312); untrusted data deserialised into arbitrary types (MASVS-CODE-4, CWE-502). Controls: drift parameterised statements everywhere; size caps and a wall-clock timeout before any decode or blob write (checklist §1); OPFS-only for content, `localStorage` restricted to an allow-list of preference keys enforced by a lint-style test; explicit, validated model deserialisation; all failures typed as `Result<T, Failure>` and fail-closed. OPFS is origin-private but is **not** a boundary against local malware — the crypto in [SN-WEB-031](security.md#sn-web-031) is (ADR-0010 Security impact).

#### UX notes
Invisible when healthy, decisive when not. The Library and Editor screens (`docs/design/screens-and-flows.md` §6, §7) must show a skeleton loading state, an empty state for a new workspace, and a clear, non-blaming error state when the store cannot open ("Sane Notes can't open your notes in this browser" with a retry and an export path). All states are tokenised through `sane_ui` so they render in all **17 looks, light and dark**. Accessibility: error and loading states announce via `Semantics` live regions, controls are keyboard reachable with visible focus, 44 px targets, ≥ 4.5:1 contrast.

#### Test plan
- `app/test/web/opfs_store_test.dart` — CRUD, migration, quota error mapping, fallback selection (mocked handles).
- `app/test/web/local_storage_allowlist_test.dart` — asserts no content key ever reaches `localStorage`.
- `app/integration_test/web/persistence_roundtrip_test.dart` — headless Chromium: write, reload, verify byte-for-byte; 1,000-page open timing.
- `app/integration_test/web/two_tab_test.dart` — concurrent tab behaviour.
- Manual: Safari iPadOS (sync access handle support), Firefox 125, and a quota-pressure run per `docs/platform/web.md` §12.

#### Dependencies
[SN-CORE-004](storage.md#sn-core-004), [SN-WEB-002](compat.md#sn-web-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md §1 and §9.1

---

### SN-WEB-009

<a id="sn-web-009"></a>

**Guard web note durability with persist(), estimate() and eviction warnings**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | storage, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-008](storage.md#sn-web-008) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-400`, `CWE-459` |
| Extra labels | agent-ready |

#### Context
Browser storage can be **taken away**. Best-effort storage is LRU-evicted under disk pressure, and WebKit's ITP deletes script-writable storage for an origin after **7 days without interaction** — which would silently destroy a student's unsynced notes (`docs/platform/web.md` §4, `docs/adr/0010-web-pwa-strategy.md` R6). The docs call this a **correctness requirement, not a nicety**: the web build MUST request persistence on first meaningful save, check headroom with `navigator.storage.estimate()`, warn honestly, and push the user toward a durable copy (install, cloud sync, or export). This issue implements that contract; losing a note is the single worst failure this product can have, which is why it is p0.

#### Scope
**In:** calling `navigator.storage.persist()` from a **user gesture** at first meaningful save; reading `estimate()` for headroom; a persistent, dismissible-but-returning durability banner while a workspace has no durable copy; a low-space warning; a "last durable copy" indicator; graceful `QuotaExceededError` handling that never loses the in-memory document; telemetry-free local counters only.
**Out:** the storage backend itself ([SN-WEB-008](storage.md#sn-web-008)), the actual cloud sync ([SN-WEB-019](sync.md#sn-web-019)), export ([SN-WEB-013](sharing-export.md#sn-web-013)), install prompting ([SN-WEB-010](compat.md#sn-web-010)), and the eviction-recovery verification ([SN-WEB-032](storage.md#sn-web-032)).

#### Acceptance criteria
- [ ] `persist()` is requested inside a user-gesture handler on the first save of real content, never on page load; the result (granted/denied) is stored locally and surfaced in Settings → Privacy & export.
- [ ] When persistence is denied and no cloud/export copy exists, a banner explains in plain language that browser storage can be cleared, with two actions: "Turn on sync" and "Export a copy" (and "Install the app" where installable).
- [ ] When `estimate()` shows usage above **80 %** of quota, a low-space warning appears with the same actions and the numbers rendered in locale-aware units (`PRD-CO-375`).
- [ ] A `QuotaExceededError` during a write surfaces "Storage full" and leaves the in-memory document intact and exportable; no partial write is committed.
- [ ] The banner reappears after 7 days of a still-undurable workspace and is never shown for a workspace with a current cloud or exported copy.
- [ ] Copy never blames the user or the browser and never over-promises: it states what will happen, not what might.
- [ ] All durability state is profile-local; nothing about storage state is sent anywhere (`PRD-PRIV-001`).

#### Technical notes
Implement in `app/lib/platform/web/storage/durability_controller.dart` with a Riverpod provider exposing a sealed `DurabilityState` (`persistentGranted`, `bestEffort`, `lowSpace`, `quotaExhausted`) consumed by `sane_ui` banner components ([SN-DS-003](design-system.md#sn-ds-003)). Installed/Home-Screen web apps are granted persistence heuristically — re-probe after an install event ([SN-WEB-010](compat.md#sn-web-010)). Wrap every storage/quota call in try/catch and degrade gracefully (checklist §9.1). Cross-reference `PRD-STOR-001`, `PRD-STOR-005` (export as portability), `PRD-SYNC-001` (sync is off until the user turns it on — so the nudge must never auto-enable it) and `PRD-PRIV-001` (the "what leaves this device" panel must state the truth). ADR-0010 decision 3 and `docs/platform/web.md` §4 are the normative sources.

#### Security & privacy
Threats: silent data loss through eviction (availability; TM-D-*), a nudge that dark-patterns the user into enabling cloud sync they did not choose (MASVS-PRIVACY-1, `PRD-SYNC-001`), and a storage-state probe becoming a fingerprinting signal (MASVS-PRIVACY-2). Controls: the durability banner offers choices and never enables sync or an account by itself; the wording is accurate about zero-knowledge (a cloud copy is ciphertext only — MASVS-STORAGE-1, MASVS-CRYPTO-2); quota figures are read locally and never transmitted (MASVS-PRIVACY-3); failures are typed `Failure` values with user-safe text and no internal paths (CWE-209); no note content is logged when a quota error is recorded (CWE-532). Resource exhaustion is bounded before write (CWE-400).

#### UX notes
Surfaces: a banner above the Library list and inside the Editor (`design/Sane Notes.dc.html`, `docs/design/screens-and-flows.md` §6, §7.1) plus a durability row in Settings → Privacy & export (§12). Use `sane_ui` warning tokens so contrast holds in all **17 looks, light and dark** — golden-test the banner in at least two looks in both modes. States to cover explicitly: healthy (no banner), best-effort, low space, quota exhausted, and offline. Accessibility: the banner is an ARIA live region announced once (not on every rebuild), all actions are ≥ 44 px, keyboard reachable in order with a visible focus ring, and contrast is ≥ 4.5:1 including the warning colour (`PRD-CO-311`, `PRD-CO-312`).

#### Test plan
- `app/test/web/durability_controller_test.dart` — state machine across granted/denied/low-space/quota-exhausted, and the 7-day re-show rule with a fake clock.
- `app/test/web/durability_banner_golden_test.dart` — goldens in two looks, light and dark.
- `app/integration_test/web/persist_gesture_test.dart` — asserts `persist()` is only called from a gesture and only on meaningful save.
- `app/integration_test/web/quota_exhausted_test.dart` — simulated quota failure keeps the document intact and exportable.
- Manual: Safari iPadOS 7-day ITP scenario as scripted in [SN-WEB-032](storage.md#sn-web-032).

#### Dependencies
[SN-WEB-008](storage.md#sn-web-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/platform/web.md §4 and the privacy dashboard copy updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2 and §11

---

### SN-WEB-032

<a id="sn-web-032"></a>

**Verify storage-eviction recovery from the cloud durable copy on web**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | web |
| Areas | storage, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-009](storage.md#sn-web-009), [SN-WEB-019](sync.md#sn-web-019) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `CWE-459`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
The web surface makes one promise that is easy to state and hard to prove: **an evicted browser store does not lose your notes, because the user's own cloud holds the durable copy** ([SN-WEB-009](storage.md#sn-web-009), [SN-WEB-019](sync.md#sn-web-019), `docs/adr/0010-web-pwa-strategy.md` R6). `docs/platform/web.md` §12 requires a specific test for exactly this: simulate quota pressure and the WebKit 7-day ITP eviction, then confirm the cloud-sync durable copy recovers the note. Until that test exists and passes, the durability claim is an assertion. This issue builds the scripted verification and wires it into the release checklist so a regression in eviction recovery is caught before a student discovers it.

#### Scope
**In:** an automated eviction-recovery suite (clear site data / simulate quota exhaustion, reload, re-authenticate, restore from the user cloud, verify byte-for-byte equality); a scripted manual protocol for the WebKit 7-day ITP case which cannot be automated; assertions that unsynced work is never silently lost without the warning from [SN-WEB-009](storage.md#sn-web-009); and the release-checklist entry.
**Out:** the sync engine ([SN-SYNC-002](sync.md#sn-sync-002)), the Drive adapter ([SN-WEB-019](sync.md#sn-web-019)), the durability UX ([SN-WEB-009](storage.md#sn-web-009)), and native backup/restore.

#### Acceptance criteria
- [ ] With sync enabled, clearing all site data and reloading restores every notebook, page, stroke and attachment from the cloud, byte-for-byte at the serialisation level, after the user re-authenticates and supplies the key.
- [ ] Restore is resumable: interrupting it mid-way and reloading continues rather than restarting or duplicating.
- [ ] A simulated `QuotaExceededError` during restore surfaces a clear state and does not corrupt the partially restored store.
- [ ] With sync **disabled**, the same eviction loses local data **and** the test asserts that the durability warning was shown beforehand — the failure mode is documented, not silent (`PRD-STOR-005` export path is offered).
- [ ] Restoring on a **fresh browser** requires the key source or recovery code and fails closed without it, showing "Paused (no key)" rather than empty or partial notes (`PRD-KEY-009`).
- [ ] A manual protocol for the WebKit 7-day ITP scenario is documented in `tools/device_lab/web-matrix.md` with a recorded result each release.
- [ ] The suite runs in CI against a mocked cloud provider and completes in under 10 minutes.
- [ ] Restore of a 500 MB workspace stays within a bounded memory ceiling and reports progress.

#### Technical notes
Automate with the harness from [SN-WEB-023](qa.md#sn-web-023): drive headless Chromium, use the storage APIs plus a devtools protocol call to clear site data, and back the cloud with an in-process fake implementing the `sane_cloud_drive` interface so the test needs no real credentials. Byte-for-byte comparison uses the content-addressed hashes from [SN-CORE-004](storage.md#sn-core-004). The 7-day ITP case cannot be automated (it requires wall-clock time on real WebKit), hence the scripted manual protocol. Cross-reference `PRD-SYNC-013` (multi-device reconcile), `PRD-BKP-*` (local backup/restore) and ADR-0006 for segment/snapshot layout.

#### Security & privacy
Threats: a restore path that accepts data without verifying the AEAD tag would be a plaintext-injection route from a compromised cloud (TM-T-01, MASVS-CRYPTO-2); a restore that proceeds without the key and shows partial content would break the zero-knowledge promise (CWE-459, `PRD-KEY-009`); an unbounded restore could exhaust memory or storage (CWE-400); test fixtures could leak real data (checklist §0.1). Controls: verify-then-use with fail-closed on every restored segment; key required before any decrypt; bounded, chunked restore with quota checks; synthetic fixtures only; no filenames, ids or content in test logs (CWE-532). The suite is itself an assurance control for MASVS-STORAGE-1.

#### UX notes
The user-visible surface is the restore experience: Library shows a restoring state with progress and count, the Editor is unavailable for not-yet-restored notebooks rather than showing empty pages, and the "Paused (no key)" state is reachable and explained (`docs/design/screens-and-flows.md` §6, §12). Every state must render in all **17 looks, light and dark**; golden-test the restoring and paused states in two looks per mode. Cover empty (nothing in the cloud), partial (restore in progress), error (provider unavailable), offline (restore cannot start — say so plainly) and no-key states. Accessibility: progress announced politely, ≥ 44 px controls, ≥ 4.5:1 contrast, keyboard reachable with a visible focus ring.

#### Test plan
- `app/integration_test/web/eviction_recovery_test.dart` — clear site data, reload, restore, byte-for-byte verification.
- `app/integration_test/web/restore_resume_test.dart` — interrupted restore resumes without duplication.
- `app/integration_test/web/restore_without_key_test.dart` — fail-closed behaviour on a fresh browser with no key.
- `app/test/web/unsynced_warning_test.dart` — asserts the durability warning precedes any at-risk state.
- Manual protocol in `tools/device_lab/web-matrix.md`: WebKit 7-day ITP eviction on iPadOS Safari, recorded each release.

#### Dependencies
[SN-WEB-009](storage.md#sn-web-009), [SN-WEB-019](sync.md#sn-web-019); harness from [SN-WEB-023](qa.md#sn-web-023).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/platform/web.md §12 and the release checklist updated with the protocol
- [ ] Reviewed against docs/security/secure-coding-checklist.md §3

---

