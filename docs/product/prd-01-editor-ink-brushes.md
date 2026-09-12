# PRD-01 — Editor, Ink & Brushes

> Product requirements for the Sane Notes **editor surface**: canvas & pages, ink capture,
> the pen/brush engine, highlighter, eraser, lasso/selection, shapes & rulers, text, images,
> layers, undo/redo, viewport tools (zoom window, laser, presentation, focus), the palette
> dock, keyboard shortcuts, and stylus/touch gestures.
>
> **Audience:** a future autonomous coding agent implementing the editor with zero prior context.
> **Authority:** this document is subordinate to the project LOCKED DECISIONS. Where research
> contradicts a locked decision, the decision stands and the risk is recorded inline.
>
> **Read alongside:**
> [`docs/design/screens-and-flows.md`](../design/screens-and-flows.md) (§7 Editor is the UI source of truth),
> [`docs/design/design-system.md`](../design/design-system.md),
> [`docs/design/tokens.json`](../design/tokens.json) (ink/hl/width/paper/tint tokens — nothing is hard-coded).
> **Sibling PRDs:** [`prd-02-library-documents-audio-search.md`](prd-02-library-documents-audio-search.md)
> (library, PDF, images, audio, search & recognition engine),
> [`prd-03-identity-sync-privacy-settings-billing.md`](prd-03-identity-sync-privacy-settings-billing.md)
> (identity, local-first CRDT sync, E2EE, settings, billing),
> [`prd-04-sharing-collaboration-ai-study-a11y-i18n.md`](prd-04-sharing-collaboration-ai-study-a11y-i18n.md)
> (sharing, real-time collaboration, Sane Sage AI, study tools, accessibility, i18n).
> **Platform capability sources** (committed under `docs/research/sources/`):
> [`research/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md),
> [`research/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md),
> [`research/web-stylus-and-pwa-capabilities.md`](../research/sources/web-stylus-and-pwa-capabilities.md),
> [`research/procreate.md`](../research/sources/procreate.md),
> [`research/concepts-linea-paper-fresco.md`](../research/sources/concepts-linea-paper-fresco.md).

---

## 0. Conventions

### 0.1 Requirement format
Every requirement is one block:

> **PRD-ED-NNN · Title** — LEVEL · PLATFORMS · MILESTONE
> **AC:** testable acceptance criteria. **Sec:** security/privacy note. **A11y:** accessibility note.

- **LEVEL** is RFC-2119: **MUST** (ship-blocking), **SHOULD** (strongly expected, may slip a milestone with sign-off), **MAY** (optional/differentiator).
- IDs are stable and never reused. Gaps are intentional (room to insert).

### 0.2 Platform codes
`iPad` = iPadOS 17+ · `iOS` = iPhone (iOS 17+) · `ADt` = Android tablet · `ADp` = Android phone (Android 10+) · `Web` = PWA (Chrome/Edge 120+, Safari 17+, Firefox 125+, Samsung Internet). **All** = all five surfaces (finger/mouse fallback where no stylus). Platform-gated hardware features name the exact device family.

### 0.3 Milestones
> ⚠️ **Authoritative roadmap = [`../../issues/milestones.json`](../../issues/milestones.json)** (M0
> Foundations · M1 Ink Editor Alpha · M2 Library & Documents · M3 Audio & Recognition · M4 Identity, Sync
> & Privacy · M5 Phones & Platform Parity · M6 Collaboration, Sharing & Sage AI · M7 Beta Hardening · M8
> Launch & Growth). The **Editor scope** grouping below is an indicative slice-per-phase written against an
> earlier working roadmap; its themes do **not** all line up with the authoritative milestone titles (e.g.
> PDF/library work is milestones.json **M2**, recognition is **M3**). Treat the per-requirement `· MILESTONE`
> tags as indicative sequencing; where they conflict with milestones.json, **milestones.json wins** and the
> issue tracker holds the binding assignment.

| M | Theme | Editor scope |
|---|---|---|
| **M0** | Ink latency & capture spike (`SN-INK`) | Prove pen-to-pixel budgets (decision 7) on 3 reference devices: pure Flutter canvas vs native front-buffer (Metal / Jetpack Ink). Exit criterion feeds ADR-0001. Throwaway UI. |
| **M1** | Editor MVP | Paged pages, pan/zoom, page nav + rail, add/duplicate/delete/reorder, templates/tints/sizes, Fountain/Ballpoint/Pencil/Marker pens, highlighter, stroke eraser, INK+HL colours, 3 widths, undo/redo, palm rejection, finger-draw toggle, left-handed, focus mode. |
| **M2** | Full pen kit + selection | Remaining ≥12 brushes, brush studio, favourites bar, colour picker/palettes, lasso (move/resize/rotate/recolour/copy/delete), hold-to-shape + ruler, text tool, images/stickers. |
| **M3** | PDF, canvas depth, layers | PDF-backed pages + snap-to-text highlight, infinite-canvas navigation, layers, pixel/lasso/scribble erasers, protractor/connectors, zoom window, nudge/slice vector editing. |
| **M4** | Recognition & staging | Convert-to-text / recognise / solve-math handoff (recognition engine in `prd-02` §11; Sage AI framing in `prd-04` §4), shape-recognition polish, laser pointer, presentation mode. |
| **M5** | Stylus mastery | Squeeze, barrel roll, hover, S Pen air actions, haptics, gesture customisation, QuickMenu, pattern/dashed pens, brush sharing (`.sanepen`). |
| **M6** | Collaboration | Live cursors/presence in the editor; ciphertext-only relay (see `prd-04` §3). |

### 0.4 Cross-cutting baselines (apply to every requirement unless overridden)
- **Sec baseline (SEC-BASE):** Local-first / zero-knowledge (decision 3). All stroke, text, image, PDF and audio data lives on-device (drift/SQLite + content-addressed blob store) and is never sent to any Sane Notes server. Anything leaving the device (sync, AI, share) is end-to-end encrypted and gated by the rules in `prd-03` (sync/E2EE) and `prd-04` (AI/sharing). No editor telemetry is collected except opt-in, on-device-aggregated crash counters. The dev-only auth bypass (`--dart-define=SANE_AUTH_BYPASS=true`) never affects the editor and is impossible in release builds.
- **A11y baseline (A11Y-BASE):** WCAG 2.2 AA. Every control is reachable and labelled for VoiceOver/TalkBack and external-keyboard focus; hit targets ≥ 44×44 pt; honour Dynamic Type / system font scale on all chrome; honour Reduce Motion; never encode meaning in colour alone; respect the platform "reduce transparency" setting for the glass looks.

---

## 1. Canvas & pages

The editor renders one page at a time inside the canvas viewport (screens §7.2). Page geometry, templates, tints and sizes are defined in `tokens.json` and `screens-and-flows.md` §8; the document model is Workspace → Profiles → Notebooks → **Pages** → Layers → Objects (decision 4).

**PRD-ED-001 · Paged page kind** — MUST · All · M1
**AC:** A page of kind `paged` renders at **800×1040** page-units, drawn at ≤ **820 px** wide with a drop shadow and 4 px corner radius (`tokens.json.page`, design-system §2). Ink is captured in page-units so it is resolution-independent across zoom and export. Size options **Auto / A4 / Letter** (§1.4) change the unit aspect ratio; Auto = 800×1040.
**Sec:** SEC-BASE. **A11y:** Page exposes an accessibility label "Page X of N — <template> <tint>"; OCR-backed alt text for handwritten content is provided by the recognition engine in `prd-02`.

**PRD-ED-002 · Infinite (freeform) canvas page kind** — MUST · All · M2 (navigation hardened M3)
**AC:** A `freeform` page starts at **2400×2400** units, has no max width and no shadow ("endless board"), and grows in every direction as ink/objects approach an edge (screens §7.2, §8). Content beyond the initial bounds is preserved and reachable by pan/zoom. Page rail is hidden for freeform notebooks (freeform = one growing surface, not paginated) — see PRD-ED-012.
**Sec:** SEC-BASE; unbounded growth must not enable a denial-of-service via a crafted `.sanenote` — cap logical bounds at a documented maximum (verify: 100,000×100,000 units) and stream tiles rather than allocating one giant buffer. **A11y:** Provide a "recenter / fit content" action (PRD-ED-133) reachable by keyboard and screen reader because there are no page edges to orient by.

**PRD-ED-003 · PDF-backed page kind** — MUST · All · M3
**AC:** A `pdf` page renders the source PDF page (PDFKit on Apple, pdfium/`androidx.pdf` on Android, pdf.js on Web — see `research/pdf-and-audio-technology.md`) as an immutable backdrop beneath user ink/highlight/text layers. The PDF layer is never modified in place; annotations are Sane objects stored separately and composited on export. PDF pages keep their original colours even in dark mode (screens §0, §12 Appearance). Only the **tint** wash may be applied to a PDF page; templates/paper fills do not apply (screens §8 Apply).
**Sec:** SEC-BASE. Imported PDFs are parsed in a sandboxed renderer; never execute embedded JavaScript or follow embedded launch/URI actions without explicit user confirmation. Strip nothing from the user's file but store it encrypted at rest like any blob. **A11y:** Expose the PDF text layer to the screen reader; highlight/ink annotations announce their anchored text where snap-to-text (PRD-ED-067) captured it.

**PRD-ED-004 · Paper templates** — MUST (Blank/Lined/Grid/Dotted free; others Pro-gated per plan) · All · M1
**AC:** Templates from `tokens.json.templates`: **Blank, Lined, Grid, Dotted, Cornell, Music staff, Weekly planner, Flashcards**. Paper fill patterns are the SVG fills in `tokens.json.paperFill` (`lined`,`grid`,`dot`,`music`,`flash`; Cornell = lined + divider rules; planner = grid). Cornell adds divider rules, Music = staff lines, Flashcards = card outline (screens §7.2). Free plan exposes Lined/Grid/Dotted (+Blank); the rest require Pro (screens §14) — selecting a Pro template on Free opens the Upgrade overlay.
**Sec:** SEC-BASE; templates are static vector fills, no external fetch. **A11y:** Each template has a name and a one-line description; the template picker is not colour-only. Ruled/grid density must keep AA contrast against every look's page colour (`pp` token).

**PRD-ED-005 · Paper tints** — MUST · All · M1
**AC:** Tints from `tokens.json.tint` / `tintSwatches`: **White** (none), **Cream**, **Yellow**, **Gray**, applied as a translucent wash over the paper fill (screens §8). Tint applies to paged, freeform and PDF pages.
**Sec:** SEC-BASE. **A11y:** Tint must not drop ink/paper contrast below AA; warn (non-blocking) if a chosen ink colour + tint fails contrast.

**PRD-ED-006 · Page sizes** — SHOULD · All · M2
**AC:** Size segmented control **Auto / A4 / Letter** for paged notebooks (screens §8). A4 = 210×297 mm aspect, Letter = 8.5×11 in aspect, Auto = 800×1040 design ratio. Size is a per-page/per-notebook property recorded in the page manifest and preserved on export to PDF.
**Sec:** SEC-BASE. **A11y:** Size control is a labelled segmented control with keyboard support.

**PRD-ED-007 · Pan** — MUST · All · M1
**AC:** Two-finger drag pans the page; on Web/desktop, scroll-wheel and spacebar-drag pan. When zoomed to fit, a paged page pans only within a small over-scroll margin; freeform pans freely. Momentum/inertia matches platform norms.
**Sec:** SEC-BASE. **A11y:** Provide keyboard pan (arrow keys when canvas focused, no selection) and a "fit page" reset (PRD-ED-133).

**PRD-ED-008 · Zoom** — MUST · All · M1
**AC:** Pinch-to-zoom 25%–1600% (verify upper bound against memory budgets); double-tap-with-two-fingers or "quick pinch" fits page to viewport (Procreate/Linea convention, `research/procreate.md` §7, `research/concepts-linea-paper-fresco.md`). Ink stays crisp at all zoom (vector re-tessellation, not bitmap scaling). Ctrl/Cmd +/− and pinch on trackpad on Web/desktop.
**Sec:** SEC-BASE. **A11y:** `touch-action:none` on the canvas (Web) can block browser zoom (WCAG 1.4.4); the app MUST provide its own zoom controls and honour system text-zoom for chrome (`research/web-stylus-and-pwa-capabilities.md` §1).

**PRD-ED-009 · Rotate canvas** — SHOULD (paged) / MUST (freeform) · All · M2
**AC:** Two-finger twist rotates the canvas; a "snap to 0°/90°/180°/270°" detent with haptic tick (PRD-ED-160). Rotation is a view transform only — stored ink orientation is unchanged. A visible compass/`reset rotation` affordance appears while rotated (Linea, `research/concepts-linea-paper-fresco.md` §2).
**Sec:** SEC-BASE. **A11y:** Rotation is optional; provide a menu/keyboard "reset orientation". Do not auto-rotate content in a way that breaks reading order for screen readers.

**PRD-ED-010 · Page navigation (prev/next + jump)** — MUST · All · M1
**AC:** In-dock `‹  X / N  ›` control steps pages, clamped to `[1, N]` (`gotoPage`, screens §7.3). A "go to page…" numeric jump and jump-to-bookmark are available. Swipe-across-page-edge navigates on paged notebooks when not mid-stroke. Vertical continuous-scroll of pages is a SHOULD (see PRD-ED-011).
**Sec:** SEC-BASE. **A11y:** Page control announces "Page X of N"; keyboard PageUp/PageDown navigate.

