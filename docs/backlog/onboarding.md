# Backlog — area: onboarding

16 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-ONB-001](onboarding.md#sn-onb-001) **Epic: Onboarding & login UI — login, tour, profiles, empty states, guest-first** (epic · M4 Identity, Sync & Privacy)
  - [SN-ONB-002](onboarding.md#sn-onb-002) **Build the Login screen scaffold, method buttons and marketing panel** · p1 · feature · M · M4 Identity, Sync & Privacy
    - [SN-ONB-003](onboarding.md#sn-onb-003) **Build the phone number and OTP entry UI (phone and otp steps)** · p1 · feature · M · M4 Identity, Sync & Privacy
    - [SN-ONB-014](onboarding.md#sn-onb-014) **Add the dev auth-bypass on-screen watermark** · p1 · security · S · M4 Identity, Sync & Privacy
  - [SN-ONB-004](onboarding.md#sn-onb-004) **Add guest 'Skip for now' entry and guest-to-account adoption confirmation** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-ONB-005](onboarding.md#sn-onb-005) **Build the 3-step onboarding tour overlay scaffold with progress and replay** · p2 · feature · M · M4 Identity, Sync & Privacy
    - [SN-ONB-006](onboarding.md#sn-onb-006) **Implement onboarding step 0 value-prop feature rows** · p3 · feature · S · M4 Identity, Sync & Privacy
    - [SN-ONB-007](onboarding.md#sn-onb-007) **Implement onboarding step 1 subject multi-select and subject seeding** · p2 · feature · M · M4 Identity, Sync & Privacy
    - [SN-ONB-008](onboarding.md#sn-onb-008) **Implement onboarding step 2 look selection and dark-mode toggle** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-ONB-009](onboarding.md#sn-onb-009) **Build the Profiles 'Who's writing?' screen** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-ONB-010](onboarding.md#sn-onb-010) **Implement first-run tips and empty states across Library, Search and Trash** · p2 · feature · M · M2 Library & Documents
  - [SN-ONB-011](onboarding.md#sn-onb-011) **Implement point-of-use permission-rationale sheets** · p1 · feature · M · M2 Library & Documents
  - [SN-ONB-012](onboarding.md#sn-onb-012) **Build the web/PWA first-run and install entry ('try on web')** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-ONB-013](onboarding.md#sn-onb-013) **Add analytics-free on-device onboarding funnel measurement** · p3 · feature · M · M4 Identity, Sync & Privacy
  - [SN-GPHN-010](onboarding.md#sn-gphn-010) **Add a quick profile-switch sheet and compact Profiles layout for phones** · p3 · feature · M · M5 Phones & Platform Parity

---

## Issues

### SN-GPHN-010

<a id="sn-gphn-010"></a>

**Add a quick profile-switch sheet and compact Profiles layout for phones**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | onboarding, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-ONB-009](onboarding.md#sn-onb-009), [SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-015](security.md#sn-phn-015) |
| Security controls | `MASVS-AUTH-2`, `MASVS-PRIVACY-2`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
The account carries several profiles — Riya (Owner), Aarav (Sibling · JEE prep) and Work (Workspace) — each "a private space" (docs/design/screens-and-flows.md §4). On a tablet the Profiles "Who's writing?" screen is a full-bleed grid reached from the sidebar avatar. On a phone the profile switcher is reached from the Settings/Profile bottom-navigation slot ([SN-PHN-003](design-system.md#sn-phn-003)), and forcing a full-screen context switch just to change profile is heavy for a one-handed device. [SN-ONB-009](onboarding.md#sn-onb-009) builds the full-bleed Profiles screen for all platforms; this issue adds the phone parity: a quick profile-switch bottom sheet reachable from the bottom-nav profile tab, plus a compact layout for the full Profiles screen so its tiles reflow to phone columns and stay thumb-reachable.

#### Scope
**In:** a quick-switch bottom sheet listing profiles (avatar, name, note, Current/Switch) invoked from the Settings/Profile bottom-nav slot; wiring switch to the existing `pickProfile(id)` path; the compact reflow of the full "Who's writing?" screen (tile columns, add-profile inline create) for phone widths; the biometric-unlock prompt when switching into a lock-gated profile.
**Out:** per-profile data partitioning and entitlement scope ([SN-AUTH-007](auth.md#sn-auth-007), [SN-CORE-002](storage.md#sn-core-002)); the biometric-gate implementation and key hierarchy ([SN-AUTH-007](auth.md#sn-auth-007), [SN-CRY-002](security.md#sn-cry-002)); sign-out token clearing ([SN-AUTH-002](auth.md#sn-auth-002)); the Settings Account tab profile list ([SN-SET-005](settings.md#sn-set-005)); and the general entry-point guard ([SN-PHN-015](security.md#sn-phn-015), consumed here).

#### Acceptance criteria
- [ ] Tapping the Profile bottom-nav slot opens a quick-switch sheet showing all profiles with Current marked, reachable one-handed; selecting one switches profile without a full-screen transition.
- [ ] "Manage / add profile" in the sheet opens the full compact "Who's writing?" screen; on phone the profile tiles reflow to a 1-2 column grid and the add-profile inline create/cancel flow works.
- [ ] Switching into a lock-gated profile routes through the entry-point guard ([SN-PHN-015](security.md#sn-phn-015)) and prompts for biometric/passcode unlock before any of that profile's content is shown; cancel returns to the previous profile with no content revealed.
- [ ] The quick-switch sheet reveals only profile display data (avatar, name, note) and never any notebook content or titles.
- [ ] In guest mode the sheet offers the guest space and never forces sign-in.
- [ ] Switching profile updates the greeting, avatar and the profile's look/wallpaper where those are per-profile, without a full app restart.
- [ ] Every control is >= 44x44 pt / 48x48 dp with `Semantics`; the sheet announces the current profile.
- [ ] Renders correctly in all 17 looks and dark mode; works at 320 dp and 200% Dynamic Type.

#### Technical notes
Add the quick-switch sheet in `app/lib/profiles/` using `showSaneSheet` ([SN-GPHN-006](design-system.md#sn-gphn-006)); reuse the profile tile widget and `pickProfile` from [SN-ONB-009](onboarding.md#sn-onb-009) so switch semantics are shared. The compact reflow is a layout branch of the existing Profiles screen driven by the size class ([SN-PHN-002](compat.md#sn-phn-002)), not a new screen. Lock-gated switching consumes [SN-PHN-015](security.md#sn-phn-015)'s `EntryPointGuard`; this issue must not re-implement lock detection. Profile-scoped look/wallpaper reload goes through the existing per-profile preferences repository ([SN-SET-003](settings.md#sn-set-003)). Never branch on platform identity (CLAUDE.md §8).

#### Security & privacy
Profiles are a privacy boundary. **T-PROFILE-LEAK** — the switcher could reveal a locked profile's content or titles. Control: show only display data; content appears only after the guard's unlock (MASVS-PRIVACY-2, CWE-200). **T-AUTH-BYPASS-BY-SWITCH** — switching must not land past a profile lock. Control: route through [SN-PHN-015](security.md#sn-phn-015)'s guard so the unlock prompt is enforced; the three-layer dev-auth-bypass protection is untouched (CLAUDE.md §7.5; MASVS-AUTH-2, ASVS V3). **T-RESIDUE-ON-SWITCH** — the previous profile's in-memory content must not bleed into the new profile's view. Control: profile-scoped providers are torn down and rebuilt on switch (MASVS-PRIVACY-4). Baseline: no profile names or ids logged (MASVS-PRIVACY-1, CWE-532); no new egress.

#### UX notes
Source: docs/design/screens-and-flows.md §4, phones.md §7. Quick-switch from the thumb zone matches the phone's one-handed ethos; the full screen is only for managing/adding. Copy per ux-principles.md §5: "Who's writing?" is preserved verbatim on the full screen; the sheet header reads "Switch profile". No exclamation marks. Motion: sheet entrance 200-300 ms, cross-fade under Reduce Motion (§6). a11y: the current profile is announced, each profile is a labelled option with its state, and the unlock prompt is screen-reader and Switch/Voice-Control reachable (PRD-CO-332).

#### Test plan
- `app/test/profiles/quick_switch_sheet_test.dart` — lists profiles, marks current, switch calls `pickProfile`, guest offered.
- `app/test/profiles/locked_profile_switch_test.dart` — switching into a lock-gated profile prompts unlock; cancel reveals nothing (negative test).
- `app/test/profiles/profiles_compact_test.dart` — full screen reflows tiles to phone columns; add-profile create/cancel.
- `app/test/golden/phone/profiles_compact_golden_test.dart` — goldens per look family, light and dark.
- `app/integration_test/phone_profile_switch_test.dart` — patrol run: quick switch, then manage/add on a phone profile.

#### Dependencies
[SN-ONB-009](onboarding.md#sn-onb-009), [SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-015](security.md#sn-phn-015)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-001

<a id="sn-onb-001"></a>

**Epic: Onboarding & login UI — login, tour, profiles, empty states, guest-first**

| Field | Value |
|---|---|
| GitHub | #20 |
| Type | epic |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, auth |
| Size | XL |
| SDLC | design |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-STORAGE-2`, `MASVS-PRIVACY-1`, `ASVS-V6`, `OWASP-A07` |
| Extra labels | agent-ready |

#### Context
The onboarding & login UI is the first thing every user sees, and it must honour two locked decisions at once: the app is *calm and never lags* (LOCKED DECISION 7, `docs/design/ux-principles.md` §0–§1) and *identity is never required to take notes* — guest mode is first-class (LOCKED DECISION 5, `docs/product/prd-03-identity-sync-privacy-settings-billing.md` §1.2). This epic owns the **presentation** layer: the Login screen (`loginStep` methods / phone / otp), the guest 'Skip for now' path and guest→account adoption confirmation, the 3-step onboarding tour (value props → subjects → look), the Profiles 'Who's writing?' screen, first-run tips and every empty state, point-of-use permission-rationale sheets, the web/PWA first-run entry, the dev auth-bypass watermark, and an analytics-free on-device onboarding funnel. It presents the identity logic owned by the Identity epic ([SN-AUTH-001](auth.md#sn-auth-001)) rather than implementing OAuth SDKs, OTP delivery, or profile partitioning. It implements PRD-03 §1 (`PRD-AUTH-001..018`), §2 (`PRD-PROF-001..007`), and the decisive empty/loading/error/offline defaults in `docs/design/ux-principles.md` §4, against the screens in `docs/design/screens-and-flows.md` §3–§6 and `design/Sane Notes.dc.html` (Login, Profiles, Onboarding, Library). Most children land in M4 where login/profiles/tour formally ship; empty states and the permission-rationale framework land in M2 because the guest app and the first camera/mic permission arrive then.

#### Scope
**In:** login chrome + method buttons + phone/OTP UI; guest entry + adoption confirmation; the onboarding tour overlay and its three steps; the Profiles screen; first-run tips + all empty states; permission-rationale sheets; web/PWA first-run + install; the dev-bypass watermark; the local funnel counters.
**Out:** the auth-provider SDK integrations ([SN-AUTH-003](auth.md#sn-auth-003), [SN-AUTH-004](auth.md#sn-auth-004), [SN-AUTH-005](auth.md#sn-auth-005)), phone-OTP delivery/verification backend ([SN-AUTH-006](auth.md#sn-auth-006)), the auth abstraction + bypass flavour guard ([SN-AUTH-002](auth.md#sn-auth-002)), profile data partitioning ([SN-AUTH-007](auth.md#sn-auth-007), [SN-CORE-002](storage.md#sn-core-002)), the age gate + consent framework ([SN-PRV-001](privacy.md#sn-prv-001)), the Settings screens ([SN-SET-001](settings.md#sn-set-001)), the Upgrade/billing overlay ([SN-BILL-001](billing.md#sn-bill-001)), and the marketing website 'try on web' button ([SN-SITE-001](website.md#sn-site-001)).

#### Acceptance criteria
- [ ] [SN-ONB-002](onboarding.md#sn-onb-002) Login screen scaffold, method buttons, marketing panel + legal fine print
- [ ] [SN-ONB-003](onboarding.md#sn-onb-003) Phone number + OTP entry UI (phone/otp steps)
- [ ] [SN-ONB-004](onboarding.md#sn-onb-004) Guest 'Skip for now' entry + guest→account adoption confirmation
- [ ] [SN-ONB-005](onboarding.md#sn-onb-005) Onboarding tour overlay scaffold (progress dots, skip/continue, replay)
- [ ] [SN-ONB-006](onboarding.md#sn-onb-006) Tour step 0 — value-prop feature rows
- [ ] [SN-ONB-007](onboarding.md#sn-onb-007) Tour step 1 — subject multi-select + seed subjects/paper
- [ ] [SN-ONB-008](onboarding.md#sn-onb-008) Tour step 2 — look selection + dark-mode toggle
- [ ] [SN-ONB-009](onboarding.md#sn-onb-009) Profiles 'Who's writing?' screen
- [ ] [SN-ONB-010](onboarding.md#sn-onb-010) First-run tips + empty states across Library/Search/Trash
- [ ] [SN-ONB-011](onboarding.md#sn-onb-011) Point-of-use permission-rationale sheets
- [ ] [SN-ONB-012](onboarding.md#sn-onb-012) Web/PWA first-run + install entry ('try on web')
- [ ] [SN-ONB-013](onboarding.md#sn-onb-013) Analytics-free on-device onboarding funnel measurement
- [ ] [SN-ONB-014](onboarding.md#sn-onb-014) Dev auth-bypass on-screen watermark

#### Technical notes
Screens live in `app/lib/onboarding/`, `app/lib/login/`, `app/lib/profiles/` as `go_router` routes (ADR-0003) reading Riverpod providers exposed by the auth abstraction ([SN-AUTH-002](auth.md#sn-auth-002)); all visuals derive from `sane_ui` tokens ([SN-DS-002](design-system.md#sn-ds-002)) and components ([SN-DS-003](design-system.md#sn-ds-003)). No business logic in `build`; state is immutable. Cite `PRD-AUTH-001..018`, `PRD-PROF-001..007`, [ADR-0004](../adr/0004-local-first-zero-server.md), [ADR-0003](../adr/0003-state-management-and-app-structure.md), `docs/design/screens-and-flows.md`, `docs/design/ux-principles.md`.

#### Security & privacy
Threats: identity spoofing (STRIDE-S) on the login surface, phishing via in-app web forms, token leakage, and privacy 'unawareness'. Controls: native OS account pickers only (no in-app provider password form), tokens in secure store only ([SN-AUTH-002](auth.md#sn-auth-002)), guest path makes zero network calls. Framework IDs: MASVS-AUTH-1, MASVS-STORAGE-2, MASVS-PRIVACY-1, ASVS V6 (authentication), OWASP-A07 (identification & auth failures). Baseline everywhere: no note content, tokens, phone numbers, or OTP codes in logs.

#### UX notes
Login, Profiles and Onboarding are full-bleed overlays but still restyle across all **17 looks + light/dark** (every look re-skins the whole app); the page/canvas is not present here so only surfaces/chips/buttons re-skin. Microcopy is plain, warm, and verbatim from `docs/design/screens-and-flows.md` §16 ('Welcome back', 'Who's writing?', 'Study smarter.'). a11y per `docs/design/accessibility.md`: `Semantics` on every control, 44pt/48dp targets, contrast ≥ 4.5:1, keyboard-reachable on web, Reduce-Motion respected.

#### Test plan
Each child names its own tests; the epic tracks `app/integration_test/onboarding_flow_test.dart` (login → profiles → tour → Library), golden suites across a look-per-family subset + dark, and a guest-path no-network assertion.

#### Dependencies
[SN-AUTH-001](auth.md#sn-auth-001) (identity logic), [SN-DS-001](design-system.md#sn-ds-001) (design system), [SN-CORE-001](storage.md#sn-core-001) (workspace/profile model), [SN-LIB-002](library.md#sn-lib-002) (Library landing), [SN-PRV-001](privacy.md#sn-prv-001) (age gate + consent), [SN-SET-001](settings.md#sn-set-001) (Settings host for replay/look).

#### Definition of done
- [ ] All 13 child issues closed; login → profiles → tour → Library and the guest path demoable end-to-end
- [ ] `docs/design/screens-and-flows.md` / `ux-principles.md` updated where a resolved gap changed behaviour
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no content/tokens in logs verified

---

### SN-ONB-002

<a id="sn-onb-002"></a>

**Build the Login screen scaffold, method buttons and marketing panel**

| Field | Value |
|---|---|
| GitHub | #365 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-AUTH-1`, `MASVS-STORAGE-2`, `ASVS-V6`, `OWASP-A07`, `CWE-522` |
| Extra labels | agent-ready |

#### Context
The Login screen (`docs/design/screens-and-flows.md` §3, `design/Sane Notes.dc.html` 'Login') is the first-run authentication surface. It is two-column when wide (`showObArt`): a dark marketing panel on the left (sage logo, a tilted 'Lecture 12' page card, a 'Recording 04:12' pill, a stacked-avatars pill, headline 'Study smarter.' and the subcopy about handwriting/PDFs/audio) and, on the right, the auth form (max 520px, centred) headed 'Welcome back' / 'Sign in to open your notebooks on this device.' This issue builds the screen chrome and the `loginStep='methods'` state: **Continue with Google**, **Continue with Apple**, **Continue with Microsoft**, a divider 'or', then the accent **Continue with mobile number**, plus the legal fine print. It implements `PRD-AUTH-001`, `PRD-AUTH-002`, and `PRD-AUTH-005`. The provider button *actions* call the auth abstraction ([SN-AUTH-002](auth.md#sn-auth-002)); the provider SDKs themselves are [SN-AUTH-003](auth.md#sn-auth-003)/[SN-AUTH-004](auth.md#sn-auth-004)/[SN-AUTH-005](auth.md#sn-auth-005). Phone OTP UI is [SN-ONB-003](onboarding.md#sn-onb-003); the guest skip control is [SN-ONB-004](onboarding.md#sn-onb-004).

#### Scope
**In:** the two-column responsive Login layout with the marketing panel, the `methods` step with four method buttons wired to the auth abstraction's `signInWith(provider)` and `beginPhone()` intents, the divider, the fine print with live Terms/Privacy links, success navigation to Profiles with toast 'Signed in with <Provider>'.
**Out:** phone/OTP steps ([SN-ONB-003](onboarding.md#sn-onb-003)), guest 'Skip for now' ([SN-ONB-004](onboarding.md#sn-onb-004)), the provider SDK plumbing ([SN-AUTH-003](auth.md#sn-auth-003)/[SN-AUTH-004](auth.md#sn-auth-004)/[SN-AUTH-005](auth.md#sn-auth-005)), age gate ([SN-PRV-001](privacy.md#sn-prv-001)).

#### Acceptance criteria
- [ ] `loginStep='methods'` renders exactly: Continue with Google, Continue with Apple, Continue with Microsoft, an 'or' divider, then the accent Continue with mobile number — in that order; Apple is present on all Apple platforms.
- [ ] Each social button invokes the auth abstraction (`PRD-AUTH-002`) and, on success, navigates to Profiles and shows toast 'Signed in with <Provider>'; a failure shows a toast ('Couldn't sign in — try again') and stays on the screen (no dead end, `ux-principles.md` §4.3).
- [ ] The screen NEVER renders an in-app username/password web form for a provider; it hands off to the OS account picker via the abstraction.
- [ ] The marketing panel collapses below the form (single column) at `narrow` (< 900px) and reflows with no 2-D scroll at 320 CSS px.
- [ ] Fine print reads verbatim 'By continuing you agree to the Terms and Privacy Policy. Handwriting recognition runs on your device.' with Terms and Privacy Policy as tappable links to live URLs (`PRD-AUTH-005`).
- [ ] No token, email, or phone number is written to logs; validation/errors surface as toasts, never inline red text.

#### Technical notes
Build `LoginScreen` + `LoginMethodsView` in `app/lib/login/`; a `LoginController` (Riverpod) holds `loginStep` and delegates to `AuthController` ([SN-AUTH-002](auth.md#sn-auth-002)). Buttons/cards from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003)); marketing art via the single `SaneSageMark` asset ([SN-BRD-001](brand.md#sn-brd-001)). Route registered in the app `go_router` table (ADR-0003). Cite `PRD-AUTH-001/002/005`, [ADR-0004](../adr/0004-local-first-zero-server.md), `docs/design/screens-and-flows.md` §3.

#### Security & privacy
Threats: credential phishing via an in-app provider form (CWE-522), identity spoofing (STRIDE-S), token exposure. Controls: native OS account picker only (MASVS-AUTH-1, ASVS V6); tokens flow to `sane_secure_store` via the abstraction, never here (MASVS-STORAGE-2); OWASP-A07. Baseline: no PII/tokens in logs.

#### UX notes
Design: `docs/design/screens-and-flows.md` §3 + `design/Sane Notes.dc.html` 'Login'. Render across all **17 looks + light/dark**; the marketing panel uses the look's dark surfaces. a11y: each button has a `Semantics` label ('Continue with Google'), 44pt/48dp targets, contrast ≥ 4.5:1 including button text (use the accessibility-adjusted accent where a look fails, `docs/design/accessibility.md`), keyboard/focus order on web, and links are focusable. Empty/error state: provider failure → toast with retry.

#### Test plan
- Widget: `app/test/login/login_methods_test.dart` — button order/labels; social tap calls the abstraction and navigates on success; failure keeps the screen and toasts.
- Golden: `app/test/login/goldens/login_methods_*` across a look-per-family subset + dark, wide and narrow.
- Negative: `app/test/login/login_no_webform_test.dart` asserts no provider password field exists; a log-capture asserts no token/email string is logged.

#### Dependencies
[SN-AUTH-002](auth.md#sn-auth-002) (auth abstraction + intents), [SN-DS-003](design-system.md#sn-ds-003) (components). Soft: [SN-AUTH-003](auth.md#sn-auth-003)/[SN-AUTH-004](auth.md#sn-auth-004)/[SN-AUTH-005](auth.md#sn-auth-005) (provider SDKs land the real hand-off).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Docs updated if the resolved marketing-panel/naming behaviour changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-003

<a id="sn-onb-003"></a>

**Build the phone number and OTP entry UI (phone and otp steps)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-002](onboarding.md#sn-onb-002) |
| Depends on | [SN-AUTH-006](auth.md#sn-auth-006) |
| Security controls | `MASVS-AUTH-1`, `ASVS-V6`, `OWASP-A07`, `CWE-307` |
| Extra labels | agent-ready |

#### Context
Phone-number sign-in is the accent method on the Login screen and the primary path for India-locale students who have no card or social account (`docs/design/screens-and-flows.md` §3, persona Riya). This issue builds the two sub-steps: `loginStep='phone'` (a fixed **+91** prefix, numeric input that strips non-digits, a **Send code** button, and an 'Other ways to sign in' back link) and `loginStep='otp'` (copy 'We sent a 6-digit code to +91 <phone>', a large letter-spaced 6-digit OTP input, **Verify and continue**, **Change number**, **Resend code**). It implements the UI half of `PRD-AUTH-003` and surfaces the rate-limit/expiry behaviour of `PRD-AUTH-004`. The actual code delivery and single-use server verification are owned by [SN-AUTH-006](auth.md#sn-auth-006) — this screen never validates a code client-side.

#### Scope
**In:** the phone and otp step views, digit-stripping input formatters, the fixed country-code prefix (locale-derived, defaulting to +91), client-side length guards that emit the exact toasts, `Send code` / `Verify and continue` / `Change number` / `Resend code` actions wired to [SN-AUTH-006](auth.md#sn-auth-006), a resend cooldown countdown, and navigation to Profiles on verified success.
**Out:** OTP generation/delivery/verification and rate-limit enforcement ([SN-AUTH-006](auth.md#sn-auth-006)), the methods step ([SN-ONB-002](onboarding.md#sn-onb-002)), multi-country picker beyond the default prefix (verify list at GA — see Technical notes).

#### Acceptance criteria
- [ ] `phone` step shows a fixed +91 prefix and a numeric field that strips non-digits (max 11 chars incl. a space); **Send code** with < 10 digits shows toast 'Enter a 10-digit mobile number' and does not advance.
- [ ] With ≥ 10 digits, **Send code** calls [SN-AUTH-006](auth.md#sn-auth-006), advances to `otp`, and toasts 'Code sent to +91 <phone>'.
- [ ] `otp` step accepts digits only (max 6), letter-spaced; **Verify and continue** with < 6 digits shows toast 'Enter the 6-digit code'; with 6 digits it asks [SN-AUTH-006](auth.md#sn-auth-006) to verify and navigates to Profiles only on a server 'valid' result.
- [ ] **Resend code** is disabled for a visible cooldown (≥ 30 s between sends, reflecting `PRD-AUTH-004`) and re-invokes send; **Change number** returns to the phone step and clears the OTP.
- [ ] A wrong/expired code returns a toast ('That code didn't match — check it or resend') and never reveals whether the number exists; the field never renders inline red text.
- [ ] The phone number and OTP code are never logged, never written to the notes DB, and never placed on the clipboard.

#### Technical notes
Extend `LoginController` with `phone`/`otp` sub-states and formatters in `app/lib/login/`; call `AuthController.sendOtp(e164)` / `verifyOtp(code)` from [SN-AUTH-006](auth.md#sn-auth-006) which returns a `Result<T, Failure>` (never throw across the boundary). Country code derives from device locale; keep a single `CountryCode` accessor so the GA multi-country list (`PRD-AUTH-003` 'verify list') slots in without UI rework. Cite `PRD-AUTH-003/004`, `docs/design/screens-and-flows.md` §3.

#### Security & privacy
Threats: OTP brute force / credential stuffing (CWE-307), enumeration of registered numbers, code leakage. Controls: client shows cooldown but the server enforces single-use, ≤ 10-min expiry, and ≤ 5/hour (MASVS-AUTH-1, ASVS V6) in [SN-AUTH-006](auth.md#sn-auth-006); the UI never validates the code locally and gives non-enumerating errors (OWASP-A07). Baseline: no phone/OTP in logs or clipboard.

#### UX notes
Design: `docs/design/screens-and-flows.md` §3. Render across all **17 looks + light/dark**. The OTP field is large and letter-spaced; on mobile use `keyboardType` numeric + `oneTimeCode`/SMS autofill where available; on web it is a native DOM input (`ux-principles.md` §8). a11y: `Semantics` labels, 44pt/48dp targets, contrast ≥ 4.5:1, a live-region announcement for 'Code sent'/errors, and a visible focus ring on web. Errors are toasts (`ux-principles.md` §4.3).

#### Test plan
- Widget: `app/test/login/phone_otp_test.dart` — digit stripping; < 10 and < 6 length toasts; send advances; verify navigates only on a stubbed 'valid'; resend cooldown disables the button.
- Golden: `app/test/login/goldens/otp_step_*` across a look subset + dark.
- Negative: assert phone/OTP never appear in a captured log or clipboard; a stubbed 'expired' returns a non-enumerating toast.

#### Dependencies
[SN-AUTH-006](auth.md#sn-auth-006) (OTP delivery + server verification + rate limits).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Docs updated if the resolved country-code behaviour changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-004

<a id="sn-onb-004"></a>

**Add guest 'Skip for now' entry and guest-to-account adoption confirmation**

| Field | Value |
|---|---|
| GitHub | #366 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, auth, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-007](auth.md#sn-auth-007) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-AUTH-1`, `ASVS-V6`, `OWASP-A07` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
Guest mode is a **locked decision**: identity is never required to take notes (`docs/product/prd-03-identity-sync-privacy-settings-billing.md` §1.2, LOCKED DECISION 5; `ux-principles.md` §10). The design mock has no such control (a documented gap), so `PRD-AUTH-007` makes it mandatory: the Login screen MUST offer a **'Skip for now — take notes without an account'** tertiary link under the methods that creates a local Guest profile and lands on Library. This issue also builds the **later sign-in adoption** confirmation (`PRD-AUTH-010`): when a Guest signs in, the existing local workspace is attached to the new identity in place, with a one-line confirmation 'Your notes stay on this device and are now linked to <account>', and nothing is uploaded until sync is explicitly enabled. The Guest profile itself and the workspace attachment are owned by [SN-AUTH-007](auth.md#sn-auth-007) / [SN-CORE-002](storage.md#sn-core-002); this issue owns the entry control, the confirmation UI, and the inline 'Sign in to <benefit>' affordances.

#### Scope
**In:** the 'Skip for now' tertiary link on the methods step; creating/entering a Guest session via [SN-AUTH-002](auth.md#sn-auth-002); landing on Library with no onboarding gate beyond the optional tour; the guest→account adoption confirmation sheet; the single inline 'Sign in to <benefit>' affordance shown on account-bound surfaces (sync, sharing, cross-device entitlement, student verification).
**Out:** the Guest data partition and workspace attachment logic ([SN-AUTH-007](auth.md#sn-auth-007), [SN-CORE-002](storage.md#sn-core-002)), E2EE key setup at first sync ([SN-CRY-001](security.md#sn-cry-001)), the actual sync toggle ([SN-SYNC-001](sync.md#sn-sync-001)), and the sign-in methods themselves ([SN-ONB-002](onboarding.md#sn-onb-002)).

#### Acceptance criteria
- [ ] The Login methods step shows a tertiary 'Skip for now — take notes without an account' action below the primary methods; tapping it creates a Guest session and navigates to Library with zero network calls.
- [ ] In Guest mode the full note-taking experience works offline: create/edit/organise notebooks, ink, PDF import (Free limits), audio, on-device search, local export — verified with the device in airplane mode.
- [ ] Account-bound surfaces (sync, sharing/collab, cross-device entitlement, student verification) each show a single inline 'Sign in to <benefit>' affordance and never block the whole screen.
- [ ] Signing in from Guest ADOPTS the existing local workspace in place (no data discarded) and shows the one-line confirmation 'Your notes stay on this device and are now linked to <account>'.
- [ ] After adoption nothing is uploaded until sync is explicitly enabled (`PRD-SYNC-001`); a log-capture confirms no egress occurred during sign-in.
- [ ] The guest path performs no analytics/telemetry calls (telemetry is opt-in and off by default).

#### Technical notes
Add a `GuestEntry` action to `LoginMethodsView` calling `AuthController.continueAsGuest()` ([SN-AUTH-002](auth.md#sn-auth-002)) which yields a local Guest profile ([SN-AUTH-007](auth.md#sn-auth-007)). The adoption confirmation is an `AdoptGuestDataSheet` in `app/lib/login/`; it reads the current workspace id from [SN-CORE-002](storage.md#sn-core-002) and shows the confirmation only — the attach itself is in the auth/core layer. Cite `PRD-AUTH-007/008/009/010`, `PRD-SYNC-001`, [ADR-0004](../adr/0004-local-first-zero-server.md).

#### Security & privacy
Threats: silent data exfiltration on sign-in, forcing identity where none is needed. Controls: guest makes zero network calls (MASVS-PRIVACY-1); adoption uploads nothing until explicit sync opt-in; sign-in uses native pickers only (MASVS-AUTH-1, ASVS V6, OWASP-A07). Baseline: no content/tokens in logs. This is the concrete enforcement of the zero-knowledge, local-first promise at the identity boundary.

#### UX notes
Design: extends `docs/design/screens-and-flows.md` §3 (resolving the open gap) with the mascot-light, calm voice of `ux-principles.md` §5 ('take notes without an account', not 'skip login'). Render across all **17 looks + light/dark**. a11y: the tertiary link is a real focusable control with a `Semantics` label; 44pt/48dp target; the inline 'Sign in to <benefit>' affordances are labelled and non-blocking. The adoption sheet is a look-styled dialog, not red error text.

#### Test plan
- Widget: `app/test/login/guest_entry_test.dart` — skip creates a guest session and routes to Library; account-bound surfaces show the inline affordance.
- Integration: `app/integration_test/guest_offline_test.dart` — full note-taking in airplane mode; sign-in adopts data and uploads nothing (network mock asserts zero requests).
- Negative: log/telemetry capture asserts no analytics call and no token/content logged on the guest path.

#### Dependencies
[SN-AUTH-002](auth.md#sn-auth-002) (guest/sign-in intents), [SN-AUTH-007](auth.md#sn-auth-007) (Guest profile). Soft: [SN-CORE-002](storage.md#sn-core-002) (workspace attach), [SN-SYNC-001](sync.md#sn-sync-001) (sync stays off).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] `docs/design/screens-and-flows.md` note updated to record the added guest control (resolved gap)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; zero-egress guest path verified

---

### SN-ONB-005

<a id="sn-onb-005"></a>

**Build the 3-step onboarding tour overlay scaffold with progress and replay**

| Field | Value |
|---|---|
| GitHub | #367 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The onboarding tour is a full-bleed overlay opened after the first profile pick on first run and replayable from Settings → Account → 'Replay the welcome tour' (`docs/design/screens-and-flows.md` §5, §12). This issue builds the **scaffold** that hosts the three content steps ([SN-ONB-006](onboarding.md#sn-onb-006), [SN-ONB-007](onboarding.md#sn-onb-007), [SN-ONB-008](onboarding.md#sn-onb-008)): the two-column layout (art panel left when wide — the same 'Lecture 12' page + recording pill + avatars pill), the sage logo, the **progress dots** (the active dot widens to 22px), a sticky footer (**Skip** on the left, **Continue** → **Start writing** on the right), and the navigation state machine. It implements `PRD-AUTH-017` and `PRD-AUTH-018`: Skip closes immediately with no data loss; Continue advances 0→1→2; on step 2 the button reads 'Start writing' and lands on Library; the backdrop MUST NOT dismiss on outside-click (unlike other overlays); and the whole tour is re-runnable and non-destructive. The 'first run' flag and per-profile persistence come from [SN-CORE-002](storage.md#sn-core-002)/[SN-AUTH-007](auth.md#sn-auth-007).

#### Scope
**In:** the overlay container, art panel, progress-dot indicator, step router (0/1/2), sticky footer with dynamic button label, Skip and Continue/Start-writing actions, the backdrop-does-not-dismiss rule, the 'firstRun' open-on-first-profile-pick trigger, and the Settings 'Replay the welcome tour' entry point.
**Out:** the content of each step ([SN-ONB-006](onboarding.md#sn-onb-006)/[SN-ONB-007](onboarding.md#sn-onb-007)/[SN-ONB-008](onboarding.md#sn-onb-008)), the Settings screen itself ([SN-SET-001](settings.md#sn-set-001)), and the profile 'firstRun' flag storage ([SN-CORE-002](storage.md#sn-core-002)).

#### Acceptance criteria
- [ ] The overlay opens automatically after the first profile pick when `firstRun` is set, and clears `firstRun` when it closes.
- [ ] Progress dots reflect the step; the active dot animates to 22px width (respect Reduce Motion — cross-fade instead, `ux-principles.md` §6).
- [ ] **Skip** closes immediately with no data loss and lands on Library; **Continue** advances 0→1→2; on step 2 the button label is 'Start writing' and closing lands on Library.
- [ ] Clicking/tapping the dimmed backdrop does NOT dismiss the tour (unlike other overlays); only Skip or Start writing close it.
- [ ] Invoking 'Replay the welcome tour' (from Settings) reopens the tour without deleting existing subjects/looks; replaying is idempotent and non-destructive.
- [ ] The overlay reflows to a single column at `narrow` (< 900px) with no 2-D scroll at 320 CSS px.

#### Technical notes
Build `OnboardingOverlay` + `OnboardingController` (Riverpod holding `obStep`) in `app/lib/onboarding/`; expose an `openOnboarding()` intent reused by first-run and by the Settings replay action ([SN-SET-001](settings.md#sn-set-001)). Steps are child widgets injected by the router. Use `sane_ui` overlay/scaffold components ([SN-DS-003](design-system.md#sn-ds-003)); art via `SaneSageMark` ([SN-BRD-001](brand.md#sn-brd-001)). Cite `PRD-AUTH-017/018`, `docs/design/screens-and-flows.md` §5, [ADR-0003](../adr/0003-state-management-and-app-structure.md).

#### Security & privacy
None beyond baseline: the tour collects only local subject/look preferences (persisted per profile), makes no network calls, and logs no content or identifiers. Framework: MASVS-PRIVACY-1 (no unexpected collection). Baseline: no content/tokens logged.

#### UX notes
Design: `docs/design/screens-and-flows.md` §5 + `design/Sane Notes.dc.html` 'Onboarding'. Render across all **17 looks + light/dark**. Footer is sticky; Skip is low-emphasis, Continue is the accent. a11y: the overlay is a focus-trapped dialog with a `Semantics` label announcing 'Step N of 3'; progress dots expose a text alternative; 44pt/48dp targets; contrast ≥ 4.5:1; keyboard Next/Back and Esc-to-Skip on web; Reduce Motion cross-fades transitions.

#### Test plan
- Widget: `app/test/onboarding/onboarding_scaffold_test.dart` — first-run auto-open + firstRun clear; Skip/Continue/Start-writing routing; backdrop click does not dismiss; replay is non-destructive.
- Golden: `app/test/onboarding/goldens/onboarding_scaffold_*` across a look subset + dark, wide + narrow.
- a11y: focus-trap and 'Step N of 3' semantics asserted; Reduce-Motion path uses cross-fade.

#### Dependencies
[SN-DS-003](design-system.md#sn-ds-003) (overlay components), [SN-CORE-002](storage.md#sn-core-002) (firstRun flag + per-profile persistence). Soft: [SN-SET-001](settings.md#sn-set-001) (replay entry).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Docs updated if the resolved backdrop/replay behaviour changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-006

<a id="sn-onb-006"></a>

**Implement onboarding step 0 value-prop feature rows**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ONB-005](onboarding.md#sn-onb-005) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Step 0 of the onboarding tour ('Every way you take notes, in one notebook.') is the product's value proposition, drawn straight from the design (`docs/design/screens-and-flows.md` §5, §16). It is informational only (`PRD-AUTH-014`) and must show the three feature rows verbatim: **Ink that keeps up** ('Pressure, tilt, no lag — and it stays searchable.'), **Slides and PDFs inside your notes** ('Highlight, annotate, then write on the next page.'), and **Audio linked to your ink** ('Tap any word you wrote to hear what was being said.'), under the subcopy 'Write like it's paper, mark up the lecture's PDF, and record the room — all linked, all searchable.' This issue provides the step-0 content widget that the tour scaffold ([SN-ONB-005](onboarding.md#sn-onb-005)) hosts. Because it is a small, self-contained, copy-driven surface it is a good first issue.

#### Scope
**In:** the step-0 content widget — heading, subcopy, and the three icon+title+subtitle feature rows, all verbatim; the icons sourced from the `sane_ui` icon set; correct token-driven styling.
**Out:** the overlay/footer/navigation ([SN-ONB-005](onboarding.md#sn-onb-005)), any interactivity (this step has none beyond Continue), and the localisation strings pipeline ([SN-I18N-001](i18n.md#sn-i18n-001) supplies translations later).

#### Acceptance criteria
- [ ] The heading reads 'Every way you take notes, in one notebook.' and the subcopy 'Write like it's paper, mark up the lecture's PDF, and record the room — all linked, all searchable.' verbatim.
- [ ] Exactly three feature rows render in order with verbatim titles and subtitles: Ink that keeps up / Slides and PDFs inside your notes / Audio linked to your ink.
- [ ] Each row has a leading icon from `sane_ui`, a title, and a one-line subtitle; text wraps gracefully and survives +40% string expansion without truncation (i18n readiness, `ux-principles.md` §5).
- [ ] The step renders correctly in all 17 looks + light/dark with no hard-coded colours, spacing, or type sizes.
- [ ] a11y: each row is a single `Semantics` node combining title + subtitle; contrast ≥ 4.5:1; 44pt/48dp minimum row height.

#### Technical notes
Add `OnboardingStepValueProps` in `app/lib/onboarding/steps/`; a pure `StatelessWidget` composed from `sane_ui` list-row and typography components ([SN-DS-003](design-system.md#sn-ds-003)) reading tokens ([SN-DS-002](design-system.md#sn-ds-002)). All strings live in the app's localisation ARB with the English defaults above (feeds [SN-I18N-001](i18n.md#sn-i18n-001)). No logic in `build`. Cite `PRD-AUTH-014`, `docs/design/screens-and-flows.md` §5.

#### Security & privacy
None beyond baseline: a static informational screen; no input, no network, no collection. Framework: MASVS-PRIVACY-1. Baseline: no content/tokens logged.

#### UX notes
Design: `docs/design/screens-and-flows.md` §5 step 0. Voice is plain and warm, no exclamation marks (`ux-principles.md` §5). Render across all **17 looks + light/dark**; icons pick up the accent per look. a11y per `docs/design/accessibility.md`: labelled rows, contrast, and target size; text scales with Dynamic Type / 'readable font'.

#### Test plan
- Widget: `app/test/onboarding/step_value_props_test.dart` — exact copy and row order; +40% pseudo-locale does not truncate.
- Golden: `app/test/onboarding/goldens/step0_*` across a look-per-family subset + dark.

#### Dependencies
[SN-DS-003](design-system.md#sn-ds-003) (row/typography components). Soft: [SN-I18N-001](i18n.md#sn-i18n-001) (translations).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Docs unchanged (content matches the design copy inventory)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-007

<a id="sn-onb-007"></a>

**Implement onboarding step 1 subject multi-select and subject seeding**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-005](onboarding.md#sn-onb-005) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003), [SN-CORE-002](storage.md#sn-core-002), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Step 1 of the tour ('What are you studying?') sets up the student's subjects and sensible default paper for each, with the promise 'Change anything later.' (`docs/design/screens-and-flows.md` §5). It implements `PRD-AUTH-015`: present the 12 subject chips from `STUDY` — Physics, Mathematics, Chemistry, Biology, Computer Science, Economics, Design, Law, Medicine, Languages, History, Engineering — as a multi-select, with **Physics + Mathematics preselected**. Selecting subjects MUST seed matching subject entries (using the design's subject colours — Physics `#2f6df6`, Mathematics `#7a3ec9`, Chemistry `#2e8b57`, Design `#e07b1c`, Languages `#d9488a`, Personal `#6b7280`, and sensible hues for the others) and a sensible default paper per subject, persisted per profile. This is the onboarding UI + the seeding call; the subject/library model is owned by [SN-LIB-002](library.md#sn-lib-002)/[SN-CORE-002](storage.md#sn-core-002) and the default paper mapping is confirmed against the templates area ([SN-TPL-001](templates.md#sn-tpl-001)).

#### Scope
**In:** the step-1 chip grid with 12 multi-select subject chips, the Physics+Mathematics preselection, selection state, and the 'seed subjects + default paper' commit that writes chosen subjects (with colours) into the current profile's library via [SN-LIB-002](library.md#sn-lib-002).
**Out:** the subject/library data model and colours source of truth ([SN-LIB-002](library.md#sn-lib-002), [SN-CORE-002](storage.md#sn-core-002)), the template/paper catalogue ([SN-TPL-001](templates.md#sn-tpl-001)), and later subject management in the sidebar/Library.

#### Acceptance criteria
- [ ] Exactly 12 subject chips render in the `STUDY` order; Physics and Mathematics are preselected on first entry.
- [ ] Chips toggle on tap with a clear selected state (accent, `--ac`), announce selected/unselected to screen readers, and support keyboard toggle on web.
- [ ] Advancing seeds one subject entry per selected chip with the design's subject colour and a default paper, into the current profile only (per-profile isolation, `PRD-PROF-004`); the seeding is idempotent on replay (never duplicates an existing subject, `PRD-AUTH-018`).
- [ ] Deselecting all chips is allowed and advances without seeding any subject (no forced choice); the copy 'We'll set up subjects and pick sensible paper for each. Change anything later.' is shown verbatim.
- [ ] Chips reflow to multiple rows and stay tappable (34px chip height per `ux-principles.md` §9.2) down to 320 CSS px.
- [ ] Renders correctly across all 17 looks + light/dark; chip radius follows `--pill`.

#### Technical notes
Add `OnboardingStepSubjects` in `app/lib/onboarding/steps/`; hold selection in `OnboardingController` and, on Continue, call a `LibraryController.seedSubjects(selected)` intent ([SN-LIB-002](library.md#sn-lib-002)) that maps each to `{colour, defaultPaper}` (confirm the paper defaults with [SN-TPL-001](templates.md#sn-tpl-001); if silent, default lined for text-heavy subjects and grid/dotted for STEM — record the choice in a `// DESIGN-OPEN` note). Chips from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003)). Cite `PRD-AUTH-015`, `PRD-PROF-004`, `docs/design/screens-and-flows.md` §5, §17.

#### Security & privacy
None beyond baseline: subject selection is a local, per-profile preference; no network, no analytics. Framework: MASVS-PRIVACY-1. Baseline: no content/tokens logged; the chosen subjects are not sensitive but stay on-device with the profile.

#### UX notes
Design: `docs/design/screens-and-flows.md` §5 step 1. Multi-select chips use the look's accent for selection; the interaction is calm and reversible (`ux-principles.md` §3 progressive disclosure — no forced completion). a11y: each chip is a `Semantics` toggle with subject name + state; 44pt/48dp hit area even at 34px visual; contrast ≥ 4.5:1 including selected-chip text.

#### Test plan
- Widget: `app/test/onboarding/step_subjects_test.dart` — 12 chips + preselection; toggle; empty selection advances without seeding.
- Integration: `app/integration_test/onboarding_seed_subjects_test.dart` — selected subjects appear in the profile's Library with the right colour; replay does not duplicate.
- Golden: `app/test/onboarding/goldens/step1_*` across a look subset + dark.

#### Dependencies
[SN-DS-003](design-system.md#sn-ds-003) (chips), [SN-LIB-002](library.md#sn-lib-002) (subject seeding target), [SN-CORE-002](storage.md#sn-core-002) (per-profile persistence). Soft: [SN-TPL-001](templates.md#sn-tpl-001) (default paper).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Default-paper-per-subject choice recorded in docs if the templates doc was silent
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-008

<a id="sn-onb-008"></a>

**Implement onboarding step 2 look selection and dark-mode toggle**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, theming, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-005](onboarding.md#sn-onb-005) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-DS-003](design-system.md#sn-ds-003), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Step 2 of the tour ('Pick your look.') is where the student first sets the app's visual identity and discovers dark mode: 'Three looks, one app. This is also where dark mode lives.' (`docs/design/screens-and-flows.md` §5). It implements `PRD-AUTH-016`: show three theme cards plus a **Dark mode** toggle; selecting a card sets the active look (`themeSel`) live, and toggling dark mode flips the palette immediately. The full 17-look grid lives in Settings → Appearance ([SN-SET-001](settings.md#sn-set-001)), not here — this step offers a curated three (one per broad feel, e.g. Paper / Minimalism / Pop) as an approachable first choice. The look/dark-mode selection persists per profile (`PRD-SET-011`, `PRD-SET-012`, `PRD-PROF-004`). Cards are live previews built from the token sheet ([SN-DS-002](design-system.md#sn-ds-002)).

#### Scope
**In:** the step-2 content with three live theme-preview cards, a selected-state ring, the Dark mode toggle, live application of the chosen look + mode, and per-profile persistence of `themeSel`/`darkSel`.
**Out:** the full 17-look grid + wallpaper (Settings → Appearance, [SN-SET-001](settings.md#sn-set-001)), the token ThemeExtension itself ([SN-DS-002](design-system.md#sn-ds-002)), and the theming engine's palette maps.

#### Acceptance criteria
- [ ] Exactly three theme cards render, each previewing its own surface/button/heading from live tokens; selecting a card applies that look to the whole app immediately and shows a selected ring.
- [ ] The Dark mode toggle flips every look's night palette live (18px knob travel in 200ms; Reduce Motion = instant), and PDFs (none present here) would keep original colours per the theming rule (`ux-principles.md` §7).
- [ ] The chosen look and dark-mode state persist to the current profile and survive relaunch (`PRD-SET-011/012`, per-profile per `PRD-PROF-004`).
- [ ] Dark mode defaults to following the OS ('system') until the user makes an explicit choice; the app does not auto-switch by time of day (`ux-principles.md` §7).
- [ ] Cards and toggle render correctly across the presented looks in both modes; contrast holds using accessibility-adjusted tokens where a look's raw accent fails (`docs/design/accessibility.md`).
- [ ] a11y: cards are `Semantics` radio-like options ('Paper look, selected'); the toggle announces on/off; 44pt/48dp targets; keyboard-selectable on web.

#### Technical notes
Add `OnboardingStepLook` in `app/lib/onboarding/steps/`; set the look/mode through the app theme controller that owns `themeSel`/`darkSel` (Riverpod) reading the `ThemeExtension` from [SN-DS-002](design-system.md#sn-ds-002); persist per profile via [SN-CORE-002](storage.md#sn-core-002). Preview cards are miniature `sane_ui` surfaces rendered under a scoped `Theme`. Cite `PRD-AUTH-016`, `PRD-SET-011/012`, `ux-principles.md` §7, `docs/design/screens-and-flows.md` §5.

#### Security & privacy
None beyond baseline: look/dark-mode are local per-profile preferences; no network or analytics. Framework: MASVS-PRIVACY-1. Baseline: no content/tokens logged.

#### UX notes
Design: `docs/design/screens-and-flows.md` §5 step 2 + `design/Sane Notes.dc.html` 'Onboarding'. The three cards are a calm, curated subset; the full grid is discoverable later in Settings (progressive disclosure, `ux-principles.md` §3). a11y per `docs/design/accessibility.md`: labelled radio semantics, no colour-only selection cue (also show a ring/checkmark), contrast, and target size.

#### Test plan
- Widget: `app/test/onboarding/step_look_test.dart` — three cards; selecting applies the look; dark toggle flips palette; selection persists to a fake profile store.
- Golden: `app/test/onboarding/goldens/step2_*` for each presented look in light + dark.
- a11y: radio semantics and non-colour-only selection cue asserted.

#### Dependencies
[SN-DS-002](design-system.md#sn-ds-002) (token ThemeExtension for looks), [SN-DS-003](design-system.md#sn-ds-003) (cards/toggle), [SN-CORE-002](storage.md#sn-core-002) (per-profile persistence). Soft: [SN-SET-001](settings.md#sn-set-001) (full look grid).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Docs updated if the curated three-look choice differs from the design's examples
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-009

<a id="sn-onb-009"></a>

**Build the Profiles 'Who's writing?' screen**

| Field | Value |
|---|---|
| GitHub | #368 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-AUTH-007](auth.md#sn-auth-007), [SN-DS-003](design-system.md#sn-ds-003), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-STORAGE-1`, `OWASP-A01` |
| Extra labels | agent-ready |

#### Context
The Profiles screen ('Who's writing?' / 'One account, a private space for each of you.') lets a device pick which local profile to open — a Netflix-style local partition, not separate cloud accounts (`docs/design/screens-and-flows.md` §4, `PRD-PROF-001..003`). This issue builds the screen UI: profile tiles (rounded-square avatar with initial, name, note), the active profile's accent ring + 'Current' label (others 'Switch'), the **Add profile** tile (dashed +) with an inline name input (max 24 chars) → **Create**/**Cancel**, and **Use a different account** (signs the device out to Login). Picking a tile activates the profile and opens Library; on first run after login it also opens the onboarding tour ([SN-ONB-005](onboarding.md#sn-onb-005)). The per-profile data isolation and the locked-profile biometric gate are owned by [SN-AUTH-007](auth.md#sn-auth-007) / [SN-CORE-002](storage.md#sn-core-002); this issue owns the screen and its controls, and must respect the locked-profile gate before revealing a locked profile.

#### Scope
**In:** the full-bleed Profiles screen, profile tiles with Current/Switch states, `pickProfile(id)` navigation (opening the tour on firstRun), the Add-profile inline create/cancel flow, and 'Use a different account' (sign out). The same add/switch controls are reused by Settings → Account.
**Out:** per-profile data partitioning + entitlement scope ([SN-AUTH-007](auth.md#sn-auth-007), [SN-CORE-002](storage.md#sn-core-002)), the biometric unlock implementation for locked profiles ([SN-AUTH-007](auth.md#sn-auth-007) / security area), sign-out token clearing ([SN-AUTH-002](auth.md#sn-auth-002)), and the Settings Account tab shell ([SN-SET-001](settings.md#sn-set-001)).

#### Acceptance criteria
- [ ] All local profiles render as tiles (avatar initial, name, note); the active profile shows an accent ring + 'Current', others show 'Switch'.
- [ ] Tapping a tile activates that profile and opens Library; on first run after login it also opens the onboarding tour and clears `firstRun`.
- [ ] **Add profile** reveals an inline name input capped at 24 chars; **Create** appends a profile (rotating colour, role 'Member', note 'New profile') and toasts 'Profile added — <name>'; **Cancel** dismisses with no change.
- [ ] **Use a different account** signs the device out and returns to Login WITHOUT deleting local note data (`PRD-PROF-003`) — it clears identity tokens only.
- [ ] A profile marked 'locked' MUST require device biometric/passcode ([SN-AUTH-007](auth.md#sn-auth-007)) before its tile opens; its content, thumbnails, and search index stay unreadable until unlock (`PRD-PROF-005`).
- [ ] Screen reflows to a responsive tile grid down to 320 CSS px with no 2-D scroll.

#### Technical notes
Build `ProfilesScreen` + `ProfilesController` (Riverpod) in `app/lib/profiles/`, reading the profile list and active id from [SN-AUTH-007](auth.md#sn-auth-007)/[SN-CORE-002](storage.md#sn-core-002); `pickProfile` triggers the locked-profile gate before switching. Tiles/inputs from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003)). Sign-out delegates to `AuthController.signOut()` ([SN-AUTH-002](auth.md#sn-auth-002)). Cite `PRD-PROF-001..005`, `docs/design/screens-and-flows.md` §4, [ADR-0004](../adr/0004-local-first-zero-server.md).

#### Security & privacy
Threats: opening another person's locked profile (broken access control, OWASP-A01), reading locked-at-rest content. Controls: biometric/passcode gate before a locked tile opens (MASVS-AUTH-1); locked content stays encrypted-at-rest until unlock (MASVS-STORAGE-1); sign-out never deletes local data by default. Baseline: no content/tokens logged; profile notes are not sensitive strings but names stay local.

#### UX notes
Design: `docs/design/screens-and-flows.md` §4 + `design/Sane Notes.dc.html` 'Profiles'. Voice verbatim: 'Who's writing?' / 'One account, a private space for each of you.' Render across all **17 looks + light/dark**. a11y: tiles are labelled buttons ('Riya, current profile'; 'Add profile'); the name input has a label + 24-char counter; 44pt/48dp targets; contrast ≥ 4.5:1; keyboard order on web. Locked tiles show a lock affordance and announce 'locked'.

#### Test plan
- Widget: `app/test/profiles/profiles_screen_test.dart` — Current/Switch states; add/create/cancel; pick opens Library and opens tour only on firstRun; sign-out routes to Login.
- Integration: `app/integration_test/profiles_locked_test.dart` — a locked profile requires a (stubbed) biometric before opening.
- Golden: `app/test/profiles/goldens/profiles_*` across a look subset + dark.

#### Dependencies
[SN-AUTH-007](auth.md#sn-auth-007) (local profiles + locked-profile gate), [SN-DS-003](design-system.md#sn-ds-003) (tiles/inputs), [SN-CORE-002](storage.md#sn-core-002) (profile store). Soft: [SN-AUTH-002](auth.md#sn-auth-002) (sign out).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Docs updated if locked-profile interaction changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-010

<a id="sn-onb-010"></a>

**Implement first-run tips and empty states across Library, Search and Trash**

| Field | Value |
|---|---|
| GitHub | #369 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | onboarding, library, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003), [SN-LIB-002](library.md#sn-lib-002), [SN-BRD-003](brand.md#sn-brd-003) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The design defines empty/loading/error/offline states only minimally (an open question in `docs/design/screens-and-flows.md` §6, §18), so `docs/design/ux-principles.md` §4 sets the decisive defaults a builder MUST implement until overridden. This issue delivers the first-run tips and the empty states across the app's list surfaces, in the warm, actionable, never-a-dead-end voice: **Library (no notebooks)** 'Nothing here yet.' + 'Make your first notebook — write like it's paper.' with a **New notebook** action; **Trash** 'Trash is empty — deleted notebooks stay here for 30 days.'; **Favorites/Shared (empty)** 'Nothing here yet.' + one line explaining what lands here + a 'Go to All notebooks' action; **Search (no query)** shows recent searches + the placeholder line; **Search (no results)** 'No matches for "<query>" — try a shorter word, or switch the filter to All.' with a reset-to-All action. Empty states use the Sage mascot sparingly — at most one on the Library first-run empty state ([SN-BRD-001](brand.md#sn-brd-001)). It lands in M2 because that is when the Library and its filters exist ([SN-LIB-002](library.md#sn-lib-002)).

#### Scope
**In:** an `EmptyState` component (illustration/mascot slot, headline, one-line body, optional primary action) and its concrete instances for Library-empty, Trash-empty, Favorites-empty, Shared-empty, Search-no-query, and Search-no-results; the first-run 'one gentle tip' surface (not a coach-mark storm, `ux-principles.md` §3).
**Out:** the Library screen and filters themselves ([SN-LIB-002](library.md#sn-lib-002)), the Search screen ([SN-SRCH-001](search.md#sn-srch-001)), the loading skeletons for genuine waits (owned by their screens), and the Tips-notification toggle delivery ([SN-NOTF-001](notifications.md#sn-notf-001)).

#### Acceptance criteria
- [ ] Each surface renders its exact copy verbatim from `ux-principles.md` §4.1 / `screens-and-flows.md` §16; no surface shows a bare spinner over a blank screen.
- [ ] Library-empty offers a **New notebook** primary action; Favorites/Shared-empty offer 'Go to All notebooks'; Search-no-results offers 'reset filter to All'; each action performs the stated navigation — no dead ends.
- [ ] At most ONE Sage mascot appears (Library first-run empty); other empty lists have no mascot (`ux-principles.md` §4.1).
- [ ] Empty states render correctly across all 17 looks + light/dark and reflow at 320 CSS px.
- [ ] The first-run gentle tip appears at most once and is dismissible; there is no first-launch coach-mark sequence.
- [ ] a11y: each empty state is a labelled region; the primary action is a focusable, 44pt/48dp target with contrast ≥ 4.5:1.

#### Technical notes
Build a reusable `EmptyState` in `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003)) and wire instances from the Library ([SN-LIB-002](library.md#sn-lib-002)) and Search ([SN-SRCH-001](search.md#sn-srch-001)) screens via their view-models. The mascot slot uses `SaneSageMark` ([SN-BRD-003](brand.md#sn-brd-003)), the M0 component; the final master art ([SN-BRD-002](brand.md#sn-brd-002)) is a later drop-in asset swap. Keep copy in the localisation ARB. Cite `ux-principles.md` §4, `docs/design/screens-and-flows.md` §6, §16.

#### Security & privacy
None beyond baseline: empty states render static copy and navigation only; the search-no-results state echoes the user's query — render it as text, never as markup, and never log it. Framework: MASVS-PRIVACY-1. Baseline: no content/tokens logged; the query string is not persisted by this component.

#### UX notes
Design: `ux-principles.md` §4.1 (the decisive-default table) + `screens-and-flows.md` §6, §16. Voice is warm and specific, no exclamation marks. Render across all **17 looks + light/dark**; the mascot uses the single placeholder asset. a11y per `docs/design/accessibility.md`. The no-results query is HTML-escaped when highlighted.

#### Test plan
- Widget: `app/test/onboarding/empty_states_test.dart` — exact copy per surface; actions navigate; only Library-empty shows the mascot; no-results echoes the query as escaped text.
- Golden: `app/test/onboarding/goldens/empty_*` across a look subset + dark.
- Negative: assert the query in no-results cannot inject markup and is not logged.

#### Dependencies
[SN-DS-003](design-system.md#sn-ds-003) (EmptyState + actions), [SN-LIB-002](library.md#sn-lib-002) (Library host + filters), [SN-BRD-003](brand.md#sn-brd-003) (SaneSageMark component; the specific child replacing the epic-level dependency on SN-BRD-001). Soft: [SN-SRCH-001](search.md#sn-srch-001) (Search host).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] `ux-principles.md` §4 marked implemented where these defaults now ship
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-011

<a id="sn-onb-011"></a>

**Implement point-of-use permission-rationale sheets**

| Field | Value |
|---|---|
| GitHub | #370 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, android-tablet, ios-phone, android-phone, web |
| Areas | onboarding, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `ASVS-V14`, `OWASP-A01` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
The app must request every OS permission **only at point of use, with a purpose string** (`PRD-PRIV-002`, MASVS-PRIVACY-1, ASVS V14). This issue builds the pre-permission **rationale sheets** that appear immediately before the OS prompt for each capability the app can request: camera (scan a document/PDF), microphone (record lecture audio), photos (insert an image), notifications (class reminders / shared activity), biometrics (app/profile/notebook lock), and cloud-drive access (sync). Each sheet plainly states why the permission is needed and what the app will and won't do, then triggers the native prompt; a denial is handled gracefully with a path to OS Settings. It lands in M2 because the first real permission (camera for PDF scan) ships then, with microphone following in M3 audio. The permission *inventory panel* and the broader consent framework live in the Privacy epic ([SN-PRV-001](privacy.md#sn-prv-001)); this issue owns the just-in-time rationale UI and the request orchestration.

#### Scope
**In:** a `PermissionRationaleSheet` component + a `PermissionRequester` that, per capability, shows the rationale, invokes the platform request via the relevant plugin, and routes a denied/permanently-denied result to a 'grant in Settings' affordance; purpose-string copy for camera, mic, photos, notifications, biometrics, and cloud drive.
**Out:** the Permissions inventory panel + grant-state list ([SN-PRV-001](privacy.md#sn-prv-001)), the features that consume each permission (PDF scan, audio, image insert, notifications, lock, sync — owned by their areas), and the iOS Info.plist / Android manifest purpose strings themselves (declared in the platform config, cross-checked here).

#### Acceptance criteria
- [ ] No permission is ever requested at launch or before its feature is invoked; each request is preceded by a rationale sheet naming the specific purpose (e.g. 'Sane needs the camera to scan a document into your notes. Photos stay on your device.').
- [ ] Granting proceeds to the feature; denying returns to the feature with a non-blocking explanation and a 'Open Settings' deep link; permanently-denied never re-prompts the OS but offers Settings.
- [ ] Each capability maps to exactly one rationale with copy that matches its platform purpose string; the six capabilities (camera, mic, photos, notifications, biometrics, cloud drive) are all covered.
- [ ] The rationale sheet makes no network call and logs nothing about the decision beyond an opaque local grant-state cache read by the Privacy panel ([SN-PRV-001](privacy.md#sn-prv-001)).
- [ ] Sheets render across all 17 looks + light/dark and reflow at 320 CSS px; on web, only the applicable capabilities (e.g. notifications, camera) are offered.
- [ ] a11y: sheet is a focus-trapped labelled dialog; buttons are 44pt/48dp; contrast ≥ 4.5:1; the purpose text is read in full by screen readers.

#### Technical notes
Build `PermissionRationaleSheet` in `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003)) and a `PermissionRequester` service in `app/lib/permissions/` delegating to the platform plugins (camera/mic/photos/notifications via the app's permission plugin; biometrics via `sane_secure_store`; cloud drive via `sane_cloud_drive`). Grant state feeds the Privacy panel ([SN-PRV-001](privacy.md#sn-prv-001)). Verify Info.plist usage descriptions + Android `<uses-permission>`/runtime request strings match the rationale copy. Cite `PRD-PRIV-002`, MASVS-PRIVACY-1, ASVS V14, `docs/design/ux-principles.md` §4. The Permissions panel ([SN-PRV-004](privacy.md#sn-prv-004), M4) consumes this component's grant state; this issue does not depend on the SN-PRV-001 epic.

#### Security & privacy
Threats: over-broad or premature permission grabs (privacy, MASVS-PRIVACY-1), permission escalation without context (OWASP-A01), platform-config drift. Controls: strictly point-of-use requests with purpose strings (ASVS V14, MASVS-PLATFORM-1); denials fail closed to the non-permissioned path; no dark-pattern re-prompting. Baseline: no content/tokens logged; grant state is a boolean cache, not PII.

#### UX notes
Design: derived from `ux-principles.md` §4 + `PRD-PRIV-002` (no dedicated mock — record a `// DESIGN-OPEN` note). Voice is plain and reassuring, stating the privacy benefit ('Photos stay on your device'). Render across all **17 looks + light/dark**. a11y per `docs/design/accessibility.md`: focus trap, labelled buttons, full purpose text, target sizes.

#### Test plan
- Widget: `app/test/permissions/permission_rationale_test.dart` — rationale precedes the (mocked) request; grant proceeds, deny shows Settings link, permanently-denied does not re-prompt.
- Integration: `app/integration_test/permission_camera_scan_test.dart` — the camera path shows the rationale before the OS prompt.
- Config: a test asserts each rationale has a matching platform purpose string.

#### Dependencies
[SN-DS-003](design-system.md#sn-ds-003) (sheet component). Grant state is consumed by — not blocked on — the Privacy permissions panel [SN-PRV-004](privacy.md#sn-prv-004) (M4); the rationale sheet + requester ship independently in M2.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Purpose strings verified against platform config; `docs/security/controls-matrix.md` updated if mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-012

<a id="sn-onb-012"></a>

**Build the web/PWA first-run and install entry ('try on web')**

| Field | Value |
|---|---|
| GitHub | #371 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | web |
| Areas | onboarding, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003), [SN-ONB-004](onboarding.md#sn-onb-004) |
| Security controls | `MASVS-PRIVACY-1`, `ASVS-V14`, `OWASP-A05` |
| Extra labels | agent-ready |

#### Context
'Try on web' is a core acquisition promise — a student can open Sane Notes in a browser with no download and start writing (LOCKED DECISION 1: Web/PWA is a first-class surface; `docs/architecture/overview.md`, ADR-0010 web strategy). This issue builds the **in-app** web first-run: landing straight into a usable guest editor on the web, a dismissible **Install app** prompt (PWA `beforeinstallprompt` on supported browsers; an 'Add to Home Screen' hint on iOS Safari where the event is unavailable), and a short web-specific note that at-rest protection on web is reduced (no Keychain/Keystore) with a link to the privacy dashboard. The marketing-site button that routes here lives on the website ([SN-SITE-001](website.md#sn-site-001)); this issue owns what happens once the PWA loads. The guest entry it builds on is [SN-ONB-004](onboarding.md#sn-onb-004). Web input specifics (native DOM text, Scribble/IME) follow `ux-principles.md` §8.

#### Scope
**In:** the web first-run route that drops a no-account visitor into a guest workspace, the PWA install prompt component (capturing `beforeinstallprompt`, offering Install, honouring dismissal), the iOS-Safari add-to-home-screen hint, and the reduced-at-rest-protection notice with a privacy-dashboard link.
**Out:** the marketing 'try on web' button and landing page ([SN-SITE-001](website.md#sn-site-001)), the service worker / offline caching + PWA manifest wiring (web platform epic [SN-WEB-001](compat.md#sn-web-001)), the guest workspace mechanics ([SN-ONB-004](onboarding.md#sn-onb-004)), and the privacy dashboard itself ([SN-PRV-001](privacy.md#sn-prv-001)).

#### Acceptance criteria
- [ ] Opening the PWA with no account lands directly in a usable guest editor (via [SN-ONB-004](onboarding.md#sn-onb-004)) with no forced sign-in and no download.
- [ ] On a browser that fires `beforeinstallprompt`, a dismissible **Install app** affordance appears; accepting shows the native install prompt, dismissing hides it and does not nag again for the session.
- [ ] On iOS Safari (no `beforeinstallprompt`), an 'Add to Home Screen' hint is shown instead, with correct share-sheet instructions.
- [ ] A one-line web-specific notice states that on the web, notes are protected in-browser but without hardware key storage, linking to the privacy dashboard ([SN-PRV-001](privacy.md#sn-prv-001)); the notice appears once and is dismissible.
- [ ] Everything reflows at 320 CSS px, is keyboard-reachable, and renders across all 17 looks + light/dark.
- [ ] The first-run path makes no analytics call and stores only a local 'seen install prompt' flag (try/catch around storage per artifact/web storage rules).

#### Technical notes
Build `WebFirstRun` + `PwaInstallController` in `app/lib/onboarding/web/`, guarded by `kIsWeb`; capture `beforeinstallprompt` via a thin JS interop shim and store the deferred event. Reduced-at-rest posture references `PRD-STOR-003` open decision (web has no Keychain/Keystore). Install/hint UI from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003)). Cite ADR-0010 (web/PWA strategy), `ux-principles.md` §8, `PRD-STOR-003`, `PRD-AUTH-007`.

#### Security & privacy
Threats: over-promising at-rest security on web, insecure default config (OWASP-A05). Controls: honestly label the reduced web posture (MASVS-PRIVACY-1, ASVS V14) and link the privacy dashboard; the install prompt requests no permissions; no analytics on first run. Baseline: no content/tokens logged; the only stored flag is a boolean.

#### UX notes
Design: no dedicated mock — follow the calm, honest voice of `ux-principles.md` §4–§5 and record a `// DESIGN-OPEN` note. The install affordance is low-emphasis and never modal-blocks writing (the page is the hero, §2). Render across all **17 looks + light/dark**. a11y per `docs/design/accessibility.md`: labelled Install button, dismissible with keyboard, contrast, target size; the iOS hint is readable by VoiceOver.

#### Test plan
- Widget: `app/test/onboarding/web_first_run_test.dart` (web config) — guest landing; install affordance appears when the deferred event is present and hides on dismiss; iOS-Safari branch shows the hint.
- Golden: `app/test/onboarding/goldens/web_first_run_*` across a look subset + dark.
- Negative: assert no analytics call on first run and storage access is wrapped in try/catch.

#### Dependencies
[SN-DS-003](design-system.md#sn-ds-003) (install/hint UI), [SN-ONB-004](onboarding.md#sn-onb-004) (guest workspace). Soft: [SN-WEB-001](compat.md#sn-web-001) (PWA manifest/service worker), [SN-PRV-001](privacy.md#sn-prv-001) (privacy dashboard link), [SN-SITE-001](website.md#sn-site-001) (marketing entry).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Reduced web at-rest posture documented + linked in the privacy dashboard
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ONB-013

<a id="sn-onb-013"></a>

**Add analytics-free on-device onboarding funnel measurement**

| Field | Value |
|---|---|
| GitHub | #372 |
| Type | feature |
| Priority | p3 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, telemetry, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ONB-001](onboarding.md#sn-onb-001) |
| Depends on | [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `ASVS-V14`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design, innovation |

#### Context
Every mainstream note app measures its onboarding funnel with a third-party analytics SDK; Sane Notes ships **none** (LOCKED DECISION 8: no analytics SDK linked; telemetry opt-in and off by default; `PRD-TEL-001`, `PRD-PRIV-007`, MASVS-PRIVACY-4). Yet the team still needs to know where first-run drops off. This issue delivers a **local, analytics-free funnel**: on-device counters/histograms for the onboarding steps (login shown → method chosen or guest → profile picked → tour step 0/1/2 → first stroke) that live only on the device and are surfaced to the *user* as a private 'your first day' summary, never sent anywhere unless the user has separately opted into telemetry, in which case only pre-aggregated counts (never raw events, never content) are eligible. This is the privacy-preserving alternative to analytics and a genuine differentiator (innovation). It reuses the local storage layer ([SN-CORE-004](storage.md#sn-core-004)) and, if telemetry is ever on, the aggregation contract of [SN-TEL-001](telemetry.md#sn-tel-001).

#### Scope
**In:** a `FunnelRecorder` that increments named, bounded on-device counters at each onboarding milestone; local persistence of those counters (per profile); a read model that can present the counts to the user; and a strict contract that nothing leaves the device unless telemetry is opted in, and then only as aggregated counts stripped of identifiers.
**Out:** the telemetry transport/pipeline itself ([SN-TEL-001](telemetry.md#sn-tel-001)), the telemetry consent surface ([SN-PRV-001](privacy.md#sn-prv-001)), any third-party SDK (explicitly banned), and product-analytics dashboards (there are none server-side for content).

#### Acceptance criteria
- [ ] Funnel milestones are recorded as integer counters only (login_shown, method_google/apple/microsoft/phone, guest_skip, profile_picked, tour_step0/1/2, tour_skipped, first_stroke) — no event carries a timestamp series, note content, identifiers, or free text.
- [ ] With telemetry OFF (default), the counters are written and read **only locally**; a network capture during the whole onboarding shows zero funnel-related egress.
- [ ] With telemetry ON (opt-in), only the aggregated counter snapshot is eligible to send, via [SN-TEL-001](telemetry.md#sn-tel-001), stripped of any stable identifier; raw per-event data never leaves the device.
- [ ] The counters are bounded (monotonic small integers, reset per install) and cannot grow unbounded or store PII (CWE-359 guard).
- [ ] A user-facing 'your first day' read of the counts is available (e.g. in the privacy dashboard) so the measurement is transparent to the user, not hidden.
- [ ] No third-party analytics/ad SDK is linked; the CI SDK-ban gate ([SN-PRV-001](privacy.md#sn-prv-001)) stays green.

#### Technical notes
Implement `FunnelRecorder` in `sane_core` (pure Dart) writing to the drift store ([SN-CORE-004](storage.md#sn-core-004)) under a per-profile key; expose `record(FunnelStep)` called from the onboarding/login controllers. Aggregation for opt-in send conforms to `PRD-TEL-002` (aggregate on-device first, strip identifiers) and routes through [SN-TEL-001](telemetry.md#sn-tel-001). Never import a network client here. Cite `PRD-TEL-001/002`, `PRD-PRIV-007`, [ADR-0011](../adr/0011-telemetry-and-diagnostics.md), MASVS-PRIVACY-2/4.

#### Security & privacy
Threats: covert analytics, linkability/identifiability via event streams (LINDDUN), exposure of private info (CWE-359). Controls: counts-not-events, on-device by default, opt-in-only send of aggregates, no stable identifier, no SDK (MASVS-PRIVACY-2 transparency, MASVS-PRIVACY-4 no third-party tracking, ASVS V14). Baseline: no content/tokens logged; the recorder physically cannot emit content.

#### UX notes
The measurement is transparent, not hidden: the user can view their own counts in the Privacy dashboard ([SN-PRV-001](privacy.md#sn-prv-001)), reinforcing the 'privacy is visible' principle (`ux-principles.md` §10). No chrome is added to the onboarding flow itself. Any user-facing count view renders across **17 looks + light/dark** with a11y labels.

#### Test plan
- Unit: `packages/sane_core/test/funnel_recorder_test.dart` — each step increments the right bounded counter; counters carry no content/timestamp/identifier.
- Integration: `app/integration_test/funnel_no_egress_test.dart` — with telemetry off, a network mock asserts zero funnel egress across a full onboarding run.
- Negative: attempting to record free text / an identifier is rejected at the type level (enum-only API).

#### Dependencies
[SN-CORE-004](storage.md#sn-core-004) (local persistence). Soft: [SN-TEL-001](telemetry.md#sn-tel-001) (opt-in aggregate send), [SN-PRV-001](privacy.md#sn-prv-001) (transparency surface + SDK-ban gate).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] `docs/security/threat-model.md` LINDDUN row updated to note the local funnel and its opt-in aggregate path
- [ ] Reviewed against docs/security/secure-coding-checklist.md; zero-egress-by-default verified

---

### SN-ONB-014

<a id="sn-onb-014"></a>

**Add the dev auth-bypass on-screen watermark**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | onboarding, auth, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ONB-002](onboarding.md#sn-onb-002) |
| Depends on | [SN-AUTH-002](auth.md#sn-auth-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-RESILIENCE-3`, `OWASP-A07`, `CWE-489` |
| Extra labels | agent-ready, sec: threat-model, good first issue |

#### Context
A compile-time flag `--dart-define=SANE_AUTH_BYPASS=true` may short-circuit login in debug/profile builds to drop straight to a seeded profile, and it is guaranteed impossible in release by a three-layer guard owned by [SN-AUTH-002](auth.md#sn-auth-002) (CLAUDE.md §7.5, `PRD-AUTH-011/012`). This issue implements the small but important defence-in-depth from `PRD-AUTH-013`: while bypass is active (non-release only), the app MUST render a persistent on-screen watermark 'AUTH BYPASS — dev build' so a bypassed build can never be mistaken for production in a screenshot or demo. It is a UI overlay that reads the same single bypass accessor as the guard, and it must be tree-shaken out of release along with the flag. Small and self-contained — a good first issue — but security-relevant, so it is typed `security` and gated by the auth-bypass tests.

#### Scope
**In:** a persistent, non-interactive watermark overlay shown across the whole app whenever the bypass accessor resolves true; it reads only the single `BuildConfig`-style accessor from [SN-AUTH-002](auth.md#sn-auth-002) (never a second source of truth) and is compiled out in release.
**Out:** the bypass flag itself, the three-layer release guard, and the CI reachability test (`app/test/security/auth_bypass_test.dart`) — all owned by [SN-AUTH-002](auth.md#sn-auth-002) / the security area.

#### Acceptance criteria
- [ ] When the bypass accessor is true (debug/profile only), a persistent watermark reading 'AUTH BYPASS — dev build' is visible over every screen, including full-bleed Login/Profiles/Onboarding overlays and the Editor.
- [ ] The watermark is non-interactive (ignores pointer events, does not block writing) and does not appear in any release build.
- [ ] The watermark reads the SAME single bypass accessor used by the guard — it introduces no independent flag — and a release-mode widget test confirms it is absent.
- [ ] The overlay adds no measurable latency to the draw loop (it is a static, cached layer above the app, not repainted per frame).
- [ ] The watermark is legible in all 17 looks + light/dark (high-contrast, semi-transparent, corner-anchored and tiled so it survives cropping).

#### Technical notes
Add a `DevBypassWatermark` overlay in `app/lib/auth/` (or `app/lib/dev/`) inserted at the app root above the router, guarded by `if (!kReleaseMode && authBypassActive)` using the accessor exported by [SN-AUTH-002](auth.md#sn-auth-002); wrap in `IgnorePointer` and a `RepaintBoundary`. Ensure it is dead-code-eliminated in release (the accessor is a compile-time `false` there). Cite `PRD-AUTH-011/012/013`, CLAUDE.md §7.5, [ADR-0004](../adr/0004-local-first-zero-server.md), MASVS-AUTH-1.

#### Security & privacy
Threats: a bypassed dev build mistaken for production (STRIDE-Spoofing; CWE-489 active debug code; OWASP-A07). Control: an unmissable, tamper-evident watermark whenever the bypass is on (MASVS-RESILIENCE-3 defence-in-depth over the primary MASVS-AUTH-1 guard). It never weakens the three release layers; it is an additional visible signal. Baseline: logs nothing.

#### UX notes
Design: a developer-only overlay (no user-facing mock). Semi-transparent, high-contrast 'AUTH BYPASS — dev build' tiled diagonally or corner-anchored so it reads on every look and survives a cropped screenshot. Render across **17 looks + light/dark** with sufficient contrast. Not exposed to a11y as an interactive element (decorative `Semantics` label 'developer auth-bypass watermark').

#### Test plan
- Widget: `app/test/auth/dev_bypass_watermark_test.dart` — with the accessor stubbed true the watermark is present over multiple screens and ignores pointers; with release-mode/false it is absent.
- Perf: assert the overlay is a single cached layer (no per-frame repaint) on the editor.

#### Dependencies
[SN-AUTH-002](auth.md#sn-auth-002) (the single bypass accessor + release guard).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans + the auth-bypass reachability test stays green)
- [ ] `docs/security/threat-model.md` note confirms the watermark as defence-in-depth, not a primary control
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-022

<a id="sn-web-022"></a>

**Build the zero-friction "try it now" guest flow on web**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | onboarding, website |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-010](compat.md#sn-web-010), [SN-AUTH-007](auth.md#sn-auth-007), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `OWASP-A01`, `CWE-359` |
| Extra labels | agent-ready, innovation |

#### Context
"Try it on the web" is the product's main acquisition path and a direct answer to the competitor pain point of sign-in-required, online-first note apps (`PRD-CO-412`, user-pain gaps #4/#9). The requirement is precise: launch the **real** Flutter web PWA in **guest mode** with a **sample notebook**, requiring **no login**, letting a visitor ink, import a PDF and try search — meeting the ≤ 30 ms Chrome-desktop ink budget. `PRD-CO-414` adds that guest work must be preservable: a clear path to sign in and **keep** the notebook, plus export while still a guest. `PRD-CO-415` forbids sending any note content to a Sane server. Guest mode itself is first-class across all surfaces (`PRD-AUTH-007`–`PRD-AUTH-010`); this issue is the web entry experience built on top of it.

#### Scope
**In:** the `/try` entry route; a seeded sample notebook (ink, a PDF page, typed text, an audio-anchored page) generated locally on first run; a guest-mode first-run experience with the three-step tour (`PRD-AUTH-014`–`PRD-AUTH-018`); the durability prompt for guest work ([SN-WEB-009](storage.md#sn-web-009)); "sign in and keep" migration; export-while-guest; and a first-visit performance path that reaches an interactive canvas fast.
**Out:** the marketing pages themselves, billing/upgrade flows ([SN-BILL-001](billing.md#sn-bill-001)), the auth implementations ([SN-WEB-018](auth.md#sn-web-018)), and the share-link reader (`PRD-CO-416`, part of sharing).

#### Acceptance criteria
- [ ] Visiting `/try` with no account loads the sample notebook and allows inking within the B6 budget (< 3 s cached; first-ever load measured and reported).
- [ ] A visitor can ink, import a PDF, run a search and export — all without signing in (`PRD-CO-412`, `PRD-CO-003`).
- [ ] Ink latency on Chrome desktop stays ≤ 30 ms in the trial (`PRD-CO-412`).
- [ ] A network capture during a full trial session shows **no note content leaving the browser** and no analytics beacon (`PRD-CO-415`, `PRD-PRIV-007`).
- [ ] Signing in afterwards **keeps** the guest notebooks by adopting the local workspace in place, with the `PRD-AUTH-010` confirmation line; nothing is deleted or duplicated.
- [ ] The durability banner appears for guest work with no durable copy, offering export, install and sign-in — never auto-enabling sync (`PRD-SYNC-001`).
- [ ] The sample notebook is generated locally (no download of user-like content) and is clearly labelled as a sample, deletable in one action.
- [ ] The tour is skippable with no data loss and replayable from Settings (`PRD-AUTH-017`, `PRD-AUTH-018`).

#### Technical notes
Route defined with `go_router` (ADR-0003) under `app/lib/onboarding/try_route.dart`; the sample notebook is built by a local seeder in `app/lib/onboarding/sample_notebook.dart` using the document model ([SN-CORE-002](storage.md#sn-core-002)) so it exercises real code paths rather than a fixture image. Prioritise time-to-first-ink: defer PDF, audio, recognition and cloud plugin initialisation until first use (`docs/platform/performance-budgets.md` §B6 guidance) and let the service worker cache do the rest ([SN-WEB-011](compat.md#sn-web-011)). Guest→account adoption reuses the shared path from [SN-AUTH-007](auth.md#sn-auth-007); the key-migration friction question is a recorded maintainer decision (CLAUDE.md §13) — implement the documented default and leave a `// DESIGN-OPEN` marker. Implements `PRD-CO-412`–`PRD-CO-415`.

#### Security & privacy
Threats: an acquisition funnel is exactly where tracking creeps in (MASVS-PRIVACY-1, MASVS-PRIVACY-4, `PRD-PRIV-007`); a sample notebook shipped as a file is untrusted input if fetched (CWE-20 — generate locally instead); guest data being silently adopted into an account the user did not intend, or abandoned on a shared/public computer (OWASP-A01, CWE-359); marketing-attribution parameters becoming persistent identifiers (MASVS-PRIVACY-2). Controls: zero third-party scripts and zero analytics SDKs on the app origin; no note content in any request (`PRD-CO-415`); adoption requires explicit sign-in and shows what will happen first; a visible "clear this browser's data" action for shared machines; `start_url` and `/try` carry no tracking parameters; nothing about the trial is logged beyond an anonymous local counter (CWE-532).

#### UX notes
Built from the existing screens — Onboarding overlay (`docs/design/screens-and-flows.md` §5), Library (§6) and Editor (§7) — plus one new sample-notebook badge; copy follows §16 and the design's persona voice ("Study smarter."). Must render in all **17 looks, light and dark** with the default look applied for first-time visitors; golden-test the `/try` landing and the sample badge in two looks per mode. States: first visit, returning guest, guest with unsaved/undurable work, post-sign-in adoption confirmation, offline (the trial still works), and unsupported browser (a plain "update your browser" wall per `docs/platform/compatibility-matrix.md` §1). Accessibility: the tour is keyboard operable and screen-reader readable, targets ≥ 44 px, contrast ≥ 4.5:1, and the tour never traps focus (`PRD-CO-315`, `PRD-CO-317`).

#### Test plan
- `app/test/onboarding/sample_notebook_test.dart` — deterministic local seeding and one-action deletion.
- `app/test/web/try_route_test.dart` — guest routing, tour skip/replay, no-auth-call assertion.
- `app/integration_test/web/try_flow_test.dart` — ink, import a PDF, search, export, then sign in and confirm adoption.
- `app/integration_test/web/no_content_egress_test.dart` — request capture asserts no note content and no third-party host.
- `app/integration_test/editor_latency_test.dart` (web mode) — ≤ 30 ms during the trial.
- Manual: first-visit timing on a cold cache; Safari iPadOS trial run.

#### Dependencies
[SN-WEB-010](compat.md#sn-web-010), [SN-AUTH-007](auth.md#sn-auth-007), [SN-LIB-002](library.md#sn-lib-002); durability from [SN-WEB-009](storage.md#sn-web-009).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Privacy dashboard copy verified against actual trial behaviour
- [ ] Reviewed against docs/security/secure-coding-checklist.md §11

---

