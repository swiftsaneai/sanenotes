# Platform — Android (phone & tablet)

> Audience: a coding agent building the Android surface (phones, tablets, foldables,
> ChromeOS) of Sane Notes with **zero prior context**. Authoritative capability map, API
> table, native-plugin contract, and Play-Store compliance checklist for Android. Implements
> the locked decisions ([`docs/product/vision-and-principles.md`](../product/vision-and-principles.md))
> and the two-tier ink architecture in
> [`docs/architecture/overview.md`](../architecture/overview.md).
>
> Primary research source: `research/android-stylus-capabilities.md` (committed at
> [`../research/sources/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md))
> and `research/flutter-ink-stack.md`. **(verify)** flags are carried through. **MUST/SHOULD/MAY**
> are RFC-2119.
>
> Phone-specific adaptation (compact width class, one-handed, finger-writing) lives in
> [`phones.md`](phones.md); this doc covers the Android platform surface as a whole, biased to
> tablet/large-screen.

Android is the surface where competitors are **weakest and least consistent** — the strategic
opening. The Android tablet ink budget is **≤ 25 ms pen-to-pixel on mid-range hardware**
(decision 7), with a **Snapdragon 680-class, 4 GB** device as the low-end reference.

---

## 1. Target OS versions, architectures & devices

| Axis | Support |
|---|---|
| **Min OS** | **Android 10 (API 29)** (locked decision 7). `minSdk = 29`. API 29 is also the floor for `androidx.graphics.lowlatency` front-buffered rendering and Impeller's Vulkan default — a deliberate alignment. |
| **Target SDK** | **API 36 (Android 16)** or the current Play requirement at ship time. Targeting 36 triggers forced adaptive resizability (§7), edge-to-edge enforcement, and predictive-back-by-default — all must be handled. |
| **ABIs** | `arm64-v8a`, `armeabi-v7a`, `x86_64` (decision 7). Ship an **App Bundle (.aab)**; Play splits per-ABI. |
| **Tier 1 devices** (CI device lab) | A **mid-range Android tablet with an active stylus** (Snapdragon 7-class + S Pen or USI) for the ≤ 25 ms budget; the **low-end 4 GB / Snapdragon 680-class** reference for memory/fps floors; a **Samsung Galaxy Tab (S Pen)**. |
| **Tier 2** | Pixel Tablet (USI), a foldable (Galaxy Z Fold / Pixel Fold), a Chromebook (USI). |
| **Tier 3** | armeabi-v7a 32-bit phones on API 29; older non-Vulkan devices (Impeller GL fallback). |

See [`compatibility-matrix.md`](compatibility-matrix.md) for the full grid.

---

## 2. Feature → API map (Android)

| Feature (what Sane Notes wants) | Primary API / library | Key symbols | Plugin | Min / status |
|---|---|---|---|---|
| Freehand ink capture & render | **Jetpack Ink** (`androidx.ink`) | `InProgressStrokesView`, `Stroke`, `StrokeInputBatch`, `Brush`/`StockBrushes`, `CanvasStrokeRenderer`, `ink-storage` | `sane_ink_surface` | Stable 1.0.0 (Dec 2025); API 21+ |
| Sub-frame latency (~4 ms) | **Low-latency graphics** (`androidx.graphics.lowlatency`) | `GLFrontBufferedRenderer`, `CanvasFrontBufferedRenderer`, `LowLatencyCanvasView` | `sane_ink_surface` | API 29+ |
| Pressure / tilt / orientation / hover | **MotionEvent** | `getPressure`, `AXIS_TILT`, `AXIS_ORIENTATION`, `AXIS_DISTANCE`, `getToolType` | `sane_ink_surface` / `sane_stylus` | platform |
| Barrel / eraser buttons | **MotionEvent** | `getButtonState` (`BUTTON_STYLUS_PRIMARY/SECONDARY`), `TOOL_TYPE_ERASER` | `sane_stylus` | platform |
| Palm rejection | **MotionEvent** | `ACTION_CANCEL`, `FLAG_CANCELED` | `sane_ink_surface` | `FLAG_CANCELED` = API 33+ |
| Smoother / lower-latency strokes | historical events + **motion prediction** | `getHistorical*`, `requestUnbufferedDispatch`; `MotionEventPredictor.record/predict` | `sane_ink_surface` | prediction lib API 19+ |
| Handwrite into text fields | **Stylus handwriting** | auto for `EditText`/`WebView`; `setAutoHandwritingEnabled`, `setHandwritingBoundsOffsets`, delegation | `sane_scribble` | Android 14 (API 34)+ |
| Handwriting → text (offline) | **ML Kit Digital Ink Recognition** | `Ink`/`Stroke`/`StrokePoint`; 300+ languages | `sane_ml_native` | on-device |
| Summarize / proofread / rewrite / describe | **ML Kit GenAI** (Gemini Nano / AICore) | Summarization, Proofreading, Rewriting, Image Description, Prompt API | `sane_ml_native` | Beta; Pixel 9+/S25+/OnePlus 13+ |
| Voice notes → text | **GenAI Speech Recognition** (alpha) / platform `SpeechRecognizer` | `createOnDeviceSpeechRecognizer()` | `sane_ml_native` | GenAI alpha; platform API 33+ |
| View PDFs | **Jetpack PDF** (`androidx.pdf`) / `PdfRenderer` | `PdfViewerFragment`, `PdfView`; search/select/forms | `sane_pdfkit` / `sane_pdf` | beta01; backported minSdk 28 |
| Annotate PDFs | **Jetpack PDF + Ink** | `EditablePdfViewerFragment`; OCR via `MlKitOcrProvider` | `sane_pdfkit` | `@ExperimentalPdfApi` |
| Sign-in / passkeys | **Credential Manager** | passkeys, passwords, Sign in with Google | (auth) | API 19+ |
| Encrypt notes at rest | **Android Keystore** (+ AES-GCM) | `KeyGenParameterSpec`, `setIsStrongBoxBacked`, `setUserAuthenticationParameters` | `sane_secure_store` | Keystore platform; StrongBox API 28+ |
| Biometric gate | **BiometricPrompt** + Keystore `CryptoObject` | `authenticate()` | `sane_secure_store` | platform |
| Anti-abuse / attestation | **Play Integrity API** | app / device / account verdicts; standard vs classic | (services) | replaces SafetyNet |
| User-owned file access | **Storage Access Framework** | `ACTION_OPEN/CREATE_DOCUMENT`, `OPEN_DOCUMENT_TREE`, `takePersistableUriPermission` | `sane_cloud_drive` | API 19/21+ |
| Cloud sync w/o backend | **Google Drive REST API** | `SyncAdapter`, Changes API, appDataFolder | `sane_cloud_drive` | Drive Android API retired |
| Adaptive layouts | **Window size classes** | `currentWindowAdaptiveInfo().windowSizeClass`; 600/840/1200/1600 dp | app | Compose Material3 adaptive |
| Large-screen / foldable / desktop | **Adaptive apps** + Android 16 behavior | forced resizability sw≥600 dp (API 36); edge-to-edge enforced | app | Android 16 (API 36) |
| S Pen remote / air actions | **Samsung S Pen Remote SDK** | `SpenRemote`, `SpenUnitManager`, `ButtonEvent`, `AirMotionEvent` | `sane_stylus` | Samsung Galaxy w/ BLE S Pen |
| Chromebook / Pixel Tablet stylus | **USI (2.0)** via MotionEvent | 4096 pressure, tilt, palm rejection | `sane_stylus` | no separate SDK |
| Back-gesture preview | **Predictive back** | `OnBackPressedCallback` / `OnBackInvokedCallback` | app | default Android 16 (API 36) |
| Modern look & motion | **Material 3 Expressive** | spring motion, dynamic color, shape morph | `sane_ui` | I/O 2025 / Android 16 |

**Deprecated — do NOT use:** all of **Jetpack Security** (`EncryptedFile`,
`EncryptedSharedPreferences`, `MasterKey`) is deprecated as of 1.1.0 (2025). Encrypt with
**AES-GCM using a hardware-backed Keystore key** directly (§8).

---

## 3. Ink architecture on Android (Tier A native fast path)

Android tablets/phones with a low-latency stylus are **Tier A** devices
([`architecture/overview.md`](../architecture/overview.md#ink-render-tiers)):

1. **Capture:** Flutter `Listener` (`PointerDeviceKind.stylus`) feeds `sane_ink` for the model;
   the native `sane_ink_surface` reads `MotionEvent` with `getHistorical*` (the Android
   analogue of iOS coalesced touches — recovers batched sub-samples) and
   `MotionEventPredictor` for predict-ahead. Call `requestUnbufferedDispatch(motionEvent)` on
   the drawing view to disable input batching for immediate delivery.
2. **Wet stroke:** render on a **front buffer**. Two acceptable implementations, chosen by
   capability:
   - **Jetpack Ink** (`androidx.ink`) `InProgressStrokesView` — Google's stable, batteries-
     included path (~4 ms, brushes/geometry/erase/serialization). **Default.**
   - **`GLFrontBufferedRenderer`** / `LowLatencyCanvasView` (`androidx.graphics.lowlatency`) —
     lower-level, when we render strokes ourselves (custom brushes `androidx.ink` can't
     express). Front-buffer is for **small updates only** (handwriting), never pan/zoom/
     fullscreen — those cause tearing; commit to the double-buffered layer for those.
3. **Composite** the native surface via the Flutter `Texture` widget; palette/rulers/selection
   stay in the Dart layer.
4. **Palm rejection:** on `ACTION_CANCEL` remove the stroke by `getPointerId(getActionIndex())`
   and re-render; on API 33+ also check `FLAG_CANCELED` on pointer-up to undo palm/grip
   touches. Suppress edge-nav gestures while drawing with
   `WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE`.

**Impeller on Android:** default on **API 29+ via Vulkan**; on older/no-Vulkan devices it
**auto-falls-back to legacy OpenGL (Skia)**. This is the Tier-B pure-Flutter render for
devices without a usable native front-buffer. No action needed beyond keeping the fallback
working and golden-testing both.

---

## 4. Stylus hardware & interaction bindings

| Hardware | How Sane Notes reads it | Binding |
|---|---|---|
| **Any active stylus / USI 2.0** | `MotionEvent` axes (pressure 0–1, `AXIS_TILT`, `AXIS_ORIENTATION`, `AXIS_DISTANCE`) | Brush dynamics; hover preview from `AXIS_DISTANCE` |
| **Barrel button** | `getButtonState()` `BUTTON_STYLUS_PRIMARY/SECONDARY` | Quick eraser / lasso (configurable) |
| **Pen inverted (eraser end)** | `getToolType() == TOOL_TYPE_ERASER` | Erase |
| **S Pen (basic)** | barrel button via `MotionEvent` (no SDK needed) | as above |
| **S Pen Remote (BLE)** | **S Pen Remote SDK** `SpenRemote` → `ButtonEvent` (single/double press), `AirMotionEvent` (Up/Down/Left/Right/CW/CCW) | Single click → **new note** or **start recording**; air gestures → page turn. **Constraint: only ONE remote action per app** (`remote_action.xml`); extra RemoteActions are ignored. |

USI pens (Chromebook, Pixel Tablet) need **no separate SDK** — they surface through the same
`MotionEvent` stylus axes. USI 2.0 provides up to 4096 pressure levels and hardware palm
rejection **(hardware-spec claims unverified vs an official USI page — treat as background)**.

---

## 5. Native plugin list & interface sketches

Federated plugins ([ADR-0012](../adr/0012-native-plugin-strategy.md)); Kotlin impls for
Android. Sketches are illustrative Dart platform-interfaces — confirm the Pigeon/method-channel
shape against ADR-0012.

### `sane_ink_surface` (Jetpack Ink / front-buffer wet-ink surface)
```dart
abstract class SaneInkSurfacePlatform {
  Future<int> createSurface(SurfaceConfig cfg);     // returns Flutter texture id
  void beginStroke(StrokeStyle style);              // maps to Ink Brush / StockBrushes
  void extend(List<InkSample> historical);          // getHistorical* + predicted samples
  void endStroke();                                  // InProgressStrokesFinishedListener → Stroke
  void dispose(int textureId);
  Stream<InkSample> get nativeSamples;               // native-captured path (see L1)
}
```
Kotlin: `InProgressStrokesView` (Jetpack Ink) **or** `GLFrontBufferedRenderer`
(`onDrawFrontBufferedLayer`/`onDrawDoubleBufferedLayer`, `renderFrontBufferedLayer` on
DOWN/MOVE, `commit()` on UP, `cancel()` on CANCEL); `requestUnbufferedDispatch`;
`MotionEventPredictor.newInstance(view)`.

### `sane_stylus` (barrel buttons, hover, S Pen Remote)
```dart
abstract class SaneStylusPlatform {
  Future<StylusCapabilities> capabilities();
  Stream<ButtonEvent> get spenButton;    // S Pen Remote single/double press
  Stream<AirMotion> get spenAirMotion;   // gestures (device-gated)
  Stream<HoverSample> get hover;         // AXIS_DISTANCE-driven
}
```
Kotlin: `SpenRemote.initialize(context)`, `SpenUnitManager`, plus `MotionEvent` button/hover
state. Guard the S Pen Remote path behind Samsung-device + feature checks; it is absent
elsewhere.

### `sane_scribble` (stylus handwriting into text fields)
```dart
abstract class SaneScribblePlatform {
  void setAutoHandwritingEnabled(bool enabled);          // false over the drawing surface
  void setHandwritingBoundsOffsets(EdgeInsets insets);   // default 40dp V / 10dp H
  void registerDelegate(String placeholderId, String editorId); // handwriting delegation
}
```
Kotlin: Android 14+ stylus handwriting (`EditText`/`WebView` auto). **Disable it over the ink
canvas** (`setAutoHandwritingEnabled(false)`) or the OS will try to convert pen strokes to
text. Password fields are excluded by the OS.

### `sane_secure_store` (Keystore / StrongBox / BiometricPrompt)
```dart
abstract class SaneSecureStorePlatform {
  Future<KeyRef> createKey(String alias, {bool strongBox, AuthBinding? auth});
  Future<List<int>> encrypt(String alias, List<int> plaintext);     // AES-GCM
  Future<List<int>> decrypt(String alias, List<int> ciphertext, {String? biometricReason});
  Future<SecurityLevel> keySecurityLevel(String alias);             // STRONGBOX / TEE
}
```
Kotlin: `KeyGenParameterSpec.Builder(...).setIsStrongBoxBacked(true)`,
`setUserAuthenticationParameters(duration, AUTH_BIOMETRIC_STRONG | AUTH_DEVICE_CREDENTIAL)`,
`setInvalidatedByBiometricEnrollment(false)`, `BiometricPrompt` + `CryptoObject`. **Never**
`EncryptedFile`. Request StrongBox but tolerate its absence (fall back to TEE).

### `sane_cloud_drive` (SAF + Drive REST)
```dart
abstract class SaneCloudDrivePlatform {
  Future<Uri> openDocumentTree();                        // ACTION_OPEN_DOCUMENT_TREE
  Future<void> persistPermission(Uri uri);               // takePersistableUriPermission
  Future<void> write(Uri fileUri, List<int> bytes);      // ciphertext blobs only
  Future<List<int>> read(Uri fileUri);
  Stream<DriveChange> changes();                          // Drive Changes API via SyncAdapter
}
```
Prefer **`ACTION_OPEN_DOCUMENT`/`OPEN_DOCUMENT_TREE`** (persistent handle) over
`ACTION_GET_CONTENT` (copy) for editable notes. Google Drive backend uses the **Drive REST
API** (Android Drive API is retired) with `appDataFolder` + a visible export folder, narrow
`drive.file` scope. Only ciphertext leaves the device.

### `sane_ml_native` (ML Kit Digital Ink + GenAI/Gemini Nano)
```dart
abstract class SaneMlNativePlatform {
  Future<MlAvailability> availability();                          // per-feature + device tier
  Future<String> recognizeInk(List<InkStroke> strokes, String lang); // ML Kit Digital Ink
  Future<String> summarize(String text);                          // ML Kit GenAI (Gemini Nano)
  Future<String> proofread(String text);
  Stream<Transcript> transcribe(AudioStream a);                   // GenAI speech (alpha) / platform
}
```
Kotlin: ML Kit Digital Ink Recognition (`Ink`/`Stroke`/`StrokePoint`, downloadable language
packs, 300+ languages) for note-body transcription; ML Kit GenAI (Summarization/Proofreading/
Rewriting/Image Description/Prompt) over Gemini Nano via **AICore** — **top-foreground only**,
AICore enforces per-app quotas, device-gated (Pixel 9+/S25+/OnePlus 13+). Cloud inference is a
separate per-request opt-in with a visible indicator (decision 6).

### `sane_pdfkit` / `sane_pdf`
Jetpack PDF (`androidx.pdf`) `PdfViewerFragment`/`PdfView` for viewing; `PdfRenderer`
(framework) as the no-dependency fallback. Ink-over-PDF stays in Sane Notes' object model;
export-to-PDF-annotations is an explicit path.

---

## 6. Handwriting-to-text: two paths (do both)

1. **Free platform stylus handwriting** into text fields (Android 14+): for form/search entry,
   `EditText`/`WebView` get it automatically. Sane Notes MUST **disable** it over the ink
   canvas (`setAutoHandwritingEnabled(false)`) and MAY use **handwriting delegation** so the
   search bar hands off to the real editor.
2. **ML Kit Digital Ink Recognition** (offline, 300+ languages) for converting **note-body ink
   strokes** to text — capture with Jetpack Ink, recognize with ML Kit. This is the
   handwriting-search / convert-to-text feature (decision 6).

---

## 7. Large screens, foldables, desktop & Material 3

### Window size classes → adaptive layout
Breakpoints (width): Compact < 600 dp (phone) · Medium 600–839 dp (portrait tablet / unfolded
foldable) · Expanded 840–1199 dp (landscape tablet) · Large 1200–1599 dp · Extra-large ≥ 1600
dp (desktop/connected display). The class **changes at runtime** on rotation, multi-window, and
fold/unfold — drive the library list/detail two-pane and editor chrome off it. Sane Notes' UI
is adaptive by decision 1; compact collapses to [`phones.md`](phones.md).

### Android 16 (API 36) behavior changes — MUST handle
- On displays with **smallest width ≥ 600 dp**, the system **ignores** `screenOrientation`,
  `resizableActivity`, `minAspectRatio`/`maxAspectRatio`, and `setRequestedOrientation()` — the
  app fills the window regardless. Sane Notes MUST be fully adaptive; do not lock orientation.
  A temporary opt-out (`PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY`) exists but is removed at
  API 37 — do not depend on it.
- **Edge-to-edge is enforced** (opt-out disabled at API 36); handle insets everywhere.
- **Predictive back is default**; `onBackPressed`/`KEYCODE_BACK` are no longer called when
  targeting API 36 on Android 16. Migrate to `OnBackPressedCallback` /
  `OnBackInvokedCallback` for discard-changes confirmations and nested editor panels.

Flutter caveat **(verify)**: confirm the current Flutter engine's predictive-back and
edge-to-edge support level and that the Android embedding is migrated to `OnBackInvokedCallback`
— this is a real integration risk (L2).

### Foldables & desktop windowing
Handle instant compact↔medium↔expanded transitions on fold/unfold and trifolds. On ChromeOS,
apps run in freely resizable desktop windows; register as the default note-taker with an intent
filter for `org.chromium.arc.intent.action.CREATE_NOTE` (blank-note / annotate-image entry
points). Support keyboard (`Ctrl+S`/`Ctrl+Z`), mouse (right-click menus, hover, drag-and-drop),
and stylus as first-class input on large screens.

### Material 3 Expressive
Adopt M3 Expressive **components, spring motion, and dynamic color** where they do **not
conflict with the Sane Notes design system** ([`design-system.md`](../design/design-system.md)).
The Sane Notes visual identity (17 looks, Sane Sage, tokens in
[`tokens.json`](../design/tokens.json)) is the source of truth; M3 Expressive is the underlying
motion/interaction grammar and the fallback for platform chrome (system dialogs, share sheets),
not a re-skin of the brand.

---

## 8. Auth, cloud & security APIs

| Concern | API / rule | Notes |
|---|---|---|
| **Identity** | Sign in with Google / Microsoft / Apple + phone OTP (decision 5); guest mode first-class | Dev-only `--dart-define=SANE_AUTH_BYPASS=true`, impossible in release (p0 risk). |
| **Sign-in surface** | **Credential Manager** (`androidx.credentials`) | Passkeys (recommended primary), passwords, and Sign in with Google through one bottom-sheet API. |
| **At-rest** | **Android Keystore + AES-GCM** (not Jetpack Security) | Per-notebook keys wrapped by user master key (decision 3). Request **StrongBox**; check `KeyInfo.getSecurityLevel()`. |
| **Biometric lock** | `BiometricPrompt` + Keystore `CryptoObject` | Time-based or per-operation auth binding; `setInvalidatedByBiometricEnrollment(false)` to survive new enrollments if desired. |
| **Backend integrity** | **Play Integrity API** | App/device/account verdicts for the stateless entitlement + relay services only; don't cache verdicts; tiered enforcement. Never gates note-taking. |
| **User-owned sync** | SAF + Drive REST | Ciphertext only; no Sane Notes note-storage server (decision 3). |

Security target: MASVS 2.x L2 (+R where cheap) (decision 8); threat model
[`../security/threat-model.md`](../security/threat-model.md).

---

## 9. Google Play store requirements (release gate)

| Requirement | Detail |
|---|---|
| **Data safety form** | Declare **"no data collected"** except opt-in crash reports (decision 8). Must match actual behavior and every SDK. |
| **Target SDK** | API 36 (or Play's current requirement). New apps and updates must meet Play's target-API window. |
| **16 KB page sizes** | Android is moving to **16 KB memory pages**; all native code (`.so` in the app, every plugin, Flutter engine, pdfium, ML Kit natives) MUST be **16 KB-aligned**. **(verify)** current Play requirement date and that the Flutter/NDK toolchain + every native dependency are rebuilt 16 KB-aligned. This is a concrete build-config risk (L3). |
| **App Bundle** | Ship `.aab`; per-ABI/-density/-language splits. |
| **Edge-to-edge & predictive back** | Required behaviors when targeting API 36 (§7). |
| **Permissions** | Minimal. Notes need **no** broad storage permission (SAF handles files). Declare mic only for voice notes, camera only for scan/import — each with a runtime rationale. |
| **Foreground service / background** | If long transcription/sync runs in background, declare the correct foreground-service type and justification. |

---

## 10. Known Flutter-on-Android limitations & mitigations

| # | Limitation | Impact | Mitigation |
|---|---|---|---|
| **L1** | No framework-level coalesced/historical sub-samples in Flutter (`research/flutter-ink-stack.md`, **verify**) | Wet-ink smoothness on fast strokes | Native `sane_ink_surface` reads `getHistorical*` + `MotionEventPredictor` and owns the wet path (Tier A). |
| **L2** | Predictive-back / edge-to-edge / API-36 forced resizability need the Flutter Android embedding migrated (**verify** current support) | Crashes or wrong back behavior on Android 16 | Verify engine support at spike; use `OnBackInvokedCallback`; test on an API 36 device early. |
| **L3** | **16 KB page** alignment must cover the Flutter engine + every native plugin `.so` | Play rejection / crashes on 16 KB devices | Build with a 16 KB-aligned NDK/toolchain; audit pdfium, ML Kit, ObjectBox-style natives; add a CI check that all `.so` are aligned. |
| **L4** | On-device ML Kit / GenAI is Android-only and device-tier-gated | AI features vary by device; none on web | Feature-detect `availability()`; degrade to Vision-equivalent OCR only where present; web uses a separate path ([`web.md`](web.md)). |
| **L5** | Impeller Vulkan vs legacy-GL fallback split | Rendering differences on old/no-Vulkan devices | Golden-test both paths; keep GL fallback in Tier B; low-end 4 GB device is a CI gate. |
| **L6** | `--obfuscate` renames Dart symbols only; ship R8/ProGuard for the Kotlin/plugin layer | Reverse engineering | No secrets in client; server-authoritative; Play Integrity on the backend; keep required Flutter/plugin classes in ProGuard rules. |
| **L7** | Latency parity not guaranteed by pure Flutter | Product thesis | **SN-INK p0 spike** measures pure-Flutter vs Flutter+Jetpack-Ink front-buffer on the mid-range reference; ≤ 25 ms gate; native-view pivot is the ADR-0001 exit criterion. |

---

## 11. Testing devices & harness

- **Device lab (Tier 1, CI):** mid-range stylus tablet (S Pen or USI) for ≤ 25 ms latency;
  low-end **4 GB / Snapdragon 680-class** phone for memory (< 300 MB) and 60 fps floors;
  Samsung Galaxy Tab (S Pen). Run `tools/perf_harness` gates
  ([`performance-budgets.md`](performance-budgets.md)).
- **Tier 2 manual:** Pixel Tablet (USI), a foldable, a Chromebook (USI + ChromeOS note-taker
  intent), an **API 36** device for predictive-back / 16 KB / edge-to-edge validation.
- **Emulator:** functional/golden tests; cannot measure latency or exercise real stylus
  hardware — not a latency gate. (Repo note: AVDs are launched from Android Studio, driven via
  adb; see the team's emulator constraint.)
- Golden tests pin ink; `integration_test` + `patrol` cover native permission/biometric/file
  dialogs.

---

## 12. Cross-references

- Ink tiers & threading: [`architecture/overview.md`](../architecture/overview.md)
- Single-codebase decision & exit criterion: [ADR-0001](../adr/0001-flutter-single-codebase.md)
- Native plugin strategy: [ADR-0012](../adr/0012-native-plugin-strategy.md)
- Identity / sync / crypto / privacy: [`prd-03`](../product/prd-03-identity-sync-privacy-settings-billing.md)
- Phone adaptation: [`phones.md`](phones.md)
- Support tiers: [`compatibility-matrix.md`](compatibility-matrix.md)
- Budgets & gates: [`performance-budgets.md`](performance-budgets.md)
- Research: `research/android-stylus-capabilities.md`, `research/flutter-ink-stack.md`
