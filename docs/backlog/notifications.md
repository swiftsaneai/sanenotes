# Backlog — area: notifications

23 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-NOTF-001](notifications.md#sn-notf-001) **Deliver notifications, reminders and OS system integration** (epic · M5 Phones & Platform Parity)
  - [SN-NOTF-002](notifications.md#sn-notf-002) **Implement the local notification facade, categories and permission flow** · p1 · feature · L · M3 Audio & Recognition
  - [SN-NOTF-003](notifications.md#sn-notf-003) **Build the reminder scheduler with recurrence, reschedule and OS budget limits** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-NOTF-004](notifications.md#sn-notf-004) **Define the deep-link route table to notebooks, pages and anchors** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-NOTF-005](notifications.md#sn-notf-005) **Build the share-target intake queue and confirm-and-place screen** · p1 · feature · L · M5 Phones & Platform Parity
  - [SN-NOTF-006](notifications.md#sn-notf-006) **Register file handlers, open-with and protocol handlers for Sane formats** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-NOTF-007](notifications.md#sn-notf-007) **Define the quick-action catalogue for App Intents, App Actions and shortcuts** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-NOTF-008](notifications.md#sn-notf-008) **Publish a privacy-safe widget snapshot for recent notebooks and quick capture** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-NOTF-009](notifications.md#sn-notf-009) **Build the active-task controller for recording, transcription and export** · p1 · feature · M · M3 Audio & Recognition
  - [SN-NOTF-010](notifications.md#sn-notf-010) **Deliver shared-notebook activity notifications without leaking content** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-NOTF-011](notifications.md#sn-notf-011) **Harden every system entry point against lock, guest and profile leakage** · p0 · security · M · M5 Phones & Platform Parity
  - [SN-NOTF-012](notifications.md#sn-notf-012) **Add the notifications and system-integration test suite** · p2 · test · M · M5 Phones & Platform Parity
  - [SN-GA11-020](i18n.md#sn-ga11-020) **Localise notifications, widgets, App Intents and quick actions** · p2 · task · M · M5 Phones & Platform Parity

---

## Issues

### SN-AND-024

<a id="sn-and-024"></a>

**Build home-screen widgets and quick-capture entry points**

| Field | Value |
|---|---|
| GitHub | #77 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-STORAGE-2`, `MASVS-PRIVACY-2` |
| Extra labels | agent-ready |

#### Context
Quick capture — jump straight into a new note or a specific action from the home screen — is a phones/platform-parity feature (roadmap M5, PRD-04 widgets/shortcuts area, compat matrix §6 "Quick capture"). Android App Widgets and shortcut entry points let a user start writing in one tap, aligning with the S Pen single-press-to-new-note action ([SN-AND-009](input-gestures.md#sn-and-009)). Widgets must never leak note content on the home/lock screen.

#### Scope
**In:** an App Widget offering New note / New in <recent notebook> / Start recording; deep-linking those into the editor; dynamic shortcuts for the same actions; guarding widget content so no note text/preview appears where it could be seen when locked.
**Out:** App Links / verified deep links from the web ([SN-AND-025](notifications.md#sn-and-025)); the S Pen remote action ([SN-AND-009](input-gestures.md#sn-and-009)); the recording service ([SN-AND-023](audio.md#sn-and-023)).

#### Acceptance criteria
- [ ] A home-screen widget provides at least New note and Start recording; tapping opens the app directly into the correct action (new note in editor / recording started).
- [ ] Dynamic shortcuts (long-press app icon) offer the same quick actions.
- [ ] The widget shows NO note content, thumbnail or preview text that would leak information on the home or lock screen (MASVS-PRIVACY-2); at most a notebook name the user opted to pin.
- [ ] Quick-capture actions respect guest mode and app/notebook locks — a locked target prompts for unlock rather than exposing content.
- [ ] The widget renders correctly in light/dark and does not hard-code colours (tokens via sane_ui where a widget theme applies).

#### Technical notes
Kotlin: AppWidgetProvider / Jetpack Glance widget; ShortcutManager dynamic shortcuts; launch intents routed through the app's internal navigation (go_router, ADR-0003) into the editor. Quick-capture creates a new document via the document model (SN-CORE-002 entities) in app/. No content in widget RemoteViews. docs/platform/android.md §7 (compat matrix §6).

#### Security & privacy
Widgets are visible on unlocked home and sometimes lock screens: never render note content or previews (MASVS-STORAGE-2 no sensitive data in widget, MASVS-PRIVACY-2). Quick-capture into a locked notebook must honour the lock (PRD-LOCK-005). Launch intents are internal; no untrusted-URI handling here (that is [SN-AND-025](notifications.md#sn-and-025)).

#### UX notes
One tap from the home screen and you are writing — the fastest capture path on Android (compat matrix §6). Actions match the S Pen single-press choice so the mental model is consistent. Widget is TalkBack-labelled with clear action names and 48 dp targets.

#### Test plan
app/test/widgets/quick_capture_test.dart (action routing, no-content-in-widget assertion); app/integration_test/home_widget_test.dart on a device (tap -> correct editor state); a security test that a locked notebook target prompts for unlock; golden of the widget in light/dark.

#### Dependencies
SN-FND-002 (app scaffold + navigation + document model access).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-025

<a id="sn-and-025"></a>

**Handle verified App Links that land in view/confirm, never auto-mutate**

| Field | Value |
|---|---|
| GitHub | #78 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | notifications, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `CWE-601`, `OWASP-A01` |
| Extra labels | agent-ready |

#### Context
Deep links (shared notes, open-a-file, OAuth redirects) must be handled safely: only verified App Links, and a link lands in a view/confirm context — never auto-mutating state (CLAUDE.md §7.8, ADR-0012 Security impact). On Android this means autoVerify App Links with a Digital Asset Links file and defensive validation of every incoming intent/URI before acting. This is a classic mobile vuln class (intent redirection, open redirect) and must fail closed.

#### Scope
**In:** autoVerify App Link intent filters + assetlinks.json coordination; parsing and validating incoming URIs (scheme/host/path/params) before acting; routing a valid link to a view/confirm screen; rejecting/ignoring unverified or malformed links; import-a-file links opening into a new isolated notebook.
**Out:** the sharing feature and share-key semantics (SN-SHR-*); OAuth redirect specifics ([SN-AND-017](auth.md#sn-and-017)); the ChromeOS CREATE_NOTE intent ([SN-AND-010](input-gestures.md#sn-and-010)).

#### Acceptance criteria
- [ ] App Links are autoVerify with a Digital Asset Links (assetlinks.json) association; only verified links open the app directly.
- [ ] Every incoming URI is validated (scheme, host allow-list, path, params, size) before any action; a malformed or unexpected link is ignored/rejected, not acted upon (CWE-601, MASVS-PLATFORM-1).
- [ ] A valid link lands in a view/confirm context (e.g. "Open shared note?") and NEVER auto-mutates existing data or auto-imports without confirmation (CLAUDE.md §7.8).
- [ ] A file-open/import link parses the file off the UI isolate, size/MIME-capped, and imports into a new isolated notebook (never overwriting an existing one).
- [ ] A forged deep link cannot mutate state — proven by a negative/abuse test.

#### Technical notes
AndroidManifest intent filters with android:autoVerify="true"; assetlinks.json served from the site (coordinate with SN-SITE-*); URI validation in the deep-link handler before routing via go_router (ADR-0003). Import path canonicalised/confined (CWE-22-adjacent); parse off-isolate (CLAUDE.md §7.8). .sanenote reader from SN-CORE-005. docs/platform/android.md §7, ADR-0012.

#### Security & privacy
Deep-link/intent-redirection hardening (MASVS-PLATFORM-1/3, CWE-601 open redirect, OWASP-A01): verified links only, defensive URI validation, view/confirm landing, no auto-mutation, import into an isolated notebook off the UI isolate. This is an explicit abuse-case surface in the threat model — negative tests are mandatory (CLAUDE.md §10).

#### UX notes
Tapping a shared-note link opens Sane Notes to a clear confirm screen ("Open this shared note?"), never silently changing the user's notebooks (CLAUDE.md §7.8). Verified links skip the disambiguation chooser. Errors on a bad link are quiet and safe.

#### Test plan
app/test/deeplink/app_link_validation_test.dart (URI allow-list, malformed rejection); app/test/security/forged_deeplink_cannot_mutate_test.dart (abuse test); app/integration_test/app_link_open_test.dart on a device (verified link -> confirm screen); a test that a hostile import link fails closed.

#### Dependencies
SN-FND-002 (app scaffold + navigation), SN-CORE-005 (.sanenote reader for import links).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-GAND-001

<a id="sn-gand-001"></a>

**Register as the Android default notes app and handle the notes-role create intent**

| Field | Value |
|---|---|
| GitHub | #561 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | notifications, compat, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-024](notifications.md#sn-and-024), [SN-AND-025](notifications.md#sn-and-025), [SN-PHN-015](security.md#sn-phn-015) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-2`, `CWE-200` |
| Extra labels | — |

#### Context
`docs/platform/android.md` §7 only covers the **ChromeOS** note-taker intent (`org.chromium.arc.intent.action.CREATE_NOTE`, implemented by [SN-AND-010](input-gestures.md#sn-and-010)). Stock Android has a second, AOSP-wide entry point that the doc and the backlog both miss: the **notes role** introduced in Android 14 (`RoleManager.ROLE_NOTES`), which lets one app be the system default note taker. The OS routes a create-note intent (`ACTION_CREATE_NOTE`, with an extra that signals stylus mode) to the role holder from the lock screen, the taskbar/stylus shortcut, and OEM pen gestures — exactly the "pull the pen out, start writing in under a second" moment that Samsung Notes owns on Galaxy hardware (`docs/research/sources/samsung-notes-nebo-other.md` §1, Air command). Without holding the role, Sane Notes can never be the app a Pixel Tablet or a USI Chromebook user reaches by pen; capture entry points stay app-internal ([SN-AND-024](notifications.md#sn-and-024)). Exact symbol names, the availability window and lock-screen behaviour are **(verify)** against the API level we ship — the issue owner confirms them on an API 34+ and an API 36 device before implementing.

#### Scope
**In:** declaring the intent filter and manifest metadata that make Sane Notes eligible for the notes role; a Settings row (and a first-run tip) that requests the role through the platform role-request dialog and reflects the current holder; handling the incoming create-note intent to open a **new Quick Note** straight into the editor with the pen tool armed when the stylus extra is present; honouring the "launched over the lock screen" case by creating the note in a locked-safe container; a capability probe so the whole surface is inert below API 34 and on devices where the role does not exist.
**Out:** the ChromeOS `CREATE_NOTE` filter ([SN-AND-010](input-gestures.md#sn-and-010)); widgets and dynamic shortcuts ([SN-AND-024](notifications.md#sn-and-024)); the S Pen remote button action ([SN-AND-009](input-gestures.md#sn-and-009), [SN-PHN-016](input-gestures.md#sn-phn-016)); App Links ([SN-AND-025](notifications.md#sn-and-025)); the Quick Notes inbox model ([SN-PHN-010](library.md#sn-phn-010)).

#### Acceptance criteria
- [ ] On an Android 14+ device the app appears in the system "Default notes app" picker and can be set as the role holder from Sane Notes Settings; the row shows held/not-held accurately and never nags after one decline.
- [ ] With the role held, the platform create-note entry point opens a new Quick Note in the editor in < 2 s cold (budget from `docs/platform/performance-budgets.md`), with the pen tool active when the stylus-mode extra is set.
- [ ] Launched above the lock screen, the app shows **only** a blank capture surface: no library, no note titles, no thumbnails, no search, and no existing content is reachable until the device is unlocked ([SN-PHN-015](security.md#sn-phn-015)).
- [ ] A note captured from the lock screen lands in the Quick Notes inbox of the **active profile** and is visible after unlock; in guest mode it stays local and syncs nothing.
- [ ] On API < 34, on ChromeOS, and on devices with no role, the Settings row is hidden and no manifest entry causes a crash, a duplicate launcher icon or an exported-component finding.
- [ ] The role-holder activity is not exported beyond what the platform requires and rejects any intent extra that is not on its allow-list ([SN-AND-029](security.md#sn-and-029)).

#### Technical notes
Kotlin in `app/android`: an activity declared with the notes-role intent filter plus `showWhenLocked`/`turnScreenOn` only on the locked-capture variant; request the role with the platform role manager (`ROLE_NOTES`) — never assume grant, always re-query. Route the intent through the existing internal router (go_router, ADR-0003) into the editor with a `NewQuickNote` route, reusing [SN-PHN-010](library.md#sn-phn-010). Feature-detect with a capability call in `sane_stylus`/platform channel rather than an SDK_INT-only branch. Keep the locked path on a separate, minimal navigator so no library provider is constructed. Record the (verify) outcome in `docs/platform/android.md` §7.

#### Security & privacy
The lock-screen surface is the highest-risk entry point in the app: a bug here leaks note content from a locked device (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200). Controls: locked-capture activity constructs no library/search state; `FLAG_SECURE` policy from [SN-SEC-019](security.md#sn-sec-019) still applies; incoming intents are untrusted input and are validated against an allow-list ([SN-AND-029](security.md#sn-and-029), [SN-SEC-011](security.md#sn-sec-011)); the role request is user-initiated only, never auto-requested at first launch; no telemetry event records note existence ([SN-TEL-002](telemetry.md#sn-tel-002)).

#### UX notes
Settings → Handwriting & stylus gets a "Default notes app" row ([SN-SET-007](settings.md#sn-set-007)) with a one-line explanation and a system-dialog trigger; state reads "Sane Notes is your notes app" / "Another app is set". The locked capture screen uses the current look's paper with a visible "Locked — unlock to see your notes" affordance and a single Save action; empty, saving and error states follow `docs/design/screens-and-flows.md` Quick Note.

#### Test plan
`integration_test` + patrol: role granted → create-note intent → editor open with pen armed; role declined → row state; locked launch → assert no library route is constructed and no note titles are in the semantics tree. Unit tests for intent parsing/extra validation. Manual on a Pixel Tablet (USI) and a Galaxy Tab (S Pen) on API 34 and API 36 (`docs/platform/compatibility-matrix.md` §2 Tier 2 pool). New files: `app/android/.../NotesRoleActivity.kt`, `test/platform/notes_role_intent_test.dart`, `integration_test/android_notes_role_test.dart`.

#### Dependencies
[SN-AND-024](notifications.md#sn-and-024), [SN-AND-025](notifications.md#sn-and-025), [SN-PHN-015](security.md#sn-phn-015)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-010

<a id="sn-gipad-010"></a>

**Add a Focus Filter intent that scopes the library to a subject or profile**

| Field | Value |
|---|---|
| GitHub | #984 |
| Type | feature |
| Priority | p3 |
| Milestone | Backlog |
| Platforms | ipad, ios-phone |
| Areas | notifications, library, settings |
| Size | S |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-015](notifications.md#sn-ipad-015), [SN-LIB-026](library.md#sn-lib-026), [SN-STDY-008](study.md#sn-stdy-008) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | innovation |

#### Context
iPadOS **Focus filters** (`SetFocusFilterIntent`, App Intents) let an app change its own content when the user enters a Focus — Mail hides accounts, Safari switches tab groups. For a study app this is an unusually good fit and nobody in the competitor matrix ships it: entering the "Study" Focus could scope the library to one subject or smart collection, mute shared-notebook notifications, and turn on the in-app focus mode that already exists ([SN-ED-018](editor.md#sn-ed-018)). [SN-IPAD-015](notifications.md#sn-ipad-015) covers App Intents for actions, but a Focus filter is a distinct intent type and is not in the backlog. This is a small, high-delight differentiator that reuses machinery we are already building.

#### Scope
**In:** a `SetFocusFilterIntent` implementation exposing user-configurable parameters (subject/smart collection to show, profile to activate, "hide shared-notebook notifications", "start in Focus mode"); persistence of the active filter and application at launch and on Focus change; a clear in-app indicator that a Focus filter is narrowing what is shown, with one tap to see everything; Settings copy explaining the feature.
**Out:** the Focus/Pomodoro timer ([SN-STDY-008](study.md#sn-stdy-008)); notification categories ([SN-NOTF-002](notifications.md#sn-notf-002)); smart collections themselves ([SN-LIB-026](library.md#sn-lib-026)); Android's parallel (Do Not Disturb) behaviour.

#### Acceptance criteria
- [ ] The app appears under Settings → Focus → *(a Focus)* → Focus Filters, and the configured filter is applied within one app foreground cycle of the Focus turning on, and reverted when it turns off.
- [ ] When a filter narrows the library, a persistent, non-modal chip reads "Focus: Chemistry — Show all" and one tap clears the narrowing for the session without editing the Focus.
- [ ] Selecting a profile in a filter requires that profile's lock to be satisfied; a locked profile is never silently entered ([SN-AUTH-014](auth.md#sn-auth-014)).
- [ ] A filter never hides content in a way the user cannot escape, and never deletes, archives or mutates anything — it is a view-scoping mechanism only.
- [ ] With no Focus configured, behaviour is byte-identical to today (regression golden of the library screen).
- [ ] Accessibility: the filter chip is announced by VoiceOver with its state and action, and the whole flow is reachable without gestures ([SN-A11Y-009](a11y.md#sn-a11y-009)).

#### Technical notes
Implement alongside the other App Intents in the iOS app target, sharing the `AppEntity` types from [SN-IPAD-015](notifications.md#sn-ipad-015) so a subject can be picked as a parameter. Store the resolved filter in the per-profile preferences repository ([SN-SET-003](settings.md#sn-set-003)) as ephemeral state, not synced (it is device-local). Handle the app being launched *by* the filter change (no UI yet) by applying state before the first frame.

#### Security & privacy
The system passes filter parameters into the app process: treat them as untrusted, validate that referenced ids exist in the current profile, and ignore anything else (MASVS-PLATFORM-1). Do not expose locked-notebook titles in the Focus configuration UI; only subjects and smart collections the user has marked non-sensitive (MASVS-PRIVACY-1). No analytics on Focus usage.

#### UX notes
Follows docs/design/screens-and-flows.md library chrome: the filter chip sits with the existing filter chips, uses the same tokens, and reads as informative rather than restrictive. Copy avoids implying that hidden notebooks are gone.

#### Test plan
Unit: `app/test/focus_filter_intent_test.dart` (parameter resolution, unknown-id rejection, locked-profile refusal). Widget: library screen with a filter applied, including the chip and clear action. Integration: `integration_test/focus_filter_test.dart` toggling the filter through the intent entry point. Manual: configure a real Focus on a Tier 1 iPad.

#### Dependencies
[SN-IPAD-015](notifications.md#sn-ipad-015), [SN-LIB-026](library.md#sn-lib-026).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-IPAD-014

<a id="sn-ipad-014"></a>

**Make Sane Notes pages Quick-Note-linkable via NSUserActivity**

| Field | Value |
|---|---|
| GitHub | #315 |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | notifications |
| Size | S |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Quick Note is a system feature (swipe up from the bottom-right corner with the Pencil, or Control Center) that can link back to app content. Sane Notes content SHOULD be Quick-Note-linkable via `NSUserActivity` so a Quick Note can deep-link back to a page (docs/platform/ipad.md §7). The exact mechanism is general-knowledge and marked (verify against current API) in the doc, so this issue must confirm the API before shipping.

#### Scope
**In:** advertise a current-page `NSUserActivity` (with a stable identifier and title) while a page is open, so Quick Note can capture a link to it; handle the inbound activity to deep-link back into the exact page (view/confirm, never auto-mutate); verify the current API surface and record findings.
**Out:** Universal Links from the web ([SN-IPAD-020](security.md#sn-ipad-020)); App Intents/Spotlight ([SN-IPAD-015](notifications.md#sn-ipad-015)).

#### Acceptance criteria
- [ ] While a page is open the app advertises an `NSUserActivity` identifying that page; opening the Quick Note link navigates back to that exact page.
- [ ] The inbound activity lands in a view context and never mutates the note on open (docs/security/secure-coding-checklist.md deep-link rule).
- [ ] A page that no longer exists resolves to a safe not-found state, not a crash.
- [ ] Locked notes are not deep-linked into without passing the lock.
- [ ] The verify note in docs/platform/ipad.md §7 is resolved (API confirmed or fallback documented).

#### Technical notes
`NSUserActivity` advertised from the note scene; handle via the app's activity-continuation path (ADR-0003 routing with go_router). Reference docs/platform/ipad.md §7 (Quick Note, verify). Page identity comes from the document model in `sane_core` and the library ([SN-LIB-002](library.md#sn-lib-002)).

#### Security & privacy
An `NSUserActivity` and its title may be indexed by the OS: do not put note body content in the activity, only an opaque page id + user-facing title (MASVS-PRIVACY-1). Inbound links are untrusted — validate the id and land in view/confirm. A locked note requires unlock first.

#### UX notes
Deep-link landing follows docs/design/screens-and-flows.md navigation; no new chrome. Ensure the reopened page announces itself to VoiceOver. Not-found state uses the standard empty/error pattern (both light/dark).

#### Test plan
Unit: `app/test/integration/quick_note_activity_test.dart` (advertises id, resolves inbound, not-found safe, lock respected). Integration: `app/integration_test/quick_note_link_test.dart` via `patrol` on an iPad (manual Quick Note capture).

#### Dependencies
[SN-LIB-002](library.md#sn-lib-002) library home / note identity.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md §7 verify note resolved
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-015

<a id="sn-ipad-015"></a>

**Expose App Intents, Shortcuts, Siri phrases and Spotlight for notes**

| Field | Value |
|---|---|
| GitHub | #316 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | notifications |
| Size | L |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Quick-capture parity with Apple Notes needs App Intents: expose Create note, Append to today's note, Search notes and Start recording, plus the Note type as an `AppEntity` with an `EntityQuery` so Spotlight and Shortcuts can find notes, and `AppShortcut`s with Siri phrases (docs/platform/ipad.md §7). This is core to quick capture and also backs the interactive widgets and ControlWidget.

#### Scope
**In:** `AppIntent`s for Create note / Append to today's note / Search notes / Start recording; a Note `AppEntity` + `EntityQuery`; `AppShortcut`s with Siri phrases; Spotlight discoverability via the entity query. Intents run against the local document model and honour guest mode.
**Out:** the widgets/ControlWidget that invoke these intents ([SN-IPAD-016](notifications.md#sn-ipad-016), [SN-IPAD-017](notifications.md#sn-ipad-017)); Live Activity ([SN-IPAD-018](notifications.md#sn-ipad-018)).

#### Acceptance criteria
- [ ] "Create note", "Append to today's note", "Search notes" and "Start recording" work from Shortcuts and Siri, creating/appending/searching/recording against local storage.
- [ ] Notes surface in Spotlight via the `AppEntity` `EntityQuery`; tapping a result opens that note (view/confirm, no auto-mutation).
- [ ] Intents work with no account (guest mode) and no network; nothing is sent off device.
- [ ] A destructive intent (append) requires a resolved, unambiguous target and never edits a locked note without unlock.
- [ ] Spotlight-indexed content excludes locked-note bodies.

#### Technical notes
Swift App Intents (`AppIntent`, `AppEntity`, `EntityQuery`, `AppShortcut`) in `app/`; bridge to Dart via the app's intent handler (ADR-0003). "Start recording" drives the audio recorder ([SN-AUD-002](audio.md#sn-aud-002)). Note identity/model from `sane_core` ([SN-CORE-002](storage.md#sn-core-002)) and library ([SN-LIB-002](library.md#sn-lib-002)). Reference docs/platform/ipad.md §3/§7.

#### Security & privacy
App Intents are entry points and their parameters are untrusted input — validate/resolve before acting (MASVS-PLATFORM-1). Spotlight indexing MUST NOT expose locked-note content or full bodies (index title/opaque id only) (MASVS-PRIVACY-1). No tokens/content logged; a link lands in view/confirm, never auto-mutates (secure-coding-checklist deep-link rule).

#### UX notes
Siri phrases and Shortcuts tiles follow docs/design/screens-and-flows.md tone; the target-disambiguation and record-started states use standard confirm patterns (both light/dark). Ensure VoiceOver reads intent results; provide non-Siri equivalents (all reachable from the app UI).

#### Test plan
Unit: `app/test/intents/app_intents_test.dart` (each intent against a fake store, guest mode, lock respected, no egress). Integration: `app/integration_test/shortcuts_spotlight_test.dart` via `patrol` (run intents, Spotlight result opens note).

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) document model entities; [SN-LIB-002](library.md#sn-lib-002) library; audio recorder [SN-AUD-002](audio.md#sn-aud-002) for Start recording.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-016

<a id="sn-ipad-016"></a>

**Build WidgetKit home-screen widgets for recent notes and quick capture**

| Field | Value |
|---|---|
| GitHub | #317 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-CORE-004](storage.md#sn-core-004), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2` |
| Extra labels | agent-ready |

#### Context
Home Screen widgets are a quick-capture and recall surface; iPad supports up to `systemExtraLarge`. Sane Notes should ship recent-notes widgets and an interactive quick-capture button backed by an `AppIntent` (docs/platform/ipad.md §7). Widgets read a shared App Group container and MUST never leak private note content.

#### Scope
**In:** `systemSmall`..`systemExtraLarge` WidgetKit widgets showing recent notes (title + thumbnail) and a quick-capture button that runs the Create-note `AppIntent` ([SN-IPAD-015](notifications.md#sn-ipad-015)); a shared App Group data path the widget reads; timeline refresh.
**Out:** ControlWidget ([SN-IPAD-017](notifications.md#sn-ipad-017)); Live Activity ([SN-IPAD-018](notifications.md#sn-ipad-018)); the intents themselves ([SN-IPAD-015](notifications.md#sn-ipad-015)).

#### Acceptance criteria
- [ ] Each widget size renders recent-note titles/thumbnails from the shared container and updates on a reasonable timeline.
- [ ] The interactive quick-capture button creates a new note via the `AppIntent` (iOS 17+ interactive widgets).
- [ ] Locked or hidden notes never appear in a widget (no title, no thumbnail).
- [ ] The widget renders correctly in light + dark and across widget tint modes; no note body text is shown, only titles the user chose.
- [ ] Widget shows a friendly empty state when there are no notes.

#### Technical notes
WidgetKit in Swift (`Widget`, `AppIntentConfiguration`); the app writes a minimal recents manifest (titles, opaque ids, thumbnail refs) to the App Group container from `sane_core` storage ([SN-CORE-004](storage.md#sn-core-004)); the widget reads that, never the encrypted note store directly. Interactive button uses the Create-note intent ([SN-IPAD-015](notifications.md#sn-ipad-015)). Reference docs/platform/ipad.md §7.

#### Security & privacy
The App Group container is at-rest data outside the main app sandbox — store only non-sensitive metadata (title + opaque id + thumbnail), never note bodies, keys or tokens, and apply file protection (MASVS-STORAGE-1). Widgets render on the Home/Lock Screen so MUST exclude locked-note content and any body text (MASVS-PRIVACY-2). No PII in the manifest.

#### UX notes
Widget layouts per design/Sane Notes.dc.html widget specs and docs/design/screens-and-flows.md; support all widget tint/appearance modes and both light/dark (golden per size). Titles use the look's typography tokens; thumbnails have alt semantics; the empty state matches the standard pattern. 44 pt tap target on the capture button.

#### Test plan
Unit: `app/test/widgets/recents_manifest_test.dart` (manifest excludes locked/hidden, only metadata). Golden: `app/test/golden/home_widgets_test.dart` (each size x light/dark/tint). Integration: `app/integration_test/widget_quick_capture_test.dart` via `patrol` (button creates a note).

#### Dependencies
[SN-CORE-004](storage.md#sn-core-004) storage; [SN-LIB-002](library.md#sn-lib-002) library recents; [SN-IPAD-015](notifications.md#sn-ipad-015) Create-note intent.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-017

<a id="sn-ipad-017"></a>

**Add a ControlWidget for Control Center and Lock Screen quick capture**

| Field | Value |
|---|---|
| GitHub | #318 |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | notifications |
| Size | S |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-015](notifications.md#sn-ipad-015) |
| Security controls | `MASVS-PRIVACY-2` |
| Extra labels | agent-ready |

#### Context
iOS 18 lets apps ship `ControlWidget`s for Control Center, the Lock Screen and (where present) the Action Button. Sane Notes should offer "New note" / "New voice note" controls for instant capture (docs/platform/ipad.md §7). These invoke the App Intents from [SN-IPAD-015](notifications.md#sn-ipad-015).

#### Scope
**In:** a `ControlWidget` with "New note" and "New voice note" controls that run the Create-note and Start-recording App Intents; correct behaviour from the Lock Screen (launch/authenticate as needed).
**Out:** Home Screen widgets ([SN-IPAD-016](notifications.md#sn-ipad-016)); the intents ([SN-IPAD-015](notifications.md#sn-ipad-015)); Live Activity ([SN-IPAD-018](notifications.md#sn-ipad-018)).

#### Acceptance criteria
- [ ] "New note" and "New voice note" controls appear in Control Center and are addable to the Lock Screen / Action Button.
- [ ] Tapping a control runs the corresponding App Intent; from the Lock Screen it launches and, for protected content, requires device auth.
- [ ] Controls render correctly in light + dark.
- [ ] No note content or private data is shown on the control face (label + icon only).

#### Technical notes
Swift `ControlWidget` invoking the Create-note / Start-recording intents ([SN-IPAD-015](notifications.md#sn-ipad-015)); "New voice note" drives the audio recorder ([SN-AUD-002](audio.md#sn-aud-002) via that intent). Reference docs/platform/ipad.md §7. Keep the control face static (no data binding).

#### Security & privacy
Controls live on the Lock Screen, so the face MUST show only a label/icon, never note content (MASVS-PRIVACY-2). Starting capture from the Lock Screen respects device authentication for protected content. No tokens/content logged.

#### UX notes
Control label/icon per design/Sane Notes.dc.html iconography and docs/design/screens-and-flows.md; render both light/dark. Provide accessible labels; the same actions are reachable in-app (non-control alternative).

#### Test plan
Unit: `app/test/widgets/control_widget_test.dart` (controls map to intents, static face). Integration: `app/integration_test/control_center_capture_test.dart` via `patrol` (control runs intent).

#### Dependencies
[SN-IPAD-015](notifications.md#sn-ipad-015) App Intents (Create note / Start recording).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-018

<a id="sn-ipad-018"></a>

**Show a Live Activity for in-progress recording, transcription and export**

| Field | Value |
|---|---|
| GitHub | #319 |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | notifications, audio |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002) |
| Security controls | `MASVS-PRIVACY-2` |
| Extra labels | agent-ready |

#### Context
Live Activities (ActivityKit, iPadOS 16.1+) are marked low priority in docs/platform/ipad.md §7 and used only for long-running progress: transcription, export and sync, and most usefully audio recording. A recording Live Activity keeps the user oriented (elapsed time, stop control) while they work in other apps.

#### Scope
**In:** a Live Activity for an active recording (elapsed time + stop control), reused for long transcription/export/sync progress; start/update/end lifecycle tied to the audio recorder and long tasks; Dynamic Island + Lock Screen presentation.
**Out:** the audio recorder itself ([SN-AUD-002](audio.md#sn-aud-002)); ControlWidget ([SN-IPAD-017](notifications.md#sn-ipad-017)).

#### Acceptance criteria
- [ ] Starting a recording starts a Live Activity showing elapsed time and a stop control; stopping recording ends it.
- [ ] Long transcription/export/sync tasks reuse the same Live Activity with a progress indication and end on completion/failure.
- [ ] The activity survives app background and updates while backgrounded (recording continues per docs/roadmap.md M3 exit criteria).
- [ ] The activity face shows no note content (only status, timer, progress).
- [ ] Renders correctly in light + dark and on Dynamic Island where present.

#### Technical notes
Swift ActivityKit; the recorder ([SN-AUD-002](audio.md#sn-aud-002), ADR-0015) drives updates; export/sync tasks push progress. Keep updates off the UI isolate. Reference docs/platform/ipad.md §7 (Live Activities, low priority). Do not block the ink loop.

#### Security & privacy
Live Activities render on the Lock Screen — the face MUST carry only status/timer/progress, never note titles or content (MASVS-PRIVACY-2). No tokens/content logged. Ending on failure must not surface error text containing content.

#### UX notes
Activity + Dynamic Island layouts per design/Sane Notes.dc.html and docs/design/screens-and-flows.md; both light/dark. Accessible labels for timer/stop; a non-Live-Activity path (in-app recording bar) always exists. Respect reduced-motion for progress animation.

#### Test plan
Unit: `app/test/audio/recording_activity_test.dart` (start/update/end lifecycle, no content on face). Integration: `app/integration_test/live_activity_recording_test.dart` via `patrol` (record, background, stop).

#### Dependencies
[SN-AUD-002](audio.md#sn-aud-002) audio recorder service.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-NOTF-001

<a id="sn-notf-001"></a>

**Deliver notifications, reminders and OS system integration**

| Field | Value |
|---|---|
| GitHub | #471 |
| Type | epic |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | notifications |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `CWE-926`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Sane Notes has to be reachable from outside itself: a lock-screen reminder five minutes before a lecture, a home-screen widget holding the last three notebooks, a share sheet that swallows the lecture PDF a friend just sent, a Siri/Assistant phrase that starts a recording, and a tapped share link that lands on the exact page someone referenced. PRD-03 §9 (`PRD-NOTIF-001`…`PRD-NOTIF-004`) owns notification delivery, class reminders, shared-notebook activity and weekly tips, with the three user-facing toggles fixed by `PRD-SET-014` (`reminders`, on), `PRD-SET-015` (`sharedNotif`, on) and `PRD-SET-016` (`tips`, off). PRD-04 §7 (`PRD-CO-270`…`PRD-CO-277`) owns Quick Note, widgets, App Intents / App Actions, share targets, file handlers and deep links. The concrete API surface is in docs/platform/ipad.md §3 and §7 (WidgetKit `Widget`/`ControlWidget`, App Intents `AppIntent`/`AppEntity`/`AppShortcut`, Quick Note via `NSUserActivity`, ActivityKit Live Activities) and docs/platform/android.md §2 and §7 (app widgets, dynamic shortcuts, foreground-service types, ChromeOS `org.chromium.arc.intent.action.CREATE_NOTE`, API-36 predictive back and edge-to-edge).

This epic owns the **shared, cross-platform layer** that all of that plugs into, living in `app/lib/system/` as the composition root prescribes (docs/architecture/overview.md §1, ADR-0003): one notification facade, one reminder scheduler, one deep-link route table, one inbound-intake queue, one widget snapshot contract, one quick-action catalogue and one long-running-task controller. The per-platform shells stay with [SN-IPAD-001](input-gestures.md#sn-ipad-001), [SN-AND-001](compat.md#sn-and-001), [SN-WEB-001](compat.md#sn-web-001) and [SN-PHN-001](compat.md#sn-phn-001); this epic keeps them from each inventing their own semantics. Every entry point here is a trust boundary: CLAUDE.md §7 rule 8 requires verified deep links (App Links / Universal Links) that land in **view or confirm** and never auto-mutate, and `PRD-NOTIF-001` + `PRD-LEAK-004` forbid note content in any notification payload or lock-screen preview.

#### Scope

**In:** the local-notification facade, categories/channels and point-of-use permission flow; the reminder scheduler (class reminders, weekly tips, study due) with recurrence, reschedule and OS pending-limit budgeting; the deep-link/route table that resolves notebook, page and anchor targets from notifications, widgets, shortcuts and share links; the inbound share-target intake queue and its confirm-and-place screen; file handlers / open-with / protocol handlers; the privacy-safe widget snapshot store; the quick-action catalogue that App Intents, Android App Actions/shortcuts and PWA manifest shortcuts all read; the active-task (recording/transcription/export) controller behind Live Activities and foreground-service notifications; the lock/guest/profile hardening of every one of those entry points; and the test suite for all of it.
**Out:** platform-specific widget UI and extension targets ([SN-IPAD-016](notifications.md#sn-ipad-016), [SN-IPAD-017](notifications.md#sn-ipad-017), [SN-AND-024](notifications.md#sn-and-024)); the iOS Live Activity presentation ([SN-IPAD-018](notifications.md#sn-ipad-018)) and the Android foreground service implementation ([SN-AND-023](audio.md#sn-and-023)); App Intents definitions ([SN-IPAD-015](notifications.md#sn-ipad-015)); the Notifications settings tab ([SN-SET-010](settings.md#sn-set-010)) and the class-timetable editor ([SN-SET-011](settings.md#sn-set-011)); the inbound-link allow-list validator ([SN-SEC-011](security.md#sn-sec-011)) and assetlinks/AASA hosting ([SN-SEC-012](security.md#sn-sec-012)); the PDF-specific import path ([SN-PDF-008](pdf.md#sn-pdf-008)); the in-app Quick Note action ([SN-LIB-018](library.md#sn-lib-018)); study-due reminder content ([SN-STDY-010](study.md#sn-stdy-010)); sharing/export and collaboration features themselves ([SN-SHR-001](sharing-export.md#sn-shr-001), [SN-COL-001](collaboration.md#sn-col-001)).

#### Acceptance criteria

- [ ] Every child issue below is closed and CI is green.
- [ ] Notifications are off until the OS permission is granted at first relevant use; the three category toggles gate categories, not the OS grant (`PRD-NOTIF-001`).
- [ ] No notification payload, widget, Live Activity or lock-screen preview ever contains note content; locked profiles and locked notebooks are excluded entirely (`PRD-NOTIF-001`, `PRD-LOCK-006`, `PRD-LEAK-004`).
- [ ] Every inbound link, intent, shared file and shortcut lands in a view/confirm destination and never mutates data without a user gesture (CLAUDE.md §7.8).
- [ ] Quick Note from a widget, shortcut or tile reaches a writable page within the cold-start budget (< 1.5 s iPad, < 2 s mid-Android, < 3 s cached web — `PRD-CO-270`, locked decision 7).
- [ ] Everything in this epic works offline, in guest mode, with no account and with no Sane server (`PRD-CO-000`, `PRD-AUTH-008`); no new network egress is introduced.
- [ ] Reminders survive reboot, timezone change and DST; no reminder is silently dropped by an OS pending-notification cap.

#### Technical notes

All shared code lives under `app/lib/system/` (notifications/, links/, intake/, widgets/, actions/, tasks/) and is exposed through Riverpod providers — no mutable global singletons (CLAUDE.md §6, ADR-0003). Routing uses go_router; native access uses federated plugins or a vetted pub package rather than ad-hoc method channels (ADR-0012). Nothing here may import `app/` from a package, and no `packages/sane_*` library gains a dependency on a notification library. Children:

- [ ] [SN-NOTF-002](notifications.md#sn-notf-002) local-notification facade, categories and permission flow
- [ ] [SN-NOTF-003](notifications.md#sn-notf-003) reminder scheduler with recurrence, reschedule and pending-limit budgeting
- [ ] [SN-NOTF-004](notifications.md#sn-notf-004) deep-link route table to notebook, page and anchor
- [ ] [SN-NOTF-005](notifications.md#sn-notf-005) share-target intake queue and confirm-and-place screen
- [ ] [SN-NOTF-006](notifications.md#sn-notf-006) file handlers, open-with and protocol handlers
- [ ] [SN-NOTF-007](notifications.md#sn-notf-007) quick-action catalogue for App Intents, App Actions and PWA shortcuts
- [ ] [SN-NOTF-008](notifications.md#sn-notf-008) privacy-safe widget snapshot store
- [ ] [SN-NOTF-009](notifications.md#sn-notf-009) active-task controller for recording, transcription and export
- [ ] [SN-NOTF-010](notifications.md#sn-notf-010) shared-notebook activity notifications without content leakage
- [ ] [SN-NOTF-011](notifications.md#sn-notf-011) lock, guest and profile hardening of every system entry point
- [ ] [SN-NOTF-012](notifications.md#sn-notf-012) notifications and system-integration test suite

#### Security & privacy

Four threats dominate. **T1 — disclosure on an OS-owned surface** (STRIDE information disclosure, LINDDUN disclosure): widgets, Live Activities, notification previews and app-switcher snapshots render outside the app, sometimes on a locked device. Controls: content-free payloads, exclusion of locked/guest-private items, file protection on any shared container — MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200. **T2 — hostile inbound content** through share sheet, file handler or intent: validate MIME/size/count before decode, cap resources, parse off the UI isolate, import into a new isolated notebook — MASVS-PLATFORM-2, MASVS-CODE-4, OWASP-A03, CWE-20, CWE-434. **T3 — intent redirection / forged or unverified deep link**: verified App Links and Universal Links only, allow-listed route table, view/confirm landings, share key stays in the URL fragment — MASVS-PLATFORM-1, CWE-926, CWE-601. **T4 — metadata leakage through logs or third-party push**: no notebook titles, paths, tokens or ids in logs (SaneLog redaction, `print()` banned), and no analytics/push SDK is linked (PRD-PRIV-007) — MASVS-PRIVACY-1, MASVS-PRIVACY-4, CWE-532. Baseline everywhere: no note content leaves the device, no new network call without an ADR + threat-model row (CLAUDE.md §7.1/§7.4).

#### UX notes

The user-visible surfaces are the Settings → Notifications section of design/Sane Notes.dc.html (three toggles with the verbatim copy in docs/design/screens-and-flows.md §12), the Library and Editor screens that inbound links and shortcuts land on, and OS-owned chrome that must still feel like Sane Notes (widget typography, tint and Sane Sage mark come from `sane_ui` tokens, docs/design/design-system.md). Anything painted in-app renders in **all 17 looks, light and dark** and is golden-tested. Accessibility per docs/design/accessibility.md: `Semantics` labels on every control, 44 pt / 48 dp targets, contrast ≥ 4.5:1, keyboard-reachable on web, Reduce Motion honoured, and notification/permission copy localised through the ARB pipeline (`PRD-CO-371`) — never hand-formatted.

#### Test plan

Children name their own files. Epic-level gates: `app/test/system/` unit and widget suites, `app/integration_test/system_entry_points_test.dart` (patrol: permission dialogs, share sheet, widget tap, shortcut launch), `app/test/security/deep_link_abuse_test.dart` (forged links cannot mutate state), and golden coverage for any in-app surface across the 17 looks in light and dark.

#### Dependencies

[SN-FND-002](devx.md#sn-fnd-002), [SN-FND-005](devx.md#sn-fnd-005), [SN-CORE-001](storage.md#sn-core-001), [SN-SEC-011](security.md#sn-sec-011).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-002

<a id="sn-notf-002"></a>

**Implement the local notification facade, categories and permission flow**

| Field | Value |
|---|---|
| GitHub | #950 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | notifications, privacy |
| Size | L |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `CWE-200`, `CWE-532`, `OWASP-A01` |
| Extra labels | agent-ready |

#### Context

Every notification Sane Notes will ever send is **local** — there is no Sane Notes server and no push infrastructure (locked decision 3, `PRD-NOTIF-002`, ADR-0004). Class reminders, weekly tips, study-due reminders ([SN-STDY-010](study.md#sn-stdy-010)) and, later, shared-notebook activity ([SN-NOTF-010](notifications.md#sn-notf-010)) therefore all need one place that owns OS permission, category/channel registration, scheduling, cancellation, tap routing and — most importantly — the redaction policy that keeps note content out of payloads (`PRD-NOTIF-001`, `PRD-LEAK-004`). Today three issues already assume this facade exists: [SN-SET-010](settings.md#sn-set-010) (the Notifications tab), [SN-SET-011](settings.md#sn-set-011) (the class-timetable editor) and [SN-STDY-010](study.md#sn-stdy-010) (study reminders) all declare the delivery engine out of scope and point here. Building it once also keeps a notification library out of `packages/sane_*`, preserving the package DAG (CLAUDE.md §3).

The docs are silent on the specific library. Decision recorded here: use the `flutter_local_notifications` + `timezone` pub packages behind a `SaneNotifications` interface in `app/lib/system/notifications/`, rather than a new federated plugin, because no bespoke native behaviour is required (ADR-0012 reserves plugins for capability the ecosystem does not cover). The interface is what the rest of the app codes against, so the dependency can be swapped without touching callers.

#### Scope

**In:** `SaneNotifications` (a Dart interface + implementation + in-memory fake) exposing `requestPermission()`, `permissionStatus()`, `schedule()`, `scheduleRecurring()`, `cancel()`, `cancelCategory()`, `pending()` and a tap `Stream<NotificationTap>`; the category model mapped to the three PRD toggles plus `studyDue` and `activeTask`; Android notification channels (one per category, created at first use, correct importance) and iOS `UNNotificationCategory` registration with actions; the Android 13+ `POST_NOTIFICATIONS` runtime permission and iOS `UNUserNotificationCenter.requestAuthorization` requested **at point of use with a purpose string** (`PRD-PRIV-002`), never at startup; a `NotificationContent` value type that only accepts a title, a short body drawn from a fixed localised string set, a category and an opaque target route; per-profile scoping so notifications for a non-active profile never fire content; graceful degradation when permission is denied or revoked (feature still works, an inline hint appears); web behaviour (Notification API only when the PWA is installed and permitted, else a silent no-op).
**Out:** the scheduler/recurrence logic ([SN-NOTF-003](notifications.md#sn-notf-003)); the settings toggles UI ([SN-SET-010](settings.md#sn-set-010)); the timetable editor ([SN-SET-011](settings.md#sn-set-011)); tap-target routing rules ([SN-NOTF-004](notifications.md#sn-notf-004)); active-task/foreground-service presentation ([SN-NOTF-009](notifications.md#sn-notf-009), [SN-AND-023](audio.md#sn-and-023), [SN-IPAD-018](notifications.md#sn-ipad-018)); shared-notebook activity semantics ([SN-NOTF-010](notifications.md#sn-notf-010)).

#### Acceptance criteria

- [ ] No OS permission dialog appears on first launch; the prompt appears only when a user enables a category or performs an action that needs it, with the localised purpose copy (`PRD-NOTIF-001`, `PRD-PRIV-002`).
- [ ] With permission denied, `schedule()` returns a `Result` failure, the caller shows an inline "Notifications are off — turn them on in system settings" hint with a deep link to OS settings, and nothing crashes or retries in a loop.
- [ ] `NotificationContent` rejects (fails an assert in debug, returns a `Failure` in release) any body that is not one of the registered localised templates — note text, OCR text, comment text and file paths cannot be passed through the API at all.
- [ ] Each category maps to exactly one Android channel with the documented importance (reminders: default with sound; tips: low; studyDue: default; activeTask: low, ongoing) and one iOS category; channel ids are stable across releases.
- [ ] Turning a category toggle off cancels that category's pending notifications within 1 s and prevents new ones; turning it on does not resurrect cancelled one-shots.
- [ ] Scheduling and cancelling 200 notifications completes without blocking the UI isolate (no frame > 16.7 ms in a profile-mode trace) and without a visible jank in the settings screen.
- [ ] Notifications for a profile that is not active, or for a locked profile/notebook, are never delivered with a title — they are suppressed entirely (`PRD-LOCK-006`, `PRD-LEAK-004`).
- [ ] A fake implementation (`FakeSaneNotifications`) lets every dependent feature be unit-tested headlessly with no platform channel.

#### Technical notes

Files: `app/lib/system/notifications/sane_notifications.dart` (interface + `Result<T, Failure>` returns per CLAUDE.md §6), `.../local_notifications_impl.dart`, `.../notification_category.dart`, `.../notification_content.dart`, `.../fake_sane_notifications.dart`, and a Riverpod provider in `app/lib/system/notifications/providers.dart`. Android: channels via `AndroidNotificationChannel`, `POST_NOTIFICATIONS` declared in the manifest and requested at point of use (docs/platform/android.md §9 "Permissions — minimal"); channel importance must not exceed what the category needs. iOS/iPadOS: `UNUserNotificationCenter`, `UNNotificationCategory` with actions, `interruptionLevel: .active`, and no critical alerts; the notification service does **not** need an extension because payloads carry no fetched content (docs/platform/ipad.md §3). Timezone-correct scheduling uses the `timezone` database initialised once at startup. Tap delivery: the OS callback pushes a `NotificationTap(route, categoryId)` onto a broadcast stream that [SN-NOTF-004](notifications.md#sn-notf-004) consumes; the facade itself never navigates. Payload target is an **opaque id**, never a title-derived slug, so a leaked payload reveals nothing (docs/architecture/sync.md metadata-minimisation rule). Logging follows CLAUDE.md §6: category and result only, ids as short hashes. Scheduled in M3: the local notification facade is foundational to the M3 audio active-task controller ([SN-NOTF-009](notifications.md#sn-notf-009)) for recording notifications; its dependencies are M0.

#### Security & privacy

Threats and controls: (1) **Content disclosure on the lock screen** — the type system forbids free-text bodies and the facade suppresses anything belonging to a locked profile/notebook (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200), implementing `PRD-NOTIF-001`, `PRD-LEAK-004`, `PRD-LOCK-006`. (2) **Over-broad permission grab** — permission is requested only at point of use with a purpose string, satisfying MASVS-PRIVACY-1/-3 and `PRD-PRIV-002`; the Privacy dashboard row for notifications reads its state from `permissionStatus()`. (3) **Metadata leakage into logs or crash reports** — no titles, ids, routes or payloads are logged; ids appear only as opaque short hashes (CWE-532, MASVS-PRIVACY-1, `PRD-TEL-002`). (4) **Unauthorised action from a notification action button** — action buttons may only open a view/confirm route; no action may delete, share, upload or mutate (OWASP-A01, CLAUDE.md §7.8). (5) **No new egress** — the facade makes no network call of any kind; a test asserts the module has no HTTP import (MASVS-NETWORK-1 by absence, CLAUDE.md §7.4).

#### UX notes

The only in-app surface is the permission rationale sheet and the denied-state hint, both built from `sane_ui` components and tokens (docs/design/design-system.md) so they render correctly in all 17 looks and in light and dark; the sheet shows the Sane Sage mark via `SaneSageMark`. Copy follows the design voice in docs/design/screens-and-flows.md §16 and sits in the ARB catalogue for localisation (`PRD-CO-371`), including RTL (`PRD-CO-372`). States: **not-determined** (rationale then OS prompt), **granted** (silent), **denied** (inline hint + "Open settings" button, never a nag loop), **provisional/quiet** on iOS if used. Accessibility: 44 pt / 48 dp targets, `Semantics` labels on the sheet buttons, focus order correct, keyboard-operable on web, and the hint announced with `SemanticsService.announce` when it appears (docs/design/accessibility.md).

#### Test plan

Unit: `app/test/system/notifications/notification_content_test.dart` (template-only bodies, locked-profile suppression, opaque routes), `.../sane_notifications_test.dart` (schedule/cancel/pending semantics, denied-permission `Failure`, category cancel). Widget: `app/test/system/notifications/permission_sheet_test.dart` (states, a11y labels, no nag loop). Golden: `app/test/golden/system/permission_sheet/` across the 17 looks in light and dark. Integration (patrol, real dialogs): `app/integration_test/notification_permission_test.dart` on iOS and Android. Security: `app/test/security/notification_payload_test.dart` asserts no note content, path, token or title of a locked item can reach a payload, and `app/test/security/no_network_in_notifications_test.dart` asserts the module imports no networking library.

#### Dependencies

[SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-002](storage.md#sn-core-002).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-003

<a id="sn-notf-003"></a>

**Build the reminder scheduler with recurrence, reschedule and OS budget limits**

| Field | Value |
|---|---|
| GitHub | #951 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | notifications, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-002](notifications.md#sn-notf-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-3`, `CWE-532`, `CWE-400` |
| Extra labels | agent-ready |

#### Context

Three recurring notification kinds exist in the product: class reminders that fire five minutes before a lecture (`PRD-NOTIF-002`, `PRD-SET-014`), a weekly tip capped at one per week and one-tap dismissible (`PRD-NOTIF-004`, `PRD-SET-016`), and study-due reminders from the spaced-repetition scheduler ([SN-STDY-010](study.md#sn-stdy-010), `PRD-CO-201`). They all hit the same hard problems: operating systems cap how many local notifications an app may have pending (iOS keeps only the earliest 64), Android restricts exact alarms and kills them across reboot, timezones and DST shift wall-clock times, and a recurring rule must be re-expanded as time passes. Doing this per-feature would guarantee dropped or duplicated reminders, so the expansion, budgeting and rescheduling live here, once, above the facade ([SN-NOTF-002](notifications.md#sn-notf-002)) and below the features ([SN-SET-011](settings.md#sn-set-011), [SN-STDY-010](study.md#sn-stdy-010)).

The docs specify the user-visible behaviour but not the scheduling strategy; decision recorded here: store recurrence **rules** (not materialised instances) in the profile database, expand a rolling horizon of 14 days at most, and re-expand on app launch, on rule change, on timezone/DST change and — on Android — from a `BOOT_COMPLETED` receiver. Class reminders use the platform's precise-alarm path where it is available without a special-permission prompt, and fall back to the inexact path with an honest UI note rather than asking a student for `SCHEDULE_EXACT_ALARM`.

#### Scope

**In:** a `ReminderScheduler` service in `app/lib/system/notifications/` that owns `ReminderRule` (kind, weekday set or interval, local time, lead-time offset, target route, enabled flag, profile id); horizon expansion into concrete instances; a per-app budget allocator that keeps total pending notifications under the platform cap with a documented priority order (class reminders > study due > tips) and drops the furthest-future instances first; rescheduling triggers (app launch/resume, rule mutation, timezone or DST change via the timezone database, locale change, Android boot); idempotent reconciliation (re-expanding never duplicates or double-fires); "snooze 10 minutes" and "turn off tips" notification actions; a weekly-tip cadence that guarantees at most one per 7 days per profile with a deterministic rotation and no tracking; and a diagnostics view in debug builds listing pending instances.
**Out:** the timetable editing UI and its persistence ([SN-SET-011](settings.md#sn-set-011)); study-set due computation ([SN-STDY-010](study.md#sn-stdy-010)); notification delivery, channels and permission ([SN-NOTF-002](notifications.md#sn-notf-002)); routing of a tap ([SN-NOTF-004](notifications.md#sn-notf-004)); calendar import (maintainer decision, CLAUDE.md §13).

#### Acceptance criteria

- [ ] A weekly rule (e.g. Mon/Wed 09:00, 5-minute lead) produces instances at 08:55 local time on exactly those days for the next 14 days, and re-expansion the next day adds new instances without duplicating existing ones.
- [ ] Changing the device timezone or crossing a DST boundary re-anchors every pending instance to the correct wall-clock time within one app resume; a test with a fixed clock covers both directions.
- [ ] Total pending notifications never exceed the platform cap (64 on iOS); when the budget binds, class reminders are kept, tips are dropped first, and a debug log line records the trim (no ids or titles).
- [ ] After an Android device reboot, pending reminders are restored on next boot completion without opening the app; if the OS denies that, the app re-expands on next launch and no duplicate fires.
- [ ] Tips fire at most once per 7 days per profile, never more than one at a time, and the "Turn off tips" action sets `tips=false` and cancels the category without opening the app (`PRD-NOTIF-004`).
- [ ] Snooze reschedules the same instance +10 minutes exactly once; snoozing twice does not create two instances.
- [ ] Disabling a rule or deleting its target notebook cancels the rule's pending instances; the rule is flagged rather than crashing (`PRD-SET-011` fix-up behaviour).
- [ ] Expansion of 100 rules over the horizon costs < 50 ms on the low-end reference device and runs off the UI isolate if it exceeds that.

#### Technical notes

Files: `app/lib/system/notifications/reminder_scheduler.dart`, `reminder_rule.dart`, `reminder_budget.dart`, plus a `BootReceiver` hook in the Android host and an app-lifecycle observer in `app/lib/app.dart`. Rules persist per profile through the `sane_core` repository interfaces (`PRD-PROF-004` isolation, docs/architecture/document-model.md); they are ordinary LWW-registered objects so a synced profile keeps its reminders across devices (`PRD-SET-019`), with instance materialisation staying strictly device-local. Time handling uses the `timezone` package with the IANA database plus `DateTime` local conversions — never manual offset arithmetic (`PRD-CO-375` bans hand-formatted dates/times). Android exact-alarm policy: prefer `AndroidScheduleMode.inexactAllowWhileIdle` for tips and the allowed precise mode for class reminders; if the OS reports exact alarms unavailable, degrade and surface the honest hint from [SN-SET-010](settings.md#sn-set-010) rather than requesting `SCHEDULE_EXACT_ALARM` (docs/platform/android.md §9 minimal-permissions rule). All scheduling goes through `SaneNotifications` ([SN-NOTF-002](notifications.md#sn-notf-002)) so the redaction policy cannot be bypassed.

#### Security & privacy

A timetable is sensitive personal data (where a student is, when) and must never leave the device: rules stay in the encrypted profile store and are only ever synced as ciphertext by the normal sync path (MASVS-STORAGE-1, MASVS-PRIVACY-1, `PRD-STOR-003`). Instances carry only a category and an opaque route, so a pending-notification dump from a forensic tool reveals no notebook names (CWE-200). Nothing about schedule contents, times or ids is logged; trim/expand logs record counts only (CWE-532, `PRD-TEL-002`). Resource-exhaustion is bounded by design: the horizon and the budget allocator cap both work and pending-object count, preventing a pathological rule set from exhausting OS slots or spinning the scheduler (CWE-400, MASVS-CODE-4). Notification actions are limited to snooze and category-off — neither mutates note data (OWASP-A01). No network call is made or needed (CLAUDE.md §7.4).

#### UX notes

Surfaces: the Settings → Notifications section of design/Sane Notes.dc.html (copy verbatim in docs/design/screens-and-flows.md §12) and the timetable editor from [SN-SET-011](settings.md#sn-set-011) — this issue supplies their behaviour, not their chrome. Where the platform cannot schedule exactly, the editor shows a single honest line ("Your device may deliver this a few minutes late") rather than a permission nag. The debug diagnostics list is a developer-only screen behind the dev flavour (`SANE_FLAVOR=dev`, docs/architecture/overview.md §7) and is excluded from release builds. Any in-app surface added here uses `sane_ui` tokens and is verified in all 17 looks plus dark mode; strings are ARB-localised with ICU plurals for "in N minutes" (`PRD-CO-371`), and times render via `DateFormat` in the user's locale, RTL included.

#### Test plan

Unit (headless, injected fake clock and fake facade): `app/test/system/notifications/reminder_scheduler_test.dart` (expansion, idempotent re-expansion, lead time, disabled rules, deleted-target fix-up), `.../reminder_timezone_test.dart` (timezone change, DST forward/back), `.../reminder_budget_test.dart` (cap enforcement, priority order, trim logging without ids), `.../tip_cadence_test.dart` (one per 7 days, rotation determinism). Integration: `app/integration_test/reminder_reschedule_test.dart` (app resume re-expansion; Android reboot simulated by clearing and restoring pending state). Perf: an expansion benchmark asserted in `app/test/system/notifications/reminder_perf_test.dart`.

#### Dependencies

[SN-NOTF-002](notifications.md#sn-notf-002).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-004

<a id="sn-notf-004"></a>

**Define the deep-link route table to notebooks, pages and anchors**

| Field | Value |
|---|---|
| GitHub | #952 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | notifications, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-SEC-011](security.md#sn-sec-011), [SN-NOTF-002](notifications.md#sn-notf-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PRIVACY-1`, `CWE-926`, `CWE-601`, `CWE-20`, `OWASP-A01` |
| Extra labels | agent-ready |

#### Context

Five different producers need to point at one place in a notebook: a tapped reminder ([SN-NOTF-003](notifications.md#sn-notf-003)), a widget or shortcut ([SN-NOTF-007](notifications.md#sn-notf-007), [SN-NOTF-008](notifications.md#sn-notf-008)), a search result ([SN-SRCH-009](search.md#sn-srch-009)), an @mention or activity notification ([SN-NOTF-010](notifications.md#sn-notf-010), `PRD-CO-111`), and a share link opened from the web (`PRD-CO-276`, `sane.app/n/<slug>-<shortid>#k=…`). Without one route table they will each invent a URL shape and each re-implement validation — exactly the class of bug that produces intent redirection and auto-mutating links. CLAUDE.md §7 rule 8 is categorical: verified deep links only, and a link lands in view or confirm, never auto-mutates. [SN-SEC-011](security.md#sn-sec-011) already provides the `LinkGuard` allow-list validator and [SN-SEC-012](security.md#sn-sec-012) hosts `assetlinks.json`/AASA; this issue defines the **routes themselves** and the resolution semantics that turn a validated link into a screen.

The docs fix the share-link shape but are silent on page- and anchor-level addressing. Decision recorded here: the canonical external form is `https://sane.app/n/<slug>-<shortid>[/p/<pageIndex>][#k=…&a=<objectId>]`, and the internal form is `sanenotes://note/<opaqueId>/page/<pageId>?anchor=<objectId>` which is accepted **only** from in-process producers (notification taps, widgets, intents), never from a browser or another app. Both map to the same go_router routes.

#### Scope

**In:** the typed route model (`NoteTarget`, `PageTarget`, `AnchorTarget`) and its go_router mapping in `app/lib/system/links/`; parsing and canonicalisation of both URL forms through the [SN-SEC-011](security.md#sn-sec-011) `LinkGuard` before any state is touched; resolution rules (notebook missing → "This notebook is not on this device" screen with an import/open-on-web option; page out of range → clamp to the notebook and explain; anchor missing → open the page without highlighting); cold-start vs warm-start handling with a pending-link queue that survives app initialisation, profile selection and lock ([SN-NOTF-011](notifications.md#sn-notf-011)); the guarantee that a link only ever navigates and, where the target implies an action (import, join a room), lands on a confirm screen with an explicit button; scroll-to-and-highlight of an anchor reusing the search highlight mechanism; and a single `LinkRouter` API the producers call instead of `go_router` directly.
**Out:** the allow-list validator itself ([SN-SEC-011](security.md#sn-sec-011)); assetlinks/AASA hosting and autoVerify config ([SN-SEC-012](security.md#sn-sec-012), [SN-AND-025](notifications.md#sn-and-025)); the share-link key wrapping and decryption ([SN-CRY-001](security.md#sn-cry-001), [SN-SHR-001](sharing-export.md#sn-shr-001)); the web reader for non-installed users ([SN-WEB-001](compat.md#sn-web-001)); file open-with ([SN-NOTF-006](notifications.md#sn-notf-006)).

#### Acceptance criteria

- [ ] A valid `https://sane.app/n/<slug>-<shortid>/p/3` opened from Messages on a device with the app installed opens that notebook at page 3 in **view** state, with no edit, import or share side effect (CLAUDE.md §7.8).
- [ ] The fragment (`#k=…`) is parsed on-device only and never appears in any log, analytics, crash report, or outbound request — asserted by a test (`PRD-CO-032`).
- [ ] An `sanenotes://` link injected from another app or a browser is rejected by the router and produces no navigation and no error dialog leaking state (CWE-926).
- [ ] A malformed or over-long link (unknown host, traversal segments, 10 KB of query, wrong scheme, non-numeric page) is rejected with a single user-safe message and no partial navigation; a fuzz corpus of 1,000 mutated links causes no crash and no state change.
- [ ] Cold start from a link reaches the target page within the cold-start budget (< 1.5 s iPad, < 2 s mid-Android, < 3 s cached web) or shows a skeleton, never a blank screen.
- [ ] A link that arrives while the app or profile is locked is queued, the lock screen is shown, and the target opens only after successful unlock; cancelling the unlock discards the queued link ([SN-NOTF-011](notifications.md#sn-notf-011), `PRD-LOCK-006`).
- [ ] A link to a notebook that does not exist locally shows the explain-and-offer screen instead of creating anything.
- [ ] Anchor targets scroll the page so the object is visible and highlighted for ~1.5 s, matching the search-result highlight ([SN-SRCH-009](search.md#sn-srch-009)); Reduce Motion replaces the scroll animation with a jump.

#### Technical notes

Files: `app/lib/system/links/link_router.dart`, `route_targets.dart`, `pending_link_queue.dart`, plus route definitions registered in the app's go_router configuration (ADR-0003). Parsing order is strict: raw string → `LinkGuard.validate()` ([SN-SEC-011](security.md#sn-sec-011)) → typed target → resolution against `sane_core` repositories → navigation. Ids in links are the opaque document ids from docs/architecture/document-model.md (never titles or file paths), matching the metadata-minimisation rule in docs/architecture/sync.md. Platform intake points are owned elsewhere but all funnel here: iOS Universal Links via `NSUserActivity` continuation and `UIApplicationDelegate` (docs/platform/ipad.md §3/§7), Android verified App Links intent filters ([SN-AND-025](notifications.md#sn-and-025), docs/platform/android.md §2), web via the browser URL and the PWA `protocol_handlers` ([SN-NOTF-006](notifications.md#sn-notf-006), `PRD-CO-413`). Queue state is in-memory only; it is cleared on profile switch so a link for profile A never opens under profile B (`PRD-PROF-004`). The router returns `Result<Unit, LinkFailure>` and never throws across boundaries (CLAUDE.md §6).

#### Security & privacy

Primary threats: **intent redirection and deep-link forgery** — mitigated by verified App Links/Universal Links only, an allow-list route table, rejection of the internal scheme from external sources, and view/confirm landings (MASVS-PLATFORM-1, MASVS-PLATFORM-2, CWE-926, CWE-601, OWASP-A01); **untrusted input** — every component is type-, length- and range-validated before use, with resource caps on the parsed string (CWE-20, MASVS-CODE-4); **key leakage** — the share key lives in the fragment, is never logged, never sent to a server, and is zeroed after use (`PRD-CO-032`, MASVS-CRYPTO-2 via [SN-CRY-001](security.md#sn-cry-001), CWE-532); **cross-profile disclosure** — the queue is profile-scoped and cleared on switch (MASVS-PRIVACY-1, `PRD-PROF-004`); **lock bypass** — a queued link cannot render content before the biometric gate succeeds (`PRD-LOCK-006`, MASVS-AUTH-1 via [SN-NOTF-011](notifications.md#sn-notf-011)). This issue adds a threat-model row for the inbound-link boundary in docs/security/threat-model.md.

#### UX notes

Landing surfaces are the Editor and Library screens of design/Sane Notes.dc.html; the three failure states get dedicated, calm copy in the design voice (docs/design/screens-and-flows.md §16): **not on this device** ("This notebook isn't on this device yet." + "Open on the web" / "Import"), **page missing** ("That page has moved — showing the notebook instead."), **locked** (the standard lock screen, then the target). Loading shows the notebook skeleton, never a spinner on blank. Highlight styling reuses the search highlight token so the two features look identical. All screens render in the 17 looks and dark mode and are golden-tested; copy is ARB-localised (`PRD-CO-371`) and mirrors correctly in RTL (`PRD-CO-372`); the highlight has a non-colour cue (outline) for `PRD-CO-311`, focus moves to the target object for screen readers with a `SemanticsService.announce` of "Page 3 of 12".

#### Test plan

Unit: `app/test/system/links/link_router_test.dart` (both URL forms, canonicalisation, clamping, unknown notebook, profile scoping), `.../pending_link_queue_test.dart` (cold start, lock, profile switch, cancel). Security: `app/test/security/deep_link_abuse_test.dart` (external `sanenotes://` rejected; traversal, over-long, wrong-host, wrong-scheme links rejected; no mutation; fragment never logged) and a mutation corpus in `app/test/security/fixtures/links/`. Integration: `app/integration_test/deep_link_cold_start_test.dart` (patrol; cold start from a Universal Link/App Link on both platforms within the budget) and `app/integration_test/deep_link_locked_test.dart`. Golden: failure-state screens across the 17 looks, light and dark.

#### Dependencies

[SN-SEC-011](security.md#sn-sec-011), [SN-NOTF-002](notifications.md#sn-notf-002).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-005

<a id="sn-notf-005"></a>

**Build the share-target intake queue and confirm-and-place screen**

| Field | Value |
|---|---|
| GitHub | #953 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | notifications, sharing-export |
| Size | L |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-004](notifications.md#sn-notf-004), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-CODE-4`, `MASVS-STORAGE-1`, `OWASP-A03`, `OWASP-A08`, `CWE-20`, `CWE-434`, `CWE-400`, `CWE-22` |
| Extra labels | agent-ready |

#### Context

`PRD-CO-274` requires Sane Notes to register as a share target on every platform — iOS/iPadOS Share Extension, Android `ACTION_SEND`/`ACTION_SEND_MULTIPLE` plus Direct Share, and the Web Share Target API (POST) declared in the PWA manifest — and to route everything received into the import pipeline (`PRD-CO-070`: imports create new notebooks or append pages and never overwrite). [SN-PDF-008](pdf.md#sn-pdf-008) already ships the PDF-specific path for M2; this issue generalises it into one intake queue that also accepts images, plain text, URLs and `.sanenote` bundles, and gives all of them the same confirm-and-place step. That step is not a nicety: everything arriving here is untrusted input from another app, so CLAUDE.md §7.8 demands type/MIME/size/schema validation before use, resource caps before decode, parsing off the UI isolate, path confinement and import into a new isolated notebook.

The docs do not specify the hand-off mechanism between an OS extension process and the app. Decision recorded here: platform extensions write bytes into a shared staging area (iOS App Group `Inbox/` directory, Android content-URI read through the app process, web service-worker cache entry) and enqueue an **intake item descriptor**; the app drains that queue on next foreground. Nothing is imported until the user confirms a destination.

#### Scope

**In:** the `IntakeQueue` and `IntakeItem` model (source, declared MIME, sniffed type, byte size, original filename, staging handle, received timestamp) in `app/lib/system/intake/`; draining on foreground with a badge on the Library screen when items wait; the confirm-and-place screen (preview, detected type, destination chooser: new notebook / existing notebook / Quick Notes inbox / cancel, plus a per-item Discard); validation before decode (allow-list of MIME types, magic-byte sniff that must agree with the declared type, per-file size cap 200 MB, per-batch cap 20 items, filename sanitisation and path confinement); handing accepted bytes to the existing import paths ([SN-PDF-002](pdf.md#sn-pdf-002) for PDF, [SN-MED-001](images-media.md#sn-med-001) for images, [SN-TXT-001](text.md#sn-txt-001) for text, [SN-SHR-001](sharing-export.md#sn-shr-001) for `.sanenote`, [SN-NOTF-004](notifications.md#sn-notf-004) for URLs that are Sane links); staging-area lifecycle (encrypted at rest where the platform allows, wiped on import, discard or 24 h expiry); Android Direct Share targets (recent notebooks as sharing shortcuts); and guest-mode and offline support.
**Out:** the PDF import/render pipeline and its free-plan meter ([SN-PDF-008](pdf.md#sn-pdf-008), [SN-PDF-002](pdf.md#sn-pdf-002)); competitor-format importers ([SN-SHR-001](sharing-export.md#sn-shr-001)); the iOS Share Extension target and Android intent-filter manifest entries themselves ([SN-IPAD-001](input-gestures.md#sn-ipad-001), [SN-AND-001](compat.md#sn-and-001), [SN-PHN-001](compat.md#sn-phn-001)); the web service-worker plumbing ([SN-WEB-011](compat.md#sn-web-011)); file open-with / file handlers ([SN-NOTF-006](notifications.md#sn-notf-006)).

#### Acceptance criteria

- [ ] Sharing a PDF from Safari/Chrome/Files into Sane Notes produces an annotatable notebook after one confirm tap (`PRD-CO-274`); sharing 5 images at once produces one batch with 5 previews.
- [ ] Nothing is imported without an explicit confirm; cancelling wipes the staged bytes and leaves no notebook, no page and no blob (`PRD-CO-070`).
- [ ] A file whose magic bytes disagree with its declared MIME, or that exceeds 200 MB, or a batch over 20 items, is rejected with a user-safe message and is never decoded (CWE-434, CWE-20).
- [ ] A crafted archive/zip bomb, a malformed PDF and a 0-byte file each fail **closed** (no crash, no partial notebook, no unbounded memory); memory stays under 300 MB on the 4 GB Android reference device (locked decision 7).
- [ ] All parsing and hashing happen off the UI isolate; the confirm screen stays at 60 fps while a 200 MB item is staged (no frame > 16.7 ms).
- [ ] Filenames are sanitised: traversal (`../`), absolute paths, NUL bytes, reserved names and 500-character names cannot escape the staging directory or the blob store (CWE-22).
- [ ] Staged items are wiped on import, on discard and after 24 hours; an OS file-system dump after import contains no leftover plaintext copy (`PRD-STOR-003`).
- [ ] Intake works with no account and no network (guest mode, `PRD-AUTH-008`); Direct Share shows recent notebooks without revealing any locked notebook (`PRD-LOCK-006`).
- [ ] Empty state, error state and offline state are all designed, localised and golden-tested in the 17 looks plus dark mode.

#### Technical notes

Files: `app/lib/system/intake/intake_queue.dart`, `intake_item.dart`, `intake_validator.dart`, `confirm_and_place_screen.dart`. Validation reuses the shared input-validation helpers from the secure-coding checklist (docs/security/secure-coding-checklist.md §1) and runs in `Isolate.run` (docs/architecture/overview.md §6 — the UI isolate does input and paint only). Staging path resolution canonicalises and asserts containment within the app's private directory before any write. Platform notes: iOS Share Extension shares an App Group container and must respect `FileProtectionType.completeUntilFirstUserAuthentication` on staged files (docs/platform/ipad.md §8); Android reads the incoming `content://` URI through `ContentResolver` with `takePersistableUriPermission` only where needed, prefers `ACTION_OPEN_DOCUMENT` semantics over copying blindly (docs/platform/android.md §5), and registers Direct Share via sharing shortcuts; web receives a multipart POST handled by the service worker ([SN-WEB-011](compat.md#sn-web-011)) which stores the payload and navigates to `/intake` (`PRD-CO-413`). Accepted bytes enter the content-addressed blob store through `sane_core` repositories — no feature package writes blobs directly (CLAUDE.md §3).

#### Security & privacy

This is the app's widest untrusted-input boundary. Threats and controls: **malicious file / parser exploitation** — allow-listed MIME, magic-byte agreement, size and count caps *before* decode, decode off the UI isolate, import into a **new isolated notebook**, fuzz corpus in CI (MASVS-PLATFORM-2, MASVS-CODE-4, OWASP-A03, CWE-434, CWE-20). **Decompression/zip bomb and resource exhaustion** — bounded expansion ratio and absolute output cap, streaming reads, cancellation (CWE-400, OWASP-A08). **Path traversal via filename or archive entry** — canonicalise and confine every path derived from file content (CWE-22). **Data remanence** — staged plaintext is protected at rest and wiped deterministically (MASVS-STORAGE-1, `PRD-STOR-003`). **Silent mutation via a hostile intent** — nothing imports without a user confirm gesture; the intent carries no authority (OWASP-A01, CLAUDE.md §7.8). **Metadata leakage** — filenames, MIME types and sizes are never logged; only counts and outcomes (CWE-532, MASVS-PRIVACY-1). No network call is made during intake (CLAUDE.md §7.4).

#### UX notes

The confirm-and-place screen is a new surface built from existing design/Sane Notes.dc.html patterns: the Import PDF overlay (screens-and-flows.md §9) supplies the layout and destination-chooser language, the Library screen supplies notebook rows and covers. Copy follows §16: "Add to Sane Notes" with the item count, destination rows (New notebook · Choose a notebook · Quick Notes), and a plain error line ("We couldn't read that file — it may be damaged."). States: **empty** (queue drained — dismiss), **loading** (staged preview skeleton), **error** (per-item, with the rest still importable), **offline** (fully supported — nothing here needs the network, so no offline banner). Renders in all 17 looks, light and dark, golden-tested; 44 pt / 48 dp targets; `Semantics` labels on every destination row; keyboard operable on web; batch counts use ICU plurals from the ARB catalogue (`PRD-CO-371`), and the layout mirrors in RTL.

#### Test plan

Unit: `app/test/system/intake/intake_validator_test.dart` (MIME/magic mismatch, size and count caps, filename sanitisation, traversal), `.../intake_queue_test.dart` (drain, expiry, wipe, profile scoping). Widget: `app/test/system/intake/confirm_and_place_screen_test.dart` (destinations, per-item error, cancel wipes). Security/fuzz: `app/test/security/intake_fuzz_test.dart` with a corpus under `app/test/security/fixtures/intake/` (zip bomb, truncated PDF, mislabelled image, 0-byte, 500-char name, traversal name) asserting fail-closed and no notebook created. Integration: `app/integration_test/share_target_intake_test.dart` (patrol; share a PDF and 5 images from the OS share sheet on iOS and Android) and a web test driving the Share Target POST. Perf: memory and frame-time assertions on the low-end Android device via `tools/perf_harness`.

#### Dependencies

[SN-NOTF-004](notifications.md#sn-notf-004), [SN-LIB-002](library.md#sn-lib-002).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-006

<a id="sn-notf-006"></a>

**Register file handlers, open-with and protocol handlers for Sane formats**

| Field | Value |
|---|---|
| GitHub | #954 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | notifications, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-005](notifications.md#sn-notf-005), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-CODE-4`, `CWE-20`, `CWE-434`, `CWE-926` |
| Extra labels | agent-ready |

#### Context

`PRD-CO-275` requires file handlers for `.sanenote`, `.pdf` and imported competitor formats on every platform: iOS `LSItemContentTypes`/UTIs, Android `intent-filter` on mime and extension, and the Web File Handling API (`file_handlers` in the manifest), so that double-clicking a `.sanenote` opens it in Sane Notes natively or in the installed PWA. `PRD-CO-413` adds `protocol_handlers` to the same manifest. This is the other half of "the app is reachable from the OS": [SN-NOTF-005](notifications.md#sn-notf-005) handles content **pushed** to the app through a share sheet, while this issue handles content the user **opens** from Files, Finder, a downloads folder or a link. The open format is the point — `PRD-CO-003` and `PRD-STOR-004` promise an open, round-trippable `.sanenote` bundle, and a format nobody can double-click is not really open.

Because an opened file is just as untrusted as a shared one, both paths converge on the same validated intake so there is exactly one place where a hostile bundle can be rejected (CLAUDE.md §7.8, docs/security/secure-coding-checklist.md §1).

#### Scope

**In:** declaring and documenting the `.sanenote` type on every platform — an exported UTI (`app.sane.sanenote`, conforming to `public.data`) with `CFBundleDocumentTypes`/`UTExportedTypeDeclarations` on Apple, an `intent-filter` for `ACTION_VIEW` with the mime type and a scheme/host/pathPattern fallback for extension matching on Android, and `file_handlers` in the web manifest with a `launchQueue.setConsumer` handler; registering `.pdf` as a supported open-with type alongside [SN-PDF-008](pdf.md#sn-pdf-008); `protocol_handlers` for `web+sanenote` on the PWA; the ChromeOS default note-taker registration (`org.chromium.arc.intent.action.CREATE_NOTE`) routed to Quick Note; routing every opened file through the [SN-NOTF-005](notifications.md#sn-notf-005) validator and confirm-and-place step; a "file type not supported" path that names the type and offers the import list rather than failing silently; and the documentation rows in docs/architecture/file-format.md and the store listings.
**Out:** the `.sanenote` reader/writer itself ([SN-CORE-005](storage.md#sn-core-005)); competitor-format parsing ([SN-SHR-001](sharing-export.md#sn-shr-001)); the share-sheet path ([SN-NOTF-005](notifications.md#sn-notf-005)); assetlinks/AASA and https App Links ([SN-SEC-012](security.md#sn-sec-012), [SN-AND-025](notifications.md#sn-and-025)); the web manifest's other fields ([SN-WEB-010](compat.md#sn-web-010)).

#### Acceptance criteria

- [ ] Double-clicking or "Open with" a `.sanenote` opens Sane Notes on iPadOS/iOS (Files), Android (any file manager) and the installed PWA on Chromium, landing on the confirm-and-place screen (`PRD-CO-275`).
- [ ] The same works for `.pdf` without hijacking the system default: Sane Notes appears as an option, never as a forced default.
- [ ] A `web+sanenote:` link opens the installed PWA and resolves through the route table ([SN-NOTF-004](notifications.md#sn-notf-004)); an unregistered browser degrades to the web reader with no error.
- [ ] A file whose extension says `.sanenote` but whose content is not a valid bundle is rejected with "We couldn't open that file" and creates nothing (fail closed, `PRD-STOR-004` manifest validation).
- [ ] Opening a file never overwrites an existing notebook; it always creates a new one or appends after explicit confirmation (`PRD-CO-070`).
- [ ] Opening a 500 MB `.sanenote` streams rather than loading whole-file into memory; memory stays < 300 MB on the low-end Android reference device.
- [ ] On ChromeOS, "Create note" from the system note-taker entry opens a blank Quick Note page within the cold-start budget.
- [ ] Declarations are asserted in CI: a test reads the Info.plist, AndroidManifest and web manifest and fails if a registered type is missing or if a type is registered that the app cannot actually open.

#### Technical notes

Apple: `UTExportedTypeDeclarations` (identifier `app.sane.sanenote`, conforms to `public.data`, filename extension `sanenote`, MIME `application/vnd.sane.note`) plus `CFBundleDocumentTypes` with `LSHandlerRank: Owner` for `.sanenote` and `Alternate` for PDF; `LSSupportsOpeningDocumentsInPlace` stays **false** so the app copies into its own sandbox instead of mutating a user file in place (docs/platform/ipad.md §3, §9). Android: `intent-filter` with `android:mimeType="application/vnd.sane.note"` plus the documented `pathPattern` workaround for extension matching, `android:exported` scoped exactly (docs/platform/android.md §2, §9); use the Storage Access Framework rather than requesting broad storage permission. Web: `file_handlers` with the accept map and `launchQueue.setConsumer` in the PWA bootstrap; `protocol_handlers` for `web+sanenote` (`PRD-CO-413`, ADR-0010). Every entry point calls `IntakeQueue.enqueueOpenedFile()` from [SN-NOTF-005](notifications.md#sn-notf-005); nothing parses inline. Mime/extension registrations are documented alongside the format spec in docs/architecture/file-format.md.

#### Security & privacy

Threats: **hostile bundle or PDF** opened from anywhere in the file system — controls are the shared validator (schema, size, magic bytes, resource caps), off-UI-isolate parsing and import into a new isolated notebook (MASVS-PLATFORM-2, MASVS-CODE-4, OWASP-A03, CWE-434, CWE-20); **over-broad component export** on Android — the intent filter is the minimum needed and `exported` is scoped, preventing a third-party app from driving the handler with arbitrary URIs (MASVS-PLATFORM-1, CWE-926); **in-place mutation of a user's file** — disabled on Apple so an import cannot corrupt the original (data-integrity, CWE-494 class); **protocol-handler abuse** — `web+sanenote:` payloads go through the same allow-list router as every other link, landing in view/confirm ([SN-NOTF-004](notifications.md#sn-notf-004), CWE-601); **privacy** — no filename, path or content is logged, and opening a file triggers no network call (MASVS-PRIVACY-1, CWE-532, CLAUDE.md §7.4). A threat-model row for the file-open boundary is added to docs/security/threat-model.md.

#### UX notes

Opened files reuse the confirm-and-place screen from [SN-NOTF-005](notifications.md#sn-notf-005), so there is no new visual surface beyond the unsupported-type message and the ChromeOS blank-note landing (the Editor screen of design/Sane Notes.dc.html with the last-used paper, matching Quick Note, [SN-LIB-018](library.md#sn-lib-018)). Copy stays in the design voice (screens-and-flows.md §16): "Sane Notes can't open .xyz files yet — here's what it can open," listing the supported list rather than a bare error. States: loading (streaming progress for large bundles, cancellable), error (named, actionable), offline (fully supported). All rendered surfaces pass the 17-look and dark-mode golden suite, meet 44 pt / 48 dp targets, expose `Semantics` labels, work by keyboard on web, and are ARB-localised including RTL (`PRD-CO-371`/`PRD-CO-372`).

#### Test plan

Unit: `app/test/system/intake/opened_file_router_test.dart` (type mapping, unsupported type, extension/content mismatch). Config: `app/test/platform/file_handler_declarations_test.dart` reads `ios/Runner/Info.plist`, `android/app/src/main/AndroidManifest.xml` and `web/manifest.json` and asserts declarations match the supported-type registry. Security: extend `app/test/security/intake_fuzz_test.dart` with `.sanenote` corpus entries (bad manifest, oversized member, traversal member). Integration: `app/integration_test/open_with_sanenote_test.dart` (patrol on iOS and Android) plus a Chromium test that launches through `file_handlers` and `protocol_handlers`. Manual: ChromeOS note-taker registration checklist in docs/platform/android.md §7.

#### Dependencies

[SN-NOTF-005](notifications.md#sn-notf-005), [SN-CORE-005](storage.md#sn-core-005).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-007

<a id="sn-notf-007"></a>

**Define the quick-action catalogue for App Intents, App Actions and shortcuts**

| Field | Value |
|---|---|
| GitHub | #955 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | notifications, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-004](notifications.md#sn-notf-004), [SN-LIB-018](library.md#sn-lib-018) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-AUTH-1`, `MASVS-PRIVACY-1`, `OWASP-A01`, `CWE-926`, `CWE-863` |
| Extra labels | agent-ready |

#### Context

`PRD-CO-273` requires App Intents with Siri phrases on Apple ("New note in <notebook>", "Start recording", "Ask my notes…") and App Shortcuts / App Actions on Android, covering new note, resume last notebook, import PDF, start audio recording, search and ask-my-notes. The same action list also drives home-screen widget buttons ([SN-NOTF-008](notifications.md#sn-notf-008), [SN-IPAD-016](notifications.md#sn-ipad-016), [SN-AND-024](notifications.md#sn-and-024)), the iOS ControlWidget and Android Quick Settings tile ([SN-IPAD-017](notifications.md#sn-ipad-017), `PRD-CO-272`), long-press app shortcuts, and the PWA manifest `shortcuts` array (`PRD-CO-413`). Four platform teams implementing six actions each, independently, would produce six different behaviours for "New note" — so the action **semantics** belong in one shared catalogue and the platform issues only bind their OS surface to it.

Actions are also an authorisation surface: an intent invoked from Siri, an assistant or a locked device must respect guest mode, per-profile isolation, plan entitlements (`PRD-BILL-005` gates Ask-my-notes on Free) and lock state (`PRD-CO-277`). Concentrating that logic here is what makes it testable.

#### Scope

**In:** a `QuickAction` catalogue in `app/lib/system/actions/` with stable ids — `quickNote`, `resumeLast`, `newInNotebook`, `startRecording`, `scanPage`, `importPdf`, `search`, `askMyNotes` — each carrying a localised title and subtitle, an icon token, a target route ([SN-NOTF-004](notifications.md#sn-notf-004)), a parameter schema (e.g. `newInNotebook` takes an opaque notebook id), an availability predicate (platform, guest/signed-in, entitlement, lock state) and an analytics-free invocation path; a single `QuickActionInvoker` that validates parameters, checks availability and either performs the action or routes to the right explain/upgrade/unlock screen; publication of dynamic Android shortcuts for the top recent notebooks and refresh rules; the manifest `shortcuts` entries for the PWA; and the catalogue's localisation entries (Siri phrases and shortcut labels must be translated, `PRD-CO-370`/`PRD-CO-371`).
**Out:** the Apple `AppIntent`/`AppEntity`/`AppShortcut` definitions and Siri donation ([SN-IPAD-015](notifications.md#sn-ipad-015)); Android widget and tile UI ([SN-AND-024](notifications.md#sn-and-024)); the ControlWidget ([SN-IPAD-017](notifications.md#sn-ipad-017)); widget content data ([SN-NOTF-008](notifications.md#sn-notf-008)); the actions' underlying features (Quick Note [SN-LIB-018](library.md#sn-lib-018), recorder [SN-AUD-002](audio.md#sn-aud-002), PDF import [SN-PDF-008](pdf.md#sn-pdf-008), search [SN-SRCH-001](search.md#sn-srch-001), Sage [SN-AI-001](ai.md#sn-ai-001)).

#### Acceptance criteria

- [ ] Each of the eight actions resolves to exactly one route and one observable outcome, identical whether it was invoked from Siri, an Android shortcut, a widget button, a Quick Settings tile or a PWA manifest shortcut.
- [ ] `quickNote` lands on a writable page with the last-used paper and pen within the cold-start budget (< 1.5 s iPad, < 2 s mid-Android, < 3 s cached web — `PRD-CO-270`).
- [ ] `askMyNotes` on a Free plan routes to the Upgrade overlay (or the labelled PRO PREVIEW teaser), never to a dead end or a silent failure (`PRD-BILL-005`, `PRD-CO-004`).
- [ ] Every action works in guest mode and offline, except those that are inherently account-bound, which show the single inline "Sign in to …" affordance (`PRD-AUTH-009`).
- [ ] An action carrying an unknown, malformed or foreign-profile notebook id is refused before anything opens; it does not fall back to opening some other notebook (CWE-863).
- [ ] With the device locked or the profile/notebook locked, an invoked action prompts to unlock and reveals no title or content beforehand (`PRD-CO-277`, `PRD-LOCK-006`).
- [ ] Dynamic Android shortcuts list at most 4 recent notebooks, exclude locked ones, refresh within 2 s of a notebook being opened or renamed, and are cleared on profile switch and sign-out.
- [ ] Titles, subtitles and Siri phrases come from the ARB catalogue; a pseudo-locale build shows no hard-coded English and no truncation (`PRD-CO-376`).

#### Technical notes

Files: `app/lib/system/actions/quick_action.dart` (immutable value type, `freezed`-style), `quick_action_catalogue.dart`, `quick_action_invoker.dart`, `dynamic_shortcuts.dart`. Availability predicates read Riverpod providers for auth state ([SN-AUTH-002](auth.md#sn-auth-002)), entitlements ([SN-BILL-001](billing.md#sn-bill-001)) and lock state ([SN-NOTF-011](notifications.md#sn-notf-011)); the invoker returns `Result<Unit, ActionFailure>` (CLAUDE.md §6). Parameters are opaque document ids validated against the active profile's repository before use — never titles or indexes (docs/architecture/document-model.md). Platform bindings: Apple App Intents call into the catalogue through a method channel exposed by the app host, with the `AppEntity`/`EntityQuery` for notebooks built from the same widget snapshot as [SN-NOTF-008](notifications.md#sn-notf-008) (docs/platform/ipad.md §7); Android uses `ShortcutManagerCompat` for dynamic shortcuts and `shortcuts.xml` for static ones, plus the ChromeOS `CREATE_NOTE` entry from [SN-NOTF-006](notifications.md#sn-notf-006) (docs/platform/android.md §7); web uses the manifest `shortcuts` array ([SN-WEB-010](compat.md#sn-web-010), ADR-0010). No action may be marked "runs without opening the app" unless it is `quickNote` or `startRecording`, both of which still require foreground for capture.

#### Security & privacy

Threats: **unauthorised invocation** — an action reaching the app from an OS surface carries no authority of its own; the invoker re-checks auth, entitlement, profile and lock state server-side-of-the-boundary, i.e. in the app, before acting (MASVS-AUTH-1, OWASP-A01, CWE-863). **Parameter tampering / id guessing** — ids are opaque and validated against the active profile, so a forged shortcut cannot open another profile's notebook (`PRD-PROF-004`, MASVS-PLATFORM-1, CWE-926). **Disclosure through shortcut labels** — dynamic shortcut labels contain user-authored notebook titles, which the OS may render on a locked device; locked notebooks are excluded entirely and a "Hide notebook names in shortcuts and widgets" preference (default off) is honoured (`PRD-CO-277`, MASVS-PRIVACY-2, `PRD-LEAK-004`). **Tracking** — no usage counter, no analytics event and no network call is attached to an invocation; telemetry stays opt-in and aggregate (`PRD-TEL-001`, MASVS-PRIVACY-4). **Logging** — action id and outcome only, never parameters (CWE-532).

#### UX notes

Every action maps to an existing screen of design/Sane Notes.dc.html: Editor (quickNote, resumeLast, newInNotebook, startRecording via the audio recorder bar §7.6), Library + Import PDF overlay (importPdf, §9), Search screen (search, askMyNotes §11) and the Upgrade overlay for the Free gate (§13). Icons come from the `sane_ui` icon set and inherit the active look's tokens; OS-rendered labels use the monochrome glyph variants so they read correctly on any wallpaper, in light and dark. Copy is short, verb-first, and localised — Siri phrases must sound natural per locale, not be machine-translated in place. Accessibility: shortcut labels double as the accessible names, so they must be meaningful standalone; in-app targets meet 44 pt / 48 dp; the Free-gate route announces the reason rather than silently swapping destination (docs/design/accessibility.md).

#### Test plan

Unit: `app/test/system/actions/quick_action_catalogue_test.dart` (ids stable, every action has route + localisation key + availability predicate), `.../quick_action_invoker_test.dart` (guest, Free-gate, locked, unknown id, foreign-profile id, offline). Widget: `app/test/system/actions/dynamic_shortcuts_test.dart` (max 4, locked excluded, refresh, cleared on profile switch). Integration: `app/integration_test/quick_action_launch_test.dart` (patrol; long-press app shortcut and widget button on Android, App Shortcut on iOS, manifest shortcut on Chromium) asserting cold-start budget. i18n: the pseudo-locale CI job ([SN-I18N-001](i18n.md#sn-i18n-001)) must pass with the catalogue strings included.

#### Dependencies

[SN-NOTF-004](notifications.md#sn-notf-004), [SN-LIB-018](library.md#sn-lib-018).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-008

<a id="sn-notf-008"></a>

**Publish a privacy-safe widget snapshot for recent notebooks and quick capture**

| Field | Value |
|---|---|
| GitHub | #956 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | notifications, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-007](notifications.md#sn-notf-007), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `CWE-200`, `CWE-312`, `CWE-359` |
| Extra labels | agent-ready, innovation |

#### Context

`PRD-CO-271` and `PRD-CO-272` require home-screen widgets on both platforms showing recent notebooks plus a Quick Note button, and `PRD-CO-277` adds the constraint that makes them hard: widgets must respect guest mode and lock state and must never reveal note content on a locked device. A widget process cannot read the app's encrypted SQLite database — it runs outside the app, often while the device is locked, and WidgetKit in particular renders from a pre-computed timeline. So the app must **publish** a deliberately minimal snapshot that the widget extension reads. Getting that snapshot wrong is a real data-leak: it is a plaintext file outside the encrypted store, rendered on a lock screen. [SN-IPAD-016](notifications.md#sn-ipad-016), [SN-IPAD-017](notifications.md#sn-ipad-017) and [SN-AND-024](notifications.md#sn-and-024) build the widget UIs; this issue defines and writes what they are allowed to see.

The decision recorded here, since the docs specify the requirement but not the mechanism: publish a small, versioned JSON snapshot (≤ 16 KB) into the platform's shared container — the iOS App Group with `FileProtectionType.completeUntilFirstUserAuthentication`, and Android app-private DataStore read by the in-process Glance widget — containing **metadata only**: opaque notebook id, title, subject colour token, cover glyph id, last-opened timestamp and page count. No ink, no thumbnails of page content, no OCR text, no audio, no PDF text.

#### Scope

**In:** the `WidgetSnapshot` schema (versioned, forward-compatible) and `WidgetSnapshotPublisher` in `app/lib/system/widgets/`; the publish triggers and throttle (on notebook open/close, rename, delete, favourite change, profile switch, sign-out; coalesced to at most one write per 5 s and one per app background); exclusion rules (locked notebooks and locked profiles never appear; a guest profile publishes only its own items; nothing is published while the app has never been unlocked); the "Hide notebook names in widgets" preference (default off) that replaces titles with "Notebook" while keeping the deep link; atomic temp-write + rename publishing so a widget never reads a torn file; clearing the snapshot on sign-out, profile deletion, app-lock enable and data wipe; the deep-link targets for each row (`sanenotes://note/<opaqueId>` via [SN-NOTF-004](notifications.md#sn-notf-004)) and the Quick Note action id ([SN-NOTF-007](notifications.md#sn-notf-007)); and a documented contract file that the platform widget issues implement against.
**Out:** the WidgetKit and Glance widget UIs and timelines ([SN-IPAD-016](notifications.md#sn-ipad-016), [SN-AND-024](notifications.md#sn-and-024)); the ControlWidget and Quick Settings tile ([SN-IPAD-017](notifications.md#sn-ipad-017)); Live Activities ([SN-NOTF-009](notifications.md#sn-notf-009), [SN-IPAD-018](notifications.md#sn-ipad-018)); the PWA (no home-screen widget API — manifest shortcuts are [SN-NOTF-007](notifications.md#sn-notf-007)).

#### Acceptance criteria

- [ ] The snapshot contains only the documented metadata fields; a test asserts the serialised payload cannot contain stroke data, thumbnails, OCR text, transcripts, file paths or tokens.
- [ ] Locked notebooks and locked profiles never appear in the snapshot, and the file is truncated to empty when app lock is enabled or the user signs out (`PRD-LOCK-006`, `PRD-CO-277`).
- [ ] On a locked device the widget shows generic rows (or nothing) per the preference; with "Hide notebook names" on, no user-authored string is present in the file at all.
- [ ] Publishing is atomic: killing the app mid-write leaves either the old or the new snapshot, never a partial one; the widget never renders a parse error.
- [ ] Writes are coalesced to ≤ 1 per 5 s under rapid navigation and never happen on the UI isolate; a profile-mode trace during heavy library scrolling shows no frame > 16.7 ms attributable to publishing.
- [ ] Snapshot size stays ≤ 16 KB with 12 notebooks; the cap is enforced by truncating the list, not by dropping fields.
- [ ] Tapping a widget row opens that notebook through the route table, landing in view, and tapping Quick Note lands on a writable page within the cold-start budget.
- [ ] On iOS the snapshot file carries `completeUntilFirstUserAuthentication` protection; a test/manual check confirms it is unreadable before first unlock (MASVS-STORAGE-1).
- [ ] Profile switch replaces the snapshot wholesale — no row from the previous profile survives (`PRD-PROF-004`).

#### Technical notes

Files: `app/lib/system/widgets/widget_snapshot.dart`, `widget_snapshot_publisher.dart`, `widget_snapshot_contract.md` (the schema doc the native widgets implement against). Data comes from the library repository in `sane_core` (`recentNotebooks(limit: 12)`); the publisher lives in `app/` and runs on the storage isolate hop, never on the UI isolate (docs/architecture/overview.md §6). Apple: write into the App Group container (`group.app.sane.notes`), set the protection class via `sane_secure_store`'s `setFileProtectionComplete`-style API (docs/platform/ipad.md §6), then call `WidgetCenter.reloadTimelines` through the app host; the same snapshot backs the App Intents `EntityQuery` in [SN-IPAD-015](notifications.md#sn-ipad-015). Android: write app-private DataStore/proto and call `updateAppWidgetState` + `GlanceAppWidget.update` (docs/platform/android.md §2, §7); no world-readable file and no `MODE_WORLD_READABLE` ever. The schema is versioned (`v` field) so an older widget extension paired with a newer app degrades to fewer fields instead of crashing. Ids are the opaque document ids used everywhere else, so a leaked snapshot discloses no titles when the hide preference is on.

#### Security & privacy

This is a deliberate, documented exception to "all note data is encrypted at rest", so it is bounded tightly. Threats and controls: **lock-screen disclosure** — metadata-only payload, locked items excluded, hide-names preference, generic fallback rows (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-359, `PRD-CO-277`, `PRD-LEAK-004`). **Plaintext at rest outside the encrypted store** — minimal fields, size cap, `completeUntilFirstUserAuthentication` on Apple, app-private storage on Android, wiped on sign-out/lock/wipe (MASVS-STORAGE-1, CWE-312, `PRD-STOR-003`). **Cross-profile leakage** — snapshot is replaced atomically on profile switch (`PRD-PROF-004`, MASVS-PRIVACY-1). **Another app reading the file** — App Group is app-owned; Android storage is app-private with no exported provider (MASVS-PLATFORM-1, CWE-200). **Tap hijacking** — widget taps carry only an opaque id through the validated route table and land in view, never mutating (OWASP-A01, CLAUDE.md §7.8). A stored-asset row for the snapshot is added to docs/security/threat-model.md and docs/security/controls-matrix.md, as CLAUDE.md §5 requires for a new stored asset.

#### UX notes

Widget rows mirror the Library screen notebook rows of design/Sane Notes.dc.html: subject colour dot, title, "Opened 2 h ago", and a Sane Sage-marked Quick Note button. Because the OS renders them, the widget uses the **light and dark system-tinted variants** of the tokens rather than the full 17-look theming (a widget cannot follow an in-app look switch reliably); this is documented as a deliberate departure in the contract file and the in-app widget-preview shows the same. Empty state (no notebooks yet, or hidden by lock): "Tap to start a note" with the Sage mark — never a blank grey box. Accessibility: each row exposes an accessible label combining title and last-opened time, the Quick Note button is a 48 dp target with its own label, contrast ≥ 4.5:1 against both wallpapers and system backgrounds, and Dynamic Type / font scaling is honoured up to the OS widget limit (docs/design/accessibility.md, `PRD-CO-333`).

#### Test plan

Unit: `app/test/system/widgets/widget_snapshot_test.dart` (schema, size cap, version tolerance, hide-names, locked exclusion, profile replacement) and `.../widget_snapshot_publisher_test.dart` (throttle/coalesce, atomic write via a fake file system, clear-on-signout). Security: `app/test/security/widget_snapshot_leak_test.dart` asserts no content-bearing field can be serialised and that the file is empty after enabling app lock. Integration: `app/integration_test/widget_snapshot_publish_test.dart` (patrol; open notebooks, background the app, assert the container file contents and that a widget tap deep-links correctly). Manual per release: lock the device and photograph the widget on both platforms for the accessibility/privacy review checklist.

#### Dependencies

[SN-NOTF-007](notifications.md#sn-notf-007), [SN-LIB-002](library.md#sn-lib-002).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-009

<a id="sn-notf-009"></a>

**Build the active-task controller for recording, transcription and export**

| Field | Value |
|---|---|
| GitHub | #957 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | notifications, audio |
| Size | M |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-002](notifications.md#sn-notf-002), [SN-AUD-002](audio.md#sn-aud-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `CWE-200`, `CWE-532`, `CWE-400` |
| Extra labels | agent-ready |

#### Context

Three long-running jobs need to stay visible and alive while the user leaves the app: audio recording (which must survive backgrounding and interruption — roadmap M3 exit criterion, `PRD-LB-212`), on-device transcription, and large exports (`PRD-CO-017`: streaming, progress, cancellable). Android requires a **foreground service with the correct service type and a persistent notification** for microphone and long data-sync work (docs/platform/android.md §9); Apple offers ActivityKit Live Activities for the same job, explicitly scoped in docs/platform/ipad.md §7 to "long transcription/export/sync progress" and marked low priority. [SN-AND-023](audio.md#sn-and-023) builds the Android service and [SN-IPAD-018](notifications.md#sn-ipad-018) builds the Live Activity — but both need one shared source of truth for what a task is, what it displays and who may stop it, or the two platforms will drift apart in behaviour and in what they leak.

This controller is also the only thing standing between a recording indicator and a privacy incident: an "ongoing" notification is visible on the lock screen, so its text must be content-free (`PRD-NOTIF-001`, `PRD-LEAK-004`), and its update rate must not wake the app on the ink hot path (CLAUDE.md §8).

#### Scope

**In:** an `ActiveTask` model (kind: `recording` | `transcribing` | `exporting` | `syncing`; opaque target id; started-at; progress 0..1 or indeterminate; cancellable/stoppable flags) and an `ActiveTaskController` in `app/lib/system/tasks/` that owns at most one visible task per kind; the lifecycle API (`start`, `update`, `finish`, `fail`, `cancel`) with rate limiting to ≤ 1 update per second and no update at all from the draw loop; the content-free presentation strings ("Recording · 12:34", "Transcribing · 40%", "Exporting · 3 of 12 pages"); the action set (Stop recording / Cancel export) and how an action re-enters the app; the platform bridge interface that [SN-AND-023](audio.md#sn-and-023) (foreground service, `microphone` and `dataSync` types) and [SN-IPAD-018](notifications.md#sn-ipad-018) (ActivityKit) implement; recovery after process death (a task that was running is reconciled on next launch and either resumed or finalised, never left dangling); and battery-conscious behaviour (updates stop when the screen is off except for elapsed-time ticks the OS renders itself).
**Out:** the audio recorder and its buffers ([SN-AUD-002](audio.md#sn-aud-002)); the transcription pipeline ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)); export rendering ([SN-SHR-001](sharing-export.md#sn-shr-001)); the sync engine ([SN-SYNC-001](sync.md#sn-sync-001)); the platform presentations themselves ([SN-AND-023](audio.md#sn-and-023), [SN-IPAD-018](notifications.md#sn-ipad-018)); web (no equivalent API — tasks show in-app only, ADR-0010).

#### Acceptance criteria

- [ ] Starting a recording shows an ongoing, content-free notification/Live Activity within 500 ms containing the kind and elapsed time only — no notebook title, no page, no transcript (`PRD-NOTIF-001`).
- [ ] A recording survives backgrounding, a phone call interruption and a 30-minute screen-off period; the roadmap M3 criterion "a recording survives app background/interruption" is demonstrated in an integration test.
- [ ] Stopping from the notification stops the task and saves what exists — never a silent truncation without saving (`PRD-BILL-003` behaviour at the Free 30-minute cap is honoured by the recorder, and this controller reflects the stop).
- [ ] Updates are rate-limited to ≤ 1/s; a profile-mode trace during simultaneous inking and recording shows no frame > 16.7 ms attributable to task updates (CLAUDE.md §8).
- [ ] At most one visible task per kind; starting a second export replaces the progress of the first rather than stacking notifications.
- [ ] After a process kill mid-task, the next launch reconciles: a recording is finalised into a saved clip with a "Recording recovered" toast, an export is marked failed and its partial file removed (no partial file left behind, `PRD-CO-017`).
- [ ] Cancel removes the notification within 500 ms and leaves no orphaned service, wake lock or file.
- [ ] With a locked profile or locked notebook as the target, the presentation shows the generic kind only and tapping it requires unlock before revealing anything (`PRD-LOCK-006`).
- [ ] On web the controller degrades to an in-app progress surface with no platform call and no error.

#### Technical notes

Files: `app/lib/system/tasks/active_task.dart`, `active_task_controller.dart`, `task_presenter.dart` (the platform bridge interface + a no-op web implementation). Presentation goes out through `SaneNotifications` ([SN-NOTF-002](notifications.md#sn-notf-002)) using the `activeTask` category (low importance, ongoing, no sound) so redaction rules cannot be bypassed; Android additionally binds the notification to the foreground service in [SN-AND-023](audio.md#sn-and-023) with the `microphone` type for recording and `dataSync` for export/sync, with the justification recorded for Play review (docs/platform/android.md §9). Apple's ActivityKit path is optional and gated by availability (`ActivityAuthorizationInfo`), falling back to a plain ongoing notification. Task state lives in memory plus a tiny durable marker in the profile store so process-death reconciliation is possible; the marker holds kind, opaque target id and started-at only. Progress arrives from the owning feature over a Riverpod stream, already throttled at source; the controller drops updates below the 1 s threshold rather than queueing them (back-pressure, not buffering).

#### Security & privacy

Threats and controls: **lock-screen disclosure of what the user is recording** — the presentation is content-free by construction and locked targets degrade to the generic kind (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200, CWE-359 class, `PRD-LEAK-004`). **Unexpected background microphone use** — the microphone runs only while a visible, user-started recording task exists; ending the task releases the microphone and the service, and the OS indicator plus our own notification make it impossible to record invisibly (MASVS-PRIVACY-1, `PRD-PRIV-002` point-of-use consent). **Resource exhaustion / battery drain** — one task per kind, ≤ 1 Hz updates, wake locks released deterministically, screen-off suppression (CWE-400, MASVS-CODE-4, locked decision 7 battery budget). **Data remanence from a killed task** — partial export files are removed on reconciliation, recorded audio is finalised into the encrypted blob store (MASVS-STORAGE-1, `PRD-STOR-003`). **Logging** — kind, duration bucket and outcome only; never the target id in clear, never a transcript (CWE-532). No network call is made by the controller (CLAUDE.md §7.4).

#### UX notes

In-app, the active task is reflected in the audio recorder bar states of design/Sane Notes.dc.html §7.6 (recording, paused, saving) and in a slim progress row on the Library screen for exports — the controller supplies state, the existing surfaces render it, so tokens and 17-look/dark-mode behaviour are already covered by those issues and re-verified by golden tests here. Outside the app, the notification/Live Activity uses the monochrome Sage glyph and a plain "Recording · 12:34" line with a Stop button. Reduce Motion suppresses the recording pulse animation (`PRD-CO-317`); the elapsed time is announced as an accessible label rather than an animated element; the Stop control is a 48 dp target with an explicit label ("Stop recording"), reachable by keyboard on web and by switch control on mobile (docs/design/accessibility.md, `PRD-CO-332`). Strings are ARB-localised with ICU formatting for durations (`PRD-CO-371`, `PRD-CO-375`).

#### Test plan

Unit: `app/test/system/tasks/active_task_controller_test.dart` (single task per kind, rate limiting, cancel cleanup, locked-target degradation, web no-op) and `.../task_recovery_test.dart` (process-death reconciliation for each kind). Widget: recorder-bar binding test in `app/test/system/tasks/task_presenter_test.dart`. Integration: `app/integration_test/recording_background_test.dart` (patrol; background, interrupt, screen-off, stop from the notification, verify the clip saved) on Android and iOS. Perf: a combined ink + recording run in `tools/perf_harness` asserting the frame budget on the mid-range Android and ProMotion iPad reference devices. Security: `app/test/security/active_task_payload_test.dart` (no content in presentation strings; locked target generic).

#### Dependencies

[SN-NOTF-002](notifications.md#sn-notf-002), [SN-AUD-002](audio.md#sn-aud-002).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-010

<a id="sn-notf-010"></a>

**Deliver shared-notebook activity notifications without leaking content**

| Field | Value |
|---|---|
| GitHub | #958 |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | notifications, collaboration, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-002](notifications.md#sn-notf-002), [SN-NOTF-004](notifications.md#sn-notf-004), [SN-COL-001](collaboration.md#sn-col-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `MASVS-NETWORK-1`, `MASVS-PLATFORM-3`, `CWE-200`, `CWE-359`, `OWASP-A01` |
| Extra labels | agent-ready, needs-decision |

#### Context

The Settings → Notifications toggle `sharedNotif` ("Shared notebook activity — When someone writes in a notebook you share", `PRD-SET-015`) exists in the design and ships inert until collaboration lands (`PRD-NOTIF-003`). `PRD-CO-111` requires @mentions to notify the mentioned member with an in-app inbox and optional push, deep-linked to the exact comment, and `PRD-CO-114` sets the hard constraint: notifications **must not transmit comment text through any push service in plaintext** — pushes carry only a wake signal and content is fetched end-to-end encrypted on-device. `PRD-CO-115` adds seen/unseen badging for pages changed by others. Sane Notes has no server of record and no first-party push infrastructure (locked decision 3, ADR-0004, ADR-0013), which makes the delivery mechanism a genuine product decision rather than a coding detail.

**needs-decision** (maintainer, CLAUDE.md §13 relay hosting; PRD-04 §12 Q3): whether the optional ciphertext relay also carries content-free wake signals through APNs/FCM, or whether v1 delivers activity notifications only from sync/collab events the app itself observes while running or during a background refresh. This issue implements the **no-push default** — local notifications synthesised on-device from decrypted ops — and leaves a clean seam for a wake-only push transport if the maintainer approves one.

#### Scope

**In:** an `ActivityNotifier` in `app/lib/system/notifications/` that observes decrypted collaboration/sync events ([SN-COL-001](collaboration.md#sn-col-001), [SN-SYNC-001](sync.md#sn-sync-001)), coalesces them per notebook into content-free local notifications ("New activity in Physics — 3 changes", "You were mentioned in Physics"), and routes taps to the page or comment anchor via [SN-NOTF-004](notifications.md#sn-notf-004); the `sharedNotif` gate and a per-notebook mute; a coalescing window (no more than one notification per notebook per 15 minutes, with a running count) so a co-editing session does not produce a notification storm; the in-app activity inbox entry point and the seen/unseen badge hook for `PRD-CO-115`; suppression rules (own edits never notify; locked notebooks and non-active profiles never notify; guest mode has nothing to notify about); background-refresh behaviour where the platform allows it (iOS BGAppRefresh, Android periodic WorkManager) with battery-conscious limits; and the documented seam (`ActivityWakeTransport`) that a future wake-only push could implement.
**Out:** the collaboration transport, presence and comments themselves ([SN-COL-001](collaboration.md#sn-col-001), ADR-0013); the relay service ([SN-COL-001](collaboration.md#sn-col-001)); key rotation on revocation ([SN-CRY-001](security.md#sn-cry-001)); the settings toggle UI ([SN-SET-010](settings.md#sn-set-010)); the notification facade ([SN-NOTF-002](notifications.md#sn-notf-002)); any push-service integration until the maintainer decision lands.

#### Acceptance criteria

- [ ] No notification payload contains comment text, page content, author-authored note text or an OCR transcript — only a notebook title the user already has locally, a change count and an opaque route (`PRD-CO-114`, `PRD-NOTIF-001`).
- [ ] A network capture during an active collaboration session shows no plaintext note or comment content leaving the device, and no request to any third-party push or analytics service (`PRD-CO-000`, `PRD-PRIV-007`).
- [ ] With `sharedNotif` off, no activity notification is ever scheduled; the in-app inbox still updates.
- [ ] Own edits never notify; a notebook muted per-notebook stops notifying while others continue.
- [ ] 50 remote ops arriving in 2 minutes produce at most one notification per notebook, showing an aggregated count.
- [ ] A mention notification deep-links to the exact comment anchor and highlights it; if the comment was deleted meanwhile, the page opens with a "That comment was removed" line instead of an error (`PRD-CO-111`).
- [ ] Notifications for a locked notebook or a non-active profile are suppressed entirely, not merely redacted (`PRD-LOCK-006`).
- [ ] The feature is inert and the toggle shows the "Available with shared notebooks" hint until collaboration is enabled, exactly as [SN-SET-010](settings.md#sn-set-010) specifies (`PRD-NOTIF-003`).
- [ ] Background refresh, where used, runs at most a few times per hour and never holds a wake lock longer than the configured budget.

#### Technical notes

Files: `app/lib/system/notifications/activity_notifier.dart`, `activity_coalescer.dart`, `activity_wake_transport.dart` (interface + no-op default). Events arrive already decrypted from the collaboration/sync layer — this module never touches ciphertext, keys or the relay directly, preserving the boundary in docs/architecture/sync.md and ADR-0013. Notification content is built from the local notebook title (already on this device) plus counts; the remote author's display name is included only if membership metadata is local, never fetched for the purpose. All scheduling goes through `SaneNotifications` ([SN-NOTF-002](notifications.md#sn-notf-002)); routes go through [SN-NOTF-004](notifications.md#sn-notf-004) with an anchor target. Background refresh uses the platform scheduler (iOS `BGAppRefreshTask`, Android `WorkManager` periodic ≥ 15 min, docs/platform/android.md §9) and does a bounded sync poll only when `autoSync` is on (`PRD-SET-001`). If the maintainer later approves a wake-only push, it implements `ActivityWakeTransport` and still carries no content — the notification is synthesised locally after the client fetches and decrypts.

#### Security & privacy

Threats and controls: **content exposure via a push intermediary** — no push service is used by default, and the seam is specified as wake-only so no intermediary can ever see content (MASVS-PRIVACY-1, MASVS-NETWORK-1, `PRD-CO-114`). **Lock-screen disclosure of who is writing what** — payloads carry counts and a local title, locked items are suppressed, and collaborator names are omitted when the device is locked (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200, CWE-359). **Social-graph leakage** — mentions resolve against notebook membership only, with no directory lookup, matching `PRD-CO-111`; no aggregate is sent anywhere (LINDDUN linkability, MASVS-PRIVACY-4). **Notification-driven action abuse** — activity notifications open a read surface; they can never accept an invite, change a role or join a room, which require explicit in-app gestures (OWASP-A01, `PRD-CO-171` spirit). **Battery/resource abuse as a side channel** — bounded refresh cadence (CWE-400). A threat-model row for the activity-notification path is added to docs/security/threat-model.md, and the controls matrix is updated (CLAUDE.md §5 DoD).

#### UX notes

Design anchors: Settings → Notifications (`sharedNotif` row, docs/design/screens-and-flows.md §12) and the Share overlay People list (§10) which establishes the collaborator vocabulary; the comments panel and activity badges come from [SN-COL-001](collaboration.md#sn-col-001). Notification copy is deliberately dull and honest: "New activity in Physics" / "You were mentioned in Physics", never a preview of what was written. In-app, unseen changes badge the page rail and the notebook row using the design's accent token with a non-colour cue (a dot plus count) for `PRD-CO-311`. States: **empty** (no shared notebooks — the toggle shows its hint), **error** (sync unavailable — silent, no notification), **offline** (nothing to notify; the inbox shows the last known state). Everything in-app renders in the 17 looks and dark mode with golden coverage; strings are ARB-localised with ICU plurals for change counts (`PRD-CO-371`) and mirror in RTL.

#### Test plan

Unit: `app/test/system/notifications/activity_notifier_test.dart` (own-edit suppression, mute, toggle off, locked notebook, non-active profile) and `.../activity_coalescer_test.dart` (window, aggregation counts, storm of 50 ops). Security: `app/test/security/activity_payload_test.dart` (no comment or note text can enter a payload; no push transport wired by default) and `app/test/security/no_push_sdk_test.dart` (dependency assertion that no APNs/FCM/analytics SDK is linked). Integration: `app/integration_test/shared_activity_notification_test.dart` (two clients; a remote edit and a mention produce one coalesced notification each, tapping lands on the anchor) plus a network-capture check in the M7 verification pass. Golden: badge and inbox surfaces across the 17 looks, light and dark.

#### Dependencies

[SN-NOTF-002](notifications.md#sn-notf-002), [SN-NOTF-004](notifications.md#sn-notf-004), [SN-COL-001](collaboration.md#sn-col-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-011

<a id="sn-notf-011"></a>

**Harden every system entry point against lock, guest and profile leakage**

| Field | Value |
|---|---|
| GitHub | #959 |
| Type | security |
| Priority | p0 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | notifications, security, privacy |
| Size | M |
| SDLC | verification |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-004](notifications.md#sn-notf-004), [SN-NOTF-008](notifications.md#sn-notf-008), [SN-SEC-019](security.md#sn-sec-019) |
| Security controls | `MASVS-AUTH-1`, `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-2`, `MASVS-STORAGE-1`, `CWE-926`, `CWE-863`, `CWE-200`, `OWASP-A01` |
| Extra labels | agent-ready |

#### Context

`PRD-CO-277` is a single sentence with a large blast radius: "Widgets/shortcuts MUST respect guest mode and lock state: they never reveal note content on a locked device beyond what the OS permits, and Quick Note into a locked/biometric-gated profile prompts to unlock." Combined with `PRD-LOCK-006` (locked notebooks excluded from search, recents, previews and the app-switcher snapshot) and `PRD-LEAK-004` (no protected content in notification payloads or lock-screen previews), that becomes a cross-cutting invariant across six entry points built by six issues: notifications ([SN-NOTF-002](notifications.md#sn-notf-002)), reminders ([SN-NOTF-003](notifications.md#sn-notf-003)), deep links ([SN-NOTF-004](notifications.md#sn-notf-004)), intake ([SN-NOTF-005](notifications.md#sn-notf-005)), shortcuts ([SN-NOTF-007](notifications.md#sn-notf-007)) and widgets ([SN-NOTF-008](notifications.md#sn-notf-008)). Each of those enforces its own slice; this issue owns the **shared gate, the invariant and its adversarial tests**, because the failure mode — a stranger picking up a locked iPad and reading a notebook name, or tapping a shortcut into an unlocked note — is a real security incident, not a polish item.

It is p0 because it is the control that makes the lock features honest: [SN-SEC-019](security.md#sn-sec-019) (screenshot/preview suppression) and the app/profile/notebook lock work ([SN-AUTH-001](auth.md#sn-auth-001), `PRD-LOCK-001`…`PRD-LOCK-006`) are worthless if an OS surface routes around them.

#### Scope

**In:** an `EntryPointGate` in `app/lib/system/` that every external entry point must pass through, resolving the current protection state (device locked, app locked, profile locked, target notebook locked, guest vs signed-in, active profile id) and returning one of `allow`, `requireUnlock`, `suppress`; the pending-intent queue semantics on `requireUnlock` (hold, show the lock screen, replay after success, discard on cancel or timeout) shared with [SN-NOTF-004](notifications.md#sn-notf-004); the suppression rules table (what is hidden vs redacted vs absent) documented in docs/security/secure-coding-checklist.md; a "Hide notebook names in widgets and shortcuts" preference wired through [SN-NOTF-007](notifications.md#sn-notf-007) and [SN-NOTF-008](notifications.md#sn-notf-008); the app-switcher/recents redaction hand-off to [SN-SEC-019](security.md#sn-sec-019); the abuse-test suite covering all six entry points; and a documented threat-model row plus controls-matrix entries for the external-entry-point boundary.
**Out:** the biometric prompt and lock implementation themselves ([SN-AUTH-001](auth.md#sn-auth-001), `sane_secure_store`); `FLAG_SECURE`/app-switcher blurring ([SN-SEC-019](security.md#sn-sec-019)); the individual entry points' feature logic; MASVS L2 verification sign-off ([SN-SEC-030](security.md#sn-sec-030)).

#### Acceptance criteria

- [ ] With the device locked, no widget, notification, Live Activity, shortcut label or app-switcher snapshot shows the title or any content of a locked notebook or a locked profile — verified by a manual photo checklist on iOS and Android plus automated payload assertions.
- [ ] Quick Note invoked into a locked profile prompts for biometric/passcode first and lands on a writable page only after success; cancelling returns to the lock screen and creates nothing (`PRD-CO-277`).
- [ ] A deep link, shortcut, share-target item or notification tap arriving while locked is queued, replayed exactly once after unlock, and discarded on cancel or after a 5-minute timeout — never replayed under a different profile ([SN-NOTF-004](notifications.md#sn-notf-004), `PRD-PROF-004`).
- [ ] Unlocking the app does not auto-unlock a locked profile, and unlocking a profile does not auto-unlock a locked notebook — the three gates compose exactly as `PRD-LOCK-003` and `PRD-LOCK-005` require, proven by a matrix test.
- [ ] In guest mode every entry point works with no account and no network, and reveals nothing from any other local profile (`PRD-AUTH-008`, `PRD-PROF-004`).
- [ ] Abuse tests pass: a forged `sanenotes://` intent from another app, a shortcut carrying another profile's id, a share-target item targeting a locked notebook, a notification action replayed after sign-out, and a widget tap after a profile switch all fail closed with no navigation, no mutation and no disclosure.
- [ ] Enabling app lock clears the widget snapshot and dynamic shortcuts within 2 s ([SN-NOTF-008](notifications.md#sn-notf-008), [SN-NOTF-007](notifications.md#sn-notf-007)).
- [ ] The suppression-rules table exists in docs/security/secure-coding-checklist.md and every entry point cites it in code comments.

#### Technical notes

Files: `app/lib/system/entry_point_gate.dart`, `protection_state.dart`, plus the shared pending queue used by [SN-NOTF-004](notifications.md#sn-notf-004). Protection state derives from Riverpod providers over `sane_secure_store` biometric state, the active-profile provider and the notebook lock flags in `sane_core` (`PRD-LOCK-005`); the gate is a pure function of that state and the requested target so it is exhaustively unit-testable. Platform specifics: Android surfaces are queried through the standard keyguard state and the widget/shortcut publishers simply do not publish protected items (docs/platform/android.md §8); Apple widgets may render while locked, so protection is achieved by **absence of data** in the App Group snapshot rather than by a runtime check (docs/platform/ipad.md §8) — a design consequence documented in the contract file from [SN-NOTF-008](notifications.md#sn-notf-008). Timeouts and queue lifetimes are constants in one place. Nothing in this module logs a target id, title or profile id (CLAUDE.md §7.3).

#### Security & privacy

This issue *is* a control. Threats: **T-EP1 content disclosure on a locked device via an OS-rendered surface** — controls: data absence, suppression, hide-names preference (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200, `PRD-CO-277`, `PRD-LOCK-006`). **T-EP2 lock bypass via an external entry point** — controls: single mandatory gate, requireUnlock queue, compose-don't-cascade lock semantics (MASVS-AUTH-1, OWASP-A01, CWE-863, `PRD-LOCK-003`). **T-EP3 intent redirection / forged intent from another app** — controls: verified links only, internal scheme rejected from external sources, opaque validated ids (MASVS-PLATFORM-1, MASVS-PLATFORM-2, CWE-926). **T-EP4 cross-profile disclosure** — controls: active-profile scoping on every gate decision and queue replay (MASVS-PRIVACY-1, `PRD-PROF-004`). **T-EP5 stale authority after sign-out or lock enable** — controls: snapshot and shortcut clearing, queue discard (MASVS-STORAGE-1, CWE-613 class). Adds the external-entry-point trust boundary to docs/security/threat-model.md and rows to docs/security/controls-matrix.md; feeds the M7 MASVS L2 verification ([SN-SEC-030](security.md#sn-sec-030)) and the pentest abuse cases in docs/roadmap.md M7.

#### UX notes

The user-visible behaviour is the standard lock screen from the app-lock work ([SN-AUTH-001](auth.md#sn-auth-001)) reached from an external entry point, plus honest empty states: a widget for a fully locked profile shows "Unlock to see your notebooks" with the Sage mark rather than a blank tile, and a suppressed notification simply does not appear (no "1 hidden notification" teaser, which would itself leak). Copy follows docs/design/screens-and-flows.md §16 and stays reassuring, never alarming. Any in-app surface uses `sane_ui` tokens and is golden-tested across the 17 looks and dark mode. Accessibility: the unlock prompt is announced, targets are 44 pt / 48 dp, the flow is completable by switch control and keyboard (web), and the hide-names preference is described in plain language in Settings so its trade-off is understandable (docs/design/accessibility.md, `PRD-CO-321`).

#### Test plan

Unit: `app/test/system/entry_point_gate_test.dart` with an exhaustive matrix (device lock × app lock × profile lock × notebook lock × guest × active-profile mismatch × entry-point kind) asserting allow/requireUnlock/suppress. Security: `app/test/security/entry_point_abuse_test.dart` (forged intent, foreign-profile id, locked target, post-sign-out replay, post-profile-switch widget tap), extending `app/test/security/deep_link_abuse_test.dart`. Integration: `app/integration_test/locked_entry_points_test.dart` (patrol; lock the app, fire a reminder, tap a widget, open a share link, confirm each requires unlock and reveals nothing) on iOS and Android. Manual, per release: the locked-device photo checklist added to docs/security/ssdlc-process.md verification stage.

#### Dependencies

[SN-NOTF-004](notifications.md#sn-notf-004), [SN-NOTF-008](notifications.md#sn-notf-008), [SN-SEC-019](security.md#sn-sec-019).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-NOTF-012

<a id="sn-notf-012"></a>

**Add the notifications and system-integration test suite**

| Field | Value |
|---|---|
| GitHub | #960 |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | notifications, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-NOTF-001](notifications.md#sn-notf-001) |
| Depends on | [SN-NOTF-011](notifications.md#sn-notf-011), [SN-QA-001](qa.md#sn-qa-001) |
| Security controls | `MASVS-CODE-4`, `MASVS-RESILIENCE-1`, `MASVS-PRIVACY-1`, `OWASP-A03`, `CWE-20`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Everything in this epic is hard to test by hand and easy to regress silently: a notification that fires an hour late, a widget that starts showing a locked notebook after a refactor, a share target that accepts a 2 GB file, a deep link that begins auto-importing. CLAUDE.md §10 requires negative and abuse tests as first-class citizens and a regression test for every fixed vulnerability, and the roadmap M7 exit criteria call out deep-link forgery and intent redirection as pentest abuse cases. The individual issues each name their own tests; this issue builds the **shared harness** that makes those tests cheap and wires the whole set into CI so the invariants hold release after release.

It also supplies what unit tests cannot: patrol-driven runs against real OS dialogs (notification permission, share sheet, biometric unlock) on the device lab from docs/platform/compatibility-matrix.md, and a fixture corpus for hostile inbound content that the fuzz stage reuses (docs/security/devsecops-pipeline.md).

#### Scope

**In:** the shared test harness in `app/test/system/_harness/` — a fake clock, `FakeSaneNotifications` with pending-notification introspection, a fake platform-surface recorder (what was published to the widget snapshot, what shortcuts exist), a link factory and a hostile-input corpus builder; the fixture corpora under `app/test/security/fixtures/links/` and `.../fixtures/intake/`; the patrol integration suites for the six entry points; a CI job wiring in `.github/workflows/devsecops.yml` that runs the unit/widget/golden layers on every PR and the patrol suites on the nightly device-lab run; golden coverage for every in-app surface this epic adds, across the 17 looks in light and dark; and a documented manual checklist (locked-device photo pass, store-permission review) added to docs/security/ssdlc-process.md.
**Out:** the features under test (each owns its own first-line tests); the perf harness itself ([SN-PERF-002](perf.md#sn-perf-002)); the device lab provisioning ([SN-PERF-004](perf.md#sn-perf-004)); the general widget-test layer and shared utilities ([SN-QA-004](qa.md#sn-qa-004)) which this extends rather than duplicates.

#### Acceptance criteria

- [ ] `FakeSaneNotifications` lets a test assert scheduled instances, their categories, their fire times against the fake clock and their payload contents, with no platform channel — every dependent feature's unit test runs headlessly in < 1 s.
- [ ] The hostile-input corpus contains at least 30 link mutations and 15 file fixtures (zip bomb, truncated PDF, mislabelled image, traversal filename, 0-byte, oversized, bad `.sanenote` manifest) and every one is asserted to fail closed.
- [ ] Golden tests cover the permission sheet, confirm-and-place screen, deep-link failure screens and the widget-preview surface in all 17 looks × light/dark, and fail on any unreviewed pixel change.
- [ ] Patrol suites run on at least one iOS and one Android device-lab target and cover: permission grant and denial, share-sheet intake, widget tap, shortcut launch, reminder fire-and-tap, and locked-entry-point behaviour.
- [ ] CI fails on any regression in the abuse tests; a skipped or quarantined abuse test fails the build rather than passing silently.
- [ ] Flakiness budget: the patrol suites pass 20 consecutive nightly runs with no more than one infra-caused retry; flaky tests are quarantined with an owner and an issue, never deleted.
- [ ] Test code contains no real personal data, no credentials and no production ids; fixtures are synthetic and documented.

#### Technical notes

Files: `app/test/system/_harness/fake_notifications.dart`, `fake_clock.dart`, `platform_surface_recorder.dart`, `link_factory.dart`; corpora under `app/test/security/fixtures/`; suites `app/integration_test/system_entry_points_test.dart`, `notification_permission_test.dart`, `share_target_intake_test.dart`, `deep_link_cold_start_test.dart`, `locked_entry_points_test.dart`. Follow the repo test conventions in CLAUDE.md §10 and [SN-QA-001](qa.md#sn-qa-001): unit for pure logic, widget for interaction, golden for anything painted, integration/patrol for OS dialogs; tests mirror source paths with `_test.dart`. The harness must not depend on `flutter_local_notifications` directly — it implements the `SaneNotifications` interface from [SN-NOTF-002](notifications.md#sn-notf-002), which is the whole point of having an interface. CI wiring follows docs/security/devsecops-pipeline.md: PR-time fast layers, nightly device-lab layers, fuzz corpus fed into the verification stage.

#### Security & privacy

The suite is itself a control: it is what proves the epic's security claims hold over time. It enforces **input validation** (hostile corpora against intake and links — MASVS-CODE-4, OWASP-A03, CWE-20), **resilience/fail-closed behaviour** (every malformed input asserted to produce no state change — MASVS-RESILIENCE-1), **privacy invariants** (payload, widget-snapshot and log assertions that no note content, title of a locked item, path or token can escape — MASVS-PRIVACY-1, MASVS-PRIVACY-2, CWE-532, CWE-200), and **no-egress** (dependency and import assertions that the system modules link no network, push or analytics library — `PRD-PRIV-007`, MASVS-NETWORK-1 by absence). Fixtures are synthetic: CLAUDE.md §7.2 forbids secrets in tests and fixtures, and no real note, name, phone number or token may appear. Any vulnerability fixed later in this area must land with its regression test here (CLAUDE.md §10).

#### UX notes

No new user-facing surface. The golden layer is, however, the guardrail for this epic's UX promises: it pins the permission sheet, confirm-and-place screen, deep-link failure states and widget preview across **all 17 looks and both light and dark** (CLAUDE.md §9), and the patrol layer pins the accessibility behaviour — screen-reader labels present, 44 pt / 48 dp targets, focus order, keyboard operability on web, Reduce Motion honoured (docs/design/accessibility.md, `PRD-CO-321`, `PRD-CO-331`). Review of a golden diff is a design review: an unexplained pixel change means someone bypassed the tokens.

#### Test plan

This issue is the test plan; its own verification is meta: `app/test/system/_harness/harness_self_test.dart` (fake clock advances deterministically, the fake facade records and cancels correctly, the surface recorder captures publishes), a CI dry run proving the abuse suites fail when the guards are deliberately disabled (mutation check), and a documented nightly report artifact listing pass/fail per device target. Manual: run the locked-device photo checklist once and attach it to the milestone verification record.

#### Dependencies

[SN-NOTF-011](notifications.md#sn-notf-011), [SN-QA-001](qa.md#sn-qa-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a trust boundary, a stored asset or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy IDs verified in docs/security/controls-matrix.md

---

### SN-PHN-013

<a id="sn-phn-013"></a>

**Ship quick-capture widgets, controls and Quick Settings tiles**

| Field | Value |
|---|---|
| GitHub | #857 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | notifications, library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-010](library.md#sn-phn-010), [SN-IPAD-001](input-gestures.md#sn-ipad-001), [SN-AND-001](compat.md#sn-and-001) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `MASVS-STORAGE-1`, `MASVS-PRIVACY-2` |
| Extra labels | needs-credentials |

#### Context
docs/platform/phones.md §5 is emphatic that capture must be reachable **without opening the app to the library first**, and tabulates every fast entry point per platform: a home-screen widget (WidgetKit interactive widget backed by an `AppIntent` on iOS; an app widget on Android), a lock-screen/Control Center `ControlWidget` on iOS and a Quick Settings tile on Android. PRD-04 §7 turns this into requirements: PRD-CO-271 (iOS widgets MUST include recent notebooks, a Quick Note button and today's classes/reminders; Lock Screen widgets and an iOS 18+ Control Center control SHOULD be provided) and PRD-CO-272 (Android app widgets via **Jetpack Glance** for recent notebooks and Quick Note, plus a Quick Settings tile for Quick Note). PRD-CO-270 sets the bar: invoking Quick Note lands in a writable page in < 1.5 s.

Widgets are the one surface that renders Sane Notes data **outside the app process**, which makes them a privacy boundary as much as a feature; PRD-CO-277 requires that they respect guest mode and lock state and reveal no content on a locked device. The deeper hardening of that boundary is [SN-PHN-015](security.md#sn-phn-015); this issue builds the widgets and the data channel that feeds them.

#### Scope
**In:** the iOS WidgetKit extension (small/medium home-screen widget with Quick Note + recent notebooks, lock-screen widget, `ControlWidget` for Control Center), the Android Glance app widget (Quick Note + recent notebooks) and the Quick Settings tile, the shared widget data snapshot and its refresh policy, deep-linking each widget action into the `/capture/new` and notebook routes, and placeholder/redacted states.
**Out:** App Intents / Siri phrases / App Shortcuts and share targets ([SN-PHN-014](notifications.md#sn-phn-014)), lock-state and guest hardening tests ([SN-PHN-015](security.md#sn-phn-015)), class reminders and their schedule source (a maintainer decision — CLAUDE.md §13 — so the widget renders 'today's classes' only when the reminders feature exists, otherwise that slot is omitted), and the iPad-sized widget variants ([SN-IPAD-001](input-gestures.md#sn-ipad-001)).

#### Acceptance criteria
- [ ] Android: a Glance app widget offers Quick Note and up to three recent notebooks; tapping a notebook opens it, tapping Quick Note lands in a writable page in < 1.5 s.
- [ ] Android: a Quick Settings tile labelled 'New note' starts Quick Note from the shade.
- [ ] iOS: a WidgetKit widget offers Quick Note (interactive, `AppIntent`-backed) and recent notebooks; a lock-screen widget and a `ControlWidget` entry for Control Center are provided.
- [ ] Widget content is fed from a **snapshot** the app writes (titles and subject colour only — no page content, no thumbnails of note interiors), refreshed on app background and on notebook change, never by the widget reading the document store directly.
- [ ] On a **locked device** or a locked/biometric-gated profile, the widget shows a redacted placeholder ('Unlock to see your notebooks') and no titles (PRD-CO-277).
- [ ] In guest mode the widget still offers Quick Note and never prompts for sign-in.
- [ ] Widget actions deep-link through the same routes the app uses (`/capture/new`, `/n/<id>`), so behaviour matches the in-app Capture hub exactly.
- [ ] Widgets render correctly in light and dark system appearance and at every supported family/size, with accessible labels on every tappable element.
- [ ] Removing the app's data (sign-out, profile delete) clears the widget snapshot within one refresh cycle.
- [ ] Widget refresh does not wake the app for network access and consumes no measurable battery beyond the OS budget.

#### Technical notes
Native extensions live under the platform folders of `app/` (iOS widget extension target; Android Glance `AppWidgetProvider` + `TileService`), with the shared snapshot written by `app/lib/integrations/widget_snapshot.dart`. Transport for the snapshot: an **App Group container** on iOS and Glance `stateDefinition`/DataStore on Android — the snapshot file MUST be encrypted with a key held in `plugins/sane_secure_store` (Keychain/Keystore) because an App Group container is readable by every target that shares it. Keep the snapshot to an allow-list of fields (notebook id, title, subject colour, updated timestamp) so a compromise of the container leaks the minimum. Follow ADR-0012 for the plugin/native boundary and ADR-0003 for routing. Cold-start budget: widget taps use the same deferred-plugin-init cold path as [SN-PHN-010](library.md#sn-phn-010) so < 1.5 s holds (budget B6, PRD-CO-270). **Verify** current WidgetKit/Glance API shapes against the SDK docs before building (phones.md §5, PRD-04 §7 note).

#### Security & privacy
Threats and controls: **T-LOCKSCREEN-DISCLOSURE** — widget content visible on a locked phone. Control: redacted placeholder whenever the device is locked or the profile is lock-gated; never render note content, only titles, and not even titles when locked (PRD-CO-277; MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200). **T-SHARED-CONTAINER** — the App Group container / widget DataStore is outside the app sandbox boundary. Control: snapshot encrypted with a `sane_secure_store` key, field allow-list, no blobs, no thumbnails of page interiors (MASVS-STORAGE-1, MASVS-CRYPTO-1, CWE-312, CWE-922). **T-WIDGET-DEEPLINK-FORGERY** — another app invoking the widget's intent/URL to drive Sane Notes. Control: widget actions resolve to the same verified in-app routes, which land in view/confirm and never auto-mutate; the Quick Note route creates a new empty note only (CLAUDE.md §7.8; MASVS-PLATFORM-1, CWE-926). **T-STALE-DATA** — a snapshot surviving sign-out. Control: clear on sign-out/profile delete and on account deletion (PRD-DEL requirements; MASVS-PRIVACY-4). Baseline: no content or tokens logged; no network from the widget process.

#### UX notes
Widgets are the only Sane Notes surface that cannot use the 17 looks — they must follow the OS widget appearance (system light/dark, platform corner radii) while carrying the brand through the `SaneSageMark` asset and the accent colour from docs/design/tokens.json. Content style follows the Library recents card (docs/design/screens-and-flows.md §6 'Pick up where you left off'): title + 'subject · page X of Y' + updated time. Copy uses the ux-principles.md §5 voice — 'New note', 'Unlock to see your notebooks' — no exclamation marks. The redacted state must look deliberate, not broken. a11y: every tappable widget element carries a label, meets the platform target minimum, and the widget's accessible description states what it does; nothing conveys meaning by colour alone. Note the standing design blocker: the mascot art in `design/assets/*.png` is a watermarked placeholder, so any widget preview embedding it is tagged not-releasable until original Sage art exists (CLAUDE.md §9).

#### Test plan
- `app/test/integrations/widget_snapshot_test.dart` — field allow-list enforced, snapshot encrypted, cleared on sign-out (regression test).
- `app/test/integrations/widget_lock_state_test.dart` — locked device/profile yields the redacted payload (negative test).
- `app/integration_test/phone_widget_quick_note_test.dart` — patrol run: tap the widget's Quick Note, land on a writable page, assert < 1.5 s cold start via `tools/perf_harness`.
- Native unit tests: `app/android/app/src/test/kotlin/.../QuickNoteTileTest.kt` and the iOS widget target's snapshot-provider test.
- Manual matrix on the Tier-1 phones in `tools/device_lab`: iPhone-ref (home, lock screen, Control Center) and mid/low-end Android (home widget, QS tile).

#### Dependencies
[SN-PHN-010](library.md#sn-phn-010), [SN-IPAD-001](input-gestures.md#sn-ipad-001), [SN-AND-001](compat.md#sn-and-001)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Maintainer has supplied the Apple Developer team id and the App Group identifier (and, for the tile, no secret is required) — these are injected via CI secrets and never committed (CLAUDE.md §13)

---

### SN-PHN-014

<a id="sn-phn-014"></a>

**Register share targets, app shortcuts and file handlers on phones**

| Field | Value |
|---|---|
| GitHub | #858 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | notifications, sharing-export |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-010](library.md#sn-phn-010), [SN-AND-001](compat.md#sn-and-001) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-CODE-4`, `OWASP-A03`, `CWE-20`, `CWE-434`, `CWE-926` |
| Extra labels | needs-credentials |

#### Context
'Share to Sane Notes' is the second-most-used phone entry point after the Capture button: docs/platform/phones.md §5 lists a native share extension on iOS, `ACTION_SEND` handling on Android, and the Web Share Target for an installed PWA. PRD-04 §7 makes it normative — PRD-CO-274 requires registering as a share target on every platform to receive PDFs, images, text and URLs (iOS Share Extension, Android `ACTION_SEND`/`ACTION_SEND_MULTIPLE` + Direct Share, Web Share Target API POST in the PWA manifest), with received files routed into the import pipeline; PRD-CO-275 requires file handlers / open-with for `.sanenote`, `.pdf` and competitor formats; PRD-CO-273 requires App Shortcuts / Siri and Android App Shortcuts covering new note, resume last notebook, import PDF, start recording, search and ask-my-notes.

Everything arriving through these doors is **untrusted input from another app**, which is exactly the case CLAUDE.md §7.8 governs: validate type/MIME/size/schema before use, cap resources before decode, parse off the UI isolate, canonicalise every path, and import into a new isolated notebook. This issue therefore carries as much input-validation work as integration work.

#### Scope
**In:** the iOS Share Extension and its App Group hand-off, Android `ACTION_SEND`/`ACTION_SEND_MULTIPLE` intent filters plus Direct Share, file handlers / UTIs / mime intent-filters for `.sanenote` and `.pdf`, App Shortcuts and Siri/Assistant intents for the six named actions, the inbound-content validation gate, and the receive-confirm UI that shows what arrived before it is imported.
**Out:** the importers themselves ([SN-SHR-001](sharing-export.md#sn-shr-001) owns PDF/Markdown/competitor import), widgets and tiles ([SN-PHN-013](notifications.md#sn-phn-013)), lock-state hardening ([SN-PHN-015](security.md#sn-phn-015)), the PWA share-target manifest entry ([SN-WEB-001](compat.md#sn-web-001), PRD-CO-413), and universal/App Link verification for share links (owned with sharing, referenced here).

#### Acceptance criteria
- [ ] Sharing a PDF from Safari, Chrome or Files into Sane Notes creates an annotatable notebook (PRD-CO-274 acceptance) and lands the user in a confirm screen, not directly in a mutation.
- [ ] Sharing images (single and multiple), plain text and a URL each route to the correct import path; `ACTION_SEND_MULTIPLE` handles a batch.
- [ ] Opening a `.sanenote` or `.pdf` from Files / the Android file picker opens it in Sane Notes (PRD-CO-275).
- [ ] App Shortcuts (long-press the icon on Android, Siri/Spotlight on iOS) offer: new note, resume last notebook, import PDF, start audio recording, search, ask-my-notes (PRD-CO-273).
- [ ] **Every inbound item is validated before use**: declared MIME is re-derived from content, size and page/dimension caps are enforced before decode, unknown types are rejected with a clear toast, and parsing runs off the UI isolate.
- [ ] A hostile input (zip bomb `.sanenote`, malformed PDF, 2 GB image, path-traversal entry name) **fails closed** to a user-safe error with no crash, no partial write and no file created outside the app sandbox.
- [ ] Imports always create a **new isolated notebook** (or a new page set) and never overwrite an existing notebook (PRD-CO-070).
- [ ] Received content is imported entirely on-device; a network capture during import shows no note bytes leaving the device (PRD-CO-079).
- [ ] Share receipt works in guest mode and offline.
- [ ] The confirm screen states what arrived ('1 PDF, 14 pages') and offers Cancel; cancelling deletes any staged bytes.
- [ ] Confirm/error surfaces render correctly in all 17 looks and dark mode with >= 44×44 pt / 48×48 dp targets and `Semantics` labels.

#### Technical notes
Android: intent filters in `app/android/app/src/main/AndroidManifest.xml` for `ACTION_SEND`/`ACTION_SEND_MULTIPLE` with explicit mime types plus `ACTION_VIEW` for `application/pdf` and the `.sanenote` extension; Direct Share via `ShortcutManager` dynamic shortcuts; App Shortcuts in `res/xml/shortcuts.xml`. iOS: a Share Extension target writing into the App Group container, plus `LSItemContentTypes`/exported UTI for `.sanenote`, plus `AppIntent`/`AppShortcut` definitions. Dart side: `app/lib/integrations/inbound/` holds the receive router, the validation gate and the confirm screen; validated items are handed to the import pipeline in the sharing/export area. Validation runs in a one-shot `Isolate.run` with caps applied **before** decode; path names from archive entries are canonicalised and confined (no `..`, no absolute paths) per CLAUDE.md §7.8. Reuse the existing verified App Links / Universal Links configuration for URL receipt (PRD-CO-276). Treat every API shape here as **verify** against current SDK docs (PRD-04 §7 note). The importers themselves are SN-SHR-001's (M6); this registers OS entry points and hands validated content to the import-pipeline interface ([SN-SHR-021](sharing-export.md#sn-shr-021)) via a stub queue until M6.

#### Security & privacy
This is the largest untrusted-input surface on the phone. Threats and controls: **T-HOSTILE-FILE** — crafted PDF/image/`.sanenote` triggering decoder bugs, decompression bombs or OOM. Controls: content-derived type checks, size/page/dimension caps before decode, parsing off the UI isolate, fail-closed error, and inclusion of these inputs in the fuzz corpus (MASVS-CODE-4, MASVS-PLATFORM-2, OWASP-A03, CWE-20, CWE-400, CWE-409). **T-PATH-TRAVERSAL** — a `.sanenote` (zip) entry escaping the extraction root. Control: canonicalise and confine every path derived from file content; reject absolute or parent-relative entries (CWE-22, CWE-434). **T-INTENT-REDIRECTION** — a malicious app sending a crafted intent/extra to drive Sane Notes into opening or exfiltrating a file it should not touch. Controls: never re-broadcast a received intent, never dereference a `content://`/file URI the caller does not own without a permission check, import into a new isolated notebook only, and land in confirm before any mutation (MASVS-PLATFORM-1, CWE-926, CWE-441). **T-EXPORTED-COMPONENT** — over-broad exported components. Control: export only the components that must be exported, with the narrowest intent filters, and add an exported-component review item to the threat model (MASVS-PLATFORM-1). **T-CLOUD-CONVERT** — an importer calling a cloud conversion service. Control: imports run on-device; any cloud path requires an ADR + threat-model row and per-request opt-in (PRD-CO-079; MASVS-NETWORK-1). Baseline: no content, filenames or paths in logs (CWE-532).

#### UX notes
Surfaces: the Import overlay 'Import a PDF' sources and its free-plan meter (docs/design/screens-and-flows.md §9) are the model for the confirm screen; reuse the existing copy pattern and the toast on success ('<file> imported · highlighter ready'). Voice per ux-principles.md §5: errors state the fact and the recovery — 'Couldn't import that PDF — check the file and try again.' Never a code, never blame. No dead ends: a rejected type offers 'Open in Files' or 'Cancel'. Loading: a progress-reporting state for long imports ('Importing 14 pages…'), not a bare spinner (§4.2). The free-plan import gate must still apply when arriving via share (free plan, 5 imports/month → Upgrade overlay, screens §9), so the phone path cannot be used to bypass a limit. All surfaces use `sane_ui` components, so the 17 looks and dark mode are covered; targets and labels meet PRD-CO-320/321.

#### Test plan
- `app/test/integrations/inbound/validation_gate_test.dart` — MIME re-derivation, size/page caps, unknown-type rejection.
- `app/test/security/hostile_inbound_test.dart` — zip bomb, path-traversal entry, malformed PDF, oversized image: each fails closed with no file written outside the sandbox (abuse tests; inputs added to the fuzz corpus).
- `app/test/integrations/inbound/intent_redirection_test.dart` — a crafted intent cannot cause a mutation or a re-broadcast (negative test).
- `app/test/integrations/inbound/confirm_flow_test.dart` — confirm screen contents, cancel deletes staged bytes, free-plan gate still applies.
- `app/integration_test/phone_share_target_test.dart` — patrol run sharing a PDF and an image into the app from a stub sender.
- Native: `app/android/app/src/androidTest/.../ShareIntentFilterTest.kt` asserting only the intended components are exported.

#### Dependencies
[SN-PHN-010](library.md#sn-phn-010), [SN-AND-001](compat.md#sn-and-001). Registration, validation and the receive-confirm UI ship here; validated inbound content is handed to the import pipeline ([SN-SHR-021](sharing-export.md#sn-shr-021), M6) through its interface — a stub intake queue stands in until it lands, so the SN-SHR-001 epic is not a scheduling blocker.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Threat model updated: new trust boundary (inbound share/file handlers) and exported components recorded
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Maintainer has supplied the Apple Developer team id and App Group identifier needed for the Share Extension target (CI secrets, never committed)

---

