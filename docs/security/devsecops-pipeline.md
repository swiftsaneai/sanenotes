# Sane Notes — DevSecOps Pipeline

> Audience: an autonomous coding agent (or engineer) who edits CI, reads a failing check, or
> needs to know **what runs, why, and what still has to be added**. This documents the actual
> jobs in [`../../.github/workflows/devsecops.yml`](../../.github/workflows/devsecops.yml) and
> [`../../.github/workflows/scorecard.yml`](../../.github/workflows/scorecard.yml), the jobs
> **still to add** (CodeQL, Flutter analyze/test, MobSF, ZAP, perf gates, SBOM, signing), the
> **branch-protection** and **secrets** policy, and the **incident-response** and **disclosure**
> runbooks.
>
> This is the enforcement layer for [`ssdlc-process.md`](ssdlc-process.md)'s gates,
> [`secure-coding-checklist.md`](secure-coding-checklist.md)'s rules, and
> [`controls-matrix.md`](controls-matrix.md)'s controls. Blueprint:
> `research/security-standards-and-devsecops.md` §6–§7.

---

## 0. Layout & principles

Two workflows exist today:

| Workflow | Trigger | Purpose |
|---|---|---|
| `devsecops.yml` | `push`→main, all `pull_request`, weekly `cron` (Mon 03:17 UTC) | The core scan suite: secrets, SAST, SCA, dependency-review, filesystem/config, workflow-lint, issue-schema |
| `scorecard.yml` | `branch_protection_rule`, weekly `cron` (Tue 04:30 UTC), `push`→main | OpenSSF Scorecard repo-health scoring + SARIF upload |

**Global hardening already in place** (matches `research/security-standards-and-devsecops.md`
§7):

- **Least-privilege token:** `permissions: contents: read` at the top of `devsecops.yml`;
  jobs escalate narrowly (only `dependency-review` gets `pull-requests: write` to post its
  summary). `scorecard.yml` is `read-all` top-level with `security-events: write` +
  `id-token: write` scoped to the one job that needs them.
- **Concurrency:** `devsecops-${{ github.ref }}` with `cancel-in-progress: true` cancels
  superseded runs.
- **Weekly full scan** via `cron` catches drift in dependencies/config even with no commits.

**Principles to keep when editing CI:**
1. Pin actions (see §5 — currently version tags; **migrate to full commit SHAs**).
2. Never `checkout` untrusted PR code under a privileged token; never inline untrusted input
   into a `run:` (pass via `env:`).
3. Non-blocking scanners upload SARIF (`continue-on-error`) so findings surface in Code
   Scanning without breaking unrelated PRs; **turn the security-critical ones blocking** as the
   codebase matures (§4).

---

## 1. Jobs that exist today (`devsecops.yml`)

### 1.1 `secrets` — Secret scanning (gitleaks)

- **What:** `gitleaks/gitleaks-action@v2` over full history (`fetch-depth: 0`).
- **Why:** catches committed API keys/tokens/private keys (gate rule §0 of the checklist; M1
  Improper Credential Usage; SSDF PS.1). Complements GitHub **push protection** (blocks at
  commit time) and the pre-commit hook.
- **Controls:** TM-I-05 adjacency, Mobile-Top-10 M1, SSDF PS.1.
- **To strengthen:** add **trufflehog** (entropy + live-credential verification) as a second
  pass (`research/security-standards-and-devsecops.md` §6.2); make it blocking on PRs.

### 1.2 `sast` — Static analysis (Semgrep)

- **What:** runs in the `semgrep/semgrep` container:
  `semgrep ci --config p/default --config p/owasp-top-ten --config p/secrets --config
  p/javascript --config p/kotlin --config p/swift --config p/dart` → SARIF → Code Scanning.
