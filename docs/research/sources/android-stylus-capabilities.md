# Android Note-App Capabilities (2025–2026): Platform APIs Research

A survey of every Android platform / Jetpack / ML Kit / Samsung / Google I/O capability a best-in-class note app can build on, targeting phones, tablets, foldables, and Chromebooks in the 2025–2026 timeframe. Every claim traces to a page listed under **Sources**; anything not directly confirmed on a fetched page is marked **(unverified)**.

---

## 1. Inking: capture, render, store strokes

### Jetpack Ink API (`androidx.ink`)
The Ink API is Google's official Jetpack library "to make it easy to create, render, and manipulate beautiful ink strokes." It reached **stable 1.0.0 on December 17, 2025**, with an active alpha channel (**1.1.0-alpha08**, September 9, 2026). It is modular; artifacts include `ink-strokes`, `ink-brush`, `ink-geometry`, `ink-authoring`, `ink-rendering`, `ink-storage`, plus Compose variants (`ink-authoring-compose`, `ink-brush-compose`, `ink-geometry-compose`) and `ink-nativeloader`.

Five functional modules:

- **Strokes** (`androidx.ink.strokes`) — the foundation. `StrokeInputBatch` "represents a series of pointer inputs, including their position, timestamp, and optionally pressure, tilt, and orientation." `InProgressStroke` "is used to render partial strokes with low latency and to build the final `Stroke` once input is complete, after which the object can be reused." `Stroke` is "an immutable representation of a finalized stroke with fixed geometry," pairing an `ImmutableStrokeInputBatch`, a `Brush`, and a `PartitionedMesh`.
- **Brush** (`androidx.ink.brush`) — declarative style. `Brush` specifies base color, base size, and a `BrushFamily` ("analogous to a font family"). `StockBrushes` "provides factory functions for creating ready-to-use `BrushFamily` instances" (marker, highlighter, etc.). Textures are supplied via `TextureBitmapStore`.
- **Geometry** (`androidx.ink.geometry`) — geometric operations on primitives (`Box`, `Vec`, `AffineTransform`) and arbitrary shapes (`PartitionedMesh`), "including intersection detection and transformation." This module powers **hit testing, erasing, and selection**.
- **Authoring** (`androidx.ink.authoring`) — live capture. The `InProgressStrokes` composable (and `InProgressStrokesView` for Views) "captures user touch input and renders it as low-latency strokes on the screen in real time," notifying the app via `InProgressStrokesFinishedListener` when a stroke completes.
- **Rendering** (`androidx.ink.rendering`) — `CanvasStrokeRenderer` "optimizes rendering performance…including antialiasing," drawing finished `Stroke`s or in-progress strokes onto an Android `Canvas` (with `ViewStrokeRenderer` for View-based canvases and automatic transform tracking).
- **Storage** (`androidx.ink.storage`) — serializes/deserializes stroke data using "protocol buffers and optimized delta compression techniques, resulting in significant storage savings."

Ink builds on Android's low-latency graphics stack, achieving **"4ms end-to-end latency"** on supported devices, using Android 10+ improvements plus Android 14 rendering enhancements. Google already uses it internally: **Circle to Search** was built on it ("integrating the Ink API was a breeze… first working prototype within just one week"). The launch blog states compatibility down to **Android 5.0 (API 21)** with enhanced features on newer OS versions.

### Low-latency graphics library (`androidx.graphics:graphics-core` / `androidx.graphics.lowlatency`)
The lower-level primitive beneath Ink, for teams that render strokes themselves. "The goal…is to reduce the processing time between stylus input and screen rendering." Key classes:

- **`GLFrontBufferedRenderer`** — OpenGL front-buffered rendering. Its `Callback` exposes `onDrawFrontBufferedLayer()` (fast partial updates for the newest points) and `onDrawDoubleBufferedLayer()` (full-scene commit). Usage flow: `renderFrontBufferedLayer()` on `ACTION_DOWN`/`ACTION_MOVE`, `commit()` on `ACTION_UP`, `cancel()` on `ACTION_CANCEL`.
- **`CanvasFrontBufferedRenderer`** — the same front-buffer technique for Android's 2D `Canvas` API.
- **`LowLatencyCanvasView`** — a view that "mitigates the complexities associated with `SurfaceView` management by internally managing the `SurfaceView` instance."

