# Backlog — area: sync

35 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-SYNC-001](sync.md#sn-sync-001) **Build sane_sync engine and user-cloud-drive adapters** (epic · M4 Identity, Sync & Privacy)
  - [SN-SYNC-002](sync.md#sn-sync-002) **Implement sync-store layout writer and reader** · p0 · feature · L · M4 Identity, Sync & Privacy
  - [SN-SYNC-003](sync.md#sn-sync-003) **Implement iCloud Drive cloud-drive adapter** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-SYNC-004](sync.md#sn-sync-004) **Implement Google Drive REST v3 cloud-drive adapter** · p1 · feature · L · M4 Identity, Sync & Privacy
    - [SN-SYNC-008](sync.md#sn-sync-008) **Implement Google Drive incremental change polling** · p1 · feature · M · M4 Identity, Sync & Privacy
    - [SN-SYNC-009](sync.md#sn-sync-009) **Add optional content-free Drive push notifier** · p3 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-005](sync.md#sn-sync-005) **Define CloudDriveAdapter interface and in-memory fake** · p1 · task · S · M4 Identity, Sync & Privacy
  - [SN-SYNC-006](sync.md#sn-sync-006) **Implement the sync reconciliation state machine** · p0 · feature · L · M4 Identity, Sync & Privacy
    - [SN-SYNC-007](sync.md#sn-sync-007) **Add change-detection scheduling with backoff and jitter** · p1 · task · S · M4 Identity, Sync & Privacy
    - [SN-SYNC-011](sync.md#sn-sync-011) **Implement lazy attachment-blob sync with LRU cache** · p1 · feature · M · M4 Identity, Sync & Privacy
      - [SN-SYNC-012](sync.md#sn-sync-012) **Add resumable transfers for large attachment uploads** · p2 · feature · M · M4 Identity, Sync & Privacy
    - [SN-SYNC-015](sync.md#sn-sync-015) **Implement lease-coordinated snapshot compaction** · p1 · task · M · M4 Identity, Sync & Privacy
    - [SN-SYNC-016](sync.md#sn-sync-016) **Implement returning-device catch-up and op-log replay** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-010](sync.md#sn-sync-010) **Implement Storage Access Framework backend-less adapter** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-013](sync.md#sn-sync-013) **Implement integrity verification of synced members** · p0 · security · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-014](sync.md#sn-sync-014) **Implement silent snapshot-conflict resolution** · p0 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-017](sync.md#sn-sync-017) **Implement multi-device pairing and key acquisition** · p0 · feature · L · M4 Identity, Sync & Privacy
    - [SN-SYNC-018](sync.md#sn-sync-018) **Build the multi-device management and revocation screen** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-019](sync.md#sn-sync-019) **Wire auto-sync, Wi-Fi-only and provider-choice preferences** · p0 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-020](sync.md#sn-sync-020) **Build sync status UI and recoverable error states** · p1 · design · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-021](sync.md#sn-sync-021) **Implement drive-quota handling and sync soft cap** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-022](sync.md#sn-sync-022) **Handle provider auth expiry and re-authentication** · p1 · feature · S · M4 Identity, Sync & Privacy
  - [SN-SYNC-023](sync.md#sn-sync-023) **Implement version history browse and restore from snapshots** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SYNC-024](sync.md#sn-sync-024) **Enforce metadata minimisation and size padding** · p1 · security · S · M4 Identity, Sync & Privacy
  - [SN-SYNC-025](sync.md#sn-sync-025) **Build sync soak and chaos test harness** · p1 · test · L · M7 Beta Hardening & Security Audit
  - [SN-SYNC-026](sync.md#sn-sync-026) **Verify offline-first guarantees under all sync states** · p0 · test · S · M4 Identity, Sync & Privacy
  - [SN-GUX-010](sync.md#sn-gux-010) **Implement the cloud-only action degradation and queue pattern** · p2 · feature · M · M4 Identity, Sync & Privacy

---

## Issues

### SN-CORE-003

<a id="sn-core-003"></a>

**Implement add-wins set, LWW registers and HLC clocks**

| Field | Value |
|---|---|
| GitHub | #179 |
| Type | feature |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | sync, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-006](storage.md#sn-core-006) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-RESILIENCE-3`, `OWASP-A04`, `ASVS-V11`, `CWE-190`, `CWE-367` |
| Extra labels | agent-ready, innovation |

#### Context
Three of the four CRDT primitives underpin every mergeable field in Sane Notes: the **add-wins Unique Set (OR-Set)** for object/tree membership and ink strokes, **LWW registers/LWW-maps** for every mutable scalar, and the **Hybrid Logical Clock (HLC)** that gives a deterministic total order for LWW tie-breaking and human-ordered history. They are specified normatively in [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §3–§4.1/§4.4 and [ADR-0005](docs/adr/0005-document-model-and-crdt.md). Correctness here is data-integrity-critical (a wrong merge silently loses a user's stroke or clobbers an unrelated edit), hence p0. This issue is the dependency other areas reference for "CRDT semantics".

#### Scope
**In:** `Hlc(physicalMs, logical, deviceId)` with the normative local/receive update algorithm, the 60 s clock-skew clamp, strict `compareTo` total order and the 8-byte `(physicalMs<<16|logical)` packing; the `OrSet<T>` observed-remove (add-tags = adding op's Hlc; concurrent add-vs-remove → add wins); the `LwwRegister<T>` and `LwwMap<K,V>` (add-wins keys + LWW values). The independence rule enforced by using separate registers.
**Out:** movable list/tree ([SN-CORE-008](sync.md#sn-core-008)), Peritext ([SN-CORE-009](sync.md#sn-core-009)), the op-log/op registry ([SN-CORE-010](sync.md#sn-core-010)), and durable storage.

#### Acceptance criteria
- [ ] `Hlc.compareTo` is a strict total order (physicalMs, then logical, then deviceId); ties are impossible after the deviceId tiebreak.
- [ ] The receive algorithm matches document-model §3.3 exactly; a received stamp with `physicalMs > now()+60s` is clamped to `now()+60s` and an anomaly is logged (no content) — verified by a "year-2099 peer" test that shows it cannot win every LWW forever.
- [ ] `logical` overflow past 16 bits borrows into `physicalMs` (CWE-190 guard) and stays monotone.
- [ ] `OrSet`: concurrent add (device A) vs observed-remove (device B) converges to **present** on both replicas; a remove only affects add-instances it observed; convergence, commutativity and idempotence hold under randomised delivery order.
- [ ] `LwwRegister`: greatest-Hlc write wins deterministically; two independent registers (`x`, `y`) both survive concurrent unrelated writes.

#### Technical notes
`packages/sane_core/lib/src/crdt/hlc.dart`, `or_set.dart`, `lww.dart`. Pure Dart; depends on [SN-CORE-006](storage.md#sn-core-006) (DeviceId). Keep per-element add-tags bounded — do not retain every tag forever; GC eligibility (once causally stable) is handled by [SN-CORE-018](storage.md#sn-core-018)/[SN-CORE-020](storage.md#sn-core-020). Feeds [SN-CORE-010](sync.md#sn-core-010) (ops carry Hlc) and [SN-CORE-024](qa.md#sn-core-024) (harness). Implements PRD-SYNC-010 (add-wins object set + LWW + HLC tie-break) and the clock-skew threat in ADR-0005.

#### Security & privacy
Threats: **Clock-skew LWW hijack** (a device stamping the far future wins every LWW — ADR-0005 Threats) mitigated by the 60 s clamp + anomaly log; integer overflow (CWE-190) in the logical counter; time-of-check/use races on the clock (CWE-367) mitigated by reading `now()` once per event. Controls: deterministic total order so replicas cannot silently diverge (MASVS-RESILIENCE-3), no content/clock values that identify a user in logs. OWASP-A04, ASVS V11.

#### UX notes
No direct UI. HLC drives the human-readable version-history timeline and "latest edit wins" intuition; the skew clamp prevents a mis-set device clock from corrupting order. Baseline: anomaly logs carry a counter/device-hash only, never wall-clock content.

#### Test plan
`packages/sane_core/test/crdt/hlc_test.dart` (total order, receive algorithm vectors, skew clamp, overflow), `or_set_test.dart` (add-wins, observed-remove, idempotence/commutativity), `lww_test.dart` (greatest-Hlc, independence). Property tests are extended in [SN-CORE-024](qa.md#sn-core-024).

#### Dependencies
[SN-CORE-006](storage.md#sn-core-006).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-008

<a id="sn-core-008"></a>

**Implement movable-tree and movable-list CRDT with fractional indexing**

| Field | Value |
|---|---|
| GitHub | #183 |
| Type | feature |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | sync, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-006](storage.md#sn-core-006) |
| Security controls | `MASVS-RESILIENCE-3`, `OWASP-A04`, `ASVS-V11`, `CWE-674` |
| Extra labels | agent-ready, innovation |

#### Context
Ordering and re-parenting — the Notebook→Page tree, Layer z-order, block order, table rows/columns — need a CRDT that keeps concurrent moves and edits both alive and never produces a broken/empty reference (the failure mode Yjs's delete+insert reordering suffers). [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §4.3 and [ADR-0005](docs/adr/0005-document-model-and-crdt.md) specify a **fractional-index position register** for lists and the proven cycle-avoidance move rule from *A Highly-Available Move Operation for Replicated Trees* for the tree. This is what makes reordering pages and moving notebooks instant and conflict-free.

#### Scope
**In:** `FracIndex` (a lexicographically-orderable base-62/95 string key with `between(lo, hi, tiebreak)`, ported from the JS `fractional-indexing` reference), the movable-list built on an LWW position register per element, and the movable-tree (`moveNode(node, newParent, pos)` with LWW-by-Hlc parent register + fold-time cycle detection that undoes the lower-Hlc move of any cycle).
**Out:** the op encodings (`moveObject`/`moveNode`/`blockOp` framing) which live in [SN-CORE-010](sync.md#sn-core-010); the library/page UI.

#### Acceptance criteria
- [ ] `FracIndex.between` always returns a key strictly ordered between its neighbours; two concurrent inserts into the same gap produce two distinct keys that sort deterministically (tiebreak by `Hlc.device`) and converge.
- [ ] A move changes only the position/parent register, so a concurrent move + content edit on the same node both survive.
- [ ] Concurrent move-cycle (A moves X under Y while B moves Y under X) is detected at fold time and resolved by undoing the **lower-Hlc** move; the result is a valid acyclic tree, identical on both replicas (CWE-674 unbounded/cyclic structure prevented).
- [ ] Reordering N=1,000 siblings with random concurrent moves converges with no lost or duplicated nodes and no empty references.
- [ ] Fold is deterministic: same op-set in any delivery order yields the same tree.

#### Technical notes
`packages/sane_core/lib/src/crdt/frac_index.dart`, `movable_list.dart`, `movable_tree.dart`. Port the fractional-indexing algorithm (no canonical Dart package — confirm in [SN-CORE-013](storage.md#sn-core-013), else vendor). Depends on [SN-CORE-003](sync.md#sn-core-003) (LWW/Hlc) and [SN-CORE-006](storage.md#sn-core-006). Do not invent a cycle-avoidance variant — implement the referenced algorithm. Feeds the Library doc structure and PRD-LB-142 (page operations), PRD-SYNC-010. Table row/col reorder ([SN-CORE-002](storage.md#sn-core-002) Table) reuses the movable-list.

#### Security & privacy
Threats: move-cycle corruption / infinite recursion during traversal (CWE-674) and silent divergence (MASVS-RESILIENCE-3). Controls: deterministic cycle resolution by Hlc, depth-bounded traversal, convergence property tests. OWASP-A04 (insecure design avoided by using the proven algorithm), ASVS V11. No content in logs.

#### UX notes
No direct UI, but this is what makes dragging to reorder pages and re-nesting notebooks feel instant and never lose a page ([`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md) Library). Two people reordering the same list offline then syncing see a stable, sensible order. Baseline: no PII in logs.

#### Test plan
`packages/sane_core/test/crdt/frac_index_test.dart` (ordering, between, tiebreak), `movable_list_test.dart`, `movable_tree_test.dart` (cycle resolution, concurrent moves, determinism). Convergence extended in [SN-CORE-024](qa.md#sn-core-024).

#### Dependencies
[SN-CORE-003](sync.md#sn-core-003), [SN-CORE-006](storage.md#sn-core-006).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-009

<a id="sn-core-009"></a>

**Implement Peritext-style rich-text sequence CRDT**

| Field | Value |
|---|---|
| GitHub | #184 |
| Type | feature |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | sync, text |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-006](storage.md#sn-core-006) |
| Security controls | `MASVS-RESILIENCE-3`, `OWASP-A04`, `ASVS-V11`, `CWE-707` |
| Extra labels | agent-ready, innovation |

#### Context
Typed rich text (TextBlock content, table-cell text) needs a sequence CRDT that interleaves concurrent inserts deterministically and resolves formatting overlaps without the classic link-expansion or red-vs-blue bugs. [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §4.2 and [ADR-0005](docs/adr/0005-document-model-and-crdt.md) specify implementing the **Peritext** model directly in Dart (rather than depending on Yjs's control-character text model, which has known overlap anomalies), covering inline formatting only; block structure lives in the movable-list ([SN-CORE-008](sync.md#sn-core-008)).

#### Scope
**In:** a character sequence CRDT (RGA/Fugue-style causal tree; each char has a stable `opId = Hlc`) with `insert`/`delete` (per-character tombstone); `addMark`/`removeMark` span ops anchored `before` (grows) or `after` (fixed) per `MarkType`, with a mark registry fixing the growth per type (bold/italic → grows; link/comment → fixed); merge = apply all ops in `opId` order, marks commutative, incompatible overlaps resolved LWW-on-opId; `render()` to materialised `PlainSpans` for the editor.
**Out:** the editor widget/text tool (PRD-ED text group, other area), block structure (headings/lists/tables), inline-object anchoring (deferred to the editor spike; document-model §11 leans "special character"), and the text-stack adapter that binds this CRDT to TextBlock.content and materialises editor runs - that consumer/integration work is owned by [SN-TXT-002](text.md#sn-txt-002).

#### Acceptance criteria
- [ ] Concurrent inserts at the same position interleave deterministically (Fugue-style, minimising the interleaving anomaly) and converge on both replicas.
- [ ] Typing at the end of a **bold** run stays bold (before-anchored), while text appended after a **link** is not part of the link (after-anchored) — the link-expansion bug is absent.
- [ ] Incompatible overlapping marks (red vs blue) resolve by LWW-on-opId identically on all replicas; compatible marks (bold+italic) coexist.
- [ ] Delete is a tombstone (no destructive erase); undo restores exact prior text; convergence/commutativity/idempotence hold under randomised op order.
- [ ] `render()` output matches a reference for a fixed op script; scope is inline-only (a block op is rejected/ignored here).

#### Technical notes
`packages/sane_core/lib/src/crdt/rich_text/` (`rich_text_crdt.dart`, `mark_registry.dart`, `fugue_tree.dart`). Depends on [SN-CORE-003](sync.md#sn-core-003) (Hlc) and [SN-CORE-006](storage.md#sn-core-006). `y_crdt` is an acceptable *plain-text* stopgap only, with the anomaly risk documented ([SN-CORE-013](storage.md#sn-core-013) verifies its health); the rich model is implemented directly. Automerge/Loro via flutter_rust_bridge are the sanctioned Rust-core upgrade path. Feeds PRD-01 text tool and search indexing.

#### Security & privacy
Threats: malformed/adversarial op scripts causing divergence or unbounded memory (CWE-707 improper neutralization / resource exhaustion) on import; silent divergence (MASVS-RESILIENCE-3). Controls: bound tombstone growth (GC when causally stable via [SN-CORE-020](storage.md#sn-core-020)), validate op structure, deterministic merge. No note text ever logged. OWASP-A04, ASVS V11.

#### UX notes
Backs the typed-text and markdown-on-type experience (PRD-ED-179); correct anchoring is what makes formatting feel predictable while co-editing. No direct UI here; the editor renders `PlainSpans`. Baseline: no text content in logs.

#### Test plan
`packages/sane_core/test/crdt/rich_text/interleave_test.dart`, `marks_test.dart` (anchor growth, overlap LWW), `convergence_richtext_test.dart`. Golden-ish `render()` fixtures in `render_spans_test.dart`. Extended in [SN-CORE-024](qa.md#sn-core-024).

#### Dependencies
[SN-CORE-003](sync.md#sn-core-003), [SN-CORE-006](storage.md#sn-core-006).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-010

<a id="sn-core-010"></a>

**Implement operation model, op-log and op-type registry**

| Field | Value |
|---|---|
| GitHub | #185 |
| Type | feature |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | sync, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-006](storage.md#sn-core-006), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-RESILIENCE-3`, `OWASP-A08`, `ASVS-V11`, `CWE-502` |
| Extra labels | agent-ready, innovation |

#### Context
Every mutation in Sane Notes is an **operation** appended to a per-device, single-writer, append-only op-log; in-memory objects and on-disk snapshots are materialised views of `fold(merge(all op-logs))`. This substrate is what makes conflict-free file sync possible. [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §2 defines the `Op` shape and the v1 `OpType` registry with its stable integer tags and the forward-compat discipline for unknown tags. Because the op-log is the source of truth, corruption or a dropped op is data loss — hence p0.

#### Scope
**In:** the immutable `Op {hlc, type, target, field?, value?, deps?}`; the `OpType` registry (createObject, deleteObject, setAttr, moveObject, createNode, moveNode, deleteNode, textInsert, textDelete, addMark, removeMark, blockOp, setKeyMeta) each with a stable integer tag; the append-only in-memory op-log with HLC-ordered read and a `fold`/apply engine that dispatches each op to the right CRDT ([SN-CORE-003](sync.md#sn-core-003)/[SN-CORE-008](sync.md#sn-core-008)/[SN-CORE-009](sync.md#sn-core-009)); the unknown-op-tag forward-compat rule (preserve verbatim, refuse to compact, surface "update required").
**Out:** on-disk segment framing ([SN-CORE-016](storage.md#sn-core-016)), snapshotting ([SN-CORE-015](storage.md#sn-core-015)), encryption/sync, and the per-device watermark storage ([SN-CORE-012](storage.md#sn-core-012) interface / [SN-CORE-004](storage.md#sn-core-004) impl).

#### Acceptance criteria
- [ ] An `Op` is immutable and CBOR-serialises/deserialises losslessly, including an empty `deps` in the common path.
- [ ] Each `OpType` has a fixed integer tag; a test asserts tags are unique and never reused (append-only registry).
- [ ] `fold` applied to a set of ops in any delivery order yields identical state (determinism), and re-applying an already-applied op is a no-op (idempotence).
- [ ] An op with an **unknown** integer tag is preserved verbatim, blocks compaction, and raises an "update required to safely edit" signal — it is never silently skipped (document-model §2.3).
- [ ] Committing a stroke produces exactly the two ops described in document-model §10 (createObject + layer set-add), each with a fresh Hlc.

#### Technical notes
`packages/sane_core/lib/src/oplog/op.dart`, `op_type.dart`, `op_log.dart`, `fold.dart`. Depends on [SN-CORE-003](sync.md#sn-core-003) (Hlc + CRDTs), [SN-CORE-006](storage.md#sn-core-006), [SN-CORE-002](storage.md#sn-core-002). Ops are content-addressable but two "same" logical ops from two devices produce distinct records (distinct Hlc) — merge dedups by effect, not record identity. Implements PRD-SYNC-004 (op-log as sync unit) and PRD-SYNC-010. Persisted via [SN-CORE-016](storage.md#sn-core-016); watermark vector per document-model §2.4.

#### Security & privacy
Threats: **Unknown-op-type data loss** across app versions (mitigated by the preserve/refuse-compact/prompt discipline); untrusted op deserialization from a remote segment (CWE-502) — validate tag/shape before apply, cap value sizes; forged ops from a revoked device (attribution by DeviceId, signature verification is SN-CRY-002/ADR-0007, referenced not implemented here). MASVS-STORAGE-1, MASVS-RESILIENCE-3, OWASP-A08, ASVS V11. No op values/content logged.

#### UX notes
No direct UI. The "update required to safely edit" state must be surfaceable as a non-destructive banner (never drop the user's data). Baseline: op payloads never logged.

#### Test plan
`packages/sane_core/test/oplog/op_roundtrip_test.dart`, `op_registry_test.dart` (unique tags), `fold_test.dart` (determinism, idempotence), `unknown_op_test.dart` (preserve + block compaction + signal). Extended in [SN-CORE-024](qa.md#sn-core-024).

#### Dependencies
[SN-CORE-003](sync.md#sn-core-003), [SN-CORE-006](storage.md#sn-core-006), [SN-CORE-002](storage.md#sn-core-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CORE-019

<a id="sn-core-019"></a>

**Implement ink erase CRDT semantics**

| Field | Value |
|---|---|
| GitHub | #194 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | sync, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-RESILIENCE-3`, `OWASP-A04`, `ASVS-V11`, `CWE-707` |
| Extra labels | agent-ready, innovation |

#### Context
Erase is the most-noticed correctness surface in a pen app, and [`docs/architecture/document-model.md`](docs/architecture/document-model.md) §5 specifies both erase modes without ever mutating a stroke's immutable geometry. Object-erase must be add-wins (a stroke another device is still drawing must not vanish because you erased near it), and pixel/segment-erase must be expressed as delete + create-fragments so it merges cleanly and undo simply reverses the ops. This is the model half of the eraser tool; the UI/gesture half is an editor issue.

#### Scope
**In:** the model-layer erase operations: object-erase = `deleteObject(strokeId)` → observed-remove from the layer OR-Set (add-wins); segment/pixel-erase = tombstone the original stroke + `createObject` one or two new fragment strokes referencing new geometry blobs (the geometric split is deterministic and local); coalescing rapid erases into one op batch before commit; `Stroke.erased` LWW as a fast-path soft-hide before compaction folds it into the set removal (set membership is authoritative).
**Out:** the eraser tool UI/gesture and hit-testing (editor area), the stroke geometry split math itself (belongs to sane_ink; here it consumes `InkSample[]` fragments), and rendering.

#### Acceptance criteria
- [ ] Concurrent redraw (device A) vs object-erase (device B) of the same stroke converges to the stroke **present** (add-wins), proven by a two-replica test.
- [ ] Segment-erase never mutates the original geometry blob: the original is tombstoned and 1–2 new fragment strokes with new `geometryRef`s are created; the original blob bytes are unchanged.
- [ ] Undo of a segment-erase reverses exactly the three ops (delete + up to two creates), restoring the original stroke.
- [ ] Rapid erasing coalesces into one op batch (not one op per sample) to bound churn; a stress test erases across a 5,000-point stroke and asserts a bounded op count.
- [ ] `Stroke.erased=true` hides the stroke immediately but the authoritative removal is the OR-Set; after compaction the soft-hide flag is folded away.

#### Technical notes
`packages/sane_core/lib/src/erase/erase_ops.dart`. Depends on [SN-CORE-003](sync.md#sn-core-003) (OR-Set/LWW), [SN-CORE-010](sync.md#sn-core-010) (ops), [SN-CORE-002](storage.md#sn-core-002) (Stroke). Fragment geometry blobs are written via the blob store ([SN-CORE-014](storage.md#sn-core-014)); the split consumes fragment `InkSample[]` produced by sane_ink (SN-INK-001) — this issue defines the op sequence, not the geometry math. Ties into undo/redo (SN-ED-003) which is op-log-backed. Implements document-model §5.

#### Security & privacy
Threats: erase-driven op churn causing resource exhaustion (CWE-707) on huge strokes; divergence if erase were expressed as geometry mutation (MASVS-RESILIENCE-3). Controls: immutable-geometry invariant, op batching/coalescing, add-wins convergence tests. OWASP-A04, ASVS V11. No ink coordinates logged.

#### UX notes
Backs both the object eraser and the pixel eraser tools ([`docs/design/screens-and-flows.md`](docs/design/screens-and-flows.md) editor palette; PRD-ED eraser group). The felt result: erasing part of a stroke leaves clean fragments, and a stroke someone else is mid-drawing never disappears. No direct UI here. Baseline: no coordinates in logs.

#### Test plan
`packages/sane_core/test/erase/object_erase_test.dart` (add-wins convergence), `segment_erase_test.dart` (immutable geometry, fragment creation, undo reversal), `erase_coalesce_test.dart` (bounded op count). Convergence extended in [SN-CORE-024](qa.md#sn-core-024).

#### Dependencies
[SN-CORE-003](sync.md#sn-core-003), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-002](storage.md#sn-core-002). Fragment blobs use [SN-CORE-014](storage.md#sn-core-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-009

<a id="sn-gand-009"></a>

**Schedule Android background sync under Doze, standby buckets and Data Saver**

| Field | Value |
|---|---|
| GitHub | #569 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | android-tablet, android-phone |
| Areas | sync, compat, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-SYNC-007](sync.md#sn-sync-007), [SN-SYNC-019](sync.md#sn-sync-019), [SN-AND-023](audio.md#sn-and-023) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `CWE-400` |
| Extra labels | — |

#### Context
`docs/platform/compatibility-matrix.md` §6 promises **background sync: ✅ SyncAdapter** on Android — one of the few rows where Android beats iPad and web, and a direct answer to the "manual sync = the #1 data-loss complaint" finding in `docs/research/sources/samsung-notes-nebo-other.md`. But [SN-SYNC-007](sync.md#sn-sync-007) only defines change-detection scheduling with backoff and jitter at the engine level, and [SN-AND-023](audio.md#sn-and-023) is about the **recording** foreground service. No issue owns the Android job-scheduling reality: Doze and App Standby buckets defer jobs and cut network for idle apps; Data Saver and metered networks restrict background traffic; Android 14+ requires a declared foreground-service type with justification; and Android 15 puts a running-time ceiling on `dataSync` services, pushing long uploads towards user-initiated data-transfer jobs. Without this, sync either silently stops on the devices students actually own or drains the battery and trips Play's excessive-background-work vitals.

#### Scope
**In:** an Android scheduling adapter behind the existing sync scheduler ([SN-SYNC-007](sync.md#sn-sync-007)) built on WorkManager: periodic sync with network + battery constraints, expedited work on user-visible change, exponential backoff on failure, and deduplicated unique work; honouring the Wi-Fi-only and auto-sync preferences ([SN-SYNC-019](sync.md#sn-sync-019)) through WorkManager constraints rather than ad-hoc checks; Data Saver / metered-network detection and behaviour; a foreground path for large attachment uploads ([SN-SYNC-012](sync.md#sn-sync-012)) using the correct service type, with the Android 15 duration ceiling handled by chunking/resuming rather than by holding a service open; standby-bucket-aware expectations documented so "sync ran 4 hours later" is understood, not treated as a bug.
**Out:** the reconciliation state machine ([SN-SYNC-006](sync.md#sn-sync-006)); Drive change polling ([SN-SYNC-008](sync.md#sn-sync-008)); the recording foreground service ([SN-AND-023](audio.md#sn-and-023)); OEM-specific power management ([SN-GAND-010](compat.md#sn-gand-010)); notification UX ([SN-NOTF-002](notifications.md#sn-notf-002)).

#### Acceptance criteria
- [ ] Sync runs on a periodic WorkManager job with `NetworkType.CONNECTED` (or `UNMETERED` when Wi-Fi-only is on) and a battery-not-low constraint; the job is unique and never queues duplicates across app restarts.
- [ ] Editing a note schedules expedited work so the change reaches the user's Drive promptly while the app is foreground, and falls back to the periodic job when quota is exhausted.
- [ ] With Data Saver enabled and the app in the background, no metered sync traffic occurs; the sync-status UI ([SN-SYNC-020](sync.md#sn-sync-020)) explains why and offers "sync now" in the foreground.
- [ ] A large attachment upload survives being backgrounded: it either completes under the declared foreground-service type or checkpoints and resumes ([SN-SYNC-012](sync.md#sn-sync-012)), and never exceeds the platform's allowed run time.
- [ ] In Doze (verified with `adb shell dumpsys deviceidle force-idle`) queued work survives and runs at the next maintenance window; no work is lost.
- [ ] Battery cost of a day of idle background sync stays inside the energy protocol in [SN-PERF-013](perf.md#sn-perf-013); no wake-lock is held outside an active transfer (CWE-400).
- [ ] Manifest declares only the foreground-service types actually used, each with a justification recorded for Play ([SN-AND-026](release.md#sn-and-026)).

#### Technical notes
Kotlin `androidx.work` in `app/android` exposed to Dart through the sync plugin surface; `setExpedited(OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST)`; `Constraints.Builder().setRequiredNetworkType(...)`; unique work via `enqueueUniquePeriodicWork(KEEP)`. Metered state from `ConnectivityManager.NetworkCapabilities` + `isActiveNetworkMetered`/restrict-background status. `SyncAdapter` is named in `docs/platform/android.md` §2 but WorkManager is the current-generation mechanism — record the substitution in the doc **(verify)** so the matrix stays truthful. Work must not do crypto or I/O on the main thread; it calls into the existing sync isolate ([SN-SYNC-006](sync.md#sn-sync-006)).

#### Security & privacy
Background jobs must not weaken the zero-knowledge model: only ciphertext leaves the device ([SN-CRY-006](security.md#sn-cry-006)), TLS and pinning apply ([SN-SEC-022](security.md#sn-sec-022)), and job inputs carry ids only — never note content, titles or keys (WorkManager input data is stored in an app-private database but is still at-rest state; MASVS-PRIVACY-1, MASVS-STORAGE-1). Failure logs are redacted ([SN-SEC-021](security.md#sn-sec-021)). Metadata minimisation per [SN-SYNC-024](sync.md#sn-sync-024): no sync-timing beacons to anything but the user's own drive.

#### UX notes
Sync status strings follow [SN-SYNC-020](sync.md#sn-sync-020): "Waiting for Wi-Fi", "Paused by Data Saver", "Syncing 3 of 12". Never show a scary error for a deferred job — deferral is normal Android behaviour. Settings → Sync & backup ([SN-SET-006](settings.md#sn-set-006)) explains the battery-friendly behaviour in one sentence.

#### Test plan
Unit tests for the constraint mapping from preferences. Instrumented tests with `WorkManagerTestInitHelper` driving periodic/expedited paths and backoff. Manual/adb: force-idle Doze, toggle Data Saver, restrict background data, and verify behaviour on the 4 GB reference device. Soak: one day of idle sync measured with [SN-PERF-013](perf.md#sn-perf-013). Files: `app/android/.../SyncWorker.kt`, `app/test/sync/android_schedule_constraints_test.dart`.

#### Dependencies
[SN-SYNC-007](sync.md#sn-sync-007), [SN-SYNC-019](sync.md#sn-sync-019), [SN-AND-023](audio.md#sn-and-023)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-006

<a id="sn-gipad-006"></a>

**Support Handoff continuity of the open note across the user's Apple devices**

| Field | Value |
|---|---|
| GitHub | #980 |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | sync, notifications, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-014](notifications.md#sn-ipad-014), [SN-SEC-011](security.md#sn-sec-011), [SN-NOTF-004](notifications.md#sn-notf-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Apple Notes' quiet advantage is Continuity: start on iPad, pick up on iPhone from the App Switcher without hunting. Sane Notes already creates `NSUserActivity` objects for Quick Note linking ([SN-IPAD-014](notifications.md#sn-ipad-014)) and App Intents ([SN-IPAD-015](notifications.md#sn-ipad-015)), but nothing marks them **Handoff-eligible** or handles an incoming activity on the receiving device, so the feature is one small step away and currently missing from the backlog. This is a cheap parity win on the surface where our competitor is strongest, and it composes with the iPhone shell ([SN-PHN-003](design-system.md#sn-phn-003)).

#### Scope
**In:** marking the editor's current-note `NSUserActivity` with `isEligibleForHandoff = true`, a stable activity type, a title, and a **content-free** `userInfo` carrying only opaque object identifiers plus a viewport hint (page index, scroll offset, zoom); continuation on the receiving device (`application(_:continue:restorationHandler:)`) routed through the deep-link allow-list ([SN-SEC-011](security.md#sn-sec-011)); resuming into the correct profile, or prompting to switch; graceful handling when the note is not present locally yet (wait for [SN-SYNC-016](sync.md#sn-sync-016) catch-up with a progress state) or is locked (land on the unlock screen); an opt-out in Settings.
**Out:** Universal Clipboard (OS-level, no work); Handoff to a Mac client (no Mac surface yet); AirDrop of `.sanenote` files ([SN-SHR-010](sharing-export.md#sn-shr-010)); sync itself.

#### Acceptance criteria
- [ ] With the same iCloud account on two devices, opening a notebook on the iPad surfaces the Handoff affordance on the iPhone within a few seconds; accepting it opens the same notebook at the same page.
- [ ] `userInfo` is asserted by test to contain no title, no body text, no transcript and no file path — identifiers and integers only.
- [ ] Continuing into a locked notebook shows the unlock gate; continuing into another profile prompts a profile switch; continuing into content that does not exist locally shows a "fetching from your cloud" state and completes or fails cleanly.
- [ ] A malformed or hostile activity payload (unknown type, oversized userInfo, unexpected keys, id for another profile) is rejected without navigation and without a crash (fuzz test).
- [ ] Settings → Privacy & export exposes "Continue on other devices" (default on) and turning it off stops publishing activities immediately.
- [ ] Guest-mode content never publishes a Handoff activity.

#### Technical notes
Own the activity in the editor route so it updates on page change and is invalidated on close. Keep one activity type constant shared with [SN-NOTF-004](notifications.md#sn-notf-004)'s route table so all entry points resolve identically. Do not use `requiredUserInfoKeys` to smuggle content. On the receiving side, reuse the router rather than adding a second navigation path.

#### Security & privacy
Handoff payloads traverse the user's iCloud/Bluetooth continuity channel and are outside our E2EE boundary — hence identifiers only (MASVS-PRIVACY-1, CWE-200 avoidance). Incoming activities are untrusted input from another process: validate type, shape and ownership before acting (MASVS-PLATFORM-1, CWE-20), and never auto-mutate — continuation opens a view, never performs a write ([SN-IPAD-020](security.md#sn-ipad-020) rule).

#### UX notes
Follow the platform affordance exactly; no custom banner. The receiving screen must not flash content before the lock gate. If the note cannot be resolved, show the library with an inline toast ("That note isn't on this device yet"), never an error dialog.

#### Test plan
Unit: `app/test/handoff_activity_test.dart` (payload shape, redaction assertions, invalidation on close), `handoff_continue_test.dart` (router validation, malformed payloads). Integration: `integration_test/handoff_test.dart` with a stubbed continuation on one device; manual two-device check on the Tier 1 lab per docs/platform/ipad.md §11.

#### Dependencies
[SN-IPAD-014](notifications.md#sn-ipad-014), [SN-SEC-011](security.md#sn-sec-011), [SN-NOTF-004](notifications.md#sn-notf-004).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GUX-010

<a id="sn-gux-010"></a>

**Implement the cloud-only action degradation and queue pattern**

| Field | Value |
|---|---|
| GitHub | #1049 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, design-system, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-DS-019](design-system.md#sn-ds-019), [SN-SYNC-020](sync.md#sn-sync-020) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-AUTH-2`, `MASVS-NETWORK-1` |
| Extra labels | agent-ready |

#### Context

`docs/design/ux-principles.md` §4.4 sets the rule for anything that genuinely needs a network: "Cloud-only actions degrade gracefully. If a feature needs the network (real-time collaboration, cloud AI opt-in, share-link creation), it shows a plain, temporary 'Needs a connection — we'll do it when you're back online' and queues where it can." [SN-SYNC-020](sync.md#sn-sync-020) covers the *ambient* sync status (upToDate, syncing, pendingUpload, offline, driveFull, authNeeded …), but nothing implements the pattern for **one-shot user-initiated cloud actions**: creating or rotating a share link ([SN-SHR-013](sharing-export.md#sn-shr-013), [SN-SHR-017](sharing-export.md#sn-shr-017)), sending an invite ([SN-SHR-016](sharing-export.md#sn-shr-016)), joining a collaboration room ([SN-COL-009](collaboration.md#sn-col-009)), an opted-in cloud inference request ([SN-AI-019](ai.md#sn-ai-019)), student verification ([SN-BILL-015](billing.md#sn-bill-015)), purchase and restore ([SN-BILL-004](billing.md#sn-bill-004)). Today each of those would fail its own way — most likely a spinner that never resolves, which is the exact failure the local-first design is meant to make impossible.

#### Scope

**In:** a shared `NetworkGatedAction` helper plus the UI convention that uses it — a capability/connectivity probe; on failure either (a) **queue**: enqueue into a durable, per-profile action queue with a visible pending state, exponential backoff with jitter, an idempotency key, a cancel affordance and an on-success toast, or (b) **live-only**: keep the control enabled, show the canonical toast, and do not pretend to queue; a registry declaring for each cloud action which mode it uses and why; consistent copy from the copy deck; assistive-technology announcements for enqueue, retry and completion; and the guarantee that nothing on this path can block note-taking.

**Out:** the sync engine and its status UI ([SN-SYNC-006](sync.md#sn-sync-006), [SN-SYNC-020](sync.md#sn-sync-020)), the per-feature network calls themselves, attachment transfer resumption ([SN-SYNC-012](sync.md#sn-sync-012)), and telemetry.

#### Acceptance criteria

- [ ] Each cloud action in the registry declares queueable or live-only with a recorded reason; a new cloud action without a registry entry fails a lint/test.
- [ ] In airplane mode, every registered action produces the canonical "Needs a connection" toast within 300 ms — never an indefinite spinner and never a silent no-op.
- [ ] A queued action survives app restart, replays exactly once on reconnect (idempotency key honoured), and can be cancelled from the pending state.
- [ ] Retry uses backoff with jitter and stops after a documented ceiling, surfacing a final, actionable state rather than looping.
- [ ] Note-taking is never blocked: an integration test writes strokes continuously while three actions are queued and asserts no frame regression and no modal.
- [ ] Sign-out and profile deletion purge the queue; a queued action for profile A never executes under profile B.

#### Technical notes

Live in `sane_sync` (or a thin `sane_core` service consumed by `app/`) so it is usable from sharing, collaboration, billing and AI without a dependency inversion; the UI half is a small `SaneSurface`-based pending row plus `SaneToast` from [SN-DS-019](design-system.md#sn-ds-019). Persist the queue in the encrypted local store with the same per-profile isolation as [SN-AUTH-013](auth.md#sn-auth-013). Connectivity must be treated as a hint, not a truth — attempt and fail fast rather than trusting a reachability API.

#### Security & privacy

The queue is a durable store of user intent and must not become a plaintext secrets cache: payloads are wrapped with the profile/items key ([SN-CRY-002](security.md#sn-cry-002), [SN-CRY-007](security.md#sn-cry-007)) and never contain bearer tokens — re-acquire credentials at send time. Replay must be idempotent so a retry cannot double-invite or double-rotate a key ([SN-SHR-017](sharing-export.md#sn-shr-017)). Per-profile isolation is mandatory (MASVS-STORAGE-1, MASVS-AUTH-2). Queue contents must be excluded from OS auto-backup ([SN-SEC-023](security.md#sn-sec-023)) and from diagnostics bundles ([SN-TEL-008](telemetry.md#sn-tel-008)).

#### UX notes

References: `ux-principles.md` §4.4 (offline is the default, not an error), §10 ("every limit has a door"), `component-inventory.md` §9 (error = toast, never inline red). Tone matters: the message is a fact and a promise, not an apology or an alarm. Nothing about being offline may look like data loss, because there is none.

#### Test plan

`packages/sane_sync/test/network_gated_action_test.dart` (queue durability, idempotency, backoff ceiling, cancel, per-profile purge), `app/test/features/share/offline_share_test.dart` (live-only path shows the toast and no fake progress), `integration_test/offline_actions_test.dart` (airplane mode across the registry; writing stays smooth). Manual: toggle airplane mode mid-invite on a device.

#### Dependencies

[SN-DS-019](design-system.md#sn-ds-019), [SN-SYNC-020](sync.md#sn-sync-020)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-SYNC-001

<a id="sn-sync-001"></a>

**Build sane_sync engine and user-cloud-drive adapters**

| Field | Value |
|---|---|
| GitHub | #31 |
| Type | epic |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, storage |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `MASVS-CODE-4`, `MASVS-PRIVACY-2`, `OWASP-A02`, `OWASP-A08`, `ASVS-V8`, `CWE-311`, `CWE-354` |
| Extra labels | agent-ready, innovation |

#### Context
sane_sync is the package that moves already-encrypted bytes between a device local store and the user own iCloud Drive / Google Drive so notes converge across devices with no Sane server ever touching content. It implements [ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md) and [ADR-0004](docs/adr/0004-local-first-zero-server.md) and the normative spec [docs/architecture/sync.md](docs/architecture/sync.md), and it satisfies the M4 exit criteria: everything in the cloud is ciphertext only, two devices editing offline converge with no data loss, large attachments chunk-sync without loading whole files, and quota/auth-expiry are first-class recoverable states. The design principle is that the drive is dumb, encrypted transport and single-writer append-only op-log segments mean the cloud never makes a conflict copy (sync.md section 0). Merge is the CRDT job (SN-CORE-003), encryption is the crypto job (SN-CRY-001); this package owns transport, change detection, conflict avoidance, integrity, and the honest sync-status UX. This epic is called out as coordination-heavy (manifest sharding, compaction leasing, adapter differences) so its convergence/soak harness is an early deliverable.

#### Scope
**In:** the child issues below — the sync-store layout, the CloudDriveAdapter contract and a fake, the reconciliation state machine, iCloud/Google Drive/SAF adapters, change detection + backoff, blob lazy-fetch + resumable transfers, integrity verification, silent conflict resolution, compaction coordination, returning-device catch-up, multi-device pairing/management, auto-sync/Wi-Fi-only/provider prefs, sync-status UI, quota handling, auth-expiry recovery, version history, metadata minimisation, and soak/chaos + offline-first tests.
**Out:** CRDT merge semantics (SN-CORE-001), encryption/key hierarchy (SN-CRY-001), byte layout of .sanenote (SN-CORE-005), real-time collaboration transport (SN-COL-001), and OneDrive/Dropbox/WebDAV production adapters (Backlog).

#### Acceptance criteria
- [ ] All child issues below are merged and their DoD met.
- [ ] sane_sync stays pure Dart (no package:flutter import) except the federated plugin implementations under plugins/sane_cloud_drive; arch-lint green.
- [ ] Two devices editing the same page offline then syncing converge byte-for-identical folded state with zero user-visible conflict file (verified by [SN-SYNC-025](sync.md#sn-sync-025)).
- [ ] The adapter layer only ever handles opaque ciphertext; a test asserts no plaintext field crosses the CloudDriveAdapter boundary.
- [ ] The editor never blocks on sync: reads/writes always hit the local store first (verified by [SN-SYNC-026](sync.md#sn-sync-026)).

#### Technical notes
Package packages/sane_sync (pure Dart) + federated plugin plugins/sane_cloud_drive (Dart platform-interface, Swift iCloud impl, Kotlin/Dart Drive impl, web impl). sane_sync may import sane_core (CRDT/model) and sane_crypto (encryption/hash) only, never other feature packages. Children: [SN-SYNC-002](sync.md#sn-sync-002) [SN-SYNC-003](sync.md#sn-sync-003) [SN-SYNC-004](sync.md#sn-sync-004) [SN-SYNC-005](sync.md#sn-sync-005) [SN-SYNC-006](sync.md#sn-sync-006) [SN-SYNC-007](sync.md#sn-sync-007) [SN-SYNC-008](sync.md#sn-sync-008) [SN-SYNC-009](sync.md#sn-sync-009) [SN-SYNC-010](sync.md#sn-sync-010) [SN-SYNC-011](sync.md#sn-sync-011) [SN-SYNC-012](sync.md#sn-sync-012) [SN-SYNC-013](sync.md#sn-sync-013) [SN-SYNC-014](sync.md#sn-sync-014) [SN-SYNC-015](sync.md#sn-sync-015) [SN-SYNC-016](sync.md#sn-sync-016) [SN-SYNC-017](sync.md#sn-sync-017) [SN-SYNC-018](sync.md#sn-sync-018) [SN-SYNC-019](sync.md#sn-sync-019) [SN-SYNC-020](sync.md#sn-sync-020) [SN-SYNC-021](sync.md#sn-sync-021) [SN-SYNC-022](sync.md#sn-sync-022) [SN-SYNC-023](sync.md#sn-sync-023) [SN-SYNC-024](sync.md#sn-sync-024) [SN-SYNC-025](sync.md#sn-sync-025) [SN-SYNC-026](sync.md#sn-sync-026). Implements PRD-SYNC-001..015.

#### Security & privacy
This package is the zero-knowledge boundary in motion. Threats: cloud provider or a malicious drive reading, tampering, reordering or rolling back bytes (CWE-354, CWE-345); metadata leakage of titles/paths/sizes (CWE-212, MASVS-PRIVACY-2); cleartext egress (CWE-319, MASVS-NETWORK-1); OAuth token theft (MASVS-STORAGE-2). Controls: E2EE of every byte before it reaches an adapter (fail closed if the AEAD tag fails), opaque random ids and size padding, manifest BLAKE3 hash tree + hash-chain rollback detection, TLS 1.2+ with pinning for our own endpoints, least-privilege drive.file scope. MASVS-STORAGE-1, MASVS-CRYPTO-2, MASVS-NETWORK-1, MASVS-CODE-4, MASVS-PRIVACY-2, OWASP-A02, OWASP-A08, ASVS V8.

#### UX notes
Sync is a first-class honest UI surface because latency is the provider (seconds to hours on iCloud). Per the sync.md section 10 contract and Settings Sync & backup ([docs/design/screens-and-flows.md](docs/design/screens-and-flows.md) section 12), expose per-page and global states, an always-available Sync now, and clear quota/auth-expiry recovery — never a spinner that blocks writing. All chrome must render across the 17 looks + dark mode and meet a11y (labels, 44pt targets, contrast). Baseline privacy: no cloud file paths, tokens, keys, or note content in logs.

#### Test plan
Aggregate of children under packages/sane_sync/test/** and plugins/sane_cloud_drive/*/test: the convergence/soak/chaos harness ([SN-SYNC-025](sync.md#sn-sync-025)), the offline-first guarantee suite ([SN-SYNC-026](sync.md#sn-sync-026)), adapter contract tests against the fake ([SN-SYNC-005](sync.md#sn-sync-005)), and integrity fuzz. CI green before M4 hardening.

#### Dependencies
SN-CORE-001 (document model, op-log, .sanenote format) and SN-CRY-001 (E2EE, keys) must exist; SN-AUTH-001 supplies identity/tokens for Drive; SN-FND-002 supplies the monorepo scaffold. This epic reconciles against, but does not block on, SN-COL-001 (collaboration).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-002

<a id="sn-sync-002"></a>

**Implement sync-store layout writer and reader**

| Field | Value |
|---|---|
| GitHub | #739 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-CORE-005](storage.md#sn-core-005), [SN-CRY-001](security.md#sn-cry-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `MASVS-PRIVACY-2`, `OWASP-A02`, `CWE-311`, `CWE-212` |
| Extra labels | agent-ready, innovation |

#### Context
The sync store is the .sanenote bundle exploded per page and per device with opaque random ids and ciphertext bodies, as specified in [docs/architecture/sync.md](docs/architecture/sync.md) section 1 and [docs/architecture/file-format.md](docs/architecture/file-format.md) section 0/1. This layer maps the local system-of-record (SN-CORE-004 drift DB + blob store, SN-CORE-005 file writer) onto the on-drive tree: manifest.cbor plus per-device manifest.cbor.deviceId shards, pages/pageId/snapshot.gen.snap, pages/pageId/ops/deviceId.seq.oplog, blobs/blobId.blob, keys/keyId.wrap. It is the single design choice (single-writer files) that makes zero-server merge robust (ADR-0006 decision 2), so it must be exact.

#### Scope
**In:** a SyncStore abstraction over a CloudDriveAdapter that (a) enumerates the on-drive tree, (b) writes this device single-writer files only (its ops segments, its manifest shard, and — when compacting — a new snapshot generation via atomic publish), (c) reads and merges all manifest shards into an effective manifest (LWW/OR-Set over manifest CRDT fields), (d) rotates op-log segments at the 4 MB cap (file-format section 3.4), and (e) maps opaque random 16-byte drive ids to local ObjectIds via an encrypted id-map that never leaves as plaintext.
**Out:** the adapter transport itself ([SN-SYNC-005](sync.md#sn-sync-005)), encryption primitives (SN-CRY-001; this layer calls them), change detection ([SN-SYNC-007](sync.md#sn-sync-007)), and CRDT folding ([SN-SYNC-006](sync.md#sn-sync-006)).

#### Acceptance criteria
- [ ] Writing a page produces exactly the sync.md section 1 tree: one snapshot generation (when compacted), this device op-log segment(s), blob files, and this device manifest shard — and never writes another device files.
- [ ] Drive ids are opaque random 16 bytes, never content- or name-derived; a test asserts no page title, tag, or content hash appears in any path.
- [ ] Reading merges N manifest shards into one effective manifest deterministically regardless of shard arrival order.
- [ ] Op-log segments rotate to seq+1 at 4 MB cleartext; a partially-uploaded torn tail is ignored until complete (length+CRC per file-format section 3.2) and never corrupts state.
- [ ] A consolidated manifest.cbor rewrite by the compacting device bounds shard count and is published atomically (temp-then-rename / adapter atomic publish) only after the new members are durable.

#### Technical notes
packages/sane_sync/lib/src/store/*.dart. Reuse the framing from file-format.md sections 2-4 (SNSN/SNOL/SNBL magics, CBOR manifest with integer keys). Cleartext routing headers only (magic, versions, ids, generation, HLC watermark); bodies are AEAD ciphertext produced by sane_crypto. appDataFolder holds device-local state (cursors) only, never notes (sync.md section 1). Manifest fields that are human-meaningful (titles, tags) are stored as separately-encrypted values (file-format section 6.2). Implements PRD-SYNC-004, PRD-SYNC-007.

#### Security & privacy
Threats: metadata leakage via paths/names (CWE-212), missing encryption of a body (CWE-311), integrity loss on partial sync (CWE-354). Controls: opaque ids, encrypted manifest fields + name-to-id map inside ciphertext, every authoritative byte ciphertext before write, length+CRC + BLAKE3 hashes recorded for [SN-SYNC-013](sync.md#sn-sync-013) to verify, fail closed on any framing mismatch. MASVS-STORAGE-1, MASVS-CRYPTO-2, MASVS-PRIVACY-2, OWASP-A02.

#### UX notes
No direct UI. Correctness here is what makes the invisible-sync promise real: the user sees notebooks converge, never a conflicted-copy file (design Sync & backup, [docs/design/screens-and-flows.md](docs/design/screens-and-flows.md) section 12). Baseline privacy: no drive paths or ids logged in the clear (ids as opaque short hashes only).

#### Test plan
packages/sane_sync/test/store/layout_test.dart (tree shape, single-writer invariant), shard_merge_test.dart (order-independent effective manifest), segment_rotation_test.dart (4 MB cap, torn-tail ignore), path_opacity_test.dart (no content in paths). Runs headlessly against the in-memory fake adapter ([SN-SYNC-005](sync.md#sn-sync-005)).

#### Dependencies
SN-CORE-005 (.sanenote writer/reader, framing), SN-CRY-001 (AEAD/hash). Adapter contract [SN-SYNC-005](sync.md#sn-sync-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-003

<a id="sn-sync-003"></a>

**Implement iCloud Drive cloud-drive adapter**

| Field | Value |
|---|---|
| GitHub | #740 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, ios-phone |
| Areas | sync |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-005](sync.md#sn-sync-005), [SN-SYNC-002](sync.md#sn-sync-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PLATFORM-1`, `MASVS-NETWORK-1`, `OWASP-A08`, `CWE-354`, `CWE-362` |
| Extra labels | needs-credentials |

#### Context
On Apple platforms the sync store lives in an iCloud Drive ubiquity container the user can see in the Files app, accessed only through the document/coordination stack, per [docs/architecture/sync.md](docs/architecture/sync.md) section 5 and PRD-SYNC-005. iCloud cannot be force-synced and evicts files to placeholders, so the adapter must coordinate with the sync daemon (never raw FileManager) and tolerate seconds-to-hours latency. This is the iCloud implementation of the federated plugins/sane_cloud_drive plugin exposing the narrow Dart CloudDriveAdapter API ([SN-SYNC-005](sync.md#sn-sync-005)).

#### Scope
**In:** a Swift plugin implementation that (a) resolves the ubiquity container from the app entitlement, (b) wraps every write in NSFileCoordinator.coordinate(writingItemAt:) and every read in the reading variant, (c) registers at most one NSFilePresenter per open page (they are expensive), (d) observes NSMetadataQuery for add/modify/remove and download state as the change stream, (e) handles placeholders via isUbiquitousItem / startDownloadingUbiquitousItem / ubiquitousItemDownloadingStatus and evicts under cache pressure with evictUbiquitousItem, and (f) exposes NSFileVersion unresolvedConflictVersionsOfItem for the rare snapshot conflict.
**Out:** the CRDT merge of conflict variants ([SN-SYNC-014](sync.md#sn-sync-014)), CloudKit (explicitly not the engine — sync.md section 5.4), and lazy blob policy ([SN-SYNC-011](sync.md#sn-sync-011), which calls this adapter).

#### Acceptance criteria
- [ ] All reads/writes go through NSFileCoordinator/NSFilePresenter; a code review + test asserts no direct FileManager access to the container.
- [ ] watch() emits DriveChange events sourced from NSMetadataQuery; a newly-added remote segment surfaces without a manual poll.
- [ ] read() on a placeholder triggers startDownloadingUbiquitousItem and completes only after the item is materialised; download failures surface as a recoverable state, not a crash.
- [ ] The adapter never assumes it can force a sync; Sync now issues download requests + runs the loop best-effort and returns without blocking.
- [ ] conflictVariants() returns all NSFileVersion variants for a snapshot and resolveConflict() writes one resolved generation via a coordinated atomic write, marking others isResolved = true.

#### Technical notes
plugins/sane_cloud_drive/ios (Swift) + the Dart platform-interface. Requires the iCloud container entitlement and an App ID configured in the Apple Developer account (maintainer-supplied — needs-credentials). Register one presenter per open page at most (sync.md section 5.1). Implements the CloudDriveAdapter methods from sync.md section 9. [ADR-0012](docs/adr/0012-native-plugin-strategy.md) governs the federated plugin structure. Implements PRD-SYNC-005.

#### Security & privacy
Threats: races with the sync daemon corrupting a write (CWE-362), a tampering/rolling-back store (CWE-354), placeholder read exposing partial bytes. Controls: mandatory file coordination, integrity verified downstream by [SN-SYNC-013](sync.md#sn-sync-013), TLS is Apple-managed for the container, adapter only ever moves opaque ciphertext (no plaintext, no keys). MASVS-PLATFORM-1, MASVS-STORAGE-1, OWASP-A08.

#### UX notes
Feeds the sync-status surface ([SN-SYNC-020](sync.md#sn-sync-020)): placeholder/downloading maps to pendingDownload, stuck iCloud maps to Offline — will sync later, never an error. Files-app visibility of the encrypted bundle is the user-control promise (they keep it after uninstall). Baseline: no container paths in logs.

#### Test plan
plugins/sane_cloud_drive/ios unit tests for coordination wrappers; a Dart integration test app/integration_test/sync_icloud_test.dart exercising placeholder download + conflict-variant resolution on a real device/simulator (gated on the iCloud entitlement). Contract test reuses [SN-SYNC-005](sync.md#sn-sync-005).

#### Dependencies
[SN-SYNC-005](sync.md#sn-sync-005) (adapter contract), [SN-SYNC-002](sync.md#sn-sync-002) (store layout). Maintainer must supply the Apple Developer team + iCloud container id.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-004

<a id="sn-sync-004"></a>

**Implement Google Drive REST v3 cloud-drive adapter**

| Field | Value |
|---|---|
| GitHub | #741 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-005](sync.md#sn-sync-005), [SN-AUTH-003](auth.md#sn-auth-003) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-AUTH-2`, `MASVS-STORAGE-2`, `OWASP-A01`, `OWASP-A02`, `CWE-319`, `CWE-522` |
| Extra labels | needs-credentials |

#### Context
Google Drive is the cross-platform sync target and the only one on Android/web/desktop, hitting the Drive REST API v3 (the Drive Android API is retired), per [docs/architecture/sync.md](docs/architecture/sync.md) section 6 and PRD-SYNC-006. Notes go in a visible app folder under the least-privilege drive.file scope so the user keeps the encrypted bundle even after uninstall; appDataFolder is reserved for device-local cursors only. This is the Drive implementation of the CloudDriveAdapter contract ([SN-SYNC-005](sync.md#sn-sync-005)).

#### Scope
**In:** a Dart Drive REST client (lean on googleapis/googleapis_auth for v1, verify maintenance per sync.md section 12) that (a) connects with an OAuth token carrying only drive.file (+ drive.appdata for cursors), (b) creates/reads/updates files in the visible SaneNotesRoot folder, (c) uses resumable uploads for anything over a few hundred KB (audio/PDF blobs), (d) rotates op-log segments to new files at the size cap so each upload is small and written once, (e) publishes snapshots atomically (upload snapshot.gen+1.snap, confirm, commit manifest shard, then delete old generation — never overwrite in place), and (f) exposes competing revisions via revisions.list/get for the rare snapshot conflict.
**Out:** change detection/polling ([SN-SYNC-008](sync.md#sn-sync-008)), watch push ([SN-SYNC-009](sync.md#sn-sync-009)), the SAF backend-less path ([SN-SYNC-010](sync.md#sn-sync-010)), and backoff policy ([SN-SYNC-007](sync.md#sn-sync-007), applied here).

#### Acceptance criteria
- [ ] The adapter requests only drive.file and drive.appdata scopes; a test asserts the broad drive scope is never requested.
- [ ] Notes are written to a visible folder in the user Drive; cursors/config go to appDataFolder; no note bytes ever go to appDataFolder.
- [ ] Uploads over the threshold use resumable upload sessions and survive an interrupted connection (resume, not restart — see [SN-SYNC-012](sync.md#sn-sync-012)).
- [ ] Snapshot publish is atomic-by-construction: old generation is deleted only after the manifest referencing the new one is durable; a mid-publish failure leaves a usable older generation.
- [ ] All requests are HTTPS; OAuth access tokens are short-lived and read from sane_secure_store, never logged, never written to the notes DB or the synced store.

#### Technical notes
plugins/sane_cloud_drive Dart/Kotlin impl. OAuth tokens come from the Sign in with Google flow (SN-AUTH-003) via the auth abstraction (SN-AUTH-002); an optional Kotlin SyncAdapter can run background sync on Android. drive.file file naming uses opaque random ids ([SN-SYNC-002](sync.md#sn-sync-002)). Requires a Google Cloud OAuth client id (maintainer-supplied — needs-credentials). Implements PRD-SYNC-006. See [ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md) decision 5.

#### Security & privacy
Threats: over-privileged scope (OWASP-A01), cleartext transmission (CWE-319), OAuth token theft (CWE-522, MASVS-STORAGE-2). Controls: least-privilege drive.file, TLS-only, token in secure store with refresh rotation, adapter only handles ciphertext so a stolen token still yields no plaintext (ADR-0006 threats table). MASVS-NETWORK-1, MASVS-AUTH-2, MASVS-STORAGE-2, OWASP-A02.

#### UX notes
Auth-expiry maps to the Attention needed / authNeeded state ([SN-SYNC-020](sync.md#sn-sync-020), [SN-SYNC-022](sync.md#sn-sync-022)); quota-full maps to driveFull ([SN-SYNC-021](sync.md#sn-sync-021)). The visible folder is the user-control promise. Baseline: no tokens, file ids, or paths in logs.

#### Test plan
plugins/sane_cloud_drive/test/gdrive_adapter_test.dart against a mocked Drive REST endpoint (resumable upload, atomic snapshot publish, scope assertion); an opt-in live integration test gated on a maintainer OAuth client id. Contract test reuses [SN-SYNC-005](sync.md#sn-sync-005).

#### Dependencies
[SN-SYNC-005](sync.md#sn-sync-005) (adapter contract), SN-AUTH-003 (Sign in with Google tokens). Maintainer must supply the OAuth client id/secret.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-005

<a id="sn-sync-005"></a>

**Define CloudDriveAdapter interface and in-memory fake**

| Field | Value |
|---|---|
| GitHub | #742 |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync |
| Size | S |
| SDLC | design |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-CODE-1`, `ASVS-V1`, `CWE-1059` |
| Extra labels | agent-ready, good first issue |

#### Context
Every backend (iCloud, Drive, SAF, later OneDrive/Dropbox/WebDAV) is a CloudDriveAdapter so a new backend is a small plugin, not a core change, per [docs/architecture/sync.md](docs/architecture/sync.md) section 9 and [ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md) decision 8. The adapter is deliberately dumb: no CRDT, no crypto, just opaque bytes and change events. Defining the contract and a deterministic in-memory fake first unblocks the store layer ([SN-SYNC-002](sync.md#sn-sync-002)) and the engine ([SN-SYNC-006](sync.md#sn-sync-006)) to be built and tested with no real cloud account.

#### Scope
**In:** the abstract CloudDriveAdapter from sync.md section 9 — id, connect(AuthContext), currentCursor(), watch() stream, pollSince(cursor), read(path, range), writeNew(path, bytes), appendOrReplace(path, tail), atomicPublish(tmp, final), delete(path), conflictVariants(path), resolveConflict(path, resolved), and a DriveLimits value (quota hints, max upload, backoff policy); plus DrivePath, DriveCursor, DriveChange, Bytes, Range types; plus a FakeCloudDriveAdapter that simulates latency, out-of-order delivery, placeholder/eviction, partial-tail arrival, quota exhaustion, and conflict variants for tests.
**Out:** the real adapters ([SN-SYNC-003](sync.md#sn-sync-003), [SN-SYNC-004](sync.md#sn-sync-004), [SN-SYNC-010](sync.md#sn-sync-010)) and backoff logic ([SN-SYNC-007](sync.md#sn-sync-007)).

#### Acceptance criteria
- [ ] The interface matches sync.md section 9 exactly (method names, signatures, DriveLimits fields) with /// dartdoc on every member.
- [ ] read() accepts an optional Range for chunked blob range reads; writeNew() supports resumable semantics via the returned handle.
- [ ] The fake is deterministic under a seeded RNG and can inject: configurable latency, reordered change events, a torn/partial tail, driveFull, authNeeded, and N conflict variants.
- [ ] A shared adapter-contract test suite (parameterised) runs against the fake and is reusable by every real adapter.
- [ ] The interface exposes no plaintext-typed field; all payloads are Bytes (opaque).

#### Technical notes
packages/sane_sync/lib/src/adapter/cloud_drive_adapter.dart + test doubles under packages/sane_sync/test/fakes/. Pure Dart, no package:flutter. AuthContext is passed in (OAuth token / SAF grant / ubiquity entitlement handle) but the adapter treats it opaquely. Implements the contract underpinning PRD-SYNC-002..006.

#### Security & privacy
Threats: an over-broad interface leaking plaintext or key types across the boundary (MASVS-CODE-1, insecure API design). Controls: bytes-only payloads, no crypto/CRDT types in signatures, dartdoc stating the adapter must never receive plaintext. ASVS V1, CWE-1059.

#### UX notes
None beyond baseline. No user-facing surface; baseline privacy is that the contract carries no content and the fake never logs payload bytes.

#### Test plan
packages/sane_sync/test/adapter/contract_test.dart (the parameterised suite) + fake_adapter_test.dart (fault-injection determinism). Headless, no widgets.

#### Dependencies
SN-FND-002 (monorepo scaffold so packages/sane_sync exists).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-006

<a id="sn-sync-006"></a>

**Implement the sync reconciliation state machine**

| Field | Value |
|---|---|
| GitHub | #743 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-002](sync.md#sn-sync-002), [SN-SYNC-005](sync.md#sn-sync-005), [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-CODE-4`, `OWASP-A04`, `OWASP-A08`, `ASVS-V8`, `CWE-354` |
| Extra labels | agent-ready |

#### Context
The engine runs one reconciliation loop per configured backend — a state machine, not a stream — implementing [docs/architecture/sync.md](docs/architecture/sync.md) section 2: pull manifest shards + changed segments/snapshots, verify hashes, decrypt and CRDT-merge, lazily fetch only needed blobs, push this device new appends + manifest shard, update the cursor/HLC watermark, schedule the next wake. It touches only files this device may write (single-writer), so there is never a read-modify-write race on a shared file. This is the heart of sane_sync and a data-loss-critical component.

#### Scope
**In:** a SyncEngine with explicit states (idle, pulling, verifying, merging, pushing, backingOff, offline, paused) triggered on change-signal, foreground, manual Sync now, and interval backoff; orchestration of encryption (calls sane_crypto), hash verification (delegates to [SN-SYNC-013](sync.md#sn-sync-013)), CRDT merge (calls SN-CORE-003), lazy blob fetch (delegates to [SN-SYNC-011](sync.md#sn-sync-011)), and cursor/HLC-watermark persistence; per-backend isolation so one failing backend does not stall another.
**Out:** the specific change-detection transports ([SN-SYNC-007](sync.md#sn-sync-007), [SN-SYNC-008](sync.md#sn-sync-008)), conflict-variant merge ([SN-SYNC-014](sync.md#sn-sync-014)), catch-up replay ([SN-SYNC-016](sync.md#sn-sync-016)), and all UI ([SN-SYNC-020](sync.md#sn-sync-020)).

#### Acceptance criteria
- [ ] The push step writes only single-writer files (this device ops segments, its manifest shard, and — if compacting — a new snapshot); a test asserts no write targets another device file.
- [ ] Each pulled member is hash-verified against the merged manifest before use; a partial/tampered member is dropped and re-fetched, never merged.
- [ ] Out-of-order and delayed delivery converge to identical folded state (HLC total order); a randomised delivery-order test passes.
- [ ] The engine runs off the UI isolate (storage/sync isolate) and never blocks reads/writes to the local store (offline-first, [SN-SYNC-026](sync.md#sn-sync-026)).
- [ ] On any decrypt/keying failure the engine enters paused (no key) and uploads nothing, drops nothing, and surfaces no partial content (PRD-KEY-009 fail-closed).

#### Technical notes
packages/sane_sync/lib/src/engine/*.dart, run on the sync isolate ([docs/architecture/overview.md](docs/architecture/overview.md) isolate model, CLAUDE.md section 8). Encryption via sane_crypto, merge via sane_core CRDT (SN-CORE-003), verification via [SN-SYNC-013](sync.md#sn-sync-013). Exposes a SyncStatus stream consumed by app/ Riverpod providers. Implements PRD-SYNC-003, PRD-SYNC-009, PRD-SYNC-010, PRD-KEY-009. See [ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md).

#### Security & privacy
Threats: merging a tampered/partial member (CWE-354, OWASP-A08), fail-open on a keying error leaking or dropping data (OWASP-A04). Controls: verify-then-use, fail closed to paused, encrypt before push, no note content/coords/ids in logs (object ids as opaque short hashes). MASVS-CRYPTO-2, MASVS-CODE-4, ASVS V8.

#### UX notes
Drives [SN-SYNC-020](sync.md#sn-sync-020) status states; must tolerate seconds-to-hours latency without a blocking spinner (sync.md section 10, no-spinners ideal). Baseline: hot-path and loop code logs nothing in profile/release beyond opaque state transitions.

#### Test plan
packages/sane_sync/test/engine/loop_test.dart (state transitions), reorder_convergence_test.dart (randomised delivery), fail_closed_test.dart (keying error to paused), single_writer_test.dart. Uses the fake adapter ([SN-SYNC-005](sync.md#sn-sync-005)).

#### Dependencies
[SN-SYNC-002](sync.md#sn-sync-002), [SN-SYNC-005](sync.md#sn-sync-005), SN-CORE-003 (CRDT merge).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-007

<a id="sn-sync-007"></a>

**Add change-detection scheduling with backoff and jitter**

| Field | Value |
|---|---|
| GitHub | #744 |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SYNC-006](sync.md#sn-sync-006) |
| Depends on | [SN-SYNC-005](sync.md#sn-sync-005) |
| Security controls | `MASVS-NETWORK-1`, `OWASP-A05`, `CWE-799`, `CWE-770` |
| Extra labels | agent-ready, good first issue |

#### Context
Change detection is push where available, poll where not, always with backoff, per [docs/architecture/sync.md](docs/architecture/sync.md) section 4 and the threats table (provider quota exhaustion / throttling). This task provides the shared scheduler: wake sources (change-signal, foreground, app-background-refresh windows, manual Sync now, interval) and the mandatory exponential-backoff-with-jitter that every adapter uses on 403 rateLimitExceeded/userRateLimit and 429, respecting Retry-After.

#### Scope
**In:** a WakeScheduler that multiplexes the wake sources into engine ticks; a BackoffPolicy (exponential base, cap, full jitter, Retry-After override) surfaced through DriveLimits; a foreground/background lifecycle hook; and a debounce so a burst of local edits coalesces into one push (per the 250 ms / 64 KB batching in file-format section 3.4).
**Out:** the Drive Changes API specifics ([SN-SYNC-008](sync.md#sn-sync-008)), the iCloud NSMetadataQuery source (in [SN-SYNC-003](sync.md#sn-sync-003)), and watch push ([SN-SYNC-009](sync.md#sn-sync-009)).

#### Acceptance criteria
- [ ] On a simulated 429 with Retry-After, the next attempt waits at least Retry-After; without it, waits base*2^n +/- full jitter, capped.
- [ ] Backoff resets to base after a successful round.
- [ ] A burst of 100 local edits within the debounce window produces one push, not 100.
- [ ] Manual Sync now bypasses the interval timer but still respects an active backoff window (does not hammer a throttling provider).
- [ ] The scheduler never busy-loops; between wakes it consumes no CPU (timer-driven).

#### Technical notes
packages/sane_sync/lib/src/engine/scheduler.dart + backoff.dart. Pure Dart, deterministic under an injected clock + RNG for tests. Drive quota/QPS numbers and watch-channel TTL are verify-before-shipping (sync.md section 12) — keep intervals configurable, not hard-coded. Feeds [SN-SYNC-006](sync.md#sn-sync-006). Implements PRD-SYNC-011 (backoff), supports PRD-SYNC-006.

#### Security & privacy
Threats: unbounded retry causing self-inflicted rate-limit / battery drain (CWE-770), or a thundering-herd on a shared provider (CWE-799). Controls: full-jitter backoff, Retry-After respect, configurable caps, no secrets in scheduler state. MASVS-NETWORK-1, OWASP-A05.

#### UX notes
Backoff maps to the transient Syncing/Offline states, never a hard error toast ([SN-SYNC-020](sync.md#sn-sync-020)). Sync now remains responsive (queues a tick) even while backing off. Baseline: no logging of endpoints or tokens.

#### Test plan
packages/sane_sync/test/engine/backoff_test.dart (Retry-After, jitter bounds, reset), scheduler_test.dart (debounce coalescing, Sync-now-during-backoff) with injected clock/RNG.

#### Dependencies
[SN-SYNC-005](sync.md#sn-sync-005) (DriveLimits/backoff policy surface).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-008

<a id="sn-sync-008"></a>

**Implement Google Drive incremental change polling**

| Field | Value |
|---|---|
| GitHub | #745 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-004](sync.md#sn-sync-004) |
| Depends on | [SN-SYNC-004](sync.md#sn-sync-004), [SN-SYNC-007](sync.md#sn-sync-007) |
| Security controls | `MASVS-NETWORK-1`, `OWASP-A05`, `CWE-799` |
| Extra labels | agent-ready |

#### Context
The reliable, zero-server change-detection baseline for Google Drive is incremental polling of the Changes collection, per [docs/architecture/sync.md](docs/architecture/sync.md) section 6.3 and [ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md) decision 7: v1 ships Drive polling; push is an optimisation ([SN-SYNC-009](sync.md#sn-sync-009)). This gives every platform a correct wake source without a public webhook endpoint.

#### Scope
**In:** call changes.getStartPageToken once to seed the cursor, then changes.list(pageToken) incrementally, persisting newStartPageToken as this device cursor in appDataFolder (device-local state, never notes); translate Drive change entries into DriveChange events for the adapter watch()/pollSince() surface; page through large change sets; apply the [SN-SYNC-007](sync.md#sn-sync-007) backoff on 403/429.
**Out:** the watch push channel ([SN-SYNC-009](sync.md#sn-sync-009)), iCloud change detection (in [SN-SYNC-003](sync.md#sn-sync-003)), and SAF change detection ([SN-SYNC-010](sync.md#sn-sync-010)).

#### Acceptance criteria
- [ ] The device cursor (startPageToken/newStartPageToken) is stored in appDataFolder and survives reinstall-less restarts; it is never stored with note bytes.
- [ ] changes.list returns are paged fully; a change set spanning multiple pages yields every DriveChange exactly once.
- [ ] A remote edit from device B appears as a DriveChange on device A within one poll interval (configurable).
- [ ] On 403 rateLimitExceeded/429 the poller backs off with jitter (via [SN-SYNC-007](sync.md#sn-sync-007)) and resumes from the persisted cursor with no lost changes.
- [ ] The exact Drive QPS/quota numbers are read from config, not hard-coded (verify per sync.md section 12).

#### Technical notes
plugins/sane_cloud_drive Drive impl + packages/sane_sync wiring. Uses the OAuth session from [SN-SYNC-004](sync.md#sn-sync-004). Cursor lives in drive.appdata. This is the pollSince() implementation of the CloudDriveAdapter for Drive. Implements PRD-SYNC-006.

#### Security & privacy
Threats: rate-limit self-DoS (CWE-799), cursor stored where it could reveal structure. Controls: appDataFolder cursor (opaque token only, no content), backoff, HTTPS. MASVS-NETWORK-1, OWASP-A05.

#### UX notes
Poll latency is expected; the UI shows Up to date between polls and Syncing during a round ([SN-SYNC-020](sync.md#sn-sync-020)). Baseline: no page tokens or file ids logged in the clear.

#### Test plan
plugins/sane_cloud_drive/test/gdrive_changes_test.dart against a mocked Changes API (paging, cursor persistence, exactly-once, backoff on 429).

#### Dependencies
[SN-SYNC-004](sync.md#sn-sync-004) (Drive adapter + OAuth), [SN-SYNC-007](sync.md#sn-sync-007) (backoff).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-009

<a id="sn-sync-009"></a>

**Add optional content-free Drive push notifier**

| Field | Value |
|---|---|
| GitHub | #746 |
| Type | feature |
| Priority | p3 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-004](sync.md#sn-sync-004) |
| Depends on | [SN-SYNC-008](sync.md#sn-sync-008) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-2`, `OWASP-A02`, `CWE-359` |
| Extra labels | needs-decision |

#### Context
changes.watch registers a Drive watch channel (webhook) that posts change notifications, avoiding tight polling — but a webhook needs a public HTTPS endpoint we do not want to make note-content-aware, per [docs/architecture/sync.md](docs/architecture/sync.md) section 6.3 and [ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md) decision 7. Options, in order: rely on polling only (v1 default), or run a tiny stateless notifier that receives Drive content-free something-changed pings and forwards a wake via push notification, holding no keys and seeing no note content (same posture as the ciphertext-only relay). This issue is needs-decision: the maintainer must confirm whether the notifier ships in v1 or stays polling-only.

#### Scope
**In (if adopted):** a minimal stateless notifier service (services/relay-adjacent) that registers/renews watch channels, receives Drive change pings (which carry no note content), maps a channel to a device push token, and sends a wake; client code to subscribe/unsubscribe and to fall back to polling on channel expiry; channel-TTL renewal handling.
**Out:** any content awareness in the notifier, key handling (it holds none), and the polling baseline ([SN-SYNC-008](sync.md#sn-sync-008), which remains the fallback).

#### Acceptance criteria
- [ ] Maintainer decision recorded in [ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md) notes before implementation (polling-only vs notifier).
- [ ] If adopted: the notifier receives only Drive change pings and a device push token; a test/inspection confirms it never receives note bytes, file names, or keys.
- [ ] Watch channels are renewed before expiry; on expiry or a sync message the client falls back to polling with no lost changes.
- [ ] Disabling push cleanly unregisters the channel and reverts to [SN-SYNC-008](sync.md#sn-sync-008) polling.

#### Technical notes
services/ notifier (stateless, no note store — consistent with [ADR-0013](docs/adr/0013-collaboration-transport.md) ciphertext-only posture). Watch-channel max TTL is verify-before-shipping (sync.md section 12). This is an optimisation layer over [SN-SYNC-008](sync.md#sn-sync-008). Implements the push option of PRD-SYNC-006.

#### Security & privacy
Threats: a new server becoming a content/metadata sink (MASVS-PRIVACY-2, CWE-359 exposure of private info). Controls: content-free by construction, holds no keys, documented as a new egress in the threat model with purpose + data sent (CLAUDE.md section 7 rule 4). MASVS-NETWORK-1, OWASP-A02.

#### UX notes
Lower sync latency when enabled; the sync-status surface is unchanged ([SN-SYNC-020](sync.md#sn-sync-020)). Users can leave it off (polling-only) with no feature loss. Baseline: no note metadata in the notifier or its logs.

#### Test plan
services/notifier tests (channel register/renew/expire, content-free assertion) + client fallback test packages/sane_sync/test/engine/push_fallback_test.dart.

#### Dependencies
[SN-SYNC-008](sync.md#sn-sync-008) (polling baseline it optimises). Blocked on the maintainer polling-vs-push decision.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-010

<a id="sn-sync-010"></a>

**Implement Storage Access Framework backend-less adapter**

| Field | Value |
|---|---|
| GitHub | #747 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | android-tablet, android-phone |
| Areas | sync, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-005](sync.md#sn-sync-005), [SN-SYNC-002](sync.md#sn-sync-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-STORAGE-1`, `OWASP-A01`, `CWE-276` |
| Extra labels | agent-ready |

#### Context
On Android the Storage Access Framework gives a no-OAuth, user-chosen-provider path that works with Drive/Dropbox/OneDrive/local uniformly, per [docs/architecture/sync.md](docs/architecture/sync.md) section 6.1. The user picks a folder and the app reads/writes the encrypted single-writer tree there via DocumentsProvider/DocumentFile — attractive for users who do not want to grant Drive OAuth. It is a CloudDriveAdapter implementation ([SN-SYNC-005](sync.md#sn-sync-005)).

#### Scope
**In:** ACTION_OPEN_DOCUMENT_TREE to grant a directory, takePersistableUriPermission() to persist it across reboots, read/write of the sync-store tree through DocumentFile, and an etag/mtime scan (SAF has no push) for change detection; prefer ACTION_OPEN_DOCUMENT (live handle) over ACTION_GET_CONTENT (which imports a copy).
**Out:** the REST Drive path ([SN-SYNC-004](sync.md#sn-sync-004)), push detection (SAF has none), and cross-provider quota specifics ([SN-SYNC-021](sync.md#sn-sync-021)).

#### Acceptance criteria
- [ ] After ACTION_OPEN_DOCUMENT_TREE, the grant persists across reboots via takePersistableUriPermission and is re-validated on launch.
- [ ] Reads/writes go through the granted tree only; the adapter never touches paths outside the grant (least privilege).
- [ ] Change detection uses a PROPFIND-style etag/mtime scan on an interval (with [SN-SYNC-007](sync.md#sn-sync-007) backoff); a remote change is detected on the next scan.
- [ ] A revoked or document-id-churned grant surfaces as authNeeded and prompts re-pick, never a silent failure (verify SAF long-handle stability per sync.md section 12).
- [ ] The tree written matches [SN-SYNC-002](sync.md#sn-sync-002) exactly so a device can switch between SAF and REST access to the same folder.

#### Technical notes
plugins/sane_cloud_drive/android (Kotlin) SAF impl of the adapter. No OAuth. Implements PRD-SYNC-002 (provider choice) for the backend-less case. See sync.md section 6.1/7.

#### Security & privacy
Threats: over-broad file access (OWASP-A01), incorrect grant scoping (CWE-276 incorrect default permissions). Controls: single granted tree, persistable-permission re-validation, ciphertext-only bytes. MASVS-PLATFORM-1, MASVS-STORAGE-1.

#### UX notes
Provider choice ([SN-SYNC-019](sync.md#sn-sync-019)) offers a Choose a folder option for SAF alongside Drive; the picked folder path is shown but treated as a grant, not a path. Grant loss maps to Attention needed ([SN-SYNC-020](sync.md#sn-sync-020)). Baseline: no document uris in logs. Meets a11y for the picker entry (label, 48dp target).

#### Test plan
plugins/sane_cloud_drive/android test for grant persistence + tree read/write; app/integration_test/sync_saf_test.dart on an Android device exercising folder pick, restart, and revocation.

#### Dependencies
[SN-SYNC-005](sync.md#sn-sync-005) (contract), [SN-SYNC-002](sync.md#sn-sync-002) (identical tree).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-011

<a id="sn-sync-011"></a>

**Implement lazy attachment-blob sync with LRU cache**

| Field | Value |
|---|---|
| GitHub | #748 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-006](sync.md#sn-sync-006) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `OWASP-A02`, `CWE-770`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Audio dominates a page by roughly 10x (a 60-minute lecture page is 12-16 MB, audio-heavy), so attachments must be lazily fetched — only the blobs the UI needs now — never force-downloaded, per [docs/architecture/document-model.md](docs/architecture/document-model.md) section 7 and [docs/architecture/sync.md](docs/architecture/sync.md) section 2 step 4. This lets a 1,000-page notebook open instantly with structure and stream contents on demand.

#### Scope
**In:** a BlobSyncManager that fetches a content-addressed blob only when an object references it and enters view; a bounded LRU disk cache with an eviction policy under local cache pressure; range reads for chunked blobs (decrypt-and-stream from any offset, file-format section 5.2); reference-counting via the folded state so an evicted blob is re-fetchable; blob dedup (a blob never changes, so identical bytes converge on one file).
**Out:** resumable transfer mechanics ([SN-SYNC-012](sync.md#sn-sync-012)), the chunk crypto (sane_crypto), and blob GC (SN-CORE tombstone/GC).

#### Acceptance criteria
- [ ] Opening a page fetches its snapshot + ops but NOT its audio blob until playback starts; a test asserts audio bytes are not requested on page open.
- [ ] Range read fetches only the chunk(s) needed to seek/stream, not the whole blob.
- [ ] The LRU cache respects a configurable byte cap and evicts least-recently-used blobs; an evicted blob is transparently re-fetched on next use.
- [ ] Two objects referencing the same blob hash share one cached/synced file (dedup).
- [ ] Each fetched chunk AEAD tag is verified before use; a failed tag aborts the fetch (fail closed), it is not shown.

#### Technical notes
packages/sane_sync/lib/src/blob/*.dart, backed by the SN-CORE-004 content-addressed blob store. Uses adapter read(path, range). Chunk framing per file-format section 5 (256 KiB default). Feeds the audio player (SN-AUD) and PDF renderer (SN-PDF) via the engine. Implements PRD-STOR-008, supports PRD-SYNC-008 (holding large blobs).

#### Security & privacy
Threats: OOM from downloading a huge blob whole (CWE-770/CWE-400), showing an unverified chunk. Controls: streamed range reads, bounded cache, per-chunk AEAD verify-before-use, ciphertext at rest. MASVS-STORAGE-1, MASVS-CRYPTO-2, OWASP-A02.

#### UX notes
Downloading a blob shows Syncing with progress for large blobs ([SN-SYNC-020](sync.md#sn-sync-020)); a not-yet-downloaded attachment shows a tap-to-download affordance rather than blocking the page. Baseline: no blob ids or content in logs.

#### Test plan
packages/sane_sync/test/blob/lazy_fetch_test.dart (no audio on open), lru_cache_test.dart (cap + eviction + re-fetch), range_read_test.dart, dedup_test.dart, against the fake adapter.

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (engine), SN-CORE-004 (blob store).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-012

<a id="sn-sync-012"></a>

**Add resumable transfers for large attachment uploads**

| Field | Value |
|---|---|
| GitHub | #749 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-011](sync.md#sn-sync-011) |
| Depends on | [SN-SYNC-011](sync.md#sn-sync-011) |
| Security controls | `MASVS-NETWORK-1`, `OWASP-A08`, `CWE-354` |
| Extra labels | agent-ready |

#### Context
Audio and PDF blobs are large and mobile networks drop, so uploads must resume rather than restart, per [docs/architecture/sync.md](docs/architecture/sync.md) section 6.4 (use resumable uploads for anything over a few hundred KB). Combined with Wi-Fi-only gating ([SN-SYNC-019](sync.md#sn-sync-019)), this keeps large transfers cheap and reliable.

#### Scope
**In:** a ResumableTransfer layer over the adapter that starts a resumable upload session for a blob above a size threshold, persists the session state (offset, session handle) durably, resumes from the last confirmed offset after an interruption or app restart, verifies the final object hash against the manifest, and cooperates with the Wi-Fi-only hold ([SN-SYNC-019](sync.md#sn-sync-019)) and backoff ([SN-SYNC-007](sync.md#sn-sync-007)); mirrors resumable download for range fetches ([SN-SYNC-011](sync.md#sn-sync-011)).
**Out:** the LRU cache/lazy policy ([SN-SYNC-011](sync.md#sn-sync-011)), and provider-specific resumable API wiring beyond Drive (later backends).

#### Acceptance criteria
- [ ] An upload interrupted at 60 percent resumes from ~60 percent after reconnect/app-restart, not from 0.
- [ ] Session state persists across app restart; a resumed upload produces a byte-identical object whose hash matches the manifest entry.
- [ ] Uploads above the threshold are held when Wi-Fi-only is on and no unmetered network is available, then resume automatically.
- [ ] A never-completing transfer backs off and surfaces pendingUpload(n), not a hard failure.
- [ ] The final published object is hash-verified; a mismatch discards and retries (fail closed).

#### Technical notes
packages/sane_sync/lib/src/blob/resumable.dart. Uses Drive resumable-upload sessions via [SN-SYNC-004](sync.md#sn-sync-004); session state stored in appDataFolder / local device state. Integrity check delegates to [SN-SYNC-013](sync.md#sn-sync-013). Implements PRD-SYNC-008 (hold large uploads) mechanics.

#### Security & privacy
Threats: a truncated/corrupted resumed upload accepted as complete (CWE-354, OWASP-A08). Controls: final-object hash verification, TLS-only transport, session handles are not secrets but are not logged. MASVS-NETWORK-1, OWASP-A08.

#### UX notes
Large-blob progress and Waiting for Wi-Fi are first-class states ([SN-SYNC-020](sync.md#sn-sync-020)); a paused transfer shows a resumable indicator, never a lost-progress restart. Baseline: no blob ids/paths in logs.

#### Test plan
packages/sane_sync/test/blob/resumable_test.dart (interrupt+resume, restart-persistence, wifi-hold, hash-verify) against a fault-injecting fake adapter ([SN-SYNC-005](sync.md#sn-sync-005)).

#### Dependencies
[SN-SYNC-011](sync.md#sn-sync-011) (blob sync). Uses [SN-SYNC-004](sync.md#sn-sync-004) resumable sessions and [SN-SYNC-007](sync.md#sn-sync-007) backoff.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-013

<a id="sn-sync-013"></a>

**Implement integrity verification of synced members**

| Field | Value |
|---|---|
| GitHub | #750 |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-002](sync.md#sn-sync-002), [SN-CRY-001](security.md#sn-cry-001) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-RESILIENCE-2`, `OWASP-A08`, `ASVS-V8`, `CWE-354`, `CWE-345`, `CWE-354` |
| Extra labels | agent-ready, innovation |

#### Context
A cloud drive is untrusted transport that can silently corrupt, truncate, reorder, or roll back bytes, so every synced member must be integrity-checked before use, per [docs/architecture/sync.md](docs/architecture/sync.md) section 3/11 and [docs/architecture/file-format.md](docs/architecture/file-format.md) section 4.4. Three independent layers defend it: the manifest BLAKE3 hash tree, per-record length+CRC on op-log segments, and AEAD tags + position-bound AAD on every encrypted record. The manifest hash-chain (prev links) makes rollback detectable.

#### Scope
**In:** a verifier that (a) checks each snapshot/segment/blob/page-meta member hash against the merged manifest before the engine trusts it, (b) validates op-log record length+CRC and stops at the first torn record (treating the file valid up to that point, re-reading later), (c) verifies each AEAD tag and its AAD (magic || formatVersion || deviceId || segmentSeq || recordIndex) so a cut-and-paste-moved record is rejected, and (d) verifies the manifest hash-chain to detect rollback/regression by a malicious drive; on any failure it drops the member and waits/re-fetches (fail closed).
**Out:** producing the hashes/tags (SN-CRY-001 / SN-CORE-005 write them), and the merge itself ([SN-SYNC-006](sync.md#sn-sync-006)).

#### Acceptance criteria
- [ ] A bit-flip inside any member is detected (hash or AEAD tag) and the member is not merged.
- [ ] A truncated op-log segment is accepted only up to the last valid CRC-checked record; the rest is ignored until it arrives.
- [ ] A record moved to a different file/position fails AAD verification and is rejected.
- [ ] A rolled-back manifest (prev chain regresses) is detected and refused; the last known-good manifest is retained.
- [ ] Every failure path is fail-closed: no partial/garbled content reaches the CRDT or the UI.

#### Technical notes
packages/sane_sync/lib/src/integrity/*.dart. BLAKE3-256 via the confirmed blake3 package (fallback SHA-256 multihash — verify per file-format section 11); crc32c for record framing; AEAD verify via sane_crypto. Consumed by [SN-SYNC-006](sync.md#sn-sync-006) pull step. Implements the sync.md section 11 mitigations and PRD-SYNC-003/007 integrity guarantees.

#### Security & privacy
Threats: silent data corruption (CWE-354), tampering/reordering/rollback by a malicious drive (CWE-345), accepting unauthenticated bytes (OWASP-A08). Controls: hash tree + hash chain + AEAD + position-bound AAD, verify-before-use, fail closed. MASVS-CRYPTO-2, MASVS-RESILIENCE-2, OWASP-A08, ASVS V8.

#### UX notes
A rejected/partial member is invisible to the user (the engine waits and re-fetches); persistent tamper/rollback surfaces as Attention needed with a safe message, never garbled notes ([SN-SYNC-020](sync.md#sn-sync-020)). Baseline: failures logged as opaque member ids + reason codes only, no content.

#### Test plan
packages/sane_sync/test/integrity/verify_test.dart (bit-flip, truncation, moved-record AAD, rollback), plus a fuzz corpus under test/integrity/fuzz/ feeding malformed members. Must be clean before merge (parser-fuzz gate).

#### Dependencies
[SN-SYNC-002](sync.md#sn-sync-002) (framing + recorded hashes), SN-CRY-001 (AEAD/BLAKE3).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-014

<a id="sn-sync-014"></a>

**Implement silent snapshot-conflict resolution**

| Field | Value |
|---|---|
| GitHub | #751 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006), [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `MASVS-CODE-4`, `OWASP-A04`, `CWE-362` |
| Extra labels | agent-ready, innovation |

#### Context
Conflict handling MUST be automatic and invisible — the app must NEVER show a conflicted-copy file or a manual merge prompt (PRD-SYNC-010, [docs/architecture/sync.md](docs/architecture/sync.md) section 5.3/6.4). Single-writer op-log segments mean per-file conflicts cannot arise; the only conflictable file is a snapshot (rewritten by whichever device compacts). If two devices compact the same page concurrently, the provider yields variants (iCloud NSFileVersion, Drive competing revisions, Dropbox siblings); the engine reads all variants, CRDT-merges them (they are just replicas of the same folded state), writes one resolved snapshot, and marks the others resolved. This invisible convergence is the category differentiator (fixes the number-one complaint).

#### Scope
**In:** a ConflictResolver that detects a snapshot with multiple variants via adapter.conflictVariants(), decrypts and CRDT-merges every variant through SN-CORE-003, publishes one resolved snapshot generation via atomic publish, calls adapter.resolveConflict() to clear the others, and — if a raw provider conflict copy ever appears (iCloud/Dropbox) — ingests it as another replica, merges, and deletes the extra; emits conflictResolvedSilently (log-only) status.
**Out:** compaction leasing that makes this rare ([SN-SYNC-015](sync.md#sn-sync-015)), the adapter variant APIs ([SN-SYNC-003](sync.md#sn-sync-003)/[SN-SYNC-004](sync.md#sn-sync-004)), and CRDT merge internals (SN-CORE-003).

#### Acceptance criteria
- [ ] Two devices compacting the same page concurrently converge to one resolved snapshot with no data loss and no user-visible conflict file.
- [ ] A raw provider conflict-copy file is ingested as a replica, merged, and the extra deleted; the user never sees it.
- [ ] Resolution is deterministic: all devices that observe the same variants produce the same resolved snapshot (HLC total order).
- [ ] The event is surfaced only as conflictResolvedSilently in logs/telemetry-off diagnostics, never as a UI prompt.
- [ ] No variant is dropped before it is merged (no lost update).

#### Technical notes
packages/sane_sync/lib/src/conflict/*.dart. Variant fetch via the adapter conflictVariants/resolveConflict methods; merge via sane_core (SN-CORE-003) treating variants as replicas. Publish via atomic publish ([SN-SYNC-002](sync.md#sn-sync-002)). Implements PRD-SYNC-010, sync.md section 5.3/6.4, [ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md) decision 4.

#### Security & privacy
Threats: a concurrent-compaction race dropping an update (CWE-362, lost update) or fail-open surfacing partial state (OWASP-A04). Controls: merge-all-then-publish-one, deterministic HLC ordering, fail closed on decrypt error (defer to paused). MASVS-CODE-4, OWASP-A04.

#### UX notes
The user experience is nothing: notebooks just converge (design invariant, no conflict files — [docs/design/screens-and-flows.md](docs/design/screens-and-flows.md) section 12). If a device is on a stale key it shows Paused (no key), never a merge dialog. Baseline: silent-resolution logged as opaque page id + variant count only.

#### Test plan
packages/sane_sync/test/conflict/silent_merge_test.dart (concurrent compaction, N-variant convergence, determinism), raw_conflict_copy_test.dart (ingest+delete). Extended by the chaos suite [SN-SYNC-025](sync.md#sn-sync-025).

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (engine), SN-CORE-003 (CRDT merge).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-015

<a id="sn-sync-015"></a>

**Implement lease-coordinated snapshot compaction**

| Field | Value |
|---|---|
| GitHub | #752 |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-006](sync.md#sn-sync-006) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006), [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `MASVS-CODE-4`, `OWASP-A04`, `CWE-362`, `CWE-667` |
| Extra labels | agent-ready |

#### Context
Compaction folds op-log tails into a fresh snapshot and GCs stable tombstones; it is the only operation that rewrites a shared file, so it is lease-coordinated to make concurrent-compaction conflicts rare, per [docs/architecture/sync.md](docs/architecture/sync.md) section 8 and [docs/architecture/document-model.md](docs/architecture/document-model.md) section 8.3. Leases are advisory (correctness is still guaranteed by [SN-SYNC-014](sync.md#sn-sync-014)); they just avoid churn.

#### Scope
**In:** a compaction coordinator that (a) writes a single-writer soft lease pages/pageId/compaction.lease as lease.deviceId with an HLC + TTL, (b) compacts a page only if no unexpired lease from a higher-priority device (lowest DeviceId) exists, (c) runs only on an idle device (page open, no active writing, on power/wifi ideally) so it never competes with the low-latency ink path for I/O, (d) writes the new snapshot generation atomically and only then prunes folded segments (durable on 2+ replicas), and (e) invokes the SN-CORE causal-stability GC gate before any physical purge.
**Out:** the CRDT fold/GC math (SN-CORE-003 / document-model section 8), and conflict resolution when leases lose the race ([SN-SYNC-014](sync.md#sn-sync-014)).

#### Acceptance criteria
- [ ] Only one device (lowest DeviceId with a valid lease) compacts a page under normal conditions; a test with two devices confirms at most one wins.
- [ ] Compaction runs only when the device is idle (no active writing); it is deferred while the ink path is active.
- [ ] A new snapshot generation is published atomically; folded segments are deleted only after the snapshot is durable on 2+ replicas.
- [ ] No tombstone/blob is physically purged unless causally stable (every non-revoked device lastSeenHlc >= tombstone HLC).
- [ ] If two devices compact anyway (lease race), [SN-SYNC-014](sync.md#sn-sync-014) resolves it with no data loss.

#### Technical notes
packages/sane_sync/lib/src/compaction/*.dart. Lease priority = lowest DeviceId (deterministic). Idle detection via engine state ([SN-SYNC-006](sync.md#sn-sync-006)). GC gate from document-model section 8 (SN-CORE-003). Implements sync.md section 8, supports PRD-STOR-007/008.

#### Security & privacy
Threats: concurrent compaction corrupting shared state (CWE-362) or early purge resurrecting deleted data (CWE-667 improper lock / stale state). Controls: single-writer lease files, atomic publish, causal-stability gate, fail-safe to [SN-SYNC-014](sync.md#sn-sync-014). MASVS-CODE-4, OWASP-A04.

#### UX notes
Invisible to the user; the point is stable performance (compaction never fights the pen) and bounded storage. A just-purged trashed item stays gone across devices. Baseline: compaction logs opaque page id + generation only.

#### Test plan
packages/sane_sync/test/compaction/lease_test.dart (priority, TTL expiry, idle gating), gc_gate_test.dart (no purge before causal stability), atomic_publish_test.dart.

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (engine/idle state), SN-CORE-003 (fold + GC).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-016

<a id="sn-sync-016"></a>

**Implement returning-device catch-up and op-log replay**

| Field | Value |
|---|---|
| GitHub | #753 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-006](sync.md#sn-sync-006) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006) |
| Security controls | `MASVS-CODE-4`, `OWASP-A08`, `CWE-354` |
| Extra labels | agent-ready |

#### Context
A returning or new device loads the latest snapshot generation, then replays every device op-log tail above the snapshot watermark, CRDT-merging, per [docs/architecture/sync.md](docs/architecture/sync.md) section 2.1 (the recommended hybrid). It diffs the manifest hlcVector against its own to know exactly which segments/ranges it still needs and fetches page snapshots lazily so a 1,000-page notebook opens instantly with structure and streams contents on demand.

#### Scope
**In:** a catch-up routine that (a) reads the merged manifest hlcVector, (b) diffs it against the local per-device watermark to compute the exact missing segments/ranges (document-model section 2.4), (c) fetches the latest snapshot per opened page + only the missing op-log tails, (d) replays them in HLC order into local state, and (e) fetches page snapshots lazily (only for pages the user opens) so structure loads first; integrates with lazy blob fetch ([SN-SYNC-011](sync.md#sn-sync-011)).
**Out:** the initial pairing/key acquisition ([SN-SYNC-017](sync.md#sn-sync-017)), integrity verification ([SN-SYNC-013](sync.md#sn-sync-013), applied per member), and blob policy ([SN-SYNC-011](sync.md#sn-sync-011)).

#### Acceptance criteria
- [ ] A device offline for a week catches up by loading the latest snapshot + replaying only the op-log tails above its watermark, not the full history.
- [ ] The hlcVector diff requests exactly the missing segments/ranges — no redundant re-fetch of already-merged segments.
- [ ] A 1,000-page notebook shows full Library structure in under 1 second; page contents stream when opened (not all at once).
- [ ] Catch-up converges to identical folded state as a device that was always online (verified against [SN-SYNC-025](sync.md#sn-sync-025)).
- [ ] Every fetched member is integrity-verified ([SN-SYNC-013](sync.md#sn-sync-013)) before replay; a bad member is skipped and re-fetched.

#### Technical notes
packages/sane_sync/lib/src/engine/catchup.dart. Uses the manifest hlcVector watermark (document-model section 2.4) and the Library-doc/page-doc split so structure syncs independently of heavy page payloads. Implements PRD-SYNC-013 catch-up step, sync.md section 2.1.

#### Security & privacy
Threats: replaying an unverified/partial member (CWE-354, OWASP-A08). Controls: verify-before-replay via [SN-SYNC-013](sync.md#sn-sync-013), HLC-ordered idempotent replay, fail closed. MASVS-CODE-4, OWASP-A08.

#### UX notes
A new device shows the Library instantly and streams page contents as opened — no full-download wall (design no-spinners). Progress for a large catch-up maps to pendingDownload(n) ([SN-SYNC-020](sync.md#sn-sync-020)). Baseline: no content/ids in logs.

#### Test plan
packages/sane_sync/test/engine/catchup_test.dart (watermark diff exactness, tail-only replay, convergence-with-always-online, structure-first). Uses the fake adapter.

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (engine). Verified members via [SN-SYNC-013](sync.md#sn-sync-013); lazy contents via [SN-SYNC-011](sync.md#sn-sync-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-017

<a id="sn-sync-017"></a>

**Implement multi-device pairing and key acquisition**

| Field | Value |
|---|---|
| GitHub | #754 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, auth, security |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-CRY-003](security.md#sn-cry-003), [SN-AUTH-002](auth.md#sn-auth-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CRYPTO-1`, `MASVS-STORAGE-2`, `OWASP-A02`, `OWASP-A07`, `ASVS-V6`, `CWE-287`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
Adding a second device must reconcile via the same signed-in account + same provider, then obtain the master key through the crypto key-source ladder — passkey-PRF or platform-keychain sync (iCloud Keychain / Google Password Manager) or manual recovery-code entry — after which the new device loads the latest snapshot + replays op-log tails, per PRD-SYNC-013 and [docs/architecture/sync.md](docs/architecture/sync.md) section 2.1. Without the key the device can sync ciphertext but shows Paused (no key); the master key never leaves a device unwrapped.

#### Scope
**In:** the pairing flow that registers this device in Workspace.devices (name, Ed25519 signing pubkey, mints a random 128-bit DeviceId used in op-log filenames + HLC tie-breaks), selects the provider, obtains the master key via the SN-CRY-002 ladder (passkey-PRF / keychain / recovery code), and — once keyed — hands off to catch-up ([SN-SYNC-016](sync.md#sn-sync-016)); a Paused (no key) state until keyed; brute-force-hardened recovery-code entry (memory-hard unwrap + attempt backoff) per PRD-KEY-007.
**Out:** the key hierarchy/wrap itself (SN-CRY-002), recovery-code generation UX (SN-CRY-003), device revocation + key rotation ([SN-SYNC-018](sync.md#sn-sync-018)), and identity sign-in (SN-AUTH).

#### Acceptance criteria
- [ ] A second signed-in device on the same provider syncs ciphertext immediately but shows Paused (no key) until a key source completes.
- [ ] Entering a valid recovery code unwraps the master key and completes pairing; an invalid code is rejected with attempt backoff and never reveals whether a portion was correct.
- [ ] The new device gets a unique random DeviceId; a test asserts no DeviceId collision and that op-log filenames use it.
- [ ] The master key is never persisted in plaintext and never leaves the device unwrapped (a test asserts no plaintext key in storage/logs).
- [ ] After keying, catch-up ([SN-SYNC-016](sync.md#sn-sync-016)) converges the device with no data loss.

#### Technical notes
packages/sane_sync device-registry wiring + app/ pairing flow; keys via sane_crypto (SN-CRY-002/003) and sane_secure_store; identity via SN-AUTH-002. Device record shape per document-model section 1.2 (DeviceRecord). Implements PRD-SYNC-013, PRD-KEY-007. See [ADR-0007](docs/adr/0007-end-to-end-encryption-and-keys.md).

#### Security & privacy
Threats: unauthorized device gaining plaintext (OWASP-A07/A02), recovery-code brute force (CWE-287), key theft (CWE-522). Controls: master key via hardware-gated sources, memory-hard recovery unwrap + backoff, keys only in Keychain/Keystore, fail closed to Paused. MASVS-AUTH-1, MASVS-CRYPTO-1, MASVS-STORAGE-2, ASVS V6.

#### UX notes
Follows the E2EE setup honesty (SN-CRY-003): plainly state there is no password reset. Pairing shows a clear key-source picker and, on failure, Paused (no key) with a recover option ([SN-SYNC-020](sync.md#sn-sync-020)). All chrome across 17 looks + dark, a11y labels + 44pt targets. Baseline: no keys/codes in logs.

#### Test plan
packages/sane_sync/test/pairing/pairing_test.dart (paused-until-keyed, DeviceId uniqueness), app/test/security/recovery_code_bruteforce_test.dart (backoff, no oracle), integration convergence with [SN-SYNC-016](sync.md#sn-sync-016).

#### Dependencies
SN-CRY-002 (key hierarchy/keychain), SN-CRY-003 (recovery code), SN-AUTH-002 (identity/tokens).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-018

<a id="sn-sync-018"></a>

**Build the multi-device management and revocation screen**

| Field | Value |
|---|---|
| GitHub | #755 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-017](sync.md#sn-sync-017) |
| Depends on | [SN-SYNC-017](sync.md#sn-sync-017), [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CRYPTO-1`, `OWASP-A01`, `ASVS-V6`, `CWE-613` |
| Extra labels | agent-ready |

#### Context
The Multi-device screen lists paired devices (name, platform, last-seen), lets the user name the current device, and revoke a device — which rotates the relevant wrapped keys so a lost device loses future access, per PRD-SYNC-014 and PRD-KEY-010. Each device has its own DeviceId used in op-log filenames and HLC tie-breaks. Revocation cannot un-send already-synced ciphertext the device holds, and the UI must say so honestly.

#### Scope
**In:** a settings screen (under Security / Sync & backup) that reads Workspace.devices, shows each device name/platform/last-seen, allows renaming the current device (LWW write), and revokes a device — marking it revoked (its future ops are rejected) and triggering key rotation via SN-CRY-002/PRD-KEY-010 so content written after revocation is unreadable by it; honest copy that already-held ciphertext cannot be recalled.
**Out:** the key rotation crypto itself (SN-CRY-002), pairing ([SN-SYNC-017](sync.md#sn-sync-017)), and collaborator revocation (SN-COL-001, M6).

#### Acceptance criteria
- [ ] The screen lists all registered non-revoked devices with name, platform, and last-seen (from DeviceRecord.lastSeenHlc).
- [ ] Renaming the current device updates its DeviceRecord.displayName and propagates via LWW.
- [ ] Revoking a device sets revoked=true, rejects its future ops, and rotates the affected content/items keys (PRD-KEY-010) so it cannot decrypt content written after revocation.
- [ ] The UI clearly states that already-synced ciphertext the device holds cannot be un-sent.
- [ ] A revoked device that comes back online cannot merge new ops and shows an appropriate revoked/re-pair state.

#### Technical notes
app/lib/settings/devices/*.dart + sane_ui components (SN-DS-003); reads/writes Workspace.devices via sane_core; rotation via sane_crypto (SN-CRY-002). Implements PRD-SYNC-014, PRD-KEY-010. Design: Multi-device under Sync & backup ([docs/design/screens-and-flows.md](docs/design/screens-and-flows.md) section 12).

#### Security & privacy
Threats: a lost/stolen device retaining future access (CWE-613 insufficient session expiration; OWASP-A01), or a false promise of recall. Controls: key rotation on revoke, revoked-op rejection, honest UI about already-held ciphertext. MASVS-AUTH-1, MASVS-CRYPTO-1, ASVS V6.

#### UX notes
Design Multi-device list; revoke is a destructive action with a confirm + honest note. Render across 17 looks + dark; a11y labels on each device row and the revoke action, 44pt targets, contrast >= 4.5:1, keyboard-reachable on web. Empty state: only this device paired. Baseline: no device secrets in logs.

#### Test plan
app/test/settings/devices_screen_test.dart (list/rename/revoke widget), integration test asserting a revoked device is denied post-revocation merge (with [SN-SYNC-017](sync.md#sn-sync-017)), golden tests per look.

#### Dependencies
[SN-SYNC-017](sync.md#sn-sync-017) (pairing/device registry), SN-CRY-002 (key rotation).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-019

<a id="sn-sync-019"></a>

**Wire auto-sync, Wi-Fi-only and provider-choice preferences**

| Field | Value |
|---|---|
| GitHub | #756 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006), [SN-SET-001](settings.md#sn-set-001) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-1`, `OWASP-A04`, `ASVS-V8`, `CWE-1188` |
| Extra labels | agent-ready |

#### Context
Sync is off until the user turns it on; autoSync is the master switch, and when off nothing leaves the device (PRD-SYNC-001, PRD-SET-001). wifiOnly holds large uploads on mobile data (PRD-SYNC-008, PRD-SET-002). Provider choice (Back up to) offers iCloud Drive on Apple / Google Drive elsewhere with exactly one active target per profile, replacing the removed SS Cloud option (PRD-SYNC-002, PRD-SET-003, PRD section 0.4). The first enable runs key-setup + provider-choice before any upload.

#### Scope
**In:** the settings wiring for autoSync (default on per the design token, but sync itself off until first enable completes key-setup — see note), wifiOnly (default off), and the Back up to provider segmented control (iCloud on Apple only / Google Drive; SAF folder option from [SN-SYNC-010](sync.md#sn-sync-010)); enforcement that when autoSync is off the engine pushes nothing; that wifiOnly holds large blob uploads until unmetered while small op-log text segments may still sync; and that switching provider is a guarded migration (exactly one active target per profile).
**Out:** the key-setup flow (SN-CRY, gates first enable), the settings screen chrome shell (SN-SET-001), and the status surface ([SN-SYNC-020](sync.md#sn-sync-020)).

#### Acceptance criteria
- [ ] With autoSync off, a network trace shows zero note bytes leaving the device; enabling it first runs key-setup + provider choice before any upload (PRD-SYNC-001).
- [ ] With wifiOnly on and no unmetered network, audio/PDF/image uploads are held (pendingUpload / Waiting for Wi-Fi) while small text segments may still sync unless all-cellular is disabled.
- [ ] Back up to shows iCloud Drive only on Apple platforms and Google Drive on all; exactly one target is active per profile.
- [ ] Changing provider is guarded (confirm) and does not orphan or duplicate the encrypted store.
- [ ] The autoSync/wifiOnly/backup preferences persist per profile and propagate as LWW ops when sync is on (device-scoped settings excepted).

#### Technical notes
app/lib/settings/sync/*.dart consuming SN-SET-001 preference keys autoSync/wifiOnly/backup (PRD-SET-001/002/003); gates the engine ([SN-SYNC-006](sync.md#sn-sync-006)). Network class detection for metered/unmetered. Implements PRD-SYNC-001/002/008. Note the SS Cloud removal (PRD section 0.4).

#### Security & privacy
Threats: an insecure default leaking content (CWE-1188), or cellular upload against user intent. Controls: off-until-on master switch (privacy by default), Wi-Fi-only hold, per-profile scoping, no content egress without explicit enable. MASVS-NETWORK-1, MASVS-PRIVACY-1, OWASP-A04, ASVS V8.

#### UX notes
Settings Sync & backup: exact labels/defaults from PRD-SET-001/002/003 ([docs/design/screens-and-flows.md](docs/design/screens-and-flows.md) section 12). Toggles apply immediately, no Save. Render across 17 looks + dark; a11y switch labels, 44pt targets, keyboard on web. Baseline: no provider tokens/paths in logs.

#### Test plan
app/test/settings/sync_prefs_test.dart (off=no-egress, wifiOnly hold, provider gating, per-profile persistence); integration test app/integration_test/sync_optin_test.dart asserting no bytes leave until enabled. Golden per look.

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (engine gating), SN-SET-001 (preference infrastructure).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-020

<a id="sn-sync-020"></a>

**Build sync status UI and recoverable error states**

| Field | Value |
|---|---|
| GitHub | #757 |
| Type | design |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-PRIVACY-2`, `ASVS-V8`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
Because provider latency is unavoidable (seconds to hours), sync state is a first-class honest UI surface — the category number-one complaint is untrustworthy sync — per [docs/architecture/sync.md](docs/architecture/sync.md) section 10 and PRD-SYNC-009. The app must expose per-page and global states and a manual Sync now, and must never block writing or reading on sync (local-first).

#### Scope
**In:** a per-page and global status indicator with the states upToDate, syncing (with progress for large blobs), pendingUpload(n), pendingDownload(n), offline, driveFull, authNeeded, and conflictResolvedSilently (log-only); an always-available Sync now (best-effort; cannot force iCloud but triggers the loop + download requests); and clear recovery surfaces for Attention needed (auth expired / quota full / provider disconnected) that route to [SN-SYNC-021](sync.md#sn-sync-021)/[SN-SYNC-022](sync.md#sn-sync-022).
**Out:** the engine that emits the states ([SN-SYNC-006](sync.md#sn-sync-006)), quota logic ([SN-SYNC-021](sync.md#sn-sync-021)), and re-auth flow ([SN-SYNC-022](sync.md#sn-sync-022)).

#### Acceptance criteria
- [ ] All nine states render with correct copy and iconography and never block the editor; writing/reading stays live in every state.
- [ ] Sync now triggers the loop + download requests and returns immediately; it does not spin-block and respects active backoff.
- [ ] Large-blob syncing shows progress; pendingUpload(n)/pendingDownload(n) show counts.
- [ ] driveFull and authNeeded present as recoverable states with a clear next action, not as errors.
- [ ] Empty/offline states render correctly (offline shows Offline — will sync later).

#### Technical notes
app/lib/sync/status/*.dart + sane_ui components (SN-DS-003); consumes the SyncStatus stream from [SN-SYNC-006](sync.md#sn-sync-006) via Riverpod. States map to the sync.md section 10 contract. Implements PRD-SYNC-009. Surfaced in the library, page rail, and Settings Sync & backup ([docs/design/screens-and-flows.md](docs/design/screens-and-flows.md) section 12).

#### Security & privacy
Threats: leaking note titles/paths in a status string or log (MASVS-PRIVACY-2, CWE-532). Controls: status carries counts/states only, never content; logs opaque page ids only. ASVS V8.

#### UX notes
Design Sync & backup + per-notebook badges. Must render across all 17 looks + dark mode with golden tests; a11y: Semantics labels announce state changes (e.g. syncing to up to date), 44pt/48dp targets, contrast >= 4.5:1, keyboard-reachable Sync now on web; respect reduced-motion for any progress animation. Baseline: no content in any status text.

#### Test plan
app/test/sync/status_widget_test.dart (all nine states, Sync-now non-blocking), golden tests per look app/test/sync/goldens/, a11y semantics test.

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (status stream), SN-DS-003 (components).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-021

<a id="sn-sync-021"></a>

**Implement drive-quota handling and sync soft cap**

| Field | Value |
|---|---|
| GitHub | #758 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006) |
| Security controls | `MASVS-NETWORK-1`, `OWASP-A05`, `CWE-770` |
| Extra labels | needs-decision |

#### Context
Storage is the user own drive, so quota exhaustion is their Drive full / iCloud full, which must be a first-class recoverable state — the app keeps working locally, compacts aggressively, dedups blobs, and retries with backoff (PRD-SYNC-011, [docs/architecture/sync.md](docs/architecture/sync.md) section 6.5/10). The design 5 GB (Free) / 50 GB (Pro) meter is reinterpreted as an app-enforced soft cap on how much encrypted data Sane will sync into the user own cloud, not Sane-hosted storage (PRD-SYNC-012). This issue is needs-decision: the maintainer must decide whether to enforce any cap at all given the user owns the storage (PRD section 15 open decision 1).

#### Scope
**In:** detection of provider 403 quota / storageQuotaExceeded and surfacing driveFull; keep-working-locally guarantee; aggressive compaction + blob dedup + size padding as footprint controls; a soft-cap meter (used/cap) reinterpreted per PRD-SYNC-012 that, beyond the Free cap, pauses syncing new large attachments and prompts Upgrade while never blocking local note-taking; behind a build-time flag so the cap can be disabled per the maintainer decision.
**Out:** the pricing/entitlement gate (SN-BILL), the storage meter chrome (SN-SET-004), and backoff mechanics ([SN-SYNC-007](sync.md#sn-sync-007)).

#### Acceptance criteria
- [ ] A provider quota-exceeded response surfaces driveFull; local note-taking continues uninterrupted.
- [ ] Beyond the Free soft cap, new large-attachment uploads pause with an Upgrade prompt; text sync and local editing continue.
- [ ] The cap is behind a build-time flag and can be disabled entirely (maintainer decision, PRD section 15).
- [ ] Under quota pressure the app compacts, dedups, and pads to minimise footprint before prompting.
- [ ] Recovering space (or upgrading) clears driveFull and resumes held uploads automatically.

#### Technical notes
packages/sane_sync/lib/src/quota/*.dart + app wiring; compaction via [SN-SYNC-015](sync.md#sn-sync-015), dedup via [SN-SYNC-011](sync.md#sn-sync-011), padding via [SN-SYNC-024](sync.md#sn-sync-024). Meter reinterpretation per PRD-SYNC-012 / PRD-SET-004. verify exact Drive quota numbers before shipping (sync.md section 12). Implements PRD-SYNC-011/012.

#### Security & privacy
Threats: unbounded retry against a full quota (CWE-770), or a footprint that leaks size. Controls: backoff, padding, dedup, no content in the meter. MASVS-NETWORK-1, OWASP-A05.

#### UX notes
driveFull is a state, not an error; the meter (Audio recordings use most of it. Pro raises the limit to 50 GB) and Upgrade path follow PRD-SET-004 ([docs/design/screens-and-flows.md](docs/design/screens-and-flows.md) section 12). Render across looks + dark; a11y labelled meter, contrast. Baseline: no content in quota logs.

#### Test plan
packages/sane_sync/test/quota/quota_test.dart (driveFull surfacing, local-continues, soft-cap pause, flag-off bypass, resume-on-recover) against the fake adapter injecting quota errors.

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (engine). Blocked on the maintainer soft-cap decision (PRD section 15).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-022

<a id="sn-sync-022"></a>

**Handle provider auth expiry and re-authentication**

| Field | Value |
|---|---|
| GitHub | #759 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, auth |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-004](sync.md#sn-sync-004), [SN-AUTH-002](auth.md#sn-auth-002) |
| Security controls | `MASVS-AUTH-2`, `MASVS-STORAGE-2`, `OWASP-A07`, `ASVS-V6`, `CWE-613` |
| Extra labels | agent-ready |

#### Context
OAuth/provider auth expires, and PRD-SYNC-011 requires that auth expiry prompt a single re-auth, not silent failure. The provider-disconnected and authNeeded states must be recoverable, keeping the local store fully usable meanwhile ([docs/architecture/sync.md](docs/architecture/sync.md) section 10).

#### Scope
**In:** detection of 401/invalid-token and provider-disconnected conditions; a single, clear re-auth prompt (via SN-AUTH-002) that refreshes/renews the token in sane_secure_store; the authNeeded status ([SN-SYNC-020](sync.md#sn-sync-020)); automatic resume of the sync loop after successful re-auth; and a guard that the engine never busy-retries a hard auth failure (defers to a user action).
**Out:** the OAuth flow itself (SN-AUTH), token storage internals (sane_secure_store), and the Drive adapter transport ([SN-SYNC-004](sync.md#sn-sync-004)).

#### Acceptance criteria
- [ ] An expired token surfaces authNeeded and a single re-auth prompt; the engine does not silently fail or loop.
- [ ] After successful re-auth the loop resumes from the persisted cursor with no lost changes.
- [ ] Tokens are read/renewed only from sane_secure_store and never logged or written to the notes DB / synced store.
- [ ] Local reading/writing is unaffected while auth is pending.
- [ ] A user-cancelled re-auth leaves the app in a clean authNeeded state, not a broken one.

#### Technical notes
packages/sane_sync + app wiring; re-auth via SN-AUTH-002 (OIDC PKCE + state + nonce per M4 exit criteria); tokens in sane_secure_store. Implements PRD-SYNC-011 (auth expiry) and PRD-AUTH-006 (token storage).

#### Security & privacy
Threats: stale/session-expiry mishandling (CWE-613, OWASP-A07), token leakage (MASVS-STORAGE-2). Controls: single re-auth, secure-store-only tokens, no token in logs, resume from durable cursor. MASVS-AUTH-2, ASVS V6.

#### UX notes
authNeeded shows a single Reconnect action (design Attention needed). Render across looks + dark; a11y label + 44pt target. Empty/offline unaffected. Baseline: no tokens in logs.

#### Test plan
packages/sane_sync/test/auth/reauth_test.dart (expiry to authNeeded, resume-after-reauth, cancel-clean, no busy-loop); token-not-logged assertion.

#### Dependencies
[SN-SYNC-004](sync.md#sn-sync-004) (Drive adapter), SN-AUTH-002 (auth abstraction).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-023

<a id="sn-sync-023"></a>

**Implement version history browse and restore from snapshots**

| Field | Value |
|---|---|
| GitHub | #760 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-002](sync.md#sn-sync-002), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `OWASP-A08`, `CWE-354` |
| Extra labels | agent-ready, innovation |

#### Context
Version history falls out of the retained ring of snapshot generations plus the op-log tail: reconstruct any retained point by loading the nearest snapshot at-or-before the target and replaying ops up to the target HLC, per [docs/architecture/file-format.md](docs/architecture/file-format.md) section 8 and PRD-STOR-007. The retention ring is hourly x24, daily x30, monthly x12 by default; unlimited history is Pro and Free retains 7 days.

#### Scope
**In:** a VersionHistory service that lists retained snapshot generations for a page (sorted by physicalMs for a human timeline), reconstructs a past state (nearest snapshot <= target + replay to target HLC) read-only, and restores a chosen version as new ops (never a destructive rewrite, so restore itself merges); enforcement of the retention ring bounds (hourly/daily/monthly) and the Free 7-day vs Pro unlimited window (gated via SN-BILL).
**Out:** the pricing gate internals (SN-BILL), snapshot writing/compaction ([SN-SYNC-015](sync.md#sn-sync-015)), and the GC that prunes the ring beyond retention (SN-CORE document-model section 8).

#### Acceptance criteria
- [ ] The history list shows retained generations with human-readable timestamps (physicalMs order).
- [ ] Reconstructing a past point loads nearest snapshot <= target + replays ops to the target HLC and matches what that point actually was.
- [ ] Restoring a version is expressed as new ops (idempotent, merges), never a destructive rewrite; undoing a restore is possible.
- [ ] Retention respects the ring (hourly x24 / daily x30 / monthly x12) and the Free 7-day vs Pro window.
- [ ] Each loaded snapshot/segment is integrity-verified ([SN-SYNC-013](sync.md#sn-sync-013)) before reconstruction.

#### Technical notes
packages/sane_sync/lib/src/history/*.dart reading snapshots/segments via [SN-SYNC-002](sync.md#sn-sync-002) and SN-CORE-005; replay via sane_core. Free/Pro window via SN-BILL entitlement. Implements PRD-STOR-007, file-format section 8.

#### Security & privacy
Threats: reconstructing from an unverified/tampered snapshot (CWE-354, OWASP-A08). Controls: verify-before-reconstruct via [SN-SYNC-013](sync.md#sn-sync-013), restore-as-ops (no destructive path), ciphertext at rest. MASVS-STORAGE-1, MASVS-CODE-4.

#### UX notes
A timeline browser with a preview and a Restore action; restore confirms and is non-destructive. Render across 17 looks + dark with golden tests; a11y timeline labels, 44pt targets, contrast, keyboard on web. Empty state: no earlier versions yet. Baseline: no content in logs.

#### Test plan
packages/sane_sync/test/history/history_test.dart (reconstruct exactness, restore-as-ops idempotency, retention ring, Free/Pro window), golden for the timeline UI.

#### Dependencies
[SN-SYNC-002](sync.md#sn-sync-002) (snapshot/segment access), SN-CORE-005 (snapshot format/replay).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-024

<a id="sn-sync-024"></a>

**Enforce metadata minimisation and size padding**

| Field | Value |
|---|---|
| GitHub | #761 |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | sync, privacy, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-002](sync.md#sn-sync-002), [SN-CRY-001](security.md#sn-cry-001) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-STORAGE-1`, `OWASP-A02`, `CWE-212`, `CWE-359` |
| Extra labels | agent-ready |

#### Context
A curious cloud provider can see structure (page/device counts, rough op counts, rough sizes, sync timing) but must never see titles, text, ink, audio, or which page is which, per [docs/architecture/file-format.md](docs/architecture/file-format.md) section 6 and PRD-SYNC-007. Names in the cloud must be opaque ids; the name-to-id map lives only inside encrypted payloads; sizes are padded to bucket boundaries to blunt size-fingerprinting. What is intentionally cleartext must be documented in the threat model (LINDDUN).

#### Scope
**In:** enforcement + verification that drive paths/filenames are opaque random ids (never names or content hashes); that manifest human-meaningful fields (titles, tags) are stored as separately-encrypted values (file-format section 6.2); size padding of ciphertext members to the buckets {4, 16, 64, 256 KiB, 1, 4 MiB} for snapshots/segments and next 64 KiB for blobs; and a documented list (in docs/security/threat-model.md, LINDDUN) of exactly what metadata is intentionally cleartext and why.
**Out:** the AEAD itself (SN-CRY-001), the store layout ([SN-SYNC-002](sync.md#sn-sync-002), which this hardens), and the threat-model doc ownership (SN-PRV/SN-SEC).

#### Acceptance criteria
- [ ] A test scans a synced store and asserts no path, filename, or manifest field contains a plaintext title, tag, or content hash.
- [ ] Manifest titles/tags are present only as encrypted values; a reader without the key sees ciphertext.
- [ ] Snapshots/segments are padded to the next bucket boundary; blobs to the next 64 KiB; a test asserts on-disk sizes land on buckets.
- [ ] The intentionally-cleartext metadata list is documented in the threat model with rationale.
- [ ] Padding overhead stays within a few percent (measured).

#### Technical notes
packages/sane_sync/lib/src/store/padding.dart + metadata assertions in [SN-SYNC-002](sync.md#sn-sync-002). Padding is random bytes inside the AEAD or a trailing padding length (file-format section 6.3). Opaque ids per document-model section 1.1 / sync.md section 1. Implements PRD-SYNC-007, file-format section 6.

#### Security & privacy
Threats: metadata leakage (CWE-212, MASVS-PRIVACY-2), size-fingerprinting (CWE-359). Controls: opaque ids, encrypted fields, bucket padding, documented cleartext surface. OWASP-A02, MASVS-STORAGE-1.

#### UX notes
None beyond baseline. No user-facing surface; the baseline is that nothing here logs titles, tags, paths, ids, or sizes in the clear (object/blob ids as opaque short hashes only).

#### Test plan
packages/sane_sync/test/privacy/metadata_min_test.dart (no plaintext in paths/manifest), padding_test.dart (bucket boundaries, overhead bound).

#### Dependencies
[SN-SYNC-002](sync.md#sn-sync-002) (store layout), SN-CRY-001 (AEAD/field encryption).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-025

<a id="sn-sync-025"></a>

**Build sync soak and chaos test harness**

| Field | Value |
|---|---|
| GitHub | #762 |
| Type | test |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | core |
| Areas | sync, qa |
| Size | L |
| SDLC | verification |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006), [SN-SYNC-003](sync.md#sn-sync-003), [SN-SYNC-004](sync.md#sn-sync-004) |
| Security controls | `MASVS-CODE-4`, `MASVS-RESILIENCE-2`, `OWASP-A08`, `CWE-362`, `CWE-354` |
| Extra labels | agent-ready |

#### Context
The M4 exit criterion is that two devices editing offline then syncing converge with no data loss, and the sync layer must survive the messy realities of consumer drives (out-of-order and delayed delivery, torn tails, placeholder eviction, quota errors, concurrent compaction). A dedicated soak + chaos harness proves convergence and offline-first guarantees under fault injection before beta ([docs/architecture/sync.md](docs/architecture/sync.md) section 11, roadmap M7).

#### Scope
**In:** a multi-replica simulation (N virtual devices over the fake adapter, plus opt-in real-adapter runs) that generates randomised concurrent edit/erase/move/delete op streams, injects faults (reorder, delay, drop-then-redeliver, torn tail, placeholder eviction, 403/429 quota/throttle, concurrent compaction, clock skew within maxDrift), and asserts eventual convergence to identical folded state with no data loss; a long-running soak that runs thousands of rounds; and property assertions (commutativity, idempotency, no resurrection of causally-stable deletes).
**Out:** the CRDT unit-property tests (SN-CORE convergence harness), and perf latency budgets (SN-PERF).

#### Acceptance criteria
- [ ] After any randomised fault-injected schedule, all replicas converge to byte-identical folded state; a divergence fails the test with a reproducible seed.
- [ ] Concurrent compaction produces one resolved snapshot with no lost update ([SN-SYNC-014](sync.md#sn-sync-014)).
- [ ] A causally-stable deleted item is never resurrected by a resurfacing stale replica.
- [ ] Torn/partial members and injected tampering are rejected (via [SN-SYNC-013](sync.md#sn-sync-013)) without corrupting state.
- [ ] The soak runs thousands of rounds in CI within a time budget and is deterministic under a seed.

#### Technical notes
packages/sane_sync/test/soak/*.dart (harness) + tools/ chaos config; drives [SN-SYNC-006](sync.md#sn-sync-006) over the fake adapter ([SN-SYNC-005](sync.md#sn-sync-005)) and, opt-in, real adapters ([SN-SYNC-003](sync.md#sn-sync-003)/[SN-SYNC-004](sync.md#sn-sync-004)). Seeds logged for reproduction. Feeds the SN-QA-001 suite. Implements the sync.md section 11 verification.

#### Security & privacy
Threats verified: reordering/tamper/rollback (CWE-354), concurrent-compaction races (CWE-362, OWASP-A08). Controls exercised: integrity verify, silent merge, causal-stability GC. MASVS-CODE-4, MASVS-RESILIENCE-2.

#### UX notes
None beyond baseline. No user surface; the harness must never print note content (it generates synthetic ops) and logs only seeds + opaque ids.

#### Test plan
packages/sane_sync/test/soak/convergence_soak_test.dart, chaos_fault_injection_test.dart, no_resurrection_test.dart. Reproducible seeds; runs in CI (bounded) and as a longer nightly soak.

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (engine), [SN-SYNC-003](sync.md#sn-sync-003) + [SN-SYNC-004](sync.md#sn-sync-004) for opt-in real-adapter runs.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SYNC-026

<a id="sn-sync-026"></a>

**Verify offline-first guarantees under all sync states**

| Field | Value |
|---|---|
| GitHub | #763 |
| Type | test |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | sync, qa |
| Size | S |
| SDLC | verification |
| Parent | [SN-SYNC-001](sync.md#sn-sync-001) |
| Depends on | [SN-SYNC-006](sync.md#sn-sync-006) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `OWASP-A04`, `ASVS-V8`, `CWE-1188` |
| Extra labels | agent-ready |

#### Context
Local-first means the editor is always live from the local store; the app must never block writing or reading on sync (sync.md section 10, roadmap M1/M4 exit criteria: editor works with no account and no network, nothing leaves the device without opt-in). This verification suite is the guardrail that keeps every sync feature honest to that promise.

#### Scope
**In:** integration tests that drive the app in each sync state (autoSync off, offline, syncing, driveFull, authNeeded, paused-no-key, backing-off) and assert that create/edit/read/organise/undo all complete from the local store with no blocking spinner and no dependence on a network call; plus an egress assertion that with autoSync off (or guest) zero note bytes leave the device; plus a guard test that no sync operation runs on the UI isolate.
**Out:** the individual features under test (they own their unit tests), and the broad convergence soak ([SN-SYNC-025](sync.md#sn-sync-025)).

#### Acceptance criteria
- [ ] In every sync state, writing and reading notes complete locally with no blocking on a network call (measured: no awaited network on the read/write path).
- [ ] With autoSync off or as a guest, a network trace shows zero note bytes leaving the device.
- [ ] Undo/redo and library organisation work fully offline.
- [ ] No sync/encryption/network work runs on the UI isolate (asserted via isolate instrumentation).
- [ ] Turning sync on later adopts existing local data without uploading until explicitly enabled (PRD-AUTH-010, PRD-SYNC-001).

#### Technical notes
app/integration_test/offline_first_test.dart + a network-egress harness (block/trace) and isolate instrumentation. Exercises [SN-SYNC-006](sync.md#sn-sync-006) states and [SN-SYNC-019](sync.md#sn-sync-019) opt-in gating. Implements the M4 exit criteria and CLAUDE.md section 8 isolate rule.

#### Security & privacy
Threats: an insecure default silently uploading (CWE-1188), or blocking that pushes users to disable local encryption. Controls: off-until-on egress proof, local-first read/write proof, no-UI-isolate-network proof. MASVS-PRIVACY-1, MASVS-NETWORK-1, OWASP-A04, ASVS V8.

#### UX notes
None beyond baseline (a verification suite). It protects the no-spinners, always-live editor promise across all 17 looks implicitly. Baseline: the harness logs no note content, only pass/fail + opaque state labels.

#### Test plan
app/integration_test/offline_first_test.dart (per-state local liveness), app/integration_test/no_egress_when_off_test.dart (egress trace), app/test/sync/no_ui_isolate_network_test.dart.

#### Dependencies
[SN-SYNC-006](sync.md#sn-sync-006) (engine + states). Gating from [SN-SYNC-019](sync.md#sn-sync-019).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-019

<a id="sn-web-019"></a>

**Implement Google Drive user-cloud sync on web with OneDrive support**

| Field | Value |
|---|---|
| GitHub | #832 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | web |
| Areas | sync, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-SYNC-002](sync.md#sn-sync-002), [SN-SYNC-004](sync.md#sn-sync-004), [SN-WEB-018](auth.md#sn-web-018) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `ASVS-V10`, `CWE-311`, `OWASP-A01` |
| Extra labels | needs-credentials |

#### Context
Sync is what makes web notes durable: browser storage can be evicted ([SN-WEB-009](storage.md#sn-web-009)), so the user's own cloud is the durable copy (`docs/adr/0010-web-pwa-strategy.md` decision 3, R6). iCloud Drive is not a cross-platform option from a browser — CloudKit JS is Apple-ID-only with long-term reliability risk — so **Google Drive is the primary web provider**, with OneDrive through MSAL + Microsoft Graph as the secondary (`docs/platform/web.md` §7). `PRD-SYNC-002` requires Drive on all platforms, `PRD-SYNC-006` mandates a **visible app folder with the `drive.file` scope** (so the user keeps their encrypted bundle even after uninstall, and the app sees only files it created), and `PRD-SYNC-003` requires that everything written is already ciphertext. This issue implements the web adapter behind the shared `sane_sync` contract.

#### Scope
**In:** the web implementation of `plugins/sane_cloud_drive` for Google Drive (and OneDrive) using browser HTTP APIs, incremental change listing, upload/download of op-log segments, snapshots and content-addressed blobs, resumable uploads with retry/backoff, quota and throttling handling, the Drive Picker for choosing/locating the app folder, and Wi-Fi/metered behaviour where the browser exposes it.
**Out:** the sync engine, op-log format and CRDT merge ([SN-SYNC-002](sync.md#sn-sync-002)), the native Drive adapter ([SN-SYNC-004](sync.md#sn-sync-004)), encryption and key handling ([SN-CRY-002](security.md#sn-cry-002), [SN-WEB-031](security.md#sn-web-031)), and iCloud on web (explicitly out per `docs/platform/web.md` §7).

#### Acceptance criteria
- [ ] Enabling sync in a browser writes only **ciphertext**: a network capture during a full sync shows no plaintext note content, title or filename (`PRD-SYNC-003`, `PRD-SYNC-007` — opaque ids only).
- [ ] The `drive.file` scope is used with a **visible app folder**; the app can neither list nor read unrelated Drive files, verified by an authorization-scope test.
- [ ] Two devices (a browser and a native app) editing the same notebook offline converge with no data loss after both sync (`PRD-SYNC-010`).
- [ ] A 100 MB attachment uploads in chunks with resumable retry, bounded memory, progress and cancel — without blocking the UI thread (`PRD-SYNC-004`).
- [ ] Provider quota exhaustion or HTTP 429 surfaces "storage full / provider unavailable", keeps the app fully working locally, and retries with exponential backoff (`PRD-SYNC-011`).
- [ ] Sync is **off until the user turns it on** and the first enable runs the key-setup flow (`PRD-SYNC-001`); a guest never triggers a network call.
- [ ] Token expiry mid-sync recovers by silent refresh or a clear re-authorize prompt, never by dropping or duplicating operations.
- [ ] The per-notebook and global status states from `PRD-SYNC-009` (Up to date / Syncing / Waiting / Paused (no key) / Offline / Error) are all reachable and correct on web.

#### Technical notes
Implement against the `sane_cloud_drive` platform interface (ADR-0012) so the sync engine is provider- and platform-agnostic; `packages/sane_sync` stays pure Dart. Authorization comes from [SN-WEB-018](auth.md#sn-web-018) (GIS OAuth for Drive scopes is separate from the ID-token sign-in; MSAL for Graph). All network and crypto work belongs off the UI isolate — on web that means a Worker (`docs/architecture/overview.md` §6). Use incremental change tokens rather than full listings (`PRD-SYNC-006`). Under COEP, cross-origin API responses must satisfy CORS ([SN-WEB-015](security.md#sn-web-015)). Follow ADR-0006 for segment/snapshot layout: `notes/<opaqueId>/ops/<deviceId>.<seq>.enc`, `notes/<opaqueId>/snap/<n>.enc`, `attachments/…`.

#### Security & privacy
**needs-credentials:** Google OAuth client ID with Drive scopes and a Microsoft app registration — maintainer-supplied, never committed. Threats: plaintext reaching the provider (TM-I-01, CWE-311, MASVS-CRYPTO-2); metadata leakage through filenames, sizes or folder structure (TM-I-04, MASVS-PRIVACY-3); over-broad OAuth scope granting access to the user's whole Drive (OWASP-A01, ASVS-V10, CWE-284); token leakage (CWE-522); a hostile or corrupted remote segment being trusted (TM-T-01). Controls: encrypt in `sane_crypto` **before** any write and verify the AEAD tag before using any decrypted byte, failing closed; opaque file ids with padded sizes; least-privilege `drive.file` scope with incremental authorization requested in context; TLS 1.2+ only (MASVS-NETWORK-1); no filenames, ids or content in logs (CWE-532); a decrypt failure sets "Paused (no key)" and never displays partial content (`PRD-KEY-009`).

#### UX notes
Settings → Sync & backup is fully specified in `docs/design/screens-and-flows.md` §12 (provider choice, "Sync automatically", storage meter) and the per-notebook status chip appears in Library and the Editor toolbar (§6, §7.1). Every state — up to date, syncing with progress, waiting, paused (no key), offline, error, quota exhausted — must render in all **17 looks, light and dark**; golden-test the status chip set in two looks per mode. Copy must not imply Sane stores anything (`PRD-PRIV-001`). Accessibility: status is exposed through `Semantics` and a polite live region rather than colour alone (`PRD-CO-312`), controls are ≥ 44 px, keyboard reachable with visible focus, contrast ≥ 4.5:1.

#### Test plan
- `packages/sane_sync/test/web_adapter_contract_test.dart` — the provider contract with a fake transport (shared conformance suite).
- `app/test/web/drive_scope_test.dart` — asserts requested scopes and that no broad-scope request exists.
- `app/integration_test/web/sync_ciphertext_test.dart` — captures requests and asserts no plaintext, opaque names only.
- `app/integration_test/web/sync_conflict_test.dart` — offline edits on two clients converge.
- `app/integration_test/web/sync_resume_test.dart` — interrupted large upload resumes; quota/429 handling.
- Manual: real Drive account once credentials exist; OneDrive smoke test.

#### Dependencies
[SN-SYNC-002](sync.md#sn-sync-002), [SN-SYNC-004](sync.md#sn-sync-004), [SN-WEB-018](auth.md#sn-web-018); key posture from [SN-WEB-031](security.md#sn-web-031).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Threat model + controls matrix updated for the web sync data flow
- [ ] Reviewed against docs/security/secure-coding-checklist.md §3 with CODEOWNERS security review

---