**PRD-ED-011 · Continuous vertical scroll mode** — SHOULD · All · M3
**AC:** A per-notebook toggle between **paged** (one page, swipe to next) and **scroll** (pages stacked vertically, continuous scroll — the common study/PDF reading mode). Scroll mode must sustain 60 fps scrolling a 600-page PDF (decision 7) via page virtualization (render only visible ± buffer pages).
**Sec:** SEC-BASE. **A11y:** Scroll position and current page are announced; respect Reduce Motion (no smooth-scroll fling if disabled).

**PRD-ED-012 · Page rail / thumbnails** — MUST · iPad·ADt·Web (wide) ; MAY on phones · M1
**AC:** When `showThumbs` AND wide AND not focus mode, a **132 px** column of live page thumbnails renders (current page ringed with accent, bookmarked pages flagged) plus a dashed **+ Page** button (screens §7.7). Toggled by the toolbar **Pages** button (wide only). In **left-handed mode** the editor row is `row-reverse` so the rail sits on the left (screens §7.7, decision: `prefs.leftHanded`). Hidden for freeform notebooks (PRD-ED-002).
**Sec:** SEC-BASE; thumbnails render on-device from local strokes only. **A11y:** Each thumbnail is a labelled button ("Page X, bookmarked"); rail is keyboard-navigable; not colour-only for current/bookmarked state (add a ring + icon).

**PRD-ED-013 · Add page** — MUST · All · M1
**AC:** `+ Page` (rail or dock) clones the current page's paper template + tint + size into a new page inserted after the current one and navigates to it (screens §7.7 `addPage`). On PDF notebooks, inserting a blank page inserts a Sane paged page (not a PDF page) unless the user imports a PDF (which inserts a PDF page after current — screens §9 `doImport`).
**Sec:** SEC-BASE. **A11y:** Announce "Added page X of N".

**PRD-ED-014 · Duplicate page** — MUST · All · M2
**AC:** Duplicate copies a page's paper, tint, size, all layers, all objects (strokes/text/images/shapes) and bookmarks into a new page after the original; audio anchors are NOT duplicated (audio remains attached to the source page — see open Q on audio scope, screens Open Q5). New object ids are generated (CRDT add-wins, decision 4) so duplication is a clean merge on sync.
**Sec:** SEC-BASE. **A11y:** Announce completion; duplicated page inherits accessibility labels.

**PRD-ED-015 · Reorder pages** — MUST · All · M2
**AC:** Long-press + drag a rail thumbnail (or a Pages-overview grid) reorders pages; drop target shows an insertion indicator. Order is an LWW-ordered index in the notebook manifest merged by CRDT. Reorder is disabled for PDF pages relative to their source? — No: pages may be freely reordered; PDF page keeps its backdrop. Multi-select drag reorders a run.
**Sec:** SEC-BASE. **A11y:** Provide a non-drag alternative (move up / move down / move to… in a context menu) for switch/keyboard/screen-reader users — drag-only reordering fails WCAG 2.5.7 if no alternative exists.

**PRD-ED-016 · Delete page** — MUST · All · M2
**AC:** Delete removes a page after a single-level confirm (or immediate delete + Undo toast). Deleting the last page of a notebook is disallowed (a notebook has ≥ 1 page) — offer "clear page" instead. Deleted-page data is retained in the local op-log so Undo and 30-day notebook Trash semantics (screens §6) remain consistent.
**Sec:** SEC-BASE; deletion is a tombstone in the CRDT (remove-from-add-wins) — content is purged from the blob store only after the retention window and after sync convergence, never leaving residual plaintext. **A11y:** Destructive action is keyboard-reachable, announced, and Undo is offered via toast + shortcut.

**PRD-ED-017 · Bookmark page** — MUST · All · M1
**AC:** Toolbar bookmark toggle fills when the current page is bookmarked; toasts "Page bookmarked" / "Bookmark removed" (screens §7.1). Bookmarked pages are flagged in the rail and jumpable (PRD-ED-010).
**Sec:** SEC-BASE. **A11y:** Toggle exposes pressed/unpressed state; not colour-only (icon fill + label).

**PRD-ED-018 · Page templates/tints re-apply ("Paper & templates")** — MUST · All · M2
**AC:** From the editor, "Paper & templates" opens the Templates overlay in `tplMode:'page'` preselecting the current page's paper/tint; **Apply to this page** re-papers the current page (PDF pages take only the tint) and closes (screens §8). Re-papering never deletes ink/objects.
**Sec:** SEC-BASE. **A11y:** Overlay is a focus-trapped modal, ESC/backdrop closes, controls labelled.

**PRD-ED-019 · Freeform navigation aids** — SHOULD · All · M3
**AC:** On freeform pages: a minimap/overview toggle, pinch-inward or long-press to "fit all content", and edge-of-content indicators when panned away from ink (Linea recenter, `research/concepts-linea-paper-fresco.md` §2). Optional drawing scale/units are out of scope for notes (recorded as a MAY, Concepts §1).
**Sec:** SEC-BASE. **A11y:** "Fit content" and "jump to next object cluster" are keyboard/screen-reader actions.

**PRD-ED-020 · Page background snapping for fills/shading** — MAY · All · M3
**AC:** Where a fill/shade tool exists (PRD-ED-078b / lasso recolour), template rules (lined/grid/table cells) act as fill boundaries so a single ruled row or grid cell can be shaded in one tap (Linea, `research/concepts-linea-paper-fresco.md` §2 idea 11).
**Sec:** SEC-BASE. **A11y:** Fill previews its target region with a visible outline, not colour alone.

---

## 2. Ink capture

The ink pipeline is the product's core perceptual bar. It MUST meet decision 7 latency budgets. Capture is implemented in `packages/sane_ink` (pure Dart model) fed by federated native plugins for the low-latency surface (decision 1/2). The M0 spike (`SN-INK`) decides pure-Flutter vs native front-buffer per platform and writes the exit criterion into ADR-0001.

**PRD-ED-021 · Pressure capture** — MUST (where hardware provides it) · All · M0/M1
**AC:** Capture normalized tip pressure per sample: `UITouch.force`/`PKStrokePoint.force` (iPad/iOS), `MotionEvent.getPressure()`/`AXIS_PRESSURE` (Android), `PointerEvent.pressure` (Web). Store per point as `p∈[0,1]`. Devices without true pressure (Apple Pencil USB-C, many fingers/mice) fall back to a synthetic pressure derived from velocity (PRD-ED-024). Honour the Settings **Pressure sensitivity** toggle (screens §12) — off ⇒ constant pressure.
**Sec:** SEC-BASE; raw pressure is note content, stays on device. **A11y:** Users who cannot modulate pressure get identical stroke quality via the velocity model; pressure is never required to produce legible ink.

**PRD-ED-022 · Tilt (altitude) capture** — MUST (pen) · iPad·iOS·ADt·ADp·Web · M1
**AC:** Capture stylus altitude/tilt per sample: `UITouch.altitudeAngle`, `MotionEvent AXIS_TILT`, `PointerEvent.altitudeAngle` (Safari 18.2+/Chromium) with `tiltX/tiltY` fallback. Store radians. Tilt drives pencil/charcoal shading and chisel width (PRD-ED-050, PRD-ED-052).
**Sec:** SEC-BASE. **A11y:** Tilt is an enhancement; all pens usable without it.

**PRD-ED-023 · Azimuth & barrel-roll capture** — SHOULD · iPad·iOS·ADt·Web · M1 (azimuth) / M5 (roll)
**AC:** Capture azimuth (compass direction of tilt): `UITouch.azimuthAngle(in:)`, `MotionEvent AXIS_ORIENTATION`, `PointerEvent.azimuthAngle`. Capture roll where available: `UITouch.rollAngle` (Apple Pencil Pro), reconciled via `touchesEstimatedPropertiesUpdated` because roll/force arrive first as estimates over BLE (`research/apple-pencil-ipados-capabilities.md` §3). Azimuth rotates calligraphy/chisel nibs; roll drives brush orientation on Pencil Pro (PRD-ED-158).
**Sec:** SEC-BASE. **A11y:** Orientation-driven effects have non-orientation fallbacks.

**PRD-ED-024 · Point model & serialization** — MUST · All · M1
**AC:** Each stroke stores an ordered point list `{x, y, p, tilt, azimuth, t}` where `t` is the audio-relative timestamp (ms) or null (decision 4; screens §17 Stroke `pts`). Persisted as **compressed deltas** (varint/zig-zag on quantized deltas) in `.sanenote` segments (decision 4; Android Ink uses protobuf + delta compression, `research/android-stylus-capabilities.md` §1 — mirror that scheme in `sane_ink`). A stroke also caches its rendered SVG path `d`, colour, width `w`, opacity `op`, `kind∈{pen,hl,shape,erase}` and bbox `bb` (screens §17).
**Sec:** SEC-BASE; serialization is a documented open format (decision 4) — the parser MUST be hardened against malformed/oversized segments (bounds-checked, allocation caps). **A11y:** N/A (data layer); timestamps enable audio-linked review which aids low-vision users.

**PRD-ED-025 · Coalesced (high-frequency) sampling** — MUST · All · M0/M1
**AC:** Recover every intermediate hardware sample (up to 240 Hz) per frame: `UIEvent.coalescedTouches(for:)` (read inside the handler only), Android `getHistorical*` + `requestUnbufferedDispatch`, Web `PointerEvent.getCoalescedEvents()` (secure context; Safari 18.2+). All coalesced points feed the committed stroke geometry so fast strokes stay smooth (`research/*` §capture).
**Sec:** SEC-BASE (secure context / HTTPS required on Web). **A11y:** N/A.

**PRD-ED-026 · Predicted points (latency hiding)** — MUST · All · M0/M1
**AC:** Draw ahead of the pen using predicted samples: `UIEvent.predictedTouches(for:)`, `androidx.input:input-motionprediction` (`MotionEventPredictor.predict()`), Web `PointerEvent.getPredictedEvents()`. Predicted geometry is rendered transiently and **discarded/replaced** when real samples arrive; predicted points MUST NOT enter the committed stroke. Where the Web delegated **Ink API** (`navigator.ink`) is available (Chromium), use it as a progressive enhancement for the trailing segment.
**Sec:** SEC-BASE. **A11y:** N/A.

**PRD-ED-027 · Low-latency render surface** — MUST · All · M0
**AC:** Meet decision 7 pen-down→pixel budgets: **≤16 ms** ProMotion iPad (native front-buffer via Metal/`CAMetalLayer presentsWithTransaction` + `UIUpdateLink wantsLowLatencyEventDispatch`), **≤25 ms** mid Android (`androidx.graphics.lowlatency` front-buffered / Jetpack **Ink** ~4 ms path), **≤30 ms** Chrome desktop Web (`getContext(…, {desynchronized:true})` + Ink API where present). The M0 spike measures both pure-Flutter and native-view paths on the three reference devices; if the budget fails on pure Flutter, the wet-ink surface pivots to a native platform view with the Dart core retained (decision 1 risk gate → ADR-0001).
**Sec:** SEC-BASE. **A11y:** Low latency benefits everyone; must not disable when Reduce Motion is on (latency ≠ animation).

**PRD-ED-028 · Stroke smoothing / stabilization** — MUST · All · M1
**AC:** Every pen exposes a **Smoothing** amount (0–100%). Implement three complementary engines (Procreate model, `research/procreate.md` §4): **StreamLine** (curve-fit to elegant curves), **Stabilization** (speed-dependent moving-average wobble cancel), **Motion Filtering** (delete wobble extremities — the tremor/accessibility mode). Default per-pen smoothing ~45% for handwriting legibility (`research/concepts-linea-paper-fresco.md` idea 2). Smoothing is applied to the committed stroke, not just the preview, and is re-editable (PRD-ED-088).
**Sec:** SEC-BASE. **A11y:** **Motion Filtering** is surfaced as an accessibility aid ("Steady hand / tremor smoothing") in Settings, applying app-wide independent of the per-pen slider.

**PRD-ED-029 · Palm rejection** — MUST · iPad·iOS·ADt·ADp·Web · M1
**AC:** Honour the Settings **Palm rejection** toggle (default on, screens §12). When on and a stylus is active/hovering, touch contacts do not draw; they pan/zoom/gesture instead. Implement per platform: PencilKit auto-rejects / branch on `UITouch.type==.pencil`; Android drop `ACTION_CANCEL`/`FLAG_CANCELED` pointers (API 33+) and treat palm-sized `TOOL_TYPE_FINGER` as gesture; Web pen-priority heuristic (ignore concurrent `touch` while `pen` present; use `width/height`+`pressure`) (`research/*` palm sections). A stroke cancelled as palm is removed and the surface re-rendered.
**Sec:** SEC-BASE. **A11y:** With **Draw with finger** on (PRD-ED-031) and no stylus, palm rejection relaxes so finger drawing works; document the interaction.

**PRD-ED-030 · Wrist / hand-rest protection ("guard")** — SHOULD · iPad·iOS·ADt·ADp · M2
**AC:** Beyond palm rejection, offer an optional on-screen **wrist guard** region (a soft-ignore band along the bottom/handedness edge) that suppresses accidental UI activation and touch input from a resting wrist while writing, following the writing hand per left-handed mode. Off by default; when on, it never blocks the stylus.
**Sec:** SEC-BASE. **A11y:** Guard must not cover or block chrome needed by screen-reader users; it is input-suppression only and is disabled while an assistive-touch/switch session is active.

