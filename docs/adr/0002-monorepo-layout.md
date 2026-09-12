# ADR-0002 — Monorepo layout and package boundaries

## Status

**Accepted** (M0 Foundations). Locked decision (project decision 2). Related:
[ADR-0001](0001-flutter-single-codebase.md),
[ADR-0003](0003-state-management-and-app-structure.md),
[ADR-0012](0012-native-plugin-strategy.md),
[`docs/architecture/overview.md`](../architecture/overview.md) (§4–§5 carry the canonical
tree and dependency DAG).

## Context

Sane Notes is one Flutter app ([ADR-0001](0001-flutter-single-codebase.md)) with a lot of
shared, testable domain logic (document model, CRDT, ink, crypto, sync, search, ML adapters)
and a thin native plugin layer. We need:

- **Enforced separation** between UI, domain logic, and native bridges, so pure logic is
  testable without a widget harness and portable to a future Rust core.
- **Atomic cross-cutting changes** — a document-model change plus its migration plus its UI
  plus its tests should land in **one PR**, not be split across repos with version-bump
  choreography.
- **One SBOM, one dependency scan, one CODEOWNERS, one CI** — the DevSecOps pipeline
  (decision 8) is far cheaper to run over a single repo.
- **A dependency graph that cannot silently rot** — layering violations must fail CI, not
  survive to review.
- **Agent-friendliness** — an agent should locate the one place a concern lives from the
  folder name alone.

The counter-pressures: a big monorepo can slow CI and blur ownership. We accept those in
exchange for atomic changes and unified security tooling, and mitigate CI cost with
change-scoped test selection.

## Decision

