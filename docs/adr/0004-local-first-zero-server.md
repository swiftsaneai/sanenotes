# ADR-0004: Local-first, zero-server architecture

- **Status:** Accepted
- **Date:** 2026-09-13
- **Deciders:** Maintainer (Jatin Kumar Singh)
- **Supersedes / relates to:** [ADR-0001 stack](./0001-flutter-single-codebase.md); implemented by
  [ADR-0005 document model & CRDT](./0005-document-model-and-crdt.md),
  [ADR-0006 sync over user cloud drives](./0006-sync-over-user-cloud-drives.md),
  [ADR-0007 E2EE & keys](./0007-end-to-end-encryption-and-keys.md).
- **Evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
  (§1 Ink & Switch ideals, §5 existing designs),
  [`../research/sources/user-pain-points-and-market-gaps.md`](../research/sources/user-pain-points-and-market-gaps.md)
  (sync is the category's #1 complaint),
  [`../research/sources/security-standards-and-devsecops.md`](../research/sources/security-standards-and-devsecops.md)
  (GDPR/DPDP data minimisation; "no data collected" store labels).

## Context

The note-taking market splits into cloud apps (great collaboration/multi-device, poor privacy/longevity/
offline) and file-sync apps (great local access/longevity, "messy manual conflict resolution" — the
"Budget final final 3.xls" problem). Ink & Switch's *Local-first software* essay names **seven ideals** —
fast/no-spinners, multi-device, offline, seamless collaboration, longevity, security & privacy by default,
user control — that no incumbent satisfies simultaneously
([`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md) §1).

The product's reason to exist ([`../product/vision-and-principles.md`](../product/vision-and-principles.md))
includes **trustworthy local-first sync**, and the research is unambiguous that **sync is the single
most-complained-about surface in the entire category**. Students (our first persona) are multi-device,
price-sensitive, and the loudest when trust breaks. Our value order is **UX first, then security & privacy
first**, and local-first is the rare architecture that improves both at once (instant local reads/writes *and*
zero-knowledge privacy) rather than trading them off.

## Decision

**Notes live on the device and are never stored on a Sane Notes server. There is no server of record.**

1. **Local-first storage.** Every note is authored to and read from a local encrypted store (SQLite via
   `drift` + a content-addressed blob store), from first launch, offline, with no network round-trip on any
   read or write ("no spinners"). Guest mode is first-class; identity is never required to take notes.
2. **Zero-knowledge sync is optional and rides the user's own cloud.** Sync uses the **user's own** iCloud
   Drive / Google Drive (later OneDrive/Dropbox/WebDAV) as dumb, **end-to-end-encrypted** transport
   ([ADR-0006](./0006-sync-over-user-cloud-drives.md), [ADR-0007](./0007-end-to-end-encryption-and-keys.md)).
   Everything in the cloud is ciphertext the provider cannot read.
3. **The only optional Sane Notes services are stateless and ciphertext-only:** entitlement verification and
   an E2E collaboration relay that never sees plaintext ([ADR-0013](./0013-collaboration-transport.md)).
   Neither stores note content. Storage of notes on our infrastructure is prohibited by design.
4. **Longevity is guaranteed by an open format.** A documented `.sanenote` bundle plus PDF/PNG/SVG/Markdown/
   JSON export on the user's own device ([`../architecture/file-format.md`](../architecture/file-format.md))
   means the data outlives the app and the company (ideals #5, #7).
5. **Conflict-free by construction.** Merge is a CRDT concern on-device
   ([ADR-0005](./0005-document-model-and-crdt.md)); the cloud's own conflict handling is never trusted.

## Consequences

**Positive**
- Directly answers the category's #1 pain (sync) and its trust deficit; enables honest **"no data collected"**
  App Store / Play labels (research security §5) — a marketing *and* compliance win.
- Instant, offline, private by default; GDPR/DPDP data-minimisation largely satisfied by architecture, not
  policy.
- No note-storage infrastructure to run, secure, scale, or pay for; a breach of our servers exposes no notes.

**Negative / costs**
- **No vendor recovery.** Zero-knowledge means a lost passphrase + lost recovery code = unrecoverable notes.
  Mandates the recovery-code + platform-escrow UX ([ADR-0007](./0007-end-to-end-encryption-and-keys.md) §5)
  and blunt onboarding copy.
- **Merge complexity moves to the client** (CRDT engine, [ADR-0005](./0005-document-model-and-crdt.md)).
- **Sync latency is the provider's** (iCloud can take seconds-to-hours; research §4) — the UI must tolerate it
  and never block ([`../architecture/sync.md`](../architecture/sync.md) §10).
- **Cross-device collaboration is harder** than a central server would make it — solved with a ciphertext-only
  relay ([ADR-0013](./0013-collaboration-transport.md)), not a database.
- Some conveniences a server gives cheaply (server-side search across all notes, server-side sharing ACLs)
  must be done on-device or via E2EE constructs.

**Neutral**
- We still operate *some* services (entitlements, relay) — but stateless and content-blind, keeping the
  "zero-server-of-record" claim precise and honest.

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| **Cloud app (server of record, E2EE optional)** | Best collaboration, but fails longevity/offline/privacy ideals; reproduces the incumbents' central weakness and their trust problem. |
| **Vendor relay that stores encrypted notes** (Obsidian Sync / Standard Notes model) | Viable and E2EE, but still *our* servers holding user data + metadata; weaker "no data collected" story; infra cost/liability. Kept as the intellectual model for key design, not for storage. |
| **Pure P2P, no cloud** | NAT traversal is unreliable in production (research §1); no async "device offline" catch-up. Retained only for the real-time layer with relay assist ([ADR-0013](./0013-collaboration-transport.md)). |
| **Git-backed** | Genuinely local-first but "no fine-grained real-time collaboration" and treats ink/PDF as opaque blobs (research §1). |

## Threats (STRIDE/LINDDUN highlights; full model in
[`../security/threat-model.md`](../security/threat-model.md))

| Threat | Class | Mitigation |
|---|---|---|
| Cloud/provider breach reads notes | Info disclosure / Disclosure | client-side E2EE of every byte ([ADR-0007](./0007-end-to-end-encryption-and-keys.md)); provider holds only ciphertext |
| Vendor shutdown strands data | (Longevity) | open `.sanenote` bundle + on-device cleartext export; sync backend is the user's own cloud |
| Lost passphrase + recovery code = permanent loss | Availability | recovery code + platform-keychain escrow; blunt UX; **accepted residual risk** of zero-knowledge |
| Metadata leakage (sizes, timing, device count) | Linkability / Identifiability | opaque ids, encrypted metadata fields, size padding ([`../architecture/file-format.md`](../architecture/file-format.md) §6); document what stays cleartext |
| "No data collected" label is inaccurate | Non-compliance | keep telemetry opt-in + on-device aggregated; audit that only opt-in crash reports leave the device (research §5) |
| Local device theft while unlocked | Elevation / Disclosure | hardware-backed keys gated by biometrics; auto-lock; Data Protection / file-encryption at rest |

## Notes / follow-ups

- Confirm the entitlement service and collab relay are the *only* first-party services and that neither can be
  configured to persist note content (architectural invariant; add a CI check that the relay image has no
  note-store dependency). **verify.**
- Telemetry policy must be written to preserve the "no data collected" label; see product privacy section.
