# iPad Sketching & Drawing Apps: Deep Feature Research

A competitive teardown of five best-in-class iPad drawing apps — **Concepts**, **Linea Sketch**, **Paper by WeTransfer**, **Adobe Fresco**, and **Tayasui Sketches** — focused on pen/brush design, gestures, canvas model, and unique UX. Written to mine ideas a *note-taking* app could steal. Every claim traces to a fetched official page or a search snippet; anything I could not fully confirm is marked "(unverified)."

Astropad / Sidecar latency tricks are explicitly out of scope per the brief.

---

## 1. Concepts (TopHatch)

**Positioning:** "Infinite, flexible sketching." A fully **vector** canvas where *everything you draw stays editable forever* — tool, color, size, smoothing, opacity, position, and scale can all be changed after the stroke is laid down. This is the app's whole thesis and the single most relevant idea for a note app.

### Canvas model
- **Infinite canvas** in every direction — no page boundaries; you pan/zoom into an unbounded workspace and lay out notes, plans, and illustrations spatially.
- **Editable vector strokes.** Each stroke retains its parameters and can be re-selected and re-tuned indefinitely. You can even change a stroke's *brush type* after the fact by selecting it and switching tools.
- **Unlimited layers**, organized either automatically (tool-based auto-layering — each brush can be told which layer to drop onto) or manually, with a focus mode.
- **Optional Artboards** define fixed export boundaries on the infinite canvas.
- **Drawing scale + real units.** The canvas can be set to a scale (e.g., 1:100) with Digital / Metric / Imperial units and automatic conversion — a design/CAD-grade idea.

### Pen / brush set
Concepts' brushes are defined by *what input dimension drives width*:
- **Pen** — velocity-driven: faster = thinner.
- **Fountain Pen** — velocity-driven, *inverted*: slower = thinner, faster = thicker.
- **Dynamic Pen** — pressure-driven width (renders raster-on-vector, can grow file size).
- **Fixed Width Pen** — constant thickness.
- **Wire tool** — line stays the *same visual weight at any zoom*; built for wireframes/CAD; exports clean as SVG.
- **Soft Pencil / Hard Pencil** — respond to **tilt, pressure, and velocity**; tilt shades like a real pencil.
- **Marker** — real-marker texture/transparency/edge; chisel follows stylus rotation; supports **Apple Pencil Pro barrel roll**.
- **Airbrush** — soft-edged texture.
- **Watercolor** — blends with consecutive strokes on the same layer (interrupt blending by switching brushes between strokes).
- **Fill** — flood-fills any drawn shape (needs smoothing < 100%).
- **Dotted** — vector stroke with raster dots rendered on top, for annotation/boundaries.
- **Brush Market** + **custom brush creator** (iOS): stamp brushes (up to 9 stamp images) and reveal/grain brushes, with variance graphs for pressure/tilt/velocity, spacing/scatter/rotation jitter, and per-brush default layer assignment. Brush packs can be shared live via link (read-only, auto-updating).

Every brush exposes three live properties on the tool wheel: **Size, Opacity, Smoothing**, each with a slider *and four quick-preset toggles*.

### Vector ink editing after the fact (the standout)
- **Selection tool** — Lasso or Item Picker; reachable via tap-and-hold *without changing your active tool*, or by using a second finger.
- **Nudge tool** — reshapes an existing stroke like a piece of string. **Pull:** touch directly on the line and drag it. **Push:** touch *away* from the line (a circle appears at the nib) and move toward it to shove the line. Nudge size and canvas zoom control precision. Optional "Highlight Selection" shows before/after strokes simultaneously.
- **Slice tool** — a *vector eraser*: slide across strokes to cut vector data into pieces. Set width to **zero** to *split* a stroke into two without deleting anything. Can't erase imported images (use masks).
- **Hard Mask / Soft Mask** — non-destructive hiding with crisp or soft edges; underlying strokes stay fully editable; double-tap the mask tool for a "Quick Clear" menu that deletes all content by type.

