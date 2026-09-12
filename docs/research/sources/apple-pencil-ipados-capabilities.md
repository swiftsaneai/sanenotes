# Apple Pencil & iPadOS Capabilities for Note Apps (2025–2026)

A developer-facing survey of every platform capability a best-in-class iPad note app can use, drawn from Apple developer documentation, WWDC sessions, and Apple support pages. Targets iPadOS 18 → iPadOS 26 (the current release as of Sept 2026), with forward notes where relevant. Anything I could not fully confirm from a fetched page is marked **(unverified)**.

---

## 1. Apple Pencil generations & capabilities

### The four Apple Pencil models
Apple's `ApplePencil` framework/documentation recognizes four variants, each with a different capability envelope:

- **Apple Pencil (1st generation)** — pressure/force, tilt (altitude), azimuth. **Does not support** Apple Pencil interactions (no double-tap, no squeeze). Lightning/adapter pairing.
- **Apple Pencil (2nd generation)** — everything the 1st gen has **plus double-tap**, magnetic attach/pair/charge, and (on M2/M4 iPads) **hover**.
- **Apple Pencil (USB-C)** — the value model: pressure-sensitive? No — the USB-C Pencil supports tilt and hover but **not pressure** and **not double-tap/squeeze** **(unverified — confirm exact matrix on the compare page)**. Magnetic attach, wired USB-C pairing/charging.
- **Apple Pencil Pro** — the full stack: pressure, tilt, azimuth, **roll angle (barrel roll)**, **squeeze gesture**, **haptic feedback**, **hover**, **double-tap**, and **Find My** integration. Requires iPadOS 17.5+.

### Sensing data every drawing app can read
The `ApplePencil` docs state Apple Pencil provides **azimuth, altitude, roll angle, and force (tip pressure)** for building rich drawing experiences. These arrive through `UITouch` (see §3) and, during interactions, through a hover pose.

### Interaction gestures
- **Double-tap** — supported on Apple Pencil 2nd gen and Apple Pencil Pro. Delivered via `UIPencilInteraction` / `UIPencilInteractionDelegate` (UIKit) or `onPencilDoubleTap` (SwiftUI). The user's chosen action is exposed as `UIPencilInteraction.preferredTapAction`.
- **Squeeze** — **Apple Pencil Pro only.** Delivered via `pencilInteraction(_:didReceiveSqueeze:)` (UIKit) or the `.onPencilSqueeze { phase in … }` modifier (SwiftUI). The squeeze object carries a `phase` (`.began`/`.changed`/`.ended`) and a `hoverPose`. The user's preferred behavior is `UIPencilInteraction.preferredSqueezeAction` / the `\.preferredPencilSqueezeAction` SwiftUI environment value, which can be `.showContextualPalette` or `.runSystemShortcut` (when the preference is `.runSystemShortcut`, your app does **not** receive the squeeze).
- **Barrel roll** — Apple Pencil Pro's gyroscope reports a **roll angle** for rotating shaped/chisel-tip brushes. Exposed as `rollAngle` on `UITouch` and on `UIHoverGestureRecognizer`. Roll is initially estimated and refined over Bluetooth, so implement `touchesEstimatedPropertiesUpdated(_:)` to capture accurate final values. Combining `rollAngle` with `azimuth` gives the most responsive brush orientation.
- **Hover pose** — squeeze and double-tap events carry a hover pose (`UIPencilHoverPose`) describing `location`, `z-offset` (distance above the display), `azimuth`, `altitude`, and `roll`. Useful for anchoring a contextual palette where the pencil is pointing.

### Haptic feedback (Apple Pencil Pro)
The Pro has a custom haptic engine. Developers do **not** call a Pencil-specific haptics API — they use standard feedback generators, which the system routes to the Pencil when appropriate:
- **UIKit:** `UICanvasFeedbackGenerator(view:)` with `alignmentOccurred(at:)` (snap-to-guide) and `pathCompleted(at:)` (shape recognized/closed). Note: as of iOS 18 all `UIFeedbackGenerator` subclasses take a **view + point** so feedback is spatially contextual.
- **SwiftUI:** `.sensoryFeedback(_:trigger:)` with `.alignment` and `.pathComplete` cases.

### Find My
Apple Pencil Pro can be located with **Find My** (a first for Apple Pencil). This is an OS/user feature, not an app API.

### Hover device support
Hover works on Apple Pencil (2nd gen) and Pro with M-series iPads: iPad Pro (M4), 11-inch/12.9-inch iPad Pro, iPad Air (M2/M3), and iPad mini (A17 Pro), per the Pencil Pro tech-specs page.

