# Flutter for a Pen-First Note-Taking App (iPadOS / iOS / Android / Web), 2025–2026

Research brief for a team evaluating Flutter to build a best-in-class, stylus-centric
note-taking app across iPadOS, iOS, Android and the Web. Every factual claim traces to a
source in the final **Sources** section; anything I could not confirm is marked
**(unverified)**.

---

## Executive summary

- Flutter in 2025–2026 is a credible foundation for a pen-first note app: it exposes full
  stylus telemetry (pressure/tilt/orientation/distance/contact-ellipse), ships the
  Impeller renderer (which removes the shader-compilation jank that historically hurt
  ink apps), and has mature drawing (`perfect_freehand`, `scribble`), PDF (`pdfrx`,
  Syncfusion) and handwriting-recognition (ML Kit) libraries.
- The **biggest caveats** are the **Web** target (no Impeller on web; skwasm/WASM-GC does
  not run in any iOS browser; heavier download than JS/HTML apps) and **on-device
  handwriting/OCR** (Google ML Kit is mobile-only — no web).
- **Correction on the brief's premise:** I could **not** verify that Goodnotes uses
  Flutter or made a "Flutter Forward 2023 keynote" about it. Goodnotes' own public
  engineering case study (published on web.dev) says they **evaluated and rejected
  Flutter** and instead reused their Swift codebase via **SwiftWasm + TypeScript/React**
  for Android/Windows/Web/ChromeOS. Details and citation below — treat the Goodnotes-uses-
  Flutter claim as **contradicted by the primary source**. The best *verifiable* real-world
  proof point for "serious handwriting note app in Flutter" is **Saber** (open source,
  iOS/Android/Windows/macOS/Linux).

---

## 1. Flutter stylus / pointer input

### PointerEvent telemetry
Flutter's `PointerEvent` (base class for touch, stylus and mouse) operates in logical
pixels and exposes the fields a pen app needs:

- **pressure**, **pressureMin**, **pressureMax** — normalized force (≈0.0–1.0, can exceed).
- **tilt** — for `PointerDeviceKind.stylus` / `invertedStylus`, the axis angle in radians,
  `0 ≤ tilt ≤ π/2` (0 = perpendicular/orthogonal to the surface, π/2 = flat on it).
- **orientation** — orientation angle in radians (barrel rotation / azimuth).
- **distance** / **distanceMax** — hover distance from the surface (arbitrary units).
- **radiusMajor / radiusMinor** (+ `radiusMin/Max`) — contact-ellipse radii in logical px.
- **kind** — `PointerDeviceKind` enum incl. `stylus` and `invertedStylus` (eraser end).
- **buttons** — bitfield incl. stylus barrel buttons (`kSecondaryStylusButton`).

Source: `PointerEvent` and `PointerData` API docs. The lower-level `dart:ui`
`PointerData` carries the same fields as the engine delivers them.

### Listener vs GestureDetector vs RawGestureDetector
- **`Listener`** delivers **raw, uninterpreted** `PointerEvent`s via
  `onPointerDown/Move/Up/Hover/Signal` and `onPointerPanZoomStart/Update/End` (trackpad).
  This is the correct primitive for an ink canvas — you get every pressure/tilt sample
  without a gesture recognizer consuming or delaying it.
- **`GestureDetector`** recognizes *completed* gestures (tap, drag, scale) via the
  **gesture arena**; Flutter's own docs recommend it over raw pointers for normal UI, but
  for drawing it adds latency and can "win/lose" a pointer you wanted for ink.
- **`RawGestureDetector`** lets you register custom `GestureRecognizer`s and control arena
  participation — useful when you must coexist with pan/zoom (e.g. one-finger draw,
  two-finger scroll) while still owning the stylus stream. **(technique — unverified
  against a single cited page, but standard practice)**
- **`PointerSignalEvent`** (via `onPointerSignal`) delivers discrete signals such as mouse
  **scroll** (`PointerScrollEvent`) and **scale** (`PointerScaleEvent`) — used for
  canvas zoom with a wheel/trackpad.

**Recommended pattern:** wrap the canvas in a `Listener` for ink, and use
`RawGestureDetector`/`InteractiveViewer` for pan-zoom, disambiguating by
`event.kind == PointerDeviceKind.stylus` so palm/finger and pen do different things
(palm rejection).

