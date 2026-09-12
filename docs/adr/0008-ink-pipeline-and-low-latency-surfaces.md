# ADR-0008 — Ink pipeline & low-latency wet-ink surfaces

## Status

**Accepted** (M0 Foundations). Implements locked decisions 1 (stack / native fast path) and 7
(latency budgets). Related: [ADR-0001](0001-flutter-single-codebase.md) (Flutter + native
`Texture` fast-path + the `SN-INK` risk gate), [ADR-0009](0009-brush-engine.md) (brush model that
runs on top of this pipeline), [ADR-0010](0010-web-pwa-strategy.md) (web renderer limits),
[ADR-0012](0012-native-plugin-strategy.md) (federated plugin mechanics). Detailed engineering
spec: [`docs/architecture/ink-engine.md`](../architecture/ink-engine.md); budgets & harness:
[`docs/architecture/rendering-and-performance.md`](../architecture/rendering-and-performance.md).

## Context

Perceived quality of a note app is dominated by **pen-to-pixel latency** and steady frame rate.
Locked decision 7 sets hard budgets: **≤ 16 ms** on ProMotion iPads, **≤ 25 ms** on mid Android,
**≤ 30 ms** on web (Chrome desktop), 60 fps floor, no frame > 16.7 ms while writing. Locked
decision 1 keeps a single Flutter codebase but explicitly reserves a **native wet-ink fast path**
and names the M0 `SN-INK` spike as the risk gate with a native-views exit criterion.

Forces and facts from the research:

- **Flutter gives full stylus telemetry** (`PointerEvent`: pressure, tilt, orientation, distance,
  radius, `kind` incl. `stylus`/`invertedStylus`, barrel buttons) via a raw `Listener`, and
  **Impeller removes first-use shader jank** (offline shader compilation) — the classic ink
  artifact (`research/flutter-ink-stack.md`).
- **But** Flutter's canvas cannot, by itself, reach the platform's lowest-latency inking:
  - It exposes **no first-class coalesced sub-frame samples** (unlike iOS
    `coalescedTouches`/Android `getHistorical*`), so high-Hz pen detail is lost between frames
    (`research/flutter-ink-stack.md`, flagged as a gap to verify).
  - The native front-buffer / delegated-trail paths that hit single-digit-ms latency are not
    reachable through Flutter's canvas.
- **Native front-buffer inking is proven and fast:** Android `androidx.graphics.lowlatency`
  (`GLFrontBufferedRenderer`/`CanvasFrontBufferedRenderer`/`LowLatencyCanvasView`) + Jetpack Ink
  report **~4 ms end-to-end** (`research/android-stylus-capabilities.md`); Apple Metal
  `CAMetalLayer` (`presentsWithTransaction`) + `UIUpdateLink` (`wantsLowLatencyEventDispatch`) +
  `coalescedTouches`/`predictedTouches` is Apple's documented low-latency stack
  (`research/apple-pencil-ipados-capabilities.md`).
- Flutter's **`Texture` widget** composites a native (backend) texture into the scene and
  repaints autonomously "generally without executing Dart code" — the documented escape hatch to
  give the wet stroke native latency while keeping the Dart core
  (`research/flutter-ink-stack.md`).
- **Web has none of this through Flutter:** no Impeller; CanvasKit/skwasm only; skwasm/WasmGC
  cannot run in any iOS browser; the web low-latency levers (`desynchronized` canvas, Ink API
  delegated trails, coalesced/predicted Pointer Events) are not directly reachable through
  Flutter's canvas (`research/web-stylus-and-pwa-capabilities.md`,
  [ADR-0010](0010-web-pwa-strategy.md)).
- **Saber** proves a serious Flutter handwriting app is feasible with the pure-Dart
  (`perfect_freehand` + `CustomPainter`) path (`research/flutter-ink-stack.md`).

We therefore cannot pick "pure Flutter" or "native" globally; we need a per-device choice with a
common core and a proven fallback.

