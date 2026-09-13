# Backlog — area: collaboration

24 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-COL-001](collaboration.md#sn-col-001) **Deliver real-time collaboration: E2EE rooms, presence, comments and classroom moderation** (epic · M6 Collaboration, Sharing & Sage AI)
  - [SN-COL-002](collaboration.md#sn-col-002) **SPIKE: choose the Dart WebRTC stack, signalling protocol and TURN strategy** · p1 · spike · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-003](collaboration.md#sn-col-003) **Specify the collaboration session protocol: room ids, room secret and frame schema** · p0 · design · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-004](collaboration.md#sn-col-004) **Implement the collab session state machine and op-frame codec in sane_sync** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-005](collaboration.md#sn-col-005) **Implement the WebRTC data-channel transport with STUN, TURN and reconnect** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-006](collaboration.md#sn-col-006) **Authenticate peers by device key and enforce membership proof on room join** · p0 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-007](collaboration.md#sn-col-007) **Build the ciphertext-only signalling and catch-up relay in services/relay** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-008](collaboration.md#sn-col-008) **Enforce the relay invariant: no keys, no plaintext, no note store** · p0 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-009](collaboration.md#sn-col-009) **Build the join-a-room flow from a share link with consent and guest support** · p1 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-010](collaboration.md#sn-col-010) **Implement the presence roster with colours, current page and join/leave events** · p1 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-011](collaboration.md#sn-col-011) **Render throttled ephemeral live cursors for every collaborator** · p1 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-012](collaboration.md#sn-col-012) **Add follow-a-collaborator viewport mirroring with a stop-following control** · p2 · feature · S · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-013](collaboration.md#sn-col-013) **Enforce live-session roles and the Free/Pro collaboration gate** · p1 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-014](collaboration.md#sn-col-014) **Implement threaded comments as CRDT objects anchored to ink, text and regions** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-015](collaboration.md#sn-col-015) **Build the comments panel with filters, jump-to-anchor and reactions** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-016](collaboration.md#sn-col-016) **Notify @mentions and badge unseen collaborator activity** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-017](collaboration.md#sn-col-017) **Implement classroom rooms with host broadcast and per-participant copies** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-018](collaboration.md#sn-col-018) **Implement host moderation controls for classroom rooms** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-019](collaboration.md#sn-col-019) **Add the room abuse floor: draw approval, rate limits, wipe and report** · p0 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-020](collaboration.md#sn-col-020) **Queue offline edits and reconcile a room through the cloud-drive sync layer** · p1 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-021](collaboration.md#sn-col-021) **Build the collaboration load and scale test harness** · p1 · test · L · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-022](collaboration.md#sn-col-022) **Add the collaboration security and abuse test suite** · p0 · test · L · M6 Collaboration, Sharing & Sage AI
  - [SN-COL-023](collaboration.md#sn-col-023) **Operate the relay: hosting decision, rate limits, log allow-list and runbook** · p2 · infra · M · M6 Collaboration, Sharing & Sage AI
  - [SN-GOPS-007](collaboration.md#sn-gops-007) **Build the abuse-report intake and trust-and-safety response for rooms** · p1 · security · L · M6 Collaboration, Sharing & Sage AI

---

## Issues

### SN-COL-001

<a id="sn-col-001"></a>

**Deliver real-time collaboration: E2EE rooms, presence, comments and classroom moderation**

| Field | Value |
|---|---|
| GitHub | #468 |
| Type | epic |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, security, sync |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `MASVS-AUTH-1`, `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-CODE-4`, `ASVS-V17`, `ASVS-V4`, `OWASP-A01`, `OWASP-A02`, `OWASP-A04`, `CWE-306`, `CWE-200`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
Sane Notes must add **live co-editing** in M6 without breaking the two load-bearing promises: **zero server of record** (docs/adr/0004-local-first-zero-server.md) and **E2EE with keys we never hold** (docs/adr/0007-end-to-end-encryption-and-keys.md). The file-based sync engine (docs/adr/0006-sync-over-user-cloud-drives.md) reconciles in seconds-to-hours, which is fine for solo multi-device but far too slow for two students on one lecture page. docs/adr/0013-collaboration-transport.md fixes the answer: CRDT ops travel over **WebRTC data channels**, signalling does **discovery only**, an **optional relay/TURN carries only ciphertext**, peers authenticate by **Ed25519 device key**, share links carry a wrapped key in the **URL fragment**, and revocation means **rotating the items key and re-sealing** to the remaining members. Product requirements are PRD-CO-100..124 and PRD-CO-107/115 in docs/product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md §3 and §13.1: rooms, presence, live cursors, follow-a-collaborator, threaded comments, @mentions, reactions, seen/unseen activity, classroom rooms with host moderation (the CollaNote-style gap #12), offline merge, and an abuse floor for anonymous participants. This epic owns all of it plus the `services/relay/` service (docs/architecture/overview.md §4) and the load/security test suites. Sharing UI, capability links, roles and cryptographic revocation live in the sibling epic [SN-SHR-001](sharing-export.md#sn-shr-001); crypto primitives in [SN-CRY-001](security.md#sn-cry-001); the durable fallback path in [SN-SYNC-001](sync.md#sn-sync-001).

#### Scope
**In:** the transport spike and protocol specification; the pure-Dart session state machine and frame codec; the WebRTC transport with STUN/TURN; peer authentication and membership proof; the ciphertext-only signalling + catch-up relay and its non-authoritative invariant guard; join-a-room flow; presence, live cursors, follow-a-collaborator; live role enforcement and the Free/Pro gate; threaded comments, comments panel, mentions, reactions, seen/unseen; classroom rooms, host moderation, abuse floor; offline queue and reconciliation; load/scale and security/abuse test suites; relay operations.
**Out:** export/import and the Share overlay UI ([SN-SHR-001](sharing-export.md#sn-shr-001)); key hierarchy, sealing and revocation primitives ([SN-CRY-001](security.md#sn-cry-001), [SN-CRY-018](security.md#sn-cry-018)); file-based sync ([SN-SYNC-001](sync.md#sn-sync-001)); the CRDT model itself ([SN-CORE-003](sync.md#sn-core-003)); Sage AI over shared content ([SN-AI-001](ai.md#sn-ai-001)); study tools ([SN-STDY-001](study.md#sn-stdy-001)).

#### Acceptance criteria
- [ ] Every child below is delivered with its named test files and its PRD-CO / TM-* / MASVS IDs.
- [ ] M6 exit gate holds (docs/roadmap.md M6): the relay only ever forwards **ciphertext**; a relay compromise leaks no plaintext; removing a collaborator rotates keys and denies their next sync.
- [ ] Two devices editing the same page concurrently converge with **all strokes present** and no conflict copies (PRD-CO-100/105).
- [ ] A 30-peer room stays interactive and a 100-participant classroom runs host-broadcast without mesh melt-down (PRD-CO-102/124), proven by [SN-COL-021](collaboration.md#sn-col-021).
- [ ] A Free participant can fully take part in a Pro owner's room (PRD-CO-106).
- [ ] A packet capture of signalling, relay and TURN traffic contains no plaintext note content, no key material and no fragment values (PRD-CO-000/101).

#### Technical notes
Protocol, session state machine and frame codec are **pure Dart** in `packages/sane_sync/lib/src/collab/` (sane_sync already depends on `sane_core` + `sane_crypto`, so no new package and no DAG violation — CLAUDE.md §3); the WebRTC binding and all UI live in `app/lib/collab/` because `flutter_webrtc` is a Flutter plugin and pure-Dart packages must not import `package:flutter`. The docs do not name a home for collaboration code, so this split is the decision recorded here and in [SN-COL-003](collaboration.md#sn-col-003). Live frames are **verbatim** the encrypted op-log record frames of docs/architecture/file-format.md §3.3 (24-byte XChaCha20 nonce + ciphertext + 16-byte Poly1305 tag, AAD = magic || formatVersion || deviceId || segmentSeq || recordIndex), so the live path and the file path carry interchangeable data (ADR-0013 decision 1). Keys come from docs/architecture/crypto.md §7 (items key IK, share key SK sealed per member via X25519; Ed25519 device signing key). Relay config is read from `SANE_RELAY_URL` per docs/architecture/overview.md §7.1.

#### Security & privacy
This epic adds two new network edges (signalling/relay and TURN) to trust boundary TB1 with TA4 (malicious relay) as the primary adversary. Threats: TM-S-03 (unauthorised peer joins), TM-I-09 (share-link fragment leakage), TM-T-01/TM-T-02 (forged or replayed ops), TM-D-03 (relay flood), TM-R-01/TM-R-02 (attribution and content-free service logs), TM-P-02 (identifiability at the relay), TM-P-04 (presence/typing timing metadata). Controls: app-layer E2EE for every frame (MASVS-CRYPTO-1/2), peer auth by public key (MASVS-AUTH-1, CWE-306), room-secret-encrypted signalling (MASVS-NETWORK-1, ASVS-V17), per-peer rate limits (CWE-400), content-free relay logging (MASVS-PRIVACY-1/2), no dynamic code from peers (MASVS-CODE-4). docs/security/threat-model.md must gain the collaboration rows in the same PR as [SN-COL-003](collaboration.md#sn-col-003).

#### UX notes
Collaboration extends existing design surfaces rather than inventing a new screen: the **Share overlay** (docs/design/screens-and-flows.md §10) starts and configures sharing, and the **Editor** (§7) gains a presence rail, a live banner, remote cursors, a comments panel and a classroom host bar. All of these use `sane_ui` tokens ([SN-DS-002](design-system.md#sn-ds-002)) and must render in all **17 looks** in light and dark, meet 44 pt / 48 dp targets and >= 4.5:1 contrast, and be fully keyboard reachable on web (PRD-CO-315/316/320). Children own their specific empty/loading/error/offline states.

#### Test plan
Aggregate: `packages/sane_sync/test/collab/`, `app/test/collab/`, `services/relay/test/`, `app/integration_test/collab_session_test.dart`, the scale harness [SN-COL-021](collaboration.md#sn-col-021) and the security/abuse suite [SN-COL-022](collaboration.md#sn-col-022). Each child names its own files.

#### Dependencies
Cross-epic: [SN-CORE-003](sync.md#sn-core-003) (CRDT semantics), [SN-CRY-001](security.md#sn-cry-001)/[SN-CRY-018](security.md#sn-cry-018) (keys, sealing, re-seal on revoke), [SN-SYNC-001](sync.md#sn-sync-001)/[SN-SYNC-002](sync.md#sn-sync-002) (op-log segments and the durable fallback), [SN-SHR-001](sharing-export.md#sn-shr-001)/[SN-SHR-013](sharing-export.md#sn-shr-013)/[SN-SHR-017](sharing-export.md#sn-shr-017) (capability links, roles, cryptographic revocation), [SN-AUTH-001](auth.md#sn-auth-001) (identity and guest mode), [SN-BILL-001](billing.md#sn-bill-001) (Pro gate), [SN-ED-001](editor.md#sn-ed-001) (editor canvas the collaboration UI attaches to).

### Children
- [ ] [SN-COL-002](collaboration.md#sn-col-002) SPIKE: Dart WebRTC stack, signalling protocol and TURN strategy
- [ ] [SN-COL-003](collaboration.md#sn-col-003) Collaboration protocol spec: room ids, room secret, frame schema
- [ ] [SN-COL-004](collaboration.md#sn-col-004) Session state machine + op-frame codec in sane_sync
- [ ] [SN-COL-005](collaboration.md#sn-col-005) WebRTC data-channel transport with STUN/TURN and reconnect
- [ ] [SN-COL-006](collaboration.md#sn-col-006) Peer authentication + membership proof + op attribution
- [ ] [SN-COL-007](collaboration.md#sn-col-007) Ciphertext-only signalling and catch-up relay (services/relay)
- [ ] [SN-COL-008](collaboration.md#sn-col-008) Relay invariant guard: no keys, no plaintext, no note store
- [ ] [SN-COL-009](collaboration.md#sn-col-009) Join-a-room flow from a share link (consent, guest, identity)
- [ ] [SN-COL-010](collaboration.md#sn-col-010) Presence roster (colours, current page, join/leave)
- [ ] [SN-COL-011](collaboration.md#sn-col-011) Live cursors (ephemeral, throttled to the latency budget)
- [ ] [SN-COL-012](collaboration.md#sn-col-012) Follow a collaborator (viewport mirroring + stop following)
- [ ] [SN-COL-013](collaboration.md#sn-col-013) Live role enforcement + Free/Pro collaboration gate
- [ ] [SN-COL-014](collaboration.md#sn-col-014) Threaded comments as CRDT objects with anchors
- [ ] [SN-COL-015](collaboration.md#sn-col-015) Comments panel: filters, jump-to-anchor, reactions
- [ ] [SN-COL-016](collaboration.md#sn-col-016) @mentions + content-free notifications + seen/unseen badges
- [ ] [SN-COL-017](collaboration.md#sn-col-017) Classroom rooms: host broadcast + per-participant copies
- [ ] [SN-COL-018](collaboration.md#sn-col-018) Host moderation controls (admit, mute, lock, spotlight, end)
- [ ] [SN-COL-019](collaboration.md#sn-col-019) Room abuse floor: draw approval, rate limits, wipe, report
- [ ] [SN-COL-020](collaboration.md#sn-col-020) Offline edit queue + cloud-drive reconciliation + room re-form
- [ ] [SN-COL-021](collaboration.md#sn-col-021) Collaboration load and scale test harness
- [ ] [SN-COL-022](collaboration.md#sn-col-022) Collaboration security and abuse test suite
- [ ] [SN-COL-023](collaboration.md#sn-col-023) Relay deployment, rate limits, log allow-list and runbook

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-002

<a id="sn-col-002"></a>

**SPIKE: choose the Dart WebRTC stack, signalling protocol and TURN strategy**

| Field | Value |
|---|---|
| GitHub | #498 |
| Type | spike |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | collaboration, perf |
| Size | M |
| SDLC | design |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | — |
| Security controls | `MASVS-NETWORK-1`, `MASVS-CODE-3`, `ASVS-V17`, `OWASP-A06` |
| Extra labels | agent-ready |

#### Context
docs/adr/0013-collaboration-transport.md is **Proposed**, not Accepted, and its "Notes / follow-ups (revisit at M6)" section lists three things that must be measured before any collaboration code is written: (1) **verify** `flutter_webrtc` maturity across iOS, iPadOS, Android and web; (2) decide whether to reuse an existing signalling protocol or roll a minimal one; (3) decide TURN hosting (managed vs self-hosted vs BYO) and whether presence needs the relay at all for small groups. The ADR also asks whether a Dart WebRTC stack plus our own encrypted frames is simpler than bridging a JS provider such as y-webrtc. Getting this wrong is expensive: the transport choice determines the platform matrix, the binary size, and whether the web PWA (docs/adr/0010-web-pwa-strategy.md) can join rooms at all. This spike is time-boxed and ends in a **written decision** that flips ADR-0013 to Accepted (or records the pivot), exactly as CLAUDE.md §11 requires for architectural decisions.

#### Scope
**In:** a throw-away prototype in `tools/collab_spike/` that opens a data channel between two clients on each reference platform and streams synthetic 100-byte frames; measurement of connection setup time, per-frame round-trip latency, throughput, CPU and battery cost; a NAT-traversal matrix (same LAN, two NATs, symmetric NAT/CGNAT needing TURN); a written comparison of `flutter_webrtc` vs a web-only `RTCPeerConnection` JS-interop path vs bridging a JS CRDT provider; a recommendation on signalling (minimal custom JSON-over-WebSocket vs an existing protocol) and TURN hosting with cost estimates.
**Out:** production transport code ([SN-COL-005](collaboration.md#sn-col-005)); the relay service ([SN-COL-007](collaboration.md#sn-col-007)); any protocol wire format ([SN-COL-003](collaboration.md#sn-col-003)); the hosting decision itself, which is a maintainer call fed by this spike ([SN-COL-023](collaboration.md#sn-col-023)).

#### Acceptance criteria
- [ ] Prototype connects two peers and sustains >= 50 frames/second of 100-byte payloads for 10 minutes on iPadOS, Android and Chrome desktop web, with the measured numbers recorded.
- [ ] Median peer-to-peer round-trip latency on a healthy LAN is reported per platform; the report states whether the <= 100 ms remote-cursor bar of PRD-CO-104 is reachable, and with how much headroom.
- [ ] Connection-setup time is reported for: same LAN (host candidates), two NATs (STUN/srflx), symmetric NAT (TURN relay).
- [ ] The NAT matrix records at least one case that **requires** TURN, proving the fallback path is exercised, plus the bandwidth cost of relaying one 30-minute session.
- [ ] Binary-size delta of adding the chosen stack is measured for iOS, Android and web builds.
- [ ] A decision document lands at `docs/adr/0013-collaboration-transport.md` (Status: Accepted, with a Measurements section) or a new ADR if the recommendation contradicts ADR-0013; the open follow-ups in its Notes section are struck through or answered.
- [ ] Spike code is deleted or clearly quarantined under `tools/collab_spike/` with a README saying it is not production code.

#### Technical notes
Use `flutter_webrtc` (pub) as the primary candidate and plain `RTCPeerConnection` via `dart:js_interop` as the web comparison. Run the prototype against a public STUN server plus a throw-away `coturn` instance for the TURN leg; do not commit any TURN credential (CLAUDE.md §7 rule 2 — use `--dart-define`). Measure with `tools/perf_harness` conventions so numbers are comparable to [SN-PERF-002](perf.md#sn-perf-002). Check each candidate against docs/platform/compatibility-matrix.md (minimum OS versions) and docs/platform/web.md (Safari/Firefox WebRTC quirks). Record dependency health (last release, open CVEs via OSV) because a native WebRTC dependency is a supply-chain surface (MASVS-CODE-3).

#### Security & privacy
Threats reviewed during the spike: TM-S-03 (peer spoofing at connection setup), TM-I-01 (anything readable on the wire), TM-P-02 (IP address exposure to peers — a real privacy consequence of P2P, since every peer learns every other peer's IP). The spike must explicitly record whether the chosen stack allows forcing `iceTransportPolicy: 'relay'` so a privacy-sensitive user can hide their IP behind TURN, and whether ICE candidate filtering is available. No real note content is used in the prototype; synthetic frames only. IDs: MASVS-NETWORK-1, MASVS-CODE-3, ASVS-V17, OWASP-A06.

#### UX notes
No production UI. The report must state the user-visible consequences of each option: how long "Connecting..." lasts in each NAT case, what a failed connection looks like, and whether an "always relay (hide my IP)" setting is feasible for the Settings privacy section (docs/design/screens-and-flows.md §12).

#### Test plan
Manual, scripted runs on the three reference devices from `tools/device_lab/`; raw measurements committed as `docs/research/collab-transport-spike.md` (table of latency/setup/throughput/size per platform and NAT case). No production tests.

#### Dependencies
None. Blocks [SN-COL-003](collaboration.md#sn-col-003), [SN-COL-005](collaboration.md#sn-col-005) and [SN-COL-007](collaboration.md#sn-col-007).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-003

<a id="sn-col-003"></a>

**Specify the collaboration session protocol: room ids, room secret and frame schema**

| Field | Value |
|---|---|
| GitHub | #499 |
| Type | design |
| Priority | p0 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | collaboration, security |
| Size | M |
| SDLC | design |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-002](collaboration.md#sn-col-002) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `MASVS-AUTH-1`, `ASVS-V17`, `ASVS-V11`, `OWASP-A02`, `CWE-330`, `CWE-323` |
| Extra labels | agent-ready |

#### Context
docs/adr/0013-collaboration-transport.md ends with an explicit instruction: "Specify the room-id / room-secret derivation and the share-link format precisely (fragment schema, key wrapping) in a **companion architecture doc before M6**." Nothing may be implemented until that document exists, because every later issue depends on exact byte-level agreement: how a room id is derived from a notebook so two clients independently compute the same id without a server telling them; how the room secret encrypts signalling so an untrusted signalling server cannot MITM peer setup (the y-webrtc pattern, ADR-0013 decision 2); what a live frame looks like on the wire; and how a peer proves membership. Getting derivation wrong leaks notebook identity to the signalling server (TM-P-01 linkability); getting nonce discipline wrong destroys the AEAD guarantee (docs/architecture/crypto.md §3). This issue writes the spec and updates the threat model in the same PR, as docs/security/threat-model.md §8.2 requires for a new trust-boundary crossing.

#### Scope
**In:** a new `docs/architecture/collaboration.md` covering: room id derivation `roomId = HKDF-SHA-256(IK, info="sane/collab/roomid/v1", salt=notebookId)` truncated to 128 bits; room secret derivation with a distinct `info` label; the signalling message schema (join, offer, answer, candidate, leave) and how it is sealed under the room secret; the live frame envelope (type, senderDeviceId, HLC, payload) wrapping the file-format §3.3 encrypted record verbatim; presence and cursor frame types marked ephemeral/never-persisted; the membership-proof handshake; protocol version negotiation and forward-compatibility rules; the exact set of fields the relay may see in cleartext; and the ADR-0013 status flip to Accepted. Threat-model rows added for the signalling server, relay, TURN and peers.
**Out:** implementation ([SN-COL-004](collaboration.md#sn-col-004), [SN-COL-005](collaboration.md#sn-col-005), [SN-COL-007](collaboration.md#sn-col-007)); the share-link fragment format itself, which is owned by [SN-SHR-013](sharing-export.md#sn-shr-013) and only referenced here.

#### Acceptance criteria
- [ ] `docs/architecture/collaboration.md` exists and specifies, unambiguously enough to implement twice: room id derivation, room secret derivation, signalling schema, frame envelope, handshake, versioning, and the cleartext-to-relay field list.
- [ ] The room id is derived from the items key (IK), not from the notebook id alone, so the signalling server cannot correlate a room to a known notebook id; the doc states the entropy (>= 128 bits) and the CSPRNG requirement (CWE-330).
- [ ] Nonce discipline is specified per channel: XChaCha20 random 192-bit nonces for frames; the doc forbids nonce reuse across the live and file paths and says how that is guaranteed (CWE-323).
- [ ] The cleartext-to-relay list is minimal and justified field by field (room id, opaque peer id, frame length, timestamp); anything else is an error.
- [ ] Presence and cursor frames are specified as **ephemeral**: never appended to an op-log segment, never persisted, and droppable under load.
- [ ] A protocol version byte is defined with a documented rule for rejecting unknown versions (fail closed, show "update required").
- [ ] docs/security/threat-model.md gains rows for the signalling server, relay, TURN and malicious peer in the same PR; docs/adr/0013-collaboration-transport.md moves to **Accepted** and links the new doc.

#### Technical notes
Derivations use HKDF-SHA-256 with distinct `info` labels exactly as docs/architecture/crypto.md §2 prescribes (one secret expands into purpose keys; never reuse a label). Frames reuse the encrypted record layout of docs/architecture/file-format.md §3.3 including its AAD tuple, so a receiving peer verifies the same Poly1305 tag it would verify off disk, and an accepted frame can be persisted into the local mirror of the sender's segment without re-encryption. Membership proof follows ADR-0013 decision 6: a peer presents a validly-sealed IK/SK (X25519 sealed box per docs/architecture/crypto.md §7) and signs a server-independent challenge with its Ed25519 device key from [SN-CRY-019](security.md#sn-cry-019). Write the doc in the house style (audience: an agent with zero context), link it from docs/architecture/overview.md Appendix B and from CLAUDE.md §14's reading table.

#### Security & privacy
This is the document that fixes the mitigations for TM-S-03 (unauthorised peer), TM-T-01/T-02 (forged, replayed or reordered frames), TM-I-01 (relay sees only ciphertext), TM-P-01/P-02 (room-id linkability, identifiability at the relay) and TM-P-04 (traffic-shape detectability — the doc must say whether frames are padded and record the residual risk honestly as ADR-0013 does). Controls: HKDF label separation and AEAD reuse (MASVS-CRYPTO-1/2), sealed signalling (MASVS-NETWORK-1, ASVS-V17), public-key peer auth (MASVS-AUTH-1), fail-closed version handling (ASVS-V11). IDs: MASVS-CRYPTO-1, MASVS-CRYPTO-2, MASVS-NETWORK-1, MASVS-AUTH-1, ASVS-V17, ASVS-V11, OWASP-A02, CWE-330, CWE-323.

#### UX notes
The spec drives three user-visible strings the doc must name so later UI issues use consistent language: the connecting state, the "connected via relay" state (honest about TURN carrying the traffic), and the "update required" state on a protocol-version mismatch. No screens here; the surfaces are specified in [SN-COL-009](collaboration.md#sn-col-009) and [SN-COL-010](collaboration.md#sn-col-010) against docs/design/screens-and-flows.md §7/§10.

#### Test plan
Docs-only, but the spec must ship **test vectors** committed as `packages/sane_sync/test/collab/fixtures/protocol_vectors.json` (known IK -> expected roomId, known key+nonce+payload -> expected frame bytes) so [SN-COL-004](collaboration.md#sn-col-004) can assert against them and a second implementation can be verified. Review by CODEOWNERS for `/docs/security/` (CLAUDE.md §5).

#### Dependencies
[SN-COL-002](collaboration.md#sn-col-002) (the transport choice constrains the signalling schema). Reads [SN-CRY-002](security.md#sn-cry-002), [SN-CRY-018](security.md#sn-cry-018), [SN-CRY-019](security.md#sn-cry-019) and [SN-SHR-013](sharing-export.md#sn-shr-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-004

<a id="sn-col-004"></a>

**Implement the collab session state machine and op-frame codec in sane_sync**

| Field | Value |
|---|---|
| GitHub | #500 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | collaboration, sync |
| Size | L |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-003](collaboration.md#sn-col-003), [SN-CORE-003](sync.md#sn-core-003), [SN-SYNC-002](sync.md#sn-sync-002) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-CODE-4`, `ASVS-V11`, `ASVS-V17`, `OWASP-A08`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
The live path is a **transport, not a second data model** (docs/adr/0013-collaboration-transport.md, Consequences). This issue builds the transport-agnostic core of it: a pure-Dart session object that owns room lifecycle, peer bookkeeping, outbound batching and inbound validation, plus the codec that turns local CRDT ops into encrypted frames and back. Keeping it pure Dart and transport-free means it is unit-testable headlessly with an in-memory fake transport (the same discipline `sane_sync` already uses for cloud drives with its `CloudDriveAdapter` fake, [SN-SYNC-005](sync.md#sn-sync-005)), and means the WebRTC dependency stays out of the package DAG. Requirements: PRD-CO-100 (ops merge with the add-wins/LWW/HLC model so concurrent edits never lose data) and PRD-CO-101 (payloads are E2E-encrypted; the transport is dumb).

#### Scope
**In:** `CollabSession` with an explicit state machine (`idle -> joining -> connected -> degraded -> left`, plus `paused(noKey)`); an abstract `CollabTransport` interface (send frame, frame stream, peer events) and an in-memory `FakeCollabTransport`; the frame codec (encode a local `Op` into a file-format §3.3 encrypted record and wrap it in the protocol envelope; decode, verify tag, reject on failure); outbound **batching** (coalesce a writing burst, target <= 50 ms of buffering or 16 KB, whichever first) and back-pressure when the channel is saturated; inbound de-duplication and idempotent application through the existing CRDT merge; per-peer inbound budgets (max frames/second, max frame size) enforced at the codec boundary; ephemeral frame types routed to listeners without ever touching the op-log.
**Out:** the WebRTC implementation ([SN-COL-005](collaboration.md#sn-col-005)); peer authentication ([SN-COL-006](collaboration.md#sn-col-006)); presence/cursor semantics ([SN-COL-010](collaboration.md#sn-col-010), [SN-COL-011](collaboration.md#sn-col-011)); offline queueing and cloud reconciliation ([SN-COL-020](collaboration.md#sn-col-020)).

#### Acceptance criteria
- [ ] `CollabSession` is pure Dart: `packages/sane_sync` still passes the arch-lint `package:flutter` ban (CLAUDE.md §3).
- [ ] Round-trip: an op encoded and decoded through the codec yields a byte-identical `Op` and matches the committed vectors from [SN-COL-003](collaboration.md#sn-col-003).
- [ ] A frame with a flipped byte, a wrong AAD tuple, an unknown protocol version or an oversized length is **rejected with a `Result` failure**, does not partially apply, and does not throw across the package boundary (CLAUDE.md §6).
- [ ] Replaying a previously applied frame changes no state (CRDT idempotence) and is counted, not logged with content.
- [ ] Two `CollabSession`s over the fake transport, each applying 5,000 interleaved ops, converge to identical document state with all strokes present (PRD-CO-100).
- [ ] Outbound batching holds a burst of 200 stroke-point ops into <= 5 frames; end-to-end added latency over the fake transport is < 50 ms at p95.
- [ ] A peer exceeding its inbound budget (default 200 frames/s or 256 KB/s) is throttled and surfaced as a session event; the session never blocks the UI isolate.
- [ ] Every state transition is observable as a typed event; `SaneLog` output contains no op payloads, coordinates, keys or peer identifiers beyond short opaque hashes.

#### Technical notes
Add `packages/sane_sync/lib/src/collab/collab_session.dart`, `collab_transport.dart`, `frame_codec.dart`, `frame_types.dart`, and `fake_collab_transport.dart` (test-only export). Reuse the encrypted-record builder already used for segments ([SN-SYNC-002](sync.md#sn-sync-002)) rather than reimplementing AEAD; keys arrive as a handle from `sane_crypto` ([SN-CRY-002](security.md#sn-cry-002)), never as raw bytes held longer than the call. Ops and HLC semantics come from `sane_core` ([SN-CORE-003](sync.md#sn-core-003)); merging reuses the existing CRDT apply path so live and file merges cannot diverge. Errors are `Result<T, Failure>` sealed types. Run the session off the UI isolate (the sync isolate of docs/architecture/overview.md §6) — the hot draw path must never await it (CLAUDE.md §8).

#### Security & privacy
Every inbound frame is **untrusted input from a semi-trusted peer** (TA7) that may be relayed by an untrusted service (TA4). Controls: verify the AEAD tag before using any decrypted byte and fail closed (CLAUDE.md §7 rule 1, TM-T-01); reject replayed/rolled-back frames via HLC and per-device sequence (TM-T-02); bound resources before decode with explicit frame-size and rate caps (TM-D-03, CWE-400); validate schema/type before dispatch (CWE-20); no dynamic code or eval from frame content (MASVS-CODE-4). No content, coordinates or key material may reach logs (TM-I-05). IDs: MASVS-CRYPTO-2, MASVS-CODE-4, ASVS-V11, ASVS-V17, OWASP-A08, CWE-20, CWE-400.

#### UX notes
No UI, but the session's state machine is the source of truth for the strings shown by [SN-COL-009](collaboration.md#sn-col-009) and [SN-COL-010](collaboration.md#sn-col-010): Connecting, Live, Reconnecting (degraded), Paused (no key), Left. `degraded` must be a first-class state so the editor can show "Saved locally, syncing later" instead of an error — collaboration failure must never look like data loss.

#### Test plan
`packages/sane_sync/test/collab/frame_codec_test.dart` (vectors, tamper, version, size caps), `collab_session_test.dart` (state machine, batching, back-pressure, budgets), `collab_convergence_test.dart` (two sessions, 5,000 interleaved ops, identical final state), `collab_replay_test.dart` (idempotence), and a no-PII log assertion in `packages/sane_sync/test/collab/collab_log_redaction_test.dart`.

#### Dependencies
[SN-COL-003](collaboration.md#sn-col-003) (protocol + vectors), [SN-CORE-003](sync.md#sn-core-003) (CRDT), [SN-SYNC-002](sync.md#sn-sync-002) (encrypted record writer/reader).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-005

<a id="sn-col-005"></a>

**Implement the WebRTC data-channel transport with STUN, TURN and reconnect**

| Field | Value |
|---|---|
| GitHub | #501 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | collaboration, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-002](collaboration.md#sn-col-002), [SN-COL-004](collaboration.md#sn-col-004) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-NETWORK-2`, `MASVS-PRIVACY-1`, `ASVS-V17`, `OWASP-A02`, `CWE-300` |
| Extra labels | agent-ready |

#### Context
ADR-0013 decision 1 puts live CRDT ops on **WebRTC data channels, peer to peer**, with STUN for NAT discovery and a TURN relay when traversal fails — acceptable precisely because the payload is already E2E-encrypted so TURN carries only ciphertext (decision 3). This issue implements the concrete `CollabTransport` from [SN-COL-004](collaboration.md#sn-col-004) on top of the stack chosen by the spike [SN-COL-002](collaboration.md#sn-col-002), on all five surfaces including the web PWA (docs/adr/0010-web-pwa-strategy.md). It must be honest about degradation: when a peer cannot be reached the session drops to `degraded` and the durable cloud-drive path ([SN-SYNC-001](sync.md#sn-sync-001)) still carries the edits, so a failed connection is never data loss (ADR-0013, Consequences: "graceful degradation").

#### Scope
**In:** `WebRtcCollabTransport` implementing `CollabTransport`; peer-connection lifecycle (offer/answer/ICE via the sealed signalling messages of [SN-COL-003](collaboration.md#sn-col-003)); ordered/reliable data channel for ops and a separate unordered/unreliable channel for ephemeral presence and cursor frames; ICE server configuration from `--dart-define SANE_RELAY_URL` plus the TURN credentials fetched as short-lived tokens; `iceTransportPolicy: relay` privacy option; reconnect with exponential backoff and jitter; connection-quality reporting (RTT, packet loss) for the presence UI; clean teardown that closes channels, stops ICE gathering and releases native resources.
**Out:** signalling/relay server ([SN-COL-007](collaboration.md#sn-col-007)); membership proof ([SN-COL-006](collaboration.md#sn-col-006)); mesh-size handling and star fallback ([SN-COL-017](collaboration.md#sn-col-017)); UI ([SN-COL-009](collaboration.md#sn-col-009), [SN-COL-010](collaboration.md#sn-col-010)).

#### Acceptance criteria
- [ ] Two peers on the same LAN establish a data channel and exchange ops with p95 added latency <= 100 ms (PRD-CO-104 cursor bar) measured on iPadOS, Android and Chrome desktop.
- [ ] Two peers behind separate NATs connect via STUN; with symmetric NAT they connect via TURN, and the session reports `connected via relay` rather than failing.
- [ ] Ephemeral frames use the unordered/unreliable channel and are dropped, not queued, when the channel is congested; op frames are never dropped.
- [ ] Losing the network moves the session to `degraded` within 5 s, edits continue locally, and reconnect succeeds without duplicate application of ops already delivered (idempotence from [SN-COL-004](collaboration.md#sn-col-004)).
- [ ] Backoff is exponential with jitter, capped at 30 s, and stops entirely when the user leaves the room; no reconnect loop runs in the background after leaving.
- [ ] Turning on the privacy option forces `iceTransportPolicy: relay` so no peer learns the user's IP address; the setting is honoured on every platform that supports it and is reported as unavailable where it is not.
- [ ] Transport work runs off the UI isolate; a `flutter run --profile` timeline during a live session shows no frame over 16.7 ms attributable to transport callbacks (CLAUDE.md §8).
- [ ] No TURN credential, room secret or key is ever written to logs or persisted to disk.

#### Technical notes
Implement in `app/lib/collab/transport/webrtc_transport.dart` (Flutter layer — `flutter_webrtc` is a Flutter plugin, so it cannot live in pure-Dart `sane_sync`; this placement is the decision recorded in [SN-COL-001](collaboration.md#sn-col-001) Technical notes). Register it into the session through a Riverpod provider in `app/lib/collab/collab_providers.dart` (docs/adr/0003-state-management-and-app-structure.md — no global singletons). On web, feature-detect and fall back to a `dart:js_interop` `RTCPeerConnection` path per docs/platform/web.md. TURN credentials must be short-lived and fetched at join time from the relay ([SN-COL-007](collaboration.md#sn-col-007)), never compiled in (CLAUDE.md §7 rule 2). Report RTT/loss from `getStats()` on a 2 s cadence for [SN-COL-010](collaboration.md#sn-col-010).

#### Security & privacy
Threats: TM-S-03 (a peer we have not authenticated — this transport must hand every new peer to [SN-COL-006](collaboration.md#sn-col-006) before any op is applied), TM-I-01 (TURN sees only ciphertext), TM-P-02 (IP exposure to peers; mitigated by the relay-only option and disclosed in the privacy dashboard), TM-D-03 (flood — caps enforced by the codec). DTLS-SRTP secures the channel in transit but is **not** the confidentiality control; the app-layer AEAD is (defence in depth, ASVS-V17). No cleartext fallback: if DTLS cannot be established the session fails closed (MASVS-NETWORK-1/2, CWE-300). IDs: MASVS-NETWORK-1, MASVS-NETWORK-2, MASVS-PRIVACY-1, ASVS-V17, OWASP-A02, CWE-300.

#### UX notes
The transport feeds three presence-rail states designed in [SN-COL-010](collaboration.md#sn-col-010): **Live** (direct), **Live (via relay)** with a tooltip explaining that traffic is relayed but unreadable, and **Reconnecting** with the honest subtitle "Your edits are saved on this device." Never show a raw ICE or DTLS error to the user. States use `sane_ui` tokens and must be legible in all 17 looks, light and dark, with a non-colour cue for connection quality (PRD-CO-311).

#### Test plan
`app/test/collab/webrtc_transport_test.dart` (lifecycle, backoff, teardown, relay-only policy) with a mocked peer-connection facade; `app/integration_test/collab_transport_latency_test.dart` (two in-process peers, latency and drop behaviour); manual NAT matrix runs recorded in the PR per [SN-COL-002](collaboration.md#sn-col-002)'s method; a leak test asserting all native peer connections are disposed after leaving a room.

#### Dependencies
[SN-COL-002](collaboration.md#sn-col-002) (stack choice), [SN-COL-004](collaboration.md#sn-col-004) (transport interface and codec). Coordinates with [SN-COL-007](collaboration.md#sn-col-007) (signalling, TURN credentials).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-006

<a id="sn-col-006"></a>

**Authenticate peers by device key and enforce membership proof on room join**

| Field | Value |
|---|---|
| GitHub | #502 |
| Type | security |
| Priority | p0 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-003](collaboration.md#sn-col-003), [SN-COL-004](collaboration.md#sn-col-004), [SN-CRY-018](security.md#sn-cry-018), [SN-CRY-019](security.md#sn-cry-019) |
| Security controls | `MASVS-AUTH-1`, `MASVS-AUTH-2`, `MASVS-CRYPTO-1`, `MASVS-NETWORK-1`, `ASVS-V17`, `ASVS-V6`, `OWASP-A01`, `OWASP-A07`, `CWE-306`, `CWE-287`, `CWE-294` |
| Extra labels | agent-ready |

#### Context
There is no server to enforce access control, so **membership is a cryptographic fact, not a database row**. ADR-0013 decision 6 states it plainly: peers authenticate by public key (Ed25519 device/identity keys) and "a peer that cannot prove membership (present a validly-sealed key) is not admitted to the room". This closes TM-S-03 ("malicious peer joins a share room and reads live edits", Med/High in docs/security/threat-model.md §5.1) and is what makes revocation meaningful: after [SN-SHR-017](sharing-export.md#sn-shr-017) rotates the items key and re-seals it to the remaining members, a removed member can no longer produce a valid proof and is refused at the door. Without this issue the room is effectively public to anyone who learns a room id.

#### Scope
**In:** the join handshake from [SN-COL-003](collaboration.md#sn-col-003) implemented on both sides — challenge generation, Ed25519 signature over a channel-bound challenge, verification of the peer's sealed items/share key, and admission or refusal; a `RoomMembership` view derived from the sealed-key set ([SN-CRY-018](security.md#sn-cry-018)); binding the proof to the DTLS/data-channel fingerprint so a proof cannot be replayed onto another connection; per-op attribution (`deviceId` in the HLC, signature check where the room requires signed ops, PRD-CO-R / TM-R-01); refusal handling (typed failure, bounded retry, no oracle in the error message); revocation propagation so an in-room peer whose key was rotated away is dropped at the next epoch.
**Out:** key sealing/rotation itself ([SN-CRY-018](security.md#sn-cry-018), [SN-SHR-017](sharing-export.md#sn-shr-017)); host moderation such as kick/mute ([SN-COL-018](collaboration.md#sn-col-018)); rate limiting ([SN-COL-019](collaboration.md#sn-col-019)).

#### Acceptance criteria
- [ ] A peer presenting no proof, an expired proof, a proof for another room, or a signature from an unknown device key is **refused before any frame is applied** and never appears in presence.
- [ ] A proof captured from one connection cannot be replayed on another: the challenge is bound to the data-channel/DTLS fingerprint and to the room epoch (CWE-294).
- [ ] After the owner removes a member and the items key rotates, the removed member's next join attempt is refused, and if they are still connected they are dropped within one epoch (<= 30 s), verified end to end.
- [ ] Every applied op carries a verifiable `deviceId`; ops whose signature fails verification are dropped and counted, never merged (TM-T-01).
- [ ] Refusal messages are generic ("You no longer have access to this notebook") and leak nothing about which check failed.
- [ ] Handshake completes in <= 300 ms p95 on the reference devices and never blocks the UI isolate.
- [ ] Guests (no account, PRD-CO-002/122) can still prove membership using only the capability from the share link — identity is not required, membership is.

#### Technical notes
Implement `packages/sane_sync/lib/src/collab/membership.dart` (pure Dart: challenge, verify, epoch) and wire the transport-side binding in `app/lib/collab/transport/`. Signing uses the non-exportable Ed25519 device key from [SN-CRY-019](security.md#sn-cry-019) through `sane_secure_store` — the private key never crosses back into app memory (trust boundary TB2, docs/security/threat-model.md §3). Sealed items/share keys come from [SN-CRY-018](security.md#sn-cry-018) (X25519 sealed box, docs/architecture/crypto.md §7). The room epoch increments on every IK rotation and is carried in the frame envelope so stale peers are detectable without a server. Use constant-time comparison for all proof material and `Result<T, Failure>` for every outcome.

#### Security & privacy
Primary threat TM-S-03 (unauthorised peer join), with TM-T-01 (forged ops), TM-E-01-class privilege escalation into a room, and TM-R-01 (attribution). Controls: public-key authentication with channel binding (MASVS-AUTH-1/2, CWE-287/294/306), membership = possession of a sealed key, not a claimed role (OWASP-A01), no user enumeration or failure oracle (OWASP-A07), constant-time verification (MASVS-CRYPTO-1), refuse-by-default (ASVS-V17). Privacy: the handshake must not reveal the notebook title, the member list, or any identity beyond an opaque peer id to a peer that fails the proof (TM-P-02). IDs: MASVS-AUTH-1, MASVS-AUTH-2, MASVS-CRYPTO-1, MASVS-NETWORK-1, ASVS-V17, ASVS-V6, OWASP-A01, OWASP-A07, CWE-306, CWE-287, CWE-294.

#### UX notes
Three user-visible outcomes, all rendered with `sane_ui` components in all 17 looks + dark: **admitted** (silent — you simply appear in the presence rail), **refused** (a calm sheet: "You no longer have access to this notebook" with "Ask the owner to share it again" and a link to your own copy if one exists), **dropped after revocation** (a non-alarming banner: "Access to this shared notebook ended. Your local copy is safe."). Never blame the user, never show crypto jargon. Announce the refusal sheet via `SemanticsService.announce` for screen readers (PRD-CO-330).

#### Test plan
`packages/sane_sync/test/collab/membership_test.dart` (valid/invalid/expired/wrong-room/replayed proofs, epoch bump), `app/test/security/collab_peer_auth_test.dart` (refusal path, generic errors, drop-after-revocation), `app/integration_test/collab_revocation_test.dart` (owner removes member -> next sync and next join denied, per the M6 exit gate in docs/roadmap.md). Negative tests are mandatory (CLAUDE.md §10).

#### Dependencies
[SN-COL-003](collaboration.md#sn-col-003) (handshake spec), [SN-COL-004](collaboration.md#sn-col-004) (session), [SN-CRY-018](security.md#sn-cry-018) (sealing/re-seal), [SN-CRY-019](security.md#sn-cry-019) (device keys). Interlocks with [SN-SHR-017](sharing-export.md#sn-shr-017) (cryptographic revocation).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-007

<a id="sn-col-007"></a>

**Build the ciphertext-only signalling and catch-up relay in services/relay**

| Field | Value |
|---|---|
| GitHub | #503 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | collaboration, security |
| Size | L |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-003](collaboration.md#sn-col-003) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `ASVS-V17`, `ASVS-V16`, `OWASP-A01`, `OWASP-A04`, `OWASP-A09`, `CWE-400`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
Pure P2P is unreliable in production: NAT traversal fails, late joiners have nothing to catch up from, and presence needs somewhere to rendezvous (ADR-0013 Context, research §1/§7). So ADR-0013 decisions 2 and 4 add two tiny services, both **untrusted by design**: a **signalling** server that matches peers by an opaque room id and never sees content or keys, and an **optional relay-only catch-up** node that forwards already-encrypted updates and buffers them for late joiners while holding **no keys, storing no plaintext, and never being authoritative**. docs/architecture/overview.md §4 reserves `services/relay/` for exactly this and stresses it "NEVER stores note content". This issue builds both in one stateless service. The invariant is enforced separately and automatically by [SN-COL-008](collaboration.md#sn-col-008); deployment and rate-limit operations are [SN-COL-023](collaboration.md#sn-col-023).

#### Scope
**In:** `services/relay/` as a stateless Dart `shelf` + WebSocket service (docs are silent on the language; Dart is chosen so the service shares the repo toolchain, lints, arch-lint and CI — recorded here as the decision); room registry in memory only (room id -> connected peer ids, no content); sealed signalling message pass-through (offer/answer/candidate/join/leave, opaque to the server per [SN-COL-003](collaboration.md#sn-col-003)); the forward mode that relays opaque ciphertext frames between peers in a room; a bounded **catch-up buffer** (ring buffer of opaque frames per room, capped by count, bytes and age, evicted on room empty); short-lived TURN credential minting (HMAC-based, time-limited) if a TURN server is configured; health and metrics endpoints exposing counts only; structured logging through a strict field allow-list; graceful shutdown that drops rooms without persisting anything.
**Out:** the invariant test ([SN-COL-008](collaboration.md#sn-col-008)); deployment, autoscaling, WAF and the ops runbook ([SN-COL-023](collaboration.md#sn-col-023)); client transport ([SN-COL-005](collaboration.md#sn-col-005)); star-topology routing policy ([SN-COL-017](collaboration.md#sn-col-017)).

#### Acceptance criteria
- [ ] The service compiles and runs with **no database, no object store and no filesystem write path** for room data; the only persistence is process memory.
- [ ] A signalling message is forwarded byte-for-byte; the service never parses its sealed body and rejects any message it would need to decrypt.
- [ ] The catch-up buffer is capped (defaults: 2,000 frames, 8 MB, 10 minutes, per room) and evicts oldest-first; when a room empties, its buffer is freed within 60 s.
- [ ] Per-connection and per-room rate limits are enforced (defaults: 200 frames/s and 1 MB/s per peer, 64 peers per room) and exceeding them closes the connection with a typed reason, not a crash (TM-D-03, CWE-400).
- [ ] Logs contain only: timestamp, level, room id hash (truncated), opaque peer id, event name, byte counts, error code. A unit test asserts no other field can be logged (CWE-532, TM-R-02).
- [ ] Metrics expose connection/room/frame counts and error rates, and expose **no** room ids in plaintext and no per-user identifiers.
- [ ] TURN credentials, when issued, are valid for <= 10 minutes and are never logged; the shared secret comes from the environment, never from source (CLAUDE.md §7 rule 2).
- [ ] Restarting the service loses no user data by definition: clients reconnect and the durable state remains the users' own cloud drives ([SN-SYNC-001](sync.md#sn-sync-001)).
- [ ] The service runs behind TLS only; any plaintext listener is refused at startup.

#### Technical notes
Layout: `services/relay/bin/relay.dart`, `lib/src/room_registry.dart`, `lib/src/rate_limiter.dart`, `lib/src/catchup_buffer.dart`, `lib/src/log_allowlist.dart`, plus `pubspec.yaml` and a `Dockerfile`. Keep it a single process with no shared state so it scales horizontally behind a sticky-room load balancer; if two peers of one room land on different instances, the client falls back to direct P2P or re-joins — a documented limitation to be resolved (or not) in [SN-COL-023](collaboration.md#sn-col-023). Clients address it via `SANE_RELAY_URL` (docs/architecture/overview.md §7.1), with `mock` in dev. Follow the same lints as the rest of the repo (`very_good_analysis`, `print()` banned, `SaneLog`-style structured logging). Frames are opaque `Uint8List` — the service must not import `sane_core` or `sane_crypto`, which is also how [SN-COL-008](collaboration.md#sn-col-008) proves it holds no keys.

#### Security & privacy
The relay is **TA4 (malicious/compromised relay)** in our own threat model — build it as if it were hostile. Threats: TM-I-01 (must be unable to read anything), TM-P-02 (IP + timing identifiability — minimise retention, no access logs beyond the allow-list, no per-user identifiers), TM-D-03 (flood/abuse), TM-R-02 (connection-metadata-only logging with retention limits), plus ADR-0013's "relay becomes a de-facto server of record" architecture-drift threat. Controls: ciphertext-only forwarding (MASVS-NETWORK-1), data minimisation and short retention (MASVS-PRIVACY-1/2), rate limiting (CWE-400), log allow-list (CWE-532), TLS-only transport, structured audit events (ASVS-V16), refuse-by-default routing (OWASP-A01). IDs: MASVS-NETWORK-1, MASVS-PRIVACY-1, MASVS-PRIVACY-2, ASVS-V17, ASVS-V16, OWASP-A01, OWASP-A04, OWASP-A09, CWE-400, CWE-532.

#### UX notes
No user-facing UI, but two product-visible behaviours: the client can show "Live (via relay)" honestly when forwarding is in use ([SN-COL-005](collaboration.md#sn-col-005)), and the relay being down must degrade to P2P or to cloud-drive sync without an error dialog — the privacy dashboard copy (docs/design/screens-and-flows.md §12) should state that the relay sees only encrypted bytes and stores nothing.

#### Test plan
`services/relay/test/room_registry_test.dart`, `rate_limiter_test.dart`, `catchup_buffer_test.dart` (caps, eviction, free-on-empty), `log_allowlist_test.dart` (no field outside the allow-list can be emitted), `signalling_passthrough_test.dart` (byte-for-byte forwarding, refusal to parse bodies), and `services/relay/test/load_smoke_test.dart` (64 peers, sustained frames, no unbounded memory growth). Scale testing proper is [SN-COL-021](collaboration.md#sn-col-021).

#### Dependencies
[SN-COL-003](collaboration.md#sn-col-003) (protocol and the cleartext-to-relay field list). Feeds [SN-COL-005](collaboration.md#sn-col-005), [SN-COL-008](collaboration.md#sn-col-008), [SN-COL-017](collaboration.md#sn-col-017), [SN-COL-023](collaboration.md#sn-col-023).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-008

<a id="sn-col-008"></a>

**Enforce the relay invariant: no keys, no plaintext, no note store**

| Field | Value |
|---|---|
| GitHub | #504 |
| Type | security |
| Priority | p0 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | collaboration, security, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-007](collaboration.md#sn-col-007) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-1`, `MASVS-CODE-3`, `ASVS-V17`, `OWASP-A02`, `OWASP-A09`, `CWE-311`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context
ADR-0013 lists "relay becomes a de-facto server of record" as an architecture-drift threat and prescribes the mitigation: "relay is stateless, key-less, non-authoritative **by contract**; CI/infra check it has no note-store dependency", and in its follow-ups, "Re-affirm the 'relay never sees plaintext, never authoritative' invariant with an **automated infra test**". Drift here is insidious: someone adds a cache "just for performance", then a database "just for presence", and the zero-server promise (docs/adr/0004-local-first-zero-server.md, locked decision 3) quietly dies. This issue makes the invariant machine-checked so it cannot rot, and it is the M6 exit gate in docs/roadmap.md ("The relay only ever forwards ciphertext; a relay compromise leaks no plaintext").

#### Scope
**In:** a CI job `relay-invariant` in `.github/workflows/devsecops.yml` that fails the build if `services/relay/` gains a forbidden dependency (any database, object store, ORM, cache server client, `sane_core`, `sane_crypto`, or any filesystem write outside temp), if any route handler decodes a frame body, or if the log allow-list is widened without a CODEOWNERS review; a black-box **ciphertext-only test** that runs the relay, drives two real clients through a session with known plaintext markers, captures everything the relay observes, and asserts no marker appears in memory dumps of forwarded buffers, logs or metrics; an entropy check asserting forwarded payloads are indistinguishable from random; a retention test asserting buffers are freed when a room empties and after the age cap; documentation of the invariant in `docs/architecture/collaboration.md` and a threat-model status flip for TM-I-01 (relay leg) from Designed to Implemented.
**Out:** the relay implementation ([SN-COL-007](collaboration.md#sn-col-007)); deployment-time controls such as WAF and network policy ([SN-COL-023](collaboration.md#sn-col-023)); the wider security suite ([SN-COL-022](collaboration.md#sn-col-022)).

#### Acceptance criteria
- [ ] Adding `package:drift`, `package:redis`, an S3/GCS client, `sane_core` or `sane_crypto` to `services/relay/pubspec.yaml` fails CI with a named, actionable error.
- [ ] Adding a filesystem write outside a temp directory to `services/relay/` fails CI.
- [ ] The black-box test injects the canary strings into note content, runs a full two-client session through the relay, and asserts the canary appears **nowhere** in: relay stdout/stderr, the metrics endpoint, the catch-up buffer contents, or a heap snapshot of the relay process.
- [ ] Forwarded frame bytes pass a chi-square/entropy check consistent with random data (no plaintext markers, no CBOR magic, no stroke-shaped structure).
- [ ] Emptying a room frees its buffer within 60 s and the test proves the memory is released; frames older than the age cap are unreachable through any endpoint.
- [ ] The job runs on every PR touching `services/relay/`, `packages/sane_sync/lib/src/collab/` or `docs/architecture/collaboration.md`, and is a required check.
- [ ] docs/security/threat-model.md TM-I-01 (relay leg) and the ADR-0013 threat table cite this test as their Verification.

#### Technical notes
Implement the dependency/route checks as a small Dart script `tools/scripts/check_relay_invariant.dart` invoked by CI (so it also runs locally via `dart run`), reusing the arch-lint pattern already used for the package DAG (CLAUDE.md §3, docs/architecture/overview.md §5). The black-box test lives at `services/relay/test/invariant/ciphertext_only_test.dart` and drives the real `CollabSession` ([SN-COL-004](collaboration.md#sn-col-004)) over a loopback transport pointed at a locally spawned relay, using the protocol vectors from [SN-COL-003](collaboration.md#sn-col-003). Heap inspection can use `dart:developer` VM-service heap snapshots against the spawned relay isolate; document the approach in the test file header so a future agent can maintain it. Wire it as a required check per docs/security/devsecops-pipeline.md.

#### Security & privacy
This issue is the verification for TM-I-01 (information disclosure at the relay), TM-P-02 (identifiability through retained metadata), TM-R-02 (content-free service logs) and ADR-0013's architecture-drift row. Controls proven: encryption of everything crossing the boundary (CWE-311, MASVS-NETWORK-1), data minimisation and bounded retention (MASVS-PRIVACY-1), no content in logs (CWE-532), dependency hygiene on a service with network exposure (MASVS-CODE-3, OWASP-A09). A failure of this gate is a p0 release blocker, not a warning. IDs: MASVS-NETWORK-1, MASVS-PRIVACY-1, MASVS-CODE-3, ASVS-V17, OWASP-A02, OWASP-A09, CWE-311, CWE-532.

#### UX notes
None beyond baseline (no user-facing surface). Baseline still applies: nothing in this tooling logs note content or tokens, and the canary strings used by the test are synthetic, never real user data. The outcome is quotable in the privacy dashboard and marketing copy ("our relay is tested, every build, to be unable to read your notes") — coordinate wording with [SN-PRV-001](privacy.md#sn-prv-001).

#### Test plan
`tools/scripts/check_relay_invariant.dart` with unit tests in `tools/scripts/test/check_relay_invariant_test.dart` (positive and negative fixtures: a pubspec with a forbidden dep must fail); `services/relay/test/invariant/ciphertext_only_test.dart` (canary, entropy, retention, heap); a CI dry-run proving the job fails on a deliberately violating branch and passes on main.

#### Dependencies
[SN-COL-007](collaboration.md#sn-col-007) (the service under test). Reports into [SN-SEC-001](security.md#sn-sec-001) and the pipeline owned by [SN-CI-001](ci-cd.md#sn-ci-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-009

<a id="sn-col-009"></a>

**Build the join-a-room flow from a share link with consent and guest support**

| Field | Value |
|---|---|
| GitHub | #505 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, onboarding, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-006](collaboration.md#sn-col-006), [SN-SHR-013](sharing-export.md#sn-shr-013) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-3`, `MASVS-AUTH-1`, `ASVS-V4`, `OWASP-A01`, `CWE-601`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
A live session is entered through the **capability link** built in [SN-SHR-013](sharing-export.md#sn-shr-013): `sane.app/n/<slug>-<shortid>#k=...`, where the wrapped key rides the fragment and is never sent to a server (PRD-CO-032, ADR-0013 decision 5). PRD-CO-100 requires that a shared notebook supports a live room joined via that link, and PRD-CO-002/122 require that a **guest with no account** can join if the sharer allows. CLAUDE.md §7 rule 8 is equally firm in the other direction: "a link lands in view/confirm, never auto-mutates". So joining must be an explicit, informed act: the recipient sees who is sharing, what role they will have, that their presence and cursor will be visible to others, and what joining costs in privacy (their IP may be visible to peers unless relay-only is on). This issue owns that flow on all five surfaces, including the web reader (PRD-CO-416).

#### Scope
**In:** resolving an inbound share link into a join sheet; the join sheet UI (notebook title, owner, your role, participant count, "Join live session" / "Open read-only copy" / "Cancel"); the presence-consent line and a link to the privacy detail; display-name selection for guests (local, never uploaded, defaulting to "Guest" + initials); establishing the session ([SN-COL-004](collaboration.md#sn-col-004)) after the membership proof ([SN-COL-006](collaboration.md#sn-col-006)); the failure states (link expired, access revoked, notebook not found, protocol too old, offline); leaving a room explicitly and on app background beyond a timeout; a persistent "Live" banner in the editor while a session is active.
**Out:** minting links, roles, expiry and revocation ([SN-SHR-013](sharing-export.md#sn-shr-013), [SN-SHR-015](sharing-export.md#sn-shr-015), [SN-SHR-017](sharing-export.md#sn-shr-017)); presence rendering ([SN-COL-010](collaboration.md#sn-col-010)); classroom-specific admission ([SN-COL-018](collaboration.md#sn-col-018)); deep-link registration and App Links/Universal Links verification, owned by the notifications and system-integration epic SN-NOTF-001 and referenced here.

#### Acceptance criteria
- [ ] Opening a link **never** joins automatically: the user always sees the join sheet first, and nothing is written to the document until they confirm (CLAUDE.md §7 rule 8).
- [ ] The sheet states the role that the link grants, and joining with "Can view" grants a session that cannot emit ops ([SN-COL-013](collaboration.md#sn-col-013)).
- [ ] A guest with no account can join and take part; no sign-in wall appears (PRD-CO-002).
- [ ] The presence-consent line is shown before joining: "Others in this session will see your name, colour and cursor." Declining opens a read-only copy instead, with no presence frame ever sent.
- [ ] Every failure has a distinct, calm state with a next action: expired link, revoked access, unknown notebook, unsupported protocol version, and offline ("You are offline. Open a read-only copy?").
- [ ] Joining completes in <= 3 s p95 on a healthy LAN from tap to "Live" (setup measured in [SN-COL-002](collaboration.md#sn-col-002)); a slow join shows progress, never a frozen sheet.
- [ ] Leaving the room tears down the transport, removes the user from every peer's roster within 5 s, and stops all reconnect attempts.
- [ ] The fragment key never appears in a log, an analytics event, a crash report, a `Referer` header, or the recents/history surface (TM-I-09).
- [ ] The sheet is fully accessible: labelled controls, 44 pt / 48 dp targets, >= 4.5:1 contrast in all 17 looks light and dark, keyboard-operable and screen-reader announced on web.

#### Technical notes
UI in `app/lib/collab/ui/join_room_sheet.dart` built from `sane_ui` components ([SN-DS-003](design-system.md#sn-ds-003)); routing and fragment handling reuse `app/lib/sharing/share_link_router.dart` from [SN-SHR-013](sharing-export.md#sn-shr-013) — do not write a second parser. Session creation goes through the Riverpod providers in `app/lib/collab/collab_providers.dart`; guest identity reuses the guest-mode path from [SN-AUTH-010](auth.md#sn-auth-010) so no account object is created. On web, the fragment must be read and then **stripped from the address bar** via `history.replaceState` so it cannot be shoulder-surfed or copied out of the URL bar accidentally (docs/platform/web.md). Honour the resolved default share posture flag from [SN-SHR-020](sharing-export.md#sn-shr-020) when presenting what the link grants.

#### Security & privacy
Threats: TM-S-04 (a forged or malicious link opening a sensitive action — mitigated by view/confirm landing and allow-listed routes, CWE-601), TM-I-09 (fragment leakage through history, referrer or logs), TM-S-03 (join only after membership proof, [SN-COL-006](collaboration.md#sn-col-006)), TM-P-06 (unawareness — the presence-consent line is the LINDDUN mitigation, MASVS-PRIVACY-3). Controls: verified deep links only (MASVS-PLATFORM-1), no auto-mutation (OWASP-A01), fragment never transmitted or persisted (CWE-200), explicit informed consent before any presence signal leaves the device. IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-3, MASVS-AUTH-1, ASVS-V4, OWASP-A01, CWE-601, CWE-200.

#### UX notes
The join sheet is a new overlay in the family of the **Share** overlay (docs/design/screens-and-flows.md §10, z-20, dimmed backdrop, click-outside to close) and reuses its typography, avatar chips and segmented-control styling; the design canvas `design/Sane Notes.dc.html` has no join screen, so this follows the decisive default of CLAUDE.md §9 and leaves a `// DESIGN-OPEN:` comment linking §10. The in-editor **Live banner** sits under the toolbar next to the audio recorder bar, uses the accent token `ac` with a non-colour dot+label cue (PRD-CO-311), and must not obscure the palette dock or the focused control (PRD-CO-316). Loading state: skeleton rows in the sheet; empty state: none (a link always names one notebook); error states as listed above.

#### Test plan
`app/test/collab/join_room_sheet_test.dart` (widget: role display, consent line, decline path, all five failure states), `app/test/security/join_link_no_automutate_test.dart` (a link cannot create, modify or delete anything before confirmation), `app/integration_test/collab_join_flow_test.dart` (end-to-end link -> join -> live -> leave), golden tests `app/test/golden/collab_join_sheet_<look>_test.dart` across the 17 looks in light and dark.

#### Dependencies
[SN-COL-006](collaboration.md#sn-col-006) (membership proof), [SN-SHR-013](sharing-export.md#sn-shr-013) (capability link and router). Coordinates with [SN-AUTH-010](auth.md#sn-auth-010) (guest mode) and [SN-SHR-020](sharing-export.md#sn-shr-020) (default posture flag).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-010

<a id="sn-col-010"></a>

**Implement the presence roster with colours, current page and join/leave events**

| Field | Value |
|---|---|
| GitHub | #506 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, editor, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-004](collaboration.md#sn-col-004), [SN-COL-009](collaboration.md#sn-col-009) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `ASVS-V17`, `OWASP-A01`, `CWE-359` |
| Extra labels | agent-ready |

#### Context
PRD-CO-103 requires presence: who is in the room (avatars, a colour per participant, join/leave events) and **which page each person is on**, with an avatar appearing in the presence rail within 2 s of joining and disappearing on leave. Presence is also the most privacy-sensitive of the live signals: ADR-0013 records "presence/typing indicators leak timing metadata to peers/relay; minimise and disclose" and the LINDDUN register has TM-P-04 (detectability) for exactly this. So presence must be honest, minimal, ephemeral, and optional. This issue owns the presence data model, its propagation and the presence rail UI that the cursor ([SN-COL-011](collaboration.md#sn-col-011)), follow ([SN-COL-012](collaboration.md#sn-col-012)) and moderation ([SN-COL-018](collaboration.md#sn-col-018)) features all hang off.

#### Scope
**In:** the `Participant` value object (opaque peer id, display name, colour index, role, current page id, connection quality, joined-at); presence frames as **ephemeral** protocol frames (never persisted, never written to an op-log segment); a heartbeat with a conservative cadence (default 5 s) and a stale-peer timeout (15 s) so a crashed peer vanishes; deterministic colour assignment from the peer id so everyone sees the same colour for the same person; the presence rail UI in the editor (stacked avatar chips, overflow "+N", tap to open the participants sheet); the participants sheet (name, role, page, quality, follow action, host actions when present); join/leave toasts that are quiet by default; a per-user "Hide my presence" setting that joins without emitting presence or cursor frames.
**Out:** cursors ([SN-COL-011](collaboration.md#sn-col-011)); follow ([SN-COL-012](collaboration.md#sn-col-012)); role changes and moderation ([SN-COL-013](collaboration.md#sn-col-013), [SN-COL-018](collaboration.md#sn-col-018)); seen/unseen activity badges ([SN-COL-016](collaboration.md#sn-col-016)).

#### Acceptance criteria
- [ ] A joining participant appears in every other participant's rail within **2 s**; leaving removes them within 2 s of an explicit leave and within 15 s of an ungraceful disconnect (PRD-CO-103).
- [ ] Presence frames never reach the op-log: a session that only had presence traffic produces **zero** new segment bytes on disk, asserted by test.
- [ ] Colours are stable and identical across all clients for the same participant, and are drawn from a palette that stays distinguishable in all 17 looks, light and dark, including the colour-blind-safe option (PRD-CO-335).
- [ ] The rail shows at most 5 avatars plus an overflow count; the sheet lists everyone with their current page.
- [ ] "Hide my presence" results in **no** presence or cursor frame being emitted (verified by a transport-level assertion), while the user can still edit and still sees others.
- [ ] Presence rendering costs no more than 1 ms of frame time with 30 participants and never triggers a repaint of the ink layer (the rail is its own `RepaintBoundary`, CLAUDE.md §8).
- [ ] Heartbeat traffic is <= 200 bytes per participant per 5 s and is dropped, not queued, when the channel is congested.
- [ ] The rail and sheet are accessible: each avatar exposes name + role + page as a `Semantics` label, targets are >= 44 pt / 48 dp, contrast >= 4.5:1, and the sheet is keyboard-navigable on web (PRD-CO-320/321).

#### Technical notes
Model and diffing in `packages/sane_sync/lib/src/collab/presence.dart` (pure Dart, ephemeral frame types from [SN-COL-003](collaboration.md#sn-col-003)); state in `app/lib/collab/presence_controller.dart` as a Riverpod notifier; UI in `app/lib/collab/ui/presence_rail.dart` and `participants_sheet.dart` using `sane_ui` avatar/chip components ([SN-DS-003](design-system.md#sn-ds-003)). Colour index = stable hash of the peer id modulo the palette size, with the palette defined as tokens in `sane_ui` so every look supplies its own accessible variant ([SN-DS-002](design-system.md#sn-ds-002)). Current page updates are coalesced (emit at most one page-change frame per 500 ms). Connection quality comes from the transport's `getStats()` sampling in [SN-COL-005](collaboration.md#sn-col-005). The rail lives in the editor chrome next to the page rail and must respect the left-handed toggle and RTL mirroring (PRD-CO-337/372).

#### Security & privacy
Threats: TM-P-04 (detectability — presence reveals *that* and *when* a person is working, even without content), TM-P-02 (identifiability — display names and stable colours are pseudonymous identifiers; keep peer ids opaque and per-room so activity is not linkable across notebooks), TM-I-07 (a presence name could leak in a notification or screenshot — excerpt-free by design). Controls: presence is **opt-outable** and disclosed at join time ([SN-COL-009](collaboration.md#sn-col-009), MASVS-PRIVACY-3), frames are ephemeral and minimal (MASVS-PRIVACY-1, CWE-359), per-room opaque ids prevent cross-notebook linkage, everything stays inside the E2EE channel so the relay sees only ciphertext (MASVS-NETWORK-1, ASVS-V17). Document the residual metadata leak honestly in the privacy dashboard (TM-P-06). IDs: MASVS-PRIVACY-1, MASVS-PRIVACY-3, MASVS-NETWORK-1, ASVS-V17, OWASP-A01, CWE-359.

#### UX notes
The presence rail is a new editor surface; the design canvas (docs/design/screens-and-flows.md §7) has no collaboration chrome, so it follows the decisive-default rule (CLAUDE.md §9) by reusing the existing avatar chips from the **Share** overlay People list (§10) and docking above the page rail, mirroring to the opposite edge in left-handed mode. States: **empty** ("Only you are here" — the rail collapses to a single chip), **loading** (skeleton chip while joining), **error** (a dimmed rail with "Reconnecting"), **offline** (rail hidden, banner from [SN-COL-009](collaboration.md#sn-col-009)). Motion respects Reduce Motion: avatars fade rather than slide (PRD-CO-317).

#### Test plan
`packages/sane_sync/test/collab/presence_test.dart` (diffing, heartbeat, stale timeout, ephemerality — no segment bytes), `app/test/collab/presence_rail_test.dart` (widget: overflow, sheet, hide-my-presence, left-handed/RTL mirroring), `app/test/golden/presence_rail_<look>_test.dart` (17 looks x light/dark), `app/integration_test/collab_presence_test.dart` (join within 2 s, leave within 2 s), plus a perf assertion in `app/test/collab/presence_perf_test.dart` (30 participants, rail repaint budget).

#### Dependencies
[SN-COL-004](collaboration.md#sn-col-004) (ephemeral frames), [SN-COL-009](collaboration.md#sn-col-009) (join flow and consent). Uses [SN-DS-002](design-system.md#sn-ds-002)/[SN-DS-003](design-system.md#sn-ds-003) tokens and components.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-011

<a id="sn-col-011"></a>

**Render throttled ephemeral live cursors for every collaborator**

| Field | Value |
|---|---|
| GitHub | #507 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, editor, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-010](collaboration.md#sn-col-010), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `ASVS-V17`, `OWASP-A01`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
PRD-CO-104 requires live cursors that render each editor's pen or caret position and current tool colour in real time, "throttled to keep the latency budget", with positions **ephemeral — not persisted, not synced to disk**, and a remote cursor tracking within ~100 ms on a healthy connection. This is Goodnotes' Live Cursor feature without its Pro-on-both-sides friction (PRD-CO-106). It is also the single most dangerous feature for the perf budget: naively broadcasting every `PointerMoveEvent` would flood the channel and repaint the ink layer 120 times a second. The locked budgets (CLAUDE.md §7 decision 7: no frame over 16.7 ms while writing) apply to the *local* writer regardless of how many remote cursors are on screen, which is the constraint this issue must design around.

#### Scope
**In:** cursor frame emission from the local pointer stream, throttled and interpolated (emit at most 20 frames/s, coalescing to the latest position, with velocity so the receiver can interpolate smoothly at display rate); a remote-cursor overlay painted in its **own** `RepaintBoundary` layer above the ink layer so remote movement never repaints strokes; per-collaborator cursor visuals (a pen nib or caret glyph in that participant's colour with a small name label that fades after 1.5 s of stillness); tool-colour reflection (PRD-CO-104); page scoping so cursors only draw when the remote peer is on the page you are viewing; graceful disappearance on stale/leave; cursor suppression under "Hide my presence" ([SN-COL-010](collaboration.md#sn-col-010)) and under Reduce Motion (static position, no trailing animation).
**Out:** presence roster ([SN-COL-010](collaboration.md#sn-col-010)); following a collaborator's viewport ([SN-COL-012](collaboration.md#sn-col-012)); remote selection highlighting, which is out of PRD scope for M6 and is noted as a backlog idea.

#### Acceptance criteria
- [ ] A remote cursor tracks the sender's pen within **<= 100 ms** end to end on a healthy LAN (PRD-CO-104), measured with the harness from [SN-PERF-002](perf.md#sn-perf-002).
- [ ] Local writing with 10 remote cursors visible keeps pen-down-to-pixel within the platform budget (<= 16 ms ProMotion iPad, <= 25 ms mid Android, <= 30 ms Chrome web) and shows **no frame over 16.7 ms** (CLAUDE.md §7 decision 7).
- [ ] Cursor frames are capped at 20/s per peer outbound and dropped (not queued) when the unreliable channel is congested; a peer exceeding the cap inbound is throttled by [SN-COL-004](collaboration.md#sn-col-004)'s budget.
- [ ] Cursor positions never enter the op-log, the CRDT, undo history, or any file on disk; a session of pure cursor movement produces zero segment bytes (asserted).
- [ ] Remote cursor repaints never invalidate the ink layer: a widget test asserts the ink `CustomPainter` is not repainted when only remote cursors move.
- [ ] Cursors are page-scoped: a peer on page 4 draws no cursor on page 2.
- [ ] With Reduce Motion on, cursors jump rather than animate and no trail is drawn (PRD-CO-317).
- [ ] Name labels are legible in all 17 looks, light and dark, with >= 4.5:1 contrast against both the paper token `pp` and a dark PDF page, and are exposed to screen readers as a live-region announcement only when a participant starts editing (not continuously).

#### Technical notes
Emit from the editor's raw `Listener` pipeline ([SN-ED-002](editor.md#sn-ed-002)) **after** the local stroke is handed to the wet-ink layer, never before — the local ink path must not wait on collaboration (CLAUDE.md §8, docs/architecture/ink-engine.md). Throttle with a rate limiter in `app/lib/collab/cursor_controller.dart`; frames use the ephemeral, unreliable channel from [SN-COL-005](collaboration.md#sn-col-005) and the ephemeral frame type from [SN-COL-003](collaboration.md#sn-col-003). Paint in `app/lib/collab/ui/remote_cursor_layer.dart` as a `CustomPainter` inside a dedicated `RepaintBoundary` stacked over the canvas (docs/architecture/rendering-and-performance.md). Interpolate remote positions with a short (<= 80 ms) smoothing window so a 20 Hz stream looks continuous at 120 Hz. Coordinates are page-space and must survive zoom/pan transforms via the editor's existing viewport matrix.

#### Security & privacy
Cursor streams are fine-grained behavioural telemetry about another person: they reveal writing speed, hesitation and attention. Threats: TM-P-04 (detectability/behavioural inference by peers), TM-P-02 (identifiability by stable colour + timing), TM-D-03 (a malicious peer flooding cursor frames as a DoS — mitigated by inbound budgets, CWE-400). Controls: ephemeral-only (never persisted, MASVS-PRIVACY-1), suppressible via "Hide my presence", carried inside the E2EE channel so the relay sees only ciphertext (MASVS-NETWORK-1, ASVS-V17), rate-capped both directions. Coordinates are note content in miniature, so they must never be logged (TM-I-05). IDs: MASVS-PRIVACY-1, MASVS-NETWORK-1, ASVS-V17, OWASP-A01, CWE-400.

#### UX notes
Cursor glyph follows the pen-nib silhouette used in the palette dock (docs/design/screens-and-flows.md §7.4 tool icons) tinted with the participant colour from [SN-COL-010](collaboration.md#sn-col-010); the name pill uses the `acs` soft-accent token with the participant colour as the ring so it reads in every look. It must never obscure the local writing point: labels offset up-left (mirrored in RTL and left-handed mode). Empty state: no cursors when alone. Error/offline: cursors fade out within 2 s of a degraded connection rather than freezing in place, which would misrepresent where someone is.

#### Test plan
`app/test/collab/cursor_controller_test.dart` (throttling, coalescing, suppression, page scoping), `app/test/collab/remote_cursor_layer_test.dart` (ink layer not repainted; transform correctness under zoom/pan), `app/test/golden/remote_cursor_<look>_test.dart` (17 looks, light/dark, over paper and over a PDF page), `app/integration_test/collab_cursor_latency_test.dart` (<= 100 ms tracking; budget held with 10 cursors), and a no-persistence assertion in `packages/sane_sync/test/collab/cursor_ephemeral_test.dart`.

#### Dependencies
[SN-COL-010](collaboration.md#sn-col-010) (participants and colours), [SN-ED-002](editor.md#sn-ed-002) (editor canvas and pointer pipeline). Measured with [SN-PERF-002](perf.md#sn-perf-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-012

<a id="sn-col-012"></a>

**Add follow-a-collaborator viewport mirroring with a stop-following control**

| Field | Value |
|---|---|
| GitHub | #508 |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-010](collaboration.md#sn-col-010) |
| Security controls | `MASVS-PRIVACY-1`, `ASVS-V17`, `OWASP-A01` |
| Extra labels | agent-ready, good first issue |

#### Context
PRD-CO-107 (added in the 2026-09-13 competitor gap-closure pass, sourced from the Goodnotes real-time-collaboration teardown) says a participant SHOULD be able to **follow another collaborator** — mirror their current page, viewport and actions live — and stop at any time, with the acceptance bar "tapping a peer's presence avatar mirrors their view within ~1 s; a 'stop following' control returns to your own view". It is deliberately distinct from classroom follow-the-host ([SN-COL-017](collaboration.md#sn-col-017), PRD-CO-120), which is host-initiated and applies to everyone. This is a small, self-contained feature on top of the presence data that [SN-COL-010](collaboration.md#sn-col-010) already streams, which makes it a good first issue: no new protocol frames beyond adding viewport to the existing presence payload.

#### Scope
**In:** extending the presence frame with an optional viewport (page id, zoom, centre offset) emitted at most twice per second; a follow mode in the editor viewport controller that drives the local camera from a followed participant's viewport with smooth interpolation; entering follow by tapping a presence avatar or choosing "Follow" in the participants sheet; a persistent "Following <name>" pill with a **Stop following** action; automatic exit from follow on any local pan, zoom, page change or pen-down (following must never trap the user); automatic exit when the followed peer leaves, with a toast.
**Out:** classroom host broadcast ([SN-COL-017](collaboration.md#sn-col-017)); moderation spotlight ([SN-COL-018](collaboration.md#sn-col-018)); cursors ([SN-COL-011](collaboration.md#sn-col-011)).

#### Acceptance criteria
- [ ] Tapping a participant avatar starts following and the local view matches their page and viewport within **1 s** (PRD-CO-107).
- [ ] The "Following <name>" pill is always visible while following and its **Stop following** control returns the user to their previous page and viewport.
- [ ] Any local pan, zoom, page navigation or pen-down exits follow immediately and shows a brief "Stopped following" toast — the user is never trapped (PRD-CO-318 single-pointer alternatives still apply).
- [ ] Viewport frames are emitted at most 2/s, are ephemeral, and add no persisted bytes.
- [ ] Following a peer who is on a page you cannot decrypt (scoped page share, PRD-CO-039) shows a clear "That page isn't shared with you" state instead of a blank canvas.
- [ ] Follow survives a brief reconnect (< 10 s) and resumes; beyond that it exits cleanly.
- [ ] Camera interpolation respects Reduce Motion: with it on, the view cuts rather than animates (PRD-CO-317).
- [ ] The pill and the sheet action are keyboard reachable on web, >= 44 pt / 48 dp, and announced by screen readers as "Following <name>, button, stop following".

#### Technical notes
Add the optional viewport field to the presence payload in `packages/sane_sync/lib/src/collab/presence.dart` (protocol-compatible: older peers ignore unknown fields per the forward-compatibility rule in [SN-COL-003](collaboration.md#sn-col-003)). Drive the camera through the existing editor viewport controller rather than a parallel transform so zoom limits, page bounds and RTL handling are inherited ([SN-ED-002](editor.md#sn-ed-002), docs/architecture/rendering-and-performance.md). State lives in `app/lib/collab/follow_controller.dart` (Riverpod); UI pill in `app/lib/collab/ui/following_pill.dart` using `sane_ui` chip tokens. Guard against feedback loops: a follower must not re-broadcast the followed viewport as its own.

#### Security & privacy
Following exposes one more behavioural signal (what you are looking at, not just where your pen is), so the viewport field inherits the presence consent and the "Hide my presence" opt-out from [SN-COL-010](collaboration.md#sn-col-010) — with presence hidden, no viewport is emitted and you cannot be followed. Threats: TM-P-04 (detectability of attention), TM-P-02 (identifiability). Controls: ephemeral minimal payload inside the E2EE channel (MASVS-PRIVACY-1, ASVS-V17), no server involvement, follow is read-only and can never cause a write on the followed peer's device (OWASP-A01). IDs: MASVS-PRIVACY-1, ASVS-V17, OWASP-A01.

#### UX notes
The "Following <name>" pill sits under the Live banner from [SN-COL-009](collaboration.md#sn-col-009) and uses the participant's colour ring plus a text label (never colour alone, PRD-CO-311). Avatar tap targets in the presence rail must be >= 44 pt / 48 dp. Loading: the pill shows "Catching up..." until the first viewport frame arrives. Error: "<name> left — following stopped". Offline: follow exits and the editor returns to the user's own view with a toast. All states golden-tested across the 17 looks in light and dark (docs/design/design-system.md §4).

#### Test plan
`app/test/collab/follow_controller_test.dart` (enter/exit conditions, no feedback loop, reconnect resume, undecryptable page), `app/test/collab/following_pill_test.dart` (widget + a11y semantics), `app/test/golden/following_pill_<look>_test.dart`, `app/integration_test/collab_follow_test.dart` (two peers: follow within 1 s, stop restores previous viewport).

#### Dependencies
[SN-COL-010](collaboration.md#sn-col-010) (presence frames and participants sheet).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-013

<a id="sn-col-013"></a>

**Enforce live-session roles and the Free/Pro collaboration gate**

| Field | Value |
|---|---|
| GitHub | #509 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, security, billing |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-006](collaboration.md#sn-col-006), [SN-SHR-015](sharing-export.md#sn-shr-015) |
| Security controls | `MASVS-AUTH-2`, `MASVS-CRYPTO-1`, `ASVS-V4`, `ASVS-V17`, `OWASP-A01`, `OWASP-A04`, `CWE-285`, `CWE-863` |
| Extra labels | agent-ready |

#### Context
PRD-CO-031 defines four roles — Owner, Can edit, Can comment, Can view — and requires each to be "enforced client-side **and cryptographically** (edit/comment keys distinct from view key)". In a live room there is no server to say no, so enforcement has two halves: the room must refuse ops a peer's capability does not authorise ([SN-COL-006](collaboration.md#sn-col-006) proves *who*, this issue decides *what they may do*), and the UI must not offer tools a role cannot use ("Comment role's stroke tools are disabled; comment tools enabled", "View role has no comment composer"). Layered on top is the plan gate: collaboration is a **Pro capability for the notebook owner** (design §14 "Unlimited people, live cursors"), but PRD-CO-106 is explicit that **a joining participant must not need Pro** — this fixes Goodnotes' "requires Pro on at least one side" friction (user-pain gap #8). PRD-CO-004 adds that plan gates must degrade to an Upgrade prompt and never destroy or hide data.

#### Scope
**In:** a `RoomCapability` derived from the sealed key material and link role ([SN-SHR-015](sharing-export.md#sn-shr-015)) rather than from a self-declared field; an inbound op filter that drops ops a sender's capability does not permit (a "Can comment" peer sending a stroke op is dropped and counted as an abuse signal for [SN-COL-019](collaboration.md#sn-col-019)); an outbound guard that never emits an op the local role cannot make; role-aware tool availability in the editor (disabled stroke tools with an explanatory tooltip, comment tools enabled for Can comment, read-only for Can view); live role changes taking effect within one epoch without a rejoin; the owner-side Pro gate (starting a live session requires Pro; the Free owner sees the Upgrade overlay with the design's toast copy) and the participant-side no-gate guarantee.
**Out:** minting roles and re-sealing keys ([SN-SHR-015](sharing-export.md#sn-shr-015), [SN-SHR-017](sharing-export.md#sn-shr-017)); host moderation actions ([SN-COL-018](collaboration.md#sn-col-018)); comment features themselves ([SN-COL-014](collaboration.md#sn-col-014), [SN-COL-015](collaboration.md#sn-col-015)); the billing/entitlement plumbing ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] A peer holding a view-only capability cannot mutate the document: every stroke, text, object or property op it emits is dropped by every receiver, regardless of what its UI claims.
- [ ] A "Can comment" peer's comment ops are accepted and its content ops are dropped; a "Can edit" peer's content and comment ops are accepted; only an Owner's sharing/role ops are accepted.
- [ ] Dropping an unauthorised op emits a session event and increments a counter; it never applies partially and never throws (CLAUDE.md §6).
- [ ] The editor disables, rather than hides, the tools a role cannot use, with a tooltip/announcement explaining why (PRD-CO-004 honesty; a11y label required).
- [ ] A role change made by the Owner takes effect on all clients within **30 s** (one epoch) without anyone rejoining, and demotion immediately stops the demoted peer's in-flight edits from being accepted.
- [ ] A **Free** participant joining a Pro owner's room has the full capability their role grants — no upgrade prompt, no feature stub (PRD-CO-106).
- [ ] A **Free** owner attempting to start a live session sees the Upgrade overlay and the toast from design §14, and the notebook stays fully usable offline and shareable by export (PRD-CO-004).
- [ ] Entitlement failure (service unreachable) **fails open to the free tier** and never blocks local note-taking (docs/roadmap.md M8 exit criterion).

#### Technical notes
`RoomCapability` lives in `packages/sane_sync/lib/src/collab/capability.dart` and is computed from the sealed items/share key and the role claim bound into it by [SN-SHR-015](sharing-export.md#sn-shr-015) — never from an unauthenticated frame field (that would be CWE-285). The inbound filter sits in `CollabSession`'s apply path ([SN-COL-004](collaboration.md#sn-col-004)) so no UI mistake can bypass it; the outbound guard sits in the editor command layer. Role-aware tool state is a Riverpod-derived provider in `app/lib/collab/role_controller.dart` feeding the palette dock ([SN-ED-005](editor.md#sn-ed-005) conventions). The Pro check reads the entitlement from `sane_billing` ([SN-BILL-001](billing.md#sn-bill-001)) and must be a *capability* check on the owner's device only. Op kinds map to capabilities in a single table so a new op type must declare its required capability (a compile-time exhaustive `switch`, Dart 3).

#### Security & privacy
This is authorisation without a server, so the failure mode is silent privilege escalation. Threats: TM-S-03 (a peer claiming a role it was not granted), TM-E-02-class elevation inside the room, TM-T-01 (forged ops). Controls: capability derived from cryptographic material, not from claims (MASVS-CRYPTO-1, CWE-863); deny-by-default op filtering on the **receiving** side, since a hostile client controls its own sending side (OWASP-A01/A04, ASVS-V4); exhaustive op-to-capability mapping so an unmapped op is refused; no failure oracle in the dropped-op path. Privacy: dropped-op counters carry no content (TM-I-05). IDs: MASVS-AUTH-2, MASVS-CRYPTO-1, ASVS-V4, ASVS-V17, OWASP-A01, OWASP-A04, CWE-285, CWE-863.

#### UX notes
The Share overlay (docs/design/screens-and-flows.md §10) already renders roles; this issue mirrors that vocabulary exactly ("Can view / Can comment / Can edit", Owner) in the participants sheet ([SN-COL-010](collaboration.md#sn-col-010)) and in the disabled-tool tooltips. Disabled tools use the muted token `mu` with a lock affordance and a `Semantics` label "Pen, unavailable, you have comment access". The Free-owner gate opens the existing **Upgrade** overlay (§13, z-30) with the toast "Live collaboration is a Pro feature" — never a dead button. All states golden-tested in the 17 looks, light and dark.

#### Test plan
`packages/sane_sync/test/collab/capability_test.dart` (mapping table exhaustiveness, deny-by-default), `packages/sane_sync/test/collab/role_enforcement_test.dart` (view/comment/edit/owner matrices, demotion mid-flight), `app/test/collab/role_tools_test.dart` (widget: disabled tools + semantics), `app/test/security/collab_role_escalation_test.dart` (a hostile client that lies about its role changes nothing), `app/integration_test/collab_free_participant_test.dart` (Free participant full function; Free owner sees Upgrade).

#### Dependencies
[SN-COL-006](collaboration.md#sn-col-006) (authenticated peers), [SN-SHR-015](sharing-export.md#sn-shr-015) (role capabilities and keys). Reads [SN-BILL-001](billing.md#sn-bill-001) for the owner-side Pro check.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-014

<a id="sn-col-014"></a>

**Implement threaded comments as CRDT objects anchored to ink, text and regions**

| Field | Value |
|---|---|
| GitHub | #510 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, editor, text |
| Size | L |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003), [SN-COL-013](collaboration.md#sn-col-013) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `MASVS-PLATFORM-2`, `ASVS-V1`, `OWASP-A03`, `CWE-79`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
PRD-CO-110 requires threaded comments anchored to a point, region or object on a page (a stroke group, a text range, or a coordinate) supporting reply, edit, delete and resolve/reopen, and states that **comments are CRDT objects** (add-wins, per-object LWW), synced and E2E-encrypted like all other content. This beats OneNote (no threaded comments) and matches Notion. The document model (docs/architecture/document-model.md §3) currently enumerates object types `stroke|text|image|shape|audioAnchor|link|sticker|table` and already defines a Peritext **`comment` mark type** with `after` anchoring for inline text comments (§4.3 — the anchor choice matters: appended text must not join the commented span). So this issue extends the model in two coordinated ways: a new `comment` object type for anchors to ink/regions/objects, and reuse of the existing Peritext comment mark for text ranges. Because comments are real content, they inherit E2EE, export and revocation automatically.

#### Scope
**In:** the `Comment` object (id, threadId, parentCommentId, anchor, authorDeviceId, authorDisplayName, body text, createdAt/editedAt HLC, resolved flag, reactions map); anchor kinds (`objectRef` to a stroke group/object, `textRange` via the Peritext comment mark, `pageRegion` as a page-space rect, `pagePoint`); thread semantics (reply, edit own, delete own with tombstone, resolve/reopen by any commenter or owner); anchor **re-resolution** when the anchored object moves, is reflowed or is erased (orphaned comments degrade to page-level anchors and are labelled, never lost); document-model doc update and the ObjectType extension; inclusion in `.sanenote` export/import; op-to-capability mapping so "Can comment" peers may create comments but not content ([SN-COL-013](collaboration.md#sn-col-013)).
**Out:** the panel UI, filters and reactions UI ([SN-COL-015](collaboration.md#sn-col-015)); mentions and notifications ([SN-COL-016](collaboration.md#sn-col-016)); the pin/marker rendering in the editor is in scope only as a minimal anchor marker, with full visual design in [SN-COL-015](collaboration.md#sn-col-015).

#### Acceptance criteria
- [ ] A comment pinned to a stroke group **stays anchored** when the page reflows, when the object is moved or scaled, and when other objects are added or deleted (PRD-CO-110).
- [ ] Erasing the anchored object converts the thread to an orphaned page-level anchor labelled "Anchor removed" — the thread is never silently deleted.
- [ ] Two devices commenting on the same object concurrently produce two threads, both present after merge (add-wins); concurrent edits to the same comment body resolve by HLC LWW with no lost thread.
- [ ] Resolve/reopen is idempotent and converges; a resolved thread is hidden under the default filter but still exported.
- [ ] Comment text is stored as note content: encrypted at rest and in the op-log like any other object, and included in `.sanenote` export and re-import round-trip without loss.
- [ ] Comment bodies are plain text with a hard length cap (default 4,000 characters) and are **never** rendered as HTML or Markdown with active content — links are detected but require an explicit tap-through confirmation (CWE-79).
- [ ] A "Can view" peer cannot create comments; a "Can comment" peer can comment but cannot alter ink ([SN-COL-013](collaboration.md#sn-col-013)).
- [ ] Adding 500 comments to a notebook adds < 200 KB to the op-log and does not measurably affect page-open time (the 1,000-page open budget still holds).

#### Technical notes
Extend `packages/sane_core/lib/src/model/objects/` with `comment.dart` and add `comment` to the `ObjectType` enum, the op-to-object routing and the CRDT registry (docs/architecture/document-model.md §3.2 — update that doc **in the same PR**, CLAUDE.md §11). Text-range anchors reuse the Peritext `comment` mark with `MarkGrowth.fixed` (`after` anchoring) so appended text does not join the span (§4.3). Object anchors store an `ObjectId` plus a fallback page-space rect so re-resolution works after an object is replaced by an erase/redraw. Anchor re-resolution runs in `packages/sane_core/lib/src/comments/anchor_resolver.dart` (pure Dart, unit-testable headlessly). Rendering markers hooks into the editor overlay from [SN-ED-002](editor.md#sn-ed-002). Live delivery is automatic: comment ops travel the same frames as any op ([SN-COL-004](collaboration.md#sn-col-004)).

#### Security & privacy
Comment bodies are **note content authored by another person** — untrusted input that will be rendered in our UI and later fed to Sage RAG ([SN-AI-001](ai.md#sn-ai-001) provenance tagging, PRD-CO-175). Threats: TM-I-06 (XSS/rendered-content injection if bodies were ever treated as markup — hence plain text only, CWE-79), TM-T-06-style malformed content on import, prompt injection via comment text (PRD-CO-170: comments must be provenance-tagged as externally authored), TM-I-01 (comments encrypted like all content, MASVS-STORAGE-1/CRYPTO-2). Controls: strict plain-text model with length caps and Unicode normalisation/bidi-control stripping (CWE-20) to prevent spoofed display text; no DOM sink on web (MASVS-PLATFORM-2, ASVS-V1); author attribution via device key ([SN-COL-006](collaboration.md#sn-col-006)) so a comment cannot be forged in someone else's name. IDs: MASVS-STORAGE-1, MASVS-CRYPTO-2, MASVS-PLATFORM-2, ASVS-V1, OWASP-A03, CWE-79, CWE-20.

#### UX notes
Minimal anchor marker in this issue: a small numbered dot in the participant colour placed at the anchor, tappable to open the thread (the full panel is [SN-COL-015](collaboration.md#sn-col-015)). Markers must not obscure ink: they sit in the overlay layer with a halo using the surface token `sf` for contrast on both paper and dark PDF pages, render correctly in all 17 looks light and dark, meet 44 pt / 48 dp target size, and carry `Semantics` labels ("Comment thread, 2 replies, unresolved"). Orphaned threads show an "Anchor removed" chip. Empty state: no markers. Offline: comments are created locally and merge on reconnect, with no error state.

#### Test plan
`packages/sane_core/test/model/comment_test.dart` (model, CRDT convergence, add-wins threads, LWW edits, resolve idempotence), `packages/sane_core/test/comments/anchor_resolver_test.dart` (move/scale/reflow/erase/orphan cases), `app/test/collab/comment_marker_test.dart` (widget + semantics), `app/test/security/comment_content_safety_test.dart` (no markup execution, length cap, bidi/control-character stripping), `app/test/golden/comment_marker_<look>_test.dart`, and a round-trip case in the export/import fidelity suite [SN-SHR-028](sharing-export.md#sn-shr-028).

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) (document model entities), [SN-CORE-003](sync.md#sn-core-003) (CRDT semantics), [SN-COL-013](collaboration.md#sn-col-013) (capability to comment).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-015

<a id="sn-col-015"></a>

**Build the comments panel with filters, jump-to-anchor and reactions**

| Field | Value |
|---|---|
| GitHub | #511 |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, editor, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-014](collaboration.md#sn-col-014) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-PRIVACY-1`, `ASVS-V1`, `OWASP-A03`, `CWE-79` |
| Extra labels | agent-ready |

#### Context
PRD-CO-113 requires a comments panel listing all threads for the notebook with filters (open/resolved, by author, by page) and jump-to-anchor, with the acceptance bar "filtering 'open, page 4' scrolls to and highlights those anchors". PRD-CO-112 adds emoji **reactions** on comments and on selected ink/text, shown inline and synced to all peers. Together these turn the comment objects built in [SN-COL-014](collaboration.md#sn-col-014) into a usable review workflow — the thing students actually do with a shared lecture notebook: leave questions, answer them, mark them resolved. The panel is also the main accessibility route into comments, since the ink canvas is opaque to assistive tech and the parallel accessible tree (PRD-CO-330) exposes comments as first-class nodes.

#### Scope
**In:** the comments panel as an editor side sheet (docked right on wide layouts, bottom sheet on phones); thread list with author, timestamp, page number, snippet and reply count; filters (open/resolved, author, page, mentions-me) and a count summary; tap-to-jump that scrolls the canvas to the anchor, flashes a highlight and opens the thread; inline composer for reply/edit/delete/resolve/reopen; emoji reactions on comments and on a current ink/text selection, rendered as inline chips with counts and reactor names on long-press; unread affordance per thread; keyboard shortcuts on web (open panel, next/previous thread, resolve).
**Out:** the comment data model and anchoring ([SN-COL-014](collaboration.md#sn-col-014)); mentions and notifications ([SN-COL-016](collaboration.md#sn-col-016)); seen/unseen page badges ([SN-COL-016](collaboration.md#sn-col-016)).

#### Acceptance criteria
- [ ] The panel lists every thread in the notebook with author, page, snippet, reply count and state, sorted by page then time, and loads a 500-thread notebook in < 300 ms without jank.
- [ ] Filtering "open + page 4" shows exactly those threads and jumping scrolls to and highlights the anchor (PRD-CO-113).
- [ ] Resolving from the panel hides the thread under the default "Open" filter, is undoable, and converges across peers within one live round-trip.
- [ ] Reactions add a chip with a count within 300 ms locally and appear on all peers in the room; the same reaction from the same person toggles off (PRD-CO-112).
- [ ] Reaction and comment rendering is plain text plus a fixed emoji set — no arbitrary markup, no remote image loading from comment content (CWE-79, PRD-CO-172 exfiltration rule applied to user content too).
- [ ] The panel works offline: threads are readable and new comments queue locally with a "Will send when reconnected" hint, not an error.
- [ ] Accessibility: the panel is a focus-trapped, escapable dialog on web with full keyboard navigation; every thread exposes name/role/state to the platform a11y API; targets >= 44 pt / 48 dp; contrast >= 4.5:1 in all 17 looks light and dark (PRD-CO-315/316/320/321).
- [ ] On a phone the panel becomes a bottom sheet with the same functions and no horizontal scrolling at 320 px width (PRD-CO-313).

#### Technical notes
UI in `app/lib/collab/ui/comments_panel.dart` + `comment_thread_tile.dart` + `reaction_bar.dart`, composed from `sane_ui` list, chip and sheet components ([SN-DS-003](design-system.md#sn-ds-003)) with tokens only ([SN-DS-002](design-system.md#sn-ds-002)); no hardcoded colours (CLAUDE.md §9). Queries come from a Riverpod selector over the comment objects in `sane_core` ([SN-COL-014](collaboration.md#sn-col-014)) — filtering happens in a pure-Dart query function that is unit-testable without a widget harness. Jump-to-anchor reuses the editor's existing page-navigation and highlight primitives ([SN-ED-002](editor.md#sn-ed-002), and the search-result highlight path from [SN-SRCH-001](search.md#sn-srch-001)) rather than a second implementation. Reactions are an LWW-map on the comment object keyed by device id (docs/architecture/document-model.md §4 LWW-map), so concurrent reactions merge without conflict. Adaptive layout follows the `narrow` (< 900 px) collapse rule in docs/design/screens-and-flows.md.

#### Security & privacy
The panel renders content authored by other people, so it is the primary XSS/deception surface in collaboration. Threats: TM-I-06 (untrusted content reaching a DOM sink on web — mitigated by plain-text rendering, no `innerHTML`, strict CSP/Trusted Types, MASVS-PLATFORM-2, ASVS-V1), display spoofing via bidi/zero-width characters (stripped in [SN-COL-014](collaboration.md#sn-col-014)), and metadata exposure: the panel shows who commented and when, which is presence-adjacent information — it must not reveal a participant's email or account identifier, only the display name they chose (MASVS-PRIVACY-1, TM-P-02). No remote resource is ever fetched because of comment content. IDs: MASVS-PLATFORM-2, MASVS-PRIVACY-1, ASVS-V1, OWASP-A03, CWE-79.

#### UX notes
The panel is a new editor surface in the family of the **page rail** and **Share** overlay (docs/design/screens-and-flows.md §7/§10): same card radius `r`, surface token `sf`, line token `ln`, and the filter chips reuse the Search screen's chip style (§11) so the vocabulary is consistent. It docks opposite the page rail and mirrors under the left-handed toggle and RTL (PRD-CO-337/372). States: **empty** ("No comments yet — select ink or text and tap Comment"), **loading** (skeleton tiles), **filtered-empty** ("No open comments on page 4"), **offline** (queued badge), **error** (retry row). Reduce Motion replaces the jump animation with an instant scroll and a static highlight (PRD-CO-317). Golden-tested across all 17 looks in light and dark.

#### Test plan
`app/test/collab/comments_panel_test.dart` (list, filters, resolve, offline queue), `app/test/collab/comment_query_test.dart` (pure filter/sort logic incl. 500-thread perf), `app/test/collab/reaction_bar_test.dart` (toggle, counts, merge), `app/test/a11y/comments_panel_a11y_test.dart` (focus trap, keyboard order, semantics), `app/test/golden/comments_panel_<look>_test.dart` (17 looks x light/dark, wide + narrow), `app/integration_test/collab_comment_flow_test.dart` (two peers: comment, reply, react, resolve, jump).

#### Dependencies
[SN-COL-014](collaboration.md#sn-col-014) (comment objects and anchors). Uses [SN-DS-003](design-system.md#sn-ds-003) components and the editor navigation from [SN-ED-002](editor.md#sn-ed-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-016

<a id="sn-col-016"></a>

**Notify @mentions and badge unseen collaborator activity**

| Field | Value |
|---|---|
| GitHub | #512 |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, notifications, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-014](collaboration.md#sn-col-014) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PLATFORM-3`, `MASVS-NETWORK-1`, `ASVS-V17`, `OWASP-A01`, `CWE-200`, `CWE-359` |
| Extra labels | agent-ready, innovation |

#### Context
Two requirements meet here. PRD-CO-111: **@mentions** must notify the mentioned member (in-app inbox plus optional push, honouring Settings -> Notifications "Shared notebook activity") and deep-link to the exact comment, resolving only against notebook membership so no directory is leaked. PRD-CO-114 is the hard privacy constraint: notifications **must not transmit comment text through any push service in plaintext** — a push carries only a wake signal and the content is fetched and decrypted on-device. PRD-CO-115 (gap-closure pass) adds **seen/unseen activity**: pages or changes made by others since your last visit are badged, a page auto-marks seen after a brief view, and a bulk "mark all seen" exists. Both features are the difference between a shared notebook you keep up with and one you abandon, and both are privacy-loaded because they touch OS notification surfaces (TM-I-07) and per-user activity state (TM-P-01 linkability).

#### Scope
**In:** `@` autocomplete in the comment composer resolving against **notebook membership only**; a mention as a structured span inside the comment object (member id, not free text) so it survives edits and export; the in-app activity inbox (mentions, replies to your threads, new activity per notebook) with deep links to the comment; content-free push wake signals and the on-device fetch/decrypt-then-display path; honouring the Settings -> Notifications toggle and OS permission state, including the case where notifications are denied (in-app inbox still works); per-page and per-notebook **seen/unseen** state (local, per profile, synced as CRDT so it is consistent across your own devices), badge rendering in the library and page rail, auto-mark-seen after 2 s of viewing, and "mark all seen".
**Out:** the OS notification-channel registration, permission prompts and widget/deep-link verification, owned by the notifications and system-integration epic SN-NOTF-001 and consumed here; comment model ([SN-COL-014](collaboration.md#sn-col-014)); panel UI ([SN-COL-015](collaboration.md#sn-col-015)).

#### Acceptance criteria
- [ ] Typing `@` offers only current notebook members; typing an unknown address offers nothing and never queries a server (PRD-CO-111, no directory leakage).
- [ ] Mentioning a member produces an inbox entry that opens the **exact comment** with the anchor scrolled into view.
- [ ] A push payload inspected on the wire and in the OS notification store contains **no comment text, no notebook title, no member name** — only an opaque wake token (PRD-CO-114, TM-I-07); the readable text is composed on-device after decryption.
- [ ] With notifications disabled or denied, no push is attempted and the in-app inbox still receives everything.
- [ ] A collaborator's edit badges the affected page and notebook; opening the page clears the badge after 2 s of view; "mark all seen" clears the notebook (PRD-CO-115).
- [ ] Seen/unseen state is per profile, never shared with other participants (nobody can tell whether you read their comment — an explicit privacy decision, documented).
- [ ] Badge computation for a 1,000-page notebook completes in < 50 ms and does not delay page open (locked budget).
- [ ] Inbox and badges are accessible: counts are announced ("3 unread mentions"), targets >= 44 pt / 48 dp, contrast >= 4.5:1 in all 17 looks light and dark, keyboard reachable on web.

#### Technical notes
Mention spans reuse the Peritext mark machinery used for links (docs/architecture/document-model.md §4.3) with `MarkGrowth.fixed` so appended text does not join the mention. Seen/unseen is a per-profile LWW-map of `pageId -> lastSeenHlc` in `sane_core`, synced through the normal op-log so it converges across the user's own devices but is scoped to the profile ([SN-AUTH-013](auth.md#sn-auth-013) isolation) and excluded from what is shared with collaborators. The activity inbox lives in `app/lib/collab/ui/activity_inbox.dart`; the wake-signal handler in `app/lib/collab/notifications/wake_handler.dart` must treat every push payload as untrusted input (validate, then fetch locally; never render a field from the payload). Settings integration follows docs/design/screens-and-flows.md §12 "Shared notebook activity". Where no push infrastructure exists, activity arrives through the live session or the next sync — push is an accelerant, never a requirement.

#### Security & privacy
Threats: TM-I-07 (content leaking through OS notification surfaces on a locked device — mitigated by excerpt-free wake signals, MASVS-PLATFORM-3), TM-P-01/TM-P-02 (a push service learning who is active with whom and when — minimise payload, no stable per-notebook identifier in the token, rotate tokens), TM-P-06 (unawareness — the Settings copy must say what a notification does and does not contain), CWE-200/359 (over-disclosure of personal information). Controls: content-free payloads, on-device composition after decryption, membership-scoped mention resolution (OWASP-A01), per-profile seen state never revealed to peers, all in-session traffic inside the E2EE channel (MASVS-NETWORK-1, ASVS-V17). Any new egress here requires a threat-model row (CLAUDE.md §7 rule 4). IDs: MASVS-PRIVACY-1, MASVS-PRIVACY-2, MASVS-PLATFORM-3, MASVS-NETWORK-1, ASVS-V17, OWASP-A01, CWE-200, CWE-359.

#### UX notes
The inbox is reachable from the sidebar (docs/design/screens-and-flows.md sidebar surface) with a count badge using the accent token `ac` plus a numeral (never colour alone, PRD-CO-311). Page badges appear on page-rail thumbnails and library notebook cards as a small dot plus an accessible label. Mention chips inside a comment use the `acs` soft-accent token. States: **empty inbox** ("Nothing new — you're all caught up" with the Sage mark), **loading** (skeleton rows), **error** (retry), **offline** ("Showing what's on this device"). Motion honours Reduce Motion. All surfaces golden-tested across 17 looks, light and dark.

#### Test plan
`app/test/collab/mention_autocomplete_test.dart` (membership-only resolution, no network), `packages/sane_core/test/model/seen_state_test.dart` (LWW convergence, per-profile scoping, 1,000-page perf), `app/test/security/push_payload_no_content_test.dart` (payload contains no content/title/name; handler treats payload as untrusted), `app/test/collab/activity_inbox_test.dart` (widget, deep link to comment), `app/test/golden/activity_inbox_<look>_test.dart`, `app/integration_test/collab_mention_flow_test.dart` (mention -> inbox -> exact comment).

#### Dependencies
[SN-COL-014](collaboration.md#sn-col-014) (comments). Consumes the OS notification plumbing from the notifications epic SN-NOTF-001 and the profile isolation from [SN-AUTH-013](auth.md#sn-auth-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-017

<a id="sn-col-017"></a>

**Implement classroom rooms with host broadcast and per-participant copies**

| Field | Value |
|---|---|
| GitHub | #513 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, study, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-007](collaboration.md#sn-col-007), [SN-COL-010](collaboration.md#sn-col-010), [SN-COL-013](collaboration.md#sn-col-013) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-CRYPTO-1`, `MASVS-PRIVACY-1`, `ASVS-V17`, `OWASP-A01`, `OWASP-A04`, `CWE-400`, `CWE-770` |
| Extra labels | agent-ready, innovation |

#### Context
PRD-CO-120 defines a **classroom room**: a host (teacher) whose current page is broadcast live to many participants ("follow the host"), a mode where each participant annotates their **own synced copy** derived from the host's page, and a session that is **saveable to every participant's library afterward**. PRD-CO-122 requires it to be ephemeral and clearly scoped (explicit "start class", a visible live banner, no persistent Sane server state, E2EE throughout, guests allowed if the host permits). PRD-CO-102 and PRD-CO-124 add the scale rule: a WebRTC full mesh caps near ~35 peers, so rooms beyond the cap — and classrooms by default — **must use a star topology through the ciphertext relay** or host-broadcast, never a full mesh (risk R3 in PRD-04 §11.3). This closes gap #12 (classroom rooms), currently served only by whiteboard tools like Draw.chat, and is the CollaNote-style capability the PRD calls out.

#### Scope
**In:** a `RoomMode` distinction (`peer` mesh vs `classroom` star) selected at room creation and renegotiated when the mesh cap is exceeded; the star topology — the host (or the relay in forward mode) is the single hub, participants connect only to the hub, so traffic is O(n) not O(n squared); host-page broadcast frames (page id + viewport + the host's live ops); the participant's derived copy (a local branch of the host's page that merges the host's ops but keeps the participant's own annotations separate and private by default); "Save to my library" at session end producing a real notebook the participant owns; the explicit "Start class" / "End class" lifecycle with a visible live banner for everyone; guest admission toggle; the mesh-cap detector with automatic promotion from mesh to star with no session drop.
**Out:** moderation controls ([SN-COL-018](collaboration.md#sn-col-018)); abuse floor and rate limits ([SN-COL-019](collaboration.md#sn-col-019)); the relay service itself ([SN-COL-007](collaboration.md#sn-col-007)); presence and cursors ([SN-COL-010](collaboration.md#sn-col-010), [SN-COL-011](collaboration.md#sn-col-011)).

#### Acceptance criteria
- [ ] Starting a class creates a classroom room in **star** topology; participants exchange no peer-to-peer frames with each other, verified by connection counts (PRD-CO-124).
- [ ] A 100-participant classroom runs with the host sustaining a bounded outbound rate: host outbound traffic does not scale with participant count beyond the hub link, and no participant opens more than 2 peer connections (PRD-CO-124, proven in [SN-COL-021](collaboration.md#sn-col-021)).
- [ ] A peer room that grows past the configured mesh cap (default 24, hard cap 35) **promotes to star within 10 s** without dropping the session or losing ops (PRD-CO-102).
- [ ] Students see the host's page live; the view follows the host's page changes within 1 s and shows "Following the class" with an explicit way to look around (which pauses following, mirroring [SN-COL-012](collaboration.md#sn-col-012) semantics).
- [ ] Each participant's own annotations are visible only to them by default, merge with the host's content without conflict, and **survive the session**: "Save to my library" produces an owned notebook containing the host's page plus their annotations (PRD-CO-120).
- [ ] Ending the class tears down the session for everyone, removes all relay state within 60 s, and leaves **no room content server-side** (PRD-CO-122, verified by [SN-COL-008](collaboration.md#sn-col-008)).
- [ ] All classroom traffic is E2E-encrypted under the room's items/share key; the relay forwards ciphertext only.
- [ ] A guest with no account can join when the host allows, and can save their copy locally without signing in (PRD-CO-002/122).
- [ ] With 100 participants the host's device keeps the editor at >= 60 fps and shows no frame over 16.7 ms while writing (locked budget).

#### Technical notes
Topology lives in `packages/sane_sync/lib/src/collab/topology.dart` (pure Dart policy: mesh vs star, cap detection, promotion protocol) with the connection work done by the transport ([SN-COL-005](collaboration.md#sn-col-005)) and the hub role served by `services/relay/` forward mode ([SN-COL-007](collaboration.md#sn-col-007)) — the host's device is never required to fan out to 100 peers itself. The participant copy is a **local branch**: host ops are applied to a shared base page; participant ops go to a private layer (docs/architecture/document-model.md layers) that is not broadcast unless the participant explicitly shares it back. "Save to my library" materialises the branch into a new notebook via the existing notebook-creation path ([SN-LIB-002](library.md#sn-lib-002)) with provenance metadata ("From <class name>, <date>"). Session lifecycle state machine extends `CollabSession` ([SN-COL-004](collaboration.md#sn-col-004)) with classroom states. Guest identity reuses [SN-AUTH-010](auth.md#sn-auth-010).

#### Security & privacy
A classroom is the highest-risk collaboration surface: many semi-trusted and possibly anonymous participants (TA7), a relay in the middle (TA4), and minors potentially involved (COPPA/DPDP awareness, TM-P-07). Threats: TM-D-03 (a 100-peer room is a natural DoS amplifier — bounded by star topology plus the caps in [SN-COL-019](collaboration.md#sn-col-019), CWE-400/770), TM-S-03 (unauthorised joiners — membership proof still required, [SN-COL-006](collaboration.md#sn-col-006)), TM-I-01 (relay must remain ciphertext-only, [SN-COL-008](collaboration.md#sn-col-008)), TM-P-02/P-04 (participant identifiability and attendance metadata — participant lists are visible to the host by design and must be disclosed in the join sheet). Controls: star routing bounds fan-out (OWASP-A04), all payloads E2EE (MASVS-CRYPTO-1, MASVS-NETWORK-1), ephemeral session with no server-side content (MASVS-PRIVACY-1), explicit host-controlled admission (OWASP-A01). IDs: MASVS-NETWORK-1, MASVS-CRYPTO-1, MASVS-PRIVACY-1, ASVS-V17, OWASP-A01, OWASP-A04, CWE-400, CWE-770.

#### UX notes
Classroom mode is a new surface built from existing design vocabulary (docs/design/screens-and-flows.md §7 editor chrome + §10 Share overlay): a **Start class** action in the Share overlay, a red-dot **LIVE CLASS** banner under the toolbar (the same slot as the audio recorder bar, with a non-colour label, PRD-CO-311), the presence rail showing the host first, and a bottom "Following the class / Look around" control for students. Ending the class shows a save sheet: "Keep your copy of today's class?" with Save / Discard and an explanation that the host's page and your annotations are both kept. States: **waiting for host**, **live**, **paused (host offline)**, **ended**, **offline** (annotations continue locally). All in 17 looks light/dark, targets >= 44 pt / 48 dp, Reduce Motion respected, screen-reader announcements for "Class started" and "Class ended".

#### Test plan
`packages/sane_sync/test/collab/topology_test.dart` (cap detection, mesh->star promotion, no op loss), `packages/sane_sync/test/collab/classroom_session_test.dart` (lifecycle, host broadcast, participant branch isolation), `app/test/collab/classroom_ui_test.dart` (banner, follow control, save sheet), `app/test/golden/classroom_banner_<look>_test.dart`, `app/integration_test/collab_classroom_test.dart` (host + 3 participants: broadcast, private annotations, save to library, teardown), and the 100-participant scale case in [SN-COL-021](collaboration.md#sn-col-021).

#### Dependencies
[SN-COL-007](collaboration.md#sn-col-007) (relay forward mode), [SN-COL-010](collaboration.md#sn-col-010) (presence), [SN-COL-013](collaboration.md#sn-col-013) (roles). Creates notebooks through [SN-LIB-002](library.md#sn-lib-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-018

<a id="sn-col-018"></a>

**Implement host moderation controls for classroom rooms**

| Field | Value |
|---|---|
| GitHub | #514 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, security, study |
| Size | L |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-017](collaboration.md#sn-col-017), [SN-SHR-017](sharing-export.md#sn-shr-017) |
| Security controls | `MASVS-AUTH-2`, `MASVS-CRYPTO-1`, `ASVS-V4`, `ASVS-V17`, `OWASP-A01`, `OWASP-A04`, `CWE-285`, `CWE-862` |
| Extra labels | agent-ready, innovation |

#### Context
PRD-CO-121 requires the host of a classroom room to have real moderation power: **admit/deny join requests, mute a participant's live edits, lock the board (view-only), spotlight/hand-raise, remove a participant, and end the session for all** — with removal rotating keys (PRD-CO-035/§1.3). The acceptance bar is concrete: "host mutes a participant -> that participant's strokes stop propagating; removed participant loses access". This is the CollaNote-parity feature set the PRD calls out (open question 4 asks the maintainer to confirm exact parity, but the six controls above are specified as MUST, so they are implementable today). Without moderation, a classroom with anonymous participants is ungovernable, which is why PRD-CO-123's abuse floor ([SN-COL-019](collaboration.md#sn-col-019)) sits directly on top of this issue.

#### Scope
**In:** the host control panel (participant list with per-person actions); **admit/deny** for join requests when admission is gated; **mute** (host marks a participant muted; every client drops that participant's content ops for the epoch, and the muted participant's own UI shows "Muted by host — your edits stay on your device"); **lock board** (whole room view-only except the host); **spotlight** a participant (their page becomes the broadcast source temporarily) and **hand-raise** (participant requests attention, host sees a queue); **remove** a participant (drop connection + rotate the room key via [SN-SHR-017](sharing-export.md#sn-shr-017) so they cannot rejoin); **end session for all**; moderation state as signed, host-authored control frames that every client enforces locally; an auditable local session log for the host (who joined/left/was muted, times — stored locally, never uploaded).
**Out:** rate limits, draw approval for guests, wipe-a-griefer's-strokes and report/block ([SN-COL-019](collaboration.md#sn-col-019)); the classroom session itself ([SN-COL-017](collaboration.md#sn-col-017)); key rotation mechanics ([SN-SHR-017](sharing-export.md#sn-shr-017)).

#### Acceptance criteria
- [ ] Muting a participant stops their content ops from being applied by **every** client within 2 s, not just visually on the host's device; the mute survives the muted client being hostile (enforcement is receiver-side, CWE-862).
- [ ] Locking the board makes the room view-only for everyone except the host within 2 s; unlocking restores prior roles exactly.
- [ ] Removing a participant disconnects them, rotates the room/items key and re-seals to the remaining members, and their rejoin attempt is refused ([SN-COL-006](collaboration.md#sn-col-006)); the M6 exit gate "removing a collaborator rotates keys and denies their next sync" is satisfied.
- [ ] Admit/deny works for both accounts and guests; a denied joiner sees a neutral message and cannot retry more than N times before back-off.
- [ ] Spotlight transfers the broadcast source within 2 s and returns to the host on release; hand-raise shows an ordered queue with counts.
- [ ] "End session for all" tears down every connection and relay room within 60 s and prompts each participant to save their copy ([SN-COL-017](collaboration.md#sn-col-017)).
- [ ] Control frames are **signed by the host's device key** and rejected if forged: a participant emitting a mute/lock/remove frame changes nothing anywhere (CWE-285).
- [ ] The host's session log is local-only, contains no note content, and is deletable by the host (TM-P-03 privacy: no vendor-side immutable audit).
- [ ] Every control is reachable by keyboard on web, has >= 44 pt / 48 dp targets, and is announced with its state by screen readers ("Mute Kabir, button", "Board locked").

#### Technical notes
Moderation state is a small, host-authored CRDT-free control channel: signed control frames carrying `(epoch, action, targetPeerId, hlc)`, verified against the host's Ed25519 device key ([SN-CRY-019](security.md#sn-cry-019)) and applied by every client's `CollabSession` before the capability filter of [SN-COL-013](collaboration.md#sn-col-013). Implement policy in `packages/sane_sync/lib/src/collab/moderation.dart` (pure Dart, receiver-side enforcement) and the host UI in `app/lib/collab/ui/host_controls_panel.dart`. Removal calls the revocation path in [SN-SHR-017](sharing-export.md#sn-shr-017) (rotate items key, re-seal to remaining members) and bumps the room epoch so stale peers are dropped by [SN-COL-006](collaboration.md#sn-col-006). Host identity is the room creator; if the host disconnects, the room enters `paused (host offline)` and resumes when they return — no automatic host transfer in M6 (a deliberate simplification; recorded here because the PRD is silent on host failover).

#### Security & privacy
Moderation is authorisation in a serverless room, so every control must be **enforced by receivers**, never trusted from senders. Threats: TM-S-03 (a participant forging host control frames — mitigated by host-key signatures, CWE-285/862), TM-T-01 (replaying an old unmute/unlock frame — mitigated by epoch + HLC monotonicity), TM-E-02-class elevation, and the abuse case where a removed member keeps previously received content (ADR-0013 is explicit that this cannot be recalled — the UI must say so honestly). Controls: signed control frames (MASVS-CRYPTO-1), deny-by-default receiver enforcement (OWASP-A01, ASVS-V4), key rotation on removal (MASVS-AUTH-2), local-only moderation log with no content (TM-P-03, TM-I-05). IDs: MASVS-AUTH-2, MASVS-CRYPTO-1, ASVS-V4, ASVS-V17, OWASP-A01, OWASP-A04, CWE-285, CWE-862.

#### UX notes
The host control panel extends the participants sheet from [SN-COL-010](collaboration.md#sn-col-010) with a host section, styled with `sane_ui` list + destructive-action tokens; destructive actions (remove, end session) require a confirm step and state the honest consequence: "Kabir will lose access to new pages. Anything they already downloaded stays with them." Muted participants see a calm inline banner rather than an error. The hand-raise queue appears as a numbered list in the panel and a small badge on the presence rail. States: **empty** (no participants yet), **pending** (join requests waiting), **locked**, **paused (host offline)**, **ended**. All in 17 looks light/dark, Reduce Motion respected, and every state announced for screen readers (PRD-CO-330/331).

#### Test plan
`packages/sane_sync/test/collab/moderation_test.dart` (each control, epoch monotonicity, replay rejection), `app/test/security/collab_forged_control_frame_test.dart` (a non-host's mute/lock/remove frame is ignored by all receivers), `app/test/collab/host_controls_panel_test.dart` (widget, confirm steps, a11y semantics), `app/integration_test/collab_moderation_test.dart` (host + 3 participants: admit, mute, lock, spotlight, remove-with-rotation, end), `app/test/golden/host_controls_<look>_test.dart`.

#### Dependencies
[SN-COL-017](collaboration.md#sn-col-017) (classroom rooms), [SN-SHR-017](sharing-export.md#sn-shr-017) (cryptographic revocation). Builds on [SN-COL-006](collaboration.md#sn-col-006) and [SN-COL-013](collaboration.md#sn-col-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-019

<a id="sn-col-019"></a>

**Add the room abuse floor: draw approval, rate limits, wipe and report**

| Field | Value |
|---|---|
| GitHub | #515 |
| Type | security |
| Priority | p0 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, security, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-018](collaboration.md#sn-col-018) |
| Security controls | `MASVS-AUTH-2`, `MASVS-PRIVACY-2`, `MASVS-NETWORK-1`, `ASVS-V17`, `OWASP-A01`, `OWASP-A04`, `CWE-770`, `CWE-400`, `CWE-862` |
| Extra labels | agent-ready |

#### Context
PRD-CO-123 makes a **safety/abuse floor** mandatory for any room with anonymous participants: host approval before a guest can draw, per-participant rate limits on ops, a "clear a participant's contributions" action, and a report/block affordance — with the acceptance bar "an un-approved guest cannot draw until admitted; host can wipe a griefer's strokes". This is an education-context requirement: a classroom link that spreads beyond the class must not let a stranger scribble over a lesson, and a teacher must be able to undo the damage in one action. It also protects the transport itself: ADR-0013's threat table lists "malicious peer floods/forges ops" with the mitigation "ops signed/attributed by device key; **rate-limit per peer**; CRDT merge is idempotent so replays are harmless; drop invalid-signature ops", and TM-D-03 covers relay flooding. Because this is the control that prevents griefing of minors' classrooms, it is p0 for the classroom feature set.

#### Scope
**In:** guest **draw approval** (a guest joins in observe-only state; the host approves before their content ops are accepted by any client); per-participant **op rate limits** enforced on receipt (default 200 ops/s and 256 KB/s sustained, burst 2x for 2 s) with a graduated response — throttle, then auto-mute, then notify the host; **wipe a participant's contributions** (tombstone every object authored by that device id in this session, as one undoable operation for the host); **report/block** (block is local: a blocked participant's ops and presence are ignored on your device; report packages a local, content-free abuse record the reporter can export and send out-of-band, since there is no server to report to); abuse counters surfaced to the host; relay-side per-connection limits coordinated with [SN-COL-007](collaboration.md#sn-col-007).
**Out:** host moderation controls ([SN-COL-018](collaboration.md#sn-col-018)); the relay service ([SN-COL-007](collaboration.md#sn-col-007)); the security test suite that exercises all of this ([SN-COL-022](collaboration.md#sn-col-022)).

#### Acceptance criteria
- [ ] A guest who has not been approved can join, see and follow, but **cannot draw**: their content ops are dropped by every receiving client, not merely hidden locally (CWE-862).
- [ ] Host approval takes effect within 2 s and is revocable; revoking returns the guest to observe-only.
- [ ] A participant exceeding the op rate limit is throttled within 1 s, auto-muted after 5 s of sustained abuse, and the host sees "<name> is sending too many edits" with Mute / Remove actions — the room stays interactive for everyone else throughout (CWE-400/770).
- [ ] "Clear <name>'s contributions" tombstones every object authored by that device in this session in a **single undoable step**, converges on all peers, and never touches other authors' objects.
- [ ] Blocking a participant locally stops their ops, presence and cursor from being processed on your device within 2 s and persists for the session.
- [ ] A report produces a local, exportable record containing timestamps, opaque peer ids, counters and the reporter's own note — and **no other user's note content** (privacy: reports must not become a content-exfiltration channel).
- [ ] With one participant flooding at 10x the limit, the host's editor still holds >= 60 fps and no frame exceeds 16.7 ms (locked budget), proven under [SN-COL-021](collaboration.md#sn-col-021).
- [ ] All abuse handling is receiver-side and survives a hostile client that ignores its own limits.

#### Technical notes
Implement `packages/sane_sync/lib/src/collab/abuse_guard.dart` (pure Dart: token-bucket per peer, graduated state machine, counters) invoked inside `CollabSession`'s inbound path ([SN-COL-004](collaboration.md#sn-col-004)) before capability filtering, so a flood is dropped as early as possible. Draw approval is an extension of the moderation control frames from [SN-COL-018](collaboration.md#sn-col-018) (`approveDraw`, `revokeDraw`), signed by the host key. "Clear contributions" uses the existing add-wins tombstone semantics (docs/architecture/document-model.md §4.1/§5) applied over the set of object ids whose op attribution matches the target device id, emitted as one undo group so the host can undo a mis-click ([SN-ED-003](editor.md#sn-ed-003) undo model). Local block state lives per session in `app/lib/collab/block_controller.dart` and is never transmitted (blocking must not tell the blocked person). Relay-side limits are configured in [SN-COL-007](collaboration.md#sn-col-007) and must be consistent with the client limits so neither side is the sole defence.

#### Security & privacy
Threats: TM-D-03 (flood/abuse of the room and relay), TM-T-01 (forged/unsigned ops — dropped by [SN-COL-006](collaboration.md#sn-col-006)), TM-S-03 (unapproved participant acting), plus the LINDDUN angle TM-P-02/TM-P-09 (a report must not collect personal data about the reported person beyond opaque ids and counters, MASVS-PRIVACY-2). Controls: receiver-side deny-by-default for unapproved draw (OWASP-A01, CWE-862), token-bucket rate limiting with graduated response (CWE-400/770, OWASP-A04), author-attributed tombstones (MASVS-AUTH-2), local-only block list, content-free abuse records, defence in depth at both client and relay (MASVS-NETWORK-1, ASVS-V17). Minors may be present, so the report flow must avoid collecting identity data (TM-P-07 COPPA/DPDP awareness). IDs: MASVS-AUTH-2, MASVS-PRIVACY-2, MASVS-NETWORK-1, ASVS-V17, OWASP-A01, OWASP-A04, CWE-770, CWE-400, CWE-862.

#### UX notes
Guest observe-only state shows a calm inline chip: "Watching — ask the host to let you draw" with a **Raise hand** action reusing the hand-raise queue from [SN-COL-018](collaboration.md#sn-col-018). Host-facing abuse alerts appear in the host control panel (never as a modal that interrupts teaching) with Mute / Clear contributions / Remove. "Clear contributions" confirms with a count ("Remove 42 strokes by Guest 3?") and offers Undo in the toast. Report/block lives behind the participant row's overflow menu with neutral wording. All surfaces use `sane_ui` tokens, render in all 17 looks light and dark, meet 44 pt / 48 dp targets and >= 4.5:1 contrast, are keyboard reachable on web, and announce state changes to screen readers (PRD-CO-320/321/330).

#### Test plan
`packages/sane_sync/test/collab/abuse_guard_test.dart` (token bucket, graduated response, burst tolerance, hostile-client independence), `packages/sane_sync/test/collab/clear_contributions_test.dart` (author-scoped tombstones, convergence, undo as one group), `app/test/security/collab_unapproved_guest_test.dart` (unapproved ops dropped by receivers), `app/test/collab/block_report_test.dart` (local block, content-free report record), `app/integration_test/collab_abuse_test.dart` (flooding peer does not degrade the host's frame budget).

#### Dependencies
[SN-COL-018](collaboration.md#sn-col-018) (host controls and signed control frames). Coordinates limits with [SN-COL-007](collaboration.md#sn-col-007); exercised by [SN-COL-021](collaboration.md#sn-col-021) and [SN-COL-022](collaboration.md#sn-col-022).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-020

<a id="sn-col-020"></a>

**Queue offline edits and reconcile a room through the cloud-drive sync layer**

| Field | Value |
|---|---|
| GitHub | #516 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, sync, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-004](collaboration.md#sn-col-004), [SN-SYNC-016](sync.md#sn-sync-016) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `ASVS-V11`, `OWASP-A08`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
PRD-CO-105 is the promise that makes live collaboration safe to use: when peers are **offline**, edits must queue locally and reconcile via the file-based sync layer over the user's own cloud drive, and "the room re-forms on reconnect without conflict copies" — the single-writer op-log segment design (docs/architecture/file-format.md §3, docs/architecture/sync.md) is what makes that true. ADR-0013 says the same from the transport side: "peers reconcile late/offline via the cloud drive — the file layer is always the durable fallback", and lists NAT-traversal failure as an availability threat whose mitigation is "always the cloud-drive reconciliation fallback so no edit is ever lost". This issue is where the live path and the durable path are stitched together so a user never experiences collaboration failure as data loss, and never sees a "conflicted copy" file.

#### Scope
**In:** a single commit path where every local op is appended to the durable op-log **first** and broadcast to peers second (never the reverse), so a crash or disconnect can never lose an op that a peer already saw; the outbound queue for peers that are temporarily unreachable, bounded and drained in order on reconnect; the reconnect reconciliation handshake (exchange HLC/sequence vectors, request only the missing range, apply idempotently); catch-up from the relay buffer ([SN-COL-007](collaboration.md#sn-col-007)) when a peer was away briefly, and from the cloud drive when it was away longer; degraded-mode UX wiring ("Saved on this device — will sync"); automatic room re-formation when connectivity returns, without re-prompting the user to rejoin.
**Out:** the cloud-drive adapters and reconciliation engine themselves ([SN-SYNC-001](sync.md#sn-sync-001), [SN-SYNC-016](sync.md#sn-sync-016)); the transport ([SN-COL-005](collaboration.md#sn-col-005)); relay buffering ([SN-COL-007](collaboration.md#sn-col-007)).

#### Acceptance criteria
- [ ] Two devices edit the same page while both offline; on reconnect they converge with **all strokes present**, no lost update and **no conflict copy** anywhere on the drive (PRD-CO-105, PRD-CO-100).
- [ ] An op is durably appended to the local op-log before it is broadcast; killing the app immediately after a broadcast loses nothing on either side (verified by a crash-injection test).
- [ ] A peer away for < 10 minutes catches up from the relay buffer in one round trip; a peer away longer falls back to cloud-drive catch-up ([SN-SYNC-016](sync.md#sn-sync-016)) and still converges.
- [ ] Reconnection requests only the missing op range (HLC/sequence-vector diff), not the whole history; catching up 10,000 ops takes < 3 s on the reference mid-range Android.
- [ ] Re-applying an op already merged changes nothing (idempotence), and out-of-order or rolled-back segments are rejected (TM-T-02).
- [ ] While disconnected, the editor stays fully writable with a non-alarming status ("Saved on this device"), and no error dialog is shown; the presence rail shows the room as Reconnecting.
- [ ] The room re-forms automatically on reconnect within 10 s, keeping the same room id and epoch, without asking the user to re-join or re-consent.
- [ ] Queue bounds are enforced (default 50,000 ops / 16 MB); beyond them the live queue is dropped and the peer is told to catch up from the durable layer instead — never an unbounded memory grab (CWE-770 class).

#### Technical notes
Wire the commit path in `packages/sane_sync/lib/src/collab/collab_session.dart` so `append-then-broadcast` is the only ordering, reusing the existing segment writer ([SN-SYNC-002](sync.md#sn-sync-002)) — do not create a parallel persistence path. The reconciliation handshake reuses the HLC/sequence vectors already exchanged by the file layer ([SN-SYNC-016](sync.md#sn-sync-016) catch-up and op-log replay) so the two paths share one notion of "what I have". Live frames are the same encrypted records as segment records (docs/architecture/file-format.md §3.3), so a frame received live can be persisted into the local mirror of the sender's segment without re-encryption, and a record read from the drive can be broadcast without re-framing. Degraded-state strings come from the session state machine ([SN-COL-004](collaboration.md#sn-col-004)). Everything runs on the sync isolate; the draw loop never awaits it (CLAUDE.md §8).

#### Security & privacy
Threats: TM-T-01 (a peer or the relay feeding a forged frame during catch-up — every record's AEAD tag is verified before use, fail closed, MASVS-CRYPTO-2), TM-T-02 (replay/rollback of old ops to revert edits — rejected via HLC and per-device monotonic sequence), TM-D-01/TM-D-03 (an unbounded catch-up stream as a resource attack — bounded ranges and queue caps, CWE-20), TM-I-01 (queued ops on disk are encrypted at rest like all content, MASVS-STORAGE-1). Availability itself is the security property here: ADR-0013's "NAT-traversal failure blocks collaboration" threat is mitigated exactly by this fallback. IDs: MASVS-STORAGE-1, MASVS-CRYPTO-2, ASVS-V11, OWASP-A08, CWE-20.

#### UX notes
Status wording must never suggest loss. Use the sync status vocabulary already designed for the file layer ([SN-SYNC-020](sync.md#sn-sync-020), docs/design/screens-and-flows.md §12): **Live**, **Reconnecting — saved on this device**, **Catching up...**, **Up to date**. The presence rail dims rather than disappears while reconnecting ([SN-COL-010](collaboration.md#sn-col-010)). No modal ever appears for a transient disconnect. States rendered in all 17 looks light and dark, with a non-colour icon cue and a screen-reader announcement when the state changes ("Reconnected, live").

#### Test plan
`packages/sane_sync/test/collab/offline_queue_test.dart` (append-then-broadcast ordering, queue bounds, drain order), `packages/sane_sync/test/collab/reconcile_test.dart` (vector diff, missing-range request, idempotent apply, rollback rejection), `packages/sane_sync/test/collab/crash_injection_test.dart` (kill after broadcast, after append, mid-flush), `app/integration_test/collab_offline_merge_test.dart` (two devices offline -> reconnect -> converge, no conflict copy — the M6/M4 exit-criterion scenario), plus a soak case added to [SN-SYNC-025](sync.md#sn-sync-025).

#### Dependencies
[SN-COL-004](collaboration.md#sn-col-004) (session), [SN-SYNC-016](sync.md#sn-sync-016) (catch-up and op-log replay). Uses [SN-SYNC-002](sync.md#sn-sync-002) segments and [SN-COL-007](collaboration.md#sn-col-007) relay buffering.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-021

<a id="sn-col-021"></a>

**Build the collaboration load and scale test harness**

| Field | Value |
|---|---|
| GitHub | #517 |
| Type | test |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | collaboration, qa, perf |
| Size | L |
| SDLC | verification |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-007](collaboration.md#sn-col-007), [SN-COL-017](collaboration.md#sn-col-017) |
| Security controls | `MASVS-NETWORK-1`, `ASVS-V17`, `OWASP-A04`, `CWE-400`, `CWE-770` |
| Extra labels | agent-ready |

#### Context
The collaboration design makes three quantitative claims that nothing currently verifies: a mesh room stays interactive to roughly 30 peers (PRD-CO-102, research §7 puts the WebRTC mesh cap near ~35), a classroom of 100–200 participants works through host-broadcast/star topology without mesh melt-down (PRD-CO-124), and a flooding or misbehaving peer cannot degrade anyone else's editor below the locked 60 fps / 16.7 ms budget. Risk R3 in PRD-04 §11.3 is explicit that large classes degrade if the relay is unavailable. docs/roadmap.md M6 makes the scale behaviour an exit criterion. This issue builds the harness that turns those claims into numbers on every release candidate, in the same spirit as `tools/perf_harness` for ink latency ([SN-PERF-002](perf.md#sn-perf-002)).

#### Scope
**In:** `tools/collab_load/` — a headless driver that spawns N simulated peers (each a real `CollabSession` over the real transport or a loopback transport) against a locally running relay ([SN-COL-007](collaboration.md#sn-col-007)); scenario scripts (30-peer mesh writing simultaneously; 100- and 200-participant classroom with one broadcasting host; churn scenario with peers joining/leaving every few seconds; flood scenario with one abusive peer; NAT/TURN-forced scenario); metrics collection (op delivery latency p50/p95/p99, delivered/dropped counts, convergence time after quiescence, relay CPU/memory/bandwidth, client frame times when a real device is in the loop); pass/fail thresholds and a JSON report; a CI job that runs the reduced scenario set on every PR touching collaboration code and the full set nightly.
**Out:** the security/abuse assertions ([SN-COL-022](collaboration.md#sn-col-022)); production relay capacity planning and deployment ([SN-COL-023](collaboration.md#sn-col-023)); ink-latency measurement ([SN-PERF-002](perf.md#sn-perf-002)).

#### Acceptance criteria
- [ ] The harness can drive >= 200 simulated participants from one machine (or a documented small fleet) and reports latency percentiles per scenario.
- [ ] **Mesh scenario:** 30 peers all writing converge with zero lost ops; op delivery p95 <= 300 ms; the run is repeatable and its numbers are recorded in the report.
- [ ] **Classroom scenario:** 100 participants with one host converge; the host's outbound connection count stays bounded (star topology holds, PRD-CO-124); relay memory stays flat over a 30-minute run (no buffer leak).
- [ ] **Churn scenario:** 50 join/leave events per minute for 10 minutes leaves no orphaned rooms on the relay and no leaked peer connections on clients.
- [ ] **Flood scenario:** one peer sending 10x the rate limit is throttled and auto-muted ([SN-COL-019](collaboration.md#sn-col-019)) while every other participant's delivery p95 stays within threshold.
- [ ] **Relay-forced scenario:** with `iceTransportPolicy: relay`, all scenarios still pass with degraded but bounded latency, and the bandwidth cost per session-hour is reported for [SN-COL-023](collaboration.md#sn-col-023).
- [ ] Thresholds live in a committed config file; the CI job fails the build when a scenario regresses past its threshold, and the report is attached to the run.
- [ ] Running the harness requires no credentials and no production infrastructure: it spins up its own relay and (optionally) a local TURN container.

#### Technical notes
Build the driver as a Dart CLI in `tools/collab_load/bin/collab_load.dart` reusing `CollabSession` ([SN-COL-004](collaboration.md#sn-col-004)) and `FakeCollabTransport` for the pure-scale runs, plus the real WebRTC transport ([SN-COL-005](collaboration.md#sn-col-005)) for a smaller "realistic" run so both the protocol and the stack are exercised. Follow the reporting conventions of `tools/perf_harness` so collaboration numbers sit next to latency numbers in CI artefacts ([SN-PERF-003](perf.md#sn-perf-003) gates). Device-in-the-loop runs use the configs in `tools/device_lab/` to capture frame times on the reference iPad and mid-range Android while N simulated peers hammer the room. Keep simulated peers cryptographically real (they perform the membership handshake from [SN-COL-006](collaboration.md#sn-col-006)) so the handshake cost is included in the measurements.

#### Security & privacy
A load harness is also a DoS-resistance test, so it doubles as verification for TM-D-03 (relay flood) and ADR-0013's "malicious peer floods/forges ops" row: the flood scenario proves the rate limits of [SN-COL-019](collaboration.md#sn-col-019) and [SN-COL-007](collaboration.md#sn-col-007) hold under real pressure (CWE-400/770, OWASP-A04). The harness must use synthetic content only — never a real user's notebook — and must not write captured frames to disk beyond the run directory, which is git-ignored. Because it can generate significant traffic, its README must warn that it is only ever pointed at a local or explicitly owned relay, never at a third party (ASVS-V17 responsible testing). IDs: MASVS-NETWORK-1, ASVS-V17, OWASP-A04, CWE-400, CWE-770.

#### UX notes
None beyond baseline — this is developer tooling with no user surface. Baseline applies: the harness logs no note content (its content is synthetic), no keys and no tokens, and its report contains only counts, timings and opaque ids. Its output is what lets the team make honest product claims about classroom size, which feeds the pricing and marketing copy prepared by the documentation and website work (SN-DOC-001, SN-SITE-001).

#### Test plan
The harness is test infrastructure, but it carries its own tests: `tools/collab_load/test/scenario_runner_test.dart` (scenario parsing, threshold evaluation, report shape) and `tools/collab_load/test/metrics_test.dart` (percentile maths). Validation runs: the five scenarios above executed on a clean checkout, with the JSON reports committed as baselines under `tools/collab_load/baselines/`. CI wiring added to `.github/workflows/devsecops.yml` (reduced set per PR, full set nightly).

#### Dependencies
[SN-COL-007](collaboration.md#sn-col-007) (relay under test), [SN-COL-017](collaboration.md#sn-col-017) (classroom topology). Exercises [SN-COL-019](collaboration.md#sn-col-019) limits; reports alongside [SN-PERF-003](perf.md#sn-perf-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-022

<a id="sn-col-022"></a>

**Add the collaboration security and abuse test suite**

| Field | Value |
|---|---|
| GitHub | #518 |
| Type | test |
| Priority | p0 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, security, qa |
| Size | L |
| SDLC | verification |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-006](collaboration.md#sn-col-006), [SN-COL-013](collaboration.md#sn-col-013), [SN-COL-019](collaboration.md#sn-col-019), [SN-COL-020](collaboration.md#sn-col-020) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `MASVS-PRIVACY-1`, `MASVS-RESILIENCE-4`, `ASVS-V17`, `OWASP-A01`, `OWASP-A02`, `OWASP-A08`, `CWE-287`, `CWE-294`, `CWE-311`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
docs/security/threat-model.md §5 lists, for every collaboration threat, the concrete verification that must exist — "Test: rotated key excludes revoked member; relay-only sees ciphertext" (TM-S-03), "replayed old segment does not regress state" (TM-T-02), "Load test; relay-down fallback test" (TM-D-03) — and CLAUDE.md §10 requires negative/abuse tests plus a regression test for every fixed vulnerability. docs/roadmap.md M6 turns several of these into exit criteria, and M7 will run a pentest against exactly these abuse cases. This issue gathers them into one maintained suite so the guarantees are proven continuously rather than argued in a PR description. It is the collaboration counterpart of the identity abuse suite ([SN-AUTH-019](auth.md#sn-auth-019)) and the crypto verification work ([SN-CRY-024](security.md#sn-cry-024)).

#### Scope
**In:** an adversarial harness with a **hostile peer** implementation that can be scripted to misbehave (skip the handshake, forge a signature, replay captured frames, claim a higher role, emit host control frames, flood, send oversized/malformed frames, downgrade the protocol version) and a **hostile relay** implementation (drop, reorder, duplicate, delay, inject, and attempt to read frames); test cases covering every collaboration row of the STRIDE/LINDDUN registers; a privacy assertion set (no plaintext or key material in relay logs, metrics, memory or crash reports; no note content in push payloads; presence opt-out honoured at the wire level); a revocation end-to-end case (remove member -> rotate -> denied rejoin and denied next sync); fuzzing of the frame decoder with a seeded corpus; and CI wiring as a required check with a documented triage path for failures.
**Out:** the relay invariant gate itself ([SN-COL-008](collaboration.md#sn-col-008), which this suite complements rather than duplicates); scale/perf thresholds ([SN-COL-021](collaboration.md#sn-col-021)); the M7 manual pentest.

#### Acceptance criteria
- [ ] **Unauthorised join** (TM-S-03): a peer without a valid membership proof is refused; with a proof for a different room, refused; with a replayed proof from another connection, refused (CWE-287/294).
- [ ] **Forged ops** (TM-T-01): frames with invalid AEAD tags, wrong AAD, or unknown device keys are dropped; nothing partially applies; counters increment.
- [ ] **Replay/rollback** (TM-T-02): replaying a captured op batch changes no state; an attempt to roll state back to an earlier HLC/sequence is rejected.
- [ ] **Role escalation**: a client that lies about its role in every frame field still cannot mutate beyond its cryptographic capability ([SN-COL-013](collaboration.md#sn-col-013)).
- [ ] **Forged moderation**: a non-host emitting mute/lock/remove/approve frames changes nothing on any receiver ([SN-COL-018](collaboration.md#sn-col-018)).
- [ ] **Revocation** (M6 exit gate): after removal and key rotation, the ex-member cannot decrypt new frames, cannot rejoin, and their next cloud sync is denied ([SN-SHR-017](sharing-export.md#sn-shr-017)).
- [ ] **Hostile relay**: with a relay that drops, duplicates, reorders and injects, all honest peers still converge and no injected frame is applied; the relay's captured traffic contains no plaintext (CWE-311).
- [ ] **Flood/DoS** (TM-D-03): a peer at 10x limits is throttled and auto-muted, and a malformed-frame storm never crashes a client or the relay (CWE-400).
- [ ] **Downgrade**: a peer offering an older protocol version is either handled per the documented compatibility rule or refused with "update required" — never silently downgraded to weaker crypto (OWASP-A02).
- [ ] **Privacy**: assertions prove no content/keys in relay logs or metrics, no content in push payloads ([SN-COL-016](collaboration.md#sn-col-016)), presence opt-out emits nothing, and reports contain no third-party content.
- [ ] **Fuzzing**: the frame decoder survives a 100,000-case seeded fuzz run with zero crashes/hangs and zero partial applications; the corpus is committed.
- [ ] The suite is a required CI check; every future collaboration bug fix adds a regression case here (CLAUDE.md §10).

#### Technical notes
Hostile peer and relay live in `packages/sane_sync/test/collab/adversary/` and `services/relay/test/adversary/` so they are test-only code that can never ship. Reuse the protocol vectors from [SN-COL-003](collaboration.md#sn-col-003) and the load driver from [SN-COL-021](collaboration.md#sn-col-021) for the flood cases. Fuzzing follows the parser-fuzzing conventions already required for `.sanenote`/PDF/audio (CLAUDE.md §10, docs/security/ssdlc-process.md verification stage) with the corpus under `packages/sane_sync/test/collab/fuzz/corpus/`. Map every test to its `TM-*` id in the test name or a doc comment so docs/security/controls-matrix.md can cite the file, and flip the relevant threat-model rows from Designed to Implemented in the same PR.

#### Security & privacy
This issue *is* the security verification for the collaboration surface: TM-S-03, TM-T-01, TM-T-02, TM-R-01, TM-I-01, TM-I-09, TM-D-03, TM-P-01/P-02/P-04 and ADR-0013's threat table. Controls proven: peer authentication and channel binding (MASVS-AUTH-1), AEAD verification and fail-closed decrypt (MASVS-CRYPTO-2), ciphertext-only transport (MASVS-NETWORK-1, CWE-311), metadata minimisation (MASVS-PRIVACY-1), resistance to a tampered/hostile intermediary (MASVS-RESILIENCE-4), deny-by-default authorisation (OWASP-A01), and integrity-failure handling (OWASP-A08). A failing case in this suite is a release blocker, not a flake to retry. IDs: MASVS-AUTH-1, MASVS-CRYPTO-2, MASVS-NETWORK-1, MASVS-PRIVACY-1, MASVS-RESILIENCE-4, ASVS-V17, OWASP-A01, OWASP-A02, OWASP-A08, CWE-287, CWE-294, CWE-311, CWE-400.

#### UX notes
None beyond baseline — no user-facing surface. Baseline: tests use synthetic content only, never real user data; no key material, token or note content is written to test output or CI logs; failure output identifies cases by opaque ids. Two user-visible behaviours are asserted here on behalf of the UI issues: the refusal copy from [SN-COL-006](collaboration.md#sn-col-006) must never leak which check failed, and a downgrade refusal must show "update required" rather than a crypto error.

#### Test plan
Files: `packages/sane_sync/test/collab/adversary/hostile_peer_test.dart`, `adversary/hostile_relay_test.dart`, `adversary/replay_rollback_test.dart`, `adversary/role_escalation_test.dart`, `adversary/forged_moderation_test.dart`, `packages/sane_sync/test/collab/fuzz/frame_decoder_fuzz_test.dart`, `app/test/security/collab_privacy_assertions_test.dart`, `app/integration_test/collab_revocation_e2e_test.dart`, `services/relay/test/adversary/log_and_metrics_privacy_test.dart`. CI: a required `collab-security` job in `.github/workflows/devsecops.yml`.

#### Dependencies
[SN-COL-006](collaboration.md#sn-col-006), [SN-COL-013](collaboration.md#sn-col-013), [SN-COL-019](collaboration.md#sn-col-019), [SN-COL-020](collaboration.md#sn-col-020). Complements [SN-COL-008](collaboration.md#sn-col-008) and feeds the M7 verification work under [SN-SEC-001](security.md#sn-sec-001) and [SN-QA-001](qa.md#sn-qa-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-COL-023

<a id="sn-col-023"></a>

**Operate the relay: hosting decision, rate limits, log allow-list and runbook**

| Field | Value |
|---|---|
| GitHub | #519 |
| Type | infra |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | collaboration, ci-cd, privacy |
| Size | M |
| SDLC | release |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-007](collaboration.md#sn-col-007), [SN-COL-008](collaboration.md#sn-col-008), [SN-COL-021](collaboration.md#sn-col-021) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-2`, `ASVS-V16`, `ASVS-V17`, `OWASP-A05`, `OWASP-A09`, `CWE-400`, `CWE-532` |
| Extra labels | needs-decision, needs-credentials |

#### Context
ADR-0013's open follow-ups and CLAUDE.md §13 both record the same unresolved item: **relay hosting (self-host vs managed) and hosted-vs-BYO TURN for NAT traversal**, echoed as PRD-04 open question 3 ("who runs the optional ciphertext relay, and is a TURN server bundled?"), with risk R3 noting that large classes degrade if the relay is unavailable. This issue takes the built service ([SN-COL-007](collaboration.md#sn-col-007)), its invariant gate ([SN-COL-008](collaboration.md#sn-col-008)) and the measured capacity numbers ([SN-COL-021](collaboration.md#sn-col-021)) and turns them into something operable: a written hosting recommendation for the maintainer to choose from, the deployment artefacts for the chosen option, production-side limits, a privacy-preserving log/metrics configuration, and a runbook. It is deliberately marked `needs-decision` and `needs-credentials`: an agent can prepare everything, but the maintainer must pick the hosting model and supply the infrastructure credentials (which are never committed — CLAUDE.md §7 rule 2, §13).

#### Scope
**In:** a written comparison (self-hosted container on a small VM, managed container platform, and BYO/self-host-your-own-relay for privacy-maximalist users) with cost-per-session-hour from the [SN-COL-021](collaboration.md#sn-col-021) bandwidth numbers and the availability consequences of each; the deployment artefacts for the chosen option (Dockerfile hardening, non-root user, read-only filesystem, resource limits, health checks, TLS termination, horizontal-scale notes and the sticky-room caveat from [SN-COL-007](collaboration.md#sn-col-007)); production rate limits and connection caps tuned to the measured numbers; TURN configuration (coturn) with short-lived HMAC credentials issued by the relay and a documented BYO-TURN setting; a log allow-list and retention policy (connection metadata only, <= 7 days) plus metrics that carry no room ids or user identifiers; alerting on saturation and error-rate; a `docs/ops/relay-runbook.md` (deploy, roll back, rotate the TURN secret, drain a node, incident steps, what the operator can and cannot see); and a privacy-dashboard entry stating plainly what the relay observes.
**Out:** the service implementation ([SN-COL-007](collaboration.md#sn-col-007)); the invariant CI gate ([SN-COL-008](collaboration.md#sn-col-008)); load testing ([SN-COL-021](collaboration.md#sn-col-021)); entitlement service operations.

#### Acceptance criteria
- [ ] A decision memo lists the three hosting options with cost, availability, privacy and maintenance trade-offs and a recommended default; the maintainer's choice is recorded in docs/adr/0013-collaboration-transport.md (or a follow-up ADR) before deployment work is merged.
- [ ] Deployment artefacts run the relay as a non-root user with a read-only root filesystem, explicit CPU/memory limits, and no volume that could persist room data (reinforcing [SN-COL-008](collaboration.md#sn-col-008)).
- [ ] TLS is mandatory in production; a plaintext listener cannot start; certificates renew automatically and the runbook documents the failure path.
- [ ] Production limits are set from measured data (connections per node, rooms per node, frames/s and bytes/s per peer) with at least 30% headroom at the measured p95 load, and saturation triggers an alert before user-visible failure.
- [ ] TURN credentials are short-lived (<= 10 minutes), minted from a secret supplied by the environment/CI secret store, rotatable without downtime, and never logged; a BYO-TURN configuration path is documented for users who want to run their own.
- [ ] Logs and metrics are proven to contain only allow-listed fields with <= 7-day retention; a review checklist item exists for any future field addition (CWE-532, TM-R-02).
- [ ] `docs/ops/relay-runbook.md` exists and covers deploy, rollback, secret rotation, node drain, saturation response and incident handling, including the honest statement of what an operator can observe (timing, sizes, IP addresses) and cannot (any content).
- [ ] Relay downtime is verified to degrade gracefully: with the relay unreachable, P2P rooms still form on a LAN and all edits still reconcile through the cloud drive ([SN-COL-020](collaboration.md#sn-col-020)), with no data loss and no error modal.
- [ ] The privacy dashboard and privacy policy text describing the relay is drafted and linked for review by [SN-PRV-001](privacy.md#sn-prv-001).

#### Technical notes
Keep infrastructure-as-code in `services/relay/deploy/` (Dockerfile, compose/manifest, and the coturn config template) so the invariant checker in [SN-COL-008](collaboration.md#sn-col-008) can also assert no database/volume is introduced. Client configuration flows through `SANE_RELAY_URL` per docs/architecture/overview.md §7.1, with dev pointing at `mock`, beta at staging and release at production — the relay URL is not a secret, but the TURN shared secret is and must come from CI secrets only. Follow docs/security/devsecops-pipeline.md for image scanning, pinned base images and SBOM generation for the service image ([SN-CI-001](ci-cd.md#sn-ci-001) conventions), and make the relay image part of the release artefact set ([SN-CI-004](ci-cd.md#sn-ci-004)).

#### Security & privacy
The relay is a network-exposed service we run, so it inherits the classic operational risks even though it holds no content: misconfiguration (OWASP-A05) such as an open plaintext port or a debug endpoint, insufficient logging/monitoring (OWASP-A09), and resource exhaustion (CWE-400). It is also the only place where **IP addresses and timing** of our users are observable (TM-P-02 identifiability, TM-P-04 detectability), so retention limits, field allow-listing (CWE-532) and honest disclosure are the privacy controls (MASVS-PRIVACY-2). Ciphertext-only forwarding remains guaranteed by design and by [SN-COL-008](collaboration.md#sn-col-008) (MASVS-NETWORK-1, ASVS-V17); operational audit events follow ASVS-V16. IDs: MASVS-NETWORK-1, MASVS-PRIVACY-2, ASVS-V16, ASVS-V17, OWASP-A05, OWASP-A09, CWE-400, CWE-532.

#### UX notes
Two user-facing consequences to get right: the privacy dashboard entry (docs/design/screens-and-flows.md §12 Settings -> Privacy) must state in plain language that the relay sees only encrypted bytes, keeps nothing, and may observe connection timing and IP address — with the relay-only/TURN privacy option from [SN-COL-005](collaboration.md#sn-col-005) explained next to it; and relay unavailability must surface as "Live collaboration is unavailable right now — your notes still sync" rather than an error, using the existing sync status vocabulary ([SN-SYNC-020](sync.md#sn-sync-020)). Both strings render in all 17 looks light/dark and are screen-reader announced.

#### Test plan
Infrastructure tests: `services/relay/test/deploy/container_hardening_test.dart` or an equivalent script asserting non-root, read-only FS and no persistent volume; a TLS-only startup test; a config test proving production limits load from the environment; a log/metrics privacy test extending [SN-COL-007](collaboration.md#sn-col-007)'s allow-list test with the production configuration. Manual/verification steps recorded in the runbook: a staged deploy, a rollback, a TURN secret rotation with an active session, and a relay-down drill proving graceful degradation (paired with `app/integration_test/collab_relay_down_test.dart`).

#### Dependencies
[SN-COL-007](collaboration.md#sn-col-007) (service), [SN-COL-008](collaboration.md#sn-col-008) (invariant gate), [SN-COL-021](collaboration.md#sn-col-021) (capacity numbers). **Blocked on a maintainer decision** (relay + TURN hosting model, CLAUDE.md §13) and **maintainer-supplied credentials** (hosting account, TLS certificates, TURN shared secret) — supplied via CI secrets, never committed.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GOPS-007

<a id="sn-gops-007"></a>

**Build the abuse-report intake and trust-and-safety response for rooms**

| Field | Value |
|---|---|
| GitHub | #1103 |
| Type | security |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | collaboration, security, privacy |
| Size | L |
| SDLC | maintenance |
| Parent | [SN-COL-001](collaboration.md#sn-col-001) |
| Depends on | [SN-COL-019](collaboration.md#sn-col-019), [SN-COL-018](collaboration.md#sn-col-018), [SN-PRV-007](privacy.md#sn-prv-007) |
| Security controls | `MASVS-PRIVACY-2`, `OWASP-A01`, `CWE-359`, `CWE-770` |
| Extra labels | needs-decision, sec: privacy-by-design |

#### Context
[SN-COL-019](collaboration.md#sn-col-019) gives a room the in-product abuse floor — draw approval, rate limits, wipe and a **report** action — and [SN-COL-018](collaboration.md#sn-col-018) gives a classroom host moderation controls. Neither defines what happens *after* someone taps report: where it goes, who reads it, what we can even see (rooms are end-to-end encrypted; the relay forwards ciphertext only, [SN-COL-008](collaboration.md#sn-col-008)), what actions exist at our end, and what the duty of care is when the participants are minors ([SN-PRV-007](privacy.md#sn-prv-007) age gate, [SN-GSEC-012](privacy.md#sn-gsec-012) minor-safe gating). A classroom product without a trust-and-safety process is both a user-safety failure and a store-policy risk: both stores require a reporting mechanism and a response process for user-generated content shared between users.

#### Scope
**In:** `docs/trust-and-safety/runbook.md` — the report payload spec (what the client may send without breaking zero-knowledge: room id hash, timestamp, reporter's role, reporter-authored description, and an **optional, explicitly consented, reporter-decrypted excerpt** they choose to attach), the intake channel and SLA, the response ladder (guidance to the host -> revoke the share link and rotate the content key [SN-SHR-017](sharing-export.md#sn-shr-017) -> block a device key from re-joining [SN-CRY-019](security.md#sn-cry-019) -> block a room id at the relay -> refer to law enforcement for the narrow legally mandated categories), the minors-specific path, evidence retention limits, and an appeal path; the relay-side room-id block list with its retention and its non-content log allow-list ([SN-COL-023](collaboration.md#sn-col-023)); a user-facing **community and classroom rules** page in the help centre; a transparency statement of what we can and cannot see.
**Out:** the in-room controls themselves ([SN-COL-018](collaboration.md#sn-col-018), [SN-COL-019](collaboration.md#sn-col-019)); relay operation ([SN-COL-023](collaboration.md#sn-col-023)); the age gate ([SN-PRV-007](privacy.md#sn-prv-007)); repo-side conduct ([SN-GOPS-005](docs.md#sn-gops-005)).

#### Acceptance criteria
- [ ] The report payload carries no plaintext note content unless the reporter explicitly attaches it, with a clear consent string; the default report contains only metadata the relay already handles.
- [ ] The runbook defines an acknowledgement target, a decision target, the ladder of actions with who may authorise each, and the record kept per case.
- [ ] Revocation actions are the cryptographic ones that already exist ([SN-SHR-017](sharing-export.md#sn-shr-017) key rotation, [SN-CRY-019](security.md#sn-cry-019) device revocation) — no new backdoor, no server-side content access is introduced by the process.
- [ ] A minors-involved report follows the documented expedited path and records the guardian/institution contact route.
- [ ] Evidence (reporter-supplied excerpts) has a stated retention window, is stored outside the repo, and is deleted on case closure unless a legal hold applies.
- [ ] The community/classroom rules page is published, linked from the join-a-room consent screen ([SN-COL-009](collaboration.md#sn-col-009)), and written at a student reading level.

#### Technical notes
The client sends the report over the same relay transport with a distinct frame type; the relay stores it in a small, access-controlled queue with the room-id block list, and nothing else. Blocking a room id must be enforceable without decrypting anything — the relay already sees room ids ([SN-COL-003](collaboration.md#sn-col-003)). Rate-limit report submission itself (CWE-770) so the report channel cannot be used to flood the operator, and keep the block list short-lived with an expiry.

#### Security & privacy
Threats: abuse of the report channel to deanonymise or harass (report metadata must not reveal other participants to the reporter), operator over-reach (a process that quietly grants us content access would break the product's central promise — the runbook must state that no such capability exists), retention of sensitive excerpts about minors (CWE-359), and denial of service against the queue (CWE-770). Controls: MASVS-PRIVACY-2, OWASP-A01 access control on the queue, minimisation and deletion, and an explicit statement in the privacy policy ([SN-PRV-017](privacy.md#sn-prv-017)) about what a report collects.

#### UX notes
Two user-facing surfaces, both in the design system: the report sheet (what you are reporting, a free-text field, an explicit "attach what I can see" toggle that is **off** by default with an honest explanation, and a confirmation that says what happens next), and the rules page in the help centre. Empty/confirm/error states per the standard overlay pattern; nothing implies that we can see the room.

#### Test plan
Integration: submit a report from a room and assert the frame contains no ciphertext payload and no other participant's identity unless attached; assert rate limiting after N reports. Unit: block-list enforcement rejects a join for a blocked room id and expires correctly. Manual/table-top: walk three scenarios (harassment in a classroom room, an adult joining a minors' room, a spam-draw flood) end to end through the ladder and confirm every action maps to an existing cryptographic or relay capability.

#### Dependencies
[SN-COL-019](collaboration.md#sn-col-019) (report action and abuse floor), [SN-COL-018](collaboration.md#sn-col-018) (host moderation), [SN-PRV-007](privacy.md#sn-prv-007) (age gate).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Store policy requirements for user-generated-content reporting are evidenced for both stores


---

