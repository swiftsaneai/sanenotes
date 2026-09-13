# Sane Notes — Security & Privacy Controls Matrix

> Audience: an autonomous coding agent (or engineer/auditor) who needs to know, for any given
> standard control, **how Sane Notes satisfies it, how that is verified, and which package/area
> owns it**. This is the traceability spine: standard/law → control → implementation →
> verification → owner. Cite the control IDs here in an issue's `security` array and Security
> section (`../../issues/SCHEMA.md`).
>
> **Targets** (locked decision 8): OWASP **MASVS 2.x L2 + R** (mobile), OWASP **ASVS 5.0 L2**
> (web/services), OWASP Top 10 (2021 + 2025), OWASP Mobile Top 10 2024, NIST SSDF, plus GDPR /
> India DPDP 2023 / COPPA privacy obligations. Basis:
> `research/security-standards-and-devsecops.md`.
>
> **Status legend:** Designed (specified, not built) · Planned (issue scheduled) · Partial ·
> Implemented (built + tested/CI) · N/A. At M0 most rows are **Designed** — the value is that
> the *mechanism* and *verification* are fixed now. `TM-*` refers to
> [`threat-model.md`](threat-model.md); MASTG-TEST ids are the procedural companion to MASVS
> and should be treated as "verify the exact current id in MASTG" where marked *(verify)*.
>
> Cross-refs: [`secure-coding-checklist.md`](secure-coding-checklist.md),
> [`ssdlc-process.md`](ssdlc-process.md), [`devsecops-pipeline.md`](devsecops-pipeline.md).

---

## 1. OWASP MASVS v2.1 — mobile clients (Flutter + Swift + Kotlin)

Every control ID → mechanism → verification → owning package. Target **L2 + R**.

### MASVS-STORAGE (data at rest)

| Control | How Sane Notes meets it | Verification (MASTG) | Owner | Status |
|---|---|---|---|---|
| **STORAGE-1** Sensitive data protected in storage | Note content stored in encrypted drift/SQLite + content-addressed encrypted blob store; iOS Data Protection / Android FBE; nothing sensitive in `UserDefaults`/SharedPreferences; sensitive fields AEAD-encrypted (`sane_crypto`) | MASTG-TEST-0200/0201 data-storage review *(verify)*; unit test: DB rows for content are ciphertext | `sane_core`, `sane_crypto`, `sane_secure_store` | Designed |
| **STORAGE-2** Keys secured in platform keystores | Master + wrapped keys in Keychain/Secure Enclave (Apple) and Keystore/StrongBox (Android), non-exportable, biometric-gated; keys excluded from backups | MASTG-TEST keystore review *(verify)*; test: key never written to disk/prefs/backup | `sane_secure_store` (`sane_crypto`) | Designed |

### MASVS-CRYPTO

| Control | How | Verification | Owner | Status |
|---|---|---|---|---|
| **CRYPTO-1** Approved algorithms/modes | XChaCha20-Poly1305 / AES-256-GCM (AEAD), Argon2id KDF, HKDF, Ed25519, SHA-256/BLAKE3; no ECB/static-IV/MD5/SHA-1; CSPRNG only | MASTG-TEST crypto-algorithm review *(verify)*; Semgrep crypto rules; unit test on primitives | `sane_crypto` | Designed |
| **CRYPTO-2** Keys generated & managed securely | Envelope keys (content→items→master); passkey-PRF / keychain / Argon2id ladder; per-item content keys; rotation + revocation; user-held recovery code (no vendor recovery) | KDF-params test; key-rotation/revocation test; MASTG key-management review | `sane_crypto`, `sane_secure_store` | Designed |

### MASVS-AUTH