---

## 2. PencilKit

PencilKit gives you a ready-made, system-quality drawing surface with low-latency rendering, palm rejection, and the same tools/inks used by Apple Notes.

### Core model types (all `struct` unless noted)
- **`PKCanvasView`** (class, subclass of `UIScrollView`) — captures Pencil/finger input and renders it with built-in low latency. Scrolls with a two-finger pan; supports canvases larger than the visible frame.
- **`PKDrawing`** — the captured drawing; a list of strokes. `Codable`, so it persists to files/Core Data/SwiftData and converts to a `UIImage` (`image(from:scale:)`).
- **`PKStroke`** — paths, bounds, ink, transform of one stroke.
- **`PKStrokePath`** / **`PKStrokePoint`** — the sampled points (location, timeOffset, size, opacity, force, azimuth, altitude) and interpolation methods. This is where per-point pressure/tilt live for a PencilKit stroke.
- **`PKInk`** — an ink's type + color + width.

### Tools
- **`PKInkingTool`** with **`PKInkingTool.InkType`** cases: `pen`, `pencil`, `marker`, `monoline`, `fountainPen`, `watercolor`, `crayon` (the watercolor/crayon/fountainPen/monoline set arrived in iPadOS 17). An inking tool carries `color`, `width`, and `requestedZIndex`.
- **`PKEraserTool`** — bitmap (pixel), vector (whole-stroke), and fixed-width eraser modes.
- **`PKLassoTool`** — select strokes for move/copy/delete.
- **`PKToolPicker`** (class) — the floating palette of tools/colors. Add it to the responder chain and toggle visibility.

### Tool picker customization (WWDC24)
- New initializer **`PKToolPicker(toolItems: [PKToolPickerItem])`** to build a custom palette.
- Item factories: `PKToolPickerItem.inkingTool()`, `.eraserTool()`, `.lassoTool()`, `.ruler()` (toggles `isRulerActive`), `.scribble()` (handwriting-to-text).
- **`PKToolPickerCustomItem`** for your own tools, with a `Configuration` (`colorOptions: .hideColorPalette/.showColorPalette`, `widthOptions: .hideSlider/.showSlider`, `attributeViewController:` for custom properties) and an image closure `{ size, hasAlpha, colorOptions, width, color, opacity in … }`; call `reloadImage()` when attributes change.
- Accessory buttons: `setAncillaryItems([UIBarButtonItem], animated:)` on the trailing edge.

### Canvas configuration
- **`drawingPolicy`** (`PKCanvasViewDrawingPolicy`: `.default`, `.anyInput`, `.pencilOnly`) — controls whether finger input draws. Replaces the deprecated `allowsFingerDrawing`.
- **`isRulerActive`**, **`tool`** (current `PKTool`), **`drawing`** (the `PKDrawing`).
- **`PKCanvasViewDelegate`** — `canvasViewDrawingDidChange(_:)`, `canvasViewDidBeginUsingTool(_:)`, etc., to react to edits and drive undo/save.
- Availability of the WWDC24 tool-picker and Pencil Pro APIs: **iOS/iPadOS 18+, visionOS 2+**.

### When to use PencilKit vs. custom Metal
Use PencilKit when you want Apple-quality inks, palm rejection, the standard tool picker, and Scribble "for free." Drop to custom Metal (§4) when you need proprietary brushes, custom blending, huge documents, or your own rendering pipeline.

---

## 3. `UITouch` / raw input properties

For custom canvases (non-PencilKit), read Pencil data directly from touches.

- **`force`** — tip pressure (normalized; `maximumPossibleForce` gives the scale). Pencil reports true pressure; finger uses a coarser estimate.
- **`altitudeAngle`** — tilt of the stylus in radians (π/2 = perpendicular).
- **`azimuthAngle(in:)`** and **`azimuthUnitVector(in:)`** — compass direction the pencil points.
- **`rollAngle`** — barrel roll (Apple Pencil Pro).
- **`type`** — `.pencil` vs `.direct` (finger) to branch behavior/palm rejection.

### High-fidelity capture
- **`coalescedTouches(for:)`** on `UIEvent` — UIKit delivers touches to the app at ~60 Hz, but iPad hardware samples up to **240 Hz** with Apple Pencil. Coalesced touches return *every* intermediate sample since the last event so strokes are smooth. **Must be read inside the event handler** — they are not retained afterward.
- **`predictedTouches(for:)`** on `UIEvent` — the system's best guess of upcoming touch locations based on trajectory. Draw the predicted segment to hide latency, then **discard and replace** it when the real touches arrive.

