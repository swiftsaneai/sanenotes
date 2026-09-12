# CLAUDE.md — Sane Notes agent operating manual

> Audience: an autonomous coding agent (Claude Code, Codex, etc.) or engineer with **zero prior
> context** picking up work on this repo. Read this file top to bottom once, then keep it open.
> It is the index and the rulebook; the deep detail lives in `docs/`. When this file and a `docs/`
> file disagree, the `docs/` file wins for detail and this file wins for "what must never break".
> Non-Claude agents: see [`AGENTS.md`](AGENTS.md) (condensed) and then this file.

---

## 1. What Sane Notes is (read this first)

Sane Notes is a **pen-first, privacy-first, local-first** note-taking app for **iPad, Android
tablets, Web (PWA), iPhone and Android phones** — one Flutter/Dart 3 codebase, five surfaces.
Goal: the best note-taking UX in the world — **UX first, then security first**. Notes live on the
device; **no Sane Notes server ever stores note content**; optional sync goes to the *user's own*
iCloud Drive / Google Drive, end-to-end encrypted with keys we never hold. Persona: students first
("Riya", B.Tech Physics), then professionals. Mascot: "Sane Sage". Status: **pre-alpha, planning
complete** — `docs/` and the issue tracker exist; `app/` and `packages/` are not built yet.

---

## 2. Locked decisions (condensed — never silently contradict these)

These are **locked**. If research contradicts one, keep the decision and record the risk in the
relevant doc/ADR. Full text: project brief + `docs/architecture/overview.md` Appendix A.

1. **Stack:** Flutter (latest stable, Dart 3), one codebase; thin native plugin layer in Swift
   (iOS/iPadOS) + Kotlin (Android) for low-latency ink, stylus extras, secure storage, on-device
   ML, cloud-drive access, PDF. Web via CanvasKit/skwasm. Impeller on mobile. Rust core via
   `flutter_rust_bridge` allowed *later* for CRDT/ink hot paths. Risk gate: the **M0 `SN-INK`
   latency spike** — if budgets can't be met, the editor surface pivots to native views, Dart core
   kept (exit criterion in [ADR-0001](docs/adr/0001-flutter-single-codebase.md)).
2. **Monorepo:** `app/`, `packages/` (12 `sane_*` libs), `plugins/`, `services/`, `website/`,
   `tools/`, `docs/`, `design/`, `issues/` ([ADR-0002](docs/adr/0002-monorepo-layout.md)).
3. **Local-first & zero-knowledge:** device is system of record (SQLite via drift +
   content-addressed blob store). Optional sync to the user's own cloud; everything in the cloud is
   E2E-encrypted (XChaCha20-Poly1305 or AES-256-GCM, envelope encryption; per-notebook keys wrapped
   by a user master key in Keychain/Keystore; recovery code, no vendor recovery).
4. **Document model:** Workspace → Profiles → Notebooks → Pages → Layers → Objects (Stroke, Text,
   Image, Shape, Audio anchor, Link, Sticker, Table). CRDT: add-wins object-id set + LWW registers
   + per-object HLC; rich text = Peritext/Yjs-style. Open `.sanenote` bundle format.
5. **Identity optional:** Google / Microsoft / Apple sign-in + phone OTP, used only for profile,
   sharing/collab, entitlements — **never required to take notes** (guest mode is first-class). Dev
   **auth bypass** behind compile-time flag `--dart-define=SANE_AUTH_BYPASS=true`, **impossible in
   release** (p0 — §7 below).
6. **AI ("Sane Sage") on-device by default.** Any cloud inference is explicit **per-request opt-in**
   with a visible "data leaves device" indicator.
7. **Performance budgets** (hard CI gates): pen-down→pixel ≤ 16 ms ProMotion iPad, ≤ 25 ms mid
   Android, ≤ 30 ms web (Chrome desktop); ≥ 60 fps everywhere, 120 fps where the display allows; no
   frame > 16.7 ms while writing; cold start < 1.5 s iPad / < 2 s mid-Android / < 3 s cached web;
   open a 1,000-page notebook < 1 s; scroll a 600-page PDF at 60 fps; < 300 MB on a 4 GB Android;
   2-hour writing ≤ 12 % battery on iPad Pro. See `docs/platform/performance-budgets.md`.
