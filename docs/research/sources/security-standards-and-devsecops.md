# Security Standards & DevSecOps Blueprint for a Secure-SDLC Note App ("Sane Notes")

**Scope of this document.** Sane Notes is a cross-platform consumer note-taking app: a **Flutter (Dart)** client with **Swift** (iOS/macOS platform channels, widgets, notarized desktop build) and **Kotlin** (Android platform channels), a **web** client, and a **sync/relay service** (the backend that stores/relays encrypted notes between devices). The codebase lives on **GitHub**. This report compiles every security framework such an app must satisfy, with concrete control lists, then maps each control to where it applies and specifies a concrete GitHub Actions pipeline.

A note app is a *privacy-critical* application: its entire payload is user-authored personal content. That pushes end-to-end encryption (E2EE), data-at-rest protection, minimal telemetry, and honest store privacy labels to the front of the requirements.

---

## 1. Application security baselines

### 1.1 OWASP Top 10 — 2021 edition (web app + relay service)
The stable, citable baseline for the web client and the sync/relay API:

- **A01 Broken Access Control**
- **A02 Cryptographic Failures**
- **A03 Injection**
- **A04 Insecure Design**
- **A05 Security Misconfiguration**
- **A06 Vulnerable and Outdated Components**
- **A07 Identification and Authentication Failures**
- **A08 Software and Data Integrity Failures**
- **A09 Security Logging and Monitoring Failures**
- **A10 Server-Side Request Forgery (SSRF)**

### 1.2 OWASP Top 10 — 2025 edition (Release Candidate)
The 2025 RC (open for comment through Nov 20, 2025 at time of writing) reshuffles and adds supply-chain and resilience themes:

- **A01 Broken Access Control** (still #1; now absorbs SSRF)
- **A02 Security Misconfiguration** (up from #5)
- **A03 Software Supply Chain Failures** (expansion of 2021's "Vulnerable and Outdated Components")
- **A04 Cryptographic Failures**
- **A05 Injection**
- **A06 Insecure Design**
- **A07 Authentication Failures**
- **A08 Software or Data Integrity Failures**
- **A09 Logging & Alerting Failures**
- **A10 Mishandling of Exceptional Conditions** (new)

*Design note:* the 2025 elevation of **Software Supply Chain Failures to A03** validates the heavy pipeline investment (SBOM, pinned actions, dependency review, SLSA) described later.

### 1.3 OWASP Mobile Top 10 — 2024 (Flutter/Swift/Kotlin clients)
First major revision since 2016; drives the mobile client threat list:

- **M1 Improper Credential Usage**
- **M2 Inadequate Supply Chain Security**
- **M3 Insecure Authentication/Authorization**
- **M4 Insufficient Input/Output Validation**
- **M5 Insecure Communication**
- **M6 Inadequate Privacy Controls**
- **M7 Insufficient Binary Protections**
- **M8 Security Misconfiguration**
- **M9 Insecure Data Storage**
- **M10 Insufficient Cryptography**

### 1.4 OWASP MASVS v2.x (mobile verification standard)
Current release **MASVS v2.1.0** — 8 control groups, 24 controls. Verify the mobile clients against every applicable control ID:

**MASVS-STORAGE (data-at-rest)**
- MASVS-STORAGE-1 — Sensitive data is protected in storage.
- MASVS-STORAGE-2 — Cryptographic keys are secured in platform keystores.

**MASVS-CRYPTO**
- MASVS-CRYPTO-1 — Cryptographic operations use approved algorithms and modes.
- MASVS-CRYPTO-2 — Cryptographic keys are generated and managed securely (key management).

**MASVS-AUTH (authentication & authorization)**
- MASVS-AUTH-1 — Authentication mechanisms are implemented correctly.
- MASVS-AUTH-2 — Authorization controls protect sensitive operations.
- MASVS-AUTH-3 — Session management is secure and properly enforced.

**MASVS-NETWORK**
- MASVS-NETWORK-1 — Network traffic is encrypted and protected.
- MASVS-NETWORK-2 — Certificate validation / pinning is properly implemented.

**MASVS-PLATFORM**
- MASVS-PLATFORM-1 — App components (IPC/exported components/deeplinks) are protected from misuse.
- MASVS-PLATFORM-2 — WebViews are securely configured.
- MASVS-PLATFORM-3 — Sensitive data is protected from disclosure via UI/platform features (screenshots, clipboard, notifications, backups).

**MASVS-CODE (code quality)**
- MASVS-CODE-1 — App targets current platform versions.
- MASVS-CODE-2 — Dependencies are current and free from known vulnerabilities.
- MASVS-CODE-3 — Code-quality issues and injection flaws are prevented.
- MASVS-CODE-4 — Dynamic code loading and deserialization are restricted.

**MASVS-RESILIENCE (anti-tamper / anti-RE)**
- MASVS-RESILIENCE-1 — Tampering/jailbreak/root detection mechanisms.
- MASVS-RESILIENCE-2 — Code and resource integrity verification.
- MASVS-RESILIENCE-3 — Obfuscation and anti-debugging measures.
- MASVS-RESILIENCE-4 — Device attestation and integrity checks (Play Integrity / DeviceCheck/App Attest).

**MASVS-PRIVACY**
- MASVS-PRIVACY-1 — Permission management and user consent.
- MASVS-PRIVACY-2 — Data collection transparency and user awareness.
- MASVS-PRIVACY-3 — Data retention and user control.
- MASVS-PRIVACY-4 — Third-party data sharing restrictions.

### 1.5 OWASP MASTG / MASWE test structure
MASTG (Mobile Application Security Testing Guide) is the procedural companion to MASVS. Its v2 structure decomposes into cross-referenced, individually-IDed component types:

- **MASTG-TEST-####** — individual test files (each a Markdown page with metadata).
- **MASTG-TECH-####** — reusable techniques a test relies on.
- **MASTG-TOOL-####** — tools (Frida, objection, jadx, radare2, etc.).
- **MASTG-DEMO / MASTG-BEST-PRACTICE** — demos and best-practice pages (added 2024).
- **MASWE-####** — Mobile App Security Weakness Enumeration; bridges high-level MASVS controls to low-level MASTG tests (the mobile analogue of CWE). MASWE v1.0.0 shipped Aug 2026.
- **MAS Testing Profiles** — the old verification levels **L1 / L2 / R** (R = resilience) reworked as profiles and moved under MASWE. For Sane Notes, target **L2 + R** given E2EE note content and paid tiers.

### 1.6 OWASP ASVS 5.0 (web app + relay service)
ASVS 5.0 (released May 2025) has **17 chapters (V1–V17)**, ~350 requirements, with levels L1/L2/L3. Verify the web client and sync/relay service against these chapters:

- V1 Encoding and Sanitization
- V2 Validation and Business Logic
- V3 Web Frontend Security
- V4 API and Web Service
- V5 File Handling
- V6 Authentication
- V7 Session Management
- V8 Authorization
- V9 Self-contained Tokens (JWT/PASETO)
- V10 OAuth and OIDC
- V11 Cryptography
- V12 Secure Communication
- V13 Configuration
- V14 Data Protection
- V15 Secure Coding and Architecture
- V16 Security Logging and Error Handling
- V17 WebRTC

*Target:* ASVS **L2** for the relay service and web app (L1 is a floor; L3 is for the highest-assurance systems).

---

## 2. Secure-SDLC governance frameworks

### 2.1 NIST SSDF — SP 800-218
Federal-grade secure-development framework: 4 practice groups, 19 practices, 42 tasks.

**PO — Prepare the Organization**
- PO.1 Define Security Requirements for Software Development
- PO.2 Implement Roles and Responsibilities
- PO.3 Implement Supporting Toolchains
- PO.4 Define and Use Criteria for Software Security Checks
- PO.5 Implement and Maintain Secure Environments for Software Development

**PS — Protect the Software**
- PS.1 Protect All Forms of Code from Unauthorized Access and Tampering
- PS.2 Provide a Mechanism for Verifying Software Release Integrity
- PS.3 Archive and Protect Each Software Release

**PW — Produce Well-Secured Software**
- PW.1 Design Software to Meet Security Requirements and Mitigate Security Risks
- PW.2 Review the Software Design to Verify Compliance
- PW.4 Reuse Existing, Well-Secured Software When Feasible
- PW.5 Create Source Code Adhering to Secure Coding Practices
- PW.6 Configure the Compilation, Interpreter, and Build Processes
- PW.7 Review and/or Analyze Code to Identify Vulnerabilities
- PW.8 Test Executable Code to Identify Vulnerabilities
- PW.9 Configure Software to Have Secure Settings by Default

*(PW.3 was removed in the current revision.)*

**RV — Respond to Vulnerabilities**
- RV.1 Identify and Confirm Vulnerabilities on an Ongoing Basis
- RV.2 Assess, Prioritize, and Remediate Vulnerabilities
- RV.3 Analyze Vulnerabilities to Identify Their Root Causes

### 2.2 OWASP SAMM v2 (maturity model)
5 business functions → 15 security practices → 30 streams (A/B), each measured at maturity levels 1–3. Use SAMM to self-assess and plan the program:

- **Governance:** Strategy & Metrics · Policy & Compliance · Education & Guidance
- **Design:** Threat Assessment · Security Requirements · Secure Architecture
- **Implementation:** Secure Build · Secure Deployment · Defect Management
- **Verification:** Architecture Assessment · Requirements-driven Testing · Security Testing
- **Operations:** Incident Management · Environment Management · Operational Management

### 2.3 Microsoft SDL — key practices
Microsoft's "continuous SDL" (its DevSecOps approach, guided by Zero Trust). The 10 key practices:

1. Establish security standards, metrics, and governance
2. Require use of proven security features, languages, and frameworks
3. Perform security design review and threat modeling
4. Define and use cryptography standards
5. Secure the software supply chain
6. Secure the engineering environment
7. Perform security testing (SAST/DAST/pen test)
8. Ensure operational platform security
9. Implement security monitoring and response
10. Provide security training

---

## 3. Supply-chain integrity

### 3.1 SLSA v1.0 (build track)
Supply-chain Levels for Software Artifacts — Build track L0–L3:

- **L0** — No guarantees / no provenance.
- **L1 — Provenance exists.** Build process emits provenance (builder identity, source repo, output artifact digest); may be incomplete/unsigned.
- **L2 — Hosted build + signed provenance.** Builds run on a hosted platform that generates and *signs* provenance, preventing tampering.
- **L3 — Hardened builds.** Strong tamper-resistance, builds isolated from one another, signing keys inaccessible to user-defined build steps.

*Target for Sane Notes:* **L2 now, L3 for release artifacts** (achievable on GitHub-hosted runners with signed provenance via `actions/attest-build-provenance`).

### 3.2 SBOM formats
- **CycloneDX** — OWASP-born (2017), security-first; flat component-centric model with an explicit dependencies array. Ecma standard **ECMA-424** (2024). v1.6 (Apr 2024) added cryptographic-asset support, VEX, ML-BOM. Preferred for vulnerability workflows.
- **SPDX** — Linux Foundation (2010), license/compliance-first; ISO/IEC **5962:2021**. SPDX 3.0 (Apr 2024) expanded to a full "system description" model (AI datasets, builds, licensing).
- **Practice:** generate *both* — CycloneDX for security tooling/VEX, SPDX for license/compliance and OEM/regulator demands. Produce an SBOM per release artifact (client bundles + relay image) and attach to the GitHub Release.

### 3.3 OpenSSF Scorecard — checks
Automated repo-health scoring (0–10 per check, risk-weighted aggregate). Full check set:

Binary-Artifacts · Branch-Protection · CI-Tests · CII-Best-Practices · Code-Review · Contributors · Dangerous-Workflow · Dependency-Update-Tool · Fuzzing · License · Maintained · Pinned-Dependencies · Packaging · SAST · Security-Policy · Signed-Releases · Token-Permissions · Vulnerabilities · Webhooks.

Run Scorecard as a scheduled workflow and publish the badge; the checks map almost 1:1 to the CI hardening items in §6.

---

## 4. Threat modeling

### 4.1 STRIDE (security threats — Microsoft)
Per-element analysis over a data-flow diagram:
- **S**poofing (identity) → authn controls
- **T**ampering (data/code integrity) → signing, integrity checks
- **R**epudiation → audit logging, non-repudiable events
- **I**nformation disclosure → encryption, least data
- **D**enial of service → rate limiting, quotas
- **E**levation of privilege → authorization, sandboxing

### 4.2 LINDDUN (privacy threats — KU Leuven)
Privacy-specific counterpart, applied over data-flow diagrams; included in ISO 27550. Seven categories:
- **L**inkability — data items can be linked (even without identity)
- **I**dentifiability — identity revealed behind data
- **N**on-repudiation — user cannot deny an action (a *privacy* harm here)
- **D**etectability — presence of data/action is observable
- **D**isclosure of information — unauthorized access to personal data
- **U**nawareness — user not informed how data is handled
- **N**on-compliance — misalignment with legal/regulatory requirements

*For a note app, run LINDDUN early:* the note payload plus sync metadata (device IDs, timestamps, IPs) are the primary linkability/identifiability risks — mitigate with E2EE, metadata minimization, and short retention. "LINDDUN Go" offers a lightweight card-based variant for workshops.

---

## 5. Privacy & regulatory obligations (global consumer app)

### 5.1 GDPR (EU/EEA)
Article 5 processing principles: **lawfulness/fairness/transparency · purpose limitation · data minimisation · accuracy · storage limitation · integrity & confidentiality · accountability.** Plus: valid **lawful basis / consent** (Art. 6), **privacy by design & default** (Art. 25), **data subject rights** (access, rectification, erasure, portability, objection), and **breach notification within 72 hours** to the supervisory authority.

### 5.2 India DPDP Act 2023 (+ DPDP Rules 2025)
- Consent must be **free, specific, informed, unconditional, unambiguous** with clear affirmative action; withdrawable at any time.
- Data Fiduciaries must give clear notices (purpose, categories, retention, withdrawal mechanism) and implement reasonable security safeguards + breach notification.
- **Children (<18):** verifiable parental/guardian consent required (Rule 10); **no behavioral monitoring or targeted advertising** to children.
- **Significant Data Fiduciaries** face extra duties (DPIAs, audits, DPO).

### 5.3 COPPA (US, children under 13)
Applies to operators of sites/services **directed to children under 13**, or with **actual knowledge** of collecting from under-13s. Requires: clear privacy policy, **verifiable parental consent** *before* collection, **data minimization** and limited retention, **age screening/age gates** for mixed-audience services, parental review/deletion rights, and reasonable security safeguards.

### 5.4 CCPA / CPRA (California)
Consumer rights: **know · delete · correct · opt-out of sale/sharing** (honor Global Privacy Control) · **limit use of sensitive personal information** · **non-discrimination.** Applies to for-profit businesses meeting any threshold: >$25M gross revenue; buys/sells/shares PI of 100,000+ CA residents/households; or ≥50% revenue from selling CA residents' PI.

### 5.5 Store privacy labels
- **Apple App Store — Privacy "Nutrition" Labels** (App Store Connect): declare data types across categories (Contact, Health, Financial, Location, Sensitive, Contacts, User Content, Browsing/Search, Identifiers, Purchases, Usage, Diagnostics, Surroundings); mark each **Linked to You / Not Linked to You / Used to Track You**. Newer requirements: **Privacy Manifests** (`PrivacyInfo.xcprivacy`) declaring data use + **Required Reason API** usage, and **SDK signatures** for third-party SDKs. Requires a public **Privacy Policy** URL.
- **Google Play — Data safety form:** declare data **collected** (transmitted off device) and **shared** (transferred to third parties) across 13 categories, plus purposes; declare **security practices** — encryption in transit (TLS/HTTPS) and whether users can **request deletion** (or auto-deletion within 90 days). On-device-only, E2EE, and ephemeral processing are exempt from "collection." Third-party SDK data counts.

*Design leverage:* if Sane Notes is genuinely **E2EE and on-device**, both stores let you declare *minimal* data collection — a strong trust signal and a compliance simplifier.

---

## 6. DevSecOps tooling (Flutter/Dart + Swift + Kotlin + web, on GitHub)

### 6.1 Static analysis (SAST)
- **GitHub CodeQL** — supports **Swift, Kotlin, Java, JavaScript/TypeScript, Python, Go, C#, C/C++, Ruby, Rust, and GitHub Actions** (11 languages). **Swift analysis requires a macOS runner.** **Dart is NOT supported** — cover Dart separately (see Semgrep + `dart analyze`).
- **Semgrep** — **Swift GA** (cross-function dataflow, 60+ Pro rules) and **Kotlin GA** (cross-file dataflow, 60+ Pro rules); JavaScript/TypeScript, Java, Go, Python all GA. **Dart is Experimental** in Semgrep Code — the practical way to get *some* Dart SAST coverage since CodeQL lacks Dart.
- **`dart analyze` / Flutter lints** + `flutter_lints`/`very_good_analysis` — first-line static checks for the Dart client.
- **mobsfscan** — mobile SAST for Android/iOS source (Java, Kotlin, Swift, Objective-C, Android XML, iOS `Info.plist`); maps findings to **MASVS, OWASP Mobile Top 10, CWE, CVSS**; outputs **SARIF** to GitHub Code Scanning; has a native GitHub Action + pre-commit. Powered by Semgrep/libsast + MobSF rules.

### 6.2 Secret scanning
- **GitHub secret scanning + push protection** — native; blocks commits containing recognized secret patterns before they land. Enable org-wide + push protection.
- **gitleaks** — regex-based secret detection across git history/files; GitHub Action (`gitleaks/gitleaks-action`) + pre-commit hook.
- **trufflehog** — secret scanner emphasizing **entropy-based detection and live-credential verification** (validates whether a found key is active). Complementary to gitleaks; run both in CI + as pre-commit.

### 6.3 Dependency / SCA
- **OSV-Scanner** — official frontend to the **OSV database**; scans lockfiles/manifests, source, container images, and SBOMs across many ecosystems; GitHub Action available. Covers pub (Dart), Gradle/Maven (Kotlin/Java), npm/yarn/pnpm (web), Swift Package Manager, and the relay service's ecosystem.
- **Dependabot** — native GitHub alerts + automated version/security update PRs; enable **Dependabot security updates** + **grouped version updates**.
- **Renovate** — alternative/complement to Dependabot with richer scheduling, grouping, and monorepo support; good for the multi-ecosystem repo.
- **dependency-review-action** — blocks PRs that introduce **vulnerable dependencies** or **disallowed licenses** by scanning the dependency diff; config `fail-on-severity`, `allow-licenses`/`deny-licenses`, `fail-on-scopes`. Requires the Dependency Graph; needs GitHub Advanced Security for private repos.
- **Snyk** — commercial SCA + SAST + container + IaC; broad language coverage including Dart/Flutter, and PR checks/fix PRs. Optional if budget allows; overlaps OSV/Dependabot but adds fix advice and license policy.

### 6.4 Container / IaC / SBOM
- **Trivy** — scans container images, filesystems, repos, Kubernetes, VM images, and SBOMs; finds OS + language dependency vulns, **misconfigurations/IaC**, **secrets**, licenses; **generates SBOM (CycloneDX/SPDX)**; integrates with GitHub Actions and other CI. Use for the relay service's Docker image and IaC.

### 6.5 DAST (web + relay)
- **OWASP ZAP** — the most widely used open-source web app scanner (DAST); spider/AJAX-spider, passive + active scan, and an **Automation Framework**. Official GitHub Actions: **ZAP Baseline** (fast, passive — good for every PR to a preview env) and **ZAP Full Scan** (active — nightly against staging). Point it at the web client and the relay API (with an OpenAPI import).

### 6.6 Mobile app security testing
- **MobSF (Mobile Security Framework)** — static + dynamic analysis of **APK/AAB/IPA** and source; malware/privacy analysis; REST API for CI; pair with **mobsfscan** for source SAST in the pipeline (unverified: exact latest MobSF release cadence).

---

## 7. Repository & release hardening (GitHub)

- **Pin all Actions to a full-length commit SHA** — the only immutable way to consume an action; blocks tag-repoint backdoors. Enforce via org policy + Dependabot to bump the SHAs.
- **Least-privilege `GITHUB_TOKEN`** — default `permissions: read-all` (or `contents: read`) at workflow top level; grant `write` narrowly per-job only where needed.
- **OIDC for cloud deploys** — use OpenID Connect to get short-lived cloud credentials instead of long-lived secrets for the relay service deploy.
- **Branch protection + required reviews** — protect `main`/release branches; require PR review, passing status checks (CodeQL, dependency-review, tests), and up-to-date branches.
- **Signed commits / signed tags** — require verified signatures (GPG/SSH/Sigstore gitsign) on protected branches; supports SLSA/PS.2.
- **CODEOWNERS** — require designated reviewers; add workflow files (`.github/workflows/**`) so pipeline changes need security review.
- **SECURITY.md + coordinated vulnerability disclosure** — publish a security policy and a private reporting channel (GitHub private vulnerability reporting); ties to SSDF RV.1.
- **Avoid dangerous triggers** — never checkout untrusted code under `pull_request_target`/`workflow_run` with privileged tokens; mitigate script injection by passing untrusted input via intermediate `env:` vars, never inline into `run:`.
- **Release signing:** **Play App Signing** (Google manages the app signing key; you keep an upload key) for Android; **Apple notarization** (`notarytool`) + Developer ID signing for the macOS/desktop build and standard App Store signing for iOS.
- **Reproducible builds** — pin toolchain versions (Flutter/Dart SDK, Gradle, Xcode) and dependencies so a given commit yields byte-identical artifacts; strengthens SLSA provenance verification (aspirational for Flutter; document deviations).
- **Provenance attestation** — `actions/attest-build-provenance` to emit signed SLSA provenance for every release artifact (client bundles + relay image).

---

## Control checklist for Sane Notes

Legend: **C**=client (Flutter/Swift/Kotlin) · **S**=sync/relay service · **W**=web client · **CI**=pipeline/repo.

| Control area | Control | C | S | W | CI |
|---|---|---|---|---|---|
| E2EE note payload | Encrypt note content client-side; server sees ciphertext only (MASVS-CRYPTO-1/2, GDPR data minimisation) | ✅ | ✅ | ✅ | — |
| Data-at-rest | Keychain/Keystore-backed keys; encrypted local DB (MASVS-STORAGE-1/2, M9) | ✅ | ✅ | ◐ | — |
| Key management | Per-device keys, secure key exchange, rotation (MASVS-CRYPTO-2, ASVS V11) | ✅ | ✅ | ✅ | — |
| Transport | TLS 1.2+/HTTPS everywhere; cert pinning on mobile (MASVS-NETWORK-1/2, M5, ASVS V12) | ✅ | ✅ | ✅ | — |
| AuthN | Strong auth, MFA option, secure session/token handling (MASVS-AUTH-1/3, M1/M3, ASVS V6/V7/V9) | ✅ | ✅ | ✅ | — |
| AuthZ | Per-user note isolation; no IDOR on sync API (Top-10 A01, ASVS V8, M3) | — | ✅ | ✅ | — |
| Input/output validation | Sanitize note rendering (XSS in web/WebView), API validation (M4, ASVS V1/V2, A03) | ◐ | ✅ | ✅ | — |
| Platform hardening | Protect exported components/deeplinks; secure WebView; block screenshots/clipboard leaks of secure notes (MASVS-PLATFORM-1/2/3, M8) | ✅ | — | ◐ | — |
| Resilience | Root/jailbreak detection, integrity checks, attestation for paid/E2EE tiers (MASVS-RESILIENCE-1..4, M7) | ✅ | ◐ | — | — |
| Secure config | Harden server config, security headers, disable debug (A02/A05, ASVS V13) | — | ✅ | ✅ | ✅ |
| Logging/monitoring | Audit sync events, alerting, no plaintext note content in logs (A09, ASVS V16, STRIDE-R) | — | ✅ | ◐ | ✅ |
| Exceptional conditions | Fail closed on crypto/sync errors; no partial-decrypt leaks (2025 A10) | ✅ | ✅ | ✅ | — |
| Dependencies | Current, CVE-free deps across pub/Gradle/npm/SPM (MASVS-CODE-2, A03/A06, SSDF PW.4) | ✅ | ✅ | ✅ | ✅ |
| No dynamic code | No unsafe dynamic loading/deserialization (MASVS-CODE-4, A08) | ✅ | ✅ | ✅ | — |
| Privacy — consent | Consent capture, purpose notice, withdrawal (GDPR Art.5/6, DPDP, MASVS-PRIVACY-1/2) | ✅ | ✅ | ✅ | — |
| Privacy — retention/rights | Export, delete/erasure, correction; auto-delete windows (GDPR, CCPA, DPDP, MASVS-PRIVACY-3) | ✅ | ✅ | ✅ | — |
| Privacy — children | Age gate; block behavioral ads/monitoring to minors (COPPA, DPDP Rule 10) | ✅ | ✅ | ✅ | — |
| Privacy — 3rd-party | Minimize SDKs; declare/share nothing beyond need (MASVS-PRIVACY-4, CCPA opt-out) | ✅ | ✅ | ✅ | ✅ |
| Store labels | Accurate Apple Privacy Labels + Privacy Manifest; Play Data safety form | ✅ | — | — | ◐ |
| Threat modeling | STRIDE + LINDDUN over sync data-flow before each major feature (SSDF PW.1, SAMM Design) | — | — | — | ✅ |
| Supply chain | SBOM per artifact, SLSA L2→L3 provenance, pinned actions (2025 A03, SSDF PS.1/PS.2, SLSA) | ✅ | ✅ | ✅ | ✅ |
| Secrets hygiene | No secrets in repo; push protection + gitleaks/trufflehog (M1, SSDF PS.1) | — | — | — | ✅ |
| Release integrity | Play App Signing, Apple notarization, signed tags, attestations (SSDF PS.2, SLSA L2/L3) | ✅ | ✅ | ✅ | ✅ |
| Disclosure | SECURITY.md + private vuln reporting + patch SLA (SSDF RV.1/RV.2, SAMM Ops) | — | — | — | ✅ |

◐ = partial/conditional applicability.

---

## DevSecOps pipeline blueprint (GitHub Actions job list)

All workflows: **pin every action to a full commit SHA**, set `permissions: contents: read` at top level (escalate per-job), and use `concurrency` to cancel superseded runs.

### Workflow A — `pr-checks.yml` (on `pull_request`)
1. **lint-dart** — `dart analyze` + `flutter analyze` (+ `dart format --set-exit-if-changed`).
2. **unit-tests** — `flutter test` (client) and service unit/integration tests with coverage gate.
3. **semgrep** — `semgrep ci` (Dart experimental, Swift/Kotlin/JS/TS GA); upload SARIF.
4. **mobsfscan** — mobile source SAST (Kotlin/Swift/Java/ObjC); SARIF → Code Scanning; MASVS-tagged.
5. **codeql** — matrix: `swift` + `kotlin`/`java` on a **macOS runner** (Swift needs macOS), `javascript-typescript` + backend language on ubuntu; upload SARIF. (Dart excluded — covered by Semgrep.)
6. **secret-scan** — gitleaks **and** trufflehog (verified mode) on the diff; push protection already blocks at commit time.
7. **dependency-review** — `actions/dependency-review-action` with `fail-on-severity: high`, license allow-list.
8. **osv-scan** — OSV-Scanner over all lockfiles (pubspec.lock, Gradle, package-lock, Package.resolved).
9. **zap-baseline** — ZAP Baseline (passive) against an ephemeral preview deploy of the web app + relay API.
> Branch protection requires jobs 1–8 green before merge; CODEOWNERS review required.

### Workflow B — `nightly-security.yml` (on `schedule`)
10. **zap-full-scan** — ZAP active scan against staging (web + relay OpenAPI import).
11. **trivy-fs-and-image** — Trivy filesystem + relay container image scan (vulns + misconfig + secrets); SARIF upload; also emits CycloneDX SBOM.
12. **osv-deep** — full OSV scan incl. transitive graph and container.
13. **scorecard** — OpenSSF Scorecard; publish badge + SARIF.
14. **mobsf-dynamic** *(optional/self-hosted)* — MobSF static+dynamic on nightly APK/IPA build artifacts.

### Workflow C — `release.yml` (on tag `v*`, environment-gated)
15. **build-android** — release AAB; **Play App Signing** upload key from OIDC/secret; produce mapping file.
16. **build-ios-macos** — Xcode archive on macOS runner; sign; **notarize** desktop build via `notarytool`.
17. **build-web** — production web bundle; SRI/CSP checks.
18. **build-relay-image** — reproducible container build with pinned base + digest.
19. **sbom** — generate **CycloneDX + SPDX** SBOMs for every artifact (Trivy/CycloneDX tooling).
20. **provenance** — `actions/attest-build-provenance` → signed **SLSA** provenance per artifact (target L3).
21. **sign-and-release** — signed git tag; attach artifacts + SBOMs + provenance to GitHub Release; deploy relay via **OIDC** to cloud (no static creds).

### Repo configuration (one-time, non-workflow)
- Enable: secret scanning + **push protection**, Dependabot alerts + security/grouped updates (or Renovate), Dependency Graph, Code Scanning, private vulnerability reporting.
- Branch protection on `main`/release: required reviews, required checks, signed commits, linear history.
- `CODEOWNERS` covering `.github/workflows/**`, crypto/, and privacy-sensitive modules.
- `SECURITY.md` with disclosure policy + SLA; `dependabot.yml`; renovate config (if used); `.gitleaks.toml`.

---

## Sources

- OWASP Top 10 2025 categories (SecurityWeek): https://www.securityweek.com/two-new-web-application-risk-categories-added-to-owasp-top-10/
- OWASP Mobile Top 10 (OWASP Foundation): https://owasp.org/www-project-mobile-top-10/2023-risks/
- OWASP MASVS controls (OWASP MAS): https://mas.owasp.org/MASVS/
- OWASP MASWE announcement (OWASP MAS): https://mas.owasp.org/news/2024/07/30/new-maswe/
- OWASP MASVS v2.1 practical guide (Appknox): https://www.appknox.com/blog/an-actionable-guide-to-owasp-masvs-v2
- OWASP ASVS 5.0 chapter list (SentrixHub): https://sentrixhub.com/owasp-asvs-5-0-table-of-contents/
- OWASP ASVS project (GitHub): https://github.com/OWASP/ASVS
- NIST SSDF SP 800-218 practices (Checkmarx): https://checkmarx.com/blog/what-you-need-to-know-about-nist-800-218-the-secure-software-development-framework/
- OWASP SAMM model (owaspsamm.org): https://owaspsamm.org/model/
- Microsoft SDL practices (Microsoft): https://www.microsoft.com/en-us/securityengineering/sdl/practices
- SLSA v1.0 security levels (slsa.dev): https://slsa.dev/spec/v1.0/levels
- SBOM CycloneDX vs SPDX (Sonatype): https://www.sonatype.com/blog/comparing-sbom-standards-spdx-vs.-cyclonedx-vs.-swid
- OpenSSF Scorecard checks (GitHub): https://github.com/ossf/scorecard
- LINDDUN privacy threat categories (linddun.org): https://linddun.org/linddun-go-categories/
- GDPR Article 5 principles (gdpr-info.eu): https://gdpr-info.eu/art-5-gdpr/
- India DPDP Act 2023 + Rules 2025 (EY India): https://www.ey.com/en_in/insights/cybersecurity/decoding-the-digital-personal-data-protection-act-2023
- COPPA six-step compliance plan (FTC): https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-six-step-compliance-plan-your-business
- CCPA consumer rights (California AG): https://oag.ca.gov/privacy/ccpa
- Apple App Privacy details / nutrition labels (Apple Developer): https://developer.apple.com/app-store/app-privacy-details/
- Google Play Data safety (Google Play Help): https://support.google.com/googleplay/android-developer/answer/10787469
- CodeQL supported languages (GitHub/CodeQL docs): https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks/
- Semgrep supported languages (Semgrep docs): https://docs.semgrep.dev/supported-languages
- gitleaks (GitHub): https://github.com/gitleaks/gitleaks
- mobsfscan (GitHub): https://github.com/MobSF/mobsfscan
- OSV-Scanner (Google/OSV docs): https://google.github.io/osv-scanner/
- Trivy docs (Aqua Security): https://trivy.dev/latest/docs/
- OWASP ZAP (zaproxy.org): https://www.zaproxy.org/
- GitHub Actions security hardening (GitHub docs): https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
- GitHub dependency-review-action (GitHub): https://github.com/actions/dependency-review-action
