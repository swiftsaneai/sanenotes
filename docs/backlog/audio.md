# Backlog — area: audio

31 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-AUD-001](audio.md#sn-aud-001) **Build lecture audio: record, sync to ink/text, and transcribe on-device** (epic · M3 Audio & Recognition)
  - [SN-AUD-002](audio.md#sn-aud-002) **Implement the audio recorder service (Opus/AAC, pause/resume, meter)** · p1 · feature · L · M3 Audio & Recognition
  - [SN-AUD-003](audio.md#sn-aud-003) **Model RecordingSession, TimeAnchor and Transcript with a repository** · p1 · feature · M · M3 Audio & Recognition
  - [SN-AUD-004](audio.md#sn-aud-004) **Build the monotonic record clock and time-anchor capture pipeline** · p1 · feature · L · M3 Audio & Recognition
  - [SN-AUD-005](audio.md#sn-aud-005) **Capture the live waveform and persist a downsampled peaks sidecar** · p2 · feature · M · M3 Audio & Recognition
  - [SN-AUD-006](audio.md#sn-aud-006) **Add iOS/iPadOS background recording with interruption handling** · p1 · feature · L · M3 Audio & Recognition
  - [SN-AUD-007](audio.md#sn-aud-007) **Add Android foreground-service microphone recording** · p1 · feature · L · M3 Audio & Recognition
  - [SN-AUD-008](audio.md#sn-aud-008) **Write audio in crash-safe segments with resumable auto-split** · p1 · task · M · M3 Audio & Recognition
  - [SN-AUD-009](audio.md#sn-aud-009) **Build the playback service (seek, speed, skip, background controls)** · p1 · feature · M · M3 Audio & Recognition
  - [SN-AUD-010](audio.md#sn-aud-010) **Build the recorder bar UI (idle, recording and playback states)** · p1 · feature · L · M3 Audio & Recognition
  - [SN-AUD-011](audio.md#sn-aud-011) **Implement tap-to-seek and follow-along highlight (audio-ink sync UX)** · p1 · feature · L · M3 Audio & Recognition
  - [SN-AUD-012](audio.md#sn-aud-012) **Implement handwriting replay synced to audio playback** · p2 · feature · M · M3 Audio & Recognition
  - [SN-AUD-013](audio.md#sn-aud-013) **Manage multiple recordings per note (rename, delete, trim, split, merge)** · p2 · feature · M · M3 Audio & Recognition
  - [SN-AUD-014](audio.md#sn-aud-014) **Let a recording span multiple pages with page-turn anchors** · p2 · feature · M · M3 Audio & Recognition
  - [SN-AUD-015](audio.md#sn-aud-015) **Add recording consent flow and always-visible recording indicator** · p0 · security · M · M3 Audio & Recognition
  - [SN-AUD-016](audio.md#sn-aud-016) **Request microphone permission lazily with an honest rationale** · p1 · task · S · M3 Audio & Recognition
  - [SN-AUD-017](audio.md#sn-aud-017) **Enforce the free-plan 30-minute recording cap with an upgrade prompt** · p2 · feature · S · M3 Audio & Recognition
  - [SN-AUD-018](audio.md#sn-aud-018) **Store audio blobs, peaks and transcripts as separated sidecars** · p1 · feature · M · M3 Audio & Recognition
  - [SN-AUD-019](audio.md#sn-aud-019) **Sync audio blobs lazily, Wi-Fi-only, and end-to-end encrypted** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-AUD-020](audio.md#sn-aud-020) **Hand off recordings to on-device transcription with aligned word timings** · p2 · feature · L · M3 Audio & Recognition
  - [SN-AUD-021](audio.md#sn-aud-021) **Show, export and search transcripts (live and full)** · p2 · feature · M · M3 Audio & Recognition
  - [SN-AUD-022](audio.md#sn-aud-022) **Add skip-silence and Voice Boost to playback** · p3 · feature · M · M3 Audio & Recognition
  - [SN-AUD-023](audio.md#sn-aud-023) **Export audio and transcode to cross-platform AAC/Ogg** · p2 · feature · M · M3 Audio & Recognition
  - [SN-AUD-024](audio.md#sn-aud-024) **Add the audio golden, widget and integration test suite** · p1 · test · L · M3 Audio & Recognition
  - [SN-GAND-011](audio.md#sn-gand-011) **Implement the Android on-device speech-recognition adapter for voice notes** · p2 · feature · M · M3 Audio & Recognition
  - [SN-GA11-018](audio.md#sn-ga11-018) **Choose the spoken language for transcription and cover Indic speech** · p2 · feature · M · M3 Audio & Recognition

---

## Issues

### SN-AND-023

<a id="sn-and-023"></a>

**Add foreground service and notifications for background recording & sync**

| Field | Value |
|---|---|
| GitHub | #76 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | android-tablet, android-phone |
| Areas | audio, notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Audio recording synced to ink is an M3 headline (roadmap M3, PRD-ED-035): a lecture keeps recording while the app is backgrounded and survives interruptions. On Android that requires a correctly-typed foreground service with a persistent notification, plus the microphone foreground-service type and justification for Play (docs/platform/android.md §9). Long background sync uses the same mechanism. This wraps the shared audio recorder service (SN-AUD-002).

#### Scope
**In:** a foreground service with the microphone service type for recording (and a data-sync type for long sync) with a persistent, content-free notification; runtime mic permission in-context; surviving app background and interruption; notification actions (pause/stop).
**Out:** the audio recorder/playback pipeline (SN-AUD-002, consumed here); the sync engine (SN-SYNC-*); reminders/other notifications (SN-NOTF-*).

#### Acceptance criteria
- [ ] Starting a recording starts a foreground service with the microphone foreground-service type and a persistent notification; recording continues when the app is backgrounded and survives an interruption (call, doze) then resumes/finalises cleanly.
- [ ] The notification shows recording state and pause/stop actions but contains NO note content, transcript text or file path.
- [ ] The mic permission is requested in-context with a rationale, only when the user starts recording — never at launch (ADR-0012 rule 6).
- [ ] Recording never blocks the UI isolate; audio capture runs off the root isolate (CLAUDE.md §8).
- [ ] Long background sync uses a data-sync foreground service with the correct type and justification; both service types are declared for Play with justifications (docs/platform/android.md §9).

#### Technical notes
Kotlin: a foregroundServiceType=microphone (and dataSync) service, NotificationCompat persistent notification, runtime RECORD_AUDIO permission (docs/platform/android.md §9). Wraps sane_audio recorder (SN-AUD-002, ADR-0015). Notification content redacted (CLAUDE.md §7.3). Manifest declares service types + justifications for the Play form.

#### Security & privacy
Foreground-service correctness and least-privilege permissions (MASVS-PLATFORM-1): mic requested in-context, declared with justification. No PII in the notification or logs — no transcript, content or path (MASVS-PRIVACY-1, CLAUDE.md §7.3). Audio is note content, encrypted at rest, never uploaded except via the user's E2EE sync.

#### UX notes
A student can start a lecture recording, lock the phone, and it keeps going with a clear ongoing notification and pause/stop controls (PRD-ED-035). The mic prompt appears exactly when they hit record, with a plain-language reason. Notification respects Do Not Disturb styling and is TalkBack-labelled.

#### Test plan
plugins or app/test/audio/foreground_service_test.dart (service lifecycle, notification content is redacted); app/integration_test/background_recording_test.dart on a device (background + interruption survival); a test asserting the notification carries no content/path; a permission-in-context test.

#### Dependencies
SN-AUD-002 (audio recorder service).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AUD-001

<a id="sn-aud-001"></a>

**Build lecture audio: record, sync to ink/text, and transcribe on-device**

| Field | Value |
|---|---|
| GitHub | #4 |
| Type | epic |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, storage, privacy |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-STORAGE-1`, `MASVS-CRYPTO-1`, `MASVS-PLATFORM-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Recording a lecture and pinning it to the exact moment you wrote is the Notability/GoodNotes signature feature and a core Sane Notes value prop: "handwriting, PDFs and lecture audio in one notebook — linked, searchable, yours" (`docs/design/screens-and-flows.md` §7.6). This epic delivers the whole `sane_audio` capability per `docs/adr/0015-audio-pipeline.md` and PRD-02 §9 (`docs/product/prd-02-library-documents-audio-search.md`): record with `record` (Opus wideband, AAC-LC fallback), a live + playback waveform, the recorder bar UI (idle/recording/playing/speed), the audio↔ink↔text time-anchor data model on one monotonic clock, tap-to-seek and follow-along highlighting ("tap anything you wrote to hear what was said"), handwriting replay, multiple recordings per note, multi-page span, crash-safe segmented capture, background recording per OS rules (iOS `UIBackgroundModes: audio` + interruptions; Android 14+ foreground service typed `microphone`), skip-silence, trim/split/merge, separated blob storage with lazy E2E-encrypted sync, export, on-device transcription hand-off, and the consent/indicator/permission privacy controls.

Audio, peaks, transcripts and anchors are **note content**: content-addressed blobs, E2E-encrypted on sync (Locked Decision 3), never logged, and recording is gated behind explicit consent with a visible indicator (Locked Decision 8; ADR-0015 §8 — recording without the indicator is a release blocker). Everything runs on-device by default (Locked Decision 6). This is the heart of milestone M3 (`docs/roadmap.md`), with the E2EE audio-sync child landing in M4.

#### Scope

**In:** every audio surface in PRD-02 §9 — recorder service, waveform/peaks, recorder bar UI, the monotonic record clock + `TimeAnchor` model, tap-to-seek + follow-along + reveal modes, handwriting replay, multi-recording management (rename/delete/trim/split/merge), multi-page span, segmented crash-safe capture, iOS/Android background-recording plugins, separated blob storage, lazy Wi-Fi-only E2EE audio sync, on-device transcription hand-off + transcript view/export, skip-silence + Voice Boost, free-plan 30-minute cap, consent + indicator + permission rationale, export/transcode, and the audio test suite.

**Out (referenced, not built here):** the ink stroke capture + per-point `t` (SN-INK-002), the editor canvas/tool state (SN-ED-002), the CRDT primitives + drift store + blob store (SN-CORE-002/003/004), the transcription ML engines themselves (SN-AI-001/SN-HWR-001), the crypto/key hierarchy (SN-CRY-002), the sync op-log transport (SN-SYNC-002), FTS indexing (SN-SRCH-002), entitlement service (SN-BILL-001).

#### Acceptance criteria

- [ ] Every child issue below is merged, CI green, and its own acceptance criteria met.
- [ ] A scripted record-while-writing test proves tap-a-stroke seeks within ±150 ms of write time and the follow-along highlight tracks the playhead across a pause/resume boundary (ADR-0015 verify §1).
- [ ] Recording continues when the app is backgrounded (Android FGS notification shown; iOS `UIBackgroundModes: audio`) and correctly pauses/resumes on a simulated call (ADR-0015 verify §3).
- [ ] A 1-hour Opus recording is 7–11 MB; AAC export plays cross-platform (ADR-0015 verify §4).
- [ ] No recording starts without the consent flow; the in-app recording indicator is visible whenever the mic is live (ADR-0015 verify §5).
- [ ] Audio/peaks/transcript blobs leave the device only as ciphertext (ADR-0015 verify §6).
- [ ] Audio never blocks the UI isolate; capture/encode/playback stay off the draw loop; nothing logs transcript text or file paths.

#### Children

- [ ] [SN-AUD-002](audio.md#sn-aud-002) Audio recorder service (Opus/AAC, pause/resume, amplitude meter)
- [ ] [SN-AUD-003](audio.md#sn-aud-003) RecordingSession / TimeAnchor / Transcript model & repository
- [ ] [SN-AUD-004](audio.md#sn-aud-004) Monotonic record clock & time-anchor capture pipeline
- [ ] [SN-AUD-005](audio.md#sn-aud-005) Waveform capture & persisted peaks sidecar
- [ ] [SN-AUD-006](audio.md#sn-aud-006) iOS/iPadOS background recording & interruption plugin
- [ ] [SN-AUD-007](audio.md#sn-aud-007) Android foreground-service microphone recording plugin
- [ ] [SN-AUD-008](audio.md#sn-aud-008) Segmented crash-safe capture & auto-split
- [ ] [SN-AUD-009](audio.md#sn-aud-009) Playback service (seek, speed, skip, background controls)
- [ ] [SN-AUD-010](audio.md#sn-aud-010) Recorder bar UI (idle / recording / playback states)
- [ ] [SN-AUD-011](audio.md#sn-aud-011) Tap-to-seek & follow-along highlight
- [ ] [SN-AUD-012](audio.md#sn-aud-012) Handwriting replay
- [ ] [SN-AUD-013](audio.md#sn-aud-013) Multiple recordings per note (rename/delete/trim/split/merge)
- [ ] [SN-AUD-014](audio.md#sn-aud-014) Multi-page recording span & page-turn anchors
- [ ] [SN-AUD-015](audio.md#sn-aud-015) Recording consent flow & visible indicator
- [ ] [SN-AUD-016](audio.md#sn-aud-016) Microphone permission rationale & lazy request
- [ ] [SN-AUD-017](audio.md#sn-aud-017) Free-plan 30-minute recording cap
- [ ] [SN-AUD-018](audio.md#sn-aud-018) Audio blob store & separated sidecar storage
- [ ] [SN-AUD-019](audio.md#sn-aud-019) Lazy, Wi-Fi-only, E2E-encrypted audio blob sync
- [ ] [SN-AUD-020](audio.md#sn-aud-020) On-device transcription hand-off & word-timestamp alignment
- [ ] [SN-AUD-021](audio.md#sn-aud-021) Transcript view (live + full), export, copy & search feed
- [ ] [SN-AUD-022](audio.md#sn-aud-022) Skip-silence & Voice Boost
- [ ] [SN-AUD-023](audio.md#sn-aud-023) Export audio & AAC/Ogg transcode
- [ ] [SN-AUD-024](audio.md#sn-aud-024) Audio golden, widget & integration tests

#### Technical notes

Package `packages/sane_audio` (Flutter; DAG leaf feature package depending on `sane_core` only, never on other feature packages — CLAUDE.md §3). Data-model entities (`RecordingSession`/`TimeAnchor`/`Transcript`) live in `sane_core` per PRD-02 §2 and ADR-0005. Native background/permission bits go through a new federated plugin `plugins/sane_audio_session` (Dart platform-interface + Swift/Kotlin impls) per ADR-0012 — this plugin is not in the pre-listed plugin set, so its addition and boundary are recorded here (decide-sensibly note). Packages: `record` (BSD-3) capture, `just_audio` + `just_audio_background` playback, `audio_waveforms` peaks, `flutter_foreground_task` (Android FGS). Transcription resolves through the `sane_ml` adapter registry (ADR-0016; `docs/platform/ipad.md` §Speech `SpeechAnalyzer`, `docs/platform/android.md` GenAI transcribe). Web audio uses `MediaRecorder`/WebCodecs (`docs/platform/web.md` §6).

#### Security & privacy

Consent is a compliance control, not UX polish (ADR-0015 §8; LINDDUN): per-recording notice + visible indicator + strictest (all-party) jurisdiction posture (MASVS-PRIVACY-2). Mic permission is lazy, in-context, honest (MASVS-PLATFORM-1). Audio artifacts are content-addressed blobs encrypted before any cloud write (MASVS-CRYPTO-1, MASVS-STORAGE-1); AEAD tag verified before use, fail closed. No transcript text, ink coordinates, or file paths in logs (CWE-532, MASVS-PRIVACY-3). Children carry the specific IDs.

#### UX notes

Delivers the recorder bar (screens §7.6) across all 17 looks + dark mode with the exact mock copy and states; audio is time-linked to ink everywhere it renders. A11y: recording state announced to VoiceOver/TalkBack, 44 pt/48 dp targets, contrast ≥ 4.5:1, keyboard-reachable transport on web (`docs/design/accessibility.md`).

#### Test plan

Children name their own tests. Epic-level gates: the record-while-writing sync-accuracy integration test, background-survives + interruption test, size/codec test, consent-gate test, and encrypted-sync test ([SN-AUD-024](audio.md#sn-aud-024)) — mirroring ADR-0015 §How-to-verify.

#### Dependencies

SN-CORE-002/003/004 (entities, CRDT, drift + blob store), SN-INK-002 (per-point stroke `t`), SN-ED-002 (editor host), SN-DS-003 (components); later children add SN-CRY-002, SN-SYNC-002, SN-AI-001, SN-BILL-001. Children carry finer-grained `depends_on`.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-002

<a id="sn-aud-002"></a>

**Implement the audio recorder service (Opus/AAC, pause/resume, meter)**

| Field | Value |
|---|---|
| GitHub | #82 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-003](audio.md#sn-aud-003), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-2`, `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The recorder service is the capture engine every other audio surface sits on. It wraps the `record` package (BSD-3) to encode lecture audio and expose a clean, testable Dart API to the app, per `docs/adr/0015-audio-pipeline.md` §Decision.1 and PRD-LB-210. Codec choice is fixed by research: **Opus ~16–24 kbps mono wideband** by default (≈7–11 MB/hour, beats AAC at speech bitrates) with **AAC-LC ~32–64 kbps mono** as the compatibility/export option; prefer Ogg/Opus for cross-platform files (ADR-0015 §Context). This is a MUST for milestone M3 (`docs/roadmap.md`) and the foundation for background recording ([SN-AUD-006](audio.md#sn-aud-006)/[SN-AUD-007](audio.md#sn-aud-007)) and the recorder bar ([SN-AUD-010](audio.md#sn-aud-010)).

#### Scope

**In:** an `AudioRecorderService` in `packages/sane_audio` exposing `start(config)` / `pause()` / `resume()` / `stop()` returning `Result<T, Failure>`; codec config (Opus default, AAC-LC fallback, bitrate/sample-rate); a live `amplitude(dBFS)` stream for the meter; pause/resume that records `segments:[{startMs,endMs}]` (pause/resume gaps) onto the active `RecordingSession`; writing the encoded blob to the content-addressed blob store; graceful device-busy / permission-denied / no-input error states; a capability query for web (`MediaRecorder` Opus, `docs/platform/web.md` §6) vs native.

**Out:** the record clock + anchor capture ([SN-AUD-004](audio.md#sn-aud-004)); waveform peaks ([SN-AUD-005](audio.md#sn-aud-005)); background service plumbing ([SN-AUD-006](audio.md#sn-aud-006)/[SN-AUD-007](audio.md#sn-aud-007)); the UI ([SN-AUD-010](audio.md#sn-aud-010)); consent + permission gates ([SN-AUD-015](audio.md#sn-aud-015)/[SN-AUD-016](audio.md#sn-aud-016)); the 30-min cap ([SN-AUD-017](audio.md#sn-aud-017)).

#### Acceptance criteria

- [ ] Recording a 60-minute Opus mono stream produces a file of 7–11 MB (ADR-0015 verify §4).
- [ ] `pause()`/`resume()` produce correct `segments` gaps with no audible glitch and no clock drift on resume.
- [ ] `amplitude(dBFS)` emits at ≥ 10 Hz for the live meter and stops on `stop()`.
- [ ] Encode + file I/O run off the UI isolate; the draw loop never sees a frame > 16.7 ms while recording (perf budget, Locked Decision 7).
- [ ] Every failure (permission denied, device busy, no input, disk full) returns a typed `Failure`, never a thrown raw exception; a partial stop still persists what was captured.
- [ ] AAC-LC config produces a cross-platform-playable file (ADR-0015 §Decision.1).
- [ ] No file path, amplitude sample, or content is logged (CWE-532).

#### Technical notes

`packages/sane_audio/lib/src/recorder/audio_recorder_service.dart` wrapping `record`'s `AudioRecorder` (`start`, `pause`, `resume`, `stop`, `amplitude`). Encoder: `AudioEncoder.opus` default, `.aacLc` fallback; mono; 16 kHz wideband for Opus. Blob written via the content-addressed blob store from SN-CORE-004. Web: feature-test `MediaRecorder.isTypeSupported('audio/webm;codecs=opus')`, fall back to `audio/mp4` (`docs/platform/web.md` §6); `record` supports web. Pause/resume `segments` map wall-clock↔audio-clock for [SN-AUD-004](audio.md#sn-aud-004). Pure capture logic; UI stays in `app/`. ADR-0015 §Decision.1, PRD-LB-210.

#### Security & privacy

Microphone is a sensitive resource: the service must not begin capture until consent + permission are satisfied ([SN-AUD-015](audio.md#sn-aud-015)/[SN-AUD-016](audio.md#sn-aud-016)) — it exposes a guard hook, never bypasses it (MASVS-PLATFORM-1, MASVS-PRIVACY-2). Encoded audio is note content: written only to the app's own blob store, never a shared/temp dir readable by other apps (MASVS-STORAGE-1). No amplitude values, byte counts tied to content, or file paths in logs (CWE-532). No network egress.

#### UX notes

Backs the recorder bar states (screens §7.6): the amplitude stream drives the animated bars; pause/resume backs any future pause control. Error states surface as user-safe toasts ("Couldn't start recording — check microphone access"), never raw exceptions. No direct theming here; the bar consumes this service across all 17 looks.

#### Test plan

Unit: `packages/sane_audio/test/recorder/audio_recorder_service_test.dart` with a fake `record` backend (start/pause/resume/stop state machine; segment computation; amplitude stream lifecycle; failure mapping to `Failure`). Manual: real-device 60-minute Opus capture asserting the size budget and no UI jank.

#### Dependencies

[SN-AUD-003](audio.md#sn-aud-003) (session model to attach segments to), SN-CORE-004 (blob store).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-003

<a id="sn-aud-003"></a>

**Model RecordingSession, TimeAnchor and Transcript with a repository**

| Field | Value |
|---|---|
| GitHub | #83 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | audio, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-532`, `CWE-89` |
| Extra labels | agent-ready |

#### Context

All audio features read and write the same three entities: `RecordingSession` (one per clip, holds the audio blob ref + codec + duration + pause/resume `segments`), `TimeAnchor` (links a stroke/word/page-turn to a millisecond offset on the session clock), and `Transcript` (word-level timestamps on the same clock). This issue defines them in `sane_core` and the repository that persists them via drift/SQLite, exactly per `docs/adr/0015-audio-pipeline.md` §Decision.5 and PRD-02 §2 (entities). Storing audio artifacts **separately** from the note document — referenced by `sessionId` — is what lets small note JSON sync fast while audio syncs lazily (PRD-LB-224). This is the data foundation the whole epic stands on.

#### Scope

**In:** the `RecordingSession { id, notebookId, audioBlobHash, codec, startedAt, durationMs, peaksHash, segments:[{startMs,endMs}] }`, `TimeAnchor { id, sessionId, pageIndex, kind:ink|text|pageTurn, tStartMs, tEndMs, strokeId?, textRange? }` and `Transcript { id, sessionId, engine, language, words[]{text,tStartMs,tEndMs,conf} }` value objects (immutable, `freezed`-style); the drift tables + `AudioRepository` interface with CRUD + queries (sessions per notebook, anchors per session/page, anchor lookup by `strokeId`, anchor range spanning a playhead ms); CRDT expression of mutations (LWW registers, add-wins sets) so audio metadata rides the op-log (PRD-LB-002).

**Out:** the recorder service ([SN-AUD-002](audio.md#sn-aud-002)); anchor *capture* timing ([SN-AUD-004](audio.md#sn-aud-004)); blob bytes + content-addressing ([SN-AUD-018](audio.md#sn-aud-018)); transcription production ([SN-AUD-020](audio.md#sn-aud-020)); sync transport (SN-SYNC-002).

#### Acceptance criteria

- [ ] The three entities round-trip through drift byte-for-byte across close/reopen (unit test with a seeded session + 500 anchors).
- [ ] `anchorsSpanningMs(sessionId, pageIndex, playheadMs)` returns exactly the anchors whose `[tStartMs,tEndMs]` contains the playhead, in < 2 ms for 5,000 anchors (indexed query).
- [ ] Anchor lookup by `strokeId` is O(index) and returns the earliest `tStartMs` for tap-to-seek.
- [ ] All queries use parameterised drift queries; no string-built SQL (CWE-89).
- [ ] Every mutation is expressible as a CRDT op so a session + anchors merge without a server (PRD-LB-002); concurrent anchor adds converge (add-wins).
- [ ] All methods return `Result<T, Failure>`; no throw across the package boundary; nothing is logged but opaque ids.

#### Technical notes

Entities in `packages/sane_core/lib/src/audio/` (pure Dart — MUST NOT import `package:flutter`, CLAUDE.md §3). Drift tables + indexes (`sessionId`, `strokeId`, `(sessionId,pageIndex,tStartMs)`) in the storage layer from SN-CORE-004. Field spec verbatim from ADR-0015 §Decision.5 and PRD-02 §2. `segments` map wall-clock↔audio-clock across pause/resume (research warns against cumulative time — use absolute offset + segments). Follows ADR-0005 (CRDT) and ADR-0002 (layout).

#### Security & privacy

Sessions/anchors/transcripts are note content: encrypted metadata at rest (MASVS-STORAGE-1, `docs/architecture/crypto.md`), plaintext held only in memory, never logged (CWE-532, MASVS-PRIVACY-3). `audioBlobHash`/`peaksHash` are opaque content addresses, not paths. Parameterised queries close SQL injection (CWE-89). No network.

#### UX notes

No direct UI. Query shapes here decide whether tap-to-seek and follow-along feel instant ([SN-AUD-011](audio.md#sn-aud-011)); the transcript words feed the transcript view and search ([SN-AUD-021](audio.md#sn-aud-021)). Empty (no recordings) is a normal state the recorder bar renders as idle-no-recording, never an error.

#### Test plan

Unit: `packages/sane_core/test/audio/audio_repository_test.dart` (round-trip of all three entities; `anchorsSpanningMs` correctness + bench on 5,000 anchors; `strokeId` lookup; CRDT convergence of concurrent anchor adds; failure mapping).

#### Dependencies

SN-CORE-002 (entity base + CRDT registers), SN-CORE-004 (drift persistence + blob store).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-004

<a id="sn-aud-004"></a>

**Build the monotonic record clock and time-anchor capture pipeline**

| Field | Value |
|---|---|
| GitHub | #84 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | audio, input-gestures |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-003](audio.md#sn-aud-003), [SN-INK-002](ink.md#sn-ink-002), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

This is the core of the signature feature: anchoring every note element to a **millisecond offset within a recording session** from a single monotonic record clock (`docs/adr/0015-audio-pipeline.md` §Decision.5, PRD-LB-218). On `record.start()` we capture `t0`; every ink stroke point and text keystroke stores `now − t0` mapped through the pause/resume `segments`, and per-point stroke `t` (already stored in the stroke geometry, `docs/architecture/ink-engine.md` §10.1) lets handwriting replay. Getting the clock right — absolute offset plus `segments`, not cumulative time — is what makes tap-to-seek and follow-along correct across pause/resume/edits (research explicitly warns against cumulative time). Without this pipeline nothing links audio to ink.

#### Scope

**In:** a `RecordClock` that captures `t0` on start, maps a wall-clock instant to an audio-clock offset through the session's `segments` (pausing freezes the audio clock), and yields the current playhead offset during playback; an anchor-capture pipeline that, while a session is active, writes a `TimeAnchor` for each finished stroke (`kind:ink`, `strokeId`, `tStartMs`/`tEndMs` from first/last point `t`), each text edit run (`kind:text`, `textRange`), and each page-turn (`kind:pageTurn`) — batched off the hot draw path; wiring per-point stroke `t` from the ink capture so replay is possible; correct behaviour when a session is paused (no anchors advance) and across a resume boundary.

**Out:** the `TimeAnchor` storage model ([SN-AUD-003](audio.md#sn-aud-003)); the recorder service that owns `t0`/`segments` ([SN-AUD-002](audio.md#sn-aud-002)); the tap-to-seek/highlight UX ([SN-AUD-011](audio.md#sn-aud-011)); handwriting replay rendering ([SN-AUD-012](audio.md#sn-aud-012)); multi-page anchoring specifics ([SN-AUD-014](audio.md#sn-aud-014)).

#### Acceptance criteria

- [ ] A stroke drawn at wall-clock time T during recording gets `tStartMs = mapThroughSegments(T − t0)`; a scripted test asserts tap-that-stroke later seeks within ±150 ms of T, including across a pause/resume boundary (ADR-0015 verify §1).
- [ ] While paused, the audio clock does not advance and no anchor's offset moves; on resume the mapping is continuous (no gap, no double-count).
- [ ] Anchor writes never happen on the `PointerMoveEvent` hot path — they are enqueued on stroke-finish / edit-commit and flushed on a non-UI isolate (Locked Decision 7; CLAUDE.md §8).
- [ ] Per-point stroke `t` is persisted so a session can be replayed in time ([SN-AUD-012](audio.md#sn-aud-012)).
- [ ] Text keystroke runs anchor to a `textRange`, coalesced (one anchor per edit run, not per character).
- [ ] No ink coordinate or content is logged; only opaque ids and offsets (CWE-532).

#### Technical notes

`packages/sane_audio/lib/src/sync/record_clock.dart` + an anchor collector fed by the editor/ink layer via an `app/` Riverpod provider (cross-feature coordination lives in `app/`, never a package-to-package import — CLAUDE.md §3). Consume stroke lifecycle + per-point `t` from `sane_ink` (SN-INK-002, ink-engine §10.1) and text edit events from the editor (SN-ED-002). Offsets stored via [SN-AUD-003](audio.md#sn-aud-003). Use `Stopwatch`/monotonic time (never wall-clock deltas that jump on NTP/DST). ADR-0015 §Decision.5, PRD-LB-218.

#### Security & privacy

None beyond baseline: the pipeline handles ink/text content and MUST NOT log coordinates, text, or offsets tied to content (CWE-532, MASVS-PRIVACY-3, gate rule §0). Anchors are note content, encrypted at rest via the model layer (MASVS-PRIVACY-2). No network egress; capture is entirely on-device.

#### UX notes

Invisible plumbing that makes "tap anything you wrote to hear what was said" feel exact (screens §7.6). Correctness across pause/resume is the difference between magic and a broken feature; there is no theming, but the accuracy budget (±150 ms) is the UX bar.

#### Test plan

Unit: `packages/sane_audio/test/sync/record_clock_test.dart` (segment mapping; pause freezes the clock; resume continuity; monotonic under simulated wall-clock jumps) and `anchor_capture_test.dart` (stroke-finish → anchor with correct t; text-run coalescing; hot-path assertion that no anchor is written on a pointer-move). Integration seed for [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-003](audio.md#sn-aud-003) (anchor model), SN-INK-002 (per-point stroke `t`), SN-ED-002 (editor/text edit events).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-005

<a id="sn-aud-005"></a>

**Capture the live waveform and persist a downsampled peaks sidecar**

| Field | Value |
|---|---|
| GitHub | #85 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002), [SN-AUD-003](audio.md#sn-aud-003) |
| Security controls | `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The recorder bar shows a live waveform while recording and a scrubber waveform on playback (`docs/design/screens-and-flows.md` §7.6). To avoid rescanning large audio files, we persist an extracted **peaks array** (downsampled ~10–50 samples/s) as a sidecar blob so the UI paints from peaks, not raw audio (`docs/adr/0015-audio-pipeline.md` §Decision.3, PRD-LB-210). `audio_waveforms` (MIT) provides the live + playback waveform and peak extraction on Android/iOS; web needs a lighter fallback (ADR-0015 negative consequences). This makes the recorder bar cheap and the scrubber responsive even on a 1-hour lecture.

#### Scope

**In:** a live waveform driven by the recorder's `amplitude(dBFS)` stream ([SN-AUD-002](audio.md#sn-aud-002)); post-stop extraction of a downsampled peak array (Float32/Int8, ~10–50 samples/s) persisted as a content-addressed sidecar and referenced by `RecordingSession.peaksHash`; a playback waveform + scrubber painted from the stored peaks; a lighter web waveform path (fewer samples, painted from `MediaRecorder` amplitude / decoded PCM) where `audio_waveforms` is unavailable; regeneration if the sidecar is missing.

**Out:** the scrubber's seek wiring ([SN-AUD-009](audio.md#sn-aud-009)); skip-silence thresholding built on these peaks ([SN-AUD-022](audio.md#sn-aud-022)); the bar layout/states ([SN-AUD-010](audio.md#sn-aud-010)).

#### Acceptance criteria

- [ ] The live waveform updates at ≥ 10 Hz from the amplitude stream and never blocks the UI isolate.
- [ ] On stop, a peaks sidecar is extracted and stored; painting the playback waveform for a 1-hour recording reads only the sidecar (no full-file rescan) and renders in < 100 ms.
- [ ] The peaks sidecar for a 1-hour recording is < 200 KB (downsampled) and is content-addressed like other blobs.
- [ ] On web, a lighter waveform renders and scrubs correctly where `audio_waveforms` is unavailable (`docs/platform/web.md` §6).
- [ ] A missing/corrupt sidecar triggers a safe regeneration off the UI isolate, never a crash.
- [ ] No amplitude/peak data tied to content is logged (CWE-532).

#### Technical notes

`packages/sane_audio/lib/src/waveform/` using `audio_waveforms` for native live + playback waveforms and peak extraction; persist peaks via the blob store (SN-CORE-004), ref stored on the session ([SN-AUD-003](audio.md#sn-aud-003)). Web fallback paints from `MediaRecorder` amplitude or a decoded-PCM downsample in a Worker (`docs/platform/web.md` §6). Extraction runs on a one-shot isolate. ADR-0015 §Decision.3, PRD-LB-210.

#### Security & privacy

Peaks are derived note content: stored as encrypted content-addressed sidecars (MASVS-STORAGE-1), synced only as ciphertext ([SN-AUD-019](audio.md#sn-aud-019)). No file paths or peak arrays in logs (CWE-532). Peak extraction reads only the app's own audio blob, off the UI isolate under bounded memory (MASVS-CODE-4). No network.

#### UX notes

Delivers the animated bars (recording) and the waveform + scrubber (playback) in screens §7.6 across all 17 looks + dark mode, using design tokens for the waveform fill/track. Reduce-motion: the live bars settle to a static level meter. A11y: the waveform is decorative; the scrubber carries the semantics (labelled slider, [SN-AUD-009](audio.md#sn-aud-009)).

#### Test plan

Widget/golden: `packages/sane_audio/test/waveform/waveform_test.dart` (live bars from a fake amplitude stream; playback waveform painted from a fixed peaks fixture across looks + dark). Unit: peak-extraction downsample size + determinism; web-fallback selection by capability query.

#### Dependencies

[SN-AUD-002](audio.md#sn-aud-002) (amplitude stream + blob), [SN-AUD-003](audio.md#sn-aud-003) (peaksHash on session).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-006

<a id="sn-aud-006"></a>

**Add iOS/iPadOS background recording with interruption handling**

| Field | Value |
|---|---|
| GitHub | #86 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | ipad, ios-phone |
| Areas | audio, compat |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Lectures run an hour or more and must survive the app being backgrounded plus phone calls and Siri. On iOS/iPadOS that requires configuring `AVAudioSession` and handling interruptions correctly, or recording silently pauses in the background and a lecture is lost (`docs/adr/0015-audio-pipeline.md` §Decision.4, PRD-LB-213). This issue adds the iOS-side plugin bits so `record` keeps capturing in the background and correctly pauses/resumes on interruption.

#### Scope

**In:** a Swift implementation in `plugins/sane_audio_session` that sets `AVAudioSession` category `.record`/`.playAndRecord` (active) for capture; adds `UIBackgroundModes: audio` to the app `Info.plist`; subscribes to `AVAudioSession.interruptionNotification` and pauses on `.began`, resumes on `.ended` when the options contain `.shouldResume`; surfaces interruption events to Dart so the session `segments`/UI reflect the pause; `NSMicrophoneUsageDescription` (and `NSSpeechRecognitionUsageDescription` when transcribing) strings; graceful behaviour on route change (headset unplug) and on force-quit (capture ends, last segment persisted).

**Out:** the Android foreground service ([SN-AUD-007](audio.md#sn-aud-007)); the recorder service itself ([SN-AUD-002](audio.md#sn-aud-002)); consent + permission UX ([SN-AUD-015](audio.md#sn-aud-015)/[SN-AUD-016](audio.md#sn-aud-016)); segmented crash-safety ([SN-AUD-008](audio.md#sn-aud-008)).

#### Acceptance criteria

- [ ] Recording continues when the app is backgrounded (screen locked, another app foregrounded) — verified on a real device (ADR-0015 verify §3).
- [ ] A simulated incoming call pauses capture on `.began` and resumes on `.ended`/`.shouldResume`, with the pause reflected as a `segments` gap; no audio is lost around the interruption.
- [ ] `Info.plist` carries `UIBackgroundModes: audio` and honest `NSMicrophoneUsageDescription`; ATS stays on (no arbitrary loads).
- [ ] A route change (headset unplug) does not crash; capture continues on the built-in mic or pauses gracefully per policy.
- [ ] Every platform-channel argument is validated before use; a bad argument returns an error, never crashes the host (checklist §2).
- [ ] No file path or content logged natively (`Log`/`print` banned on this path; CWE-532).

#### Technical notes

Swift in `plugins/sane_audio_session/ios` per ADR-0012 (federated plugin, minimal allow-listed surface). Configure `AVAudioSession` before `record.start()`. Interruption handling per ADR-0015 §Decision.4. Note: iOS background execution is limited and force-quit ends capture (ADR-0015 negative consequences) — document this in the plugin README. Keychain/Data-Protection not needed here (no keys). Coordinate with `record`'s own session handling to avoid double-activation. `docs/platform/ipad.md` (audio session), checklist §9.2 (Swift).

#### Security & privacy

Background audio is a sensitive capability: declare it honestly (Privacy Manifest data-use + `UIBackgroundModes`), request mic lazily with an honest string (MASVS-PLATFORM-1, MASVS-PRIVACY-2). The visible recording indicator ([SN-AUD-015](audio.md#sn-aud-015)) plus the OS mic indicator must be present whenever the session is live. Validate all channel args (MASVS-PLATFORM-3, checklist §2). No native logging of paths/content (CWE-532). No network.

#### UX notes

Interruption pause/resume must feed the recorder bar so the timer and state stay honest (screens §7.6) — the user sees a brief "paused for a call" rather than a silent gap. No new screens; the indicator and permission prompts are owned by [SN-AUD-015](audio.md#sn-aud-015)/[SN-AUD-016](audio.md#sn-aud-016).

#### Test plan

Manual (real device, in the PR): background + lock survives; simulated call pauses/resumes; headset unplug. Unit (Dart side): interruption event → segment gap mapping. Native: argument-validation unit tests for the method channel. Feeds the background-survives gate in [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-002](audio.md#sn-aud-002) (recorder service to drive).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-007

<a id="sn-aud-007"></a>

**Add Android foreground-service microphone recording**

| Field | Value |
|---|---|
| GitHub | #87 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | android-tablet, android-phone |
| Areas | audio, compat |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

On Android 14+ (API 34+) continuous mic capture in the background requires a **foreground service typed `microphone`** with a persistent notification, and the service **cannot be started from the background** — it must start while the recording UI is foreground (`docs/adr/0015-audio-pipeline.md` §Decision.4, PRD-LB-214). Getting this right lets recording continue across an app-switch — explicitly beating Goodnotes (which stops on app-switch) and Notability (undocumented). This is a competitive differentiator and a MUST for M3.

#### Scope

**In:** an Android implementation in `plugins/sane_audio_session` driven by `flutter_foreground_task` (MIT): manifest `foregroundServiceType="microphone"`; permissions `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MICROPHONE`, `RECORD_AUDIO`; starting the service while the recording UI is foreground; a non-dismissible "Recording" notification; keeping `record` capturing across app-switch/screen-off; stopping the service cleanly on stop; correct behaviour when the OS kills the service (last segment persisted); runtime-permission and "start-from-background-blocked" error states surfaced to Dart.

**Out:** the iOS session ([SN-AUD-006](audio.md#sn-aud-006)); the recorder service ([SN-AUD-002](audio.md#sn-aud-002)); consent + permission UX ([SN-AUD-015](audio.md#sn-aud-015)/[SN-AUD-016](audio.md#sn-aud-016)); segmented crash-safety ([SN-AUD-008](audio.md#sn-aud-008)).

#### Acceptance criteria

- [ ] Recording continues across an app-switch and with the screen off on Android 14+, with the persistent notification visible (ADR-0015 verify §3; beats Goodnotes).
- [ ] The mic foreground service is started only while the recording UI is foreground; an attempt to start it from the background fails into a clear error, never a silent no-op or crash (PRD-LB-214).
- [ ] The manifest declares `foregroundServiceType="microphone"` and exactly the three permissions; no broader permission is requested.
- [ ] Stopping recording tears down the service and removes the notification; an OS-killed service leaves the last written segment intact.
- [ ] Every method-channel argument is validated; components are `exported=false` unless required (checklist §5).
- [ ] No path/content logged via `Log.d`/`println` on this path (CWE-532, checklist §9.3).

#### Technical notes

Kotlin in `plugins/sane_audio_session/android` per ADR-0012, using `flutter_foreground_task` for the typed FGS + notification. Manifest + permission wiring per ADR-0015 §Decision.4 and `docs/platform/android.md` (foreground-service type + justification). Cannot start a mic FGS from background (Android 14 rule) — start it from the foreground recording action. Coordinate with `record`'s Android capture. checklist §5 (exported components, immutable PendingIntents), §9.3 (Kotlin).

#### Security & privacy

Foreground-service typing and the persistent notification are the platform's transparency contract — the notification is part of the visible-recording-indicator posture ([SN-AUD-015](audio.md#sn-aud-015); MASVS-PRIVACY-2). Request only `RECORD_AUDIO` + the two FGS permissions, lazily, with a rationale (MASVS-PLATFORM-1). Validate all channel args; keep the service non-exported (MASVS-PLATFORM-3, checklist §5). No native logging of paths/content (CWE-532). No network.

#### UX notes

The persistent "Recording" notification (non-dismissible while live) plus the in-app indicator ([SN-AUD-015](audio.md#sn-aud-015)) make it impossible to record unaware. Notification copy is honest ("Sane Notes is recording audio"). No new in-app screens here.

#### Test plan

Manual (real device 14+, in the PR): app-switch + screen-off survives; start-from-background is blocked with a clear error; notification present and non-dismissible. Unit (Dart side): FGS lifecycle state mapping; permission-denied path. Native: argument-validation tests. Feeds the background-survives gate in [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-002](audio.md#sn-aud-002) (recorder service to drive).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-008

<a id="sn-aud-008"></a>

**Write audio in crash-safe segments with resumable auto-split**

| Field | Value |
|---|---|
| GitHub | #88 |
| Type | task |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002), [SN-AUD-003](audio.md#sn-aud-003) |
| Security controls | `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

A lecture can be an hour of irreplaceable audio; a crash or force-quit must lose at most the last few seconds, and long/still-recording audio must be sync-able before the recording ends (`docs/adr/0015-audio-pipeline.md` §Decision.7, PRD-LB-215). This issue writes audio in bounded segments so a crash loses only the last chunk, and prefers continuous capture with internal segmenting over forcing a restart (Notability auto-splits at ~1 hour). This is data-loss prevention (p1).

#### Scope

**In:** chunked segment writing during capture (e.g. flush a segment every N seconds or M bytes) so each completed chunk is durable and its content hash recorded against the session; crash recovery that, on next launch, finds an interrupted session's written segments and reconstitutes a playable/durable `RecordingSession` (marking it recovered); an optional auto-split boundary for very long recordings that keeps them as one logical session with ordered segments; ensuring a killed OS service ([SN-AUD-006](audio.md#sn-aud-006)/[SN-AUD-007](audio.md#sn-aud-007)) leaves a consistent last segment.

**Out:** the encoder ([SN-AUD-002](audio.md#sn-aud-002)); the session model ([SN-AUD-003](audio.md#sn-aud-003)); resumable *sync* of chunks ([SN-AUD-019](audio.md#sn-aud-019)); trim/split as a user action ([SN-AUD-013](audio.md#sn-aud-013)).

#### Acceptance criteria

- [ ] Killing the process mid-recording loses at most the last unflushed chunk; on relaunch the session is recovered and playable up to the last durable segment (simulated-kill test).
- [ ] Segments are ordered and gap-free within a session; concatenated playback is seamless.
- [ ] A > 1-hour recording is retained as one logical session with internal segments, not forced into separate clips (PRD-LB-215).
- [ ] Segment writes are bounded (size/time) and run off the UI isolate; recording never adds a frame > 16.7 ms (Locked Decision 7).
- [ ] Recovery is idempotent (running it twice yields the same result) and never resurrects a user-deleted session.
- [ ] No file path or byte content logged (CWE-532).

#### Technical notes

`packages/sane_audio/lib/src/recorder/segment_writer.dart` layered over [SN-AUD-002](audio.md#sn-aud-002); each chunk stored via the content-addressed blob store (SN-CORE-004) and appended to `RecordingSession.segments`/a segment index ([SN-AUD-003](audio.md#sn-aud-003)). Recovery scans for sessions with `stoppedAt == null` and durable segments at launch. Prefer continuous capture + internal segmenting (ADR-0015 §Decision.7). Chunk boundaries also feed resumable sync ([SN-AUD-019](audio.md#sn-aud-019)). Off-isolate I/O per CLAUDE.md §8.

#### Security & privacy

Segments are note content: written only to the app's own encrypted blob store, never a world-readable temp dir (MASVS-STORAGE-1). Recovery must not expose another profile's session. No path/content in logs (CWE-532). No network here (sync is [SN-AUD-019](audio.md#sn-aud-019)).

#### UX notes

Mostly invisible, but recovery surfaces a gentle "Recovered a recording from your last session" affordance rather than losing it silently; the recovered session appears in the notebook's recordings list ([SN-AUD-013](audio.md#sn-aud-013)). No theming beyond that toast.

#### Test plan

Unit: `packages/sane_audio/test/recorder/segment_writer_test.dart` (chunk ordering/gap-free; bounded flush cadence; idempotent recovery; recovery ignores deleted sessions) with a simulated mid-write kill. Integration seed for [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-002](audio.md#sn-aud-002) (capture), [SN-AUD-003](audio.md#sn-aud-003) (session/segments model).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-009

<a id="sn-aud-009"></a>

**Build the playback service (seek, speed, skip, background controls)**

| Field | Value |
|---|---|
| GitHub | #89 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002), [SN-AUD-003](audio.md#sn-aud-003) |
| Security controls | `MASVS-CODE-4`, `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Playback backs tap-to-jump, speed control, and the scrubber (`docs/design/screens-and-flows.md` §7.6). It uses `just_audio` for precise seek, `setSpeed`, and gapless playback across segments, plus `just_audio_background` for lock-screen controls (`docs/adr/0015-audio-pipeline.md` §Decision.2, PRD-LB-216). Precise seek is the mechanism behind "tap a stroke to hear what was said" ([SN-AUD-011](audio.md#sn-aud-011)), so accuracy and responsiveness matter.

#### Scope

**In:** an `AudioPlaybackService` in `packages/sane_audio` wrapping `just_audio`: load a session (concatenating its ordered segments gaplessly), play/pause, precise `seek(ms)` for tap-to-jump, `setSpeed` (offer 0.7×/1×/1.25×/1.5×/2×; the bar toggles 1×/1.5×/2×), ±10 s skip, a playhead-position stream for follow-along, and lock-screen/notification controls via `just_audio_background`; correct handling of `segments` so paused gaps are skipped; a web playback path; typed error states (missing/corrupt blob).

**Out:** the waveform/scrubber widget ([SN-AUD-005](audio.md#sn-aud-005)); the bar UI ([SN-AUD-010](audio.md#sn-aud-010)); tap-to-seek wiring from strokes ([SN-AUD-011](audio.md#sn-aud-011)); skip-silence ([SN-AUD-022](audio.md#sn-aud-022)); transcript-word seek ([SN-AUD-021](audio.md#sn-aud-021)).

#### Acceptance criteria

- [ ] `seek(ms)` lands within ±50 ms of the requested offset and playback resumes without a stutter.
- [ ] `setSpeed` covers at least 0.7×/1×/1.25×/1.5×/2× with pitch preserved; the bar's 1×→1.5×→2× cycle maps correctly.
- [ ] Playback across a multi-segment session is gapless and honours pause `segments` (the audio clock matches [SN-AUD-004](audio.md#sn-aud-004)).
- [ ] Lock-screen controls (play/pause/skip, title) work via `just_audio_background`.
- [ ] The playhead stream emits at ≥ 30 Hz for smooth follow-along and stops on pause.
- [ ] A missing/corrupt audio blob yields a user-safe `Failure`, never a crash; decode stays off the UI isolate (MASVS-CODE-4).
- [ ] No file path or content logged (CWE-532).

#### Technical notes

`packages/sane_audio/lib/src/playback/audio_playback_service.dart` using `just_audio` (`ConcatenatingAudioSource` over segment blobs, `setSpeed`, `seek`, `positionStream`) + `just_audio_background`. Read blobs from the content-addressed store (SN-CORE-004) via the session ([SN-AUD-003](audio.md#sn-aud-003)). Web uses `just_audio`'s web backend / `<audio>` (`docs/platform/web.md`). Playhead stream feeds [SN-AUD-011](audio.md#sn-aud-011)/[SN-AUD-012](audio.md#sn-aud-012). ADR-0015 §Decision.2, PRD-LB-216.

#### Security & privacy

Playback reads only the app's own encrypted audio blobs (decrypted transiently in memory; MASVS-STORAGE-1). Audio decode of stored blobs runs off the UI isolate under bounded memory (MASVS-CODE-4). No path/content in logs (CWE-532). No network (lock-screen metadata carries only the notebook title, no note excerpt — checklist §8).

#### UX notes

Drives the has-recording/playback state (screens §7.6): current time, total duration, speed toggle caption "Ink replays in sync". A11y: transport controls are labelled buttons with 44 pt/48 dp targets; the scrubber is a labelled slider (keyboard-operable on web). Works across all 17 looks via the bar.

#### Test plan

Unit: `packages/sane_audio/test/playback/audio_playback_service_test.dart` with a fake `just_audio` backend (seek accuracy; speed mapping; gapless multi-segment; playhead stream cadence; failure on missing blob). Manual: lock-screen controls on device.

#### Dependencies

[SN-AUD-002](audio.md#sn-aud-002) (blobs), [SN-AUD-003](audio.md#sn-aud-003) (session/segments).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-010

<a id="sn-aud-010"></a>

**Build the recorder bar UI (idle, recording and playback states)**

| Field | Value |
|---|---|
| GitHub | #90 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002), [SN-AUD-005](audio.md#sn-aud-005), [SN-AUD-009](audio.md#sn-aud-009), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The recorder bar is the user's whole interface to audio, mounted under the editor toolbar (`docs/design/screens-and-flows.md` §7.6, PRD-LB-211). It has three exact states from the mock — idle-no-recording, recording, and has-recording/playback — with prescribed copy, a live `mm:ss` timer, animated bars, a Stop control, and a playback row with play/pause, current time, waveform+scrubber, total duration, and a 1×→1.5×→2× speed toggle. This issue composes the recorder service, waveform and playback service into that bar.

#### Scope

**In:** the `RecorderBar` widget in `app/` (or `sane_ui` composite) implementing the three states: **Idle** (red Record button + copy "Ink is time-linked to audio — later, tap anything you wrote to hear what was said"); **Recording** (pulsing red dot, live `mm:ss` timer ticking every 250 ms, animated bars from the amplitude stream, Stop; start toast "Recording — everything you write is time-linked"; on stop store `durationMs`, toast "Recording saved · mm:ss"); **Playback** (play/pause, current time, waveform+scrubber, total duration, speed toggle 1×/1.5×/2×, caption "Ink replays in sync"); a close (×) that hides the bar; auto-open while recording; the toolbar Audio button tinted while open, red glyph while recording (screens §7.5).

**Out:** the recorder/playback/waveform services ([SN-AUD-002](audio.md#sn-aud-002)/[SN-AUD-005](audio.md#sn-aud-005)/[SN-AUD-009](audio.md#sn-aud-009)); follow-along highlight ([SN-AUD-011](audio.md#sn-aud-011)); consent gate ([SN-AUD-015](audio.md#sn-aud-015)); the 30-min cap prompt ([SN-AUD-017](audio.md#sn-aud-017)); multi-recording chooser ([SN-AUD-013](audio.md#sn-aud-013)).

#### Acceptance criteria

- [ ] All three states render exactly per screens §7.6 with the specified copy and toasts.
- [ ] The recording timer shows `mm:ss` and updates every 250 ms; the animated bars track the live amplitude and settle under reduce-motion.
- [ ] On stop, `durationMs` is stored and "Recording saved · mm:ss" is shown; the bar transitions to playback.
- [ ] The speed toggle cycles 1×→1.5×→2× and updates playback ([SN-AUD-009](audio.md#sn-aud-009)).
- [ ] The bar renders correctly across all 17 looks + dark mode (golden) and reflows on a phone-width screen without overflow.
- [ ] Every control has a `Semantics` label, ≥ 44 pt/48 dp target, contrast ≥ 4.5:1, and is keyboard-reachable on web; recording state is announced to screen readers.
- [ ] No content is logged; the recording indicator requirement is satisfied via [SN-AUD-015](audio.md#sn-aud-015) (the bar is not the only indicator).

#### Technical notes

`app/lib/features/editor/audio/recorder_bar.dart` composing services via Riverpod providers (cross-feature coordination in `app/`, CLAUDE.md §3); components/tokens from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003), `docs/design/component-inventory.md`). No business logic in `build` (CLAUDE.md §6). Left-handed mode and bar placement follow the editor chrome (screens §7). PRD-LB-211, ADR-0003.

#### Security & privacy

The bar must never let recording start before consent + permission are satisfied — it delegates the gate to [SN-AUD-015](audio.md#sn-aud-015)/[SN-AUD-016](audio.md#sn-aud-016) and reflects the live-recording indicator (MASVS-PRIVACY-2). No note content or timer values tied to content are logged (CWE-532). No network egress.

#### UX notes

Exact mock parity for copy and states (screens §7.6); tinted/red Audio toolbar glyph (§7.5). Empty/idle is a first-class state, not an error. Loading (opening a large recording) shows a skeleton scrubber. Reduce-motion replaces the pulsing dot/animated bars with a static indicator. All 17 looks + dark mode covered by goldens.

#### Test plan

Widget: `app/test/features/editor/audio/recorder_bar_test.dart` (state transitions idle→recording→playback; timer cadence; toast copy; speed cycle; a11y labels). Golden: the three states across looks + dark + phone width. Integration seed for [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-002](audio.md#sn-aud-002) (record), [SN-AUD-005](audio.md#sn-aud-005) (waveform), [SN-AUD-009](audio.md#sn-aud-009) (playback), [SN-DS-003](design-system.md#sn-ds-003) (components).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-011

<a id="sn-aud-011"></a>

**Implement tap-to-seek and follow-along highlight (audio-ink sync UX)**

| Field | Value |
|---|---|
| GitHub | #91 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, editor |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-004](audio.md#sn-aud-004), [SN-AUD-009](audio.md#sn-aud-009), [SN-AUD-010](audio.md#sn-aud-010) |
| Security controls | `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

This is the payoff of the whole epic: the two-directional audio↔ink↔text sync UX (`docs/adr/0015-audio-pipeline.md` §Decision.5, PRD-LB-219). (1) Tapping any stroke, typed word, or transcript word seeks audio to its `tStartMs` and plays — "tap anything you wrote to hear what was said". (2) During playback, strokes/words whose `[tStartMs,tEndMs]` contains the playhead are highlighted (follow-along), and strokes recorded *after* the playhead dim to opacity .12 so ink "replays in sync" (screens §7.6). Reveal modes let the user choose Spotlight / Real-time reveal / Static.

#### Scope

**In:** hit-testing a tapped stroke/word → anchor lookup by `strokeId`/`textRange` → `just_audio.seek(tStartMs)` + play ([SN-AUD-009](audio.md#sn-aud-009)); a follow-along renderer that, on each playhead tick, queries `anchorsSpanningMs(...)` ([SN-AUD-003](audio.md#sn-aud-003)) and highlights the matching strokes/words while dimming post-playhead strokes to opacity .12; three reveal modes — **Spotlight** (default: highlight current, dim rest), **Real-time reveal** (post-playhead ink hidden until "written"), **Static** (no dim/highlight); a mode selector; correct behaviour when no session is playing (normal ink) and across pages (only the visible page's anchors highlight).

**Out:** the anchor capture/clock ([SN-AUD-004](audio.md#sn-aud-004)); the playback engine ([SN-AUD-009](audio.md#sn-aud-009)); the bar chrome ([SN-AUD-010](audio.md#sn-aud-010)); handwriting *replay* animation of stroke points ([SN-AUD-012](audio.md#sn-aud-012)); transcript word list UI ([SN-AUD-021](audio.md#sn-aud-021)); multi-page navigation on playhead ([SN-AUD-014](audio.md#sn-aud-014)).

#### Acceptance criteria

- [ ] Tapping a stroke drawn during recording seeks within ±150 ms of when it was written and starts playback (ADR-0015 verify §1).
- [ ] During playback, exactly the strokes/words spanning the playhead are highlighted and post-playhead strokes dim to opacity .12; the highlight tracks the playhead at ≥ 30 Hz without dropping editor frames below 60 fps.
- [ ] The three reveal modes behave per spec and persist per notebook.
- [ ] Follow-along holds correctly across a pause/resume boundary in the recording (anchors mapped through `segments`).
- [ ] With no active playback, ink renders normally (no dim/highlight) and tapping a stroke does nothing unless a linked session exists.
- [ ] Highlight/dim is computed off the hot draw path (per-frame query is indexed and < 2 ms); no content or coordinates logged (CWE-532).

#### Technical notes

Rendering hooks in `sane_render`/the editor overlay driven from an `app/` provider that owns the active session + playhead ([SN-AUD-009](audio.md#sn-aud-009) position stream) and the anchor queries ([SN-AUD-003](audio.md#sn-aud-003)). Hit-testing reuses the editor's stroke picking (SN-ED-002). Dimming is a per-stroke opacity applied at composite time so the cached finished-stroke `Picture` need not re-tessellate (rendering-and-performance.md). Reveal-mode enum stored per notebook. PRD-LB-219, ADR-0015 §Decision.5.

#### Security & privacy

None beyond baseline: operates entirely on-device over note content; MUST NOT log stroke coordinates, text, or offsets (CWE-532, MASVS-PRIVACY-3, gate rule §0). Anchors are encrypted note content (MASVS-PRIVACY-2). No network.

#### UX notes

Delivers the headline interaction (screens §7.6, marketing "Tap any word you wrote to hear what was being said"). Dim opacity .12 is exact per mock. Reveal-mode names match the design/GoodNotes playback modes. Reduce-motion: Real-time reveal falls back to an instant show; highlight uses a token colour, not motion. A11y: a tappable stroke exposes a "play from here" semantic action; the highlight has a non-colour cue for colour-blind users. All 17 looks + dark mode.

#### Test plan

Widget/integration: `app/integration_test/audio_sync_test.dart` (record-while-writing, then tap-a-stroke seeks within tolerance; follow-along highlight tracks the playhead; dim of post-playhead ink; across pause/resume). Golden: highlighted vs dimmed states across looks. Perf: assert editor stays ≥ 60 fps during follow-along.

#### Dependencies

[SN-AUD-004](audio.md#sn-aud-004) (anchors/clock), [SN-AUD-009](audio.md#sn-aud-009) (playback + playhead), [SN-AUD-010](audio.md#sn-aud-010) (bar).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-012

<a id="sn-aud-012"></a>

**Implement handwriting replay synced to audio playback**

| Field | Value |
|---|---|
| GitHub | #92 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-004](audio.md#sn-aud-004), [SN-AUD-009](audio.md#sn-aud-009), [SN-AUD-011](audio.md#sn-aud-011) |
| Security controls | `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Beyond highlighting whole strokes, per-point stroke timestamps let us **redraw handwriting in time with the audio** — the pen retraces itself as the lecture plays (`docs/adr/0015-audio-pipeline.md` §Consequences / verify §2, PRD-LB-218). Per-point `t` already lives inside the stroke geometry (`docs/architecture/ink-engine.md` §10.1), so replay is a rendering feature over the same clock as [SN-AUD-004](audio.md#sn-aud-004). This turns "ink replays in sync" from a dim/reveal effect into true stroke-level animation and is a differentiator no competitor matches cleanly.

#### Scope

**In:** a replay renderer that, driven by the playhead position ([SN-AUD-009](audio.md#sn-aud-009)), progressively reveals each stroke point-by-point according to its per-point `t` so strokes are "drawn" as the audio reaches the moment they were written; integration with the Real-time reveal mode from [SN-AUD-011](audio.md#sn-aud-011) (post-playhead ink hidden, current stroke mid-draw); a scrub-aware path so seeking jumps replay to the correct partial state; graceful fallback to whole-stroke reveal when per-point `t` is absent (older strokes).

**Out:** the reveal-mode selector + follow-along highlight ([SN-AUD-011](audio.md#sn-aud-011)); the clock/anchors ([SN-AUD-004](audio.md#sn-aud-004)); playback engine ([SN-AUD-009](audio.md#sn-aud-009)); recording capture of per-point `t` (SN-INK-002).

#### Acceptance criteria

- [ ] With Real-time reveal on, playing a recorded session redraws strokes point-by-point in time with the audio (ADR-0015 verify §2), within the ±150 ms sync tolerance.
- [ ] Seeking/scrubbing jumps replay to the correct partial-stroke state (no full re-animation from zero, no leftover future ink).
- [ ] Replay holds ≥ 60 fps on the reference devices and never regresses editor latency while playing (Locked Decision 7).
- [ ] Strokes lacking per-point `t` fall back to whole-stroke reveal without error.
- [ ] Replay is read-only: it never mutates stored stroke geometry.
- [ ] No stroke coordinates or content logged (CWE-532).

#### Technical notes

Renderer in `sane_render`/editor overlay consuming per-point `t` from `sane_ink` stroke geometry (ink-engine §10.1) and the playhead stream ([SN-AUD-009](audio.md#sn-aud-009)); reuses the reveal-mode plumbing from [SN-AUD-011](audio.md#sn-aud-011). Partial-stroke rendering tessellates only up to the revealed point index; completed strokes fall back to the cached `Picture` (rendering-and-performance.md). Off the hot draw path. PRD-LB-218, ADR-0015 §Consequences.

#### Security & privacy

None beyond baseline: on-device rendering of note content only; no logging of coordinates/content (CWE-532, MASVS-PRIVACY-3, MASVS-PRIVACY-2). No network.

#### UX notes

Realises "Ink replays in sync" (screens §7.6) at stroke granularity. Reduce-motion: replay degrades to the whole-stroke reveal of [SN-AUD-011](audio.md#sn-aud-011) (no point-by-point animation). A11y: replay is a visual enhancement; the audio + transcript remain the primary channel. All 17 looks + dark mode.

#### Test plan

Widget/golden: `packages/sane_render/test/audio_replay_test.dart` (partial-stroke reveal at a fixed playhead; scrub jumps to correct partial state; fallback for missing `t`). Perf: replay holds 60 fps on a seeded dense page. Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-004](audio.md#sn-aud-004) (per-point clock), [SN-AUD-009](audio.md#sn-aud-009) (playhead), [SN-AUD-011](audio.md#sn-aud-011) (reveal modes).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-013

<a id="sn-aud-013"></a>

**Manage multiple recordings per note (rename, delete, trim, split, merge)**

| Field | Value |
|---|---|
| GitHub | #93 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-003](audio.md#sn-aud-003), [SN-AUD-009](audio.md#sn-aud-009), [SN-AUD-010](audio.md#sn-aud-010) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

A notebook must support **multiple `RecordingSession`s** — several lecture clips per note, as Notability/GoodNotes allow (`docs/adr/0015-audio-pipeline.md` §Decision.5, PRD-LB-212). Clips need rename, delete/trash, trim/split, and (SHOULD) merge (resolves screens Open Question 5 in part). This issue delivers the recordings list and clip-editing operations, all non-destructive to linked anchors where possible.

#### Scope

**In:** a recordings list for the open notebook (each row: name, duration, date, badges) reachable from the recorder bar; **rename**; **delete → trash** (30-day soft delete consistent with library trash, reference-count shared blobs so a duplicated note's clip isn't orphaned — PRD-LB-062); **trim** (adjust start/end, non-destructively adjusting anchor offsets); **split** (cut one session into two ordered sessions, re-keying anchors by page/time); **merge** (SHOULD: concatenate two sessions, re-basing the second's anchors onto the combined clock); a clip picker when multiple sessions exist so the bar knows which to play; correct `TimeAnchor` remapping on every edit.

**Out:** the session model ([SN-AUD-003](audio.md#sn-aud-003)); playback ([SN-AUD-009](audio.md#sn-aud-009)); segmented capture ([SN-AUD-008](audio.md#sn-aud-008)); library-wide trash mechanics (SN-LIB-001); export ([SN-AUD-023](audio.md#sn-aud-023)).

#### Acceptance criteria

- [ ] A notebook can hold ≥ 2 recordings; the list shows each with name/duration/date and opens the chosen one in the bar (PRD-LB-212).
- [ ] Rename persists and never alters audio bytes or anchors.
- [ ] Delete moves the clip to trash (restorable ≤ 30 days); a blob shared by a duplicated note is reference-counted, not deleted while still referenced.
- [ ] Trim adjusts the playable range and remaps anchor offsets so tap-to-seek stays correct after trimming (unit-verified).
- [ ] Split produces two ordered sessions whose anchors are partitioned by the cut time/page with no loss; merge (if shipped) re-bases anchors onto one clock.
- [ ] Every clip op is a single undoable transaction with one toast; no path/content logged (CWE-532).

#### Technical notes

Operations in `packages/sane_audio/lib/src/clips/` mutating sessions/anchors via [SN-AUD-003](audio.md#sn-aud-003) (CRDT ops so they merge — PRD-LB-002) and the blob store (SN-CORE-004, reference-counted). Trim/split/merge recompute `TimeAnchor.tStartMs/tEndMs` against the edited timeline. List UI in `app/` from the recorder bar ([SN-AUD-010](audio.md#sn-aud-010)). PRD-LB-212, ADR-0015 §Decision.5.

#### Security & privacy

Deleting a clip must remove its audio/peaks/transcript on purge (unless reference-counted), including from sync ([SN-AUD-019](audio.md#sn-aud-019)), honouring the user's easy-delete right (ADR-0015 §8; MASVS-PRIVACY-2, MASVS-STORAGE-1). No path/content in logs (CWE-532). Reference-count checks prevent both orphaning and premature deletion. No network here.

#### UX notes

A recordings list (screens §7.6 area) across all 17 looks + dark mode; clip rows use `sane_ui` list components. Trim/split show a waveform editor built on the peaks ([SN-AUD-005](audio.md#sn-aud-005)). Delete is undoable ("Recording moved to Trash · Undo"). Empty: the bar's idle-no-recording state. A11y: labelled rows/actions, 44 pt/48 dp targets.

#### Test plan

Unit: `packages/sane_audio/test/clips/clip_ops_test.dart` (rename; delete + reference-count; trim anchor remap; split partition; merge re-base; undo). Widget: recordings list + clip picker. Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-003](audio.md#sn-aud-003) (sessions/anchors), [SN-AUD-009](audio.md#sn-aud-009) (playback), [SN-AUD-010](audio.md#sn-aud-010) (bar).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-014

<a id="sn-aud-014"></a>

**Let a recording span multiple pages with page-turn anchors**

| Field | Value |
|---|---|
| GitHub | #94 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-004](audio.md#sn-aud-004), [SN-AUD-011](audio.md#sn-aud-011) |
| Security controls | `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

A lecture recording should capture ink across **every page you turn to**, not just the page you started on — GoodNotes limits capture to the starting page, a documented gap (`docs/product/prd-02-library-documents-audio-search.md` PRD-LB-220, `docs/adr/0015-audio-pipeline.md`). `TimeAnchor.pageIndex` records which page each anchor was on, and page-turns are anchored events, so tap-to-seek and follow-along work as the user flips pages during a lecture. This fully resolves screens Open Question 5.

#### Scope

**In:** stamping `pageIndex` on every anchor written during a session ([SN-AUD-004](audio.md#sn-aud-004)); recording page-turn events as `kind:pageTurn` anchors with the source/target page; follow-along that, on the playhead crossing a page-turn anchor, offers to navigate the editor to the page that was active then (auto-follow toggle) and highlights only that page's anchors; tap-to-seek from any page's stroke regardless of the recording's starting page; correct behaviour on paged and infinite-canvas page kinds.

**Out:** the anchor model/clock ([SN-AUD-003](audio.md#sn-aud-003)/[SN-AUD-004](audio.md#sn-aud-004)); the highlight renderer ([SN-AUD-011](audio.md#sn-aud-011)); page navigation internals (SN-PG-002/SN-PG-003); multi-recording management ([SN-AUD-013](audio.md#sn-aud-013)).

#### Acceptance criteria

- [ ] Ink written on page 3 while a recording started on page 1 is anchored with `pageIndex = 3` and is tap-to-seekable (PRD-LB-220).
- [ ] Page-turns during recording are stored as `pageTurn` anchors with source/target page.
- [ ] With auto-follow on, playback navigates to the page active at the playhead when it crosses a page-turn anchor; with it off, only a hint chip appears.
- [ ] Follow-along highlights only the currently visible page's anchors (no cross-page bleed).
- [ ] Works on both paged and infinite-canvas kinds (SN-PG-002/003).
- [ ] No content/coordinates or page paths logged (CWE-532).

#### Technical notes

Extend the anchor collector ([SN-AUD-004](audio.md#sn-aud-004)) to read the editor's active page from an `app/` provider and stamp `pageIndex`; emit `pageTurn` anchors on navigation events (SN-PG-002/003). Auto-follow drives go_router/editor page navigation from the playhead ([SN-AUD-011](audio.md#sn-aud-011) position). PRD-LB-220, ADR-0015 §Decision.5.

#### Security & privacy

None beyond baseline: on-device; page indices and anchors are encrypted note content (MASVS-PRIVACY-2); no page identifiers, content, or coordinates in logs (CWE-532, MASVS-PRIVACY-3). No network.

#### UX notes

Delivers cross-page lecture capture (screens §7.6 + Open Question 5): a subtle "following the recording" hint when auto-follow moves the page, with a one-tap way to stop following and browse freely. Reduce-motion: page changes cross-fade. A11y: page-follow announced to screen readers. All 17 looks + dark mode.

#### Test plan

Integration: `app/integration_test/audio_multipage_test.dart` (record while turning pages; tap page-3 stroke seeks correctly; auto-follow navigates on playhead; highlight confined to visible page). Unit: page-turn anchor emission. Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-004](audio.md#sn-aud-004) (anchor capture), [SN-AUD-011](audio.md#sn-aud-011) (follow-along).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-015

<a id="sn-aud-015"></a>

**Add recording consent flow and always-visible recording indicator**

| Field | Value |
|---|---|
| GitHub | #95 |
| Type | security |
| Priority | p0 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002), [SN-AUD-010](audio.md#sn-aud-010) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PLATFORM-1`, `ASVS-V8`, `CWE-359` |
| Extra labels | agent-ready |

#### Context

Recording consent is a **compliance control, not UX polish** (`docs/adr/0015-audio-pipeline.md` §8 / §Security-and-privacy-impact, PRD-LB-226). US law is split between one-party and all-party consent states, so the app must comply with the strictest jurisdiction: show a first-run and per-recording notice ("you're responsible for consent; some regions require all parties to agree"), a visible in-app recording indicator whenever the mic is live, an optional start cue, and one-tap delete. Per ADR-0015, **recording without the indicator is a release blocker** — hence p0.

#### Scope

**In:** a first-run consent notice before the first recording and a per-recording confirmation (with a "don't ask every time / remind me" preference that still keeps the indicator); a gate so `AudioRecorderService.start()` ([SN-AUD-002](audio.md#sn-aud-002)) cannot begin capture until consent is satisfied; an always-visible in-app recording indicator (e.g. a persistent red pill/badge in the app chrome) shown for the entire time the mic is live, independent of whether the recorder bar is open; an optional audible start cue; one-tap delete of a just-made recording; honest, region-neutral copy. Complements the OS mic indicator and the Android persistent notification ([SN-AUD-007](audio.md#sn-aud-007)).

**Out:** the OS permission request + rationale strings ([SN-AUD-016](audio.md#sn-aud-016)); the recorder service/bar ([SN-AUD-002](audio.md#sn-aud-002)/[SN-AUD-010](audio.md#sn-aud-010)); background service notifications ([SN-AUD-006](audio.md#sn-aud-006)/[SN-AUD-007](audio.md#sn-aud-007)); the privacy dashboard (SN-PRV-001).

#### Acceptance criteria

- [ ] No recording can start without passing the consent gate; a scripted test proves `start()` is unreachable until consent is recorded (ADR-0015 verify §5).
- [ ] The in-app recording indicator is visible for 100% of the time the mic is live, including when the recorder bar is closed and while backgrounded on platforms that keep the app visible (ADR-0015 verify §5).
- [ ] First-run consent shows once; per-recording confirmation is shown (or explicitly suppressed by the user's preference) while the indicator still always appears.
- [ ] An optional start cue can be enabled; one-tap delete removes the just-made recording and its artifacts.
- [ ] Consent copy is honest and does not claim legality; it states the user's responsibility (all-party posture).
- [ ] No content is logged; the consent preference stores no PII (CWE-359, CWE-532).

#### Technical notes

Consent gate + indicator in `app/lib/features/editor/audio/` wrapping [SN-AUD-002](audio.md#sn-aud-002) start; indicator lives in the app chrome (not only the bar) so it survives bar-close. Preference stored per profile. Copy from PRD-LB-226 / ADR-0015 §8. Coordinate with the Android FGS notification ([SN-AUD-007](audio.md#sn-aud-007)) and iOS session ([SN-AUD-006](audio.md#sn-aud-006)) so all indicators agree. checklist §11 (consent in-context, specific, withdrawable).

#### Security & privacy

This IS the privacy control: strictest-jurisdiction (all-party) consent posture + a visible indicator (MASVS-PRIVACY-1/2, ASVS V8, LINDDUN). The gate enforces that a hostile or buggy caller cannot start the mic silently (CWE-359). Consent state is a per-profile preference with no identifier or PII (checklist §11). Mic permission is requested lazily by [SN-AUD-016](audio.md#sn-aud-016). No network egress from consent.

#### UX notes

First-run + per-recording notices in the app's dialog style across all 17 looks + dark mode; the recording indicator is a high-contrast persistent affordance (screens §7.6 pulsing-dot language) that cannot be hidden while live. Reduce-motion: the indicator is static (no pulse) but still present. A11y: the indicator is announced ("Recording in progress") and is not colour-only; consent dialogs are fully labelled and keyboard-operable on web.

#### Test plan

Widget/security: `app/test/security/audio_consent_gate_test.dart` (start() blocked until consent; indicator visible whenever mic live incl. bar-closed; per-recording suppression keeps indicator). Golden: consent dialog + indicator across looks. Feeds the consent-gate gate in [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-002](audio.md#sn-aud-002) (start gate), [SN-AUD-010](audio.md#sn-aud-010) (bar surface).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-016

<a id="sn-aud-016"></a>

**Request microphone permission lazily with an honest rationale**

| Field | Value |
|---|---|
| GitHub | #96 |
| Type | task |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, privacy |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready, good first issue |

#### Context

OS permissions must be requested **lazily, in-context, with a rationale — never at launch, never more than the feature needs** (`docs/security/secure-coding-checklist.md` §8, ADR-0015 §8, PRD-LB-226). This issue wires the microphone permission request to the first record action, with honest platform strings and a graceful denied/permanently-denied path. It is small and self-contained (good first issue).

#### Scope

**In:** requesting `RECORD_AUDIO` / iOS mic permission only when the user first taps Record (after consent, [SN-AUD-015](audio.md#sn-aud-015)); honest strings — `NSMicrophoneUsageDescription` (and `NSSpeechRecognitionUsageDescription` for transcription) on iOS, an Android in-context rationale before the system dialog; a denied state that explains what's blocked and links to Settings; a permanently-denied state that never nags; ensuring capture ([SN-AUD-002](audio.md#sn-aud-002)) cannot proceed without granted permission.

**Out:** consent notices + indicator ([SN-AUD-015](audio.md#sn-aud-015)); the Android FGS permissions ([SN-AUD-007](audio.md#sn-aud-007)); the iOS session config ([SN-AUD-006](audio.md#sn-aud-006)); camera/photos permissions (media area).

#### Acceptance criteria

- [ ] Microphone permission is requested only on the first Record tap, never at launch (checklist §8).
- [ ] iOS `Info.plist` carries honest `NSMicrophoneUsageDescription` (+ `NSSpeechRecognitionUsageDescription` when transcription ships); Android shows an in-context rationale before the system prompt.
- [ ] A denied result shows a clear, non-blocking explanation with a Settings deep link; permanently-denied does not re-prompt repeatedly.
- [ ] Capture cannot start without granted permission; the flow is idempotent across repeated attempts.
- [ ] Only the microphone permission is requested (least privilege); no unrelated permission is bundled.
- [ ] No PII or content logged around the permission flow (CWE-532).

#### Technical notes

Use `permission_handler` (or `record`'s own permission API) in `app/lib/features/editor/audio/mic_permission.dart`; strings in the iOS `Info.plist` and Android string resources. Sequenced after the consent gate ([SN-AUD-015](audio.md#sn-aud-015)) and before [SN-AUD-002](audio.md#sn-aud-002) start. checklist §8 (lazy, least-privilege), §9.2/§9.3 (platform strings). PRD-LB-226.

#### Security & privacy

Least-privilege, in-context permission with an honest rationale is the platform control (MASVS-PLATFORM-1, MASVS-PRIVACY-2). Requesting only the mic, only when needed, minimises the app's permission surface and store-declared data use. No PII in logs (CWE-532). No network.

#### UX notes

An in-context rationale sheet ("Sane Notes needs the microphone to record this lecture — audio stays on your device") across all 17 looks + dark mode, then the system dialog. Denied and permanently-denied are first-class states with clear copy and a Settings link. A11y: sheets are labelled and keyboard-operable on web (where getUserMedia applies).

#### Test plan

Widget: `app/test/features/editor/audio/mic_permission_test.dart` (request only on first record; denied → explanation + Settings link; permanently-denied no re-nag; capture blocked without grant). Manual: real-device grant/deny/permanently-deny.

#### Dependencies

[SN-AUD-002](audio.md#sn-aud-002) (capture to gate).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-017

<a id="sn-aud-017"></a>

**Enforce the free-plan 30-minute recording cap with an upgrade prompt**

| Field | Value |
|---|---|
| GitHub | #97 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, billing |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002), [SN-AUD-010](audio.md#sn-aud-010) |
| Security controls | `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Free-plan audio is capped at **30 minutes per recording**; the behaviour at the cap must be defined (resolves screens Open Question 6): at 30:00 stop recording, save what exists, and prompt "Free plan: 30-minute recordings — upgrade for unlimited" — a hard stop with a clear upgrade path, never silent truncation (`docs/product/prd-02-library-documents-audio-search.md` PRD-LB-225). Pro is unlimited. This ties the recorder to the entitlement service and never punishes the user (fail-open to free).

#### Scope

**In:** a duration watcher on the active session that, for a free entitlement, stops recording at exactly 30:00, persists the captured audio + anchors, and shows the upgrade prompt/toast; an approaching-cap heads-up (e.g. at 28:00) so the stop isn't a surprise; Pro entitlement removes the cap; correct behaviour if the entitlement check is unavailable (fail-open to free posture per checklist §4 — but never delete/hide captured audio).

**Out:** the entitlement service itself (SN-BILL-001); the recorder ([SN-AUD-002](audio.md#sn-aud-002)) and bar ([SN-AUD-010](audio.md#sn-aud-010)); the PDF-import meter (library area); the upgrade screen (billing area).

#### Acceptance criteria

- [ ] On free, recording hard-stops at 30:00, the captured audio is saved, and the upgrade prompt appears (PRD-LB-225); nothing is silently truncated without notice.
- [ ] A heads-up appears before the cap (≈28:00) so the stop is expected.
- [ ] On Pro, no cap applies (verified with a Pro entitlement fixture).
- [ ] If the entitlement check fails/unavailable, behaviour fails open to the free cap but never deletes or hides already-captured audio (checklist §4).
- [ ] The upgrade prompt routes to the billing upgrade surface; declining keeps the saved recording.
- [ ] No content or entitlement token logged (CWE-532).

#### Technical notes

Duration watcher in `packages/sane_audio` reading the entitlement from `sane_billing` (SN-BILL-001) via an `app/` provider; on cap, calls [SN-AUD-002](audio.md#sn-aud-002) stop and shows the prompt through [SN-AUD-010](audio.md#sn-aud-010). Entitlement verified against a pinned key and fail-open to free (checklist §4). Cap constant sourced from the plan config, not hardcoded per-call. PRD-LB-225, screens §7.6/§14. Not blocked on SN-BILL-001: the cap reads the entitlement via the `EntitlementProvider` contract ([SN-BILL-012](billing.md#sn-bill-012)) with a fail-open stub until billing lands in M8; tests inject a fake provider.

#### Security & privacy

Entitlement handling follows the fail-open-to-free rule so a billing outage never destroys or blocks a user's local recording (checklist §4; data-loss avoidance). No entitlement token or content in logs (CWE-532, MASVS-PRIVACY-2). No new network egress beyond the existing entitlement check.

#### UX notes

Approaching-cap heads-up + hard-stop prompt with the exact upgrade copy (screens §7.6, §14) across all 17 looks + dark mode. The prompt is non-punitive: the recording is already saved. A11y: prompt is labelled, dismissible, keyboard-operable on web.

#### Test plan

Unit/widget: `packages/sane_audio/test/cap/free_cap_test.dart` (hard-stop at 30:00 saves audio + shows prompt; heads-up at ~28:00; Pro uncapped; entitlement-unavailable fails open without data loss). Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies
[SN-AUD-002](audio.md#sn-aud-002) (recorder), [SN-AUD-010](audio.md#sn-aud-010) (bar/prompt). The free/Pro entitlement is read through the `sane_billing` EntitlementProvider contract ([SN-BILL-012](billing.md#sn-bill-012)), fail-open to Free; a permissive stub stands in until billing ships in M8, so SN-BILL-001 is not a scheduling blocker.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-018

<a id="sn-aud-018"></a>

**Store audio blobs, peaks and transcripts as separated sidecars**

| Field | Value |
|---|---|
| GitHub | #98 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | audio, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-003](audio.md#sn-aud-003), [SN-CORE-004](storage.md#sn-core-004), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-1`, `CWE-311`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Audio blob + peaks + transcript + anchor table are stored **separately** from the note document (referenced by `sessionId`) so small note JSON syncs fast and audio syncs lazily (`docs/adr/0015-audio-pipeline.md` §Decision.7, PRD-LB-224). All audio artifacts are content-addressed blobs, streamed rather than fully resident (perf: audio memory streamed, §15). This issue lands the storage layout and content-addressing that [SN-AUD-019](audio.md#sn-aud-019) then syncs and [SN-AUD-023](audio.md#sn-aud-023) exports.

#### Scope

**In:** persisting the audio blob, the peaks sidecar, and the transcript sidecar as content-addressed blobs in the blob store (SN-CORE-004), each referenced by hash on the `RecordingSession` ([SN-AUD-003](audio.md#sn-aud-003)); a manifest linking a session → its blob/peaks/transcript/anchors so a `.sanenote` bundle can carry audio (SN-CORE-005); streaming reads (never loading a whole 1-hour file into memory); reference-counting so shared blobs (duplicated notes, [SN-AUD-013](audio.md#sn-aud-013)) are not double-stored or prematurely deleted; garbage collection of unreferenced blobs on purge.

**Out:** the encrypted sync transport ([SN-AUD-019](audio.md#sn-aud-019)); the session model ([SN-AUD-003](audio.md#sn-aud-003)); export/transcode ([SN-AUD-023](audio.md#sn-aud-023)); crypto primitives (SN-CRY-002); the `.sanenote` writer internals (SN-CORE-005).

#### Acceptance criteria

- [ ] Audio, peaks and transcript are stored as separate content-addressed blobs; the note document holds only refs + `sessionId` (PRD-LB-224).
- [ ] Reading audio for playback/export streams from disk without loading the whole file into memory (perf §15; verified with a 1-hour fixture).
- [ ] Identical audio bytes deduplicate by content hash; reference-counting prevents both orphaning and premature deletion across note duplication.
- [ ] Purging a session's artifacts GCs only truly unreferenced blobs.
- [ ] The session manifest lets [SN-AUD-023](audio.md#sn-aud-023) assemble a `.sanenote` with audio intact.
- [ ] No file path or content in logs; hashes are opaque (CWE-532).

#### Technical notes

Storage layout in the blob store from SN-CORE-004; refs on the session ([SN-AUD-003](audio.md#sn-aud-003)); manifest shape aligned with the `.sanenote` format (SN-CORE-005, `docs/architecture/file-format.md`). Blobs are stored encrypted at rest (envelope encryption; MASVS-CRYPTO-1) — this issue lays them out; [SN-AUD-019](audio.md#sn-aud-019) handles the encrypt-before-cloud-egress boundary. Streaming reads via chunked blob APIs. Pure Dart / storage layer — no `package:flutter` in the model. PRD-LB-224, ADR-0015 §Decision.7.

#### Security & privacy

Audio/peaks/transcripts are note content stored encrypted at rest, never in a world-readable location (MASVS-STORAGE-1, MASVS-CRYPTO-1, CWE-311). Content-addressing uses a secure hash (SHA-256/BLAKE3), not a guessable name. No path/content in logs (CWE-532). This layer prepares — but does not itself perform — cloud egress; that boundary is enforced in [SN-AUD-019](audio.md#sn-aud-019).

#### UX notes

Invisible, but it is why a note with a 1-hour lecture still opens instantly (perf §15) and why "Export everything" and `.sanenote` can carry audio (screens §10, §12). No theming.

#### Test plan

Unit: `packages/sane_audio/test/storage/audio_blob_store_test.dart` (separated storage + refs; streaming read of a large fixture without full residency; dedupe + reference-count across duplicate; GC of unreferenced blobs; manifest assembles). Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-003](audio.md#sn-aud-003) (session refs), SN-CORE-004 (blob store), SN-CORE-005 (.sanenote format).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-019

<a id="sn-aud-019"></a>

**Sync audio blobs lazily, Wi-Fi-only, and end-to-end encrypted**

| Field | Value |
|---|---|
| GitHub | #99 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | audio, sync |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-018](audio.md#sn-aud-018), [SN-CRY-002](security.md#sn-cry-002), [SN-SYNC-002](sync.md#sn-sync-002) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `OWASP-A02`, `CWE-311`, `CWE-319` |
| Extra labels | agent-ready |

#### Context

Audio is the heaviest note content, so it must sync **lazily** (behind fast note-JSON sync), optionally **Wi-Fi-only**, and always **end-to-end encrypted** — everything in the cloud is ciphertext to the user's own drive (`docs/adr/0015-audio-pipeline.md` §Decision.7 / §Security, Locked Decision 3, PRD-LB-224, `docs/architecture/sync.md`). Long/still-recording audio chunk-encrypts for resumable sync and crash-safety. This is the one audio child that lands in M4 with the crypto/sync stack; getting the encrypt-before-egress boundary right is a NEVER-break rule (CLAUDE.md §7).

#### Scope

**In:** uploading audio/peaks/transcript blobs as append-only, content-addressed, **per-chunk XChaCha20-Poly1305 / AES-256-GCM** ciphertext to the user's cloud drive via the sync op-log (SN-SYNC-002), chunk-encrypting so mobile never loads a whole file to encrypt; lazy scheduling (note JSON first, audio after); a **Wi-Fi-only** preference (default off per screens §12) that holds audio/PDF uploads on mobile data; resumable upload of the segments from [SN-AUD-008](audio.md#sn-aud-008); download-on-demand with AEAD-tag verification before use (fail closed); optional tiering that keeps recent audio on-device and offloads old with a placeholder (ADR-0015 §Decision.7).

**Out:** the crypto primitives + key hierarchy (SN-CRY-002); the op-log/segment transport (SN-SYNC-002); the drive adapters (SN-SYNC-003/004); local blob storage ([SN-AUD-018](audio.md#sn-aud-018)); the settings UI for Wi-Fi-only (settings area).

#### Acceptance criteria

- [ ] Audio/peaks/transcript blobs leave the device **only as ciphertext**; a network capture during sync shows no plaintext audio (ADR-0015 verify §6; gate rule CLAUDE.md §7).
- [ ] Encryption is per-chunk so a 1-hour file is never fully resident in memory to encrypt (checklist §3 SHOULD; verified with a large fixture).
- [ ] The AEAD tag is verified before any downloaded byte is used; a tampered/truncated blob fails closed into a user-safe error, never a partial decrypt (checklist §3).
- [ ] Wi-Fi-only, when on, holds audio uploads on cellular and resumes on Wi-Fi; note JSON still syncs.
- [ ] Audio syncs lazily (after note JSON) and resumably (a dropped upload continues from the last chunk, using [SN-AUD-008](audio.md#sn-aud-008) segments).
- [ ] No keys, file paths, or content in logs (CWE-532); TLS 1.2+ and cert pinning for our own endpoints (MASVS-NETWORK-1).

#### Technical notes

`packages/sane_audio` sync hooks feeding `sane_sync` (SN-SYNC-002) which rides the user's drive via `sane_cloud_drive`; encryption via `sane_crypto` (SN-CRY-002, envelope encryption, per-chunk AEAD) — encrypt BEFORE the write (the drive is dumb transport). Content-addressed blobs from [SN-AUD-018](audio.md#sn-aud-018). Wi-Fi-only preference from settings (screens §12; PRD-03 wifiOnly). Tiering keeps a placeholder for offloaded audio. `docs/architecture/sync.md`, `docs/architecture/crypto.md`, checklist §3.

#### Security & privacy

This enforces the zero-knowledge guarantee for audio: ciphertext-only egress, encrypt-before-write, AEAD-verify-before-use fail-closed (MASVS-CRYPTO-1/2, OWASP-A02, CWE-311/319; TM-I-01/T-01). Keys stay in `sane_secure_store`, never on disk/logs/backups. Per-chunk encryption bounds memory and enables resumable sync without weakening AEAD. TLS 1.2+ + pinning for our endpoints (MASVS-NETWORK-1). A cloud/account compromise yields no audio plaintext (roadmap M4 exit criteria).

#### UX notes

Mostly invisible; surfaces as the Wi-Fi-only toggle and a storage/sync indicator (screens §12: "Hold audio and PDF uploads on mobile data", storage meter). Offloaded (tiered) audio shows a download affordance rather than silently missing. A11y: sync/download controls labelled. Neutral across all 17 looks.

#### Test plan

Unit: `packages/sane_audio/test/sync/audio_sync_test.dart` (ciphertext-only egress assertion; per-chunk encrypt bounded memory; AEAD fail-closed on tamper/truncate; Wi-Fi-only gating; resumable from last chunk). Security regression: a decrypt with a wrong tag returns `Failure`, never bytes. Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-018](audio.md#sn-aud-018) (blobs), SN-CRY-002 (keys/AEAD), SN-SYNC-002 (op-log/segments transport).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-020

<a id="sn-aud-020"></a>

**Hand off recordings to on-device transcription with aligned word timings**

| Field | Value |
|---|---|
| GitHub | #100 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, ai |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-003](audio.md#sn-aud-003), [SN-AUD-018](audio.md#sn-aud-018), [SN-HWR-002](ocr-hwr.md#sn-hwr-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `MASVS-NETWORK-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Lecture transcription is **post-hoc from the recorded file** (never the short-phrase live recognizers), runs **on-device by default**, and must align transcript **word timestamps to the same audio clock** as the ink sync so a transcript word both seeks audio and highlights the ink written then (`docs/adr/0015-audio-pipeline.md` §Decision.6, PRD-LB-221/222, `docs/adr/0016-on-device-ml-and-ai.md`). This issue is the `sane_audio` **hand-off**: it schedules a finished recording to the `sane_ml` transcription adapter and writes the aligned `Transcript`. The engines themselves (WhisperKit/`SpeechAnalyzer`/whisper.cpp/Vosk) live in the ML area (SN-AI-001).

#### Scope

**In:** a hand-off that, on recording finish (or on user request), submits the audio blob to the `sane_ml` `TranscriptionAdapter` (on-device implementation resolved first, ADR-0016 registry); receiving word-level results `{text,tStartMs,tEndMs,conf}` and aligning `tStartMs/tEndMs` to the session clock through `segments` ([SN-AUD-004](audio.md#sn-aud-004)) so transcript words map to the same offsets as ink; persisting a `Transcript` ([SN-AUD-003](audio.md#sn-aud-003)); background scheduling (off the UI isolate, cancellable, progress) given long-form transcription is heavy; a per-request cloud-transcription opt-in path that shows a "data leaves device" banner and what is sent (higher accuracy/more languages), gated and off by default.

**Out:** the transcription engines/models (SN-AI-001, ADR-0016); the transcript view/export/search UI ([SN-AUD-021](audio.md#sn-aud-021)); the record clock ([SN-AUD-004](audio.md#sn-aud-004)); handwriting recognition (SN-HWR-001).

#### Acceptance criteria

- [ ] A finished recording is transcribed on-device by default (airplane-mode works on a supported device; roadmap M3 exit) and a `Transcript` with word timestamps is persisted (PRD-LB-221).
- [ ] Transcript word `tStartMs/tEndMs` align to the session clock through `segments` so tapping a transcript word seeks audio within ±150 ms and highlights the ink written then ([SN-AUD-011](audio.md#sn-aud-011)).
- [ ] Transcription runs off the UI isolate, shows progress, and is cancellable (perf §15/PRD-LB-361).
- [ ] Cloud transcription is per-request opt-in only, with a visible "data leaves device" banner naming what is sent; it is off by default (Locked Decision 6, checklist §11).
- [ ] Free tier gets on-device transcripts (the private path is not paywalled; PRD-LB-222).
- [ ] No transcript text, audio bytes, or file paths in logs (CWE-532).

#### Technical notes

Hand-off in `packages/sane_audio/lib/src/transcription/` calling the `sane_ml` adapter interface (pure-Dart interface; native engines via `sane_ml_native`, ADR-0016 — `docs/platform/ipad.md` `SpeechAnalyzer` `transcribe(...audioTimeRange)`, `docs/platform/android.md` GenAI/Whisper). Align results through [SN-AUD-004](audio.md#sn-aud-004) `segments`; persist via [SN-AUD-003](audio.md#sn-aud-003). Cloud opt-in reuses the app's data-leaves-device banner. Scheduling on a background isolate with progress + cancel. PRD-LB-221/222, ADR-0015 §Decision.6, ADR-0016. The transcription engines live in the sane_ml recognition area (M3), not the Sage AI epic; this hands off through the `TranscriptionAdapter` interface/registry from [SN-HWR-002](ocr-hwr.md#sn-hwr-002).

#### Security & privacy

On-device-by-default transcription keeps note content private (MASVS-PRIVACY-1/4, Locked Decision 6). Any cloud escalation is explicit, per-request, transparent (the banner names data sent), TLS 1.2+ + pinned (MASVS-NETWORK-1, checklist §11) — no silent background egress. Transcript text is note content: encrypted at rest, never logged (CWE-532). The audio blob is read from the app's own store only.

#### UX notes

Transcription is a background task with progress (screens §12 on-device indicator); the resulting transcript is surfaced by [SN-AUD-021](audio.md#sn-aud-021). The cloud opt-in shows the app's standard data-leaves-device banner across all 17 looks + dark mode. A11y: progress + banner are announced and labelled.

#### Test plan

Unit: `packages/sane_audio/test/transcription/handoff_test.dart` with a fake `TranscriptionAdapter` (word-timestamp alignment through segments; background scheduling + cancel; cloud path requires opt-in + banner; on-device default). Integration: tap-a-transcript-word seeks + highlights (with [SN-AUD-021](audio.md#sn-aud-021)). Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies
[SN-AUD-003](audio.md#sn-aud-003) (Transcript model), [SN-AUD-018](audio.md#sn-aud-018) (audio blob), [SN-HWR-002](ocr-hwr.md#sn-hwr-002) (the sane_ml transcription capability interface + on-device-first registry; the specific child replacing the epic-level dependency on SN-AI-001). Concrete on-device engines land alongside in M3 ([SN-GIPAD-001](audio.md#sn-gipad-001), [SN-GAND-011](audio.md#sn-gand-011), [SN-WEB-027](audio.md#sn-web-027)).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-021

<a id="sn-aud-021"></a>

**Show, export and search transcripts (live and full)**

| Field | Value |
|---|---|
| GitHub | #101 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, search |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-020](audio.md#sn-aud-020), [SN-AUD-011](audio.md#sn-aud-011), [SN-SRCH-002](search.md#sn-srch-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-22`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Transcripts must be **viewable, exportable, copyable, and searchable**, and must sync — explicitly countering Notability, whose Smart Notes can't be exported and don't sync (`docs/product/prd-02-library-documents-audio-search.md` PRD-LB-222/223). A best-effort **live transcript** shows during recording and a full transcript after. Transcript words are tap-to-seek (same clock as ink) and feed the FTS index so audio is searchable (PRD-LB-260). This turns a lecture recording into navigable, searchable text.

#### Scope

**In:** a transcript panel listing word-timestamped text for a session; tap a word → seek audio + highlight the ink written then (reusing [SN-AUD-011](audio.md#sn-aud-011)); a best-effort **live transcript** view during recording; **export** (plain text / with timestamps) and **copy**; feeding transcript text + word locality into the FTS5 index (SN-SRCH-002) so "Audio · mm:ss" results deep-link to the moment (PRD-LB-261/262); low-confidence words shown distinctly; language shown.

**Out:** producing the transcript ([SN-AUD-020](audio.md#sn-aud-020)); the global search UI (search area, SN-SRCH-002); the record clock ([SN-AUD-004](audio.md#sn-aud-004)); translation (PRD-LB-392, ocr-hwr/AI area).

#### Acceptance criteria

- [ ] The transcript panel renders word-timestamped text; tapping a word seeks audio within ±150 ms and highlights the corresponding ink ([SN-AUD-011](audio.md#sn-aud-011)).
- [ ] A best-effort live transcript appears during recording and is replaced by the full transcript after ([SN-AUD-020](audio.md#sn-aud-020)).
- [ ] Export produces a plain-text (and timestamped) file the user can save/share; copy puts text on the clipboard (PRD-LB-223).
- [ ] Transcript text is indexed so an audio-transcript search result opens the notebook and scrolls/seeks to the matched moment (PRD-LB-261/262).
- [ ] Low-confidence words are visually distinct; the transcript language is shown.
- [ ] Export paths are canonicalised/confined (no `..`/absolute/symlink; CWE-22); no transcript text or file path in logs (CWE-532).

#### Technical notes

Panel in `app/lib/features/editor/audio/transcript_panel.dart` reading `Transcript` ([SN-AUD-003](audio.md#sn-aud-003)); word tap reuses [SN-AUD-011](audio.md#sn-aud-011) seek/highlight; export via the platform share/save with path confinement (checklist §1); index feed to `sane_search` FTS5 (SN-SRCH-002) with `source:transcript`, `sessionId`, word ms for deep-linking (PRD-LB-260/261). Live transcript is the adapter's streaming/best-effort output ([SN-AUD-020](audio.md#sn-aud-020)). PRD-LB-222/223.

#### Security & privacy

Transcript text is note content: encrypted at rest (MASVS-STORAGE-1), synced only as ciphertext ([SN-AUD-019](audio.md#sn-aud-019)), never logged (CWE-532, MASVS-PRIVACY-2). Export target paths are validated/confined to the user's chosen directory (CWE-22, checklist §1). Copy marks sensitive where the notebook is locked (checklist §1.2). No new network egress.

#### UX notes

A transcript panel + live-transcript strip (screens §12 recognition, §11 audio results) across all 17 looks + dark mode; low-confidence words underlined/tinted per tokens. Empty (no transcript yet) shows a "Transcribing…" or "Transcribe this recording" state, never an error. A11y: the transcript is selectable text with word-level tap targets ≥ 44 pt; screen readers read it as text.

#### Test plan

Widget: `app/test/features/editor/audio/transcript_panel_test.dart` (word tap seeks + highlights; low-confidence styling; live→full swap; export writes to a confined path; copy). Unit: index-feed row shape (source/sessionId/ms) for search deep-link. Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-020](audio.md#sn-aud-020) (transcript), [SN-AUD-011](audio.md#sn-aud-011) (seek/highlight), SN-SRCH-002 (FTS index).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-022

<a id="sn-aud-022"></a>

**Add skip-silence and Voice Boost to playback**

| Field | Value |
|---|---|
| GitHub | #102 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-005](audio.md#sn-aud-005), [SN-AUD-009](audio.md#sn-aud-009) |
| Security controls | `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready, needs-decision |

#### Context

Two playback quality features have to be **built ourselves** — no package provides them (`docs/adr/0015-audio-pipeline.md` §Decision.2, PRD-LB-217): **skip-silence** (threshold the stored peaks and auto-seek across silent spans) and a **Voice Boost**-style gain/clarity control (amplify distant voices). Both make an hour-long lecture faster and clearer to review. PRD Open Question 6 asks the maintainer to confirm these sit in M3/M4 scope, so this issue carries `needs-decision` for scheduling while remaining fully specified.

#### Scope

**In:** skip-silence built on the stored peaks ([SN-AUD-005](audio.md#sn-aud-005)) — detect silent spans below a tunable dB threshold for a minimum duration and auto-seek past them during playback ([SN-AUD-009](audio.md#sn-aud-009)), with a toggle and a sensitivity setting; a Voice Boost gain/clarity control (playback gain + light dynamics/EQ) with an on/off + level; both honour the follow-along clock so skipping silence still highlights the right ink (skipped silent spans usually carry no anchors); persisting the toggles per notebook.

**Out:** peak extraction ([SN-AUD-005](audio.md#sn-aud-005)); the playback engine ([SN-AUD-009](audio.md#sn-aud-009)); the bar UI chrome ([SN-AUD-010](audio.md#sn-aud-010)); transcription ([SN-AUD-020](audio.md#sn-aud-020)).

#### Acceptance criteria

- [ ] Skip-silence auto-seeks past silent spans (below threshold for ≥ the min duration) using stored peaks, with no rescan of the audio file (PRD-LB-217).
- [ ] Follow-along/highlight stays correct across a skipped span (the playhead-to-anchor mapping still holds; [SN-AUD-011](audio.md#sn-aud-011)).
- [ ] A sensitivity control adjusts the threshold; the toggle persists per notebook.
- [ ] Voice Boost audibly raises quiet speech without clipping; it has an on/off and level and can be disabled.
- [ ] Both features run without dropping playback smoothness or blocking the UI isolate.
- [ ] No content or peak data tied to content is logged (CWE-532).

#### Technical notes

Skip-silence in `packages/sane_audio/lib/src/playback/skip_silence.dart` thresholding the peaks sidecar ([SN-AUD-005](audio.md#sn-aud-005)) and driving `just_audio.seek` ([SN-AUD-009](audio.md#sn-aud-009)); Voice Boost via playback gain / a light DSP stage where the platform supports it (fall back to gain-only). Threshold + min-duration are tunable constants surfaced as a setting. PRD-LB-217, ADR-0015 §Decision.2. Open Question 6 (scope) → `needs-decision`.

#### Security & privacy

None beyond baseline: on-device DSP over the user's own audio; no logging of peaks/content (CWE-532, MASVS-PRIVACY-2). No network.

#### UX notes

A skip-silence toggle + Voice Boost control in the playback controls (screens §7.6; Notability parity), across all 17 looks + dark mode. Sensible defaults (off, or a gentle default) so first play sounds natural. A11y: toggles/sliders labelled with values; reduce-motion unaffected (audio-only).

#### Test plan

Unit: `packages/sane_audio/test/playback/skip_silence_test.dart` (silent-span detection from a peaks fixture; auto-seek boundaries; follow-along mapping across a skip; threshold sensitivity). Manual: Voice Boost audibly lifts quiet speech without clipping on device.

#### Dependencies

[SN-AUD-005](audio.md#sn-aud-005) (peaks), [SN-AUD-009](audio.md#sn-aud-009) (playback).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-023

<a id="sn-aud-023"></a>

**Export audio and transcode to cross-platform AAC/Ogg**

| Field | Value |
|---|---|
| GitHub | #103 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-018](audio.md#sn-aud-018), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-STORAGE-1`, `CWE-22`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Users must be able to take their audio with them: export a note-with-audio as a `.sanenote` bundle (keeps the audio↔ink sync) or a ZIP of PDF + audio, and share a plain audio file that plays anywhere (`docs/adr/0015-audio-pipeline.md` §Decision.7 / §Consequences, PRD-LB-224, screens §10 ".sane (with audio)"). A portability caveat: `record` writes iOS Opus in a **CAF** container that plays only on Apple, so cross-platform sharing needs transcode to Ogg/Opus or AAC (ADR-0015 §Context / negative consequences). "Export everything" must work on every plan (PRD-LB-144).

#### Scope

**In:** exporting a session's audio as a standalone file (AAC-LC for maximum compatibility, or Ogg/Opus) via transcode where the stored container is Apple-only CAF; bundling audio + peaks + transcript + anchors into a `.sanenote` (SN-CORE-005) so sync/replay survive export; a ZIP export of PDF + audio; wiring into the notebook Export menu and "Export everything" (free-plan included, PRD-LB-144); progress + cancel for large exports; path-confined output.

**Out:** the blob storage/manifest ([SN-AUD-018](audio.md#sn-aud-018)); the `.sanenote` writer internals (SN-CORE-005); the export UI shell / share sheet (sharing-export area, SN-SHR-001); encrypted cloud sync ([SN-AUD-019](audio.md#sn-aud-019)).

#### Acceptance criteria

- [ ] Exporting audio produces an AAC-LC (or Ogg/Opus) file that plays cross-platform, transcoding Apple-only CAF/Opus as needed (ADR-0015 verify §4).
- [ ] A `.sanenote` export carries audio + peaks + transcript + anchors so re-import preserves tap-to-seek and replay (round-trip verified).
- [ ] A ZIP export contains the PDF + audio; "Export everything" works on the free plan (PRD-LB-144).
- [ ] Large exports show progress, are cancellable, and run off the UI isolate (PRD-LB-361).
- [ ] Export target paths are canonicalised/confined (reject `..`/absolute/symlink; write only under the chosen directory; CWE-22, checklist §1).
- [ ] No file path or content in logs (CWE-532).

#### Technical notes

Export/transcode in `packages/sane_audio/lib/src/export/`; `.sanenote` assembly via the manifest from [SN-AUD-018](audio.md#sn-aud-018) + the format writer (SN-CORE-005, `docs/architecture/file-format.md`). Transcode CAF/Opus → AAC/Ogg using the platform encoder / a maintained transcoder (justify the dep, checklist §10). Off-isolate with progress/cancel. Path confinement per checklist §1. PRD-LB-224/144, ADR-0015 §Decision.7.

#### Security & privacy

Export writes note content to a user-chosen location: validate and confine every output path (CWE-22, checklist §1); the app's own blobs are the only source (MASVS-STORAGE-1). A `.sanenote` export is plaintext by design at the user's request to their chosen destination — distinct from cloud sync, which is always ciphertext ([SN-AUD-019](audio.md#sn-aud-019)). No path/content in logs (CWE-532).

#### UX notes

Appears in the notebook Export menu and "Export everything" (screens §10, §12) across all 17 looks + dark mode; export options name the format and whether audio sync is preserved (".sane (with audio) — keeps audio sync"). Progress + cancel for big lectures. A11y: export options labelled, keyboard-operable on web.

#### Test plan

Unit: `packages/sane_audio/test/export/audio_export_test.dart` (CAF→AAC/Ogg transcode plays cross-platform; `.sanenote` round-trip preserves anchors/peaks/transcript; ZIP contents; path confinement rejects `..`/absolute). Feeds [SN-AUD-024](audio.md#sn-aud-024).

#### Dependencies

[SN-AUD-018](audio.md#sn-aud-018) (blobs/manifest), SN-CORE-005 (.sanenote format).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-AUD-024

<a id="sn-aud-024"></a>

**Add the audio golden, widget and integration test suite**

| Field | Value |
|---|---|
| GitHub | #104 |
| Type | test |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, qa |
| Size | L |
| SDLC | verification |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-011](audio.md#sn-aud-011), [SN-AUD-015](audio.md#sn-aud-015), [SN-AUD-020](audio.md#sn-aud-020) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-CRYPTO-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

ADR-0015 defines a concrete verification list (sync accuracy, handwriting replay, background survives, size/codec, consent gates, encrypted sync) and the epic's exit criteria depend on it (`docs/adr/0015-audio-pipeline.md` §How-to-verify, `docs/roadmap.md` M3). This issue assembles the cross-cutting audio test suite — the golden, widget and integration tests that prove the audio feature as a whole, mirroring the library epic's dedicated test issue. Per-feature unit tests live with their issues; this is the end-to-end and regression layer.

#### Scope

**In:** an integration test that records while writing across a pause/resume boundary and asserts tap-a-stroke seeks within ±150 ms and follow-along tracks the playhead (ADR-0015 §1); a handwriting-replay integration test (redraw in time; §2); a background-survives + interruption test harness (§3, real-device-gated where CI can't); a size/codec assertion (1-hour Opus 7–11 MB; AAC export cross-platform, §4); a consent-gate security test (no record without consent; indicator always visible while live, §5); an encrypted-sync test (audio/peaks/transcript egress is ciphertext-only, §6); golden coverage of the recorder bar's three states + transcript panel across all 17 looks + dark mode; a no-PII-in-logs assertion for the audio paths.

**Out:** the per-feature unit tests (in each child); the perf harness itself (SN-PERF-002); the ML transcription engine tests (SN-AI-001).

#### Acceptance criteria

- [ ] The record-while-writing integration test passes: tap-a-stroke seeks within ±150 ms and follow-along tracks the playhead across pause/resume (ADR-0015 §1).
- [ ] Handwriting replay redraws strokes in time with the audio (§2).
- [ ] Background-survives + interruption is verified (real-device-gated harness; §3).
- [ ] Size/codec assertions hold (1-hour Opus 7–11 MB; AAC export plays cross-platform; §4).
- [ ] Consent-gate test: no recording starts without consent and the indicator is visible whenever the mic is live (§5).
- [ ] Encrypted-sync test: audio/peaks/transcript leave the device only as ciphertext (§6).
- [ ] Golden tests cover the recorder bar (3 states) + transcript panel across all 17 looks + dark mode; a no-PII-in-logs assertion passes for audio paths (CWE-532).

#### Technical notes

Integration tests in `app/integration_test/audio_sync_test.dart`, `audio_multipage_test.dart`, `audio_replay_test.dart`; security tests in `app/test/security/audio_consent_gate_test.dart` and `app/test/security/audio_ciphertext_egress_test.dart`; goldens in `packages/sane_audio/test/` + `app/test/features/editor/audio/`. Use fakes for `record`/`just_audio`/the transcription adapter; real-device gates for background/interruption. Mirrors ADR-0015 §How-to-verify and CLAUDE.md §10 (security tests first-class). Feeds the M3 exit criteria and CI. The `audio_ciphertext_egress_test.dart` case is wired when encrypted sync ([SN-AUD-019](audio.md#sn-aud-019), M4) lands; the M3 suite runs against record/replay/consent/transcription.

#### Security & privacy

The suite is itself a control: it proves consent gating (MASVS-PRIVACY-2), ciphertext-only egress (MASVS-CRYPTO-1), and no-PII-in-logs (CWE-532) — the audio slice of the release gates. Test fixtures contain no secrets and no real recordings of identifiable people (checklist §0).

#### UX notes

Golden tests lock the recorder bar and transcript panel visuals across all 17 looks + dark mode and phone width, catching regressions in the audio chrome. No new UX; this verifies the UX others build.

#### Test plan

This issue IS the test plan: integration (sync, multipage, replay), security (consent gate, ciphertext egress, no-PII logs), golden (bar states, transcript panel), and size/codec assertions — all green in CI, with real-device-gated background tests documented for the device lab (SN-PERF-004 area).

#### Dependencies
[SN-AUD-011](audio.md#sn-aud-011) (sync UX), [SN-AUD-015](audio.md#sn-aud-015) (consent gate), [SN-AUD-020](audio.md#sn-aud-020) (transcription). The audio-ciphertext-egress test is added when encrypted sync [SN-AUD-019](audio.md#sn-aud-019) lands in M4; the M3 suite covers record/replay/consent/transcription, so SN-AUD-019 is not a scheduling blocker.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GA11-018

<a id="sn-ga11-018"></a>

**Choose the spoken language for transcription and cover Indic speech**

| Field | Value |
|---|---|
| GitHub | #552 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | audio, i18n, ai |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-020](audio.md#sn-aud-020), [SN-I18N-010](i18n.md#sn-i18n-010), [SN-HWR-004](ocr-hwr.md#sn-hwr-004) |
| Security controls | `MASVS-PRIVACY-1`, `ASVS-V5-Validation` |
| Extra labels | agent-ready |

#### Context

[SN-AUD-020](audio.md#sn-aud-020) hands recordings to the on-device transcription adapter and [SN-AUD-003](audio.md#sn-aud-003) already models `Transcript.language`, but **nothing lets the user choose or correct the spoken language**, and no issue states which languages we actually support for speech. [SN-I18N-010](i18n.md#sn-i18n-010) solves this for *handwriting* recognition packs; speech is a separate model family with separate coverage, and our target user is an Indian student recording a lecture that may be in Hindi, Marathi, Tamil or heavily code-switched Hinglish. Transcribing Hindi speech with an English model produces confident garbage that then pollutes search ([SN-SRCH-001](search.md#sn-srch-001)), captions ([SN-A11Y-015](a11y.md#sn-a11y-015)), Sage answers ([SN-AI-013](ai.md#sn-ai-013)) and the accessible transcript — a WCAG 1.2 failure dressed as a feature.

#### Scope

**In:** a `SpeechLanguage` catalogue (BCP-47 tag, native + English name, model/pack size, per-backend availability, on-device vs unavailable) derived from the adapters in `packages/sane_ml` ([SN-AI-002](ai.md#sn-ai-002)); a spoken-language control on the recorder bar ([SN-AUD-010](audio.md#sn-aud-010)) and in the recording's detail view, defaulting to the notebook's recognition language, then the UI locale, then device speech settings; on-demand model download reusing the manager in [SN-AI-008](ai.md#sn-ai-008) with size, progress, pause/cancel and the Wi-Fi-only preference honoured; storing the chosen tag on `Transcript.language` and surfacing it in the transcript panel ([SN-AUD-021](audio.md#sn-aud-021)) with a re-transcribe action after a language change; an explicit, honest empty state when no model exists for a language (offer the closest supported one, never silently fall back to English); code-switching guidance documented (choose the dominant language; mark the limitation in the help centre).

**Out:** the transcription engine choice (ADR-0016), caption rendering ([SN-A11Y-015](a11y.md#sn-a11y-015)), translation ([SN-AI-016](ai.md#sn-ai-016)).

#### Acceptance criteria

- [ ] The user can set the spoken language before or after recording; re-transcribing with a new language replaces the transcript and its search index entries.
- [ ] The default chain (notebook recognition language → UI locale → device) is implemented and unit-tested.
- [ ] Unsupported languages produce a clear, announced message with alternatives; the app never transcribes with a mismatched model silently.
- [ ] Model downloads show size and progress, honour Wi-Fi-only, resume after interruption, and are deletable from storage settings ([SN-SET-014](settings.md#sn-set-014)).
- [ ] `Transcript.language` is persisted, synced, exported and drives caption language and the Read Aloud voice ([SN-GA11-003](i18n.md#sn-ga11-003)).
- [ ] Transcript quality for at least Hindi and one Dravidian language is spot-checked on real lecture audio and recorded in the issue.

#### Technical notes

Extend the `TranscriptionAdapter` capability descriptor with `languages` so the UI can enumerate support without hard-coding engine knowledge. Language changes must invalidate derived artefacts: captions, FTS rows ([SN-SRCH-002](search.md#sn-srch-002)), and Sage embeddings ([SN-AI-009](ai.md#sn-ai-009)) for that recording. Language-pack download reuses the recognition model-download manager ([SN-HWR-004](ocr-hwr.md#sn-hwr-004), M3), not the Sage AI model manager ([SN-AI-008](ai.md#sn-ai-008), M6).

#### Security & privacy

Transcription stays on-device (privacy promise, [SN-PRV-001](privacy.md#sn-prv-001)); model downloads must be integrity-verified through the existing manifest/signature path in [SN-AI-008](ai.md#sn-ai-008) — a substituted speech model is a content-integrity and exfiltration risk. The language list is sensitive inference data: keep it in the encrypted document envelope and out of telemetry.

#### UX notes

Recorder bar shows the language as a compact chip ('HI'), expanding to a picker; the transcript panel header states the language and offers 'Transcribe again in…'. Copy must not promise accuracy we cannot deliver for code-switched speech.

#### Test plan

`app/test/features/audio/speech_language_test.dart` (default chain, persistence, invalidation on change); adapter fake asserting unsupported-language handling; an integration test downloading a stub pack with Wi-Fi-only on; manual accuracy spot-check logged with fixtures, not real user audio.

#### Dependencies
[SN-AUD-020](audio.md#sn-aud-020) (transcription hand-off), [SN-I18N-010](i18n.md#sn-i18n-010) (recognition language list), [SN-HWR-004](ocr-hwr.md#sn-hwr-004) (on-demand recognition-model download & lifecycle manager the language packs reuse; the specific child replacing the dependency on the Sage AI model manager SN-AI-008).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-011

<a id="sn-gand-011"></a>

**Implement the Android on-device speech-recognition adapter for voice notes**

| Field | Value |
|---|---|
| GitHub | #571 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | android-tablet, android-phone |
| Areas | audio, ai, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AUD-001](audio.md#sn-aud-001) |
| Depends on | [SN-AUD-020](audio.md#sn-aud-020), [SN-HWR-002](ocr-hwr.md#sn-hwr-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `MASVS-STORAGE-1` |
| Extra labels | — |

#### Context
[SN-AUD-020](audio.md#sn-aud-020) hands recordings to "on-device transcription with aligned word timings" and [SN-AI-006](ai.md#sn-ai-006) wires the Android **text-generation** adapter (ML Kit GenAI over Gemini Nano). Neither issue implements the Android **speech** path, and `docs/platform/android.md` §2 names two concrete options: ML Kit **GenAI Speech Recognition** (alpha, flagship-gated) and the platform `SpeechRecognizer` with `createOnDeviceSpeechRecognizer()` (API 33+). The compatibility matrix §6 marks Android on-device transcription as ⚠️ "GenAI alpha / platform", which is a promise with no owner. Without this adapter, Android voice notes either fall back to nothing or push audio to the cloud — breaking decision 6 (on-device first) and the "no data collected" posture on the very surface where Samsung ships Transcript Assist today (`docs/research/sources/samsung-notes-nebo-other.md` §1). The iPad side has its Apple equivalent inside [SN-AUD-020](audio.md#sn-aud-020)/[SN-AI-005](ai.md#sn-ai-005); Android needs its own, because availability is per-device and must be probed, never assumed.

#### Scope
**In:** an Android implementation of the `sane_ml` transcription capability ([SN-HWR-002](ocr-hwr.md#sn-hwr-002)) inside `plugins/sane_ml_native`: availability probe (language pack present, on-device engine present, GenAI speech available on this device tier), streaming partial results and final segments with timestamps, language selection from the recognition language list ([SN-I18N-010](i18n.md#sn-i18n-010)), cancellation, and an explicit "unavailable on this device" capability result the UI can render; mapping engine output to the `Transcript` model with word/segment timings suitable for tap-to-seek ([SN-AUD-011](audio.md#sn-aud-011)); a queueing policy so transcription of a finished recording runs while the app is foreground and resumes later otherwise.
**Out:** the cross-platform transcription orchestration and alignment ([SN-AUD-020](audio.md#sn-aud-020)); transcript UI/search ([SN-AUD-021](audio.md#sn-aud-021), [SN-SRCH-012](search.md#sn-srch-012)); cloud transcription (forbidden without the per-request opt-in in [SN-HWR-019](ocr-hwr.md#sn-hwr-019)); the web whisper path ([SN-WEB-027](audio.md#sn-web-027)); text generation/summaries ([SN-AI-006](ai.md#sn-ai-006)).

#### Acceptance criteria
- [ ] `availability()` returns an accurate per-device, per-language result and never throws; on a device with no on-device engine it returns unavailable and the UI offers no misleading "Transcribe" button.
- [ ] A 10-minute recording transcribes fully on-device with **airplane mode on**; no network request is made (asserted by the egress test harness, [SN-TEL-010](telemetry.md#sn-tel-010) pattern).
- [ ] Partial results stream during live recording where supported and are clearly marked provisional; final segments carry start/end times that tap-to-seek ([SN-AUD-011](audio.md#sn-aud-011)) can use within ±300 ms.
- [ ] Language selection honours the user's recognition language ([SN-I18N-010](i18n.md#sn-i18n-010)); an unsupported language degrades with a clear message, not silence.
- [ ] Transcription is cancellable and releases the engine; running it never blocks the draw path or drops the editor below 60 fps ([SN-PERF-016](perf.md#sn-perf-016)).
- [ ] The adapter is behind the capability registry ([SN-AI-003](ai.md#sn-ai-003)/[SN-HWR-002](ocr-hwr.md#sn-hwr-002)) so the feature is absent, not broken, on Tier 3 devices.

#### Technical notes
Kotlin in `plugins/sane_ml_native/android`: platform `SpeechRecognizer.createOnDeviceSpeechRecognizer()` (API 33+) with `RecognizerIntent.EXTRA_PREFER_OFFLINE`, plus the ML Kit GenAI Speech Recognition path where present — the latter is **alpha and device-gated (Pixel 9+/S25+/OnePlus 13+ class)** per `docs/research/sources/android-stylus-capabilities.md` §4, so it must sit behind the same probe. Recognition runs off the platform main thread; results cross to Dart on an `EventChannel` (ADR-0012). Feeding a finished file rather than the live mic may require a decode step — record the approach and its limits **(verify)** in `docs/platform/android.md` §2. Speech recognition only; text generation ([SN-AI-006](ai.md#sn-ai-006), M6) is out of scope and not a dependency — only the ML Kit GenAI availability probe is shared.

#### Security & privacy
Audio is the most sensitive content the app holds (lectures contain other people's voices). Controls: on-device only, no network by construction (MASVS-PRIVACY-3); the recording-consent flow and visible indicator in [SN-AUD-015](audio.md#sn-aud-015) still govern capture; transcripts are stored encrypted as sidecars ([SN-AUD-018](audio.md#sn-aud-018), [SN-CRY-007](security.md#sn-cry-007)); no audio or transcript text is ever logged ([SN-SEC-021](security.md#sn-sec-021), CWE-532); if a device routes recognition through a system service that may be cloud-backed, the probe must classify it as **not on-device** and the feature must then require the explicit cloud opt-in ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)) — fail closed.

#### UX notes
Reuse the transcription states in `docs/design/screens-and-flows.md` audio section: idle → "Transcribe (on device)" → progress → transcript with provisional text greyed. Where unavailable, show one honest line ("Your device can't transcribe offline yet") rather than hiding the feature silently. The data-leaves-device indicator ([SN-AI-019](ai.md#sn-ai-019)) must remain off for this path.

#### Test plan
Unit tests with a fake engine for streaming/partial/cancel/error mapping. Instrumented test on an API 33 emulator with the on-device engine installed, plus manual runs on the Galaxy Tab and a Pixel-class device. Airplane-mode egress assertion in `integration_test`. Timing-accuracy test against a fixture recording with known utterance boundaries. Files: `plugins/sane_ml_native/android/.../SpeechAdapter.kt`, `packages/sane_ml/test/transcription_android_test.dart`.

#### Dependencies
[SN-AUD-020](audio.md#sn-aud-020) (cross-platform transcription orchestration), [SN-HWR-002](ocr-hwr.md#sn-hwr-002) (sane_ml transcription capability interface). This is speech recognition, not text generation: it shares the ML Kit GenAI device-gating probe with [SN-AI-006](ai.md#sn-ai-006) (M6) but does not depend on it.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-001

<a id="sn-gipad-001"></a>

**Wire the Apple SpeechAnalyzer on-device transcription adapter via sane_ml_native**

| Field | Value |
|---|---|
| GitHub | #975 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | ipad, ios-phone |
| Areas | audio, ai |
| Size | L |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-AUD-020](audio.md#sn-aud-020), [SN-HWR-002](ocr-hwr.md#sn-hwr-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Transcription is a locked on-device-first capability (decision 6), and on Apple platforms the engine is **SpeechAnalyzer / SpeechTranscriber** (iPadOS 26), the same stack behind Notes and Voice Memos (docs/platform/ipad.md §3 and §6 `sane_ml_native`; docs/research/sources/apple-pencil-ipados-capabilities.md §7). The backlog has a generic hand-off issue ([SN-AUD-020](audio.md#sn-aud-020)) and a Foundation Models *text-generation* adapter ([SN-AI-005](ai.md#sn-ai-005)), but **no issue actually implements the Apple speech-to-text adapter**, its per-locale asset lifecycle, or the iPadOS 17–25 fallback. Without it the flagship surface has no transcription path and [SN-SRCH-012](search.md#sn-srch-012) has nothing to index. This issue delivers the Swift adapter behind the `SaneMlNativePlatform.transcribe` interface.

#### Scope
**In:** the `sane_ml_native` Swift implementation of `transcribe(AudioStream, locale)` using `SpeechAnalyzer` + `SpeechTranscriber`; `SpeechDetector` voice-activity gating; `reportingOptions: [.volatileResults]` for live partials and stable finalized results; `attributeOptions: [.audioTimeRange]` so every run carries a `CMTimeRange` for tap-to-play sync; `AssetInventory` locale model download/allocate/deallocate with progress and disk accounting; `SpeechTranscriber.supportedLocales`/`installedLocales` surfaced through `MlAvailability`; `DictationTranscriber` fallback for uncovered locales; an `SFSpeechRecognizer(requiresOnDeviceRecognition: true)` path for iPadOS 17–25; Dart-side model + tests.
**Out:** the recorder and segment writer ([SN-AUD-002](audio.md#sn-aud-002), [SN-AUD-008](audio.md#sn-aud-008)); transcript UI ([SN-AUD-021](audio.md#sn-aud-021)); the Android and web transcription backends; summarisation ([SN-AI-012](ai.md#sn-ai-012)).

#### Acceptance criteria
- [ ] On iPadOS 26 with an installed locale, a 30-minute recording transcribes fully on-device with the device in Airplane Mode; a network-egress assertion in the test proves zero requests.
- [ ] Volatile partials stream within 1 s of speech; finalized runs are stable and carry an `audioTimeRange` that resolves to the correct playback offset in [SN-AUD-011](audio.md#sn-aud-011) (±150 ms on the fixture).
- [ ] `availability()` reports `unavailable(reason)` with a user-legible cause on iPadOS 17–25, on unsupported locales, and when the locale asset is not installed; the app degrades to the `DictationTranscriber`/`SFSpeechRecognizer` path or offers a download, never a silent failure.
- [ ] Locale assets are downloadable, resumable, cancellable and deletable from Settings; freed space is reported; deallocating a locale removes its files.
- [ ] Interruptions (call, route change, backgrounding) pause and resume the analyzer without dropping or duplicating a run.
- [ ] A transcript of a locked notebook is written through the same encrypted sidecar path as its audio ([SN-AUD-018](audio.md#sn-aud-018)) — never to a plaintext temp file.

#### Technical notes
Live in `plugins/sane_ml_native/ios/`. Feed the analyzer from the existing capture chain rather than re-opening the microphone. Gate every iPadOS 26 symbol behind `if #available` per [SN-IPAD-027](compat.md#sn-ipad-027); keep the Dart interface version-agnostic (`MlAvailability` decides). Model assets are system-managed — never bundle them. `NSSpeechRecognitionUsageDescription` is required for the legacy path only; prefer not shipping it if the legacy path is dropped. The `if #available` gating is applied locally in M3; [SN-IPAD-027](compat.md#sn-ipad-027) (M5) later generalises the shared availability convention — not a scheduling blocker.

#### Security & privacy
Audio and transcripts are the most sensitive content the app touches (lectures may contain third-party voices). All inference stays on-device; no cloud path is permitted here (decision 6, [SN-HWR-019](ocr-hwr.md#sn-hwr-019)). Transcript text must never be logged (MASVS-PRIVACY-1, CWE-532), must inherit the notebook's encryption ([SN-CRY-007](security.md#sn-cry-007)) and Data Protection class ([SN-GIPAD-003](security.md#sn-gipad-003)), and native→Dart payloads are untrusted input to be shape-validated (MASVS-PLATFORM-1). Asset downloads are OS-managed, so no custom download trust boundary is introduced.

#### UX notes
Live transcription appears in the recorder bar per docs/design/screens-and-flows.md; the "data leaves device" indicator stays **off** for this path. A missing language pack shows a download row with size and a Wi-Fi-only hint, not an error. Progress, cancel and failure states follow the design system's inline-status pattern.

#### Test plan
Unit: `plugins/sane_ml_native/test/transcribe_availability_test.dart` (availability matrix, locale resolution, fallback selection). Integration: `plugins/sane_ml_native/example/integration_test/speech_analyzer_test.dart` on a Tier 1 iPad with a fixed 5-minute audio fixture, asserting word-error-rate against a stored baseline and time-range alignment. Manual: interruption matrix (call, Siri, route change, Split View) per docs/platform/ipad.md §11.

#### Dependencies
[SN-AUD-020](audio.md#sn-aud-020) (transcription hand-off/alignment), [SN-HWR-002](ocr-hwr.md#sn-hwr-002) (sane_ml capability interface). iPadOS 26 symbols are gated with `if #available` locally; the shared availability convention [SN-IPAD-027](compat.md#sn-ipad-027) (M5) generalises this and is not a scheduling blocker.

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-012

<a id="sn-phn-012"></a>

**Add audio-first lecture capture mode for phones**

| Field | Value |
|---|---|
| GitHub | #856 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | audio, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-010](library.md#sn-phn-010), [SN-AUD-002](audio.md#sn-aud-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready, innovation |

#### Context
A voice memo is one of the three things docs/platform/phones.md §5 says a student captures on a phone, and the phone is the device that is actually in the room when the lecture starts. The tablet audio experience is a recorder bar attached to a page (docs/design/screens-and-flows.md §7.6); on a phone the same capability needs an **audio-first** shape: start recording in one thumb tap from the Capture hub, keep recording reliably while the screen is off or the user switches apps, and let the user drop quick ink or typed marks that are time-anchored to the recording without ever looking at a palette.

The underlying machinery already exists in the M3 audio area: the recorder service and `TimeAnchor` model (PRD-LB-210/211/218/219), multi-clip sessions (PRD-LB-212), the platform background-recording rules (PRD-LB-213 for `AVAudioSession` + `UIBackgroundModes: audio` + interruption handling; PRD-LB-214 for the Android 14+ microphone-typed foreground service — which explicitly beats Goodnotes, whose Android recording stops on app switch), segmenting for crash safety (PRD-LB-215), the free-plan 30-minute cap behaviour (PRD-LB-225) and the consent notice (PRD-LB-226). This issue is the **phone surface** over that service.

#### Scope
**In:** the lecture-mode screen (big record/stop, elapsed time, live level, one-tap marker, quick ink strip), one-tap start from Capture, background/lock-screen continuity and interruption handling on phones, time-anchored markers, the 30-minute free-plan stop behaviour on this surface, consent and recording-indicator UX, and landing the result in Quick Notes.
**Out:** the recorder/playback service and anchors ([SN-AUD-002](audio.md#sn-aud-002) and the audio area), transcription ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)), the tablet audio bar, and widget/shortcut entry points ([SN-PHN-013](notifications.md#sn-phn-013), [SN-PHN-014](notifications.md#sn-phn-014)).

#### Acceptance criteria
- [ ] Capture → Voice note starts recording within 1 s of the tap, with no intermediate configuration screen.
- [ ] Recording continues across app switch, screen lock and a 30-minute session: on Android via a `foregroundServiceType="microphone"` service with the non-dismissible notification (PRD-LB-214), on iOS via `UIBackgroundModes: audio` with `AVAudioSession.interruptionNotification` handled (pause on `.began`, resume on `.ended` when `.shouldResume`) (PRD-LB-213).
- [ ] An incoming call pauses and then resumes the recording without losing the segment boundary; the resulting clip has no gap in its time base.
- [ ] A one-tap **marker** button drops a time anchor; markers are listed afterwards and seek playback to that moment.
- [ ] A quick ink strip lets the user scribble a note during the recording; every stroke carries its `t` offset so tap-to-hear works later (PRD-LB-218/219).
- [ ] Process death mid-recording loses at most the last segment (segmented capture, PRD-LB-215).
- [ ] On the Free plan, recording stops at 30:00, saves what exists, and shows the upgrade path — never a silent truncation (PRD-LB-225).
- [ ] A first-run and per-recording consent notice is shown, plus a visible in-app recording indicator alongside the OS indicator, and a one-tap delete (PRD-LB-226).
- [ ] The finished recording lands in Quick Notes as a note with its audio, markers and any ink, and is playable offline.
- [ ] Recording never blocks the UI isolate; the level meter costs no dropped frame at 60 fps on Android-lowend.
- [ ] The screen renders correctly in all 17 looks and dark mode; the record control is >= 48×48 dp / 44×44 pt and its state is announced.

#### Technical notes
Add `app/lib/capture/lecture/` composing the recorder service from `packages/sane_audio` (ADR-0015) — the package owns encoding (Opus 12–24 kbps mono default), the peaks sidecar and anchors; the phone surface owns only presentation and lifecycle. Android foreground service via `flutter_foreground_task` started while foregrounded (a mic FGS cannot be started from background); iOS session category `.record`/`.playAndRecord`. Declare `RECORD_AUDIO`, `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MICROPHONE` and `NSMicrophoneUsageDescription` with honest rationale strings. Keep the level meter on a throttled stream (<= 20 Hz) so it cannot flood the UI isolate. Anchors and ink route through the existing document path ([SN-CORE-004](storage.md#sn-core-004)), so sync, export and `.sanenote` bundling are unchanged (PRD-LB-224 stores audio blob + peaks + anchors separately from the note document). Battery: background sync stays efficient and audio upload defers to Wi-Fi where the user chose it (phones.md §8, Settings 'Wi-Fi only').

#### Security & privacy
Recording is the most privacy-sensitive capability on a phone. Threats and controls: **T-COVERT-RECORD** — a recording that continues without the user knowing. Controls: a persistent in-app indicator, the OS microphone indicator, the non-dismissible Android notification, and no path that starts recording without a user gesture (MASVS-PRIVACY-2, MASVS-PLATFORM-3, ASVS V8). **T-CONSENT** — recording other people can be unlawful in all-party-consent regions. Control: the first-run and per-recording notice from PRD-LB-226, plus an optional start cue (MASVS-PRIVACY-3, LINDDUN non-compliance). **T-AUDIO-AT-REST** — audio is note content; an unencrypted clip in a cache or shared directory would defeat the zero-knowledge promise. Control: clips are written through the content-addressed blob store and encrypted by `sane_crypto` before any write, never to shared/external storage (CLAUDE.md §7.1; MASVS-STORAGE-1, MASVS-CRYPTO-1, CWE-312). **T-BG-EXFIL** — a background service is a tempting place for network work. Control: no egress from the recording path; sync only through the user's own cloud, ciphertext-only, and no new network call without an ADR + threat-model row (CLAUDE.md §7.4; MASVS-NETWORK-1). **T-LOG** — no transcript, filename, marker text or audio path in logs (MASVS-PRIVACY-1, CWE-532).

#### UX notes
Surface: a phone-shaped variant of the audio recorder bar states in docs/design/screens-and-flows.md §7.6 — idle-no-recording, recording, has-recording — reusing `SaneRecordButton`, `SaneAudioBar` and `SaneWaveformScrubber` from the component inventory so all 17 looks and dark mode are covered. Copy is reused verbatim where the moment recurs: 'Ink is time-linked to audio — later, tap anything you wrote to hear what was said.', 'Recording — everything you write is time-linked', 'Recording saved · mm:ss', 'Ink replays in sync'. Controls sit in the bottom third (phones.md §7). Motion: the pulsing red dot and the 250 ms timer tick are *functional* motion and are permitted during writing, but under Reduce Motion the dot becomes a steady state and never conveys liveness by motion alone (ux-principles.md §6). Error states are toasts with a recovery ('Microphone is in use — try again'), never red inline text; offline is silent.

#### Test plan
- `app/test/capture/lecture/lecture_mode_state_test.dart` — start/stop/pause, marker anchors, free-plan 30-minute stop behaviour.
- `app/test/capture/lecture/interruption_test.dart` — simulated call interruption pauses and resumes with a continuous time base.
- `app/test/capture/lecture/segment_durability_test.dart` — process death loses at most the last segment.
- `app/test/security/audio_at_rest_test.dart` — no clip, peaks file or intermediate is written outside the encrypted app-private store (regression test).
- `app/integration_test/phone_lecture_capture_test.dart` — patrol run: capture → background the app → return → stop → play back with anchors intact.
- `app/test/golden/phone/lecture_mode_golden_test.dart` — goldens per look family, light and dark, recording and idle states.

#### Dependencies
[SN-PHN-010](library.md#sn-phn-010), [SN-AUD-002](audio.md#sn-aud-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-026

<a id="sn-web-026"></a>

**Implement the MediaRecorder Opus audio capture backend for web**

| Field | Value |
|---|---|
| GitHub | #839 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | web |
| Areas | audio, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-AUD-002](audio.md#sn-aud-002), [SN-WEB-008](storage.md#sn-web-008) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `CWE-359`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Audio pinned to ink is one of the product's three headline promises ("Audio linked to your ink", `PRD-AUTH-014`), so the web build needs a real recorder rather than a "download the app" message. `docs/platform/web.md` §6 specifies **MediaRecorder with Opus** (`audio/webm;codecs=opus`), which works cross-browser only since **Safari 18.4** — so the implementation must feature-test `MediaRecorder.isTypeSupported()` and fall back to `audio/mp4`, with WebCodecs `AudioEncoder` in a Worker as the precise-encode option where available. The recorder must also respect the browser's constraints: a tab can be throttled or suspended, permissions are per-origin, and iOS gives no background execution at all (`docs/platform/web.md` §5), so long lecture recordings on web need honest expectations.

#### Scope
**In:** the web implementation of the `sane_audio` recorder interface: microphone permission request in context, MIME negotiation, chunked recording into OPFS blobs ([SN-WEB-008](storage.md#sn-web-008)), time anchors linking audio to ink, waveform data generation off the UI thread, pause/resume, interruption and tab-hidden handling, and playback.
**Out:** the shared audio model, anchors and UI ([SN-AUD-001](audio.md#sn-aud-001), [SN-AUD-002](audio.md#sn-aud-002)), transcription ([SN-WEB-027](audio.md#sn-web-027)), free-plan duration caps (`PRD-LB-225`, billing), and native recorder implementations.

#### Acceptance criteria
- [ ] Recording produces `audio/webm;codecs=opus` where supported and `audio/mp4` on older Safari, selected by `isTypeSupported()` and never by user-agent sniffing.
- [ ] Audio is written to OPFS in chunks during recording; a 60-minute recording never holds more than a bounded buffer in memory and never blocks the UI isolate.
- [ ] Time anchors align audio to ink within ±100 ms, verified by a scripted write-while-recording test.
- [ ] Microphone permission is requested **in context, at first record, with a rationale** — never at launch (`PRD-PRIV-002`, checklist §8); denial produces a clear recoverable state with a link to browser settings.
- [ ] A recording survives tab-hidden throttling and a page-visibility change; where the browser suspends capture (notably iOS), the user is warned **before** starting and the partial recording is preserved.
- [ ] Stopping, reloading the tab and reopening the notebook plays back the recording from OPFS with a rendered waveform.
- [ ] An interrupted recording (device unplugged, permission revoked mid-session) finalises what exists rather than discarding it.
- [ ] A recording indicator is visible whenever the microphone is live.

#### Technical notes
Implement against the recorder interface from [SN-AUD-002](audio.md#sn-aud-002) so `app/` code stays platform-agnostic; `packages/sane_audio` keeps the model and anchoring logic. Waveform computation and any encode work run in a Worker (`docs/architecture/overview.md` §6); WebCodecs needs a muxer library if used, so prefer MediaRecorder unless measurement justifies the extra dependency (checklist §10 — justify every dependency). Store blobs content-addressed like every other attachment (`PRD-STOR-008`). Anchor timestamps must use the same clock as stroke timestamps (`PRD-ED-024`). Relates to ADR-0015 and `PRD-LB-212`/`PRD-LB-220`.

#### Security & privacy
Threats: a microphone is the most sensitive permission the app requests — a silent or over-early request is a privacy violation and a store-label lie (MASVS-PRIVACY-1, `PRD-PRIV-002`); recorded audio is note content that could leak through logs or an unencrypted cloud write (CWE-359, MASVS-STORAGE-1); unbounded recording can exhaust storage (CWE-400); a hidden recording indicator would be a dark pattern. Controls: lazy, in-context permission with rationale (MASVS-PLATFORM-3); `Permissions-Policy: microphone=(self)` only ([SN-WEB-016](security.md#sn-web-016)); chunked writes with a size cap and quota checks ([SN-WEB-009](storage.md#sn-web-009)); audio encrypted before any cloud write ([SN-WEB-019](sync.md#sn-web-019)); an always-visible recording indicator; no transcript, filename or audio data in logs (CWE-532); permission state surfaced truthfully in the privacy dashboard (`PRD-PRIV-001`).

#### UX notes
The audio recorder bar and its states are specified in `docs/design/screens-and-flows.md` §7.6 (idle, recording, paused, playback) — the web implementation must match it exactly and render in all **17 looks, light and dark**, including the recording indicator colour which must not rely on colour alone (`PRD-CO-312`). States to cover: permission not yet asked, denied, recording, paused, interrupted, saving, playback, and offline (recording works offline — say so). Accessibility: the recorder bar is keyboard operable with ≥ 44 px targets, state changes announce politely, the waveform has a text alternative (duration and position), and captions/transcripts are provided when transcription exists (`PRD-CO-338`).

#### Test plan
- `packages/sane_audio/test/web_recorder_contract_test.dart` — the recorder contract against a fake capture source.
- `app/test/web/mime_negotiation_test.dart` — `isTypeSupported` branching including the Safari fallback; asserts no UA sniffing.
- `app/integration_test/web/audio_record_roundtrip_test.dart` — record, reload, play back from OPFS with waveform.
- `app/integration_test/web/audio_ink_anchor_test.dart` — ±100 ms anchor alignment while writing.
- Manual: Safari iPadOS (background/suspend behaviour), Firefox, Chrome Android; permission-denied recovery.

#### Dependencies
[SN-AUD-002](audio.md#sn-aud-002), [SN-WEB-008](storage.md#sn-web-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Privacy dashboard + permission rationale copy updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md §8 and §11

---

### SN-WEB-027

<a id="sn-web-027"></a>

**Ship offline transcription on web via whisper.cpp WASM under isolation**

| Field | Value |
|---|---|
| GitHub | #840 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | web |
| Areas | audio, ai |
| Size | L |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-026](audio.md#sn-web-026), [SN-WEB-015](security.md#sn-web-015) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `MASVS-CODE-2`, `CWE-1104`, `CWE-400`, `CWE-359` |
| Extra labels | agent-ready, innovation |

#### Context
Web Speech `SpeechRecognition` is not Baseline — Chrome 139+ has an on-device mode, Safari has a prefixed variant, Firefox is minimal — so the portable, private path to transcription in a browser is **whisper.cpp compiled to WASM**, which `docs/platform/web.md` §6 names explicitly and which requires **threads, hence COOP/COEP cross-origin isolation** ([SN-WEB-015](security.md#sn-web-015)). This is a genuine differentiator: a lecture recorded in a browser can be transcribed **entirely on the user's machine**, with nothing sent anywhere, honouring locked decision 6 (on-device by default; any cloud inference is per-request opt-in with a visible indicator). It is p3 because the audio recorder ([SN-WEB-026](audio.md#sn-web-026)) and the M3 recognition work come first and web transcription is best-effort on the compatibility matrix.

#### Scope
**In:** integrating a pinned whisper.cpp WASM build behind the `sane_ml` transcription interface; model download with explicit user consent, progress and cancel; caching the model in OPFS; running inference in a Worker under cross-origin isolation with a single-threaded fallback; progress, cancel and resume for long recordings; wiring transcript segments to audio time anchors; honest capability gating where isolation or memory is unavailable.
**Out:** the recorder ([SN-WEB-026](audio.md#sn-web-026)), the shared transcription interface and native implementations ([SN-AI-001](ai.md#sn-ai-001), ADR-0016), handwriting recognition ([SN-WEB-025](ocr-hwr.md#sn-web-025)), and any cloud transcription path.

#### Acceptance criteria
- [ ] With isolation available, a 10-minute recording transcribes **fully offline** (airplane mode) and the transcript is searchable and anchored to audio positions.
- [ ] The model is downloaded only after an explicit user action that states the size and that it is a one-time download; progress and cancel work, and a cancelled download leaves no partial artefact in use.
- [ ] The model is cached in OPFS and verified by hash before use; a corrupted or truncated model fails closed with a clear message.
- [ ] Transcription runs in a Worker: the editor stays interactive and no frame exceeds 16.7 ms while a transcription runs in the background.
- [ ] Memory stays bounded; on a low-memory browser the feature is disabled with a stated reason rather than crashing the tab.
- [ ] Where cross-origin isolation is unavailable, the app either runs the single-threaded fallback (slower, clearly indicated) or hides the feature — and **never** silently sends audio to a cloud service.
- [ ] Transcript segments carry timestamps that align with the audio anchors from [SN-WEB-026](audio.md#sn-web-026) within ±500 ms.
- [ ] Cancelling mid-transcription leaves the partial transcript available and marked partial.

#### Technical notes
Self-host the WASM artifact and the model on the app origin ([SN-WEB-017](ci-cd.md#sn-web-017)) — no CDN — so COEP/CORP and SRI/Integrity-Policy hold ([SN-WEB-015](security.md#sn-web-015), [SN-WEB-016](security.md#sn-web-016)). Pin the whisper.cpp build by version and record the hash; justify the dependency in the PR per checklist §10. Implement behind `packages/sane_ml`'s transcription interface with the web impl in `plugins/sane_ml_native` (web) so the app layer is unchanged (ADR-0016, ADR-0012). Model storage uses the OPFS blob store ([SN-WEB-008](storage.md#sn-web-008)) with a quota check and an explicit "remove downloaded model" action. Note that iOS browsers have tight memory ceilings — treat them as unsupported for this feature until measured (`docs/platform/compatibility-matrix.md` §6 row: web transcription is ⚠️ whisper WASM under COOP/COEP).

#### Security & privacy
Threats: a large third-party WASM binary and model are a supply-chain risk executing inside the notes origin (MASVS-CODE-2, CWE-1104, OWASP-A06); audio and transcripts are highly sensitive note content (CWE-359, MASVS-PRIVACY-3); a background job could exhaust memory or storage (CWE-400); an implementation that quietly falls back to a cloud API would break locked decision 6 (MASVS-PRIVACY-1). Controls: pinned, self-hosted, hash-verified artifacts with SBOM entries ([SN-CI-004](ci-cd.md#sn-ci-004)); no network call during inference at all — assert it in a test; consented, cancellable model download with size stated; bounded memory and storage with quota checks; transcripts stored as encrypted note content and never logged (CWE-532); the privacy dashboard states exactly what is downloaded and that audio never leaves the device (`PRD-PRIV-001`).

#### UX notes
Surfaces: the audio recorder bar and transcript panel (`docs/design/screens-and-flows.md` §7.6), Search results over transcripts (§11), and a "download transcription model" row in Settings → Handwriting & stylus or the audio section (§12). All states — not downloaded, downloading with progress, ready, transcribing with progress, partial, unavailable-with-reason, error — must render in all **17 looks, light and dark**; golden-test the transcript panel and the model-download row in two looks per mode. The copy must be honest about time and size ("about 75 MB, one time") and must never imply cloud processing. Accessibility: progress announced politely, ≥ 44 px controls, ≥ 4.5:1 contrast, transcript is selectable text for screen readers and doubles as captions for the recording (`PRD-CO-338`).

#### Test plan
- `app/test/web/model_download_test.dart` — consent gating, progress, cancel, hash verification, corrupt-model rejection.
- `app/test/web/transcription_gating_test.dart` — isolation/memory gating and the no-cloud-fallback assertion (network spy).
- `app/integration_test/web/transcribe_offline_test.dart` — airplane-mode transcription of a fixture recording with anchor alignment.
- `app/integration_test/web/transcription_ui_responsiveness_test.dart` — editor stays interactive during transcription.
- Manual: Chrome desktop with isolation; Firefox; confirm Safari/iOS behaviour matches the stated capability.

#### Dependencies
[SN-WEB-026](audio.md#sn-web-026), [SN-WEB-015](security.md#sn-web-015); interface from [SN-AI-001](ai.md#sn-ai-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] SBOM updated with the WASM/model artifacts; docs/platform/web.md §6 updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md §10 and §11

---