Front-buffered rendering is meant for **small updates** (handwriting, drawing, sketching) — not fullscreen updates, panning, or zooming, which cause tearing. Available from **Android 10+ (API 29)** and ChromeOS (API 29+). Works with any pointer type (finger, capacitive/active stylus, mouse).

---

## 2. Stylus input data (MotionEvent) & prediction

### Advanced stylus features (`MotionEvent`)
A note app reads rich pen data from `MotionEvent`:

- **Pressure** — `getPressure()` / `getAxisValue(AXIS_PRESSURE)`, range 0–1 (can exceed 1 by calibration; normalize).
- **Tilt** — `getAxisValue(AXIS_TILT)`, 0 rad (perpendicular) to π/2 rad (flat). Use for shading.
- **Orientation** — `getOrientation()` / `getAxisValue(AXIS_ORIENTATION)`, 0 to ±π. Use for chisel/brush width.
- **Hover distance** — `getAxisValue(AXIS_DISTANCE)`, 0.0 at contact and higher as the pen lifts. Enables brush-size preview and hover cursors (stylus hover events supported on capable hardware).
- **Tool type** — `getToolType(pointerIndex)` returns `TOOL_TYPE_STYLUS`, `TOOL_TYPE_ERASER` (pen inverted, eraser down), or `TOOL_TYPE_FINGER`.
- **Buttons** — `getButtonState()` with `BUTTON_STYLUS_PRIMARY` / `BUTTON_STYLUS_SECONDARY` (barrel buttons).

### Palm rejection
Two mechanisms: on **`ACTION_CANCEL`**, remove the stroke identified by `getPointerId(getActionIndex())` and re-render. On **Android 13+**, check **`FLAG_CANCELED`** on pointer-up (`event.flags and FLAG_CANCELED`) to undo an unintended touch (palm, grip). Apps can also suppress edge navigation gestures during drawing with `WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE`.

### Smoothing & latency reduction
- **Historical/batched events** — `getHistoricalX/Y/Pressure(...)` recover the intermediate samples the system batches per frame, giving smoother strokes. `requestUnbufferedDispatch(motionEvent)` disables batching for immediate delivery.
- **Motion prediction** (`androidx.input:input-motionprediction`) — `MotionEventPredictor.newInstance(view)`, then `record(motionEvent)` and `predict()`. The predicted `MotionEvent` "contains all data including x and y coordinates, pressure, orientation and tilt." Best practice: render predicted points only transiently (remove them when a new prediction arrives; never use for the final stroke). Available API 19+ (ChromeOS API 28+).

---

## 3. Handwriting → text

### Stylus handwriting in text fields (Android 14+)
On **Android 14 (API 34) and higher**, "users can write into any text input field in any app using a stylus," and it works automatically for standard components — **`EditText`** and **`WebView`** text widgets. Handwriting activates within the field's **handwriting bounds**: **40 dp vertical + 10 dp horizontal** padding around the view; adjust with `setHandwritingBoundsOffsets()`. Disable per-field with `setAutoHandwritingEnabled(false)` (useful when a drawing surface overlays text fields). **Password (`textPassword`) fields are excluded.** Handwriting **delegation** lets a placeholder (e.g., a search bar) hand off to a real editor: `setHandwritingDelegatorCallback { … }` + `setIsHandwritingDelegate(true)`; Material's `SearchView.setUpWithSearchBar()` wires this automatically. Supported handwriting **gestures** (delete/select/insert/space via strike, scribble, etc.) are handled by standard components; custom editors implement the `InputConnection` handwriting-gesture APIs. Compose has an equivalent guide. You can simulate a stylus over ADB (`debug.input.simulate_stylus_with_touch`).

