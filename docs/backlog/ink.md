# Backlog — area: ink

45 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-INK-001](ink.md#sn-ink-001) **Build the Sane Notes ink engine (sane_ink + native low-latency surfaces)** (epic · M1 Ink Editor Alpha)
  - [SN-INK-002](ink.md#sn-ink-002) **Implement the stroke capture pipeline (raw, coalesced, predicted)** · p0 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-010](ink.md#sn-ink-010) **Normalise pointer samples into InkSample (pressure, tilt, azimuth, timestamp)** · p1 · task · S · M1 Ink Editor Alpha
    - [SN-INK-011](ink.md#sn-ink-011) **Capture coalesced high-frequency sub-frame samples across tiers** · p1 · task · M · M1 Ink Editor Alpha
    - [SN-INK-012](ink.md#sn-ink-012) **Generate and discard predicted lead samples for latency hiding** · p1 · task · M · M1 Ink Editor Alpha
    - [SN-INK-018](ink.md#sn-ink-018) **Reconcile estimated pressure and roll from Bluetooth updates** · p2 · task · M · M1 Ink Editor Alpha
  - [SN-INK-003](ink.md#sn-ink-003) **Implement the stabilisation filter (1-euro, streamline, motion filter)** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-017](ink.md#sn-ink-017) **Map a 0-100 stabilisation slider to filter parameters and presets** · p2 · task · S · M1 Ink Editor Alpha
  - [SN-INK-004](ink.md#sn-ink-004) **Implement variable-width stroke outline geometry** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-019](ink.md#sn-ink-019) **Map pressure/tilt/velocity to width and opacity via response curves** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-020](ink.md#sn-ink-020) **Implement dynamic and end-taper for stroke outlines** · p2 · task · S · M1 Ink Editor Alpha
  - [SN-INK-005](ink.md#sn-ink-005) **Implement the incremental wet-layer renderer (Tier B)** · p0 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-021](ink.md#sn-ink-021) **Commit finished strokes to sane_core with seamless wet-to-dry hand-off** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-022](ink.md#sn-ink-022) **Implement tiling and LRU raster caching for large pages** · p1 · feature · L · M1 Ink Editor Alpha
    - [SN-INK-023](ink.md#sn-ink-023) **Handle 120 Hz and adaptive refresh on the draw path** · p2 · task · S · M1 Ink Editor Alpha
    - [SN-INK-030](ink.md#sn-ink-030) **Implement dark-mode ink inversion (INK/DARK_INK display mapping)** · p1 · feature · S · M1 Ink Editor Alpha
  - [SN-INK-006](ink.md#sn-ink-006) **Build the iPadOS Metal low-latency wet-ink surface plugin** · p0 · feature · L · M1 Ink Editor Alpha
  - [SN-INK-007](ink.md#sn-ink-007) **Build the Android Jetpack Ink low-latency surface plugin** · p1 · feature · L · M1 Ink Editor Alpha
  - [SN-INK-008](ink.md#sn-ink-008) **Implement the web desynchronized-canvas ink path** · p1 · feature · L · M1 Ink Editor Alpha
  - [SN-INK-009](ink.md#sn-ink-009) **SPIKE: measure pen-to-pixel latency, pure-Flutter vs native, on 3 devices** · p0 · spike · L · M0 Foundations
  - [SN-INK-013](ink.md#sn-ink-013) **Implement palm and finger rejection with pointer-cancel retraction** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-014](ink.md#sn-ink-014) **Add an optional wrist-guard hand-rest protection band** · p3 · feature · S · M2 Library & Documents
  - [SN-INK-015](ink.md#sn-ink-015) **Implement the finger-draw toggle** · p1 · feature · S · M1 Ink Editor Alpha
  - [SN-INK-016](ink.md#sn-ink-016) **Implement left-handed mode for the ink surface and chrome** · p1 · feature · S · M1 Ink Editor Alpha
  - [SN-INK-024](ink.md#sn-ink-024) **Build the per-page R-tree spatial index** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-025](ink.md#sn-ink-025) **Implement hit-testing with broad- and narrow-phase refinement** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-026](ink.md#sn-ink-026) **Add polygon and segment geometry utilities (RDP, point-in-polygon)** · p2 · task · S · M1 Ink Editor Alpha
  - [SN-INK-027](ink.md#sn-ink-027) **Serialise strokes with decimate, delta, varint, zstd encoding** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-INK-028](ink.md#sn-ink-028) **Version the stroke encoding and add a round-trip golden test** · p2 · task · S · M1 Ink Editor Alpha
  - [SN-INK-029](ink.md#sn-ink-029) **Define the sane_ink_surface plugin interface and capability query** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-INK-031](ink.md#sn-ink-031) **Add latency instrumentation hooks (t_sample to t_present)** · p1 · task · S · M1 Ink Editor Alpha
  - [SN-INK-032](ink.md#sn-ink-032) **Add cross-tier golden and benchmark tests for ink** · p1 · test · M · M1 Ink Editor Alpha
    - [SN-INK-033](ink.md#sn-ink-033) **Build the synthetic InkSample corpus and replay harness** · p2 · test · S · M1 Ink Editor Alpha
  - [SN-GPRF-008](input-gestures.md#sn-gprf-008) **Run the stylus capability conformance suite across every supported pen** · p1 · test · M · M5 Phones & Platform Parity

---

## Issues

### SN-AND-002

<a id="sn-and-002"></a>

**Implement Jetpack Ink wet-ink front-buffer surface for Android**

| Field | Value |
|---|---|
| GitHub | #55 |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | ink, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-INK-009](ink.md#sn-ink-009), [SN-INK-007](ink.md#sn-ink-007), [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-2` |
| Extra labels | agent-ready, innovation |

#### Context
Android tablets/phones with a low-latency stylus are Tier A devices (docs/platform/android.md §3, docs/architecture/overview.md). The default wet-ink path renders the active stroke on a front buffer via Jetpack Ink (androidx.ink) InProgressStrokesView, which Google ships as the batteries-included ~4 ms path (stable 1.0.0, Dec 2025). This is the Android half of the sane_ink_surface plugin (ADR-0012) whose platform-interface and iPad twin are SN-INK-006/007, and it must meet the <= 25 ms pen-to-pixel budget on the mid-range reference (decision 7, PRD-ED-027). The M0 spike SN-INK-009 decides Tier A vs a native-view pivot; this issue delivers the Tier-A Kotlin implementation on the assumption the spike passes.

#### Scope
**In:** the Android Kotlin implementation of sane_ink_surface using androidx.ink InProgressStrokesView; begin/extend/end/cancel stroke lifecycle; mapping SaneInkSurface StrokeStyle -> Ink Brush/StockBrushes; handoff of the finished Stroke to the Dart model; ink-storage serialisation bridge.
**Out:** the custom-brush GLFrontBufferedRenderer path ([SN-AND-003](ink.md#sn-and-003)); MotionEvent capture/prediction ([SN-AND-004](ink.md#sn-and-004)); Flutter Texture composition and Tier A/B selection ([SN-AND-005](ink.md#sn-and-005)); palm rejection ([SN-AND-006](ink.md#sn-and-006)).

#### Acceptance criteria
- [ ] Wet-stroke rendering uses androidx.ink InProgressStrokesView on API 29+; pen-to-pixel latency measured by tools/perf_harness is <= 25 ms on the Android-tablet-stylus reference and no frame exceeds 16.7 ms while writing.
- [ ] beginStroke(StrokeStyle) maps to an Ink Brush/StockBrushes instance; extend(historical) feeds samples; endStroke() delivers a finished Stroke via InProgressStrokesFinishedListener to the Dart model with byte-for-byte round-trip through ink-storage.
- [ ] Front-buffer updates are used for small handwriting updates only; pan/zoom/fullscreen commit to the double-buffered layer (no tearing).
- [ ] Capability probe reports the surface available only when androidx.ink + a usable front-buffer exist; otherwise it reports unavailable so the editor can pick Tier B.
- [ ] Golden tests render an identical stroke through this path and the Tier-B path with pixel parity within tolerance across all 17 looks + light/dark.

#### Technical notes
Kotlin: androidx.ink InProgressStrokesView, Stroke, StrokeInputBatch, Brush/StockBrushes, CanvasStrokeRenderer, ink-storage (docs/platform/android.md §2, §5). Federated plugin shape sane_ink_surface -> platform-interface -> android impl (ADR-0012 rule 1); Pigeon-typed channels; EventChannel for nativeSamples. Never make per-sample channel calls on the hot loop — the native surface repaints autonomously and composites via Texture (ADR-0012 Consequences). Impeller Vulkan default on API 29+ (§3). ADR-0008 ink pipeline.

#### Security & privacy
Ink coordinates are note content: the draw loop logs nothing in profile/release (CLAUDE.md §7.3, MASVS-PRIVACY-1). The Pigeon payloads crossing Dart<->Kotlin are validated on both sides; no note content is exposed via IPC to other apps (MASVS-PLATFORM-2). No new network egress. Stroke data persists only through the encrypted local blob store.

#### UX notes
Wet ink must feel instant and identical in feel to the iPad path — the editor surface in docs/design/screens-and-flows.md §7. Low latency benefits everyone and must NOT be disabled when Reduce Motion is on (latency is not animation, PRD-ED-027). The brush cursor, palette and rulers stay in the Dart layer over the Texture.

#### Test plan
plugins/sane_ink_surface/android unit tests for the brush mapping and stroke lifecycle; plugins/sane_ink_surface/test/ink_surface_capability_test.dart for the probe; app/integration_test/editor_latency_test.dart via tools/perf_harness for the <= 25 ms gate; golden tests in packages/sane_render/test/ for Tier A vs Tier B parity across looks; patrol test exercising a real stroke on the device runner.

#### Dependencies
SN-INK-009 (spike go/no-go), SN-INK-007 (Android Jetpack Ink surface plugin skeleton), SN-INK-002 (stroke capture pipeline model).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-003

<a id="sn-and-003"></a>

**Add GLFrontBufferedRenderer low-latency path for custom brushes**

| Field | Value |
|---|---|
| GitHub | #56 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | ink, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-002](ink.md#sn-and-002), [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Jetpack Ink covers the stock brush kit, but Sane Notes ships custom brushes (grain/texture/dynamics per PRD-ED-046) that androidx.ink cannot express. For those, the wet stroke renders through androidx.graphics.lowlatency GLFrontBufferedRenderer / LowLatencyCanvasView, where Sane Notes owns the stroke geometry and paints it itself at ~4 ms (docs/platform/android.md §3). This is the second acceptable Tier-A implementation chosen by capability, complementing [SN-AND-002](ink.md#sn-and-002), and reuses the incremental wet-layer renderer geometry from SN-INK-005.

#### Scope
**In:** the GLFrontBufferedRenderer / LowLatencyCanvasView Kotlin path inside sane_ink_surface; onDrawFrontBufferedLayer / onDrawDoubleBufferedLayer callbacks; renderFrontBufferedLayer on DOWN/MOVE, commit() on UP, cancel() on CANCEL; selection between this path and the Jetpack Ink path by brush capability.
**Out:** the stock-brush Jetpack Ink path ([SN-AND-002](ink.md#sn-and-002)); brush parameter authoring (SN-BRS-*); MotionEvent capture ([SN-AND-004](ink.md#sn-and-004)).

#### Acceptance criteria
- [ ] A custom (non-stock) brush renders its wet stroke via GLFrontBufferedRenderer with pen-to-pixel latency <= 25 ms on the mid-range reference.
- [ ] Front-buffer rendering is used for small handwriting updates only; pan/zoom/fullscreen redraws commit to the double-buffered layer to avoid tearing (docs/platform/android.md §3).
- [ ] renderFrontBufferedLayer fires on DOWN/MOVE, commit() on UP, cancel() on CANCEL/palm; a cancelled stroke leaves no residue on either buffer.
- [ ] The path is selected automatically when the active brush is not expressible by androidx.ink StockBrushes; stock brushes still use [SN-AND-002](ink.md#sn-and-002).
- [ ] Golden parity with the Tier-B CustomPainter rendering of the same custom brush across looks + light/dark.

#### Technical notes
Kotlin: androidx.graphics.lowlatency GLFrontBufferedRenderer, CanvasFrontBufferedRenderer, LowLatencyCanvasView (docs/platform/android.md §2, §5). API 29+ floor. Geometry from packages/sane_render / SN-INK-005 (incremental wet-layer renderer); brush stamp/grain from packages/sane_brushes. Composited via Texture ([SN-AND-005](ink.md#sn-and-005)). ADR-0008.

#### Security & privacy
None beyond baseline: ink coordinates are note content and the draw loop logs nothing in profile/release (MASVS-PRIVACY-1); no new IPC surface, no network egress. Custom brush assets are first-party or validated by the brush importer (PRD-ED-065) before reaching this renderer.

#### UX notes
Custom brushes must feel identical to stock brushes at the pen tip; the front-buffer-vs-double-buffer switch is invisible to the user. No tearing during pan/zoom is a hard bar. Hover preview (SN-AND-007) shows the brush cursor before contact.

#### Test plan
plugins/sane_ink_surface/android GL-path unit tests; app/integration_test/editor_latency_test.dart custom-brush case; golden tests in packages/sane_render/test/custom_brush_frontbuffer_test.dart; a manual tearing check on the device lab during pan while a wet stroke is active.

#### Dependencies
SN-AND-002 (surface plugin + capability probe), SN-INK-005 (incremental wet-layer renderer geometry).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-004

<a id="sn-and-004"></a>

**Capture MotionEvent historical samples with unbuffered dispatch & prediction**

| Field | Value |
|---|---|
| GitHub | #57 |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | ink, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002), [SN-INK-009](ink.md#sn-ink-009) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `MASVS-PLATFORM-2` |
| Extra labels | agent-ready |

#### Context
Flutter does not surface coalesced/historical sub-samples at the framework layer (docs/platform/android.md L1), so on fast strokes the wet path would be jagged. The native sane_ink_surface therefore reads MotionEvent.getHistorical* (the Android analogue of iOS coalesced touches), calls requestUnbufferedDispatch to disable input batching for immediate delivery, and uses MotionEventPredictor to draw ahead of the pen (PRD-ED-025, PRD-ED-026, docs/design/gestures-and-shortcuts.md §4). Predicted points are transient and MUST NOT enter the committed stroke.

#### Scope
**In:** MotionEvent capture in the drawing view: getHistorical* recovery of batched sub-samples, requestUnbufferedDispatch(motionEvent), MotionEventPredictor.newInstance/record/predict; feeding samples to the wet surface and the committed stroke model; discarding predicted points on the next real sample.
**Out:** the wet-render surfaces themselves ([SN-AND-002](ink.md#sn-and-002)/[SN-AND-003](ink.md#sn-and-003)); pressure/tilt/hover axis extraction ([SN-AND-007](input-gestures.md#sn-and-007)); palm rejection ([SN-AND-006](ink.md#sn-and-006)).

#### Acceptance criteria
- [ ] Every intermediate hardware sample (up to the device's stylus rate) is recovered via getHistorical* per frame and included in the committed stroke geometry; a fast diagonal stroke shows no visible facets.
- [ ] requestUnbufferedDispatch is called on pointer-down for the drawing view so samples arrive without input batching.
- [ ] MotionEventPredictor produces predicted points that are rendered transiently in the wet layer and are provably discarded/replaced when real samples arrive — predicted points never appear in the persisted stroke (unit-tested).
- [ ] Sample capture adds no measurable jank: no frame > 16.7 ms while writing on the mid-range reference.
- [ ] Coalesced/predicted capture is read inside the event handler only (no retained MotionEvent references, which the OS recycles).

#### Technical notes
Kotlin: MotionEvent getHistoricalX/Y/Pressure/AxisValue, getHistorySize; View.requestUnbufferedDispatch(MotionEvent); androidx.input:input-motionprediction MotionEventPredictor (record()/predict()) (docs/platform/android.md §2, §3). Samples flow to packages/sane_ink (SN-INK-002) as the InkSample model over an EventChannel; the point model {x,y,p,tilt,azimuth,t} follows PRD-ED-024. ADR-0008, ADR-0012.

#### Security & privacy
Raw pointer coordinates are note content and stay on device (MASVS-STORAGE-1); the draw loop and sample stream log nothing in profile/release (MASVS-PRIVACY-1). MotionEvent objects are OS-recycled — never retain or forward them across the channel; only extracted numeric samples cross, and are bounds-checked before entering the model (MASVS-PLATFORM-2).

#### UX notes
The perceptual result is a stroke that keeps up with the fastest handwriting and reads smooth at every zoom (vector re-tessellation, PRD-ED-008). Prediction hides latency without overshoot artefacts; if a device lacks the prediction lib, capture still works from historical samples alone (graceful degradation).

#### Test plan
packages/sane_ink/test/motion_capture_test.dart (historical-sample expansion, predicted-point exclusion from committed stroke); plugins/sane_ink_surface/android instrumented test for unbuffered dispatch; app/integration_test/editor_latency_test.dart jank assertion; a golden comparing a fast stroke with/without historical recovery.

#### Dependencies
SN-INK-002 (capture pipeline model), SN-INK-009 (spike confirms the native capture approach).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-005

<a id="sn-and-005"></a>

**Composite native ink surface via Texture and select Tier A/B by capability**

| Field | Value |
|---|---|
| GitHub | #58 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | ink, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-002](ink.md#sn-and-002), [SN-AND-003](ink.md#sn-and-003), [SN-INK-001](ink.md#sn-ink-001) |
| Security controls | `MASVS-PLATFORM-2` |
| Extra labels | agent-ready |

#### Context
The native front-buffer surface is composited into Flutter via the Texture widget so the palette, rulers and selection stay in the Dart layer (docs/platform/android.md §3.3, ADR-0012). Whether Sane Notes uses Tier A (native front-buffer) or Tier B (pure-Flutter CustomPainter) is decided by a capability query, not a platform check (CLAUDE.md §8, docs/architecture/overview.md ink-render-tiers). This issue wires createSurface -> texture id, the Texture widget, and the runtime tier decision that binds SN-INK-001's tier abstraction to the Android implementations.

#### Scope
**In:** SaneInkSurface.createSurface returning a Flutter texture id; the Texture widget host in app/editor; dispose lifecycle; the capability probe that chooses Tier A (Jetpack Ink / GL front-buffer available) vs Tier B (fallback CustomPainter); runtime re-evaluation when a stylus connects/disconnects.
**Out:** the native render paths ([SN-AND-002](ink.md#sn-and-002)/[SN-AND-003](ink.md#sn-and-003)); the Tier-B renderer itself (SN-INK-001); palm rejection ([SN-AND-006](ink.md#sn-and-006)).

#### Acceptance criteria
- [ ] createSurface(SurfaceConfig) returns a valid Flutter texture id; the wet stroke renders into the Texture and composites under the Dart palette/rulers with no z-order or seam artefacts.
- [ ] The tier is chosen by capability query: on a device with a usable front-buffer + stylus the editor uses Tier A; on a device without one (e.g. no-Vulkan legacy-GL, missing androidx.ink) it falls back to Tier B and still captures and renders ink.
- [ ] Disposing the editor releases the native surface and texture id with no leak (verified over 100 open/close cycles).
- [ ] A capability change at runtime (stylus plugged in on a Chromebook, fold/unfold) re-evaluates the tier without losing the current page's strokes.
- [ ] Golden tests confirm Tier A and Tier B produce visually equivalent output for the core pen kit across looks.

#### Technical notes
Dart: Texture widget bound to the id from createSurface; capability descriptor per ADR-0012 rule 4 (isAvailable + descriptor). Tier abstraction from SN-INK-001 (Tier-B renderer) selected via a Riverpod provider in app/ (no package-to-package coordination, CLAUDE.md §3). Kotlin surface from [SN-AND-002](ink.md#sn-and-002)/[SN-AND-003](ink.md#sn-and-003). Impeller GL fallback path is the Tier-B render target (docs/platform/android.md L5).

#### Security & privacy
None beyond baseline plus IPC hygiene: the texture id and config crossing the channel are validated; the native surface exposes no note content to other apps (MASVS-PLATFORM-2). No logging of stroke data; no network egress.

#### UX notes
The tier switch is invisible; the user simply gets the best available latency. On a device that can only do Tier B, ink still works and stays legible — a first-class experience, not an error state. The capability probe never blocks note-taking.

#### Test plan
plugins/sane_ink_surface/test/tier_selection_test.dart (probe -> Tier A/B decision, capability-change re-evaluation); app/test/editor/texture_host_test.dart (widget, dispose/leak); golden parity tests in packages/sane_render/test/; patrol test for a Chromebook stylus-connect transition.

#### Dependencies
SN-AND-002 and SN-AND-003 (native surfaces), SN-INK-001 (Tier-B renderer / tier abstraction).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-AND-006

<a id="sn-and-006"></a>

**Implement Android palm rejection with ACTION_CANCEL, FLAG_CANCELED & tool-type**

| Field | Value |
|---|---|
| GitHub | #59 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | ink, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-004](ink.md#sn-and-004) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
A pen-first app lives or dies on palm rejection: the pen writes, the finger navigates (docs/design/gestures-and-shortcuts.md §2, PRD-ED-029). On Android this means dropping the resting hand while honouring the Settings "Palm rejection" toggle (default on). The mechanism combines ACTION_CANCEL handling, the API 33+ FLAG_CANCELED check on pointer-up, and branching on getToolType, plus suppressing edge-navigation gestures during active drawing (docs/platform/android.md §3.4).

#### Scope
**In:** ACTION_CANCEL handling that removes the stroke for getPointerId(getActionIndex()) and re-renders; FLAG_CANCELED (API 33+) check on pointer-up to undo palm/grip touches; getToolType branch (TOOL_TYPE_STYLUS/ERASER draw, TOOL_TYPE_FINGER gesture); edge-nav suppression while drawing; honouring the palm-rejection and finger-draw settings.
**Out:** the finger-draw toggle logic itself (owned by editor settings; consumed here); the wet render surfaces; gesture disambiguation for multi-finger (SN-ED-*).

#### Acceptance criteria
- [ ] With palm rejection on and a stylus active/hovering, a resting-palm TOOL_TYPE_FINGER contact never draws — it is treated as a gesture/scroll candidate or ignored.
- [ ] On ACTION_CANCEL the in-progress stroke for that pointer id is removed and the surface re-rendered with no residue.
- [ ] On API 33+ a pointer-up carrying FLAG_CANCELED undoes the unintended touch (palm/grip) without committing a stroke.
- [ ] getToolType routes TOOL_TYPE_STYLUS/TOOL_TYPE_ERASER to draw/erase and TOOL_TYPE_FINGER to gesture, per docs/design/gestures-and-shortcuts.md §2.2.
- [ ] While a stroke is active, edge-nav gestures are suppressed (BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE) so a wrist near the edge does not trigger system back/home.
- [ ] With "Draw with finger" on and no stylus present, palm rejection relaxes so finger drawing works (documented interaction, PRD-ED-029).

#### Technical notes
Kotlin: MotionEvent ACTION_CANCEL, FLAG_CANCELED (API 33+), getToolType(), getPointerId/getActionIndex; WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE (docs/platform/android.md §3.4, gestures §2.2). Settings values from prefs (palmRejection default on, drawWithFinger default off, PRD-ED-029/031). Runs in the sane_ink_surface Android impl feeding SN-AND-004's capture. ADR-0008.

#### Security & privacy
None beyond baseline: rejected touches are note-adjacent input and are never logged (MASVS-PRIVACY-1). No new IPC or network surface. Edge-nav suppression is scoped to the canvas during active drawing only, never globally, so it cannot trap the user or block system gestures elsewhere.

#### UX notes
A cancelled/palm stroke is removed, not committed (WCAG 2.5.2 pointer cancellation, gestures §9). With finger-draw off, fingers only scroll/pinch; with it on and no stylus, finger drawing is first-class. The behaviour is consistent with the iPad and Web palm rules so the result is identical everywhere.

#### Test plan
plugins/sane_ink_surface/android instrumented tests injecting ACTION_CANCEL and FLAG_CANCELED sequences; packages/sane_ink/test/palm_rejection_test.dart (tool-type routing, setting interaction); app/integration_test/palm_rejection_test.dart on a real S Pen/USI device; a golden confirming no residue after a cancelled stroke.

#### Dependencies
SN-AND-004 (MotionEvent capture provides the pointer stream this filters).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-GAND-002

<a id="sn-gand-002"></a>

**Exclude system gesture regions along the screen edges while inking**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | ink, input-gestures, compat |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-006](ink.md#sn-and-006), [SN-AND-015](compat.md#sn-and-015) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | — |

#### Context
`docs/platform/android.md` §3.4 states the requirement plainly — "Suppress edge-nav gestures while drawing with `WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE`" — and no issue owns it. On gesture navigation (the default since Android 10, our `minSdk`) the left and right screen edges are back-gesture zones and the bottom edge is the home zone. A student writing in the margin of a PDF, dragging the palette dock to an edge ([SN-ED-005](editor.md#sn-ed-005)), or lassoing near the page border currently triggers *back* or *home* instead of drawing. Every serious Android ink app handles this; getting it wrong is the single most visible "this app is not pen-native" bug on a tablet, and it is invisible on an emulator, which is where most of our functional tests run (`docs/platform/android.md` §11). Android caps how much edge a normal app may claim (a small per-side budget), so this must be a **scoped, dynamic** exclusion around the live drawing surface, not a blanket grab of the whole edge.

#### Scope
**In:** publishing system-gesture exclusion rectangles for the ink canvas and the docked palette while a stroke or drag is in progress; clearing them the moment the gesture ends; an immersive/transient-bars mode for focus mode ([SN-ED-018](editor.md#sn-ed-018)) and presentation ([SN-ED-021](editor.md#sn-ed-021)); respecting the platform's per-side exclusion budget and degrading predictably when the budget is exceeded; a settings-free default (always on while drawing) with no user-visible toggle.
**Out:** palm rejection ([SN-AND-006](ink.md#sn-and-006)); edge-to-edge insets and safe areas ([SN-AND-015](compat.md#sn-and-015)); predictive back behaviour ([SN-AND-014](compat.md#sn-and-014)); iOS edge-protection equivalents (SN-IPAD area).

#### Acceptance criteria
- [ ] Starting a stroke within the edge gesture zone draws ink and does **not** trigger back or home on a gesture-navigation device running API 29, 33 and 36.
- [ ] Exclusion rects are published only while the pointer is down (or while the palette is being dragged) and are cleared within one frame of pointer-up; a static, always-on full-edge exclusion is rejected in review.
- [ ] The total excluded height per side stays inside the platform budget; when the canvas is taller than the budget the app prefers the region nearest the active pointer and logs nothing on the draw path (CLAUDE.md draw-path rules, [SN-PERF-016](perf.md#sn-perf-016)).
- [ ] Focus mode and presentation mode use transient system bars so a swipe reveals the bars without leaving the note.
- [ ] Publishing the rects adds no measurable cost to the ≤ 25 ms pen-to-pixel budget ([SN-INK-031](ink.md#sn-ink-031) instrumentation shows no regression).
- [ ] On button/3-button navigation devices the code path is a no-op and nothing regresses.

#### Technical notes
Kotlin in `plugins/sane_ink_surface/android`: `View.setSystemGestureExclusionRects(List<Rect>)` on the drawing view, driven from the same `ACTION_DOWN`/`ACTION_UP` handling as [SN-AND-004](ink.md#sn-and-004); `WindowInsetsControllerCompat.systemBarsBehavior = BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE` for immersive surfaces. Expose a small `setGestureExclusion(List<Rect>)` method on the `sane_ink_surface` platform interface ([SN-INK-029](ink.md#sn-ink-029)) so the Dart editor can also exclude the docked palette region. Allocate the rect list once and mutate in place — no per-sample allocation ([SN-PERF-021](perf.md#sn-perf-021)).

#### Security & privacy
None beyond baseline (MASVS-PLATFORM-1: the app must not degrade system navigation). The exclusion is scoped and transient, so it cannot be used to trap the user in the app; it never suppresses the power/assistant gestures. No data, no logging.

#### UX notes
Invisible when correct. Follow `docs/design/gestures-and-shortcuts.md` §4: the user should never see a back animation start while a stroke is being drawn. The transient-bar behaviour in focus mode matches the hide-UI toggle in `docs/design/screens-and-flows.md` §7.

#### Test plan
Widget/unit test over the rect calculator (canvas geometry + palette dock position → rects, clamped to budget). `integration_test` on a gesture-navigation emulator asserting a stroke that starts 4 dp from the edge produces a stroke and no route pop. Manual on a Galaxy Tab (S Pen) and a Pixel Tablet — emulators do not reproduce every OEM edge behaviour. Files: `plugins/sane_ink_surface/android/.../GestureExclusion.kt`, `test/ink/gesture_exclusion_rects_test.dart`.

#### Dependencies
[SN-AND-006](ink.md#sn-and-006), [SN-AND-015](compat.md#sn-and-015)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-002

<a id="sn-gipad-002"></a>

**Implement Display P3 wide-gamut colour management for ink, UI and export**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, ios-phone |
| Areas | ink, brushes, design-system |
| Size | M |
| SDLC | design |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-INK-006](ink.md#sn-ink-006), [SN-BRS-020](brushes.md#sn-brs-020), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-CODE-4`, `CWE-20` |
| Extra labels | agent-ready, needs-design |

#### Context
Every Tier 1 iPad in the device lab has a **Display P3 wide-gamut** panel, and the native wet-ink plugin already takes a `colorSpace` in its `SurfaceConfig` (docs/platform/ipad.md §6) — but nothing in the backlog decides *which* colour space the product works in. Left undecided, the same stroke renders one colour on the Metal front buffer, another in the Flutter/Impeller dry layer, another in a PNG export and another in a PDF, and the cross-platform brush-parity gate ([SN-BRS-026](brushes.md#sn-brs-026)) will be chasing a moving target. Colour is also a design-system contract: the 17 looks ([SN-DS-002](design-system.md#sn-ds-002)) and the ink palettes ([SN-BRS-020](brushes.md#sn-brs-020)) are authored as sRGB hex. This issue fixes the colour pipeline end to end and writes it down.

#### Scope
**In:** an ADR choosing the working colour space (recommended: author tokens in sRGB, render and composite in extended-range sRGB/Display P3 on Apple, tag exports explicitly); `CAMetalLayer.colorspace` and pixel-format configuration in `sane_ink_surface`; matching the Flutter/Impeller surface so wet and dry ink are indistinguishable; colour-space tagging on PNG/PDF/SVG export; ICC handling for imported images and PDFs so they are not double-converted; a golden-image comparison between the wet layer, the dry layer and the exported artefact.
**Out:** the colour picker UI ([SN-BRS-021](brushes.md#sn-brs-021)); colour-blind palettes ([SN-A11Y-011](a11y.md#sn-a11y-011)); HDR/EDR content; Android and web colour management (follow-ups once the ADR lands).

#### Acceptance criteria
- [ ] An ADR under `docs/adr/` states the working space, the per-surface conversion points and the export tagging rules, and is linked from docs/platform/ipad.md.
- [ ] On a P3 iPad, a stroke drawn wet and the same stroke after commit to the dry layer differ by ΔE00 ≤ 1.0 sampled at 5 points (automated screenshot comparison).
- [ ] A palette swatch, the on-canvas stroke and the PNG export of that stroke match within ΔE00 ≤ 2.0; the exported PNG carries an explicit colour-space chunk, and the exported PDF an explicit colour space.
- [ ] An imported sRGB image and an imported P3 image both render with correct colour (no double conversion); an image with a broken or hostile ICC profile is rejected or falls back to sRGB without crashing.
- [ ] Dark-mode ink inversion ([SN-INK-030](ink.md#sn-ink-030)) is applied in the working space, not in device pixels, so inverted ink keeps hue.
- [ ] The brush-parity golden gate ([SN-BRS-026](brushes.md#sn-brs-026)) runs against the documented space and is stable across iPad, Android and web tolerances.

#### Technical notes
Touch `plugins/sane_ink_surface/ios/` (layer `colorspace`, `pixelFormat`, `wantsExtendedDynamicRangeContent = false`), `packages/sane_render`, `packages/sane_ui` token compilation, and the exporters in `packages/sane_export`. Flutter/Impeller renders in extended sRGB on iOS; verify empirically before asserting parity. Keep conversion out of the per-sample draw path — convert once at brush-resolve time and cache ([SN-PERF-017](perf.md#sn-perf-017)).

#### Security & privacy
ICC profiles in imported images and PDFs are attacker-controlled input: parse them inside the hardened decode path ([SN-SEC-006](security.md#sn-sec-006), [SN-PDF-023](pdf.md#sn-pdf-023)) with size caps, and prefer the platform decoder over hand-rolled profile parsing (CWE-20, MASVS-CODE-4). No personal data is involved; no new telemetry.

#### UX notes
Users must never see a colour shift when a stroke "dries", when a note is exported, or when a notebook is reopened on another device. Document in the help centre that exported files are colour-tagged. Colour names used for accessibility ([SN-A11Y-011](a11y.md#sn-a11y-011)) are derived from the authored sRGB values, not the device-converted ones.

#### Test plan
Unit: `packages/sane_render/test/color_space_test.dart` (conversion math, ΔE00 helper, token round-trip). Golden: wet-vs-dry and export goldens under `test/golden/color/`. Integration: `integration_test/color_pipeline_test.dart` capturing on-device screenshots on a P3 iPad and a non-P3 Tier 2 iPad. Manual: side-by-side swatch card on P3 and sRGB panels.

#### Dependencies
[SN-INK-006](ink.md#sn-ink-006), [SN-BRS-020](brushes.md#sn-brs-020), [SN-DS-002](design-system.md#sn-ds-002).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-001

<a id="sn-ink-001"></a>

**Build the Sane Notes ink engine (sane_ink + native low-latency surfaces)**

| Field | Value |
|---|---|
| GitHub | #16 |
| Type | epic |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, perf |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `MASVS-CODE-4`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
The ink engine IS the product: perceived quality of a note app is dominated by how the wet stroke tracks the pen tip and how honest the dried stroke looks (docs/architecture/ink-engine.md intro). This epic delivers `packages/sane_ink` (pure-Dart capture, filter, geometry, spatial index, serialisation), its `sane_render` painting path, and the federated `sane_ink_surface` native low-latency surfaces (Metal on Apple, Jetpack Ink / androidx.graphics.lowlatency on Android, desynchronized/Ink-API on web) per ADR-0008. It must hold the locked decision 7 budgets: pen-down to pixel <= 16 ms iPad, <= 25 ms mid Android, <= 30 ms Chrome web, >= 60 fps floor, no frame > 16.7 ms while writing (docs/platform/performance-budgets.md B1-B5). The two-tier design (Tier A native front-buffer, Tier B pure-Flutter CustomPainter) is chosen at runtime by capability query, never by platform string, over one shared filtered sample stream and one shared dried geometry. The M0 SN-INK spike is the go/no-go risk gate for the whole editor surface (ADR-0001 exit criterion).

#### Scope
**In:** input capture (raw/coalesced/predicted; pressure/tilt/azimuth/twist/timestamp), 1-euro + streamline stabilisation, variable-width outline geometry with pressure/tilt/velocity response curves, wet-layer incremental rendering, commit + tiling/caching, R-tree spatial index + hit-testing, stroke serialisation, palm/finger rejection, wrist guard, finger-draw + left-handed modes, native surfaces for iPad/Android/web, 120 Hz handling, dark-mode ink inversion, latency instrumentation, and the golden/benchmark harness.
**Out:** brush parameter presets and the brush studio (SN-BRS area), lasso selection UI and shape recognition trigger (SN-ED / shapes), document model persistence internals (SN-CORE), PDF backdrop rendering (SN-PDF), audio-sync playback UI (SN-AUD).

#### Acceptance criteria
- [ ] All child issues below are closed and CI is green.
- [ ] Pen-to-pixel budgets met on the three reference devices (Tier A where available, Tier B fallback proven).
- [ ] The same synthetic stroke produces byte-identical serialised geometry and pixel-identical dried raster on Tier A and Tier B (ADR-0008 verify step 4).
- [ ] Draw loop logs nothing in profile/release and no ink coordinate leaves the device.

#### Technical notes
Packages: `packages/sane_ink` (pure Dart, no package:flutter), `packages/sane_render`, plugin `plugins/sane_ink_surface`. DAG: sane_render -> sane_brushes -> sane_ink -> sane_core -> sane_crypto (CLAUDE.md section 3). ADRs: ADR-0008 (pipeline + surfaces), ADR-0001 (native-pivot exit criterion), ADR-0009 (brush model on top). PRD-ED-021..035 (capture), PRD-ED-037 (dark inversion). Children:
- [ ] [SN-INK-002](ink.md#sn-ink-002) stroke capture pipeline
- [ ] [SN-INK-003](ink.md#sn-ink-003) stabilisation filter
- [ ] [SN-INK-004](ink.md#sn-ink-004) outline geometry
- [ ] [SN-INK-005](ink.md#sn-ink-005) wet-layer renderer
- [ ] [SN-INK-006](ink.md#sn-ink-006) iPad Metal surface
- [ ] [SN-INK-007](ink.md#sn-ink-007) Android Jetpack Ink surface
- [ ] [SN-INK-008](ink.md#sn-ink-008) web desynchronized-canvas path
- [ ] [SN-INK-009](ink.md#sn-ink-009) M0 latency spike
- [ ] [SN-INK-010](ink.md#sn-ink-010) InkSample normalisation
- [ ] [SN-INK-011](ink.md#sn-ink-011) coalesced sampling
- [ ] [SN-INK-012](ink.md#sn-ink-012) predicted lead
- [ ] [SN-INK-013](ink.md#sn-ink-013) palm/finger rejection
- [ ] [SN-INK-014](ink.md#sn-ink-014) wrist guard
- [ ] [SN-INK-015](ink.md#sn-ink-015) finger-draw toggle
- [ ] [SN-INK-016](ink.md#sn-ink-016) left-handed mode
- [ ] [SN-INK-017](ink.md#sn-ink-017) stabilisation slider
- [ ] [SN-INK-018](ink.md#sn-ink-018) estimated-property reconciliation
- [ ] [SN-INK-019](ink.md#sn-ink-019) pressure/tilt/velocity mapping
- [ ] [SN-INK-020](ink.md#sn-ink-020) taper
- [ ] [SN-INK-021](ink.md#sn-ink-021) commit + hand-off
- [ ] [SN-INK-022](ink.md#sn-ink-022) tiling and caching
- [ ] [SN-INK-023](ink.md#sn-ink-023) 120 Hz handling
- [ ] [SN-INK-024](ink.md#sn-ink-024) R-tree spatial index
- [ ] [SN-INK-025](ink.md#sn-ink-025) hit-testing
- [ ] [SN-INK-026](ink.md#sn-ink-026) polygon/segment geometry utils
- [ ] [SN-INK-027](ink.md#sn-ink-027) stroke serialisation
- [ ] [SN-INK-028](ink.md#sn-ink-028) schema versioning
- [ ] [SN-INK-029](ink.md#sn-ink-029) sane_ink_surface interface + capability query
- [ ] [SN-INK-030](ink.md#sn-ink-030) dark-mode ink inversion
- [ ] [SN-INK-031](ink.md#sn-ink-031) latency instrumentation
- [ ] [SN-INK-032](ink.md#sn-ink-032) golden + benchmark tests
- [ ] [SN-INK-033](ink.md#sn-ink-033) synthetic corpus + replay harness

#### Security & privacy
Ink coordinates, pressure and tilt are note content: never logged (overview section 8.2), never sent by the pipeline, local and E2E-encrypted on sync (decision 3). The native method-channel surface is attack surface: validate payload shapes; plugins hold no secrets. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-PLATFORM-1, MASVS-CODE-4, CWE-400 (resource caps on unbounded canvases/segments).

#### UX notes
Surface: design/Sane Notes.dc.html Editor screen (docs/design/screens-and-flows.md section 7). All painted output must render in all 17 looks and light+dark; ink chrome (cursor, selection) carries Semantics labels; 44 pt / 48 dp targets; keyboard reachable on web.

#### Test plan
Golden tests per look for ink/brush rendering; the commit-frame golden (no flicker); benchmark tests via flutter drive --profile; unit tests for every pure stage. Files enumerated in each child; the umbrella suite is packages/sane_ink/test and app/integration_test/editor_latency_test.dart.

#### Dependencies
SN-FND-002 (monorepo scaffold). Coordinates with SN-CORE-001 (document model), SN-BRS-001 (brush engine), SN-RENDER via sane_render, SN-ED-001 (editor), SN-PERF-001 (perf harness), SN-DS-001 (tokens).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-002

<a id="sn-ink-002"></a>

**Implement the stroke capture pipeline (raw, coalesced, predicted)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Every downstream stage (filter, geometry, index, serialise) consumes one clean sample stream, so the capture pipeline is the foundation of the whole engine (docs/architecture/ink-engine.md section 1). It turns a noisy, unevenly-timed, device-specific pointer stream into an ordered list of InkSample values through six pure, headless-testable stages: capture -> normalise -> coalesce -> predict -> filter -> geometry. This issue builds the orchestration and the pure stages A (capture wiring) and C (coalesce), and defines the StrokeBuilder that accumulates the active stroke; normalisation (stage B) is [SN-INK-010](ink.md#sn-ink-010), coalesced sub-frame recovery is [SN-INK-011](ink.md#sn-ink-011), prediction is [SN-INK-012](ink.md#sn-ink-012), filtering is [SN-INK-003](ink.md#sn-ink-003). The canvas is wrapped in a raw Listener (onPointerDown/Move/Up/Cancel/Hover), never a GestureDetector, so no gesture recognizer in the arena adds latency or steals the ink pointer; pan/zoom is served by a coexisting gesture detector disambiguated by event.kind (PRD-ED-021..026).

#### Scope
**In:** the Listener wiring on the editor canvas; the InkSample and StrokeBuilder value types (immutable); stage A branch by PointerDeviceKind (stylus/invertedStylus draw/erase, touch routes to pan unless finger-draw); the coalesce stage C (append every sub-frame sample in order, dedupe only exact (x,y,tMicros) repeats, no decimation); the page-space inverse transform so samples are stored in page units.
**Out:** pressure/tilt normalisation math ([SN-INK-010](ink.md#sn-ink-010)), native coalesced batch capture ([SN-INK-011](ink.md#sn-ink-011)), prediction ([SN-INK-012](ink.md#sn-ink-012)), stabilisation ([SN-INK-003](ink.md#sn-ink-003)), palm rejection policy ([SN-INK-013](ink.md#sn-ink-013)).

#### Acceptance criteria
- [ ] The active canvas uses a raw Listener; GestureBinding.resamplingEnabled is NOT enabled on the draw path (verified by a test asserting the flag is false).
- [ ] A stylus PointerMoveEvent stream produces an ordered StrokeBuilder.samples list with no dropped or reordered points for a 10,000-sample replay.
- [ ] Coalesce dedupes only exact (x,y,tMicros) triples; a fixture with intentional duplicates asserts count.
- [ ] Samples are stored in page units after the pan/zoom inverse transform (round-trip test at 25%, 100%, 400% zoom).
- [ ] No allocation per PointerMove beyond appending to a pre-sized buffer (allocation assertion in the benchmark).

#### Technical notes
Create packages/sane_ink/lib/src/capture/stroke_builder.dart and ink_sample.dart. InkSample fields: x, y (logical px page space), pressure 0..1, tilt rad (0 = perpendicular), azimuth rad, twist rad, tMicros (monotonic since stroke start), kind, pressureIsReal (docs/architecture/ink-engine.md section 1.2). Timestamp is monotonic microseconds relative to PointerDownEvent (never wall-clock; it feeds velocity, prediction discard, and the audio-sync clock per ADR-0015). Pure Dart only (no package:flutter in sane_ink); the Listener lives in app/ or sane_render and pushes samples into sane_ink. Implements PRD-ED-024 point model.

#### Security & privacy
Samples are note content: stay on device, never logged (overview 8.2), never cross an isolate on the hot path. Validate the shape and length of any batch pushed from a native channel before use (CWE-20). IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-20.

#### UX notes
No direct chrome; this is the substrate for the Editor canvas (docs/design/screens-and-flows.md section 7.2). It must not interfere with pan/zoom gestures or the palette dock. A11y: capture must work identically for finger input so pressure hardware is never required for legible ink (PRD-ED-031 A11y).

#### Test plan
packages/sane_ink/test/capture/stroke_builder_test.dart (ordering, dedupe, page-space transform), packages/sane_ink/test/capture/listener_wiring_test.dart (widget test asserting Listener not GestureDetector, resampling off). Replay uses the corpus from [SN-INK-033](ink.md#sn-ink-033).

#### Dependencies
SN-FND-002 (monorepo scaffold + sane_ink skeleton).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-003

<a id="sn-ink-003"></a>

**Implement the stabilisation filter (1-euro, streamline, motion filter)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Human hands wobble, digitizers add quantisation noise, and low-pressure starts jitter, so raw samples must be stabilised before geometry (docs/architecture/ink-engine.md section 2). Sane Notes adopts Procreate's three-mode model (StreamLine curve-fit, Stabilization moving-average, Motion Filtering tremor-removal) but implements the default with a 1-euro filter (Casiez, Roussel, Vogel 2012), an adaptive low-pass whose cutoff rises with pointer speed: slow moves smooth hard (kills jitter), fast moves barely smooth (kills lag). The chain order is filtered = motionFilter(streamline(oneEuro(raw))). This is what makes long sweeping strokes elegant while keeping handwriting responsive (PRD-ED-028). The slider-to-parameter mapping is [SN-INK-017](ink.md#sn-ink-017); this issue implements the three stateful filter stages and their reset-on-pointer-down behaviour.

#### Scope
**In:** one_euro.dart (stateful per active stroke, applied independently to x, y, pressure), streamline.dart (p' = lerp(prevSmoothed, p, 1 - streamline)), motion_filter.dart (discard samples whose deviation from the local trend exceeds a threshold, plus an expression amount to add natural variation back); reset of all filter state on pointer-down; the chain assembled in the capture pipeline after coalesce.
**Out:** the 0-100 slider mapping and per-pen presets ([SN-INK-017](ink.md#sn-ink-017)), the geometry that consumes the filtered stream ([SN-INK-004](ink.md#sn-ink-004)), estimated-property reconciliation ([SN-INK-018](ink.md#sn-ink-018)).

#### Acceptance criteria
- [ ] 1-euro defaults minCutoff 1.0, beta 0.007, dCutoff 1.0; ranges enforced (minCutoff 0.3-3.0, beta 0.0-0.05, dCutoff 0.5-2.0).
- [ ] Zero input velocity converges to the input within minCutoff; a step input does not overshoot; output lag at 300 mm/s stays below one latency-budget frame (unit tests assert all three).
- [ ] Streamline default 0.5; a straight fast diagonal remains straight; a tight loop is not clipped.
- [ ] Motion filter is OFF by default and is never applied silently; when on it removes an injected tremor spike while preserving intended direction.
- [ ] Each stage is a pure function reset on pointer-down; a second stroke does not inherit the first stroke's filter state (regression test).

#### Technical notes
Files under packages/sane_ink/lib/src/filter/. On Tier B, streamline/smoothing MAY be passed straight to perfect_freehand getStroke rather than re-implemented (docs/architecture/ink-engine.md section 2.3); keep our own one-euro so Tier A native surfaces share identical dried geometry. Motion Filtering is surfaced in Settings > Accessibility as Steady hand (PRD-ED-028 A11y) applied app-wide independent of the per-pen slider. Pure Dart; no package:flutter.

#### Security & privacy
None beyond baseline: sample values are note content, stay on device, never logged (overview 8.2). ID: MASVS-PRIVACY-1.

#### UX notes
Default per-pen smoothing about 45 percent for handwriting legibility (PRD-ED-028; docs/research concepts idea 2). The Steady hand tremor mode is an accessibility aid, labelled and off by default; it must never be enabled without explicit user action. No visual chrome of its own.

#### Test plan
packages/sane_ink/test/filter/one_euro_test.dart (convergence, no-overshoot, lag budget), streamline_test.dart, motion_filter_test.dart (tremor removal + off-by-default), and a stabilizer_test.dart that runs the assembled chain over the [SN-INK-033](ink.md#sn-ink-033) corpus.

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002) (capture pipeline provides the coalesced sample stream).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-004

<a id="sn-ink-004"></a>

**Implement variable-width stroke outline geometry**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-003](ink.md#sn-ink-003) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Geometry converts the filtered centreline plus per-point dynamics into the outline polygon that gets filled (pressure/velocity pens) or the stamped path (textured brushes), and it is re-derived from the persisted centreline + pen preset at load, so a preset fix re-renders old strokes correctly (docs/architecture/ink-engine.md section 3, section 10.1). The default text/ink pens use a perfect_freehand-style variable-width outline; this issue delivers the StrokeGeometry interface and the outline implementation so the engine can later swap in a Rust/flutter_rust_bridge tessellator without touching callers (ADR-0001 Rust-core trigger). The pressure/tilt/velocity response-curve mapping is [SN-INK-019](ink.md#sn-ink-019) and taper is [SN-INK-020](ink.md#sn-ink-020); this issue wires the StrokeOptions and produces the fill Path.

#### Scope
**In:** a StrokeGeometry interface in sane_ink; an outline implementation wrapping the perfect_freehand Dart port; the StrokeOptions surface (size, thinning, smoothing, streamline, simulatePressure, taperStart/End, capStart/End); a single Path with PathFillType.nonZero for the fill; the centreline model that geometry consumes.
**Out:** the pressure/tilt/velocity to width/opacity response curves ([SN-INK-019](ink.md#sn-ink-019)), taper envelope details ([SN-INK-020](ink.md#sn-ink-020)), stamped/textured brush walking (SN-BRS area), the actual painting into a Canvas ([SN-INK-005](ink.md#sn-ink-005) / sane_render).

#### Acceptance criteria
- [ ] StrokeGeometry is an interface with an outline implementation; a fake implementation can be injected in tests.
- [ ] getStroke over a fixture centreline returns a closed filled outline; capStart/capEnd round the ends; taperStart/taperEnd of 0 gives blunt-free caps.
- [ ] Fill uses PathFillType.nonZero (no self-intersection holes for a figure-eight stroke).
- [ ] Default pen size 2.0, marker 12.0, thinning 0.5, smoothing 0.5 map to the documented StrokeOptions (docs/architecture/ink-engine.md section 3.1 table).
- [ ] Geometry is deterministic: same centreline + options yields an identical polygon on Tier A and Tier B (byte-identical vertex list).

#### Technical notes
Files under packages/sane_ink/lib/src/geometry/. Use the maintained perfect_freehand Dart port (battle-tested in Saber, same author). Wrap it behind StrokeGeometry so the tessellator is swappable (ADR-0001). Keep pure Dart; painting/tessellation into dart:ui Canvas lives in sane_render ([SN-INK-005](ink.md#sn-ink-005)). Implements the geometry half of PRD-ED-046 rendering. Widths are in page units; resolution-independent across zoom and export.

#### Security & privacy
None beyond baseline: geometry inputs/outputs are note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Outline crispness at all zoom is a hard requirement (vector re-tessellation, not bitmap scaling, PRD-ED-008). Must render correctly across all 17 looks (colour comes from the brush/theme, not geometry). No chrome of its own; golden coverage is in [SN-INK-032](ink.md#sn-ink-032).

#### Test plan
packages/sane_ink/test/geometry/stroke_geometry_test.dart (closed outline, caps, nonZero fill, determinism across a zoom sweep), plus a golden of a reference stroke at three widths fed into [SN-INK-032](ink.md#sn-ink-032).

#### Dependencies
[SN-INK-003](ink.md#sn-ink-003) (filtered centreline stream).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-005

<a id="sn-ink-005"></a>

**Implement the incremental wet-layer renderer (Tier B)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Only the active (wet) stroke may repaint every frame; everything already drawn is a cached raster. This is the difference between 120 fps and jank, and it is the Tier B (pure-Flutter) wet-ink path that runs on every surface and is the only wet path on web (docs/architecture/ink-engine.md section 5; ADR-0008 Tier B). It is release-critical: it is the fallback proven by the ADR-0008 graceful-degradation test when sane_ink_surface reports unavailable, and the substrate the native surfaces ([SN-INK-006](ink.md#sn-ink-006), [SN-INK-007](ink.md#sn-ink-007), [SN-INK-008](ink.md#sn-ink-008)) composite over. This issue paints the active stroke in a CustomPainter inside a RepaintBoundary driven by a Listenable so build and layout are skipped on the draw path (docs/architecture/rendering-and-performance.md section 1.2, section 7).

#### Scope
**In:** the layer stack (page background, committed ink, wet stroke, predicted lead, overlay chrome) in sane_render; the active-stroke CustomPainter in its own RepaintBoundary with repaint driven by a ChangeNotifier/Listenable (never setState per move); reuse of Paint/Path objects across frames; the wet stroke always painted on the UI isolate.
**Out:** committing finished strokes and the wet->dry hand-off ([SN-INK-021](ink.md#sn-ink-021)), tiling/caching of the committed layer ([SN-INK-022](ink.md#sn-ink-022)), native front-buffer surfaces ([SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007)/[SN-INK-008](ink.md#sn-ink-008)), 120 Hz adaptive refresh ([SN-INK-023](ink.md#sn-ink-023)).

#### Acceptance criteria
- [ ] A pointer move repaints only the wet RepaintBoundary; DevTools repaint highlight shows committed tiles and UI chrome untouched (widget test asserts the committed painter shouldRepaint returns false during a wet stroke).
- [ ] No Paint/Path/Shader is allocated per sample; objects are created once and reused (allocation assertion in the benchmark).
- [ ] Repaint is driven by a Listenable passed as repaint:, not setState (test asserts the widget does not rebuild on pointer move).
- [ ] The wet stroke is painted on the UI isolate; no isolate hop occurs on PointerMove (verified by the jank-triage assertions).
- [ ] 60 fps floor held and no frame > 16.7 ms while writing on the Tier 1 gate device (CI proxy timeline).

#### Technical notes
Files under packages/sane_render/lib/src/wet/. Wrap the canvas in a RepaintBoundary; the CustomPainter takes repaint: activeStrokeNotifier. Impeller (mobile) / CanvasKit (web) render it; shaders compile offline under Impeller (no first-use jank). Do not enable resamplingEnabled. Consumes geometry from [SN-INK-004](ink.md#sn-ink-004). Rendering rules of thumb: docs/architecture/rendering-and-performance.md section 7.

#### Security & privacy
Wet-stroke pixels are note content; painting is local, nothing is logged from the draw loop in profile/release (overview 8.2). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor canvas (design/Sane Notes.dc.html Editor; docs/design/screens-and-flows.md section 7.2). The wet stroke must track the pen with no perceptible lag and render correctly in all 17 looks and light+dark (the stored colour resolves per theme via [SN-INK-030](ink.md#sn-ink-030)). Overlay chrome (selection, rulers, cursor) sits above ink, never flattened into it, and carries Semantics.

#### Test plan
packages/sane_render/test/wet/wet_layer_test.dart (repaint scoping, no rebuild, no per-sample allocation), app/integration_test/editor_latency_test.dart (60 fps floor, no frame > 16.7 ms), golden of a wet stroke fed into [SN-INK-032](ink.md#sn-ink-032).

#### Dependencies
[SN-INK-004](ink.md#sn-ink-004) (outline geometry to paint).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-006

<a id="sn-ink-006"></a>

**Build the iPadOS Metal low-latency wet-ink surface plugin**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, ios-phone |
| Areas | ink, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-029](ink.md#sn-ink-029), [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-CODE-4`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
iPad is the flagship surface and the reference device for the <= 16 ms pen-to-pixel budget (decision 7; docs/platform/ipad.md). Flutter's canvas cannot reach the platform's lowest inking latency by itself, so Tier A renders the wet stroke on a native Metal front-buffer (CAMetalLayer presentsWithTransaction) driven by UIUpdateLink (wantsLowLatencyEventDispatch), reading coalescedTouches + predictedTouches, composited into the Flutter scene via a Texture widget (ADR-0008 Tier A; docs/platform/ipad.md section 4). This is the product thesis on Apple hardware; if the budget cannot be met the editor pivots to native views keeping the Dart core (ADR-0001 exit criterion, decided by [SN-INK-009](ink.md#sn-ink-009)). This issue implements the Swift impl of sane_ink_surface for iOS/iPadOS behind the platform interface from [SN-INK-029](ink.md#sn-ink-029).

#### Scope
**In:** the Swift UIView subclass owning a CAMetalLayer front-buffer (presentsWithTransaction = true; commandBuffer.waitUntilScheduled() before present, verify exact call order against the current Metal sample); a UIUpdateLink render loop at preferredFrameRateRange up to 120 Hz; touchesBegan/Moved/Ended reading event.coalescedTouches(for:) and predictedTouches(for:); createSurface returning a Flutter texture id; beginStroke/extend/endStroke/dispose; clearing the wet layer on lift; the nativeSamples 240 Hz stream mirrored back to sane_ink.
**Out:** the Dart platform interface + capability query ([SN-INK-029](ink.md#sn-ink-029)), Pencil extras squeeze/roll/hover/haptics (sane_stylus / SN-PHN area), estimated-property reconciliation ([SN-INK-018](ink.md#sn-ink-018)), the commit-to-core step ([SN-INK-021](ink.md#sn-ink-021)).

#### Acceptance criteria
- [ ] createSurface returns a valid Flutter texture id; the native surface composites beneath Flutter palette/rulers/selection chrome via a Texture widget.
- [ ] Camera-rig p95 pen-to-pixel <= 16 ms on the M-series ProMotion iPad Pro reference device (docs/platform/performance-budgets.md B1); software t_sample->t_present logged alongside.
- [ ] predictedTouches segment is drawn on the wet layer only, discarded and replaced when real touches arrive; never added to the committed stroke.
- [ ] The wet->committed hand-off shows no one-frame flicker (commit-frame golden via [SN-INK-021](ink.md#sn-ink-021)).
- [ ] Graceful degradation: forcing the surface unavailable falls back to Tier B ([SN-INK-005](ink.md#sn-ink-005)) with no feature loss (ADR-0008 verify step 3).
- [ ] Method-channel payloads are shape- and length-validated before use; malformed payloads are rejected, not crashed on.

#### Technical notes
plugins/sane_ink_surface/ios (Swift). APIs: CAMetalLayer, UIUpdateLink, UIEvent.coalescedTouches/predictedTouches, Texture widget (docs/platform/ipad.md section 3 Feature->API map). Deployment target iOS 17.0. Impeller is the only iOS renderer (no Skia fallback). CodeQL covers the Swift layer (ADR-0008 security impact; ADR-0012 plugin mechanics). Prefer Pigeon-typed channels per ADR-0012.

#### Security & privacy
The method-channel payloads between the plugin and Dart are attack surface: validate shape/size, expose only ink primitives, hold no secrets (ADR-0008; ADR-0012). Ink samples are note content, never logged. IDs: MASVS-PLATFORM-1, MASVS-PLATFORM-2, MASVS-CODE-4, CWE-20.

#### UX notes
The native surface is invisible chrome-wise; it must match Tier B pixels exactly so switching tiers is imperceptible, and must render correctly in all 17 looks / dark mode (colour resolved via [SN-INK-030](ink.md#sn-ink-030)). Low latency must stay on when Reduce Motion is enabled (latency is not animation; PRD-ED-027 A11y).

#### Test plan
Camera-rig latency in tools/device_lab/results (per docs/architecture/rendering-and-performance.md section 2.1), integration_test forcing unavailable to prove Tier B fallback, plugins/sane_ink_surface/test for payload validation, commit-frame golden shared with [SN-INK-021](ink.md#sn-ink-021).

#### Dependencies
[SN-INK-029](ink.md#sn-ink-029) (plugin interface + capability query), [SN-INK-002](ink.md#sn-ink-002) (sample model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, CodeQL Swift, unit, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md (CODEOWNERS review for the native/plugin path)

---

### SN-INK-007

<a id="sn-ink-007"></a>

**Build the Android Jetpack Ink low-latency surface plugin**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone |
| Areas | ink, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-029](ink.md#sn-ink-029), [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-CODE-4`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Android is where competitors are weakest and least consistent, so the native fast path is the strategic opening (docs/platform/android.md). Tablets/phones with a low-latency stylus are Tier A: the wet stroke renders on a front buffer via Jetpack Ink InProgressStrokesView (the stable, batteries-included ~4 ms path, default) or androidx.graphics.lowlatency (GLFrontBufferedRenderer / LowLatencyCanvasView) where we render custom brushes ourselves, composited into Flutter via a Texture widget (ADR-0008; docs/platform/android.md section 3). The budget is <= 25 ms on mid-range hardware (decision 7). This issue implements the Kotlin impl of sane_ink_surface behind the interface from [SN-INK-029](ink.md#sn-ink-029).

#### Scope
**In:** the Kotlin drawing view using InProgressStrokesView (default) with a GLFrontBufferedRenderer alternative selected by capability; getHistorical* + MotionEventPredictor for coalesced+predicted samples; requestUnbufferedDispatch(motionEvent) to disable input batching; front-buffer used for small handwriting updates only (commit to the double-buffered layer for pan/zoom to avoid tearing); createSurface returning a Flutter texture id; beginStroke/extend/endStroke/dispose; the nativeSamples stream mirrored to sane_ink.
**Out:** the Dart interface + capability query ([SN-INK-029](ink.md#sn-ink-029)), palm-rejection ACTION_CANCEL/FLAG_CANCELED policy ([SN-INK-013](ink.md#sn-ink-013)), S Pen barrel/air actions (sane_stylus / SN-PHN), the commit step ([SN-INK-021](ink.md#sn-ink-021)).

#### Acceptance criteria
- [ ] createSurface returns a valid Flutter texture id composited beneath Flutter chrome via a Texture widget.
- [ ] Camera-rig p95 pen-to-pixel <= 25 ms on the mid-range stylus tablet reference (docs/platform/performance-budgets.md B2); software t_sample->t_present logged.
- [ ] Predicted samples are wet-only, discarded/replaced on real samples, never committed.
- [ ] Impeller Vulkan (API 29+) and the legacy GL fallback both render identically (golden test on both paths, docs/platform/android.md L5).
- [ ] Graceful degradation to Tier B ([SN-INK-005](ink.md#sn-ink-005)) when no native front-buffer is available (capability query, not platform check).
- [ ] Method-channel payloads validated for shape/size before use.

#### Technical notes
plugins/sane_ink_surface/android (Kotlin). APIs: androidx.ink InProgressStrokesView / Stroke / StrokeInputBatch, androidx.graphics.lowlatency GLFrontBufferedRenderer (onDrawFrontBufferedLayer/onDrawDoubleBufferedLayer, renderFrontBufferedLayer on DOWN/MOVE, commit() on UP, cancel() on CANCEL), requestUnbufferedDispatch, MotionEventPredictor (docs/platform/android.md section 5). minSdk 29. Do NOT use deprecated Jetpack Security. R8/ProGuard keep rules for plugin classes (docs/platform/android.md L6). Prefer Pigeon per ADR-0012.

#### Security & privacy
Method-channel payloads are attack surface: validate; expose only ink primitives; no secrets; CodeQL over the Kotlin layer. Ink samples are note content, never logged. IDs: MASVS-PLATFORM-1, MASVS-PLATFORM-2, MASVS-CODE-4, CWE-20.

#### UX notes
Invisible surface; must match Tier B pixels and render across all 17 looks / dark mode. Low latency stays on with Reduce Motion. Suppress edge-nav gestures while drawing (WindowInsetsControllerCompat transient bars) so a stroke near the edge is not stolen.

#### Test plan
Camera-rig latency in tools/device_lab/results, golden on Vulkan and GL paths ([SN-INK-032](ink.md#sn-ink-032)), integration_test forcing unavailable to prove Tier B, plugins/sane_ink_surface/test for payload validation.

#### Dependencies
[SN-INK-029](ink.md#sn-ink-029) (plugin interface + capability query), [SN-INK-002](ink.md#sn-ink-002) (sample model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, CodeQL Kotlin, unit, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md (CODEOWNERS review for the native/plugin path)

---

### SN-INK-008

<a id="sn-ink-008"></a>

**Implement the web desynchronized-canvas ink path**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | ink, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-029](ink.md#sn-ink-029), [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `MASVS-NETWORK-1` |
| Extra labels | agent-ready |

#### Context
Web is a first-class but most-constrained surface: Flutter Web (CanvasKit/skwasm), no Impeller, and skwasm cannot run in any iOS browser (docs/platform/web.md; ADR-0010). The lowest-latency web levers (desynchronized canvas, Ink API delegated trails, coalesced/predicted Pointer Events) are not first-class in Dart because Flutter owns its canvas, so they need JS interop against the underlying canvas (docs/platform/web.md section 3, R2). The plan: Tier B pure-Flutter ([SN-INK-005](ink.md#sn-ink-005)) is the baseline everywhere; a Chromium-only wet-ink fast path using getContext(..., {desynchronized:true}) and/or navigator.ink.requestPresenter via JS interop is an optional progressive enhancement, validated by [SN-INK-009](ink.md#sn-ink-009), and the web release is NOT blocked on it. Budget is <= 30 ms on Chrome desktop (decision 7 B3).

#### Scope
**In:** the web impl of sane_ink_surface using dart:js_interop; feature-detect desynchronized via getContextAttributes().desynchronized; a JS-interop side-canvas wet stroke on Chromium; navigator.ink DelegatedInkTrailPresenter as progressive enhancement where present; PointerEvent.getCoalescedEvents()/getPredictedEvents() via interop where Flutter does not forward them; automatic fallback to Tier B on Safari/Firefox and iOS browsers (CanvasKit only).
**Out:** the Dart interface + capability query ([SN-INK-029](ink.md#sn-ink-029)), the Tier B baseline itself ([SN-INK-005](ink.md#sn-ink-005)), COOP/COEP hosting and CSP (SN-WEB platform), on-device recognition (no ML Kit on web, SN-HWR).

#### Acceptance criteria
- [ ] Chrome desktop p95 pen-to-pixel <= 30 ms with the desynchronized/Ink-API path; the number is reported via [SN-INK-031](ink.md#sn-ink-031) and event.timeStamp -> requestAnimationFrame present timing.
- [ ] On Safari (incl. all iOS browsers) and Firefox the app silently uses the CanvasKit Tier B path with no error and no missing ink.
- [ ] Coalesced events are read only in a secure context (HTTPS); the app degrades cleanly if the API is absent (Safari < 18.2).
- [ ] The Ink-API/desynchronized enhancement is behind a capability check with a plain CanvasKit fallback (no reliance on a Tier-A-only API).
- [ ] touch-action:none on the canvas does not block user zoom; the app provides its own zoom controls (WCAG 1.4.4, PRD-ED-008 A11y).

#### Technical notes
plugins/sane_ink_surface/web (Dart + JS interop). APIs: getContext('2d'|'webgl2', {desynchronized:true}), navigator.ink.requestPresenter (Chromium/Samsung only), PointerEvent.getCoalescedEvents/getPredictedEvents (Safari 18.2+/Chromium, secure context) (docs/platform/web.md section 3). CanvasKit is the universal fallback; skwasm needs WasmGC + COOP/COEP and is never available on iOS. Record the recognition/ink-web choices in ADR-0010 if changed.

#### Security & privacy
Secure-context-only APIs (HTTPS); ink samples are note content, on-device (OPFS/IndexedDB ciphertext), never logged. JS interop must not widen the DOM attack surface; no user HTML is injected. IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-1, MASVS-NETWORK-1 (secure transport).

#### UX notes
Position web as view + light-edit + quick capture (docs/platform/web.md intro). Must be fully keyboard-operable, render across all 17 looks / dark mode, and hand-author Semantics for the canvas with OCR-backed alt-text for ink (WCAG 2.2 AA, R3). Show a fast HTML splash before the engine boots.

#### Test plan
integration_test for web (Chrome) asserting the desynchronized path and the CanvasKit fallback; a Playwright check that Safari uses CanvasKit; latency proxy via [SN-INK-031](ink.md#sn-ink-031); golden parity with Tier B in [SN-INK-032](ink.md#sn-ink-032).

#### Dependencies
[SN-INK-029](ink.md#sn-ink-029) (interface + capability query), [SN-INK-005](ink.md#sn-ink-005) (Tier B baseline).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, web integration, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0010)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-009

<a id="sn-ink-009"></a>

**SPIKE: measure pen-to-pixel latency, pure-Flutter vs native, on 3 devices**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | spike |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | ipad, android-tablet, web |
| Areas | ink, perf |
| Size | L |
| SDLC | design |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
This is the one measurement that can invalidate the whole editor stack, and the M0 risk gate for the Flutter editor surface (CLAUDE.md decision 1; ADR-0001; ADR-0008 section 6; roadmap M0 exit criteria). It measures pen-to-pixel latency of (a) the pure-Flutter Tier B canvas and (b) Flutter + a native wet-ink front-buffer (Metal on iPad, Jetpack Ink on Android) on the three reference devices, optically with a high-speed camera plus on-device software timestamps, and writes a committed pass/pivot decision. If neither tier meets the decision-7 budget on a target surface, that surface's editor pivots to native views while the Dart core (sane_ink/sane_core) is kept (the ADR-0001 exit criterion). No later milestone proceeds on an unmeasured assumption.

#### Scope
**In:** a throwaway ink surface (Tier B CustomPainter and a minimal Tier A native front-buffer) on each reference device; the camera rig and frame-counting method; on-device t_sample and t_present logging; measurement on iPad Pro ProMotion (<= 16 ms), a mid-range Android stylus tablet (<= 25 ms), and Chrome desktop web (<= 30 ms); a written decision committed under tools/device_lab/results.
**Out:** the production pipeline stages ([SN-INK-002](ink.md#sn-ink-002)..[SN-INK-005](ink.md#sn-ink-005)), the production native plugins ([SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007)/[SN-INK-008](ink.md#sn-ink-008)), the reusable latency hooks ([SN-INK-031](ink.md#sn-ink-031)) and CI proxy gate (SN-PERF area) which productionise what this spike prototypes.

#### Acceptance criteria
- [ ] Optical median + p95 pen-to-pixel reported for Tier A and Tier B on all three reference devices, with camera fps and method recorded.
- [ ] Software t_sample->t_present recorded simultaneously; the camera-minus-software gap (fixed hardware latency) is reported per device.
- [ ] A written pass/pivot decision per surface is committed to tools/device_lab/results/<device>-<os>.md with date, OS build, tier, pen model.
- [ ] The decision updates ADR-0001 and ADR-0008 status (per-platform tier decision + exit criterion recorded).
- [ ] The perf harness can produce a pen-to-pixel number on at least one reference device (roadmap M0 exit).

#### Technical notes
Rig: >= 240 fps camera (1000 fps preferred) filming pen tip + screen; latency_ms = frames_gap x (1000 / camera_fps), averaged over >= 20 strokes at varied speeds (docs/architecture/rendering-and-performance.md section 2.1). Software corroboration via SchedulerBinding/FrameTiming (Tier B) or the native present callback (Tier A). Tier A prototypes: CAMetalLayer + UIUpdateLink + coalesced/predicted (iPad); InProgressStrokesView / GLFrontBufferedRenderer + MotionEventPredictor (Android). Web uses desynchronized + Ink API where present. Optical is mandatory because software timers cannot see display + digitizer latency.

#### Security & privacy
None beyond baseline: throwaway UI, synthetic strokes, no note content persisted; nothing logged beyond timing. ID: MASVS-PRIVACY-1.

#### UX notes
Throwaway UI (PRD-01 M0 row); no design conformance required beyond a plain canvas. The written decision must state, per surface, whether Tier A, Tier B, or a native-editor pivot is chosen so downstream editor issues can proceed.

#### Test plan
Manual, human-supervised in the device lab (camera rig). Deliverable is the results markdown + ADR status updates, not automated tests. Emulators/simulators must NOT be the latency gate (docs/platform/performance-budgets.md section 3).

#### Dependencies
SN-FND-002 (monorepo scaffold to host the throwaway surface + perf harness).

#### Definition of done
- [ ] Measurements + written decision committed under tools/device_lab/results
- [ ] ADR-0001 and ADR-0008 status updated with the per-surface tier decision
- [ ] Reviewed with the Security Owner / architecture owner

---

### SN-INK-010

<a id="sn-ink-010"></a>

**Normalise pointer samples into InkSample (pressure, tilt, azimuth, timestamp)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-002](ink.md#sn-ink-002) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Capture is the only platform-aware stage; every downstream stage operates on the normalised InkSample, so pressure/tilt/azimuth conventions must be converted to one canonical representation exactly once (docs/architecture/ink-engine.md section 1.2). Device ranges differ (pressure can exceed the nominal max; iOS altitudeAngle is the inverse sense of Flutter tilt; Android AXIS_TILT is 0 = perpendicular; web has tiltX/Y and the newer altitude/azimuth), and a flipped tilt inverts every tilt-driven brush, so a single conversion table is essential (PRD-ED-021, PRD-ED-022, PRD-ED-023).

#### Scope
**In:** the normalisation stage B producing InkSample; pressure divided by pressureMax then clamped to 0..1, with pressureIsReal = false when the device reports none (USB-C Apple Pencil, most fingers, most mice) so velocity synthesis applies later; a single tilt/azimuth conversion table (sane_ink/lib/src/capture/tilt_convert.dart) mapping each platform to the InkSample convention (tilt 0 = perpendicular); twist defaulted to 0; monotonic-microsecond timestamp relative to PointerDownEvent.
**Out:** capturing the raw stream ([SN-INK-002](ink.md#sn-ink-002)), estimated-property BLE reconciliation of force/roll ([SN-INK-018](ink.md#sn-ink-018)), velocity synthesis into width ([SN-INK-019](ink.md#sn-ink-019)).

#### Acceptance criteria
- [ ] Pressure is divided by the platform pressureMax and clamped to 0..1; a value above the nominal max clamps to 1 (unit test with an Android over-1.0 sample).
- [ ] Devices reporting no pressure yield pressure = 0 and pressureIsReal = false (unit test for USB-C Pencil and finger fixtures).
- [ ] tilt_convert maps iOS altitudeAngle, Android AXIS_TILT, and web tiltX/Y (+ altitude/azimuth) to the InkSample convention (tilt 0 = perpendicular) with per-platform sign verified against a fixture.
- [ ] tMicros is monotonic and relative to PointerDownEvent; wall-clock is never used (assertion in test).
- [ ] twist defaults to 0 when unavailable.

#### Technical notes
Files: packages/sane_ink/lib/src/capture/normalise.dart, tilt_convert.dart. Per-platform ranges documented in docs/research sources (Apple UITouch.force/maximumPossibleForce; Android getPressure may exceed 1; web pressure already 0..1). Pure Dart. Verify each platform sign at the spike ([SN-INK-009](ink.md#sn-ink-009)). Implements PRD-ED-024 point fields {x,y,p,tilt,azimuth,t}.

#### Security & privacy
None beyond baseline: normalised values are note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
No chrome. A11y: users who cannot modulate pressure get identical stroke quality via the velocity model (pressureIsReal=false path), so pressure is never required for legible ink (PRD-ED-021 A11y).

#### Test plan
packages/sane_ink/test/capture/normalise_test.dart (pressure clamp, no-pressure fallback, monotonic timestamp) and tilt_convert_test.dart (per-platform sign + convention) over fixtures for each platform.

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002) (capture pipeline provides raw samples to normalise).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-011

<a id="sn-ink-011"></a>

**Capture coalesced high-frequency sub-frame samples across tiers**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-002](ink.md#sn-ink-002) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
Coalesced sub-frame samples are the biggest fidelity lever and Flutter's biggest gap: pens sample at 120-240 Hz but Flutter's PointerMoveEvent dispatch runs at 60-120 Hz, so intermediate points are dropped between frames, and Flutter surfaces no first-class per-frame coalesced array (docs/architecture/ink-engine.md section 1.1; ADR-0008; PRD-ED-025). Recovering them keeps fast strokes smooth. This task wires the recovery across both tiers: on Tier A the native surfaces capture coalesced/historical touches and feed a per-frame batch to sane_ink; on Tier B/web the pipeline consumes delivered moves plus, where reachable, PointerEvent.getCoalescedEvents() via JS interop.

#### Scope
**In:** the Dart-side ingestion of native coalesced batches (from [SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007)) into the coalesce stage; a web JS-interop shim calling getCoalescedEvents() in a secure context (Safari 18.2+/Chromium) where Flutter forwards the raw DOM event; verifying reachability through Flutter's canvas before relying on it; ordering + exact-duplicate dedupe of the merged stream.
**Out:** the native platform capture code itself ([SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007) own reading coalescedTouches/getHistorical*), prediction ([SN-INK-012](ink.md#sn-ink-012)), the base coalesce stage plumbing ([SN-INK-002](ink.md#sn-ink-002)).

#### Acceptance criteria
- [ ] A per-frame native batch of N coalesced samples is appended in order to the active stroke with no loss (replay test with a 240 Hz fixture asserts all N land).
- [ ] On web, getCoalescedEvents() is used only in a secure context and only when Flutter forwards the DOM event; absence (Safari < 18.2) degrades to delivered moves with no error.
- [ ] A fast diagonal drawn at 240 Hz is visibly smoother with coalescing on than off (golden comparison at two sample rates).
- [ ] Exact (x,y,tMicros) duplicates across the native-batch + framework-move merge are deduped once.
- [ ] Reachability of the web path is recorded (verified or fallback-only) in a code comment + the ADR-0010 note.

#### Technical notes
Tier A native capture: iOS UIEvent.coalescedTouches(for:) read inside the handler; Android MotionEvent.getHistorical* + requestUnbufferedDispatch (docs/platform/ipad.md L1, docs/platform/android.md L1). Web: dart:js_interop getCoalescedEvents() (docs/platform/web.md section 3, verify Flutter forwards it). Coalesce stage in packages/sane_ink/lib/src/capture. All coalesced points feed committed geometry (never prediction).

#### Security & privacy
Secure-context-only on web; coalesced samples are note content, on-device, never logged; validate native batch shape/length before ingest. IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-1.

#### UX notes
No chrome; the effect is smoother fast strokes. Must not add latency (coalescing is per-frame, still on the wet path). A11y: N/A (fidelity only), but never a requirement for legibility.

#### Test plan
packages/sane_ink/test/capture/coalesce_test.dart (ordering, dedupe, batch ingest), a golden smoothness comparison in [SN-INK-032](ink.md#sn-ink-032), and a web integration test asserting secure-context gating and graceful absence.

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002) (capture pipeline + coalesce stage). Native capture provided by [SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007); web interop shares [SN-INK-008](ink.md#sn-ink-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0010 web reachability note)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-012

<a id="sn-ink-012"></a>

**Generate and discard predicted lead samples for latency hiding**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-002](ink.md#sn-ink-002) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
To hide residual pen-to-pixel latency, the wet stroke is drawn slightly ahead of the last real sample using a short predicted lead, then the prediction is discarded and replaced when the next real sample arrives (docs/architecture/ink-engine.md section 1.4; PRD-ED-026). This is standard on every platform and is a load-bearing part of hitting the decision-7 budgets. The critical invariant is that predicted points touch the wet layer only and never enter the persisted stroke, the filter state, or recognition.

#### Scope
**In:** consuming the platform predictors (Apple UIEvent.predictedTouches, Android androidx.input:input-motionprediction MotionEventPredictor.predict(), web PointerEvent.getPredictedEvents()) via the native surfaces; a Dart constant-velocity + curvature extrapolator fallback for Tier B when no platform predictor is reachable; tagging predicted samples predicted = true; capping the horizon; discarding on the next real sample.
**Out:** platform predictor plumbing inside the native plugins ([SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007)), the Ink-API DelegatedInkTrailPresenter OS trail (progressive enhancement in [SN-INK-008](ink.md#sn-ink-008)), painting the predicted segment ([SN-INK-005](ink.md#sn-ink-005)).

#### Acceptance criteria
- [ ] Predicted points are tagged predicted = true, drawn on the wet layer only, and are never added to the persisted stroke, the filter state, or the recognition input (unit test asserts the committed stroke excludes predicted points).
- [ ] The horizon is capped at the smaller of the platform suggestion or ~2 display frames (16-33 ms); over-prediction whiskers on a sharp direction change do not exceed the cap (test on a corner fixture).
- [ ] On Tier A the platform predictor is preferred; on Tier B the Dart extrapolator runs, producing a <= 2-frame lead.
- [ ] When a real sample arrives, the predicted segment is discarded and replaced (no doubled points).
- [ ] Prediction never runs on the persisted stroke geometry (serialisation excludes predicted, verified via [SN-INK-027](ink.md#sn-ink-027) round-trip).

#### Technical notes
Files: packages/sane_ink/lib/src/capture/predict.dart (Dart extrapolator) + ingestion of native predicted batches. APIs per docs/architecture/ink-engine.md section 1.4 and platform docs. Extrapolate by constant-velocity + curvature extension of the filtered tail. Prefer the platform predictor on Tier A (tuned to the digitizer). Implements PRD-ED-026.

#### Security & privacy
None beyond baseline: predicted samples are transient note content, discarded, never logged or persisted. ID: MASVS-PRIVACY-1.

#### UX notes
No chrome; the effect is a lower-latency feel. Over-prediction must not cause visible whiskers overshooting on direction changes (worse than latency). A11y: latency hiding benefits everyone and must not be disabled by Reduce Motion (latency is not animation, PRD-ED-027 A11y).

#### Test plan
packages/sane_ink/test/capture/predict_test.dart (predicted excluded from committed stroke, horizon cap, discard/replace, Tier B extrapolator lead), plus a corner-overshoot golden in [SN-INK-032](ink.md#sn-ink-032).

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002) (capture pipeline provides the filtered tail to extrapolate).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-013

<a id="sn-ink-013"></a>

**Implement palm and finger rejection with pointer-cancel retraction**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Palm and finger rejection is what makes pen writing feel natural: when a stylus is active or hovering, touch contacts must not draw, they pan/zoom/gesture instead (docs/architecture/ink-engine.md section 1.1; PRD-ED-029, default on). It is a per-platform kind branch, not a heuristic-only feature, and it must be able to retract a stroke that a palm started. This honours the Settings Palm rejection toggle (default on) and interacts with the finger-draw toggle ([SN-INK-015](ink.md#sn-ink-015)) and left-handed mode ([SN-INK-016](ink.md#sn-ink-016)).

#### Scope
**In:** the kind branch (PointerDeviceKind.stylus/invertedStylus draw/erase; touch routes to pan/zoom unless finger-draw is on); Android ACTION_CANCEL / Android 13 FLAG_CANCELED handling to retract a palm-started stroke and re-render; the web pen-priority heuristic (ignore touch while a pen pointer is active/hovering; large width/height ~ palm; no native palm flag); removal + surface re-render of a cancelled palm stroke.
**Out:** the wrist-guard soft-ignore band ([SN-INK-014](ink.md#sn-ink-014)), the finger-draw setting itself ([SN-INK-015](ink.md#sn-ink-015)), native coalesced capture ([SN-INK-011](ink.md#sn-ink-011)).

#### Acceptance criteria
- [ ] With palm rejection on and a stylus active/hovering, concurrent touch contacts do not draw; they pan/zoom (widget test with mixed stylus+touch pointers).
- [ ] On Android, an ACTION_CANCEL / FLAG_CANCELED (API 33+) pointer retracts its in-progress stroke and re-renders the surface with no residual ink (regression test).
- [ ] On web (no palm flag), a touch concurrent with an active pen pointer is ignored; a large width/height contact is treated as palm.
- [ ] The Settings Palm rejection toggle (default on) is honoured; turning it off allows touch to draw when finger-draw is on.
- [ ] A palm-started-then-cancelled stroke is never persisted (verified against the op-log).

#### Technical notes
Branch on event.kind in the Listener (packages/sane_ink capture) + native cancel semantics from the plugins. iPad: UITouch.type == .pencil (PencilKit auto-rejects; our custom canvas branches). Android: drop ACTION_CANCEL / FLAG_CANCELED pointers, treat palm-sized TOOL_TYPE_FINGER as gesture (docs/platform/android.md section 3). Web: pen-priority heuristic (docs/platform/web.md section 3). Implements PRD-ED-029.

#### Security & privacy
None beyond baseline: rejected input is note-content-adjacent, discarded, never logged; validate native cancel payloads. IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-1.

#### UX notes
Surface: Editor canvas + Settings (docs/design/screens-and-flows.md section 12). With Draw with finger on and no stylus, palm rejection relaxes so finger drawing works (document the interaction, PRD-ED-029 A11y). Must not block chrome needed by screen-reader/switch users.

#### Test plan
packages/sane_ink/test/capture/palm_rejection_test.dart + app widget tests for mixed pointers; a regression test for ACTION_CANCEL retraction; a web heuristic test.

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002) (capture pipeline kind branch).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-014

<a id="sn-ink-014"></a>

**Add an optional wrist-guard hand-rest protection band**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, ios-phone, android-tablet, android-phone |
| Areas | ink, a11y, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-013](ink.md#sn-ink-013) |
| Depends on | [SN-INK-013](ink.md#sn-ink-013) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Beyond palm rejection, a resting wrist can still trigger chrome or stray touch input while writing, so an optional on-screen wrist guard suppresses accidental UI activation and touch along the handedness edge (docs/architecture/ink-engine.md section 1.1 context; PRD-ED-030, SHOULD, off by default). It follows the writing hand per left-handed mode ([SN-INK-016](ink.md#sn-ink-016)) and layers on top of palm rejection ([SN-INK-013](ink.md#sn-ink-013)).

#### Scope
**In:** a soft-ignore band along the bottom/handedness edge that suppresses touch input and UI activation from a resting wrist while a stylus is active; the band follows the writing hand (bottom-left for left-handed, bottom-right otherwise); an off-by-default Settings toggle; never blocking the stylus.
**Out:** palm rejection itself ([SN-INK-013](ink.md#sn-ink-013)), left-handed mirroring of chrome ([SN-INK-016](ink.md#sn-ink-016)), the Settings screen shell (SN-SET area, this issue only adds the toggle model).

#### Acceptance criteria
- [ ] The wrist guard is OFF by default; enabling it suppresses touch UI activation within the band while a stylus is active (widget test).
- [ ] The guard never blocks stylus input, even inside the band (test with a stylus contact in the band still drawing).
- [ ] The band side follows left-handed mode (bottom-left when leftHanded, else bottom-right).
- [ ] The guard is input-suppression only and is disabled while an assistive-touch/switch session is active (does not cover chrome screen-reader users need, PRD-ED-030 A11y).

#### Technical notes
Implement as a hit-region filter above the canvas in app/ editor chrome, driven by prefs.leftHanded and a new prefs.wristGuard. Coordinate with [SN-INK-013](ink.md#sn-ink-013) for the stylus-active signal. Pure UI/input policy; no sane_ink model change. Implements PRD-ED-030.

#### Security & privacy
None beyond baseline: no content, no logging of coordinates; the guard only suppresses input. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor canvas + Settings (docs/design/screens-and-flows.md section 7.7, section 12). Must render correctly across all 17 looks / dark mode (the band is invisible, no visual artefact). 44 pt / 48 dp targets outside the band remain reachable. Disabled during assistive sessions.

#### Test plan
app/test/editor/wrist_guard_test.dart (off by default, stylus passes, touch UI suppressed, handedness side, assistive-session disable).

#### Dependencies
[SN-INK-013](ink.md#sn-ink-013) (palm rejection + stylus-active signal).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-015

<a id="sn-ink-015"></a>

**Implement the finger-draw toggle**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-013](ink.md#sn-ink-013) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Draw with finger (default off) decides whether finger contacts draw with the active tool or only scroll/pinch/gesture; a stylus is required to ink when it is off (docs/architecture/ink-engine.md section 1.1; PRD-ED-031). Users without a stylus must be first-class: finger drawing quality equals pen quality (minus pressure/tilt, substituted by the velocity model). This interacts with palm rejection ([SN-INK-013](ink.md#sn-ink-013)) and the velocity-based width mapping ([SN-INK-019](ink.md#sn-ink-019)).

#### Scope
**In:** the Settings Draw with finger toggle (default off) and its capture-side effect (off => fingers only scroll/pinch/gesture; on => finger contacts draw with the active tool); the platform branch (iPad PencilKit drawingPolicy / UITouch.type; Android tool-type; web pointerType); always-enabled finger/mouse drawing on finger-only devices (most phones, trackpad web) regardless of the toggle.
**Out:** palm rejection ([SN-INK-013](ink.md#sn-ink-013)), the velocity->width synthesis ([SN-INK-019](ink.md#sn-ink-019)), the Settings screen shell (SN-SET, this adds the toggle model).

#### Acceptance criteria
- [ ] Toggle default off: a finger contact does not draw and instead pans/pinches (widget test).
- [ ] Toggle on: a finger contact draws with the active tool at pen-equivalent quality (velocity substitutes for pressure).
- [ ] On a finger-only device (no stylus attached), finger/mouse drawing is always enabled regardless of the toggle.
- [ ] The setting persists per profile (round-trip through prefs).
- [ ] With the toggle on and no stylus, palm rejection relaxes so finger drawing works (interaction documented, PRD-ED-029/031).

#### Technical notes
prefs.fingerDraw drives the capture kind branch in [SN-INK-013](ink.md#sn-ink-013). Platform hooks: PencilKit drawingPolicy / UITouch.type (iPad), tool-type branch (Android), pointerType branch (web) (docs/platform/*.md). No sane_ink model change beyond honouring the flag. Implements PRD-ED-031.

#### Security & privacy
None beyond baseline: no content leaves the device, no coordinate logging. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Settings (docs/design/screens-and-flows.md section 12). Users without a stylus are first-class (PRD-ED-031 A11y); the toggle label is text, keyboard-reachable, and announces state. Must work identically across all surfaces.

#### Test plan
app/test/editor/finger_draw_test.dart (off/on behaviour, finger-only always-on, per-profile persistence, palm-rejection relax interaction).

#### Dependencies
[SN-INK-013](ink.md#sn-ink-013) (capture kind branch this toggle controls).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-016

<a id="sn-ink-016"></a>

**Implement left-handed mode for the ink surface and chrome**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Left-handed mode (default off) flips the editor to row-reverse so the page rail moves to the left, the palette dock default/handedness mirrors, and the wrist guard follows the left hand (docs/architecture/ink-engine.md section 1.1; PRD-ED-032). It is essential for left-handed writers, who otherwise rest their hand over the dock. This issue owns the ink-surface and layout mirroring; the palette dock chrome is coordinated with SN-ED-005 and the wrist guard with [SN-INK-014](ink.md#sn-ink-014).

#### Scope
**In:** the Settings Left-handed mode toggle (default off, persists per profile); editor row set to row-reverse so the page rail sits on the left; a leftHanded signal exposed to the dock, wrist guard, and any handedness-sensitive gesture; ensuring the visual mirror does not reorder logical reading/focus order for screen readers.
**Out:** the palette dock component itself (SN-ED-005 palette dock), the wrist guard band ([SN-INK-014](ink.md#sn-ink-014)), the Settings shell (SN-SET).

#### Acceptance criteria
- [ ] Toggle default off; enabling it flips the editor to row-reverse and moves the page rail to the left (widget test asserting layout order).
- [ ] The palette dock default side and the wrist-guard band both follow the left hand when enabled.
- [ ] The visual mirror preserves logical reading/focus order for screen readers (semantic order unchanged; a11y test asserts focus traversal is unchanged).
- [ ] The setting persists per profile (round-trip through prefs).

#### Technical notes
prefs.leftHanded drives a Directionality/row-reverse layout in app/ editor chrome and is read by the dock (SN-ED-005) and wrist guard ([SN-INK-014](ink.md#sn-ink-014)). Keep it a visual mirror, not a semantic reorder (docs/architecture/ink-engine.md section 8.3 selection-handle a11y principle applies). Implements PRD-ED-032.

#### Security & privacy
None beyond baseline: layout preference only, no content. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor + Settings (docs/design/screens-and-flows.md section 7.7, section 12). Must render across all 17 looks / dark mode; targets stay >= 44 pt / 48 dp after mirroring. Mirroring must not break RTL locale handling (compose with i18n direction).

#### Test plan
app/test/editor/left_handed_test.dart (layout flip, dock + wrist-guard side, per-profile persistence) and an a11y test asserting focus order is unchanged.

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet-layer renderer / editor surface to mirror). Coordinates with SN-ED-005 (palette dock).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, widget, a11y, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-017

<a id="sn-ink-017"></a>

**Map a 0-100 stabilisation slider to filter parameters and presets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink, settings |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-003](ink.md#sn-ink-003) |
| Depends on | [SN-INK-003](ink.md#sn-ink-003) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Stabilisation must be exposed as a single Smoothing slider 0-100 per pen preset that interpolates the underlying 1-euro + streamline parameters, so users tune feel without understanding the math (docs/architecture/ink-engine.md section 2.2; PRD-ED-028). The doc mandates preset guidance for fineliner, fountain/brush pen, and a handwriting default. The parameters live in sane_brushes presets (SN-BRS-002); this task builds the mapping and wires it to the filter from [SN-INK-003](ink.md#sn-ink-003).

#### Scope
**In:** a pure mapping from a 0-100 slider to {minCutoff, beta, dCutoff, streamline}; the three documented presets (fineliner minCutoff 1.5 beta 0.01 streamline 0.3; fountain/brush pen minCutoff 0.8 beta 0.007 streamline 0.6; handwriting default minCutoff 1.0 beta 0.007 streamline 0.5); reading the values from the pen preset stabilise block; a default per-pen smoothing of ~45 percent.
**Out:** the filter implementation ([SN-INK-003](ink.md#sn-ink-003)), the brush preset schema/serialisation (SN-BRS-002), the Settings/brush-studio UI widgets (SN-BRS / SN-SET).

#### Acceptance criteria
- [ ] Slider 0 maps to minimal smoothing (crisp, minimal lag) and 100 to maximum smoothing, monotonically, within the documented parameter ranges (minCutoff 0.3-3.0, beta 0.0-0.05).
- [ ] The three named presets resolve to the documented parameter tuples (unit test per preset).
- [ ] The default per-pen smoothing is ~45 percent (fixture assertion).
- [ ] The mapping is pure and deterministic (same slider value yields the same params).

#### Technical notes
File: packages/sane_ink/lib/src/filter/stabilise_mapping.dart, reading the stabilise block of the pen preset defined in sane_brushes (SN-BRS-002). Interpolate the three 1-euro params + streamline. Pure Dart. Implements PRD-ED-028 single-slider requirement and docs/architecture/ink-engine.md section 2.2 preset guidance.

#### Security & privacy
None beyond baseline: parameter data only, no content, no logging. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: brush studio / dock Smoothing control (docs/design/screens-and-flows.md; PRD-ED-028). The slider has a numeric readout and is keyboard-adjustable (a11y). The Steady hand tremor mode ([SN-INK-003](ink.md#sn-ink-003)) is a separate app-wide accessibility control, not this per-pen slider.

#### Test plan
packages/sane_ink/test/filter/stabilise_mapping_test.dart (monotonicity, range clamps, three presets, default 45 percent).

#### Dependencies
[SN-INK-003](ink.md#sn-ink-003) (the filter these parameters drive). Reads preset schema from SN-BRS-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-018

<a id="sn-ink-018"></a>

**Reconcile estimated pressure and roll from Bluetooth updates**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, ios-phone |
| Areas | ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-002](ink.md#sn-ink-002) |
| Depends on | [SN-INK-010](ink.md#sn-ink-010) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
On Apple, force and rollAngle arrive first as digitizer estimates and are corrected over Bluetooth; if the corrected value is not applied, pressure/roll on fast strokes is subtly wrong (docs/architecture/ink-engine.md section 2.5; docs/platform/ipad.md section 4; PRD-ED-023). The reconciliation patches the affected InkSamples matched by estimationUpdateIndex before the stroke is finalised, and re-runs geometry for the affected span if the stroke already dried. sane_stylus owns the native callback; this task owns the Dart-side patching into the sample buffer normalised by [SN-INK-010](ink.md#sn-ink-010).

#### Scope
**In:** consuming touchesEstimatedPropertiesUpdated corrections (force; roll where Pencil Pro present) keyed by estimationUpdateIndex; patching the stored InkSamples before finalisation; triggering a re-tessellation of the affected span if already committed; the Dart data path for corrections streamed from the plugin.
**Out:** the native touchesEstimatedPropertiesUpdated implementation (sane_stylus / SN-PHN), full barrel-roll brush orientation (Pencil Pro, M5 stylus mastery), normalisation itself ([SN-INK-010](ink.md#sn-ink-010)).

#### Acceptance criteria
- [ ] A correction keyed by estimationUpdateIndex patches the matching InkSample's force (and roll where available) before the stroke is finalised (unit test with an estimate-then-correction fixture).
- [ ] If the stroke already dried, the affected span is re-tessellated and re-rasterised (test asserts the tile is invalidated for the patched span).
- [ ] A correction arriving after finalisation is applied without corrupting neighbouring samples.
- [ ] Roll reconciliation is a no-op on non-Pencil-Pro devices (graceful, capability-gated).

#### Technical notes
File: packages/sane_ink/lib/src/capture/estimated_reconcile.dart, consuming EstimatedUpdate from sane_stylus (docs/platform/ipad.md section 6 sketch: Stream<EstimatedUpdate> estimatedUpdates by updateIndex). Patch the StrokeBuilder buffer; if dried, mark the span dirty for [SN-INK-022](ink.md#sn-ink-022). Apple UITouch estimatedProperties + touchesEstimatedPropertiesUpdated. Implements PRD-ED-023 reconciliation. Roll-driven brush orientation defers to M5 stylus work.

#### Security & privacy
None beyond baseline: corrected force/roll are note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
No chrome; the effect is correct pressure/roll on fast strokes. Must not stall the frame (reconciliation runs off the wet hot path; docs/platform/performance-budgets.md section 4 iPad note). Orientation-driven effects have non-orientation fallbacks (PRD-ED-023 A11y).

#### Test plan
packages/sane_ink/test/capture/estimated_reconcile_test.dart (index-matched patch before/after finalisation, dried-span re-tessellation, non-Pro no-op).

#### Dependencies
[SN-INK-010](ink.md#sn-ink-010) (normalised samples to patch). Native corrections from sane_stylus (SN-PHN area).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-019

<a id="sn-ink-019"></a>

**Map pressure/tilt/velocity to width and opacity via response curves**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink, brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-004](ink.md#sn-ink-004) |
| Depends on | [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
Every visual property must be bindable to an input source through an editable response curve, not a scalar: this is the single most important lesson from Procreate's engine and the basis of the fountain-pen, tilt-shaded pencil, and velocity-based looks (docs/architecture/ink-engine.md section 3.3; PRD-ED-021/022/046). width_i = clamp(size x f_size(source_i), minWidth, maxWidth) and alpha_i = clamp(baseAlpha x f_alpha(source_i), 0, 1), where source_i is pressure (when pressureIsReal), velocity (fast = thin, works with no pressure hardware, the default when pressureIsReal is false), or tilt (pencil shading). Tilt-to-shade is a headline differentiator.

#### Scope
**In:** the piecewise-cubic response-curve evaluator (up to 4 editable nodes) for f_size and f_alpha; the source selector (pressure/velocity/tilt) including velocity computed as speed_i = |delta position| / delta t normalised against a per-pen speedRange; the app-wide pressure-sensitivity curve that pre-multiplies every pen's curve; min/max width and alpha clamps applied to the sidebar sliders.
**Out:** the outline geometry that consumes the per-sample width ([SN-INK-004](ink.md#sn-ink-004)), taper ([SN-INK-020](ink.md#sn-ink-020)), the brush preset schema that stores the curves (SN-BRS-002), the curve-editing UI (brush studio, SN-BRS).

#### Acceptance criteria
- [ ] With pressureIsReal true, width follows f_size(pressure); with pressureIsReal false, source defaults to velocity (fast = thin, slow = thick) so a no-pressure device still produces a fountain-pen look (unit tests for both).
- [ ] Tilt source widens and softens the mark as tilt increases (graphite shading) per an editable tiltWidth curve.
- [ ] Response curves are piecewise-cubic with up to 4 nodes; the app-wide pressure-sensitivity curve pre-multiplies each pen's curve (composition test).
- [ ] minWidth/maxWidth and minAlpha/maxAlpha clamp the outputs so a preset cannot be pushed to uselessness (clamp test).
- [ ] Velocity normalisation uses per-point delta from the monotonic tMicros (no wall-clock).

#### Technical notes
Files: packages/sane_ink/lib/src/dynamics/response_curve.dart and width_opacity_map.dart, consuming curves from the pen preset dynamics block (SN-BRS-002) and feeding per-sample width/alpha into [SN-INK-004](ink.md#sn-ink-004). Pure Dart. Implements docs/architecture/ink-engine.md section 3.3 and PRD-ED-046 Input curves + Clamps. Differentiator: tilt->shading and velocity->width (docs/research procreate + apple-pencil sources).

#### Security & privacy
None beyond baseline: curves and outputs are note content / preset data, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: brush studio graphs (docs/design; PRD-ED-046). A soft nib and a firm nib are just two curves. A11y: users who cannot modulate pressure get identical stroke quality via the velocity path; every visual property has a non-pressure fallback (PRD-ED-021 A11y).

#### Test plan
packages/sane_ink/test/dynamics/response_curve_test.dart (4-node cubic eval, app-wide pre-multiply, clamps) and width_opacity_map_test.dart (pressure/velocity/tilt sources, velocity from tMicros), golden of a velocity-width fountain stroke in [SN-INK-032](ink.md#sn-ink-032).

#### Dependencies
[SN-INK-004](ink.md#sn-ink-004) (outline geometry consumes per-sample width/alpha). Reads curves from SN-BRS-002.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-020

<a id="sn-ink-020"></a>

**Implement dynamic and end-taper for stroke outlines**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink, brushes |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-004](ink.md#sn-ink-004) |
| Depends on | [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Taper is the thin-thick-thin envelope along a stroke and is what makes ticks, checkmarks and handwriting feel intentional (docs/architecture/ink-engine.md section 3.2; PRD-ED-046 Taper group). There are two independent contributions: dynamic taper from pressure/velocity (the per-sample width from [SN-INK-019](ink.md#sn-ink-019)) and a fixed end taper (a ramp over the first/last N px, applied even when pressure is real, so strokes do not start/end with a blunt dot). Taper is stored in the pen preset, not the stroke, so re-tessellation after a settings change is deterministic.

#### Scope
**In:** the end-taper ramp (separate start and end amounts) applied over the first/last N px; a pressure-driven option and a fixed fallback so non-pressure styluses and fingers still taper; wiring taper into the outline geometry; reading taper from the pen preset.
**Out:** dynamic width from dynamics ([SN-INK-019](ink.md#sn-ink-019)), the outline model ([SN-INK-004](ink.md#sn-ink-004)), the preset schema (SN-BRS-002).

#### Acceptance criteria
- [ ] End taper ramps width over the first/last N px with separate start/end amounts (unit test on a short fixture stroke).
- [ ] With a pressure-driven pen, dynamic taper and end taper compose without double-tapering the ends beyond width 0.
- [ ] On a no-pressure input, the fixed fallback still tapers the ends (test with pressureIsReal false).
- [ ] Taper is read from the pen preset, not the stroke; changing the preset re-tessellates deterministically (same input yields the same outline).

#### Technical notes
File: packages/sane_ink/lib/src/geometry/taper.dart, composed into the outline in [SN-INK-004](ink.md#sn-ink-004) and mapped onto perfect_freehand taperStart/taperEnd + capStart/capEnd. Store taper in the pen preset taper block (SN-BRS-002: start, end, pressure, fixedFallback). Pure Dart. Implements docs/architecture/ink-engine.md section 3.2.

#### Security & privacy
None beyond baseline: taper params and outputs are preset/note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: brush studio taper controls (PRD-ED-046). Taper must look intentional on ticks/checkmarks and render across all 17 looks / dark mode. A11y: taper is visual only; no dependency on pressure hardware (fixed fallback).

#### Test plan
packages/sane_ink/test/geometry/taper_test.dart (start/end ramps, pressure vs fixed fallback, determinism on preset change), golden of a tapered tick in [SN-INK-032](ink.md#sn-ink-032).

#### Dependencies
[SN-INK-004](ink.md#sn-ink-004) (outline geometry). Composes with [SN-INK-019](ink.md#sn-ink-019) (dynamic width).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-021

<a id="sn-ink-021"></a>

**Commit finished strokes to sane_core with seamless wet-to-dry hand-off**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-005](ink.md#sn-ink-005) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
On pointer-up the stroke must be finalised and handed from the wet surface to the committed tile in the same frame, or a one-frame flicker appears at the transition (the classic Tier A bug) (docs/architecture/ink-engine.md section 5.2). The commit path: finalise samples (reconcile estimates [SN-INK-018](ink.md#sn-ink-018), drop predicted [SN-INK-012](ink.md#sn-ink-012)) -> decimate + serialise ([SN-INK-027](ink.md#sn-ink-027)) -> create the sane_core Stroke object (add-wins id, LWW props, HLC) -> rasterise into its tile(s) ([SN-INK-022](ink.md#sn-ink-022)) -> clear the wet surface. This is where the ink engine meets the CRDT document model (SN-CORE-002).

#### Scope
**In:** the pointer-up finalise sequence; creating the Stroke CRDT object via the sane_core repository (add-wins object id, LWW registers, per-object HLC); rasterising the finished stroke into its committed tile before clearing the wet layer (same frame); clearing the native front-buffer (Tier A) or the active-stroke notifier (Tier B); handing serialisation and persistence off the UI isolate.
**Out:** the serialisation encoding itself ([SN-INK-027](ink.md#sn-ink-027)), tile management ([SN-INK-022](ink.md#sn-ink-022)), the document model entities (SN-CORE-002), storage persistence (SN-CORE-004).

#### Acceptance criteria
- [ ] On pointer-up a Stroke object is created with an add-wins id, LWW props, and an HLC stamp via the sane_core repository (unit test with a fake repository).
- [ ] The finished stroke is rasterised into its tile before the wet layer is cleared, in the same frame; a commit-frame golden shows no flicker at the transition (docs/architecture/ink-engine.md section 5.2; ADR-0008 verify note).
- [ ] Predicted points are dropped and estimated properties reconciled before finalisation.
- [ ] Serialisation/persistence run off the UI isolate; no isolate hop occurs on the wet path (assertion).
- [ ] Write -> close -> reopen preserves the stroke byte-for-byte (round-trip integration test, roadmap M1 exit).

#### Technical notes
Files: packages/sane_render commit path + packages/sane_ink finalise. Uses the sane_core repository interfaces and Stroke entity (SN-CORE-002; overview section 3 step 4). Decimate + serialise via [SN-INK-027](ink.md#sn-ink-027) on the storage isolate. Rasterise into tiles via [SN-INK-022](ink.md#sn-ink-022). Implements docs/architecture/ink-engine.md section 5.2/5.3 threading (wet on UI isolate; tessellation of finished strokes MAY move to Isolate.run under load).

#### Security & privacy
Strokes are note content: persisted locally (drift/SQLite + content-addressed blob store), E2E-encrypted before any sync (decision 3), never logged. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: Editor canvas (docs/design/screens-and-flows.md section 7). The hand-off must be imperceptible in all 17 looks / dark mode; the commit-frame golden guards it. No new chrome. A11y: committed strokes gain OCR-backed alt-text via the recognition engine (SN-HWR).

#### Test plan
packages/sane_render/test/commit/commit_test.dart (Stroke creation, same-frame rasterise-before-clear, off-isolate persistence), the commit-frame flicker golden in [SN-INK-032](ink.md#sn-ink-032), and app/integration_test/stroke_roundtrip_test.dart (byte-for-byte reopen).

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet renderer), SN-CORE-002 (document model Stroke entity). Uses [SN-INK-027](ink.md#sn-ink-027) (serialise) and [SN-INK-022](ink.md#sn-ink-022) (tiles).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, integration, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-022

<a id="sn-ink-022"></a>

**Implement tiling and LRU raster caching for large pages**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-INK-005](ink.md#sn-ink-005) |
| Depends on | [SN-INK-021](ink.md#sn-ink-021) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
A page can hold thousands of strokes and be an infinite canvas or part of a 1,000-page notebook; the engine cannot repaint every dried stroke each frame nor hold one giant bitmap, so committed ink is a tiled raster cache (docs/architecture/ink-engine.md section 6; docs/architecture/rendering-and-performance.md section 3). Only invalidated tiles re-raster; resident tiles are an LRU cache bounded by a memory budget. This is what keeps the 60 fps floor and the < 300 MB memory ceiling on a 4 GB Android (decision 7 B4/B9).

#### Scope
**In:** fixed 256x256 logical-px tiles in page space; per-tile rasterised Image cache of the committed ink at device pixel ratio; zoom buckets (cache at the nearest power-of-two scale; re-raster on bucket change, not per pinch delta; draw the last bucket scaled during an active pinch); dirty-tile invalidation on commit/erase/move (only touched tiles re-raster) with a per-tile content hash; an LRU cache bounded by a per-device budget (default <= 96 MB on 4 GB Android) evicting least-recently-visible tiles; a viewport + one-tile-ring residency for scroll; integer (col,row) addressing for infinite canvas.
**Out:** the spatial index that answers which strokes intersect a tile ([SN-INK-024](ink.md#sn-ink-024)), PDF page-bitmap tiling (SN-PDF), the wet renderer ([SN-INK-005](ink.md#sn-ink-005)).

#### Acceptance criteria
- [ ] Committing/erasing/moving a stroke marks only the tiles its bbox touches dirty; unrelated tiles do not re-raster (test asserts dirty set).
- [ ] Zoom re-rasters on power-of-two bucket change, not per pinch delta; during an active pinch the last bucket is drawn scaled (test asserts no re-raster mid-gesture).
- [ ] The tile LRU is bounded (default <= 96 MB on 4 GB Android) and evicts least-recently-visible tiles; evicted tiles re-raster from vector strokes on demand.
- [ ] Only the viewport + one-tile-ring is resident; off-screen tiles are not held for the whole document.
- [ ] Sustained-write of 10,000 strokes keeps RSS under the < 300 MB budget on the low-end reference (docs/architecture/rendering-and-performance.md section 3 leak gate).

#### Technical notes
Files under packages/sane_render/lib/src/tiles/. Tile size 256x256 tuned per device at the spike ([SN-INK-009](ink.md#sn-ink-009)). Two-resolution scheme mirrors the PDF strategy (docs/architecture/rendering-and-performance.md section 5). Infinite canvas addressed by integer (col,row) with no fixed bounds; cap logical bounds at a documented max (PRD-ED-002 verify 100,000x100,000) to prevent a crafted-file DoS. LRU budget from docs/architecture/rendering-and-performance.md section 3.

#### Security & privacy
Tile rasters are note content, on-device, never logged. Cap logical canvas bounds and tile memory before allocation to prevent a decompression/oversize DoS from a crafted .sanenote (CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
Surface: Editor canvas / infinite canvas (docs/design/screens-and-flows.md section 7.2). During pinch the last bucket may look slightly soft, sharpening when the gesture settles (acceptable, documented). Must render correctly in all 17 looks / dark mode. No new chrome.

#### Test plan
packages/sane_render/test/tiles/tile_cache_test.dart (dirty-set scoping, zoom-bucket re-raster, LRU eviction, residency ring), and app/integration_test/memory_soak_test.dart (10,000-stroke RSS budget; 50-notebook open/close returns to baseline).

#### Dependencies
[SN-INK-021](ink.md#sn-ink-021) (commit path rasterises finished strokes into tiles).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, memory-soak, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-023

<a id="sn-ink-023"></a>

**Handle 120 Hz and adaptive refresh on the draw path**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, perf |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-005](ink.md#sn-ink-005) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Where the display allows, ink must run at 120 fps (ProMotion iPad, high-refresh Android), with a 60 fps floor everywhere, and no frame > 16.7 ms while writing (decision 7 B4/B5; docs/platform/performance-budgets.md). At 120 Hz the whole pipeline has only 8.3 ms per frame, so the draw path must request the high frame-rate range where present and must not force 120 Hz when idle (battery, B10). This task wires adaptive refresh into the wet renderer and native surfaces.

#### Scope
**In:** requesting the high frame-rate range on Tier A (iPad UIUpdateLink preferredFrameRateRange up to 120 Hz; Android high-refresh) and letting the display drive Tier B; ensuring the per-frame budget math (8.3 ms at 120 Hz, 16.7 ms at 60 Hz) is respected on the wet path; not forcing 120 Hz when idle (respect adaptive/ProMotion); a fallback to 60 fps floor on non-high-refresh panels.
**Out:** the native surface implementations themselves ([SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007)), the CI perf gate that enforces fps (SN-PERF-003), the wet renderer ([SN-INK-005](ink.md#sn-ink-005)).

#### Acceptance criteria
- [ ] On a 120 Hz panel the wet stroke sustains 120 fps during a scripted write; on a 60 Hz panel it holds the 60 fps floor (timeline test).
- [ ] No frame exceeds 16.7 ms while writing on any Tier 1 device (jank gate).
- [ ] The app does not force 120 Hz when idle (adaptive refresh respected; verified via the frame-rate range setting).
- [ ] The 8.3 ms per-frame budget is not exceeded on the wet path at 120 Hz (build+layout aim <= 1 ms, active-stroke paint a few ms).

#### Technical notes
Hook preferredFrameRateRange on the iPad UIUpdateLink loop ([SN-INK-006](ink.md#sn-ink-006)) and the Android high-refresh path ([SN-INK-007](ink.md#sn-ink-007)); Tier B relies on the engine's vsync. Budget math per docs/architecture/rendering-and-performance.md section 1.2. Respect ProMotion adaptive refresh to protect battery (docs/platform/performance-budgets.md section 5 point 6). Web is display-dependent (docs/platform/web.md).

#### Security & privacy
None beyond baseline: timing/refresh only, no content. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor canvas. 120 fps ink must feel identical across all 17 looks / dark mode. A11y: high refresh is not animation; do not disable it under Reduce Motion (latency/refresh != animation, PRD-ED-027 A11y).

#### Test plan
app/integration_test/refresh_rate_test.dart (120 fps on high-refresh, 60 fps floor, no frame > 16.7 ms, no forced-120-when-idle) via the FrameTiming stream.

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet renderer). Coordinates with [SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007) for the native frame-rate range.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-024

<a id="sn-ink-024"></a>

**Build the per-page R-tree spatial index**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Erase, select, tap-a-stroke, and which strokes are in this tile/viewport all need fast spatial queries over potentially tens of thousands of strokes per page, so the engine maintains an in-memory R-tree per page keyed by each object's axis-aligned bounding box (docs/architecture/ink-engine.md section 7.1). It answers point queries (tap, eraser tip), rect queries (viewport, tile, marquee), and stroke queries (lasso, line-eraser path) as the broad phase for hit-testing ([SN-INK-025](ink.md#sn-ink-025)) and tile residency ([SN-INK-022](ink.md#sn-ink-022)).

#### Scope
**In:** an R-tree in sane_ink keyed by AABB in page space; bulk-load with STR (Sort-Tile-Recursive) packing on first page load; incremental insert/delete as strokes are added/erased; point, rect, and stroke-AABB queries returning candidate sets; a dirty-ratio trigger to re-pack when the tree degrades after many deletes.
**Out:** narrow-phase refinement (segment/point distance, point-in-polygon) which is [SN-INK-025](ink.md#sn-ink-025)/[SN-INK-026](ink.md#sn-ink-026), the tile cache ([SN-INK-022](ink.md#sn-ink-022)), the document model AABB source (SN-CORE-002).

#### Acceptance criteria
- [ ] A point query returns all candidates whose AABB contains the point; a rect query returns all whose AABB intersects the rect; a stroke query returns all whose AABB intersects the query path's AABB (unit tests with a 10,000-stroke fixture).
- [ ] STR bulk-load builds the tree in O(n log n); incremental insert/delete keeps queries correct.
- [ ] A re-pack fires when the dirty ratio exceeds a threshold after many deletes (test asserts re-pack + unchanged query results).
- [ ] Queries over a 10,000-stroke page return in well under one frame budget (benchmark).
- [ ] Index memory is bounded relative to stroke count (no unbounded growth on repeated insert/delete cycles).

#### Technical notes
File: packages/sane_ink/lib/src/index/rtree.dart (or a Rust core later, ADR-0001). AABB comes from the Stroke bbox cached by the document model (SN-CORE-002; docs/architecture/ink-engine.md section 10.1 bbox float32[4]). Android androidx.ink.geometry PartitionedMesh MAY back Tier A hit-testing later. Pure Dart. Implements docs/architecture/ink-engine.md section 7.1.

#### Security & privacy
None beyond baseline: AABBs are note content, on-device, never logged. Bound index memory to prevent a crafted-file resource-exhaustion (CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
No chrome; enables responsive erase/select. Must not add latency to the wet path (queries run on demand for tools, not per sample). A11y: N/A (data structure); selection results carry Semantics via the editor.

#### Test plan
packages/sane_ink/test/index/rtree_test.dart (point/rect/stroke queries, STR bulk-load, incremental insert/delete, re-pack on dirty ratio) and a benchmark over a 10,000-stroke page.

#### Dependencies
SN-CORE-002 (Stroke entity + cached bbox).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, benchmark, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-025

<a id="sn-ink-025"></a>

**Implement hit-testing with broad- and narrow-phase refinement**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-024](ink.md#sn-ink-024) |
| Depends on | [SN-INK-024](ink.md#sn-ink-024), [SN-INK-026](ink.md#sn-ink-026) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
AABB is only the broad phase; tap, point-eraser and stroke-eraser need a narrow phase that refines R-tree candidates against real geometry (docs/architecture/ink-engine.md section 7.2). This is what makes the stroke eraser (PRD-ED-071, M1) accurate and tap-to-select reliable even for thin lines at low zoom. It consumes the R-tree ([SN-INK-024](ink.md#sn-ink-024)) for candidates and the geometry utilities ([SN-INK-026](ink.md#sn-ink-026)) for distances.

#### Scope
**In:** the narrow-phase refinement for tap/point-eraser (distance from the point to the stroke centreline <= stroke halfWidth + tolerance, tolerance scaling with zoom) and stroke/vector-eraser (does the eraser path come within eraseRadius of any stroke segment, segment-segment distance); the query API used by the editor's eraser and tap-select tools; vector-erase whole-stroke deletion (pixel erase is a separate, later mode).
**Out:** the R-tree broad phase ([SN-INK-024](ink.md#sn-ink-024)), the polygon/segment math primitives ([SN-INK-026](ink.md#sn-ink-026)), lasso selection policy ([SN-INK-026](ink.md#sn-ink-026) provides point-in-polygon; the lasso UI is SN-ED-004), pixel/area eraser (PRD-ED-072, M3).

#### Acceptance criteria
- [ ] A tap within (halfWidth + tolerance) of a stroke centreline selects it; tolerance scales with zoom so a thin line at low zoom is still tappable (unit test across a zoom sweep).
- [ ] A vector-eraser path within eraseRadius of a stroke segment deletes the whole stroke; strokes outside eraseRadius are untouched (segment-segment distance test).
- [ ] Broad phase (R-tree) is always run first; narrow phase only refines candidates (no full-page scan; assertion on candidate count).
- [ ] Queries over a dense 10,000-stroke page complete in well under one frame budget (benchmark).
- [ ] Erase produces a CRDT tombstone recoverable via Undo (integration with the op-log; PRD-ED-071 Sec).

#### Technical notes
File: packages/sane_ink/lib/src/index/hit_test.dart, using [SN-INK-024](ink.md#sn-ink-024) for candidates and [SN-INK-026](ink.md#sn-ink-026) for point-to-segment and segment-to-segment distance. Tolerance scales with the current zoom transform. Vector eraser first; pixel eraser (per-stroke mask) is deferred. Android androidx.ink.geometry MAY back Tier A hit-testing later. Implements docs/architecture/ink-engine.md section 7.2 and PRD-ED-071.

#### Security & privacy
None beyond baseline: geometry is note content, on-device, never logged; erase is a tombstone, recoverable until convergence (no residual plaintext beyond retention). ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor eraser + tap-select (docs/design/screens-and-flows.md section 7 tool table). The eraser announces erased N strokes for screen readers; eraser size is selectable and works with larger radii for users without precise motor control (PRD-ED-071/072 A11y).

#### Test plan
packages/sane_ink/test/index/hit_test_test.dart (tap tolerance across zoom, vector-erase segment distance, broad-then-narrow phasing) and a dense-page benchmark.

#### Dependencies
[SN-INK-024](ink.md#sn-ink-024) (R-tree broad phase), [SN-INK-026](ink.md#sn-ink-026) (segment/point distance).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, benchmark, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-026

<a id="sn-ink-026"></a>

**Add polygon and segment geometry utilities (RDP, point-in-polygon)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-024](ink.md#sn-ink-024) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Narrow-phase hit-testing ([SN-INK-025](ink.md#sn-ink-025)), lasso selection (docs/architecture/ink-engine.md section 8) and shape recognition (section 9) all share a small set of pure geometry primitives, so they live in one place in sane_ink and are unit-tested for the tricky cases (concave and self-intersecting loops). This task provides RDP simplification, point-in-polygon, and segment-distance helpers used across the engine.

#### Scope
**In:** Ramer-Douglas-Peucker (RDP) polyline decimation with a tolerance epsilon; point-in-polygon via even-odd ray-casting and a winding-number variant (prefer winding for correctness on figure-eight loops); point-to-segment and segment-to-segment distance; polygon closing (connect last point to first) and RDP simplify of a lasso loop before geometry tests.
**Out:** the lasso capture/selection policy and transform (SN-ED-004 lasso; the engine only provides the math), the R-tree ([SN-INK-024](ink.md#sn-ink-024)), hit-testing wiring ([SN-INK-025](ink.md#sn-ink-025)), shape recognition classify/fit (SN-SHP area).

#### Acceptance criteria
- [ ] RDP with epsilon ~2 px reduces a noisy polyline while preserving corners beyond epsilon (unit test on a fixture; count reduction asserted).
- [ ] Point-in-polygon (ray-casting) returns correct inside/outside for convex and concave polygons; the winding-number variant is correct on a self-intersecting figure-eight loop (dedicated tests).
- [ ] Point-to-segment and segment-to-segment distances match hand-computed values on fixtures within a tolerance.
- [ ] All utilities are pure functions with no allocation beyond outputs (suitable for hot use in hit-testing).

#### Technical notes
Files: packages/sane_ink/lib/src/geometry/polygon.dart (point-in-polygon, closing) and simplify.dart (RDP; Visvalingam-Whyatt allowed as a lower-cost alternative). Pure Dart. Shared by [SN-INK-025](ink.md#sn-ink-025), lasso (SN-ED-004), and shape recognition (SN-SHP). Implements docs/architecture/ink-engine.md section 8.2 (even-odd/winding) and section 9.1 (RDP).

#### Security & privacy
None beyond baseline: geometry inputs are note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
No chrome; enables predictable lasso and erase behaviour. A11y: N/A (math library); consumers (lasso handles) carry Semantics per docs/architecture/ink-engine.md section 8.3.

#### Test plan
packages/sane_ink/test/geometry/polygon_test.dart (ray-casting + winding on concave and figure-eight loops) and simplify_test.dart (RDP corner preservation, count reduction), plus segment-distance cases.

#### Dependencies
SN-FND-002 (sane_ink package skeleton).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-027

<a id="sn-ink-027"></a>

**Serialise strokes with decimate, delta, varint, zstd encoding**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-010](ink.md#sn-ink-010), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-2`, `MASVS-CODE-4`, `CWE-20`, `CWE-400`, `CWE-787` |
| Extra labels | agent-ready |

#### Context
Strokes are the bulk of a document, so their encoding decides file size, sync bandwidth, and load time; the format is decimated points -> per-field delta -> zig-zag varint -> zstd, and it is the .sanenote bundle's stroke-segment encoding (open, documented format, decision 4) (docs/architecture/ink-engine.md section 10). We persist the filtered, decimated centreline with per-point dynamics (not the raw 240 Hz firehose and not the tessellated outline, which is re-derived from geometry + pen preset at load). Per-point tMicros is kept for audio-sync replay and velocity re-derivation. The parser is a hardening surface: it reads untrusted .sanenote content and must fail closed.

#### Scope
**In:** the writer and reader for the stroke segment: RDP decimation at epsilon ~0.75 px; quantise x,y to a 1/32-px grid, pressure->uint8/uint16, tilt/azimuth->uint16 fixed-point, tMicros->delta; per-field delta encoding; zig-zag varint (LEB128-style); column-major layout; zstd at level 3-6 at segment level (batch a page's strokes into one zstd frame); the Stroke record fields (id, penPresetId, colorOverride, bbox, points, createdHlc); bounds/allocation caps on decode.
**Out:** schema versioning + round-trip golden ([SN-INK-028](ink.md#sn-ink-028)), the .sanenote bundle manifest/blob placement (SN-CORE-005), envelope encryption before sync (SN-CRY / sane_crypto), the document model entity (SN-CORE-002).

#### Acceptance criteria
- [ ] Encode -> decode reproduces the decimated centreline with per-point dynamics within the quantisation tolerance (round-trip test).
- [ ] Decimation uses epsilon ~0.75 px (tighter than the recognition epsilon) and preserves visual fidelity at max zoom (golden at max zoom).
- [ ] Column-major + delta + zig-zag varint produces small byte sizes for near-monotonic handwriting (size assertion vs a naive baseline).
- [ ] Per-point tMicros survives the round-trip (required for audio-sync replay, ADR-0015).
- [ ] The reader rejects a malformed/oversized/truncated segment with a fail-closed error (no OOB read/write, no unbounded allocation) and is fuzz-clean (CWE-20/400/787).
- [ ] zstd runs on the storage isolate, never the draw path (assertion).

#### Technical notes
Files under packages/sane_ink/lib/src/serialise/. Pipeline per docs/architecture/ink-engine.md section 10.2. Stroke record per section 10.1. Cap decode buffer sizes before decompression (zip/decompression-bomb defence, CLAUDE.md section 7 rule 8). Reader validates the schema byte ([SN-INK-028](ink.md#sn-ink-028)) and refuses unknown majors. Pure Dart; mirrors the Android Jetpack Ink protobuf + delta-compression idea but is our own portable format. Implements PRD-ED-024 serialisation.

#### Security & privacy
The segment parser reads untrusted content (an imported/synced .sanenote): validate type/size/schema before use, bounds-check every read, cap allocations before decode, and fail closed (CLAUDE.md section 7; docs/security/secure-coding-checklist.md section 1). Serialised strokes are note content, E2E-encrypted before any sync, never logged. IDs: MASVS-STORAGE-2, MASVS-CODE-4, CWE-20, CWE-400, CWE-787.

#### UX notes
No chrome; the effect is small files and fast loads. A11y: N/A (data layer); the retained tMicros enables audio-linked review that aids low-vision users (PRD-ED-024/035 A11y).

#### Test plan
packages/sane_ink/test/serialise/stroke_codec_test.dart (round-trip fidelity, size, tMicros survival, off-isolate zstd) and a fuzz corpus test asserting malformed segments fail closed (feeds the verification-stage fuzzing).

#### Dependencies
[SN-INK-010](ink.md#sn-ink-010) (normalised points to serialise), SN-CORE-002 (Stroke entity). Placement into .sanenote is SN-CORE-005.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, fuzz, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/architecture/ink-engine.md section 10 on byte-layout change)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-028

<a id="sn-ink-028"></a>

**Version the stroke encoding and add a round-trip golden test**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink, storage |
| Size | S |
| SDLC | verification |
| Parent | [SN-INK-027](ink.md#sn-ink-027) |
| Depends on | [SN-INK-027](ink.md#sn-ink-027) |
| Security controls | `MASVS-CODE-4`, `CWE-20` |
| Extra labels | agent-ready, good first issue |

#### Context
The stroke encoding carries a schema byte; a reader must refuse an unknown major schema and the .sanenote manifest records the min-reader version, so any change to the byte layout is a migration with a golden round-trip test (encode->decode->encode is byte-identical for the same schema) (docs/architecture/ink-engine.md section 10.4). This guards against silent format drift corrupting existing notes.

#### Scope
**In:** the schema byte on the stroke segment; a reader guard that refuses an unknown major schema (fail closed); the min-reader-version field recorded for the manifest; a golden round-trip test asserting encode->decode->encode is byte-identical for the current schema; a migration hook stub for future schema bumps.
**Out:** the encoding pipeline itself ([SN-INK-027](ink.md#sn-ink-027)), the full .sanenote manifest (SN-CORE-005), migrations for future schemas (created when a bump lands).

#### Acceptance criteria
- [ ] A segment with an unknown major schema is refused with a fail-closed error (test with a bumped-major fixture).
- [ ] The golden round-trip (encode->decode->encode) is byte-identical for the current schema over a representative corpus (golden test).
- [ ] The min-reader version is recorded and exposed for the .sanenote manifest.
- [ ] A schema-bump migration hook exists and is exercised by a fixture asserting old-schema strokes still decode.

#### Technical notes
File: packages/sane_ink/lib/src/serialise/schema.dart + test. Refuse unknown majors per docs/architecture/ink-engine.md section 10.4. Golden corpus lives under packages/sane_ink/test/serialise/golden/. Any byte-layout change to [SN-INK-027](ink.md#sn-ink-027) requires a migration + this golden update (CLAUDE.md section 11). Pure Dart.

#### Security & privacy
The schema guard is a fail-closed control against malformed/hostile segments (CWE-20). Refusing unknown majors prevents mis-parsing untrusted content. IDs: MASVS-CODE-4, CWE-20.

#### UX notes
No chrome; a user opening a newer-format note gets a clear unsupported-version message rather than corrupt ink. A11y: the error is announced and offers an update prompt.

#### Test plan
packages/sane_ink/test/serialise/schema_test.dart (unknown-major refusal, byte-identical round-trip golden, min-reader version, migration-hook fixture).

#### Dependencies
[SN-INK-027](ink.md#sn-ink-027) (the encoding this versions).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-029

<a id="sn-ink-029"></a>

**Define the sane_ink_surface plugin interface and capability query**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
The two-tier design chooses the wet-ink path at runtime by capability query, never by platform string, so the federated plugin sane_ink_surface must expose a Dart platform-interface and a capability query that reports whether a native low-latency surface exists on this device/OS build; if not, the editor uses Tier B with no feature loss (ADR-0008 decision 4; docs/architecture/rendering-and-performance.md section 7 do/don't). This issue defines the shared contract that the iPad ([SN-INK-006](ink.md#sn-ink-006)), Android ([SN-INK-007](ink.md#sn-ink-007)) and web ([SN-INK-008](ink.md#sn-ink-008)) impls implement, plus a mock impl for tests.

#### Scope
**In:** the Dart platform-interface (createSurface -> texture id, beginStroke, extend(List<InkSample>), endStroke, dispose, nativeSamples stream, and a capabilities()/isAvailable query); the InkSample/StrokeStyle/SurfaceConfig payload types crossing the channel; a mock/no-op impl reporting unavailable (drives Tier B) for tests; payload shape/size validation at the boundary; Pigeon-typed channels per ADR-0012.
**Out:** the native Swift/Kotlin/web impls ([SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007)/[SN-INK-008](ink.md#sn-ink-008)), the Tier B renderer ([SN-INK-005](ink.md#sn-ink-005)), the sample model definition ([SN-INK-002](ink.md#sn-ink-002)).

#### Acceptance criteria
- [ ] The platform-interface package exposes createSurface, beginStroke, extend, endStroke, dispose, nativeSamples, and a capability/isAvailable query.
- [ ] A mock impl reports unavailable and the editor selects Tier B with no feature loss (ADR-0008 verify step 3 graceful degradation).
- [ ] The tier is chosen by the capability query, never by Platform.isX (a lint/test asserts no Platform.isX on the selection path).
- [ ] Channel payloads are shape- and size-validated; a malformed payload is rejected, not crashed on (CWE-20).
- [ ] The interface is Pigeon-typed where expressible (ADR-0012), with FlutterEventChannel only for the sample stream.

#### Technical notes
plugins/sane_ink_surface (platform-interface package). Follows the federated-plugin pattern (ADR-0012; docs/platform/ipad.md section 6 / android.md section 5 sketches). The Texture widget composites the native surface into the Flutter scene. Capability query returns per-device availability + tier hints. Plugins are leaves (never import packages/ or app/). Implements ADR-0008 decision 4 + PRD-ED-027.

#### Security & privacy
The method-channel boundary is attack surface: validate payload shapes/sizes; the interface exposes only ink primitives and holds no secrets (ADR-0008 security impact; ADR-0012). IDs: MASVS-PLATFORM-1, MASVS-PLATFORM-2, CWE-20.

#### UX notes
No chrome; enables predictable per-device tier selection so a new device just works at its best tier. A11y: tier choice is invisible to the user and must not change feature availability or a11y behaviour.

#### Test plan
plugins/sane_ink_surface/test/platform_interface_test.dart (mock reports unavailable -> Tier B, payload validation, no Platform.isX on the selection path) and a Pigeon codegen smoke test.

#### Dependencies
SN-FND-002 (monorepo + plugins scaffold). Consumed by [SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007)/[SN-INK-008](ink.md#sn-ink-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0012)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-030

<a id="sn-ink-030"></a>

**Implement dark-mode ink inversion (INK/DARK_INK display mapping)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, theming |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-005](ink.md#sn-ink-005) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
In dark mode the 6 INK swatches map to the lighter DARK_INK set as a display mapping: the stored stroke colour is the semantic INK index/base, and rendering picks INK vs DARK_INK by the active theme, so a note authored in light mode reads correctly in dark and vice-versa (docs/architecture/ink-engine.md section 3 colour; PRD-ED-037, MUST, M1). PDFs keep original colours; user-picked custom hex colours are shown as authored with an optional adapt-to-dark per-stroke flag. This is the ink half of theme-aware rendering and pairs with the token system (SN-DS-002).

#### Scope
**In:** resolving a stroke's semantic INK base to INK or DARK_INK at paint time by the active theme; the DARK_INK values (#f2efe8, #6f9cff, #ff7b7b, #5fd18a, #b48cff, #ffa14d); leaving PDF page colours and HL palette colours un-inverted (highlight is colour-identity); an optional adapt-to-dark per-stroke flag for custom hex colours (default: shown as authored); reading the palette from the tokens ThemeExtension.
**Out:** the token encoding itself (SN-DS-002), the colour picker UI (SN-ED colour system), the wet renderer ([SN-INK-005](ink.md#sn-ink-005)), HL palette rendering behind ink (SN-BRS/editor).

#### Acceptance criteria
- [ ] A stroke stored with a semantic INK base renders with the INK value in light mode and the DARK_INK value in dark mode (golden per look, light+dark).
- [ ] A note authored in light mode reads correctly (AA contrast) when viewed in dark mode and vice-versa (contrast assertion against the dark page ground).
- [ ] PDF page colours are NOT inverted in dark mode; HL palette colours are NOT inverted (golden).
- [ ] A custom hex colour is shown as authored by default; enabling the per-stroke adapt-to-dark flag maps it for dark grounds and warns on low contrast.
- [ ] The mapping reads DARK_INK from the tokens ThemeExtension (SN-DS-002), never a hard-coded colour (arch-lint: no hard-coded colours).

#### Technical notes
File: packages/sane_render colour resolution at paint time, reading tokens.json ink.INK / ink.DARK_INK via the sane_ui ThemeExtension (SN-DS-002; CLAUDE.md section 9 tokens-only). Store the semantic INK index/base on the Stroke, resolve per theme. Implements PRD-ED-037. Must render across all 17 looks + light/dark (golden-test the surface, CLAUDE.md section 9).

#### Security & privacy
None beyond baseline: colour resolution is display-only, note content stays on device, nothing logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor canvas across looks (design/Sane Notes.dc.html; docs/design/screens-and-flows.md section 0, section 12 Appearance). DARK_INK values are chosen for AA contrast on dark grounds; custom colours warn on low contrast (PRD-ED-037 A11y). Never encode meaning in colour alone.

#### Test plan
packages/sane_render/test/theme/ink_inversion_test.dart plus golden tests per look in light and dark ([SN-INK-032](ink.md#sn-ink-032)): INK->DARK_INK mapping, PDF/HL un-inverted, custom-hex adapt-to-dark flag, contrast checks.

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet/committed renderer), SN-DS-002 (tokens ThemeExtension with INK/DARK_INK).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, golden per look, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-031

<a id="sn-ink-031"></a>

**Add latency instrumentation hooks (t_sample to t_present)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, perf |
| Size | S |
| SDLC | implementation |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The CI perf proxy gates on software latency (pointer-event-received -> sample-committed -> frame-presented) plus a fixed per-device display constant, so the ink pipeline must expose instrumentation hooks that timestamp those stages without touching the hot path in profile/release (docs/architecture/rendering-and-performance.md section 2.2; docs/platform/performance-budgets.md B1-B3). These hooks feed the perf harness (SN-PERF-002) and were prototyped in the M0 spike ([SN-INK-009](ink.md#sn-ink-009)); this issue makes them a reusable, always-available-in-profile facility.

#### Scope
**In:** per-sample t_sample (from the OS event), t_committed, and t_present (frame the stroke was presented) markers on Tier B via SchedulerBinding/FrameTiming and on Tier A via the native present callback; a debug/profile-only aggregation exposing p50/p95/p99; on web, event.timeStamp -> requestAnimationFrame present timing; zero overhead and zero logging in release.
**Out:** the CI proxy gate + baselines (SN-PERF-003), the camera-rig ground truth ([SN-INK-009](ink.md#sn-ink-009) / device lab), the perf harness itself (SN-PERF-002, which consumes these hooks).

#### Acceptance criteria
- [ ] Per-sample t_sample, t_committed, t_present are captured on Tier B (FrameTiming) and Tier A (native present callback); web uses event.timeStamp -> rAF.
- [ ] The pipeline exposes p50/p95/p99 latency in debug/profile; the harness (SN-PERF-002) can read them.
- [ ] In release, the hooks are compiled out or no-op with zero draw-path overhead and no logging (assertion: no draw-loop log in profile/release).
- [ ] Timestamps are monotonic and use tMicros semantics (no wall-clock).
- [ ] Instrumentation adds no measurable latency to the wet path (before/after benchmark within noise).

#### Technical notes
Files: packages/sane_ink/lib/src/instrument/latency_probe.dart + a sane_render present hook. Use SchedulerBinding.addTimingsCallback / FrameTiming (buildDuration + rasterDuration) on Tier B; the native surface present callback on Tier A. Gate behind kProfileMode/kDebugMode; hot-path draw code logs nothing in profile/release (CLAUDE.md section 6 logging, overview 8.2). Consumed by SN-PERF-002. Implements docs/architecture/rendering-and-performance.md section 2.2.

#### Security & privacy
Instrumentation records timing only, never ink coordinates or content; no PII/content in logs (CLAUDE.md section 7 rule 3). Redaction allow-list applies; object ids log as opaque short hashes. IDs: MASVS-PRIVACY-3, MASVS-PRIVACY-1.

#### UX notes
No chrome (developer/CI facility). A11y: N/A. It must never regress the user-facing latency it measures.

#### Test plan
packages/sane_ink/test/instrument/latency_probe_test.dart (stage markers, percentile aggregation, release no-op, no draw-path log) and a benchmark asserting no added latency.

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet renderer / present path). Consumed by SN-PERF-002 (perf harness).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-032

<a id="sn-ink-032"></a>

**Add cross-tier golden and benchmark tests for ink**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | ink, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-INK-001](ink.md#sn-ink-001) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005), [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Golden tests gate the visual correctness of ink so a perf fix cannot silently change how strokes look, and they run against Tier B on CI where there is no device; the ADR-0008 exit criterion also requires that the same synthetic stroke produces byte-identical serialised geometry and pixel-identical dried raster on both tiers (docs/architecture/ink-engine.md section 0; docs/architecture/rendering-and-performance.md section 2.2, section 8). The commit-frame golden catches the one-frame wet->committed flicker. This issue builds the shared golden + benchmark suite the other ink issues plug into.

#### Scope
**In:** golden tests of ink/brush rendering across all 17 looks in light+dark; the commit-frame golden (wet->committed hand-off, no flicker); a Tier A vs Tier B parity golden (pixel-identical dried raster) and serialisation parity (byte-identical geometry); the flutter drive --profile benchmark extracting UI/raster frame time, worst frame, count of frames > 16.7 ms, and p99, gated on regression vs baselines.
**Out:** the CI perf gate wiring + baselines storage (SN-PERF-003), the synthetic corpus + replay harness ([SN-INK-033](ink.md#sn-ink-033)), the camera-rig ground truth ([SN-INK-009](ink.md#sn-ink-009)).

#### Acceptance criteria
- [ ] Golden tests cover ink/brush rendering across the 17 looks and light+dark (roadmap M1 exit); a colour or geometry change fails the golden.
- [ ] The commit-frame golden shows no flicker at the wet->committed transition (docs/architecture/ink-engine.md section 5.2).
- [ ] A synthetic stroke yields byte-identical serialised geometry and pixel-identical dried raster on Tier A and Tier B (ADR-0008 verify step 4).
- [ ] The benchmark extracts UI/raster frame time, worst frame, frames > 16.7 ms, and p99, and fails on regression beyond tolerance vs tools/perf_harness/baselines.
- [ ] The suite runs on Tier B in CI without a device.

#### Technical notes
Files: packages/sane_ink/test/golden/, packages/sane_render/test/golden/, and app/integration_test/editor_latency_test.dart. Use flutter_test golden pixel-diff and integration_test + flutter drive --profile traceAction/reportData (docs/architecture/rendering-and-performance.md section 2.2). Drive with the [SN-INK-033](ink.md#sn-ink-033) synthetic corpus for determinism. Baselines in tools/perf_harness/baselines/<device>.json. Implements docs/architecture/rendering-and-performance.md section 8 lag-proof checklist.

#### Security & privacy
None beyond baseline: tests use synthetic strokes, no real content; no logging of content. ID: MASVS-PRIVACY-1.

#### UX notes
Guards visual quality across all 17 looks + dark mode. A11y: golden coverage includes the overlay chrome contrast where painted; the suite is a developer/CI facility.

#### Test plan
This issue IS the test suite. Deliverables: golden fixtures per look (light+dark), commit-frame golden, cross-tier parity golden, and the benchmark harness with regression thresholds.

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet renderer), [SN-INK-004](ink.md#sn-ink-004) (geometry). Driven by [SN-INK-033](ink.md#sn-ink-033) corpus.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, golden, benchmark)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-INK-033

<a id="sn-ink-033"></a>

**Build the synthetic InkSample corpus and replay harness**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | ink, qa, perf |
| Size | S |
| SDLC | verification |
| Parent | [SN-INK-032](ink.md#sn-ink-032) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Real pens are not reproducible, so latency/jank/golden tests must be driven by recorded/synthetic InkSample streams with timestamps, replayed through the pipeline to make results deterministic and diffable (docs/architecture/rendering-and-performance.md section 2.3). This corpus underpins the capture, filter, geometry, serialisation, and golden/benchmark suites across the engine.

#### Scope
**In:** a corpus of representative strokes (handwriting, fast diagonals, tight loops, slow shading, a corner for overshoot, a figure-eight for lasso) as InkSample sequences with monotonic timestamps; a replay harness that feeds them through the sane_ink pipeline; a recorder to capture new real strokes into the corpus format; documentation of the corpus format.
**Out:** the golden/benchmark tests that consume it ([SN-INK-032](ink.md#sn-ink-032)), the Android ADB stylus simulation (SN-PERF device lab), the CI gate (SN-PERF-003).

#### Acceptance criteria
- [ ] The corpus includes at least handwriting, fast-diagonal, tight-loop, slow-shading, corner, and figure-eight strokes with monotonic timestamps.
- [ ] The replay harness feeds a corpus stream through the capture -> filter -> geometry pipeline deterministically (same input yields the same output across runs).
- [ ] A recorder can capture a new real stroke into the corpus format (round-trip through the recorder + replay).
- [ ] The corpus format is documented and versioned so replays stay stable as the pipeline evolves.
- [ ] The harness is usable headless in CI (no device).

#### Technical notes
Files: packages/sane_ink/test/corpus/ (fixtures) + tools/perf_harness replay entry. InkSample sequences per docs/architecture/ink-engine.md section 1.2; timestamps monotonic microseconds. Android may simulate a stylus over ADB (debug.input.simulate_stylus_with_touch) for on-device automation (docs/architecture/rendering-and-performance.md section 2.3). Pure Dart fixtures. Consumed by [SN-INK-032](ink.md#sn-ink-032), [SN-INK-003](ink.md#sn-ink-003), [SN-INK-011](ink.md#sn-ink-011), [SN-INK-012](ink.md#sn-ink-012).

#### Security & privacy
None beyond baseline: synthetic/recorded test strokes contain no real note content and are committed as fixtures (no secrets, no PII). ID: MASVS-PRIVACY-1.

#### UX notes
No chrome (developer/CI facility). A11y: N/A. The corpus should include strokes representative of real handwriting so regressions are caught realistically.

#### Test plan
packages/sane_ink/test/corpus/replay_test.dart (determinism across runs, recorder round-trip, headless CI run) and use of the corpus by [SN-INK-032](ink.md#sn-ink-032).

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002) (capture pipeline the corpus replays through).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-IPAD-022

<a id="sn-ipad-022"></a>

**Confirm the PencilKit interop boundary and benchmark PKCanvasView latency**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | spike |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad |
| Areas | ink, compat |
| Size | S |
| SDLC | design |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-INK-009](ink.md#sn-ink-009) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
docs/platform/ipad.md §4 states PencilKit is NOT the primary canvas — Sane Notes needs proprietary brushes, custom blending, huge documents and one cross-platform render pipeline, so it MUST use the custom Metal path, not `PKCanvasView`. PencilKit MAY be used only for the system-quality Scribble tool and as a reference implementation to benchmark against. This spike confirms that interop boundary and produces the benchmark reference number for the M0/M1 latency work (ADR-0001/ADR-0008 context).

#### Scope
**In:** measure `PKCanvasView` pen-to-pixel latency on the Tier 1 reference iPads as the vendor baseline; confirm and document where PencilKit is/ isn't used (Scribble only; benchmark reference); record the interop boundary as an addendum to docs/platform/ipad.md §4 and note it against ADR-0008.
**Out:** building the custom Metal surface ([SN-INK-006](ink.md#sn-ink-006)); the go/no-go latency spike itself ([SN-INK-009](ink.md#sn-ink-009)); Scribble implementation ([SN-IPAD-008](ocr-hwr.md#sn-ipad-008)).

#### Acceptance criteria
- [ ] A written note records `PKCanvasView` measured pen-to-pixel latency on the M-series ProMotion iPad Pro and iPad Air, as the reference to beat/meet.
- [ ] The interop boundary is confirmed and documented: PencilKit used only for Scribble + benchmarking, custom Metal path for the canvas (docs/platform/ipad.md §4).
- [ ] The outcome is linked from ADR-0008 and docs/platform/ipad.md §4; no production dependency on `PKCanvasView` for the canvas is introduced.

#### Technical notes
Reuse the `tools/perf_harness` capture from [SN-INK-009](ink.md#sn-ink-009); compare against the decision-7 <= 16 ms ProMotion budget (docs/platform/performance-budgets.md). Reference docs/platform/ipad.md §4/§10 (L6) and ADR-0001 exit criterion. Throwaway benchmark code only.

#### Security & privacy
None beyond baseline: benchmark only; no note content used; nothing logged from the draw loop; no tokens (MASVS-PRIVACY-1).

#### UX notes
No shipped UI. Document that the system Scribble tool (the only PencilKit use) matches docs/design/screens-and-flows.md text-entry behaviour; the custom canvas keeps the design-system look across all 17 looks.

#### Test plan
Manual/benchmark: harness run captured in the spike note; no automated tests for a throwaway spike. Attach the latency table to the ADR addendum.

#### Dependencies
[SN-INK-009](ink.md#sn-ink-009) pen-to-pixel latency measurement spike.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated: docs/platform/ipad.md §4 addendum + ADR-0008 note recorded
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-PHN-005

<a id="sn-phn-005"></a>

**Enable finger-first inking with velocity-derived stroke width on phones**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | ink, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002), [SN-INK-004](ink.md#sn-ink-004), [SN-BRS-002](brushes.md#sn-brs-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-CODE-2` |
| Extra labels | agent-ready, innovation |

#### Context
There is no Apple Pencil on iPhone — Pencil is iPad-only — so on phones **finger ink is not a fallback, it is the default input and MUST be excellent** (docs/platform/phones.md §1, §6, limitation P1). On tablets the default is pencil-only with palm rejection; on phones `PointerDeviceKind.touch` draws. phones.md §6 is explicit that this is a **per-surface default, not a code fork**: the capture path in `packages/sane_ink` is identical and only the drawing-policy default differs (the `.anyInput` equivalent of `PKCanvasViewDrawingPolicy` on Apple; treating `TOOL_TYPE_FINGER` as ink on Android).

The second half is stroke quality. Finger touches carry no true pressure (or a coarse, device-dependent estimate), so brushes MUST derive width and opacity from **velocity** — speed-thinning / `simulatePressure` — so a finger stroke still reads as handwriting rather than a uniform line (phones.md §6). PRD-01 already provides the hook: PRD-ED-031 (finger-draw toggle, with finger/mouse drawing always enabled on finger-only devices regardless of the toggle) and PRD-ED-024 (synthetic pressure derived from velocity where no true pressure exists). This issue makes those the phone default and tunes the velocity model so the twelve stock brushes degrade gracefully on finger (PRD-ED §stock brushes: 'every stock brush is usable on finger/mouse; the default Fountain Pen never depends on pressure hardware').

#### Scope
**In:** the phone default for the drawing policy, a capability query that detects whether an active stylus exists on the device, the velocity→synthetic-pressure model and its tuning for the stock brushes, per-surface default wiring of the Settings 'Draw with finger' toggle, and the interaction with palm rejection when no stylus is present.
**Out:** draw-versus-pan disambiguation ([SN-PHN-006](input-gestures.md#sn-phn-006)), the zoom-to-write box ([SN-PHN-007](editor.md#sn-phn-007)), the stroke capture/stabilisation pipeline itself ([SN-INK-002](ink.md#sn-ink-002), [SN-INK-003](ink.md#sn-ink-003)), S Pen on phones ([SN-PHN-016](input-gestures.md#sn-phn-016)), and brush parameter serialisation ([SN-BRS-002](brushes.md#sn-brs-002)).

#### Acceptance criteria
- [ ] On a phone with no active stylus, a single finger draws with the active tool out of the box — no setting change required (PRD-ED-031 final sentence).
- [ ] The default is chosen by **capability query** (does this device report an active stylus / has one ever been seen?), never by `Platform.isIOS`/`isAndroid` (CLAUDE.md §8).
- [ ] Settings → Handwriting & stylus → 'Draw with finger' still exists and is honoured, but its **default value is on for the compact/phone surface** and off on tablet; changing it takes effect without restart and persists per profile.
- [ ] Synthetic pressure is derived from sample velocity with a documented curve; a slow stroke is visibly thicker than a fast stroke for the Fountain Pen, Ballpoint, Pencil and Marker stock brushes.
- [ ] The velocity model is temporally stable: two strokes drawn at the same speed produce width profiles within 5% of each other, and there is no visible width oscillation at constant speed (assert on the sampled outline widths in a unit test).
- [ ] Where a device *does* report coarse touch pressure, the model blends it rather than ignoring it, and the Settings 'Pressure sensitivity' toggle off yields constant width (PRD-ED-024).
- [ ] Finger inking holds the phone frame budget: 60 fps floor, **no frame > 16.7 ms while writing** (budgets B4/B5), measured on the Android-lowend reference device.
- [ ] With finger-draw on and no stylus present, palm rejection relaxes so resting-hand heuristics do not eat the drawing finger (PRD-ED-030/PRD-ED-031 interaction, documented in code).
- [ ] Nothing on the finger-ink path allocates per `PointerMoveEvent` and nothing hops an isolate (CLAUDE.md §8).

#### Technical notes
The velocity model belongs in `packages/sane_ink` (pure Dart — MUST NOT import `package:flutter`), e.g. `packages/sane_ink/lib/src/dynamics/velocity_pressure.dart`, consumed by the outline geometry in [SN-INK-004](ink.md#sn-ink-004) and the brush dynamics in `packages/sane_brushes`. Capture stays a raw `Listener` disambiguating on `event.kind == PointerDeviceKind.stylus` versus `.touch` (CLAUDE.md §8); the drawing policy is a value in the editor tool state in `app/lib/editor/`, seeded from the surface default. Model: exponentially-smoothed speed `v` over the last N samples, mapped through a configurable curve to `p in [0,1]` (thin-when-fast), clamped, with the smoothing constant exposed as a brush parameter so `perfect_freehand`-style `simulatePressure` behaviour is reproducible; document the chosen constants in `docs/architecture/ink-engine.md`. Capability query: expose `hasActiveStylus` through `plugins/sane_stylus` (ADR-0012) with a conservative false default and never a platform check. Related ADRs: ADR-0008 (ink pipeline and low-latency surfaces — Tier A/Tier B by capability), ADR-0009 (brush engine).

#### Security & privacy
Threats: **T-INKLOG** — debugging a new input path is exactly when engineers add coordinate logging; ink coordinates are note content. Control: the finger path logs nothing in profile/release, `print()` is lint-banned, and `SaneLog` redaction covers point data (CLAUDE.md §7.3; MASVS-PRIVACY-1, MASVS-STORAGE-2, CWE-532). **T-CAPFALLBACK** — a capability query that fails open could enable a stylus-only path on a device without one, or disable finger drawing entirely and make the phone unusable. Control: the query fails **closed to finger-draw-enabled** on phones and the fallback is unit-tested as an explicit branch, not a default-case (MASVS-CODE-2). **T-SIDECHANNEL** — no new sensor, permission or network access is introduced; velocity is derived from existing pointer samples only (MASVS-PRIVACY-4). Baseline: no note content leaves the device; no new egress.

#### UX notes
The surface is the Editor canvas (docs/design/screens-and-flows.md §7.2) and the affected setting row is Settings → Handwriting & stylus → 'Draw with finger — Off means fingers only scroll and pinch' (§12). On phones that copy must change to reflect the inverted default; use the ux-principles.md §5 voice — plain, warm, specific, no exclamation marks — e.g. 'Draw with finger — On, because your phone has no pen. Turn it off and fingers only scroll and pinch.' Ink itself renders from the shared ink/paper constants and is theme-independent, so all 17 looks and dark mode are unaffected by the stroke rendering; the settings row is a `SaneSettingRow` + `SaneToggle` and must read correctly in every look. a11y: a stroke must remain cancellable before lift and always undoable (PRD-CO-319); users without a stylus are first-class and finger quality must equal pen quality minus pressure/tilt (PRD-ED-031 A11y note).

#### Test plan
- `packages/sane_ink/test/dynamics/velocity_pressure_test.dart` — curve monotonicity, clamping, stability at constant speed, blend with coarse device pressure.
- `packages/sane_ink/test/dynamics/velocity_pressure_golden_test.dart` — golden width profiles for a synthetic fast/slow/accelerating stroke.
- `app/test/editor/finger_draw_default_test.dart` — capability query true/false matrix; phone default on, tablet default off; toggle persists per profile.
- `app/test/security/no_ink_logging_test.dart` — asserts the finger path emits no `SaneLog` records carrying coordinates (negative test).
- `app/integration_test/phone_finger_ink_latency_test.dart` — `tools/perf_harness` run on Android-lowend and iPhone-ref: 60 fps floor, no frame > 16.7 ms.

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002), [SN-INK-004](ink.md#sn-ink-004), [SN-BRS-002](brushes.md#sn-brs-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-004

<a id="sn-web-004"></a>

**Wire browser Pointer Events into the sane_ink capture path on web**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | ink, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002), [SN-WEB-002](compat.md#sn-web-002) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-532`, `MASVS-NETWORK-1` |
| Extra labels | agent-ready |

#### Context
Flutter Web consumes browser **Pointer Events** through the engine and surfaces them to Dart as ordinary `PointerEvent`s on a `Listener`, which means web can reuse the **same `sane_ink` capture pipeline as mobile** rather than a parallel implementation (`docs/platform/web.md` §3). What differs is fidelity: pressure, `tiltX/tiltY` and `twist` arrive on every modern browser; `altitudeAngle`/`azimuthAngle` only on Safari 18.2+; and high-frequency `getCoalescedEvents()` samples are **not** first-class in Dart, so `PRD-ED-025` (coalesced sampling) may need JS interop on web. This issue maps what the engine gives us into the stroke model from `PRD-ED-024` and makes the web ink path honest about which fields are real versus synthesised, so brushes never assume a capability the browser did not provide (`docs/platform/compatibility-matrix.md` §4).

#### Scope
**In:** the web input adapter in `plugins/sane_ink_surface` (web implementation) and `app/lib/editor/input/web_pointer_source.dart`; capability probing per pointer; mapping pressure/tilt/azimuth/timestamp into `StrokePoint`; velocity-derived width when pressure is absent or synthetic (mouse/trackpad reports a constant 0.5); a documented capability report consumed by the brush engine.
**Out:** the Chromium wet-ink fast path ([SN-WEB-005](ink.md#sn-web-005)), palm rejection and `touch-action` ([SN-WEB-006](input-gestures.md#sn-web-006)), Safari Pencil specifics ([SN-WEB-007](ink.md#sn-web-007)), stabilisation and geometry which are shared code ([SN-INK-003](ink.md#sn-ink-003), [SN-INK-004](ink.md#sn-ink-004)).

#### Acceptance criteria
- [ ] Pen input on Chrome desktop with a supported tablet produces strokes whose pressure varies with applied force; `pointerType == 'pen'` is mapped to `PointerDeviceKind.stylus`.
- [ ] Mouse and trackpad input is detected as non-pressure and rendered with velocity-derived width (never a flat line from a constant 0.5 reading).
- [ ] Tilt arrives as `tiltX/tiltY` on Chromium and as `altitudeAngle`/`azimuthAngle` on Safari 18.2+, normalised into one representation before reaching `sane_ink`.
- [ ] Where coalesced samples are unavailable, the pipeline degrades to per-frame samples with no visible corner artefacts at fast stroke speeds; where available, every intermediate sample is recovered (`PRD-ED-025`).
- [ ] Each stroke point carries a monotonic timestamp suitable for the audio anchor field of `PRD-ED-024`.
- [ ] Pen-down → pixel stays within **30 ms** on Chrome desktop with this adapter active (measured by `tools/perf_harness` web mode); no frame exceeds 16.7 ms while writing.
- [ ] A capability report (pressure / tilt / azimuth / hover / coalesced, each true|false|synthetic) is exposed to the brush engine and to Settings → Handwriting & stylus.

#### Technical notes
Wrap the canvas in a raw `Listener`, never a `GestureDetector`, and never enable `GestureBinding.resamplingEnabled` on the draw path (CLAUDE.md §8). Keep everything on the root isolate for the hot path and do no async work in `onPointerMove`. Where the engine does not forward a browser field, reach it with `dart:js_interop` against the engine canvas inside the web plugin implementation only — `packages/sane_ink` is pure Dart and must not gain a web import (package DAG, `docs/architecture/overview.md` §5). Secure context is mandatory for coalesced events (`PRD-ED-025`). Implements `PRD-ED-024`, `PRD-ED-025`, `PRD-ED-026` (prediction where available) and ADR-0008's Tier B path on web.

#### Security & privacy
Threats: ink coordinates are note content, and the draw loop is the single easiest place to leak them (TM-I-05); a JS-interop bridge is also an injection surface if it ever evaluates strings (CWE-95). Controls: **no logging of coordinates, pressure or timestamps** anywhere in the capture path, in any build (secure-coding checklist §0.2, §7, CWE-532, MASVS-PRIVACY-1); the JS interop layer exposes a fixed, typed, allow-listed set of reads and never `eval`/`Function` (MASVS-CODE-4); input is secure-context-only over HTTPS (MASVS-NETWORK-1, CWE-319); capability probing stores no device fingerprint beyond the boolean report, which is profile-local and never synced (MASVS-PRIVACY-2).

#### UX notes
Applies to the Editor canvas in `design/Sane Notes.dc.html` (`docs/design/screens-and-flows.md` §7.2). Stroke appearance must match native across all **17 looks in light and dark** — golden-test one pen, one highlighter, one eraser stroke. When a device provides no pressure, the pen still feels alive through velocity width rather than flat lines, and the Settings → Handwriting & stylus panel states plainly what this browser supports so the user is never puzzled by a missing feature. Accessibility: the canvas keeps its `Semantics` node and keyboard pan (`PRD-ED-133` companion behaviour); pointer capability text has ≥ 4.5:1 contrast and is screen-reader readable.

#### Test plan
- `packages/sane_ink/test/point_mapping_test.dart` — pressure/tilt/azimuth normalisation, synthetic-pressure detection (shared logic).
- `app/test/web/web_pointer_source_test.dart` — widget tests feeding synthetic pointer streams for pen, mouse and touch.
- `app/integration_test/web/ink_capture_test.dart` — headless Chromium draws a scripted stroke and asserts sample count, monotonic timestamps and no dropped segments.
- `app/integration_test/editor_latency_test.dart` (web mode) — asserts the ≤ 30 ms budget.
- Manual: Safari 18.2+ on iPadOS with Apple Pencil; Firefox 125 with a Wacom tablet.

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002), [SN-WEB-002](compat.md#sn-web-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-005

<a id="sn-web-005"></a>

**Add a Chromium wet-ink fast path via Ink API and desynchronized canvas**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | ink, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-004](ink.md#sn-web-004), [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-CODE-4`, `MASVS-PRIVACY-1`, `CWE-95`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context
The lowest-latency primitives on the web are the **Ink API** delegated-trail presenter (`navigator.ink.requestPresenter()`, Chromium and Samsung Internet only) and a `getContext('2d'|'webgl2', { desynchronized: true })` canvas, which skips a compositor hop. Flutter owns its own canvas and does not expose either, so reaching them means a **JS-interop side-canvas for the wet stroke** layered over the Flutter surface (`docs/platform/web.md` §3, R2; `docs/adr/0010-web-pwa-strategy.md` decision 7). ADR-0010 is explicit that this is a **progressive enhancement**: the Tier B pure-Flutter path is the baseline everywhere and the web release must not block on it. This issue builds the enhancement, behind a capability probe and a kill switch, so Chromium users get a visibly tighter pen trail while every other browser is untouched.

#### Scope
**In:** a web-only wet-ink overlay in `plugins/sane_ink_surface` (web implementation): feature-detect `navigator.ink` and `getContextAttributes().desynchronized`; render only the **active** stroke into the side canvas; hand off to the Flutter-painted layer on pointer-up with no visible seam or double-draw; a runtime flag to disable; latency measurement before/after.
**Out:** the baseline capture path ([SN-WEB-004](ink.md#sn-web-004)), the Flutter-side incremental renderer ([SN-INK-005](ink.md#sn-ink-005)), COOP/COEP ([SN-WEB-015](security.md#sn-web-015)), and any change to stroke geometry or serialisation.

#### Acceptance criteria
- [ ] On Chrome/Edge 120+ the fast path engages automatically and `tools/perf_harness` web mode shows a **measurable reduction** in pen-to-pixel versus the baseline, with the before/after numbers recorded in the PR.
- [ ] Where `navigator.ink` or `desynchronized` is unavailable (Safari, Firefox), the app runs the Tier B path with no console error and no visual difference from today.
- [ ] Hand-off at pointer-up is seamless: no flicker, no duplicated stroke, no colour or width shift, verified frame-by-frame on a recorded capture.
- [ ] The overlay never receives or renders anything except the in-progress stroke; finished strokes live only in the Flutter layer.
- [ ] A `--dart-define` kill switch disables the fast path in one build, and a runtime setting disables it without a rebuild.
- [ ] The ≤ 30 ms B3 budget still passes with the fast path **disabled** — the enhancement may not become load-bearing (ADR-0010).
- [ ] Zoom, scroll, page change, look change and dark-mode toggle all leave the overlay correctly aligned or cleanly torn down.

#### Technical notes
Live entirely inside the federated plugin's web implementation (ADR-0012); `packages/sane_ink` and `packages/sane_render` must not learn about the DOM. Use `dart:js_interop` with typed extension types — no `dynamic`, no string evaluation. Presenter trails need the pointer event's `pointerId`; keep a strict one-presenter-per-stroke lifecycle and release it on pointer-up/cancel to avoid leaking GPU resources. Respect device pixel ratio and the canvas transform so the wet stroke matches the flattened result exactly. This is the web expression of `PRD-ED-027` (low-latency render surface) and complements `PRD-ED-026` (predicted points) where the browser exposes `getPredictedEvents()`. Document the outcome in `docs/platform/web.md` §3 and, if the measured win is negligible, record that honestly in ADR-0010 rather than keeping dead code.

#### Security & privacy
Threats: a JS-interop bridge widening the DOM attack surface (TM-E-03, MASVS-CODE-4), string evaluation or dynamic import creating a code-execution sink under a strict CSP (CWE-95, OWASP-A03), and wet-stroke coordinates being logged or exposed to page script (TM-I-05, CWE-532). Controls: allow-listed, typed interop calls only; no `eval`, `new Function`, `innerHTML` or dynamic script insertion, so the nonce-based CSP and Trusted Types from [SN-WEB-014](security.md#sn-web-014) hold unchanged; the overlay canvas carries no note data after pointer-up; nothing from this path is logged in any build; the overlay must not escape the app origin or be reachable from an embedding frame (COOP/COEP, [SN-WEB-015](security.md#sn-web-015)).

#### UX notes
This is the Editor canvas (`docs/design/screens-and-flows.md` §7.2). The enhancement must be invisible except as *feel*: identical colour, width, opacity and blend in all **17 looks**, light and dark — golden-test the hand-off frame so a seam cannot ship. Never expose "Ink API" as user-facing jargon; if a setting is shown, it reads as "Low-latency ink (this browser)" in Settings → Handwriting & stylus. Respect `prefers-reduced-motion` (latency work is not animation, so no change) and keep the canvas `Semantics` node intact so screen-reader users are unaffected.

#### Test plan
- `app/test/web/ink_fast_path_probe_test.dart` — capability probing and kill-switch logic with mocked interop.
- `app/integration_test/web/ink_fast_path_test.dart` — headless Chromium: engage, draw, release, assert a single persisted stroke and no orphan presenter.
- `app/integration_test/editor_latency_test.dart` (web mode) — before/after latency with the flag on and off.
- `app/test/web/ink_handoff_golden_test.dart` — golden of the hand-off frame in two looks, light and dark.
- Manual: Samsung Internet; Safari and Firefox to confirm clean non-engagement.

#### Dependencies
[SN-WEB-004](ink.md#sn-web-004), [SN-INK-005](ink.md#sn-ink-005); measurement methodology from [SN-PERF-002](perf.md#sn-perf-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/platform/web.md §3 and ADR-0010 updated with the measured result
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2

---

### SN-WEB-007

<a id="sn-web-007"></a>

**Support Apple Pencil on Safari iPadOS with altitude, azimuth and hover**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | web |
| Areas | ink, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-004](ink.md#sn-web-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
An iPad user who opens the web app — the most likely "try it on the web" visitor — gets the JS/CanvasKit path (no WasmGC in WebKit) and a Pencil whose richest data arrives through Safari-specific fields: `altitudeAngle` and `azimuthAngle` from **Safari 18.2+**, coalesced and predicted events from the same version, and hover from Safari 16.1+ on M-series iPads (`docs/platform/web.md` §1, §3). Safari 17 is the minimum supported version (`docs/platform/compatibility-matrix.md` §3), so the app must work well on 17 and get better on 18.2+ without branching on user-agent strings. This issue makes Pencil-on-Safari a deliberately good experience within the best-effort tier, since iPad-Safari ink is **not** gated to the B3 budget but is a first impression for thousands of prospective users.

#### Scope
**In:** capability-probed use of `altitudeAngle`/`azimuthAngle` with graceful fallback to `tiltX/tiltY`; hover preview where supported (`PRD-ED-033`); coalesced/predicted sample use where Safari exposes them; verification that the CanvasKit path renders ink correctly at iPad resolutions and refresh rates; a documented Tier 2 result in the compatibility matrix.
**Out:** the Chromium fast path ([SN-WEB-005](ink.md#sn-web-005)), Scribble handwriting-to-text which only works in real DOM text fields ([SN-WEB-030](text.md#sn-web-030) investigates), and native iPadOS app behaviour ([SN-IPAD-001](input-gestures.md#sn-ipad-001)).

#### Acceptance criteria
- [ ] On Safari 18.2+ with Apple Pencil, strokes use altitude/azimuth for nib orientation; on Safari 17 the same stroke renders from `tiltX/tiltY` with no error and a visibly reasonable result.
- [ ] Detection is by **feature probe on the event object**, never by browser version sniffing; a test asserts no user-agent string is read.
- [ ] Hover shows the brush cursor on hover-capable iPads (`PRD-ED-033`) and is silently absent elsewhere.
- [ ] Pressure is honoured; where a Pencil model reports none, velocity width is used (`docs/platform/compatibility-matrix.md` §4).
- [ ] Writing a full page on an iPad Pro in Safari holds **≥ 60 fps** with no dropped-stroke artefacts; the measured pen-to-pixel figure is recorded in `tools/device_lab/web-matrix.md` as best-effort (not a gate).
- [ ] Rotating the iPad, entering Split View and pinch-zooming preserve ink alignment and editor state.
- [ ] The Settings → Handwriting & stylus capability report correctly lists what this browser supports.

#### Technical notes
All Safari-specific reads live in the web implementation of `plugins/sane_ink_surface` behind the same typed interop layer added by [SN-WEB-004](ink.md#sn-web-004); normalise altitude/azimuth into the single orientation representation used by `packages/sane_ink` so brushes stay platform-agnostic (`PRD-ED-024`). Coalesced events require a **secure context** (`PRD-ED-025`). Remember that skwasm can never engage here, so expect main-thread paint and budget accordingly (`docs/adr/0010-web-pwa-strategy.md` R1). Record results against the Safari rows of `docs/platform/compatibility-matrix.md` §3 and §4 in the same PR.

#### Security & privacy
Threats: stylus telemetry (pressure curves, orientation) is derived from note content and must not leak (TM-I-05); a version-sniffing implementation invites fragile, unsafe branching and fingerprinting (MASVS-PRIVACY-2). Controls: no logging of any pointer field in any build (CWE-532, MASVS-PRIVACY-1); capability data stays a local boolean report, never synced or sent anywhere (MASVS-PRIVACY-3); secure-context/HTTPS is required for coalesced events and enforced by the hosting configuration (MASVS-NETWORK-1, CWE-319); interop remains allow-listed and non-evaluating (MASVS-CODE-4).

#### UX notes
Editor canvas on a tablet-width layout (`docs/design/screens-and-flows.md` §7.2, Expanded window class in `docs/platform/compatibility-matrix.md` §5). Ink must look the same as native iPad across all **17 looks, light and dark** — golden-test a nib-orientation-sensitive brush stroke. Hover preview follows the native brush-cursor spec and must not appear for finger or mouse in a way that implies pen support. Accessibility: 44 px targets throughout the palette dock at iPad sizes, ≥ 4.5:1 contrast in both modes, and full VoiceOver reachability of the toolbar (`PRD-CO-331`).

#### Test plan
- `app/test/web/safari_pointer_fields_test.dart` — probe-based selection between altitude/azimuth and tilt with synthetic events; asserts no UA sniffing.
- `app/integration_test/web/ink_capture_test.dart` — extended with a Safari-shaped event fixture.
- `app/test/web/nib_orientation_golden_test.dart` — goldens for a tilt-sensitive brush in two looks, light and dark.
- Manual (Tier 2, recorded in `tools/device_lab/web-matrix.md`): iPad Pro Safari 18.2+, iPad Air Safari 17, Split View, rotation, pinch-zoom.

#### Dependencies
[SN-WEB-004](ink.md#sn-web-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/platform/compatibility-matrix.md Safari rows updated with measured results
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

