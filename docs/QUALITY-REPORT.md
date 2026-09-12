# Sane Notes — Docs Quality & Consistency Report

> Cross-consistency pass over every file under `docs/` (all subfolders) against the project's
> LOCKED DECISIONS, against `issues/milestones.json`, and against each other. Records what was
> fixed and what remains an open maintainer decision. Generated during the M0 documentation
> hardening pass.

## Scope reviewed

All authored docs were read in full and cross-checked: `docs/adr/0001–0016`, `docs/architecture/*`
(overview, crypto, document-model, file-format, ink-engine, rendering-and-performance, sync),
`docs/platform/*` (ipad, android, web, phones, compatibility-matrix, performance-budgets),
`docs/product/*` (vision-and-principles, innovation-brief, prd-01…prd-04), `docs/design/*`
(design-system, screens-and-flows, tokens.json, README, ux-principles, component-inventory,
gestures-and-shortcuts, pen-and-brush-spec, accessibility), `docs/security/*` (threat-model,
controls-matrix, devsecops-pipeline, secure-coding-checklist, ssdlc-process),
`docs/research/competitor-feature-matrix.md`. The committed research sources under
`docs/research/sources/` are inputs and were not edited.

Automated checks run: a repo-wide broken-relative-link scan (now **0 broken links**), and greps
for crypto primitives, KDF params, the 17-look set, latency budgets, `--dart-define` flag names,
plugin names, ADR filenames, and milestone references.

---

## Fixed — cross-links & filenames