### ML Kit Digital Ink Recognition (on-device, offline)
Converts handwritten strokes to text using "the same technology that powers handwriting recognition in Gboard, Google Translate, and the Quick, Draw! game." Fully **on-device / offline**, running "in near real time" (~100 ms for a line of text on a typical phone **(unverified — from blog snippet)**). Supports **300+ languages and 25+ writing systems** (Latin, Chinese, Japanese, Korean, Arabic, Cyrillic, etc.), letting users "draw characters that are not available on their keyboard." Beyond text it recognizes **gestures** (nine classes incl. arch, caret, circle, scribble, strike), **shapes**, **emoji**, and **autodraw** sketches. Data model: an `Ink` object is "a sequence of strokes, each being a list of coordinates with time information called touch points" (`Ink` → `Stroke` → `StrokePoint(x, y, t)`). Language packs download dynamically to keep on-device storage low. This pairs naturally with Ink API stroke capture: capture with Ink, recognize with ML Kit.

---

## 4. On-device generative AI (Gemini Nano)

### ML Kit GenAI APIs
High-level, task-specific wrappers over **Gemini Nano**, executed locally via **AICore** ("Input, inference, and output data is processed locally"). Features and status:

- **Summarization (Beta)** — summarize articles or conversations as a bulleted list.
- **Proofreading (Beta)** — refine grammar and fix spelling in short content.
- **Rewriting (Beta)** — rewrite short messages in different tones/styles.
- **Image Description (Beta)** — generate a short description of an image.
- **Prompt API (Beta)** — custom text-only or multimodal prompts to Gemini Nano.
- **Speech Recognition (Alpha)** — transcribe audio to text on-device.

Both **streaming** and **non-streaming** result delivery are offered. Inference "is permitted only when the app is the top foreground application," and AICore enforces **per-app quotas**. Device support for the feature APIs (summarize/proofread/rewrite/image-description) spans **Pixel 9+, Samsung Galaxy S25+, OnePlus 13+**, and other flagships (Honor, OPPO, vivo); the **Prompt API** availability varies by Gemini Nano version (nano-v2/v3/v4) and device tier.

The **August 2025** update tied the latest Gemini Nano to the **Pixel 10** launch, with per-language evaluation pipelines, feature-specific **LoRA adapters** for quality consistency across devices, and large throughput gains (Pixel 10 Pro text prefix ~**940 tokens/sec** vs 610 on Pixel 9 Pro). Exact GA-language enumeration was not published on that page **(unverified)**.

For a note app this enables: auto-summaries of long notes/meetings, one-tap proofreading, tone rewriting, alt-text/description of pasted images, and (alpha) voice-note transcription — all offline and private.

### On-device speech (platform)
Independent of GenAI, the platform `SpeechRecognizer` has `createOnDeviceSpeechRecognizer()` since **Android 13 (API 33)**, which forces on-device recognition (fails if no local engine). `RecognizerIntent.ACTION_RECOGNIZE_SPEECH` with `LANGUAGE_MODEL_FREE_FORM` handles dictation. (Jetpack XR SDK adds ASR helpers for glasses **(unverified — search snippet only)**.)

---

## 5. Documents: PDF viewing & annotation

### Jetpack PDF library (`androidx.pdf`)
An embeddable PDF UI, at **1.0.0-beta01 (Aug 26, 2026)**, with read/render **backported to `minSdk = 28`** ("additional 2 billion active Android devices"). Components: **`PdfViewerFragment`**, **`PdfView`**, and an experimental **`PdfViewer`** composable (`@ExperimentalPdfApi`). Features:

- Pinch/double-tap/keyboard zoom, fast scrubber, arrow-key navigation.
- Multi-page **text selection** with handles; **find-in-file** with page-by-page streaming and debounced input.
- **Hyperlinks** (web + bookmarks) with customizable handling; **password-protected** documents.
- **Form filling** — text, drop-downs, checkboxes, radio buttons — via `isFormFillingEnabled`.
- **Annotation/editing** (`EditablePdfViewerFragment`, `@ExperimentalPdfApi`) built on **`androidx.ink`**: **pen** (adjustable thickness/color), **highlighter** (free-form + snap-to-text), **eraser**, **undo/redo**.
- **Image selection** (`isImageSelectionEnabled`), **two-page layout** (`pagesPerRow`) for large screens, **OCR** via `OcrProvider` (default `MlKitOcrProvider`), and full keyboard/mouse support.

Artifacts: `pdf-core`, `pdf-document-service`, `pdf-viewer`, `pdf-viewer-fragment`, `pdf-ocr-play-services`.