### Coalesced / high-frequency samples and resampling
Modern pens sample at 120–240 Hz; the display is 60/90/120 Hz. Flutter's engine batches
samples into pointer-data packets. Flutter's framework-level answer to jittery, unevenly
timed input is **pointer resampling**: `GestureBinding.resamplingEnabled` (default
**false**) resamples pointer events to the frame time for "smoother touch event processing
at the cost of some added latency," and helps when input frequency ≠ display frequency
(e.g. 120 Hz input on a 90 Hz display). For a note app you typically want the raw stream
for fidelity and **not** enable resampling on the drawing path (or enable selectively).

> **Gap to flag:** unlike iOS UIKit's `coalescedTouches` / Android's
> `MotionEvent.getHistorical*`, Flutter does not expose a first-class
> "getCoalescedEvents()" array of the intermediate sub-samples between frames at the
> framework layer; you consume `PointerMoveEvent`s as delivered (optionally resampled).
> **(unverified — I could not find a doc page exposing per-frame coalesced sub-samples;
> validate against the current `dart:ui` pointer API before committing.)**

---

## 2. Rendering: Impeller, low-latency ink, and web renderers

### Impeller status (per docs.flutter.dev/perf/impeller)
- **iOS:** Impeller is the **only** supported renderer — no ability to switch to Skia.
- **Android:** **default on API 29+**, using Vulkan; on older Android / no-Vulkan devices
  it **falls back to the legacy OpenGL (Skia) renderer** automatically.
- **macOS / Linux / Windows:** default as of **Flutter 3.47**; opt-out will be removed in a
  future release.
- **Web:** **Impeller does not run on web** — "Flutter on the web currently uses Skia…
  It might use Impeller in the future."
- **Why it matters for ink:** Impeller **compiles all shaders and reflection offline at
  build time**, eliminating first-use shader-compilation jank — historically the single
  worst artifact when a stroke effect/shader ran for the first time.

### Web renderers: CanvasKit vs skwasm / WASM-GC (per docs.flutter.dev web + wasm pages)
- Two renderers today: **CanvasKit** (Skia compiled to WASM, runs on the **main thread**)
  and **skwasm** (Skia built for WASM that can **offload paint to a Web Worker**, using
  multiple cores). The legacy HTML renderer has been **deprecated/removed**.
- **skwasm requires WasmGC.** Browser support: **Chrome/Chromium 119+**, **Firefox 120+**
  (announced but noted as not working due to a known bug at the time of writing), **Safari**
  now supports WasmGC but has a **blocking compatibility bug** with Flutter's WASM
  renderer. **Critically: any browser on iOS uses WebKit, which does not support WasmGC —
  so Flutter-compiled-to-WASM cannot run in any iOS browser.**
- **Build & fallback:** `flutter build web --wasm` compiles to **both** WASM and JS; at
  runtime, if WasmGC is not detected the **JS/CanvasKit output is used** so the app still
  works everywhere. Requires **Flutter 3.24+**. Multi-threaded WASM needs COOP/COEP
  headers (`Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy:
  require-corp`/`credentialless`).
- **Size:** CanvasKit adds ~1.5 MB wasm; skwasm ~1.1 MB (per secondary sources) — heavier
  first-load than a hand-tuned JS/HTML web app.
- **Future direction:** a widely-cited engineer discussion notes Impeller is mobile-only,
  while **Skia Graphite** (WebGPU on web, Metal on iOS) is the likely long-term unifier;
  as of Aug 2024 Flutter had **no immediate plans to adopt Graphite** and **no official
  timeline**. Treat WebGPU-class web ink performance as *future*, not *present*.

### Low-latency ink rendering toolbox in Flutter
- **`CustomPainter` / `CustomPaint`** — the core. Override `paint(Canvas, Size)` and
  `shouldRepaint`. Drive repaints from a `Listenable`/`ChangeNotifier` passed as `repaint`
  so you **skip build & layout** and only repaint the canvas layer.
- **`Canvas.drawPoints` / `Path`** — draw the in-progress stroke as a growing `Path` or
  point set; commit finished strokes to a cached layer.
- **`Picture` caching / `PictureRecorder`** — record completed strokes into a `Picture`
  (and/or rasterize to an `Image` via `toImageSync`) so only the *active* stroke repaints
  each frame; everything else is a cached raster.
- **`RepaintBoundary`** — isolate the drawing surface into its own layer so ink repaints
  don't invalidate the rest of the UI (and vice-versa). Also used to export the canvas to
  PNG.
- **Fragment shaders (`FragmentProgram`)** — author GLSL (`.frag` in `pubspec.yaml`
  `shaders:`), load with `FragmentProgram.fromAsset`, set `Paint.shader`; supported on both
  Skia and Impeller. Use `FlutterFragCoord()` (not `gl_FragCoord`). Limits: `sampler2D`
  only, no UBO/SSBO, two-arg `texture()`, no unsigned ints/bools. `ImageFilter.shader()`
  (e.g. for `BackdropFilter`) is **Impeller-only**. Precache shaders and **reuse
  `FragmentShader` objects** across frames. Useful for pencil grain, highlighter blending,
  paper texture.
