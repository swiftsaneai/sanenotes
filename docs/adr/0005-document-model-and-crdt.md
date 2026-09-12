# ADR-0005: Document model and CRDT strategy

- **Status:** Accepted
- **Date:** 2026-09-13
- **Deciders:** Maintainer (Jatin Kumar Singh)
- **Relates to:** [ADR-0004 local-first](./0004-local-first-zero-server.md),
  [ADR-0001 stack](./0001-flutter-single-codebase.md); specified in
  [`../architecture/document-model.md`](../architecture/document-model.md) and
  [`../architecture/file-format.md`](../architecture/file-format.md).
- **Evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
  §2 (Yjs/Automerge/Loro/eg-walker/Peritext), §3 (modeling ink), "Recommended data model".

## Context

[ADR-0004](./0004-local-first-zero-server.md) makes merge a client-side, conflict-free concern. We must choose
(a) a **document model** for a note that spans ink, rich text, page structure, PDFs, audio, tables, links; and
(b) a **CRDT strategy**. The research is clear that **no single CRDT library is ideal for all three sub-models**
(ink, rich text, tree), that **ink is not a text-CRDT problem** (strokes are immutable geometric objects), and
that **CRDT history grows unboundedly** unless chunked and compacted (research §2, §3). The locked product
decision fixes the entity hierarchy (Workspace→Profile→Notebook→Page→Layer→Object) and the CRDT flavours
(add-wins set of object ids, LWW registers, per-object HLC clocks, Peritext/Yjs-style rich text) — this ADR
records *how* we realise them and the library build-vs-buy call.

## Decision

1. **A note is a tree of small, independently-syncable CRDT documents**, not one monolith. The **page** is the
   unit of load/sync/merge. A separate **Library doc** (movable-tree) holds the Notebook→Page structure, kept
   independent of page contents so browsing/reordering is instant and cheap
   ([`../architecture/document-model.md`](../architecture/document-model.md) §1).
2. **Four CRDT models cover everything** (ibid. §4):
   - **Add-wins Unique Set (OR-Set)** for object/tree membership and ink strokes — concurrent draw-vs-erase
     resolves **add-wins** (research §3).
   - **LWW registers** (HLC-resolved) for every mutable scalar property, kept **independent** (separate `x`,
     `y`, `scale`, `rotation`, `colour`, `width`) so concurrent unrelated edits both survive (Weidner
     Principle 4).
   - **Movable list / movable tree** via **fractional-index position registers** for ordering and
     re-parenting, with the proven cycle-avoidance rule from *A Highly-Available Move Operation for Replicated
     Trees* (research §2).
   - **Peritext-style sequence CRDT** for inline rich text (character `opId`s + `addMark` spans anchored
     `before`/`after`, LWW on overlap); block structure lives in the movable-list, since Peritext is
     inline-only (research §2).
3. **Everything is an op in an append-only op-log**, stamped with a **Hybrid Logical Clock** `(physicalMs,
   logical, deviceId)`; LWW resolves by HLC, ties by `deviceId`; a **clock-skew clamp** (default 60 s) bounds
   malicious/broken clocks (ibid. §3).
4. **Ink geometry is immutable and offloaded** to content-addressed blobs; the CRDT holds only ids + style
   registers + a hash pointer (research §3, §8). Erase never mutates geometry (object-erase = set removal;
   segment-erase = tombstone + create fragments) (ibid. §5).
5. **Deletion is a tombstone**; GC only after a retention window **and** a causal-stability gate (all
   non-revoked devices have seen it), preventing data resurrection (ibid. §8).
6. **Build the CRDT in pure Dart** (`sane_core`), informed by Yjs/Automerge/Loro/Peritext, rather than binding
   a WASM/Rust library in v1. A Rust core (Loro/Automerge via `flutter_rust_bridge`) is the sanctioned later
   optimisation, gated by the same triggers as [ADR-0001](./0001-flutter-single-codebase.md) (perf/memory on the reference
   device lab, or rich-text/tree needs outgrowing the Dart impl).
7. **"Per-object vector clocks"** from the product brief is realised as **HLC total order per op + one
   per-device HLC watermark at the sync boundary** — equivalent for our CRDT set, far cheaper than a full
   vector per op (ibid. §2.4). Recorded here as a deliberate, risk-acknowledged refinement of the locked
   decision.

## Consequences

**Positive**
- Small, independently-testable CRDT models; each maps to a well-studied algorithm — low novel-research risk.
- Page-level chunking bounds memory/file size/merge cost and makes a 1,000-page notebook open instantly
  (structure-only Library doc). Ink offload keeps the mergeable page ~1 MB even at 5,000 strokes
  ([`../architecture/document-model.md`](../architecture/document-model.md) §7).