8. **Security & privacy:** OWASP MASVS 2.x L2, ASVS 5.0 L2, OWASP Top 10, NIST SSDF, SLSA L3 target,
   SBOM per release, STRIDE+LINDDUN threat model, DevSecOps CI; GDPR + India DPDP + COPPA-aware age
   gate; store labels reflect "no data collected" except opt-in crash reports; telemetry opt-in.
9. **Design:** source of truth is `design/Sane Notes.dc.html` + `design/Sane Notes Design Sheet.dc.html`
   → `docs/design/tokens.json` (17 looks, light/dark) → `docs/design/design-system.md`. Free vs Pro
   (₹83/month reference); student verification.
10. **Localisation:** English first, then Hindi + major Indian languages, ES/DE/FR/PT/JA/ZH/KO,
    Arabic (RTL). Accessibility: WCAG 2.2 AA, VoiceOver/TalkBack for all chrome + OCR alt-text for
    handwriting.

---

## 3. Repo map

```
sanenotes/
├── app/            Flutter app — ONE codebase, adaptive layouts, composition root  [not built yet]
├── packages/       Reusable libs (pure Dart unless noted); no UI-shell logic       [not built yet]
│   ├── sane_core     document model + CRDT + Result/Failure + repository interfaces [pure Dart]
│   ├── sane_ink      stroke capture/smooth/streamline/predict/geometry/serialise    [pure Dart]
│   ├── sane_render   tessellation & painting into dart:ui Canvas; tile/Picture cache [Flutter]
│   ├── sane_brushes  brush engine (nibs, dynamics, textures) + presets              [Flutter]
│   ├── sane_sync     append-only op-log sync over user cloud drives; CRDT merge      [pure Dart]
│   ├── sane_crypto   E2EE envelope, key wrapping, content-address hashing, recovery  [pure Dart]
│   ├── sane_pdf      PDF import/render/annotate/export (pdfrx/PDFium)                [Flutter]
│   ├── sane_audio    record/playback, audio↔ink/text anchors, waveform              [Flutter]
│   ├── sane_search   FTS5 + handwriting/ink index + query model                     [pure Dart]
│   ├── sane_ml       recognition/AI adapters (on-device first)                       [pure Dart interfaces]
│   ├── sane_ui       design system: tokens, 17 looks, components (leaf)              [Flutter]
│   └── sane_billing  plans, entitlements, IAP/web-checkout, student verification     [pure Dart]
├── plugins/        Federated plugins: Dart platform-interface + Swift/Kotlin/web impls
│                   sane_ink_surface, sane_stylus, sane_scribble, sane_secure_store,
│                   sane_cloud_drive, sane_ml_native, sane_pdfkit
├── services/       OPTIONAL, minimal, stateless, NEVER stores note content: entitlements/, relay/
├── website/        Marketing + docs + "try on web"
├── tools/          perf_harness/, device_lab/, scripts/
├── docs/           architecture/, adr/, product/, design/, security/, platform/, research/
├── design/         .dc.html canvas + design sheet + assets (Sage art)
├── issues/         Machine-readable backlog: labels.json, milestones.json, SCHEMA.md, SN-*.json
├── scripts/        publish-issues.mjs, validate-issues.mjs, render-issues.mjs, publish.sh
└── .github/        workflows/ (devsecops.yml, scorecard.yml), CODEOWNERS, PR + issue templates
```

**Package dependency DAG (strict — a cycle or a wrong edge is a build failure):** `sane_crypto` is
the lowest layer (imports nothing internal); `sane_core → sane_crypto` only; `sane_ink → sane_core`;
`sane_brushes → sane_ink`; `sane_render → sane_brushes, sane_ink, sane_core`; feature packages
(`sane_pdf`, `sane_audio`, `sane_search`, `sane_ml`, `sane_billing`, `sane_sync`) depend on
`sane_core` (and `sane_sync` also on `sane_crypto`) and **never on each other**; `sane_ui` is a pure
leaf (Flutter + tokens, no model/feature imports); `plugins/*` are leaves (never import
`packages/`/`app/`); `app/` may import anything, nothing imports `app/`. Cross-feature coordination
lives in `app/` via Riverpod providers, never as a package-to-package import. `[pure Dart]` packages
**MUST NOT** import `package:flutter`. Full detail + enforcement: `docs/architecture/overview.md` §5.