- **`Texture` widget + platform view for native low-latency ink** — the `Texture` widget
  maps a **backend (native) texture** into the Flutter scene and **repaints autonomously**
  as the backend produces frames, "generally without executing Dart code." This is the
  escape hatch: render ink with a **native low-latency layer** (e.g. iOS
  `CAMetalLayer`/PencilKit-style, Android front-buffered/`SurfaceView`) and composite it
  via `Texture`. It adds platform-channel complexity but is how you'd match native pen
  latency on the very active stroke if `CustomPainter` proves insufficient.

**Practical ink architecture:** active stroke in a `CustomPainter` inside a
`RepaintBoundary`, driven by a raw `Listener` stream; completed strokes flattened into a
`Picture`/tiled raster; optional native `Texture` fast-path for the wet stroke on iPad if
latency benchmarks demand it.

---

## 3. Goodnotes and Flutter — what the sources actually say

The brief asked me to cite Goodnotes' "public statements about using Flutter … (Flutter
Forward 2023 keynote)." **I could not verify this and the primary source contradicts it:**

- **web.dev case study "Goodnotes everywhere":** Goodnotes brought its iPad app to web,
  ChromeOS, Android and Windows using **web technologies + WebAssembly**. It explicitly
  frames the choice: *"why not just port the already existing iOS/iPad application to
  another platform or technology like Flutter or Compose Multiplatform?"* — and the team
  **rejected** that path because it would mean a full rewrite and a race between the iOS
  team and a new cross-platform team. They instead reused **100k+ lines of Swift** via
  **SwiftWasm**, with **TypeScript/React** UI, shipped as a **PWA** with service workers.
- I searched for a Goodnotes talk at **Flutter Forward 2023** (speaker lists, the
  `awesome-flutter-talks` index, recaps) and found **no Goodnotes/note-taking/ink talk**.
  (WebSearch budget was exhausted mid-research, so this is "not found," not a proof of
  absence — but the affirmative primary source points the other way.)

**Conclusion:** Do **not** cite Goodnotes as a Flutter reference. If you want a real,
verifiable Flutter handwriting-app proof point, use **Saber** (below).

### Verifiable real-world Flutter ink app: Saber
- **Saber** — "the cross-platform open-source app built for handwriting," built in Flutter,
  shipping on **iOS, Android (Play + F-Droid), Windows, macOS, Linux (Flathub/AppImage)**;
  ~4.8k GitHub stars. Its highlighter uses **canvas compositing**; dual-password
  encryption; active i18n via Weblate.
- Notably, **adil192**, Saber's maintainer, also **maintains the `perfect_freehand` Dart
  port** — i.e. the leading Flutter pressure-stroke library is battle-tested inside a real
  handwriting app.

---

## 4. Library landscape (with pub.dev signals)

Metrics are pub.dev "likes / pub points / downloads" and last-updated as read during this
research (2026-09); they drift over time.

### Ink / drawing
- **`perfect_freehand`** — Dart port (by adil192) of Steve Ruiz's JS `perfect-freehand`.
  `getStroke(points, StrokeOptions)` returns a filled outline polygon; options: `size`,
  `thinning`, `smoothing`, `streamline`, `simulatePressure`, taper/cap. All platforms.
  ~191 likes, MIT. **Best default for pressure strokes.**
- **`scribble`** (whynotmake.it) — lightweight freehand drawing **built on
  perfect_freehand**: variable width, pen/touch pressure, line eraser, undo/redo
  (value_notifier_tools), JSON serialize, PNG export, **selectable pointer types**, speed-
  based thinning. Riverpod-friendly `ScribbleNotifier`. All platforms. ~225 likes. Marked
  "still under development."
- **`flutter_drawing_board`** (fluttercandies) — richer toolbox: SmoothLine (Bezier),
  shapes, eraser, **palm rejection**, pan/zoom/rotate, undo/redo, JSON save/load, image
  export, canvas caching. ~269 likes.

### PDF (essential — notes are drawn *over* PDFs)
- **`pdfrx`** (espresso3389) — **PDFium-based** viewer/editor. Text selection (default),
  search, links, outlines, dark mode, page manipulation, combine, image import. Native
  PDFium on Android/Linux/Windows, XCFramework on iOS/macOS, **WASM on web**. Split into
  `pdfrx` (widgets) + `pdfrx_engine` (headless). Requires Flutter 3.47+/Dart 3.13+. MIT,
  ~343 likes, 449k+ downloads. **Recommended viewer/renderer.**
