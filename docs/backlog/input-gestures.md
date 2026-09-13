# Backlog — area: input-gestures

23 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-IPAD-001](input-gestures.md#sn-ipad-001) **Build the iPadOS platform surface (Pencil Pro, windowing, widgets, App Store)** (epic · M5 Phones & Platform Parity)
  - [SN-IPAD-002](input-gestures.md#sn-ipad-002) **Implement sane_stylus iOS capability probe for connected Apple Pencils** · p1 · task · M · M5 Phones & Platform Parity
  - [SN-IPAD-003](input-gestures.md#sn-ipad-003) **Implement Apple Pencil Pro squeeze to open the contextual tool palette** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-004](input-gestures.md#sn-ipad-004) **Implement Apple Pencil Pro barrel roll to rotate calligraphy and chisel nibs** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-005](input-gestures.md#sn-ipad-005) **Implement Apple Pencil hover preview for brush cursor and palette anchoring** · p2 · feature · S · M5 Phones & Platform Parity
  - [SN-IPAD-006](input-gestures.md#sn-ipad-006) **Fire Apple Pencil Pro haptics on shape-snap and alignment via feedback generator** · p3 · feature · S · M5 Phones & Platform Parity
  - [SN-IPAD-007](input-gestures.md#sn-ipad-007) **Bind Apple Pencil double-tap to a remappable editor action** · p2 · feature · S · M5 Phones & Platform Parity
  - [SN-IPAD-008](ocr-hwr.md#sn-ipad-008) **Implement Scribble handwriting-to-text in text fields via sane_scribble** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-009](compat.md#sn-ipad-009) **Spike: verify Flutter multi-view and multi-window support on iPadOS 26** · p1 · spike · S · M5 Phones & Platform Parity
  - [SN-IPAD-010](compat.md#sn-ipad-010) **Adapt editor layout to Split View, Slide Over and Stage Manager without state loss** · p1 · feature · L · M5 Phones & Platform Parity
  - [SN-IPAD-011](compat.md#sn-ipad-011) **Adopt additive windowing with a scene and descriptive name per note** · p2 · feature · L · M5 Phones & Platform Parity
  - [SN-IPAD-012](input-gestures.md#sn-ipad-012) **Populate the iPad menu bar and wire the full keyboard-shortcut surface** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-013](input-gestures.md#sn-ipad-013) **Support trackpad and pointer input with hover states and right-click menus** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-014](notifications.md#sn-ipad-014) **Make Sane Notes pages Quick-Note-linkable via NSUserActivity** · p3 · feature · S · M5 Phones & Platform Parity
  - [SN-IPAD-015](notifications.md#sn-ipad-015) **Expose App Intents, Shortcuts, Siri phrases and Spotlight for notes** · p2 · feature · L · M5 Phones & Platform Parity
  - [SN-IPAD-016](notifications.md#sn-ipad-016) **Build WidgetKit home-screen widgets for recent notes and quick capture** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-017](notifications.md#sn-ipad-017) **Add a ControlWidget for Control Center and Lock Screen quick capture** · p3 · feature · S · M5 Phones & Platform Parity
  - [SN-IPAD-018](notifications.md#sn-ipad-018) **Show a Live Activity for in-progress recording, transcription and export** · p3 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-019](sharing-export.md#sn-ipad-019) **Integrate Files app document browsing and open-in-place for .sanenote** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-020](security.md#sn-ipad-020) **Handle Universal Links and associated domains landing in view or confirm** · p1 · security · M · M5 Phones & Platform Parity
  - [SN-IPAD-021](privacy.md#sn-ipad-021) **Ship the privacy manifest and audit required-reason APIs across plugins** · p0 · security · M · M7 Beta Hardening & Security Audit
  - [SN-IPAD-022](ink.md#sn-ipad-022) **Confirm the PencilKit interop boundary and benchmark PKCanvasView latency** · p2 · spike · S · M1 Ink Editor Alpha
  - [SN-IPAD-023](release.md#sn-ipad-023) **Reach App Store Connect readiness: nutrition label, export compliance, metadata** · p1 · task · M · M8 Launch & Growth
  - [SN-IPAD-024](ci-cd.md#sn-ipad-024) **Stand up the TestFlight beta pipeline for signed iPad builds** · p1 · infra · M · M7 Beta Hardening & Security Audit
  - [SN-IPAD-025](perf.md#sn-ipad-025) **Validate iPad pen-to-pixel latency, fps and battery on the Tier 1 device lab** · p1 · test · M · M5 Phones & Platform Parity
  - [SN-IPAD-026](text.md#sn-ipad-026) **Back the note title and universal search with native UIKit text input views** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-027](compat.md#sn-ipad-027) **Gate iPadOS 26-only APIs behind runtime availability checks with iPadOS 17 fallbacks** · p1 · task · M · M5 Phones & Platform Parity
  - [SN-IPAD-028](editor.md#sn-ipad-028) **Restore editor and scene state after termination and window reconnection** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-029](compat.md#sn-ipad-029) **Validate Apple Pencil capability degradation on Tier 2 iPads each release** · p2 · test · S · M5 Phones & Platform Parity
  - [SN-IPAD-030](sharing-export.md#sn-ipad-030) **Support inter-app drag and drop of pages, images and text in Split View** · p3 · feature · M · M5 Phones & Platform Parity
  - [SN-IPAD-031](ci-cd.md#sn-ipad-031) **Configure the iOS and iPadOS app target: deployment target, capabilities, entitlements** · p1 · infra · S · M1 Ink Editor Alpha
  - [SN-GIPAD-001](audio.md#sn-gipad-001) **Wire the Apple SpeechAnalyzer on-device transcription adapter via sane_ml_native** · p1 · feature · L · M3 Audio & Recognition
  - [SN-GIPAD-002](ink.md#sn-gipad-002) **Implement Display P3 wide-gamut colour management for ink, UI and export** · p2 · feature · M · M1 Ink Editor Alpha
  - [SN-GIPAD-003](security.md#sn-gipad-003) **Apply iOS Data Protection classes to note content, caches, audio and exports** · p1 · security · M · M4 Identity, Sync & Privacy
  - [SN-GIPAD-004](search.md#sn-gipad-004) **Schedule background indexing, OCR and sync with BGTaskScheduler on iPadOS** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-GIPAD-005](search.md#sn-gipad-005) **Index notes in Core Spotlight with locked-notebook and profile exclusions** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GIPAD-006](sync.md#sn-gipad-006) **Support Handoff continuity of the open note across the user's Apple devices** · p3 · feature · M · M5 Phones & Platform Parity
  - [SN-GIPAD-009](compat.md#sn-gipad-009) **SPIKE: decide the education deployment posture (Shared iPad, MDM config, ClassKit)** · p3 · spike · S · Backlog
  - [SN-GIPAD-010](notifications.md#sn-gipad-010) **Add a Focus Filter intent that scopes the library to a subject or profile** · p3 · feature · S · Backlog
  - [SN-GIPAD-011](editor.md#sn-gipad-011) **Keep a notebook coherent when it is open in two iPad windows at once** · p1 · feature · L · M5 Phones & Platform Parity

---

## Issues

### SN-AND-007

<a id="sn-and-007"></a>

**Expose stylus pressure, tilt, orientation & hover axes via sane_stylus**

| Field | Value |
|---|---|
| GitHub | #60 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | input-gestures, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Brush dynamics need per-sample pressure, tilt, orientation and hover distance from the active stylus. On Android these all surface through MotionEvent axes for any active stylus or USI pen — no vendor SDK (docs/platform/android.md §4, gestures §4). The sane_stylus plugin exposes a capability descriptor plus the hover stream so the editor can feature-detect (never sniff device) and drive pencil/charcoal shading, chisel width and the hover cursor preview (PRD-ED-021..023, PRD-ED-033).

#### Scope
**In:** sane_stylus Android capabilities() descriptor (which axes this stylus reports); per-sample pressure (0-1), AXIS_TILT, AXIS_ORIENTATION, AXIS_DISTANCE extraction; the hover EventChannel driven by AXIS_DISTANCE; velocity-width fallback signalling when pressure is absent.
**Out:** barrel-button / eraser tool-type ([SN-AND-008](input-gestures.md#sn-and-008)); S Pen Remote air actions ([SN-AND-009](input-gestures.md#sn-and-009)); the brush engine that consumes these (SN-BRS-*); the hover-cursor UI (PRD-ED-033 UI in SN-ED-*).

#### Acceptance criteria
- [ ] capabilities() returns an accurate StylusCapabilities descriptor per connected pen (pressure/tilt/orientation/hover present-or-absent), feature-detected, never inferred from device model.
- [ ] Pressure is normalised to [0,1]; AXIS_TILT (0..pi/2) and AXIS_ORIENTATION (+/-pi) are reported in radians matching the point model (PRD-ED-024).
- [ ] A hover stream emits HoverSample from AXIS_DISTANCE while the pen is above the surface; it stops on contact and on pen-out-of-range.
- [ ] When a stylus reports no pressure (some generic pens), the descriptor flags it so the brush engine substitutes velocity-based width — handwriting stays alive with no dead constant line (PRD-ED-021).
- [ ] Values match the docs/design/gestures-and-shortcuts.md §4 axis table; a USI pen reporting up to 4096 pressure levels quantises correctly.

#### Technical notes
Kotlin: MotionEvent getPressure()/AXIS_PRESSURE, AXIS_TILT, getOrientation()/AXIS_ORIENTATION, AXIS_DISTANCE, getToolType (docs/platform/android.md §4, gestures §4). Federated sane_stylus plugin (ADR-0012); EventChannel for hover, Pigeon for capabilities(). Samples align with packages/sane_ink InkSample (SN-INK-002). Feature-detect per ADR-0012 rule 4; degrade cleanly.

#### Security & privacy
None beyond baseline: pressure/tilt/orientation are per-stroke note content and are never logged (MASVS-PRIVACY-1). Hover position is transient UI data, not persisted. No new network egress; capabilities() payload validated on the Dart side.

#### UX notes
Hover shows the brush cursor (size/shape/colour) before contact, reducing "where will my mark land" on dense text (PRD-ED-033); the dock always shows the active brush too, so hover is additive, never the only indicator (a11y). Missing pressure never degrades legibility — velocity thinning keeps the Fountain Pen alive on any pen.

#### Test plan
plugins/sane_stylus/test/capabilities_test.dart (descriptor per fake pen); packages/sane_ink/test/stylus_axes_test.dart (normalisation, radians, velocity fallback flag); app/integration_test/hover_preview_test.dart on an S Pen/USI device; golden of the hover cursor across looks.

#### Dependencies
SN-INK-002 (InkSample model the axes feed).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-008

<a id="sn-and-008"></a>

**Bind stylus barrel button and eraser tool-type to editor modifiers**

| Field | Value |
|---|---|
| GitHub | #61 |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-007](input-gestures.md#sn-and-007), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Every Android stylus exposes a barrel button and (when flipped) an eraser tool type through MotionEvent, with no SDK needed (docs/platform/android.md §4, gestures §4.1). The default binding matches the platform norm: barrel-button-held = erase-while-held, and TOOL_TYPE_ERASER (pen inverted) auto-selects the eraser. Both are remappable (eraser / previous tool / lasso / pan) via the editor tool state machine (SN-ED-002).

#### Scope
**In:** reading getButtonState() (BUTTON_STYLUS_PRIMARY/SECONDARY) per event; getToolType() == TOOL_TYPE_ERASER auto-eraser; the default erase-while-held modifier and its remapping surface; restoring the prior tool on button release.
**Out:** the S Pen BLE remote button ([SN-AND-009](input-gestures.md#sn-and-009)); the eraser tool implementation (PRD-ED-071); settings UI for remapping (SN-SET-*, consumed here).

#### Acceptance criteria
- [ ] Holding the primary barrel button switches the active tool to eraser for the duration of the hold; releasing restores the previous tool, read per-event so a mid-stroke press/release is honoured (gestures §7).
- [ ] Flipping the pen so getToolType() == TOOL_TYPE_ERASER selects the eraser automatically and reverts when flipped back.
- [ ] The barrel-button action is remappable to eraser / previous tool / lasso / pan and persists per profile.
- [ ] Button state is read from the live MotionEvent (not cached) so the modifier tracks exactly with the physical button.
- [ ] Basic S Pen barrel presses work through this path with no S Pen Remote SDK dependency.

#### Technical notes
Kotlin: MotionEvent getButtonState() BUTTON_STYLUS_PRIMARY/SECONDARY, getToolType() TOOL_TYPE_ERASER (docs/platform/android.md §4). Routed to the editor tool state machine SN-ED-002 via sane_stylus; remap config in prefs. Precedence: while the barrel button is held the tool is the eraser (gestures §7 conflict rules).

#### Security & privacy
None beyond baseline: button/tool-type are input events, not content; nothing logged (MASVS-PRIVACY-1). No network or IPC-to-other-app surface. The modifier maps only to non-destructive-until-committed actions.

#### UX notes
Matches the Apple double-tap-eraser muscle memory and Concepts/Notability barrel conventions (gestures §4.1). Every gesture has a non-gesture alternative (the toolbar eraser), satisfying WCAG 2.5.1. Remap options are labelled, not icon-only.

#### Test plan
plugins/sane_stylus/test/barrel_button_test.dart (state routing, remap, restore-prior-tool); app/integration_test/barrel_eraser_test.dart on an S Pen device (flip-to-erase); a widget test asserting mid-stroke press/release toggles the tool.

#### Dependencies
SN-AND-007 (stylus capability plumbing), SN-ED-002 (editor tool state machine).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-009

<a id="sn-and-009"></a>

**Integrate Samsung S Pen Remote SDK for button and air actions**

| Field | Value |
|---|---|
| GitHub | #62 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-007](input-gestures.md#sn-and-007) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
Samsung Galaxy devices with a BLE S Pen expose remote button presses and air gestures via the S Pen Remote SDK — a differentiator competitors barely touch (docs/platform/android.md §4.2, gestures §4.2). A single button press maps to the single highest-value action (New note or Start recording) because Android honours only ONE remote action per app via remote_action.xml; air gestures (Up/Down/Left/Right/CW/CCW) map to page turns and tool cycling. The path is Samsung-device gated and must degrade cleanly everywhere else.

#### Scope
**In:** SpenRemote.initialize + SpenUnitManager wiring in sane_stylus; ButtonEvent (single/double press) -> the one configured remote action (remote_action.xml); AirMotionEvent -> page-turn/tool-cycle bindings; feature-detection and clean absence elsewhere.
**Out:** basic barrel-button presses (those go through [SN-AND-008](input-gestures.md#sn-and-008) without the SDK); USI/Chromebook stylus ([SN-AND-010](input-gestures.md#sn-and-010)); the recording service ([SN-AND-023](audio.md#sn-and-023)) and note-creation flow (consumed here).

#### Acceptance criteria
- [ ] On a Galaxy device with a BLE S Pen, a single remote button press fires the single configured action (default: New note; alternative: Start recording) — exactly one action, per the remote_action.xml constraint.
- [ ] Air gestures Left/Right map to previous/next page; Up/Down and CW/CCW map to configurable tool cycling; each fires once per gesture with no repeat storm.
- [ ] SpenRemote is feature-detected via initialize(Context) + feature query; on a non-Samsung device or a pen without gyro the SDK path is absent and the app behaves normally (no crash, no missing-feature error).
- [ ] Extra RemoteActions beyond the one allowed are not registered (they would be silently ignored) and the UI reflects the single-action limit.
- [ ] Air-gesture handling is disabled while a text field is focused so it cannot fire during typing.

#### Technical notes
Kotlin: SpenRemote.initialize(context), SpenUnitManager, ButtonEvent, AirMotionEvent (docs/platform/android.md §2, §4.2, §5). Guarded behind Samsung-device + feature checks (ADR-0012 rule 4). BLE permission requested in-context with rationale (ADR-0012 rule 6). remote_action.xml declares the single action. New-note/record actions call app/ intents.

#### Security & privacy
The remote is a BLE input source: validate incoming ButtonEvent/AirMotionEvent before acting (MASVS-PLATFORM-1); a remote press lands in a view/confirm or a non-destructive action, never an irreversible mutation. BLE permission is least-privilege and in-context. Nothing about pen input is logged (MASVS-PRIVACY-1).

#### UX notes
Single press to start a note or a lecture recording is the headline S Pen convenience (gestures §4.2); air-gesture page turns feel like a presenter remote. Because only one remote action is honoured, Settings makes the choice explicit with a clear single-select. All actions have on-screen equivalents (a11y).

#### Test plan
plugins/sane_stylus/test/spen_remote_test.dart (event routing, single-action enforcement, absence on non-Samsung fake); app/integration_test/spen_air_actions_test.dart on a Galaxy device; a test asserting air gestures are suppressed while a text field is focused.

#### Dependencies
SN-AND-007 (sane_stylus capability plumbing).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-010

<a id="sn-and-010"></a>

**Support USI & Chromebook stylus and register as ChromeOS note-taker**

| Field | Value |
|---|---|
| GitHub | #63 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | input-gestures, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-007](input-gestures.md#sn-and-007) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
USI 2.0 pens on Chromebooks and the Pixel Tablet surface through the same MotionEvent stylus axes as any active stylus — no separate SDK (docs/platform/android.md §4.3, gestures §4.3). To be a first-class ChromeOS citizen, Sane Notes registers as the default note-taker via an intent filter for org.chromium.arc.intent.action.CREATE_NOTE (blank-note and annotate-image entry points), and supports keyboard/mouse/stylus as first-class input in freely resizable desktop windows.

#### Scope
**In:** verifying USI/Pixel-Tablet pens flow through the [SN-AND-007](input-gestures.md#sn-and-007) axis path (pressure up to 4096, tilt, hardware palm rejection); the ChromeOS CREATE_NOTE intent filter with blank-note and annotate-image handlers; entry-point routing to a new note vs annotate-an-image.
**Out:** general adaptive layout ([SN-AND-012](compat.md#sn-and-012)); desktop windowing/foldables ([SN-AND-013](compat.md#sn-and-013)); the App Links deep-link handler ([SN-AND-025](notifications.md#sn-and-025)).

#### Acceptance criteria
- [ ] A USI 2.0 pen on a Chromebook or Pixel Tablet draws with correct pressure/tilt through the [SN-AND-007](input-gestures.md#sn-and-007) path with no USI-specific code branch (feature-detected).
- [ ] The app declares an intent filter for org.chromium.arc.intent.action.CREATE_NOTE and appears as a note-taking option in ChromeOS; selecting it opens a blank note.
- [ ] The annotate-image entry point (a supplied image) opens a new note with that image placed for annotation, with the image validated/size-capped before decode.
- [ ] Launched via CREATE_NOTE the app opens directly into the editor in a resizable desktop window; keyboard (Ctrl+S/Ctrl+Z), mouse right-click menus/hover/drag-and-drop and stylus all work.
- [ ] On non-ChromeOS devices the intent filter is inert and nothing regresses.

#### Technical notes
AndroidManifest intent filter action org.chromium.arc.intent.action.CREATE_NOTE (docs/platform/android.md §4.3, §7). USI pens via existing MotionEvent axes ([SN-AND-007](input-gestures.md#sn-and-007)) — no SDK. Incoming image handled off the UI isolate, MIME/size validated, imported into a new isolated note (CLAUDE.md §7.8). Keyboard/mouse map from docs/design/gestures-and-shortcuts.md §6.

#### Security & privacy
The CREATE_NOTE intent and any supplied image URI are untrusted input (MASVS-PLATFORM-1): validate the action, canonicalise/confine the path, cap and validate the image before decode, and land in a new isolated notebook — never auto-mutate an existing note. No network egress.

#### UX notes
On ChromeOS, Sane Notes should feel like a native note-taker: pen-tap-to-capture, right-click context menus, keyboard shortcuts, drag-and-drop images (gestures §6.4). USI pens get the full brush experience. Desktop windows use the expanded/large window-class layout (compat matrix §5).

#### Test plan
plugins/sane_stylus/test/usi_axes_test.dart (axis parity with a USI fake); app/integration_test/chromeos_create_note_test.dart (intent entry points, blank vs annotate); a security test that a malformed annotate-image fails closed; manual smoke on a Chromebook (Tier 2, compat matrix §2).

#### Dependencies
SN-AND-007 (stylus axis capability path).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-011

<a id="sn-and-011"></a>

**Enable stylus handwriting into text fields and disable it over the canvas**

| Field | Value |
|---|---|
| GitHub | #64 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | android-tablet, android-phone |
| Areas | input-gestures, text, ocr-hwr |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-TXT-001](text.md#sn-txt-001) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-2` |
| Extra labels | agent-ready |

#### Context
Android 14+ gives EditText/WebView free stylus handwriting: the OS converts pen strokes over a text field into typed text (docs/platform/android.md §2, §6). Sane Notes wants this for search/title/text-box entry, but MUST disable it over the ink canvas or the OS would try to convert note-body strokes to text. The sane_scribble plugin owns setAutoHandwritingEnabled, handwriting bounds offsets, and handwriting delegation so a search bar can hand off to the real editor (gestures §10 handwriting-to-text-field row).

#### Scope
**In:** sane_scribble Android impl exposing setAutoHandwritingEnabled, setHandwritingBoundsOffsets, and registerDelegate for handwriting delegation; enabling it on Sane text fields (title, search, text boxes); explicitly disabling it over the ink canvas; the default 40dp V / 10dp H bounds.
**Out:** ML Kit Digital Ink note-body recognition (that is the sane_ml_native / recognition path, SN-HWR-*); the text tool itself (SN-TXT-001, consumed here).

#### Acceptance criteria
- [ ] Over the ink canvas, setAutoHandwritingEnabled(false) is set so pen strokes are never converted to text by the OS (verified: a stroke on the canvas produces ink, not a keystroke).
- [ ] In the notebook title, universal search and text boxes, stylus handwriting is enabled and writes typed text into the field on Android 14+.
- [ ] Handwriting bounds offsets default to 40dp vertical / 10dp horizontal and are configurable per field.
- [ ] Handwriting delegation lets the search bar hand off to the real editor field via registerDelegate(placeholderId, editorId).
- [ ] Password fields are excluded (OS behaviour) and the app does not attempt to enable handwriting on them; on pre-Android-14 devices the feature is simply absent with no regression.

#### Technical notes
Kotlin: View.setAutoHandwritingEnabled, setHandwritingBoundsOffsets, handwriting delegation (Android 14 / API 34+) (docs/platform/android.md §5, §6). Federated sane_scribble plugin (ADR-0012). Applied to Flutter text inputs via the platform view / embedding; disabled on the canvas host view. Two-path handwriting: this is path 1 (text fields); path 2 (note-body ML Kit) is separate (§6).

#### Security & privacy
Handwriting into fields must respect field sensitivity: never enable it on password fields (MASVS-PLATFORM-1 / MASVS-PRIVACY-2); the recognised text is field input, handled like any typed text and not logged. Disabling it over the canvas prevents an unintended OS text-conversion of private note content.

#### UX notes
Users can write with the pen straight into search and titles without switching to the keyboard — a natural pen-first convenience (docs/design/screens-and-flows.md search + title). The canvas stays pure ink. Delegation means tapping/writing near the search bar just works. A keyboard alternative always remains (a11y).

#### Test plan
plugins/sane_scribble/test/auto_handwriting_test.dart (enable/disable per field, bounds, delegation); app/integration_test/scribble_text_fields_test.dart on an Android 14+ device (write into search; canvas produces ink not text); a test asserting password fields are never enabled.

#### Dependencies
SN-FND-002 (app scaffold), SN-TXT-001 (text tool / fields).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-031

<a id="sn-and-031"></a>

**Wire hardware keyboard, mouse and drag-and-drop on large-screen Android**

| Field | Value |
|---|---|
| GitHub | #496 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | input-gestures, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-012](compat.md#sn-and-012), [SN-AND-013](compat.md#sn-and-013) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-CODE-2`, `MASVS-PRIVACY-1`, `CWE-20`, `CWE-434`, `OWASP-A03` |
| Extra labels | agent-ready |

#### Context
docs/platform/android.md §7 requires keyboard (`Ctrl+S`/`Ctrl+Z`), mouse (right-click menus, hover, drag-and-drop) and stylus to be **first-class input on large screens** — Chromebooks in freely resizable desktop windows, tablets with keyboard folios, and connected-display setups. docs/design/gestures-and-shortcuts.md §6.3 defines the shared shortcut map and §6.4 the mouse map (right-click = context menu, `Ctrl`+wheel = zoom, middle-drag or Space-drag = pan, hover = tooltips and brush cursor), and states the rule that **every long-press menu MUST have a right-click equivalent**. The product requirements are PRD-ED-149 (MUST, core shortcuts), PRD-ED-150 (SHOULD, single-key tool switches), PRD-ED-151 (MAY, bracket size / number colour) and PRD-ED-152 (SHOULD, shortcut cheat sheet). [SN-AND-013](compat.md#sn-and-013) makes the ChromeOS desktop window and foldable postures work; this issue makes the input inside that window feel native.

#### Scope
**In:** binding the shared shortcut registry to Android hardware-keyboard events with `Ctrl` substituted for `⌘`; right-click/secondary-click context menus mirroring every long-press menu; mouse hover states and brush-cursor preview; `Ctrl`+wheel zoom, wheel scroll, middle-drag and Space-drag pan; Android drag-and-drop accepting an image or PDF dropped onto the canvas or a library card; suppressing single-key tool shortcuts while a text field has focus; the `Ctrl`-hold / `?` shortcut cheat sheet on Android.
**Out:** the cross-platform shortcut registry and the canonical binding map ([SN-ED-002](editor.md#sn-ed-002), consumed here — do not create a second source of truth); web keyboard/mouse handling (SN-WEB-001); pen and stylus input ([SN-AND-007](input-gestures.md#sn-and-007), [SN-AND-008](input-gestures.md#sn-and-008)); window size classes and posture ([SN-AND-012](compat.md#sn-and-012), [SN-AND-013](compat.md#sn-and-013)); decoding a dropped image or PDF ([SN-MED-001](images-media.md#sn-med-001), [SN-PDF-002](pdf.md#sn-pdf-002) own the parsers).

#### Acceptance criteria
- [ ] Every binding in docs/design/gestures-and-shortcuts.md §6.1–§6.3 fires on Android with a hardware keyboard, `Ctrl` substituting for `⌘`: `Ctrl+Z`, `Ctrl+Shift+Z`/`Ctrl+Y`, `Ctrl+C/X/V/A/D`, `Ctrl+S`, `Ctrl+K`, `Ctrl +/−/0`, `PageUp`/`PageDown`, `Esc` (PRD-ED-149).
- [ ] Single-key tool switches (`P/H/E/V/S/T/I/R`) act only when the canvas has focus; with a text box focused the same keys type characters and only modified chords act; `Esc` returns focus to the canvas (PRD-ED-150).
- [ ] Right-click (and two-finger trackpad click) opens a context menu everywhere a long-press menu exists — on a selection, on an object, on empty canvas, on a library card, on a page thumbnail — with identical items and identical results.
- [ ] Mouse hover shows tooltips, hover states and the brush cursor; the cursor shape is tool-appropriate over the canvas and a pointer over chrome.
- [ ] `Ctrl`+wheel zooms about the pointer position, plain wheel scrolls the page, middle-drag and Space-drag pan — and none of them draw.
- [ ] Dropping a PNG/JPEG/PDF on the canvas inserts it at the drop point; dropping on a library card imports into that notebook; an unsupported MIME type or a file over the configured cap shows a user-safe error and inserts nothing.
- [ ] Holding `Ctrl` for 600 ms, or pressing `?` with the canvas focused, shows the shortcut cheat sheet; it is screen-reader readable and dismissible with `Esc` (PRD-ED-152).
- [ ] Keyboard focus order is logical and the focus ring (from docs/design/tokens.json) is visible across dock, page rail and canvas; no action is mouse-only or keyboard-only (WCAG 2.1.1, 2.5.1).
- [ ] With a keyboard and mouse attached, pen-down→pixel stays ≤ 25 ms on the Android-tablet-stylus reference — no input plumbing regresses the draw loop (PRD-ED-173).

#### Technical notes
Bind through Flutter `Shortcuts`/`Actions` using a `LogicalKeySet` map produced by the shared registry in `app/lib/input/` ([SN-ED-002](editor.md#sn-ed-002)); the Android layer supplies the `Ctrl`-for-`⌘` substitution, not a second binding table. Mouse: `MouseRegion` for hover and cursor, `Listener` with `PointerDeviceKind.mouse`, secondary button via `event.buttons & kSecondaryMouseButton`, zoom via `PointerScrollEvent` combined with `HardwareKeyboard.instance.isControlPressed`. Keep the canvas wrapped in a raw `Listener`, never a `GestureDetector`, and do not enable pointer resampling on the draw path (CLAUDE.md §8). Drag-and-drop rides the Android `DragEvent` bridge through a `DropRegion`-style plugin, or a thin Kotlin shim in the app's platform layer following the federated-plugin contract in ADR-0012 if no suitable package exists; the dropped bytes are handed to an `Isolate.run` decode so nothing parses on the UI isolate (CLAUDE.md §7.8, §8). Docs to follow: docs/design/gestures-and-shortcuts.md §6 and §7 (conflict precedence — a system gesture always wins, multi-pointer beats ink), docs/platform/android.md §7.

#### Security & privacy
A dropped or pasted file is untrusted input from another app: validate extension, declared MIME **and** magic bytes, cap the size before decode, decode off the UI isolate, and import into the target notebook only after the standard confirm (CWE-20, CWE-434, MASVS-PLATFORM-3, MASVS-CODE-2). Pasted HTML/SVG from the system clipboard is sanitised — no scripts, no external references (OWASP-A03) — and the clipboard is never read without a user gesture. `Ctrl+S` is a **local checkpoint only** and MUST NOT trigger any network call (CLAUDE.md §7.4: no new egress without an ADR). Baseline: keystrokes, dropped file names and paths, and note content are never logged (MASVS-PRIVACY-1); ink coordinates are note content; tokens stay in `sane_secure_store`.

#### UX notes
Right-click menus reuse the Menu component from docs/design/component-inventory.md — the same component long-press opens — rendered from `sane_ui` tokens so it is correct in all 17 looks and in light + dark; golden-test it. The cheat sheet uses the overlay pattern in docs/design/screens-and-flows.md §7 and lists bindings grouped as in gestures-and-shortcuts.md §6. Hover and focus states must meet ≥ 4.5:1 contrast, targets stay ≥ 48 dp, and every mouse affordance has a keyboard equivalent and vice versa (docs/design/accessibility.md). Empty state: dropping onto a notebook with no pages creates page 1 first, then inserts. Error state: the Sane Sage error illustration with "That file type isn't supported yet" and no technical detail. Loading state: a dropped PDF shows the standard indeterminate progress in place while it decodes off-isolate.

#### Test plan
`app/test/input/android_keyboard_shortcuts_test.dart` (widget: every binding fires; the text-field suppression rule holds; `Ctrl+S` performs a local checkpoint and makes no network call); `app/test/input/mouse_context_menu_test.dart` (right-click parity with long-press across canvas, library card and page thumbnail); `app/test/input/mouse_zoom_pan_test.dart` (`Ctrl`+wheel, wheel, middle-drag, Space-drag — and that none of them create a stroke); `app/integration_test/android_drag_drop_test.dart` (patrol: drop an image, a PDF, an oversized file and a mislabelled file; assert insert / insert / error / error with nothing inserted); golden tests for the context menu and cheat sheet across all 17 looks in `app/test/goldens/`; a `tools/perf_harness` run on the Android-tablet-stylus slot proving no latency regression; a manual pass on a Chromebook (Tier 2, docs/platform/compatibility-matrix.md §2).

#### Dependencies
[SN-AND-012](compat.md#sn-and-012) (window size classes), [SN-AND-013](compat.md#sn-and-013) (ChromeOS desktop windowing and foldable postures).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Latency profile attached to the PR showing the ≤ 25 ms budget still holds
- [ ] Docs updated: docs/design/gestures-and-shortcuts.md §10 reflects shipped Android behaviour
- [ ] Reviewed against docs/security/secure-coding-checklist.md (untrusted-input section for the drop path)

---

### SN-GAND-014

<a id="sn-gand-014"></a>

**Build the Android stylus quirk table and per-device axis normalisation**

| Field | Value |
|---|---|
| GitHub | #991 |
| Type | task |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | input-gestures, ink, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-007](input-gestures.md#sn-and-007), [SN-SET-008](settings.md#sn-set-008), [SN-AND-027](perf.md#sn-and-027) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | — |

#### Context
[SN-AND-007](input-gestures.md#sn-and-007) exposes pressure/tilt/orientation/hover and normalises pressure to [0,1] — correct as a contract, but `docs/research/sources/android-stylus-capabilities.md` §2 warns that `getPressure()` "can exceed 1 by calibration" and that axis support varies per pen, and `docs/platform/compatibility-matrix.md` §4 rates generic active styluses Tier 2/3 with "varies" in four columns. Android stylus hardware is genuinely inconsistent: Wacom EMR digitisers (Samsung), USI 2.0 pens (Chromebook, Pixel Tablet, up to 4096 levels), and cheap capacitive/active pens all report different ranges, resolutions, hover distances and button semantics, and some report tilt with the wrong sign. iPad has one vendor and two-and-a-half pens; Android has dozens. Without an evidence-backed normalisation layer, the same brush feels wildly different across devices, the brush render-parity gate ([SN-BRS-026](brushes.md#sn-brs-026)) becomes unexplainable, and support cannot answer "why is my pen so light?". The fix must stay capability-driven — the platform doc forbids branching on device model for behaviour.

#### Scope
**In:** a measured quirk table recorded in `docs/platform/android.md` §4 (per tested pen: reported pressure range and resolution, tilt/orientation availability and units, hover distance range, button bitmask behaviour, whether `TOOL_TYPE_ERASER` is reported); a normalisation layer in `sane_stylus`/`sane_ink` that clamps and rescales out-of-range pressure, falls back to velocity width when pressure is constant or absent, and reports a `StylusProfile` describing what this pen can actually do; a per-pen calibration store so the user's tuning ([SN-SET-008](settings.md#sn-set-008)) is remembered per connected device; a capture harness (debug-only screen or adb-driven collector) that records raw axis samples so new hardware can be characterised without a code change.
**Out:** the axis plumbing ([SN-AND-007](input-gestures.md#sn-and-007)); barrel buttons ([SN-AND-008](input-gestures.md#sn-and-008)); S Pen Remote ([SN-AND-009](input-gestures.md#sn-and-009)); the brush response curves that consume the normalised values ([SN-BRS-004](brushes.md#sn-brs-004), [SN-INK-019](ink.md#sn-ink-019)); the settings UI ([SN-SET-008](settings.md#sn-set-008)).

#### Acceptance criteria
- [ ] Pressure reported above 1.0 or below 0 is clamped and rescaled so stroke width stays inside the brush's configured range; a device reporting a constant pressure is detected and switches to velocity width within the first stroke ([SN-PHN-005](ink.md#sn-phn-005) path).
- [ ] `StylusProfile` reports resolution (e.g. 4096 levels vs 256) and the brush engine quantises accordingly with no visible stair-stepping in width.
- [ ] Tilt and orientation are normalised to the documented radian conventions ([SN-AND-007](input-gestures.md#sn-and-007)) regardless of vendor sign conventions; a fixture replay proves it.
- [ ] Calibration set in Settings persists per pen (S Pen vs USI vs generic) and is restored when that pen is used again; profiles never leak between user profiles ([SN-AUTH-013](auth.md#sn-auth-013)).
- [ ] The debug capture harness exports an anonymised axis trace (no note content) that can be replayed by [SN-INK-033](ink.md#sn-ink-033).
- [ ] `docs/platform/android.md` §4 contains a filled quirk table for at least the S Pen, a USI 2.0 pen and one generic active stylus, each marked measured (not assumed).

#### Technical notes
Normalisation lives with the sample pipeline in `packages/sane_ink` ([SN-INK-010](ink.md#sn-ink-010)) so every tier shares it; the platform layer supplies raw values plus `InputDevice.getMotionRange(AXIS_PRESSURE)` metadata (min/max/resolution) rather than guessing. Key the calibration store on a stable, non-identifying descriptor (input-device descriptor hash), not a serial number. Reuse the synthetic corpus and replay driver from [SN-PERF-005](perf.md#sn-perf-005)/[SN-INK-033](ink.md#sn-ink-033) for regression.

#### Security & privacy
Input-device identifiers are potential fingerprinting vectors: hash the descriptor locally, never transmit it, and keep the calibration store inside the encrypted per-profile preferences ([SN-SET-003](settings.md#sn-set-003), MASVS-PRIVACY-1). Debug traces contain coordinates, so they are debug-flavour only, opt-in, and excluded from crash bundles ([SN-TEL-008](telemetry.md#sn-tel-008) redaction).

#### UX notes
Invisible by default; the visible surface is the existing scratch/calibration area ([SN-SET-008](settings.md#sn-set-008)), which should name the detected pen ("Samsung S Pen — 4096 levels, tilt supported") so the user can trust what the app sees. Where a pen reports no pressure, the area explains the velocity-width substitution instead of hiding the control.

#### Test plan
Unit tests over the normaliser with fixtures per quirk (out-of-range pressure, inverted tilt, constant pressure, low resolution). Replay tests through [SN-INK-033](ink.md#sn-ink-033) asserting identical geometry across two device profiles for the same gesture. Manual characterisation on Galaxy Tab (S Pen), Pixel Tablet/Chromebook (USI) and one third-party pen, with results committed to the doc table. Files: `packages/sane_ink/lib/src/stylus_profile.dart`, `packages/sane_ink/test/axis_normalisation_test.dart`.

#### Dependencies
[SN-AND-007](input-gestures.md#sn-and-007), [SN-SET-008](settings.md#sn-set-008), [SN-AND-027](perf.md#sn-and-027)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-007

<a id="sn-gphn-007"></a>

**Add app-wide haptic feedback for phone interactions**

| Field | Value |
|---|---|
| GitHub | #1020 |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | input-gestures, design-system |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-004](editor.md#sn-phn-004), [SN-PHN-010](library.md#sn-phn-010) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
On a phone the device is in the hand, so tactile feedback is a natural part of the experience in a way it is not on a desk-bound tablet. The tablet track already defines Apple Pencil Pro haptics for shape-snap and alignment ([SN-IPAD-006](input-gestures.md#sn-ipad-006)), but that is pen-specific to iPad; there is no app-wide haptic vocabulary for the phone's finger-first interactions — capture confirmation, tool selection, snap/detent, page turn, review rating, or an error. This issue defines a small, consistent haptic vocabulary and wires it to the phone's key moments, honouring the OS "system haptics" setting and Reduce Motion, and never as the only signal for anything.

#### Scope
**In:** a `SaneHaptics` facade with a small named vocabulary (selection tick, light impact, success, warning/error, snap) mapped to platform primitives; wiring at capture confirmation ([SN-PHN-010](library.md#sn-phn-010)), tool/colour selection in the compact palette ([SN-PHN-004](editor.md#sn-phn-004)), page-turn/detent and zoom-fit snaps, review ratings ([SN-GPHN-005](study.md#sn-gphn-005)), and error toasts; a global on/off preference honouring the OS system-haptics setting.
**Out:** Apple Pencil Pro haptics ([SN-IPAD-006](input-gestures.md#sn-ipad-006)); the S Pen path ([SN-PHN-016](input-gestures.md#sn-phn-016)); audio/visual feedback (owned by their surfaces); and any haptic on the wet-ink draw path (explicitly excluded — see below).

#### Acceptance criteria
- [ ] A `SaneHaptics` facade exposes exactly the named events (selection, lightImpact, success, warning, snap) and every call site uses a named event, not a raw platform call.
- [ ] Haptics fire on: capture confirmed, tool/colour selected, a snap/detent (fit-to-page, shape-snap where present), a review rating, and a warning/error toast.
- [ ] No haptic fires on any per-sample event on the ink draw path (a haptic per pointer move is a defect); the draw path stays allocation- and side-effect-free (CLAUDE.md §8).
- [ ] Haptics respect the OS system-haptics setting and an in-app on/off toggle, both defaulting to the platform norm; when off, no haptic fires anywhere.
- [ ] Under OS Reduce Motion, non-essential decorative haptics are suppressed while functional confirmations remain (aligned with ux-principles.md §6).
- [ ] Every haptic is paired with a visual and/or audible signal so nothing is conveyed by haptic alone (WCAG 1.4.1-equivalent, PRD-CO-311).
- [ ] On devices without a haptic engine, calls are silent no-ops with no error.
- [ ] Adds no measurable latency to the interaction it accompanies and no battery regression in the 2-hour writing soak ([SN-PERF-013](perf.md#sn-perf-013)).

#### Technical notes
Add `plugins/sane_haptics` (or extend an existing platform plugin per ADR-0012) exposing the vocabulary; on iOS map to `UIImpactFeedbackGenerator`/`UINotificationFeedbackGenerator`/`UISelectionFeedbackGenerator` (prepare-then-fire to avoid latency), on Android to `HapticFeedbackConstants`/`VibrationEffect` predefined effects. The Dart facade lives in `app/lib/platform/haptics.dart` and is consumed by feature widgets; never call the platform directly from feature code. Gate every call behind the capability probe and the preference. Keep the facade off the draw isolate. Do not branch on platform identity beyond the plugin boundary (CLAUDE.md §8).

#### Security & privacy
None beyond baseline. Haptics carry no data, but the wiring must not log which document action triggered a haptic (no analytics of interaction streams; telemetry opt-in and off by default — CLAUDE.md §7.4, MASVS-PRIVACY-1). No new permission is required (haptics need none on iOS; on Android use predefined effects that do not require the `VIBRATE`-sensitive paths beyond the standard constant). No sensor access, no network egress.

#### UX notes
Source: docs/platform/phones.md §7 (the device is in the hand) and ux-principles.md §6 (motion/feedback is functional, calm and interruptible). Haptics must be restrained — a light tick, not a buzz — matching the calm brand. They reinforce, never announce. The in-app toggle lives in Settings and reads in the §5 voice: "Haptics — a light tap when something confirms. Off follows your system setting." a11y: because a haptic can be the extra cue that helps a low-vision user, it must always accompany (not replace) the visible state, and it must be independently disableable for users sensitive to it.

#### Test plan
- `app/test/platform/haptics_facade_test.dart` — named events only; preference and OS-setting off suppress all haptics; capability no-op on unsupported devices.
- `app/test/editor/no_haptic_on_draw_test.dart` — the ink draw path fires zero haptics across a synthetic stroke (negative test).
- `app/test/platform/haptics_reduce_motion_test.dart` — decorative haptics suppressed under Reduce Motion; functional confirmations retained.
- Manual on the Tier-1/2 phones in `tools/device_lab`: capture, tool select, snap, review rating, error toast each produce the intended feel.

#### Dependencies
[SN-PHN-004](editor.md#sn-phn-004), [SN-PHN-010](library.md#sn-phn-010)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-012

<a id="sn-gphn-012"></a>

**Resolve page-swipe versus system back-swipe conflict on phones**

| Field | Value |
|---|---|
| GitHub | #1025 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | input-gestures, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-006](input-gestures.md#sn-phn-006) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `CWE-926` |
| Extra labels | agent-ready |

#### Context
[SN-PHN-003](design-system.md#sn-phn-003) specifies two horizontal gestures that both live at the screen edges of a phone: horizontal page swipe within a notebook, and the system back gesture — iOS interactive-pop (left-edge swipe) and Android predictive back. Without explicit arbitration these collide: a left-edge swipe intended to turn a page instead pops the screen, or a back gesture is swallowed by the page swiper, which is exactly the kind of "eaten" navigation docs/platform/phones.md §2 and §6 warn against. [SN-PHN-003](design-system.md#sn-phn-003) names both mechanisms but does not define how they coexist, and [SN-PHN-006](input-gestures.md#sn-phn-006) handles draw/pan (not horizontal navigation). This issue defines the edge arbitration so page turns and system back both work predictably.

#### Scope
**In:** the arbitration between horizontal page swipe and the system back gesture on phones — reserving the platform back-gesture edge region for back (or honouring the platform's own edge priority), routing interior horizontal swipes to page navigation, ensuring predictive-back preview still renders (Android API 36) and iOS interactive-pop still previews, and the unsaved-changes discard guard composing with both; the reading-mode variant where horizontal swipe turns pages/PDF pages.
**Out:** the shell/back-guard and predictive-back migration themselves ([SN-PHN-003](design-system.md#sn-phn-003), [SN-AND-014](compat.md#sn-and-014)); draw/pan disambiguation ([SN-PHN-006](input-gestures.md#sn-phn-006)); the bottom-sheet page picker ([SN-PHN-003](design-system.md#sn-phn-003)); and deep-link routing ([SN-NOTF-004](notifications.md#sn-notf-004)).

#### Acceptance criteria
- [ ] A swipe starting in the platform's reserved back-gesture edge region performs system back (predictive-back preview on Android API 36; interactive-pop preview on iOS), not a page turn.
- [ ] A horizontal swipe starting in the page interior turns the page (next/previous), clamped at the first/last page, and never triggers back.
- [ ] The unsaved-changes discard guard from [SN-PHN-003](design-system.md#sn-phn-003) fires for a back gesture regardless of where the pop originates, and a cancelled back leaves the editor and the in-progress stroke buffer exactly as they were.
- [ ] In reading mode, horizontal swipe turns notebook/PDF pages and the back-edge region still performs back.
- [ ] The arbitration adds no measurable latency to page turns or to the first ink sample, and never commits a stray stroke during a horizontal gesture (composes with [SN-PHN-006](input-gestures.md#sn-phn-006)).
- [ ] Left-handed users and RTL layouts get correct direction semantics (page-turn direction and back-edge follow reading direction / handedness where the platform allows).
- [ ] The behaviour is consistent on both platforms and documented so it is predictable, not discovered by accident.
- [ ] No control or gesture is required only via swipe: page turn is also available from the in-dock page nav and the page picker (non-gesture alternative, WCAG 2.5.1 / PRD-CO-318).

#### Technical notes
Implement in the editor input layer (`app/lib/editor/input/`) on top of the raw `Listener`, reading the platform back-gesture inset from `MediaQuery.systemGestureInsets` so the reserved edge width matches the device rather than a guess. Let the system own its edge (do not fight `PopScope`); route interior horizontal drags to the page controller. Predictive back and the interactive-pop preview are provided by [SN-PHN-003](design-system.md#sn-phn-003)/[SN-AND-014](compat.md#sn-and-014); this issue must not regress them — verify the preview still renders. Compose with the stroke-cancel path from [SN-PHN-006](input-gestures.md#sn-phn-006) so a horizontal navigation gesture never leaves a partial stroke. Never branch on platform identity beyond the gesture-inset/capability query (CLAUDE.md §8).

#### Security & privacy
None beyond baseline, with one named control. **T-NAV-REDIRECT** — a gesture that maps to back/pop must land on a legitimate prior route, never a forged or mutating destination; back always returns to the app's own navigation stack, and deep-link landings remain view/confirm ([SN-PHN-003](design-system.md#sn-phn-003), [SN-NOTF-004](notifications.md#sn-notf-004); MASVS-PLATFORM-1, CWE-926). Baseline: gesture handling processes raw pointer samples (note content in transit) and must log none of it (MASVS-PRIVACY-1, CWE-532). No new permission, sensor or network egress.

#### UX notes
Source: docs/platform/phones.md §2 (predictive back and interactive-pop MUST work), §6 (do not silently eat scroll/navigation). The result must be predictable and calm (ux-principles.md §2): the edge belongs to the system, the interior belongs to the page. Motion: page turns follow the existing page-turn transition and respect Reduce Motion (instant/cross-fade); back gestures use the platform preview (§6). a11y: because gestures are unreliable for some users, page navigation stays reachable from the in-dock page nav and the page picker, and the arbitration never disables those non-gesture paths (PRD-CO-318).

#### Test plan
- `app/test/editor/input/edge_gesture_arbitration_test.dart` — back-edge swipe pops (with guard), interior swipe turns pages, clamping at ends, no stray stroke.
- `app/test/editor/input/back_guard_compose_test.dart` — unsaved-changes guard fires for the back gesture; cancel restores state and in-progress stroke.
- `app/test/editor/input/rtl_lefthanded_direction_test.dart` — page-turn/back-edge direction correct for RTL and left-handed.
- `app/integration_test/phone_edge_gestures_test.dart` — patrol run on iOS and Android profiles: page turns and system back both work; predictive-back preview present on API 36.

#### Dependencies
[SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-006](input-gestures.md#sn-phn-006)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPRF-008

<a id="sn-gprf-008"></a>

**Run the stylus capability conformance suite across every supported pen**

| Field | Value |
|---|---|
| GitHub | #1084 |
| Type | test |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, android-phone, web |
| Areas | input-gestures, compat, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-029](ink.md#sn-ink-029), [SN-IPAD-002](input-gestures.md#sn-ipad-002), [SN-AND-007](input-gestures.md#sn-and-007), [SN-GPRF-006](compat.md#sn-gprf-006) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
The stylus table in the compatibility matrix has nine rows and six capability columns (pressure, tilt, azimuth, roll, hover, buttons), and three of its cells are still marked "(verify)": Apple Pencil USB-C pressure and azimuth, and USI 2.0 hover per pen (docs/platform/compatibility-matrix.md section 4; docs/architecture/rendering-and-performance.md section 9.4). The rule the engine depends on is that brushes MUST feature-detect per connected stylus and never assume a capability, with missing pressure falling back to velocity-based width. Capability probes exist per platform ([SN-IPAD-002](input-gestures.md#sn-ipad-002), [SN-AND-007](input-gestures.md#sn-and-007), [SN-INK-029](ink.md#sn-ink-029)), and [SN-IPAD-029](compat.md#sn-ipad-029) checks degradation on Tier 2 iPads, but nothing runs one suite across the whole pen pool and writes the answers back into the matrix. The open "(verify)" cells are the proof: the matrix is currently guessing about hardware we claim to support.

#### Scope
**In:** one conformance suite executed per pen in the lab pool (Apple Pencil Pro, Pencil 2, Pencil USB-C, Pencil 1, S Pen, USI 2.0, a generic active stylus, finger, mouse/trackpad) that records which axes actually arrive and how the brush engine responds; resolution of the three "(verify)" cells with evidence; writing the verified results back into the registry rows from [SN-GPRF-006](compat.md#sn-gprf-006) and the docs table; a regression assertion that a pen reporting no pressure renders velocity-derived width rather than a flat line or a crash.
**Out:** the platform probes themselves, per-pen premium features ([SN-IPAD-003](input-gestures.md#sn-ipad-003) squeeze, [SN-IPAD-004](input-gestures.md#sn-ipad-004) roll, [SN-AND-009](input-gestures.md#sn-and-009) S Pen remote), and palm rejection ([SN-AND-006](ink.md#sn-and-006), [SN-WEB-006](input-gestures.md#sn-web-006)).

#### Acceptance criteria
- [ ] For every pen in the pool the suite records the observed axes (pressure range and resolution, tilt, azimuth, roll, hover distance, buttons) and the sample rate, into `tools/device_lab/results/stylus/<pen>.md`.
- [ ] The three "(verify)" cells are resolved with evidence and the registry rows are updated with `verified: true` and a date.
- [ ] A pen with no pressure produces velocity-derived width with no discontinuity at stroke start, proven by a golden.
- [ ] A capability that the platform reports but never delivers (an axis present in the event but constant) is detected and treated as absent, with a test using a recorded sample stream.
- [ ] Switching pens mid-session (disconnect a Pencil, pick up a finger, attach a USI pen) re-probes and re-selects the brush response path without an app restart.
- [ ] Every result is reproducible from a recorded sample stream so the suite can run without the hardware in CI regression mode.

#### Technical notes
Capture raw sample streams per pen through the [SN-PERF-005](perf.md#sn-perf-005) corpus format so the hardware session becomes a replayable fixture — this is what lets CI keep asserting per-pen behaviour after the device leaves the desk. Probe surfaces: `UIPencilInteraction`/`UITouch` properties on iPadOS, `MotionEvent` axes (`AXIS_PRESSURE`, `AXIS_TILT`, `AXIS_ORIENTATION`, hover via `ACTION_HOVER_*`) on Android, and Pointer Events (`pressure`, `tiltX/Y`, `altitudeAngle`/`azimuthAngle`, `twist`) on web where Safari 18.2+ adds altitude/azimuth. Constant-value detection matters because some devices report a fixed 1.0 pressure.

#### Security & privacy
None beyond baseline. Recorded sample streams are synthetic handwriting produced by the team, never a user's notes, and are committed as fixtures only after review (they can encode handwriting biometrics, which is exactly the kind of data this product refuses to collect — LINDDUN: identifiability).

#### UX notes
The user-visible contract is that any pen the matrix lists writes sensibly out of the box: pressure where the hardware has it, velocity-based width where it does not, and never a dead axis silently flattening someone's handwriting. Settings' stylus calibration area ([SN-SET-008](settings.md#sn-set-008)) should show the detected capabilities so a user can see what their pen supports.

#### Test plan
Manual lab pass per pen with the recorded-stream capture. Automated regression: replay each recorded stream through the capture and brush pipeline and assert the resolved capability set and the rendered goldens. Add `packages/sane_ink/test/stylus_conformance_test.dart` driven by the fixture directory so adding a pen means adding a stream.

#### Dependencies
[SN-INK-029](ink.md#sn-ink-029), [SN-IPAD-002](input-gestures.md#sn-ipad-002), [SN-AND-007](input-gestures.md#sn-and-007), [SN-GPRF-006](compat.md#sn-gprf-006)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GWEB-009

<a id="sn-gweb-009"></a>

**Neutralise browser navigation gestures over the editor canvas**

| Field | Value |
|---|---|
| GitHub | #1007 |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | input-gestures, editor, compat |
| Size | S |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-006](input-gestures.md#sn-web-006), [SN-PG-005](pages-canvas.md#sn-pg-005) |
| Security controls | — |
| Extra labels | agent-ready, good first issue |

#### Context

The browser owns a set of gestures that will happily fire in the middle of a stroke: two-finger horizontal swipe on a trackpad (or edge-swipe on iPadOS) triggers **history back/forward**; pull-down at the top of the page triggers **pull-to-refresh** on Chrome Android; over-scrolling a scrollable ancestor produces rubber-band bounce that fights canvas panning; `ctrl`/`cmd` + wheel and pinch on a trackpad trigger **browser page zoom** rather than canvas zoom; double-tap zoom and long-press context menus interrupt pen work; and text-selection drag can lasso the surrounding chrome. Losing a page of notes to an accidental back-swipe is a data-trust failure, not a nit. [SN-WEB-006](input-gestures.md#sn-web-006) owns palm rejection and `touch-action` scoping on the canvas element, and [SN-WEB-020](a11y.md#sn-web-020) owns keyboard shortcut collisions — but no issue owns the browser's *navigation* gestures, which are governed by different properties (`overscroll-behavior`, wheel handling, context-menu suppression) and have a hard accessibility constraint attached ([SN-GWEB-008](a11y.md#sn-gweb-008): user zoom must survive).

#### Scope

**In:** `overscroll-behavior: contain` (and `none` where required) on the editor scroll containers so history swipe and pull-to-refresh cannot fire from the canvas; a documented rule for `ctrl`/`cmd`+wheel and trackpad pinch (canvas zoom inside the canvas, browser zoom outside it) implemented with passive/non-passive wheel listeners chosen deliberately; suppression of the default context menu over the canvas in favour of the app context menu ([SN-ED-023](editor.md#sn-ed-023)), with a documented escape (long-press on chrome, keyboard menu key) so the browser menu stays reachable where users need it; prevention of chrome text-selection drag during ink; a guard so a back gesture that does fire cannot lose a stroke (flush via [SN-GWEB-003](storage.md#sn-gweb-003)); and a table of "browser gestures we intercept / deliberately do not" in `docs/platform/web.md` §3.

**Out:** palm rejection and `touch-action` on the canvas ([SN-WEB-006](input-gestures.md#sn-web-006)), keyboard shortcut conflicts ([SN-WEB-020](a11y.md#sn-web-020)), canvas pan/zoom semantics ([SN-PG-005](pages-canvas.md#sn-pg-005)), history semantics ([SN-GWEB-004](compat.md#sn-gweb-004)), and native gesture handling.

#### Acceptance criteria

- [ ] A two-finger trackpad swipe (Chrome/Safari macOS) and an edge swipe (Safari iPadOS) started **inside the canvas** does not navigate back; started in the browser chrome it still does.
- [ ] Pull-down at the top of the Editor on Chrome Android does not trigger pull-to-refresh; the page never reloads mid-stroke.
- [ ] `ctrl`/`cmd`+wheel and trackpad pinch over the canvas zoom the canvas; over the Library or Settings they zoom the page; the behaviour is documented and consistent across Chrome, Safari and Firefox.
- [ ] Browser/user zoom (keyboard `cmd/ctrl` +/−, and the browser zoom menu) always works everywhere, satisfying WCAG 1.4.4 ([SN-GWEB-008](a11y.md#sn-gweb-008)).
- [ ] Right-click / long-press over the canvas shows the app context menu; over chrome and text fields the browser's own menu remains available.
- [ ] Dragging from the canvas onto surrounding chrome does not select chrome text or start a native drag image.
- [ ] If a back navigation does occur mid-stroke, the stroke is committed and persisted first — zero data loss, verified by an automated test.
- [ ] No gesture suppression is applied outside the editor surface; the Library, Search and Settings behave like ordinary web pages.

#### Technical notes

Apply CSS through the canvas host element registered by `plugins/sane_ink_surface` (web implementation) rather than globally; use `dart:js_interop` for the wheel listener because Flutter's `Listener` does not expose `ctrlKey` + `deltaMode` reliably for this decision. Wheel listeners that call `preventDefault()` must be registered non-passive explicitly; everything else stays passive for scroll performance. Keep the rules data-driven in one `web_gesture_policy.dart` so the documentation table and the code cannot drift.

#### Security & privacy

No data is processed; the threat model impact is availability and integrity of user work rather than confidentiality. One real rule: suppressing a browser affordance must never suppress a **user-agent security or accessibility affordance** — page zoom, the URL bar, and the browser context menu outside the canvas stay reachable, so the app cannot be used to trap a user or hide the origin (clickjacking-adjacent, CWE-1021, defended primarily by `frame-ancestors` in [SN-WEB-016](security.md#sn-web-016)). Nothing is logged about input events (CWE-532).

#### UX notes

The felt result is that the canvas behaves like paper and the rest of the page behaves like the web. First-run tip (once, dismissible) if a user attempts a back-swipe over the canvas: "Use the back arrow to leave — swipes draw here." Copy per `docs/design/tone-of-voice`; component from `sane_ui` ([SN-DS-022](design-system.md#sn-ds-022)). Left-handed mode and RTL do not change which gestures are intercepted ([SN-INK-016](ink.md#sn-ink-016), [SN-I18N-007](i18n.md#sn-i18n-007)).

#### Test plan

- `app/test/platform/web/gesture_policy_test.dart` — policy table resolves correctly per surface and modifier state.
- `app/integration_test/web/browser_gesture_test.dart` — Playwright: swipe-back attempt, pull-to-refresh attempt, ctrl+wheel inside/outside canvas, context menu, zoom still works.
- `app/integration_test/web/back_midstroke_flush_test.dart` — forced back navigation mid-stroke persists the stroke ([SN-GWEB-003](storage.md#sn-gweb-003)).
- Manual: Safari iPadOS edge swipe and Chrome Android pull-to-refresh, recorded in the Tier 2 matrix.

#### Dependencies

[SN-WEB-006](input-gestures.md#sn-web-006) (`touch-action` scope and palm rejection), [SN-PG-005](pages-canvas.md#sn-pg-005) (viewport pan/zoom). Interacts with [SN-GWEB-003](storage.md#sn-gweb-003), [SN-GWEB-004](compat.md#sn-gweb-004), [SN-GWEB-008](a11y.md#sn-gweb-008), [SN-ED-023](editor.md#sn-ed-023).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-IPAD-001

<a id="sn-ipad-001"></a>

**Build the iPadOS platform surface (Pencil Pro, windowing, widgets, App Store)**

| Field | Value |
|---|---|
| GitHub | #17 |
| Type | epic |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures, compat |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2` |
| Extra labels | agent-ready, innovation |

#### Context
iPad is the flagship surface: the reference device for the wet-ink latency budget (<= 16 ms pen-to-pixel, locked decision 7) and the surface competitors do best, so Sane Notes MUST match or beat Apple Notes / Goodnotes / Notability here or it has no wedge (docs/platform/ipad.md intro). This epic delivers the iPadOS-specific platform integration that sits on top of the shared Flutter editor and the `sane_ink`/`sane_ink_surface` fast path: Apple Pencil Pro extras (squeeze, barrel roll, hover, haptics, double-tap) via the `sane_stylus` plugin; Scribble via `sane_scribble`; iPadOS 26 windowing/multitasking (Split View, Slide Over, Stage Manager, additive windows); Quick Note linking; App Intents/Shortcuts/Spotlight; WidgetKit widgets + ControlWidget; Live Activities; keyboard/menu-bar/trackpad support; Files app integration; Universal Links; the `PrivacyInfo.xcprivacy` manifest + required-reason API audit; and the App Store / TestFlight release gates. It implements docs/platform/ipad.md, docs/design/gestures-and-shortcuts.md, docs/platform/compatibility-matrix.md, the M5 stylus-mastery requirements (PRD-ED-023 roll, PRD-ED-033 hover, PRD-ED-102 haptics), ADR-0012 (native plugin strategy) and ADR-0001 (single-codebase exit criterion + L4 multi-window risk).

#### Scope
**In:** the iPadOS-only platform features listed above and their native Swift plugin impls, entitlements, and store-compliance artefacts.
**Out:** the shared Dart ink pipeline and native ink surface (SN-INK area), the brush engine (SN-BRS), the cross-platform editor/library/sync/crypto logic, and the iPhone/Android/Web surfaces (their own area epics).

#### Acceptance criteria
- [ ] All child issues below are closed and CI is green.
- [ ] Every decision-7 iPad budget holds on the Tier 1 device lab (M-series ProMotion iPad Pro + iPad Air, docs/platform/compatibility-matrix.md §2).
- [ ] The App Store release gates in docs/platform/ipad.md §9 pass (privacy manifest, required-reason APIs, Sign in with Apple presence, multitasking/pointer/keyboard).
- [ ] No note content leaves the device and nothing from the draw loop is logged in profile/release.

#### Technical notes
Plugins under `plugins/`: `sane_stylus`, `sane_scribble`, `sane_secure_store`, `sane_cloud_drive`, `sane_ml_native`, `sane_pdfkit` (ADR-0012). App-level iPadOS integration (scenes, App Intents, WidgetKit, ActivityKit) lives in `app/` per ADR-0003. Children:
- [ ] [SN-IPAD-002](input-gestures.md#sn-ipad-002) sane_stylus iOS capability probe
- [ ] [SN-IPAD-003](input-gestures.md#sn-ipad-003) Pencil Pro squeeze palette
- [ ] [SN-IPAD-004](input-gestures.md#sn-ipad-004) Pencil Pro barrel roll
- [ ] [SN-IPAD-005](input-gestures.md#sn-ipad-005) Pencil hover preview
- [ ] [SN-IPAD-006](input-gestures.md#sn-ipad-006) Pencil Pro haptics
- [ ] [SN-IPAD-007](input-gestures.md#sn-ipad-007) Pencil double-tap binding
- [ ] [SN-IPAD-008](ocr-hwr.md#sn-ipad-008) Scribble in text fields
- [ ] [SN-IPAD-009](compat.md#sn-ipad-009) multi-window feasibility spike
- [ ] [SN-IPAD-010](compat.md#sn-ipad-010) Split View / Slide Over / Stage Manager
- [ ] [SN-IPAD-011](compat.md#sn-ipad-011) additive windowing
- [ ] [SN-IPAD-012](input-gestures.md#sn-ipad-012) menu bar + keyboard shortcuts
- [ ] [SN-IPAD-013](input-gestures.md#sn-ipad-013) trackpad & pointer support
- [ ] [SN-IPAD-014](notifications.md#sn-ipad-014) Quick Note linking
- [ ] [SN-IPAD-015](notifications.md#sn-ipad-015) App Intents & Shortcuts
- [ ] [SN-IPAD-016](notifications.md#sn-ipad-016) WidgetKit widgets
- [ ] [SN-IPAD-017](notifications.md#sn-ipad-017) ControlWidget
- [ ] [SN-IPAD-018](notifications.md#sn-ipad-018) Live Activity for recording
- [ ] [SN-IPAD-019](sharing-export.md#sn-ipad-019) Files app integration
- [ ] [SN-IPAD-020](security.md#sn-ipad-020) Universal Links
- [ ] [SN-IPAD-021](privacy.md#sn-ipad-021) privacy manifest & required-reason APIs
- [ ] [SN-IPAD-022](ink.md#sn-ipad-022) PencilKit interop decision
- [ ] [SN-IPAD-023](release.md#sn-ipad-023) App Store Connect readiness
- [ ] [SN-IPAD-024](ci-cd.md#sn-ipad-024) TestFlight pipeline
- [ ] [SN-IPAD-025](perf.md#sn-ipad-025) iPad perf validation
- [ ] [SN-IPAD-026](text.md#sn-ipad-026) native text-input platform views (L2)
- [ ] [SN-IPAD-027](compat.md#sn-ipad-027) iPadOS 26/18/17.5 availability gating
- [ ] [SN-IPAD-028](editor.md#sn-ipad-028) scene/editor state restoration
- [ ] [SN-IPAD-029](compat.md#sn-ipad-029) Tier 2 iPad degradation checks
- [ ] [SN-IPAD-030](sharing-export.md#sn-ipad-030) inter-app drag and drop
- [ ] [SN-IPAD-031](ci-cd.md#sn-ipad-031) iOS target config, capabilities & entitlements

#### Security & privacy
The native bridge, deep links, intents, widgets and Files imports are all untrusted-input boundaries (ADR-0012 security impact; MASVS-PLATFORM-1/3). Widgets/Live Activities/Quick Note must never leak note content to the Lock Screen or the OS activity index (MASVS-PRIVACY-1/2). The privacy manifest declares zero tracking and only opt-in crash reports (decision 8). Baseline: no content/coordinates/tokens in logs.

#### UX notes
All iPad chrome (contextual palette, hover cursor, widgets, menu bar, Live Activity) follows design/Sane Notes.dc.html and docs/design/screens-and-flows.md and MUST render in all 17 looks + light/dark, with Semantics labels, 44 pt targets, >= 4.5:1 contrast, and full keyboard reachability.

#### Test plan
Per child issue. Golden tests for every painted surface across looks; `integration_test` + `patrol` for native dialogs; `tools/perf_harness` on the Tier 1 device lab.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) monorepo scaffold. Individual children depend on SN-INK, SN-ED, SN-CORE, SN-LIB, SN-AUD and SN-PERF work as noted in each.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-002

<a id="sn-ipad-002"></a>

**Implement sane_stylus iOS capability probe for connected Apple Pencils**

| Field | Value |
|---|---|
| GitHub | #303 |
| Type | task |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-4` |
| Extra labels | agent-ready |

#### Context
Every Pencil extra (squeeze, barrel roll, hover, haptics, double-tap) is capability-gated: the brush engine and stylus code MUST feature-detect per connected Pencil, never assume a model, because the four generations have different envelopes (docs/platform/ipad.md §2; docs/design/gestures-and-shortcuts.md §3). This task delivers the `sane_stylus` federated plugin's Dart platform-interface and the iOS/iPadOS Swift implementation's capability probe, which the later Pencil-feature issues consume. It is the foundation of the whole stylus-mastery set and implements ADR-0012's federated-plugin + Pigeon contract.

#### Scope
**In:** `plugins/sane_stylus` platform-interface (`SaneStylusPlatform`), the Pigeon schema, the Swift impl returning a `PencilCapabilities` descriptor (pressure/tilt/azimuth/roll/doubleTap/squeeze/hover/haptics booleans) detected per connected Pencil, connect/disconnect events, and a mock impl for tests.
**Out:** the actual squeeze/roll/hover/haptics/double-tap handlers ([SN-IPAD-003](input-gestures.md#sn-ipad-003)..[SN-IPAD-007](input-gestures.md#sn-ipad-007)); the wet-ink sample capture ([SN-INK-006](ink.md#sn-ink-006)).

#### Acceptance criteria
- [ ] `capabilities()` returns a `PencilCapabilities` struct correct for Pencil 1, Pencil 2, Pencil USB-C, and Pencil Pro per the docs/platform/ipad.md §2 matrix (roll/squeeze/haptics only true on Pencil Pro; hover only on M-iPads).
- [ ] Capability changes when a different Pencil connects emit a stream event within one run loop.
- [ ] The mock impl lets `packages/` and `app/` tests run with no device; unknown/absent Pencil resolves to an all-false envelope (finger/velocity fallback).
- [ ] Pigeon-generated Dart/Swift stubs are checked in and CI fails if stale.

#### Technical notes
Swift reads `UIPencilInteraction`, `UITouch.type == .pencil`, and hover availability; expose via `EventChannel`/Pigeon per ADR-0012. Interface sketch in docs/platform/ipad.md §6 (`SaneStylusPlatform`). Consumed by `sane_ink` and the editor. Do not sniff device model strings; probe APIs. Deployment target `IPHONEOS_DEPLOYMENT_TARGET = 17.0`.

#### Security & privacy
Channel payloads crossing Dart<->native are untrusted input: validate the `PencilCapabilities` shape on the Dart side and reject malformed payloads (MASVS-PLATFORM-1, MASVS-CODE-4). No PII: capability booleans only, no identifiers. Baseline: no logging of stroke data or tokens.

#### UX notes
No user-facing UI. Downstream features read this probe to hide controls a Pencil cannot drive (e.g. no squeeze row on Pencil 2); those surfaces follow docs/design/screens-and-flows.md. Ensure the absence of a capability is announced by an accessible fallback, not a silently dead control.

#### Test plan
Unit: `plugins/sane_stylus/test/capabilities_test.dart` (matrix per Pencil, mock impl). Golden: none. Integration: `plugins/sane_stylus/example/integration_test/probe_test.dart` via `patrol` on a real iPad with Pencil Pro + Pencil 2.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) monorepo scaffold (plugin skeleton).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-003

<a id="sn-ipad-003"></a>

**Implement Apple Pencil Pro squeeze to open the contextual tool palette**

| Field | Value |
|---|---|
| GitHub | #304 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-002](input-gestures.md#sn-ipad-002), [SN-ED-005](editor.md#sn-ed-005) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, innovation |

#### Context
Squeeze is a Pencil Pro differentiator no finger or older Pencil offers. Squeezing the pencil MUST open the contextual QuickMenu / arc palette (recent pens + colours + undo/redo + the 6 most-used actions) anchored at the pencil's hover pose (docs/platform/ipad.md §5; docs/design/gestures-and-shortcuts.md §3.2). This closes the parity gap with Notability's Arc menu and Fresco's squeeze toolbar and implements the M5 stylus-mastery scope of PRD-01.

#### Scope
**In:** wiring `sane_stylus` squeeze events (`onPencilSqueeze { phase }`, phases began/changed/ended) to open/anchor the editor's existing contextual palette overlay; squeeze during a QuickShape confirms the shape; honour the user's system `preferredSqueezeAction`.
**Out:** the palette overlay's own visual design (reuse the editor overlay from [SN-ED-005](editor.md#sn-ed-005)); barrel roll ([SN-IPAD-004](input-gestures.md#sn-ipad-004)); hover ([SN-IPAD-005](input-gestures.md#sn-ipad-005)).

#### Acceptance criteria
- [ ] A squeeze opens the contextual palette anchored at `hoverPose.location`; a second squeeze or tap-away dismisses it.
- [ ] If the system `preferredSqueezeAction` is `.runSystemShortcut` the app receives no squeeze event and MUST NOT depend on squeeze as the only path to any action (every action also reachable from the dock/menu).
- [ ] Squeeze `phase` transitions (began/changed/ended) can confirm an in-progress QuickShape (docs/design/gestures-and-shortcuts.md §5).
- [ ] Palette open/anchor latency <= 100 ms; no dropped frames while drawing.
- [ ] Feature hidden when `capabilities().squeeze == false`.

#### Technical notes
Consume `PencilInteraction.squeeze(phase, hoverPose)` from [SN-IPAD-002](input-gestures.md#sn-ipad-002). Swift side `UIPencilInteraction` / `.onPencilSqueeze` + `preferredSqueezeAction` (docs/platform/ipad.md §3 API map). The palette is the design-system floating tool overlay, not a system menu. State in `app/` Riverpod, not the plugin.

#### Security & privacy
Squeeze maps only to non-destructive UI (tool swap, menu) so an accidental trigger is harmless (docs/design/gestures-and-shortcuts.md §7). Untrusted channel event validated before use (MASVS-PLATFORM-1). Baseline: no content/tokens logged.

#### UX notes
Reuse the contextual QuickMenu / arc palette from design/Sane Notes.dc.html and docs/design/screens-and-flows.md §7; render in all 17 looks + light/dark (golden). Provide a non-gesture equivalent (dock QuickMenu button) per WCAG 2.5.1; 44 pt targets, Semantics labels on every arc action, contrast >= 4.5:1. Respect the palette's dock-side under left-handed mode.

#### Test plan
Widget: `app/test/editor/squeeze_palette_test.dart` (open/anchor/dismiss, capability-off hides it). Golden: `app/test/golden/squeeze_palette_looks_test.dart` across looks. Integration: `app/integration_test/pencil_squeeze_test.dart` via `patrol` on Pencil Pro.

#### Dependencies
[SN-IPAD-002](input-gestures.md#sn-ipad-002) capability probe; [SN-ED-005](editor.md#sn-ed-005) palette dock overlay.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-004

<a id="sn-ipad-004"></a>

**Implement Apple Pencil Pro barrel roll to rotate calligraphy and chisel nibs**

| Field | Value |
|---|---|
| GitHub | #305 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures, brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-002](input-gestures.md#sn-ipad-002), [SN-BRS-002](brushes.md#sn-brs-002) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, innovation |

#### Context
Barrel roll is Pencil Pro + iPadOS 17.5-only and gives calligraphy a real analog feel: rolling the pencil MUST rotate the chisel/calligraphy nib live, combining `rollAngle` with `azimuth` for responsiveness (docs/platform/ipad.md §5; docs/design/gestures-and-shortcuts.md §3.3). Roll arrives first as a digitizer estimate and is refined over Bluetooth, so it MUST be reconciled or fast strokes render subtly wrong (docs/platform/ipad.md §4 step 4). Implements PRD-ED-023 (roll capture, M5) and the brush orientation binding PRD-ED-158.

#### Scope
**In:** map `rollAngle` (+ `azimuth`) to the nib orientation of the calligraphy pen and chisel highlighter/marker; a per-pen "Lock angle" toggle that overrides roll and uses the nib-angle slider; hover preview of nib angle before contact; estimated-property reconciliation of roll and force via `touchesEstimatedPropertiesUpdated`, correlated by `estimationUpdateIndex`, patched into stored stroke points before serialisation.
**Out:** the brush parameter schema itself ([SN-BRS-002](brushes.md#sn-brs-002)); hover cursor rendering ([SN-IPAD-005](input-gestures.md#sn-ipad-005)).

#### Acceptance criteria
- [ ] Rolling the Pencil Pro rotates the chisel/calligraphy nib live at >= 60 fps with no added pen-to-pixel latency beyond the ProMotion budget (<= 16 ms).
- [ ] Final reconciled roll/force values replace the initial estimates in the serialised stroke (byte-check after reconciliation).
- [ ] "Lock angle" on a pen disables roll and uses the slider value (Notability model).
- [ ] On non-Pro Pencils/finger/mouse the nib angle falls back to azimuth-only (or the slider) and no roll control is shown (`capabilities().roll == false`).

#### Technical notes
Consume `rollAngle` and `estimatedUpdates` streams from [SN-IPAD-002](input-gestures.md#sn-ipad-002). Swift `UITouch.rollAngle` + `touchesEstimatedPropertiesUpdated(_:)` (docs/platform/ipad.md §3/§4). Nib orientation binds through the brush `barrelRollToSize/Opacity` and orientation params ([SN-BRS-002](brushes.md#sn-brs-002)). Reconciliation must patch `sane_ink` stroke points, not just the wet preview.

#### Security & privacy
None beyond baseline: roll/force are per-stroke geometry, never logged (draw loop logs nothing in profile/release). Channel events validated (MASVS-PLATFORM-1).

#### UX notes
Calligraphy/chisel nibs from design/Sane Notes.dc.html brush set; nib-angle preview on hover matches docs/design/screens-and-flows.md §7. Provide the "Lock angle" toggle and the numeric nib-angle slider as the non-gesture alternative (WCAG 2.5.1). Golden-test nib rotation across looks + light/dark.

#### Test plan
Unit: `packages/sane_ink/test/estimated_reconciliation_test.dart` (roll/force patch by updateIndex). Golden: `app/test/golden/calligraphy_roll_looks_test.dart`. Integration: `app/integration_test/pencil_roll_test.dart` via `patrol` on Pencil Pro.

#### Dependencies
[SN-IPAD-002](input-gestures.md#sn-ipad-002) capability probe; [SN-BRS-002](brushes.md#sn-brs-002) brush parameter schema.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-005

<a id="sn-ipad-005"></a>

**Implement Apple Pencil hover preview for brush cursor and palette anchoring**

| Field | Value |
|---|---|
| GitHub | #306 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures, editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-002](input-gestures.md#sn-ipad-002) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
Hover (Pencil 2/Pro on M-iPads) shows where a mark will land before contact, which matters when annotating dense text or PDFs (docs/platform/ipad.md §5; docs/design/gestures-and-shortcuts.md §3.4). Sane Notes MUST show a brush cursor previewing size/shape/colour at the hover point, and anchor the contextual palette to the hover pose. Implements PRD-ED-033 (hover preview, M5).

#### Scope
**In:** subscribe to the `HoverPose` stream (location, zOffset, azimuth, altitude, roll); render a brush cursor at the hover point; feed the pose to the squeeze palette anchor ([SN-IPAD-003](input-gestures.md#sn-ipad-003)); optional hover pinch/slide to adjust size/opacity.
**Out:** the squeeze palette itself; the wet stroke; Android/web hover (their platform areas).

#### Acceptance criteria
- [ ] While hovering with a supporting Pencil, a brush cursor tracks the tip at >= 60 fps and previews the active brush's size/shape/colour.
- [ ] The cursor disappears on contact (stroke starts) and on Pencil disconnect.
- [ ] Hover preview is hidden when `capabilities().hover == false` (Pencil 1, USB-C on non-hover iPads, finger) with no dead affordance.
- [ ] Cursor honours the current look's ink/cursor tokens and inverts correctly in dark mode.

#### Technical notes
Consume `hover` stream from [SN-IPAD-002](input-gestures.md#sn-ipad-002); Swift `UIHoverGestureRecognizer` + `UIPencilHoverPose` (docs/platform/ipad.md §3 API map). Render the cursor in the Flutter chrome layer (`CustomPainter` in a `RepaintBoundary`), never on the native front buffer. Feature-detect hover, never sniff device.

#### Security & privacy
None beyond baseline: hover coordinates are transient UI, never logged or persisted; channel events validated (MASVS-PLATFORM-1). No tokens/content logged.

#### UX notes
Brush cursor per design/Sane Notes.dc.html hover state and docs/design/screens-and-flows.md §7; render across all 17 looks + light/dark (golden). The cursor is an enhancement, not the only feedback; ensure size/colour are also shown in the dock for users without hover. Respect reduced-motion.

#### Test plan
Widget: `app/test/editor/hover_cursor_test.dart` (tracks pose, hides on contact/disconnect/capability-off). Golden: `app/test/golden/hover_cursor_looks_test.dart`. Integration: `app/integration_test/pencil_hover_test.dart` via `patrol` on an M-iPad with Pencil Pro.

#### Dependencies
[SN-IPAD-002](input-gestures.md#sn-ipad-002) capability probe.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-006

<a id="sn-ipad-006"></a>

**Fire Apple Pencil Pro haptics on shape-snap and alignment via feedback generator**

| Field | Value |
|---|---|
| GitHub | #307 |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-002](input-gestures.md#sn-ipad-002) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, innovation |

#### Context
Pencil Pro haptics let the user feel a snap/shape confirmation without looking, a subtle polish competitors mostly lack (docs/platform/ipad.md §5; docs/design/gestures-and-shortcuts.md §3.5). Sane Notes MUST fire a spatial haptic on shape recognition/close and on snap-to-guide. Implements PRD-ED-102 (haptic on snap/shape-complete, M5).

#### Scope
**In:** wire the editor's shape-snap and alignment events to `sane_stylus.triggerFeedback(kind, at)`; Swift routes to `UICanvasFeedbackGenerator.pathCompleted(at:)` / `alignmentOccurred(at:)`; an in-app haptics toggle; honour the system haptics-off setting.
**Out:** shape recognition itself ([SN-SHP-001](shapes-diagrams.md#sn-shp-001)); Android/web haptics.

#### Acceptance criteria
- [ ] A haptic fires within one frame of a shape closing (`pathCompleted`) and of an alignment snap (`alignmentOccurred`), spatially anchored at the event point (iOS 18 view+point form).
- [ ] No haptic when `capabilities().haptics == false`, when the in-app toggle is off, or when system haptics are disabled.
- [ ] The haptic is never the only confirmation: a visual confirm also shows (accessibility).
- [ ] Firing haptics adds no measurable pen-to-pixel latency.

#### Technical notes
Consume the feedback API from [SN-IPAD-002](input-gestures.md#sn-ipad-002); Swift `UICanvasFeedbackGenerator(view:)` (docs/platform/ipad.md §3/§5). iOS 18 routes to the Pencil automatically — no Pencil-specific API. Trigger points come from the shapes/snapping work ([SN-SHP-001](shapes-diagrams.md#sn-shp-001)) and the alignment engine.

#### Security & privacy
None beyond baseline: haptic triggers carry no content; channel events validated (MASVS-PLATFORM-1). No logging of content or tokens.

#### UX notes
Pairs with the visual snap indicators in design/Sane Notes.dc.html / docs/design/screens-and-flows.md §7. Haptic is an additional non-visual confirmation that helps low-vision users but MUST NOT be the sole signal (docs/design/gestures-and-shortcuts.md §9). Expose the toggle in Settings > Handwriting & stylus.

#### Test plan
Widget: `app/test/editor/haptic_feedback_test.dart` (fires on snap/close, respects toggles and capability-off) using a mock `sane_stylus`. Integration: `app/integration_test/pencil_haptics_test.dart` via `patrol` on Pencil Pro (manual felt-confirmation note).

#### Dependencies
[SN-IPAD-002](input-gestures.md#sn-ipad-002) capability probe; shape/alignment events from [SN-SHP-001](shapes-diagrams.md#sn-shp-001).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-007

<a id="sn-ipad-007"></a>

**Bind Apple Pencil double-tap to a remappable editor action**

| Field | Value |
|---|---|
| GitHub | #308 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures, settings |
| Size | S |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-002](input-gestures.md#sn-ipad-002) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
Double-tap (Pencil 2 & Pro) is a well-known quick tool swap. Sane Notes MUST honour the user's system preference and default to toggling eraser/last tool, while offering an in-app remapping (docs/platform/ipad.md §5; docs/design/gestures-and-shortcuts.md §3.1). This is core stylus parity (M5).

#### Scope
**In:** subscribe to `doubleTap` interactions; default action = toggle current tool <-> eraser; Settings mapping (Eraser / Previous tool / Colors, extend with Eyedropper / QuickMenu); respect the system `preferredTapAction` where set.
**Out:** squeeze ([SN-IPAD-003](input-gestures.md#sn-ipad-003)); the eraser tool itself.

#### Acceptance criteria
- [ ] A double-tap performs the mapped action; default toggles current tool <-> eraser.
- [ ] The Settings option (Eraser / Previous tool / Colors / Eyedropper / QuickMenu) changes behaviour immediately.
- [ ] Where the system `preferredTapAction` is set, the app's own mapping applies inside the Editor per docs/design/gestures-and-shortcuts.md §3.1.
- [ ] Double-tap is hidden/no-op when `capabilities().doubleTap == false`.
- [ ] The action is non-destructive so an accidental mid-note trigger is harmless (docs/design/gestures-and-shortcuts.md §7).

#### Technical notes
Consume `doubleTap` from [SN-IPAD-002](input-gestures.md#sn-ipad-002); Swift `UIPencilInteraction` / `onPencilDoubleTap`, `preferredTapAction` (docs/platform/ipad.md §3). Mapping persisted in settings (PRD-SET inventory). Editor tool state lives in `app/` Riverpod.

#### Security & privacy
None beyond baseline: mapping is a local preference; channel events validated (MASVS-PLATFORM-1). No content/tokens logged.

#### UX notes
Settings row "Double-tap the pencil" per docs/design/screens-and-flows.md §12; render across looks + light/dark. Provide equivalent dock buttons so the action is reachable without the gesture (WCAG 2.5.1); 44 pt targets, Semantics labels.

#### Test plan
Widget: `app/test/editor/double_tap_binding_test.dart` (each mapping, capability-off). Integration: `app/integration_test/pencil_double_tap_test.dart` via `patrol` on Pencil 2/Pro.

#### Dependencies
[SN-IPAD-002](input-gestures.md#sn-ipad-002) capability probe.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-012

<a id="sn-ipad-012"></a>

**Populate the iPad menu bar and wire the full keyboard-shortcut surface**

| Field | Value |
|---|---|
| GitHub | #313 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
iPad is expected to have full keyboard-shortcut support, and iPadOS 26 wants the persistent menu bar populated with the editor's real menus so keyboard users and the menu bar both work (docs/platform/ipad.md §7/§9). The shortcut scheme is already specified across platforms in docs/design/gestures-and-shortcuts.md §6 (Goodnotes/Notability conventions). This delivers the menu bar + shortcuts on iPad.

#### Scope
**In:** File/Edit/Insert/View/Tools menus in the persistent menu bar; the single-key tool shortcuts (P/H/E/V/S/T/I/R) suppressed while a text field is focused; edit/file/nav/view shortcuts (undo/redo, Cmd+K search, Cmd+F find, zoom, focus mode Cmd+Shift+F, Cmd+R record, Cmd+/ cheat sheet); long-press Cmd shows the live shortcut cheat sheet.
**Out:** trackpad/pointer behaviour ([SN-IPAD-013](input-gestures.md#sn-ipad-013)); the actions' own implementations (their feature areas).

#### Acceptance criteria
- [ ] The menu bar exposes File/Edit/Insert/View/Tools with the shortcuts from docs/design/gestures-and-shortcuts.md §6.
- [ ] Single-key tool switches (P/H/E/V/S/T/I/R) work only when the Editor has focus and no text field is active; inside a text field the key types the character (§7 conflict rule).
- [ ] Cmd+K opens universal search, Cmd+F in-note find, Cmd+Shift+F focus mode, Cmd+R start/stop recording, Cmd+/ the cheat sheet.
- [ ] Long-pressing Cmd shows the live shortcut overlay (Notability/Goodnotes pattern).
- [ ] Esc dismisses overlays / cancels the in-progress action / exits search.

#### Technical notes
Use Flutter `Shortcuts`/`Actions` + `PlatformMenuBar` for the iPad menu bar (ADR-0003). Suppress single-key tool shortcuts when a text field owns focus. Map to editor tool state ([SN-ED-002](editor.md#sn-ed-002)). Full key table in docs/design/gestures-and-shortcuts.md §6.1-6.3.

#### Security & privacy
None beyond baseline: shortcuts trigger local actions only; no content/tokens logged. A shortcut cannot bypass a note/app lock (MASVS-AUTH-1); no note content or tokens are written to logs (MASVS-PRIVACY-1).

#### UX notes
Cheat sheet + menu labels per docs/design/screens-and-flows.md; render across looks + light/dark. Every menu item and shortcut is a non-gesture alternative (WCAG 2.5.1). Ensure focus order and menu semantics are screen-reader correct; the cheat sheet is keyboard-dismissable.

#### Test plan
Widget: `app/test/input/keyboard_shortcuts_test.dart` (tool keys gated by focus, modified shortcuts fire, Esc behaviour). Golden: `app/test/golden/shortcut_cheatsheet_looks_test.dart`. Integration: `app/integration_test/menu_bar_test.dart` via `patrol` with a hardware keyboard.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) editor canvas & tool state machine.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-013

<a id="sn-ipad-013"></a>

**Support trackpad and pointer input with hover states and right-click menus**

| Field | Value |
|---|---|
| GitHub | #314 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | input-gestures, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Full pointer support is an App Store expectation on iPad (docs/platform/ipad.md §9), and the input map already defines mouse/trackpad behaviour in docs/design/gestures-and-shortcuts.md §6.4: left-drag draws with the active tool (no pressure, velocity thinning keeps life), two-finger scroll, Ctrl+wheel zoom, right-click context menus, hover tooltips/brush-cursor, middle/space-drag pan. Every long-press object menu MUST have a right-click equivalent.

#### Scope
**In:** pointer draw with velocity-derived width; two-finger scroll and Ctrl/pinch zoom on the trackpad; right-click (and secondary-click) context menus for object actions on a selection and page actions on empty canvas; hover states and brush-cursor preview; middle-drag / space-drag pan; pointer effects on interactive chrome.
**Out:** Pencil hover ([SN-IPAD-005](input-gestures.md#sn-ipad-005)); keyboard shortcuts/menu bar ([SN-IPAD-012](input-gestures.md#sn-ipad-012)).

#### Acceptance criteria
- [ ] A trackpad/mouse left-drag draws with the active tool using velocity thinning (no pressure) per docs/design/gestures-and-shortcuts.md §6.4.
- [ ] Two-finger scroll scrolls, Ctrl+wheel (or trackpad pinch) zooms, middle/space-drag pans.
- [ ] Right-click opens the object context menu on a selection and the page context menu on empty canvas; every long-press menu has this right-click equivalent (§6.4).
- [ ] Hovering a control shows its tooltip/pointer effect; hovering the canvas shows the brush cursor.
- [ ] Palm/finger vs pointer precedence follows docs/design/gestures-and-shortcuts.md §7.

#### Technical notes
Use Flutter `MouseRegion`/`Listener` with `PointerDeviceKind.mouse`/`trackpad`; branch pointer vs stylus vs finger (never resample the pen path). Context menus via the design-system menu component. Reference docs/design/gestures-and-shortcuts.md §6.4/§7 and ADR-0003.

#### Security & privacy
None beyond baseline: local input only; no content/tokens logged. Context-menu actions honour note/app locks (MASVS-AUTH-1); no note content or tokens are written to logs (MASVS-PRIVACY-1).

#### UX notes
Pointer effects, hover states and right-click menus per design/Sane Notes.dc.html and docs/design/screens-and-flows.md; render across all 17 looks + light/dark (golden for menus/hover). Keyboard-reachable equivalents for every right-click action (WCAG); 44 pt targets; contrast >= 4.5:1.

#### Test plan
Widget: `app/test/input/pointer_support_test.dart` (draw/scroll/zoom/pan, right-click menus, hover). Golden: `app/test/golden/context_menu_looks_test.dart`. Integration: `app/integration_test/trackpad_test.dart` via `patrol` with a Magic Keyboard/trackpad.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) editor canvas & tool state machine.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-PHN-006

<a id="sn-phn-006"></a>

**Add draw and pan disambiguation for finger-only phone input**

| Field | Value |
|---|---|
| GitHub | #850 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | input-gestures, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-005](ink.md#sn-phn-005), [SN-ED-002](editor.md#sn-ed-002), [SN-PG-002](pages-canvas.md#sn-pg-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
On a phone the same finger both draws and pans, and there is no pen to disambiguate — limitation **P2** in docs/platform/phones.md §9, whose impact is stated bluntly: accidental strokes and eaten scroll. The mitigation the doc requires is an explicit draw/pan mode **or** a two-finger-pan / one-finger-draw convention, configurable, clearly signalled, with a per-user default — and the rule that the app must not silently eat scroll (phones.md §6, §9).

This is consistent with the tablet gesture map, where two-finger drag already pans (PRD-ED-167, PRD-ED-007) and pinch zooms (PRD-ED-009-class requirements), so the phone convention is a narrowing of an existing model rather than a new one. It must also satisfy WCAG: every multipoint or path gesture needs a single-pointer, non-drag alternative (PRD-CO-318), so zoom and pan must also be reachable from buttons, and pointer actions must commit on the up-event and remain cancellable (PRD-CO-319).

#### Scope
**In:** the two-finger-pan / one-finger-draw convention on phones, an explicit draw/pan mode toggle in the editor chrome with a persistent visual state, the per-profile default preference, a scroll-intent heuristic that hands a one-finger drag to the scroller when the active tool is a non-drawing tool, button alternatives for pan/zoom/fit, and the first-run signalling of the convention.
**Out:** finger ink quality ([SN-PHN-005](ink.md#sn-phn-005)), zoom-to-write ([SN-PHN-007](editor.md#sn-phn-007)), reading mode where the canvas is read-only ([SN-PHN-008](pages-canvas.md#sn-phn-008)), the tablet palm-rejection stack, and the two/three-finger undo gestures (already PRD-ED-168 in the editor area).

#### Acceptance criteria
- [ ] Default on phones: one finger draws with the active tool, two fingers pan, pinch zooms — and this is stated to the user once, not discovered by accident.
- [ ] An explicit **draw/pan mode** control is available in the editor chrome; in pan mode one finger pans and does not ink, and the mode has a visible, non-colour-only state plus a `Semantics` label announcing it.
- [ ] The default (convention versus explicit mode) is a per-profile preference that persists across restarts and is changeable from Settings → Handwriting & stylus.
- [ ] Scroll is never silently eaten: with a non-drawing tool active (lasso idle, image, text), a one-finger drag pans rather than producing nothing.
- [ ] A two-finger gesture that starts while a one-finger stroke is in progress cancels the in-progress stroke cleanly (the stroke is removed and the surface re-rendered, matching the palm-cancel behaviour of PRD-ED-030) rather than committing a stray mark.
- [ ] Pan, zoom in/out and fit-to-page are each reachable by a single-pointer control (buttons in the toolbox sheet), satisfying PRD-CO-318.
- [ ] Accidental-stroke rate: in a scripted scroll-heavy manual pass (20 page scrolls with the pen tool active), zero strokes are committed.
- [ ] Gesture arbitration adds no measurable latency to the first ink sample — pen-down to first painted pixel is unchanged versus [SN-PHN-005](ink.md#sn-phn-005) within measurement noise, and no frame exceeds 16.7 ms while writing.
- [ ] Every gesture has a keyboard/AT-reachable equivalent on devices with a keyboard attached.

#### Technical notes
Implement arbitration in the editor input layer under `app/lib/editor/input/` on top of the raw `Listener` (never a `GestureDetector` on the draw path — CLAUDE.md §8). Track active pointer count: the first `PointerDownEvent` of kind `.touch` starts a provisional stroke; if a second touch pointer arrives within a short window (target ~60–80 ms, tuneable constant, documented) the provisional stroke is discarded and the gesture becomes pan/zoom. Keep the provisional stroke on the wet layer so the user sees immediate feedback, and remove it on promotion to pan — this is the same cancel path palm rejection uses, so reuse it rather than adding a second mechanism. Viewport transforms go through the existing pages/canvas viewport controller ([SN-PG-002](pages-canvas.md#sn-pg-002), [SN-PG-003](pages-canvas.md#sn-pg-003) for freeform). Mode state is part of the immutable editor tool state (Riverpod, ADR-0003). Where a stylus is present (S Pen phone, [SN-PHN-016](input-gestures.md#sn-phn-016)) the convention reverts to pen-draws / finger-pans, chosen by capability query, not platform check.

#### Security & privacy
None beyond baseline. Baseline: gesture arbitration handles raw pointer samples, which are note content in transit — none of it may be logged, and no analytics may record gesture streams (CLAUDE.md §7.3, MASVS-PRIVACY-1, CWE-532). A discarded provisional stroke must be dropped from memory, not retained in an undo buffer, so a cancelled gesture leaves no recoverable artefact in the document (data-minimisation, MASVS-PRIVACY-4). No new permission, sensor, or network egress; telemetry stays opt-in and off by default (CLAUDE.md §7.4).

#### UX notes
The surface is the Editor canvas and palette dock (docs/design/screens-and-flows.md §7.2–§7.3); the mode control sits in the compact dock or its toolbox sheet from [SN-PHN-004](editor.md#sn-phn-004). Signalling follows ux-principles.md §3 ('do not preemptively teach'): one gentle, dismissible tip the first time the user pans on a phone — 'Two fingers move the page. One finger writes.' — in the toast style (`SaneToast`, 2.4 s, bottom-centre above the palette), never a coach-mark storm. State must be legible in all 17 looks and dark mode: selected state uses `--ac`/`--aci` like every other active tool (ux-principles.md §9.2), plus an icon change so meaning is not carried by colour alone (PRD-CO-311). Motion: no animation on the arbitration itself — ink is immediate and is never animated (ux-principles.md §6). a11y: the mode toggle is 44×44 pt / 48×48 dp, announces its state, and the button alternatives for zoom/pan satisfy 2.5.1/2.5.7.

#### Test plan
- `app/test/editor/input/gesture_arbitration_test.dart` — pointer-sequence table: 1-finger draw, 1→2 finger promote-to-pan cancels the stroke, 2-finger pinch zooms, non-drawing tool 1-finger pans.
- `app/test/editor/input/stroke_cancel_test.dart` — a promoted gesture leaves no stroke in the document and no undo entry (negative test).
- `app/test/editor/draw_pan_mode_test.dart` — explicit mode toggle, persistence per profile, semantics label/state.
- `app/integration_test/phone_scroll_no_stray_ink_test.dart` — 20 scripted scrolls with the pen tool active commit zero strokes.
- `app/integration_test/phone_editor_latency_test.dart` — re-run the latency harness to prove arbitration adds no regression.

#### Dependencies
[SN-PHN-005](ink.md#sn-phn-005), [SN-ED-002](editor.md#sn-ed-002), [SN-PG-002](pages-canvas.md#sn-pg-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-016

<a id="sn-phn-016"></a>

**Support S Pen single-click capture and pen-on-phone behaviour**

| Field | Value |
|---|---|
| GitHub | #860 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-phone |
| Areas | input-gestures, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-005](ink.md#sn-phn-005), [SN-PHN-010](library.md#sn-phn-010), [SN-AND-001](compat.md#sn-and-001) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
A minority of Android phones have a pen — Galaxy Note / S-Ultra / Fold with an S Pen, and some USI devices — and docs/platform/phones.md §1 and §6 are precise about how to treat them: the phone UI MUST be designed finger-first and treat the pen as an **enhancement**; where an S Pen or USI pen is present the full stylus stack from docs/platform/android.md applies and finger-draw can revert to pan. phones.md §5 additionally lists **S Pen single click → new note / start recording** via the S Pen Remote SDK as a hardware capture entry point, and notes the hard constraint that Samsung allows **only one remote action per app** (`remote_action.xml`); extra RemoteActions are ignored (android.md §S Pen Remote).

This issue is the phone-side wiring of that: a capability-driven switch of input defaults when a pen is attached or detached, and the single S Pen Remote action bound to capture. The `sane_stylus` plugin surface (`SpenRemote`, `SpenUnitManager`, `ButtonEvent`, `AirMotionEvent`) is owned by [SN-AND-001](compat.md#sn-and-001); here it is consumed.

#### Scope
**In:** pen-presence detection on phones and the resulting default switch (pen draws / finger pans), pen-detach handling (revert to finger-first), binding the single S Pen Remote action to a user-chosen capture action (new note or start recording), the settings row that chooses it, graceful degradation where no pen exists, and Galaxy screen-off memo hand-off where available.
**Out:** the `sane_stylus` plugin and Samsung SDK integration itself ([SN-AND-001](compat.md#sn-and-001), ADR-0012), air-motion gestures and page turn (Android tablet area), Apple Pencil (iPad only — there is no pen on iPhone), and the finger ink model ([SN-PHN-005](ink.md#sn-phn-005)).

#### Acceptance criteria
- [ ] When an active stylus is detected on a phone, the input default switches to pen-draws / finger-pans without a restart; detaching or holstering the pen reverts to finger-first within one interaction.
- [ ] The switch is driven by a **capability query**, never by a device-name or manufacturer check, and degrades silently on devices with no pen (CLAUDE.md §8).
- [ ] Exactly **one** S Pen Remote action is registered (Samsung's per-app limit), and the user chooses which in Settings → Handwriting & stylus: 'New note' (default) or 'Start recording'.
- [ ] A single S Pen button click performs the chosen capture action and lands in a writable page (or a running recording) within the < 1.5 s budget, honouring the lock/guest guard from [SN-PHN-015](security.md#sn-phn-015).
- [ ] Where the S Pen Remote SDK or BLE pairing is unavailable, the feature is hidden rather than shown broken, and the settings row explains why in one line.
- [ ] Pen input on a phone keeps the Android latency target: <= 25 ms pen-to-pixel where an active stylus exists (phones.md §1 table, budget B2 class), 60 fps floor, no frame > 16.7 ms.
- [ ] Pressure and tilt from the S Pen are used where reported; the velocity model from [SN-PHN-005](ink.md#sn-phn-005) remains the fallback for finger input in the same session.
- [ ] Switching input mode mid-session never loses an in-progress stroke.
- [ ] The settings row renders correctly in all 17 looks and dark mode, with a `Semantics` label and >= 48×48 dp target.

#### Technical notes
Consume `plugins/sane_stylus` (Dart platform-interface + Kotlin impl; ADR-0012) for `Stream<ButtonEvent> spenButton` and pen-presence events; guard the S Pen Remote path behind Samsung-device + feature checks inside the plugin, so `app/` only ever sees a capability boolean (android.md §`sane_stylus`). The remote action is declared in `app/android/app/src/main/res/xml/remote_action.xml`; because only one is honoured, the chosen action is resolved at runtime by the app rather than by registering two. Input defaults live in the same editor tool state as [SN-PHN-005](ink.md#sn-phn-005)/[SN-PHN-006](input-gestures.md#sn-phn-006) so there is one source of truth for 'who draws'. Capture is invoked through the same `/capture/new` route as every other entry point ([SN-PHN-010](library.md#sn-phn-010)), which means it inherits the guard from [SN-PHN-015](security.md#sn-phn-015) for free. Coalesced-sample capture and the low-latency surface come from `plugins/sane_ink_surface` (ADR-0008) and need no phone-specific change.

#### Security & privacy
Threats and controls: **T-BLE-REMOTE-SPOOF** — the S Pen Remote is a BLE peripheral; a spoofed or replayed button event could trigger an action. Control: the bound action is non-destructive by construction (create a new note / start a recording, never delete, share or export), it passes the entry-point guard so a locked device still requires unlock, and recording still shows the consent notice and indicators (PRD-LB-226) — MASVS-PLATFORM-1, MASVS-AUTH-2, CWE-306. **T-PERMISSION-CREEP** — BLE integration can drag in location permissions on older Android. Control: request no location permission; if the SDK requires one on a given API level, the feature is disabled on that level rather than requesting it, and the decision is recorded in the PR (MASVS-PRIVACY-3, MASVS-PRIVACY-4). **T-LOG** — pen telemetry (pressure, tilt, coordinates) is note content; none of it may be logged in profile/release (CLAUDE.md §7.3, MASVS-PRIVACY-1, CWE-532). No new network egress.

#### UX notes
Surface: Settings → Handwriting & stylus (docs/design/screens-and-flows.md §12), which already hosts 'Palm rejection', 'Pressure sensitivity', 'Draw with finger', 'Left-handed mode', 'Toolbar position' and 'Double-tap the pencil'. Add one `SaneSettingRow` + `SaneSegmented` for the pen-button action, written in the ux-principles.md §5 voice: 'Pen button — One click starts a new note, or starts recording.' Where unsupported: 'Your phone does not have a pen button.' — a fact, not an error. When the pen is attached and the input default flips, show one quiet toast ('Pen detected — your finger moves the page now') rather than a modal; never interrupt writing. All 17 looks and dark mode apply to the settings row; nothing here paints the canvas. a11y: the segmented control announces its options and state, targets meet 48 dp, and the feature is never the only way to reach capture (every action is also in the Capture hub).

#### Test plan
- `app/test/editor/pen_presence_defaults_test.dart` — attach/detach flips the default; no in-progress stroke is lost; no platform check in the path.
- `app/test/integrations/spen_remote_action_test.dart` — exactly one action registered; chosen action routes to `/capture/new` or the recorder; passes the entry-point guard.
- `app/test/settings/pen_button_setting_test.dart` — persistence, unsupported-device copy, semantics.
- `app/integration_test/phone_spen_capture_test.dart` — patrol run with a stubbed `ButtonEvent` stream on a Galaxy profile.
- Manual on the Tier-2 Samsung Galaxy S Pen phone in `tools/device_lab`: single-click capture, pen-detach revert, <= 25 ms pen-to-pixel via `tools/perf_harness`.

#### Dependencies
[SN-PHN-005](ink.md#sn-phn-005), [SN-PHN-010](library.md#sn-phn-010), [SN-AND-001](compat.md#sn-and-001)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-006

<a id="sn-web-006"></a>

**Add palm rejection and touch-action handling to the web canvas**

| Field | Value |
|---|---|
| GitHub | #819 |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | input-gestures, ink |
| Size | S |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-004](ink.md#sn-web-004) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The web platform gives us **no native palm flag**: unlike PencilKit or Android's tool type, a browser reports a resting palm as an ordinary `touch` pointer with a large contact area, so rejection has to be a Dart-side heuristic over `pointerType`, `width`/`height` and `pressure` (`docs/platform/web.md` §3). At the same time the canvas must opt out of browser scroll/zoom with CSS `touch-action`, and `touch-action: none` can block the user's own pinch-zoom — a WCAG 2.2 failure (1.4.4 Resize Text / 1.4.10 Reflow) if applied bluntly to the whole page. This issue implements `PRD-ED-029` (palm rejection) on web while honouring `PRD-ED-031` (Draw with finger) and keeping page-level zoom available.

#### Scope
**In:** the web branch of the palm-rejection heuristic; scoping `touch-action` to the canvas element only; the interaction between the Settings "Palm rejection" toggle, "Draw with finger", and an actively hovering/drawing pen; gesture pass-through so two-finger pan/zoom still works on the canvas.
**Out:** the rejection rules for native platforms, the wrist-guard feature (`PRD-ED-030`, not web), and the capture pipeline itself ([SN-WEB-004](ink.md#sn-web-004)).

#### Acceptance criteria
- [ ] While a pen pointer is down or hovering, concurrent `touch` pointers do not draw; they pan/zoom instead (`PRD-ED-029`).
- [ ] With "Draw with finger" on and **no** stylus present, finger input draws normally (`PRD-ED-031`); the documented interaction between the two settings is covered by a test.
- [ ] A large-contact touch (reported `width`/`height` above the tuned threshold) never starts a stroke, and a legitimate fingertip does when finger drawing is enabled.
- [ ] `touch-action: none` is applied to the canvas element **only**; the surrounding page and chrome still respond to browser pinch-zoom, and zooming the page to 200 % keeps all controls reachable.
- [ ] Two-finger pan/zoom on the canvas works on Chrome, Safari iPadOS and Firefox without ever leaving stray ink.
- [ ] Rejection adds no measurable cost to the draw loop: B3 ≤ 30 ms still holds on Chrome desktop.

#### Technical notes
Keep the heuristic in shared logic where possible (`packages/sane_ink`) with web-specific thresholds injected from `app/lib/editor/input/web_pointer_source.dart`; do not fork the algorithm. Apply `touch-action` from the web plugin implementation against the canvas element, not `document.body`. Treat `pointerType == 'pen'` as authoritative and deprioritise concurrent touch for a short trailing window after pen-up so a palm lifting last cannot emit a dot. Thresholds must be constants with named rationale, tunable without a rebuild via a debug flag. Reference `docs/platform/web.md` §3 (palm rejection row), `docs/adr/0008-ink-pipeline-and-low-latency-surfaces.md` (Tier B input rules) and `docs/design/accessibility.md` for the zoom requirement.

#### Security & privacy
None beyond baseline, and the baseline still applies: no logging of pointer coordinates, contact geometry or note content in any build (secure-coding checklist §0.2, §7, CWE-532, MASVS-PRIVACY-1); contact-size heuristics are computed transiently and never persisted or synced, so no new stored asset or identifier is created (MASVS-PRIVACY-2); the change adds no network call and no new DOM sink (MASVS-PLATFORM-2).

#### UX notes
Editor canvas, `docs/design/screens-and-flows.md` §7.2 and the Settings → Handwriting & stylus panel §12 where the "Palm rejection" and "Draw with finger" toggles live with their verbatim copy. Rejection must feel invisible: no toast, no flash, nothing drawn then removed. Visual states are unchanged, so all **17 looks in light and dark** are unaffected — but re-run the canvas goldens to prove it. Accessibility: never block browser zoom outside the canvas (WCAG 2.2 1.4.4/1.4.10, `PRD-CO-313`); keep the 44 px minimum targets on the toggles; the settings toggles carry `Semantics` labels and are keyboard reachable with a visible focus ring.

#### Test plan
- `packages/sane_ink/test/palm_rejection_test.dart` — threshold and pen-priority logic, including the trailing window.
- `app/test/web/touch_action_test.dart` — asserts the attribute is scoped to the canvas element only.
- `app/integration_test/web/palm_rejection_test.dart` — synthetic pen + touch streams in headless Chromium, both settings permutations.
- Manual: Safari iPadOS with Apple Pencil and a resting palm; a Chromebook with USI pen; page zoom to 200 % on desktop Chrome.

#### Dependencies
[SN-WEB-004](ink.md#sn-web-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