### Precision tools
- **Grids:** 5 basic (dot, graph, lined, isometric, triangle) + 3 perspective (1/2/3-point). Every grid is customizable (spacing, divisions, weight, color, opacity, orientation, confine-to-artboard), lives as its own reorderable layer, and has on-canvas rotation handles with **45° snap targets**; perspective grids expose draggable vanishing points.
- **Snap** with two contexts. *Drawing:* "Snap to Grid" (forces strokes onto grid lines), "Align to Grid" (keeps direction without constraining), auto-complete to connect endpoints, allow-traceback/allow-turns toggles. *Editing:* snap selection key points to the grid or to **key points of other strokes**; restrict to active layer.
- **Measure:** live, per-stroke measurements that update as you draw; static labels via shape guides; area measurement from the Fill tool (square footage/meters). A status-bar field shows zoom/rotation/selection dimensions and lets you **type an exact value** to resize.
- **Shape Guides:** Line, Arc, Angle, Ellipse, Rectangle — draggable, two-finger rotatable, double-tap crosshair for perfect half/full circles and squares; combine with Measure to draw at exact lengths and angles.
- **Shape recognition ("Draw & Hold"):** draw a shape in 1–4 strokes, hold at the end (default 0.5 s, adjustable) and it snaps to a clean line/arrow/triangle/square/rectangle/circle/ellipse — then remains scalable/rotatable without lifting the stylus.

### Gestures & workspace
- **Tool Wheel:** 8 configurable tool slots (outer ring) + size/opacity/smoothing (inner ring) + a center color chip. Drag it to a screen edge to collapse it into a **tool bar**; pinch to scale it; move it to the other side for instant left-handed mode (menus reorient automatically).
- **Two-finger tap = undo, three-finger tap = redo** (a near-universal convention across these apps).
- **Color:** HSL / RGB / **COPIC** color wheels (licensed COPIC swatches); tap-and-hold-drag on a color enters a **gradient mixer**; swipe between palettes.
- **Menu density gestures:** swipe outward on the Layers/Precision panels to go compact, again to hide; tap the Concepts icon to restore.
- **Pan/Rotate/Zoom** are also dedicated tools with keyboard shortcuts (Space/R/S) for desktop.

### Export
Unusually deep: **JPG, PNG (transparent), SVG, DXF (CAD/laser), PSD (layered raster), PDF (flattened *or* vector paths), native .concept.** Resolution 72/150/300/600 ppi (or 100/200/400% for screenshots). Export regions: screenshot / entire drawing / artboard / PDF bounds / **active selection**. Toggles for background, grid, filters (SVG textures), wireframe (DXF), visible-layers-only (PSD), multi-page PDF. Selections can also be **dragged out** as transparent PNGs or copied to clipboard.

---

## 2. Linea Sketch (The Iconfactory)

**Positioning:** a friendly, fast **raster** sketching app that hides complexity. Its signature is turning *sloppy hand input into clean output* with almost no mode-switching, via the "Zip" family.

### Pen / brush set
- Small, curated tool set: **Art Pencil, Pen, Marker**, each with multiple size options, plus an **Eraser** and a **Fill (paint roller)**.
- **Tilt & pressure** effects via Apple Pencil (shading, calligraphy).
- **Blend tool** with two modes: (1) soften/blur hard edges, (2) **smudge** — push colors around and swirl them together. Pressure-sensitive with the Pencil (finger-blend has no pressure).
- **"Clear Ink" swatch** — turns *any* tool into a textured eraser for blending effects (a clever reuse of the eraser as a texture brush).

### ZipLine & ZipShape (the standout)
- **ZipLine:** the straight-line helper. It works with *every* tool, **including erasers** — so you can zip a ruler-straight erase to clean an edge. Hold a finger while drawing to toggle **angle-snapping** ("QuickToggle").
- **ZipShape:** finish a rough shape, then **pause with the Pencil still down**, and it snaps to a clean shape — lines, rectangles, circles, ovals, triangles, and polygons, with straight edges and perfect curves. The pause length is **configurable**. Crucially, the *same dwell gesture* handles both a straight line (ZipLine) and a whole shape (ZipShape) — one motor habit, two outcomes.

