# Sane Notes — Pen & Brush Specification

> The definitive ink toolset: every default pen/highlighter/eraser with full parameters, the brush
> engine model, the Brush Studio UI, the favourites bar, quick palette, colour picker, and the
> serialisation contract that makes a document **render identically across iPad, Android, Web, iPhone,
> and Android phone**. For the builder of `packages/sane_ink` (capture/smoothing/geometry) and
> `packages/sane_brushes` (brush engine + presets) and `packages/sane_render` (tessellation/painting).

Grounding: `research/procreate.md` (brush engine model, StreamLine, QuickShape, colour tools),
`research/concepts-linea-paper-fresco.md` (velocity/pressure pens, editable vector ink, ZipShape),
`research/goodnotes-userguide-inventory.md` (fountain/ball/brush pens, three eraser modes, tip
sharpness/flatness/stabilization, dashed/dotted strokes, colour slots), `research/notability.md`
(pencil tilt-shading, calligraphy nib angle, smart highlighter, partial eraser),
`research/accessibility-i18n-and-inclusive-design.md` (stroke stabilisation as a motor aid,
colour-blind-safe palettes). Constants (INK, DARK_INK, HL, WIDTHS, page units) come from
[`tokens.json`](./tokens.json) — they are **shared, look-independent drawing constants**.

---

## 0. Principles for the ink toolset

1. **A curated kit, not a 200-brush store.** Ship a small set of pens tuned to feel great with
   tilt+pressure (Linea/Paper philosophy), each buildable and tweakable in Brush Studio (Procreate
   philosophy). A student writes beautifully with the defaults and never opens the Studio; a power user
   can build and share pens.
2. **Every brush is one engine.** All pens, highlighters, and pattern pens are the *same* "stamp along a
   path" engine with different parameters (Procreate's core insight, `research/procreate.md §2`). This
   keeps the renderer small and guarantees a new pen renders identically everywhere.
3. **Three visible controls by default: Size, Opacity, Smoothing.** Everything else is one layer down
   (Concepts model). The three-width quick picker in the dock maps to Size presets.
4. **Documents must render identically across platforms.** A stroke stores its brush as `brushId@version`
   **plus the resolved parameter snapshot**, so the exact geometry/appearance is reproducible on any
   client and stable even if the app's default brushes change later (see §9).
5. **The ink layer reads shared constants, not the look.** Pen colours are `INK`/`DARK_INK` by index;
   highlighter colours are `HL`; the three quick widths are `WIDTHS`. The look (theme) never changes the
   canvas ink — only chrome. (See [`README.md` §2](./README.md).)

---

## 1. The stroke & brush model (`sane_ink` + `sane_brushes`)

### 1.1 What a stroke stores

The design mockup's stroke is `{ id, d(SVG path), color, w, op, kind, pts, bb, t }`
(`screens-and-flows.md §17`). The production model (LOCKED DECISION 4) is richer — each sampled point
carries `x, y, pressure, tilt, azimuth, timestamp`:

```
Stroke {
  id: ULID
  brush: BrushRef            // { id, version, paramsHash }  — see §9
  colorRole: int             // index into INK (0..5) OR a custom hex; role flips to DARK_INK by index
  colorHex: string?          // present only for custom (non-palette) colours
  baseSize: double           // px in page units (the quick-width or studio Size)
  opacity: double            // 0..1 (brush default; user-overridable)
  kind: enum { pen, highlighter, shape, erase, pattern }
  points: [InputPoint]       // x, y, pressure(0..1), tiltX/tiltY or altitude/azimuth, twist?, t(ms)
  renderPath: bytes          // tessellated outline (delta-compressed) — the render cache
  bbox: Rect
  audioT: int?               // audio timestamp (ms) if recorded live; null otherwise
  layer: enum { ink, highlight }   // highlights sort first (under ink)
}
```

- **Points are the source of truth; `renderPath` is a cache.** Store compressed deltas of the raw
  input points (position + pressure + tilt + azimuth + time). The tessellated outline can be regenerated
  on any platform from points + resolved brush params — this is what makes cross-platform identical
  rendering possible and keeps strokes **editable after the fact** (recolor, re-width, change pen type —
  the Concepts differentiator, `research/concepts-linea-paper-fresco.md`).
- **Highlighter strokes live on the `highlight` layer** and are always painted *under* ink (sorted
  first), so a highlight never covers handwriting (the Linea/Fresco "fill the layer beneath" trick).
- **`audioT`** links the stroke to a recording for tap-to-hear and ink replay (`screens-and-flows.md
  §7.6`).

### 1.2 The brush engine (stamp along a path)