### Estimated properties (Bluetooth latency)
Some properties (notably `force` and `rollAngle`) arrive first as estimates over the digitizer, then get corrected over Bluetooth:
- **`estimatedProperties`** — which properties are currently estimates.
- **`estimatedPropertiesExpectingUpdates`** — which will be updated later.
- **`estimationUpdateIndex`** — correlates an update to the original touch.
- **`touchesEstimatedPropertiesUpdated(_:)`** — delegate callback delivering the corrected values; update your stored stroke data here.

Apple's sample projects "Illustrating the force, altitude, and azimuth properties of touch input" and "Getting high-fidelity input with coalesced touches" demonstrate the full pattern.

---

## 4. Low-latency drawing (Metal, ProMotion, UIUpdateLink)

To beat PencilKit's already-low latency (or to render custom brushes), the recommended stack:

- **`UIUpdateLink`** (iOS/iPadOS 18+) — the modern replacement for `CADisplayLink` for drawing. Create with `UIUpdateLink(view:)`; set `isEnabled`, `requiresContinuousUpdates`, `preferredFrameRateRange`, `wantsImmediatePresentation`, and **`wantsLowLatencyEventDispatch`** (dispatches input events with minimal delay — Apple explicitly lists "custom low-latency drawing for a pencil-drawing app" as the primary use case). Add work with `addAction(to:)` at specific update phases. **Main thread only.**
- **ProMotion 120 Hz** — iPad Pro displays refresh up to 120 Hz, halving frame time vs. 60 Hz. Use `preferredFrameRateRange` to request high rates; keep per-frame work small.
- **Metal + `CAMetalLayer`** — render strokes on the GPU. For lowest latency set **`presentsWithTransaction = true`** on the `CAMetalLayer` so the drawable is presented synchronously within the current CATransaction (avoids a frame of latency from the async present path), and call `commandBuffer.waitUntilScheduled()` before `present`. **(mechanism confirmed by general Metal low-latency guidance; verify exact call order against the current sample) (unverified)**
- **Latency techniques together:** read `coalescedTouches`, draw the confirmed segment, extend with `predictedTouches`, present via `CAMetalLayer`/`UIUpdateLink`, and reconcile estimated properties on update. Apple's classic "SpeedSketch" sample shows the pattern.

### Palm rejection
- PencilKit rejects palms automatically. For custom canvases, branch on `UITouch.type == .pencil` and treat `.direct` touches as gestures (scroll/zoom) rather than ink, and consider `PKCanvasViewDrawingPolicy.pencilOnly`-style logic. Use `UIGestureRecognizer` coordination so two-finger pans scroll instead of drawing.

---

## 5. Scribble & handwriting-to-text

- **Scribble** converts Apple Pencil handwriting into typed text in any text field, system-wide, in supported languages. Text fields get it for free.
- **`UIScribbleInteraction`** — customize/suppress Scribble on real text-input views (delay first-responder until handwriting pauses, be notified when writing begins/ends, or disable it in specific spots).
- **`UIIndirectScribbleInteraction`** — enable "write anywhere" on views that are **not** formally text inputs. Its `UIIndirectScribbleInteractionDelegate` describes writable "elements" (regions) within your view so the user can handwrite into custom UI. Documented under "Customizing Scribble with interactions."
- PencilKit's `PKToolPickerItem.scribble()` adds a handwriting-to-text tool inside the drawing canvas.

---

## 6. Handwriting / text recognition (Vision)

- **`VNRecognizeTextRequest`** — OCR request.
  - `recognitionLevel`: `.accurate` (neural, best quality, needed for handwriting) vs `.fast` (fast path for live/simple text).
  - `recognitionLanguages` (priority-ordered), `supportedRecognitionLanguages()`, `automaticallyDetectsLanguage`.
  - `usesLanguageCorrection`, `customWords` (domain vocabulary), `minimumTextHeight`, request `revision` (current revision 3).
  - **Handwriting:** the `.accurate` path recognizes handwriting for a subset of (primarily Latin-script) languages such as English; the exact handwriting-supported language list is narrower than the printed-text list. **(exact list unverified — query `supportedRecognitionLanguages()` at runtime.)**
- **`RecognizeDocumentsRequest`** / **`DocumentObservation`** (Vision, iOS/iPadOS 26) — structured document understanding beyond flat OCR: extracts groups of text and barcodes, reads **tables and lists**, and groups content by words/lines/paragraphs. Ideal for a "scan a page into a note" feature that preserves structure. Configured with `TextRecognitionOptions` and `BarcodeDetectionOptions`.
- Live Text / `DataScannerViewController` (VisionKit) is also available for camera-based capture with selectable text and data detectors **(not separately fetched — mention only) (unverified)**.