---

## 4. Before you start ANY issue (checklist)

1. **Read the issue in full.** Every issue has: Context, Scope (In/Out), Acceptance criteria,
   Technical notes, Security & privacy, UX notes, Test plan, Dependencies, Definition of done
   (`issues/SCHEMA.md`). If any section is empty or the issue lacks the `agent-ready` label, it is
   not ready — ask the maintainer or file the gap; do not guess.
2. **Follow the citations.** Open the PRD requirement IDs it cites (`PRD-ED-*`, `PRD-LB-*`,
   `PRD-<AREA>-*`, `PRD-CO-*` → `docs/product/prd-0{1..4}-*.md`, index at `docs/product/prd-00-index.md`)
   and the ADRs it cites (`docs/adr/NNNN-*.md`). Read the design surface it names in
   `docs/design/screens-and-flows.md` + `design-system.md`.
3. **Read the architecture map** for the layer you touch: `docs/architecture/overview.md` (data flow,
   isolate model, flavours) plus the specific doc (`document-model.md`, `ink-engine.md`, `crypto.md`,
   `sync.md`, `file-format.md`, `rendering-and-performance.md`).
4. **Read the security checklist** sections your diff touches:
   `docs/security/secure-coding-checklist.md`. Note the `TM-*` threats and `MASVS/ASVS` controls in
   the issue's Security section.
5. **Check dependencies.** Anything in `depends_on` must have landed. Respect the package DAG (§3).
6. **Run the validators / analyzers** before and after (§5, §11): `dart format`, `dart analyze
   --fatal-infos`, arch-lint, and — if you edited `issues/*.json` — `node scripts/validate-issues.mjs`.

---

## 5. Taking an issue — the workflow

**Branch** off `main`. Naming: `<type>/SN-<AREA>-<NNN>-<short-title>`, where `<type>` maps from the
issue's `type` (`feature→feat`, `bug→fix`, `task/chore→chore`, `docs→docs`, `security→sec`,
`infra→infra`, `test→test`, `spike→spike`, `design→design`). Example issue `SN-INK-012` "Pressure
curve editor" → `feat/SN-INK-012-pressure-curve-editor`. Never commit to `main` directly.

**Implement in DAG order** (the through-line from `docs/architecture/overview.md` §10):
`model (sane_core) → logic (pure Dart, Result types) → native (plugin platform-interface + impls, if
any) → render → state (app/ Riverpod) → UI (sane_ui + app/) → persistence/sync → search/AI → tests →
perf → security → docs → PR`. If you find yourself wanting a sideways package import, the
coordination belongs in `app/`.

**Commit style:** Conventional Commits, imperative, scoped, referencing the key:
`feat(sane_ink): add pressure curve editor (SN-INK-012)`. Small, reviewable commits — ideally one per
logical step / one per issue where practical. End every commit message with the attribution lines the
session requires (Co-Authored-By + Claude-Session).

**PR:** fill `.github/PULL_REQUEST_TEMPLATE.md` completely — "Closes #<issue>", the **Security &
privacy checklist**, the **UX checklist** (17 looks + dark mode, latency budget, a11y,
empty/loading/error/offline), and **Tests**. Attach a `flutter run --profile` timeline or perf-test
output for any editor/draw-loop change. Get CODEOWNERS review for security-critical paths
(`/docs/security/`, `/.github/`, `/packages/sane_crypto/`, `/packages/sane_sync/`, `/app/lib/auth/`).