### `PdfRenderer` (framework)
The low-level `android.graphics.pdf.PdfRenderer` + `PdfRenderer.Page` render pages to bitmaps (screen or print modes) — the fallback when a custom PDF UI is needed and no Jetpack dependency is wanted.

---

## 6. Identity, security & integrity

### Credential Manager (`androidx.credentials`)
A unified Jetpack API "that unifies API support for major authentication methods including passkeys, passwords, and federated sign-in." **Sign in with Google** is now surfaced through Credential Manager's bottom sheet (replacing Smart Lock / One Tap), alongside a distinct "Sign in with Google" button. Works on **Android 4.4 (API 19)+**. **Passkeys** are phishing-resistant, non-reusable, and unlocked by biometric/PIN — the recommended primary auth for a modern note app, with password and Google federation as fallbacks. ID tokens carry a last-authentication timestamp for freshness checks; auto sign-in supports returning users.

### Android Keystore + StrongBox
Cryptographic keys live in a container in the **TEE** or **StrongBox** (a dedicated secure element / iSE with its own CPU, secure storage, TRNG, secure timer; Android 9+), "with the key material remaining non-exportable." Request StrongBox via `KeyGenParameterSpec.Builder(...).setIsStrongBoxBacked(true)`. StrongBox supports RSA 2048, AES-128/256, ECDSA/ECDH P-256, HMAC-SHA256, 3DES. Check backing with `KeyInfo.getSecurityLevel()` (`STRONGBOX`/`TRUSTED_ENVIRONMENT`) on API 29+. **Key attestation** proves hardware backing to a server. Keys can be bound to user auth via `setUserAuthenticationParameters(duration, AUTH_BIOMETRIC_STRONG | AUTH_DEVICE_CREDENTIAL)` in **time-based** or **per-operation** modes; per-operation gating uses a `BiometricPrompt.CryptoObject` unlocked by `authenticate()`. `setInvalidatedByBiometricEnrollment(false)` keeps a key valid across new biometric enrollments. Secure key import (Android 9+) allows server-wrapped keys to enter secure hardware.

### BiometricPrompt
The standard system biometric dialog (fingerprint/face/device credential), integrated with Keystore CryptoObjects for gating note decryption or vault unlock. (Covered via the Keystore user-authentication docs above.)

### Jetpack Security (`androidx.security`) — **DEPRECATED**
Important for 2025+ decisions: **all Jetpack Security APIs are deprecated** as of **1.1.0-beta01 (June 4, 2025)**, carried into stable **1.1.0 (July 30, 2025)** — including **`EncryptedFile`**, **`EncryptedSharedPreferences`**, and **`MasterKey`/`MasterKeys`** — "in favour of existing platform APIs and direct use of Android Keystore." New note apps should **not** adopt EncryptedFile; instead encrypt with **AES-GCM using a hardware-backed Keystore key** and manage files/prefs directly.

### Play Integrity API
Verifies that requests come from your genuine, unmodified app on a genuine device. Three verdicts: **app integrity** (`appRecognitionVerdict` → `PLAY_RECOGNIZED`), **device integrity** (`MEETS_BASIC_INTEGRITY` / `MEETS_DEVICE_INTEGRITY` / `MEETS_STRONG_INTEGRITY` for hardware-backed + recent patches on Android 13+), and **account/licensing** (`appLicensingVerdict` → `LICENSED`). Uses hardware-backed signals; **replaces SafetyNet Attestation** and the App Licensing library. **Standard** requests (few hundred ms, warm-up required, auto-mitigated, use `requestHash`) suit frequent checks; **classic** requests (few seconds, use a server `nonce`) suit rare high-value actions. Default quota 10,000 requests/day. Guidance: don't cache verdicts (proxy risk), combine with other signals, and use tiered enforcement — good for protecting a note app's sync backend, premium features, or account actions. A **Device recall (beta)** feature flags abusive devices across reinstalls/resets.

---

## 7. Sync & storage (user-owned)