**Use a single Git repository (`swiftsaneai/sanenotes`) as a Dart/Flutter workspace with the
folder structure from the locked decision.** Canonical tree and one-line purposes are in
[overview §4](../architecture/overview.md#4-monorepo-layout). Summary:

- **`app/`** — the Flutter app; single codebase, adaptive layouts; the composition root.
- **`packages/`** — 12 `sane_*` libraries (`sane_core`, `sane_ink`, `sane_render`,
  `sane_brushes`, `sane_sync`, `sane_crypto`, `sane_pdf`, `sane_audio`, `sane_search`,
  `sane_ml`, `sane_ui`, `sane_billing`). Pure-Dart unless they must paint.
- **`plugins/`** — federated Flutter plugins (Dart platform-interface + Swift/Kotlin/web-JS).
- **`services/`** — optional, minimal, stateless (`entitlements/`, `relay/`); **never store
  note content**.
- **`website/`**, **`tools/`** (perf harness, device lab, scripts), **`docs/`**, **`design/`**,
  **`issues/`**.

**Workspace tooling:** use **Dart 3 `pub workspaces`** (native workspace resolution, a single
lockfile) as the base, with **Melos** for multi-package orchestration (bootstrap, run scripts
across packages, versioning, changelogs) — *verify* current Melos/pub-workspace interop at
implementation time and pick the combination that gives one lockfile + one `melos run test`.
Path dependencies between local packages (`sane_ink` → `sane_core`) resolve inside the
workspace; no package is published to pub.dev.

**Dependency rules are normative and enforced** — the full DAG and the eight rules are in
[overview §5](../architecture/overview.md#5-package-dependency-rules-what-may-import-what).
The essentials:

1. Nothing imports `app/`.
2. `sane_core` may import only `sane_crypto`; it is the model root.
3. `sane_crypto` imports nothing internal (lowest layer).
4. Ink stack layers up: `sane_ink → core`; `sane_brushes → ink`; `sane_render → brushes, ink,
   core`.
5. Feature packages depend on `sane_core` (sync also on `sane_crypto`) and **not on each
   other** — cross-feature wiring lives in `app/`.
6. `sane_ui` is a pure leaf (no internal deps).
7. `plugins/*` are leaves; consumers depend on the plugin's platform-interface only.
8. Only `sane_core`'s repository interfaces touch SQL/filesystem.

Pure-Dart packages MUST NOT depend on `package:flutter`.

## Alternatives considered

| Option | Atomic cross-cutting changes | Enforced layering | CI/SBOM cost | Ownership clarity | Verdict |
|---|---|---|---|---|---|
| **Monorepo + pub workspaces + Melos (chosen)** | Yes — one PR spans model+UI+tests | Strong — arch-lint over one graph | Low per-tool (one scan/SBOM); needs change-scoped test selection | Good — CODEOWNERS per path | **Chosen** — atomicity + one DevSecOps pass outweigh CI-scale cost |
| Polyrepo (one repo per package) | No — version-bump choreography across repos | Enforced by publish boundaries but slow to change | High — N pipelines, N SBOMs, N scans | Very clear | Rejected — kills atomic changes; multiplies security tooling; wrong for one team |
| Single mega-package (`app/` only, folders not packages) | Yes | **None** — folders don't stop imports; logic bleeds into UI | Lowest | Poor | Rejected — no way to keep pure logic Flutter-free or enforce the DAG |
| Monorepo with only Melos (no pub workspace) | Yes | Strong | Slightly higher (per-package lockfiles) | Good | Viable fallback if pub-workspace interop is rough at build time |
| Monorepo with a Bazel/Nx-style build graph | Yes | Strong | High setup cost; not idiomatic for Dart | Good | Rejected — over-engineered for a Dart/Flutter shop; poor Flutter ergonomics |

## Consequences

**Positive**

- Model + migration + UI + tests land atomically in one reviewable PR.
- One SBOM, one OSV/Semgrep/gitleaks pass, one CODEOWNERS, one CI config.
- Pure-Dart packages stay Flutter-free and unit-testable → fast tests, portable core.
- The dependency DAG is machine-checkable; a violation fails CI before review.
- Folder names map 1:1 to concerns — an agent finds "where crypto lives" instantly.

**Negative**

- Full-repo CI is slower as the tree grows → mitigate with **change-scoped test/build
  selection** (Melos `--diff`/affected-package detection) so a PR only builds/tests what it
  touches, plus the perf gate when the draw path changes.
- One repo means broad read access; sensitive service code (`services/`) shares the tree →
  mitigate with CODEOWNERS + branch protection, and keep secrets out of the repo entirely
  (decision 8).
- Everyone shares one dependency set/lockfile → a risky transitive bump affects all → gate
  bumps behind integration tests; pin versions; Renovate with required checks.

## Security impact

- **Single SBOM per release** across app + packages + plugins + services (decision 8; SLSA L3
  target) — one artifact to sign and attest, simpler provenance.
- **Unified supply-chain scanning:** OSV-Scanner over the one `pubspec.lock`; gitleaks over
  the whole tree; Semgrep (custom Dart rules) repo-wide; CodeQL over Swift/Kotlin/JS.
- **CODEOWNERS enforces review** on security-critical paths (`packages/sane_crypto/`,
  `packages/sane_sync/`, `services/`, `.github/workflows/`) — no unreviewed change to crypto
  or the pipeline.
- **The dependency DAG is itself a security control:** `sane_crypto` cannot import UI or
  network code, so key material cannot accidentally flow into a widget or a log; `sane_ui`
  cannot import the model, so the design system can't leak note content. Arch-lint protects
  these boundaries.
- **`services/` isolation:** the layout makes it structurally obvious that services are
  stateless and ciphertext-only; any PR adding note-content storage to `services/` is a
  visible, reviewable red flag.

## How to verify

1. **`melos bootstrap` (or `dart pub get` at the workspace root) resolves** with a single
   lockfile and all local path deps linked.
2. **Arch-lint passes:** `tools/scripts/arch_check` parses every `pubspec.yaml`, fails on any
   dependency edge not in the allowed DAG (overview §5), and fails if a pure-Dart package
   declares `package:flutter`. This runs in CI on every PR.
3. **`melos run test` (or the workspace test task) runs all package tests**; change-scoped
   selection runs only affected packages on PRs.
4. **CODEOWNERS covers** `sane_crypto`, `sane_sync`, `services/`, and `.github/workflows/`;
   branch protection requires their owners' review.
5. **One SBOM is produced** by the release workflow spanning all packages/plugins/services.
6. **A pure-Dart package builds and tests with `dart test` (not `flutter test`)** — proves it
   has no Flutter dependency.
