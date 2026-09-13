# Backlog — area: devx

17 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-FND-001](devx.md#sn-fnd-001) **Deliver the Foundations milestone (monorepo, workspace, CI, flavours, DevX)** (epic · M0 Foundations)
  - [SN-FND-002](devx.md#sn-fnd-002) **Create the Flutter monorepo scaffold and pub workspace root** · p0 · infra · L · M0 Foundations
    - [SN-FND-006](devx.md#sn-fnd-006) **Scaffold the twelve sane_* package skeletons with DAG-correct pubspecs** · p0 · infra · M · M0 Foundations
    - [SN-FND-007](devx.md#sn-fnd-007) **Scaffold the seven federated plugins as platform-interface plus mock and stubs** · p1 · infra · M · M0 Foundations
    - [SN-FND-008](devx.md#sn-fnd-008) **Implement arch-lint enforcing the package DAG, package:flutter ban and print() ban** · p1 · security · M · M0 Foundations
    - [SN-FND-009](devx.md#sn-fnd-009) **Scaffold services, website and tools (perf_harness, device_lab) placeholders** · p2 · infra · S · M0 Foundations
  - [SN-FND-004](devx.md#sn-fnd-004) **Configure the Melos workspace and very_good_analysis lint baseline** · p0 · infra · M · M0 Foundations
    - [SN-FND-010](devx.md#sn-fnd-010) **Pin the Flutter and Dart toolchain with fvm and mise** · p1 · infra · S · M0 Foundations
    - [SN-FND-011](devx.md#sn-fnd-011) **Wire build_runner code generation (freezed, riverpod, pigeon) with runner scripts** · p1 · infra · M · M0 Foundations
  - [SN-FND-005](devx.md#sn-fnd-005) **Define build flavours and the --dart-define configuration matrix** · p1 · infra · M · M0 Foundations
    - [SN-FND-012](devx.md#sn-fnd-012) **Implement the FlavorConfig dart-define reader and assertAuthBypassSafe guard** · p0 · security · S · M0 Foundations
  - [SN-FND-003](ci-cd.md#sn-fnd-003) **Add the Flutter CI workflow (format, analyze, test, build)** · p1 · infra · L · M0 Foundations
    - [SN-FND-013](ci-cd.md#sn-fnd-013) **Add per-platform build jobs (iOS, Android, Web) to CI** · p1 · infra · M · M0 Foundations
    - [SN-FND-014](ci-cd.md#sn-fnd-014) **Add change-scoped test and build selection to CI (affected packages)** · p2 · infra · M · M0 Foundations
    - [SN-FND-015](ci-cd.md#sn-fnd-015) **Add the issues-schema validation job to CI** · p2 · infra · XS · M0 Foundations
  - [SN-FND-016](devx.md#sn-fnd-016) **Add pre-commit hooks (format, analyze, gitleaks, issues-validate)** · p1 · infra · S · M0 Foundations
  - [SN-FND-017](devx.md#sn-fnd-017) **Add the dev bootstrap/doctor script and local-setup guide** · p2 · infra · S · M0 Foundations
    - [SN-FND-018](devx.md#sn-fnd-018) **Add the dev container and Codespaces configuration** · p3 · infra · S · M0 Foundations
  - [SN-FND-019](ci-cd.md#sn-fnd-019) **Add PR automation: auto-labeler, PR-title and branch-name lint** · p2 · infra · S · M0 Foundations
  - [SN-FND-020](devx.md#sn-fnd-020) **Pin dependency versions and define sane_* workspace resolution** · p1 · infra · S · M0 Foundations
  - [SN-FND-021](docs.md#sn-fnd-021) **Formalise the ADR process: template, index and CI link check** · p2 · docs · S · M0 Foundations
  - [SN-FND-022](devx.md#sn-fnd-022) **Define versioning and changelog policy (SemVer plus Melos version)** · p2 · docs · S · M0 Foundations
  - [SN-FND-023](docs.md#sn-fnd-023) **Add a LICENSE placeholder and define the SPDX header policy** · p2 · docs · XS · M0 Foundations
  - [SN-GOPS-002](docs.md#sn-gops-002) **Maintain the maintainer decision register with due-by milestones** · p1 · docs · S · M0 Foundations
  - [SN-GOPS-004](release.md#sn-gops-004) **Apply the chosen licence: SPDX headers, dependency gate and NOTICE** · p1 · task · M · M8 Launch & Growth
  - [SN-GOPS-005](docs.md#sn-gops-005) **Establish repository governance: conduct, contribution terms and triage SLA** · p2 · docs · S · M0 Foundations
  - [SN-GOPS-011](devx.md#sn-gops-011) **Define the Flutter, Dart and native toolchain upgrade cadence and playbook** · p1 · chore · M · M7 Beta Hardening & Security Audit

---

## Issues

### SN-FND-001

<a id="sn-fnd-001"></a>

**Deliver the Foundations milestone (monorepo, workspace, CI, flavours, DevX)**

| Field | Value |
|---|---|
| GitHub | #14 |
| Type | epic |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `MASVS-CODE-2`, `MASVS-RESILIENCE-1`, `OWASP-A05`, `OWASP-A08`, `ASVS-V1`, `ASVS-V14`, `CWE-798`, `CWE-1104` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
The Foundations milestone (M0) stands up everything later work builds on and de-risks nothing itself ships without: the Flutter monorepo scaffold, the Dart `pub workspaces` root, the Melos orchestration and `very_good_analysis` lint baseline, the build flavours and `--dart-define` matrix, the Flutter CI (`format`/`analyze`/`test`/`build`), code generation, pre-commit hooks, developer-experience scripts, and the ADR/versioning/dependency processes. Per `docs/roadmap.md` (§M0) and `docs/architecture/overview.md` §4–§9, no M1+ milestone can proceed until the scaffold builds, arch-lint enforces the package DAG, and CI is green on an empty scaffold. This epic is the root of the dependency graph: it has no upstream dependency and it blocks every other area — design tokens (SN-DS-001), the document model (SN-CORE-001), the ink engine (SN-INK-001), and the DevSecOps pipeline (SN-CI-001) all build on this scaffold. It implements [ADR-0001](docs/adr/0001-flutter-single-codebase.md), [ADR-0002](docs/adr/0002-monorepo-layout.md) and [ADR-0003](docs/adr/0003-state-management-and-app-structure.md).

#### Scope
**In:** the repo scaffold, workspace tooling, lints, flavours, Flutter CI, codegen, pre-commit, DevX scripts, ADR/versioning/dependency policy — every SN-FND child below.
**Out:** security scanners/SAST/SCA/SBOM/SLSA (owned by SN-CI-001), design tokens (SN-DS-002), the document model and CRDT (SN-CORE-001), and the ink latency spike (SN-INK-009). This epic provides the ground those stand on.

#### Acceptance criteria
- [ ] `dart pub get` / `melos bootstrap` at the workspace root resolves with a **single lockfile** and all local path deps linked.
- [ ] Arch-lint fails any dependency edge outside the allowed DAG and any `package:flutter` import in a pure-Dart package (overview §5).
- [ ] Flutter CI is **green on the empty scaffold**: `dart format --set-exit-if-changed`, `dart analyze --fatal-infos`, `melos run test`, and per-platform builds.
- [ ] `dev`/`beta`/`release` flavours build; the auth-bypass guard is proven inert in release.
- [ ] Every child issue below is closed and its Definition of done met.

#### Technical notes
Workspace: Dart 3 `pub workspaces` + Melos ([ADR-0002](docs/adr/0002-monorepo-layout.md)); lints `very_good_analysis` v11 (overview §9); flavours + `--dart-define` matrix (overview §7); app structure feature-first with Riverpod v3 + go_router v18 ([ADR-0003](docs/adr/0003-state-management-and-app-structure.md)). Arch-lint lives at `tools/scripts/arch_check`. Children: [SN-FND-002](devx.md#sn-fnd-002), [SN-FND-003](ci-cd.md#sn-fnd-003), [SN-FND-004](devx.md#sn-fnd-004), [SN-FND-005](devx.md#sn-fnd-005), [SN-FND-006](devx.md#sn-fnd-006), [SN-FND-007](devx.md#sn-fnd-007), [SN-FND-008](devx.md#sn-fnd-008), [SN-FND-009](devx.md#sn-fnd-009), [SN-FND-010](devx.md#sn-fnd-010), [SN-FND-011](devx.md#sn-fnd-011), [SN-FND-012](devx.md#sn-fnd-012), [SN-FND-013](ci-cd.md#sn-fnd-013), [SN-FND-014](ci-cd.md#sn-fnd-014), [SN-FND-015](ci-cd.md#sn-fnd-015), [SN-FND-016](devx.md#sn-fnd-016), [SN-FND-017](devx.md#sn-fnd-017), [SN-FND-018](devx.md#sn-fnd-018), [SN-FND-019](ci-cd.md#sn-fnd-019), [SN-FND-020](devx.md#sn-fnd-020), [SN-FND-021](docs.md#sn-fnd-021), [SN-FND-022](devx.md#sn-fnd-022), [SN-FND-023](docs.md#sn-fnd-023).

#### Security & privacy
Foundations bakes in the three gate rules (overview §9, `docs/security/ssdlc-process.md` §5): **no secrets in the repo** (CWE-798; config via `--dart-define`/CI secrets), **no PII in logs** baseline, and **no boundary violations** (arch-lint as a structural control so `sane_crypto` cannot import UI/network — MASVS-CODE-1/2, ASVS V1). Supply-chain baseline: pinned toolchain and version-pinned deps (OWASP-A06/A08, CWE-1104). The p0 auth-bypass guard scaffolding lands under [SN-FND-012](devx.md#sn-fnd-012).

#### UX notes
No end-user surface. The audience is the autonomous coding agent and engineer: consistent CLI output, actionable error messages, one-command bootstrap, and `docs/` that lets a zero-context agent start. Any surfaced UI is out of scope here; see the Design System epic (SN-DS-001).

#### Test plan
Each child ships its own tests; the epic is done when `melos run test` is green across the scaffold, `tools/scripts/arch_check` has unit tests for allowed/forbidden edges, and a CI dry-run passes on an empty scaffold.

#### Dependencies
None — this epic is the root of the graph.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-002

<a id="sn-fnd-002"></a>

**Create the Flutter monorepo scaffold and pub workspace root**

| Field | Value |
|---|---|
| GitHub | #256 |
| Type | infra |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx |
| Size | L |
| SDLC | implementation |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `OWASP-A05`, `ASVS-V1`, `CWE-798` |
| Extra labels | agent-ready |

#### Context
Sane Notes is one Flutter/Dart 3 app organised as a monorepo of `app/`, `packages/` (12 `sane_*` libs), `plugins/`, `services/`, `website/`, `tools/`, `docs/`, `design/`, `issues/` ([ADR-0002](docs/adr/0002-monorepo-layout.md), overview §4). Right now only `docs/`, `design/` and `issues/` exist; there is no code tree. This issue creates the canonical directory skeleton, the runnable `app/` shell (composition root per [ADR-0003](docs/adr/0003-state-management-and-app-structure.md)), and the **root `pubspec.yaml` declaring the Dart `pub workspaces`** so every local package resolves against a single lockfile. It is the anchor every other Foundations task (and every other area) attaches to, so it is p0.

#### Scope
**In:** the folder tree from overview §4 with a one-line `README.md` per top-level folder; a root `pubspec.yaml` with the `workspace:` member list; a minimal `app/` Flutter project (`main.dart`, `bootstrap.dart`, `app.dart`, `router/`, `features/`, `providers/`, `config/` per ADR-0003) that boots to a placeholder home; `.gitignore`, `.editorconfig` verified; `analysis_options.yaml` stubs referencing the shared lint config from [SN-FND-004](devx.md#sn-fnd-004).
**Out:** package internals ([SN-FND-006](devx.md#sn-fnd-006)), plugin internals ([SN-FND-007](devx.md#sn-fnd-007)), arch-lint ([SN-FND-008](devx.md#sn-fnd-008)), flavours ([SN-FND-005](devx.md#sn-fnd-005)), CI ([SN-FND-003](ci-cd.md#sn-fnd-003)), Melos config and lints ([SN-FND-004](devx.md#sn-fnd-004)).

#### Acceptance criteria
- [ ] The full tree from overview §4 exists; each of `app/ packages/ plugins/ services/ website/ tools/` has a `README.md` naming its purpose.
- [ ] `flutter run` on `app/` boots to a placeholder screen on iOS, Android, and Web (Chrome) without errors.
- [ ] The root `pubspec.yaml` lists all workspace members; `dart pub get` at the root produces **one** `pubspec.lock`.
- [ ] `app/lib/` matches the ADR-0003 feature-first layout (`main.dart`, `bootstrap.dart`, `app.dart`, `router/`, `features/`, `providers/`, `config/`).
- [ ] No secret or credential string is committed anywhere in the scaffold.

#### Technical notes
Use `flutter create` for `app/` then reshape to ADR-0003. Root `pubspec.yaml` uses `workspace:` (Dart 3 pub workspaces, [ADR-0002](docs/adr/0002-monorepo-layout.md) “Workspace tooling”). Add `riverpod`/`go_router` as `app/` deps but keep `bootstrap.dart` a stub calling `assertAuthBypassSafe()` (wired later in [SN-FND-012](devx.md#sn-fnd-012)). Paths and purposes are canonical in overview §4; do not invent alternatives. Keep `app/` free of business logic — it is the composition root only.

#### Security & privacy
Threats: a committed secret or a world-readable config leaking a key (CWE-798, OWASP-A05). Controls: all runtime config via `--dart-define`/CI secrets (overview §7.1), `.gitignore` covering key material and local env, and a gitleaks-clean tree (MASVS-CODE-2, ASVS V14). The scaffold introduces no data flow, network egress, or stored asset — note in the PR that the threat model is unchanged.

#### UX notes
Developer-facing only. The placeholder home screen must render in both light and dark (theme wired later by SN-DS-002); keep it token-free and minimal so it does not pre-empt the design system. No accessibility surface beyond a default `Semantics`-labelled placeholder.

#### Test plan
`app/test/smoke_test.dart` — the app boots and pumps the placeholder. A CI-independent `dart pub get` at the root resolving to one lockfile. Manual: `flutter run` on the three platforms. Name files: `app/test/smoke_test.dart`.

#### Dependencies
None.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-004

<a id="sn-fnd-004"></a>

**Configure the Melos workspace and very_good_analysis lint baseline**

| Field | Value |
|---|---|
| GitHub | #258 |
| Type | infra |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx |
| Size | M |
| SDLC | implementation |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `MASVS-CODE-2`, `ASVS-V14`, `OWASP-A05` |
| Extra labels | agent-ready |

#### Context
The repo is a Dart `pub workspaces` base with **Melos** for multi-package orchestration (bootstrap, run scripts across packages, versioning, changelogs) — [ADR-0002](docs/adr/0002-monorepo-layout.md). Coding standards are enforced by CI on a shared **`very_good_analysis` v11** base (stricter than `flutter_lints`), with `dart format --set-exit-if-changed .` and `dart analyze --fatal-infos`, warnings-as-errors (overview §9, [ADR-0003](docs/adr/0003-state-management-and-app-structure.md)). This issue configures `melos.yaml` (or the workspace `pubspec` melos block) and the single shared `analysis_options.yaml` that every package includes, so the whole tree lints identically and `melos run test`/`melos run analyze` work.

#### Scope
**In:** `melos.yaml` with `bootstrap`, `analyze`, `format`, `test` scripts (and a change-scoped variant used by [SN-FND-014](ci-cd.md#sn-fnd-014)); a root `analysis_options.yaml` on `very_good_analysis` v11 with the project rules (explicit return types on public members, no `dynamic` in public APIs, `print` off); per-package `analysis_options.yaml` that `include:` the root; verify Melos/pub-workspace interop yields one lockfile.
**Out:** the CI workflow that runs these ([SN-FND-003](ci-cd.md#sn-fnd-003)), arch-lint ([SN-FND-008](devx.md#sn-fnd-008)), codegen ([SN-FND-011](devx.md#sn-fnd-011)), toolchain pinning ([SN-FND-010](devx.md#sn-fnd-010)).

#### Acceptance criteria
- [ ] `melos bootstrap` resolves the whole workspace to a **single** `pubspec.lock` with local path deps linked (ADR-0002 verify step 1).
- [ ] `melos run analyze` runs `dart analyze --fatal-infos` across all packages and is clean on the scaffold.
- [ ] `melos run format` / `dart format --set-exit-if-changed .` reports no diffs.
- [ ] `melos run test` runs every package's tests; pure-Dart packages run under `dart test`.
- [ ] The lint config rejects a public member with an inferred return type and a `dynamic` public API (spot-tested).

#### Technical notes
Pin `very_good_analysis: ^11.x`. Prefer `pub workspaces` for resolution and Melos for scripts; if interop is rough at build time, fall back to Melos-only (ADR-0002 alternatives note). Melos scripts should support `--diff` affected-package selection for [SN-FND-014](ci-cd.md#sn-fnd-014). Keep one canonical `analysis_options.yaml`; packages only `include:` it plus any package-local excludes (generated files).

#### Security & privacy
Lints and warnings-as-errors are a code-quality/security gate (MASVS-CODE-1/2, ASVS V14, OWASP-A05 misconfiguration): they block `dynamic` public APIs and inferred types that hide unsafe casts, and the shared config keeps the `print()`/logging discipline consistent (overview §8.2). Generated-file excludes must not silently exclude hand-written code. No secrets or PII involved.

#### UX notes
Developer-facing. `melos run` names must be discoverable (`melos run --help`) and documented in the local-setup guide ([SN-FND-017](devx.md#sn-fnd-017)). Analyzer output stays actionable. No end-user UI.

#### Test plan
CI-style local run: `melos bootstrap && melos run analyze && melos run format && melos run test` all green on the scaffold. A fixture with an inferred-return public member fails analyze. Name file: `tools/scripts/test/lint_config_test.dart` (asserts the ruleset includes the required rules).

#### Dependencies
SN-FND-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-005

<a id="sn-fnd-005"></a>

**Define build flavours and the --dart-define configuration matrix**

| Field | Value |
|---|---|
| GitHub | #259 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `MASVS-AUTH-1`, `MASVS-STORAGE-1`, `OWASP-A05`, `ASVS-V14`, `CWE-798`, `CWE-489` |
| Extra labels | agent-ready |

#### Context
Sane Notes ships three build flavours — **dev / beta / release** — selected by `--dart-define=SANE_FLAVOR=…` plus Flutter's build mode, each with different auth-bypass, obfuscation, logging, telemetry and backend settings (overview §7, [ADR-0011](docs/adr/0011-telemetry-and-diagnostics.md)). All runtime config is read from `--dart-define`; **no secret is ever hardcoded in Dart** because AOT is reversible (overview §7.1, ADR-0001). This issue defines the flavour matrix, the full `--dart-define` key set (`SANE_FLAVOR`, `SANE_AUTH_BYPASS`, `SANE_ENV`, `SANE_*_URL`, `SANE_LOG_LEVEL`, `SANE_TELEMETRY_DEFAULT`, the client-ID keys, `SANE_AI_CLOUD_ENABLED`), and the launch/build configuration (VS Code launch.json, `--dart-define-from-file` for dev), so every downstream area reads config the same way.

#### Scope
**In:** the flavour table (overview §7) captured as build config; `--dart-define` key definitions with types + per-flavour defaults; dev `--dart-define-from-file` example (no secrets, test IDs only); obfuscation flags for beta/release (`--obfuscate --split-debug-info`); documented invocations per flavour.
**Out:** the `FlavorConfig` Dart reader and the `assertAuthBypassSafe()` guard implementation ([SN-FND-012](devx.md#sn-fnd-012)); telemetry behaviour internals (ADR-0011, SN-TEL-001); real client IDs/secrets (CI secrets, `needs-credentials`).

#### Acceptance criteria
- [ ] `flutter run/build` works for each of dev/beta/release via documented `--dart-define`(s); dev honours `--dart-define-from-file`.
- [ ] Beta and release builds pass `--obfuscate --split-debug-info` and never accept `SANE_AUTH_BYPASS=true`.
- [ ] Every `--dart-define` key in overview §7.1 is defined with a type and per-flavour default; none carries a real secret.
- [ ] `SANE_TELEMETRY_DEFAULT=false` on every flavour; `SANE_AI_CLOUD_ENABLED=false` on every flavour (still per-request opt-in).
- [ ] A grep/CI check finds no hardcoded secret or client-secret string in Dart.

#### Technical notes
Map each key to `String.fromEnvironment`/`bool.fromEnvironment` consumed by `FlavorConfig` in [SN-FND-012](devx.md#sn-fnd-012). Use `--dart-define-from-file=config/dev.json` for dev ergonomics (commit only test IDs). Release/beta obfuscation flags come from overview §7 table. Production `SANE_GOOGLE_CLIENT_ID`/`SANE_MS_CLIENT_ID`/`SANE_APPLE_SERVICES_ID` are injected via CI secrets later (mark those release tasks `needs-credentials`). Do not commit staging/prod URLs beyond placeholders.

#### Security & privacy
Threats: a shipped auth-bypass (CWE-489 leftover debug code; MASVS-AUTH-1), a hardcoded secret (CWE-798; MASVS-STORAGE-1), or a mis-defaulted telemetry/cloud-AI switch (OWASP-A05, MASVS-CODE-2). Controls: config via `--dart-define`/CI secrets only (overview §7.1); obfuscation on non-dev; telemetry/cloud-AI **off by default** on every flavour; the p0 bypass neutralised by the three-layer guard implemented in [SN-FND-012](devx.md#sn-fnd-012). Record that no new network egress is added (URLs are config, not calls). Privacy-by-design: secure defaults (ASVS V14).

#### UX notes
Developer-facing, but the flavour drives user-visible behaviour later (a “data leaves device” indicator for cloud AI, telemetry opt-in — ADR-0011). Document the exact run/build commands per flavour so an agent never guesses. No end-user UI in this issue.

#### Test plan
`app/test/config/flavor_matrix_test.dart` asserting each key's type and per-flavour default matches overview §7.1; a build-smoke for each flavour; a grep test asserting no secret-shaped literal in Dart. Name file: `app/test/config/flavor_matrix_test.dart`.

#### Dependencies
SN-FND-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-006

<a id="sn-fnd-006"></a>

**Scaffold the twelve sane_* package skeletons with DAG-correct pubspecs**

| Field | Value |
|---|---|
| GitHub | #573 |
| Type | infra |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | devx, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-FND-002](devx.md#sn-fnd-002) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `ASVS-V1`, `CWE-1047` |
| Extra labels | agent-ready |

#### Context
The domain logic lives in 12 `sane_*` packages under `packages/` (`sane_core`, `sane_ink`, `sane_render`, `sane_brushes`, `sane_sync`, `sane_crypto`, `sane_pdf`, `sane_audio`, `sane_search`, `sane_ml`, `sane_ui`, `sane_billing`), each pure Dart unless it must paint (overview §4). Their allowed import edges form a strict DAG ([ADR-0002](docs/adr/0002-monorepo-layout.md), overview §5): `sane_crypto` imports nothing internal, `sane_core → sane_crypto`, the ink stack layers upward, feature packages depend only on `sane_core`, and `sane_ui` is a leaf. This issue creates each package as an empty-but-valid workspace member with the **correct `pubspec.yaml` dependency edges pre-wired** so downstream areas (SN-CORE, SN-INK, SN-DS) fill in bodies against a compiling, DAG-clean baseline.

#### Scope
**In:** 12 package folders each with `pubspec.yaml` (name, description, `resolution: workspace`, correct path deps), a `lib/sane_<x>.dart` barrel exporting a placeholder, a `test/` with one passing test, and a `[pure Dart]`/`[Flutter]` marker matching overview §4; the `package:flutter` boundary respected (pure-Dart packages depend on `test`, not `flutter_test`).
**Out:** any real API/model code (owned by SN-CORE/SN-INK/SN-DS/etc.); arch-lint enforcement ([SN-FND-008](devx.md#sn-fnd-008)); codegen wiring ([SN-FND-011](devx.md#sn-fnd-011)).

#### Acceptance criteria
- [ ] All 12 packages exist and resolve in the workspace; `melos list` shows them.
- [ ] Each `pubspec.yaml` declares exactly the internal edges allowed by overview §5 — e.g. `sane_core` depends only on `sane_crypto`; `sane_render` on `sane_brushes`+`sane_ink`+`sane_core`; feature packages only on `sane_core` (`sane_sync` also `sane_crypto`); `sane_ui` on none.
- [ ] Every `[pure Dart]` package builds and tests with `dart test` (not `flutter test`) — proving no Flutter dependency (ADR-0002 verify step 6).
- [ ] `dart analyze --fatal-infos` is clean across all 12 packages.
- [ ] No package writes SQL or touches the filesystem directly (placeholder only; enforced later by review + [SN-FND-008](devx.md#sn-fnd-008)).

#### Technical notes
Use `resolution: workspace` in each `pubspec.yaml` so the root lockfile governs (ADR-0002). Mark pure-Dart packages by the absence of any `flutter` dependency; `sane_render`, `sane_brushes`, `sane_pdf`, `sane_audio`, `sane_ui` are the `[Flutter]` ones (overview §4). Barrel files follow `snake_case.dart` and the `sane_` prefix (overview §9). Keep placeholders trivial (a version const + a doc comment) so downstream PRs own the real content.

#### Security & privacy
The dependency DAG is itself a security control (ADR-0002 “Security impact”): pre-wiring the correct edges prevents `sane_crypto` from ever importing UI/network code and keeps key material out of widgets/logs (MASVS-CODE-1, ASVS V1). No runtime behaviour, data flow, or stored asset is introduced. A wrong edge here is a latent boundary violation — CWE-1047 (modules with circular/incorrect dependencies) — caught by [SN-FND-008](devx.md#sn-fnd-008).

#### UX notes
Developer-facing. Package READMEs must state the one-line purpose and the `[pure Dart]`/`[Flutter]` marker so an agent finds “where crypto lives” instantly (ADR-0002 goal). No end-user UI.

#### Test plan
One placeholder unit test per package (`packages/sane_<x>/test/sane_<x>_test.dart`) asserting the barrel loads. A meta-test/script asserting each pure-Dart package runs under `dart test`. Name files: `packages/sane_core/test/sane_core_test.dart` (and the 11 siblings).

#### Dependencies
SN-FND-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-007

<a id="sn-fnd-007"></a>

**Scaffold the seven federated plugins as platform-interface plus mock and stubs**

| Field | Value |
|---|---|
| GitHub | #574 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx |
| Size | M |
| SDLC | implementation |
| Parent | [SN-FND-002](devx.md#sn-fnd-002) |
| Depends on | — |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-CODE-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Seven native capabilities are exposed as **federated Flutter plugins** ([ADR-0012](docs/adr/0012-native-plugin-strategy.md), overview §4): `sane_ink_surface`, `sane_stylus`, `sane_scribble`, `sane_secure_store`, `sane_cloud_drive`, `sane_ml_native`, `sane_pdfkit`. Each has the shape `sane_x` (app-facing) → `sane_x_platform_interface` (the contract) → `sane_x_ios`/`sane_x_android`/`sane_x_web` impls, ships a **mock implementation** and a **capability probe** (`isAvailable`) so `packages/` and `app/` tests run without a device, and degrades gracefully when absent. This issue scaffolds all seven at that federated shape with empty-but-typed interfaces, a Pigeon schema stub, a mock impl, and a probe, so feature milestones (SN-INK, SN-CRY, SN-SYNC, SN-HWR) implement against a compiling contract.

#### Scope
**In:** for each plugin, the interface package with an abstract platform-interface class + `isAvailable` probe + a `MethodChannel`/Pigeon-typed stub method, a `*_mock` impl used by tests, and empty iOS(Swift)/Android(Kotlin)/web(JS-interop) impl folders registered as endorsements; a Pigeon schema file under each plugin's `pigeons/`.
**Out:** real native code (owned by the feature milestones per ADR-0012 status), the Pigeon codegen runner ([SN-FND-011](devx.md#sn-fnd-011)), and arch-lint ([SN-FND-008](devx.md#sn-fnd-008)).

#### Acceptance criteria
- [ ] All 7 plugins exist in `plugins/` at the federated shape (`_platform_interface` + `_ios`/`_android`/`_web` + `_mock`).
- [ ] Each exposes `Future<bool> isAvailable()` (or a capability descriptor) and one typed stub method; the mock returns deterministic values.
- [ ] A widget/unit test drives each plugin through its mock **with no device**; `sane_ink_surface.isAvailable()` returning `false` is handled by callers as Tier B fallback (overview §2).
- [ ] Consumers depend only on the `_platform_interface` package, never a concrete impl (ADR-0002 rule 7); verified by review and [SN-FND-008](devx.md#sn-fnd-008).
- [ ] No plugin imports `packages/` or `app/` (leaves).

#### Technical notes
Follow [ADR-0012](docs/adr/0012-native-plugin-strategy.md): Pigeon schemas in `pigeons/`, `EventChannel` reserved for streams, `Texture`/`PlatformView` reserved for `sane_ink_surface`. Register federated endorsements in each interface `pubspec.yaml`. Keep the web impl a feature-detecting stub (many ops are main-thread-only or absent on web — ADR-0012, ADR-0010). Do not call `flutter_rust_bridge` here (reserved for the Rust ink/CRDT core, ADR-0001).

#### Security & privacy
The native bridge is real attack surface (ADR-0012 “Security impact”): every channel payload is **untrusted input** and must be validated on both sides (MASVS-PLATFORM-1/2, CWE-20). Scaffold the interfaces so validation has an obvious home; deep-link/intent handlers (`sane_scribble`, `sane_cloud_drive`) must land in a view/confirm path, never auto-mutate (overview §7.8). `sane_secure_store` must keep key material off the channel in the clear and out of logs (MASVS-CODE-1). No real permission is declared by a stub.

#### UX notes
Developer-facing. Each plugin README states the capability, the graceful-degradation behaviour when `isAvailable()` is false, and the surfaces it targets (ADR-0012 table). Permissions, when real impls land, are requested **in-context with rationale**, never at launch — record that expectation now.

#### Test plan
Per plugin: `plugins/sane_<x>/sane_<x>_platform_interface/test/*_test.dart` exercising the mock and the probe. An `app/` test asserting Tier B fallback when `sane_ink_surface` is unavailable. Name file: `plugins/sane_ink_surface/sane_ink_surface_platform_interface/test/capability_probe_test.dart`.

#### Dependencies
SN-FND-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-008

<a id="sn-fnd-008"></a>

**Implement arch-lint enforcing the package DAG, package:flutter ban and print() ban**

| Field | Value |
|---|---|
| GitHub | #575 |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | devx, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-FND-002](devx.md#sn-fnd-002) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `MASVS-CODE-2`, `MASVS-RESILIENCE-1`, `ASVS-V1`, `OWASP-A05`, `CWE-1047` |
| Extra labels | agent-ready, sec: threat-model |

#### Context
The package dependency graph is a **strict DAG and a security control**: a wrong edge is a build failure and a latent boundary violation (overview §5, [ADR-0002](docs/adr/0002-monorepo-layout.md) “Security impact”). The DAG keeps `sane_crypto` unable to import UI/network code (so key material cannot flow into a widget or a log) and keeps `sane_ui` unable to import the model (so the design system cannot touch note content). Two further rules ride with it: `[pure Dart]` packages MUST NOT import `package:flutter`, and `print()` is banned in favour of the `SaneLog` facade (overview §8.2, §9). This issue implements `tools/scripts/arch_check` and wires it as a CI-and-precommit gate.

#### Scope
**In:** a Dart CLI at `tools/scripts/arch_check` that parses every `pubspec.yaml`, builds the actual edge set, and fails on (a) any internal dependency edge not in the allowed set (overview §5 rules 1–8), (b) a `package:flutter` import/dependency in a `[pure Dart]` package, (c) a `print(`/`debugPrint(` call outside an allowlist, (d) a `plugins/*` package importing `packages/`/`app/`; a machine-readable allowed-edge table it reads from.
**Out:** the CI job that invokes it ([SN-FND-003](ci-cd.md#sn-fnd-003)), the pre-commit hook that invokes it ([SN-FND-016](devx.md#sn-fnd-016)), the `SaneLog` facade itself (owned by SN-CORE, `sane_core`).

#### Acceptance criteria
- [ ] Running `dart run tools/scripts/arch_check` on the clean scaffold exits 0.
- [ ] Introducing a forbidden edge (e.g. `sane_ui` → `sane_core`, or `sane_crypto` → `sane_render`) fails with a clear message naming the offending edge and the rule.
- [ ] Adding `import 'package:flutter/...'` to any `[pure Dart]` package fails the check.
- [ ] Adding a bare `print(` outside the allowlist fails the check.
- [ ] A `plugins/*` package importing `packages/` fails the check.
- [ ] The allowed-edge table matches overview §5 exactly and is unit-tested.

#### Technical notes
Parse `pubspec.yaml` with the `yaml` package and scan `lib/**` with the Dart `analyzer` for banned imports/`print`. Encode the allowed edges as data (a `Map<String, Set<String>>`) so review of the policy is a diff. Exit non-zero with a diagnostic list. Keep the tool pure Dart so it runs in CI and locally. This is the enforcement referenced by ADR-0002 “How to verify” step 2 and ADR-0012 verify step 3.

#### Security & privacy
This IS a security control (MASVS-CODE-1/2, MASVS-RESILIENCE-1, ASVS V1, OWASP-A05 misconfiguration; a bad edge is CWE-1047). It structurally prevents crypto/key/note-content leakage across layers and enforces the `print()` ban that protects against PII-in-logs (overview §8.2). Add abuse tests: a fixture package with a forbidden edge MUST fail. Update `docs/security/controls-matrix.md` to cite arch-lint as the enforcing control for the boundary rows.

#### UX notes
Developer-facing. Output must be actionable: name the file, the edge, the rule number from overview §5, and how to fix. Non-zero exit on any violation. No end-user UI.

#### Test plan
Unit tests over fixture package trees in `tools/scripts/test/arch_check_test.dart`: allowed graph passes; each forbidden case (bad edge, flutter-in-pure-dart, print, plugin importing packages) fails with the expected message. Name file: `tools/scripts/test/arch_check_test.dart`.

#### Dependencies
SN-FND-006, SN-FND-007.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-009

<a id="sn-fnd-009"></a>

**Scaffold services, website and tools (perf_harness, device_lab) placeholders**

| Field | Value |
|---|---|
| GitHub | #576 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx |
| Size | S |
| SDLC | implementation |
| Parent | [SN-FND-002](devx.md#sn-fnd-002) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `OWASP-A05`, `ASVS-V1` |
| Extra labels | agent-ready, good first issue |

#### Context
Beyond `app/` and `packages/`, the monorepo carries `services/` (optional, minimal, stateless, **never stores note content**), `website/` (marketing + docs + “try on web”), and `tools/` (perf harness, device lab, scripts) — see overview §4 and [ADR-0002](docs/adr/0002-monorepo-layout.md). These need placeholder homes so later areas (SN-COL relay, SN-BILL entitlements, SN-PERF harness, SN-SITE website) attach without re-deciding layout, and so CODEOWNERS/branch-protection can already guard `services/`. This is a small, self-contained structuring task.

#### Scope
**In:** `services/entitlements/` and `services/relay/` placeholder folders each with a `README.md` stating “stateless, ciphertext-only, never stores note content”; `website/` placeholder with a README; `tools/perf_harness/`, `tools/device_lab/`, `tools/scripts/` folders with READMEs describing their purpose (pen-to-pixel latency + fps + memory; reference-device configs; dev/CI helpers).
**Out:** any real service code (SN-COL, SN-BILL), the actual perf harness (SN-PERF-002), device-lab configs (SN-PERF-004), and the website build (SN-SITE-001).

#### Acceptance criteria
- [ ] `services/entitlements/`, `services/relay/`, `website/`, `tools/perf_harness/`, `tools/device_lab/`, `tools/scripts/` all exist with a purpose README.
- [ ] Each `services/*` README explicitly states the ciphertext-only / no-note-content invariant (overview §4).
- [ ] Nothing under `services/` reads or stores note content (placeholders only).
- [ ] `tools/perf_harness/README.md` states the decision-7 budgets it will measure (≤16 ms iPad / ≤25 ms mid-Android / ≤30 ms web).

#### Technical notes
No build wiring yet — these are folders + docs. Keep `services/` language-agnostic (a later ADR picks the runtime). The `tools/scripts/` folder is where `arch_check` ([SN-FND-008](devx.md#sn-fnd-008)) and dev scripts ([SN-FND-017](devx.md#sn-fnd-017)) live. Reference `docs/platform/performance-budgets.md` from the perf_harness README.

#### Security & privacy
The layout makes it structurally obvious that services are stateless and ciphertext-only; any future PR adding note-content storage to `services/` is a visible red flag (ADR-0002 “services/ isolation”, MASVS-CODE-1, OWASP-A05). No data flow or stored asset is introduced. Ensure CODEOWNERS already covers `services/` so a real service change requires the Security Owner (ssdlc-process §1).

#### UX notes
Developer-facing. READMEs are the UX: each states purpose, the invariant it must keep, and which SN-* epic will fill it in. No end-user UI.

#### Test plan
A lightweight test/script asserting each expected folder + README exists and that `services/*` READMEs contain the ciphertext-only invariant string. Name file: `tools/scripts/test/tree_layout_test.dart`.

#### Dependencies
SN-FND-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-010

<a id="sn-fnd-010"></a>

**Pin the Flutter and Dart toolchain with fvm and mise**

| Field | Value |
|---|---|
| GitHub | #577 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx |
| Size | S |
| SDLC | implementation |
| Parent | [SN-FND-004](devx.md#sn-fnd-004) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `OWASP-A08`, `OWASP-A06`, `ASVS-V14`, `CWE-1104` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
Reproducible builds require a **pinned toolchain** — the SSDLC release gate calls for “pinned toolchain (Flutter/Dart, Gradle, Xcode)” (`docs/security/ssdlc-process.md` §2.5), and ADR-0001/ADR-0003 warn that fast-moving deps (riverpod v3, go_router v18, google_sign_in v7) cause churn, so the SDK itself must not drift between agents, machines and CI. This issue pins the Flutter/Dart SDK version for local dev and CI so every agent builds against the same compiler and the same tree-shaking behaviour that the p0 auth-bypass guard relies on (overview §7.2).

#### Scope
**In:** an `.fvmrc`/`fvm` config pinning the exact Flutter stable version, a `mise.toml` (or `.tool-versions`) pinning Flutter/Dart (and Node 22 for the issue scripts, per CLAUDE.md §11), a documented `flutter --version` expectation, and a check that CI and local use the same pin.
**Out:** the CI workflow ([SN-FND-003](ci-cd.md#sn-fnd-003)), Gradle/Xcode/Ruby pinning for native builds (folded into the per-platform build job [SN-FND-013](ci-cd.md#sn-fnd-013)), dependency-version policy for packages ([SN-FND-020](devx.md#sn-fnd-020)).

#### Acceptance criteria
- [ ] A single source of truth names the exact Flutter stable version; `fvm use` selects it.
- [ ] `mise install` (or asdf) provisions the pinned Flutter/Dart and Node 22 on a clean machine.
- [ ] A `tools/scripts` check (or `flutter --version` assertion) fails if the active SDK differs from the pin.
- [ ] The pinned version is Impeller-capable and matches ADR-0001 “latest stable, Dart 3”.
- [ ] The local-setup guide ([SN-FND-017](devx.md#sn-fnd-017)) references the pin as the first step.

#### Technical notes
Use `fvm` for the Flutter SDK and `mise`/`.tool-versions` for cross-tool pins so both humans and CI resolve identically. Keep the pin in one file the CI job reads (avoid two drifting sources). Record the exact version string; document the upgrade path (bump the pin behind integration tests, ADR-0001 “fast-moving deps”). Note Gradle/Xcode pins are set in [SN-FND-013](ci-cd.md#sn-fnd-013) where the native builds live.

#### Security & privacy
Toolchain pinning is a supply-chain control (OWASP-A06/A08, MASVS-CODE-2, ASVS V14; an unpinned/unmaintained toolchain is CWE-1104): it makes builds reproducible, protects the tree-shaking guarantee behind the auth-bypass control (overview §7.2), and prevents a silent SDK bump from changing obfuscation/minification behaviour. No secrets are stored; the pin file is public and safe.

#### UX notes
Developer-facing. One command (`mise install && fvm use`) should get an agent to the right SDK; error messages must name the expected vs. actual version. No end-user UI.

#### Test plan
A CI/local script `tools/scripts/check_toolchain.sh` (or Dart) asserting `flutter --version` equals the pin; a smoke `flutter build` on the pinned SDK. Name file: `tools/scripts/test/toolchain_pin_test.dart` (parses the pin file and asserts a single version).

#### Dependencies
SN-FND-004.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-011

<a id="sn-fnd-011"></a>

**Wire build_runner code generation (freezed, riverpod, pigeon) with runner scripts**

| Field | Value |
|---|---|
| GitHub | #578 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx |
| Size | M |
| SDLC | implementation |
| Parent | [SN-FND-004](devx.md#sn-fnd-004) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `OWASP-A08`, `ASVS-V14`, `CWE-1395` |
| Extra labels | agent-ready |

#### Context
The codebase relies on codegen: **`freezed`** for immutable value objects (overview §9, ADR-0003 state rules), **`riverpod_generator` `@riverpod`** for providers (ADR-0003 — “codegen adds a build step → runner scripts in `tools/scripts/`”), and **Pigeon** for type-safe plugin channels (ADR-0012). CI must fail if checked-in generated files are stale (ADR-0003 verify step 1; ADR-0012 verify step 1). This issue wires `build_runner`, a Melos `generate` script, and a CI staleness check, so generated `*.g.dart`/`*.freezed.dart` and Pigeon stubs stay in sync with source.

#### Scope
**In:** dev-dependencies (`build_runner`, `freezed`/`freezed_annotation`, `riverpod_generator`, `pigeon`) in the packages that need them; a `melos run generate` (build_runner `build --delete-conflicting-outputs`) and a `melos run generate:check` that fails on any diff; analyzer excludes for generated files; a sample generated model/provider/pigeon stub proving the pipeline end-to-end.
**Out:** the actual models (SN-CORE), providers (per-feature areas), and real Pigeon schemas beyond the sample (SN-INK/SN-CRY); the CI job wiring ([SN-FND-003](ci-cd.md#sn-fnd-003)).

#### Acceptance criteria
- [ ] `melos run generate` produces `*.g.dart`/`*.freezed.dart` and Pigeon Dart/Swift/Kotlin stubs without conflicts.
- [ ] `melos run generate:check` **fails** when a source change is not regenerated (staleness gate).
- [ ] A sample `freezed` value object, a `@riverpod` provider, and a Pigeon-generated channel compile and are unit-tested.
- [ ] Generated files are analyzer-excluded but committed (so builds do not require codegen on every checkout).
- [ ] The runner is documented in the local-setup guide ([SN-FND-017](devx.md#sn-fnd-017)).

#### Technical notes
Use `build_runner build --delete-conflicting-outputs`. Pigeon reads `pigeons/*.dart` per plugin ([SN-FND-007](devx.md#sn-fnd-007)) and writes Dart+Swift+Kotlin. Keep codegen deterministic (pin generator versions with [SN-FND-020](devx.md#sn-fnd-020) policy). The staleness check is a `git diff --exit-code` after regeneration in a clean tree. Do not hand-edit generated files.

#### Security & privacy
Committing generated code and gating on staleness protects build integrity (OWASP-A08 software & data integrity, ASVS V14; stale/undead generated code is CWE-1395/CWE-561 risk). Pigeon-typed channels remove a class of stringly-typed payload bugs at the native boundary (MASVS-CODE-1, ADR-0012). Generators are build-time deps only — they must not ship in the release binary; verify none leak runtime secrets.

#### UX notes
Developer-facing. `melos run generate` must be a single obvious command; the staleness failure message must tell the agent to run it and commit the result. No end-user UI.

#### Test plan
Unit test the sample freezed model (equality/copyWith), the `@riverpod` provider (override in test), and the Pigeon stub round-trip via the mock. A CI-style `generate:check` on a deliberately-stale fixture fails. Name files: `packages/sane_core/test/codegen_sample_test.dart`, `tools/scripts/test/generate_check_test.dart`.

#### Dependencies
SN-FND-006.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-012

<a id="sn-fnd-012"></a>

**Implement the FlavorConfig dart-define reader and assertAuthBypassSafe guard**

| Field | Value |
|---|---|
| GitHub | #579 |
| Type | security |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx, auth, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-FND-005](devx.md#sn-fnd-005) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-RESILIENCE-3`, `MASVS-CODE-2`, `OWASP-A05`, `OWASP-A07`, `ASVS-V1`, `CWE-489`, `CWE-288` |
| Extra labels | agent-ready, innovation, sec: masvs |

#### Context
Dev **auth bypass** (`SANE_AUTH_BYPASS=true`) must be **impossible in release** — a p0 locked decision (CLAUDE.md §7.5, overview §7.2, [ADR-0003](docs/adr/0003-state-management-and-app-structure.md) “auth-bypass wiring”). It is neutralised by **three independent layers**: (1) compile-time dead-code elimination via `if (!kReleaseMode && _authBypass)` so the branch tree-shakes out of release; (2) a runtime guard `assertAuthBypassSafe()` that throws on startup if `_authBypass && kReleaseMode`; (3) a CI reachability test. This issue implements the `FlavorConfig` reader for the `--dart-define` matrix ([SN-FND-005](devx.md#sn-fnd-005)) and layers 1–2, plus the test that becomes layer 3. It is the single most safety-critical Foundations task.

#### Scope
**In:** `app/lib/config/flavor_config.dart` reading every `--dart-define` key from overview §7.1 into a typed immutable object; `_authBypass = bool.fromEnvironment('SANE_AUTH_BYPASS')`; `assertAuthBypassSafe()` called from `bootstrap.dart`; the guarded read pattern documented so the `auth` feature's provider consumes it correctly.
**Out:** the sign-in flows and the auth provider themselves (SN-AUTH-002); telemetry behaviour (ADR-0011); the CI job that runs the test ([SN-FND-003](ci-cd.md#sn-fnd-003)) — the test file itself lands here.

#### Acceptance criteria
- [ ] `FlavorConfig` exposes typed getters for all overview §7.1 keys with the correct per-flavour defaults; it holds **no** secret.
- [ ] The bypass branch is written `if (!kReleaseMode && config.authBypass)` so it is tree-shaken from release (verified by the reachability test).
- [ ] `assertAuthBypassSafe()` throws at startup iff `authBypass && kReleaseMode`; it is called from `bootstrap.dart` before `runApp`.
- [ ] `app/test/security/auth_bypass_test.dart` asserts the bypass path is unreachable in a release-mode build and that the assertion throws under `authBypass && kReleaseMode`.
- [ ] No token, secret, or bypass flag is ever logged (overview §8.2).

#### Technical notes
Read config via `bool.fromEnvironment`/`String.fromEnvironment` (overview §7.1). `kReleaseMode` is a compile-time constant enabling tree-shaking (overview §7.2). Keep `FlavorConfig` immutable and provided via Riverpod, holding only short-lived handles/flags, never token contents (ADR-0003 security impact). The auth provider's bypass branch must preserve the `!kReleaseMode` guard on every refactor — call this out in `docs/security/secure-coding-checklist.md`. This is the mechanism ADR-0001 verify step 5 and ADR-0003 verify step 4 reference.

#### Security & privacy
Threat: an authentication-bypass reaching production (CWE-489 leftover debug feature, CWE-288 authn bypass; MASVS-AUTH-1, MASVS-RESILIENCE-3, OWASP-A07). Controls: the three-layer guard (tree-shake + startup assert + CI test), none of which may be weakened (CLAUDE.md §7.5). Secure-by-default config (OWASP-A05, ASVS V1). Add the abuse test as a permanent regression gate. This is a CODEOWNERS-required path (`/app/lib/auth/`, ssdlc-process §1).

#### UX notes
Developer-facing. In dev, when bypass is active the app should make it visibly obvious it is not a real session (a later auth-UI concern, SN-AUTH-002/SN-ONB-001); here just ensure the config exposes the flag cleanly. No end-user UI in this issue; no a11y surface.

#### Test plan
`app/test/security/auth_bypass_test.dart` (the named security test): (a) release-mode build cannot reach the bypass branch; (b) `assertAuthBypassSafe()` throws when `authBypass && kReleaseMode`, passes otherwise; (c) a no-PII-in-logs assertion that the flag/token never appears in `SaneLog` output. Name file: `app/test/security/auth_bypass_test.dart`.

#### Dependencies
SN-FND-005.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-016

<a id="sn-fnd-016"></a>

**Add pre-commit hooks (format, analyze, gitleaks, issues-validate)**

| Field | Value |
|---|---|
| GitHub | #260 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `MASVS-STORAGE-1`, `OWASP-A05`, `ASVS-V14`, `CWE-798` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
The SSDLC implementation gate says to “run local pre-commit before pushing: format, `dart analyze`, gitleaks (secret scan), `validate-issues` if issues changed” (`docs/security/ssdlc-process.md` §2.3). Catching a secret or a format/analyze failure locally is cheaper than in CI and protects against a secret ever entering git history (overview §7.1). This issue adds a managed pre-commit toolchain so every commit runs the fast gates automatically.

#### Scope
**In:** a `lefthook.yml` (or `pre-commit`) config running, on staged files: `dart format` (fix or fail), `dart analyze` on affected packages, `gitleaks protect --staged`, `arch_check` ([SN-FND-008](devx.md#sn-fnd-008)), and `node scripts/validate-issues.mjs` when `issues/` is staged; an installer step in the bootstrap script ([SN-FND-017](devx.md#sn-fnd-017)); documentation of how to bypass in an emergency (`--no-verify`) with a warning.
**Out:** the full CI workflow ([SN-FND-003](ci-cd.md#sn-fnd-003)), the DevSecOps scanners (SN-CI-001), and server-side push protection (SN-CI-003).

#### Acceptance criteria
- [ ] Installing hooks (via the bootstrap script) wires the pre-commit runner.
- [ ] A commit with a formatting or analyze error is blocked with an actionable message.
- [ ] A commit containing a secret-shaped string (test fixture) is blocked by gitleaks.
- [ ] A commit touching `issues/` runs the schema validator and blocks on error.
- [ ] Hooks run in under a few seconds on a typical change (staged-file scoped).

#### Technical notes
Prefer `lefthook` (fast, Dart/Flutter-friendly) with a committed `lefthook.yml`; keep hooks staged-file-scoped so they stay fast. Pin the `gitleaks` version. The same checks run in CI as the authoritative gate (defence in depth) — pre-commit is the fast local mirror. Wire installation into [SN-FND-017](devx.md#sn-fnd-017) so a fresh clone gets hooks on bootstrap. Document `--no-verify` is for emergencies only; CI still enforces.

#### Security & privacy
Primary control: **no secrets in git** (CWE-798, MASVS-STORAGE-1, OWASP-A05) via `gitleaks protect --staged` before the commit is written; plus format/analyze/arch-lint quality gates (MASVS-CODE-2, ASVS V14). This is a shift-left secret-hygiene control (ssdlc-process §0 principle 1). Note it is advisory locally (can be bypassed) — the authoritative enforcement is CI + server push protection (SN-CI-003); state that so no one treats local hooks as the only line.

#### UX notes
Developer-facing. Hook output must name the failing check and the one-line fix. Fast execution matters for agent iteration speed. Document install + bypass in the local-setup guide. No end-user UI.

#### Test plan
Manual + scripted: a staged secret fixture is blocked; a mis-formatted file is blocked/auto-fixed; an invalid `issues/` change is blocked. Name file: `tools/scripts/test/precommit_smoke.sh` (drives lefthook against fixtures).

#### Dependencies
SN-FND-004.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-017

<a id="sn-fnd-017"></a>

**Add the dev bootstrap/doctor script and local-setup guide**

| Field | Value |
|---|---|
| GitHub | #261 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx, docs |
| Size | S |
| SDLC | implementation |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `OWASP-A05`, `ASVS-V14` |
| Extra labels | agent-ready, innovation |

#### Context
CLAUDE.md is written for “an autonomous coding agent with zero prior context”; that promise only holds if a fresh clone reaches a working, gated state with **one command**. This issue adds `tools/scripts/bootstrap` (provision toolchain, `melos bootstrap`, install hooks, run codegen) and `tools/scripts/doctor` (verify SDK pin, hooks, codegen freshness, arch-lint) plus `docs/dev/local-setup.md`, so a new agent or engineer goes from clone to green in minutes. An agent-first, one-command onramp is a genuine differentiator for an agent-built codebase.

#### Scope
**In:** `tools/scripts/bootstrap` (idempotent: install pinned SDK via [SN-FND-010](devx.md#sn-fnd-010), `melos bootstrap`, install pre-commit hooks [SN-FND-016](devx.md#sn-fnd-016), run codegen [SN-FND-011](devx.md#sn-fnd-011)); `tools/scripts/doctor` (checks + actionable fixes, non-zero on any failure); `docs/dev/local-setup.md` covering prerequisites, the one-command path, per-flavour run commands ([SN-FND-005](devx.md#sn-fnd-005)), and the DAG/arch-lint rules.
**Out:** the dev container ([SN-FND-018](devx.md#sn-fnd-018)), CI ([SN-FND-003](ci-cd.md#sn-fnd-003)), and the ADR/versioning process docs ([SN-FND-021](docs.md#sn-fnd-021), [SN-FND-022](devx.md#sn-fnd-022)).

#### Acceptance criteria
- [ ] `tools/scripts/bootstrap` on a clean clone yields a workspace where `melos run analyze`/`test` and `arch_check` pass — with no manual steps.
- [ ] `tools/scripts/doctor` reports each of: SDK pin match, hooks installed, codegen fresh, arch-lint clean — and exits non-zero if any fails, naming the fix.
- [ ] `docs/dev/local-setup.md` documents the one-command path and the per-flavour run/build commands.
- [ ] Running bootstrap twice is idempotent (no duplicate state, no error).
- [ ] The guide links the DAG (overview §5) and the security gate rules (overview §7–§9).

#### Technical notes
Keep scripts POSIX-sh or Dart for portability (macOS primary, Linux CI). Bootstrap composes the other Foundations tasks rather than reimplementing them (call `mise`, `fvm`, `melos`, `lefthook`). `doctor` mirrors the CLAUDE.md §4 pre-work checklist so an agent can self-verify. Reference `docs/README.md` reading order. Do not fetch anything unpinned.

#### Security & privacy
The scripts must not print or write secrets and must not fetch unpinned artifacts (OWASP-A05, MASVS-CODE-1, ASVS V14). `doctor` should warn if a `--dart-define-from-file` dev config accidentally contains a non-test value. No note content or PII is touched. State the threat model is unchanged (no new egress).

#### UX notes
Developer/agent-facing — this IS the developer UX. Output must be concise, ordered, and end with a clear “ready” or a numbered fix list. `doctor` should be safe to run anytime. No end-user UI; the audience is the agent onboarding per CLAUDE.md §1.

#### Test plan
CI job (or manual on a clean container) running `bootstrap` then `doctor` and asserting exit 0; a seeded broken state (wrong SDK, missing hook) makes `doctor` exit non-zero with the right message. Name file: `tools/scripts/test/doctor_test.dart`.

#### Dependencies
SN-FND-002, SN-FND-010.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-018

<a id="sn-fnd-018"></a>

**Add the dev container and Codespaces configuration**

| Field | Value |
|---|---|
| GitHub | #583 |
| Type | infra |
| Priority | p3 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx |
| Size | S |
| SDLC | implementation |
| Parent | [SN-FND-017](devx.md#sn-fnd-017) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `OWASP-A05`, `OWASP-A08`, `ASVS-V14`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
A reproducible container removes “works on my machine” drift for agents and CI and gives GitHub Codespaces a one-click environment consistent with the pinned toolchain ([SN-FND-010](devx.md#sn-fnd-010)). It complements the bootstrap script ([SN-FND-017](devx.md#sn-fnd-017)) by fixing the OS-level layer (JDK, Android SDK bits, Node 22, Dart/Flutter) so an agent starting fresh in the cloud gets the same green baseline. This is a nice-to-have polish task (p3) that pays off as more agents work the repo.

#### Scope
**In:** `.devcontainer/devcontainer.json` + `Dockerfile` pinning the base image and the toolchain to match [SN-FND-010](devx.md#sn-fnd-010); a `postCreateCommand` that runs `tools/scripts/bootstrap`; recommended VS Code extensions (Dart/Flutter); no secrets baked in.
**Out:** iOS/macOS builds (not containerisable — remain on macOS runners/hosts, [SN-FND-013](ci-cd.md#sn-fnd-013)); the bootstrap/doctor scripts themselves ([SN-FND-017](devx.md#sn-fnd-017)); CI runners ([SN-FND-003](ci-cd.md#sn-fnd-003)).

#### Acceptance criteria
- [ ] Opening the repo in a dev container / Codespace builds and runs `postCreateCommand` to a green `doctor`.
- [ ] The container's Flutter/Dart/Node versions equal the pins from [SN-FND-010](devx.md#sn-fnd-010).
- [ ] The base image and toolchain downloads are version-pinned (no floating `latest`).
- [ ] No secret or credential is baked into the image or `devcontainer.json`.
- [ ] Documented as an alternative onramp in `docs/dev/local-setup.md`.

#### Technical notes
Pin the base image by digest where possible; install Flutter via the same mechanism as [SN-FND-010](devx.md#sn-fnd-010) to avoid a second source of truth. Android SDK/JDK for Android builds only; note iOS builds require a real macOS host. Keep the image lean. `postCreateCommand: tools/scripts/bootstrap`. Recommend Dart/Flutter VS Code extensions via `customizations`.

#### Security & privacy
Container supply-chain hygiene: pin the base image and downloads (OWASP-A06/A08, MASVS-CODE-2, ASVS V14; unpinned base image is CWE-1104). No secrets in the image (they arrive via Codespaces secrets/`--dart-define` at run time, overview §7.1). The container has no note content and adds no egress beyond package/tool fetches. Least-privilege by default.

#### UX notes
Developer/agent-facing. The one-click Codespace should reach “ready” without manual steps; surface `doctor` output at the end. No end-user UI.

#### Test plan
Build the container in CI (or locally) and run `doctor` inside it asserting exit 0; assert the toolchain versions match the pin. Name file: `.devcontainer/devcontainer.json` (+ a CI job building the image).

#### Dependencies
SN-FND-017.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-020

<a id="sn-fnd-020"></a>

**Pin dependency versions and define sane_* workspace resolution**

| Field | Value |
|---|---|
| GitHub | #263 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx, docs |
| Size | S |
| SDLC | maintenance |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | [SN-CI-011](ci-cd.md#sn-ci-011) |
| Security controls | `MASVS-CODE-2`, `OWASP-A06`, `OWASP-A08`, `ASVS-V14`, `CWE-1104`, `CWE-1395` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
ADR-0001 and ADR-0003 flag fast-moving dependencies (riverpod v3, go_router v18, google_sign_in v7, file_picker v12) that cause upgrade churn; ADR-0002 warns that one shared lockfile means a risky transitive bump affects everything, so bumps must be pinned and gated behind integration tests. The Dependabot/Renovate update *automation* policy - bot config, grouping, security-update split, cadence, SHA-pin maintenance and reviewer routing - is owned by [SN-CI-011](ci-cd.md#sn-ci-011). This issue owns the complementary developer-authoring side: the exact-version pinning discipline in the pubspecs and the internal sane_* workspace resolution rules that the bot policy then automates.

#### Scope
**In:** `docs/dev/dependency-policy.md` covering the pinning discipline (exact pins, no caret for the volatile deps named in ADR-0001), how internal sane_* deps resolve via the workspace (path/melos, never a pinned pub.dev version), and the rule that major-version bumps are held behind an integration-test PR; applying those exact pins across the monorepo pubspecs and configuring sane_* workspace resolution. It references the Dependabot/Renovate automation owned by [SN-CI-011](ci-cd.md#sn-ci-011).
**Out:** the Dependabot/Renovate configuration, grouping, cadence, security-update split and reviewer routing ([SN-CI-011](ci-cd.md#sn-ci-011), which automates the discipline this issue defines); OSV-Scanner/dependency-review/SBOM (SN-CI-001, SN-CI-004); toolchain SDK pinning ([SN-FND-010](devx.md#sn-fnd-010)); and per-package dependency choices (owned by each area).

#### Acceptance criteria
- [ ] `docs/dev/dependency-policy.md` states the exact-pin discipline, the sane_* workspace-resolution rule, and the major-version-gating rule, and points to [SN-CI-011](ci-cd.md#sn-ci-011) for the update automation.
- [ ] The volatile deps named in ADR-0001 are pinned to exact versions (no caret) in the pubspecs.
- [ ] Internal sane_* deps resolve via the workspace (path/melos), never a pinned pub.dev version - verified by a check.
- [ ] Major-version bumps are documented as gated behind an integration-test PR before merge.
- [ ] The doc and the automation policy in [SN-CI-011](ci-cd.md#sn-ci-011) are consistent and cross-reference each other (no conflicting cadence/grouping statements).

#### Technical notes
Keep pins exact in `pubspec.yaml` (no caret for the volatile ones named in ADR-0001); let [SN-CI-011](ci-cd.md#sn-ci-011)'s bot propose bumps. Internal packages under `packages/*` and `plugins/*` resolve through the melos/workspace, not pub.dev. This issue is the pinning discipline + workspace resolution, not the bot config - the Dependabot/Renovate groups, schedule and SHA-pin maintenance live in [SN-CI-011](ci-cd.md#sn-ci-011). License-compat is deferred to [SN-FND-023](docs.md#sn-fnd-023); CI vulnerability gating is OSV-Scanner (SN-CI-001).

#### Security & privacy
Supply-chain core control (OWASP-A06 vulnerable/outdated components, OWASP-A08 integrity, MASVS-CODE-2, ASVS V14; unpinned deps are CWE-1104, stale ones CWE-1395): exact pins + workspace resolution keep the shared lockfile deterministic and safe, and are the substrate the [SN-CI-011](ci-cd.md#sn-ci-011) cadence patches. No secrets. A transitive bump touching sane_crypto/sane_sync requires CODEOWNERS review (ssdlc-process section 1).

#### UX notes
Developer-facing. The pinning discipline and workspace rules are the reference an agent cites when adding or bumping a dependency; the actual grouped PRs are produced by [SN-CI-011](ci-cd.md#sn-ci-011). No end-user UI.

#### Test plan
Assert the policy doc exists and covers pinning, workspace resolution and major-gating; a check that the volatile deps are exact-pinned and that sane_* deps resolve via the workspace. Name file: `docs/dev/dependency-policy.md` (+ the pin/workspace check in `tools/scripts/test/`).

#### Dependencies
[SN-CI-011](ci-cd.md#sn-ci-011) (Dependabot/Renovate update-automation policy), [SN-FND-003](ci-cd.md#sn-fnd-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-022

<a id="sn-fnd-022"></a>

**Define versioning and changelog policy (SemVer plus Melos version)**

| Field | Value |
|---|---|
| GitHub | #265 |
| Type | docs |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | devx, release |
| Size | S |
| SDLC | release |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `OWASP-A08`, `ASVS-V14`, `MASVS-CODE-2` |
| Extra labels | agent-ready |

#### Context
Conventional Commits are already the commit style (CLAUDE.md §5) and the release process expects a signed version tag `v*` and release notes listing security-relevant changes (`ssdlc-process.md` §2.5–§2.6, which also limits fixes to “the latest released minor version per platform”). What is missing is the written versioning contract: how the app version and per-package versions relate, how the changelog is produced from Conventional Commits, and how Melos versioning is used. This issue defines that policy so releases (SN-REL-001) and the maintenance SLA have a stable versioning foundation.

#### Scope
**In:** `docs/dev/versioning.md` covering SemVer for the app (`x.y.z+build`), per-package `sane_*` versioning via `melos version` (Conventional-Commit-driven), a root `CHANGELOG.md` generation approach, the tag scheme (`v*`, signed), and the “latest released minor per platform gets security fixes” rule; a `melos version`/changelog script wired into `melos.yaml`.
**Out:** actual signing/notarization/SBOM/SLSA and store release (SN-REL-001, SN-CI-004), and the security-disclosure SLA (already in `ssdlc-process.md` §3).

#### Acceptance criteria
- [ ] `docs/dev/versioning.md` defines app SemVer, per-package versioning, tag scheme, and the supported-version rule.
- [ ] `melos version` produces per-package version bumps + changelog entries from Conventional Commits (dry-run demonstrated).
- [ ] A root `CHANGELOG.md` exists and is generatable/updatable from commit history.
- [ ] The policy states that release notes must list security-relevant changes (ties to `ssdlc-process.md` §2.5).
- [ ] The tag scheme (`v*`, signed) is documented and consistent with the release process.

#### Technical notes
Use Melos's Conventional-Commit versioning (`melos version`) for the `sane_*` packages; the app version in `app/pubspec.yaml` is the user-facing SemVer. Keep the internal packages unpublished (workspace path deps) so their versions are for changelog/traceability, not pub.dev. Signed tags relate to SN-CI-003 (signed commits/branch protection). Do not implement signing here — reference SN-REL-001. Align with CLAUDE.md §5 commit style.

#### Security & privacy
Release integrity and traceability (OWASP-A08, ASVS V14, MASVS-CODE-2): a clear version + changelog lets the maintenance SLA target “the latest released minor” and lets advisories reference exact versions (`ssdlc-process.md` §3). Changelogs must not leak embargoed vulnerability detail before a fix ships (coordinated disclosure, SECURITY.md) — note that constraint. No secrets or PII.

#### UX notes
Developer/release-facing. The policy doc is the reference; `melos version` output should be predictable. Human-readable changelog entries benefit users at release time (SN-REL/SN-SITE). No end-user UI in this issue.

#### Test plan
`melos version --dry-run` produces sensible bumps from a fixture of Conventional Commits; assert the versioning doc covers each required point. Name file: `docs/dev/versioning.md` (+ a dry-run check in `tools/scripts/test/`).

#### Dependencies
SN-FND-004.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GOPS-011

<a id="sn-gops-011"></a>

**Define the Flutter, Dart and native toolchain upgrade cadence and playbook**

| Field | Value |
|---|---|
| GitHub | #1107 |
| Type | chore |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | devx, ci-cd, compat |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | [SN-FND-010](devx.md#sn-fnd-010), [SN-PERF-003](perf.md#sn-perf-003), [SN-QA-005](qa.md#sn-qa-005) |
| Security controls | `SSDF-PW.6`, `OWASP-A06`, `CWE-1104`, `MASVS-CODE-2` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
[SN-FND-010](devx.md#sn-fnd-010) pins Flutter and Dart with fvm/mise, and [SN-FND-020](devx.md#sn-fnd-020)/[SN-CI-011](ci-cd.md#sn-ci-011) govern *package* dependencies — but nothing says how the project moves to a new Flutter stable, an AGP/Gradle/Kotlin bump, or a new Xcode/Swift toolchain. That is the riskiest upgrade class in this codebase: the renderer (Impeller), the low-latency ink surfaces, the golden images across 17 looks, the web renderer selection ([SN-WEB-002](compat.md#sn-web-002)) and every performance budget (`docs/platform/performance-budgets.md`) can all move under a single `flutter upgrade`. Staying still is not an option either — store toolchain minimums, security patches and plugin compatibility force forward motion ([SN-GPRF-018](compat.md#sn-gprf-018) covers the *platform* SDK readiness testing; this issue covers *our* toolchain).

#### Scope
**In:** `docs/dev/toolchain-upgrade.md` — the channel policy (stable only), the supported-version window, the cadence (a scheduled attempt per stable release with a hard freeze during a release train), and the per-upgrade checklist: regenerate code, run analyze with `--fatal-infos`, run the full test matrix, re-run goldens with a written re-baseline rule (never a blanket `--update-goldens`; each changed golden is reviewed and justified), re-run the perf harness on the physical device runner and diff against the stored baselines ([SN-PERF-003](perf.md#sn-perf-003), [SN-PERF-018](perf.md#sn-perf-018)), verify Impeller is still active ([SN-PERF-022](perf.md#sn-perf-022)), smoke the native ink surfaces on iPadOS and Android, and check web bundle size ([SN-WEB-003](perf.md#sn-web-003)); a scheduled CI job that opens a draft upgrade PR with the pin bumped and the report attached; the rollback rule (revert the pin if any budget regresses beyond tolerance) and where the outcome is recorded.
**Out:** OS/browser/target-SDK readiness on pre-release platform builds ([SN-GPRF-018](compat.md#sn-gprf-018)); package dependency policy ([SN-FND-020](devx.md#sn-fnd-020), [SN-CI-011](ci-cd.md#sn-ci-011)); native vendored component advisories ([SN-GOPS-013](security.md#sn-gops-013)).

#### Acceptance criteria
- [ ] The playbook states the channel, the version window, the cadence and the freeze rule, and is linked from CLAUDE.md and `docs/README.md`.
- [ ] A scheduled job opens a draft PR bumping the fvm/mise pin, running the full matrix and attaching the perf and golden diff report.
- [ ] The golden re-baseline rule is enforced in review: a PR that updates goldens without a per-image justification is blocked.
- [ ] An upgrade that regresses any decision-7 budget beyond tolerance is reverted and the finding recorded, not merged with a waiver.
- [ ] The playbook names the same checks for AGP/Gradle/Kotlin and Xcode/Swift bumps, including the 16 KB page-alignment gate ([SN-AND-021](compat.md#sn-and-021)).
- [ ] Each completed upgrade is recorded (version, date, notable changes, budget deltas) in the changelog or an ADR when behaviour changed.

#### Technical notes
Run the upgrade job on a schedule, not on every stable release announcement, and let it fail loudly: a red draft PR is the signal. Keep the pin in one place ([SN-FND-010](devx.md#sn-fnd-010)) so the bot edits a single file. Perf comparison must use the physical device runner ([SN-GPRF-013](perf.md#sn-gprf-013)) with the statistical protocol ([SN-GPRF-012](perf.md#sn-gprf-012)) — a CI emulator number cannot decide a latency regression. Expect plugin breakage first: the federated plugins ([SN-FND-007](devx.md#sn-fnd-007)) and pdfrx/drift/riverpod are the usual suspects.

#### Security & privacy
Toolchain currency is a supply-chain control (SSDF PW.6 secure build configuration, OWASP-A06 vulnerable and outdated components, CWE-1104): unpatched Dart/Flutter or an old Gradle/AGP ships known vulnerabilities and can block a store submission. The upgrade PR must keep the SHA-pinned actions and pinned toolchain model intact ([SN-CI-005](ci-cd.md#sn-ci-005)), and any new transitive dependency it drags in is subject to the dependency gates ([SN-CI-010](ci-cd.md#sn-ci-010)) and the licence gate ([SN-GOPS-004](release.md#sn-gops-004)).

#### UX notes
Developer-facing. The draft PR body is the surface: a fixed template with the version delta, the budget table (before/after/tolerance), the golden diff count and the smoke-test matrix, so the reviewer decides in one screen.

#### Test plan
Dry run on the current stable: open the upgrade PR manually, confirm the report renders, confirm a deliberately injected golden change is flagged, and confirm a simulated 20% latency regression trips the revert rule. Verify the freeze rule by attempting the job during a release-train tag and confirming it defers.

#### Dependencies
[SN-FND-010](devx.md#sn-fnd-010) (toolchain pin), [SN-PERF-003](perf.md#sn-perf-003) (perf gates and baselines), [SN-QA-005](qa.md#sn-qa-005) (golden harness).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] First scheduled upgrade cycle executed end to end and recorded


---