| Control | How | Verification | Owner | Status |
|---|---|---|---|---|
| **AUTH-1** Auth implemented correctly | OIDC/PKCE + state + nonce; SIWA/Google/Microsoft/OTP; guest mode first-class; note access not derivable from identity | MASTG-TEST auth review; test: account takeover yields no plaintext (TM-S-02) | `app/lib/auth`, `sane_billing` | Designed |
| **AUTH-2** Authorization protects sensitive ops | Sharing/collab and entitlement actions gated; per-note content-key access; revocation by key rotation | Test: revoked collaborator excluded (TM-S-03) | `sane_sync`, `app/lib/auth` | Designed |
| **AUTH-3** Secure session management | Short-lived access tokens + refresh rotation; tokens in secure store; app-lock + auto-lock + RAM key scrub | Session-handling test; app-lock UI test | `app/lib/auth`, `sane_secure_store` | Designed |

### MASVS-NETWORK

| Control | How | Verification | Owner | Status |
|---|---|---|---|---|
| **NETWORK-1** Traffic encrypted/protected | TLS 1.2+ everywhere; no cleartext (Android `usesCleartextTraffic=false`, iOS ATS on); ciphertext-only payloads to cloud/relay | MASTG-TEST network review; test: no cleartext endpoint | `sane_sync`, `sane_cloud_drive`, relay | Designed |
| **NETWORK-2** Certificate validation/pinning | Cert pinning for our own endpoints (relay/entitlement); no `onReceivedSslError` proceed; system trust for third-party (Apple/Google) APIs | MASTG-TEST pinning review; MitM test blocked | `sane_sync`, plugins | Designed |

### MASVS-PLATFORM

| Control | How | Verification | Owner | Status |
|---|---|---|---|---|
| **PLATFORM-1** IPC/exported components/deeplinks protected | `exported=false` default; verified App Links / Universal Links; validated intent extras; immutable PendingIntents; no unguarded providers (TM-E-02, TM-S-04) | MASTG-TEST exported-component + deeplink review; mobsfscan | `app/`, plugins | Designed |
| **PLATFORM-2** WebViews securely configured | No untrusted HTML in privileged WebView; no broad JS bridge; file/universal access disabled; TLS enforced (TM-I-06, TM-E-03) | MASTG-TEST WebView review; ZAP | `app/`, `website/` | Designed |
| **PLATFORM-3** Protected from UI/platform disclosure | FLAG_SECURE/`isSecureTextEntry` for secure notes; excerpt-free notifications; clipboard-clear timers; backup exclusion (TM-I-07/10) | MASTG-TEST screenshot/clipboard/backup review; UI test | `app/`, plugins | Designed |

### MASVS-CODE

| Control | How | Verification | Owner | Status |
|---|---|---|---|---|
| **CODE-1** Targets current platform versions | iPadOS/iOS 17+, Android 10+ minimums; current `compileSdk`/`targetSdk`; keep SDKs updated | Build config check; CI matrix | `app/` | Designed |
| **CODE-2** Deps current & CVE-free | Lockfiles pinned; Dependabot weekly; OSV-Scanner + dependency-review gate (pub/Gradle/npm/SPM) | OSV-Scanner CI; dependency-review PR gate | CI, all packages | Partial |
| **CODE-3** Code-quality/injection flaws prevented | `very_good_analysis` + `dart analyze --fatal-infos`; Semgrep/mobsfscan; parameterised drift SQL; input validation (checklist §1); AST architecture gate (`tools/scripts/arch_check.dart`) over dependency sections, normal/conditional/generated imports, plugin-consumer boundaries and banned logging | Analyze + Semgrep CI; injection tests | all packages | Partial |
| **CODE-4** No unsafe dynamic loading/deserialization | No OTA code, no `dart:mirrors`, no arbitrary deserialize; explicit validated models (TM-T-04) | Semgrep ban rule; design review | `sane_core`, `app/` | Designed |

### MASVS-RESILIENCE (the "+R" profile — E2EE + paid tiers)

| Control | How | Verification | Owner | Status |
|---|---|---|---|---|
| **RESILIENCE-1** Tamper/jailbreak/root detection | Root/jailbreak checks on paid/E2EE tiers; best-effort, non-blocking for guest note-taking (RR6) | MASTG-TEST anti-tamper review | plugins | Planned |
| **RESILIENCE-2** Code/resource integrity | Play App Signing + notarization; no dynamic code; optional integrity checks | Signing enforced in `release.yml`; MASTG review | CI, `app/` | Partial |
| **RESILIENCE-3** Obfuscation & anti-debugging | Release `--obfuscate --split-debug-info`; strip symbols | Build-config check | CI, `app/` | Designed |
| **RESILIENCE-4** Device attestation | Play Integrity (Android) / DeviceCheck+App Attest (Apple) for paid/E2EE features | Attestation integration test | plugins, `sane_billing` | Planned |

