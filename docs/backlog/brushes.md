# Backlog — area: brushes

26 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-BRS-001](brushes.md#sn-brs-001) **Build the Sane Notes brush engine & colour system (sane_brushes)** (epic · M1 Ink Editor Alpha)
  - [SN-BRS-002](brushes.md#sn-brs-002) **Define the PenPreset schema and versioned serialisation** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-BRS-003](brushes.md#sn-brs-003) **Implement the stamp-along-path engine (outline and stamped strategies)** · p1 · feature · L · M1 Ink Editor Alpha
  - [SN-BRS-004](brushes.md#sn-brs-004) **Implement input-bound response curves and the global pressure curve** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-BRS-005](brushes.md#sn-brs-005) **Implement BrushRef and the document brush dictionary for reproducible strokes** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-BRS-006](brushes.md#sn-brs-006) **Implement the brush registry: sets, versioning and reset points** · p2 · feature · M · M2 Library & Documents
  - [SN-BRS-007](brushes.md#sn-brs-007) **Build the Shape/Grain texture pipeline (content-addressed, shader reuse)** · p2 · task · M · M2 Library & Documents
  - [SN-BRS-008](brushes.md#sn-brs-008) **Ship the default stock pen set (>=12 presets) as pure data** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-BRS-009](brushes.md#sn-brs-009) **Author the Fountain Pen preset (velocity + light pressure, the default)** · p1 · task · S · M1 Ink Editor Alpha
    - [SN-BRS-010](brushes.md#sn-brs-010) **Author the Ballpoint preset (constant weight, everyday opaque pen)** · p1 · task · XS · M1 Ink Editor Alpha
    - [SN-BRS-011](brushes.md#sn-brs-011) **Author the Fineliner and Monoline presets (constant-width diagram pens)** · p1 · task · S · M1 Ink Editor Alpha
    - [SN-BRS-012](brushes.md#sn-brs-012) **Author the Graphite Pencil preset with tilt shading** · p1 · task · M · M1 Ink Editor Alpha
    - [SN-BRS-013](brushes.md#sn-brs-013) **Author the Felt Marker preset (chisel tip, azimuth-driven)** · p1 · task · S · M1 Ink Editor Alpha
    - [SN-BRS-014](brushes.md#sn-brs-014) **Author the Gel, Soft Pencil/Charcoal and Crayon presets** · p2 · task · M · M2 Library & Documents
    - [SN-BRS-015](brushes.md#sn-brs-015) **Author the Brush Pen / Calligraphy preset (azimuth nib, angle lock)** · p2 · task · M · M2 Library & Documents
    - [SN-BRS-016](brushes.md#sn-brs-016) **Author decorative & effect pens: dashed/dotted, pattern, neon-glow, pixel** · p3 · task · M · M5 Phones & Platform Parity
  - [SN-BRS-017](brushes.md#sn-brs-017) **Implement the highlighter (chisel, multiply-behind ink, own layer)** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-BRS-018](brushes.md#sn-brs-018) **Implement straight-line and smart (PDF/text-snap) highlighter modes** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BRS-019](brushes.md#sn-brs-019) **Implement eraser modes (stroke, precision-split, target filter, gestures)** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-BRS-020](brushes.md#sn-brs-020) **Implement quick colour palettes (INK/DARK_INK/HL) with tool-snap rules** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-BRS-021](brushes.md#sn-brs-021) **Build the full colour picker (Disc, Value/HEX, Harmony, Eyedropper)** · p2 · feature · L · M2 Library & Documents
  - [SN-BRS-022](brushes.md#sn-brs-022) **Add per-notebook palettes, recents, tints/shades and colour-blind support** · p2 · feature · M · M2 Library & Documents
  - [SN-BRS-023](brushes.md#sn-brs-023) **Build Brush Studio with the pressure/tilt curve editor** · p2 · feature · L · M2 Library & Documents
  - [SN-BRS-024](brushes.md#sn-brs-024) **Build the favourites bar (11 slots tablet / 6 phone) and quick-switch** · p2 · feature · M · M2 Library & Documents
  - [SN-BRS-025](brushes.md#sn-brs-025) **Implement .sanepen/.sanepenset import/export with a hardened reader** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-BRS-026](brushes.md#sn-brs-026) **Add the cross-platform brush render-parity golden gate** · p1 · test · M · M1 Ink Editor Alpha

---

## Issues

### SN-BRS-001

<a id="sn-brs-001"></a>

**Build the Sane Notes brush engine & colour system (sane_brushes)**

| Field | Value |
|---|---|
| GitHub | #8 |
| Type | epic |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | brushes |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-CODE-4`, `MASVS-PLATFORM-3`, `CWE-502`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
A note app lives or dies on how the pen feels, so `packages/sane_brushes` is a load-bearing part of the product thesis (docs/adr/0009-brush-engine.md; docs/design/pen-and-brush-spec.md). This epic delivers the whole ink toolset above the raw ink pipeline: the data-only `PenPreset` schema, the single stamp-along-path engine (outline + stamped strategies) that expresses every pen as parameters (not code), input-bound response curves, the default stock pen set (>=12 brushes), highlighter and eraser modes, textures/grain, the Brush Studio tuner, the favourites bar and quick palette, the full colour picker with the shared INK/DARK_INK/HL constants, the `.sanepen` share format with a hardened reader, and the cross-platform render-parity CI gate that makes 'renders identically forever' real (pen-and-brush-spec §9; ADR-0009 How-to-verify). It sits on `sane_ink` geometry (SN-INK-004) and `sane_core`/`sane_crypto` per the package DAG (CLAUDE.md §3) and is consumed by `sane_render`. The three visible defaults are Size, Opacity and Smoothing; everything else is one layer down (Concepts model, pen-and-brush-spec §0). PRD source: docs/product/prd-01-editor-ink-brushes.md §3 (colour), §4 (pens/brushes, PRD-ED-046..065), §5 (highlighter), §6 (eraser).

#### Scope
**In:** the versioned `PenPreset` schema + serialisation; the stamp-along-path engine (outline + stamped); input-bound curves; `BrushRef`/document brush dictionary; the brush registry/sets/reset points; the texture (Shape/Grain) pipeline; the >=12 default pens; highlighter core + straight-line + smart modes; the three eraser modes; the quick colour palettes + full colour picker + per-notebook palettes + colour-blind support; Brush Studio + curve editor; the favourites bar; `.sanepen`/`.sanepenset` import/export with a hardened reader; the cross-platform parity golden gate.
**Out:** raw ink capture/filter/geometry (SN-INK area), the palette-dock chrome and lasso (SN-ED area), document persistence internals (SN-CORE), PDF/text layers that smart-highlight snaps to (SN-PDF, SN-HWR), audio-sync (SN-AUD), share transport/relay (SN-SHR/SN-COL).

#### Acceptance criteria
- [ ] All child issues below are closed and CI is green.
- [ ] Every built-in pen is a `PenPreset` with no bespoke render branch (one outline + one stamped renderer serve all pens) (ADR-0009 verify 1).
- [ ] The same preset renders pixel-consistently on Tier A, Tier B and web golden runs within tolerance; the highlighter never darkens overlapping ink (ADR-0009 verify 3/6).
- [ ] An imported `.sanepen` is data-only, schema-validated, and executes nothing (ADR-0009 verify 2).
- [ ] No note/brush content or colour value is logged in profile/release; textures/presets sync only E2E-encrypted.

#### Technical notes
Package: `packages/sane_brushes` (Flutter; depends on `sane_ink`, `sane_core`). Engine spec: docs/architecture/ink-engine.md §3-4; ADR-0009 (schema in `sane_brushes/lib/src/pen_preset.dart`). Shared drawing constants (INK/DARK_INK/HL/WIDTHS) come from docs/design/tokens.json via `sane_ui` (SN-DS-002). Children:
- [ ] [SN-BRS-002](brushes.md#sn-brs-002) PenPreset schema & versioned serialisation
- [ ] [SN-BRS-003](brushes.md#sn-brs-003) stamp-along-path engine (outline + stamped)
- [ ] [SN-BRS-004](brushes.md#sn-brs-004) input-bound response curves + global pressure curve
- [ ] [SN-BRS-005](brushes.md#sn-brs-005) BrushRef + document brush dictionary
- [ ] [SN-BRS-006](brushes.md#sn-brs-006) brush registry, sets, versioning & reset points
- [ ] [SN-BRS-007](brushes.md#sn-brs-007) Shape/Grain texture pipeline
- [ ] [SN-BRS-008](brushes.md#sn-brs-008) default stock pen set (>=12)
- [ ] [SN-BRS-009](brushes.md#sn-brs-009) Fountain pen preset
- [ ] [SN-BRS-010](brushes.md#sn-brs-010) Ballpoint preset
- [ ] [SN-BRS-011](brushes.md#sn-brs-011) Fineliner & Monoline presets
- [ ] [SN-BRS-012](brushes.md#sn-brs-012) Graphite pencil (tilt shading) preset
- [ ] [SN-BRS-013](brushes.md#sn-brs-013) Felt marker preset
- [ ] [SN-BRS-014](brushes.md#sn-brs-014) Gel, soft pencil/charcoal & crayon presets
- [ ] [SN-BRS-015](brushes.md#sn-brs-015) Brush pen / calligraphy preset
- [ ] [SN-BRS-016](brushes.md#sn-brs-016) decorative & effect pens (dashed/dotted, pattern, neon-glow, pixel)
- [ ] [SN-BRS-017](brushes.md#sn-brs-017) highlighter core
- [ ] [SN-BRS-018](brushes.md#sn-brs-018) straight-line & smart highlighter modes
- [ ] [SN-BRS-019](brushes.md#sn-brs-019) eraser modes
- [ ] [SN-BRS-020](brushes.md#sn-brs-020) quick colour palettes + tool-snap rules
- [ ] [SN-BRS-021](brushes.md#sn-brs-021) full colour picker
- [ ] [SN-BRS-022](brushes.md#sn-brs-022) per-notebook palettes, recents & colour-blind support
- [ ] [SN-BRS-023](brushes.md#sn-brs-023) Brush Studio + curve editor
- [ ] [SN-BRS-024](brushes.md#sn-brs-024) favourites bar
- [ ] [SN-BRS-025](brushes.md#sn-brs-025) .sanepen import/export + hardened reader
- [ ] [SN-BRS-026](brushes.md#sn-brs-026) cross-platform render-parity golden gate

#### Security & privacy
Brush presets, textures and colours are note-adjacent content: on device, E2E-encrypted on sync, never logged (ADR-0009 Security-impact). The `.sanepen` import path is the key supply-chain surface: strictly declarative data, reject unknown schema majors, validate/cap texture blobs, execute nothing. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-CODE-4, MASVS-PLATFORM-3, CWE-502 (untrusted deserialisation), CWE-20.

#### UX notes
Surface: design/Sane Notes.dc.html Editor screen; the palette dock (tools/colours/widths/page-nav) in docs/design/screens-and-flows.md §7.3. Everything painted must render in all 17 looks and light+dark (docs/design/design-system.md §4); INK/HL are shared drawing constants, not themed. A11y baseline: 44x44 tool targets, 22px colour dots with a non-colour-only selected state, colour names on every swatch (WCAG 1.4.1), keyboard-reachable on web.

#### Test plan
Unit tests per pure stage in `packages/sane_brushes/test`; golden tests per look for every pen/highlighter; the cross-platform parity gate `packages/sane_brushes/test/parity/brush_render_parity_test.dart` ([SN-BRS-026](brushes.md#sn-brs-026)); studio widget tests. Enumerated per child.

#### Dependencies
SN-FND-002 (scaffold), SN-INK-004 (outline geometry). Coordinates with SN-INK-001 (pipeline), SN-CORE-001 (document model + blob store), SN-DS-002 (tokens), SN-ED-001 (editor/palette dock), SN-RENDER via sane_render.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-002

<a id="sn-brs-002"></a>

**Define the PenPreset schema and versioned serialisation**

| Field | Value |
|---|---|
| GitHub | #145 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `CWE-20`, `CWE-502` |
| Extra labels | agent-ready |

#### Context
Every pen, highlighter and pattern pen is one engine with different parameters (pen-and-brush-spec §0.2, §1.2), so the `PenPreset` data document is the contract the whole area is built on. Getting it right lets agents add pens by writing data, never render code (ADR-0009 Decision 2), and lets a shared pen be safe because it is declarative only. This feature defines the immutable, serialisable schema, its parameter groups, and the forward-compatible versioning + reader that rejects unknown schema majors. It implements PRD-ED-046 (brush parameter schema) and ADR-0009 §2 (parameter schema in `sane_brushes/lib/src/pen_preset.dart`).

#### Scope
**In:** the `PenPreset` value type (immutable, hand-written or freezed) with the parameter groups Identity, Path, Stabilization, Taper, Shape, Grain, Rendering, Blending, Dynamics, Colour-dynamics, Input-curves, Clamps; JSON (de)serialisation with a `schema` version field; a `schemaMajor`/`schemaMinor` split so a reader accepts unknown minors and rejects unknown majors; a canonical, key-sorted encoder so byte-identical round-trips are possible; validation that clamps and enums are in range.
**Out:** the runtime engine that consumes the preset ([SN-BRS-003](brushes.md#sn-brs-003)), the curve type used by dynamics ([SN-BRS-004](brushes.md#sn-brs-004)), the BrushRef/hash + document dictionary ([SN-BRS-005](brushes.md#sn-brs-005)), the `.sanepen` bundle wrapper ([SN-BRS-025](brushes.md#sn-brs-025)), Shape/Grain blob handling ([SN-BRS-007](brushes.md#sn-brs-007)).

#### Acceptance criteria
- [ ] `PenPreset` is immutable; equal presets are `==` and share a `hashCode`; a change produces a new instance (CLAUDE.md §6).
- [ ] `PenPreset.toJson()`/`fromJson()` round-trips byte-identically through the canonical encoder for a fixture of all 8 core pens (golden JSON).
- [ ] A preset whose `schemaMajor` exceeds the reader's supported major is rejected with a typed `Failure` (never a throw across the boundary), and a preset with an unknown minor field loads with that field ignored (forward-compatible).
- [ ] Enum/clamp validation: `minSize<=maxSize`, `minOpacity<=maxOpacity`, opacity in 0..1, unknown enum names rejected; each violation returns a `Result<PenPreset, Failure>` error, not an exception.
- [ ] Public API is pure Dart with explicit return types and `///` dartdoc; `packages/sane_brushes` is a `[pure Dart]`-consuming Flutter package but the schema file imports no `dart:ui`.

#### Technical notes
Files: `packages/sane_brushes/lib/src/pen_preset.dart`, `pen_preset_json.dart`. Groups mirror Procreate Brush Studio trimmed to note needs (ADR-0009 §2; PRD-ED-046 table). Use `Result<T,Failure>` sealed types from `sane_core` for the reader (CLAUDE.md §6). Store enums as string names (platform-neutral, pen-and-brush-spec §9.2), numbers as doubles, curves as node lists. Keep the `provenance` block (author/createdAt/resetPoint) for [SN-BRS-006](brushes.md#sn-brs-006)/[SN-BRS-025](brushes.md#sn-brs-025). Do not embed `var(--...)`, platform handles, or executable content.

#### Security & privacy
The reader is an untrusted-input surface even for first-party files: reject unknown schema majors, bound array/string lengths, and never evaluate embedded content (ADR-0009 Security-impact; CLAUDE.md §7.8). A preset is data, never code. IDs: MASVS-STORAGE-1 (encrypted at rest with the document), MASVS-CODE-4 (no dynamic code), CWE-20 (input validation), CWE-502 (safe deserialisation).

#### UX notes
None beyond baseline: this is a data layer with no chrome. Baseline: no preset field or colour value is logged; a preset is fully usable at its defaults so a student never edits the schema (pen-and-brush-spec §0.1). A11y: N/A (no UI).

#### Test plan
`packages/sane_brushes/test/pen_preset_test.dart` (immutability, equality, clamp/enum validation), `pen_preset_json_test.dart` (byte-identical round-trip of the 8 core pens, unknown-major rejection, unknown-minor tolerance).

#### Dependencies
SN-FND-002 (scaffold + sane_brushes skeleton). Uses `Result`/`Failure` from SN-CORE-002 when available.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-003

<a id="sn-brs-003"></a>

**Implement the stamp-along-path engine (outline and stamped strategies)**

| Field | Value |
|---|---|
| GitHub | #146 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes, ink |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-002](brushes.md#sn-brs-002), [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
Procreate's core insight is that one engine (a Shape stamp carrying a Grain texture, deposited along the stroke Path) expresses every pen as a parameter set, which keeps the renderer small and guarantees a new pen renders identically everywhere (pen-and-brush-spec §1.2; ADR-0009 Decision, §1). This feature builds that engine with two render strategies behind one `PenPreset`: `outline` (a perfect_freehand-style variable-width filled polygon, the default for handwriting) and `stamped` (walk the path placing the Shape at `spacing` intervals, textured by the Grain). It converts a `PenPreset` + a filtered centreline (from `sane_ink` geometry, SN-INK-004) into the fill Path or stamp list that `sane_render` paints. Implements ADR-0009 §1 (two strategies) and the geometry half of PRD-ED-046 rendering.

#### Scope
**In:** a `BrushEngine` that takes `(PenPreset, centreline, dynamics)` and returns a render recipe; the `outline` strategy wrapping the SN-INK-004 `StrokeGeometry` outline; the `stamped` strategy (spacing walk, per-stamp size/roundness/rotation from Shape params, scatter/count/jitter with a seeded PRNG so a redraw is deterministic); `spacing`/`spacingJitter`/`fallOff` handling; a strategy chosen from `PenPreset` (never a platform check); resource caps on stamp count per stroke.
**Out:** the input-bound curve evaluation that supplies dynamics ([SN-BRS-004](brushes.md#sn-brs-004)), the Shape/Grain blob decode + shader precache ([SN-BRS-007](brushes.md#sn-brs-007)), painting into a `Canvas` (sane_render), the pen presets themselves ([SN-BRS-008](brushes.md#sn-brs-008)..[SN-BRS-016](brushes.md#sn-brs-016)).

#### Acceptance criteria
- [ ] A single `outline` renderer and a single `stamped` renderer serve all pens; no pen adds a bespoke branch (ADR-0009 verify 1) — enforced by a test iterating every stock preset.
- [ ] The `stamped` walk places stamps at `spacing` fraction of size with correct count for a fixture path (unit test asserts stamp positions within 0.5 px of expected).
- [ ] Scatter/count/jitter use a stroke-seeded PRNG so re-running the engine on the same stroke yields byte-identical stamp transforms (determinism test).
- [ ] Stamp count per stroke is capped (default cap documented, e.g. 20000) and a pathological high-spacing/long stroke degrades gracefully instead of allocating unbounded (CWE-400 assertion).
- [ ] Geometry/recipe is deterministic across Tier A and Tier B for the same input (byte-identical vertex/stamp list), the precondition for the parity gate [SN-BRS-026](brushes.md#sn-brs-026).

#### Technical notes
Files under `packages/sane_brushes/lib/src/engine/`. Reuse the SN-INK-004 `StrokeGeometry` for `outline`; add `stamped_walker.dart`. Widths in page units, resolution-independent (PRD-ED-008). No `FragmentShader`/`ImageShader`/`Paint` allocated per stamp or per frame — objects are created once and reused (ADR-0009 §6; perf gate docs/architecture/rendering-and-performance.md §8). Pure Dart recipe; actual `Canvas` painting and shader reuse live in `sane_render` and [SN-BRS-007](brushes.md#sn-brs-007).

#### Security & privacy
Stroke inputs/outputs are note content: on device, never logged (CLAUDE.md §7.3). Cap stamp counts and stroke length before allocation to prevent a crafted preset/stroke exhausting memory (CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
No chrome of its own; it is the substrate for the Editor canvas (screens-and-flows.md §7.2). Output must render correctly in all 17 looks and light+dark (colour resolves per theme, not in geometry). Latency: the engine runs on the wet path for the active stroke, so it must add no per-sample allocation and honour the pen-down->pixel budgets (decision 7).

#### Test plan
`packages/sane_brushes/test/engine/brush_engine_test.dart` (strategy dispatch over all presets, no bespoke branch), `stamped_walker_test.dart` (spacing positions, seeded determinism, count cap), a golden of an outline vs a stamped stroke fed into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-002](brushes.md#sn-brs-002) (preset schema), SN-INK-004 (outline geometry).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-004

<a id="sn-brs-004"></a>

**Implement input-bound response curves and the global pressure curve**

| Field | Value |
|---|---|
| GitHub | #147 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-002](brushes.md#sn-brs-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
What makes a pencil feel like a pencil is that every visual property is bindable to an input source via an editable curve, not a scalar (pen-and-brush-spec §1.2; ADR-0009 Decision, §3). This feature implements the curve type and the evaluator that turns raw per-point inputs (pressure, tilt, velocity, twist/barrel-roll, randomness) into the size/opacity/flow/shading values the engine consumes, plus the app-wide pressure-sensitivity curve that pre-multiplies every pen (Procreate §8; PRD-ED-046 Input-curves). Critically, velocity is the default width source when the device reports no pressure, giving the fountain-pen look on pressureless styluses and fingers (ADR-0009 §3; pen-and-brush-spec §2.1) so pressure hardware is never required for good ink.

#### Scope
**In:** a `ResponseCurve` value type of up to 4 piecewise-cubic nodes with a scalar-or-curve union (`{source, curve}`); an evaluator for sources `pressure|tilt|velocity|twist|random`; the fallback that binds width to velocity when `pressureIsReal == false` (from SN-INK normalisation); the global app pressure-sensitivity curve that pre-multiplies pressure before any pen curve; deterministic randomness (stroke-seeded PRNG) so `random`-bound params redraw identically.
**Out:** the curve-editor UI ([SN-BRS-023](brushes.md#sn-brs-023)), the engine that applies the resulting values ([SN-BRS-003](brushes.md#sn-brs-003)), tilt/azimuth capture and normalisation (SN-INK area), taper envelopes handled inside individual presets.

#### Acceptance criteria
- [ ] A `ResponseCurve` of N<=4 nodes evaluates monotonically between nodes with piecewise-cubic interpolation; out-of-range inputs clamp to the endpoint values (unit tests at 0, mid, 1 and beyond).
- [ ] When `pressureIsReal == false`, width is driven by velocity (slow=thin, fast=thick per the Fountain default) and stroke legibility matches the pressure path within tolerance (golden compares a finger vs pen stroke).
- [ ] The global pressure curve pre-multiplies every pen; disabling it (Settings Pressure sensitivity off) yields constant pressure = 1.0 (PRD-ED-021; screens §12).
- [ ] `random`-bound parameters are reproducible: the same stroke + seed yields identical output across two runs and across Tier A/Tier B.
- [ ] Velocity is computed from monotonic timestamps (never wall-clock) so it is frame-rate independent.

#### Technical notes
Files: `packages/sane_brushes/lib/src/curves/response_curve.dart`, `curve_eval.dart`. Consumes the normalised `InkSample` fields from `sane_ink` (pressure, tilt, azimuth, twist, tMicros; SN-INK-010). Sources and node count per ADR-0009 §3. Pure Dart. The pencil tilt graph (30-90 deg altitude -> broad shading) is authored as a preset curve in [SN-BRS-012](brushes.md#sn-brs-012) but evaluated here.

#### Security & privacy
None beyond baseline: input values are note content, on device, never logged (CLAUDE.md §7.3). ID: MASVS-PRIVACY-1.

#### UX notes
No chrome of its own; it powers the feel of every pen and the live preview in Brush Studio ([SN-BRS-023](brushes.md#sn-brs-023)). A11y: users who cannot modulate pressure get identical stroke quality via the velocity model, so pressure is never required for legible ink (PRD-ED-021 A11y).

#### Test plan
`packages/sane_brushes/test/curves/response_curve_test.dart` (interpolation, clamping, node limits), `curve_eval_test.dart` (velocity fallback, global pressure pre-multiply, seeded-random reproducibility, monotonic-time velocity).

#### Dependencies
[SN-BRS-002](brushes.md#sn-brs-002) (preset schema hosts the curve fields). Consumes SN-INK-010 normalised samples.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-005

<a id="sn-brs-005"></a>

**Implement BrushRef and the document brush dictionary for reproducible strokes**

| Field | Value |
|---|---|
| GitHub | #148 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-002](brushes.md#sn-brs-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-354` |
| Extra labels | agent-ready, innovation |

#### Context
Brushes evolve; documents must not. A `.sanenote` opened on any client, now or in three years, must render every stroke identically (pen-and-brush-spec §9). This feature implements the `BrushRef` (`{id, version, paramsHash}`) that every stroke stores and the document-level brush dictionary `paramsHash -> ResolvedBrushParams` (the full, platform-neutral parameter snapshot), so the renderer never guesses defaults and a stroke is renderable from its points + its `ResolvedBrushParams` alone (pen-and-brush-spec §9.1-9.2). Content-addressing by hash also deduplicates: a notebook using one blue fineliner throughout stores the params once. This is the data-integrity backbone that the parity gate ([SN-BRS-026](brushes.md#sn-brs-026)) enforces.

#### Scope
**In:** the `BrushRef` type; a `ResolvedBrushParams` snapshot (every value the engine needs, no `var(--...)`, no platform handles, content-addressed references to Shape/Grain by hash); a stable truncated hash (e.g. SHA-256 of the canonical param encoding); the per-document dictionary with dedupe; the version-compatibility table so an old `id@version` still maps to its params; the 'update stroke to latest Fountain Pen' resolution path (id@version -> current preset) as an explicit user action hook.
**Out:** the SHA/hash primitive selection (from `sane_crypto`), the stroke storage columns (SN-CORE document model), Shape/Grain blob storage in the content-addressed store ([SN-BRS-007](brushes.md#sn-brs-007), SN-CORE blob store), the `.sanenote`/`.sanepen` bundle embed ([SN-BRS-025](brushes.md#sn-brs-025), SN-CORE file-format).

#### Acceptance criteria
- [ ] A stroke renders identically from `points` + `ResolvedBrushParams` alone, with zero reference to the running app's current brush defaults or active look (unit test resolves against an empty registry).
- [ ] `paramsHash` is stable and canonical: two presets with the same resolved params hash-collide (dedupe) and a one-node curve change produces a different hash (test).
- [ ] The document dictionary stores each distinct param set once; 1000 strokes of one pen produce exactly one dictionary entry (dedupe test).
- [ ] Bumping a stock brush `version` never mutates the meaning of an existing `id@version`; the compatibility table resolves the old version to its old params (regression test).
- [ ] Colour is the one exception: `colorRole` indexes shared INK/DARK_INK so it flips with mode; a custom colour is stored as `colorHex` (pen-and-brush-spec §9.2) — verified by a light/dark round-trip.

#### Technical notes
Files: `packages/sane_brushes/lib/src/ref/brush_ref.dart`, `resolved_params.dart`, `brush_dictionary.dart`. Hash via `sane_crypto` content-address hashing (SHA-256/BLAKE3; CLAUDE.md §7.7) — never invent a hash. Snapshot is platform-neutral numbers/enums/curve nodes + hash-refs (pen-and-brush-spec §9.2). Interop with native ink types is an optimisation only; `ResolvedBrushParams` is authoritative (pen-and-brush-spec §9.3). Implements the reproducibility half of ADR-0009 §8.

#### Security & privacy
Resolved params are note content: encrypted at rest and on sync, never logged (CLAUDE.md §7.1/§7.3). Verify a dictionary entry's hash before painting from it and fail closed on mismatch so a corrupted/forged dictionary cannot silently alter a stroke (CWE-354 integrity check). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-354.

#### UX notes
None beyond baseline (data layer). It enables the user-facing 'update this stroke to the latest pen' action defined in [SN-BRS-006](brushes.md#sn-brs-006); that action is opt-in and never automatic (documents must not change under the user). A11y: N/A.

#### Test plan
`packages/sane_brushes/test/ref/brush_ref_test.dart` (render-from-snapshot, hash stability/collision, version compatibility), `brush_dictionary_test.dart` (dedupe count, light/dark colour flip, forged-hash fail-closed).

#### Dependencies
[SN-BRS-002](brushes.md#sn-brs-002) (schema), SN-CORE-002 (document model to host the dictionary + stroke BrushRef). Uses SN-CRY hashing.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-006

<a id="sn-brs-006"></a>

**Implement the brush registry: sets, versioning and reset points**

| Field | Value |
|---|---|
| GitHub | #149 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-002](brushes.md#sn-brs-002), [SN-BRS-008](brushes.md#sn-brs-008) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Pens live in sets (folders) with search, a Recent set and Pin, and a stock brush always has a Reset point so a user can recover it (pen-and-brush-spec §6.3; PRD-ED-064). This feature is the runtime library that loads stock presets, organises user and imported pens into sets, tracks recents, pins favourites at the top, and enforces the rule that editing a brush duplicates it (never mutate a stock brush in place) so the immutable `resetPoint` always restores known-good state (pen-and-brush-spec §6.2; ADR-0009 §7). It also exposes the explicit, user-driven 'update stroke to latest' resolution built on [SN-BRS-005](brushes.md#sn-brs-005).

#### Scope
**In:** the `BrushRegistry` loading stock presets from bundled assets by `id@version`; sets/folders (Writing, Highlighters, Diagrams, My pens, Imported) with reorder; a Recent set (last ~8) and Pin; text search over pen names; duplicate-on-edit semantics; Reset Pen / Create Reset Point restoring the immutable `resetPoint`; per-profile persistence of user sets/order.
**Out:** the favourites bar dock UI ([SN-BRS-024](brushes.md#sn-brs-024)), the Brush Studio editor ([SN-BRS-023](brushes.md#sn-brs-023)), the import/export bundle ([SN-BRS-025](brushes.md#sn-brs-025)), the preset schema ([SN-BRS-002](brushes.md#sn-brs-002)), stock preset content ([SN-BRS-008](brushes.md#sn-brs-008)).

#### Acceptance criteria
- [ ] Stock presets load by `id@version` from assets; a missing/renamed asset fails closed to a typed error, not a crash (unit test).
- [ ] Editing any stock brush creates a duplicate in 'My pens' and leaves the stock brush byte-identical; Reset Pen restores the immutable `resetPoint` exactly (pen-and-brush-spec §6.3; ADR-0009 verify 5).
- [ ] Sets support create/rename/reorder/delete; Pin keeps a pen at the top of its set; Recent auto-tracks the last 8 used and never duplicates an entry.
- [ ] Search matches pen names case-insensitively and returns within one frame for a 200-pen library.
- [ ] Registry state persists per profile and survives close/reopen; switching profiles swaps the visible pen library.

#### Technical notes
Files: `packages/sane_brushes/lib/src/registry/brush_registry.dart`, `brush_set.dart`. Persistence via the `sane_core` repository interfaces (drift-backed; SN-CORE-004) — no direct SQLite in `sane_brushes`. Per-profile isolation follows PRD-PROF-004 / PRD-LB-350. Reset points and provenance come from the `PenPreset` provenance block ([SN-BRS-002](brushes.md#sn-brs-002)). Coordinates with the palette dock (SN-ED-005) for surfacing pens; cross-feature wiring lives in `app/` via Riverpod, not a package-to-package import (CLAUDE.md §3).

#### Security & privacy
Brush presets are note-adjacent content: on device, E2E-encrypted on sync, never logged (ADR-0009 Security-impact). A bundled stock asset is trusted; a user/imported pen is validated by [SN-BRS-025](brushes.md#sn-brs-025) before it reaches the registry. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: the brush picker / library reached by long-pressing the Pen tool (pen-and-brush-spec §5.2; screens §7.3). Every set and pen is labelled with text (not icon-only); search is text; reorder offers a non-drag alternative (move up/down) for switch/keyboard users (PRD-ED-064 A11y; WCAG 2.5.7). Renders across all 17 looks + dark.

#### Test plan
`packages/sane_brushes/test/registry/brush_registry_test.dart` (load, duplicate-on-edit, reset, missing-asset fail-closed), `brush_set_test.dart` (sets/reorder/pin/recent/search, per-profile persistence).

#### Dependencies
[SN-BRS-002](brushes.md#sn-brs-002) (schema + provenance/reset), [SN-BRS-008](brushes.md#sn-brs-008) (stock presets to load). Persists via SN-CORE-004.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-007

<a id="sn-brs-007"></a>

**Build the Shape/Grain texture pipeline (content-addressed, shader reuse)**

| Field | Value |
|---|---|
| GitHub | #150 |
| Type | task |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | brushes, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-003](brushes.md#sn-brs-003), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `CWE-400`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Stamped and textured pens (pencil paper-grain, textured marker, charcoal, pattern) need Shape and Grain images deposited along the path (pen-and-brush-spec §1.2; ADR-0009 §1/§6). Textures are content-addressed blobs referenced by hash: built-ins ship as assets, custom ones travel in the `.sanepen`/document (pen-and-brush-spec §9.2; ADR-0009 §6). This task builds the pipeline that loads, validates, precaches and reuses these images as `ImageShader`/`FragmentShader` across frames — never per stroke — which is the load-bearing perf rule for stamped pens (ADR-0009 §6; rendering-and-performance.md §8).

#### Scope
**In:** loading Shape/Grain images by content hash from bundled assets and from the `sane_core` blob store; validating an image as a real image before use (MIME/magic, dimension cap, byte cap) and re-encoding to a safe internal format; a shader/image cache keyed by hash so shaders are created once and reused; Grain `moving` vs `texturized` behaviour (texturized stays fixed to the page like graphite on tooth); a graceful fallback to a plain fill where shaders are unavailable (some web paths).
**Out:** the engine walk that places stamps ([SN-BRS-003](brushes.md#sn-brs-003)), individual pen presets ([SN-BRS-012](brushes.md#sn-brs-012)/[SN-BRS-014](brushes.md#sn-brs-014)/[SN-BRS-016](brushes.md#sn-brs-016)), the blob-store implementation (SN-CORE-004), the `.sanepen` import that supplies custom textures ([SN-BRS-025](brushes.md#sn-brs-025)).

#### Acceptance criteria
- [ ] A Shape/Grain image is validated (magic bytes + declared MIME agree, dimensions <= a documented cap e.g. 2048x2048, bytes <= a documented cap) and re-encoded before use; an oversized or malformed image is rejected to a typed error, decoded off the UI isolate (CLAUDE.md §7.8).
- [ ] No `ImageShader`/`FragmentShader`/`Image` is allocated per stroke or per frame; the cache reuses one instance per hash (allocation assertion; ADR-0009 verify 4).
- [ ] `texturized` grain stays locked to page coordinates under pan/zoom (a pencil stroke drawn, then panned, keeps its grain registration) while `moving` grain follows the stamp (golden comparison).
- [ ] Where shaders are unavailable the pen degrades to a plain fill with no crash and no missing stroke (web fallback test; ADR-0009 Consequences).
- [ ] A decompression/zip-bomb style image (tiny file, huge decoded size) is capped before allocation (CWE-400 test).

#### Technical notes
Files: `packages/sane_render/lib/src/texture/` (shaders live with painting) + `packages/sane_brushes/lib/src/texture/grain.dart` (behaviour). Content-address hashing via `sane_crypto`; blobs from SN-CORE-004. Precache shaders offline under Impeller to avoid first-use jank (rendering-and-performance.md §7; ADR-0008). Image decode off the UI isolate via `Isolate.run` (CLAUDE.md §8). Implements ADR-0009 §6.

#### Security & privacy
Shape/Grain images are untrusted input even for first-party where a document carries custom textures: validate type/size, cap resources before decode, parse off the UI isolate, content-address so a malicious texture cannot overwrite a built-in (ADR-0009 Security-impact; CLAUDE.md §7.8). IDs: MASVS-STORAGE-1, MASVS-CODE-4, CWE-400 (resource caps), CWE-20 (input validation).

#### UX notes
No chrome; the effect is textured pens that feel physical. Textured pens must render correctly in all 17 looks + dark and must honour the perf gate (they cost more than outline pens; keep them off the low-end default set, ADR-0009 Consequences). A11y: texture is decorative; a pen remains legible without grain.

#### Test plan
`packages/sane_brushes/test/texture/grain_test.dart` (texturized vs moving registration), `packages/sane_render/test/texture/shader_cache_test.dart` (one-shader-per-hash reuse, no per-frame alloc), a validation test for oversized/malformed/decompression-bomb images.

#### Dependencies
[SN-BRS-003](brushes.md#sn-brs-003) (engine consumes textures), SN-CORE-004 (blob store).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-008

<a id="sn-brs-008"></a>

**Ship the default stock pen set (>=12 presets) as pure data**

| Field | Value |
|---|---|
| GitHub | #151 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-003](brushes.md#sn-brs-003), [SN-BRS-004](brushes.md#sn-brs-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Sane Notes ships a curated kit, not a 200-brush store: a small set of pens tuned to feel great with tilt+pressure+velocity, each a pure parameter set of the one engine (pen-and-brush-spec §0, §2; ADR-0009 §4). A student writes beautifully with the defaults and never opens the Studio. This feature is the umbrella that assembles and registers the >=12 stock presets (PRD-ED-047), wires the quick-width S/M/L presets per pen into the dock's three-dot picker (pen-and-brush-spec §2), groups pens into the Pens/Pencils/Markers/Decorative sets, and guarantees each stock pen has a reset point and bundles only first-party Shape/Grain assets. The individual preset tables are implemented in the child tasks [SN-BRS-009](brushes.md#sn-brs-009)..[SN-BRS-016](brushes.md#sn-brs-016).

#### Scope
**In:** the manifest that registers all stock presets by `id@version`; per-pen S/M/L width presets mapped to the three-dot quick picker (Fountain uses WIDTHS = 1.6/2.6/4.4, others define their own S/M/L, pen-and-brush-spec §2); the Pens/Pencils/Markers/Decorative set assignment; a smoke test that every stock pen loads, resolves params, and renders a reference stroke; bundling of first-party Shape/Grain assets for textured pens.
**Out:** the individual preset parameter tables (child tasks [SN-BRS-009](brushes.md#sn-brs-009)..[SN-BRS-016](brushes.md#sn-brs-016)), the registry/sets runtime ([SN-BRS-006](brushes.md#sn-brs-006)), the favourites bar ([SN-BRS-024](brushes.md#sn-brs-024)), highlighter ([SN-BRS-017](brushes.md#sn-brs-017)) and eraser ([SN-BRS-019](brushes.md#sn-brs-019)) which are their own tools.

#### Acceptance criteria
- [ ] At least 12 stock pens are registered and loadable; the M1 core six (Fountain, Ballpoint, Fineliner, Pencil, Marker + Monoline) are present (PRD-ED-047; pen-and-brush-spec §2).
- [ ] Each pen exposes S/M/L width presets that the dock three-dot picker selects; selecting a width sets the correct page-unit base width for that pen (unit test per pen).
- [ ] Every stock pen renders a reference stroke on finger/mouse input (no pressure hardware) legibly via the velocity model ([SN-BRS-004](brushes.md#sn-brs-004)) — golden per pen.
- [ ] Every stock pen has an immutable reset point and bundles only first-party assets (ADR-0009 §4/§7; no third-party texture ships).
- [ ] Adding a new stock pen requires only a new `PenPreset` (data), no new render branch (ADR-0009 verify 1) — enforced by the parity iteration test.

#### Technical notes
Files: `packages/sane_brushes/lib/src/presets/` (one file per pen) + `stock_presets.dart` manifest + `assets/brushes/` (Shape/Grain). Legend for the preset tables: P=pressure, V=velocity, T=tilt, Az=azimuth, R=barrel roll (PRD-ED-047). Widths in page units (page 800x1040; WIDTHS render ~5/9/13 px). Sets per PRD-ED-064. Implements PRD-ED-047 and the pen-and-brush-spec §2 default pen set.

#### Security & privacy
Stock presets and assets are first-party and trusted; they are still note-adjacent content synced E2E-encrypted and never logged (ADR-0009 Security-impact). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
The default pen is the Fountain Pen (`tool: pen` in the mockup; screens §7). Pens are chosen from the favourites bar / brush library; the dock shows the current tool (pen-and-brush-spec §5.2). Brush names are text, not icon-only (PRD-ED-047 A11y). All pens render across the 17 looks + dark; ink colour comes from INK/DARK_INK, not the look.

#### Test plan
`packages/sane_brushes/test/presets/stock_presets_test.dart` (all >=12 load + resolve + reset present + first-party assets only), a per-pen finger-input golden, and the manifest feeds the parity gate [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-003](brushes.md#sn-brs-003) (engine), [SN-BRS-004](brushes.md#sn-brs-004) (curves). Child presets [SN-BRS-009](brushes.md#sn-brs-009)..[SN-BRS-016](brushes.md#sn-brs-016).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-009

<a id="sn-brs-009"></a>

**Author the Fountain Pen preset (velocity + light pressure, the default)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes |
| Size | S |
| SDLC | implementation |
| Parent | [SN-BRS-008](brushes.md#sn-brs-008) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The Fountain Pen is the everyday writing pen and the product default (what `tool: pen` selects in the mockup), tuned so handwriting looks alive even with no pressure hardware via velocity thinning (pen-and-brush-spec §2.1; PRD-ED-047 pen 1). This task authors it purely as a `PenPreset` (no render code) using the engine ([SN-BRS-003](brushes.md#sn-brs-003)), curves ([SN-BRS-004](brushes.md#sn-brs-004)) and outline strategy.

#### Scope
**In:** the `pen.fountain` preset: `outline` strategy; base width 2.6 with range 0.8-5.5 and S/M/L presets 1.6/2.6/4.4 (= WIDTHS); width driven by velocity (slow=thin, fast=thick) plus light pressure; pressure-driven start+end taper with a fixed fallback so finger/USB-C Pencil still taper; streamline smoothing default ~45%; round shape, no grain; blend normal, opacity 1.0; ink layer.
**Out:** the engine/curves it consumes, the quick-width dock picker ([SN-BRS-020](brushes.md#sn-brs-020)/SN-ED palette dock), the registry that surfaces it ([SN-BRS-006](brushes.md#sn-brs-006)).

#### Acceptance criteria
- [ ] `pen.fountain` loads and resolves to `ResolvedBrushParams` with base 2.6, range 0.8-5.5, S/M/L = 1.6/2.6/4.4 (pen-and-brush-spec §2.1).
- [ ] On a pressureless input (finger/USB-C Pencil), a fast stroke is visibly thinner than a slow stroke (velocity thinning; golden at two speeds).
- [ ] Start and end taper appear on both pressure and pressureless input via the fixed fallback (golden).
- [ ] Default streamline ~45%; a fast diagonal stays straight and handwriting stays responsive (no perceptible lag; latency budget honoured).
- [ ] Opacity 1.0, blend normal, ink layer; the stroke never lands on the highlight layer.

#### Technical notes
File: `packages/sane_brushes/lib/src/presets/pen_fountain.dart`. Velocity is the default width source when `pressureIsReal == false` ([SN-BRS-004](brushes.md#sn-brs-004); ADR-0009 §3). Numbers from pen-and-brush-spec §2.1 and PRD-ED-047 pen 1 (base 2.6, range 0.8-5.5). Pure data preset; verify against the reference render in [SN-BRS-026](brushes.md#sn-brs-026).

#### Security & privacy
None beyond baseline: the preset is first-party data; strokes are note content, on device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
This is the default tool; it must feel great out of the box across all 17 looks + dark, with ink colour from INK[0] near-black `#1f1f24` (DARK_INK[0] `#f2efe8` in dark) (design-system.md §2). A11y: legible on finger input without pressure (velocity model).

#### Test plan
`packages/sane_brushes/test/presets/pen_fountain_test.dart` (params, velocity thinning, taper fallback), golden strokes at S/M/L and two speeds fed into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (default set umbrella; engine + curves).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-010

<a id="sn-brs-010"></a>

**Author the Ballpoint preset (constant weight, everyday opaque pen)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes |
| Size | XS |
| SDLC | implementation |
| Parent | [SN-BRS-008](brushes.md#sn-brs-008) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
The Ballpoint is the reliable everyday pen for people who dislike variable width: consistent weight, not pressure-sensitive, deliberate (pen-and-brush-spec §2.2; PRD-ED-047 pen 2). This task authors it as a pure `PenPreset` with the outline strategy and near-constant dynamics.

#### Scope
**In:** the `pen.ball` preset: `outline`; base width 1.8, range 1.2-3.0, S/M/L 1.4/2.2/3.4; flat width (pressure -> tiny opacity only); no tilt, no velocity thinning; subtle fixed taper at ends only; optional very faint grain (off by default to keep it pure-outline and cheap); opacity 1.0; blend normal, ink layer; streamline ~30-40%.
**Out:** the engine/curves it consumes; the faint-grain texture asset (if enabled) which uses [SN-BRS-007](brushes.md#sn-brs-007).

#### Acceptance criteria
- [ ] `pen.ball` loads with base 1.8, range 1.2-3.0, S/M/L = 1.4/2.2/3.4 (pen-and-brush-spec §2.2; PRD-ED-047 pen 2).
- [ ] Width is constant across pressure and speed; pressure changes only opacity by a small amount (golden: fast vs slow strokes are the same width).
- [ ] A subtle fixed taper appears only at the stroke ends.
- [ ] Opacity 1.0, blend normal, ink layer; reliable on finger/mouse/stylus alike.
- [ ] Renders identically on Tier A/Tier B/web (feeds [SN-BRS-026](brushes.md#sn-brs-026)).

#### Technical notes
File: `packages/sane_brushes/lib/src/presets/pen_ball.dart`. Constant-width means the width curve is a flat scalar, not velocity/pressure-bound ([SN-BRS-004](brushes.md#sn-brs-004)). Keep grain off by default so it stays a pure-outline, low-cost pen. Numbers from pen-and-brush-spec §2.2.

#### Security & privacy
None beyond baseline: first-party data preset; strokes are note content, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
A plain, predictable pen; renders across all 17 looks + dark with INK colours. A11y: constant width is itself a legibility aid for users who cannot modulate pressure.

#### Test plan
`packages/sane_brushes/test/presets/pen_ball_test.dart` (params, constant width across speed/pressure, end taper), golden at S/M/L into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (default set umbrella; engine + curves).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-011

<a id="sn-brs-011"></a>

**Author the Fineliner and Monoline presets (constant-width diagram pens)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes |
| Size | S |
| SDLC | implementation |
| Parent | [SN-BRS-008](brushes.md#sn-brs-008) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
The Fineliner is the crisp technical pen for precise diagrams, tables and small text; the Monoline is the perfectly uniform diagram/flowchart pen whose width never varies with anything (pen-and-brush-spec §2.3, §2.7; PRD-ED-047 pens 3 and 10). Both are constant-width outline pens that pair with high smoothing and dwell-to-perfect, so they are authored together as two related `PenPreset`s.

#### Scope
**In:** `pen.fineliner`: base 1.6, range 0.4-3.0, S/M/L 0.8/1.2/1.8; flat width; no tilt/velocity; no taper; edge filtering `improved` (crisp anti-aliasing); streamline ~65%. `pen.monoline`: base 2.6, range 0.5-8, S/M/L 1.2/2.0/3.2; uniform width (pressure/tilt/velocity all ignored); no taper; streamline ~55-60%. Both outline, opacity 1.0, blend normal, ink layer.
**Out:** the QuickShape/QuickLine dwell recogniser they pair with (SN-SHP/SN-ED area), the engine/curves they consume.

#### Acceptance criteria
- [ ] `pen.fineliner` loads with base 1.6, range 0.4-3.0, S/M/L 0.8/1.2/1.8 and `edgeFiltering = improved` (pen-and-brush-spec §2.3).
- [ ] `pen.monoline` loads with base 2.6, range 0.5-8, S/M/L 1.2/2.0/3.2 and ignores pressure, tilt and velocity entirely (golden: identical width regardless of input).
- [ ] Fineliner streamline ~65% and Monoline ~55-60%; a rough straight line is visibly crisper than the Fountain default (golden).
- [ ] Neither pen tapers; ends are uniform (Monoline) / sharp (Fineliner).
- [ ] Both render identically across Tier A/Tier B/web (feeds [SN-BRS-026](brushes.md#sn-brs-026)).

#### Technical notes
Files: `packages/sane_brushes/lib/src/presets/pen_fineliner.dart`, `pen_monoline.dart`. `improved` edge filtering maps to the Shape `edgeFiltering` enum (PRD-ED-046 Shape group). Uniform width = flat scalar width, no input binding ([SN-BRS-004](brushes.md#sn-brs-004)). Numbers from pen-and-brush-spec §2.3/§2.7.

#### Security & privacy
None beyond baseline: first-party data presets; strokes are note content, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
The precise pens for diagrams/tables; high smoothing pairs with dwell-to-perfect boxes/rules (pen-and-brush-spec §7). Render across all 17 looks + dark with INK colours. A11y: crisp, high-contrast lines aid low-vision users.

#### Test plan
`packages/sane_brushes/test/presets/pen_fineliner_test.dart` and `pen_monoline_test.dart` (params, constant width, smoothing, no taper), goldens into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (default set umbrella; engine + curves).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-012

<a id="sn-brs-012"></a>

**Author the Graphite Pencil preset with tilt shading**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-008](brushes.md#sn-brs-008) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008), [SN-BRS-007](brushes.md#sn-brs-007) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
Tilt-to-shade graphite is a headline differentiator: tilting the pencil sideways produces wide, soft shading exactly like a real pencil, with paper-grain texture that stays fixed to the page like graphite on tooth (pen-and-brush-spec §2.4; PRD-ED-047 pen 5; PRD-ED-022). This task authors the `pen.pencil` preset combining a pressure->opacity+size curve, a tilt->broad-shading curve, and a texturized paper Grain.

#### Scope
**In:** the `pen.pencil` preset: base width 2.4, range 1.2-6.0, S/M/L 2.0/3.2/5.0; pressure -> opacity and size (4-node curve, press harder = darker); tilt -> broad soft shading (Tilt->Size + Tilt->Opacity/Gradation) ramping in from ~30-90 deg altitude; paper-grain Grain in `texturized` behaviour; opacity 0.9 default (builds on overlap); slight velocity -> opacity; soft pressure-driven taper; streamline ~20-30%; ink layer.
**Out:** the texturized grain pipeline itself ([SN-BRS-007](brushes.md#sn-brs-007)), the tilt-capture normalisation (SN-INK-010), the curve evaluator ([SN-BRS-004](brushes.md#sn-brs-004)).

#### Acceptance criteria
- [ ] `pen.pencil` loads with base 2.4, range 1.2-6.0, S/M/L 2.0/3.2/5.0, opacity 0.9 (pen-and-brush-spec §2.4; PRD-ED-047 pen 5).
- [ ] Tilting the stylus (altitude decreasing from ~90 to ~30 deg) widens and softens the stroke into shading; a perpendicular pen writes a fine line (golden across three tilt angles).
- [ ] Pressure raises both opacity and size on a 4-node curve; overlapping strokes build up darker (golden overlap).
- [ ] The paper grain is `texturized` and stays registered to the page under pan/zoom (not `moving`).
- [ ] On a device without tilt hardware, the pencil still writes legibly (pressure/velocity fallback) with no shading, no crash.

#### Technical notes
File: `packages/sane_brushes/lib/src/presets/pen_pencil.dart`. The tilt graph (30-90 deg -> broad shading) is authored here and evaluated by [SN-BRS-004](brushes.md#sn-brs-004); the grain uses the texturized path from [SN-BRS-007](brushes.md#sn-brs-007) with a bundled first-party paper-grain asset. Numbers from pen-and-brush-spec §2.4 / PRD-ED-047 pen 5. `texturized` behaviour per PRD-ED-046 Grain group.

#### Security & privacy
None beyond baseline: first-party preset + bundled grain asset; strokes are note content, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Must read as pencil across all 17 looks + dark; the grain is subtle and never obscures legibility. A11y: tilt shading is an enhancement, not required; the pencil is fully usable without a tilt-capable stylus (PRD-ED-022 A11y).

#### Test plan
`packages/sane_brushes/test/presets/pen_pencil_test.dart` (params, tilt-shading curve across angles, pressure build-up, texturized registration, no-tilt fallback), goldens into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (default set umbrella), [SN-BRS-007](brushes.md#sn-brs-007) (texturized grain).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-013

<a id="sn-brs-013"></a>

**Author the Felt Marker preset (chisel tip, azimuth-driven)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | brushes |
| Size | S |
| SDLC | implementation |
| Parent | [SN-BRS-008](brushes.md#sn-brs-008) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
The Marker is the opaque felt-tip for emphasis and bold annotation, distinct from the translucent highlighter: a chisel tip whose broad/thin edge follows the pen's tilt direction, near-opaque so overlaps darken slightly like a real marker (pen-and-brush-spec §2.6; PRD-ED-047 pen 8). This task authors the `pen.marker` preset.

#### Scope
**In:** the `pen.marker` preset: base width 4.4, range 2.5-12, S/M/L 5.0/8.0/14.0; near-constant width with mild pressure -> opacity; chisel Shape with `inputStyle = azimuth` (flat tip follows tilt); felt Grain in `moving` behaviour (slightly streaky); opacity ~0.85-0.92 (near-opaque, overlaps darken); blend normal/multiply-ish; slight fixed taper; streamline ~45%; ink layer.
**Out:** the azimuth capture (SN-INK-010), the felt grain asset pipeline ([SN-BRS-007](brushes.md#sn-brs-007)), the highlighter (a separate translucent tool, [SN-BRS-017](brushes.md#sn-brs-017)).

#### Acceptance criteria
- [ ] `pen.marker` loads with base 4.4, range 2.5-12, S/M/L 5.0/8.0/14.0 (pen-and-brush-spec §2.6; PRD-ED-047 pen 8).
- [ ] The chisel edge is broad or thin depending on stroke direction vs azimuth (golden across two stroke directions).
- [ ] Opacity ~0.9; two overlapping marker strokes are visibly darker than one (golden overlap) but the pen stays on the ink layer (not the highlight layer).
- [ ] On a device without azimuth, the chisel defaults to a fixed nib angle and still writes bold, no crash.
- [ ] Renders identically across Tier A/Tier B/web (feeds [SN-BRS-026](brushes.md#sn-brs-026)).

#### Technical notes
File: `packages/sane_brushes/lib/src/presets/pen_marker.dart`. `inputStyle = azimuth` per PRD-ED-046 Shape group; felt grain `moving` per Grain group. Distinct from the highlighter which uses `multiply` behind ink ([SN-BRS-017](brushes.md#sn-brs-017)). Numbers from pen-and-brush-spec §2.6.

#### Security & privacy
None beyond baseline: first-party preset; strokes are note content, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Bold annotation pen; renders across all 17 looks + dark with INK colours. A11y: usable without azimuth (fixed-nib fallback); bold weight aids visibility.

#### Test plan
`packages/sane_brushes/test/presets/pen_marker_test.dart` (params, azimuth chisel across directions, overlap darkening, no-azimuth fallback), goldens into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (default set umbrella; engine + curves).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-014

<a id="sn-brs-014"></a>

**Author the Gel, Soft Pencil/Charcoal and Crayon presets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-008](brushes.md#sn-brs-008) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008), [SN-BRS-007](brushes.md#sn-brs-007) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Beyond the M1 core six, the >=12-brush catalogue adds SHOULD/MAY pens that are the same one engine with different parameters (PRD-ED-047 pens 4/6/13; pen-and-brush-spec §2 note). This task authors three: the Gel Pen (smooth, glossy, saturated, moderate pressure), the Soft Pencil/Charcoal (buildable graphite/charcoal for sketchy diagrams and margin art), and the Crayon/Wax (playful heavy-wax texture for younger/personal notebooks).

#### Scope
**In:** `pen.gel`: `outline`; base 2.2, range 1.0-5.0; pressure (moderate range), glossy opaque; start+end pressure taper; streamline ~40%. `pen.charcoal` (soft pencil/charcoal): `stamped`; base 3.0, range 1.5-10; pressure -> opacity+size; strong tilt shading; coarse charcoal Grain texturized; light-glaze rendering (buildable on overlap). `pen.crayon`: `stamped`; pressure+tilt; heavy wax Grain texturized. All ink layer.
**Out:** the texturized grain pipeline ([SN-BRS-007](brushes.md#sn-brs-007)) and grain assets, the tilt/pressure curve evaluator ([SN-BRS-004](brushes.md#sn-brs-004)).

#### Acceptance criteria
- [ ] `pen.gel` loads with base 2.2, range 1.0-5.0 and renders a smooth glossy opaque line with moderate pressure width response (pen-and-brush-spec §2 / PRD-ED-047 pen 4).
- [ ] `pen.charcoal` loads with base 3.0, range 1.5-10, coarse charcoal texturized grain, light-glaze buildable on overlap; strong tilt widens the shading (golden across tilt).
- [ ] `pen.crayon` renders a heavy wax texture that builds on overlap and responds to pressure+tilt.
- [ ] Each degrades gracefully on finger/mouse (velocity substitutes for pressure) and where shaders are unavailable falls back to a plain fill (web).
- [ ] All three render identically across Tier A/Tier B/web where shaders exist (feeds [SN-BRS-026](brushes.md#sn-brs-026)).

#### Technical notes
Files: `packages/sane_brushes/lib/src/presets/pen_gel.dart`, `pen_charcoal.dart`, `pen_crayon.dart`. Charcoal/crayon use the `stamped` strategy + texturized Grain ([SN-BRS-007](brushes.md#sn-brs-007)); Gel is pure `outline`. Rendering `mode` (glaze->blend) per PRD-ED-046 Rendering group. Keep textured pens off the low-end default set (ADR-0009 Consequences; perf gate). Numbers from PRD-ED-047 pens 4/6/13.

#### Security & privacy
None beyond baseline: first-party presets + bundled grain assets; strokes are note content, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Sketch/personal pens; render across all 17 looks + dark. A11y: all usable without pressure/tilt hardware; texture is decorative and never required for legibility.

#### Test plan
`packages/sane_brushes/test/presets/pen_gel_test.dart`, `pen_charcoal_test.dart`, `pen_crayon_test.dart` (params, texture behaviour, overlap build-up, finger + shader-absent fallbacks), goldens into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (default set umbrella), [SN-BRS-007](brushes.md#sn-brs-007) (texturized grain).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-015

<a id="sn-brs-015"></a>

**Author the Brush Pen / Calligraphy preset (azimuth nib, angle lock)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-008](brushes.md#sn-brs-008) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008), [SN-BRS-004](brushes.md#sn-brs-004) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
The Brush Pen / Calligraphy pen is the expressive, highly pressure-sensitive tool for headings and hand-lettering: a chisel/nib whose angle follows the pen's tilt direction (azimuth), with an optional fixed nib-angle slider and a lock-angle toggle for consistent calligraphy (pen-and-brush-spec §2.5; PRD-ED-047 pen 7). It is one preset with a wide pressure range and azimuth-driven shape.

#### Scope
**In:** the `pen.brush` preset: base 3.2, range 0.6-14, S/M/L 3.0/6.0/10.0; steep pressure curve (big width range light->heavy); Shape roundness squash with `inputStyle = azimuth` (nib follows tilt direction); an optional nib-angle setting (0/30/45 deg, negative for left-handers) with a `lock angle` toggle that overrides barrel roll; strong pressure taper; optional velocity thinning (off by default); light bristle grain (optional); streamline ~45-50%; ink layer; barrel-roll (R) rotates the nib live where hardware provides it (Apple Pencil Pro / S Pen).
**Out:** the barrel-roll/azimuth capture (SN-INK-010/SN-INK-018), the nib-angle setting UI surface (Settings; PRD-SET), the curve evaluator ([SN-BRS-004](brushes.md#sn-brs-004)).

#### Acceptance criteria
- [ ] `pen.brush` loads with base 3.2, range 0.6-14, S/M/L 3.0/6.0/10.0, steep pressure curve (pen-and-brush-spec §2.5).
- [ ] The nib angle follows azimuth by default; with `lock angle` on, the nib holds the chosen fixed angle and ignores barrel roll (golden: locked vs unlocked).
- [ ] The nib-angle setting accepts 0/30/45 and negative angles for left-handers (unit test).
- [ ] Heavy pressure yields a wide stroke and light pressure a thin one with strong taper (golden across pressure).
- [ ] On hardware without azimuth/roll, the pen uses the fixed nib angle and remains usable (no crash).

#### Technical notes
File: `packages/sane_brushes/lib/src/presets/pen_brush.dart`. `inputStyle = azimuth` / `azimuth+roll` per PRD-ED-046 Shape group; barrel-roll binding via [SN-BRS-004](brushes.md#sn-brs-004) (`source: twist`). Lock-angle overrides the roll input. Numbers from pen-and-brush-spec §2.5 / PRD-ED-047 pen 7.

#### Security & privacy
None beyond baseline: first-party preset; strokes are note content, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Expressive headings/lettering; renders across all 17 looks + dark. The nib-angle control lives in the pen's secondary options and honours left-handed mode (negative angle). A11y: orientation-driven effects have a fixed-angle fallback (PRD-ED-023 A11y).

#### Test plan
`packages/sane_brushes/test/presets/pen_brush_test.dart` (params, azimuth nib, lock-angle overrides roll, nib-angle range incl. negative, no-azimuth fallback), goldens into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (default set umbrella), [SN-BRS-004](brushes.md#sn-brs-004) (azimuth/roll curves).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-016

<a id="sn-brs-016"></a>

**Author decorative & effect pens: dashed/dotted, pattern, neon-glow, pixel**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | core |
| Areas | brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-008](brushes.md#sn-brs-008) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008), [SN-BRS-007](brushes.md#sn-brs-007) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
The decorative and novelty pens are delight features built from the same engine: dashed/dotted are a stroke style (high spacing), the pattern pen stamps a motif at wide spacing, and the effect pens (neon/glow, pixel, and the PRD-ED-192 rainbow/glitter family) use colour dynamics and blending (pen-and-brush-spec §2.8-2.9; PRD-ED-047 pens 11/12, PRD-ED-192). This task authors them and the Solid/Dashed/Dotted stroke-style toggle exposed on every pen.

#### Scope
**In:** `pen.dashed`/`pen.dotted` presets (high `spacing`: dashed = elongated stamp + gaps, dotted = round stamp + wide gaps; adjustable dash length + gap; inherit the base pen's size); the Solid/Dashed/Dotted stroke-style toggle available on any pen (secondary options); `pen.pattern` (custom `shapeSource` motif at wide spacing + scatter/count/colour jitter); `pen.neon` (glow via additive/screen blend + soft outer falloff); `pen.pixel` (hard-edged square stamp, no anti-alias, grid-quantised). All keep opacity/blend per their table; effect pens ship behind the 'more pens' set, not the default quick palette.
**Out:** the texture/motif asset pipeline ([SN-BRS-007](brushes.md#sn-brs-007)), colour-dynamics evaluation ([SN-BRS-004](brushes.md#sn-brs-004)), the stroke-style UI chrome placement (SN-ED palette dock).

#### Acceptance criteria
- [ ] `pen.dashed`/`pen.dotted` render repeated stamps with gaps via high `spacing`; dash length and gap are adjustable and inherit the base pen size (golden).
- [ ] The Solid/Dashed/Dotted toggle converts any pen's stroke style without changing its other params (unit test toggling on the Fineliner).
- [ ] `pen.pattern` places the motif at wide spacing with scatter/count/colour jitter, deterministic under a stroke seed (redraw identical).
- [ ] `pen.neon` glows (additive/screen blend + outer falloff) and `pen.pixel` renders hard-edged grid-quantised squares with no anti-aliasing (goldens).
- [ ] Effect pens are excluded from the default quick palette and appear only in the 'more pens' set; each degrades to a plain fill where its blend/shader is unavailable (web).

#### Technical notes
Files: `packages/sane_brushes/lib/src/presets/pen_dashed.dart`, `pen_pattern.dart`, `pen_neon.dart`, `pen_pixel.dart` + a `stroke_style.dart` toggle on `PenPreset`. Dashed/dotted/pattern are `stamped` via [SN-BRS-003](brushes.md#sn-brs-003) + [SN-BRS-007](brushes.md#sn-brs-007); neon uses `strokeBlendMode` screen/add (PRD-ED-046 Blending group); pixel disables edge filtering and quantises. Numbers/behaviour from pen-and-brush-spec §2.8-2.9 and PRD-ED-192.

#### Security & privacy
None beyond baseline: first-party presets + bundled motif assets; strokes are note content, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Callouts, cut-lines, dividers and playful accents; render across all 17 looks + dark. A11y: never encode meaning in a decorative pen alone; effect pens are opt-in and off the default path (PRD-ED-192; respect Reduce Motion for any animated glow).

#### Test plan
`packages/sane_brushes/test/presets/decorative_pens_test.dart` (spacing gaps, style toggle, seeded pattern determinism, neon blend, pixel quantisation, quick-palette exclusion, web fallback), goldens into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (default set umbrella), [SN-BRS-007](brushes.md#sn-brs-007) (motif/texture stamps).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-017

<a id="sn-brs-017"></a>

**Implement the highlighter (chisel, multiply-behind ink, own layer)**

| Field | Value |
|---|---|
| GitHub | #152 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-003](brushes.md#sn-brs-003), [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The default highlighter is a semi-transparent wide stroke that must sit behind ink so it never covers handwriting, and must not darken on overlap so passing over the same text twice does not turn it muddy (pen-and-brush-spec §3; PRD-ED-066/069; ADR-0009 §5). This feature implements the highlighter as a `PenPreset` with a `multiply` blend on a dedicated highlight layer that is always sorted before (under) ink, using the shared HL palette.

#### Scope
**In:** the `hl.chisel` preset: fixed width 22 page-units, opacity 0.5, chisel Shape with `inputStyle = azimuth`, `blendMode = multiply` on the `highlight` layer sorted before ink; HL palette colours only (yellow/pink/green/blue); the layer-ordering rule so a highlight drawn after ink still renders under it; highlighter strokes remain erasable and editable (recolour/reselect) like ink; the fixed-width behaviour in the quick picker (selecting a pen width switches back to pen).
**Out:** the straight-line and smart (PDF/typed-text snap) modes ([SN-BRS-018](brushes.md#sn-brs-018)), the HL quick palette swatches ([SN-BRS-020](brushes.md#sn-brs-020)), the eraser that can target highlights ([SN-BRS-019](brushes.md#sn-brs-019)), the watercolor-wash highlighter (optional, off the critical path).

#### Acceptance criteria
- [ ] `hl.chisel` renders at width 22, opacity 0.5, HL colour, on the highlight layer under ink; a highlight drawn after ink still sits behind it (golden; PRD-ED-069).
- [ ] Passing the highlighter twice over the same area does not darken (multiply-behind so it never turns muddy) (golden overlap; ADR-0009 verify 3).
- [ ] Highlighter strokes are erasable and re-selectable/recolourable after the fact (editable vector) (widget test).
- [ ] Selecting a pen width while the highlighter is active switches the tool back to pen (fixed highlighter width); picking a pen INK colour also switches back to pen (screens §7.3; pen-and-brush-spec §3).
- [ ] The chisel angle follows azimuth where available and uses a fixed nib angle otherwise (no crash).

#### Technical notes
File: `packages/sane_brushes/lib/src/presets/hl_chisel.dart` + the highlight-layer sort in `sane_render`. `blendMode = multiply` per ADR-0009 §5 / PRD-ED-046 Blending; layer = `highlight` (sorts first) per pen-and-brush-spec §1.1. Width 22 and HL colours are shared drawing constants from tokens.json (design-system §2). Consumes the wet renderer SN-INK-005 for the active stroke.

#### Security & privacy
None beyond baseline: highlight strokes are note content, on device, never logged (CLAUDE.md §7.3). ID: MASVS-PRIVACY-1.

#### UX notes
Surface: the highlighter tool in the palette dock (screens §7.3). When active, the quick palette shows the 4 HL swatches, selected with a double ring ([SN-BRS-020](brushes.md#sn-brs-020)). A11y: the highlight must not reduce underlying ink below AA legibility; offer an underline-style highlight alternative for users who find fills hard to read (PRD-ED-066 A11y). Renders across all 17 looks + dark; HL colours are not dark-inverted (colour identity).

#### Test plan
`packages/sane_brushes/test/presets/hl_chisel_test.dart` (width/opacity/layer, multiply no-darken overlap, erasable/editable, width/colour tool-snap, azimuth fallback), goldens into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-003](brushes.md#sn-brs-003) (engine), SN-INK-005 (wet-layer renderer).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-018

<a id="sn-brs-018"></a>

**Implement straight-line and smart (PDF/text-snap) highlighter modes**

| Field | Value |
|---|---|
| GitHub | #153 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | brushes, pdf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-017](brushes.md#sn-brs-017) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
Two highlighter modes make marking feel effortless: a straight-line mode (draw-and-hold snaps to an axis-aware straight highlight) for underlining and margin bars, and a smart mode that snaps to PDF text or typed-text bounds so dragging across text produces a clean per-line highlight anchored to the text (pen-and-brush-spec §3; PRD-ED-067/068). Smart highlighting requires a text/OCR layer under the ink and does not apply to handwriting.

#### Scope
**In:** the straight-line toggle (dwell-to-straighten: draw over text, the line auto-straightens and snaps horizontal); the smart mode (long-press or drag over PDF text / typed text to snap-highlight to text baseline/x-height, anchored so it moves with reflow/export); the anchor model that ties a snapped highlight to the underlying text run; graceful no-op on handwriting (smart mode does nothing without a text layer).
**Out:** the base highlighter ([SN-BRS-017](brushes.md#sn-brs-017)), the PDF text layer (SN-PDF-002), the OCR/typed-text layer (SN-HWR / SN-TXT), the dwell-gesture trigger plumbing (SN-ED gestures).

#### Acceptance criteria
- [ ] Straight-line mode: drawing over text and holding snaps to a straight highlight; it snaps horizontal and is axis-aware (widget test + golden).
- [ ] Smart mode over PDF text produces a per-line highlight bounded to the text baseline/x-height rather than a freehand smear (golden against a fixture PDF page).
- [ ] A smart highlight anchors to its text run and moves with reflow/export; its accessible label carries the highlighted text (PRD-ED-067 A11y).
- [ ] Smart mode is a no-op over handwriting with no text/OCR layer (no false snap, no crash).
- [ ] Dwell time for straight-line is configurable (default ~0.5 s) and a keyboard alternative exists via the shape tool (PRD-ED-068 A11y).

#### Technical notes
Files: `packages/sane_brushes/lib/src/highlighter/straight_line.dart`, `smart_snap.dart`. Smart snap reads the on-device PDF text layer (SN-PDF-002; PDFKit/pdfium/pdf.js) or the typed-text/OCR layer — never a network fetch. Straight-line reuses the dwell recogniser shared with QuickLine (pen-and-brush-spec §7; SN-ED gestures). Implements PRD-ED-067/068.

#### Security & privacy
Snapping reads only the on-device text layer; nothing leaves the device (CLAUDE.md §7.1). The PDF text layer is untrusted parsed input handled by SN-PDF off the UI isolate; this feature consumes its output only. IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-1.

#### UX notes
Surface: highlighter secondary options in the palette dock (screens §7.3). Straight-line and smart are toggles on the highlighter, not separate tools. A11y: snapped highlights expose the highlighted text to the screen reader; dwell is configurable; a non-dwell alternative exists. Renders across all 17 looks + dark.

#### Test plan
`packages/sane_brushes/test/highlighter/straight_line_test.dart`, `smart_snap_test.dart` (PDF-text snap, anchor+reflow, handwriting no-op, dwell config), goldens into [SN-BRS-026](brushes.md#sn-brs-026).

#### Dependencies
[SN-BRS-017](brushes.md#sn-brs-017) (base highlighter). Consumes SN-PDF-002 (PDF text layer) and SN-HWR (typed-text/OCR) when present.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-019

<a id="sn-brs-019"></a>

**Implement eraser modes (stroke, precision-split, target filter, gestures)**

| Field | Value |
|---|---|
| GitHub | #154 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | brushes, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-003](brushes.md#sn-brs-003), [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Sane Notes ships three eraser modes: the forgiving stroke eraser (removes any whole stroke it touches, the default), the precision/area eraser (erases only ink within the circle, splitting a continuous stroke into individually-editable segments), and a highlighter-only toggle (pen-and-brush-spec §4; PRD-ED-071/072/074). Erasing is a CRDT tombstone, recoverable via Undo until convergence, so it never leaves residual plaintext (PRD-ED-016 Sec; CLAUDE.md §7). This feature implements the eraser as a brush `kind` with these modes plus the eraser rules (scribble-to-erase, zoom-scaled precision, auto-deselect).

#### Scope
**In:** `eraser.stroke` (hit-test whole strokes, radius proportional to width, undo snapshot on pointer-down, `cell` cursor); `eraser.precision` (erase strictly within the circle, split the stroke into segments that stay individually editable with independent width/colour, zoom-scaled effective size + explicit size); the `eraser.hl` highlighter-only toggle; the erase-target filter (This layer / Ink only / Highlights only / All; default current layer, spare highlights); scribble-to-erase gesture (configurable on/off) and auto-deselect (snap back to last tool). Eraser cannot erase image/PDF pixels (ink/highlight/shape strokes only).
**Out:** the low-level stroke hit-testing + geometry (SN-INK-004/SN-INK-025), the lasso/area-scoped erase UI (SN-ED-004), the non-destructive mask erase (SHOULD, later), the scribble gesture recogniser plumbing (SN-ED / SN-HWR).

#### Acceptance criteria
- [ ] `eraser.stroke` removes any whole stroke it touches, radius proportional to width, captures an undo snapshot on pointer-down, and announces 'erased N strokes' (PRD-ED-071).
- [ ] `eraser.precision` erases only ink inside the circle and splits a continuous stroke into segments that remain individually editable (independent width/colour) (unit + golden; PRD-ED-072).
- [ ] Precision effective size scales with canvas zoom (zoom in to erase finely) and an explicit size is still available (pen-and-brush-spec §4).
- [ ] The target filter defaults to current layer sparing highlights; 'Ink only' leaves highlights, 'Highlights only' leaves ink, 'All' clears both (PRD-ED-074).
- [ ] The eraser cannot erase image/PDF pixels; auto-deselect restores the last-used tool after lift per preference; scribble-to-erase is configurable and off does not fire during dense writing (PRD-ED-075/078).

#### Technical notes
Files: `packages/sane_brushes/lib/src/eraser/` (stroke_eraser.dart, precision_eraser.dart, erase_target.dart). Hit-testing + segment splitting use the SN-INK-004 geometry / SN-INK spatial index; precision erase is a per-stroke mask/split (non-destructive), not a raster wipe (PRD-ED-072). Erase is a CRDT tombstone via `sane_core` (remove-from-add-wins) — content purged only after retention + convergence (PRD-ED-016 Sec). Implements pen-and-brush-spec §4 and PRD-ED-071..078.

#### Security & privacy
Erased content becomes a tombstone recoverable via Undo until sync convergence, never leaving residual plaintext once purged (CLAUDE.md §7.1; PRD-ED-016). Erase actions are note content, never logged. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: the eraser tool in the palette dock (screens §7 tool table). Cursor is 'cell'; the erase-target filter is a labelled menu; destructive clears are confirm + Undo. A11y: eraser size selectable; scribble-to-erase is never the only erase path; state changes announced (PRD-ED-071/074/078 A11y). Renders across all 17 looks + dark.

#### Test plan
`packages/sane_brushes/test/eraser/stroke_eraser_test.dart` (whole-stroke hit, undo snapshot), `precision_eraser_test.dart` (segment split editable, zoom scaling), `erase_target_test.dart` (filter matrix, image/PDF immunity, auto-deselect).

#### Dependencies
[SN-BRS-003](brushes.md#sn-brs-003) (engine), SN-INK-004 (geometry/hit-testing). Coordinates with SN-CORE (tombstones) and SN-ED (lasso erase).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-020

<a id="sn-brs-020"></a>

**Implement quick colour palettes (INK/DARK_INK/HL) with tool-snap rules**

| Field | Value |
|---|---|
| GitHub | #155 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | brushes, design-system, theming |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-BRS-003](brushes.md#sn-brs-003) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The quick palette in the dock is the fewest controls to write: the active colour set (INK for pens, HL for the highlighter), the S/M/L widths, and page nav (pen-and-brush-spec §5.1; screens §7.3). Ink colours are shared drawing constants read by index, not themed — they flip to DARK_INK in dark mode so a note authored in light mode reads correctly in dark and vice-versa (pen-and-brush-spec §0.5, §10.1; PRD-ED-036/037/038). This feature implements the quick colour row, the dark-mode inversion mapping, and the exact tool-snap interaction rules from the mockup.

#### Scope
**In:** the 6-swatch INK row (#1f1f24, #2457c5, #d33b3b, #2e8b57, #7a3ec9, #e07b1c) with the double-ring selected state; the DARK_INK display mapping (#f2efe8, #6f9cff, #ff7b7b, #5fd18a, #b48cff, #ffa14d) by index in dark mode; the 4-swatch HL row (#ffe45c, #ff9ad5, #9be47a, #8fd3ff) shown when the highlighter is active (not dark-inverted); the tool-snap rules (picking an INK colour on eraser/lasso/image snaps back to pen; picking a width on the highlighter snaps back to pen); colour names on every swatch; the stored-semantic-colour model (store the INK index/base, resolve INK vs DARK_INK at render).
**Out:** the full custom colour picker ([SN-BRS-021](brushes.md#sn-brs-021)), per-notebook palettes / recents ([SN-BRS-022](brushes.md#sn-brs-022)), the palette-dock chrome/drag-dock itself (SN-ED-005), the width geometry (SN-INK).

#### Acceptance criteria
- [ ] The pen colour row shows the 6 INK swatches; the selected swatch has a double ring (not colour-only) and announces its colour name on change (PRD-ED-036; screens §7.3).
- [ ] In dark mode the 6 swatches map to DARK_INK by index; a stroke authored in light mode renders with the correct DARK_INK colour in dark mode and back (round-trip test; PRD-ED-037).
- [ ] When the highlighter is active the row switches to the 4 HL swatches (not dark-inverted); selecting a pen width or an INK colour switches the tool back to pen (screens §7.3; pen-and-brush-spec §5.3).
- [ ] Custom (non-palette) hex colours are shown as authored (no auto-inversion) with an optional 'adapt to dark' per-stroke flag (PRD-ED-037).
- [ ] The three width dots map to the active pen's S/M/L presets and are labelled Thin/Medium/Thick (not glyph-only) (PRD-ED-042 A11y).

#### Technical notes
Files: `packages/sane_brushes/lib/src/colour/quick_palette.dart` (model) with dock rendering in `sane_ui`/`app`. INK/DARK_INK/HL/WIDTHS come from docs/design/tokens.json via SN-DS-002 — never hard-code a colour (design-system §Implementation). Dark inversion is a display mapping keyed on `(look, mode)`; the stored stroke colour is the semantic INK index/base (design-system §Shared drawing constants; PRD-ED-037). Implements PRD-ED-036/037/038/042 and pen-and-brush-spec §5.1/§5.3/§10.1.

#### Security & privacy
None beyond baseline: colour selection is note content/UI state, on device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: the colours region of the palette dock (screens §7.3; design-system §5 tool palette: 6 colour dots at 22 px). Selected swatch = double ring. Must render across all 17 looks + dark (chrome follows the look; ink swatches show INK/DARK_INK regardless of look). A11y: swatch names (WCAG 1.4.1), 44 pt targets on the dots' tap region, keyboard-reachable on web.

#### Test plan
`packages/sane_brushes/test/colour/quick_palette_test.dart` (INK swatches, double-ring state, DARK_INK index mapping + round-trip, HL swatch swap, tool-snap rules, width labels), goldens across a light + dark look.

#### Dependencies
SN-DS-002 (tokens as ThemeExtension), [SN-BRS-003](brushes.md#sn-brs-003) (active tool/brush state).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-021

<a id="sn-brs-021"></a>

**Build the full colour picker (Disc, Value/HEX, Harmony, Eyedropper)**

| Field | Value |
|---|---|
| GitHub | #156 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | brushes, design-system |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-020](brushes.md#sn-brs-020) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Beyond the quick palette, a deeper picker lets users choose custom colours by disc, exact value, harmony, or eyedropper, in order of note-usefulness (pen-and-brush-spec §10.2; PRD-ED-039/040). This feature builds the multi-surface picker opened from a '+'/more affordance on the colour row.

#### Scope
**In:** the Disc surface (outer Hue ring + inner Saturation/Brightness disc; pinch to expand for precision; double-tap near an edge snaps to white/black/mid-grey); the Value surface (HSB sliders + numeric HEX entry for exact matching); the Harmony surface (complementary/analogous/triadic suggestions from the current colour); the Eyedropper (tap-and-hold on the canvas summons a loupe showing new-over-current, drag to sample any on-device pixel including ink/image/PDF, release to pick; bindable to Pencil double-tap/squeeze); sampled/entered colours join Recent.
**Out:** the per-notebook palettes, recents strip and tints/shades ([SN-BRS-022](brushes.md#sn-brs-022)), the colour-blind/name support ([SN-BRS-022](brushes.md#sn-brs-022)), the quick palette ([SN-BRS-020](brushes.md#sn-brs-020)), the Pencil double-tap/squeeze binding plumbing (SN-PHN stylus).

#### Acceptance criteria
- [ ] The Disc sets hue from the ring and saturation/brightness from the inner disc; pinch expands it; double-tap near an edge snaps to white/black/mid-grey (widget test; pen-and-brush-spec §10.2).
- [ ] The Value surface accepts a valid 6-digit HEX and reflects it in the sliders; an invalid HEX is rejected non-destructively with the previous colour retained (unit test).
- [ ] Harmony shows complementary/analogous/triadic suggestions derived from the current colour (unit test on known inputs).
- [ ] The Eyedropper loupe shows new-over-current and samples the correct on-device pixel from ink, an image, or a PDF; release picks it and adds it to Recent (widget test).
- [ ] Sliders are keyboard-adjustable with a value readout and HEX gives a non-visual exact entry (PRD-ED-039 A11y).

#### Technical notes
Files: `packages/sane_brushes/lib/src/colour/picker/` (disc.dart, value.dart, harmony.dart, eyedropper.dart). Eyedropper reads only on-device canvas pixels (screens; PRD-ED-040 Sec). HSB<->RGB conversions and HEX parse/format are pure Dart with unit tests. Modelled on Procreate's colour panel pared to note needs (pen-and-brush-spec §10). Implements PRD-ED-039/040.

#### Security & privacy
Eyedropper sampling reads only on-device canvas pixels; nothing leaves the device (PRD-ED-040 Sec; CLAUDE.md §7.1). Colour values are note content/UI state, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: the expanded colour picker overlay reached from the '+' on the colour row (pen-and-brush-spec §10.2). Focus-trapped modal, ESC/backdrop closes, controls labelled. Eyedropper announces the sampled colour name/hex and provides a menu alternative to the hold gesture (PRD-ED-040 A11y). Renders across all 17 looks + dark.

#### Test plan
`packages/sane_brushes/test/colour/picker/disc_test.dart`, `value_test.dart` (HEX parse/reject), `harmony_test.dart`, `eyedropper_test.dart` (loupe sample from ink/image/PDF), plus goldens of the picker across a light + dark look.

#### Dependencies
[SN-BRS-020](brushes.md#sn-brs-020) (quick palette + colour model it extends).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-022

<a id="sn-brs-022"></a>

**Add per-notebook palettes, recents, tints/shades and colour-blind support**

| Field | Value |
|---|---|
| GitHub | #157 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | brushes, a11y, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-020](brushes.md#sn-brs-020), [SN-BRS-021](brushes.md#sn-brs-021) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `CWE-20`, `CWE-502` |
| Extra labels | agent-ready, innovation |

#### Context
A personal colour system should emerge without a colour-theory UI: each notebook carries a small palette of named colour cards, a recent-colours strip, auto tints/shades on tap-and-hold, and importable/exportable palette files so a class shares one ink/highlight set (pen-and-brush-spec §10.2-10.3; PRD-ED-041/045). This feature also carries the colour-blind story: colour names on every swatch (WCAG 1.4.1), a colour-blind preview mode, and an optional Okabe-Ito palette the user can switch to — the recorded mitigation for keeping INK as the signature palette (pen-and-brush-spec §10.3 RISK; PRD-ED-045).

#### Scope
**In:** a per-notebook palette with named colour cards; a recent-colours strip (last 10); tap-and-hold on a colour to reveal auto tints/shades inline; import/export as a small `.sanepalette` file (pure data); named 'Color Cards' on every swatch; a colour-blind preview mode; an optional Okabe-Ito colour-blind-safe palette the user can switch to; the rule that meaning is never encoded in ink colour alone (pair colour with shape/label).
**Out:** the quick palette ([SN-BRS-020](brushes.md#sn-brs-020)) and full picker ([SN-BRS-021](brushes.md#sn-brs-021)), the INK/DARK_INK/HL constants themselves (tokens.json / SN-DS), the .sanepen brush bundle ([SN-BRS-025](brushes.md#sn-brs-025)).

#### Acceptance criteria
- [ ] A per-notebook palette stores named colour cards and persists per notebook; a recent-colours strip tracks the last 10 and de-dupes (unit test).
- [ ] Tap-and-hold on a custom colour reveals auto-generated tints/shades inline (widget test; pen-and-brush-spec §10.3).
- [ ] Import/export produces a `.sanepalette` that round-trips; an imported palette is validated as pure data (structure + size caps), rejects unknown fields, and executes nothing (unit test; PRD-ED-041 Sec).
- [ ] Every swatch exposes a colour name and the picker shows named Color Cards; a colour-blind preview mode and an optional Okabe-Ito palette are selectable (PRD-ED-045; WCAG 1.4.1).
- [ ] The app never requires colour discrimination to use a tool; a warning (non-blocking) fires when a chosen ink + tint fails AA contrast (PRD-ED-005 A11y).

#### Technical notes
Files: `packages/sane_brushes/lib/src/colour/palette/` (notebook_palette.dart, recents.dart, tints_shades.dart, sanepalette_io.dart, colour_names.dart, okabe_ito.dart). `.sanepalette` is a Procreate `.swatches` analogue — validate structure, cap size, no code (PRD-ED-041 Sec; ADR-0009 Security-impact). Colour names satisfy WCAG 1.4.1. Okabe-Ito is the recorded a11y option; INK stays the signature palette (pen-and-brush-spec §10.3 RISK; docs/design/accessibility.md). Persist via `sane_core` per-notebook.

#### Security & privacy
An imported `.sanepalette` is untrusted input: schema-validate, cap size, reject unknown fields, never execute embedded content (CLAUDE.md §7.8; PRD-ED-041 Sec). Palettes are note-adjacent content, encrypted at rest, never logged. IDs: MASVS-STORAGE-1, MASVS-CODE-4, CWE-20, CWE-502.

#### UX notes
Surface: the Palettes tab of the colour picker (pen-and-brush-spec §10.2). Named cards help VoiceOver and colour-blind users; the CB preview and Okabe-Ito option live in the picker and Settings. Renders across all 17 looks + dark. A11y: this IS a core a11y requirement (use of colour, WCAG 1.4.1); reorder offers a non-drag alternative.

#### Test plan
`packages/sane_brushes/test/colour/palette/notebook_palette_test.dart`, `recents_test.dart`, `tints_shades_test.dart`, `sanepalette_io_test.dart` (round-trip + hostile-file rejection), `colour_names_test.dart` (name coverage + Okabe-Ito switch).

#### Dependencies
[SN-BRS-020](brushes.md#sn-brs-020) (quick palette/colour model), [SN-BRS-021](brushes.md#sn-brs-021) (picker surfaces).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-023

<a id="sn-brs-023"></a>

**Build Brush Studio with the pressure/tilt curve editor**

| Field | Value |
|---|---|
| GitHub | #158 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, android-tablet, web |
| Areas | brushes, design-system |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-002](brushes.md#sn-brs-002), [SN-BRS-004](brushes.md#sn-brs-004), [SN-BRS-008](brushes.md#sn-brs-008) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
Brush Studio is the one-layer-down tuner for any pen/highlighter, modelled on Procreate's Brush Studio but pared to what a note app needs (pen-and-brush-spec §6; PRD-ED-062). It is where every visual property can be bound to an input source via an editable curve — the pressure and tilt graphs are the heart, and they are curves, not scalars. Studio is Pro-flavoured depth but not gated: a free user can tune a pen (pen-and-brush-spec §6.2). This feature builds the three-region shell plus the add-node input->output graph editor.

#### Scope
**In:** the three regions (Attributes list: Basics/Pressure/Tilt/Taper/Shape/Grain/Stroke-style/Dynamics/Colour-dynamics/Stabilisation/Clamps/About; Settings: sliders/toggles/editable graphs for the selected attribute; a live Drawing Pad that updates in real time); the pressure and tilt input->output graph editor (add up to 4 nodes, drag nodes, numeric-field alternative); the three named smoothing philosophies kept distinct (StreamLine / Stabilization / Motion Filtering); Min/Max clamps per brush; duplicate-on-edit (never mutate a stock brush) with Create Reset Point / Reset Brush.
**Out:** the underlying schema ([SN-BRS-002](brushes.md#sn-brs-002)) and curve evaluator ([SN-BRS-004](brushes.md#sn-brs-004)), the registry/sets that store the result ([SN-BRS-006](brushes.md#sn-brs-006)), the favourites bar ([SN-BRS-024](brushes.md#sn-brs-024)), sharing via `.sanepen` ([SN-BRS-025](brushes.md#sn-brs-025)).

#### Acceptance criteria
- [ ] The Drawing Pad updates live as any attribute changes (a pressure-curve edit visibly changes the test stroke within one frame) (widget test; pen-and-brush-spec §6.1).
- [ ] The pressure and tilt graphs support add/drag of up to 4 nodes and each node has a numeric field alternative (keyboard/screen-reader operable) (PRD-ED-062 A11y).
- [ ] The three smoothing engines are separate controls (StreamLine curve-fit, Stabilization moving-average, Motion Filtering tremor-removal) and are not conflated (pen-and-brush-spec §8).
- [ ] Editing any brush creates a duplicate; Reset Brush restores the immutable resetPoint exactly; a stock brush is never mutated in place (pen-and-brush-spec §6.2; ADR-0009 verify 5).
- [ ] Min/Max size and opacity clamps prevent the global size slider from pushing a brush to a useless extreme (PRD-ED-043).

#### Technical notes
Files: `packages/sane_brushes/lib/src/studio/` (studio_shell.dart, curve_editor.dart, drawing_pad.dart) with UI in `sane_ui`/`app`. Studio is SHOULD on iPad/ADt/Web, MAY on phones (PRD-ED-062) — hence the platform set here excludes phones. Graphs edit the `ResponseCurve` from [SN-BRS-004](brushes.md#sn-brs-004); the Drawing Pad renders via the engine [SN-BRS-003](brushes.md#sn-brs-003). Implements PRD-ED-062 and pen-and-brush-spec §6.

#### Security & privacy
None beyond baseline: a brush is data, never code; edits stay on device and are never logged (ADR-0009 Security-impact). ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Brush Studio overlay (pen-and-brush-spec §6.1; component names in docs/design/component-inventory.md). Every slider/graph node has a numeric field alternative; the Drawing Pad has a 'test stroke' button for users who cannot draw a gesture (PRD-ED-062 A11y). Focus-trapped modal; renders across all 17 looks + dark; 44 pt targets.

#### Test plan
`packages/sane_brushes/test/studio/curve_editor_test.dart` (add/drag/numeric nodes), `studio_shell_test.dart` (live pad update, duplicate-on-edit, reset, clamps), goldens of the studio across a light + dark look.

#### Dependencies
[SN-BRS-002](brushes.md#sn-brs-002) (schema), [SN-BRS-004](brushes.md#sn-brs-004) (curves), [SN-BRS-008](brushes.md#sn-brs-008) (a brush to tune).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-024

<a id="sn-brs-024"></a>

**Build the favourites bar (11 slots tablet / 6 phone) and quick-switch**

| Field | Value |
|---|---|
| GitHub | #159 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | brushes, editor, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008), [SN-BRS-020](brushes.md#sn-brs-020) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The favourites bar is the first thing power users reach for: pinned pen+colour+width combos as one-tap tiles, plus a Recent set and the pen picker reached by long-pressing the Pen tool (pen-and-brush-spec §5.2; PRD-ED-063). This feature builds the favourites bar with 11 slots on tablet and 6 on phone, per-profile persistence, recents auto-tracking, and the quick-switch gestures.

#### Scope
**In:** the favourites bar as an extension of the dock Tools region; pinning up to 11 favourite pen+colour+width combos on tablet and 6 on phone (e.g. 'Blue fineliner 1.2', 'Yellow highlighter'); long-press/right-click the Pen tool to open the pen picker (8 defaults + custom pens, each with icon/name/colour/width); a Recent set auto-tracking the last ~8 tools/colours; reorder with a non-drag alternative; per-profile persistence; double-tap-pencil / squeeze mappable to swap pen<->eraser or open a radial QuickMenu of the 6 most-used actions.
**Out:** the palette-dock container/drag-dock chrome (SN-ED-005), the brush registry/sets backend ([SN-BRS-006](brushes.md#sn-brs-006)), the stylus double-tap/squeeze capture (SN-PHN sane_stylus), the QuickMenu action set definition (SN-ED gestures).

#### Acceptance criteria
- [ ] Up to 11 favourite combos pin on tablet and up to 6 on phone; a favourite stores pen+colour+width and applies all three in one tap (unit + widget test).
- [ ] Long-pressing the Pen tool opens the pen picker showing the 8 defaults + custom pens with icon/name/current colour/width (widget test; pen-and-brush-spec §5.2).
- [ ] The Recent set auto-tracks the last ~8 and never duplicates; favourites and recents persist per profile and survive close/reopen.
- [ ] Reorder offers a non-drag alternative (move up/down) for switch/keyboard/screen-reader users (PRD-ED-063 A11y; WCAG 2.5.7).
- [ ] The bar adapts: 11 slots at tablet width, 6 at phone width, reflowing without state loss on a foldable window-class change.

#### Technical notes
Files: `packages/sane_brushes/lib/src/favourites/favourites_bar.dart` with dock integration in `sane_ui`/`app`. Slot counts (11 tablet / 6 phone) come from the design; the up-to-6 pin pattern and Recent set follow pen-and-brush-spec §5.2 / PRD-ED-063 adapted to the design's slot counts. Persist per profile via `sane_core` (PRD-PROF-004). The double-tap/squeeze mapping is wired in `app/` via Riverpod, consuming SN-PHN stylus events (no package-to-package import; CLAUDE.md §3).

#### Security & privacy
None beyond baseline: favourites/recents are UI state, on device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: the Tools region of the palette dock, extended (pen-and-brush-spec §5.2; design-system §5 tool palette, 44x44 tool buttons). Each favourite is a labelled tile (not colour-only); keyboard-navigable on web. Renders across all 17 looks + dark; the active tool tints `--ac`/`--aci`. A11y: bar is keyboard-navigable, entries labelled with the brush name.

#### Test plan
`packages/sane_brushes/test/favourites/favourites_bar_test.dart` (pin/apply combo, 11-vs-6 slot adaptation, recents de-dupe + persistence, non-drag reorder, pen-picker open), goldens across a light + dark look.

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (pens to favourite), [SN-BRS-020](brushes.md#sn-brs-020) (colour/width model). Coordinates with SN-ED-005 (dock) and SN-PHN (stylus gestures).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRS-025

<a id="sn-brs-025"></a>

**Implement .sanepen/.sanepenset import/export with a hardened reader**

| Field | Value |
|---|---|
| GitHub | #160 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | brushes, sharing-export, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-002](brushes.md#sn-brs-002), [SN-BRS-006](brushes.md#sn-brs-006) |
| Security controls | `MASVS-CODE-4`, `MASVS-PLATFORM-3`, `MASVS-STORAGE-1`, `OWASP-A08`, `OWASP-A03`, `CWE-502`, `CWE-434`, `CWE-400`, `CWE-829` |
| Extra labels | agent-ready, innovation |

#### Context
Pens are shareable, versioned documents — a `.sanepen` (single) / `.sanepenset` (set) with author metadata and a reset point — so a class or community can share a consistent pen kit and a user can always recover the stock pen (pen-and-brush-spec §6.3, §9; PRD-ED-065; ADR-0009 §7). The key security control that makes this safe is that a pen is strictly declarative data — never executable code — and imported files are untrusted third-party content (ADR-0009 Security-impact; PRD-ED-065 CRITICAL). This feature builds the bundle writer and the hardened reader.

#### Scope
**In:** the `.sanepen`/`.sanepenset` bundle format (a JSON manifest = the [SN-BRS-002](brushes.md#sn-brs-002) schema + referenced texture blobs, packaged as a bundle, with author metadata + immutable resetPoint); export by long-press-drag or multi-select; import via Files/share-sheet/drag into an 'Imported' set; the hardened reader (reject unknown schema majors, reject unknown fields, cap + sanitize + re-encode embedded Shape/Grain bitmaps to a safe format, never execute any embedded script, never follow any embedded URL, content-address by hash so an import cannot overwrite a built-in); a provenance panel showing author (unverified) before enabling.
**Out:** the preset schema ([SN-BRS-002](brushes.md#sn-brs-002)), the registry that receives imported pens ([SN-BRS-006](brushes.md#sn-brs-006)), the texture validation primitive ([SN-BRS-007](brushes.md#sn-brs-007)), share transport / links (SN-SHR/SN-COL), the marketplace economy (Backlog).

#### Acceptance criteria
- [ ] A `.sanepen` exports and re-imports to a byte-identical preset (round-trip golden; ADR-0009 verify 2); a `.sanepenset` round-trips all its pens.
- [ ] An unknown-schema-major pen is rejected safely to a typed error; unknown fields are rejected; nothing embedded is executed and no embedded URL is followed (abuse tests; PRD-ED-065 CRITICAL).
- [ ] Embedded Shape/Grain bitmaps are dimension- and byte-capped, re-encoded to a safe format, and validated as images before use; a decompression-bomb texture is capped before allocation (CWE-400; via [SN-BRS-007](brushes.md#sn-brs-007)).
- [ ] Content-addressing by hash means an imported pen/texture cannot overwrite a built-in (test importing a pen whose id collides with a stock id).
- [ ] The import flow shows provenance (author, marked unverified) before enabling the pen and announces success/failure with the brush name (PRD-ED-065 A11y).

#### Technical notes
Files: `packages/sane_brushes/lib/src/share/sanepen_io.dart`, `sanepen_reader.dart`. Parse off the UI isolate; treat like loading a foreign file (CLAUDE.md §7.8). Reuse the [SN-BRS-002](brushes.md#sn-brs-002) schema reader (unknown-major rejection) and the [SN-BRS-007](brushes.md#sn-brs-007) texture validator (dimension/byte caps + re-encode). Imported pens land in an 'Imported' set in [SN-BRS-006](brushes.md#sn-brs-006). Pen presets/textures sync E2E-encrypted, never logged (ADR-0009 Security-impact). Implements PRD-ED-065 and ADR-0009 §7.

#### Security & privacy
This is the supply-chain surface: `.sanepen` is strictly declarative data; the reader MUST reject unknown schema majors and MUST NOT execute anything; texture blobs are validated as images before use; content-address by hash so a malicious pen cannot overwrite a built-in (ADR-0009 Security-impact; PRD-ED-065 CRITICAL). IDs: MASVS-CODE-4, MASVS-PLATFORM-3, MASVS-STORAGE-1, OWASP-A08 (software & data integrity), OWASP-A03 (injection), CWE-502 (untrusted deserialisation), CWE-434 (dangerous file import), CWE-400 (resource caps), CWE-829 (untrusted inclusion).

#### UX notes
Surface: the pen library import/export flow (pen-and-brush-spec §6.3). Provenance (author, unverified) is shown before enabling; import announces success/failure and the brush name. Renders across all 17 looks + dark. A11y: the flow is keyboard/screen-reader operable; a hostile-file rejection surfaces a plain, non-technical error (toast, not red text).

#### Test plan
`packages/sane_brushes/test/share/sanepen_io_test.dart` (byte-identical round-trip, set round-trip), `sanepen_reader_test.dart` (unknown-major/unknown-field rejection, no-exec/no-URL abuse cases, id-collision cannot overwrite built-in, oversized/bomb texture rejection). CODEOWNERS review for this untrusted-input path.

#### Dependencies
[SN-BRS-002](brushes.md#sn-brs-002) (schema reader), [SN-BRS-006](brushes.md#sn-brs-006) (Imported set). Uses [SN-BRS-007](brushes.md#sn-brs-007) texture validation.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans; fuzz corpus for the reader)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md (CODEOWNERS review for the untrusted-input path)

---

### SN-BRS-026

<a id="sn-brs-026"></a>

**Add the cross-platform brush render-parity golden gate**

| Field | Value |
|---|---|
| GitHub | #161 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, android-tablet, web |
| Areas | brushes, qa, perf |
| Size | M |
| SDLC | verification |
| Parent | [SN-BRS-001](brushes.md#sn-brs-001) |
| Depends on | [SN-BRS-008](brushes.md#sn-brs-008), [SN-BRS-017](brushes.md#sn-brs-017), [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-354` |
| Extra labels | agent-ready, innovation |

#### Context
'Renders identically forever, everywhere' stops being a hope only when a CI gate enforces it (pen-and-brush-spec §9.2; ADR-0009 verify 3/6). This test issue builds the golden-image parity gate: a fixed corpus of strokes (all 8 core pens + highlighters, across pressure/tilt/velocity) is rendered on the Dart reference renderer (Tier B) and on each native path (Tier A) and on web, and the build fails if any output differs beyond a pixel tolerance. It also verifies the highlighter-behind-ink and no-per-stroke-shader-allocation guarantees.

#### Scope
**In:** the synthetic stroke corpus (all 8 core pens + the highlighter, sampled across pressure/tilt/velocity and the S/M/L widths); a golden renderer harness in `sane_brushes` that renders each stroke from its `ResolvedBrushParams` alone; the parity comparison (Tier B reference vs Tier A native vs web) with a documented pixel tolerance; the highlighter multiply-behind-ink golden; the perf assertion that no shader/texture is allocated per stroke; wiring the gate into CI so a regression does not merge.
**Out:** the render paths themselves (SN-INK-005/006/007/008, [SN-BRS-003](brushes.md#sn-brs-003), [SN-BRS-007](brushes.md#sn-brs-007)), the pen presets ([SN-BRS-008](brushes.md#sn-brs-008)..[SN-BRS-017](brushes.md#sn-brs-017)), the device-lab latency gate (SN-PERF area).

#### Acceptance criteria
- [ ] The corpus renders every core pen + highlighter from `ResolvedBrushParams` alone (no reference to running defaults) and produces stable goldens (ADR-0009 verify 1/6).
- [ ] Tier A (native), Tier B (Dart) and web outputs match within the documented pixel tolerance; a deliberate 1-node curve change to a preset makes the gate fail (self-test).
- [ ] A golden confirms the multiply highlighter never darkens overlapping ink and lives on the highlight layer (ADR-0009 verify 3).
- [ ] A perf assertion confirms no `FragmentShader`/`ImageShader`/`Image` is allocated per stroke; shaders are reused across frames (ADR-0009 verify 4).
- [ ] The gate runs in CI and blocks merge on any parity or highlighter regression (pen-and-brush-spec §9.2).

#### Technical notes
Files: `packages/sane_brushes/test/parity/brush_render_parity_test.dart`, `packages/sane_brushes/test/parity/corpus/` (fixture strokes), plus a golden set per platform path. Reference renderer is Tier B (Dart) per pen-and-brush-spec §9.3 (`ResolvedBrushParams` is authoritative; the native type is an optimisation). Runs under the standing golden-test CI stage (roadmap standing gates). Tolerance documented in the test header. Implements ADR-0009 How-to-verify 3/4/6.

#### Security & privacy
The corpus is synthetic (no real note content); nothing is logged. The gate also protects integrity: it is the check that a preset change cannot silently alter existing strokes (CWE-354 integrity, complementing [SN-BRS-005](brushes.md#sn-brs-005)). IDs: MASVS-PRIVACY-1, CWE-354.

#### UX notes
None beyond baseline: this is a CI/QA gate with no user chrome. It protects the user-visible guarantee that a shared or re-opened note looks identical on every device and in every look (the goldens cover a light + dark look per surface).

#### Test plan
The issue IS the test: `packages/sane_brushes/test/parity/brush_render_parity_test.dart` (corpus render, Tier A/B/web comparison, tolerance self-test, highlighter-behind-ink, no-per-stroke-shader-allocation). Golden files committed under the test's goldens directory; the gate is added to the CI golden stage.

#### Dependencies
[SN-BRS-008](brushes.md#sn-brs-008) (pens), [SN-BRS-017](brushes.md#sn-brs-017) (highlighter), SN-INK-005 (Tier B wet renderer). Consumes SN-INK-006/007/008 native/web paths and [SN-BRS-005](brushes.md#sn-brs-005) resolved params.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, golden, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