---

## 7. On-device intelligence

### Foundation Models framework (iOS/iPadOS 26)
Direct Swift access to the ~3B-parameter on-device LLM behind Apple Intelligence — **fully on-device, offline, private, free of inference cost**, and it doesn't grow app size or memory (model lives in system space).

- **`SystemLanguageModel.default`**; check `availability` (`.available` / `.unavailable(reason)`) — requires an Apple-Intelligence-capable device in a supported region.
- **`LanguageModelSession(model:instructions:tools:)`** — multi-turn session; `isResponding`, inspectable `transcript`.
- **`respond(to:generating:)`** and **`streamResponse(to:generating:)`** (snapshot streaming of `PartiallyGenerated<T>`).
- **Guided generation:** annotate a Swift `struct`/`enum` with **`@Generable`** and fields with **`@Guide(description:… , .count(n))`** to get typed, schema-constrained output (great for turning a note into a structured summary, action items, tags).
- **Tool calling:** conform to `Tool` (name, description, `@Generable Arguments`, `call(arguments:) -> ToolOutput`) so the model can invoke app functions.
- **Built-in adapters:** `SystemLanguageModel(useCase: .contentTagging)` for tagging/entity/topic extraction.
- **Errors:** guardrail violation, unsupported language, context-window exceeded.
- **Tooling:** Xcode `#Playground` for prompt iteration, an Instruments template for LLM latency, runs in the Simulator.
- Ideal note-app uses: on-device summarize, rewrite/refine, generate title, extract action items, smart tags, Q&A over a note — with zero network.
- **WWDC26 forward look:** the framework is gaining alternative model backends (Private Cloud Compute, Core AI, MLX) and partner models, swappable behind the same `LanguageModelSession` API. **(forward-looking) (unverified specifics)**

### Speech / SpeechAnalyzer (iOS/iPadOS 26)
Modern on-device transcription (the engine behind Notes/Voice Memos/Journal), replacing `SFSpeechRecognizer` for long-form audio.

- **`SpeechAnalyzer`** — session coordinator that routes audio buffers to modules; timecode-scheduled, async.
- **`SpeechTranscriber`** — the speech-to-text module: `SpeechTranscriber(locale:transcriptionOptions:reportingOptions:attributeOptions:)`. `reportingOptions: [.volatileResults]` gives instant low-accuracy partials; finalized results are stable (`result.isFinal`, `result.text` is an `AttributedString`). `attributeOptions: [.audioTimeRange]` yields `CMTimeRange` per run for tap-to-play sync.
- **`SpeechDetector`** — voice-activity detection.
- **`AssetInventory`** — downloads/manages per-language model assets (`assetInstallationRequest(supporting:)`, `downloadAndInstall()`, `allocatedLocales`, `deallocate(locale:)`); `SpeechTranscriber.supportedLocales` / `.installedLocales`.
- **`DictationTranscriber`** — fallback for languages/devices the new model doesn't cover.
- **All on-device**, long-form optimized, and transcripts (as `AttributedString`) feed straight into Foundation Models for summarization. Not available on watchOS.

---

## 8. PDF handling (PDFKit)

For import/markup/export of PDFs in a note app:
- **`PDFView`** — display widget (scroll/zoom/page modes); **`PDFThumbnailView`** for a page rail; **`PDFOutline`** for the TOC.
- **`PDFDocument`** — load/save/search; **`PDFPage`** — per-page rendering, text, selections, annotations; **`PDFSelection`** — text selection.
- **`PDFAnnotation`** — base class for annotations; subtypes include **ink**, **text (note)**, **highlight/underline/strikethrough (markup)**, **freeText**, and **widget** (form fields). Create a `PDFAnnotation`, set its bounds/type/appearance, and add it to a `PDFPage` (`page.addAnnotation(_:)`); save with `PDFDocument.write(to:)`. You can render PencilKit ink onto a PDF or store it as ink annotations.
- Platforms: iOS/iPadOS 11+, visionOS 1+.

---

## 9. Storage, sync & documents

