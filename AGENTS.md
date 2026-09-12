# AGENTS.md — Sane Notes (for autonomous coding agents)

**Read [`CLAUDE.md`](CLAUDE.md) in full first.** It is the complete operating manual; this file is
the condensed pointer for non-Claude agents (Codex, etc.). Where the two differ, CLAUDE.md wins.

## What this is
Sane Notes: a **pen-first, privacy-first, local-first** Flutter/Dart 3 note-taking app for iPad,
Android tablets, Web (PWA), iPhone and Android phones — **one codebase, five surfaces**. UX first,
then security first. Notes live on the device; **no Sane Notes server ever stores note content**;
optional sync goes to the user's own iCloud Drive / Google Drive, end-to-end encrypted. Status:
**pre-alpha, planning complete** — `docs/` + issue tracker exist; `app/`/`packages/` not built yet.

## Locked decisions (never silently contradict — full text: CLAUDE.md §2, overview.md App. A)
Flutter+Dart 3 single codebase + native Swift/Kotlin plugins · monorepo (`app/`, `packages/`,
`plugins/`, `services/`, `website/`, `tools/`, `docs/`, `design/`, `issues/`) · local-first &
zero-knowledge (E2EE to the user's own cloud, keys we never hold) · document model
Workspace→Profiles→Notebooks→Pages→Layers→Objects, CRDT (add-wins + LWW + HLC), open `.sanenote`
format · identity optional, guest mode first-class · AI on-device by default, cloud AI per-request
opt-in · hard perf budgets · MASVS/ASVS L2, SSDF, SLSA L3, STRIDE+LINDDUN · 17 looks + light/dark ·
i18n (EN→Hindi/Indian langs/…/Arabic RTL) + WCAG 2.2 AA.

## Repo map
`app/` Flutter app (composition root) · `packages/` 12 `sane_*` libs (core, ink, render, brushes,
sync, crypto, pdf, audio, search, ml, ui, billing) · `plugins/` federated native bridges ·
`services/` optional stateless (never note content) · `docs/` (architecture, adr, product/PRDs,
design, security, platform, research) · `issues/` machine-readable backlog · `scripts/` Node 22 tools.
**Dependency DAG (strict):** crypto ⟵ core ⟵ ink ⟵ brushes ⟵ render; feature packages depend only on
core (+sync on crypto), never each other; `sane_ui` + `plugins/*` are leaves; only `app/` imports
widely. `[pure Dart]` packages must not import `package:flutter`. Detail: `docs/architecture/overview.md` §5.

## Before you start any issue
1. Read the issue fully (9 sections: Context/Scope/Acceptance/Technical/Security & privacy/UX/Test
   plan/Dependencies/DoD — `issues/SCHEMA.md`). No `agent-ready` label or an empty section ⇒ not ready.
2. Open the PRD IDs (`docs/product/prd-0{1..4}`, index `prd-00-index.md`) and ADRs it cites (`docs/adr/`).
3. Read `docs/architecture/overview.md` + the doc for your layer; read the design surface in
   `docs/design/screens-and-flows.md`.
4. Read the matching sections of `docs/security/secure-coding-checklist.md`.
5. Confirm `depends_on` landed; respect the DAG.

## Workflow
- Branch off `main`: `<type>/SN-<AREA>-<NNN>-<short-title>` (e.g. `feat/SN-INK-012-pressure-curve-editor`).
  Never commit to `main`.
- Build in order: model → logic (pure Dart, `Result<T,Failure>`) → native → render → state (Riverpod)
  → UI → persist/sync → search/AI → tests → perf → security → docs → PR (overview §10).
- Conventional Commits referencing the key: `feat(sane_ink): … (SN-INK-012)`. End each commit with the
  required Co-Authored-By + Claude-Session attribution lines.
- PR: fill `.github/PULL_REQUEST_TEMPLATE.md` (Security & privacy + UX + Tests checklists). CODEOWNERS
  review for `/packages/sane_crypto/`, `/packages/sane_sync/`, `/app/lib/auth/`, `/docs/security/`, `/.github/`.
- DoD: CI green (format, `dart analyze --fatal-infos`, arch-lint, unit/widget/golden, Semgrep,
  mobsfscan, gitleaks, OSV-Scanner, dependency-review; +MobSF/ZAP/fuzz/perf for release candidates);
  docs/ADR updated; threat model updated if a boundary changed; abuse + regression tests.

## Coding standards (CI-enforced)
`very_good_analysis` v11; `dart format` + `dart analyze --fatal-infos`, warnings are errors. Immutable
value objects; Riverpod (no global singletons); go_router. `Result<T,Failure>` for expected errors
(no `null`-for-error, no throwing across boundaries); no `dynamic` in public APIs. `StatelessWidget` +
`const`; no logic in `build`. `///` docs + golden tests for painted code. **`print()` banned** — log
via the `SaneLog` facade with a redaction allow-list.

## Security rules that can never break (gate failures)
1. No note content leaves the device except as ciphertext to the user's own cloud (encrypt in
   `sane_crypto` first; verify AEAD tag, fail closed). 2. No secrets in code — config via
   `--dart-define`/CI secrets/keychain. 3. No PII/content in logs. 4. No new network call without an
   ADR + threat-model row (telemetry/AI/analytics off by default). 5. Auth bypass impossible in
   release — three layers (`!kReleaseMode && _authBypass` tree-shake + `assertAuthBypassSafe()` +
   `auth_bypass_test.dart`); never weaken any. 6. No DAG/trust-boundary violations. 7. Approved crypto
   only (XChaCha20-Poly1305/AES-256-GCM, Argon2id, HKDF, SHA-256/BLAKE3, Ed25519; keys in
   `sane_secure_store`). 8. Untrusted input is hostile — validate + cap + parse off-UI-isolate + verified
   deep links only. Detail: `docs/security/secure-coding-checklist.md`.

