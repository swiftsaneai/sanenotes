# Sane Notes — Rendering & Performance

> Audience: an autonomous coding agent (or engineer) who must keep Sane Notes **lag-proof**.
> The performance budgets in [locked decision 7](./overview.md#appendix-a--locked-decisions-this-doc-must-honour)
> are **hard gates, not aspirations** — nothing that misses them ships (decision 1: UX first).
> Read [`overview.md`](./overview.md) for the system map and [`ink-engine.md`](./ink-engine.md)
> for the ink pipeline this document measures. Decisions:
> [ADR-0008](../adr/0008-ink-pipeline-and-low-latency-surfaces.md) (surfaces) and
> [ADR-0014](../adr/0014-pdf-engine.md) (PDF).
>
> Status: **living document**, v1 (M0). Update it in the same PR that changes a budget, a
> device in the lab, the harness, or the CI perf gate.

This document defines: the [frame/latency budgets per platform](#1-budgets), the
[measurement harness](#2-measurement-harness) (high-speed camera + on-device timestamps; the CI
`flutter drive --profile` gate; the device lab), the [memory strategy](#3-memory-strategy),
[startup](#4-startup), [PDF / large-document tiling](#5-pdf--large-document-tiling), the
[jank triage runbook](#6-jank-triage-runbook), the [lag-proof PR checklist](#8-lag-proof-checklist-every-editor-pr-must-pass),
and the [compatibility matrix](#9-compatibility-matrix).

---

## 1. Budgets

The decision-7 numbers, restated as enforceable gates. "Pen-to-pixel" = time from the physical
pen sample to the corresponding photons on screen (measured, §2.1). "Frame" = one display refresh.

### 1.1 Latency & frame-rate budgets

| Metric | iPad (ProMotion) | Mid-range Android | Low-end Android (4 GB, SD 680-class) | Web (Chrome desktop) | How enforced |
|---|---|---|---|---|---|
| **Pen-down → pixel latency** | **≤ 16 ms** (Tier A native front-buffer) | **≤ 25 ms** (Tier A Ink low-latency) | ≤ 25 ms target; else Tier-B best effort + native-pivot review | **≤ 30 ms** (Tier B, `desynchronized` where honoured) | high-speed camera (§2.1) + CI proxy (§2.2) |
| **Steady frame rate** | 120 fps where display allows, **60 fps floor** | **60 fps floor**, 90/120 where available | **60 fps floor** | 60 fps floor (Chrome desktop) | `flutter drive --profile` timeline (§2.2) |
| **Jank during writing** | **no frame > 16.7 ms** (no dropped frame while a stroke is active) | same | same | same | frame-time histogram gate |
| **Cold start** | **< 1.5 s** | < 2 s | < 2 s | **< 3 s** (cached PWA) | startup trace (§4) |
| **Open 1,000-page notebook** | **< 1 s** | < 1 s | < 1 s | < 1 s | integration_test timing |
| **Scroll 600-page PDF** | 60 fps | 60 fps | 60 fps | 60 fps | timeline gate (§5) |
| **Memory (steady editing)** | budgeted per device | budgeted | **< 300 MB on 4 GB Android** | tab-reasonable | on-device sampler (§3) |
| **Battery (2 h writing)** | **≤ 12 % on iPad Pro** | monitored | monitored | n/a | device-lab manual (§2.4) |

### 1.2 Per-frame budget math

At 120 Hz the whole pipeline — build, layout, paint, raster, composite — has **8.3 ms**; at
60 Hz, **16.7 ms**. The active-stroke path must fit with headroom:

- **UI isolate build+layout for a pointer move: aim ≤ 1 ms.** The editor drives repaint via a
  `Listenable` (`repaint:` on `CustomPainter`) so build & layout are skipped entirely on the draw
  path ([ink-engine §5](./ink-engine.md#5-incremental-rendering); `research/flutter-ink-stack.md`).
- **Active-stroke paint: ≤ a few ms**, and only inside the wet `RepaintBoundary`/native surface —
  never repaint the committed-ink tiles or the rest of the UI on a pointer move.
- **Everything else (persist, index, sync, tessellate finished strokes) is off the UI isolate**
  and MUST NOT touch the frame ([overview §6](./overview.md#6-threading--isolate-model)).

### 1.3 Impeller / renderer assumptions

- **iOS:** Impeller is the only renderer; shaders compile offline at build → **no first-use
  shader-compilation jank** (the classic ink artifact) (`research/flutter-ink-stack.md`).
- **Android:** Impeller default on API 29+ (Vulkan), automatic legacy-GL fallback on older/no-
  Vulkan devices. Confirm Impeller is actually active on target builds (§6) — an unexpected Skia
  fallback changes the perf profile.
- **Web:** **no Impeller.** CanvasKit (default) or skwasm (needs COOP/COEP cross-origin
  isolation; **cannot run in any iOS browser** — WebKit lacks WasmGC). Web budgets assume the
  CanvasKit/JS path (`research/web-stylus-and-pwa-capabilities.md`,
  [ADR-0010](../adr/0010-web-pwa-strategy.md)).

---

## 2. Measurement harness

You cannot gate what you cannot measure. There are two measurement regimes: **ground-truth**
(high-speed camera, manual, in the device lab, the source of truth for latency) and **CI proxy**
(automated, headless-of-camera, catches regressions on every PR). Both live in
`tools/perf_harness/` with device configs in `tools/device_lab/`.

### 2.1 Ground-truth: pen-to-pixel with a high-speed camera

Absolute latency can only be measured optically — software timestamps cannot see the photons.
Procedure (run per reference device on any change to the wet-ink path or a new OS version):

1. **Rig:** a high-speed camera at **≥ 240 fps** (1000 fps preferred; a modern phone slow-mo or a
   dedicated camera) films the pen tip and the screen together, ideally with the pen tip and the
   emitted stroke in one frame.
2. **Method (frame counting):** move the pen at a steady speed; count the frames between the pen
   tip passing a point and the ink appearing under it. `latency_ms = frames_gap × (1000 /
   camera_fps)`. Average over ≥ 20 strokes at varied speeds; report median + p95.
3. **On-device corroboration:** simultaneously log, per sample, `t_sample` (from the OS event) and
   `t_present` (the frame the stroke was presented — from `SchedulerBinding`/`FrameTiming` on
   Tier B, or the native surface's present callback on Tier A). This *software* latency is a
   lower bound (it excludes display + digitizer latency the camera sees); the gap between camera
   and software numbers is the fixed hardware latency — record both.
4. **Record** results in `tools/device_lab/results/<device>-<os>.md` with date, OS build, tier,
   and pen model. The **M0 `SN-INK` spike** ([ADR-0001](../adr/0001-flutter-single-codebase.md),
   [ADR-0008](../adr/0008-ink-pipeline-and-low-latency-surfaces.md)) is exactly this measurement
   for Tier A and Tier B on the three reference devices; its written pass/pivot decision is the
   gate for the whole ink architecture.

> Why optical is mandatory: the budgets (16/25/30 ms) include display refresh and digitizer
> latency that no in-process timer sees. A green software timeline with a 45 ms optical latency
> is a failing product. Trust the camera for the absolute number; trust the CI proxy for
> *regressions*.

### 2.2 CI proxy: `flutter drive --profile` + timeline

Every PR that touches the draw path runs an automated perf test — no camera, so it measures
**frame build/raster times and jank**, not absolute photon latency, and gates on *regression
from the committed baseline*.

- Use **`integration_test` + `flutter drive --profile`** with `IntegrationTestWidgetsFlutterBinding`
  `traceAction`/`reportData` to capture a timeline while a scripted gesture draws synthetic
  strokes across the editor (`research/flutter-ink-stack.md` lists `integration_test`/`patrol`).
- Extract from the timeline: **UI-thread frame time**, **raster-thread frame time**, **worst
  frame**, **count of frames > 16.7 ms**, and the **99th percentile**. Fail the job if any regress
  beyond a tolerance vs the baseline stored in `tools/perf_harness/baselines/<device>.json`.
- **Golden tests** (`flutter_test` pixel-diff) gate *visual* correctness of ink so a "perf fix"
  can't silently change how strokes look (`research/flutter-ink-stack.md`). The commit-frame
  golden (wet→committed hand-off, [ink-engine §5.2](./ink-engine.md#52-commit-on-pointer-up))
  catches the one-frame flicker bug.
- Run on real devices in the lab where possible (a Firebase Test Lab / self-hosted device runner);
  an emulator/CI-VM run catches gross regressions but its absolute numbers are meaningless.

### 2.3 Synthetic input for repeatable tests

Real pens aren't reproducible. Drive the CI proxy with recorded/synthetic sample streams:

- Record a corpus of real strokes (handwriting, fast diagonals, tight loops, slow shading) as
  `InkSample` sequences with timestamps; replay them through the pipeline in tests. This makes
  latency/jank deterministic and diffable.
- Android can simulate a stylus over ADB (`debug.input.simulate_stylus_with_touch`,
  `research/android-stylus-capabilities.md`) for on-device automation.

### 2.4 Battery & thermal

Manual, in the lab: a scripted 2-hour writing session on an iPad Pro measured via Xcode Energy /
`powermetrics`-class tooling; target ≤ 12 % (decision 7). Watch for thermal throttling that would
drop ProMotion from 120→60 Hz mid-session — a throttled device that still hits 60 fps passes the
frame gate but should be noted.

### 2.5 Device lab

The minimum reference set (`tools/device_lab/`); every latency/jank claim MUST be validated on all
three tiers. Add devices, never remove the low-end floor.

| Role | Reference device | Why |
|---|---|---|
| **High tier (Apple)** | iPad Pro (M-series, ProMotion 120 Hz) + Apple Pencil Pro | 16 ms budget; Tier A Metal front-buffer; Pencil Pro extras (squeeze/roll/hover/haptics) |
| **High tier (Android)** | recent flagship tablet/phone with low-latency stylus (e.g. Galaxy Tab S-series + S Pen, or Pixel Tablet + USI 2.0) | Tier A Jetpack Ink / `androidx.graphics.lowlatency`; S Pen + USI paths |
| **Mid tier (Android)** | mid-range 2023–2024 phone/tablet, 90 Hz | 25 ms budget on realistic hardware |
| **Low-end floor (Android)** | **4 GB RAM, Snapdragon 680-class, 60 Hz, arm64** | the memory (<300 MB) and 60 fps floor; native-pivot trigger if unmet |
| **Web** | Chrome desktop (30 ms), plus iPad Safari (CanvasKit/JS, no WasmGC) and a mid Android Chrome | web budgets + the iOS-browser reality |
| **Foldable / large-screen** | a foldable + a Chromebook | window-class relayout, desktop windowing (`research/android-stylus-capabilities.md` §8) |

---

## 3. Memory strategy

Budget: **< 300 MB on a 4 GB Android during steady editing** (decision 7); scale up on iPad but
never leak. The dominant consumers are tile rasters, PDF page bitmaps, and audio buffers.

- **Tile raster LRU** ([ink-engine §6.2](./ink-engine.md#62-lru--memory-budget)): committed-ink
  tiles are an LRU cache bounded by a per-device budget (default ≤ 96 MB on 4 GB Android). Evict
  least-recently-visible tiles; they re-raster from vector strokes on demand. Never hold the whole
  document's tiles resident.
- **PDF page bitmaps** ([§5](#5-pdf--large-document-tiling)): only viewport ± one page resident;
  dispose off-screen page bitmaps; tile at high zoom rather than rasterising a whole page at full
  res (`research/pdf-and-audio-technology.md` A.5).
- **Vector strokes** are cheap (compressed deltas, [ink-engine §10](./ink-engine.md#10-serialisation));
  keep the current page's strokes in memory, lazily load neighbours, page others back to the store.
- **Images/audio** are content-addressed blobs streamed from disk, not held whole; audio decodes
  to a bounded ring during playback ([ADR-0015](../adr/0015-audio-pipeline.md)).
- **Shaders/textures** are precached and **reused** across frames, never per-stroke
  (`research/flutter-ink-stack.md`).
- **Isolates** copy only serialisable messages (compressed stroke bytes, not live objects); a
  long-lived storage/sync/index isolate avoids per-op spawn cost
  ([overview §6](./overview.md#6-threading--isolate-model)).
- **Web:** Dart isolates → Web Workers; large local data goes to OPFS/IndexedDB, not JS heap;
  multithreaded WASM (skwasm/whisper) needs COOP/COEP (`research/web-stylus-and-pwa-capabilities.md`).
- **Leak gates:** an integration test opens/closes 50 notebooks and asserts steady-state RSS
  returns to baseline (± tolerance); a sustained-write test asserts RSS stays under budget while
  drawing 10,000 strokes.

---

## 4. Startup

Budgets: **< 1.5 s iPad, < 2 s mid Android, < 3 s cached web PWA** cold start; **open a 1,000-page
notebook < 1 s** (decision 7).

- **Defer everything not needed for first ink.** Boot order: render the shell + last notebook's
  current page → make the editor interactive → *then* warm the storage/sync/index isolates, ML
  models, and cloud drive in the background. The user must be able to write before sync connects.
- **Never load the whole document.** Open the `.sanenote` manifest + current page only; lazily
  materialise other pages ([ink-engine §6.3](./ink-engine.md#63-large-notebooks-1000-pages)).
- **Guest mode is first-class** — no auth/network on the startup path (decision 5).
- **AOT + deferred components:** split rarely-used features (brush studio, PDF export, ML) into
  deferred libraries so they don't inflate first paint.
- **Web:** cache the PWA (service worker/Workbox precache) so a repeat load is < 3 s; the first
  ever load pays the CanvasKit (~1.5 MB) + Dart download cost — show a fast HTML splash before the
  engine boots (`research/web-stylus-and-pwa-capabilities.md`, `research/flutter-ink-stack.md`).
- **Measure** with an app-start trace (time to first frame, time to interactive editor) in the CI
  proxy; gate on regression.

---

## 5. PDF & large-document tiling

Notes are drawn *over* PDFs; the engine must scroll a 600-page PDF at 60 fps and never blow the
memory budget. Full engine decision in [ADR-0014](../adr/0014-pdf-engine.md); the performance
strategy (from `research/pdf-and-audio-technology.md` A.5, layered on `pdfrx`/PDFium):

- **Lazy page rendering:** rasterise only pages in/near the viewport; dispose off-screen page
  bitmaps. `pdfrx` and Syncfusion both do lazy/virtual scrolling.
- **Tile caching for zoom:** at high zoom, render the visible region in tiles at display DPI
  rather than the whole page at full resolution (avoids giant bitmaps); LRU-cap the tile cache to
  the memory budget (same tile machinery as ink, [ink-engine §6](./ink-engine.md#6-tiling--caching)).
- **Two-resolution scheme:** a cheap low-res preview render for fast scroll, replaced by full-res
  when scrolling settles.
- **Thumbnails:** pre-render small page thumbnails on a background isolate for the scrubber/outline
  so users can jump across 600 pages; cache to disk.
- **Background isolates:** PDFium rasterisation and text-index building run off the UI isolate.
- **Incremental search:** stream results page-by-page rather than blocking on a whole-doc scan.
- **Annotation overlay** (our ink over the PDF) uses the same wet/committed layering as a blank
  page; PDF page raster is the "background" layer ([ink-engine §5.1](./ink-engine.md#51-layer-stack-bottom--top)).

---

## 6. Jank triage runbook

When a frame blows the budget, work this checklist in order. "Jank" = any frame > the display's
frame time (16.7 ms @ 60 Hz, 8.3 ms @ 120 Hz), especially while a stroke is active.

1. **Reproduce with a timeline.** Run the scenario under `flutter drive --profile` (or DevTools
   timeline / `--trace-skia` / performance overlay). Identify whether the slow frame is
   **UI-thread** (build/layout/Dart) or **raster-thread** (GPU/paint).
2. **Confirm the renderer.** Is Impeller active (iOS always; Android API 29+ Vulkan)? An
   unexpected **Skia GL fallback** on Android changes the profile and can reintroduce shader jank.
   Check the launch logs / `--enable-impeller`.
3. **Shader compilation jank?** First-use of a stroke effect/shader. Under Impeller this should be
   gone (offline compilation); if seen on web (CanvasKit) or an Android GL fallback, **precompile/
   warm** the shader and **reuse** the `FragmentShader` object (`research/flutter-ink-stack.md`).
4. **Is the whole canvas repainting?** The commonest ink jank: a pointer move invalidating more
   than the wet `RepaintBoundary`. Verify committed-ink tiles are **not** repainting on draw
   (DevTools "Highlight repaints"). Ensure the active stroke drives repaint via a `Listenable`,
   not `setState` (`research/flutter-ink-stack.md`, [ink-engine §5](./ink-engine.md#5-incremental-rendering)).
5. **Build/layout on the hot path?** No business logic in `build`; no allocation in the paint
   loop; `const` widgets; no rebuilding the widget tree per sample.
6. **Cross-isolate hop on the draw path?** Persistence/index/sync/tessellation must be off-isolate;
   a message to another isolate on `PointerMove` is a bug ([overview §6](./overview.md#6-threading--isolate-model)).
7. **GC pressure?** Per-sample allocations (new lists/objects each move) cause GC pauses.
   Pre-allocate the sample buffer; reuse `Path`/`Paint`/shader objects.
8. **Tile churn?** Zoom re-rastering every pinch delta instead of on bucket change; too-small tiles;
   unbounded tile cache. Check the zoom-bucket logic ([ink-engine §6.1](./ink-engine.md#61-tile-model)).
9. **Big bitmap?** A full-page PDF or image rasterised at full res instead of tiled/downsampled
   ([§5](#5-pdf--large-document-tiling)).
10. **Logging on the hot path?** Draw-loop code must not log in profile/release
    ([overview §8.2](./overview.md#82-logging-one-facade-zero-content)).
11. **Web specifics:** no `desynchronized` honoured (Safari inconsistent), main-thread contention
    (move rendering to an OffscreenCanvas/Worker where reachable), or a plugin main-thread-only op
    (`research/web-stylus-and-pwa-capabilities.md`).
12. **Still slow → capture, file, baseline.** Attach the timeline + device + OS to the issue,
    add a regression test to the corpus (§2.3), and if it's a device-class ceiling, escalate to
    the native-pivot review ([ADR-0008](../adr/0008-ink-pipeline-and-low-latency-surfaces.md)).

---

## 7. Rendering rules of thumb (do / don't)

| Do | Don't |
|---|---|
| Drive ink repaint from a `Listenable` (`repaint:` on `CustomPainter`) | `setState` per pointer move |
| Isolate the wet stroke in its own `RepaintBoundary` / native `Texture` | Repaint committed tiles or UI chrome on draw |
| Flatten finished strokes into tiled `Picture`/`Image` caches | Re-draw every dried stroke each frame |
| Precache + reuse shaders/paints/paths | Allocate `Paint`/`FragmentShader`/`Path` per stroke |
| Tessellate finished strokes off-isolate under load | Tessellate/persist/sync on the UI isolate |
| Tile large pages/PDFs; LRU-bound the cache | Hold one giant bitmap or all tiles resident |
| Keep raw stream for fidelity; smooth ourselves | Enable `resamplingEnabled` on the draw path |
| Feature-detect Tier A per device; degrade to Tier B | Assume a platform ⇒ a tier |

---

## 8. "Lag-proof" checklist (every editor PR must pass)

A PR that touches the editor, ink pipeline, brush engine, render layer, PDF overlay, or any code
on the draw path MUST tick every box. CI enforces the automatable ones; the reviewer enforces the
rest. (Mirror of the perf gate in [overview §10 step 11](./overview.md#10-how-to-add-a-feature-end-to-end-walkthrough).)

- [ ] **Latency budget met** on the relevant tier: ≤ 16 ms iPad / ≤ 25 ms mid Android / ≤ 30 ms
      web Chrome (CI proxy shows no regression; camera re-measured if the wet path changed).
- [ ] **60 fps floor** held (120 where the display allows); **no frame > 16.7 ms while writing**
      in the `flutter drive --profile` timeline.
- [ ] **Only the wet layer repaints on a pointer move** (DevTools repaint highlight clean;
      committed tiles untouched).
- [ ] **No work added to the UI isolate** on the draw path (no persist/index/sync/tessellate/log/
      allocate per sample).
- [ ] **No per-sample allocations**; shaders/paints/paths reused.
- [ ] **Golden tests pass** (stroke rendering unchanged; commit-frame hand-off has no flicker).
- [ ] **Memory:** sustained-write test stays under budget; open/close leak test returns to
      baseline; new bitmaps are tiled/bounded.
- [ ] **Startup** unaffected (or improved); no new synchronous work before first interactive frame.
- [ ] **Impeller still active** on target builds (no accidental Android GL fallback).
- [ ] **Tier B still works** with `sane_ink_surface` reporting "unavailable" (graceful
      degradation proven).
- [ ] **Web** path exercised (CanvasKit/JS) — no reliance on a Tier-A-only API; degrades on iOS
      Safari (no WasmGC).
- [ ] **Perf baseline updated** intentionally (never silently loosened) if the change legitimately
      shifts numbers; the change is called out in the PR.

---

## 9. Compatibility matrix

Supported surfaces (decision 7). "Tier" = default inking tier ([ink-engine §0](./ink-engine.md#0-two-tiers-one-sample-stream)).
Capability is a **runtime query**, not a platform assumption — a supported OS on weak hardware may
fall back to Tier B.

### 9.1 OS / platform support

| Platform | Min version | Renderer | Default tier | Wet-ink API | Notes |
|---|---|---|---|---|---|
| iPadOS | **17+** | Impeller (Metal) | A | `CAMetalLayer` front-buffer, `UIUpdateLink`, coalesced/predicted touches | ProMotion 120 Hz; Pencil Pro extras (`research/apple-pencil-ipados-capabilities.md`) |
| iOS (iPhone) | **17+** | Impeller (Metal) | A/B | as iPad (no ProMotion on non-Pro) | phone layouts |
| Android (phone/tablet) | **10+ (API 29)** | Impeller (Vulkan), GL fallback < API 29/no-Vulkan | A where low-latency stylus present, else B | Jetpack Ink + `androidx.graphics.lowlatency` (~4 ms) | arm64-v8a, armeabi-v7a, x86_64 (`research/android-stylus-capabilities.md`) |
| Web — Chrome/Edge | **120+** | CanvasKit (default) / skwasm (COOP/COEP) | B | Pointer Events, `desynchronized` canvas, Ink API (Chromium) | best web tier (`research/web-stylus-and-pwa-capabilities.md`) |
| Web — Safari | **17+** | CanvasKit/JS (**no WasmGC → no skwasm**) | B | Pointer Events; altitude/azimuth + coalesced/predicted in 18.2+ | iPad Safari is the constraining web target |
| Web — Firefox | **125+** | CanvasKit/JS | B | Pointer Events; predicted-events narrow | — |
| Web — Samsung Internet | current | CanvasKit/JS | B | Chromium-based; tracks Chrome with lag | — |

### 9.2 CPU architectures

| Arch | Platforms | Status |
|---|---|---|
| **arm64-v8a / arm64** | Android, iOS/iPadOS, Apple Silicon web | primary; all perf budgets validated here |
| **armeabi-v7a** | older 32-bit Android | supported; low-end floor may run here — validate memory carefully |
| **x86_64** | Android emulator, some Chromebooks/tablets | supported (CI/emulator + ChromeOS) |
| wasm32 (skwasm) | web (COOP/COEP, non-iOS) | optional web fast path; JS/CanvasKit fallback always present |

### 9.3 GPU tiers & refresh rates

| Tier | Examples | Refresh | Expectation |
|---|---|---|---|
| High | Apple M-series, flagship Adreno/Mali | 120 Hz (ProMotion / high-refresh) | 120 fps, ≤ 16–25 ms |
| Mid | mid-range Adreno/Mali | 90/120 Hz | 60–90 fps, ≤ 25 ms |
| Low | SD 680-class, entry Mali | 60 Hz | **60 fps floor**, Tier B acceptable; native-pivot trigger if unmet |
| Web GPU | WebGL2 everywhere; WebGPU Chrome/Edge, FF 141+, Safari 26 | display-dependent | 60 fps Chrome desktop; ship WebGL2 fallback (`research/web-stylus-and-pwa-capabilities.md`) |

### 9.4 Stylus types

| Stylus | Platform | Data available | Tier | Source |
|---|---|---|---|---|
| Apple Pencil Pro | iPadOS 17.5+ | pressure, tilt, azimuth, **roll**, squeeze, hover, haptics, double-tap | A | `research/apple-pencil-ipados-capabilities.md` |
| Apple Pencil 2 | iPadOS | pressure, tilt, azimuth, hover (M-iPads), double-tap | A | " |
| Apple Pencil USB-C | iPadOS | tilt, hover; **no pressure**, no double-tap (verify matrix) | A/B | " |
| Apple Pencil 1 | iPadOS/iOS | pressure, tilt, azimuth | A/B | " |
| S Pen | Samsung | pressure, tilt, orientation, barrel button; Air actions via S Pen Remote SDK | A | `research/android-stylus-capabilities.md` §9 |
| USI 2.0 | Chromebook, Pixel Tablet | up to 4096 pressure, tilt, hardware palm rejection — via standard `MotionEvent` | A | `research/android-stylus-capabilities.md` §8 |
| Generic active/capacitive | Android | pressure (if supported), tilt, buttons | A/B | " |
| Web pen (Pointer Events) | Chromium/Safari 18.2+/FF | pressure, tiltX/Y, altitude/azimuth (18.2+), twist, coalesced/predicted | B | `research/web-stylus-and-pwa-capabilities.md` |
| Finger / touch | all | position, contact size; no pressure ⇒ synthesise from velocity | A/B | palm-rejection heuristics ([ink-engine §1.1](./ink-engine.md#11-a-capture)) |

### 9.5 Foldables & large screens

Support foldables and large-screen window classes (compact/medium/expanded/large/extra-large;
`research/android-stylus-capabilities.md` §8). The editor relayouts to list/detail two-pane on
expanded widths (`docs/design/screens-and-flows.md`), survives fold/unfold and multi-window
resize at runtime, and on Android 16 (API 36, sw ≥ 600 dp) honours forced resizability +
edge-to-edge. iPadOS 26 windowing (resizable/overlapping windows, additive window-per-note) is
supported where the platform provides it (`research/apple-pencil-ipados-capabilities.md` §11).

---

## Appendix — cross references

| For… | See |
|---|---|
| System map, data flow, isolates, budgets appendix | [`architecture/overview.md`](./overview.md) |
| The ink pipeline these budgets measure | [`architecture/ink-engine.md`](./ink-engine.md) |
| Why two tiers + native front-buffer, the M0 spike, native-pivot exit criterion | [ADR-0008](../adr/0008-ink-pipeline-and-low-latency-surfaces.md) |
| Why Flutter, renderer choices, risk gate | [ADR-0001](../adr/0001-flutter-single-codebase.md) |
| PDF engine and huge-doc strategy | [ADR-0014](../adr/0014-pdf-engine.md) |
| Web/PWA constraints (COOP/COEP, no WasmGC on iOS) | [ADR-0010](../adr/0010-web-pwa-strategy.md) |
