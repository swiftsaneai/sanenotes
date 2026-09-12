# Handwriting Recognition, Ink Intelligence, and On-Device AI for a Best-in-Class Note App

_Research compiled 2026-09-13. Every factual claim traces to a page fetched during this research (see **Sources**). Items that could not be confirmed from a fetched page are marked **(unverified)**._

This report surveys the technology stack a modern note-taking app needs to compete with Notability, GoodNotes, Nebo, Samsung Notes, and Apple Notes: handwriting recognition and search, ink-to-text UX, shape beautification, math recognition, lecture-audio transcription with audio-ink sync, on-device LLM features (summarize / Q&A / flashcards), semantic search, translation, and dictation. The organizing principle throughout is **all inference on-device by default, cloud only with explicit per-request opt-in**.

---

## 1. Handwriting recognition & search of ink

There are two fundamentally different input modalities, and the right engine depends on which you have:

- **Online / digital ink** — you have the ordered stroke data (sequences of `(x, y, t)` touch points). This is what a pen/stylus app captures natively. Online recognizers are dramatically more accurate because stroke order and dynamics are strong signals.
- **Offline / image OCR** — you only have a rasterized image (imported photos, scanned PDFs, flattened ink). This needs a vision OCR model.

A serious note app needs **both**: an online engine for live pen input, and an image OCR path for imported content.

### 1.1 MyScript iink SDK (commercial, on-device, online ink) — the category leader