**PRD-ED-031 · Finger-draw toggle** — MUST · All · M1
**AC:** Settings **Draw with finger** (default off): off ⇒ fingers only scroll/pinch/gesture, a stylus is required to ink; on ⇒ finger contacts draw with the active tool (screens §12). Implement via PencilKit `drawingPolicy`/`UITouch.type`, Android tool-type branch, Web `pointerType` branch. On finger-only devices (most phones, trackpad Web), finger/mouse drawing is always enabled regardless of the toggle.
**Sec:** SEC-BASE. **A11y:** Users without a stylus are first-class; finger drawing quality equals pen quality (minus pressure/tilt, substituted by velocity model).

**PRD-ED-032 · Left-handed mode** — MUST · All · M1
**AC:** Settings **Left-handed mode** (default off) flips the editor to `row-reverse`: page rail moves to the left, palette dock default/handedness mirrors, and the wrist guard (PRD-ED-030) follows the left hand (screens §7.7, §12). Setting persists per profile.
**Sec:** SEC-BASE. **A11y:** Mirroring must preserve logical reading/focus order for screen readers (visual mirror, not semantic reorder).

**PRD-ED-033 · Hover preview** — SHOULD · iPad(M-series + Pencil 2/Pro)·ADt/ADp(USI/S Pen w/ hover)·Web(Safari 16.1+/pointer) · M5
**AC:** When the stylus hovers, show a brush cursor previewing size/shape/colour at the hover point before contact (Procreate hover, `research/procreate.md` §7–8). Read `AXIS_DISTANCE` (Android), `UIPencilHoverPose` (Apple), pointer hover (Web). Hover pinch/slide MAY adjust size/opacity.
**Sec:** SEC-BASE. **A11y:** Hover is additive; never the only way to see the active brush (the dock always shows it).

**PRD-ED-034 · Ruler/straightedge assist during capture** — MUST · All · M2
**AC:** See PRD-ED-098 (ruler) — ink drawn against an active ruler snaps to the ruled line. Listed here because it is part of the capture path (constrain points to the ruler axis before smoothing).
**Sec:** SEC-BASE. **A11y:** Ruler has numeric angle entry (PRD-ED-099).

**PRD-ED-035 · Capture during audio recording (timestamping)** — MUST · All · M1 (capture) / M2 (playback dim)
**AC:** While a recording is active, every committed stroke stores `t` = seconds since recording start (screens §7.6). During playback, strokes with `t` after the playhead dim to opacity 0.12 so ink "replays in sync" (screens §7.6). Tapping written ink later seeks audio to that stroke's `t` (the "tap a word to hear what was said" promise; surfaced fully in `prd-02`).
**Sec:** SEC-BASE; audio + timestamps are note content, encrypted at rest, never uploaded except via the user's E2EE sync. **A11y:** Audio-linked ink gives low-vision users a spoken channel for handwritten content; expose "play audio at this stroke" as a screen-reader action.

---

## 3. Colour system

Colour tokens are fixed in `tokens.json`; **nothing in the app hard-codes a colour** (tokens `$meta`). The editor uses the **INK** palette for pens, **DARK_INK** as the dark-mode mapping, and **HL** for the highlighter (screens §7.3).

**PRD-ED-036 · INK quick palette** — MUST · All · M1
**AC:** Pen colour picker shows the 6-swatch **INK** palette: `#1f1f24` near-black, `#2457c5` blue, `#d33b3b` red, `#2e8b57` green, `#7a3ec9` purple, `#e07b1c` orange (`tokens.json.ink.INK`; screens §7.3). Selected swatch shows a double ring. Picking an ink colour while on eraser/lasso/image snaps the tool back to pen (screens §7.3).
**Sec:** SEC-BASE. **A11y:** Swatches expose colour **names** (accessible "Color Cards" pattern, `research/procreate.md` §10) and a selected state that is not colour-only (ring). Announce the active colour name on change.

**PRD-ED-037 · Dark-mode ink inversion** — MUST · All · M1
**AC:** In dark mode the 6 INK swatches map to the lighter **DARK_INK** set: `#f2efe8, #6f9cff, #ff7b7b, #5fd18a, #b48cff, #ffa14d` (`tokens.json.ink.DARK_INK`; screens §7.3). Inversion is a **display mapping**: the stored stroke colour is the semantic INK index/base, and rendering picks INK vs DARK_INK by the active theme so a note authored in light mode reads correctly in dark and vice-versa. PDFs keep original colours (screens §0). User-picked custom hex colours are shown as authored (no auto-inversion) with an optional "adapt to dark" per-stroke flag.
**Sec:** SEC-BASE. **A11y:** DARK_INK values are chosen for AA contrast on dark page grounds; custom colours warn on low contrast.

**PRD-ED-038 · HL palette** — MUST · All · M1
**AC:** When the highlighter is active the picker switches to the 4-swatch **HL** palette: `#ffe45c` yellow, `#ff9ad5` pink, `#9be47a` green, `#8fd3ff` blue (`tokens.json.hl`; screens §7.3), rendered at opacity 0.5 (PRD-ED-066). HL colours are not dark-inverted (highlight semantics are colour-identity).
**Sec:** SEC-BASE. **A11y:** HL swatches are named; ensure highlighted text keeps AA legibility of the ink on top.

**PRD-ED-039 · Custom colour picker** — SHOULD · All · M2
**AC:** Beyond the quick palette, a full picker with **Disc** (hue ring + saturation/brightness) and **Value** (HSB sliders + numeric **hex** entry) tabs (Procreate, `research/procreate.md` §5). A **Recent colours** strip tracks the last 10 used (Procreate history).
**Sec:** SEC-BASE. **A11y:** Numeric hex entry gives a non-visual way to set an exact colour; sliders are keyboard-adjustable with value readout.

**PRD-ED-040 · Eyedropper** — SHOULD · All · M2
**AC:** Tap-and-hold on the canvas (or bind to Pencil double-tap/squeeze) summons a loupe showing new-over-current colour; drag to sample any pixel (ink, image, PDF); release to pick (Procreate, `research/procreate.md` §5). Sampled colour joins Recent colours.
**Sec:** SEC-BASE; sampling reads only on-device canvas pixels. **A11y:** Eyedropper announces the sampled colour name/hex; provide a menu alternative to the hold gesture.

**PRD-ED-041 · Per-notebook palette / swatches** — SHOULD · All · M2
**AC:** Each notebook carries a small custom palette; users add swatches from Recent/eyedropper/hex. Tap-and-hold a colour offers auto-generated tints/shades (Linea, `research/concepts-linea-paper-fresco.md` idea 9). Palettes are importable/exportable as a small `.swatches`-style file (Procreate `.swatches`).
**Sec:** SEC-BASE; imported palette files are pure data — validate structure, cap size, no code. **A11y:** Palette reorder offers a non-drag alternative; swatches named.

**PRD-ED-042 · Width quick picker** — MUST · All · M1
**AC:** Three width dots for `WIDTHS = [1.6, 2.6, 4.4]` page-units (rendered ≈ 5/9/13 px at 100%) (`tokens.json.widths`; screens §7.3). Selecting a width while on the highlighter switches back to pen (highlighter has fixed width) (screens §7.3).
**Sec:** SEC-BASE. **A11y:** Width dots are labelled Thin/Medium/Thick, not size-glyph-only.

**PRD-ED-043 · Extended width range (brush studio)** — SHOULD · All · M2
**AC:** Brush studio (PRD-ED-062) exposes a continuous base-width slider (recommend 0.3–48 page-units) with per-brush Min/Max clamps so the quick picker's three dots map to sensible values for that brush and the global slider can't push a brush to a useless size (Procreate Min/Max clamps, `research/procreate.md` §2.3 Properties).
**Sec:** SEC-BASE. **A11y:** Slider keyboard-adjustable with unit readout.

**PRD-ED-044 · Opacity control** — SHOULD · All · M2
**AC:** Per-stroke/per-brush opacity 0–100% (pens default 100%; highlighter 50%). Exposed in brush studio and, for quick access, an optional dock slider.
**Sec:** SEC-BASE. **A11y:** Opacity numeric readout; low-opacity ink warns on contrast.

**PRD-ED-045 · Colour-blind & colour-name support** — SHOULD · All · M2
**AC:** A global setting announces the active colour's name on change and shows named "Color Cards" in the picker; an optional colour-blind-friendly relabelling of swatches (Procreate accessibility, `research/procreate.md` §10). Never require colour discrimination to use a tool.
**Sec:** SEC-BASE. **A11y:** This IS the a11y requirement — satisfies WCAG 1.4.1 (use of colour).

---

## 4. Pens & brushes

The pen engine adapts Procreate's **"stamp (Shape) carrying a texture (Grain) deposited along the Path"** model (`research/procreate.md` §2, §11). It lives in `packages/sane_brushes` (engine + presets) with rendering in `packages/sane_render`. Design defaults (INK colour, 3 widths, highlighter fixed 22) come from `tokens.json`; brush studio extends beyond the quick defaults without changing them.

### 4.1 Brush parameter schema

**PRD-ED-046 · Brush parameter schema** — MUST · All · M2
**AC:** A brush is a serializable document with the following parameter groups (adapted from Procreate Brush Studio, `research/procreate.md` §2.3). Every visual property MAY be bound to an input source (pressure, tilt, velocity, azimuth, roll, or randomness) via an editable curve, not just a scalar.

| Group | Parameters |
|---|---|
| **Identity** | `id`, `name`, `author`, `version`, `resetPoint`, `icon` |
| **Path** | `spacing`, `spacingJitter`, `jitterLateral`, `jitterLinear`, `fallOff` |
| **Stabilization** | `streamlineAmount`, `streamlinePressure`, `stabilizationAmount`, `motionFilterAmount`, `motionFilterExpression` |
| **Taper** | `startSize`, `endSize`, `startOpacity`, `endOpacity`, `pressureDriven`, `tip`, `linkTips` |
| **Shape** | `shapeSource`, `scatter`, `count`, `countJitter`, `roundnessGraph`, `pressureRoundness`, `tiltRoundness`, `flipX`, `flipY`, `inputStyle∈{touch, azimuth, azimuth+roll}`, `edgeFiltering∈{none, classic, improved}` |
| **Grain** | `grainSource`, `behaviour∈{moving, texturized}`, `scale`, `depth`, `depthJitter`, `blendMode`, `brightness`, `contrast` |
| **Rendering** | `mode∈{lightGlaze…intenseBlending}` (glaze→blend spectrum) |
| **Blending** | `flow`, `wetEdges`, `strokeBlendMode`, `alphaThreshold` |
| **Wet Mix** (optional) | `dilution`, `charge`, `attack`, `pull`, `blur` |
| **Color Dynamics** | `stampJitter`, `strokeJitter`, `colorPressure`, `colorTilt`, `colorBarrelRoll` (each: hue/sat/light/secondary) |
| **Dynamics** | `speedToSize`, `speedToOpacity`, `speedToSpacing`, `sizeJitter`, `opacityJitter` |
| **Input curves** | `pressureGraph` (≤4 nodes → size/opacity/flow), `tiltGraph` (angle→opacity/size/shading), `barrelRollToSize/Opacity` |
| **Clamps** | `minSize`, `maxSize`, `minOpacity`, `maxOpacity` |

**Sec:** SEC-BASE; a brush is a data document, never executable. The importer (PRD-ED-064) MUST reject anything outside this schema, cap image sizes for Shape/Grain, and never evaluate embedded code. **A11y:** Brush studio controls are all keyboard/screen-reader operable with numeric readouts; a brush is fully usable at its defaults without ever opening the studio.

### 4.2 Default pen set (≥12 brushes)

**PRD-ED-047 · Default brush library (≥12)** — MUST (core 6 in M1; remainder M2/M5) · All · M1–M5
**AC:** Ship at least the following twelve stock brushes, tuned to feel great with tilt+pressure+velocity and to degrade gracefully on finger/mouse (velocity substitutes for pressure). Grouped into sets **Pens / Pencils / Markers / Decorative** (screens uses a single "pen" tool with the active brush; the brush is chosen from the favourites bar / brush library). Parameter tables below give the load-bearing settings; unlisted parameters take schema defaults. Widths are page-units.

Legend: `P`=pressure, `V`=velocity, `T`=tilt, `Az`=azimuth, `R`=barrel roll.

**1 — Fountain Pen** (default pen) · MUST · M1
| Param | Value |
|---|---|
| Width→driver | `V` + light `P`; slow=thin, fast=thick (inverted-velocity, Concepts Fountain Pen) |
| Base width / range | 2.6 units / 0.8–5.5 |
| Taper | start+end, pressure-driven, `tip` fine |
| Smoothing | streamline 45% |
| Shape / Grain | round / none |
| Blend / opacity | normal / 100% |
| Notes | Ships as the default; makes handwriting look alive even with no pressure hardware (`research/procreate.md` idea). |

**2 — Ballpoint** · MUST · M1
| Param | Value |
|---|---|
| Width→driver | near-constant; slight `P` |
| Base width / range | 1.8 / 1.2–3.0 |
| Taper | minimal |
| Smoothing | 30% |
| Shape/Grain | round / faint grain |
| Notes | Everyday opaque pen; reliable on all inputs. |

