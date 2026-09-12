# PDF & Audio Technology Research for a Best-in-Class Flutter Note App

Scope: a cross-platform (iOS / Android / Web) Flutter note-taking app that must (A) render, annotate, search and export PDFs — including 600+ page documents — and (B) record lectures with waveform, playback controls, and ink/text-to-audio timeline sync in the style of Notability / GoodNotes / Notewise. Every claim below traces to a fetched page or a page snippet; anything I could not confirm from a source is marked "(unverified)".

---

# Part A — PDF: Rendering, Annotation, Search, Huge Docs, Export

## A.1 Rendering engines usable from Flutter

### pdfium via `pdfrx` (recommended core renderer)
- `pdfrx` (pub.dev, v2.6.1, **MIT license**) is built on top of **PDFium** and splits into a Flutter viewer layer plus a pure-Dart `pdfrx_engine` for "PDF parsing, rendering, and manipulation without Flutter dependencies."
- Platform support is the widest of any single package: **Android, iOS (15+), macOS (12+), Windows, Linux (incl. Raspberry Pi), and Web via WASM** — i.e. Web runs PDFium compiled to WebAssembly rather than pdf.js, so rendering fidelity matches native.
- Features confirmed on the package page: text selection (on by default, customizable), **text search**, document **outline/bookmarks**, **PDF link handling**, password-protected PDFs (`PasswordProvider`), horizontal/facing-page layouts, scroll thumbs, dark/night mode, double-tap zoom, custom scroll physics, page manipulation, document combining, image import. It exposes high-level viewer widgets plus an **overlay** mechanism (useful for drawing an annotation layer on top of a page).
- Requires Flutter 3.47+ / Dart 3.13+. Actively maintained (449k downloads).
- Caveat: the GitHub README did not expose caching/quad-level internals to the fetcher; text-bounds/quads and search-rect APIs exist in the library but exact API shapes should be verified in the API docs (`pub.dev/documentation/pdfrx/latest/`) before committing (unverified detail level).

### Apple PDFKit (iOS/macOS native, optional accelerator)
- `PDFKit` provides `PDFDocument`, `PDFView` (native hardware-accelerated viewer with zoom/pan/nav), `PDFSelection` (text selection + full-document search), `PDFOutline` (table of contents), and `PDFAnnotation` (create/edit/remove annotations: text/sticky notes, highlight/underline/strikethrough, ink, shapes, link, etc.). iOS + macOS only. Good as a native fallback or for platform-specific polish, but not cross-platform.

### Android `PdfRenderer` and Jetpack `androidx.pdf`
- **`PdfRenderer`** (platform API, ~API 21+) only renders pages to `Bitmap`. **No text extraction, no annotations, no forms** — rendering only. For a note app you'd have to composite your own annotation overlay and store marks separately. Too limited to be the core.
- **Jetpack PDF (`androidx.pdf:*`)** is much richer and now at **1.0.0-beta01 (Aug 26, 2026)**: text selection + streaming search, hyperlinks (URL + GoTo), multi-page and image selection, two-page layout, **freehand ink / highlight (snap-to-text) / eraser with undo-redo**, **form filling**, OCR via `OcrProvider` (ML Kit), password dialogs, ready-made fragment/Compose UI (`PdfViewerFragment`, `EditablePdfViewerFragment`, `PdfViewer` composable), and `PdfWriteHandle` to save edits. Min SDK 28 (some features need SDK Extension 13/19). It is Android-only and editing APIs are still `@ExperimentalPdfApi`, so it's a strong Android-native option but not a cross-platform answer, and not production-final for annotation yet.

### pdf.js (Web only)
- Mozilla's `pdf.js` is "a general-purpose, web standards-based platform for parsing and rendering PDFs," **Apache-2.0** licensed. Renders to canvas with a separate **text layer** overlay (the mechanism that enables selection/search/highlight quads on the web). Some Flutter packages (e.g. Syncfusion's viewer on Web) require adding pdf.js to `index.html`. With `pdfrx` you do **not** need pdf.js because pdfrx ships PDFium WASM — one fewer moving part.