| # | Problem | Fix | Files |
|---|---|---|---|
| 1 | Broken link to a non-existent `0001-stack.md` (ADR-0001's real filename is `0001-flutter-single-codebase.md`) | Repointed every reference | `adr/0004`, `adr/0005` (×3), `adr/0007`, `architecture/crypto.md`, `architecture/document-model.md` (×2) |
| 2 | Wrong ADR-0001 filenames in backticked prose refs: `ADR-0001-stack.md`, `adr-0001-app-stack.md`, `ADR-0001-app-architecture.md`, `adr-0001-*.md` | Repointed to `0001-flutter-single-codebase.md` | `product/innovation-brief.md`, `product/vision-and-principles.md`, `product/prd-02`, `product/prd-03`, `product/prd-04` |
| 3 | PRD-01 listed **non-existent sibling PRDs** (`prd-02-pdf-and-audio.md`, `prd-03-ai-and-recognition.md`, `prd-04-library-and-notebooks.md`, `prd-05-sync-and-collab.md`) | Replaced with the actual four PRD filenames + their real scopes | `product/prd-01` |
| 4 | PRD-01 inline handoffs pointed at the wrong PRD: recognition/OCR/convert-math to `prd-03`, collaboration relay to a non-existent `prd-05` | Recognition engine → `prd-02` §11; Sage-AI framing → `prd-04` §4; collaboration/relay → `prd-04` §3; sync/E2EE → `prd-03` | `product/prd-01` (6 refs) |
| 5 | PRD-02 cross-refs used wrong filenames (`prd-01-editor-and-ink.md`, `prd-03-identity-sync-sharing.md`, `adr-0001-app-stack.md`) and mislabelled sharing/collab as PRD-03 | Corrected filenames; split identity/sync (prd-03) from sharing/collaboration (prd-04) | `product/prd-02` |
| 6 | PRD-04 mischaracterised **PRD-03** as owning "Audio & Recognition, handwriting recognition, OCR, transcription" — those live in **PRD-02** | Corrected the companion-PRD descriptions (recognition pipeline is PRD-02; PRD-03 is identity/sync/privacy/settings/billing) | `product/prd-04` |
| 7 | Overview pillar 2 ("zero-knowledge, local-first") linked only to **ADR-0010 (web/PWA)** | Repointed to **ADR-0004 (local-first)** + **ADR-0007 (E2EE)** | `architecture/overview.md` |
| 8 | PRD-02 said the authoritative roadmap is `docs/product/roadmap.md` (does not exist) | Repointed to `issues/milestones.json` | `product/prd-02` |

## Fixed — stale status annotations (referenced docs now exist)

| # | Problem | Fix | Files |
|---|---|---|---|
| 9 | `docs/security/threat-model.md` referenced as "(planned)" / "(verify path)" / "(to be authored)" although it exists and is complete | Removed the stale qualifier; made the references live links | `adr/0004`, `adr/0011`, `architecture/overview.md`, `architecture/document-model.md`, `product/vision-and-principles.md`, `product/prd-02`, `product/prd-04`, `platform/ipad.md`, `platform/android.md` |
| 10 | `ADR-0010` and `ADR-0012` referenced as "(planned)" although both exist | Removed "(planned)" | `platform/web.md` (×2), `platform/ipad.md`, `platform/android.md` |
| 11 | Overview monorepo tree marked `security/ controls (planned)` and `platform/ (planned)` although those dirs are populated | Updated the tree annotations to list the actual files | `architecture/overview.md` |

## Fixed — plugin naming (canonical set is ADR-0012 / overview §4)

| # | Problem | Fix | Files |
|---|---|---|---|
| 12 | `plugins/sane_keys` used for the secure-storage plugin, whose canonical name is `sane_secure_store` | Renamed to `sane_secure_store` | `adr/0007` (×2), `architecture/crypto.md` (×2) |
| 13 | `plugins/sane_sync_icloud` invented as a separate plugin; canonical is the federated `sane_cloud_drive` (its iCloud impl) | Reworded to the iCloud implementation of `sane_cloud_drive` | `architecture/sync.md` |

## Fixed — contradiction with a locked decision

| # | Problem | Fix | Files |
|---|---|---|---|
| 14 | The design mock's "SS Cloud" first-party backup target contradicts locked decision 3 (no Sane Notes server stores note content). `design/README.md` still speculated it "should likely become 'Sane Cloud'" (a first-party cloud), and `screens-and-flows.md` left it as an open question | Recorded the resolution from `prd-03` §0.4: **no first-party cloud**; "SS Cloud" is removed (not renamed), all backup targets are the user's own iCloud Drive / Google Drive | `design/README.md`, `design/screens-and-flows.md` |

## Fixed — numeric reconciliation

| # | Problem | Fix | Files |
|---|---|---|---|
| 15 | `pen-and-brush-spec.md` says "**Eight** default pens" while `prd-01` (PRD-ED-047) requires "**≥12** brushes" (13 listed) — same kit, two headline counts | Added a reconciliation note: the eight are the MUST-ship core; PRD-ED-047 adds SHOULD/MAY pens (Gel, Charcoal, Crayon) across later milestones via the same engine | `design/pen-and-brush-spec.md` |

## Fixed — milestone-scheme divergence from `issues/milestones.json`

The authoritative milestones are **M0 Foundations · M1 Ink Editor Alpha · M2 Library & Documents ·
M3 Audio & Recognition · M4 Identity, Sync & Privacy · M5 Phones & Platform Parity ·
M6 Collaboration, Sharing & Sage AI · M7 Beta Hardening & Security Audit · M8 Launch & Growth ·
Backlog**. Three product docs carried an **earlier, divergent** milestone interpretation whose
M-numbers collide with those IDs but mean different things (e.g. the innovation brief's "M2 = sync
& E2EE" is really milestones.json **M4**; its "M4 = audio" is really **M3**; PRD-02's "M6 = sync +
sharing + collaboration" splits into **M4** + **M6**).

| # | Fix | Files |
|---|---|---|
| 16 | Added a prominent, explicit note at each local milestone table stating that `issues/milestones.json` is authoritative, listing the real milestone titles, giving concrete examples of the mismatch, and declaring "where a number here conflicts, milestones.json wins; the issue tracker holds the binding assignment." The per-feature/per-requirement M-tags are labelled indicative sequencing. | `product/innovation-brief.md`, `product/prd-01` (§0.3), `product/prd-02` (§1.1) |

> `product/prd-04` was already correct — it references the milestones by their real
> `issues/milestones.json` titles and needed no change.

---

## Consistency verified — no change needed

- **Crypto is uniform everywhere**: AEAD = XChaCha20-Poly1305 (AES-256-GCM permitted alt);
  Argon2id **64 MiB / 5 iters / p=1** (= `memKiB: 65536`); HKDF-SHA-256; Ed25519; X25519;
  BLAKE3-256 (SHA-256 fallback). Matches locked decision 3 across ADR-0007, `crypto.md`,
  `file-format.md`, `prd-03`, `controls-matrix.md`, `secure-coding-checklist.md`, `threat-model.md`,
  `vision-and-principles.md`, `innovation-brief.md`.
- **Latency budgets are uniform**: ≤16 ms iPad / ≤25 ms mid-Android / ≤30 ms web-Chrome; 60 fps
  floor / 120 fps where the display allows; cold start <1.5 s / <2 s / <3 s; 1,000-page open <1 s;
  600-page PDF at 60 fps; <300 MB on 4 GB Android; ≤12 % / 2 h iPad Pro. Consistent across
  `overview.md`, `rendering-and-performance.md`, `performance-budgets.md`, `ux-principles.md`,
  `prd-01`, `prd-02`, `prd-04`, `vision-and-principles.md`, `innovation-brief.md`.
- **The 17 looks** are the same set (Paper, Minimalism, Pop, Maximalism, Glassmorphism,
  Neumorphism, Claymorphism, Brutalism, Neo-Brutalism, Skeuomorphism, Flat, Material, Bento, Y2K,
  Retro, Cyberpunk, Editorial) in `design-system.md`, `tokens.json`, `vision-and-principles.md`,
  and every doc that cites the count.
- **`--dart-define` flag names** are consistent (`SANE_AUTH_BYPASS`, `SANE_FLAVOR`, `SANE_ENV`,
  `SANE_LOG_LEVEL`, `SANE_TELEMETRY_DEFAULT`, `SANE_AI_CLOUD_ENABLED`, entitlements/relay/client-id
  keys) across `overview.md` §7, ADR-0011, ADR-0016, `prd-01`, `prd-03`, security docs.
- **The 12 `sane_*` packages** and the federated plugin set match between locked decision 2,
  ADR-0002, ADR-0012, and `overview.md` §4.
- **Requirement-ID namespaces don't collide**: `PRD-ED-*` (prd-01), `PRD-LB-*` (prd-02),
  `PRD-<AREA>-*` (prd-03), `PRD-CO-*` (prd-04), `TM-*` (threat model), MASVS/ASVS/Mobile-Top-10
  codes (controls-matrix). The `M1…M10` codes in `controls-matrix.md` §5 are **OWASP Mobile Top 10
  2024** identifiers (correctly labelled), not milestones.
- **Broken relative links: 0** after the fixes.

---

## Open items for the maintainer (not fixed here — they are decisions, not doc bugs)

1. **Full milestone remap of the product docs.** `innovation-brief`, `prd-01`, and `prd-02` still
   carry per-feature/per-requirement milestone tags in their own earlier numbering. Each is now
   explicitly flagged as indicative and deferred to `issues/milestones.json`, but a true remap (re-
   tagging every `F01…F25` and every `PRD-ED-*`/`PRD-LB-*` to the authoritative milestone IDs) is a
   product-roadmap decision and was intentionally not done automatically. Recommend a pass that
   rewrites the tags to milestones.json IDs (e.g. sync/E2EE → M4, audio → M3, recognition → M3,
   PDF/library → M2, phones → M5, collaboration/Sage → M6).
2. **Auth/passkey plugin in the canonical set.** `crypto.md` §8 references `plugins/sane_auth` for
   WebAuthn/passkey-PRF, and `ipad.md`/`android.md` reference an "(auth)" plugin for social sign-in
   / Credential Manager, but ADR-0012's and `overview.md` §4's canonical plugin list has no auth
   plugin. Locked decision 1 does name "auth SDKs" as a native-plugin-layer responsibility. Decide
   whether to add `sane_auth` (passkeys/WebAuthn + Sign-in-with-Google/Apple/Microsoft) to the
   ADR-0012 table and the overview tree, or fold it into `sane_secure_store`. (The crypto-doc
   reference now says "to be added to the ADR-0012 plugin set" to flag this.)
3. **`compatibility-matrix.md` §6 lists "CloudKit JS" as a web sync backend.** ADR-0006 and locked
   decision 1 defer CloudKit and do not use it as the sync engine (cross-platform uniformity). The
   cell reads as aspirational; confirm whether a CloudKit-JS Apple-only fast-path is even a future
   option or should be dropped from the matrix.
4. **PRD-level sync layout vs. the normative byte spec.** `prd-03` (PRD-SYNC-004) illustrates the
   on-drive layout as `notes/<opaqueId>/ops/<deviceId>.<seq>.enc`, `snap/<n>.enc`,
   `attachments/<hash>.enc`, while the normative `file-format.md`/`sync.md` use
   `pages/<pageId>/ops/<deviceId>.<seq>.oplog`, `snapshot.<gen>.snap`, and `blobs/<blobId>.blob`.
   The PRD path is illustrative, but the extensions/dir-names diverge; align the PRD to the
   architecture spec (or add a "normative layout: see file-format.md" pointer) at implementation.
5. The many `verify`/`(verify)` flags in the docs (exact platform API shapes, package maintenance,
   PRF support matrices, Drive quotas, MASTG ids) are intentional research caveats, left in place.
