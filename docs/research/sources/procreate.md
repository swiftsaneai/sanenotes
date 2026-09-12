# Procreate (iPad) — Deep Research for a Best-in-Class Note App

Research target: **Procreate for iPad** — a one-time-purchase drawing app widely regarded as the reference implementation of an Apple Pencil–native brush engine, gesture model, and colour system. This report captures, in depth, everything a note-taking app ("Sane Notes") could learn from it. All claims trace to the Procreate Handbook (`help.procreate.com`), the Procreate product site, or cited search snippets; anything not directly confirmed on a fetched page is marked `(unverified)`.

---

## 1. What Procreate is and why it matters to a note app

Procreate is a raster painting app built specifically for iPad + Apple Pencil. Its relevance to a note app is not that notes need "painting" — it is that Procreate has solved, at a very high polish level, the exact problems a great handwriting/ink note app must solve:

- Making a stylus stroke feel like a *physical* mark (pressure, tilt, taper, velocity, texture).
- Stabilising shaky human input into clean lines without feeling laggy.
- Turning rough gestures into perfect geometry (QuickShape) — critical for diagrams in notes.
- A gesture language that keeps the UI out of the way (two-finger undo, etc.).
- A colour/ink system that is fast to reach and pleasant to use.
- Running at 120fps so ink never lags behind the pen.

The app markets itself around brushes ("Over 300 handcrafted brushes"), the assistance tools ("Unlock artistic superpowers with QuickShape, StreamLine, Drawing Assist and simple gestures"), Apple Pencil intimacy, and — importantly for positioning — "No subscriptions. Exclusively from the App Store."

---

## 2. Brush engine — the core

### 2.1 The mental model: Shape + Grain dragged along a Path

Every Procreate brush is built from three primitives:

- **Shape** — the foundational form (the "stamp") that gets dragged across the canvas. It is an image (can be custom-imported).
- **Grain** — a texture that lives *inside* the shape, like the paper/pigment texture. Also an image.
- **Path** — the trajectory the shape+grain travel along when you make a stroke.

The handbook's own summary: a brush "contains a Grain (texture) inside of a Shape, and when you draw a stroke with that brush, you are dragging that shape and the texture within it along a path." Everything else — taper, dynamics, pressure response, wet mix — modulates *how that stamp is placed, sized, coloured, and blended* as it walks the path. This "stamp along a path" abstraction is the single most important idea for a note app's pen engine (see §11).

### 2.2 Brush Studio interface

Brush Studio has three regions:

1. **Attributes panel** (left sidebar) — the categories of settings ("the 14 attributes you can modify").
2. **Settings area** (centre) — sliders/toggles/graphs for the selected attribute.
3. **Drawing Pad** (right) — a live scratch area to test the brush in real time.

Brushes can be created from scratch or by duplicating and editing an existing one. Brush Studio is also where a brush's identity metadata and reset points live.

### 2.3 The full parameter set (Brush Studio Settings)

This is the heart of the research — how a brush is *parameterised*. Each category below is a tab; the named items are individual sliders/toggles/graphs.

**Stroke Path** — how the stamp walks the line.
- *Spacing* — how many times the shape stamps itself along the path. Low = fluid continuous stroke; high = visible individual stamps with gaps.
- *Spacing Jitter* — randomises the gap between stamps.
- *Jitter (Lateral)* — shifts stamps perpendicular to the stroke direction.
- *Jitter (Linear)* — shifts stamps along the stroke direction.
- *Fall Off* — starts the stroke at full opacity then fades it out over distance.