### Fill & layers
- **Fill (paint roller):** two modes — tap an enclosed space to flood it, *or* enable fill on a shape tool so "the interior fills dynamically as you draw." The fill boundary respects **all currently visible layers, including templates and grids** — a smart way to make templates functionally interactive without extra UI. Tip: fill the layer *beneath* line art to avoid pixel fringing.
- **Layers:** simplified — rearrange (long-press + drag), merge, lock (locked layers are excluded from selection/merge), toggle visibility (double-tap the layer icon). **Transparency:** drag a mini-slider right on the layer's icon with the Pencil. **Transparency masking** lets you "draw inside the lines," ignoring transparent pixels — great for recoloring/shading without spill.

### Color
- Pre-defined palette plus one-tap custom colors that **auto-generate tints & shades**.
- **Tap-and-hold a color chip** to pop tints/shades inline (no dialog).
- **Long-press to reorder** color chips by hue/saturation/brightness.
- **Eyedropper** lives inside the "Recent Colors" set; plus color wheel and hex input.

### Gestures & UX
- **Two-finger tap undo / three-finger tap redo.**
- **Apple Pencil double-tap** is heavily configurable: eraser, tool switch, panel toggle, canvas reset, selection, tool-size, or off.
- **Zoom-responsive eraser** — the eraser physically scales with zoom, so zooming in *is* how you get a fine eraser (no separate size fiddling). Double-tap eraser clears the active layer.
- **Touch Eraser:** define what your *finger* does while the Pencil is active — erase, blend, draw, move canvas, or nothing.
- **Two-finger pinch inward (or long-press the compass) resets/re-centers the canvas.**
- **Grids/Templates + background textures**, toggleable; **Canvas Defaults** let you save preferred paper/background/font/grid as a template.
- **Presentation Mode:** AirPlay the canvas to an external screen **with no UI chrome**.
- **Version history** (with iCloud): timestamped thumbnails of every change; select + Restore. Multi-page **PDF export** of a whole project.
- **"Send to Linea"** share-sheet extension to annotate screenshots/images from other apps.

---

## 3. Paper by WeTransfer (formerly FiftyThree)

**Positioning:** the most *tactile, low-friction* app of the group. It deliberately hides menus ("let natural gestures guide you, keeping you in your creative flow") and trades pro depth for feel. Two distinct halves: the expressive **tactile brushes** and the structured **Think Kit**.

### The tactile tool set
- Core expressive tools: **Sketch (pencil), Ink (fountain-pen-like), Marker, Pencil (soft), Watercolor**, plus **Fill** and **Cut**. Users single out the **paintbrush/watercolor** as the emotional core — "high quality digital watercolors." The brushes are tuned for *feel* over configurability (there are few sliders; the character is baked in).
- **Color Mixer:** rather than a clinical picker, Paper has a mixing metaphor for building custom colors.
- Optional stylus support (originally the FiftyThree **Pencil** stylus, with palm rejection and blend-on-the-back-end tricks).

### Think Kit (the standout for a note app)
Powered by the **"Intention Engine"** — described as "autocorrect for drawing," it cleans hand input in real time *while keeping the hand-drawn look*.
- **Diagram** — a "smart pen with style": draw objects, **straight lines, connectors, and arrowheads**, and it snaps them into intelligent shapes. Ideal for flowcharts/wireframes/mind maps drawn by hand.
- **Cut** — select/rearrange/move/scale/rotate any shape or text; has a **Smart Cut** mode that auto-detects a shape so you don't switch tools; also used to build repeating patterns.
- **Fill** — freeform color fills for shapes, trend lines, pie charts; **Smart Fill** applies color to a detected shape with a single tap.