## Decision

**Adopt a two-tier ink pipeline over one shared, filtered sample stream and one shared dried
geometry. Tier A renders the wet (in-progress) stroke on a native front-buffer surface
(`sane_ink_surface`) composited via Flutter `Texture`; Tier B renders it in a Flutter
`CustomPainter` inside a `RepaintBoundary`. The tier is chosen at runtime by capability query,
not platform string.**

Specifics (full detail in [`ink-engine.md`](../architecture/ink-engine.md)):

1. **Shared pipeline:** raw capture → normalise to `InkSample` → coalesce → predict (wet-only,
   discarded) → 1€ filter + streamline (+ optional motion filter) → geometry. Both tiers consume
   the **same filtered stream** and, on pointer-up, finalise the **same** `Stroke` object
   (add-wins id, LWW props, HLC) committed to `sane_core`. A geometry/serialisation bug therefore
   reproduces on both tiers and is caught by CI golden tests on Tier B.
2. **Tier A (native fast path):** `sane_ink_surface` is a federated plugin. On Apple it draws the
   wet stroke on a `CAMetalLayer` front-buffer (`presentsWithTransaction = true`,
   `commandBuffer.waitUntilScheduled()` before present — **verify exact call order**) driven by
   `UIUpdateLink` with `wantsLowLatencyEventDispatch`, reading `coalescedTouches` +
   `predictedTouches`. On Android it uses `androidx.graphics.lowlatency`
   (`GLFrontBufferedRenderer`/`CanvasFrontBufferedRenderer`/`LowLatencyCanvasView`) and/or Jetpack
   Ink `InProgressStrokes`, with `input-motionprediction`. The surface is composited into the
   Flutter scene via a `Texture` widget. `sane_stylus` captures native coalesced/historical
   samples + barrel/squeeze/hover/roll/haptics and mirrors samples to `sane_ink`.
3. **Tier B (pure Flutter):** raw `Listener` → `sane_ink` (wrapping `perfect_freehand`) →
   `CustomPainter` in a `RepaintBoundary`, driven by a `Listenable` so build/layout are skipped.
   Available on **every** surface; the only wet-ink path on web.
4. **Capability query, transparent fallback:** `sane_ink_surface` reports whether a native
   low-latency surface exists on this device/OS build; if not, the editor uses Tier B with no
   feature loss. Never gate on `Platform.isX`.
5. **Do not enable `GestureBinding.resamplingEnabled` on the draw path** — we keep the raw stream
   for fidelity and run our own smoothing.
6. **Risk gate = the M0 `SN-INK` spike** (shared with [ADR-0001](0001-flutter-single-codebase.md)):
   measure pen-to-pixel latency of Tier A and Tier B optically (high-speed camera) + software
   timestamps on the three reference devices. **Exit criterion:** if neither tier meets the
   decision-7 budget on a target surface, that surface's editor **pivots to native views while
   the Dart core (`sane_ink`/`sane_core`) is kept**. This ADR records that exit criterion; the
   spike's written pass/pivot decision is committed under `tools/device_lab/results/`.

## Alternatives considered