A brush = a **Shape** (the stamp) carrying an internal **Grain** (texture), deposited repeatedly along
the **Path** of the user's stroke, with every visual property bindable to an input source (pressure,
tilt, velocity, barrel roll, or randomness) via a **curve**, not just a scalar
(`research/procreate.md §2`, "brush engine model"). The parameter groups the engine supports:

| Group | Parameters (subset used by Sane Notes defaults) |
|---|---|
| **Path placement** | Spacing (stamp density), Spacing/Lateral/Linear jitter, Fall-off (opacity decay over distance) |
| **Line conditioning** | Smoothing (StreamLine-style curve fit), Stabilization (moving-average wobble cancel), Motion Filtering (delete wobble extremities — tremor aid) |
| **Taper** | Start/end size ramp, opacity ramp, pressure-driven or fixed fallback, separate pencil vs finger curves, tip size |
| **Shape** | Source image, roundness graph + pressure/tilt squash, azimuth input (nib follows tilt), flip, edge filtering |
| **Grain** | Source texture, Moving vs Texturized, scale/rotation/depth, blend mode |
| **Rendering / blending** | Glaze→blend spectrum, Flow, blend mode (Normal / Multiply for highlighter), alpha threshold |
| **Colour dynamics** | Per-stamp / per-stroke jitter, pressure/tilt/roll→hue/sat/lightness (off by default for note pens) |
| **Dynamics** | Speed→size/opacity (velocity thinning), size/opacity jitter |
| **Input curves** | Editable pressure graph, tilt graph, barrel-roll graph, hover behaviour |
| **Clamps** | Min/max size, min/max opacity (so a brush can't be pushed to useless extremes) |

The Sane Notes default brushes below use a small, well-tuned subset. Advanced users edit any of these
in Brush Studio (§6). Platform note: on iOS a native `PKInkingTool.InkType` and on Android a native
`androidx.ink` `BrushFamily`/`StockBrushes` MAY back a default brush for latency, but the **serialised
brush params are the source of truth** and MUST reproduce the same geometry on the pure-Dart renderer
(`sane_render`) so web and any non-native path match. Do not let a platform's native brush silently
diverge from the spec — **verify** each mapped native brush against the reference render.

---

## 2. The default pen set

Eight core default pens plus highlighters and erasers — the MUST-ship kit specified here. The product
PRD ([`../product/prd-01-editor-ink-brushes.md`](../product/prd-01-editor-ink-brushes.md) PRD-ED-047)
extends this to a **≥12-brush catalogue** by adding SHOULD/MAY pens across later milestones (Gel, Soft
Pencil/Charcoal, Crayon); those are the same one engine (§1.2) with different parameters and are not
respecified here. Each core pen has: **name · icon idea · size range
(quick-width presets in bold) · pressure curve · tilt behaviour · velocity thinning · taper · texture ·
opacity · blend · stabilisation default**. Sizes are in **page units** (page is 800×1040; the mockup's
three widths `WIDTHS = [1.6, 2.6, 4.4]` render at ~5/9/13 px on screen).

The dock's three-width picker maps to each pen's **S / M / L** presets. `WIDTHS` are the Fountain Pen's
presets and the canonical quick widths; other pens define their own S/M/L that the same three-dot picker
selects.

### 2.1 Fountain Pen — the default (`pen.fountain`)

The everyday writing pen; what `tool: pen` selects in the mockup.

| Property | Value |
|---|---|
| Icon idea | A fountain-pen nib (angled, split tip) |
| Size range | 0.8 – 8.0; presets **S 1.6 · M 2.6 · L 4.4** (= `WIDTHS`) |
| Pressure curve | Gentle S-curve, 3-node editable; pressure → size (primary) + slight opacity. Firm nib. |
| Tilt behaviour | Minor width gain on tilt (edge of nib); no shading. |
| Velocity thinning | **Yes, moderate** — fast strokes thin, slow strokes swell (Speed→Size, the fountain-pen look that makes handwriting look alive even without pressure, `research/concepts-linea-paper-fresco.md`, `research/procreate.md`). Works on non-pressure styluses and finger. |
| Taper | Pressure-driven start/end taper with a fixed fallback (so finger/USB-C Pencil still taper). |
| Texture | None (clean vector). |
| Opacity | 1.0. |
| Blend | Normal, on `ink` layer. |
| Stabilisation default | Light (≈35% smoothing) — de-jitters handwriting without lag. |

### 2.2 Ballpoint (`pen.ball`)

Consistent everyday pen; **not** pressure-sensitive width (Goodnotes "Ball Pen").

| Property | Value |
|---|---|
| Icon idea | A ballpoint tip (round ball) |
| Size range | 0.8 – 6.0; presets **S 1.4 · M 2.2 · L 3.4** |
| Pressure curve | Flat (width constant); pressure → tiny opacity only. |
| Tilt behaviour | None. |
| Velocity thinning | None (constant weight — deliberate, for people who dislike variable width). |
| Taper | Subtle fixed taper at ends only. |
| Texture | Very faint grain (ink-on-paper micro-texture), optional. |
| Opacity | 1.0. |
| Blend | Normal, `ink`. |
| Stabilisation default | Light (≈40%). |

### 2.3 Fineliner / Technical pen (`pen.fineliner`)

The crisp pen for precise diagrams, tables, and small text.

| Property | Value |
|---|---|
| Icon idea | A thin technical pen (straight barrel, fine nib) |
| Size range | 0.4 – 3.0; presets **S 0.8 · M 1.2 · L 1.8** |
| Pressure curve | Flat; minimal dynamics. |
| Tilt behaviour | None. |
| Velocity thinning | None. |
| Taper | None (uniform, sharp ends). |
| Texture | None; **Improved edge filtering** (crisp anti-aliasing). |
| Opacity | 1.0. |
| Blend | Normal, `ink`. |
| Stabilisation default | **High (≈65%)** — the clean pen for straight, precise lines; pairs with dwell-to-perfect (§7). |

### 2.4 Pencil (`pen.pencil`)

Graphite feel with **tilt-shading** — the differentiator (Notability/Concepts/Fresco).

| Property | Value |
|---|---|
| Icon idea | A hexagonal wood pencil (sharpened tip) |
| Size range | 1.0 – 12.0; presets **S 2.0 · M 3.2 · L 5.0** |
| Pressure curve | Pressure → opacity (press harder = darker) **and** size, 4-node. |
| Tilt behaviour | **Tilt → broad soft shading** (Tilt→Size + Tilt→Opacity/Gradation). Tilting the pencil sideways produces wide graphite shading, exactly like a real pencil. Effect ramps in from ~30°–90° altitude. |
| Velocity thinning | Slight (Speed→Opacity). |
| Taper | Soft, pressure-driven. |
| Texture | **Paper-grain Grain in Texturized mode** (texture stays fixed to the page like graphite on tooth). This is what makes it read as pencil. |
| Opacity | 0.9 default (builds with overlap). |
| Blend | Normal (multiply-like darkening on overlap via grain depth), `ink`. |
| Stabilisation default | Light (≈30%). |

### 2.5 Brush Pen / Calligraphy (`pen.brush`)

Expressive, highly pressure-sensitive; for headings and hand-lettering (Goodnotes "Brush Pen",
Notability "Calligraphy Pen").

| Property | Value |
|---|---|
| Icon idea | A soft brush tip (tapered bristle) |
| Size range | 1.0 – 20.0; presets **S 3.0 · M 6.0 · L 10.0** |
| Pressure curve | Steep — big width range from light→heavy pressure. |
| Tilt behaviour | **Azimuth input:** the chisel/nib angle follows the pen's tilt direction (calligraphy). Optional **nib-angle slider** (0°/30°/45°, negative for left-handers) with a **"lock angle"** toggle that overrides barrel roll (Notability calligraphy model). With Apple Pencil Pro / S Pen, **barrel roll** rotates the nib live (§ [`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md)). |
| Velocity thinning | Optional (off by default; on gives brush-pen swell). |
| Taper | Strong pressure taper. |
| Texture | Light bristle grain, optional. |
| Opacity | 1.0. |
| Blend | Normal, `ink`. |
| Stabilisation default | Moderate (≈45%). |

### 2.6 Marker (`pen.marker`)

Opaque felt-tip for emphasis and bold annotation (distinct from the translucent highlighter).

| Property | Value |
|---|---|
| Icon idea | A chisel-tip marker |
| Size range | 3.0 – 24.0; presets **S 5.0 · M 8.0 · L 14.0** |
| Pressure curve | Mild pressure → opacity; width mostly constant (felt tip). |
| Tilt behaviour | Chisel **azimuth** — the flat tip follows tilt (broad/thin depending on angle). |
| Velocity thinning | None. |
| Taper | Slight fixed taper. |
| Texture | Felt grain, Moving mode (slightly streaky). |
| Opacity | 0.92 (near-opaque; overlaps darken slightly). |
| Blend | Normal, `ink`. |
| Stabilisation default | Moderate (≈45%). |

### 2.7 Monoline (`pen.monoline`)

Perfectly uniform line — the clean diagram/flowchart pen; the width never varies with anything.

| Property | Value |
|---|---|
| Icon idea | A single even stroke |
| Size range | 0.5 – 10.0; presets **S 1.2 · M 2.0 · L 3.2** |
| Pressure / tilt / velocity | All ignored — uniform width by design. |
| Taper | None. |
| Texture | None. |
| Opacity | 1.0. |
| Blend | Normal, `ink`. |
| Stabilisation default | High (≈60%) — pairs with QuickShape for boxes/tables. |

### 2.8 Dashed / Dotted pen (`pen.dashed`, `pen.dotted`)

A stroke style, not a separate engine: high **Spacing** so the stamp repeats with gaps
(`research/procreate.md §"Ideas"`). Offered as two presets and as a **stroke-style toggle** on any pen
(Solid / Dashed / Dotted — Goodnotes/Notability stroke styles).

| Property | Value |
|---|---|
| Icon idea | A dashed line / a dotted line |
| Size range | inherits the base pen's size |
| Path | Spacing high (dashed = elongated stamp + gaps; dotted = round stamp + wide gaps); gap and dash length adjustable. |
| Everything else | inherits the base pen. |
| Use | callouts, cut-lines, de-emphasised connectors, underlines. |

> **Stroke-style toggle:** every pen exposes **Solid / Dashed / Dotted** in its secondary options (this
> is why `pen.dashed`/`pen.dotted` are presets rather than fixed tools). Thickness slider and "restore
> stroke" accompany it.

### 2.9 Pattern pen (`pen.pattern`) — optional, Pro-flavoured delight

A stamp whose Shape is a motif (stars, arrows, hearts) placed at wide Spacing, with optional
scatter/count/colour jitter — decorative dividers and emphasis marks. Built from the same engine;
low priority; ships behind the "more pens" set, not in the default quick palette.

---

## 3. Highlighters

The default `tool: hl` is the **Highlighter**. Highlighters render at **~50% opacity, fixed width 22**
(mockup), on the `highlight` layer **under** ink, colour from `HL = [#ffe45c yellow, #ff9ad5 pink,
#9be47a green, #8fd3ff blue]`.

| Highlighter | id | Behaviour |
|---|---|---|
| **Highlighter (default)** | `hl.chisel` | Chisel tip, ~50% opacity, blend that lays behind ink and does **not** darken on overlap (Multiply-behind so passing over the same text twice doesn't turn it muddy — the Linea/Fresco trick). Width 22 default (adjustable in studio). Colour from `HL`. Chisel angle follows **azimuth** (real-highlighter feel). |
| **Straight-line highlighter** | `hl.straight` (mode) | A toggle ("Draw in Straight Line" / dwell-to-straighten): draw over text, the line auto-straightens (Goodnotes/Notability). Snaps horizontal. |
| **Smart highlighter (PDF/typed text)** | `hl.smart` (mode) | Long-press or drag over **PDF text or typed text** to snap-highlight to the text bounds (Notability Smart Highlighter, Goodnotes highlight-PDF-text). Does **not** apply to handwriting. Requires a text/OCR layer under the ink. |

**Rules:**

- Highlighter width uses its own fixed set (default 22; studio offers a range ~10–40). Selecting a
  *pen* width while the highlighter is active switches the tool back to pen (mockup behaviour — the
  highlighter has a "fixed" width in the quick picker).
- Highlighter is **erasable like ink** and selectable/recolourable after the fact (editable vector).
- Highlighter colours are the 4 `HL` values in the quick palette; the full colour picker is available in
  studio, but the quick palette shows only these 4 when the highlighter is active (mockup: selected
  swatch gets a double ring).
- A **watercolor-wash highlighter** (blooms softly, "Dry Layer" to lock) is an optional delight feature
  (Fresco live brushes) — not in the default kit; keep it as an addable brush, off the critical path.

---

## 4. Erasers

Three eraser modes (Goodnotes/Notability). The mockup's default `tool: eraser` is the **stroke
eraser**.

| Eraser | id | Behaviour |
|---|---|---|
| **Stroke eraser (default)** | `eraser.stroke` | Removes any **whole stroke** it touches (hit-test, radius ∝ width). Fast, forgiving; the default. Undo snapshot captured on pointer-down. Cursor = "cell". |
| **Precision / area eraser** | `eraser.precision` | Erases only the ink **strictly within the erasing circle**, splitting a continuous stroke into segments that **remain individually editable** (independent width/colour) — the Notability partial eraser / Concepts "slice". Size from a popover. |
| **Highlighter-only eraser** | `eraser.hl` (toggle) | "Erase highlighter only" — leaves ink untouched (Goodnotes/Notability). A toggle on the eraser, not a separate tool. |

**Eraser rules:**

- **Zoom-scaled precision.** The precision eraser's effective size follows canvas zoom (Linea) — zoom in
  to erase finely; no separate size fiddle needed. Provide an explicit size too.
- **Scribble-to-erase gesture** (Goodnotes): with a **pen** active, a tight back-and-forth zigzag over
  strokes erases them — no tool switch. Configurable on/off; see
  [`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md).
- **Eraser cannot erase images/PDF pixels** — only ink/highlight/shape strokes. To remove an image, use
  select → delete.
- **Auto-deselect** option: after lifting the stylus, snap back to the last-used tool (so a quick erase
  returns you to your pen).
- **Non-destructive mask erase (SHOULD, later):** offer a mask-based hide that keeps ink recoverable
  (Concepts Hard/Soft Mask) so an accidental scrub is undoable by editing the mask, not just by undo
  history. Behind a setting; not the default eraser.

---

## 5. The quick palette, favourites bar, and dock

The **palette dock (toolbar)** is the floating, draggable surface in the Editor (`screens-and-flows.md
§7.3`). Its order is **tools · colours · widths · page nav**. This is the *quick palette* — the fewest
controls to write.

### 5.1 Quick palette contents

| Region | Contents |
|---|---|
| **Tools** | 7 tools at 44×44: Pen, Highlighter, Eraser, Lasso, Shape, Text, Image. Active tool tinted `--ac`/`--aci`. |
| **Colours** | 6 dots at 22 px = the active palette (INK when a pen is active, HL when highlighter is active). Selected swatch gets a **double ring**. Picking an ink colour while on eraser/lasso/image **snaps the tool back to pen**. In dark mode the ink dots show `DARK_INK`. |
| **Widths** | 3 dots for the S/M/L presets of the active pen (rendered ~5/9/13 px). Selecting a width while on the highlighter switches back to pen. |
| **Page nav** | ‹ prev · "X / N" · next › (clamped). |

The dock is dragged by a **6-dot grip**; on release it docks to the nearest edge (bottom/top = row,
left/right = column), with edge drop-zones lighting up while dragging. Position is also settable in
Settings → Handwriting & stylus → "Toolbar position" (Bottom / Top / Left / Right).

### 5.2 Favourites bar (the pen kit)

The **favourites bar** is the user's chosen pens/highlighters — the first thing power users reach for
(Notability's up-to-8 fast tools, Goodnotes' color slots). It is the **Tools** region, extended:

- The dock shows the current tool; **long-press (or right-click) the Pen tool opens the pen picker** —
  the 8 default pens plus any custom pens, each showing its icon, name, and current colour/width.
- A user can **pin favourites**: up to 6 favourite pen+colour+width combos appear as one-tap tiles
  ("Blue fineliner 1.2", "Yellow highlighter") — Notability's fast-colour + Procreate's Pin-to-top
  pattern. Favourites persist per profile.
- **Recent tools/colours** auto-track the last used (a "Recent" set, Procreate pattern) so the last
  8 are always reachable.
- **Double-tap the pencil / squeeze** can be mapped to swap pen↔eraser or open a radial QuickMenu of the
  6 most-used actions (see gestures doc). The QuickMenu is customisable.

### 5.3 Width & colour interaction rules (from the mockup, preserve exactly)

- INK is 6 colours; HL is 4. The quick palette shows the set for the active tool.
- Choosing an ink colour on a non-pen tool → tool becomes Pen.
- Choosing a width on the highlighter → tool becomes Pen (highlighter width is fixed in the quick
  picker; change it in studio).
- Selected swatch/width shows a double ring / filled state.

---

## 6. Brush Studio (the deep tuner)

Brush Studio is the one-layer-down editor for any pen/highlighter. Modelled on Procreate's Brush Studio
(`research/procreate.md §2.2`) but pared to what a note app needs.

### 6.1 Layout

Three regions:

1. **Attributes list** (left) — the categories: **Basics** (Size, Opacity, Smoothing), **Pressure**,
   **Tilt**, **Taper**, **Shape**, **Grain/Texture**, **Stroke style** (Solid/Dashed/Dotted, spacing),
   **Dynamics** (velocity thinning, jitter), **Colour dynamics** (off by default), **Stabilisation**,
   **Clamps** (min/max size & opacity), **About** (name, author, version, reset).
2. **Settings** (centre) — sliders / toggles / **editable input→output graphs** (add up to 4 nodes) for
   the selected attribute. The pressure and tilt graphs are the heart — they are curves, not scalars.
3. **Drawing Pad** (right/bottom) — a live scratch area to test the brush in real time. MUST update
   live.

### 6.2 Studio rules

- **Every visual property can be bound to an input source** (pressure, tilt, velocity, barrel roll,
  randomness) via a curve. This is what makes a pencil feel like a pencil.
- **Three named smoothing philosophies** (keep them distinct — they solve different problems):
  **Smoothing/StreamLine** (aesthetic curve fit), **Stabilization** (moving-average wobble cancel),
  **Motion Filtering** (deletes wobble extremities — marketed as the **tremor / accessibility** aid).
  See §8.
- **Min/Max clamps per brush** so the global Size slider can't push a well-tuned pen to uselessness.
- **A brush created/edited in Studio is a duplicate** (never mutate a stock brush in place); the stock
  brush always has a **Reset** point.
- Studio is Pro-flavoured depth but **not gated** — a free user can tune a pen. What is gated (Pro) is
  handwriting→text and math solving, not ink feel.

### 6.3 Duplicating, organising, sharing pens

- Pens live in **sets** (folders): "Writing", "Highlighters", "Diagrams", "My pens" (Procreate/Goodnotes
  library model). Reorder by drag; swipe/long-press → Duplicate / Pin / Delete.
- **Search** the pen library; a **Recent** set auto-tracks; **Pin** keeps a favourite at top.
- **Pens are shareable, versioned documents** — a `.sanepen` (single) / `.sanepenset` (set), analogous
  to Procreate's `.brush`/`.brushset`, with author metadata and a reset point (§9). This lets a class or
  a community share a consistent pen/highlighter kit, and lets a user always recover the stock pen.

---

## 7. Line correction: dwell-to-perfect (QuickShape / QuickLine)

The single highest-leverage feature for notes (diagrams, boxes, tables, underlines):
**draw a rough line/box/arrow/circle and hold the pen down at the end** → it snaps to a clean shape
(Procreate QuickShape, Concepts "Draw & Hold", Linea ZipShape, Notability/Goodnotes Perfect Shapes).
One motor habit, many outcomes.

- **QuickLine:** draw a line, hold → perfect straight line (great for underlines/strikethroughs/table
  rules).
- **QuickShape:** draw a rough box/circle/arrow/triangle/polygon, hold → clean shape. A **second finger
  while holding** constrains to the "perfect" version (square, circle, equilateral) and gives 15°
  magnetic-rotate increments.
- **Recognised set (target):** line, arrow, rectangle, rounded rectangle, ellipse/circle, triangle,
  polygon, and 3-point curve. **Verify** the exact recogniser per platform (ML Kit shape recogniser
  gives RECTANGLE/TRIANGLE/ARROW/ELLIPSE; iOS/own recogniser may differ) — normalise the set across
  platforms.
- **Edit after snap:** an **Edit Shape** affordance exposes draggable nodes/vertices; stroke/fill colour;
  the shape stays scalable/rotatable.
- **Dwell time is configurable** (default ~0.5 s) in Settings → Handwriting & stylus.
- **Haptic on snap** (Apple Pencil Pro `pathCompleted`, `.sensoryFeedback(.pathComplete)`) confirms the
  snap without looking. **Snap-to-guide haptic** (`alignmentOccurred`) when a shape aligns to another.
- QuickShape/QuickLine is a *gesture* — see [`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md)
  for the dwell trigger and conflicts (it must not fire during normal writing).

The **Shape tool** (`tool: shape`) is the explicit, deliberate version (drag corner→corner for a
rectangle in the mockup); it expands to a shape library with smart connectors that stay attached to
shapes (Goodnotes) as a later addition. Dwell-to-perfect is the everyday path; the Shape tool is the
precise path.

---

## 8. Stabilisation & smoothing (defaults and the tremor aid)

Smoothing is a **first-class, visible dial** (Concepts), not a buried setting. The dock/quick palette
exposes **Smoothing** as one of the three default controls; Studio exposes all three engines.

| Engine | What it does | Default use |
|---|---|---|
| **Smoothing (StreamLine)** | Fits the drawn line to a clean, even curve. | Per-pen default (Fineliner/Monoline high; Fountain/Pencil light). Visible slider: 0% raw → ~40–60% de-jittered handwriting → 100% near-straight. |
| **Stabilization** | Moving average of recent input; the line "catches up" to a leading cursor, with a dead-zone radius for sharp corners (Krita model). | Optional, off by default; a "line steadiness" slider. |
| **Motion Filtering** | Deletes the extremities of wobble entirely — designed for **hand tremor**. | Off by default; marketed as an **accessibility / tremor aid** in pen settings, with a live preview (`research/accessibility-i18n-and-inclusive-design.md §8`). |

**Rules:**

- The global **"line steadiness / stabilisation" slider** is **off by default**, independent of pen vs
  finger, with a **live preview** (a11y requirement).
- Sample count SHOULD scale with speed (more smoothing when slow, less when fast) so smoothing never
  adds perceptible lag to fast handwriting — smoothing must **never** violate the latency budgets in
  [`ux-principles.md` §1](./ux-principles.md).
- Smoothing is applied to the *committed* path; the wet-ink preview may show lightly-smoothed points and
  reconcile on commit, but the reconciliation must be invisible.

---

## 9. Brush serialisation (identical rendering, forever)

**The requirement:** a `.sanenote` opened on any client, now or in three years, renders every stroke
identically. Brushes evolve; documents must not.

### 9.1 The `BrushRef` and resolved-params snapshot

Every stroke stores a `BrushRef`:

```
BrushRef {
  id: string          // stable brush id, e.g. "pen.fountain", "hl.chisel", or "custom:<ULID>"
  version: int        // bumped whenever the brush's default params change
  paramsHash: string  // hash (e.g. SHA-256, truncated) of the RESOLVED parameter set used to paint this stroke
}
```

And the document carries a **brush dictionary**: `paramsHash → ResolvedBrushParams` (the full,
platform-neutral parameter set — every value the engine needs, no `var(--…)`, no platform defaults).
This is the Procreate "a brush is a versioned document" insight applied to guarantee reproducibility.

**Why both id+version and a hash+snapshot:**

- `id@version` identifies *which* brush and lets the app offer "update stroke to the latest Fountain
  Pen" as an explicit, user-driven action.
- `paramsHash` + the embedded `ResolvedBrushParams` guarantee the stroke renders identically **even if
  the app's default `pen.fountain` changes** or the brush is missing on this client. The renderer never
  guesses defaults; it reads the snapshot.
- Content-addressing by hash **deduplicates**: a notebook using one blue fineliner throughout stores the
  params once and every stroke references the same hash.

### 9.2 Rules

- **A stroke MUST be renderable from `points` + its `ResolvedBrushParams` alone**, with zero reference
  to the running app's current brush defaults or the active look. (Ink colour is the one exception:
  `colorRole` indexes the shared `INK`/`DARK_INK` constant so it flips with mode; a custom colour is
  stored as `colorHex`.)
- **`ResolvedBrushParams` is platform-neutral.** No `var(--ink)`, no `PKInkingTool` handle, no
  `BrushFamily` object — just numbers, curve node lists, enum names, and (for textured brushes) a
  **content-addressed reference to the Shape/Grain image** (stored as an encrypted blob in the
  content-addressed store, LOCKED DECISION 3). The Grain/Shape images ship with the app for stock
  brushes and travel in the `.sanepen`/document for custom brushes.
- **Versioning:** bump `version` on any change to a default brush; never mutate the meaning of an
  existing `id@version`. Keep a compatibility table so an old `id@version` still maps to its params.
- **Cross-platform verification is a CI gate:** a golden-image test renders a fixed set of strokes (all
  8 pens + highlighters, across pressure/tilt/velocity) on the Dart reference renderer and on each
  native path, and fails if they differ beyond a pixel tolerance. This is how "renders identically"
  stops being a hope.
- **Exports** (PDF/PNG/SVG) flatten strokes using the same `ResolvedBrushParams`, so an exported page
  matches the on-screen page. `.sane`/`.sanenote` preserves the full editable stroke + brush model.

### 9.3 Interop with native ink types (verify)

Where a default brush is backed by a native type for latency (`PKInkingTool.InkType` on iOS,
`StockBrushes` on Android), the mapping table (`brushId → native type + tuning`) MUST be:

- **Documented and pinned** (an OS update changing a native brush's look would break identical
  rendering) — pin to a specific behaviour and **verify** on each OS version.
- **Backed by the Dart renderer as the reference.** If a native brush cannot match the reference, either
  tune it until it does or render that brush in Dart on that platform. The document's `ResolvedBrushParams`
  is authoritative; the native type is an optimisation.

---

## 10. Colour picker

The colour system: a fast quick palette (INK/HL in the dock) plus a deeper picker for custom colours,
per-notebook palettes, and eyedropper. Modelled on Procreate's colour panel (`research/procreate.md
§5`) pared to note needs.

### 10.1 Quick colours (in the dock)

- **INK** (6): near-black `#1f1f24`, blue `#2457c5`, red `#d33b3b`, green `#2e8b57`, purple `#7a3ec9`,
  orange `#e07b1c` (dark mode → `DARK_INK` by index). **HL** (4): yellow `#ffe45c`, pink `#ff9ad5`,
  green `#9be47a`, blue `#8fd3ff`.
- Selected swatch → double ring. These are the shared drawing constants; do not theme them.

### 10.2 Full colour picker (opened from a "+"/more on the colour row)

Five surfaces, in order of note-usefulness:

1. **Disc** — outer **Hue ring** + inner **Saturation/Brightness disc**. Pinch to expand for precision;
   double-tap near an edge snaps to a "perfect" value (white/black/mid-grey).
2. **Palettes** — swatch collections. A **per-notebook palette** with **named colour cards** (accessible
   — the name helps VoiceOver and colour-blind users, `research/accessibility-i18n-and-inclusive-design.md
   §7`) and a **recent-colours** strip (last 10). Import/export palettes as a small file (`.sanepalette`,
   Procreate `.swatches` analogue) so a class shares one ink/highlight set.
3. **Value** — precision sliders with **HEX** entry for exact matching (Notability/Goodnotes HEX field).
4. **Harmony** (optional, power users) — complementary/analogous/triadic suggestions from the current
   colour.
5. **Eyedropper** — tap-and-hold anywhere on the page to sample a colour (with a loupe: new colour on
   top, current below); also bindable to Apple Pencil double-tap / squeeze. Lives inside "Recent
   colours".

### 10.3 Colour rules & accessibility

- **Auto tints & shades:** tap-and-hold a custom colour to reveal its tints/shades inline (Linea) — a
  personal colour system emerges without a colour-theory UI.
- **Colour names in the picker (MUST):** every swatch exposes a name (satisfies WCAG 1.4.1 and helps
  screen readers). Provide a **colour-blind preview** mode.
- **RISK — the default INK palette is not colour-blind-optimised.** `INK`/`HL` are a fixed, shared
  drawing constant (LOCKED DECISION / `tokens.json`). Accessibility research recommends a
  Color-Universal-Design (Okabe–Ito) default (`research/accessibility-i18n-and-inclusive-design.md §7`).
  **Decision kept** (INK stays the product's signature palette), **risk recorded:** ship colour **names**
  on every INK/HL swatch, offer an **optional Okabe–Ito "colour-blind-safe" palette** the user can
  switch to, and never encode meaning in ink colour alone (pair colour with a shape/label — 1.4.1). See
  [`accessibility.md`](./accessibility.md).

---

## 11. Build checklist (per platform)

- [ ] Wet ink on a low-latency layer; commit on pen-lift; meets latency budgets (iPad ≤16 ms / Android
      ≤25 ms / web ≤30 ms). Uses coalesced + predicted samples.
- [ ] 8 default pens + dashed/dotted stroke styles + pattern pen, each matching the parameter tables in
      §2, backed by `ResolvedBrushParams`.
- [ ] Highlighter (chisel, ~50% opacity, width 22, `HL` colours, under-ink layer, no darkening overlap)
      + straight-line + smart (PDF/typed-text) modes.
- [ ] Three erasers (stroke / precision-splitting / highlighter-only), scribble-to-erase, zoom-scaled
      precision, auto-deselect.
- [ ] Quick palette (tools · INK/HL colours · S/M/L widths · page nav) with the exact tool-snap rules
      (§5.3); draggable dock; favourites/pins; recent.
- [ ] Brush Studio (Basics/Pressure/Tilt/Taper/Shape/Grain/Stroke/Dynamics/Colour-dynamics/
      Stabilisation/Clamps/About) with live drawing pad and editable pressure/tilt graphs.
- [ ] Dwell-to-perfect (QuickShape/QuickLine), Edit Shape nodes, configurable dwell, snap haptics.
- [ ] Three smoothing engines; global stabilisation slider off-by-default with live preview; Motion
      Filtering as the tremor aid.
- [ ] `BrushRef` (id@version + paramsHash) + document brush dictionary; golden-image cross-platform
      render test in CI.
- [ ] Colour picker (Disc/Palettes/Value/Harmony/Eyedropper), per-notebook named palettes, HEX,
      recent, auto tints/shades, colour names on every swatch, colour-blind preview, optional Okabe–Ito
      palette.

---

## Cross-references

- Input triggers for dwell/scribble/eyedropper/barrel-roll: [`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md)
- Latency budgets & motion rules: [`ux-principles.md`](./ux-principles.md)
- Colour/contrast/colour-blind requirements: [`accessibility.md`](./accessibility.md)
- Shared drawing constants (INK/DARK_INK/HL/WIDTHS/page): [`tokens.json`](./tokens.json), [`design-system.md`](./design-system.md)
- Tool/colour/width mockup behaviour: [`screens-and-flows.md` §7](./screens-and-flows.md)
- Component names for tools/pickers: [`component-inventory.md`](./component-inventory.md)
