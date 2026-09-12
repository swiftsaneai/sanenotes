# Sane Notes — Ink Engine

> Audience: an autonomous coding agent (or engineer) with **zero prior context** who must
> build or extend the drawing surface without regressing the wet-ink latency budgets in
> [locked decision 7](./overview.md#appendix-a--locked-decisions-this-doc-must-honour).
> Read [`overview.md`](./overview.md) first for the system map and the pen-stroke data flow,
> then this document for the ink pipeline in detail, then
> [`rendering-and-performance.md`](./rendering-and-performance.md) for the frame budgets and
> the measurement harness that gate every change here.
>
> Status: **living document**, v1 (M0 Foundations). Decisions are recorded in
> [ADR-0008](../adr/0008-ink-pipeline-and-low-latency-surfaces.md) (pipeline + surfaces) and
> [ADR-0009](../adr/0009-brush-engine.md) (brush model). Update this doc in the same PR that
> changes a stage of the pipeline, a serialisation byte layout, or a smoothing parameter.

The ink engine is the product. Perceived quality of a note app is dominated by how the wet
stroke tracks the pen tip, and by how honest the dried stroke looks. This document specifies
the whole path from an OS pointer sample to a persisted, hit-testable, recognisable stroke:

1. [Input pipeline: raw → coalesced → predicted → filtered](#1-input-pipeline)
2. [Stabilisation: 1€ filter, moving average, streamline](#2-stabilisation)
3. [Stroke geometry: outline, taper, pressure/tilt/velocity mapping](#3-stroke-geometry)
4. [Brush model: parameter schema, textures, blend](#4-brush-model)
5. [Incremental rendering: wet layer → committed Flutter layer](#5-incremental-rendering)
6. [Tiling & caching for large pages](#6-tiling--caching)
7. [Hit-testing & spatial index (R-tree)](#7-hit-testing--spatial-index)
8. [Selection / lasso math](#8-selection--lasso-math)
9. [Shape recognition pipeline](#9-shape-recognition)
10. [Serialisation: delta + varint + zstd](#10-serialisation)

Ownership: the pure-Dart stages (capture, filter, geometry, serialise) live in **`sane_ink`**;
painting/tessellation lives in **`sane_render`**; brush parameters/presets in
**`sane_brushes`**; the model commit (CRDT `Stroke` object) in **`sane_core`**; the native
low-latency surface in the plugin **`sane_ink_surface`**; stylus extras (coalesced native
capture, barrel/squeeze/hover/haptics) in **`sane_stylus`**. The dependency DAG
([overview §5](./overview.md#5-package-dependency-rules-what-may-import-what)) is
`sane_render → sane_brushes → sane_ink → sane_core → sane_crypto`; never add a sideways edge.

---

## 0. Two tiers, one sample stream

Every device runs one of two inking **tiers**, chosen at runtime by capability query, not by
platform string (see [overview §2](./overview.md#2-the-two-runtime-tiers-per-surface) and
[ADR-0008](../adr/0008-ink-pipeline-and-low-latency-surfaces.md)):

| Tier | Where | Wet-ink surface | Budget (decision 7) |
|---|---|---|---|
| **A — native fast path** | iPad ProMotion; Android tablet/phone with low-latency stylus + API 29+ | native front-buffer (`sane_ink_surface`: Metal/`CAMetalLayer` on Apple, `androidx.graphics.lowlatency` / Jetpack Ink on Android) composited via Flutter `Texture` | ≤ 16 ms iPad, ≤ 25 ms mid Android |
| **B — pure-Flutter path** | Web (all browsers); any device with no native surface; low-end fallback | `Listener` → `sane_ink` → `CustomPainter` in `RepaintBoundary`; Impeller (mobile/desktop) or CanvasKit/skwasm (web) | ≤ 30 ms web Chrome; best-effort elsewhere |

**Critical invariant:** both tiers consume the **same filtered sample stream** and produce the
**same dried geometry**. Tier A only changes *who paints the wet (in-progress) stroke ahead of
the next Flutter frame*; on pointer-up the stroke is finalised identically and handed to
`sane_core`. This means a bug in geometry or serialisation reproduces on both tiers, and the
golden tests ([rendering §"lag-proof checklist"](./rendering-and-performance.md#8-lag-proof-checklist-every-editor-pr-must-pass))
run against Tier B on CI where there is no device.

---

## 1. Input pipeline

The pipeline turns a noisy, unevenly-timed, device-specific pointer stream into a clean list of
`InkSample`s. Stages run in order; each is a pure function so they are unit-testable headless.

```
OS pointer samples
  → (A) capture              raw PointerEvent / native coalesced touches
  → (B) normalise            → InkSample (logical px, normalised pressure, tilt, azimuth, ts)
  → (C) coalesce             fold every sub-frame sample into the stroke (no data loss)
  → (D) predict              append short-horizon predicted lead (wet only, discarded)
  → (E) filter/stabilise     1€ filter + streamline + optional motion-filter
  → (F) geometry             outline / centreline for the brush (sane_render)
```

### 1.1 (A) Capture

- The editor canvas is wrapped in a raw **`Listener`** (`onPointerDown/Move/Up/Cancel/Hover`),
  **not** a `GestureDetector` — a gesture recognizer in the arena adds latency and can "win"
  the pointer we need for ink (`research/flutter-ink-stack.md`). Pan/zoom is served by a
  coexisting `RawGestureDetector`/`InteractiveViewer` disambiguated by `event.kind`.
- **Palm/finger rejection** is a `kind` branch: `PointerDeviceKind.stylus` and `invertedStylus`
  draw/erase; `touch` routes to pan/zoom unless the user enabled "finger draws." On Android also
  honour `PointerEvent`'s cancel semantics (`ACTION_CANCEL` / Android 13 `FLAG_CANCELED`) to
  retract a stroke started by a palm (`research/android-stylus-capabilities.md`). On web there is
  no palm flag — use the pen-priority heuristic (ignore `touch` while a `pen` pointer is active
  or hovering; large `width/height` ≈ palm) (`research/web-stylus-and-pwa-capabilities.md`).
- **Coalesced sub-frame samples** are the biggest fidelity lever and Flutter's biggest gap.
  Pens sample at 120–240 Hz; the display and Flutter's `PointerMoveEvent` dispatch run at
  60–120 Hz, so between frames the framework drops intermediate points. iOS `UIEvent
  .coalescedTouches(for:)` and Android `MotionEvent.getHistorical*` expose them; **Flutter does
  not surface a first-class per-frame coalesced array** (`research/flutter-ink-stack.md` — flagged
  unverified/gap). Therefore:
  - **Tier A:** `sane_stylus` captures coalesced/historical touches **natively** and feeds them
    to both the native wet surface and (mirrored) to `sane_ink` via the platform channel as a
    batch per frame. This is the fidelity path.
  - **Tier B / web:** consume `PointerMoveEvent`s as delivered. On web, `sane_ink`'s JS-interop
    shim MAY call `PointerEvent.getCoalescedEvents()` where the Flutter web engine exposes the
    raw DOM event (**verify** reachability through Flutter's canvas before relying on it;
    `research/web-stylus-and-pwa-capabilities.md` confirms Safari 18.2+ and Chromium support the
    API, but Flutter's canvas may not hand it through).
- **Do NOT enable `GestureBinding.resamplingEnabled` on the draw path.** It resamples pointer
  events to frame time, trading latency for smoothness; we want fidelity and run our own
  smoothing (`research/flutter-ink-stack.md`).

### 1.2 (B) Normalise → `InkSample`

The canonical in-memory sample. All downstream stages operate on this; capture is the only
platform-aware stage.

```dart
/// One raw pointer sample after normalisation. Immutable value object (sane_ink).
class InkSample {
  final double x, y;        // logical pixels, page space (post pan/zoom inverse-transform)
  final double pressure;    // 0.0–1.0 normalised (see below); 0 means "unknown"
  final double tilt;        // radians, 0 = perpendicular to surface … π/2 = flat
  final double azimuth;     // radians, barrel/orientation direction (0–2π)
  final double twist;       // radians, barrel roll (Pencil Pro / twist); 0 if unavailable
  final int    tMicros;     // monotonic timestamp, microseconds since stroke start
  final PointerKind kind;   // stylus | invertedStylus | touch | mouse
  final bool   pressureIsReal; // false → synthesise from velocity (see §3.3)
}
```

Normalisation rules (MUST):

- **Pressure** ranges differ per device and can exceed the nominal max. Divide by
  `pressureMax` where the platform reports it; clamp to `[0,1]`; if the device reports no
  pressure (USB-C Apple Pencil, most fingers, most web mice), set `pressure = 0` and
  `pressureIsReal = false` so §3.3 synthesises pressure from velocity. Sources for per-platform
  ranges: `research/apple-pencil-ipados-capabilities.md` (`UITouch.force` / `maximumPossibleForce`),
  `research/android-stylus-capabilities.md` (`getPressure` may exceed 1),
  `research/web-stylus-and-pwa-capabilities.md` (`pressure` already 0–1).
- **Tilt/azimuth** conventions differ. Flutter `PointerEvent.tilt` is `0…π/2` and `orientation`
  is the azimuth; iOS uses `altitudeAngle` (π/2 = perpendicular — **inverse of Flutter's tilt
  sense**) + `azimuthAngle`; Android uses `AXIS_TILT` (0 perpendicular) + `AXIS_ORIENTATION`;
  web has `tiltX/tiltY` **and** the newer `altitudeAngle`/`azimuthAngle` (Safari 18.2+). Convert
  everything to the `InkSample` convention (`tilt` 0 = perpendicular). Keep a single conversion
  table in `sane_ink/lib/src/capture/tilt_convert.dart`; **verify** each platform's sign at the
  spike, because a flipped tilt inverts every tilt-driven brush.
- **Twist/barrel roll** is Apple Pencil Pro / high-end only and arrives first as an estimate
  refined over Bluetooth; on Apple, capture the corrected value in
  `touchesEstimatedPropertiesUpdated` and patch the stored sample by `estimationUpdateIndex`
  (`research/apple-pencil-ipados-capabilities.md`). Default `twist = 0`.
- **Timestamp** is monotonic microseconds relative to `PointerDownEvent`. Never use wall-clock —
  it is used for velocity, prediction discard, and the audio-sync clock
  ([ADR-0015](../adr/0015-audio-pipeline.md)).

### 1.3 (C) Coalesce

Append every captured sub-frame sample (native coalesced on Tier A; the delivered move on
Tier B) into the active `StrokeBuilder.samples` list in order. Deduplicate only exact
`(x,y,tMicros)` repeats. **No decimation here** — RDP/decimation happens after the stroke is
finished ([§10.1](#101-what-we-store)); the live buffer keeps full fidelity so smoothing has
signal to work with.

### 1.4 (D) Predict

To hide the residual pen-to-pixel latency, the wet stroke is drawn slightly *ahead* of the last
real sample using a short predicted lead, then the prediction is discarded and replaced when the
next real sample arrives. This is standard practice on every platform:

- **Apple:** `UIEvent.predictedTouches(for:)` (`research/apple-pencil-ipados-capabilities.md`).
- **Android:** `androidx.input:input-motionprediction` `MotionEventPredictor.predict()`
  (`research/android-stylus-capabilities.md`).
- **Web:** `PointerEvent.getPredictedEvents()` (Chromium; Safari 18.2+) or the Ink API
  `DelegatedInkTrailPresenter` for OS-level trail (Chromium only)
  (`research/web-stylus-and-pwa-capabilities.md`).
- **Flutter/Tier B fallback:** if no platform predictor is reachable, `sane_ink` extrapolates
  a **≤ 2-frame** lead by constant-velocity + curvature extension of the filtered tail.

Rules (MUST):
- Prediction points are drawn on the **wet layer only** and are **never** added to the persisted
  stroke, never fed to filtering state, and never recognised. Tag them `predicted = true`.
- Cap the prediction horizon at **the smaller of the platform's suggestion or ~2 display
  frames** (~16–33 ms). Over-prediction causes visible "whiskers" overshooting on direction
  changes, which look worse than latency.
- On Tier A native surfaces, prefer the platform's own predictor (it is tuned to the digitizer);
  Tier B uses the Dart extrapolator.

### 1.5 (E) → filtering is [§2](#2-stabilisation); (F) → geometry is [§3](#3-stroke-geometry).

---

## 2. Stabilisation

Human hands wobble; digitizers add quantisation noise; low-pressure starts jitter. Procreate
ships **three** distinct smoothing philosophies and treats them as separate, per-brush controls
(`research/procreate.md`): **StreamLine** (curve-fit smoothing), **Stabilization** (moving
average of the input), and **Motion Filtering** (delete the extremities of wobble — a tremor
aid). Sane Notes adopts the same three-mode model but implements the default with a **1€
filter**, which gives low latency at low speed and low overshoot at high speed better than a
fixed moving average.

### 2.1 Filter chain and order

```
filtered = motionFilter( streamline( oneEuro( raw ) ) )
```

Order matters: 1€ removes high-frequency jitter first, streamline fits the smoothed curve, and
motion-filtering (off by default) is a final tremor pass. Each stage is optional per pen preset.

### 2.2 1€ filter (default stabiliser)

The 1€ filter (Casiez, Roussel, Vogel 2012) is an adaptive low-pass whose cutoff frequency rises
with pointer speed: slow movements are smoothed hard (kills jitter), fast movements are barely
smoothed (kills lag). Applied independently to `x`, `y`, and `pressure`.

Parameters (per pen preset, stored in `sane_brushes`):

| Param | Meaning | Default | Range | Notes |
|---|---|---|---|---|
| `minCutoff` | cutoff at rest (Hz) | `1.0` | `0.3–3.0` | lower = smoother/laggier at slow speed |
| `beta` | speed coefficient | `0.007` | `0.0–0.05` | higher = less lag on fast strokes |
| `dCutoff` | derivative cutoff (Hz) | `1.0` | `0.5–2.0` | smooths the speed estimate |

Preset guidance (MUST expose as a single "Stabilisation" slider 0–100 that interpolates these):
- **Fineliner / technical pen:** `minCutoff 1.5, beta 0.01` (crisp, minimal lag).
- **Fountain / brush pen:** `minCutoff 0.8, beta 0.007` (smoother, forgiving).
- **Handwriting default:** `minCutoff 1.0, beta 0.007`.

Reference implementation lives in `sane_ink/lib/src/filter/one_euro.dart`; it is stateful per
active stroke and reset on pointer-down. Unit tests assert: (a) zero input velocity converges to
input within `minCutoff`; (b) a step input does not overshoot; (c) output lag at 300 mm/s is
below the latency budget frame.

### 2.3 Streamline (curve-fit)

After 1€, optionally apply a streamline pass equivalent to `perfect_freehand`'s `streamline`
option (0–1): each new point is pulled a fraction toward the previous smoothed point,
`p' = lerp(prevSmoothed, p, 1 - streamline)`. This is what makes long, sweeping strokes elegant.
Default `streamline = 0.5`; fineliner `0.3`; brush pen `0.6`. `perfect_freehand` applies this
internally when you pass the option, so on Tier B we pass `streamline`/`smoothing` straight to
`getStroke` rather than re-implementing (`research/flutter-ink-stack.md`).

### 2.4 Motion filter (tremor aid, off by default)

An accessibility feature (Procreate "Motion Filtering"; `research/procreate.md`,
`research/accessibility-i18n-and-inclusive-design.md`): instead of averaging, it **discards
samples whose deviation from the local trend exceeds a threshold**, removing large tremor spikes
while preserving intended direction. Exposed in Settings → Accessibility as "Steady hand" with an
`amount` (deviation threshold) and an `expression` (how much natural variation to add back).
MUST be off by default and never applied silently.

### 2.5 Estimated-property reconciliation

On Apple, `force` and `rollAngle` arrive as estimates then get corrected over Bluetooth. When
`touchesEstimatedPropertiesUpdated` fires, patch the affected `InkSample`s (matched by
`estimationUpdateIndex`) **before** the stroke is finalised, and if the stroke already dried,
re-run geometry for the affected span. `sane_stylus` owns this;
`research/apple-pencil-ipados-capabilities.md` §3.

---

## 3. Stroke geometry

Geometry converts the filtered centreline + per-point dynamics into the **outline polygon** that
gets filled (for pressure/velocity pens) or the **stamped path** (for textured brushes, §4). The
default text/ink pens use a `perfect_freehand`-style variable-width outline; textured brushes use
the stamp-along-path model.

### 3.1 Variable-width outline (perfect-freehand model)

`perfect_freehand`'s `getStroke(points, options)` returns a **filled outline polygon** for a
pressure stroke; the Dart port is battle-tested inside Saber and maintained by the same author
(`research/flutter-ink-stack.md`). We wrap it in `sane_ink` behind our own `StrokeGeometry`
interface so we can later swap in a Rust/`flutter_rust_bridge` tessellator without touching
callers ([ADR-0001](../adr/0001-flutter-single-codebase.md) Rust-core trigger).

`StrokeOptions` we expose (mapped onto `perfect_freehand`):

| Option | Meaning | Typical |
|---|---|---|
| `size` | base diameter (logical px) | pen 2.0, marker 12.0 |
| `thinning` | how much pressure/velocity changes width, −1…1 | 0.5 |
| `smoothing` | outline smoothing 0…1 | 0.5 |
| `streamline` | input streamline 0…1 (see §2.3) | 0.5 |
| `simulatePressure` | synthesise pressure from velocity when none | true |
| `taperStart`, `taperEnd` | length (px) or bool | pen: 0; brush pen: on |
| `capStart`, `capEnd` | round the ends | true |

The outline is then filled with the brush colour/alpha and (for textured pens) clipped to a grain
texture (§4). For the fill path use a single `Path` with `PathFillType.nonZero`.

### 3.2 Taper

Taper is the thin→thick→thin envelope along the stroke and is what makes ticks, checkmarks and
handwriting feel intentional (`research/procreate.md` §2.3 Taper). Two independent contributions:

- **Dynamic taper** from pressure/velocity (§3.3) — the width at each sample.
- **End taper** — a fixed ramp over the first/last N px, applied even when pressure is real, so
  strokes don't start/end with a blunt dot. Separate amounts for start and end; a pressure-driven
  option and a fixed fallback (so non-pressure styluses and fingers still taper).

Store taper as part of the pen preset, not the stroke, so re-tessellation after a settings change
is deterministic.

### 3.3 Pressure / tilt / velocity → width & opacity mapping

Every visual property MUST be bindable to an **input source** through an **editable response
curve**, not a scalar — this is the single most important lesson from Procreate's engine
(`research/procreate.md` §"Key architectural insights"). The mapping is:

```
width_i   = clamp(size * f_size(source_i),   minWidth, maxWidth)
alpha_i   = clamp(baseAlpha * f_alpha(source_i), 0, 1)
```

where `source_i` for each sample is one of:

- **Pressure** (`InkSample.pressure`) when `pressureIsReal`.
- **Velocity** — `speed_i = |Δposition| / Δt`, normalised against a per-pen `speedRange`. Fast =
  thin, slow = thick gives the classic fountain-pen look and works on devices with **no**
  pressure (`research/procreate.md` "velocity-based thickness"). This is the default `source`
  when `pressureIsReal == false`.
- **Tilt** (`InkSample.tilt`) — drives the pencil "shading" width: tilting the pencil widens and
  softens the mark, exactly how graphite shading works (`research/apple-pencil-ipados-capabilities.md`
  tilt shading; `research/procreate.md` Tilt→Size/Opacity/Gradation).

`f_size` / `f_alpha` are piecewise-cubic curves with up to 4 editable nodes (Procreate's
"Pressure graph" / "Tilt graph"). A "soft nib" and a "firm nib" are just two different curves.
An app-wide **pressure sensitivity** curve pre-multiplies every pen's curve
(`research/procreate.md` §8). Serialise curves as node lists in the pen preset (§4.2).

`minWidth`/`maxWidth` and `minAlpha`/`maxAlpha` **clamp** the sidebar sliders so a preset can't
be pushed to uselessness (Procreate Min/Max, `research/procreate.md` §2.3 Properties).

---

## 4. Brush model

Detailed rationale and the `.sanepen` share format are in
[ADR-0009](../adr/0009-brush-engine.md); this section is the runtime schema the engine consumes.

### 4.1 The stamp-along-path primitive

Adopt Procreate's proven abstraction: a brush is a **Shape** (a nib stamp image) carrying an
internal **Grain** (texture), deposited repeatedly along the **Path** of the stroke; every
parameter modulates *how the stamp is placed, sized, coloured and blended as it walks the path*
(`research/procreate.md` §2.1, §"Brush engine model"). This one model expresses all the note pens
we need — fineliner, fountain pen, pencil (tilt-shaded), marker/highlighter, brush/calligraphy
nib, dashed/dotted, pattern pen — as parameter sets, not bespoke code. Android's Jetpack Ink
uses the analogous `BrushFamily`/`StockBrushes` model (`research/android-stylus-capabilities.md`).

Two render strategies, chosen by `BrushKind`:
- **`outline`** — the variable-width filled polygon of §3 (fineliner, fountain, brush pen). Fast,
  crisp, resolution-independent. **Default for handwriting.**
- **`stamped`** — walk the path placing the Shape stamp at `spacing` intervals, textured by Grain
  (pencil, marker with paper grain, pattern pen). Costs more; used where texture matters.

### 4.2 Parameter schema

The pen preset (`sane_brushes/lib/src/pen_preset.dart`). Grouped after Procreate's Brush Studio
tabs but trimmed to what a note app needs. All numeric params support a scalar **or** an input
binding `{source: pressure|tilt|velocity|twist|random, curve: [nodes]}`.

```jsonc
{
  "id": "sane.pen.fountain",           // stable id; user copies get a new uuid
  "schema": 1,
  "name": "Fountain Pen",
  "kind": "outline",                    // outline | stamped
  "size": 2.4,                          // base diameter, logical px
  "minWidth": 0.4, "maxWidth": 8.0,     // clamps
  "color": "ARGB or 'inherit'",         // 'inherit' = current ink colour
  "baseAlpha": 1.0, "minAlpha": 0.0, "maxAlpha": 1.0,

  "dynamics": {                          // §3.3 input→output
    "widthSource":  { "source": "velocity", "curve": [[0,1.0],[1,0.35]] },
    "alphaSource":  { "source": "pressure", "curve": [[0,0.6],[1,1.0]] },
    "tiltWidth":    { "source": "tilt",     "curve": [[0,1.0],[1,1.6]] }
  },

  "taper": { "start": 6.0, "end": 10.0, "pressure": true, "fixedFallback": true },

  "stabilise": { "minCutoff": 0.8, "beta": 0.007, "dCutoff": 1.0,
                 "streamline": 0.6, "motionFilter": false },

  "shape": {                             // stamped kind only
    "source": "asset://nib_chisel.png", // or built-in id
    "roundness": 0.4,                    // squash for calligraphy nibs
    "inputStyle": "azimuth",             // touch | azimuth | azimuthRoll
    "scatter": 0.0, "count": 1, "flipX": false, "flipY": false,
    "filtering": "improved"              // none | classic | improved(AA)
  },

  "grain": {                             // stamped kind only
    "source": "asset://paper_grain.png",
    "behaviour": "texturized",           // moving | texturized (fixed to page)
    "scale": 1.0, "depth": 0.7, "depthJitter": 0.1, "blend": "multiply"
  },

  "spacing": 0.06,                        // stamp spacing as fraction of size (stamped)
  "spacingJitter": 0.0,

  "blend": {                              // §4.4
    "mode": "normal",                     // normal | multiply | ...
    "flow": 1.0, "wetEdges": 0.0
  },

  "provenance": { "author": "...", "createdAt": "iso8601",
                  "resetPoint": { /* immutable defaults for 'Reset Pen' */ } }
}
```

### 4.3 Built-in pens (M1)

MUST ship these presets, each a pure parameter set over §4.1 (mapping in `research/procreate.md`
§"Ideas for Sane Notes"):

| Pen | kind | Key params |
|---|---|---|
| Fineliner | outline | high stabilise, thin, no taper, crisp |
| Fountain pen | outline | velocity→width, taper on, mild pressure→alpha |
| Ballpoint | outline | low pressure sensitivity, uniform width |
| Pencil | stamped | paper grain (texturized), tilt→width/alpha shading |
| Marker / Highlighter | stamped or outline | chisel shape, `blend.mode = multiply`, own highlight layer |
| Brush / calligraphy | outline+roundness | azimuth-driven nib angle, strong taper |
| Dashed / dotted | stamped | high `spacing`, small round shape |
| Pattern pen | stamped | motif shape, wide spacing, optional scatter/colour jitter |

### 4.4 Blend & layers

- **Highlighter MUST use `multiply`** so it goes *behind* ink and never darkens on overlap, and
  MUST live on a separate highlight layer/object so it can be toggled and never obscures text
  (`research/procreate.md` §"Marker/highlighter"; document model layers, decision 4).
- Blend modes map to `dart:ui` `BlendMode` on Tier B. Fragment shaders (`FragmentProgram`) are
  used for pencil grain and highlighter edge blending; they compile offline under Impeller
  (no first-use jank) but on web run under CanvasKit/skwasm — keep shader use behind a
  capability check and provide a plain-fill fallback (`research/flutter-ink-stack.md`).
- **Textures** (Shape/Grain images) are content-addressed blobs in the store, referenced by hash;
  built-ins ship as assets. Precache and **reuse** `FragmentShader`/`ImageShader` objects across
  frames — never allocate per stroke (`research/flutter-ink-stack.md`).

---

## 5. Incremental rendering

Only the **active** (wet) stroke may repaint every frame; everything already drawn is a cached
raster. This is the difference between 120 fps and jank.

### 5.1 Layer stack (bottom → top)

1. **Page background** — paper template / PDF page raster (cached; [§6](#6-tiling--caching),
   [ADR-0014](../adr/0014-pdf-engine.md)).
2. **Committed ink** — all dried strokes/objects flattened into a **tiled `Picture`/`Image`
   cache** ([§6](#6-tiling--caching)). Repainted only when a tile is invalidated.
3. **Wet stroke** — the in-progress stroke.
   - **Tier A:** rendered by `sane_ink_surface` on a **native front-buffer** (Metal
     `presentsWithTransaction` on Apple; `GLFrontBufferedRenderer`/`CanvasFrontBufferedRenderer`
     /`LowLatencyCanvasView` on Android) composited into the Flutter scene via a `Texture`
     widget. The front buffer draws *ahead of the next Flutter frame*, which is where the 4–16 ms
     numbers come from (`research/android-stylus-capabilities.md` "~4ms";
     `research/apple-pencil-ipados-capabilities.md` `UIUpdateLink`/`CAMetalLayer`).
   - **Tier B:** a `CustomPainter` inside its own **`RepaintBoundary`**, driven by a
     `Listenable`/`ChangeNotifier` passed as `repaint` so build & layout are skipped and only the
     canvas layer repaints (`research/flutter-ink-stack.md`).
4. **Predicted lead** — the discardable prediction segment (§1.4), same surface as the wet stroke.
5. **Overlay chrome** — selection handles, lasso marquee, rulers, hover cursor, laser pointer.
   Above the ink, never flattened into it.

### 5.2 Commit on pointer-up

```
pointer-up
  → finalise samples (reconcile estimates §2.5; drop predicted §1.4)
  → decimate + serialise (§10)
  → sane_core: create Stroke object (add-wins id, LWW props, HLC)   [overview §3 step 4]
  → sane_render: rasterise the finished stroke into its tile(s) (committed layer)
  → clear the wet surface (native front-buffer cleared; CustomPainter active-stroke = null)
```

The hand-off from wet surface to committed tile MUST be **seamless** — rasterise the finished
stroke into the tile *before* clearing the wet layer in the same frame, or a one-frame flicker
appears at the transition (classic Tier A bug; assert with a golden test capturing the commit
frame).

### 5.3 Threading

The **active wet stroke is always painted on the UI isolate** — it must track the pen with no
hand-off latency ([overview §6](./overview.md#6-threading--isolate-model)). Tessellation of
*finished* strokes MAY move to a one-shot `Isolate.run` under load, but never the wet stroke.
Persistence, indexing and sync are off-isolate and MUST NOT add a millisecond to wet-ink latency.

---

## 6. Tiling & caching

A page can hold thousands of strokes and be an infinite canvas or a 1,000-page notebook; we
cannot repaint every dried stroke each frame, nor hold one giant bitmap.

### 6.1 Tile model

- The page/canvas is divided into **fixed tiles** in page space (default **256×256 logical px**,
  tuned per device at the spike). Each tile caches a rasterised `Image` of the committed ink
  intersecting it, at the current device pixel ratio and up to a zoom-bucketed scale.
- **Zoom buckets:** cache tiles at the nearest power-of-two scale to the live zoom; re-raster on
  bucket change, not on every pinch delta. During an active pinch, draw the last bucket scaled
  (slightly soft) and re-raster when the gesture settles (two-resolution scheme, mirrors the PDF
  strategy `research/pdf-and-audio-technology.md` A.5).
- **Invalidation:** committing/erasing/moving a stroke marks the tiles its bounding box touches
  dirty; only those re-raster. Keep a per-tile content hash so undo/redo can reuse a cached tile.

### 6.2 LRU + memory budget

- Resident tiles are an **LRU cache bounded by a memory budget** (default **≤ 96 MB** of tile
  rasters on a 4 GB Android; scale up on iPad). Evict least-recently-visible tiles; they
  re-raster from the vector strokes on demand. See the global budgets in
  [`rendering-and-performance.md` §3](./rendering-and-performance.md#3-memory-strategy).
- Never keep off-screen tiles for the whole document resident; keep the viewport plus a
  one-tile-ring margin for scroll.
- **Infinite canvas:** tiles are addressed by integer `(col,row)` in page space with no fixed
  bounds; the spatial index (§7) answers "which strokes/tiles intersect the viewport."

### 6.3 Large notebooks (1,000 pages)

Pages are lazily materialised: only the current page's tiles and neighbours are built; a page's
strokes stay serialised in the store until the page scrolls near the viewport. "Open a 1,000-page
notebook < 1 s" (decision 7) is met by opening the manifest + current page only, never the whole
document ([`rendering-and-performance.md` §5](./rendering-and-performance.md#5-pdf--large-document-tiling)).

---

## 7. Hit-testing & spatial index

Erase, select, tap-a-stroke, and "which strokes are in this tile/viewport" all need fast spatial
queries over potentially tens of thousands of strokes per page.

### 7.1 R-tree

Maintain an in-memory **R-tree** per page keyed by each object's **axis-aligned bounding box**
(AABB) in page space (`sane_ink/lib/src/index/rtree.dart`, or a Rust core later). The R-tree
answers:

- **Point/stylus query** (tap, eraser tip): candidates whose AABB contains the point → refine.
- **Rect query** (viewport, tile, marquee): candidates whose AABB intersects the rect.
- **Stroke query** (lasso, line-eraser path): candidates whose AABB intersects the query path's
  AABB → refine.

Bulk-load with STR (Sort-Tile-Recursive) packing when a page is first loaded; insert/delete
incrementally as strokes are added/erased. Rebuild (re-pack) when the tree degrades (e.g. after
many deletes) — track a dirty ratio.

### 7.2 Refinement (broad phase → narrow phase)

AABB is only the broad phase. Narrow phase per candidate:

- **Tap / point-eraser:** distance from the point to the stroke's centreline ≤ (stroke halfWidth
  + tolerance). Tolerance scales with zoom so tapping a thin line at low zoom still hits.
- **Stroke / vector-eraser:** does the eraser path come within `eraseRadius` of any stroke
  segment (segment–segment distance)? Vector eraser deletes whole strokes; **pixel eraser** is a
  separate mode that subtracts geometry (splits the stroke) and is costlier — implement vector
  first.
- **Lasso:** see [§8](#8-selection--lasso-math).

Narrow-phase geometry (segment distance, point-in-polygon) lives in `sane_ink` geometry utils and
is shared with shape recognition (§9). Android's `androidx.ink.geometry` (`PartitionedMesh`,
intersection detection) is the native analogue and MAY back Tier A hit-testing on Android
(`research/android-stylus-capabilities.md`).

---

## 8. Selection / lasso math

The lasso selects objects by a freehand loop; selected objects can be moved, scaled, restyled,
copied, converted (§9), or deleted.

### 8.1 Lasso capture and closing

- Capture the lasso as a normal filtered stroke (§1–2) but on the overlay layer. On pointer-up,
  **close** the polygon by connecting the last point to the first.
- Simplify the loop with RDP (§9.1, ε ≈ 2 px) before the geometry tests — fewer edges, faster
  point-in-polygon.

### 8.2 Which objects are selected

Broad phase: R-tree rect query with the lasso's AABB. Narrow phase per candidate, using the
configured **selection policy**:

- **`contains` (default):** the object is selected iff **every** sample/vertex of the object is
  inside the lasso polygon. Robust and predictable for handwriting.
- **`intersects`:** selected iff the object's outline intersects **or** is contained by the lasso
  (looser; offer as an option).

**Point-in-polygon** uses the even-odd **ray-casting** test (count edge crossings of a ray from
the point; odd = inside) or the winding-number test for self-intersecting lassos (prefer winding
for correctness on figure-eight loops). Implementation in `sane_ink/lib/src/geometry/polygon.dart`
with unit tests for concave and self-intersecting loops.

### 8.3 Transform math

- The selection's transform is an `AffineTransform` (translate/scale/rotate) applied to each
  selected object's geometry on commit. While dragging, apply the transform to the overlay only;
  commit as **LWW register** updates to each object's transform prop
  ([overview §3](./overview.md#3-data-flow-a-pen-stroke-from-os-event-to-pixels-to-persistence-to-sync)).
- Scaling a stroke scales its width proportionally by default; hold-to-constrain and 15° magnetic
  rotation snap mirror Procreate's edit handles (`research/procreate.md` §4 QuickShape edit).
- Selection handles + rotation handle are overlay chrome (§5.1) and MUST carry `Semantics`
  ("selection, 3 items, drag to move") for screen readers
  (`research/accessibility-i18n-and-inclusive-design.md`; decision 10).

---

## 9. Shape recognition

"Draw a rough shape, hold the pen still at the end → it snaps to a perfect form and stays
editable." This is the highest-leverage feature for diagrams, boxes, underlines and tables in
notes (`research/procreate.md` §4 QuickShape; `research/handwriting-recognition-ai-and-ml.md` §3).
Three stages, all pure Dart in `sane_ink` (with ML Kit's shape classifier as an optional Tier-A
accelerator on mobile).

### 9.1 Stage 1 — simplify / denoise

**Ramer–Douglas–Peucker (RDP):** decimate the filtered centreline with tolerance ε
(default ~2.0 logical px; scale with stroke size). Recursively keep the farthest point beyond ε,
discard interior points below it. O(n log n) typical (`research/handwriting-recognition-ai-and-ml.md`
§3.1). Visvalingam–Whyatt is an allowed lower-cost alternative. The decimated polyline is also
what we persist (§10.1).

### 9.2 Stage 2 — classify (what shape)

Use the **$-family** template recognizers (`research/handwriting-recognition-ai-and-ml.md` §3.2):

- **`$P` / `$Q`** (point-cloud) as the default — order/direction/stroke-count-independent, robust
  for shapes drawn any way; `$Q` is ~142× faster and suits the low-end reference device.
  Pipeline: resample to N points → scale to a reference square → translate to origin → score
  against templates by point-cloud distance.
- Templates: line, arrow, rectangle/square, triangle, circle, ellipse, polyline. One template per
  class is enough; add a few stroke variants for robustness.
- **On mobile Tier A**, ML Kit Digital Ink's shape/gesture classifier (nine gesture classes +
  autodraw shapes) MAY be used instead/as a cross-check — it is free and on-device
  (`research/android-stylus-capabilities.md`, `research/handwriting-recognition-ai-and-ml.md` §1.2).

### 9.3 Stage 3 — geometric fit (beautify)

Given the class, fit clean geometry (`research/handwriting-recognition-ai-and-ml.md` §3.3):

| Class | Fit | Snapping |
|---|---|---|
| Line | least-squares line through simplified points; snap endpoints | angle-snap 0/45/90° optional |
| Circle | algebraic least-squares (**Taubin** > Kåsa for stability) → centre + radius | — |
| Ellipse | **Fitzgibbon** direct least-squares conic with `B²−4AC<0` → centre, semi-axes, rotation | circle is `A=C, B=0` |
| Rect / polygon | RDP corners → snap edges to equal length / right angles / regular template | axis-align if near |
| Arrow | line fit + arrowhead template | — |

(Method names Taubin/Fitzgibbon are standard techniques; **verify** the exact numerical
implementation against a reference before shipping — the research flags the fit method names as
standard-but-unverified.)

### 9.4 Trigger, edit, and reversibility

- **Trigger:** "draw and **hold**" (pen stationary past a dwell threshold, default ~500 ms) snaps
  the stroke to the fitted shape; a second finger while holding constrains to the "perfect" form
  (square/circle/equilateral). Configurable and disableable
  (`research/procreate.md` §4; some users want raw ink).
- **Editable after:** the fitted shape becomes a **`Shape` object** (recognised/vector, decision
  4) with draggable node handles ("Edit Shape"); it is **not** flattened. The original ink is
  discarded on accept but the action is a single undo step.
- Recognition never runs destructively in the background; it fires only on the explicit
  hold-trigger or an explicit "convert selection to shape" on a lasso selection.

---

## 10. Serialisation

Strokes are the bulk of a document; their encoding decides file size, sync bandwidth, and load
time. Format: **decimated points → per-field delta → zig-zag varint → zstd**. This is the
`.sanenote` bundle's stroke segment encoding (open, documented format, decision 4). The Android
Jetpack Ink storage module uses the same idea — "protocol buffers and optimized delta compression"
(`research/android-stylus-capabilities.md`); we specify our own so it is portable to web and a
future Rust core.

### 10.1 What we store

Per stroke we persist the **filtered, decimated centreline** with per-point dynamics — **not** the
raw 240 Hz firehose, and **not** the tessellated outline (which is re-derived from geometry + pen
preset at load, so a preset fix re-renders old strokes correctly):

```
Stroke {
  id            : 128-bit object id (add-wins; decision 4)
  penPresetId   : string (references the pen; geometry re-derived from it)
  colorOverride : optional ARGB
  bbox          : float32[4]   (cached AABB for the R-tree; recomputable)
  points        : [ { x, y, pressure, tilt, azimuth, tMicros } ]   // decimated
  createdHlc    : HLC stamp
}
```

Keep per-point `tMicros` — it is required for **audio-sync handwriting replay**
([ADR-0015](../adr/0015-audio-pipeline.md); `research/pdf-and-audio-technology.md` B.6) and for
velocity re-derivation. Decimate points with RDP (§9.1) at a tolerance that preserves visual
fidelity at max zoom (default ε ≈ 0.75 px, tighter than the recognition ε).

### 10.2 Encoding pipeline

1. **Quantise** `x,y` to a fixed grid (e.g. 1/32 logical px → int) so deltas are integers;
   `pressure`→uint8/uint16, `tilt`/`azimuth`→uint16 fixed-point, `tMicros`→delta.
2. **Delta-encode** each field along the point sequence (store first value absolute, then
   differences). Handwriting points are near-monotonic, so deltas are tiny.
3. **Zig-zag varint** each delta (`(n<<1) ^ (n>>31)`), so small ± values are 1 byte (LEB128-style
   variable length).
4. **Column-major** layout (all x-deltas, then all y-deltas, …) so like magnitudes sit together
   and compress better than interleaved.
5. **zstd** the resulting byte block (segment-level, not per-stroke — batch a page's strokes into
   one zstd frame with a shared dictionary for best ratio). Choose a modest level (3–6) — this
   runs on the storage isolate, never the draw path.

### 10.3 Blob & bundle placement

- The compressed stroke segment is a **content-addressed blob** (hash = id) in the blob store,
  referenced by the op-log/`sane_core`
  ([overview §3–4](./overview.md#3-data-flow-a-pen-stroke-from-os-event-to-pixels-to-persistence-to-sync)).
- Textures (Shape/Grain) are separate content-addressed blobs referenced by pen presets.
- On sync, segments are envelope-encrypted by `sane_crypto` before leaving the device; the cloud
  only ever holds ciphertext (decision 3).
- The `.sanenote` export bundle = manifest + stroke segments + blobs; also exportable to
  PDF/PNG/SVG (decision 4). SVG/PDF export re-tessellates outlines from geometry so exported ink
  is crisp vector, and for searchable PDF export an invisible OCR text layer is placed behind the
  ink ([ADR-0014](../adr/0014-pdf-engine.md); `research/pdf-and-audio-technology.md` A.6).

### 10.4 Versioning

The stroke encoding carries a `schema` byte. A reader MUST refuse an unknown major schema and the
`.sanenote` manifest records the min-reader version. Any change to the byte layout is a migration
in `sane_core` with a golden round-trip test (encode→decode→encode is byte-identical for the
same schema).

---

## Appendix — cross references

| For… | See |
|---|---|
| System map, data flow, isolate model | [`architecture/overview.md`](./overview.md) |
| Frame budgets, latency harness, jank runbook, device lab, compat matrix | [`architecture/rendering-and-performance.md`](./rendering-and-performance.md) |
| Why two tiers + native front-buffer, alternatives, exit criterion | [ADR-0008](../adr/0008-ink-pipeline-and-low-latency-surfaces.md) |
| Brush model rationale, `.sanepen` share format, alternatives | [ADR-0009](../adr/0009-brush-engine.md) |
| PDF render/annotate/export, searchable export | [ADR-0014](../adr/0014-pdf-engine.md) |
| Audio-sync clock, per-point timestamps, replay | [ADR-0015](../adr/0015-audio-pipeline.md) |
| Handwriting recognition, shape classifier, math, on-device AI | [ADR-0016](../adr/0016-on-device-ml-and-ai.md) |
| Why Flutter, native-pivot exit criterion | [ADR-0001](../adr/0001-flutter-single-codebase.md) |
| Accessibility of ink/overlay chrome | `research/accessibility-i18n-and-inclusive-design.md` |