- **Why:** the practical cross-language SAST. **Semgrep is the only SAST that covers Dart**
  (CodeQL does **not** support Dart) — Swift/Kotlin/JS are GA, Dart is experimental
  (`research/security-standards-and-devsecops.md` §6.1). Covers injection, crypto misuse,
  dangerous sinks.
- **Controls:** MASVS-CODE-3, A03 Injection, SSDF PW.7.
- **Note:** currently `|| true` + `continue-on-error` (non-blocking). **Make high/critical
  findings blocking** on PRs once the baseline is clean.

### 1.3 `sca` — Dependency vulnerabilities (OSV-Scanner)

- **What:** `google/osv-scanner-action@v2`, recursive over all lockfiles
  (`pubspec.lock`, Gradle, `package-lock.json`, `Package.resolved`).
- **Why:** the official OSV frontend; covers every ecosystem in the monorepo (pub, Gradle/Maven,
  npm, SPM). Vulnerable/outdated components (A06/2021, A03/2025 supply chain; MASVS-CODE-2).
- **To strengthen:** currently `continue-on-error`. Pair with the PR `dependency-review` gate
  (§1.4) which *is* blocking on high severity.

### 1.4 `dependency-review` — PR dependency gate

- **What:** `actions/dependency-review-action@v4` on `pull_request` only,
  `fail-on-severity: high`, `comment-summary-in-pr: always`; needs `pull-requests: write`.
- **Why:** **blocks a PR** that introduces a high-severity vulnerable dependency; can enforce a
  license allow-list. This is the main *blocking* supply-chain gate.
- **Controls:** A06/2021, A03/2025, MASVS-CODE-2, SSDF PW.4.
- **To strengthen:** add `allow-licenses`/`deny-licenses` to enforce the license policy from
  the checklist §10.

### 1.5 `iac-and-fs` — Filesystem & config scan (Trivy)

- **What:** `aquasecurity/trivy-action@0.28.0`, `scan-type: fs`, scanners `vuln,secret,misconfig`,
  severities `CRITICAL,HIGH`, `exit-code: 0` (non-blocking), SARIF → Code Scanning.
- **Why:** catches vulnerable files, embedded secrets, and misconfigurations (incl. future IaC
  / the relay Dockerfile). A05 Security Misconfiguration; A02/2025.
- **To strengthen:** when the relay ships, add a **container image** scan and have Trivy **emit
  the CycloneDX SBOM** (§2.6); raise `exit-code` to blocking for CRITICAL.

### 1.6 `actions-lint` — Workflow lint (actionlint)

- **What:** `raven-actions/actionlint@v2`.
- **Why:** catches workflow syntax errors, shell-injection patterns, and unsafe expressions in
  the workflows themselves (dangerous-workflow class). SSDF PO.3; Scorecard Dangerous-Workflow.

### 1.7 `issues-schema` — Issue files valid

- **What:** Node 22 runs `scripts/validate-issues.mjs --stats`.
- **Why:** enforces the machine-readable backlog schema (`../../issues/SCHEMA.md`) so the
  Security & privacy sections and `security` control-ID arrays stay well-formed — traceability
  (ssdlc §0).

### 1.8 `scorecard.yml` — OpenSSF Scorecard

- **What:** `ossf/scorecard-action@v2.4.0` → SARIF; `persist-credentials: false`;
  `publish_results: true`.
- **Why:** scores repo health (Branch-Protection, Pinned-Dependencies, Token-Permissions,
  Code-Review, Signed-Releases, SAST, Security-Policy, Dangerous-Workflow, Maintained, etc.),
  which map almost 1:1 to the hardening items here (`research/security-standards-and-devsecops.md`
  §3.3). Publishes a badge and drives the maintenance-phase drift check.

---

## 2. Jobs still to add (tracked as infra issues)