## Performance (editor / draw loop)
UI isolate does input + paint only; everything heavy is off-isolate; never hop isolates on
`PointerMoveEvent`. Raw `Listener` (not `GestureDetector`); palm-reject by
`event.kind == PointerDeviceKind.stylus`; active stroke in a `CustomPainter` inside a
`RepaintBoundary`; finished strokes flattened to a cached `Picture`. Budgets: ≤16 ms iPad / ≤25 ms mid
Android / ≤30 ms web; ≥60 fps. Any draw-loop change must pass `tools/perf_harness`; attach the profile
timeline. Two tiers (native front-buffer / pure-Flutter) — ADR-0008.

## Design & a11y
Tokens only via `sane_ui` (`docs/design/tokens.json`) — no hardcoded colours/spacing/type. Every one
of the 17 looks + light & dark; golden-test it. Adaptive from ~400 px (sidebar collapses < 900 px).
A11y mandatory: Semantics labels, 44 pt/48 dp targets, contrast ≥4.5:1, keyboard on web, OCR alt-text.
Mascot art in `design/assets/*.png` is a watermarked placeholder — not releasable.

## Tracker
Keys `SN-<AREA>-<NNN>`; JSON arrays in `issues/*.json` validated by `scripts/validate-issues.mjs`
(run after any edit; Node 22), published by `scripts/publish-issues.mjs`. Labels: priority p0–p4;
type; platform; ~42 areas; sdlc phase; size; sec/meta (`agent-ready` = pick these). Milestones
(authoritative, `issues/milestones.json`): M0 Foundations · M1 Ink Editor Alpha · M2 Library &
Documents · M3 Audio & Recognition · M4 Identity, Sync & Privacy · M5 Phones & Platform Parity ·
M6 Collaboration, Sharing & Sage AI · M7 Beta Hardening & Security Audit · M8 Launch & Growth ·
Backlog. ⚠️ Per-requirement `M#` tags inside PRD-01/02 use older numbering — `milestones.json` wins.

## Pending maintainer decisions — do not resolve yourself
License (undecided); milestone remap; storage-cap model; AI free-quota/preview; PDF-SDK escape hatch;
MyScript vs ML-Kit; relay/TURN hosting; cloud-AI provider; default share posture; web at-rest posture;
import legality; original Sage art; class-reminder source; OAuth/store credentials (via CI secrets).
Full list + proposed defaults: CLAUDE.md §13. If an issue depends on one, it carries `needs-decision`
/`needs-credentials`/`needs-design` and is not agent-ready.