### MuPDF — licensing warning
- MuPDF is **dual-licensed: AGPLv3 or a commercial license from Artifex.** Under AGPL you must disclose your app's full source under AGPL to users (including the network/SaaS use case), share modifications under AGPL, and keep attribution/producer lines. This is effectively **incompatible with a closed-source commercial app** unless you buy a commercial license (Artifex quotes per use case; OEM/subscription involve per-copy costs with quarterly minimums; no public price). **Recommendation: avoid MuPDF** unless you're prepared to pay Artifex — PDFium (BSD-style, via pdfrx MIT wrapper) gives you a permissive path.

### Commercial full-stack SDKs (Nutrient/PSPDFKit, Apryse, Syncfusion)
- **Nutrient (formerly PSPDFKit) Flutter SDK**: commercial, cross-platform (iOS/Android/Web), **17+ annotation types, form filling, signatures, redaction**, page editing, programmatic PDF generation, AI (summarize/translate/redaction/NL search), lazy loading for large files. Integrates via JNI (Android) / FFI (iOS) / JS interop (Web). Free full-featured trial; **production pricing is "contact sales," volume-based** (no public list price). Used by Dropbox/Box/Scribd. This is the "buy your way out of the hard parts" option and the fastest path to a GoodNotes-grade annotator, at real per-year cost.
- **Apryse (formerly PDFTron)**: modular, use-case-based pricing, publicly indicated **entry point "$1,500"** with volume discounts and custom enterprise quotes; deployment client-side (WebViewer) / server-side / hybrid. Flutter via `pdftron_flutter` (Android + iOS): open/save, viewing, annotations + collaboration, forms, digital signatures, redaction, PDF/A, text extraction, bookmarks, search, layers (OCG), measurement, printing. Trial needs no key; production needs a paid key. Very capable but heavyweight and native-only for Flutter (no first-class Web-in-Flutter documented in the pages read).
- **Syncfusion `syncfusion_flutter_pdfviewer`** (commercial, but **free Community License** for small teams/revenue): text markup annotations (highlight/underline/strikethrough/squiggly), text selection, search with jump-to-occurrence, bookmark nav, document link annotations + hyperlink detection, **form fill/flatten/import-export (AcroForm)**. Cross-platform Android/iOS/Web/Windows/macOS; Web requires pdf.js in `index.html`. Uses **virtual scrolling** ("pages rendered only when required") for large-doc performance. Ink annotations / sticky notes weren't listed on the viewer page (so freehand ink may be limited — verify).
- **Syncfusion `syncfusion_flutter_pdf`** (non-UI Dart library): create/read/edit PDFs, add text (Unicode/RTL/TrueType) + images + tables, **text extraction with position bounds** and **search returning matched items with bounds + page index** (exactly what you need for highlight quads), bookmarks/annotations/hyperlinks, encryption up to AES-256, **PDF/A conformance**, form creation + flattening, digital signatures. Great as the export/manipulation engine even if you render with pdfrx.

## A.2 PDF annotation standard (ISO 32000)

- PDF is an **open ISO standard (ISO 32000)** since 2008; "anyone may create applications that can read and write PDF files without having to pay royalties to Adobe." Annotations are separate objects layered over page content streams — they do **not** modify the underlying text/vector/image content, which is what lets you add and later remove marks non-destructively.
- **Standard annotation subtypes** (confirmed across the Nutrient annotations guide, PDFKit, XFDF spec):
  - **Ink** — freehand drawing (the primary "pen" for handwritten notes).
  - **Text markup** — Highlight, Underline, Strikeout, Squiggly (anchored to text quads).
  - **FreeText** — typed text placed on the page (typewriter/callout).
  - **Note / Text** — sticky-note comments.
  - **Stamp** and **Image** annotations.
  - **Shapes** — Line, Polyline, Square/Rectangle, Circle/Ellipse, Polygon.
  - **Link** — URL and internal GoTo destinations.
  - **Widget** — form fields (needs a forms component).
  - **Redaction** and **Media** (SDK-dependent).