**Stabilization** — cleaning up human wobble (Procreate's headline "StreamLine" lives here).
- *StreamLine — Amount* — smooths and evens a line into elegant curves; turn up for a "smooth and even result." This is the flagship inking feature.
- *StreamLine — Pressure* — extends smoothed pressure along the streamlined line.
- *Stabilization — Amount* — takes a moving average of the stroke to cancel wobble (strength depends on drawing speed).
- *Motion Filtering — Amount* — instead of averaging, *deletes* the extremities of wobble entirely (designed for hand tremor).
- *Motion Filtering — Expression* — puts expressive variation back after Motion Filtering.

(Three distinct smoothing philosophies — averaging vs. streamlining vs. filtering — is a notable design point.)

**Taper** — thin→thick→thin along the stroke.
- Separate *Pressure taper* slider (Apple Pencil) and *Touch taper* slider (finger).
- *Size* — how severely the taper transitions thick↔thin.
- *Opacity* — transparency at the tapered ends.
- *Pressure* — use live Pencil pressure for natural taper.
- *Tip* — low = fine tip, high = chunky tip.
- *Link Tip Sizes* — mirror the start/end taper amounts.
- *Tip Animation* toggle; *Classic Taper* reverts to older render behaviour.

**Shape** — the stamp image and its orientation behaviour.
- *Shape Source* — import an image or pick a preset.
- *Scatter* — randomise rotation of each stamp (independent of stroke direction).
- *Count* — stamp the shape up to 16 times at each point.
- *Count Jitter* — vary the count randomly.
- *Randomized* — randomise starting rotation per stroke.
- *Flip X / Flip Y*.
- *Roundness graph* + *Pressure Roundness* + *Tilt Roundness* — squash/rotate the shape from a base graph, from pressure, or from tilt (this is what makes calligraphy nibs work).
- *Roundness Vertical/Horizontal Jitter*.
- *Input Style* — Touch only / Azimuth (tilt-direction rotates the nib, calligraphy-style) / Azimuth + barrel roll (Apple Pencil Pro rotation).
- *Shape Filtering* — No Filtering (jagged) / Classic / Improved (antialiasing).

**Grain** — the internal texture.
- *Grain Source* — import/pick a texture.
- *Behaviour* — Moving (texture drags with the stroke → streaky) vs. Texturized (texture stays fixed to canvas → stencil/paper look).
- *Movement, Scale, Zoom (Cropped vs Follow Size), Rotation.*
- *Depth* (texture strength over base colour), *Depth Minimum, Depth Jitter, Offset Jitter.*
- *Blend Mode, Brightness, Contrast.*
- *3D "Grain follows camera"* toggle (for 3D painting fabrics).
- *Grain Filtering* — No / Classic / Improved.

**Rendering** — how heavily paint sits and blends (light→heavy):
Light Glaze (standard/lightest) → Uniformed Glaze (Photoshop-like) → Intense Glaze → Heavy Glaze (keeps paint opacity) → Uniform Blending → Intense Blending (thick wet paint).

**Blending** — how the stroke interacts on the canvas.
- *Flow* — how much colour/texture flows onto the canvas.
- *Wet Edges* — soften/blur edges to mimic pigment bleed.
- *Burnt Edges* + *Burnt Edges Mode* — darkened color-burn where strokes overlap.
- *Blend Mode* (whole stroke), *Luminance Blending*, *Alpha Threshold*, *Classic Normal Combine mode*.

**Wet Mix** — simulate wet media by pushing pigment around.
- *Dilution* — how much water mixes with the paint (more = more transparent).
- *Charge* — how much paint is loaded at stroke start (depletes as you drag).
- *Attack* — how much paint sticks to canvas.
- *Pull* — how strongly the brush drags/mixes existing pigment.
- *Grade, Blur, Blur Jitter, Wetness Jitter.*

**Color Dynamics** — colour changes driven by randomness or Pencil input. Four groups, each with Hue / Saturation / Lightness / Darkness / Secondary Color knobs:
- *Stamp Color Jitter* (per stamp), *Stroke Color Jitter* (per whole stroke), *Color Pressure* (pressure drives colour), *Color Tilt* (tilt drives colour), *Color Barrel Roll* (Pencil Pro rotation drives colour).

**Dynamics** — speed- and randomness-based variation.
- *Speed → Size / Opacity / Spacing* (negatives make slow strokes thinner/fainter).
- *Jitter → Size / Opacity* (random per-stamp variation).

**Apple Pencil** — the input-response curves (the most note-relevant tab).
- *Pressure graph* — an editable curve (add up to 4 nodes) mapping input pressure → output. Plus *Pressure → Size / Opacity / Flow / Bleed*.
- *Tilt graph* — sets the tilt angle (0–90°) at which effects kick in (useful range ~30–90°). Plus *Tilt → Opacity / Gradation / Bleed / Size / Size Compression* — this is what powers *tilt shading* (shade with the side of the pencil like a real pencil).
- *Barrel Roll → Size / Opacity / Bleed* + *Relative to Stroke* toggle (Apple Pencil Pro).
- *Cursor Outline* (None / Contrast / Active color), *Hover Estimated Pressure*, *Hover Fill* (None / Shape / All).

**Properties** — housekeeping.
- *Use Stamp Preview, Orient to Screen, Preview Size, Smudge Pull*, and *Max/Min Size* + *Max/Min Opacity* (these clamp the sidebar sliders so a brush can't be pushed to useless extremes).

**Materials** — metallic/roughness maps for 3D painting (out of scope for notes but shows the parameter-map pattern: an imported grayscale map drives a property).

**About this Brush** — Author picture, "Made by" name, date created, hand-drawn *Signature*, *Create New Reset Point*, *Reset Brush*. This is the provenance/versioning layer that makes brushes shareable and resettable.

### 2.4 Dual Brush

Two single brushes in the *same set* can be combined into one **Dual Brush**: a **Primary** (bright blue) and **Secondary** (dark blue) brush blended via a **Combine Mode** (Normal + others, live-previewed). Each component is still individually editable in Brush Studio, and you can **Uncombine**. Constraint: only single brushes combine (not existing Dual Brushes), and both must live in the same set.

---

## 3. Brush library organisation & sharing

**Organisation.** The library is grouped into **brush sets** (themed folders) shown in a left panel. Procreate ships ~18 default handcrafted sets (Pencils, Pens, Inks, Markers, Oils, Watercolors, etc. — "Over 300" brushes total). You can create new sets/brushes, tap-hold to drag-reorder, and swipe-left → Duplicate.

**Find & favourite.** Swipe *down* from the top of the library to open **Brush Search** (results split into individual brushes / sets / other libraries). A **Recent** set auto-tracks up to eight brushes; swipe-left → **Pin** to keep a favourite at the top.

**Sharing / file formats.** Supported import types: **`.brush`** (single brush), **`.brushset`** (a set), **`.brushlibrary`** (a whole library), and **`.abr`** (Adobe Photoshop brushes). Import via the library menu → *Import from Files*, by tapping a brush file in Mail/Files (import prompt), or by drag-and-drop. Imported single brushes land in an auto-created **Imported** folder; sets go to the top of the library; libraries to the top of the overview. Export by press-holding a brush to "pick it up" and dragging into any compatible app; multi-select by tapping additional brushes with the free hand, then drag them all out at once. This drag-to-carry, tap-to-add multi-select is an elegant no-modal export UX.

---

## 4. StreamLine, stabilisation & QuickShape/QuickLine

**StreamLine** (in Brush Studio → Stabilization) is per-brush line smoothing: it reshapes a drawn line into a clean, even curve. There are three complementary smoothing engines: **StreamLine** (curve smoothing), **Stabilization** (moving-average wobble cancel), and **Motion Filtering** (deletes wobble extremities — tremor-friendly). A global stabilisation control also exists in *Actions → Prefs → Pressure & Smoothing* / accessibility.

**QuickShape.** Draw a shape and *keep the pencil/finger held* at the end — the stroke snaps to a perfect line, arc, polyline, ellipse, triangle, or quadrilateral. Add a **second finger while holding** to constrain to the "perfect" version (square, circle, equilateral triangle). While still holding you can drag to scale/rotate; a second finger gives 15° **Magnetic Rotate** increments. After release, an **Edit Shape** button appears in the notification bar, exposing draggable **nodes** to fine-tune the geometry. **QuickLine** is the straight-line case (draw a line, hold → perfect straight line). Configurable in *Actions → Prefs → Gesture Controls → QuickShape*. For a note app this is the single highest-leverage feature for hand-drawn diagrams, tables, and underlines.

---

## 5. Colour tools

The Color panel has five tabs plus a **History** strip of the last 10 used colours.

- **Disc** — outer **Hue ring** + inner zoomable **Saturation disc** (left→right = saturation, down→up = brightness). Pinch to expand the disc for precision; double-tap near the edge to snap to the nearest "perfect" value (pure white/black/mid-grey).
- **Classic** — traditional Hue/Saturation/Brightness sliders + a square picker.
- **Harmony** — colour-theory suggestions from your current colour: **Complementary** (2 reticles opposite), **Split Complementary** (3, sharp triangle), **Analogous** (3 neighbours), **Triadic** (3, equilateral), **Tetradic** (4, square). Tap a reticle to paint with it or drag it into a palette.
- **Value** — precision sliders with numeric **and hexadecimal** entry for exact matching.
- **Palettes** — swatch collections (below).

**Eyedropper** — tap-and-hold anywhere on canvas to summon a loupe (new colour on top, current on bottom); drag to sample, release to pick. Also bindable to Apple Pencil double-tap / squeeze.

**ColorDrop** — drag the active colour swatch onto the canvas and release to **flood-fill** the enclosed area; the fill spreads until it hits a boundary. A **ColorDrop Threshold** (adjust by keeping finger down and sliding after the drop) controls how aggressively colour bleeds past soft edges. Combined with a **Reference layer**, you can flood-fill on a *separate* layer while reading the line art on the reference layer — keeping inks and fills separate.

**Palettes.** A palette is a set of swatches. Views: **Compact** (10/row) and **Cards** (3/row, with colour *names* like "Blue Green"). Create manually, or **New from Camera** (Visual vs Indexed modes — live capture), **New from File**, or **New from Photos** (auto-extract). Import/export as **`.swatches`**; also imports Adobe **`.ASE`** and **`.ACO`**. Reorder/duplicate/delete/set-active via the three-dot menu.

---

## 6. Layers & blend modes (brief)

Full non-destructive layers with per-layer opacity (two-finger tap a layer → slide to set opacity). Blend modes are grouped: **Normal**; **Darken** (Darken, Multiply, Color Burn, Linear Burn, Darker Color, Shade); **Lighten** (Lighten, Screen, Color Dodge, Add, Lighter Color); **Contrast** (Overlay, Soft Light, Hard Light, Vivid Light, Linear Light, Pin Light, Hard Mix); **Difference** (Difference, Exclusion, Subtract, Divide); **Color** (Hue, Saturation, Color, Luminosity). Layer extras include masks, clipping, and a **Reference layer** (drives ColorDrop/fills). For a note app, the takeaway is lightweight: an ink layer vs. a highlight layer with Multiply so highlighter never covers text.

---

## 7. Gestures

Procreate's gesture grammar is famously terse and is the model to copy for a stylus-first note app:

- **Two-finger tap** → Undo (tap-and-hold two fingers = rapid repeated undo).
- **Three-finger tap** → Redo.
- **Three-finger swipe down** → Copy/Paste menu.
- **Three-finger scrub side-to-side** → Clear the active layer.
- **Four-finger tap** → toggle full-screen / hide UI.
- **Pinch** → zoom; **pinch + twist** → rotate canvas; **quick pinch** → fit to screen.
- **Draw + hold** → QuickShape.
- **Tap-and-hold** → Eyedropper.
- Layers: **pinch two layers together** → merge; **swipe right** → multi-select; **two-finger tap** → opacity.
- **Apple Pencil hover** (iPadOS 16.1+ / supported iPads): pinch alters brush size, slide controls opacity, and the cursor previews the brush.
- All of this is remappable via **Gesture Controls** (Actions → Prefs → Gesture Controls), so power users assign QuickMenu, QuickShape, Eyedropper, etc. to whatever trigger they like.

---

## 8. Apple Pencil behaviours

- **Pressure & tilt** are first-class inputs that any brush parameter can bind to (size, opacity, flow, bleed, colour, roundness). A global, adjustable **App Pressure Sensitivity curve** tunes the overall feel.
- **Double-tap** (Apple Pencil 2): default "switch between current tool and eraser"; can be set to Eyedropper, QuickMenu, previous tool, etc.
- **Squeeze** (Apple Pencil Pro): switch tools, invoke Eyedropper / Layer select / menus / QuickMenu / control QuickShape.
- **Barrel roll** (Apple Pencil Pro): rotating the pencil controls shape orientation, colour, and size in Brush Studio; also drives Liquify twirl.
- **Hover** (iPad Pro M-class + Pencil 2/Pro): shows the brush cursor before touching, previewing size/shape/texture/tilt; hover pinch/slide adjust size/opacity.

---

## 9. Actions menu, canvas & performance

**Actions menu** (wrench icon) tabs:
- **Add** — insert file/photo/text; cut/copy/paste.
- **Canvas** — Crop & Resize, Flip, canvas info, Drawing Guide, **Animation Assist** toggle, Reference.
- **Share** — export **JPEG, TIFF, layered PSD, PDF, PNG** (with transparency), plus animated exports (GIF/MP4/etc.).
- **Video** — Time-lapse recording toggle; export full or 30-second time-lapse.
- **Prefs** — Light/Dark interface, **left/right-hand** controls, brush cursor, connect 3rd-party stylus, **Pressure Curve**, **Gesture Controls**.
- **Help** — support, Portfolio, Learn to Procreate, restore purchases.

**Canvas & performance.**
- Custom canvases set width/height/DPI in mm/cm/inches/pixels; from **1×1 px** up to **16K** in a dimension on capable iPads (cited limits: up to ~16k×8k on high-end iPad Pro; capped around 16,000×4,000 or 64 megapixels on others `(unverified — from secondary sources)`).
- **Maximum Layers is inversely tied to canvas size and device**: bigger canvas = fewer layers. This is a real hardware-honest constraint model.
- Colour management: RGB (screen; default Display P3) and CMYK (print; Generic CMYK default), ~17 preloaded ICC profiles; custom profiles importable.
- Rendering engine: **Valkyrie**, built on Apple **Metal**, painting at up to **120fps** on **ProMotion** iPads. This is why ink feels attached to the pen tip — the key perceptual bar a note app must clear.
- Time-lapse can record the whole session (1080p–4K) — a "replay of my page" that note apps rarely offer but could.

---

## 10. Animation Assist (brief) & accessibility

**Animation Assist** turns layers/groups into a **Timeline** of frames (left→right = layer order bottom→top). Add Frame, live Play/Pause, per-frame options (Duplicate, Delete, **Hold Duration**), foreground/background frame layers, and **onion skinning** (semi-transparent neighbouring frames, count set by an *Onion skin frames* slider; nearer frames more solid). FPS typically 12 (up to ~24 for cinema).

**Accessibility** (directly relevant to notes):
- **VoiceOver** support; **Dynamic Type** (larger text via iPadOS).
- **Color Cards** (larger named swatches) + **Color Description Notifications** (announce active colour name) for colour-blind users.
- **Single Touch Gestures Companion** — do undo/redo/zoom/pan with one finger (motor accessibility).
- **Stroke Stabilization**, **Motion Filtering** (tremor), **Tip Attachment**, and **Initial Touch Location Support** (your first touch is the one iPad honours — tremor/palm handling).
- Feedback sounds toggle.

---

## 11. Pricing & distribution

- **One-time purchase, no subscription**: currently **$12.99** on the App Store (was $9.99 at launch in 2011; raised to $12.99). All updates free to existing owners. (Procreate Pocket for iPhone is a separate, cheaper purchase; Procreate Dreams is a separate animation app.) Sources: comparedge / saaspricepulse snippets + product-site "No subscriptions."
- Positioning lesson: the buy-once model is itself a marketed feature ("No subscriptions. Exclusively from the App Store"), a deliberate contrast to Adobe. A note app can win trust the same way.

---

## Brush engine model

This section restates, compactly, *how a Procreate brush is parameterised* — the model Sane Notes should adapt for its pens.

**Primitive:** a brush is a **stamp (Shape image)** carrying an **internal texture (Grain image)**, deposited repeatedly along the **Path** of the user's stroke. Rendering a stroke = "walk the path, place stamps."

**The parameters are organised as modulators over that stamping process:**

1. **Placement along the path** — *Spacing* (stamp density), *Spacing/Lateral/Linear Jitter* (randomised placement), *Fall Off* (opacity decay over distance).
2. **Line conditioning before stamping** — *StreamLine*, *Stabilization*, *Motion Filtering* (three smoothing philosophies: curve-fit, moving-average, extremity-delete).
3. **Ends of the stroke** — *Taper* (size + opacity ramp at start/end, driven by pressure or a fixed artificial amount, separate curves for pencil vs finger).
4. **Per-stamp shape** — image source, *Scatter/Randomized* rotation, *Count* (1–16 overlaps), *Roundness* (base graph + pressure + tilt squash), *Flip*, *Input Style* (touch / azimuth / azimuth+roll), edge *Filtering*.
5. **Per-stamp texture** — grain image, *Moving vs Texturized*, *Scale/Zoom/Rotation/Depth*, jitters, blend mode, brightness/contrast.
6. **How paint lands** — *Rendering* mode (glaze→blend spectrum), *Flow*, *Wet Edges*, *Burnt Edges*, *Blend Mode*, *Alpha Threshold*.
7. **Wet media simulation** — *Dilution, Charge, Attack, Pull, Grade, Blur* (paint load that depletes and mixes with what's on canvas).
8. **Colour variation** — Color Dynamics: per-stamp jitter, per-stroke jitter, and pressure/tilt/barrel-roll-driven hue/sat/lightness/secondary-colour shifts.
9. **Motion dynamics** — speed→size/opacity/spacing, random size/opacity jitter.
10. **Input→output curves** — editable **Pressure graph** and **Tilt graph** (each with add-a-node curve editing), mapping raw Pencil input to size/opacity/flow/bleed; plus hover cursor behaviour.
11. **Clamps & metadata** — Min/Max size & opacity (so the brush stays usable), and About-this-Brush provenance + reset points.

**Key architectural insights worth stealing:**
- **Every visual property can be bound to an input source** (pressure, tilt, velocity, barrel roll, or randomness) via a *curve*, not just a scalar. The editable input→output **graph** is what makes a pencil feel like a pencil.
- **Separate the input-conditioning (smoothing) stage from the rendering stage.** Three named smoothing modes address three real problems (aesthetic curve smoothing, jitter, medical tremor).
- **Min/Max clamps per brush** prevent users from destroying a well-tuned tool with the global size slider.
- **A brush is a shareable, versioned document** (`.brush`) with author metadata and reset points — brushes are content, not just settings.

---

## Ideas for Sane Notes

Concrete features to adopt, mapped to the mechanisms above. Priority ordering is rough (highest first).

### Pen/ink feel (the table stakes)
- **Velocity-based thickness "fountain pen."** Bind stroke thickness to *velocity* (Procreate's Speed→Size dynamic): fast strokes thin, slow strokes swell — the classic fountain-pen/brush-pen look that makes handwriting look alive even on iPads with no pressure. Ship a **fountain pen** default pen that uses velocity + light pressure.
- **Pressure→size/opacity curves, editable.** Give each pen an editable pressure response curve (even a simple 3-node curve). A "soft" vs "firm" nib is just a different curve. Expose an app-wide **pressure sensitivity** setting like Procreate's global curve.
- **Pencil texture with tilt shading.** A **pencil** tool that (a) carries a paper-grain *Grain* texture (Texturized mode so it stays fixed to the page like graphite on tooth) and (b) uses *Tilt→Size/Opacity/Gradation* so tilting the Apple Pencil produces broad, soft shading — exactly how people shade real notes/diagrams. This alone differentiates a note app.
- **Taper on start/end** for every pen, pressure-driven, with a fixed fallback so finger and non-pressure styluses still taper. Makes checkmarks, ticks, and handwriting feel intentional.

### Line quality & correction (the productivity multiplier)
- **StreamLine-style smoothing slider per pen**, plus a **Motion Filtering** mode marketed as a *tremor/accessibility* aid — a genuinely differentiating, inclusive feature for note-takers with shaky hands.
- **QuickShape / QuickLine: "draw and hold to snap."** The biggest win for notes. Snap to perfect lines, arrows, rectangles, circles, and polylines for diagrams, boxes around text, tables, underlines, and flowcharts. Include **Edit Shape** nodes and **15° magnetic rotate**. Perfect straight **underlines/strikethroughs** by drawing-and-holding is a killer micro-feature.
- **Ruler/QuickLine for tables**: draw-hold horizontal/vertical lines that snap to axis — instant hand-drawn tables and grids.

### Specialised note pens (built from the same stamp-along-path engine)
- **Marker/highlighter.** A *Uniform/Heavy Glaze* rendering with a **Multiply blend mode** so highlight goes *behind* ink and never darkens on overlap; broad chisel **Shape** with *Azimuth* input so the chisel angle follows pencil tilt (real-highlighter feel). Highlighters live on a separate highlight layer.
- **Dashed pen / dotted pen.** Pure *Spacing* + stamp shape: set spacing high so the stamp repeats with gaps → dashed and dotted lines for callouts, cut-lines, and de-emphasised connectors. Trivial to build once you have "stamp along path."
- **Pattern pen.** A stamp whose *Shape* is an icon/motif (stars, arrows, hearts, footprints) placed at wide spacing — decorative dividers, borders, and emphasis marks. This is just Spacing + custom Shape + optional *Scatter/Count/Color Jitter*.
- **Brush pen / calligraphy nib.** *Roundness* squash + *Azimuth* input so the nib angle follows tilt direction — expressive headings and hand-lettering in notes.
- **Fine-liner / technical pen.** Minimal dynamics, high stabilisation, crisp *Improved* edge filtering — the clean pen for precise diagrams.

### Colour & ink management
- **Eyedropper by tap-and-hold** anywhere on the page (with loupe) — reuse a colour from an imported image/screenshot pasted into notes.
- **Harmony/Value pickers** are overkill for notes, but a small **swatch palette per notebook** with named **Color Cards** (accessible, colour-blind-friendly) and a **recent-colours history** strip is worth copying.
- **ColorDrop-style flood fill with threshold** for shading regions of a hand-drawn diagram, with a **Reference layer** so fills sit under the ink.
- **Import/share palettes** as a small file (Procreate's `.swatches`) so teams share a consistent highlight/ink palette.

### Gestures & ergonomics
- **Two-finger undo / three-finger redo / three-finger swipe for copy-paste / four-finger hide-UI / pinch-zoom+rotate** — adopt the whole grammar; it's already muscle-memory for millions of iPad users.
- **Apple Pencil double-tap / squeeze** to swap pen↔eraser and to summon an eyedropper or a **radial QuickMenu** of the six most-used note actions (new page, highlighter, eraser, lasso, undo, insert). Make the QuickMenu **customisable** with multiple profiles.
- **Hover preview** of the pen cursor (size/colour) on supported iPads — reduces "where will my mark land" uncertainty when annotating dense text.
- **Left/right-hand interface** toggle so palm rest and toolbars don't fight the writing hand.

### Sharing, provenance & trust
- **Pens as shareable, versioned documents** (a `.sanepen` analogous to `.brush`) with author metadata and a **reset-to-default** point — let the community make and trade pens/highlighter styles, and let users always recover the stock pen.
- **Organise pens into sets** with search, **Recent**, and **Pin** — the same library UX.
- **Buy-once / no-subscription positioning** as a marketed trust feature, if the business model allows.
- **Session time-lapse replay** of a page (Procreate's Video tab) — a delightful, low-cost "watch how this note was built" feature for study notes and teaching.

### Performance (non-negotiable)
- Target **120fps on ProMotion** with a Metal-based renderer so ink never lags the pen. Procreate's whole reputation rests on this; a note app that lags on handwriting loses instantly. Honour a **layer/complexity budget tied to page size and device** rather than pretending it's unlimited.

### Accessibility (adopt wholesale)
- VoiceOver + Dynamic Type, **Color Cards** with names + **colour-name announcements**, **single-touch gesture companion**, **stroke stabilisation / motion filtering for tremor**, and **initial-touch-location / palm handling**. These make a note app usable by far more people and are cheap relative to their impact.

---

## Sources

Pages fetched directly (Procreate Handbook & product site):
- https://help.procreate.com/procreate/handbook (Table of Contents; via redirect from procreate.com/handbook)
- https://help.procreate.com/procreate/handbook/brushes/brush-studio
- https://help.procreate.com/procreate/handbook/brushes/brush-studio-settings
- https://help.procreate.com/procreate/handbook/brushes/brush-library
- https://help.procreate.com/procreate/handbook/brushes/brushes-share
- https://help.procreate.com/procreate/handbook/brushes/dual-brush
- https://help.procreate.com/procreate/handbook/interface-gestures/gestures
- https://help.procreate.com/procreate/handbook/interface-gestures/pencil
- https://help.procreate.com/procreate/handbook/interface-gestures/quickmenu
- https://help.procreate.com/procreate/handbook/interface-gestures/accessibility
- https://help.procreate.com/procreate/handbook/guides/quickshape
- https://help.procreate.com/procreate/handbook/colors/colors-disc
- https://help.procreate.com/procreate/handbook/colors/colors-interface
- https://help.procreate.com/procreate/handbook/colors/colors-harmony
- https://help.procreate.com/procreate/handbook/colors/colors-palettes
- https://help.procreate.com/procreate/handbook/layers/layers-blend
- https://help.procreate.com/procreate/handbook/gallery/gallery-create
- https://help.procreate.com/procreate/handbook/actions/actions-interface
- https://help.procreate.com/procreate/handbook/animation/animation-interface
- https://procreate.com/ipad

Search-snippet sources (used to confirm pricing, engine, and cross-check facts):
- https://www.saaspricepulse.com/tools/procreate (pricing: $12.99 one-time)
- https://comparedge.com/tools/procreate/pricing (pricing history, free updates)
- https://www.macstories.net/reviews/procreate-5-review-a-rebuilt-graphics-engine-drives-fantastic-animation-color-and-brush-tools-in-an-art-app-perfectly-tailored-to-the-ipad/ (Valkyrie/Metal, 120fps)
- https://www.macrumors.com/2019/12/08/procreate-5-ipad-animation-assist-brush-studio/ (Valkyrie engine, canvas limits)
- https://help.procreate.com/procreate/handbook/animation/animation-settings (onion skinning, FPS — via snippet)
