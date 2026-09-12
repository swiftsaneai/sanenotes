# ADR-0015 — Audio pipeline (record, background, playback, ink/text↔audio sync)

## Status

**Accepted** (M0 Foundations). Serves the lecture-capture use case and locked decisions 3
(local-first, E2E-encrypted), 6 (on-device transcription), 8 (privacy/consent). Related:
[ADR-0008](0008-ink-pipeline-and-low-latency-surfaces.md) (per-point stroke timestamps that make
sync possible), [ADR-0016](0016-on-device-ml-and-ai.md) (transcription). Package: **`sane_audio`**;
native background/permission bits via plugins. Reference research: `research/pdf-and-audio-technology.md`
(Part B), `research/handwriting-recognition-ai-and-ml.md` §§5–6.

## Context

The Notability/GoodNotes signature feature is **audio recordings synced to the exact moment you
write** — tap a stroke/word to jump the audio there, and highlight the ink written at the current
playback time. Lectures are long (1 hour+), must survive backgrounding, phone calls and Siri, and
must be cheap to store and sync. Research (`research/pdf-and-audio-technology.md`) establishes:

- **Codec:** **Opus** (royalty-free) at ~12–24 kbps wideband ≈ **7–11 MB/hour** and beats AAC at
  low speech bitrates; **AAC-LC** (~32–64 kbps mono ≈ ~28 MB/hour) is the maximally compatible
  fallback. Caveat: `record` writes iOS Opus in a **CAF** container that plays only on Apple —
  prefer **Ogg/Opus** for cross-platform sync, or transcode.