- **Live/editable vs flattened**: Live annotations stay as separate, interactive objects stored in the PDF (or in a side file) and can be moved/edited/deleted later. **Flattening** "renders permanently into the page," merging marks into page content so they can't be edited — do this only for a final shareable export, keep live annotations as the working format.
- **Export/interchange formats**:
  - **XFDF** (XML Forms Data Format) — the XML subset of FDF carrying **forms + annotations**; standardized as **ISO 19444-1:2019 (XFDF 3.0)** and a normative reference in PDF 2.0. It lets you store/round-trip annotations **independently of the PDF** and re-import into the same doc, and it interoperates with Adobe Acrobat / Apple Preview. Note XFDF cannot spawn new pages and drops some FDF keys (Status, Encoding, JavaScript, etc.).
  - **Instant JSON** (Nutrient) — a JSON annotation format some SDKs use for sync; convertible to XFDF.

### Recommended annotation storage model
Store annotations in **your own database as the source of truth**, and treat XFDF as the interop/export format:

```jsonc
// Annotation (one row per mark)
{
  "id": "uuid",
  "docId": "uuid",
  "pageIndex": 12,
  "type": "ink | highlight | underline | strikeout | freetext | note | stamp | shape.rect | link",
  "color": "#FFCC00",
  "opacity": 0.5,
  "createdAt": "iso8601",
  "updatedAt": "iso8601",
  "authorId": "uuid",
  // geometry stored in PDF user-space (points), page-relative
  "rect": [x0, y0, x1, y1],              // bounding box
  "quads": [[x1,y1,x2,y2,x3,y3,x4,y4]], // text-markup quads (per line)
  "inkPaths": [[{ "x":.., "y":.., "p":.., "t": 1234 }]], // p=pressure, t=ms offset for audio sync
  "text": "typed content for freetext/note",
  "audioAnchorMs": 84210                  // link to audio timeline (see Part B)
}
```
- Keep geometry in **PDF points** (page user-space), page-relative, so it survives zoom/DPI changes and re-flows to any renderer.
- Persist each stroke's per-point timestamp (`t`) — this is what enables replaying handwriting in sync with audio and jumping audio from a stroke.
- Export path: your model → XFDF (for Acrobat/Preview interop) and → flattened PDF (for final share/print) via `syncfusion_flutter_pdf` or a commercial SDK.