### Journals, templates, organization
- Pages live in **Journals** (digital notebooks) with custom covers; you flip through in a **3D Cover-Flow-style** view. iCloud sync remembers your page between sessions.
- **Paper Store:** dozens of pre-filled journals from designers — drawing tutorials, creative prompts, planners, exercises ("Draw Hair," "Tiny Meditation," "The Science of Doodling Flowers"). Content-as-product.
- **Templates:** reusable page backgrounds; Pro users can create their own or **capture a template from a downloaded journal**.
- **Multi-photo collage:** drop several photos on a page and "cut, stick, move, and fix without the fuss of complex layers" — deliberately *layer-free* compositing.
- **Canvas clips:** save a portion of a drawing to a **visual clipboard** for reuse elsewhere.

### Gestures & UX
- **Pinch-to-zoom**, undo/redo, minimalist chrome. Historically Paper's signature gesture was **"Rewind"** — a two-finger counter-clockwise circular scrub to undo progressively, and clockwise to redo (a scrubbable time dial rather than discrete taps) (unverified in the current fetched pages; well-documented historically).
- Philosophy: "Wave goodbye to distracting menus." Tools appear only when needed.
- Notable *omissions* (per review): no handwriting recognition, no social gallery. It is intentionally not a pro illustration tool.

---

## 4. Adobe Fresco

**Positioning:** the technically deepest painting app here — the only one that unifies **raster (pixel), vector, and physics-simulated "live" media** in one document, with Adobe-ecosystem interchange.

### Brush architecture (three families in one app)
- **Pixel/raster brushes** — 200+ built in, texture-rich (even the Pencil is grainy); import Photoshop **.ABR** brushes; make ribbon brushes via **Adobe Capture**.
- **Vector brushes** — resolution-independent, scale without quality loss, "no plotting points," beginner-friendly; jitter settings add texture to otherwise clean vector strokes.
- **Live brushes (the standout)** — Adobe-Sensei/physics-driven **watercolor and oil** that behave like real wet media:
  - **Watercolor** stays *wet* and **blooms** — color spreads into adjacent wet areas of the canvas over time.
  - **Oil** looks *thick and creamy*; you build **impasto** and swirl/mix colors directly on canvas.
  - Key sliders: **Flow** (how much paint loads on the brush), **Water Flow** (how much water — higher = colors flow and mix more), and **Mixing / Wet** (how much existing canvas paint the brush picks up).
  - **Dry Layer** command (Layer Options) freezes a layer to *stop further blooming/blending* — i.e., you decide when the paint "dries."
  - Trick: set Color Picker opacity to 0% and paint with only Water Flow to **mix existing colors without adding new pigment**.

### Brush settings & dynamics
- Per-brush: **Spacing, Angle, Blend mode, Stylus pressure, pressure curve**, plus **Color Dynamics** (hue jitter mid-stroke) and **multicolor swatches** (spheres/stripes/stars for instant 3D-ish texture).
- **Barrel roll** for vector chisel brushes (Brush settings → Tilt → Tilt & barrel roll); brushes like Chisel Roll / Terminal Roll / Flat Roll ship with it on.

### Stylus / Apple Pencil
- Pressure + tilt across brush families; **Apple Pencil Pro** support for **hover, Squeeze, and Barrel Roll** on compatible hardware. Fresco's **Squeeze** opens a shortcut toolbar of recent brushes/colors/size + undo/redo (its own take on the Pencil Pro squeeze).

