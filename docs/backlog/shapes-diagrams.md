# Backlog — area: shapes-diagrams

19 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-SHP-001](shapes-diagrams.md#sn-shp-001) **Build shape recognition, snapping, connectors and diagram tools** (epic · M2 Library & Documents)
  - [SN-SHP-002](shapes-diagrams.md#sn-shp-002) **Implement the shape recognition pipeline (RDP, dollar-P/Q, geometric fit)** · p1 · feature · L · M2 Library & Documents
  - [SN-SHP-003](shapes-diagrams.md#sn-shp-003) **Implement hold-to-shape dwell trigger (QuickShape and QuickLine)** · p1 · feature · M · M2 Library & Documents
  - [SN-SHP-004](shapes-diagrams.md#sn-shp-004) **Implement the explicit shape tool (rectangle, ellipse, line, triangle, polygon)** · p1 · feature · M · M2 Library & Documents
  - [SN-SHP-005](shapes-diagrams.md#sn-shp-005) **Add arrows and lines with configurable arrowheads** · p1 · feature · S · M2 Library & Documents
  - [SN-SHP-006](shapes-diagrams.md#sn-shp-006) **Implement the ruler / straightedge with snap-to-ruler capture** · p1 · feature · M · M2 Library & Documents
  - [SN-SHP-007](shapes-diagrams.md#sn-shp-007) **Implement the Shape object model and vector node editing (Edit Shape)** · p1 · feature · M · M2 Library & Documents
  - [SN-SHP-008](shapes-diagrams.md#sn-shp-008) **Build the shape recognition test corpus and accuracy golden gate** · p2 · test · M · M2 Library & Documents
  - [SN-SHP-009](shapes-diagrams.md#sn-shp-009) **Implement snapping and alignment guides for shapes and objects** · p2 · feature · M · M3 Audio & Recognition
  - [SN-SHP-010](shapes-diagrams.md#sn-shp-010) **Implement connectors that stay attached to objects** · p2 · feature · M · M3 Audio & Recognition
  - [SN-SHP-011](shapes-diagrams.md#sn-shp-011) **Add polygons and polylines with editable vertices** · p2 · feature · S · M3 Audio & Recognition
  - [SN-SHP-012](shapes-diagrams.md#sn-shp-012) **Implement the protractor / angle tool with numeric entry** · p2 · feature · S · M3 Audio & Recognition
  - [SN-SHP-013](shapes-diagrams.md#sn-shp-013) **Implement fill and shade of enclosed regions** · p3 · feature · M · M3 Audio & Recognition
  - [SN-SHP-014](shapes-diagrams.md#sn-shp-014) **Add live measure readout and attachable dimension labels** · p3 · feature · S · M3 Audio & Recognition
  - [SN-SHP-015](shapes-diagrams.md#sn-shp-015) **Add recognise-selection-to-shape for lassoed ink** · p2 · feature · S · M3 Audio & Recognition
  - [SN-SHP-016](shapes-diagrams.md#sn-shp-016) **Build diagram mode with a shape and elements library** · p2 · feature · M · M3 Audio & Recognition
  - [SN-SHP-017](shapes-diagrams.md#sn-shp-017) **Add haptic feedback on shape-complete and alignment snap** · p2 · task · S · M5 Phones & Platform Parity

---

## Issues

### SN-BTY-034

<a id="sn-bty-034"></a>

**Tidy sketched boxes and arrows in a beautify pass via the shape recogniser**

| Field | Value |
|---|---|
| GitHub | #1182 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams, ocr-hwr, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-SHP-001](shapes-diagrams.md#sn-shp-001), [SN-BTY-039](ocr-hwr.md#sn-bty-039) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A04`, `CWE-117`, `TM-I-05` |
| Extra labels | agent-ready |

#### Context
A student's page is words *and* boxes and arrows. A beautify pass that straightens the writing but leaves a wobbly flowchart untouched feels half-finished. Sane Notes already has a shape recogniser and geometric fitter — RDP → $P/$Q → Taubin/Fitzgibbon least-squares producing editable shapes ([SN-SHP-001](shapes-diagrams.md#sn-shp-001), [SN-HWR-012](ocr-hwr.md#sn-hwr-012), `docs/architecture/ink-engine.md` §9) — and [SN-BTY-039](ocr-hwr.md#sn-bty-039) already separates drawing strokes from writing and hands them onward. The mistake to avoid is building a second, parallel "beautify shapes" implementation that drifts from the first. This issue is the batch, non-destructive pass that routes a page's sketched shapes into the **existing** recogniser and keeps diagrams coherent while it does.

#### Scope
**In:** a batch beautify entry that takes the drawing clusters [SN-BTY-039](ocr-hwr.md#sn-bty-039) identifies and feeds them to [SN-SHP-001](shapes-diagrams.md#sn-shp-001)'s recogniser with a confidence floor; per-shape preview with individual accept and reject inside [SN-BTY-013](editor.md#sn-bty-013); **arrow re-attachment** so an arrow whose endpoints touched two boxes still touches them after both are tidied; preservation of the shape-to-label relationship using the attachment edges from [SN-BTY-031](ocr-hwr.md#sn-bty-031) so a caption moves with its figure; commit as editable `Shape` objects in the same undoable batch as the rest of the pass; an arch test forbidding a second fitter.
**Out:** the recogniser and geometric fitters ([SN-SHP-001](shapes-diagrams.md#sn-shp-001), [SN-HWR-012](ocr-hwr.md#sn-hwr-012)); the hold-to-snap live trigger, already in [SN-SHP-001](shapes-diagrams.md#sn-shp-001); the text-versus-drawing classification and protected-context rules ([SN-BTY-039](ocr-hwr.md#sn-bty-039)); diagram-to-structured-diagram conversion.

#### Acceptance criteria
- [ ] Every shape candidate on a page is routed through [SN-SHP-001](shapes-diagrams.md#sn-shp-001); an arch/CI test asserts no least-squares circle, ellipse or polygon fitting code exists outside `sane_ink`'s shape module.
- [ ] Handwriting is never sent to the shape recogniser: a dotted "i", a crossed "t" and a lowercase "o" are rejected before routing, and the pass's writing-as-drawing error rate stays below 2 % on the mixed-page corpus.
- [ ] Each candidate is previewed individually and can be accepted or rejected; rejecting one leaves its original ink untouched and does not block the others.
- [ ] Candidates below the recogniser's confidence floor are left as ink — never "best-effort snapped".
- [ ] An arrow whose endpoints touched two boxes still touches them after both are tidied: endpoint-to-shape distance changes by ≤ 2 px.
- [ ] A label inside or attached to a shape moves with the shape and is never reflowed as text ([SN-BTY-031](ocr-hwr.md#sn-bty-031)).
- [ ] Accepted shapes become editable `Shape` objects with node handles, not flattened ink (`docs/architecture/ink-engine.md` §9.4), and the whole page pass is one undoable batch ([SN-BTY-012](editor.md#sn-bty-012)).
- [ ] Classifying and fitting a page with 40 candidates costs ≤ 300 ms on a background isolate with no frame > 16.7 ms.

#### Technical notes
`app/lib/features/editor/beautify/shape_pass.dart` orchestrates; the fitting is entirely [SN-SHP-001](shapes-diagrams.md#sn-shp-001)'s public API — do not reach into its internals and do not duplicate Taubin or Fitzgibbon. On mobile, ML Kit's shape/autodraw and nine-class gesture classifiers may be consulted through the `ShapeRecognizer` capability of `sane_ml` ([SN-HWR-002](ocr-hwr.md#sn-hwr-002)) as an accelerator, with the pure-Dart $P/$Q path as the default so web and low-end devices behave identically (ADR-0016 §3 engine matrix). Arrow re-attachment recomputes endpoints against the fitted geometry of the shapes the original endpoints were within tolerance of, using the attachment edges from [SN-BTY-031](ocr-hwr.md#sn-bty-031). Results commit as `Shape` objects through [SN-CORE-003](sync.md#sn-core-003) in the same op batch as the text-side beautification.

#### Security & privacy
On-device with no egress (MASVS-PRIVACY-1, ADR-0016); stroke features and classifications are note content and are never logged (TM-I-05, CWE-117). Integrity (OWASP-A04): the asymmetric error budget exists because turning someone's word into a circle is data loss in the user's eyes; the confidence floor plus per-shape accept keeps the failure mode "nothing happened", and the original ink is recoverable by Undo for every accepted shape.

#### UX notes
Shapes appear in the same beautify preview as the text items ([SN-BTY-013](editor.md#sn-bty-013)) — "Tidy 4 shapes" — each with its own toggle and an inline before/after. Reference `docs/design/screens-and-flows.md` §7.3 and PRD-LB-308. States: no shapes found, preview, partially accepted, applied, reverted. Accept reuses the existing shape-snap haptics ([SN-SHP-017](shapes-diagrams.md#sn-shp-017), [SN-IPAD-006](input-gestures.md#sn-ipad-006)) rather than inventing new feedback. All 17 looks and dark; Reduce Motion honoured. A11y: each candidate is a labelled toggle ("Tidy rectangle near top left"), keyboard-operable.

#### Test plan
`app/test/editor/beautify_shape_pass_test.dart` (routing, per-shape accept and reject, confidence floor, single undo), `app/test/editor/shape_pass_arrow_reattachment_test.dart`, `app/test/editor/shape_pass_label_follows_shape_test.dart`, `app/test/arch/no_duplicate_shape_fitter_test.dart`, golden `app/test/golden/beautify_shapes_before_after_*`, `app/test/perf/beautify_shapes_budget_test.dart`.

#### Dependencies
SN-SHP-001 (recogniser and fitter, reused not reimplemented), SN-BTY-039 (drawing-versus-writing separation and protected contexts). Uses [SN-BTY-031](ocr-hwr.md#sn-bty-031) attachment edges and [SN-BTY-013](editor.md#sn-bty-013) preview.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-GCMP-015

<a id="sn-gcmp-015"></a>

**Add equation graphing (2D/3D plots) in notes**

| Field | Value |
|---|---|
| GitHub | #1071 |
| Type | feature |
| Priority | p3 |
| Milestone | Backlog |
| Platforms | all |
| Areas | shapes-diagrams, ocr-hwr |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-014](ocr-hwr.md#sn-hwr-014), [SN-GCMP-018](ocr-hwr.md#sn-gcmp-018) |
| Security controls | — |
| Extra labels | needs-design |

#### Context
OneNote plots 2D graphs and Apple Math Notes plots 2D/3D from equations; it is a documented 'later' target in our matrix (docs/research/competitor-feature-matrix.md section 13, 'Graphing (2D/3D)'; PRD-CO-163 from the 2026-09-13 pass). No tracker issue covers plotting. It complements math recognition ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)) and the live-unit scratchpad ([SN-GCMP-018](ocr-hwr.md#sn-gcmp-018)) and rounds out the STEM story.

#### Scope
**In:** insert a plot from a recognised or typed equation (y=f(x), parametric, and simple 3D z=f(x,y)); interactive pan/zoom of the plot; the plot is an object on the page that re-renders when its source expression changes; export as vector where possible.
**Out:** a full CAS/solver (that is math solve [SN-HWR-015](ocr-hwr.md#sn-hwr-015) and the scratchpad [SN-GCMP-018](ocr-hwr.md#sn-gcmp-018)); statistical charting of note data; data-table plotting.

#### Acceptance criteria
- [ ] A recognised/typed equation can be plotted as a 2D graph; parametric and basic 3D are supported.
- [ ] The plot is a live object: editing the source expression updates the graph.
- [ ] The plot supports pan/zoom and axis/range controls and renders crisply at all zoom levels.
- [ ] Plots export as vector in PDF/SVG where feasible, raster fallback otherwise.
- [ ] Recognition errors are correctable before plotting (reuse the recognition confidence UX [SN-HWR-008](ocr-hwr.md#sn-hwr-008)).

#### Technical notes
Evaluate expressions with the units-aware engine from [SN-GCMP-018](ocr-hwr.md#sn-gcmp-018) (falling back to a plain evaluator); render via a canvas plot widget producing vector paths for export ([SN-SHR-005](sharing-export.md#sn-shr-005)). Source expression captured from math recognition ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)). Store the plot as a page object with its source expression in `sane_core`. Reference PRD-CO-163. Needs a design pass on the plot object chrome.

#### Security & privacy
Expression evaluation must be sandboxed (no arbitrary code execution); bound iteration/precision to avoid DoS. Baseline otherwise.

#### UX notes
Plot object with an edit-expression affordance; axis controls; honour Reduce Motion; dark-mode-aware plot colours from tokens.

#### Test plan
Unit: expression eval + plot path generation + bounds (test/math/graphing_test.dart). Widget: pan/zoom/axis controls. Golden: 2D/3D plots across looks. Integration: live update on expression edit; vector export.

#### Dependencies
[SN-HWR-014](ocr-hwr.md#sn-hwr-014), [SN-GCMP-018](ocr-hwr.md#sn-gcmp-018).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-001

<a id="sn-shp-001"></a>

**Build shape recognition, snapping, connectors and diagram tools**

| Field | Value |
|---|---|
| GitHub | #26 |
| Type | epic |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | shapes-diagrams, editor |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-INK-026](ink.md#sn-ink-026), [SN-CORE-002](storage.md#sn-core-002), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
Shapes & diagrams turn rough ink into clean, editable vector geometry, which the docs call the single highest-leverage feature for diagrams, boxes, underlines and tables in notes (docs/architecture/ink-engine.md section 9; docs/product/prd-01-editor-ink-brushes.md section 8; docs/design/pen-and-brush-spec.md section 7). The primary persona is a B.Tech Physics student (docs/design/screens-and-flows.md persona) who needs rulers, protractors, arrows, connectors and measured diagrams. This epic delivers the whole surface: the on-device shape recognition pipeline (RDP simplify, dollar-P/Q classify, geometric fit), the hold-to-shape dwell trigger, the explicit shape tool, arrows/lines/connectors/polygons, ruler/protractor/straightedge, snapping & alignment guides, fill/shade of enclosed regions, measure and dimension labels, a diagram mode with a shape/elements library, haptic snap confirmation, and the recognition accuracy test corpus. The core recognition and geometry are pure Dart in packages/sane_ink (ink-engine section 9), shapes are first-class Shape objects in the document model (LOCKED DECISION 4; SN-CORE-002), rendering of overlay chrome (handles, rulers, guides) lives in sane_render, and the tool UI lives in the editor (SN-ED). Roadmap M2 delivers Shapes & rulers with recognition; the recognition-heavy depth (connectors, protractor, fill, measure, diagram mode) continues in M3, and haptics land with stylus mastery in M5.

#### Scope
**In:** the recognition pipeline; hold-to-shape dwell; explicit shape tool; arrows/lines; ruler + snap-to-ruler capture; the Shape object model + vector node editing; snapping & alignment guides; connectors; polygons/polylines; protractor; fill/shade; measure + dimension labels; recognise-selection-to-shape; diagram mode + shape/elements library; snap/shape-complete haptics; the recognition test corpus.
**Out:** pen/brush geometry and presets (SN-INK / SN-BRS), lasso selection UI and undo (SN-ED-004 / SN-ED-003), handwriting/OCR/math recognition (SN-HWR), PDF snap-to-text highlight (SN-PDF), audio anchors (SN-AUD).

#### Acceptance criteria
- [ ] [SN-SHP-002](shapes-diagrams.md#sn-shp-002) shape recognition pipeline (RDP + dollar-P/Q + geometric fit)
- [ ] [SN-SHP-003](shapes-diagrams.md#sn-shp-003) hold-to-shape dwell trigger (QuickShape / QuickLine)
- [ ] [SN-SHP-004](shapes-diagrams.md#sn-shp-004) explicit shape tool (rect/ellipse/line/triangle/polygon)
- [ ] [SN-SHP-005](shapes-diagrams.md#sn-shp-005) arrows & lines with arrowheads
- [ ] [SN-SHP-006](shapes-diagrams.md#sn-shp-006) ruler / straightedge + snap-to-ruler capture
- [ ] [SN-SHP-007](shapes-diagrams.md#sn-shp-007) Shape object model + vector node editing
- [ ] [SN-SHP-008](shapes-diagrams.md#sn-shp-008) recognition test corpus + accuracy goldens
- [ ] [SN-SHP-009](shapes-diagrams.md#sn-shp-009) snapping & alignment guides
- [ ] [SN-SHP-010](shapes-diagrams.md#sn-shp-010) connectors that stay attached
- [ ] [SN-SHP-011](shapes-diagrams.md#sn-shp-011) polygons & polylines
- [ ] [SN-SHP-012](shapes-diagrams.md#sn-shp-012) protractor / angle tool
- [ ] [SN-SHP-013](shapes-diagrams.md#sn-shp-013) fill / shade enclosed regions
- [ ] [SN-SHP-014](shapes-diagrams.md#sn-shp-014) measure readout + dimension labels
- [ ] [SN-SHP-015](shapes-diagrams.md#sn-shp-015) recognise selection to shape
- [ ] [SN-SHP-016](shapes-diagrams.md#sn-shp-016) diagram mode + shape/elements library
- [ ] [SN-SHP-017](shapes-diagrams.md#sn-shp-017) haptic feedback on snap / shape-complete
- [ ] All painted overlays render correctly across the 17 looks and light+dark, with golden coverage.
- [ ] Recognition runs on-device; no ink coordinate or note content leaves the device or is logged.

#### Technical notes
Packages: packages/sane_ink/lib/src/shape (pure Dart, no package:flutter) for recognition/geometry, reusing [SN-INK-026](ink.md#sn-ink-026) polygon/segment utils and the [SN-INK-024](ink.md#sn-ink-024) R-tree; packages/sane_render for overlay chrome; Shape objects extend [SN-CORE-002](storage.md#sn-core-002). Tool UI hangs off the editor tool state machine [SN-ED-002](editor.md#sn-ed-002) and dock [SN-ED-005](editor.md#sn-ed-005). Grounding: ink-engine section 9 (three-stage recogniser), PRD-ED-091..102 and PRD-ED-087, pen-and-brush-spec section 7 (dwell-to-perfect). No new ADR is required; recognition is covered by the ink-engine doc and ADR-0016 (on-device ML for the optional ML Kit accelerator).

#### Security & privacy
All ink, shape vertices and recognition inputs are note content: on-device, never logged (docs/architecture/overview.md section 8.2), E2E-encrypted on sync (decision 3). Bound recognition and fill by resource caps so a crafted stroke/region cannot exhaust memory (CWE-400). User-supplied diagram elements are untrusted input (schema/size validation, no embedded code). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-400.

#### UX notes
Surface: design/Sane Notes.dc.html Editor (docs/design/screens-and-flows.md section 7; shape tool is tool:shape in the dock, section 7.3). All handles, rulers, protractors, guides and previews are overlay chrome above ink, must render in all 17 looks and light+dark, keep >= 4.5:1 contrast, carry Semantics labels, use 44 pt / 48 dp targets and be keyboard-reachable on web. Every gesture (dwell, second-finger constrain) has a non-gesture alternative.

#### Test plan
Unit tests for every pure recognition/geometry stage; widget/golden tests for tool UI and overlays per look; the accuracy corpus in [SN-SHP-008](shapes-diagrams.md#sn-shp-008); integration tests for hold-to-shape and diagram mode. Umbrella suites under packages/sane_ink/test/shape and app/test/editor.

#### Dependencies
[SN-INK-026](ink.md#sn-ink-026) (geometry utils), [SN-INK-024](ink.md#sn-ink-024) (R-tree), [SN-CORE-002](storage.md#sn-core-002) (document model / Shape object), [SN-ED-002](editor.md#sn-ed-002) (editor tool state machine). Coordinates with SN-BRS (pen strokes), SN-HWR (recognition / ML Kit accelerator), SN-PERF (latency harness) and SN-PHN / sane_stylus (haptics).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-002

<a id="sn-shp-002"></a>

**Implement the shape recognition pipeline (RDP, dollar-P/Q, geometric fit)**

| Field | Value |
|---|---|
| GitHub | #670 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | shapes-diagrams, ink, ocr-hwr |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-INK-026](ink.md#sn-ink-026), [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
The recognition pipeline is the engine behind every shape feature: hold-to-shape ([SN-SHP-003](shapes-diagrams.md#sn-shp-003)) and recognise-selection ([SN-SHP-015](shapes-diagrams.md#sn-shp-015)) both call it. It is three pure-Dart stages in packages/sane_ink per docs/architecture/ink-engine.md section 9: simplify/denoise (RDP), classify (dollar-family template recogniser), and geometric fit (beautify). This is the highest-leverage diagram feature (PRD-ED-091). It must be deterministic, headless-testable, and order/direction/stroke-count independent so a shape drawn any way recognises the same. The recogniser returns a candidate {class, confidence, fitted geometry} that the trigger and rendering layers consume; it never runs destructively in the background.

#### Scope
**In:** rdp.dart (Ramer-Douglas-Peucker decimation, tolerance epsilon ~2.0 logical px scaling with stroke size; Visvalingam-Whyatt allowed as a cheaper alternative); a dollar_p/dollar_q point-cloud recogniser with templates for line, arrow, rectangle/square, triangle, circle, ellipse and polyline (resample to N points, scale to a reference square, translate to origin, score by point-cloud distance); geometric_fit.dart (least-squares line, Taubin circle, Fitzgibbon direct ellipse with B^2-4AC<0, RDP-corner rectangle/polygon snap to right angles and equal length, arrow = line fit + arrowhead template); a ShapeCandidate result type.
**Out:** the dwell trigger and gesture ([SN-SHP-003](shapes-diagrams.md#sn-shp-003)), the optional ML Kit classifier accelerator (SN-HWR / ADR-0016), rendering of the fitted shape (sane_render), and the Shape object edit UI ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)).

#### Acceptance criteria
- [ ] RDP default epsilon ~2.0 px scales with stroke size; a straight fixture reduces to 2 points, a rough circle keeps enough points for the fit (unit test).
- [ ] dollar-Q is the default (chosen for the low-end reference device, ~142x faster than dollar-P per ink-engine 9.2); recognition is order/direction/stroke-count independent (a square drawn clockwise and counter-clockwise both classify as square).
- [ ] Circle fits via Taubin, ellipse via Fitzgibbon with the B^2-4AC<0 discriminant guard; a near-circular input classifies as circle (A=C, B~0) not ellipse.
- [ ] Rectangle/polygon corners snap to right angles and equal-length edges; a near-axis rectangle axis-aligns.
- [ ] Each stage is a pure function, deterministic (same input yields the same ShapeCandidate on Tier A and Tier B), and headless-tested.
- [ ] Point count is capped before the fit so a pathological stroke cannot exhaust memory (CWE-400).

#### Technical notes
Files under packages/sane_ink/lib/src/shape/ (rdp.dart, dollar_q.dart, templates.dart, geometric_fit.dart, shape_candidate.dart). Reuse [SN-INK-026](ink.md#sn-ink-026) segment/point-in-polygon utils and the decimated centreline shared with serialisation (ink-engine 10.1). Verify the Taubin/Fitzgibbon numerical implementation against a reference before shipping (the doc flags the method names as standard-but-unverified, ink-engine 9.3). Pure Dart only. Implements the recognition half of PRD-ED-091.

#### Security & privacy
Ink samples and fitted geometry are note content: on-device, never logged (overview 8.2). Recognition runs on-device by default; any optional cloud/ML escalation is out of scope here and gated elsewhere (decision 6). Cap resampled point counts before fitting (CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
No chrome of its own; it produces the geometry the tools render. A11y: the fitted shape carries a class that [SN-SHP-007](shapes-diagrams.md#sn-shp-007) turns into a semantic label (rectangle, circle, arrow), so recognised shapes are screen-reader-describable; recognition is never required to draw (the raw-ink path always exists).

#### Test plan
packages/sane_ink/test/shape/rdp_test.dart, dollar_q_test.dart (order/direction independence), geometric_fit_test.dart (Taubin circle, Fitzgibbon ellipse discriminant, rectangle corner snap), recognizer_test.dart (end-to-end candidate), run against the labelled corpus in [SN-SHP-008](shapes-diagrams.md#sn-shp-008).

#### Dependencies
[SN-INK-026](ink.md#sn-ink-026) (geometry utils), [SN-INK-004](ink.md#sn-ink-004) (outline geometry / centreline model). Coordinates with SN-HWR for the optional on-device ML Kit shape classifier cross-check.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-003

<a id="sn-shp-003"></a>

**Implement hold-to-shape dwell trigger (QuickShape and QuickLine)**

| Field | Value |
|---|---|
| GitHub | #671 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | shapes-diagrams, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-002](shapes-diagrams.md#sn-shp-002), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
Draw a rough shape and keep the stylus/finger held at the end and the stroke snaps to a clean line, arc, polyline, ellipse, triangle, rectangle or polygon: the single highest-leverage diagram feature (PRD-ED-091 MUST M2; docs/architecture/ink-engine.md section 9.4; docs/design/pen-and-brush-spec.md section 7). The same dwell turns a freehand stroke into a straight ruled line (QuickLine), so one motor habit yields two outcomes. This issue owns the dwell detector and the accept flow that swaps the wet ink for a fitted Shape object; the recogniser math is [SN-SHP-002](shapes-diagrams.md#sn-shp-002) and the editable node handles are [SN-SHP-007](shapes-diagrams.md#sn-shp-007).

#### Scope
**In:** a dwell detector (pen stationary past a configurable threshold, default ~500 ms, with a low-movement gate so it never fires during normal writing); invoking the recogniser [SN-SHP-002](shapes-diagrams.md#sn-shp-002) on pointer-hold; replacing the wet stroke with the fitted Shape object; a second-finger-while-holding constraint to the perfect form (square/circle/equilateral); QuickLine (dwell on a rough line yields a straight ruled line); making accept a single undo step and discarding the original ink on accept; a configurable/disable setting in Settings > Handwriting & stylus.
**Out:** the recogniser internals ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)), the Edit Shape node handles ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)), the explicit non-dwell shape tool ([SN-SHP-004](shapes-diagrams.md#sn-shp-004)), snapping to other objects ([SN-SHP-009](shapes-diagrams.md#sn-shp-009)), and the snap haptic ([SN-SHP-017](shapes-diagrams.md#sn-shp-017)).

#### Acceptance criteria
- [ ] Dwell threshold default ~500 ms, configurable (a longer value for tremor); holding at stroke-end snaps a rough box/circle/arrow/triangle/rectangle/polyline to the fitted shape.
- [ ] A second finger held during the dwell constrains to the perfect form (square, circle, equilateral).
- [ ] The same dwell on a rough line produces a straight ruled line (QuickLine).
- [ ] Accept is one undo step and the original ink is discarded on accept but recoverable via Undo.
- [ ] The trigger does not fire during dense normal handwriting (dwell + low-movement gate; a fast handwriting fixture produces zero snaps).
- [ ] A disable toggle stops the trigger entirely; the explicit shape tool ([SN-SHP-004](shapes-diagrams.md#sn-shp-004)) remains the non-dwell alternative.

#### Technical notes
Gesture lives in the editor over the tool state machine [SN-ED-002](editor.md#sn-ed-002) and consumes the raw Listener stream from [SN-INK-002](ink.md#sn-ink-002); recognition calls [SN-SHP-002](shapes-diagrams.md#sn-shp-002); the fitted result becomes a Shape object handled by [SN-SHP-007](shapes-diagrams.md#sn-shp-007). Configurable dwell persists per profile in Settings. Implements PRD-ED-091 (trigger half). The predicted-lead samples must be excluded from the recogniser input (only committed geometry is recognised, ink-engine 1.4).

#### Security & privacy
None beyond baseline: recognition is on-device, ink is note content, nothing is logged from the draw loop in profile/release (overview 8.2). ID: MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/pen-and-brush-spec.md section 7 (dwell-to-perfect), docs/design/screens-and-flows.md section 7. The Edit Shape affordance (from [SN-SHP-007](shapes-diagrams.md#sn-shp-007)) appears after snap; a haptic ([SN-SHP-017](shapes-diagrams.md#sn-shp-017)) confirms without looking. A11y: dwell is configurable longer for tremor; the explicit shape tool is the non-dwell alternative; snapped shapes get semantic labels. Any overlay confirm renders across the 17 looks and light+dark.

#### Test plan
app/integration_test/hold_to_shape_test.dart (snap on dwell, second-finger constrain, QuickLine, single-undo, no-fire during handwriting), app/test/editor/dwell_detector_test.dart.

#### Dependencies
[SN-SHP-002](shapes-diagrams.md#sn-shp-002) (recogniser), [SN-ED-002](editor.md#sn-ed-002) (editor tool state machine). Uses [SN-INK-002](ink.md#sn-ink-002) capture indirectly.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, integration, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-004

<a id="sn-shp-004"></a>

**Implement the explicit shape tool (rectangle, ellipse, line, triangle, polygon)**

| Field | Value |
|---|---|
| GitHub | #672 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | shapes-diagrams, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-005](editor.md#sn-ed-005), [SN-SHP-007](shapes-diagrams.md#sn-shp-007) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The explicit shape tool is the deliberate, precise path to a clean shape (as opposed to the everyday dwell path in [SN-SHP-003](shapes-diagrams.md#sn-shp-003)): select tool:shape in the dock and drag p0 to p1 to draw a rectangle, ellipse/circle, line, triangle or polygon (PRD-ED-093 MUST M2; docs/design/pen-and-brush-spec.md section 7; docs/design/screens-and-flows.md section 7.3). The design mock currently ships a rectangle-only shape tool; this PRD requires the fuller set (PRD-ED-093, resolved by the PRD in Open Q9 to the full set ellipse/line/triangle/polygon plus arrow). Shapes are editable vector Shape objects, not flattened ink.

#### Scope
**In:** a shape tool mode within the dock tool set {pen, hl, eraser, lasso, shape, text, image} ([SN-ED-005](editor.md#sn-ed-005)); a shape-kind picker (rectangle, ellipse/circle, line, triangle, polygon); drag p0 to p1 with a live preview; a Shift-key or second-finger constraint to the perfect form (square/circle/equilateral); commit as an editable Shape object ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)); numeric size entry.
**Out:** arrowheads ([SN-SHP-005](shapes-diagrams.md#sn-shp-005)), the dwell trigger ([SN-SHP-003](shapes-diagrams.md#sn-shp-003)), node editing after commit ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)), connectors ([SN-SHP-010](shapes-diagrams.md#sn-shp-010)), and recognition ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)).

#### Acceptance criteria
- [ ] The dock exposes a shape tool; selecting it enters shape mode and shows the shape-kind picker.
- [ ] The picker offers rectangle, ellipse/circle, line, triangle and polygon (the full set per PRD-ED-093; Open Q9 default = full set).
- [ ] Dragging p0 to p1 draws the selected shape with a live preview that tracks the pointer.
- [ ] Holding Shift or a second finger constrains to square/circle/equilateral.
- [ ] A committed shape is an editable Shape object (not flattened ink) and accepts numeric size entry.
- [ ] The shape-kind picker and preview overlay render correctly across the 17 looks and light+dark (golden).

#### Technical notes
UI in app/lib/editor and sane_ui (the shape-kind picker component), hanging off [SN-ED-002](editor.md#sn-ed-002) tool state and [SN-ED-005](editor.md#sn-ed-005) dock; the committed geometry becomes a Shape object per [SN-SHP-007](shapes-diagrams.md#sn-shp-007) / [SN-CORE-002](storage.md#sn-core-002). Sizes are in page units, resolution-independent across zoom (PRD-ED-008). Note the design Open Q9 (screens ships rectangle-only) is resolved by the PRD to the full set; if a maintainer later trims the M2 shipping subset, gate the extra kinds behind a flag rather than removing them.

#### Security & privacy
None beyond baseline: shape geometry is note content, on-device, stored encrypted at rest like any object, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.3 (dock tools). The shape-kind picker is labelled and not colour-only; the active tool state is announced and not colour-only; targets are 44 pt / 48 dp and keyboard-reachable on web. Preview and picker render across all 17 looks and light+dark.

#### Test plan
app/test/editor/shape_tool_test.dart (kind selection, drag preview, constrain, commit-as-object, numeric size), golden tests of the picker + preview per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool state machine), [SN-ED-005](editor.md#sn-ed-005) (palette dock), [SN-SHP-007](shapes-diagrams.md#sn-shp-007) (Shape object model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-005

<a id="sn-shp-005"></a>

**Add arrows and lines with configurable arrowheads**

| Field | Value |
|---|---|
| GitHub | #673 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | shapes-diagrams, editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-004](shapes-diagrams.md#sn-shp-004), [SN-SHP-002](shapes-diagrams.md#sn-shp-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Arrows and lines are part of the MUST shape set and the backbone of annotated diagrams (PRD-ED-094 MUST M2). A line tool draws a straight segment with optional arrowheads (none/end/both) and an adjustable head style; a draw-and-hold freehand also yields an arrow when the gesture starts and ends like one (the Paper Diagram pattern, docs/design/pen-and-brush-spec.md section 7). This extends the explicit shape tool ([SN-SHP-004](shapes-diagrams.md#sn-shp-004)) and the arrow class of the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)).

#### Scope
**In:** a line primitive with arrowhead options none/end/both; adjustable head style and size; wiring the arrow class from the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)) so hold-to-shape ([SN-SHP-003](shapes-diagrams.md#sn-shp-003)) produces an arrow; conveying arrow direction in the object accessibility label; the arrow/line committed as an editable Shape object.
**Out:** connectors that stay attached to objects ([SN-SHP-010](shapes-diagrams.md#sn-shp-010)), the recogniser fit math ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)), and node editing ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)).

#### Acceptance criteria
- [ ] The line tool draws a straight line; arrowheads none/end/both are selectable.
- [ ] Head style and size are adjustable and persist on the Shape object.
- [ ] Hold-to-shape recognises an arrow gesture (start/end like an arrow) and produces an arrow, not a plain line.
- [ ] Arrow direction is conveyed in the accessibility label (for example, arrow pointing right).
- [ ] The arrow/line is an editable Shape object (endpoints and heads editable via [SN-SHP-007](shapes-diagrams.md#sn-shp-007)).
- [ ] The arrowhead styles render correctly across the 17 looks and light+dark (golden).

#### Technical notes
Geometry is a line fit plus an arrowhead template (ink-engine 9.3 arrow row); the line/arrow commits through [SN-SHP-004](shapes-diagrams.md#sn-shp-004) / [SN-SHP-007](shapes-diagrams.md#sn-shp-007) as a Shape object over [SN-CORE-002](storage.md#sn-core-002). Arrowhead style is a small enum + size scalar on the Shape. Implements PRD-ED-094.

#### Security & privacy
None beyond baseline: line/arrow geometry is note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7 (shape tool). The head-style control is labelled and not icon-only; direction is in the label so meaning is never colour/orientation-only (a11y). Renders across all 17 looks and light+dark.

#### Test plan
app/test/editor/arrow_test.dart (head options none/end/both, direction label, recognised-arrow path), golden of arrowhead styles per look.

#### Dependencies
[SN-SHP-004](shapes-diagrams.md#sn-shp-004) (shape tool commit path), [SN-SHP-002](shapes-diagrams.md#sn-shp-002) (arrow recognition class).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-006

<a id="sn-shp-006"></a>

**Implement the ruler / straightedge with snap-to-ruler capture**

| Field | Value |
|---|---|
| GitHub | #674 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | shapes-diagrams, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-INK-002](ink.md#sn-ink-002), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
A movable, rotatable on-screen ruler lets ink drawn along it snap to a perfectly straight ruled line, and doubles as a table/grid drawing aid (PRD-ED-098 MUST M2; PRD-ED-034 makes snap-to-ruler part of the capture path). Because the constraint must be applied before smoothing, this is an ink-capture concern as much as an overlay: points are projected onto the ruler axis before the stabilisation filter runs (docs/architecture/ink-engine.md section 1-2). The Physics persona relies on it for clean diagrams and axes (screens persona).

#### Scope
**In:** a ruler overlay object (position + angle); constraining ink samples that fall within a band of the ruler onto the ruled axis before smoothing ([SN-INK-002](ink.md#sn-ink-002) capture path, PRD-ED-034); two-finger rotate; drag to reposition; numeric angle and position entry; keyboard nudge; a visible enable/disable affordance.
**Out:** the protractor/angle tool ([SN-SHP-012](shapes-diagrams.md#sn-shp-012)), snapping to other strokes/grid ([SN-SHP-009](shapes-diagrams.md#sn-shp-009)), and freeform drawing guides ([SN-SHP-009](shapes-diagrams.md#sn-shp-009) / diagram mode [SN-SHP-016](shapes-diagrams.md#sn-shp-016)).

#### Acceptance criteria
- [ ] The ruler renders as overlay chrome above ink; it can be dragged to reposition and two-finger rotated.
- [ ] Ink drawn within the ruler band snaps to the ruled line; the constraint is applied to samples before the stabilisation filter (verified by a capture-path test).
- [ ] Ruler angle and position are settable numerically; keyboard nudge adjusts both.
- [ ] Ink drawn away from the ruler band is unaffected.
- [ ] The ruler renders correctly across the 17 looks and light+dark and keeps >= 4.5:1 contrast against every look page colour.
- [ ] Handles are 44 pt / 48 dp with Semantics labels.

#### Technical notes
The ruler is overlay chrome in sane_render (ink-engine 5.1, above ink, never flattened). The axis projection runs in the capture pipeline in packages/sane_ink before the 1-euro/streamline stages (ink-engine 1.5, 2.1) so the snapped line inherits no wobble; the ruler geometry itself is a lightweight overlay object, not a persisted Shape. Gesture wiring is in the editor over [SN-ED-002](editor.md#sn-ed-002). Implements PRD-ED-098 and PRD-ED-034.

#### Security & privacy
None beyond baseline: ruled ink is note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7. A visible reset/hide affordance; numeric angle/position entry and keyboard nudge are the non-gesture alternatives (a11y). The ruler must not obscure needed chrome for screen-reader users. Renders across all 17 looks and light+dark.

#### Test plan
packages/sane_ink/test/shape/ruler_snap_test.dart (axis projection before smoothing, band behaviour), app/test/editor/ruler_test.dart (rotate/reposition/numeric), golden of the ruler per look.

#### Dependencies
[SN-INK-002](ink.md#sn-ink-002) (capture pipeline to constrain), [SN-ED-002](editor.md#sn-ed-002) (editor tool state machine).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-007

<a id="sn-shp-007"></a>

**Implement the Shape object model and vector node editing (Edit Shape)**

| Field | Value |
|---|---|
| GitHub | #675 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | shapes-diagrams, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
A recognised or drawn shape is not flattened ink: it becomes a Shape object with draggable node handles that stays scalable, rotatable and re-editable (docs/architecture/ink-engine.md section 9.4; PRD-ED-091, PRD-ED-096; LOCKED DECISION 4). This issue defines the Shape entity in the document model and the Edit Shape mode with node handles, the shared substrate for the shape tool ([SN-SHP-004](shapes-diagrams.md#sn-shp-004)), arrows ([SN-SHP-005](shapes-diagrams.md#sn-shp-005)), polygons ([SN-SHP-011](shapes-diagrams.md#sn-shp-011)) and recognise-selection ([SN-SHP-015](shapes-diagrams.md#sn-shp-015)). Keeping shapes editable is the differentiator over ink that must be erased and redrawn.

#### Scope
**In:** a Shape object type extending the document model ([SN-CORE-002](storage.md#sn-core-002)) with kind, parametric geometry or vertex list, stroke and fill, and a transform (CRDT add-wins id + LWW registers per decision 4); an Edit Shape mode exposing draggable node/vertex handles; stroke and fill colour editing; scale and rotate without quality loss (vector); numeric coordinate entry for nodes; reversibility so a converted shape is editable and the pre-conversion ink is recoverable in a single undo.
**Out:** the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)), fill of enclosed regions ([SN-SHP-013](shapes-diagrams.md#sn-shp-013)), connectors ([SN-SHP-010](shapes-diagrams.md#sn-shp-010)), and dimension labels ([SN-SHP-014](shapes-diagrams.md#sn-shp-014)).

#### Acceptance criteria
- [ ] A Shape object carries kind, geometry (parametric for rect/ellipse/line/triangle, vertex list for polygon/polyline), stroke, fill and transform, and round-trips through the document model / serialisation.
- [ ] Edit Shape exposes draggable node/vertex handles; nodes accept numeric coordinate entry.
- [ ] Stroke and fill colour are editable; scale and rotate preserve vector crispness at all zoom (no bitmap scaling).
- [ ] Node handles are overlay chrome above ink with Semantics (for example, rectangle, 4 nodes) and 44 pt / 48 dp targets.
- [ ] Converting ink to a shape is a single undo step and the original ink is recoverable via Undo.
- [ ] Handles and shapes render correctly across the 17 looks and light+dark (golden).

#### Technical notes
Extend the Shape entity in packages/sane_core ([SN-CORE-002](storage.md#sn-core-002)); node handles are drawn in sane_render as overlay chrome (ink-engine 5.1) and the edit gesture lives in the editor over [SN-ED-002](editor.md#sn-ed-002). Transforms commit as LWW register updates per object (ink-engine 8.3). New object ids on conversion so it merges cleanly on sync (decision 4). Implements the Shape-object half of PRD-ED-091 and PRD-ED-096.

#### Security & privacy
Shape geometry is note content: on-device, stored as content-addressed encrypted blobs at rest like any object (decision 3), never logged. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7 (Edit Shape affordance). Handles sit above ink and never flatten into it; numeric coordinate entry is the non-drag alternative (a11y, WCAG 2.5.7). Renders across all 17 looks and light+dark.

#### Test plan
packages/sane_core/test/shape_object_test.dart (fields, round-trip), app/test/editor/node_editing_test.dart (drag handles, numeric entry, single-undo reversibility), golden of shapes + handles per look.

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) (document model entities), [SN-ED-002](editor.md#sn-ed-002) (editor tool state machine).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-008

<a id="sn-shp-008"></a>

**Build the shape recognition test corpus and accuracy golden gate**

| Field | Value |
|---|---|
| GitHub | #676 |
| Type | test |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | shapes-diagrams, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-002](shapes-diagrams.md#sn-shp-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Recognition quality must be measured, not hoped: the design says cross-platform identical rendering and recognition only stop being a hope once a CI gate proves them (docs/design/pen-and-brush-spec.md section 9; docs/architecture/ink-engine.md section 9). This issue is the recognition-tests scope item: a labelled ink corpus plus an accuracy harness and golden images that gate the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)) so a regression in RDP tolerance, template set or fit math fails CI rather than shipping.

#### Scope
**In:** a labelled corpus of rough shapes under packages/sane_ink/test/shape/corpus (line, arrow, rectangle, square, triangle, circle, ellipse, polyline), drawn at varied speeds, sizes and orientations, stored as decimated ink fixtures; an accuracy harness that runs the recogniser over the corpus and reports per-class precision/recall and fit error; golden images of the fitted geometry for each class; a CI regression gate on accuracy and fit tolerance.
**Out:** the recogniser implementation ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)), the trigger UI ([SN-SHP-003](shapes-diagrams.md#sn-shp-003)), and the optional ML Kit accelerator (SN-HWR).

#### Acceptance criteria
- [ ] The corpus holds >= 20 samples per class committed as fixtures (synthetic/sample ink only, no real note content).
- [ ] The harness reports per-class precision and recall and overall classification accuracy.
- [ ] Classification accuracy is >= 90% on the corpus and the gate fails CI below that threshold.
- [ ] Fit error is within tolerance per class (for example circle radius error and line angle error thresholds) and asserted.
- [ ] Golden images exist for each fitted class across representative inputs and fail on visual regression.
- [ ] The harness is headless (no widget/device dependency) and deterministic.

#### Technical notes
Files: packages/sane_ink/test/shape/recognition_corpus_test.dart plus a harness under packages/sane_ink/test/shape/harness. Reuse the ShapeCandidate output of [SN-SHP-002](shapes-diagrams.md#sn-shp-002); fixtures are decimated ink in the same on-device format used by serialisation (ink-engine 10.1). Keep the corpus small enough to run in CI but broad enough to catch order/direction/size regressions. Golden tolerances follow the render golden conventions used elsewhere in the repo.

#### Security & privacy
Corpus fixtures are synthetic/sample ink authored for tests, not real note content; nothing is logged beyond test results (baseline: no content or token logging). ID: MASVS-PRIVACY-1.

#### UX notes
None beyond baseline (this is a test suite; no user-facing chrome). Baseline still applies: no note content or tokens are logged by the harness.

#### Test plan
The deliverable is the test suite itself: recognition_corpus_test.dart (per-class precision/recall + accuracy gate), fit_tolerance_test.dart (fit error thresholds), and the golden set. Runs in CI on every recogniser change.

#### Dependencies
[SN-SHP-002](shapes-diagrams.md#sn-shp-002) (recogniser under test).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-009

<a id="sn-shp-009"></a>

**Implement snapping and alignment guides for shapes and objects**

| Field | Value |
|---|---|
| GitHub | #677 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-INK-024](ink.md#sn-ink-024), [SN-INK-025](ink.md#sn-ink-025), [SN-SHP-007](shapes-diagrams.md#sn-shp-007) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
While drawing or moving a shape, the app should snap to other stroke endpoints/key points, grid/template lines and 0/45/90 deg angles, with visible snap indicators and an alignment tick (PRD-ED-092 SHOULD M3). This makes precise diagrams achievable without fine motor control. It also covers the optional freeform drawing guides (iso/perspective/graph guide layer, PRD-ED-100 MAY M3), which are distinct from paper templates. Snapping queries the spatial index and hit-tester from the ink engine.

#### Scope
**In:** a snapping engine that queries the R-tree ([SN-INK-024](ink.md#sn-ink-024)) and hit-tester ([SN-INK-025](ink.md#sn-ink-025)) for nearby endpoints and key points, plus grid/template lines and 0/45/90 deg angle snapping; visible snap indicators; a global toggle; and an optional freeform guide layer (isometric/perspective/graph) with adjustable spacing and rotation and 45 deg snap targets.
**Out:** the alignment haptic firing ([SN-SHP-017](shapes-diagrams.md#sn-shp-017)), the ruler ([SN-SHP-006](shapes-diagrams.md#sn-shp-006)), the protractor ([SN-SHP-012](shapes-diagrams.md#sn-shp-012)), and connector attachment ([SN-SHP-010](shapes-diagrams.md#sn-shp-010)).

#### Acceptance criteria
- [ ] While drawing or moving a shape, endpoints snap to nearby stroke endpoints and key points (via the R-tree broad phase) and to grid/template lines.
- [ ] Angles snap to 0/45/90 deg with a visible snap indicator.
- [ ] Snapping is toggleable globally for users who find it disruptive.
- [ ] The freeform guide layer offers isometric/perspective/graph guides with adjustable spacing and rotation and 45 deg snap targets, and is a reorderable guide layer (not a paper template).
- [ ] Guides keep >= 4.5:1 contrast and have a hide toggle; snap indicators render across the 17 looks and light+dark.
- [ ] Snapping requires no fine motor control (a rough drag lands on the snap target within tolerance).

#### Technical notes
Snapping utils in packages/sane_ink using the [SN-INK-024](ink.md#sn-ink-024) R-tree rect query and [SN-INK-025](ink.md#sn-ink-025) narrow-phase distance; snap indicators and the guide layer are overlay chrome in sane_render (ink-engine 5.1, 7). The guide layer is a distinct reorderable layer from paper templates (PRD-ED-004 vs PRD-ED-100). Implements PRD-ED-092 and PRD-ED-100.

#### Security & privacy
None beyond baseline: geometry and snap targets are note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7. Snap indicators and guides are overlay chrome; a toggle exists for users who find snapping disruptive; guides have a hide toggle and sufficient contrast (a11y). Renders across all 17 looks and light+dark.

#### Test plan
packages/sane_ink/test/shape/snapping_test.dart (endpoint/grid/angle snapping via R-tree, tolerance), app/test/editor/guide_layer_test.dart, golden of guides + indicators per look.

#### Dependencies
[SN-INK-024](ink.md#sn-ink-024) (R-tree spatial index), [SN-INK-025](ink.md#sn-ink-025) (hit-testing), [SN-SHP-007](shapes-diagrams.md#sn-shp-007) (Shape object being moved/snapped).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-010

<a id="sn-shp-010"></a>

**Implement connectors that stay attached to objects**

| Field | Value |
|---|---|
| GitHub | #678 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-007](shapes-diagrams.md#sn-shp-007), [SN-SHP-009](shapes-diagrams.md#sn-shp-009) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
A connector attaches its endpoints to two objects/anchor points and stays attached when either moves, the backbone of flowcharts and mind maps (PRD-ED-095 SHOULD M3; docs/design/pen-and-brush-spec.md section 7 smart connectors). Straight, elbow and curved styles are supported. This is a differentiator over static ink arrows: move a box and the connector re-routes automatically. It builds on the Shape object model ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)) and reuses snapping ([SN-SHP-009](shapes-diagrams.md#sn-shp-009)) to pick anchor points.

#### Scope
**In:** a Connector object with two endpoint anchors bound to object ids + anchor points (edge midpoints/corners); automatic re-routing when an anchored object moves; straight, elbow and curved styles; optional arrowheads (reusing [SN-SHP-005](shapes-diagrams.md#sn-shp-005)); graceful detach when an anchored object is deleted; the connector relationship exposed to the accessibility tree.
**Out:** the diagram-mode palette and auto-connect on drop ([SN-SHP-016](shapes-diagrams.md#sn-shp-016)), the snapping engine itself ([SN-SHP-009](shapes-diagrams.md#sn-shp-009)), and plain arrows ([SN-SHP-005](shapes-diagrams.md#sn-shp-005)).

#### Acceptance criteria
- [ ] A connector binds two objects at chosen anchor points and renders between them.
- [ ] Moving either anchored object re-routes the connector so it stays attached (live during drag, committed on release).
- [ ] Straight, elbow and curved styles are selectable; optional arrowheads apply.
- [ ] Deleting an anchored object detaches the connector gracefully (it becomes free-floating or is removed per setting) with no dangling-reference crash.
- [ ] The connector relationship is exposed to the accessibility tree (for example, connects A to B).
- [ ] Anchor count and elbow-segment count are capped so a pathological diagram cannot exhaust resources (CWE-400).
- [ ] Connector styles render correctly across the 17 looks and light+dark (golden).

#### Technical notes
Connector is a Shape-adjacent object in packages/sane_core with endpoint references to object ids (decision 4 add-wins id + LWW). Re-routing recomputes the path from current anchor positions; elbow routing is a simple orthogonal router, curved is a quadratic/bezier through the anchors. Anchor picking reuses [SN-SHP-009](shapes-diagrams.md#sn-shp-009) snapping. Detach handling must tolerate a missing/tombstoned target (CRDT remove-from-add-wins). Implements PRD-ED-095.

#### Security & privacy
Geometry and object references are note content, on-device, never logged; bound segment/anchor counts to avoid resource exhaustion on a crafted document (CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7. Style picker labelled; the connects-A-to-B relationship is in the a11y tree; handles are 44 pt / 48 dp. Renders across all 17 looks and light+dark.

#### Test plan
packages/sane_core/test/connector_test.dart (attach, re-route on move, graceful detach on delete, cap), app/test/editor/connector_ui_test.dart, golden of styles per look.

#### Dependencies
[SN-SHP-007](shapes-diagrams.md#sn-shp-007) (Shape/object model + transforms), [SN-SHP-009](shapes-diagrams.md#sn-shp-009) (snapping for anchor picking).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-011

<a id="sn-shp-011"></a>

**Add polygons and polylines with editable vertices**

| Field | Value |
|---|---|
| GitHub | #679 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams, editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-007](shapes-diagrams.md#sn-shp-007), [SN-SHP-002](shapes-diagrams.md#sn-shp-002) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready, good first issue |

#### Context
Multi-segment polylines and closed polygons round out the shape set for diagrams and geometry (PRD-ED-096 SHOULD M3). They are created by tap-to-add-vertex or by holding to perfect a many-sided shape, and their nodes stay editable. This reuses the Shape object model ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)) for vertex geometry and node handles, and the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)) for the hold-to-perfect regular polygon path.

#### Scope
**In:** a polyline/polygon primitive; tap-to-add-vertex creation with a live preview; closing a polyline into a polygon; hold-to-perfect a regular N-gon via the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)); editable vertices via node handles ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)); numeric coordinate entry per vertex.
**Out:** fill of the enclosed polygon ([SN-SHP-013](shapes-diagrams.md#sn-shp-013)), connectors ([SN-SHP-010](shapes-diagrams.md#sn-shp-010)), and the recogniser math ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)).

#### Acceptance criteria
- [ ] Tap-to-add-vertex builds a polyline with a live preview of the pending segment.
- [ ] Closing the polyline (tap the first vertex or a close action) yields a polygon.
- [ ] Hold-to-perfect snaps a rough many-sided shape to a regular N-gon.
- [ ] Vertices are editable via node handles with numeric coordinate entry.
- [ ] The result commits as an editable Shape object with a vertex list.
- [ ] Vertex count is capped so a pathological polygon cannot exhaust resources (CWE-400).
- [ ] Polylines/polygons render correctly across the 17 looks and light+dark (golden).

#### Technical notes
Vertex-list geometry on the Shape object ([SN-SHP-007](shapes-diagrams.md#sn-shp-007) / [SN-CORE-002](storage.md#sn-core-002)); hold-to-perfect uses the polyline template and regular-polygon snap in the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002), ink-engine 9.2-9.3). Node editing reuses the handles from [SN-SHP-007](shapes-diagrams.md#sn-shp-007). Implements PRD-ED-096.

#### Security & privacy
None beyond baseline plus a vertex-count cap: geometry is note content, on-device, never logged; cap vertices to bound cost (CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7. Node editing has numeric coordinate entry (a11y non-drag alternative); tap-to-add-vertex has a visible pending-segment preview. Renders across all 17 looks and light+dark.

#### Test plan
app/test/editor/polygon_test.dart (tap-to-add, close, hold-to-perfect, vertex edit, cap), golden of polylines/polygons per look.

#### Dependencies
[SN-SHP-007](shapes-diagrams.md#sn-shp-007) (Shape object + node handles), [SN-SHP-002](shapes-diagrams.md#sn-shp-002) (regular-polygon recognition).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-012

<a id="sn-shp-012"></a>

**Implement the protractor / angle tool with numeric entry**

| Field | Value |
|---|---|
| GitHub | #680 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-006](shapes-diagrams.md#sn-shp-006), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
A protractor overlay measures and constrains angles with numeric entry and detents, directly serving the Physics/geometry persona (PRD-ED-099 SHOULD M3; screens persona). It complements the ruler ([SN-SHP-006](shapes-diagrams.md#sn-shp-006)): the ruler constrains to a line, the protractor constrains to an angle and reads out the angle of a drawn or selected segment.

#### Scope
**In:** a protractor overlay object; measuring the angle of a drawn or selected segment with a numeric readout; constraining new strokes to a set angle; angle detents at a configurable increment (for example 15 deg); drag to reposition and rotate; numeric angle entry.
**Out:** the ruler ([SN-SHP-006](shapes-diagrams.md#sn-shp-006)), general snapping to other objects ([SN-SHP-009](shapes-diagrams.md#sn-shp-009)), the snap haptic ([SN-SHP-017](shapes-diagrams.md#sn-shp-017)), and dimension labels ([SN-SHP-014](shapes-diagrams.md#sn-shp-014)).

#### Acceptance criteria
- [ ] The protractor renders as overlay chrome and can be dragged and rotated.
- [ ] It measures the angle of a drawn or selected segment and shows a numeric readout.
- [ ] It constrains new strokes to a set angle while active.
- [ ] Angle detents snap at a configurable increment (default 15 deg).
- [ ] Angle is settable via numeric entry.
- [ ] The readout is screen-reader-readable and the protractor keeps >= 4.5:1 contrast across the 17 looks and light+dark (golden).

#### Technical notes
Overlay chrome in sane_render (ink-engine 5.1); angle math reuses segment geometry from packages/sane_ink ([SN-INK-026](ink.md#sn-ink-026)); shares the reposition/rotate/numeric patterns of the ruler ([SN-SHP-006](shapes-diagrams.md#sn-shp-006)). Gesture wiring in the editor over [SN-ED-002](editor.md#sn-ed-002). Implements PRD-ED-099.

#### Security & privacy
None beyond baseline: measured geometry is note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7. Numeric angle readout and entry are inherently screen-reader-friendly; detents help precision without fine motor control; 44 pt / 48 dp handles. Renders across all 17 looks and light+dark.

#### Test plan
app/test/editor/protractor_test.dart (measure, constrain, detents, numeric entry), golden of the protractor per look.

#### Dependencies
[SN-SHP-006](shapes-diagrams.md#sn-shp-006) (shared overlay/numeric patterns), [SN-ED-002](editor.md#sn-ed-002) (editor tool state machine).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-013

<a id="sn-shp-013"></a>

**Implement fill and shade of enclosed regions**

| Field | Value |
|---|---|
| GitHub | #681 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-007](shapes-diagrams.md#sn-shp-007), [SN-SHP-009](shapes-diagrams.md#sn-shp-009) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Flood-fill an enclosed hand-drawn region with a threshold control, filling on a layer beneath the ink, and let template rules act as fill boundaries so a single ruled row or grid cell can be shaded in one tap (PRD-ED-097 MAY M3; PRD-ED-020 template-bounded fill). This is a delight/diagram feature (Physics diagrams, shaded regions), low priority but well specified. It fills beneath ink so strokes stay legible on top.

#### Scope
**In:** flood-fill of an enclosed region from a tap point with a threshold control (edge tolerance); filling on a layer beneath ink (the highlight/fill layer, PRD-ED-069); template-bounded fill so a single lined row or grid cell is shaded in one tap (PRD-ED-020); a visible outline preview of the target region; a resource cap on fill area.
**Out:** lasso recolour of strokes (SN-ED), the highlighter (SN-BRS / editor), and shape fill of a closed Shape object (handled by [SN-SHP-007](shapes-diagrams.md#sn-shp-007) stroke/fill).

#### Acceptance criteria
- [ ] Tapping inside an enclosed hand-drawn region fills it; an open region does not flood the whole page (bounded by the threshold + area cap).
- [ ] A threshold control adjusts edge tolerance.
- [ ] The fill lands on a layer beneath ink so it never covers strokes.
- [ ] Template lines and grid cells bound the fill so one ruled row or grid cell can be shaded in one tap (PRD-ED-020).
- [ ] The fill previews its target region with a visible outline (never colour alone) before commit.
- [ ] Fill area/iteration is capped so an unbounded region cannot exhaust memory (CWE-400); pixel reads are on-device only.
- [ ] Fills render correctly across the 17 looks and light+dark (golden).

#### Technical notes
Flood-fill runs against an on-device raster of the region with a bounded iteration budget (CWE-400); the fill is stored as a region object on the fill/highlight layer beneath ink (ink-engine 5.1; PRD-ED-069). Template boundaries come from the active paper template fill (PRD-ED-004). Reuse snapping/region detection from [SN-SHP-009](shapes-diagrams.md#sn-shp-009) where helpful. Implements PRD-ED-097 and PRD-ED-020. Run the fill off the UI isolate if it would exceed a frame budget (overview section 6).

#### Security & privacy
Sampling reads only on-device canvas pixels; the fill iteration/area is capped so a crafted region cannot cause a denial-of-service (CWE-400); nothing is logged. IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7. The target region is outlined before commit (not colour-only, a11y); threshold is numeric. Renders across all 17 looks and light+dark.

#### Test plan
packages/sane_ink/test/shape/flood_fill_test.dart (bounded fill, threshold, template-bounded, area cap), app/test/editor/fill_ui_test.dart, golden of fills per look.

#### Dependencies
[SN-SHP-007](shapes-diagrams.md#sn-shp-007) (fill layer / object), [SN-SHP-009](shapes-diagrams.md#sn-shp-009) (region/boundary detection).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-014

<a id="sn-shp-014"></a>

**Add live measure readout and attachable dimension labels**

| Field | Value |
|---|---|
| GitHub | #682 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-007](shapes-diagrams.md#sn-shp-007) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Live measurement of a drawn shape or selection with a status field (dimensions, zoom, rotation) and type-to-resize, plus attachable dimension labels, make diagrams precise and self-documenting (PRD-ED-101 MAY M3; the dimension-labels scope item). Numeric readouts are inherently accessible. This builds on the Shape object model ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)) and complements the protractor ([SN-SHP-012](shapes-diagrams.md#sn-shp-012)) for angles.

#### Scope
**In:** a live status field showing a shape/selection dimensions (length, width/height, radius, angle), current zoom and rotation; type-to-resize (set exact dimensions numerically); attachable dimension labels that annotate a shape edge with its measured length or angle and update when the shape is edited; locale-aware number formatting (intl).
**Out:** the protractor angle tool ([SN-SHP-012](shapes-diagrams.md#sn-shp-012)), the measure geometry primitives (reuse packages/sane_ink utils), and shape fill ([SN-SHP-013](shapes-diagrams.md#sn-shp-013)).

#### Acceptance criteria
- [ ] Selecting or drawing a shape shows a live dimensions readout (length, width/height, radius, angle as applicable), plus zoom and rotation.
- [ ] Type-to-resize sets exact dimensions and the shape updates.
- [ ] A dimension label can be attached to a shape edge and shows the measured length or angle.
- [ ] Dimension labels update automatically when the shape is edited/resized.
- [ ] Numbers are locale-formatted (intl) and the readout is screen-reader-readable.
- [ ] Readout and labels render correctly across the 17 looks and light+dark with sufficient contrast (golden).

#### Technical notes
Measurement uses segment/geometry utils in packages/sane_ink ([SN-INK-026](ink.md#sn-ink-026)); labels are lightweight annotation objects anchored to a Shape edge ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)) that recompute on edit; number formatting via intl (per PRD-ED-183 date/time formatting precedent). Implements PRD-ED-101 and the dimension-labels scope item.

#### Security & privacy
None beyond baseline: measured values are note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7. A numeric readout is inherently a11y-friendly; type-to-resize is the non-gesture path; labels keep sufficient contrast. Renders across all 17 looks and light+dark.

#### Test plan
app/test/editor/measure_test.dart (readout, type-to-resize), dimension_label_test.dart (attach, auto-update, locale format), golden per look.

#### Dependencies
[SN-SHP-007](shapes-diagrams.md#sn-shp-007) (Shape object being measured/labelled).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-015

<a id="sn-shp-015"></a>

**Add recognise-selection-to-shape for lassoed ink**

| Field | Value |
|---|---|
| GitHub | #683 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams, editor, ocr-hwr |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-002](shapes-diagrams.md#sn-shp-002), [SN-ED-004](editor.md#sn-ed-004), [SN-SHP-007](shapes-diagrams.md#sn-shp-007) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Beyond the hold-to-shape dwell, a user can lasso rough ink and explicitly convert it to clean vector geometry (circle/rect/arrow/line/triangle/polyline) from the selection bar (PRD-ED-087 SHOULD; PRD-ED-091 cross-reference). PRD-01 tags this M4 in its editor-centric numbering, but recognition work is remapped to M3 per docs/roadmap.md, so it lands in M3 Audio & Recognition. It reuses the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)), the lasso selection from the editor ([SN-ED-004](editor.md#sn-ed-004)) and the Shape object model ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)).

#### Scope
**In:** a selection-bar action Recognise shape that runs the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)) over the current lasso selection ([SN-ED-004](editor.md#sn-ed-004)) and replaces the ink with a fitted Shape object ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)); reversibility (a single undo step, original ink recoverable); a correction/choose affordance when confidence is low so a wrong guess is never applied silently; on-device recognition by default with any cloud assist per-request opt-in and a data-leaves-device indicator.
**Out:** the dwell trigger ([SN-SHP-003](shapes-diagrams.md#sn-shp-003)), convert-to-text (SN-HWR), the recogniser internals ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)), and the lasso selection tool itself ([SN-ED-004](editor.md#sn-ed-004)).

#### Acceptance criteria
- [ ] With a lasso selection active, Recognise shape fits the selected ink to a clean Shape object.
- [ ] Supported classes: line, arrow, rectangle, circle, ellipse, triangle, polyline (table = MAY, out of scope here).
- [ ] The result is an editable Shape object ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)).
- [ ] Conversion is a single undo step and the original ink is recoverable via Undo.
- [ ] A low-confidence result shows a correction/choose affordance (never a silent wrong guess).
- [ ] Recognition runs on-device by default; any cloud assist is per-request opt-in with a visible data-leaves-device indicator (decision 6).

#### Technical notes
Selection-bar action in the editor over the lasso selection ([SN-ED-004](editor.md#sn-ed-004)); calls [SN-SHP-002](shapes-diagrams.md#sn-shp-002) with the selected strokes centreline; the fitted result becomes a Shape object ([SN-SHP-007](shapes-diagrams.md#sn-shp-007) / [SN-CORE-002](storage.md#sn-core-002)). The correction affordance surfaces the top candidates with confidence. Implements PRD-ED-087. Keep the original ink recoverable (single undo) as ink-engine 9.4 requires.

#### Security & privacy
Recognition is on-device by default (screens section 12); any cloud escalation is explicit per-request opt-in with the data-leaves-device banner (decision 6). Ink is note content, on-device, never logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.4 (convert pattern / selection bar). Recognised shapes get semantic labels; the conversion is reversible; the low-confidence affordance is keyboard-reachable. Renders across all 17 looks and light+dark.

#### Test plan
app/test/editor/recognise_selection_test.dart (fit selected ink, supported classes, single-undo reversibility, low-confidence affordance, on-device default).

#### Dependencies
[SN-SHP-002](shapes-diagrams.md#sn-shp-002) (recogniser), [SN-ED-004](editor.md#sn-ed-004) (lasso selection), [SN-SHP-007](shapes-diagrams.md#sn-shp-007) (Shape object model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-016

<a id="sn-shp-016"></a>

**Build diagram mode with a shape and elements library**

| Field | Value |
|---|---|
| GitHub | #684 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | shapes-diagrams, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-009](shapes-diagrams.md#sn-shp-009), [SN-SHP-010](shapes-diagrams.md#sn-shp-010), [SN-SHP-004](shapes-diagrams.md#sn-shp-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-2`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
Diagram mode is the diagram-mode and shape-library scope item: a focused mode that combines the shape tool, connectors and snapping with a palette of reusable graphic elements (arrows, callouts, frames, common physics/chem symbols for the persona) inserted as editable vector objects (PRD-ED-117 Elements library MAY M3; PRD-ED-095 connectors; docs/design/pen-and-brush-spec.md section 7). It turns the editor into a flowchart/mind-map/diagram surface without heavy layer management, and it is a differentiator for the student persona.

#### Scope
**In:** a diagram mode that surfaces a shape/elements palette plus the connector tool ([SN-SHP-010](shapes-diagrams.md#sn-shp-010)) with snapping ([SN-SHP-009](shapes-diagrams.md#sn-shp-009)) on; a library of first-party bundled elements (arrows, callouts, frames, common physics/chem symbols) inserted as editable vector Shape objects; drag from palette onto the page; auto-suggest a connector when an element is dropped near another node; naming/labelling of palette items; user custom elements created from a selection following object rules.
**Out:** the connectors engine ([SN-SHP-010](shapes-diagrams.md#sn-shp-010)), the snapping engine ([SN-SHP-009](shapes-diagrams.md#sn-shp-009)), stickers/mascot art (SN-MED / SN-BRD), and the recogniser ([SN-SHP-002](shapes-diagrams.md#sn-shp-002)).

#### Acceptance criteria
- [ ] Diagram mode surfaces a shape/elements palette, the connector tool and snapping (on by default in the mode).
- [ ] Elements insert as editable vector Shape objects that scale without blur.
- [ ] Dropping an element near another object auto-suggests a connector between them.
- [ ] Palette items are named/labelled (not icon-only) and keyboard-reachable on web.
- [ ] Only first-party bundled elements ship; user custom elements (from a selection) are validated as untrusted input (schema/size caps, no embedded code) before insertion.
- [ ] The palette and elements render correctly across the 17 looks and light+dark (golden).

#### Technical notes
Diagram mode is an editor mode composing [SN-SHP-004](shapes-diagrams.md#sn-shp-004) (shape tool), [SN-SHP-010](shapes-diagrams.md#sn-shp-010) (connectors) and [SN-SHP-009](shapes-diagrams.md#sn-shp-009) (snapping); elements are bundled first-party vector assets inserted as Shape objects ([SN-SHP-007](shapes-diagrams.md#sn-shp-007)). User custom elements are created from a lassoed selection and stored as content-addressed encrypted blobs; validate their structure and size and never evaluate embedded code (the brush/asset importer hardening pattern, PRD-ED-065 / PRD-ED-046 A11y-Sec). Implements PRD-ED-117 and the diagram-mode scope item.

#### Security & privacy
Bundled elements are first-party assets. User custom elements are untrusted input: validate schema and size, reject unknown fields, cap embedded bitmaps, never execute embedded code or follow URLs (CWE-20). Geometry is note content, on-device, never logged. IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-2, CWE-20.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7 and docs/design/pen-and-brush-spec.md section 7 (smart connectors). Palette items are named; 44 pt / 48 dp targets; keyboard on web. Renders across all 17 looks and light+dark.

#### Test plan
app/test/editor/diagram_mode_test.dart (palette, connector tool, snapping-on, auto-connect on drop), elements_library_test.dart (insert, custom-element validation), golden of the palette per look.

#### Dependencies
[SN-SHP-009](shapes-diagrams.md#sn-shp-009) (snapping), [SN-SHP-010](shapes-diagrams.md#sn-shp-010) (connectors), [SN-SHP-004](shapes-diagrams.md#sn-shp-004) (shape tool).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHP-017

<a id="sn-shp-017"></a>

**Add haptic feedback on shape-complete and alignment snap**

| Field | Value |
|---|---|
| GitHub | #685 |
| Type | task |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, android-phone |
| Areas | shapes-diagrams, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHP-001](shapes-diagrams.md#sn-shp-001) |
| Depends on | [SN-SHP-003](shapes-diagrams.md#sn-shp-003), [SN-SHP-009](shapes-diagrams.md#sn-shp-009) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Fire a spatial haptic when a shape is recognised/closed or an alignment snap occurs, confirming the action without looking (PRD-ED-102 SHOULD M5; docs/design/pen-and-brush-spec.md section 7 snap haptics). On Apple this routes through UICanvasFeedbackGenerator (pathCompleted / alignmentOccurred) to Apple Pencil Pro where present; on supported Android it uses device haptics. It lands in M5 with stylus mastery. It is additive and must never be the only signal.

#### Scope
**In:** haptic hooks fired on shape-complete (from [SN-SHP-003](shapes-diagrams.md#sn-shp-003) / [SN-SHP-002](shapes-diagrams.md#sn-shp-002)) and on alignment snap (from [SN-SHP-009](shapes-diagrams.md#sn-shp-009)); native routing via the stylus plugin (UICanvasFeedbackGenerator on Apple, VibrationEffect on Android); respecting the system haptics-off setting; a visual confirm always accompanying the haptic; a clean no-op where unsupported (capability query, not platform check).
**Out:** the recognition/snap logic itself ([SN-SHP-002](shapes-diagrams.md#sn-shp-002) / [SN-SHP-009](shapes-diagrams.md#sn-shp-009)), the stylus plugin internals and Pencil Pro squeeze/roll (SN-PHN / sane_stylus), and the dwell trigger ([SN-SHP-003](shapes-diagrams.md#sn-shp-003)).

#### Acceptance criteria
- [ ] A haptic fires on shape recognition/close and on an alignment snap.
- [ ] On iPad it routes to Apple Pencil Pro via UICanvasFeedbackGenerator (pathCompleted / alignmentOccurred) where present.
- [ ] On supported Android it uses device haptics (VibrationEffect).
- [ ] It respects the system haptics-off setting (no haptic when disabled).
- [ ] A visual confirm always accompanies the haptic; the haptic is never the only signal.
- [ ] Where the capability is absent it no-ops cleanly (capability query, not a platform-string check).

#### Technical notes
Hooks in the editor call the stylus plugin (plugins/sane_stylus, Swift/Kotlin) over a Pigeon-typed method channel per ADR-0012; validate the small payload before use (CWE-20). APIs: UICanvasFeedbackGenerator pathCompleted/alignmentOccurred (docs/research apple-pencil section 1), Android VibrationEffect. Chosen by capability query (ADR-0008 pattern). Implements PRD-ED-102.

#### Security & privacy
The method-channel payload is attack surface: validate shape/size, hold no secrets (ADR-0012). No note content is involved; nothing is logged. IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-1, CWE-20.

#### UX notes
Surface: docs/design/pen-and-brush-spec.md section 7 (snap haptics). The haptic is an additive non-visual confirmation that helps low-vision users, never the only signal; respect system haptics-off (a11y). No new visible chrome beyond the existing visual confirm.

#### Test plan
app/test/editor/haptic_test.dart (fires on shape-complete and snap, respects haptics-off, capability no-op), plugins/sane_stylus/test for payload validation.

#### Dependencies
[SN-SHP-003](shapes-diagrams.md#sn-shp-003) (shape-complete events), [SN-SHP-009](shapes-diagrams.md#sn-shp-009) (alignment-snap events). Coordinates with SN-PHN / sane_stylus for the native haptic plugin.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md (CODEOWNERS review for the native/plugin path)

---