## A.3 Preserving hyperlinks, outlines, forms
- **Outlines/bookmarks**: exposed by pdfrx (document outline), PDFKit (`PDFOutline`), Syncfusion, Apryse, Jetpack PDF — preserve on load and on export.
- **Hyperlinks / GoTo**: pdfrx handles PDF links; Jetpack PDF supports URL + bookmark/GoTo; Syncfusion detects hyperlinks + document link annotations. When you export a flattened copy, keep link annotations live (don't flatten them) so navigation survives.
- **Forms (AcroForm)**: introduced in PDF 1.2; supports text boxes, radio buttons, submit/reset/import. Syncfusion supports fill/flatten/import-export; Nutrient/Apryse full form support; Jetpack PDF form fill is in beta. Note **XFA forms are not compatible with AcroForm** — target AcroForm only.

## A.4 Text extraction for search & highlighting (text layer, quads)
- The **text layer** is the set of text elements in the page content stream (characters + positions + font encoding). Search/selection/highlight all depend on mapping a matched string back to its on-page rectangles (**quads**).
- **Best APIs for quads**: `syncfusion_flutter_pdf` returns extracted text **with position bounds** and search matches **with bounds + page index** — ideal for drawing highlight quads and building a search index. pdf.js exposes a text layer with per-glyph geometry on Web. pdfrx exposes text search and text ranges (verify the exact quad API). PDFKit's `PDFSelection` gives selection bounds natively on iOS.
- **Design**: build a per-document search index (page → text + char boxes) on first open, cache it, and render highlights as an overlay layer keyed to the current zoom transform.

## A.5 Huge PDFs (600+ pages) — performance strategy
Confirmed building blocks: pdfrx does **lazy rendering** (viewer widgets render pages on demand), Syncfusion uses **virtual scrolling** ("pages rendered only when required to increase loading and scrolling performance"), and commercial SDKs (Nutrient) advertise "lazy loading and efficient memory management" for large files.

Recommended strategy layered on pdfrx:
- **Lazy page rendering**: only rasterize pages in/near the viewport; dispose off-screen page bitmaps.
- **Tile caching for zoom**: at high zoom, render the visible region in tiles at display DPI rather than the whole page at full resolution (avoids giant bitmaps). Keep an LRU tile cache sized to a memory budget.
- **Two-resolution scheme**: a cheap low-res "preview" render for fast scroll, replaced by a full-res render when scrolling settles.
- **Page thumbnails**: pre-render small thumbnails (async, background isolate) for a scrubber/outline sidebar so users can jump across 600 pages quickly; cache thumbnails to disk.
- **Background isolates**: do PDFium rasterization and text-index building off the UI isolate.
- **Bounded memory / LRU**: cap resident rendered pages + tiles; recycle bitmaps.
- **Incremental search**: stream results page-by-page (as Jetpack PDF's beta does) instead of blocking on a whole-doc scan.

## A.6 Exporting notes as a PDF with a searchable text layer
- Generate PDFs with the **Dart `pdf` package** (`package:pdf`, **Apache-2.0**, by DavBfr): multi-page docs with text, images, SVG/vector graphics, tables, headers/footers, using **embedded TrueType fonts** — meaning generated text is **real, selectable/searchable text**, not rasterized. This is the key to a searchable export.
- For typed notes → straightforward text runs. For **handwritten ink**, the strokes are vector/image, so to keep the export searchable you must add a **text layer**: run on-device OCR/handwriting recognition and place the recognized text as an **invisible text layer** behind the ink (same technique as searchable-scanned-PDF; supported conceptually via `pdf`/Syncfusion by drawing text in a transparent render mode). (The invisible-text-layer technique is standard but the exact render-mode call should be verified in the chosen library — unverified at API level.)
- For editing/round-tripping existing PDFs (add pages, flatten annotations, set PDF/A), `syncfusion_flutter_pdf` supports **PDF/A-1b/2b/3b** conformance and flattening — good for archival exports.

## A.7 Printing
- Use the **`printing` package** (`package:printing`, **Apache-2.0**, verified publisher nfet.net, v5.15.0): prints to physical printers on Android (native print framework), iOS (**AirPrint**), macOS/Windows/Linux, and **web print**. Provides `PdfPreview` widget (hot-reload preview), `Printing.layoutPdf()` to print, plus save-to-storage and share. Pairs directly with `package:pdf` (`^3.13.0` dependency) and can also render PDF pages to images. This is the standard, permissive print/share path.

## A.8 Recommendation (PDF)

**Core stack (permissive, cross-platform, no per-seat cost):**
- **Render + view + text/search + outline + links**: `pdfrx` (PDFium; MIT) — one engine for iOS/Android/**Web(WASM)**/desktop, avoiding pdf.js glue and MuPDF's AGPL trap.
- **Annotation layer**: draw your own ink/highlight/text overlay on pdfrx's overlay/coordinate system, store marks in your DB (model in A.2), and use **XFDF** for interop. This keeps annotations **live** and gives you full UX control (pressure, audio-synced strokes).
- **Text quads / extraction / manipulation / export**: `syncfusion_flutter_pdf` (text bounds + search bounds, flatten, PDF/A) under its **free Community License** if you qualify, else buy Syncfusion.
- **Generate searchable note PDFs**: `package:pdf` (embedded TrueType = real text layer) + invisible OCR text layer behind ink for searchable handwriting.
- **Print/share**: `package:printing`.

**When to buy a commercial SDK instead:** if you want production-grade, fully-featured annotation/redaction/forms out of the box across iOS/Android/Web with support, choose **Nutrient (PSPDFKit)** (contact-sales, volume pricing) or **Apryse** (from ~$1,500, modular). Budget for this only if the DIY annotation layer proves too costly to reach GoodNotes parity.

**Avoid:** MuPDF (AGPL or paid), and Android `PdfRenderer` as a core (render-only). Jetpack `androidx.pdf` is a good **Android-only** accelerator but is beta for editing and not cross-platform.

---

# Part B — Audio: Recording, Background, Playback, Sync, Transcription, Privacy

## B.1 Recording formats — AAC vs Opus, bitrates for lectures
- **Opus** (BSD + royalty-free patent grant, via Xiph): VBR **6–510 kbit/s**, five sample rates 8–48 kHz, adapts per-frame. Its **SILK** speech mode gives "wideband speech at just 12 kbit/s" and works down to ~5 kbit/s; at ~96 kbit/s it's "slightly superior to AAC," and at **low speech bitrates it beats AAC** because AAC is music-tuned. Very low latency (~26.5 ms). Containers: Ogg (`.opus`), CAF, WebM, Matroska. **Ideal for lectures: ~12–24 kbit/s wideband** — a 1-hour lecture at ~16–24 kbps is roughly **7–11 MB**.
- **AAC-LC**: universally playable, hardware-accelerated on iOS/Android, good general quality; for spoken word use ~**32–64 kbps mono**. Larger than Opus for equal speech quality but maximally compatible.
- **Practical choice**: **Opus for storage/sync efficiency** (huge win for lecture-length recordings), **AAC-LC as a compatibility/export option** (e.g., Safari/older players). Caveat from the `record` package: on iOS Opus is written in a **CAF container** and those files "play only on Apple platforms" — so for cross-platform sync prefer **Ogg/Opus** where available, or transcode.

## B.2 Flutter recording/playback packages

| Package | License | Role | Notes |
|---|---|---|---|
| **record** v7.1.1 | BSD-3 | Recording | Encoders: **AAC-LC/ELD/HE, Opus, FLAC, WAV, PCM16, AMR**. Config bitrate + sample rate via `RecordConfig`. **`amplitude(dBFS)`** for live waveform on all platforms. Pause/resume, device selection, noise suppression (platform-dependent). **Streaming** to PCM16 or AAC-LC. Android/iOS/macOS/Windows/Linux/**Web** (web codec support varies: Chrome/FF do AAC-LC+Opus, Safari WAV/PCM). Has a background-recording setup guide. |
| **flutter_sound** v9.30.0 | MPL-2.0 | Record + play | Codecs incl. AAC, Opus/OGG, FLAC, PCM; record/play **to/from a Dart stream** (PCM Float32/Int16) for live processing; dB-level monitoring for waveform. iOS 10+/Android 21+/Web. Weak copyleft (your app can stay proprietary; changes to flutter_sound stay MPL). Note: roadmap "Taudio/FS 10.0" mentioned as **GPLv3** — pin your version. |
| **just_audio** v(current) | Apache-2.0 + MIT | Playback | `setSpeed()` (**playback speed**), seek, clipping (start/end), gapless playlists, loop/shuffle, `setVolume()`, HLS/DASH/ICY. M4A gives accurate seek tables; MP3 seek is approximate. Android/iOS/macOS/Web/Win/Linux. Background via **`just_audio_background`**. |
| **audio_waveforms** v2.0.2 | MIT | Waveform UI | Live waveform while recording, waveform from a file for playback, **extract & save waveform data** (perf), gesture scrub/seek, colors/gradients. Android + iOS. |

## B.3 Waveform rendering
- Two data sources: **live amplitude** during recording (`record.getAmplitude()` dBFS, or flutter_sound dB monitoring) for the recording meter; and **pre-computed peaks** for playback scrubbing.
- Use **`audio_waveforms`** for both the live recording waveform and the playback waveform-with-scrub. Persist the **extracted peak array** alongside the audio file (its "extract & save waveform data" feature) so you never re-scan large files on open — store as a downsampled `Float32`/`Int8` peaks list at, e.g., 10–50 samples/sec.

## B.4 Playback speed & skip silence
- **Speed**: `just_audio.setSpeed()` gives standard 0.5×–3× playback (confirmed). 
- **Skip silence**: not a documented first-class feature in the packages read (**unverified**). Practical implementations: detect silent spans by thresholding the stored peak/amplitude array and auto-seek across them, or use platform audio-processing. Plan to build this on top of the peaks data rather than expecting it from a package.

## B.5 Background recording rules

### iOS (AVAudioSession + UIBackgroundModes)
- Set category **`.record`** (input only) or **`.playAndRecord`**, activate the session, and add **`UIBackgroundModes` → `audio`** to `Info.plist` — "without the Info.plist `audio` entry, recording will pause when the app enters the background."
- Handle **interruptions** (phone calls, Siri, other apps) via `AVAudioSession.interruptionNotification`: on `.began` pause/stop the engine; on `.ended` check `.shouldResume` and restart. This is essential for lecture recording robustness.
- Modes (`.default`, `.measurement`, `.videoChat`, etc.) refine behavior; `.measurement` is good for clean speech capture (unverified as "best for lectures").
- Add `NSMicrophoneUsageDescription` (and `NSSpeechRecognitionUsageDescription` if transcribing).

### Android (foreground service, API 34+)
- Background mic capture on **Android 14 (API 34)+** requires a **foreground service typed `microphone`**:
  - Manifest: `<service android:foregroundServiceType="microphone"/>`.
  - Permissions: **`FOREGROUND_SERVICE`**, **`FOREGROUND_SERVICE_MICROPHONE`**, **`RECORD_AUDIO`** (runtime).
  - Call `startForeground(id, notification, FOREGROUND_SERVICE_TYPE_MICROPHONE)` and show a **non-dismissible persistent notification** ("audio is being recorded").
- **While-in-use restriction**: you **cannot start a microphone foreground service while the app is in the background** or from `BOOT_COMPLETED` — start it while the app/recording UI is in the foreground, then it may continue in the background.
- In Flutter, drive this with **`flutter_foreground_task`** (MIT): it runs a persistent Android foreground service with a chosen `foregroundServiceType` (incl. `microphone`) and keeps the process alive; Android API 21+. **iOS caveat**: that package's iOS background execution is limited (~30s bursts / killed on force-quit) — on iOS rely on the `UIBackgroundModes: audio` mechanism above, not `flutter_foreground_task`.

## B.6 Syncing ink/text timestamps to the audio timeline (data model & UX)
This is the Notability/GoodNotes signature feature and both confirm the same UX:
- **Notability**: "Audio recordings are synced to the exact moment you write in a note"; tapping handwritten/typed content jumps audio playback to that moment. Also offers transcription to searchable text.
- **GoodNotes 6**: "Record audio notes that are magically synced to the exact moment you write"; during playback "tap any point in your handwritten or typed notes to jump directly to that corresponding moment in the recording." Adds AI transcription/summarization and merge-transcript-with-notes.

### Data model (recommended)
Anchor every note element to a **millisecond offset within a recording session**, using a single monotonic clock started at record time:

```jsonc
// RecordingSession
{
  "id": "uuid",
  "docId": "uuid",
  "audioPath": "opus/aac file",
  "codec": "opus",
  "startedAt": "iso8601",
  "durationMs": 3600000,
  "peaks": [/* downsampled waveform for scrub */],
  "segments": [ { "startMs": 0, "endMs": 3600000 } ] // pause/resume gaps
}