### MASVS-PRIVACY

| Control | How | Verification | Owner | Status |
|---|---|---|---|---|
| **PRIVACY-1** Permission mgmt & consent | Lazy, in-context permission requests with rationale; no launch-time prompts | UI test: permission flow; MASTG review | `app/` | Designed |
| **PRIVACY-2** Collection transparency & awareness | "Data leaves device" banner; privacy dashboard; accurate store labels/manifest (TM-P-06) | UI test; store-label accuracy review | `app/`, `sane_ml` | Designed |
| **PRIVACY-3** Retention & user control | Local-first; export (`.sanenote`/PDF/MD); delete/erasure; trash retention windows; account deletion (PRD-03 `DEL`) | Export/delete test; retention test | `app/`, `sane_sync` | Designed |
| **PRIVACY-4** Third-party data-sharing restrictions | No analytics SDK linked; minimise SDKs; cloud AI opt-in only; nothing shared beyond need | Dependency review; egress review (TM-P-08) | all, CI | Designed |

---

## 2. OWASP MASTG / MASWE testing profile

- Target **profile: L2 + R** (E2EE note content + paid tiers) — `research/security-standards-and-devsecops.md` §1.5.
- Verification lives in the **verification phase** ([`ssdlc-process.md`](ssdlc-process.md) §2.4):
  **MobSF** (static + optional dynamic on APK/AAB/IPA), **mobsfscan** (source SAST, MASVS-tagged,
  SARIF → Code Scanning), and manual/assisted pentest against the abuse cases.
- MASWE (weakness enumeration) bridges MASVS → MASTG the way CWE maps to tests; map each finding
  to a `MASWE-*` where the report tool provides it. Treat exact MASTG-TEST / MASWE ids as
  *(verify against current MAS repo)* — the framework re-numbers over time.

---

## 3. OWASP ASVS 5.0 — web client + relay/entitlement services

17 chapters, target **L2**. Note: several chapters are **N/A while services do not exist** (the
relay/entitlement services are optional, stateless, ciphertext-only — overview §1); rows are
kept so they are satisfied *before* those services ship.

| Chapter | Applies to | How Sane Notes meets it | Owner | Status |
|---|---|---|---|---|
| **V1 Encoding & Sanitization** | web | Output encoding by default; sanitise note HTML/markdown via DOMPurify + Trusted Types before any DOM sink (TM-I-06) | `website/`, `app/` (web) | Designed |
| **V2 Validation & Business Logic** | web, S | Schema-validate all input; enforce business rules server-side (entitlement); reject unknown fields | `services/`, web | Designed |
| **V3 Web Frontend Security** | web | Strict nonce CSP, Trusted Types, COOP/COEP, SRI, security headers (checklist §6.2) | `website/` | Designed |
| **V4 API & Web Service** | S | Auth on every endpoint; per-user isolation (no IDOR); rate limits; OpenAPI-defined contract | `services/` | Designed |
| **V5 File Handling** | web, C | Size/type/schema caps; path canonicalisation; off-thread parsing; fail closed (checklist §1) | `sane_pdf`, `sane_audio`, web | Designed |
| **V6 Authentication** | web, S | OIDC/PKCE, passkeys (WebAuthn) preferred; no password storage of our own where avoidable | `app/lib/auth`, web | Designed |
| **V7 Session Management** | web, S | Short-lived tokens, rotation, secure cookie flags (`HttpOnly`/`Secure`/`SameSite`) if cookies used | web, `services/` | Designed |
| **V8 Authorization** | S | Per-user note isolation; entitlement checks server-side; least privilege | `services/` | Designed |
| **V9 Self-contained Tokens** | S | Signed entitlement tokens (verify with pinned key), short TTL, `aud`/`exp`/`nbf` checked (TM-S-05) | `services/entitlements` | Designed |
| **V10 OAuth & OIDC** | web, C | Correct OAuth/OIDC flows (PKCE, state, nonce, redirect allow-list) | `app/lib/auth`, web | Designed |
| **V11 Cryptography** | all | Same primitives as MASVS-CRYPTO; E2EE; HKDF; no homemade crypto | `sane_crypto` | Designed |
| **V12 Secure Communication** | all | TLS 1.2+; HSTS on web; ciphertext-only to cloud/relay | all | Designed |
| **V13 Configuration** | web, S, CI | Secure defaults; debug off in prod; hardened headers; no secrets in config (checklist §0/§8) | CI, `services/`, web | Partial |
| **V14 Data Protection** | all | Data minimisation; E2EE at rest in cloud; no plaintext server storage; export/erasure | all | Designed |
| **V15 Secure Coding & Architecture** | all | Package DAG, Result types, no dynamic code, threat-model-driven design (overview §5/§8) | all | Partial |
| **V16 Security Logging & Error Handling** | all | No content/PII in logs; structured audit events service-side; fail closed; user-safe errors (checklist §7) | `sane_core`, `services/` | Partial |
| **V17 WebRTC** | C, relay | Room-key-encrypted signalling; app-layer E2EE so relay/TURN sees ciphertext; peer auth by Ed25519 (TM-S-03) | `sane_sync`, relay | Designed |

