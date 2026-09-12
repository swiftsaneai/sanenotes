# Platform — iPad (iPadOS)

> Audience: a coding agent building the iPadOS surface of Sane Notes with **zero prior
> context**. This doc is the authoritative capability map, API table, native-plugin
> contract, and store-compliance checklist for iPad. It implements the locked decisions
> (see [`docs/product/vision-and-principles.md`](../product/vision-and-principles.md)) and
> the two-tier ink architecture in
> [`docs/architecture/overview.md`](../architecture/overview.md). It does not restate the
> design system — see [`docs/design/design-system.md`](../design/design-system.md) and
> [`docs/design/screens-and-flows.md`](../design/screens-and-flows.md).
>
> Primary research source: `research/apple-pencil-ipados-capabilities.md` (committed at
> [`../research/sources/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md))
> and `research/flutter-ink-stack.md`. Anything the research marked **(verify)** stays
> marked here — do not treat it as settled. **MUST/SHOULD/MAY** are RFC-2119.

iPad is the **flagship surface**: the reference device for the wet-ink latency budget
(≤ 16 ms pen-to-pixel, decision 7) and the surface most competitors do best. Sane Notes
MUST match or beat Apple Notes / Goodnotes / Notability on inking feel here, or the product
has no wedge.

---

## 1. Target OS versions & devices

| Axis | Support |
|---|---|
| **Min OS** | **iPadOS 17.0** (locked decision 7). Deployment target `IPHONEOS_DEPLOYMENT_TARGET = 17.0`. |
| **Primary target** | iPadOS 18 → **iPadOS 26** (current release, Sept 2026). New windowing, Foundation Models, SpeechAnalyzer, and Vision `RecognizeDocumentsRequest` are iPadOS 26 features — feature-gate them. |
| **Tier 1 devices** (CI device lab) | An **M-series ProMotion iPad Pro** (120 Hz, front-buffer Metal path) and an **iPad Air (M-series)**. These are the "≤ 16 ms" reference devices. |
| **Tier 2** | Non-ProMotion iPad (10th gen / base iPad, 60 Hz), iPad mini (A17 Pro). Manual test each release. |
| **Tier 3** | Older A-series iPads on iPadOS 17 (best-effort; still MUST run). |

See [`compatibility-matrix.md`](compatibility-matrix.md) for the full device × refresh-rate
× Pencil grid and tier rules.

**Why iPadOS 17 and not lower:** decision 7 fixes it. Note that several headline AI features
require **iPadOS 26 + Apple-Intelligence-capable hardware** and a supported region
(Foundation Models, SpeechAnalyzer). On iPadOS 17–25 or non-AI hardware the app MUST degrade
gracefully to Vision OCR + no on-device LLM (or explicit cloud opt-in per decision 6).

---

## 2. Apple Pencil generations & capability envelope

The brush engine (`sane_brushes`) and stylus plugin (`sane_stylus`) MUST feature-detect per
connected Pencil, not assume a model. Envelope (from `research/apple-pencil-ipados-capabilities.md`):

| Pencil | Pressure | Tilt | Azimuth | Barrel roll | Double-tap | Squeeze | Hover | Haptics |
|---|---|---|---|---|---|---|---|---|
| **Pencil (1st gen)** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Pencil (2nd gen)** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ (M-iPads) | ❌ |
| **Pencil (USB-C)** | ❌ **(verify exact matrix)** | ✅ | ✅ **(verify)** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Pencil Pro** | ✅ | ✅ | ✅ | ✅ (roll) | ✅ | ✅ | ✅ | ✅ |

Rules:
- Brushes that require pressure MUST fall back to velocity-derived width when
  `force`/pressure is unavailable (USB-C Pencil, finger). `sane_ink` already does
  velocity-based thinning via `perfect_freehand` `simulatePressure` — reuse it.
- Barrel roll (`rollAngle`) is **Pencil Pro only, iPadOS 17.5+**; it arrives estimated and is
  refined over Bluetooth (see §5, estimated properties). Chisel/calligraphy nibs MUST combine
  `rollAngle` with `azimuth` for orientation and reconcile the corrected value.

---

## 3. Feature → API map (iPad)

The definitive list. Native APIs live behind federated plugins (§6); the Dart/`sane_*` side
consumes them.

| Feature (what Sane Notes wants) | Native API / type | Framework | Plugin | Min OS |
|---|---|---|---|---|
| Tip pressure | `UITouch.force` / `PKStrokePoint.force` | UIKit / PencilKit | `sane_stylus` | Pencil (not USB-C) |
| Tilt (altitude) | `UITouch.altitudeAngle` | UIKit | `sane_stylus` | all Pencils |
| Azimuth | `UITouch.azimuthAngle(in:)`, `azimuthUnitVector(in:)` | UIKit | `sane_stylus` | all Pencils |
| Barrel roll | `UITouch.rollAngle`, `UIHoverGestureRecognizer.rollAngle` | UIKit | `sane_stylus` | Pencil Pro, 17.5+ |
| Double-tap | `UIPencilInteraction` / `…Delegate`, `preferredTapAction` | UIKit | `sane_stylus` | Pencil 2 & Pro |
| Squeeze | `pencilInteraction(_:didReceiveSqueeze:)`, `preferredSqueezeAction` | UIKit | `sane_stylus` | Pencil Pro, iPadOS 18 |
| Hover pose | `UIHoverGestureRecognizer`, `UIPencilHoverPose` | UIKit | `sane_stylus` | Pencil 2/Pro on M-iPads |
| Haptics | `UICanvasFeedbackGenerator(view:)` `alignmentOccurred(at:)` / `pathCompleted(at:)` | UIKit | `sane_stylus` | Pencil Pro, iOS 18 |
| **240 Hz samples** | `UIEvent.coalescedTouches(for:)` | UIKit | `sane_ink_surface` | read in handler |
| Predict-ahead | `UIEvent.predictedTouches(for:)` | UIKit | `sane_ink_surface` | discard on real |
| Corrected force/roll | `estimatedProperties`, `touchesEstimatedPropertiesUpdated(_:)` | UIKit | `sane_stylus` | BT updates |
| Low-latency render loop | `UIUpdateLink` (`wantsLowLatencyEventDispatch`), `preferredFrameRateRange` | UIKit | `sane_ink_surface` | iOS 18 |
| GPU wet-ink surface | Metal + `CAMetalLayer` (`presentsWithTransaction`) | Metal / QuartzCore | `sane_ink_surface` | — |
| Handwriting → text (fields) | Scribble, `UIScribbleInteraction` | UIKit | `sane_scribble` | supported langs |
| Write-anywhere handwriting | `UIIndirectScribbleInteraction` | UIKit | `sane_scribble` | custom views |
| OCR / ink-from-image | `VNRecognizeTextRequest(.accurate)`, `RecognizeDocumentsRequest`/`DocumentObservation` | Vision | `sane_ml_native` | Docs req iPadOS 26 |
| On-device LLM | `LanguageModelSession`, `@Generable`, `@Guide`, `Tool` | Foundation Models | `sane_ml_native` | iPadOS 26 + AI HW |
| On-device transcription | `SpeechAnalyzer`, `SpeechTranscriber`, `AssetInventory` | Speech | `sane_ml_native` | iPadOS 26 |
| PDF view + markup | `PDFView`, `PDFDocument`, `PDFPage`, `PDFAnnotation` | PDFKit | `sane_pdfkit` | iOS 11+ |
| Local docs + autosave | `UIDocument`, `NSFileCoordinator`, `NSFilePresenter` | UIKit / Foundation | `sane_cloud_drive` | conflict via `NSFileVersion` |
| iCloud file sync | iCloud Drive ubiquity container | Foundation / CloudKit | `sane_cloud_drive` | — |
| At-rest encryption | `FileProtectionType.complete` (`NSFileProtectionComplete`) | Foundation | `sane_secure_store` | best default |
| Secrets / keys | Keychain (`SecItemAdd`, `kSecClassGenericPassword`, `kSecAttrSynchronizable`) | Security | `sane_secure_store` | iCloud Keychain optional |
| Hardware-bound keys | `SecureEnclave.P256`, `kSecAttrTokenIDSecureEnclave` | CryptoKit / Security | `sane_secure_store` | P-256 only |
| Lock note w/ Face ID | `LAContext.evaluatePolicy(.deviceOwnerAuthentication)` | LocalAuthentication | `sane_secure_store` | needs `NSFaceIDUsageDescription` |
| Backend integrity | `DCAppAttestService`, `DCDevice` | DeviceCheck | (services) | anti-fraud |
| Required login option | Sign in with Apple (Guideline 4.8) | AuthenticationServices | (auth) | if social login used |
| Windowing / multi-note | Scenes (`UIWindowScene`), additive windows, menu bar | UIKit | app | iPadOS 26 windowing |
| Quick capture | Quick Note linking (`NSUserActivity`) | Foundation | app | OS feature **(verify)** |
| Voice/Spotlight actions | `AppIntent`, `AppEntity`, `AppShortcut` | App Intents | app | iOS 16+ |
| Home/Lock/Control widgets | `Widget`, `AppIntentConfiguration`, `ControlWidget` | WidgetKit | app | interactive: iOS 17+ |

---

## 4. Ink architecture on iPad (the important part)

iPad is the canonical **Tier A — native fast path** device from
[`architecture/overview.md`](../architecture/overview.md#ink-render-tiers). Restated for
this surface:

1. **Capture** the raw pointer stream twice: Flutter's `Listener`
   (`onPointerDown/Move/Up`, `PointerDeviceKind.stylus`) feeds `sane_ink` for the durable
   model; the native `sane_ink_surface` platform view reads `UITouch` +
   `coalescedTouches(for:)` for the **240 Hz** samples Flutter does not expose at framework
   level (see §9 limitation L1).
2. **Wet stroke** renders on the native `CAMetalLayer` front buffer via `UIUpdateLink`
   (`wantsLowLatencyEventDispatch = true`, `preferredFrameRateRange` up to 120 Hz), extended
   by `predictedTouches` to hide latency; the predicted segment is discarded when real
   touches land.
3. **On lift**, the finished stroke is committed to `sane_ink`/`sane_render`, flattened into
   the cached `Picture`/tile raster, and the native wet layer is cleared. The Flutter
   `Texture` widget composites the native surface beneath the Flutter UI so palette, rulers,
   and selection chrome stay in the Dart layer.
4. **Estimated-property reconciliation:** `force` and `rollAngle` arrive first as digitizer
   estimates and are corrected over Bluetooth. `sane_stylus` MUST implement
   `touchesEstimatedPropertiesUpdated(_:)`, correlate via `estimationUpdateIndex`, and patch
   the stored stroke points before serialization. Otherwise pressure/roll on fast strokes is
   subtly wrong.

**PencilKit is NOT the primary canvas.** Sane Notes needs proprietary brushes, custom
blending, huge documents, and one cross-platform render pipeline (`sane_render`), so it MUST
use the custom Metal path, not `PKCanvasView`. PencilKit MAY be used only for the
system-quality **Scribble tool** inside a text field, and as a reference implementation to
benchmark against. Palm rejection on the custom canvas branches on
`UITouch.type == .pencil`; `.direct` (finger) touches route to pan/zoom gestures, not ink
(configurable — finger-draw is opt-in, first-class on phones per
[`phones.md`](phones.md)).

---

## 5. Stylus interactions → UX bindings

| Interaction | API | Default binding in Sane Notes | Notes |
|---|---|---|---|
| **Double-tap** | `UIPencilInteraction.preferredTapAction` | Honor the user's system preference; default = toggle eraser/last tool | Pencil 2 & Pro |
| **Squeeze** | `.onPencilSqueeze { phase in … }`, `preferredSqueezeAction` | Show the **contextual tool palette** anchored at the `hoverPose.location` | Pro only; if pref is `.runSystemShortcut` the app gets **no** squeeze event — do not rely on it |
| **Hover** | `UIPencilHoverPose` (`location`, `zOffset`, `azimuth`, `altitude`, `roll`) | Brush-size/cursor preview; anchor contextual palette | Pencil 2/Pro on M-iPads |
| **Barrel roll** | `UITouch.rollAngle` | Rotate chisel/calligraphy nib | Pro; reconcile estimated value |
| **Haptics** | `UICanvasFeedbackGenerator` `alignmentOccurred(at:)` / `pathCompleted(at:)` | Tap on shape-snap and shape-recognition-complete | Pro; iOS 18 routes to the Pencil automatically — no Pencil-specific API |

The contextual palette anchored to squeeze/hover MUST match the design system's floating
tool overlay, not a system menu. Do not invent a new palette shape here — reuse the editor
overlay from [`screens-and-flows.md`](../design/screens-and-flows.md).

---

## 6. Native plugin list & interface sketches

All native capability lives in **federated Flutter plugins** under `plugins/`
([ADR-0012](../adr/0012-native-plugin-strategy.md)). Each exposes a Dart *platform-interface*
package (with a mock impl for tests) and a Swift impl for iOS/iPadOS. Sketches below are Dart
platform-interface signatures — **illustrative, not final**; confirm exact method-channel vs
Pigeon-generated shapes against ADR-0012 before coding. Prefer **Pigeon** for typed
channels; use `FlutterMethodChannel`/`FlutterEventChannel` only where Pigeon can't express
the stream.

### `sane_ink_surface` (Metal front-buffer wet-ink surface)
Renders the active stroke natively and composites via `Texture`. This is the latency-critical
plugin.

```dart
abstract class SaneInkSurfacePlatform {
  /// Create a native CAMetalLayer front-buffer view; returns a Flutter texture id.
  Future<int> createSurface(SurfaceConfig cfg); // cfg: size, colorSpace, promotion(Hz)
  /// Begin a wet stroke; native side starts reading coalesced+predicted touches.
  void beginStroke(StrokeStyle style); // color, diameter, brushId
  /// Push confirmed samples captured by the native touch handler (native-owned path),
  /// OR mirror Flutter-captured samples (fallback path). See L1.
  void extend(List<InkSample> coalesced); // x,y,pressure,tilt,azimuth,roll,tMs
  void endStroke();                        // flush to Flutter; clear wet layer
  void dispose(int textureId);
  Stream<InkSample> get nativeSamples;     // 240 Hz stream when native capture is enabled
}
```
Swift side: `UIView` subclass owning a `CAMetalLayer` (`presentsWithTransaction = true`,
`commandBuffer.waitUntilScheduled()` before `present` — **(verify call order against current
Metal sample)**), a `UIUpdateLink(view:)` render loop, and `touchesBegan/Moved/Ended` reading
`event.coalescedTouches(for:)` / `predictedTouches(for:)`.

### `sane_stylus` (Pencil extras + estimated-property reconciliation)
```dart
abstract class SaneStylusPlatform {
  Future<PencilCapabilities> capabilities();          // detected per connected Pencil
  Stream<PencilInteraction> get interactions;         // doubleTap, squeeze(phase, hoverPose)
  Stream<HoverPose> get hover;                         // location, zOffset, azimuth, altitude, roll
  Stream<EstimatedUpdate> get estimatedUpdates;        // corrected force/roll by updateIndex
  void triggerFeedback(FeedbackKind kind, Offset at);  // alignment | pathComplete
}
```
Swift side: `UIPencilInteraction` + `.onPencilSqueeze`/`onPencilDoubleTap`,
`UIHoverGestureRecognizer`, `UICanvasFeedbackGenerator`, and
`touchesEstimatedPropertiesUpdated`.

### `sane_scribble` (OS handwriting entry)
```dart
abstract class SaneScribblePlatform {
  void setScribbleEnabled(bool enabled, {required Rect fieldBounds});
  void registerWriteAnywhere(List<Rect> writableElements);   // UIIndirectScribbleInteraction
  Stream<ScribbleText> get recognizedText;                    // arrives as normal text input
}
```
**Limitation:** Scribble is not scriptable beyond enable/suppress; recognized text arrives as
plain text input into real text-input views. Canvas ink and Scribble are **separate input
paths** — do not try to build a recognizer from Scribble strokes.

### `sane_secure_store` (Keychain / Secure Enclave / biometric)
```dart
abstract class SaneSecureStorePlatform {
  Future<void> put(String key, List<int> bytes, {AccessPolicy policy}); // Keychain, kSecAttrAccessibleWhenUnlocked
  Future<List<int>?> get(String key, {String? biometricReason});
  Future<SeKeyRef> createEnclaveKey(String tag, {bool biometryCurrentSet});
  Future<bool> biometricGate(String reason);    // LAContext.evaluatePolicy
  Future<void> setFileProtectionComplete(String path);
}
```
Swift: Keychain Services, CryptoKit `SecureEnclave.P256`, `SecAccessControlCreateWithFlags`
(`.biometryCurrentSet`/`.privateKeyUsage`), `LocalAuthentication`. Master-key wrapping and
recovery-code escrow are `sane_crypto`'s job; this plugin only stores/gates keys. See
[`prd-03`](../product/prd-03-identity-sync-privacy-settings-billing.md) for the key hierarchy.

### `sane_cloud_drive` (iCloud Drive)
```dart
abstract class SaneCloudDrivePlatform {
  Future<Uri> ubiquityContainerUrl();
  Future<void> coordinatedWrite(String relPath, List<int> bytes); // NSFileCoordinator
  Future<List<int>> coordinatedRead(String relPath);
  Stream<CloudChange> get changes;                                 // NSFilePresenter callbacks
  Future<List<ConflictVersion>> conflicts(String relPath);         // NSFileVersion
}
```
Only ever writes **ciphertext blobs + op-log segments** (decision 3); the sync/CRDT logic is
`sane_sync`. iCloud Drive is the Apple-platform default; Google Drive (all platforms) is the
other `sane_cloud_drive` backend and is shared with Android/web.

### `sane_ml_native` (Vision / Speech / Foundation Models)
```dart
abstract class SaneMlNativePlatform {
  Future<MlAvailability> availability();                 // per-feature + AI-HW/region gate
  Future<OcrResult> recognizeText(Uint8List image, {bool documentStructure});
  Future<String> summarize(String text, SummaryShape shape);   // Foundation Models, @Generable
  Stream<Transcript> transcribe(AudioStream a, {String locale}); // SpeechAnalyzer
}
```
Vision `VNRecognizeTextRequest(.accurate)` and (iPadOS 26) `RecognizeDocumentsRequest` for
tables/lists; Foundation Models `LanguageModelSession` with guided `@Generable` output;
`SpeechAnalyzer`+`SpeechTranscriber` with `.audioTimeRange` for tap-to-play sync. All
on-device; cloud inference is a **separate, per-request opt-in path** with a visible
data-leaves-device indicator (decision 6).

### `sane_pdfkit` (native PDF acceleration)
Uses PDFKit (`PDFView`, `PDFDocument`, `PDFAnnotation` ink/highlight/freeText) where it beats
pdfium for render speed on Apple; otherwise defer to `sane_pdf` (pdfium/`pdfrx`). Ink drawn
over a PDF is stored in Sane Notes' own object model, **not** flattened into PDF annotations
by default (export to PDF annotations is an explicit export path).

---

## 7. iPadOS system integration & UX conventions

### Windowing (iPadOS 26)
iPadOS 26 shipped a new windowing system (WWDC25 session 208). Sane Notes MUST:
- Support **multiple scenes / windows** (`UISceneSession`, `UIWindowScene`) and adopt
  **additive windowing** — open **a new window per note/notebook** rather than replacing the
  current one. Give each window a **descriptive name** (notebook title) for the app-menu window
  list.
- Coexist with **Stage Manager**, **Split View**, **Slide Over**, and the resize handle; adapt
  every layout to any window size using size-class-equivalent breakpoints (the app already
  uses adaptive layouts per decision 1). At narrow widths the editor collapses to the
  phone-style chrome in [`phones.md`](phones.md).
- Populate the persistent **menu bar** with the editor's real menus (File/Edit/Insert/View/
  Tools) so keyboard users and the menu bar both work. This is also the keyboard-shortcut
  surface.
- Support **external display** (extended desktop) via Stage Manager on M-series iPads.

Flutter caveat: multi-window on Flutter historically meant one `FlutterEngine` per scene or a
multi-view embedding; **(verify)** the current Flutter multi-window/multi-view support level
before committing to additive windows — this is a real risk item (L4).

### Scribble & text
Text fields get Scribble for free (`sane_scribble` only suppresses it over the drawing
surface). Because Flutter paints its own text (not native `UITextField`), IME/Scribble/
selection are weaker than native — see L2. For any first-class text-entry field that must feel
native (search bar, note title), consider a native text-input platform view rather than a
Flutter text field.

### Quick Note
Quick Note is a system feature (swipe up from the bottom-right corner with Pencil, or Control
Center). Sane Notes content SHOULD be Quick-Note-linkable via `NSUserActivity` so a Quick Note
can deep-link back to a page. Mechanism is general-knowledge **(verify against current API)**.

### App Intents / Shortcuts / Siri / Spotlight
Expose `AppIntent`s for **Create note**, **Append to today's note**, **Search notes**,
**Start recording**; expose the Note type as an `AppEntity` with an `EntityQuery` so Spotlight
and Shortcuts can find notes. Provide `AppShortcut`s with Siri phrases. This is core to
quick-capture parity with Apple Notes.

### Widgets & controls
- Home Screen widgets (`systemSmall`…`systemExtraLarge`; iPad supports extra-large): recent
  notes, quick-capture button (interactive widget backed by an `AppIntent`).
- **`ControlWidget`** for Control Center / Lock Screen / (where present) Action Button →
  "New note" / "New voice note".
- Accessory/Lock Screen widgets: today's notebook.
- Live Activities (ActivityKit, iPadOS 16.1+) are **low priority** — only for long
  transcription/export/sync progress.

---

## 8. Auth, cloud & security APIs

| Concern | API / rule | Notes |
|---|---|---|
| **Identity** | Sign in with Google / Microsoft / Apple + phone OTP (decision 5) | Identity is never required to take notes; guest mode is first-class. Dev builds use the `--dart-define=SANE_AUTH_BYPASS=true` flag that MUST be impossible in release (tracked p0 risk). |
| **Sign in with Apple** | Guideline **4.8** | If the app offers **any** third-party/social login for the primary account, it MUST also offer an equivalent private login. Sign in with Apple satisfies 4.8. Use `sign_in_with_apple` (Dart) → AuthenticationServices. |
| **At-rest** | `FileProtectionType.complete` on all note content | Key evicted shortly after device lock. Set via `sane_secure_store`. |
| **Key storage** | Keychain + Secure Enclave (P-256 only) | Per-notebook keys wrapped by user master key (decision 3); master key in Keychain with `kSecAttrSynchronizable` for iCloud Keychain escrow, plus printable recovery code. |
| **Biometric lock** | `LAContext` `.deviceOwnerAuthentication` | Needs `NSFaceIDUsageDescription`. Used for "lock this note" / "lock app". |
| **Backend integrity** | App Attest (`DCAppAttestService`) | Only for the optional stateless services (entitlements, ciphertext relay) — never for note storage (there is none). |
| **Transport** | TLS + cert pinning | Only the entitlement/relay services; user-cloud traffic uses the provider SDK. |

Everything synced to iCloud/Drive is **end-to-end encrypted ciphertext** (decision 3); the
cloud provider and Sane Notes' own services never see plaintext. Security posture target is
MASVS 2.x L2 (decision 8); the threat model is
[`../security/threat-model.md`](../security/threat-model.md).

---

## 9. App Store requirements (release gate)

Sane Notes MUST NOT be submittable until all of these pass. Enforce in CI where possible.

| Requirement | Detail |
|---|---|
| **Privacy manifest** (`PrivacyInfo.xcprivacy`) | Required since **May 1, 2024**. Declare `NSPrivacyTracking` (false — no tracking), `NSPrivacyCollectedDataTypes` (aim: none, except opt-in crash reports), and **`NSPrivacyAccessedAPITypes`** with approved reason codes. |
| **Required-reason APIs** | The app uses `UserDefaults` (declare **User defaults APIs** reason), file timestamps for "modified" dates (**File timestamp APIs**), and disk-space checks for quota UI (**Disk space APIs**). Each Flutter plugin that touches these MUST ship its **own** signed privacy manifest — audit every dependency. |
| **Privacy nutrition label** | App Store Connect: "Data Not Collected" except opt-in crash reports (decision 8). Must match the manifest. |
| **Sign in with Apple** | Present if any social login is offered (Guideline 4.8, §8). |
| **Encryption export compliance** | The app uses non-exempt crypto (E2EE). Set `ITSAppUsesNonExemptEncryption` and file the annual self-classification / French declaration as required **(verify current requirement)**. |
| **iPad multitasking** | Apps are expected to support multiple window sizes / multitasking; do not lock orientation or opt out of resizability. |
| **Pointer & keyboard** | Full keyboard-shortcut and pointer support expected on iPad. |

---

## 10. Known Flutter-on-iPad limitations & mitigations

| # | Limitation | Impact | Mitigation |
|---|---|---|---|
| **L1** | Flutter exposes **no framework-level `coalescedTouches` array** — you get `PointerMoveEvent`s as delivered (optionally resampled), losing 240 Hz sub-samples (`research/flutter-ink-stack.md`, **verify**) | Wet-ink fidelity/smoothness on fast strokes | Capture coalesced + predicted touches **natively** in `sane_ink_surface`; native owns the wet path and feeds finalized samples back to `sane_ink`. This is exactly the Tier-A design. |
| **L2** | Flutter paints its own text; IME / Scribble / native selection / a11y are weaker than native | Note title, search, typed text boxes feel non-native | Use native text-input platform views for the few first-class text fields; hand-author `Semantics` for VoiceOver; keep canvas ink and DOM/text-field input separate. |
| **L3** | Impeller is the **only** iOS renderer (no Skia switch) | Can't fall back if an Impeller-specific bug appears | Acceptable — Impeller removes shader-compile jank (a win for ink). Pin Flutter versions; golden-test ink rendering. |
| **L4** | Multi-window / additive windowing support on Flutter is **uncertain** (verify current level) | iPadOS 26 "new window per note" may be limited | Verify multi-view/multi-window support at spike time; degrade to tabbed in-app windows if native scenes aren't feasible. Record outcome in [ADR-0001](../adr/0001-flutter-single-codebase.md). |
| **L5** | `--obfuscate` renames Dart symbols only; does not protect logic; enum names not obfuscated | Client reverse-engineering | No secrets in client; server-authoritative entitlements; App Attest on the backend. |
| **L6** | Native latency parity is not guaranteed by pure Flutter | The whole product thesis | **SN-INK p0 spike (M0)** measures pen-to-pixel for pure-Flutter vs Flutter+native front-buffer on the reference iPad; if the ≤ 16 ms budget fails, the editor pivots to native views keeping the Dart core (the ADR-0001 exit criterion). |

---

## 11. Testing devices & harness

- **Device lab (Tier 1, CI):** M-series ProMotion iPad Pro + iPad Air (M-series), each with an
  **Apple Pencil Pro** and a **Pencil 2**. These run the automated pen-to-pixel latency and
  fps/jank gates from [`performance-budgets.md`](performance-budgets.md) via
  `tools/perf_harness`.
- **Tier 2 manual:** base iPad (60 Hz) + USB-C Pencil; iPad mini (A17 Pro).
- **Simulator:** functional/UI and golden tests only — the Simulator cannot measure latency or
  exercise Pencil hardware, so it MUST NOT be the latency gate.
- **Instruments:** use the LLM-latency template for Foundation Models and the standard
  time-profiler/Metal system trace for the ink loop.
- Golden tests (`flutter_test`) pin ink rendering; `integration_test` + `patrol` cover native
  dialogs (auth, biometrics, file pickers).

---

## 12. Cross-references

- Ink tiers & threading: [`architecture/overview.md`](../architecture/overview.md)
- Single-codebase decision & exit criterion: [ADR-0001](../adr/0001-flutter-single-codebase.md)
- Native plugin strategy: [ADR-0012](../adr/0012-native-plugin-strategy.md)
- Identity / sync / crypto / privacy: [`prd-03`](../product/prd-03-identity-sync-privacy-settings-billing.md)
- Phone adaptation (iPhone): [`phones.md`](phones.md)
- Support tiers: [`compatibility-matrix.md`](compatibility-matrix.md)
- Budgets & gates: [`performance-budgets.md`](performance-budgets.md)
- Research: `research/apple-pencil-ipados-capabilities.md`, `research/flutter-ink-stack.md`