**Definition of Done** (issue DoD + `docs/security/ssdlc-process.md` §5): code + tests merged, CI
green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog,
OSV-Scanner, dependency-review; MobSF/ZAP/fuzz/perf for release candidates); docs/ADR/controls-matrix
updated if behaviour/architecture/control mapping changed; Security & privacy section filled with
`TM-*`/`MASVS-*`/`ASVS-*` IDs (or justified "None beyond baseline" for pure UI polish); threat model
updated if a trust boundary/data flow/stored asset/dependency changed; abuse/negative tests +
regression test for any fixed vuln; CODEOWNERS review where required.

---

## 6. Coding standards (enforced by CI — full rationale in ADR-0003 & overview §9)

- **Lints:** `very_good_analysis` v11 base. CI runs `dart format --set-exit-if-changed .` and
  `dart analyze --fatal-infos`. **Warnings are errors.**
- **Naming:** files `snake_case.dart`; types/enums `UpperCamelCase`; members/vars/params/consts
  `lowerCamelCase` (Dart convention — not SCREAMING_CASE); every package + public prefix is `sane_…`;
  tests mirror source path with `_test.dart`.
- **Immutability by default:** prefer `final`/`const`; model + state classes are immutable value
  objects (hand-written or `freezed`); a change produces a new instance. **No mutable global
  singletons** — dependencies flow through Riverpod providers. State mgmt = Riverpod; routing =
  go_router (ADR-0003).
- **Errors:** expected/recoverable failures return **`Result<T, Failure>`** (sealed types in
  `sane_core`; pattern-match with Dart 3 `switch`). Do **not** throw across package boundaries for
  these; do **not** return `null` to mean error. `assert`/`throw StateError` only for broken
  invariants. No `dynamic` in public APIs; explicit return types on public members.
- **Widgets:** prefer `StatelessWidget` + providers; `const` constructors where possible; small
  widgets pushed to leaves; **no business logic in a `build` method**.
- **Docs & tests:** public API carries `///` dartdoc; pure-Dart packages carry unit tests; painted
  things (ink/UI) carry **golden** tests.
- **Logging:** one `SaneLog` facade in `sane_core` (levels trace/debug/info/warn/error). **`print()`
  is banned** (lint + arch-check). Structured fields + a redaction allow-list. Hot-path draw code
  logs nothing in profile/release.

---

## 7. Security rules that can NEVER be broken (gate failures, not review nits)

1. **No note content leaves the device** without an explicit user action, and only ever as
   **ciphertext** to the user's own cloud. Encrypt in `sane_crypto` *before* any write. The cloud is
   dumb transport. Verify the AEAD tag before using any decrypted byte and **fail closed**.
2. **No secrets in code / tests / fixtures / committed config.** Config comes from `--dart-define` /
   CI secrets / platform keychains. Dart AOT is reversible — never hardcode a key/client-secret.
   Enforced by gitleaks + trufflehog + push protection.
3. **No PII / content in logs.** Never log note content, ink coordinates, decrypted data, keys,
   tokens, recovery codes, cloud file paths, email, or phone numbers. Object ids log as opaque short
   hashes.
4. **No new network call without an ADR + threat-model row.** Every egress is listed in the PR with
   purpose + data sent. Telemetry off by default (opt-in); cloud AI off (per-request opt-in); no
   analytics SDK linked; sync off until the user picks a cloud.
5. **Auth bypass is impossible in release.** `SANE_AUTH_BYPASS` lives behind
   `if (!kReleaseMode && _authBypass)` (tree-shaken out of release) **plus** `assertAuthBypassSafe()`
   throwing at startup **plus** the CI reachability test `app/test/security/auth_bypass_test.dart`.
   **Never weaken any of the three layers.**
6. **No layering / trust-boundary violations** (§3 DAG; `docs/security/threat-model.md` boundaries).
7. **Approved crypto only:** XChaCha20-Poly1305 / AES-256-GCM (AEAD), Argon2id (passphrase KDF),
   HKDF (subkeys), SHA-256/BLAKE3 (hash), Ed25519 (signatures). Never invent crypto, reuse a nonce,
   use ECB, or use a non-CSPRNG for keys/nonces/salts. Keys in `sane_secure_store` (Keychain/SE,
   Keystore/StrongBox), never on disk/logs/backups.