### Gestures & UX
- **Two-finger tap undo / three-finger tap redo**; **draw-and-hold = snap (straight) line.**
- **Touch Shortcut** (the standout gesture idea): an on-canvas floating button with a **Primary** press and a **Secondary** press, each mapped to a modifier — e.g., hold it to temporarily turn the current brush into an **eraser**, or to constrain/snap. It's a hardware-free "modifier key" for a touch device.
- **Drawing aids:** perfect shapes (circles/polygons), a freely rotatable **ruler**.
- **Unlimited layers** (but layers can't be *named*, only thumbnailed — a documented weakness).
- **Canvas Projection** to an external display.
- Deep interchange: opens/saves PSD, round-trips to Photoshop/Illustrator.

---

## 5. Tayasui Sketches

**Positioning:** "ultra-realistic tools with a touch of Zen." The bet is on **material realism + a calm, self-hiding UI** rather than infinite editability or diagramming.

### Pen / brush set
Over 20 realistic tools: **Pen, Rotring (technical pen), Felt Pen, Pen Brush, Oil Pastel, Watercolor (separate Dry and Wet brushes), Acrylic, Airbrush, Area/Fill tool, Patterns, Text, Shapes (iPad), Eraser, Cutter, Smudge, Ruler.** Brushes "behave vividly and truly like a brush on paper, adapting pressure, angle, and width to your movements." The **wet watercolor** is the showcase — real fluid diffusion/blending.

### Precision & realism
- **Rulers and magnetic shapes:** straight, arc, circle, and **spline** rulers, plus **symmetry** and cutout shapes.
- **Brush editor** to fine-tune or build brushes.
- **Smudge** and **Cutter** (cut + move) for post-hoc adjustment.

### Color, layers, organization
- **Advanced color palette:** square picker, color disk, HEX input, custom palettes.
- Layers with **group/subgroup** organization, merge/reorder; export layers as separate transparent PNGs; **PSD import/export.**
- Cloud sync, cross-device, folders, and a community feed.

### UX philosophy
- "A unique UI with a touch of Zen" — **tools hide during creation**, showing only essential chrome for a minimal canvas. This is the same self-effacing-UI instinct as Paper and Linea.

---

## Cross-app patterns worth noting
- **Dwell-to-perfect** is the dominant "clean up my mess" gesture: Concepts (Draw & Hold), Linea (ZipShape), Fresco (draw-and-hold snap line). One motor habit; huge payoff.
- **Two-finger undo / three-finger redo** is a de-facto standard (Concepts, Linea, Fresco).
- **Self-hiding UI** is a shared value (Paper, Linea Presentation Mode, Tayasui Zen).
- **The eraser as a first-class, context-scaled brush** (Linea zoom-responsive eraser; Concepts slice with width 0 to *split*; Fresco/Linea Touch-shortcut-to-erase) — erasing is treated as drawing, not a mode.
- **Templates/grids that participate in tools** (Linea fill respects template boundaries; Concepts grid snapping) rather than being inert backgrounds.

---

## Pen & brush ideas a note app should steal

1. **Velocity- and pressure-mapped "one pen, many weights" (from Concepts' Pen/Fountain/Dynamic pens).** Ship a *single* default note pen whose width responds to speed *and* pressure, with a one-toggle "inverted" mode (slow=thin vs slow=thick) so lefties and fast writers both get clean handwriting. Expose exactly three sliders — **Size, Opacity, Smoothing** — each with 4 quick-preset chips, and nothing else by default.

2. **Live smoothing as a first-class, per-pen slider (Concepts).** 0% = raw, 50% = de-jittered handwriting, 100% = perfectly straight. A note app's handwriting looks instantly more legible at ~40–60% smoothing; make it a visible dial, not a buried setting.

3. **Editable vector ink after the fact (Concepts' whole model).** Store handwriting/diagram strokes as re-selectable vectors so a user can later change a stroke's color, thickness, or *pen type* — e.g., recolor an entire highlighted passage, or bump every heading stroke thicker, without redrawing. This is the biggest differentiator available to a note app.

4. **Nudge to reshape, Slice to split (Concepts).** Let users drag an existing stroke to reshape it (fix a wobbly underline) and "slice with width 0" to *split* a stroke in two — perfect for separating two run-together words or trimming a stray tail without a destructive erase.

5. **Non-destructive masks over destructive erasing (Concepts Hard/Soft Mask).** Offer a mask-erase that hides ink while keeping it recoverable — so an accidental scrub is always undoable by editing the mask, and highlighter mistakes don't destroy the note.

6. **A curated 3-pen kit with baked-in feel, not a 200-brush store (Linea + Paper).** Ship **Pencil, Pen, Marker/Highlighter** tuned to feel great with tilt+pressure, plus a **highlighter that lays behind text** (Linea's "fill the layer beneath" trick) so highlights never smear the ink on top.

7. **Physics highlighter / wet-ink accents (Fresco live brushes).** For visual note-takers, a watercolor-style *wash* highlight that blooms softly and a **"Dry Layer"** command to lock it — plus the opacity-0 + water-only trick to *blend two highlight colors* where passages overlap. Keep it optional; it's delight, not core.

8. **Tilt-to-shade pencil (Concepts/Tayasui/Fresco).** A pencil that shades broadly on tilt makes margin sketches and diagram fills feel analog; cheap to implement, high perceived quality.

9. **Auto-generated tints & shades from any custom color (Linea).** When a user picks a highlight/pen color, auto-offer its tints/shades on tap-and-hold, and let them **reorder the palette by hue/brightness** — so a personal color system emerges without a color-theory UI.

10. **Eyedropper living inside "Recent Colors," and eraser size driven by zoom (Linea).** Zoom in to get a fine eraser automatically; no separate size control. Recent-colors-as-eyedropper keeps the palette tiny.

11. **Fill that respects the page template as its boundary (Linea).** If the note app has ruled/grid/graph templates, let a fill/shade tool treat those printed lines as boundaries — shade a single table cell or a single ruled row with one tap.

12. **COPIC/HSL/RGB triple color wheel + drag-to-mix gradient (Concepts).** For power users, a gradient mixer (tap-hold-drag between two colors) makes color pens feel like a real desk set.

---

## Gesture ideas a note app should steal

1. **Dwell-to-perfect ("Draw & Hold" / ZipShape).** The single best steal: after drawing a rough line, box, arrow, or circle, the user **pauses with the pen down** and it snaps to a crisp shape — and the *same dwell* turns a freehand stroke into a straight ruled line. Make the dwell time configurable (Linea/Concepts both do). This makes hand-drawn boxes, arrows, tables, and underlines usable in notes with zero mode-switching.

2. **The Touch Shortcut = a software modifier key (Fresco).** A single floating on-canvas button with **Primary** and **Secondary** actions: hold to temporarily switch the current pen to **eraser**, or to constrain to straight/snap. Gives a stylus-only note-taker "hold Shift"-style power without a keyboard, and without leaving the writing hand's position.

3. **Two-finger tap = undo, three-finger tap = redo (Concepts/Linea/Fresco).** Adopt the de-facto standard exactly; users arrive already trained. Optionally add Paper's **"Rewind" scrub** (two-finger circular drag) as a *scrubbable* undo timeline for reviewing/removing a run of strokes (unverified as still-current, but a strong, learnable metaphor).

4. **Configurable Apple Pencil double-tap / squeeze menu (Linea/Fresco).** Map double-tap to *pen↔eraser* by default, but let users reassign it (highlighter, selection, panel toggle, size). Offer a **squeeze/hold radial** of recent pens+colors+undo (Fresco's squeeze toolbar) so switching tools never breaks flow.

5. **Second-finger-invokes-selection without changing tools (Concepts).** While writing, a tap-and-hold (or second finger) enters lasso/select momentarily, then drops you back into your pen. Selecting and moving a chunk of notes shouldn't require a trip to a toolbar.

6. **Zoom-scaled eraser + double-tap-to-clear-layer (Linea).** Eraser precision follows zoom; double-tapping the eraser clears the current layer/page section. Removes an entire settings interaction.

7. **"Touch (finger) role" setting when a stylus is active (Linea).** Let the user define what the *finger* does while the Pencil writes: pan, erase, smudge/blend, select, or nothing — so palm/finger input is a feature, not a nuisance.

8. **Pinch-inward / long-press to re-center-and-fit the canvas (Linea).** On an infinite/large canvas, one gesture snaps back to "fit page." Essential if the note app adopts an infinite canvas.

9. **Collapsible tool wheel that docks to an edge and flips for handedness (Concepts).** A radial tool wheel you can drag to a corner to collapse into a slim bar, pinch to resize, and move to the other side for instant left-handed layout — menus reorient automatically. Great for a distraction-light writing surface.

10. **Menu-density gestures: swipe a panel outward to go compact, again to hide (Concepts).** Give power users progressive disclosure they control by gesture, so the canvas can go fully chrome-free (Linea's Presentation Mode, Tayasui's Zen) for reading or presenting.

11. **Drag-out to export a selection (Concepts).** Lasso a diagram or a block of notes and **drag it out to another app** (Files/Mail/Slack) as a transparent PNG — turning "share a snippet" into a single drag.

12. **Type-to-resize via the status bar (Concepts).** When something is selected, show its dimensions in a status field and let the user **type an exact value** — invaluable for aligning tables, boxes, and inserted images precisely in structured notes.

---

## Sources

Pages fetched and read in full:

- Concepts — Precision Tools (iOS manual): https://concepts.app/en/ios/manual/precisiontools
- Concepts — Brushes and Tools (iOS manual): https://concepts.app/en/ios/manual/brushesandtools
- Concepts — The Nudge Tool (tutorial): https://concepts.app/en/tutorials/nudge-tool/
- Concepts — Your Workspace / gestures (iOS manual): https://concepts.app/en/ios/manual/yourworkspace
- Concepts — Export (iOS manual): https://concepts.app/en/manual/export
- Linea Sketch — Tips (official): https://linea-app.com/tips
- Linea Sketch — "Adds Fill, Blend, ZipShape, and Versioning" (MacStories review): https://www.macstories.net/reviews/linea-sketch-adds-fill-blend-zipshape-and-versioning-features/
- Paper — Think Kit (iDownloadBlog): https://www.idownloadblog.com/2015/05/12/paper-think-kit/
- Paper by WeTransfer — App Store listing: https://apps.apple.com/us/app/paper-by-wetransfer/id506003812
- Paper by WeTransfer — Paper Store review (Cult of Mac): https://www.cultofmac.com/659966/paper-by-wetransfer-paper-store-review/
- Adobe Fresco — Review & Deep Dive (Paperlike): https://paperlike.com/blogs/paperlikers-insights/adobe-fresco-review
- Tayasui Sketches — App Store listing: https://apps.apple.com/us/app/tayasui-sketches/id641900855

Search-result snippets read (host pages not fully fetched, e.g. Adobe helpx returned 403 to direct fetch):

- Adobe Fresco — Live brushes (helpx): https://helpx.adobe.com/fresco/using/live-brushes.html
- Adobe Fresco — Pixel brushes (helpx): https://helpx.adobe.com/fresco/using/pixel-brushes.html
- Adobe Fresco — Mixer brushes (helpx): https://helpx.adobe.com/fresco/using/mixer-brushes.html
- Adobe Fresco — What is Adobe Fresco (helpx): https://helpx.adobe.com/fresco/desktop/introduction/what-is-adobe-fresco.html
- Adobe Fresco — UI, gestures, Touch shortcuts (helpx): https://helpx.adobe.com/fresco/using/getting-started-with-user-interface.html
- Apple Pencil Pro for Artists — Barrel Roll/Squeeze/Hover (Paperlike): https://paperlike.com/blogs/paperlikers-insights/apple-pencil-pro-for-artists
- Concepts — App Store listing: https://apps.apple.com/us/app/concepts/id560586497
- Concepts — Google Play listing: https://play.google.com/store/apps/details?id=com.tophatch.concepts
- Concepts — official site: https://concepts.app/en/
- Concepts — Export (Android/Windows manual variants): https://concepts.app/en/windows/manual/export
- Linea Sketch — "Zip Into Shape With Linea" (Iconfactory Breakroom blog): https://blog.iconfactory.com/2018/12/zip-into-shape-with-linea/
- Linea Sketch — iPad Pro update (9to5Mac): https://9to5mac.com/2018/12/04/linea-sketch-ipad-pro-drawing-app/
- Linea Sketch — MWM product page: https://mwm.ai/apps/linea-sketch/1094770251
- Tayasui Sketches — MWM product page: https://mwm.ai/apps/tayasui-sketches/641900855
