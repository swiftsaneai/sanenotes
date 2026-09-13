# Backlog — area: auth

23 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-AUTH-001](auth.md#sn-auth-001) **Deliver Identity: sign-in, guest, profiles, tokens, locks and account deletion** (epic · M4 Identity, Sync & Privacy)
  - [SN-AUTH-002](auth.md#sn-auth-002) **Implement auth abstraction, session model and dev auth-bypass release guard** · p0 · security · L · M4 Identity, Sync & Privacy
    - [SN-AUTH-008](auth.md#sn-auth-008) **Store identity tokens in the platform secure store** · p0 · task · S · M4 Identity, Sync & Privacy
    - [SN-AUTH-021](auth.md#sn-auth-021) **Prove auth bypass is unreachable in release builds (CI gate)** · p0 · test · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-003](auth.md#sn-auth-003) **Implement Sign in with Google across all platforms** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-004](auth.md#sn-auth-004) **Implement Sign in with Microsoft via MSAL** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-005](auth.md#sn-auth-005) **Implement Sign in with Apple (native and web JS)** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-006](auth.md#sn-auth-006) **Implement phone-number OTP sign-in** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-007](auth.md#sn-auth-007) **Implement local profiles (multiple per device, add and switch)** · p1 · feature · L · M4 Identity, Sync & Privacy
    - [SN-AUTH-013](auth.md#sn-auth-013) **Enforce per-profile data isolation** · p0 · security · M · M4 Identity, Sync & Privacy
    - [SN-AUTH-014](auth.md#sn-auth-014) **Add per-profile biometric lock** · p1 · security · M · M4 Identity, Sync & Privacy
    - [SN-AUTH-015](auth.md#sn-auth-015) **Add profile management (rename, recolour, delete, set lock)** · p2 · feature · S · M4 Identity, Sync & Privacy
  - [SN-AUTH-009](auth.md#sn-auth-009) **Implement shared OIDC PKCE sign-in flow (state, nonce, redirect)** · p0 · security · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-010](auth.md#sn-auth-010) **Make guest mode a first-class, no-account note-taking path** · p0 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-011](auth.md#sn-auth-011) **Adopt guest data in place when a user signs in later** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-012](auth.md#sn-auth-012) **Link multiple sign-in providers to one identity** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-016](auth.md#sn-auth-016) **Scope Pro entitlement to the account across all profiles** · p1 · task · S · M4 Identity, Sync & Privacy
  - [SN-AUTH-017](auth.md#sn-auth-017) **Implement sign out and switch account without data loss** · p1 · feature · S · M4 Identity, Sync & Privacy
  - [SN-AUTH-018](auth.md#sn-auth-018) **Implement self-service account and data deletion** · p0 · security · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-019](auth.md#sn-auth-019) **Add identity security and abuse test suite** · p0 · test · M · M4 Identity, Sync & Privacy
  - [SN-AUTH-020](auth.md#sn-auth-020) **Track and document maintainer OAuth client IDs and secrets** · p1 · infra · S · M4 Identity, Sync & Privacy
  - [SN-GA11-001](a11y.md#sn-ga11-001) **Satisfy Accessible Authentication and Identify Input Purpose in sign-in** · p1 · feature · M · M4 Identity, Sync & Privacy

---

## Issues

### SN-AND-017

<a id="sn-and-017"></a>

**Build Credential Manager sign-in surface (passkeys, passwords, Google)**

| Field | Value |
|---|---|
| GitHub | #70 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | android-tablet, android-phone |
| Areas | auth, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-003](auth.md#sn-auth-003) |
| Security controls | `MASVS-AUTH-1`, `MASVS-AUTH-2`, `MASVS-NETWORK-1`, `OWASP-A07`, `CWE-287` |
| Extra labels | needs-credentials |

#### Context
Identity in Sane Notes is optional (guest mode is first-class) and used only for profile, sharing/collab and entitlements — never required to take notes (locked decision 5, docs/platform/android.md §8). The Android sign-in surface is Credential Manager (androidx.credentials): passkeys (recommended primary), passwords and Sign in with Google through one bottom-sheet API. This issue wires the Android surface into the shared auth abstraction (SN-AUTH-002) and Sign in with Google (SN-AUTH-003). It needs maintainer-supplied OAuth client IDs, so it carries needs-credentials.

#### Scope
**In:** the Android Credential Manager integration behind the auth abstraction; passkey create/get and Sign in with Google via the bottom sheet; OIDC PKCE + state + nonce; storing tokens in sane_secure_store; guest-mode-preserving flow (sign-in is never forced).
**Out:** the cross-platform auth abstraction (SN-AUTH-002); Sign in with Microsoft/Apple/phone OTP (SN-AUTH-004..006); the dev auth-bypass guard (SN-AUTH-002).

#### Acceptance criteria
- [ ] Sign-in is offered through the Credential Manager bottom sheet with passkeys as the primary option, plus passwords and Sign in with Google; the user can dismiss it and keep using the app as a guest.
- [ ] The OIDC flow uses PKCE + state + nonce; tokens are stored only in sane_secure_store (Keystore-backed), never in logs, prefs or a Dart provider (CLAUDE.md §7).
- [ ] TLS 1.2+ is enforced for auth endpoints with certificate pinning for our own endpoints; no cleartext traffic (MASVS-NETWORK-1).
- [ ] A failed or cancelled sign-in returns to guest mode cleanly; note-taking is never blocked by auth state.
- [ ] Client IDs come from --dart-define / CI secrets (never committed); the issue is blocked on those being supplied (needs-credentials).

#### Technical notes
Kotlin: androidx.credentials CredentialManager (passkeys, passwords, Sign in with Google) (docs/platform/android.md §2, §8). Behind the SN-AUTH-002 abstraction; Sign in with Google shares config with SN-AUTH-003. Tokens via sane_secure_store ([SN-AND-019](security.md#sn-and-019)). OIDC PKCE/state/nonce per roadmap M4 exit criteria. No secrets in code (CLAUDE.md §7.2).

#### Security & privacy
Authentication surface (MASVS-AUTH-1/2, OWASP-A07, CWE-287): PKCE+state+nonce defeat code interception/CSRF/replay; tokens live only in hardware-backed storage; cert pinning + TLS 1.2+ (MASVS-NETWORK-1) stop MITM; client IDs are injected secrets, never committed (CLAUDE.md §7.2). Guest-first means auth is never a note-taking gate.

#### UX notes
One tap opens the familiar Android credential bottom sheet; passkeys make sign-in fast and phishing-resistant (docs/platform/android.md §8). Dismissing keeps you in guest mode with no nag. The flow is TalkBack-labelled and keyboard-reachable; errors are friendly and never lose local notes.

#### Test plan
app/test/auth/credential_manager_test.dart (flow states, guest fallback, token-in-secure-store assertion); app/test/security/auth_no_token_in_logs_test.dart; patrol integration test for the real Credential Manager sheet on a device; a negative test that a cancelled sign-in leaves guest state intact.

#### Dependencies
SN-AUTH-002 (auth abstraction + dev bypass guard), SN-AUTH-003 (Sign in with Google config). Blocked on maintainer OAuth client IDs.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AUTH-001

<a id="sn-auth-001"></a>

**Deliver Identity: sign-in, guest, profiles, tokens, locks and account deletion**

| Field | Value |
|---|---|
| GitHub | #5 |
| Type | epic |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-AUTH-2`, `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-NETWORK-1`, `MASVS-PRIVACY-2`, `ASVS-V6`, `ASVS-V3`, `OWASP-A01`, `OWASP-A02`, `OWASP-A07`, `CWE-287`, `CWE-522` |
| Extra labels | agent-ready, sec: masvs, sec: threat-model |

#### Context
Identity in Sane Notes exists only for profile display, sharing/collaboration, entitlements and cloud sync — it is **never required to take notes** (locked decision #5, CLAUDE.md §2; ADR-0004 local-first, zero-server). This epic delivers everything in docs/product/prd-03-identity-sync-privacy-settings-billing.md §1 (AUTH), §2 (PROF) and §14 (DEL): the provider-agnostic auth abstraction and session model, the dev auth-bypass guard that must be impossible in release (p0, CLAUDE.md §7 rule 5), Sign in with Google/Microsoft/Apple, phone-number OTP, first-class guest mode, guest-to-account adoption, account linking, per-profile data isolation and biometric lock, secure token storage, sign-out, and self-service account/data deletion. It is scheduled in M4 (docs/roadmap.md) alongside crypto (SN-CRY) and sync (SN-SYNC), and it is a hard dependency of collaboration/sharing (M6) and billing (M8). The threat model rows this epic satisfies are TM-S-01, TM-S-02, TM-E-01, TM-I-03, TM-I-05 and TM-P-02 in docs/security/threat-model.md.

#### Scope
**In:** every SN-AUTH child below — auth abstraction and session, bypass guard, the three social providers, phone OTP, guest mode and adoption, account linking, local profiles with isolation and lock, secure token storage, sign-out, account deletion, the identity security-test suite, the OAuth credentials manifest, and the release-unreachability CI gate.
**Out:** E2EE key hierarchy and recovery code (SN-CRY-001), cloud sync and multi-device pairing (SN-SYNC-001), the onboarding tour and login-screen chrome/theming (SN-ONB-001), app-wide lock and clipboard/screenshot protections (SN-SET-001 / LEAK), billing/entitlement purchase flows (SN-BILL-001), and student verification. This epic wires against those but does not build them.

#### Acceptance criteria
- [ ] A user can take notes with no account (guest) and no network, then sign in later and keep every note in place (PRD-AUTH-007/008/010).
- [ ] Sign in with Google, Microsoft and Apple and phone OTP all complete to the Profiles screen using native SDKs / OS pickers, never an in-app provider password form (PRD-AUTH-002).
- [ ] Auth bypass is proven unreachable in a release build by CI (TM-E-01); tokens live only in the secure store, never the notes DB, logs, backups or synced store (PRD-AUTH-006).
- [ ] Switching profiles swaps the entire visible dataset; a locked profile stays encrypted-at-rest until biometric unlock (PRD-PROF-004/005).
- [ ] Self-service account/data deletion offers export-first and completes or clearly reports partial completion (PRD-DEL-001..004).
- [ ] Every child issue below is closed with its Definition of done met.

#### Technical notes
Auth lives in app/lib/auth (a CODEOWNERS-protected path, CLAUDE.md §5); it is app-layer coordination, not a package (the package DAG forbids feature-to-feature imports, CLAUDE.md §3). Providers sit behind a federated auth abstraction that returns Result<Session, Failure> (sane_core sealed types). Tokens and wrapped keys go through the sane_secure_store plugin (Keychain/Secure Enclave on Apple, Keystore/StrongBox on Android; platform docs docs/platform/ipad.md §8, docs/platform/android.md §8, docs/platform/web.md §7). OIDC uses PKCE + state + nonce (TM-S-01). Children: [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-003](auth.md#sn-auth-003), [SN-AUTH-004](auth.md#sn-auth-004), [SN-AUTH-005](auth.md#sn-auth-005), [SN-AUTH-006](auth.md#sn-auth-006), [SN-AUTH-007](auth.md#sn-auth-007), [SN-AUTH-008](auth.md#sn-auth-008), [SN-AUTH-009](auth.md#sn-auth-009), [SN-AUTH-010](auth.md#sn-auth-010), [SN-AUTH-011](auth.md#sn-auth-011), [SN-AUTH-012](auth.md#sn-auth-012), [SN-AUTH-013](auth.md#sn-auth-013), [SN-AUTH-014](auth.md#sn-auth-014), [SN-AUTH-015](auth.md#sn-auth-015), [SN-AUTH-016](auth.md#sn-auth-016), [SN-AUTH-017](auth.md#sn-auth-017), [SN-AUTH-018](auth.md#sn-auth-018), [SN-AUTH-019](auth.md#sn-auth-019), [SN-AUTH-020](auth.md#sn-auth-020), [SN-AUTH-021](auth.md#sn-auth-021).

#### Security & privacy
This epic owns the Spoofing and Elevation-of-privilege identity surface. Threats: token theft/replay (TM-S-01, CWE-287/522), OTP brute-force / SIM-swap (TM-S-02), bypass shipping in release (TM-E-01, CWE-489), token/PII in logs (TM-I-05), account takeover yielding note plaintext (must be impossible — zero-knowledge, keys not derivable from identity). Controls map to MASVS-AUTH-1/2, MASVS-STORAGE-2, MASVS-NETWORK-1, ASVS V6/V3 and OWASP A01/A02/A07. The invariant: an account is for identity only; losing or seizing it must never expose note content (ADR-0004, threat-model §5.1 TM-S-02).

#### UX notes
Screens and copy are fixed by docs/design/screens-and-flows.md §3 (Login), §4 (Profiles) and §12 (Settings → Account); the login/onboarding chrome is themed by SN-ONB-001 across all 17 looks + dark mode. Every auth surface must meet a11y basics (Semantics labels, 44pt/48dp targets, ≥4.5:1 contrast, keyboard-reachable on web) per docs/design/accessibility.md. This epic renders no new visual language of its own; it wires behaviour into the design-system components (SN-DS-003).

#### Test plan
Epic is done when every child's tests are green: unit tests for the session state machine and bypass accessor, widget tests for login/profile flows, integration tests (patrol) for native provider dialogs and biometrics, the identity abuse suite ([SN-AUTH-019](auth.md#sn-auth-019)), and the release-unreachability CI gate ([SN-AUTH-021](auth.md#sn-auth-021), app/test/security/auth_bypass_test.dart).

#### Dependencies
SN-FND-005 (flavours/--dart-define), SN-CORE-001 (Result/Failure + model), SN-CRY-002 (secure key storage), SN-PRV-001 (privacy/deletion rights), SN-BILL-001 (entitlement scope), SN-ONB-001 (login/onboarding chrome).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-002

<a id="sn-auth-002"></a>

**Implement auth abstraction, session model and dev auth-bypass release guard**

| Field | Value |
|---|---|
| GitHub | #105 |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, security |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-FND-005](devx.md#sn-fnd-005), [SN-CORE-001](storage.md#sn-core-001) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CODE-2`, `MASVS-RESILIENCE-2`, `ASVS-V6`, `OWASP-A07`, `CWE-489`, `CWE-287`, `CWE-798` |
| Extra labels | agent-ready, sec: masvs, sec: threat-model |

#### Context
Every sign-in method (Google, Microsoft, Apple, phone OTP, guest) needs one provider-agnostic seam so the rest of the app depends on an AuthState, never on a specific SDK. This issue builds that abstraction and the session model, and it lands the p0 dev auth-bypass guard from PRD-AUTH-011/012/013 and CLAUDE.md §7 rule 5. The bypass is a compile-time flag --dart-define=SANE_AUTH_BYPASS=true that MAY short-circuit login in debug/profile only and MUST be impossible in a release build. The threat is TM-E-01 in docs/security/threat-model.md (a bypass shipping in release, Spoofing/Elevation, Impact Critical). Foundations scaffolded a stub assertAuthBypassSafe() (M0); this issue implements the real three-layer guard: (1) a single BuildConfig-style accessor that returns a compile-time false under kReleaseMode so the bypass branch is tree-shaken out, (2) a runtime assertAuthBypassSafe() that hard-fails at startup if the flag ever resolves true in release, and (3) a persistent on-screen dev watermark while bypass is active.

#### Scope
**In:** the AuthController/AuthService interface returning Result<Session, Failure>; the immutable AuthState (signedOut / guest / signedIn(provider, account) / locked) and Session value object; a SessionStore that reads/writes tokens through the secure store seam ([SN-AUTH-008](auth.md#sn-auth-008)); the SANE_AUTH_BYPASS accessor + assertAuthBypassSafe() + the AUTH BYPASS dev watermark; Riverpod providers exposing auth state to the app.
**Out:** the actual OIDC network flow ([SN-AUTH-009](auth.md#sn-auth-009)), each provider's SDK wiring ([SN-AUTH-003](auth.md#sn-auth-003)/[SN-AUTH-004](auth.md#sn-auth-004)/[SN-AUTH-005](auth.md#sn-auth-005)/[SN-AUTH-006](auth.md#sn-auth-006)), the release-artifact CI scan ([SN-AUTH-021](auth.md#sn-auth-021)), and profile partitioning ([SN-AUTH-013](auth.md#sn-auth-013)).

#### Acceptance criteria
- [ ] The bypass accessor resolves to a compile-time false in release; a release build with --dart-define=SANE_AUTH_BYPASS=true still requires real sign-in (dead-code-eliminated branch, verified by a golden test on the accessor).
- [ ] assertAuthBypassSafe() throws at startup (bootstrap.dart) if the flag is true while kReleaseMode is true; the app cannot reach Library in that state.
- [ ] While bypass is active in a non-release build a persistent AUTH BYPASS — dev build watermark is rendered over every screen (PRD-AUTH-013).
- [ ] AuthState is an immutable sealed type; a switch over it is exhaustive; no mutable global auth singleton exists (CLAUDE.md §6).
- [ ] Auth failures return Result<Session, Failure>, never a thrown exception across a package boundary and never null-as-error.
- [ ] No token, account id, email or phone number is written to any log (SaneLog redaction; print() banned).

#### Technical notes
Read the flag only through one accessor (e.g. AuthBypass.enabled) implemented as const bool.fromEnvironment('SANE_AUTH_BYPASS') && !kReleaseMode so the release compiler folds it to false (see SN-FND-005 flavour/--dart-define matrix and overview §7.2). Wire assertAuthBypassSafe() into app bootstrap. Session/AuthState use sane_core sealed Result types; expose via Riverpod (ADR-0003). Keep app/lib/auth free of SDK imports — providers implement the interface. This path is CODEOWNERS-protected (CLAUDE.md §5).

#### Security & privacy
Threats: TM-E-01 bypass-in-release (Critical) countered by the three independent layers; TM-I-05 token/PII in logs countered by the SaneLog allow-list; TM-S-01 by keeping token handling behind the secure store. Controls: MASVS-AUTH-1, MASVS-RESILIENCE-2, MASVS-CODE-2, ASVS V6, OWASP-A07, CWE-489 (active debug code in production), CWE-798. Never weaken any of the three layers (CLAUDE.md §7 rule 5). This issue adds no network egress; note that in the PR.

#### UX notes
No end-user surface beyond the dev watermark, which must be unmistakable in every look and both modes (a translucent diagonal band using sane_ui tokens, never a hardcoded colour; Semantics label AUTH BYPASS dev build). The real Login/Profiles chrome is themed by SN-ONB-001 and design §3/§4; this issue only exposes the state that drives them.

#### Test plan
Unit: app/test/auth/auth_state_test.dart (exhaustive switch, transitions), app/test/auth/bypass_accessor_test.dart (false under kReleaseMode). Security: app/test/security/auth_bypass_test.dart asserts the guarded branch is unreachable in release mode (extended into a CI gate by [SN-AUTH-021](auth.md#sn-auth-021)). Widget: watermark renders while bypass active. No-PII-in-logs assertion test.

#### Dependencies
SN-FND-002, SN-FND-005, SN-CORE-001. Token persistence detail is [SN-AUTH-008](auth.md#sn-auth-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-003

<a id="sn-auth-003"></a>

**Implement Sign in with Google across all platforms**

| Field | Value |
|---|---|
| GitHub | #106 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-008](auth.md#sn-auth-008), [SN-AUTH-009](auth.md#sn-auth-009) |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `ASVS-V6`, `ASVS-V9`, `OWASP-A07`, `CWE-287`, `CWE-384` |
| Extra labels | needs-credentials, sec: masvs |

#### Context
The Login screen offers Continue with Google as the first social method (PRD-AUTH-001, design §3). It MUST use the platform's native account picker, never an in-app web form collecting the Google password (PRD-AUTH-002). Per platform docs the surfaces differ: Android uses Credential Manager / Google Identity Services (docs/platform/android.md §8, "Sign-in / passkeys"); iOS/iPadOS uses the GIS SDK; Web uses Google Identity Services (One Tap + token client, docs/platform/web.md §7). The chosen Dart package is google_sign_in v7 (its redesigned API — budget for the migration, per docs/platform/web.md §7 and research/flutter-ink-stack.md). On success the app navigates to Profiles and toasts Signed in with Google.

#### Scope
**In:** the GoogleAuthProvider implementing the [SN-AUTH-002](auth.md#sn-auth-002) auth interface on Android, Apple and Web; native picker invocation; exchanging the provider result into a Session; storing the resulting tokens via [SN-AUTH-008](auth.md#sn-auth-008); the success toast + navigation to Profiles.
**Out:** the shared OIDC/PKCE plumbing ([SN-AUTH-009](auth.md#sn-auth-009)), Google Drive authorization scopes for sync (that is SN-SYNC's drive.file scope, docs/platform/android.md §5), account linking ([SN-AUTH-012](auth.md#sn-auth-012)), and login-screen theming (SN-ONB-001).

#### Acceptance criteria
- [ ] Continue with Google opens the OS/native Google account picker on Android, iOS/iPadOS and the GIS flow on web — never an app-rendered password form.
- [ ] A successful sign-in yields a Session, stores access + refresh tokens in the secure store, navigates to Profiles, and toasts Signed in with Google.
- [ ] A cancelled or failed sign-in returns Result.failure, shows a non-blocking error, and leaves the user on the Login screen (no partial session).
- [ ] No Google token is written to the notes DB, logs, backups or synced store (PRD-AUTH-006).
- [ ] Identity is decoupled from note access: after sign-in the user still has no note plaintext exposure risk (keys are separate, SN-CRY-001).
- [ ] Client IDs are injected via --dart-define / CI secrets, never committed.

#### Technical notes
GoogleAuthProvider consumes google_sign_in v7 behind the auth abstraction (app/lib/auth). Web uses GIS (ID token split from OAuth authorization). Do NOT request Drive scopes here — authorization for the user's cloud is a separate SN-SYNC concern using the narrow drive.file scope. Tokens flow to [SN-AUTH-008](auth.md#sn-auth-008); the OIDC id_token nonce/state validation is shared via [SN-AUTH-009](auth.md#sn-auth-009). Requires a Google OAuth client ID per platform (Android SHA-256 cert, iOS bundle id, web origin) — see the credentials manifest [SN-AUTH-020](auth.md#sn-auth-020).

#### Security & privacy
Threats: token theft/replay (TM-S-01, CWE-287), CSRF on the web redirect (CWE-352/384 — mitigated by state, delegated to [SN-AUTH-009](auth.md#sn-auth-009)), phishing via a fake in-app form (prevented by mandating the native picker). Controls: MASVS-AUTH-1, MASVS-NETWORK-1 (TLS-only, no cleartext), ASVS V6/V9, OWASP-A07. Marked needs-credentials because a real Google OAuth client ID/secret must be supplied by the maintainer via CI secrets (CLAUDE.md §13); do not commit or hardcode it (Dart AOT is reversible, CLAUDE.md §7 rule 2).

#### UX notes
Button label, order and the toast copy are fixed by design §3 and PRD-AUTH-001/002; the Login screen chrome is built and themed by SN-ONB-001 across all 17 looks + dark mode. Button must have a 44pt/48dp target, a Semantics label, ≥4.5:1 contrast, and be keyboard-reachable on web (docs/design/accessibility.md). Show a loading state on the button while the picker/flow is in flight; render a clear inline error on failure.

#### Test plan
Widget: app/test/auth/google_sign_in_test.dart (success → Session + navigation; cancel → failure state). Integration (patrol): app/integration_test/auth_google_test.dart exercises the native picker on Android and iOS. Negative: token never appears in a captured log; a failed exchange leaves no session. Golden not required (chrome owned by SN-ONB-001).

#### Dependencies
SN-AUTH-002, SN-AUTH-008, SN-AUTH-009; maintainer client IDs tracked in [SN-AUTH-020](auth.md#sn-auth-020).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-004

<a id="sn-auth-004"></a>

**Implement Sign in with Microsoft via MSAL**

| Field | Value |
|---|---|
| GitHub | #107 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-008](auth.md#sn-auth-008), [SN-AUTH-009](auth.md#sn-auth-009) |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `ASVS-V6`, `ASVS-V9`, `OWASP-A07`, `CWE-287`, `CWE-384` |
| Extra labels | needs-credentials, sec: masvs |

#### Context
Continue with Microsoft is the third social method on the Login screen (PRD-AUTH-001, design §3), required for students/professionals on Microsoft 365 and a prerequisite for a future OneDrive sync backend. It MUST use MSAL — the Microsoft Authentication Library — behind the federated auth layer, never an in-app password form (PRD-AUTH-002). Web uses @azure/msal-browser with PKCE (docs/platform/web.md §7, "Microsoft"); ADAL is end-of-life and MUST NOT be used. The Dart package is aad_oauth (MSAL browser on web) per research/flutter-ink-stack.md.

#### Scope
**In:** a MicrosoftAuthProvider implementing the [SN-AUTH-002](auth.md#sn-auth-002) interface on all platforms via MSAL/aad_oauth; PKCE authorization-code flow; Session creation; token storage via [SN-AUTH-008](auth.md#sn-auth-008); success toast Signed in with Microsoft + navigation to Profiles.
**Out:** Microsoft Graph / OneDrive Files authorization for sync (SN-SYNC), the shared OIDC nonce/state helper ([SN-AUTH-009](auth.md#sn-auth-009)), account linking ([SN-AUTH-012](auth.md#sn-auth-012)), login-screen theming (SN-ONB-001).

#### Acceptance criteria
- [ ] Continue with Microsoft launches the MSAL system browser / broker flow (authorization-code + PKCE), never an app-rendered password form.
- [ ] Success yields a Session, stores access + refresh tokens in the secure store, navigates to Profiles, toasts Signed in with Microsoft.
- [ ] Cancellation/failure returns Result.failure with a non-blocking error and no partial session.
- [ ] Refresh-token rotation is honoured; an expired access token silently refreshes without a re-prompt where MSAL allows.
- [ ] No Microsoft token reaches the notes DB, logs, backups or synced store; client IDs come from --dart-define / CI secrets.

#### Technical notes
Use aad_oauth/MSAL behind app/lib/auth; configure the multi-tenant or consumers authority as the maintainer chooses (record in [SN-AUTH-020](auth.md#sn-auth-020)). Delegate state/nonce validation to [SN-AUTH-009](auth.md#sn-auth-009). Do not request Graph Files scopes here (that is sync). Requires an Azure app registration (client id + redirect URIs per platform) supplied by the maintainer. Prefer the system browser / auth broker over an embedded webview (OWASP OAuth best practice; also required by Google/Microsoft policy).

#### Security & privacy
Threats: token theft/replay (TM-S-01), authorization-code interception (mitigated by PKCE), CSRF on redirect (state, via [SN-AUTH-009](auth.md#sn-auth-009)), embedded-webview credential capture (avoided by using the system browser). Controls: MASVS-AUTH-1, MASVS-NETWORK-1, ASVS V6/V9, OWASP-A07, CWE-287/384. needs-credentials: the Azure client id/secret is maintainer-supplied via CI secrets (CLAUDE.md §13) and must never be committed.

#### UX notes
Label, order and toast copy per design §3 / PRD-AUTH-001. Chrome themed by SN-ONB-001 across 17 looks + dark mode. 44pt/48dp target, Semantics label, ≥4.5:1 contrast, keyboard-reachable on web. Button shows a spinner during the flow; failures render inline, not as a blocking dialog.

#### Test plan
Widget: app/test/auth/microsoft_sign_in_test.dart (success/cancel paths, refresh handling with a mock MSAL). Integration (patrol): app/integration_test/auth_microsoft_test.dart on Android + web redirect. Negative: no token in logs; failed flow leaves no session.

#### Dependencies
SN-AUTH-002, SN-AUTH-008, SN-AUTH-009; client IDs via [SN-AUTH-020](auth.md#sn-auth-020).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-005

<a id="sn-auth-005"></a>

**Implement Sign in with Apple (native and web JS)**

| Field | Value |
|---|---|
| GitHub | #108 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-008](auth.md#sn-auth-008), [SN-AUTH-009](auth.md#sn-auth-009) |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `ASVS-V6`, `ASVS-V9`, `OWASP-A07`, `CWE-287` |
| Extra labels | needs-credentials, sec: masvs |

#### Context
Sign in with Apple is required by App Store Guideline 4.8 whenever the app offers any third-party social login for the primary account (docs/platform/ipad.md §8/§9, PRD-AUTH-001). On Apple platforms it uses native ASAuthorization (AuthenticationServices); on Android and Web it uses Sign in with Apple JS (AppleID.auth), which needs a Services ID, a verified domain and HTTPS (docs/platform/web.md §7, "Apple" — the heaviest setup). The Dart package is sign_in_with_apple (web redirect flow). Success navigates to Profiles and toasts Signed in with Apple. Because Apple relays a private/hidden email on first consent, the provider must persist the returned name/email on the FIRST authorization only (Apple returns them once).

#### Scope
**In:** an AppleAuthProvider implementing the [SN-AUTH-002](auth.md#sn-auth-002) interface: native ASAuthorization on iOS/iPadOS, Sign in with Apple JS on web and Android; first-authorization name/email capture; Session creation; token storage via [SN-AUTH-008](auth.md#sn-auth-008); success toast + navigation.
**Out:** the shared OIDC helper ([SN-AUTH-009](auth.md#sn-auth-009)), account linking ([SN-AUTH-012](auth.md#sn-auth-012)), the App Store 4.8 compliance gate wording (tracked in the iPad release-gate work), login-screen theming (SN-ONB-001).

#### Acceptance criteria
- [ ] Sign in with Apple appears and works on all Apple platforms (native) and is available on web + Android (JS) so Guideline 4.8 is satisfied wherever other socials appear.
- [ ] The identity token is validated (issuer, audience, nonce) before a Session is created (nonce via [SN-AUTH-009](auth.md#sn-auth-009)).
- [ ] Name/email returned on the first authorization are captured and persisted once; subsequent sign-ins that omit them do not wipe the stored profile.
- [ ] Success stores tokens in the secure store, navigates to Profiles, toasts Signed in with Apple; cancel/failure returns Result.failure with no partial session.
- [ ] Services ID / key material is maintainer-supplied via CI secrets, never committed.

#### Technical notes
Use sign_in_with_apple: native ASAuthorizationController on Apple; the web redirect flow (AppleID.auth) on web/Android needs a Services ID + return URL + a domain-verified association. Generate and pass a nonce, validate it and the id_token claims on return (share validation with [SN-AUTH-009](auth.md#sn-auth-009)). Register NSFaceIDUsageDescription is unrelated here (that is per-profile lock, [SN-AUTH-014](auth.md#sn-auth-014)). Record the Services ID, team id and key in the credentials manifest [SN-AUTH-020](auth.md#sn-auth-020). Set ITSAppUsesNonExemptEncryption per docs/platform/ipad.md §9.

#### Security & privacy
Threats: id_token forgery/replay (TM-S-01 — countered by issuer/audience/nonce validation, CWE-287), email relay privacy (Apple private relay — do not attempt to de-anonymize; store what Apple returns), token theft (secure store). Controls: MASVS-AUTH-1, MASVS-NETWORK-1, ASVS V6/V9, OWASP-A07. needs-credentials: Apple Developer team, Services ID and key are maintainer-supplied (CLAUDE.md §13); never committed.

#### UX notes
Button uses Apple's required styling within the design system where the platform mandates it; label/order/toast per design §3 / PRD-AUTH-001; chrome themed by SN-ONB-001 across 17 looks + dark mode. 44pt/48dp target, Semantics label, contrast, keyboard-reachable on web. Loading state during the flow; inline error on failure.

#### Test plan
Widget: app/test/auth/apple_sign_in_test.dart (token-claim validation, first-auth email capture, cancel path). Integration (patrol): app/integration_test/auth_apple_test.dart on iPadOS native + web redirect. Negative: forged/altered id_token nonce is rejected; no token in logs.

#### Dependencies
SN-AUTH-002, SN-AUTH-008, SN-AUTH-009; credentials via [SN-AUTH-020](auth.md#sn-auth-020).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-006

<a id="sn-auth-006"></a>

**Implement phone-number OTP sign-in**

| Field | Value |
|---|---|
| GitHub | #109 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-008](auth.md#sn-auth-008) |
| Security controls | `MASVS-AUTH-1`, `MASVS-AUTH-2`, `MASVS-NETWORK-1`, `ASVS-V6`, `OWASP-A07`, `CWE-307`, `CWE-287` |
| Extra labels | needs-decision, needs-credentials, sec: masvs |

#### Context
Continue with mobile number is the primary/accent sign-in method (PRD-AUTH-001, design §3) and the most important for the India-first student persona who often has no card/email account. The flow has three steps (design §3, loginStep phone then otp): a fixed +91 prefix (locale-derived, other country codes at GA), Send code (rejects <10 digits with Enter a 10-digit mobile number, advances and toasts Code sent to +91 <phone>), then a 6-digit code with Verify and continue (rejects <6 digits, else navigates to Profiles), plus Change number and Resend code. The OTP **provider is undecided** (needs-decision, CLAUDE.md §13 / PRD open): candidates include Firebase Phone Auth, Twilio Verify, or an MSG91/India SMS gateway; the choice must satisfy the rate-limit and single-use requirements below and avoid vendor lock-in of the identity seam.

#### Scope
**In:** the PhoneOtpProvider implementing the [SN-AUTH-002](auth.md#sn-auth-002) interface behind a provider-neutral OtpGateway seam; the phone and otp UI states wired to real send/verify calls; client-side input validation and error copy exactly per design §3; resend/change-number controls; Session creation + token storage ([SN-AUTH-008](auth.md#sn-auth-008)).
**Out:** picking the SMS provider (needs-decision), country-code expansion beyond +91 at GA (verify list later), and login-screen theming (SN-ONB-001).

#### Acceptance criteria
- [ ] Send code rejects fewer than 10 digits with the toast Enter a 10-digit mobile number; otherwise advances to the otp step and toasts Code sent to +91 <phone> (design §3, PRD-AUTH-003).
- [ ] Verify and continue rejects fewer than 6 digits, else verifies server-side and navigates to Profiles; Change number and Resend code are present and functional (PRD-AUTH-003).
- [ ] OTP codes are single-use, server-verified (never validated client-side), and expire within 10 minutes (PRD-AUTH-004, MASVS-AUTH-1).
- [ ] Resends are rate-limited to at least 30s between sends and at most 5 per hour per number; abuse backs off (PRD-AUTH-004, TM-S-02, CWE-307).
- [ ] Account takeover via OTP/SIM-swap yields NO note plaintext (keys not derivable from identity — integration test, TM-S-02).
- [ ] The OtpGateway is provider-neutral so the vendor can be swapped without touching the auth abstraction.

#### Technical notes
Define OtpGateway.sendCode(e164) and verifyCode(e164, code) returning Result; implement one adapter for the chosen provider (leave a // DESIGN-OPEN / needs-decision marker naming the candidates). Strip non-digits on input (design setPhone, max 11 chars incl. space; setOtp max 6). Rate-limit + expiry are enforced by the provider AND defended client-side (disable Resend for 30s). Store the resulting session token via [SN-AUTH-008](auth.md#sn-auth-008). Record any provider API key in the credentials manifest [SN-AUTH-020](auth.md#sn-auth-020).

#### Security & privacy
Threats: OTP brute force and SIM-swap (TM-S-02, CWE-307 — countered by provider rate-limit/lockout + single-use codes + short expiry), replayed session (TM-S-01), phone number in logs (banned — TM-I-05, PRD-03 rule 3). Controls: MASVS-AUTH-1/2, MASVS-NETWORK-1, ASVS V6, OWASP-A07. OTP is identity only — it never gates note access (guest is first-class), and no note data is recoverable through an account (zero-knowledge, ADR-0004). needs-decision: SMS/OTP provider; needs-credentials: the provider API key (maintainer-supplied).

#### UX notes
Copy, step order and validation messages are verbatim from design §3 and must be preserved. Chrome themed by SN-ONB-001 across 17 looks + dark mode. The OTP input is large and letter-spaced (design); provide a Semantics label, 44pt/48dp targets, contrast, and keyboard/paste support (auto-fill one-time-code where the OS supports it). Show a countdown on Resend; render send/verify failures inline.

#### Test plan
Unit: app/test/auth/otp_gateway_test.dart (validation thresholds, rate-limit backoff, single-use with a fake gateway). Widget: app/test/auth/phone_otp_flow_test.dart (phone→otp→profiles, change number, resend disabled window). Integration (patrol): app/integration_test/auth_otp_test.dart. Abuse: brute-force attempts are throttled; account-takeover yields no plaintext.

#### Dependencies
SN-AUTH-002, SN-AUTH-008; provider decision + key via [SN-AUTH-020](auth.md#sn-auth-020).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-007

<a id="sn-auth-007"></a>

**Implement local profiles (multiple per device, add and switch)**

| Field | Value |
|---|---|
| GitHub | #110 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, onboarding |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `ASVS-V6`, `OWASP-A01`, `CWE-284` |
| Extra labels | agent-ready, sec: masvs |

#### Context
Profiles are a Netflix-style local partition — multiple people or contexts on one device, one shared sign-in (PRD-PROF-001..003, design §4 Who's writing?). The Profiles screen lists local profiles as tiles (rounded-square avatar with initial, name, note); tapping activates and opens Library, and on first run after login also opens the onboarding tour. This issue builds the profile model, the Profiles screen behaviour, and the add/switch flow that also appears under Settings → Account → Profiles on this account (design §12). Seed profiles from the persona: Riya (Owner), Aarav (Sibling), Work (Workspace). The actual per-profile data partition and lock are separate issues ([SN-AUTH-013](auth.md#sn-auth-013), [SN-AUTH-014](auth.md#sn-auth-014)).

#### Scope
**In:** the Profile value object ({ id, name, initials, colour, role, note }) and a ProfileRepository in the document model; the Profiles screen (tiles, active-ring + Current / Switch labels, pickProfile → Library, firstRun → onboarding); Add profile inline name input (max 24 chars) → Create (rotating colour, role Member, note New profile, toast Profile added — <name>) and Cancel; Use a different account → sign-out ([SN-AUTH-017](auth.md#sn-auth-017)); the mirrored add/switch UI in Settings → Account.
**Out:** the per-profile data isolation guarantee ([SN-AUTH-013](auth.md#sn-auth-013)), per-profile biometric lock ([SN-AUTH-014](auth.md#sn-auth-014)), rename/delete/manage ([SN-AUTH-015](auth.md#sn-auth-015)), entitlement scope ([SN-AUTH-016](auth.md#sn-auth-016)), and the onboarding tour content (SN-ONB-001).

#### Acceptance criteria
- [ ] The Profiles screen lists all local profiles; the active one shows an accent ring + Current, others show Switch (design §4, PRD-PROF-001).
- [ ] Tapping a tile activates it and opens Library; the first pick after login also opens the onboarding overlay once, then clears firstRun (PRD-PROF-001).
- [ ] Add profile reveals an inline name input capped at 24 chars; Create appends a profile with a rotating colour and toasts Profile added — <name>; Cancel dismisses with no change (PRD-PROF-002).
- [ ] The same add/switch flow exists under Settings → Account → Profiles on this account (PRD-PROF-002).
- [ ] Profiles persist locally and survive app restart; profile data lives in the document model, not shared prefs.
- [ ] A guest session has exactly one implicit Guest profile until an account is attached.

#### Technical notes
Model the Profile under Workspace → Profiles in sane_core (per the document model, [SN-AUTH-013](auth.md#sn-auth-013) adds the partition columns). Persist via the drift store (sane_core repositories; heavy content stays in the blob store). Drive the active profile through a Riverpod provider so switching re-derives the whole app tree (ADR-0003). The Profiles screen consumes sane_ui components (SN-DS-003). Keep identity (one sign-in) separate from profiles (many local) — a signed-out/guest device still has profiles.

#### Security & privacy
Threats: one profile reading another's data (broken access control, OWASP-A01, CWE-284) — the hard guarantee is delivered by [SN-AUTH-013](auth.md#sn-auth-013); this issue must not leak cross-profile data through a shared provider or cache. Controls: MASVS-STORAGE-1, MASVS-PRIVACY-2, ASVS V6. No new network egress; profiles are local (PRD-PROF-001). Note in the PR that the isolation guarantee is completed in [SN-AUTH-013](auth.md#sn-auth-013).

#### UX notes
Screen structure, copy and seed profiles are fixed by design §4 (Who's writing? / One account, a private space for each of you). Render across all 17 looks + dark mode; tiles need Semantics labels (name + role + Current/Switch), 44pt/48dp targets, ≥4.5:1 contrast, and keyboard navigation on web. Empty state: at least the Add profile tile is always present. The name input validates length inline (max 24). Golden-test the tile grid across looks.

#### Test plan
Unit: app/test/auth/profile_repository_test.dart (add, list, activate, name cap). Widget: app/test/auth/profiles_screen_test.dart (pick → library, firstRun → onboarding once, add/cancel). Golden: profiles_screen goldens across a sample of looks + dark. Integration: switch profile persists across restart.

#### Dependencies
SN-AUTH-002, SN-CORE-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-008

<a id="sn-auth-008"></a>

**Store identity tokens in the platform secure store**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AUTH-002](auth.md#sn-auth-002) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-STORAGE-2`, `MASVS-CRYPTO-1`, `ASVS-V6`, `OWASP-A02`, `CWE-522`, `CWE-312` |
| Extra labels | agent-ready, sec: masvs |

#### Context
Tokens from any provider (OIDC access + refresh tokens, the phone-OTP session) MUST be stored only in the platform secure store and MUST NOT be written to the notes DB, logs, backups or the synced cloud store (PRD-AUTH-006, threat-model TM-I-03/TM-I-05). This task implements the SessionStore that the auth abstraction ([SN-AUTH-002](auth.md#sn-auth-002)) and every provider use, backed by the sane_secure_store plugin: Keychain (kSecAttrAccessibleWhenUnlocked, optionally Secure Enclave) on Apple, Android Keystore + AES-GCM (StrongBox where available) on Android, and the reduced-guarantee WebCrypto/session posture on web (docs/platform/ipad.md §8, docs/platform/android.md §8, docs/platform/web.md §7, R4).

#### Scope
**In:** a SessionStore (put/get/delete access+refresh tokens keyed by provider+account) over sane_secure_store; refresh-token rotation storage; token wipe on sign-out ([SN-AUTH-017](auth.md#sn-auth-017)); a documented web posture (tokens held in memory + short-lived, not in unprotected localStorage).
**Out:** the master-key hierarchy and per-notebook key wrapping (SN-CRY-001/002 — this task only stores identity tokens), and the biometric gate for note content ([SN-AUTH-014](auth.md#sn-auth-014)).

#### Acceptance criteria
- [ ] Access and refresh tokens are written only through sane_secure_store; a filesystem/DB/log/backup scan finds no token material (MASVS-STORAGE-2).
- [ ] On Android the Keystore key is hardware-backed where available (StrongBox requested, TEE fallback); on Apple items use an appropriate accessibility class and are excluded from backups.
- [ ] Sign-out deletes all token entries for the account; a subsequent launch shows signed-out.
- [ ] The web build never persists a long-lived token in localStorage/IndexedDB in cleartext; the reduced-guarantee posture is documented in the privacy dashboard (SN-PRV-001) and PR.
- [ ] Tokens are never logged (SaneLog redaction allow-list; print() banned).

#### Technical notes
Use sane_secure_store (platform-interface + Swift/Kotlin impls; do NOT use the deprecated Android Jetpack Security EncryptedFile — docs/platform/android.md §2). Keys wrap the token blob with a hardware-backed key; store per provider+account id. Android: KeyGenParameterSpec with setIsStrongBoxBacked(true) + AES-GCM (docs/platform/android.md §8). Apple: Keychain Services, optionally kSecAttrSynchronizable for iCloud Keychain escrow of long-lived items only where intended (docs/platform/ipad.md §8). Web: derive/wrap per session; do not rely on flutter_secure_storage web (R4). This is a CODEOWNERS-protected path.

#### Security & privacy
Threats: token extraction from disk/backup (TM-I-03/TM-I-10, CWE-522/312), token in logs (TM-I-05). Controls: MASVS-STORAGE-2, MASVS-CRYPTO-1, ASVS V6, OWASP-A02. Fail closed: if the secure store is unavailable, do not fall back to plaintext storage — surface an error and remain signed-out. Update the threat model only if a new stored asset/flow is introduced (it is not — this hardens A6 identity tokens).

#### UX notes
None beyond baseline (no user-facing surface). Baseline: no token or account identifier is ever logged; the web reduced-guarantee posture must be surfaced truthfully in the privacy dashboard (SN-PRV-001). No new visual elements.

#### Test plan
Unit: app/test/auth/session_store_test.dart with a mock secure store (put/get/delete, rotation, wipe-on-signout). Security: a test asserting no token string appears in captured logs or a DB dump; platform tests (patrol) that a stored token survives restart and is removed on sign-out. Android: assert KeyInfo security level is queried.

#### Dependencies
SN-AUTH-002, SN-CRY-002 (secure key storage plugin/hierarchy).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-009

<a id="sn-auth-009"></a>

**Implement shared OIDC PKCE sign-in flow (state, nonce, redirect)**

| Field | Value |
|---|---|
| GitHub | #111 |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-008](auth.md#sn-auth-008) |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `ASVS-V6`, `ASVS-V9`, `OWASP-A07`, `CWE-287`, `CWE-384`, `CWE-352` |
| Extra labels | agent-ready, sec: masvs, sec: asvs |

#### Context
Google, Microsoft and Apple sign-in all share the same OpenID Connect / OAuth2 machinery, and getting it wrong is the classic identity vulnerability (TM-S-01 in docs/security/threat-model.md). This issue implements the shared, provider-neutral OIDC helper: PKCE (code_verifier/code_challenge), a random state to defend the redirect against CSRF, a random nonce bound into the id_token, id_token claim validation (issuer, audience, expiry, nonce), and safe redirect handling on each platform (system browser / ASWebAuthenticationSession on Apple, Custom Tabs on Android, redirect flow on web). Providers ([SN-AUTH-003](auth.md#sn-auth-003)/[SN-AUTH-004](auth.md#sn-auth-004)/[SN-AUTH-005](auth.md#sn-auth-005)) plug their endpoints and client IDs into this helper rather than re-implementing it.

#### Scope
**In:** an OidcFlow helper (buildAuthUrl, handleRedirect, validateIdToken) with PKCE + state + nonce; secure-context redirect handling per platform; id_token signature/claims verification against the provider JWKS; single-use state/nonce enforcement; a typed OidcResult feeding [SN-AUTH-002](auth.md#sn-auth-002) Session creation.
**Out:** provider-specific SDK/button wiring (the three provider issues), token persistence ([SN-AUTH-008](auth.md#sn-auth-008)), and drive/graph authorization scopes (SN-SYNC).

#### Acceptance criteria
- [ ] Every authorization request carries a unique code_verifier, state and nonce generated with a CSPRNG; state and nonce are single-use and validated on return.
- [ ] A redirect whose state does not match the pending request is rejected (CSRF defence, CWE-352/384) and no Session is created.
- [ ] The id_token is verified (signature via provider JWKS, issuer, audience, exp, and the bound nonce) before any Session is created; a forged/altered token is refused.
- [ ] Authorization uses the system browser / ASWebAuthenticationSession / Custom Tabs, never an embedded webview that could capture the provider password.
- [ ] All traffic is TLS 1.2+; no cleartext; the flow works on all five surfaces.
- [ ] The helper is provider-neutral: adding a fourth OIDC provider needs only endpoint + client-id config.

#### Technical notes
Generate the verifier/state/nonce from a CSPRNG (dart:math Random.secure or platform crypto). Use flutter_appauth / package_specific flows behind app/lib/auth, or hand-rolled with the system browser via url_launcher + a redirect listener — but ALWAYS validate state and the id_token claims yourself; do not trust an SDK to have checked the nonce. Verify the id_token against the provider JWKS (cache keys with rotation). On web, ensure the redirect origin is exact and the flow runs on the app's own isolated origin (docs/platform/web.md §8/§9). This is a CODEOWNERS-protected path.

#### Security & privacy
Threats: token replay/forgery (TM-S-01, CWE-287), CSRF on redirect (CWE-352/384), embedded-webview credential theft, JWKS-rotation acceptance of a stale key. Controls: MASVS-AUTH-1, MASVS-NETWORK-1, ASVS V6/V9, OWASP-A07. Fail closed on any validation error (no partial session). No id_token/claims are logged. This helper is the single verification point the identity abuse suite ([SN-AUTH-019](auth.md#sn-auth-019)) targets.

#### UX notes
None beyond baseline — no independent UI (the buttons live in the provider issues / SN-ONB-001). Baseline: no token/claim logging; any error surfaces to the caller as Result.failure to render inline, never a raw exception dialog.

#### Test plan
Unit: app/test/auth/oidc_flow_test.dart — CSPRNG uniqueness, state-mismatch rejection, nonce-mismatch rejection, expired/invalid-audience id_token rejection, JWKS signature verification with a rotated key. Integration (patrol): app/integration_test/auth_oidc_redirect_test.dart exercises the system-browser redirect on Android + web. Abuse cases feed [SN-AUTH-019](auth.md#sn-auth-019).

#### Dependencies
SN-AUTH-002, SN-AUTH-008.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-010

<a id="sn-auth-010"></a>

**Make guest mode a first-class, no-account note-taking path**

| Field | Value |
|---|---|
| GitHub | #112 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, onboarding |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `ASVS-V6`, `OWASP-A01`, `CWE-284` |
| Extra labels | agent-ready, innovation, sec: privacy-by-design |

#### Context
Identity is never required to take notes (locked decision #2/#5, ADR-0004). The design mock has no skip control — a design gap the PRD closes: the Login screen MUST offer a tertiary Skip for now — take notes without an account under the methods (PRD-AUTH-007). Choosing it creates a local Guest profile and lands on Library (no onboarding gate beyond the optional tour). Guest mode MUST provide the full note-taking experience with no network call, disabling only account-bound features (sync, sharing, cross-device entitlement, student verification), each behind a single inline Sign in to <benefit> affordance rather than a whole-screen block (PRD-AUTH-008/009). This is a genuine differentiator: competitors either force an account or reduce guests to a demo.

#### Scope
**In:** the Skip for now control on the Login screen; creating a local Guest profile and landing on Library; making every core feature (create/edit/organize notebooks, ink, PDF import within Free limits, audio, on-device search, local export) work offline as guest; the inline Sign in to <benefit> affordances on account-bound surfaces.
**Out:** adopting guest data on later sign-in ([SN-AUTH-011](auth.md#sn-auth-011)), the onboarding tour (SN-ONB-001), the actual Free/Pro limits enforcement (SN-BILL-001), and sync (SN-SYNC-001).

#### Acceptance criteria
- [ ] The Login screen shows a Skip for now — take notes without an account tertiary link under the methods (PRD-AUTH-007).
- [ ] Choosing it creates a local Guest profile and opens Library with zero network calls (verified by a network-log assertion).
- [ ] As guest, a user can create/edit/organize notebooks, ink, import a PDF (within Free limits), record audio, search on-device and export locally (PRD-AUTH-008).
- [ ] Account-bound surfaces (sync, sharing, cross-device entitlement, student verification) show a single inline Sign in to <benefit> affordance, not a blocking gate (PRD-AUTH-009).
- [ ] Airplane mode does not degrade any guest note-taking capability.

#### Technical notes
Guest is an AuthState.guest with an implicit local Guest profile ([SN-AUTH-007](auth.md#sn-auth-007)). No token exists. Feature availability is a capability query (accountRequired?), not a platform check; account-bound widgets render the inline upsell affordance. Keep note-taking entirely local (drift + blob store, sane_core); guest at-rest protection SHOULD still use a device-bound Keystore/Keychain key (PRD-STOR-003) even without a user passphrase. The Skip control lives on the Login screen chrome (SN-ONB-001) but the behaviour/state is owned here.

#### Security & privacy
Threats: an account-bound feature accidentally leaking to the network as guest (would violate no-egress; A01/CWE-284), guest data readable across profiles. Controls: MASVS-PRIVACY-1 (no unexpected data collection), MASVS-STORAGE-1 (device-bound at-rest key), ASVS V6. Privacy-by-design: guest is the maximally-private default — nothing leaves the device. Assert in tests that guest triggers no egress. Update the privacy dashboard (SN-PRV-001) to reflect guest as the zero-collection default.

#### UX notes
The Skip link and the What leaves this device promise are the honest, student-readable framing (design §16, PRD-PRIV-001). Render the inline upsell affordances using sane_ui components across all 17 looks + dark mode; each needs a Semantics label, 44pt/48dp target, contrast, and keyboard reachability on web. Empty state for a fresh guest is Library Nothing here yet (design §6). No dead-ends: every gated feature explains the one-tap path to sign in.

#### Test plan
Widget: app/test/auth/guest_mode_test.dart (skip → guest profile → library; account-bound surface shows inline upsell). Integration (patrol): app/integration_test/guest_offline_test.dart runs core flows in airplane mode. Negative: a network-egress assertion proves guest note-taking makes no calls.

#### Dependencies
SN-AUTH-002 (auth state); works with [SN-AUTH-007](auth.md#sn-auth-007) (Guest profile).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-011

<a id="sn-auth-011"></a>

**Adopt guest data in place when a user signs in later**

| Field | Value |
|---|---|
| GitHub | #113 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-010](auth.md#sn-auth-010), [SN-AUTH-002](auth.md#sn-auth-002), [SN-CRY-001](security.md#sn-cry-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `ASVS-V6`, `OWASP-A01`, `CWE-212` |
| Extra labels | needs-decision, sec: privacy-by-design |

#### Context
When a guest signs in later, the app MUST adopt (not discard) the existing local workspace: the current local data is attached to the new identity in place, with a one-line confirmation Your notes stay on this device and are now linked to <account>, and NOTHING is uploaded until sync is explicitly enabled (PRD-AUTH-010). This is the bridge from first-class guest ([SN-AUTH-010](auth.md#sn-auth-010)) to an account without the data-loss trap competitors fall into. There is an open maintainer decision on the friction of the first-time E2EE key-setup + recovery-code flow that a later sync enable triggers (PRD-03 §15.5, needs-decision) — this issue must make adoption itself lossless and defer key setup to the sync/E2EE flow (SN-CRY-001 / SN-SYNC-001).

#### Scope
**In:** detecting a sign-in from a guest state; re-parenting the Guest profile's workspace to the newly signed-in account in place (no copy, no upload); the confirmation copy; leaving sync OFF until the user turns it on.
**Out:** the E2EE key setup + recovery code (SN-CRY-001), turning on sync (SN-SYNC-001), account linking of a second provider ([SN-AUTH-012](auth.md#sn-auth-012)), and resolving the migration-friction decision (maintainer, PRD §15.5).

#### Acceptance criteria
- [ ] Signing in from guest keeps every existing notebook/page/attachment in place and attributes it to the new account — no data is lost, duplicated or moved (PRD-AUTH-010).
- [ ] A one-line confirmation Your notes stay on this device and are now linked to <account> is shown after adoption.
- [ ] No note content is uploaded during or after adoption until sync is explicitly enabled (network-egress assertion).
- [ ] If the user cancels sign-in mid-flow, the guest workspace is untouched and remains usable.
- [ ] Adoption is idempotent: repeating it (e.g. a retried sign-in) does not fork or duplicate the workspace.

#### Technical notes
Adoption re-parents the existing local Workspace/Profile records to the account id via the sane_core repositories — a metadata update, not a data migration; blobs are content-addressed and untouched. Guard against partial state with a transactional update (drift). Defer any encryption re-keying to the E2EE setup (SN-CRY-001) which only runs when sync is enabled; adoption itself changes no ciphertext. Leave a // needs-decision marker referencing PRD §15.5 for the key-setup friction question. Keep the operation off the UI isolate if it touches many rows.

#### Security & privacy
Threats: silent upload on sign-in (would break zero-server promise — must be prevented; A01), incomplete adoption leaving orphaned/cross-account data (CWE-212), cross-profile leakage. Controls: MASVS-STORAGE-1, MASVS-PRIVACY-2, ASVS V6. Privacy-by-design: sign-in changes attribution, not data location, and never triggers egress. needs-decision: the acceptable friction of the later key-setup/recovery flow is a maintainer call (PRD §15.5) and is out of this issue's control.

#### UX notes
The confirmation copy is fixed by PRD-AUTH-010 and must read exactly; render it as a non-blocking toast/inline banner via sane_ui across all 17 looks + dark mode, with a Semantics announcement for screen readers. No modal that blocks note-taking. If the user later enables sync, hand off to the E2EE setup UX (SN-CRY-001) rather than surfacing keys here.

#### Test plan
Unit: app/test/auth/guest_adoption_test.dart (re-parent keeps all rows, idempotent, transactional rollback on failure). Widget: confirmation banner appears. Integration: guest creates notes → signs in → notes intact → no egress until sync enabled (network assertion).

#### Dependencies
SN-AUTH-010, SN-AUTH-002, SN-CRY-001 (deferred key setup on later sync enable).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-012

<a id="sn-auth-012"></a>

**Link multiple sign-in providers to one identity**

| Field | Value |
|---|---|
| GitHub | #114 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-003](auth.md#sn-auth-003), [SN-AUTH-009](auth.md#sn-auth-009) |
| Security controls | `MASVS-AUTH-1`, `ASVS-V6`, `OWASP-A07`, `CWE-287`, `CWE-863` |
| Extra labels | needs-decision, sec: masvs |

#### Context
A student may sign in with Google today and Apple tomorrow, or a phone number and Google, and expect the same account and entitlement — not a duplicate. This issue lets a signed-in user link additional providers to one identity and resolves the same-email collision case (two providers returning the same verified email should converge, not fork). Because the product is zero-knowledge and the account is thin (identity + entitlement only, ADR-0004), linking affects the entitlement/identity association ([SN-AUTH-016](auth.md#sn-auth-016), SN-BILL-001), never note keys. The exact identity model (link by verified email vs an entitlement-provider app-user id, and whether Apple's private-relay email can be reconciled) is a **maintainer decision** (needs-decision) — implement the decisive default of app-user-id-based linking with verified-email hints and leave the hook.

#### Scope
**In:** a Link account action (Settings → Account) that runs a provider sign-in ([SN-AUTH-009](auth.md#sn-auth-009)) while already signed in and associates it with the current identity; detecting and merging a same-verified-email collision into one identity; showing linked providers; unlinking a provider (keeping at least one).
**Out:** the underlying entitlement association model (SN-BILL-001 / [SN-AUTH-016](auth.md#sn-auth-016)), guest adoption ([SN-AUTH-011](auth.md#sn-auth-011)), and the final identity-model decision (maintainer).

#### Acceptance criteria
- [ ] A signed-in user can add a second provider; afterwards either provider signs into the same account with the same entitlement (PRD-PROF-006 scope).
- [ ] Two providers returning the same verified email converge to one identity rather than creating a duplicate account.
- [ ] Linked providers are listed under Settings → Account; a provider can be unlinked while at least one sign-in method remains.
- [ ] Linking never exposes or re-keys note content (identity/entitlement only, zero-knowledge).
- [ ] An attempt to link a provider already bound to a different account is refused with a clear message (no silent account takeover, CWE-863).

#### Technical notes
Reuse [SN-AUTH-009](auth.md#sn-auth-009) for the link sign-in; the association lives in the identity/entitlement layer (RevenueCat-style app_user_id per SN-BILL-001, PRD-BILL-011). Treat Apple private-relay emails as opaque — do not attempt de-anonymization; link by app_user_id with verified-email as a hint only. Leave a // needs-decision marker citing the identity-model question. Enforce that unlinking cannot leave an account with zero sign-in methods.

#### Security & privacy
Threats: account takeover by linking a victim's email/provider (CWE-287/863), privilege confusion between two identities (broken authorization). Controls: MASVS-AUTH-1, ASVS V6, OWASP-A07. Every link/unlink requires the user to be already authenticated for the current account and to complete a fresh provider sign-in. No note keys are touched. needs-decision: the canonical identity key (app_user_id vs verified email) and private-relay reconciliation are maintainer calls.

#### UX notes
Linked-providers UI lives under Settings → Account (design §12) built with sane_ui across all 17 looks + dark mode; each row needs a Semantics label, 44pt/48dp target, contrast, keyboard reachability on web. Collision and refusal states show clear, non-technical copy. Confirm before unlinking the last-but-one method.

#### Test plan
Unit: app/test/auth/account_linking_test.dart (link adds provider, same-email converges, unlink keeps >=1, cross-account link refused). Widget: linked-providers list renders and updates. Integration (patrol): link Apple to a Google-signed-in session.

#### Dependencies
SN-AUTH-003, SN-AUTH-009; entitlement association SN-BILL-001 / [SN-AUTH-016](auth.md#sn-auth-016).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-013

<a id="sn-auth-013"></a>

**Enforce per-profile data isolation**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-007](auth.md#sn-auth-007) |
| Depends on | [SN-AUTH-007](auth.md#sn-auth-007), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `ASVS-V6`, `OWASP-A01`, `CWE-284`, `CWE-639` |
| Extra labels | agent-ready, sec: masvs |

#### Context
Profiles claim separate notebooks and looks, but the mock only swaps the avatar. PRD-PROF-004 (P0) makes real isolation the spec: each profile MUST own an isolated partition of notebooks/pages/attachments, look/dark-mode/wallpaper, all SET preferences, sync configuration, and (where applicable) its own encryption sub-keys — and switching profiles MUST swap the entire visible dataset, not just the avatar. This is the M4 exit criterion Switching profiles swaps the entire visible dataset (docs/roadmap.md M4). It is a broken-access-control guarantee (OWASP-A01): profile B must never see profile A's data through a shared query, cache, index or provider.

#### Scope
**In:** partitioning every profile-scoped store by profile id — notebooks/pages/attachments, preferences (SET), sync config, search index, thumbnails/caches; making the active-profile provider re-derive the whole app tree on switch; scoping per-profile encryption sub-keys where a profile is locked ([SN-AUTH-014](auth.md#sn-auth-014)).
**Out:** the biometric lock itself ([SN-AUTH-014](auth.md#sn-auth-014)), device-scoped settings that intentionally stay shared (e.g. wallpaper sane.wall is device-scoped, PRD-SET-013), and cross-device sync partitioning (SN-SYNC-001, which uses one target per profile).

#### Acceptance criteria
- [ ] Switching profiles swaps the entire visible dataset — notebooks, look, wallpaper (per its scope), preferences and sync config — verified by an integration test, not just the avatar (PRD-PROF-004).
- [ ] No query, cache, FTS index or Riverpod provider returns another profile's notebooks, thumbnails or preferences (broken-access-control test, CWE-639).
- [ ] Preferences and sync configuration are profile-scoped except explicitly device-scoped ones (sane.wall), which stay shared per PRD-SET-013/PRD-SET-019.
- [ ] A locked profile's partition (content, thumbnails, search index) is unreadable until unlock (composes with [SN-AUTH-014](auth.md#sn-auth-014)).
- [ ] Deleting or switching a profile never mutates another profile's partition.

#### Technical notes
Add a profileId scope column/key to the drift schema (SN-CORE-004 persistence) and every profile-scoped repository query; scope the FTS index and thumbnail/cache directories by profile id. Drive the active profile via a single Riverpod provider so switching invalidates and re-derives dependent providers (ADR-0003) — no stale cross-profile state. Per-profile encryption sub-keys derive from the key hierarchy (SN-CRY-001) only where a profile is locked. Device-scoped settings (sane.wall) explicitly bypass the partition (PRD-SET-013). Keep heavy re-derivation off the UI isolate.

#### Security & privacy
Threats: cross-profile data disclosure (OWASP-A01, CWE-284/639, LINDDUN-Disclosure), a shared cache/index leaking another profile's titles/thumbnails. Controls: MASVS-STORAGE-1, MASVS-PRIVACY-2, ASVS V6. This is a trust boundary between local profiles — add/adjust the relevant note in docs/security/threat-model.md if the stored-asset partition changes. Fail closed: an unscoped query is a bug the tests must catch.

#### UX notes
Switching is instant and total: the greeting, notebook set, look/dark-mode and preferences all change together (design §4/§12). Render correctly across all 17 looks + dark mode (each profile may choose a different look). Provide a clear active-profile indicator; ensure screen readers announce the switch. No end-user control here beyond what [SN-AUTH-007](auth.md#sn-auth-007) exposes.

#### Test plan
Unit: app/test/auth/profile_isolation_test.dart (every profile-scoped repository filters by profile id; unscoped access throws in debug). Security: app/test/security/profile_access_control_test.dart proves profile B cannot read profile A's notebooks/index/thumbnails. Integration (patrol): switch profile → entire dataset + look swap persists across restart.

#### Dependencies
SN-AUTH-007, SN-CORE-004 (persistence). Composes with [SN-AUTH-014](auth.md#sn-auth-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-014

<a id="sn-auth-014"></a>

**Add per-profile biometric lock**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | auth, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-007](auth.md#sn-auth-007) |
| Depends on | [SN-AUTH-007](auth.md#sn-auth-007), [SN-AUTH-013](auth.md#sn-auth-013), [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-AUTH-2`, `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `ASVS-V6`, `OWASP-A01`, `CWE-287` |
| Extra labels | agent-ready, sec: masvs |

#### Context
A profile MAY be marked locked; a locked profile MUST require device biometric (Face ID / Touch ID / Android BiometricPrompt class 3) or the device passcode as fallback before its tiles open, and its content, thumbnails and search index MUST remain encrypted-at-rest and unreadable until unlock (PRD-PROF-005). This composes with per-profile isolation ([SN-AUTH-013](auth.md#sn-auth-013)) and the app-wide lock (SN-SET-001 / LOCK §12): unlocking the app does not auto-unlock a locked profile (PRD-LOCK-003). The app MUST NOT expose its own weaker PIN that undercuts the platform gate (PRD-LOCK-002/006, MASVS-AUTH).

#### Scope
**In:** a per-profile locked flag + the biometric gate on profile open (LAContext .deviceOwnerAuthentication on Apple, BiometricPrompt + Keystore CryptoObject on Android); keeping a locked profile's partition keys wrapped by a biometric-gated key so content/thumbnails/index are unreadable until unlock; composing predictably with app lock.
**Out:** app-wide lock and its timeout (SN-SET-001 / LOCK), per-notebook/folder lock (PRD-LOCK-005, likely SN-LIB/SN-SET), clipboard/screenshot protection (LEAK, SN-SET-001), and the web reduced-guarantee posture (web excluded from this issue's platforms — no Keychain/Keystore).

#### Acceptance criteria
- [ ] Marking a profile locked requires biometric/passcode on every subsequent open of that profile (PRD-PROF-005).
- [ ] A locked profile's notes, thumbnails and search index are unreadable at rest until unlock — decryption keys are biometric-gated in the secure store (MASVS-STORAGE-1/2).
- [ ] Failed biometric falls back to the device passcode; the app exposes no separate weaker PIN (PRD-LOCK-002, MASVS-AUTH).
- [ ] Unlocking the app does not auto-unlock a locked profile; each locked profile is gated independently (PRD-LOCK-003).
- [ ] Biometric enrollment changes are handled per policy (setInvalidatedByBiometricEnrollment configured deliberately, docs/platform/android.md §8).

#### Technical notes
Apple: LAContext.evaluatePolicy(.deviceOwnerAuthentication) (needs NSFaceIDUsageDescription, docs/platform/ipad.md §8); wrap the profile partition key with a Keychain item gated by biometryCurrentSet. Android: BiometricPrompt + a Keystore key created with setUserAuthenticationParameters(AUTH_BIOMETRIC_STRONG | AUTH_DEVICE_CREDENTIAL) via sane_secure_store (docs/platform/android.md §8). The partition keys come from the key hierarchy (SN-CRY-002). Compose with [SN-AUTH-013](auth.md#sn-auth-013): a locked partition stays encrypted until the gate passes. Suppress the locked profile's previews everywhere (feeds LEAK, SN-SET-001).

#### Security & privacy
Threats: unlocked-device access to a locked profile (TM-I-03/TM-I-07, CWE-287), a self-rolled PIN weakening the platform gate, previews leaking on the lock screen/app switcher. Controls: MASVS-AUTH-2, MASVS-STORAGE-1/2, ASVS V6, OWASP-A01. Fail closed: on any keying/biometric error show a locked state, never partial content (PRD-KEY-009). This is a CODEOWNERS-protected path; update the threat model if the stored-key gating changes.

#### UX notes
Locked tiles show a lock affordance on the Profiles screen (design §4) and prompt the system biometric sheet on open, rendered consistently across all 17 looks + dark mode. Provide Semantics labels (Locked profile, unlock with Face ID), 44pt/48dp targets and contrast. On repeated failure, fall back to passcode via the OS sheet — never a custom PIN pad. Excluded on web (no hardware key store) — surface that honestly in the privacy dashboard (SN-PRV-001).

#### Test plan
Unit: app/test/auth/profile_lock_test.dart (locked flag gates open; keys stay wrapped until unlock). Integration (patrol): app/integration_test/profile_biometric_test.dart drives the biometric sheet on iOS + Android and asserts content is unreadable pre-unlock and that app-unlock does not unlock the profile. Negative: no custom PIN path exists.

#### Dependencies
SN-AUTH-007, SN-AUTH-013, SN-CRY-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-015

<a id="sn-auth-015"></a>

**Add profile management (rename, recolour, delete, set lock)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, settings |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AUTH-007](auth.md#sn-auth-007) |
| Depends on | [SN-AUTH-007](auth.md#sn-auth-007), [SN-AUTH-014](auth.md#sn-auth-014) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `ASVS-V6`, `OWASP-A01`, `CWE-284` |
| Extra labels | agent-ready, good first issue, sec: privacy-by-design |

#### Context
Profile management (rename, change note/colour, delete a profile, set/clear lock) MUST be reachable from Settings → Account (PRD-PROF-007). Deleting a profile MUST warn that it removes that profile's local notes and prompt to export first, and MUST NOT touch other profiles (PRD-PROF-007, composes with per-profile isolation [SN-AUTH-013](auth.md#sn-auth-013)). This completes the profiles feature ([SN-AUTH-007](auth.md#sn-auth-007)) with the edit/remove operations the mock lacks (design open questions 3/15).

#### Scope
**In:** the Settings → Account → Profiles management UI: rename (max 24 chars), change note, change colour, set/clear the biometric lock ([SN-AUTH-014](auth.md#sn-auth-014)), and delete a profile with an export-first warning and scope confirmation.
**Out:** adding/switching profiles ([SN-AUTH-007](auth.md#sn-auth-007)), the biometric mechanism itself ([SN-AUTH-014](auth.md#sn-auth-014)), the export archive builder (SN-SET-001 / BKP), and entitlement scope ([SN-AUTH-016](auth.md#sn-auth-016)).

#### Acceptance criteria
- [ ] Rename/change-note/change-colour update only the target profile and persist immediately (no explicit Save), matching the profile add flow's constraints (max 24 chars).
- [ ] Set/clear lock toggles the target profile's locked flag and triggers the [SN-AUTH-014](auth.md#sn-auth-014) gate on next open.
- [ ] Delete warns that it removes that profile's local notes, offers Export first, requires an explicit confirmation, and removes only that profile's partition — other profiles are untouched (PRD-PROF-007).
- [ ] The management UI lives under Settings → Account (design §12) and is unavailable for the implicit Guest profile beyond rename.
- [ ] After delete, the profile's notes, thumbnails, caches and search index are removed (composes with deletion, [SN-AUTH-018](auth.md#sn-auth-018)).

#### Technical notes
Operate on the ProfileRepository ([SN-AUTH-007](auth.md#sn-auth-007)); delete cascades within the profile partition only (SN-CORE-004 + [SN-AUTH-013](auth.md#sn-auth-013) scoping). The export-first prompt hands off to the Export everything flow (SN-SET-001 / PRD-BKP-001). Set/clear lock calls into [SN-AUTH-014](auth.md#sn-auth-014). Keep the UI in Settings → Account using sane_ui components. This is a small, self-contained task suitable for a first contribution.

#### Security & privacy
Threats: deleting a profile touching another's data (CWE-284, A01) — prevented by partition-scoped cascade; data loss without export (mitigated by the export-first prompt, LINDDUN-Disclosure vs Availability). Controls: MASVS-STORAGE-1, MASVS-PRIVACY-2, ASVS V6. Privacy-by-design: deletion is scoped and confirmed; no cross-profile side effects. No new network egress.

#### UX notes
Management rows live under Settings → Account → Profiles on this account (design §12), rendered across all 17 looks + dark mode. Destructive delete uses the design's destructive styling + a confirmation and the Export first affordance. Every control needs a Semantics label, 44pt/48dp target, contrast and keyboard reachability on web. Inline validation for the 24-char name cap.

#### Test plan
Unit: app/test/auth/profile_management_test.dart (rename/recolour/note update only target; delete cascades within partition; guest cannot be deleted). Widget: app/test/auth/profile_management_screen_test.dart (export-first warning + confirmation gate). Integration: delete removes the partition's index/thumbnails.

#### Dependencies
SN-AUTH-007, SN-AUTH-014; export handoff SN-SET-001; deletion mechanics [SN-AUTH-018](auth.md#sn-auth-018).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-016

<a id="sn-auth-016"></a>

**Scope Pro entitlement to the account across all profiles**

| Field | Value |
|---|---|
| GitHub | #115 |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, billing |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-007](auth.md#sn-auth-007), [SN-BILL-001](billing.md#sn-bill-001) |
| Security controls | `MASVS-AUTH-1`, `ASVS-V6`, `OWASP-A01`, `CWE-863` |
| Extra labels | needs-decision, sec: masvs |

#### Context
A Pro entitlement is account-scoped and shared across all local profiles on that signed-in account; a Guest profile with no account gets Free limits (PRD-PROF-006). This task wires the identity layer to the entitlement provider (SN-BILL-001, RevenueCat-style, PRD-BILL-011) so premium is gated behind a verified entitlement object keyed to the signed-in account, never a per-profile boolean on disk. The family/household edge — whether a household plan grants Pro to all local profiles on a shared device or only the owner's profiles — is an open maintainer decision (PRD-PROF-006 / §15.6, needs-decision); implement the decisive default of account-scoped-for-all-profiles and leave the household hook.

#### Scope
**In:** exposing the active account's entitlement to every profile on the device; making feature gates read the verified entitlement object (cached last-known-good for offline grace) rather than a stored flag; guest = Free; the household-grant hook (default: all profiles on the account get the account's entitlement).
**Out:** purchase/restore flows, StoreKit/Play Billing, and the entitlement provider integration itself (SN-BILL-001); student verification (SN-BILL-001); the per-profile-vs-per-account household decision (maintainer).

#### Acceptance criteria
- [ ] Every profile on a signed-in Pro account sees Pro features; switching profiles does not change entitlement (PRD-PROF-006).
- [ ] A Guest profile (no account) gets Free limits.
- [ ] Gates read a verified entitlement object (cached last-known-good offline), never a boolean on disk that could be forged (PRD-BILL-011, TM-S-05, CWE-863).
- [ ] Entitlement failure degrades to Free and never blocks local note-taking (fail-open, roadmap M8 exit criterion).
- [ ] The household-grant behaviour is implemented behind the documented default with a marker for the maintainer decision.

#### Technical notes
Read the entitlement from SN-BILL-001's provider (app_user_id keyed to the signed-in account, PRD-BILL-011). Feature gates query an EntitlementProvider (Riverpod) that returns the verified object; guest returns Free. Do not persist a plain isPro boolean. Leave a // needs-decision marker citing PRD-PROF-006/§15.6 for the household scope. This is identity↔billing glue only; the purchase/verify machinery is SN-BILL-001.

#### Security & privacy
Threats: forged Pro entitlement (TM-S-05, CWE-863 — countered by reading the server-verified object, not a disk flag), authorization confusion across profiles (A01). Controls: MASVS-AUTH-1, ASVS V6, OWASP-A01. Fail-open is deliberate and non-punitive (a failed check must never lock a user out of their own notes). No note keys are involved. needs-decision: household/family scope.

#### UX notes
None beyond baseline — this task exposes state; the Upgrade/Manage UI is SN-BILL-001 and the Account & plan tab (design §12). Baseline: entitlement state is never logged with PII; gated-feature affordances (Pro badges/upgrade prompts) are rendered by their owning features across all looks. Ensure a profile switch does not flash a wrong entitlement state.

#### Test plan
Unit: app/test/auth/entitlement_scope_test.dart (Pro account → all profiles Pro; guest → Free; forged disk flag ignored; failure → Free, note-taking unaffected). Integration: switch profiles without entitlement change; offline grace uses last-known-good.

#### Dependencies
SN-AUTH-007, SN-BILL-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-017

<a id="sn-auth-017"></a>

**Implement sign out and switch account without data loss**

| Field | Value |
|---|---|
| GitHub | #116 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-008](auth.md#sn-auth-008) |
| Security controls | `MASVS-AUTH-1`, `MASVS-STORAGE-2`, `ASVS-V6`, `OWASP-A01`, `CWE-613` |
| Extra labels | agent-ready, good first issue, sec: masvs |

#### Context
Use a different account (Profiles screen) and Sign out (Settings → Account, destructive) sign the whole device out back to Login (design §4/§12). Sign-out MUST clear identity tokens only and MUST NOT delete local note data by default (PRD-PROF-003) — data deletion is the separate account-deletion flow ([SN-AUTH-018](auth.md#sn-auth-018)). This is the clean, reversible complement to sign-in: after sign-out the notes remain on device (as a Guest partition or awaiting re-sign-in) and can be re-adopted on next sign-in.

#### Scope
**In:** the Sign out action (Settings → Account) and Use a different account (Profiles) both returning to Login; wiping all identity tokens from the secure store ([SN-AUTH-008](auth.md#sn-auth-008)); leaving local note data intact; ending the session cleanly (invalidate in-memory session, revoke provider session where the SDK supports it).
**Out:** deleting local/cloud data or the account ([SN-AUTH-018](auth.md#sn-auth-018)), disconnecting sync (SN-SYNC-001), and clearing per-profile locks ([SN-AUTH-014](auth.md#sn-auth-014)).

#### Acceptance criteria
- [ ] Sign out and Use a different account both return to the Login screen (design §4/§12).
- [ ] All identity tokens for the account are deleted from the secure store; a relaunch shows signed-out (no residual session, CWE-613).
- [ ] Local notebooks/pages/attachments are NOT deleted by default (PRD-PROF-003); they remain available and re-adoptable on next sign-in ([SN-AUTH-011](auth.md#sn-auth-011)).
- [ ] Sign out is styled destructive but is non-destructive to data; the copy makes clear notes stay on the device.
- [ ] Where the provider SDK supports it, the provider session is revoked/cleared so the next sign-in re-prompts.

#### Technical notes
Sign-out transitions AuthState to signedOut (or guest), calls SessionStore.deleteAll for the account ([SN-AUTH-008](auth.md#sn-auth-008)), and clears the in-memory session provider (ADR-0003). Do NOT delete drift/blob data. Revoke the provider session via the SDK where available (e.g. google_sign_in signOut, MSAL removeAccount). This is a small, well-scoped task — good first issue.

#### Security & privacy
Threats: residual session after sign-out (CWE-613 — countered by full token wipe + in-memory invalidation), accidental data loss (prevented by keeping local data). Controls: MASVS-AUTH-1, MASVS-STORAGE-2, ASVS V6, OWASP-A01. No token is logged during sign-out. No new egress; note the threat model is unchanged.

#### UX notes
Sign out uses the design's destructive styling (design §12) with clear copy that notes stay on the device. Render across all 17 looks + dark mode; Semantics label announces the destructive nature and the data-safe outcome; 44pt/48dp target; keyboard reachable on web. Returning to Login must not flash any previous account's data.

#### Test plan
Unit: app/test/auth/sign_out_test.dart (tokens wiped, state → signedOut, local data untouched). Widget: both entry points route to Login. Integration (patrol): relaunch after sign-out shows Login; provider re-prompts on next sign-in.

#### Dependencies
SN-AUTH-002, SN-AUTH-008.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-018

<a id="sn-auth-018"></a>

**Implement self-service account and data deletion**

| Field | Value |
|---|---|
| GitHub | #117 |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-013](auth.md#sn-auth-013), [SN-PRV-001](privacy.md#sn-prv-001) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-STORAGE-1`, `ASVS-V6`, `OWASP-A01`, `CWE-212`, `CWE-459` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
The app MUST provide self-service account deletion reachable from Settings/Privacy (Apple requires an in-app account-deletion path when accounts exist) and MUST distinguish three scopes the user chooses between: (a) sign out (keep local notes, drop tokens); (b) delete cloud data (wipe the encrypted store in the user's own cloud + disconnect provider); (c) delete account (revoke identity + entitlement association at the provider) — PRD-DEL-001..004, PRD-PRIV-003. Because notes are E2EE in the user's own cloud, Sane holds no note content to delete: deletion is the user removing their own cloud store + keys. Deletion MUST offer export-first, require explicit typed/confirmed consent, and complete or clearly report partial completion.

#### Scope
**In:** the deletion surface (Settings → Privacy & export / Account) offering the three scopes; export-first handoff; explicit typed/confirmed consent; local wipe of a profile's data + keys + thumbnails + caches + search index; disconnecting the cloud provider and deleting the encrypted cloud store; requesting identity/entitlement removal at the providers; a completion/partial-completion report.
**Out:** the export archive builder (SN-SET-001 / BKP), the cloud store mechanics (SN-SYNC-001), the entitlement provider API (SN-BILL-001), and telemetry-aggregate deletion (SN-TEL, best-effort).

#### Acceptance criteria
- [ ] The dashboard offers the three clearly-labelled scopes and lets the user choose (PRD-DEL-001).
- [ ] Deletion offers Export everything first and requires an explicit typed/confirmed consent before proceeding (PRD-DEL-002).
- [ ] Sign-out scope keeps local notes; delete-cloud wipes the encrypted cloud store + disconnects the provider; delete-account additionally revokes the identity/entitlement association (PRD-DEL-001/003).
- [ ] Local files, thumbnails, caches and the search index for the deleted scope are securely removed; keys are removed from Keychain/Keystore (PRD-DEL-004, CWE-459).
- [ ] The app confirms completion or reports partial completion with a retry, and leaves no orphaned entitlement that blocks re-signup on the same email (PRD-DEL-004).
- [ ] Deletion states plainly what is and is not recoverable (zero-knowledge: once cloud store + keys are gone, data is unrecoverable) (PRD-DEL-002).

#### Technical notes
Local wipe operates on the profile partition ([SN-AUTH-013](auth.md#sn-auth-013)) — cascade-delete drift rows, blobs, FTS index, thumbnails; remove keys via sane_secure_store. Cloud delete + provider disconnect calls into SN-SYNC-001's cloud adapter (ciphertext store) — for account-delete, also call the entitlement/identity provider removal (SN-BILL-001). Wrap each scope as a resumable step returning Result so partial completion is reportable (PRD-DEL-004, OWASP-A10 exceptional conditions). Surface this under the privacy dashboard (SN-PRV-001, PRD-PRIV-003).

#### Security & privacy
Threats: incomplete erasure leaving recoverable data (CWE-212/459, LINDDUN Non-compliance), orphaned entitlement blocking re-signup, accidental over-deletion of another profile (scoped via [SN-AUTH-013](auth.md#sn-auth-013)). Controls: MASVS-PRIVACY-3 (erasure), MASVS-STORAGE-1, ASVS V6, OWASP-A01. Satisfies GDPR/DPDP/CCPA erasure (PRD-PRIV-003/004). Privacy-by-design: self-service, scoped, honest about zero-knowledge irrecoverability. Update the threat model if the deletion flow changes a stored-asset lifecycle.

#### UX notes
Deletion lives in the privacy dashboard (design §12 Privacy & export; PRD-PRIV-003). The three scopes are distinct, clearly labelled cards; delete-account uses destructive styling + a typed confirmation; export-first is offered inline. Render across all 17 looks + dark mode with Semantics labels, 44pt/48dp targets, contrast, keyboard reachability on web. Copy states plainly what is unrecoverable. Show progress and a completion (or partial + retry) result.

#### Test plan
Unit: app/test/auth/account_deletion_test.dart (each scope removes exactly its data; partial completion reported; other profiles untouched). Security: app/test/security/deletion_residue_test.dart asserts no note/thumbnail/index/key residue after local wipe. Integration (patrol): export-first + typed confirmation gate; delete-account leaves no orphaned entitlement.

#### Dependencies
SN-AUTH-002, SN-AUTH-013, SN-PRV-001; cloud store SN-SYNC-001; entitlement provider SN-BILL-001; export SN-SET-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-019

<a id="sn-auth-019"></a>

**Add identity security and abuse test suite**

| Field | Value |
|---|---|
| GitHub | #118 |
| Type | test |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-009](auth.md#sn-auth-009), [SN-AUTH-006](auth.md#sn-auth-006), [SN-AUTH-008](auth.md#sn-auth-008) |
| Security controls | `MASVS-AUTH-1`, `MASVS-AUTH-2`, `MASVS-NETWORK-1`, `ASVS-V6`, `OWASP-A07`, `CWE-287`, `CWE-307`, `CWE-384` |
| Extra labels | agent-ready, sec: masvs, sec: threat-model |

#### Context
Identity is the product's Spoofing surface (threat-model §5.1). This issue delivers the abuse/negative test suite that proves the identity controls hold — the verification the threat model demands for TM-S-01 (token replay), TM-S-02 (OTP brute-force / SIM-swap / account-takeover-yields-no-plaintext) and TM-I-05 (no token/PII in logs). CLAUDE.md §10 requires abuse/negative tests as first-class; this suite is the identity slice, complementing the bypass CI gate ([SN-AUTH-021](auth.md#sn-auth-021)).

#### Scope
**In:** negative/abuse tests across the identity stack — OIDC state/nonce/PKCE replay rejection ([SN-AUTH-009](auth.md#sn-auth-009)); id_token forgery/expiry/audience rejection; OTP brute-force throttling + single-use + expiry ([SN-AUTH-006](auth.md#sn-auth-006)); tokens-only-in-secure-store + never-logged assertions ([SN-AUTH-008](auth.md#sn-auth-008)); the account-takeover-yields-no-note-plaintext invariant (TM-S-02); cross-profile access-control probes referencing [SN-AUTH-013](auth.md#sn-auth-013).
**Out:** the release-bypass reachability gate ([SN-AUTH-021](auth.md#sn-auth-021)), crypto fail-closed tests (SN-CRY), and the full MASVS/ASVS verification pass (M7, SN-SEC).

#### Acceptance criteria
- [ ] A replayed or mismatched state/nonce is rejected and creates no session; a forged/expired/wrong-audience id_token is refused (TM-S-01).
- [ ] OTP brute force is throttled (>=30s between resends, <=5/hour), codes are single-use and expire; verification is server-side only (TM-S-02, CWE-307).
- [ ] A simulated account takeover (stolen token / OTP) yields NO note plaintext — keys are not derivable from identity (TM-S-02 integration test).
- [ ] No access token, refresh token, id_token, email or phone number appears in any captured log or crash report (TM-I-05).
- [ ] A cross-profile access attempt is denied (references the isolation guarantee, [SN-AUTH-013](auth.md#sn-auth-013)).
- [ ] The suite runs in CI and fails the build on any regression.

#### Technical notes
Add tests under app/test/security/ and app/integration_test/ using mock providers/gateways plus the real validation code paths (do not mock away the thing under test). For the no-plaintext invariant, assert that with a valid session but no key source, note content stays encrypted/paused (PRD-KEY-009). Capture logs via the SaneLog test sink and assert the redaction allow-list holds. Wire the suite into the DevSecOps workflow (SN-CI-001) as a required gate.

#### Security & privacy
This IS the security verification for the identity area. Threats covered: TM-S-01, TM-S-02, TM-I-05. Controls verified: MASVS-AUTH-1/2, MASVS-NETWORK-1, ASVS V6, OWASP-A07, CWE-287/307/384. Every fixed identity vuln must gain a regression test here (CLAUDE.md §10). No production behaviour changes; this is test-only.

#### UX notes
None beyond baseline — test-only issue, no user surface. Baseline reaffirmed by the suite: no content/token/PII logging; tokens only in the secure store.

#### Test plan
Files: app/test/security/oidc_replay_test.dart, app/test/security/otp_bruteforce_test.dart, app/test/security/token_never_logged_test.dart, app/integration_test/account_takeover_no_plaintext_test.dart, app/test/security/profile_access_control_test.dart. All wired into CI as a required job; failure blocks merge.

#### Dependencies
SN-AUTH-009, SN-AUTH-006, SN-AUTH-008; references [SN-AUTH-013](auth.md#sn-auth-013); CI wiring SN-CI-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-020

<a id="sn-auth-020"></a>

**Track and document maintainer OAuth client IDs and secrets**

| Field | Value |
|---|---|
| GitHub | #119 |
| Type | infra |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, ci-cd |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AUTH-001](auth.md#sn-auth-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002) |
| Security controls | `MASVS-CODE-2`, `ASVS-V14`, `OWASP-A05`, `CWE-798`, `CWE-522` |
| Extra labels | needs-credentials, sec: supply-chain |

#### Context
Every social provider and the OTP gateway need maintainer-supplied secrets — OAuth client IDs/secrets for Google/Microsoft/Apple, the Apple Services ID/team/key, the SMS/OTP provider API key — plus store/dev accounts and signing keys (CLAUDE.md §13 credentials list). These MUST be injected via --dart-define / CI secrets / platform config and NEVER committed (Dart AOT is reversible, CLAUDE.md §7 rule 2). This issue creates the single source of truth documenting which secrets are required, where each is injected, and how a maintainer supplies them, and adds the config plumbing + CI-secret wiring so the provider issues can consume them without ever hardcoding.

#### Scope
**In:** a documented credentials manifest (docs/security/ or app config README) listing every required identity secret, its purpose, the platform(s) that need it, the injection mechanism (--dart-define name / CI secret name / platform config file), and a not-committed placeholder config; wiring the flavour/--dart-define matrix (SN-FND-005) so providers read client IDs from config; a gitleaks/trufflehog-clean tree.
**Out:** obtaining the actual secrets (maintainer, needs-credentials), the provider implementations ([SN-AUTH-003](auth.md#sn-auth-003)/[SN-AUTH-004](auth.md#sn-auth-004)/[SN-AUTH-005](auth.md#sn-auth-005)/[SN-AUTH-006](auth.md#sn-auth-006)), and store/signing keys for release (SN-REL).

#### Acceptance criteria
- [ ] A single manifest lists every identity secret (Google/Microsoft/Apple client IDs, Apple Services ID/team/key, OTP provider key) with purpose, platforms, and injection point.
- [ ] Providers read client IDs from config populated by --dart-define / CI secrets; no secret or client-secret string is committed (gitleaks + trufflehog clean).
- [ ] A placeholder/example config documents the shape without real values and is safe to commit.
- [ ] The manifest states which are launch-blocking (needs-credentials) so release readiness is trackable (CLAUDE.md §13, roadmap M8 exit criterion).
- [ ] CI secret names are documented and referenced by the DevSecOps workflow (SN-CI-001), not inlined.

#### Technical notes
Use the flavour/--dart-define matrix from SN-FND-005 (overview §7.1) for build-time client IDs; keep runtime provider secrets (e.g. OTP gateway key) server-side or in CI-injected config, never in the client where policy allows. Add .gitignore coverage + a committed example. Cross-reference the credentials bullet in CLAUDE.md §13. This is infra/documentation glue; it unblocks the provider issues' testing by defining exactly what the maintainer must supply.

#### Security & privacy
Threats: a committed secret/client-secret leaking (CWE-798/522, OWASP-A05), a hardcoded key extracted from an AOT binary (CLAUDE.md §7 rule 2, L5). Controls: MASVS-CODE-2, ASVS V14, supply-chain hygiene. needs-credentials: the real values are maintainer-supplied via CI secrets; this issue defines the contract but cannot complete provider testing until they exist. Enforced by gitleaks/trufflehog + push protection (SN-CI-001).

#### UX notes
None beyond baseline — developer/maintainer-facing documentation and config only. Baseline: no secret ever reaches the client tree, logs or the repo. The manifest itself contains no live secrets, only names and injection points.

#### Test plan
CI: gitleaks + trufflehog scan the tree clean; a test asserting the example config contains only placeholders. Manual: a maintainer can follow the manifest to inject a client ID via CI secret and a provider build picks it up. No runtime behaviour to unit-test beyond config resolution (app/test/config/auth_config_test.dart reads a --dart-define client id).

#### Dependencies
SN-AUTH-002; flavour matrix SN-FND-005; CI-secret wiring SN-CI-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUTH-021

<a id="sn-auth-021"></a>

**Prove auth bypass is unreachable in release builds (CI gate)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | auth, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-AUTH-002](auth.md#sn-auth-002) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-CI-001](ci-cd.md#sn-ci-001) |
| Security controls | `MASVS-AUTH-1`, `MASVS-RESILIENCE-2`, `MASVS-CODE-2`, `ASVS-V6`, `OWASP-A07`, `CWE-489` |
| Extra labels | agent-ready, sec: masvs, sec: threat-model |

#### Context
The dev auth-bypass (--dart-define=SANE_AUTH_BYPASS=true) is a p0 risk: if it ships enabled in a release build it skips sign-in entirely (TM-E-01, Impact Critical). CLAUDE.md §7 rule 5 mandates three independent layers — compile-time dead-code elimination, the runtime assertAuthBypassSafe() throw, and this CI reachability test — and forbids weakening any of them. The guard logic lands in [SN-AUTH-002](auth.md#sn-auth-002); this issue delivers the verification: the app/test/security/auth_bypass_test.dart reachability test AND a CI job that fails the release build if SANE_AUTH_BYPASS (or any equivalent bypass string) is present/reachable in a release artifact's compiled defines or string table (PRD-AUTH-012).

#### Scope
**In:** app/test/security/auth_bypass_test.dart proving the bypass branch is unreachable when kReleaseMode is true; a CI job in the DevSecOps workflow (SN-CI-001) that builds a release artifact with the flag set true and asserts it still requires sign-in AND scans the compiled defines/string table for the bypass string, failing the release job on any hit; wiring both as required gates.
**Out:** the guard implementation itself ([SN-AUTH-002](auth.md#sn-auth-002)), the broader identity abuse suite ([SN-AUTH-019](auth.md#sn-auth-019)), and general SAST/secret scanning (SN-CI-002 / SN-CI-001).

#### Acceptance criteria
- [ ] app/test/security/auth_bypass_test.dart passes: with kReleaseMode true the bypass branch is unreachable and sign-in is still required, even with SANE_AUTH_BYPASS=true.
- [ ] A CI job builds a release artifact with --dart-define=SANE_AUTH_BYPASS=true and asserts the app still requires real sign-in (behavioural check).
- [ ] The CI job scans the release artifact's compiled defines and string table for SANE_AUTH_BYPASS (and equivalent bypass strings) and FAILS the release job on any reachable hit (PRD-AUTH-012).
- [ ] Both checks are required gates; a bypassed release cannot be produced or merged (TM-E-01).
- [ ] The gate is documented in the threat model verification column for TM-E-01.

#### Technical notes
Extend the M0 scaffolding (assertAuthBypassSafe from SN-FND, wired in [SN-AUTH-002](auth.md#sn-auth-002)). The reachability test uses a release-mode harness / const-folding assertion. The CI job runs in the DevSecOps pipeline (SN-CI-001, .github/workflows) and uses a string scan (e.g. strings/grep over the compiled artifact) plus a smoke build; pin actions by SHA. Because a benign string match could occur, scope the scan to the flag token and assert non-reachability, not mere absence-of-substring, to avoid false negatives while catching real inclusion. Update docs/security/threat-model.md TM-E-01 verification.

#### Security & privacy
This is the third mandated layer of the p0 bypass guard (CLAUDE.md §7 rule 5; TM-E-01). Threats: bypass-in-release (CWE-489, MASVS-RESILIENCE-2). Controls: MASVS-AUTH-1, MASVS-CODE-2, ASVS V6, OWASP-A07. Never weaken this gate; a change to the guard requires re-proving all three layers. Test/CI-only — no production behaviour change beyond enforcement.

#### UX notes
None beyond baseline — CI/test-only. Baseline: a bypassed dev build always shows the AUTH BYPASS watermark ([SN-AUTH-002](auth.md#sn-auth-002)); this gate ensures such a build can never be a release.

#### Test plan
Files: app/test/security/auth_bypass_test.dart (release-mode reachability). CI: a devsecops job that release-builds with the flag set, runs a boot smoke check that sign-in is still required, and scans the artifact string table — failing on a reachable bypass. Regression: a deliberately-weakened guard must make this job fail (meta-test).

#### Dependencies
SN-AUTH-002 (guard implementation); SN-CI-001 (DevSecOps workflow).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-018

<a id="sn-web-018"></a>

**Implement web sign-in with Google, Microsoft, Apple and passkeys**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | web |
| Areas | auth, security |
| Size | L |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-WEB-015](security.md#sn-web-015) |
| Security controls | `MASVS-AUTH-1`, `MASVS-AUTH-2`, `ASVS-V6`, `ASVS-V10`, `CWE-287`, `CWE-522`, `OWASP-A07` |
| Extra labels | needs-credentials |

#### Context
Identity on the web must deliver the same four methods as native — Google, Apple, Microsoft and phone OTP — while never becoming a precondition for taking notes (`PRD-AUTH-001`, `PRD-AUTH-007`, locked decision 5). The browser implementations differ from the native SDKs: Google Identity Services (ID token for authentication, separate OAuth flow for Drive authorization), MSAL.js (`@azure/msal-browser`, PKCE; ADAL is EOL), Sign in with Apple JS which needs a Services ID, a verified domain and HTTPS, and **WebAuthn passkeys with conditional mediation** which `docs/platform/web.md` §7 recommends as the primary passwordless path. COOP/COEP ([SN-WEB-015](security.md#sn-web-015)) also constrains popup-based flows, pushing us toward redirects. Passkeys matter twice over: they are also the preferred master-key source through WebAuthn PRF (`PRD-KEY-002`).

#### Scope
**In:** the web implementations behind the `sane_auth` abstraction from [SN-AUTH-002](auth.md#sn-auth-002): GIS, MSAL.js, Sign in with Apple JS, WebAuthn passkey registration/assertion with conditional UI, redirect-flow handling with `state`/`nonce`/PKCE validation, token lifetime and refresh handling, sign-out that clears origin state, and guest-first behaviour.
**Out:** the shared auth abstraction and dev-bypass guard ([SN-AUTH-002](auth.md#sn-auth-002)), phone OTP delivery ([SN-AUTH-006](auth.md#sn-auth-006)), Drive authorization scopes ([SN-WEB-019](sync.md#sn-web-019)), the key hierarchy itself ([SN-CRY-002](security.md#sn-cry-002)) and the web key posture ([SN-WEB-031](security.md#sn-web-031)).

#### Acceptance criteria
- [ ] All four methods appear exactly as `PRD-AUTH-001` specifies, in the specified order, with the guest "Skip for now" action present (`PRD-AUTH-007`).
- [ ] Every OIDC flow uses **PKCE + `state` + `nonce`**, all three validated; a tampered `state` or a replayed `nonce` fails closed with a user-safe error.
- [ ] The redirect flow works under enforced COOP/COEP; if a popup variant is retained anywhere it degrades to redirect automatically when blocked.
- [ ] Passkey registration and sign-in work with conditional mediation (autofill-style) on Chrome, Safari and Firefox; a user with no passkey never sees a dead affordance.
- [ ] Tokens are short-lived, refreshed by rotation, and held **only** in memory or the platform-appropriate store — never in `localStorage`, never in the notes database, never in a log (`PRD-AUTH-006`).
- [ ] Signing in **adopts** existing guest data in place rather than discarding it, with the one-line confirmation from `PRD-AUTH-010`.
- [ ] Sign-out clears tokens and session state, revokes where the provider supports it, and issues `Clear-Site-Data` where available — without deleting local notes (`PRD-PROF-003`).
- [ ] Guest mode remains fully functional offline with no auth network call at launch (`PRD-AUTH-008`).

#### Technical notes
Implement under `app/lib/auth/web/` plus the web side of `plugins/sane_secure_store`; the `sane_auth` interface from [SN-AUTH-002](auth.md#sn-auth-002) is the only thing `app/` code sees. **Do not** rely on `flutter_secure_storage`'s web implementation for anything sensitive — it is experimental WebCrypto bound to `localStorage`, non-portable and HTTPS-only (`docs/platform/web.md` §7 R4, ADR-0010 Security impact); keep tokens in memory with a short lifetime and re-authenticate rather than persisting them. Client IDs are **not secrets** but are still injected by `--dart-define` per flavour; there is **no client secret in a browser app** — anyone adding one is wrong (checklist §0.1). The dev auth bypass must remain impossible in release on web exactly as on native (`PRD-AUTH-011`–`PRD-AUTH-013`, three layers, never weakened).

#### Security & privacy
**needs-credentials:** Google OAuth client ID, Microsoft app registration, and an Apple Services ID with a verified domain — maintainer-supplied through CI secrets. Threats: authorization-code interception and CSRF on the redirect (CWE-352, ASVS-V10); token theft via XSS from `localStorage` (CWE-522, CWE-79 — mitigated by [SN-WEB-014](security.md#sn-web-014) *and* by not persisting tokens); account takeover yielding note plaintext, which zero-knowledge forbids (TM-S-02, `PRD-AUTH-008`); open redirect on the return URL (CWE-601); session fixation (CWE-384). Controls: PKCE + `state` + `nonce`; strict allow-list of redirect URIs on our origin only; ID-token signature, issuer, audience and expiry validation; short-lived tokens with rotation; no tokens in storage, logs or the synced database (MASVS-AUTH-1, MASVS-AUTH-2, CWE-532); OTP rate-limiting handled provider-side (`PRD-AUTH-004`); note access never derivable from identity.

#### UX notes
The Login screen is fully specified in `design/Sane Notes.dc.html` and `docs/design/screens-and-flows.md` §3 (`loginStep ∈ {methods, phone, otp}`), including verbatim copy and the fine print of `PRD-AUTH-005`; the web build must match it and render correctly in all **17 looks, light and dark** (golden-test the methods, phone and OTP steps in two looks per mode). States: idle, in-flight (provider redirect), cancelled, provider-error, offline (sign-in unavailable, guest still offered), and already-signed-in. Accessibility: every button ≥ 44 px with a `Semantics` label naming the provider, ≥ 4.5:1 contrast, complete keyboard order with a visible focus ring, passkey autofill compatible with screen readers, and errors announced politely (`PRD-CO-315`, `PRD-CO-321`).

#### Test plan
- `app/test/auth/web/oidc_params_test.dart` — PKCE/state/nonce generation and validation, including tampered and replayed cases.
- `app/test/auth/web/token_storage_test.dart` — asserts no token reaches `localStorage`, IndexedDB, the notes DB or any log.
- `app/test/security/auth_bypass_test.dart` — extended to cover the web entry point (bypass unreachable in release).
- `app/integration_test/web/sign_in_redirect_test.dart` — mocked provider redirect round-trip under enforced COOP/COEP.
- `app/integration_test/web/passkey_test.dart` — WebAuthn virtual authenticator registration and assertion.
- Manual: real provider sign-in on Chrome, Safari and Firefox once credentials exist.

#### Dependencies
[SN-AUTH-002](auth.md#sn-auth-002), [SN-WEB-015](security.md#sn-web-015); key handling in [SN-WEB-031](security.md#sn-web-031).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Threat model updated for the web auth trust boundary
- [ ] Reviewed against docs/security/secure-coding-checklist.md §4 with CODEOWNERS security review

---