### Storage Access Framework (SAF)
Lets a note app read/write user files across any document provider (Drive, Dropbox, OneDrive, local) **without a custom backend or broad storage permissions**. Intents: **`ACTION_OPEN_DOCUMENT`** (persistent access to an existing file, API 19+), **`ACTION_CREATE_DOCUMENT`** (save a new file), **`ACTION_OPEN_DOCUMENT_TREE`** (grant a whole directory, API 21+). Persist access across reboots with **`takePersistableUriPermission()`** on the returned URI (document IDs are stable for exactly this reason). Cloud services expose files by implementing **`DocumentsProvider`**; an app can also *become* a provider. `ACTION_GET_CONTENT` imports a copy; `ACTION_OPEN_DOCUMENT` keeps a live handle — prefer the latter for editable notes.

### Google Drive REST API (user-owned sync)
The **Drive Android API is retired**; the **Drive REST API** is the path for direct Drive integration. For offline-first sync, "you can continue to provide an offline-first model by using a `SyncAdapter` with the Drive REST API," using the **Changes** collection to detect modifications and `files.list` to search. A note app can store data in the hidden **app data folder** with the narrow `drive.file`/appDataFolder scope **(appDataFolder detail unverified — from search snippet)**, giving per-user cloud backup without operating a server.

---

## 8. Large screens, foldables & desktop (Android 15/16)

### Window size classes
Opinionated breakpoints, classified **separately for width and height**:

- **Compact**: width < 600dp (height < 480dp) — phones.
- **Medium**: 600 ≤ width < 840dp (480 ≤ height < 900dp) — tablets portrait, unfolded foldables.
- **Expanded**: 840 ≤ width < 1200dp (height ≥ 900dp) — tablets landscape.
- **Large**: 1200 ≤ width < 1600dp — large tablet displays.
- **Extra-large**: width ≥ 1600dp — desktop/connected displays.

Large + extra-large were added to target desktop and connected displays. Compute in Compose with `currentWindowAdaptiveInfo().windowSizeClass` (pass `supportLargeAndXLargeWidth = true` to enable the two largest). The class **changes at runtime** on rotation, multi-window, or fold/unfold — perfect trigger for a note app's list/detail two-pane layout.

### Android 16 behavior changes (API 36)
For apps targeting API 36, on displays with **smallest width ≥ 600dp**, the system **ignores** `android:screenOrientation`, `android:resizableActivity`, `android:minAspectRatio`/`maxAspectRatio`, and `setRequestedOrientation()` — apps "fill the entire display window, regardless of aspect ratio or a user's preferred orientation." Apps must be adaptive across phones/tablets/foldables/desktops/split-screen/desktop-windowing. A temporary opt-out exists (`PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY`), removed when targeting API 37. **Edge-to-edge** is enforced (opt-out attribute deprecated/disabled at API 36). Games are exempt.

### Foldables & desktop windowing
Guidance covers landscape foldables and **trifolds**, which "shift between compact, medium, and expanded window size classes instantly." On **ChromeOS**, apps run in freely resizable **desktop-type windows**; Android 16 extends **desktop windowing** more broadly (incl. connected external displays) **(broad-rollout detail unverified)**.

### Input on large screens (keyboard / mouse / stylus)
- **Keyboard**: handle `onKeyEvent` (`isCtrlPressed && key == Key.S`, etc.) for Save/Undo/Redo; `focusable()` for keyboard navigation; framework handles IME for `TextField`.
- **Mouse/trackpad**: `View.OnContextClickListener` for right-click menus; hover feedback and pointer icons; drag-and-drop of notes (ChromeOS: `requestDragAndDropPermissions()`, `DRAG_FLAG_GLOBAL`).
- **Stylus/USI**: capture via `pointerInteropFilter`; use `getToolType`/`getPressure`/`AXIS_TILT`, historical points, and palm rejection as above. On ChromeOS, register as the default note-taker with an intent filter for `org.chromium.arc.intent.action.CREATE_NOTE` (blank note or annotate-image entry point).

### USI 2.0 / Chromebook & Pixel Tablet styluses
USI (Universal Stylus Initiative) is the cross-vendor active-stylus standard used by Chromebooks and the **Google Pixel Tablet**. **USI 2.0** styluses provide up to **4096 pressure levels**, tilt, and hardware palm rejection, and are cross-compatible across many Chromebook brands **(hardware-spec claims from retailer/Wikipedia snippets — treat as background, unverified vs. an official spec page)**. From the app side, USI pens surface through the same `MotionEvent` stylus axes, so no separate SDK is required.