- **Capabilities:** handwriting text recognition, math recognition, diagram/shape recognition, and real-time interactive editing. Interactive Ink supports editing gestures (scratch-to-delete, underline to emphasize), reflow, and keeps converted content editable. It is marketed as "flexible, easy to integrate and OS-agnostic," running **on-device** for "responsive, privacy-conscious handwriting recognition without reliance on cloud processing."
- **Platforms:** mobile, desktop, and web, though "some platforms such as the web do not support the full breadth" of the SDK.
- **Languages:** MyScript's own Nebo app (built on iink) advertises **66 languages** for handwriting recognition — a reasonable proxy for the SDK's text-recognition language coverage.
- **Licensing / pricing** (from MyScript's developer pricing page):
  - **Cloud recognition:** **2,000 free requests** for evaluation; beyond that the service pauses unless you sign a commercial contract. A REST call counts as one request; a WebSocket connection counts all exchanges between open and close (capped at 5 minutes, or 3 minutes of inactivity).
  - **On-device / embedded:** a license activates on first app launch **per device** and is then valid indefinitely. There is a **30-day offline grace period**; after that the device needs internet connectivity periodically to keep recognition working. A factory reset consumes a new license; app updates/reinstalls (without device reset) do not. Licenses are sold in **packs**; when all packs activate, new users lose access until you buy more.
  - **Commercial pricing is negotiated** — contact sales; there is no public per-app price. This is the main downside: MyScript is the best online engine but is a paid, contract-based dependency.

**Verdict:** MyScript is the gold standard for online ink (text + math + diagrams) and the safe choice if budget allows. It is a licensing/vendor-lock consideration, not a technical risk.

### 1.2 Google ML Kit Digital Ink Recognition (free, on-device, online ink)

- **Fully offline / on-device**; keeps storage low by "dynamically downloading language packs as needed."
- **Platforms:** Android and iOS, near-real-time.
- **Input model:** an `Ink` object = a set of strokes, each a sequence of touch points (`x, y, t`) — the same data model you would design anyway.
- **Coverage:** **300+ languages and 25+ writing systems**, plus **emoji** recognition, **basic shape** (autodraw) recognition, and a **gesture classifier** with nine gesture types (arch, caret, circle, scribble, etc.).
- **Pricing:** part of the free ML Kit offering (no per-call cost).
- **Flutter:** a community plugin (`google_mlkit_digital_ink_recognition`) wraps the native API for Flutter apps **(unverified from a fetched page, but widely used)**.

**Verdict:** the best free on-device online-ink option, broad language coverage, and the obvious default for cost-sensitive builds. It lacks MyScript's math/diagram sophistication and interactive-editing polish, but it covers text, shapes, and gestures out of the box.

### 1.3 Apple Vision (`VNRecognizeTextRequest`) — offline image OCR

- **On-device OCR**, available since **iOS 13 / iPadOS 13 / macOS 10.15 / tvOS 13 / visionOS 1**.
- Two recognition paths: a **fast** path (character detection + ML, traditional-OCR style) and an **accurate** path (neural nets that find text as strings/lines, then words/sentences). Choose via `recognitionLevel` (`.fast` / `.accurate`).
- Supports multiple languages via `recognitionLanguages`, `automaticallyDetectsLanguage`, custom-word supplementation, and language correction.
- **Handwriting:** the official "Recognizing text in images" guide focuses on **printed** text and does not document handwriting. Apple's Vision text recognizer is widely reported to recognize **handwritten Latin-script text since iOS 14 (WWDC 2020)**, but this could not be confirmed from a fetched authoritative page **(unverified)**. For live Apple Pencil input, Apple's on-device handwriting-to-text engine is **Scribble** (part of PencilKit / system text input), which is a separate, well-supported path.

**Verdict:** use Vision for **imported images/PDF OCR** on Apple platforms (free, on-device, fast). Do not rely on it as your primary online-ink handwriting engine.

### 1.4 Microsoft Ink Recognizer — dead, do not use

- Azure Cognitive Services "Ink Recognizer" was a **cloud REST API** that recognized handwriting in **63 languages/locales**, plus layout (regions, paragraphs, lines, words, bulleted lists), shapes, and text-vs-shape classification.
- **Preview ended 26 Aug 2020; the service was fully retired 31 Jan 2021**, with no documented successor.

**Verdict:** obsolete. Mentioned only so nobody wastes time evaluating it. On Windows, the local `Windows.UI.Input.Inking.Analysis` (`InkAnalyzer`) API still exists as an on-device alternative **(unverified from a fetched page)**.

### 1.5 Open-source OCR models (offline image handwriting)

- **TrOCR (Microsoft, on Hugging Face):** an end-to-end transformer encoder–decoder (ViT/DeiT image encoder + RoBERTa/XLM-RoBERTa text decoder, wrapped as a `VisionEncoderDecoderModel`). Ships **handwritten** and **printed** checkpoints (`trocr-base-handwritten`, `trocr-large-handwritten`). The base config uses `d_model=1024`, 12 decoder layers, 50,265-token vocab. Approx sizes: **base ≈ 334M params, large ≈ 558M params (unverified exact figures)**. Supports 8-bit quantization (bitsandbytes) to cut memory. Strong accuracy on the IAM handwriting benchmark, but **heavy for phones** — realistic as a cloud-opt-in path or a desktop feature, not a default on-device model.
- **PaddleOCR / PP-OCR:** a full document-AI toolkit with **mobile-friendly tiers** — **Tiny ≈ 1.5M params (edge), Small ≈ 7.7M (mobile), Medium ≈ 34.5M (server)**. PP-OCRv6 covers **50 languages in one unified model** (Chinese, English, Japanese + 46 Latin-script); the PaddleOCR-VL series extends to **109+ languages/scripts** (Cyrillic, Arabic, Devanagari, Telugu, Tamil, Bengali). ONNX/TensorRT export and C++/Java/C# bindings make on-device deployment realistic. Handwriting is supported but is stronger on printed/structured documents.
- **Tesseract:** LSTM line-recognition engine, **100+ languages**, fully offline. Designed for **printed** text; it publishes no handwriting support and is well known to perform poorly on unconstrained handwriting. Fine as a lightweight printed-OCR fallback, not for ink.
- **pix2tex / LaTeX-OCR:** see math section (image→LaTeX).

**On-device size takeaway:** small CNN/CRNN OCR (PP-OCR Tiny/Small, 1.5–8M params) fits comfortably on mobile; transformer OCR (TrOCR) is a cloud/desktop-class model. For *online* ink, ML Kit or MyScript beat any offline OCR model on accuracy and latency because they use stroke dynamics.

---

## 2. Ink-to-text conversion UX

Two interaction models dominate; the best apps offer both and keep the original ink as the source of truth.

- **Convert-as-you-write (ambient):** recognition runs continuously in the background so search, spellcheck, and math results appear live. The ink still looks handwritten. This is what powers "search your handwriting without ever converting it" (GoodNotes indexes handwriting; you can search handwritten notes directly).
- **On-demand / lasso convert (explicit):** the user selects a region (lasso) or the whole page and taps "Convert to text." **Nebo (MyScript) uses this model** — "take notes freely with your pen, then convert handwriting to typed text" when ready — giving the user control over timing while keeping ink editable and reflowable. GoodNotes offers the same via lasso → Convert.

**Recommended UX pattern:**
1. Always run **background recognition** to build a searchable text index per stroke/word (never destroys ink).
2. Offer **explicit lasso→convert** for when the user actually wants typed output.
3. Support **editing gestures on raw ink** (scratch-out to delete, insert, join/split) so users rarely *need* to convert — this is MyScript Interactive Ink's key differentiator.
4. Keep a **stroke↔text mapping** so tapping recognized text can highlight the source ink and vice-versa.

---

## 3. Shape recognition & beautification ("Smart Script"–style refinement)

The UX pattern is consistent across Nebo, GoodNotes, and Samsung Notes: **draw a rough shape, then hold the pen still at the end of the stroke → it snaps to a perfect form** and stays editable ("Interactive diagrams remain editable even when converted to text and perfect shapes"). ML Kit and MyScript both expose shape classifiers.

The engineering breaks into three stages:

### 3.1 Stroke simplification / denoising
- **Ramer–Douglas–Peucker (RDP):** decimates a polyline to fewer points using an **epsilon tolerance**: recursively find the point farthest from the segment joining the endpoints; if its perpendicular distance > ε, keep it and recurse on both halves, else discard all interior points. Complexity **Ω(n log n) best, O(n²) worst** (O(n log n) with a dynamic convex hull). Widely used for ink smoothing and, in robotics, called "split-and-merge."
- **Visvalingam–Whyatt** is a lower-cost alternative (removes points by smallest triangle area).

### 3.2 Shape/gesture classification — the $-family recognizers
- **$1 Unistroke Recognizer:** an instance-based nearest-neighbor classifier with a 2-D Euclidean distance function — a geometric **template matcher**. Pipeline: **resample** the stroke to N equidistant points → **rotate** to a reference angle ("indicative angle") → **scale** to a reference square and translate to origin → **score** against each stored template by average point distance. ~100 lines of code, one template per gesture is enough. **Protractor** is a faster scoring variant.
- **$N:** extends $1 to **multistroke** gestures (handles stroke order/combination permutations).
- **$P:** treats the gesture as a **point cloud**, ignoring stroke number, order, and direction — simpler and robust for shapes drawn in any order.
- **$Q:** a low-power optimization of $P, reported **~142× faster** — suitable for phones/wearables.

These tell you *which* shape was drawn; then you fit it geometrically.

### 3.3 Geometric fitting (the "beautification")
- **Line:** fit a least-squares line through the simplified points; snap endpoints; optionally angle-snap to 0/45/90°.
- **Circle:** algebraic least-squares circle fit (**Kåsa** or the more stable **Taubin** fit) to recover center + radius **(method names unverified from a fetched page; standard techniques)**.
- **Ellipse:** **Fitzgibbon direct least-squares** fit to the general conic `Ax² + Bxy + Cy² + Dx + Ey + F = 0` with the ellipse constraint `B² − 4AC < 0`; solve for center, semi-axes, and rotation. A circle is the special case `A = C, B = 0`.
- **Polygon (rectangle/triangle/etc.):** run RDP to reduce to candidate corners, then snap edges to equal lengths / right angles / regular-polygon templates.

**Recommended stack:** RDP for cleanup → $P/$Q (or ML Kit's shape classifier) for "what shape" → least-squares circle/ellipse + polyline-corner snapping for "make it perfect," with the "hold to convert" trigger and full post-edit handles.

---

## 4. Math recognition

- **MyScript Math (in iink / Nebo / MyScript Calculator):** handwritten math → editable expressions; **solve, plot functions, use variables, work with matrices**; **on-device**; supports "edit with a scratch." The most complete on-device handwritten-math engine; same licensing as §1.1.
- **Apple Math Notes:** built into **Notes and Calculator on iOS/iPadOS/macOS 26**. Solves typed expressions inline the moment you type `=`; works with variables; on **iPad with Apple Pencil it solves handwritten math** and supports **graphing equations** and **variables**; processing is on-device. Free on Apple hardware (originally shipped in iPadOS 18; iPadOS 26 is current).
- **Mathpix (cloud):** the Convert/OCR API recognizes **printed and handwritten STEM** content — math, text, tables, and chemistry diagrams — from **images, PDFs, and stroke data**. Outputs Mathpix Markdown plus **LaTeX, MathML, DOCX, XLSX, HTML, PDF, PPTX**. **Pricing:** Snip app **Free / Pro from $4.99/mo**; **OCR API pay-as-you-go from $0.002/image**; enterprise/"Secure Conversion Service" is custom. **Cloud-only — no on-device SDK.** Best as an opt-in high-accuracy fallback.
- **Microsoft Math Solver:** recognized handwritten math with step-by-step solutions, interactive graphs, and video/practice links across web/Android/iOS/Edge/Office. **No public API**, and **Microsoft Math was retired 7 July 2025** — not a platform to build on.
- **Open im2latex models:** the image→LaTeX task has solid open models — **im2markup** (original), **pix2tex / LaTeX-OCR** (ViT+ResNet encoder + transformer decoder; BLEU 0.88, normalized edit distance 0.10, token accuracy 0.60; runs fully locally via `pip install pix2tex`; trained on Wikipedia/arXiv/im2latex-100k), and **Nougat** for full documents **(Nougat unverified from a fetched page)**. These are viable as a self-hosted or on-desktop math-OCR path.

**Recommendation:** MyScript or Apple Math Notes for on-device handwritten math; Mathpix as an explicit opt-in cloud path for hard/printed/chemistry content; pix2tex if you want an open self-hosted alternative.

---

## 5. On-device transcription of lecture audio

- **WhisperKit (Argmax, Apple platforms):** on-device Whisper via **Core ML**; requires **macOS 14+/iOS 18+, Xcode 16+**. Models: tiny, base, small, and **large-v3 turbo (~626 MB compressed)**; auto-selects a model for the device. **Memory-efficient streaming** (`.incremental` mode splits long files at silence boundaries with bounded memory), **word- and segment-level timestamps**, custom fine-tuned models via `whisperkittools`, and an OpenAI-compatible local HTTP server. **MIT-licensed.** Best-in-class for high-quality on-device transcription on iOS/macOS.
- **whisper.cpp (cross-platform C/C++):** disk sizes **tiny 75 MB, base 142 MB, small 466 MB, medium 1.5 GB, large 2.9 GB**; runs on **iOS, Android, macOS, Linux, Windows, WASM, Raspberry Pi**; Core ML/Metal/CUDA/Vulkan acceleration; **word-level timestamps** (`-ml 1`), **VAD** (Silero), **speaker segmentation** via tinydiarize, streaming, and quantization. The portable engine of choice for Android and cross-platform.
- **Apple SpeechAnalyzer + SpeechTranscriber (iOS/macOS 26):** Apple's new **on-device** speech framework; modular async design (vs `SFSpeechRecognizer`'s delegate model); accepts files, mics, and audio buffers; supports locale-specific transcription with language detection and time-code synchronization (can skip and resume). Apple positions it for **long-form** audio (Notes/Voice Memos transcription) — a strong native default on the newest OSes.
- **Android SpeechRecognizer (on-device):** `createOnDeviceSpeechRecognizer()` + `isOnDeviceRecognitionAvailable()` (**API 31+**), with `triggerModelDownload()` for language packs (API 33/34+). **Explicitly "not intended for continuous recognition"** (battery/bandwidth) — so for full lecture transcription on Android, prefer **whisper.cpp/WhisperKit-style Whisper** over the system recognizer.
- **Vosk:** offline toolkit, **20+ languages**, **~50 MB small models** (plus larger server models), runs on Android/iOS/Python/Raspberry Pi, streaming API, **speaker identification**, **word timestamps**, and Java/C#/JS bindings. Good lightweight cross-platform fallback where a 50 MB footprint matters.

**Recommendation:** WhisperKit on Apple / whisper.cpp on Android as the accurate default; SpeechAnalyzer where OS 26 is available; Vosk as a tiny-footprint option; Android system SpeechRecognizer only for short dictation, not lectures.

---

## 6. Audio-ink sync ("tap a word to hear the audio," Notability-style)

Notability's App Store description confirms the feature: **"Audio recordings are synced to the exact moment you write in a note — perfect for lectures,"** with handwriting/transcript/PDF search and live transcription on top.

**Algorithm to replicate it:**
1. When recording, capture a monotonic **audio start time**. Every ink stroke already has timestamps; store, per stroke, an **offset into the audio timeline** (`strokeStartMs = strokeTime − recordStart`).
2. Build a map `strokeId → audioTimeMs` (and, when you have ASR **word timestamps**, `wordId → audioTimeMs` for both spoken and recognized-ink words).
3. **Tap-to-play:** on tapping a stroke/word, seek the player to the mapped time and play.
4. **Playhead-follows-ink:** during playback, highlight the ink that was written at the current audio time (reverse lookup by time range).
5. With Whisper/SpeechAnalyzer word timestamps you also get **"tap a transcript word → jump audio"** and can align spoken words to nearby ink for richer cross-navigation.

This is straightforward once strokes and ASR output share one clock; the only care needed is handling pauses/edits (store absolute wall-clock, not cumulative note time).

---

## 7. On-device LLM: summarize, Q&A, flashcards

- **Apple Foundation Models (iOS/iPadOS/macOS/visionOS 26, watchOS 27):** on-device LLM for summarization, entity extraction, text/image understanding, refinement, and creative writing. **Guided generation** via the `@Generable` macro produces typed Swift structs (ideal for flashcard JSON, quiz objects, structured summaries). **Tool calling** lets the model query your app's data. Multimodal (image + text). For heavier reasoning/longer context, requests can route to **Private Cloud Compute** with stated privacy guarantees. Reported on-device model size **~3B params (unverified from a fetched page)**. Requires Apple-Intelligence-capable devices.
- **ML Kit GenAI (Gemini Nano via AICore, Android):** on-device **summarization, proofreading, rewriting, image description, speech recognition, and a Prompt API** — "input, inference, and output data is processed locally," no network needed, no server cost; Gemini Nano is **shared across apps** on-device. Runs on select **Pixel, Galaxy, OnePlus, OPPO** flagships; Prompt API spans **nano-v2/v3/v4**. Constraints: **foreground-only** (`BACKGROUND_USE_BLOCKED`) and **per-app quotas** (`BUSY`).
- **MLC LLM:** a compiler + **MLCEngine** with an **OpenAI-compatible API across REST/Python/JS/iOS/Android**, running quantized Llama/Gemma/Phi/Mistral/Qwen on-device GPUs. The most flexible way to ship a *chosen* open model on both mobile OSes.
- **WebLLM:** in-browser inference via **WebGPU**, **full OpenAI API compatibility**, models incl. Llama 3, Phi 3, Gemma-2B, Mistral, Qwen (0.5B–7B); **fully client-side** (no server), with model caching (Cache API/IndexedDB/OPFS). Companion to MLC LLM — the web-app answer.
- **llama.cpp** (GGUF quantized models on mobile/desktop) and **Transformers.js** (ONNX Runtime Web in the browser) are additional open routes **(both unverified from a fetched page here, but standard)**.

**Flashcard generation** is best implemented as **structured output** from whichever on-device LLM is available: feed recognized note text (or a lecture transcript) and request a typed array of `{question, answer, sourceRef}` — Apple's guided generation and ML Kit's Prompt API both support this natively.

---

## 8. Semantic search with local embeddings

- **Embedding model — EmbeddingGemma:** **308M params** (~100M model + 200M embedding), Gemma-3-based, trained on **100+ languages**, tops the MTEB leaderboard for open multilingual models **under 500M params**. **Matryoshka** dimensions **768 → 512 / 256 / 128** trade quality for speed/storage; **<200 MB RAM** with quantization-aware training; **<15 ms per 256 tokens on EdgeTPU**; 2K-token context; integrates with sentence-transformers, Ollama, LM Studio, LangChain. Purpose-built for **on-device RAG / semantic search**. (Apple's `NLEmbedding` / on-device sentence embeddings are an Apple-native alternative **(unverified)**.)
- **Vector store — sqlite-vec:** a dependency-free **C SQLite extension**; stores **float, int8, and binary vectors** in `vec0` virtual tables (with metadata/partition columns); brute-force **KNN**; runs on **Linux/macOS/Windows/WASM/embedded**; bindings for Python/Node/Ruby/Go/Rust. Pre-v1 (breaking changes possible) but ideal: your notes DB is likely SQLite already, so embeddings live right next to content with no extra service.

**Recommended pipeline:** on note save → recognize ink to text → chunk → embed with EmbeddingGemma (256-dim Matryoshka for footprint) → store in sqlite-vec → semantic search + on-device-LLM RAG for "chat with your notes," entirely offline.

---

## 9. Translation & dictation

- **Translation (on-device):** **ML Kit Translation** covers **50+ languages** offline with dynamic model download, using "the same models used by the Google Translate app's offline mode." Caveats: it's for "casual and simple translations," and **non-English pairs pivot through English**, which can hurt quality. Apple's on-device **Translation framework** is the equivalent on Apple platforms **(unverified from a fetched page)**. Per-language packs are on the order of tens of MB.
- **Dictation:** reuse the §5 stack — Apple **SpeechAnalyzer/SFSpeechRecognizer** and Android **on-device SpeechRecognizer** for quick dictation; Whisper (WhisperKit/whisper.cpp) when you want higher accuracy or the same engine as lecture transcription.

---

## Recommendation per platform

### iOS / iPadOS / macOS (Apple)
- **Online ink handwriting:** **MyScript iink** (best; paid) or **ML Kit Digital Ink** (free) as the default; use **Apple Scribble/PencilKit** for system text-field input.
- **Image OCR (imports):** **Apple Vision** (`VNRecognizeTextRequest`, on-device, free).
- **Shapes:** RDP + $P/$Q + least-squares circle/ellipse; or MyScript's shape engine.
- **Math:** **Apple Math Notes** (OS 26) and/or **MyScript Math**; **Mathpix** as opt-in cloud.
- **Transcription:** **WhisperKit** (Core ML), or **SpeechAnalyzer** on OS 26.
- **LLM (summaries/flashcards/Q&A):** **Apple Foundation Models** with guided generation; **Private Cloud Compute** as the privacy-preserving opt-in escalation.
- **Embeddings/search:** EmbeddingGemma + sqlite-vec. **Translation:** Apple Translation / ML Kit.

### Android
- **Online ink handwriting:** **ML Kit Digital Ink Recognition** (free, 300+ languages) as default; **MyScript iink** if you want top-tier math/diagram.
- **Image OCR:** ML Kit Text Recognition v2 / **PaddleOCR** (Tiny/Small) for offline.
- **Shapes/math:** same algorithms; MyScript for math, Mathpix opt-in.
- **Transcription:** **whisper.cpp** (or Vosk for tiny footprint); avoid the system recognizer for long lectures.
- **LLM:** **ML Kit GenAI / Gemini Nano** on supported flagships; **MLC LLM** to ship a chosen open model more broadly.
- **Embeddings/search:** EmbeddingGemma + sqlite-vec. **Translation:** ML Kit Translation.

### Web / cross-platform (Flutter/React)
- **Ink:** ML Kit via Flutter plugin on mobile; on web, a custom recognizer or a cloud opt-in (no strong free in-browser online-ink engine).
- **Image OCR:** Tesseract.js / PaddleOCR (WASM); TrOCR/pix2tex server-side opt-in.
- **LLM:** **WebLLM** (WebGPU) for fully-local browser inference; **Transformers.js** for embeddings + small models.
- **Search:** sqlite-vec compiled to WASM + EmbeddingGemma.

### Cross-cutting
- Prefer **MyScript** when budget allows and you want one vendor for text+math+diagrams+shapes on-device with polished interactive editing; prefer the **ML Kit + Whisper + EmbeddingGemma + sqlite-vec + on-device LLM** stack when you want a free/open, privacy-first foundation.

---

## Privacy posture

**Principle: all inference runs on-device by default; the cloud is used only with explicit, per-request user opt-in.**

- **On-device by default.** Every core capability has a fully local implementation: ink recognition (MyScript on-device / ML Kit "works fully offline, keeps handwriting data entirely on the device"), image OCR (Apple Vision, PaddleOCR, Tesseract), math (Apple Math Notes / MyScript on-device), transcription (WhisperKit / whisper.cpp / Vosk / Apple SpeechAnalyzer — all local), LLM tasks (Apple Foundation Models / Gemini Nano — "input, inference, and output data is processed locally"), embeddings/search (EmbeddingGemma <200 MB RAM + sqlite-vec), and translation (ML Kit / Apple Translation offline). No note content needs to leave the device for the default experience.
- **Cloud only on explicit opt-in.** Reserve cloud calls for capabilities that genuinely exceed on-device limits — Mathpix for hard/printed/chemistry math, a large cloud LLM for deep reasoning or very long context, or high-accuracy cloud translation. Gate each behind a clear per-request consent ("Send this to [service] to improve results?"), never a global always-on toggle, and surface exactly what leaves the device.
- **Privacy-preserving escalation.** Apple **Private Cloud Compute** is the model to emulate: server-side compute with cryptographic privacy guarantees, invoked transparently as an escalation from the on-device model rather than a silent default. If you build your own cloud fallback, mirror this: ephemeral processing, no training on user data, per-request scoping, and auditable data handling.
- **Licensing caveat that affects privacy design:** MyScript's on-device recognition still needs **periodic connectivity after a 30-day offline grace period** to keep licenses valid — a network dependency to document even though recognition itself is local. ML Kit's on-device path has no such requirement.
- **Data residency:** because ink, audio, transcripts, embeddings, and the vector index can all live in one local SQLite database (with sqlite-vec), the default architecture keeps 100% of user knowledge on-device and end-to-end-encryptable in sync — the strongest possible privacy story for a note app.

---

## Sources

- https://developers.google.com/ml-kit/vision/digital-ink-recognition
- https://developers.google.com/ml-kit/vision/digital-ink-recognition/languages
- https://developer.myscript.com/docs/interactive-ink/latest/overview/about/ (via r.jina.ai)
- https://www.myscript.com/technology (via r.jina.ai)
- https://www.myscript.com/interactive-ink (via r.jina.ai)
- https://developer.myscript.com/pricing (via r.jina.ai)
- https://www.myscript.com/pricing (via r.jina.ai)
- https://www.nebo.app/ (via r.jina.ai)
- https://developer.apple.com/documentation/vision/recognizing-text-in-images
- https://developer.apple.com/documentation/vision/vnrecognizetextrequest
- https://learn.microsoft.com/en-us/azure/cognitive-services/Ink-Recognizer/overview (via r.jina.ai)
- https://huggingface.co/docs/transformers/en/model_doc/trocr
- https://raw.githubusercontent.com/PaddlePaddle/PaddleOCR/main/README.md
- https://raw.githubusercontent.com/tesseract-ocr/tesseract/blob/main/README.md (via r.jina.ai)
- https://raw.githubusercontent.com/lukas-blecher/LaTeX-OCR/main/README.md
- https://depts.washington.edu/acelab/proj/dollar/index.html
- https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
- https://en.wikipedia.org/wiki/Ellipse
- https://mathpix.com/pricing/all (via r.jina.ai)
- https://mathpix.com/pricing
- https://docs.mathpix.com/ (via r.jina.ai)
- https://support.apple.com/guide/notes/math-notes-not8b6b8a0e6/mac (via r.jina.ai)
- https://support.apple.com/guide/ipad/use-math-notes-ipadab5b8f5a/ipados (via r.jina.ai)
- https://en.wikipedia.org/wiki/Microsoft_Math_Solver
- https://raw.githubusercontent.com/argmaxinc/WhisperKit/main/README.md
- https://raw.githubusercontent.com/ggml-org/whisper.cpp/master/README.md
- https://developer.apple.com/documentation/speech/speechanalyzer (via r.jina.ai)
- https://developer.android.com/reference/android/speech/SpeechRecognizer (via r.jina.ai)
- https://alphacephei.com/vosk/ (via r.jina.ai)
- https://developer.apple.com/documentation/foundationmodels (via r.jina.ai)
- https://developers.google.com/ml-kit/genai
- https://developers.google.com/ml-kit/language/translation
- https://llm.mlc.ai/ (via r.jina.ai)
- https://raw.githubusercontent.com/mlc-ai/web-llm/main/README.md
- https://raw.githubusercontent.com/asg017/sqlite-vec/main/README.md
- https://developers.googleblog.com/en/introducing-embeddinggemma/ (via r.jina.ai)
- https://www.goodnotes.com/features (via r.jina.ai)
- https://apps.apple.com/us/app/notability-take-notes-annotate/id360593530 (via r.jina.ai)
- https://notability.com/ (via r.jina.ai)