These complete the blueprint (`research/security-standards-and-devsecops.md` §6, "DevSecOps
pipeline blueprint"). Each should be its own `SN-INFRA-*` issue.

### 2.1 `lint-dart` / `unit-tests` — Flutter analyze & test *(add first)*

- `dart format --set-exit-if-changed .`, `dart analyze --fatal-infos`, the **arch-lint**
  (`tools/scripts/arch_check`: package-DAG + `package:flutter` ban on pure-Dart pkgs +
  `print()` ban), then `flutter test` (unit/widget/golden) with a coverage gate.
- Includes the **security tests**: `app/test/security/auth_bypass_test.dart` (proves the dev
  auth bypass is unreachable in release — TM-E-01), crypto/KDF tests, log-redaction tests.
- **Blocking on PRs.** Enforces checklist §0 gate rules and overview §9.

### 2.2 `codeql` — CodeQL for Swift / Kotlin / JS-TS

- Matrix: `swift` + `kotlin`/`java` **on a macOS runner** (Swift analysis requires macOS),
  `javascript-typescript` on ubuntu. **Dart is excluded** (unsupported) — covered by Semgrep
  (§1.2). Upload SARIF to Code Scanning.
- Controls: SSDF PW.7; deepens SAST beyond Semgrep for the native/web code.

### 2.3 `mobsfscan` — mobile source SAST

- `mobsfscan` over Kotlin/Swift/Java/ObjC + `Info.plist`/Android XML; MASVS/Mobile-Top-10/CWE
  tagged; SARIF → Code Scanning. Has a native GitHub Action + pre-commit.
- Controls: MASVS-CODE-3, Mobile Top 10, MASTG (matrix §2).

### 2.4 `mobsf` — MobSF static (+ optional dynamic) on the RC build

- Runs MobSF against the nightly/RC APK/AAB/IPA (static; dynamic optional/self-hosted). Verify
  stage (ssdlc §2.4). Blocking on release candidates for high MASVS findings.

### 2.5 `zap-baseline` (PR) & `zap-full-scan` (nightly) — DAST

- **Baseline** (passive) against an ephemeral preview of the web app + relay on every PR;
  **full active scan** nightly against staging with an OpenAPI import. OWASP ZAP official
  actions.
- Controls: ASVS V1–V4/V17, A01/A03/A10 (web), TM-I-06. Activates when `website/`/`services/`
  ship.

### 2.6 `sbom` & `provenance` — supply-chain integrity (release)

- Generate **CycloneDX + SPDX** SBOMs per artifact (client bundles + relay image); attach to
  the GitHub Release. Emit **SLSA provenance** via `actions/attest-build-provenance`
  (target L3 for release artifacts).
- Controls: 2025 A03, SSDF PS.2, SLSA (matrix §8).

### 2.7 `signing` / `release` — signed, notarized release

- Android **Play App Signing** (upload key via OIDC/secret) + mapping file; iOS App Store
  signing; **Apple notarization** (`notarytool`) for desktop; signed git tag; deploy services
  via **OIDC** (no static creds). Environment-gated (`release.yml`).
- Controls: SSDF PS.2/PS.3, MASVS-RESILIENCE-2.

### 2.8 `perf-gates` — decision-7 budgets

- `tools/perf_harness` on reference devices (device lab): pen-to-pixel latency, fps floor,
  cold start, memory. A security fix that regresses latency still fails here (overview §6,
  locked decision 7). Not "security" per se, but a required merge gate on editor changes.

### 2.9 `fuzzing` — parser fuzzing

- Fuzz corpus against `sane_pdf`, `sane_audio`, image decode, `.sanenote` unpack;
  AddressSanitizer for native/C decoders. Closes TM-E-04, TM-D-01. Runs on parser changes and
  nightly.

### Pipeline coverage at a glance

| Stage | PR | Nightly | Release | Status |
|---|---|---|---|---|
| format/analyze/arch-lint | ✓ | | | to add |
| unit/widget/golden + security tests | ✓ | | | to add |
| Semgrep SAST | ✓ | ✓ | | **live** (non-blocking) |
| CodeQL | ✓ | | | to add |
| mobsfscan | ✓ | | | to add |
| gitleaks (+trufflehog) | ✓ | ✓ | | **live** (gitleaks) |
| OSV-Scanner | ✓ | ✓ | | **live** |
| dependency-review | ✓ | | | **live (blocking)** |
| Trivy fs/config (+image, +SBOM) | ✓ | ✓ | | **live** (fs) |
| actionlint | ✓ | | | **live** |
| ZAP baseline / full | ✓ | ✓ | | to add |
| MobSF | | ✓ | ✓ | to add |
| fuzzing | ✓(parsers) | ✓ | | to add |
| perf gates | ✓(editor) | | | to add |
| SBOM + provenance + signing | | | ✓ | to add |
| Scorecard | | ✓ | ✓ | **live** |

---

## 3. Branch protection settings (`main` + release branches)

Configure in repo settings (Scorecard's Branch-Protection check verifies these):

- **Require a pull request** before merging; **≥ 1 approving review**; dismiss stale approvals
  on new commits.
- **Require CODEOWNERS review** — `../../.github/CODEOWNERS` forces the Maintainer on
  `/docs/security/`, `/.github/`, `/packages/sane_crypto/`, `/packages/sane_sync/`,
  `/app/lib/auth/`.
- **Require status checks to pass** (and branch up to date). Make **blocking**: `lint-dart`,
  `unit-tests`, `dependency-review`, and (once baselines are clean) `sast`, `codeql`,
  `mobsfscan`, `secrets`. Keep noisy scanners as non-blocking SARIF uploads until triaged.
- **Require signed commits** (GPG/SSH/Sigstore gitsign) on protected branches (SSDF PS.1).
- **Require linear history**; **no force-push**; **no branch deletion**.
- **Include administrators** in restrictions (no bypass).
- **Restrict who can push**; PRs only.

---

## 4. Making scanners blocking (rollout order)

Today several jobs are `continue-on-error`/`|| true` so a green baseline can be established.
Promote to blocking in this order, each behind its own PR that first clears the backlog:

1. `dependency-review` (already blocking on high) → keep.
2. `secrets` (gitleaks) → blocking on PRs.
3. `lint-dart` + `unit-tests` (once they exist) → blocking.
4. `sast` (Semgrep) high/critical → blocking after triaging the baseline.
5. `codeql` + `mobsfscan` → blocking after baseline triage.
6. Trivy CRITICAL → blocking.

Non-blocking-but-uploaded is fine for the rest; findings still appear in Code Scanning and are
triaged in the verification phase.

---

## 5. Secrets policy

- **No secrets in the repo — ever** (gate rule §0). Enforced by push protection + gitleaks
  (+trufflehog). Runtime config comes from `--dart-define` (overview §7.1); production client
  IDs/secrets are injected from **GitHub Actions secrets** at build time.
- **Least-privilege `GITHUB_TOKEN`:** `contents: read` default; escalate per-job only where
  required (as `dependency-review` does).
- **Deploys use OIDC**, not long-lived cloud credentials (relay/entitlement deploy).
- **Signing keys:** Android uses **Play App Signing** (Google holds the app signing key; we
  hold only an upload key); Apple signing/notarization creds live in CI secrets / the Apple
  developer account, never in the repo.
- **Rotation:** rotate any CI secret or signing credential on suspicion of exposure (see §6);
  prefer short-lived OIDC tokens over static secrets wherever possible.
- **Environment protection:** the `release` environment is gated (required reviewers) so a tag
  push cannot ship without human approval.

---

## 6. Incident-response runbook

Extends [`ssdlc-process.md`](ssdlc-process.md) §4. Trigger: a report to
`security@swiftsane.ai` or a private GitHub Security Advisory
([`../../SECURITY.md`](../../SECURITY.md)), a scanner alert, or a Scorecard/Dependabot alert.

1. **Acknowledge & open a private advisory** (48 h SLA). Assign the Security Owner; do **not**
   open a public issue.
2. **Classify severity** (ssdlc §3 table). A plaintext-note-disclosure or key-compromise is
   **Critical** regardless of CVSS.
3. **Contain:**
   - Affected release → halt/roll back rollout (App Store/Play staged release; pull the build if
     needed).
   - Suspected CI-secret/signing-key compromise → **rotate immediately**, revoke provenance
     trust, invalidate affected tokens, review recent releases for tampering.
   - Suspected dependency implant → pin/patch/remove the dependency; audit the SBOM.
4. **Assess scope & data impact:** which versions/platforms; is any **personal data** at risk?
   By design (zero-knowledge E2EE) note plaintext should **not** be exposed by a server/cloud
   breach — confirm the specific path. If personal data is at risk, **start the GDPR 72 h
   breach clock** (notify the supervisory authority; DPDP notification too).
5. **Remediate:** develop the fix on a private branch, **add a regression test** so the bug
   can't return, run the full gate suite, ship a **signed hotfix** through `release.yml`.
6. **Disclose:** publish the advisory when the fix is out; credit the reporter unless they
   decline; notify affected users if personal data was at risk; update release notes.
7. **Post-incident:** root-cause analysis (SSDF RV.3); update
   [`threat-model.md`](threat-model.md), [`secure-coding-checklist.md`](secure-coding-checklist.md),
   and add/adjust a **CI gate** so the class of bug is caught automatically next time.

**Contacts & channels:** `security@swiftsane.ai` (PGP key at `docs/security/pgp.txt` — to be
published), private GitHub Security Advisory. Out of scope: third-party service internals,
social engineering, volumetric DoS (SECURITY.md).

---

## 7. Disclosure policy (summary)

From [`../../SECURITY.md`](../../SECURITY.md):

- **Report privately** (email or private advisory); never a public issue for a security bug.
- **Our commitments:** acknowledge ≤ 48 h, triage ≤ 7 days, fix critical ≤ 30 days (full SLA in
  ssdlc §3).
- **Coordinated disclosure:** advisory published when the fix ships; **reporters credited** in
  release notes unless they prefer otherwise.
- **Scope:** the apps + shared packages, the (future) minimal `services/`, and the build/release
  pipeline. **Supported versions:** only the latest released minor per platform gets fixes.

---

## 8. Quick reference — "a check failed, what do I do?"

| Failing check | Likely cause | Fix |
|---|---|---|
| `secrets` (gitleaks) | A key/token/secret in the diff or history | Remove it, rotate the credential, move config to `--dart-define`/CI secret; never just delete from HEAD (history retains it) |
| `sast` (Semgrep) | Dangerous sink / crypto misuse / injection | Fix per [`secure-coding-checklist.md`](secure-coding-checklist.md); suppress only with a justified inline comment + reviewer sign-off |
| `dependency-review` | New dep with a high-severity CVE or bad license | Upgrade/replace/remove the dep; justify in the PR (checklist §10) |
| `sca` (OSV) | A lockfile pins a vulnerable version | Bump via Dependabot PR or manually; re-lock |
| `iac-and-fs` (Trivy) | Secret/misconfig/vuln in files | Remediate the flagged file/config |
| `actions-lint` | Workflow syntax / injection pattern | Fix the workflow; pass untrusted input via `env:`, never inline into `run:` |
| `issues-schema` | An `issues/*.json` file violates the schema | Fix per [`../../issues/SCHEMA.md`](../../issues/SCHEMA.md) (esp. the Security & privacy section) |
| `lint-dart`/`unit-tests` *(once added)* | Format/analyze/arch-lint/test failure | `dart format .`, fix analyzer infos, respect the package DAG, fix/add tests |

Keep this table and §2's "still to add" list current as the pipeline grows — update it in the
same PR that changes a workflow.
