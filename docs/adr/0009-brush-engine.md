# ADR-0009 — Brush engine (stamp-along-path, input-bound curves, shareable pens)

## Status

**Accepted** (M0 Foundations). Serves locked decision 1 (serious brush engine) and the product
goal of best-in-world pen feel. Related: [ADR-0008](0008-ink-pipeline-and-low-latency-surfaces.md)
(the pipeline the brush renders on), [ADR-0016](0016-on-device-ml-and-ai.md) (shape recognition
sits beside brushes). Engineering spec: [`docs/architecture/ink-engine.md` §3–4](../architecture/ink-engine.md#3-stroke-geometry).
Package: **`sane_brushes`** (engine + presets), consumed by `sane_render`.

## Context

A note app lives or dies on how the pen *feels*. Procreate is the reference implementation of an
Apple-Pencil-native brush engine and has solved, at high polish, exactly the problems we face —
making a stroke feel physical (pressure/tilt/velocity/taper/texture), and expressing dozens of
distinct pens without bespoke code (`research/procreate.md`). Its model:

- A brush is a **Shape** (nib stamp image) carrying an internal **Grain** (texture), deposited
  repeatedly along the **Path** of the stroke; every parameter modulates *how the stamp is placed,
  sized, coloured and blended as it walks the path*. "Stamp along a path" expresses fineliner,
  fountain pen, pencil, marker/highlighter, calligraphy nib, dashed/dotted and pattern pens as
  parameter sets (`research/procreate.md` §2.1, §"Brush engine model").
- **Every visual property is bindable to an input source via an editable curve, not a scalar** —
  the editable Pressure/Tilt graph is what makes a pencil feel like a pencil
  (`research/procreate.md` §"Key architectural insights").
- **Three distinct smoothing philosophies** (StreamLine / Stabilization / Motion Filtering) are
  separate controls; Motion Filtering doubles as a tremor accessibility aid.
- **Min/Max clamps per brush** stop the global size slider from destroying a tuned tool.
- **A brush is a shareable, versioned document** (`.brush`) with author metadata + reset points.

Platform brush models agree with this shape: Android Jetpack Ink exposes `Brush` +
`BrushFamily` ("analogous to a font family") + `StockBrushes` + `TextureBitmapStore`, and Apple
PencilKit exposes `PKInkingTool.InkType` (pen/pencil/marker/monoline/fountainPen/watercolor/
crayon) with per-point `PKStrokePoint` force/azimuth/altitude (`research/android-stylus-capabilities.md`,
`research/apple-pencil-ipados-capabilities.md`). The pressure-stroke geometry for the common
`outline` pens is `perfect_freehand` (Dart port battle-tested in Saber;
`research/flutter-ink-stack.md`).

We must choose a brush model that (a) reaches this feel, (b) runs on both inking tiers and web,
(c) is expressible as data so agents add pens without new render code, and (d) supports
community-shareable pens without becoming an arbitrary-code security hole.

## Decision

**Adopt the Procreate-style "stamp-along-path" brush model, parameterised as data, with every
numeric property bindable to an input source (pressure / tilt / velocity / barrel-roll / random)
through an editable response curve. Ship pens as a documented, data-only `.sanepen` share format
— never executable code.**

Specifics (schema in [`ink-engine.md` §4](../architecture/ink-engine.md#4-brush-model)):

1. **Two render strategies** behind one `PenPreset`:
   - **`outline`** — the `perfect_freehand`-style variable-width filled polygon (fineliner,
     fountain pen, ballpoint, brush/calligraphy nib). Crisp, resolution-independent, cheap.
     **Default for handwriting.**
   - **`stamped`** — walk the path placing the Shape stamp at `spacing` intervals, textured by the
     Grain (pencil with paper grain, textured marker, dashed/dotted, pattern pen). Costs more.
2. **Parameter schema** (`sane_brushes/lib/src/pen_preset.dart`), grouped after Procreate's Brush
   Studio tabs but trimmed to note needs: base `size` + `min/maxWidth` clamps, `color`
   (or `inherit`), `baseAlpha` + `min/maxAlpha`, `dynamics` (input→output curves for width/alpha/
   tilt), `taper` (start/end, pressure + fixed fallback), `stabilise` (1€ params + streamline +
   motionFilter), `shape` (source/roundness/inputStyle/scatter/count/flip/filtering), `grain`
   (source/behaviour/scale/depth/blend), `spacing`(+jitter), `blend` (mode/flow/wetEdges),
   `provenance` (author/createdAt/**resetPoint**).
3. **Input-bound curves:** any numeric param may be a scalar **or** `{source, curve:[nodes]}`
   where `source ∈ {pressure, tilt, velocity, twist, random}` and `curve` is up to 4 piecewise-
   cubic nodes. **Velocity is the default width source when the device reports no pressure** (the
   fountain-pen look on pressureless styluses/fingers). An app-wide pressure-sensitivity curve
   pre-multiplies every pen (`research/procreate.md` §8).
4. **Built-in pens (M1):** fineliner, fountain pen, ballpoint, pencil (tilt-shaded, paper grain),
   marker/highlighter (`blend.mode = multiply`, own highlight layer), brush/calligraphy
   (azimuth-driven nib), dashed/dotted, pattern pen — each a pure parameter set.
5. **Highlighter MUST use `multiply` and live on a separate highlight layer** so it sits *behind*
   ink and never darkens on overlap (`research/procreate.md`).
6. **Textures** (Shape/Grain images) are content-addressed blobs referenced by hash; built-ins
   ship as assets. `FragmentShader`/`ImageShader` objects are precached and **reused** across
   frames, never per stroke (`research/flutter-ink-stack.md`).
7. **`.sanepen` share format** — analogous to Procreate `.brush`/`.brushset`: a JSON manifest
   (the schema above) + referenced texture blobs, packaged as a bundle, with author metadata and
   an immutable `resetPoint` ("Reset Pen"). **Data only — no scripting, no executable code.**
   Pens organise into sets with search / Recent / Pin (`research/procreate.md` §3).
8. **Geometry is re-derived from `penPresetId` at render time**, so fixing a preset re-renders old
   strokes correctly; strokes persist only the filtered centreline + dynamics
   ([ink-engine §10.1](../architecture/ink-engine.md#101-what-we-store)). A pen a document depends
   on is embedded in the `.sanenote` bundle so shared notes render identically.

## Alternatives considered

| Option | Pen feel | Expressible as data | Web/tier portability | Security | Verdict |
|---|---|---|---|---|---|
| **Stamp-along-path + input-bound curves + `.sanepen` data [chosen]** | Procreate-class | Yes — all pens are parameter sets | Yes (outline pure-Dart; stamped uses shaders w/ fallback) | Safe — data only | **Chosen** — best feel, agent-friendly, community-shareable without code execution |
| Fixed set of hardcoded pens (no data model) | Good | No — new pen = new code | Yes | Safe | Rejected — can't grow, no community pens, not agent-friendly |
| Wrap PencilKit / Jetpack Ink stock brushes only | Native-quality but platform-divergent | No | No (no web; two native models) | Safe | Rejected — reintroduces platform inconsistency (decision 1); used only as a Tier-A accelerator where beneficial |
| Node-graph / scriptable brush engine (Turing-complete) | Very flexible | Yes | Risky on web | **Unsafe** — executing shared pens = code execution | Rejected — a shared "pen" must never run arbitrary code |
| License MyScript/commercial brush engine | n/a (recognition vendor, not a brush engine) | — | — | — | N/A — MyScript is recognition, not brushes ([ADR-0016](0016-on-device-ml-and-ai.md)) |

## Consequences

**Positive**
- One data-driven engine yields every note pen; agents add pens by writing a `PenPreset`, not
  render code.
- Input-bound curves deliver real pen feel (velocity fountain pen works even without pressure).
- `.sanepen` enables a community/marketplace of pens and always-recoverable stock pens, mirroring
  Procreate's trust model — and, being data-only, introduces no code-execution risk.
- Runs on both inking tiers and web (outline pens are pure-Dart; stamped pens degrade to plain
  fill where shaders/textures are constrained, e.g. some web paths).

**Negative / costs**
- The parameter space is large; a Brush/Pen Studio UI and sensible defaults + clamps are needed so
  users don't build unusable pens (Min/Max clamps mitigate).
- Stamped + textured pens with grain/blend shaders cost more per frame than outline pens — keep
  them off the low-end default set and honour the perf gate
  ([`rendering-and-performance.md` §8](../architecture/rendering-and-performance.md#8-lag-proof-checklist-every-editor-pr-must-pass)).
- Wet-media simulation (Procreate Wet Mix: dilution/charge/attack/pull) is **out of scope for
  notes** — the schema leaves room but M1 does not implement it.

**Neutral**
- Some Procreate parameters (Materials/3D, full Wet Mix, Color Dynamics breadth) are intentionally
  omitted; the schema is a note-focused subset, extensible via the `schema` version.

## Security & privacy impact

- **`.sanepen` is strictly declarative data.** A reader MUST reject unknown schema majors and MUST
  NOT execute anything from a pen file; texture blobs are validated as images before use. This is
  the key control that makes shareable pens safe.
- Imported pens/textures are untrusted input — sanitise/limit texture dimensions and file sizes;
  content-address by hash so a malicious pen can't overwrite a built-in.
- Pen presets and textures are note-adjacent content: synced E2E-encrypted, never logged.

## How to verify

1. **Every built-in pen is a `PenPreset`** with no bespoke render branch (a single `outline` and
   a single `stamped` renderer serve all pens).
2. **Round-trip:** a `.sanepen` exports and re-imports to a byte-identical preset (golden test);
   an unknown-schema pen is rejected safely.
3. **Highlighter behind ink:** a golden test confirms `multiply` highlighter never darkens
   overlapping ink and lives on the highlight layer.
4. **No per-stroke shader/texture allocation** (perf assertion; shaders reused across frames).
5. **Reset works:** "Reset Pen" restores the immutable `resetPoint` exactly.
6. **Portability:** the same preset renders (outline) pixel-consistently on Tier A, Tier B and web
   golden runs; stamped pens fall back gracefully where shaders are unavailable.