8. **Untrusted input is hostile:** validate type/MIME/size/schema before use; cap resources before
   decode (zip/decompression bombs); parse PDF/image/audio/`.sanenote` **off the UI isolate**;
   canonicalise/confine every path from file content; import into a new isolated notebook. Verified
   deep links (App Links / Universal Links) only; a link lands in view/confirm, never auto-mutates.

Full detail + the reviewer fast-pass: `docs/security/secure-coding-checklist.md`. Process/gates:
`docs/security/ssdlc-process.md`. Pipeline: `docs/security/devsecops-pipeline.md`.

---

## 8. Performance rules for editor / draw-loop work

- The **UI (root) isolate does input + paint only.** Persistence, encryption, network, PDF raster,
  ML, indexing, tessellation-under-load run on other isolates (storage / sync / search / one-shot
  `Isolate.run`). **Never hop isolates on the hot draw path** (`PointerMoveEvent`).
- Wrap the canvas in a raw **`Listener`**, not a `GestureDetector`; disambiguate pen vs finger/palm
  by `event.kind == PointerDeviceKind.stylus`. Paint the active stroke in a `CustomPainter` inside a
  `RepaintBoundary`; flatten finished strokes into a cached `Picture`/tiled raster so only the active
  stroke repaints each frame. Do **not** enable `GestureBinding.resamplingEnabled` on the draw path.
- Two inking **tiers** chosen by capability query (not platform check): Tier A native front-buffer
  (`sane_ink_surface`: Metal on Apple, Jetpack Ink + `androidx.graphics.lowlatency` on Android),
  Tier B pure-Flutter `CustomPainter`. See overview §2 and [ADR-0008](docs/adr/0008-ink-pipeline-and-low-latency-surfaces.md).
- Any draw-loop change **must** pass `tools/perf_harness` against the reference devices at the
  decision-7 budgets. A feature that regresses latency does not merge. Attach the profile timeline to
  the PR.

---

## 9. Design rules

- **Tokens only.** Use `docs/design/tokens.json` via `sane_ui`; never hardcode colours, spacing,
  radii, or type sizes. Reference the mascot through a single `sane_ui` asset (`SaneSageMark`) so the
  placeholder swaps in one place.
- **Every look, both modes.** Anything painted MUST render correctly in **all 17 looks** and in
  **light + dark**. Golden-test the surface.
- **Adaptive layout.** Design for phone (~400 px) through tablet/desktop; the sidebar collapses in
  the `narrow` class (< 900 px). Follow `docs/design/screens-and-flows.md`.
- **Accessibility is mandatory** (locked decision 10): `Semantics` labels for all chrome, 44 pt / 48 dp
  targets, contrast ≥ 4.5:1, keyboard-reachable on web, respect Dynamic Type / "readable font",
  OCR-backed alt-text for handwritten content. See `docs/design/accessibility.md`.
- The mascot art in `design/assets/*.png` is a **watermarked placeholder — not releasable**. Any
  build embedding it is tagged not-releasable until original Sage art exists.
- Design source of truth + live canvas:
  `https://claude.ai/design/p/ada47603-802d-4bc5-82f1-149092d8c483?file=Sane+Notes.dc.html&via=share`.
  When you hit an unresolved design question, implement the decisive default proposed in the relevant
  doc and leave a `// DESIGN-OPEN-Qn:` comment linking it.

---

## 10. Testing rules

- **Unit** (pure-Dart logic, headless), **widget** (interactions), **golden** (anything painted —
  ink, brushes, themes across looks), **integration** (`integration_test`/`patrol` end-to-end flows).
  Name the test files in the issue's Test plan and add them.
