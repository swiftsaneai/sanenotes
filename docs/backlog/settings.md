# Backlog — area: settings

17 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-SET-001](settings.md#sn-set-001) **Build the Settings surface: six tabs and the full preference inventory** (epic · M4 Identity, Sync & Privacy)
  - [SN-SET-002](settings.md#sn-set-002) **Build the Settings screen scaffold, six-tab nav and adaptive layout** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-SET-003](settings.md#sn-set-003) **Implement the per-profile preferences model, repository and LWW persistence** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SET-004](settings.md#sn-set-004) **Implement the SaneSettingRow composite and settings section layout** · p1 · task · S · M4 Identity, Sync & Privacy
  - [SN-SET-005](settings.md#sn-set-005) **Build the Account & plan settings tab** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-SET-006](settings.md#sn-set-006) **Build the Sync & backup settings tab** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SET-007](settings.md#sn-set-007) **Build the Handwriting & stylus settings tab** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SET-008](settings.md#sn-set-008) **Build the stylus calibration and pressure-test area** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-SET-009](settings.md#sn-set-009) **Build the Appearance settings tab (look, dark mode, wallpaper)** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SET-010](settings.md#sn-set-010) **Build the Notifications settings tab** · p2 · feature · S · M4 Identity, Sync & Privacy
  - [SN-SET-011](settings.md#sn-set-011) **Build the class-reminder timetable editor and local scheduling** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SET-012](settings.md#sn-set-012) **Build the Privacy & export settings tab** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SET-013](settings.md#sn-set-013) **Build the Security settings section (app lock, recovery, devices, leak controls)** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SET-014](settings.md#sn-set-014) **Build the storage usage breakdown view** · p3 · feature · S · M4 Identity, Sync & Privacy
  - [SN-SET-015](settings.md#sn-set-015) **Build the About, licences and help screen** · p2 · feature · S · M4 Identity, Sync & Privacy
  - [SN-SET-016](settings.md#sn-set-016) **Implement reset settings to defaults** · p3 · task · XS · M4 Identity, Sync & Privacy

---

## Issues

### SN-BTY-011

<a id="sn-bty-011"></a>

**Add a beautify intensity control with per-notebook and per-action scope**

| Field | Value |
|---|---|
| GitHub | #1164 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | settings, editor, ocr-hwr |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-002](ink.md#sn-bty-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context
Plenty of people love their handwriting exactly as it is, and for them an app that quietly "improves" it is an insult, not a feature. Every competitor that ships this makes it a global on/off at best (Apple's Auto-refine toggle; Samsung's one-tap clean-up). Sane Notes makes intensity a first-class, three-step control with a per-notebook default and a per-action override, defaulting to **Off**, so the feature is opt-in at every level and a lab notebook can stay raw while a lecture notebook gets tidied.

This issue defines the intensity model, its persistence, and the single place every planner reads its parameters from — no planner may hard-code a strength constant.

#### Scope
**In:** the `BeautifyIntensity` enum (Off / Light / Neat) and the `BeautifyParams` bundle it resolves to; per-profile default, per-notebook override and per-action override with a clear precedence; persistence as an LWW register on the notebook so it syncs and merges; the resolution API every planner calls; the settings UI rows; the in-editor quick control; and the first-run explainer that introduces the feature without switching it on.
**Out:** the planners themselves; the "refine as I write" toggle, which is a separate switch owned by [SN-BTY-009](ink.md#sn-bty-009) but gated by this control; per-pen settings (out of scope — this is a document-level behaviour).

#### Acceptance criteria
- [ ] A fresh install has intensity **Off** for every profile and every notebook; no ink is ever beautified until the user turns it on (asserted by a default-state test).
- [ ] Precedence is: per-action override > per-notebook setting > per-profile default > Off; a table-driven test covers all combinations.
- [ ] The per-notebook value persists as a CRDT LWW register, syncs, and converges on concurrent change; changing it never retroactively alters existing ink (existing overlays are untouched; new actions use the new value).
- [ ] Every planner ([SN-BTY-004](ocr-hwr.md#sn-bty-004), [SN-BTY-005](ocr-hwr.md#sn-bty-005), [SN-BTY-006](ocr-hwr.md#sn-bty-006), [SN-BTY-007](ocr-hwr.md#sn-bty-007), [SN-BTY-008](ink.md#sn-bty-008)) takes its strength from `BeautifyParams`; a lint/arch test fails the build if a beautify planner contains a hard-coded intensity constant.
- [ ] Light and Neat map to the documented parameter bundle: slant alpha 0.35/0.70, size clamp [0.90,1.12]/[0.80,1.25], Frechet bound 0.35/0.80 * strokeWidth, spacing gain 0.4/0.8 — one source of truth, documented in `docs/architecture/ink-engine.md` and referenced by tests.
- [ ] Setting intensity to Off disables the Beautify commands, stops real-time mode, and **keeps existing overlays**, with a separate explicit action to revert them ([SN-BTY-012](editor.md#sn-bty-012)) — turning the feature off must not silently discard work either.
- [ ] The settings rows and the in-editor control meet WCAG 2.2 AA: a labelled radio group with a value and a description, 44 pt / 48 dp targets, keyboard-operable, never colour-only.

#### Technical notes
`packages/sane_core/lib/src/model/beautify_intensity.dart` (enum + `BeautifyParams` immutable value object + resolution function), stored as a notebook LWW register alongside other per-notebook settings ([SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003)) and as a per-profile preference through the preferences repository ([SN-SET-003](settings.md#sn-set-003) when it lands; until then the profile record in `sane_core`). The settings rows land in the Handwriting & stylus tab ([SN-SET-007](settings.md#sn-set-007)) using `SaneSettingRow` ([SN-SET-004](settings.md#sn-set-004)); the in-editor quick control sits in the Beautify sub-menu of the selection action bar ([SN-ED-011](editor.md#sn-ed-011)). Resolution is exposed as a Riverpod provider in `app/lib/features/editor/beautify/` and passed **into** `sane_ml` as a parameter — `sane_ml` never reads settings itself, preserving the package DAG (CLAUDE.md §3).

#### Security & privacy
The setting is note metadata: stored locally, E2E-encrypted when synced, never logged (MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-532). It is a privacy-relevant default in its own right — shipping Off means no automatic processing of anyone's handwriting until they ask for it, which is what the privacy dashboard and store privacy labels will state (decision 8, MASVS-PRIVACY-4 posture). No network.

#### UX notes
Three options with plain-language descriptions: **Off** ("Keep my handwriting exactly as I write it"), **Light** ("Gently even out lines and spacing"), **Neat** ("Tidy lines, slant and spacing — still your handwriting"). A live preview strip shows the same sample word at each setting, rendered from the user's own recent ink where available so they see their hand, not a stock sample. First-run explainer appears once, when the user first opens the Beautify menu — never as an interruption while writing — and its primary action is "Try it on this page", with "Not now" as an equal-weight option. Tokens from `sane_ui`, correct in all 17 looks and dark mode, adaptive to 400 px width.

#### Test plan
`packages/sane_core/test/model/beautify_intensity_test.dart` (defaults, precedence table, parameter bundles), `packages/sane_core/test/crdt/beautify_setting_merge_test.dart` (LWW convergence), `app/test/widget/settings/beautify_intensity_row_test.dart` (a11y semantics, keyboard, preview strip), `app/test/features/editor/beautify/intensity_gate_test.dart` (Off disables commands and real-time, keeps overlays), golden `app/test/golden/settings/beautify_intensity_*.png` across representative looks.

#### Dependencies
SN-BTY-002 (overlay model). Settings surfaces [SN-SET-004](settings.md#sn-set-004), [SN-SET-007](settings.md#sn-set-007); preferences [SN-SET-003](settings.md#sn-set-003).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md PRD-ED-187)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text or note content in logs (TM-I-05)

---

### SN-SET-001

<a id="sn-set-001"></a>

**Build the Settings surface: six tabs and the full preference inventory**

| Field | Value |
|---|---|
| GitHub | #25 |
| Type | epic |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, privacy, theming |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PLATFORM-3`, `MASVS-AUTH-1`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Settings is the surface where a student controls the whole product: their account and plan, how notes sync and back up, how the pen and hand behave, how the app looks, what it notifies about, and what stays private. The design ('Settings' screen, `docs/design/screens-and-flows.md` §12) specifies six tabs — **Account & plan**, **Sync & backup**, **Handwriting & stylus**, **Appearance**, **Notifications**, **Privacy & export** — each a scrollable column of setting rows. `docs/product/prd-03-identity-sync-privacy-settings-billing.md` §7 (`SET`) fixes the complete preference inventory: ten preference keys (`autoSync`, `wifiOnly`, `palm`, `pressure`, `finger`, `leftHanded`, `dock`, `dblTap`, `reminders`, `sharedNotif`, `tips`, `onDevice`) plus the look/dark/wallpaper controls, the backup destination, the storage meter, stylus calibration, export/reset, and an about/licences surface. Every preference has a stated key, default, label and scope and MUST persist **per profile** (`PRD-PROF-004`) except device-scoped wallpaper.

This epic delivers that surface end to end: the tab scaffold and adaptive layout, the per-profile preferences model and repository (LWW-registered so settings follow a profile across devices), the reusable setting-row composite, all six tabs, the stylus calibration/pressure test area, a Security section that surfaces app-lock/recovery/paired-device/leak controls, a storage-usage breakdown, an about/licences/help screen, and reset-to-defaults. It is the concrete home for locked decisions #6 (on-device recognition default), #8 (privacy by default) and #9 (17 looks), and it must be fully usable as a guest with no account and no network. Underlying engines (sync, E2EE keys, billing, notifications, app lock) are owned by their own areas; Settings **surfaces and configures** them.

#### Scope

**In:** every child issue below — the settings screen, six tabs, preference backbone, calibration, security surface, storage view, about/licences, reset.
**Out:** the sync/backup engine ([SN-SYNC-001](sync.md#sn-sync-001)), key management ([SN-CRY-001](security.md#sn-cry-001)), billing/entitlements ([SN-BILL-001](billing.md#sn-bill-001)), identity/sign-in ([SN-AUTH-001](auth.md#sn-auth-001)), notification delivery ([SN-NOTF-001](notifications.md#sn-notf-001)), the privacy dashboard proper ([SN-PRV-001](privacy.md#sn-prv-001)), and the ink/stylus engine ([SN-INK-001](ink.md#sn-ink-001)) — Settings depends on and links to these.

#### Acceptance criteria

- [ ] Every child issue below is merged, CI green, and its own acceptance criteria met.
- [ ] All 12 preference keys exist with the exact key, default and scope of PRD-SET §7.1; every toggle/segment change applies immediately (no Save), persists locally, and propagates as an LWW op when sync-relevant (PRD-SET-019).
- [ ] Switching the active profile swaps the entire visible settings state (look, dark, prefs) except device-scoped wallpaper (PRD-PROF-004, PRD-SET-019).
- [ ] Settings is fully usable as a guest, offline; no preference value, token, email, phone number or note content is ever written to logs (CWE-532).
- [ ] Every settings surface renders correctly across all 17 looks + light/dark and meets WCAG 2.2 AA (44pt/48dp targets, ≥4.5:1 text, keyboard-reachable on web).

#### Children

- [ ] [SN-SET-002](settings.md#sn-set-002) Settings screen scaffold, six-tab nav & adaptive layout
- [ ] [SN-SET-003](settings.md#sn-set-003) Per-profile preferences model, repository & LWW persistence
- [ ] [SN-SET-004](settings.md#sn-set-004) SaneSettingRow composite & section layout
- [ ] [SN-SET-005](settings.md#sn-set-005) Account & plan tab
- [ ] [SN-SET-006](settings.md#sn-set-006) Sync & backup tab (autoSync, wifiOnly, backup target, storage meter)
- [ ] [SN-SET-007](settings.md#sn-set-007) Handwriting & stylus tab (palm, pressure, finger, left-handed, dock, double-tap)
- [ ] [SN-SET-008](settings.md#sn-set-008) Stylus calibration & pressure-test area
- [ ] [SN-SET-009](settings.md#sn-set-009) Appearance tab (look grid, dark mode, wallpaper)
- [ ] [SN-SET-010](settings.md#sn-set-010) Notifications tab (class reminders, shared activity, tips)
- [ ] [SN-SET-011](settings.md#sn-set-011) Class-reminder timetable editor & local scheduling
- [ ] [SN-SET-012](settings.md#sn-set-012) Privacy & export tab (on-device recognition, export everything)
- [ ] [SN-SET-013](settings.md#sn-set-013) Security section (app lock, recovery code, paired devices, leak protections)
- [ ] [SN-SET-014](settings.md#sn-set-014) Storage usage breakdown view
- [ ] [SN-SET-015](settings.md#sn-set-015) About, licences & help screen
- [ ] [SN-SET-016](settings.md#sn-set-016) Reset settings to defaults

#### Technical notes

Preference registers and the settings repository interface live in `packages/sane_core` (pure Dart) as per-profile LWW registers stamped by HLC ([SN-CORE-003](sync.md#sn-core-003), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-012](storage.md#sn-core-012)); persistence via drift/SQLite ([SN-CORE-004](storage.md#sn-core-004)); device-scoped wallpaper stays in a platform store, not the synced set. Screen composition, go_router routes and cross-feature Riverpod providers live in `app/lib/settings/` per ADR-0003 (`docs/adr/0003-state-management-and-app-structure.md`) and ADR-0002 layout. UI is built from `packages/sane_ui` components (`docs/design/component-inventory.md` §3, §8): `SaneTabNav`, `SaneSettingRow`, `SaneToggle`, `SaneSegmented`, `SaneThemeGrid`, `SaneWallpaperCard`, `SaneProgress`, `SanePlanSummary`, `SaneDetailRow`. Implements PRD-SET-001..024.

#### Security & privacy

Settings is a privacy control plane: it exposes consent (telemetry, on-device recognition, cloud AI), platform hardening (screenshot/clipboard/backup, MASVS-PLATFORM-3), app lock (MASVS-AUTH-1) and recovery (MASVS-CRYPTO). Preferences persist at rest under the device/profile key (MASVS-STORAGE-1); per-profile isolation is an access-control boundary (OWASP-A01, ASVS V8, MASVS-PRIVACY-1/2). No value logged (CWE-532). Children carry the specific IDs.

#### UX notes

Delivers the 'Settings' screen (screens §12): vertical `SaneTabNav` when wide, horizontal when narrow; single content column. All copy is fixed by the PRD/design and MUST be preserved verbatim. Every surface honours the cross-cutting state matrix in `docs/design/component-inventory.md` §9 across all 17 looks + dark mode, with Semantics name/role/state on every control.

#### Test plan

Children name their own tests. Epic-level gates: golden coverage of every tab across looks + dark; an integration flow that changes a preference, backgrounds/reopens, and asserts persistence; a profile-switch test asserting the whole settings state swaps; a no-PII-in-logs assertion over the settings module.

#### Dependencies

[SN-CORE-003](sync.md#sn-core-003), [SN-CORE-004](storage.md#sn-core-004), [SN-CORE-012](storage.md#sn-core-012) (prefs model + persistence), [SN-DS-001](design-system.md#sn-ds-001), [SN-DS-020](design-system.md#sn-ds-020) (design system + nav shell), [SN-AUTH-007](auth.md#sn-auth-007) (local profiles) for scoping. Children carry finer-grained `depends_on`.

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-002

<a id="sn-set-002"></a>

**Build the Settings screen scaffold, six-tab nav and adaptive layout**

| Field | Value |
|---|---|
| GitHub | #453 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-DS-020](design-system.md#sn-ds-020), [SN-DS-026](design-system.md#sn-ds-026), [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The Settings screen is a two-region layout: a left tab rail and a right content column (`docs/design/screens-and-flows.md` §12). This issue builds the container every tab slots into and the routing/state that binds it to the sidebar 'Settings' entry. The design specifies six tabs (`S_TABS`): Account & plan, Sync & backup, Handwriting & stylus, Appearance, Notifications, Privacy & export. The tab nav is vertical when wide and collapses to a horizontal scroller when `narrow` (< 900px), per the component inventory (`docs/design/component-inventory.md` §3, `SaneTabNav`). Without this scaffold there is no host for any preference, so it lands first. It implements the structural half of PRD-SET §7 and follows ADR-0003 (`docs/adr/0003-state-management-and-app-structure.md`).

#### Scope

**In:** the `SettingsScreen` widget in `app/lib/settings/` and its go_router route (`/settings`, deep-linkable to a tab, e.g. `/settings/appearance`); the six-tab `SaneTabNav` (vertical wide / horizontal narrow) with the active tab reflected in the route and back-button; the scrollable content column; Riverpod providers exposing the selected tab and the current profile's settings snapshot to child tabs; the reduced-transparency/frosted-panel wallpaper backdrop hook.
**Out:** the content of each tab ([SN-SET-005](settings.md#sn-set-005)..[SN-SET-013](settings.md#sn-set-013)); the preference model ([SN-SET-003](settings.md#sn-set-003)); the setting-row composite ([SN-SET-004](settings.md#sn-set-004)).

#### Acceptance criteria

- [ ] `SettingsScreen` renders the tab rail + content column and shows exactly the six named tabs in the design's order (PRD §7, screens §12).
- [ ] Tab nav is vertical at ≥ 900px and a horizontal scroller below 900px; the active tab is announced with `aria-current`/selected semantics and is keyboard-reachable (Tab/Arrow) on web.
- [ ] The active tab is encoded in the route so a deep link opens that tab and browser/system back returns to Library.
- [ ] Switching tabs rebuilds only the content column, not the rail; scroll position per tab is preserved within a session.
- [ ] Renders correctly in all 17 looks + light/dark; tap targets ≥ 44pt/48dp; contrast ≥ 4.5:1.

#### Technical notes

`app/lib/settings/settings_screen.dart` + `settings_route.dart`; `SaneTabNav` from [SN-DS-020](design-system.md#sn-ds-020); window size classes from [SN-DS-026](design-system.md#sn-ds-026); theming via [SN-DS-011](theming.md#sn-ds-011) `SaneLookScope`. State: a `settingsTabProvider` (Riverpod) synced to go_router; a `currentProfileSettingsProvider` reading the snapshot from [SN-SET-003](settings.md#sn-set-003). Wallpaper frosted-panel backdrop respects `prefers-reduced-transparency` (PRD-SET-021). No business logic in `build`.

#### Security & privacy

None beyond baseline: no note content, tokens, email or phone logged (CWE-532, MASVS-PRIVACY-3); the scaffold reads only non-sensitive tab state.

#### UX notes

Design 'Settings' screen (screens §12); `SaneTabNav` (component inventory §3). Empty/loading: while the profile snapshot loads, show `SaneSkeleton` rows, not a spinner. RTL mirrors the rail via `EdgeInsetsDirectional`; composes with left-handed mode. Reduce-motion cross-fades tab transitions.

#### Test plan

Widget: `app/test/settings/settings_screen_test.dart` (six tabs present, order, deep-link opens correct tab, narrow collapses to horizontal). Golden: `app/test/settings/golden/settings_scaffold_golden_test.dart` across looks + dark, wide + narrow. A11y: `app/test/settings/settings_a11y_test.dart` (tab semantics, focus order, targets).

#### Dependencies

[SN-DS-020](design-system.md#sn-ds-020), [SN-DS-026](design-system.md#sn-ds-026), [SN-DS-011](theming.md#sn-ds-011).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-003

<a id="sn-set-003"></a>

**Implement the per-profile preferences model, repository and LWW persistence**

| Field | Value |
|---|---|
| GitHub | #454 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | settings, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-012](storage.md#sn-core-012), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `OWASP-A01`, `ASVS-V8`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Every preference in `docs/product/prd-03-...settings-billing.md` §7.1 has a key, a default, and a scope, and PRD-SET-019 requires that a change apply immediately (no explicit Save), persist locally, and — where the setting is sync-relevant and sync is on — propagate as an **LWW-registered op** so preferences follow the profile across devices. Device-scoped settings (wallpaper) stay local. This issue is the backbone the six tabs write through: a typed `Preferences` value object, its defaults, its per-profile persistence, and the LWW register semantics. It is pure-Dart and belongs in `sane_core` with the rest of the document/CRDT model (ADR-0005, `docs/architecture/document-model.md`), not in the UI layer.

#### Scope

**In:** an immutable `Preferences` value object (freezed/hand-written) carrying every key — `autoSync`:bool=on, `wifiOnly`:bool=off, `palm`:bool=on, `pressure`:bool=on, `finger`:bool=off, `leftHanded`:bool=off, `dock`:enum{bottom,top,left,right}=bottom, `dblTap`:enum{eraser,previousTool,colors}=eraser, `look`:string=paper, `darkMode`:enum{system,light,dark}=system, `reminders`:bool=on, `sharedNotif`:bool=on, `tips`:bool=off, `onDevice`:bool=on — with defaults from §7.1; a `SettingsRepository` interface + drift-backed impl that stores one register per key per profile as an HLC-stamped LWW register; a `scope` tag per key (profile vs device) so device-scoped keys are excluded from the sync op-log; `Result<T,Failure>` on every mutation.
**Out:** wallpaper blob storage ([SN-SET-009](settings.md#sn-set-009)); the sync transport that ships the ops ([SN-SYNC-001](sync.md#sn-sync-001)); UI rows ([SN-SET-004](settings.md#sn-set-004)).

#### Acceptance criteria

- [ ] `Preferences.defaults()` returns exactly the §7.1 defaults for all 14 keys; a fresh profile reads defaults.
- [ ] Writing a key updates in-memory state synchronously and persists to SQLite; a re-read after restart returns the written value.
- [ ] A profile-scoped write emits one LWW-registered op (HLC-stamped, deviceId tie-break) to the op-log; a device-scoped write (wallpaper meta) emits nothing to the op-log (PRD-SET-019).
- [ ] Two devices setting the same key concurrently converge to the higher-HLC value with no lost writes; a stale op never clobbers a newer value.
- [ ] Reads/writes are `Result`-typed; a corrupt/missing register falls back to the default and logs a redacted warning (no value in the log, CWE-532).

#### Technical notes

`packages/sane_core/lib/src/settings/preferences.dart` + `settings_repository.dart`; LWW registers + HLC from [SN-CORE-003](sync.md#sn-core-003); op model/op-log from [SN-CORE-010](sync.md#sn-core-010); repository-interface conventions from [SN-CORE-012](storage.md#sn-core-012); drift schema/isolate from [SN-CORE-004](storage.md#sn-core-004). Pure Dart — MUST NOT import `package:flutter`. Keep the register key namespace stable (`pref.<key>`) for migration ([SN-CORE-022](storage.md#sn-core-022)).

#### Security & privacy

Preferences persist at rest under the profile/device key (MASVS-STORAGE-1); per-profile partitioning is an access-control + privacy boundary (OWASP-A01, ASVS V8, MASVS-PRIVACY-1). Some preferences are consent state (`onDevice`) and MUST be tamper-evident within the CRDT log. No value, no PII in logs (CWE-532).

#### UX notes

None beyond baseline (pure-Dart layer). Exposes a stream the UI binds to so a change is reflected instantly across every open surface (e.g. left-handed flips the editor rail live).

#### Test plan

Unit: `packages/sane_core/test/settings/preferences_test.dart` (defaults, immutability), `settings_repository_test.dart` (persist/reload, Result on error, default fallback on corruption), `settings_lww_test.dart` (concurrent-write convergence, device-scope exclusion). Property test folds into the CRDT convergence harness ([SN-CORE-024](qa.md#sn-core-024)).

#### Dependencies

[SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-010](sync.md#sn-core-010), [SN-CORE-012](storage.md#sn-core-012), [SN-CORE-004](storage.md#sn-core-004).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-004

<a id="sn-set-004"></a>

**Implement the SaneSettingRow composite and settings section layout**

| Field | Value |
|---|---|
| GitHub | #455 |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, design-system, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-DS-017](design-system.md#sn-ds-017), [SN-DS-018](design-system.md#sn-ds-018), [SN-DS-021](design-system.md#sn-ds-021) |
| Security controls | `MASVS-PRIVACY-3` |
| Extra labels | agent-ready, good first issue |

#### Context

Every tab is a stack of near-identical rows: a title, a one-line description, and a trailing control (toggle, segmented control, link/action, or meter). The component inventory names this `SaneSettingRow` and requires the description to be read as an accessibility hint and the control state as the row's value (`docs/design/component-inventory.md` §8). Building one accessible composite once keeps all six tabs consistent and lets each tab focus on wiring, not layout. This is the smallest reusable unit of the Settings surface and unblocks all tab work.

#### Scope

**In:** a `SaneSettingRow` widget (title + description + trailing control slot) and a `SaneSettingsSection` (group header + rows + divider) in `packages/sane_ui`, composing the primitive `SaneToggle`/`SaneSegmented` ([SN-DS-017](design-system.md#sn-ds-017)), `SaneSlider`/`SaneProgress` ([SN-DS-018](design-system.md#sn-ds-018)) and list-row/divider primitives ([SN-DS-021](design-system.md#sn-ds-021)); the four control variants (toggle, segmented, link/action, meter); disabled + description-as-hint semantics; RTL and left-handed composition.
**Out:** any specific preference wiring (in the tab issues); the theme grid and wallpaper cards (their own components).

#### Acceptance criteria

- [ ] `SaneSettingRow` renders title (bodyStrong), description (muted), and one trailing control; height and spacing come from tokens, not hard-coded values.
- [ ] The accessible node exposes the title as name, the description as hint, and the control state as value in every state (WCAG 4.1.2); casing is visual only.
- [ ] A disabled row is 0.35 opacity, exposed disabled to AT, and not focusable when inert.
- [ ] Tap target of the control ≥ 44pt/48dp; row is keyboard-focusable and toggle/segment operable by keyboard on web.
- [ ] Correct in all 17 looks + light/dark and mirrored in RTL.

#### Technical notes

`packages/sane_ui/lib/src/settings/sane_setting_row.dart`, `sane_settings_section.dart`. Reads only tokens; no colour hard-coded (`docs/design/component-inventory.md` intro). Controls injected as a child so tabs supply `SaneToggle`/`SaneSegmented`/`SaneButton`/`SaneProgress`.

#### Security & privacy

None beyond baseline: presentational; renders no sensitive content and logs nothing (MASVS-PRIVACY-3).

#### UX notes

Design 'Settings' rows (screens §12; component inventory §8 `SaneSettingRow`). Description text is the verbatim PRD copy. Error state uses a toast, never inline red (component inventory §9).

#### Test plan

Widget: `packages/sane_ui/test/settings/sane_setting_row_test.dart` (variants render, disabled semantics, hint/value exposure). Golden: `packages/sane_ui/test/settings/golden/sane_setting_row_golden_test.dart` across looks + dark. A11y folds into [SN-DS-029](a11y.md#sn-ds-029) suite.

#### Dependencies

[SN-DS-017](design-system.md#sn-ds-017), [SN-DS-018](design-system.md#sn-ds-018), [SN-DS-021](design-system.md#sn-ds-021).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-005

<a id="sn-set-005"></a>

**Build the Account & plan settings tab**

| Field | Value |
|---|---|
| GitHub | #456 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, billing, auth |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-AUTH-001](auth.md#sn-auth-001), [SN-ONB-001](onboarding.md#sn-onb-001) |
| Security controls | `MASVS-STORAGE-2`, `MASVS-PRIVACY-3`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The Account & plan tab is where identity, plan and profiles meet Settings (`docs/design/screens-and-flows.md` §12; PRD-SET-020). It shows the current plan card with the verbatim Free/Pro descriptions and the correct CTA (Upgrade for Free, Manage subscription for Pro), the account Details rows (Name, Email, Student status 'Verified · until <date>'), a 'Replay the welcome tour' action, a 'Profiles on this account' block (add/switch), and a destructive Sign out. This tab composes surfaces owned by other areas (billing, identity, onboarding, profiles); its job is to lay them out correctly and route to them. It must degrade gracefully for a guest with no account.

#### Scope

**In:** the `AccountPlanTab` shell in `app/lib/settings/tabs/` that composes and lays out the tab; the plan summary card (`SanePlanSummary`) rendering the verbatim Free/Pro descriptions - Free: "5 PDF imports a month · 30-min recordings · 3 people per notebook"; Pro: "Unlimited imports & audio · handwriting to text · 50 GB backup" - with the Free → Upgrade overlay CTA ([SN-BILL-001](billing.md#sn-bill-001)); Details rows (`SaneDetailRow`) displaying Name/Email and the Student status badge; 'Replay the welcome tour' → reopens Onboarding ([SN-ONB-001](onboarding.md#sn-onb-001)); 'Profiles on this account' add/switch reusing the profiles flow ([SN-AUTH-007](auth.md#sn-auth-007)); Sign out (destructive, confirm first) → Login; a guest variant showing 'Sign in to <benefit>' instead of account rows (PRD-AUTH-009). The billing actions embedded in this tab (Restore purchases, Manage subscription, entitlement-driven/lapsed plan states, student re-verify) are owned by [SN-BILL-014](billing.md#sn-bill-014) and rendered into this tab.
**Out:** the in-tab billing actions - Restore purchases, Manage subscription deep-link, entitlement-stream-driven/lapsed plan messaging and student-status re-verify - owned by [SN-BILL-014](billing.md#sn-bill-014) (which depends on this tab shell); the Upgrade overlay and entitlement logic ([SN-BILL-001](billing.md#sn-bill-001)); sign-in mechanics ([SN-AUTH-001](auth.md#sn-auth-001)); onboarding content ([SN-ONB-001](onboarding.md#sn-onb-001)); profile CRUD internals ([SN-AUTH-007](auth.md#sn-auth-007)).

#### Acceptance criteria

- [ ] Free shows the Free card + 'Upgrade to Pro · from ₹83/mo'; Pro shows the Pro card + 'Manage subscription' with the toast copy; descriptions are verbatim (PRD-SET-020, screens §12).
- [ ] Details rows render Name, Email and Student status; Student status shows 'Verified · until <date>' when verified and a 'Verify' affordance otherwise ([SN-BILL-001](billing.md#sn-bill-001)).
- [ ] 'Replay the welcome tour' reopens the onboarding overlay non-destructively (PRD-AUTH-018).
- [ ] 'Profiles on this account' lists profiles with Current/Switch and supports add (name ≤ 24 chars) → Create with the toast 'Profile added — <name>' (PRD-PROF-002).
- [ ] Sign out confirms first, then clears identity tokens only and returns to Login without deleting local notes (PRD-PROF-003).
- [ ] Guest mode hides account rows and shows inline 'Sign in to <benefit>' affordances instead of blocking (PRD-AUTH-009).
- [ ] Renders in all 17 looks + dark; destructive Sign out uses the destructive button treatment; targets ≥ 44pt.

#### Technical notes

`app/lib/settings/tabs/account_plan_tab.dart`; `SanePlanSummary`, `SaneDetailRow`, `SaneButton`(destructive) from `sane_ui` (`docs/design/component-inventory.md` §8). Entitlement read comes from a verified entitlement object, never a disk boolean (PRD-BILL-011). Email/name are shown but never logged (CWE-532). No token or entitlement secret rendered. The plan summary reads the `EntitlementProvider` contract ([SN-BILL-012](billing.md#sn-bill-012)) behind a narrow interface, with a permissive stub until billing lands in M8; SN-BILL-001 is not a scheduling blocker.

#### Security & privacy

Identity tokens live only in the secure store and are never shown or logged (MASVS-STORAGE-2, CWE-532). Sign out drops tokens but keeps local data (PRD-PROF-003). Guest partition isolation is access control (OWASP-A01). Displaying email/student status is minimal PII, not persisted beyond the account record (MASVS-PRIVACY-3).

#### UX notes

Design 'Account & plan' (screens §12). Loading: skeleton rows while the entitlement/account snapshot resolves. Error (entitlement unreachable): degrade to last-known-good and a toast, never block. Sign out is the only inverted/destructive action here.

#### Test plan

Widget: `app/test/settings/account_plan_tab_test.dart` (Free vs Pro card + CTA, guest variant, sign-out confirm). Integration: `app/integration_test/settings_account_test.dart` (replay tour reopens onboarding; add/switch profile). Golden across looks + dark.

#### Dependencies
[SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-AUTH-001](auth.md#sn-auth-001), [SN-ONB-001](onboarding.md#sn-onb-001). The plan summary card reads the verified entitlement object via the `sane_billing` EntitlementProvider contract ([SN-BILL-012](billing.md#sn-bill-012)); a permissive stub stands in until billing ships in M8, so SN-BILL-001 is not a scheduling blocker (the in-tab billing actions are added by [SN-BILL-014](billing.md#sn-bill-014) in M8).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-006

<a id="sn-set-006"></a>

**Build the Sync & backup settings tab**

| Field | Value |
|---|---|
| GitHub | #457 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-SYNC-001](sync.md#sn-sync-001) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The Sync & backup tab is the control room for local-first sync (`docs/design/screens-and-flows.md` §12; PRD-SET-001..004, PRD-SYNC). It carries the `autoSync` master switch, the `wifiOnly` metered-hold toggle, the 'Back up to' provider target, and the storage meter. The design mock shows an 'SS Cloud' default that PRD §0.4 removes: there is **no first-party cloud** (locked decision #3), so the only targets are the user's own iCloud Drive (Apple only) and Google Drive. The tab configures the sync engine but does not implement it.

#### Scope

**In:** the `SyncBackupTab` in `app/lib/settings/tabs/`; `autoSync` toggle (default on, "Sync automatically — Every page, on every device, within seconds"); `wifiOnly` toggle (default off, "Wi-Fi only — Hold audio and PDF uploads on mobile data"); `backup` segmented 'Back up to' with options **iCloud Drive** (Apple platforms only) and **Google Drive** (all), defaulting to iCloud on Apple and Google Drive elsewhere, **with 'SS Cloud' removed** (PRD-SYNC-002, §0.4); a labelled storage meter (`SaneProgress`, "1.8 GB of 5 GB" style) reinterpreted as an app-enforced soft cap on encrypted data synced into the user's own cloud (PRD-SYNC-012) with copy "Audio recordings use most of it. Pro raises the limit to 50 GB."; a global sync-status affordance and a manual 'Sync now'; first-enable routes into the key-setup flow before any upload.
**Out:** the sync transport, op-log, provider adapters and conflict merge ([SN-SYNC-001](sync.md#sn-sync-001)); key setup ([SN-CRY-001](security.md#sn-cry-001)); the detailed storage breakdown ([SN-SET-014](settings.md#sn-set-014)); billing gate for the cap ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria

- [ ] `autoSync` defaults on; turning it off means nothing leaves the device and the meter/status show 'Sync off'; turning it on for the first time launches key setup + provider choice before any upload (PRD-SYNC-001).
- [ ] 'Back up to' offers only iCloud Drive (Apple only) and Google Drive; **no 'SS Cloud' option exists anywhere** (PRD-SYNC-002, §0.4); default is iCloud on Apple, Google Drive elsewhere; exactly one active target per profile.
- [ ] `wifiOnly` defaults off; when on, the UI states that large uploads hold on mobile data (PRD-SYNC-008).
- [ ] The storage meter shows used/cap and the Pro-raises-the-limit copy; it is labelled for AT ('X of Y used') and never blocks local note-taking (PRD-SYNC-012).
- [ ] A global sync status (Up to date / Syncing… / Waiting for Wi-Fi / Paused (no key) / Offline / Attention needed) and a 'Sync now' action are present (PRD-SYNC-009).
- [ ] Changes apply immediately and persist per profile; renders in all 17 looks + dark; targets ≥ 44pt.

#### Technical notes

`app/lib/settings/tabs/sync_backup_tab.dart`; toggles/segmented from `SaneSettingRow` ([SN-SET-004](settings.md#sn-set-004)); meter via `SaneProgress`. `backup` platform-filters options by capability (iCloud only where available). Writes go through [SN-SET-003](settings.md#sn-set-003); status/'Sync now' bind to the sync engine facade ([SN-SYNC-001](sync.md#sn-sync-001), ADR-0006 `docs/adr/0006-sync-over-user-cloud-drives.md`). Provider names in the cloud are opaque ids (metadata minimisation, PRD-SYNC-007).

#### Security & privacy

Sync targets the user's own cloud with ciphertext only; this tab never exposes plaintext or keys (MASVS-STORAGE-1, decision #3). Provider auth uses TLS 1.2+ (MASVS-NETWORK-1). Turning sync on is explicit consent to egress (MASVS-PRIVACY-2); off means no network. No provider path, account or size logged (CWE-532, PRD-SYNC-007).

#### UX notes

Design 'Sync & backup' (screens §12). Offline: status reads 'Offline — will sync later'; 'Sync now' stays visible but disabled with a hint. Error (auth expired/quota full): 'Attention needed' with a single re-auth affordance (PRD-SYNC-011). The removed 'SS Cloud' option must not appear even as a disabled entry.

#### Test plan

Widget: `app/test/settings/sync_backup_tab_test.dart` (options exclude SS Cloud; platform-filtered iCloud; defaults; wifiOnly copy). Integration: `app/integration_test/settings_sync_toggle_test.dart` (autoSync off ⇒ no egress; first-on ⇒ key setup). Golden across looks + dark.

#### Dependencies

[SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-SYNC-001](sync.md#sn-sync-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-007

<a id="sn-set-007"></a>

**Build the Handwriting & stylus settings tab**

| Field | Value |
|---|---|
| GitHub | #458 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-ED-005](editor.md#sn-ed-005), [SN-INK-001](ink.md#sn-ink-001) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The Handwriting & stylus tab tunes how the pen and hand behave (`docs/design/screens-and-flows.md` §12; PRD-SET-005..010). It owns six preferences: `palm` (palm rejection), `pressure` (pressure sensitivity), `finger` (draw with finger), `leftHanded` (moves the page rail left), `dock` (toolbar position: Bottom/Top/Left/Right), and `dblTap` (double-tap the pencil: Eraser/Previous tool/Colors). These preferences drive real editor and ink behaviour, so each control must apply live: toggling left-handed must flip the editor rail immediately, and the dock setting must match drag-to-dock. This tab is the settings-side home; the behaviour lives in the ink and editor areas.

#### Scope

**In:** the `StylusInputTab` in `app/lib/settings/tabs/`; the four toggles with verbatim copy — `palm` (on) "Palm rejection — Ignore your resting hand while you write"; `pressure` (on) "Pressure sensitivity — Thicker ink when you press harder"; `finger` (off) "Draw with finger — Off means fingers only scroll and pinch"; `leftHanded` (off) "Left-handed mode — Moves the page rail to the left so your hand never covers it"; the `dock` segmented (Bottom/Top/Left/Right, default bottom) with the note "Or drag the toolbar by its grip to any edge"; the `dblTap` segmented (Eraser/Previous tool/Colors, default Eraser) with the note "Apple Pencil and S Pen"; a link into the calibration/pressure-test area ([SN-SET-008](settings.md#sn-set-008)); capability-aware disabling (e.g. double-tap hidden where no supported stylus).
**Out:** the actual palm-rejection/pressure pipeline ([SN-INK-001](ink.md#sn-ink-001)); the palette-dock behaviour and drag-to-dock ([SN-ED-005](editor.md#sn-ed-005)); the calibration surface ([SN-SET-008](settings.md#sn-set-008)).

#### Acceptance criteria

- [ ] All six controls exist with the exact keys, defaults and verbatim copy of PRD-SET-005..010.
- [ ] Toggling `leftHanded` flips the editor page rail to the left immediately for the active profile (screens §7.7).
- [ ] `dock` and drag-to-dock stay in sync: changing one updates the other (screens §7.3, PRD-SET-009).
- [ ] `dblTap` shows Eraser/Previous tool/Colors and is hidden or disabled with an explanatory hint on devices with no supported stylus (capability query, not platform check).
- [ ] Every change applies immediately, persists per profile, and is reflected in any open editor without a reload (PRD-SET-019).
- [ ] Renders in all 17 looks + dark; segmented controls keyboard-operable on web; targets ≥ 44pt.

#### Technical notes

`app/lib/settings/tabs/stylus_input_tab.dart`; `SaneSettingRow`/`SaneSegmented`/`SaneToggle` ([SN-SET-004](settings.md#sn-set-004)). Writes via [SN-SET-003](settings.md#sn-set-003). `palm`/`pressure`/`finger` are consumed by the ink capture pipeline ([SN-INK-001](ink.md#sn-ink-001), ADR-0008 `docs/adr/0008-ink-pipeline-and-low-latency-surfaces.md`); `dock`/`leftHanded` by the editor ([SN-ED-005](editor.md#sn-ed-005)); `dblTap` maps to the stylus double-tap gesture (stylus plugin). Capability query drives availability, never a raw platform check.

#### Security & privacy

None beyond baseline: these are local input preferences; no ink coordinates, content or PII logged (CWE-532, MASVS-PRIVACY-3).

#### UX notes

Design 'Handwriting & stylus' (screens §12). The calibration link opens [SN-SET-008](settings.md#sn-set-008). Where a control is capability-gated, show a muted hint ('Requires a supported stylus'), never a dead toggle. RTL composes with left-handed mode.

#### Test plan

Widget: `app/test/settings/stylus_input_tab_test.dart` (keys/defaults/copy; capability gating of dblTap). Integration: `app/integration_test/settings_lefthanded_test.dart` (toggle flips editor rail live; dock↔drag sync). Golden across looks + dark.

#### Dependencies

[SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-ED-005](editor.md#sn-ed-005), [SN-INK-001](ink.md#sn-ink-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-008

<a id="sn-set-008"></a>

**Build the stylus calibration and pressure-test area**

| Field | Value |
|---|---|
| GitHub | #459 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | settings, input-gestures, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-007](settings.md#sn-set-007), [SN-INK-001](ink.md#sn-ink-001) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

PRD-SET-024 requires the Handwriting & stylus tab to provide a concrete place to tune `pressure`/`palm`: a scratch area that previews the pressure→width mapping and palm rejection live, plus, where the platform exposes it, a pressure-curve adjustment. This is the difference between a checkbox and a stylus a student actually trusts — few competitors offer it. The exact curve model is owned by the editor/ink PRD; this issue delivers the interactive settings surface that drives and visualises it.

#### Scope

**In:** a `StylusCalibrationArea` reachable from the Handwriting & stylus tab ([SN-SET-007](settings.md#sn-set-007)); a live scratch canvas that renders strokes with the current pressure/tilt mapping so pressing harder visibly thickens ink; a real-time pressure readout (0–1) and a palm-rejection indicator that shows when a resting-hand touch is being ignored; a pressure-curve control (e.g. soft/medium/firm presets plus a draggable curve where the platform reports pressure) that writes a `pressureCurve` preference; a 'Reset curve' action; graceful degradation on devices that report no pressure (show tilt/velocity-only preview and hide the curve).
**Out:** the underlying stabiliser/outline geometry and the authoritative curve math ([SN-INK-001](ink.md#sn-ink-001), ADR-0009 brush dynamics); non-stylus platforms (web finger) beyond a basic preview.

#### Acceptance criteria

- [ ] The scratch area draws live and stroke width visibly tracks pressure using the active mapping; releasing clears or lets the user clear it.
- [ ] A numeric pressure readout updates each pointer sample and a palm-rejection indicator fires when a stylus is active and a finger/palm touch is suppressed (screens §7 palm behaviour).
- [ ] A pressure-curve control writes/reads `pressureCurve` per profile and the scratch preview updates immediately on change; 'Reset curve' restores the default.
- [ ] On a device that reports no stylus pressure, the curve control is hidden with an explanatory hint and the preview still works from tilt/velocity (capability query).
- [ ] The scratch canvas keeps pen-down→pixel within the platform latency budget (≤ 16 ms ProMotion iPad, ≤ 25 ms mid Android) and logs nothing on the draw path (CLAUDE.md §8).
- [ ] Renders in all 17 looks + dark; the readout has an AT-exposed value.

#### Technical notes

`app/lib/settings/stylus_calibration.dart` embedding a minimal ink surface from `packages/sane_ink`/`packages/sane_render` ([SN-INK-001](ink.md#sn-ink-001)); reuse the active stabiliser and pressure mapping so the preview is truthful. `pressureCurve` persists via [SN-SET-003](settings.md#sn-set-003). Capability comes from the stylus plugin (Apple Pencil/S Pen/USI), not a platform string. Draw path stays on the UI isolate with no logging (ADR-0008).

#### Security & privacy

None beyond baseline: the scratch ink is ephemeral, never persisted to a note, never uploaded, never logged (CWE-532, MASVS-PRIVACY-3).

#### UX notes

Design 'Handwriting & stylus' (screens §12) — this is the tuning home referenced by PRD-SET-024. Empty state: a hint 'Draw here to test your pen'. Reduce-motion keeps the live width response (functional) but drops decorative flourish. Provide a keyboard/no-stylus fallback description on web.

#### Test plan

Widget: `app/test/settings/stylus_calibration_test.dart` (curve write/read, capability hiding, reset). Golden: pressure-curve preview across looks + dark. Perf: `app/integration_test/settings_calibration_latency_test.dart` asserts the scratch canvas meets the budget via `tools/perf_harness`.

#### Dependencies

[SN-SET-007](settings.md#sn-set-007), [SN-INK-001](ink.md#sn-ink-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-009

<a id="sn-set-009"></a>

**Build the Appearance settings tab (look, dark mode, wallpaper)**

| Field | Value |
|---|---|
| GitHub | #460 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, theming, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-DS-015](theming.md#sn-ds-015) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-CODE-4`, `CWE-400`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The Appearance tab is where a student picks one of the 17 looks, toggles dark mode, and sets a wallpaper (`docs/design/screens-and-flows.md` §12; PRD-SET-011/012/013/021). The look and dark-mode choices are per-profile and restyle the entire app including notebook pages; the wallpaper is explicitly device-scoped ('saved on this device'). The reusable theme-card grid, dark toggle and wallpaper card are built as design-system widgets ([SN-DS-015](theming.md#sn-ds-015), [SN-DS-014](theming.md#sn-ds-014)); this tab integrates them into Settings, wires persistence, and enforces the design invariant that PDFs keep their original colours even in dark mode.

#### Scope

**In:** the `AppearanceTab` in `app/lib/settings/tabs/`; the `Look` control — the 17-card `SaneThemeGrid` (grouped Warm/Clean/Bold/Soft/Raw) writing `look` (default paper) with copy "Seventeen looks… Every one restyles the whole app, including your notebooks."; the `darkMode` toggle (default system) with copy "Every look has a night version; PDFs keep their original colors."; the wallpaper card (`SaneWallpaperCard`) — Upload photo + 6 presets (Aurora, Dusk, Ink wash, Sand, Meadow, Graphite) + Blur (0–40px) + Veil (0–80%) + Remove, persisted **device-scoped** (localStorage/device store), with a "Showing <name> — saved on this device" line; enforcing that changing look/dark never recolours PDF pages; wallpaper backdrop turns panels to frosted glass while honouring `prefers-reduced-transparency`.
**Out:** the token/ThemeExtension engine and the 17 looks themselves ([SN-DS-002](design-system.md#sn-ds-002), [SN-DS-011](theming.md#sn-ds-011)); the reusable grid/wallpaper widgets ([SN-DS-015](theming.md#sn-ds-015), [SN-DS-014](theming.md#sn-ds-014)); the wallpaper image decode/downscale internals (in [SN-DS-014](theming.md#sn-ds-014)).

#### Acceptance criteria

- [ ] The Look grid shows all 17 named looks; selecting one sets `look` per profile and restyles the whole app live including notebook pages (PRD-SET-011).
- [ ] The dark-mode toggle sets `darkMode` (system/light/dark) per profile; every look renders a correct night variant (PRD-SET-012).
- [ ] Switching look or dark mode never alters PDF page colours (design invariant, PRD-SET-021).
- [ ] Wallpaper: upload + 6 presets work; Blur (0–40px) and Veil (0–80%) sliders update live; 'Remove' clears it; the choice is device-scoped and survives restart but does **not** sync or follow the profile to another device (PRD-SET-013, PRD-SET-019).
- [ ] With a wallpaper set, panels become frosted glass but drop to opaque under `prefers-reduced-transparency`; note text stays legible (contrast ≥ 4.5:1).
- [ ] Uploaded images are downscaled and decoded safely off the UI isolate under a size cap; a hostile/oversized image fails closed to a toast (MASVS-CODE-4, CWE-400).
- [ ] Correct across all 17 looks + dark; theme cards are a keyboard-navigable radio group with named labels.

#### Technical notes

`app/lib/settings/tabs/appearance_tab.dart` consuming `SaneThemeGrid`/`SaneToggle`/`SaneWallpaperCard` from [SN-DS-015](theming.md#sn-ds-015)/[SN-DS-014](theming.md#sn-ds-014). `look`/`darkMode` persist per profile via [SN-SET-003](settings.md#sn-set-003) and drive `SaneLookScope` ([SN-DS-011](theming.md#sn-ds-011)). Wallpaper meta persists device-scoped (excluded from the sync op-log). PDF-colour invariant enforced by the PDF render layer never inheriting the look's ground/ink tokens. Downscale/decode uses the hardened image path (off-isolate, capped).

#### Security & privacy

Wallpaper upload is untrusted image input: validate type/size, cap before decode, decode off the UI isolate (MASVS-CODE-4, CWE-400). The image stays on-device and is never uploaded or logged (MASVS-PRIVACY-3, CWE-532). Look/dark are non-sensitive local preferences.

#### UX notes

Design 'Appearance' (screens §12; component inventory §8 `SaneThemeGrid`, `SaneWallpaperCard`). Looks are grouped Warm/Clean/Bold/Soft/Raw. Empty wallpaper state shows the presets. Error on a bad upload → toast, no red. Reduce-motion cross-fades look changes.

#### Test plan

Widget: `app/test/settings/appearance_tab_test.dart` (17 cards, look/dark persist per profile, wallpaper device-scoped, blur/veil ranges, reduced-transparency fallback). Golden: `app/test/settings/golden/appearance_tab_golden_test.dart` across looks + dark. Security: `app/test/settings/wallpaper_upload_test.dart` (oversized/hostile image fails closed).

#### Dependencies

[SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-DS-015](theming.md#sn-ds-015).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-010

<a id="sn-set-010"></a>

**Build the Notifications settings tab**

| Field | Value |
|---|---|
| GitHub | #461 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, notifications |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-NOTF-002](notifications.md#sn-notf-002) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PLATFORM-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The Notifications tab carries three category toggles (`docs/design/screens-and-flows.md` §12; PRD-SET-014/015/016, PRD-NOTIF): `reminders` (class reminders, on), `sharedNotif` (shared notebook activity, on), and `tips` (weekly tip, off). These toggles gate categories only — the OS notification permission is requested separately at first relevant use, not here (PRD-NOTIF-001). Shared-activity notifications depend on collaboration (M6) and stay inert until then. Class reminders need a timetable the app does not yet collect, delivered by [SN-SET-011](settings.md#sn-set-011).

#### Scope

**In:** the `NotificationsTab` in `app/lib/settings/tabs/`; the three toggles with verbatim copy — `reminders` (on) "Class reminders — Open the right notebook 5 minutes before a lecture"; `sharedNotif` (on) "Shared notebook activity — When someone writes in a notebook you share"; `tips` (off) "Tips — One short tip a week, never more"; an inline note that turning a category on will request the OS notification permission at first use if not yet granted; a link to the class-timetable editor ([SN-SET-011](settings.md#sn-set-011)) shown under `reminders`; the `sharedNotif` row disabled with an 'Available with shared notebooks' hint until collaboration ships (PRD-NOTIF-003).
**Out:** notification scheduling/delivery ([SN-NOTF-001](notifications.md#sn-notf-001)); the timetable editor ([SN-SET-011](settings.md#sn-set-011)); the OS permission request UI (owned by the privacy permissions panel [SN-PRV-004](privacy.md#sn-prv-004)).

#### Acceptance criteria

- [ ] All three toggles exist with the exact keys, defaults and verbatim copy of PRD-SET-014/015/016.
- [ ] Toggling a category on does not itself grant the OS permission; the tab explains the permission is requested at first relevant use (PRD-NOTIF-001).
- [ ] `sharedNotif` is present but disabled with an explanatory hint until collaboration ships (PRD-NOTIF-003).
- [ ] Enabling `reminders` surfaces a link to set up a class timetable ([SN-SET-011](settings.md#sn-set-011)).
- [ ] Changes apply immediately and persist per profile; renders in all 17 looks + dark; targets ≥ 44pt.

#### Technical notes

`app/lib/settings/tabs/notifications_tab.dart`; `SaneSettingRow`/`SaneToggle` ([SN-SET-004](settings.md#sn-set-004)); writes via [SN-SET-003](settings.md#sn-set-003). Category toggles gate the notification scheduler ([SN-NOTF-001](notifications.md#sn-notf-001)); nothing here calls the OS permission API directly (that is point-of-use, [SN-PRV-004](privacy.md#sn-prv-004)). Reminders/tips are locally scheduled, no server (PRD-NOTIF-002/004).

#### Security & privacy

Notification categories are consent state (MASVS-PRIVACY-2). Payloads must never carry note content and are suppressed for locked profiles — enforced by the scheduler, referenced here (MASVS-PLATFORM-3, PRD-NOTIF-001, PRD-LEAK-004). No PII logged (CWE-532).

#### UX notes

Design 'Notifications' (screens §12). The disabled `sharedNotif` row uses the muted-hint pattern, never a dead toggle. Tips copy promises 'never more' than weekly and one-tap off from the notification itself.

#### Test plan

Widget: `app/test/settings/notifications_tab_test.dart` (keys/defaults/copy; sharedNotif disabled pre-collab; reminders link present). Golden across looks + dark.

#### Dependencies
[SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-NOTF-002](notifications.md#sn-notf-002) (notification facade + categories the toggles gate; the specific child replacing the epic-level dependency on SN-NOTF-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-011

<a id="sn-set-011"></a>

**Build the class-reminder timetable editor and local scheduling**

| Field | Value |
|---|---|
| GitHub | #462 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-010](settings.md#sn-set-010), [SN-NOTF-003](notifications.md#sn-notf-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-3`, `CWE-532` |
| Extra labels | agent-ready, needs-decision |

#### Context

'Class reminders — Open the right notebook 5 minutes before a lecture' (`reminders`, PRD-SET-014) needs a class schedule the app does not currently collect (design open question 19). PRD-NOTIF-002 requires a lightweight timetable source: a manual class-schedule editor (subject → day/time → notebook) and, optionally, device-calendar import with explicit consent. Reminders MUST be scheduled locally, never via a server. **needs-decision** (CLAUDE.md §13, PRD §15.4): whether v1 ships the manual editor only, calendar import, or both, and in which milestone — this issue implements the manual editor as the decisive default and gates calendar import behind the decision.

#### Scope

**In:** a `TimetableEditor` reachable from the Notifications tab ([SN-SET-010](settings.md#sn-set-010)); create/edit/delete recurring class entries (subject, weekday(s), start time, linked notebook) persisted per profile; local notification scheduling that fires 5 minutes before each class and deep-links to the linked notebook (never auto-mutating it, CLAUDE.md §7); enable/disable per entry; graceful handling when a linked notebook is deleted (entry flagged, no crash); a stub/flag for optional device-calendar import (behind the maintainer decision, off by default).
**Out:** the notification delivery engine and permission request ([SN-NOTF-001](notifications.md#sn-notf-001), [SN-PRV-004](privacy.md#sn-prv-004)); calendar-import implementation until the decision lands; collaboration-driven notifications.

#### Acceptance criteria

- [ ] A user can add a class entry (subject, day(s), time, notebook) and see it listed; edit and delete work; entries persist per profile.
- [ ] With `reminders` on and OS permission granted, a local notification fires ~5 minutes before each scheduled class and, on tap, opens the linked notebook read-only in the editor (deep link lands in view, never auto-mutates — CLAUDE.md §7).
- [ ] Reminders are scheduled entirely locally; no network call is made to schedule or deliver them (PRD-NOTIF-002).
- [ ] Deleting the linked notebook flags the entry with a fix-up prompt rather than crashing or firing a broken reminder.
- [ ] Calendar import is present only as a disabled/flagged option pending the maintainer decision; the default path is the manual editor.
- [ ] Renders in all 17 looks + dark; time/day pickers are AT-labelled and keyboard-operable on web.

#### Technical notes

`app/lib/settings/timetable_editor.dart`; entries persist via [SN-SET-003](settings.md#sn-set-003) (per-profile). Local scheduling through the notification facade ([SN-NOTF-001](notifications.md#sn-notf-001)) using platform local-notification APIs (`docs/platform/*`), rescheduled on entry change and app launch. Calendar import, if enabled later, requests calendar permission at point of use ([SN-PRV-004](privacy.md#sn-prv-004)) with a purpose string. Deep links use the verified in-app route, landing in view/confirm.

#### Security & privacy

Timetable entries are minimal personal data kept on-device (MASVS-PRIVACY-1); notification payloads carry only a user-authored title, never note content, and are suppressed for locked profiles (MASVS-PLATFORM-3, PRD-NOTIF-001). Calendar access, if used, is point-of-use consent. No schedule or notebook name logged (CWE-532).

#### UX notes

Design gap resolved by PRD-NOTIF-002 (screens §12 'Notifications'; open question 19). Empty state: 'Add your classes and we'll open the right notebook before each one.' Error (permission denied): a toast + link to OS settings. Reduce-motion static transitions.

#### Test plan

Widget: `app/test/settings/timetable_editor_test.dart` (add/edit/delete, deleted-notebook flag, calendar-import gated). Integration: `app/integration_test/settings_reminder_schedule_test.dart` (a scheduled reminder deep-links to the notebook in view mode; no network). Golden across looks + dark.

#### Dependencies
[SN-SET-010](settings.md#sn-set-010), [SN-NOTF-003](notifications.md#sn-notf-003) (reminder scheduler with recurrence + local scheduling; the specific child replacing the epic-level dependency on SN-NOTF-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-012

<a id="sn-set-012"></a>

**Build the Privacy & export settings tab**

| Field | Value |
|---|---|
| GitHub | #463 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-PRV-001](privacy.md#sn-prv-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `OWASP-A02`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The Privacy & export tab makes the local-first promise legible and lets a student take their data out (`docs/design/screens-and-flows.md` §12; PRD-SET-017/018/022, PRD-PRIV). It owns the `onDevice` toggle (on-device handwriting recognition, default on) and the 'Export everything' action, and it is the entry point into the fuller privacy dashboard ([SN-PRV-001](privacy.md#sn-prv-001)). The `onDevice` default of **on** is a locked-decision guarantee (#6): ink never leaves the device to become searchable, and turning it off is not permission to silently send ink to the cloud — cloud inference always needs its own per-request opt-in (PRD-SET-022).

#### Scope

**In:** the `PrivacyExportTab` in `app/lib/settings/tabs/`; the `onDevice` toggle (on) with verbatim copy "On-device handwriting recognition — Your ink never leaves the device to become searchable"; the 'Export everything' action (`exportAll`) that runs the local, network-free ZIP export (PDF + .sane per notebook) with the toast "Preparing a ZIP of every notebook (PDF + .sane)…" and the one-time unencrypted-archive warning; a 'What leaves this device' entry and links into the privacy dashboard, permissions panel, telemetry consent, and data-deletion flows ([SN-PRV-002](privacy.md#sn-prv-002), [SN-PRV-004](privacy.md#sn-prv-004), [SN-PRV-009](privacy.md#sn-prv-009), [SN-PRV-006](privacy.md#sn-prv-006)); a visible Privacy Policy link.
**Out:** the export/archive engine internals (`BKP`, owned by the storage/export area); the privacy dashboard, permissions panel, telemetry surface and deletion flows themselves ([SN-PRV-001](privacy.md#sn-prv-001) children); cloud-AI opt-in UI (owned by the AI area).

#### Acceptance criteria

- [ ] `onDevice` defaults on with verbatim copy; turning it off only relaxes on-device indexing and does NOT enable any cloud send — cloud inference still needs its own per-request opt-in with a 'data leaves device' indicator (PRD-SET-022, decision #6).
- [ ] 'Export everything' runs with no network, produces a ZIP of PDF + .sane for the current profile, shows the toast, and hands the archive to the OS share/save sheet (PRD-BKP-001/002).
- [ ] A one-time warning states the exported archive is unencrypted and the user's responsibility to store safely (PRD-BKP-002).
- [ ] The tab links to the privacy dashboard, permissions, telemetry consent, data-deletion and the Privacy Policy ([SN-PRV-001](privacy.md#sn-prv-001)).
- [ ] Changes apply immediately and persist per profile; renders in all 17 looks + dark; targets ≥ 44pt.

#### Technical notes

`app/lib/settings/tabs/privacy_export_tab.dart`; `SaneSettingRow`/`SaneToggle`/`SaneButton` ([SN-SET-004](settings.md#sn-set-004)); `onDevice` persists via [SN-SET-003](settings.md#sn-set-003) and is read by the recognition/index pipeline. 'Export everything' calls the export service (decrypts to cleartext into the archive, off the UI isolate). Dashboard links route to [SN-PRV-001](privacy.md#sn-prv-001) surfaces.

#### Security & privacy

`onDevice` is a privacy consent guarantee (MASVS-PRIVACY-1/2): default on keeps ink local; no analytics/ad SDK ships (MASVS-PRIVACY-4). The export archive is the user's plaintext copy — it is decrypted only on-device and the disclosure risk is flagged to the user (OWASP-A02, LINDDUN-Disclosure). No content, path, email or phone logged (CWE-532).

#### UX notes

Design 'Privacy & export' (screens §12). Export shows a progress toast (not just a spinner) for large libraries. The unencrypted-archive warning appears once and is dismissible. Links to the dashboard use the standard row-with-chevron pattern.

#### Test plan

Widget: `app/test/settings/privacy_export_tab_test.dart` (onDevice default/copy; off does not enable cloud; export warning shown once; dashboard links). Integration: `app/integration_test/settings_export_all_test.dart` (export runs offline and yields a ZIP with PDF + .sane). Golden across looks + dark.

#### Dependencies

[SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-PRV-001](privacy.md#sn-prv-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-013

<a id="sn-set-013"></a>

**Build the Security settings section (app lock, recovery, devices, leak controls)**

| Field | Value |
|---|---|
| GitHub | #464 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, security, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-CRY-001](security.md#sn-cry-001), [SN-AUTH-001](auth.md#sn-auth-001) |
| Security controls | `MASVS-AUTH-1`, `MASVS-STORAGE-2`, `MASVS-PLATFORM-3`, `MASVS-CRYPTO-2`, `OWASP-A04`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

PRD-SET-023 requires a Security area (under Sync & backup or its own row) that surfaces the device- and account-protection controls in one place: app-lock configuration, per-profile lock, recovery-code re-view/regenerate, paired devices, and the clipboard/screenshot protections. These features are implemented by the identity, crypto and platform-hardening areas; this issue builds the **settings surface** that configures and routes to them, so a student can find every protection in one predictable place. It composes app lock (`LOCK`), leak protections (`LEAK`), recovery (`KEY`), and multi-device (`SYNC`).

#### Scope

**In:** a `SecuritySection` in `app/lib/settings/`; App Lock config — enable/disable + timeout (Immediately / 1 min / 5 min / 15 min) using device biometric/passcode, off by default (PRD-LOCK-001); a per-profile lock control (PRD-PROF-005); a 'Hide contents when app is backgrounded' toggle and a screenshot/screen-record deterrence toggle (PRD-LEAK-001/002); a 'View/Regenerate recovery code' action gated behind biometric/app-lock (PRD-KEY-006); a 'Paired devices' list entry (name, platform, last-seen, revoke) linking to the multi-device screen (PRD-SYNC-014); honest copy that the app never adds its own weaker PIN that undercuts the platform gate (PRD-LOCK-002).
**Out:** the biometric/app-lock engine ([SN-AUTH-001](auth.md#sn-auth-001), LOCK requirements); recovery-code generation/escrow and key rotation ([SN-CRY-001](security.md#sn-cry-001), [SN-CRY-003](security.md#sn-cry-003)); FLAG_SECURE/iOS overlay implementation (platform hardening); the paired-devices screen internals ([SN-SYNC-001](sync.md#sn-sync-001)).

#### Acceptance criteria

- [ ] App Lock can be enabled with a timeout choice (Immediately/1/5/15 min) and, when on, requires device biometric or passcode on launch and on return after the timeout; off by default (PRD-LOCK-001).
- [ ] The section exposes a per-profile lock control and never offers a custom app PIN that weakens the platform gate (PRD-PROF-005, PRD-LOCK-002).
- [ ] 'Hide contents when app is backgrounded' and screenshot/record deterrence toggles exist and are clearly labelled best-effort, not unbreakable (PRD-LEAK-001/002).
- [ ] 'View/Regenerate recovery code' is gated behind biometric/app-lock and routes to the recovery-code surface; regenerate warns it invalidates the old code (PRD-KEY-006).
- [ ] 'Paired devices' links to the multi-device screen and reflects the current device name (PRD-SYNC-014).
- [ ] Renders in all 17 looks + dark; every control is AT-labelled; targets ≥ 44pt.

#### Technical notes

`app/lib/settings/security_section.dart`; toggles/segments via `SaneSettingRow` ([SN-SET-004](settings.md#sn-set-004)); app-lock timeout persists via [SN-SET-003](settings.md#sn-set-003). Biometric flows call the auth/biometric facade ([SN-AUTH-001](auth.md#sn-auth-001)); recovery routes to [SN-CRY-003](security.md#sn-cry-003); leak toggles set flags consumed by the platform-hardening layer (Android FLAG_SECURE, iOS resign-active overlay, MASVS-PLATFORM-3). No PIN of our own (MASVS-AUTH-1).

#### Security & privacy

This is the security control plane: app lock (MASVS-AUTH-1), secure token/key storage referenced not exposed (MASVS-STORAGE-2), recovery escrow (MASVS-CRYPTO-2), screenshot/clipboard/backup hardening (MASVS-PLATFORM-3). Insecure design avoided by never adding a weaker gate (OWASP-A04). No secret, key or recovery code is rendered inline or logged (CWE-532).

#### UX notes

Design has no explicit Security tab (six-tab design); PRD-SET-023 places this as a section under Sync & backup or its own row — implemented here as a labelled section reachable from Sync & backup, noted in Technical notes as a sensible default. Deterrence toggles state 'best-effort'. Recovery action shows a biometric prompt before revealing anything.

#### Test plan

Widget: `app/test/settings/security_section_test.dart` (app-lock enable+timeout; no custom PIN; recovery gated; leak toggles; paired-devices link). Integration: `app/integration_test/settings_app_lock_test.dart` (lock on background+timeout requires biometric). Golden across looks + dark.

#### Dependencies

[SN-SET-002](settings.md#sn-set-002), [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004), [SN-CRY-001](security.md#sn-cry-001), [SN-AUTH-001](auth.md#sn-auth-001).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-014

<a id="sn-set-014"></a>

**Build the storage usage breakdown view**

| Field | Value |
|---|---|
| GitHub | #465 |
| Type | feature |
| Priority | p3 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, storage |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-006](settings.md#sn-set-006), [SN-CORE-004](storage.md#sn-core-004), [SN-CORE-014](storage.md#sn-core-014) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, good first issue |

#### Context

The Sync & backup storage meter ("1.8 GB of 5 GB") answers 'how much', but a student who is near the cap needs 'what' and 'how do I reduce it'. This view expands the meter into a breakdown by content type (audio, PDFs, images, ink/notes) with the largest notebooks called out, so the "Audio recordings use most of it" copy (screens §12) becomes actionable. It reads the local content-addressed blob store and DB; it is a read-only reporting surface plus links to the places a user can free space.

#### Scope

**In:** a `StorageUsageView` reachable from the storage meter ([SN-SET-006](settings.md#sn-set-006)); a total used/cap headline; a by-type breakdown (audio, PDFs, images, ink/notes, other) with sizes and proportional bars; the top few space-consuming notebooks with a jump-to link; a 'what counts toward the cap' explanation tied to the soft-cap reinterpretation (PRD-SYNC-012); links to Trash and to Export-then-delete for reclaiming space; a refresh that recomputes off the UI isolate.
**Out:** the sync soft-cap enforcement/pause logic ([SN-SYNC-001](sync.md#sn-sync-001)); deleting notebooks (library area); the Upgrade flow ([SN-BILL-001](billing.md#sn-bill-001)); blob GC ([SN-CORE-020](storage.md#sn-core-020)).

#### Acceptance criteria

- [ ] The view shows total used vs cap and a by-type breakdown whose parts sum to the total; each row is AT-labelled with type and size.
- [ ] The top space-consuming notebooks are listed with sizes and a jump-to affordance.
- [ ] The breakdown is computed off the UI isolate and shows a skeleton while computing; a large library does not jank the UI (no frame > 16.7 ms).
- [ ] Copy explains what counts toward the soft cap (PRD-SYNC-012) and never blocks local note-taking.
- [ ] Renders in all 17 looks + dark; targets ≥ 44pt.

#### Technical notes

`app/lib/settings/storage_usage_view.dart`; reads sizes from the drift DB ([SN-CORE-004](storage.md#sn-core-004)) and the content-addressed blob store ([SN-CORE-014](storage.md#sn-core-014)) via a one-shot `Isolate.run` aggregation; `SaneProgress` bars per type. No blob content read into memory — sizes only. Values are bytes, formatted for locale.

#### Security & privacy

None beyond baseline: reports sizes only, never note content, titles or PII; nothing logged (MASVS-PRIVACY-3, CWE-532); computation stays on-device.

#### UX notes

Design 'Sync & backup' storage meter (screens §12) expanded. Loading: skeleton bars. Empty (tiny library): 'You're using almost no space.' Reduce-motion: static bars.

#### Test plan

Widget: `app/test/settings/storage_usage_view_test.dart` (breakdown sums to total, AT labels, skeleton while computing). Unit: aggregation function over a seeded blob store. Golden across looks + dark.

#### Dependencies

[SN-SET-006](settings.md#sn-set-006), [SN-CORE-004](storage.md#sn-core-004), [SN-CORE-014](storage.md#sn-core-014).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-015

<a id="sn-set-015"></a>

**Build the About, licences and help screen**

| Field | Value |
|---|---|
| GitHub | #466 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings, docs |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-002](settings.md#sn-set-002), [SN-SET-004](settings.md#sn-set-004) |
| Security controls | `MASVS-CODE-3`, `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, good first issue |

#### Context

Every app needs an About/licences surface for legal compliance (open-source licence attributions), support, and version transparency. The six-tab design (`docs/design/screens-and-flows.md` §12) has no dedicated Help tab; this screen fills that scope item (task brief 'about/licences screen' + 'Help'): app version/build, open-source licences, and links to help/support, Privacy Policy and Terms. It is reachable from Account & plan (and can be promoted to a Help tab later — a minor placement decision noted below). Rendering third-party licences accurately is a supply-chain/compliance requirement.

#### Scope

**In:** an `AboutScreen` in `app/lib/settings/`; app name, version and build number; a generated **open-source licences** list (Flutter's `showLicensePage`/`LicenseRegistry` plus any native plugin notices) rendered offline; links to Help/support (FAQ/contact), Privacy Policy and Terms (live URLs, matching the login fine print, PRD-AUTH-005); an acknowledgement that the mascot art is a placeholder where relevant; a build-flavour indicator in non-release builds (e.g. the AUTH-BYPASS watermark note is elsewhere, but the dev flavour is shown here).
**Out:** authoring the actual help/FAQ content (docs/website area); the Privacy Policy/Terms text ([SN-PRV-017](privacy.md#sn-prv-017)); a 7th Settings tab (placement decision — see UX notes).

#### Acceptance criteria

- [ ] The screen shows the app name, version and build number sourced from the build, not hard-coded.
- [ ] Open-source licences render from the license registry and are complete (every bundled package's notice appears) and scrollable offline.
- [ ] Help/support, Privacy Policy and Terms links open live URLs; the Privacy/Terms links match the login fine print (PRD-AUTH-005).
- [ ] In dev/profile builds the current build flavour is indicated; in release it is not.
- [ ] Renders in all 17 looks + dark; the licences list is keyboard-scrollable on web and AT-navigable; targets ≥ 44pt.

#### Technical notes

`app/lib/settings/about_screen.dart`; version/build from `package_info`/the build config; licences via `LicenseRegistry`/`showLicensePage`, with native plugin notices registered so they appear. Links use the hardened URL launcher (verified https only). Reached from [SN-SET-005](settings.md#sn-set-005) (Account & plan) as a row.

#### Security & privacy

Rendering the full licence set satisfies open-source attribution/compliance (MASVS-CODE-3, supply-chain hygiene). External links are https-only and open in the platform browser, not an in-app webview collecting anything (MASVS-PRIVACY-3). No device identifier or PII shown or logged (CWE-532).

#### UX notes

Design shows six tabs and no Help tab; this screen is reached from Account & plan as an 'About & licences' / 'Help' row, which is the sensible default — promoting it to a seventh Settings tab is a minor maintainer placement choice, not a blocker (noted here rather than blocking with needs-decision). Empty/error: if a link fails, a toast, never a dead tap.

#### Test plan

Widget: `app/test/settings/about_screen_test.dart` (version present, licences list non-empty, links present, flavour shown only in non-release). Golden across looks + dark.

#### Dependencies

[SN-SET-002](settings.md#sn-set-002), [SN-SET-004](settings.md#sn-set-004).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

### SN-SET-016

<a id="sn-set-016"></a>

**Implement reset settings to defaults**

| Field | Value |
|---|---|
| GitHub | #772 |
| Type | task |
| Priority | p3 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | settings |
| Size | XS |
| SDLC | implementation |
| Parent | [SN-SET-001](settings.md#sn-set-001) |
| Depends on | [SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, good first issue |

#### Context

Students experiment with looks, stylus tuning and toggles; a one-tap 'Reset settings to defaults' lets them get back to a known-good state without hunting through six tabs. This is a small, self-contained action over the preferences backbone ([SN-SET-003](settings.md#sn-set-003)): it restores every preference key to its §7.1 default for the active profile, after an explicit confirmation, without touching notes, account, sync data or keys. It is the 'reset' half of the task brief's 'reset/export' scope (export is the Privacy tab's Export-everything).

#### Scope

**In:** a 'Reset settings to defaults' destructive action (in the Privacy & export tab or Account & plan — see UX) that, after a confirm dialog, writes `Preferences.defaults()` for the active profile via the LWW-registered path so the reset propagates like any other change; a clear statement of exactly what resets (preferences only) and what does not (notes, account, sync, keys, wallpaper image kept unless explicitly included); a toast on completion.
**Out:** wiping notes or profile data (that is the privacy dashboard's delete flows, [SN-PRV-006](privacy.md#sn-prv-006)); resetting account/entitlement; a factory-reset of the whole app.

#### Acceptance criteria

- [ ] The action is destructive and confirms first; cancel makes no change.
- [ ] On confirm, every preference key returns to its §7.1 default for the active profile and the change is visible immediately across open surfaces (e.g. look reverts to paper, dock to bottom).
- [ ] Notes, folders, account, sync configuration and encryption keys are untouched; the confirm copy states this explicitly.
- [ ] The reset writes through the LWW path so it converges across devices without clobbering newer legitimate changes on other devices incorrectly (higher-HLC wins).
- [ ] A completion toast is shown; renders in all 17 looks + dark; the destructive control is AT-labelled.

#### Technical notes

Small handler in `app/lib/settings/` calling a `SettingsRepository.resetToDefaults(profileId)` added to [SN-SET-003](settings.md#sn-set-003) that batch-writes defaults through the register path. Confirm dialog via `SaneDialog` ([SN-DS-019](design-system.md#sn-ds-019)); destructive `SaneButton`. Wallpaper (device-scoped) is left as-is unless a checkbox opts to clear it.

#### Security & privacy

None beyond baseline: touches only local preference registers; no notes, keys, tokens or PII affected or logged (MASVS-PRIVACY-3, CWE-532). Destructive-by-confirmation avoids accidental loss.

#### UX notes

Placed at the bottom of Privacy & export (or Account & plan) as a destructive row, consistent with Sign out styling. Confirm dialog lists what resets and what does not. Reduce-motion: static dialog transition.

#### Test plan

Widget: `app/test/settings/reset_settings_test.dart` (confirm required; defaults restored; notes/account untouched; toast). Unit: `resetToDefaults` in the repository test ([SN-SET-003](settings.md#sn-set-003)).

#### Dependencies

[SN-SET-003](settings.md#sn-set-003), [SN-SET-004](settings.md#sn-set-004).

#### Definition of done

- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR/PRD updated if behaviour, a preference key/default/scope, or a control mapping changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs verified in docs/security/controls-matrix.md

---