---

## 9. S Pen (Samsung)

### Galaxy S Pen Remote SDK
Adds **Air actions** — remote control via the S Pen's Bluetooth-LE button and motion sensors. Two interaction types: **button events** (single press, double press) and **gestures** (Up, Down, Left, Right, Clockwise, Counterclockwise) on pens with accelerometer + 3D gyroscope. Core classes: **`SpenRemote`** (entry point; `initialize(Context)` before use; query feature support), **`SpenUnitManager`**, **`ButtonEvent`**, **`AirMotionEvent`**. Device support: **Note 9** S Pen is BLE + button only; **Note 10/20, S22 Ultra, Tab S6/S7/S8, and S Pen Pro** add accelerometer + gyroscope for gestures. Constraint: **only one remote action per app** (extra RemoteActions are ignored), configured via `remote_action.xml`. For a note app: map a single S Pen click to "new note" or "start recording," and air gestures to page turns. (Basic S Pen barrel-button presses are also readable through standard `MotionEvent` button state without the SDK.)

---

## 10. Motion, navigation & design system

### Predictive back
A gesture that previews the destination during a back swipe (back-to-home, cross-activity, cross-task). System animations are **enabled by default on Android 15+** for apps migrated to supported back handling, and for apps **targeting Android 16 (API 36) on Android 16 devices, predictive back is default and `onBackPressed` is no longer called** (nor is `KEYCODE_BACK` dispatched). Migrate to `OnBackPressedCallback` (AppCompat 1.6.0-alpha05+) or the platform `OnBackInvokedCallback`; Navigation Compose needs 2.8.0+. Relevant for note editors with multi-step flows (discard-changes confirmation, nested panels).

### Material 3 Expressive
Google's "bold new direction for design" and "most-researched update" (46 studies, 18,000+ participants; claims important buttons found **4× faster** than older Material You). Design levers: **color, shape, size, motion, containment**, with **springy** spring-based animations, brighter dynamic color, emphasized typography, and shape-morphing components. Shown at **Google I/O 2025**, shipping first on **Pixel** and rolling into **Android 16 / Wear OS 6**. Includes system features like **Live Updates** (progress from delivery/rideshare/navigation) and customizable Quick Settings. For a note app: adopt M3 Expressive components, spring motion, and dynamic theming for a modern, cohesive feel.

---

## Feature → API map

