# Sane Notes — Secure SDLC Process

> Audience: an autonomous coding agent (or engineer/maintainer) running work through the
> lifecycle. This document defines the **shift-left security process**: what happens in each
> SDLC phase, the **gate** that must pass to leave the phase, who is responsible, and the
> **Definition of Done**. It operationalises NIST SSDF (SP 800-218), OWASP SAMM v2, and the
> Microsoft SDL practices from `research/security-standards-and-devsecops.md` §2, for a small
> team (initially a single maintainer + autonomous coding agents).
>
> Cross-refs: [`threat-model.md`](threat-model.md),
> [`secure-coding-checklist.md`](secure-coding-checklist.md),
> [`controls-matrix.md`](controls-matrix.md),
> [`devsecops-pipeline.md`](devsecops-pipeline.md), [`../../SECURITY.md`](../../SECURITY.md),
> [`../../issues/SCHEMA.md`](../../issues/SCHEMA.md),
> [`../../.github/PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md).

---

## 0. Principles

1. **Shift left.** The cheapest place to fix a security bug is before it is written. The
   threat model drives requirements; scanners run on every PR; releases are the last gate, not
   the first.
2. **Every issue carries security.** The issue schema has a mandatory **Security & privacy**
   section and an optional `security` control-ID array
   ([`../../issues/SCHEMA.md`](../../issues/SCHEMA.md)); "None beyond baseline" is allowed only
   for pure UI polish.
3. **Automate the gates.** A human (or agent) reviewer should spend attention on design and
   logic, not on things a linter/scanner can catch. CI is the enforcement layer
   ([`devsecops-pipeline.md`](devsecops-pipeline.md)).
4. **Traceability.** Requirement (`PRD-*`) → issue (`SN-*`) → control (`MASVS-*`/`ASVS-*`/`TM-*`)
   → test → CI gate. Any control must be traceable from law/standard to the line of code that
   satisfies it via [`controls-matrix.md`](controls-matrix.md).

The `sdlc` field on every issue (`requirements | design | implementation | verification |
release | maintenance`) marks which phase it is in.

---

## 1. Roles & responsibilities (RACI)

The team is small; roles are hats, not headcount. SSDF PO.2 ("roles and responsibilities").

| Role | Who (initially) | Owns |
|---|---|---|
| **Maintainer / Security Owner** | Jatin Kumar Singh (`@jatinsingh1603`) | Final security sign-off, disclosure handling, secrets, signing keys, CODEOWNERS approvals, threat-model completeness. |
| **Implementer** | Coding agent or engineer on the issue | Fills the issue's Security section, writes code + tests to the checklist, keeps CI green. |
| **Reviewer** | Maintainer (CODEOWNERS-required for security paths) | Reviews against [`secure-coding-checklist.md`](secure-coding-checklist.md); blocks on gate rules. |
| **Release Manager** | Maintainer | Runs `release.yml`, verifies signing/SBOM/provenance, store submission. |
| **Triage** | Maintainer | Vulnerability intake per [`../../SECURITY.md`](../../SECURITY.md), SLA tracking. |

CODEOWNERS (`../../.github/CODEOWNERS`) hard-requires the Maintainer's review on
`/docs/security/`, `/.github/`, `/packages/sane_crypto/`, `/packages/sane_sync/`, and
`/app/lib/auth/` — the security-critical paths.

| Activity | Implementer | Reviewer | Maintainer/Sec Owner | Release Mgr |
|---|---|---|---|---|
| Threat-model update | R | C | A | — |
| Security design review | C | R | A | — |
| Code + tests to checklist | A/R | C | I | — |
| PR security review | I | A/R | C (sec paths) | — |
| Release signing/SBOM/provenance | — | — | C | A/R |
| Vuln triage & patch | R | C | A | I |

R=Responsible, A=Accountable, C=Consulted, I=Informed.

---

## 2. The phases and their gates

Each phase has an **entry**, **activities**, an **exit gate** (must pass to proceed), and the
**SSDF practices** it satisfies.

### 2.1 Requirements → *gate: threat-model updated*

**Entry:** a new feature/epic (`sdlc: requirements`), or a change to a locked decision.

**Activities:**
- Write the requirement in the owning PRD with a stable `PRD-*` ID (testable, normative).
- Derive security & privacy requirements: which assets ([`threat-model.md`](threat-model.md)
  §1) does it touch, which actors, which controls
  ([`controls-matrix.md`](controls-matrix.md)) apply.
- If it introduces or changes a **trust boundary, data flow, stored asset, or third-party
  dependency**, add/rev the relevant STRIDE/LINDDUN rows in
  [`threat-model.md`](threat-model.md).
- Determine privacy-law obligations (GDPR/DPDP/COPPA) and whether a **DPIA** is warranted
  (children's data, new data category, new sharing).

**Exit gate (MUST all hold):**
- [ ] Security & privacy requirements written into the issue's Security section with control IDs.
- [ ] Threat model updated (or a note that no boundary changed) — reviewed by the Security Owner.
- [ ] DPIA decision recorded; DPIA done if warranted.

**SSDF:** PO.1 (define security requirements), PW.1 (design to meet them), SAMM Design/Threat
Assessment.

### 2.2 Design → *gate: security design review*

**Entry:** requirements gate passed; `sdlc: design`.

**Activities:**
- Produce/extend the ADR if the decision is architectural (`docs/adr/NNNN-*.md`).
- Walk the feature's data-flow through the trust boundaries; enumerate STRIDE + LINDDUN per
  element (this is the "threat modeling before each major feature" control from
  `research/security-standards-and-devsecops.md`).
- Choose approved mechanisms only (crypto primitives §3 of the checklist; platform key stores;
  parameterised queries; sanitised rendering). Prefer reuse of `sane_crypto`/`sane_secure_store`
  over new code (SSDF PW.4).
- Define the **verification** for each control now (which MASTG test / CI job / unit test),
  so implementation inherits its acceptance criteria.

**Exit gate (MUST):**
- [ ] Security design review done by the Security Owner (recorded in the ADR or issue).
- [ ] No unapproved crypto/auth/storage mechanism introduced.
- [ ] Each new control has a named verification method.
- [ ] Abuse cases / negative acceptance criteria written (e.g. "a forged deep link cannot mutate
      state").

**SSDF:** PW.1, PW.2 (review the design), PW.9 (secure settings by default), Microsoft SDL
practice 3 (design review + threat modeling).

### 2.3 Implementation → *gate: SAST / SCA / secret-scan / pre-commit green*

**Entry:** design gate passed; `sdlc: implementation`.

**Activities:**
- Code to [`secure-coding-checklist.md`](secure-coding-checklist.md), following the
  overview's model→logic→native→render→state→UI→persist/sync→search→tests→perf→security→docs
  path (overview §10).
- Write tests **including negative/abuse tests** and the control's named verification.
- Run local pre-commit before pushing: format, `dart analyze`, gitleaks (secret scan),
  `validate-issues` if issues changed.

**Exit gate (MUST — all enforced in CI on the PR,
[`devsecops-pipeline.md`](devsecops-pipeline.md)):**
- [ ] `dart format` clean + `dart analyze --fatal-infos` clean; arch-lint (DAG + `print()` ban)
      passes.
- [ ] Semgrep (Dart/Swift/Kotlin/JS) + mobsfscan: no new high/critical findings.
- [ ] gitleaks + trufflehog: no secrets; push protection not triggered.
- [ ] OSV-Scanner + `dependency-review`: no vulnerable/disallowed dependency introduced.
- [ ] Unit/widget/golden tests green, including the security tests (e.g. `auth_bypass_test.dart`).
- [ ] CODEOWNERS review obtained for any security-critical path.

**SSDF:** PW.5 (secure coding), PW.6 (secure build config), PW.7 (analyze code), PS.1 (protect
code — secret hygiene).

### 2.4 Verification → *gate: DAST / MobSF / parser fuzzing / pentest*

**Entry:** implementation merged to a release candidate branch; `sdlc: verification`.

**Activities (depth scales with risk):**
- **DAST:** ZAP baseline (passive) on every PR preview; **ZAP full active scan** nightly against
  staging web + relay (OpenAPI import) (`research/security-standards-and-devsecops.md` §6.5).
- **MobSF:** static (+ optional dynamic) analysis of the release-candidate APK/AAB/IPA; map
  findings to MASVS/Mobile Top 10; triage before store submission.
- **Fuzzing of parsers (MUST for parser changes):** run a fuzz corpus against `sane_pdf`,
  `sane_audio`, image decode, and `.sanenote` unpack; AddressSanitizer for native/C decoders.
  Closes TM-E-04, TM-D-01.
- **Manual/assisted pentest** at milestone boundaries and before a public release: exercise the
  abuse cases (deep-link forgery, intent redirection, E2EE bypass attempts, share-link leakage,
  WebView XSS). The android-pentest / web-pentest methodology applies.
- **Perf gates** (decision 7) run here too: a security fix that regresses latency still must
  meet the budget.

**Exit gate (MUST):**
- [ ] ZAP full scan: no unresolved high/medium web findings.
- [ ] MobSF: no unresolved high MASVS/Mobile-Top-10 findings.
- [ ] Parser fuzzing: no reproducible crash on the corpus for changed parsers.
- [ ] Milestone pentest findings triaged; P0/P1 fixed or explicitly risk-accepted by the
      Security Owner.

**SSDF:** PW.8 (test executable code), RV.1 (identify vulns), SAMM Verification/Security Testing.

### 2.5 Release → *gate: signing / SBOM / SLSA / notarization / store review*

**Entry:** verification gate passed; a version tag `v*`; `sdlc: release`.

**Activities (`release.yml`, environment-gated —
[`devsecops-pipeline.md`](devsecops-pipeline.md)):**
- Reproducible-ish builds with pinned toolchain (Flutter/Dart, Gradle, Xcode); obfuscated
  release binaries.
- **Sign:** Android **Play App Signing** (upload key via OIDC/secret); iOS App Store signing;
  **Apple notarization** (`notarytool`) for the desktop build; signed git tag.
- **SBOM:** generate **CycloneDX + SPDX** per artifact (client bundles + relay image) and attach
  to the GitHub Release.
- **Provenance:** `actions/attest-build-provenance` → signed **SLSA** provenance per artifact
  (target L3 for release artifacts) (`research/security-standards-and-devsecops.md` §3.1).
- **Store compliance:** accurate **Apple Privacy Labels + Privacy Manifest** and **Play Data
  Safety** form reflecting the E2EE/on-device "minimal/no data collected" reality.
- Deploy the relay/entitlement services (if changed) via **OIDC** (no static creds).

**Exit gate (MUST):**
- [ ] All release artifacts signed; notarization succeeded for desktop.
- [ ] SBOMs (CycloneDX + SPDX) generated and attached; provenance attestation present.
- [ ] Store privacy declarations updated and accurate (Security Owner sign-off).
- [ ] Release notes credit any reporters (per SECURITY.md) and list security-relevant changes.

**SSDF:** PS.2 (verify release integrity), PS.3 (archive/protect the release), PW.6, PO.5
(secure build environment).

### 2.6 Maintenance → *gate: vuln SLA, patch cadence, monitoring*

**Entry:** version is live; `sdlc: maintenance`.

**Activities:**
- **Vulnerability intake:** private GitHub Security Advisory or `security@swiftsane.ai`
  ([`../../SECURITY.md`](../../SECURITY.md)); Dependabot/OSV alerts; Scorecard drift.
- **Triage & remediate** to SLA (§3 below); root-cause analysis for anything exploitable (SSDF
  RV.3).
- **Patch cadence:** dependency updates land weekly via Dependabot groups
  (`../../.github/dependabot.yml`); the weekly scheduled full scan (`devsecops.yml` cron) and
  Scorecard run keep drift visible.
- Only the **latest released minor version per platform** receives security fixes (SECURITY.md).

**Exit/steady-state gate (MUST):**
- [ ] No open vulnerability past its SLA without an explicit, recorded exception.
- [ ] Dependency-update PRs reviewed and merged within the cadence.
- [ ] Disclosure timelines honoured; advisory published when a fix ships.

**SSDF:** RV.1/RV.2/RV.3 (respond to vulnerabilities), SAMM Operations/Incident Management.

---

## 3. Vulnerability handling SLA

From [`../../SECURITY.md`](../../SECURITY.md), made concrete. Severity is CVSS-guided but the
Security Owner may raise it (a plaintext-note disclosure is always Critical regardless of score).

| Severity | Examples | Acknowledge | Triage/confirm | Fix target |
|---|---|---|---|---|
| **Critical** | E2EE bypass, key disclosure, RCE via parser, auth-bypass in release, supply-chain implant | 48 h | 3 days | **≤ 30 days** (hotfix ASAP; may pull the build) |
| **High** | Stored XSS in web note render, token theft, IDOR on a service, sensitive data in logs | 48 h | 7 days | ≤ 60 days |
| **Medium** | Metadata leak, missing hardening header, DoS on a parser | 48 h | 14 days | ≤ 90 days |
| **Low** | Defence-in-depth gaps, best-practice deviations | 48 h | 30 days | next release |

- **Coordinated disclosure:** no public issue for a security bug; advisory published when the
  fix ships; reporter credited unless they decline (SECURITY.md).
- **Regressions:** every fixed vuln gets a **regression test** added to CI so it cannot return.

---

## 4. Incident response (summary — full runbook in [`devsecops-pipeline.md`](devsecops-pipeline.md) §Incident response)

1. **Detect** (report, alert, or scanner) → open a private advisory, assign the Security Owner.
2. **Contain** → if a release is affected, halt further rollout; if a CI secret/signing key is
   suspected, rotate it and revoke provenance trust.
3. **Assess** → scope: which versions, which data, is note plaintext at risk (usually **no**, by
   design — zero-knowledge). GDPR/DPDP **breach clock starts** if personal data is at risk (72 h
   to notify the supervisory authority under GDPR).
4. **Remediate** → patch, add regression test, ship a signed hotfix through `release.yml`.
5. **Disclose** → advisory + release notes; notify affected users if personal data was at risk.
6. **Learn** → root-cause (SSDF RV.3); update threat model, checklist, and a CI gate to prevent
   recurrence.

---

## 5. Definition of Done (security dimension)

A change is **Done** only when all of the following hold (this extends the issue schema's DoD):

- [ ] The issue's **Security & privacy** section is filled with the relevant `TM-*` / `MASVS-*`
      / `ASVS-*` control IDs, or justifiably "None beyond baseline".
- [ ] If a trust boundary/data flow/stored asset/dependency changed,
      [`threat-model.md`](threat-model.md) was updated in the same PR.
- [ ] Code passes [`secure-coding-checklist.md`](secure-coding-checklist.md); the three gate
      rules (no secrets, no PII in logs, no boundary violations) hold.
- [ ] Tests include the control's **named verification** and the relevant **abuse/negative
      cases**; regression tests exist for any fixed vuln.
- [ ] CI is green: format, analyze, arch-lint, Semgrep, mobsfscan, gitleaks/trufflehog,
      OSV-Scanner, dependency-review, unit/widget/golden — and, for release candidates, MobSF,
      ZAP, fuzzing, and perf gates.
- [ ] CODEOWNERS review obtained for any security-critical path.
- [ ] Docs/ADR/controls-matrix updated if behaviour, architecture, or a control mapping changed.

---

## 6. Standard → practice traceability (quick map)

| Framework | Where it lives in this process |
|---|---|
| **NIST SSDF** PO/PS/PW/RV | Phases §2.1–§2.6 (each phase lists the practices it satisfies) |
| **OWASP SAMM** Design/Impl/Verify/Ops | Design review §2.2; scanners §2.3; testing §2.4; maintenance §2.6 |
| **Microsoft SDL** 10 practices | Standards (this doc + controls-matrix); design review §2.2; crypto standards (checklist §3); supply chain (§2.5); testing §2.4; response §2.6/§3–§4 |
| **SLSA** L2→L3 | Release §2.5 (provenance, hosted signed builds) |
| **OWASP MASVS/ASVS/Top 10/Mobile Top 10** | [`controls-matrix.md`](controls-matrix.md), verified in §2.3/§2.4 |
| **GDPR / DPDP / COPPA** | Requirements DPIA §2.1; store labels §2.5; breach clock §4; [`controls-matrix.md`](controls-matrix.md) privacy section |

See [`controls-matrix.md`](controls-matrix.md) for the full control-by-control mapping and
[`devsecops-pipeline.md`](devsecops-pipeline.md) for the exact CI jobs that enforce each gate.
