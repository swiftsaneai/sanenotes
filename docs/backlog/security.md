# Backlog — area: security

91 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-CRY-001](security.md#sn-cry-001) **E2EE and key management (sane_crypto): hierarchy, storage, escrow, rotation** (epic · M4 Identity, Sync & Privacy)
  - [SN-CRY-004](security.md#sn-cry-004) **SPIKE: verify the AEAD/Argon2id crypto backend and Dart library choice** · p1 · spike · S · M0 Foundations
  - [SN-CRY-005](security.md#sn-cry-005) **Define the sane_crypto backend interface and primitive wrappers** · p0 · task · M · M4 Identity, Sync & Privacy
  - [SN-CRY-002](security.md#sn-cry-002) **Implement the envelope key hierarchy and key-wrapping (MK/IK/PK/BK)** · p0 · feature · L · M4 Identity, Sync & Privacy
    - [SN-CRY-006](security.md#sn-cry-006) **Envelope-encrypt op-log segments and snapshots with nonce/AAD discipline** · p0 · feature · M · M4 Identity, Sync & Privacy
    - [SN-CRY-007](security.md#sn-cry-007) **Chunk-encrypt content-addressed blobs with per-blob keys** · p1 · feature · M · M4 Identity, Sync & Privacy
    - [SN-CRY-021](security.md#sn-cry-021) **Add crypto known-answer tests and cross-implementation test vectors** · p1 · test · M · M4 Identity, Sync & Privacy
  - [SN-CRY-008](security.md#sn-cry-008) **Build sane_secure_store for Apple: Keychain and Secure Enclave key protection** · p0 · feature · L · M4 Identity, Sync & Privacy
  - [SN-CRY-009](security.md#sn-cry-009) **Build sane_secure_store for Android: Keystore and StrongBox key protection** · p0 · feature · L · M4 Identity, Sync & Privacy
  - [SN-CRY-010](security.md#sn-cry-010) **Define the web PWA at-rest key storage posture (wrapped keys in IndexedDB)** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-CRY-011](security.md#sn-cry-011) **Implement the passkey PRF key source (passwordless E2EE)** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-CRY-012](security.md#sn-cry-012) **Implement the passphrase + Argon2id key source with a strength meter** · p0 · feature · M · M4 Identity, Sync & Privacy
  - [SN-CRY-013](security.md#sn-cry-013) **Build the first-run E2EE setup ceremony and recovery-code save UX** · p0 · feature · L · M4 Identity, Sync & Privacy
  - [SN-CRY-003](security.md#sn-cry-003) **Encode, format and checksum the printable recovery code (SANE1)** · p0 · feature · M · M4 Identity, Sync & Privacy
  - [SN-CRY-014](security.md#sn-cry-014) **Implement master-key escrow via recovery code and platform keychain** · p0 · feature · M · M4 Identity, Sync & Privacy
  - [SN-CRY-015](security.md#sn-cry-015) **Recover access on a new or wiped device via the recovery code** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-CRY-016](security.md#sn-cry-016) **Re-wrap keys on passphrase change and passkey rotation (forward secrecy)** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-CRY-017](security.md#sn-cry-017) **Rotate the master key and items keys on suspected compromise** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-CRY-018](security.md#sn-cry-018) **Seal per-notebook items keys for sharing and re-seal on revocation** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-CRY-019](security.md#sn-cry-019) **Manage device signing keys, the device registry and revocation (Ed25519)** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-CRY-020](security.md#sn-cry-020) **Enforce fail-closed decrypt semantics and the "Paused (no key)" state** · p0 · feature · S · M4 Identity, Sync & Privacy
  - [SN-CRY-022](security.md#sn-cry-022) **Harden crypto paths: constant-time, zeroisation and a banned-primitive lint** · p1 · security · M · M4 Identity, Sync & Privacy
  - [SN-CRY-023](security.md#sn-cry-023) **Re-view and regenerate the recovery code from Settings (biometric-gated)** · p2 · feature · S · M4 Identity, Sync & Privacy
  - [SN-CRY-024](security.md#sn-cry-024) **Verify crypto controls against the threat model and MASVS/ASVS (MASTG)** · p1 · security · M · M7 Beta Hardening & Security Audit
  - [SN-GSEC-002](security.md#sn-gsec-002) **Protect derived-data caches at rest and exclude them from cloud and backup** · p1 · security · M · M4 Identity, Sync & Privacy
- [SN-SEC-001](security.md#sn-sec-001) **Security engineering: threat-model actions, input hardening, MASVS/ASVS verification** (epic · M7 Beta Hardening & Security Audit)
  - [SN-SEC-002](security.md#sn-sec-002) **Review and baseline the STRIDE + LINDDUN threat model** · p1 · security · M · M0 Foundations
  - [SN-SEC-003](security.md#sn-sec-003) **Enforce the secure-coding checklist as a PR gate** · p1 · security · M · M0 Foundations
  - [SN-SEC-004](security.md#sn-sec-004) **Build the untrusted-input validation gate framework** · p1 · security · L · M2 Library & Documents
    - [SN-SEC-005](security.md#sn-sec-005) **Harden the PDF import parser path against malicious documents** · p1 · security · M · M2 Library & Documents
    - [SN-SEC-006](security.md#sn-sec-006) **Harden the image decode path with dimension caps and EXIF stripping** · p1 · security · M · M2 Library & Documents
    - [SN-SEC-007](security.md#sn-sec-007) **Harden .sanenote bundle unpack against path traversal and zip bombs** · p0 · security · M · M2 Library & Documents
    - [SN-SEC-008](security.md#sn-sec-008) **Harden the audio decode path against malformed media** · p1 · security · M · M3 Audio & Recognition
    - [SN-SEC-009](security.md#sn-sec-009) **Harden the custom-font import loader** · p2 · security · S · M3 Audio & Recognition
    - [SN-SEC-010](security.md#sn-sec-010) **Stand up the parser fuzzing harness, corpus and CI gate** · p1 · test · L · M3 Audio & Recognition
  - [SN-SEC-011](security.md#sn-sec-011) **Validate deep links, App Links and Universal Links with an allow-list router** · p1 · security · L · M4 Identity, Sync & Privacy
    - [SN-SEC-012](security.md#sn-sec-012) **Host assetlinks.json and AASA and enable link auto-verification** · p1 · security · M · M5 Phones & Platform Parity
    - [SN-SEC-013](security.md#sn-sec-013) **Add a URL scheme allow-list and SSRF/redirect guard for outbound navigation** · p1 · security · S · M4 Identity, Sync & Privacy
  - [SN-SEC-014](security.md#sn-sec-014) **Harden Android exported components, intents and providers** · p1 · security · M · M4 Identity, Sync & Privacy
  - [SN-SEC-015](security.md#sn-sec-015) **Define and enforce the WebView hardening policy for mobile shells** · p1 · security · M · M4 Identity, Sync & Privacy
  - [SN-SEC-016](security.md#sn-sec-016) **Enforce a strict nonce CSP with Trusted Types and DOMPurify on the web** · p0 · security · L · M2 Library & Documents
    - [SN-SEC-017](security.md#sn-sec-017) **Add COOP/COEP isolation, SRI and hardening headers on the web** · p1 · security · M · M2 Library & Documents
  - [SN-SEC-018](security.md#sn-sec-018) **Add clipboard protection controls for sensitive and locked-note content** · p2 · security · S · M4 Identity, Sync & Privacy
  - [SN-SEC-019](security.md#sn-sec-019) **Add screenshot blocking and notification-excerpt suppression for locked notes** · p2 · security · S · M4 Identity, Sync & Privacy
  - [SN-SEC-020](security.md#sn-sec-020) **Implement app lock with biometric gate, auto-lock and RAM key scrub** · p1 · security · L · M4 Identity, Sync & Privacy
  - [SN-SEC-021](security.md#sn-sec-021) **Harden SaneLog redaction and add no-PII-in-logs regression tests** · p1 · security · M · M1 Ink Editor Alpha
  - [SN-SEC-022](security.md#sn-sec-022) **Enforce TLS 1.2+, no cleartext and certificate pinning for our endpoints** · p1 · security · M · M4 Identity, Sync & Privacy
  - [SN-SEC-023](security.md#sn-sec-023) **Exclude keys and sensitive stores from OS auto-backup** · p1 · security · S · M4 Identity, Sync & Privacy
  - [SN-SEC-024](security.md#sn-sec-024) **Audit and enforce privacy-preserving secure defaults** · p1 · security · M · M4 Identity, Sync & Privacy
  - [SN-SEC-025](security.md#sn-sec-025) **Establish the security regression test suite scaffold** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-SEC-026](security.md#sn-sec-026) **Decide the anti-tamper and MASVS-RESILIENCE posture in an ADR** · p2 · security · M · M7 Beta Hardening & Security Audit
    - [SN-SEC-027](security.md#sn-sec-027) **Implement root/jailbreak detection and device attestation for paid/E2EE tiers** · p2 · security · L · M7 Beta Hardening & Security Audit
    - [SN-SEC-028](security.md#sn-sec-028) **Enforce release obfuscation, symbol stripping and debug-off assertions** · p2 · security · S · M7 Beta Hardening & Security Audit
  - [SN-SEC-029](security.md#sn-sec-029) **Run MASVS L2 verification for storage, keys, crypto and backup** · p1 · security · M · M7 Beta Hardening & Security Audit
  - [SN-SEC-030](security.md#sn-sec-030) **Run MASVS L2 verification for platform, WebView, deep links and leaks** · p1 · security · M · M7 Beta Hardening & Security Audit
  - [SN-SEC-031](security.md#sn-sec-031) **Run MASVS L2 verification for network and resilience** · p1 · security · M · M7 Beta Hardening & Security Audit
  - [SN-SEC-032](security.md#sn-sec-032) **Run ASVS 5.0 L2 verification for the web client and relay** · p1 · security · L · M7 Beta Hardening & Security Audit
  - [SN-SEC-033](security.md#sn-sec-033) **Write the penetration test plan and abuse-case matrix** · p1 · security · M · M7 Beta Hardening & Security Audit
    - [SN-SEC-034](security.md#sn-sec-034) **Track penetration-test findings remediation and risk acceptance** · p1 · security · M · M7 Beta Hardening & Security Audit
  - [SN-SEC-035](security.md#sn-sec-035) **Operationalise the incident-response runbook and breach clock** · p2 · docs · M · M7 Beta Hardening & Security Audit
  - [SN-SEC-036](security.md#sn-sec-036) **Stand up the vulnerability disclosure program and security.txt** · p2 · docs · S · M8 Launch & Growth
  - [SN-GIPAD-013](privacy.md#sn-gipad-013) **Insert photos through the out-of-process picker and ship no Photos permission** · p2 · security · S · M2 Library & Documents
  - [SN-GIPAD-014](security.md#sn-gipad-014) **Suppress locked-note content on mirrored, AirPlay and captured iPad displays** · p2 · security · S · M5 Phones & Platform Parity
  - [SN-GWEB-010](security.md#sn-gweb-010) **Define the browser cross-origin access policy for the relay and entitlement services** · p1 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-GWEB-011](security.md#sn-gweb-011) **Collect CSP, COEP and Trusted Types violation reports without third parties** · p2 · security · M · M2 Library & Documents
  - [SN-GSEC-003](security.md#sn-gsec-003) **Harden domain and email security (DMARC, SPF, DKIM, CAA, HSTS preload, MTA-STS)** · p2 · security · S · M8 Launch & Growth
  - [SN-GSEC-005](security.md#sn-gsec-005) **Establish fail-closed exceptional-conditions handling (OWASP 2025 A10)** · p1 · security · L · M1 Ink Editor Alpha
  - [SN-GSEC-007](security.md#sn-gsec-007) **Run MASVS-PRIVACY L2 verification with MASTG privacy procedures** · p1 · security · M · M7 Beta Hardening & Security Audit
  - [SN-GSEC-008](security.md#sn-gsec-008) **Harden decoded CRDT op validation from sync and collaboration peers** · p1 · security · M · M4 Identity, Sync & Privacy
  - [SN-GSEC-009](security.md#sn-gsec-009) **Operationalise the per-feature security design-review gate** · p1 · security · S · M0 Foundations
  - [SN-GSEC-011](security.md#sn-gsec-011) **Eliminate plaintext transient and temp files in capture and processing** · p1 · security · M · M3 Audio & Recognition
  - [SN-GSEC-013](security.md#sn-gsec-013) **Add server-side anti-automation and rate limiting for services and OTP** · p2 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-GCMP-001](security.md#sn-gcmp-001) **Implement per-notebook and per-folder biometric lock** · p1 · security · L · M4 Identity, Sync & Privacy
  - [SN-GCMP-002](security.md#sn-gcmp-002) **Enforce locked-content behaviour: search, preview, share and backup exclusion** · p1 · security · M · M4 Identity, Sync & Privacy
  - [SN-GOPS-003](security.md#sn-gops-003) **Run the milestone-boundary threat-model revision cycle** · p1 · security · M · M2 Library & Documents
  - [SN-GOPS-017](security.md#sn-gops-017) **Define the post-launch security, privacy and accessibility re-verification cadence** · p2 · docs · M · M8 Launch & Growth
  - [SN-GOPS-020](security.md#sn-gops-020) **Verify requirement, issue, control and test traceability in CI** · p2 · infra · M · M0 Foundations

---

## Issues

### SN-AND-019

<a id="sn-and-019"></a>

**Store keys at rest with Android Keystore, StrongBox & BiometricPrompt**

| Field | Value |
|---|---|
| GitHub | #72 |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | android-tablet, android-phone |
| Areas | security, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `MASVS-STORAGE-1`, `OWASP-A02`, `CWE-312` |
| Extra labels | agent-ready |

#### Context
Sane Notes is zero-knowledge: per-notebook keys are wrapped by a user master key stored in hardware (locked decision 3, docs/platform/android.md §8). The sane_secure_store Android impl encrypts with AES-GCM using a hardware-backed Keystore key — NOT the deprecated Jetpack Security library (EncryptedFile/EncryptedSharedPreferences/MasterKey are deprecated as of 1.1.0, docs/platform/android.md §2 "Deprecated"). It requests StrongBox and tolerates its absence (TEE fallback), and gates key-unwrap with BiometricPrompt + a Keystore CryptoObject. This realises the Android half of the key hierarchy (SN-CRY-002).

#### Scope
**In:** createKey(alias, strongBox, auth) via KeyGenParameterSpec; AES-GCM encrypt/decrypt; keySecurityLevel() reporting STRONGBOX/TEE; BiometricPrompt + CryptoObject gate on decrypt; setInvalidatedByBiometricEnrollment handling.
**Out:** the cross-platform key hierarchy and recovery code (SN-CRY-002/003, consumed here); the app/notebook lock UI (PRD-LOCK-005/006); iOS Keychain (SN-CRY-*).

#### Acceptance criteria
- [ ] Keys are generated with KeyGenParameterSpec (AES-GCM, no ECB, CSPRNG); the deprecated Jetpack Security APIs are not used anywhere (grep-enforced).
- [ ] setIsStrongBoxBacked(true) is requested; when StrongBox is absent the code falls back to TEE and keySecurityLevel() reports the actual level (STRONGBOX vs TEE).
- [ ] Decrypt of an auth-bound key requires BiometricPrompt success via a CryptoObject; a failed/cancelled auth fails closed and reveals no plaintext.
- [ ] Key material never crosses the Pigeon channel in the clear, never lands on disk/logs/backups, and never enters a long-lived Dart provider (CLAUDE.md §7.3, §7.7).
- [ ] AEAD tag is verified before any decrypted byte is used; a tampered ciphertext fails closed (MASVS-CRYPTO-2).

#### Technical notes
Kotlin: KeyGenParameterSpec.Builder(...).setIsStrongBoxBacked(true), setUserAuthenticationParameters(duration, AUTH_BIOMETRIC_STRONG | AUTH_DEVICE_CREDENTIAL), setInvalidatedByBiometricEnrollment(false), BiometricPrompt + CryptoObject, KeyInfo.getSecurityLevel() (docs/platform/android.md §5, §8). sane_secure_store federated plugin (ADR-0012); consumed by sane_crypto (SN-CRY-002, ADR-0007). Approved crypto only (CLAUDE.md §7.7).

#### Security & privacy
Core at-rest control (MASVS-CRYPTO-1/2, MASVS-STORAGE-1, OWASP-A02, CWE-312): hardware-backed AES-GCM, StrongBox where available, biometric-gated unwrap, fail-closed AEAD verification, no key material in logs/channel/backups. Never EncryptedFile. This is a p0 data-protection control — a mistake here breaks the zero-knowledge guarantee.

#### UX notes
The biometric prompt appears only when unwrapping a protected key (opening a locked notebook or first sync), with a clear reason string; device-credential fallback is offered. Nothing about keys is ever shown or logged. On devices without StrongBox the experience is identical (TEE), just a different security-level readout in the privacy dashboard.

#### Test plan
plugins/sane_secure_store/test/keystore_test.dart (AES-GCM round-trip, StrongBox/TEE reporting, fail-closed on tamper); app/test/security/no_key_material_in_logs_test.dart; app/test/security/jetpack_security_absent_test.dart (grep gate); patrol biometric-prompt test on a device; a negative test that cancelled biometric yields no plaintext.

#### Dependencies
SN-CRY-002 (key hierarchy that this Android store backs).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-020

<a id="sn-and-020"></a>

**Attest stateless services with Play Integrity without gating notes**

| Field | Value |
|---|---|
| GitHub | #73 |
| Type | security |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | android-tablet, android-phone |
| Areas | security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-BILL-001](billing.md#sn-bill-001) |
| Security controls | `MASVS-RESILIENCE-1`, `MASVS-AUTH-1`, `CWE-807` |
| Extra labels | needs-credentials |

#### Context
Play Integrity replaces SafetyNet and provides app/device/account verdicts for anti-abuse (docs/platform/android.md §2, §8). Sane Notes uses it ONLY for the stateless entitlement and relay services — never to gate note-taking (locked decision, docs/platform/android.md §8). Verdicts are not cached, enforcement is tiered, and the client stays non-authoritative (Dart AOT is reversible, L6). It supports the billing/entitlements service (SN-BILL-001) and needs a Play Console / cloud project, so it carries needs-credentials.

#### Scope
**In:** requesting standard (and classic where needed) Play Integrity tokens on the client; passing them to the stateless entitlement/relay services for server-side verification; tiered enforcement that degrades to the free tier and never blocks local note-taking; not caching verdicts.
**Out:** the entitlement service itself (SN-BILL-001); the relay (SN-COL-*); auth sign-in ([SN-AND-017](auth.md#sn-and-017)).

#### Acceptance criteria
- [ ] The client requests a Play Integrity token only for entitlement/relay calls; note-taking, the editor and local storage never invoke or depend on it.
- [ ] Verdicts are verified server-side by the stateless service; the client is non-authoritative and enforces nothing security-critical locally.
- [ ] Verdicts are not cached client-side; each protected call obtains a fresh token.
- [ ] Enforcement is tiered: a failed/undetermined verdict degrades to the free tier or a retry, and NEVER blocks opening or editing local notes (fail-open to free, roadmap M8).
- [ ] The cloud project number / API config comes from CI secrets, never committed (needs-credentials).

#### Technical notes
Kotlin: Play Integrity API (StandardIntegrityManager / classic requests) (docs/platform/android.md §2, §8). Token consumed by services/entitlements (SN-BILL-001) and services/relay; server-authoritative model (L6). No verdict caching; tiered enforcement per docs/platform/android.md §8. Config via CI secrets (CLAUDE.md §7.2).

#### Security & privacy
Anti-abuse/resilience (MASVS-RESILIENCE-1, MASVS-AUTH-1, CWE-807 reliance-on-untrusted-input): verdicts are verified server-side, never trusted on-device; the client cannot be the security decision point (Dart AOT reversible, L6). Play Integrity never becomes a note-taking gate, preserving guest-first and offline use.

#### UX notes
Completely invisible in the happy path; users never see an integrity prompt while taking notes. If a verdict fails, the app quietly degrades to the free tier or retries — it never shows a wall that stops someone from writing. Offline and rooted-but-honest users can still take notes.

#### Test plan
services/entitlements/test/play_integrity_verify_test.dart (server-side verification, tiered enforcement); app/test/integrity/no_note_gate_test.dart (note-taking never calls integrity); a negative test that a failed verdict degrades to free without blocking local edits.

#### Dependencies
SN-BILL-001 (entitlements service that consumes verdicts). Blocked on maintainer Play Console / cloud project config.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-028

<a id="sn-and-028"></a>

**Add R8/ProGuard rules and obfuscation for the Kotlin/plugin layer**

| Field | Value |
|---|---|
| GitHub | #81 |
| Type | infra |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | security, ci-cd |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-022](ci-cd.md#sn-and-022) |
| Security controls | `MASVS-RESILIENCE-2`, `MASVS-CODE-2` |
| Extra labels | agent-ready, good first issue |

#### Context
Flutter's --obfuscate renames Dart symbols only; the Kotlin/plugin layer needs R8/ProGuard shrinking and obfuscation, with keep rules for the classes Flutter and each plugin require (docs/platform/android.md L6). This raises the reverse-engineering bar on the native side (which, unlike the Dart AOT snapshot, is directly analysable) while keeping the app working. The security model stays server-authoritative with no client secrets, so this is defence-in-depth, not a substitute for it.

#### Scope
**In:** enabling R8 with minify + resource shrinking for release; ProGuard keep rules for Flutter engine + every plugin (sane_ink_surface, sane_stylus, sane_scribble, sane_secure_store, sane_cloud_drive, sane_ml_native, sane_pdfkit); combining with Dart --obfuscate; verifying no runtime ClassNotFound/reflection breakage.
**Out:** the general build config ([SN-AND-022](ci-cd.md#sn-and-022)); native .so alignment ([SN-AND-021](compat.md#sn-and-021)); any attempt to hide secrets in the client (there are none — CLAUDE.md §7.2).

#### Acceptance criteria
- [ ] The release build runs R8 with minification and resource shrinking; the app functions with no ClassNotFound, missing-reflection or plugin-init failures.
- [ ] Keep rules preserve the required Flutter and per-plugin classes; a smoke run exercises ink, stylus, secure store, cloud drive, ML and PDF plugins without crash.
- [ ] Dart --obfuscate is enabled for release and a symbol map is retained for crash de-obfuscation (stored as a CI secret/artifact, not committed).
- [ ] No secret, key or client-secret is present in the client to obfuscate in the first place (grep-enforced) — obfuscation is defence-in-depth only (L6).
- [ ] The R8 config is documented so new plugins add their keep rules on introduction.

#### Technical notes
Gradle: minifyEnabled/shrinkResources for release; proguard-rules.pro with keep rules per plugin; flutter build --obfuscate --split-debug-info; store the mapping.txt + Dart symbol map as CI artifacts (docs/platform/android.md L6). Server-authoritative model; Play Integrity on the backend ([SN-AND-020](security.md#sn-and-020)). Depends on the build config ([SN-AND-022](ci-cd.md#sn-and-022)).

#### Security & privacy
Resilience/anti-reversing (MASVS-RESILIENCE-2, MASVS-CODE-2): R8 obfuscation raises the native reverse-engineering bar; it is explicitly NOT relied upon for confidentiality (no client secrets, CLAUDE.md §7.2). Symbol/mapping files are secrets-adjacent artifacts kept in CI, never committed.

#### UX notes
Invisible to users; the benefit is a smaller, harder-to-tamper release build. Crash reports (opt-in) still de-obfuscate correctly via the retained mapping, so diagnostics are not lost.

#### Test plan
A CI release build with R8 that runs app/integration_test/plugin_smoke_test.dart exercising every plugin (no ClassNotFound); a test/grep asserting no secret exists to protect; a crash-symbolication check using the retained mapping.

#### Dependencies
SN-AND-022 (Android build config).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-029

<a id="sn-and-029"></a>

**Harden exported Android components, PendingIntents and incoming intents**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | security, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-022](ci-cd.md#sn-and-022), [SN-AND-025](notifications.md#sn-and-025) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PLATFORM-3`, `MASVS-CODE-2`, `MASVS-STORAGE-2`, `ASVS-V13`, `OWASP-A01`, `OWASP-A04`, `CWE-926`, `CWE-927`, `CWE-940`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
The AndroidManifest is the app's public API to every other app on the device, and each Android feature we ship adds a component to it: the widget receiver ([SN-AND-024](notifications.md#sn-and-024)), the recording foreground service ([SN-AND-023](audio.md#sn-and-023)), the App Links activity ([SN-AND-025](notifications.md#sn-and-025)), the ChromeOS CREATE_NOTE activity ([SN-AND-010](input-gestures.md#sn-and-010)) and the SAF entry points ([SN-AND-018](storage.md#sn-and-018)). docs/platform/android.md §8 sets the Android surface target at MASVS 2.x L2, and CLAUDE.md §7.8 states that untrusted input is hostile and that a link must land in view/confirm and never auto-mutate. docs/roadmap.md M7 explicitly lists deep-link forgery and intent redirection as pentest abuse cases, so the controls must already exist by then. This issue is the standing gate that a component is exported only when it must be, that every PendingIntent is immutable, and that every incoming Intent is validated before a single byte of state changes.

#### Scope
**In:** an audit of the merged manifest with an explicit `android:exported` on every component and a documented exported allow-list asserted by a test; a FileProvider with a path allow-list confined to a share-staging directory and per-URI grants; `FLAG_IMMUTABLE` on every PendingIntent; guards against intent redirection (never launching a nested Intent/Parcelable received from outside); type/size/schema validation of every incoming Intent extra; a Semgrep rule plus a manifest snapshot test wired into CI.
**Out:** App Link domain verification and the deep-link routing UX ([SN-AND-025](notifications.md#sn-and-025)); the SAF permission model ([SN-AND-018](storage.md#sn-and-018)); Play Integrity attestation ([SN-AND-020](security.md#sn-and-020)); the cross-platform sharing semantics (SN-SHR-001).

#### Acceptance criteria
- [ ] Every component in the **merged** manifest (app plus all `plugins/*/android` manifests) declares `android:exported` explicitly; the exported set equals a documented allow-list (launcher activity, App Links activity, ChromeOS CREATE_NOTE activity, widget provider, share/VIEW receiver) and a snapshot test fails CI when a new exported component appears without an allow-list entry carrying a justification comment.
- [ ] No ContentProvider is exported; the FileProvider is `exported="false"` with `grantUriPermissions="true"` and a `file_paths.xml` restricted to one share-staging directory. A URI containing `../`, an absolute path, or a symlink resolves to a denial, never to a file outside that directory.
- [ ] Every PendingIntent is constructed with `FLAG_IMMUTABLE`; a Semgrep rule fails the build on `FLAG_MUTABLE` unless the call site is in a commented allow-list and names an explicit component.
- [ ] An instrumented abuse test that fires an Intent carrying a nested `android.intent.extra.INTENT` aimed at a non-exported activity is rejected: nothing launches, no state changes, and the app does not crash.
- [ ] Every incoming Intent's extras are validated before use — expected keys only, expected types, strings capped at 4 KB, URI schemes limited to an allow-list — and malformed input lands on a user-safe error that mutates nothing.
- [ ] No exported component performs a mutating action without an explicit user confirmation step (CLAUDE.md §7.8).
- [ ] `mobsfscan` and a MobSF run on a release-mode AAB report no high findings for exported components, PendingIntent mutability, or provider grants.

#### Technical notes
Touch `app/android/app/src/main/AndroidManifest.xml`, `app/android/app/src/main/res/xml/file_paths.xml`, and review the manifest-merger report so plugin manifests under `plugins/*/android/src/main/AndroidManifest.xml` cannot silently export something (ADR-0012 notes the native bridge is real attack surface). Use `androidx.core.content.FileProvider`; `PendingIntent.FLAG_IMMUTABLE` is mandatory from API 31 and is correct on 29/30 too. The widget provider ([SN-AND-024](notifications.md#sn-and-024)) and the foreground service ([SN-AND-023](audio.md#sn-and-023)) are the two components that legitimately need PendingIntents, so start the allow-list there. Put the snapshot test under `app/test/security/` next to `auth_bypass_test.dart` so security tests stay in one place (CLAUDE.md §10), and register the Semgrep rule in `.github/workflows/devsecops.yml` alongside the existing SAST job ([SN-CI-001](ci-cd.md#sn-ci-001)). Incoming-intent validation belongs in one `app/lib/platform/android_intent_gate.dart` chokepoint returning `Result<T, Failure>` (CLAUDE.md §6) rather than scattered per-handler parsing.

#### Security & privacy
Threats (STRIDE/LINDDUN, docs/security/threat-model.md): **Information disclosure** — a malicious installed app reads note content through an exported provider or an over-broad FileProvider grant (CWE-926, CWE-200, MASVS-PLATFORM-2, MASVS-STORAGE-2). **Elevation/Spoofing** — a hijacked mutable PendingIntent lets another app act with Sane Notes' identity (CWE-927). **Tampering** — intent redirection reaches a private activity and mutates a notebook without consent (CWE-940, OWASP-A01/A04). Controls: deny-by-default export allow-list (MASVS-PLATFORM-1), confined FileProvider paths with per-URI grants, immutable PendingIntents, a single validating chokepoint for every incoming Intent (MASVS-CODE-2, ASVS-V13), and confirm-before-mutate for anything an external app can trigger (MASVS-PLATFORM-3). Baseline: no note content or ink coordinates in logs; no note content is ever placed in an Intent extra or a notification — only opaque short-hash ids; tokens live only in `sane_secure_store`.

#### UX notes
Almost entirely invisible. The one user-visible path is rejection: reuse the standard error state from docs/design/screens-and-flows.md (Sane Sage error illustration, a plain-language line such as "That link didn't look right", and a single Back action) built from `sane_ui` tokens (docs/design/tokens.json) so it renders correctly in all 17 looks and in light + dark. The message must carry no technical detail (no URI, no component name). The dialog is TalkBack-labelled, has 48 dp targets, meets 4.5:1 contrast, and is dismissible with Esc and reachable by keyboard on ChromeOS (docs/design/accessibility.md). Confirmation sheets for externally-triggered actions use the same Confirm component as in-app destructive actions so the affordance is already familiar.

#### Test plan
Add `app/test/security/android_manifest_exported_test.dart` (parses the merged manifest, asserts the exported allow-list and explicit `android:exported` everywhere); `app/test/security/android_intent_gate_test.dart` (unit: oversized extras, wrong types, disallowed URI schemes, missing keys all return `Failure` and mutate nothing); `app/integration_test/android_intent_abuse_test.dart` (patrol: fires a forged VIEW intent, a nested-intent redirection payload, and a traversal FileProvider URI against a release-mode build); a Kotlin unit test in `app/android/app/src/test/` asserting PendingIntent flags; the Semgrep rule plus its fixture test under `.github/semgrep/`; manual MobSF run on the release AAB recorded in the PR.

#### Dependencies
[SN-AND-022](ci-cd.md#sn-and-022) (manifest and build config exist), [SN-AND-025](notifications.md#sn-and-025) (the App Links activity is the first exported deep-link surface to harden).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] docs/platform/android.md §8 and docs/security/controls-matrix.md record the exported allow-list and its MASVS mappings
- [ ] Threat model updated: the exported-component trust boundary and the intent-gate control are listed
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER for security-critical paths

---

### SN-AND-030

<a id="sn-and-030"></a>

**Exclude keys, note content and caches from Android backup and device transfer**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | android-tablet, android-phone |
| Areas | security, storage |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-019](security.md#sn-and-019), [SN-AND-022](ci-cd.md#sn-and-022) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-2`, `MASVS-PRIVACY-2`, `ASVS-V14`, `OWASP-A02`, `CWE-312`, `CWE-359`, `CWE-530` |
| Extra labels | agent-ready |

#### Context
Android Auto Backup and device-to-device transfer copy an app's data directory to Google-held storage or to a new phone **by default**, which directly contradicts locked decision 3 (the device is the system of record and only ciphertext ever leaves it) and CLAUDE.md §7.7, which requires that keys live in `sane_secure_store` and "never on disk/logs/backups". docs/roadmap.md makes it an M4 exit criterion in the same words. Keystore key material itself never leaves the TEE, but everything around it would be swept up unless the backup rules are explicit: the drift/SQLite database, the content-addressed blob store, `sane_sync` op-log segments, wrapped per-notebook key blobs, OAuth/refresh tokens and any decrypted working cache. docs/platform/android.md §8 sets the Android surface at MASVS 2.x L2, where uncontrolled backup of sensitive data is a direct finding.

#### Scope
**In:** `android:dataExtractionRules` (API 31+) and `android:fullBackupContent` (API 29–30) with a deny-by-default rule set covering both the cloud-backup and device-transfer sections; the documented `android:allowBackup` posture; classifying every persisted path as "content-free preference, may transfer" or "never leaves the device"; asserting the rules in tests; and the one line of privacy-dashboard copy that tells the user this is true.
**Out:** the key hierarchy and recovery code (SN-CRY-002/SN-CRY-003, consumed here); the Keystore/StrongBox plugin ([SN-AND-019](security.md#sn-and-019)); the user-initiated backup/restore archive feature (SN-SYNC-001 area); iOS backup exclusion (SN-IPAD-001 area); the Play Data Safety form itself ([SN-AND-026](release.md#sn-and-026)).

#### Acceptance criteria
- [ ] `app/android/app/src/main/res/xml/data_extraction_rules.xml` exists and declares **both** `<cloud-backup>` and `<device-transfer>` sections; both exclude `database`, `file` (blob store and op-log), `sharedpref` holding tokens, and the entire cache directory, with an explicit commented include list for the few content-free preference keys allowed to transfer.
- [ ] `android:fullBackupContent` points at an equivalent `res/xml/backup_rules.xml` so API 29–30 devices get identical exclusions; both files are generated from one source list so they cannot drift.
- [ ] An instrumented test against a release-mode build drives the backup transport and asserts the extracted set contains **no** `.db`/`.db-wal`/`.db-shm` file, no blob-store file, no op-log segment, no wrapped-key blob and no OAuth or refresh token.
- [ ] Wrapped key blobs and tokens resolve under `context.noBackupFilesDir` (or are held only by `sane_secure_store`); a unit test asserts every persistence path used by `sane_core` and `sane_sync` resolves outside any backed-up directory, and fails when a new path is added without classification.
- [ ] Restoring a backup onto a second device opens to the guest/first-run state with **zero** notes visible, and no encrypted material becomes usable until the recovery code or a signed-in key unwrap succeeds — never silent plaintext access.
- [ ] The privacy dashboard states that app data is excluded from Google backup, and the claim matches the shipped rules (checked in the same test run).

#### Technical notes
Files: `app/android/app/src/main/AndroidManifest.xml` (`android:allowBackup`, `android:dataExtractionRules`, `android:fullBackupContent`) and the two XML rule files under `app/android/app/src/main/res/xml/`. Path layout comes from the drift schema plus the content-addressed blob store (docs/architecture/file-format.md, [SN-CORE-004](storage.md#sn-core-004)) and `sane_sync` op-log segments (docs/architecture/sync.md, [SN-SYNC-002](sync.md#sn-sync-002)). Prefer **exclude everything, include specific keys** over listing files to exclude, so a new file is safe by default. **Doc gap, decided here:** docs/platform/android.md does not state whether `allowBackup` should be `false` outright or `true` with total exclusion. The default taken is `allowBackup="true"` with a deny-by-default rule set — a user's content-free preferences (chosen look, handedness, stylus settings) survive a device upgrade while no note data or key material ever leaves the device. Record this in docs/platform/android.md §8; if the maintainer prefers the stricter `allowBackup="false"`, it is a one-line change and the tests still pass. ADR-0004 (local-first, zero server) and ADR-0007 (E2EE and keys) are the governing decisions.

#### Security & privacy
Threats: **Information disclosure / LINDDUN Disclosure** — note ciphertext plus wrapped keys landing in a Google-held backup creates a second copy outside the user's control and weakens the zero-knowledge guarantee (CWE-530, CWE-312, MASVS-STORAGE-1). **Elevation** — an attacker holding the user's Google account restores onto their own device and gains an offline attack surface against the wrapped keys (CWE-359, OWASP-A02). **Repudiation of the product promise** — the Play Data Safety declaration and privacy dashboard would be inaccurate. Controls: deny-by-default backup and device-transfer rules (MASVS-STORAGE-1/2), key material only in hardware-backed Keystore/StrongBox and never serialised into a backed-up path (MASVS-CRYPTO-2), no plaintext cache written anywhere backed up, a recovery-code/unwrap gate before any restored ciphertext is usable, and transparency in the privacy dashboard (MASVS-PRIVACY-2, ASVS-V14). Baseline: no note content or PII in logs; tokens only in secure storage; no new network egress.

#### UX notes
One new line in Settings → Privacy (the privacy dashboard in docs/design/screens-and-flows.md §12): "Your notes are excluded from Google backup — they stay on this device unless you sync them to your own cloud." Plus the restore-on-new-device empty state, which uses the standard Sane Sage empty-state illustration with "Your notes stay on your old device — sign in and sync, or restore from your own backup" and a single primary action. Both are built from `sane_ui` tokens (docs/design/tokens.json) and must render correctly across all 17 looks in light and dark; text is TalkBack-readable, targets are 48 dp, contrast ≥ 4.5:1, and the action is keyboard-reachable on ChromeOS (docs/design/accessibility.md). No scary language — the empty state is reassuring, not an error.

#### Test plan
`app/test/security/android_backup_rules_test.dart` (parses both XML rule files; asserts deny-by-default, the include allow-list, and that cloud-backup and device-transfer sections agree); `packages/sane_core/test/storage/no_backup_paths_test.dart` (every persistence path resolves outside a backed-up directory; fails on an unclassified new path); `app/integration_test/android_backup_exclusion_test.dart` (patrol, release-mode: run the backup transport, inspect the extracted set, restore onto a clean profile and assert zero notes visible); manual verification with `adb shell bmgr backupnow` plus a restore on the Android-A16 reference slot (docs/platform/compatibility-matrix.md §2), recorded in the PR.

#### Dependencies
[SN-AND-019](security.md#sn-and-019) (Keystore-backed secure store defines where key material lives), [SN-AND-022](ci-cd.md#sn-and-022) (manifest and build config exist).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] docs/platform/android.md §8 records the allowBackup posture and the rule set; docs/security/controls-matrix.md maps MASVS-STORAGE-1/2
- [ ] Threat model updated: backup/device-transfer is listed as a data flow with its control
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER for security-critical paths

---

### SN-CRY-001

<a id="sn-cry-001"></a>

**E2EE and key management (sane_crypto): hierarchy, storage, escrow, rotation**

| Field | Value |
|---|---|
| GitHub | #11 |
| Type | epic |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, storage, sync |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `ASVS-V11`, `OWASP-A02`, `OWASP-A04`, `OWASP-A10`, `CWE-311`, `CWE-320`, `CWE-327`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
Cryptography is one of the two things Sane Notes promises to get right (locked decision 8; "security & privacy first by architecture"). `packages/sane_crypto` is the **lowest layer of the package DAG** (imports nothing internal — CLAUDE.md §3) and owns the whole zero-knowledge stack: the approved primitives, the envelope key hierarchy, envelope encryption of every synced byte, hardware-backed key storage via the `sane_secure_store` plugin, the master-key escrow + printable recovery code, key rotation and device/collaborator revocation, and the fail-closed decrypt discipline. The cloud drive, the network and any relay are **untrusted** and must only ever hold ciphertext they cannot read (docs/architecture/crypto.md §0; docs/security/threat-model.md TM-I-01). This epic delivers PRD-KEY-001…010 and ADR-0007 across milestone M4 (docs/roadmap.md M4), with sharing keys extending into M6 and verification into M7. It does **not** own where ciphertext sits on disk (docs/architecture/file-format.md §6) or how it moves ([SN-SYNC-001](sync.md#sn-sync-001)); those consume the primitives defined here.

#### Scope
**In:** the `sane_crypto` backend interface + primitives; the MK/IK/PK/BK envelope hierarchy; segment/snapshot and blob envelope encryption with nonce/AAD discipline; the `sane_secure_store` plugin (Keychain/Secure Enclave, Keystore/StrongBox, web); the key-source ladder (passkey PRF, passphrase+Argon2id, platform-keychain); escrow + recovery code (format/checksum/UX/recovery flow); rotation (passphrase change, MK/IK compromise); per-notebook sharing seal + revocation; device signing keys + registry; fail-closed semantics; KATs/test vectors; side-channel/timing hardening + crypto-lint; crypto threat-model verification.
**Out:** OIDC token handling ([SN-AUTH-001](auth.md#sn-auth-001)); the sync transport/op-log format ([SN-SYNC-001](sync.md#sn-sync-001), docs/architecture/file-format.md); parser/input hardening ([SN-SEC-001](security.md#sn-sec-001)); privacy dashboard/store labels ([SN-PRV-001](privacy.md#sn-prv-001)); collaboration transport ([SN-COL-001](collaboration.md#sn-col-001), docs/adr/0013).

#### Acceptance criteria
- [ ] Every child issue below is delivered with its named test file and its `TM-*`/MASVS/PRD-KEY IDs.
- [ ] M4 exit gates hold (docs/roadmap.md M4): everything written to the cloud is ciphertext only; AEAD tag verified before use, fail-closed; a cloud/account compromise yields no note plaintext; keys never hit disk/logs/backups; the recovery code restores access; no vendor recovery path exists.
- [ ] Only approved primitives ship (crypto.md §1); a CI crypto-lint blocks banned primitives and `dart:math` Random on crypto paths.
- [ ] A passphrase change / rotation re-wraps keys only, never re-encrypts note bytes (envelope payoff).

#### Technical notes
Owner package `packages/sane_crypto` (pure Dart, no `package:flutter`) behind a stable `Aead`/`Kdf`/`KeyStore`/`Signer`/`KeyAgreement` interface so a later Rust-core swap is a one-package change (crypto.md §8, docs/adr/0001). Native key storage in `plugins/sane_secure_store` (Swift + Kotlin) and a new `plugins/sane_auth` for passkey PRF (crypto.md §8, docs/adr/0012). Implements docs/adr/0007-end-to-end-encryption-and-keys.md and docs/architecture/crypto.md §1–§9; consumed by docs/architecture/file-format.md §3.3/§5.2/§6 and docs/architecture/sync.md.

#### Security & privacy
This epic **is** the confidentiality guarantee. Threats: TM-I-01/02/03 (cloud breach, weak-passphrase brute force, key extraction), TM-T-01/02 (ciphertext tamper/rollback), TM-S-02/03 (account/peer spoofing yields no plaintext), TM-E-01 adjacency, TM-P-05 (disclosure), RR1/RR6 residuals. Controls: MASVS-CRYPTO-1/2, MASVS-STORAGE-1/2, ASVS V11, OWASP-A02 (Cryptographic Failures), A10 (fail closed), CWE-311/320/327/522 (docs/security/controls-matrix.md).

#### UX notes
Crypto is invisible in the happy path and honest in the exceptional path (docs/design/screens-and-flows.md Settings → Sync & Security; onboarding E2EE setup). The recovery-code screen, the "Paused (no key)" state and the "Sane cannot recover your notes" copy are the only user-facing surfaces; children own their themed-across-17-looks + dark, a11y-labelled, 44pt-target screens.

#### Test plan
Aggregate: `packages/sane_crypto/test/` (unit + KATs), `plugins/sane_secure_store/*/test`, `app/test/security/` (ceremony, fail-closed, no-key-in-logs), crypto-lint CI job. Each child names its own files.

#### Dependencies
Spans M0 (spike) → M7 (verification). Cross-epic: [SN-CORE-004](storage.md#sn-core-004) (blob store), [SN-CORE-005](storage.md#sn-core-005) (.sanenote), [SN-SYNC-001](sync.md#sn-sync-001) (op-log/segments), [SN-AUTH-001](auth.md#sn-auth-001) (identity, key-setup trigger), [SN-SEC-001](security.md#sn-sec-001) (threat-model IDs), [SN-SET-001](settings.md#sn-set-001) (settings), [SN-ONB-001](onboarding.md#sn-onb-001) (onboarding).

### Children
- [ ] [SN-CRY-002](security.md#sn-cry-002) Envelope key hierarchy & key-wrapping (MK/IK/PK/BK)
- [ ] [SN-CRY-003](security.md#sn-cry-003) Recovery code format, encoding & checksum (SANE1)
- [ ] [SN-CRY-004](security.md#sn-cry-004) SPIKE: verify AEAD/Argon2id crypto backend & library
- [ ] [SN-CRY-005](security.md#sn-cry-005) sane_crypto backend interface & primitive wrappers
- [ ] [SN-CRY-006](security.md#sn-cry-006) Envelope-encrypt op-log segments & snapshots
- [ ] [SN-CRY-007](security.md#sn-cry-007) Chunked envelope encryption of content-addressed blobs
- [ ] [SN-CRY-008](security.md#sn-cry-008) sane_secure_store: Apple Keychain + Secure Enclave
- [ ] [SN-CRY-009](security.md#sn-cry-009) sane_secure_store: Android Keystore + StrongBox
- [ ] [SN-CRY-010](security.md#sn-cry-010) Web PWA at-rest key storage posture
- [ ] [SN-CRY-011](security.md#sn-cry-011) Passkey PRF key source (WebAuthn prf)
- [ ] [SN-CRY-012](security.md#sn-cry-012) Passphrase + Argon2id key source & strength meter
- [ ] [SN-CRY-013](security.md#sn-cry-013) First-run E2EE setup ceremony & recovery-code save UX
- [ ] [SN-CRY-014](security.md#sn-cry-014) Master-key escrow (recovery-code + platform keychain)
- [ ] [SN-CRY-015](security.md#sn-cry-015) Recovery on a new/wiped device
- [ ] [SN-CRY-016](security.md#sn-cry-016) Passphrase change / passkey rotation re-wrap
- [ ] [SN-CRY-017](security.md#sn-cry-017) Master-key & items-key rotation on compromise
- [ ] [SN-CRY-018](security.md#sn-cry-018) Per-notebook items-key sharing seal & revocation re-seal
- [ ] [SN-CRY-019](security.md#sn-cry-019) Device signing keys, registry & revocation (Ed25519)
- [ ] [SN-CRY-020](security.md#sn-cry-020) Fail-closed decrypt semantics & "Paused (no key)" state
- [ ] [SN-CRY-021](security.md#sn-cry-021) Crypto known-answer tests & test vectors
- [ ] [SN-CRY-022](security.md#sn-cry-022) Side-channel/timing hardening, zeroisation & crypto-lint
- [ ] [SN-CRY-023](security.md#sn-cry-023) Re-view / regenerate recovery code from Settings
- [ ] [SN-CRY-024](security.md#sn-cry-024) Crypto threat-model verification & MASTG mapping

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-002

<a id="sn-cry-002"></a>

**Implement the envelope key hierarchy and key-wrapping (MK/IK/PK/BK)**

| Field | Value |
|---|---|
| GitHub | #202 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-STORAGE-2`, `ASVS-V11`, `OWASP-A02`, `CWE-320`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
docs/architecture/crypto.md §2 and ADR-0007 decision 2 mandate **envelope (hierarchical) encryption** (the Standard Notes / Notesnook blueprint): a key source unwraps the **Master Key (MK)**; the MK wraps per-notebook **Items Keys (IK)**; each IK wraps per-page **Page Keys (PK)** and per-blob **Blob Keys (BK)**; the leaf keys do the bulk AEAD. This is what makes a passphrase change or a rotation re-wrap only keys, never the gigabytes of notes (PRD-KEY-001, P0). This issue builds the pure-Dart key-hierarchy engine in `sane_crypto`: minting keys, wrapping/unwrapping each level with AEAD, and the in-memory key cache holding the MK only while unlocked. Every synced byte's confidentiality (TM-I-01) reduces to this hierarchy and to A2 (the master key) holding.

#### Scope
**In:** value types for MK/IK/PK/BK and their wrapped forms; `deriveMasterKey(sourceSecret)` via HKDF (`info="sane/master/v1"`); `wrapKey`/`unwrapKey` at each level using the [SN-CRY-005](security.md#sn-cry-005) AEAD; mint a fresh random IK per notebook (or small pool), PK per page, BK per blob; an in-RAM `KeyRing` that holds the unwrapped MK transiently and derives/caches IKs on demand, scrubbed on lock/background; serialisation of wrapped keys for the sync `keys/` store (crypto.md §2, file-format §4.2 `encryption` block).
**Out:** the key **source** that yields the source secret ([SN-CRY-011](security.md#sn-cry-011)/[SN-CRY-012](security.md#sn-cry-012)); where the wrapped MK is stored in hardware ([SN-CRY-008](security.md#sn-cry-008)/[SN-CRY-009](security.md#sn-cry-009)); segment/blob bulk encryption ([SN-CRY-006](security.md#sn-cry-006)/[SN-CRY-007](security.md#sn-cry-007)); escrow ([SN-CRY-014](security.md#sn-cry-014)).

#### Acceptance criteria
- [ ] A round-trip mint → wrap → unwrap succeeds at every level (MK→IK→PK/BK); an IK unwrapped under the wrong MK fails closed.
- [ ] A simulated passphrase change re-wraps IKs only and leaves all PK/BK bytes and all note ciphertext unchanged (envelope payoff proven by byte comparison).
- [ ] Each page and each blob gets a distinct key; keys are generated only from the [SN-CRY-005](security.md#sn-cry-005) CSPRNG.
- [ ] The MK exists only inside the `KeyRing` in RAM; a lock event scrubs it and subsequent unwrap requires re-unlock (unit-proven, no MK on disk/logs).
- [ ] Wrapped-key serialisation round-trips and rejects an unknown/oversized schema (strict parse).

#### Technical notes
`packages/sane_crypto/lib/src/hierarchy/` — `key_ring.dart`, `envelope.dart`, `wrapped_key.dart`. Pure Dart. Follow the crypto.md §2 table for scope/lifetime/wrapping. The `KeyRing` never persists the MK; it receives it from a source and holds it in a scrubbe-able buffer. Reference docs/adr/0007 decision 2, docs/architecture/crypto.md §2, docs/architecture/file-format.md §4.2. Consumed by [SN-SYNC-002](sync.md#sn-sync-002).

#### Security & privacy
Threats: TM-I-01 (cloud breach — only ciphertext leaves, keys wrap keys), TM-I-03 (MK never persisted decrypted), TM-T-01 (AEAD-wrapped keys reject tamper). Controls: MASVS-CRYPTO-2 (key management/hierarchy), MASVS-STORAGE-2, ASVS V11, OWASP-A02, CWE-320 (key management errors), CWE-522 (insufficiently protected credentials). Implements PRD-KEY-001.

#### UX notes
None beyond baseline (library). The user-facing payoff — an instant passphrase change with no re-upload — is surfaced in [SN-CRY-016](security.md#sn-cry-016). Baseline: no key bytes logged; wrapped keys are opaque.

#### Test plan
`packages/sane_crypto/test/hierarchy/key_ring_test.dart`, `envelope_test.dart`: full round-trip at each level, wrong-MK-fails-closed, passphrase-change-rewraps-only (byte-diff), distinct-per-item keys, RAM-scrub-on-lock, strict-schema-reject. KATs in [SN-CRY-021](security.md#sn-cry-021).

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-003

<a id="sn-cry-003"></a>

**Encode, format and checksum the printable recovery code (SANE1)**

| Field | Value |
|---|---|
| GitHub | #203 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-STORAGE-2`, `ASVS-V11`, `OWASP-A02`, `CWE-320`, `CWE-330` |
| Extra labels | agent-ready |

#### Context
Zero-knowledge means no vendor recovery, so the user-held **recovery code** is mandatory (docs/architecture/crypto.md §5/§5.1; ADR-0007 decision 6; PRD-KEY-005). This issue builds the pure-Dart codec for the code: 128-bit random recovery secret R (the KEK material), encoded as **Crockford base32** (0-9 A-Z minus I L O U; case-insensitive; `-` group separators), with a **2-symbol checksum** and a `SANE1-` version prefix, laid out in groups of 4 (e.g. `SANE1-4H7Q-2K9M-8XR3-B0TW-6VN5-9C2D-QF`). The reader strips separators, upcases, applies Crockford leniency (I/L→1, O→0), validates the checksum, and **rejects on mismatch before any doomed decrypt** — catching transcription errors up front (threat TM: "recovery code mistyped → silent wrong-key"). The exact checksum scheme is a documented "verify/decide" item (crypto.md §10) to finalise here.

#### Scope
**In:** generate R from the [SN-CRY-005](security.md#sn-cry-005) CSPRNG; encode 128-bit R → 26 Crockford base32 symbols + 2-symbol checksum, `SANE1-` prefixed, grouped in 4s; a strict reader (strip/upcase/lenient-map/validate-checksum/reject-on-mismatch); the `SANE1` version tag so a future scheme is distinguishable; finalise and unit-prove the checksum (Crockford mod-37 vs CRC-10) transcription-error detection rate; derive `KEK_recovery = HKDF(R)` for [SN-CRY-014](security.md#sn-cry-014).
**Out:** the escrow wrap of the MK under KEK_recovery ([SN-CRY-014](security.md#sn-cry-014)); the save/confirm UX ([SN-CRY-013](security.md#sn-cry-013)); recovery on a new device ([SN-CRY-015](security.md#sn-cry-015)); the optional BIP-39 mnemonic variant (deferred, crypto.md §5.1/§10 licensing verify).

#### Acceptance criteria
- [ ] A generated code round-trips: encode(R) then decode == R for random R (property test over many samples).
- [ ] A single-symbol transcription error is detected by the checksum and rejected before any decrypt attempt (measured detection rate documented).
- [ ] Crockford leniency works: lower-case input, `I/L`→1, `O`→0, and optional hyphens all decode to the same R.
- [ ] R is 128-bit and sourced only from the CSPRNG; a non-`SANE1` prefix is rejected as an unknown version.
- [ ] The code and R are never logged; `toString` does not print the secret.

#### Technical notes
`packages/sane_crypto/lib/src/recovery/recovery_code.dart`, pure Dart, using [SN-CRY-005](security.md#sn-cry-005) CSPRNG + HKDF. Implement and pick the checksum per crypto.md §5.1 (finalise the §10 open item; record the choice in ADR-0007 notes). Reference docs/architecture/crypto.md §5.1, docs/adr/0007 decision 6, PRD-KEY-005.

#### Security & privacy
Threats: recovery-code mistype → silent wrong key (integrity/UX), TM-I-02 adjacency (KEK strength). Controls: MASVS-CRYPTO-2, MASVS-STORAGE-2, ASVS V11, OWASP-A02, CWE-320 (key management), CWE-330 (insufficient randomness). The code is A3 (Critical) — never stored by us, never transmitted (checklist §3.1). Implements PRD-KEY-005 (code generation half).

#### UX notes
None directly (the display/save flow is [SN-CRY-013](security.md#sn-cry-013)); this issue defines the exact grouped string format the UI renders and the lenient parser the recovery screen uses so a user can type with or without hyphens/case. Baseline: never log the code.

#### Test plan
`packages/sane_crypto/test/recovery/recovery_code_test.dart`: encode/decode round-trip (property), single/double-symbol-error detection, leniency mapping, wrong-version-reject, CSPRNG-only, no-secret-in-logs. Feeds KATs [SN-CRY-021](security.md#sn-cry-021).

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-004

<a id="sn-cry-004"></a>

**SPIKE: verify the AEAD/Argon2id crypto backend and Dart library choice**

| Field | Value |
|---|---|
| GitHub | #204 |
| Type | spike |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | security, storage |
| Size | S |
| SDLC | design |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | — |
| Security controls | `MASVS-CRYPTO-1`, `OWASP-A02`, `CWE-327` |
| Extra labels | agent-ready |

#### Context
ADR-0007 and docs/architecture/crypto.md §1/§8/§10 lock the approved primitives (XChaCha20-Poly1305, Argon2id 64 MiB/5/1, HKDF-SHA-256, BLAKE3-256, Ed25519, X25519) but explicitly leave the **Dart backend** to a time-boxed "verify" step: does `cryptography`/`cryptography_flutter` expose native XChaCha20-Poly1305 and Argon2id, or must we adopt libsodium via `sodium`/`sodium_libs` (and `sodium.js` for web)? Is Argon2id at the reference params acceptable on a 4 GB Android and low-end web WASM, or must we tune or offer a passkey-only path? This spike de-risks the whole `sane_crypto` implementation before M4 by picking the backend, matching the roadmap M0 note "sane_crypto primitive selection stubbed (ADR-0007)" (docs/roadmap.md M0). Getting this wrong forces a mid-M4 backend swap on the project's most security-critical package.

#### Scope
**In:** benchmark and compare candidate backends for the full primitive set on the three reference devices + Chrome/Safari web; confirm XChaCha20-Poly1305 and Argon2id availability and native acceleration; measure Argon2id wall-time at 64 MiB/5/1 on low-end Android and web WASM; confirm BLAKE3 availability (else SHA-256 multihash fallback); write the decision (chosen backend, per-platform notes, any param/fallback recommendation) as an ADR update/appendix to ADR-0007.
**Out:** implementing the interface ([SN-CRY-005](security.md#sn-cry-005)) or any primitive; the secure-store plugin ([SN-CRY-008](security.md#sn-cry-008)/[SN-CRY-009](security.md#sn-cry-009)); passkey PRF probing ([SN-CRY-011](security.md#sn-cry-011)).

#### Acceptance criteria
- [ ] A written decision names one primary backend covering AEAD + Argon2id + HKDF + Ed25519 + X25519 on iOS, Android and web, with evidence.
- [ ] Measured Argon2id time at 64 MiB/5/1 recorded for the low-end Android and web WASM; if > an agreed UX budget, a documented tuning or passkey-only recommendation is given (never below 64 MiB/5 without a new ADR — crypto.md §10).
- [ ] XChaCha20-Poly1305 exposure confirmed (native vs libsodium) and BLAKE3-vs-SHA-256 decision recorded.
- [ ] The verify items in crypto.md §10 relevant to the backend are closed or explicitly deferred with owners.

#### Technical notes
Produce a throwaway harness under `tools/` (not shipped); candidates: `sodium`/`sodium_libs` (libsodium FFI, `sodium.js` web) vs `cryptography`/`cryptography_flutter` (crypto.md §8 table). Do not hand-roll primitives. Record findings in docs/adr/0007-end-to-end-encryption-and-keys.md notes/follow-ups. Reference docs/architecture/crypto.md §1, §8, §10.

#### Security & privacy
Threats: TM-I-02 (weak KDF → brute force) informs the Argon2id decision. Controls: MASVS-CRYPTO-1 (approved algorithms/modes), OWASP-A02, CWE-327 (broken/risky crypto if a backend lacks a primitive). Baseline: the spike touches no user data, logs no content, and hardcodes no keys/secrets in the harness.

#### UX notes
None beyond baseline (research spike). The only UX-relevant output is the Argon2id-time finding feeding the passphrase-vs-passkey recommendation surfaced later in [SN-CRY-012](security.md#sn-cry-012)/[SN-CRY-013](security.md#sn-cry-013).

#### Test plan
The harness is throwaway; the deliverable is the written decision. Include the benchmark numbers table and a minimal reproducibility script under `tools/crypto_bench/`. No production test files.

#### Dependencies
None (may run in parallel with M0 scaffolding).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-005

<a id="sn-cry-005"></a>

**Define the sane_crypto backend interface and primitive wrappers**

| Field | Value |
|---|---|
| GitHub | #205 |
| Type | task |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-004](security.md#sn-cry-004) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `ASVS-V11`, `OWASP-A02`, `CWE-327`, `CWE-330` |
| Extra labels | agent-ready |

#### Context
docs/architecture/crypto.md §8 requires `sane_crypto` to wrap whichever backend the spike ([SN-CRY-004](security.md#sn-cry-004)) selects behind a stable interface — `Aead`, `Kdf`, `KeyStore`, `Signer`, `KeyAgreement` — so a backend swap (e.g. to a Rust core per docs/adr/0001) is a one-package change and callers never touch a concrete library. This is the foundation every other CRY issue builds on: the primitives (XChaCha20-Poly1305, Argon2id, HKDF-SHA-256, BLAKE3-256, Ed25519, X25519) and the CSPRNG are exposed only through these interfaces, with approved parameters baked in so a caller cannot pick a wrong mode. It is the lowest layer of the DAG (CLAUDE.md §3), pure Dart, imports nothing internal.

#### Scope
**In:** the abstract interfaces and a concrete backend implementation of: AEAD seal/open (XChaCha20-Poly1305 with 192-bit random nonce; AES-256-GCM alt with derived nonce), `Kdf.deriveKey` (Argon2id at locked params + HKDF-SHA-256 expand with `info` labels), `Signer` (Ed25519 sign/verify), `KeyAgreement` (X25519), content hashing (BLAKE3-256/SHA-256), and a `SecureRandom` sourced only from the platform CSPRNG; typed `SecretKey`/`Nonce`/`AeadResult` value objects; `Result<T, Failure>` returns, never thrown exceptions across the boundary.
**Out:** the key hierarchy ([SN-CRY-002](security.md#sn-cry-002)); hardware key storage — `KeyStore` is an interface here, implemented natively in [SN-CRY-008](security.md#sn-cry-008)/[SN-CRY-009](security.md#sn-cry-009); envelope encryption of segments/blobs ([SN-CRY-006](security.md#sn-cry-006)/[SN-CRY-007](security.md#sn-cry-007)).

#### Acceptance criteria
- [ ] AEAD seal then open round-trips; a flipped ciphertext or tag byte fails open and returns `Failure`, never partial plaintext (fail closed).
- [ ] `SecureRandom` is the only nonce/salt/key source; a unit/arch-lint test proves `dart:math` `Random` is unreachable from crypto paths.
- [ ] Argon2id runs at exactly 64 MiB / 5 iters / p=1 with a 128-bit salt; params are not caller-overridable below the floor.
- [ ] HKDF derives distinct keys for distinct `info` labels; Ed25519 and X25519 vectors pass.
- [ ] 100% of the public API carries `///` dartdoc and explicit return types; the package does not import `package:flutter`.

#### Technical notes
`packages/sane_crypto/lib/src/` — `aead.dart`, `kdf.dart`, `signer.dart`, `key_agreement.dart`, `key_store.dart`, `secure_random.dart`, plus the backend adapter selected by [SN-CRY-004](security.md#sn-cry-004). Bake in crypto.md §1 params; expose `info` labels like `sane/master/v1` (crypto.md §2). Zeroise key buffers after use (checklist §3 SHOULD). Reference docs/adr/0007 decision 1 and docs/architecture/crypto.md §1, §8.

#### Security & privacy
Threats: TM-I-01/02/03, TM-T-01. Controls: MASVS-CRYPTO-1 (approved algs only), MASVS-CRYPTO-2 (key management), ASVS V11, OWASP-A02, CWE-327 (risky crypto), CWE-330 (insufficiently random values). No egress; no key/nonce/content logged; secrets never hardcoded (checklist §0).

#### UX notes
None beyond baseline (pure library). Baseline: no key material or content in logs; `SecretKey.toString()` must not print bytes.

#### Test plan
`packages/sane_crypto/test/aead_test.dart`, `kdf_test.dart`, `signer_test.dart`, `key_agreement_test.dart`, `secure_random_test.dart`: round-trip, tamper-fails-closed, KDF-param-floor, distinct-info-labels, RFC/libsodium test vectors, and an arch-lint test banning `dart:math` Random. Full KAT suite is [SN-CRY-021](security.md#sn-cry-021).

#### Dependencies
[SN-CRY-004](security.md#sn-cry-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-006

<a id="sn-cry-006"></a>

**Envelope-encrypt op-log segments and snapshots with nonce/AAD discipline**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-002](security.md#sn-cry-002) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-NETWORK-1`, `ASVS-V11`, `OWASP-A02`, `OWASP-A08`, `CWE-323`, `CWE-353` |
| Extra labels | agent-ready |

#### Context
Every op-log record and every snapshot body written to the user's cloud must already be ciphertext under a **page key**, with a fresh random 192-bit XChaCha20 nonce per message and **position-binding AAD** so a malicious drive cannot cut-and-paste, reorder or roll back records (docs/architecture/crypto.md §2.1; docs/architecture/file-format.md §3.3, §2.4). This is the concrete write-side of the load-bearing invariant "only ciphertext ever leaves the device" (threat-model TM-I-01) and the tamper defence TM-T-01/02. It sits between the storage/sync layer and the key hierarchy: given a page key from the `KeyRing` ([SN-CRY-002](security.md#sn-cry-002)), it seals/opens the encrypted record frames the file format defines.

#### Scope
**In:** seal/open of the encrypted op-log record frame (file-format §3.3) and the snapshot body (file-format §2), keyed by the page key; a fresh random 192-bit nonce per message; AAD binding `magic‖version‖deviceId‖segmentSeq‖recordIndex` for records and the snapshot equivalent; AES-256-GCM alt path with a **derived** (never random) 96-bit nonce; verify tag before returning any byte and fail closed; a `SealedSegment`/`SealedSnapshot` codec the sync layer writes/reads.
**Out:** the op-log/segment file layout and the CRDT ([SN-SYNC-002](sync.md#sn-sync-002), file-format §3); blob encryption ([SN-CRY-007](security.md#sn-cry-007)); the manifest integrity/signature chain ([SN-CRY-019](security.md#sn-cry-019), file-format §4.4).

#### Acceptance criteria
- [ ] A record sealed with one AAD position cannot be opened at a different position (reorder/cut-and-paste rejected — AAD mismatch fails closed).
- [ ] Every message uses a fresh CSPRNG nonce; two seals of identical plaintext produce different ciphertext (XChaCha path).
- [ ] The AES-256-GCM alt path derives its nonce (counter/HKDF), never random; a nonce-reuse attempt is impossible by construction (unit-proven).
- [ ] A flipped byte anywhere in a sealed segment/snapshot causes open to fail closed with no partial apply.
- [ ] A rolled-back (lower-seq) segment presented after a higher-seq one is detectable via the position-bound AAD + seq (handoff to [SN-SYNC-002](sync.md#sn-sync-002) verified).

#### Technical notes
`packages/sane_crypto/lib/src/envelope/segment_cipher.dart`. Uses [SN-CRY-002](security.md#sn-cry-002) page keys and [SN-CRY-005](security.md#sn-cry-005) AEAD. AAD layout per crypto.md §2.1 and file-format §3.3. One scheme per store (XChaCha default). Reference docs/adr/0007 decision 3, docs/architecture/crypto.md §2.1, docs/architecture/file-format.md §2/§3.3. Consumed by [SN-SYNC-002](sync.md#sn-sync-002).

#### Security & privacy
Threats: TM-T-01 (segment tamper), TM-T-02 (replay/rollback via AAD+seq), TM-I-01 (ciphertext-only egress). Controls: MASVS-CRYPTO-1, MASVS-NETWORK-1, ASVS V11, OWASP-A02, OWASP-A08 (integrity — verify before use), CWE-323 (nonce reuse), CWE-353 (missing integrity check). Fail closed per PRD-KEY-009.

#### UX notes
None beyond baseline (library). A tag/rollback failure surfaces as the [SN-CRY-020](security.md#sn-cry-020) "Paused (no key)"/"Sync paused" state, never garbled content. Baseline: no plaintext or nonce logged.

#### Test plan
`packages/sane_crypto/test/envelope/segment_cipher_test.dart`: reorder-rejected, fresh-nonce, GCM-derived-nonce, flipped-byte-fails-closed, rollback-detectable. Fixture segments only (no user content). KATs in [SN-CRY-021](security.md#sn-cry-021).

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002). Cross-epic: [SN-SYNC-002](sync.md#sn-sync-002) (segment format/consumer).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-007

<a id="sn-cry-007"></a>

**Chunk-encrypt content-addressed blobs with per-blob keys**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-002](security.md#sn-cry-002) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-STORAGE-1`, `ASVS-V11`, `OWASP-A02`, `CWE-323`, `CWE-770` |
| Extra labels | agent-ready |

#### Context
Attachments (images, PDFs, audio, stroke-geometry blobs) are large and immutable; they are stored content-addressed and must be encrypted under a **per-blob key (BK)** so mobile never loads a whole file into memory to encrypt and so a per-blob key bounds the blast radius (docs/architecture/crypto.md §2 payoffs; secure-coding-checklist §3 SHOULD "stream/chunk-encrypt large attachments"). Each chunk gets its own AEAD frame with AAD binding `blobId‖chunkIndex` (crypto.md §2.1; file-format §5.2) so a malicious drive cannot swap or reorder chunks. This is the blob-side counterpart to segment encryption ([SN-CRY-006](security.md#sn-cry-006)) and is what keeps a 600-page PDF import within the memory budget while still E2E-encrypted.

#### Scope
**In:** streaming chunked seal/open keyed by the BK; fixed chunk size with per-chunk XChaCha20-Poly1305 and AAD `blobId‖chunkIndex`; a `SealedBlob` reader/writer that never holds more than one chunk (plus budget) in memory; content-addressing computed over plaintext via BLAKE3-256/SHA-256 for dedup while stored bytes are ciphertext; immutable-BK lifecycle (a blob is immutable so its key never rotates in place).
**Out:** the blob store on disk and dedup index ([SN-CORE-004](storage.md#sn-core-004), file-format §5); the stroke-geometry blob schema (file-format §5.3); segment encryption ([SN-CRY-006](security.md#sn-cry-006)); rotation of already-shared blobs (best-effort note in [SN-CRY-018](security.md#sn-cry-018)).

#### Acceptance criteria
- [ ] A large blob seals and opens streaming, holding at most one chunk (+budget) in memory (measured, no whole-file load).
- [ ] A chunk moved to a different index or swapped between blobs fails to open (AAD mismatch, fail closed).
- [ ] Each blob uses a distinct CSPRNG key; identical plaintext blobs still content-address identically (hash over plaintext) yet store as distinct ciphertext (fresh nonces).
- [ ] A truncated final chunk / missing chunk fails closed with no partial blob returned.
- [ ] Chunk size and per-chunk overhead are documented and match file-format §5.2.

#### Technical notes
`packages/sane_crypto/lib/src/envelope/blob_cipher.dart`, using [SN-CRY-002](security.md#sn-cry-002) blob keys and [SN-CRY-005](security.md#sn-cry-005) AEAD; BLAKE3/SHA-256 from [SN-CRY-005](security.md#sn-cry-005). AAD per crypto.md §2.1; framing per file-format §5.1/§5.2. Stream via chunk iterators, never `readAsBytes` on a large file (checklist §3). Reference docs/adr/0007 decision 3, docs/architecture/crypto.md §2, docs/architecture/file-format.md §5.

#### Security & privacy
Threats: TM-I-01 (blob ciphertext-only), TM-T-01 (chunk tamper/swap), TM-D-04 adjacency (memory bound). Controls: MASVS-CRYPTO-1, MASVS-STORAGE-1, ASVS V11, OWASP-A02, CWE-323 (nonce reuse), CWE-770 (unbounded resource — chunk bound). No egress of plaintext.

#### UX notes
None beyond baseline (library). The visible effect is that large-attachment import/sync stays smooth and within the memory budget (decision 7). Baseline: no blob content or key logged; `blobId` logs as an opaque short hash.

#### Test plan
`packages/sane_crypto/test/envelope/blob_cipher_test.dart`: streaming-memory-bound, chunk-swap-fails-closed, distinct-key/same-content-hash, truncated-chunk-fails-closed. Synthetic blobs only. KATs in [SN-CRY-021](security.md#sn-cry-021).

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002). Cross-epic: [SN-CORE-004](storage.md#sn-core-004) (blob store consumer).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-008

<a id="sn-cry-008"></a>

**Build sane_secure_store for Apple: Keychain and Secure Enclave key protection**

| Field | Value |
|---|---|
| GitHub | #206 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, ios-phone |
| Areas | security, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005) |
| Security controls | `MASVS-STORAGE-2`, `MASVS-CRYPTO-2`, `MASVS-PLATFORM-1`, `ASVS-V11`, `OWASP-A02`, `CWE-311`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
Raw key material must never touch disk in the clear: the wrapped Master Key lives in the **Keychain** and is wrapped/unwrapped by a **non-exportable Secure Enclave** key, gated by biometrics, with note files under `NSFileProtectionComplete` (docs/architecture/crypto.md §3 Apple; ADR-0007 decision 4). This is the Apple implementation of the `KeyStore` interface ([SN-CRY-005](security.md#sn-cry-005)) as a federated plugin, since `flutter_secure_storage` cannot express Secure Enclave usage, `.biometryCurrentSet` invalidation, or accessibility flags (crypto.md §8/§10 "likely need a bespoke plugins/sane_secure_store"). It is P0 because A2 (the master key) is the asset the whole zero-knowledge guarantee rests on (threat-model TM-I-03).

#### Scope
**In:** a Swift plugin implementing store/load/delete of the wrapped MK in Keychain (`kSecClassGenericPassword`, accessibility `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` for the device-local copy); a Secure Enclave P-256 key (`kSecAttrTokenIDSecureEnclave`, `kSecAttrKeyTypeECSECPrimeRandom`) that wraps/unwraps the MK via ECDH; `SecAccessControlCreateWithFlags(.privateKeyUsage, .biometryCurrentSet)` gating so the key invalidates on biometric change; `LAContext` unlock; exclude key material from backup; the Dart platform-interface binding.
**Out:** the Android store ([SN-CRY-009](security.md#sn-cry-009)); web ([SN-CRY-010](security.md#sn-cry-010)); iCloud Keychain escrow copy ([SN-CRY-014](security.md#sn-cry-014)); the key-source ceremony ([SN-CRY-013](security.md#sn-cry-013)).

#### Acceptance criteria
- [ ] The wrapped MK stored via the plugin is not readable without device unlock + biometric; a MASTG keystore review confirms non-exportable Enclave usage.
- [ ] Changing the device's biometric enrolment invalidates the vault Enclave key (`.biometryCurrentSet`), proven on device/simulator.
- [ ] Platform-channel arguments (lengths, encoding, null) are validated before use; a bad argument returns an error, never crashes the host (checklist §2).
- [ ] Key material is excluded from iCloud/iTunes backup; no key ever appears in `UserDefaults`, logs, or a file.
- [ ] The plugin exposes only the allow-listed `KeyStore` methods; no method executes arbitrary code.

#### Technical notes
`plugins/sane_secure_store/ios` (Swift, ARC) + `darwin` shared where possible; federated platform-interface in Dart (docs/adr/0012-native-plugin-strategy.md). Least-permissive Keychain accessibility (checklist §9.2). Never force-unwrap untrusted channel args. Reference docs/architecture/crypto.md §3 Apple, docs/adr/0007 decision 4, research apple-pencil-ipados-capabilities §10.

#### Security & privacy
Threats: TM-I-03 (key extraction from storage), TM-I-10 (backup exfiltration), TM-E-02 adjacency (native entry points). Controls: MASVS-STORAGE-2, MASVS-CRYPTO-2, MASVS-PLATFORM-1, ASVS V11, OWASP-A02, CWE-311 (missing encryption of sensitive data at rest), CWE-522. Implements PRD-KEY-002 (platform keychain rung).

#### UX notes
Biometric prompt (Face ID/Touch ID) on unlock and on key use for a locked notebook (docs/design/screens-and-flows.md app/notebook lock). Prompt copy is themed and localised; a cancelled prompt leaves the vault locked, never partially open. VoiceOver labels the prompt; respects Dynamic Type.

#### Test plan
`plugins/sane_secure_store/example/integration_test/apple_keystore_test.dart` + Swift unit tests: store/load/delete round-trip, biometric-invalidation, bad-argument-rejected, backup-exclusion, no-key-in-logs. MASTG-TEST-0208-equivalent recorded for [SN-CRY-024](security.md#sn-cry-024).

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-009

<a id="sn-cry-009"></a>

**Build sane_secure_store for Android: Keystore and StrongBox key protection**

| Field | Value |
|---|---|
| GitHub | #207 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | android-tablet, android-phone |
| Areas | security, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005) |
| Security controls | `MASVS-STORAGE-2`, `MASVS-CRYPTO-2`, `MASVS-PLATFORM-1`, `ASVS-V11`, `OWASP-A02`, `CWE-311`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
The Android counterpart of [SN-CRY-008](security.md#sn-cry-008): a non-exportable **Android Keystore** AES-256 (or EC) key wraps the Master Key, requesting **StrongBox** (`setIsStrongBoxBacked(true)`) where a secure element exists, else TEE, and bound to user auth via `BiometricPrompt.CryptoObject` (docs/architecture/crypto.md §3 Android; ADR-0007 decision 4). The deprecated Jetpack Security `EncryptedFile`/`MasterKey` (June 2025) must **not** be used — encrypt with AES-GCM under a Keystore key directly (crypto.md §1, secure-coding-checklist §9.3). This is P0 for the same reason as the Apple store: it protects A2, the asset the whole guarantee rests on (TM-I-03).

#### Scope
**In:** a Kotlin plugin generating a non-exportable Keystore key (StrongBox-preferred via `KeyInfo.getSecurityLevel()` check, TEE fallback) that wraps/unwraps the MK with AES-GCM; `setUserAuthenticationParameters(duration, AUTH_BIOMETRIC_STRONG | AUTH_DEVICE_CREDENTIAL)` and per-operation `BiometricPrompt.CryptoObject` gating; a per-feature `setInvalidatedByBiometricEnrollment` choice (invalidate-on-enrolment for the vault key); `allowBackup` rules excluding key material; the Dart platform-interface binding.
**Out:** the Apple store ([SN-CRY-008](security.md#sn-cry-008)); web ([SN-CRY-010](security.md#sn-cry-010)); Android backup/block-store escrow copy ([SN-CRY-014](security.md#sn-cry-014)); the ceremony ([SN-CRY-013](security.md#sn-cry-013)).

#### Acceptance criteria
- [ ] The MK-wrapping key is non-exportable and StrongBox-backed where available (verified via `getSecurityLevel()`); TEE fallback documented.
- [ ] Key use requires `BiometricPrompt` auth; a cancelled/failed prompt yields no key and no partial unlock.
- [ ] New biometric enrolment invalidates the vault key (chosen binding), proven on a device/emulator.
- [ ] No key is stored in `SharedPreferences`, logs, or a file; key material excluded from `allowBackup`/`fullBackupContent`.
- [ ] Deprecated Jetpack Security APIs are absent (grep/CI check); AES-GCM under a Keystore key is used directly.

#### Technical notes
`plugins/sane_secure_store/android` (Kotlin), federated platform-interface (docs/adr/0012). Validate all channel args; no `Log.d` of sensitive data (checklist §9.3). StrongBox availability differs by device — capability query, not SDK-version assumption. Reference docs/architecture/crypto.md §3 Android, docs/adr/0007 decision 4, research android-stylus-capabilities §6.

#### Security & privacy
Threats: TM-I-03 (key extraction), TM-I-10 (backup), TM-E-02 adjacency. Controls: MASVS-STORAGE-2, MASVS-CRYPTO-2, MASVS-PLATFORM-1, ASVS V11, OWASP-A02, CWE-311, CWE-522. Implements PRD-KEY-002 (platform keychain rung). Rooted-device residual is RR6 (best-effort).

#### UX notes
Biometric/device-credential prompt on unlock and locked-notebook key use (docs/design/screens-and-flows.md app/notebook lock); themed, localised, TalkBack-labelled, 48dp targets. A denied prompt keeps the vault locked.

#### Test plan
`plugins/sane_secure_store/example/integration_test/android_keystore_test.dart` + Kotlin unit tests: StrongBox-preference, biometric-gated-use, enrolment-invalidation, no-key-in-prefs/logs, backup-exclusion, no-deprecated-API. MASTG keystore review recorded for [SN-CRY-024](security.md#sn-cry-024).

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-010

<a id="sn-cry-010"></a>

**Define the web PWA at-rest key storage posture (wrapped keys in IndexedDB)**

| Field | Value |
|---|---|
| GitHub | #208 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | web |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `ASVS-V11`, `OWASP-A02`, `CWE-311`, `CWE-522` |
| Extra labels | agent-ready, needs-decision |

#### Context
The web PWA has **no hardware keystore equivalent**, so its at-rest posture is a reduced-guarantee one that must be implemented honestly and labelled (docs/architecture/crypto.md §3 Web; CLAUDE.md §13 open decision "Web PWA at-rest protection reduced-guarantee posture"). The design: prefer **passkey PRF** ([SN-CRY-011](security.md#sn-cry-011)) so the unwrapping secret is authenticator-held; store only **wrapped** keys in IndexedDB; hold the unwrapped MK in memory for the session and derive it from the passkey/passphrase each session; there is no hardware binding. This issue implements the web `KeyStore` and the storage/eviction handling, and records the accepted reduction in the privacy dashboard. Whether we accept and label this posture (vs. requiring a passkey-only path on web) is a maintainer decision (`needs-decision`).

#### Scope
**In:** a web `KeyStore` implementation storing only wrapped keys in IndexedDB (never raw); MK held in memory per session, scrubbed on tab close/lock; WebCrypto `SubtleCrypto` for AEAD/HKDF and libsodium WASM (`sodium.js`) for XChaCha20-Poly1305 + Argon2id (WebCrypto lacks both); `navigator.storage.persist()` from a user gesture + `estimate()` headroom check with graceful `QuotaExceededError`/eviction handling; a documented, labelled statement of the reduced guarantee; a runtime capability probe (passkey PRF availability) selecting the strongest path.
**Out:** the passkey PRF source itself ([SN-CRY-011](security.md#sn-cry-011)); mobile hardware stores ([SN-CRY-008](security.md#sn-cry-008)/[SN-CRY-009](security.md#sn-cry-009)); the privacy dashboard UI ([SN-PRV-001](privacy.md#sn-prv-001)); the final accept/label decision (maintainer).

#### Acceptance criteria
- [ ] IndexedDB holds only wrapped/ciphertext keys; the unwrapped MK never persists to IndexedDB/localStorage (inspected).
- [ ] The session MK is scrubbed from memory on tab close, lock and visibility-hidden timeout.
- [ ] Argon2id + XChaCha20-Poly1305 run via WASM; a low-end-device time is measured and within the [SN-CRY-004](security.md#sn-cry-004) budget (or falls to passkey-only).
- [ ] `navigator.storage.persist()` is requested from a user gesture; `QuotaExceededError`/eviction degrades gracefully with a user-safe message.
- [ ] The reduced guarantee (no hardware binding) is stated in a machine-readable posture record for the privacy dashboard.

#### Technical notes
`packages/sane_crypto` web conditional + `app/` web bootstrap; `SubtleCrypto` + `sodium.js` WASM (crypto.md §3 Web, §8). Wrap all storage calls in try/catch (checklist §9.1 web quota). COOP/COEP isolation for multithreaded WASM is owned by [SN-SEC-001](security.md#sn-sec-001) but required here for `sodium.js`. Reference docs/architecture/crypto.md §3/§10, docs/adr/0010-web-pwa-strategy.md.

#### Security & privacy
Threats: TM-I-03 (no hardware key store — reduced), TM-I-01 (still ciphertext-only egress). Controls: MASVS-STORAGE-1, MASVS-CRYPTO-2, ASVS V11, OWASP-A02, CWE-311, CWE-522. Residual accepted + labelled per CLAUDE.md §13; feeds TM-P-06 (awareness). PRD-KEY-002.

#### UX notes
On web, onboarding states the reduced protection plainly and prefers passkey (docs/design/screens-and-flows.md onboarding/Settings). Storage-eviction warning is a themed, a11y-labelled banner; keyboard-reachable. Covers all 17 looks + dark on the shared web shell.

#### Test plan
`packages/sane_crypto/test/web/web_key_store_test.dart` (+ integration on Chrome): wrapped-only storage, MK-scrub-on-close, quota-exceeded-graceful, WASM-primitive-available, posture-record-present.

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005). Related: [SN-CRY-011](security.md#sn-cry-011). Cross-epic: [SN-SEC-001](security.md#sn-sec-001) (COOP/COEP), [SN-PRV-001](privacy.md#sn-prv-001) (label).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-011

<a id="sn-cry-011"></a>

**Implement the passkey PRF key source (passwordless E2EE)**

| Field | Value |
|---|---|
| GitHub | #209 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, auth |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005), [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CRYPTO-2`, `ASVS-V11`, `OWASP-A02`, `OWASP-A07`, `CWE-522`, `CWE-308` |
| Extra labels | agent-ready, innovation |

#### Context
The top rung of the key-source ladder is **passkey PRF** — passwordless *and* E2EE (docs/architecture/crypto.md §4.1; ADR-0007 decision 5A). The WebAuthn `prf` extension makes the authenticator evaluate a hardware-backed HMAC and return a stable 32-byte secret, biometric-gated and platform-synced (iCloud Keychain / Google Password Manager), which HKDF turns into the Master Key. This is the best UX + best security together and a genuine differentiator most note apps lack (innovation). Because there is no turnkey Dart PRF package, it is implemented in a new `plugins/sane_auth` via platform WebAuthn/Credential Manager/ASAuthorization APIs, with a runtime capability probe since PRF support is uneven across browsers/authenticators in 2026 (crypto.md §4.1/§10).

#### Scope
**In:** a `plugins/sane_auth` PRF binding on Apple (ASAuthorization), Android (Credential Manager) and web (WebAuthn `prf`); a runtime **capability probe** that detects PRF availability and falls back to [SN-CRY-012](security.md#sn-cry-012) passphrase when absent; evaluate PRF over `hash("WebAuthn PRF\0"‖salt)` → 32-byte secret → HKDF(`info="sane/master/v1"`) → MK; the two-salt (`first`/`second`) evaluation used for rotation ([SN-CRY-016](security.md#sn-cry-016)); MK handed to the [SN-CRY-002](security.md#sn-cry-002) `KeyRing`, never persisted.
**Out:** OIDC sign-in / accounts ([SN-AUTH-001](auth.md#sn-auth-001)); the passphrase rung ([SN-CRY-012](security.md#sn-cry-012)); the setup ceremony UX ([SN-CRY-013](security.md#sn-cry-013)); rotation orchestration ([SN-CRY-016](security.md#sn-cry-016)).

#### Acceptance criteria
- [ ] A PRF-capable authenticator yields a stable 32-byte secret across ceremonies for the same salt; the derived MK unwraps the user's IKs.
- [ ] The capability probe correctly reports PRF availability per platform/browser and falls back to passphrase when unavailable (no dead-end).
- [ ] The PRF secret and derived MK are never written to disk/logs; MK lives only in the `KeyRing`.
- [ ] Two-salt evaluation returns distinct secrets for `first`/`second` (rotation precondition proven).
- [ ] A cancelled/failed authenticator ceremony returns a `Failure`, never a partial unlock.

#### Technical notes
`plugins/sane_auth` (Swift + Kotlin + web JS interop), federated platform-interface added to the ADR-0012 set (crypto.md §8 notes it is not yet in the plugin list). HKDF + hashing from [SN-CRY-005](security.md#sn-cry-005). Probe at runtime, never assume by platform (crypto.md §4.1 2026 snapshot). Reference docs/architecture/crypto.md §4.1, docs/adr/0007 decision 5, docs/adr/0012.

#### Security & privacy
Threats: TM-I-02 (no guessable password to brute-force), TM-S-01 adjacency (phishing-resistant). Controls: MASVS-AUTH-1, MASVS-CRYPTO-2, ASVS V11, OWASP-A02, A07 (auth failures), CWE-522, CWE-308 (single-factor for a sensitive op — mitigated by hardware+biometric). Implements PRD-KEY-002 rung (1). Note access is not derivable from identity (TM-S-02) — PRF secret is independent of any OIDC login.

#### UX notes
Onboarding "Use Face ID/fingerprint to protect your notes" defaulting to passkey where supported (docs/design/screens-and-flows.md onboarding E2EE setup). Fallback to passphrase is seamless when unsupported. Prompts themed across 17 looks + dark, localised, screen-reader-labelled, keyboard-reachable on web.

#### Test plan
`plugins/sane_auth/example/integration_test/passkey_prf_test.dart` + probe unit tests with virtual authenticators (WebAuthn) and platform mocks: stable-secret, probe-accuracy, fallback-path, two-salt-distinct, cancel-fails-closed. No secret in logs asserted.

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005), [SN-CRY-002](security.md#sn-cry-002). Related: [SN-CRY-012](security.md#sn-cry-012) (fallback). Cross-epic: [SN-AUTH-001](auth.md#sn-auth-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-012

<a id="sn-cry-012"></a>

**Implement the passphrase + Argon2id key source with a strength meter**

| Field | Value |
|---|---|
| GitHub | #210 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005), [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CRYPTO-1`, `ASVS-V11`, `OWASP-A02`, `OWASP-A07`, `CWE-521`, `CWE-916` |
| Extra labels | agent-ready |

#### Context
The cross-platform fallback rung of the ladder is **passphrase → Argon2id → MK** (docs/architecture/crypto.md §4.3; ADR-0007 decision 5C), required for cross-ecosystem users and web without passkeys. The KDF is memory-hard Argon2id at the locked reference params (64 MiB / 5 iters / p=1, 128-bit salt derived from a stored random seed so no shared/weak salts), which is what stops a weak passphrase being brute-forced from stolen cloud ciphertext (threat-model TM-I-02). This is P0 because it is the guaranteed-available path when no passkey/hardware exists, and getting its params or salt handling wrong undermines every synced note. It also enforces a strength meter and forbids a PIN as the sole MK source (crypto.md §4.3).

#### Scope
**In:** passphrase → Argon2id (locked params) → HKDF → MK using [SN-CRY-005](security.md#sn-cry-005); per-user 128-bit salt derived from a stored random seed + user id; a passphrase strength meter (entropy estimate) with a minimum floor; rejection of a numeric-only PIN as the sole source; the derived MK handed to the [SN-CRY-002](security.md#sn-cry-002) `KeyRing`; a "this device is slow" awareness hook feeding the [SN-CRY-004](security.md#sn-cry-004) tuning recommendation without lowering the floor.
**Out:** passkey PRF ([SN-CRY-011](security.md#sn-cry-011)); the recovery code ([SN-CRY-003](security.md#sn-cry-003)); passphrase-change re-wrap ([SN-CRY-016](security.md#sn-cry-016)); the ceremony screen composition ([SN-CRY-013](security.md#sn-cry-013)).

#### Acceptance criteria
- [ ] Argon2id runs at exactly 64 MiB / 5 iters / p=1 with a 128-bit salt; the params are not lowerable at runtime (a lower value is rejected).
- [ ] The salt is unique per user (derived from a stored seed); two users with the same passphrase derive different MKs.
- [ ] The strength meter rejects a passphrase below the entropy floor and a numeric-only PIN as the sole source.
- [ ] The derived MK unwraps the user's IKs and is never persisted to disk/logs.
- [ ] Argon2id runtime is measured on the low-end reference device and surfaced to the ceremony (slow-device path), never below the floor.

#### Technical notes
`packages/sane_crypto/lib/src/sources/passphrase_source.dart` + strength estimator; Argon2id via the [SN-CRY-004](security.md#sn-cry-004) backend. Salt seed stored (not secret) alongside wrapped keys; never a global/constant salt (checklist §3). Reference docs/architecture/crypto.md §1/§4.3/§10, docs/adr/0007 decision 1/5. Never lower params without a new ADR (crypto.md §10).

#### Security & privacy
Threats: TM-I-02 (brute force of stolen ciphertext). Controls: MASVS-AUTH-1, MASVS-CRYPTO-1 (Argon2id, not PBKDF2), ASVS V11, OWASP-A02, A07, CWE-521 (weak password requirements — enforced by meter), CWE-916 (weak password hashing — Argon2id memory-hard). Implements PRD-KEY-002 rung (3).

#### UX notes
Passphrase entry with live strength meter and the honest "there is no password reset" note (docs/design/screens-and-flows.md onboarding E2EE setup; PRD-KEY-004). Themed across 17 looks + dark, localised, screen-reader-labelled, 44pt/48dp targets, keyboard-reachable on web; show/hide passphrase toggle.

#### Test plan
`packages/sane_crypto/test/sources/passphrase_source_test.dart`: param-floor-enforced, unique-salt, meter-rejects-weak/PIN, MK-derivation, no-secret-in-logs; a slow-device timing assertion (mocked).

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005), [SN-CRY-002](security.md#sn-cry-002). Related: [SN-CRY-004](security.md#sn-cry-004) (params), [SN-CRY-011](security.md#sn-cry-011) (preferred rung).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-013

<a id="sn-cry-013"></a>

**Build the first-run E2EE setup ceremony and recovery-code save UX**

| Field | Value |
|---|---|
| GitHub | #211 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, onboarding |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-003](security.md#sn-cry-003), [SN-CRY-011](security.md#sn-cry-011), [SN-CRY-012](security.md#sn-cry-012), [SN-CRY-014](security.md#sn-cry-014) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-AUTH-1`, `ASVS-V11`, `OWASP-A02`, `OWASP-A04`, `CWE-522`, `CWE-320` |
| Extra labels | agent-ready |

#### Context
Turning on sync/E2EE for the first time MUST run a short, correct ceremony: choose a key source (default passkey where supported, else passphrase), then **immediately generate and force the user to save a recovery code before any data is encrypted for upload** (PRD-KEY-003, P0). The ceremony is also where the honest zero-knowledge cost is stated in student-readable language: "There is no password reset. If you lose your recovery code and your devices, your notes cannot be recovered — not even by us." (PRD-KEY-004). Guest note-taking never triggers this — it is prompted only when the user enables cloud sync or note lock (crypto.md §4 first-run note; ADR-0007 decision 10). This wires the sources ([SN-CRY-011](security.md#sn-cry-011)/[SN-CRY-012](security.md#sn-cry-012)), recovery code ([SN-CRY-003](security.md#sn-cry-003)) and escrow ([SN-CRY-014](security.md#sn-cry-014)) into one gated flow.

#### Scope
**In:** the setup flow screens (choose source → set passkey/passphrase → generate recovery code → confirm saved → enable sync); default to passkey where the [SN-CRY-011](security.md#sn-cry-011) probe reports support; block progression until the recovery code is confirmed saved (re-enter a portion or explicit tick — PRD-KEY-005); Copy + Download/Save-as-PDF (printable) of the code; the plain-language no-recovery warning on every key screen; only after confirmation does the first encrypted upload proceed.
**Out:** the recovery-code bytes/format ([SN-CRY-003](security.md#sn-cry-003)); the escrow wrap ([SN-CRY-014](security.md#sn-cry-014)); recovery on a new device ([SN-CRY-015](security.md#sn-cry-015)); re-view/regenerate later ([SN-CRY-023](security.md#sn-cry-023)); the sync engine ([SN-SYNC-001](sync.md#sn-sync-001)).

#### Acceptance criteria
- [ ] No note byte is encrypted for upload until the recovery code is generated and the user confirms they saved it (gated; abuse-test proves you cannot skip it).
- [ ] Passkey is the default where supported; passphrase is offered when the probe reports no PRF (no dead-end).
- [ ] The recovery code can be Copied and Downloaded/Saved as a printable PDF; a confirm step (re-enter portion or explicit tick) is required.
- [ ] The "Sane cannot recover your notes" warning appears on the source and recovery screens in student-readable language and is localised.
- [ ] Cancelling mid-ceremony leaves E2EE **off** and no data uploaded (fail closed to guest/local).

#### Technical notes
`app/lib/features/onboarding/e2ee_setup/` orchestrating [SN-CRY-011](security.md#sn-cry-011)/[SN-CRY-012](security.md#sn-cry-012)/[SN-CRY-003](security.md#sn-cry-003)/[SN-CRY-014](security.md#sn-cry-014) via Riverpod (docs/adr/0003). The Download-as-PDF uses the export path; never send the code anywhere (crypto.md §5.1). Reference docs/architecture/crypto.md §4/§5, PRD-KEY-003/004/005, docs/design/screens-and-flows.md onboarding.

#### Security & privacy
Threats: TM-I-02/03 (source strength + no vendor recovery), RR1 (lost secrets = permanent loss, surfaced). Controls: MASVS-CRYPTO-2, MASVS-AUTH-1, ASVS V11, OWASP-A02, A04 (secure design of the ceremony), CWE-522, CWE-320. The recovery code is shown once, never logged, never transmitted (checklist §3.1). Implements PRD-KEY-003/004/005.

#### UX notes
Onboarding E2EE setup + "Turn on Sync" entry (docs/design/screens-and-flows.md). Code shown grouped/spaced (SANE1-XXXX-…); Copy + Save-as-PDF buttons; blunt warning banner. All 17 looks + dark; localised (incl. RTL); VoiceOver/TalkBack labels; 44pt/48dp targets; keyboard-reachable on web. Empty/error/offline: setup works offline; a failed key-store write fails closed with a user-safe message.

#### Test plan
`app/test/security/e2ee_setup_test.dart` (widget + integration): cannot-upload-before-confirm, passkey-default/passphrase-fallback, copy/download-pdf, warning-present-localised, cancel-leaves-off. Golden tests of the recovery-code screen across looks.

#### Dependencies
[SN-CRY-003](security.md#sn-cry-003), [SN-CRY-011](security.md#sn-cry-011), [SN-CRY-012](security.md#sn-cry-012), [SN-CRY-014](security.md#sn-cry-014). Cross-epic: [SN-ONB-001](onboarding.md#sn-onb-001), [SN-SYNC-001](sync.md#sn-sync-001), [SN-AUTH-001](auth.md#sn-auth-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-014

<a id="sn-cry-014"></a>

**Implement master-key escrow via recovery code and platform keychain**

| Field | Value |
|---|---|
| GitHub | #212 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-CRY-003](security.md#sn-cry-003), [SN-CRY-008](security.md#sn-cry-008), [SN-CRY-009](security.md#sn-cry-009) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-STORAGE-2`, `ASVS-V11`, `OWASP-A02`, `CWE-320`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
Because there is **no vendor recovery**, the Master Key must be escrowed in ways only the user controls (docs/architecture/crypto.md §5; ADR-0007 decision 6). Two escrow copies, each an AEAD wrap of the MK under a different KEK: (1) **recovery-code escrow** `wrap(MK, KEK_recovery)` with `KEK_recovery = HKDF(R)` from [SN-CRY-003](security.md#sn-cry-003), stored as ciphertext in the sync `keys/` store — useless without the code; (2) **platform escrow** — the wrapped MK in iCloud Keychain (`kSecAttrSynchronizable`) / Android backup (block-store), recovering the user's own same-ecosystem device with nothing typed. No escrow blob ever goes to a Sane Notes server; there is no "email me a reset link" (crypto.md §5). This is P0 — losing it is permanent data loss (RR1) but leaking it decrypts everything (A3, Critical).

#### Scope
**In:** compute `KEK_recovery = HKDF(R)` and `wrap(MK, KEK_recovery)`; write the recovery escrow blob as ciphertext into the sync `keys/` store (file-format §4.2); store the platform-synced wrapped MK via iCloud Keychain (`kSecAttrSynchronizable=true`, [SN-CRY-008](security.md#sn-cry-008)) and Android backup/block-store ([SN-CRY-009](security.md#sn-cry-009)); an `unwrapWithRecoveryCode(code)` that validates the checksum first ([SN-CRY-003](security.md#sn-cry-003)) then unwraps; strict fail-closed on any tag mismatch; document the optional Shamir/self-cloud escrow as a follow-up.
**Out:** the recovery-code codec ([SN-CRY-003](security.md#sn-cry-003)); the new-device pairing flow ([SN-CRY-015](security.md#sn-cry-015)); the save/confirm UX ([SN-CRY-013](security.md#sn-cry-013)); rotation of escrow on passphrase change ([SN-CRY-016](security.md#sn-cry-016)).

#### Acceptance criteria
- [ ] The recovery escrow blob is ciphertext (indistinguishable from random); it never leaves to any Sane server (only user cloud), and `unwrapWithRecoveryCode` recovers the exact MK.
- [ ] The platform-synced wrapped MK is stored with `kSecAttrSynchronizable` (Apple) / backup (Android) and recovers the MK on a same-ecosystem device without typing.
- [ ] A wrong recovery code fails the checksum before any unwrap attempt; a tag mismatch fails closed (no partial MK).
- [ ] No raw key bytes are ever backed up; only wrapped copies (inspected).
- [ ] There is no code path that sends any escrow blob to a first-party endpoint (arch-lint/network assertion).

#### Technical notes
`packages/sane_crypto/lib/src/recovery/escrow.dart` + platform escrow via [SN-CRY-008](security.md#sn-cry-008)/[SN-CRY-009](security.md#sn-cry-009). Escrow blob placement per docs/architecture/file-format.md §4.2 (`encryption` block) and sync `keys/`. Reference docs/architecture/crypto.md §5, docs/adr/0007 decision 6, PRD-KEY-005.

#### Security & privacy
Threats: RR1 (permanent loss — mitigated by dual escrow), TM-I-02 (recovery KEK strength), A3 disclosure (escrow leak decrypts all — so recovery-code escrow is code-gated only). Controls: MASVS-CRYPTO-2, MASVS-STORAGE-2, ASVS V11, OWASP-A02, CWE-320, CWE-522. No vendor recovery (checklist §3.1). Implements PRD-KEY-005.

#### UX notes
None directly (surfaced by [SN-CRY-013](security.md#sn-cry-013)/[SN-CRY-015](security.md#sn-cry-015)); this defines what "save your recovery code" and "use my other Apple/Google device" actually persist. Baseline: escrow blobs and KEKs never logged.

#### Test plan
`packages/sane_crypto/test/recovery/escrow_test.dart` + platform integration: recovery-unwrap-round-trip, ciphertext-only, wrong-code-checksum-first, tag-mismatch-fails-closed, no-first-party-egress, raw-key-never-backed-up.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-CRY-003](security.md#sn-cry-003), [SN-CRY-008](security.md#sn-cry-008), [SN-CRY-009](security.md#sn-cry-009). Cross-epic: [SN-SYNC-001](sync.md#sn-sync-001) (keys/ store).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-015

<a id="sn-cry-015"></a>

**Recover access on a new or wiped device via the recovery code**

| Field | Value |
|---|---|
| GitHub | #213 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-014](security.md#sn-cry-014) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CRYPTO-2`, `ASVS-V11`, `OWASP-A02`, `OWASP-A07`, `CWE-307`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
The recovery flow on a new/wiped device MUST let the user enter the recovery code to unwrap the Master Key and complete pairing (PRD-KEY-007; docs/architecture/crypto.md §4.4/§5). Because the recovery-code entry gates decryption of everything, it MUST be brute-force-hardened: the unwrap is memory-hard by construction (Argon2id/HKDF over the code) and attempts are rate-limited with backoff so an attacker who steals the escrow blob from the user's cloud cannot cheaply grind codes. This is the counterpart to escrow ([SN-CRY-014](security.md#sn-cry-014)) and the path a user takes after losing their passkey/passphrase, matching the M4 exit criterion "the recovery code restores access" (docs/roadmap.md M4).

#### Scope
**In:** a recovery screen that accepts the `SANE1-…` code (lenient parse via [SN-CRY-003](security.md#sn-cry-003)), validates the checksum, then unwraps the MK from the recovery escrow blob ([SN-CRY-014](security.md#sn-cry-014)); attempt rate-limiting with exponential backoff and a lockout after repeated failures; on success, load the MK into the `KeyRing` ([SN-CRY-002](security.md#sn-cry-002)) and hand off to device pairing ([SN-SYNC-003](sync.md#sn-sync-003)/[SN-SYNC-004](sync.md#sn-sync-004)); clear, honest failure messaging distinguishing "wrong code" from "no escrow found".
**Out:** the escrow blob format ([SN-CRY-014](security.md#sn-cry-014)); the code codec ([SN-CRY-003](security.md#sn-cry-003)); the sync/device pairing engine ([SN-SYNC-001](sync.md#sn-sync-001)); the same-ecosystem platform-keychain auto-recovery path (that is transparent via [SN-CRY-014](security.md#sn-cry-014)).

#### Acceptance criteria
- [ ] Entering the correct code on a fresh device unwraps the MK and completes pairing; the user's synced notes decrypt.
- [ ] A wrong code is rejected at the checksum (no unwrap attempt); a wrong-but-valid-checksum code fails closed at the tag.
- [ ] Repeated failures trigger exponential backoff then lockout; the backoff is enforced locally and cannot be reset by relaunch (persisted attempt state).
- [ ] Messaging distinguishes wrong-code vs no-escrow-present without leaking whether an account exists.
- [ ] The code is never logged; the MK loads only into the in-RAM `KeyRing`.

#### Technical notes
`app/lib/features/recovery/` + `packages/sane_crypto` unwrap; backoff state persisted (not the code). Memory-hard unwrap uses the same Argon2id/HKDF path. Reference docs/architecture/crypto.md §5, PRD-KEY-007, PRD-SYNC-013 (pairing), docs/design/screens-and-flows.md recovery.

#### Security & privacy
Threats: TM-I-02 (offline grinding of stolen escrow — mitigated by memory-hard + backoff), TM-S-02 (account existence not leaked). Controls: MASVS-AUTH-1, MASVS-CRYPTO-2, ASVS V11, OWASP-A02, A07, CWE-307 (improper restriction of excessive auth attempts), CWE-522. Implements PRD-KEY-007.

#### UX notes
Recovery screen (docs/design/screens-and-flows.md): paste/type the grouped code, live checksum feedback, backoff countdown on failure, honest "we can't reset this for you" copy. Themed across 17 looks + dark, localised (incl. RTL), screen-reader-labelled, 44pt/48dp, keyboard-reachable on web. Offline-capable until pairing needs the cloud.

#### Test plan
`app/test/security/recovery_flow_test.dart`: correct-code-recovers, wrong-code-checksum-reject, tag-fail-closed, backoff-and-lockout-persisted, no-account-enumeration, no-code-in-logs.

#### Dependencies
[SN-CRY-014](security.md#sn-cry-014). Cross-epic: [SN-SYNC-003](sync.md#sn-sync-003), [SN-SYNC-004](sync.md#sn-sync-004) (pairing).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-016

<a id="sn-cry-016"></a>

**Re-wrap keys on passphrase change and passkey rotation (forward secrecy)**

| Field | Value |
|---|---|
| GitHub | #214 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-CRY-011](security.md#sn-cry-011), [SN-CRY-012](security.md#sn-cry-012), [SN-CRY-014](security.md#sn-cry-014) |
| Security controls | `MASVS-CRYPTO-2`, `ASVS-V11`, `OWASP-A02`, `CWE-320`, `CWE-323` |
| Extra labels | agent-ready |

#### Context
Changing the passphrase or rotating the passkey MUST **re-wrap items keys only and issue a new default items key** going forward, matching the Standard Notes model — old content stays readable via retained wrapped IKs, and future writes use fresh keys (a forward-secrecy flavour) (PRD-KEY-008; docs/architecture/crypto.md §6; ADR-0007 decision 7). This is the visible payoff of envelope encryption: an instant passphrase change with **no note re-encryption** and no gigabyte re-upload. For passkeys, rotation uses the WebAuthn `prf` two-salt trick (`first`=current, `second`=next) so access is never lost mid-rotation ([SN-CRY-011](security.md#sn-cry-011)). Old escrow copies are deleted and re-issued so the old secret no longer recovers the MK.

#### Scope
**In:** `changePassphrase(old, new)` and `rotatePasskey()` that derive the new KEK, re-wrap the MK escrow copies ([SN-CRY-014](security.md#sn-cry-014)) and re-wrap the IKs under the (possibly unchanged) MK, mint a **new default IK** for future writes while retaining old wrapped IKs for old content, delete superseded escrow/wrapped copies; the passkey two-salt evaluation for lossless rotation; verify no PK/BK bytes and no note ciphertext change (envelope payoff).
**Out:** MK/IK rotation on suspected compromise ([SN-CRY-017](security.md#sn-cry-017)); membership-driven IK rotation for sharing ([SN-CRY-018](security.md#sn-cry-018)); the settings UI entry point ([SN-CRY-023](security.md#sn-cry-023), [SN-SET-001](settings.md#sn-set-001)).

#### Acceptance criteria
- [ ] A passphrase change re-wraps IKs + escrow only; all PK/BK bytes and all note ciphertext are unchanged (byte-diff proven); no re-upload of note bodies occurs.
- [ ] After the change, the old passphrase no longer unwraps the MK/escrow (old copies deleted); the new one does.
- [ ] A new default IK is minted; content written after the change uses it, old content still decrypts via retained IKs.
- [ ] Passkey rotation via two salts never loses access (current unwraps with `first`, next with `second`), proven end-to-end.
- [ ] All operations fail closed on any tag mismatch, leaving the prior state intact (transactional).

#### Technical notes
`packages/sane_crypto/lib/src/rotation/rekey.dart` using [SN-CRY-002](security.md#sn-cry-002) hierarchy, [SN-CRY-011](security.md#sn-cry-011)/[SN-CRY-012](security.md#sn-cry-012) sources, [SN-CRY-014](security.md#sn-cry-014) escrow. Two-salt PRF per crypto.md §4.1. Make the re-wrap transactional (all-or-nothing). Reference docs/architecture/crypto.md §6, docs/adr/0007 decision 7, PRD-KEY-008.

#### Security & privacy
Threats: TM-I-02 (old secret retired), forward-secrecy flavour for future content. Controls: MASVS-CRYPTO-2, ASVS V11, OWASP-A02, CWE-320 (key management), CWE-323 (fresh keys, no nonce/key reuse). Implements PRD-KEY-008. No note re-encryption (privacy/perf).

#### UX notes
Surfaced from Settings → Sync & Security ([SN-CRY-023](security.md#sn-cry-023), docs/design/screens-and-flows.md): "Change passphrase" completes near-instantly with a reassuring "your notes were not re-uploaded" note. Themed across 17 looks + dark; localised; a11y-labelled; biometric re-gate before the change.

#### Test plan
`packages/sane_crypto/test/rotation/rekey_test.dart`: passphrase-change-rewraps-only (byte-diff), old-secret-retired, new-default-IK, passkey-two-salt-lossless, transactional-fail-closed. Widget test for the settings action.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-CRY-011](security.md#sn-cry-011), [SN-CRY-012](security.md#sn-cry-012), [SN-CRY-014](security.md#sn-cry-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-017

<a id="sn-cry-017"></a>

**Rotate the master key and items keys on suspected compromise**

| Field | Value |
|---|---|
| GitHub | #215 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-CRY-014](security.md#sn-cry-014) |
| Security controls | `MASVS-CRYPTO-2`, `ASVS-V11`, `OWASP-A02`, `CWE-320`, `CWE-672` |
| Extra labels | agent-ready |

#### Context
Separate from a routine passphrase change, a **suspected-compromise MK rotation** must be possible: generate MK', re-wrap all IKs under MK', publish the new wrapped IKs, retire the old MK, and mint a fresh default IK so future writes use fresh keys — all without bulk re-encryption of note bytes (docs/architecture/crypto.md §6; ADR-0007 decision 7). IK-level rotation is also the primitive that device revocation ([SN-CRY-019](security.md#sn-cry-019)) and collaborator removal ([SN-CRY-018](security.md#sn-cry-018)) build on. This gives the user a "rotate my keys" recovery action after a scare (lost-then-found device, shared passphrase), a capability most note apps lack.

#### Scope
**In:** `rotateMasterKey()` — mint MK', re-wrap every IK under MK', re-issue MK' escrow copies ([SN-CRY-014](security.md#sn-cry-014)), retire MK; `rotateItemsKey(notebook)` — mint IK', re-wrap that notebook's PKs/BKs under IK', retire the old IK; mint a fresh default IK for future writes; transactional, fail-closed; publish new wrapped keys to the `keys/` store for other devices to pick up.
**Out:** the passphrase-change path ([SN-CRY-016](security.md#sn-cry-016)); membership re-seal for sharing ([SN-CRY-018](security.md#sn-cry-018)); device registry/revocation ([SN-CRY-019](security.md#sn-cry-019)); the settings trigger ([SN-CRY-023](security.md#sn-cry-023)).

#### Acceptance criteria
- [ ] `rotateMasterKey` produces MK', re-wraps all IKs, re-issues escrow, and retires MK; old MK no longer unwraps any IK.
- [ ] `rotateItemsKey` re-wraps a notebook's PKs/BKs under IK' with no change to PK/BK bytes or note ciphertext (byte-diff proven).
- [ ] A fresh default IK is minted; content written after rotation uses it.
- [ ] Rotation is transactional: an interrupted rotation leaves the prior consistent state and fails closed.
- [ ] New wrapped keys are published so a second device converges to the rotated keys.

#### Technical notes
`packages/sane_crypto/lib/src/rotation/compromise_rotate.dart` built on [SN-CRY-002](security.md#sn-cry-002) and [SN-CRY-014](security.md#sn-cry-014). Reuse the transactional re-wrap from [SN-CRY-016](security.md#sn-cry-016). Publish to `keys/` (file-format §4.2). Reference docs/architecture/crypto.md §6, docs/adr/0007 decision 7.

#### Security & privacy
Threats: key-compromise containment (TM-I-03 follow-up), TM-T-01 (new keys, verified wraps). Controls: MASVS-CRYPTO-2, ASVS V11, OWASP-A02, CWE-320, CWE-672 (operation on a resource after expiry — retired keys rejected). Honest note: already-synced ciphertext an attacker captured before rotation cannot be un-sent (documented).

#### UX notes
Settings → Sync & Security "Rotate keys" ([SN-CRY-023](security.md#sn-cry-023)): a confirming, biometric-gated action with a plain explanation of what it does and does not protect. Themed across 17 looks + dark; localised; a11y-labelled. Progress + offline handling for the re-wrap.

#### Test plan
`packages/sane_crypto/test/rotation/compromise_rotate_test.dart`: MK-rotate-retires-old, IK-rotate-rewraps-only (byte-diff), fresh-default-IK, transactional-interrupt-safe, second-device-converges.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-CRY-014](security.md#sn-cry-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-018

<a id="sn-cry-018"></a>

**Seal per-notebook items keys for sharing and re-seal on revocation**

| Field | Value |
|---|---|
| GitHub | #216 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | security, collaboration |
| Size | L |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-CRY-019](security.md#sn-cry-019) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `ASVS-V11`, `OWASP-A02`, `OWASP-A01`, `CWE-320`, `CWE-284` |
| Extra labels | agent-ready |

#### Context
Sharing a notebook = **sealing its items key to each recipient via X25519** (ECDH → wrap IK), or encoding a wrapped content key in a share link's **URL fragment** (`#…`, never sent to any server) (docs/architecture/crypto.md §7; ADR-0007 decision 8; PRD-KEY-010). Revocation of a collaborator MUST rotate the IK and re-seal it to the remaining members only, so the removed party cannot decrypt writes made after revocation (forward secrecy per notebook) — while honestly acknowledging that already-synced ciphertext they hold cannot be un-sent (PRD-KEY-010; crypto.md §6). This is the crypto substrate M6 collaboration/sharing builds on; the relay/TURN only ever sees ciphertext because the app-layer payload is E2E-encrypted under these keys.

#### Scope
**In:** `sealItemsKeyTo(recipientPublicKey)` via X25519 ECDH → wrap IK (sealed box); `unsealItemsKey(sealed)` on the recipient; the share-link path that puts a wrapped content key in the URL fragment only; `revokeMember(notebook, member)` = rotate IK ([SN-CRY-017](security.md#sn-cry-017) primitive) + re-seal IK' to remaining members' public keys; verify a revoked member's device signature is rejected for future ops (via [SN-CRY-019](security.md#sn-cry-019) registry); honest "already-shared ciphertext cannot be un-sent" documentation.
**Out:** the collaboration transport/relay ([SN-COL-001](collaboration.md#sn-col-001), docs/adr/0013); the share UI/roles ([SN-SHR-001](sharing-export.md#sn-shr-001)); device identity/registry ([SN-CRY-019](security.md#sn-cry-019)); IK rotation primitive itself ([SN-CRY-017](security.md#sn-cry-017)).

#### Acceptance criteria
- [ ] Sealing an IK to a recipient's X25519 public key lets only that recipient unseal it; a third party cannot.
- [ ] A share link's wrapped key lives only in the URL fragment; it never appears in any outbound request (TM-I-09 verified).
- [ ] Revoking a member rotates the IK and re-seals to remaining members; the revoked member cannot decrypt post-revocation writes (proven).
- [ ] A revoked device's signed ops are rejected by peers (registry check).
- [ ] The UI-facing contract exposes that pre-revocation ciphertext the member already synced is not retractable (honest messaging hook).

#### Technical notes
`packages/sane_crypto/lib/src/sharing/seal.dart` using [SN-CRY-005](security.md#sn-cry-005) X25519 sealed boxes and [SN-CRY-002](security.md#sn-cry-002) IKs; revoke reuses [SN-CRY-017](security.md#sn-cry-017). Fragment-only share key per checklist §1.1/§3.1 and crypto.md §7. Reference docs/architecture/crypto.md §6/§7, docs/adr/0007 decision 8, docs/adr/0013, PRD-KEY-010.

#### Security & privacy
Threats: TM-S-03 (peer join — key by public key), TM-I-09 (fragment-only share key), ex-collaborator reads future edits (access control). Controls: MASVS-CRYPTO-2, MASVS-NETWORK-1, ASVS V11, OWASP-A02, A01 (access control), CWE-320, CWE-284 (improper access control). Relay sees ciphertext only. Implements PRD-KEY-010.

#### UX notes
Share overlay + collaborator list (docs/design/screens-and-flows.md sharing/collab, M6): removing a member shows the honest "they keep what they already synced, but not future changes" note. Themed across 17 looks + dark; localised; a11y-labelled; 44pt/48dp targets.

#### Test plan
`packages/sane_crypto/test/sharing/seal_test.dart`: seal/unseal-only-recipient, fragment-only-no-egress, revoke-rotates-and-reseals, revoked-cannot-decrypt-future, revoked-device-ops-rejected.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-CRY-019](security.md#sn-cry-019). Cross-epic: [SN-COL-001](collaboration.md#sn-col-001), [SN-SHR-001](sharing-export.md#sn-shr-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-019

<a id="sn-cry-019"></a>

**Manage device signing keys, the device registry and revocation (Ed25519)**

| Field | Value |
|---|---|
| GitHub | #217 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005), [SN-CRY-008](security.md#sn-cry-008), [SN-CRY-009](security.md#sn-cry-009) |
| Security controls | `MASVS-CRYPTO-2`, `MASVS-STORAGE-2`, `ASVS-V11`, `OWASP-A02`, `OWASP-A08`, `CWE-347`, `CWE-320` |
| Extra labels | agent-ready |

#### Context
Each device holds a non-exportable **Ed25519 signing key** used for device identity and to sign op-log manifests/bundles (docs/architecture/crypto.md §1/§2 table, §6; file-format §4.4). Peers verify signatures and, on **device revocation**, mark the device `revoked` in `Workspace.devices` (a CRDT op) and **reject its future ops** by signature check against the retired key, excluding it from GC causal-stability (crypto.md §6; document-model §8). This is the integrity backbone that makes tamper/rollback (TM-T-01/02) and collaborator/device removal ([SN-CRY-018](security.md#sn-cry-018)) enforceable, and it pairs a private key held in the hardware store ([SN-CRY-008](security.md#sn-cry-008)/[SN-CRY-009](security.md#sn-cry-009)) with a public registry other devices trust.

#### Scope
**In:** generate a non-exportable Ed25519 device key in the secure store; sign op-log segment manifests / snapshot manifests (file-format §4.4) and verify peers' signatures; a signed `devices` registry (device id, public key, status) as CRDT ops; `revokeDevice(id)` flipping the signed status and causing peers to reject that device's post-revocation ops; exclusion of a revoked device from causal-stability GC; MK rotation trigger hook when a device may be compromised ([SN-CRY-017](security.md#sn-cry-017)).
**Out:** the CRDT op model and GC ([SN-CORE-003](sync.md#sn-core-003), document-model §8); the manifest/file-format layout ([SN-SYNC-002](sync.md#sn-sync-002), file-format §4); collaborator revocation re-seal ([SN-CRY-018](security.md#sn-cry-018)); the paired-devices UI ([SN-SET-001](settings.md#sn-set-001)).

#### Acceptance criteria
- [ ] A device signs manifests with a non-exportable Ed25519 key; peers verify and reject a bad/forged signature (fail closed).
- [ ] The `devices` registry is itself signed; an unsigned/forged registry mutation is rejected.
- [ ] After `revokeDevice`, peers reject that device's ops authored after the revocation point (signature + status check), proven in a two-device test.
- [ ] A revoked device is excluded from causal-stability GC so it cannot stall compaction.
- [ ] Revoking a possibly-compromised device offers to trigger MK rotation ([SN-CRY-017](security.md#sn-cry-017)).

#### Technical notes
`packages/sane_crypto/lib/src/identity/device_keys.dart` (Ed25519 via [SN-CRY-005](security.md#sn-cry-005); private key in [SN-CRY-008](security.md#sn-cry-008)/[SN-CRY-009](security.md#sn-cry-009)). Registry ops consumed by [SN-CORE-003](sync.md#sn-core-003)/[SN-SYNC-002](sync.md#sn-sync-002). Signatures per file-format §4.4. Reference docs/architecture/crypto.md §6, docs/architecture/document-model.md §8, docs/adr/0007 decision 7, PRD-SYNC-014.

#### Security & privacy
Threats: TM-T-01/02 (manifest tamper/rollback), TM-R-01 (op attribution), TM-S-03 (peer identity). Controls: MASVS-CRYPTO-2, MASVS-STORAGE-2 (private key non-exportable), ASVS V11, OWASP-A02, A08 (data integrity), CWE-347 (improper signature verification), CWE-320. Device id logs as an opaque short hash (checklist §7).

#### UX notes
Settings → Sync & Security → Paired devices ([SN-SET-001](settings.md#sn-set-001), docs/design/screens-and-flows.md): list devices, revoke with a biometric-gated confirm and the honest post-revocation explanation. Themed across 17 looks + dark; localised; a11y-labelled; 44pt/48dp.

#### Test plan
`packages/sane_crypto/test/identity/device_keys_test.dart` (+ two-device integration): sign/verify, forged-signature-rejected, signed-registry, revoked-device-ops-rejected, GC-exclusion, rotation-trigger-offered.

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005), [SN-CRY-008](security.md#sn-cry-008), [SN-CRY-009](security.md#sn-cry-009). Cross-epic: [SN-CORE-003](sync.md#sn-core-003), [SN-SYNC-002](sync.md#sn-sync-002), [SN-SET-001](settings.md#sn-set-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-020

<a id="sn-cry-020"></a>

**Enforce fail-closed decrypt semantics and the "Paused (no key)" state**

| Field | Value |
|---|---|
| GitHub | #218 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, sync |
| Size | S |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-006](security.md#sn-cry-006) |
| Security controls | `MASVS-CRYPTO-1`, `ASVS-V11`, `OWASP-A10`, `OWASP-A02`, `CWE-390`, `CWE-755` |
| Extra labels | agent-ready |

#### Context
Key operations MUST **fail closed**: on any decrypt/keying/AEAD error the app shows "Paused (no key)" and MUST NOT display partial or garbled note content, MUST NOT upload plaintext, and MUST NOT silently drop data (PRD-KEY-009; docs/architecture/crypto.md §9; ADR-0007 decision 9; 2025 OWASP A10 "mishandling exceptional conditions"). This is the user-visible contract for every crypto failure across the app — a missing key, a tag mismatch (TM-T-01), a rolled-back segment (TM-T-02), or an unavailable secure store. It centralises the failure handling so no feature re-implements it and so a decrypt error can never regress into rendering last-known plaintext or a raw exception.

#### Scope
**In:** a single `CryptoFailure` → UI mapping and a `SyncPaused`/`NoKey` state; enforce that a failed open from [SN-CRY-006](security.md#sn-cry-006)/[SN-CRY-007](security.md#sn-cry-007) returns `Failure` and the UI renders the paused state, never partial content; block any upload while paused; a user-safe, non-technical message with a "unlock"/"enter recovery code" affordance; a lint/test that no caller renders content on a `Failure` decrypt path.
**Out:** the AEAD primitives ([SN-CRY-005](security.md#sn-cry-005)); segment/blob ciphers ([SN-CRY-006](security.md#sn-cry-006)/[SN-CRY-007](security.md#sn-cry-007)); the recovery entry itself ([SN-CRY-015](security.md#sn-cry-015)); the sync engine pause plumbing ([SN-SYNC-001](sync.md#sn-sync-001)).

#### Acceptance criteria
- [ ] A tag mismatch / missing key surfaces the "Paused (no key)" state; no partial, garbled, or last-known-good content is shown.
- [ ] No plaintext is uploaded while paused; sync is halted, not silently continued.
- [ ] No data is dropped: the undecryptable segment is retained for a later successful key, not discarded.
- [ ] The failure message is user-safe (no stack trace / internal path) and offers unlock / enter-recovery-code.
- [ ] A test proves no code path renders note content when the decrypt result is `Failure`.

#### Technical notes
`app/lib/features/sync/paused_state.dart` + a `sane_core` `Failure` subtype; consumes [SN-CRY-006](security.md#sn-cry-006)/[SN-CRY-007](security.md#sn-cry-007) results. Never surface a raw exception (checklist §7). Reference docs/architecture/crypto.md §9, docs/adr/0007 decision 9, PRD-KEY-009.

#### Security & privacy
Threats: partial-decrypt/fallback-plaintext leak on error (exceptional conditions), TM-T-01/02. Controls: MASVS-CRYPTO-1, ASVS V11, OWASP-A10 (2025 fail-closed), A02, CWE-390 (detection of error without action), CWE-755 (improper handling of exceptional conditions). No content in the error surface or logs.

#### UX notes
"Sync paused — no key" banner/state in the editor and library (docs/design/screens-and-flows.md sync states): calm, honest, actionable (Unlock / Enter recovery code). Themed across all 17 looks + dark; localised (incl. RTL); screen-reader-announced; 44pt/48dp; offline-aware.

#### Test plan
`app/test/security/fail_closed_test.dart`: tag-mismatch-pauses, no-partial-render, no-plaintext-upload, no-data-drop, user-safe-message, no-render-on-Failure lint test. Golden of the paused state across looks.

#### Dependencies
[SN-CRY-006](security.md#sn-cry-006). Cross-epic: [SN-SYNC-001](sync.md#sn-sync-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-021

<a id="sn-cry-021"></a>

**Add crypto known-answer tests and cross-implementation test vectors**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-CRY-002](security.md#sn-cry-002) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-CRY-005](security.md#sn-cry-005), [SN-CRY-006](security.md#sn-cry-006), [SN-CRY-007](security.md#sn-cry-007) |
| Security controls | `MASVS-CRYPTO-1`, `ASVS-V11`, `OWASP-A02`, `CWE-327`, `CWE-1240` |
| Extra labels | agent-ready |

#### Context
Cryptography must be proven correct against **known-answer tests (KATs)** and cross-implementation vectors, not just round-trip tests, because a backend swap (per [SN-CRY-004](security.md#sn-cry-004)/docs/adr/0001) or a param drift could silently change outputs and strand ciphertext. This suite pins the exact bytes for every primitive and for the envelope encoders so any future change that alters wire output is caught in CI. It is the standing correctness barrier for `sane_crypto` and a MASVS-CRYPTO verification input for M7 ([SN-CRY-024](security.md#sn-cry-024)). Getting a KAT green across the chosen backend also validates the crypto.md §1 parameter choices are implemented exactly (192-bit XChaCha nonce, Argon2id 64 MiB/5/1, HKDF labels).

#### Scope
**In:** RFC/libsodium KATs for XChaCha20-Poly1305, AES-256-GCM, Argon2id (at locked params), HKDF-SHA-256, BLAKE3-256/SHA-256, Ed25519, X25519; fixed vectors for the envelope encoders (segment [SN-CRY-006](security.md#sn-cry-006) and blob [SN-CRY-007](security.md#sn-cry-007)) including AAD-binding cases; recovery-code [SN-CRY-003](security.md#sn-cry-003) encode/decode + checksum vectors; a wire-format stability test that fails if any encoder's bytes change without an intentional version bump; committed vector fixtures (synthetic only).
**Out:** property/fuzz tests of parsers ([SN-SEC-001](security.md#sn-sec-001)); the primitives themselves ([SN-CRY-005](security.md#sn-cry-005)); side-channel testing ([SN-CRY-022](security.md#sn-cry-022)).

#### Acceptance criteria
- [ ] Every approved primitive passes a published KAT vector (byte-exact) on the chosen backend and platforms.
- [ ] Envelope segment/blob encoders match committed fixed vectors including AAD position binding and nonce-derivation (GCM) cases.
- [ ] The recovery-code codec matches committed encode/decode + checksum vectors.
- [ ] A deliberate output change to any encoder fails the wire-stability test (self-tested).
- [ ] All fixtures are synthetic; no user content or real keys are committed (checklist §0).

#### Technical notes
`packages/sane_crypto/test/kat/` with `vectors/*.json` fixtures; drive the [SN-CRY-005](security.md#sn-cry-005) interface and [SN-CRY-006](security.md#sn-cry-006)/[SN-CRY-007](security.md#sn-cry-007) encoders and [SN-CRY-003](security.md#sn-cry-003) codec. Source vectors from RFC 8439/libsodium/Argon2 reference. Reference docs/architecture/crypto.md §1/§2.1/§5.1. Run in the standard unit-test CI stage.

#### Security & privacy
Threats: silent crypto regression / interop break (correctness). Controls: MASVS-CRYPTO-1 (verify approved algs behave exactly), ASVS V11, OWASP-A02, CWE-327 (risky/incorrect crypto), CWE-1240 (use of a cryptographic primitive with a risky implementation — caught by KAT). Fixtures carry no secrets/content.

#### UX notes
None beyond baseline (developer tests). Baseline: no real keys or user content in vectors.

#### Test plan
The suite is the deliverable: `packages/sane_crypto/test/kat/primitives_kat_test.dart`, `envelope_vectors_test.dart`, `recovery_code_vectors_test.dart`, `wire_stability_test.dart`. Self-test with a deliberately wrong vector to prove the harness fails.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-CRY-005](security.md#sn-cry-005), [SN-CRY-006](security.md#sn-cry-006), [SN-CRY-007](security.md#sn-cry-007). Related: [SN-CRY-003](security.md#sn-cry-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-022

<a id="sn-cry-022"></a>

**Harden crypto paths: constant-time, zeroisation and a banned-primitive lint**

| Field | Value |
|---|---|
| GitHub | #219 |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-005](security.md#sn-cry-005) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CODE-2`, `ASVS-V11`, `OWASP-A02`, `CWE-208`, `CWE-244`, `CWE-327` |
| Extra labels | agent-ready |

#### Context
Beyond choosing the right primitives, the crypto paths must resist implementation-level leaks: comparisons of secrets/tags must be **constant-time**, key buffers must be **zeroised after use**, and banned primitives (`dart:math` Random, MD5/SHA-1, ECB/unauthenticated modes, PBKDF2-as-primary, a reused GCM nonce, deprecated Jetpack Security) must be **impossible to introduce** (docs/architecture/crypto.md §1/§6 "keep crypto constant-time where feasible and zeroise"; secure-coding-checklist §3; ADR-0007 follow-up "add a CI crypto-lint (semgrep) forbidding banned primitives"). This turns the crypto rules from review discipline into an enforced gate and reduces the side-channel and misuse surface that a note app's zero-knowledge guarantee depends on.

#### Scope
**In:** constant-time equality for tag/secret comparisons; explicit zeroisation of `SecretKey`/nonce/derived-key buffers after use (best-effort in a GC language, documented limits); a Semgrep crypto-lint ruleset (CI) forbidding `dart:math` `Random`, MD5/SHA-1, ECB, static/zero IV, AES-GCM random-nonce, PBKDF2-as-primary, and deprecated Jetpack Security APIs on crypto/native paths; an arch-lint that only `sane_crypto` performs raw AEAD/KDF calls; documentation of the residual timing/side-channel risks (RR-style) and the constant-time claims' limits in a pure-Dart runtime.
**Out:** the primitives ([SN-CRY-005](security.md#sn-cry-005)); KATs ([SN-CRY-021](security.md#sn-cry-021)); the general Semgrep pipeline wiring ([SN-CI-001](ci-cd.md#sn-ci-001)) — this contributes the crypto rules to it.

#### Acceptance criteria
- [ ] Tag/secret comparisons use a constant-time compare; a test asserts the variable-time operator is not used on secret paths.
- [ ] Key/nonce buffers are zeroised after use where the runtime allows; the documented limits (GC copies) are recorded.
- [ ] The Semgrep crypto-lint fails a PR that introduces any banned primitive or a random GCM nonce (self-tested with a deliberate violation).
- [ ] An arch-lint proves no package outside `sane_crypto` calls raw AEAD/KDF APIs directly.
- [ ] Residual side-channel/timing limits are documented and linked from the threat model ([SN-CRY-024](security.md#sn-cry-024)).

#### Technical notes
`packages/sane_crypto` constant-time helper + zeroisation; Semgrep rules under `.semgrep/crypto/` invoked by the DevSecOps pipeline (docs/security/devsecops-pipeline.md). Constant-time in pure Dart is best-effort; prefer the backend's native compare where available. Reference docs/architecture/crypto.md §1/§6, docs/adr/0007 follow-ups, secure-coding-checklist §3/§9.1.

#### Security & privacy
Threats: timing side channels on tag/secret compare, key remnants in memory (RR2 adjacency), banned-primitive misuse. Controls: MASVS-CRYPTO-1, MASVS-CODE-2, ASVS V11, OWASP-A02, CWE-208 (observable timing discrepancy), CWE-244 (improper clearing of sensitive memory), CWE-327. No content logged.

#### UX notes
None beyond baseline (developer tooling + hardening). Baseline: the lint itself must not print any secret it matches.

#### Test plan
`packages/sane_crypto/test/security/constant_time_test.dart`, `zeroise_test.dart`, and a Semgrep self-test fixture under `.semgrep/crypto/tests/` (a deliberate banned-primitive file must fail). Arch-lint test for raw-AEAD-call confinement.

#### Dependencies
[SN-CRY-005](security.md#sn-cry-005). Cross-epic: [SN-CI-001](ci-cd.md#sn-ci-001) (Semgrep pipeline).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-023

<a id="sn-cry-023"></a>

**Re-view and regenerate the recovery code from Settings (biometric-gated)**

| Field | Value |
|---|---|
| GitHub | #220 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, settings |
| Size | S |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-013](security.md#sn-cry-013), [SN-CRY-014](security.md#sn-cry-014) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CRYPTO-2`, `ASVS-V11`, `OWASP-A02`, `CWE-522`, `CWE-320` |
| Extra labels | agent-ready, good first issue |

#### Context
The recovery code MUST be re-viewable and re-generatable later from **Settings → (Sync &) Security**, gated behind biometric/app-lock; regenerating rotates the escrow wrapping and invalidates the old code (PRD-KEY-006; also surfaced by the Security settings area PRD-SET-023). Users forget where they stored the code, or want to rotate it after exposure, so this closes the loop opened by the setup ceremony ([SN-CRY-013](security.md#sn-cry-013)). It composes the escrow rotation ([SN-CRY-014](security.md#sn-cry-014)) with a gated settings surface and the same Copy / Save-as-PDF affordances, keeping the blunt "we can't reset this for you" framing.

#### Scope
**In:** a Settings → Sync & Security entry that, after biometric/app-lock re-auth, re-derives and displays the current recovery code (or, if only the escrow blob exists, offers regenerate); a **Regenerate** action that mints a new R ([SN-CRY-003](security.md#sn-cry-003)), re-wraps the escrow ([SN-CRY-014](security.md#sn-cry-014)) and invalidates the old code; Copy + Save-as-PDF; the honest no-recovery warning; audit-free (no logging of the code).
**Out:** the code codec ([SN-CRY-003](security.md#sn-cry-003)); the escrow mechanics ([SN-CRY-014](security.md#sn-cry-014)); the first-run ceremony ([SN-CRY-013](security.md#sn-cry-013)); the broader settings inventory ([SN-SET-001](settings.md#sn-set-001)).

#### Acceptance criteria
- [ ] Viewing the recovery code requires biometric/app-lock re-auth; a failed/cancelled auth reveals nothing.
- [ ] Regenerate mints a new code, re-wraps the escrow, and invalidates the old code (old code no longer recovers — proven).
- [ ] Copy and Save-as-PDF work; the code is never logged or transmitted.
- [ ] The no-recovery warning is shown and localised.
- [ ] The entry lives under the Security area per PRD-SET-023 and is reachable on all platforms.

#### Technical notes
`app/lib/features/settings/security/recovery_code_screen.dart` composing [SN-CRY-003](security.md#sn-cry-003) + [SN-CRY-014](security.md#sn-cry-014) + app-lock ([SN-SEC-001](security.md#sn-sec-001) app-lock). Reference PRD-KEY-006, PRD-SET-023, docs/architecture/crypto.md §5, docs/design/screens-and-flows.md Settings.

#### Security & privacy
Threats: A3 disclosure (code re-view must be gated), stale-code-after-exposure. Controls: MASVS-AUTH-1 (biometric gate), MASVS-CRYPTO-2, ASVS V11, OWASP-A02, CWE-522, CWE-320. Code never logged/transmitted (checklist §3.1). Implements PRD-KEY-006.

#### UX notes
Settings → Sync & Security → Recovery code (docs/design/screens-and-flows.md): re-auth gate, grouped code display, Copy / Save-as-PDF, Regenerate with confirm, blunt warning. Themed across all 17 looks + dark; localised (incl. RTL); screen-reader-labelled; 44pt/48dp; keyboard-reachable on web.

#### Test plan
`app/test/security/recovery_code_settings_test.dart` (widget): reauth-required, regenerate-invalidates-old, copy/save-pdf, warning-present, no-code-in-logs. Golden across looks.

#### Dependencies
[SN-CRY-013](security.md#sn-cry-013), [SN-CRY-014](security.md#sn-cry-014). Cross-epic: [SN-SET-001](settings.md#sn-set-001), [SN-SEC-001](security.md#sn-sec-001) (app-lock).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-CRY-024

<a id="sn-cry-024"></a>

**Verify crypto controls against the threat model and MASVS/ASVS (MASTG)**

| Field | Value |
|---|---|
| GitHub | #221 |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security, privacy |
| Size | M |
| SDLC | verification |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-CRY-006](security.md#sn-cry-006), [SN-CRY-008](security.md#sn-cry-008), [SN-CRY-009](security.md#sn-cry-009), [SN-CRY-014](security.md#sn-cry-014), [SN-CRY-020](security.md#sn-cry-020) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `ASVS-V11`, `OWASP-A02`, `OWASP-A04`, `CWE-311`, `CWE-320` |
| Extra labels | agent-ready |

#### Context
Before beta, the crypto stack must be **verified**, not just built: every crypto/key threat-model row (TM-I-01/02/03, TM-T-01/02, TM-S-02/03, TM-P-05, RR1/RR6) must move from Designed to Implemented with a named test, and the MASVS-CRYPTO/STORAGE and ASVS V11 controls must be checked against the running app via MASTG procedures (docs/security/threat-model.md §5.4/§7; docs/architecture/crypto.md §9; docs/roadmap.md M7). This is the M7 gate for `sane_crypto`: it certifies the zero-knowledge guarantee holds end-to-end (bytes on the drive are indistinguishable from random; keys never leave hardware; recovery works; a cloud/account compromise yields no plaintext) and records the residual risks the maintainer accepts.

#### Scope
**In:** a controls-matrix pass for every MASVS-CRYPTO/STORAGE and ASVS V11 row mapping to a CRY test; MASTG procedures for keystore usage (Apple/Android non-exportable, biometric-gated), at-rest ciphertext (bytes-are-random), KDF params, nonce discipline; an integration test that data written to a mock drive carries no plaintext marker (TM-I-01); confirming fail-closed ([SN-CRY-020](security.md#sn-cry-020)) and recovery ([SN-CRY-014](security.md#sn-cry-014)/[SN-CRY-015](security.md#sn-cry-015)) under adversarial inputs; updating docs/security/threat-model.md statuses and controls-matrix; feeding findings to the pentest ([SN-SEC-001](security.md#sn-sec-001)).
**Out:** implementing controls (the other CRY issues); the broader MASVS-PLATFORM/NETWORK verification ([SN-SEC-001](security.md#sn-sec-001)); the pentest itself ([SN-SEC-001](security.md#sn-sec-001)).

#### Acceptance criteria
- [ ] Every crypto/key `TM-*` row has a passing named verification and a Status of Implemented in docs/security/threat-model.md.
- [ ] MASTG keystore + at-rest procedures pass on iOS and Android reference devices; results recorded in the controls matrix.
- [ ] An integration test proves cloud-bound bytes are indistinguishable from random with no plaintext markers (TM-I-01).
- [ ] Fail-closed and recovery behaviours pass under adversarial inputs (tampered/rolled-back/truncated segments; wrong/mistyped recovery code).
- [ ] Residual risks RR1 (permanent loss) and RR6 (root/jailbreak) are explicitly re-affirmed/dispositioned by the Security Owner.

#### Technical notes
Verification-stage work: edit docs/security/threat-model.md + docs/security/controls-matrix.md; drive the MASTG procedures against builds; author `app/test/security/e2ee_e2e_test.dart` for the drive-bytes-random assertion. Reference docs/architecture/crypto.md §9 (compliance mapping), docs/security/threat-model.md §5.4/§6/§7, docs/roadmap.md M7.

#### Security & privacy
Threats: the whole crypto/key family (TM-I-01/02/03, TM-T-01/02, TM-S-02/03, TM-P-05). Controls: MASVS-CRYPTO-1/2, MASVS-STORAGE-1/2, ASVS V11, OWASP-A02, A04 (validate secure design), CWE-311, CWE-320. Certifies zero-knowledge; no content in test artifacts.

#### UX notes
None beyond baseline (verification). The user-facing guarantee it certifies (honest "no data collected" labels, working recovery) is surfaced by [SN-PRV-001](privacy.md#sn-prv-001) and [SN-CRY-013](security.md#sn-cry-013).

#### Test plan
`app/test/security/e2ee_e2e_test.dart` (drive-bytes-random, no-plaintext-marker, cloud-compromise-yields-nothing), plus the MASTG procedure checklist recorded in the controls matrix; re-run the CRY unit/KAT suites as the evidence base.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-CRY-006](security.md#sn-cry-006), [SN-CRY-008](security.md#sn-cry-008), [SN-CRY-009](security.md#sn-cry-009), [SN-CRY-014](security.md#sn-cry-014), [SN-CRY-020](security.md#sn-cry-020). Cross-epic: [SN-SEC-001](security.md#sn-sec-001) (pentest), [SN-PRV-001](privacy.md#sn-prv-001) (labels).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-001

<a id="sn-gcmp-001"></a>

**Implement per-notebook and per-folder biometric lock**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, android-tablet, ios-phone, android-phone, web |
| Areas | security, privacy, library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-SEC-020](security.md#sn-sec-020), [SN-AUTH-014](auth.md#sn-auth-014) |
| Security controls | `MASVS-AUTH-2`, `MASVS-STORAGE-1`, `MASVS-CRYPTO-1`, `OWASP-A01`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
Every serious competitor ships a content-level lock: Apple Notes locks individual notes with true E2EE, Goodnotes and Notability password-protect documents, OneNote encrypts sections with 128-bit AES, and Samsung Notes locks notes behind biometrics (docs/research/competitor-feature-matrix.md section 25, row 'App/folder/note lock'). Our own matrix commits to '**v1** note lock (biometric)' and the 2026-09-13 PRD pass raised this as a parity gap (PRD-LOCK-005). Today the tracker only has *app* lock ([SN-SEC-020](security.md#sn-sec-020)), *per-profile* lock ([SN-AUTH-014](auth.md#sn-auth-014)) and downstream behaviours that assume locked notebooks exist ([SN-SEC-018](security.md#sn-sec-018), [SN-SEC-019](security.md#sn-sec-019), [SN-SRCH-015](search.md#sn-srch-015)) - but no issue that actually implements a lock scoped to a single notebook or folder. This issue closes that gap.

#### Scope
**In:** a lock flag on notebook and folder entities; a biometric/passcode gate (LocalAuthentication / BiometricPrompt / WebAuthn on web) to open a locked item; composition with the app-lock and profile-lock hierarchy so the strongest applicable gate wins; lock/unlock affordances in the library overflow menu and notebook settings; unlocked-session timeout that re-locks on background per the app-lock policy; folder lock cascading to descendants.
**Out:** the search/preview/share exclusion and ciphertext-backup behaviour (that is [SN-GCMP-002](security.md#sn-gcmp-002)); app-wide lock ([SN-SEC-020](security.md#sn-sec-020)); the crypto key hierarchy itself ([SN-CRY-002](security.md#sn-cry-002)).

#### Acceptance criteria
- [ ] A notebook or folder can be locked from its overflow menu and from notebook settings; the state persists as a CRDT LWW register and syncs.
- [ ] Opening a locked item requires a successful biometric/device-credential auth; a fallback passcode path exists where the OS has no biometric.
- [ ] A locked folder locks every descendant notebook and page transitively; unlocking the folder unlocks its subtree for the session only.
- [ ] After the configured auto-lock interval or app backgrounding, locked items re-lock and their in-memory content keys are scrubbed.
- [ ] The lock composes with app lock and profile lock without deadlock or double-prompt; the most restrictive gate applies.
- [ ] On web, the reduced posture (per [SN-WEB-031](security.md#sn-web-031)) is used and clearly communicated.

#### Technical notes
Add `locked: bool` and `lockScope` to notebook/folder nodes in `sane_core` (LWW register, so it merges). The per-item content key already exists in the envelope hierarchy ([SN-CRY-002](security.md#sn-cry-002), [SN-CRY-007](security.md#sn-cry-007)); a locked item's content key is held only in memory while unlocked and dropped on re-lock. Reuse the biometric gate and RAM key-scrub machinery from [SN-SEC-020](security.md#sn-sec-020). Platform APIs: `LAContext`/`LocalAuthentication` (Apple), `BiometricPrompt` + Keystore-bound key (Android), WebAuthn/`navigator.credentials` (web, reduced). Gate wiring lives in `app/lib/features/library` and the security settings section ([SN-SET-013](settings.md#sn-set-013)). Reference docs/security/threat-model and PRD-LOCK-005.

#### Security & privacy
Threats: unauthorised local access (STRIDE-Elevation), shoulder-surfing, backup exfiltration. Controls: biometric/credential gate before decrypt; content key never persisted in plaintext; fail-closed if biometrics are removed/changed (require passcode re-enrol). Maps to MASVS-AUTH-2, MASVS-STORAGE-1, MASVS-CRYPTO-1, OWASP-A01. Do not leak lock state via timing or thumbnails.

#### UX notes
Lock/unlock in library overflow and notebook settings; a padlock badge on locked tiles; an unlock sheet with the mascot-neutral copy from docs/design/design-system.md. Empty/locked state shows title only, never content or thumbnail. Error state on failed auth offers retry and passcode fallback.

#### Test plan
Unit: lock-state CRDT merge, cascade logic, re-lock timeout (test/library/notebook_lock_test.dart). Widget: unlock sheet, badge rendering. Integration: lock -> background -> re-lock -> key-scrub asserted; folder cascade. Security: assert no plaintext content key survives re-lock (RAM probe hook).

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-SEC-020](security.md#sn-sec-020), [SN-AUTH-014](auth.md#sn-auth-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-002

<a id="sn-gcmp-002"></a>

**Enforce locked-content behaviour: search, preview, share and backup exclusion**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, android-tablet, ios-phone, android-phone, web |
| Areas | security, privacy, search |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-GCMP-001](security.md#sn-gcmp-001), [SN-SRCH-015](search.md#sn-srch-015), [SN-CRY-006](security.md#sn-cry-006) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `OWASP-A01`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
A content lock is only credible if locked material is invisible everywhere a leak could occur. Apple, Goodnotes and OneNote all exclude locked content from search, previews and unauthenticated share (docs/research/competitor-feature-matrix.md section 25; PRD-LOCK-006 from the 2026-09-13 gap pass). [SN-GCMP-001](security.md#sn-gcmp-001) implements the lock itself; this issue defines and enforces the *behaviour* of locked content across the app so nothing bleeds through indexes, thumbnails, exports, notifications or backups.

#### Scope
**In:** exclude locked notebooks/folders from global and in-note search results and from the semantic index until unlocked; suppress thumbnails/previews (show a padlock placeholder); block share-link creation and export of locked items unless unlocked in-session; keep locked content ciphertext-only in cloud sync and OS auto-backup; ensure recovery-code / key-hierarchy restore re-establishes lock state on a new device.
**Out:** the lock gate and cascade ([SN-GCMP-001](security.md#sn-gcmp-001)); the search index encryption already tracked in [SN-SRCH-015](search.md#sn-srch-015) (this issue wires the exclusion filter into it); notification-excerpt suppression already in [SN-SEC-019](security.md#sn-sec-019) (extend to per-item locks).

#### Acceptance criteria
- [ ] Locked items never appear in library search, in-note find, or semantic/RAG results while locked; unlocking makes them searchable for the session only.
- [ ] Locked tiles render a padlock placeholder, never a content thumbnail, in library, recents, widgets and share pickers.
- [ ] Creating a share link or running any exporter against a locked item is refused unless the item is unlocked in-session; the refusal is explained, not silent.
- [ ] Locked content is written to the cloud and OS backup only as ciphertext; a fresh install restores lock state and requires auth before reveal.
- [ ] Notification excerpts and OS previews for locked items are suppressed (extends [SN-SEC-019](security.md#sn-sec-019)).

#### Technical notes
Add a `lockedScopeFilter` used by the search query layer ([SN-SRCH-002](search.md#sn-srch-002), [SN-SRCH-015](search.md#sn-srch-015)), the RAG retriever ([SN-AI-011](ai.md#sn-ai-011)), the thumbnail cache ([SN-LIB-014](library.md#sn-lib-014), [SN-PG-010](pages-canvas.md#sn-pg-010)), the export service ([SN-SHR-002](sharing-export.md#sn-shr-002)) and the share model ([SN-SHR-013](sharing-export.md#sn-shr-013)). Locked content keys stay wrapped in the envelope hierarchy ([SN-CRY-006](security.md#sn-cry-006)); nothing decrypts without an unlocked session token. Widget snapshots ([SN-NOTF-008](notifications.md#sn-notf-008)) must consult the filter. Reference PRD-LOCK-006 and docs/privacy/LINDDUN metadata-minimisation register.

#### Security & privacy
Threats: information disclosure through side channels (search, thumbnails, backup, notifications). Controls: single choke-point filter, ciphertext-only persistence, fail-closed default (unknown lock state treated as locked). Maps to MASVS-STORAGE-1, MASVS-PRIVACY-2, OWASP-A01, CWE-200.

#### UX notes
Padlock placeholder tokens from docs/design/design-system.md; a consistent 'Unlock to search/share/export' inline prompt; never reveal titles of locked items in shared surfaces beyond what the user configured.

#### Test plan
Unit: filter applied to each consumer (test/security/locked_content_filter_test.dart). Integration: locked item absent from search/RAG/thumbnails/widgets; export/share refused; restore-on-new-device keeps lock. Security: backup artefact contains only ciphertext for locked items.

#### Dependencies
[SN-GCMP-001](security.md#sn-gcmp-001), [SN-SRCH-015](search.md#sn-srch-015), [SN-CRY-006](security.md#sn-cry-006).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-003

<a id="sn-gipad-003"></a>

**Apply iOS Data Protection classes to note content, caches, audio and exports**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, ios-phone |
| Areas | security, storage, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-CRY-008](security.md#sn-cry-008), [SN-CORE-004](storage.md#sn-core-004), [SN-AUD-006](audio.md#sn-aud-006) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-PLATFORM-3`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
docs/platform/ipad.md §8 makes `FileProtectionType.complete` the required at-rest default for all note content on Apple platforms — the file key is evicted shortly after the device locks, which is the cheapest strong control the platform offers. The backlog stores *keys* correctly ([SN-CRY-008](security.md#sn-cry-008)) and excludes them from backup ([SN-SEC-023](security.md#sn-sec-023)), but **no issue actually assigns Data Protection classes to the files the app writes**: the SQLite database and its WAL, the blob store, op-log segments, the FTS index, page/notebook thumbnail caches, audio segments, transcripts and temporary export artefacts. Each of those is a plaintext-adjacent artefact on a device that may be stolen while locked. This issue closes that gap and, crucially, resolves the conflict between "complete" protection and background audio recording, which must keep writing while the device is locked.

#### Scope
**In:** a `sane_secure_store.setFileProtection(path, class)` implementation and a single policy table mapping every app-written path to a class — `complete` for the database, blobs, op-log, search index, thumbnails, transcripts and exports; `completeUnlessOpen` for in-flight audio segment files and any file a background task must keep writing; never `none`; setting `NSURLIsExcludedFromBackupKey` where [SN-SEC-023](security.md#sn-sec-023) requires it; re-applying the class after atomic replace/rename (a rename can reset protection); a startup self-check that audits the container and reports violations in debug and telemetry-free diagnostics.
**Out:** key storage and the Secure Enclave ([SN-CRY-008](security.md#sn-cry-008)); envelope encryption of content ([SN-CRY-006](security.md#sn-cry-006), [SN-CRY-007](security.md#sn-cry-007)); app lock and biometrics ([SN-SEC-020](security.md#sn-sec-020)); Android Keystore/EncryptedFile ([SN-AND-019](security.md#sn-and-019)).

#### Acceptance criteria
- [ ] Every file the app creates under its container has an explicit protection class from the policy table; the startup audit finds zero files with `none` or an unset class.
- [ ] With the device locked, a running background recording continues to write its segment (class `completeUnlessOpen`) while an attempt to open the notes database fails cleanly and the app shows the "locked, will resume" state instead of crashing or losing data.
- [ ] After an atomic write (`write-temp → rename`) the destination file still reports the intended class (regression test for the rename-resets-protection trap).
- [ ] Export and share temp files are created with `complete`, in the app container (never `/tmp` world paths), and are deleted after the share sheet closes or on next launch.
- [ ] The policy table is documented in docs/security/ and referenced from docs/platform/ipad.md §8; a MASTG-style verification step is added to [SN-SEC-029](security.md#sn-sec-029).

#### Technical notes
Implement in `plugins/sane_secure_store/ios/` via `FileManager.setAttributes([.protectionKey: …])` / `URL.setResourceValues`. The drift/SQLite isolate ([SN-CORE-004](storage.md#sn-core-004)) must apply the class to the database, `-wal` and `-shm` files after creation and after any checkpoint that recreates them. Coordinate with [SN-AUD-006](audio.md#sn-aud-006) (background recording) and [SN-GIPAD-004](search.md#sn-gipad-004) (background tasks): a task that runs while locked must only touch `completeUnlessOpen` paths. Handle `NSFileProtectionComplete` read failures as a first-class recoverable state, not an exception.

#### Security & privacy
Directly implements MASVS-STORAGE-1/2 and the threat-model "stolen locked device" case; complements E2EE by protecting plaintext caches and indexes that decryption necessarily materialises (CWE-200). Failure mode must be fail-closed: if the class cannot be applied, refuse to write plaintext-adjacent data rather than writing it unprotected, and surface a diagnostic. No new data collection.

#### UX notes
Invisible when it works. The one visible state is "Waiting for unlock" when a background operation defers because the device is locked — reuse the sync-status pattern from [SN-SYNC-020](sync.md#sn-sync-020), with no note content in any accompanying notification ([SN-SEC-019](security.md#sn-sec-019)).

#### Test plan
Unit: `plugins/sane_secure_store/test/file_protection_policy_test.dart` (policy table completeness, rename re-apply). Integration: `integration_test/data_protection_test.dart` on a passcode-enabled iPad — lock the device, assert database reads fail and recording continues, unlock and assert recovery. Manual/verification: MASTG storage walk-through on a jailbroken or unlocked-bootloader-free extraction of the container, recorded in [SN-SEC-029](security.md#sn-sec-029).

#### Dependencies
[SN-CRY-008](security.md#sn-cry-008), [SN-CORE-004](storage.md#sn-core-004), [SN-AUD-006](audio.md#sn-aud-006).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-014

<a id="sn-gipad-014"></a>

**Suppress locked-note content on mirrored, AirPlay and captured iPad displays**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | security, privacy, editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-019](security.md#sn-sec-019), [SN-SEC-020](security.md#sn-sec-020), [SN-ED-021](editor.md#sn-ed-021) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PLATFORM-3`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
[SN-SEC-019](security.md#sn-sec-019) blocks screenshots, the app-switcher snapshot and screen recording for locked notes — but on iPad the most likely leak is the one it does not cover: the device is **mirrored to a projector or Apple TV** in a lecture theatre, or joined to Stage Manager on an external display, while the presenter opens a locked personal notebook. The app even ships a presentation mode with external-display output ([SN-ED-021](editor.md#sn-ed-021)), which makes a second screen a first-class, expected state. iPadOS exposes `UIScreen.isCaptured` and `capturedDidChangeNotification` plus the connected-screen list; nothing in the backlog reads them.

#### Scope
**In:** a display-privacy service that observes capture state and connected screens; a rule set applied when a locked/secure notebook is foreground — either redact the mirrored output (present a neutral "Content hidden while mirroring" surface on the external/captured screen) or, if the app cannot address the mirrored surface separately, blur the content and show a one-line banner on the primary screen; the same treatment for AirPlay receivers and wired mirroring; an explicit user override for the case where they *intend* to present a locked notebook (confirmation, session-scoped); interaction with presentation mode so an intentional presentation is never blocked; a diagnostic counter (content-free) for the QA matrix.
**Out:** screenshot/recording blocking ([SN-SEC-019](security.md#sn-sec-019)); the lock feature ([SN-SEC-020](security.md#sn-sec-020)); presentation mode itself ([SN-ED-021](editor.md#sn-ed-021)); the laser pointer ([SN-ED-020](editor.md#sn-ed-020)).

#### Acceptance criteria
- [ ] With a locked notebook open and mirroring started (AirPlay or cable), content on the mirrored/captured surface is hidden within 500 ms, and the user sees an explanation with a "Present anyway" action.
- [ ] Choosing "Present anyway" requires the app-lock gate to be satisfied and applies only to the current session; the next launch reverts to hidden.
- [ ] Stopping mirroring restores normal rendering with no relayout artefacts and no lost editing state.
- [ ] Presentation mode ([SN-ED-021](editor.md#sn-ed-021)) on an *unlocked* notebook is unaffected — no banner, no delay, full output.
- [ ] Notifications and the recorder bar shown while mirrored carry no note excerpts ([SN-SEC-019](security.md#sn-sec-019) rule reused, asserted here for the mirrored path).
- [ ] The behaviour is documented in docs/security/ and added to the MASVS platform verification set ([SN-SEC-030](security.md#sn-sec-030)).

#### Technical notes
Implement in the iOS runner plus a small Dart-facing stream; treat `isCaptured` as covering both recording and mirroring, and additionally watch `UIScreen.screens`/scene connection for an external display, because the two signals do not fully overlap. Coordinate with the multi-window session layer ([SN-GIPAD-011](editor.md#sn-gipad-011)) so hiding applies per scene, not globally. Keep the check cheap and off the draw path.

#### Security & privacy
Closes a real confidentiality gap for the "locked notebook" promise (CWE-200, MASVS-PRIVACY-2, MASVS-PLATFORM-3). Fail-closed: if capture state cannot be determined, treat the session as captured while a locked notebook is foreground. No content and no screen identifiers are logged; the diagnostic is a count only ([SN-TEL-002](telemetry.md#sn-tel-002) allow-list).

#### UX notes
Copy is factual and non-alarming: "This notebook is locked, so it's hidden while your screen is shared." The override is a single, clearly labelled action, not buried in Settings. Hidden state uses the design system's neutral surface with the lock glyph — never a black screen that looks like a crash.

#### Test plan
Unit: `app/test/display_privacy_rules_test.dart` (state matrix: locked × captured × external × override). Integration: `integration_test/mirroring_test.dart` simulating capture-state changes. Manual: real AirPlay to an Apple TV and a wired projector on the Tier 1 iPad, recorded in the [SN-GIPAD-012](qa.md#sn-gipad-012) checklist.

#### Dependencies
[SN-SEC-019](security.md#sn-sec-019), [SN-SEC-020](security.md#sn-sec-020), [SN-ED-021](editor.md#sn-ed-021).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GOPS-003

<a id="sn-gops-003"></a>

**Run the milestone-boundary threat-model revision cycle**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | security, privacy, docs |
| Size | M |
| SDLC | requirements |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-002](security.md#sn-sec-002) |
| Security controls | `SSDF-PO.1`, `SSDF-PW.1`, `TM-REVIEW`, `OWASP-A04` |
| Extra labels | agent-ready, sec: threat-model |

#### Context
`docs/security/ssdlc-process.md` §2.1 makes the requirements gate *"threat model updated"*: whenever a change introduces or alters a **trust boundary, data flow, stored asset or third-party dependency**, the STRIDE/LINDDUN rows in `docs/security/threat-model.md` must be revised. [SN-SEC-002](security.md#sn-sec-002) baselines that model once at M0 and [SN-GSEC-009](security.md#sn-gsec-009) gates individual feature designs, but every milestone after M0 moves the boundary wholesale: M2 adds hostile-file parsers and a blob store, M3 adds a microphone and downloadable ML models, M4 adds the user's cloud drive and key material, M5 adds OS entry points (widgets, share targets, intents), M6 adds a relay, WebRTC peers and an LLM reading note content, M8 adds payment providers and a public website. Nothing schedules that revision, so the model silently ages into fiction.

#### Scope
**In:** a written revision cycle in `docs/security/threat-model.md` — a dated revision log (milestone, date, reviewer, new/changed/retired `TM-*` rows, new assets, new external entities) plus a per-milestone checklist of what to re-walk (assets, actors, trust boundaries, data flows, dependencies, privacy/LINDDUN rows); running the first two revisions for real (M2 content ingest + blob store; M3 microphone, transcripts and model supply chain) and filing the resulting `TM-*` rows into `docs/security/controls-matrix.md`; a gate row in the milestone register ([SN-GOPS-001](qa.md#sn-gops-001)) so a milestone cannot close with a stale model; a "no boundary changed" attestation form for milestones that genuinely add none.
**Out:** the per-feature design review gate ([SN-GSEC-009](security.md#sn-gsec-009)); the M0 baseline ([SN-SEC-002](security.md#sn-sec-002)); the DPIA ([SN-PRV-013](privacy.md#sn-prv-013)); implementing any control the revision discovers (those become their own issues).

#### Acceptance criteria
- [ ] `threat-model.md` carries a revision log with an entry per milestone boundary, naming the reviewer and the rows added/changed/retired.
- [ ] The M2 revision covers PDF/image/font/bundle ingest, the content-addressed blob store, thumbnail and index caches, and the multi-profile boundary; each new threat has a `TM-*` id, a control and an owning issue key.
- [ ] The M3 revision covers microphone capture, on-device model download and integrity, transcripts as a new sensitive asset class, and any cloud-recognition escalation path.
- [ ] Every new/changed `TM-*` row is reflected in `controls-matrix.md` with a named verification (test or CI job), per `ssdlc-process.md` §2.2.
- [ ] A milestone with no boundary change records an explicit signed attestation rather than an empty log entry.
- [ ] The cycle is referenced from the milestone-close checklist and from `docs/security/README` navigation.

#### Technical notes
Keep the revision diff-friendly: one Markdown table per STRIDE category with stable `TM-<letter>-<nn>` ids, never renumber. Derive the "what changed" candidate list mechanically — new packages in the workspace, new plugins under `plugins/`, new `services/` endpoints, new OS permissions in the manifests/Info.plist — so the reviewer starts from evidence, not memory. Cross-link each row to the issue that implements the control so [SN-GOPS-020](security.md#sn-gops-020) can verify traceability.

#### Security & privacy
This *is* a security control: SSDF PO.1/PW.1 and Microsoft SDL practice 3 (threat modelling before each major feature). LINDDUN rows matter as much as STRIDE here — M3 transcripts and M6 collaboration metadata are the two places where a zero-knowledge product most easily leaks by inference (`docs/security/threat-model.md` privacy section, MASVS-PRIVACY-1/2). The revision must not copy note content or real user data into the document as examples.

#### UX notes
No end-user UI. The reviewer's surface is the Markdown table and the revision log; keep the per-milestone checklist short enough that it is actually run (one page), and put the newest revision at the top of the log.

#### Test plan
Process, not code: (1) run the M2 revision against the merged M2 work and confirm at least the ingest, blob-store and profile-isolation boundaries produce rows; (2) confirm each row has a verification that exists (grep the named test/CI job); (3) confirm the milestone-close checklist fails when the log has no entry for the milestone; (4) have the Security Owner sign off in the issue.

#### Dependencies
[SN-SEC-002](security.md#sn-sec-002) (baselined model to revise), [SN-GOPS-001](qa.md#sn-gops-001) (gate register that enforces it).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Security Owner sign-off recorded on the revision log entry


---

### SN-GOPS-013

<a id="sn-gops-013"></a>

**Watch upstream advisories for vendored native and WASM components**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security, ci-cd, compat |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-CI-004](ci-cd.md#sn-ci-004), [SN-CI-010](ci-cd.md#sn-ci-010) |
| Security controls | `SSDF-RV.1`, `OWASP-A06`, `CWE-1104`, `CWE-1395` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
Dependabot and OSV-Scanner watch what our manifests declare — pub, npm, Gradle, Swift ([SN-CI-010](ci-cd.md#sn-ci-010), [SN-CI-011](ci-cd.md#sn-ci-011)). The components most likely to produce a memory-safety CVE are not declared that way: **PDFium** (through pdfrx, [SN-PDF-002](pdf.md#sn-pdf-002)), **SQLite** (through drift and sqlite-vec, [SN-CORE-004](storage.md#sn-core-004), [SN-AI-010](ai.md#sn-ai-010)), **zstd** ([SN-CORE-017](storage.md#sn-core-017)), **libwebrtc** ([SN-COL-005](collaboration.md#sn-col-005)), **coturn** ([SN-COL-023](collaboration.md#sn-col-023)), **whisper.cpp** ([SN-WEB-027](audio.md#sn-web-027)), **CanvasKit/skwasm** ([SN-WEB-002](compat.md#sn-web-002)), image and audio decoders, and the platform ML runtimes. They arrive as prebuilt binaries or vendored sources inside a Dart package, so a PDFium advisory never appears as a pub advisory and our SLA clock (`docs/security/ssdlc-process.md` §3) never starts. [SN-GSEC-006](security.md#sn-gsec-006) routes the alerts we *do* get; this issue creates the ones we currently miss.

#### Scope
**In:** `docs/security/native-components.md` — an inventory row per vendored/binary component: name, upstream project, the version actually shipped, how it is bundled (which package, which platform, which artefact), the advisory feed to watch, the owning issue/package and the update path; a scheduled job that reads the release CycloneDX SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)) plus the inventory, checks each component's advisory source and pinned version, and opens an issue when an advisory affects a shipped version; a per-component update playbook (how to bump it: wait for the wrapper package, pin a newer prebuilt, or rebuild) with the test surface each bump requires (parser fuzz corpus [SN-SEC-010](security.md#sn-sec-010), PDF goldens, audio round-trip); an SLA hook so a Critical advisory starts the `ssdlc-process.md` §3 clock.
**Out:** the manifest-level scanners ([SN-CI-010](ci-cd.md#sn-ci-010)); alert routing and the security dashboard ([SN-GSEC-006](security.md#sn-gsec-006), [SN-CI-019](ci-cd.md#sn-ci-019)); licence obligations for the same components ([SN-GOPS-004](release.md#sn-gops-004)); toolchain upgrades ([SN-GOPS-011](devx.md#sn-gops-011)).

#### Acceptance criteria
- [ ] Every vendored or prebuilt native/WASM component that ships in any artefact has an inventory row with the concrete shipped version — "whatever pdfrx bundles" is not an acceptable answer.
- [ ] A CI check fails when the SBOM contains a component with no inventory row (new binary dependency introduced without being tracked).
- [ ] The scheduled watcher opens an issue within one day of an advisory affecting a shipped version, with severity mapped onto the `ssdlc-process.md` §3 SLA.
- [ ] Each component has a written update path and the named regression tests a bump must pass.
- [ ] A component whose upstream is unmaintained is flagged (CWE-1395) with a documented mitigation or replacement plan.
- [ ] The inventory is reviewed as part of the periodic re-verification cadence ([SN-GOPS-017](security.md#sn-gops-017)).

#### Technical notes
Resolve real versions at build time where possible (a build step that records the PDFium and SQLite build strings from the linked artefacts beats trusting a README), and feed them into the SBOM so inventory and SBOM agree. Advisory sources differ per component: NVD/CVE feeds, GitHub Security Advisories, project mailing lists and Chromium release notes for PDFium. Where no machine feed exists, record a manual check in the periodic cadence rather than pretending it is automated.

#### Security & privacy
This is the maintenance half of the parser-hardening story: [SN-SEC-004](security.md#sn-sec-004)-[SN-SEC-010](security.md#sn-sec-010) harden and fuzz our ingest paths, but a heap overflow in the upstream decoder is fixed only by updating it (OWASP-A06, CWE-1104, CWE-1395; MASVS-CODE-2 dependency currency). A shipped-but-untracked binary is also an SBOM accuracy failure, which undermines the SLSA provenance story ([SN-CI-004](ci-cd.md#sn-ci-004)). No user data is involved; advisory handling follows coordinated disclosure — do not publish exploit detail in a public tracking issue before the fix ships.

#### UX notes
No end-user UI. Maintainer surface: the inventory table (sorted by risk: parsers first) and a tracking issue whose title names the component, the CVE and the shipped version, so triage takes seconds.

#### Test plan
Fixtures: an SBOM containing an untracked binary component fails the CI check; a fixture advisory for a version below the pinned one opens an issue, one above does not. Manual: run the watcher against the current inventory and confirm the shipped PDFium and SQLite versions are the real ones (compare with the runtime version strings queried on device). Regression: after a bump, the named tests (PDF goldens, fuzz corpus, audio round-trip) must run and pass.

#### Dependencies
[SN-CI-004](ci-cd.md#sn-ci-004) (SBOM), [SN-CI-010](ci-cd.md#sn-ci-010) (existing scanners this complements).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Inventory reconciled against the first release SBOM with zero untracked components


---

### SN-GOPS-017

<a id="sn-gops-017"></a>

**Define the post-launch security, privacy and accessibility re-verification cadence**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | docs |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | security, privacy, a11y |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-033](security.md#sn-sec-033), [SN-A11Y-017](a11y.md#sn-a11y-017), [SN-SEC-029](security.md#sn-sec-029) |
| Security controls | `SSDF-RV.1`, `SSDF-RV.3`, `MASVS-CODE-2`, `OWASP-A09` |
| Extra labels | agent-ready, sec: masvs |

#### Context
M7 runs the audits once: penetration test ([SN-SEC-033](security.md#sn-sec-033), [SN-SEC-034](security.md#sn-sec-034)), MASVS L2 verification ([SN-SEC-029](security.md#sn-sec-029)-[SN-SEC-031](security.md#sn-sec-031)), ASVS for web and relay ([SN-SEC-032](security.md#sn-sec-032)), the accessibility audit ([SN-A11Y-017](a11y.md#sn-a11y-017)), the i18n/RTL audit ([SN-I18N-013](i18n.md#sn-i18n-013)) and the performance soak ([SN-PERF-024](perf.md#sn-perf-024)). After launch the product keeps changing — new platform surfaces, new AI features, new OS versions — and every one of those verdicts decays. `docs/security/ssdlc-process.md` §2.6 defines a maintenance gate for *vulnerabilities* but not a re-verification rhythm, so without a schedule the M7 evidence quietly becomes a historical document that store questionnaires and users are nonetheless relying on.

#### Scope
**In:** `docs/security/reverification-cadence.md` — what is re-run and how often (annual: pentest and full MASVS/ASVS L2 sweep, accessibility audit and conformance statement refresh [SN-A11Y-018](a11y.md#sn-a11y-018), threat-model whole-model review [SN-GOPS-003](security.md#sn-gops-003), native-component inventory [SN-GOPS-013](security.md#sn-gops-013), account register [SN-GOPS-014](release.md#sn-gops-014); per-release: the existing automated gates and the store-declaration reconciliation [SN-PRV-016](privacy.md#sn-prv-016); per-milestone: the boundary threat-model revision); a **delta rule** that scopes each cycle to what changed since the last one, with the full sweep reserved for the annual cycle; the off-cycle triggers (a new platform, a new trust boundary, a new data category, a security incident, a store policy change); a scheduled workflow that opens the recurring audit issues with their checklists; an evidence archive convention so each cycle's reports are findable next to the controls matrix.
**Out:** the first execution of each audit (the M7 issues); the vulnerability SLA itself (`ssdlc-process.md` §3); scanner alert routing ([SN-GSEC-006](security.md#sn-gsec-006)); OS/browser readiness ([SN-GPRF-018](compat.md#sn-gprf-018)).

#### Acceptance criteria
- [ ] The cadence document names every recurring verification, its frequency, its owner, its scope rule and the artefact it must produce.
- [ ] A scheduled workflow opens each recurring audit issue at the right lead time, pre-filled with the checklist and links to the previous cycle's evidence.
- [ ] The delta rule is concrete: each cycle lists the changes since the last cycle (new packages, new endpoints, new permissions, new data categories) and justifies what it skipped.
- [ ] Off-cycle triggers are enumerated and at least one is wired to an automation (for example, a new OS permission in a manifest opens a threat-model revision issue).
- [ ] Evidence from each cycle is archived with a date and linked from `controls-matrix.md`, so a control's verification date is visible.
- [ ] The accessibility conformance statement and the store privacy declarations are re-checked against reality on the stated cadence, not only at first submission.

#### Technical notes
Keep the schedule in the same YAML the compliance calendar uses ([SN-GOPS-012](release.md#sn-gops-012)) so there is one scheduler, not two. Derive the delta list mechanically from git (new files under `packages/`, `plugins/`, `services/`, changes to manifests/Info.plist, new `security` control ids in `issues/*.json`) and attach it to the issue the workflow opens. Archive reports outside the repo when they contain finding detail that is not yet fixed; keep only the summary and the date in-tree.

#### Security & privacy
SSDF RV.1/RV.3: identifying vulnerabilities continuously and learning from them is a lifecycle obligation, not a pre-launch event. A stale MASVS verdict or a stale privacy label is a factual misstatement to users and stores (MASVS-CODE-2 currency; OWASP-A09). Unfixed findings in an archived report are sensitive: they are stored in the controlled location used for pentest reports ([SN-SEC-034](security.md#sn-sec-034)), never in a public issue, and summaries avoid exploit detail before fixes ship.

#### UX notes
No end-user surface except the refreshed accessibility conformance statement and the About/legal pages that carry review dates ([SN-GOPS-019](website.md#sn-gops-019)). Maintainer surface: generated audit issues whose checklists mirror the original M7 issues so the work is repeatable by a different person or agent.

#### Test plan
Manual: run the scheduler with fixture dates and confirm the correct set of issues appears with previous-cycle links. Dry-run the delta generator on the last three months of history and confirm it names the real changes. Table-top one off-cycle trigger (a new OS permission) and confirm it produces the threat-model revision issue. Verify each archived artefact from M7 is reachable from the controls matrix.

#### Dependencies
[SN-SEC-033](security.md#sn-sec-033) (pentest plan), [SN-SEC-029](security.md#sn-sec-029) (MASVS verification), [SN-A11Y-017](a11y.md#sn-a11y-017) (accessibility audit).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Next cycle's audit issues created by the scheduler and dated


---

### SN-GOPS-020

<a id="sn-gops-020"></a>

**Verify requirement, issue, control and test traceability in CI**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | security, docs, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-002](security.md#sn-sec-002), [SN-FND-015](ci-cd.md#sn-fnd-015) |
| Security controls | `SSDF-PO.1`, `SSDF-PW.8`, `OWASP-A09`, `ASVS-V1` |
| Extra labels | agent-ready, sec: threat-model |

#### Context
`docs/security/ssdlc-process.md` §0.4 states the project's traceability spine: requirement (`PRD-*`) -> issue (`SN-*`) -> control (`MASVS-*`/`ASVS-*`/`TM-*`) -> test -> CI gate, with `docs/security/controls-matrix.md` as the map. Nothing checks it. `scripts/validate-issues.mjs` validates issue shape but treats the `security` array as free text, so an issue can claim `MASVS-STORAGE-9` or a `TM-` row that does not exist; a controls-matrix row can name a verification test that was never written; and a PRD requirement can have no owning issue at all. The result is a security story that reads well and cannot be audited — precisely what M7's MASVS/ASVS verification ([SN-SEC-029](security.md#sn-sec-029)-[SN-SEC-032](security.md#sn-sec-032)) and any external assessor will ask to see.

#### Scope
**In:** `scripts/validate-traceability.mjs` — parse the control ids defined in `controls-matrix.md` and the threat ids in `threat-model.md`, parse `PRD-*` ids from `docs/product/prd-0*.md`, cross-check against `issues/*.json` (`security` arrays and `{{...}}`/`PRD-` citations in bodies) and against the repository's test files named by the matrix; emit `docs/backlog/traceability.md` with four coverage tables (controls with no owning issue, issues citing unknown control ids, matrix rows whose named verification file does not exist, PRD requirements with no issue); wire it into the issues-schema CI job ([SN-FND-015](ci-cd.md#sn-fnd-015)) as a warning-only report while the backlog is still being authored, escalating to a hard failure for unknown control ids immediately and for uncovered controls at M7.
**Out:** authoring the missing controls or tests (each becomes its own issue); the milestone gate register ([SN-GOPS-001](qa.md#sn-gops-001)); the controls-matrix content itself ([SN-SEC-001](security.md#sn-sec-001)); the PRD milestone remap (a maintainer decision, CLAUDE.md §13).

#### Acceptance criteria
- [ ] Any issue whose `security` array contains an id absent from `controls-matrix.md` or `threat-model.md` fails CI, with the offending key and id named.
- [ ] The report lists every control row with no owning issue, and every row whose named verification file does not exist in the repo.
- [ ] The report lists `PRD-*` requirements with no owning issue, tolerating the known PRD-milestone mismatch documented in `docs/QUALITY-REPORT.md` without hiding it.
- [ ] `docs/backlog/traceability.md` is regenerated in CI and is diff-stable (deterministic ordering).
- [ ] The escalation schedule is written down: unknown ids fail now; uncovered controls fail from M7 ([SN-GOPS-001](qa.md#sn-gops-001) gate row).
- [ ] Running it today produces an accurate baseline, and that baseline is recorded in the issue as the starting point.

#### Technical notes
Follow `validate-issues.mjs`: Node 22, zero dependencies, `--json` and `--stats` flags, exit 1 only on hard errors. Parse ids with tolerant regexes anchored on the matrix's table structure rather than free text, and keep a small alias file for ids that legitimately appear in two forms (`MASVS-STORAGE-1` vs a MASTG test reference). Do not re-implement issue parsing — import the same scan the existing validator uses so both see one source of truth.

#### Security & privacy
This is the control that keeps every other control honest (SSDF PO.1 requirements are defined, PW.8 they are tested, ASVS V1 architecture/verification documentation; OWASP-A09 for the audit trail). A fabricated control id is worse than a missing one: it makes the controls matrix and any store or audit answer derived from it untrue. The script reads only repository text — no user data, no network, no credentials — and must not print file contents beyond the ids it names (CWE-200).

#### UX notes
Developer-facing. The generated report leads with the four counts so a reader sees the state in one line, then the tables sorted by control id; CI annotations name the issue key and the bad id so the fix is obvious without opening the report.

#### Test plan
`tools/test/validate_traceability_test.mjs` with fixtures: (1) an issue citing an unknown control id -> exit 1; (2) a control row with a missing verification file -> reported, exit 0 in warn mode, exit 1 in strict mode; (3) a PRD id with no issue -> reported; (4) deterministic output across two runs. Manual: run against the current repository and file the baseline numbers in this issue; confirm the M7 strict mode would fail today (it should) so the escalation has teeth.

#### Dependencies
[SN-SEC-002](security.md#sn-sec-002) (baselined threat model and controls matrix to parse), [SN-FND-015](ci-cd.md#sn-fnd-015) (CI job to attach to).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Baseline coverage numbers recorded and linked from the controls matrix


---

### SN-GSEC-002

<a id="sn-gsec-002"></a>

**Protect derived-data caches at rest and exclude them from cloud and backup**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, storage, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CRY-001](security.md#sn-cry-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-PG-010](pages-canvas.md#sn-pg-010) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-1`, `TM-I-01`, `TM-I-03`, `TM-I-10`, `OWASP-A02`, `CWE-312`, `CWE-922` |
| Extra labels | sec: masvs, agent-ready |

#### Context
The E2EE stack encrypts the document DB and blobs, and [SN-SRCH-015](search.md#sn-srch-015) encrypts the FTS index, but several *derived* caches are rendered representations of note content that today are written to plain on-device cache directories: page/notebook thumbnails ([SN-PG-010](pages-canvas.md#sn-pg-010) is tagged CWE-312 but only specifies a "disk cache keyed by page id + content hash"), OCR text intermediates ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)), and AI summary/flashcard caches ([SN-AI-012](ai.md#sn-ai-012)/[SN-AI-014](ai.md#sn-ai-014)). A plaintext thumbnail is a picture of the user's note; if it lands in an OS auto-backup (TM-I-10) or is readable by another app after a device compromise (TM-I-03), the zero-knowledge guarantee (TM-I-01) is broken by the side door. This issue makes at-rest confidentiality and backup/cloud exclusion a single, enforced guarantee for every derived cache.

#### Scope
**In:** route thumbnail, OCR-intermediate and AI-derived caches through the encrypted store (SQLCipher/`drift` or the content-addressed encrypted blob store) keyed from `sane_secure_store`, or encrypt-in-place with per-cache keys; set iOS `isExcludedFromBackup` / Android `fullBackupContent`+`dataExtractionRules` on any cache path that must stay on disk unencrypted for performance; never sync derived caches as cleartext to the user's drive; a lint/arch-check that flags writes of content-derived bytes to a non-encrypted path.
**Out:** the FTS index at rest ([SN-SRCH-015](search.md#sn-srch-015)); the vector store, which lives in the encrypted drift DB ([SN-AI-010](ai.md#sn-ai-010)); the key hierarchy ([SN-CRY-002](security.md#sn-cry-002)); backup exclusion of *keys* ([SN-SEC-023](security.md#sn-sec-023), [SN-AND-030](security.md#sn-and-030)).

#### Acceptance criteria
- [ ] Thumbnail, OCR and AI-derived caches are encrypted at rest or excluded from backup and never leave the device as cleartext.
- [ ] A test asserts thumbnail cache files on disk are ciphertext (or absent from backup manifests).
- [ ] The arch-check fails a PR that writes content-derived bytes to a plaintext cache path.
- [ ] Cache eviction preserves the confidentiality guarantee (no plaintext temp during regeneration).
- [ ] controls-matrix STORAGE-1/2 rows list the derived-cache stores and their protection.

#### Technical notes
Extend the encrypted storage layer in `sane_core`/`sane_secure_store`; reuse `sane_crypto` envelope keys ([SN-CRY-002](security.md#sn-cry-002)). Audit `getTemporaryDirectory`/`cacheDir`/`NSCachesDirectory` usage. Reference docs/security/threat-model.md TM-I-01/03/10 and controls-matrix §1 STORAGE.

#### Security & privacy
Threats: TM-I-01 (cloud plaintext), TM-I-03 (local FS read), TM-I-10 (backup exfiltration). Controls: MASVS-STORAGE-1/2, CRYPTO-1, ASVS V14, 2025 A04 Cryptographic Failures.

#### UX notes
No user-facing change beyond unaffected performance; document the guarantee in the privacy promise page ([SN-SITE-006](website.md#sn-site-006)).

#### Test plan
Unit: cache-write ciphertext assertions; backup-manifest exclusion checks. Widget: thumbnail render round-trip from encrypted cache. Integration: MASTG backup review confirms no derived plaintext in an iCloud/Android backup dump.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-PG-010](pages-canvas.md#sn-pg-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans).
- [ ] controls-matrix STORAGE rows updated; arch-check rule added.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-003

<a id="sn-gsec-003"></a>

**Harden domain and email security (DMARC, SPF, DKIM, CAA, HSTS preload, MTA-STS)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | security, ci-cd, release |
| Size | S |
| SDLC | release |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-036](security.md#sn-sec-036), [SN-SITE-013](website.md#sn-site-013) |
| Security controls | `TM-S-01`, `TM-S-04`, `MASVS-NETWORK-1`, `ASVS-V12`, `ASVS-V13`, `OWASP-A02`, `CWE-16`, `CWE-297` |
| Extra labels | sec: threat-model, agent-ready |

#### Context
The disclosure process (docs/security/devsecops-pipeline.md §6/§7, [SN-SEC-036](security.md#sn-sec-036)) publishes `security@swiftsane.ai` and the marketing/docs site ([SN-SITE-001](website.md#sn-site-001)) serves the brand domain. Nothing in the backlog hardens the *domain and email* layer itself. Without DMARC/SPF/DKIM an attacker can spoof `@swiftsane.ai` to phish users or reporters (STRIDE-Spoofing, TM-S-01); without a CAA record any CA can be tricked into issuing a certificate for the domain (TM-S-04 adjacency); without HSTS preload a first-visit downgrade is possible; without MTA-STS/TLS-RPT, mail to security@ can be intercepted. These are cheap, high-leverage controls that must exist before the domain is advertised at launch.

#### Scope
**In:** publish and version-control DNS records — SPF, DKIM (per sending source), DMARC (start `p=none` with rua/ruf aggregate reporting, then move to `p=reject`), a restrictive CAA record listing only the chosen CA(s), MTA-STS policy + TLS-RPT, and DNSSEC where the registrar supports it; submit the apex + www to the HSTS preload list (coordinated with the `Strict-Transport-Security` header set by [SN-SITE-013](website.md#sn-site-013)/[SN-WEB-017](ci-cd.md#sn-web-017)); a short runbook and a periodic check (e.g. a scheduled job or documented manual audit) that the records have not drifted.
**Out:** application security headers/CSP ([SN-SEC-016](security.md#sn-sec-016), [SN-SITE-013](website.md#sn-site-013)); TLS termination/hosting ([SN-WEB-017](ci-cd.md#sn-web-017)); the disclosure policy text ([SN-SEC-036](security.md#sn-sec-036)); certificate pinning for API endpoints ([SN-SEC-022](security.md#sn-sec-022)).

#### Acceptance criteria
- [ ] SPF, DKIM and DMARC are published; DMARC aggregate reports are received and reviewed; a documented path to `p=reject` exists.
- [ ] A CAA record restricts issuance to the approved CA(s); DNSSEC enabled where supported.
- [ ] MTA-STS + TLS-RPT are published for the mail domain.
- [ ] The apex and www are submitted to the HSTS preload list with `preload` in the header.
- [ ] DNS records are stored as code and a drift check exists.

#### Technical notes
Keep zone records under version control (e.g. `infra/dns/`); align HSTS max-age/`preload`/`includeSubDomains` with the header emitted at the edge. Reference docs/security/threat-model.md TM-S-01/04 and controls-matrix §3 V12/V13.

#### Security & privacy
Threats: TM-S-01 (identity/email spoofing), TM-S-04 (mis-issued certs). Controls: ASVS V12 Secure Communication, V13 Configuration, MASVS-NETWORK-1, 2025 A02 Security Misconfiguration. Protects reporters and users from phishing under the brand.

#### UX notes
None in-app; improves trust signals (verified sender) and prevents downgrade on first web visit.

#### Test plan
Manual/automated: validate SPF/DKIM/DMARC/CAA/MTA-STS with standard checkers; confirm a spoofed test message is quarantined/rejected once at enforcement; confirm preload eligibility via the preload submission tool.

#### Dependencies
[SN-SEC-036](security.md#sn-sec-036), [SN-SITE-013](website.md#sn-site-013).

#### Definition of done
- [ ] Records published, stored as code, and drift-checked.
- [ ] Docs/runbook updated under docs/security/.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-005

<a id="sn-gsec-005"></a>

**Establish fail-closed exceptional-conditions handling (OWASP 2025 A10)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | security, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-CORE-011](storage.md#sn-core-011), [SN-SEC-021](security.md#sn-sec-021) |
| Security controls | `OWASP-A10`, `TM-T-01`, `TM-I-05`, `ASVS-V16`, `MASVS-CODE-4`, `CWE-703`, `CWE-755`, `CWE-209` |
| Extra labels | sec: owasp-top10, agent-ready |

#### Context
OWASP Top 10 **2025 A10 — Mishandling of Exceptional Conditions** is a new category (docs/security/controls-matrix.md §4b) with no dedicated backlog issue. Individual fail-closed behaviours exist — crypto decrypt ([SN-CRY-020](security.md#sn-cry-020)), parser input gate ([SN-SEC-004](security.md#sn-sec-004)), sync auth expiry ([SN-SYNC-022](sync.md#sn-sync-022)) — but there is no cross-cutting discipline that guarantees every error path fails closed, produces no partial state, leaks no sensitive data in a message or stack trace, and is caught by a top-level boundary. A partial-decrypt that renders half a note, a parser that leaves a half-imported notebook, or an error dialog echoing a token would each break the security model.

#### Scope
**In:** codify the exceptional-conditions policy in docs/security/secure-coding-checklist.md and enforce it: mandatory `Result`/`Failure` returns for fallible operations (build on [SN-CORE-011](storage.md#sn-core-011)), no swallowed exceptions, no partial commits (transactional writes / all-or-nothing import), user-safe error surfaces that never contain content/keys/tokens/paths (reuse the redaction of [SN-SEC-021](security.md#sn-sec-021)), a global Dart error boundary (`FlutterError.onError`, `PlatformDispatcher.onError`, zoned guards) that fails safe and routes to sanitised diagnostics, and a Semgrep/arch rule banning empty catches and `toString()` of exceptions into UI. Apply to crypto, sync, parse, storage and IO paths.
**Out:** the crypto fail-closed decrypt itself ([SN-CRY-020](security.md#sn-cry-020)); the input-validation gate ([SN-SEC-004](security.md#sn-sec-004)); log redaction implementation ([SN-SEC-021](security.md#sn-sec-021)); DoS/resource limits on parsers ([SN-SEC-010](security.md#sn-sec-010)).

#### Acceptance criteria
- [ ] The checklist documents the fail-closed / no-partial-state / no-sensitive-error rule with examples.
- [ ] A Semgrep/arch rule flags empty catch blocks and exception text reaching a UI/error sink.
- [ ] A global error boundary catches uncaught errors, fails safe and emits only redacted diagnostics.
- [ ] Representative crypto/sync/parse/storage error paths are shown (by test) to leave no partial state and no sensitive data.
- [ ] controls-matrix §4b A10 row moves toward Implemented.

#### Technical notes
Add the rule to the CI SAST config ([SN-CI-007](ci-cd.md#sn-ci-007)); provide a shared `SafeError` mapping from `Failure` to user copy. Reference docs/security/threat-model.md TM-T-01 (fail closed on tamper) and checklist §3/§7.

#### Security & privacy
Threats: TM-T-01 (partial/rolled-back segment must fail closed), TM-I-05 (no sensitive data in errors/logs). Controls: 2025 A10, ASVS V16 Error Handling, MASVS-CODE-4, CWE-703/755/209.

#### UX notes
Error/empty/loading states show a friendly, non-technical message with a recovery action; never a raw exception. Aligns with the design system toast/dialog components ([SN-DS-019](design-system.md#sn-ds-019)).

#### Test plan
Unit: fault-injection on crypto/sync/parse/storage asserting Result.failure, no partial write, redacted message. Widget: error-boundary golden showing safe copy. CI: the empty-catch/exception-to-UI lint rule with positive and negative fixtures.

#### Dependencies
[SN-CORE-011](storage.md#sn-core-011), [SN-SEC-021](security.md#sn-sec-021).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans).
- [ ] Checklist + controls-matrix A10 row updated.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-006

<a id="sn-gsec-006"></a>

**Wire security alerting and monitoring for scanner and dependency findings**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security, ci-cd |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Depends on | [SN-CI-019](ci-cd.md#sn-ci-019), [SN-SEC-035](security.md#sn-sec-035) |
| Security controls | `OWASP-A09`, `TM-R-02`, `ASVS-V16`, `SSDF-RV.1`, `CWE-778` |
| Extra labels | sec: owasp-top10, agent-ready |

#### Context
OWASP 2025 **A09 — Logging & Alerting Failures** (docs/security/controls-matrix.md §4b) requires that security-relevant events are not only recorded but *routed to a human in time to act*. Today the repo produces signals — Code Scanning SARIF (Semgrep/Trivy/CodeQL), Dependabot/OSV alerts, secret-scanning/push-protection events, and Scorecard drift — and there is a security dashboard ([SN-CI-019](ci-cd.md#sn-ci-019)) and an incident runbook ([SN-SEC-035](security.md#sn-sec-035)), but nothing that *alerts* the Security Owner when a new high/critical finding appears or an alert breaches its SLA. Silent SARIF that no one reads is an A09 failure. This issue closes the detect→notify→triage loop.

#### Scope
**In:** route new Code Scanning, Dependabot/OSV, secret-scanning and Scorecard alerts to the Security Owner via a low-noise channel (GitHub notifications config + a scheduled workflow that opens/updates a triage tracking issue for any open high/critical finding, with the SLA clock from ssdlc §3); a severity-to-SLA mapping and an escalation when a finding ages past its triage window; a documented (future) service-side detection/alerting spec for the relay/entitlement services (auth failures, rate-limit trips, integrity/tamper signals — content-free per [SN-COL-008](collaboration.md#sn-col-008)). De-duplicate against existing alerts; no content or PII in any alert payload.
**Out:** the aggregation dashboard UI ([SN-CI-019](ci-cd.md#sn-ci-019)); the incident-response runbook prose ([SN-SEC-035](security.md#sn-sec-035)); the scanners that produce the findings ([SN-CI-001](ci-cd.md#sn-ci-001) children); client telemetry ([SN-TEL-001](telemetry.md#sn-tel-001)).

#### Acceptance criteria
- [ ] A new high/critical Code Scanning / Dependabot / secret-scanning / Scorecard finding produces an actionable alert to the Security Owner.
- [ ] Each open finding is tracked with its ssdlc §3 SLA clock; an overdue finding escalates.
- [ ] Alert payloads contain no note content, keys, tokens or PII.
- [ ] A service-side detection/alerting spec is documented for when services ship.
- [ ] controls-matrix §4b A09 row moves toward Implemented.

#### Technical notes
Implement as a scheduled `security-alerts` workflow using the GitHub code-scanning/Dependabot alert APIs with a least-privilege token; write the triage tracker under a security label. Reference devsecops-pipeline §2/§6 and threat-model TM-R-02.

#### Security & privacy
Threats: TM-R-02 (absent logs/alerts prevent incident reconstruction). Controls: 2025 A09, ASVS V16, SSDF RV.1, CWE-778. Complements, not duplicates, the dashboard and runbook.

#### UX notes
Maintainer-facing only; keep signal-to-noise high so alerts are not ignored.

#### Test plan
Dry-run: seed a synthetic high finding and confirm an alert + tracking issue with the correct SLA; confirm an overdue item escalates; assert no sensitive fields in the payload.

#### Dependencies
[SN-CI-019](ci-cd.md#sn-ci-019), [SN-SEC-035](security.md#sn-sec-035).

#### Definition of done
- [ ] Workflow + docs merged, CI green.
- [ ] controls-matrix §4b A09 updated; runbook cross-links the alert path.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-007

<a id="sn-gsec-007"></a>

**Run MASVS-PRIVACY L2 verification with MASTG privacy procedures**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security, privacy, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-PRV-004](privacy.md#sn-prv-004), [SN-PRV-009](privacy.md#sn-prv-009), [SN-AI-019](ai.md#sn-ai-019) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-PRIVACY-4`, `TM-P-06`, `TM-P-08`, `OWASP-A01`, `CWE-359` |
| Extra labels | sec: masvs, agent-ready |

#### Context
The M7 MASVS verification set covers storage/keys/crypto/backup ([SN-SEC-029](security.md#sn-sec-029)), platform/WebView/deep-links/leaks ([SN-SEC-030](security.md#sn-sec-030)), network/resilience ([SN-SEC-031](security.md#sn-sec-031)) and crypto ([SN-CRY-024](security.md#sn-cry-024)). The **MASVS-PRIVACY** category (docs/security/controls-matrix.md §1) has no dedicated MASTG verification issue — the one place it is referenced points at [SN-SEC-029](security.md#sn-sec-029), which is scoped to storage/crypto only. MASVS-PRIVACY-1..4 (permission management & consent, collection transparency, retention & user control, third-party sharing restrictions) is exactly the category most load-bearing for a note app whose payload is personal content. This issue adds the missing MASTG privacy verification pass.

#### Scope
**In:** execute and record the MASTG privacy procedures on a release-candidate build — verify lazy, in-context permission requests with rationale and no launch-time prompts ([SN-PRV-004](privacy.md#sn-prv-004)); confirm the "data leaves device" banner and per-request cloud-AI consent ([SN-AI-019](ai.md#sn-ai-019), [SN-PRV-003](privacy.md#sn-prv-003)); confirm no hidden tracking, no analytics/ad SDK linked ([SN-PRV-010](privacy.md#sn-prv-010)), no stable device identifiers ([SN-TEL-009](telemetry.md#sn-tel-009)), correct pasteboard/clipboard behaviour; check retention/erasure controls ([SN-PRV-006](privacy.md#sn-prv-006)/[SN-PRV-011](privacy.md#sn-prv-011)); confirm store labels/manifest match reality ([SN-PRV-016](privacy.md#sn-prv-016)); map each finding to a MASVS/MASWE id with a fix or Security-Owner risk acceptance. Produce `docs/security/verification/masvs-privacy.md`.
**Out:** authoring the privacy features themselves (the [SN-PRV-001](privacy.md#sn-prv-001) children); store-declaration authoring ([SN-PRV-014](privacy.md#sn-prv-014)/[SN-PRV-015](privacy.md#sn-prv-015)); the web ASVS pass ([SN-SEC-032](security.md#sn-sec-032)).

#### Acceptance criteria
- [ ] MASTG PRIVACY-1..4 procedures executed and recorded on the RC with evidence.
- [ ] No launch-time permission prompts; every request is in-context with rationale.
- [ ] No analytics/ad SDK, no stable identifier, no undisclosed network egress (confirmed by traffic capture).
- [ ] Retention/erasure and consent-withdrawal controls verified working.
- [ ] Every finding mapped to MASVS/MASWE with a fix or explicit risk acceptance; no unresolved high privacy finding.

#### Technical notes
Consume MobSF ([SN-CI-013](ci-cd.md#sn-ci-013)) and mobsfscan ([SN-CI-008](ci-cd.md#sn-ci-008)) SARIF; run a network capture to confirm zero pre-consent egress ([SN-TEL-010](telemetry.md#sn-tel-010)). Reference controls-matrix §1 PRIVACY + §5 M6 and threat-model TM-P-06/08.

#### Security & privacy
Threats: TM-P-06 (unawareness), TM-P-08 (cloud-AI linkage). Controls: MASVS-PRIVACY-1..4, Mobile Top 10 M6, GDPR/DPDP transparency. The mobile-side privacy assurance gate.

#### UX notes
No new UI; findings may generate fixes to consent/permission surfaces owned by [SN-PRV-001](privacy.md#sn-prv-001).

#### Test plan
Manual/assisted MASTG procedures on iOS + Android reference devices; automated pre-consent zero-egress assertion; pasteboard behaviour test; store-declaration consistency check ([SN-PRV-016](privacy.md#sn-prv-016)).

#### Dependencies
[SN-PRV-004](privacy.md#sn-prv-004), [SN-PRV-009](privacy.md#sn-prv-009), [SN-AI-019](ai.md#sn-ai-019).

#### Definition of done
- [ ] Verification report merged under docs/security/verification/.
- [ ] controls-matrix PRIVACY rows updated to Implemented/Partial with evidence.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-008

<a id="sn-gsec-008"></a>

**Harden decoded CRDT op validation from sync and collaboration peers**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, sync, collaboration |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-CORE-010](sync.md#sn-core-010), [SN-SYNC-013](sync.md#sn-sync-013), [SN-COL-004](collaboration.md#sn-col-004) |
| Security controls | `MASVS-CODE-4`, `TM-T-06`, `TM-T-02`, `TM-E-04`, `TM-D-01`, `OWASP-A08`, `ASVS-V2`, `CWE-20`, `CWE-502`, `CWE-400` |
| Extra labels | sec: threat-model, agent-ready |

#### Context
[SN-SYNC-013](sync.md#sn-sync-013) verifies that a synced segment came from a legitimate member (AEAD tags), and [SN-CRY-020](security.md#sn-cry-020) fails closed on decrypt failure — but *after* a frame is decrypted and authenticated, its decoded CBOR/op payload is still attacker-influenced input. A malicious-but-authenticated collaborator (TA7), a compromised paired device, or a subtly malformed op that passed the crypto layer can carry an unknown op-type, an out-of-range index, a self-referential tree move, an oversized string/blob reference, or a resource-exhausting structure. The document-model op registry ([SN-CORE-010](sync.md#sn-core-010)) and the collab op-frame codec ([SN-COL-004](collaboration.md#sn-col-004)) must treat decoded ops as untrusted (trust boundary TB1, threat-model DFD-A) and validate them against a schema, role and resource bounds before applying to `sane_core`.

#### Scope
**In:** a validation layer that runs on every decoded op before it reaches the CRDT reducer — strict schema validation per op-type, unknown/forbidden op-type rejection, bounds on indices/fractional keys/string lengths/nesting depth/op count per segment, cycle detection for tree moves, blob-reference existence/size caps, and (for collab) an authorization check that the peer's role ([SN-SHR-015](sharing-export.md#sn-shr-015)) permits the op; hostile or malformed ops fail closed (rejected/quarantined, no partial apply) and are counted for abuse signals ([SN-COL-019](collaboration.md#sn-col-019)); resource budgets so a flood of valid-but-huge ops cannot exhaust memory (TM-D-01/TM-D-04 adjacency).
**Out:** transport/decrypt/member integrity ([SN-SYNC-013](sync.md#sn-sync-013), [SN-CRY-020](security.md#sn-cry-020)); the abuse-floor UI/rate limits ([SN-COL-019](collaboration.md#sn-col-019)); `.sanenote` file import path ([SN-SEC-007](security.md#sn-sec-007)); CRDT convergence semantics ([SN-CORE-024](qa.md#sn-core-024)).

#### Acceptance criteria
- [ ] Every decoded op is schema-validated and bounds-checked before apply; unknown op-types are rejected.
- [ ] A hostile op (bad index, cyclic move, oversized field, over-role mutation) is rejected with no partial state change.
- [ ] Per-segment op-count/size budgets prevent memory exhaustion from authenticated peers.
- [ ] Collab ops are authorization-checked against the peer's cryptographic role.
- [ ] Rejections are counted and surfaced to the abuse-signal path without leaking content.

#### Technical notes
Add the validator in `sane_core`/`sane_sync` between decode and reduce; drive from the op-type registry ([SN-CORE-010](sync.md#sn-core-010)) and role model ([SN-SHR-015](sharing-export.md#sn-shr-015)). Fuzz with the format corpus ([SN-CORE-026](storage.md#sn-core-026)/[SN-SEC-010](security.md#sn-sec-010)). Reference threat-model DFD-A, TM-T-06, TM-E-04, MASVS-CODE-4.

#### Security & privacy
Threats: TM-T-06 (crafted payload mutates unrelated state), TM-T-02 (rollback/replay adjacency), TM-E-04 (memory-corruption via decoder), TM-D-01 (resource exhaustion). Controls: MASVS-CODE-4 (no unsafe deserialization), ASVS V2, 2025 A08 Integrity Failures, CWE-502/20/400.

#### UX notes
A rejected op is invisible to the honest user; a persistently hostile peer surfaces through the collaboration abuse controls ([SN-COL-019](collaboration.md#sn-col-019)), not an error dialog.

#### Test plan
Unit: op-schema + bounds validators with malformed fixtures. Property/fuzz: feed the fuzz corpus of decoded ops asserting no crash, no partial apply, bounded memory. Integration: a malicious-peer harness in the collab security suite ([SN-COL-022](collaboration.md#sn-col-022)).

#### Dependencies
[SN-CORE-010](sync.md#sn-core-010), [SN-SYNC-013](sync.md#sn-sync-013), [SN-COL-004](collaboration.md#sn-col-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, fuzz, security scans).
- [ ] threat-model DFD-A / TM-T-06 verification updated.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-009

<a id="sn-gsec-009"></a>

**Operationalise the per-feature security design-review gate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | security, docs |
| Size | S |
| SDLC | design |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-002](security.md#sn-sec-002), [SN-SEC-003](security.md#sn-sec-003) |
| Security controls | `OWASP-A04`, `SSDF-PW.1`, `SSDF-PW.2`, `TM-P-07`, `CWE-1053` |
| Extra labels | sec: threat-model, agent-ready |

#### Context
docs/security/ssdlc-process.md §2.2 defines a **design-phase security review gate** — walk the feature's data flow through the trust boundaries, enumerate STRIDE + LINDDUN per element, choose only approved mechanisms, name a verification for each control, and write abuse-case/negative acceptance criteria — but no issue operationalises it. [SN-SEC-002](security.md#sn-sec-002) baselines the threat model once and [SN-SEC-003](security.md#sn-sec-003) enforces the *implementation*-phase secure-coding PR gate; the *design*-phase gate that catches insecure design (OWASP A04) before code is written is missing. Without it, features reach implementation without a DFD walk or abuse cases, which is exactly the "Insecure Design" failure mode.

#### Scope
**In:** a security-design-review template (`docs/security/design-review-template.md`) and a checklist step in the ADR/issue flow for any feature that touches a trust boundary (new network call, parser, exported component, stored asset, third-party SDK, key/crypto use, WebView/bridge); require the review output (DFD walk, STRIDE/LINDDUN rows added to the threat model, chosen mechanisms, named verifications, abuse cases) to be recorded in the ADR or the issue before it moves to `sdlc: implementation`; wire a lightweight required check / CODEOWNERS expectation so a boundary-touching feature cannot skip it. Provide a worked example for one feature.
**Out:** the one-time threat-model baseline ([SN-SEC-002](security.md#sn-sec-002)); the implementation PR gate and security-triage checkbox ([SN-SEC-003](security.md#sn-sec-003)); the DPIA trigger ([SN-PRV-013](privacy.md#sn-prv-013)); the pentest/abuse-case *verification* matrix ([SN-SEC-033](security.md#sn-sec-033)).

#### Acceptance criteria
- [ ] A design-review template exists and is referenced from the ssdlc doc and the issue schema flow.
- [ ] Boundary-touching features must record a DFD walk, STRIDE/LINDDUN rows, chosen mechanisms, named verifications and abuse cases before implementation.
- [ ] A required-check/CODEOWNERS expectation enforces the gate for security-critical paths.
- [ ] One worked example review is committed.
- [ ] The gate is listed in the SSDLC design-phase exit criteria.

#### Technical notes
Reuse the threat-model row format (docs/security/threat-model.md §5/§6) and controls-matrix mechanism/verification columns. Tie the required check to the same path globs as [SN-SEC-003](security.md#sn-sec-003)/CODEOWNERS. Reference SSDF PW.1/PW.2 and SAMM Design.

#### Security & privacy
Threats: TM-P-07 (non-compliance if privacy design skipped) and the whole STRIDE set caught earlier. Controls: 2025 A06 / 2021 A04 Insecure Design, SSDF PW.1/PW.2. Shifts security left to the cheapest phase.

#### UX notes
Process/maintainer-facing; the abuse cases it produces become negative UX acceptance criteria in downstream issues.

#### Test plan
Process validation: run the template on one real feature and confirm the threat model gains the expected rows; confirm the required check blocks a boundary-touching PR whose design review is absent.

#### Dependencies
[SN-SEC-002](security.md#sn-sec-002), [SN-SEC-003](security.md#sn-sec-003).

#### Definition of done
- [ ] Template + gate merged; ssdlc doc updated.
- [ ] Worked example committed.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-011

<a id="sn-gsec-011"></a>

**Eliminate plaintext transient and temp files in capture and processing**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | security, storage, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-CRY-007](security.md#sn-cry-007), [SN-SEC-004](security.md#sn-sec-004) |
| Security controls | `MASVS-STORAGE-1`, `TM-I-03`, `TM-I-10`, `OWASP-A04`, `CWE-312`, `CWE-459`, `CWE-377` |
| Extra labels | sec: masvs, agent-ready |

#### Context
Several pipelines create intermediate artefacts that are copies of note content before they land in the encrypted store: in-progress audio recording segments and the crash-safe capture buffer ([SN-AUD-001](audio.md#sn-aud-001)), camera-scan JPEGs and auto-crop intermediates ([SN-MED-001](images-media.md#sn-med-001)/[SN-PHN-011](images-media.md#sn-phn-011)), OCR/recognition intermediates ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)), PDF rasterisation scratch, and export staging before a `.sanenote`/PDF is finalised ([SN-SHR-002](sharing-export.md#sn-shr-002)). If any of these are written to a plaintext temp/cache directory they become a side-channel readable after device compromise (TM-I-03) or captured by OS auto-backup (TM-I-10) — a plaintext leak of content the E2EE stack otherwise protects. No issue owns "no plaintext transient files" as a cross-cutting rule.

#### Scope
**In:** an audit + policy that any transient artefact holding content is written encrypted (via `sane_crypto` per-blob keys [SN-CRY-007](security.md#sn-cry-007)) or to a path excluded from backup and securely deleted (best-effort overwrite/unlink) as soon as it is consumed; a shared `SecureTempFile`/`SecureScratch` helper used by audio capture, camera scan, OCR, PDF raster and export staging; wire deletion into the error paths so a failed operation does not leave a plaintext residue (ties to [SN-GSEC-005](security.md#sn-gsec-005)); an arch/lint check flagging raw `getTemporaryDirectory`/`NSTemporaryDirectory`/`cacheDir` writes of content bytes.
**Out:** the derived *cache* stores (thumbnails/OCR/AI caches) which persist ([SN-GSEC-002](security.md#sn-gsec-002)); the encrypted blob store ([SN-CRY-007](security.md#sn-cry-007)); the input-validation gate ([SN-SEC-004](security.md#sn-sec-004)); backup exclusion of keys ([SN-SEC-023](security.md#sn-sec-023)).

#### Acceptance criteria
- [ ] Audio, camera-scan, OCR, PDF-raster and export pipelines use the secure-scratch helper; no content is written to a plaintext temp path.
- [ ] Transient artefacts are securely deleted after use and on error (no residue after a cancelled/failed op).
- [ ] Temp artefacts are excluded from OS auto-backup where they must exist on disk.
- [ ] An arch/lint rule flags raw temp/cache writes of content bytes.
- [ ] controls-matrix STORAGE-1 lists the transient-artefact handling.

#### Technical notes
Implement `SecureScratch` in `sane_core`/`sane_secure_store`; prefer streaming into the encrypted store over temp files where feasible. Coordinate deletion with the fail-closed discipline ([SN-GSEC-005](security.md#sn-gsec-005)). Reference threat-model TM-I-03/10 and checklist §9.

#### Security & privacy
Threats: TM-I-03 (local FS read of plaintext residue), TM-I-10 (backup exfiltration). Controls: MASVS-STORAGE-1, 2025 A04, CWE-312/377/459. Closes the "encrypted at rest but plaintext in /tmp" gap.

#### UX notes
No user-facing change; capture/scan/export behave identically, minus the residue.

#### Test plan
Unit: SecureScratch write/consume/delete + error-path cleanup. Integration: run audio/scan/OCR/export flows, then assert no plaintext content in temp/cache dirs and none in a backup dump (MASTG backup review). Fuzz: interrupted operations leave no residue.

#### Dependencies
[SN-CRY-007](security.md#sn-cry-007), [SN-SEC-004](security.md#sn-sec-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans).
- [ ] controls-matrix STORAGE-1 updated; arch/lint rule added.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-013

<a id="sn-gsec-013"></a>

**Add server-side anti-automation and rate limiting for services and OTP**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | security, auth, ci-cd |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-AUTH-006](auth.md#sn-auth-006), [SN-CI-018](ci-cd.md#sn-ci-018) |
| Security controls | `ASVS-V4`, `TM-S-02`, `TM-D-03`, `MASVS-AUTH-2`, `OWASP-A01`, `OWASP-A07`, `CWE-307`, `CWE-799`, `CWE-770` |
| Extra labels | sec: asvs, agent-ready |

#### Context
ASVS V4 anti-automation is not owned by any single issue. Room/relay flooding is handled by [SN-COL-019](collaboration.md#sn-col-019)/[SN-COL-023](collaboration.md#sn-col-023) and OTP is rate-limited "at the provider" ([SN-AUTH-006](auth.md#sn-auth-006)), but the general anti-automation layer for the (future) entitlement/verification service, the public "try it now" web trial ([SN-WEB-022](onboarding.md#sn-web-022)), and defence-in-depth for OTP (TM-S-02: brute force / SIM-swap probing) has no home. A stateless entitlement verifier can still be scraped or brute-forced; an open web trial can be abused to exhaust resources; provider-side OTP limits are not something we can assert in a test. This issue defines the consolidated server/edge-side controls.

#### Scope
**In:** a documented anti-automation policy and its enforcement for services and public endpoints — per-IP/per-account/per-key rate limits and connection caps on the entitlement/verification endpoints (aligned with [SN-CI-018](ci-cd.md#sn-ci-018)), exponential backoff/lockout signalling and abuse counters for OTP defence-in-depth (complementing the provider), edge/WAF-style throttling and optional bot mitigation for the web trial, and content-free abuse logging (per [SN-COL-008](collaboration.md#sn-col-008) log allow-list). Return non-punitive, graceful failures. Provide a black-box test that a burst of requests is throttled and that legitimate use is unaffected.
**Out:** room/relay rate limits ([SN-COL-019](collaboration.md#sn-col-019), [SN-COL-023](collaboration.md#sn-col-023)); provider-side OTP configuration ([SN-AUTH-006](auth.md#sn-auth-006)); the entitlement service application code ([SN-BILL-001](billing.md#sn-bill-001)); the services CI pipeline itself ([SN-CI-018](ci-cd.md#sn-ci-018)); client identity abuse tests ([SN-AUTH-019](auth.md#sn-auth-019)).

#### Acceptance criteria
- [ ] Entitlement/verification endpoints enforce per-IP/account/key rate limits and connection caps.
- [ ] OTP has documented defence-in-depth (backoff/lockout + abuse counters) beyond the provider; TM-S-02 abuse case exercised.
- [ ] The public web trial is throttled against automated abuse without breaking legitimate first-use.
- [ ] Abuse logs are content-free and honour the log allow-list.
- [ ] A black-box test shows bursts are throttled and normal use is unaffected.

#### Technical notes
Implement in the services layer with a shared limiter; front with edge throttling where hosting allows ([SN-COL-023](collaboration.md#sn-col-023) hosting decision). Reference ASVS V4, threat-model TM-S-02/TM-D-03 and controls-matrix §3 V4.

#### Security & privacy
Threats: TM-S-02 (OTP brute force / SIM-swap probing), TM-D-03 (service flood). Controls: ASVS V4 anti-automation, MASVS-AUTH-2, 2025 A07 Authentication Failures, CWE-307/799/770. Note zero-knowledge means account takeover still yields no plaintext (TM-S-02).

#### UX notes
Throttled users see a friendly "try again shortly" message, never a hard punitive block; legitimate first-run on the web trial is unaffected.

#### Test plan
Integration/black-box: burst tests against entitlement/trial endpoints assert throttling; OTP abuse-case test asserts backoff/lockout; assert legitimate-rate traffic passes; assert logs contain no PII/content.

#### Dependencies
[SN-AUTH-006](auth.md#sn-auth-006), [SN-CI-018](ci-cd.md#sn-ci-018).

#### Definition of done
- [ ] Code/config + tests merged, CI green.
- [ ] Policy documented; controls-matrix §3 V4 updated.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GWEB-005

<a id="sn-gweb-005"></a>

**Self-host and integrity-pin the Flutter web engine artifacts instead of the default CDN**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | security, compat, perf |
| Size | S |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-002](compat.md#sn-web-002), [SN-WEB-015](security.md#sn-web-015), [SN-WEB-016](security.md#sn-web-016) |
| Security controls | `MASVS-CODE-2`, `CWE-1104`, `OWASP-A08`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context

By default, a Flutter web build does not serve its own engine: `flutter_bootstrap.js` fetches the CanvasKit WASM/JS payload from Google's `gstatic.com` CDN at runtime. That single default quietly breaks four of our own rules at once. (1) **Privacy:** every first load makes a third-party request from a user's browser to Google, which contradicts the no-third-party-request posture the product promises (`PRD-PRIV-007`, and the same rule [SN-SITE-014](website.md#sn-site-014) enforces on the marketing origin). (2) **Cross-origin isolation:** under `COEP: require-corp` every cross-origin subresource must send CORP/CORS ([SN-WEB-015](security.md#sn-web-015)) — a CDN we do not control is exactly the dependency that breaks isolation, and therefore skwasm and whisper threads. (3) **Supply chain:** an engine payload fetched by URL at runtime is unpinned executable code; the secure-coding checklist §6.2 requires SRI or self-hosting for external subresources ([SN-WEB-016](security.md#sn-web-016)). (4) **Offline:** the service worker cannot precache an origin it does not serve ([SN-WEB-011](compat.md#sn-web-011)), so the "installable, fully offline" gate in `docs/platform/web.md` §8 fails on a cold cache without network. [SN-WEB-002](compat.md#sn-web-002) builds the dual renderer and [SN-WEB-015](security.md#sn-web-015)/[SN-WEB-016](security.md#sn-web-016) set the headers, but no issue actually names this default or removes it.

#### Scope

**In:** configuring the build so CanvasKit **and** skwasm artifacts are emitted to and served from the app origin (`--no-web-resources-cdn` or the equivalent bootstrap configuration for the pinned Flutter version), with content hashes recorded in a checked-in manifest; a CI step that fails the build if any engine or font asset URL points off-origin; SRI/`Integrity-Policy` coverage for them ([SN-WEB-016](security.md#sn-web-016)); precache entries for the engine payload in the service worker ([SN-WEB-011](compat.md#sn-web-011)); CORP headers on the served artifacts; an SBOM entry for the engine artifacts ([SN-CI-004](ci-cd.md#sn-ci-004)); and the same treatment for any other WASM we load (SQLite, PDFium, whisper, recogniser) so the rule is uniform.

**Out:** the renderer selection logic itself ([SN-WEB-002](compat.md#sn-web-002)), header definitions ([SN-WEB-015](security.md#sn-web-015), [SN-WEB-016](security.md#sn-web-016)), hosting/CDN provisioning ([SN-WEB-017](ci-cd.md#sn-web-017)), and the bundle-size budget ([SN-WEB-003](perf.md#sn-web-003)).

#### Acceptance criteria

- [ ] A network capture of a first, cold, uncached load of the production build shows requests to the **app origin only** — zero requests to `gstatic.com`, `googleapis.com` or any other host (`PRD-PRIV-007`).
- [ ] Both renderer paths work fully offline after install: with the network disabled, a fresh browser profile that has visited once can open the app and draw.
- [ ] Every engine/WASM artifact is served with `Cross-Origin-Resource-Policy: same-origin` and is covered by SRI or `Integrity-Policy`; `self.crossOriginIsolated` remains true with the engine loaded ([SN-WEB-015](security.md#sn-web-015)).
- [ ] A checked-in `web/engine-manifest.json` records artifact names, sizes and SHA-384 hashes for the pinned Flutter version; CI regenerates it and fails on drift (so an engine bump is a reviewed change, MASVS-CODE-1).
- [ ] A CI assertion scans the built output for absolute off-origin URLs in HTML/JS/WASM loaders and fails the build on any hit.
- [ ] The engine payload appears in the release SBOM with version and hash ([SN-CI-004](ci-cd.md#sn-ci-004)).
- [ ] Cold-start B6 (< 3 s cached) is unchanged or better, measured by [SN-WEB-024](perf.md#sn-web-024); first-uncached load is reported.

#### Technical notes

Pin the Flutter version in CI ([SN-WEB-002](compat.md#sn-web-002)) so the engine hashes are deterministic; store artifacts under the immutable `/b/<buildId>/` path from [SN-REL-008](release.md#sn-rel-008) with `max-age=31536000, immutable`, while `flutter_bootstrap.js` stays `no-cache`. Compression (Brotli) is configured at the edge ([SN-WEB-017](ci-cd.md#sn-web-017)). If a future Flutter release changes the bootstrap mechanism, the CI off-origin scan is the backstop that catches it. Record the decision as an amendment note in `docs/adr/0010-web-pwa-strategy.md` §"Security impact".

#### Security & privacy

This is a supply-chain control first (MASVS-CODE-2, OWASP-A08, SSDF-PS.2): runtime-fetched, unpinned executable code from a third party is the classic CDN-compromise path (CWE-1104, CWE-494), and self-hosting plus hashes removes both the trust dependency and the SRI gap. It is a privacy control second: a third-party fetch from the user's browser reveals IP, User-Agent and timing to a party the privacy dashboard does not list (MASVS-PRIVACY-1, `PRD-PRIV-001`). It is an availability control third: an offline-first note app must not need a CDN to start. No user data is involved; no new logging is added.

#### UX notes

None visible beyond a faster, network-independent start. The Settings → About → Diagnostics panel gains two read-only rows (renderer in use, engine build hash) so support can answer "which engine are you running" without any identifier ([SN-TEL-008](telemetry.md#sn-tel-008)).

#### Test plan

- `app/test/build/no_offorigin_urls_test.dart` (or a `tools/scripts/check_offorigin.mjs` CI step) — scan build output for off-origin URLs.
- `tools/scripts/post_deploy_check.mjs` — assert CORP headers and hash match on engine artifacts.
- `app/integration_test/web/offline_cold_boot_test.dart` — install, go offline, relaunch, draw.
- Manual: Safari iPadOS and Firefox cold-load captures attached to the release checklist.

#### Dependencies

[SN-WEB-002](compat.md#sn-web-002) (dual renderer build and pinned toolchain), [SN-WEB-015](security.md#sn-web-015) (COEP/CORP), [SN-WEB-016](security.md#sn-web-016) (SRI/Integrity-Policy). Feeds [SN-WEB-011](compat.md#sn-web-011) (precache) and [SN-CI-004](ci-cd.md#sn-ci-004) (SBOM).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GWEB-010

<a id="sn-gweb-010"></a>

**Define the browser cross-origin access policy for the relay and entitlement services**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | web |
| Areas | security, collaboration, billing |
| Size | M |
| SDLC | design |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-COL-007](collaboration.md#sn-col-007), [SN-WEB-017](ci-cd.md#sn-web-017), [SN-CI-018](ci-cd.md#sn-ci-018) |
| Security controls | `OWASP-A01`, `OWASP-A05`, `CWE-346`, `CWE-352`, `ASVS-V13` |
| Extra labels | agent-ready, sec: asvs |

#### Context

The web client is the only surface where our two services — the ciphertext-only collaboration relay ([SN-COL-007](collaboration.md#sn-col-007)) and the entitlements endpoint ([SN-BILL-009](billing.md#sn-bill-009)) — are called from inside a browser, which means they are reachable from **any** website the user visits, not just ours. The browser's protections here are partly absent by default: CORS governs `fetch`/XHR but **not WebSocket handshakes**, so a relay that accepts any `Origin` is open to cross-site WebSocket hijacking (CSWSH) from an attacker page; a token-bearing endpoint without an explicit CORS policy either breaks the app or, if set to `Access-Control-Allow-Origin: *` with credentials, leaks. [SN-WEB-015](security.md#sn-web-015) covers isolation of *our page* and [SN-WEB-016](security.md#sn-web-016) covers response headers on the **app origin**; [SN-COL-008](collaboration.md#sn-col-008) enforces that the relay stores no plaintext. No issue defines what the **services** accept from a browser. `docs/security/secure-coding-checklist.md` §4 and ASVS 5.0 L2 (decision 8) require this to be explicit.

#### Scope

**In:** a written cross-origin access policy, implemented and tested in `services/relay` and `services/entitlements`: an explicit `Origin` allow-list (production app origin, preview deploys, `localhost` in dev only) enforced on **both** HTTP requests and the **WebSocket upgrade handshake**; `Access-Control-Allow-Origin` echoed only for allow-listed origins with `Vary: Origin`, never `*` alongside credentials; a documented preflight surface (allowed methods, headers, `Access-Control-Max-Age`); a **no-cookies** rule (bearer tokens in `Authorization` only, so CSRF is structurally impossible); per-origin and per-token rate limits; connection caps per room and per IP; and CI assertions in the services pipeline ([SN-CI-018](ci-cd.md#sn-ci-018)) that a request from a foreign `Origin` is rejected at both entry points.

**Out:** the relay protocol and frame schema ([SN-COL-003](collaboration.md#sn-col-003), [SN-COL-007](collaboration.md#sn-col-007)), the relay invariant tests ([SN-COL-008](collaboration.md#sn-col-008)), app-origin response headers ([SN-WEB-016](security.md#sn-web-016)), TLS/hosting ([SN-WEB-017](ci-cd.md#sn-web-017)), and membership authentication itself ([SN-COL-006](collaboration.md#sn-col-006)).

#### Acceptance criteria

- [ ] A WebSocket upgrade carrying a non-allow-listed `Origin` is rejected with a 403 before any room state is touched, proven by an automated test that impersonates an attacker page (CSWSH, CWE-346).
- [ ] A cross-origin `fetch` to every entitlements and relay HTTP route from a foreign origin fails preflight; the response never contains `Access-Control-Allow-Origin: *` together with credentials.
- [ ] `Vary: Origin` is set on every CORS response so a shared cache cannot serve one origin's policy to another (CWE-524).
- [ ] No service sets or reads a cookie; authentication is a bearer token supplied by the client, so no CSRF token is needed and none is invented (CWE-352 addressed by design, documented).
- [ ] Rate limits and connection caps are enforced per token, per room and per IP, with a documented 429/close-code contract the client handles gracefully ([SN-COL-005](collaboration.md#sn-col-005) reconnect).
- [ ] The allow-list is configuration, not code, and dev/preview origins cannot be present in a production deployment — asserted by a startup check that fails closed.
- [ ] Requests and upgrades are logged as connection metadata only (no tokens, no room secrets, no fragments), matching [SN-COL-023](collaboration.md#sn-col-023)'s log allow-list.
- [ ] The policy is written up in `docs/security/` and referenced from the ASVS verification worksheet ([SN-SEC-032](security.md#sn-sec-032)).

#### Technical notes

Implement as one shared middleware in `services/` so both services cannot drift. Validate `Origin` on the upgrade request explicitly — do not rely on the browser. Keep the allow-list in the service config emitted by the same source as the app-origin constant used by [SN-WEB-017](ci-cd.md#sn-web-017) so a domain change updates both. Preview deploys get their own short-lived origins; the check must accept a pattern, not a wildcard suffix that a look-alike domain could satisfy (`app.sane.example.evil.com` must fail). Pair with the DAST job ([SN-CI-012](ci-cd.md#sn-ci-012)) so ZAP exercises the cross-origin cases.

#### Security & privacy

Threats: **cross-site WebSocket hijacking** — an attacker page opening a relay socket with a victim's ambient credentials (CWE-346, OWASP-A01); **over-permissive CORS** leading to cross-origin read of entitlement or session data (OWASP-A05, CWE-942); **cache confusion** from a missing `Vary` (CWE-524); **abuse/DoS** of a service that must stay cheap and stateless (CWE-400, TM-D-03). Controls: strict origin allow-listing on both protocols, no cookies (so no ambient authority), token-scoped rate limits, fail-closed configuration, and metadata-only logging (CWE-532, MASVS-PRIVACY-1). The relay still sees only ciphertext ([SN-COL-008](collaboration.md#sn-col-008)) — this issue stops an attacker from *reaching* it, which is the ASVS V13 configuration requirement.

#### UX notes

No user-facing surface. Client-visible effects are error semantics: a rejected connection surfaces as "Can't reach the session — retry" in the collaboration UI ([SN-COL-010](collaboration.md#sn-col-010)), and a rate-limited entitlement check falls back to the cached entitlement rather than blocking the app ([SN-BILL-009](billing.md#sn-bill-009)). Both messages avoid technical detail and never expose an origin or token.

#### Test plan

- `services/test/cors_policy_test.*` — allow-listed vs foreign origin, preflight matrix, `Vary`, no-wildcard-with-credentials, look-alike domain rejection.
- `services/test/ws_origin_test.*` — upgrade rejection, close codes, per-origin rate limit.
- `services/test/config_failclosed_test.*` — production config containing a dev origin fails startup.
- CI: [SN-CI-018](ci-cd.md#sn-ci-018) pipeline gate; [SN-CI-012](ci-cd.md#sn-ci-012) ZAP active scan cases for CORS/WS.

#### Dependencies

[SN-COL-007](collaboration.md#sn-col-007) (relay), [SN-WEB-017](ci-cd.md#sn-web-017) (app origin constant), [SN-CI-018](ci-cd.md#sn-ci-018) (services pipeline). Verified by [SN-SEC-032](security.md#sn-sec-032) and [SN-CI-012](ci-cd.md#sn-ci-012).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GWEB-011

<a id="sn-gweb-011"></a>

**Collect CSP, COEP and Trusted Types violation reports without third parties**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | security, telemetry, privacy |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-WEB-014](security.md#sn-web-014), [SN-WEB-015](security.md#sn-web-015), [SN-TEL-003](telemetry.md#sn-tel-003) |
| Security controls | `OWASP-A09`, `CWE-532`, `MASVS-PRIVACY-1`, `ASVS-V16` |
| Extra labels | agent-ready |

#### Context

[SN-WEB-014](security.md#sn-web-014) builds the strict nonce CSP and Trusted Types and explicitly leaves one thing open: "a report-only rollout stage with **a collection endpoint decision**". [SN-WEB-015](security.md#sn-web-015) has the same shape for COOP/COEP — it mandates a `-Report-Only` stage but not where the reports go. Without a collector, "report-only" is a slogan: violations are visible only in a developer's console, so we ship a policy whose real-world breakage we have never measured, and after launch an active DOM-XSS attempt or a broken third-party asset produces no signal at all. The decision is genuinely constrained by our own rules: telemetry is **opt-in and content-free** (ADR-0011, `PRD-PRIV-007`), we link no third-party analytics, and CSP reports are notorious for carrying URLs — which in our app can contain note ids and, if we are careless, share-link fragments (TM-I-09). So the collector must be first-party, sampled, redacting, and privacy-reviewed. This issue makes that decision and implements it.

#### Scope

**In:** a decision recorded in `docs/security/` and ADR-0010 on where reports go; a minimal first-party report sink on the app origin's infrastructure ([SN-WEB-017](ci-cd.md#sn-web-017)) reachable via `report-to`/`Reporting-Endpoints` (with legacy `report-uri` for older browsers); a **strict server-side redactor** that drops or truncates `document-uri`, `referrer`, `blocked-uri` query strings and fragments, and discards any report whose fields exceed size caps; per-deploy sampling and rate limiting so a noisy extension cannot flood the sink; retention limits (≤ 30 days) and access control; a triage runbook and a weekly review during the report-only rollout; a Report-Only → enforce promotion checklist; and a documented rule that violation reporting is **not** analytics and is therefore exempt from telemetry consent only because it carries no user or device identifier — validated with the privacy reviewer ([SN-PRV-009](privacy.md#sn-prv-009)).

**Out:** the CSP and Trusted Types policies themselves ([SN-WEB-014](security.md#sn-web-014)), COOP/COEP rollout ([SN-WEB-015](security.md#sn-web-015)), the app telemetry pipeline ([SN-TEL-001](telemetry.md#sn-tel-001)), and the marketing site's headers ([SN-SITE-013](website.md#sn-site-013)).

#### Acceptance criteria

- [ ] `Reporting-Endpoints` + `report-to` are set on the app origin, with `Content-Security-Policy-Report-Only` during rollout and enforcement after the review.
- [ ] Every stored report is redacted: URLs keep origin + path shape only (ids replaced by a placeholder), query strings and fragments are dropped **before** persistence, and a fuzz test proves a synthetic report containing a `#k=…` fragment, an email address or a note title is stored without them (TM-I-09, CWE-200).
- [ ] Reports carry **no** cookie, no device or install identifier, and no IP beyond what the edge already logs under [SN-WEB-017](ci-cd.md#sn-web-017)'s retention policy.
- [ ] Sampling and rate limiting are in place (documented default, configurable per deploy); a flood of 10,000 reports/minute costs bounded storage and never affects app availability.
- [ ] A triage runbook exists with three outcomes — our bug, an extension/user-agent artefact, or a genuine attack signal — and the report-only rollout is signed off with a written breakage summary before enforcement.
- [ ] Retention is ≤ 30 days with documented access control; the privacy dashboard text lists violation reporting and says exactly what it contains ([SN-PRV-002](privacy.md#sn-prv-002)).
- [ ] A CI check asserts the reporting headers exist and point at the first-party endpoint in every environment ([SN-WEB-016](security.md#sn-web-016) header spec).

#### Technical notes

Keep the sink boring: a single endpoint accepting `application/reports+json` and `application/csp-report`, writing redacted records to short-retention storage, deployed with the rest of `services/` under its DevSecOps pipeline ([SN-CI-018](ci-cd.md#sn-ci-018)). Redaction runs server-side because the browser composes the report, not us. Expect noise: browser extensions and injected content generate large volumes of irrelevant violations — the runbook must say so, and the sampling defaults assume it. Reference `docs/security/secure-coding-checklist.md` §6.2, `research/web-stylus-and-pwa-capabilities.md` §10 and ADR-0010's security-impact section.

#### Security & privacy

This is a detective control for **OWASP A03 (injection/DOM-XSS)** and **A08 (integrity failures)**: a spike in `script-src` violations is often the first evidence of an injection attempt or a compromised subresource, and COEP reports tell us when a subresource silently breaks isolation (and therefore skwasm/whisper). The control's own risk is privacy: report bodies are attacker- and browser-influenced input (validate and bound them — CWE-20, CWE-400) and can carry sensitive URL material (CWE-200, CWE-598, MASVS-PRIVACY-1). Logging discipline follows checklist §7: no content, no identifiers, structured fields with an allow-list, short retention (ASVS V16). The endpoint is unauthenticated by necessity, so it must be write-only, cheap, and incapable of influencing app behaviour.

#### UX notes

Invisible to users. One line in the privacy dashboard "What leaves this device" panel ([SN-PRV-002](privacy.md#sn-prv-002)): browser-generated security violation reports, what they contain, and that they carry no identifier — written in the same plain voice as the rest of that screen. No consent prompt is added; if the privacy review concludes one is required, the feature ships disabled until it exists.

#### Test plan

- `services/test/report_redaction_test.*` — fuzz corpus of reports containing fragments, tokens, emails, titles and oversized fields; assert stored output is clean and bounded.
- `services/test/report_ratelimit_test.*` — flood behaviour and sampling.
- `app/integration_test/web/reporting_headers_test.dart` — headers present and correct per environment.
- Manual: deliberate violation (inline script injected in a test build) appears in the sink, redacted, within one minute; recorded in the rollout summary.

#### Dependencies

[SN-WEB-014](security.md#sn-web-014) (CSP/Trusted Types), [SN-WEB-015](security.md#sn-web-015) (COOP/COEP rollout), [SN-WEB-017](ci-cd.md#sn-web-017) (origin + logging policy), [SN-TEL-003](telemetry.md#sn-tel-003) (redaction patterns to reuse). Reviewed with [SN-PRV-009](privacy.md#sn-prv-009).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-IPAD-020

<a id="sn-ipad-020"></a>

**Handle Universal Links and associated domains landing in view or confirm**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | security, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-CODE-4`, `CWE-601`, `OWASP-A01` |
| Extra labels | agent-ready, needs-credentials |

#### Context
Deep links are a classic mobile vuln class: only verified deep links (Universal Links) may be honoured, and a link MUST land in a view/confirm context and never auto-mutate state (CLAUDE.md §7.8; docs/platform/ipad.md §8; ADR-0012 security impact, MASVS-PLATFORM). This issue implements Universal Links for opening a shared note/page on iPad/iPhone with a verified associated domain.

#### Scope
**In:** associated-domains entitlement + `apple-app-site-association` wiring; handle inbound Universal Links to open a note/page in a view/confirm screen; reject unverified/custom-scheme links; keep any share key in the URL fragment (never sent to a server); a not-found/permission-denied safe state.
**Out:** the share-link creation/roles semantics (SN-SHR area, M6); Quick Note linking ([SN-IPAD-014](notifications.md#sn-ipad-014)); Files import ([SN-IPAD-019](sharing-export.md#sn-ipad-019)).

#### Acceptance criteria
- [ ] A verified Universal Link opens the target note/page in a view/confirm screen; it never auto-mutates or auto-accepts anything (abuse test: a forged link cannot change state).
- [ ] Custom-scheme / unverified links are ignored (no implicit trust of incoming URLs).
- [ ] Any share key stays in the URL fragment and is never logged or transmitted to a Sane Notes service.
- [ ] An invalid/expired/unauthorized link lands in a safe error, not a crash or an open redirect (CWE-601).
- [ ] A locked note requires unlock before the linked content is shown.

#### Technical notes
Associated Domains entitlement; `NSUserActivity` continuation for `applinks:`; validate the URL host/path/signature before acting (ADR-0012). Routing via go_router (ADR-0003). The associated domain, Apple Team ID and AASA hosting are maintainer-supplied (needs-credentials) and injected via CI, never committed. Reference docs/platform/ipad.md §8, docs/security/secure-coding-checklist.md deep-link rule.

#### Security & privacy
Verified links only (MASVS-PLATFORM-3); treat every inbound URL as untrusted input and validate before use (MASVS-CODE-4); no open redirect (CWE-601); land in view/confirm, never auto-mutate (OWASP-A01 broken access control). Share key in the fragment only; no content/tokens/paths in logs.

#### UX notes
Link-landing view/confirm screen per docs/design/screens-and-flows.md sharing flows; render in all 17 looks + light/dark. Accessible confirm dialog (Semantics, 44 pt, contrast); the error/expired state uses the standard pattern; a locked target shows the unlock gate.

#### Test plan
Unit/abuse: `app/test/security/universal_link_test.dart` (forged/unverified link cannot mutate; fragment key never logged; not-found safe). Integration: `app/integration_test/universal_link_open_test.dart` via `patrol` (verified link opens confirm screen).

#### Dependencies
[SN-LIB-002](library.md#sn-lib-002) library / note identity; share-link semantics from [SN-SHR-001](sharing-export.md#sn-shr-001) (referenced, lands M6).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; threat model updated for the deep-link boundary
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review (deep-link handler is security-critical)

---

### SN-PHN-015

<a id="sn-phn-015"></a>

**Harden phone capture entry points against lock-state and guest leakage**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | security, privacy, notifications |
| Size | M |
| SDLC | verification |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-013](notifications.md#sn-phn-013), [SN-PHN-014](notifications.md#sn-phn-014), [SN-CRY-002](security.md#sn-cry-002), [SN-SEC-002](security.md#sn-sec-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `MASVS-AUTH-2`, `MASVS-PRIVACY-2`, `MASVS-STORAGE-2`, `CWE-200`, `CWE-926` |
| Extra labels | agent-ready |

#### Context
Widgets, Control Center controls, Quick Settings tiles, share extensions and shortcuts all render or accept Sane Notes data **outside the app process and, in several cases, on a locked device**. PRD-CO-277 states the rule: widgets and shortcuts MUST respect guest mode and lock state, they never reveal note content on a locked device beyond what the OS permits, and Quick Note into a locked or biometric-gated profile prompts to unlock. PRD-03 §12 adds per-notebook and per-folder lock (PRD-LOCK-005) and locked-content behaviour — exclusion from search, previews and sharing (PRD-LOCK-006) — and §13 adds the clipboard/screenshot deterrents (PRD-LEAK-001/002).

[SN-PHN-013](notifications.md#sn-phn-013) and [SN-PHN-014](notifications.md#sn-phn-014) build these entry points; this issue is the dedicated hardening and verification pass across all of them, because the failure mode is silent: a widget that leaks a notebook title on a lock screen looks exactly like a working widget. It is p0 because it is an information-disclosure control on the product's core privacy promise, and it is a verification-stage issue that produces abuse tests the pipeline keeps running.

#### Scope
**In:** a single `EntryPointGuard` that every external entry point must pass through, lock-state and profile-lock detection, the redaction policy for out-of-process snapshots, the unlock prompt on capture into a locked profile, clipboard and task-snapshot protections applied consistently to these surfaces, the negative/abuse test suite, and the threat-model rows for the new boundary.
**Out:** building the widgets and share targets themselves ([SN-PHN-013](notifications.md#sn-phn-013), [SN-PHN-014](notifications.md#sn-phn-014)), the key hierarchy and biometric gate ([SN-CRY-002](security.md#sn-cry-002)), and the general app-lock feature (PRD-03 `LOCK`, identity/settings areas).

#### Acceptance criteria
- [ ] Every external entry point (home widget, lock-screen widget, Control Center control, Quick Settings tile, share extension, file handler, app shortcut, Siri/Assistant intent, deep link) routes through one guard; a test enumerates the entry points and fails if any bypasses it.
- [ ] On a locked device, no widget or control renders a notebook title, page thumbnail, transcript fragment or any note-derived string — only the redacted placeholder.
- [ ] Quick Note into a locked or biometric-gated profile prompts to unlock before the page is shown, and the unlock prompt itself reveals no content (PRD-CO-277).
- [ ] Locked notebooks and folders are excluded from the widget snapshot, from Direct Share targets and from shortcut suggestions (PRD-LOCK-006).
- [ ] In guest mode every entry point still works and never prompts for sign-in; a guest device exposes no account-derived data.
- [ ] The out-of-process snapshot is encrypted with a `sane_secure_store` key and contains only allow-listed fields; a test asserts the file is not readable as plaintext.
- [ ] The task-switcher snapshot and screen recording are deterred for protected content across all these surfaces (`FLAG_SECURE` on Android; capture-blur on `UIScreen.capturedDidChangeNotification` on iOS), and the UI never claims this is unbreakable (PRD-LEAK-002).
- [ ] Clipboard content copied from a protected notebook is marked sensitive where the platform supports it and is cleared per the `LEAK` policy (PRD-LEAK-001).
- [ ] An unverified or forged deep link cannot reach a mutating route; it lands in view/confirm (CLAUDE.md §7.8).
- [ ] Sign-out, profile delete and account deletion clear every out-of-process artefact within one refresh cycle, verified by test.

#### Technical notes
Add `app/lib/security/entry_point_guard.dart` with a sealed `EntryPoint` type so adding a new entry point without a guard decision is a compile error (Dart 3 exhaustive switch; CLAUDE.md §6). Lock state comes from the platform through `plugins/sane_secure_store` (biometric gate, Keychain/Keystore) — never inferred from app lifecycle alone. The redaction policy is data, not code: a single allow-list constant shared by the widget snapshot writer ([SN-PHN-013](notifications.md#sn-phn-013)) and the Direct Share/shortcut publishers ([SN-PHN-014](notifications.md#sn-phn-014)). Record the new trust boundary and its data flows in `docs/security/threat-model.md` and the control mappings in `docs/security/controls-matrix.md` in the same PR (CLAUDE.md §5 DoD). CODEOWNERS review is required because this touches `/docs/security/` and the auth/crypto-adjacent paths.

#### Security & privacy
The threats are the reason for the issue. **T-LOCKSCREEN-DISCLOSURE** (STRIDE: information disclosure; LINDDUN: disclosure of information): note-derived strings visible without authentication — control: redaction placeholder gated on platform lock state, verified by abuse test (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200). **T-SANDBOX-ESCAPE-BY-SHARING**: the App Group / widget datastore is shared storage — control: encrypt the snapshot, minimise fields, rotate the key with the profile key (MASVS-STORAGE-2, MASVS-CRYPTO-1, CWE-312, CWE-922). **T-AUTH-BYPASS-BY-ENTRY-POINT**: an entry point that lands past the profile lock — control: the guard forces the unlock prompt, and the existing three-layer dev-bypass protection is unchanged and untouched (CLAUDE.md §7.5; MASVS-AUTH-2, ASVS V3). **T-LINK-FORGERY**: a crafted link or intent driving a mutation — control: verified links only, view/confirm landing (MASVS-PLATFORM-1, CWE-926). **T-RESIDUE**: artefacts surviving sign-out — control: explicit teardown on sign-out/delete (MASVS-PRIVACY-4, CWE-459). Baseline: no content or tokens in logs.

#### UX notes
The redacted widget state must look intentional: brand mark, the accent colour from docs/design/tokens.json, and the line 'Unlock to see your notebooks' in the ux-principles.md §5 voice — plain, no alarm, no exclamation mark. The unlock prompt reuses the platform biometric sheet plus the app's own fallback, and on cancel returns the user to where they were with a neutral toast, never an error-styled one (§4.3). Because these surfaces are OS-styled they do not carry the 17 looks, but any in-app surface this issue touches (the unlock screen, the confirm screen) must render correctly in all 17 looks and dark mode. a11y: the redacted state has an accessible description that says the content is hidden until unlock; the unlock prompt is screen-reader and Switch/Voice Control reachable (PRD-CO-332); all targets meet the platform minimum.

#### Test plan
- `app/test/security/entry_point_guard_test.dart` — enumerates every `EntryPoint` case and asserts a guard decision exists for each (compile-time plus runtime coverage).
- `app/test/security/widget_redaction_test.dart` — locked device and locked profile yield zero note-derived strings (abuse test).
- `app/test/security/locked_notebook_exclusion_test.dart` — locked notebooks absent from snapshot, Direct Share and shortcuts.
- `app/test/security/entry_point_signout_teardown_test.dart` — sign-out clears all out-of-process artefacts (regression test).
- `app/test/security/deep_link_forgery_test.dart` — forged link cannot mutate state (negative test).
- `app/integration_test/phone_locked_device_test.dart` — patrol run on a locked device profile across widget, tile, share and shortcut.
- Manual: MobSF run over the release-candidate APK/IPA checking exported components and the App Group container contents (docs/security/devsecops-pipeline.md).

#### Dependencies
[SN-PHN-013](notifications.md#sn-phn-013), [SN-PHN-014](notifications.md#sn-phn-014), [SN-CRY-002](security.md#sn-cry-002), [SN-SEC-002](security.md#sn-sec-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/security/threat-model.md and docs/security/controls-matrix.md updated with the external-entry-point boundary
- [ ] CODEOWNERS security review completed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-001

<a id="sn-sec-001"></a>

**Security engineering: threat-model actions, input hardening, MASVS/ASVS verification**

| Field | Value |
|---|---|
| GitHub | #24 |
| Type | epic |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security, privacy |
| Size | XL |
| SDLC | verification |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-1`, `MASVS-AUTH-3`, `MASVS-NETWORK-1`, `MASVS-NETWORK-2`, `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PLATFORM-3`, `MASVS-CODE-4`, `MASVS-RESILIENCE-1`, `MASVS-RESILIENCE-3`, `MASVS-RESILIENCE-4`, `MASVS-PRIVACY-1`, `ASVS-V1`, `ASVS-V3`, `ASVS-V13`, `OWASP-A01`, `OWASP-A05` |
| Extra labels | agent-ready |

#### Context
Sane Notes promises "UX first, then security first" and its payload is entirely user-authored personal content, so information disclosure (STRIDE-I) and every LINDDUN privacy category are first-class threats (docs/security/threat-model.md §0, §5.4). This epic is the home for **security engineering** that is not owned by another epic: turning every threat-model row (`TM-*`) into an implemented, tested control; hardening every parser and untrusted-input path; validating deep links; locking down WebView/web policy; clipboard/screenshot/app-lock leak protections; secure logging; the MASVS-RESILIENCE posture; certificate pinning; secure defaults; and the M7 MASVS 2.x L2+R / ASVS 5.0 L2 verification, penetration test, incident-response runbook and vulnerability-disclosure program. It operationalises docs/security/secure-coding-checklist.md, docs/security/controls-matrix.md and docs/security/ssdlc-process.md. Crypto key management ([SN-CRY-001](security.md#sn-cry-001)) and the CI scanner jobs ([SN-CI-001](ci-cd.md#sn-ci-001)) are owned elsewhere and only referenced here.

#### Scope
**In:** threat-model baseline + PR-gate enforcement; input-validation framework and per-parser hardening (PDF/image/audio/font/.sanenote) plus fuzzing; deep link / App Links / Universal Links validation; exported-component and WebView/web hardening; clipboard/screenshot/app-lock protections; secure logging; network transport security (TLS/cleartext/pinning); backup exclusion; secure defaults; anti-tamper/resilience; MASVS/ASVS verification; pentest planning + remediation; security regression suite; incident response; disclosure program.
**Out:** crypto primitives and key hierarchy ([SN-CRY-001](security.md#sn-cry-001)); OIDC/token handling ([SN-AUTH-001](auth.md#sn-auth-001)); CI scanner jobs, SBOM, provenance ([SN-CI-001](ci-cd.md#sn-ci-001)); privacy dashboard UI and store labels ([SN-PRV-001](privacy.md#sn-prv-001)); sync metadata minimisation internals ([SN-SYNC-001](sync.md#sn-sync-001)).

#### Acceptance criteria
- [ ] Every child issue below is delivered, each with its named verification test and threat-model IDs.
- [ ] Every `TM-*` row owned by security engineering moves from Designed to Implemented with a CI-enforced test.
- [ ] M7 exit gate holds: no unresolved high MASVS/Mobile-Top-10 (MobSF) or high/medium web (ZAP) findings; parser fuzzing clean; pentest P0/P1 fixed or risk-accepted by the Security Owner (docs/roadmap.md M7).
- [ ] The three gate rules (no secrets, no PII in logs, no boundary violations) are enforced and tested.

#### Technical notes
Traceability spine: docs/security/controls-matrix.md maps each control to a package owner and a verification. Children touch `packages/sane_core` (input guard, SaneLog), `packages/sane_pdf`, `packages/sane_audio`, `app/`, `plugins/*`, `website/`, and `app/test/security/`. Follow docs/security/ssdlc-process.md phase gates. ADRs: docs/adr/0004-local-first-zero-server.md, docs/adr/0012-native-plugin-strategy.md.

#### Security & privacy
This epic **is** the security surface. Threats: the whole docs/security/threat-model.md register (TM-S/T/R/I/D/E-*, TM-P-*). Controls: MASVS 2.x L2+R, ASVS 5.0 L2, OWASP Top 10 2021+2025, Mobile Top 10 2024, NIST SSDF, GDPR/DPDP/COPPA (docs/security/controls-matrix.md).

#### UX notes
Security must be invisible in the happy path and honest in the exceptional path: user-safe `Failure` messages (never a stack trace or internal path), the "data leaves device" banner before any cloud egress, and consent in-context. Surfaces touched: Editor, Import PDF overlay, Share overlay, Settings (design/Sane Notes.dc.html; docs/design/screens-and-flows.md). All error/empty/offline states covered by children.

#### Test plan
Aggregate: `app/test/security/` suite, parser fuzz corpora under `packages/*/test/fuzz/`, golden/UI tests for leak protections, ZAP/MobSF verification runs. Each child names its own files.

#### Dependencies
Spans M0–M8; children carry their own `depends_on`. Cross-epic: [SN-CRY-001](security.md#sn-cry-001), [SN-AUTH-001](auth.md#sn-auth-001), [SN-CI-001](ci-cd.md#sn-ci-001), [SN-PRV-001](privacy.md#sn-prv-001), [SN-SYNC-001](sync.md#sn-sync-001).

### Children
- [ ] [SN-SEC-002](security.md#sn-sec-002) Threat model baseline review
- [ ] [SN-SEC-003](security.md#sn-sec-003) Secure coding checklist enforcement (PR gate)
- [ ] [SN-SEC-004](security.md#sn-sec-004) Untrusted-input validation gate framework
- [ ] [SN-SEC-005](security.md#sn-sec-005) Harden PDF import parser path
- [ ] [SN-SEC-006](security.md#sn-sec-006) Harden image decode path
- [ ] [SN-SEC-007](security.md#sn-sec-007) Harden .sanenote bundle unpack
- [ ] [SN-SEC-008](security.md#sn-sec-008) Harden audio decode path
- [ ] [SN-SEC-009](security.md#sn-sec-009) Harden custom-font import loader
- [ ] [SN-SEC-010](security.md#sn-sec-010) Parser fuzzing harness + CI gate
- [ ] [SN-SEC-011](security.md#sn-sec-011) Deep link / App Links / Universal Links validation
- [ ] [SN-SEC-012](security.md#sn-sec-012) Host assetlinks.json + AASA and enable autoVerify
- [ ] [SN-SEC-013](security.md#sn-sec-013) URL scheme allow-list + SSRF/redirect guard
- [ ] [SN-SEC-014](security.md#sn-sec-014) Android exported-component & intent hardening
- [ ] [SN-SEC-015](security.md#sn-sec-015) WebView hardening policy for mobile shells
- [ ] [SN-SEC-016](security.md#sn-sec-016) Web strict CSP + Trusted Types + DOMPurify
- [ ] [SN-SEC-017](security.md#sn-sec-017) Web COOP/COEP isolation + SRI + hardening headers
- [ ] [SN-SEC-018](security.md#sn-sec-018) Clipboard protection controls
- [ ] [SN-SEC-019](security.md#sn-sec-019) Screenshot/FLAG_SECURE + notification excerpt suppression
- [ ] [SN-SEC-020](security.md#sn-sec-020) App lock: biometric + auto-lock + RAM key scrub
- [ ] [SN-SEC-021](security.md#sn-sec-021) Secure logging: SaneLog redaction + no-PII tests
- [ ] [SN-SEC-022](security.md#sn-sec-022) Network transport security (TLS/cleartext/pinning)
- [ ] [SN-SEC-023](security.md#sn-sec-023) Backup exclusion for keys & sensitive stores
- [ ] [SN-SEC-024](security.md#sn-sec-024) Secure defaults audit
- [ ] [SN-SEC-025](security.md#sn-sec-025) Security regression test suite
- [ ] [SN-SEC-026](security.md#sn-sec-026) Anti-tamper & resilience posture ADR
- [ ] [SN-SEC-027](security.md#sn-sec-027) Root/jailbreak detection + device attestation
- [ ] [SN-SEC-028](security.md#sn-sec-028) Release obfuscation + symbol strip + debug-off assertion
- [ ] [SN-SEC-029](security.md#sn-sec-029) MASVS-STORAGE/CRYPTO MASTG verification
- [ ] [SN-SEC-030](security.md#sn-sec-030) MASVS-PLATFORM MASTG verification
- [ ] [SN-SEC-031](security.md#sn-sec-031) MASVS-NETWORK/RESILIENCE MASTG verification
- [ ] [SN-SEC-032](security.md#sn-sec-032) ASVS 5.0 L2 web + relay verification
- [ ] [SN-SEC-033](security.md#sn-sec-033) Penetration test plan & abuse-case matrix
- [ ] [SN-SEC-034](security.md#sn-sec-034) Pentest findings remediation & risk register
- [ ] [SN-SEC-035](security.md#sn-sec-035) Incident response runbook operationalisation
- [ ] [SN-SEC-036](security.md#sn-sec-036) Vulnerability disclosure program

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-002

<a id="sn-sec-002"></a>

**Review and baseline the STRIDE + LINDDUN threat model**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | security, privacy |
| Size | M |
| SDLC | requirements |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-1`, `OWASP-A04`, `CWE-1053` |
| Extra labels | agent-ready |

#### Context
docs/security/threat-model.md is the source of the "Security & privacy" section every issue must fill (issues/SCHEMA.md) and of the PR checklist. It must be reviewed and formally baselined by the Security Owner at M0 so that every downstream implementation issue inherits a fixed mitigation **and** a fixed verification for each threat (docs/security/ssdlc-process.md §2.1). Without a signed baseline, agents cannot cite stable `TM-*` IDs and the controls matrix has no anchor. This is a locked-decision-8 obligation (STRIDE+LINDDUN threat model) and the M0 exit criterion "threat model + controls matrix reviewed by the Security Owner" (docs/roadmap.md M0).

#### Scope
**In:** walk all five trust boundaries (TB1–TB5) and both DFDs; confirm every asset A1–A11, actor TA1–TA12 and threat row (TM-S/T/R/I/D/E-*, TM-P-*) has a mitigation and a named verification; cross-check each row against docs/security/controls-matrix.md; record the Security Owner sign-off and the "next scheduled pass" date; open follow-up issues for any Designed→Planned gap.
**Out:** implementing any control (child issues do that); crypto internals (docs/architecture/crypto.md); adding new CI jobs ([SN-CI-001](ci-cd.md#sn-ci-001)).

#### Acceptance criteria
- [ ] Every `TM-*` row has a non-empty Mitigation and a Verification column that names a concrete test/gate.
- [ ] Every controls-matrix row maps to an owning package and a verification; no orphan controls.
- [ ] Residual risks RR1–RR7 are explicitly dispositioned (accepted/surfaced/open) with an owner.
- [ ] Security Owner sign-off recorded in the doc; `_Last STRIDE/LINDDUN pass_` and next-pass date updated.
- [ ] A gap list is filed as issues for any row still Designed with no scheduled milestone.

#### Technical notes
Edit docs/security/threat-model.md and docs/security/controls-matrix.md only. Keep IDs stable (`TM-<letter>-NN`, `TM-P-NN`) — downstream issues reference them. Confirm the DFD mermaid diagrams still match docs/architecture/overview.md §3 data flows. This is a `sdlc: requirements` gate per ssdlc §2.1; CODEOWNERS requires Maintainer review on /docs/security/.

#### Security & privacy
Threats: process-level coverage of the entire register. Controls: OWASP-A04 (Insecure Design — threat-model-driven design), NIST SSDF PO.1/PW.1. This issue changes no code path and creates no new trust boundary; it certifies the model is complete. CWE-1053 (missing documentation of security-relevant design) is the anti-pattern it closes.

#### UX notes
None beyond baseline (documentation task). Baseline still applies: no secrets, no PII in the doc, object ids referenced as opaque hashes.

#### Test plan
No automated test. Manual: a reviewer checklist that every threat row has Mitigation + Verification and every asset is referenced by at least one row. Add a CI doc-lint (optional) that fails if a `TM-` row lacks a Verification cell — file as a follow-up if not trivial.

#### Dependencies
None.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-003

<a id="sn-sec-003"></a>

**Enforce the secure-coding checklist as a PR gate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | security, ci-cd |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-002](security.md#sn-sec-002) |
| Security controls | `OWASP-A05`, `MASVS-CODE-3`, `ASVS-V15`, `CWE-1006` |
| Extra labels | agent-ready |

#### Context
docs/security/secure-coding-checklist.md is the checklist every PR is reviewed against, and its condensed form lives in .github/PULL_REQUEST_TEMPLATE.md. To be a real gate (not a review nit) the three gate rules — no secrets, no PII in logs, no boundary violations (checklist §0) — and the reviewer fast-pass (§12) must be wired into the PR template and CODEOWNERS so a reviewer/agent cannot merge a security-relevant change without ticking the honest boxes and getting the required review (docs/security/ssdlc-process.md §2.3). This shifts security left and makes the checklist enforceable rather than aspirational.

#### Scope
**In:** complete the Security & privacy and UX checklists in .github/PULL_REQUEST_TEMPLATE.md so they mirror checklist §12; confirm .github/CODEOWNERS hard-requires Maintainer review on /docs/security/, /.github/, /packages/sane_crypto/, /packages/sane_sync/, /app/lib/auth/; add a lightweight required-status "security-triage" checkbox job that fails when the PR touches a parser/network/native/webview/deeplink/crypto path but the threat-model row/Security section is unfilled.
**Out:** the scanner jobs themselves (Semgrep/gitleaks/OSV are [SN-CI-001](ci-cd.md#sn-ci-001)); crypto rules (docs/architecture/crypto.md); branch-protection admin config ([SN-CI-003](ci-cd.md#sn-ci-003)).

#### Acceptance criteria
- [ ] PR template contains the §12 fast-pass items and the 17-look/latency/a11y UX boxes; boxes are required to be ticked.
- [ ] CODEOWNERS blocks merge on all five security-critical paths without Maintainer approval (verified by a test PR touching each).
- [ ] A PR that adds a network call/parser/native method without a threat-model row or filled Security section is flagged by the triage check.
- [ ] "None beyond baseline" is accepted only for pure-UI diffs (no new data flow), documented in the template.

#### Technical notes
Edit .github/PULL_REQUEST_TEMPLATE.md and .github/CODEOWNERS. The triage check can be a small workflow that greps the diff for sensitive globs (`**/sane_pdf/**`, `**/*webview*`, `**/auth/**`, `Uri.parse`, `http`, `MethodChannel`) and requires the Security section to be non-empty — pass untrusted diff data via `env:` never inlined into `run:` (docs/security/devsecops-pipeline.md §0). Aligns with SSDF PW.5/PS.1.

#### Security & privacy
Threats: TM-I-05 (PII in logs), TM-T-05 adjacency (process integrity). Controls: OWASP-A05 (Security Misconfiguration — enforce secure process), MASVS-CODE-3, ASVS-V15 (secure coding & architecture), CWE-1006 (bad coding practices). No new egress; this is process hardening.

#### UX notes
None beyond baseline (developer-facing tooling). Baseline: the template must not request secrets/tokens in free-text fields.

#### Test plan
Manual: open a throwaway PR touching each CODEOWNERS path and confirm the required review triggers. Add `tools/scripts/` self-test or a workflow dry-run for the triage grep. No app code changed.

#### Dependencies
[SN-SEC-002](security.md#sn-sec-002) (stable TM IDs to reference). Cross-epic: [SN-CI-003](ci-cd.md#sn-ci-003) branch protection.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-004

<a id="sn-sec-004"></a>

**Build the untrusted-input validation gate framework**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | security, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-CODE-4`, `MASVS-PLATFORM-1`, `ASVS-V5`, `OWASP-A03`, `OWASP-A10`, `CWE-20`, `CWE-409`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
Every byte from outside the app is hostile (docs/security/secure-coding-checklist.md §1; threat-model TB1/TB3). PDF, image, audio, font and `.sanenote` imports, files opened from other apps, clipboard, share payloads and network responses all pass through the same defensive gate before any parser runs. This issue builds that reusable **InputGuard** in `packages/sane_core` so every importer (children SN-SEC-005..009) inherits identical, tested resource caps, MIME/type/schema validation, path confinement and fail-closed semantics instead of each re-implementing them. It directly implements the M2 exit criterion "import a hostile/malformed file fails closed, off the UI isolate, resource-capped, path-confined" (docs/roadmap.md M2).

#### Scope
**In:** a `InputGuard` API in `sane_core` returning `Result<Validated, Failure>`: content-sniffed MIME check (not extension-trusted), byte-size caps, max-entry / max-uncompressed-size / max-dimension / max-duration caps, wall-clock timeout budget, strict-parse schema check that rejects unknown fields, Unicode NFC normalisation + control-char stripping + field-length bounds, and path canonicalisation/confinement helpers (reject `..`, absolute, symlink; write only under an app-chosen dir). Helper to run any decode on a one-shot `Isolate.run` with a bounded memory budget.
**Out:** the actual parsers (children); crypto (docs/architecture/crypto.md); the drift schema ([SN-CORE-004](storage.md#sn-core-004)).

#### Acceptance criteria
- [ ] A file whose real content type differs from its extension is rejected (content sniffing).
- [ ] Inputs over the configured byte/entry/uncompressed/dimension/duration caps fail closed with a user-safe `Failure`, no partial state, no thrown raw exception.
- [ ] A decode exceeding the wall-clock budget is cancelled and reported as `Failure.timeout`.
- [ ] Path helpers reject `..`, absolute paths and symlinks; a traversal payload cannot escape the target dir (unit-proven).
- [ ] The guard runs the decode off the UI isolate; a hostile file adds 0 ms to ink latency (measured no main-isolate block).
- [ ] 100% of the public API carries `///` dartdoc and returns `Result`, never throws across the boundary.

#### Technical notes
`packages/sane_core/lib/src/security/input_guard.dart`. Pure Dart, no `package:flutter` (DAG §3). Caps live in a `const InputLimits` value object with per-type overrides. Use `Isolate.run` for one-shot decodes (overview §6). MIME sniffing via a magic-byte table; do not shell out. Reference docs/architecture/overview.md §6 (isolate model), docs/adr/0005-document-model-and-crdt.md. Threats TM-T-06, TM-D-01, TM-E-04.

#### Security & privacy
Threats: TM-T-06 (crafted bundle mutates unrelated notes), TM-D-01 (decompression bomb), TM-E-04 (parser RCE surface reduction). Controls: MASVS-CODE-4 (no unsafe deserialization — deserialize into explicit validated models), MASVS-PLATFORM-1, ASVS-V5 (file handling), OWASP-A03 (Injection), OWASP-A10 2025 (fail closed on exceptional conditions), CWE-20/409/22. No egress. Import lands in a new isolated notebook by default (enforced by children).

#### UX notes
On rejection the importer shows a user-safe message ("This file could not be imported safely") — never a stack trace or internal path (checklist §7). Loading state while off-isolate decode runs; offline works (no network). Surface: Import PDF overlay / share-sheet entry (docs/design/screens-and-flows.md §9). All 17 looks + dark mode apply to any surfaced error toast (via [SN-DS-003](design-system.md#sn-ds-003) components).

#### Test plan
`packages/sane_core/test/security/input_guard_test.dart`: cap-exceeded, wrong-MIME, timeout, traversal, unknown-field-reject, NFC normalisation cases; a corpus of malformed headers. Assert no main-isolate block. Golden test not applicable (logic only).

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) (Result/Failure + model entities).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-005

<a id="sn-sec-005"></a>

**Harden the PDF import parser path against malicious documents**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | security, pdf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-004](security.md#sn-sec-004) |
| Depends on | [SN-SEC-004](security.md#sn-sec-004), [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-CODE-2`, `MASVS-CODE-4`, `ASVS-V5`, `OWASP-A03`, `CWE-20`, `CWE-787`, `CWE-611` |
| Extra labels | agent-ready |

#### Context
PDF is the highest-volume untrusted-input surface (import a hostile/malformed PDF must fail closed — docs/roadmap.md M2 exit criterion). pdfium/PDFKit are native C/C++ decoders and a classic RCE/memory-corruption target (threat-model TM-E-04). The PDF render pipeline [SN-PDF-002](pdf.md#sn-pdf-002) must be wrapped by the InputGuard [SN-SEC-004](security.md#sn-sec-004) and run off the UI isolate with bounded memory so a crafted PDF cannot corrupt memory, exhaust RAM, add latency, or exfiltrate via embedded JavaScript/remote resources. This closes the M2 input-validation checklist for PDFs (docs/security/secure-coding-checklist.md §1).

#### Scope
**In:** route all PDF bytes through InputGuard (size/MIME caps, off-isolate decode, wall-clock budget); disable PDF JavaScript execution and any remote-resource/URI actions in the pdfium/PDFKit config; strip or neutralise `/OpenAction`, `/Launch`, `/URI`, `/SubmitForm`, embedded files; bound page count / image dimensions before raster; validate the pdfium/native dep is pinned and patched (OSV-clean); ensure a decode failure yields a user-safe `Failure`.
**Out:** the render/annotate feature itself ([SN-PDF-002](pdf.md#sn-pdf-002)); the commercial-SDK escape-hatch decision (docs/adr/0014-pdf-engine.md, maintainer gate); fuzzing harness ([SN-SEC-010](security.md#sn-sec-010)).

#### Acceptance criteria
- [ ] Embedded JavaScript in a PDF never executes; `/Launch` and `/SubmitForm` actions are inert (unit-proven with crafted samples).
- [ ] A PDF referencing a remote resource makes no network call during import (network log asserts zero egress).
- [ ] A malformed/oversized PDF fails closed with a user-safe error, parsed off the UI isolate, within the memory budget.
- [ ] pdfium/native decoder pinned to a patched version; OSV-Scanner clean (checked in PR).
- [ ] Import does not regress editor latency (no main-isolate block while decoding).

#### Technical notes
`packages/sane_pdf`; the `sane_pdfkit` plugin where used (docs/adr/0014-pdf-engine.md, docs/adr/0012-native-plugin-strategy.md). Configure pdfium with JS disabled and no external stream fetching; on Apple, PDFKit annotation/action sandboxing. Validate native argument lengths at the platform channel (checklist §2). Reference docs/architecture/overview.md §6.

#### Security & privacy
Threats: TM-E-04 (parser RCE), TM-D-01 (resource exhaustion), TM-I-08 adjacency (no silent egress). Controls: MASVS-CODE-2 (deps current), MASVS-CODE-4, ASVS-V5, OWASP-A03, CWE-787 (out-of-bounds write), CWE-611 (XXE/external entity in embedded XML/XFA). No note content leaves the device.

#### UX notes
Import PDF overlay (docs/design/screens-and-flows.md §9): on failure, toast "This PDF couldn't be opened safely"; loading spinner during off-isolate parse; free-import meter unaffected on failure. Error toast themed across all 17 looks + dark; 44pt targets; VoiceOver/TalkBack announces the error.

#### Test plan
`packages/sane_pdf/test/security/pdf_hardening_test.dart`: crafted PDFs with JS/OpenAction/Launch/remote-URI/XFA and an oversized/malformed sample; assert no execution, no egress, fail-closed, off-isolate. Add these samples to the [SN-SEC-010](security.md#sn-sec-010) fuzz corpus.

#### Dependencies
[SN-SEC-004](security.md#sn-sec-004), [SN-PDF-002](pdf.md#sn-pdf-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-006

<a id="sn-sec-006"></a>

**Harden the image decode path with dimension caps and EXIF stripping**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | security, images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-004](security.md#sn-sec-004) |
| Depends on | [SN-SEC-004](security.md#sn-sec-004), [SN-MED-001](images-media.md#sn-med-001) |
| Security controls | `MASVS-CODE-2`, `MASVS-PRIVACY-2`, `ASVS-V5`, `OWASP-A03`, `CWE-20`, `CWE-409`, `CWE-787` |
| Extra labels | agent-ready |

#### Context
Images arrive from photos, camera, scan, stickers and paste (PRD-LB-180). Image decoders have a long history of memory-corruption and decompression-bomb bugs (a 100MP or crafted APNG/WebP can exhaust RAM), and image metadata (EXIF GPS, device, timestamps) is a privacy leak that must be stripped before storage/sharing (LINDDUN identifiability). This wraps the image import path in InputGuard [SN-SEC-004](security.md#sn-sec-004) with pixel/dimension caps and mandatory metadata stripping, on the M2 input-validation checklist (docs/security/secure-coding-checklist.md §1; docs/roadmap.md M2).

#### Scope
**In:** prefer the platform/maintained decoder; enforce max pixel-count and max dimensions before decode; cap decoded-bitmap memory; wall-clock timeout; reject animated bombs (frame/loop caps); **strip EXIF/XMP/IPTC** (GPS, device, timestamps) on import and again on export; fail closed to a user-safe error.
**Out:** camera/scan capture UX ([SN-MED-001](images-media.md#sn-med-001)); sticker rendering; the fuzzing harness ([SN-SEC-010](security.md#sn-sec-010)).

#### Acceptance criteria
- [ ] An image exceeding the pixel/dimension cap is rejected before full decode (no OOM); proven with a decompression-bomb sample.
- [ ] EXIF GPS/device/timestamp metadata is absent from the stored blob and from any exported/shared image (byte-inspected).
- [ ] An animated-image bomb (excessive frames/loops) fails closed within the timeout.
- [ ] Decode runs off the UI isolate; no editor-latency regression.
- [ ] A malformed image surfaces a user-safe `Failure`, never a raw decoder exception.

#### Technical notes
Image path in `app/` importer + `packages/sane_core` InputGuard; use `dart:ui` / platform codecs, not a hand-rolled parser (checklist §1 SHOULD). EXIF strip via a maintained library or by re-encoding pixels only. Reference PRD-LB-180 (EXIF-strip is explicit), docs/architecture/overview.md §6. Threats TM-D-01, TM-P-01/02.

#### Security & privacy
Threats: TM-D-01 (image bomb DoS), TM-E-04 (decoder memory corruption), TM-P-01/P-02 (metadata linkability/identifiability). Controls: MASVS-CODE-2, MASVS-PRIVACY-2 (collection transparency — strip location), ASVS-V5, OWASP-A03, CWE-409 (uncontrolled resource consumption), CWE-787. Metadata minimisation is privacy-by-design (docs/security/controls-matrix.md §7 data minimisation).

#### UX notes
Import overlay / image insertion (docs/design/screens-and-flows.md); a stripped-metadata note is not shown intrusively but the privacy dashboard ([SN-PRV-001](privacy.md#sn-prv-001)) states "location data removed from imported images". Failure toast themed across 17 looks + dark; a11y labelled.

#### Test plan
`packages/sane_core/test/security/image_hardening_test.dart` + `app/test/security/image_import_test.dart`: decompression-bomb, oversized-dimension, animated-bomb, EXIF-present samples; assert reject/strip/fail-closed/off-isolate. Corpus feeds [SN-SEC-010](security.md#sn-sec-010).

#### Dependencies
[SN-SEC-004](security.md#sn-sec-004), [SN-MED-001](images-media.md#sn-med-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-007

<a id="sn-sec-007"></a>

**Harden .sanenote bundle unpack against path traversal and zip bombs**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-004](security.md#sn-sec-004) |
| Depends on | [SN-SEC-004](security.md#sn-sec-004), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-CODE-4`, `ASVS-V5`, `ASVS-V2`, `OWASP-A03`, `OWASP-A08`, `CWE-22`, `CWE-409`, `CWE-502` |
| Extra labels | agent-ready |

#### Context
The open `.sanenote` bundle is the app's own import/export format and a competitor-import target; a crafted bundle is the TM-T-06 threat: it must not overwrite unrelated notes or escape the app directory, and a zip/decompression bomb must not exhaust memory (TM-D-01). Because a malicious bundle could cause data loss (overwriting the user's notes) this is p0. The reader/writer [SN-CORE-005](storage.md#sn-core-005) must run every entry through InputGuard [SN-SEC-004](security.md#sn-sec-004): schema-validate the manifest, canonicalise and confine all paths, cap entries/uncompressed size, and import into a new isolated notebook by default (docs/security/secure-coding-checklist.md §1; docs/architecture/file-format.md).

#### Scope
**In:** strict-parse the manifest JSON (reject unknown fields); enforce max-entries / max-uncompressed-size / compression-ratio caps before extraction; canonicalise every entry path and reject `..`/absolute/symlink/drive-letter; write only under a freshly created notebook dir; never overwrite an existing note by a path taken from bundle content; verify the manifest hash tree / AEAD tags (via [SN-CRY-001](security.md#sn-cry-001)) before applying any byte; fail closed with no partial import.
**Out:** the format spec and normal writer path ([SN-CORE-005](storage.md#sn-core-005)); competitor `.goodnotes`/`.note`/`.one` importers (M6, legality-gated); crypto primitives (docs/architecture/crypto.md).

#### Acceptance criteria
- [ ] An entry path containing `..`, an absolute path, or a symlink is rejected; no file is written outside the new notebook dir (traversal payload proven confined).
- [ ] A zip/decompression bomb (huge ratio or entry count) fails closed before exhausting memory.
- [ ] Import creates a **new isolated notebook**; no existing note is mutated or overwritten by bundle-supplied paths.
- [ ] A manifest with unknown/oversized fields is rejected in strict-parse mode.
- [ ] A truncated/tag-mismatched bundle fails closed (no partial apply) — AEAD/hash verified first.

#### Technical notes
`packages/sane_core` unpack + `packages/sane_sync`/`sane_crypto` for tag/hash verification (docs/architecture/file-format.md §4.4, crypto.md §2.1 AAD binds position). Pure Dart, off the UI isolate. Canonicalise with a confined-root resolver; never trust the archive's stored path. Threats TM-T-06, TM-D-01. Reference docs/adr/0005-document-model-and-crdt.md.

#### Security & privacy
Threats: TM-T-06 (crafted bundle mutates unrelated notes/paths), TM-D-01 (bomb). Controls: ASVS-V5 (file handling), ASVS-V2 (validation), OWASP-A03, OWASP-A08 (data integrity — verify before use), CWE-22 (path traversal), CWE-409, CWE-502 (unsafe deserialization). Data-loss prevention makes this p0.

#### UX notes
Import flow (docs/design/screens-and-flows.md): a rejected bundle shows "This file couldn't be imported safely"; a successful import lands as a new notebook the user can rename — never silently merged. Progress state for large bundles; offline. Error surfaces themed across 17 looks + dark.

#### Test plan
`packages/sane_core/test/security/sanenote_unpack_test.dart`: traversal (`../../etc`), symlink, absolute-path, zip-bomb, unknown-field, truncated-tag samples; assert confinement, fail-closed, new-notebook isolation. Corpus feeds [SN-SEC-010](security.md#sn-sec-010).

#### Dependencies
[SN-SEC-004](security.md#sn-sec-004), [SN-CORE-005](storage.md#sn-core-005). Cross-epic: [SN-CRY-001](security.md#sn-cry-001) (tag/hash verify).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-008

<a id="sn-sec-008"></a>

**Harden the audio decode path against malformed media**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | security, audio |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-004](security.md#sn-sec-004) |
| Depends on | [SN-SEC-004](security.md#sn-sec-004), [SN-AUD-002](audio.md#sn-aud-002) |
| Security controls | `MASVS-CODE-2`, `MASVS-CODE-4`, `ASVS-V5`, `OWASP-A03`, `CWE-20`, `CWE-409`, `CWE-787` |
| Extra labels | agent-ready |

#### Context
Audio clips can be imported and (later) played back; container/codec parsers (AAC/ALAC/Opus/WAV) are a memory-corruption surface and a malformed file can hang or exhaust memory. The audio recorder/service [SN-AUD-002](audio.md#sn-aud-002) and any import path must route decode through InputGuard [SN-SEC-004](security.md#sn-sec-004) with duration/size caps off the UI isolate so a hostile clip cannot block the recording/playback isolate or the UI (docs/security/secure-coding-checklist.md §1; docs/adr/0015-audio-pipeline.md). Audio also must never block the UI isolate (M3 exit criterion, docs/roadmap.md M3).

#### Scope
**In:** wrap audio import/decode in InputGuard (MIME sniff, size + duration caps, wall-clock budget, off-isolate); validate container structure before codec decode; bound sample-rate/channel/frame counts; fail closed to a user-safe `Failure`; ensure decode never runs on the UI isolate.
**Out:** recording capture, waveform, audio-ink anchors, transcription ([SN-AUD-001](audio.md#sn-aud-001) / [SN-AUD-002](audio.md#sn-aud-002)); the fuzzing harness ([SN-SEC-010](security.md#sn-sec-010)).

#### Acceptance criteria
- [ ] An oversized/over-duration clip is rejected before full decode.
- [ ] A malformed container/codec stream fails closed with a user-safe error, no crash-to-exploit.
- [ ] Decode runs off the UI and recording isolates; recording/playback continues uninterrupted.
- [ ] Sample-rate/channel/frame bounds enforced; a crafted header cannot allocate unbounded buffers.

#### Technical notes
`packages/sane_audio` + native `sane_ml_native`/platform codecs (docs/adr/0015-audio-pipeline.md, 0012-native-plugin-strategy.md). Validate platform-channel args (checklist §2). Prefer platform decoders over hand-rolled. Threats TM-D-01, TM-E-04. Reference docs/architecture/overview.md §6 isolate model.

#### Security & privacy
Threats: TM-D-01 (audio bomb/hang), TM-E-04 (codec memory corruption). Controls: MASVS-CODE-2/4, ASVS-V5, OWASP-A03, CWE-409, CWE-787. No egress; on-device only (transcription cloud escalation is opt-in, out of scope here).

#### UX notes
Editor audio insert / player (docs/design/screens-and-flows.md editor toolbar): failure toast "This audio couldn't be opened safely"; recording indicator unaffected. Themed across 17 looks + dark; a11y labelled controls, 44pt targets.

#### Test plan
`packages/sane_audio/test/security/audio_hardening_test.dart`: oversized, over-duration, malformed-container, header-bomb samples; assert reject/fail-closed/off-isolate; recording-continues assertion. Corpus feeds [SN-SEC-010](security.md#sn-sec-010).

#### Dependencies
[SN-SEC-004](security.md#sn-sec-004), [SN-AUD-002](audio.md#sn-aud-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-009

<a id="sn-sec-009"></a>

**Harden the custom-font import loader**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | security, text |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SEC-004](security.md#sn-sec-004) |
| Depends on | [SN-SEC-004](security.md#sn-sec-004) |
| Security controls | `MASVS-CODE-2`, `MASVS-CODE-4`, `ASVS-V5`, `OWASP-A03`, `CWE-20`, `CWE-787` |
| Extra labels | agent-ready, good first issue |

#### Context
PRD-ED-184 adds "import custom fonts" (MAY, M3). Font parsers (TrueType/OpenType shaping and hinting engines) are among the most-exploited memory-corruption surfaces on every platform (numerous CVEs). A user-supplied font is untrusted input and must pass through a hardened loader: validated, size-capped, and rendered by the platform's font system rather than a bespoke parser, with malformed fonts failing closed. This closes the font row of the M3 input-validation surface (docs/security/secure-coding-checklist.md §1).

#### Scope
**In:** route imported font bytes through InputGuard [SN-SEC-004](security.md#sn-sec-004) (MIME sniff for sfnt/woff, size cap); validate the font table directory before registering; register with the platform font loader (never a hand-rolled shaper); sandbox/limit which glyph tables are honoured; fail closed on malformed fonts; scope an imported font to the importing notebook.
**Out:** the font-picker UX and typography tokens ([SN-DS-002](design-system.md#sn-ds-002)); bundled first-party fonts; web `@font-face` policy (covered by CSP [SN-SEC-016](security.md#sn-sec-016)).

#### Acceptance criteria
- [ ] A malformed/oversized font is rejected with a user-safe error; the app does not crash.
- [ ] Imported fonts are registered via the platform loader; no custom parsing of hinting bytecode.
- [ ] A font with a corrupt table directory fails validation before registration.
- [ ] Imported font is scoped to its notebook and excluded from sync until re-encrypted like any blob.

#### Technical notes
`app/` font import + `sane_core` InputGuard; Flutter `FontLoader` / platform font APIs. On web, load only via a sanitised `@font-face` under the strict CSP ([SN-SEC-016](security.md#sn-sec-016)). Reference PRD-ED-184, docs/design/design-system.md typography. Threat TM-E-04.

#### Security & privacy
Threats: TM-E-04 (font-parser RCE). Controls: MASVS-CODE-2/4, ASVS-V5, OWASP-A03, CWE-787. No egress; imported font never leaves device except as an encrypted blob if the notebook syncs.

#### UX notes
Settings/typography import entry (docs/design/screens-and-flows.md Settings): failure toast "This font couldn't be loaded safely"; success adds the font to the notebook's picker. Themed across 17 looks + dark; a11y labelled.

#### Test plan
`app/test/security/font_import_test.dart`: malformed-table, oversized, wrong-MIME samples; assert reject/fail-closed and platform-loader registration. Add to [SN-SEC-010](security.md#sn-sec-010) corpus.

#### Dependencies
[SN-SEC-004](security.md#sn-sec-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-010

<a id="sn-sec-010"></a>

**Stand up the parser fuzzing harness, corpus and CI gate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | security, qa |
| Size | L |
| SDLC | verification |
| Parent | [SN-SEC-004](security.md#sn-sec-004) |
| Depends on | [SN-SEC-005](security.md#sn-sec-005), [SN-SEC-006](security.md#sn-sec-006), [SN-SEC-007](security.md#sn-sec-007), [SN-SEC-008](security.md#sn-sec-008) |
| Security controls | `MASVS-CODE-2`, `MASVS-RESILIENCE-2`, `ASVS-V5`, `OWASP-A03`, `CWE-20`, `CWE-787`, `CWE-409` |
| Extra labels | agent-ready |

#### Context
docs/security/ssdlc-process.md §2.4 makes parser fuzzing a MUST for parser changes and a verification-gate exit criterion (TM-E-04, TM-D-01). This issue builds the harness and seed corpora for the four untrusted decoders — PDF, image, audio and `.sanenote` unpack — plus AddressSanitizer builds for the native/C decoders, and wires a CI job that fails on any reproducible crash for a changed parser. It turns the per-parser hardening (SN-SEC-005..008) into a standing regression barrier so a memory-safety regression cannot merge.

#### Scope
**In:** a fuzz-target per decoder (Dart-level differential/property fuzzing for the Dart paths; libFuzzer/AFL++ with ASan for the native pdfium/codec paths); seed corpora assembled from the crafted samples in SN-SEC-005..008; a minimised crash-corpus checked in; a CI job (invoked in the verification stage / weekly cron) that runs a bounded fuzz budget and fails on a new reproducible crash; crash-triage docs.
**Out:** adding the scanner jobs Semgrep/OSV ([SN-CI-001](ci-cd.md#sn-ci-001)); the parsers themselves; ZAP/MobSF ([SN-SEC-030](security.md#sn-sec-030)..[SN-SEC-032](security.md#sn-sec-032)).

#### Acceptance criteria
- [ ] A fuzz target exists and runs for each of PDF, image, audio and `.sanenote` unpack.
- [ ] Native C/C++ decoders build under AddressSanitizer in the fuzz job.
- [ ] The CI job fails on any reproducible crash on the corpus for a changed parser; a known-good run is clean.
- [ ] A minimised, non-sensitive crash corpus (synthetic only — no user content) is committed under `packages/*/test/fuzz/`.
- [ ] Crash-triage runbook documents how to reproduce, minimise and file a Critical vuln.

#### Technical notes
Harness under `tools/` and `packages/*/test/fuzz/`. Dart fuzzing via property tests over InputGuard [SN-SEC-004](security.md#sn-sec-004); native fuzzing via libFuzzer/AFL++ + ASan on the pdfium/codec builds (research: MHL coverage-guided fuzzing patterns). Reference docs/security/devsecops-pipeline.md verification stage. Corpora must contain **only synthetic** inputs (checklist §0 no content). Threats TM-E-04, TM-D-01.

#### Security & privacy
Threats: TM-E-04 (parser RCE), TM-D-01 (resource exhaustion). Controls: MASVS-CODE-2, MASVS-RESILIENCE-2 (integrity), ASVS-V5, OWASP-A03, CWE-787/409. Corpus contains no PII/content; crashes are triaged privately per the disclosure process ([SN-SEC-035](security.md#sn-sec-035)).

#### UX notes
None beyond baseline (developer tooling). Baseline: no user content in fixtures/corpus; crash artifacts stored without PII.

#### Test plan
The harness is the test. Self-test: a deliberately vulnerable stub decoder must be caught by the job; a fixed decoder must pass. Files: `packages/sane_pdf/test/fuzz/`, `packages/sane_audio/test/fuzz/`, `packages/sane_core/test/fuzz/` (image + sanenote), plus `tools/fuzz/`.

#### Dependencies
[SN-SEC-005](security.md#sn-sec-005), [SN-SEC-006](security.md#sn-sec-006), [SN-SEC-007](security.md#sn-sec-007), [SN-SEC-008](security.md#sn-sec-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-011

<a id="sn-sec-011"></a>

**Validate deep links, App Links and Universal Links with an allow-list router**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, sharing-export |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PLATFORM-1`, `ASVS-V2`, `OWASP-A01`, `OWASP-A10`, `CWE-939`, `CWE-601`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
A malicious app can forge a link to trigger a sensitive action or open a note (threat-model TM-S-04), and overbroad routing enables intent redirection (TM-E-02). The secure-coding checklist §1.1 mandates verified deep links (Android App Links + iOS Universal Links) parsed against an allow-list of routes/parameters, landing in a **view/confirm** context that never auto-mutates state. This is the client-side link router that every inbound URL (share links, open-note, onboarding) passes through before go_router navigates. Share links land here in M6; the router must exist and be safe first.

#### Scope
**In:** a `LinkGuard` that parses inbound links against an allow-list of hosts/schemes/paths and typed, bounded parameters; rejects unknown hosts/schemes/paths; maps only to **view/confirm** destinations (never auto-import/auto-share/auto-delete/network); keeps any wrapped share-key in the URL **fragment** only (never sent to a server) and strips referrers on outbound navigation; integrates with go_router (docs/adr/0003).
**Out:** hosting assetlinks.json/AASA + autoVerify config ([SN-SEC-012](security.md#sn-sec-012)); outbound URL scheme allow-list/SSRF guard ([SN-SEC-013](security.md#sn-sec-013)); the share-link crypto ([SN-CRY-001](security.md#sn-cry-001)) and share UI ([SN-SHR-001](sharing-export.md#sn-shr-001)).

#### Acceptance criteria
- [ ] A forged/unknown host/scheme/path is rejected and routes to a safe default (no state change) — abuse-test proven.
- [ ] Every allowed route lands in a view/confirm screen; no inbound link imports, shares, deletes, mutates state or makes a network call without an explicit user tap.
- [ ] Query/path parameters are type-validated and length-bounded before use; malformed params are rejected.
- [ ] A wrapped share-key placed in the fragment never appears in any outbound request; referrer stripped.
- [ ] Custom-scheme (`sanenotes://`) links are never used for a security decision; sensitive routes require a verified link.

#### Technical notes
`app/lib/routing/link_guard.dart` feeding go_router (docs/adr/0003-state-management-and-app-structure.md). Allow-list is a `const` route table. Fragment parsing stays client-side (crypto.md §7 share-key in fragment). Reference docs/security/secure-coding-checklist.md §1.1, threat-model TM-S-04/TM-E-02/TM-I-09. Validate all extras (checklist §5).

#### Security & privacy
Threats: TM-S-04 (link forgery), TM-E-02 (intent redirection), TM-I-09 (share-key leakage via referrer/history). Controls: MASVS-PLATFORM-1, ASVS-V2, OWASP-A01 (broken access control incl. SSRF absorb 2025), OWASP-A10 (fail closed), CWE-939 (improper URL authorization), CWE-601 (open redirect), CWE-20.

#### UX notes
Inbound link → a confirm sheet ("Open this shared notebook?") before anything happens; design Share overlay context (docs/design/screens-and-flows.md §10). Empty/invalid link → friendly "This link isn't valid" screen, not an error dump. Themed across 17 looks + dark; keyboard-reachable on web; 44pt targets; VoiceOver/TalkBack labels.

#### Test plan
`app/test/security/link_guard_test.dart`: forged host/scheme/path, param-injection, fragment-leak, auto-mutate-attempt cases; assert reject + view/confirm-only + no egress. Widget test for the confirm sheet. MASTG-TEST deeplink equivalent verified in [SN-SEC-030](security.md#sn-sec-030).

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002). Related: [SN-SEC-012](security.md#sn-sec-012), [SN-SEC-013](security.md#sn-sec-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-012

<a id="sn-sec-012"></a>

**Host assetlinks.json and AASA and enable link auto-verification**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security |
| Size | M |
| SDLC | release |
| Parent | [SN-SEC-011](security.md#sn-sec-011) |
| Depends on | [SN-SEC-011](security.md#sn-sec-011) |
| Security controls | `MASVS-PLATFORM-1`, `OWASP-A01`, `CWE-939`, `CWE-20` |
| Extra labels | needs-credentials |

#### Context
Verified deep links only work if the association files are hosted and the manifests opt in: Android needs `android:autoVerify=true` plus a hosted `/.well-known/assetlinks.json` bound to the app's signing-cert SHA-256, and iOS needs a hosted `/.well-known/apple-app-site-association` (AASA) plus the Associated Domains entitlement (secure-coding checklist §1.1). Without these, any app can register the same custom scheme and the LinkGuard [SN-SEC-011](security.md#sn-sec-011) allow-list is undermined. This requires maintainer secrets (the production signing-cert fingerprints, the Team ID and the domain), so it is `needs-credentials`.

#### Scope
**In:** author `/.well-known/assetlinks.json` (package name + signing-cert SHA-256 fingerprints for each flavour) and `/.well-known/apple-app-site-association` (appIDs + paths) in `website/`; set `android:autoVerify=true` on the App Links intent filters and the Associated Domains entitlement + `applinks:` on iOS; serve both files over HTTPS with correct content-type and no redirect; document the flavour/fingerprint matrix.
**Out:** the client route validation ([SN-SEC-011](security.md#sn-sec-011)); the marketing site content ([SN-SITE-001](website.md#sn-site-001)); signing-key generation ([SN-REL-001](release.md#sn-rel-001)).

#### Acceptance criteria
- [ ] `assetlinks.json` served at `https://<domain>/.well-known/assetlinks.json` (200, `application/json`, no redirect) with the real signing-cert SHA-256 for dev/beta/release flavours.
- [ ] AASA served at `https://<domain>/.well-known/apple-app-site-association` (200, correct type, no redirect) with the app IDs and `applinks` paths.
- [ ] Android `autoVerify` passes (`adb shell pm verify-app-links` shows verified); a tapped App Link opens the app without the disambiguation dialog.
- [ ] iOS Universal Link opens the app directly for the associated paths.
- [ ] Custom-scheme fallback is disabled for sensitive routes.

#### Technical notes
Files in `website/.well-known/`; manifest changes in `app/android/app/src/main/AndroidManifest.xml` and iOS `Associated Domains` capability + entitlements. Fingerprints and Team ID are CI/maintainer secrets — never commit a private key; the public SHA-256 fingerprint is fine to commit. Reference docs/platform/android.md, docs/platform/ipad.md, docs/adr/0012-native-plugin-strategy.md.

#### Security & privacy
Threats: TM-S-04 (link forgery). Controls: MASVS-PLATFORM-1, OWASP-A01, CWE-939. No note content involved; the association files are public by design. Domain + fingerprints are maintainer-supplied (needs-credentials).

#### UX notes
None beyond baseline (infra/config). The visible effect: shared-notebook links open the app directly and land in the confirm sheet from [SN-SEC-011](security.md#sn-sec-011) across all platforms.

#### Test plan
Manual verification with `adb shell pm get-app-links` / Apple's AASA validator; a documented device-lab check per flavour. Add a CI check that fetches both well-known URLs and asserts 200 + content-type + no redirect. `tools/scripts/verify-applinks.mjs`.

#### Dependencies
[SN-SEC-011](security.md#sn-sec-011). Cross-epic: [SN-REL-001](release.md#sn-rel-001) (signing keys), [SN-SITE-001](website.md#sn-site-001) (domain hosting).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-013

<a id="sn-sec-013"></a>

**Add a URL scheme allow-list and SSRF/redirect guard for outbound navigation**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SEC-011](security.md#sn-sec-011) |
| Depends on | [SN-SEC-011](security.md#sn-sec-011) |
| Security controls | `MASVS-PLATFORM-2`, `ASVS-V2`, `OWASP-A10`, `OWASP-A01`, `CWE-601`, `CWE-918`, `CWE-20` |
| Extra labels | agent-ready, good first issue |

#### Context
Note content and imported documents can contain links; opening a URL from untrusted content into a WebView, external browser or network client without scheme allow-listing is SSRF/open-redirect surface (secure-coding checklist §1.1). Links must be constrained to `https` for web navigations, and `file:`/`javascript:`/`data:` must be blocked for navigations, with referrers stripped so a share-key fragment never leaks (TM-I-09). This is the outbound counterpart to the inbound LinkGuard [SN-SEC-011](security.md#sn-sec-011).

#### Scope
**In:** a single `openExternal(uri)` chokepoint used everywhere the app opens a link; allow-list `https` (and `mailto:`/`tel:` explicitly) for user-facing links; block `file:`/`javascript:`/`data:`/unknown schemes; strip referrer and never forward URL fragments; confirm before opening a link embedded in untrusted note content; no server-side fetch of user-supplied URLs (data-detectors preview must be on-device only).
**Out:** WebView config ([SN-SEC-015](security.md#sn-sec-015)); web CSP navigation policy ([SN-SEC-016](security.md#sn-sec-016)); the data-detectors feature itself (PRD-LB-388).

#### Acceptance criteria
- [ ] `openExternal` rejects `file:`, `javascript:`, `data:` and unknown schemes for navigations; only `https`/`mailto`/`tel` proceed.
- [ ] A link from untrusted note content triggers a confirm before opening; the destination host is shown.
- [ ] No URL fragment or referrer is forwarded on outbound navigation (proven by inspection).
- [ ] No user-supplied URL is fetched server-side or auto-previewed off-device.

#### Technical notes
`app/lib/routing/open_external.dart` wrapping `url_launcher`/platform open; reuse the LinkGuard parser. Reference secure-coding checklist §1.1 (SSRF/redirect), TM-I-09 (fragment), TM-E-... A10. Keep it the only path; add an arch-lint that bans direct `url_launcher` calls elsewhere.

#### Security & privacy
Threats: TM-I-09 (fragment/referrer leak), SSRF/redirect. Controls: MASVS-PLATFORM-2, ASVS-V2, OWASP-A10 (2025 SSRF absorbed into A01), CWE-601 (open redirect), CWE-918 (SSRF), CWE-20. No egress beyond the user-confirmed navigation.

#### UX notes
Confirm sheet shows the destination host ("Open example.com?") for links inside note content; trusted app-internal links skip the prompt. Themed across 17 looks + dark; keyboard-reachable on web; a11y labelled; 44pt targets.

#### Test plan
`app/test/security/open_external_test.dart`: dangerous-scheme reject, confirm-on-untrusted, fragment/referrer-strip, no-server-fetch cases. Arch-lint test that no other file imports `url_launcher` directly.

#### Dependencies
[SN-SEC-011](security.md#sn-sec-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-014

<a id="sn-sec-014"></a>

**Harden Android exported components, intents and providers**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | android-tablet, android-phone |
| Areas | security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-PLATFORM-1`, `OWASP-A01`, `OWASP-A05`, `CWE-926`, `CWE-927`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
A malicious app on the same device (threat-model TA5) can invoke an exported Activity/Service/Provider or hijack an implicit intent to escalate privilege or read app data (TM-E-02). The secure-coding checklist §5 mandates `exported=false` by default, immutable PendingIntents, per-URI FileProvider grants, and validation of every incoming intent extra. This issue audits and hardens the Android manifest and IPC surface so only what must be exported is, and every inter-app entry point validates its caller and inputs (MASVS-PLATFORM-1).

#### Scope
**In:** set `android:exported=false` on every component that does not need to be reachable; permission-guard the ones that must be exported; make all PendingIntents explicit-component + `FLAG_IMMUTABLE`; protect any `ContentProvider`/`FileProvider` with per-URI grants (`grantUriPermissions` + `FLAG_GRANT_READ_URI_PERMISSION`), never an app-wide readable provider; validate action/data/extras on every incoming intent; ensure the share-target intent filter validates payloads via InputGuard [SN-SEC-004](security.md#sn-sec-004).
**Out:** the deep-link/App-Link filters ([SN-SEC-011](security.md#sn-sec-011), [SN-SEC-012](security.md#sn-sec-012)); iOS URL handling; WebView ([SN-SEC-015](security.md#sn-sec-015)).

#### Acceptance criteria
- [ ] Every Android component is `exported=false` unless a documented reason requires export; exported ones are permission-guarded.
- [ ] All PendingIntents are `FLAG_IMMUTABLE` with an explicit component (mobsfscan-clean for mutable-PendingIntent).
- [ ] The FileProvider exposes only per-URI-granted files; a sibling app cannot read arbitrary app files (abuse-test proven).
- [ ] Every incoming intent's action/data/extras are validated; a malformed extra is rejected, never crashes the host.
- [ ] Share-target payloads pass through InputGuard before use.

#### Technical notes
`app/android/app/src/main/AndroidManifest.xml` + Kotlin plugin glue (docs/adr/0012-native-plugin-strategy.md). Follow secure-coding checklist §5 and §9.3. mobsfscan enforces exported/PendingIntent rules ([SN-CI-001](ci-cd.md#sn-ci-001)). Threats TM-E-02, TM-S-04. Reference docs/platform/android.md.

#### Security & privacy
Threats: TM-E-02 (exported component / intent redirection). Controls: MASVS-PLATFORM-1, OWASP-A01/A05, CWE-926 (improper export of Android components), CWE-927 (exposed IPC), CWE-200 (info exposure). No new egress; reduces the local IPC attack surface.

#### UX notes
None beyond baseline (platform config). Baseline: share-into flows still work for legitimate apps; a rejected malicious intent shows nothing to the attacker (silent safe-fail), a user-safe error only to the real user.

#### Test plan
`app/test/security/android_ipc_test.dart` + instrumented test: attempt to invoke each component from a test attacker package; assert rejection; FileProvider arbitrary-read attempt fails. mobsfscan gate green. MASTG exported-component review in [SN-SEC-030](security.md#sn-sec-030).

#### Dependencies
[SN-SEC-004](security.md#sn-sec-004) (share payload validation).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-015

<a id="sn-sec-015"></a>

**Define and enforce the WebView hardening policy for mobile shells**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-PLATFORM-2`, `ASVS-V1`, `OWASP-A03`, `CWE-79`, `CWE-749`, `CWE-95` |
| Extra labels | agent-ready |

#### Context
Any WebView/WKWebView in the mobile shells is a trust boundary (TB4): XSS in rendered note HTML/markdown can disclose other notes or tokens (TM-I-06), and an over-broad JS bridge lets injected JS reach native (TM-E-03). The secure-coding checklist §6.1 mandates: never render untrusted HTML in an app-privileged WebView, no broad `@JavascriptInterface`/message handler, file/universal access disabled, and strict TLS. The default posture is **no WebView at all** for untrusted content; where one is unavoidable, this issue defines and enforces the hardened configuration.

#### Scope
**In:** an ADR-backed policy that untrusted note HTML/markdown is rendered natively (Flutter), never in a WebView; a hardened `SecureWebViewConfig` for any legitimately-needed WebView (bundled/trusted `https` origins only, JS off unless required, `allowFileAccessFromFileURLs`/`allowUniversalAccessFromFileURLs` off, navigations to `file:`/`javascript:`/`data:` blocked, no `onReceivedSslError` proceed); an allow-listed bridge (method names + arg validation) if any bridge exists; an arch-lint that flags raw WebView construction outside the secure factory.
**Out:** the web PWA CSP/Trusted Types ([SN-SEC-016](security.md#sn-sec-016)); markdown/HTML sanitisation for the native renderer (handled where note HTML is rendered, referenced here); outbound URL guard ([SN-SEC-013](security.md#sn-sec-013)).

#### Acceptance criteria
- [ ] No WebView renders untrusted (note/imported/web-fetched) HTML; note content renders through the native path.
- [ ] Any WebView uses `SecureWebViewConfig`: JS disabled unless justified, file/universal access disabled, dangerous-scheme navigation blocked, TLS errors never bypassed.
- [ ] No JS bridge is exposed to untrusted content; if a bridge exists, methods are allow-listed and args validated (abuse-test proven).
- [ ] Arch-lint fails a raw WebView built outside the secure factory.

#### Technical notes
`app/lib/web/secure_webview.dart` factory; ADR update or new ADR referencing docs/adr/0010-web-pwa-strategy.md. Follow checklist §6.1 and MASVS-PLATFORM-2. Threats TM-I-06, TM-E-03. If markdown rendering needs HTML, sanitise before the native render sink (DOMPurify-equivalent on web via [SN-SEC-016](security.md#sn-sec-016)).

#### Security & privacy
Threats: TM-I-06 (WebView XSS discloses notes/tokens), TM-E-03 (JS bridge escalation). Controls: MASVS-PLATFORM-2, ASVS-V1, OWASP-A03, CWE-79 (XSS), CWE-749 (exposed dangerous method via bridge), CWE-95 (eval injection). No untrusted HTML to a privileged context.

#### UX notes
Note rendering stays native and themed across all 17 looks + dark; any legitimate WebView (e.g. an OAuth screen) shows a trusted-origin chrome. Loading/error/offline states native. a11y preserved in the native renderer.

#### Test plan
`app/test/security/webview_policy_test.dart`: assert no untrusted-HTML WebView path; bridge allow-list + arg-validation abuse cases; dangerous-scheme block; TLS-error-no-proceed. Arch-lint unit test. MASTG WebView review in [SN-SEC-030](security.md#sn-sec-030).

#### Dependencies
Related: [SN-SEC-013](security.md#sn-sec-013), [SN-SEC-016](security.md#sn-sec-016). Cross-epic: [SN-AUTH-001](auth.md#sn-auth-001) (OAuth WebView, if any).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-016

<a id="sn-sec-016"></a>

**Enforce a strict nonce CSP with Trusted Types and DOMPurify on the web**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | security, website |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-PLATFORM-2`, `ASVS-V1`, `ASVS-V3`, `OWASP-A03`, `OWASP-A05`, `CWE-79`, `CWE-1021` |
| Extra labels | agent-ready |

#### Context
The web/PWA render surface (TB4) renders user note HTML/markdown; DOM-XSS there discloses other notes and identity tokens (threat-model TM-I-06, the highest-priority disclosure family). Because a single XSS breaks the product's confidentiality promise on the web, this is p0. The secure-coding checklist §6.2 mandates a strict, nonce-based CSP plus Trusted Types and DOMPurify on every DOM sink — killing DOM-XSS at two layers (CSP + sanitisation) independent of each other. This lands when the web app first renders note content (M2).

#### Scope
**In:** serve a strict CSP (`script-src 'nonce-{random}' 'strict-dynamic'; object-src 'none'; base-uri 'none'`, `'wasm-unsafe-eval'` where WASM loads); enable Trusted Types (`require-trusted-types-for 'script'`, named `trusted-types` policy) and route every DOM-sink write through a DOMPurify-backed sanitising policy; sanitise all note-derived HTML/markdown unconditionally (defence in depth, also for Safari/Firefox where Trusted Types is unavailable); per-request nonce generation; a CSP violation reporter.
**Out:** COOP/COEP/SRI/other headers ([SN-SEC-017](security.md#sn-sec-017)); mobile WebView ([SN-SEC-015](security.md#sn-sec-015)); the markdown editor feature itself ([SN-TXT-001](text.md#sn-txt-001)).

#### Acceptance criteria
- [ ] Response carries a strict nonce CSP with no `unsafe-inline`/`unsafe-eval` and no host allow-list as the primary defence; inline scripts without the nonce do not execute.
- [ ] Trusted Types is enabled; a raw `innerHTML` write without the policy throws (violation reported).
- [ ] Note HTML/markdown containing `<script>`, `<img onerror>`, `javascript:` URLs is sanitised — payload does not execute (proven in Chromium and in a Trusted-Types-less browser).
- [ ] A per-request random nonce is used; nonces are not reused across responses.
- [ ] CSP violations are reported to a collector without leaking note content.

#### Technical notes
Headers in the `website/`/web hosting config and the Flutter web `index.html`/service worker; sanitiser in the web render path of `app/` (CanvasKit/skwasm may need `'wasm-unsafe-eval'`, docs/adr/0010-web-pwa-strategy.md). Self-host DOMPurify (no CDN as primary). Reference checklist §6.2, research web-stylus-and-pwa-capabilities §10. Threat TM-I-06.

#### Security & privacy
Threats: TM-I-06 (DOM-XSS discloses notes/tokens). Controls: MASVS-PLATFORM-2, ASVS-V1/V3, OWASP-A03/A05, CWE-79 (XSS), CWE-1021 (improper restriction of rendered UI layers). Violation reports must carry no note content (checklist §7).

#### UX notes
Invisible in the happy path; note markdown renders identically across all 17 looks + dark. A blocked malicious payload shows the sanitised-safe content, not an error. Keyboard-reachable; contrast preserved; no functional regression for legitimate rich text.

#### Test plan
`app/test/security/web_csp_test.dart` + a headless-browser integration test (`app/integration_test/web_xss_test.dart`): inject XSS payloads into note HTML and assert non-execution under CSP and under sanitiser-only; assert nonce uniqueness; assert Trusted-Types violation on a raw sink. Verified again by ZAP in [SN-SEC-032](security.md#sn-sec-032).

#### Dependencies
Related: [SN-SEC-017](security.md#sn-sec-017), [SN-TXT-001](text.md#sn-txt-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-017

<a id="sn-sec-017"></a>

**Add COOP/COEP isolation, SRI and hardening headers on the web**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | security, website |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-016](security.md#sn-sec-016) |
| Depends on | [SN-SEC-016](security.md#sn-sec-016) |
| Security controls | `ASVS-V3`, `ASVS-V12`, `OWASP-A05`, `CWE-693`, `CWE-1021`, `CWE-353` |
| Extra labels | agent-ready |

#### Context
Multithreaded WASM (skwasm, whisper.cpp) needs cross-origin isolation (COOP + COEP) to use `SharedArrayBuffer`, and cross-origin isolation is also a Spectre-class hardening; external subresources must be pinned with SRI to survive a CDN compromise; and a set of standard security headers (referrer, nosniff, HSTS, permissions-policy) defends the share-link fragment (TM-I-09) and reduces misconfiguration risk. The secure-coding checklist §6.2 lists these as MUST/SHOULD. This completes the web header posture begun by the CSP work [SN-SEC-016](security.md#sn-sec-016).

#### Scope
**In:** set `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` (deploy `-Report-Only` first, then enforce), isolate the app on its own origin; pin every external subresource with SRI (`integrity=sha384-...` + `crossorigin`), preferring self-hosting; set `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, and a restrictive `Permissions-Policy` (deny camera/mic/geo unless a feature needs it); request `navigator.storage.persist()` from a user gesture and check `estimate()` headroom.
**Out:** the CSP/Trusted Types/sanitiser ([SN-SEC-016](security.md#sn-sec-016)); server-side ASVS for relay/entitlement ([SN-SEC-032](security.md#sn-sec-032)); PWA offline caching feature.

#### Acceptance criteria
- [ ] COOP=same-origin and COEP=require-corp are enforced; `crossOriginIsolated` is true; multithreaded WASM works.
- [ ] Every external subresource carries a valid SRI hash; a tampered subresource is blocked (proven).
- [ ] `Referrer-Policy: no-referrer`, `nosniff`, `HSTS`, and a deny-by-default `Permissions-Policy` are present on responses.
- [ ] A share-link fragment is never sent as a referrer on outbound navigation (end-to-end check with [SN-SEC-013](security.md#sn-sec-013)).
- [ ] `storage.persist()` is requested from a gesture; low-headroom is handled gracefully.

#### Technical notes
Hosting/header config for `website/` + Flutter web build (docs/adr/0010-web-pwa-strategy.md). Roll COEP as Report-Only first to catch un-CORP subresources (checklist §6.2 note). Self-host fonts/scripts. Reference research web-stylus-and-pwa-capabilities §10-11. Threats TM-I-09, TM-D-* (eviction).

#### Security & privacy
Threats: TM-I-09 (referrer leak of share-key), integrity of subresources, Spectre-class isolation. Controls: ASVS-V3/V12, OWASP-A05, CWE-693 (protection mechanism failure), CWE-1021, CWE-353 (missing integrity check). No note content in any header.

#### UX notes
None beyond baseline (headers/config). Effect: multithreaded features (skwasm rendering, on-device transcription) work; no visible change to note UI. Persist-storage prompt appears only on a user gesture, with a clear rationale.

#### Test plan
`app/test/security/web_headers_test.dart` (assert header presence/values) + integration check that `crossOriginIsolated` is true and a bad-SRI subresource is blocked. Header presence re-verified by ZAP in [SN-SEC-032](security.md#sn-sec-032).

#### Dependencies
[SN-SEC-016](security.md#sn-sec-016). Related: [SN-SEC-013](security.md#sn-sec-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-018

<a id="sn-sec-018"></a>

**Add clipboard protection controls for sensitive and locked-note content**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, privacy |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `OWASP-A01`, `CWE-200`, `CWE-524` |
| Extra labels | agent-ready, good first issue |

#### Context
The clipboard is an OS surface other apps and cloud-clipboard sync can read (threat-model TM-I-07; PRD-03 `LEAK`). The secure-coding checklist §1.2 requires: never auto-read the clipboard on launch/focus, treat pasted content as untrusted, offer a clipboard-clear timer for content copied out of a locked/secure note, and mark sensitive copies sensitive (Android `ClipDescription` `EXTRA_IS_SENSITIVE`). This issue implements those clipboard controls across surfaces.

#### Scope
**In:** never auto-read clipboard (read only on an explicit paste action); sanitise pasted HTML/markdown before render (route through the sanitiser); when copying from a locked/secure note, mark the clip sensitive (Android `EXTRA_IS_SENSITIVE`; iOS exclude from universal clipboard/`localOnly` where possible) and start a clipboard-clear timer that wipes the clip after a timeout; a Settings toggle for the clear-timer duration.
**Out:** the app/notebook lock feature itself ([SN-SEC-020](security.md#sn-sec-020)); screenshot protection ([SN-SEC-019](security.md#sn-sec-019)); the paste-parsing of images/PDF ([SN-SEC-004](security.md#sn-sec-004)).

#### Acceptance criteria
- [ ] The app never reads the clipboard on launch or focus; only an explicit paste reads it (proven — no clipboard access in cold-start trace).
- [ ] Copying from a locked/secure note marks the clip sensitive (Android `EXTRA_IS_SENSITIVE` set; iOS not shared to universal clipboard).
- [ ] A clipboard-clear timer wipes sensitive copied content after the configured timeout.
- [ ] Pasted HTML/markdown is sanitised before it reaches any render sink.

#### Technical notes
`app/` clipboard service + Kotlin/Swift plugin glue for `EXTRA_IS_SENSITIVE` / `UIPasteboard` options (docs/adr/0012). Settings toggle via [SN-SET-001](settings.md#sn-set-001). Reference checklist §1.2, §9.3; PRD-03 `LEAK`; threat TM-I-07.

#### Security & privacy
Threats: TM-I-07 (clipboard leak of secure-note content). Controls: MASVS-PLATFORM-3, MASVS-PRIVACY-1, OWASP-A01, CWE-200, CWE-524 (information exposure through caching/clipboard). No auto-read = no silent collection.

#### UX notes
Copy from a locked note shows a subtle "Copied — will clear in Ns" affordance; Settings (docs/design/screens-and-flows.md §12) exposes the clear-timer duration. Themed across 17 looks + dark; 44pt targets; a11y announces the clear affordance.

#### Test plan
`app/test/security/clipboard_test.dart`: no-auto-read (cold start), sensitive-flag-set, clear-timer-wipes, paste-sanitised cases; instrumented check of `EXTRA_IS_SENSITIVE`. MASTG clipboard review in [SN-SEC-030](security.md#sn-sec-030).

#### Dependencies
Related: [SN-SEC-020](security.md#sn-sec-020) (locked-note state), [SN-SET-001](settings.md#sn-set-001) (toggle).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-019

<a id="sn-sec-019"></a>

**Add screenshot blocking and notification-excerpt suppression for locked notes**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security, privacy |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-PLATFORM-3`, `OWASP-A01`, `CWE-200`, `CWE-359` |
| Extra labels | agent-ready, good first issue |

#### Context
Secure/locked-note content can leak via OS surfaces: screenshots, the app-switcher snapshot, screen recording, and notification previews (threat-model TM-I-07; PRD-03 `LEAK`). The secure-coding checklist §8 requires FLAG_SECURE/`isSecureTextEntry` for locked notes, excerpt-free notifications, and app-switcher redaction. This issue implements the OS-surface leak protections that compose with the app-lock feature.

#### Scope
**In:** a screenshot/record-block toggle (opt-in) that sets Android `FLAG_SECURE` and hides content in the iOS app-switcher snapshot when a locked/secure note is open; redact the app-switcher/backgrounded preview for secure notes; keep note excerpts out of local notifications (reminders/shared-note notifications show generic text); mark sensitive text fields `isSecureTextEntry` where a passphrase/recovery code is entered.
**Out:** the lock feature and biometric gate ([SN-SEC-020](security.md#sn-sec-020)); clipboard ([SN-SEC-018](security.md#sn-sec-018)); the notification content/scheduling feature ([SN-NOTF-001](notifications.md#sn-notf-001)).

#### Acceptance criteria
- [ ] With screenshot-block on and a locked note open, an Android screenshot is blocked (FLAG_SECURE) and the iOS app-switcher shows a redacted snapshot.
- [ ] Screen recording of a locked note yields no readable content on Android; iOS backgrounding hides content.
- [ ] Local notifications for shared/locked notes carry no note excerpt (generic body only).
- [ ] Passphrase/recovery-code fields use secure text entry (no keyboard cache, no preview).

#### Technical notes
Kotlin `FLAG_SECURE` on the Activity window when a secure note is foreground; Swift app-switcher blur overlay + `UITextField.isSecureTextEntry`; notification builder omits excerpts (docs/adr/0011-telemetry-and-diagnostics.md is unrelated; use [SN-NOTF-001](notifications.md#sn-notf-001)). Reference checklist §8, PRD-03 `LEAK`/`LOCK`; threat TM-I-07.

#### Security & privacy
Threats: TM-I-07 (screenshot/notification/app-switcher leak). Controls: MASVS-PLATFORM-3, OWASP-A01, CWE-200, CWE-359 (exposure of private information). Toggle is opt-in (secure default is documented in [SN-SEC-024](security.md#sn-sec-024)).

#### UX notes
Settings toggle "Block screenshots of locked notes" (docs/design/screens-and-flows.md §12); app-switcher shows a branded redaction, not a black void, themed across 17 looks + dark. a11y: the toggle is labelled; secure fields still announce via screen reader without echoing content.

#### Test plan
`app/test/security/screen_leak_test.dart` + instrumented: FLAG_SECURE set when locked note foreground; notification body excerpt-free; secure-field flag set. MASTG screenshot review in [SN-SEC-030](security.md#sn-sec-030).

#### Dependencies
Related: [SN-SEC-020](security.md#sn-sec-020), [SN-NOTF-001](notifications.md#sn-notf-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-020

<a id="sn-sec-020"></a>

**Implement app lock with biometric gate, auto-lock and RAM key scrub**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, settings |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-AUTH-3`, `MASVS-STORAGE-2`, `MASVS-PLATFORM-3`, `OWASP-A07`, `CWE-522`, `CWE-316` |
| Extra labels | agent-ready |

#### Context
A compromised, unlocked device with the app open exposes plaintext in RAM (residual risk RR2); the mitigation is app-lock with biometric re-gate, an auto-lock timeout, and scrubbing the decrypted master key from RAM on lock/background (threat-model RR2, TM-I-03; secure-coding checklist §4 SHOULD; PRD-03 `LOCK`, `PRD-LOCK-005/006`). This implements the security enforcement of app/notebook/folder lock: the biometric gate, timeout, backgrounding behaviour and key-scrub. It consumes the key hierarchy and hardware-key storage from [SN-CRY-002](security.md#sn-cry-002); it does not define crypto.

#### Scope
**In:** an app-lock state machine (locked/unlocked) gated by platform biometrics (`LAContext.deviceOwnerAuthentication` / `BiometricPrompt` with a `CryptoObject`); configurable auto-lock timeout and lock-on-background; **scrub the master/content keys from RAM on lock and on background**; per-notebook/per-folder lock composing with app lock (`PRD-LOCK-005`); locked content excluded from search/preview/share (`PRD-LOCK-006`); a passcode fallback where biometrics are unavailable.
**Out:** the key hierarchy, Keychain/Keystore storage, recovery code ([SN-CRY-001](security.md#sn-cry-001), [SN-CRY-002](security.md#sn-cry-002)); screenshot/clipboard leak controls ([SN-SEC-018](security.md#sn-sec-018), [SN-SEC-019](security.md#sn-sec-019)); identity sign-in ([SN-AUTH-001](auth.md#sn-auth-001)).

#### Acceptance criteria
- [ ] Enabling app-lock requires biometric (or passcode fallback) to unlock; a failed/cancelled auth leaves the app locked.
- [ ] Auto-lock triggers after the configured timeout and on backgrounding; re-entry requires re-auth.
- [ ] The decrypted master/content keys are wiped from RAM on lock/background (memory-scrub test proves the buffer is zeroed).
- [ ] A per-notebook/per-folder lock composes with app lock; locked content is excluded from search results, previews and share (`PRD-LOCK-006`).
- [ ] Guest note-taking is never blocked by identity; lock protects content, not sign-in (locked decision 5).

#### Technical notes
`app/lib/security/app_lock.dart` (Riverpod state) + `plugins/sane_secure_store` biometric-gated `CryptoObject` (docs/architecture/crypto.md §3 `setUserAuthenticationRequired`, `.biometryCurrentSet`). Key-scrub via zeroising buffers held only transiently (crypto.md §0, checklist §3.1). Reference PRD-03 `LOCK`, `PRD-LOCK-005/006`; threats RR2, TM-I-03. Search exclusion coordinates with [SN-SRCH-001](search.md#sn-srch-001).

#### Security & privacy
Threats: RR2 (unlocked-device RAM plaintext), TM-I-03 (key at rest/in RAM), TM-I-07 (locked-content preview). Controls: MASVS-AUTH-3 (session/app-lock), MASVS-STORAGE-2 (biometric-gated keys), MASVS-PLATFORM-3, OWASP-A07, CWE-522 (insufficiently protected credentials), CWE-316 (cleartext key in memory). Note access is never derivable from identity.

#### UX notes
Settings → lock (six-tab Settings, docs/design/screens-and-flows.md §12); a lock overlay with biometric prompt themed across 17 looks + dark; a clear "Locked" state with an unlock affordance; 44pt targets; VoiceOver/TalkBack labels; keyboard-reachable passcode entry on web. Empty state: lock disabled by default (opt-in), documented in [SN-SEC-024](security.md#sn-sec-024).

#### Test plan
`app/test/security/app_lock_test.dart`: biometric-gate, auto-lock-timeout, lock-on-background, key-scrub-on-lock, locked-content-search-exclusion, guest-unblocked cases. Widget test for the lock overlay across looks. MASTG keystore/app-lock review in [SN-SEC-029](security.md#sn-sec-029).

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002). Related: [SN-SRCH-001](search.md#sn-srch-001), [SN-SET-001](settings.md#sn-set-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-021

<a id="sn-sec-021"></a>

**Harden SaneLog redaction and add no-PII-in-logs regression tests**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | security, telemetry |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `ASVS-V16`, `MASVS-PRIVACY-2`, `OWASP-A09`, `CWE-532`, `CWE-215`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
"No PII / content in logs" is one of the three gate rules (secure-coding checklist §0/§7; threat-model TM-I-05). Note content, ink coordinates, decrypted data, keys, tokens, recovery codes, cloud file paths, email and phone numbers must never be logged; object ids are logged as opaque short hashes; `print()` is banned; hot-path draw code logs nothing in profile/release. This issue hardens the `SaneLog` facade in `sane_core` with a structured-field redaction allow-list and locks the guarantee with regression tests, so redaction is enforceable rather than per-call discipline.

#### Scope
**In:** a structured `SaneLog` API (event name + typed key/values) with a redaction **allow-list** — only allow-listed field keys are emitted, everything else is dropped/hashed; object ids emitted as opaque short hashes; a compile/lint guard that hot-path draw code logs nothing in profile/release; funnel uncaught errors through a sanitised recorder (`FlutterError.onError`, `PlatformDispatcher.onError`, per-isolate listeners); a test harness that scans emitted logs for banned patterns.
**Out:** the `print()` arch-lint ban ([SN-FND-004](devx.md#sn-fnd-004), referenced); the opt-in crash-report upload/telemetry pipeline ([SN-TEL-001](telemetry.md#sn-tel-001)); service-side logging.

#### Acceptance criteria
- [ ] `SaneLog` emits only allow-listed structured fields; a non-allow-listed value (e.g. note text, email) is dropped/redacted, never emitted (unit-proven).
- [ ] Object ids appear only as opaque short hashes in logs.
- [ ] Draw-loop code produces zero log output in profile/release (verified).
- [ ] Uncaught errors are routed through the sanitised recorder; no stack trace or internal path reaches a user-facing message.
- [ ] A regression test scans a captured log stream for banned patterns (emails, phone numbers, coordinate tuples, key/token shapes, `file://` paths) and fails on any match.

#### Technical notes
`packages/sane_core/lib/src/logging/sane_log.dart` (pure Dart). Allow-list is a `const Set<String>` of permitted field keys; a redactor runs before sink write. Reference overview §8.2, checklist §7, threat TM-I-05. Coordinate with the `print()` ban lint ([SN-FND-004](devx.md#sn-fnd-004)).

#### Security & privacy
Threats: TM-I-05 (content/PII/keys/tokens in logs). Controls: ASVS-V16 (security logging & error handling), MASVS-PRIVACY-2, OWASP-A09, CWE-532 (info in log files), CWE-215 (info via debug), CWE-200. This is a gate rule — a violation blocks merge.

#### UX notes
None beyond baseline (developer-facing). Baseline: user-facing errors are user-safe `Failure` messages, never raw exceptions or internal paths (checklist §7).

#### Test plan
`packages/sane_core/test/security/sane_log_redaction_test.dart`: allow-list-drops-unknown, id-hashing, banned-pattern-scan, draw-loop-silent-in-profile, sanitised-uncaught-error cases. This is the reusable no-PII assertion imported by other suites.

#### Dependencies
Related: [SN-FND-004](devx.md#sn-fnd-004) (`print()` ban), [SN-TEL-001](telemetry.md#sn-tel-001) (crash upload).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-022

<a id="sn-sec-022"></a>

**Enforce TLS 1.2+, no cleartext and certificate pinning for our endpoints**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | security, sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-NETWORK-1`, `MASVS-NETWORK-2`, `ASVS-V12`, `OWASP-A02`, `CWE-295`, `CWE-319` |
| Extra labels | agent-ready |

#### Context
Every network call must use TLS 1.2+ with no cleartext, and our own endpoints (relay, entitlement) must be certificate-pinned so a network attacker (TA3) with a rogue CA cannot MITM (threat-model TM-T-01, TM-I-01; secure-coding checklist §8; MASVS-NETWORK-1/2). Third-party APIs (Apple/Google/Microsoft) use system trust (pinning them is brittle). This establishes the transport-security baseline for the few network calls Sane Notes makes; note payloads are already ciphertext-only, so this defends metadata and integrity.

#### Scope
**In:** disable cleartext (`android:usesCleartextTraffic=false`, iOS ATS on with no arbitrary-loads exception); enforce TLS 1.2+ minimum; certificate/public-key pinning for the relay and entitlement endpoints with a documented backup-pin + rotation plan; never bypass TLS errors (`onReceivedSslError` proceed banned); a pinning-failure closes the connection and surfaces a user-safe error; keep the egress inventory (every network call listed with purpose + data sent).
**Out:** the sync/cloud-drive adapters themselves ([SN-SYNC-001](sync.md#sn-sync-001)); OIDC/token flows ([SN-AUTH-001](auth.md#sn-auth-001)); WebView TLS ([SN-SEC-015](security.md#sn-sec-015)); relay server config ([SN-COL-001](collaboration.md#sn-col-001)).

#### Acceptance criteria
- [ ] No cleartext endpoint exists; Android `usesCleartextTraffic=false` and iOS ATS enforced (build-config check).
- [ ] TLS below 1.2 is refused for our endpoints.
- [ ] A MITM with a rogue-CA certificate on the relay/entitlement endpoint is blocked by pinning (test proven); connection fails closed.
- [ ] A backup pin + rotation procedure is documented so a cert rotation does not brick clients.
- [ ] Third-party API calls use system trust (not pinned), documented rationale.

#### Technical notes
Pinning in `packages/sane_sync` / plugins network client (docs/adr/0006-sync-over-user-cloud-drives.md, 0013-collaboration-transport.md). Prefer SPKI public-key pins with a backup pin. Reference checklist §8/§9.2/§9.3, controls-matrix MASVS-NETWORK, threats TM-T-01/TM-I-01. Egress inventory lives in the PR + threat model.

#### Security & privacy
Threats: TM-T-01 (tamper in transit), TM-I-01 adjacency (metadata confidentiality), TM-S-01 (token interception). Controls: MASVS-NETWORK-1/2, ASVS-V12, OWASP-A02, CWE-295 (improper cert validation), CWE-319 (cleartext transmission). Note payloads remain ciphertext-only regardless.

#### UX notes
None beyond baseline (transport). A pinning failure surfaces "Couldn't connect securely — try again" (user-safe), never a raw TLS error; offline/degraded states handled by the sync layer. Themed error toast across looks.

#### Test plan
`packages/sane_sync/test/security/pinning_test.dart`: rogue-CA-blocked, TLS<1.2-refused, backup-pin-accepted, no-cleartext cases; a MitM harness test. MASTG pinning/network review in [SN-SEC-031](security.md#sn-sec-031).

#### Dependencies
Related: [SN-SYNC-001](sync.md#sn-sync-001), [SN-COL-001](collaboration.md#sn-col-001), [SN-AUTH-001](auth.md#sn-auth-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-023

<a id="sn-sec-023"></a>

**Exclude keys and sensitive stores from OS auto-backup**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security, storage |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `OWASP-A02`, `CWE-200`, `CWE-538` |
| Extra labels | agent-ready |

#### Context
iCloud/Android auto-backup can silently exfiltrate keys and sensitive stores in the clear if not excluded (threat-model TM-I-10). The secure-coding checklist §3.1/§8 and crypto.md §3 require key material to be excluded from OS auto-backup, the encrypted DB handled correctly, and Android `allowBackup`/`fullBackupContent` rules and iOS exclude-from-backup applied. This closes the backup row of MASVS-STORAGE and is part of the M4 exit criterion "keys never hit disk/logs/backups" (docs/roadmap.md M4).

#### Scope
**In:** set Android `android:allowBackup` rules and `fullBackupContent`/`dataExtractionRules` to exclude the key store and sensitive DB/blobs; mark iOS key material and sensitive caches exclude-from-backup and with the right Data Protection class (`NSFileProtectionComplete`); confirm the Keychain wrapped-MK copy uses the intended accessibility (`kSecAttrAccessibleWhenUnlockedThisDeviceOnly` for device-bound; `synchronizable` only for the deliberate iCloud-Keychain escrow); verify no decrypted key ever lands in a backup.
**Out:** the key hierarchy and Keychain/Keystore storage ([SN-CRY-002](security.md#sn-cry-002)); the recovery-code escrow ([SN-CRY-003](security.md#sn-cry-003)); the drift schema ([SN-CORE-004](storage.md#sn-core-004)).

#### Acceptance criteria
- [ ] Android backup excludes the key store and sensitive DB/blobs (verified via a backup dump containing no key material).
- [ ] iOS key material and sensitive caches are exclude-from-backup with the correct Data Protection class.
- [ ] The device-bound wrapped-MK uses `...ThisDeviceOnly` accessibility; only the intentional iCloud-Keychain escrow copy is `synchronizable`.
- [ ] A restore from backup on a new device recovers notes only via the designed key-source ladder, never via a leaked plaintext key.

#### Technical notes
`app/android` `dataExtractionRules.xml`/`fullBackupContent.xml` + manifest; iOS `isExcludedFromBackup` + Data Protection; coordinate accessibility flags with `plugins/sane_secure_store` (crypto.md §3). Reference checklist §3.1/§8, threat TM-I-10, controls-matrix MASVS-STORAGE.

#### Security & privacy
Threats: TM-I-10 (backup exfiltrates keys/notes). Controls: MASVS-STORAGE-1/2, OWASP-A02, CWE-200, CWE-538 (file/dir information exposure). Enforces the zero-knowledge promise across the backup surface.

#### UX notes
None beyond baseline (config). Effect: a device backup/restore never leaks keys; onboarding's recovery-code messaging ([SN-CRY-003](security.md#sn-cry-003)) remains the only recovery path. No visible UI.

#### Test plan
`app/test/security/backup_exclusion_test.dart` + instrumented `adb backup`/iOS backup inspection: assert no key material/sensitive store in the backup; accessibility-flag assertions. MASTG backup review in [SN-SEC-029](security.md#sn-sec-029).

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002). Related: [SN-CRY-003](security.md#sn-cry-003), [SN-CORE-004](storage.md#sn-core-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-024

<a id="sn-sec-024"></a>

**Audit and enforce privacy-preserving secure defaults**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | security, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-3`, `ASVS-V13`, `OWASP-A05`, `CWE-1188`, `CWE-276` |
| Extra labels | agent-ready |

#### Context
Secure and privacy-preserving defaults are a MUST (secure-coding checklist §8; controls-matrix ASVS-V13, MASVS-PRIVACY-1; NIST SSDF PW.9): telemetry off (opt-in), cloud AI off (per-request opt-in), no analytics SDK linked, sync off until the user picks a cloud, OS permissions requested lazily in-context with a rationale, and debug/auth-bypass disabled in non-dev flavours. This issue is the standing audit that asserts every default ships in the safe position and adds tests that fail if a default flips.

#### Scope
**In:** a secure-defaults registry + assertion tests covering: telemetry off, cloud AI off, no analytics/telemetry SDK linked (dependency check), sync off until a cloud is chosen, lazy in-context permission requests (no launch-time prompts, least privilege), the "data leaves device" banner shown before any cloud egress, and non-dev flavours asserting debug features + auth bypass are absent; a CI check that fails on a new dependency pulling a network analytics SDK.
**Out:** the auth-bypass three-layer guard implementation ([SN-AUTH-002](auth.md#sn-auth-002), referenced); the telemetry pipeline ([SN-TEL-001](telemetry.md#sn-tel-001)); the privacy dashboard UI and store labels ([SN-PRV-001](privacy.md#sn-prv-001)); permission-request UX copy per feature (owning features).

#### Acceptance criteria
- [ ] Tests assert telemetry, cloud AI and sync are all off by default on first run.
- [ ] A dependency check fails if a package pulls a network analytics/telemetry SDK (checklist §10).
- [ ] No OS permission is requested at launch; each is requested lazily in-context with a rationale (audited per permission).
- [ ] The "data leaves device" banner is shown before any cloud AI/network egress (UI test).
- [ ] In beta/release flavours, debug features and the auth bypass are asserted absent (composes with [SN-AUTH-002](auth.md#sn-auth-002)).

#### Technical notes
`app/lib/config/secure_defaults.dart` registry + `app/test/security/secure_defaults_test.dart`; dependency check in CI ([SN-CI-001](ci-cd.md#sn-ci-001) referenced). Reference checklist §8, controls-matrix ASVS-V13 / MASVS-PRIVACY / SSDF PW.9; locked decision 8. Banner ties to TM-R-03/TM-P-06.

#### Security & privacy
Threats: TM-P-06 (unawareness), TM-R-03 (unseen egress), TM-P-04/08 (detectability/AI). Controls: MASVS-PRIVACY-1, MASVS-PLATFORM-3, ASVS-V13, OWASP-A05, CWE-1188 (insecure default), CWE-276 (incorrect default permissions). Privacy-by-default is the product promise.

#### UX notes
Settings shows every data-sharing toggle in the off position by default (docs/design/screens-and-flows.md §12); the "data leaves device" banner is prominent, themed across all 17 looks + dark; permission rationales are in-context. a11y: toggles labelled with state; banner announced by screen reader.

#### Test plan
`app/test/security/secure_defaults_test.dart`: defaults-off, no-analytics-dep, no-launch-permission, banner-before-egress, no-bypass-in-release cases. Integration test for the banner. Re-verified in MASVS-PRIVACY MASTG review ([SN-SEC-029](security.md#sn-sec-029)).

#### Dependencies
Related: [SN-AUTH-002](auth.md#sn-auth-002), [SN-TEL-001](telemetry.md#sn-tel-001), [SN-PRV-001](privacy.md#sn-prv-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-025

<a id="sn-sec-025"></a>

**Establish the security regression test suite scaffold**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | security, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-021](security.md#sn-sec-021) |
| Security controls | `ASVS-V15`, `MASVS-CODE-3`, `OWASP-A04`, `CWE-1120` |
| Extra labels | agent-ready |

#### Context
Security tests are first-class and every fixed vuln must get a regression test so it cannot return (CLAUDE.md §10; docs/security/ssdlc-process.md §3). This issue stands up the `app/test/security/` suite structure and shared helpers so every security control across the epic lands its named verification in one discoverable place, and every disclosed/fixed vulnerability adds a permanent regression test. It scaffolds early (M1) and grows with the product.

#### Scope
**In:** the `app/test/security/` directory convention + a `security_test_helpers.dart` (log-capture/banned-pattern scanner reused from [SN-SEC-021](security.md#sn-sec-021), an attacker-intent/link forger, a fixture builder for malformed inputs, a memory-scrub asserter); a CONTRIBUTING note that a fixed vuln requires a regression test referencing its advisory id; a CI grouping that runs the security suite as a required check; index the auth-bypass reachability test ([SN-AUTH-002](auth.md#sn-auth-002)) and the crypto fail-closed tests ([SN-CRY-001](security.md#sn-cry-001)) into the group.
**Out:** the individual control tests (each control issue writes its own); MobSF/ZAP/fuzz verification ([SN-SEC-029](security.md#sn-sec-029)..[SN-SEC-032](security.md#sn-sec-032)); the auth-bypass implementation ([SN-AUTH-002](auth.md#sn-auth-002)).

#### Acceptance criteria
- [ ] `app/test/security/` exists with shared helpers (log-capture, link-forger, malformed-fixture builder, memory-scrub asserter) and dartdoc.
- [ ] The security suite runs as a required CI check and is green on the scaffold.
- [ ] The suite indexes/aggregates the auth-bypass reachability test and crypto fail-closed tests when they land.
- [ ] The contribution rule "every fixed vuln adds a regression test tagged with its advisory id" is documented and linkable.

#### Technical notes
`app/test/security/security_test_helpers.dart`; reuse the redaction scanner from [SN-SEC-021](security.md#sn-sec-021). Wire a `flutter test app/test/security` group into CI ([SN-CI-001](ci-cd.md#sn-ci-001) referenced). Reference ssdlc §3 (regression rule), CLAUDE.md §10. Cross-links to [SN-AUTH-002](auth.md#sn-auth-002), [SN-CRY-001](security.md#sn-cry-001).

#### Security & privacy
Threats: process coverage — prevents regressions of any fixed vuln (all `TM-*`). Controls: ASVS-V15, MASVS-CODE-3, OWASP-A04, CWE-1120 (excessive code complexity mitigated by shared helpers/test discipline). Fixtures contain only synthetic data (no PII).

#### UX notes
None beyond baseline (developer tooling). Baseline: test fixtures never embed real user content, tokens or secrets.

#### Test plan
Self-test: the helpers have their own tests (`app/test/security/helpers_test.dart`); a sample control test demonstrates the pattern; CI runs the group. Grows as controls land.

#### Dependencies
[SN-SEC-021](security.md#sn-sec-021). Related: [SN-AUTH-002](auth.md#sn-auth-002), [SN-CRY-001](security.md#sn-cry-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-026

<a id="sn-sec-026"></a>

**Decide the anti-tamper and MASVS-RESILIENCE posture in an ADR**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security |
| Size | M |
| SDLC | design |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `MASVS-RESILIENCE-1`, `MASVS-RESILIENCE-2`, `MASVS-RESILIENCE-3`, `MASVS-RESILIENCE-4`, `OWASP-A08`, `CWE-693` |
| Extra labels | needs-decision |

#### Context
The MASVS "+R" profile (E2EE + paid tiers) requires decisions on tamper/root/jailbreak detection, code/resource integrity, obfuscation/anti-debugging and device attestation (controls-matrix §1 MASVS-RESILIENCE; threat-model RR6, TM-T-04). These are **best-effort, not absolute** (a rooted/jailbroken device defeats hardware key gating for a determined local attacker — RR6) and must never block guest note-taking. Because the exact posture (which checks, how aggressive, blocking vs advisory, which tiers) is a maintainer judgement with UX and false-positive trade-offs, it needs a decision (`needs-decision`) recorded in an ADR before the implementing issues proceed.

#### Scope
**In:** an ADR that decides: (a) root/jailbreak detection scope and whether it is advisory or gates paid/E2EE features; (b) code/resource integrity checks (beyond store signing); (c) obfuscation/anti-debugging level for release; (d) device attestation (Play Integrity / App Attest) scope and tiers; (e) the explicit statement that none of these block guest note-taking and all are best-effort (RR6). It sets the acceptance criteria for [SN-SEC-027](security.md#sn-sec-027) and [SN-SEC-028](security.md#sn-sec-028).
**Out:** implementing detection/attestation ([SN-SEC-027](security.md#sn-sec-027)); implementing obfuscation ([SN-SEC-028](security.md#sn-sec-028)); binary-protection scanner rules ([SN-CI-001](ci-cd.md#sn-ci-001)).

#### Acceptance criteria
- [ ] A new `docs/adr/00NN-anti-tamper-and-resilience.md` records the decision with Context/Decision/Alternatives/Consequences/How-to-verify/Status (CLAUDE.md §11).
- [ ] The ADR states detection is best-effort (RR6) and never blocks guest note-taking (locked decision 5).
- [ ] It specifies which tiers/features gate on attestation and the graceful-degradation behaviour.
- [ ] It names the verification (MASTG anti-tamper review) inherited by [SN-SEC-027](security.md#sn-sec-027)/[SN-SEC-028](security.md#sn-sec-028) and updates controls-matrix RESILIENCE rows.

#### Technical notes
Add the ADR and link it from docs/architecture/overview.md Appendix B; update docs/security/controls-matrix.md RESILIENCE-1..4 owners/status. Reference threat-model RR6, TM-T-04, TM-E-... resilience; research android/apple capabilities for attestation. Maintainer decision required — carries `needs-decision`.

#### Security & privacy
Threats: TM-T-04 (tampered binary/dynamic code), RR6 (root/jailbreak defeats key gating). Controls: MASVS-RESILIENCE-1/2/3/4, OWASP-A08, CWE-693. Privacy note: attestation must not introduce a persistent cross-session identifier without a threat-model row (checklist §11).

#### UX notes
None beyond baseline (decision doc). The ADR must ensure any user-visible resilience behaviour (e.g. "this device is rooted — cloud sync of E2EE notebooks is limited") is honest, non-punitive and never blocks local note-taking.

#### Test plan
No automated test (design/ADR). Review gate: Security Owner sign-off recorded in the ADR (ssdlc §2.2). The verification methods it names are tested by the child issues.

#### Dependencies
None. Blocks [SN-SEC-027](security.md#sn-sec-027), [SN-SEC-028](security.md#sn-sec-028).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-027

<a id="sn-sec-027"></a>

**Implement root/jailbreak detection and device attestation for paid/E2EE tiers**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security, compat |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SEC-026](security.md#sn-sec-026) |
| Depends on | [SN-SEC-026](security.md#sn-sec-026) |
| Security controls | `MASVS-RESILIENCE-1`, `MASVS-RESILIENCE-4`, `OWASP-A08`, `CWE-693`, `CWE-919` |
| Extra labels | needs-credentials |

#### Context
Per the resilience ADR [SN-SEC-026](security.md#sn-sec-026), paid/E2EE tiers get best-effort root/jailbreak detection and device attestation (Play Integrity on Android, DeviceCheck + App Attest on Apple) — controls-matrix MASVS-RESILIENCE-1/4 (currently Planned); threat-model RR6. Detection is advisory/gating per the ADR, never blocks guest note-taking, and degrades gracefully where a device or platform lacks the capability. Attestation requires maintainer-supplied keys/project config (Play Integrity, App Attest), so this carries `needs-credentials`.

#### Scope
**In:** a capability-queried resilience module: root/jailbreak heuristics (best-effort), Play Integrity + App Attest/DeviceCheck integration for attesting paid/E2EE actions; the ADR-decided behaviour (advisory banner vs feature gate); graceful degradation where attestation is unavailable; no persistent cross-session identifier beyond what the ADR/threat-model approves.
**Out:** the obfuscation/integrity build config ([SN-SEC-028](security.md#sn-sec-028)); the entitlement verification ([SN-BILL-001](billing.md#sn-bill-001)); the resilience decision ([SN-SEC-026](security.md#sn-sec-026)).

#### Acceptance criteria
- [ ] Root/jailbreak heuristics run best-effort and never block guest note-taking (proven: guest flow unaffected on a rooted emulator).
- [ ] Play Integrity (Android) and App Attest/DeviceCheck (Apple) attest the ADR-specified paid/E2EE actions; a failed attestation follows the ADR behaviour (advisory or gate).
- [ ] Where attestation is unavailable, the feature degrades gracefully per the ADR (no crash, no lockout of local notes).
- [ ] No new persistent identifier is introduced without a threat-model row.

#### Technical notes
`plugins/` native modules (Kotlin Play Integrity, Swift App Attest) behind a Dart platform-interface (docs/adr/0012-native-plugin-strategy.md); capability query (not platform check). Requires the Play Integrity project + Apple App Attest config (maintainer secrets). Reference [SN-SEC-026](security.md#sn-sec-026) ADR, controls-matrix RESILIENCE-1/4, RR6.

#### Security & privacy
Threats: RR6 (root/jailbreak), TM-T-04 (tamper). Controls: MASVS-RESILIENCE-1/4, OWASP-A08, CWE-693, CWE-919 (weaknesses in mobile). Privacy: attestation nonce is per-request, not a stable identifier; documented in the threat model.

#### UX notes
If the ADR chose advisory: a non-punitive notice ("This device appears rooted; E2EE sync is best-effort here") themed across 17 looks + dark, never blocking local notes. a11y labelled. Guest note-taking always works.

#### Test plan
`app/test/security/resilience_test.dart` + instrumented: guest-unaffected-on-root, attestation-pass/fail-behaviour, graceful-degradation cases. MASTG anti-tamper review in [SN-SEC-031](security.md#sn-sec-031). Attestation integration test gated on credentials.

#### Dependencies
[SN-SEC-026](security.md#sn-sec-026). Cross-epic: [SN-BILL-001](billing.md#sn-bill-001) (tier gating).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-028

<a id="sn-sec-028"></a>

**Enforce release obfuscation, symbol stripping and debug-off assertions**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security, release |
| Size | S |
| SDLC | release |
| Parent | [SN-SEC-026](security.md#sn-sec-026) |
| Depends on | [SN-SEC-026](security.md#sn-sec-026) |
| Security controls | `MASVS-RESILIENCE-2`, `MASVS-RESILIENCE-3`, `MASVS-CODE-4`, `OWASP-A05`, `CWE-489`, `CWE-656` |
| Extra labels | agent-ready |

#### Context
Dart AOT is reversible, so release builds MUST be obfuscated with split debug info and symbols stripped (secure-coding checklist §9.1; controls-matrix MASVS-RESILIENCE-3), and debug features/verbose logging/the auth bypass MUST be absent in non-dev flavours (checklist §8). This issue wires `--obfuscate --split-debug-info` into the release build, strips symbols, and adds a CI build-config assertion that a release artifact is obfuscated and carries no debug flags — implementing the RESILIENCE-3 (Designed) and RESILIENCE-2 (Partial) rows decided by [SN-SEC-026](security.md#sn-sec-026).

#### Scope
**In:** add `--obfuscate --split-debug-info=<dir>` to the release build flavour; strip native symbols; retain the split debug symbols as a CI artifact for crash-symbolication (not shipped); a build-config check asserting the release artifact is obfuscated, has no debug flag, no verbose logging, and no auth-bypass symbol; document the symbol-retention/rotation.
**Out:** signing/notarization/SBOM/provenance ([SN-REL-001](release.md#sn-rel-001), [SN-CI-004](ci-cd.md#sn-ci-004)); the auth-bypass three-layer guard ([SN-AUTH-002](auth.md#sn-auth-002)); attestation ([SN-SEC-027](security.md#sn-sec-027)); the resilience ADR ([SN-SEC-026](security.md#sn-sec-026)).

#### Acceptance criteria
- [ ] Release builds are produced with `--obfuscate --split-debug-info`; the shipped binary contains no readable Dart symbol names (spot-checked).
- [ ] Native symbols are stripped from the release artifact; split debug info is retained as a non-shipped CI artifact.
- [ ] A CI check fails a release build that is not obfuscated, has a debug flag, or contains an auth-bypass symbol.
- [ ] Crash reports can still be symbolicated from the retained split debug info.

#### Technical notes
Build flavours in `app/` + CI release job (docs/adr/0003, [SN-FND-005](devx.md#sn-fnd-005) flavours; devsecops-pipeline release stage). The obfuscation assertion greps the artifact for banned symbols. Reference checklist §9.1/§8, controls-matrix RESILIENCE-2/3, threat TM-T-04. Composes with [SN-AUTH-002](auth.md#sn-auth-002) bypass guard.

#### Security & privacy
Threats: TM-T-04 (reverse-engineering/tamper), TM-E-01 adjacency (bypass symbol absent). Controls: MASVS-RESILIENCE-2/3, MASVS-CODE-4, OWASP-A05, CWE-489 (active debug code), CWE-656 (reliance on obscurity — noted as defence-in-depth only, not a primary control). No PII in symbol files.

#### UX notes
None beyond baseline (build config). Baseline: crash reports remain opt-in and redacted; symbolication uses non-shipped debug info only.

#### Test plan
`tools/scripts/verify-obfuscation.mjs` in CI: assert obfuscated + no debug flag + no bypass symbol on a release artifact; a symbolication round-trip test. Verified again in MASVS-RESILIENCE MASTG review ([SN-SEC-031](security.md#sn-sec-031)).

#### Dependencies
[SN-SEC-026](security.md#sn-sec-026). Related: [SN-FND-005](devx.md#sn-fnd-005), [SN-AUTH-002](auth.md#sn-auth-002), [SN-REL-001](release.md#sn-rel-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-029

<a id="sn-sec-029"></a>

**Run MASVS L2 verification for storage, keys, crypto and backup**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-020](security.md#sn-sec-020), [SN-SEC-023](security.md#sn-sec-023) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `OWASP-A02`, `CWE-312`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
M7 requires MASVS 2.x L2+R verification against the controls matrix (docs/roadmap.md M7; controls-matrix §1-2). This issue is the storage/crypto slice: run the MASTG procedures for data-at-rest, key storage, cryptography and backup on a release-candidate build, confirm content DB rows are ciphertext, keys are non-exportable and biometric-gated, backups exclude key material, and map every finding to a MASWE/MASVS id with a fix or risk-acceptance. It consumes MobSF static/dynamic output (the MobSF job is CI-owned) and adds the manual/assisted MASTG verification.

#### Scope
**In:** execute and record MASTG-TEST storage/keystore/crypto/backup procedures (MASTG-TEST-0200/0201 data-storage, keystore review, crypto-algorithm review, backup review — verify current ids) on the RC; assert DB content rows are ciphertext, keys never on disk/prefs/backup, biometric gating, approved primitives only; triage MobSF storage/crypto findings; produce a MASVS-STORAGE/CRYPTO verification report mapping each control to a pass/finding.
**Out:** platform/webview/deeplink verification ([SN-SEC-030](security.md#sn-sec-030)); network/resilience verification ([SN-SEC-031](security.md#sn-sec-031)); adding the MobSF CI job ([SN-CI-001](ci-cd.md#sn-ci-001)); the crypto implementation ([SN-CRY-001](security.md#sn-cry-001)).

#### Acceptance criteria
- [ ] MASTG storage/keystore/crypto/backup procedures executed on the RC and recorded with evidence.
- [ ] Content DB rows and blobs are verified ciphertext; keys verified non-exportable, biometric-gated and backup-excluded.
- [ ] Only approved primitives are present (no ECB/static-IV/MD5/SHA-1/non-CSPRNG); confirmed against docs/architecture/crypto.md §1.
- [ ] Every finding is mapped to a MASVS/MASWE id with a fix or an explicit Security-Owner risk-acceptance.
- [ ] No unresolved high MASVS-STORAGE/CRYPTO or Mobile-Top-10 M9/M10 finding remains.

#### Technical notes
Verification report under `docs/security/verification/masvs-storage-crypto.md`; consume MobSF SARIF from the CI job (devsecops-pipeline §2.4). Reference controls-matrix §1 STORAGE/CRYPTO + §5 M9/M10; crypto.md §9 compliance map. Depends on the storage/lock/backup controls having landed.

#### Security & privacy
Threats: TM-I-01/02/03 (disclosure/key), TM-I-10 (backup), TM-T-01 (AEAD integrity). Controls: MASVS-STORAGE-1/2, MASVS-CRYPTO-1/2, OWASP-A02, CWE-312 (cleartext storage), CWE-522. Report contains no user content (synthetic test data only).

#### UX notes
None beyond baseline (verification). Baseline: verification evidence/screenshots carry no real user content, keys or tokens.

#### Test plan
The verification report is the deliverable; backing assertions live in `app/test/security/` (app-lock, backup-exclusion). MobSF RC scan triaged. Feeds the M7 exit gate ([SN-SEC-034](security.md#sn-sec-034)).

#### Dependencies
[SN-SEC-020](security.md#sn-sec-020), [SN-SEC-023](security.md#sn-sec-023). Cross-epic: [SN-CRY-001](security.md#sn-cry-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-030

<a id="sn-sec-030"></a>

**Run MASVS L2 verification for platform, WebView, deep links and leaks**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-011](security.md#sn-sec-011), [SN-SEC-014](security.md#sn-sec-014), [SN-SEC-015](security.md#sn-sec-015), [SN-SEC-018](security.md#sn-sec-018), [SN-SEC-019](security.md#sn-sec-019) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PLATFORM-3`, `OWASP-A01`, `CWE-926`, `CWE-79` |
| Extra labels | agent-ready |

#### Context
The platform slice of the M7 MASVS 2.x L2 verification (controls-matrix §1 PLATFORM): run the MASTG procedures for exported components, deep links / App Links / Universal Links, WebView configuration, and UI-disclosure (screenshots/clipboard/notifications/backup), confirming the hardening from SN-SEC-011/014/015/018/019 holds on a release-candidate build and mapping every finding to a MASVS/MASWE id (docs/roadmap.md M7 pentest exercises deep-link forgery, intent redirection, WebView XSS).

#### Scope
**In:** execute and record MASTG exported-component, deep-link, WebView and screenshot/clipboard reviews on the RC; verify `exported=false` defaults, verified-link-only sensitive routes, hardened WebView config + no untrusted-HTML path + no broad bridge, FLAG_SECURE/app-switcher redaction and excerpt-free notifications; run the forged-deep-link and intent-redirection abuse cases; triage mobsfscan/MobSF platform findings; produce a MASVS-PLATFORM verification report.
**Out:** storage/crypto verification ([SN-SEC-029](security.md#sn-sec-029)); network/resilience verification ([SN-SEC-031](security.md#sn-sec-031)); web ASVS ([SN-SEC-032](security.md#sn-sec-032)).

#### Acceptance criteria
- [ ] MASTG platform/deep-link/WebView/UI-disclosure procedures executed and recorded on the RC.
- [ ] A forged deep link cannot mutate state (abuse-test confirmed); custom-scheme sensitive routes are refused.
- [ ] No WebView renders untrusted HTML; no over-broad JS bridge; hardened config verified.
- [ ] FLAG_SECURE / app-switcher redaction / excerpt-free notifications verified for locked notes.
- [ ] Every finding mapped to MASVS/MASWE with a fix or Security-Owner risk-acceptance; no unresolved high finding.

#### Technical notes
Report under `docs/security/verification/masvs-platform.md`; consume mobsfscan/MobSF SARIF. Reference controls-matrix §1 PLATFORM + §5 M4/M8; threats TM-S-04, TM-E-02, TM-I-06, TM-I-07. Depends on the platform controls having landed.

#### Security & privacy
Threats: TM-S-04, TM-E-02, TM-I-06, TM-I-07. Controls: MASVS-PLATFORM-1/2/3, OWASP-A01, CWE-926, CWE-79. Report carries no user content.

#### UX notes
None beyond baseline (verification). Baseline: evidence carries no real note content.

#### Test plan
Verification report + the backing abuse tests in `app/test/security/` (link_guard, android_ipc, webview_policy, screen_leak, clipboard). Feeds the M7 exit gate ([SN-SEC-034](security.md#sn-sec-034)).

#### Dependencies
[SN-SEC-011](security.md#sn-sec-011), [SN-SEC-014](security.md#sn-sec-014), [SN-SEC-015](security.md#sn-sec-015), [SN-SEC-018](security.md#sn-sec-018), [SN-SEC-019](security.md#sn-sec-019).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-031

<a id="sn-sec-031"></a>

**Run MASVS L2 verification for network and resilience**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | security, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-022](security.md#sn-sec-022), [SN-SEC-027](security.md#sn-sec-027), [SN-SEC-028](security.md#sn-sec-028) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-NETWORK-2`, `MASVS-RESILIENCE-1`, `MASVS-RESILIENCE-3`, `OWASP-A02`, `CWE-295`, `CWE-319` |
| Extra labels | agent-ready |

#### Context
The network + resilience slice of the M7 MASVS 2.x L2+R verification (controls-matrix §1 NETWORK/RESILIENCE): run MASTG procedures for TLS/cleartext and certificate validation/pinning, and for anti-tamper/obfuscation/attestation, on a release-candidate build. Confirm the transport-security ([SN-SEC-022](security.md#sn-sec-022)) and resilience ([SN-SEC-027](security.md#sn-sec-027), [SN-SEC-028](security.md#sn-sec-028)) controls hold, a MitM is blocked, no cleartext exists, and the +R posture matches the ADR ([SN-SEC-026](security.md#sn-sec-026)).

#### Scope
**In:** execute and record MASTG network review (TLS 1.2+, no cleartext, pinning, no SSL-error-proceed) and anti-tamper/obfuscation/attestation review on the RC; run a MitM harness against our endpoints; confirm obfuscation + no debug symbols + no bypass symbol; confirm root/jailbreak + attestation behaviour matches the ADR; triage MobSF network/resilience findings; produce a MASVS-NETWORK/RESILIENCE verification report.
**Out:** storage/crypto ([SN-SEC-029](security.md#sn-sec-029)); platform/webview ([SN-SEC-030](security.md#sn-sec-030)); web ASVS/ZAP ([SN-SEC-032](security.md#sn-sec-032)).

#### Acceptance criteria
- [ ] MASTG network + resilience procedures executed and recorded on the RC.
- [ ] A MitM with a rogue CA is blocked by pinning; no cleartext endpoint; TLS<1.2 refused.
- [ ] Release artifact is obfuscated, symbol-stripped, and carries no auth-bypass symbol.
- [ ] Root/jailbreak + attestation behaviour matches the [SN-SEC-026](security.md#sn-sec-026) ADR and never blocks guest notes.
- [ ] Every finding mapped to MASVS/MASWE with a fix or Security-Owner risk-acceptance; no unresolved high finding.

#### Technical notes
Report under `docs/security/verification/masvs-network-resilience.md`; consume MobSF SARIF. Reference controls-matrix §1 NETWORK/RESILIENCE + §5 M5/M7; threats TM-T-01/TM-I-01/TM-T-04/RR6. Depends on the network + resilience controls having landed.

#### Security & privacy
Threats: TM-T-01, TM-I-01, TM-T-04, RR6. Controls: MASVS-NETWORK-1/2, MASVS-RESILIENCE-1/3, OWASP-A02, CWE-295, CWE-319. Report carries no user content.

#### UX notes
None beyond baseline (verification).

#### Test plan
Verification report + backing tests (`packages/sane_sync/test/security/pinning_test.dart`, `app/test/security/resilience_test.dart`, `tools/scripts/verify-obfuscation.mjs`). Feeds the M7 exit gate ([SN-SEC-034](security.md#sn-sec-034)).

#### Dependencies
[SN-SEC-022](security.md#sn-sec-022), [SN-SEC-027](security.md#sn-sec-027), [SN-SEC-028](security.md#sn-sec-028).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-032

<a id="sn-sec-032"></a>

**Run ASVS 5.0 L2 verification for the web client and relay**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | web |
| Areas | security, website |
| Size | L |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-SEC-016](security.md#sn-sec-016), [SN-SEC-017](security.md#sn-sec-017) |
| Security controls | `ASVS-V1`, `ASVS-V3`, `ASVS-V12`, `ASVS-V13`, `ASVS-V16`, `OWASP-A03`, `OWASP-A05`, `CWE-79`, `CWE-693` |
| Extra labels | agent-ready |

#### Context
M7 requires OWASP ASVS 5.0 L2 verification for the web client and the (optional, stateless, ciphertext-only) relay/entitlement services (controls-matrix §3; docs/roadmap.md M7). This runs a ZAP full active scan against the staging web + relay (OpenAPI import), verifies the CSP/Trusted Types/DOMPurify ([SN-SEC-016](security.md#sn-sec-016)), COOP/COEP/SRI/headers ([SN-SEC-017](security.md#sn-sec-017)) and the applicable ASVS chapters, and triages every finding to resolution — the web counterpart of the MASVS mobile verification.

#### Scope
**In:** map each applicable ASVS 5.0 chapter (V1 encoding/sanitisation, V3 frontend, V12 secure comms, V13 config, V16 logging/error; plus V2/V4/V5/V9/V17 where relay/entitlement exist) to a pass/finding; run a ZAP full active scan on staging web + relay and triage; inject XSS/DOM-sink abuse cases and confirm CSP+sanitiser hold; verify security headers; produce an ASVS-L2 verification report; note chapters N/A while services do not yet exist.
**Out:** the CSP/headers implementation ([SN-SEC-016](security.md#sn-sec-016), [SN-SEC-017](security.md#sn-sec-017)); mobile MASVS ([SN-SEC-029](security.md#sn-sec-029)..[SN-SEC-031](security.md#sn-sec-031)); adding the ZAP CI job ([SN-CI-001](ci-cd.md#sn-ci-001)).

#### Acceptance criteria
- [ ] Each applicable ASVS 5.0 L2 chapter is marked pass or finding with evidence; N/A chapters (absent services) are recorded.
- [ ] ZAP full active scan on staging web + relay is triaged: no unresolved high/medium web finding (M7 exit gate).
- [ ] DOM-XSS abuse cases do not execute under CSP and under sanitiser-only.
- [ ] Security headers (CSP, COOP/COEP, SRI, referrer/nosniff/HSTS/permissions-policy) verified present and correct.
- [ ] Every finding has a fix or an explicit Security-Owner risk-acceptance.

#### Technical notes
Report under `docs/security/verification/asvs-web.md`; ZAP full scan per devsecops-pipeline §2.4 (OpenAPI import for relay). Reference controls-matrix §3 ASVS + §4 OWASP Top 10. Threats TM-I-06, TM-I-09, TM-S-01. Relay chapters activate when `services/` ship.

#### Security & privacy
Threats: TM-I-06 (web XSS), TM-I-09 (share-key), TM-S-01 (token). Controls: ASVS-V1/V3/V12/V13/V16, OWASP-A03/A05, CWE-79, CWE-693. ZAP runs against synthetic staging data only (no real user content).

#### UX notes
None beyond baseline (verification). Baseline: staging carries no real user content; error responses are user-safe with no stack traces.

#### Test plan
Verification report + the backing web tests (`app/test/security/web_csp_test.dart`, `web_headers_test.dart`, `app/integration_test/web_xss_test.dart`) and the ZAP scan artifact. Feeds the M7 exit gate ([SN-SEC-034](security.md#sn-sec-034)).

#### Dependencies
[SN-SEC-016](security.md#sn-sec-016), [SN-SEC-017](security.md#sn-sec-017). Cross-epic: [SN-COL-001](collaboration.md#sn-col-001) (relay), [SN-BILL-001](billing.md#sn-bill-001) (entitlement).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-033

<a id="sn-sec-033"></a>

**Write the penetration test plan and abuse-case matrix**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `ASVS-V1`, `MASVS-PLATFORM-1`, `OWASP-A04`, `OWASP-A01`, `CWE-1053` |
| Extra labels | agent-ready |

#### Context
A manual/assisted penetration test at milestone boundaries and before public release is a verification-stage MUST (docs/security/ssdlc-process.md §2.4; docs/roadmap.md M7). It exercises the abuse cases the whole threat model implies: deep-link forgery, intent redirection, E2EE-bypass attempts, share-link leakage, WebView XSS, parser exploitation, and account-takeover-yields-no-plaintext. This issue produces the pentest plan and the abuse-case matrix that scopes the engagement and defines pass/fail — the input to the remediation tracker [SN-SEC-034](security.md#sn-sec-034).

#### Scope
**In:** a pentest plan (scope from SECURITY.md — apps, shared packages, minimal services, build pipeline; out-of-scope: third-party internals, social engineering, volumetric DoS); an abuse-case matrix mapping each threat-model row to a concrete test case, tool (android-pentest/web-pentest methodology, Burp/Frida/objection/MobSF/ZAP) and expected result; a rules-of-engagement doc; a severity scale (ssdlc §3) and reporting template. Cover the five headline abuse cases plus the parser/fuzz surface.
**Out:** executing the fixes ([SN-SEC-034](security.md#sn-sec-034)); the automated MASVS/ASVS runs ([SN-SEC-029](security.md#sn-sec-029)..[SN-SEC-032](security.md#sn-sec-032)); the disclosure program ([SN-SEC-036](security.md#sn-sec-036)).

#### Acceptance criteria
- [ ] A pentest plan exists with explicit in/out-of-scope aligned to SECURITY.md.
- [ ] The abuse-case matrix maps every applicable `TM-*` row to a test case with tool and pass/fail criterion.
- [ ] The five headline abuse cases (deep-link forgery, intent redirection, E2EE-bypass, share-link leakage, WebView XSS) each have a documented procedure.
- [ ] Rules of engagement and a severity/reporting template (ssdlc §3) are included.
- [ ] The plan defines the M7 exit criterion: P0/P1 findings fixed or risk-accepted by the Security Owner.

#### Technical notes
Docs under `docs/security/pentest/plan.md` + `abuse-cases.md`. Reference ssdlc §2.4/§3, threat-model register, SECURITY.md scope; methodology from the android-pentest / web-pentest skills. This is planning — no app code changes.

#### Security & privacy
Threats: whole register (this plans their exploitation attempts). Controls: OWASP-A04 (verify the design), ASVS-V1, MASVS-PLATFORM-1, CWE-1053. Testing uses synthetic accounts/data only; no real user content.

#### UX notes
None beyond baseline (planning doc). Baseline: the plan and any evidence use synthetic data and redact secrets.

#### Test plan
No automated test (planning artifact). Review: Security Owner sign-off on scope and abuse-case coverage. The executed results and fixes are tracked in [SN-SEC-034](security.md#sn-sec-034).

#### Dependencies
None (references all controls). Feeds [SN-SEC-034](security.md#sn-sec-034).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-034

<a id="sn-sec-034"></a>

**Track penetration-test findings remediation and risk acceptance**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SEC-033](security.md#sn-sec-033) |
| Depends on | [SN-SEC-033](security.md#sn-sec-033) |
| Security controls | `OWASP-A04`, `ASVS-V15`, `MASVS-CODE-3`, `CWE-1053` |
| Extra labels | agent-ready |

#### Context
A pentest is only useful if its findings are remediated to SLA and every fix gets a regression test so the bug cannot return (docs/security/ssdlc-process.md §2.4/§3). This issue is the remediation and risk-acceptance register for the pentest run planned in [SN-SEC-033](security.md#sn-sec-033): each finding is triaged to a severity, fixed or explicitly risk-accepted by the Security Owner, and — where fixed — backed by a regression test in the security suite ([SN-SEC-025](security.md#sn-sec-025)). It is the M7 exit gate: no unresolved P0/P1.

#### Scope
**In:** a findings register (id, severity, threat-model mapping, status, owner, regression-test link, SLA date) fed by the pentest ([SN-SEC-033](security.md#sn-sec-033)) and the MASVS/ASVS runs ([SN-SEC-029](security.md#sn-sec-029)..[SN-SEC-032](security.md#sn-sec-032)); drive each P0/P1 to fixed-with-regression-test or Security-Owner risk-acceptance; ensure every fixed vuln adds a regression test to `app/test/security/`; produce the M7 sign-off summary.
**Out:** the pentest plan ([SN-SEC-033](security.md#sn-sec-033)); implementing individual fixes (each is a follow-up issue on the owning area); the disclosure program ([SN-SEC-036](security.md#sn-sec-036)).

#### Acceptance criteria
- [ ] Every pentest and MASVS/ASVS finding is in the register with severity, threat-model mapping and status.
- [ ] Every P0/P1 is fixed (with a regression test) or explicitly risk-accepted by the Security Owner (M7 exit gate).
- [ ] Each fixed vuln has a regression test in the security suite tagged with its finding id.
- [ ] An M7 security sign-off summary is produced and recorded.

#### Technical notes
Register under `docs/security/pentest/findings.md`; regression tests in `app/test/security/` ([SN-SEC-025](security.md#sn-sec-025) scaffold). Severity per ssdlc §3; risk-acceptance recorded with rationale + owner. Reference roadmap M7 exit criteria. Fixes are filed as issues on owning areas and linked.

#### Security & privacy
Threats: whatever the pentest surfaces (register maps each to a `TM-*`). Controls: OWASP-A04, ASVS-V15, MASVS-CODE-3, CWE-1053. Findings handled privately (no public issue for a security bug — SECURITY.md); register redacts exploit detail.

#### UX notes
None beyond baseline (tracking). Baseline: the register redacts working exploits and any user content.

#### Test plan
The register + the added regression tests are the deliverable. Gate check: CI security suite includes a regression test for each fixed finding; the M7 exit gate query (no open P0/P1) passes.

#### Dependencies
[SN-SEC-033](security.md#sn-sec-033). Consumes [SN-SEC-029](security.md#sn-sec-029), [SN-SEC-030](security.md#sn-sec-030), [SN-SEC-031](security.md#sn-sec-031), [SN-SEC-032](security.md#sn-sec-032); uses [SN-SEC-025](security.md#sn-sec-025).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-035

<a id="sn-sec-035"></a>

**Operationalise the incident-response runbook and breach clock**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | docs |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | security, docs |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `OWASP-A09`, `ASVS-V16`, `MASVS-PRIVACY-3`, `CWE-778` |
| Extra labels | needs-credentials |

#### Context
docs/security/devsecops-pipeline.md §6 and ssdlc-process.md §4 define the incident-response runbook (detect → contain → assess → remediate → disclose → learn) and the GDPR 72-hour breach clock. To be usable in a real incident it must be operationalised: a private-advisory template, a severity/breach-clock checklist, contact/rotation procedures, and the tie to the disclosure program. Because publishing the PGP key and confirming the `security@` mailbox needs maintainer secrets, this carries `needs-credentials`.

#### Scope
**In:** an incident-response checklist/runbook operationalising devsecops §6 (roles, contain/rotate steps for CI-secret/signing-key compromise, the personal-data breach decision + GDPR 72h / DPDP notification clock, hotfix path through release, post-incident root-cause + threat-model/CI-gate update); a private GitHub Security Advisory template; a breach-decision worksheet (is note plaintext at risk? usually no by zero-knowledge design); publish `docs/security/pgp.txt` (maintainer-supplied key) and confirm the `security@swiftsane.ai` channel.
**Out:** the disclosure policy/`security.txt` ([SN-SEC-036](security.md#sn-sec-036)); the SLA table (already in ssdlc §3, referenced); the CI secret-rotation implementation ([SN-CI-001](ci-cd.md#sn-ci-001)).

#### Acceptance criteria
- [ ] An operational incident-response runbook exists with the six phases, contain/rotate steps, and the breach-clock decision worksheet.
- [ ] A private-advisory template and a severity checklist (ssdlc §3) are available.
- [ ] `docs/security/pgp.txt` is published (maintainer key) and the `security@` channel is confirmed reachable.
- [ ] The runbook ties post-incident learnings to a threat-model update and a new/adjusted CI gate.
- [ ] The GDPR 72h / DPDP notification path is documented with who-notifies-whom.

#### Technical notes
Docs under `docs/security/incident-response.md` (or extend devsecops §6) + `docs/security/pgp.txt`; advisory template under `.github/`. Reference ssdlc §4, devsecops §6, SECURITY.md, controls-matrix §7 breach notification. Maintainer supplies the PGP key + mailbox (needs-credentials).

#### Security & privacy
Threats: TM-P-07 (non-compliance/breach), incident handling of any `TM-*`. Controls: OWASP-A09 (logging/alerting), ASVS-V16, MASVS-PRIVACY-3, CWE-778 (insufficient logging). Zero-knowledge design means note plaintext is usually not at risk — the worksheet forces confirming the specific path.

#### UX notes
None beyond baseline (process/docs). Baseline: incident evidence redacts user content; user-facing breach notices are honest and specific.

#### Test plan
No automated test. A tabletop exercise (documented dry-run of one Critical scenario) validates the runbook end to end, including the breach-clock decision and the hotfix path. Reviewed by the Security Owner.

#### Dependencies
Related: [SN-SEC-036](security.md#sn-sec-036), [SN-CI-001](ci-cd.md#sn-ci-001) (rotation). 

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SEC-036

<a id="sn-sec-036"></a>

**Stand up the vulnerability disclosure program and security.txt**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | docs |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | security, docs |
| Size | S |
| SDLC | maintenance |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | — |
| Security controls | `OWASP-A09`, `ASVS-V16`, `MASVS-PRIVACY-2`, `CWE-1059` |
| Extra labels | needs-credentials |

#### Context
Coordinated disclosure is a product commitment (SECURITY.md; docs/security/ssdlc-process.md §3; devsecops-pipeline §7): report privately, acknowledge ≤48h, triage ≤7 days, fix Critical ≤30 days, credit reporters. To make it discoverable and real at launch (M8), the program needs a published `security.txt` (RFC 9116), a confirmed reporting channel and PGP key, and the GitHub private-advisory intake enabled. This is the outward-facing half of the incident process ([SN-SEC-035](security.md#sn-sec-035)) and depends on maintainer-supplied contact/secrets (`needs-credentials`).

#### Scope
**In:** publish `/.well-known/security.txt` (RFC 9116: Contact, Encryption→pgp.txt, Policy→SECURITY.md, Preferred-Languages, Expires) on the website; confirm SECURITY.md is current (scope, SLA, supported versions, crediting); enable GitHub private Security Advisories intake; document the coordinated-disclosure timeline and the reporter-crediting flow in release notes; link the program from the website footer.
**Out:** the internal incident runbook ([SN-SEC-035](security.md#sn-sec-035)); the PGP key generation (maintainer, referenced); paid bug-bounty economics (out of scope for v1); the marketing site build ([SN-SITE-001](website.md#sn-site-001)).

#### Acceptance criteria
- [ ] `/.well-known/security.txt` is served over HTTPS with valid RFC 9116 fields including a non-expired `Expires` and an `Encryption` pointer to `pgp.txt`.
- [ ] SECURITY.md scope/SLA/supported-versions/crediting are current and consistent with ssdlc §3.
- [ ] GitHub private Security Advisory intake is enabled and linked from SECURITY.md and the site.
- [ ] The coordinated-disclosure timeline and reporter-crediting flow are documented.
- [ ] The program is discoverable from the website footer.

#### Technical notes
`website/.well-known/security.txt` + SECURITY.md + `docs/security/pgp.txt` (from [SN-SEC-035](security.md#sn-sec-035)). RFC 9116 fields; `Expires` within 1 year and a renewal reminder. Reference devsecops §7, ssdlc §3, SECURITY.md. Maintainer supplies contact + PGP (needs-credentials).

#### Security & privacy
Threats: TM-P-07 (compliance), enabling responsible reporting of any `TM-*`. Controls: OWASP-A09, ASVS-V16, MASVS-PRIVACY-2, CWE-1059 (insufficient standards/process). No user data involved; contact address is deliberately public.

#### UX notes
Website footer "Security" link → SECURITY.md/security.txt; honest, welcoming reporting copy (docs/design tone of voice). Themed across looks on the site; accessible link with a clear label.

#### Test plan
A CI check that fetches `/.well-known/security.txt`, validates RFC 9116 fields and a non-expired `Expires`, and that the SECURITY.md links resolve. `tools/scripts/verify-security-txt.mjs`.

#### Dependencies
[SN-SEC-035](security.md#sn-sec-035) (PGP key, runbook). Cross-epic: [SN-SITE-001](website.md#sn-site-001) (site hosting).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-014

<a id="sn-web-014"></a>

**Harden the web app with a strict nonce-based CSP and Trusted Types**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | security, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-002](compat.md#sn-web-002) |
| Security controls | `OWASP-A03`, `ASVS-V1`, `ASVS-V3`, `CWE-79`, `CWE-1021`, `MASVS-PLATFORM-2` |
| Extra labels | agent-ready |

#### Context
The web build is the only surface where an injected script can read the whole origin — including OPFS-backed notes and any in-memory key material — so DOM-XSS is the top web threat (TM-I-06). `docs/security/secure-coding-checklist.md` §6.2 and `docs/adr/0010-web-pwa-strategy.md` (Security impact) require a **strict, nonce-based CSP** (`script-src 'nonce-{random}' 'strict-dynamic'; object-src 'none'; base-uri 'none'`) with `'wasm-unsafe-eval'` added for the CanvasKit/skwasm/whisper WASM runtimes, plus **Trusted Types** (`require-trusted-types-for 'script'`) routing every DOM sink through a sanitising policy. Trusted Types is Chromium-only today, so it hardens Chromium and must never be the *sole* XSS defence — markdown and note-derived HTML are sanitised unconditionally as well. This is a p0 because every other web control assumes script integrity.

#### Scope
**In:** the CSP policy definition and a per-response nonce mechanism; removal of every inline script/style that would need `unsafe-inline`; a Trusted Types policy plus DOMPurify for any note-derived HTML/markdown rendering; a report-only rollout stage with a collection endpoint decision; an automated header/policy assertion in CI; documentation of the policy in `docs/security/`.
**Out:** COOP/COEP ([SN-WEB-015](security.md#sn-web-015)), SRI and the remaining headers ([SN-WEB-016](security.md#sn-web-016)), edge/CDN wiring ([SN-WEB-017](ci-cd.md#sn-web-017)), and the markdown renderer itself ([SN-TXT-001](text.md#sn-txt-001)).

#### Acceptance criteria
- [ ] The served CSP contains `script-src 'nonce-<random>' 'strict-dynamic' 'wasm-unsafe-eval'`, `object-src 'none'`, `base-uri 'none'`, `frame-ancestors 'none'`, and **no** `unsafe-inline` or `unsafe-eval` anywhere.
- [ ] The nonce is cryptographically random, at least 128 bits, and unique per response; no build-time constant nonce exists.
- [ ] The app boots and runs fully — including CanvasKit/skwasm, the service worker, and Workers — with the policy enforced; zero CSP violations on a scripted end-to-end session.
- [ ] `require-trusted-types-for 'script'` is enforced with a named policy; every DOM-sink write goes through it, and a test proves a raw `innerHTML` assignment throws under the policy.
- [ ] Note-derived HTML/markdown is sanitised by DOMPurify **independently of CSP**, so Safari and Firefox are protected too; a stored-payload test (`<img onerror>`, `javascript:` href, `<script>`) renders inert on all three engines.
- [ ] A report-only deployment stage exists and its violation output is reviewed before enforcement.
- [ ] CI fails if a response is served without the CSP header or with a weakened directive.

#### Technical notes
Nonce injection happens at the edge/host layer ([SN-WEB-017](ci-cd.md#sn-web-017)) with the `web/index.html` template carrying a placeholder; document the exact mechanism for the chosen host. Flutter's bootstrap must not inject inline scripts without the nonce — verify against the emitted `flutter_bootstrap.js` from [SN-WEB-002](compat.md#sn-web-002) and adjust the template rather than relaxing the policy. Trusted Types policy lives in `web/trusted_types.js` and is referenced from Dart via a thin typed interop wrapper; the JS-interop ink path ([SN-WEB-005](ink.md#sn-web-005)) must already be non-evaluating, so nothing there needs an exemption. Add the policy text and rationale to `docs/security/secure-coding-checklist.md` §6.2 cross-reference and the controls matrix. Targets ASVS 5.0 L2 (`docs/platform/web.md` §9).

#### Security & privacy
Threats: reflected/stored/DOM XSS (OWASP-A03, CWE-79) leading to note exfiltration and key theft; clickjacking and framing (CWE-1021); base-tag and object-embed injection; `javascript:`/`data:` navigations (checklist §1.1). Controls: nonce + `strict-dynamic` (host allow-lists are explicitly rejected as primary defence), `object-src 'none'`, `base-uri 'none'`, `frame-ancestors 'none'`, Trusted Types with a single audited policy, unconditional sanitisation of note-derived markup, and scheme allow-listing (`https` only) for outbound navigation. Privacy: if a `report-uri`/`report-to` endpoint is used it must receive **no note content** and is subject to the telemetry opt-in posture (ADR-0011, MASVS-PRIVACY-1); prefer no reporting endpoint over a chatty one, and document the choice.

#### UX notes
No visible chrome; the user-visible requirement is that nothing breaks — the Editor, Library, Search, Settings and the Share overlay must all behave identically under the enforced policy in all **17 looks, light and dark** (re-run existing goldens rather than adding new ones). If a CSP violation ever blocks a feature, the app must degrade to a user-safe error state rather than a blank screen. Accessibility is unchanged, but verify that sanitisation preserves semantic markup (headings, lists, links) in rendered markdown so screen-reader structure survives (`PRD-CO-310`).

#### Test plan
- `app/test/web/trusted_types_policy_test.dart` — policy creation, sink routing, and a raw-`innerHTML` rejection case.
- `app/test/web/html_sanitizer_test.dart` — XSS payload corpus rendered inert (script, event handlers, `javascript:`, `data:`, SVG, MathML).
- `app/integration_test/web/csp_no_violations_test.dart` — scripted session in headless Chromium asserting zero CSP violations.
- `tools/scripts/__tests__/headers_check_test.mjs` — the CI header assertion (shared with [SN-WEB-016](security.md#sn-web-016)).
- Manual: ZAP baseline scan against a staging deployment (`docs/adr/0010-web-pwa-strategy.md` How to verify §5).

#### Dependencies
[SN-WEB-002](compat.md#sn-web-002); enforced at the edge by [SN-WEB-017](ci-cd.md#sn-web-017).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/security/controls-matrix.md and the threat model updated for TM-I-06
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2 with CODEOWNERS security review

---

### SN-WEB-015

<a id="sn-web-015"></a>

**Enable COOP/COEP cross-origin isolation for multithreaded WASM**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | security, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-002](compat.md#sn-web-002), [SN-WEB-017](ci-cd.md#sn-web-017) |
| Security controls | `ASVS-V3`, `MASVS-PLATFORM-2`, `CWE-1021`, `CWE-693`, `OWASP-A05` |
| Extra labels | agent-ready |

#### Context
Cross-origin isolation (`Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp`) is both a security control and a capability unlock: it severs the opener relationship that enables cross-window attacks, and it is the **prerequisite for `SharedArrayBuffer` and multithreaded WASM**, which is what skwasm's Worker paint ([SN-WEB-002](compat.md#sn-web-002)) and whisper.cpp transcription ([SN-WEB-027](audio.md#sn-web-027)) need (`docs/platform/web.md` §9, `docs/adr/0010-web-pwa-strategy.md` decision 2). The cost is a real deployment constraint: **every cross-origin subresource must send CORP or CORS**, which is precisely why the app lives on its own isolated origin ([SN-WEB-017](ci-cd.md#sn-web-017)). The docs require a `-Report-Only` rollout first so we discover breakage before users do.

#### Scope
**In:** setting COOP/COEP (evaluating `require-corp` vs `credentialless`) on the app origin, auditing every subresource for CORP/CORS compliance, self-hosting anything that cannot comply, the Report-Only stage and its review, a runtime assertion of `self.crossOriginIsolated`, and graceful degradation when isolation is unavailable.
**Out:** CSP/Trusted Types ([SN-WEB-014](security.md#sn-web-014)), SRI ([SN-WEB-016](security.md#sn-web-016)), the hosting platform itself ([SN-WEB-017](ci-cd.md#sn-web-017)), and the features that consume isolation ([SN-WEB-027](audio.md#sn-web-027)).

#### Acceptance criteria
- [ ] Production responses carry `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` (or a justified `credentialless`), with the decision recorded in ADR-0010.
- [ ] `self.crossOriginIsolated === true` on Chrome/Edge 120+ and Firefox 125+; asserted by an automated test.
- [ ] Every subresource loads under isolation: fonts, icons, WASM, Workers — an audit list is checked in, and anything non-compliant is self-hosted rather than exempted.
- [ ] A Report-Only deployment ran first and its violation report is attached to the PR with each item resolved or explicitly accepted.
- [ ] Where isolation cannot be established (for example a browser or embed context that refuses), the app still boots on CanvasKit, isolation-dependent features are hidden rather than broken, and the reason is visible in diagnostics.
- [ ] Sign-in popups/redirects ([SN-WEB-018](auth.md#sn-web-018)) still work under COOP — verified for Google, Microsoft and Apple flows, with the redirect-vs-popup decision documented.
- [ ] No functional regression in the service worker, OPFS Worker or file pickers under isolation.

#### Technical notes
Headers are applied at the edge ([SN-WEB-017](ci-cd.md#sn-web-017)); keep a local dev server with identical headers under `tools/` so developers reproduce production exactly. COOP breaks `window.opener` communication, which is the usual OAuth popup mechanism — prefer the redirect flow, or use `COOP: same-origin-allow-popups` **only** if measurement proves the redirect flow unacceptable, and record that trade-off in ADR-0010 (it weakens the control). `credentialless` COEP removes the CORP requirement for no-credential subresources and is the pragmatic option if a third-party asset cannot be self-hosted; prefer self-hosting first. Add a startup capability probe next to the renderer probe from [SN-WEB-002](compat.md#sn-web-002). References: `docs/platform/web.md` §9, `docs/security/secure-coding-checklist.md` §6.2.

#### Security & privacy
Threats: cross-window scripting and opener-based attacks (CWE-1021, ASVS-V3); Spectre-class cross-origin data leakage that isolation exists to mitigate (CWE-693); third-party subresources silently becoming a supply-chain and tracking surface (OWASP-A05, MASVS-PRIVACY-4). Controls: COOP severs opener access; COEP forces explicit opt-in for every embedded resource; the audit forces us to **self-host** assets, which also removes third-party request beacons and satisfies the no-third-party-analytics rule (`PRD-PRIV-007`); the isolation probe logs two booleans only (CWE-532). Document the final header set in the controls matrix as an ASVS 5.0 L2 control.

#### UX notes
No user-visible chrome. Two indirect UX obligations: (1) if isolation is unavailable, isolation-dependent features (offline transcription, skwasm paint) are **hidden**, not shown-and-broken — the Settings → Handwriting & stylus and audio panels must reflect real capability; (2) the sign-in flow must not appear to hang if a popup is blocked by COOP, so the redirect path is the default and any popup path shows a fallback link. All affected panels use `sane_ui` tokens and are covered by existing goldens across the **17 looks, light and dark**. Accessibility: any capability-explanation text meets ≥ 4.5:1 contrast and is screen-reader readable.

#### Test plan
- `app/integration_test/web/cross_origin_isolation_test.dart` — asserts `crossOriginIsolated`, Worker creation and SharedArrayBuffer availability.
- `tools/scripts/__tests__/headers_check_test.mjs` — asserts COOP/COEP on every response class.
- `app/test/web/capability_gating_test.dart` — isolation-dependent features hidden when the probe is false.
- Manual: Report-Only run on staging with report review; Google/Microsoft/Apple sign-in under enforced headers; Safari behaviour (isolation present but skwasm still absent).

#### Dependencies
[SN-WEB-002](compat.md#sn-web-002), [SN-WEB-017](ci-cd.md#sn-web-017).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] ADR-0010 records the final COOP/COEP variant and the popup/redirect decision
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2 with CODEOWNERS security review

---

### SN-WEB-016

<a id="sn-web-016"></a>

**Add SRI and the baseline security response headers to the web app**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | security, ci-cd |
| Size | S |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-014](security.md#sn-web-014) |
| Security controls | `ASVS-V3`, `MASVS-NETWORK-1`, `CWE-353`, `CWE-319`, `CWE-1104`, `OWASP-A05` |
| Extra labels | agent-ready, good first issue |

#### Context
CSP and cross-origin isolation cover the loudest web threats, but the remaining baseline headers are what stop referrer leakage of share-link fragments, MIME sniffing, protocol downgrade and over-broad device permissions. `docs/security/secure-coding-checklist.md` §6.2 requires `Referrer-Policy: no-referrer` (which protects the share key in the URL fragment, TM-I-09), `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, and a restrictive `Permissions-Policy`; `docs/platform/web.md` §9 additionally requires **SRI** (`integrity="sha384-…"` + `crossorigin`) on any external subresource, enforced fleet-wide with `Integrity-Policy` where available. Our stated preference is to **self-host rather than use a CDN**, in which case SRI becomes an enforcement of that rule rather than a patch over it.

#### Scope
**In:** the baseline header set; a `Permissions-Policy` that denies everything the app does not need and enables camera/microphone only where a feature requires them; SRI attributes plus `Integrity-Policy` for any external script/style; a checked-in header specification consumed by both the local dev server and the edge config; the CI assertion that every header is present with the expected value.
**Out:** CSP/Trusted Types ([SN-WEB-014](security.md#sn-web-014)), COOP/COEP ([SN-WEB-015](security.md#sn-web-015)), TLS/CDN provisioning ([SN-WEB-017](ci-cd.md#sn-web-017)).

#### Acceptance criteria
- [ ] Every response carries `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, and `X-Frame-Options`/`frame-ancestors` equivalents.
- [ ] `Permissions-Policy` denies geolocation, payment, USB, serial, bluetooth, idle-detection and interest-cohort by default, and allows `microphone` and `camera` only as `self` for the audio and scan features.
- [ ] No external script or stylesheet is loaded at all; if one is ever added it carries a correct `integrity` hash and `crossorigin`, and CI fails on an external subresource without SRI.
- [ ] `Integrity-Policy` is emitted where the host supports it.
- [ ] A single source of truth (`web/headers.json`) drives the dev server, the edge config and the CI assertion — no three-way drift.
- [ ] The CI check fails on a missing or weakened header and prints the expected versus actual value.
- [ ] Opening a share link produces **no** `Referer` on any outbound navigation (verified by network capture).

#### Technical notes
Keep `web/headers.json` machine-readable and generate the host-specific config from it in `tools/scripts/gen_edge_headers.mjs` ([SN-WEB-017](ci-cd.md#sn-web-017)). The CI assertion shares the implementation with [SN-WEB-014](security.md#sn-web-014) in `tools/scripts/headers_check.mjs` so there is one checker. HSTS preload requires the apex domain decision from [SN-WEB-017](ci-cd.md#sn-web-017) — do not submit for preload until the origin layout is final. `Permissions-Policy` must match what the app actually requests lazily and in-context (checklist §8): microphone for [SN-WEB-026](audio.md#sn-web-026), camera for scan import. Reference `docs/platform/web.md` §9, the Security-impact section of `docs/adr/0010-web-pwa-strategy.md`, and the ASVS 5.0 L2 target of locked decision 8.

#### Security & privacy
Threats: share-link decryption keys leaking through the `Referer` header when a user clicks an outbound link (TM-I-09, CWE-598 adjacency); MIME confusion turning an uploaded asset into script (CWE-430/CWE-79 adjacency); downgrade to cleartext HTTP (CWE-319, MASVS-NETWORK-1); a compromised CDN swapping a script (CWE-353, CWE-1104, OWASP-A05); silent access to device sensors (MASVS-PRIVACY-2). Controls: `no-referrer` globally; `nosniff`; HSTS with a long max-age; SRI plus a self-hosting-first policy; a deny-by-default `Permissions-Policy`. All are ASVS-V3 configuration controls and belong in the controls matrix.

#### UX notes
No visible chrome. Indirect UX requirements: the permission model must stay honest — because `Permissions-Policy` denies by default, any feature that later needs a sensor must both update this file and request the OS permission **in context with a rationale** (`PRD-PRIV-002`), never at launch. Verify no look or asset breaks under `nosniff` (a wrongly-typed font or SVG would fail) across the **17 looks in light and dark** by re-running the theme goldens. Accessibility unaffected.

#### Test plan
- `tools/scripts/__tests__/headers_check_test.mjs` — expected-vs-actual assertions for every header, including negative cases.
- `app/integration_test/web/referrer_policy_test.dart` — asserts no `Referer` on outbound navigation from a share-link route.
- `tools/scripts/__tests__/gen_edge_headers_test.mjs` — config generation from `web/headers.json`.
- Manual: `curl -I` against staging; a ZAP baseline scan confirming no missing-header findings.

#### Dependencies
[SN-WEB-014](security.md#sn-web-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/security/controls-matrix.md updated with the header set
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2

---

### SN-WEB-031

<a id="sn-web-031"></a>

**Define and enforce the reduced web at-rest key protection posture**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | web |
| Areas | security, privacy |
| Size | M |
| SDLC | design |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-WEB-018](auth.md#sn-web-018) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `ASVS-V11`, `CWE-312`, `CWE-320` |
| Extra labels | needs-decision |

#### Context
Every native surface stores the master key in hardware — Keychain/Secure Enclave or Keystore/StrongBox — but a browser has **none of that**: `docs/platform/compatibility-matrix.md` §6 marks hardware-backed keys ❌ on web (WebCrypto only), and `flutter_secure_storage`'s web implementation is experimental WebCrypto bound to `localStorage`, which `docs/platform/web.md` §7 R4 says must **not** be relied on for the master key. CLAUDE.md §13 lists the **web PWA at-rest protection posture** as an open maintainer decision: accept a reduced guarantee (passphrase/passkey-derived key held in memory, ciphertext in OPFS/IndexedDB, no hardware binding) and label it honestly in the privacy dashboard. This issue turns that from a gap into a specified, enforced, and truthfully-labelled posture — p0 because shipping web sync without it would either weaken E2EE or lie to users.

#### Scope
**In:** the web key-source ladder (WebAuthn **PRF** passkey first, then Argon2id passphrase; **no** unprotected persisted key), in-memory key lifetime with scrub on lock/tab-hide/sign-out, session re-derivation UX, recovery-code entry on web ([SN-CRY-003](security.md#sn-cry-003)), the honest privacy-dashboard label, and automated assertions that no key material is ever persisted in the clear.
**Out:** the key hierarchy and envelope scheme itself ([SN-CRY-002](security.md#sn-cry-002), ADR-0007), sync transport ([SN-WEB-019](sync.md#sn-web-019)), auth providers ([SN-WEB-018](auth.md#sn-web-018)), and native key storage.

#### Acceptance criteria
- [ ] The master key is **never** written to `localStorage`, `sessionStorage`, IndexedDB or OPFS in the clear — asserted by a test that scans every store after a full signed-in session.
- [ ] Key sources follow the ladder from `PRD-KEY-002`: WebAuthn PRF where available, else Argon2id passphrase with the documented parameters (64 MiB, 5 iterations, parallelism 1, 128-bit salt); no silent downgrade.
- [ ] The in-memory key is scrubbed on sign-out, app lock, and tab/visibility hide beyond a configured timeout; a scrubbed session requires re-derivation before any decrypt.
- [ ] Every decrypt verifies the AEAD tag **before** using any byte and fails closed to "Paused (no key)" with no partial or garbled content (`PRD-KEY-009`).
- [ ] The recovery code unwraps the master key on a fresh browser and completes pairing (`PRD-KEY-007`), with brute-force resistance from the memory-hard unwrap plus attempt backoff.
- [ ] The privacy dashboard states the web-specific reduction in plain language ("this browser cannot store your key in hardware") without scaring users away from sync (`PRD-PRIV-001`).
- [ ] Argon2id on web completes within a documented, acceptable time budget on a mid-range laptop, in a Worker, with progress shown.
- [ ] No key, passphrase, recovery code or derived material appears in any log, error message, crash report or diagnostic (checklist §0.2).

#### Technical notes
**needs-decision (maintainer):** accept the reduced web posture and label it (the documented default), or gate web sync behind a stricter requirement such as passkey-PRF-only. Implement the default now behind a build-time flag so the decision is a flag flip, and record the outcome in ADR-0010 (Security impact) and `docs/architecture/crypto.md`. Code: `packages/sane_crypto` stays pure Dart and platform-agnostic; the web key-source implementations live in the web side of `plugins/sane_secure_store`. Use WebCrypto for AEAD where it is constant-time and hardware-accelerated, and a vetted Argon2id WASM for the KDF — run both in a Worker so the UI never blocks. WebAuthn PRF needs a passkey registered by [SN-WEB-018](auth.md#sn-web-018). Approved primitives only: XChaCha20-Poly1305 or AES-256-GCM, Argon2id, HKDF, SHA-256/BLAKE3, Ed25519 (checklist §3).

#### Security & privacy
Threats: key material persisted in browser storage where any XSS or local malware can read it (CWE-312, MASVS-STORAGE-2, TM-I-03); a weaker web posture silently degrading the zero-knowledge guarantee users were promised (MASVS-CRYPTO-2, TM-I-01); insufficient KDF parameters making an offline passphrase attack cheap (CWE-916, ASVS-V11); key material surviving in memory after lock (CWE-459, CWE-320); recovery-code brute force (CWE-307). Controls: no persisted clear key, ever; approved primitives with documented parameters; CSPRNG for every key, nonce and salt; scrub-on-lock with a tested timeout; AEAD verify-then-use with fail-closed behaviour; rate-limited, memory-hard recovery-code entry; honest labelling in the privacy dashboard and store declarations (`PRD-PRIV-006`); CODEOWNERS security review is mandatory for this path.

#### UX notes
Surfaces: the E2EE setup flow and every key screen (`docs/design/screens-and-flows.md` §12 Sync & backup / Security), the recovery-code screen (`PRD-KEY-005` — grouped code, Copy, Download/Save as PDF), the "Paused (no key)" sync state, and the Privacy & export dashboard. Copy must be student-readable and state plainly that **Sane cannot recover the notes** if both key source and recovery code are lost (`PRD-KEY-004`), plus the web-specific sentence about hardware. All of these render in all **17 looks, light and dark** — golden-test the recovery-code and key-setup screens in two looks per mode. States: key present, key needed (re-derive), deriving with progress, wrong passphrase with backoff, paused (no key), and offline. Accessibility: the recovery code is selectable and readable by screen readers in grouped chunks, targets ≥ 44 px, contrast ≥ 4.5:1, no colour-only error signalling (`PRD-CO-312`, `PRD-CO-321`).

#### Test plan
- `packages/sane_crypto/test/key_ladder_test.dart` — source selection, no-silent-downgrade, parameter enforcement.
- `app/test/web/no_key_persistence_test.dart` — scans `localStorage`, `sessionStorage`, IndexedDB and OPFS for key-shaped material after a full session.
- `app/test/web/key_scrub_test.dart` — scrub on lock/hide/sign-out and forced re-derivation.
- `app/test/security/no_secret_in_logs_test.dart` — extended for web key paths.
- `app/integration_test/web/recovery_code_test.dart` — fresh-browser recovery, wrong-code backoff, fail-closed decrypt.
- Manual: passkey-PRF flow on Chrome and Safari; Argon2id timing on a mid-range laptop recorded in `docs/architecture/crypto.md`.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002), [SN-WEB-018](auth.md#sn-web-018); recovery code from [SN-CRY-003](security.md#sn-cry-003); consumed by [SN-WEB-019](sync.md#sn-web-019).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] ADR-0010 + docs/architecture/crypto.md record the web posture; threat model and controls matrix updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md §3 and §3.1 with CODEOWNERS security review

---