| Note-app feature | Primary API / library | Key symbols / notes | Min / status |
|---|---|---|---|
| Freehand ink capture & render | Jetpack **Ink** (`androidx.ink`) | `InProgressStrokesView`/`InProgressStrokes`, `Stroke`, `StrokeInputBatch`, `Brush`/`StockBrushes`, `CanvasStrokeRenderer` | Stable 1.0.0 (Dec 2025); API 21+ |
| Sub-frame drawing latency | **Low-latency graphics** (`androidx.graphics.lowlatency`) | `GLFrontBufferedRenderer`, `CanvasFrontBufferedRenderer`, `LowLatencyCanvasView` (~4ms) | API 29+ |
| Pen pressure/tilt/orientation/hover | **MotionEvent** | `getPressure`, `AXIS_TILT`, `AXIS_ORIENTATION`, `AXIS_DISTANCE`, `getToolType` | Platform |
| Barrel/eraser buttons | **MotionEvent** | `getButtonState` (`BUTTON_STYLUS_PRIMARY/SECONDARY`), `TOOL_TYPE_ERASER` | Platform |
| Palm rejection | **MotionEvent** | `ACTION_CANCEL`, `FLAG_CANCELED` | FLAG_CANCELED = Android 13+ |
| Smoother/lower-latency strokes | Historical events + **motion prediction** | `getHistorical*`, `requestUnbufferedDispatch`; `MotionEventPredictor.record/predict` | prediction lib API 19+ |
| Handwrite into text fields | **Stylus handwriting** | Auto for `EditText`/`WebView`; `setAutoHandwritingEnabled`, `setHandwritingBoundsOffsets`, delegation | Android 14 (API 34)+ |
| Handwriting → text (offline) | **ML Kit Digital Ink Recognition** | `Ink`/`Stroke`/`StrokePoint`; 300+ languages; gesture/shape/emoji | On-device, offline |
| Summarize / proofread / rewrite / describe image | **ML Kit GenAI** (Gemini Nano / AICore) | Summarization, Proofreading, Rewriting, Image Description | Beta; Pixel 9+/S25+/OnePlus 13+ |
| Custom on-device prompts | **ML Kit GenAI Prompt API** | text + multimodal to Gemini Nano | Beta (device/version tiers) |
| Voice notes → text | **GenAI Speech Recognition** (alpha) / platform `SpeechRecognizer` | `createOnDeviceSpeechRecognizer()` | GenAI alpha; platform API 33+ |
| View PDFs | **Jetpack PDF** (`androidx.pdf`) / `PdfRenderer` | `PdfViewerFragment`, `PdfView`; search/select/forms | beta01; backported minSdk 28 |
| Annotate PDFs | **Jetpack PDF + Ink** | `EditablePdfViewerFragment` (pen/highlighter/eraser), OCR via `MlKitOcrProvider` | `@ExperimentalPdfApi` |
| Sign-in / passkeys | **Credential Manager** | passkeys, passwords, Sign in with Google | API 19+ |
| Encrypt notes at rest | **Android Keystore** (+ AES-GCM) | `KeyGenParameterSpec`, `setIsStrongBoxBacked`, `setUserAuthenticationParameters` | Keystore platform; StrongBox API 28+ |
| Biometric gate | **BiometricPrompt** + Keystore | `CryptoObject`, `authenticate()` | Platform |
| ~~EncryptedFile/EncryptedSharedPreferences~~ | **Jetpack Security — DEPRECATED** | migrate to Keystore + platform APIs | Deprecated 1.1.0 (2025) |
| Anti-abuse / attestation | **Play Integrity API** | app/device/account verdicts; standard vs classic | Replaces SafetyNet |
| User-owned file access | **Storage Access Framework** | `ACTION_OPEN/CREATE_DOCUMENT`, `OPEN_DOCUMENT_TREE`, `takePersistableUriPermission` | API 19/21+ |
| Cloud sync w/o backend | **Google Drive REST API** | `SyncAdapter`, Changes API, appDataFolder | Drive Android API retired |
| Adaptive layouts | **Window size classes** | `currentWindowAdaptiveInfo().windowSizeClass`; 600/840/1200/1600dp | Compose Material3 adaptive |
| Large-screen / foldable / desktop | **Adaptive apps** + Android 16 behavior | ignore orientation/resize on sw≥600dp (API 36); edge-to-edge enforced | Android 16 (API 36) |
| S Pen remote/air actions | **Samsung S Pen Remote SDK** | `SpenRemote`, `SpenUnitManager`, `ButtonEvent`, `AirMotionEvent` | Samsung Galaxy w/ BLE S Pen |
| Chromebook / Pixel Tablet stylus | **USI (2.0)** via MotionEvent | 4096 pressure, tilt, palm rejection | no separate SDK |
| Back-gesture preview | **Predictive back** | `OnBackPressedCallback` / `OnBackInvokedCallback` | default Android 16 (API 36) |
| Modern look & motion | **Material 3 Expressive** | spring motion, dynamic color, shape morph | I/O 2025 / Android 16 |

---

## Recommendations distilled for a note app

1. **Draw with Ink API + motion prediction + low-latency rendering.** It's now stable, handles brushes/geometry/erase/serialization, and reaches ~4ms latency; do not hand-roll stroke rendering.
2. **Get handwriting-to-text two ways:** free platform stylus handwriting in text fields (Android 14+) for form entry, and ML Kit Digital Ink Recognition (offline, 300+ languages) for note-body transcription of Ink strokes.
3. **Lean into on-device Gemini Nano** (ML Kit GenAI) for summaries, proofreading, rewrite, image description, and (alpha) voice-note transcription — private and free of server cost, on supported flagships.
4. **Encrypt with Keystore, not Jetpack Security** — the latter is deprecated as of 2025; use hardware-backed AES-GCM keys with optional biometric binding, and Credential Manager passkeys for sign-in.
5. **Design adaptive from day one** — window size classes for list/detail panes, Android 16's forced resizability on ≥600dp, predictive back, and Material 3 Expressive; support keyboard/mouse/stylus for Chromebooks and the Pixel Tablet.
6. **Sync user-owned files** via SAF + Drive REST (appDataFolder + SyncAdapter) to avoid running a backend, and protect any backend you do run with Play Integrity.

