# ADR-0016 — On-device ML & AI ("Sane Sage": recognition, transcription, LLM, search)

## Status

**Accepted** (M0 Foundations). Implements locked decision 6 (**AI on-device by default; any cloud
inference is explicit per-request opt-in with a visible data-leaves-device indicator**) and
decision 8 (privacy). Related: [ADR-0008](0008-ink-pipeline-and-low-latency-surfaces.md) (ink the
recognizers consume), [ADR-0015](0015-audio-pipeline.md) (transcription hand-off),
[ADR-0012](0012-native-plugin-strategy.md) (native ML plugins). Packages: **`sane_ml`** (pure-Dart
adapter interfaces + orchestration), plugin **`sane_ml_native`** (Vision/Speech/Foundation Models
on Apple; ML Kit/Gemini Nano on Android; Whisper on web/wasm). Reference research:
`research/handwriting-recognition-ai-and-ml.md`, `research/apple-pencil-ipados-capabilities.md`
§§6–7, `research/android-stylus-capabilities.md` §§3–4.

## Context

"Sane Sage" is the AI layer: handwriting search & convert, math recognition, shape beautification,
lecture transcription synced to ink, summaries, Q&A over notes, and flashcards (decision 6). The
non-negotiable is **on-device by default, cloud only on explicit per-request opt-in**. The
research maps a mature on-device stack per capability and per platform:

- **Online ink → text** (we have ordered stroke data, far more accurate than image OCR):
  **ML Kit Digital Ink Recognition** (free, on-device, **300+ languages / 25+ scripts**, plus
  emoji/shape/gesture classifiers; Android+iOS) is the default; **MyScript iink** (commercial,
  on-device, text+math+diagrams+interactive editing, ~66 languages) is the premium upgrade — note
  MyScript's on-device licence needs **periodic connectivity after a 30-day grace**.
- **Image OCR** (imports/photos/flattened ink): **Apple Vision** `VNRecognizeTextRequest`
  (on-device, free) on Apple; **ML Kit Text Recognition** / **PaddleOCR** (Tiny/Small, mobile) on
  Android; **Tesseract.js** on web (weak on handwriting). TrOCR/pix2tex are cloud/desktop-class.
