# ADR-0013: Real-time collaboration transport

- **Status:** Proposed (targets milestone M6; not v1)
- **Date:** 2026-09-13
- **Deciders:** Maintainer (Jatin Kumar Singh)
- **Relates to:** [ADR-0004 local-first](./0004-local-first-zero-server.md),
  [ADR-0005 document model & CRDT](./0005-document-model-and-crdt.md),
  [ADR-0006 sync over user cloud drives](./0006-sync-over-user-cloud-drives.md),
  [ADR-0007 E2EE & keys](./0007-end-to-end-encryption-and-keys.md).
- **Evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
  §7 (y-webrtc, relay-only-sees-ciphertext, share links, peer caps), §1 (P2P/NAT unreliability);
  [`../research/sources/security-standards-and-devsecops.md`](../research/sources/security-standards-and-devsecops.md)
  (ASVS V17 WebRTC).

## Context

The file-based sync engine ([ADR-0006](./0006-sync-over-user-cloud-drives.md)) reconciles devices with
seconds-to-hours latency — fine for solo multi-device, too slow for **live co-editing** (two students on one
lecture page, Google-Docs-style). M6 adds **real-time collaboration**, but it must not break the two load-
bearing promises: **zero server of record** ([ADR-0004](./0004-local-first-zero-server.md)) and **E2EE**
([ADR-0007](./0007-end-to-end-encryption-and-keys.md)). The research gives the pattern: **CRDT updates over
WebRTC data channels**, with signaling/TURN servers that only ever see **ciphertext or metadata**, plus a
**relay-only catch-up server** that forwards already-encrypted updates and holds no keys (research §7). Pure
P2P is unreliable (NAT traversal, research §1); WebRTC peer meshes cap at a few dozen peers.

## Decision

1. **Live editing propagates CRDT ops over WebRTC data channels**, peer-to-peer, using our op-log/CRDT model
   ([ADR-0005](./0005-document-model-and-crdt.md)) as the payload. Ops are the same encrypted frames used on
   disk ([`../architecture/file-format.md`](../architecture/file-format.md) §3), so the live path and the
   file path carry identical, interchangeable data. Peers reconcile late/offline via the cloud drive
   ([ADR-0006](./0006-sync-over-user-cloud-drives.md)) — the file layer is always the durable fallback.
2. **Signaling servers do peer discovery only.** They match peers by an opaque **room id**; no note content
   or keys pass through them. A **room secret** encrypts signaling traffic so even an untrusted signaling
   server cannot MITM (the y-webrtc model, research §7).
3. **App-layer payload is E2E-encrypted** under the notebook's Items/Share Key
   ([ADR-0007](./0007-end-to-end-encryption-and-keys.md)), so **any TURN relay carries only ciphertext**. A
   TURN relay (required when NAT traversal fails) is acceptable precisely because it cannot read the traffic.
4. **Optional relay-only catch-up server** (Anytype-style encrypted sync node): forwards already-encrypted
   updates and buffers them for late joiners/presence, **holds no keys, stores no plaintext, is not
   authoritative**. It solves NAT + presence + late-joiner catch-up without becoming a server of record.
5. **Share links carry `noteId` + a wrapped content key in the URL fragment** (`#…`), which **is never sent to
   any server**; the recipient's client uses it to join the room and decrypt locally
   ([ADR-0007](./0007-end-to-end-encryption-and-keys.md) §7). **Revocation = rotate the content/items key and
   re-seal to remaining members** (research §7).
6. **Peer authentication by public key** (Ed25519 device/identity keys, [ADR-0007](./0007-end-to-end-encryption-and-keys.md));
   a peer that cannot prove membership (present a validly-sealed key) is not admitted to the room.
7. **Small groups only.** WebRTC full-mesh caps at ~dozens of peers (research §7); we target small co-editing
   groups (a study group, not a lecture hall). Larger audiences get read-only shared snapshots via the file
   layer, not live mesh.
8. **Comply with ASVS V17 (WebRTC)** and treat signaling/relay as untrusted in the STRIDE/LINDDUN model.

## Consequences

**Positive**
- Live co-editing without a server of record or any plaintext leaving the device — keeps both core promises.
- Reuses the CRDT ops and encrypted frames verbatim; the live layer is a *transport*, not a second data model.
- Graceful degradation: peers offline or NAT-blocked still converge through the cloud drive; TURN/relay are
  optional accelerants, never trusted stores.