---

## Sources

Pages fetched and read in full:

- Ink API modules — https://developer.android.com/develop/ui/compose/touch-input/stylus-input/ink-api-modules
- Introducing Ink API (Android Developers Blog, Oct 2024) — https://android-developers.googleblog.com/2024/10/introducing-ink-api-jetpack-library.html
- androidx.ink releases — https://developer.android.com/jetpack/androidx/releases/ink
- androidx.graphics.lowlatency API reference — https://developer.android.com/reference/androidx/graphics/lowlatency/package-summary
- Advanced stylus features (Views) — https://developer.android.com/develop/ui/views/touch-and-input/stylus-input/advanced-stylus-features
- Stylus input in text fields (Views) — https://developer.android.com/develop/ui/views/touch-and-input/stylus-input/stylus-input-in-text-fields
- Input compatibility on large screens (Compose) — https://developer.android.com/develop/ui/compose/touch-input/input-compatibility-on-large-screens
- ML Kit Digital Ink Recognition — https://developers.google.com/ml-kit/vision/digital-ink-recognition
- ML Kit GenAI APIs overview — https://developers.google.com/ml-kit/genai
- Latest Gemini Nano with ML Kit GenAI APIs (Android Developers Blog, Aug 2025) — https://android-developers.googleblog.com/2025/08/the-latest-gemini-nano-with-on-device-ml-kit-genai-apis.html
- Jetpack PDF (androidx.pdf) releases — https://developer.android.com/jetpack/androidx/releases/pdf
- About Sign in with Google (Credential Manager) — https://developer.android.com/identity/sign-in/credential-manager-siwg
- Play Integrity API overview — https://developer.android.com/google/play/integrity/overview
- Android Keystore system — https://developer.android.com/privacy-and-security/keystore
- Jetpack Security releases (deprecation) — https://developer.android.com/jetpack/androidx/releases/security
- Use window size classes (Adaptive apps) — https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes
- Behavior changes: apps targeting Android 16 — https://developer.android.com/about/versions/16/behavior-changes-16
- Material 3 Expressive launch (blog.google) — https://blog.google/products-and-platforms/platforms/android/material-3-expressive-android-wearos-launch/
- Samsung Galaxy S Pen Remote SDK overview — https://developer.samsung.com/galaxy-spen-remote/overview.html
- Storage Access Framework / document provider — https://developer.android.com/guide/topics/providers/document-provider
- Sync Google Drive files using the Drive REST API (Google Cloud blog) — https://cloud.google.com/blog/products/application-development/sync-google-drive-files-to-apps-using-the-drive-rest-api-bidding-farewell-to-the-drive-android-api

Additional pages consulted via search-result snippets (not fetched in full; claims drawn from them are labeled or corroborated):

- androidx.input.motionprediction reference — https://developer.android.com/reference/androidx/input/motionprediction/package-summary
- ML Kit GenAI Prompt API (Android) — https://developers.google.com/ml-kit/genai/prompt/android
- ML Kit GenAI Speech Recognition (Android) — https://developers.google.com/ml-kit/genai/speech-recognition/android
- Digital Ink Recognition base models — https://developers.google.com/ml-kit/vision/digital-ink-recognition/base-models
- On-device speech / SpeechRecognizer (Microsoft Learn API mirror, Picovoice guide) — https://learn.microsoft.com/en-us/dotnet/api/android.speech.speechrecognizer.createondevicespeechrecognizer
- Predictive back gesture guide — https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture
- Google I/O 2025 — Build next-level UX with Material 3 Expressive — https://io.google/2025/explore/technical-session-24/
- S Pen Remote SpenRemote class reference — https://developer.samsung.com/galaxy-spen-remote/api-reference/com/samsung/android/sdk/penremote/SpenRemote.html
- Universal Stylus Initiative (Wikipedia, background) — https://en.wikipedia.org/wiki/Universal_Stylus_Initiative