- **Packages:** `record` (BSD-3) for recording (Opus/AAC/FLAC/WAV/PCM, `amplitude(dBFS)` live
  meter, pause/resume, streaming, Android/iOS/desktop/**web**); `just_audio` (Apache/MIT) for
  playback (`setSpeed`, precise seek, gapless, background via `just_audio_background`);
  `audio_waveforms` (MIT) for live + playback waveforms and **extract/persist peaks**
  (Android/iOS only). `flutter_sound` (MPL-2.0, roadmap GPL — pin the version) is the Dart-stream
  PCM alternative.
- **Background recording rules:** iOS needs `AVAudioSession` `.record`/`.playAndRecord` +
  **`UIBackgroundModes: audio`** and must handle `interruptionNotification` (calls/Siri). Android
  14+ needs a **foreground service typed `microphone`** with `FOREGROUND_SERVICE`,
  `FOREGROUND_SERVICE_MICROPHONE`, `RECORD_AUDIO`, a persistent notification, and **cannot start
  the mic service from the background** — start it while in the foreground. `flutter_foreground_task`
  (MIT) drives the Android service; its iOS background execution is limited (use `UIBackgroundModes`
  on iOS).
- **Sync model:** anchor every note element to a **millisecond offset within a recording session**
  from a single monotonic record clock; store pause/resume `segments` to map wall-clock↔audio-clock;
  support multiple recordings per note. Per-point stroke timestamps enable **handwriting replay**.
- **Transcription is post-hoc from the file** (not the short-phrase system recognizers): iOS
  `SpeechAnalyzer`/`SpeechTranscriber` for long-form on-device, Android Whisper (whisper.cpp) /
  Vosk; align transcript word timestamps to the same clock ([ADR-0016](0016-on-device-ml-and-ai.md)).
- **Privacy/consent:** US law is split (one-party vs all-party consent states); an app must comply
  with the strictest jurisdiction — show first-run + per-recording consent, a visible recording
  indicator, easy delete, honest permission strings; keep transcription on-device by default.

## Decision

**Record lectures with `record` (Opus wideband, AAC-LC fallback); play back with `just_audio`;
render waveforms with `audio_waveforms` (persisting peaks); anchor every stroke/keystroke/page-turn
to a millisecond offset on one monotonic record clock so ink/text and audio are mutually
navigable; transcribe post-hoc on-device; and gate recording behind explicit consent.**

Specifics:

1. **Recording — `record` (BSD-3):** default **Opus ~16–24 kbps mono wideband** for stored/synced
   recordings; **AAC-LC ~32–64 kbps mono** as a compatibility/export option. Prefer **Ogg/Opus**
   for cross-platform files; if a platform yields CAF/Opus (iOS), transcode or export AAC for
   sharing. Use `amplitude(dBFS)` for the live meter.
2. **Playback — `just_audio` (+ `just_audio_background`):** `setSpeed` (0.5×–3×), precise seek for
   tap-to-jump, lock-screen controls. **Skip-silence** is built on our stored peaks (thresholding +
   auto-seek), not expected from the package.
3. **Waveform — `audio_waveforms`:** live recording waveform + playback waveform with scrub;
   **persist the extracted peak array** (downsampled Float32/Int8, ~10–50 samples/s) as a sidecar
   so the UI never rescans large files. (Android/iOS only — web waveform is a lighter fallback.)
4. **Background capture:** iOS — `AVAudioSession` `.record`/`.playAndRecord`, `UIBackgroundModes:
   audio`, handle `interruptionNotification` (pause on `.began`, resume on `.ended` if
   `.shouldResume`), `NSMicrophoneUsageDescription`. Android — `flutter_foreground_task` with
   `foregroundServiceType: microphone`, the three permissions, persistent non-dismissible
   notification, started **while the recording UI is foreground**.
5. **Sync data model (the core of the feature)** — one monotonic clock per `RecordingSession`:
   ```jsonc
   RecordingSession { id, docId, audioBlobHash, codec, startedAt, durationMs,
                      peaksHash, segments:[{startMs,endMs}] }   // segments = pause/resume gaps
   TimeAnchor { id, sessionId, pageIndex, kind:"ink|text|pageTurn",
                tStartMs, tEndMs, strokeId?, textRange? }
   ```
   On `record.start()` capture `t0`; every stroke point and keystroke stores `now − t0` mapped
   through `segments`. Per-point stroke `t` lives inside the stroke geometry already
   ([ink-engine §10.1](../architecture/ink-engine.md#101-what-we-store)). **Two navigation
   directions:** (a) tap a stroke/word → look up `tStartMs` → `just_audio.seek()`; (b) during
   playback, highlight strokes/words whose `[tStartMs,tEndMs]` spans the playhead
   ("follow-along"). Support **multiple `RecordingSession`s per note**.
6. **Transcription — post-hoc, on-device, from the file:** iOS `SpeechAnalyzer`/`SpeechTranscriber`
   (long-form, no ~1-min cap unlike `SFSpeechRecognizer`); Android/cross-platform whisper.cpp
   (or Vosk for a ~50 MB footprint); align transcript **word timestamps** to the same clock so a
   transcript word also seeks audio and highlights the ink written then. Details and model choice
   in [ADR-0016](0016-on-device-ml-and-ai.md). `speech_to_text` is only for short voice notes.
7. **Storage/sync:** audio blob + peaks + transcript + anchor table stored **separately** from the
   note document, referenced by `sessionId`, so small note JSON syncs fast and audio syncs lazily
   (Wi-Fi-only option). **Chunk** long/still-recording audio into segments for resumable sync and
   crash-safety. All audio artifacts are content-addressed blobs, **E2E-encrypted** on sync
   (decision 3); optional tiering keeps recent audio on-device and offloads old with a placeholder.
8. **Consent & privacy (decision 8):** first-run + **per-recording** consent notice ("some regions
   require all parties to consent"); a visible in-app recording indicator (plus the OS mic
   indicator and the Android persistent notification); optional audible start cue; easy delete;
   honest `NSMicrophoneUsageDescription`/`NSSpeechRecognitionUsageDescription` + Android rationale
   strings; **transcription on-device by default**. Comply with the strictest (all-party) consent
   jurisdiction.

## Alternatives considered

| Choice | Alternative | Verdict |
|---|---|---|
| **`record` for recording** | `flutter_sound` (Dart-stream PCM) | Chosen `record` (BSD-3, simpler, web); `flutter_sound` viable if PCM stream processing needed — mind MPL/roadmap-GPL, pin version |
| **Opus stored / AAC fallback** | AAC-only | Chosen Opus — ~3× smaller for speech; AAC kept for compatibility/export |
| **Own peaks + skip-silence** | expect it from a package | Chosen DIY — skip-silence isn't first-class in the packages; build on stored peaks |
| **Post-hoc file transcription** | live `SFSpeechRecognizer`/system recognizer | Chosen post-hoc — system recognizers cap ~1 min and aren't for continuous lecture audio |
| **DB anchors on one monotonic clock** | store cumulative note time | Chosen absolute offset + `segments` — correct across pause/resume/edits (research warns against cumulative time) |
| **On-device transcription default** | cloud STT default | Chosen on-device (decision 6); cloud only as explicit per-request opt-in |

## Consequences

**Positive**
- Notability-grade audio↔ink sync with a simple, correct model (one clock + anchors + per-point
  stroke timestamps → tap-to-seek, follow-along highlight, and handwriting replay).
- Opus keeps a 1-hour lecture at ~7–11 MB — cheap to store and E2E-sync.
- Robust background capture with correct iOS/Android rules; on-device transcription keeps content
  private and free of server cost.

**Negative / costs**
- Background-recording plumbing is platform-specific and fiddly (foreground service typing;
  interruption handling); force-quit on iOS can end capture.
- `audio_waveforms` is mobile-only — web needs a lighter waveform path.
- iOS Opus/CAF portability requires transcode/AAC-export for cross-platform sharing.
- Long-form on-device transcription is heavy (Whisper models 75 MB–2.9 GB per size) — model
  selection and scheduling matter ([ADR-0016](0016-on-device-ml-and-ai.md)).

**Neutral**
- Multiple recordings per note and pause/resume add model complexity but match user expectations.

## Security & privacy impact

- Audio, peaks, transcripts and anchors are **note content**: content-addressed blobs,
  E2E-encrypted on sync (decision 3), never logged (no transcript text, no file paths in logs;
  [overview §8.2](../architecture/overview.md#82-logging-one-facade-zero-content)).
- **Consent is a compliance control**, not UX polish: per-recording notice + visible indicator +
  strictest-jurisdiction posture (all-party consent states). Recording without the indicator is a
  release blocker.
- Transcription defaults to on-device; any cloud STT is an explicit per-request opt-in with a
  data-leaves-device banner (decision 6). Microphone permission uses an honest rationale string.

## How to verify

1. **Sync accuracy:** a scripted record-while-writing test asserts tap-a-stroke seeks within a
   small tolerance of the write time, and the follow-along highlight tracks the playhead — across
   a pause/resume boundary.
2. **Handwriting replay:** replaying a session redraws strokes in time with the audio using
   per-point `t`.
3. **Background survives:** recording continues when the app is backgrounded (Android foreground
   service shown; iOS `UIBackgroundModes: audio`) and correctly pauses/resumes on a simulated call.
4. **Size:** a 1-hour Opus recording is within the ~7–11 MB range; AAC export plays cross-platform.
5. **Consent gates recording:** no recording starts without the consent flow; the recording
   indicator is visible whenever the mic is live.
6. **Encrypted sync:** audio/peaks/transcript blobs leave the device only as ciphertext.