| Option | Wet-ink latency | Coalesced fidelity | Web | Complexity | Verdict |
|---|---|---|---|---|---|
| **Two-tier: native front-buffer (A) + pure-Flutter (B) [chosen]** | Best where A available (≈4 ms Android, Metal iPad); Tier B good everywhere | Native coalesced on A; delivered moves on B | B works (CanvasKit/JS) | Medium-high (plugin + Texture + two paths) | **Chosen** — hits budget where it matters, degrades predictably, one shared core, exit criterion de-risks |
| **Pure Flutter only (`CustomPainter` everywhere)** | Good (Impeller) but may miss 16 ms on iPad vs native | No sub-frame coalesced (framework gap) | Same B path | Low | Rejected as the *only* path — risks the iPad budget; kept as **Tier B** |
| **Native inking everywhere (PencilKit / Jetpack Ink native, Flutter only for chrome)** | Best fidelity | Full | Separate web build entirely | High (2–3 native editors) | Rejected — reintroduces the platform-inconsistency we're attacking (decision 1); this is the **exit criterion**, not the default |
| **Web low-latency via Flutter canvas** (`desynchronized`/Ink API/coalesced through Flutter) | Would help web | — | Not reachable through Flutter's canvas today | — | Rejected — not exposed by Flutter web; noted as a future lever in [ADR-0010](0010-web-pwa-strategy.md) |
| **Rust ink core now (flutter_rust_bridge)** | Neutral to latency (tessellation, not present path) | — | Works via WASM | High up-front | Deferred — allowed *later* optimisation per [ADR-0001](0001-flutter-single-codebase.md) triggers, not an M0 commitment |

## Consequences

**Positive**
- Meets the latency budgets where the hardware allows (Tier A) and degrades to a known-good path
  (Tier B) elsewhere, with **one shared filtered stream and dried geometry**.
- Native coalesced-sample capture closes Flutter's high-Hz fidelity gap on Tier A.
- The capability-query design means a new device/OS "just works" at the best tier it supports.
- The exit criterion means we cannot be trapped: a surface that can't hit budget pivots its
  editor to native views without discarding the Dart core.

**Negative / costs**
- **Two wet-ink code paths** to build, test and keep visually identical; the wet→committed
  hand-off on Tier A is a known flicker-risk (mitigated by a commit-frame golden test).
- **Platform-channel + `Texture` complexity** for `sane_ink_surface`/`sane_stylus`, incl.
  estimated-property reconciliation (Apple `force`/`rollAngle` corrected over Bluetooth).
- **Web stays Tier B only** — the lowest-latency web levers aren't reachable through Flutter;
  web is "view + light-edit first" (`research/web-stylus-and-pwa-capabilities.md`).
- Exact Metal present call order and Flutter-web coalesced-event reachability are **unverified** —
  must be settled at the spike.

**Neutral**
- Some iPad pen-fidelity ceiling below fully-native PencilKit is accepted for reach; the native
  fast path narrows it. Validated by our own camera measurement, not vendor claims.

## Security & privacy impact

- Ink coordinates and pressure/tilt are **note content** — never logged
  ([overview §8.2](../architecture/overview.md#82-logging-one-facade-zero-content)), never sent
  anywhere by the pipeline; persistence is local and E2E-encrypted on sync (decision 3).
- The native plugin surface (method-channel payloads between `sane_ink_surface`/`sane_stylus`
  and Dart) is attack surface: validate payload shapes; the plugins expose only ink primitives,
  hold no secrets, and are covered by [ADR-0012](0012-native-plugin-strategy.md) and CodeQL for
  the Swift/Kotlin layers.

## How to verify

1. **M0 `SN-INK` spike recorded:** optical + software latency for Tier A and Tier B on all three
   reference devices, with a committed pass/pivot decision
   ([`rendering-and-performance.md` §2.1](../architecture/rendering-and-performance.md#21-ground-truth-pen-to-pixel-with-a-high-speed-camera)).
2. **CI perf gate green** on every draw-path PR (regression thresholds on frame time / jank;
   [`rendering-and-performance.md` §2.2](../architecture/rendering-and-performance.md#22-ci-proxy-flutter-drive---profile--timeline)).
3. **Graceful degradation proven:** an integration test forces `sane_ink_surface` to report
   "unavailable" and asserts the editor still captures and renders ink via Tier B.
4. **Identical dried output:** a golden test asserts the same synthetic stroke produces
   byte-identical serialised geometry and pixel-identical dried raster on both tiers.
5. **Impeller active** on iOS/Android target builds (no accidental Android GL fallback);
   web build emits both WASM and JS with automatic fallback.