---

## 4. OWASP Top 10 — 2021 (web + services)

| ID | Category | How addressed | Verification | Status |
|---|---|---|---|---|
| A01 | Broken Access Control | Per-user isolation, no IDOR on sync API, note-access via content keys not identity | ZAP + authz tests | Designed |
| A02 | Cryptographic Failures | E2EE, approved primitives, key store, TLS (matrix §1 CRYPTO, ASVS V11) | crypto tests | Designed |
| A03 | Injection | Parameterised drift SQL, input validation, output encoding/Trusted Types | Semgrep + injection tests | Partial |
| A04 | Insecure Design | Threat-model-driven design reviews (ssdlc §2.2); local-first zero-knowledge | design review gate | Partial |
| A05 | Security Misconfiguration | Secure defaults, hardened headers, debug off, no auth-bypass in prod | Trivy misconfig, header test | Partial |
| A06 | Vulnerable/Outdated Components | Dependabot, OSV-Scanner, dependency-review, pinned deps | SCA CI | Partial |
| A07 | Identification & Auth Failures | OIDC/PKCE, passkeys, rate limits, no note-access via identity | auth tests | Designed |
| A08 | Software & Data Integrity Failures | Pinned actions, SLSA provenance, SBOM, no dynamic code, AEAD integrity | provenance + integrity tests | Partial |
| A09 | Security Logging & Monitoring Failures | Service audit events, alerting, no-content logging | log tests | Designed |
| A10 | SSRF | URL/scheme allow-listing; server-side egress controls on services | ZAP + SSRF tests | Designed |

## 4b. OWASP Top 10 — 2025 (RC) delta

The 2025 RC reshuffles and adds supply-chain/resilience themes
(`research/security-standards-and-devsecops.md` §1.2):

| ID (2025) | Category | Sane Notes emphasis |
|---|---|---|
| A01 | Broken Access Control (absorbs SSRF) | as A01+A10 above |
| A02 | Security Misconfiguration (↑) | secure defaults, hardened CI/headers |
| **A03** | **Software Supply Chain Failures** (expanded) | **the pipeline investment: SBOM, pinned SHAs, dependency-review, SLSA L3 target, Scorecard** — see [`devsecops-pipeline.md`](devsecops-pipeline.md) |
| A04 | Cryptographic Failures | E2EE stack |
| A05 | Injection | as A03 (2021) |
| A06 | Insecure Design | threat-model-driven |
| A07 | Authentication Failures | OIDC/passkeys |
| A08 | Software/Data Integrity Failures | provenance + AEAD |
| A09 | Logging & Alerting Failures | audit + alerting |
| **A10** | **Mishandling of Exceptional Conditions** (new) | **fail closed on crypto/sync/parse errors; no partial-decrypt leaks** (TM-T-01, checklist §3) |