**3 — Fineliner / Technical Pen** · MUST · M1
| Param | Value |
|---|---|
| Width→driver | constant (monoline) |
| Base width / range | 1.6 / 0.5–4.0 |
| Taper | none · edge filtering `improved` |
| Smoothing | 65% (crisp diagrams) |
| Shape/Grain | round / none |
| Notes | Precise pen for diagrams, tables, technical notes (Concepts Wire/Fixed, `research/concepts-linea-paper-fresco.md` §1). |

**4 — Gel Pen** · SHOULD · M2
| Param | Value |
|---|---|
| Width→driver | `P` (moderate range), glossy opaque |
| Base width / range | 2.2 / 1.0–5.0 |
| Taper | start+end pressure |
| Smoothing | 40% |
| Notes | Smooth, slightly glossy, saturated ink. |

**5 — Pencil (graphite)** · MUST · M1
| Param | Value |
|---|---|
| Width→driver | `P`→opacity; `T`→shading breadth |
| Base width / range | 2.4 / 1.2–6.0 |
| Grain | paper grain, **texturized** (fixed to page, graphite-on-tooth) |
| Tilt | `tiltGraph` 30–90°→broad soft shading |
| Smoothing | 20% (keep hand texture) |
| Notes | Tilt-to-shade is a headline differentiator (`research/procreate.md` idea; `research/concepts-linea-paper-fresco.md` idea 8). |

**6 — Soft Pencil / Charcoal** · SHOULD · M2
| Param | Value |
|---|---|
| Width→driver | `P`→opacity+size; strong `T` shading |
| Base width / range | 3.0 / 1.5–10 |
| Grain | coarse charcoal, texturized |
| Rendering | light glaze; buildable on overlap |
| Notes | For sketchy diagrams and margin art. |

**7 — Brush Pen / Calligraphy** · SHOULD · M2
| Param | Value |
|---|---|
| Width→driver | `P` (wide range) + `V` |
| Base width / range | 3.2 / 0.6–14 |
| Shape | roundness squash; `inputStyle=azimuth` (nib follows tilt direction) |
| Taper | strong pressure taper |
| Smoothing | 50% |
| Notes | Expressive headings/hand-lettering (`research/procreate.md` idea). |

**8 — Marker (felt-tip)** · MUST · M1
| Param | Value |
|---|---|
| Width→driver | near-constant chisel |
| Base width / range | 4.4 / 2.5–12 |
| Shape | chisel; `inputStyle=azimuth` |
| Blend | multiply-ish; semi-opaque (~85%) |
| Notes | Bold annotation; overlaps darken slightly (real marker). |

**9 — Highlighter** · MUST · M1 (full spec in §5)
| Param | Value |
|---|---|
| Width | fixed 22 units (`tokens.json` / screens §7.3) |
| Opacity / blend | 0.5 / multiply, rendered **behind** ink |
| Shape | wide chisel; `inputStyle=azimuth` |
| Colour | HL palette only |
| Notes | See PRD-ED-066–070. |

**10 — Monoline** · SHOULD · M2
| Param | Value |
|---|---|
| Width→driver | constant round |
| Base width / range | 2.6 / 0.5–8 |
| Taper | none · Smoothing 55% |
| Notes | Clean uniform line for underlines, boxes, labels. |

**11 — Dashed / Dotted pen** · SHOULD · M5
| Param | Value |
|---|---|
| Mechanism | pure `spacing`: high spacing → repeated stamp with gaps |
| Variants | dashed (short bar stamp), dotted (round stamp) |
| Base width / range | 2.4 / 1.0–6 |
| Notes | Callouts, cut-lines, de-emphasised connectors (`research/procreate.md` idea). |

**12 — Pattern / Stamp pen** · MAY · M5
| Param | Value |
|---|---|
| Mechanism | custom `shapeSource` icon at wide `spacing` + `scatter`/`count`/colour jitter |
| Notes | Decorative dividers, borders, emphasis motifs (stars/arrows) (`research/procreate.md` idea). |

**13 — Crayon / Wax** *(bonus)* · MAY · M5
| Param | Value |
|---|---|
| Grain | heavy wax grain, texturized |
| Width→driver | `P`+`T` |
| Notes | Playful texture for younger/personal notebooks. |

**Sec:** SEC-BASE; stock brushes bundle only first-party Shape/Grain assets. **A11y:** Every stock brush is usable on finger/mouse; the default (Fountain Pen) never depends on pressure hardware. Brush names are text, not icon-only.

### 4.3 Brush studio, favourites, library

**PRD-ED-062 · Brush studio** — SHOULD · iPad·ADt·Web ; MAY on phones · M2
**AC:** An editor for the PRD-ED-046 schema with three regions (Procreate model, `research/procreate.md` §2.2): attribute list, settings sliders/graphs/toggles, and a **live drawing pad** to test in real time. Users duplicate-and-edit an existing brush or start from scratch; **Create Reset Point** / **Reset Brush** restore known-good state. Input→output **graphs** (pressure, tilt) support add-node curve editing.
**Sec:** SEC-BASE. **A11y:** Every slider/graph node has a numeric field alternative; the drawing pad has a "test stroke" button for users who cannot draw a gesture.

**PRD-ED-063 · Favourites bar** — MUST · All · M2
**AC:** The palette dock hosts a **favourites bar** of the user's pinned brushes for one-tap switching (screens shows a single "pen" tool; the favourites bar selects which brush that tool uses). A **Recent** set auto-tracks the last ~8 brushes; swipe/long-press to **Pin** (Procreate library UX, `research/procreate.md` §3). Reorderable.
**Sec:** SEC-BASE. **A11y:** Bar is keyboard-navigable; each entry labelled with brush name; reorder has a non-drag alternative.

**PRD-ED-064 · Brush library (sets, search, recent, pin)** — SHOULD · All · M2
**AC:** Brushes organise into **sets** (Pens/Pencils/Markers/Decorative + user sets), with search, a Recent set, and Pin (Procreate, `research/procreate.md` §3). Long-press to reorder; swipe to duplicate.
**Sec:** SEC-BASE. **A11y:** Search is text; sets are labelled; not colour-only.

**PRD-ED-065 · Brush import/export/sharing (`.sanepen`)** — MAY · All · M5
**AC:** Brushes are shareable, versioned documents (`.sanepen` single, `.sanepenset` set) with author metadata and a reset point (Procreate `.brush`/`.brushset` model, `research/procreate.md` §2.4, §3). Import via Files/share-sheet/drag; imported single brushes land in an "Imported" set. Export by long-press-drag or multi-select.
**Sec:** SEC-BASE. **CRITICAL:** imported brush files are **untrusted third-party content** — parse in a hardened, schema-validated reader; reject unknown fields; cap and sanitize embedded Shape/Grain bitmaps (dimension + byte caps, re-encode to a safe format); never execute any embedded script or follow any URL; show provenance (author, unverified) before enabling. This is a supply-chain surface (MASVS/ASVS): treat like loading a foreign file. **A11y:** Import flow announces success/failure and shows the brush name.

---

## 5. Highlighter

**PRD-ED-066 · Highlighter core** — MUST · All · M1
**AC:** Semi-transparent wide stroke: opacity **0.5**, fixed width **22** units, colour from the **HL** palette, rendered **under** ink (highlights sorted before pen strokes so text stays legible on top) (screens §7.3, §7 tool table). Selecting a width switches back to pen (fixed width); picking a pen INK colour switches back to pen (screens §7.3).
**Sec:** SEC-BASE. **A11y:** Highlight must not reduce underlying ink below AA legibility; provide an "underline" highlight style alternative for users who find fills hard to read.

**PRD-ED-067 · Snap-to-text highlight on PDF** — SHOULD · All · M3
**AC:** On PDF pages (and on recognised typed text), a highlighter mode snaps to text runs: dragging across text produces a clean per-line highlight bounded to the text baseline/x-height rather than a freehand smear (Android `androidx.pdf` highlighter snap-to-text, `research/android-stylus-capabilities.md` §5; `research/pdf-and-audio-technology.md`). The snapped highlight anchors to the text so it moves with reflow/export.
**Sec:** SEC-BASE; snapping reads the on-device PDF text layer only. **A11y:** Snapped highlights carry the highlighted text as their accessible label (screen-reader can read "highlighted: …").

**PRD-ED-068 · Straight-line highlighter** — SHOULD · All · M2
**AC:** Draw-and-hold (dwell) with the highlighter snaps to a straight, axis-aware highlight (ZipLine works with every tool, `research/concepts-linea-paper-fresco.md` §2) — for underlining and margin bars.
**Sec:** SEC-BASE. **A11y:** Dwell time configurable; keyboard alternative via shape tool.

**PRD-ED-069 · Highlighter on its own layer** — MUST · All · M1
**AC:** Highlights render on a conceptual highlight layer beneath ink regardless of authoring order, so a highlight drawn after ink still sits behind it (Linea "fill the layer beneath", `research/concepts-linea-paper-fresco.md` idea 6). Erasing ink does not erase the highlight unless the eraser targets highlights (PRD-ED-074).
**Sec:** SEC-BASE. **A11y:** N/A.

**PRD-ED-070 · Wet/wash highlighter** — MAY · All · M5
**AC:** An optional watercolor-style wash highlight that blooms softly, with a "lock/dry" command and an overlap-blend trick (Fresco live brushes, `research/concepts-linea-paper-fresco.md` idea 7). Delight, not core.
**Sec:** SEC-BASE. **A11y:** Off by default; standard highlighter remains the accessible default.

---

## 6. Eraser

**PRD-ED-071 · Stroke eraser** — MUST · All · M1
**AC:** Removes any whole stroke it touches; hit-test radius ∝ width; cursor is "cell" (screens §7 tool table). Undo snapshot captured on pointer-down (screens §7.9). Works via `sane_ink`/`androidx.ink.geometry` hit-testing.
**Sec:** SEC-BASE; erase is a CRDT tombstone, recoverable via Undo until convergence. **A11y:** Eraser size selectable; announce "erased N strokes".

**PRD-ED-072 · Pixel / area eraser** — SHOULD · All · M3
**AC:** A bitmap eraser that removes only the touched region of a stroke (partial erase), analogous to PencilKit's bitmap eraser vs vector eraser (`research/apple-pencil-ipados-capabilities.md` §2). Because ink is vector, implement as a per-stroke mask (non-destructive, editable) rather than rasterizing.
**Sec:** SEC-BASE. **A11y:** Size control; works without precise motor control via larger radii.

**PRD-ED-073 · Lasso / area-scoped erase** — SHOULD · All · M3
**AC:** Erase everything inside a lassoed region in one gesture (area erase), respecting the current "erase target" filter (PRD-ED-074).
**Sec:** SEC-BASE. **A11y:** Confirm count before/after; undoable.