- **`syncfusion_flutter_pdf`** — non-UI create/read/**edit** PDFs: text (Unicode/RTL),
  images, tables, bookmarks, annotations, hyperlinks, attachments, text extraction, PDF/A,
  digital signatures, forms, encryption (RC4/AES up to 256-bit). All platforms. ~789 likes.
  **License caveat:** commercial — needs a Syncfusion commercial **or** free **Community
  License** (eligibility limits). Pair with `syncfusion_flutter_pdfviewer` for UI.
- **`printing`** (nfet.net, Flutter Favorite) — generate/print/share PDFs on Android, iOS,
  macOS, Windows, Linux **and web print**; `PdfPreview` widget; works with the `pdf`
  package. ~1.8k likes, 872k downloads. **Use for export/print.**

### Handwriting & OCR
- **`google_mlkit_digital_ink_recognition`** — on-device handwriting recognition from
  `Ink`/`Stroke`/`StrokePoint` (x,y,timestamp); **hundreds of languages** via downloadable
  models (`DigitalInkRecognizerModelManager`). **iOS 15.5+/Android 21+ only — NO web / no
  other platform.** ~37 likes.
- **`google_mlkit_text_recognition`** — OCR for **Latin, Chinese, Devanagari, Japanese,
  Korean**; on-device; **iOS/Android only, no web**. ~411 likes, 274k downloads.
- **Web handwriting gap:** for web you'd need a cloud OCR/ink API or a WASM model — plan a
  separate path. **(unverified which specific web option is best)**

### Audio (voice notes)
- **`record`** (cow-level.ovh) — mic → file/stream, codecs aacLc/opus/wav/flac/pcm16;
  amplitude (dBFS), pause/resume, device select, noise suppression. Android 23+, iOS 12+,
  macOS, Windows, **web** (fewer codecs), Linux. ~891 likes, 993k downloads.
- **`just_audio`** (ryanheise.com, Flutter Favorite) — playback with gapless, playlists,
  clipping, DASH/HLS; Android/iOS/macOS/**web**/Windows/Linux. ~4.15k likes, ~1.1M weekly.
- **`audio_waveforms`** (simform) — live record waveform + playback waveform, seek/scroll.
  **Android/iOS only** (no web listed). ~870 likes.

### Files, secure storage, biometrics
- **`file_picker`** — pick files/dirs, save dialog, extension filters, cloud (Drive/
  Dropbox/iCloud), **WebAssembly support**; all platforms (some APIs mobile-only). ~4.9k
  likes, 3.82M downloads. v12 introduced a **federated architecture / breaking changes**.
- **`flutter_secure_storage`** (steenbakker.dev) — Keychain (iOS/macOS); Android v10+ uses
  **RSA-OAEP + AES-GCM** custom ciphers with optional biometric gating; **web uses
  experimental WebCrypto** (localStorage-bound, non-portable, HTTPS/localhost only). ~4.4k
  likes, 4.14M downloads.
- **`local_auth`** (flutter.dev) — Face ID / Touch ID / fingerprint / device credential.
  Android 24+, iOS 13+, macOS 10.15+, Windows 10+. **No web.** ~3.38k likes.

### Auth & cloud sync
- **`sign_in_with_apple`** (aboutyou.com) — Apple ID on iOS/macOS/Android + **web** (redirect
  flow); server-side validation required. ~2.2k likes, 1.2M downloads.