### Document-based app patterns
- **`UIDocument`** — async open/save on background queues, safe-save (temp file then swap), autosave via `UndoManager` or `updateChangeCount(_:)`, and conflict handling: watch `stateChangedNotification`/`documentState` for `.inConflict`, resolve with `NSFileVersion.unresolvedConflictVersionsOfItem(at:)`. Adopts `NSFilePresenter`.
- **`UIDocumentViewController`** (single-doc, auto rename) and **`UIDocumentBrowserViewController`** (browse/organize) in UIKit.
- **SwiftUI:** `DocumentGroup` scene + `FileDocument` / `ReferenceFileDocument`.
- **`NSFileCoordinator`** + **`NSFilePresenter`** — coordinate reads/writes across processes and with iCloud so you never race the sync daemon. `UIDocument` uses these under the hood.
- **iCloud Drive ubiquity containers** — put documents in the app's iCloud container for automatic cross-device file sync.

### CloudKit (structured sync)
- **`CKContainer`** → **`CKDatabase`** in three scopes: **private**, **public**, **shared**.
- **`CKRecord`** (key-value data), **`CKRecordZone`** (partition for related records + change tracking).
- **`CKSyncEngine`** — modern object that manages local⇄server sync and conflict handling with much less boilerplate than raw `CKOperation`s. Recommended for new sync code.
- **`CKShare`** + shared database — real-time collaboration/sharing of notes with other iCloud users.
- **`CKSubscription`** — push-driven change notifications.
- **`NSPersistentCloudKitContainer`** — Core Data mirrored to CloudKit for near-automatic sync of a Core Data / (with SwiftData) store. Great default for a note database that must sync privately per-user.

---

## 10. Security & privacy

### Data Protection (at-rest encryption)
File protection classes (`FileProtectionType` / `NSFileProtection…`), set per-file or via entitlement:
- **`complete` (`NSFileProtectionComplete`)** — file readable only while device is **unlocked**; key evicted shortly after lock. Strongest; best default for note content.
- **`completeUnlessOpen`** — already-open files stay readable while locked (background writes).
- **`completeUntilFirstUserAuthentication`** — readable after the first unlock post-boot (the OS default).
- **`none`** — no protection.

### Keychain & Secure Enclave
- **Keychain Services** — `SecItemAdd` / `SecItemCopyMatching` / `SecItemUpdate` / `SecItemDelete`; item classes like `kSecClassGenericPassword`; accessibility constants `kSecAttrAccessibleWhenUnlocked(ThisDeviceOnly)`, `…AfterFirstUnlock(…)`; `kSecAttrAccessControl` for policy; `kSecAttrSynchronizable` for iCloud Keychain sync across the user's devices; access groups for sharing between your apps. (Overview page confirms the categories; exact constants are standard Keychain API. **(constant list from general docs) (unverified against a single fetched page)**)
- **Secure Enclave** — hardware key manager. Create a key with `SecKeyCreateRandomKey` using `kSecAttrTokenID: kSecAttrTokenIDSecureEnclave`, `kSecAttrKeyType: kSecAttrKeyTypeECSECPrimeRandom`, 256-bit — only **NIST P-256** keys are supported and they **never leave** the enclave. CryptoKit exposes `SecureEnclave.P256.Signing` / `.KeyAgreement`.
- **Access control:** `SecAccessControlCreateWithFlags(...)` with flags `.privateKeyUsage`, `.biometryCurrentSet` (invalidates the key if biometrics change — strong "note locked to current Face ID enrollment"), `.biometryAny`, `.devicePasscode`, `.userPresence`. Combine with an `LAContext` to gate key use behind Face ID.

### LocalAuthentication (Face ID / Touch ID)
- **`LAContext`**: `canEvaluatePolicy(_:error:)` then `evaluatePolicy(_:localizedReason:reply:)`.
- Policies: **`.deviceOwnerAuthenticationWithBiometrics`** (biometrics only) and **`.deviceOwnerAuthentication`** (biometrics **or** passcode fallback).
- `biometryType` (`.faceID` / `.touchID` / `.opticID` / `.none`) to tailor UI copy.
- Requires `NSFaceIDUsageDescription` in Info.plist. Perfect for "lock this note / lock the app."

### App integrity (anti-fraud)
- **`DCDevice`** (DeviceCheck) — two per-device bits stored on Apple's server, queried via a device token (e.g., flag abuse, track one-time offers) while preserving privacy.
- **`DCAppAttestService`** (App Attest) — `generateKey()`, `attestKey(_:clientDataHash:)`, `generateAssertion(_:clientDataHash:)` to cryptographically prove requests come from a genuine, unmodified instance of your app before your server trusts them. Use for protecting a sync/premium backend.