- Pure-Dart core keeps one debuggable language, agent-friendly, no WASM/FFI bridge in the hot path for v1
  (aligns with [ADR-0001](./0001-flutter-single-codebase.md)'s Dart-core rationale).
- Add-wins/LWW/movable/Peritext give correct, intuitive merges (no vanished strokes, no clobbered edits, no
  broken reorders, no link-expansion bug).

**Negative / costs**
- **We own a CRDT implementation** — the highest-risk single component. Mitigate with property-based tests
  (convergence, commutativity, idempotence) mirroring Peritext's proof obligations, differential tests vs a
  reference (Automerge/Loro) and a large fuzz corpus.
- Peritext + movable-tree in Dart is non-trivial; the Rust-core escape hatch exists precisely for this.
- HLC-watermark (not full vector clocks) means no cheap per-op causal-graph queries; if a feature needs
  fine-grained blame, we add an opt-in causal index rather than fattening ops (documented risk).
- Compaction + GC add background complexity and a causal-stability bookkeeping burden.

**Neutral**
- The op-log substrate is exactly what eg-walker/Automerge use, so a later migration to a Rust core is an
  optimisation, not a rewrite.

## Alternatives considered

| Alternative | Verdict |
|---|---|
| **Yjs (via `y_crdt` Dart port)** | Largest editor ecosystem + built-in GC, but **no native move** (delete+insert reordering → broken refs on concurrent move, research §2), control-character rich text with known overlap anomalies. Acceptable *plain-text* stopgap; not the model. **verify** port health. |
| **Automerge 2/3 (Rust/WASM via bridge)** | Git-like history + Peritext-grade text; v3 cut memory >10×. Best when history/branching is a product feature; less-mature editor bindings; adds a WASM/FFI dependency in v1. The primary **Rust-core upgrade target**. |
| **Loro (Rust/WASM via bridge)** | Native **Movable Tree** + Fugue + Peritext — the best *fit* for our tree+text; but >1 MB WASM, early ecosystem, FFI in v1. Strong **Rust-core upgrade target** (esp. for the tree). |
| **eg-walker / Diamond Types** | Order-of-magnitude less steady-state memory, fast load; research-grade/less turnkey. Intellectual model for our op-log; not a v1 dependency. |
| **One monolithic CRDT document per note** | Simpler mental model, but unbounded growth, giant sync unit, can't open a big notebook fast. Rejected — chunk per page. |
| **Full per-op vector clocks** | Faithful to the brief's wording but O(devices)/op and unnecessary for our CRDT set. Refined to HLC + watermark (decision 7). |

## Threats

| Threat | Mitigation |
|---|---|
| **Clock-skew LWW hijack** — a device stamps year-2099, wins every LWW forever | HLC clamp: reject/clamp stamps > `now()+maxDrift` (60 s), log anomaly ([`../architecture/document-model.md`](../architecture/document-model.md) §3.3) |
| **Data resurrection** — offline device re-adds a deleted object on reconnect | causal-stability GC gate: purge tombstones only after all non-revoked devices' watermark ≥ tombstone HLC (§8) |
| **Convergence bug** — replicas silently diverge | property-based + differential + fuzz tests; deterministic HLC total order; canonical CBOR so hashes match cross-device |
| **Forged/duplicated ops from a revoked device** | ops attributed by `DeviceId` with an Ed25519-signed device registry; revoked device's ops rejected ([ADR-0007](./0007-end-to-end-encryption-and-keys.md) §6) |
| **Unknown-op-type data loss** across app versions | forward-compat discipline: preserve unknown ops, refuse to compact them, prompt to update (§2.3, §9) — never silently drop |
| **Move-cycle corruption** (A→under B while B→under A) | movable-tree undoes the lower-HLC move of any detected cycle (deterministic) (§4.3) |
| **CRDT history blow-up / slow load** | chunk per page; compact to snapshots; offload heavy payloads to immutable blobs (research §3) |

## Notes / follow-ups

- **verify** `y_crdt`, a Dart `fractional-indexing` port, `blake3`, canonical `cbor`, `zstd` (see architecture
  docs' verify lists) before relying on any.
- Define the editor-spike decision on inline-object anchoring (special character in the text sequence vs block
  in the movable-list) — lean special-character.
- Stand up the convergence test harness (property + differential vs Loro/Automerge + fuzz) as an early M0
  deliverable; the CRDT is the riskiest component and needs the earliest tests.