---

## 5. OWASP Mobile Top 10 — 2024 (mobile clients)

| ID | Risk | How addressed | `TM-*` | Status |
|---|---|---|---|---|
| M1 | Improper Credential Usage | No hardcoded secrets (`--dart-define`), tokens in secure store, no creds in logs | TM-I-05, TM-S-01 | Partial |
| M2 | Inadequate Supply Chain Security | Pinned deps/actions, SBOM, provenance, dependency-review | TM-T-05 | Partial |
| M3 | Insecure Auth/Authz | OIDC/PKCE, guest-first, per-note key access, no IDOR | TM-S-01/02, TM-E-01 | Designed |
| M4 | Insufficient Input/Output Validation | Validate files/URLs/intents/clipboard; sanitise render; parameterised SQL | TM-T-06, TM-D-01, TM-I-06 | Designed |
| M5 | Insecure Communication | TLS 1.2+, pinning, ciphertext-only payloads | TM-T-01, TM-I-01 | Designed |
| M6 | Inadequate Privacy Controls | On-device default, consent + banner, minimisation, honest labels | TM-P-06/08 | Designed |
| M7 | Insufficient Binary Protections | Obfuscation, no dynamic code, integrity/attestation on paid tiers | TM-T-04 | Partial |
| M8 | Security Misconfiguration | `exported=false`, secure WebView, no cleartext, no auth-bypass in prod | TM-E-02, TM-I-06 | Designed |
| M9 | Insecure Data Storage | Encrypted DB/blobs, keystore, backup exclusion | TM-I-03/10, TM-T-03 | Designed |
| M10 | Insufficient Cryptography | Approved AEAD/KDF, envelope keys, fail-closed AEAD verify | TM-I-02, TM-T-01 | Designed |

---

## 6. NIST SSDF (SP 800-218) practice mapping

Where each practice group is satisfied in this repo (full detail in
[`ssdlc-process.md`](ssdlc-process.md)):

| Practice | Satisfied by |
|---|---|
| **PO.1** Define security requirements | Locked decision 8; issue Security section; this matrix |
| **PO.2** Roles & responsibilities | ssdlc §1 RACI; CODEOWNERS |
| **PO.3** Supporting toolchains | `devsecops.yml`, `scorecard.yml`, pre-commit |
| **PO.4** Criteria for security checks | ssdlc phase gates; branch protection required checks |
| **PO.5** Secure dev environments | GitHub-hosted runners, least-privilege tokens, OIDC deploys |
| **PS.1** Protect code from tampering | Branch protection, signed commits, secret scanning, CODEOWNERS |
| **PS.2** Verify release integrity | Signing (Play/Apple), SLSA provenance, signed tags |
| **PS.3** Archive & protect releases | GitHub Releases + attached SBOM/provenance |
| **PW.1/PW.2** Design to & review for security | Threat model + design review gate (ssdlc §2.2) |
| **PW.4** Reuse well-secured software | Reuse `sane_crypto`/`sane_secure_store`; vetted deps |
| **PW.5** Secure coding | [`secure-coding-checklist.md`](secure-coding-checklist.md) |
| **PW.6** Secure build config | Obfuscation, pinned toolchain, reproducible-ish builds |
| **PW.7** Analyze code for vulns | Semgrep, mobsfscan, CodeQL (planned), dart analyze |
| **PW.8** Test executable code | MobSF, ZAP, fuzzing, integration tests |
| **PW.9** Secure settings by default | Telemetry/AI/sync off by default; lazy permissions |
| **RV.1/RV.2/RV.3** Respond to vulns | SECURITY.md intake, SLA (ssdlc §3), root-cause + regression test |

---

## 7. Privacy obligations mapping (GDPR / India DPDP 2023 / COPPA)

`research/security-standards-and-devsecops.md` §5; threats TM-P-06/07/09.