### Sign in with Apple (App Store rule)
- **App Review Guideline 4.8 (Login Services):** if your app uses a **third-party/social login** to set up or authenticate the user's **primary account**, you must **also** offer an equivalent login that (a) limits collection to name + email, (b) lets users keep email private, and (c) doesn't collect app interactions for advertising without consent. **Sign in with Apple** satisfies all three (any compliant provider is allowed). If you only use your own email/password account, 4.8 doesn't force it — but offering Sign in with Apple is a low-friction, private option users expect.

### Privacy manifests (`PrivacyInfo.xcprivacy`)
Required so the App Store can generate privacy nutrition labels and enforce required-reason APIs. Top-level keys:
- **`NSPrivacyTracking`** (Bool), **`NSPrivacyTrackingDomains`** (array), **`NSPrivacyCollectedDataTypes`** (array), **`NSPrivacyAccessedAPITypes`** (array).
- **Required-reason API categories** (each needs `NSPrivacyAccessedAPIType` + approved `NSPrivacyAccessedAPITypeReasons`): **File timestamp APIs**, **System boot time APIs**, **Disk space APIs**, **Active keyboard APIs**, and **User defaults APIs**. A note app using `UserDefaults`, file timestamps (e.g., for "modified" dates), or disk-space checks must declare the matching reason codes.
- **Enforcement:** since **May 1, 2024**, App Store Connect rejects apps that don't describe required-reason API use; certain popular third-party SDKs must ship a **signed** privacy manifest.

---

## 11. iPadOS system integration

### Multitasking & windowing (iPadOS 26)
iPadOS 26 introduced a major new **windowing system** (WWDC25 "Elevate the design of your iPad app," session 208):
- **Resizable, overlapping windows** that float above the wallpaper — every multitasking-capable app gets a **resize handle** in the bottom-right corner.
- **Window controls** on the leading edge of the toolbar (traffic-light-style) that enlarge on tap and, when held, reveal **tiling layout** shortcuts.
- A persistent **menu bar** at the top edge (pointer to top or swipe down) that apps populate with custom menus.
- The app menu lists **all open windows**; apps should give windows **descriptive names**.
- Guidance: adopt **additive windowing** — open a **new window per document/note** rather than replacing content.
- Coexists with **Stage Manager** (grouped resizable windows + external display), **Split View**, **Slide Over**, and Picture-in-Picture. Apps should support **multiple scenes/windows** (`UISceneSession`, `UIWindowScene`), save/restore state, and adapt layouts to any window size.
- **External display** support (extended desktop) via Stage Manager on M-series iPads.

### Quick Note
System feature (Notes app): swipe up from the **bottom-right corner** with Apple Pencil or finger, or invoke from Control Center, to drop a floating note over any app. It captures links and highlights from Safari/other apps and stores entries in the **Quick Notes** folder in Notes. Apps can make their content Quick-Note-linkable via `NSUserActivity` **(mechanism general knowledge) (unverified)**.

### App Intents / Shortcuts / Siri / Spotlight
- **`AppIntent`** (with **`@Parameter`**) exposes app actions to Siri, Spotlight, Shortcuts, and widgets.
- **`AppEntity`** + **`EntityQuery`** expose your data types (e.g., a Note) to the system.
- **`AppShortcut`** / **`AppShortcutsProvider`** predefine zero-config shortcuts and Siri phrases.
- **Interactive snippets** present intent results visually; App Intents also power interactive widgets and (2026) **Visual Intelligence** ("find images matching my app's content").
- Great for "create a note," "append to today's note," "search notes" voice/Spotlight actions.