// Time-anchored content event (ink stroke, typed run, or page-turn)
{
  "id": "uuid",
  "sessionId": "uuid",
  "pageIndex": 3,
  "kind": "ink | text | pageTurn",
  "tStartMs": 84210,   // audio offset when the stroke/keypress began
  "tEndMs": 84980,
  "strokeId": "uuid",  // -> annotation with per-point t offsets (see A.2)
  "textRange": { "from": 120, "to": 145 } // for typed notes
}
```
- **Recording side**: on `record.start()`, capture `t0`. Every stroke point and keystroke records `now - t0` (accounting for pause/resume gaps in `segments`). Store per-point `t` inside `inkPaths` so you can even **replay the handwriting** in sync.
- **Playback side**: two directions — (1) tap a stroke/word → look up its `tStartMs` → `just_audio.seek()`; (2) during playback, highlight the strokes/words whose `[tStartMs,tEndMs]` contains the current position (the "follow-along" highlight). Handle pause/resume by mapping wall-clock to audio-clock through `segments`.
- **Multiple recordings per note**: allow several `RecordingSession`s per document (like Notability), each with independent anchors.

## B.7 On-device transcription hand-off
- **iOS**: 
  - `SFSpeechRecognizer` supports on-device via `supportsOnDeviceRecognition`, but the framework **stops tasks longer than ~1 minute** and imposes per-device/day + global rate limits — **not suitable for long lecture transcription** directly.
  - **`SpeechAnalyzer` + `SpeechTranscriber`** (Apple's newer Speech API) is designed for **long-form, decoupled input/output** transcription with **no inherent length restriction**, file or live input, `AsyncSequence`-based, with `prepareToAnalyze()` preheating — the right tool for lecture-length on-device transcription on recent iOS. (Availability/iOS-version specifics not confirmed on the fetched page — verify minimum OS; treat "iOS 26" as unverified.)
- **Android**: `SpeechRecognizer` (wrapped by Flutter's `speech_to_text`) is command/short-phrase oriented; for long audio use offline models.
- **Flutter bridge**: `speech_to_text` (BSD-3) wraps SFSpeechRecognizer + Android SpeechRecognizer for live/dictation, but its own docs warn it's for "commands and short phrases, not continuous... always on listening" and inherits iOS's ~1-minute cap. **Use it for quick voice notes, not lecture transcription.**
- **Recommended hand-off**: record the full lecture to file (Opus/AAC), then transcribe **post-hoc from the file** — on iOS via `SpeechAnalyzer`/`SpeechTranscriber` (or platform channel), and on Android via an offline engine (e.g. a Whisper/`sherpa-onnx`-class on-device model, or a cloud API where the user consents). Align transcript word timestamps to the same audio clock as B.6 so tapping a transcript word also seeks audio and highlights the note written then. (Specific offline-model package choice not benchmarked here — unverified.)

## B.8 Storage & sync size strategy
- **Codec choice dominates size**: Opus @ ~16–24 kbps mono ≈ **7–11 MB/hour**; AAC-LC @ 64 kbps ≈ **~28 MB/hour**. Default to **Opus for stored/synced recordings**, offer AAC export for sharing.
- **Store separately from the note document**: audio blob + peaks + anchor table, referenced by `sessionId`, so note sync (small JSON) is fast and audio can sync lazily / on Wi-Fi only.
- **Chunking**: for very long or still-recording sessions, write audio in segments so partial uploads/resumable sync work and a crash loses only the last chunk.
- **Persist peaks + transcript** as small sidecar files so the UI never rescans the audio.
- **Optional tiering**: keep recent recordings on-device, offload older audio to cloud with a local placeholder (Notability-style).

## B.9 Privacy / consent for recording
- **US law is split**: federal + most states are **one-party consent** (a participant may record), but **all-party (two-party) consent states** — **California, Connecticut, Florida, Hawaii, Illinois, Maryland, Massachusetts, Montana, New Hampshire, Oregon, Pennsylvania, Washington** — require everyone's consent. California's rule can reach callers in one-party states when contacting CA residents.
- **App implication**: "any recording application must comply with the strictest jurisdiction where users operate" — either obtain explicit all-party consent or clearly warn users of their local requirements.
- **Design**:
  - Show a **first-run and per-recording consent/notice** ("You are responsible for obtaining consent; some regions require all parties to agree").
  - A visible **recording indicator** (and Android requires the persistent mic notification anyway; iOS shows the system mic indicator).
  - Optional **audible/haptic start cue** (mirrors the FCC "beep tone" notification concept).
  - Provide easy **delete** and clear storage-location disclosure; keep transcription on-device by default for privacy.
  - Add `NSMicrophoneUsageDescription` / `NSSpeechRecognitionUsageDescription` and the Android permission set with honest rationale strings.

## B.10 Recommendation (Audio)

**Recording**: **`record`** (BSD-3) as the primary recorder — Opus (12–24 kbps wideband) for lectures, AAC-LC fallback; use its `amplitude(dBFS)` for the live meter. Wrap Android background capture in **`flutter_foreground_task`** with `foregroundServiceType: microphone` + the three permissions + persistent notification; on iOS use `UIBackgroundModes: audio` and handle `AVAudioSession.interruptionNotification` for calls/Siri. (`flutter_sound` is a viable alternative if you need Dart-stream PCM processing, but mind its MPL/roadmap-GPL licensing.)

**Playback**: **`just_audio`** (`setSpeed` for speed control, precise seek for tap-to-jump) + **`just_audio_background`** for lock-screen controls. Build **skip-silence** yourself from stored peaks.

**Waveform**: **`audio_waveforms`** for live + playback waveforms; persist its extracted peaks.

**Sync**: single monotonic record clock; anchor every stroke/keystroke/page-turn to `tStartMs` (data model in B.6); tap-to-seek + follow-along highlight; support multiple recordings per note. Store per-point stroke timestamps to enable handwriting replay.

**Transcription**: transcribe **from file, post-hoc** — iOS `SpeechAnalyzer`/`SpeechTranscriber` for long-form on-device; Android offline model; `speech_to_text` only for short voice commands/notes. Align transcript word timestamps to the same clock so transcript, notes, and audio are all mutually navigable.

**Privacy**: default on-device transcription, per-recording consent notice, visible recording indicator, comply with strictest (all-party) consent jurisdiction, easy delete.

---

## Sources

- https://pub.dev/packages/pdfrx
- https://www.nutrient.io/sdk/flutter
- https://apryse.com/pricing
- https://artifex.com/licensing/
- https://developer.android.com/reference/android/graphics/pdf/PdfRenderer
- https://developer.android.com/jetpack/androidx/releases/pdf
- https://mozilla.github.io/pdf.js/
- https://developer.apple.com/documentation/pdfkit
- https://en.wikipedia.org/wiki/PDF
- https://en.wikipedia.org/wiki/XML_Forms_Data_Format
- https://pub.dev/packages/pdf
- https://pub.dev/packages/printing
- https://pub.dev/packages/syncfusion_flutter_pdfviewer
- https://pub.dev/packages/syncfusion_flutter_pdf
- https://docs.apryse.com/documentation/flutter/
- https://www.nutrient.io/guides/web/annotations/introduction-to-annotations/ (via r.jina.ai reader proxy)
- https://pub.dev/packages/record
- https://pub.dev/packages/flutter_sound
- https://pub.dev/packages/just_audio
- https://pub.dev/packages/audio_waveforms
- https://developer.apple.com/documentation/avfaudio/avaudiosession
- https://developer.android.com/develop/background-work/services/fg-service-types
- https://en.wikipedia.org/wiki/Telephone_recording_laws
- https://developer.apple.com/documentation/speech
- https://developer.apple.com/documentation/speech/sfspeechrecognizer (via r.jina.ai reader proxy)
- https://developer.apple.com/documentation/speech/speechanalyzer (via r.jina.ai reader proxy)
- https://en.wikipedia.org/wiki/Opus_(audio_format)
- https://pub.dev/packages/flutter_foreground_task
- https://pub.dev/packages/speech_to_text
- https://apps.apple.com/us/app/notability/id360593530 (via r.jina.ai reader proxy)
- https://apps.apple.com/us/app/goodnotes-6/id1444383602 (via r.jina.ai reader proxy)
- https://github.com/espresso3389/pdfrx

### Sources attempted but unavailable (404/blocked)
- https://mupdf.com/licensing (404 — used https://artifex.com/licensing/ instead)
- https://docs.apryse.com/web/guides/annotation/annotation-types (404 — used Nutrient annotations guide instead)
- https://support.goodnotes.com/hc/en-us/articles/13272258785551 (404 — used the GoodNotes 6 App Store listing instead)