- **`google_sign_in`** (flutter.dev) — Android/iOS/macOS/**web**. **v7 is a redesign**
  (stream/authentication-events based; migration guide) — budget for it. ~3.6k likes.
- **`aad_oauth`** (earlybyte.ch) — Microsoft Entra ID (Azure AD) OAuth2 v2.0, incl. B2C/
  ADFS; mobile + web (MSAL browser lib on web). v1.0.1, ~167 likes. (`msal_flutter` is an
  alternative but this package doesn't wrap it.) Use for **OneDrive/Microsoft** accounts.
- **`icloud_storage`** — upload/download/manage files in the app's **iCloud container**;
  **iOS/macOS only**; requires iCloud entitlement + container ID. ~82 likes. (Older; verify
  maintenance.)
- **`googleapis`** (google.dev, Flutter Favorite) — generated clients for 200+ Google REST
  APIs incl. **Drive**; use with `googleapis_auth`/`google_sign_in`. All platforms, v17.

### Local database
- **`drift`** (simonbinder.eu) — reactive **SQLite** ORM: type-safe Dart+SQL, codegen,
  **auto-updating streams**, transactions, migrations, isolate/threading, joins, `WITH`/
  `WINDOW`. All platforms incl. **web via sql.js/wasm**. "Stable, production ready." ~2.46k
  likes, 1.26M downloads. **Recommended relational store.**
- **`objectbox`** — very fast NoSQL object DB, ACID, relations, **on-device vector search**,
  optional **Data Sync**. Android/iOS/macOS/Linux/Windows — **no web/WASM listed**. ~1.58k
  likes.
- **`isar`** — fast NoSQL with full-text search; **stable v3 was last published ~3 years
  ago**, **v4 in dev (prerelease)** — treat maintenance as uncertain; a community fork
  exists. All platforms incl. web. ~2.4k likes.
- **`hive_ce`** (Hive Community Edition) — successor to the **stalled original Hive**; pure-
  Dart key-value, encryption, **Flutter web WASM support**, codegen adapters. ~564 likes,
  961k downloads. Good for settings/light data.
- **`sqlite3`** — low-level SQLite FFI binding underpinning drift; use directly only if you
  want hand-written SQL. **(not separately fetched — background)**

### CRDT / local-first sync (Dart)
- **`crdt`** (cachapa.net) — HLC (Hybrid Logical Clock) + base CRDT; ecosystem:
  **`sql_crdt`**, **`sqlite_crdt`**, `postgres_crdt`, `hive_crdt`. Powers the Libra app
  (1M+ installs). Storage-agnostic. ~81 likes. **Simplest path to last-writer-wins sync
  over SQLite.**
- **`crdt_lf`** (mattiapispisa.it) — richer op-based CRDT: text (**Fugue** anti-interleave),
  list (movable), map, set (OR-Set), nested, HLC, undo, handler deltas; companion Flutter/
  persistence/socket packages. v4, "under active development," ~7 likes (young).
- **`y_crdt`** — Dart port of **Yjs**, built on the **y-crdt Rust** core via WASM/WIT;
  early (v0.2, unverified uploader). For real-time collaborative text.
- **Automerge / Loro** — Rust CRDT cores usable from Dart **via `flutter_rust_bridge`**
  rather than a maintained pub package. **(no first-party Dart pub package verified — treat
  as "bring your own Rust core.")**

### Rust core
- **`flutter_rust_bridge` v2** (Flutter Favorite) — codegen Dart⇄Rust bindings: arbitrary
  types, async/sync, **streams**, complex enums/structs/error handling, and **web via
  WebAssembly/JS**. Android/iOS/Linux/macOS/Windows/**Web**. v2.13, ~661 likes, 613k
  downloads. **This is the mechanism** to reuse a Rust ink/geometry/CRDT core (Automerge/
  Loro, tessellation, recognition) across all Flutter targets, including web.

### State, routing, i18n, testing
- **`flutter_riverpod` v3** (Flutter Favorite) — reactive/compile-safe state, async
  loading/error handling, codegen `@riverpod`. ~2.91k likes, 3.13M downloads. (Alternative:
  `bloc` for event-driven teams.)
- **`go_router` v18** (flutter.dev, Flutter Favorite) — declarative, URL-based routing +
  deep links + `ShellRoute` (persistent nav); "**feature-complete**," bug-fix mode. ~5.78k
  likes, 4.12M downloads. **Essential for the web target's URLs/deep links.**
- **`flutter_localizations`** — first-party i18n (ARB/gen-l10n). **(background)**
- **Accessibility** — Flutter's `Semantics`/`MergeSemantics` feed platform screen readers;
  on web, the semantics tree emits DOM `aria-*`. A canvas-drawn app must **hand-author
  Semantics** for custom-painted content and provide text alternatives for ink/OCR.
  **(mechanism background; validate screen-reader coverage on web with real AT.)**
- **Testing:** `flutter_test` **golden tests** (pixel-diff — ideal for ink rendering
  regressions), **`integration_test`** (first-party E2E), and **`patrol`** (LeanCode) for
  **native automation** (permissions, notifications, native dialogs) on Android/iOS/macOS/
  web with concise custom finders. ~721 likes.

---

## 5. DevSecOps for Flutter

### Static analysis / lint
- **`dart analyze`** with **`very_good_analysis` v11** (Very Good Ventures) — strict,
  opinionated lint superset (stricter than `flutter_lints`/`lints`), plus formatter config.
  ~770 likes, 916k downloads. Enable in CI as a gate.
- **SAST caveat:** **CodeQL does NOT support Dart** (its languages: C/C++, C#, Go, Java,
  Kotlin, JS/TS, Python, Ruby, Rust, Swift, GitHub Actions). **Semgrep supports Dart at
  "Experimental" maturity for Code (SAST)** and **"Beta" for Supply Chain (SCA)** — usable
  but expect gaps; write custom Semgrep rules for your patterns (hardcoded secrets, insecure
  storage, deep-link handling).

### Dependency / supply-chain scanning
- **OSV-Scanner** supports **Dart** — it extracts and scans **`pubspec.lock`** against the
  OSV database. Add it to CI.
- **`dart pub`** advisories: pub.dev surfaces known-vulnerability advisories on package
  pages; `pana` computes the pub score. (pub has no full `npm audit` equivalent CLI;
  OSV-Scanner fills that role.) **(pub-audit CLI parity — unverified.)**

### Hardening & obfuscation
- **`flutter build … --obfuscate --split-debug-info=<dir>`** renames Dart AOT
  function/class symbols and emits a SYMBOLS/PDB map; symbolize crashes with
  `flutter symbolize`. **Important limits:** it "does **not** encrypt resources nor
  protect against reverse engineering — it only renames symbols"; **enum names are not
  obfuscated**; runtime `runtimeType.toString()` matching breaks; **release builds only**;
  **web does not support obfuscation** (use minification). Never store secrets in the app.
- **Cert pinning** — pin via `SecurityContext`/`HttpClient` badCertificateCallback or a
  package (e.g. `http_certificate_pinning`/Dio interceptor). **(package specifics
  unverified)**; combine with OS-level protections.
- **Android:** ship **R8/ProGuard** shrink+obfuscate for the Java/Kotlin/plugin layer
  (Flutter's Gradle enables minify in release); keep required Flutter/plugin classes.
  **(background)**
- **MobSF** — automated static+dynamic analysis for **APK/AAB, IPA, APPX** and source.
  Its docs don't call out Flutter specifically; in practice **static coverage of Flutter is
  limited** because business logic compiles into the Dart AOT snapshot (`libapp.so`) that
  MobSF/jadx can't decompile — you get manifest/permission/secret-string findings but not
  Dart logic. **(the "limited Dart snapshot coverage" is a known community reality but the
  MobSF README did not state it — mark unverified.)**

### CI/CD
- **GitHub Actions**, **Codemagic** (Flutter-specialized SaaS) and **Fastlane** (signing,
  TestFlight/Play upload) are the standard trio. Typical pipeline: `dart format --set-exit-
  if-changed` → `dart analyze` (very_good_analysis) → `flutter test` + golden +
  `integration_test`/patrol → OSV-Scanner + Semgrep → build (`--obfuscate --split-debug-
  info`, `--wasm` for web) → fastlane/Codemagic deploy. **(tool identities are well-known;
  exact config unverified against a single cited page.)**

---

## Recommended stack

**Core**: Flutter (stable) + **Impeller** (iOS/Android/desktop) with the Skia/CanvasKit
fallback on web.

- **Ink engine:** raw `Listener` → `perfect_freehand` (`getStroke`) rendered in a
  `CustomPainter` inside a `RepaintBoundary`; completed strokes flattened into cached
  `Picture`/tiles; **`Texture` + native front-buffer fast-path on iPad** kept as an option
  if latency benchmarks require it. Consider a **Rust core via `flutter_rust_bridge v2`**
  for stroke geometry/tessellation, document model and CRDT (shared to web via WASM).
- **PDF:** `pdfrx` (PDFium viewer/render incl. web-WASM) + `syncfusion_flutter_pdf` (edit/
  export, mind the license) + `printing` (print/share).
- **Handwriting/OCR:** ML Kit digital-ink + text recognition on **mobile**; a Rust/WASM or
  cloud path for **web** (ML Kit is mobile-only).
- **Audio notes:** `record` + `just_audio` (+ `audio_waveforms` on mobile).
- **Data:** `drift` (SQLite, reactive, web-capable) as system of record; **`sqlite_crdt`/
  `crdt`** (or a Rust Automerge/Loro core via FRB) for local-first sync; `hive_ce` for
  light settings.
- **Auth/cloud:** `sign_in_with_apple`, `google_sign_in` (v7), `aad_oauth`; `googleapis`
  (Drive), `icloud_storage` (Apple), your own backend for cross-platform sync.
- **Security/storage:** `flutter_secure_storage` + `local_auth` (biometric gate).
- **App plumbing:** `flutter_riverpod` v3, `go_router` v18, `flutter_localizations`,
  `Semantics` for a11y.
- **Quality/DevSecOps:** `very_good_analysis`, golden tests, `integration_test` + `patrol`,
  OSV-Scanner + Semgrep (custom Dart rules), `--obfuscate --split-debug-info`, R8, cert
  pinning, MobSF in CI (with the Dart-snapshot caveat), GitHub Actions/Codemagic + fastlane.

---

## Risks & mitigations

| Risk | Why it matters for a pen app | Mitigation |
|---|---|---|
| **Web renderer gaps** — no Impeller on web; **skwasm/WASM-GC can't run in any iOS browser**; heavier download | Web is a first-class target; iPad Safari users hitting the web build get the JS/CanvasKit path | Ship JS/CanvasKit fallback (automatic); treat web as "view/light-edit," push heavy ink to installed apps; watch Skia **Graphite/WebGPU** |
| **Pen latency vs native (esp. iPad/PencilKit)** | Perceived quality of a note app is dominated by wet-ink latency | Raw `Listener`, `RepaintBoundary`, cached `Picture`, avoid resampling on draw path; **native `Texture` fast-path** if needed |
| **No framework-level coalesced sub-samples (unverified)** | High-Hz pen detail can be lost between frames | Consume raw `PointerMoveEvent`s; if fidelity insufficient, capture coalesced touches natively and feed via platform channel/`Texture` |
| **On-device handwriting/OCR is mobile-only (ML Kit)** | Web users get no on-device recognition | Rust/WASM recognition core via FRB, or cloud OCR for web |
| **Isar maintenance uncertainty; original Hive stalled** | Data layer must be dependable for years | Prefer **drift** (active) as system of record; use **hive_ce** not hive |
| **Syncfusion license** | PDF edit/export is core | Confirm Community License eligibility or budget commercial; else lean on `pdfrx` + `pdf`/`printing` |
| **SAST maturity for Dart** — CodeQL unsupported, Semgrep experimental; MobSF can't see Dart snapshot | Weaker automated security coverage | Layer Semgrep (custom rules) + OSV-Scanner + manual review + very_good_analysis; don't rely on MobSF for Dart logic |
| **Obfuscation ≠ protection; web unobfuscated** | Client can be reversed | No secrets in client; server-authoritative; cert pinning; accept web minification only |
| **Breaking changes in fast-moving deps** (google_sign_in v7, file_picker v12, riverpod v3) | Upgrade churn | Pin versions, renovate bot, integration tests before bumps |
| **Goodnotes is not a Flutter precedent (brief premise wrong)** | Strategy shouldn't rest on a false proof point | Use **Saber** as the real Flutter-ink reference; validate with your own iPad latency spike |

---

## Comparison with alternatives

| Dimension | **Flutter + Rust core (recommended)** | **Expo / React Native + Skia** | **Native Swift/Kotlin + Rust core** |
|---|---|---|---|
| Stylus telemetry (pressure/tilt/orientation) | Full via `PointerEvent`/`PointerData` | Via RN gesture/`@shopify/react-native-skia` — pressure/tilt exposure thinner **(unverified per-field)** | Best/most direct (PencilKit / Android `MotionEvent` incl. coalesced/historical) |
| Wet-ink latency | Very good with Impeller; native `Texture` fast-path if needed | Skia canvas is capable; JS bridge/reconciler can add overhead **(unverified)** | Best (front-buffered/PencilKit) |
| Renderer | Impeller (mobile/desktop), Skia/CanvasKit (web) | Skia (react-native-skia) / platform | Metal / platform native |
| iPad/iOS/Android reach | One codebase, all three | One codebase, all three | Two native codebases |
| **Web** | Yes (CanvasKit/skwasm) but heavy + no iOS-browser WASM-GC | Strong (React web / react-native-web + Skia CanvasKit) — often the better *web* story | Separate web build entirely |
| Desktop (Win/mac/Linux) | Yes, first-class (Impeller default 3.47) | Weaker/via extra tooling | Separate native |
| PDF render/edit | `pdfrx` (PDFium) + Syncfusion + printing | PDFium/native modules — less turnkey **(unverified)** | PDFKit / native PDFium (excellent) |
| On-device handwriting/OCR | ML Kit (mobile only) + Rust/WASM | ML Kit RN wrappers + Skia | Native Vision/ML Kit (best) |
| Rust core reuse (ink/CRDT) | `flutter_rust_bridge v2` incl. web/WASM | uniffi/JSI + wasm — workable | uniffi/JSI + wasm — workable |
| Code sharing across platforms | Highest (UI + logic) | High (UI + logic) | Lowest (logic via Rust only) |
| CRDT/local-first | `crdt`/`sqlite_crdt`/`crdt_lf`/`y_crdt` or Rust | JS Yjs/Automerge (mature) or Rust | Rust Automerge/Loro (mature) |
| Ecosystem maturity for ink | Strong (perfect_freehand/scribble, Saber proof) | Strong (Skia); large JS ecosystem | Native SDKs most mature |
| DevSecOps tooling | Dart: Semgrep(exp)/OSV yes, CodeQL no, MobSF-limited | JS/TS: CodeQL+Semgrep(GA)+npm audit (best) | Swift/Kotlin: CodeQL+MobSF full |
| Team velocity | High (one team, hot reload) | High (JS talent pool) | Lower (two platform teams) |
| Main risk | Web renderer + Dart SAST gaps | Bridge perf at extreme ink rates; native pen fidelity **(unverified)** | Cost/time of 2 codebases; slowest to ship all targets |

**Bottom line:** For a *pen-first, cross-platform incl. web* app on one team, **Flutter +
Rust core** offers the best reach-per-effort, with Impeller removing the classic ink-jank
problem — provided you accept a compromised web-ink story and weaker Dart SAST tooling, and
keep a native `Texture` fast-path in reserve for iPad latency. **RN+Skia** is the strongest
pick if the **web** experience is the top priority or the team is JS-native. **Native+Rust**
wins purely on **pen fidelity and platform integration** but is the most expensive to ship
across four targets.

---

## Sources

- https://web.dev/case-studies/goodnotes
- https://docs.flutter.dev/perf/impeller
- https://docs.flutter.dev/platform-integration/web/renderers
- https://docs.flutter.dev/platform-integration/web/wasm
- https://docs.flutter.dev/deployment/obfuscate
- https://docs.flutter.dev/ui/design/graphics/fragment-shaders
- https://api.flutter.dev/flutter/gestures/PointerEvent-class.html
- https://api.flutter.dev/flutter/dart-ui/PointerData-class.html
- https://api.flutter.dev/flutter/widgets/Listener-class.html
- https://api.flutter.dev/flutter/widgets/Texture-class.html
- https://api.flutter.dev/flutter/rendering/CustomPainter-class.html
- https://api.flutter.dev/flutter/gestures/GestureBinding/resamplingEnabled.html
- https://gist.github.com/jezell/41012a13c6789fa7c1c3b0868a8b0942
- https://github.com/Rahiche/awesome-flutter-talks
- https://github.com/saber-notes/saber
- https://pub.dev/packages/perfect_freehand
- https://pub.dev/packages/scribble
- https://pub.dev/packages/flutter_drawing_board
- https://pub.dev/packages/pdfrx
- https://pub.dev/packages/syncfusion_flutter_pdf
- https://pub.dev/packages/printing
- https://pub.dev/packages/google_mlkit_digital_ink_recognition
- https://pub.dev/packages/google_mlkit_text_recognition
- https://pub.dev/packages/record
- https://pub.dev/packages/just_audio
- https://pub.dev/packages/audio_waveforms
- https://pub.dev/packages/file_picker
- https://pub.dev/packages/flutter_secure_storage
- https://pub.dev/packages/local_auth
- https://pub.dev/packages/sign_in_with_apple
- https://pub.dev/packages/google_sign_in
- https://pub.dev/packages/aad_oauth
- https://pub.dev/packages/googleapis
- https://pub.dev/packages/icloud_storage
- https://pub.dev/packages/drift
- https://pub.dev/packages/isar
- https://pub.dev/packages/objectbox
- https://pub.dev/packages/hive_ce
- https://pub.dev/packages/crdt
- https://pub.dev/packages/crdt_lf
- https://pub.dev/packages/y_crdt
- https://pub.dev/packages/flutter_rust_bridge
- https://pub.dev/packages/flutter_riverpod
- https://pub.dev/packages/go_router
- https://pub.dev/packages/patrol
- https://pub.dev/packages/very_good_analysis
- https://google.github.io/osv-scanner/supported-languages-and-lockfiles/
- https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks/
- https://docs.semgrep.dev/supported-languages
- https://github.com/MobSF/Mobile-Security-Framework-MobSF

### Sources attempted but unavailable
- https://raw.githubusercontent.com/flutter/website/main/src/content/platform-integration/web/renderers.md (HTTP 404)
- https://api.flutter.dev/flutter/gestures/PointerEvent/transformedEvents.html (HTTP 404)
- Flutter Forward 2023 session/speaker search (WebSearch budget exhausted mid-session)
