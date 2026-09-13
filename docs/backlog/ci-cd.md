# Backlog — area: ci-cd

31 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-CI-001](ci-cd.md#sn-ci-001) **Establish the DevSecOps and supply-chain security pipeline** (epic · M0 Foundations)
  - [SN-CI-002](ci-cd.md#sn-ci-002) **Add CodeQL analysis for Swift, Kotlin and JavaScript/TypeScript** · p1 · security · M · M0 Foundations
  - [SN-CI-003](ci-cd.md#sn-ci-003) **Configure branch protection, required checks and signed commits** · p1 · security · M · M0 Foundations
  - [SN-CI-004](ci-cd.md#sn-ci-004) **Generate CycloneDX+SPDX SBOMs and SLSA provenance for releases** · p1 · security · L · M8 Launch & Growth
  - [SN-CI-005](ci-cd.md#sn-ci-005) **Pin every GitHub Action to a full commit SHA** · p1 · security · S · M0 Foundations
  - [SN-CI-006](ci-cd.md#sn-ci-006) **Add trufflehog secret scan and enable push protection** · p1 · security · S · M0 Foundations
  - [SN-CI-007](ci-cd.md#sn-ci-007) **Author a custom Flutter/Dart Semgrep SAST ruleset** · p1 · security · M · M0 Foundations
  - [SN-CI-008](ci-cd.md#sn-ci-008) **Add mobsfscan mobile-source SAST job** · p2 · security · S · M1 Ink Editor Alpha
  - [SN-CI-009](ci-cd.md#sn-ci-009) **Enforce least-privilege GITHUB_TOKEN and per-job permissions** · p1 · security · S · M0 Foundations
  - [SN-CI-010](ci-cd.md#sn-ci-010) **Extend and harden the existing core scanners in devsecops.yml** · p2 · infra · S · M0 Foundations
  - [SN-CI-011](ci-cd.md#sn-ci-011) **Define the Dependabot/Renovate dependency-update policy** · p2 · infra · S · M0 Foundations
  - [SN-CI-012](ci-cd.md#sn-ci-012) **Add ZAP baseline and full active DAST scans for web and relay** · p1 · security · M · M7 Beta Hardening & Security Audit
  - [SN-CI-013](ci-cd.md#sn-ci-013) **Run MobSF static analysis on release-candidate builds** · p1 · security · M · M7 Beta Hardening & Security Audit
  - [SN-CI-014](ci-cd.md#sn-ci-014) **Implement signed, notarized releases (Play + Apple)** · p1 · security · L · M8 Launch & Growth
    - [SN-CI-022](ci-cd.md#sn-ci-022) **Wire Android Play App Signing via upload key and OIDC** · p1 · infra · M · M8 Launch & Growth
    - [SN-CI-023](ci-cd.md#sn-ci-023) **Wire Apple App Store signing and notarytool notarization** · p1 · infra · M · M8 Launch & Growth
  - [SN-CI-015](ci-cd.md#sn-ci-015) **Establish reproducible-ish builds with pinned toolchain and obfuscation** · p2 · infra · M · M8 Launch & Growth
  - [SN-CI-018](ci-cd.md#sn-ci-018) **Build a DevSecOps CI pipeline for services/ (relay + entitlements)** · p2 · infra · M · M6 Collaboration, Sharing & Sage AI
  - [SN-CI-019](ci-cd.md#sn-ci-019) **Build a security dashboard aggregating Code Scanning and Scorecard** · p3 · infra · S · M7 Beta Hardening & Security Audit
  - [SN-GSEC-006](security.md#sn-gsec-006) **Wire security alerting and monitoring for scanner and dependency findings** · p2 · security · M · M7 Beta Hardening & Security Audit
  - [SN-GOPS-013](security.md#sn-gops-013) **Watch upstream advisories for vendored native and WASM components** · p1 · security · M · M7 Beta Hardening & Security Audit

---

## Issues

### SN-AND-022

<a id="sn-and-022"></a>

**Configure Android build: minSdk 29, target SDK 36, ABI splits & App Bundle**

| Field | Value |
|---|---|
| GitHub | #75 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | android-tablet, android-phone |
| Areas | ci-cd, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-1` |
| Extra labels | agent-ready |

#### Context
The Android build must pin the supported matrix: minSdk = 29 (Android 10, the front-buffer + Impeller-Vulkan floor), targetSdk = 36 (Android 16, or Play's current requirement at ship time), ABIs arm64-v8a/armeabi-v7a/x86_64, shipped as an App Bundle with per-ABI/-density/-language splits (docs/platform/android.md §1, §9, compat matrix §3). This foundational config is a prerequisite for the 16 KB audit ([SN-AND-021](compat.md#sn-and-021)), Play readiness ([SN-AND-026](release.md#sn-and-026)) and the API-36 behaviour work, and must compose with the build flavours from SN-FND-005.

#### Scope
**In:** Gradle config for minSdk 29 / targetSdk 36 / compileSdk; the three ABIs; AAB output with per-ABI splits; alignment with the dev/beta/release flavours (SN-FND-005) and --dart-define matrix; ensuring arm64-v8a is the perf-enforced primary and armeabi-v7a is Tier-3 best-effort.
**Out:** the 16 KB alignment gate ([SN-AND-021](compat.md#sn-and-021)); ProGuard/R8 rules ([SN-AND-028](security.md#sn-and-028)); signing keys / store upload ([SN-AND-026](release.md#sn-and-026)).

#### Acceptance criteria
- [ ] minSdk = 29, targetSdk = 36 (or Play's current window at ship time), compileSdk current; the app installs on Android 10 and runs on Android 16.
- [ ] The build outputs an AAB with per-ABI splits for arm64-v8a, armeabi-v7a and x86_64; installing on a 32-bit device delivers only the v7a slice.
- [ ] Build flavours dev/beta/release (SN-FND-005) each produce a correct AAB; the release flavour cannot enable the dev auth bypass (compile-time guard, CLAUDE.md §7.5).
- [ ] Orientation is not locked and no restricted-resizability opt-out is declared (API 36 forced resizability, docs/platform/android.md §7).
- [ ] CI builds all three ABIs and fails on any ABI-specific compile error.

#### Technical notes
Gradle (app/android/app/build.gradle): defaultConfig minSdk 29, targetSdk 36; splits.abi for arm64-v8a/armeabi-v7a/x86_64; bundle config; productFlavors mapped to SN-FND-005; --dart-define matrix (SN-FND-005). arm64-v8a is the primary 64-bit perf target (compat matrix §3). docs/platform/android.md §1, §9.

#### Security & privacy
Targeting the current SDK keeps platform hardening current (MASVS-PLATFORM-1); the release flavour compile-time-strips the dev auth bypass (CLAUDE.md §7.5). No secrets in Gradle/config (CLAUDE.md §7.2). The ABI/AAB inventory feeds the SBOM (MASVS-CODE-1).

#### UX notes
Users on Android 10 through 16, on 32- and 64-bit devices, all get an install tailored to their device (smaller download via splits). No orientation lock means the app fills any window on tablets and foldables (docs/platform/android.md §7).

#### Test plan
A CI matrix build across the three ABIs; app/test/build/flavour_config_test.dart or a CI assertion that release cannot enable SANE_AUTH_BYPASS; a smoke install on Android 10 and Android 16 devices (compat matrix Android-lowend and Android-A16 slots).

#### Dependencies
SN-FND-002 (monorepo/app scaffold), SN-FND-005 (build flavours & --dart-define matrix).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-BTY-046

<a id="sn-bty-046"></a>

**Gate beautification quality in CI so a model change cannot make output worse**

| Field | Value |
|---|---|
| GitHub | #1190 |
| Type | infra |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ci-cd, qa, ocr-hwr |
| Size | M |
| SDLC | verification |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-045](qa.md#sn-bty-045), [SN-PERF-003](perf.md#sn-perf-003) |
| Security controls | `SLSA-L3` |
| Extra labels | agent-ready |

#### Context
Beautification quality is the kind of property that degrades invisibly: someone swaps a model version, retunes a smoothing constant to fix one complaint, or changes a preset ladder, and handwriting quietly gets worse for thousands of users with nothing failing. The metrics of [SN-BTY-045](qa.md#sn-bty-045) and the adversarial budget of [SN-BTY-038](ocr-hwr.md#sn-bty-038) only protect us if a machine enforces them on every change, with committed baselines that cannot move without a human saying why.

This mirrors the perf-gate discipline already established in [SN-PERF-003](perf.md#sn-perf-003) (baselines, regression alerts, three cadences) — same shape, different axis.

#### Scope
**In:** the `beautify-quality` CI job; path triggers; the committed baseline file and its tolerance bands; failure thresholds; the baseline-update review rule; artifacts and the job summary; flakiness control.
**Out:** the metrics ([SN-BTY-045](qa.md#sn-bty-045)); the corpora ([SN-BTY-044](qa.md#sn-bty-044), [SN-BTY-038](ocr-hwr.md#sn-bty-038)); model distribution ([SN-BTY-048](ocr-hwr.md#sn-bty-048)).

#### Acceptance criteria
- [ ] A `beautify-quality` job runs on **every PR** touching `packages/sane_ml/**/beautify/**`, `packages/sane_ink/**/beautify/**`, the preset/profile files, the metric code, or any model or parameter manifest; it runs the PR-scope corpus subset in **≤ 8 minutes**.
- [ ] A nightly job runs the full corpus plus the real on-device adapters in the device lab ([SN-QA-009](qa.md#sn-qa-009)/[SN-PERF-004](perf.md#sn-perf-004)), and a release-candidate job runs it across the Tier 1 device set.
- [ ] The job **fails** when any of: WER-after regresses > 0.5 points on any band; composite legibility drops > 2 % versus baseline; ink preservation (M6) drops > 1 %; style similarity ([SN-BTY-047](ocr-hwr.md#sn-bty-047)) falls below its floor; once [SN-BTY-038](ocr-hwr.md#sn-bty-038) has landed, the do-not-correct false-positive rate exceeds its budget; or per-word cost exceeds the documented budget by > 20 %.
- [ ] Baselines live in a committed, machine-readable file with per-metric, per-band values, the corpus version, the metric-composite version and the model version; a baseline change is a **separate, explicitly labelled commit** requiring CODEOWNERS review and a written justification in the PR body.
- [ ] Determinism: three consecutive runs on the same commit produce byte-identical reports; the job is seeded and hermetic (no network in the PR-scope run) and is not permitted in the flaky-test quarantine ([SN-QA-008](qa.md#sn-qa-008)).
- [ ] Artifacts uploaded on every run: `beautify_quality_report.json`, the Markdown summary, and PNG before/after renders of the 10 worst regressions, so a reviewer can see the damage rather than read a number.
- [ ] The job summary shows a per-metric delta table with pass/fail and links to the worst cases.
- [ ] A documented local command reproduces the PR-scope run exactly (`dart run tools/eval/bin/beautify_quality.dart --scope=pr`).

#### Technical notes
Add the job to `.github/workflows/devsecops.yml` (or a sibling `quality.yml` if runtime warrants), following the existing gate conventions and the budget-registry pattern of [SN-PERF-018](perf.md#sn-perf-018) — put thresholds in the registry, not in YAML. Runner entrypoint `tools/eval/bin/beautify_quality.dart` reuses the loader from [SN-BTY-044](qa.md#sn-bty-044) and the metrics from [SN-BTY-045](qa.md#sn-bty-045). Cache the corpus by content hash to keep the 8-minute budget. Report comparison uses the committed baseline file; on failure, exit non-zero with a table on stderr naming the metric, band, baseline, actual and delta.

#### Security & privacy
Supply-chain hygiene: pin action versions by SHA, verify corpus hashes before use, and forbid network egress in the PR-scope job so a fixture fetch cannot become an exfiltration path (SLSA L3 target, decision 8). Artifacts contain corpus-derived images only — never user content. No secrets are needed; the job must fail if one is configured.

#### UX notes
None beyond baseline (CI). Indirect user impact: this gate is what lets us promise in the accessibility statement ([SN-A11Y-018](a11y.md#sn-a11y-018)) that beautification quality is measured and cannot silently regress.

#### Test plan
A self-test of the runner (`tools/eval/test/beautify_quality_cli_test.dart`) covering: pass, fail-on-regression, fail-on-missing-baseline, deterministic output, and correct exit codes; a workflow-lint check that the job is wired to the documented paths; a deliberate canary commit in CI docs describing how to verify the gate actually fails (injected regression).

#### Dependencies
SN-BTY-045 (metrics and report), SN-PERF-003 (CI gate conventions and baseline tooling). The do-not-correct budget of [SN-BTY-038](ocr-hwr.md#sn-bty-038) plugs into the same gate when the spelling path lands in M6.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/security/devsecops-pipeline.md, docs/platform/performance-budgets.md)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, recognised text, style features or ink coordinates in logs

---

### SN-CI-001

<a id="sn-ci-001"></a>

**Establish the DevSecOps and supply-chain security pipeline**

| Field | Value |
|---|---|
| GitHub | #9 |
| Type | epic |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, security |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `MASVS-CODE-3`, `MASVS-RESILIENCE-2`, `OWASP-A03`, `OWASP-A05`, `OWASP-A06`, `OWASP-A08`, `SSDF-PW.7`, `SSDF-PS.1`, `SSDF-PS.2`, `SLSA-L3` |
| Extra labels | agent-ready, innovation |

#### Context
Sane Notes is pen-first and privacy-first, and locked decision 8 (`CLAUDE.md` §2) commits the project to OWASP MASVS 2.x L2+R, ASVS 5.0 L2, NIST SSDF, an SLSA L3 target, an SBOM per release, and a DevSecOps CI that enforces the secure SDLC. Two workflows already exist — `.github/workflows/devsecops.yml` (gitleaks, Semgrep, OSV-Scanner, dependency-review, Trivy, actionlint, issues-schema) and `.github/workflows/scorecard.yml` (OpenSSF Scorecard) — but `docs/security/devsecops-pipeline.md` §2 lists a large "still to add" backlog (CodeQL, mobsfscan, MobSF, ZAP, SBOM+SLSA, signing, blocking-gate rollout) and §3 lists branch-protection/signed-commit settings that are not yet configured. This epic tracks completing that pipeline so the M0 exit criterion "DevSecOps pipeline runs on PRs" (roadmap M0) and the standing per-milestone security gates in `docs/security/ssdlc-process.md` §2 are met and stay green.

The pipeline is the enforcement layer for `docs/security/secure-coding-checklist.md` (the three gate rules: no secrets, no PII in logs, no boundary violations), `docs/security/ssdlc-process.md` phase gates, and `docs/security/controls-matrix.md` (§8 supply chain, §6 SSDF mapping). It is also the concrete answer to OWASP Top 10 2025 A03 "Software Supply Chain Failures" (`controls-matrix.md` §4b). Everything else in the repo depends on a trustworthy, reproducible, tamper-evident build.

#### Scope
**In:** completing and hardening the CI/CD security pipeline: additional SAST (CodeQL, custom Flutter/Dart Semgrep, mobsfscan), stronger secret scanning (trufflehog + push protection), supply-chain integrity (SHA-pinned actions, license policy, Dependabot/Renovate policy, SBOM, SLSA provenance), DAST (ZAP) and mobile-binary analysis (MobSF), repository governance (branch protection, required checks, signed commits, least-privilege tokens), release signing (Play App Signing, Apple notarization), reproducible-ish builds, a security dashboard, and a DevSecOps pipeline for `services/`.
**Out:** the Flutter analyze/test/arch-lint job ([SN-FND-003](ci-cd.md#sn-fnd-003)), build flavours/matrix ([SN-FND-005](devx.md#sn-fnd-005)), perf gates ([SN-PERF-003](perf.md#sn-perf-003)), parser fuzzing (owned by [SN-QA-001](qa.md#sn-qa-001)), the threat model itself ([SN-SEC-002](security.md#sn-sec-002)), and any product/application code.

#### Acceptance criteria
- [ ] Every child issue below is closed and its CI job is live in `.github/workflows/` or its setting is applied in repo/branch protection.
- [ ] `docs/security/devsecops-pipeline.md` §2 "Pipeline coverage at a glance" table shows no remaining "to add" row, and §8 "a check failed" table is current.
- [ ] OpenSSF Scorecard scores ≥ 7.0 overall with Branch-Protection, Pinned-Dependencies, Token-Permissions, Signed-Releases and Dangerous-Workflow all passing.
- [ ] All security-critical checks are blocking on `main` per the `devsecops-pipeline.md` §4 rollout order; noisy scanners still upload SARIF to Code Scanning.
- [ ] No `continue-on-error`/`|| true` remains on a security-critical gate once its baseline is triaged.

#### Technical notes
Workflows live in `.github/workflows/`. Blueprint: `docs/research/sources/security-standards-and-devsecops.md` §6 (pipeline blueprint) and §7 (CI hardening). Enforcement mapping: `docs/security/ssdlc-process.md` §2 (phase gates) and §5 (DoD); control mapping: `docs/security/controls-matrix.md` §6 (SSDF) and §8 (supply chain). There is no dedicated PRD requirement — DevSecOps is a locked-decision-8 + roadmap standing gate, not a product feature, so no `PRD-*` ID is cited (noted here per the "if a doc is silent, decide sensibly" rule).

#### Security & privacy
Threats: supply-chain implant (TM-T-05, Mobile M2), leaked secrets (TM-I-05, Mobile M1), tampered release (MASVS-RESILIENCE-2), unreviewed/unsafe code merged to `main`. Controls: SSDF PO.3/PO.4/PS.1/PS.2/PW.7, MASVS-CODE-2/CODE-3, MASVS-RESILIENCE-2, OWASP-A05/A06/A08 (2021) and A02/A03/A08 (2025). Baseline: no secrets in any workflow or log; least-privilege `GITHUB_TOKEN`; untrusted PR code never runs under a privileged token.

#### UX notes
No end-user UI. Developer-facing surfaces: PR status checks, the GitHub Security → Code Scanning tab (SARIF), the dependency-review PR comment, and the Scorecard badge in `README.md`. Keep the `devsecops-pipeline.md` §8 troubleshooting table current so a failing check is self-service to fix.

#### Test plan
Meta-level: each child issue carries its own test/verification. For the epic, verify by running each new workflow on a throwaway PR and confirming SARIF appears in Code Scanning; run `node scripts/validate-issues.mjs` to confirm the backlog stays schema-valid.

#### Dependencies
SequId after [SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold) so scanners have code to scan; coordinates with [SN-FND-003](ci-cd.md#sn-fnd-003) (analyze/test job), [SN-FND-005](devx.md#sn-fnd-005) (build flavours), [SN-SEC-001](security.md#sn-sec-001) (security engineering), [SN-PRV-001](privacy.md#sn-prv-001) (privacy), [SN-REL-001](release.md#sn-rel-001) (release engineering). Children: [SN-CI-002](ci-cd.md#sn-ci-002) [SN-CI-003](ci-cd.md#sn-ci-003) [SN-CI-004](ci-cd.md#sn-ci-004) [SN-CI-005](ci-cd.md#sn-ci-005) [SN-CI-006](ci-cd.md#sn-ci-006) [SN-CI-007](ci-cd.md#sn-ci-007) [SN-CI-008](ci-cd.md#sn-ci-008) [SN-CI-009](ci-cd.md#sn-ci-009) [SN-CI-010](ci-cd.md#sn-ci-010) [SN-CI-011](ci-cd.md#sn-ci-011) [SN-CI-012](ci-cd.md#sn-ci-012) [SN-CI-013](ci-cd.md#sn-ci-013) [SN-CI-014](ci-cd.md#sn-ci-014) [SN-CI-015](ci-cd.md#sn-ci-015) [SN-CI-018](ci-cd.md#sn-ci-018) [SN-CI-019](ci-cd.md#sn-ci-019) [SN-CI-022](ci-cd.md#sn-ci-022) [SN-CI-023](ci-cd.md#sn-ci-023).

### Children checklist
- [ ] [SN-CI-002](ci-cd.md#sn-ci-002) CodeQL for Swift/Kotlin/JS-TS
- [ ] [SN-CI-003](ci-cd.md#sn-ci-003) Branch protection, required checks & signed commits
- [ ] [SN-CI-004](ci-cd.md#sn-ci-004) SBOM (CycloneDX+SPDX) + SLSA provenance
- [ ] [SN-CI-005](ci-cd.md#sn-ci-005) Pin every Action to a full commit SHA
- [ ] [SN-CI-006](ci-cd.md#sn-ci-006) trufflehog second-pass + secret-scanning push protection
- [ ] [SN-CI-007](ci-cd.md#sn-ci-007) Custom Flutter/Dart Semgrep ruleset
- [ ] [SN-CI-008](ci-cd.md#sn-ci-008) mobsfscan mobile-source SAST
- [ ] [SN-CI-009](ci-cd.md#sn-ci-009) Least-privilege GITHUB_TOKEN & per-job permissions
- [ ] [SN-CI-010](ci-cd.md#sn-ci-010) Extend/harden core scanners (license policy, Trivy gating)
- [ ] [SN-CI-011](ci-cd.md#sn-ci-011) Dependabot/Renovate dependency-update policy
- [ ] [SN-CI-012](ci-cd.md#sn-ci-012) ZAP baseline + full DAST
- [ ] [SN-CI-013](ci-cd.md#sn-ci-013) MobSF on release-candidate builds
- [ ] [SN-CI-014](ci-cd.md#sn-ci-014) Release signing (Play App Signing + Apple notarization)
- [ ] [SN-CI-015](ci-cd.md#sn-ci-015) Reproducible-ish builds + obfuscation
- [ ] [SN-CI-018](ci-cd.md#sn-ci-018) DevSecOps CI pipeline for services/
- [ ] [SN-CI-019](ci-cd.md#sn-ci-019) Security dashboard (Code Scanning + Scorecard)
- [ ] [SN-CI-022](ci-cd.md#sn-ci-022) Android Play App Signing via OIDC
- [ ] [SN-CI-023](ci-cd.md#sn-ci-023) Apple App Store signing + notarization

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-002

<a id="sn-ci-002"></a>

**Add CodeQL analysis for Swift, Kotlin and JavaScript/TypeScript**

| Field | Value |
|---|---|
| GitHub | #162 |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `SSDF-PW.7`, `MASVS-CODE-3`, `OWASP-A03`, `OWASP-A08`, `CWE-89`, `CWE-79`, `CWE-259` |
| Extra labels | agent-ready |

#### Context
`docs/security/devsecops-pipeline.md` §2.2 requires a CodeQL job to deepen SAST beyond Semgrep for the native (Swift/Kotlin) and web (JS/TS) code. Semgrep is the only SAST that covers Dart (§1.2), but CodeQL is the stronger dataflow engine for the languages it supports; the controls matrix marks CodeQL "planned" under PW.7 (`docs/security/controls-matrix.md` §6). This closes a known M0 gap so injection, hardcoded-credential, and unsafe-deserialization classes in the Swift plugins, Kotlin plugins, and `website/`/`scripts/` JS are caught automatically. Without it the native low-latency ink plugins (`plugins/sane_ink_surface`, `sane_stylus`, `sane_secure_store`) ship with only mobsfscan/Semgrep coverage.

#### Scope
**In:** a `codeql.yml` (or a job in `devsecops.yml`) with a language matrix — `swift` and `java-kotlin` on a macOS runner, `javascript-typescript` on ubuntu — using `github/codeql-action` init/analyze, `security-extended` query suite, SARIF uploaded to Code Scanning; PR + push + weekly cron triggers.
**Out:** Dart (unsupported by CodeQL — covered by Semgrep [SN-CI-007](ci-cd.md#sn-ci-007)); mobsfscan ([SN-CI-008](ci-cd.md#sn-ci-008)); making it a blocking required check (the blocking-rollout is tracked under [SN-CI-003](ci-cd.md#sn-ci-003)).

#### Acceptance criteria
- [ ] CodeQL runs a build-mode-appropriate analysis for each of swift, java-kotlin, javascript-typescript; Swift/Kotlin jobs run on `macos-latest`, JS on `ubuntu-latest`.
- [ ] Results appear in the Security → Code Scanning tab as CodeQL alerts, deduplicated from Semgrep.
- [ ] The job is skipped cleanly (no red X) for a language whose source does not yet exist, via `paths`/matrix guards, so it does not block pre-native-code PRs.
- [ ] `permissions` are `security-events: write` + `contents: read` only, and actions are SHA-pinned.
- [ ] Weekly `schedule` run catches drift even with no commits.

#### Technical notes
Use `github/codeql-action/init@<sha>` and `.../analyze@<sha>`. Swift analysis requires macOS (`devsecops-pipeline.md` §2.2). For autobuild-incompatible native code, set `build-mode: manual` and invoke the plugin build. Reference blueprint `docs/research/sources/security-standards-and-devsecops.md` §6.1. Language targets align with the package DAG (`CLAUDE.md` §3): Swift/Kotlin live under `plugins/*/{ios,android}`, JS under `website/` and `scripts/`. Keep the `security-extended` suite; add `security-and-quality` only after baseline triage to avoid noise.

#### Security & privacy
Threats: injection (CWE-89/79), hardcoded credentials (CWE-259, Mobile M1), unsafe deserialization (MASVS-CODE-4, CWE-502) in native/web code. Controls: SSDF PW.7, MASVS-CODE-3, OWASP-A03 (injection), A08 (integrity). Baseline: the workflow logs no source contents; least-privilege token; no untrusted PR code built under elevated permissions (use `pull_request` default token scope).

#### UX notes
No end-user UI. Developer surface: CodeQL alerts in the Code Scanning tab with dataflow paths, and the check name `CodeQL / Analyze (swift|java-kotlin|javascript-typescript)` on the PR. Document the new check in `devsecops-pipeline.md` §2.2 and the §8 troubleshooting table.

#### Test plan
Manual: open a PR that adds a deliberately injectable Kotlin/Swift/JS snippet on a throwaway branch and confirm CodeQL flags it, then revert. Verify SARIF upload succeeds (`github/codeql-action/upload-sarif`). Add a CI smoke assertion that the matrix includes all three languages. No unit test file (workflow-only); document the manual verification in the PR.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold so plugin source paths exist). Complements [SN-CI-007](ci-cd.md#sn-ci-007) (Dart/Flutter Semgrep) and [SN-CI-008](ci-cd.md#sn-ci-008) (mobsfscan). Becomes blocking via [SN-CI-003](ci-cd.md#sn-ci-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-003

<a id="sn-ci-003"></a>

**Configure branch protection, required checks and signed commits**

| Field | Value |
|---|---|
| GitHub | #163 |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | `SSDF-PS.1`, `SSDF-PO.4`, `OWASP-A08`, `MASVS-CODE-1`, `CWE-1395` |
| Extra labels | agent-ready |

#### Context
`docs/security/devsecops-pipeline.md` §3 specifies the branch-protection posture for `main` and release branches, and §4 the order in which scanners become blocking. These are the SSDF PS.1 ("protect code from tampering") and PO.4 ("criteria for security checks") controls, and OpenSSF Scorecard's Branch-Protection check verifies them (`controls-matrix.md` §8). The repository currently has CODEOWNERS and workflows but no enforced protection rule, so a malicious or accidental force-push, an unreviewed merge, or an unsigned commit could tamper with the build. This issue applies and documents the settings, wires the required status checks, and enforces signed commits.

#### Scope
**In:** repo/branch-protection configuration for `main` (and the `release/*` pattern): require a PR with ≥1 approving review, dismiss stale approvals, require CODEOWNERS review on the security paths, require the named status checks to pass and the branch to be up to date, require signed commits, require linear history, block force-push and branch deletion, include administrators, restrict pushes to PRs. Capture the config as code where possible (e.g. a `.github/branch-protection.json` doc or a ruleset export) plus the §4 blocking-rollout list. Enable required signed commits and document the developer setup (GPG/SSH or Sigstore gitsign).
**Out:** the analyze/test job itself ([SN-FND-003](ci-cd.md#sn-fnd-003)); the individual scanners (their own issues); Scorecard workflow (already live).

#### Acceptance criteria
- [ ] `main` cannot be pushed to directly; a PR with ≥1 approval and up-to-date required checks is mandatory; administrators are included (no bypass).
- [ ] CODEOWNERS review is enforced for `/docs/security/`, `/.github/`, `/packages/sane_crypto/`, `/packages/sane_sync/`, `/app/lib/auth/` (matches `.github/CODEOWNERS`).
- [ ] Required checks include, as they land: `lint-dart`, `unit-tests`, `dependency-review`, and (post-baseline, per §4 order) `secrets`, `sast`, `codeql`, `mobsfscan`.
- [ ] Signed commits are required on protected branches; an unsigned commit is rejected; the signing setup is documented in `CONTRIBUTING.md`/`devsecops-pipeline.md`.
- [ ] Force-push, branch deletion and non-linear history are blocked; the settings are reproducible from a committed ruleset/doc.

#### Technical notes
Apply via repo Settings → Branches/Rulesets, or `gh api` calls captured in `scripts/`. Follow the §4 rollout: keep noisy scanners as non-blocking SARIF uploads until their baseline is triaged, promote in order (dependency-review → secrets → lint-dart+unit-tests → sast → codeql+mobsfscan → Trivy CRITICAL). Signed commits: SSH signing or Sigstore `gitsign` (keyless, matches SLSA posture); document the git config. Reference `devsecops-pipeline.md` §3/§4 and `docs/research/sources/security-standards-and-devsecops.md` §7. This is the home for the "promote scanners to blocking" governance action.

#### Security & privacy
Threats: source tampering / unauthorized merge (SSDF PS.1, CWE-1395 dependency of trust), CI supply-chain implant via an unreviewed workflow change (Dangerous-Workflow), integrity failure (OWASP-A08). Controls: SSDF PS.1/PO.4, MASVS-CODE-1, Scorecard Branch-Protection/Code-Review/Signed-commits. Baseline: no secrets in config; the ruleset export contains no tokens.

#### UX notes
No end-user UI. Developer surface: PR merge is gated with a clear "required checks" list and a "CODEOWNERS review required" banner; a failed signature shows a "commits must have verified signatures" merge block. Document the one-time signing setup so a new contributor is unblocked in <5 minutes.

#### Test plan
Manual verification recorded in the PR: attempt a direct push to `main` (rejected), open a PR touching `/packages/sane_crypto/` and confirm CODEOWNERS is requested, push an unsigned commit to a protected branch (rejected). Add a `scripts/verify-branch-protection.mjs` that queries `gh api` and asserts the expected settings, runnable in CI as a drift check.

#### Dependencies
[SN-FND-003](ci-cd.md#sn-fnd-003) (the analyze/test checks must exist to be marked required). Governs the blocking-rollout for [SN-CI-002](ci-cd.md#sn-ci-002), [SN-CI-006](ci-cd.md#sn-ci-006), [SN-CI-007](ci-cd.md#sn-ci-007), [SN-CI-008](ci-cd.md#sn-ci-008), [SN-CI-010](ci-cd.md#sn-ci-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-004

<a id="sn-ci-004"></a>

**Generate CycloneDX+SPDX SBOMs and SLSA provenance for releases**

| Field | Value |
|---|---|
| GitHub | #164 |
| Type | security |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | ci-cd, release |
| Size | L |
| SDLC | release |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `SSDF-PS.2`, `SSDF-PS.3`, `OWASP-A08`, `MASVS-CODE-2`, `MASVS-RESILIENCE-2`, `SLSA-L3`, `CWE-1104` |
| Extra labels | agent-ready, innovation |

#### Context
Locked decision 8 (`CLAUDE.md` §2) commits Sane Notes to an SBOM per release and an SLSA L3 target for release artifacts, and `docs/security/controls-matrix.md` §8 makes this the headline answer to OWASP Top 10 2025 A03 "Software Supply Chain Failures". `docs/security/devsecops-pipeline.md` §2.6 and `docs/security/ssdlc-process.md` §2.5 require generating CycloneDX + SPDX SBOMs per artifact (client bundles + the relay image) and emitting signed SLSA provenance, both attached to the GitHub Release. For a consumer note-taking app this level of build transparency is a genuine differentiator (innovation). This lets downstream consumers verify exactly what shipped and that it was built by our pipeline, unmodified.

#### Scope
**In:** a `release.yml` stage (environment-gated) that (1) produces a CycloneDX **and** an SPDX SBOM per built artifact (Flutter app bundles per platform + the `services/relay` image), (2) emits SLSA build provenance via `actions/attest-build-provenance` on hosted runners, (3) attaches all SBOMs and attestations to the GitHub Release, (4) provides a documented `gh attestation verify` / SBOM-diff verification path.
**Out:** the signing/notarization itself ([SN-CI-014](ci-cd.md#sn-ci-014)); reproducible-build determinism ([SN-CI-015](ci-cd.md#sn-ci-015)); Trivy's fs SBOM emit on PRs ([SN-CI-010](ci-cd.md#sn-ci-010)).

#### Acceptance criteria
- [ ] Each release artifact has both a CycloneDX (`*.cdx.json`) and an SPDX (`*.spdx.json`) SBOM listing pub/Gradle/npm/SPM components with versions and licenses.
- [ ] `actions/attest-build-provenance` produces a signed provenance attestation per artifact; `gh attestation verify <artifact> --repo <repo>` succeeds and ties the artifact to the workflow, commit and runner.
- [ ] SBOMs + attestations are uploaded as GitHub Release assets and referenced in the release notes.
- [ ] Provenance meets SLSA L3 expectations (hosted, isolated, non-falsifiable builder; `id-token: write` scoped to the attest job only).
- [ ] A CI verification step re-verifies the attestation before publish and fails the release if verification fails.

#### Technical notes
Generate SBOMs with CycloneDX tooling per ecosystem (e.g. `cyclonedx` pub/Gradle/npm plugins) plus Trivy's SBOM output for the container image (`devsecops-pipeline.md` §1.5/§2.6); convert or generate SPDX in parallel. Provenance: `actions/attest-build-provenance@<sha>` with `id-token: write` + `attestations: write` scoped to the one job. Basis: `docs/research/sources/security-standards-and-devsecops.md` §3.1 (SLSA) and `controls-matrix.md` §8. Runs only in `release.yml` behind the gated `release` environment. No dedicated `PRD-*` ID (release-engineering control, not a product feature).

#### Security & privacy
Threats: tampered/implanted release artifact (OWASP-A08, MASVS-RESILIENCE-2, Mobile M2), dependency confusion / unpinned toolchain (CWE-1104, MASVS-CODE-2). Controls: SSDF PS.2 (verify release integrity), PS.3 (archive/protect), SLSA L3 provenance. Baseline: SBOMs contain no secrets; attestation signing uses keyless OIDC, no long-lived keys; the release environment is gated by required reviewers (`devsecops-pipeline.md` §5).

#### UX notes
No end-user UI. Developer/consumer surface: Release assets list `*.cdx.json`, `*.spdx.json` and `*.intoto.jsonl` attestations; release notes include a copy-paste `gh attestation verify` command. Document the verification flow in `devsecops-pipeline.md` §2.6.

#### Test plan
Manual on a pre-release tag: build, confirm both SBOM formats are attached and parse (`cyclonedx validate`), confirm `gh attestation verify` passes and fails after a byte flip. Add `scripts/verify-provenance.mjs` invoked in the release workflow. Golden: a committed sample SBOM schema check. Record the dry-run in the PR.

#### Dependencies
[SN-FND-005](devx.md#sn-fnd-005) (build flavours/matrix produce the artifacts to attest). Consumes the relay image from [SN-CI-018](ci-cd.md#sn-ci-018); pairs with [SN-CI-014](ci-cd.md#sn-ci-014) (signing) and [SN-CI-015](ci-cd.md#sn-ci-015) (reproducible builds).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-005

<a id="sn-ci-005"></a>

**Pin every GitHub Action to a full commit SHA**

| Field | Value |
|---|---|
| GitHub | #165 |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | — |
| Security controls | `SSDF-PW.6`, `OWASP-A08`, `MASVS-CODE-2`, `CWE-1357`, `CWE-829` |
| Extra labels | agent-ready, good first issue |

#### Context
`docs/security/devsecops-pipeline.md` §0 principle 1 and §5 require pinning actions by full commit SHA; today `devsecops.yml` and `scorecard.yml` pin by mutable tags (`actions/checkout@v4`, `gitleaks/gitleaks-action@v2`, `aquasecurity/trivy-action@0.28.0`, etc.). A moved tag or a compromised action is a direct supply-chain compromise of the build (OWASP-A08 / 2025-A03; OpenSSF Scorecard Pinned-Dependencies). `docs/security/controls-matrix.md` §8 lists "Pinned dependencies & actions" verified by Scorecard. This is a small, high-value, self-contained hardening task — a good first issue.

#### Scope
**In:** replace every `uses: owner/action@tag` in `.github/workflows/*.yml` (and any composite/reusable actions) with `owner/action@<full-40-char-sha>  # tag`, keep the human-readable tag in a trailing comment, and configure Dependabot to keep the SHAs updated.
**Out:** adding new jobs; changing job logic; Renovate config beyond the pin-update grouping (that is [SN-CI-011](ci-cd.md#sn-ci-011)).

#### Acceptance criteria
- [ ] No workflow references an action by a mutable tag or branch; every `uses:` is a 40-hex-char commit SHA with a `# vX.Y.Z` comment.
- [ ] `actionlint` and OpenSSF Scorecard Pinned-Dependencies pass; Scorecard's Pinned-Dependencies score improves to passing.
- [ ] `.github/dependabot.yml` keeps the `github-actions` ecosystem grouped so SHA bumps arrive as reviewable PRs (already grouped — confirm it updates SHAs, not tags).
- [ ] A CI guard (grep/`actionlint` or a small script) fails if any `uses:` is not SHA-pinned.

#### Technical notes
Resolve each tag to its SHA (`gh api /repos/<owner>/<action>/git/ref/tags/<tag>`), pin, comment the tag. Applies to `actions/checkout`, `actions/setup-node`, `gitleaks/gitleaks-action`, `semgrep/semgrep` (container digest, not just tag — pin `semgrep/semgrep@sha256:...`), `google/osv-scanner-action`, `actions/dependency-review-action`, `aquasecurity/trivy-action`, `raven-actions/actionlint`, `github/codeql-action/*`, `ossf/scorecard-action`. Add `scripts/check-action-pins.mjs`. Reference `devsecops-pipeline.md` §0/§5 and `docs/research/sources/security-standards-and-devsecops.md` §7.

#### Security & privacy
Threats: compromised/hijacked action or moved tag executing arbitrary code in CI with repo secrets (OWASP-A08/2025-A03, CWE-829 untrusted functionality, CWE-1357 reliance on un-pinned components, Mobile M2). Controls: SSDF PW.6, MASVS-CODE-2, Scorecard Pinned-Dependencies. Baseline: no secrets exposed; the pin script logs only action names.

#### UX notes
No end-user UI. Developer surface: workflows read as `@<sha>  # v4` so a reviewer still sees the version; the new `check-action-pins` check appears on PRs. None beyond baseline otherwise.

#### Test plan
Run `scripts/check-action-pins.mjs` locally and in CI; assert it fails on an intentionally tag-pinned line and passes once fixed. `actionlint` stays green. Record the before/after in the PR. No app unit test.

#### Dependencies
None (can start immediately). Feeds Scorecard improvements tracked in [SN-CI-019](ci-cd.md#sn-ci-019); Dependabot grouping detailed in [SN-CI-011](ci-cd.md#sn-ci-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-006

<a id="sn-ci-006"></a>

**Add trufflehog secret scan and enable push protection**

| Field | Value |
|---|---|
| GitHub | #166 |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `SSDF-PS.1`, `OWASP-A05`, `CWE-798`, `CWE-259` |
| Extra labels | agent-ready, good first issue |

#### Context
`docs/security/devsecops-pipeline.md` §1.1 and §5 require trufflehog as a second secret-scanning pass (entropy + live-credential verification) alongside the existing gitleaks job, plus GitHub secret-scanning **push protection** to block secrets at commit time. Gate rule §0 of `docs/security/secure-coding-checklist.md` is "no secrets in code/tests/fixtures/committed config" — a hard, never-break rule (`CLAUDE.md` §7.2) because Dart AOT is reversible and a leaked OAuth client secret or signing credential is a Critical incident (`ssdlc-process.md` §3). Defence-in-depth here is cheap and high-value.

#### Scope
**In:** add a `trufflehog` job to `devsecops.yml` (verified secrets over the diff on PRs and full history on cron), enable repository secret-scanning + push protection in settings, document the developer pre-commit hook, and make the `secrets` gate blocking on PRs (per §4 order).
**Out:** gitleaks (already live); the pre-commit framework rollout beyond documenting it; rotating any specific credential.

#### Acceptance criteria
- [ ] A `trufflehog` job runs `trufflehog git` with `--only-verified` on PRs (diff range) and full-history on the weekly cron; findings fail the PR.
- [ ] Secret-scanning and push protection are enabled repo-wide; a test push of a fake-but-well-formed token pattern is blocked at push time.
- [ ] The combined `secrets` gate (gitleaks + trufflehog) is a required, blocking check on `main` (coordinated with [SN-CI-003](ci-cd.md#sn-ci-003)).
- [ ] The pre-commit secret-scan hook is documented in `devsecops-pipeline.md` §5 and `CONTRIBUTING.md`.
- [ ] No secret is ever printed to logs; findings show only the rule id + file + line.

#### Technical notes
Use `trufflesecurity/trufflehog@<sha>` GitHub Action with `extra_args: --only-verified` to cut false positives; scope the git range with `base`/`head` on PRs. Push protection is a repo setting (Settings → Code security). Reference `devsecops-pipeline.md` §1.1/§4/§5 and `docs/research/sources/security-standards-and-devsecops.md` §6.2. Config lives in secrets from `--dart-define`/CI secrets, never committed (`CLAUDE.md` §7.2).

#### Security & privacy
Threats: committed API keys/tokens/private keys (CWE-798 hardcoded credentials, CWE-259, Mobile M1, TM-I-05). Controls: MASVS-CODE-2, SSDF PS.1, OWASP-A05. Baseline: the scanner output redacts the secret value; no PII or content logged; rotate any real credential the scan surfaces (`devsecops-pipeline.md` §6 incident runbook).

#### UX notes
No end-user UI. Developer surface: a blocked push shows GitHub's push-protection dialog with a bypass-requires-reason flow (reserved for the maintainer); the `secrets` PR check turns red with a redacted finding location. Document how to remediate (remove + rotate, never just delete from HEAD — history retains it).

#### Test plan
Manual: push a synthetic verified-looking token to a throwaway branch and confirm push protection blocks it and the PR trufflehog job would fail; confirm no secret text appears in logs. Add a documented negative test in the PR description. No app unit test.

#### Dependencies
None to start; becomes blocking via [SN-CI-003](ci-cd.md#sn-ci-003). Complements gitleaks (already live).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-007

<a id="sn-ci-007"></a>

**Author a custom Flutter/Dart Semgrep SAST ruleset**

| Field | Value |
|---|---|
| GitHub | #167 |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | ci-cd, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-CODE-3`, `MASVS-CODE-4`, `MASVS-CRYPTO-1`, `MASVS-PRIVACY-2`, `OWASP-A02`, `OWASP-A03`, `CWE-327`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
`docs/security/devsecops-pipeline.md` §1.2 notes Semgrep is the only SAST that covers Dart (CodeQL does not), but the current `sast` job only runs the community registry packs (`p/dart`, `p/owasp-top-ten`, etc.). Sane Notes has project-specific never-break rules in `CLAUDE.md` §6/§7 and `docs/security/secure-coding-checklist.md` that generic packs cannot enforce: `print()` is banned, only approved crypto primitives are allowed, no PII/keys/content in logs, no `dart:mirrors`/dynamic code, `Result<T,Failure>` instead of throwing across boundaries, and no `package:flutter` import in pure-Dart packages. A custom Semgrep ruleset makes these grep-able rules first-class CI gates.

#### Scope
**In:** a `tools/semgrep/` (or `.semgrep/`) directory of custom Dart rules covering: banned `print()`/`debugPrint` on hot paths, banned weak crypto (MD5/SHA-1/ECB/static IV/`Random()` for keys — enforce CWE-327/338), banned `dart:mirrors` and dynamic deserialization (MASVS-CODE-4), logging of note content/keys/tokens (CWE-532, MASVS-PRIVACY-2), and `package:flutter` imports inside `sane_*` pure-Dart packages; wire `--config tools/semgrep` into the existing `sast` job.
**Out:** the arch-lint DAG/`print()` binary check ([SN-FND-004](devx.md#sn-fnd-004), which is a Dart analyzer/script pass — Semgrep is the security-focused complement); CodeQL ([SN-CI-002](ci-cd.md#sn-ci-002)); mobsfscan ([SN-CI-008](ci-cd.md#sn-ci-008)).

#### Acceptance criteria
- [ ] ≥ 8 custom Dart rules exist with ids, severities, MASVS/CWE metadata, and `message`s pointing to the checklist section.
- [ ] Each rule has a paired `*.test.dart`-style fixture (Semgrep test) proving it fires on the bad pattern and not on the good one; `semgrep --test` passes in CI.
- [ ] The `sast` job runs the custom config in addition to the registry packs and uploads combined SARIF.
- [ ] A crypto-misuse, a `print()` in a pure-Dart package, and a content-in-log pattern are each caught on a demo PR.
- [ ] False-positive rate on the empty scaffold is zero (no findings on clean code).

#### Technical notes
Author rules in `tools/semgrep/*.yaml` with `languages: [dart]`, `metadata: {masvs, cwe, owasp, checklist}`. Use Semgrep's `--test` harness with inline `# ruleid:`/`# ok:` annotations. Extend the `sast` job in `devsecops.yml` (§1.2). Map rules to `docs/security/secure-coding-checklist.md` §3 (crypto), §7 (logging), and `CLAUDE.md` §6/§7. Basis `docs/research/sources/security-standards-and-devsecops.md` §6.1. Approved primitives to allow-list: XChaCha20-Poly1305/AES-256-GCM, Argon2id, HKDF, Ed25519, SHA-256/BLAKE3 (`CLAUDE.md` §7.7).

#### Security & privacy
Threats: crypto misuse (CWE-327/329/338, MASVS-CRYPTO-1, OWASP-A02), PII/secret in logs (CWE-532, MASVS-PRIVACY-2, TM-I-05), unsafe dynamic loading (MASVS-CODE-4), injection (OWASP-A03). Controls: MASVS-CODE-3/CODE-4, SSDF PW.7. Baseline: rule fixtures contain only synthetic patterns, no real secrets.

#### UX notes
No end-user UI. Developer surface: a Semgrep finding on the PR names the rule id and links the checklist section, so the fix is self-service. Keep messages actionable ("use SaneLog, not print — see checklist §7"). None beyond baseline.

#### Test plan
`tools/semgrep/tests/` fixtures per rule, run via `semgrep --test --config tools/semgrep` in the `sast` job and locally. Add a CI step asserting `semgrep --test` passes. Manual: open a PR with a `Cipher.MD5` misuse and confirm the block. Name files e.g. `tools/semgrep/no_weak_crypto.yaml` + `tools/semgrep/tests/no_weak_crypto.dart`.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (packages exist to scan); complements [SN-FND-004](devx.md#sn-fnd-004) (analyzer arch-lint). Becomes blocking via [SN-CI-003](ci-cd.md#sn-ci-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-008

<a id="sn-ci-008"></a>

**Add mobsfscan mobile-source SAST job**

| Field | Value |
|---|---|
| GitHub | #168 |
| Type | security |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | ci-cd, security |
| Size | S |
| SDLC | verification |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-CODE-3`, `MASVS-PLATFORM-1`, `OWASP-A05`, `CWE-919`, `CWE-295` |
| Extra labels | agent-ready |

#### Context
`docs/security/devsecops-pipeline.md` §2.3 requires a `mobsfscan` job — mobile-focused source SAST over Kotlin/Swift/Java/Obj-C plus `Info.plist`/Android XML, tagged to MASVS / Mobile Top 10 / CWE and uploaded as SARIF. This complements CodeQL ([SN-CI-002](ci-cd.md#sn-ci-002)) and the Dart Semgrep rules ([SN-CI-007](ci-cd.md#sn-ci-007)) by catching mobile-specific misconfigurations (exported components, cleartext traffic, weak TLS/WebView settings, insecure storage APIs) in the native plugins (`plugins/sane_ink_surface`, `sane_stylus`, `sane_secure_store`, `sane_cloud_drive`, `sane_pdfkit`). It is scheduled for M1 because that is when the first native plugin implementations land.

#### Scope
**In:** a `mobsfscan` job (its native GitHub Action) over the `plugins/*/{ios,android}` and `app/{ios,android}` source, MASVS-tagged SARIF → Code Scanning, PR + cron triggers, SHA-pinned.
**Out:** MobSF full binary analysis on the RC build ([SN-CI-013](ci-cd.md#sn-ci-013)); CodeQL native ([SN-CI-002](ci-cd.md#sn-ci-002)); manifest/plist hardening implementation (owned by platform epics [SN-AND-001](compat.md#sn-and-001)/[SN-IPAD-001](input-gestures.md#sn-ipad-001)).

#### Acceptance criteria
- [ ] `mobsfscan` runs on PRs touching native paths and weekly; produces SARIF visible in Code Scanning with MASVS/Mobile-Top-10 tags.
- [ ] It flags a deliberately misconfigured `android:exported="true"` provider or `usesCleartextTraffic="true"` on a demo PR.
- [ ] The job is a no-op (green) when no native source exists yet, and does not block early PRs.
- [ ] `permissions` limited to `security-events: write` + `contents: read`; action SHA-pinned.
- [ ] It is promoted to blocking after baseline triage (per §4, coordinated with [SN-CI-003](ci-cd.md#sn-ci-003)).

#### Technical notes
Use the official `mobsfscan` action (`MobSF/mobsfscan` or the maintained wrapper) with `--sarif`. Scope paths to native code. Reference `devsecops-pipeline.md` §2.3 and `docs/security/controls-matrix.md` §1 MASVS-PLATFORM/STORAGE and §2 (MASTG profile). Findings map to MASVS-PLATFORM-1 (IPC/exported/deeplinks), NETWORK-1/2 (cleartext/pinning), STORAGE-1 (insecure storage). Basis `docs/research/sources/security-standards-and-devsecops.md` §6.1.

#### Security & privacy
Threats: exported-component/deeplink exposure (TM-E-02, MASVS-PLATFORM-1, CWE-919), missing cert validation (CWE-295, MASVS-NETWORK-2), insecure data storage (Mobile M9). Controls: MASVS-CODE-3, MASVS-PLATFORM-1, OWASP-A05. Baseline: no source contents logged; least-privilege token.

#### UX notes
No end-user UI. Developer surface: `mobsfscan` check on PRs and MASVS-tagged alerts in Code Scanning. Document the check in `devsecops-pipeline.md` §2.3 and the §8 table. None beyond baseline.

#### Test plan
Manual: add a misconfigured manifest snippet on a throwaway branch, confirm the finding, revert. Assert SARIF upload. No app unit test (workflow-only); record verification in the PR.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (plugin scaffolds); most valuable once native plugins from [SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007) land. Blocking-rollout via [SN-CI-003](ci-cd.md#sn-ci-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-009

<a id="sn-ci-009"></a>

**Enforce least-privilege GITHUB_TOKEN and per-job permissions**

| Field | Value |
|---|---|
| GitHub | #169 |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | — |
| Security controls | `SSDF-PO.5`, `OWASP-A05`, `MASVS-CODE-1`, `CWE-250`, `CWE-732` |
| Extra labels | agent-ready, good first issue |

#### Context
`docs/security/devsecops-pipeline.md` §0 and §5 require a least-privilege `GITHUB_TOKEN`: `contents: read` at the top of each workflow, with per-job escalation only where strictly needed (as `dependency-review` does with `pull-requests: write`). This maps to OpenSSF Scorecard's Token-Permissions check and SSDF PO.5 ("secure dev environments"). `devsecops.yml` already sets `permissions: contents: read` top-level, but as new jobs are added (CodeQL, mobsfscan, ZAP, attest) each must scope its own permissions and never widen the default. This issue audits and locks that down across all workflows and adds a guard so a future PR cannot silently grant `write-all`.

#### Scope
**In:** audit every workflow so the top-level default is `contents: read`, each job declares the minimal `permissions:` it needs (e.g. `security-events: write` for SARIF, `id-token: write` only on attest/OIDC jobs, `pull-requests: write` only for the dependency-review comment), and add a CI guard (`actionlint` config or a script) that fails on a top-level `write-all` or an over-broad grant.
**Out:** OIDC deploy wiring itself ([SN-CI-018](ci-cd.md#sn-ci-018), [SN-CI-014](ci-cd.md#sn-ci-014)); branch protection ([SN-CI-003](ci-cd.md#sn-ci-003)).

#### Acceptance criteria
- [ ] Every workflow sets top-level `permissions: contents: read` (or narrower); no job inherits `write-all`.
- [ ] Each job that needs a write scope declares exactly that scope and nothing more; documented inline.
- [ ] Scorecard Token-Permissions check passes.
- [ ] A `scripts/check-workflow-permissions.mjs` guard fails a PR that introduces an over-broad `permissions` block, and runs in CI.
- [ ] `id-token: write` appears only on the provenance/OIDC jobs, never repo-wide.

#### Technical notes
Review `devsecops.yml`, `scorecard.yml`, and the future `release.yml`. Follow `devsecops-pipeline.md` §0 ("least-privilege token") and §5 ("least-privilege `GITHUB_TOKEN`"). The guard can parse YAML and assert no `permissions: write-all` and that each `write` scope is on an allow-listed job. Basis `docs/research/sources/security-standards-and-devsecops.md` §7. Never `checkout` untrusted PR code under a privileged token (§0 principle 2).

#### Security & privacy
Threats: over-privileged CI token abused by a malicious dependency/action to push code or exfiltrate (CWE-250 execution with unnecessary privileges, CWE-732 incorrect permission assignment, OWASP-A05/A08). Controls: SSDF PO.5, MASVS-CODE-1, Scorecard Token-Permissions. Baseline: no secrets; the guard logs only job names.

#### UX notes
No end-user UI. Developer surface: the `check-workflow-permissions` check on PRs with a clear message pointing to §5. None beyond baseline.

#### Test plan
Run `scripts/check-workflow-permissions.mjs` in CI; assert it fails on a fixture workflow with `permissions: write-all` and passes on the real ones. Confirm Scorecard Token-Permissions improves. Record in the PR; no app unit test.

#### Dependencies
None to start. Precedes/aligns with [SN-CI-002](ci-cd.md#sn-ci-002), [SN-CI-004](ci-cd.md#sn-ci-004), [SN-CI-018](ci-cd.md#sn-ci-018) which add scoped write permissions.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-010

<a id="sn-ci-010"></a>

**Extend and harden the existing core scanners in devsecops.yml**

| Field | Value |
|---|---|
| GitHub | #170 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `OWASP-A05`, `OWASP-A06`, `SSDF-PW.4`, `CWE-1104` |
| Extra labels | agent-ready, good first issue |

#### Context
The existing `devsecops.yml` core scanners work but `docs/security/devsecops-pipeline.md` §1.3–§1.5 lists concrete strengthening steps that are not yet done: `dependency-review` should enforce a license allow/deny policy (§1.4, checklist §10), Trivy should raise CRITICAL to blocking and be ready to emit a CycloneDX SBOM (§1.5), and OSV-Scanner's action reference should be normalised and kept blocking-capable (§1.3). These are small config changes on jobs that already exist, closing the "to strengthen" notes and moving `controls-matrix.md` §1 CODE-2 from Partial toward Implemented.

#### Scope
**In:** add `allow-licenses`/`deny-licenses` to `dependency-review-action`; raise Trivy `exit-code` so a CRITICAL fs finding fails (keeping HIGH as non-blocking SARIF for now); confirm/normalise the OSV-Scanner action reference and its recursive lockfile scan (pub/Gradle/npm/SPM); add Trivy CycloneDX SBOM output on PRs as a build artifact.
**Out:** the license policy text decision itself (use the checklist §10 default; flag `needs-decision` only if the checklist is silent); container-image Trivy scan (that ships with [SN-CI-018](ci-cd.md#sn-ci-018)); release SBOM/provenance ([SN-CI-004](ci-cd.md#sn-ci-004)).

#### Acceptance criteria
- [ ] `dependency-review` fails a PR that introduces a dependency under a denied license, per the checklist §10 allow-list; the policy is documented.
- [ ] Trivy fails the job on a CRITICAL filesystem finding (`exit-code: 1` for CRITICAL) while still uploading full SARIF for HIGH.
- [ ] OSV-Scanner runs recursively over all four lockfile ecosystems and its action is SHA-pinned (coordinated with [SN-CI-005](ci-cd.md#sn-ci-005)).
- [ ] Trivy emits a CycloneDX SBOM artifact on PRs (foundation for [SN-CI-004](ci-cd.md#sn-ci-004)).
- [ ] `devsecops-pipeline.md` §1.4/§1.5 "to strengthen" notes are struck and the §2 coverage table updated.

#### Technical notes
Edit the `dependency-review`, `iac-and-fs` (Trivy) and `sca` (OSV) jobs in `.github/workflows/devsecops.yml`. License list from `docs/security/secure-coding-checklist.md` §10. Trivy CycloneDX via `format: cyclonedx` in a second invocation or `trivy fs --format cyclonedx`. Reference `devsecops-pipeline.md` §1.3–§1.5. No `PRD-*` (pipeline config). Keep HIGH-severity fs findings non-blocking until triaged (§4).

#### Security & privacy
Threats: vulnerable/outdated or badly-licensed dependency (OWASP-A06/2021, A03/2025, MASVS-CODE-2, CWE-1104), secret/misconfig in files (A05). Controls: SSDF PW.4 (reuse well-secured software), MASVS-CODE-2. Baseline: SBOM artifact contains no secrets; no content logged.

#### UX notes
No end-user UI. Developer surface: the dependency-review PR comment now lists license violations; Trivy CRITICAL turns the check red with the file/CVE. Document in `devsecops-pipeline.md` §8. None beyond baseline.

#### Test plan
Manual: open a PR adding a GPL-incompatible (per policy) dependency and confirm the block; add a fixture with a known CRITICAL and confirm Trivy fails. Confirm the CycloneDX artifact uploads and validates. Record in the PR; no app unit test.

#### Dependencies
Pairs with [SN-CI-005](ci-cd.md#sn-ci-005) (pin the same actions) and feeds [SN-CI-004](ci-cd.md#sn-ci-004) (release SBOM). License default from checklist §10.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-011

<a id="sn-ci-011"></a>

**Define the Dependabot/Renovate dependency-update policy**

| Field | Value |
|---|---|
| GitHub | #171 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, security |
| Size | S |
| SDLC | maintenance |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `OWASP-A06`, `SSDF-RV.2`, `CWE-1104`, `CWE-1395` |
| Extra labels | agent-ready, good first issue |

#### Context
`docs/security/ssdlc-process.md` §2.6 states dependency updates land weekly via Dependabot groups, and `docs/security/controls-matrix.md` §1 CODE-2 and §8 rely on it to keep the pinned lockfiles/actions current and CVE-free. A basic `.github/dependabot.yml` already exists (github-actions, pub@/app, npm@/, gradle@/app/android, swift@/app/ios) but it lacks a documented policy: grouping strategy, security-vs-version update split, SHA-pin maintenance, auto-merge stance, and the reviewer/label conventions. This issue turns the file into a deliberate, documented policy (and evaluates whether Renovate should supplement it for the monorepo's many `packages/`).

#### Scope
**In:** extend `.github/dependabot.yml` to cover every ecosystem directory in the monorepo (the 12 `packages/`, `plugins/`, `services/`, `website/`, `tools/`), group patch/minor updates, keep security updates ungrouped and prioritised, ensure github-actions updates bump the SHA pins from [SN-CI-005](ci-cd.md#sn-ci-005), and add labels + the CODEOWNERS reviewer. Document the policy (cadence, grouping, auto-merge = off by default, SLA alignment) in `devsecops-pipeline.md` §5/§Maintenance. Record a decision note on Dependabot-only vs adding Renovate.
**Out:** actually merging update PRs; the OSV/dependency-review gates ([SN-CI-010](ci-cd.md#sn-ci-010)); and the pubspec exact-version pins and internal sane_* workspace resolution conventions, which are owned by [SN-FND-020](devx.md#sn-fnd-020) and which this bot policy automates.

#### Acceptance criteria
- [ ] Every dependency ecosystem/directory in the monorepo is covered by a Dependabot entry.
- [ ] Patch/minor updates are grouped per ecosystem; security updates arrive as separate, high-priority PRs.
- [ ] github-actions updates keep entries SHA-pinned (not reverting to tags), consistent with [SN-CI-005](ci-cd.md#sn-ci-005).
- [ ] Update PRs are labelled and routed to the CODEOWNERS reviewer; the cadence/SLA is documented and aligns with `ssdlc-process.md` §3.
- [ ] The Dependabot-vs-Renovate decision is recorded (default: Dependabot; Renovate noted as optional for `packages/` fan-out) with rationale.

#### Technical notes
Edit `.github/dependabot.yml` (v2 schema). Use `groups:` per ecosystem, `open-pull-requests-limit`, `labels`, `reviewers`. Keep weekly `interval`. Reference `ssdlc-process.md` §2.6 and `devsecops-pipeline.md` §5. Dart/pub packages live under `packages/*` and `plugins/*` (`CLAUDE.md` §3), each with its own `pubspec.yaml`; a `pub` entry per package or a Renovate regex manager. No `PRD-*` (maintenance policy).

#### Security & privacy
Threats: vulnerable/outdated components (OWASP-A06/2021, A03/2025, MASVS-CODE-2, CWE-1104), stale/mutable action pins (CWE-1395). Controls: SSDF RV.2 (respond to vulns via patch cadence), MASVS-CODE-2. Baseline: config contains no secrets.

#### UX notes
No end-user UI. Developer surface: grouped, labelled dependency PRs with a consistent title and the maintainer as reviewer. Document the triage flow (security updates first) in the maintenance section. None beyond baseline.

#### Test plan
Validate the YAML (`dependabot.yml` schema) and confirm Dependabot registers all ecosystems (Insights → Dependency graph → Dependabot). Manual review of a generated grouped PR. Record in the PR; no app unit test.

#### Dependencies
[SN-CI-005](ci-cd.md#sn-ci-005) (keep action pins as SHAs) and [SN-CI-010](ci-cd.md#sn-ci-010) (the blocking SCA gates that consume the updates).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-012

<a id="sn-ci-012"></a>

**Add ZAP baseline and full active DAST scans for web and relay**

| Field | Value |
|---|---|
| GitHub | #172 |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | web |
| Areas | ci-cd, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-WEB-001](compat.md#sn-web-001), [SN-CI-018](ci-cd.md#sn-ci-018) |
| Security controls | `ASVS-V1`, `ASVS-V3`, `ASVS-V4`, `OWASP-A01`, `OWASP-A03`, `OWASP-A10`, `CWE-79`, `CWE-352` |
| Extra labels | agent-ready |

#### Context
`docs/security/devsecops-pipeline.md` §2.5 and `docs/security/ssdlc-process.md` §2.4 require OWASP ZAP DAST: a passive baseline scan against an ephemeral preview of the web app (and relay) on every PR, and a full active scan nightly against staging with an OpenAPI import. This is the dynamic complement to the static analysis and maps to ASVS V1–V4/V17 and OWASP-A01/A03/A10 for the web surface (`controls-matrix.md` §3/§4). It activates when `website/` and `services/` exist; it is scheduled in M7 (Beta Hardening) where staging web + relay are exercised, per the verification stage.

#### Scope
**In:** a `zap-baseline` job (passive) on PRs against an ephemeral web preview, and a `zap-full-scan` job (active) nightly against staging with an OpenAPI/Swagger import for the relay/entitlement API; alert thresholds, a tuned rules-config to suppress known-safe alerts, SARIF/report artifacts, and a fail-on-high policy for the full scan.
**Out:** MobSF mobile binary scan ([SN-CI-013](ci-cd.md#sn-ci-013)); the web app/relay implementation ([SN-WEB-001](compat.md#sn-web-001), [SN-COL-001](collaboration.md#sn-col-001)); manual pentest (verification activity in [SN-SEC-001](security.md#sn-sec-001)).

#### Acceptance criteria
- [ ] `zap-baseline` runs passively against a spun-up preview on PRs touching `website/` or `services/`; findings appear as an artifact/PR annotation.
- [ ] `zap-full-scan` runs nightly against staging, imports the OpenAPI contract, and fails on any unresolved High finding (per `ssdlc-process.md` §2.4 exit gate).
- [ ] A committed `.zap/rules.tsv` tunes false positives; every suppression carries a justification.
- [ ] Reports (HTML + SARIF) are uploaded as artifacts and, for the nightly, surfaced in Code Scanning.
- [ ] The job is guarded so it no-ops cleanly before `website/`/`services/` exist.

#### Technical notes
Use the official `zaproxy/action-baseline` and `zaproxy/action-full-scan` (SHA-pinned). Stand up the ephemeral web preview from the Flutter web build; the relay preview from its container. OpenAPI import for the active scan against `services/` (`controls-matrix.md` §3 V4). Reference `devsecops-pipeline.md` §2.5 and `docs/research/sources/security-standards-and-devsecops.md` §6.5. Sanitised note render must survive active XSS probes (ASVS V1, TM-I-06). No `PRD-*` (verification job).

#### Security & privacy
Threats: web injection/XSS (CWE-79, OWASP-A03, TM-I-06), broken access control/IDOR on the sync/entitlement API (OWASP-A01, ASVS V4/V8), CSRF (CWE-352), SSRF (OWASP-A10). Controls: ASVS V1/V3/V4/V17, OWASP-A01/A03/A10. Baseline: the scan runs against non-production staging with synthetic data only — never real user notes; no secrets in the scan config.

#### UX notes
No end-user UI. Developer surface: a ZAP report artifact on the PR and nightly Code Scanning alerts; tuned rules keep signal high. Document activation conditions and the staging target in `devsecops-pipeline.md` §2.5. None beyond baseline.

#### Test plan
Manual: deploy a preview with a deliberate reflected-XSS sink and confirm ZAP baseline reports it; run the full scan against staging with the OpenAPI import and confirm the fail-on-high gate. Add the `.zap/rules.tsv`. Record in the PR; no app unit test.

#### Dependencies
[SN-WEB-001](compat.md#sn-web-001) (web/PWA surface to scan) and [SN-CI-018](ci-cd.md#sn-ci-018) (relay/entitlement service + its OpenAPI). Complements the manual pentest under [SN-SEC-001](security.md#sn-sec-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-013

<a id="sn-ci-013"></a>

**Run MobSF static analysis on release-candidate builds**

| Field | Value |
|---|---|
| GitHub | #173 |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | ci-cd, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `MASVS-CODE-3`, `MASVS-RESILIENCE-2`, `MASVS-STORAGE-1`, `OWASP-A05`, `CWE-919` |
| Extra labels | agent-ready |

#### Context
`docs/security/devsecops-pipeline.md` §2.4 and `docs/security/ssdlc-process.md` §2.4 require MobSF static (and optional dynamic) analysis of the release-candidate APK/AAB/IPA, with findings mapped to MASVS / Mobile Top 10 and triaged before store submission. This is the binary-level verification that complements source SAST (mobsfscan [SN-CI-008](ci-cd.md#sn-ci-008), CodeQL [SN-CI-002](ci-cd.md#sn-ci-002)): it inspects the actually-built artifact for insecure manifest flags, exposed components, weak crypto in the packaged binary, cleartext config, and missing binary protections. It is scheduled in M7 (Beta Hardening) where release candidates are produced, and blocks on unresolved high MASVS findings (`ssdlc-process.md` §2.4 exit gate).

#### Scope
**In:** a `mobsf` job (nightly + on RC tags) that runs MobSF static analysis against the built Android AAB/APK and iOS IPA, exports the report + a MASVS/Mobile-Top-10 finding summary as an artifact, and fails the RC on unresolved High findings; wire an authenticated self-hosted or containerised MobSF instance via CI.
**Out:** dynamic MobSF (optional/self-hosted, deferred); the build flavours that produce the artifacts ([SN-FND-005](devx.md#sn-fnd-005)); source SAST ([SN-CI-008](ci-cd.md#sn-ci-008)).

#### Acceptance criteria
- [ ] MobSF static analysis runs against the RC AAB/APK and IPA and produces a downloadable report + JSON summary artifact.
- [ ] The job fails the release candidate on any unresolved High MASVS/Mobile-Top-10 finding; Medium/Low are logged for triage.
- [ ] Findings are mapped to MASVS control ids and cross-checked against `docs/security/controls-matrix.md` §1.
- [ ] The MobSF API key is injected from a CI secret, never committed; the job runs only on RC/nightly, not every PR.
- [ ] A suppression/triage file records accepted findings with justification and Security-Owner sign-off.

#### Technical notes
Run MobSF via its Docker image or a self-hosted instance; submit the artifact through the REST API (`/api/v1/upload` → `/scan` → `/report_json`) with the key from CI secrets. Parse the JSON, map to MASVS, gate on severity. Reference `devsecops-pipeline.md` §2.4, `ssdlc-process.md` §2.4, `docs/research/sources/security-standards-and-devsecops.md` §6.4. Consumes artifacts from [SN-FND-005](devx.md#sn-fnd-005). No `PRD-*` (verification gate).

#### Security & privacy
Threats: shipped insecure config/exported components (MASVS-PLATFORM-1, CWE-919), weak crypto/insecure storage in the binary (MASVS-STORAGE-1/CRYPTO-1, Mobile M9), missing binary protections/tamper resistance (MASVS-RESILIENCE-2/3, Mobile M7). Controls: MASVS-CODE-3, RESILIENCE-2, OWASP-A05. Baseline: the RC artifact is analysed in CI only; the MobSF key is a scoped CI secret; no user data involved.

#### UX notes
No end-user UI. Developer/release surface: a MobSF report artifact on the RC run and a MASVS-tagged pass/fail summary; the triage file is reviewed at the release gate. Document in `devsecops-pipeline.md` §2.4. None beyond baseline.

#### Test plan
Manual on a debug RC: run MobSF, confirm the report generates and the severity gate fails on a seeded high finding (e.g. an exported activity). Add `scripts/mobsf-gate.mjs` that parses the JSON and enforces the threshold; unit-test its severity parsing with a sample report fixture. Record in the PR.

#### Dependencies
[SN-FND-005](devx.md#sn-fnd-005) (RC artifacts). Complements [SN-CI-008](ci-cd.md#sn-ci-008) (source) and the pentest under [SN-SEC-001](security.md#sn-sec-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-014

<a id="sn-ci-014"></a>

**Implement signed, notarized releases (Play + Apple)**

| Field | Value |
|---|---|
| GitHub | #174 |
| Type | security |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | ci-cd, release |
| Size | L |
| SDLC | release |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `SSDF-PS.2`, `SSDF-PS.3`, `MASVS-RESILIENCE-2`, `OWASP-A08`, `CWE-347` |
| Extra labels | agent-ready, needs-credentials |

#### Context
`docs/security/devsecops-pipeline.md` §2.7 and `docs/security/ssdlc-process.md` §2.5 require a signed, notarized release path: Android **Play App Signing** (Google holds the app signing key; we hold only an upload key, delivered via OIDC/secret) with the mapping file, iOS **App Store signing**, and **Apple notarization** (`notarytool`) for the desktop build, plus a signed git tag — all environment-gated so a tag push cannot ship without human approval (`devsecops-pipeline.md` §5). This is the MASVS-RESILIENCE-2 (code/resource integrity) and SSDF PS.2/PS.3 control that guarantees users install exactly what we built. It is a launch (M8) gate and needs maintainer-supplied store credentials, so it is `needs-credentials`. This umbrella issue owns the release-signing feature; the platform specifics are its sub-tasks [SN-CI-022](ci-cd.md#sn-ci-022) and [SN-CI-023](ci-cd.md#sn-ci-023).

#### Scope
**In:** the `release.yml` signing stage and the gated `release` environment: orchestration that builds, signs, notarizes (where applicable), signs the git tag, and hands off to [SN-CI-004](ci-cd.md#sn-ci-004) for SBOM/provenance; secret/OIDC wiring for the store credentials; documentation of the key custody model.
**Out:** the per-platform signing mechanics (delegated to [SN-CI-022](ci-cd.md#sn-ci-022) Android, [SN-CI-023](ci-cd.md#sn-ci-023) Apple); SBOM/provenance ([SN-CI-004](ci-cd.md#sn-ci-004)); store privacy-label content (release area / [SN-PRV-001](privacy.md#sn-prv-001)).

#### Acceptance criteria
- [ ] A `v*` tag triggers `release.yml`, which only proceeds after the gated `release` environment's required reviewer approves.
- [ ] The git tag is GPG/Sigstore-signed and verifiable.
- [ ] Android and iOS artifacts are signed via [SN-CI-022](ci-cd.md#sn-ci-022)/[SN-CI-023](ci-cd.md#sn-ci-023); unsigned artifacts never leave CI.
- [ ] All signing/notarization credentials come from CI secrets or OIDC; nothing is committed (enforced by [SN-CI-006](ci-cd.md#sn-ci-006)).
- [ ] The key-custody and rotation model is documented in `devsecops-pipeline.md` §5.

#### Technical notes
`release.yml` gated by `environment: release` (required reviewers). Delegates to sub-tasks. Uses OIDC where possible over static creds (`devsecops-pipeline.md` §5). Signed tags via `git tag -s` or gitsign. Reference `ssdlc-process.md` §2.5, `controls-matrix.md` §8 ("Signed releases") and `docs/research/sources/security-standards-and-devsecops.md` §3.1. Credentials (Play service account, Apple API key/team id, notarization creds) are maintainer-supplied — marked `needs-credentials`. No `PRD-*` (release control).

#### Security & privacy
Threats: tampered/unsigned release, signature bypass (CWE-347 improper signature verification), key compromise (OWASP-A08, MASVS-RESILIENCE-2). Controls: SSDF PS.2/PS.3, MASVS-RESILIENCE-2. Baseline: keys never on disk/logs/repo; the release environment is human-gated; rotate on suspicion (`devsecops-pipeline.md` §6).

#### UX notes
No end-user UI (the user benefit is an authentic, store-verified install). Developer/release surface: the gated-environment approval prompt and a release summary listing signed artifacts. Document the approval + custody flow. None beyond baseline.

#### Test plan
Dry-run on a pre-release tag with sandbox/test credentials: confirm the environment gate blocks until approval, the tag verifies, and unsigned artifacts are never uploaded. Integration verification is delegated to the sub-tasks' test plans. Record the dry-run in the PR.

#### Dependencies
[SN-FND-005](devx.md#sn-fnd-005) (build flavours), [SN-CI-006](ci-cd.md#sn-ci-006) (no secrets committed), children [SN-CI-022](ci-cd.md#sn-ci-022) and [SN-CI-023](ci-cd.md#sn-ci-023); hands off to [SN-CI-004](ci-cd.md#sn-ci-004). Needs maintainer store credentials.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-015

<a id="sn-ci-015"></a>

**Establish reproducible-ish builds with pinned toolchain and obfuscation**

| Field | Value |
|---|---|
| GitHub | #175 |
| Type | infra |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | ci-cd, release |
| Size | M |
| SDLC | release |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `MASVS-RESILIENCE-3`, `SSDF-PW.6`, `OWASP-A08`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
`docs/security/ssdlc-process.md` §2.5 and `docs/security/controls-matrix.md` §1 RESILIENCE-3 require reproducible-ish builds with a pinned toolchain (Flutter/Dart, Gradle, Xcode) and obfuscated release binaries (`--obfuscate --split-debug-info`, symbols stripped). Pinning the toolchain makes the build deterministic enough that the SLSA provenance ([SN-CI-004](ci-cd.md#sn-ci-004)) is meaningful and a supply-chain implant is detectable; obfuscation raises the bar for reverse-engineering the AOT-compiled Dart (MASVS-RESILIENCE-3). This underpins the release-integrity story (OWASP-A08 / 2025-A03).

#### Scope
**In:** pin the Flutter/Dart SDK (e.g. via `fvm`/`flutter-version-file` + a pinned action), pin Gradle wrapper + Android SDK/NDK and the Xcode version, set release builds to `--obfuscate --split-debug-info=<dir>` with symbol stripping, archive the debug-info/symbol maps as release artifacts (for de-symbolication), and document the reproducibility caveats.
**Out:** signing/notarization ([SN-CI-014](ci-cd.md#sn-ci-014)); SBOM/provenance emission ([SN-CI-004](ci-cd.md#sn-ci-004)); the CI analyze/test job ([SN-FND-003](ci-cd.md#sn-fnd-003)).

#### Acceptance criteria
- [ ] The Flutter/Dart, Gradle and Xcode versions are pinned in-repo (version files) and used identically in dev and CI.
- [ ] Release builds run with `--obfuscate --split-debug-info`; the resulting binary has stripped symbols; the symbol map is archived per release.
- [ ] Two CI builds of the same commit produce byte-identical (or documented-difference) artifacts for at least one platform (reproducibility check).
- [ ] The toolchain pins are kept current via [SN-CI-011](ci-cd.md#sn-ci-011) (Dependabot).
- [ ] Reproducibility scope + known non-determinism sources are documented in `devsecops-pipeline.md`/`ssdlc-process.md` §2.5.

#### Technical notes
Use a committed `.fvmrc`/`flutter` version file and a pinned `subosito/flutter-action@<sha>` with an exact version; pin `gradle-wrapper.properties` and the Android `compileSdk`/NDK; pin Xcode via the runner image label. Release flags per `CLAUDE.md` §RESILIENCE-3 and `controls-matrix.md` §1. Compare artifact hashes across two runs for the reproducibility gate. Basis `docs/research/sources/security-standards-and-devsecops.md` §3.1. Consumes [SN-FND-005](devx.md#sn-fnd-005) flavours. No `PRD-*` (build config).

#### Security & privacy
Threats: non-deterministic/implantable build undermining provenance (OWASP-A08/2025-A03, CWE-1104), easy reverse-engineering of an un-obfuscated binary exposing logic (MASVS-RESILIENCE-3, Mobile M7). Controls: SSDF PW.6, MASVS-RESILIENCE-3. Baseline: symbol maps are release-private artifacts, not shipped; no secrets in toolchain config.

#### UX notes
No end-user UI. Developer/release surface: pinned versions mean identical local/CI builds; the archived symbol map enables crash de-symbolication. Document the pin bump process. None beyond baseline.

#### Test plan
Add a `reproducibility` CI job that builds the same commit twice and diffs artifact hashes, tolerating documented non-determinism; assert obfuscation by checking symbols are stripped (`flutter build` output + `nm`/`strings` spot-check). Record in the PR.

#### Dependencies
[SN-FND-005](devx.md#sn-fnd-005) (flavours), feeds [SN-CI-004](ci-cd.md#sn-ci-004) (provenance meaningfulness) and [SN-CI-014](ci-cd.md#sn-ci-014) (obfuscated signed artifacts); pins maintained by [SN-CI-011](ci-cd.md#sn-ci-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-018

<a id="sn-ci-018"></a>

**Build a DevSecOps CI pipeline for services/ (relay + entitlements)**

| Field | Value |
|---|---|
| GitHub | #176 |
| Type | infra |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | web |
| Areas | ci-cd, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `ASVS-V4`, `ASVS-V13`, `MASVS-NETWORK-1`, `OWASP-A05`, `OWASP-A08`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
`docs/security/devsecops-pipeline.md` §1.5/§2.6 anticipate the optional, stateless, ciphertext-only `services/` (the `relay/` for real-time collaboration and `entitlements/` for billing) and note that when the relay ships CI must add a **container image scan** and **SBOM emission**, and deploy via **OIDC** (no static creds). `docs/security/controls-matrix.md` §3 (ASVS V4/V13/V17) and §8 apply to these services. This issue stands up their build/test/scan/deploy pipeline. The relay ships in M6 (collaboration), so this is scheduled there; the entitlements service (M8) reuses the same pipeline.

#### Scope
**In:** a `services.yml` (or jobs in `devsecops.yml`) that lints/tests the service code, builds the container image, runs Trivy **image** scan (vuln + misconfig + secret) with a CRITICAL gate, emits a CycloneDX image SBOM, and deploys via OIDC to staging (no static cloud creds). Includes the OpenAPI contract used by ZAP ([SN-CI-012](ci-cd.md#sn-ci-012)).
**Out:** the relay/entitlement application code ([SN-COL-001](collaboration.md#sn-col-001), [SN-BILL-001](billing.md#sn-bill-001)); ZAP DAST ([SN-CI-012](ci-cd.md#sn-ci-012)); release SBOM/provenance for clients ([SN-CI-004](ci-cd.md#sn-ci-004)).

#### Acceptance criteria
- [ ] Service PRs run lint + unit/integration tests + Trivy image scan; a CRITICAL image finding fails the job.
- [ ] A CycloneDX SBOM is generated for the relay image and archived (feeds [SN-CI-004](ci-cd.md#sn-ci-004) at release).
- [ ] Staging deploy uses OIDC/short-lived tokens; no long-lived cloud credentials exist in secrets.
- [ ] The service exposes/publishes an OpenAPI contract consumed by the ZAP full scan ([SN-CI-012](ci-cd.md#sn-ci-012)).
- [ ] The job no-ops cleanly until `services/` contains code; `permissions` are least-privilege with `id-token: write` only on the deploy job.

#### Technical notes
Trivy image scan via `aquasecurity/trivy-action` `scan-type: image` (SHA-pinned); SBOM via `format: cyclonedx`. OIDC deploy via the cloud provider's federated action (no static keys) per `devsecops-pipeline.md` §5. Services are stateless and never store note content (`CLAUDE.md` §3, overview §1) — the relay only forwards ciphertext (ASVS V17). Reference `devsecops-pipeline.md` §1.5/§2.6 and `controls-matrix.md` §3. No `PRD-*` here (the relay's product requirements live in PRD-04 `PRD-CO-*`, referenced by [SN-COL-001](collaboration.md#sn-col-001)).

#### Security & privacy
Threats: vulnerable container base image (OWASP-A06/2025-A03, CWE-1104), misconfigured/over-exposed service (A05, ASVS V13), cleartext transport (MASVS-NETWORK-1, ASVS V12), IDOR on the API (ASVS V4). Controls: ASVS V4/V13, MASVS-NETWORK-1, SSDF PW.6. Baseline: the relay sees only ciphertext; OIDC deploy avoids static secrets; no note content in service logs (checklist §7).

#### UX notes
No end-user UI. Developer surface: image-scan and test checks on service PRs; an archived SBOM artifact. Document the services pipeline in `devsecops-pipeline.md` §2.6. None beyond baseline.

#### Test plan
Manual: build the relay image with a known-vulnerable base and confirm Trivy CRITICAL fails; confirm the SBOM generates and the OIDC deploy uses no static creds. Add service unit tests under `services/relay/test`. Record in the PR.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (repo scaffold); relay/entitlement code from [SN-COL-001](collaboration.md#sn-col-001)/[SN-BILL-001](billing.md#sn-bill-001); feeds [SN-CI-012](ci-cd.md#sn-ci-012) (ZAP) and [SN-CI-004](ci-cd.md#sn-ci-004) (release SBOM).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-019

<a id="sn-ci-019"></a>

**Build a security dashboard aggregating Code Scanning and Scorecard**

| Field | Value |
|---|---|
| GitHub | #177 |
| Type | infra |
| Priority | p3 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | ci-cd, security |
| Size | S |
| SDLC | maintenance |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-CI-002](ci-cd.md#sn-ci-002) |
| Security controls | `SSDF-RV.1`, `SSDF-PO.4`, `OWASP-A09`, `MASVS-CODE-2` |
| Extra labels | agent-ready |

#### Context
Once the pipeline emits SARIF from many tools (Semgrep, CodeQL [SN-CI-002](ci-cd.md#sn-ci-002), mobsfscan [SN-CI-008](ci-cd.md#sn-ci-008), Trivy, ZAP [SN-CI-012](ci-cd.md#sn-ci-012)) plus OpenSSF Scorecard, a maintainer needs one place to see current security posture and drift rather than clicking through each tool. `docs/security/ssdlc-process.md` §2.6 (maintenance: monitoring + drift), §5 (DoD) and `docs/security/controls-matrix.md` §9 (coverage summary & gaps) call for keeping the coverage/gap picture current. A lightweight dashboard supports SSDF RV.1 (identify vulns) and PO.4 (criteria for checks) and the OWASP-A09 "logging/alerting" theme by surfacing open findings, their severity, and Scorecard trend.

#### Scope
**In:** a scheduled job that pulls the GitHub Code Scanning alerts API + the Scorecard result, renders a `docs/security/dashboard.md` (or a generated HTML/badge set) summarising open findings by tool/severity/MASVS-ASVS mapping and the Scorecard score with a delta since last run, and alerts (issue/label) when a new High/Critical appears or Scorecard regresses.
**Out:** fixing the findings themselves; the scanners that produce them (their own issues); telemetry/crash reporting ([SN-TEL-001](telemetry.md#sn-tel-001)).

#### Acceptance criteria
- [ ] A scheduled workflow queries Code Scanning alerts + Scorecard and regenerates the dashboard artifact on a cadence (weekly, aligned to the cron scans).
- [ ] The dashboard lists open findings grouped by tool and severity and maps them to the `controls-matrix.md` control ids where available.
- [ ] A new High/Critical finding or a Scorecard regression opens/updates a tracking issue with the `blocked`/`p1` labels.
- [ ] The job uses a read-scoped token (`security-events: read`) and commits/uploads only non-sensitive summary data (counts, ids — no code snippets/secrets).
- [ ] `controls-matrix.md` §9 gap table is refreshed from the dashboard at each milestone.

#### Technical notes
Use the REST API `GET /repos/{owner}/{repo}/code-scanning/alerts` and the Scorecard SARIF/badge; a small Node script under `scripts/security-dashboard.mjs` renders Markdown. Schedule alongside the existing weekly crons (`devsecops.yml`, `scorecard.yml`). Reference `ssdlc-process.md` §2.6 and `controls-matrix.md` §9. No `PRD-*` (maintenance tooling). Keep it read-only over findings; never echo alert code context into the committed file (checklist §7 no content in logs/artifacts).

#### Security & privacy
Threats: leaking finding detail (code snippets) into a committed artifact (CWE-532), missed/unmonitored vulnerabilities (OWASP-A09, SSDF RV.1). Controls: SSDF RV.1/PO.4, MASVS-CODE-2. Baseline: summary counts/ids only, no snippets/secrets; read-scoped token.

#### UX notes
Developer/maintainer-facing. If rendered as HTML it must meet the a11y baseline (semantic headings, ≥4.5:1 contrast, keyboard-navigable) per `docs/design/accessibility.md`; a Markdown table in `docs/security/` is the simpler default. Show severity with text + colour (not colour alone). Empty state: "No open findings". None beyond that baseline.

#### Test plan
Unit-test `scripts/security-dashboard.mjs` rendering with a sample alerts+Scorecard fixture (grouping, severity counts, control mapping, empty state). Manual: run the job, confirm the dashboard regenerates and a seeded High opens a tracking issue. Record in the PR.

#### Dependencies
[SN-CI-002](ci-cd.md#sn-ci-002) and the other SARIF-emitting scanners ([SN-CI-008](ci-cd.md#sn-ci-008), [SN-CI-012](ci-cd.md#sn-ci-012)) plus Scorecard (live). Refreshes [SN-SEC-001](security.md#sn-sec-001)'s posture view.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-022

<a id="sn-ci-022"></a>

**Wire Android Play App Signing via upload key and OIDC**

| Field | Value |
|---|---|
| GitHub | #584 |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | android-tablet, android-phone |
| Areas | ci-cd, release |
| Size | M |
| SDLC | release |
| Parent | [SN-CI-014](ci-cd.md#sn-ci-014) |
| Depends on | [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `SSDF-PS.2`, `MASVS-RESILIENCE-2`, `OWASP-A08`, `CWE-798` |
| Extra labels | agent-ready, needs-credentials |

#### Context
This is the Android half of [SN-CI-014](ci-cd.md#sn-ci-014). `docs/security/devsecops-pipeline.md` §2.7 and §5 mandate **Play App Signing**: Google holds the app signing key and we hold only an **upload key**, delivered via OIDC/CI secret, plus the deobfuscation mapping file uploaded with the bundle. This keeps the most sensitive key out of CI entirely and satisfies SSDF PS.2 / MASVS-RESILIENCE-2 for the Android artifacts. It depends on the build flavours ([SN-FND-005](devx.md#sn-fnd-005)) producing the release AAB and on maintainer-supplied Play credentials (`needs-credentials`).

#### Scope
**In:** the Android signing + publish step in `release.yml`: sign the AAB with the upload key from a CI secret/OIDC, upload to the Play Console (internal/closed track) with the ProGuard/R8 mapping file, verify the upload-key signature, and document the Play App Signing enrolment.
**Out:** the iOS/Apple path ([SN-CI-023](ci-cd.md#sn-ci-023)); store listing/data-safety content; SBOM/provenance ([SN-CI-004](ci-cd.md#sn-ci-004)).

#### Acceptance criteria
- [ ] The release AAB is signed with the upload key and accepted by Play App Signing on an internal track.
- [ ] The R8 mapping file is uploaded so crash traces de-obfuscate.
- [ ] The upload key is provided via CI secret/OIDC only — never committed (verified by [SN-CI-006](ci-cd.md#sn-ci-006)); the app signing key is never present in CI.
- [ ] `--obfuscate --split-debug-info` release build is used (aligns with [SN-CI-015](ci-cd.md#sn-ci-015)).
- [ ] The enrolment + rotation steps are documented in `devsecops-pipeline.md` §5.

#### Technical notes
Use `r0adkll/upload-google-play` or `fastlane supply` (SHA-pinned) with a Play service-account JSON from a CI secret, or Workload Identity Federation (OIDC) where supported. Build the AAB via the release flavour from [SN-FND-005](devx.md#sn-fnd-005). Mapping file at `app/build/app/outputs/mapping/release/mapping.txt`. Reference `devsecops-pipeline.md` §2.7/§5. No `PRD-*` (release mechanics).

#### Security & privacy
Threats: signing-key compromise or committed credential (CWE-798, OWASP-A08, MASVS-RESILIENCE-2). Controls: SSDF PS.2, MASVS-RESILIENCE-2. Baseline: only the upload key touches CI; the service-account JSON is a scoped, rotatable CI secret; nothing logged.

#### UX notes
No end-user UI. Developer/release surface: a successful internal-track upload and a signed AAB in the release run logs (no secret material). None beyond baseline.

#### Test plan
Dry-run to an internal test track with a sandbox service account: confirm the AAB is accepted, the mapping uploads, and no key material appears in logs. Verify signature with `apksigner`/`bundletool`. Record in the PR.

#### Dependencies
[SN-CI-014](ci-cd.md#sn-ci-014) (parent), [SN-FND-005](devx.md#sn-fnd-005) (release AAB), [SN-CI-006](ci-cd.md#sn-ci-006) (secret hygiene), [SN-CI-015](ci-cd.md#sn-ci-015) (obfuscated build). Needs the Play service account.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CI-023

<a id="sn-ci-023"></a>

**Wire Apple App Store signing and notarytool notarization**

| Field | Value |
|---|---|
| GitHub | #585 |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, ios-phone |
| Areas | ci-cd, release |
| Size | M |
| SDLC | release |
| Parent | [SN-CI-014](ci-cd.md#sn-ci-014) |
| Depends on | [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `SSDF-PS.2`, `MASVS-RESILIENCE-2`, `OWASP-A08`, `CWE-347` |
| Extra labels | agent-ready, needs-credentials |

#### Context
This is the Apple half of [SN-CI-014](ci-cd.md#sn-ci-014). `docs/security/devsecops-pipeline.md` §2.7 and `docs/security/ssdlc-process.md` §2.5 require iOS/iPadOS **App Store signing** and, for the desktop build, **Apple notarization** via `notarytool`. Signing + notarization are the MASVS-RESILIENCE-2 / SSDF PS.2 integrity controls for the Apple artifacts, guaranteeing Gatekeeper/App Store acceptance and that the shipped binary is unmodified. It runs on a macOS runner, depends on the build flavours ([SN-FND-005](devx.md#sn-fnd-005)), and needs the maintainer's Apple Developer team + API key (`needs-credentials`).

#### Scope
**In:** the Apple signing + notarization step in `release.yml` on `macos-latest`: import the distribution certificate + provisioning profile from CI secrets into a temporary keychain, sign the IPA, submit to App Store Connect, and notarize the desktop artifact with `notarytool` + staple; verify the signature.
**Out:** the Android path ([SN-CI-022](ci-cd.md#sn-ci-022)); privacy manifest/label content (release area); SBOM/provenance ([SN-CI-004](ci-cd.md#sn-ci-004)).

#### Acceptance criteria
- [ ] The IPA is signed with the distribution cert/profile and accepted by App Store Connect (TestFlight).
- [ ] The desktop artifact is notarized with `notarytool` and the ticket is stapled; `spctl`/`codesign --verify` passes.
- [ ] Certificates/keys/API tokens come from CI secrets loaded into an ephemeral keychain that is deleted after the job — never committed (verified by [SN-CI-006](ci-cd.md#sn-ci-006)).
- [ ] The release build uses `--obfuscate --split-debug-info` (aligns with [SN-CI-015](ci-cd.md#sn-ci-015)).
- [ ] The signing/notarization + rotation steps are documented in `devsecops-pipeline.md` §5.

#### Technical notes
Use `apple-actions/import-codesign-certs` (SHA-pinned) or a scripted temporary keychain; submit via `xcrun altool`/App Store Connect API and notarize with `xcrun notarytool submit --wait` then `xcrun stapler staple`. Runs on `macos-latest`. App Store Connect API key (Issuer ID + Key ID + .p8) from CI secrets. Reference `devsecops-pipeline.md` §2.7/§5. No `PRD-*` (release mechanics).

#### Security & privacy
Threats: signature bypass / tampered binary (CWE-347, OWASP-A08, MASVS-RESILIENCE-2), leaked signing cert or App Store Connect key. Controls: SSDF PS.2, MASVS-RESILIENCE-2. Baseline: the keychain is ephemeral and deleted; the .p8 key is a scoped CI secret; nothing logged.

#### UX notes
No end-user UI (benefit: a Gatekeeper/App-Store-trusted install). Developer/release surface: a successful TestFlight upload and a stapled desktop artifact in the run logs (no secret material). None beyond baseline.

#### Test plan
Dry-run to TestFlight with a sandbox app record: confirm signing succeeds, notarization returns Accepted, the ticket staples, and no secret material appears in logs. Verify with `codesign --verify --deep` and `spctl -a`. Record in the PR.

#### Dependencies
[SN-CI-014](ci-cd.md#sn-ci-014) (parent), [SN-FND-005](devx.md#sn-fnd-005) (release IPA/desktop artifact), [SN-CI-006](ci-cd.md#sn-ci-006) (secret hygiene), [SN-CI-015](ci-cd.md#sn-ci-015) (obfuscated build). Needs the Apple Developer team + API key.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-003

<a id="sn-fnd-003"></a>

**Add the Flutter CI workflow (format, analyze, test, build)**

| Field | Value |
|---|---|
| GitHub | #257 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, devx |
| Size | L |
| SDLC | implementation |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `MASVS-CODE-2`, `OWASP-A05`, `OWASP-A08`, `ASVS-V14`, `CWE-1104` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
Every PR must be gated by CI that runs `dart format --set-exit-if-changed`, `dart analyze --fatal-infos`, arch-lint, and the unit/widget/golden tests, with warnings-as-errors (overview §9, `docs/roadmap.md` standing gates, ADR-0002 verify steps). This is the **Flutter build/test/analyze** pipeline — distinct from the DevSecOps scanner pipeline (`.github/workflows/devsecops.yml`, owned by SN-CI-001) which already exists for Semgrep/gitleaks/OSV. This issue adds `.github/workflows/ci.yml` running the workspace's format/analyze/arch-lint/test on the pinned toolchain, and the codegen-staleness check, so the scaffold is green and stays green.

#### Scope
**In:** `.github/workflows/ci.yml` with jobs for setup (pinned SDK via [SN-FND-010](devx.md#sn-fnd-010)), `melos bootstrap`, `melos run format`/`analyze`, `dart run tools/scripts/arch_check`, `melos run generate:check`, and `melos run test` with coverage; caching of pub/Melos; concurrency + `permissions: contents: read` least-privilege; required-check wiring documented for branch protection.
**Out:** per-platform binary builds ([SN-FND-013](ci-cd.md#sn-fnd-013)), change-scoped selection ([SN-FND-014](ci-cd.md#sn-fnd-014)), the issues-schema job ([SN-FND-015](ci-cd.md#sn-fnd-015)), and all SAST/SCA/secret scanners (SN-CI-001, `devsecops.yml`).

#### Acceptance criteria
- [ ] `ci.yml` runs on PRs and pushes to `main`; it is **green on the empty scaffold**.
- [ ] Jobs: format (exit-if-changed), analyze (`--fatal-infos`), arch-lint, codegen staleness, and `melos run test` all run and must pass to merge.
- [ ] The workflow uses the pinned Flutter/Dart version from [SN-FND-010](devx.md#sn-fnd-010) (no floating `stable`).
- [ ] `permissions:` is least-privilege (`contents: read` by default); `concurrency` cancels superseded runs.
- [ ] A deliberately mis-formatted or DAG-violating PR fails CI.

#### Technical notes
Use `subosito/flutter-action` (or fvm) pinned to the SDK from [SN-FND-010](devx.md#sn-fnd-010); cache `~/.pub-cache` and Melos. Run arch-lint ([SN-FND-008](devx.md#sn-fnd-008)) and `generate:check` ([SN-FND-011](devx.md#sn-fnd-011)) as their own steps for clear failures. Keep this workflow separate from `devsecops.yml` (ADR-0002 “one CI” = one repo, multiple workflows). Pin every action to a commit SHA (supply-chain). Emit coverage as an artifact for later gates.

#### Security & privacy
CI config is security-sensitive: pin actions to SHAs and set least-privilege `permissions` (OWASP-A05/A08, MASVS-CODE-2, ASVS V14; unpinned actions are CWE-1104/supply-chain risk). The workflow handles **no secrets** (build/test only) — document that release signing/secrets live in the release workflow (SN-REL-001), not here. CODEOWNERS already guards `.github/` (ssdlc-process §1), so this file requires Security-Owner review.

#### UX notes
Developer-facing. Failing checks must name the exact failing step and command to reproduce locally (`melos run analyze`). Keep run time reasonable via caching so agents get fast feedback. No end-user UI.

#### Test plan
Validate `ci.yml` with `actionlint` locally; open a draft PR proving green on the scaffold and red on a seeded format/DAG violation. Manual: confirm required-checks wiring in branch protection (documented, applied by SN-CI-003). Name file: `.github/workflows/ci.yml` (+ `tools/scripts/test/` actionlint invocation).

#### Dependencies
SN-FND-002, SN-FND-004, SN-FND-008.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-013

<a id="sn-fnd-013"></a>

**Add per-platform build jobs (iOS, Android, Web) to CI**

| Field | Value |
|---|---|
| GitHub | #580 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | ci-cd, devx |
| Size | M |
| SDLC | implementation |
| Parent | [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `OWASP-A08`, `ASVS-V14`, `CWE-1104` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
Sane Notes is one codebase compiled to five surfaces; CI must prove the scaffold **builds** on each platform, not just analyses (ADR-0001 “five surfaces in lock-step”, ADR-0001 verify step 3: web produces both WASM and JS outputs, Impeller active on mobile). This issue extends the Flutter CI ([SN-FND-003](ci-cd.md#sn-fnd-003)) with a build matrix — Android (AAB/APK debug), iOS (no-codesign), and Web (CanvasKit + skwasm outputs) — pinning Gradle/Xcode/JDK so native builds are reproducible (ssdlc-process §2.5). It catches platform-specific breakage (a plugin's missing Kotlin/Swift stub) early.

#### Scope
**In:** matrix build jobs — `flutter build appbundle --debug` (Android), `flutter build ios --no-codesign`, `flutter build web` (verify CanvasKit default + skwasm output where COOP/COEP allow, ADR-0010); pinned Gradle wrapper, JDK, and a documented Xcode version; artifact upload of the web build; each flavour buildable (dev/beta/release, [SN-FND-005](devx.md#sn-fnd-005)) at least smoke-built.
**Out:** code signing / notarization / store upload (SN-REL-001), the perf gate (SN-PERF-003), MobSF (SN-CI-001), and desktop targets (Backlog).

#### Acceptance criteria
- [ ] CI builds Android (AAB debug), iOS (`--no-codesign`), and Web on the pinned toolchain and is green on the scaffold.
- [ ] The web build produces the expected CanvasKit output (and skwasm where cross-origin isolation is configured), per ADR-0010.
- [ ] Impeller is active on the Android/iOS builds (no unexpected Skia fallback on API 29+) — asserted per ADR-0001 verify step 3.
- [ ] Gradle wrapper, JDK, and Xcode versions are pinned; a bump is a visible diff.
- [ ] A missing Kotlin/Swift plugin stub breaks the relevant platform job.

#### Technical notes
Use macOS runners for iOS/Web-Safari checks and Linux for Android/Web-Chrome. Pin the Gradle wrapper (`gradle-wrapper.properties`), JDK (temurin), and Xcode (`xcode-select`/`maxim-lobanov/setup-xcode`). The web build's COOP/COEP requirement for skwasm is a deployment concern (ADR-0010, overview §6) — build both outputs. Reuse the pinned Flutter SDK from [SN-FND-010](devx.md#sn-fnd-010). Keep these jobs `needs:` the analyze/test job so builds only run on lint-clean code.

#### Security & privacy
Reproducible, pinned native toolchains are a supply-chain control (OWASP-A08, MASVS-CODE-2, ASVS V14; unpinned Gradle/Xcode is CWE-1104). Debug/no-codesign artifacts here carry no signing keys — signing lives in the environment-gated release workflow (ssdlc-process §2.5, SN-REL-001). Do not upload artifacts that could embed the watermarked placeholder assets to a public location without the not-releasable tag (CLAUDE.md §9). No secrets in these jobs.

#### UX notes
Developer-facing. A platform build failure must clearly attribute to the platform + module. Keep matrix legs parallel for fast feedback. No end-user UI.

#### Test plan
`actionlint` on the workflow; a draft PR showing all three platform legs green on the scaffold and a seeded Kotlin-stub break failing only the Android leg. Name file: `.github/workflows/ci.yml` (build matrix section).

#### Dependencies
SN-FND-003, SN-FND-005.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-014

<a id="sn-fnd-014"></a>

**Add change-scoped test and build selection to CI (affected packages)**

| Field | Value |
|---|---|
| GitHub | #581 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, devx |
| Size | M |
| SDLC | implementation |
| Parent | [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `ASVS-V14` |
| Extra labels | agent-ready |

#### Context
A full-repo CI gets slower as the monorepo grows; ADR-0002 explicitly mitigates this with **change-scoped test/build selection** (Melos `--diff`/affected-package detection) so a PR only builds/tests what it touches, plus the perf gate when the draw path changes (ADR-0002 “Negative” consequence). This issue adds affected-package selection to the Flutter CI ([SN-FND-003](ci-cd.md#sn-fnd-003)) while guaranteeing that changes to shared low-layer packages (`sane_core`, `sane_crypto`) still fan out to dependents, so correctness is never traded for speed.

#### Scope
**In:** a Melos `--diff`-based script computing affected packages from the PR base; CI wiring that runs analyze/test only for affected packages on PRs but **full** on `main`; a dependency-aware fan-out so a change to a base package tests its dependents; a documented override label (`ci:full`) to force a full run.
**Out:** the per-platform build matrix ([SN-FND-013](ci-cd.md#sn-fnd-013)) which stays full on release branches; the perf gate (SN-PERF-003); the base Flutter CI ([SN-FND-003](ci-cd.md#sn-fnd-003)).

#### Acceptance criteria
- [ ] Editing only `sane_pdf` runs `sane_pdf` (and `app` if it depends transitively), not the whole tree, on a PR.
- [ ] Editing `sane_core` or `sane_crypto` fans out to **all** dependent packages (correctness preserved).
- [ ] Pushes to `main` always run the full suite regardless of diff.
- [ ] Applying the `ci:full` label forces a full run on a PR.
- [ ] The selection logic is unit-tested against a fixture dependency graph.

#### Technical notes
Use `melos list --diff=origin/main` (or `--since`) plus the package DAG (overview §5) to compute the transitive dependent closure — a change to a base must include everything above it in the DAG. Keep the algorithm in `tools/scripts` so it is testable off-CI. Guard against a false “nothing affected” by defaulting to full when the diff cannot be computed (fail-safe). Reuse the arch-lint edge table ([SN-FND-008](devx.md#sn-fnd-008)) as the graph source of truth.

#### Security & privacy
Correctness of selection is a mild integrity concern: silently skipping a dependent's tests could let a boundary regression through (MASVS-CODE-1, ASVS V14). Controls: DAG-aware fan-out, full run on `main`, and fail-safe-to-full on ambiguity. No secrets, no data flow. Note in the PR that security scanners (SN-CI-001) still run repo-wide regardless of selection.

#### UX notes
Developer-facing. The CI summary must list which packages were selected and why (affected + dependents), so an agent trusts the scope. The `ci:full` escape hatch must be documented. No end-user UI.

#### Test plan
`tools/scripts/test/affected_selection_test.dart` over a fixture graph: leaf change → leaf only; base change → full closure; unknown diff → full. Name file: `tools/scripts/test/affected_selection_test.dart`.

#### Dependencies
SN-FND-003.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-015

<a id="sn-fnd-015"></a>

**Add the issues-schema validation job to CI**

| Field | Value |
|---|---|
| GitHub | #582 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, devx |
| Size | XS |
| SDLC | verification |
| Parent | [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Depends on | — |
| Security controls | `OWASP-A08`, `ASVS-V14` |
| Extra labels | agent-ready, good first issue |

#### Context
The backlog is machine-readable: issues are JSON arrays in `issues/*.json` validated by `scripts/validate-issues.mjs` against `issues/SCHEMA.md` and published by `scripts/publish-issues.mjs` (CLAUDE.md §11–§12). CLAUDE.md mandates “always run `node scripts/validate-issues.mjs` after editing any `issues/*.json`”. A broken issue file would break publishing and mislead agents, so validation must be a CI gate, not a convention. This is a tiny, self-contained job — a good first issue.

#### Scope
**In:** a CI job (in `ci.yml` or a small dedicated workflow) that, on any change under `issues/`, sets up Node 22 and runs `node scripts/validate-issues.mjs`, failing the PR on any schema error; a path filter so it only runs when `issues/` changes.
**Out:** the publishing workflow (`publish-issues.mjs`, run manually/`publish.sh` by the maintainer with `gh`), the rendering step (`render-issues.mjs`, SN-DOC-001), and any change to the schema itself.

#### Acceptance criteria
- [ ] The job runs on PRs touching `issues/**` and is required for merge.
- [ ] It uses Node 22 and runs `node scripts/validate-issues.mjs`; exit non-zero fails the PR.
- [ ] A PR introducing an invalid issue (bad key, missing section, duplicate key) fails.
- [ ] A valid `issues/` change passes and prints the stats block.
- [ ] The job is skipped (or trivially green) when no `issues/` file changed.

#### Technical notes
Use `actions/setup-node@<sha>` pinned; `paths:` filter on `issues/**`. The validator needs no network or secrets. Keep it a separate job so its failure is unambiguous. This satisfies the CLAUDE.md §11 “always run the validator” rule as an automated gate. Pin the action to a SHA (supply-chain, consistent with [SN-FND-003](ci-cd.md#sn-fnd-003)).

#### Security & privacy
A build-integrity control (OWASP-A08, ASVS V14): prevents malformed backlog metadata from reaching the publisher. No secrets, no PII, no data flow. The validator is read-only over repo files.

#### UX notes
Developer-facing. On failure, the validator already prints actionable per-issue errors; ensure the job surfaces that output. No end-user UI.

#### Test plan
Seed a PR with an invalid issue (e.g. missing `## Test plan`) and confirm the job fails with the validator's message; confirm a valid change passes. Name file: `.github/workflows/ci.yml` (issues-validate job) — the validator itself already has coverage via its own execution.

#### Dependencies
SN-FND-003.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-019

<a id="sn-fnd-019"></a>

**Add PR automation: auto-labeler, PR-title and branch-name lint**

| Field | Value |
|---|---|
| GitHub | #262 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | ci-cd, devx |
| Size | S |
| SDLC | implementation |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-2`, `OWASP-A05`, `ASVS-V14` |
| Extra labels | agent-ready |

#### Context
The repo already has a PR template, issue templates, CODEOWNERS and dependabot (`.github/`). What is missing is the automation that keeps PRs consistent with the conventions in CLAUDE.md §5: branch names `<type>/SN-<AREA>-<NNN>-<short-title>`, Conventional Commit PR titles (`feat(sane_ink): …`), and area/path labels for triage. This issue adds a path-based auto-labeler, a PR-title (Conventional Commits) check, and a branch-name check, so process is enforced automatically rather than by reviewer memory.

#### Scope
**In:** `.github/labeler.yml` mapping paths → `area:*`/`platform:*`-style labels; a labeler workflow; a PR-title lint (Conventional Commits) workflow; a branch-name check matching `^(feat|fix|chore|docs|sec|infra|test|spike|design)/SN-[A-Z0-9]{2,8}-\d{3}-`; least-privilege `permissions`.
**Out:** CODEOWNERS/branch protection/signed commits (SN-CI-003), the security scanners (SN-CI-001), and the release automation (SN-REL-001). Existing templates are not rewritten.

#### Acceptance criteria
- [ ] A PR touching `packages/sane_ink/**` is auto-labeled `area: ink` (and similar mappings across the tree).
- [ ] A PR whose title is not Conventional-Commit-formatted fails the title check with guidance.
- [ ] A branch not matching the `<type>/SN-<AREA>-<NNN>-…` pattern fails the branch-name check.
- [ ] All automation workflows use least-privilege `permissions` and pinned action SHAs.
- [ ] The mapping covers every top-level `packages/*`, `plugins/*`, `app/`, `docs/`, `issues/`.

#### Technical notes
Use `actions/labeler` for paths and a Conventional-Commits title action (or a small script) for titles; a tiny shell step for the branch regex. Map paths to the `area:` slugs from `issues/labels.json`. Keep `permissions:` to `pull-requests: write` only where needed and `contents: read` otherwise. Pin all actions to SHAs (supply-chain). Align the branch regex with CLAUDE.md §5 type mapping.

#### Security & privacy
Workflow-permission hygiene (OWASP-A05, MASVS-CODE-2, ASVS V14): grant the minimum token scope, never `write-all`; do not run untrusted PR code with elevated permissions (use `pull_request` not `pull_request_target` for labeling logic that reads the diff). No secrets. CODEOWNERS already guards `.github/`. No data flow or PII.

#### UX notes
Developer/agent-facing. Failure messages must show the expected format and an example (`feat(sane_ink): add pressure curve editor (SN-INK-012)`). Labels aid human triage on the board. No end-user UI.

#### Test plan
Open PRs exercising: correct/incorrect title, correct/incorrect branch name, and a path that should auto-label; assert each outcome. Name file: `.github/labeler.yml` + `.github/workflows/pr-automation.yml`.

#### Dependencies
SN-FND-003.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GOPS-008

<a id="sn-gops-008"></a>

**Track service and tooling running costs with budgets and spend alerts**

| Field | Value |
|---|---|
| GitHub | #1104 |
| Type | infra |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | ci-cd, release, billing |
| Size | S |
| SDLC | maintenance |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-COL-023](collaboration.md#sn-col-023), [SN-CI-018](ci-cd.md#sn-ci-018), [SN-BILL-010](billing.md#sn-bill-010) |
| Security controls | `OWASP-A04`, `CWE-770`, `OWASP-A09` |
| Extra labels | agent-ready |

#### Context
The architecture is deliberately zero-server (`docs/adr/0004-local-first-zero-server.md`) so running costs are small — but they are not zero, and nobody is tracking them. The recurring spend is: the optional ciphertext relay and its TURN bandwidth ([SN-COL-023](collaboration.md#sn-col-023) computes a cost per session-hour), the stateless entitlement service ([SN-BILL-004](billing.md#sn-bill-004)), website hosting/CDN ([SN-SITE-013](website.md#sn-site-013)), the domain, Apple Developer and Play Console fees, payment-gateway and store commissions ([SN-BILL-009](billing.md#sn-bill-009), [SN-BILL-010](billing.md#sn-bill-010)), a GIF provider API ([SN-MED-014](images-media.md#sn-med-014)), cloud device-farm minutes ([SN-QA-009](qa.md#sn-qa-009)), CI minutes and the self-hosted perf runner ([SN-GPRF-013](perf.md#sn-gprf-013)), and CDN egress for downloadable ML models ([SN-AI-008](ai.md#sn-ai-008), [SN-HWR-004](ocr-hwr.md#sn-hwr-004)). Two risks follow: a surprise bill from a runaway classroom relaying video-grade traffic, and Pro unit economics (₹83/month reference) that are underwater once TURN and gateway fees are counted.

#### Scope
**In:** `docs/ops/cost-model.md` — every recurring cost line with its driver (per session-hour, per GB egress, per device-minute, per transaction), the expected monthly baseline at three usage levels, and the per-Pro-user marginal cost checked against the reference price; provider budget alerts at 50/80/100% of the monthly budget routed to the maintainer; hard usage ceilings where the provider supports them (TURN bandwidth cap, CDN egress cap, device-farm minute cap) and the documented **degrade-not-bill** behaviour when a ceiling is hit (relay refuses new rooms with a clear client message; notes keep working); a monthly cost line in the ops review; a note in the pricing page source ([SN-SITE-005](website.md#sn-site-005)) if the model changes the plan story.
**Out:** pricing and plan definition ([SN-BILL-002](billing.md#sn-bill-002), [SN-BILL-010](billing.md#sn-bill-010)); the relay hosting decision ([SN-COL-023](collaboration.md#sn-col-023), `needs-decision`); tax/GST invoicing mechanics; performance budgets (unrelated meaning of the word, [SN-PERF-018](perf.md#sn-perf-018)).

#### Acceptance criteria
- [ ] `cost-model.md` lists every recurring cost line with owner, driver, unit price and the monthly budget; no line is "unknown".
- [ ] The per-Pro-user marginal cost (relay + TURN + gateway/store commission + support overhead) is computed and compared to the reference price, with the break-even user count stated.
- [ ] Budget alerts exist for every provider that supports them and are proven to fire in a test.
- [ ] Each service has a documented ceiling and a degrade path that never blocks local note-taking or sync through the user's own drive.
- [ ] A monthly cost check is part of the ops checklist and its result is recorded.

#### Technical notes
Derive the relay/TURN numbers from the measured bandwidth in [SN-COL-021](collaboration.md#sn-col-021) rather than guessing; a classroom of 40 with video-off ink traffic is the sizing case. Prefer providers whose budget alerting is free and whose caps are enforceable server-side; where only alerting exists, add the ceiling in the relay's own rate limiter ([SN-COL-023](collaboration.md#sn-col-023)). Keep the model as a small table plus the formula, so it can be recomputed when a price changes.

#### Security & privacy
Cost is an availability and abuse control as much as an accounting one: an unmetered TURN relay is a bandwidth amplifier for abusers (CWE-770 uncontrolled resource consumption, OWASP-A04 insecure design) and a route to denial of wallet. Ceilings and alerts are the mitigation; the degrade path must fail closed for the *service* and open for the *user's local data*. The cost document must contain no account numbers, provider credentials or contract terms (CWE-200); it references accounts by the register in [SN-GOPS-014](release.md#sn-gops-014).

#### UX notes
No end-user UI except the honest failure message when a ceiling is reached: a toast/dialog in the collaboration surface saying live collaboration is temporarily unavailable and that notes and sync are unaffected — written per the tone guide, using the standard error-state pattern.

#### Test plan
Manual/drill: set a temporary low budget on one provider and confirm the alert reaches the maintainer; set a low TURN ceiling and confirm the relay refuses new rooms with the documented client message while an existing local session keeps writing. Unit: the cost calculator spreadsheet/script reproduces the documented baseline from the [SN-COL-021](collaboration.md#sn-col-021) bandwidth numbers.

#### Dependencies
[SN-COL-023](collaboration.md#sn-col-023) (relay hosting and measured cost per session-hour), [SN-CI-018](ci-cd.md#sn-ci-018) (services pipeline), [SN-BILL-010](billing.md#sn-bill-010) (pricing).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Monthly cost review added to the ops checklist with a recorded first run


---

### SN-GOPS-009

<a id="sn-gops-009"></a>

**Define service SLOs and wire health checks, uptime probes and alerting**

| Field | Value |
|---|---|
| GitHub | #1105 |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | core, web |
| Areas | ci-cd, collaboration, release |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-CI-018](ci-cd.md#sn-ci-018), [SN-COL-023](collaboration.md#sn-col-023), [SN-BILL-004](billing.md#sn-bill-004) |
| Security controls | `OWASP-A09`, `MASVS-PRIVACY-1`, `CWE-532`, `ASVS-V16` |
| Extra labels | agent-ready |

#### Context
Three tiny services exist at launch: the ciphertext relay (`services/relay/`), the stateless entitlement verifier (`services/entitlements/`) and the website/CDN ([SN-SITE-013](website.md#sn-site-013)). [SN-COL-023](collaboration.md#sn-col-023) gives the relay a health check and a runbook, [SN-CI-018](ci-cd.md#sn-ci-018) deploys them, and [SN-REL-012](release.md#sn-rel-012) watches *client* crash-free sessions — but nothing watches whether the services are actually up, defines what "up" means, or tells the maintainer when they are not. The product degrades gracefully by design (notes and cloud-drive sync work with every service down; entitlements fail open to Free, [SN-BILL-005](billing.md#sn-bill-005)), which is exactly why an outage can go unnoticed for days while classrooms silently fail to connect.

#### Scope
**In:** `docs/ops/slos.md` defining a small number of honest objectives — relay availability and successful room-join rate, relay p95 join latency, entitlement verify availability and p95, website availability and Core Web Vitals floor — each with a measurement method, a window and an explicit "what the user sees when it is missed" statement; readiness/liveness endpoints on both services (no identifiers, no room ids in the response); an external uptime probe per service plus a synthetic canary that performs a real room join and a real entitlement verify with a test identity; alert routing to the maintainer with a severity split (page-worthy vs digest) and stated best-effort response expectations for a solo maintainer; a privacy-safe metrics set and dashboard honouring the relay log allow-list ([SN-COL-023](collaboration.md#sn-col-023)).
**Out:** security-finding alerting ([SN-GSEC-006](security.md#sn-gsec-006)); client crash/release health ([SN-REL-012](release.md#sn-rel-012), [SN-TEL-012](telemetry.md#sn-tel-012)); the public status page and user comms ([SN-GOPS-010](website.md#sn-gops-010)); cost alerts ([SN-GOPS-008](ci-cd.md#sn-gops-008)).

#### Acceptance criteria
- [ ] Every service exposes `/healthz` (liveness) and `/readyz` (readiness) returning no user, room or device identifiers and no build secrets.
- [ ] `slos.md` states an objective, a measurement window and a user-visible consequence per service; objectives are achievable by a single maintainer and say so.
- [ ] External probes run from outside the hosting provider and alert on sustained failure, not on a single blip.
- [ ] A synthetic canary joins a disposable room and verifies a sandbox entitlement on a schedule; its failure alerts separately from a plain probe failure.
- [ ] Dashboards and alerts contain only allow-listed fields — no room ids, user ids, IP addresses beyond aggregate counts, or note-derived data.
- [ ] An SLO miss produces a recorded entry that feeds the incident path ([SN-SEC-035](security.md#sn-sec-035)) when it is security-relevant and the status page ([SN-GOPS-010](website.md#sn-gops-010)) when it is user-visible.

#### Technical notes
Keep metrics cardinality tiny: counters and histograms, no per-room labels. Probes should verify the TLS certificate expiry as part of the check (a silent cert expiry is the most likely outage for a small service). The canary needs a dedicated sandbox identity and a room id namespace that the trust-and-safety block list ([SN-GOPS-007](collaboration.md#sn-gops-007)) ignores. Alerts go to the same maintainer channel used for security alerting so there is one place to look.

#### Security & privacy
Operations telemetry is the classic place where a zero-knowledge product leaks metadata (LINDDUN linkability): request logs with room ids and IPs re-identify classrooms. Controls: the [SN-COL-023](collaboration.md#sn-col-023) log allow-list, aggregate-only metrics, short retention, and MASVS-PRIVACY-1 minimisation. Health endpoints must not become an information-disclosure surface (CWE-200): no version strings that reveal unpatched builds to scanners beyond what is already public, no dependency dumps. Monitoring also *is* a security control (OWASP-A09): without it, an attack on the relay looks like silence.

#### UX notes
No in-app UI in this issue; the user-visible half is the status page and the "collaboration unavailable, your notes are fine" messaging in [SN-GOPS-010](website.md#sn-gops-010). The maintainer's surface is a single dashboard page and an alert message that names the service, the objective missed and the runbook link.

#### Test plan
Integration: kill the relay in staging and assert the probe alerts within the stated window and that the client shows the documented degraded state; expire a staging certificate and assert the cert check fires. Unit: health endpoints return the documented shape and contain none of the forbidden fields (a field allow-list test). Canary: run against staging on every deploy; a deliberate misconfiguration must fail it.

#### Dependencies
[SN-CI-018](ci-cd.md#sn-ci-018) (services deploy pipeline), [SN-COL-023](collaboration.md#sn-col-023) (relay operation and log allow-list), [SN-BILL-004](billing.md#sn-bill-004) (entitlement service).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] SLO misses recorded for the first month and reviewed against the objectives


---

### SN-IPAD-024

<a id="sn-ipad-024"></a>

**Stand up the TestFlight beta pipeline for signed iPad builds**

| Field | Value |
|---|---|
| GitHub | #325 |
| Type | infra |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, ios-phone |
| Areas | ci-cd, release |
| Size | M |
| SDLC | release |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-FND-003](ci-cd.md#sn-fnd-003), [SN-IPAD-021](privacy.md#sn-ipad-021) |
| Security controls | `MASVS-RESILIENCE-1`, `MASVS-CODE-2` |
| Extra labels | needs-credentials, agent-ready |

#### Context
Beta hardening (M7) needs a repeatable, signed path to put iPad builds in front of testers via TestFlight. This automates archive -> sign -> upload -> group distribution and plugs into the DevSecOps pipeline so every beta carries an SBOM and provenance (docs/security/devsecops-pipeline.md; docs/roadmap.md M7). Signing keys, the Apple Developer team and the App Store Connect API key are maintainer-supplied (needs-credentials).

#### Scope
**In:** a CI workflow that builds the release/beta flavour (`--dart-define` matrix, [SN-FND-005](devx.md#sn-fnd-005) flavours), archives via `xcodebuild`, signs with the Apple Developer identity from CI secrets, and uploads to TestFlight with tester groups; attach SBOM + provenance; require the privacy manifest gate ([SN-IPAD-021](privacy.md#sn-ipad-021)) to pass first.
**Out:** the App Store production submission/metadata ([SN-IPAD-023](release.md#sn-ipad-023)); the base CI workflow ([SN-FND-003](ci-cd.md#sn-fnd-003)).

#### Acceptance criteria
- [ ] A tagged beta build archives, signs and uploads to TestFlight automatically; testers in the configured groups receive it.
- [ ] The build fails if the privacy-manifest gate ([SN-IPAD-021](privacy.md#sn-ipad-021)) or any security scan fails.
- [ ] Signing identities and the App Store Connect API key come only from CI secrets — nothing committed (gitleaks/trufflehog clean).
- [ ] Each beta artefact has an attached SBOM (CycloneDX+SPDX) and provenance (docs/roadmap.md M8 targets, applied from M7 betas).
- [ ] The auth-bypass release-mode test passes so no dev bypass ships in a beta.

#### Technical notes
`fastlane`/`xcodebuild` in `.github/workflows/`; consume the build flavours from [SN-FND-005](devx.md#sn-fnd-005) and the base CI from [SN-FND-003](ci-cd.md#sn-fnd-003). Reference docs/security/devsecops-pipeline.md (SBOM/provenance/SLSA) and CLAUDE.md §7.5 (auth bypass impossible in release). Store credentials in CI secrets only.

#### Security & privacy
Supply-chain integrity: signed builds, SBOM + provenance per beta (MASVS-CODE-2, SLSA target). Release hardening: no secrets committed, dev auth-bypass proven unreachable (MASVS-RESILIENCE-1, CLAUDE.md §7.5). No content/tokens in build logs; credentials injected, never printed.

#### UX notes
None beyond baseline (no user-facing UI). Baseline privacy: build logs never contain content/tokens/keys; the beta build must not embed the watermarked Sage placeholder in a public-facing way (CLAUDE.md §9 — betas are internal/tester-only and tagged not-releasable until original art exists).

#### Test plan
CI dry-run on a branch: `.github/workflows/testflight.yml` builds + signs a beta to a staging lane; assert the manifest gate and auth-bypass test block a bad build. Manual: confirm a build appears in TestFlight for a test group.

#### Dependencies
[SN-FND-003](ci-cd.md#sn-fnd-003) Flutter CI workflow; [SN-IPAD-021](privacy.md#sn-ipad-021) privacy manifest; build flavours [SN-FND-005](devx.md#sn-fnd-005).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/security/devsecops-pipeline.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS (CI/release) review

---

### SN-IPAD-031

<a id="sn-ipad-031"></a>

**Configure the iOS and iPadOS app target: deployment target, capabilities, entitlements**

| Field | Value |
|---|---|
| GitHub | #814 |
| Type | infra |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, ios-phone |
| Areas | ci-cd, compat |
| Size | S |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-2`, `MASVS-RESILIENCE-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready, needs-credentials |

#### Context
Every later iPad issue assumes an Xcode target that is configured correctly, and today nothing owns that: docs/platform/ipad.md §1 fixes `IPHONEOS_DEPLOYMENT_TARGET = 17.0`; §9 makes iPad multitasking a store expectation ("do not lock orientation or opt out of resizability"); and the feature issues each require a capability — associated domains for Universal Links ([SN-IPAD-020](security.md#sn-ipad-020)), App Groups for widgets ([SN-IPAD-016](notifications.md#sn-ipad-016)), the iCloud container for Drive sync ([SN-SYNC-003](sync.md#sn-sync-003)), Keychain sharing for the key hierarchy ([SN-CRY-002](security.md#sn-cry-002)), the audio background mode for recording ([SN-AUD-002](audio.md#sn-aud-002)), and Siri/App Intents ([SN-IPAD-015](notifications.md#sn-ipad-015)). Getting this wrong is expensive and late-breaking: a plugin quietly raising the deployment target drops Tier 2 iPads off the support matrix, and an over-broad entitlement is an attack-surface and review problem. iPad is an **M1** surface (docs/roadmap.md M1 ships the editor on iPad), so the target baseline must exist before the editor lands, which is why this sits in M1 rather than M5 with the rest of the area.

#### Scope
**In:** the `ios/` Runner target configuration for the dev/beta/release flavours from [SN-FND-005](devx.md#sn-fnd-005) (bundle id suffixes, display names, build settings); pinning `IPHONEOS_DEPLOYMENT_TARGET = 17.0` for the app and every plugin podspec with a CI check that fails on drift; the checked-in `*.entitlements` files and a documented capability inventory (one row per capability: what needs it, which issue, why); multitasking compliance settings (`UIRequiresFullScreen = false`, no locked orientation, all size classes supported); a CI script that diffs the built app's entitlements against the documented inventory.
**Out:** privacy usage-description strings and the privacy manifest (privacy area [SN-PRV-001](privacy.md#sn-prv-001) and [SN-IPAD-021](privacy.md#sn-ipad-021)); signing identities, provisioning and TestFlight upload ([SN-IPAD-024](ci-cd.md#sn-ipad-024)); App Store Connect metadata ([SN-IPAD-023](release.md#sn-ipad-023)).

#### Acceptance criteria
- [ ] `flutter build ipa` succeeds for the dev, beta and release flavours with distinct bundle ids and display names ([SN-FND-005](devx.md#sn-fnd-005)).
- [ ] The app and every plugin podspec declare `IPHONEOS_DEPLOYMENT_TARGET = 17.0`; CI fails if any pod raises it above 17.0.
- [ ] The target supports all orientations and is resizable (`UIRequiresFullScreen` absent/false), so Split View, Slide Over and Stage Manager work (docs/platform/ipad.md §9).
- [ ] Entitlements files are checked in, contain **no** secrets or team-specific values beyond placeholders injected at build time, and match a documented inventory table in docs/platform/ipad.md.
- [ ] A CI script compares the entitlements of the built artifact to the inventory and fails on any undocumented capability (least privilege).
- [ ] The dev flavour's `--dart-define=SANE_AUTH_BYPASS=true` path still compiles out of release (the three-layer guard in CLAUDE.md §7.5 is untouched and `app/test/security/auth_bypass_test.dart` stays green).
- [ ] The debug/dev build runs on an iPadOS 17 device and on the Tier 1 lab iPads.

#### Technical notes
Configure via `ios/Runner.xcodeproj` build settings plus `ios/Flavors/*.xcconfig` so flavours differ by configuration, not by forked targets ([ADR-0002](docs/adr/0002-monorepo-layout.md) monorepo layout, [SN-FND-005](devx.md#sn-fnd-005) flavour matrix). Keep the capability inventory in docs/platform/ipad.md so the doc a new agent reads is the same list CI enforces. Team id, App Group id and iCloud container id come from the maintainer's Apple Developer account and are injected from CI secrets — never committed (`needs-credentials`). Do not add a capability "for later": add it in the issue that needs it, with its inventory row.

#### Security & privacy
Entitlements are trust-boundary declarations: each one widens what the app (and anything compromised inside it) may reach, so the inventory enforces least privilege and the CI diff catches silent additions from a transitive plugin (MASVS-PLATFORM-1, MASVS-CODE-2). Keychain-sharing and App-Group entitlements create shared at-rest storage — those containers hold metadata only and carry `FileProtectionType.complete` (MASVS-STORAGE-1; see [SN-IPAD-016](notifications.md#sn-ipad-016)). Associated-domains entries must list only domains the project controls, since a stale entry is a deep-link hijack path ([SN-IPAD-020](security.md#sn-ipad-020)). No signing keys, team ids or client secrets in the repo — gitleaks/trufflehog enforce it (MASVS-RESILIENCE-1, CLAUDE.md §7.2). Any new egress-capable capability needs an ADR + threat-model row (CLAUDE.md §7.4).

#### UX notes
None beyond baseline — this is build configuration with no shipped UI. The user-visible consequences are that the app resizes correctly in every window class (validated in [SN-IPAD-010](compat.md#sn-ipad-010)) and that dev/beta builds are visually distinguishable by display name and icon badge so a tester never mistakes a bypass-enabled dev build for the real app; the badge uses the brand assets in design/ and must not ship on release (docs/design/design-system.md).

#### Test plan
CI: `tools/scripts/check_ios_deployment_target.mjs` (all podspecs pinned at 17.0) and `tools/scripts/check_ios_entitlements.mjs` (built entitlements ⊆ documented inventory) wired into the DevSecOps workflow. Unit: `app/test/security/auth_bypass_test.dart` re-run to prove the release build cannot reach the bypass. Manual: build and launch each flavour on an iPadOS 17 device and on the Tier 1 lab iPads; rotate and resize in Split View/Stage Manager to confirm resizability.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) monorepo scaffold; [SN-FND-005](devx.md#sn-fnd-005) build flavours & dart-define matrix.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-WEB-017

<a id="sn-web-017"></a>

**Provision web hosting and CDN on an isolated origin with edge headers**

| Field | Value |
|---|---|
| GitHub | #830 |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | ci-cd, release |
| Size | M |
| SDLC | release |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-011](compat.md#sn-web-011), [SN-CI-004](ci-cd.md#sn-ci-004) |
| Security controls | `MASVS-NETWORK-1`, `ASVS-V3`, `ASVS-V13`, `CWE-319`, `OWASP-A05`, `SSDF-PO.5` |
| Extra labels | needs-credentials, needs-decision |

#### Context
The web app must be served from **its own origin** with COOP/COEP, a nonce-injecting CSP, Brotli compression and long-lived immutable caching — an ordinary static host with default settings cannot deliver any of that (`docs/platform/web.md` §8–§9, `docs/adr/0010-web-pwa-strategy.md` decision 2). Origin isolation is not a preference: sharing an origin with the marketing site or docs would place unaudited content inside the same storage and script context as the notes database. This issue provisions the hosting, wires the deploy from CI with SBOM and provenance attached, and makes the header set enforceable at the edge. It is deliberately **not** agent-ready: it needs a maintainer decision on the host/CDN vendor and the domain layout, plus credentials that must never be committed.

#### Scope
**In:** the hosting/CDN configuration as code, the app origin (for example `app.sane.<tld>`) separate from the marketing/docs origin, TLS and HSTS, nonce injection per response, Brotli/gzip negotiation, immutable cache-control for hashed assets and no-store for the shell, an atomic deploy with rollback, and preview deployments for PRs with headers identical to production.
**Out:** the marketing site itself, the header specification ([SN-WEB-016](security.md#sn-web-016)), the CSP policy ([SN-WEB-014](security.md#sn-web-014)), and store/release engineering for the native apps.

#### Acceptance criteria
- [ ] The app is served from a dedicated origin that hosts **nothing** except the PWA; a documented DNS/origin map exists.
- [ ] TLS 1.3 (1.2 minimum) with HSTS; plain HTTP redirects to HTTPS and no mixed content exists.
- [ ] Every response carries the headers from `web/headers.json` plus CSP with a **per-response** nonce; a synthetic check runs post-deploy and fails the deploy on a missing header.
- [ ] Hashed assets are served `immutable, max-age=31536000`; `index.html` and the service worker are served `no-cache` so an update is never pinned by the CDN.
- [ ] Brotli is negotiated; the transfer sizes match what [SN-WEB-003](perf.md#sn-web-003) measured within tolerance.
- [ ] Deploys are atomic with one-command rollback to the previous build, and the deployed commit SHA is retrievable from a build-info endpoint (no secrets).
- [ ] The deploy runs from CI using OIDC/short-lived credentials — no long-lived secret in a workflow file — and attaches the SBOM and provenance from [SN-CI-004](ci-cd.md#sn-ci-004).
- [ ] PR preview deployments carry the same headers and are `noindex`.

#### Technical notes
Generate host config from `web/headers.json` with `tools/scripts/gen_edge_headers.mjs` ([SN-WEB-016](security.md#sn-web-016)) so the spec and the edge cannot drift. Nonce injection requires an edge function or equivalent — confirm the chosen vendor supports it before committing to the vendor, because a static-only host forces a weaker CSP and that trade-off must go back to the maintainer. Keep the zero-server posture: this origin serves **static bytes plus headers only**; it never receives note content, and the service worker handles the share-target POST locally ([SN-WEB-012](sharing-export.md#sn-web-012), ADR-0004). Pin all deploy actions to full commit SHAs (checklist §10). Supports `PRD-CO-412`–`PRD-CO-415`.

#### Security & privacy
**needs-decision:** hosting/CDN vendor and domain layout (must support edge nonce injection, COOP/COEP and immutable caching). **needs-credentials:** DNS control, CDN account, and a CI OIDC trust relationship — supplied by the maintainer via CI secrets, never committed (checklist §0.1, CWE-798). Threats: an origin shared with untrusted content (ASVS-V3, CWE-1021); cleartext or downgraded transport (CWE-319, MASVS-NETWORK-1); a CDN-level compromise or log retention capturing user requests (OWASP-A05, MASVS-PRIVACY-3); a long-lived deploy token (CWE-798, ASVS-V13). Controls: dedicated origin; TLS 1.2+ and HSTS; deny-by-default headers; **access logs configured to retain no query strings or fragments and the shortest feasible retention**, documented in the privacy dashboard (`PRD-PRIV-001`); short-lived OIDC credentials; SLSA provenance and SBOM attached per release ([SN-CI-004](ci-cd.md#sn-ci-004), SSDF-PO.5).

#### UX notes
Invisible infrastructure with two user-visible consequences: first load speed (budget B6, < 3 s cached) and the fact that a deploy never strands a user on a half-updated app — the update prompt from [SN-WEB-011](compat.md#sn-web-011) depends on `index.html` and the worker being uncached at the edge. No in-app UI changes, so the **17 looks × light/dark** matrix is untouched and the `sane_ui` theme goldens ([SN-DS-002](design-system.md#sn-ds-002)) remain its coverage; the one surface this issue owns is the host-level error page (502/404), which must be a plain, branded page built from `docs/design/design-system.md` tokens, correct in **light and dark**, with ≥ 4.5:1 contrast, no reliance on colour alone, a keyboard-reachable retry link and no leaked server or path details (CWE-209).

#### Test plan
- `tools/scripts/__tests__/gen_edge_headers_test.mjs` — config generation and drift detection against `web/headers.json`.
- A post-deploy synthetic check (`tools/scripts/post_deploy_check.mjs`) asserting headers, TLS version, compression, cache-control and `crossOriginIsolated`.
- `app/integration_test/web/deploy_smoke_test.dart` — boot, create a note, reload from cache against the deployed preview.
- Manual: rollback drill; HSTS preload readiness check; verify PR previews are `noindex`.

#### Dependencies
[SN-WEB-011](compat.md#sn-web-011), [SN-CI-004](ci-cd.md#sn-ci-004); blocks the enforcement half of [SN-WEB-014](security.md#sn-web-014), [SN-WEB-015](security.md#sn-web-015), [SN-WEB-016](security.md#sn-web-016).

#### Definition of done
- [ ] Infrastructure-as-code + checks merged, CI green (lint, analyze, unit, security scans)
- [ ] ADR/docs record the vendor decision, domain map and log-retention posture
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2 and §10 with CODEOWNERS security review

---