**Negative / costs**
- **NAT traversal needs STUN/TURN**; a TURN relay carries traffic (ciphertext) and costs bandwidth — an infra
  line item, though content-blind. Deciding hosted-vs-BYO TURN is an open question.
- **Signaling + optional relay are new (stateless) services** to run and secure, expanding ops/attack surface
  even though they hold no keys.
- **Full-mesh peer cap** limits group size; a future SFU-style or tree-relay design would be a bigger project.
- **Revocation is imperfect**: a removed member keeps ciphertext (and possibly cached plaintext) they already
  received; forward secrecy via key rotation only protects *future* edits — must be documented honestly.
- **Presence/typing indicators leak timing metadata** to peers/relay; minimise and disclose.

**Neutral**
- M6 scope: none of this ships in v1; the file layer covers solo multi-device fully. This ADR is **Proposed**
  and will be revisited (and moved to Accepted) at M6 planning.

## Alternatives considered

| Alternative | Verdict |
|---|---|
| **Central real-time server (authoritative)** | Simplest live editing, but a server of record with plaintext or a decryption oracle — violates [ADR-0004](./0004-local-first-zero-server.md)/[ADR-0007](./0007-end-to-end-encryption-and-keys.md). Rejected. |
| **Pure P2P, no relay at all** | Maximally serverless, but NAT traversal is unreliable in production (research §1) and there's no late-joiner catch-up. Rejected as the sole mechanism; WebRTC + optional relay chosen. |
| **File-drive polling as "real-time"** | Zero new infra, but seconds-to-hours latency is not live editing (research §4). Kept as the durable fallback, not the live path. |
| **CRDT library's built-in provider (e.g. y-webrtc) as-is** | Great reference and possibly usable transport, but tied to Yjs; our CRDT is custom Dart ([ADR-0005](./0005-document-model-and-crdt.md)). Adopt the *pattern* (encrypted payload, discovery-only signaling, room-secret) over the specific library. **verify** whether a Dart WebRTC stack (`flutter_webrtc`) + our frames is simpler than bridging a JS provider. |
| **SFU/media-server topology** | Scales past dozens of peers, but heavy infra and a bigger trust surface. Out of scope; revisit only if large live groups become a real requirement. |

## Threats (STRIDE + ASVS V17)

| Threat | Class | Mitigation |
|---|---|---|
| Signaling server MITMs peer setup | Tampering/Spoofing | room-secret-encrypted signaling; peer auth by Ed25519 public key; discovery-only signaling (no content) |
| TURN/relay reads live edits | Info disclosure | app-layer E2EE; relay/TURN carry only ciphertext; relay holds no keys |
| Unauthorized peer joins room | Spoofing/Elevation | membership proof = validly-sealed items/share key; reject peers without it |
| Share-link leaks note access | Disclosure | key rides URL **fragment** (never sent to servers); rotate+re-seal to revoke; short-lived link option |
| Removed collaborator keeps reading future edits | Access control | rotate Items/Share Key, re-seal to remaining members (forward secrecy); document that already-received ciphertext/plaintext can't be recalled |
| Malicious peer floods/forges ops | DoS/Tampering | ops signed/attributed by device key; rate-limit per peer; CRDT merge is idempotent so replays are harmless; drop invalid-signature ops |
| Presence/typing metadata leakage | Linkability/Detectability (LINDDUN) | minimise presence signals; disclose; make presence optional |
| Relay becomes a de-facto server of record | (Architecture drift) | relay is stateless, key-less, non-authoritative by contract; CI/infra check it has no note-store dependency; cloud drive remains the only durable store |
| NAT-traversal failure blocks collaboration | Availability | STUN then TURN fallback; and always the cloud-drive reconciliation fallback so no edit is ever lost |

## Notes / follow-ups (revisit at M6)

- **verify** the Dart real-time stack: `flutter_webrtc` maturity across iOS/Android/web/desktop; whether to
  reuse a signaling protocol or roll a minimal one; TURN hosting (managed vs self-hosted vs BYO).
- Decide relay hosting and whether presence needs the relay at all (P2P presence may suffice for small groups).
- Specify the room-id / room-secret derivation and the share-link format precisely (fragment schema, key
  wrapping) in a companion architecture doc before M6.
- Re-affirm the "relay never sees plaintext, never authoritative" invariant with an automated infra test.