- Include **negative / abuse tests** (e.g. "a forged deep link cannot mutate state", "a malformed
  `.sanenote` fails closed") and a **regression test** for every fixed bug/vuln.
- Security tests are first-class: `app/test/security/auth_bypass_test.dart` (bypass unreachable in
  release), crypto fail-closed, no-PII-in-logs assertions.
- Parser changes require the fuzz corpus (`sane_pdf`, `sane_audio`, image decode, `.sanenote` unpack)
  in the verification stage. CI must be green before merge.

---

## 11. How to add an ADR or a PRD requirement, and how to touch the tracker

- **New architectural decision → ADR.** Copy the style of an existing `docs/adr/NNNN-*.md` (there are
  16: 0001–0016). Next number, sections: Context / Decision / Alternatives considered / Consequences /
  How to verify / Status. Link it from `docs/architecture/overview.md` Appendix B and from the issue.
  Changing a package boundary, data flow, threading rule, or build flavour means updating
  `overview.md` **in the same PR**.
- **New/changed product requirement → PRD.** Add it to the owning PRD (`prd-01` editor/ink/brushes;
  `prd-02` library/documents/media/audio/search/recognition; `prd-03` identity/sync/privacy/settings/
  billing; `prd-04` sharing/collab/AI/study/a11y/i18n), continue that PRD's ID sequence, keep its
  normative RFC-2119 level + milestone/priority axis, and cite the research/design source. Update the
  count in `docs/product/prd-00-index.md`.
- **Backlog is machine-readable.** Issues are JSON arrays in `issues/*.json` validated against
  `issues/SCHEMA.md` by `scripts/validate-issues.mjs` and published to GitHub by
  `scripts/publish-issues.mjs` (idempotent, resumable, paces to GitHub rate limits; `./scripts/publish.sh`
  wraps validate+push+publish). `scripts/render-issues.mjs` renders them to `docs/backlog/`. Requires
  Node 22 + authenticated `gh`. **Always run `node scripts/validate-issues.mjs` after editing any
  `issues/*.json`.** Note: as of now only `labels.json` + `milestones.json` exist — the `SN-*.json`
  issue files are authored per the schema as work is scoped.

---

## 12. How the issue tracker is structured

- **Key:** `SN-<AREA>-<NNN>` (stable, unique across all files). **Body** must contain the 9 required
  sections in order (§4). Cross-refs inside a body use `{{SN-XXX-000}}` tokens, rewritten to `#123`
  on publish.
- **Labels** (`issues/labels.json`): `priority` p0–p4; `type` epic/feature/task/bug/security/design/
  spike/docs/infra/test/chore; `platform` iPad/Android tablet/Web/iOS phone/Android phone/core/all;
  ~42 `area` slugs; `sdlc` requirements/design/implementation/verification/release/maintenance;
  `size` XS–XL; `sec:` framework tags; `meta` (`agent-ready`, `needs-design`, `needs-decision`,
  `needs-credentials`, `blocked`, `good first issue`, `innovation`).
- **`agent-ready`** = fully specified; an autonomous agent can start with **no questions**. Prefer
  these. `needs-decision`/`needs-design`/`needs-credentials`/`blocked` are **not** ready to pick up.
- **Milestones** (`issues/milestones.json`, authoritative): **M0 Foundations · M1 Ink Editor Alpha ·
  M2 Library & Documents · M3 Audio & Recognition · M4 Identity, Sync & Privacy · M5 Phones &
  Platform Parity · M6 Collaboration, Sharing & Sage AI · M7 Beta Hardening & Security Audit ·
  M8 Launch & Growth · Backlog.** ⚠️ The per-requirement `M#` tags *inside* PRD-01/PRD-02/innovation-brief
  use an older editor-centric numbering that does **not** map 1:1 to these — `issues/milestones.json`
  always wins (e.g. audio→M3, recognition→M3, PDF/library→M2, sync/E2EE→M4, phones→M5, collab/Sage→M6).
  See `docs/roadmap.md` and `docs/QUALITY-REPORT.md`.
- **Sub-issues:** `parent` (epic/feature key) creates a GitHub sub-issue link; `depends_on` lists keys
  that must land first (rewritten to `#numbers`).

---

## 13. Maintainer decisions still pending (do not resolve these yourself)

Collected from every doc's open-questions section. If an issue depends on one of these, it should
carry `needs-decision` (or `needs-credentials` / `needs-design`). Implement the *proposed default*
where a doc states one, behind a build-time flag if the doc says so, and leave the decision to the
maintainer.

**Product / naming / plan**
- License is **undecided** — README carries a placeholder; maintainer to choose (impacts contribution
  terms, SBOM, store).
- Full **milestone remap** of `innovation-brief` + PRD-01/PRD-02 per-requirement tags to the
  authoritative `issues/milestones.json` IDs (QUALITY-REPORT remaining item).
- Confirm product name **"Sane Notes"** and that the backup-target list drops "SS Cloud" entirely
  (PRD-03 assumes yes; no first-party cloud per decision 3).
- **Storage caps on the user's own cloud** (PRD-SYNC-012): enforce a 5 GB/50 GB soft cap at all, or
  drop the metaphor (zero-server makes a Sane-imposed limit awkward)?
- **"Ask my notes" free preview** model + exact free quotas for AI asks / cloud transcription /
  summaries (pending the pricing doc) — fixed monthly quota vs always-truncated teaser?
- **Version-history retention tiers** (proposed Free ≥30 d / Pro ≥365 d); **template-store
  monetisation** (Pro-unlock vs individual purchase vs both); **Archive vs Trash** (both or fold
  archive into a tag).

**Engine / dependency gates**
- **Commercial PDF SDK escape hatch** (Nutrient/Apryse) if the DIY annotation layer can't reach
  parity in budget — decision gate at end of M2.
- **MyScript vs ML-Kit-only** for handwriting recognition — decide before M4 hardening.
- **Relay hosting** (self-host vs managed) and **hosted-vs-BYO TURN** for NAT traversal (ADR-0013,
  PRD-CO §12).
- **Cloud AI model policy** for the opt-in escalation (which provider; Apple Private Cloud Compute /
  first-party endpoints); must satisfy no-training / ephemeral guarantees.

**Security / privacy posture**
- **Default share posture:** design's link-on/"Can edit" vs the safer link-off/"Can view"
  (PRD-CO-036) — must be a build-time flag whichever ships.
- **Web PWA at-rest protection** reduced-guarantee posture (no Keychain/Keystore; passphrase/passkey
  key in memory, IndexedDB ciphertext, no hardware binding) — accept + label in the privacy dashboard?
- **Guest→account key migration** friction; **per-profile vs per-account entitlement** edge cases
  (household plan); **competitor tier-A import legality** (legal review per `.goodnotes`/`.note`/`.one`).

**Design (must be decided before the affected surface ships)**
- **Original Sage mascot art** must be commissioned to replace the watermarked placeholders
  (design blocker; builds embedding `design/assets/*.png` are not releasable).
- **Class-reminder schedule source** (manual timetable editor / calendar import / both, and which
  milestone). Full 20-item design list: `docs/design/screens-and-flows.md` §Open, summarised in
  `docs/design/README.md` §7 (most already resolved by the PRDs).

**Credentials the maintainer must supply later (mark issues `needs-credentials`)**
- OAuth client IDs/secrets for Sign in with Google / Microsoft / Apple; store/dev accounts; signing
  keys — injected via CI secrets, never committed.

---

## 14. Where to read next

| You want to… | Read |
|---|---|
| The full architecture map, data flow, isolates, flavours | `docs/architecture/overview.md` |
| Why Flutter + the native-pivot exit criterion | `docs/adr/0001-flutter-single-codebase.md` |
| The document model / CRDT / `.sanenote` format | `docs/architecture/document-model.md`, `file-format.md` |
| Crypto, keys, sync internals | `docs/architecture/crypto.md`, `sync.md` |
| The security process, gates, and DoD | `docs/security/ssdlc-process.md`, `secure-coding-checklist.md` |
| Product requirements by surface | `docs/product/prd-00-index.md` → `prd-01…prd-04` |
| Milestone scope + sequencing | `docs/roadmap.md` |
| Design a screen / theme it | `docs/design/screens-and-flows.md`, `design-system.md`, `tokens.json` |
| File or publish backlog work | `issues/SCHEMA.md`, `scripts/publish-issues.mjs` |
| Doc index in reading order | `docs/README.md` |