| Obligation | Source | How Sane Notes meets it | Owner | Status |
|---|---|---|---|---|
| **Lawful basis / consent** (free, specific, informed, withdrawable) | GDPR Art.6; DPDP | In-context consent; telemetry/AI opt-in; withdraw in settings | `app/`, PRD-03 `PRIV` | Designed |
| **Data minimisation** | GDPR Art.5; DPDP | Local-first; on-device AI; no analytics SDK; ciphertext-only cloud; minimise sync metadata (TM-I-04) | all | Designed |
| **Purpose limitation & transparency** | GDPR Art.5; DPDP notice | Privacy dashboard; store labels; clear notices | `app/` | Designed |
| **Storage limitation / retention** | GDPR; DPDP | Trash retention windows; auto-delete options; account deletion (PRD-03 `DEL`) | `sane_sync`, `app/` | Designed |
| **Integrity & confidentiality** | GDPR Art.5; DPDP safeguards | E2EE, keystore, TLS (matrix §1) | `sane_crypto` | Designed |
| **Privacy by design & default** | GDPR Art.25 | Zero-knowledge architecture; secure defaults (PW.9) | all | Designed |
| **Data subject rights** (access, rectify, erase, port, object) | GDPR; DPDP | Export (`.sanenote`/PDF/MD/JSON), edit, delete, portability; no vendor lock-in | `app/`, `sane_sync` | Designed |
| **Breach notification** (72 h to authority under GDPR) | GDPR Art.33; DPDP | Incident runbook + breach clock (ssdlc §4); minimal data to breach by design | Security Owner | Designed |
| **Children** — verifiable parental consent, no behavioural monitoring/ads to minors | COPPA; DPDP Rule 10 | Age gate; no behavioural ads; no minor monitoring; COPPA/DPDP-aware onboarding | `app/`, PRD-03 | Designed |
| **Store privacy declarations** | Apple/Google | Accurate Apple Privacy Labels + Privacy Manifest; Play Data Safety = minimal/no data collected (E2EE/on-device) | Release (ssdlc §2.5) | Designed |
| **Student data (verification)** | DPDP/GDPR minimisation | Store proof not raw docs; short retention; purpose-limited (TM-P-09) | `sane_billing` | Designed |

> CCPA/CPRA: currently below the applicability thresholds (`research/security-standards-and-devsecops.md`
> §5.4); the minimisation posture above already satisfies its core (know/delete/correct/opt-out).
> Re-assess at scale.

---

## 8. Supply-chain & SLSA / SBOM (2025 A03; SSDF PS)

| Control | Target | How | Verification |
|---|---|---|---|
| Pinned dependencies & actions | all | Lockfiles + full-SHA action pins; Dependabot bumps | Scorecard Pinned-Dependencies |
| SBOM per artifact | CycloneDX + SPDX | Trivy/CycloneDX tooling in `release.yml` | SBOM attached to Release |
| Build provenance | **SLSA L2 now, L3 for release** | `actions/attest-build-provenance` on hosted runners | provenance attestation present |
| Signed releases | all | Play App Signing, Apple notarization, signed tags | signing verified in release |
| Repo health | Scorecard ≥ target | `scorecard.yml` scheduled | Scorecard badge/SARIF |

---

## 9. Coverage summary & gaps

| Standard | Target | Current coverage at M0 |
|---|---|---|
| MASVS 2.1 (24 controls) | L2 + R | All mapped; RESILIENCE-1/4 **Planned**, rest **Designed/Partial** |
| ASVS 5.0 (V1–V17) | L2 | All mapped; service chapters activate when `services/` ship |
| OWASP Top 10 2021 + 2025 | full | Mapped; supply-chain (A03/2025) is the active build focus |
| Mobile Top 10 2024 | full | Mapped |
| SSDF | PO/PS/PW/RV | Process defined; CI partially built (CodeQL/MobSF/ZAP still to add) |
| Privacy (GDPR/DPDP/COPPA) | full | Mapped; DPIA per major feature |

**Known gaps to close (tracked as issues):** CodeQL (Swift/Kotlin/JS) job, MobSF + ZAP jobs,
parser fuzzing, RESILIENCE attestation, and moving Partial rows to Implemented as packages land.
The exact CI job list and what still needs adding is in
[`devsecops-pipeline.md`](devsecops-pipeline.md).