- **Shapes:** RDP → $P/$Q recognizers → least-squares fit (see
  [ink-engine §9](../architecture/ink-engine.md#9-shape-recognition)); ML Kit's shape/gesture
  classifier as a mobile accelerator.
- **Math:** MyScript Math or Apple Math Notes (OS 26, on-device handwritten math + graphing);
  **Mathpix** as an explicit cloud opt-in for hard/printed/chemistry; pix2tex as an open
  self-hosted alternative.
- **Transcription:** WhisperKit (Core ML, Apple) / whisper.cpp (cross-platform) / Apple
  SpeechAnalyzer (OS 26) / Vosk (tiny) — **post-hoc from the recorded file**
  ([ADR-0015](0015-audio-pipeline.md)); system short-phrase recognizers are unsuitable for
  lectures.
- **On-device LLM** (summaries/Q&A/flashcards): **Apple Foundation Models** (~3B, `@Generable`
  guided generation → typed structs, tool calling, Private Cloud Compute escalation) on Apple;
  **ML Kit GenAI / Gemini Nano via AICore** (summarize/proofread/rewrite/describe/Prompt API,
  foreground-only, per-app quota) on supported Android flagships; **MLC LLM** (chosen open model
  on device) and **WebLLM** (WebGPU in-browser) for breadth and web.
- **Semantic search:** **EmbeddingGemma** (308M, 100+ languages, Matryoshka 768→128, <200 MB RAM)
  + **sqlite-vec** (vectors next to notes in SQLite) → on-device RAG "chat with your notes."
- **Privacy posture:** every core capability has a fully-local implementation; cloud is an
  explicit, per-request, transparent escalation (Apple Private Cloud Compute is the model).

The design tension: capability and language coverage vary wildly by device, OS version and price,
and some best options are commercial (MyScript, Mathpix) or web-absent (ML Kit is mobile-only).
We need one interface that hides this and always has a local default.

## Decision

**Define capability-based adapter interfaces in `sane_ml` (pure Dart) with a runtime registry that
always resolves to an on-device implementation first; wire platform engines through the
`sane_ml_native` plugin; and gate every cloud path behind explicit per-request opt-in with a
visible data-leaves-device indicator.**

Specifics:

1. **Capability interfaces** (`sane_ml`, pure-Dart, no `package:flutter`): `InkRecognizer`,
   `ImageOcr`, `ShapeRecognizer`, `MathRecognizer`, `Transcriber`, `TextGenerator` (summaries/Q&A/
   rewrite/flashcards), `Embedder`, `Translator`. Each returns `Result<T, Failure>`
   ([overview §8.1](../architecture/overview.md#81-errors-result-for-the-expected-exceptions-for-the-impossible)).
   Callers depend only on the interface; the engine is resolved at runtime.
2. **Runtime registry, on-device-first:** for each capability, register the available
   implementations per platform/device and resolve the **best available on-device** one; a cloud
   implementation is only ever selected when the user explicitly opts in for that request. No
   silent cloud fallback. Ever.
3. **Default engine matrix:**

   | Capability | Apple (default) | Android (default) | Web (default) | Premium / opt-in |
   |---|---|---|---|---|
   | Ink→text | ML Kit Digital Ink (or Scribble for field input) | ML Kit Digital Ink (300+ langs) | custom/none → cloud opt-in | **MyScript iink** (text+math+diagrams) |
   | Image OCR | Apple Vision (`VNRecognizeTextRequest`) | ML Kit Text Rec / PaddleOCR | Tesseract.js (WASM) | cloud OCR / TrOCR (opt-in) |
   | Shapes | RDP+$P/$Q (ours) / ML Kit shapes | RDP+$P/$Q / ML Kit shapes | RDP+$P/$Q (ours) | MyScript shapes |
   | Math | Apple Math Notes / MyScript | MyScript | (none local) | **Mathpix** (cloud opt-in) |
   | Transcription | WhisperKit / SpeechAnalyzer (26) | whisper.cpp / Vosk | whisper.cpp WASM | cloud STT (opt-in) |
   | LLM tasks | Apple Foundation Models | ML Kit GenAI (Gemini Nano) / MLC LLM | WebLLM (WebGPU) | Private Cloud Compute / cloud LLM (opt-in) |
   | Embeddings | EmbeddingGemma + sqlite-vec | EmbeddingGemma + sqlite-vec | EmbeddingGemma + sqlite-vec (WASM) | — |
   | Translation | Apple Translation / ML Kit | ML Kit Translation (50+, pivots via English) | (limited) | cloud translate (opt-in) |

4. **Native engines via `sane_ml_native`** (federated plugin, [ADR-0012](0012-native-plugin-strategy.md)):
   Apple Vision/Speech (`SpeechAnalyzer`/`SpeechTranscriber`)/Foundation Models (`@Generable`
   guided generation for typed flashcards/summaries; tool calling); Android ML Kit Digital
   Ink/Text/GenAI (Gemini Nano, **foreground-only**, per-app quota — handle `BUSY`/
   `BACKGROUND_USE_BLOCKED`); Whisper on web/wasm. A **mock impl** backs every method for tests.
5. **Ink-to-text UX** (`research/handwriting-recognition-ai-and-ml.md` §2): always run **background
   recognition** to build a searchable per-word/per-stroke text index **without destroying ink**;
   offer **explicit lasso→convert** for typed output; keep a **stroke↔text mapping** so tapping
   recognised text highlights the source ink and vice-versa; support editing gestures on raw ink.
   Recognition never mutates the document silently.
6. **Semantic search / RAG:** on note save → recognise ink to text → chunk → embed with
   EmbeddingGemma (256-dim Matryoshka for footprint) → store in **sqlite-vec** next to notes →
   on-device LLM RAG for "chat with your notes," entirely offline. The vector index is part of the
   local store, E2E-encryptable on sync.
7. **Cloud is explicit, per-request, transparent (decision 6):** any cloud call (Mathpix, a large
   cloud LLM for deep reasoning/long context, high-accuracy cloud OCR/translate) is a **per-request
   opt-in** — never a global always-on toggle, never a silent fallback — with a visible
   **data-leaves-device banner** stating exactly what is sent and to whom. `SANE_AI_CLOUD_ENABLED`
   is a master gate (default false; [overview §7.1](../architecture/overview.md#71---dart-define-matrix)),
   and even when enabled each use still prompts. Mirror **Apple Private Cloud Compute** semantics
   for any first-party cloud escalation: ephemeral, per-request-scoped, no training on user data.
8. **Models are downloaded on demand** (ML Kit language packs; Whisper/EmbeddingGemma weights) with
   the user's awareness of size; missing model ⇒ the capability degrades gracefully (offer download
   or cloud opt-in), never a crash.
9. **Model provenance & licensing** recorded in the SBOM (decision 8): ML Kit / Gemini Nano
   (Google terms), MyScript (commercial contract + the 30-day-connectivity licence caveat — a
   network dependency to document even though inference is local), Mathpix (cloud, paid), Whisper
   (MIT), EmbeddingGemma / sqlite-vec (open). MyScript and Mathpix are optional dependencies behind
   the interface, never required for the default experience.

## Alternatives considered

| Choice | Alternative | Verdict |
|---|---|---|
| **ML Kit Digital Ink as default ink→text** | MyScript as default | Chosen ML Kit — free, on-device, 300+ langs, no licence-connectivity caveat; **MyScript is the premium opt-in** for math/diagrams/interactive editing |
| **On-device-first registry, no silent cloud fallback** | cloud-first or auto-fallback | Chosen on-device-first — decision 6; silent cloud would leak note content |
| **Post-hoc file transcription (Whisper/SpeechAnalyzer)** | live system recognizer | Chosen post-hoc — system recognizers cap ~1 min, not for lectures ([ADR-0015](0015-audio-pipeline.md)) |
| **Apple Foundation Models / Gemini Nano for LLM** | ship our own bundled LLM everywhere | Chosen platform models (free, private, no app-size cost) + MLC/WebLLM to fill gaps; bundling a model everywhere is heavy |
| **EmbeddingGemma + sqlite-vec** | a separate vector service | Chosen — embeddings live in the notes SQLite, zero extra service, offline |
| **Background non-destructive recognition + explicit convert** | convert-only or auto-convert | Chosen both modes, ink stays source of truth (Nebo/GoodNotes pattern) |
| Microsoft Ink Recognizer / Math Solver | — | Rejected — **retired** (2021 / 2025); do not build on |

## Consequences

**Positive**
- One `sane_ml` interface hides wildly different engines; the app always has an on-device default
  and a clear premium/cloud upgrade path.
- Strongest privacy story: ink, audio, transcripts, embeddings and the vector index can all live
  in one local, E2E-encryptable SQLite DB — no note content need leave the device by default.
- Non-destructive background recognition gives "search your handwriting without converting it,"
  plus explicit convert and stroke↔text mapping.
- Guided generation (Apple `@Generable` / ML Kit Prompt API) yields typed flashcards/summaries
  directly.

**Negative / costs**
- **Capability varies by device/OS/price:** ML Kit is mobile-only (web needs a custom/cloud path);
  Gemini Nano and Foundation Models require capable flagships/OS 26; MyScript and Mathpix are paid;
  Whisper/EmbeddingGemma weights are large downloads. The registry + graceful-degradation logic is
  real complexity.
- **MyScript on-device licence needs periodic connectivity** after a 30-day grace — a documented
  network dependency even for "on-device."
- **Web AI is the weakest surface** (no ML Kit; WebLLM/Whisper-WASM need WebGPU / COOP-COEP), in
  line with the general web constraints ([ADR-0010](0010-web-pwa-strategy.md)).
- Several research facts are **unverified** (exact Apple Vision handwriting language list;
  Foundation Models size; SpeechAnalyzer min OS) — verify at implementation, don't hardcode.

**Neutral**
- Some capabilities (advanced math, chemistry, very long-context reasoning) genuinely exceed
  on-device limits and are best served by an explicit cloud opt-in — acceptable under decision 6.

## Security & privacy impact

- **On-device by default is the privacy control**: the registry MUST resolve local first and MUST
  NOT fall back to cloud silently. Each cloud use is a per-request opt-in with a data-leaves-device
  banner naming the service and the data (decision 6).
- Recognised text, transcripts, embeddings and model I/O are **note content**: stored locally,
  E2E-encryptable on sync, **never logged** (no recognised text, no prompts, no transcripts in
  logs; [overview §8.2](../architecture/overview.md#82-logging-one-facade-zero-content)).
- Downloaded models are integrity-checked (hash/signature) before use; untrusted image/PDF inputs
  to OCR are handled defensively.
- SBOM records every model + engine and its licence/terms; MyScript's connectivity caveat and any
  cloud service's data handling are documented in `docs/security/` and the privacy labels
  (decision 8: Play "no data collected" except opt-in; App Store privacy labels).

## How to verify

1. **On-device-first proven:** with `SANE_AI_CLOUD_ENABLED=false` (default), every capability
   resolves to a local engine or degrades gracefully; no network call carries note content.
2. **Cloud is per-request + banner:** enabling cloud still prompts per use and shows the
   data-leaves-device banner; a test asserts no cloud call fires without an explicit opt-in.
3. **Non-destructive recognition:** background recognition builds a searchable index without
   modifying strokes; lasso→convert produces typed text and preserves the source ink; tapping
   recognised text highlights the ink.
4. **Audio-sync alignment:** transcript word timestamps align to the [ADR-0015](0015-audio-pipeline.md)
   record clock (tap a transcript word seeks audio and highlights the ink written then).
5. **Graceful model absence:** a missing model offers download or cloud opt-in rather than
   crashing; ML Kit language packs download on demand.
6. **No PII/content in logs**; SBOM lists all models + licences; MyScript/Mathpix are absent from
   the default build's required dependencies.