### Widgets (WidgetKit)
- **`Widget`** + **`TimelineProvider`**/**`TimelineEntry`** for content updates.
- **`StaticConfiguration`** vs **`AppIntentConfiguration`** (user-configurable + interactive).
- Families: `systemSmall`/`systemMedium`/`systemLarge`/`systemExtraLarge` (iPad supports extra-large), plus **accessory/Lock Screen** widgets.
- **Interactive widgets:** `Button`/`Toggle` backed by App Intents run without launching the app.
- **`ControlWidget`** — Control Center / Lock Screen / Action Button controls (e.g., "New Quick Note"-style shortcut into your app).

### Live Activities (ActivityKit)
- **`Activity`**, **`ActivityAttributes`**, **`ActivityContent`**; Lock Screen + **Dynamic Island** (compact/minimal/expanded) presentations; Home Screen surfacing on iPad.
- Updated in-app or via **ActivityKit push notifications** (push tokens).
- **Available on iPadOS 16.1+** (not visionOS). Lower priority for a note app, but usable for long transcription/export/sync progress.

---

## Feature → API map

| Feature (what the note app wants) | Primary API / type | Framework | Notes / min OS |
|---|---|---|---|
| Tip pressure | `UITouch.force`, `PKStrokePoint.force` | UIKit / PencilKit | Pencil (not USB-C) |
| Tilt (altitude) | `UITouch.altitudeAngle` | UIKit | all Pencils |
| Azimuth (direction) | `UITouch.azimuthAngle(in:)`, `azimuthUnitVector(in:)` | UIKit | all Pencils |
| Barrel roll | `UITouch.rollAngle`, `UIHoverGestureRecognizer.rollAngle` | UIKit | **Pencil Pro**, iPadOS 17.5+ |
| Double-tap gesture | `UIPencilInteraction`/`…Delegate`, `onPencilDoubleTap`, `preferredTapAction` | UIKit / SwiftUI | Pencil 2 & Pro |
| Squeeze gesture | `didReceiveSqueeze:`, `.onPencilSqueeze`, `preferredSqueezeAction` | UIKit / SwiftUI | **Pencil Pro**, iOS/iPadOS 18 |
| Hover | `UIHoverGestureRecognizer`, `UIPencilHoverPose` | UIKit | Pencil 2/Pro on M-iPads |
| Haptic feedback | `UICanvasFeedbackGenerator`, `.sensoryFeedback(.alignment/.pathComplete)` | UIKit / SwiftUI | Pencil Pro; iOS 18 |
| Find My pencil | (OS feature) | — | Pencil Pro |
| Ready-made drawing canvas | `PKCanvasView`, `PKDrawing`, `PKToolPicker` | PencilKit | iOS 13+; new tools iOS 18 |
| Ink types (pen…crayon) | `PKInkingTool.InkType` (`pen`,`pencil`,`marker`,`monoline`,`fountainPen`,`watercolor`,`crayon`) | PencilKit | watercolor/crayon: iPadOS 17 |
| Custom palette | `PKToolPicker(toolItems:)`, `PKToolPickerCustomItem` | PencilKit | iOS 18 |
| Finger-vs-pencil policy | `PKCanvasViewDrawingPolicy`, `UITouch.type` | PencilKit / UIKit | — |
| High-frequency samples (240 Hz) | `UIEvent.coalescedTouches(for:)` | UIKit | read in handler |
| Predict ahead / hide latency | `UIEvent.predictedTouches(for:)` | UIKit | discard on real touch |
| Corrected pressure/roll | `estimatedProperties`, `touchesEstimatedPropertiesUpdated(_:)` | UIKit | Bluetooth updates |
| Low-latency render loop | `UIUpdateLink` (`wantsLowLatencyEventDispatch`), `preferredFrameRateRange` | UIKit | iOS 18 |
| GPU custom brushes | Metal, `CAMetalLayer.presentsWithTransaction` | Metal / QuartzCore | ProMotion 120 Hz |
| Handwriting → text (fields) | Scribble, `UIScribbleInteraction` | UIKit | supported languages |
| Write-anywhere handwriting | `UIIndirectScribbleInteraction` | UIKit | custom views |
| OCR / handwriting from image | `VNRecognizeTextRequest` (`.accurate`), `RecognizeDocumentsRequest`/`DocumentObservation` | Vision | Docs req iOS 26 |
| On-device LLM (summarize/tags) | `LanguageModelSession`, `@Generable`, `@Guide`, `Tool` | Foundation Models | iOS/iPadOS 26 |
| On-device transcription | `SpeechAnalyzer`, `SpeechTranscriber`, `AssetInventory` | Speech | iOS/iPadOS 26 |
| PDF view + markup | `PDFView`, `PDFDocument`, `PDFPage`, `PDFAnnotation` (ink/highlight/freeText) | PDFKit | iOS 11+ |
| Local documents + autosave | `UIDocument`, `DocumentGroup`, `FileDocument` | UIKit / SwiftUI | conflict via `NSFileVersion` |
| Cross-process/iCloud file safety | `NSFileCoordinator`, `NSFilePresenter` | Foundation | — |
| Structured cloud sync | `CKSyncEngine`, `CKRecord`, `CKShare`, `NSPersistentCloudKitContainer` | CloudKit / Core Data | — |
| At-rest encryption | `FileProtectionType.complete` (`NSFileProtectionComplete`) | Foundation | best default |
| Secrets storage | Keychain (`SecItemAdd`, `kSecClassGenericPassword`, `kSecAttrSynchronizable`) | Security | iCloud Keychain optional |
| Hardware-bound keys | `SecureEnclave.P256`, `kSecAttrTokenIDSecureEnclave`, `SecAccessControlCreateWithFlags` | CryptoKit / Security | P-256 only |
| Lock note w/ Face ID | `LAContext.evaluatePolicy(.deviceOwnerAuthentication…)` | LocalAuthentication | needs `NSFaceIDUsageDescription` |
| App/backend integrity | `DCAppAttestService`, `DCDevice` | DeviceCheck | anti-fraud |
| Required login option | Sign in with Apple (Guideline 4.8) | AuthenticationServices | if using social login |
| Privacy compliance | `PrivacyInfo.xcprivacy` (`NSPrivacyAccessedAPITypes`) | bundle resource | since May 1 2024 |
| Windowing / multiple notes | Scenes (`UIWindowScene`), additive windows, menu bar | UIKit/SwiftUI | iPadOS 26 windowing |
| System quick capture | Quick Note (`NSUserActivity` linking) | Notes / Foundation | OS feature |
| Voice/Spotlight actions | `AppIntent`, `AppEntity`, `AppShortcut` | App Intents | iOS 16+ |
| Home/Lock/Control widgets | `Widget`, `AppIntentConfiguration`, `ControlWidget` | WidgetKit | interactive: iOS 17+ |
| Progress activities | `Activity`, `ActivityAttributes` | ActivityKit | iPadOS 16.1+ |

---

## Sources

- https://developer.apple.com/videos/play/wwdc2024/10214/ — WWDC24 "Squeeze the most out of Apple Pencil"
- https://developer.apple.com/documentation/ApplePencil — Apple Pencil (framework overview)
- https://developer.apple.com/documentation/uikit/apple-pencil-interactions — Apple Pencil interactions (UIPencilInteraction, hover pose, device support)
- https://support.apple.com/en-us/120123 — Apple Pencil Pro tech specs
- https://developer.apple.com/documentation/pencilkit — PencilKit overview
- https://developer.apple.com/documentation/pencilkit/pkcanvasview — PKCanvasView
- https://developer.apple.com/documentation/pencilkit/pkinkingtool/inktype — PKInkingTool.InkType (ink types)
- https://developer.apple.com/documentation/uikit/getting-high-fidelity-input-with-coalesced-touches — coalesced touches
- https://developer.apple.com/documentation/uikit/minimizing-latency-with-predicted-touches — predicted touches
- https://developer.apple.com/documentation/uikit/uiupdatelink — UIUpdateLink
- https://developer.apple.com/documentation/uikit/uiscribbleinteraction — UIScribbleInteraction
- https://developer.apple.com/documentation/uikit/uiindirectscribbleinteraction-1nfjm — UIIndirectScribbleInteraction
- https://developer.apple.com/documentation/vision/vnrecognizetextrequest — VNRecognizeTextRequest
- https://developer.apple.com/documentation/vision/recognizedocumentsrequest — RecognizeDocumentsRequest / DocumentObservation
- https://developer.apple.com/videos/play/wwdc2025/286/ — WWDC25 "Meet the Foundation Models framework"
- https://developer.apple.com/videos/play/wwdc2025/277/ — WWDC25 "Bring advanced speech-to-text to your app with SpeechAnalyzer"
- https://developer.apple.com/documentation/pdfkit — PDFKit
- https://developer.apple.com/documentation/uikit/uidocument — UIDocument / document-based apps
- https://developer.apple.com/documentation/cloudkit — CloudKit
- https://developer.apple.com/documentation/security/protecting-keys-with-the-secure-enclave — Secure Enclave keys
- https://developer.apple.com/documentation/security/keychain-services — Keychain Services
- https://support.apple.com/en-om/guide/security/secb010e978a/web — Data Protection classes (Apple Platform Security)
- https://developer.apple.com/documentation/devicecheck — DeviceCheck / App Attest
- https://developer.apple.com/documentation/bundleresources/privacy-manifest-files — Privacy manifests
- https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api — required-reason API
- https://developer.apple.com/documentation/appintents — App Intents
- https://developer.apple.com/documentation/widgetkit — WidgetKit
- https://developer.apple.com/documentation/activitykit — ActivityKit / Live Activities
- https://developer.apple.com/design/human-interface-guidelines/multitasking — iPad multitasking HIG
- https://developer.apple.com/videos/play/wwdc2025/208/ — WWDC25 "Elevate the design of your iPad app" (iPadOS 26 windowing)
- https://support.apple.com/guide/ipad/use-quick-notes-ipad998348e/ipados — Quick Note (iPad User Guide)
- https://developer.apple.com/news/?id=7j1f99yf — App Store Review Guidelines update (Guideline 4.8 context, via search)