**PRD-ED-074 · Erase-target filter** — SHOULD · All · M2
**AC:** Eraser targets are filterable: **This layer only**, **Ink only** (spare highlights), **Highlights only**, **All**. Default: current layer, spare highlights (so cleaning ink doesn't wipe highlights). (Concepts "quick clear by type", `research/concepts-linea-paper-fresco.md` §1.)
**Sec:** SEC-BASE. **A11y:** Filter is a labelled menu.

**PRD-ED-075 · Scribble-to-erase** — SHOULD · All · M3
**AC:** A rapid back-and-forth scribble gesture over ink (recognised via the ML Kit / Vision gesture classes incl. "scribble", `research/android-stylus-capabilities.md` §3) deletes the scribbled-over strokes, so users erase the way they cross out on paper — without switching to the eraser tool. Show a confirm/undo toast. Off if it causes false positives during dense writing (a setting).
**Sec:** SEC-BASE; gesture recognition runs on-device. **A11y:** Optional; never the only erase path.

**PRD-ED-076 · Zoom-scaled eraser** — MAY · All · M3
**AC:** Eraser radius scales with zoom so zooming in yields a finer eraser without a size control (Linea, `research/concepts-linea-paper-fresco.md` §2). A toggle; explicit size still available.
**Sec:** SEC-BASE. **A11y:** Explicit size control remains for users who can't zoom precisely.

**PRD-ED-077 · Double-tap eraser to clear** — MAY · All · M3
**AC:** Double-tapping the eraser tool offers "Clear layer" / "Clear page" (Linea/Procreate, `research/concepts-linea-paper-fresco.md` §2). Guarded by confirm + Undo.
**Sec:** SEC-BASE. **A11y:** Destructive; confirm required; keyboard-reachable.

**PRD-ED-078 · Auto-deselect after erase** — MUST · All · M1
**AC:** Completing an erase clears any active selection and restores the prior tool per user preference (or stays on eraser). Consistent with screens' undo/redo clearing selection (§7.9). Prevents accidental compound edits.
**Sec:** SEC-BASE. **A11y:** State change announced.

---

## 7. Lasso / selection

Selection is the gateway to editing existing ink — the biggest differentiator available to a note app (editable vector ink, `research/concepts-linea-paper-fresco.md` idea 3).

**PRD-ED-079 · Lasso select** — MUST · All · M2
**AC:** Draw a loop; select objects whose bbox centre falls inside (screens §7 tool table). Empty selection ⇒ toast "Circle some ink to select it" (screens §7.3). Show a dashed selection rect + the selection action bar. A rectangular/marquee select and tap-to-add/remove are SHOULD.
**Sec:** SEC-BASE. **A11y:** Provide "select all on page" and "select by type" menu commands as non-gesture alternatives; selection state announced ("N strokes selected").

**PRD-ED-080 · Move selection** — MUST · All · M2
**AC:** Drag the selection to translate it; live preview; commit pushes undo.
**Sec:** SEC-BASE. **A11y:** Arrow-key nudge moves selection by 1 unit (Shift = 10) for keyboard users.

**PRD-ED-081 · Resize selection** — MUST · All · M2
**AC:** Corner/edge handles scale the selection (Shift = uniform). Vector strokes rescale without quality loss; stroke widths scale proportionally unless "keep line weight" is set.
**Sec:** SEC-BASE. **A11y:** Numeric size entry (type-to-resize, Concepts, `research/concepts-linea-paper-fresco.md` idea 12) for exact scaling.

**PRD-ED-082 · Rotate selection** — MUST · All · M2
**AC:** Rotation handle rotates the selection; 15° magnetic detents with Shift/second-finger; haptic tick at detents.
**Sec:** SEC-BASE. **A11y:** Numeric angle entry.

**PRD-ED-083 · Recolour selection** — SHOULD · All · M2
**AC:** With a selection, picking an INK/HL colour recolours all selected strokes of the matching kind (recolour a whole highlighted passage at once) (editable-ink idea, `research/concepts-linea-paper-fresco.md` idea 3).
**Sec:** SEC-BASE. **A11y:** Announce "recoloured N strokes to <name>".

**PRD-ED-084 · Restyle selection (width / brush)** — SHOULD · All · M2
**AC:** Change width and even **pen type** of selected strokes after the fact (Concepts, `research/concepts-linea-paper-fresco.md` §1, idea 3) — e.g., bump every heading stroke thicker, or convert a scribble to the Fineliner.
**Sec:** SEC-BASE. **A11y:** All via labelled controls, not gesture-only.

**PRD-ED-085 · Copy / cut / paste / duplicate selection** — MUST · All · M2
**AC:** Standard clipboard ops on a selection; paste places at the pointer or offset. Cross-app **drag-out** exports a selection as a transparent PNG (Concepts, `research/concepts-linea-paper-fresco.md` idea 11) where the platform supports it.
**Sec:** SEC-BASE; clipboard content is note data — when copying to the **system** clipboard, sanitize and honour platform privacy (no silent background reads; on Web require user-gesture per Clipboard API rules). Pasted external HTML/SVG is sanitized (no scripts, no external refs). **A11y:** Ctrl/Cmd-C/X/V; announce actions.

**PRD-ED-086 · Convert selection to text** — SHOULD (Pro-gated) · All · M4
**AC:** Selection bar **Convert to text** (Pro; Free ⇒ Upgrade overlay) runs on-device handwriting recognition (`prd-02` §11, ML Kit Digital Ink / Vision) and replaces ink with an editable text block; toast "Handwriting converted to text" (screens §7.4). Low-confidence results surface a correction affordance (screens Open Q8 — this PRD requires an editable result + "undo conversion", not a canned string).
**Sec:** SEC-BASE; recognition runs on-device by default (screens §12 On-device recognition on). Any cloud assist is explicit per-request opt-in with a data-leaves-device indicator (decision 6). **A11y:** Converting handwriting to text makes it screen-reader-readable — a first-class a11y feature; keep the original ink recoverable via Undo.

**PRD-ED-087 · Recognise selection to shape/diagram** — SHOULD · All · M4
**AC:** Convert selected rough ink to clean vector geometry (circle/rect/arrow/line/table), see PRD-ED-091. Cross-references the shape engine.
**Sec:** SEC-BASE (on-device). **A11y:** Recognised shapes get semantic labels.

**PRD-ED-088 · Re-edit stroke geometry (Nudge / Slice)** — MAY · All · M3
**AC:** **Nudge** reshapes an existing stroke like a string (pull on the line, or push toward it); **Slice** is a vector eraser that cuts strokes, and with width 0 **splits** a stroke into two without deleting (Concepts, `research/concepts-linea-paper-fresco.md` §1, idea 4). Enables fixing a wobbly underline or separating run-together words non-destructively.
**Sec:** SEC-BASE. **A11y:** Advanced/optional; standard erase+redraw remains the accessible path.

**PRD-ED-089 · Non-destructive masks** — MAY · All · M3
**AC:** A mask-erase that hides ink while keeping it recoverable by editing the mask (Concepts Hard/Soft Mask, `research/concepts-linea-paper-fresco.md` idea 5) — accidental scrubs and highlighter mistakes stay reversible.
**Sec:** SEC-BASE. **A11y:** N/A (additive safety).

**PRD-ED-090 · Cross-page selection & move** — SHOULD · All · M3
**AC:** Selected content can be moved/copied to another page (drag to the rail thumbnail, or "Move to page…"). On freeform, selection moves freely across the endless board. Object ids are preserved on move within a notebook (CRDT).
**Sec:** SEC-BASE. **A11y:** "Move to page…" menu command as the non-drag alternative.

---

## 8. Shapes & rulers

**PRD-ED-091 · Hold-to-shape (dwell-to-perfect)** — MUST · All · M2
**AC:** Draw a rough shape and **keep the stylus/finger held** at the end; the stroke snaps to a clean line, arc, polyline, ellipse, triangle, rectangle, or polygon (Procreate QuickShape / Linea ZipShape / Concepts Draw&Hold — the single highest-leverage diagram feature, `research/procreate.md` §4, `research/concepts-linea-paper-fresco.md` §cross-app). Dwell time is configurable. A second finger while holding constrains to the "perfect" form (square/circle/equilateral). After release, an **Edit Shape** affordance exposes draggable nodes. The same dwell turns a freehand stroke into a straight ruled **line** (QuickLine) — one motor habit, two outcomes.
**Sec:** SEC-BASE; recognition on-device. **A11y:** Configurable dwell (longer for tremor); the explicit **Shape tool** (PRD-ED-093) is the non-dwell alternative; snapped shapes get semantic labels.

**PRD-ED-092 · Snapping & guides** — SHOULD · All · M3
**AC:** While drawing/moving, snap to: other stroke endpoints/key points, grid/template lines, and 0/45/90° angles, with visible snap indicators and a haptic/`UICanvasFeedbackGenerator` alignment tick (`research/apple-pencil-ipados-capabilities.md` §1). Snapping is toggleable.
**Sec:** SEC-BASE. **A11y:** Snap gives precise alignment without fine motor control; provide a toggle for users who find snapping disruptive.

**PRD-ED-093 · Shape tool (explicit)** — MUST · All · M2
**AC:** Explicit shape tool draws rectangle, ellipse/circle, line, triangle, and polygon by dragging p0→p1 (screens' current shape tool is rectangle-only — this PRD requires the fuller set; screens Open Q9). Hold Shift/second finger for constrained (square/circle). Shapes are editable vector objects (Shape object, decision 4).
**Sec:** SEC-BASE. **A11y:** Shape picker labelled; sizes numerically entered.

**PRD-ED-094 · Arrows & lines** — MUST · All · M2
**AC:** Line tool with optional arrowheads (none/end/both), adjustable head style; part of the shape set. Draw-and-hold on a freehand also yields an arrow when the gesture starts/ends like one (Paper Diagram, `research/concepts-linea-paper-fresco.md` §3).
**Sec:** SEC-BASE. **A11y:** Arrow direction conveyed in the object label.

**PRD-ED-095 · Connectors** — SHOULD · All · M3
**AC:** A connector attaches its endpoints to two objects/anchor points and stays attached when either moves (flowcharts/mind maps; Paper Diagram "connectors", `research/concepts-linea-paper-fresco.md` §3). Straight, elbow, and curved styles.
**Sec:** SEC-BASE. **A11y:** Connector relationships exposed in the accessibility tree ("connects A to B").

**PRD-ED-096 · Polygons & polylines** — SHOULD · All · M3
**AC:** Multi-segment polylines and closed polygons via tap-to-add-vertex or hold-to-perfect a many-sided shape; editable nodes.
**Sec:** SEC-BASE. **A11y:** Node editing has numeric coordinate entry.

**PRD-ED-097 · Fill / shade regions** — MAY · All · M3
**AC:** Flood-fill an enclosed hand-drawn region with a threshold control, filling on a layer beneath the ink (Procreate ColorDrop + Reference layer / Linea Fill respecting templates, `research/procreate.md` §5, `research/concepts-linea-paper-fresco.md` §2). See PRD-ED-020 for template-bounded fill.
**Sec:** SEC-BASE. **A11y:** Fill previews target region with an outline; threshold numeric.

**PRD-ED-098 · Ruler / straightedge** — MUST · All · M2
**AC:** A movable, rotatable on-screen ruler; ink drawn along it snaps to the ruled line (PRD-ED-034). Two-finger rotate; drag to reposition. Doubles as a table/grid drawing aid (draw-hold axis-locked lines, `research/procreate.md` idea).
**Sec:** SEC-BASE. **A11y:** Ruler angle/position settable numerically; keyboard nudge.

**PRD-ED-099 · Protractor / angle tool** — SHOULD · All · M3
**AC:** A protractor overlay for measuring/constraining angles with numeric angle entry and detents; useful for geometry/physics notes (the persona is a Physics student, screens §0.persona).
**Sec:** SEC-BASE. **A11y:** Numeric angle readout and entry.

**PRD-ED-100 · Grids & drawing guides (freeform)** — MAY · All · M3
**AC:** Optional isometric/perspective/graph guides on freeform pages as a reorderable guide layer with adjustable spacing/rotation and 45° snap targets (Concepts grids, `research/concepts-linea-paper-fresco.md` §1). Distinct from paper templates (PRD-ED-004).
**Sec:** SEC-BASE. **A11y:** Guides are visual aids; provide contrast and a hide toggle.

**PRD-ED-101 · Measure / dimension readout** — MAY · All · M3
**AC:** Live measurement of a drawn shape/selection with a status field showing dimensions/zoom/rotation and type-to-resize (Concepts Measure, `research/concepts-linea-paper-fresco.md` §1, idea 12).
**Sec:** SEC-BASE. **A11y:** Numeric readout is inherently screen-reader-friendly.

**PRD-ED-102 · Haptic feedback on snap/shape-complete** — SHOULD · iPad(Pencil Pro)·ADp/ADt(supported) · M5
**AC:** Fire a spatial haptic when a shape is recognised/closed or an alignment snap occurs: `UICanvasFeedbackGenerator.pathCompleted/alignmentOccurred` (Apple, `research/apple-pencil-ipados-capabilities.md` §1) / Android haptics. System routes to Apple Pencil Pro where present.
**Sec:** SEC-BASE. **A11y:** Haptic is an additional non-visual confirmation (helps low-vision users); never the only signal — also show a visual confirm. Respect system haptics-off.

---

## 9. Text tool

Typed text is a first-class object alongside ink (Text block via sequence CRDT, decision 4; screens §7.5 text-edit bar). Note the Flutter-Web caveat: painted text needs extra work for IME/Scribble/selection/a11y (`research/web-stylus-and-pwa-capabilities.md` Flutter-vs-React section) — the text layer MUST use a real editable input path on Web, not a painted-only field.

**PRD-ED-103 · Insert & edit text box** — MUST · All · M2
**AC:** Tap with the Text tool drops a text box and enters inline edit (`editing`), showing the text-edit bar; empty boxes are discarded on Done, and the tool snaps back to pen (screens §7.5, §17 Text box `{x,y,text,size,weight,font,color,italic}`). Text box is movable/resizable like any object.
**Sec:** SEC-BASE. **A11y:** Native text input path gives IME, dictation, Scribble (iPadOS), selection and screen-reader editing "for free" on native platforms; on Web use a real `contenteditable`/input overlay, never painted-only.

**PRD-ED-104 · Rich text formatting** — MUST · All · M2
**AC:** Bold, italic, underline, strikethrough, size, colour (ink token or hex), highlight, and paragraph alignment. Rich text uses Peritext/Yjs-style sequence-CRDT semantics in Dart (decision 4) so concurrent edits merge.
**Sec:** SEC-BASE. **A11y:** Formatting exposed as accessible text attributes; keyboard shortcuts (Cmd/Ctrl-B/I/U).

**PRD-ED-105 · Fonts** — SHOULD · All · M2
**AC:** A curated font set (bundled, licensed) with size scale; the design fonts live in `tokens.json.fonts`. Fonts are per-text-run. Default body follows the active look's `fb` font.
**Sec:** SEC-BASE; only bundled/licensed fonts, no remote font fetch that could leak reading activity. **A11y:** Honour Dynamic Type minimums; never below a legible floor; provide a "readable font" option.

**PRD-ED-106 · Lists** — MUST · All · M2
**AC:** Bulleted, numbered, and nested lists with indent/outdent.
**Sec:** SEC-BASE. **A11y:** Lists expose semantic list structure to screen readers.

**PRD-ED-107 · Checkboxes / to-do** — MUST · All · M2
**AC:** Checklist items with tappable checkboxes; checked state stored per item (LWW). Useful for study task lists.
**Sec:** SEC-BASE. **A11y:** Checkbox exposes checked/unchecked role+state; toggle by keyboard.

**PRD-ED-108 · Links & backlinks** — SHOULD · All · M3
**AC:** Inline links to URLs and to other notebooks/pages (Link/backlink object, decision 4). Backlinks are bidirectional references surfaced in a page's "linked from" list.
**Sec:** SEC-BASE; **sanitize URLs** — only allow safe schemes (https, mailto, and internal `sane://`); never `javascript:`/`data:` executable links; confirm before opening external links. **A11y:** Links have descriptive accessible names (not "click here").

**PRD-ED-109 · Tables** — SHOULD · All · M3
**AC:** Insert/edit tables (add/remove rows/cols, cell text, basic borders) as a Table object (decision 4). Hand-drawn table recognition (rough grid → clean table) is a MAY via the shape engine.
**Sec:** SEC-BASE. **A11y:** Tables expose row/column headers and cell semantics.

**PRD-ED-110 · Scribble / write-to-text into text fields** — SHOULD · iPad·iOS·ADt·ADp · M3
**AC:** In text boxes, support system handwriting-to-text: iPadOS **Scribble** (`UIScribbleInteraction`, automatic in text inputs), Android 14+ stylus handwriting in `EditText`/Compose fields (`research/apple-pencil-ipados-capabilities.md` §5, `research/android-stylus-capabilities.md` §3). Because a drawing surface overlays text, gate Scribble/handwriting to actual text-edit mode (`setAutoHandwritingEnabled(false)` on the canvas) to avoid conflicts.
**Sec:** SEC-BASE; recognition is OS-level on-device. **A11y:** Handwriting entry is optional; keyboard/dictation always available.

**PRD-ED-111 · Text ↔ ink coexistence** — MUST · All · M2
**AC:** Text boxes and ink share the page; ink can be written over/around text, and text boxes reflow without disturbing anchored ink. Z-order is editable. On export, text remains selectable in PDF where possible.
**Sec:** SEC-BASE. **A11y:** Reading order for mixed content is defined (top-to-bottom, then z-order) and exposed to screen readers.

**PRD-ED-112 · Math typesetting from recognition** — MAY · All · M4
**AC:** Recognised math (from ink, `prd-02` §11.4) can render as typeset math in a text/latex block; "Solve math" writes a worked solution (screens §7.4, Pro-gated). This PRD requires the render target + correction affordance, not the solve engine.
**Sec:** SEC-BASE (on-device recognition default). **A11y:** Provide a text/MathML representation for screen readers, not an image.

---

## 10. Images, stickers & elements

**PRD-ED-113 · Insert image** — MUST · All · M2
**AC:** Insert a photo/figure from Files/Photos/camera/paste as an Image object with position, scale, rotation, crop (screens' Image tool currently routes to PDF import — this PRD requires a distinct image flow with sizing/cropping/placement; screens Open Q10). Images render on the page beneath or above ink per z-order.
**Sec:** SEC-BASE; **strip location/EXIF metadata by default** on inserted photos (privacy) with an opt-in to keep it; images stored as content-addressed encrypted blobs (decision 3). Camera/Photos access is user-initiated and permission-gated. **A11y:** Prompt for/generate alt text (on-device image description where available, `research/android-stylus-capabilities.md` §4) so inserted images are described to screen readers.

**PRD-ED-114 · Crop & mask image** — SHOULD · All · M2
**AC:** Rectangular and freeform crop/mask of inserted images, non-destructive.
**Sec:** SEC-BASE. **A11y:** Crop handles keyboard-operable; numeric.

**PRD-ED-115 · Multi-image / collage** — MAY · All · M3
**AC:** Drop several photos onto a page and arrange without heavy layer management (Paper collage, `research/concepts-linea-paper-fresco.md` §3).
**Sec:** SEC-BASE (EXIF strip per PRD-ED-113). **A11y:** Each image individually labelled.

**PRD-ED-116 · Stickers** — SHOULD · All · M3
**AC:** A library of first-party stickers (incl. the Sane Sage mascot set, design-system §1 — the mascot is a fixed-colour trademark, never recolour/stretch/flip) placeable and scalable as objects. User custom stickers from cropped images (a MAY).
**Sec:** SEC-BASE; bundled sticker assets only; user stickers follow image rules. **A11y:** Stickers carry names/alt text.

**PRD-ED-117 · Elements (shapes/graphics library)** — MAY · All · M3
**AC:** A library of reusable graphic elements (arrows, callouts, frames, common physics/chem symbols for the persona) inserted as editable vector objects.
**Sec:** SEC-BASE. **A11y:** Named; vector so scalable without blur.

**PRD-ED-118 · Canvas clips / snippet clipboard** — MAY · All · M3
**AC:** Save a portion of a page to a visual clipboard for reuse across pages/notebooks (Paper canvas clips, `research/concepts-linea-paper-fresco.md` §3).
**Sec:** SEC-BASE; clips stored locally/encrypted. **A11y:** Clips labelled.

**PRD-ED-119 · Paste image from clipboard** — SHOULD · All · M2
**AC:** Paste an image from the system clipboard onto the page (Async Clipboard on Web requires user gesture + Promise value on Safari, `research/web-stylus-and-pwa-capabilities.md` §6).
**Sec:** SEC-BASE; pasted images EXIF-stripped; clipboard read only on explicit paste. **A11y:** Prompt for alt text.

**PRD-ED-120 · Insert from scan (camera document)** — SHOULD · iPad·iOS·ADt·ADp · M3
**AC:** Scan a page with the camera (auto-crop & straighten, screens §9 import sources) and insert as an image or OCR'd page; structured document scan uses Vision `RecognizeDocumentsRequest` / ML Kit where available (`research/apple-pencil-ipados-capabilities.md` §6).
**Sec:** SEC-BASE; scan + OCR on-device (screens §12 on-device recognition). **A11y:** OCR text makes the scan searchable and screen-reader-readable.

---

## 11. Layers

Layers are part of the document model (decision 4). Notes need a lightweight layer model, not Procreate's full stack (`research/procreate.md` §6 takeaway: ink layer vs highlight layer).

**PRD-ED-121 · Layer model** — SHOULD · All · M3
**AC:** Each page has ≥1 layer; objects belong to a layer. Minimum: a highlight layer (always behind ink, PRD-ED-069), an ink layer, and user-addable layers. Per-layer visibility, lock, opacity, reorder, merge (Linea simplified layers, `research/concepts-linea-paper-fresco.md` §2).
**Sec:** SEC-BASE. **A11y:** Layer panel is a labelled list; visibility/lock are toggles with state; reorder has non-drag alternative.

**PRD-ED-122 · Layer visibility & lock** — SHOULD · All · M3
**AC:** Toggle visibility (double-tap icon) and lock (locked layers excluded from selection/erase/merge).
**Sec:** SEC-BASE. **A11y:** State exposed; keyboard-operable.

**PRD-ED-123 · Layer opacity** — MAY · All · M3
**AC:** Per-layer opacity 0–100%.
**Sec:** SEC-BASE. **A11y:** Numeric readout.

**PRD-ED-124 · Layer reorder & merge** — SHOULD · All · M3
**AC:** Drag to reorder; merge two layers (pinch-together, `research/procreate.md` §6) or menu-merge.
**Sec:** SEC-BASE. **A11y:** Non-drag menu alternatives (move up/down, merge down).

**PRD-ED-125 · Auto-layering by tool** — MAY · All · M3
**AC:** Optionally route each brush to a default layer (highlighter→highlight layer; a given pen→a named layer) (Concepts, `research/concepts-linea-paper-fresco.md` §1).
**Sec:** SEC-BASE. **A11y:** N/A.

**PRD-ED-126 · Layer/complexity budget** — SHOULD · All · M3
**AC:** Honour a device/page-size-tied complexity budget rather than pretending layers/objects are unlimited (Procreate hardware-honest model, `research/procreate.md` §9). Warn before a page exceeds the memory budget (decision 7: <300 MB on 4 GB Android). Virtualize off-screen layers.
**Sec:** SEC-BASE. **A11y:** Warning is text + non-colour.

---

## 12. Undo / redo

**PRD-ED-127 · Undo / redo stacks** — MUST · All · M1
**AC:** Per-page undo/redo stacks, **max 60 snapshots** of a page's strokes (screens §7.9). `commit` pushes to undo and clears redo; eraser captures its snapshot on pointer-down; undo/redo restore the affected page and clear the current selection (screens §7.9). Toolbar Undo/Redo dim to 0.35 opacity when their stack is empty (screens §7.1).
**Sec:** SEC-BASE; undo history is local, in-memory/session, never synced as content. **A11y:** Undo/Redo have keyboard shortcuts (Cmd/Ctrl-Z / Shift-Cmd/Ctrl-Z) and announce what was undone where feasible.

**PRD-ED-128 · Undo model beyond snapshots (op-based)** — SHOULD · All · M2
**AC:** For memory and correctness, evolve from whole-page snapshots to an **operation log** (add/remove/transform object) so undo is O(1) per op and interoperates with the CRDT op-log (decision 3/4). Keep the 60-step user-visible depth minimum; internal history may be deeper.
**Sec:** SEC-BASE. **A11y:** N/A.

**PRD-ED-129 · Gesture undo/redo** — MUST · All · M1
**AC:** Two-finger tap = undo, three-finger tap = redo (de-facto standard across Procreate/Concepts/Linea/Fresco, `research/procreate.md` §7, `research/concepts-linea-paper-fresco.md` cross-app). Two-finger tap-and-hold = rapid repeat undo.
**Sec:** SEC-BASE. **A11y:** Gesture is in addition to buttons+shortcuts, never the only path; count of fingers configurable for motor accessibility.

**PRD-ED-130 · Scrubbable undo timeline** — MAY · All · M5
**AC:** An optional two-finger circular "rewind" scrub to undo/redo progressively (Paper Rewind, `research/concepts-linea-paper-fresco.md` §3) or a visible history slider.
**Sec:** SEC-BASE. **A11y:** Optional; buttons remain primary.

---

## 13. Viewport tools: zoom window, laser, presentation, focus

**PRD-ED-131 · Focus mode** — MUST · All · M1
**AC:** `toggleFocus` hides toolbar, all bars, and the rail — just the page; a floating **"Exit focus"** pill (top-right) returns (screens §7.8). State per session.
**Sec:** SEC-BASE. **A11y:** Exit-focus pill is reachable by keyboard/screen reader; entering focus announces how to exit.

**PRD-ED-132 · Zoom window (write-small, place-precise)** — SHOULD · All · M3
**AC:** A magnified "zoom box": the user writes at a comfortable size in a floating zoomed region while ink lands small and precise on the page (the classic notes "write big, place small" tool). Advance-region control moves the write zone across the line.
**Sec:** SEC-BASE. **A11y:** Zoom window aids low-vision writing; provide adjustable magnification and a keyboard advance.

**PRD-ED-133 · Fit / recenter** — MUST · All · M1
**AC:** A one-tap "fit page to viewport" (paged) / "fit all content" (freeform) — quick-pinch or a button (Linea recenter, `research/concepts-linea-paper-fresco.md` §2).
**Sec:** SEC-BASE. **A11y:** Keyboard shortcut + button; essential for freeform orientation.

**PRD-ED-134 · Laser pointer** — SHOULD · All · M4
**AC:** A presentation laser: strokes render as a temporary glowing trail that fades after ~1–2 s and are not committed to the page (for teaching/presenting). Colour/size configurable.
**Sec:** SEC-BASE; laser strokes never persist and never sync. **A11y:** Laser is presenter-facing; the persistent ink tools remain for durable annotation. Respect Reduce Motion (shorter/no glow animation).

**PRD-ED-135 · Presentation mode** — SHOULD · iPad·ADt·Web(desktop) · M4
**AC:** Output the canvas to an external display / AirPlay / projector with **no UI chrome** (Linea/Fresco presentation, `research/concepts-linea-paper-fresco.md` §2, §4). Presenter keeps tools on the device; audience sees only the page + laser/ink. Support external display (Stage Manager on M-iPads, `research/apple-pencil-ipados-capabilities.md` §11).
**Sec:** SEC-BASE; presenting shows only the intended notebook — no library/thumbnails/notifications leak to the external screen. **A11y:** Presenter view retains full accessible chrome even when the audience view is chrome-free.

**PRD-ED-136 · Full-screen / hide-UI toggle** — SHOULD · All · M2
**AC:** Four-finger tap (Procreate, `research/procreate.md` §7) or a button toggles all chrome, distinct from Focus mode's persistent pill.
**Sec:** SEC-BASE. **A11y:** Provide a visible re-show affordance and keyboard toggle.

**PRD-ED-137 · Reading/annotation mode** — MAY · All · M3
**AC:** A mode that locks ink (prevents accidental marks) for reading/scrolling a PDF, toggled quickly.
**Sec:** SEC-BASE. **A11y:** Clearly indicated locked state.

**PRD-ED-138 · Session time-lapse replay** — MAY · All · M5
**AC:** Optionally record a page's construction and replay it (Procreate time-lapse, `research/procreate.md` §9) — "watch how this note was built" for study/teaching.
**Sec:** SEC-BASE; recording stored locally/encrypted, opt-in, never auto-uploaded. **A11y:** Replay has play/pause/scrub and a Reduce-Motion-respecting speed.

**PRD-ED-139 · Multi-window / additive windows** — SHOULD · iPad(iPadOS 26)·ADt·Web · M3
**AC:** Open a notebook/page in a new window (additive windowing, `research/apple-pencil-ipados-capabilities.md` §11) for side-by-side reference; support split view / two-pane on large screens (Android window size classes, `research/android-stylus-capabilities.md` §8). Windows carry descriptive names.
**Sec:** SEC-BASE. **A11y:** Each window independently navigable; window titles descriptive.

**PRD-ED-140 · Adaptive layout across window classes** — MUST · All · M1
**AC:** The editor adapts from phone (~400 px, `narrow` collapses rail/sidebar, dock compacts) to tablet/desktop/foldable per window size classes; foldable postures shift compact↔expanded instantly (`research/android-stylus-capabilities.md` §8). `narrow` (<900 px) hides desktop-only affordances (page rail, subjects) per screens §0.
**Sec:** SEC-BASE. **A11y:** Layout changes preserve focus and reading order; no horizontal body scroll at phone width.

---

## 14. Palette dock

The dock is the floating toolbar (screens §7.3, §7.6): tools, colours, widths, page nav, brush favourites, and the drag-to-dock grip.

**PRD-ED-141 · Tool set** — MUST · All · M1
**AC:** `tool ∈ {pen, hl, eraser, lasso, shape, text, image}` (screens §7.3) selectable from the dock. The active tool is visually indicated and announced. Pen tool uses the active brush (favourites bar, PRD-ED-063).
**Sec:** SEC-BASE. **A11y:** Each tool is a labelled toggle button; active state not colour-only.

**PRD-ED-142 · Drag-to-dock (4 edges)** — MUST · All · M1
**AC:** The 6-dot grip (`gripDown`) drags the whole toolbar; while dragging, four edge drop-zones light up and the nearest edge (`dockHint`) is chosen on release → `dock ∈ {bottom, top, left, right}`. Bottom (default)/top lay it horizontal-centred; left/right lay it vertical (screens §7.3). Also settable in Settings → Handwriting & stylus → Toolbar position (screens §12).
**Sec:** SEC-BASE; dock position persists per profile locally. **A11y:** Provide the Settings segmented control as the non-drag alternative; drop zones announced.

**PRD-ED-143 · Colour & width sub-pickers** — MUST · All · M1
**AC:** The dock exposes the INK/HL swatch row (PRD-ED-036/038) and the 3-width picker (PRD-ED-042), context-switching to HL when the highlighter is active (screens §7.3).
**Sec:** SEC-BASE. **A11y:** Sub-pickers keyboard-navigable; selected state has ring+label.

**PRD-ED-144 · Favourites bar in dock** — MUST · All · M2
**AC:** Pinned brushes appear in the dock for one-tap brush switching (PRD-ED-063).
**Sec:** SEC-BASE. **A11y:** Labelled; reorder non-drag alternative.

**PRD-ED-145 · Page nav in dock** — MUST · All · M1
**AC:** `‹ X / N ›` prev/next lives in the dock (screens §7.3), clamped.
**Sec:** SEC-BASE. **A11y:** Announces "Page X of N".

**PRD-ED-146 · Collapsible / resizable dock** — SHOULD · All · M2
**AC:** Dock collapses to a slim bar and can be pinch-resized; swipe-to-compact progressive disclosure for a chrome-light surface (Concepts tool wheel, `research/concepts-linea-paper-fresco.md` §1, idea 9–10).
**Sec:** SEC-BASE. **A11y:** Collapsed dock still exposes all tools via an expander; state announced.

**PRD-ED-147 · QuickMenu (radial)** — MAY · All · M5
**AC:** A radial QuickMenu of the ~6 most-used actions (new page, highlighter, eraser, lasso, undo, insert), summonable by Pencil double-tap/squeeze or a touch shortcut, and **customisable** with profiles (Procreate QuickMenu, `research/procreate.md` §7, idea).
**Sec:** SEC-BASE. **A11y:** Radial has a linear/list fallback for screen readers; items labelled.

**PRD-ED-148 · Touch Shortcut (software modifier)** — MAY · All · M5
**AC:** A floating on-canvas button with Primary/Secondary presses mapped to modifiers — e.g. hold to temporarily switch the current pen to eraser, or to constrain/snap (Fresco Touch Shortcut, `research/concepts-linea-paper-fresco.md` idea 2). A hardware-free "hold Shift" for stylus-only users.
**Sec:** SEC-BASE. **A11y:** Its actions are also available as discrete buttons/shortcuts; position adjustable for handedness/reach.

---

## 15. Keyboard shortcuts

Large-screen and Web users expect full keyboard control (`research/android-stylus-capabilities.md` §8; `research/web-stylus-and-pwa-capabilities.md`).

**PRD-ED-149 · Core editor shortcuts** — MUST · iPad·ADt·Web(desktop) · M2
**AC:** Implement at minimum: Undo `Cmd/Ctrl-Z`, Redo `Shift-Cmd/Ctrl-Z` (or `Ctrl-Y`), Copy/Cut/Paste `Cmd/Ctrl-C/X/V`, Select-all `Cmd/Ctrl-A`, Delete selection `Del/Backspace`, Save/checkpoint `Cmd/Ctrl-S` (local checkpoint), Zoom `Cmd/Ctrl +/−/0`, Next/Prev page `PageDown/PageUp`, Search `Cmd/Ctrl-K` (screens ⌘K), text B/I/U `Cmd/Ctrl-B/I/U`.
**Sec:** SEC-BASE; `Cmd/Ctrl-S` is a local checkpoint, not a cloud action. **A11y:** Shortcuts are discoverable via a shortcuts cheatsheet (hold `Cmd`/menu) and never the only way to do an action.

**PRD-ED-150 · Tool-switch shortcuts** — SHOULD · iPad·ADt·Web(desktop) · M2
**AC:** Single-key tool switches (e.g. `P` pen, `H` highlighter, `E` eraser, `L` lasso, `S` shape, `T` text, `Space` pan, `R` rotate view) — configurable.
**Sec:** SEC-BASE. **A11y:** Remappable to avoid conflicts with assistive tech.

**PRD-ED-151 · Bracket size / number colour** — MAY · iPad·ADt·Web(desktop) · M2
**AC:** `[`/`]` decrease/increase brush size; number keys pick palette swatches.
**Sec:** SEC-BASE. **A11y:** Alternatives exist in the dock.

**PRD-ED-152 · Shortcut discoverability** — SHOULD · iPad·ADt·Web(desktop) · M2
**AC:** A shortcuts overlay (menu bar on iPadOS 26 / `?` on Web) lists all bindings.
**Sec:** SEC-BASE. **A11y:** Overlay is screen-reader-readable and dismissible by keyboard.

---

## 16. Stylus gestures

**PRD-ED-153 · Double-tap (Pencil / S Pen)** — MUST · iPad(Pencil 2/Pro)·iOS·ADt/ADp(S Pen) · M1
**AC:** Honour the Settings **Double-tap the pencil** action: **Eraser** (default) / **Previous tool** / **Colors** (screens §12), delivered via `UIPencilInteraction`/`preferredTapAction` (Apple) and S Pen button/`MotionEvent` (Samsung). Users can extend targets (eyedropper, QuickMenu) in M5.
**Sec:** SEC-BASE. **A11y:** All double-tap actions have dock equivalents; feature is additive.

**PRD-ED-154 · Squeeze (Apple Pencil Pro)** — SHOULD · iPad(Pencil Pro) · M5
**AC:** Handle `.onPencilSqueeze`/`didReceiveSqueeze:` with a `phase` and `hoverPose`; default action = show the contextual palette / QuickMenu at the hover point (`research/apple-pencil-ipados-capabilities.md` §1). Respect `preferredSqueezeAction` — when set to a system shortcut, the app does not receive the squeeze.
**Sec:** SEC-BASE. **A11y:** Squeeze targets also reachable without the Pro hardware.

**PRD-ED-155 · Barrel roll (Apple Pencil Pro / capable USI)** — SHOULD · iPad(Pencil Pro) · M5
**AC:** Use `rollAngle` (reconciled via estimated-property updates) to rotate chisel/calligraphy nibs and drive `inputStyle=azimuth+roll` brushes (PRD-ED-023, `research/apple-pencil-ipados-capabilities.md` §1,3).
**Sec:** SEC-BASE. **A11y:** Non-roll fallback (azimuth or fixed nib) always available.

**PRD-ED-156 · Hover actions** — SHOULD · iPad(M-series+Pencil 2/Pro)·ADt/ADp(hover-capable)·Web(Safari 16.1+) · M5
**AC:** Hover shows the brush cursor (PRD-ED-033); hover pinch/slide MAY adjust size/opacity (Procreate, `research/procreate.md` §7).
**Sec:** SEC-BASE. **A11y:** Additive; dock shows brush state without hover.

**PRD-ED-157 · S Pen air actions** — MAY · ADt/ADp(Samsung BLE S Pen) · M5
**AC:** Map the single allowed remote action (Samsung constraint: one RemoteAction per app, `research/android-stylus-capabilities.md` §9) to a high-value editor action (e.g. "next page" or "start recording"); air gestures (up/down/left/right/circle) to page turns where the pen supports gyro. Configure via `remote_action.xml`; classes `SpenRemote`/`SpenUnitManager`/`ButtonEvent`/`AirMotionEvent`.
**Sec:** SEC-BASE; BLE pairing is user-initiated. **A11y:** Air actions are supplementary; all mapped actions exist in-app.

**PRD-ED-158 · Stylus barrel-button** — SHOULD · ADt/ADp(S Pen/USI)·iPad(n/a) · M2
**AC:** Read `MotionEvent.getButtonState()` (`BUTTON_STYLUS_PRIMARY/SECONDARY`) and `TOOL_TYPE_ERASER` (pen inverted) to trigger erase/secondary actions (`research/android-stylus-capabilities.md` §2). Inverting many S Pens/USI pens erases.
**Sec:** SEC-BASE. **A11y:** Button actions duplicated in the dock.

**PRD-ED-159 · Estimated-property reconciliation** — MUST · iPad·iOS·ADt·ADp · M1
**AC:** Where pressure/roll arrive first as estimates and are corrected over BLE, implement `touchesEstimatedPropertiesUpdated(_:)` (Apple) and Android equivalents so committed strokes use the corrected values (`research/apple-pencil-ipados-capabilities.md` §3). Correlate via `estimationUpdateIndex`.
**Sec:** SEC-BASE. **A11y:** N/A (fidelity).

**PRD-ED-160 · Gesture customisation** — SHOULD · All · M5
**AC:** A Gesture Controls settings surface lets power users remap double-tap/squeeze/finger-role/QuickMenu/Touch-Shortcut (Procreate/Linea/Fresco, `research/procreate.md` §7,9). Finger-role while stylus active: pan / erase / smudge / select / nothing (Linea Touch Eraser, `research/concepts-linea-paper-fresco.md` idea 7).
**Sec:** SEC-BASE; settings local per profile. **A11y:** Defaults are documented; remapping cannot remove the button/keyboard equivalents.

---

## 17. Touch gestures

**PRD-ED-166 · Pinch zoom + twist rotate** — MUST · All · M1
**AC:** Pinch zooms, pinch+twist rotates, quick-pinch fits (PRD-ED-008/009/133; Procreate, `research/procreate.md` §7).
**Sec:** SEC-BASE. **A11y:** Provide button/keyboard zoom+fit for users who cannot pinch; single-touch gesture companion (PRD-ED-171).

**PRD-ED-167 · Two-finger pan** — MUST · All · M1
**AC:** Two-finger drag pans (PRD-ED-007); with palm rejection on and a stylus active, single-finger also pans.
**Sec:** SEC-BASE. **A11y:** Keyboard pan alternative.

**PRD-ED-168 · Two/three-finger undo/redo** — MUST · All · M1
**AC:** Two-finger tap = undo, three-finger tap = redo (PRD-ED-129).
**Sec:** SEC-BASE. **A11y:** Buttons+shortcuts equivalent.

**PRD-ED-169 · Three-finger swipe (copy/paste / clear)** — MAY · All · M5
**AC:** Three-finger swipe down = copy/paste menu; three-finger scrub = clear layer (Procreate, `research/procreate.md` §7). Guard clear with confirm/undo.
**Sec:** SEC-BASE. **A11y:** Menu equivalents; destructive guarded.

**PRD-ED-170 · Second-finger transient select** — MAY · All · M3
**AC:** While a pen writes, a second-finger tap-and-hold momentarily enters lasso/select, then drops back to the pen (Concepts, `research/concepts-linea-paper-fresco.md` idea 5).
**Sec:** SEC-BASE. **A11y:** Explicit lasso tool remains primary.

**PRD-ED-171 · Single-touch gesture companion (motor accessibility)** — SHOULD · All · M4
**AC:** A mode to perform undo/redo/zoom/pan with single-finger gestures for users who cannot do multi-finger gestures (Procreate accessibility, `research/procreate.md` §10).
**Sec:** SEC-BASE. **A11y:** THIS is the a11y requirement — satisfies WCAG 2.5.1 (pointer gestures) by giving single-pointer alternatives to all multi-finger gestures.

**PRD-ED-172 · touch-action & gesture isolation (Web)** — MUST · Web · M1
**AC:** Set `touch-action:none` on the canvas so every pointer is captured; use `setPointerCapture` so a stroke keeps events off-canvas; keep chrome at `touch-action:manipulation` (`research/web-stylus-and-pwa-capabilities.md` §1). Because `touch-action:none` can block user zoom (WCAG 1.4.4), scope it to the canvas only and provide in-app zoom.
**Sec:** SEC-BASE; secure-context (HTTPS) required for coalesced/predicted events. **A11y:** In-app zoom compensates for blocked browser zoom; chrome remains pinch/zoomable.

---

## 18. Cross-cutting acceptance & performance

**PRD-ED-173 · Latency budgets (CI-enforced)** — MUST · All · M0+
**AC:** Meet decision 7: pen-down→pixel ≤16 ms ProMotion iPad / ≤25 ms mid Android / ≤30 ms Chrome desktop; steady ≥60 fps (120 where display allows); no frame >16.7 ms while writing. Enforced by the perf harness (`tools/`) and a device lab; regressions fail CI.
**Sec:** SEC-BASE. **A11y:** Low latency benefits all; never traded away for animation.

**PRD-ED-174 · Cold start & large-doc budgets** — MUST · All · M1+
**AC:** Editor cold start < 1.5 s iPad / < 2 s mid Android / < 3 s cached PWA; open a 1,000-page notebook < 1 s; scroll a 600-page PDF at 60 fps; memory < 300 MB on a 4 GB Android; 2-hour writing session ≤ 12% battery on iPad Pro (decision 7). Achieved via page/layer virtualization and delta-loaded segments.
**Sec:** SEC-BASE. **A11y:** N/A.

**PRD-ED-175 · Data-loss safety / autosave** — MUST · All · M1
**AC:** Ink is committed to the local op-log within one frame of stroke-end; no user action can lose > the last in-flight stroke on crash/kill. Autosave/checkpoint continuously; safe-save (write-temp-then-swap) for the `.sanenote` bundle.
**Sec:** SEC-BASE; at-rest encryption via platform Keystore/Keychain-wrapped keys (decision 3); on Apple use `FileProtectionType.complete` default (`research/apple-pencil-ipados-capabilities.md` §10). **A11y:** Never surprise-lose a user's work; announce recovery on relaunch.

**PRD-ED-176 · Open, documented file format** — MUST · All · M1+
**AC:** Pages/objects serialize to the `.sanenote` bundle (manifest + segments + blobs), exportable to PDF/PNG/SVG/Markdown/JSON (decision 4; screens §10 export). The format is versioned and documented.
**Sec:** SEC-BASE; the importer is a hardened parser (bounds/alloc caps; reject malformed) — the format is a trust boundary. **A11y:** Exports preserve text and alt-text where the target format allows (tagged PDF).

**PRD-ED-177 · Guest-mode parity** — MUST · All · M1
**AC:** The entire editor works with no account (guest mode is first-class, decision 5) — note-taking never requires sign-in. Identity gates only sharing/collab/entitlements.
**Sec:** SEC-BASE; guest data is local and encrypted like any note. **A11y:** No auth wall between the user and writing.

**PRD-ED-178 · Reference-device coverage** — MUST · All · M0+
**AC:** All ink/latency requirements are validated on the reference matrix incl. the low-end Android (4 GB / Snapdragon 680-class), a ProMotion iPad, and Chrome desktop Web (decision 7). Foldable postures and large-screen window classes are in the matrix.
**Sec:** SEC-BASE. **A11y:** Test matrix includes VoiceOver/TalkBack passes on the editor chrome.

---

## 19. Open questions (for the maintainer)

These extend the design Open Questions (screens §Open) with editor-engine specifics:

1. **Pure-Flutter vs native ink surface** — resolved by the M0 `SN-INK` spike; ADR-0001 must record the per-platform decision and the exit criterion (decision 1 risk gate).
2. **Highlighter width** — design fixes 22 units; do we allow a second (thin) highlighter width, or keep strictly one? (screens §7.3 says fixed.)
3. **Shape tool scope** — screens ships rectangle-only; this PRD assumes the fuller set (ellipse/line/triangle/polygon/arrow) + recognition. Confirm the M2 shipping subset (screens Open Q9).
4. **Image insertion flow** — screens routes Image → PDF import; this PRD defines a distinct image flow (crop/place/EXIF-strip). Confirm (screens Open Q10).
5. **Page reorder/delete/duplicate** — not in the mock; this PRD requires them. Confirm rail interactions (drag vs menu) (screens Open Q11).
6. **Freeform + rail + audio** — freeform hides the rail here; confirm audio scope on freeform (screens Open Q5, Q12).
7. **Convert-to-text / solve-math outputs** — mock uses canned strings; this PRD requires real on-device recognition with a correction UI. Confirm the low-confidence/error UX with `prd-02` §11 (screens Open Q8).
8. **Undo depth** — 60 snapshots per page in the mock; confirm the op-log migration (PRD-ED-128) keeps ≥60 user-visible steps and whether undo survives app relaunch.
9. **Layers exposure** — how prominent are layers for the student persona? Ship the minimal ink/highlight split first (PRD-ED-121) and gate full layers behind a setting?
10. **Brush studio surface** — full studio on phones or a reduced set? (PRD-ED-062 marks it MAY on phones.)
11. **`.sanepen` community sharing** — is a brush marketplace/sharing in scope, and what is the moderation/trust model for imported (untrusted) brush assets (PRD-ED-065)?

---

## 20. Additional requirements — competitor & design parity (2026-09-13 gap-closure pass)

> These close editor-surface feature gaps found by auditing the competitor teardowns
> (`research/goodnotes-userguide-inventory.md`, `research/notability.md`, `research/onenote.md`,
> `research/apple-notes-freeform.md`, `research/samsung-notes-nebo-other.md`) and the design
> (`screens-and-flows.md`) against §1–§18. IDs continue the PRD-ED sequence; each names its home section.
> Baselines SEC-BASE (§0.4) and A11Y-BASE apply.

### 20.1 Text & typing (extends §9)

**PRD-ED-179 · Markdown-on-type shortcuts** — SHOULD · All · M2
**AC:** In text boxes/blocks, typed prefixes auto-format on space/return: `#`/`##`/`###`→headings, `-`/`*`/`+`→bullet, `1.`→numbered, `[]`→checkbox, `>`→block quote (PRD-ED-180), `` ` ``→inline code / ```` ``` ````→code block (PRD-ED-181), `---`→divider. A single Undo reverts the auto-format to literal text. Bar: Notion (full), Notability, Goodnotes, Apple Notes (`research/notability.md` §Text; `research/onenote.md` §3).
**Sec:** SEC-BASE. **A11y:** additive; every block type also reachable from a labelled formatting menu.

**PRD-ED-180 · Quote & callout blocks** — SHOULD · All · M2
**AC:** Text supports a block-quote style (indent + rule) and a callout/box style (tinted panel, optional icon) (Notability Quote Blocks; Notion callouts — `research/notability.md` §Text).
**Sec:** SEC-BASE. **A11y:** expose the correct semantic role (blockquote / note) to screen readers.

**PRD-ED-181 · Code block** — SHOULD · All · M3
**AC:** A monospace block that preserves whitespace, carries a per-block language, and applies on-device read-only syntax highlighting for a curated set (≥ the 26 Notability ships: Bash, C, C#, C++, CSS, Go, Haskell, HTML, Java, JS, JSON, Kotlin, Lua, Markdown, MATLAB, Obj-C, OCaml, PHP, Python, R, Racket, Ruby, Rust, SQL, Swift, TS + plain); remembers last language; ``` shortcut (PRD-ED-179) (`research/notability.md` §Code Blocks; `research/goodnotes-userguide-inventory.md` §Text Document).
**Sec:** SEC-BASE; highlighting runs on-device, no remote grammar fetch. **A11y:** honours Dynamic Type minimum; language announced.

**PRD-ED-182 · Toggle / collapsible sections** — SHOULD · All · M3
**AC:** Headings and toggle blocks collapse/expand their child content (Notion toggles; Apple Notes collapsible sections under Heading/Subheading — `research/apple-notes-freeform.md` §3). Collapsed state is per-view and persisted; export preserves full content.
**Sec:** SEC-BASE. **A11y:** disclosure exposes expanded/collapsed state; keyboard toggles.

**PRD-ED-183 · Insert date / time stamp** — MAY · All · M2
**AC:** A text action inserts the current date, time, or date-time at the caret, locale-formatted (`intl`), as editable text (OneNote Alt+Shift+D/F — `research/onenote.md` §3).
**Sec:** SEC-BASE. **A11y:** menu action + optional shortcut.

### 20.2 Fonts (extends PRD-ED-105)

**PRD-ED-184 · Import custom fonts** — MAY · All · M3
**AC:** Users MAY import a TTF/OTF font for text runs (Notability, OneNote, Nebo `.ttf` — `research/notability.md` §Text; `research/samsung-notes-nebo-other.md` §Nebo). Imported fonts are per-profile and embedded into `.sanenote`/PDF export where licensing allows.
**Sec:** SEC-BASE; **CRITICAL** — a font file is untrusted third-party content: parse in a hardened, sandboxed loader (bounds-checked, reject malformed tables, cap size, no code execution beyond the platform shaper); warn on unknown provenance; note embedding may be licence-restricted. **A11y:** never override a user's "readable font" accessibility choice.

### 20.3 Selection (extends §7)

**PRD-ED-185 · Group / ungroup selection** — SHOULD · All · M2
**AC:** A selection can be grouped into one movable/resizable object and later ungrouped; groups nest and persist in `.sanenote` (Notability "group" — `research/notability.md` §Select).
**Sec:** SEC-BASE. **A11y:** group exposes a labelled container in the a11y tree; ungroup reachable by menu.

**PRD-ED-186 · Circle-to-lasso pen gesture** — SHOULD · All · M3
**AC:** With the pen active, drawing a closed loop then long-pressing inside it converts the loop into a lasso selection of the enclosed objects (Goodnotes Circle-to-Lasso — `research/goodnotes-userguide-inventory.md` §Pen Gestures). Distinct from second-finger transient select (PRD-ED-170); toggleable to avoid false positives during dense writing.
**Sec:** SEC-BASE; on-device. **A11y:** additive; the explicit lasso tool remains primary.

**PRD-ED-187 · Handwriting refine / reflow (beautify & reorganize)** — SHOULD · All · M4
**AC:** On selected ink offer **Refine** (smooth/straighten while preserving the writer's style), **Straighten** (level to baseline), and **Reflow/Reorganize** (adjust spacing / insert space so ink behaves like typed text) — non-destructive, undoable, ink kept as source of truth (Apple Smart Script; Samsung Straighten/clean-up; Goodnotes Notes Reorganization / Lasso Resize — `research/apple-notes-freeform.md` §2; `research/samsung-notes-nebo-other.md` §Samsung; `research/goodnotes-userguide-inventory.md` §Lasso). Backing recognition/geometry in `prd-02` §11.
**Sec:** SEC-BASE; on-device. **A11y:** improves legibility; original ink always recoverable via Undo.

### 20.4 Ink capture aids (extends §2)

**PRD-ED-188 · Writing guideline aid ("handwriting help")** — SHOULD · All · M2
**AC:** An optional on-screen writing guide (baseline + x-height rules, or a slanted guide) that keeps handwriting aligned/sized; distinct from paper templates and from smoothing (PRD-ED-028). Samsung handwriting-help / Nebo guides (`research/samsung-notes-nebo-other.md` §Samsung, §Nebo). Off by default; per-profile.
**Sec:** SEC-BASE. **A11y:** a motor/legibility aid; guide contrast meets AA and it is toggleable.

### 20.5 Tools (extends §14 tool set)

**PRD-ED-189 · Tape / masking (active-recall) tool** — SHOULD · All · M4
**AC:** A **Tape** tool covers content with an opaque band; tapping a taped region reveals/hides it (self-quiz). Straight-tape toggle; tape colours/patterns (solid + custom pattern bitmap); "reveal all"/"remove all"; erasable. Shipped by Goodnotes (Tape) and Notability (Tape — 12 sizes, 9 patterns) (`research/goodnotes-userguide-inventory.md` §Tape; `research/notability.md` §Tape). Cross-ref study tools (`prd-04` §5).
**Sec:** SEC-BASE; a custom-pattern bitmap is validated/size-capped per PRD-ED-065 rules. **A11y:** reveal/hide is a labelled toggle, keyboard-operable, never colour-only.

### 20.6 Viewport & windows (extends §13)

**PRD-ED-190 · Freeform scenes (saved framed views) & present** — SHOULD · All · M4
**AC:** On freeform pages, save named **scenes** (a framed rectangle of the board); a scene navigator lists them; present mode steps scene→scene with back/forward (Apple Freeform scenes — `research/apple-notes-freeform.md` §15). Scenes are view metadata only (no content duplication); export as an ordered PDF (one scene per page).
**Sec:** SEC-BASE. **A11y:** scene list labelled and keyboard-navigable; present respects Reduce Motion.

**PRD-ED-191 · Document tabs (multiple open notebooks)** — SHOULD · iPad·ADt·Web(desktop) ; MAY phones · M3
**AC:** A browser-style tab bar keeps several notebooks open for fast switch/close/reorder (Goodnotes Document Tab Bar — `research/goodnotes-userguide-inventory.md` §Document tabs). Distinct from OS multi-window (PRD-ED-139); toggleable; `⌘/Ctrl-1..9` switch tabs and `⌘/Ctrl-W` close (extends PRD-ED-149).
**Sec:** SEC-BASE. **A11y:** tabs expose selected state + labels; close has a non-gesture control.

### 20.7 Brushes (extends §4.2)

**PRD-ED-192 · Novelty / effect pens (rainbow, glitter)** — MAY · All · M5
**AC:** Optional effect pens (rainbow hue-cycling, glitter/sparkle) implemented via the Color Dynamics parameters already in the brush schema (PRD-ED-046) — no new engine (OneNote Galaxy/Rainbow/Lava; Notability Android rainbow/glitter — `research/onenote.md` §2; `research/notability.md` §Ink).
**Sec:** SEC-BASE; first-party assets only. **A11y:** decorative; never the only pen and never required.
