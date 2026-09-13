# Backlog — area: compat

33 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-AND-001](compat.md#sn-and-001) **Android platform: tablet, phone, foldable & ChromeOS surface** (epic · M5 Phones & Platform Parity)
  - [SN-AND-002](ink.md#sn-and-002) **Implement Jetpack Ink wet-ink front-buffer surface for Android** · p0 · feature · L · M1 Ink Editor Alpha
  - [SN-AND-003](ink.md#sn-and-003) **Add GLFrontBufferedRenderer low-latency path for custom brushes** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-AND-004](ink.md#sn-and-004) **Capture MotionEvent historical samples with unbuffered dispatch & prediction** · p0 · feature · M · M1 Ink Editor Alpha
  - [SN-AND-005](ink.md#sn-and-005) **Composite native ink surface via Texture and select Tier A/B by capability** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-AND-006](ink.md#sn-and-006) **Implement Android palm rejection with ACTION_CANCEL, FLAG_CANCELED & tool-type** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-AND-007](input-gestures.md#sn-and-007) **Expose stylus pressure, tilt, orientation & hover axes via sane_stylus** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-AND-008](input-gestures.md#sn-and-008) **Bind stylus barrel button and eraser tool-type to editor modifiers** · p2 · feature · S · M1 Ink Editor Alpha
  - [SN-AND-009](input-gestures.md#sn-and-009) **Integrate Samsung S Pen Remote SDK for button and air actions** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-AND-010](input-gestures.md#sn-and-010) **Support USI & Chromebook stylus and register as ChromeOS note-taker** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-AND-011](input-gestures.md#sn-and-011) **Enable stylus handwriting into text fields and disable it over the canvas** · p2 · feature · M · M2 Library & Documents
  - [SN-AND-012](compat.md#sn-and-012) **Drive adaptive layout from Android window size classes** · p1 · feature · L · M5 Phones & Platform Parity
  - [SN-AND-013](compat.md#sn-and-013) **Handle foldable transitions and ChromeOS desktop windowing** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-AND-014](compat.md#sn-and-014) **Migrate to predictive back with OnBackInvokedCallback** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-AND-015](compat.md#sn-and-015) **Handle enforced edge-to-edge display and window insets** · p1 · feature · S · M5 Phones & Platform Parity
  - [SN-AND-016](theming.md#sn-and-016) **Reconcile Material 3 dynamic colour with the 17 Sane Notes looks** · p3 · feature · M · M5 Phones & Platform Parity
  - [SN-AND-017](auth.md#sn-and-017) **Build Credential Manager sign-in surface (passkeys, passwords, Google)** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AND-018](storage.md#sn-and-018) **Implement SAF document access with persistable URI permissions** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-AND-019](security.md#sn-and-019) **Store keys at rest with Android Keystore, StrongBox & BiometricPrompt** · p0 · security · L · M4 Identity, Sync & Privacy
  - [SN-AND-020](security.md#sn-and-020) **Attest stateless services with Play Integrity without gating notes** · p2 · security · M · M8 Launch & Growth
  - [SN-AND-021](compat.md#sn-and-021) **Ensure all native libraries are 16 KB page-aligned with a CI gate** · p0 · infra · M · M5 Phones & Platform Parity
  - [SN-AND-022](ci-cd.md#sn-and-022) **Configure Android build: minSdk 29, target SDK 36, ABI splits & App Bundle** · p1 · infra · M · M0 Foundations
  - [SN-AND-023](audio.md#sn-and-023) **Add foreground service and notifications for background recording & sync** · p1 · feature · M · M3 Audio & Recognition
  - [SN-AND-024](notifications.md#sn-and-024) **Build home-screen widgets and quick-capture entry points** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-AND-025](notifications.md#sn-and-025) **Handle verified App Links that land in view/confirm, never auto-mutate** · p1 · feature · S · M5 Phones & Platform Parity
  - [SN-AND-026](release.md#sn-and-026) **Prepare Google Play readiness: Data Safety, permissions rationale & gate** · p1 · infra · M · M7 Beta Hardening & Security Audit
  - [SN-AND-027](perf.md#sn-and-027) **Validate performance on the 4 GB Snapdragon 680-class low-end device** · p1 · test · M · M5 Phones & Platform Parity
  - [SN-AND-028](security.md#sn-and-028) **Add R8/ProGuard rules and obfuscation for the Kotlin/plugin layer** · p2 · infra · S · M5 Phones & Platform Parity
  - [SN-AND-029](security.md#sn-and-029) **Harden exported Android components, PendingIntents and incoming intents** · p0 · security · M · M5 Phones & Platform Parity
  - [SN-AND-030](security.md#sn-and-030) **Exclude keys, note content and caches from Android backup and device transfer** · p0 · security · S · M4 Identity, Sync & Privacy
  - [SN-AND-031](input-gestures.md#sn-and-031) **Wire hardware keyboard, mouse and drag-and-drop on large-screen Android** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-AND-032](qa.md#sn-and-032) **Golden-test the Impeller Vulkan and legacy-GL Android render paths** · p2 · test · S · M5 Phones & Platform Parity
  - [SN-GAND-001](notifications.md#sn-gand-001) **Register as the Android default notes app and handle the notes-role create intent** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GAND-002](ink.md#sn-gand-002) **Exclude system gesture regions along the screen edges while inking** · p1 · task · S · M1 Ink Editor Alpha
  - [SN-GAND-003](compat.md#sn-gand-003) **Restore editor state after Android process death and configuration change** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-GAND-004](compat.md#sn-gand-004) **SPIKE: decide Android multi-instance and second-window support on large screens** · p2 · spike · M · M5 Phones & Platform Parity
  - [SN-GAND-005](compat.md#sn-gand-005) **Support Samsung DeX and connected-display desktop windowing** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GAND-006](release.md#sn-gand-006) **Meet Google Play large-screen and foldable app-quality requirements** · p1 · task · M · M7 Beta Hardening & Security Audit
  - [SN-GAND-007](release.md#sn-gand-007) **Budget the Android App Bundle size and move heavy assets to Play delivery modules** · p2 · infra · M · M8 Launch & Growth
  - [SN-GAND-008](images-media.md#sn-gand-008) **Use the Android photo picker and handle partial media-permission grants** · p1 · feature · S · M2 Library & Documents
  - [SN-GAND-009](sync.md#sn-gand-009) **Schedule Android background sync under Doze, standby buckets and Data Saver** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-GAND-010](compat.md#sn-gand-010) **Survive OEM aggressive power management during long recordings and sync** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GAND-012](compat.md#sn-gand-012) **Degrade gracefully on Android devices without Google Play services** · p2 · task · M · M5 Phones & Platform Parity
  - [SN-GAND-014](input-gestures.md#sn-gand-014) **Build the Android stylus quirk table and per-device axis normalisation** · p2 · task · M · M5 Phones & Platform Parity
  - [SN-GAND-017](perf.md#sn-gand-017) **Guard 32-bit address-space limits and fuzz the parsers on armeabi-v7a** · p2 · task · M · M5 Phones & Platform Parity
  - [SN-GAND-018](compat.md#sn-gand-018) **Survive app hibernation, permission auto-revoke and Play archiving without data loss** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GAND-020](privacy.md#sn-gand-020) **Support shared Android tablets: multi-user and managed school profiles** · p3 · feature · M · M5 Phones & Platform Parity
  - [SN-GAND-021](theming.md#sn-gand-021) **Define the Android wide-colour-gamut posture so ink colour matches across platforms** · p3 · task · S · M5 Phones & Platform Parity
  - [SN-GPRF-001](perf.md#sn-gprf-001) **Validate the mid-range Android stylus tablet against the 25 ms pen-to-pixel budget** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-GPRF-003](compat.md#sn-gprf-003) **Validate the armeabi-v7a 32-bit build against the Tier 3 minimum bar** · p2 · test · S · M5 Phones & Platform Parity
  - [SN-GPRF-004](compat.md#sn-gprf-004) **Validate the x86_64 build on ChromeOS and emulators as functional-only** · p3 · test · S · M5 Phones & Platform Parity
  - [SN-GPRF-005](compat.md#sn-gprf-005) **Gate the Android 16 Tier-1 slot on a behaviour-change conformance run** · p1 · test · M · M5 Phones & Platform Parity
- [SN-PHN-001](compat.md#sn-phn-001) **Deliver first-class iPhone and Android phone experiences** (epic · M5 Phones & Platform Parity)
  - [SN-PHN-002](compat.md#sn-phn-002) **Define window size classes and the adaptive layout resolver** · p1 · task · M · M5 Phones & Platform Parity
  - [SN-PHN-003](design-system.md#sn-phn-003) **Build the compact phone shell with bottom navigation and push routing** · p1 · feature · L · M5 Phones & Platform Parity
  - [SN-PHN-004](editor.md#sn-phn-004) **Collapse the palette dock to six favourites with a bottom-sheet toolbox** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-005](ink.md#sn-phn-005) **Enable finger-first inking with velocity-derived stroke width on phones** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-006](input-gestures.md#sn-phn-006) **Add draw and pan disambiguation for finger-only phone input** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-007](editor.md#sn-phn-007) **Add the zoom-to-write magnified writing box for phone-sized pages** · p2 · feature · L · M5 Phones & Platform Parity
  - [SN-PHN-008](pages-canvas.md#sn-phn-008) **Build phone reading mode with auto-hiding chrome and continuous scroll** · p1 · feature · L · M5 Phones & Platform Parity
  - [SN-PHN-009](a11y.md#sn-phn-009) **Expose the OCR text layer to VoiceOver and TalkBack in reading mode** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-010](library.md#sn-phn-010) **Implement the Capture hub and the Quick Notes inbox** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-011](images-media.md#sn-phn-011) **Add camera scan-first capture with auto-crop and straightening** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-012](audio.md#sn-phn-012) **Add audio-first lecture capture mode for phones** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-013](notifications.md#sn-phn-013) **Ship quick-capture widgets, controls and Quick Settings tiles** · p1 · feature · L · M5 Phones & Platform Parity
  - [SN-PHN-014](notifications.md#sn-phn-014) **Register share targets, app shortcuts and file handlers on phones** · p1 · feature · L · M5 Phones & Platform Parity
  - [SN-PHN-015](security.md#sn-phn-015) **Harden phone capture entry points against lock-state and guest leakage** · p0 · security · M · M5 Phones & Platform Parity
  - [SN-PHN-016](input-gestures.md#sn-phn-016) **Support S Pen single-click capture and pen-on-phone behaviour** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-017](compat.md#sn-phn-017) **Preserve editor state across foldable and window-size-class changes** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-PHN-018](perf.md#sn-phn-018) **Harden phone memory, cold start and battery to the low-end budgets** · p1 · task · L · M5 Phones & Platform Parity
  - [SN-PHN-019](a11y.md#sn-phn-019) **Audit thumb-zone reach and touch-target sizes on every phone surface** · p2 · design · M · M5 Phones & Platform Parity
  - [SN-PHN-020](qa.md#sn-phn-020) **Add compact-layout golden tests across the 17 looks and dark mode** · p2 · test · M · M5 Phones & Platform Parity
  - [SN-PHN-021](qa.md#sn-phn-021) **Add integration tests for phone capture entry points and share targets** · p1 · test · M · M5 Phones & Platform Parity
  - [SN-PHN-022](release.md#sn-phn-022) **Produce phone store screenshots and listing assets** · p2 · task · M · M8 Launch & Growth
  - [SN-GPHN-001](editor.md#sn-gphn-001) **Collapse the editor top toolbar into a compact bar with overflow on phones** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-GPHN-002](editor.md#sn-gphn-002) **Handle on-screen keyboard insets and keep the active field visible on phones** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-GPHN-003](editor.md#sn-gphn-003) **Coordinate the phone bottom-chrome stack so bars never overlap** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-GPHN-006](design-system.md#sn-gphn-006) **Present the modal overlays as phone bottom sheets** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GPHN-007](input-gestures.md#sn-gphn-007) **Add app-wide haptic feedback for phone interactions** · p3 · feature · S · M5 Phones & Platform Parity
  - [SN-GPHN-008](compat.md#sn-gphn-008) **Adapt phone chrome to compact height in landscape and keyboard-open** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GPHN-009](pages-canvas.md#sn-gphn-009) **Manage pages from the bottom-sheet page picker on phones** · p3 · feature · M · M5 Phones & Platform Parity
  - [SN-GPHN-011](a11y.md#sn-gphn-011) **Support iOS Reachability and bottom-anchored dialogs and menus on phones** · p3 · feature · S · M5 Phones & Platform Parity
  - [SN-GPHN-012](input-gestures.md#sn-gphn-012) **Resolve page-swipe versus system back-swipe conflict on phones** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GA11-024](a11y.md#sn-ga11-024) **Run the M5 phone and foldable accessibility checkpoint** · p1 · test · M · M5 Phones & Platform Parity
- [SN-WEB-001](compat.md#sn-web-001) **Deliver the Web/PWA surface: renderer, ink, storage, PWA, hardening** (epic · M1 Ink Editor Alpha)
  - [SN-WEB-002](compat.md#sn-web-002) **Implement dual CanvasKit/skwasm Flutter web build with runtime fallback** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-WEB-003](perf.md#sn-web-003) **Enforce a web bundle-size budget and cached cold-start gate in CI** · p2 · task · S · M1 Ink Editor Alpha
  - [SN-WEB-004](ink.md#sn-web-004) **Wire browser Pointer Events into the sane_ink capture path on web** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-WEB-005](ink.md#sn-web-005) **Add a Chromium wet-ink fast path via Ink API and desynchronized canvas** · p2 · feature · L · M1 Ink Editor Alpha
  - [SN-WEB-006](input-gestures.md#sn-web-006) **Add palm rejection and touch-action handling to the web canvas** · p2 · task · S · M1 Ink Editor Alpha
  - [SN-WEB-007](ink.md#sn-web-007) **Support Apple Pencil on Safari iPadOS with altitude, azimuth and hover** · p3 · feature · M · M5 Phones & Platform Parity
  - [SN-WEB-008](storage.md#sn-web-008) **Implement OPFS and SQLite-WASM (drift) persistence in a Worker** · p1 · feature · L · M1 Ink Editor Alpha
  - [SN-WEB-009](storage.md#sn-web-009) **Guard web note durability with persist(), estimate() and eviction warnings** · p0 · feature · M · M1 Ink Editor Alpha
  - [SN-WEB-010](compat.md#sn-web-010) **Add the Web App Manifest and installable PWA experience** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-WEB-011](compat.md#sn-web-011) **Add service-worker offline precache, runtime caching and update flow** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-WEB-012](sharing-export.md#sn-web-012) **Register PWA file handlers, share target, shortcuts and app badging** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-WEB-013](sharing-export.md#sn-web-013) **Implement File System Access open and save with a download fallback** · p2 · feature · M · M2 Library & Documents
  - [SN-WEB-014](security.md#sn-web-014) **Harden the web app with a strict nonce-based CSP and Trusted Types** · p0 · security · M · M1 Ink Editor Alpha
  - [SN-WEB-015](security.md#sn-web-015) **Enable COOP/COEP cross-origin isolation for multithreaded WASM** · p0 · security · M · M1 Ink Editor Alpha
  - [SN-WEB-016](security.md#sn-web-016) **Add SRI and the baseline security response headers to the web app** · p1 · task · S · M1 Ink Editor Alpha
  - [SN-WEB-017](ci-cd.md#sn-web-017) **Provision web hosting and CDN on an isolated origin with edge headers** · p1 · infra · M · M8 Launch & Growth
  - [SN-WEB-018](auth.md#sn-web-018) **Implement web sign-in with Google, Microsoft, Apple and passkeys** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-WEB-019](sync.md#sn-web-019) **Implement Google Drive user-cloud sync on web with OneDrive support** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-WEB-020](a11y.md#sn-web-020) **Implement keyboard-first navigation and the web shortcut map** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-WEB-021](a11y.md#sn-web-021) **Hand-author web canvas semantics and OCR alt-text for ink** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-WEB-022](onboarding.md#sn-web-022) **Build the zero-friction "try it now" guest flow on web** · p2 · feature · M · M8 Launch & Growth
  - [SN-WEB-023](qa.md#sn-web-023) **Build the cross-browser test harness and support-matrix runs** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-WEB-024](perf.md#sn-web-024) **Add Lighthouse PWA and web ink/perf budget gates to CI** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-WEB-025](ocr-hwr.md#sn-web-025) **Implement the web handwriting-recognition path with an explicit opt-in** · p2 · feature · M · M3 Audio & Recognition
  - [SN-WEB-026](audio.md#sn-web-026) **Implement the MediaRecorder Opus audio capture backend for web** · p2 · feature · M · M3 Audio & Recognition
  - [SN-WEB-027](audio.md#sn-web-027) **Ship offline transcription on web via whisper.cpp WASM under isolation** · p3 · feature · L · M3 Audio & Recognition
  - [SN-WEB-028](pdf.md#sn-web-028) **Implement the PDFium-WASM render and annotate path for web** · p2 · feature · M · M2 Library & Documents
  - [SN-WEB-029](sharing-export.md#sn-web-029) **Implement Async Clipboard and Web Share with Safari gesture handling** · p3 · task · S · M2 Library & Documents
  - [SN-WEB-030](text.md#sn-web-030) **Evaluate a DOM text overlay for IME, Scribble and selection on web** · p2 · spike · M · M2 Library & Documents
  - [SN-WEB-031](security.md#sn-web-031) **Define and enforce the reduced web at-rest key protection posture** · p0 · security · M · M4 Identity, Sync & Privacy
  - [SN-WEB-032](storage.md#sn-web-032) **Verify storage-eviction recovery from the cloud durable copy on web** · p1 · test · M · M4 Identity, Sync & Privacy
  - [SN-GWEB-001](perf.md#sn-gweb-001) **Implement the web Worker execution model for storage, sync, index and one-shot work** · p1 · feature · L · M1 Ink Editor Alpha
  - [SN-GWEB-002](storage.md#sn-gweb-002) **Coordinate concurrent browser tabs with Web Locks and a cross-tab change channel** · p1 · feature · L · M1 Ink Editor Alpha
  - [SN-GWEB-003](storage.md#sn-gweb-003) **Flush and restore work across browser page-lifecycle transitions** · p0 · feature · M · M1 Ink Editor Alpha
  - [SN-GWEB-004](compat.md#sn-gweb-004) **Define the web URL strategy, history model and back/forward behaviour** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-GWEB-005](security.md#sn-gweb-005) **Self-host and integrity-pin the Flutter web engine artifacts instead of the default CDN** · p1 · security · S · M1 Ink Editor Alpha
  - [SN-GWEB-006](perf.md#sn-gweb-006) **Implement deferred loading and route-level code splitting for the web build** · p2 · task · M · M2 Library & Documents
  - [SN-GWEB-009](input-gestures.md#sn-gweb-009) **Neutralise browser navigation gestures over the editor canvas** · p2 · task · S · M1 Ink Editor Alpha
  - [SN-GWEB-013](theming.md#sn-gweb-013) **Follow the browser colour scheme and keep installed-PWA chrome in sync** · p3 · feature · S · M1 Ink Editor Alpha
  - [SN-GWEB-014](sharing-export.md#sn-gweb-014) **Build the no-install web reader route for capability share links** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-GWEB-015](storage.md#sn-gweb-015) **Detect blocked or ephemeral browser storage and run an honest session-only mode** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-GPRF-017](perf.md#sn-gprf-017) **Profile and document Tier 2 browser performance for Safari, Firefox and Samsung Internet** · p2 · test · M · M5 Phones & Platform Parity

---

## Issues

### SN-AND-001

<a id="sn-and-001"></a>

**Android platform: tablet, phone, foldable & ChromeOS surface**

| Field | Value |
|---|---|
| GitHub | #3 |
| Type | epic |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, ink |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready, innovation |

#### Context
Android is the surface where competitors are weakest and least consistent, so it is Sane Notes' strategic opening (docs/platform/android.md §0). This epic owns the whole Android platform surface — phones, tablets, foldables and ChromeOS — realising the two-tier ink architecture (docs/architecture/overview.md, ADR-0008), the native plugin contract (ADR-0012), the window-size-class adaptive layout, the Android 16 (API 36) behaviour changes (predictive back, edge-to-edge, forced resizability, 16 KB pages), Credential Manager sign-in, SAF file access, hardware-backed Keystore storage, Play Integrity, and Google Play release readiness. The Android tablet ink budget is **<= 25 ms pen-to-pixel on mid-range hardware** with a Snapdragon 680-class 4 GB device as the low-end reference (locked decision 7). Most children land in M5 (Phones & Platform Parity), but the Tier-A ink surface work is pulled forward to M1 because it is the product's beating heart (docs/roadmap.md).

#### Scope
**In:** Jetpack Ink / low-latency front-buffer wet-ink surface; MotionEvent capture, prediction and palm rejection; S Pen / USI / Chromebook stylus; stylus handwriting into text fields; window size classes, foldables and desktop windowing; predictive back and edge-to-edge; Material 3 dynamic-colour interplay with the 17 looks; Credential Manager; SAF/Files; Keystore + biometric at-rest; Play Integrity; 16 KB page alignment; build config (minSdk/targetSdk/ABI/AAB); foreground service + notifications for recording; home-screen widgets; App Links; Play store readiness; low-end device validation; exported-component and intent hardening; backup/device-transfer exclusion; keyboard, mouse and drag-and-drop on large screens; Impeller Vulkan vs legacy-GL render parity.
**Out:** the shared ink engine internals (SN-INK-*), the shared crypto library (SN-CRY-*), the identity abstraction (SN-AUTH-*), phone-compact UX (SN-PHN-*) — those are consumed here, not owned here.

#### Acceptance criteria
- [ ] Every Tier-1 Android slot in the device lab (mid-range stylus tablet, 4 GB low-end, Samsung Galaxy Tab, an API 36 device) passes the automated functional + golden + integration suites and the decision-7 perf gates.
- [ ] The app is fully adaptive: it never locks orientation, handles forced resizability at sw>=600 dp, reflows across compact/medium/expanded/large/extra-large without losing editor state, and survives fold/unfold.
- [ ] Android 16 behaviour changes (predictive back, edge-to-edge, 16 KB pages) are handled with no crash or wrong back behaviour on a real API 36 device.
- [ ] Google Play release gate passes: AAB with per-ABI splits (arm64-v8a/armeabi-v7a/x86_64), target SDK current, Data Safety form declares "no data collected" except opt-in crash reports, all native .so are 16 KB-aligned.
- [ ] No component is exported without a justified allow-list entry, every PendingIntent is immutable, and no note content, key material or token is included in Google backup or device-to-device transfer.
- [ ] All child issues below are closed.

#### Technical notes
Federated Kotlin plugins per ADR-0012: sane_ink_surface, sane_stylus, sane_scribble, sane_secure_store, sane_cloud_drive, sane_ml_native, sane_pdfkit. Feature->API map in docs/platform/android.md §2. Impeller defaults to Vulkan on API 29+ with legacy-GL fallback (§3). Adaptive layout driven by window size classes (§7). Do NOT use the deprecated Jetpack Security library. Children:

- [ ] [SN-AND-002](ink.md#sn-and-002) Jetpack Ink wet-ink front-buffer surface
- [ ] [SN-AND-003](ink.md#sn-and-003) GLFrontBufferedRenderer custom-brush path
- [ ] [SN-AND-004](ink.md#sn-and-004) MotionEvent capture + motion prediction
- [ ] [SN-AND-005](ink.md#sn-and-005) Texture composition + capability tier probe
- [ ] [SN-AND-006](ink.md#sn-and-006) Palm rejection
- [ ] [SN-AND-007](input-gestures.md#sn-and-007) Stylus axis capabilities (pressure/tilt/hover)
- [ ] [SN-AND-008](input-gestures.md#sn-and-008) Barrel-button & eraser-tooltype bindings
- [ ] [SN-AND-009](input-gestures.md#sn-and-009) S Pen Remote SDK button + air actions
- [ ] [SN-AND-010](input-gestures.md#sn-and-010) USI / Chromebook / Pixel Tablet stylus + note-taker intent
- [ ] [SN-AND-011](input-gestures.md#sn-and-011) Stylus handwriting into text fields (scribble)
- [ ] [SN-AND-012](compat.md#sn-and-012) Window size classes -> adaptive layout
- [ ] [SN-AND-013](compat.md#sn-and-013) Foldables & desktop windowing
- [ ] [SN-AND-014](compat.md#sn-and-014) Predictive back migration
- [ ] [SN-AND-015](compat.md#sn-and-015) Edge-to-edge enforcement + insets
- [ ] [SN-AND-016](theming.md#sn-and-016) Material 3 dynamic colour vs the 17 looks
- [ ] [SN-AND-017](auth.md#sn-and-017) Credential Manager sign-in surface
- [ ] [SN-AND-018](storage.md#sn-and-018) SAF / Files persistent document access
- [ ] [SN-AND-019](security.md#sn-and-019) Keystore + AES-GCM at-rest + biometric
- [ ] [SN-AND-020](security.md#sn-and-020) Play Integrity attestation
- [ ] [SN-AND-021](compat.md#sn-and-021) 16 KB page-size alignment audit
- [ ] [SN-AND-022](ci-cd.md#sn-and-022) Build config: minSdk/targetSdk/ABI/AAB
- [ ] [SN-AND-023](audio.md#sn-and-023) Foreground service + notifications for recording
- [ ] [SN-AND-024](notifications.md#sn-and-024) Home-screen widgets + quick capture
- [ ] [SN-AND-025](notifications.md#sn-and-025) App Links verified deep links
- [ ] [SN-AND-026](release.md#sn-and-026) Play store readiness (Data Safety)
- [ ] [SN-AND-027](perf.md#sn-and-027) Low-end device validation
- [ ] [SN-AND-028](security.md#sn-and-028) R8/ProGuard rules + obfuscation
- [ ] [SN-AND-029](security.md#sn-and-029) Exported components, PendingIntents & incoming intents hardened
- [ ] [SN-AND-030](security.md#sn-and-030) Backup / device-transfer exclusion of keys and note data
- [ ] [SN-AND-031](input-gestures.md#sn-and-031) Hardware keyboard, mouse & drag-and-drop on large screens
- [ ] [SN-AND-032](qa.md#sn-and-032) Impeller Vulkan vs legacy-GL golden parity

#### Security & privacy
The native bridge is real attack surface (ADR-0012 Security impact): every channel payload and every incoming intent/deep link is untrusted input, validated on both sides. Secrets stay native (Keystore/StrongBox), never crossing the channel in the clear or reaching a Dart log. Google Drive uses the narrow drive.file scope; only ciphertext leaves the device. Targets MASVS 2.x L2 and the platform/storage controls in docs/security/threat-model.md. Baseline throughout: no note content or ink coordinates in logs, tokens only in secure storage.

#### UX notes
The Sane Notes design system (17 looks, Sane Sage, tokens in docs/design/tokens.json) is the visual source of truth; Material 3 Expressive supplies the motion/interaction grammar and the fallback for platform chrome only (docs/platform/android.md §7). All chrome is TalkBack-labelled, 48 dp targets, AA contrast, keyboard-reachable on ChromeOS. Adaptive layout follows docs/design/screens-and-flows.md; input map follows docs/design/gestures-and-shortcuts.md.

#### Test plan
tools/device_lab configs for the Tier-1 Android slots; golden tests pin ink across looks + light/dark and both Impeller Vulkan and GL paths; integration_test + patrol cover native permission/biometric/file dialogs; tools/perf_harness enforces the decision-7 latency/fps/memory gates on reference devices. See children for concrete test files.

#### Dependencies
Depends on the ink engine (SN-INK-*), crypto (SN-CRY-*), identity (SN-AUTH-*) and foundations (SN-FND-*) landing. Child dependencies are tracked per-issue.

#### Definition of done
- [ ] All child issues closed and their DoD met
- [ ] docs/platform/android.md and docs/platform/compatibility-matrix.md reflect shipped reality
- [ ] MASVS L2 controls for the Android surface recorded in docs/security/controls-matrix.md
- [ ] Release gate (docs/platform/compatibility-matrix.md §7) green on every Tier-1 Android slot

---

### SN-AND-012

<a id="sn-and-012"></a>

**Drive adaptive layout from Android window size classes**

| Field | Value |
|---|---|
| GitHub | #65 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, design-system |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Sane Notes is adaptive by locked decision 1: one layout that reflows from phone (~400 px) to desktop window. On Android the class comes from window size classes with breakpoints Compact <600 dp, Medium 600-839 dp, Expanded 840-1199 dp, Large 1200-1599 dp, Extra-large >=1600 dp (docs/platform/android.md §7, compat matrix §5). The class changes AT RUNTIME on rotation, multi-window and fold/unfold, and the library list/detail two-pane and editor chrome must be driven off it without losing editor state.

#### Scope
**In:** computing the current window size class at runtime and exposing it to the app; mapping each class to the library and editor layouts (single-pane/bottom-nav in Compact -> two-pane+rail in Expanded/Large -> multi-column in Extra-large); re-layout on class change without state loss.
**Out:** foldable fold/unfold specifics and ChromeOS desktop windowing ([SN-AND-013](compat.md#sn-and-013)); edge-to-edge insets ([SN-AND-015](compat.md#sn-and-015)); the phone-compact UX detail (SN-PHN-*).

#### Acceptance criteria
- [ ] The app computes the size class from the current window metrics and re-derives it on every configuration change (rotation, multi-window resize, fold/unfold).
- [ ] Compact (<600 dp) shows a single-pane library with bottom nav; Medium/Expanded show list/detail and the editor page rail; Large/Extra-large show two-pane + rail / multi-column per compat matrix §5.
- [ ] A class change mid-edit re-lays-out without losing the open note, current page, active tool, selection or unsaved strokes.
- [ ] The page rail collapses in the narrow (<900 px) class per CLAUDE.md §9 and PRD-ED-012.
- [ ] Layout uses tokens only (docs/design/tokens.json via sane_ui) and renders correctly in all 17 looks + light/dark.

#### Technical notes
Compute size class from Flutter MediaQuery/window metrics mapped to the Android breakpoints (docs/platform/android.md §7); a Riverpod provider exposes it (ADR-0003). Layouts assembled from sane_ui components (SN-DS-003). Follows docs/design/screens-and-flows.md adaptive rules. Do not lock orientation (§7 forced resizability).

#### Security & privacy
None beyond baseline. Layout carries no secrets; no logging of content; no network egress. State preservation on re-layout must not spill note content into any crash/rotation log.

#### UX notes
Reflow is seamless — the user never loses their place when they rotate, split-screen or unfold (compat matrix §5, a hard bar competitors fail). All chrome stays TalkBack-labelled and 48 dp across classes; the two-pane and multi-column layouts keep AA contrast in every look. Keyboard focus order is preserved across the reflow.

#### Test plan
app/test/layout/window_size_class_test.dart (breakpoint mapping); app/integration_test/adaptive_reflow_test.dart (rotate/split/resize mid-edit preserves state); golden tests per class per look in app/test/golden/; a manual multi-window smoke on a tablet.

#### Dependencies
SN-FND-002 (app scaffold), SN-DS-003 (component library).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-013

<a id="sn-and-013"></a>

**Handle foldable transitions and ChromeOS desktop windowing**

| Field | Value |
|---|---|
| GitHub | #66 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-012](compat.md#sn-and-012) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Foldables flip between compact (cover), medium (unfolded) and expanded (trifold/desktop) instantly, and Android 16 on displays with smallest width >=600 dp ignores screenOrientation/resizableActivity/aspect-ratio locks — the app fills the window regardless (docs/platform/android.md §7). On ChromeOS the app runs in freely resizable desktop windows. Fold/unfold and window-class changes must reflow without state loss (roadmap M5 exit criterion), building on the size-class plumbing in [SN-AND-012](compat.md#sn-and-012).

#### Scope
**In:** reacting to fold/unfold posture and hinge/fold features; instant compact<->medium<->expanded transitions preserving editor state; ChromeOS freely-resizable desktop window support; NOT locking orientation; keyboard/mouse/stylus as first-class on large screens.
**Out:** the base size-class mapping ([SN-AND-012](compat.md#sn-and-012)); the CREATE_NOTE note-taker intent ([SN-AND-010](input-gestures.md#sn-and-010)); edge-to-edge insets ([SN-AND-015](compat.md#sn-and-015)); the keyboard/mouse/drag-and-drop input map itself ([SN-AND-031](input-gestures.md#sn-and-031)).

#### Acceptance criteria
- [ ] Folding/unfolding a foldable reflows the layout to the new window class with zero loss of the open note, page, tool, selection and unsaved strokes.
- [ ] The app never calls setRequestedOrientation and does not declare a locked orientation; at sw>=600 dp on API 36 it fills the window in any posture without letterboxing.
- [ ] On ChromeOS the window is freely resizable; resizing continuously re-derives the size class and re-lays-out at 60 fps with no jank spikes.
- [ ] A tabletop/half-open posture (where detectable) is handled sensibly (e.g. canvas above, tools below) or falls back to the medium layout without breaking.
- [ ] The app does not rely on PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY (removed at API 37).

#### Technical notes
Use the fold/posture signals available to the Flutter embedding (WindowManager/Jetpack WindowInfoTracker equivalents) plus display metrics; feed the same size-class provider as [SN-AND-012](compat.md#sn-and-012) (docs/platform/android.md §7). No orientation lock in the manifest. ChromeOS windows use the expanded/large/extra-large layouts (compat matrix §5). Verify the Flutter Android embedding handles the transitions (docs/platform/android.md L2).

#### Security & privacy
None beyond baseline. Posture/window signals carry no secrets; state carried across a transition must not be written to any log. No network egress.

#### UX notes
A student folding a Galaxy Z Fold mid-sentence keeps their exact stroke and cursor; a Chromebook user drags the window edge and the canvas grows smoothly (compat matrix §5). Half-open postures get a sensible tools-below arrangement. Every layout keeps AA contrast and TalkBack labels across looks.

#### Test plan
app/integration_test/foldable_transition_test.dart (fold/unfold mid-edit preserves state) on a foldable or emulator posture; app/integration_test/chromeos_resize_test.dart; a golden per posture; manual smoke on a Galaxy Z Fold and a Chromebook (Tier 2, compat matrix §2).

#### Dependencies
SN-AND-012 (size-class plumbing this extends).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-014

<a id="sn-and-014"></a>

**Migrate to predictive back with OnBackInvokedCallback**

| Field | Value |
|---|---|
| GitHub | #67 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-ED-003](editor.md#sn-ed-003) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
Targeting API 36 on Android 16 makes predictive back the default: onBackPressed / KEYCODE_BACK are no longer called, so the app must migrate to OnBackPressedCallback / OnBackInvokedCallback for discard-changes confirmations and nested editor panels (docs/platform/android.md §7, L2). Getting this wrong crashes or produces wrong back behaviour on Android 16 — a real integration risk that must be validated on a real API 36 device. It interacts with unsaved strokes and the undo model (SN-ED-003).

#### Scope
**In:** registering OnBackInvokedCallback/OnBackPressedCallback for the back gesture; back-preview animations where the platform provides them; discard-changes confirmation from a nested panel/overlay; dismiss-overlay vs exit-editor precedence; verifying the Flutter Android embedding is migrated.
**Out:** the undo/redo model (SN-ED-003, consumed here); edge-to-edge insets ([SN-AND-015](compat.md#sn-and-015)); general adaptive layout ([SN-AND-012](compat.md#sn-and-012)).

#### Acceptance criteria
- [ ] On an API 36 device, the system back gesture is handled via OnBackInvokedCallback/OnBackPressedCallback — never via a stale onBackPressed override — with no crash and no wrong navigation.
- [ ] Back inside a nested editor panel/overlay dismisses that panel first (predictive-back preview shown where supported), and only exits the editor once no overlay is open (Esc-equivalent precedence, gestures §6.3).
- [ ] Leaving a note with unsaved intent surfaces a discard-changes confirmation; because Sane Notes autosaves locally, the default is safe-keep, and the confirmation is reachable by keyboard/screen reader.
- [ ] The predictive-back preview animation runs where the OS supports it and respects Reduce Motion.
- [ ] The Flutter Android embedding is confirmed migrated to OnBackInvokedCallback (docs/platform/android.md L2) and the app declares android:enableOnBackInvokedCallback appropriately.

#### Technical notes
Kotlin/embedding: OnBackInvokedDispatcher.registerOnBackInvokedCallback / androidx OnBackPressedCallback (docs/platform/android.md §7). Coordinate with the Flutter navigator/go_router (ADR-0003) so route pops and overlay dismissals map onto the back callback. Unsaved-state signal from the editor/undo model (SN-ED-003). Verify engine support at integration (L2).

#### Security & privacy
A back gesture must not silently discard or corrupt note data (data-integrity): local autosave means back is non-destructive; any explicit discard is confirmed (MASVS-PLATFORM-1). No content in logs during the transition; no network egress.

#### UX notes
Predictive back gives users the OS-native peek-to-previous animation, matching platform muscle memory (docs/platform/android.md §7). Nested panels close in the expected order; the discard prompt is friendly and never loses work. Motion respects Reduce Motion.

#### Test plan
app/integration_test/predictive_back_test.dart on an API 36 device (panel dismissal order, no crash, discard confirm); app/test/navigation/back_callback_test.dart (callback registration, overlay precedence); manual predictive-back-preview check on Android 16 (compat matrix Android-A16 slot).

#### Dependencies
SN-FND-002 (app scaffold/embedding), SN-ED-003 (undo/redo & unsaved-state signal).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-015

<a id="sn-and-015"></a>

**Handle enforced edge-to-edge display and window insets**

| Field | Value |
|---|---|
| GitHub | #68 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-AND-012](compat.md#sn-and-012) |
| Security controls | — |
| Extra labels | agent-ready, good first issue |

#### Context
Android 16 (API 36) enforces edge-to-edge: the opt-out is disabled, so the app draws behind the system bars and MUST handle insets everywhere (docs/platform/android.md §7, L2). Chrome, the palette dock, the page rail and the canvas must respect status/navigation/IME/cutout insets so nothing important sits under a system bar or a display cutout, on phones, tablets and foldables. This is bounded, well-specified inset plumbing on top of the adaptive layout ([SN-AND-012](compat.md#sn-and-012)).

#### Scope
**In:** consuming WindowInsets (status, navigation, IME, display cutout, system gestures) across all Sane Notes chrome and the canvas; keeping the drawable canvas area clear of cutouts; IME-inset handling for text entry; a minimum 16 px side gutter maintained under insets.
**Out:** predictive back ([SN-AND-014](compat.md#sn-and-014)); the base adaptive layout ([SN-AND-012](compat.md#sn-and-012)); edge-nav suppression during drawing ([SN-AND-006](ink.md#sn-and-006)).

#### Acceptance criteria
- [ ] On an API 36 device the app draws edge-to-edge with no clipped or bar-obscured controls; the palette dock, page rail and toolbar clear the status/navigation bars and display cutout.
- [ ] The IME inset pushes focused text fields into view; the canvas is not permanently shrunk by a transient keyboard.
- [ ] A display cutout never overlaps drawable canvas content the user is inking on; content reflows around it.
- [ ] A >=16 px side gutter is preserved at every width under insets (matches the app's responsive gutter rule).
- [ ] Renders correctly in all 17 looks + light/dark, portrait and landscape, on phone, tablet and foldable.

#### Technical notes
Consume WindowInsetsCompat via the Flutter embedding / MediaQuery.viewPadding + viewInsets; apply SafeArea/padding at the app chrome layer, not per-widget (docs/platform/android.md §7). Coordinate with the size-class layout ([SN-AND-012](compat.md#sn-and-012)). Do not re-enable the removed edge-to-edge opt-out. Tokens for spacing (docs/design/tokens.json).

#### Security & privacy
None beyond baseline: pure layout, no secrets, no logging, no network.

#### UX notes
Edge-to-edge makes the canvas feel expansive while every control stays reachable — no button hidden behind a gesture bar or notch (docs/platform/android.md §7). Insets keep 48 dp targets and AA contrast intact; the >=16 px gutter matches the design's breathing room across looks.

#### Test plan
app/test/layout/insets_test.dart (inset application, gutter minimum); app/integration_test/edge_to_edge_test.dart on an API 36 device (no obscured controls, IME behaviour); golden tests with simulated cutout/nav-bar insets across looks.

#### Dependencies
SN-FND-002 (app scaffold), SN-AND-012 (adaptive layout).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-021

<a id="sn-and-021"></a>

**Ensure all native libraries are 16 KB page-aligned with a CI gate**

| Field | Value |
|---|---|
| GitHub | #74 |
| Type | infra |
| Priority | p0 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-AND-022](ci-cd.md#sn-and-022) |
| Security controls | `MASVS-CODE-1` |
| Extra labels | agent-ready |

#### Context
Android is moving to 16 KB memory pages, and Play requires all native code to be 16 KB-aligned; an unaligned .so causes Play rejection or crashes on 16 KB devices (docs/platform/android.md §9, L3). This must cover the Flutter engine plus EVERY native dependency — pdfium, ML Kit natives, any ObjectBox-style natives, and each plugin's .so. A CI check must fail the build if any shipped .so is not 16 KB-aligned, and the Android-A16 lab slot validates on-device.

#### Scope
**In:** building with a 16 KB-aligned NDK/toolchain; auditing every shipped .so (Flutter engine, plugins, pdfium, ML Kit) for 16 KB alignment; a CI check that fails on any unaligned .so; on-device validation on the Android-A16 slot.
**Out:** the general build config / ABI splits ([SN-AND-022](ci-cd.md#sn-and-022)); the PDF engine choice (SN-PDF-*); ML Kit integration (sane_ml_native).

#### Acceptance criteria
- [ ] The app builds with a 16 KB-aligned NDK/toolchain; the resulting AAB's native libs are all 16 KB-aligned across arm64-v8a and x86_64.
- [ ] A CI step enumerates every .so in the bundle and fails the build if any is not 16 KB page-aligned (Flutter engine, pdfium, ML Kit, ObjectBox-style, and each plugin included).
- [ ] The app launches and takes a note with no crash on a real 16 KB-page device (Android-A16 lab slot, compat matrix §2).
- [ ] Any dependency that ships an unaligned .so is flagged with a tracked upgrade/rebuild action; the build does not silently ship it.
- [ ] The check is documented so new native dependencies are audited on introduction.

#### Technical notes
CI: inspect ELF program headers / use the alignment-check tooling on each .so in the AAB; wire into .github/workflows/devsecops.yml as an Android build gate. Build with the 16 KB-aligned NDK. Verify current Play requirement date (docs/platform/android.md §9 "(verify)"). Depends on the build config ([SN-AND-022](ci-cd.md#sn-and-022)). L3 mitigation.

#### Security & privacy
Supply-chain/build integrity (MASVS-CODE-1): auditing every native artifact and failing closed on misalignment prevents shipping a broken or unvetted .so; the enumeration doubles as an inventory of native code entering the app, feeding the SBOM.

#### UX notes
Invisible to users when correct; the payoff is that the app installs and runs on 16 KB-page devices instead of being rejected by Play or crashing on launch (docs/platform/android.md L3).

#### Test plan
A CI job asserting alignment on a known-good and a deliberately-unaligned fixture .so (the gate must fail on the bad one); app/integration_test/smoke_test.dart on the Android-A16 slot (launch + take a note); the alignment report attached to the build artifact.

#### Dependencies
SN-FND-002 (build scaffold), SN-AND-022 (Android build config / NDK).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-GAND-003

<a id="sn-gand-003"></a>

**Restore editor state after Android process death and configuration change**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, editor, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-012](compat.md#sn-and-012), [SN-CORE-004](storage.md#sn-core-004), [SN-ED-027](editor.md#sn-ed-027) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-200` |
| Extra labels | — |

#### Context
iPad has [SN-IPAD-028](editor.md#sn-ipad-028) ("Restore editor and scene state after termination and window reconnection"); **Android has no equivalent issue**, yet Android is where process death actually happens. On the 4 GB Snapdragon 680-class reference device (`docs/platform/compatibility-matrix.md` §2) the system kills backgrounded apps constantly, and OEM skins are more aggressive still. [SN-AND-012](compat.md#sn-and-012) and [SN-AND-013](compat.md#sn-and-013) guarantee no state loss across *configuration* changes (rotation, multi-window, fold) — a different mechanism from the activity being destroyed and the Dart isolate restarted while the user is at lunch. If a student returns to a killed app and lands on the library with the current page, tool, zoom and selection gone (or worse, an unsaved stroke lost), the app has failed its core promise; "manual sync / lost work" is the #1 competitor complaint on record (`docs/research/sources/samsung-notes-nebo-other.md` "What Sane Notes could beat them on"). Android also offers a hostile-mode switch — Developer options → **Don't keep activities** — which makes this reproducible in CI-adjacent manual testing.

#### Scope
**In:** persisting a small, non-sensitive editor UI state record (open notebook id, page index, scroll/zoom viewport, active tool + colour + width, page-rail state, reading-mode flag) and restoring it on relaunch; wiring Flutter's restoration framework (`RestorationMixin`/`restorationScopeId`) plus the Android saved-instance-state bundle so the restoration id survives; ensuring in-flight ink is durable through [SN-CORE-004](storage.md#sn-core-004) before the activity can die; a "restored where you left off" path that verifies the target still exists (deleted/moved notebook falls back to the library with a toast).
**Out:** the durability of committed strokes themselves ([SN-CORE-026](storage.md#sn-core-026), [SN-INK-021](ink.md#sn-ink-021)); size-class relayout ([SN-AND-012](compat.md#sn-and-012)); foldable posture ([SN-AND-013](compat.md#sn-and-013), [SN-PHN-017](compat.md#sn-phn-017)); iPad scene restoration ([SN-IPAD-028](editor.md#sn-ipad-028)); sync reconciliation ([SN-SYNC-006](sync.md#sn-sync-006)).

#### Acceptance criteria
- [ ] With "Don't keep activities" enabled, backgrounding and returning restores the same notebook, page, zoom/scroll position, active tool and selection; at most the current in-progress stroke is lost.
- [ ] A real low-memory kill (`adb shell am kill`) mid-edit restores identically and loses no committed stroke.
- [ ] The saved state bundle is **small** (< 8 KB) and contains **no note content**: no text, no stroke data, no titles, no thumbnails, no search terms — only opaque ids and view parameters.
- [ ] If the restored notebook/page no longer exists (deleted on another device, restored from Trash), the app opens the library with a non-blocking explanation instead of crashing or showing an empty editor.
- [ ] Restoration works for guest mode and for a locked profile: a locked target prompts for unlock before restoring ([SN-SEC-020](security.md#sn-sec-020)), never rendering content first.
- [ ] Restore adds nothing to the cold-start budget (< 2 s on the mid Android reference, `docs/platform/performance-budgets.md`).

#### Technical notes
`app/lib/` editor shell: `RestorationMixin` with `RestorableString`/`RestorableInt` properties; set `restorationScopeId` on the root `MaterialApp`; the Android embedding must persist the restoration data (Flutter writes it into the activity bundle — **(verify)** the engine version in use actually round-trips it, as it is a known integration gap). Ids come from the document model ([SN-CORE-002](storage.md#sn-core-002)); the viewport comes from [SN-PG-005](pages-canvas.md#sn-pg-005). Never put content-derived strings in the bundle — the system may write it to disk and it is readable by the platform, not by other apps.

#### Security & privacy
The Android saved-instance-state bundle is system-managed storage outside our encrypted store: putting note content there breaks the at-rest model (MASVS-STORAGE-1) and could leak through a system crash report (CWE-200). Control: a strict, tested allow-list of primitive fields plus a unit test that fails if any field is not on it. Locked notebooks restore behind the biometric gate ([SN-SEC-020](security.md#sn-sec-020)); the bundle is excluded from backup by the rules in [SN-AND-030](security.md#sn-and-030).

#### UX notes
Restoration is silent — no splash, no "restoring" spinner beyond the normal launch. If the target is gone, show the standard toast pattern from [SN-ED-027](editor.md#sn-ed-027) ("That page was deleted"). Reading mode and focus mode restore in the same mode the user left.

#### Test plan
Widget tests using `tester.restartAndRestore()` for each restorable property. `integration_test` + patrol: `am kill` mid-session then relaunch and assert page/tool/zoom. A unit test asserts the serialized bundle matches the field allow-list and stays under the size cap. Manual pass with "Don't keep activities" on the 4 GB reference device ([SN-AND-027](perf.md#sn-and-027)). Files: `app/test/editor/restoration_test.dart`, `integration_test/android_process_death_test.dart`.

#### Dependencies
[SN-AND-012](compat.md#sn-and-012), [SN-CORE-004](storage.md#sn-core-004), [SN-ED-027](editor.md#sn-ed-027)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-004

<a id="sn-gand-004"></a>

**SPIKE: decide Android multi-instance and second-window support on large screens**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | spike |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet |
| Areas | compat, editor, perf |
| Size | M |
| SDLC | design |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-ED-029](editor.md#sn-ed-029), [SN-AND-013](compat.md#sn-and-013) |
| Security controls | — |
| Extra labels | — |

#### Context
[SN-ED-029](editor.md#sn-ed-029) builds the in-app document tab bar plus an "additive window" hook "where the platform supports it", and [SN-PHN-017](compat.md#sn-phn-017) explicitly defers "Android tablet multi-window specifics" to the Android epic — where no issue exists. iPad has a dedicated feasibility spike ([SN-IPAD-009](compat.md#sn-ipad-009)) and an implementation issue ([SN-IPAD-011](compat.md#sn-ipad-011)); Android has neither. This matters because the Android large-screen story is built on **two app windows side by side** (split-screen with the same app in both halves, ChromeOS/desktop windowing, Samsung DeX), a workflow Galaxy Tab users already have in Samsung Notes and which `docs/platform/android.md` §7 assumes when it talks about desktop windowing. Flutter's Android embedding has historically supported a single activity/engine well and multiple engines poorly (memory duplication, plugin singletons, texture/front-buffer ownership), and our ink fast path owns a native surface ([SN-AND-002](ink.md#sn-and-002)) that cannot be trivially instantiated twice. This is a decision, not an implementation: time-box it and write it down.

#### Scope
**In:** prototyping `android:launchMode`/`documentLaunchMode` + `FLAG_ACTIVITY_LAUNCH_ADJACENT` and/or a multi-engine (`FlutterEngineGroup`) approach on an Android 16 tablet, a foldable and a ChromeOS device; measuring memory, cold start of the second window, and whether two `sane_ink_surface` instances can coexist (front-buffer/texture ownership, Impeller Vulkan contexts); checking CRDT safety of two editors on the same notebook in one process ([SN-CORE-003](sync.md#sn-core-003)); a written recommendation (native second window vs in-app tabs + split-pane only) landed as an ADR update and reflected in `docs/platform/android.md` §7.
**Out:** implementing whichever option wins (a follow-up issue); the in-app tab bar ([SN-ED-029](editor.md#sn-ed-029)); DeX/connected-display behaviour ([SN-GAND-005](compat.md#sn-gand-005)); iPad windowing ([SN-IPAD-009](compat.md#sn-ipad-009), [SN-IPAD-011](compat.md#sn-ipad-011)).

#### Acceptance criteria
- [ ] A throwaway branch demonstrates (or disproves) two Sane Notes windows side by side on an Android 16 tablet, with measured numbers for incremental RSS, second-window cold start and steady-state fps while drawing in one window.
- [ ] The report states explicitly whether two native ink surfaces can be alive at once, and what the Tier B (pure-Flutter) fallback costs if not.
- [ ] The report states whether two editors on the **same** notebook in one process converge safely or need a single-writer lock, with a test or a reasoned argument.
- [ ] A recommendation is recorded with an exit criterion (e.g. "second window only when incremental memory < 120 MB on the 4 GB reference, otherwise ship in-app tabs") and linked from [SN-ED-029](editor.md#sn-ed-029).
- [ ] The spike is time-boxed to 3 days and produces a document even if the answer is "not feasible".

#### Technical notes
Start from `FlutterEngineGroup` (shared snapshot, lower incremental cost) before considering a second process. Touchpoints: `plugins/sane_ink_surface/android` texture registry, plugin singletons in `sane_secure_store`/`sane_cloud_drive`, drift/SQLite single-writer assumptions in `sane_core` ([SN-CORE-004](storage.md#sn-core-004)), Riverpod scope ownership (ADR-0003). Compare against ADR-0001's single-codebase exit criterion. Reuse the measurement harness from [SN-PERF-002](perf.md#sn-perf-002) rather than hand-timing.

#### Security & privacy
Two windows must not cross profile boundaries: a second window opened from a locked profile or a different profile must obey the isolation rules in [SN-AUTH-013](auth.md#sn-auth-013) and the app-lock behaviour in [SN-SEC-020](security.md#sn-sec-020). The spike explicitly records how profile scoping behaves per engine, since a shared engine group shares static state (MASVS-PRIVACY-1).

#### UX notes
If native second windows are ruled out, [SN-ED-029](editor.md#sn-ed-029)'s additive-window affordance must be hidden on Android rather than failing silently — record the intended degradation (tabs + split-pane inside one window) so the design in `docs/design/screens-and-flows.md` stays honest.

#### Test plan
No production tests. Deliverables: a measurement table (memory/start/fps per configuration and device), the prototype branch reference, and an ADR update. If the answer is yes, the follow-up issue carries the real test plan.

#### Dependencies
[SN-ED-029](editor.md#sn-ed-029), [SN-AND-013](compat.md#sn-and-013)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-005

<a id="sn-gand-005"></a>

**Support Samsung DeX and connected-display desktop windowing**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, editor, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-013](compat.md#sn-and-013), [SN-AND-031](input-gestures.md#sn-and-031), [SN-AND-012](compat.md#sn-and-012) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-2` |
| Extra labels | — |

#### Context
[SN-AND-013](compat.md#sn-and-013) covers foldables and **ChromeOS** desktop windowing; nothing in the backlog mentions **Samsung DeX**, even though the Tier 1 Android device lab contains a Samsung Galaxy Tab with an S Pen and the Tier 2 pool contains a Galaxy S-Ultra (`docs/platform/compatibility-matrix.md` §2) — the exact devices whose users dock to a monitor or run DeX on the tablet with a Book Cover Keyboard. `docs/platform/android.md` §7 also promises the Extra-large (≥ 1600 dp) window class for "desktop/connected display", and Android 16 extends desktop windowing to external displays generally. Samsung Notes is the incumbent here and runs on DeX plus a Windows companion (`docs/research/sources/samsung-notes-nebo-other.md` §1) — "works on the big screen" is table stakes on Galaxy hardware, and the failure modes (stretched phone layout, wrong density, mouse that cannot draw, window that will not resize, note lost when the display is unplugged) are exactly the ones users notice first.

#### Scope
**In:** detecting desktop-mode/connected-display configurations and mapping them onto the existing size-class provider ([SN-AND-012](compat.md#sn-and-012)) so Extra-large is actually reachable; correct behaviour on continuous free-form window resize (60 fps relayout, no state loss); density/`smallestScreenWidth` changes when the app moves between the built-in panel and an external display; mouse/trackpad as a first-class drawing and pointing device in desktop mode ([SN-AND-031](input-gestures.md#sn-and-031)); a documented, tested teardown when the external display disconnects (return to the device layout, keep the open note); an entry in `docs/platform/compatibility-matrix.md` §2 adding DeX to the Tier 2 manual pool.
**Out:** multi-instance / two app windows ([SN-GAND-004](compat.md#sn-gand-004)); presentation mode and mirrored output for teaching ([SN-ED-021](editor.md#sn-ed-021)); ChromeOS note-taker registration ([SN-AND-010](input-gestures.md#sn-and-010)); the keyboard/mouse shortcut map itself ([SN-AND-031](input-gestures.md#sn-and-031), [SN-ED-022](editor.md#sn-ed-022)).

#### Acceptance criteria
- [ ] In DeX (tablet DeX and docked-to-monitor) the app opens in a freely resizable window using the Expanded/Large/Extra-large layouts, never a stretched phone layout and never letterboxed.
- [ ] Dragging the window edge continuously re-derives the size class and re-lays-out at 60 fps with no jank spike above the frame budget ([SN-PERF-007](perf.md#sn-perf-007)).
- [ ] Moving the window between the device panel and the external display (different density/DPI) keeps the open note, page, zoom, tool and selection, and re-rasterises paper/ink crisply at the new density.
- [ ] Unplugging the external display returns to the on-device layout with no data loss and no crash; a stroke in progress commits.
- [ ] Mouse/trackpad draws, right-click opens the context menu ([SN-ED-023](editor.md#sn-ed-023)), hover states appear, and the S Pen still works while a keyboard and mouse are attached.
- [ ] The app declares no orientation or aspect-ratio lock and does not rely on the restricted-resizability opt-out ([SN-AND-013](compat.md#sn-and-013)).

#### Technical notes
Read configuration/`Configuration.densityDpi`, display id and `smallestScreenWidthDp` on every configuration change and feed the same Riverpod size-class provider as [SN-AND-012](compat.md#sn-and-012); handle the display-changed callback rather than assuming a single display. Vendor-specific DeX detection exists but is **(verify)** and must stay a *hint only* — the layout MUST be driven by window metrics, never by a Samsung-only API, so Android 16 desktop windowing gets the same behaviour for free. Tile/raster caches ([SN-INK-022](ink.md#sn-ink-022), [SN-PDF-004](pdf.md#sn-pdf-004)) must invalidate on density change or ink renders blurry on the external panel.

#### Security & privacy
A connected display is a **public** surface: presentation-adjacent leakage rules apply. Locked notebooks and locked profiles stay locked on the external display, notification excerpts stay suppressed ([SN-SEC-019](security.md#sn-sec-019)), and nothing renders a note preview on a screen the user may not be looking at (MASVS-PRIVACY-2). No new permissions; no device identifiers read for detection.

#### UX notes
Extra-large uses the multi-column layout from `docs/design/screens-and-flows.md` adaptive rules; the palette dock defaults to a side column when width ≥ 1200 dp (allowed by `docs/platform/phones.md` §3 only on wide surfaces). Cursor affordances follow [SN-AND-031](input-gestures.md#sn-and-031). Window title = notebook name for the DeX taskbar.

#### Test plan
Manual matrix on a Galaxy Tab in DeX and a Galaxy phone docked to a monitor (Tier 2 pool), plus an Android 16 tablet with desktop windowing enabled. Automated: widget tests for size-class mapping at 1200/1600 dp; a golden for the Extra-large layout ([SN-PHN-020](qa.md#sn-phn-020) harness); an `integration_test` that simulates a density+size configuration change mid-edit and asserts state preservation. Files: `app/test/platform/desktop_windowing_test.dart`, matrix row in `docs/platform/compatibility-matrix.md`.

#### Dependencies
[SN-AND-013](compat.md#sn-and-013), [SN-AND-031](input-gestures.md#sn-and-031), [SN-AND-012](compat.md#sn-and-012)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-010

<a id="sn-gand-010"></a>

**Survive OEM aggressive power management during long recordings and sync**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, audio, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-023](audio.md#sn-and-023), [SN-GAND-009](sync.md#sn-gand-009), [SN-AUD-008](audio.md#sn-aud-008) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | — |

#### Context
[SN-AND-023](audio.md#sn-and-023) builds a correct foreground service for recording and [SN-GAND-009](sync.md#sn-gand-009) schedules sync correctly under AOSP rules — and on a Samsung, Xiaomi, OPPO or OnePlus device both can still be killed. OEM skins ship additional "app sleeping"/"battery optimisation" layers that suspend background apps, revoke wake-locks and kill foreground services after screen-off, independent of Doze. This is the single most reported class of Android bug for recorder and sync apps, and for Sane Notes it maps straight onto our worst failure: a 90-minute lecture recording that stops at minute 12 while the student is writing, or a sync that never runs until the app is opened. Our Tier 1 lab contains a **Samsung Galaxy Tab** (`docs/platform/compatibility-matrix.md` §2), so this is testable on the hardware we already own. The fix is defensive engineering plus honest UX — not a workaround that fights the platform.

#### Scope
**In:** detecting when the app is on the OEM battery-restriction list / not exempt from battery optimisations and surfacing a one-time, dismissible, contextual explanation at the moment it matters (first long recording, first background sync failure) with a deep link to the correct system settings screen; making the recorder resilient to being killed — segmented writes with resumable auto-split ([SN-AUD-008](audio.md#sn-aud-008)) so a kill loses at most one segment, plus recovery-on-next-launch that finalises and reattaches orphan segments to their note; detecting on next launch that a foreground service died unexpectedly and telling the user plainly; keeping a short, redacted diagnostic breadcrumb for support bundles ([SN-TEL-008](telemetry.md#sn-tel-008)); a documented per-OEM behaviour table in `docs/platform/android.md` §10.
**Out:** the foreground service itself ([SN-AND-023](audio.md#sn-and-023)); WorkManager scheduling ([SN-GAND-009](sync.md#sn-gand-009)); the recorder UI ([SN-AUD-010](audio.md#sn-aud-010)); transcription ([SN-AUD-020](audio.md#sn-aud-020)).

#### Acceptance criteria
- [ ] Killing the app process mid-recording (`adb shell am kill`) loses at most the current unwritten segment; on relaunch the recording is finalised, reattached to its note with correct time anchors ([SN-AUD-004](audio.md#sn-aud-004)), and the user is told what happened in plain language.
- [ ] Before a long recording starts, if the app is not exempt from battery optimisation, a single contextual sheet explains the risk and offers "Open settings"; it is dismissible, never blocks recording, and is not shown again after a decline (no nagging, no dark pattern — [SN-BILL-017](billing.md#sn-bill-017) tone rules).
- [ ] The app does **not** request the restricted "ignore battery optimizations" permission silently or at launch; any request is user-initiated and justified, in line with Play policy ([SN-AND-026](release.md#sn-and-026)).
- [ ] A background sync that was killed retries on the next scheduling window without duplicating work or corrupting the op-log ([SN-SYNC-006](sync.md#sn-sync-006)).
- [ ] `docs/platform/android.md` §10 gains an OEM behaviour row per tested vendor with the observed kill behaviour and the mitigation.
- [ ] A 60-minute screen-off recording on the Galaxy Tab completes with no gaps (manual Tier-1 evidence attached to the issue).

#### Technical notes
`PowerManager.isIgnoringBatteryOptimizations()` for state (read-only, no permission); deep link to the system battery settings screen with a try/catch fallback to app info, since OEM screens vary and some are unreachable. Never poll. Recovery reuses the crash-safe segment writer in [SN-AUD-008](audio.md#sn-aud-008) and the orphan-scan performed at launch by `sane_core` ([SN-CORE-026](storage.md#sn-core-026)). Vendor detection is a *hint for the docs table only* — behaviour must never branch on `Build.MANUFACTURER` in production code paths (`docs/platform/android.md` capability-detection rule).

#### Security & privacy
No new permissions requested by default; the restricted permission stays unrequested unless the user explicitly opts in, protecting the Data Safety and minimal-permission story ([SN-AND-026](release.md#sn-and-026), MASVS-PRIVACY-1). The orphan-recovery breadcrumb contains ids, timestamps and reason codes only — never audio, transcript text or note titles ([SN-TEL-003](telemetry.md#sn-tel-003) redaction rules). Recovered audio stays encrypted at rest ([SN-CRY-007](security.md#sn-cry-007)).

#### UX notes
One sheet, one sentence of cause, one action, per `docs/design/screens-and-flows.md` permission-rationale pattern ([SN-ONB-011](onboarding.md#sn-onb-011)): "Some phones stop recordings when the screen is off. Allow Sane Notes to keep running?" On recovery, the recorder bar ([SN-AUD-010](audio.md#sn-aud-010)) shows "Recovered 41:20 of audio" rather than an error.

#### Test plan
Instrumented: kill-and-recover matrix (`am kill`, `am force-stop`, screen-off + 30 min) on the Galaxy Tab and the 4 GB reference device, asserting segment count and anchor integrity. Unit: orphan-segment reattachment given a truncated final segment. Widget: the battery-optimisation sheet shows once and never again after decline. Files: `app/test/audio/orphan_segment_recovery_test.dart`, `integration_test/android_process_kill_recording_test.dart`, doc table in `docs/platform/android.md`.

#### Dependencies
[SN-AND-023](audio.md#sn-and-023), [SN-GAND-009](sync.md#sn-gand-009), [SN-AUD-008](audio.md#sn-aud-008)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-012

<a id="sn-gand-012"></a>

**Degrade gracefully on Android devices without Google Play services**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, ocr-hwr, auth |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-AND-017](auth.md#sn-and-017) |
| Security controls | `MASVS-AUTH-1`, `MASVS-CODE-4`, `MASVS-PRIVACY-1` |
| Extra labels | — |

#### Context
Four of the Android capabilities the platform doc leans on are **Google Play services**, not AOSP: ML Kit Digital Ink Recognition ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)) and its downloadable language packs, the ML Kit document scanner ([SN-MED-009](images-media.md#sn-med-009)), Credential Manager's Sign in with Google ([SN-AND-017](auth.md#sn-and-017)), and Play Integrity ([SN-AND-020](security.md#sn-and-020), [SN-BILL-008](billing.md#sn-bill-008)). The compatibility matrix (§3) admits **no** device below Android 10 but says nothing about devices *without GMS* — Huawei and other de-Googled or regional devices, AOSP builds, and enterprise-locked tablets — which are a real share of the Android tablet market in the price bands our student persona buys in. [SN-BILL-008](billing.md#sn-bill-008) already fails open when "Play services absent", which proves the case is known but unowned. Today a GMS-less device would hit a hard failure in recognition or sign-in instead of a clean degradation, and we would only find out from a one-star review.

#### Scope
**In:** a single capability probe for Play-services availability consumed by every dependent feature; defined degradation for each: handwriting recognition uses the unbundled/bundled model decision and, if unavailable, disables ink-to-text and background recognition with an explanatory state rather than an error loop; sign-in falls back to the other providers ([SN-AUTH-004](auth.md#sn-auth-004), [SN-AUTH-005](auth.md#sn-auth-005), [SN-AUTH-006](auth.md#sn-auth-006)) and guest mode ([SN-AUTH-010](auth.md#sn-auth-010)), which must remain fully usable; Drive sync still works through the REST API and a web OAuth flow, or the user is steered to the SAF folder adapter ([SN-SYNC-010](sync.md#sn-sync-010)); Play Integrity checks fail open ([SN-BILL-008](billing.md#sn-bill-008)) and never gate note-taking; billing degrades to "manage your subscription on the web" ([SN-BILL-009](billing.md#sn-bill-009)); a compatibility-matrix row recording the GMS-less support tier.
**Out:** implementing each feature ([SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-AND-017](auth.md#sn-and-017), [SN-AND-020](security.md#sn-and-020)); the web on-device recognition path ([SN-WEB-025](ocr-hwr.md#sn-web-025)); alternative app stores or distribution ([SN-REL-001](release.md#sn-rel-001) scope).

#### Acceptance criteria
- [ ] A single `playServicesAvailability()` probe exists; no feature calls a GMS API without checking it first (enforced by a lint/arch-test rule, [SN-FND-008](devx.md#sn-fnd-008) pattern).
- [ ] On a GMS-less device the app launches, creates a notebook, draws, imports a PDF, exports and syncs through SAF — i.e. the core promise works offline and account-free.
- [ ] Handwriting recognition either works via a bundled model or is presented as unavailable with one honest sentence; no crash, no repeated download attempt, no silent empty search results (search must not claim handwriting coverage it does not have, [SN-SRCH-010](search.md#sn-srch-010)).
- [ ] Sign-in shows the providers that actually work on this device; "Sign in with Google" is hidden rather than shown-and-broken; guest mode is always available.
- [ ] Play Integrity absence resolves to allow, never to a lock ([SN-BILL-008](billing.md#sn-bill-008)), and no paid feature is withdrawn from a paying user because of it.
- [ ] `docs/platform/compatibility-matrix.md` §3 gains a "no Google Play services" row with the supported tier and the degraded feature list.

#### Technical notes
Probe via `GoogleApiAvailability.isGooglePlayServicesAvailable` (the check itself is in the base library and safe to call), wrapped in the `sane_*` capability layer so Dart never imports GMS symbols directly. Prefer **bundled** ML Kit model artefacts where the size budget allows ([SN-GAND-007](release.md#sn-gand-007)) so recognition survives without GMS; otherwise unbundled + probe. Credential Manager itself is AOSP; only the Google credential provider needs GMS — degrade the provider list, not the API. Record the final matrix in `docs/platform/android.md` §2 beside the feature→API table. The Play-services probe and the recognition/sign-in degradations ship in M5; the [SN-AND-020](security.md#sn-and-020) (Play Integrity, M8) degradation is wired when that lands — not a scheduling blocker.

#### Security & privacy
Fail-open on integrity is a deliberate, documented risk acceptance: attestation protects the stateless services, never the user's notes ([SN-AND-020](security.md#sn-and-020)), so its absence must not create a lock-out (MASVS-AUTH-1) nor a downgrade path an attacker can force to bypass a real control. Bundled models are code-adjacent assets and must be integrity-verified ([SN-HWR-004](ocr-hwr.md#sn-hwr-004), MASVS-CODE-4, CWE-494). The probe must not read device identifiers or report device fingerprints (MASVS-PRIVACY-1).

#### UX notes
Degradation is stated once, where the feature is used, using the honest-limits tone in `docs/design/` microcopy ([SN-BRD-009](brand.md#sn-brd-009)): "Handwriting search needs Google Play services, which this device doesn't have." Never a modal on launch, never a nag.

#### Test plan
Automated: unit tests for each degradation branch with the probe faked to unavailable; an arch test that fails if a GMS import appears outside the wrapper. Manual: an AOSP/GMS-less emulator image (or a device without Play services) running the core-flow checklist; record results in the compatibility matrix. Files: `plugins/sane_ml_native/android/.../PlayServicesProbe.kt`, `app/test/platform/gms_absent_degradation_test.dart`.

#### Dependencies
[SN-HWR-003](ocr-hwr.md#sn-hwr-003) (recognition feature it degrades), [SN-AND-017](auth.md#sn-and-017) (sign-in it degrades). The Play-Integrity-absent degradation path integrates with [SN-AND-020](security.md#sn-and-020) (Play Integrity attestation, M8) when it lands; the probe and the recognition/sign-in degradations ship in M5, so SN-AND-020 is not a scheduling blocker.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-018

<a id="sn-gand-018"></a>

**Survive app hibernation, permission auto-revoke and Play archiving without data loss**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, storage, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-018](storage.md#sn-and-018), [SN-SYNC-010](sync.md#sn-sync-010), [SN-AND-030](security.md#sn-and-030) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `CWE-212` |
| Extra labels | — |

#### Context
Android hibernates apps the user has not opened for a few months: runtime permissions are auto-revoked, temporary files and caches may be cleared, and Play can **archive** the app — removing part of its installation while keeping user data — freeing the device up for the user and quietly breaking assumptions apps make about persistent grants. Sane Notes is exposed on two fronts. First, the SAF adapter ([SN-AND-018](storage.md#sn-and-018), [SN-SYNC-010](sync.md#sn-sync-010)) depends on **persistable URI permissions** to reach the user's sync folder; if those grants are lost the app must re-ask cleanly, not fail sync silently forever. Second, a local-first note app is exactly the kind of app a student opens in bursts (a semester on, a holiday off), so hibernation is the normal case, not an edge case — and the promise is that notes are never lost. Nothing in the backlog covers this lifecycle; [SN-AND-030](security.md#sn-and-030) covers backup exclusion, which is a different mechanism.

#### Scope
**In:** detecting on launch that a previously held SAF/URI grant or runtime permission is gone and presenting a single, clear re-grant path that restores sync/recording without re-onboarding; making all note data live outside cache directories that the system may purge (audit `getCacheDir`/`getExternalCacheDir` usage so only regenerable artefacts — thumbnails, tiles, rendered previews — live there, and everything regenerates silently); verifying an archive/unarchive cycle keeps the local database, blobs and keys intact and that the key material still unwraps ([SN-CRY-014](security.md#sn-cry-014)); documenting the hibernation posture (we do **not** request an exemption — notes work offline and need no background permission when unused) in `docs/platform/android.md` §9.
**Out:** backup/transfer exclusion ([SN-AND-030](security.md#sn-and-030)); the SAF adapter itself ([SN-AND-018](storage.md#sn-and-018)); sync scheduling ([SN-GAND-009](sync.md#sn-gand-009)); OEM power management ([SN-GAND-010](compat.md#sn-gand-010)).

#### Acceptance criteria
- [ ] Revoking the SAF folder grant (or the whole permission set) and relaunching produces one actionable prompt — "Reconnect your sync folder" — that restores sync in a single flow, with no data loss and no duplicate notebooks after reconnection ([SN-SYNC-006](sync.md#sn-sync-006) reconciliation).
- [ ] Clearing the app cache (`adb shell pm trim-caches` / Settings → Clear cache) loses **no** note, stroke, page, audio, attachment or key; thumbnails and tiles regenerate on demand ([SN-PG-010](pages-canvas.md#sn-pg-010), [SN-LIB-014](library.md#sn-lib-014)).
- [ ] An archive → unarchive cycle (or its closest reproducible equivalent) leaves the library, encrypted store and recovery path working; the app does not demand re-onboarding and the user's keys still unwrap.
- [ ] An audit test asserts that no note-bearing path resolves under a cache directory.
- [ ] The app does not request a hibernation exemption; if any future feature needs one, it is justified in the doc and the Play declaration ([SN-AND-026](release.md#sn-and-026)).
- [ ] A revoked microphone permission is re-requested in context at the next recording ([SN-AUD-016](audio.md#sn-aud-016)) rather than failing silently.

#### Technical notes
Check grant liveness with `ContentResolver.getPersistedUriPermissions()` on cold start and before any sync run; a missing grant transitions the sync state machine to a recoverable error ([SN-SYNC-020](sync.md#sn-sync-020)) rather than an exception. Storage layout audit belongs with `sane_core` path resolution ([SN-CORE-004](storage.md#sn-core-004), [SN-CORE-014](storage.md#sn-core-014)); add an arch-lint rule so new code cannot write documents under cache paths ([SN-FND-008](devx.md#sn-fnd-008) pattern). Keystore keys survive archiving (they are not part of the APK) but the check must be explicit, since a key lost with no recovery code is unrecoverable by design ([SN-CRY-020](security.md#sn-cry-020)).

#### Security & privacy
Auto-revoke is a **privacy feature** and we should lean into it rather than seek exemptions (MASVS-PRIVACY-1; the privacy dashboard in [SN-PRV-002](privacy.md#sn-prv-002) claims exactly this posture). The re-grant flow must not be used to widen scope: re-ask for the same narrow grant, never for broad storage. Cache purges must not leave decrypted residue behind — regenerable artefacts derived from note content are themselves sensitive and must be encrypted or non-reversible ([SN-SRCH-015](search.md#sn-srch-015) pattern, CWE-212).

#### UX notes
One banner in the library and one row in Settings → Sync & backup ([SN-SET-006](settings.md#sn-set-006)): "Sane Notes lost access to your sync folder. Reconnect." No modal on launch; notes stay editable meanwhile (offline-first, [SN-SYNC-026](sync.md#sn-sync-026)).

#### Test plan
Instrumented: revoke persisted URI permission via adb, relaunch, assert the recoverable state and a successful reconnect. `pm trim-caches` test asserting zero content loss plus thumbnail regeneration. A path-audit unit test over the storage layer. Manual archive/unarchive on a device with Play archiving available. Files: `app/test/storage/cache_path_audit_test.dart`, `integration_test/android_permission_revoke_test.dart`.

#### Dependencies
[SN-AND-018](storage.md#sn-and-018), [SN-SYNC-010](sync.md#sn-sync-010), [SN-AND-030](security.md#sn-and-030)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-009

<a id="sn-gipad-009"></a>

**SPIKE: decide the education deployment posture (Shared iPad, MDM config, ClassKit)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | spike |
| Priority | p3 |
| Milestone | Backlog |
| Platforms | ipad, ios-phone |
| Areas | compat, privacy, settings |
| Size | S |
| SDLC | requirements |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-AUTH-013](auth.md#sn-auth-013), [SN-PRV-007](privacy.md#sn-prv-007) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `MASVS-AUTH-1` |
| Extra labels | needs-decision |

#### Context
The product's primary persona is a student, and the classroom features ([SN-COL-017](collaboration.md#sn-col-017), [SN-COL-018](collaboration.md#sn-col-018)) aim straight at schools — yet the backlog contains **no analysis of how the app behaves on managed and shared school iPads**. Three Apple mechanisms decide that: **Shared iPad** (multiple students, temporary sessions, per-user data partitions that can be reclaimed), **Managed App Configuration** (an MDM pushes a `com.apple.configuration.managed` dictionary the app reads from `UserDefaults`, typically to disable cloud/AI features or force a sharing posture), and **ClassKit** (`CLSContext`, assignable activities and progress reporting to Schoolwork). Each has privacy consequences for minors ([SN-PRV-007](privacy.md#sn-prv-007)) and interacts with our device-local profiles ([SN-AUTH-007](auth.md#sn-auth-007)). A time-boxed spike must decide what, if anything, we support before v1 marketing claims anything about schools.

#### Scope
**In:** a 3-day investigation producing a written decision covering: (a) whether the app functions correctly on Shared iPad, including sign-out data reclamation, temporary sessions and the interaction with our local profiles and guest mode; (b) which Managed App Configuration keys we should honour (suggested: disable cloud AI, force telemetry off, disable share links, pin a sync provider, disable account creation) and how an admin-locked setting is presented; (c) whether ClassKit is worth adopting and what a minimal integration would be; (d) the minor-privacy consequences (COPPA/DPDP, [SN-PRV-007](privacy.md#sn-prv-007), [SN-PRV-008](privacy.md#sn-prv-008)) and whether an education tier needs its own DPIA appendix; (e) App Store implications (Volume Purchase, managed distribution, Apple School Manager).
**Out:** implementing any of it — each supported mechanism becomes its own issue; Android enterprise/EMM (a parallel spike); the education pricing decision ([SN-BILL-015](billing.md#sn-bill-015)).

#### Acceptance criteria
- [ ] A written decision lands in `docs/platform/` (or an ADR) with a support/no-support verdict per mechanism, the reasoning, and the follow-up issues to file for whatever is adopted.
- [ ] Shared iPad behaviour is empirically checked or explicitly recorded as unverified, including what happens to locally stored notebooks and keys when a student session ends and storage is reclaimed.
- [ ] A concrete list of Managed App Configuration keys with types, defaults and precedence versus user settings is specified — including the rule that a managed setting may only *restrict*, never *loosen*, a privacy default.
- [ ] The minor-data analysis states whether school deployment changes the age-gate defaults and whether parental/institutional consent replaces individual consent.
- [ ] Marketing/website claims about schools are confirmed as supported or removed from the copy plan ([SN-SITE-003](website.md#sn-site-003)).

#### Technical notes
Managed config arrives as `UserDefaults.standard.dictionary(forKey: "com.apple.configuration.managed")` — untrusted, admin-supplied, and changeable at runtime; design for observation, not a one-shot read. Shared iPad partitions per-user data automatically but *not* keychain semantics for our E2EE keys ([SN-CRY-008](security.md#sn-cry-008)) — check whether a returning student can still decrypt. ClassKit requires an entitlement and App Review justification.

#### Security & privacy
Managed configuration is an external control channel: validate every key and value, ignore unknown keys, and never let a managed value enable data egress that the user has not consented to (MASVS-PRIVACY-1). Shared-device use raises the multi-tenant leakage threat that [SN-AUTH-013](auth.md#sn-auth-013) addresses for profiles — the spike must confirm no cross-student residue in caches, thumbnails, the search index or Spotlight ([SN-GIPAD-005](search.md#sn-gipad-005)).

#### UX notes
If adopted, admin-locked settings show a lock glyph and "Managed by your school" helper text instead of silently reverting; guest/temporary sessions must make it obvious that content will not persist. No dark patterns to push institutional accounts.

#### Test plan
Not applicable to a spike beyond the verification steps above; the decision must name the test cases the implementation issues will carry (Shared iPad session end, managed key precedence, minor-consent defaults).

#### Dependencies
[SN-AUTH-013](auth.md#sn-auth-013), [SN-PRV-007](privacy.md#sn-prv-007).

#### Definition of done
- [ ] Document + gate merged, CI green (markdown lint, link check, issues-validate)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md cross-links the new page
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-008

<a id="sn-gphn-008"></a>

**Adapt phone chrome to compact height in landscape and keyboard-open**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | compat, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-002](compat.md#sn-phn-002), [SN-PHN-003](design-system.md#sn-phn-003), [SN-GPHN-003](editor.md#sn-gphn-003) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
[SN-PHN-002](compat.md#sn-phn-002) deliberately exposes a height class (compact height < 480 dp) "so landscape phones can shorten chrome instead of clipping it", but no issue consumes it. A phone in landscape — or a portrait phone with the keyboard open — leaves very little vertical room, and the bottom navigation, top toolbar, palette dock and any open bar can together crowd out the page entirely. docs/platform/phones.md §7 requires one-handed reachability and warns against clipping; ux-principles.md §8 requires every layout to remain usable in compact form. This issue makes the phone chrome respond to compact height: shorter bars, an auto-hiding or condensed bottom navigation, and priority to the page/canvas.

#### Scope
**In:** consuming the compact-height class from [SN-PHN-002](compat.md#sn-phn-002) across the phone shell and editor; a condensed chrome mode for compact height (shorter top toolbar, auto-hiding or reduced-height bottom navigation, tighter palette dock) that hands maximum vertical space to the page; landscape-phone editor layout; coordination with the bottom-chrome stack ([SN-GPHN-003](editor.md#sn-gphn-003)) and keyboard insets ([SN-GPHN-002](editor.md#sn-gphn-002)) so the combination of landscape + keyboard still shows the active line.
**Out:** the size-class/height-class resolver itself ([SN-PHN-002](compat.md#sn-phn-002)); the bar contents ([SN-PHN-004](editor.md#sn-phn-004), [SN-GPHN-001](editor.md#sn-gphn-001), [SN-GPHN-003](editor.md#sn-gphn-003)); foldable posture/hinge handling ([SN-PHN-017](compat.md#sn-phn-017)); and the keyboard-inset mechanism ([SN-GPHN-002](editor.md#sn-gphn-002)).

#### Acceptance criteria
- [ ] When the height class is compact (< 480 dp, e.g. a landscape phone or keyboard-open portrait), the chrome switches to a condensed mode that measurably increases the page/canvas area versus the standard compact layout.
- [ ] The bottom navigation either auto-hides on scroll/interaction (with a reliable way to bring it back) or reduces height, and never covers the active writing line together with the palette.
- [ ] The top toolbar uses a reduced height in compact-height mode without clipping the title or the undo/redo group.
- [ ] Landscape + keyboard-open still keeps the focused field/active line visible via [SN-GPHN-002](editor.md#sn-gphn-002), with no control clipped.
- [ ] Rotating between portrait and landscape preserves editor state (open page, viewport, tool, selection) and does not scroll-jump; this composes with [SN-PHN-017](compat.md#sn-phn-017) rather than duplicating it.
- [ ] Everything remains reachable one-handed and every control keeps >= 44x44 pt / 48x48 dp targets even when bars are shorter.
- [ ] Works at 200% Dynamic Type in compact height without two-dimensional scroll.
- [ ] The condensed mode holds 60 fps on the Android-lowend device and reads correctly in all 17 looks and dark mode.

#### Technical notes
Add a `chromeDensityProvider` in `app/lib/shell/` that derives condensed-vs-standard from the height class ([SN-PHN-002](compat.md#sn-phn-002)) and feeds the top toolbar ([SN-GPHN-001](editor.md#sn-gphn-001)), bottom navigation ([SN-PHN-003](design-system.md#sn-phn-003)) and bottom-chrome stack ([SN-GPHN-003](editor.md#sn-gphn-003)). Bars read a `density` token (standard/condensed) rather than hardcoding heights; component minimum tap targets are enforced independently of visual height (ux-principles.md §9.2 invariants). Auto-hide the bottom nav with a scroll-linked controller that always restores on tap/edge. Compose with, not replace, the reflow state preservation in [SN-PHN-017](compat.md#sn-phn-017). Never branch on platform identity (CLAUDE.md §8).

#### Security & privacy
None beyond baseline. The condensed chrome carries no note content; no interaction telemetry tied to a document is logged (telemetry opt-in, off by default — CLAUDE.md §7.4, MASVS-PRIVACY-1). Auto-hide must not defeat the lock/screenshot deterrent ([SN-PHN-015](security.md#sn-phn-015)) — a hidden bar does not change protected-content masking. No new permission or egress.

#### UX notes
Source: docs/platform/phones.md §7, ux-principles.md §8. The condensed mode must feel like the app calmly making room for the page (the page is the hero, §2), not like controls disappearing unpredictably — auto-hide is gentle and always recoverable, and there is no coach-mark storm (§3). Motion: bar height/opacity changes are short (150-200 ms) and cross-fade under Reduce Motion (§6). a11y: reduced height never reduces target size; when the bottom nav is hidden, its destinations remain reachable (e.g. via an edge affordance) and focus order stays logical; a screen-reader user is never stranded.

#### Test plan
- `app/test/shell/chrome_density_test.dart` — compact height selects condensed mode; standard otherwise; tap targets stay >= minimum despite reduced height.
- `app/test/shell/bottom_nav_autohide_test.dart` — bottom nav hides on scroll and restores on tap/edge; destinations remain reachable.
- `app/test/shell/landscape_keyboard_test.dart` — landscape + keyboard keeps the active field visible with no clipping.
- `app/test/golden/phone/compact_height_golden_test.dart` — landscape editor goldens per look family, light and dark.
- `app/integration_test/phone_landscape_test.dart` — patrol run: rotate to landscape mid-edit, state preserved, page area grows.

#### Dependencies
[SN-PHN-002](compat.md#sn-phn-002), [SN-PHN-003](design-system.md#sn-phn-003), [SN-GPHN-003](editor.md#sn-gphn-003)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPRF-003

<a id="sn-gprf-003"></a>

**Validate the armeabi-v7a 32-bit build against the Tier 3 minimum bar**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, qa, perf |
| Size | S |
| SDLC | verification |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-022](ci-cd.md#sn-and-022), [SN-PERF-022](perf.md#sn-perf-022) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready, sec: masvs |

#### Context
`armeabi-v7a` is a declared supported ABI: Tier 3, best-effort, no perf guarantee, but it MUST launch and take a note (docs/platform/compatibility-matrix.md sections 1 and 3; docs/architecture/rendering-and-performance.md section 9.2). It is also the ABI most likely to hit the Impeller GL fallback and the one with a 32-bit address space, so a 4 GB budget assumption that works on arm64 can still OOM there. Today [SN-AND-022](ci-cd.md#sn-and-022) produces the ABI splits and [SN-PERF-022](perf.md#sn-perf-022) records a known-fallback renderer for it, but nothing ever runs the app on a 32-bit device. A Tier 3 promise that is never executed is not a support tier, it is a hope, and the first evidence of breakage would be a one-star review from a user on an old tablet.

#### Scope
**In:** a per-release smoke run of the `armeabi-v7a` artifact on a physical 32-bit device or an official 32-bit system image; the Tier 3 checklist (install, launch, create a notebook, write a stroke, save, reopen, export); a memory ceiling observation under the 32-bit address space; confirmation that every bundled native library ships an `armeabi-v7a` variant; recording the renderer and the ink tier chosen; a documented known-gaps section for this ABI.
**Out:** perf budgets on this ABI (explicitly not guaranteed), the build configuration itself ([SN-AND-022](ci-cd.md#sn-and-022)), 16 KB page alignment ([SN-AND-021](compat.md#sn-and-021), an arm64 concern), and any optimisation work the run uncovers (filed separately).

#### Acceptance criteria
- [ ] The `armeabi-v7a` artifact installs and launches on a 32-bit target and completes the Tier 3 checklist without a crash or ANR.
- [ ] Every native library in the artifact (ink surface, PDF, ML, SQLite, crypto) has an `armeabi-v7a` variant, or its absence is handled by a runtime capability check that degrades instead of crashing.
- [ ] The chosen ink tier and active renderer are recorded; a Tier B / Skia GL result is an accepted outcome here and is reported, not failed.
- [ ] A long writing session on 32-bit does not exhaust the address space: peak native + Dart heap is recorded and any OOM is filed as a bug with the trace.
- [ ] Known gaps for this ABI are written into the compatibility docs so support can answer honestly.

#### Technical notes
Build the split artifact from [SN-AND-022](ci-cd.md#sn-and-022) and install with `adb install --abi armeabi-v7a`, or use an official 32-bit emulator image for the functional checklist (never for a latency claim — emulators are non-gating per docs/platform/performance-budgets.md section 3). Watch for 64-bit assumptions in plugin glue: pointer-width in FFI structs, `long` vs `int32` in JNI, and any `int` overflow in tile-coordinate maths. `dart:ffi` sizes must be derived, not hardcoded.

#### Security & privacy
None beyond baseline. The run uses synthetic notebooks only. Note that older 32-bit devices frequently run unpatched Android versions; this run does not lower any security control for them — key storage still requires Keystore ([SN-AND-019](security.md#sn-and-019)) and a device without it degrades per that issue's policy, which this checklist verifies is a graceful degradation rather than a crash.

#### UX notes
No new UI. If a capability is missing on this ABI the user must see the same honest, documented degradation the capability layer gives everywhere else, never a silent failure or a crash on first stroke.

#### Test plan
Manual per-release checklist executed on the 32-bit target, recorded under `tools/device_lab/results/armeabi-v7a-<os>.md`. Automated: the functional `integration_test` suite ([SN-QA-006](qa.md#sn-qa-006)) runs against a 32-bit image in the nightly matrix, functional-only. Add a build-time test asserting the ABI variant list of every bundled `.so`.

#### Dependencies
[SN-AND-022](ci-cd.md#sn-and-022), [SN-PERF-022](perf.md#sn-perf-022)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-004

<a id="sn-gprf-004"></a>

**Validate the x86_64 build on ChromeOS and emulators as functional-only**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, qa, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-022](ci-cd.md#sn-and-022), [SN-PERF-004](perf.md#sn-perf-004) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
`x86_64` is the third supported Android ABI and it exists for two real audiences: the emulators every contributor and CI job runs, and Chromebooks running Android apps, where a USI pen and a note-taker registration make Sane Notes genuinely useful (docs/platform/compatibility-matrix.md section 3; docs/architecture/rendering-and-performance.md section 9.2). The matrix rates it Tier 2 on Android 13+ and Tier 2/3 elsewhere, and the performance rules are blunt: emulators MUST NOT be a latency or fps gate, they MAY run functional and golden checks only (docs/platform/performance-budgets.md section 3). Nothing currently proves the x86_64 artifact actually works: [SN-AND-022](ci-cd.md#sn-and-022) configures the split, [SN-AND-010](input-gestures.md#sn-and-010) handles USI and note-taker registration, but no run asserts the ABI boots, renders and passes the functional suite.

#### Scope
**In:** running the functional and golden suites against the x86_64 artifact on an emulator image in the nightly matrix; a per-release manual pass on a Chromebook (ARCVM) covering install, window resize, keyboard/mouse, USI pen and file access; asserting every bundled native library ships an x86_64 variant; asserting the harness marks x86_64 runs as non-gating for latency and fps; recording the renderer (Impeller Vulkan availability differs under emulation).
**Out:** ChromeOS windowing and note-taker behaviour ([SN-AND-013](compat.md#sn-and-013), [SN-AND-010](input-gestures.md#sn-and-010)), the USI stylus capability rows ([SN-GPRF-008](input-gestures.md#sn-gprf-008)), and the perf gate mechanics ([SN-PERF-003](perf.md#sn-perf-003)).

#### Acceptance criteria
- [ ] The x86_64 artifact installs and passes the functional `integration_test` suite and the golden suite on an emulator image in the nightly matrix.
- [ ] A perf result produced on an x86_64 emulator slot is tagged non-gating for latency and fps and cannot fail a gate on those metrics; a test proves the tag is applied.
- [ ] Every bundled native library has an x86_64 variant, or a capability check degrades cleanly where it does not.
- [ ] A Chromebook manual pass completes install, resize between window classes, hardware keyboard and mouse, a USI stroke, and open/save through the file picker.
- [ ] The active renderer under emulation and under ARCVM is recorded in the results, since a software-GL fallback there is expected and must not be read as a device-class failure.

#### Technical notes
Use the same artifact path as [SN-AND-022](ci-cd.md#sn-and-022); select the image with `adb install --abi x86_64`. Golden tests are safe under emulation because they compare pixels from a deterministic raster, but they must run with the same renderer the gate expects, so pin the image's GPU mode and record it. ChromeOS runs Android in ARCVM with its own window management; treat window-class changes as the same runtime relayout path as foldables ([SN-AND-012](compat.md#sn-and-012), [SN-AND-013](compat.md#sn-and-013)).

#### Security & privacy
None beyond baseline. Emulator images are disposable and must never hold real user data or production credentials; the suite uses synthetic fixtures ([SN-QA-011](qa.md#sn-qa-011)). On ChromeOS, file access goes through SAF with persistable permissions ([SN-AND-018](storage.md#sn-and-018)) and this pass verifies no broader storage permission is requested on that surface.

#### UX notes
No new UI. The outcome users feel is that the app opens on a school Chromebook, resizes like a desktop window, and takes a USI pen stroke without surprises.

#### Test plan
Automated: nightly functional + golden matrix entry for the x86_64 image; a unit test on the result tagger asserting the non-gating flag. Manual: the per-release Chromebook checklist, recorded in `tools/device_lab/results/x86_64-chromeos-<version>.md`.

#### Dependencies
[SN-AND-022](ci-cd.md#sn-and-022), [SN-PERF-004](perf.md#sn-perf-004)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-005

<a id="sn-gprf-005"></a>

**Gate the Android 16 Tier-1 slot on a behaviour-change conformance run**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | compat, qa, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-014](compat.md#sn-and-014), [SN-AND-015](compat.md#sn-and-015), [SN-AND-021](compat.md#sn-and-021), [SN-AND-012](compat.md#sn-and-012) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, sec: masvs |

#### Context
`Android-A16` is a Tier-1 device-lab slot whose entire reason for existing is the API 36 behaviour changes: predictive back, enforced edge-to-edge, 16 KB page sizes, and forced resizability on large screens (docs/platform/compatibility-matrix.md section 2 and section 3; docs/platform/android.md section 9). Each change already has an implementation issue — [SN-AND-014](compat.md#sn-and-014) predictive back, [SN-AND-015](compat.md#sn-and-015) edge-to-edge insets, [SN-AND-021](compat.md#sn-and-021) 16 KB alignment, [SN-AND-012](compat.md#sn-and-012) window size classes — but each proves itself in isolation, and the failure mode of behaviour changes is systemic: an app passes every individual check while the combination regresses once a temporary compatibility opt-out expires with the next target-SDK bump. This issue owns the combined conformance run on the Android-A16 slot and makes it a release gate, so the four changes are verified together, with every opt-out flag off.

#### Scope
**In:** an automated conformance suite executed on the Android-A16 slot covering the four behaviour changes end to end; an assertion that no compatibility opt-out manifest flag or `targetSdk`-based grace behaviour is relied on; a 16 KB-page device (or the 16 KB emulator mode) actually running the app, not just a static alignment check; a large-screen forced-resizability pass that resizes the window across classes mid-edit; the release-gate wiring and a per-release results record.
**Out:** the implementations themselves (the four issues above), the target-SDK bump policy ([SN-GPRF-018](compat.md#sn-gprf-018)), and Android 16 features not in the behaviour-change set.

#### Acceptance criteria
- [ ] The suite runs on an API 36 device or image and fails the release gate when any of the four behaviour changes regresses.
- [ ] Predictive back is exercised from the editor with unsaved ink present: the back preview animates, the gesture can be cancelled, and cancelling loses nothing.
- [ ] Edge-to-edge is verified with gesture navigation and three-button navigation and in both orientations: no control sits under a system bar or a cutout, and insets are consumed once.
- [ ] The app launches and inks on a 16 KB page-size configuration, with every bundled `.so` aligned; a deliberately misaligned library in a fixture build fails the check.
- [ ] With forced resizability, the window is resized across compact, medium and expanded classes while a stroke is in progress and the editor relayouts without losing editor state or the in-flight stroke.
- [ ] A static check asserts the manifest declares no behaviour-change opt-out flags.

#### Technical notes
Run on the `Android-A16` config from [SN-PERF-004](perf.md#sn-perf-004). Predictive back uses `OnBackInvokedCallback` ([SN-AND-014](compat.md#sn-and-014)); insets via `WindowInsetsCompat` ([SN-AND-015](compat.md#sn-and-015)); alignment verified with the `check_elf_alignment` approach from [SN-AND-021](compat.md#sn-and-021) plus a runtime launch on the 16 KB image; resizability through the window-size-class resolver ([SN-AND-012](compat.md#sn-and-012), [SN-PHN-002](compat.md#sn-phn-002)). Resize-mid-stroke is the interesting case: the wet layer lives on a native surface ([SN-AND-002](ink.md#sn-and-002)), so the surface must be recreated without dropping the active stroke.

#### Security & privacy
None beyond baseline, with one note: behaviour-change conformance touches the manifest, and the same run should confirm no exported component or `PendingIntent` posture changed to satisfy a behaviour change ([SN-AND-029](security.md#sn-and-029); MASVS-PLATFORM-1). A resize or back-gesture path must not expose a locked note's content (see [SN-PHN-015](security.md#sn-phn-015)).

#### UX notes
The user-visible promise is that the newest Android release does not break the app. Concretely: the back gesture previews the destination and can be abandoned, nothing hides behind the system bars, and dragging the window smaller mid-sentence keeps the sentence.

#### Test plan
Integration (`integration_test` + patrol on the A16 slot): one test per behaviour change plus one combined test that resizes during an active stroke with predictive back mid-gesture. Static: a manifest-flag test and the ELF-alignment test with a deliberately misaligned fixture. Manual: one per-release pass on a physical API 36 device recorded under `tools/device_lab/results`.

#### Dependencies
[SN-AND-014](compat.md#sn-and-014), [SN-AND-015](compat.md#sn-and-015), [SN-AND-021](compat.md#sn-and-021), [SN-AND-012](compat.md#sn-and-012)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-006

<a id="sn-gprf-006"></a>

**Publish the compatibility matrix as a machine-readable registry with a CI drift check**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | compat, ci-cd, qa |
| Size | M |
| SDLC | design |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-018](perf.md#sn-perf-018) |
| Security controls | `SLSA-BUILD-L2` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
The compatibility matrix is the single source of truth for "do we support X?" across OS version, architecture, browser, stylus, refresh rate and screen class (docs/platform/compatibility-matrix.md). It is currently prose plus tables, and its numbers are restated in at least four other places: the build files (minSdk 29, target SDK 36, iOS deployment target 17), the web browser floors, docs/architecture/rendering-and-performance.md section 9, and the per-surface docs. [SN-PERF-018](perf.md#sn-perf-018) solved exactly this problem for the performance budgets by making them data with a docs-drift check; [SN-PERF-004](perf.md#sn-perf-004) made the Tier-1 device slots data. The support matrix itself is still prose, so a floor can be raised in Gradle and nowhere else, and the app will keep claiming support it no longer has.

#### Scope
**In:** `tools/device_lab/compat/compat.json` holding one row per supported combination — OS family and minimum version, architecture, browser and minimum version, stylus capability rows, refresh-rate rows, screen-size classes — each with a support tier (1/2/3/unsupported), the gating budgets that apply, and a source doc anchor; a typed loader shared by the harness and the app; a schema test; a drift check comparing the registry against the tables in the compatibility matrix doc; a second drift check comparing it against the real build configuration (Gradle `minSdk`/`targetSdk`, `IPHONEOS_DEPLOYMENT_TARGET`, the web browser floor list).
**Out:** the runtime enforcement wall ([SN-GPRF-007](compat.md#sn-gprf-007)), the device-lab slot configs ([SN-PERF-004](perf.md#sn-perf-004), which this registry references rather than replaces), and the performance budget registry ([SN-PERF-018](perf.md#sn-perf-018)).

#### Acceptance criteria
- [ ] Every row of compatibility-matrix sections 1, 3, 4 and 5 exists in the registry with a tier, a source anchor, and the budgets that gate it.
- [ ] A typed loader exposes the registry to Dart callers and fails loudly on an unknown row id instead of returning null.
- [ ] A CI check fails when the registry and the compatibility-matrix tables disagree on any minimum version or tier.
- [ ] A CI check fails when Gradle `minSdk`, the iOS deployment target, or the declared web browser floors differ from the registry.
- [ ] Rows carry an explicit `verified` flag so the matrix's open "(verify)" cells (Apple Pencil USB-C pressure, USI hover, Firefox skwasm) are data rather than a footnote, and [SN-GPRF-008](input-gestures.md#sn-gprf-008) can flip them.
- [ ] Changing a floor requires editing the registry, and the README documents that path.

#### Technical notes
Mirror the shape and tooling of [SN-PERF-018](perf.md#sn-perf-018) so there is one idiom for "docs that are also data": JSON plus a schema test plus a doc-drift parser. The device-lab configs from [SN-PERF-004](perf.md#sn-perf-004) reference registry row ids rather than duplicating versions. The app reads the same registry at build time (a generated Dart constant) so [SN-GPRF-007](compat.md#sn-gprf-007) has no second copy of the floors. Keep it dependency-free and offline: no network calls, no hosted matrix.

#### Security & privacy
Supply-chain hygiene: the registry is a build input, so it is code-reviewed and generated deterministically, never fetched at runtime (sec: supply-chain). An OS floor is also a security control — dropping below the floor means dropping below the platform security baseline (Keystore, Secure Enclave, modern TLS), so lowering a floor must be a reviewed, deliberate change with a security note, which making it data enforces.

#### UX notes
No user-facing surface of its own, but it is the input to the honest support story: the website's system requirements, the store listings, and the update wall ([SN-GPRF-007](compat.md#sn-gprf-007)) all read the same rows, so a user is never told three different minimum versions.

#### Test plan
Unit: loader tests (known row, unknown row, malformed row). Schema test rejecting a row missing tier, version or anchor. Drift tests: a fixture doc and a fixture build config that disagree with the registry must fail; matching ones must pass. CI: the checks run in the standard verification workflow alongside the budget drift check.

#### Dependencies
[SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-018](perf.md#sn-perf-018)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-007

<a id="sn-gprf-007"></a>

**Enforce the minimum OS and browser bar at runtime with an update wall**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | compat, onboarding |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-GPRF-006](compat.md#sn-gprf-006) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PLATFORM-2` |
| Extra labels | agent-ready, sec: masvs |

#### Context
The compatibility matrix defines an Unsupported tier and states plainly what happens there: the app MAY refuse to install or run, or show an "update your OS/browser" wall (docs/platform/compatibility-matrix.md section 1). Stores enforce the mobile floors for us — a device below minSdk 29 or iOS 17 cannot install the app — but the web has no such gate, and neither does a sideloaded or restored build. Today an old Safari or a Chrome 100 lands directly in a Flutter web app that will fail somewhere deep inside CanvasKit, producing a blank canvas and a support ticket instead of an answer. This issue turns the matrix's floors into a deliberate, friendly, data-driven boundary.

#### Scope
**In:** a boot-time check comparing the running OS/browser version against the registry from [SN-GPRF-006](compat.md#sn-gprf-006); a blocking wall for Unsupported with a plain-language explanation, the required version, and a route to get the user's data out; a one-time dismissible notice for a Tier 3 best-effort environment; localisation and accessibility of both surfaces; a debug override for testing; telemetry-free implementation.
**Out:** the registry itself ([SN-GPRF-006](compat.md#sn-gprf-006)), store-side minimum declarations ([SN-AND-022](ci-cd.md#sn-and-022), [SN-IPAD-031](ci-cd.md#sn-ipad-031)), feature-level capability degradation (which stays a runtime capability query, not a version check), and the marketing-site requirements page ([SN-SITE-001](website.md#sn-site-001) area).

#### Acceptance criteria
- [ ] On a browser below the declared floor the app renders an accessible HTML wall before the Flutter engine boots, naming the browser, the detected version and the minimum required.
- [ ] The wall never traps data: if local notes exist in OPFS/IndexedDB the wall offers an export/download path, or, where that is impossible in the old browser, tells the user exactly which supported browser will recover them.
- [ ] A Tier 3 environment shows a dismissible "best-effort, not tested" notice once, stored per install, and never blocks.
- [ ] Version comparison is data-driven from the registry; no version string is hardcoded in app code, proven by a test that changes the registry and sees the boundary move.
- [ ] Both surfaces are localised, keyboard-reachable, screen-reader-announced, and meet contrast tokens.
- [ ] A debug flag forces each state so QA and goldens can cover them.

#### Technical notes
The web wall must be plain HTML/CSS in `web/index.html` with a tiny script that runs before the engine loads — a Flutter-rendered wall cannot render on a browser that cannot run the engine. Detect via feature probes first (WebAssembly, `OffscreenCanvas`, Pointer Events, `structuredClone`) and fall back to a UA-version parse only for messaging; capability probing is the rule everywhere else in this codebase and it applies here. On mobile, read the OS version and compare to the registry for the (rare) below-floor restore case. Keep the generated registry constant so no second copy of the floors exists.

#### Security & privacy
No identifiers, no network call, no telemetry: the check is local and the wall is static (ADR-0011). A UA string is never sent anywhere. The wall must not leak note titles or counts — it may say that local data exists, not what it is (LINDDUN: disclosure). Refusing to run below the security floor is itself a control: unsupported OS versions lack the hardware-backed key storage the threat model assumes (MASVS-STORAGE-1).

#### UX notes
Tone follows the brand voice: calm, specific, never blaming the user. One sentence on what is wrong, one on what to do, one on their notes being safe. Use the Sage mascot's supportive register, not an error skull. Design reference: the empty/error state patterns in the design system ([SN-DS-001](design-system.md#sn-ds-001)) and the onboarding first-run surfaces ([SN-ONB-001](onboarding.md#sn-onb-001)).

#### Test plan
Unit: version-comparison and tier-resolution tests driven by registry fixtures, including pre-release and vendor-suffixed versions. Widget/golden: the Tier 3 notice in light/dark. Web integration: a spoofed old-browser bundle test asserting the pre-engine wall renders and the engine never boots. Manual: one pass in an old Safari and an old Firefox from the Tier 2 pool.

#### Dependencies
[SN-GPRF-006](compat.md#sn-gprf-006)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-018

<a id="sn-gprf-018"></a>

**Run the OS, browser and target-SDK upgrade readiness cycle on pre-release builds**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | compat, qa, release |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-GPRF-006](compat.md#sn-gprf-006), [SN-GPRF-005](compat.md#sn-gprf-005) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready, sec: masvs |

#### Context
The compatibility matrix is a snapshot, and every year the ground moves: a new iPadOS and iOS, a new Android release with behaviour changes, an annual Play target-SDK deadline, and browser releases every few weeks. The matrix already encodes this reality — Android 16 gets its own Tier 1 slot because its behaviour changes must be handled, iPadOS 26 APIs must sit behind availability checks ([SN-IPAD-027](compat.md#sn-ipad-027)), and browser floors are versioned — but nothing in the plan schedules the work of finding out what the *next* version breaks. The failure mode is well known for a pen-first app: an OS beta changes stylus event delivery or a browser ships a Pointer Events change, and the first report arrives from users on release day. This issue makes readiness a routine, not a rescue.

#### Scope
**In:** a documented readiness cycle run each time a major OS developer preview/beta or a browser pre-release channel appears: install the pre-release on a lab device or channel, run the functional, golden and (non-gating) perf suites, walk a short manual charter focused on ink capture, palm rejection, windowing and file access, and file findings before GA; the annual Play target-SDK and iOS SDK bump checklist with its behaviour-change review; the rule that the compatibility registry ([SN-GPRF-006](compat.md#sn-gprf-006)) is updated in the same cycle; a standing tracking issue template per OS version.
**Out:** the Android 16 conformance gate ([SN-GPRF-005](compat.md#sn-gprf-005)), availability-gating implementation ([SN-IPAD-027](compat.md#sn-ipad-027)), store submission mechanics ([SN-REL-011](release.md#sn-rel-011)), and fixing what the cycle finds.

#### Acceptance criteria
- [ ] A written cycle exists naming triggers (OS developer preview, OS beta, browser pre-release channel, annual SDK deadline), the suites to run, the manual charter, and where findings go.
- [ ] At least one full dry-run of the cycle is executed against a current pre-release OS or browser channel, producing a dated report and any findings as issues.
- [ ] The manual charter explicitly covers the pen path: capture and coalesced samples, prediction, palm rejection, hover, pressure and tilt, since these are the APIs most often changed and least covered by functional tests.
- [ ] The annual target-SDK checklist enumerates the behaviour changes for the new API level, maps each to an owner or a "no impact" note with evidence, and is completed before the deadline.
- [ ] A pre-release run that finds a breakage raises an issue tagged for the release it would affect, with device, OS build and the reproduction attached.
- [ ] The compatibility registry and matrix doc are updated in the same PR as the cycle report, so tiers never lag the world by a whole release.

#### Technical notes
Pre-release OS runs must never be a gate: they are early warning, and their perf numbers are recorded non-gating (beta OSes are routinely slower). Keep at least one lab device reserved for pre-release so a Tier 1 gate device is never upgraded out of its documented OS. On web, run the same suites against Chrome Canary/Beta, Safari Technology Preview and Firefox Nightly using the cross-browser harness ([SN-WEB-023](qa.md#sn-web-023)). Availability checks ([SN-IPAD-027](compat.md#sn-ipad-027)) are the mechanism that lets a new OS ship before we adopt its APIs; the cycle verifies they still hold.

#### Security & privacy
Pre-release OSes can change security-relevant behaviour: Keystore/StrongBox availability, backup and device-transfer semantics ([SN-AND-030](security.md#sn-and-030)), privacy-manifest and required-reason API rules ([SN-IPAD-021](privacy.md#sn-ipad-021)), and permission prompts. The charter includes a security pass over those, and a regression there is treated as a release blocker rather than a compatibility note (MASVS-STORAGE-1, MASVS-PLATFORM-1). Lab devices on pre-release builds hold synthetic data only.

#### UX notes
No user-facing surface. The user-visible outcome is that the app keeps working on the day a new OS ships, which for a note app is the difference between trust and a support queue — and it lets the release notes say "supports iPadOS N on day one" honestly.

#### Test plan
Process verification: the dry-run report is the evidence. Automation: a scheduled workflow that checks for new OS/browser pre-release versions against the registry and opens the tracking issue from a template, so the cycle starts without anyone remembering. The manual charter lives with the exploratory charters ([SN-QA-014](qa.md#sn-qa-014)).

#### Dependencies
[SN-GPRF-006](compat.md#sn-gprf-006), [SN-GPRF-005](compat.md#sn-gprf-005)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GWEB-004

<a id="sn-gweb-004"></a>

**Define the web URL strategy, history model and back/forward behaviour**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | compat, editor, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | — |
| Security controls | `CWE-200`, `OWASP-A01`, `MASVS-PLATFORM-1`, `MASVS-PRIVACY-2` |
| Extra labels | agent-ready |

#### Context

The web is the one surface where the operating system puts a text field around our app. Every route the app pushes can become a bookmark, a shared link, an entry in a synced browser history, a referrer, and a target for the back gesture — and on web the **back button is a primary navigation control**, not an edge case. The backlog has routing issues for every consumer of routes ([SN-SEC-011](security.md#sn-sec-011) allow-list router, [SN-NOTF-004](notifications.md#sn-notf-004) route table, [SN-SHR-013](sharing-export.md#sn-shr-013) share links, [SN-COL-009](collaboration.md#sn-col-009) which already requires `history.replaceState` to strip a key fragment) but nothing that decides the web app's **URL strategy** itself: hash vs path URLs, what appears in the address bar for a private note, which UI states push history entries, what the back button does when an overlay is open, and how the hosting layer serves deep routes ([SN-WEB-017](ci-cd.md#sn-web-017) publishes `index.html` but no route-rewrite rule is specified anywhere). Left undecided, Flutter's default hash strategy ships, deep links 404 on refresh, the back button closes the whole app mid-stroke, and notebook titles leak into synced history and referrers.

#### Scope

**In:** an ADR-level decision plus implementation of: `PathUrlStrategy` (clean paths) with the matching edge rewrite rule handed to [SN-WEB-017](ci-cd.md#sn-web-017) and the service-worker navigation fallback ([SN-WEB-011](compat.md#sn-web-011)); the canonical route shapes for Library, notebook/page, Search, Settings, `/try` and `/n/<slug>`; the rule that **page-level** navigation pushes history while **overlays, sheets, tool changes and canvas viewport** do not (they are dismissed by back once, then back leaves); restoration of notebook, page and viewport from a URL on cold load; opaque ids only in URLs, no titles, no tags, no query parameters carrying user data; `replaceState` scrubbing of any share fragment after consumption; and `scope`/`start_url` alignment with the manifest ([SN-WEB-010](compat.md#sn-web-010)).

**Out:** the inbound-link security allow-list ([SN-SEC-011](security.md#sn-sec-011)) and outbound guard ([SN-SEC-013](security.md#sn-sec-013)), the share-link model ([SN-SHR-013](sharing-export.md#sn-shr-013)), the reader route itself ([SN-GWEB-014](sharing-export.md#sn-gweb-014)), hosting provisioning ([SN-WEB-017](ci-cd.md#sn-web-017)), and native deep links.

#### Acceptance criteria

- [ ] Refreshing or deep-linking any documented route (`/library`, `/n/<id>/p/<n>`, `/search?…` with no user data, `/settings/<tab>`, `/try`) loads that exact state with **no 404**, both online and offline through the service worker.
- [ ] The address bar never contains a notebook title, tag, search term, email, file path or any note-derived string; a test walks every route generator and asserts ids are opaque and ≥ 96-bit-safe where they are shareable.
- [ ] Back from an open overlay closes the overlay; back again leaves the page; back never discards an in-progress stroke without the flush from [SN-GWEB-003](storage.md#sn-gweb-003).
- [ ] Tool changes, zoom, pan, page-rail scroll and palette moves create **zero** history entries (asserted by counting `history.length` over a scripted session).
- [ ] A share link's `#k=…` fragment is consumed and removed with `replaceState` before any further navigation, and is never written into a pushed entry ([SN-COL-009](collaboration.md#sn-col-009), TM-I-09).
- [ ] Browser forward after back restores the same page and viewport within 300 ms with no reload.
- [ ] `start_url` and `scope` in the manifest match the strategy, and an installed PWA launched from the home screen lands on the Library with no browser chrome ([SN-WEB-010](compat.md#sn-web-010)).

#### Technical notes

Set `usePathUrlStrategy()` at bootstrap; keep one `go_router` configuration shared with native ([SN-SEC-011](security.md#sn-sec-011) owns the allow-list) and mark web-only routes explicitly. The hosting rewrite is "serve `/index.html` for any path within `scope` that is not a hashed asset" — hand it to [SN-WEB-017](ci-cd.md#sn-web-017) as part of the checked-in edge config, and mirror it in the local dev server so developers see production behaviour. Viewport restoration should round-trip through the same page-state model used by [SN-GWEB-003](storage.md#sn-gweb-003)'s restore record rather than encoding coordinates in the URL. Reference `docs/adr/0003-state-management-and-app-structure.md` and `docs/platform/web.md` §8. The edge rewrite and allow-list are defined/mirrored here; [SN-WEB-017](ci-cd.md#sn-web-017) (M8) applies the edge config (dev server stands in) and [SN-SEC-011](security.md#sn-sec-011) (M4) adds the allow-list — neither blocks the M1 URL-strategy work.

#### Security & privacy

Threats: **capability leakage via URL** — anything in a path or query reaches server logs, browser history sync, extensions and referrers, so share keys stay in the fragment and ids stay opaque (TM-I-09, CWE-200, CWE-598, MASVS-PRIVACY-2); **forced browsing / IDOR through hand-edited URLs** — every route resolves through the allow-list router and lands in a view/confirm state with an authorisation check, never an implicit mutation (OWASP-A01, MASVS-PLATFORM-1); **open redirect** — no route may take a destination from a parameter (CWE-601); **history poisoning** — `pushState` payloads are treated as untrusted on restore and validated like any other input (CWE-20). Access logs already drop query strings and fragments ([SN-WEB-017](ci-cd.md#sn-web-017)); this issue keeps anything sensitive out of the path as well.

#### UX notes

Matches `docs/design/screens-and-flows.md` navigation model: the browser back button behaves like the in-app back affordance, and the two never disagree. A user who bookmarks a page gets that page. Unsaved-state prompts are avoided entirely by flushing ([SN-GWEB-003](storage.md#sn-gweb-003)) rather than blocking navigation. Focus is restored to the invoking control after an overlay closes via back ([SN-WEB-020](a11y.md#sn-web-020)).

#### Test plan

- `app/test/platform/web/url_strategy_test.dart` — route generation, opaque ids, no user data in paths/queries, fragment scrubbing.
- `app/test/routing/history_depth_test.dart` — overlay/tool/viewport interactions produce no history entries.
- `app/integration_test/web/deep_link_refresh_test.dart` — refresh and offline refresh on every documented route; forward/back restoration.
- `tools/scripts/post_deploy_check.mjs` extension — assert the rewrite rule serves the shell for a deep path and a 404 for an unknown asset.

#### Dependencies
None hard. The checked-in edge rewrite rule is defined here and applied by [SN-WEB-017](ci-cd.md#sn-web-017) (production hosting, M8; mirrored in the local dev server until then); the shared `go_router` config is hardened by the allow-list router [SN-SEC-011](security.md#sn-sec-011) (M4). Coordinates with [SN-WEB-010](compat.md#sn-web-010) (manifest scope), [SN-WEB-011](compat.md#sn-web-011) (navigation fallback), [SN-GWEB-003](storage.md#sn-gweb-003) (state restore).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-IPAD-009

<a id="sn-ipad-009"></a>

**Spike: verify Flutter multi-view and multi-window support on iPadOS 26**

| Field | Value |
|---|---|
| GitHub | #310 |
| Type | spike |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | compat |
| Size | S |
| SDLC | design |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, needs-decision |

#### Context
iPadOS 26 shipped a new windowing system and Sane Notes wants additive windows (a new window per note). But multi-window/multi-view support on Flutter is uncertain and is flagged as a real risk item L4 in docs/platform/ipad.md §10, to be verified at spike time and recorded in ADR-0001. This time-boxed spike de-risks [SN-IPAD-011](compat.md#sn-ipad-011) before it is built.

#### Scope
**In:** measure the current Flutter stable's multi-view/multi-window capability on iPadOS 26 (one `FlutterEngine` per scene vs multi-view embedding); prototype opening a second window bound to a second note; document feasibility, state-sharing model, and a fallback (in-app tabbed windows); write the outcome into ADR-0001 and docs/platform/ipad.md §7.
**Out:** the production additive-windowing feature ([SN-IPAD-011](compat.md#sn-ipad-011)); Stage Manager layout adaptation ([SN-IPAD-010](compat.md#sn-ipad-010)).

#### Acceptance criteria
- [ ] A written decision states whether native scenes/additive windows are feasible on the pinned Flutter version, with the engine/embedding approach and its state-sharing implications.
- [ ] If not feasible, the documented fallback is tabbed in-app windows (docs/platform/ipad.md §10 L4).
- [ ] ADR-0001 and docs/platform/ipad.md updated with the outcome; a throwaway prototype branch is linked.
- [ ] The decision names the maintainer approval needed to pick the windowing approach (needs-decision).

#### Technical notes
Reference ADR-0001 (single-codebase + exit criteria), ADR-0003 (app structure), docs/platform/ipad.md §7 windowing + L4. Investigate `UISceneSession`/`UIWindowScene`, multiple `FlutterViewController`s, and any multi-view API. Keep the prototype throwaway (no production code merged).

#### Security & privacy
None beyond baseline: prototype only; a per-window note must still respect locks so a second window cannot bypass a note lock (note for the follow-up feature). No content/tokens logged.

#### UX notes
Document how additive windows appear in the app-menu window list with descriptive (notebook-title) names (docs/platform/ipad.md §7). No shipped UI in the spike; the follow-up feature covers looks/a11y.

#### Test plan
Manual: prototype opens two windows on an iPadOS 26 device; screenshots + notes attached to the ADR. No automated tests for a throwaway spike.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) monorepo scaffold.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; ADR-0001 + docs/platform/ipad.md record the outcome
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-010

<a id="sn-ipad-010"></a>

**Adapt editor layout to Split View, Slide Over and Stage Manager without state loss**

| Field | Value |
|---|---|
| GitHub | #311 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | compat, editor |
| Size | L |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The App Store expects iPad apps to support multiple window sizes and multitasking, and NOT to lock orientation or opt out of resizability (docs/platform/ipad.md §9/§7). Sane Notes MUST coexist with Split View, Slide Over, Stage Manager and the resize handle, adapting every layout to any window size and re-laying-out at runtime without losing editor state (docs/platform/compatibility-matrix.md §5 window classes). This is a hard release gate.

#### Scope
**In:** drive the app's adaptive layout off window-size-class-equivalent breakpoints (Compact/Medium/Expanded/Large/Extra-large per docs/platform/compatibility-matrix.md §5); collapse to phone-style chrome at narrow widths; preserve editor state (open note, tool, selection, scroll/zoom, undo stack) across resize / Split View / Stage Manager transitions; support external display via Stage Manager on M-series iPads.
**Out:** additive multi-window (scene per note) ([SN-IPAD-011](compat.md#sn-ipad-011)); phone-specific layouts (SN-PHN area).

#### Acceptance criteria
- [ ] Resizing the window (Split View 1/3-2/3, Slide Over, Stage Manager free resize) reflows the layout with no dropped editor state (open note, tool, selection, zoom, undo depth intact).
- [ ] At < 900 dp the sidebar collapses to the narrow class; at Expanded+ the two-pane + rail layout shows (docs/design/screens-and-flows.md adaptive rules).
- [ ] Orientation is not locked and resizability is not opted out (verified in Info.plist / scene manifest).
- [ ] External display via Stage Manager shows an extended workspace on an M-series iPad.
- [ ] Class change mid-stroke does not corrupt the in-progress stroke.

#### Technical notes
Use `MediaQuery`/`LayoutBuilder` size classes (ADR-0003 adaptive layout), not device checks. Editor state held in `app/` Riverpod providers that survive relayout (no state in ephemeral widgets). Reference docs/platform/ipad.md §7, docs/platform/compatibility-matrix.md §5. Scene manifest must declare multiple supported window sizes.

#### Security & privacy
None beyond baseline: layout only; no content leaves the device and nothing is logged. A locked note remains locked across window transitions (MASVS-AUTH-1), and no locked content appears in a resized/backgrounded snapshot (MASVS-PRIVACY-1).

#### UX notes
All breakpoints follow docs/design/screens-and-flows.md and design/Sane Notes.dc.html; every look + light/dark must lay out correctly at Compact through Extra-large (golden per class). 44 pt targets hold at every width; keyboard focus order preserved across relayout; contrast >= 4.5:1.

#### Test plan
Widget: `app/test/layout/size_class_reflow_test.dart` (state preserved across simulated window resizes). Golden: `app/test/golden/layout_classes_test.dart` (Compact/Medium/Expanded/Large/Extra-large x looks). Integration: `app/integration_test/stage_manager_resize_test.dart` via `patrol` on an M-series iPad.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) editor canvas & tool state machine.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-011

<a id="sn-ipad-011"></a>

**Adopt additive windowing with a scene and descriptive name per note**

| Field | Value |
|---|---|
| GitHub | #312 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | compat, editor |
| Size | L |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-009](compat.md#sn-ipad-009), [SN-IPAD-010](compat.md#sn-ipad-010) |
| Security controls | `MASVS-AUTH-1`, `MASVS-PRIVACY-2`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
iPadOS 26 windowing rewards apps that open a NEW window per note rather than replacing the current one, and that give each window a descriptive name for the app-menu window list (docs/platform/ipad.md §7). This feature implements additive windowing on the approach chosen by the [SN-IPAD-009](compat.md#sn-ipad-009) spike (native scenes, or the tabbed fallback if scenes are infeasible on Flutter, per L4).

#### Scope
**In:** open a note/notebook in a new window/scene (`UISceneSession`/`UIWindowScene`) with the notebook title as the window name; a menu/gesture to open-in-new-window; per-window editor state; safe teardown; the tabbed in-app fallback if the spike ruled native scenes out.
**Out:** the multi-window feasibility decision ([SN-IPAD-009](compat.md#sn-ipad-009)); Split View/Stage Manager layout adaptation ([SN-IPAD-010](compat.md#sn-ipad-010)).

#### Acceptance criteria
- [ ] "Open in new window" creates a window bound to that note with the notebook title shown in the app-menu window list.
- [ ] Two windows on the same notebook stay consistent (edits in one reflect in the other via the shared document model, no divergence).
- [ ] A note open in a window respects its lock; a second window cannot bypass a note/app lock.
- [ ] If native scenes are infeasible (spike outcome), the tabbed in-app fallback ships instead and the ADR records why.
- [ ] Closing a window does not lose unsaved edits (local-first autosave).

#### Technical notes
Build on the [SN-IPAD-009](compat.md#sn-ipad-009) outcome and ADR-0001/ADR-0003. Native scene lifecycle in Swift/`app/`; shared document model from `sane_core` so windows never fork state. Reference docs/platform/ipad.md §7 additive windowing + external display.

#### Security & privacy
A per-window note MUST honour app/notebook/note locks (MASVS-AUTH/LOCK) — opening in a new window is not an unlock. No content/tokens logged; no content on the window-switcher snapshot for a locked note (privacy blur, MASVS-PRIVACY-2). Scene-activation payloads crossing the platform channel are untrusted input and are validated before use (MASVS-PLATFORM-1).

#### UX notes
Window naming + "Open in new window" affordance per docs/design/screens-and-flows.md and design/Sane Notes.dc.html; render across looks + light/dark. Provide a keyboard/menu path (not gesture-only). Locked notes show a privacy placeholder in the window switcher.

#### Test plan
Widget/unit: `app/test/windowing/additive_window_state_test.dart` (shared model consistency, lock respected). Integration: `app/integration_test/open_in_new_window_test.dart` via `patrol` on iPadOS 26 (or the tabbed fallback path).

#### Dependencies
[SN-IPAD-009](compat.md#sn-ipad-009) multi-window spike; [SN-IPAD-010](compat.md#sn-ipad-010) multitasking layout.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-027

<a id="sn-ipad-027"></a>

**Gate iPadOS 26-only APIs behind runtime availability checks with iPadOS 17 fallbacks**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | compat, devx |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-IPAD-002](input-gestures.md#sn-ipad-002) |
| Security controls | `MASVS-CODE-4`, `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `CWE-754` |
| Extra labels | agent-ready |

#### Context
The iPad surface spans **iPadOS 17.0 (minimum bar) through iPadOS 26**, and several headline capabilities exist only at the top of that range: Foundation Models (`LanguageModelSession`), `SpeechAnalyzer` transcription and Vision `RecognizeDocumentsRequest` need **iPadOS 26 + Apple-Intelligence-capable hardware + a supported region**; the new windowing system is iPadOS 26; Pencil squeeze, `UICanvasFeedbackGenerator` haptics, `ControlWidget` and `UIUpdateLink` are iOS/iPadOS 18; `UITouch.rollAngle` is 17.5+ (docs/platform/ipad.md §1, §3, §7; docs/platform/compatibility-matrix.md §3). docs/platform/ipad.md §1 is explicit: *"On iPadOS 17–25 or non-AI hardware the app MUST degrade gracefully to Vision OCR + no on-device LLM."* Today every feature issue gates itself ad hoc, which is exactly how a Tier 2 device ends up with a dead control or an `unrecognized selector` crash. This task creates one availability service so every gate is declared once, queried as a capability (never sniffed from a version string), and tested.

#### Scope
**In:** a `SaneOsCapabilities` service (Swift side using `if #available` / `@available`, Dart side a typed immutable value object) exposing per-feature booleans — `pencilRoll` (17.5), `pencilSqueeze`, `pencilHaptics`, `controlWidget`, `updateLink` (18), `additiveWindowing`, `foundationModels`, `speechAnalyzer`, `visionDocuments` (26 + AI hardware + region) — plus a documented fallback for each; wiring the gate into the app's feature-flag layer so gated UI is hidden (not disabled-and-silent); a CI smoke run on an iPadOS 17 simulator; a lint/grep gate banning raw OS-version comparisons in feature code.
**Out:** the features themselves (owned by their issues: [SN-IPAD-003](input-gestures.md#sn-ipad-003) squeeze, [SN-IPAD-004](input-gestures.md#sn-ipad-004) roll, [SN-IPAD-006](input-gestures.md#sn-ipad-006) haptics, [SN-IPAD-011](compat.md#sn-ipad-011) windowing, [SN-IPAD-017](notifications.md#sn-ipad-017) ControlWidget, and the ML features in the SN-AI/SN-HWR areas); Pencil hardware capability detection, which is [SN-IPAD-002](input-gestures.md#sn-ipad-002).

#### Acceptance criteria
- [ ] `SaneOsCapabilities` returns a correct per-feature map on iPadOS 17, 18 and 26 builds; each entry has a documented fallback in docs/platform/ipad.md.
- [ ] On an iPadOS 17 device/simulator the app launches, takes a note, and exposes **no dead controls**: every iPadOS-26-only affordance is absent from the UI rather than present-and-inert.
- [ ] On non-AI hardware or an unsupported region, on-device LLM/transcription features are reported unavailable and recognition degrades to Vision OCR (or the documented off state) with a user-readable explanation — never a crash and never a silent cloud call.
- [ ] No feature code reads `Platform.operatingSystemVersion`/`UIDevice.systemVersion` directly: a CI grep/arch-lint rule fails the build on a raw version comparison outside the capability service.
- [ ] Unit tests fake each OS level and assert the resulting capability map and the UI's hidden/shown set.
- [ ] The iPadOS 17 minimum-bar smoke suite runs in CI on every PR that touches `plugins/` or `app/`.

#### Technical notes
Swift implementations live next to each plugin but the single source of truth is one `SaneOsCapabilities` type bridged with Pigeon ([ADR-0012](docs/adr/0012-native-plugin-strategy.md)); the Dart mirror is an immutable value object surfaced through a Riverpod provider ([ADR-0003](docs/adr/0003-state-management-and-app-structure.md)) so widgets read it like any other state. Combine with the *hardware* probe from [SN-IPAD-002](input-gestures.md#sn-ipad-002) — an API can exist while the Pencil cannot drive it. Keep the availability query off the hot draw path (resolve once at startup and on scene activation; CLAUDE.md §8). Mirror the matrix rows in docs/platform/compatibility-matrix.md §3/§6 so the doc and the code cannot drift.

#### Security & privacy
Failing open on an unavailable API is the real risk: an unguarded call site either crashes (denial of service, CWE-754) or silently falls back to a **cloud** path, which would violate locked decision 6 — on-device AI by default, cloud inference only as an explicit per-request opt-in with the data-leaves-device indicator (MASVS-PRIVACY-1). The capability map therefore fails **closed**: unknown ⇒ unavailable ⇒ feature hidden, never "try it and see". Channel payloads are validated on the Dart side before use (MASVS-PLATFORM-1, MASVS-CODE-4). The map contains booleans only — no device identifiers, no region strings beyond an availability flag — and is never logged with identifying detail.

#### UX notes
Gated features disappear cleanly: no greyed ghosts, no "requires iPadOS 26" banners in the main chrome. Where a capability materially changes an outcome (on-device transcription unavailable), Settings shows a single explanatory row using the standard info pattern from docs/design/screens-and-flows.md §12, styled with tokens and rendered in all 17 looks plus light/dark. Screen readers must not announce hidden features; the Settings explanation carries a `Semantics` label, 44 pt targets and ≥ 4.5:1 contrast (docs/design/accessibility.md).

#### Test plan
Unit: `app/test/platform/os_capabilities_test.dart` (faked OS levels ⇒ expected map; unknown ⇒ all false). Widget: `app/test/platform/gated_ui_visibility_test.dart` (gated affordances absent, not disabled). Integration: `app/integration_test/ipados17_smoke_test.dart` via `patrol` on an iPadOS 17 simulator (launch, take a note, no dead controls). CI: a grep rule in the arch-lint script asserting no raw version checks outside `app/lib/platform/`.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) monorepo scaffold; [SN-IPAD-002](input-gestures.md#sn-ipad-002) Pencil hardware capability probe.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-IPAD-029

<a id="sn-ipad-029"></a>

**Validate Apple Pencil capability degradation on Tier 2 iPads each release**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | compat, qa |
| Size | S |
| SDLC | verification |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-002](input-gestures.md#sn-ipad-002), [SN-IPAD-025](perf.md#sn-ipad-025) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
[SN-IPAD-025](perf.md#sn-ipad-025) gates the **Tier 1** iPads (M-series ProMotion iPad Pro + iPad Air with Pencil Pro/Pencil 2) in CI, but docs/platform/ipad.md §1 and docs/platform/compatibility-matrix.md §1/§2 also define a **Tier 2 manual pool** that MUST be smoke-tested every release: the base iPad (10th gen, 60 Hz) with the **USB-C Pencil**, and the iPad mini (A17 Pro) — plus iPadOS 17 as the minimum bar. Tier 2 is where graceful degradation is actually proven: the USB-C Pencil reports **no pressure** (marked *(verify)* in both docs, so the checklist must record what the hardware really does), has no roll, no squeeze and no haptics, and a 60 Hz panel changes the felt latency. The rules the app must honour are in docs/platform/ipad.md §2: brushes requiring pressure MUST fall back to velocity-derived width (the `perfect_freehand` `simulatePressure` path in `sane_ink`), and every extra must be capability-gated, never device-sniffed. This issue creates the repeatable checklist and its recorded results so a Tier 2 regression is caught before users find it.

#### Scope
**In:** a versioned manual smoke checklist in `tools/device_lab/ipad_tier2_checklist.md` covering base iPad + USB-C Pencil, iPad mini, and an iPadOS 17 device/simulator; a results log per release; resolving the two *(verify)* markers on the USB-C Pencil row (pressure and azimuth) in docs/platform/ipad.md §2 and docs/platform/compatibility-matrix.md §4; filing any gap found as a bug with the tier recorded.
**Out:** the automated Tier 1 perf gate ([SN-IPAD-025](perf.md#sn-ipad-025)); the capability probe implementation ([SN-IPAD-002](input-gestures.md#sn-ipad-002)); Android/web tier runs (their areas); the cross-platform device-lab harness (SN-PERF-004).

#### Acceptance criteria
- [ ] The checklist exists, is runnable by someone who has never seen the repo, and covers: launch + take a note, write with the USB-C Pencil, write with a finger, pinch/zoom/two-finger undo, page navigation, PDF scroll, and Settings.
- [ ] With a USB-C Pencil (no pressure), handwriting still varies in width via velocity-derived thinning and is judged legible/natural by the tester — no constant-width "dead" line.
- [ ] Squeeze, barrel-roll, hover and haptics affordances are **absent** on Tier 2 hardware that cannot drive them (capability-gated, per [SN-IPAD-002](input-gestures.md#sn-ipad-002)) — no inert controls.
- [ ] The 60 fps floor holds on the base iPad while writing and while scrolling a 600-page PDF; any measured gap is documented rather than release-blocking (docs/platform/compatibility-matrix.md §1 Tier 2 rule).
- [ ] iPadOS 17 (minimum bar) launches, takes a note, and shows no iPadOS-26-only affordances ([SN-IPAD-027](compat.md#sn-ipad-027)).
- [ ] The USB-C Pencil pressure/azimuth *(verify)* markers are resolved and the docs updated with the measured reality.
- [ ] Results for the current release candidate are recorded in the log with device, OS build, Pencil model and date.

#### Technical notes
Keep the checklist next to the Tier 1 configs in `tools/device_lab` so both tiers are discoverable together; reference the budgets in docs/platform/performance-budgets.md rather than restating numbers. Where a step can be automated later, mark it so — but per docs/platform/ipad.md §11 the Simulator MUST NOT be used as a latency gate, so Tier 2 latency observations stay qualitative unless run on the physical device. Cross-link the result log from docs/platform/compatibility-matrix.md §7 (release gate summary).

#### Security & privacy
None beyond baseline, but the baseline is enforced here too: test notes must contain no real personal data; screenshots/recordings attached to a result log must not include note content or account identifiers; nothing from the draw loop is logged in profile/release builds, and no tokens, cloud paths or PII appear in any captured artefact (CLAUDE.md §7.3, MASVS-PRIVACY-1). Test devices are wiped or use a throwaway profile before hand-off.

#### UX notes
The tester evaluates against the real design: the editor, palette dock and page rail from design/Sane Notes.dc.html and docs/design/screens-and-flows.md §7 must be usable at base-iPad and iPad-mini sizes, in both light and dark, with at least the default look verified and one high-contrast look spot-checked. Accessibility spot-checks are part of the pass: VoiceOver reaches the dock, targets are ≥ 44 pt, and contrast is ≥ 4.5:1 (docs/design/accessibility.md).

#### Test plan
Manual: `tools/device_lab/ipad_tier2_checklist.md` executed per release candidate, results appended to `tools/device_lab/results/ipad-tier2-<version>.md`. Automated support: reuse `app/integration_test/editor_smoke_test.dart` where it can run on the device to shorten the manual pass; `plugins/sane_stylus/example/integration_test/probe_test.dart` run against the USB-C Pencil to capture its real capability envelope.

#### Dependencies
[SN-IPAD-002](input-gestures.md#sn-ipad-002) Pencil capability probe; [SN-IPAD-025](perf.md#sn-ipad-025) Tier 1 iPad perf validation (harness + device lab conventions).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-PHN-001

<a id="sn-phn-001"></a>

**Deliver first-class iPhone and Android phone experiences**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | epic |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | compat, editor, perf |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4` |
| Extra labels | agent-ready, innovation |

#### Context
Phones are a first-class surface (locked decision 1) but a **different job** from tablets: on a phone Riya is capturing (a thought, a photo of the whiteboard, a voice memo), reading/reviewing and lightly editing — she is rarely doing a two-hour handwriting session (docs/platform/phones.md intro). The design principle that governs this whole epic is stated there: *the phone is not a shrunken tablet — it is the same document model and design tokens in a compact, thumb-reachable shell*. One codebase, adaptive layout; the 17 looks, tokens and Sane Sage are identical to tablet.

Two consequences shape everything below. First, **on iPhone there is no stylus at all** — Apple Pencil is iPad-only — so finger writing is the default input and MUST be excellent, not a fallback (phones.md §1, §6). Second, phones are the **memory and thermal floor** of the whole product: the low-end 4 GB / Snapdragon 680-class reference device is where budget B9 (< 300 MB) and B6 (< 2 s cold start) bind hardest (docs/platform/performance-budgets.md §1, docs/platform/compatibility-matrix.md §2). This epic realises docs/platform/phones.md end to end for milestone M5 (docs/roadmap.md M5), together with the PRD-04 §7 OS-integration requirements (PRD-CO-270…277) that make capture reachable without opening the app, and the PRD-01 finger/zoom requirements (PRD-ED-031, PRD-ED-132). Platform API tables, stylus details and store rules are **not** repeated here — they live in docs/platform/ipad.md (Apple) and docs/platform/android.md (Android) and are referenced by the children.

#### Scope
**In:** the compact (phone) window-size-class shell and bottom navigation, the compact palette, finger-first inking and draw/pan disambiguation, zoom-to-write, reading/review mode and its OCR accessibility layer, the quick-capture hub and Quick Notes inbox, camera-scan-first and audio-first capture, widgets/controls/tiles, share targets and file handlers, lock-state and guest-mode hardening of those entry points, S Pen-on-phone, foldable relayout, phone perf/battery hardening, thumb-zone and target-size audit, compact golden + integration tests, and phone store screenshot assets.
**Out:** the shared ink pipeline and native ink surfaces ([SN-INK-001](ink.md#sn-ink-001)), the brush engine ([SN-BRS-001](brushes.md#sn-brs-001)), the cross-platform editor/library/audio/search/sync/crypto logic, Apple-only and Android-only platform plumbing owned by [SN-IPAD-001](input-gestures.md#sn-ipad-001) and [SN-AND-001](compat.md#sn-and-001), and the Web/PWA-on-phone case ([SN-WEB-001](compat.md#sn-web-001), docs/platform/web.md).

#### Acceptance criteria
- [ ] Every child issue below is closed and CI is green.
- [ ] The editor is usable and lag-proof on a phone-sized screen with a finger and with a stylus (roadmap M5 exit criterion): 60 fps floor, no frame > 16.7 ms while writing.
- [ ] All decision-7 budgets hold on the low-end reference device: memory < 300 MB on 4 GB Android, cold start < 2 s mid-Android, 600-page PDF scroll at 60 fps.
- [ ] Foldable fold/unfold and any window-size-class change reflow without losing editor state.
- [ ] Quick capture works in guest mode and fully offline, from every entry point the platform allows.
- [ ] No note content leaves the device; widgets and shortcuts reveal nothing on a locked device.

#### Technical notes
All phone layout branches live in `app/` (composition root, adaptive layouts — docs/architecture/overview.md §4, ADR-0003); shared logic stays in `packages/sane_*` and native extras in `plugins/sane_stylus`, `plugins/sane_ink_surface` (ADR-0012). Children:
- [ ] [SN-PHN-002](compat.md#sn-phn-002) window size classes + adaptive layout resolver
- [ ] [SN-PHN-003](design-system.md#sn-phn-003) compact shell, bottom navigation, push routing
- [ ] [SN-PHN-004](editor.md#sn-phn-004) compact palette dock (six favourites + bottom-sheet toolbox)
- [ ] [SN-PHN-005](ink.md#sn-phn-005) finger-first inking with velocity-derived width
- [ ] [SN-PHN-006](input-gestures.md#sn-phn-006) draw/pan disambiguation
- [ ] [SN-PHN-007](editor.md#sn-phn-007) zoom-to-write magnified writing box
- [ ] [SN-PHN-008](pages-canvas.md#sn-phn-008) phone reading and review mode
- [ ] [SN-PHN-009](a11y.md#sn-phn-009) OCR text layer for VoiceOver/TalkBack
- [ ] [SN-PHN-010](library.md#sn-phn-010) Capture hub and Quick Notes inbox
- [ ] [SN-PHN-011](images-media.md#sn-phn-011) camera scan-first capture
- [ ] [SN-PHN-012](audio.md#sn-phn-012) audio-first lecture capture mode
- [ ] [SN-PHN-013](notifications.md#sn-phn-013) widgets, controls and Quick Settings tiles
- [ ] [SN-PHN-014](notifications.md#sn-phn-014) share targets, app shortcuts and file handlers
- [ ] [SN-PHN-015](security.md#sn-phn-015) lock-state and guest-mode hardening of capture entry points
- [ ] [SN-PHN-016](input-gestures.md#sn-phn-016) S Pen single-click capture on phones
- [ ] [SN-PHN-017](compat.md#sn-phn-017) foldable and window-class state preservation
- [ ] [SN-PHN-018](perf.md#sn-phn-018) phone memory, cold start and battery hardening
- [ ] [SN-PHN-019](a11y.md#sn-phn-019) thumb-zone and touch-target audit
- [ ] [SN-PHN-020](qa.md#sn-phn-020) compact-layout golden tests
- [ ] [SN-PHN-021](qa.md#sn-phn-021) patrol integration tests for capture entry points
- [ ] [SN-PHN-022](release.md#sn-phn-022) phone store screenshots and listing assets

#### Security & privacy
The phone adds three trust boundaries the tablet does not stress: OS-owned surfaces that render app data outside the app (widgets, Control Center, Quick Settings), inbound untrusted content (share targets, file handlers, camera), and a device far likelier to be lost or shoulder-surfed. Threats: T1 content disclosure on a locked screen (STRIDE information disclosure) — control: widgets render only non-content metadata and honour lock/guest state (PRD-CO-277) — MASVS-PLATFORM-3, MASVS-PRIVACY-2. T2 hostile inbound file via share sheet/intent — control: validate MIME/size/schema, parse off the UI isolate, resource-cap, import into a new isolated notebook (CLAUDE.md §7.8) — MASVS-PLATFORM-2, MASVS-CODE-4, OWASP-A03, CWE-434, CWE-20. T3 intent redirection / unverified deep link — control: verified App Links and Universal Links only, links land in view/confirm, never auto-mutate — MASVS-PLATFORM-1, CWE-926. T4 leakage through logs on a shared device — control: SaneLog redaction allow-list, `print()` banned, nothing from the draw loop logged in profile/release — MASVS-PRIVACY-1, MASVS-STORAGE-2. Baseline for every child: no note content or tokens logged, no new network egress without an ADR + threat-model row (CLAUDE.md §7.4).

#### UX notes
The phone reuses the exact screens of design/Sane Notes.dc.html (Library, Editor, Search, Settings, Profiles, Onboarding) in a compact branch: the 248 px sidebar becomes a bottom navigation bar, the two-pane list+detail becomes push navigation, popovers become bottom sheets (phones.md §2–§3, docs/design/ux-principles.md §8). Chrome must still read correctly in **all 17 looks and both light and dark** — this is a layout reflow, not a redesign, so components come from `sane_ui` and never hardcode colour, radius or spacing (CLAUDE.md §9). Accessibility is part of the definition of the surface, not an afterthought: ≥ 44×44 pt (iOS) / 48×48 dp (Android) targets, `Semantics` labels on all chrome, contrast ≥ 4.5:1, Dynamic Type honoured, and every hover affordance replaced by tap/long-press because phones have no hover (phones.md §7, docs/design/accessibility.md).

#### Test plan
Each child names its own tests. Epic-level gates: `app/integration_test/phone_capture_flows_test.dart` (capture entry points end to end), `app/integration_test/phone_editor_latency_test.dart` (finger-ink frame budget), `app/test/shell/window_size_class_test.dart`, golden suites under `app/test/golden/phone/` across the 17 looks in light and dark, and `tools/perf_harness` runs on the iPhone-ref, mid-Android and Android-lowend devices in `tools/device_lab`.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold). Children additionally depend on the ink, editor, library, audio, PDF, recognition and design-system epics as listed in each issue.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-002

<a id="sn-phn-002"></a>

**Define window size classes and the adaptive layout resolver**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | compat, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-CODE-2` |
| Extra labels | agent-ready |

#### Context
Every phone behaviour in this epic keys off one question: *which window size class am I in?* docs/design/ux-principles.md §8 is explicit that the layout adapts to **window size class, not device identity** — a phone, a small window on a desktop, and a folded foldable all resolve to the same compact layout. The design canvas itself only carries a single coarse breakpoint (`narrow` when width < 900 px, which collapses the 248 px sidebar to a 68 px icon rail and hides the page rail and subjects list — docs/design/screens-and-flows.md §0). That is not enough for phones: docs/platform/phones.md §2 requires a genuinely single-pane stacked flow below 600 dp, and docs/platform/android.md §7 pins the Android breakpoints at 600/840/1200/1600 dp with `currentWindowAdaptiveInfo().windowSizeClass` as the platform source of truth.

This task introduces one shared, testable resolver in `app/` that maps the current window metrics to a class, exposes it as a Riverpod provider, and lets every screen branch on it instead of re-deriving pixel maths. It is deliberately small and lands first because [SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-004](editor.md#sn-phn-004), [SN-PHN-008](pages-canvas.md#sn-phn-008) and [SN-PHN-017](compat.md#sn-phn-017) all consume it, and because [SN-IPAD-001](input-gestures.md#sn-ipad-001), [SN-AND-001](compat.md#sn-and-001) and [SN-WEB-001](compat.md#sn-web-001) need the same abstraction for windowing, foldables and browser resizing.

#### Scope
**In:** the `SaneWindowSizeClass` enum (compact / medium / expanded / large / extraLarge), the resolver that derives it from `MediaQuery` size, display features and text scale, the Riverpod provider and a `SaneAdaptive` helper widget for declarative branching, the retained `narrow` (< 900 px) flag for the sidebar collapse the design specifies, and unit tests over the full breakpoint table.
**Out:** the actual compact screens ([SN-PHN-003](design-system.md#sn-phn-003) and later), hinge/fold geometry handling and state preservation ([SN-PHN-017](compat.md#sn-phn-017)), and any change to the fixed page geometry (a page is 800×1040 units at max 820 px wide; freeform is 2400×2400 — these never change with window size, ux-principles.md §8).

#### Acceptance criteria
- [ ] `SaneWindowSizeClass.of(context)` returns compact < 600 dp, medium 600–839 dp, expanded 840–1199 dp, large 1200–1599 dp, extraLarge >= 1600 dp, matching docs/platform/android.md §7 and ux-principles.md §8.
- [ ] The legacy design flag `narrow` (width < 900 px) is exposed separately and still drives the 248 px → 68 px sidebar collapse, so no existing screen regresses.
- [ ] The class is derived from the **window**, not the physical display: a 420 dp-wide multitasking window on an iPad resolves to compact.
- [ ] Changing the class at runtime rebuilds dependent widgets within one frame and never throws; a resize sweep from 320 dp to 1600 dp produces a monotonic, gap-free class sequence.
- [ ] A height class is exposed too (compact height < 480 dp) so landscape phones can shorten chrome instead of clipping it.
- [ ] Layouts remain usable at 320 CSS px wide with no two-dimensional scroll (WCAG 1.4.10, PRD-CO-313) and at 200% text scale.
- [ ] The resolver is pure and unit-testable with no platform channel calls, and adds < 0.1 ms per resolve (measured in the widget test).

#### Technical notes
Add `app/lib/shell/window_size_class.dart` (enum + resolver + `windowSizeClassProvider`) and `app/lib/shell/sane_adaptive.dart` (a `StatelessWidget` taking `compact`/`medium`/`expanded` builders). Derive from `MediaQuery.sizeOf(context)` and `MediaQuery.of(context).displayFeatures`; do **not** call `Platform.isAndroid` — capability/geometry query, never platform check (CLAUDE.md §8, ADR-0012). Keep it in `app/` because `sane_ui` is a leaf design-system package that must not own shell logic (docs/architecture/overview.md §5). Provider wiring follows ADR-0003 (Riverpod + go_router); no mutable global singletons. Dart 3 sealed/enum switch with exhaustive matching so a new class is a compile error at every branch. Text scale participates in the resolve only through the height class (very large Dynamic Type on a short landscape phone), per PRD-CO-333.

#### Security & privacy
None beyond baseline. Baseline still applies: no note content, ink coordinates, identifiers or tokens are logged by the resolver (CLAUDE.md §7.3); `print()` is banned and only `SaneLog` is used, and the resolver logs nothing at all on the hot path. The exhaustive-switch requirement is a MASVS-CODE-2 (no unsafe defaults / no silent fallbacks) control: an unhandled class must fail the build, not silently render a tablet layout on a phone.

#### UX notes
The class map is the contract behind every screen in docs/design/screens-and-flows.md: Compact = single pane, sidebar becomes bottom navigation or a drawer, Library is a 1–2 column grid, Editor is full-bleed with the page rail hidden and the palette docked bottom; Medium = 68 px rail, 2–3 columns; Expanded = full 248 px sidebar, 3–4 columns, page rail visible (the mockup reference frame is 1180×820 iPad landscape). No visual tokens are introduced by this task — everything continues to come from docs/design/tokens.json via `sane_ui`, so all 17 looks and dark mode are unaffected by construction. a11y: because the class governs whether chrome stacks, verify at 200% Dynamic Type and 320 px width that no control is clipped and focus order stays logical.

#### Test plan
- `app/test/shell/window_size_class_test.dart` — table-driven unit tests over the boundary widths (319/320/599/600/839/840/1199/1200/1599/1600 dp), height classes, and the `narrow` flag.
- `app/test/shell/sane_adaptive_test.dart` — widget test that resizing a `MediaQuery` wrapper swaps builders exactly once per boundary crossing.
- `app/test/shell/window_size_class_reflow_test.dart` — asserts no horizontal overflow at 320 px with `textScaler` 2.0.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002), [SN-DS-002](design-system.md#sn-ds-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-017

<a id="sn-phn-017"></a>

**Preserve editor state across foldable and window-size-class changes**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-phone, ios-phone |
| Areas | compat, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-002](compat.md#sn-phn-002), [SN-PHN-003](design-system.md#sn-phn-003), [SN-ED-003](editor.md#sn-ed-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
On a foldable the cover display is Compact (phone layout) and unfolding crosses into Medium/Expanded, which MUST re-lay-out to the tablet two-pane **without losing editor state** — a runtime window-size-class change, with the fold seam and hinge occlusion to test (docs/platform/phones.md §7, limitation **P5**: state loss or broken layout). docs/platform/android.md §7 adds that API 36 brings forced resizability for sw >= 600 dp and that window size classes are the mechanism; docs/roadmap.md makes 'foldable fold/unfold and window-class changes reflow without state loss' an M5 exit criterion.

The same machinery covers three cases that look different to a user but are identical to the app: folding/unfolding, rotating, and resizing a multitasking window. Getting it right is what stops the most infuriating bug class in note apps — losing an in-progress page because the device changed shape.

#### Scope
**In:** preserving editor state (open notebook and page, viewport pan/zoom, active tool and colour, selection, undo/redo stacks, in-progress text edit, audio recorder state, scroll position in reading mode) across window-size-class changes; hinge/display-feature awareness so content and the palette avoid the fold seam; the reflow from single-pane to two-pane and back; and an automated state-round-trip test harness.
**Out:** the size-class resolver ([SN-PHN-002](compat.md#sn-phn-002)), the compact shell ([SN-PHN-003](design-system.md#sn-phn-003)), the undo model itself ([SN-ED-003](editor.md#sn-ed-003)), Android tablet multi-window specifics ([SN-AND-001](compat.md#sn-and-001)), and iPadOS windowing ([SN-IPAD-001](input-gestures.md#sn-ipad-001)).

#### Acceptance criteria
- [ ] Folding and unfolding a foldable preserves: open notebook and page index, viewport pan and zoom, active tool, colour and width, lasso selection, undo and redo stacks, an in-progress text-box edit, and reading-mode scroll position.
- [ ] An **in-progress stroke** at the moment of a size-class change is either completed and committed or cleanly cancelled — never left as a partial artefact, and never silently dropped after being visible for more than one frame.
- [ ] The same guarantees hold for rotation and for a multitasking window resize, verified by the same test harness.
- [ ] The reflow completes within 500 ms and drops no more than one frame on the Tier-2 foldable reference device.
- [ ] `MediaQuery.displayFeatures` is honoured: the palette dock, bottom sheets and the page do not sit under the hinge, and a two-pane layout uses the fold as a natural separator where one exists.
- [ ] Table-top (half-folded) posture does not break layout: content stays in the upper half and controls in the lower where the posture is reported.
- [ ] No state is persisted to disk purely to survive a reflow — state is held in memory through the rebuild — so a reflow never writes plaintext or extra encrypted rows.
- [ ] Audio recording continues uninterrupted across a fold/unfold.
- [ ] The reflowed layouts render correctly in all 17 looks and dark mode, at both classes.

#### Technical notes
State lives in Riverpod providers scoped **above** the layout branch so a class change rebuilds widgets but not state (ADR-0003); the bug class this prevents is a provider created inside a branch that is destroyed on reflow. Add `app/lib/shell/adaptive_reflow.dart` with a `ReflowScope` that records the last known editor state and re-applies viewport geometry after the new layout settles (viewport is expressed in page units, not pixels, so it survives a size change — page geometry is fixed at 800×1040 units per docs/design/ux-principles.md §8). Read hinge geometry from `MediaQuery.of(context).displayFeatures` and expose a `foldSeamProvider`; do not call Android window-manager APIs directly from `app/`. In-progress stroke handling reuses the cancel path from [SN-PHN-006](input-gestures.md#sn-phn-006). Undo/redo stacks come from [SN-ED-003](editor.md#sn-ed-003) and must not be re-instantiated on reflow. Test using `tester.view.physicalSize`/`displayFeatures` overrides so the whole thing is verifiable in widget tests rather than only on hardware.

#### Security & privacy
None beyond baseline, with one specific control worth naming: **T-REFLOW-SPILL** — a naive implementation serialises editor state (which contains note content and ink) to disk or to platform saved-instance-state to survive a configuration change; on Android, saved instance state is written by the framework and is not covered by the app's own encryption. Control: keep reflow state in memory only; if any persistence is unavoidable it MUST go through the normal `sane_core` + `sane_crypto` path, never `onSaveInstanceState`/`NSUserActivity` payloads (CLAUDE.md §7.1; MASVS-STORAGE-1, MASVS-STORAGE-2, CWE-312, CWE-922). Baseline: no note content, ink coordinates or ids in logs (MASVS-PRIVACY-1, CWE-532); no new network egress; no new permission.

#### UX notes
The two layouts are already specified: Compact is single-pane with the palette docked bottom and the page rail hidden; Medium/Expanded restores the 68 px or 248 px sidebar, the page rail and the subjects list (docs/design/ux-principles.md §8, docs/design/screens-and-flows.md §0). The transition should feel like the app simply *is* the new shape — no flash of empty state, no scroll jump, no toast. Motion: a cross-fade is preferable to a slide; under Reduce Motion the reflow is instantaneous (ux-principles.md §6). Left-handed mode must survive the reflow and keep the page rail on the left (screens §7.7). a11y: focus is restored to the element that had it before the reflow, screen-reader focus is not dumped to the top of the tree, and an announcement states the new layout ('Two-pane layout') only when a screen reader is active.

#### Test plan
- `app/test/shell/adaptive_reflow_test.dart` — state round-trip across a simulated compact→expanded→compact sequence for every field listed in the acceptance criteria.
- `app/test/shell/fold_seam_test.dart` — `displayFeatures` overrides assert the palette, sheets and page avoid the hinge; table-top posture layout.
- `app/test/editor/reflow_stroke_cancel_test.dart` — an in-progress stroke is committed or cancelled, never partial (negative test).
- `app/test/shell/reflow_focus_test.dart` — focus and screen-reader focus restoration.
- `app/integration_test/foldable_reflow_test.dart` — patrol run on a foldable profile including a fold during an active audio recording.
- `app/test/golden/phone/reflow_golden_test.dart` — goldens at both classes per look family, light and dark.

#### Dependencies
[SN-PHN-002](compat.md#sn-phn-002), [SN-PHN-003](design-system.md#sn-phn-003), [SN-ED-003](editor.md#sn-ed-003)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-001

<a id="sn-web-001"></a>

**Deliver the Web/PWA surface: renderer, ink, storage, PWA, hardening**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | epic |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | compat, perf, storage |
| Size | XL |
| SDLC | design |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-STORAGE-1`, `MASVS-NETWORK-1`, `MASVS-PRIVACY-1`, `ASVS-V3`, `OWASP-A05` |
| Extra labels | agent-ready |

#### Context
Web (PWA) is one of the five first-class surfaces (locked decision 1) and the **most constrained** one: Flutter renders through CanvasKit or skwasm with no Impeller, text and accessibility are painted rather than DOM, browser storage is evictable, and the low-latency ink levers (Ink API, `desynchronized` canvas, coalesced events) are owned by the Flutter engine rather than app code. `docs/adr/0010-web-pwa-strategy.md` locks the strategy: ship a Flutter Web PWA positioned as **"view + light-edit + quick capture"**, steer heavy inking to the installed apps, and still meet **≤ 30 ms pen-to-pixel on Chrome desktop** (budget B3) and **< 3 s cached cold start** (budget B6, `docs/platform/performance-budgets.md`). `docs/platform/web.md` is the authoritative capability map; `docs/platform/compatibility-matrix.md` §3 fixes the browser floor (Chrome/Edge 120+, Safari 17+, Firefox 125+, Samsung Internet) and makes Chrome desktop the only Tier 1 web slot. This epic tracks every web-specific work item: build and bundle, the Pointer-Events ink path, OPFS/SQLite-WASM persistence and eviction defence, PWA plumbing, security headers, identity and user-cloud sync on web, accessibility and keyboard-first operation, the browser matrix, and the "try it on the web" acquisition flow (`PRD-CO-412`).

#### Scope
**In:** everything under `web/` and the web implementations of `plugins/*`, the web build/deploy pipeline, browser-specific behaviour, and the web-only compromises recorded in ADR-0010 (renderer fallback, reduced at-rest key posture, no on-device ML Kit).
**Out:** shared model/ink/render logic ([SN-CORE-001](storage.md#sn-core-001), [SN-INK-001](ink.md#sn-ink-001), [SN-ED-001](editor.md#sn-ed-001)), the marketing site itself (website area), native iPad/Android surfaces ([SN-IPAD-001](input-gestures.md#sn-ipad-001), [SN-AND-001](compat.md#sn-and-001)), and phone-sized layout rules which live with the phones surface.

#### Acceptance criteria
- [ ] Every child issue below is closed and its acceptance criteria hold on Chrome desktop (Tier 1).
- [ ] The web build runs on Chrome/Edge 120+, Safari 17+ (iPadOS and macOS), Firefox 125+ and Samsung Internet, with automatic JS/CanvasKit fallback where WasmGC is absent.
- [ ] B3 ≤ 30 ms pen-to-pixel and ≥ 60 fps hold on Chrome desktop; B6 cached cold start < 3 s; Lighthouse PWA checks pass.
- [ ] A note written offline in a browser survives reload, install, and a simulated eviction when a cloud durable copy exists; the user is warned when it does not.
- [ ] CSP (nonce + `strict-dynamic` + `wasm-unsafe-eval`), Trusted Types, COOP/COEP, SRI and the baseline headers are served and verified by an automated check.
- [ ] WCAG 2.2 AA holds for web chrome with a real screen reader; the app is fully keyboard-operable.

#### Technical notes
Children: [SN-WEB-002](compat.md#sn-web-002) [SN-WEB-003](perf.md#sn-web-003) [SN-WEB-004](ink.md#sn-web-004) [SN-WEB-005](ink.md#sn-web-005) [SN-WEB-006](input-gestures.md#sn-web-006) [SN-WEB-007](ink.md#sn-web-007) [SN-WEB-008](storage.md#sn-web-008) [SN-WEB-009](storage.md#sn-web-009) [SN-WEB-010](compat.md#sn-web-010) [SN-WEB-011](compat.md#sn-web-011) [SN-WEB-012](sharing-export.md#sn-web-012) [SN-WEB-013](sharing-export.md#sn-web-013) [SN-WEB-014](security.md#sn-web-014) [SN-WEB-015](security.md#sn-web-015) [SN-WEB-016](security.md#sn-web-016) [SN-WEB-017](ci-cd.md#sn-web-017) [SN-WEB-018](auth.md#sn-web-018) [SN-WEB-019](sync.md#sn-web-019) [SN-WEB-020](a11y.md#sn-web-020) [SN-WEB-021](a11y.md#sn-web-021) [SN-WEB-022](onboarding.md#sn-web-022) [SN-WEB-023](qa.md#sn-web-023) [SN-WEB-024](perf.md#sn-web-024) [SN-WEB-025](ocr-hwr.md#sn-web-025) [SN-WEB-026](audio.md#sn-web-026) [SN-WEB-027](audio.md#sn-web-027) [SN-WEB-028](pdf.md#sn-web-028) [SN-WEB-029](sharing-export.md#sn-web-029) [SN-WEB-030](text.md#sn-web-030) [SN-WEB-031](security.md#sn-web-031) [SN-WEB-032](storage.md#sn-web-032).

- [ ] [SN-WEB-002](compat.md#sn-web-002) dual CanvasKit/skwasm build with runtime fallback
- [ ] [SN-WEB-003](perf.md#sn-web-003) bundle-size + cached cold-start CI gate
- [ ] [SN-WEB-004](ink.md#sn-web-004) Pointer Events → `sane_ink` capture path
- [ ] [SN-WEB-005](ink.md#sn-web-005) Chromium wet-ink fast path (Ink API / desynchronized canvas)
- [ ] [SN-WEB-006](input-gestures.md#sn-web-006) palm rejection and `touch-action` handling
- [ ] [SN-WEB-007](ink.md#sn-web-007) Apple Pencil on Safari iPadOS
- [ ] [SN-WEB-008](storage.md#sn-web-008) OPFS + SQLite-WASM (drift) persistence in a Worker
- [ ] [SN-WEB-009](storage.md#sn-web-009) durability: `persist()`, `estimate()`, eviction warnings
- [ ] [SN-WEB-010](compat.md#sn-web-010) Web App Manifest + install experience
- [ ] [SN-WEB-011](compat.md#sn-web-011) service worker: precache, runtime caching, update flow
- [ ] [SN-WEB-012](sharing-export.md#sn-web-012) file handlers, share target, shortcuts, badging
- [ ] [SN-WEB-013](sharing-export.md#sn-web-013) File System Access open/save with fallback
- [ ] [SN-WEB-014](security.md#sn-web-014) nonce-based CSP + Trusted Types
- [ ] [SN-WEB-015](security.md#sn-web-015) COOP/COEP cross-origin isolation
- [ ] [SN-WEB-016](security.md#sn-web-016) SRI + baseline security headers
- [ ] [SN-WEB-017](ci-cd.md#sn-web-017) hosting/CDN on an isolated origin
- [ ] [SN-WEB-018](auth.md#sn-web-018) Google/Microsoft/Apple sign-in + passkeys on web
- [ ] [SN-WEB-019](sync.md#sn-web-019) Google Drive (and OneDrive) sync on web
- [ ] [SN-WEB-020](a11y.md#sn-web-020) keyboard-first navigation and shortcut map
- [ ] [SN-WEB-021](a11y.md#sn-web-021) hand-authored canvas semantics + OCR alt-text
- [ ] [SN-WEB-022](onboarding.md#sn-web-022) "try it now" guest flow
- [ ] [SN-WEB-023](qa.md#sn-web-023) cross-browser test harness and matrix runs
- [ ] [SN-WEB-024](perf.md#sn-web-024) Lighthouse + web perf/ink CI budgets
- [ ] [SN-WEB-025](ocr-hwr.md#sn-web-025) web handwriting-recognition path
- [ ] [SN-WEB-026](audio.md#sn-web-026) MediaRecorder/Opus audio capture backend
- [ ] [SN-WEB-027](audio.md#sn-web-027) whisper.cpp WASM offline transcription
- [ ] [SN-WEB-028](pdf.md#sn-web-028) pdf.js/PDFium-WASM render path
- [ ] [SN-WEB-029](sharing-export.md#sn-web-029) Async Clipboard + Web Share
- [ ] [SN-WEB-030](text.md#sn-web-030) SPIKE: DOM text overlay for IME/Scribble/selection
- [ ] [SN-WEB-031](security.md#sn-web-031) reduced web at-rest key posture
- [ ] [SN-WEB-032](storage.md#sn-web-032) storage-eviction recovery verification

Ownership map: `web/` (index, manifest, bootstrap, service worker), `app/lib/platform/web/`, the `web` implementations under `plugins/sane_ink_surface`, `plugins/sane_secure_store`, `plugins/sane_cloud_drive`, `plugins/sane_pdfkit`, plus `tools/perf_harness` web mode. ADRs: 0010 (web/PWA), 0001 (single codebase + native-pivot exit criterion), 0008 (ink tiers), 0012 (federated plugins), 0004 (local-first, zero server).

#### Security & privacy
The browser is the weakest trust environment we ship into: no hardware keystore, DOM-XSS surface, evictable storage, third-party cookie/embedding risk. Controls tracked by this epic: strict nonce CSP + Trusted Types (OWASP-A03, CWE-79), cross-origin isolation and framing/opener protection (ASVS-V3, CWE-1021), HTTPS-only secure context and HSTS (MASVS-NETWORK-1, CWE-319), ciphertext-only egress to the user's own cloud (MASVS-STORAGE-1, MASVS-CRYPTO-2), no note content or tokens in `SaneLog`/console (CWE-532, MASVS-PRIVACY-1), and the documented weaker web key posture ([SN-WEB-031](security.md#sn-web-031), MASVS-PRIVACY-3). Threat-model rows TM-I-06 (DOM-XSS), TM-I-01 (cloud plaintext), TM-D-01 (hostile file), TM-P-06 (silent egress) apply.

#### UX notes
Web reuses the same screens as every surface — Login, Profiles, Onboarding, Library, Editor (top toolbar, canvas, palette dock, page rail, focus mode), Templates, Import PDF, Share, Search, Settings — per `design/Sane Notes.dc.html` and `docs/design/screens-and-flows.md` §2–§13, rendered through `sane_ui` tokens so all **17 looks in light and dark** are identical to native. Web adds: an install affordance, an offline indicator, a storage-durability banner, and a visible focus ring on every interactive control. Accessibility is a gate, not a polish item: `Semantics` labels on all chrome, 44 px minimum hit targets, ≥ 4.5:1 contrast, full keyboard reachability (`PRD-CO-310`–`PRD-CO-321`, `PRD-CO-417`).

#### Test plan
Epic-level verification: `app/integration_test/web/` suites owned by the children, `tools/perf_harness` web mode for B3/B6, the browser-matrix job from [SN-WEB-023](qa.md#sn-web-023), the Lighthouse job from [SN-WEB-024](perf.md#sn-web-024), and a manual Tier 2 pass (Safari iPadOS, Safari macOS, Firefox, Edge, Samsung Internet) recorded in `tools/device_lab/web-matrix.md`.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002), [SN-FND-003](ci-cd.md#sn-fnd-003); the tier decision from [SN-INK-009](ink.md#sn-ink-009) informs [SN-WEB-005](ink.md#sn-web-005).

#### Definition of done
- [ ] All child issues closed; CI green (lint, analyze, unit, security scans)
- [ ] ADR-0010 updated with anything the implementation changed (renderer, key posture, recognition path)
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2

---

### SN-WEB-002

<a id="sn-web-002"></a>

**Implement dual CanvasKit/skwasm Flutter web build with runtime fallback**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | compat, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `MASVS-CODE-1`, `MASVS-CODE-2`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
Flutter Web renders only through Skia-on-WASM — the legacy HTML/DOM renderer was removed — so there are exactly two paths (`docs/platform/web.md` §2). **CanvasKit** (~1.5 MB WASM) paints on the main thread, needs nothing special, and is the only path available in any iOS/iPadOS browser because every one of them is WebKit and WebKit has no WasmGC. **skwasm** (~1.1 MB) can offload paint to a Web Worker but requires **WasmGC plus cross-origin isolation**. `flutter build web --wasm` (Flutter 3.24+) emits both and selects at runtime, which is what lets one build serve Chrome desktop and iPad Safari without a second artifact. This issue stands that build up and proves the fallback actually engages, implementing decision 1 of `docs/adr/0010-web-pwa-strategy.md` and the renderer column of `docs/platform/compatibility-matrix.md` §3.

#### Scope
**In:** the `web/` entry point and `flutter_bootstrap.js`, wiring `--wasm` into the dev/beta/release flavour matrix ([SN-FND-005](devx.md#sn-fnd-005)), pinning the Flutter stable channel version in CI, exposing the selected renderer in a redacted runtime diagnostic, and documenting the iOS-never-skwasm reality in code comments plus `docs/platform/web.md`.
**Out:** serving COOP/COEP headers ([SN-WEB-015](security.md#sn-web-015)), the bundle budget gate ([SN-WEB-003](perf.md#sn-web-003)), the service-worker caching strategy ([SN-WEB-011](compat.md#sn-web-011)), and any ink work ([SN-WEB-004](ink.md#sn-web-004)).

#### Acceptance criteria
- [ ] `flutter build web --wasm` produces both the skwasm/WASM and the JS/CanvasKit artifact sets in one output directory, for all three flavours.
- [ ] On Chrome/Edge 120+ served with COOP/COEP, `self.crossOriginIsolated === true` and the app reports renderer `skwasm`; paint work appears on a Worker thread in a performance profile.
- [ ] On Safari 17+ (iPadOS and macOS) and on any browser without WasmGC, the app silently falls back to JS/CanvasKit, boots, and can create and save a note — no error dialog, no blank canvas.
- [ ] On Firefox 125+ the app runs (CanvasKit accepted; skwasm treated as unverified per `docs/platform/web.md` §2).
- [ ] The active renderer, WasmGC availability and `crossOriginIsolated` are recorded once at startup through `SaneLog` at info level with no PII, and surfaced in Settings → about/diagnostics.
- [ ] First paint on a cold, uncached load is measured and reported in the build log (not gated — B6 gates the cached case only).

#### Technical notes
Touch `web/index.html`, `web/flutter_bootstrap.js`, `app/lib/platform/web/renderer_info.dart`, and the flavour definitions from [SN-FND-005](devx.md#sn-fnd-005) (`--dart-define` only; never a committed secret). Do **not** hand-force a renderer with a query flag in production — rely on the emitted dual build's runtime selection so one URL serves every browser. Detect capability rather than user-agent: probe `WebAssembly` GC support and `self.crossOriginIsolated`. Pin the Flutter version in `.github/workflows` and in `tools/` scripts so a channel bump cannot silently change renderer behaviour (MASVS-CODE-1). Note in the code that Impeller does not exist on web and that Skia Graphite/WebGPU is the future unifier with no timeline (ADR-0010 decision 7). Implements `PRD-CO-412` (the trial runs the real web PWA) and the renderer rows of `docs/platform/compatibility-matrix.md` §3.

#### Security & privacy
Threats: a stale or unpinned engine shipping known WASM/Skia vulnerabilities (MASVS-CODE-1, CWE-1104), build-time configuration leaking a secret into a world-readable JS bundle (CWE-798), and a diagnostic that logs identifying browser fingerprint data (MASVS-PRIVACY-1, CWE-532). Controls: pin the Flutter SDK and all web dependencies with lockfiles; take configuration exclusively from `--dart-define`/CI secrets (secure-coding checklist §0.1); the renderer diagnostic logs only an enum plus two booleans — never user agent strings, note content or ids. No new network egress is introduced by this issue (checklist §8).

#### UX notes
There is no new chrome, but rendering **must** be pixel-identical between CanvasKit and skwasm across all **17 looks in light and dark** — a renderer difference in gradients, blend modes or text shaping is a visible regression on the Editor and Library screens (`design/Sane Notes.dc.html`, `docs/design/design-system.md`). Golden-test a representative canvas so a divergence is caught rather than shipped. The boot experience must show the branded loading state from `docs/design/screens-and-flows.md` §0 rather than a white flash, and must respect `prefers-reduced-motion`. Diagnostics text in Settings is screen-reader labelled and keyboard reachable.

#### Test plan
- `app/integration_test/web/renderer_fallback_test.dart` — headless Chromium asserts renderer selection and a note round-trip; a second run without isolation headers asserts the CanvasKit path.
- `app/test/web/renderer_info_test.dart` — unit tests for the capability probe and the redacted log payload.
- `app/test/web/renderer_golden_test.dart` — golden parity for a sample ink + text canvas in two looks, light and dark.
- Manual: Safari iPadOS 17, Safari macOS, Firefox 125, Samsung Internet, per `docs/platform/web.md` §12.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002), [SN-FND-005](devx.md#sn-fnd-005); informed by [SN-INK-009](ink.md#sn-ink-009).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-010

<a id="sn-web-010"></a>

**Add the Web App Manifest and installable PWA experience**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | compat, onboarding |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-002](compat.md#sn-web-002), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `CWE-1021` |
| Extra labels | agent-ready |

#### Context
Install is what turns the web build from a demo into a usable notebook: an installed PWA gets heuristic storage persistence (directly reducing the eviction risk in [SN-WEB-009](storage.md#sn-web-009)), a real app icon, standalone chrome, badging, and on iOS 16.4+ the only route to push (`docs/platform/web.md` §5). The manifest is also a release gate — `docs/platform/web.md` §8 requires a valid manifest with name, icons, `display: standalone`, `start_url` and `scope` plus a registered service worker and an offline fallback, and `PRD-CO-413` requires the web trial to be installable. iOS has no install prompt at all (manual Add to Home Screen), so the install affordance must be honest per browser rather than assuming `beforeinstallprompt`.

#### Scope
**In:** `web/manifest.json` with the full icon set (including maskable and monochrome), theme/background colours from tokens, `display`, `start_url`, `scope`, `launch_handler`, `categories`, `description` and screenshots; a Dart-side install controller handling `beforeinstallprompt` on Chromium and showing platform-appropriate instructions elsewhere; post-install re-probe of storage persistence; standalone-mode layout handling (safe areas, no browser chrome).
**Out:** the service worker itself ([SN-WEB-011](compat.md#sn-web-011)), file handlers/share target/badging ([SN-WEB-012](sharing-export.md#sn-web-012)), Lighthouse gating ([SN-WEB-024](perf.md#sn-web-024)), and the marketing "install" page.

#### Acceptance criteria
- [ ] The manifest validates and the app is installable on Chrome/Edge desktop, Chrome Android and Samsung Internet; installing produces a standalone window with the correct name, icon and theme colour.
- [ ] On Safari (macOS and iPadOS) the app offers **Add to Home Screen / Add to Dock** guidance instead of a fake prompt, with correct `apple-touch-icon` handling; nothing is shown that the browser cannot deliver.
- [ ] Theme and background colours come from `docs/design/tokens.json` and match the active look; dark mode uses the dark token set.
- [ ] After install, `navigator.storage.persisted()` is re-checked and the durability state from [SN-WEB-009](storage.md#sn-web-009) updates without a reload.
- [ ] In standalone mode the layout honours safe-area insets, the window-controls area, and the Compact/Medium/Expanded window classes from `docs/platform/compatibility-matrix.md` §5 with no state loss on resize.
- [ ] `start_url` and `scope` are locked to the app origin path; a request outside scope opens in the browser, not the installed window.
- [ ] The install affordance never nags: it is shown at most once per session and is dismissible permanently.

#### Technical notes
Author the manifest by hand under `web/` (do not let a tool regenerate it on build) and reference icons produced by the brand pipeline ([SN-BRD-001](brand.md#sn-brd-001)) — note that mascot placeholders are **not releasable** (CLAUDE.md §9), so track that as a release blocker, not a reason to skip the work. Install logic belongs in `app/lib/platform/web/install_controller.dart` with a Riverpod provider; capability-detect `beforeinstallprompt` rather than sniffing. `launch_handler`/`client_mode` chooses focus-existing over new-window (`docs/platform/web.md` §5). Implements `PRD-CO-413` and supports `PRD-CO-412`; relates to ADR-0010 decision 4 (all PWA features are progressive enhancements behind feature detection).

#### Security & privacy
Threats: an over-broad `scope` letting unrelated origin paths (docs, marketing) run inside app-privileged context (CWE-1021, ASVS-V3); an installed app being framed or opened by a hostile opener (COOP, [SN-WEB-015](security.md#sn-web-015)); an install funnel that collects identifiers (MASVS-PRIVACY-1). Controls: `scope` restricted to the app path on the isolated origin ([SN-WEB-017](ci-cd.md#sn-web-017)); `start_url` is same-origin and carries **no tracking parameters**; the install controller stores a single local boolean — no identifier, no telemetry, nothing sent off device (MASVS-PRIVACY-2, MASVS-PRIVACY-3); manifest contains no user data; icons are self-hosted (no CDN, so no SRI gap). Platform configuration follows MASVS-PLATFORM-3 secure defaults.

#### UX notes
Follows the onboarding voice in `docs/design/screens-and-flows.md` §5 and §16 (copy worth preserving) and appears as a quiet row in the Library header, not a modal interrupt. The install sheet, the Safari instruction sheet and the standalone splash must render in all **17 looks in light and dark**, using `sane_ui` components ([SN-DS-003](design-system.md#sn-ds-003)) — golden-test the sheet in two looks per mode. Empty/edge states: already installed (affordance hidden), unsupported browser (guidance only), dismissed (never re-shown). Accessibility: 44 px targets, ≥ 4.5:1 contrast, `Semantics` labels on the install button and dismissal, full keyboard operation with a visible focus ring, and no reliance on colour alone (`PRD-CO-312`, `PRD-CO-315`).

#### Test plan
- `app/test/web/install_controller_test.dart` — prompt capture, dismissal persistence, per-browser branching with mocked capabilities.
- `app/test/web/install_sheet_golden_test.dart` — goldens in two looks, light and dark.
- `app/integration_test/web/manifest_test.dart` — headless Chromium validates the served manifest fields, icon fetches and scope enforcement.
- `app/integration_test/web/standalone_layout_test.dart` — standalone display mode across window classes.
- Manual: install on Chrome desktop, Chrome Android, Samsung Internet; A2HS on iPadOS 17.

#### Dependencies
[SN-WEB-002](compat.md#sn-web-002), [SN-DS-002](design-system.md#sn-ds-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-011

<a id="sn-web-011"></a>

**Add service-worker offline precache, runtime caching and update flow**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | compat, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-010](compat.md#sn-web-010), [SN-WEB-002](compat.md#sn-web-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-NETWORK-1`, `CWE-494`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
Offline is not optional for a local-first note app: a student in a lecture hall with no signal must be able to open the web app and write. The service worker is also the only way to hit budget **B6** (cached cold start **< 3 s**) given a ~1.5 MB engine payload (`docs/adr/0010-web-pwa-strategy.md` Consequences, `docs/platform/performance-budgets.md` §B6). `docs/platform/web.md` §5 specifies Workbox-style precache plus runtime caching and an offline fallback, and §8 makes a registered service worker with an offline fallback a release gate. The hard part is not caching — it is **updating**: a stale worker serving an old engine against a new database schema is a data-integrity risk, so the update path needs to be deliberate and visible.

#### Scope
**In:** the service worker (precache of the Flutter bootstrap, engine WASM/JS, fonts and shell assets; runtime caching policy per asset class; navigation fallback), versioned cache naming tied to the build id, an update controller that detects a waiting worker and offers "Reload to update", skip-waiting only on user action, and clean-up of superseded caches.
**Out:** the manifest and install flow ([SN-WEB-010](compat.md#sn-web-010)), background sync (unavailable on iOS — `docs/platform/web.md` §5), push notifications, security headers ([SN-WEB-014](security.md#sn-web-014)–[SN-WEB-016](security.md#sn-web-016)), and CDN configuration ([SN-WEB-017](ci-cd.md#sn-web-017)).

#### Acceptance criteria
- [ ] With the network disabled after a first visit, the app boots, opens an existing notebook, writes ink and saves — fully offline.
- [ ] Cached cold start is **< 3 s** on Chrome desktop (B6), measured from navigation start to first interactive editor frame.
- [ ] Precache is keyed to the build id; a new deployment never mixes old and new engine artifacts, and stale caches are deleted on activation.
- [ ] A waiting worker surfaces a non-blocking "Update available — reload" affordance; the app never calls `skipWaiting()` without user action while a document is open with unsaved changes.
- [ ] Navigation requests fall back to the app shell offline; non-shell cross-origin requests are **not** cached.
- [ ] Range requests (audio/PDF) and opaque responses are handled without corrupting the cache.
- [ ] The worker is registered only over HTTPS/secure context and is scoped to the app path.
- [ ] Uninstalling/clearing site data leaves no orphaned worker that could serve an old build.

#### Technical notes
Generate the precache manifest at build time from the emitted artifact list ([SN-WEB-002](compat.md#sn-web-002)) rather than a hand-maintained list. Keep the worker source in `web/sw.js` (or a Workbox build step under `tools/`) with an explicit version constant; the Dart-side update controller lives in `app/lib/platform/web/update_controller.dart` and exposes a Riverpod `UpdateState`. Runtime caching policy: cache-first for immutable hashed assets, stale-while-revalidate for the shell, network-only for anything user-data-bearing (there is none on our origin) — never cache a response from a cloud-drive or identity endpoint. Coordinate with the storage layer: on activation, if the schema version of the new build is ahead, the update prompt must appear **before** the new code touches the database ([SN-WEB-008](storage.md#sn-web-008)). Implements `PRD-CO-413` and ADR-0010 decision 4.

#### Security & privacy
Threats: a service worker is persistent, privileged, origin-scoped code — a poisoned or overlong-lived worker is effectively persistent XSS (CWE-494, OWASP-A08); caching an authenticated or user-data response would leave note-adjacent data in a shared cache readable after sign-out (MASVS-STORAGE-1, CWE-524); an insecure or over-broad scope allows hijacking sibling paths (CWE-1021). Controls: HTTPS-only registration (MASVS-NETWORK-1, CWE-319); scope limited to the app path; never cache cross-origin or credentialed responses; integrity of precached assets rests on same-origin serving plus SRI for anything external ([SN-WEB-016](security.md#sn-web-016), CWE-1104); the worker contains no secrets and no note content; cache names are versioned and purged on activation; `Clear-Site-Data` is used on sign-out where supported ([SN-WEB-018](auth.md#sn-web-018)).

#### UX notes
Two small surfaces on the Library/Editor chrome (`docs/design/screens-and-flows.md` §6, §7.1): an **offline indicator** and an **update available** affordance, both built from `sane_ui` components and tokens so they render correctly in all **17 looks, light and dark**. Neither may block writing; both are dismissible; the update affordance re-appears on next launch if dismissed. Loading state during first install of the worker uses the branded boot state. Accessibility: status changes announce through a polite live region (not assertive — it must not interrupt a writing student), targets ≥ 44 px, contrast ≥ 4.5:1, keyboard reachable with a visible focus ring (`PRD-CO-315`, `PRD-CO-316`).

#### Test plan
- `app/test/web/update_controller_test.dart` — waiting-worker detection, user-gated skip-waiting, unsaved-changes guard.
- `app/integration_test/web/offline_boot_test.dart` — headless Chromium: first load, go offline, reload, write, save.
- `app/integration_test/web/sw_update_test.dart` — deploy build A, then build B; assert no mixed-artifact state and correct prompt.
- `tools/scripts/__tests__/precache_manifest_test.mjs` — build-time manifest generation.
- Manual: iPadOS Safari offline run; verify cold-start timing with a warm cache on Chrome desktop.

#### Dependencies
[SN-WEB-010](compat.md#sn-web-010), [SN-WEB-002](compat.md#sn-web-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2

---

