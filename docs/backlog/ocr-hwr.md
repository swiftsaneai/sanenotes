# Backlog — area: ocr-hwr

50 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-BTY-001](ocr-hwr.md#sn-bty-001) **Beautify handwriting while keeping the writer's own hand** (epic · M3 Audio & Recognition)
  - [SN-BTY-002](ink.md#sn-bty-002) **Model beautification as a reversible derived overlay on the original ink** · p0 · feature · L · M3 Audio & Recognition
  - [SN-BTY-003](ocr-hwr.md#sn-bty-003) **Segment raw ink into glyphs, words, lines and text blocks** · p1 · feature · L · M3 Audio & Recognition
  - [SN-BTY-004](ocr-hwr.md#sn-bty-004) **Estimate baselines and straighten drifting lines of handwriting** · p1 · feature · L · M3 Audio & Recognition
  - [SN-BTY-005](ocr-hwr.md#sn-bty-005) **Normalise handwriting slant toward the writer's own dominant angle** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BTY-006](ocr-hwr.md#sn-bty-006) **Normalise glyph size and x-height across a line and across a page** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BTY-007](ocr-hwr.md#sn-bty-007) **Normalise word and letter spacing and reflow around corrected words** · p1 · feature · L · M3 Audio & Recognition
  - [SN-BTY-008](ink.md#sn-bty-008) **Regularise stroke geometry without losing pressure, tilt or brush character** · p1 · feature · L · M3 Audio & Recognition
  - [SN-BTY-009](ink.md#sn-bty-009) **Refine the just-finished word in real time within the frame budget** · p1 · feature · L · M3 Audio & Recognition
  - [SN-BTY-010](editor.md#sn-bty-010) **Beautify a lasso selection or a whole page with progress and cancel** · p1 · feature · M · M3 Audio & Recognition
  - [SN-BTY-011](settings.md#sn-bty-011) **Add a beautify intensity control with per-notebook and per-action scope** · p1 · feature · M · M3 Audio & Recognition
  - [SN-BTY-012](editor.md#sn-bty-012) **Wire beautification into undo/redo with a restore-my-writing revert** · p0 · feature · M · M3 Audio & Recognition
  - [SN-BTY-013](editor.md#sn-bty-013) **Show a before/after preview of beautification before committing** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BTY-014](perf.md#sn-bty-014) **Run beautification incrementally off the draw path within hard budgets** · p0 · feature · M · M3 Audio & Recognition
  - [SN-BTY-019](ocr-hwr.md#sn-bty-019) **Model the personal handwriting style profile and its encrypted local store** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-BTY-020](ocr-hwr.md#sn-bty-020) **Learn the writer's glyph shapes and style statistics from their own ink** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-BTY-021](ocr-hwr.md#sn-bty-021) **Score personal-style coverage and fall back when the samples are too few** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-BTY-022](privacy.md#sn-bty-022) **Show what the style model has learned, pause learning, and export it** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-BTY-023](ocr-hwr.md#sn-bty-023) **Synthesise any string as ink in the writer's own hand** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-BTY-024](ink.md#sn-bty-024) **Commit synthesised ink through the real brush pipeline so corrections blend in** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-BTY-025](ocr-hwr.md#sn-bty-025) **Suggest instead of applying when the re-render is not confidently in your hand** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-BTY-026](ocr-hwr.md#sn-bty-026) **Detect misspelled handwritten words on-device with dictionary-aware suppression** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-BTY-027](ocr-hwr.md#sn-bty-027) **Flag misspellings in the ink layer and correct them in the writer's own hand** · p1 · feature · L · M4 Identity, Sync & Privacy
  - [SN-BTY-028](ocr-hwr.md#sn-bty-028) **Add opt-in handwriting word completion rendered in the writer's hand** · p3 · feature · M · M4 Identity, Sync & Privacy
  - [SN-BTY-029](ocr-hwr.md#sn-bty-029) **Surface non-intrusive grammar and structure suggestions from the on-device model** · p3 · feature · M · M4 Identity, Sync & Privacy
  - [SN-BTY-030](ocr-hwr.md#sn-bty-030) **Apply a word-level ink edit as one atomic correct, insert or delete transaction** · p1 · feature · L · M3 Audio & Recognition
  - [SN-BTY-031](ocr-hwr.md#sn-bty-031) **Bound reflow to its own block and column so unrelated ink never moves** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BTY-032](ocr-hwr.md#sn-bty-032) **Align handwritten lists, bullets, indents and margins in a beautify pass** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BTY-033](ocr-hwr.md#sn-bty-033) **Snap handwriting to the page template's ruled lines and grid on request** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BTY-034](shapes-diagrams.md#sn-bty-034) **Tidy sketched boxes and arrows in a beautify pass via the shape recogniser** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BTY-035](i18n.md#sn-bty-035) **Define per-script beautification tiers and default unvalidated scripts to off** · p1 · feature · L · M3 Audio & Recognition
  - [SN-BTY-036](i18n.md#sn-bty-036) **Detect the script and language of each handwritten block for bilingual pages** · p1 · feature · M · M3 Audio & Recognition
  - [SN-BTY-037](ocr-hwr.md#sn-bty-037) **Enforce the never-change-meaning rule for every beautification edit** · p0 · security · L · M3 Audio & Recognition
  - [SN-BTY-038](ocr-hwr.md#sn-bty-038) **Build the do-not-correct adversarial corpus and gate spelling changes on it** · p0 · test · M · M6 Collaboration, Sharing & Sage AI
  - [SN-BTY-039](ocr-hwr.md#sn-bty-039) **Never beautify protected regions and hand maths to the math pipeline** · p1 · feature · L · M3 Audio & Recognition
  - [SN-BTY-040](a11y.md#sn-bty-040) **Add the tremor-aware beautification profile for Parkinson’s and essential tremor** · p1 · feature · M · M3 Audio & Recognition
  - [SN-BTY-041](a11y.md#sn-bty-041) **Add dysgraphia and dyspraxia profiles with personal letter-form normalisation** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-BTY-042](a11y.md#sn-bty-042) **Expose beautification strength as an accessibility setting with an extended range** · p1 · feature · M · M3 Audio & Recognition
  - [SN-BTY-043](a11y.md#sn-bty-043) **Tune beautification for one-handed and phone-sized handwriting** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-BTY-044](qa.md#sn-bty-044) **Assemble the labelled messy-handwriting corpus with synthetic tremor** · p1 · test · L · M3 Audio & Recognition
  - [SN-BTY-045](qa.md#sn-bty-045) **Define the beautification quality bar: legibility, consistency and accuracy metrics** · p1 · test · M · M3 Audio & Recognition
  - [SN-BTY-046](ci-cd.md#sn-bty-046) **Gate beautification quality in CI so a model change cannot make output worse** · p1 · infra · M · M3 Audio & Recognition
  - [SN-BTY-047](ocr-hwr.md#sn-bty-047) **Add the does-it-still-look-like-me style-similarity guard** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-BTY-048](ocr-hwr.md#sn-bty-048) **Ship beautification models within a size, integrity and offline budget** · p1 · task · L · M3 Audio & Recognition
  - [SN-BTY-049](compat.md#sn-bty-049) **Define beautification capability tiers and degrade gracefully with no model** · p1 · feature · M · M3 Audio & Recognition
  - [SN-BTY-050](privacy.md#sn-bty-050) **Confine the handwriting style model: plain-language consent, no backup, no sync** · p0 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-BTY-051](onboarding.md#sn-bty-051) **Introduce beautification with a before/after demo Sage offers exactly once** · p2 · feature · M · M3 Audio & Recognition
  - [SN-BTY-052](telemetry.md#sn-bty-052) **Measure beautification acceptance and reverts with opt-in, content-free telemetry** · p2 · feature · M · M4 Identity, Sync & Privacy
- [SN-HWR-001](ocr-hwr.md#sn-hwr-001) **Build on-device handwriting recognition, OCR, math & shape engine (sane_ml)** (epic · M3 Audio & Recognition)
  - [SN-HWR-002](ocr-hwr.md#sn-hwr-002) **Define sane_ml capability interfaces + on-device-first registry + mocks** · p1 · task · L · M3 Audio & Recognition
  - [SN-HWR-003](ocr-hwr.md#sn-hwr-003) **Implement ML Kit Digital Ink Recognition adapter for ink-to-text** · p1 · feature · L · M3 Audio & Recognition
  - [SN-HWR-004](ocr-hwr.md#sn-hwr-004) **Add recognition model download & lifecycle manager with integrity checks** · p1 · feature · L · M3 Audio & Recognition
  - [SN-HWR-005](ocr-hwr.md#sn-hwr-005) **Implement web ink-to-text recognition fallback path** · p2 · feature · M · M3 Audio & Recognition
  - [SN-HWR-006](ocr-hwr.md#sn-hwr-006) **Run background non-destructive recognition into the search index** · p1 · feature · L · M3 Audio & Recognition
    - [SN-HWR-021](ocr-hwr.md#sn-hwr-021) **Provide OCR-backed alt-text and accessibility for handwritten content** · p1 · task · S · M3 Audio & Recognition
  - [SN-HWR-007](ocr-hwr.md#sn-hwr-007) **Add lasso convert-to-text producing an editable text object** · p1 · feature · M · M3 Audio & Recognition
  - [SN-HWR-008](ocr-hwr.md#sn-hwr-008) **Build recognition confidence and correction UX** · p2 · feature · M · M3 Audio & Recognition
  - [SN-HWR-009](ocr-hwr.md#sn-hwr-009) **Add convert-as-you-write live recognition mode** · p3 · feature · M · M3 Audio & Recognition
  - [SN-HWR-010](ocr-hwr.md#sn-hwr-010) **Implement image OCR adapters (Vision, ML Kit, PaddleOCR, Tesseract.js)** · p1 · feature · L · M3 Audio & Recognition
  - [SN-HWR-011](ocr-hwr.md#sn-hwr-011) **OCR text-layerless PDFs on import for searchable text** · p1 · feature · M · M3 Audio & Recognition
  - [SN-HWR-012](ocr-hwr.md#sn-hwr-012) **Build shape recognition and beautification engine** · p2 · feature · L · M3 Audio & Recognition
  - [SN-HWR-013](ocr-hwr.md#sn-hwr-013) **Provide handwriting refine, straighten and reflow backing** · p2 · feature · M · M3 Audio & Recognition
  - [SN-HWR-014](ocr-hwr.md#sn-hwr-014) **Add math recognition producing typeset expressions and LaTeX** · p2 · feature · L · M3 Audio & Recognition
  - [SN-HWR-015](ocr-hwr.md#sn-hwr-015) **Implement worked step-by-step math solving (Pro-gated)** · p2 · feature · L · M3 Audio & Recognition
  - [SN-HWR-016](ocr-hwr.md#sn-hwr-016) **Add a custom recognition dictionary (per-profile, language-scoped)** · p2 · feature · M · M3 Audio & Recognition
  - [SN-HWR-017](ocr-hwr.md#sn-hwr-017) **Add handwriting spellcheck that preserves the writer's style** · p3 · feature · M · M3 Audio & Recognition
  - [SN-HWR-018](ocr-hwr.md#sn-hwr-018) **Surface data detectors over recognised handwriting and text** · p3 · feature · M · M3 Audio & Recognition
  - [SN-HWR-019](ocr-hwr.md#sn-hwr-019) **Gate cloud recognition behind per-request opt-in with a leave-device banner** · p0 · security · M · M3 Audio & Recognition
  - [SN-HWR-020](ocr-hwr.md#sn-hwr-020) **Build recognition accuracy evaluation datasets and test harness** · p2 · test · M · M3 Audio & Recognition
  - [SN-HWR-022](ocr-hwr.md#sn-hwr-022) **Add whole-document translation for pages and PDFs** · p2 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-GCMP-015](shapes-diagrams.md#sn-gcmp-015) **Add equation graphing (2D/3D plots) in notes** · p3 · feature · L · Backlog
  - [SN-GCMP-018](ocr-hwr.md#sn-gcmp-018) **Build the live-unit physics/math scratchpad** · p2 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-GA11-026](ocr-hwr.md#sn-ga11-026) **Order RTL and vertical-script transcripts correctly in OCR and reading mode** · p3 · feature · M · M3 Audio & Recognition

---

## Issues

### SN-BTY-001

<a id="sn-bty-001"></a>

**Beautify handwriting while keeping the writer's own hand**

| Field | Value |
|---|---|
| GitHub | #1154 |
| Type | epic |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, ink, editor |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-INK-001](ink.md#sn-ink-001), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `MASVS-NETWORK-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context
Every serious note app now ships a way to make messy handwriting legible, and the market has split into two philosophies. Nebo and Goodnotes' lasso-convert **replace** ink with a typeface; Apple's **Smart Script** (iPadOS 18+) and Goodnotes' Apple-only "spellcheck in your handwriting style" **keep the writer's hand** and only make it neater (docs/research/sources/apple-notes-freeform.md §2; docs/research/sources/goodnotes-userguide-inventory.md lines 306, 322; docs/research/sources/samsung-notes-nebo-other.md §Samsung "Straighten / Clean up"). Sane Notes does the second, and does it on **iPad, Android tablet, Web, iPhone and Android phone** — today Smart Script is iPad-only and Goodnotes' spellcheck is Apple-only, which is exactly the platform gap docs/research/sources/goodnotes-userguide-inventory.md line 595 calls out as our clearest differentiator.

The product promise: **your handwriting, still yours, just tidier.** Baselines level out, slant and letter size stop wandering, spacing evens up, tremor and wobble are damped, and a misspelled word can be re-rendered in *your* hand — never in a font. Nothing is ever destroyed: the original strokes remain the source of truth and one gesture brings them back. This is conversion to text's opposite; [SN-HWR-007](ocr-hwr.md#sn-hwr-007) (lasso convert-to-text) stays the separate, explicit, Pro-gated action, and [SN-HWR-006](ocr-hwr.md#sn-hwr-006) background recognition continues to feed search without touching ink.

This epic owns the engine and the editor integration. It supersedes the internals of the coarse first-cut backing stub [SN-HWR-013](ocr-hwr.md#sn-hwr-013) (Refine / Straighten / Reflow) and supplies the style-preserving re-render that [SN-HWR-017](ocr-hwr.md#sn-hwr-017) handwriting spellcheck calls into; the PRD-ED-187 command names on the selection bar do not change. It must obey locked decision 6 (on-device by default, cloud only per-request opt-in), locked decision 7 (never a frame over 16.7 ms while writing) and docs/adr/0016-on-device-ml-and-ai.md.

#### Scope
**In:** the non-destructive beautification data model and its CRDT/`.sanenote` round trip; ink segmentation into glyphs/words/lines/blocks; baseline, slant and size normalisation; spacing normalisation and reflow; stroke-level regularisation that preserves pressure, tilt and brush character; real-time (post-pen-up) and retroactive (lasso/page) modes; the Off/Light/Neat intensity control; undo/redo and a visible "restore my original writing" affordance; a before/after preview; and the performance discipline that keeps all of it off the draw path.
**Out:** ink-to-text conversion ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)), background recognition and search indexing ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)), shape snapping ([SN-SHP-001](shapes-diagrams.md#sn-shp-001)), math ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)), grammar/rewrite by Sage ([SN-AI-001](ai.md#sn-ai-001)), and the writing-guideline aid PRD-ED-188.

Writer style-model work (learning a per-writer glyph exemplar set and synthesising a replacement word in the writer's own hand), the spelling detection-and-re-render flow, the beautify UX surfaces, and the legibility evaluation corpus are tracked as separate issue files **under this same epic** — every one of them carries `parent: SN-BTY-001`.

#### Acceptance criteria
- [ ] Beautified writing is still recognisably the same person's hand: a blind panel of 10 raters scores "is this the same writer?" at >= 90% agreement on the evaluation corpus at the Neat intensity.
- [ ] Legibility improves measurably: recognition confidence from [SN-HWR-003](ocr-hwr.md#sn-hwr-003) over beautified ink rises by >= 12% relative on the messy-handwriting slice of the corpus, with zero words whose recognised text changes meaning.
- [ ] Every beautification is reversible to byte-identical original strokes at word, line, selection, page and notebook granularity, after an app restart and after a CRDT sync merge.
- [ ] With real-time beautify on, pen-to-pixel latency is unchanged within 1 ms (95% CI) on all three reference devices and no frame exceeds 16.7 ms while writing.
- [ ] The whole feature runs on-device with no network path; beautification is Off by default and can be disabled permanently per profile and per notebook.
- [ ] All child issues below are closed.

### Children

**Core engine & editor**
- [ ] [SN-BTY-002](ink.md#sn-bty-002) Non-destructive overlay data model (foundation for everything else)
- [ ] [SN-BTY-003](ocr-hwr.md#sn-bty-003) Glyph / word / line / block segmentation
- [ ] [SN-BTY-004](ocr-hwr.md#sn-bty-004) Baseline estimation and straightening
- [ ] [SN-BTY-005](ocr-hwr.md#sn-bty-005) Slant normalisation toward the writer's dominant angle
- [ ] [SN-BTY-006](ocr-hwr.md#sn-bty-006) Size and x-height normalisation
- [ ] [SN-BTY-007](ocr-hwr.md#sn-bty-007) Word/letter spacing normalisation and reflow
- [ ] [SN-BTY-008](ink.md#sn-bty-008) Stroke regularisation preserving pressure, tilt and brush
- [ ] [SN-BTY-009](ink.md#sn-bty-009) Real-time "as you write" refinement
- [ ] [SN-BTY-010](editor.md#sn-bty-010) Retroactive selection/page beautification with progress and cancel
- [ ] [SN-BTY-011](settings.md#sn-bty-011) Off / Light / Neat intensity control
- [ ] [SN-BTY-012](editor.md#sn-bty-012) Undo/redo integration and the revert affordance
- [ ] [SN-BTY-013](editor.md#sn-bty-013) Before/after preview
- [ ] [SN-BTY-014](perf.md#sn-bty-014) Incremental background-isolate execution and budgets

**Writer style model & synthesis**
- [ ] [SN-BTY-019](ocr-hwr.md#sn-bty-019) Personal handwriting style profile + encrypted local store
- [ ] [SN-BTY-020](ocr-hwr.md#sn-bty-020) Learn the writer's glyph shapes and style statistics
- [ ] [SN-BTY-021](ocr-hwr.md#sn-bty-021) Style-coverage scoring and data-maturity fallback tiers
- [ ] [SN-BTY-022](privacy.md#sn-bty-022) Inspect / pause / export the style model
- [ ] [SN-BTY-023](ocr-hwr.md#sn-bty-023) Synthesise a string as ink in the writer's own hand
- [ ] [SN-BTY-024](ink.md#sn-bty-024) Commit synthesised ink through the real brush pipeline
- [ ] [SN-BTY-025](ocr-hwr.md#sn-bty-025) Suggest-don't-apply gate when the re-render is not confidently yours

**Spelling, grammar & word edits**
- [ ] [SN-BTY-026](ocr-hwr.md#sn-bty-026) On-device handwriting misspelling detection
- [ ] [SN-BTY-027](ocr-hwr.md#sn-bty-027) In-ink spelling flag and correction in the writer's own hand
- [ ] [SN-BTY-028](ocr-hwr.md#sn-bty-028) Opt-in handwriting word completion
- [ ] [SN-BTY-029](ocr-hwr.md#sn-bty-029) Non-intrusive grammar and structure suggestions
- [ ] [SN-BTY-030](ocr-hwr.md#sn-bty-030) Atomic word-level correct / insert / delete transaction

**Structure, layout & multi-script**
- [ ] [SN-BTY-031](ocr-hwr.md#sn-bty-031) Bound reflow to its own block and column
- [ ] [SN-BTY-032](ocr-hwr.md#sn-bty-032) Align lists, bullets, indents and margins
- [ ] [SN-BTY-033](ocr-hwr.md#sn-bty-033) Snap handwriting to the page template's ruled lines
- [ ] [SN-BTY-034](shapes-diagrams.md#sn-bty-034) Tidy sketched boxes and arrows via the shape recogniser
- [ ] [SN-BTY-035](i18n.md#sn-bty-035) Per-script beautification tiers (unvalidated scripts off)
- [ ] [SN-BTY-036](i18n.md#sn-bty-036) Per-block script and language detection for bilingual pages

**Safety, quality, accessibility & rollout**
- [ ] [SN-BTY-037](ocr-hwr.md#sn-bty-037) Never-change-meaning enforcement gate
- [ ] [SN-BTY-038](ocr-hwr.md#sn-bty-038) Do-not-correct adversarial corpus and CI gate
- [ ] [SN-BTY-039](ocr-hwr.md#sn-bty-039) Protected-region exclusions and math hand-off
- [ ] [SN-BTY-040](a11y.md#sn-bty-040) Tremor-aware beautification profile
- [ ] [SN-BTY-041](a11y.md#sn-bty-041) Dysgraphia and dyspraxia letter-form profiles
- [ ] [SN-BTY-042](a11y.md#sn-bty-042) Beautification strength as an accessibility setting
- [ ] [SN-BTY-043](a11y.md#sn-bty-043) One-handed and phone-sized handwriting tuning
- [ ] [SN-BTY-044](qa.md#sn-bty-044) Labelled messy-handwriting corpus with synthetic tremor
- [ ] [SN-BTY-045](qa.md#sn-bty-045) Beautification quality bar and metrics
- [ ] [SN-BTY-046](ci-cd.md#sn-bty-046) CI gate so a model change cannot make output worse
- [ ] [SN-BTY-047](ocr-hwr.md#sn-bty-047) "Does it still look like me" style-similarity guard
- [ ] [SN-BTY-048](ocr-hwr.md#sn-bty-048) Ship beautification models within a size/integrity/offline budget
- [ ] [SN-BTY-049](compat.md#sn-bty-049) Device-capability tiers and graceful no-model degradation
- [ ] [SN-BTY-050](privacy.md#sn-bty-050) Confine the style model: consent, no backup, no sync
- [ ] [SN-BTY-051](onboarding.md#sn-bty-051) One-time Sage before/after introduction
- [ ] [SN-BTY-052](telemetry.md#sn-bty-052) Opt-in, content-free acceptance/revert telemetry

#### Technical notes
New pure-Dart subsystem `packages/sane_ml/lib/src/beautify/` (segmentation, baseline/slant/size/spacing estimators, transform planner) plus geometry primitives reused from `packages/sane_ink` (`geometry/`, `index/rtree.dart`, `filter/one_euro.dart` — docs/architecture/ink-engine.md §§2, 7, 9). Beautified geometry is **re-rendered through the existing pipeline**: a transformed `Stroke.points` list goes back through `sane_ink` `StrokeGeometry` and the stroke's `sane_brushes` `PenPreset`, so there is never a second renderer and every brush keeps its character (docs/design/pen-and-brush-spec.md §1.1, §9). Model changes land in `packages/sane_core` (new derived-overlay object + op types, [SN-CORE-010](sync.md#sn-core-010)). Editor commands and state live in `app/lib/features/editor/beautify/` behind Riverpod providers; nothing crosses a package sideways (CLAUDE.md §3 DAG). Recognition hints (word boxes, language, confidence) come from `sane_ml`'s `InkRecognizer` via [SN-HWR-003](ocr-hwr.md#sn-hwr-003)/[SN-HWR-006](ocr-hwr.md#sn-hwr-006); the engine degrades to purely geometric beautification when no recognition model is installed.

#### Security & privacy
Ink, recognised text and the writer style profile are note content: they stay on-device, are E2E-encryptable on sync and are never logged (MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-532, TM-I-05). No beautification path may call the network — there is no cloud escalation for this feature at all, which is stronger than ADR-0016's per-request opt-in baseline (MASVS-NETWORK-1, TM-I-08). The integrity threat specific to this epic is **silent meaning change**: an automatic transform must never alter what a note says. Mitigations are enforced in the children — original strokes immutable, every change reversible, spelling corrections always user-confirmed, and hard caps on every geometric transform.

#### UX notes
Surfaces: the selection action bar ([SN-ED-011](editor.md#sn-ed-011), design/Sane Notes.dc.html §7.4) carries Refine / Straighten / Reflow per PRD-ED-187; a Beautify row lands in the Handwriting & stylus settings tab ([SN-SET-007](settings.md#sn-set-007)); the page menu carries "Beautify page" and "Restore my original writing". All chrome uses `sane_ui` tokens and must render in all 17 looks, light and dark. Animations respect Reduce Motion ([SN-A11Y-006](a11y.md#sn-a11y-006)). The feature is presented as an aid, never as a judgement of the user's handwriting; copy is warm and the off switch is obvious.

#### Test plan
Per-child unit tests in `packages/sane_ml/test/beautify/`; golden before/after sets in `app/test/golden/beautify/`; an end-to-end `app/integration_test/beautify_test.dart` covering write → refine → revert → sync-merge → revert-again; perf scenarios `beautify_realtime` and `beautify_page` in `tools/perf_harness` gated in CI ([SN-PERF-003](perf.md#sn-perf-003)).

#### Dependencies
SN-INK-001 (ink engine), SN-HWR-001 (recognition engine). Children carry the fine-grained dependencies.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md PRD-ED-187)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text or note content in logs (TM-I-05)

---

### SN-BTY-003

<a id="sn-bty-003"></a>

**Segment raw ink into glyphs, words, lines and text blocks**

| Field | Value |
|---|---|
| GitHub | #1156 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, ink |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-HWR-006](ocr-hwr.md#sn-hwr-006) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
Nothing structural can be fixed until the engine knows what a *word* and a *line* are. A page of ink is an unordered soup of strokes; baseline straightening ([SN-BTY-004](ocr-hwr.md#sn-bty-004)), slant ([SN-BTY-005](ocr-hwr.md#sn-bty-005)), size ([SN-BTY-006](ocr-hwr.md#sn-bty-006)) and spacing/reflow ([SN-BTY-007](ocr-hwr.md#sn-bty-007)) all operate on groups, and the revert granularity promised by [SN-BTY-002](ink.md#sn-bty-002) is expressed in the same units. This issue builds the segmentation layer: strokes → glyph clusters → words → lines → blocks, with stable ids so a scope survives an edit.

We have two signals no image-based system has: stroke order with microsecond timestamps (docs/architecture/ink-engine.md §1.2) and, where a model is installed, word bounding boxes from ML Kit Digital Ink via [SN-HWR-003](ocr-hwr.md#sn-hwr-003). The segmenter fuses them and must still work with the geometric signal alone, because a language pack may not be downloaded ([SN-HWR-004](ocr-hwr.md#sn-hwr-004)).

#### Scope
**In:** temporal-spatial clustering of strokes into glyph clusters; diacritic and ligature attachment (i-dots, t-bars, accents, Devanagari shirorekha, Arabic dots) by vertical/horizontal overlap rather than time; word grouping by an adaptive inter-cluster gap threshold; line finding by horizontal projection profile with slant-aware skew search; reading order within a line and between lines including RTL and CJK column layouts; block grouping (paragraph, list item, margin note) using line spacing and left-edge alignment; list and bullet detection (leading marker glyph plus a hanging indent); stable `SegmentId`s that survive incremental edits; and an incremental update path that re-segments only the affected neighbourhood when a stroke is added or erased.
**Out:** recognition of the actual characters ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)); any geometry change; table structure ([SN-TXT-001](text.md#sn-txt-001)); the editor UI.

#### Acceptance criteria
- [ ] Word-grouping F1 >= 0.97 and line-grouping F1 >= 0.99 on the labelled segmentation corpus (>= 200 pages spanning Latin cursive, Latin print, Devanagari, Arabic and CJK, plus a left-handed and a tremor slice).
- [ ] Diacritics and t-bars attach to their parent glyph cluster in >= 99% of labelled cases even when written after the rest of the word (a later timestamp must not split them off).
- [ ] Reading order is correct for RTL Arabic lines and for top-to-bottom CJK columns; a mixed LTR/RTL line is ordered per the Unicode bidi base direction of the recognised text where available, else by geometry.
- [ ] Full segmentation of a 1,000-stroke page completes in <= 60 ms p95 on the Tier-2 reference Android tablet; an incremental update after a single new stroke completes in <= 4 ms p95.
- [ ] Segmentation runs with recognition unavailable (no language pack) and still meets word F1 >= 0.92 on the Latin slice; a missing model is never an error.
- [ ] `SegmentId`s are stable: adding a word at the end of a line does not change the ids of existing words (asserted by test).

#### Technical notes
`packages/sane_ml/lib/src/beautify/segment/` — `glyph_cluster.dart`, `word_grouper.dart`, `line_finder.dart`, `block_grouper.dart`, `reading_order.dart`. Neighbour queries use the page R-tree from `sane_ink/lib/src/index/rtree.dart` (docs/architecture/ink-engine.md §7) rather than an O(n^2) scan. Pipeline: (1) per-stroke AABB + lower-contour extraction; (2) glyph clusters by bbox overlap/proximity within `0.35 * estimatedXHeight` plus a time-gap heuristic, with a separate diacritic pass keyed on vertical overlap and small area; (3) line finding by a horizontal projection profile of ink mass, smoothed with a Gaussian of sigma = 0.25 * x-height, taking valleys as separators, searched over skew angles -12..+12 degrees in 1-degree steps to handle a tilted page; (4) word grouping with a threshold of `k * median(intra-word gap)` where k is fitted per line (a bimodal split of the gap histogram, Otsu-style, is the robust default); (5) blocks by line-pitch similarity and left-edge alignment histogram. Where [SN-HWR-003](ocr-hwr.md#sn-hwr-003) word boxes exist they are used as a prior and to arbitrate ambiguous gaps; recognition confidence below 0.4 is ignored. Output is an immutable `PageSegmentation` value object consumed by every later stage and cached per page revision. Estimated x-height bootstrap uses the median stroke height of the page before the real estimator in [SN-BTY-006](ocr-hwr.md#sn-bty-006) refines it.

#### Security & privacy
Purely local computation over note content (MASVS-PRIVACY-1); no network. Segmentation never logs ink coordinates, word boxes or recognised text (CWE-532, TM-I-05). Bound the work: cap strokes considered per page-chunk and abort with a `Failure` rather than allocating without limit on an adversarial imported document (CWE-400, TM-D-01). Runs off the UI isolate ([SN-BTY-014](perf.md#sn-bty-014)).

#### UX notes
No direct UI, but segmentation decides what the user sees selected when they tap a beautified word and what "restore this word" means, so mis-segmentation is user-visible. When confidence in a word boundary is low, later stages must prefer doing nothing over doing something wrong. Segment bounds also feed the accessible canvas tree ([SN-A11Y-003](a11y.md#sn-a11y-003)) so screen readers can walk words in reading order.

#### Test plan
`packages/sane_ml/test/beautify/segmentation_test.dart` (clusters, diacritics, gap thresholding, stability of ids), `packages/sane_ml/test/beautify/reading_order_test.dart` (RTL, CJK columns, mixed bidi), `packages/sane_ml/test/beautify/segmentation_corpus_test.dart` (F1 gates against the labelled corpus, marked as the accuracy gate), and a perf microbenchmark in `tools/perf_harness` for the 1,000-stroke and incremental cases.

#### Dependencies
SN-HWR-003 (ML Kit Digital Ink word boxes and confidences), SN-HWR-006 (background recognition results per page). Geometry/R-tree from [SN-INK-001](ink.md#sn-ink-001).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md PRD-ED-187)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text or note content in logs (TM-I-05)

---

### SN-BTY-004

<a id="sn-bty-004"></a>

**Estimate baselines and straighten drifting lines of handwriting**

| Field | Value |
|---|---|
| GitHub | #1157 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, ink |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-002](ink.md#sn-bty-002), [SN-BTY-003](ocr-hwr.md#sn-bty-003) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
Drifting lines are the most visible symptom of messy handwriting and the first thing Samsung's one-tap "Straighten" and Apple's Smart Script "Straighten" fix (docs/research/sources/samsung-notes-nebo-other.md §Samsung; docs/research/sources/apple-notes-freeform.md §2). On blank or dotted paper a line typically sags or climbs several degrees across a page, and the fix that reads as *tidy* rather than *machine-made* is a gentle per-word correction along an estimated baseline, not a rigid rotation of the whole line.

This issue estimates the four-line model (descender, baseline, corpus/x-height, ascender) for every line from [SN-BTY-003](ocr-hwr.md#sn-bty-003), then plans a transform that pulls words onto a level baseline while preserving the vertical relationships **inside** a word — if the writer's "g" hangs low and their "t" pokes high, it still does.

#### Scope
**In:** robust baseline and corpus-line estimation per line; a page-level skew estimate; a transform planner that levels a line with a monotone piecewise-linear warp anchored at word centres; per-word similarity transforms (rotation + translation only) emitted into the overlay of [SN-BTY-002](ink.md#sn-bty-002); hard safety caps; exclusion rules for content that is deliberately off-baseline (superscripts, subscripts, fractions and math regions, annotations written in a margin at an angle, struck-through text); and honouring ruled-paper templates so the straightened baseline snaps to the printed rule when one is within tolerance.
**Out:** slant ([SN-BTY-005](ocr-hwr.md#sn-bty-005)), size ([SN-BTY-006](ocr-hwr.md#sn-bty-006)), horizontal spacing ([SN-BTY-007](ocr-hwr.md#sn-bty-007)), per-stroke smoothing ([SN-BTY-008](ink.md#sn-bty-008)).

#### Acceptance criteria
- [ ] Residual baseline error after straightening is <= 0.08 * x-height RMS per line on the evaluation corpus (measured as the deviation of estimated per-word baseline points from the fitted level line).
- [ ] Intra-word vertical relationships are preserved: for every word, the vector from each glyph cluster's lowest point to the word baseline changes by <= 0.02 * x-height relative to the original.
- [ ] Safety caps hold in every case: no word is rotated more than 8 degrees, translated vertically more than 0.35 * x-height, or moved horizontally at all by this stage.
- [ ] Baseline estimation is robust to descenders: a line where 40% of words carry descenders (p, g, y, q) produces a baseline within 0.05 * x-height of the hand-labelled one (RANSAC/Theil-Sen inliers, not a plain least-squares fit through all minima).
- [ ] A superscript, a fraction bar with a numerator/denominator, or a region flagged as math by [SN-HWR-014](ocr-hwr.md#sn-hwr-014) is excluded from straightening and is carried along with its parent word instead of being levelled.
- [ ] On ruled or grid paper, a straightened baseline lands on the nearest printed rule when the estimated baseline is within 0.4 * lineGap of it, and otherwise keeps its own level position.
- [ ] Planning a 40-line page costs <= 25 ms p95 on the Tier-2 reference device.

#### Technical notes
`packages/sane_ml/lib/src/beautify/baseline/` — `contour.dart` (lower/upper contour extraction from decimated stroke points), `baseline_fit.dart`, `four_line_model.dart`, `straighten_planner.dart`. Estimation: take the local minima of each word's lower contour as candidate baseline points, then fit with **Theil-Sen** (median of pairwise slopes; cheap, breakdown point 29%) and refine with RANSAC using an inlier band of 0.15 * x-height so descender minima fall out as outliers. The corpus line comes from the mode of the vertical run-length histogram of ink mass above the baseline; ascender/descender lines are the 92nd/8th percentiles of contour extremes. The level target is the median of the fitted per-word baseline y values, so a line that is *uniformly* placed low on the page is not dragged to the page centre. Correction is a monotone piecewise-linear warp over word-centre control points, converted into one rotation+translation per word (a rigid transform, so letterforms never shear here). Ruled-paper rule positions come from the page template model ([SN-TPL-001](templates.md#sn-tpl-001) family); when the page is a PDF, use the template hint only if one exists — never infer rules from the PDF raster in this issue. Transforms are written as `BeautifyKind.baseline` entries in the overlay and never mutate `Stroke.points`.

#### Security & privacy
Local-only geometry over note content (MASVS-PRIVACY-1, TM-I-08 not applicable — no cloud path). No ink coordinates or fitted parameters in logs (CWE-532, TM-I-05). Bound RANSAC iterations and contour sizes so a pathological imported page cannot spin the isolate (CWE-400, TM-D-01); return `Result.failure` and leave the ink untouched instead.

#### UX notes
The felt quality bar is "someone tidied my notes", not "a computer reset my notes". Two rules enforce it: caps that keep every movement small, and doing nothing when the estimate is uncertain (inlier ratio below 0.55 → skip the line and report it as unchanged to [SN-BTY-013](editor.md#sn-bty-013)'s change list). Straightening animates with the shared morph in [SN-BTY-009](ink.md#sn-bty-009) and respects Reduce Motion ([SN-A11Y-006](a11y.md#sn-a11y-006)). Improved baseline consistency directly helps low-vision readability, an accessibility win worth stating in the release notes ([SN-A11Y-001](a11y.md#sn-a11y-001)).

#### Test plan
`packages/sane_ml/test/beautify/baseline_fit_test.dart` (Theil-Sen/RANSAC against synthetic lines with known slope and descender noise), `packages/sane_ml/test/beautify/straighten_planner_test.dart` (caps, intra-word preservation, uncertainty skip, ruled-paper snap), `packages/sane_ml/test/beautify/straighten_corpus_test.dart` (RMS gate), golden `app/test/golden/beautify/straighten_before_after_*.png` across three writers and three looks.

#### Dependencies
SN-BTY-002 (overlay model to write into), SN-BTY-003 (words and lines). Math-region hints from [SN-HWR-014](ocr-hwr.md#sn-hwr-014) are optional and degrade gracefully.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md PRD-ED-187)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text or note content in logs (TM-I-05)

---

### SN-BTY-005

<a id="sn-bty-005"></a>

**Normalise handwriting slant toward the writer's own dominant angle**

| Field | Value |
|---|---|
| GitHub | #1158 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-002](ink.md#sn-bty-002), [SN-BTY-003](ocr-hwr.md#sn-bty-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
Inconsistent slant is what makes handwriting look hurried even when every letter is well formed: the same writer's "l" leans 8 degrees in one word and 24 in the next. The classic fix in handwriting-recognition preprocessing is shear normalisation to vertical — and that is exactly what we must **not** do, because uprighting a right-leaning hand destroys the thing the user recognises as theirs. Sane Notes instead estimates the **writer's own dominant slant** and pulls the outliers toward it, leaving the mean where the writer put it. This is the difference between Smart Script's "still your handwriting" promise and a recognition preprocessor.

#### Scope
**In:** per-word slant estimation; a per-writer dominant-slant estimate maintained as a rolling statistic in a local writer profile; a shear planner that reduces per-word deviation from the dominant slant by a fraction set by the intensity control ([SN-BTY-011](settings.md#sn-bty-011)); shear applied about the word's baseline intersection so letters do not translate; caps and skip rules; handling of writers with a genuinely variable hand (high dispersion → do less); and left-handed and negative-slant hands treated symmetrically.
**Out:** baseline levelling ([SN-BTY-004](ocr-hwr.md#sn-bty-004)), size ([SN-BTY-006](ocr-hwr.md#sn-bty-006)), the writer glyph style model used for re-rendering corrected words (separate issue under this epic), settings UI ([SN-SET-007](settings.md#sn-set-007)).

#### Acceptance criteria
- [ ] Per-line standard deviation of word slant drops by >= 40% at Neat and >= 20% at Light on the evaluation corpus.
- [ ] The writer's mean slant is preserved: the page mean slant after normalisation is within 2.0 degrees of the original page mean — a test explicitly asserts the engine does **not** trend toward vertical.
- [ ] No single word is sheared by more than 12 degrees, and a word whose estimate has low confidence (fewer than 3 near-vertical segments, or estimator score below threshold) is left untouched.
- [ ] A left-handed corpus slice with a mean slant of -15 degrees is normalised toward -15 degrees, not 0.
- [ ] Shearing is applied about the word baseline anchor: the word's baseline-left point moves by <= 0.5 logical px, so spacing is unchanged by this stage.
- [ ] Slant estimation plus planning for a 40-line page costs <= 20 ms p95 on the Tier-2 reference device.
- [ ] The writer profile is stored locally per profile (never synced to any server), can be reset from settings, and a fresh profile falls back to per-page dominant slant until it has >= 300 sampled words.

#### Technical notes
`packages/sane_ml/lib/src/beautify/slant/` — `slant_estimate.dart`, `writer_profile.dart`, `shear_planner.dart`. Estimation uses the standard shear-search on the vertical projection profile (Bozinovic-Srihari / Vinciarelli style): shear the word's points over -45..+45 degrees in 1-degree steps and pick the angle maximising the sum of squared column ink-mass, which peaks when near-vertical strokes align into columns; refine with a parabolic fit on the three best angles for sub-degree resolution. Cross-check with a PCA over segments of the decimated centreline whose absolute direction is within 35 degrees of vertical; disagreement > 10 degrees marks the estimate low-confidence. The writer profile keeps an exponentially weighted mean and dispersion over the last ~2,000 words (per profile, per notebook script) in the local preferences store ([SN-SET-003](settings.md#sn-set-003) when it lands; until then a `sane_core` per-profile record). Correction angle = `alpha * (dominant - wordSlant)` clamped to +/-12 degrees, alpha from [SN-BTY-011](settings.md#sn-bty-011) (Light 0.35, Neat 0.7). The shear matrix is applied to the decimated points only; stroke width, pressure, tilt and timestamps are untouched because geometry re-renders through the brush ([SN-BTY-008](ink.md#sn-bty-008) owns that contract). High writer dispersion (sd > 18 degrees) halves alpha — a genuinely variable hand is a style, not an error.

#### Security & privacy
The writer profile is a behavioural biometric derived from note content and must be treated as such: stored locally in the per-profile encrypted preferences, E2E-encrypted if it ever syncs, never logged, never sent anywhere, and deletable (MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-532, TM-I-05). It is listed in the privacy dashboard's on-device data inventory and is removed when the profile is deleted ([SN-PRV-001](privacy.md#sn-prv-001) family). No network path.

#### UX notes
Users must never feel their handwriting has been "corrected to normal". Settings copy says "make your slant more consistent", not "fix your slant", and the reset control is labelled "Forget my handwriting style". Because slant change is subtle, [SN-BTY-013](editor.md#sn-bty-013)'s change list names it explicitly so the user knows what moved. All chrome in `sane_ui` tokens, 17 looks, light and dark; Reduce Motion respected.

#### Test plan
`packages/sane_ml/test/beautify/slant_estimate_test.dart` (synthetic sheared text recovers the known angle within 1.5 degrees; low-confidence detection), `packages/sane_ml/test/beautify/shear_planner_test.dart` (mean preservation, caps, left-handed symmetry, anchor stability), `packages/sane_ml/test/beautify/writer_profile_test.dart` (rolling statistics, cold start, reset, no-sync assertion), golden `app/test/golden/beautify/slant_before_after_*.png`.

#### Dependencies
SN-BTY-002 (overlay), SN-BTY-003 (words). Intensity mapping from [SN-BTY-011](settings.md#sn-bty-011).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md PRD-ED-187)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text or note content in logs (TM-I-05)

---

### SN-BTY-006

<a id="sn-bty-006"></a>

**Normalise glyph size and x-height across a line and across a page**

| Field | Value |
|---|---|
| GitHub | #1159 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-002](ink.md#sn-bty-002), [SN-BTY-003](ocr-hwr.md#sn-bty-003), [SN-BTY-004](ocr-hwr.md#sn-bty-004) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
The second structural tell of messy writing is size drift: words shrink as the hand tires, the last word before the margin is squeezed, and the first word after a pause is oversized. Evening out x-height within a line — and, more gently, across a page — is what makes a page read as one block of text. It is also the change most likely to destroy meaning if done carelessly: a heading, an emphasised word, a subscript and a margin note are *deliberately* a different size and must be left alone.

#### Scope
**In:** robust per-word x-height estimation using the four-line model from [SN-BTY-004](ocr-hwr.md#sn-bty-004); a line-level target and a blended page-level target; uniform (aspect-preserving) scaling of each word about its baseline-left anchor; clamped scale factors driven by intensity ([SN-BTY-011](settings.md#sn-bty-011)); emphasis detection so headings, underlined/boxed/highlighted words and outliers above a threshold are excluded; stroke-width policy when geometry is scaled; and interaction with spacing so a scaled word hands its width delta to [SN-BTY-007](ocr-hwr.md#sn-bty-007) rather than overlapping its neighbour.
**Out:** spacing and reflow ([SN-BTY-007](ocr-hwr.md#sn-bty-007)), baseline ([SN-BTY-004](ocr-hwr.md#sn-bty-004)), slant ([SN-BTY-005](ocr-hwr.md#sn-bty-005)), any change to the brush preset.

#### Acceptance criteria
- [ ] Coefficient of variation of x-height within a line drops by >= 35% at Neat and >= 18% at Light on the evaluation corpus.
- [ ] Scaling is uniform: the ratio of a word's width to its height changes by < 0.5%, so letterforms are never stretched.
- [ ] Scale factors are clamped to [0.80, 1.25] at Neat and [0.90, 1.12] at Light; a word needing more than the clamp is left at the clamp, never beyond it.
- [ ] Emphasis is preserved: a word >= 1.6x the page median x-height, a word with an underline stroke beneath it, a highlighted word, or the first line of a page that is >= 1.4x median is excluded and reported as "left as written".
- [ ] Superscripts, subscripts and math regions are excluded (shared exclusion set with [SN-BTY-004](ocr-hwr.md#sn-bty-004)).
- [ ] Stroke weight stays believable: nib width scales with sqrt(scale) rather than linearly, and a golden test across all eight built-in pens shows no perceived change in pen character (docs/design/pen-and-brush-spec.md §4).
- [ ] A scaled word never overlaps its neighbours: the planner emits the width delta and defers placement to [SN-BTY-007](ocr-hwr.md#sn-bty-007); a test asserts zero bbox intersections after the combined pass.
- [ ] Planning a 40-line page costs <= 15 ms p95 on the Tier-2 reference device.

#### Technical notes
`packages/sane_ml/lib/src/beautify/size/` — `xheight_estimate.dart`, `size_planner.dart`. Per-word x-height = distance from the fitted baseline to the corpus line from [SN-BTY-004](ocr-hwr.md#sn-bty-004), with a fallback to the median of the vertical run-length histogram mode when the corpus line is weak (words made only of ascenders, e.g. "I"). Line target = median of inlier word x-heights; page target = median of line targets; effective target = `lerp(lineTarget, pageTarget, 0.35)` so a genuinely smaller margin note in its own block is not forced to page scale. Scale about the word's baseline-left anchor so the baseline established by [SN-BTY-004](ocr-hwr.md#sn-bty-004) still holds after scaling. Width policy: `Stroke.baseSize` is a brush parameter, not geometry, so instead of touching it the overlay records a `widthScale = sqrt(scale)` that `sane_render` multiplies into the preset's size at tessellation time — this keeps the pen preset authoritative (docs/design/pen-and-brush-spec.md §9 "identical rendering forever"). Emphasis detection reuses the underline/highlight relationships already known from object kinds (highlighter strokes live on their own layer, docs/architecture/ink-engine.md §4.4) plus the size-ratio rule. Exclusions are a shared `BeautifyExclusionSet` computed once per page and used by every planner.

#### Security & privacy
Local geometry over note content only (MASVS-PRIVACY-1); no network, no logging of ink or estimates (CWE-532, TM-I-05). Cap histogram and contour work per word to bound CPU on adversarial input (CWE-400, TM-D-01).

#### UX notes
Size normalisation is the change users notice most, so it is the most conservative: clamped hard, excluded liberally, and always listed in the [SN-BTY-013](editor.md#sn-bty-013) preview change list per word. If a user's whole page is "too small", that is not a defect to fix — the engine normalises *variation*, not absolute size, and settings copy says so. Golden coverage across all 17 looks in light and dark.

#### Test plan
`packages/sane_ml/test/beautify/xheight_estimate_test.dart` (synthetic words with known x-height, ascender-only fallback), `packages/sane_ml/test/beautify/size_planner_test.dart` (clamps, aspect preservation, emphasis exclusions, width-scale policy, no-overlap hand-off), `packages/sane_ml/test/beautify/size_corpus_test.dart` (CV gate), golden `app/test/golden/beautify/size_pens_*.png` for all eight built-in pens.

#### Dependencies
SN-BTY-002 (overlay), SN-BTY-003 (words/lines), SN-BTY-004 (four-line model and exclusion set). Placement hand-off to [SN-BTY-007](ocr-hwr.md#sn-bty-007).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md PRD-ED-187)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text or note content in logs (TM-I-05)

---

### SN-BTY-007

<a id="sn-bty-007"></a>

**Normalise word and letter spacing and reflow around corrected words**

| Field | Value |
|---|---|
| GitHub | #1160 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, ink, editor |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-002](ink.md#sn-bty-002), [SN-BTY-003](ocr-hwr.md#sn-bty-003), [SN-BTY-006](ocr-hwr.md#sn-bty-006) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
Spacing is the last structural axis and the one that makes reflow possible. Two jobs sit here. First, **normalisation**: even out the gaps between words so a line stops looking like it was written in bursts. Second, **reflow**: when a word changes width — because the writer's misspelling was re-rendered as a correctly spelled word in their own hand ([SN-HWR-017](ocr-hwr.md#sn-hwr-017) plus the style-model issue under this epic), or because [SN-BTY-006](ocr-hwr.md#sn-bty-006) rescaled it, or because the user inserted space the way Apple's Smart Script allows (docs/research/sources/apple-notes-freeform.md §2) — the rest of the line and, if needed, the rest of the paragraph must move so nothing collides and nothing runs off the margin.

Goodnotes calls its version "Notes Reorganization"; ours has to work on every platform, be reversible, and never move ink onto another page without asking.

#### Scope
**In:** inter-word gap measurement and a target-gap model; gap adjustment with per-gap clamps; inter-cluster (pen-up) spacing inside a word for print hands, with connected cursive strokes explicitly excluded; a line-box model with left/right margins derived from the page template or from the ink's own left-edge histogram; the reflow solver that absorbs a width delta along the line, wraps at the last word boundary when the margin is exceeded, and cascades through following lines within the same block; an insert-space / remove-space operation for the editor; cascade limits and the confirm-before-overflowing-to-a-new-page rule.
**Out:** the spelling detection and re-render themselves; vertical line spacing changes (out of scope for v1 — lines keep their baselines from [SN-BTY-004](ocr-hwr.md#sn-bty-004)); text objects, which reflow natively ([SN-TXT-002](text.md#sn-txt-002)).

#### Acceptance criteria
- [ ] Coefficient of variation of inter-word gaps within a line drops by >= 30% at Neat on the evaluation corpus; the target gap is `0.62 * x-height` by default and configurable in the planner, not hard-coded at a call site.
- [ ] Per-gap change is clamped to +/-0.5 * x-height and word order is never changed.
- [ ] Connected cursive strokes are never re-spaced internally: a stroke that spans more than one glyph cluster is treated as atomic (test with a cursive corpus slice).
- [ ] Replacing a word with one 30% wider reflows the remainder of the line with no bbox overlap and no ink crossing the right margin; if the line cannot absorb the delta, the trailing word wraps to the next line and following lines cascade within the block.
- [ ] Cascade is bounded: it stops at the end of the block, and an overflow that would push ink past the bottom margin of the page raises a `Failure.needsConfirmation` rather than silently spilling; the editor then asks the user ([SN-BTY-010](editor.md#sn-bty-010)).
- [ ] A reflow of a 40-word paragraph completes in <= 30 ms p95 on the Tier-2 reference device and is emitted as a single overlay scope so one revert restores the original layout exactly.
- [ ] Reflow is idempotent: running it twice on an already-normalised paragraph produces no further movement (asserted to within 0.5 logical px).

#### Technical notes
`packages/sane_ml/lib/src/beautify/spacing/` — `gap_model.dart`, `line_box.dart`, `reflow_solver.dart`. Gaps are measured between word bounding boxes projected onto the line's baseline direction, so a slanted line measures correctly. Target gap derives from the line's robust x-height ([SN-BTY-006](ocr-hwr.md#sn-bty-006)) and the writer's own median gap (blend 0.5/0.5) so a naturally airy hand stays airy. The solver is a simple left-to-right pass with an accumulator, not a general constraint solver: each word gets `x' = prevRight + targetGap +/- clamp`, and the accumulated delta is what triggers a wrap. Margins come from the page template ([SN-TPL-001](templates.md#sn-tpl-001) family) when present, else from the 10th/90th percentiles of the page's per-line left/right ink extents. Wrapping moves whole words only and re-runs [SN-BTY-004](ocr-hwr.md#sn-bty-004)'s baseline placement for the receiving line so the wrapped word sits on that line's baseline. All movement is a translation written into the overlay ([SN-BTY-002](ink.md#sn-bty-002)) as `BeautifyKind.spacing`; the scope covers every word the solver touched, which is what makes one undo restore the paragraph. Insert-space is the same solver with a synthetic gap delta at a chosen index, exposed as a command for the editor slice.

#### Security & privacy
Local-only computation over note content (MASVS-PRIVACY-1). No logging of positions or recognised text (CWE-532, TM-I-05). The cascade must terminate: bound iterations by block size and abort with a `Failure` on a pathological page rather than looping (CWE-400, TM-D-01).

#### UX notes
Reflow must feel like the page rearranged itself politely. The animation is the shared morph from [SN-BTY-009](ink.md#sn-bty-009) with a 180 ms duration, staggered left-to-right by 8 ms per word, and instant when Reduce Motion is on ([SN-A11Y-006](a11y.md#sn-a11y-006)). When a wrap happens the preview ([SN-BTY-013](editor.md#sn-bty-013)) calls it out in words ("one word moved to the next line") because a silently wrapped word is the kind of change a user needs to notice. A needs-confirmation overflow surfaces as a dialog with Keep-as-is / Reflow-anyway, never an auto-decision.

#### Test plan
`packages/sane_ml/test/beautify/gap_model_test.dart` (targets, clamps, slanted-line projection), `packages/sane_ml/test/beautify/reflow_solver_test.dart` (width delta absorption, wrap, cascade bounds, idempotence, needs-confirmation, cursive atomicity), `packages/sane_ml/test/beautify/spacing_corpus_test.dart` (CV gate), golden `app/test/golden/beautify/reflow_wrap_*.png`, and an integration case in `app/integration_test/beautify_test.dart` for correct-a-word-then-reflow-then-revert.

#### Dependencies
SN-BTY-002 (overlay), SN-BTY-003 (words/lines/blocks), SN-BTY-006 (width deltas from rescaled words). Consumed by [SN-HWR-017](ocr-hwr.md#sn-hwr-017) for corrected-word placement.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md PRD-ED-187)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text or note content in logs (TM-I-05)

---

### SN-BTY-019

<a id="sn-bty-019"></a>

**Model the personal handwriting style profile and its encrypted local store**

| Field | Value |
|---|---|
| GitHub | #1168 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | ocr-hwr, privacy, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-CORE-003](sync.md#sn-core-003), [SN-CRY-007](security.md#sn-cry-007), [SN-CRY-008](security.md#sn-cry-008) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-1`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `ASVS-V6`, `OWASP-A02`, `CWE-312`, `CWE-359`, `TM-I-03`, `TM-I-10`, `TM-P-05` |
| Extra labels | agent-ready, innovation |

#### Context
Slice A of [SN-BTY-001](ocr-hwr.md#sn-bty-001) makes handwriting *neater* by transforming the strokes that are already on the page. Slice B — this issue and its siblings — makes it possible to put **new ink on the page that still looks like the writer's own hand**, which is what a spelling correction needs ([SN-BTY-027](ocr-hwr.md#sn-bty-027)) and what Apple ships as Smart Script's "paste typed text so it renders in your own handwriting" (`docs/research/sources/apple-notes-freeform.md` §2) and Goodnotes ships as "corrects while keeping your handwriting style" (`docs/research/sources/goodnotes-userguide-inventory.md` §On-device AI). All of that reads one artefact: a **personal handwriting style profile**. This issue defines that artefact, its schema, its versioning and its at-rest protection, before anything learns into it ([SN-BTY-020](ocr-hwr.md#sn-bty-020)) or generates from it ([SN-BTY-023](ocr-hwr.md#sn-bty-023)).

It is scheduled in M4 deliberately: a handwriting profile is **biometric-adjacent personal data** — stroke dynamics identify a person much as a signature does, and a leaked profile lets someone forge that person's handwriting — so it must not exist on disk before the key hierarchy and hardware-backed secure store exist ([SN-CRY-007](security.md#sn-cry-007), [SN-CRY-008](security.md#sn-cry-008), [SN-CRY-009](security.md#sn-cry-009)). It is also the **single** style asset: the style-similarity reference embedding used by the "does it still look like me" guard ([SN-BTY-047](ocr-hwr.md#sn-bty-047)) lives in this same store, so there is exactly one thing to explain, confine and delete ([SN-BTY-050](privacy.md#sn-bty-050)).

#### Scope
**In:** the `HandwritingStyleProfile` value model (per Sane Notes profile, per script, optionally per pen preset); glyph-exemplar records (point sets with pressure/tilt/timing); durable per-writer aggregate statistics (dominant slant, x-height, ascender/descender ratio, inter-letter and inter-word advance, line pitch, stroke count and stroke order per class, pressure/velocity envelope); the per-class coverage table; a slot for [SN-BTY-047](ocr-hwr.md#sn-bty-047)'s reference embedding; schema version plus forward-compatible migration; drift/SQLite persistence in `sane_core`; envelope encryption at rest; the hard no-egress invariant with a CI gate.
**Out:** learning/extraction ([SN-BTY-020](ocr-hwr.md#sn-bty-020)); coverage scoring and fallback tiers ([SN-BTY-021](ocr-hwr.md#sn-bty-021)); the user-facing consent copy, privacy-dashboard entry and confinement explanation ([SN-BTY-050](privacy.md#sn-bty-050)) — the *storage-layer* enforcement of those rules lives here, the words the user reads do not; the inspect/pause/export panel ([SN-BTY-022](privacy.md#sn-bty-022)); synthesis ([SN-BTY-023](ocr-hwr.md#sn-bty-023)); per-line geometric estimation, which belongs to [SN-BTY-004](ocr-hwr.md#sn-bty-004)–[SN-BTY-006](ocr-hwr.md#sn-bty-006).

#### Acceptance criteria
- [ ] `HandwritingStyleProfile` is an immutable value object keyed by `(profileId, scriptCode, penPresetId?)` and round-trips encode→decode→encode byte-identically for a fixed schema version.
- [ ] Per glyph class it stores ≤ 32 retained exemplars (ring-buffered, recency-weighted), a medoid exemplar and variance statistics; a full profile stays ≤ 2 MB per script across 26 lower + 26 upper + 10 digit + 12 punctuation classes.
- [ ] The stored blob is encrypted with a per-profile key wrapped by the master key ([SN-CRY-007](security.md#sn-cry-007)/[SN-CRY-008](security.md#sn-cry-008)); a test greps the raw on-disk bytes for known fixture coordinates and finds none, and a flipped byte makes the AEAD open fail closed.
- [ ] An arch-lint/CI gate proves no code path hands a `HandwritingStyleProfile` (or any field of it) to `sane_sync`, an HTTP client, a share/export path, telemetry, or a cloud `sane_ml` adapter; the store is excluded from platform auto-backup (Android `fullBackupContent` rules / iOS exclude-from-backup).
- [ ] Reading a profile written by a newer major schema fails closed with a typed `Failure`, never a partial decode.
- [ ] Deleting the owning Sane Notes profile deletes every style profile, its reference embedding and its wrapped key in one transaction, and the store registers itself with the erasure engine so [SN-BTY-050](privacy.md#sn-bty-050) can verify residue-free deletion.
- [ ] Writing a profile update costs ≤ 20 ms on the storage isolate and never blocks the UI isolate.

#### Technical notes
Model + persistence in `packages/sane_core` (drift table `handwriting_style_profiles`, encrypted blob column), with the pure-Dart value types consumed by `packages/sane_ml/lib/src/style/`. Respect the DAG (`docs/architecture/overview.md` §5): `sane_ml` must **not** import `sane_ink`, so exemplars are stored as `sane_core` point lists (`x, y, pressure, tilt, azimuth, tMicros`) reusing the stroke codec — quantise → per-field delta → zig-zag varint → zstd (`docs/architecture/ink-engine.md` §10.2) — so one encoder serves strokes and exemplars and a schema change is one migration. Encryption through `packages/sane_crypto` (XChaCha20-Poly1305 envelope, tag verified before any byte is used), key held in `plugins/sane_secure_store` (Keychain/Secure Enclave, Keystore/StrongBox). ADR-0016 (on-device by default), ADR-0002 (layout).

#### Security & privacy
Classified with note content **plus** a hard no-egress rule: the profile must never be uploaded, synced, shared, exported into a share link, attached to a diagnostics bundle, or sent to any cloud adapter — including when the user takes a per-request cloud opt-in elsewhere (decision 6 authorises sending a *prompt*, never this asset). Controls: at-rest encryption (MASVS-STORAGE-1, CWE-312, TM-I-03), hardware-backed key (MASVS-CRYPTO-1), backup exclusion (TM-I-10), never logged (TM-I-05, CWE-117), erasable (MASVS-PRIVACY-4). LINDDUN: TM-P-05 disclosure and TM-P-01 linkability — a synced profile would be a strong cross-device identifier, which is a second reason sync is prohibited rather than merely off.

#### UX notes
No user-visible surface here; the plain-language explanation and delete control are [SN-BTY-050](privacy.md#sn-bty-050) and the inspect/pause/export panel is [SN-BTY-022](privacy.md#sn-bty-022). The privacy-dashboard row this store must support reads "Handwriting style — stays on this device". Copy guidance for downstream issues: never call it "your signature".

#### Test plan
`packages/sane_core/test/handwriting_style_profile_test.dart` (schema round-trip, size caps, ring-buffer eviction, unknown-major fails closed), `packages/sane_core/test/style_profile_encryption_test.dart` (no plaintext coordinates on disk, tamper → fail closed), `app/test/security/style_profile_no_egress_test.dart` (CI gate over sync/network/export/telemetry/cloud-adapter paths), `app/test/privacy/style_profile_erasure_test.dart` (cascade + key destruction).

#### Dependencies
SN-CORE-003 (object model), SN-CRY-007 (blob encryption), SN-CRY-008 (Apple secure store; [SN-CRY-009](security.md#sn-cry-009) for Android). Explained and deleted by [SN-BTY-050](privacy.md#sn-bty-050).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-020

<a id="sn-bty-020"></a>

**Learn the writer's glyph shapes and style statistics from their own ink**

| Field | Value |
|---|---|
| GitHub | #1169 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | ocr-hwr, ai, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-019](ocr-hwr.md#sn-bty-019), [SN-BTY-003](ocr-hwr.md#sn-bty-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117`, `TM-I-05`, `TM-I-08`, `TM-P-05` |
| Extra labels | agent-ready, innovation |

#### Context
The profile defined in [SN-BTY-019](ocr-hwr.md#sn-bty-019) is empty until the user's own writing fills it. This issue is the **incremental background trainer**. It deliberately builds on work slice A already does rather than repeating it: [SN-BTY-003](ocr-hwr.md#sn-bty-003) already segments ink into glyph clusters, words, lines and blocks with diacritic attachment; [SN-BTY-004](ocr-hwr.md#sn-bty-004), [SN-BTY-005](ocr-hwr.md#sn-bty-005) and [SN-BTY-006](ocr-hwr.md#sn-bty-006) already estimate baseline, slant and x-height *for a line*. What is missing is the durable, cross-page, cross-session aggregation of those per-line measurements plus the labelled glyph exemplars needed to draw new letters — the writer's alphabet, not just the current line's geometry.

There must be no enrolment ritual. The model grows quietly while someone takes notes, which is the only version of this that a student will actually use, and it obeys the same discipline as everything else near the editor: never on the UI isolate, never while the pen is down, never a millisecond added to wet-ink latency (`CLAUDE.md` §8).

#### Scope
**In:** a training pass that joins [SN-BTY-003](ocr-hwr.md#sn-bty-003) glyph clusters with per-character labels from recognition ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)/[SN-HWR-006](ocr-hwr.md#sn-hwr-006)); normalisation of each labelled cluster (translate to baseline origin, scale by x-height, deskew by the line's estimated slant from [SN-BTY-005](ocr-hwr.md#sn-bty-005)); arc-length resampling to a fixed-N trajectory; clustering of exemplars per glyph class with allographic variants (two-storey vs single-storey "a"); recency-weighted incremental merge into the profile; **aggregation** of per-line estimates into durable per-writer statistics (dominant slant, median x-height, inter-letter and inter-word advance, line pitch, stroke count/order per class, pressure and velocity envelopes); an idle-time scheduler on a background isolate; retraction of exemplars whose source ink was erased or undone.
**Out:** the per-line geometric estimators ([SN-BTY-004](ocr-hwr.md#sn-bty-004)–[SN-BTY-006](ocr-hwr.md#sn-bty-006)) and the segmenter ([SN-BTY-003](ocr-hwr.md#sn-bty-003)) — consumed, not re-implemented; coverage scoring ([SN-BTY-021](ocr-hwr.md#sn-bty-021)); synthesis ([SN-BTY-023](ocr-hwr.md#sn-bty-023)); the style-similarity reference embedding ([SN-BTY-047](ocr-hwr.md#sn-bty-047)), which reads the same exemplars.

#### Acceptance criteria
- [ ] Writing a 60-word page grows the profile measurably: ≥ 90 % of the glyph classes present on that page gain at least one exemplar, and **zero** exemplars are recorded from words whose recognition confidence is below 0.80.
- [ ] Aggregated dominant slant is within ±2° and median x-height within ±4 % of ground truth on the synthetic handwriting corpus ([SN-BTY-044](qa.md#sn-bty-044) / [SN-INK-033](ink.md#sn-ink-033) replay harness).
- [ ] A training pass over one page costs ≤ 250 ms CPU and ≤ 40 MB peak RSS on the mid-tier Android reference device, runs on a background isolate, is cancellable, and `tools/perf_harness` shows **no frame > 16.7 ms** and no change in pen-down→pixel latency while it runs.
- [ ] Training is incremental and idempotent: re-processing the same page adds no duplicate exemplars; the newest 32 per class are retained with recency weighting.
- [ ] Strokes classified as drawing, maths or protected content are never trained on ([SN-BTY-039](ocr-hwr.md#sn-bty-039)), and no training runs for a script whose tier forbids synthesis ([SN-BTY-035](i18n.md#sn-bty-035)).
- [ ] Ink erased or undone in the session is retracted from the training queue before it merges; a test writes, erases and asserts the word contributed nothing.
- [ ] Entirely on-device: a test asserts zero network calls during a full training cycle, including with `SANE_AI_CLOUD_ENABLED=true`.

#### Technical notes
`packages/sane_ml/lib/src/style/trainer.dart`, `labeller.dart`, `aggregate.dart` — pure Dart, no `package:flutter`, no import of `sane_ink` (DAG), so segments arrive as `sane_core` value types from `app/`. Character labelling: ML Kit Digital Ink returns candidate strings per `Ink`, so recognise per word and align characters to [SN-BTY-003](ocr-hwr.md#sn-bty-003)'s clusters by monotonic DTW over stroke order (Sakoe–Chiba band). Allograph clustering by k-medoids (PAM) over DTW distance; class medoid by Generalized Procrustes analysis. Resampling by arc-length uniform sampling with centripetal Catmull–Rom. Aggregates use robust statistics (median, MAD) so one wild line cannot move the profile. Scheduling reuses the background-work queue already driving [SN-HWR-006](ocr-hwr.md#sn-hwr-006) / [SN-SRCH-010](search.md#sn-srch-010) (`Isolate.run` one-shots in `app/lib/core/isolates/`) — never a `PointerMoveEvent` path. ADR-0016; `docs/architecture/ink-engine.md` §1.2 for the sample fields consumed.

#### Security & privacy
On-device only (MASVS-PRIVACY-1, ADR-0016 decision 2); the trainer has no cloud adapter at all, so TM-I-08 is satisfied by absence rather than by a toggle (OWASP-A03). Ink coordinates, labels, exemplars and aggregates are note content and are never logged — `SaneLog` may record only counters such as pages processed and a duration bucket (TM-I-05, CWE-117). The training queue is stored encrypted alongside the profile ([SN-BTY-019](ocr-hwr.md#sn-bty-019)) and purged on deletion. Retracting erased ink is a data-minimisation control (MASVS-PRIVACY-4): a word the user deleted must not survive inside the model.

#### UX notes
Invisible by design; the only surfacing is the coverage readout in [SN-BTY-022](privacy.md#sn-bty-022) and the one-time explanation in [SN-BTY-050](privacy.md#sn-bty-050)/[SN-BTY-051](onboarding.md#sn-bty-051). Never block writing, never show a modal mid-page, never animate progress over the canvas. Any progress copy lives in Settings → Handwriting ([SN-SET-007](settings.md#sn-set-007)) and uses `sane_ui` tokens across all 17 looks + dark.

#### Test plan
`packages/sane_ml/test/style/trainer_test.dart` (incremental merge, idempotence, recency eviction, confidence gate, erase retraction), `packages/sane_ml/test/style/aggregate_test.dart` (slant/x-height accuracy vs synthetic ground truth, robustness to outlier lines), `packages/sane_ml/test/style/labeller_test.dart` (character alignment on cursive and print fixtures), `app/test/perf/style_training_budget_test.dart` plus a `tools/perf_harness` scenario asserting no dropped frame while training, `app/test/security/style_training_no_network_test.dart`.

#### Dependencies
SN-BTY-019 (profile store), SN-BTY-003 (segmentation). Reads [SN-BTY-004](ocr-hwr.md#sn-bty-004)–[SN-BTY-006](ocr-hwr.md#sn-bty-006) estimates and [SN-HWR-006](ocr-hwr.md#sn-hwr-006) recognition; gated by [SN-BTY-035](i18n.md#sn-bty-035) and [SN-BTY-039](ocr-hwr.md#sn-bty-039).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-021

<a id="sn-bty-021"></a>

**Score personal-style coverage and fall back when the samples are too few**

| Field | Value |
|---|---|
| GitHub | #1170 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | ocr-hwr, ai |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-020](ocr-hwr.md#sn-bty-020) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A04`, `CWE-117`, `TM-I-05` |
| Extra labels | agent-ready |

#### Context
A brand-new user has written nothing. A physics student has no lowercase "q". Someone who just switched from a fountain pen to a pencil has exemplars captured under different dynamics. Every one of those states must produce sensible behaviour, and the failure mode must be **"offer a suggestion"**, never "stamp something that is not their handwriting". This issue makes *training-data coverage* a first-class, testable number so that synthesis ([SN-BTY-023](ocr-hwr.md#sn-bty-023)), the suggestion gate ([SN-BTY-025](ocr-hwr.md#sn-bty-025)), spelling ([SN-BTY-027](ocr-hwr.md#sn-bty-027)) and completion ([SN-BTY-028](ocr-hwr.md#sn-bty-028)) all consult one policy instead of each inventing a threshold.

This is about **how much of the writer we have learned**. It is a different axis from [SN-BTY-049](compat.md#sn-bty-049), which tiers by *device and model capability* — a flagship iPad with every model installed can still have an empty style profile, and both gates must pass before anything is auto-applied.

#### Scope
**In:** a `StyleCoverage` report per `(profile, script)` — per-class exemplar counts, intra-class variance, allograph count, aggregate stability and pen-preset coverage; a `StyleConfidence` score in [0,1] for a **specific target string**; three explicit data-maturity tiers with a single policy table mapping tier → permitted behaviour; the zero-exemplar cold-start path; drift invalidation when the writer's aggregates move (new pen, injured hand, a child's hand growing).
**Out:** the UI that shows coverage ([SN-BTY-022](privacy.md#sn-bty-022)); device/model capability tiers ([SN-BTY-049](compat.md#sn-bty-049)); the runtime "does it still look like me" rejection of a specific rendered result ([SN-BTY-047](ocr-hwr.md#sn-bty-047)); synthesis ([SN-BTY-023](ocr-hwr.md#sn-bty-023)).

#### Acceptance criteria
- [ ] Tiers are enforced exactly as defined: **T0 Unknown** — fewer than 5 exemplars for a needed glyph class, that class may never be synthesised; **T1 Sparse** — 5–19 exemplars, or string confidence < 0.65, synthesis allowed only in suggestion mode and never auto-applied; **T2 Trained** — ≥ 20 exemplars for ≥ 80 % of the needed classes and string confidence ≥ 0.65, auto-apply permitted only if the user enabled it.
- [ ] `StyleConfidence` is deterministic, in [0,1], monotonically non-decreasing as exemplars are added, and returns exactly 0.0 when any needed class is T0.
- [ ] With an empty profile every entry point still works: structure-only beautification (slice A) remains fully available and correction flows fall back to a typed preview — no crash, no dead-end empty state.
- [ ] Drift greater than 15 % in dominant slant or median x-height over the last 200 words raises a `styleDrift` flag that down-weights older exemplars instead of discarding the profile.
- [ ] Every consumer resolves permission through one API (`StylePolicy.decide(target)`); an arch test asserts no caller compares raw exemplar counts itself.
- [ ] Computing coverage for a full profile takes ≤ 15 ms and is cached with invalidation on profile write.

#### Technical notes
`packages/sane_ml/lib/src/style/coverage.dart` and `policy.dart`, pure Dart, returning `Result<StyleCoverage, Failure>` (`docs/architecture/overview.md` §8.1). Intra-class variance is the mean Procrustes residual to the class medoid produced by [SN-BTY-020](ocr-hwr.md#sn-bty-020); allograph count comes from its k-medoids clustering. String confidence uses a harmonic mean across the needed classes so a single weak letter drags the score down — the conservative behaviour we want. Thresholds live in one `const` table with a dartdoc rationale, asserted by tests, never scattered as magic numbers. Exposed to `app/` through a Riverpod provider; feature packages never call each other sideways.

#### Security & privacy
Coverage is derived from note content and stays on-device (MASVS-PRIVACY-1); it is never logged (TM-I-05, CWE-117), and only coarse bucketed counters may ever reach opt-in telemetry ([SN-BTY-052](telemetry.md#sn-bty-052)) — per-glyph counts would leak what a person writes. This is the primary control against the "confidently wrong output" failure mode (OWASP-A04 insecure design): the default is refusal, and refusal costs the user nothing.

#### UX notes
Tiers surface as plain language, never jargon: T0/T1 read as "Suggestions only — Sane Sage is still learning your handwriting", T2 as "Ready". No percentage in the editor; percentages belong in [SN-BTY-022](privacy.md#sn-bty-022). Suggestion-only mode must feel like a complete feature, not a degraded one. Strings localised ([SN-I18N-001](i18n.md#sn-i18n-001)), `sane_ui` tokens across all looks + dark.

#### Test plan
`packages/sane_ml/test/style/coverage_test.dart` (tier boundaries at 4/5, 19/20 and 0.64/0.65; monotonicity; cache invalidation), `packages/sane_ml/test/style/policy_test.dart` (table-driven over every consumer: T0 never synthesises, T1 never auto-applies), `packages/sane_ml/test/style/drift_test.dart`, `app/test/editor/beautify_cold_start_test.dart` (empty profile, end to end).

#### Dependencies
SN-BTY-020 (exemplars and aggregates to score). Composed with [SN-BTY-049](compat.md#sn-bty-049) device tiers before any auto-apply.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-023

<a id="sn-bty-023"></a>

**Synthesise any string as ink in the writer's own hand**

| Field | Value |
|---|---|
| GitHub | #1172 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | ocr-hwr, ai, ink |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-020](ocr-hwr.md#sn-bty-020), [SN-BTY-021](ocr-hwr.md#sn-bty-021) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `OWASP-A04`, `CWE-117`, `TM-I-05`, `TM-I-08` |
| Extra labels | agent-ready, innovation |

#### Context
This is the engine that makes a correction invisible: given a target string ("necessary") and the learned profile, produce **ink** that reads as the same person's handwriting as the words around it. Without it, every correction is a font stamp and the central promise of [SN-BTY-001](ocr-hwr.md#sn-bty-001) — your handwriting is kept, not replaced — collapses. Apple ships this on iPad (`docs/research/sources/apple-notes-freeform.md` §2) and Goodnotes ships the correction half on Apple hardware only (`docs/research/sources/goodnotes-userguide-inventory.md` §On-device AI). Shipping it on iPad, Android tablets, web and both phones is the differentiator.

Synthesis here is geometry, not generative text: select exemplars, warp them onto the target baseline and slant, join them with the writer's own advances, and add variation drawn from the writer's own jitter so two instances of a letter are not clones.

#### Scope
**In:** `synthesise(target, profile, context)` returning a `SynthesisedWord` of stroke drafts (point lists with pressure, tilt and timing) plus per-glyph confidence; exemplar selection (medoid vs sampled allograph); Procrustes alignment onto the target baseline, x-height and slant; learned inter-letter advance and per-class-pair kerning; cursive joining — an entry/exit ligature stroke between adjacent glyphs for joined hands; controlled variation sampled from the learned per-class covariance; pressure and velocity envelopes re-derived so the stroke dries with the right width; a deterministic seeded mode for golden tests.
**Out:** painting and brush application ([SN-BTY-024](ink.md#sn-bty-024)); the decision to apply versus suggest ([SN-BTY-025](ocr-hwr.md#sn-bty-025)); the runtime "does it still look like me" rejection gate ([SN-BTY-047](ocr-hwr.md#sn-bty-047)); the project-wide quality-metric registry and its CI gate ([SN-BTY-045](qa.md#sn-bty-045), [SN-BTY-046](ci-cd.md#sn-bty-046)); spacing and reflow of surrounding ink ([SN-BTY-007](ocr-hwr.md#sn-bty-007)); non-Latin scripts, gated by [SN-BTY-035](i18n.md#sn-bty-035).

#### Acceptance criteria
- [ ] With a T2 profile, synthesising a 12-character word takes ≤ 60 ms on the iPad reference device and ≤ 120 ms on the mid-tier Android reference device, on a background isolate, with `tools/perf_harness` showing no frame > 16.7 ms.
- [ ] **Legibility:** the on-device recogniser ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)) reads synthesised output back at ≥ 95 % character accuracy and ≥ 90 % exact-word accuracy over a 500-word fixture set — a machine-checkable proxy for readability.
- [ ] **Fidelity:** the mean Procrustes residual between a synthesised glyph and held-out exemplars of that class from the same writer is ≤ 0.12 in x-height-normalised units, and is lower than the residual to a different writer's exemplars for ≥ 95 % of classes.
- [ ] Two synthesised instances of the same word on one page differ by > 0.5 % of x-height in mean per-point deviation, and no two same-class glyphs are point-identical.
- [ ] Deterministic mode with a fixed seed produces byte-identical output, so goldens are stable.
- [ ] Any needed glyph class at tier T0 makes the whole call return `Failure.insufficientStyle` — synthesis never silently substitutes a font, a default shape, or another writer's glyph.
- [ ] Output carries per-glyph confidence so [SN-BTY-025](ocr-hwr.md#sn-bty-025) and [SN-BTY-047](ocr-hwr.md#sn-bty-047) can gate on it without re-deriving anything.
- [ ] 100 % on-device: asserted by a test that finds zero network calls even with `SANE_AI_CLOUD_ENABLED=true`.

#### Technical notes
`packages/sane_ml/lib/src/synth/` — `glyph_selector.dart`, `layout.dart`, `joiner.dart`, `variation.dart`. Pure Dart, no `package:flutter`, and **no import of `sane_ink`** (DAG): emit `sane_core` point lists and let `app/` hand them to the ink layer. Alignment is Procrustes with translation, rotation and uniform scale only — never a shear, because slant is applied separately from the learned aggregate so it stays consistent with [SN-BTY-005](ocr-hwr.md#sn-bty-005). Joining strokes are centripetal Catmull–Rom through exit tangent → control → entry tangent, resampled to arc-length uniform spacing with a curvature cap so joins never loop. Variation uses per-point offsets sampled from the class covariance and low-passed with the writer's own jitter spectrum, not white noise — white noise reads as a shaky hand, not a hand. Timings are synthesised from the learned velocity envelope so audio-synced replay ([SN-AUD-012](audio.md#sn-aud-012)) and the per-point `tMicros` contract of `docs/architecture/ink-engine.md` §10.1 stay coherent. Pressure is re-derived per point rather than copied, so a different pen size scales correctly.

#### Security & privacy
All local (MASVS-PRIVACY-1, ADR-0016 decision 2); there is deliberately **no cloud synthesis path**, since sending the profile or the target string off-device would defeat [SN-BTY-019](ocr-hwr.md#sn-bty-019)'s no-egress rule (TM-I-08, OWASP-A03). Target strings and synthesised geometry are note content and never reach a log line (TM-I-05, CWE-117). Insecure-design control (OWASP-A04): the engine refuses rather than approximates, so the app can never present handwriting it has not learned as the user's own. Abuse note for the threat model: this facility exists to re-render *the user's own words in their own note*; it must not be surfaced as a signature or document-signing feature, and the provenance flag from [SN-BTY-024](ink.md#sn-bty-024) keeps machine-placed ink distinguishable.

#### UX notes
No direct UI; its quality is judged everywhere it appears — the sample alphabet in [SN-BTY-022](privacy.md#sn-bty-022), the correction preview in [SN-BTY-027](ocr-hwr.md#sn-bty-027), the ghost in [SN-BTY-028](ocr-hwr.md#sn-bty-028), the before/after in [SN-BTY-013](editor.md#sn-bty-013). Synthesised ink must inherit the surrounding ink's colour and size so a corrected word never appears in a different colour. Reduce Motion is honoured by callers that animate it in.

#### Test plan
`packages/sane_ml/test/synth/synthesis_test.dart` (determinism, variation, T0 refusal, advance and kerning), `packages/sane_ml/test/synth/roundtrip_legibility_test.dart` (recogniser round-trip thresholds), `packages/sane_ml/test/synth/fidelity_test.dart` (Procrustes residual and cross-writer separation), golden `app/test/golden/synthesised_word_*` (seeded, across looks), `app/test/perf/synthesis_budget_test.dart`.

#### Dependencies
SN-BTY-020 (exemplars and aggregates), SN-BTY-021 (tiers and confidence). Gated per script by [SN-BTY-035](i18n.md#sn-bty-035); guarded at runtime by [SN-BTY-047](ocr-hwr.md#sn-bty-047).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-025

<a id="sn-bty-025"></a>

**Suggest instead of applying when the re-render is not confidently in your hand**

| Field | Value |
|---|---|
| GitHub | #1200 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | ocr-hwr, editor, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-021](ocr-hwr.md#sn-bty-021), [SN-BTY-023](ocr-hwr.md#sn-bty-023), [SN-BTY-013](editor.md#sn-bty-013) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A04`, `ASVS-V1`, `CWE-451`, `CWE-117`, `TM-I-05` |
| Extra labels | agent-ready |

#### Context
[SN-BTY-037](ocr-hwr.md#sn-bty-037) guards **meaning**: no beautification may change what a note says. This issue guards **appearance**: no correction may be written onto the page in handwriting that is not convincingly the user's own. The two gates are independent and both must pass. A correction that is spelled right but drawn in a stranger's letters is exactly the failure the maintainer's brief rules out — the user's handwriting is kept, not replaced — and the honest response when the style model cannot deliver is to *offer* the change rather than make it.

#### Scope
**In:** the style-confidence gate applied to every style re-render path ([SN-BTY-027](ocr-hwr.md#sn-bty-027) spelling, [SN-BTY-028](ocr-hwr.md#sn-bty-028) completion, [SN-BTY-029](ocr-hwr.md#sn-bty-029) grammar); the mapping from [SN-BTY-021](ocr-hwr.md#sn-bty-021) tiers to one of three outcomes — apply, suggest, or refuse; the **typed-preview fallback** when synthesis is unavailable so the user still learns what the correction would be; the per-profile "apply corrections automatically" setting, default **off**, which can only ever promote a T2 + high-confidence result; composition with [SN-BTY-049](compat.md#sn-bty-049) device tiers; the rule that a refusal is silent and costs the user nothing.
**Out:** the meaning gate and its edit taxonomy ([SN-BTY-037](ocr-hwr.md#sn-bty-037)); the before/after preview UI and per-word accept/reject ([SN-BTY-013](editor.md#sn-bty-013)); durable revert and undo wiring ([SN-BTY-012](editor.md#sn-bty-012)); the beautify intensity control ([SN-BTY-011](settings.md#sn-bty-011)).

#### Acceptance criteria
- [ ] With the default settings, **no** style re-render ever commits without an explicit user action; a test drives 500 fixture corrections through every path and finds zero committed ops.
- [ ] A result whose `StyleConfidence` is below 0.65, or whose tier is T0/T1, is presented as a suggestion regardless of the auto-apply setting, and a T0 result is refused outright (never previewed as ink).
- [ ] Enabling auto-apply requires a T2 tier **and** a device tier from [SN-BTY-049](compat.md#sn-bty-049) that supports synthesis; a test asserts a capable device with an untrained profile still never auto-applies, and a trained profile on a no-model device still never auto-applies.
- [ ] When synthesis is unavailable or refused, the correction is still offered as a typed preview labelled "we'll write this in your handwriting once Sane Sage has learned more" — never as ink in a system font on the page.
- [ ] The gate is a single API that all callers use; an arch test asserts no path constructs a re-render commit without passing through it.
- [ ] The decision (applied / suggested / refused) and its reason are attached to the edit record that [SN-BTY-037](ocr-hwr.md#sn-bty-037) keeps, so a reviewer can see *why* something was only suggested.
- [ ] Suggestion affordances are ≥ 44 pt / 48 dp, keyboard-operable on web, screen-reader labelled ("Suggested correction: necessary, in your handwriting. Double-tap to accept."), never colour-only, contrast ≥ 4.5:1 across all 17 looks and dark mode.
- [ ] Gate evaluation adds ≤ 2 ms per correction and never runs on the UI isolate's draw path.

#### Technical notes
`packages/sane_ml/lib/src/style/render_gate.dart` (pure decision logic, unit-testable, returns a sealed `RenderDecision`) plus `app/lib/features/editor/beautify/render_gate_provider.dart` composing it with [SN-BTY-049](compat.md#sn-bty-049)'s capability probe and the user setting. Presentation reuses [SN-BTY-013](editor.md#sn-bty-013)'s preview overlay and [SN-BTY-012](editor.md#sn-bty-012)'s revert affordance rather than introducing a third chrome; this issue supplies the decision and the copy, not new UI machinery. The typed-preview fallback renders with `sane_ui` typography, visually distinct from ink so it can never be mistaken for something already on the page.

#### Security & privacy
This is an integrity and honest-UI control (OWASP-A04 insecure design, CWE-451 misleading interface): the threat is that a low-quality re-render is applied silently, the user never notices, and their note of record is now in an alien hand. Mitigations are default-off auto-apply, a hard tier floor, refusal over approximation, and the reason recorded on the edit record. All local (MASVS-PRIVACY-1); decisions, confidences and target strings are note content and never logged (TM-I-05, CWE-117).

#### UX notes
Copy must never blame the user or the app's youth in a way that reads as breakage — "Sane Sage is still learning your handwriting" is the tone. States: applied, suggested, typed-preview fallback, refused (silent), auto-apply on, auto-apply unavailable on this device. Design surfaces: editor selection/context bar `design/Sane Notes.dc.html` §7.4 and Settings → Handwriting ([SN-SET-007](settings.md#sn-set-007)). Respect Reduce Motion. A11y is mandatory: suggestions must be reachable through a labelled list for screen-reader and keyboard users, not only by tapping ink ([SN-A11Y-001](a11y.md#sn-a11y-001)).

#### Test plan
`packages/sane_ml/test/style/render_gate_test.dart` (tier × confidence × device-tier × setting truth table), `app/test/editor/render_gate_no_silent_apply_test.dart` (500-correction sweep), `app/test/editor/typed_preview_fallback_test.dart`, `app/test/arch/render_gate_is_single_entry_test.dart`, golden `app/test/golden/style_suggestion_affordance_*` across looks and dark, `app/test/a11y/style_suggestion_semantics_test.dart`.

#### Dependencies
SN-BTY-021 (tiers and confidence), SN-BTY-023 (the result being gated), SN-BTY-013 (preview surface reused). Composes [SN-BTY-049](compat.md#sn-bty-049); records into [SN-BTY-037](ocr-hwr.md#sn-bty-037).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-026

<a id="sn-bty-026"></a>

**Detect misspelled handwritten words on-device with dictionary-aware suppression**

| Field | Value |
|---|---|
| GitHub | #1174 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | ocr-hwr, ai, i18n |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-HWR-006](ocr-hwr.md#sn-hwr-006), [SN-HWR-016](ocr-hwr.md#sn-hwr-016), [SN-BTY-036](i18n.md#sn-bty-036) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117`, `TM-I-05`, `TM-I-08` |
| Extra labels | agent-ready |

#### Context
"Anyone with bad spelling gets it beautified" is half the maintainer's brief for [SN-BTY-001](ocr-hwr.md#sn-bty-001). Doing it on handwriting is harder than on typed text because a flag can be wrong for two different reasons: the writer really did misspell the word, **or** the recogniser misread their handwriting. Flagging the second case teaches users to distrust the feature within a page. This issue builds the detection engine — recognised ink in, a ranked list of "probably misspelled, probably meant this" out — with the false-positive rate as the primary quality bar. [SN-BTY-027](ocr-hwr.md#sn-bty-027) renders the result; [SN-HWR-017](ocr-hwr.md#sn-hwr-017) is the thin M3 scaffold this supersedes in depth.

#### Scope
**In:** a `HandwritingSpellChecker` over the recognised word stream from [SN-HWR-006](ocr-hwr.md#sn-hwr-006); per-language dictionaries (Hunspell `.dic`/`.aff` with affix expansion) fetched through the model manager ([SN-HWR-004](ocr-hwr.md#sn-hwr-004)); candidate generation (SymSpell symmetric-delete index, Damerau–Levenshtein ≤ 2, a **pen-confusion** cost matrix rather than a keyboard one); ranking by unigram/bigram frequency *and by ink evidence* — re-scoring against the recogniser's own n-best list; **recognition-doubt suppression**; suppression from the custom dictionary ([SN-HWR-016](ocr-hwr.md#sn-hwr-016)), proper nouns, acronyms, numbers, units, URLs and code-like tokens; language resolution from [SN-BTY-036](i18n.md#sn-bty-036).
**Out:** the indicator and correction UX ([SN-BTY-027](ocr-hwr.md#sn-bty-027)); grammar-level rules ([SN-BTY-029](ocr-hwr.md#sn-bty-029)); typed-text spellcheck ([SN-TXT-023](text.md#sn-txt-023)); the adversarial do-not-correct corpus and its CI gate ([SN-BTY-038](ocr-hwr.md#sn-bty-038)), which this engine must pass but does not own.

#### Acceptance criteria
- [ ] On the labelled handwriting fixture corpus ([SN-BTY-044](qa.md#sn-bty-044)), precision ≥ 0.95 and recall ≥ 0.80 for real misspellings, asserted in package tests; the engine exposes the hooks the later adversarial do-not-correct gate ([SN-BTY-038](ocr-hwr.md#sn-bty-038)) needs, and must not regress when that gate lands.
- [ ] A word whose recognition confidence is < 0.80, or whose top-2 n-best candidates differ by more than edit distance 1, is never flagged.
- [ ] Words in the custom dictionary ([SN-HWR-016](ocr-hwr.md#sn-hwr-016)), proper-noun/acronym/unit/URL patterns, and words inside maths or code regions ([SN-BTY-039](ocr-hwr.md#sn-bty-039)) are never flagged.
- [ ] The top-3 candidates contain the intended word for ≥ 90 % of true positives in the corpus.
- [ ] Checking a 500-word page costs ≤ 200 ms on the mid-tier Android reference device on a background isolate; incremental re-check of one edited word ≤ 10 ms; nothing runs while the pen is down.
- [ ] Language resolution order is per-block detected language ([SN-BTY-036](i18n.md#sn-bty-036)) → notebook language → device locale; a block whose script tier forbids word-level correction ([SN-BTY-035](i18n.md#sn-bty-035)) is skipped entirely.
- [ ] Fully on-device; a test asserts no network call even with `SANE_AI_CLOUD_ENABLED=true`. A missing dictionary degrades to "off for this language" with a download offer, never a crash.

#### Technical notes
`packages/sane_ml/lib/src/spell/` — `checker.dart`, `symspell_index.dart`, `candidates.dart`, `suppression.dart`; pure Dart, `Result<T, Failure>` returns. Dictionaries are versioned assets fetched by [SN-HWR-004](ocr-hwr.md#sn-hwr-004) and hash-verified before use (ADR-0016 §8), stored as content-addressed blobs. The pen-confusion cost table (rn↔m, cl↔d, i↔l, 0↔o, a↔o) is derived from the recogniser's confusion matrix, not a QWERTY adjacency model — this is handwriting, not typing. N-best re-scoring uses the candidate list ML Kit Digital Ink already returns per `Ink`; where MyScript is the resolved engine, use its candidate API. Frequency lists ship per language at ≤ 2 MB, loaded lazily. ML Kit GenAI `Proofreader` is explicitly **not** used here — foreground-only, per-app quota and flagship-only make it unsuitable for a core path (ADR-0016 §4); it is at most a ranking accelerator for [SN-BTY-029](ocr-hwr.md#sn-bty-029).

#### Security & privacy
Recognised text and flags are note content: on-device only (MASVS-PRIVACY-1), never logged, never sent to any cloud adapter — spellcheck has no cloud path at all, so TM-I-08 is satisfied by absence (OWASP-A03). Dictionaries are downloaded over TLS and integrity-checked before load, with the hash pinned in the model manifest and the source recorded in the SBOM; a corrupt dictionary fails closed. No per-word telemetry ever: flag counts would leak vocabulary (TM-I-05, TM-P-05).

#### UX notes
No UI here; this produces the model [SN-BTY-027](ocr-hwr.md#sn-bty-027) paints. The precision bar is a UX decision written as a number — a user who sees one wrong flag per page turns the feature off and never returns. Dictionary-download prompts reuse the recognition-language picker ([SN-I18N-010](i18n.md#sn-i18n-010)) and state the download size.

#### Test plan
`packages/sane_ml/test/spell/checker_precision_test.dart` (precision/recall gates on the labelled corpus), `packages/sane_ml/test/spell/suppression_test.dart` (dictionary, proper nouns, low confidence, n-best disagreement, maths/code regions), `packages/sane_ml/test/spell/candidates_test.dart` (top-3 containment, pen-confusion costs), `packages/sane_ml/test/spell/perf_test.dart`, `app/test/security/spellcheck_no_network_test.dart`.

#### Dependencies
SN-HWR-006 (recognised words and confidences), SN-HWR-016 (custom dictionary), SN-BTY-036 (per-block language). Gated by [SN-BTY-035](i18n.md#sn-bty-035); later hardened by [SN-BTY-038](ocr-hwr.md#sn-bty-038); models via [SN-HWR-004](ocr-hwr.md#sn-hwr-004).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-027

<a id="sn-bty-027"></a>

**Flag misspellings in the ink layer and correct them in the writer's own hand**

| Field | Value |
|---|---|
| GitHub | #1175 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | ocr-hwr, editor, a11y |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-026](ocr-hwr.md#sn-bty-026), [SN-BTY-024](ink.md#sn-bty-024), [SN-BTY-030](ocr-hwr.md#sn-bty-030) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A04`, `CWE-451`, `CWE-117`, `TM-I-05` |
| Extra labels | agent-ready, innovation |

#### Context
This is the headline moment of [SN-BTY-001](ocr-hwr.md#sn-bty-001): a student writes "recieve", a hairline mark appears beneath it, they tap, and the word becomes "receive" **in their own handwriting**, with the rest of the line sliding to make room. Goodnotes does this on Apple hardware only and Apple does it on iPad only (`docs/research/sources/goodnotes-userguide-inventory.md` §On-device AI; `docs/research/sources/apple-notes-freeform.md` §2). Doing it on iPad, Android tablets, web and both phones is the differentiator. This issue owns the two pieces nothing else does — the **in-ink indicator** and the **correction sheet** — and composes everything else: detection ([SN-BTY-026](ocr-hwr.md#sn-bty-026)), synthesis and commit ([SN-BTY-023](ocr-hwr.md#sn-bty-023)/[SN-BTY-024](ink.md#sn-bty-024)), the edit transaction ([SN-BTY-030](ocr-hwr.md#sn-bty-030)), the meaning gate ([SN-BTY-037](ocr-hwr.md#sn-bty-037)), the style gate ([SN-BTY-025](ocr-hwr.md#sn-bty-025)) and revert ([SN-BTY-012](editor.md#sn-bty-012)).

#### Scope
**In:** the misspelling indicator drawn in the overlay layer along the word's **actual handwritten baseline** (which curves and drifts, unlike a text underline), zoom-aware, descender-avoiding; hit-testing it; the correction sheet listing up to five candidates, each previewed in the writer's own hand; "Add to dictionary" and "Ignore in this notebook"; per-notebook enable/disable beside the recognition language; the low-coverage path that shows a typed preview instead ([SN-BTY-025](ocr-hwr.md#sn-bty-025)).
**Out:** detection ([SN-BTY-026](ocr-hwr.md#sn-bty-026)); synthesis ([SN-BTY-023](ocr-hwr.md#sn-bty-023)); spacing and reflow ([SN-BTY-007](ocr-hwr.md#sn-bty-007)); the transaction ([SN-BTY-030](ocr-hwr.md#sn-bty-030)); the durable revert affordance ([SN-BTY-012](editor.md#sn-bty-012)); grammar ([SN-BTY-029](ocr-hwr.md#sn-bty-029)).

#### Acceptance criteria
- [ ] The indicator follows the handwritten baseline within 2 logical px on a line drifting up to 15°, never crosses a descender, and re-renders correctly at every zoom bucket.
- [ ] The indicator is **not colour-only**: a distinct dotted/wavy form plus a token tint, legible at ≥ 3:1 against paper in all 17 looks and dark mode, and exposed to screen readers as "possible spelling mistake, receive".
- [ ] Tapping a flagged word opens the sheet in ≤ 120 ms with candidate previews already rendered in the user's hand at T2, or as typed candidates with a "still learning your handwriting" note below T2.
- [ ] Accepting a correction replaces the ink and reflows the line within 250 ms end to end on the mid-tier Android reference device, with no frame > 16.7 ms, and is reverted exactly by a single Undo ([SN-BTY-012](editor.md#sn-bty-012)).
- [ ] Nothing is corrected without a tap unless auto-apply is on and both gates pass ([SN-BTY-025](ocr-hwr.md#sn-bty-025), [SN-BTY-037](ocr-hwr.md#sn-bty-037)).
- [ ] Spellcheck can be disabled per notebook and is off by default for any script below Tier A ([SN-BTY-035](i18n.md#sn-bty-035)).
- [ ] Full keyboard operation on web (Tab to next flag, Enter to open, arrows to choose, Esc to dismiss) and full VoiceOver/TalkBack operation through a labelled suggestions list, not tap-only.
- [ ] Indicators are overlay chrome: never flattened into ink, never persisted as strokes, never exported to PDF or PNG.

#### Technical notes
Indicator painting in `app/lib/features/editor/beautify/spell_indicator_painter.dart` — a `CustomPainter` inside the overlay `RepaintBoundary` (`docs/architecture/ink-engine.md` §5.1 layer 5) fed word boxes and baselines from [SN-BTY-003](ocr-hwr.md#sn-bty-003)/[SN-BTY-004](ocr-hwr.md#sn-bty-004); hit-testing through the page R-tree (§7). The sheet is a `sane_ui` component; candidate previews call the synthesis provider and are cached per word for the session so reopening is instant. Accepting hands the whole change to [SN-BTY-030](ocr-hwr.md#sn-bty-030) as one transaction, so ink replacement, reflow and the audit record commit atomically. Detection and painting run only after the background recognition pass settles — never on the wet-ink path.

#### Security & privacy
Corrections rewrite the user's note, so the integrity controls apply in full (OWASP-A04, CWE-451): explicit tap by default, both gates, visible attribution and exact revert. All processing is local (MASVS-PRIVACY-1); flagged words, candidates and accepted corrections are note content and never logged or transmitted (TM-I-05, CWE-117). Corrected ink is E2E-encryptable on sync exactly like handwritten ink (MASVS-STORAGE-1). Positive side effect: corrected words improve the OCR alt-text that screen-reader users depend on ([SN-A11Y-004](a11y.md#sn-a11y-004)).

#### UX notes
The indicator must be quieter than a browser's red squiggle — this is someone's notebook, not a document under review. Design surfaces: editor canvas `design/Sane Notes.dc.html` §7 and selection/context bar §7.4; settings row `docs/design/screens-and-flows.md` §12. States: no flags, flags present, sheet open, applying (Reduce-Motion-safe), applied, "still learning your handwriting", "spellcheck unavailable for this language" with a download action. On phones the sheet is a bottom sheet echoing the word at the top. Never stack two sheets.

#### Test plan
`app/test/editor/spell_indicator_test.dart` (baseline tracking, descender avoidance, zoom buckets, hit-testing), `app/test/editor/spell_correction_flow_test.dart` (tap → candidates → apply → reflow → single undo restores exactly), golden `app/test/golden/spell_indicator_*` and `spell_correction_sheet_*` across looks and dark, `app/test/a11y/spell_indicator_semantics_test.dart` (labels, keyboard traversal, not colour-only), `app/test/perf/spell_apply_budget_test.dart`, `integration_test/beautify_spellcheck_test.dart`.

#### Dependencies
SN-BTY-026 (detection), SN-BTY-024 (rendered synthesis), SN-BTY-030 (atomic edit transaction). Gated by [SN-BTY-025](ocr-hwr.md#sn-bty-025) and [SN-BTY-037](ocr-hwr.md#sn-bty-037); reverted by [SN-BTY-012](editor.md#sn-bty-012).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-028

<a id="sn-bty-028"></a>

**Add opt-in handwriting word completion rendered in the writer's hand**

| Field | Value |
|---|---|
| GitHub | #1176 |
| Type | feature |
| Priority | p3 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | ocr-hwr, editor, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-023](ocr-hwr.md#sn-bty-023), [SN-BTY-025](ocr-hwr.md#sn-bty-025) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-3`, `OWASP-A04`, `CWE-451`, `CWE-117`, `TM-I-05`, `TM-I-07` |
| Extra labels | agent-ready, innovation |

#### Context
Once the app can write in your hand, it can finish a word you started: "photosynth…" ghosts into "photosynthesis" in your own letters and a tap accepts it. For a student taking dense lecture notes that is a real speed win, and no pen app ships it. It is also the most dangerous idea in [SN-BTY-001](ocr-hwr.md#sn-bty-001), because an autocorrect that commits on its own is how notes get quietly falsified. So it ships **off by default, opt-in, and structurally incapable of committing without a visible, dismissible affordance**.

#### Scope
**In:** a completion engine over the in-progress word (prefix lookup in the [SN-BTY-026](ocr-hwr.md#sn-bty-026) index, biased by the custom dictionary [SN-HWR-016](ocr-hwr.md#sn-hwr-016) and by words already on the page); a ghosted inline preview rendered by [SN-BTY-023](ocr-hwr.md#sn-bty-023) ahead of the pen at reduced opacity; accept by tapping the ghost or by a configurable pen gesture; automatic dismissal the moment the next stroke contradicts the prediction; the opt-in setting and its explanation; the hard rule that the ghost is never committed by a timer, by pen-up, by scrolling, by a page change, or by backgrounding.
**Out:** correction of finished words ([SN-BTY-027](ocr-hwr.md#sn-bty-027)); grammar ([SN-BTY-029](ocr-hwr.md#sn-bty-029)); typed-text autocomplete (OS-provided); the confidence gate itself ([SN-BTY-025](ocr-hwr.md#sn-bty-025)), which this uses.

#### Acceptance criteria
- [ ] Off by default; enabling requires an explicit switch in Settings → Handwriting whose copy states that Sane Notes will suggest endings drawn in your handwriting.
- [ ] The ghost never commits without a deliberate accept: a test drives 1,000 fixture pen sessions including pen-up, scroll, page change, backgrounding and app kill, and asserts zero committed completions.
- [ ] A ghost appears only after ≥ 3 recognised characters and only when the top candidate's probability margin over the runner-up is ≥ 0.25; otherwise nothing is shown.
- [ ] Ghost rendering adds **zero** cost to the wet-ink path — overlay layer, background isolate — and `tools/perf_harness` shows unchanged pen-down→pixel latency (≤ 16 ms iPad, ≤ 25 ms mid Android, ≤ 30 ms web) and no frame > 16.7 ms with completion enabled.
- [ ] Writing a character that contradicts the ghost dismisses it within one frame; the ghost never collides with the pen tip or the estimated hand-rest region.
- [ ] Accepted completions carry the `synthesised` provenance flag ([SN-BTY-024](ink.md#sn-bty-024)) and pass both the style gate ([SN-BTY-025](ocr-hwr.md#sn-bty-025)) and the meaning gate ([SN-BTY-037](ocr-hwr.md#sn-bty-037)).
- [ ] Completion is disabled entirely for scripts below Tier A ([SN-BTY-035](i18n.md#sn-bty-035)) and inside maths, code and protected regions ([SN-BTY-039](ocr-hwr.md#sn-bty-039)).
- [ ] Screen-reader and keyboard users get an equivalent path — completion offered as a labelled list rather than a spatial ghost — and the ghost is announced, not silent.
- [ ] The ghost is suppressed while the note is locked, while screenshot-blocking is active, and in presentation or screen-share mode.

#### Technical notes
`packages/sane_ml/lib/src/complete/prefix_engine.dart` (pure Dart, reusing the [SN-BTY-026](ocr-hwr.md#sn-bty-026) SymSpell index and frequency lists) plus `app/lib/features/editor/beautify/completion_ghost.dart` painting into the overlay `RepaintBoundary`. The in-progress word comes from incremental recognition ([SN-HWR-009](ocr-hwr.md#sn-hwr-009)) where available, otherwise from re-recognising the current word cluster ([SN-BTY-003](ocr-hwr.md#sn-bty-003)) on stroke-end. Requests are debounced to stroke boundaries — never `PointerMoveEvent` (`CLAUDE.md` §8). The accept gesture must not steal the pointer from ink: hit-test the ghost bounds inside the existing raw `Listener`, never add a `GestureDetector` to the arena (`docs/architecture/ink-engine.md` §1.1). The page-local word list comes from the recognition index of [SN-HWR-006](ocr-hwr.md#sn-hwr-006).

#### Security & privacy
On-device only (MASVS-PRIVACY-1); prefixes, candidates and the page-local word list are note content, never logged or transmitted (TM-I-05, CWE-117). The primary risk is silent modification of meaning (OWASP-A04, CWE-451), controlled by default-off, the explicit accept requirement, provenance and revert. The secondary risk is shoulder-surfing and leakage: a ghost renders a predicted word on screen, so it must be suppressed for locked notes, under screenshot-blocking and in presentation mode (MASVS-PLATFORM-3, TM-I-07).

#### UX notes
The ghost is ink colour at ~35 % opacity with no box or chrome — it must read as faint pencil, not as a popover (`docs/design/pen-and-brush-spec.md` colour roles; `sane_ui` tokens across all 17 looks and dark). States: off, armed with nothing predicted, ghost shown, accepted, dismissed. It fades, never slides, and honours Reduce Motion. Never more than one ghost at a time. On phones, suppress the ghost when the predicted span falls under the estimated palm region ([SN-BTY-043](a11y.md#sn-bty-043) phone tuning).

#### Test plan
`packages/sane_ml/test/complete/prefix_engine_test.dart` (margin threshold, dictionary and page-local bias), `app/test/editor/completion_ghost_test.dart` (never auto-commits across 1,000 sessions including lifecycle events; divergence dismissal), `app/test/perf/completion_latency_test.dart` (wet-ink latency unchanged), golden `app/test/golden/completion_ghost_*`, `app/test/a11y/completion_alternative_path_test.dart`, `app/test/security/completion_suppressed_when_locked_test.dart`.

#### Dependencies
SN-BTY-023 (ghost ink), SN-BTY-025 (style gate and never-auto-commit policy). Reads [SN-HWR-006](ocr-hwr.md#sn-hwr-006)/[SN-HWR-009](ocr-hwr.md#sn-hwr-009) recognition and [SN-HWR-016](ocr-hwr.md#sn-hwr-016) dictionary.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-029

<a id="sn-bty-029"></a>

**Surface non-intrusive grammar and structure suggestions from the on-device model**

| Field | Value |
|---|---|
| GitHub | #1177 |
| Type | feature |
| Priority | p3 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | ocr-hwr, ai, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-026](ocr-hwr.md#sn-bty-026), [SN-BTY-037](ocr-hwr.md#sn-bty-037) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A03`, `OWASP-A04`, `CWE-117`, `TM-I-05`, `TM-I-08` |
| Extra labels | agent-ready |

#### Context
The maintainer's brief names "structure" as well as spelling. Beyond geometry ([SN-BTY-032](ocr-hwr.md#sn-bty-032), [SN-BTY-033](ocr-hwr.md#sn-bty-033)), the textual half of structure is a small, high-confidence class of mechanical errors people make while writing fast: a sentence starting lowercase, a doubled "the the", a missing full stop at the end of a paragraph, "i" for "I", a space before a comma. Samsung ships spelling and grammar in Notes; Goodnotes charges AI credits for proofreading (`docs/research/sources/samsung-notes-nebo-other.md` §AI features; `docs/research/sources/goodnotes-userguide-inventory.md` §Advanced AI). Sane Notes does it on-device, for free, and keeps it quiet — a notebook is not a document under review.

#### Scope
**In:** a closed, deterministic rule set over recognised text (sentence-initial capitalisation, duplicated adjacent word, missing terminal punctuation at a paragraph end, standalone lowercase "i" in English, repeated punctuation, space before punctuation), each with a language applicability list and a confidence; grouping into one unobtrusive "N suggestions" affordance rather than per-word marks on the ink; application through the same synthesis, transaction and revert path as spelling; per-rule and global enable/disable; an **optional** on-device LLM pass that may only rank and filter rule hits.
**Out:** tone or style rewriting, summarisation and any generative editing — those are Sane Sage features under [SN-AI-001](ai.md#sn-ai-001) and are explicitly not beautification; spelling ([SN-BTY-026](ocr-hwr.md#sn-bty-026)); geometric structure ([SN-BTY-032](ocr-hwr.md#sn-bty-032)); the meaning gate ([SN-BTY-037](ocr-hwr.md#sn-bty-037)), which every applied suggestion passes.

#### Acceptance criteria
- [ ] Only the enumerated rules can produce a suggestion; a test asserts the registry is closed and that no free-form model output can reach the suggestion pipeline.
- [ ] Where an on-device LLM is available it may only re-rank or suppress rule hits; its output is validated against the originating rule and discarded on mismatch — a test feeds an adversarial model response and asserts it is dropped.
- [ ] Precision on the fixture corpus ≥ 0.97: grammar flags must be rarer and safer than spelling flags, and any rule below this is disabled by default.
- [ ] Suggestions never paint marks over the ink; they appear as one collapsed affordance in the page chrome that expands into a labelled list.
- [ ] Applying a suggestion goes through [SN-BTY-030](ocr-hwr.md#sn-bty-030), [SN-BTY-025](ocr-hwr.md#sn-bty-025) and [SN-BTY-037](ocr-hwr.md#sn-bty-037), and a single Undo restores the original strokes exactly ([SN-BTY-012](editor.md#sn-bty-012)).
- [ ] Rules are skipped for any block whose language is not in the rule's applicability list, and entirely for scripts below Tier A ([SN-BTY-035](i18n.md#sn-bty-035)).
- [ ] No cloud path: with `SANE_AI_CLOUD_ENABLED=true` and cloud AI opted into elsewhere, grammar suggestions still never leave the device; asserted by test.
- [ ] A full-page check costs ≤ 150 ms on a background isolate and never runs while the pen is down.

#### Technical notes
`packages/sane_ml/lib/src/grammar/rules/` — one file per rule implementing `GrammarRule` with `appliesTo(languageTag)` and `check(TextBlock)`, registered in a closed `registry.dart`. Sentence segmentation uses Unicode UAX #29 sentence boundaries through ICU data (`package:intl`), never a regex split on ".". The optional model pass goes through the `TextGenerator` capability of `sane_ml` ([SN-HWR-002](ocr-hwr.md#sn-hwr-002), ADR-0016 §3): Apple Foundation Models with `@Generable` guided generation typed to `{ruleId, keep: bool}`, or ML Kit GenAI `Proofreader` on supported Android flagships (foreground-only, per-app quota; handle `BUSY` and `BACKGROUND_USE_BLOCKED` per ADR-0016 §4). Where neither exists — web, older devices — the rules run alone; the model is an accelerator, never a dependency.

#### Security & privacy
On-device by default and, unusually, on-device **only**: beautification never escalates to cloud inference, so decision 6's per-request opt-in does not apply and TM-I-08 is satisfied by absence (OWASP-A03). Recognised text and suggestions are note content and are never logged (TM-I-05, CWE-117). The closed registry plus output validation is the prompt-injection and insecure-output-handling control (OWASP-A04; `docs/security/secure-coding-checklist.md` LLM-output rules): note content is untrusted input to the model, so the model may only vote on a pre-existing rule hit and may never author text that lands on the page.

#### UX notes
Deliberately quiet: one small chip near the page rail ("3 suggestions"), never squiggles under prose. Expanding shows a labelled list with the original and the proposed phrasing, each previewed in the writer's hand. Copy never grades the user — "Sentence could start with a capital", not "Grammar error". States: none, some, applied, reverted, rule muted. All 17 looks and dark, ≥ 44 pt / 48 dp targets, keyboard-reachable, screen-reader-labelled list ([SN-A11Y-001](a11y.md#sn-a11y-001)).

#### Test plan
`packages/sane_ml/test/grammar/rules_test.dart` (table-driven per rule, language applicability, precision gate), `packages/sane_ml/test/grammar/registry_closed_test.dart` (no free-form path), `packages/sane_ml/test/grammar/model_reranker_test.dart` (adversarial response discarded; graceful absence of a model), `app/test/editor/grammar_suggestion_chip_test.dart`, golden `app/test/golden/grammar_suggestion_chip_*`, `app/test/security/grammar_no_cloud_test.dart`.

#### Dependencies
SN-BTY-026 (recognised, language-tagged text stream), SN-BTY-037 (meaning gate every applied suggestion passes). Applies through [SN-BTY-030](ocr-hwr.md#sn-bty-030); uses the `TextGenerator` capability from [SN-HWR-002](ocr-hwr.md#sn-hwr-002).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-030

<a id="sn-bty-030"></a>

**Apply a word-level ink edit as one atomic correct, insert or delete transaction**

| Field | Value |
|---|---|
| GitHub | #1178 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, editor, ink |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-007](ocr-hwr.md#sn-bty-007), [SN-BTY-003](ocr-hwr.md#sn-bty-003), [SN-ED-003](editor.md#sn-ed-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A04`, `CWE-117`, `TM-I-05`, `TM-R-01` |
| Extra labels | agent-ready, innovation |

#### Context
Correcting a handwritten word is not one change — it is five: remove the old strokes, place new ones, re-solve the line's spacing, keep every other region still, and record enough to undo all of it exactly. Apple's Smart Script presents this as a single fluid gesture ("Move handwriting — drag to reposition, or insert space so text reflows", `docs/research/sources/apple-notes-freeform.md` §2). If those five steps are separate operations, a failure halfway leaves a page with a missing word, a sync peer sees a torn intermediate state, and Undo becomes a five-tap chore. This issue defines the **edit transaction** that composes them: the spacing/reflow solver from [SN-BTY-007](ocr-hwr.md#sn-bty-007), the synthesised replacement from [SN-BTY-024](ink.md#sn-bty-024), the propagation bounds from [SN-BTY-031](ocr-hwr.md#sn-bty-031), the meaning gate from [SN-BTY-037](ocr-hwr.md#sn-bty-037) and the undo record from [SN-BTY-012](editor.md#sn-bty-012) — all or nothing.

#### Scope
**In:** the `InkEditTransaction` API with three primitives — `replaceWord`, `insertWord` and `deleteWord` — each taking a target word segment from [SN-BTY-003](ocr-hwr.md#sn-bty-003); the ordered pipeline (validate → gate → build replacement → solve line → check bounds → commit); rollback on any stage failure with the page provably unchanged; a single CRDT op batch so sync peers never observe an intermediate state; deterministic ordering so two transactions queued in one frame cannot interleave; the audit record handed to [SN-BTY-012](editor.md#sn-bty-012)/[SN-BTY-037](ocr-hwr.md#sn-bty-037); an idempotency key so a retry cannot double-apply.
**Out:** the spacing and reflow solver itself ([SN-BTY-007](ocr-hwr.md#sn-bty-007)); synthesis ([SN-BTY-023](ocr-hwr.md#sn-bty-023)/[SN-BTY-024](ink.md#sn-bty-024)); region bounds ([SN-BTY-031](ocr-hwr.md#sn-bty-031)); the meaning taxonomy ([SN-BTY-037](ocr-hwr.md#sn-bty-037)); the undo stack ([SN-BTY-012](editor.md#sn-bty-012)); the UI that triggers edits ([SN-BTY-027](ocr-hwr.md#sn-bty-027), [SN-BTY-028](ocr-hwr.md#sn-bty-028), [SN-BTY-029](ocr-hwr.md#sn-bty-029)).

#### Acceptance criteria
- [ ] A `replaceWord` transaction commits exactly one op batch containing the stroke deletions, the new strokes and every transform the line solver produced; a sync-merge test shows a peer never observes a partial state.
- [ ] Failure at any stage — gate refusal, synthesis failure, solver failure, bounds violation — rolls back completely: a byte-comparison test proves the page's serialised strokes are identical to before.
- [ ] A single Undo reverses the whole transaction and a single Redo re-applies it, with strokes restored byte-identically after re-serialisation ([SN-BTY-012](editor.md#sn-bty-012)).
- [ ] `insertWord` makes space and places the new word without disturbing any other block ([SN-BTY-031](ocr-hwr.md#sn-bty-031)); `deleteWord` closes the gap and un-wraps a following word where the line solver says so.
- [ ] The recognised word sequence of the page changes only by the intended edit: a test compares the recognised sequence before and after and asserts exactly one word differs for `replaceWord`, one added for `insertWord`, one removed for `deleteWord`.
- [ ] Two transactions submitted in the same frame apply in submission order; an idempotency key makes a retried transaction a no-op.
- [ ] A full transaction on a 40-word paragraph completes in ≤ 200 ms on the mid-tier Android reference device off the UI isolate, with no frame > 16.7 ms during the commit and animation.
- [ ] Glyph geometry is never distorted by the transaction itself: any stroke it moves is translated only, with point-to-point distances unchanged.

#### Technical notes
`app/lib/features/editor/beautify/ink_edit_transaction.dart` is the composition point, because the pieces live in packages that may not import each other (`docs/architecture/overview.md` §5): the solver in `sane_ink`, synthesis in `sane_ml`, the model in `sane_core`. Commit as one op batch through [SN-CORE-003](sync.md#sn-core-003) using per-object LWW transform registers so a concurrent remote stroke edit merges rather than being clobbered; stamp every op in the batch with one HLC so ordering is stable. Tile invalidation is computed once over the union of source and destination bounds (`docs/architecture/ink-engine.md` §6.1), not per stroke. The transaction runs off the UI isolate and hands the editor a completed plan to animate; nothing in it touches a `PointerMoveEvent` path. Before synthesis lands ([SN-BTY-024](ink.md#sn-bty-024)), `replaceWord` is reachable only from convert-to-text flows — the transaction is engine-agnostic by design.

#### Security & privacy
The transaction is where a beautification edit becomes durable, so it is the enforcement point for atomicity and attribution: the batch carries the edit class from [SN-BTY-037](ocr-hwr.md#sn-bty-037) and the provenance of any synthesised stroke ([SN-BTY-024](ink.md#sn-bty-024)), which is what lets a user later see that a word was machine-placed (TM-R-01). All local (MASVS-PRIVACY-1); moved and replaced ink stays E2E-encryptable on sync (MASVS-STORAGE-1) and nothing about the edit is logged (TM-I-05, CWE-117). Integrity control (OWASP-A04): rollback on failure means a crash mid-edit can never leave a note missing a word.

#### UX notes
Invisible machinery, but two behaviours are user-visible: the page must never flash a half-applied state, and a failed transaction must do nothing rather than show an error toast over the canvas. Any animation of the resulting movement is capped at 250 ms, eases as a group, and is replaced by an instant transition under Reduce Motion. A11y: announce the completed edit once ("corrected, line reflowed"), never per stroke.

#### Test plan
`app/test/editor/ink_edit_transaction_test.dart` (all-or-nothing rollback with byte comparison, ordering, idempotency key), `app/test/editor/ink_edit_word_sequence_test.dart` (exactly one word differs), `packages/sane_core/test/ink_edit_batch_merge_test.dart` (CRDT merge with a concurrent remote edit; no partial state), `app/test/editor/ink_edit_undo_redo_test.dart`, `app/test/perf/ink_edit_budget_test.dart`, golden `app/test/golden/ink_edit_before_after_*`.

#### Dependencies
SN-BTY-007 (spacing and reflow solver), SN-BTY-003 (word segments), SN-ED-003 (undo stack). Composes [SN-BTY-024](ink.md#sn-bty-024), [SN-BTY-031](ocr-hwr.md#sn-bty-031), [SN-BTY-037](ocr-hwr.md#sn-bty-037) and [SN-BTY-012](editor.md#sn-bty-012).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-031

<a id="sn-bty-031"></a>

**Bound reflow to its own block and column so unrelated ink never moves**

| Field | Value |
|---|---|
| GitHub | #1179 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, editor, pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-007](ocr-hwr.md#sn-bty-007), [SN-BTY-039](ocr-hwr.md#sn-bty-039) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A04`, `CWE-117`, `TM-I-05` |
| Extra labels | agent-ready |

#### Context
[SN-BTY-039](ocr-hwr.md#sn-bty-039) decides which ink must **never be beautified** — maths, diagrams, PDF annotations, user-excluded regions. This issue answers a different question that the reflow solver ([SN-BTY-007](ocr-hwr.md#sn-bty-007)) asks every time it runs: when a word widens, **how far does the shift propagate?** A real student page is not a column of prose — it is two columns, a diagram with labels, an arrow pointing at a word, a margin note, and a formula. Naively shifting "the rest of the line" drags a diagram label away from its diagram or pushes a margin note into the text. This is the "without disturbing unrelated ink" requirement of [SN-BTY-001](ocr-hwr.md#sn-bty-001), expressed as a layout graph that bounds propagation.

#### Scope
**In:** a page layout graph built on top of [SN-BTY-003](ocr-hwr.md#sn-bty-003)'s blocks — column detection, block adjacency, and **attachment edges** (ink inside a shape's bounds, ink joined to a shape by a leader line or arrow, a caption directly beneath a figure, a margin note tethered to a line); per-node propagation policy (`reflowable`, `movesWithOwner`, `frozen`) with `frozen` as the default for anything unclassified; hard stops at column and block boundaries; PDF-anchor stability so annotation ink keeps its offset from the underlying page content; incremental invalidation of the graph; an explicit lasso override ("reflow just this selection").
**Out:** the protected-context taxonomy and exclusion model ([SN-BTY-039](ocr-hwr.md#sn-bty-039)), consumed here; the reflow solver ([SN-BTY-007](ocr-hwr.md#sn-bty-007)); block segmentation ([SN-BTY-003](ocr-hwr.md#sn-bty-003)); shape recognition ([SN-SHP-001](shapes-diagrams.md#sn-shp-001)).

#### Acceptance criteria
- [ ] On a fixture corpus of 30 realistic mixed pages (two-column notes, diagram plus labels, margin annotations, PDF annotations, maths), a single-word correction displaces **zero** strokes outside the edited block; a regression fails CI.
- [ ] Ink inside a recognised shape's bounds, or joined to it by a leader line, is `movesWithOwner`: it moves when the shape moves and never when a neighbouring line reflows.
- [ ] Column detection splits a two-column page correctly for ≥ 90 % of the fixture pages, and a reflow in the left column never moves right-column ink.
- [ ] Any node the classifier cannot confidently type is `frozen`; a test asserts the default branch is `frozen`, never `reflowable`.
- [ ] Ink anchored to a PDF page keeps its anchor: after a reflow elsewhere on the page, the annotation's offset from its anchor region changes by 0 px.
- [ ] Building the graph for a dense page costs ≤ 120 ms on a background isolate and is cached with a content hash, invalidated only for the region a stroke was added to or erased from.
- [ ] The lasso override is honoured per action and never persisted as a page setting; it cannot override a [SN-BTY-039](ocr-hwr.md#sn-bty-039) exclusion.

#### Technical notes
`packages/sane_ink/lib/src/beautify/layout_graph.dart`, using the page R-tree (`docs/architecture/ink-engine.md` §7) for candidate queries plus classic document-layout analysis for columns — horizontal and vertical projection profiles with adaptive thresholds and RLSA-style smearing for block grouping. Node typing consumes [SN-BTY-039](ocr-hwr.md#sn-bty-039)'s detector and [SN-BTY-003](ocr-hwr.md#sn-bty-003)'s block roles rather than re-classifying. Attachment detection: an AABB-containment test against shape bounds from [SN-SHP-001](shapes-diagrams.md#sn-shp-001), plus a leader-line test where a stroke's endpoints lie within tolerance of both a text node and a shape node. Graph nodes are keyed by [SN-BTY-003](ocr-hwr.md#sn-bty-003)'s stable `SegmentId`s so an incremental re-segmentation updates rather than rebuilds. Cached per page and invalidated like the tile cache (§6.1) so undo/redo reuses it.

#### Security & privacy
Local computation over note content (MASVS-PRIVACY-1); the layout graph is derived note content and is never logged (TM-I-05, CWE-117). Integrity control (OWASP-A04): the conservative `frozen` default means an unfamiliar page layout produces a *smaller* edit, never a wrong one. This is genuinely a data-loss concern — a mis-typed node could scatter a student's diagram across a page — which is why the mixed-page corpus is a CI blocker rather than a nice-to-have.

#### UX notes
Invisible when it works. When reflow is declined because the region is frozen, do nothing visible rather than surfacing an error; when the user explicitly lassos and asks, honour it within the [SN-BTY-039](ocr-hwr.md#sn-bty-039) rules. A developer-flag debug overlay may draw the graph (never shipped enabled). A11y: no new controls — the lasso override reuses the labelled selection bar ([SN-ED-004](editor.md#sn-ed-004)).

#### Test plan
`packages/sane_ink/test/beautify/layout_graph_test.dart` (column split, block grouping, attachment edges, frozen default, incremental invalidation), `app/test/editor/reflow_isolation_test.dart` (30-page corpus: zero out-of-block displacement), `app/test/pdf/annotation_anchor_stability_test.dart`, `app/test/perf/layout_graph_budget_test.dart`, fixtures under `app/test/fixtures/pages/mixed/`.

#### Dependencies
SN-BTY-007 (the solver being bounded), SN-BTY-039 (protected-context detector and exclusions). Consumes [SN-BTY-003](ocr-hwr.md#sn-bty-003) segments, [SN-SHP-001](shapes-diagrams.md#sn-shp-001) shape bounds and [SN-ED-004](editor.md#sn-ed-004) selection.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-032

<a id="sn-bty-032"></a>

**Align handwritten lists, bullets, indents and margins in a beautify pass**

| Field | Value |
|---|---|
| GitHub | #1180 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, editor, text |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-003](ocr-hwr.md#sn-bty-003), [SN-BTY-007](ocr-hwr.md#sn-bty-007) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A04`, `CWE-117`, `TM-I-05` |
| Extra labels | agent-ready |

#### Context
"Structure" in the maintainer's brief means more than straight baselines. Handwritten notes drift: bullets start at slightly different x positions, sub-items are indented by eye, the left margin wanders inward down the page, numbered items lose their column. Tidying that is what makes a beautified page look *organised* rather than merely neater, and it is the part Samsung's clean-up does crudely (`docs/research/sources/samsung-notes-nebo-other.md` §Handwriting) and nobody does well. [SN-BTY-003](ocr-hwr.md#sn-bty-003) already **detects** list markers and hanging indents; [SN-BTY-007](ocr-hwr.md#sn-bty-007) already **moves** ink along a line. This issue adds what is missing between them: the vertical, cross-line alignment decisions — indent stops, marker gaps, margins and block leading.

#### Scope
**In:** clustering of list-item left edges into indent stops with a tolerance derived from the writer's x-height; normalisation of each stop to a common x using the writer's own median as the target; a uniform marker-to-text gap; left-margin normalisation across a block (right margin for RTL blocks); consistent inter-line leading within a block using the writer's median line pitch; emission of the result as movements executed by [SN-BTY-007](ocr-hwr.md#sn-bty-007) so there is one code path that moves ink; per-item toggles in the beautify preview ([SN-BTY-013](editor.md#sn-bty-013)).
**Out:** marker and list detection ([SN-BTY-003](ocr-hwr.md#sn-bty-003)); the movement solver ([SN-BTY-007](ocr-hwr.md#sn-bty-007)); ruled-line snapping ([SN-BTY-033](ocr-hwr.md#sn-bty-033)); converting handwritten lists into typed rich-text lists ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)); renumbering, which would change content and is explicitly forbidden.

#### Acceptance criteria
- [ ] After alignment, items at the same indent level share an x within ±2 logical px, and adjacent levels stay distinguishable by ≥ 12 px.
- [ ] The marker-to-text gap becomes uniform within a block to ±2 px using the writer's median gap, and is never narrower than the marker's own width.
- [ ] Left-margin variance across a block drops by ≥ 70 % relative to the original, and no word is moved outside the page writing area or across a printed template margin rule ([SN-TPL-005](templates.md#sn-tpl-005)).
- [ ] Line pitch within a block is normalised to the writer's median ±5 %, and normalisation never lets an ascender overlap the descenders of the line above.
- [ ] Numbering is never rewritten: a list numbered 1, 2, 2 stays 1, 2, 2, and a test asserts the recognised content sequence is unchanged by alignment.
- [ ] Alignment is a single undoable batch ([SN-BTY-012](editor.md#sn-bty-012)) and is always previewed with per-item toggles before applying ([SN-BTY-013](editor.md#sn-bty-013)).
- [ ] Alignment is skipped for blocks whose script tier forbids structural beautification ([SN-BTY-035](i18n.md#sn-bty-035)) and mirrored for RTL blocks (right margin, right-hand indent stops).
- [ ] A full-page alignment computes in ≤ 250 ms on a background isolate with no frame > 16.7 ms during the animation.

#### Technical notes
`packages/sane_ink/lib/src/beautify/list_align.dart` and `margins.dart`, consuming [SN-BTY-003](ocr-hwr.md#sn-bty-003) segments (markers, hanging indents, block roles) and [SN-BTY-006](ocr-hwr.md#sn-bty-006)'s x-height aggregate, and emitting movements for [SN-BTY-007](ocr-hwr.md#sn-bty-007). Indent-stop clustering by 1-D mean-shift with a bandwidth tied to x-height, which handles an arbitrary number of levels without a k parameter. Template margins from [SN-TPL-005](templates.md#sn-tpl-005) are hard constraints. RTL mirroring follows the directionality rules of [SN-I18N-001](i18n.md#sn-i18n-001) and the per-block script tag from [SN-BTY-036](i18n.md#sn-bty-036). Bounded by [SN-BTY-031](ocr-hwr.md#sn-bty-031) so alignment in one column never touches the other.

#### Security & privacy
Local computation on note content with no egress (MASVS-PRIVACY-1) and nothing logged (TM-I-05, CWE-117). Integrity (OWASP-A04): alignment translates whole words and markers only — it never renumbers, never merges or deletes list items, and never reorders them; the unchanged-content-sequence assertion is the machine-checkable form of "never silently change the meaning of what someone wrote", and every change is previewed and revertible.

#### UX notes
Presented inside the beautify preview ([SN-BTY-013](editor.md#sn-bty-013)) as itemised entries — "Align 3 lists", "Tidy left margin" — each toggleable, so a user who wants straight baselines but likes their ragged margin gets exactly that. Design surface `docs/design/screens-and-flows.md` §7 editor; `sane_ui` tokens across all 17 looks and dark. States: nothing to align, preview, applying, applied, declined. Reduce Motion honoured. A11y: the preview is a labelled checkbox list, keyboard-operable, with the count announced.

#### Test plan
`packages/sane_ink/test/beautify/list_align_test.dart` (indent clustering tolerance, level separation, gap uniformity, RTL mirroring, no renumbering), `packages/sane_ink/test/beautify/margins_test.dart` (variance reduction, template-margin constraint, pitch normalisation without overlap), `app/test/editor/list_align_preview_test.dart` (per-item toggles, single undo), golden `app/test/golden/list_align_before_after_*` across looks, `app/test/perf/list_align_budget_test.dart`.

#### Dependencies
SN-BTY-003 (marker and list detection), SN-BTY-007 (movement solver). Reads [SN-BTY-006](ocr-hwr.md#sn-bty-006) x-height and [SN-TPL-005](templates.md#sn-tpl-005) margins; bounded by [SN-BTY-031](ocr-hwr.md#sn-bty-031); previewed by [SN-BTY-013](editor.md#sn-bty-013).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-033

<a id="sn-bty-033"></a>

**Snap handwriting to the page template's ruled lines and grid on request**

| Field | Value |
|---|---|
| GitHub | #1181 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, templates, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-004](ocr-hwr.md#sn-bty-004), [SN-TPL-003](templates.md#sn-tpl-003) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A04`, `CWE-117`, `TM-I-05`, `TM-D-01` |
| Extra labels | agent-ready |

#### Context
Sane Notes ships lined, grid, dot, isometric and Cornell paper with adjustable line spacing ([SN-TPL-003](templates.md#sn-tpl-003), [SN-TPL-005](templates.md#sn-tpl-005)). When someone writes on ruled paper they *meant* to sit on the rules, and their lines drift off anyway. [SN-BTY-004](ocr-hwr.md#sn-bty-004) straightens a line to its own fitted baseline; this issue goes one step further and snaps that baseline to the paper's actual rule. It is the cheapest legibility win available and it makes the paper feel real. It must be opt-in, because plenty of people write across the rules deliberately, and it must never invent a grid on blank paper.

#### Scope
**In:** an opt-in "Snap to lines" option in the beautify preview; reading the active template's rule geometry (baseline pitch, first-baseline offset, margin rules, grid and dot pitch, Cornell zones) from the template model rather than re-measuring the painted pattern; monotonic assignment of each handwritten line to a template rule with a capture radius; vertical movement of whole words onto that rule while preserving the writer's own sit-above-or-below offset; optional horizontal snapping of block left edges to the margin rule and of grid content to grid columns; a decline path when the fit is poor; printed-rule detection on PDF pages behind an explicit confirmation.
**Out:** the paper templates ([SN-TPL-003](templates.md#sn-tpl-003)); the writing-guideline overlay (PRD-ED-188); baseline straightening ([SN-BTY-004](ocr-hwr.md#sn-bty-004)); list and margin alignment ([SN-BTY-032](ocr-hwr.md#sn-bty-032)); the movement solver ([SN-BTY-007](ocr-hwr.md#sn-bty-007)), reused.

#### Acceptance criteria
- [ ] Snapping is off by default, exposed as a toggle inside the beautify preview ([SN-BTY-013](editor.md#sn-bty-013)), and remembered per notebook.
- [ ] After snapping, each word's baseline sits within 1 logical px of its assigned rule at every zoom level and page size, for every shipped rule pitch.
- [ ] The writer's natural offset is preserved: someone who writes slightly above the rule still does, within ±1 px of their learned median.
- [ ] Two handwritten lines never snap onto the same rule; the assignment is monotonic so line order can never invert.
- [ ] When line pitch mismatches rule pitch by more than 35 %, or the assignment is ambiguous, the mode declines and explains why ("your lines don't match this paper's spacing") rather than producing a scrambled page.
- [ ] Snapping never moves ink across a template margin rule, off the page, or under the page trim.
- [ ] Changing the page template afterwards does not re-snap automatically; ink stays where the user left it.
- [ ] Grid and dot paper snapping aligns block left edges to columns within 1 px without altering intra-word spacing.
- [ ] A full-page snap computes in ≤ 200 ms on a background isolate, animates in ≤ 250 ms with an instant Reduce-Motion fallback, and is one undoable batch.

#### Technical notes
`packages/sane_ink/lib/src/beautify/snap_to_rules.dart`, with the resolved template values passed in from `app/` (feature packages do not import one another). Rule geometry comes from the vector template model of [SN-TPL-002](templates.md#sn-tpl-002)/[SN-TPL-003](templates.md#sn-tpl-003) — pitch and first-baseline offset are already parameters there and [SN-TPL-005](templates.md#sn-tpl-005) makes spacing adjustable — so snapping is exact and resolution-independent; never re-measure the rendered pattern. Assignment is a monotonic 1-D matching between fitted baselines ([SN-BTY-004](ocr-hwr.md#sn-bty-004)) and template rules, solved with a small dynamic program. Movement executes through [SN-BTY-007](ocr-hwr.md#sn-bty-007). For PDF pages, printed-rule detection runs a horizontal projection profile over the already-rendered page raster inside the existing sandboxed PDF pipeline and requires explicit confirmation before use.

#### Security & privacy
Local geometry over note content (MASVS-PRIVACY-1), nothing logged (TM-I-05, CWE-117). Integrity (OWASP-A04): monotonic assignment makes line reordering impossible and the decline path means a mismatched template produces no change rather than damage. PDF rule detection reads an already-rendered raster in the existing pipeline — no new parser and no new untrusted-input surface, with the existing resource caps still applying (TM-D-01).

#### UX notes
A single switch in the beautify preview with a live before/after on the visible page — the user should see their words settle onto the rules before committing. Copy: "Snap to this paper's lines". The decline state explains rather than failing silently. Design: `docs/design/screens-and-flows.md` §8 templates overlay and §7 editor. Goldens must cover paper types **and** tints, because rule colour varies per look and tint. A11y: the toggle is labelled and keyboard-operable; announce "handwriting aligned to page lines" once.

#### Test plan
`packages/sane_ink/test/beautify/snap_to_rules_test.dart` (1 px accuracy across pitches and zooms, natural-offset preservation, monotonic assignment, decline on pitch mismatch, margin constraint), `app/test/editor/snap_to_rules_preview_test.dart` (toggle, per-notebook memory, single undo), golden `app/test/golden/snap_to_rules_*` across looks, tints and paper types, `app/test/pdf/printed_rule_detection_test.dart`, `app/test/perf/snap_budget_test.dart`.

#### Dependencies
SN-BTY-004 (fitted baselines), SN-TPL-003 (paper rule geometry). Moves through [SN-BTY-007](ocr-hwr.md#sn-bty-007); reads [SN-TPL-005](templates.md#sn-tpl-005); bounded by [SN-BTY-031](ocr-hwr.md#sn-bty-031).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md, docs/product/prd-01-editor-ink-brushes.md §20.3, docs/product/prd-02-library-documents-audio-search.md §11/§19.3)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no ink coordinates, recognised text, style-model parameters or note content in logs
- [ ] Threat-model rows re-checked (docs/security/threat-model.md TM-I-03/TM-I-05/TM-I-08/TM-I-10, TM-P-01/TM-P-05) and the controls matrix updated if a stored asset changed

---

### SN-BTY-037

<a id="sn-bty-037"></a>

**Enforce the never-change-meaning rule for every beautification edit**

| Field | Value |
|---|---|
| GitHub | #1201 |
| Type | security |
| Priority | p0 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, editor, security |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-002](ink.md#sn-bty-002), [SN-HWR-002](ocr-hwr.md#sn-hwr-002), [SN-HWR-006](ocr-hwr.md#sn-hwr-006), [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `OWASP-A08`, `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `ASVS-8.3`, `CWE-117` |
| Extra labels | agent-ready, innovation |

#### Context
Beautification ([SN-BTY-001](ocr-hwr.md#sn-bty-001)) keeps the user's own handwriting and makes it neater — it is not ink-to-text ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)). That promise only holds if the feature **can never silently change what someone wrote**. This issue turns that rule into a machine-checked invariant rather than a review convention, and it is the gate every other beautification issue depends on.

The *mechanics* of reversibility already exist elsewhere in the epic: [SN-BTY-002](ink.md#sn-bty-002) models beautification as a reversible derived overlay on the original ink and [SN-BTY-012](editor.md#sn-bty-012) wires it into undo/redo. This issue adds the thing neither provides — a decision, per edit, about **whether the edit is allowed to happen without asking**, and the audit fields that make that decision provable after the fact.

Two edit classes exist and the code must be able to prove which one it is applying:

- **Class G — geometric tidying.** Baselines straightened, slant and letter size made consistent, word/line spacing normalised, lists and margins aligned, drifting lines pulled level. The recognised character sequence of the region is unchanged. May apply silently, and only at the user's chosen intensity ([SN-BTY-042](a11y.md#sn-bty-042)).
- **Class C — content-altering.** Anything that changes the recognised character sequence: a spelling correction, a word substitution, an inserted or removed glyph, a case change on a case-sensitive token. **Never silent.** Always a visible, reversible affordance the user accepts per word.

ADR-0016 §5 already states "recognition never mutates the document silently"; decision 4 gives us the non-destructive object model to honour it. Apple's Smart Script and Goodnotes' spellcheck both split refine (silent) from correct-spelling (tap a flagged word) — we make the split enforceable.

#### Scope
**In:** the `BeautifyEdit` taxonomy and classifier; the before/after recognition comparison that decides the class; the hard gate that refuses to commit a Class C edit without a user decision token; the per-edit audit fields added to the overlay record of [SN-BTY-002](ink.md#sn-bty-002); the review-affordance contract (badge, per-word accept/reject) that [SN-BTY-013](editor.md#sn-bty-013)'s preview and [SN-BTY-012](editor.md#sn-bty-012)'s undo hang off.
**Out:** the derived-overlay/undo machinery itself ([SN-BTY-002](ink.md#sn-bty-002), [SN-BTY-012](editor.md#sn-bty-012)); the geometric transforms ([SN-BTY-004](ocr-hwr.md#sn-bty-004)–[SN-BTY-008](ink.md#sn-bty-008)) and the style re-render engine; protected regions ([SN-BTY-039](ocr-hwr.md#sn-bty-039)); the adversarial corpus that exercises this gate ([SN-BTY-038](ocr-hwr.md#sn-bty-038)); the intensity control ([SN-BTY-011](settings.md#sn-bty-011), [SN-BTY-042](a11y.md#sn-bty-042)).

#### Acceptance criteria
- [ ] For every candidate edit the engine recognises the affected word region **before and after** and compares NFC-normalised token sequences; any difference (including case and diacritics) classifies the edit `contentAltering`.
- [ ] A `contentAltering` edit **cannot** reach the document without a `UserDecision` token: the commit API requires it, an assertion fires in debug, and `app/test/security/beautify_no_silent_content_change_test.dart` proves no code path bypasses it.
- [ ] Class G edits leave the recognised token sequence identical on ≥ 99.5 % of words in the evaluation corpus ([SN-BTY-044](qa.md#sn-bty-044)); any word where it diverges is reverted to untouched ink and counted as a defect.
- [ ] No edit of either class is proposed for a word whose recognition confidence is < 0.85 unless the user selected that word explicitly.
- [ ] Every applied edit extends [SN-BTY-002](ink.md#sn-bty-002)'s overlay record with `{editId, class, recognisedBefore, recognisedAfter, decidedBy, intensity, engineVersion, modelVersion}`; a round-trip test asserts that reverting through [SN-BTY-012](editor.md#sn-bty-012) restores the original stroke geometry **byte-identical** to its pre-beautify serialisation.
- [ ] A document reopened after revert serialises byte-identically to the pre-beautify `.sanenote`.
- [ ] Classification costs ≤ 8 ms per word on the mid-Android reference device and runs off the UI isolate; it never touches the wet-ink path.
- [ ] Batch beautify of a page reports a single summary ("12 words tidied · 2 spellings need your OK") and is one undo step.

#### Technical notes
`packages/sane_ml/lib/src/beautify/edit_classifier.dart` exposes a sealed `BeautifyEdit` (`GeometryOnly` | `ContentAltering`) and `classify(region, before, after) → Result<BeautifyEdit, Failure>`; callers pattern-match with Dart 3 `switch` (no exceptions across package boundaries, CLAUDE.md §6). Recognition comes from the `InkRecognizer` interface of [SN-HWR-002](ocr-hwr.md#sn-hwr-002); where the region is untouched, reuse the cached tokens from background recognition ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)) instead of a second inference. Persistence rides on [SN-BTY-002](ink.md#sn-bty-002)'s derived overlay — the original stroke is never destructively overwritten (docs/architecture/ink-engine.md §10.1; decision 4) — so this issue only adds fields to that record and a guard in front of its commit function. The review affordance lives in `app/lib/features/editor/beautify/`; the commit path is `packages/sane_core` ops. Do not hop isolates on the draw path (CLAUDE.md §8): classification runs on a one-shot `Isolate.run`.

#### Security & privacy
A silent content change to a person's own record is an integrity failure (OWASP-A08 software & data integrity failures) and a LINDDUN *Unawareness* harm; add the row to docs/security/threat-model.md. Recognised text, token sequences and the audit record are **note content**: stored locally, E2E-encryptable on sync, never logged (MASVS-STORAGE-1, CWE-117). Entirely on-device; no cloud path in this issue — a cloud recogniser is only ever reachable through the per-request opt-in of [SN-HWR-019](ocr-hwr.md#sn-hwr-019). Fail closed: if recognition fails, the edit is not applied.

#### UX notes
Class C words carry a non-colour-only flag (dotted underline + icon) per docs/design/accessibility.md; tapping opens a sheet with the original ink, the proposal rendered in the user's own hand, per-word Accept/Keep mine, and "Never for this word" (feeds [SN-HWR-016](ocr-hwr.md#sn-hwr-016)). Class G applies live with a brief, Reduce-Motion-aware cross-fade. Tokens only from `sane_ui`; correct in all 17 looks and dark. Empty/error state: "Couldn't read this clearly — left as you wrote it."

#### Test plan
`packages/sane_ml/test/beautify/edit_classifier_test.dart` (class decision, NFC/case/diacritic sensitivity, confidence floor), `packages/sane_core/test/beautify_undo_roundtrip_test.dart` (byte-identical restore), `app/test/security/beautify_no_silent_content_change_test.dart` (negative/abuse: no commit path without a decision token), golden `app/test/golden/beautify_flagged_word_*` across looks, and a perf test asserting the ≤ 8 ms/word budget.

#### Dependencies
SN-BTY-002 (reversible derived overlay this gate guards), SN-HWR-002 (recogniser interfaces), SN-HWR-006 (cached recognised tokens), SN-CORE-003 (CRDT revisions for non-destructive edits). Undo behaviour lands in [SN-BTY-012](editor.md#sn-bty-012); preview in [SN-BTY-013](editor.md#sn-bty-013). Parent epic [SN-BTY-001](ocr-hwr.md#sn-bty-001).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/architecture/ink-engine.md §10, docs/security/threat-model.md)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, recognised text, style features or ink coordinates in logs

---

### SN-BTY-038

<a id="sn-bty-038"></a>

**Build the do-not-correct adversarial corpus and gate spelling changes on it**

| Field | Value |
|---|---|
| GitHub | #1130 |
| Type | test |
| Priority | p0 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | ocr-hwr, qa, a11y |
| Size | M |
| SDLC | verification |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-037](ocr-hwr.md#sn-bty-037), [SN-BTY-026](ocr-hwr.md#sn-bty-026), [SN-HWR-016](ocr-hwr.md#sn-hwr-016) |
| Security controls | `OWASP-A08`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
The fastest way to destroy trust in handwriting beautification is to "correct" something that was right. A student writes *eigenvector*, *H2SO4*, *Nguyễn*, *getUserById*, *kya haal hai*, or a deliberately misspelled brand name, and the app helpfully turns it into something else. Goodnotes ships a Personal Dictionary precisely because spellcheck over handwriting false-positives constantly; Samsung's spell/grammar pass has the same exposure.

This issue builds the adversarial fixture set that the meaning-preservation gate ([SN-BTY-037](ocr-hwr.md#sn-bty-037)) is measured against, and wires it into CI as a blocking budget. It is the empirical half of the safety rule: [SN-BTY-037](ocr-hwr.md#sn-bty-037) proves *a correction cannot be silent*, this proves *a correction is rarely wrong in the first place*.

#### Scope
**In:** the labelled `doNotCorrect` / `shouldOffer` corpus; the evaluation runner; the false-positive budget and its CI gate; the fixture licence/consent manifest.
**Out:** the misspelling detector and its dictionary-aware suppression ([SN-BTY-026](ocr-hwr.md#sn-bty-026)) and the in-ink correction flow ([SN-BTY-027](ocr-hwr.md#sn-bty-027), [SN-HWR-017](ocr-hwr.md#sn-hwr-017)) — this issue measures them, it does not build them; the custom dictionary feature ([SN-HWR-016](ocr-hwr.md#sn-hwr-016)); the general recognition accuracy harness ([SN-HWR-020](ocr-hwr.md#sn-hwr-020)), which this extends rather than duplicates.

#### Acceptance criteria
- [ ] Corpus contains ≥ 600 labelled items across **≥ 10 adversarial classes**: proper nouns and personal names (including transliterated Indian names), place names, technical and scientific jargon, code identifiers and snippets (`getUserById`, `x += 1`, `#include <stdio.h>`), chemical formulae and units (`H2SO4`, `C6H12O6`, `9.8 m/s²`), inline equations and Greek symbols, invented/coined words, deliberate misspellings and dialect spellings, abbreviations and student shorthand (`w/`, `b/c`, `∴`, `->`), and code-switched / mixed-script text (Hinglish, Latin+Devanagari on one line).
- [ ] Coverage spans ≥ 3 scripts and both pen and finger input so the gate is not Latin-and-stylus only.
- [ ] The pipeline proposes a correction for **≤ 0.5 %** of `doNotCorrect` items; exceeding the budget fails CI.
- [ ] Recall on the `shouldOffer` set (genuinely misspelled words) may not fall more than 2 points below the committed baseline — the gate cannot be passed by simply never correcting anything.
- [ ] Every proposal that does fire is asserted to be a Class C edit routed through the [SN-BTY-037](ocr-hwr.md#sn-bty-037) affordance; a proposal applied silently fails the suite.
- [ ] Words present in the custom dictionary ([SN-HWR-016](ocr-hwr.md#sn-hwr-016)) are never proposed — 0 exceptions.
- [ ] Fixtures are synthetic or consent-recorded; no real user notes; each item carries source, licence and consent in `manifest.json`.
- [ ] The PR-scope run completes in ≤ 90 s and is deterministic (3 consecutive runs byte-identical).

#### Technical notes
Fixtures under `tools/eval/beautify_corpus/do_not_correct/` as stroke-sample JSON (the `InkSample` shape of docs/architecture/ink-engine.md §1.2) plus ground-truth text, so they exercise the online-ink path rather than image OCR. Runner in `packages/sane_ml/test/beautify/do_not_correct_eval_test.dart`, loading through the shared loader added by [SN-BTY-044](qa.md#sn-bty-044); results emitted to `beautify_quality_report.json` consumed by the CI gate ([SN-BTY-046](ci-cd.md#sn-bty-046)). Use the mock `InkRecognizer` for deterministic unit runs and the real ML Kit adapter ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)) in the nightly device-lab job. Budgets live in the machine-readable baseline file, not in code.

#### Security & privacy
Fixtures are test data, but they are handwriting: keep them out of the app bundle and out of crash/diagnostic payloads. No real user content without a recorded consent record (GDPR/DPDP lawful basis; decision 8). The runner must not log recognised text on failure — it reports item ids and class counts only (CWE-117). No network access in the PR-scope job.

#### UX notes
None beyond baseline (test infrastructure), except one user-facing consequence this gate protects: a wrongly flagged word must always be dismissible with "Keep mine", and repeated dismissals of the same token offer "Add to my dictionary" ([SN-HWR-016](ocr-hwr.md#sn-hwr-016)).

#### Test plan
`packages/sane_ml/test/beautify/do_not_correct_eval_test.dart` (budget assertions per class, not just in aggregate — a class may not be sacrificed to keep the average), `packages/sane_ml/test/beautify/dictionary_suppression_test.dart`, plus a fixture-integrity test asserting every item has ground truth, class label, licence and consent fields.

#### Dependencies
SN-BTY-037 (edit classification the corpus asserts against), SN-BTY-026 (the detector under test), SN-HWR-016 (custom dictionary suppression). Corpus tooling is shared with [SN-BTY-044](qa.md#sn-bty-044); gate wiring is [SN-BTY-046](ci-cd.md#sn-bty-046).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, recognised text, style features or ink coordinates in logs

---

### SN-BTY-039

<a id="sn-bty-039"></a>

**Never beautify protected regions and hand maths to the math pipeline**

| Field | Value |
|---|---|
| GitHub | #1202 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, editor, pdf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-037](ocr-hwr.md#sn-bty-037), [SN-ED-004](editor.md#sn-ed-004), [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `OWASP-A08`, `MASVS-STORAGE-1`, `ASVS-8.3` |
| Extra labels | agent-ready |

#### Context
Some ink must never be touched, however messy it looks. A **signature** is legally meaningful *because* it is idiosyncratic. A **sketch or diagram** is not writing and "straightening" it vandalises it. **Maths** has its own pipeline ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)) where a straightened superscript or a normalised minus sign changes the expression. **Annotations on a legal or exam PDF** are evidence. Shape snapping already lives in [SN-HWR-012](ocr-hwr.md#sn-hwr-012) and must own diagram strokes exclusively.

This issue defines the protected-context set, the detector that routes ink away from the text beautifier, and the explicit per-region opt-out that lets the user say "leave this as I wrote it" anywhere else. Without it, [SN-BTY-037](ocr-hwr.md#sn-bty-037)'s guarantee ("meaning is preserved") is true per-word but useless per-document.

#### Scope
**In:** the protected-context taxonomy and detector; hand-off of maths regions to [SN-HWR-014](ocr-hwr.md#sn-hwr-014) and diagram strokes to [SN-HWR-012](ocr-hwr.md#sn-hwr-012); the document-level and region-level exclusion model (CRDT-synced, exported in `.sanenote`); the exclusion UI (lasso → "Never beautify this", page, notebook, template default); the PDF-annotation policy flag.
**Out:** the math and shape engines themselves and the sketch routing pass ([SN-BTY-034](shapes-diagrams.md#sn-bty-034)); reflow boundaries, which are a different question — [SN-BTY-031](ocr-hwr.md#sn-bty-031) stops a corrected word from disturbing *unrelated* ink, this issue stops beautification from *touching* ink at all; the strength setting ([SN-BTY-011](settings.md#sn-bty-011), [SN-BTY-042](a11y.md#sn-bty-042)); locked-notebook behaviour, which already excludes derived processing ([SN-GCMP-002](security.md#sn-gcmp-002)).

#### Acceptance criteria
- [ ] Text-vs-non-text classification reaches precision ≥ 0.97 for "this is a drawing" on the evaluation corpus ([SN-BTY-044](qa.md#sn-bty-044)); drawing clusters are never beautified.
- [ ] Signature-like clusters (long connected stroke, high curvature entropy, isolated on the page, near a "Sign"/"Signature" label or inside a signature field) are never beautified — **0 false beautifications** on the 100-signature fixture.
- [ ] Maths regions route to [SN-HWR-014](ocr-hwr.md#sn-hwr-014) and are never baseline-straightened, slant-normalised or re-spaced by the text path; superscripts, subscripts and fraction bars keep their vertical relationships exactly.
- [ ] Annotations on a PDF whose notebook carries `annotationPolicy: legalOrExam` default beautification **off**; enabling it shows a one-line reason and is recorded per notebook.
- [ ] A lasso selection can be marked "Never beautify this"; the exclusion is a document property (LWW register) that survives CRDT merge ([SN-CORE-003](sync.md#sn-core-003)), sync, `.sanenote` export/import and page reflow.
- [ ] Exclusion scopes compose predictably: object > page > notebook > profile default; the effective value is inspectable in one tap and covered by a truth-table unit test.
- [ ] An excluded region shows a subtle, non-colour-only marker **only while the beautify tool is active**, never in normal reading or export.
- [ ] Detection adds ≤ 15 ms per page of 2,000 strokes, runs off the UI isolate and caches per page until strokes change.

#### Technical notes
Detector in `packages/sane_ml/lib/src/beautify/protected_regions.dart`, consuming the R-tree page index and stroke clustering from `packages/sane_ink` (docs/architecture/ink-engine.md §7) plus recognition segmentation from [SN-HWR-006](ocr-hwr.md#sn-hwr-006); features include stroke-length distribution, curvature entropy, aspect ratio, intersection density, recognition confidence and the ML Kit shape/gesture classifier signal used by [SN-HWR-012](ocr-hwr.md#sn-hwr-012). Exclusions are stored as a `beautifyPolicy` prop on `Page`/`Notebook` and a `beautifyExcluded` flag on objects in `packages/sane_core` (decision 4). Lasso entry point extends [SN-ED-004](editor.md#sn-ed-004)'s selection menu in `app/lib/features/editor/`. PDF annotation layers follow docs/adr/0014-pdf-engine.md — the policy flag lives on the notebook, not the PDF.

#### Security & privacy
Protecting signatures and exam/legal annotations is an integrity control (OWASP-A08) and a real-world-harm control: a modified signature or exam answer is a forgery risk. Default-deny for the ambiguous case — when the detector is unsure, do not beautify. Region policy is note content: local, E2E-encryptable, never logged (MASVS-STORAGE-1, CWE-117). No cloud path. Add the "beautifier alters evidentiary ink" row to docs/security/threat-model.md.

#### UX notes
Design refs: docs/design/screens-and-flows.md §7 (lasso object menu) and §12 (recognition). Marker is a hairline dashed outline plus a small lock glyph — never colour alone (docs/design/accessibility.md). Copy: "Left as you wrote it — this looks like a signature." Settings → Handwriting & stylus exposes the notebook default. Works in all 17 looks and dark; Reduce Motion honoured.

#### Test plan
`packages/sane_ml/test/beautify/protected_regions_test.dart` (classifier precision on fixtures; signature fixture 0-false-positive assertion), `packages/sane_core/test/beautify_policy_merge_test.dart` (CRDT merge + scope truth table), `app/test/widget/beautify_exclusion_menu_test.dart`, golden `app/test/golden/beautify_excluded_marker_*`, and an integration test that a legal/exam PDF notebook never auto-beautifies.

#### Dependencies
SN-BTY-037 (edit gate), SN-ED-004 (lasso selection), SN-CORE-003 (CRDT props). Hand-offs: [SN-HWR-012](ocr-hwr.md#sn-hwr-012) shapes, [SN-HWR-014](ocr-hwr.md#sn-hwr-014) math.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/architecture/ink-engine.md §9, docs/adr/0014-pdf-engine.md, docs/security/threat-model.md)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, recognised text, style features or ink coordinates in logs

---

### SN-BTY-047

<a id="sn-bty-047"></a>

**Add the does-it-still-look-like-me style-similarity guard**

| Field | Value |
|---|---|
| GitHub | #1133 |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | ocr-hwr, ai, qa |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-019](ocr-hwr.md#sn-bty-019), [SN-BTY-021](ocr-hwr.md#sn-bty-021), [SN-BTY-037](ocr-hwr.md#sn-bty-037), [SN-BTY-044](qa.md#sn-bty-044) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready, innovation |

#### Context
The entire premise of this feature is that the writing stays **yours**. Refine it too hard, normalise every letter to a median, re-render a corrected word from a learned model, and you converge on a generic hand — at which point we have shipped ink-to-text with extra steps and a worse font ([SN-HWR-007](ocr-hwr.md#sn-hwr-007) already does that job honestly).

Nobody in the market guards this. Apple's Smart Script claims to preserve personal style, Goodnotes claims corrections match your handwriting, and neither exposes a measurable guarantee. [SN-BTY-019](ocr-hwr.md#sn-bty-019)–[SN-BTY-021](ocr-hwr.md#sn-bty-021) build and score the writer's style profile; [SN-BTY-025](ocr-hwr.md#sn-bty-025) uses low style confidence to *suggest instead of apply*. This issue adds the thing none of them do: an **output-side** measurement. It compares what beautification actually produced against the writer's own hand and **rejects the edit** when it drifts — including the case where style confidence was high and the transform still generified the writing.

#### Scope
**In:** the output-side similarity score and its explainable feature set; the genericity check against a population mean; the runtime rejection gate on the commit path; the offline human validation panel; export of the score as a quality metric.
**Out:** learning and storing the writer's style profile ([SN-BTY-019](ocr-hwr.md#sn-bty-019), [SN-BTY-020](ocr-hwr.md#sn-bty-020)) and coverage scoring ([SN-BTY-021](ocr-hwr.md#sn-bty-021)) — both consumed here; the input-side suggest-don't-apply rule ([SN-BTY-025](ocr-hwr.md#sn-bty-025)); the transforms being guarded ([SN-BTY-040](a11y.md#sn-bty-040), [SN-BTY-041](a11y.md#sn-bty-041), [SN-BTY-023](ocr-hwr.md#sn-bty-023), [SN-BTY-024](ink.md#sn-bty-024)); deletion/consent UX for the artifact ([SN-BTY-022](privacy.md#sn-bty-022), [SN-BTY-050](privacy.md#sn-bty-050)); the CI wiring ([SN-BTY-046](ci-cd.md#sn-bty-046)).

#### Acceptance criteria
- [ ] The comparison uses **explainable** features — slant distribution, x-height / ascender / descender ratios, stroke-width and velocity dynamics, curvature spectrum, loop aperture ratios, pen-lift/joins-per-word pattern, baseline behaviour, and the per-glyph medians held by [SN-BTY-020](ocr-hwr.md#sn-bty-020) — not an opaque embedding; each feature is individually unit-testable and nameable in the privacy panel.
- [ ] The writer reference is read from [SN-BTY-019](ocr-hwr.md#sn-bty-019)'s style store; where [SN-BTY-021](ocr-hwr.md#sn-bty-021) reports coverage below its sparse-data threshold the guard runs in **conservative mode** (only Class G geometric edits allowed, no style synthesis).
- [ ] `styleSimilarity(after, writerRef) ≥ 0.92` (cosine, floor committed as a baseline) or the edit is **rejected and the original ink kept** — a hard gate, not a warning, applied to every applied beautification.
- [ ] **Genericity check:** similarity of the output to the population-mean style may not increase by more than 0.05 relative to the input — a word may not drift toward "average handwriting" even while staying above the personal floor.
- [ ] Cost ≤ 5 ms per word on the mid-Android reference device, off the UI isolate.
- [ ] **Adversarial test:** a word deliberately replaced by font-rendered text is rejected by the guard **100 %** of the time (n ≥ 200 substitutions across scripts).
- [ ] **Human validation:** a blind panel (≥ 20 raters, ≥ 100 before/after pairs sampled across bands) picks "still the same person's handwriting" for ≥ 90 % of accepted outputs before the feature leaves beta; the result is recorded with the corpus version.
- [ ] The similarity score is exported into [SN-BTY-045](qa.md#sn-bty-045)'s report as metric M7 and gated by [SN-BTY-046](ci-cd.md#sn-bty-046).
- [ ] The guard reads [SN-BTY-019](ocr-hwr.md#sn-bty-019)'s store and writes nothing persistent of its own; scores are transient and never stored per word.

#### Technical notes
Feature extraction in `packages/sane_ink/lib/src/beautify/style_features.dart` (pure geometry over the stored centreline + `tMicros`; docs/architecture/ink-engine.md §10.1) and scoring in `packages/sane_ml/lib/src/beautify/style_similarity.dart`, reading the profile through [SN-BTY-019](ocr-hwr.md#sn-bty-019)'s repository interface rather than its storage. Prefer hand-engineered features over a learned encoder: they are explainable to users in the privacy panel, cheap enough to run per word, and need no model download (works at Tier 0/1 of [SN-BTY-049](compat.md#sn-bty-049)). The population-mean vector ships as a small constant asset per script derived from the corpus ([SN-BTY-044](qa.md#sn-bty-044)) — never from user data. The gate is called from the same commit path as [SN-BTY-037](ocr-hwr.md#sn-bty-037)'s classifier so no edit can bypass it; rejection is a `Result.failure` that leaves the document untouched.

#### Security & privacy
The writer reference this reads is **handwriting-biometric-adjacent** and among the most identifying artifacts the app derives; its confinement, backup/sync exclusion and deletion are owned by [SN-BTY-019](ocr-hwr.md#sn-bty-019)/[SN-BTY-022](privacy.md#sn-bty-022)/[SN-BTY-050](privacy.md#sn-bty-050) and must not be duplicated or bypassed here. This issue's own obligations: never log a feature value or a similarity score alongside content, never persist per-word scores, and never send either anywhere (MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-117). The population-mean asset must be derivable from the corpus alone so that **no user ever contributes to a shared model** — add that row to docs/security/threat-model.md.

#### UX notes
Mostly invisible — the guard's job is that nothing bad appears. When it rejects, the word stays untouched and the summary says "2 words left alone — tidying them would have changed your style", with a "why?" link to a plain-language explanation. The named artifact and its Delete button live in [SN-BTY-022](privacy.md#sn-bty-022)'s panel, explained by [SN-BTY-050](privacy.md#sn-bty-050). Non-colour-only cues; all 17 looks + dark.

#### Test plan
`packages/sane_ink/test/beautify/style_features_test.dart` (per-feature analytic fixtures, invariance to translation/scale, sensitivity to slant/size), `packages/sane_ml/test/beautify/style_similarity_test.dart` (floor behaviour, genericity delta, conservative mode under sparse coverage), `packages/sane_ml/test/beautify/style_guard_adversarial_test.dart` (font-substitution rejection, 100 %), a perf test for the 5 ms budget, and a documented protocol for the human panel in docs/product/.

#### Dependencies
SN-BTY-019 (style profile store read through its repository), SN-BTY-021 (coverage signal for conservative mode), SN-BTY-037 (single commit path the guard hooks), SN-BTY-044 (corpus for the population mean and the panel). Reported via [SN-BTY-045](qa.md#sn-bty-045), gated by [SN-BTY-046](ci-cd.md#sn-bty-046).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/security/threat-model.md, docs/architecture/ink-engine.md §10)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, recognised text, style features or ink coordinates in logs

---

### SN-BTY-048

<a id="sn-bty-048"></a>

**Ship beautification models within a size, integrity and offline budget**

| Field | Value |
|---|---|
| GitHub | #1191 |
| Type | task |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, ai, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-HWR-004](ocr-hwr.md#sn-hwr-004), [SN-BTY-049](compat.md#sn-bty-049) |
| Security controls | `MASVS-CODE-3`, `MASVS-RESILIENCE-1`, `OWASP-A08`, `SLSA-L3` |
| Extra labels | agent-ready |

#### Context
Beautification's optional learned components (letter-form synthesis for re-rendering a corrected word in the user's hand, and any script-specific style model) are downloadable assets, not bundle weight. [SN-HWR-004](ocr-hwr.md#sn-hwr-004) already builds the recognition model download and lifecycle manager with integrity checks, and [SN-AI-008](ai.md#sn-ai-008) builds the general on-demand model downloader — **this issue does not restate either**. It sets the beautification-specific budget, binds each tier to a per-platform runtime, and defines what happens when a model is absent, stale, corrupt or half-downloaded.

ADR-0016 §8 is the governing rule: models download on demand with the user aware of the size, and a missing model degrades gracefully rather than crashing.

#### Scope
**In:** the beautify model manifest (per script family, per tier); size and memory budgets; integrity verification and atomic staged updates with rollback; offline and interrupted-download behaviour; per-platform runtime binding; the model version recorded in the edit audit record.
**Out:** the download manager and its UI ([SN-HWR-004](ocr-hwr.md#sn-hwr-004), [SN-AI-008](ai.md#sn-ai-008)); tier resolution and degradation UX ([SN-BTY-049](compat.md#sn-bty-049)); model licensing entries in the SBOM beyond adding the rows.

#### Acceptance criteria
- [ ] **Tier 0 adds zero model weight**: the geometric beautifier is pure algorithm, ships in-bundle, and requires no download on any platform.
- [ ] The optional learned style/letter-form model is **≤ 12 MB quantised per script family**, and the total on-disk beautify model footprint for three script families is **≤ 40 MB**; a CI check fails if a manifest exceeds the budget.
- [ ] Every model file is verified by hash **and** signature before first use **and on every load**; verification failure deletes the artifact, falls back to the next-lower tier and surfaces a retry — never a crash, never a silent use of unverified bytes (fail closed).
- [ ] An interrupted download resumes; a partial artifact is never loadable (staged path + atomic rename); a corrupted partial is discarded on next launch.
- [ ] Updates are staged — download → verify → atomic swap → keep the previous version for one release for rollback; a failed swap leaves the previous model working.
- [ ] The app is fully usable **offline** with whatever tier is present; no beautify action ever blocks on the network, and the UI never shows an indefinite spinner waiting for a model.
- [ ] The active `modelVersion` is written into every edit audit record ([SN-BTY-037](ocr-hwr.md#sn-bty-037)) so a regression can be traced to a model.
- [ ] Per-platform runtime binding is implemented through `plugins/sane_ml_native`: Core ML on Apple, TFLite/ML Kit (NNAPI where available) on Android, WASM/WebGPU on web, with a mock implementation backing every method for tests (ADR-0016 §4).
- [ ] **Cold start is unaffected**: models load lazily on first beautify, never at startup; a startup-trace test ([SN-PERF-008](perf.md#sn-perf-008)) asserts no model load in the cold-start path.
- [ ] Peak additional resident memory while beautifying ≤ 60 MB on a 4 GB Android, released within 30 s of idle; asserted by [SN-PERF-009](perf.md#sn-perf-009)'s sampler.
- [ ] Every model and its licence is recorded in the SBOM and in docs/adr/0016-on-device-ml-and-ai.md §9.

#### Technical notes
Manifest at `packages/sane_ml/lib/src/beautify/model_manifest.dart` + a JSON asset listing `{id, scriptFamily, tier, bytes, sha256, signature, minRuntime}`; resolution and verification reuse [SN-HWR-004](ocr-hwr.md#sn-hwr-004)'s lifecycle manager rather than a parallel implementation. Native binding via the federated plugin `plugins/sane_ml_native` (ADR-0012) — Dart platform-interface plus Swift/Kotlin/web impls; plugins are DAG leaves and must not import `packages/` (CLAUDE.md §3). Storage goes to the app's model directory, excluded from OS backup and from iCloud/Drive sync ([SN-SEC-023](security.md#sn-sec-023), [SN-AND-030](security.md#sn-and-030)). Loading and inference run off the UI isolate; never on the wet-ink path.

#### Security & privacy
A model is executable-adjacent content fetched over the network: verify signature before use, pin the distribution origin, cap decompressed size before decode (decompression-bomb guard, CLAUDE.md §7.8), and parse off the UI isolate. Corrupt or unverified ⇒ delete and degrade (OWASP-A08, MASVS-CODE-3, MASVS-RESILIENCE-1). The download request itself must carry no note content, no identifiers beyond a rotating install token ([SN-TEL-009](telemetry.md#sn-tel-009)), and must be listed as an egress in the PR with purpose and payload (CLAUDE.md §7.4). Add the row to docs/security/threat-model.md and the controls matrix.

#### UX notes
Size is always stated before a download ("Writing model · 9 MB · downloads once"), per ADR-0016 §8 and [SN-PRV-004](privacy.md#sn-prv-004)'s point-of-use rationale pattern. Wi-Fi-only respected from Sync & backup settings ([SN-SET-006](settings.md#sn-set-006)). States: not-downloaded (offer), downloading (progress + cancel), verifying, failed (retry + reason), present (size + delete). Deleting a model is reachable from Settings → Storage ([SN-SET-014](settings.md#sn-set-014)) and never deletes user data.

#### Test plan
`packages/sane_ml/test/beautify/model_manifest_test.dart` (budget assertions, schema), `packages/sane_ml/test/beautify/model_integrity_test.dart` (tampered hash/signature ⇒ fail closed and degrade; partial artifact unusable; rollback after failed swap), `plugins/sane_ml_native/test/` mock-impl conformance, `app/test/security/model_egress_test.dart` (no content in the fetch), plus perf tests for cold start and memory.

#### Dependencies
SN-HWR-004 (model download & lifecycle manager with integrity checks), SN-BTY-049 (tier definitions the manifest keys on). Related: [SN-AI-008](ai.md#sn-ai-008).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md §8-9, docs/adr/0012-native-plugin-strategy.md, docs/security/threat-model.md)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, recognised text, style features or ink coordinates in logs

---

### SN-GA11-026

<a id="sn-ga11-026"></a>

**Order RTL and vertical-script transcripts correctly in OCR and reading mode**

| Field | Value |
|---|---|
| GitHub | #560 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, i18n, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-021](ocr-hwr.md#sn-hwr-021), [SN-I18N-010](i18n.md#sn-i18n-010), [SN-A11Y-014](a11y.md#sn-a11y-014) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

[SN-HWR-021](ocr-hwr.md#sn-hwr-021) exposes OCR-backed alt text for handwritten content and [SN-I18N-010](i18n.md#sn-i18n-010) ships Arabic-script and CJK recognisers, but the step between recognition and presentation — **ordering recognised blocks into a reading sequence** — assumes left-to-right, top-to-bottom. That assumption is wrong for Arabic, Persian and Urdu handwriting (right-to-left within a line, and right-to-left column order on a two-column page) and for traditional vertical CJK (top-to-bottom, columns right-to-left). Get it wrong and the screen-reader transcript, reading mode, search snippets, and the exported PDF reading order ([SN-GA11-012](a11y.md#sn-ga11-012)) present the page as a shuffled sentence — an accessibility failure that hits precisely the users who depend on the transcript most, and one that automated conformance checks cannot detect.

#### Scope

**In:** a reading-order resolver in `packages/sane_ml` that takes recognised stroke groups with their bounding boxes plus the page/block language ([SN-GA11-003](i18n.md#sn-ga11-003)) and produces an ordered sequence honouring script directionality: LTR horizontal, RTL horizontal (line order top-to-bottom, block order right-to-left), and vertical CJK (columns right-to-left) where the recogniser reports it; a heuristic for multi-column pages that uses whitespace gutters rather than raw x-position, parameterised by direction; the resolved order driving the canvas a11y tree traversal ([SN-A11Y-003](a11y.md#sn-a11y-003)), reading mode ([SN-A11Y-014](a11y.md#sn-a11y-014)), transcript export, search snippet assembly, and the tagged-PDF structure tree; a manual **reorder** affordance so a user can fix a page the heuristic gets wrong, persisted with the document; correct paragraph direction and isolation when a transcript mixes scripts ([SN-GA11-015](i18n.md#sn-ga11-015)).

**Out:** the recognisers themselves ([SN-I18N-010](i18n.md#sn-i18n-010)), maths layout ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)), translation ([SN-HWR-022](ocr-hwr.md#sn-hwr-022)).

#### Acceptance criteria

- [ ] A page of Arabic handwriting produces a transcript in correct reading order, verified against a fixture with known ground truth.
- [ ] A two-column Arabic page orders the right column before the left; a two-column English page does the reverse.
- [ ] Vertical CJK content, where the recogniser indicates it, orders columns right-to-left; horizontal CJK falls back to LTR ordering.
- [ ] The canvas a11y tree, reading mode, search snippets and exported PDF tag order all consume the same resolver (a single implementation, asserted by test).
- [ ] A user can manually reorder blocks; the override persists, syncs, and wins over the heuristic.
- [ ] Mixed-script transcripts render each paragraph with the correct direction and isolation, and announce with the correct voice.

#### Technical notes

Keep the resolver pure (`List<RecognisedBlock> → List<RecognisedBlock>`) so it is testable with fixture geometry and reusable across features; direction comes from the block language tag rather than from character sniffing, with a Unicode-script fallback. Store the manual override as an explicit order list on the page in `packages/sane_core` so CRDT merges converge on it deterministically.

#### Security & privacy

Recognition stays on-device; the resolver adds no network use. The override is content metadata inside the encrypted envelope ([SN-CRY-001](security.md#sn-cry-001)). Malformed geometry from a corrupted document must not crash or loop the resolver — cover in the fuzz corpus ([SN-QA-013](qa.md#sn-qa-013)).

#### UX notes

The reorder affordance lives in reading mode and in the page overflow menu ('Fix reading order'), with drag plus a non-drag alternative (move up/down) per [SN-A11Y-009](a11y.md#sn-a11y-009). Announce the new position after each move.

#### Test plan

`packages/sane_ml/test/reading_order_test.dart` (LTR, RTL, two-column each direction, vertical CJK, degenerate geometry); an integration test asserting reading mode, a11y traversal and PDF tag order agree for the same fixture; manual VoiceOver pass on an Arabic fixture page.

#### Dependencies

[SN-HWR-021](ocr-hwr.md#sn-hwr-021), [SN-I18N-010](i18n.md#sn-i18n-010), [SN-A11Y-014](a11y.md#sn-a11y-014), [SN-GA11-003](i18n.md#sn-ga11-003).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-018

<a id="sn-gcmp-018"></a>

**Build the live-unit physics/math scratchpad**

| Field | Value |
|---|---|
| GitHub | #1070 |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | ocr-hwr, text |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-014](ocr-hwr.md#sn-hwr-014), [SN-TXT-002](text.md#sn-txt-002) |
| Security controls | — |
| Extra labels | innovation, needs-design |

#### Context
Innovation-brief feature F08 [CATEGORY-DEFINING]: a notebook where handwritten or typed expressions evaluate live, carry physical units (m/s, kg, C), propagate units through equations and flag dimensional errors (docs/product/innovation-brief.md F08 and Part 4 item 2). Apple Math Notes and Soulver show appetite for inline computation but are calculator-flavoured with shallow unit handling; no note app does units-aware CAS over handwriting. This owns the STEM segment the ink incumbents ignore and is one of the five category-defining bets. No tracker issue implements it.

#### Scope
**In:** a units-aware evaluation engine in Dart (arithmetic, variables, SI + common derived units, unit conversion, dimensional-consistency checking); typed-math input first; live results shown inline as you edit; dimensional-mismatch flagging with a clear explanation; then ink-math input via handwriting-to-math recognition, always showing the recognised expression for correction.
**Out:** step-by-step symbolic solving ([SN-HWR-015](ocr-hwr.md#sn-hwr-015)); graphing ([SN-GCMP-015](shapes-diagrams.md#sn-gcmp-015)); a full symbolic CAS beyond evaluation/units; cloud math (Mathpix) which is a separate opt-in adapter.

#### Acceptance criteria
- [ ] Typed expressions with units evaluate live and display the result with the correct unit (e.g. 9.8 m/s^2 * 3 s = 29.4 m/s).
- [ ] Adding an incompatible unit (metre + second) flags a dimensional error before it propagates, with an explanation.
- [ ] Variables defined earlier are usable later on the page; results update reactively on edit.
- [ ] Ink expressions are recognised to math, the recognised form is shown and correctable, then evaluated ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)).
- [ ] All evaluation is on-device and deterministic; the engine is sandboxed and bounded.

#### Technical notes
Implement the units-aware CAS in a pure-Dart package (dimensioned quantities, unit registry, parser/evaluator) usable from `sane_core`/`sane_ml`; store the expression graph in the document model ([SN-TXT-002](text.md#sn-txt-002) for typed math tokens). Ink path uses math recognition ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)); keep opt-in cloud (Mathpix) behind the AI gate for hard cases. Reference docs/product/innovation-brief.md F08 and docs/design/screens-and-flows.md section 7.4. Needs a design pass on inline-result presentation.

#### Security & privacy
Expression evaluation must be sandboxed (no code execution), with iteration/precision bounds to prevent DoS. On-device by default; any cloud math is per-request opt-in with the data-leaves-device indicator ([SN-AI-019](ai.md#sn-ai-019)). Maps to MASVS-CODE, MASVS-PRIVACY, OWASP-A03.

#### UX notes
Inline result chips distinct from input; dimensional-error styling with a plain-language reason; recognised-expression confirmation for ink; honour design-system tokens and Reduce Motion.

#### Test plan
Unit: unit algebra, conversions, dimensional-error detection, parser edge cases (test/math/units_cas_test.dart). Widget: live-result inline rendering, ink correction UX. Integration: ink -> recognise -> evaluate; reactive variable updates. Fuzz: malformed expressions bounded, no hang.

#### Dependencies
[SN-HWR-014](ocr-hwr.md#sn-hwr-014), [SN-TXT-002](text.md#sn-txt-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-HWR-001

<a id="sn-hwr-001"></a>

**Build on-device handwriting recognition, OCR, math & shape engine (sane_ml)**

| Field | Value |
|---|---|
| GitHub | #15 |
| Type | epic |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, search, ai |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-004](storage.md#sn-core-004), [SN-INK-002](ink.md#sn-ink-002), [SN-SRCH-002](search.md#sn-srch-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-STORAGE-1`, `MASVS-NETWORK-1`, `MASVS-CODE-2`, `OWASP-A03`, `OWASP-A08`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
"Sane Sage" recognition is the layer that makes handwriting searchable, convertible, and legible without ever leaving the device by default. This epic delivers `packages/sane_ml` (pure-Dart capability interfaces + on-device-first registry) and the `plugins/sane_ml_native` engines (Apple Vision/Speech/Foundation Models; Android ML Kit Digital Ink/Text/GenAI; Whisper/Tesseract on web) exactly as fixed in docs/adr/0016-on-device-ml-and-ai.md and specified in docs/product/prd-02-library-documents-audio-search.md §10–§11. The non-negotiable is locked decision 6: **on-device by default; any cloud inference is an explicit per-request opt-in with a visible data-leaves-device indicator** — there is no silent cloud fallback, ever. Recognition serves three promises at once: free on-device handwriting search (PRD-LB-300, deliberately not paywalled, unlike Notability), explicit Pro convert-to-text/math/solve (PRD-LB-302/306/307), and OCR of imported images and text-layerless PDFs so everything is findable (PRD-LB-305). All recognised text, transcripts, and embeddings are treated as note content: stored locally, E2E-encryptable on sync, and never logged (ADR-0016 Security & privacy impact).

#### Scope
**In:** the `sane_ml` adapter interfaces + runtime registry + mocks; ML Kit Digital Ink ink→text; image OCR matrix (Vision/ML Kit/PaddleOCR/Tesseract.js); PDF OCR; web fallback path; language/model download & lifecycle; background non-destructive recognition feeding the search index with a stroke↔text map; lasso convert-to-text with confidence/correction UX; convert-as-you-write mode; shape recognition/beautification; handwriting refine/reflow; math recognition (LaTeX) and solve; custom dictionary; spellcheck; data detectors; the per-request cloud escalation gate + banner; accuracy evaluation datasets + tests; OCR-backed a11y alt-text; whole-document translation.
**Out:** the FTS5 index storage itself ([SN-SRCH-002](search.md#sn-srch-002)), audio transcription capture ([SN-AUD-002](audio.md#sn-aud-002)/[SN-AUD-001](audio.md#sn-aud-001)), the Sane Sage assistant/RAG chat ([SN-AI-001](ai.md#sn-ai-001)), the shape *tool* UX ([SN-SHP-001](shapes-diagrams.md#sn-shp-001)), and billing entitlement plumbing ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] With `SANE_AI_CLOUD_ENABLED=false` (default) every capability resolves to a local engine or degrades gracefully; no network call carries note content (airplane-mode test passes).
- [ ] Background recognition builds a searchable per-word index without mutating a single stroke; tapping recognised text highlights the source ink and vice-versa.
- [ ] Explicit lasso→convert produces editable typed text with confidence + correction UX; the original ink stays the source of truth.
- [ ] Recognition language is selectable per notebook and covers the broadest available on-device set on **every** platform (no iOS-vs-Android disparity shipped).
- [ ] All child issues below are closed, each with its own tests and Security & privacy section filled.

#### Technical notes
Packages: `packages/sane_ml` (pure Dart, no `package:flutter`; `Result<T,Failure>` from `sane_core`), plugin `plugins/sane_ml_native` (federated, ADR-0012). Registry resolves best on-device engine per capability per device (ADR-0016 decision 2–3). Feeds `packages/sane_search` FTS5 + `sqlite-vec` ([SN-SRCH-002](search.md#sn-srch-002)). PRD IDs: PRD-LB-300–308, PRD-LB-260/261, PRD-LB-386/387/388/392, PRD-ED-112/116/187. ADRs: 0016 (this), 0015 (transcription hand-off), 0008 (ink consumed), 0012 (native plugins), 0010 (web constraints).
Children:
- [ ] [SN-HWR-002](ocr-hwr.md#sn-hwr-002) Define sane_ml capability interfaces + on-device-first registry + mocks
- [ ] [SN-HWR-003](ocr-hwr.md#sn-hwr-003) ML Kit Digital Ink Recognition adapter (ink→text, Android/iOS)
- [ ] [SN-HWR-004](ocr-hwr.md#sn-hwr-004) Recognition model download & lifecycle manager
- [ ] [SN-HWR-005](ocr-hwr.md#sn-hwr-005) Web ink→text recognition fallback path
- [ ] [SN-HWR-006](ocr-hwr.md#sn-hwr-006) Background non-destructive recognition → search index + stroke↔text map
- [ ] [SN-HWR-007](ocr-hwr.md#sn-hwr-007) Lasso convert-to-text (Pro-gated, editable output)
- [ ] [SN-HWR-008](ocr-hwr.md#sn-hwr-008) Recognition confidence & correction UX
- [ ] [SN-HWR-009](ocr-hwr.md#sn-hwr-009) Convert-as-you-write live recognition mode
- [ ] [SN-HWR-010](ocr-hwr.md#sn-hwr-010) Image OCR adapter matrix (Vision/ML Kit/PaddleOCR/Tesseract.js)
- [ ] [SN-HWR-011](ocr-hwr.md#sn-hwr-011) PDF OCR for text-layerless PDFs
- [ ] [SN-HWR-012](ocr-hwr.md#sn-hwr-012) Shape recognition & beautification engine
- [ ] [SN-HWR-013](ocr-hwr.md#sn-hwr-013) Handwriting refine / reflow / straighten backing
- [ ] [SN-HWR-014](ocr-hwr.md#sn-hwr-014) Math recognition → typeset + LaTeX
- [ ] [SN-HWR-015](ocr-hwr.md#sn-hwr-015) Solve math (worked step-by-step, Pro-gated)
- [ ] [SN-HWR-016](ocr-hwr.md#sn-hwr-016) Custom recognition dictionary
- [ ] [SN-HWR-017](ocr-hwr.md#sn-hwr-017) Handwriting spellcheck in the writer's own style
- [ ] [SN-HWR-018](ocr-hwr.md#sn-hwr-018) Data detectors over recognised text
- [ ] [SN-HWR-019](ocr-hwr.md#sn-hwr-019) Per-request cloud escalation gate + data-leaves-device banner
- [ ] [SN-HWR-020](ocr-hwr.md#sn-hwr-020) Recognition accuracy evaluation datasets & test harness
- [ ] [SN-HWR-021](ocr-hwr.md#sn-hwr-021) OCR-backed alt-text & accessibility for handwritten content
- [ ] [SN-HWR-022](ocr-hwr.md#sn-hwr-022) Whole-document translation (page/PDF)

#### Security & privacy
On-device-first is the privacy control (LINDDUN): the registry MUST resolve local first and MUST NOT fall back to cloud silently (MASVS-PRIVACY-1/2, ASVS V1). Recognised text, prompts, and model I/O are note content — stored locally, E2E-encryptable on sync (MASVS-STORAGE-1), never logged (CWE-117, overview §8.2). Untrusted image/PDF inputs to OCR are validated, resource-capped, and parsed off the UI isolate (MASVS-CODE-2, CWE-20/400/502). Downloaded models are integrity-checked before use (OWASP-A08). Each cloud escalation is a per-request opt-in with a banner (MASVS-NETWORK-1, OWASP-A03).

#### UX notes
Surfaces: the On-device recognition toggle (design/Sane Notes.dc.html §12; docs/design/screens-and-flows.md §12), the selection action bar Convert-to-text / Solve-math (§7.4), Search (§11), Shapes (§7.3). All chrome uses `sane_ui` tokens (docs/design/tokens.json — 17 looks + light/dark) and meets WCAG 2.2 AA. Recognition never mutates the document silently; every convert is undoable.

#### Test plan
Per-child unit/widget/golden/integration tests plus the shared accuracy harness in [SN-HWR-020](ocr-hwr.md#sn-hwr-020) (`tools/recognition_eval/`). Airplane-mode integration test `app/integration_test/recognition_on_device_test.dart` asserts zero note-content egress at default settings.

#### Dependencies
SN-FND-002 (monorepo scaffold), SN-CORE-004 (SQLite/blob store), SN-INK-002 (stroke capture), SN-SRCH-002 (FTS index). Recognition consumes ink from the [SN-INK-001](ink.md#sn-ink-001) engine and feeds [SN-SRCH-001](search.md#sn-srch-001) search and [SN-AI-001](ai.md#sn-ai-001) Sage.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-002

<a id="sn-hwr-002"></a>

**Define sane_ml capability interfaces + on-device-first registry + mocks**

| Field | Value |
|---|---|
| GitHub | #267 |
| Type | task |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, ai |
| Size | L |
| SDLC | design |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-NETWORK-1`, `ASVS-V1`, `OWASP-A03`, `CWE-807` |
| Extra labels | agent-ready |

#### Context
Every recognition capability in Sane Notes must be reachable through one narrow, testable seam so the app always has an on-device default and the wildly different engines (ML Kit, Apple Vision/Foundation Models, PaddleOCR, Whisper, MyScript, Mathpix) hide behind a stable interface. docs/adr/0016-on-device-ml-and-ai.md decision 1–2 mandates pure-Dart capability interfaces in `packages/sane_ml` plus a **runtime registry that resolves the best available on-device implementation first** and only ever selects a cloud implementation when the user explicitly opts in for that request. This issue defines that seam and its mock implementations so all downstream recognition work ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)..[SN-HWR-022](ocr-hwr.md#sn-hwr-022)) can be built and unit-tested headlessly before any native code exists. Getting the seam right is the difference between "no note content leaves the device" being an architectural guarantee versus a hope.

#### Scope
**In:** the interfaces `InkRecognizer`, `ImageOcr`, `ShapeRecognizer`, `MathRecognizer`, `Transcriber`, `TextGenerator`, `Embedder`, `Translator`; the `RecognitionRegistry` with per-capability, per-device candidate lists and on-device-first resolution; an `EngineDescriptor` (id, licence, on-device flag, languages, model-size, availability probe); a `MockRecognizerSuite` backing every method; the `RecognitionConfig` (per-notebook language, cloud master gate `SANE_AI_CLOUD_ENABLED` default false).
**Out:** any real engine implementation (later issues); the cloud opt-in banner UI ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)); FTS storage ([SN-SRCH-002](search.md#sn-srch-002)).

#### Acceptance criteria
- [ ] All eight interfaces return `Result<T, Failure>` and carry `///` dartdoc; `packages/sane_ml` imports no `package:flutter` (arch-lint passes).
- [ ] `RecognitionRegistry.resolve(capability)` returns the highest-priority **on-device** engine whose availability probe succeeds; a cloud engine is returned only when `request.cloudOptIn == true` AND `SANE_AI_CLOUD_ENABLED == true`.
- [ ] With cloud disabled (default) and no on-device engine registered, `resolve` returns a typed `Failure.unavailable` (offer-download/opt-in), never throws and never silently returns a cloud engine — asserted by test.
- [ ] A missing model surfaces `Failure.modelMissing(size)` so callers can offer download or cloud opt-in; no crash.
- [ ] `MockRecognizerSuite` produces deterministic outputs for every interface for use across all downstream tests.

#### Technical notes
`packages/sane_ml/lib/src/`: `recognition_registry.dart`, `engine_descriptor.dart`, `capabilities/*.dart`, `mock/mock_recognizers.dart`. Dependencies: `sane_core` only (Result/Failure, HLC, ids). Resolution order is data-driven from `EngineDescriptor.priority` + `onDevice`; the master gate reads `--dart-define=SANE_AI_CLOUD_ENABLED` via overview §7.1. Interfaces mirror ADR-0016 decision 1 and the engine matrix in decision 3. Do not couple to `sane_ml_native` MethodChannels here — those are injected implementations registered at app composition (ADR-0003 Riverpod).

#### Security & privacy
This is the on-device-first control point (LINDDUN, MASVS-PRIVACY-1/2, ASVS V1). The resolver MUST fail closed to on-device/unavailable and MUST NOT reach a cloud engine without an explicit per-request opt-in (OWASP-A03, MASVS-NETWORK-1); guard against a mis-registered cloud engine shadowing a local one (CWE-807 reliance on untrusted inputs in a security decision). No content is logged; `EngineDescriptor` logs only opaque ids.

#### UX notes
No direct UI; establishes the states later screens render — available / downloading / unavailable / cloud-opt-in. The On-device recognition toggle (docs/design/screens-and-flows.md §12) reads `RecognitionConfig`. Copy for the unavailable state defers to [SN-HWR-004](ocr-hwr.md#sn-hwr-004).

#### Test plan
`packages/sane_ml/test/recognition_registry_test.dart` (resolution order, cloud-gate fail-closed, model-missing), `packages/sane_ml/test/mock_recognizers_test.dart`. No widget tests (pure Dart, headless).

#### Dependencies
SN-FND-002 (scaffold), SN-CORE-002 (Result/Failure, model entities).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-003

<a id="sn-hwr-003"></a>

**Implement ML Kit Digital Ink Recognition adapter for ink-to-text**

| Field | Value |
|---|---|
| GitHub | #268 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | ocr-hwr, ai |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-002](ocr-hwr.md#sn-hwr-002), [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-2`, `MASVS-STORAGE-1`, `OWASP-A08`, `CWE-20`, `CWE-494` |
| Extra labels | agent-ready |

#### Context
The default online-ink engine for Sane Notes is **Google ML Kit Digital Ink Recognition** — free, fully on-device, covering 300+ languages / 25+ scripts plus shape and gesture classifiers — chosen over MyScript as the free default in docs/adr/0016-on-device-ml-and-ai.md decision 3 and required by PRD-LB-301. Because we capture ordered stroke data (not a flattened image) online-ink recognition is far more accurate than image OCR, and it powers both free handwriting search ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)) and Pro convert-to-text ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)). This issue wires ML Kit Digital Ink through `plugins/sane_ml_native` as the concrete `InkRecognizer` on Android and iOS, converting Sane ink strokes into ML Kit `Ink` and returning ranked candidates with per-token bounds for the stroke↔text map.

#### Scope
**In:** the `InkRecognizer` implementation over ML Kit Digital Ink (Android via `com.google.mlkit:digital-ink-recognition`, iOS via `GoogleMLKit/DigitalInkRecognition`); stroke→`Ink` conversion (points, no timestamps required); model-tag resolution per BCP-47 language; ranked candidate list with scores; writing-area + pre-context hints; per-recognition language override; graceful `modelMissing` hand-off to [SN-HWR-004](ocr-hwr.md#sn-hwr-004).
**Out:** language-pack download UI ([SN-HWR-004](ocr-hwr.md#sn-hwr-004)); the search index writer ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)); convert-to-text UX ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)); web ([SN-HWR-005](ocr-hwr.md#sn-hwr-005)).

#### Acceptance criteria
- [ ] Given a set of Sane strokes and a target language with its model present, the adapter returns ≥ 1 ranked candidate; the top candidate for a clean English sample matches ground truth in the fixture set.
- [ ] Recognition runs off the UI isolate and never blocks input; recognising a 200-stroke page returns in < 500 ms on a mid-range Android reference device.
- [ ] Requesting a language whose model is absent returns `Failure.modelMissing` (not a crash) and triggers no network call by itself.
- [ ] Every result exposes token text + score + bounding box so [SN-HWR-006](ocr-hwr.md#sn-hwr-006) can build the stroke↔text map.
- [ ] A `WritingArea` and optional pre-context are passed through and measurably improve recognition on the fixture set.

#### Technical notes
`plugins/sane_ml_native` platform-interface method `recognizeInk(strokes, lang, writingArea, preContext)`; Kotlin uses `DigitalInkRecognition`, `Ink.Stroke.builder()`, `RecognitionContext`; Swift uses `MLKDigitalInkRecognizer`. Serialise strokes as compact point arrays across the channel (overview §6 isolate rules). Consumes `sane_ink` stroke geometry ([SN-INK-002](ink.md#sn-ink-002)). Registered into `RecognitionRegistry` ([SN-HWR-002](ocr-hwr.md#sn-hwr-002)) with `onDevice=true`, priority above cloud. Record ML Kit terms in the SBOM (ADR-0016 decision 9). Model management is delegated to [SN-HWR-004](ocr-hwr.md#sn-hwr-004).

#### Security & privacy
Inference is 100% on-device (MASVS-PRIVACY-1); no strokes or recognised text cross the network (MASVS-NETWORK). Validate stroke arrays crossing the MethodChannel (MASVS-PLATFORM-2, CWE-20). Model files fetched by [SN-HWR-004](ocr-hwr.md#sn-hwr-004) are integrity-checked before load (OWASP-A08, CWE-494). Recognised text is note content: kept in the local store (MASVS-STORAGE-1), never logged.

#### UX notes
No standalone UI; feeds the recognition-driven surfaces. The On-device recognition indicator (docs/design/screens-and-flows.md §12) reflects that this engine runs locally. Language selection surfaces in [SN-HWR-008](ocr-hwr.md#sn-hwr-008). A11y: recognised text is what makes handwriting screen-reader-readable ([SN-HWR-021](ocr-hwr.md#sn-hwr-021)).

#### Test plan
`plugins/sane_ml_native/test/ink_recognizer_channel_test.dart` (channel contract, mock native), `packages/sane_ml/test/ink_recognition_fixture_test.dart` (ground-truth fixtures via the mock + a golden candidate list), and an on-device manual smoke on both platforms recorded in the harness ([SN-HWR-020](ocr-hwr.md#sn-hwr-020)).

#### Dependencies
SN-HWR-002 (interfaces/registry), SN-INK-002 (stroke capture).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-004

<a id="sn-hwr-004"></a>

**Add recognition model download & lifecycle manager with integrity checks**

| Field | Value |
|---|---|
| GitHub | #269 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, settings |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-002](ocr-hwr.md#sn-hwr-002) |
| Security controls | `MASVS-CODE-2`, `MASVS-STORAGE-1`, `MASVS-NETWORK-1`, `OWASP-A08`, `CWE-494`, `CWE-347`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Recognition capability varies wildly by device: ML Kit language packs, Whisper weights, EmbeddingGemma weights and PaddleOCR models are all **downloaded on demand**, and a missing model must degrade gracefully (offer download or cloud opt-in) rather than crash (docs/adr/0016-on-device-ml-and-ai.md decision 8; consequences "graceful-degradation logic is real complexity"). Because downloaded models are executable-adjacent assets, decision 8 and the Security & privacy impact section require they be **integrity-checked (hash/signature) before use**. This issue centralises model discovery, size-aware download with user awareness, verification, storage, and eviction so every engine adapter ([SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-HWR-005](ocr-hwr.md#sn-hwr-005), [SN-HWR-010](ocr-hwr.md#sn-hwr-010), [SN-HWR-014](ocr-hwr.md#sn-hwr-014)) shares one trustworthy path, and so recognition/transcription/translation language pickers can expose the full on-device set (PRD-LB-371).

#### Scope
**In:** a `ModelManager` (list installed/available, size, language coverage, licence), size-aware download with progress + cancel + resume + Wi-Fi-only option, SHA-256 (and signature where the vendor provides one) verification before first load, on-disk storage under the app sandbox, LRU/manual eviction under storage pressure, and a Settings → Languages & models screen; ML Kit `RemoteModelManager` integration.
**Out:** the actual inference adapters; the cloud opt-in banner ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)); telemetry of download failures beyond opt-in diagnostics ([SN-TEL-001](telemetry.md#sn-tel-001)).

#### Acceptance criteria
- [ ] Downloading a model shows its size (MB) before starting and a live progress indicator; cancel and resume work; failure lands in a retryable error state, never a crash.
- [ ] A model whose SHA-256 (or signature) does not match the manifest is deleted and rejected with `Failure.integrity`; it is never loaded (regression test).
- [ ] With no model present, the capability reports unavailable and the UI offers Download or (if permitted) cloud opt-in — verified by test.
- [ ] Wi-Fi-only respected; a metered-network download prompts before proceeding.
- [ ] The Languages & models screen lists installed + available models with size and licence and lets the user delete any (freeing disk).

#### Technical notes
`packages/sane_ml/lib/src/model_manager.dart` (pure orchestration + `Result`), native download via `plugins/sane_ml_native` (`RemoteModelManager` on ML Kit; direct HTTPS for Whisper/EmbeddingGemma weights with a pinned host). Manifest carries `{id, url, sizeBytes, sha256, sig?, licence, languages[]}`. Storage paths canonicalised and confined to the sandbox (secure-coding-checklist §1). Integrity + provenance recorded per ADR-0016 decision 9; SBOM lists every model + licence. Settings screen in `app/` uses `sane_ui`.

#### Security & privacy
Downloaded models are untrusted binaries: verify SHA-256/signature before load and fail closed (OWASP-A08, CWE-494 download of code without integrity check, CWE-347 improper signature verification). Cap download size and disk use (CWE-400). Fetch only over TLS from a pinned host (MASVS-NETWORK-1, CWE-319). No note content is involved; log only model ids + outcome, never URLs with tokens (CWE-117). Stored models sit in the app sandbox (MASVS-STORAGE-1).

#### UX notes
Settings → Languages & models (docs/design/screens-and-flows.md §12; design/Sane Notes.dc.html settings). States: idle / downloading (progress + cancel) / installed / verifying / failed (retry) / evicted. All 17 looks + light/dark via `sane_ui` tokens; 44pt/48dp targets; VoiceOver/TalkBack labels on rows and buttons; download size announced. Honest copy: "Handwriting for Hindi needs a 38 MB language pack — download once, works offline."

#### Test plan
`packages/sane_ml/test/model_manager_test.dart` (verify-before-load, integrity reject, resume, eviction), `app/test/settings/models_screen_test.dart` (widget states), golden `app/test/golden/models_screen_*` across looks.

#### Dependencies
SN-HWR-002 (registry reads model availability).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-005

<a id="sn-hwr-005"></a>

**Implement web ink-to-text recognition fallback path**

| Field | Value |
|---|---|
| GitHub | #270 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | web |
| Areas | ocr-hwr, ai |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-002](ocr-hwr.md#sn-hwr-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `OWASP-A03`, `OWASP-A08`, `CWE-319` |
| Extra labels | agent-ready, needs-decision |

#### Context
Web is the weakest recognition surface: ML Kit is mobile-only and there is no first-class on-device online-ink engine in the browser (docs/adr/0016-on-device-ml-and-ai.md decision 3 — web ink→text is "custom/none → cloud opt-in"; consequences "Web AI is the weakest surface", ADR-0010). Sane Notes still must not silently ship a worse or a leaky experience on Web, so this issue defines the honest web path: attempt any available on-device option (a WASM recognizer if one is bundled/feasible), otherwise present the capability as **cloud-opt-in only** with the data-leaves-device banner and never auto-send ink. This keeps the on-device-first guarantee intact on Web while making the limitation explicit to the user.

#### Scope
**In:** a web `InkRecognizer` registration that (1) uses a WASM/on-device recognizer when present, else (2) reports `unavailable` and routes to explicit cloud opt-in ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)); a capability-availability probe for the browser; graceful messaging; parity of the returned candidate shape with [SN-HWR-003](ocr-hwr.md#sn-hwr-003).
**Out:** building a novel browser HWR model from scratch; image OCR on web (Tesseract.js is [SN-HWR-010](ocr-hwr.md#sn-hwr-010)); the cloud transport itself.

#### Acceptance criteria
- [ ] On a browser with no on-device engine and cloud disabled, ink→text reports `unavailable` and the UI explains why; no ink is sent anywhere.
- [ ] With cloud explicitly opted-in per request, ink is sent only after the data-leaves-device banner is confirmed; the returned candidates match the [SN-HWR-003](ocr-hwr.md#sn-hwr-003) shape so downstream UX is identical.
- [ ] Where a WASM on-device recognizer is available, it is preferred over cloud automatically (on-device-first).
- [ ] Recognition work runs in a Web Worker (Dart isolate) and never blocks the main thread (no frame > 16.7 ms while writing).

#### Technical notes
`plugins/sane_ml_native/web` conditional import; Dart isolates compile to Web Workers (overview §6). Feature-detect WebGPU/WASM per ADR-0010. Register with `onDevice` reflecting reality so [SN-HWR-002](ocr-hwr.md#sn-hwr-002) resolution stays honest. **needs-decision:** whether to bundle a specific WASM HWR model or ship web as cloud-opt-in-only for v1 (CLAUDE.md §13 web-AI posture) — implement the cloud-opt-in-only default and gate the WASM path behind availability.

#### Security & privacy
No silent cloud fallback (MASVS-PRIVACY-1, OWASP-A03); the only egress is an explicit per-request opt-in over TLS with the banner (MASVS-NETWORK-1, CWE-319). Web PWA at-rest guarantees are reduced (no Keychain) so recognised text follows the web storage posture (ADR-0010; CLAUDE.md §13). Model/WASM assets integrity-checked (OWASP-A08).

#### UX notes
Reuses the On-device recognition messaging (docs/design/screens-and-flows.md §12) with a web-specific note ("On-device handwriting recognition isn't available in this browser yet"). Cloud opt-in path shows the data-leaves-device banner ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)). Keyboard-reachable, AA contrast, all looks/dark.

#### Test plan
`packages/sane_ml/test/web_ink_recognizer_test.dart` (unavailable + opt-in routing via mock), an integration test `app/integration_test/web_recognition_optin_test.dart` asserting no egress without opt-in.

#### Dependencies
SN-HWR-002 (registry). Coordinates with [SN-HWR-019](ocr-hwr.md#sn-hwr-019) (cloud banner).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-006

<a id="sn-hwr-006"></a>

**Run background non-destructive recognition into the search index**

| Field | Value |
|---|---|
| GitHub | #271 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, search |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-SRCH-002](search.md#sn-srch-002), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `MASVS-PRIVACY-4`, `OWASP-A03`, `CWE-117`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
The signature privacy-respecting feature is "search your handwriting without converting it": Sane Notes runs **background handwriting recognition continuously to build a searchable index, and this never destroys ink and is free/on-device/on-by-default** (PRD-LB-300; docs/adr/0016-on-device-ml-and-ai.md decision 5). Notability paywalls handwriting search — its most-resented gate — so keeping this free is a deliberate wedge (PRD-02 §14). This issue builds the background service that recognises new/edited ink off the UI isolate, writes `SearchIndexRow`s (PRD-LB-260) with enough locality to deep-link (docId, pageIndex, source, on-page quads/stroke ids — PRD-LB-261), and persists a **stroke↔text mapping** so tapping recognised text highlights the source ink and vice-versa (ADR-0016 decision 5).

#### Scope
**In:** a debounced, incremental (per-page-on-change) recognition scheduler on the search/index isolate; conversion of [SN-HWR-003](ocr-hwr.md#sn-hwr-003)/[SN-HWR-005](ocr-hwr.md#sn-hwr-005) candidates into `SearchIndexRow` records; the `StrokeTextMap` (word→stroke-ids, stroke→text-range) persisted alongside the page; re-index on edit and invalidation on delete; the On-device recognition toggle wiring.
**Out:** the FTS5 table + query engine ([SN-SRCH-002](search.md#sn-srch-002)); global search UX (PRD-LB-262, [SN-SRCH-001](search.md#sn-srch-001)); explicit convert-to-text ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)); embeddings/semantic RAG ([SN-AI-001](ai.md#sn-ai-001)).

#### Acceptance criteria
- [ ] Writing new ink and pausing triggers background recognition within a debounce window; the words become searchable without any stroke being modified (byte-for-byte ink unchanged — regression test).
- [ ] Each `SearchIndexRow` carries docId, pageIndex, source=handwriting, text, per-word quads/stroke ids, and lang so a result scrolls to and highlights the exact strokes.
- [ ] Tapping a recognised word highlights its source strokes; selecting strokes reveals their recognised text — both directions verified.
- [ ] Recognition and indexing run entirely off the UI isolate; a 1,000-stroke page indexes without dropping a writing frame (no frame > 16.7 ms).
- [ ] Turning the On-device recognition toggle off halts background recognition and (optionally) clears the derived index; turning it on re-indexes.

#### Technical notes
`packages/sane_ml` orchestrator + `packages/sane_search` writer running on the search/index isolate (overview §6). `StrokeTextMap` stored as a page-scoped CRDT-friendly sidecar in `sane_core`/drift ([SN-CORE-004](storage.md#sn-core-004)). Row shape per PRD-LB-260/261 `SearchIndexRow{docId,pageIndex,source,text,quads,lang}`. Consumes [SN-HWR-003](ocr-hwr.md#sn-hwr-003); feeds [SN-SRCH-002](search.md#sn-srch-002). Coalesce edits to bound work; only re-recognise changed regions.

#### Security & privacy
Recognised text and the index are note content: stored locally and E2E-encryptable on sync (MASVS-STORAGE-1), on-device only (MASVS-PRIVACY-1), and **never logged** (CWE-117; ADR-0016 privacy impact). Background work is bounded to avoid resource exhaustion (CWE-400). The derived index is deletable and honours data-minimisation/erasure (MASVS-PRIVACY-4). No cloud path (OWASP-A03).

#### UX notes
Backs Search (design/Sane Notes.dc.html §11) and the On-device recognition privacy toggle (§12). No new chrome here beyond the toggle state; the "handwriting is searched on-device" result-count line lives in search UX. Highlighting uses `sane_ui` selection tokens across all looks/dark. A11y: recognised text powers OCR alt-text ([SN-HWR-021](ocr-hwr.md#sn-hwr-021)).

#### Test plan
`packages/sane_ml/test/background_recognition_test.dart` (debounce, incremental, ink-unchanged), `packages/sane_search/test/index_row_locality_test.dart` (quads/stroke-id round-trip), `app/integration_test/handwriting_search_deeplink_test.dart` (search → scroll → highlight exact strokes).

#### Dependencies
SN-HWR-003 (ink recognizer), SN-SRCH-002 (FTS index), SN-CORE-004 (persistence).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-007

<a id="sn-hwr-007"></a>

**Add lasso convert-to-text producing an editable text object**

| Field | Value |
|---|---|
| GitHub | #272 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-ED-004](editor.md#sn-ed-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117` |
| Extra labels | agent-ready |

#### Context
Beyond free background search, users need an **explicit** action to turn selected handwriting into editable typed text. PRD-LB-302 and PRD-ED-116 specify: lasso ink → "Convert to text" → an editable text object, keeping the **original ink as the source of truth** and storing a stroke↔text mapping so tapping text highlights source ink. This is the crucial Free/Pro line: *searching* your handwriting is free ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)); *converting* it to editable typed text is the Pro-gated action (mock; PRD-02 §14) — Free users hit the Upgrade overlay. The mock returns a canned string with no correction affordance (screens Open Q8); this issue delivers the real conversion producing an editable result and an "undo conversion" path.

#### Scope
**In:** the selection action-bar "Convert to text" command; running [SN-HWR-003](ocr-hwr.md#sn-hwr-003) over the lassoed strokes; inserting an editable `Text` object (decision 4 model) positioned at the selection; the stroke↔text map for the converted block; "undo conversion" restoring ink; the Pro gate + Upgrade overlay for Free.
**Out:** confidence/correction UX detail ([SN-HWR-008](ocr-hwr.md#sn-hwr-008)); convert-as-you-write ([SN-HWR-009](ocr-hwr.md#sn-hwr-009)); math convert ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)); the lasso selection tool itself ([SN-ED-004](editor.md#sn-ed-004)); entitlement backend ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] Lassoing handwriting and tapping "Convert to text" (Pro) replaces the selection with an editable text block and shows toast "Handwriting converted to text"; a single Undo restores the exact original ink.
- [ ] Free users tapping Convert see the Upgrade overlay and no conversion occurs; entitlement is checked via [SN-BILL-001](billing.md#sn-bill-001).
- [ ] The converted block keeps a stroke↔text map; tapping a converted word highlights the source strokes (recoverable until the user discards them).
- [ ] Convert respects the per-notebook recognition language and can be re-run in another language ([SN-HWR-008](ocr-hwr.md#sn-hwr-008)).
- [ ] Recognition runs on-device by default; any cloud assist requires the per-request banner ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)).

#### Technical notes
`app/` editor state (Riverpod) invokes `RecognitionRegistry.resolve(inkToText)` on the selected strokes ([SN-HWR-002](ocr-hwr.md#sn-hwr-002)/[SN-HWR-003](ocr-hwr.md#sn-hwr-003)); result inserted as a `Text` object via `sane_core` op (undoable through [SN-ED-003](editor.md#sn-ed-003)). Selection comes from [SN-ED-004](editor.md#sn-ed-004). Free/Pro gate via `sane_billing` ([SN-BILL-001](billing.md#sn-bill-001)). Design: selection bar Convert-to-text (design/Sane Notes.dc.html §7.4). PRD-LB-302, PRD-ED-116.

#### Security & privacy
On-device by default (MASVS-PRIVACY-1); no ink or text leaves the device unless the user opts into cloud per request (OWASP-A03). Converted text is note content — stored locally, E2E-encryptable, never logged (MASVS-STORAGE-1, CWE-117). Converting handwriting to text is also an accessibility win (screen-reader-readable) while keeping ink recoverable via Undo.

#### UX notes
Selection action bar "Convert to text" (design/Sane Notes.dc.html §7.4, §14 Upgrade). States: converting (spinner) / done (toast + editable block) / low-confidence (defers to [SN-HWR-008](ocr-hwr.md#sn-hwr-008)) / Free (Upgrade overlay). `sane_ui` tokens across all 17 looks + light/dark; 44pt/48dp targets; VoiceOver announces the new text block; Undo is a labelled control. Keep original ink recoverable.

#### Test plan
`app/test/editor/convert_to_text_test.dart` (widget: convert, undo-restores-ink, Free-gate overlay), `packages/sane_ml/test/convert_selection_test.dart` (mock recognizer → text object), golden `app/test/golden/convert_toast_*`.

#### Dependencies
SN-HWR-003 (recognizer), SN-ED-004 (lasso selection). Gated by [SN-BILL-001](billing.md#sn-bill-001); correction UX in [SN-HWR-008](ocr-hwr.md#sn-hwr-008).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-008

<a id="sn-hwr-008"></a>

**Build recognition confidence and correction UX**

| Field | Value |
|---|---|
| GitHub | #273 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-007](ocr-hwr.md#sn-hwr-007) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `OWASP-A03`, `CWE-117` |
| Extra labels | agent-ready |

#### Context
The mock's convert/solve outputs are canned strings with no way to see or fix mistakes (screens Open Q8). PRD-LB-303 requires that convert/recognition results **expose confidence and a correction UX**: show low-confidence words distinctly, let the user edit the converted text, re-convert in another language, and report a mis-recognition. It also requires the recognition **language be selectable per notebook** (default device locale) and cover the broadest available on-device set on every platform — explicitly not shipping Notability's 23-vs-72-language disparity. This issue delivers the shared confidence/correction layer used by lasso convert ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)), convert-as-you-write ([SN-HWR-009](ocr-hwr.md#sn-hwr-009)) and math ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)).

#### Scope
**In:** per-token confidence surfacing (underline/tint low-confidence words using tokens, never colour-only); inline edit of converted text; a language picker (per-notebook default + per-conversion override) exposing the full on-device set; alternate-candidate chips for a low-confidence word; a "report mis-recognition" action that stores a local correction pair (feeds [SN-HWR-016](ocr-hwr.md#sn-hwr-016) dictionary); re-convert-in-language.
**Out:** the conversion trigger itself ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)); dictionary storage ([SN-HWR-016](ocr-hwr.md#sn-hwr-016)); spellcheck ([SN-HWR-017](ocr-hwr.md#sn-hwr-017)).

#### Acceptance criteria
- [ ] Words below a confidence threshold are visually distinct (token style + a non-colour cue) and expose ≤ 5 alternate candidates on tap.
- [ ] The user can edit any converted word inline; edits persist and never alter the source ink.
- [ ] A language picker shows the complete on-device language set (from [SN-HWR-004](ocr-hwr.md#sn-hwr-004)) and defaults to the notebook language (device locale); re-convert re-runs recognition in the chosen language.
- [ ] "Report mis-recognition" records a local ink→correct-text pair with no network call; it is retrievable by [SN-HWR-016](ocr-hwr.md#sn-hwr-016).
- [ ] All controls are keyboard-operable and screen-reader-labelled; contrast ≥ 4.5:1 in all 17 looks + dark.

#### Technical notes
`app/` editor overlay + `packages/sane_ml` confidence model (scores already returned by [SN-HWR-003](ocr-hwr.md#sn-hwr-003)). Language set sourced from [SN-HWR-004](ocr-hwr.md#sn-hwr-004) `ModelManager`. Correction pairs stored per-profile in `sane_core`/drift, language-scoped, for [SN-HWR-016](ocr-hwr.md#sn-hwr-016). Never mutate the document silently (ADR-0016 decision 5). PRD-LB-303/371, screens Open Q8.

#### Security & privacy
Correction pairs and edits are note content — local only (MASVS-PRIVACY-1), erasable (MASVS-PRIVACY-4), never logged (CWE-117). Re-convert stays on-device unless a per-request cloud opt-in is taken (OWASP-A03). No mis-recognition report is sent anywhere by default.

#### UX notes
Correction affordance on the converted text block and selection bar (design/Sane Notes.dc.html §7.4). Low-confidence styling from `sane_ui` tokens (all looks + dark); alternate-candidate chips; language picker as a bottom sheet. Empty/edge: no alternates → "No other suggestions". A11y (mandatory): candidates are a labelled radio-group, edits announced, never colour-only.

#### Test plan
`app/test/editor/confidence_correction_test.dart` (low-conf styling, alternates, inline edit, language re-convert), golden `app/test/golden/low_confidence_word_*` across looks, `packages/sane_ml/test/correction_pair_store_test.dart`.

#### Dependencies
SN-HWR-007 (conversion result to correct). Feeds [SN-HWR-016](ocr-hwr.md#sn-hwr-016) (dictionary), used by [SN-HWR-014](ocr-hwr.md#sn-hwr-014) (math).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-009

<a id="sn-hwr-009"></a>

**Add convert-as-you-write live recognition mode**

| Field | Value |
|---|---|
| GitHub | #274 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | ocr-hwr, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-HWR-008](ocr-hwr.md#sn-hwr-008) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117` |
| Extra labels | agent-ready, innovation, needs-decision |

#### Context
A Nebo/MyScript-style **convert-as-you-write** mode turns handwriting into typed text continuously as the user writes, rather than only on an explicit lasso. ADR-0016 decision 5 endorses both modes (background non-destructive recognition + explicit convert) with ink as the source of truth; this issue adds the live interactive mode as a differentiator (innovation) layered on the same [SN-HWR-003](ocr-hwr.md#sn-hwr-003) engine. It is an opt-in editor mode: while active, recently written strokes are recognised into a live typed line beneath/inline, editable via gestures, and committable — without ever silently mutating the page unless the user accepts the conversion.

#### Scope
**In:** a toggleable "Convert as you write" editor mode; incremental recognition of the active writing region with debouncing; a live preview of recognised text; accept/reject per line; editing gestures (scratch-erase, insert space) backed by [SN-HWR-018](ocr-hwr.md#sn-hwr-018)/recognition; commit to a `Text` object; Pro gating consistent with [SN-HWR-007](ocr-hwr.md#sn-hwr-007).
**Out:** the background search index ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)); math live-convert ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)); the raw editing-gesture recognition backing ([SN-HWR-018](ocr-hwr.md#sn-hwr-018) is separate); web (mobile/tablet only for v1).

#### Acceptance criteria
- [ ] Enabling the mode recognises the active line within a debounce window and shows a live typed preview; the ink is untouched until the user accepts.
- [ ] Accepting commits an editable text object with a stroke↔text map; rejecting leaves only ink.
- [ ] Recognition runs off the UI isolate; enabling the mode does not regress the pen-down→pixel latency budget while writing (no frame > 16.7 ms).
- [ ] The mode is off by default, per-profile, and Pro-gated where it produces committed typed text.
- [ ] Works on-device with no network; cloud never engaged without the per-request banner.

#### Technical notes
`app/` editor mode + `packages/sane_ml` incremental recogniser wrapping [SN-HWR-003](ocr-hwr.md#sn-hwr-003); reuse confidence/correction from [SN-HWR-008](ocr-hwr.md#sn-hwr-008). **needs-decision:** exact commit granularity (per-line vs per-pause) and whether the mode ships in M3 or defers — implement the per-line proposed default and gate behind a setting. Latency-sensitive: never hop isolates on the hot draw path (CLAUDE.md §8); recognise on the search/index isolate. PRD alignment: extends PRD-LB-302, ADR-0016 decision 5.

#### Security & privacy
On-device by default (MASVS-PRIVACY-1); live previews and committed text are note content, local + E2E-encryptable, never logged (MASVS-STORAGE-1, CWE-117). No silent cloud (OWASP-A03).

#### UX notes
An editor toolbar toggle (design/Sane Notes.dc.html §7 tool area; docs/design/screens-and-flows.md §7). Live preview styling + accept/reject affordances from `sane_ui` tokens across all looks + dark. Respect Reduce Motion. A11y: preview is announced; accept/reject are labelled controls, keyboard-operable on tablets with keyboards.

#### Test plan
`app/test/editor/convert_as_you_write_test.dart` (incremental preview, accept/reject, off-by-default), `app/integration_test/editor_latency_test.dart` extended to assert no latency regression with the mode on.

#### Dependencies
SN-HWR-003 (recognizer), SN-HWR-008 (confidence/correction). Related editing gestures [SN-HWR-018](ocr-hwr.md#sn-hwr-018).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-010

<a id="sn-hwr-010"></a>

**Implement image OCR adapters (Vision, ML Kit, PaddleOCR, Tesseract.js)**

| Field | Value |
|---|---|
| GitHub | #275 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, images-media, search |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-002](ocr-hwr.md#sn-hwr-002), [SN-MED-001](images-media.md#sn-med-001) |
| Security controls | `MASVS-CODE-2`, `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-20`, `CWE-400`, `CWE-434` |
| Extra labels | agent-ready |

#### Context
Imported photos and scans must become searchable, so Sane Notes OCRs images on import — explicitly beating Goodnotes, which does not OCR imports (PRD-LB-305). Per docs/adr/0016-on-device-ml-and-ai.md decision 3 the engine matrix is **Apple Vision `VNRecognizeTextRequest`** on Apple, **ML Kit Text Recognition v2 / PaddleOCR** on Android, **Tesseract.js / PaddleOCR-WASM** on Web, with cloud/TrOCR only as an explicit opt-in for hard cases. This issue implements the `ImageOcr` capability across those engines behind the [SN-HWR-002](ocr-hwr.md#sn-hwr-002) registry and feeds recognised text (with on-page quads) into the search index. Because images are untrusted input, decode is resource-capped and off the UI isolate (secure-coding-checklist §1).

#### Scope
**In:** the `ImageOcr` implementations (Vision / ML Kit Text v2 / PaddleOCR / Tesseract.js-WASM); per-platform registration with `onDevice=true`; block/line/word geometry (quads) + confidence; language handling; hand-off of recognised rows to [SN-HWR-006](ocr-hwr.md#sn-hwr-006)/[SN-SRCH-002](search.md#sn-srch-002); defensive image validation + size caps.
**Out:** PDF OCR ([SN-HWR-011](ocr-hwr.md#sn-hwr-011)); image import/EXIF-strip ([SN-MED-001](images-media.md#sn-med-001)); math from images ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)); the cloud OCR path body ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)).

#### Acceptance criteria
- [ ] Importing a photo of printed text produces searchable text with per-word quads; a search result highlights the exact region on the image.
- [ ] OCR runs off the UI isolate and never blocks scroll; a 12-MP image OCRs without loading an unbounded bitmap (memory capped).
- [ ] Each platform resolves its on-device engine (Vision on Apple, ML Kit/PaddleOCR on Android, Tesseract.js on Web); no cloud call without the per-request banner.
- [ ] A malformed/oversized/hostile image fails **closed** into a user-safe error (no crash, no OOM) — fuzz corpus clean.
- [ ] Recognised text is stored as note content and is deletable with the image.

#### Technical notes
`plugins/sane_ml_native`: Swift `VNRecognizeTextRequest` (accurate level, language hints); Kotlin ML Kit `TextRecognition` + optional PaddleOCR; web Tesseract.js/PaddleOCR-WASM in a Worker. `packages/sane_ml` `ImageOcr` interface returns `OcrResult{blocks[]{text,quad,conf,lang}}`. Validate MIME/size, cap decode dimensions, decode off the UI isolate (secure-coding-checklist §1). Feeds [SN-HWR-006](ocr-hwr.md#sn-hwr-006) row-writer. Consumes images from [SN-MED-001](images-media.md#sn-med-001). PRD-LB-305, PRD-LB-260/261.

#### Security & privacy
Untrusted image input: validate type/size, cap resources before decode, parse off the UI isolate, fail closed (MASVS-CODE-2, CWE-20/400/434). On-device by default (MASVS-PRIVACY-1); cloud OCR only per-request with the banner (OWASP-A03). Recognised text is note content: local, E2E-encryptable, never logged (MASVS-STORAGE-1).

#### UX notes
No dedicated screen; recognised image text surfaces in Search (design/Sane Notes.dc.html §11) and powers alt-text ([SN-HWR-021](ocr-hwr.md#sn-hwr-021)). A progress/failed state for large images per PRD-LB-361 (cancellable, retryable). All chrome via `sane_ui` tokens, all looks/dark, AA. A11y: OCR of a scanned image gives screen readers real text.

#### Test plan
`packages/sane_ml/test/image_ocr_test.dart` (mock engines, quad round-trip), `plugins/sane_ml_native/test/image_ocr_channel_test.dart`, fuzz `packages/sane_ml/test/fuzz/image_ocr_malformed_test.dart` (hostile inputs fail closed), golden of a search hit highlighting an image region.

#### Dependencies
SN-HWR-002 (registry), SN-MED-001 (image import). Feeds [SN-HWR-006](ocr-hwr.md#sn-hwr-006) / [SN-SRCH-002](search.md#sn-srch-002).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-011

<a id="sn-hwr-011"></a>

**OCR text-layerless PDFs on import for searchable text**

| Field | Value |
|---|---|
| GitHub | #276 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, pdf, search |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-010](ocr-hwr.md#sn-hwr-010), [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-CODE-2`, `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Sane Notes must OCR imported PDFs that lack a text layer so their content becomes searchable — explicitly beating Goodnotes, which only searches PDFs that already carry an OCR layer (PRD-LB-305, PRD-LB-260). For PDFs that already have a text layer, we extract it on first open; for those without, we render pages and OCR them via [SN-HWR-010](ocr-hwr.md#sn-hwr-010) engines, storing recognised text with on-page quads so a search result scrolls to and highlights the exact location (PRD-LB-261). This runs off the UI isolate and is resource-capped because PDFs are untrusted input (secure-coding-checklist §1; docs/adr/0014-pdf-engine.md).

#### Scope
**In:** detect `hasTextLayer`; extract the text layer (with quads) when present via the PDF engine; otherwise render pages at a sensible DPI and OCR them with [SN-HWR-010](ocr-hwr.md#sn-hwr-010); write `SearchIndexRow`s (source=pdf) with page quads; incremental/lazy processing (OCR on first open or on demand), cancellable with progress.
**Out:** the PDF render/import pipeline itself ([SN-PDF-002](pdf.md#sn-pdf-002)); image OCR engines ([SN-HWR-010](ocr-hwr.md#sn-hwr-010)); highlight-on-result search UX ([SN-SRCH-001](search.md#sn-srch-001)).

#### Acceptance criteria
- [ ] Importing a scanned (image-only) PDF makes its text searchable; a hit deep-links to the page and highlights the quad.
- [ ] A PDF with an existing text layer is indexed by extraction (no redundant OCR) and its quads map correctly.
- [ ] OCR/extraction runs off the UI isolate, is cancellable, shows progress, and fails into a retryable error (PRD-LB-361); scrolling a 600-page PDF stays at 60 fps during background OCR.
- [ ] A hostile/malformed PDF fails closed (no crash, no decompression bomb); parser fuzzing clean.
- [ ] All recognised PDF text is on-device by default and stored as note content.

#### Technical notes
`packages/sane_pdf` supplies `hasTextLayer`, per-page render, and text-with-quads extraction ([SN-PDF-002](pdf.md#sn-pdf-002), ADR-0014); `packages/sane_ml` drives OCR via [SN-HWR-010](ocr-hwr.md#sn-hwr-010) for image-only pages. Rows per PRD-LB-260/261 with source=pdf. Cap page render DPI and total work; process on a background isolate (overview §6). Coordinate with the PDF free-plan meter (PRD-LB) but OCR itself is free/on-device.

#### Security & privacy
PDFs are hostile input: validate, cap resources before decode, parse off the UI isolate, fail closed (MASVS-CODE-2, CWE-20/400). On-device by default (MASVS-PRIVACY-1); cloud OCR only per-request with the banner (OWASP-A03). Recognised text is note content: local, E2E-encryptable, never logged (MASVS-STORAGE-1).

#### UX notes
Surfaces in Search (design/Sane Notes.dc.html §11) and the in-note find (PRD-LB-264). A background "Making this PDF searchable…" progress affordance, cancellable (PRD-LB-361). `sane_ui` tokens, all looks/dark, AA. A11y: OCR'd PDF text becomes screen-reader-accessible and alt-text-capable ([SN-HWR-021](ocr-hwr.md#sn-hwr-021)).

#### Test plan
`packages/sane_ml/test/pdf_ocr_test.dart` (text-layer extraction vs OCR path, quad mapping), `packages/sane_pdf/test/fuzz/pdf_ocr_malformed_test.dart` (fail closed), `app/integration_test/pdf_search_deeplink_test.dart`.

#### Dependencies
SN-HWR-010 (OCR engines), SN-PDF-002 (PDF render/text extraction).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-012

<a id="sn-hwr-012"></a>

**Build shape recognition and beautification engine**

| Field | Value |
|---|---|
| GitHub | #277 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, shapes-diagrams |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-002](ocr-hwr.md#sn-hwr-002), [SN-INK-002](ink.md#sn-ink-002) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A03`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Drawing a rough shape and holding should snap it to a clean, still-editable form — line, circle, ellipse, triangle, square/rectangle, polygon, arrow (PRD-LB-308; resolves screens Open Q9's rectangle-only gap). Per docs/adr/0016-on-device-ml-and-ai.md decision 3 and ink-engine §9 the pipeline is: RDP simplify → `$P`/`$Q` recognizer (or ML Kit shape classifier as a mobile accelerator) for "which shape" → least-squares circle/ellipse (Taubin/Fitzgibbon) + corner-snapping for "make it perfect", with optional angle-snap to 0/45/90°. This issue delivers the `ShapeRecognizer` capability; the shape *tool* interaction/UX lives in [SN-SHP-001](shapes-diagrams.md#sn-shp-001).

#### Scope
**In:** the `ShapeRecognizer` in `packages/sane_ml` — RDP simplification, `$P`/`$Q` classification, least-squares fit for circle/ellipse, corner/vertex snapping, angle-snap; the recognised shape as editable geometry (vertices/handles) with stroke+fill retained; optional ML Kit shape-classifier acceleration on mobile; confidence output.
**Out:** the dwell-to-snap tool UX, rulers/connectors, and the shape palette ([SN-SHP-001](shapes-diagrams.md#sn-shp-001), PRD-ED shape set); hand-drawn table recognition (shape engine MAY, tracked elsewhere).

#### Acceptance criteria
- [ ] Rough drawings of each of line, circle, ellipse, triangle, square/rectangle, polygon, and arrow classify correctly on the fixture set (≥ the target accuracy in [SN-HWR-020](ocr-hwr.md#sn-hwr-020)).
- [ ] A recognised shape returns clean editable geometry (vertices/handles) preserving the stroke width, colour and fill; it remains editable, not a flattened image.
- [ ] Circle/ellipse fits use least-squares (Taubin/Fitzgibbon), not a bounding-box guess; near-axis angles snap to 0/45/90° when enabled.
- [ ] Recognition runs off the UI isolate and returns within a hold/dwell budget without dropping a writing frame.
- [ ] Everything is on-device; no network path.

#### Technical notes
`packages/sane_ml/lib/src/shapes/` (RDP, `$P`/`$Q`, least-squares fits) consuming `sane_ink` polylines ([SN-INK-002](ink.md#sn-ink-002)); optional native ML Kit shape classifier via `sane_ml_native`. Emits editable shape objects for `sane_core` (decision 4). Cross-references ink-engine §9 and PRD-LB-308. The tool that calls this (dwell timing, haptics on `pathCompleted`) is [SN-SHP-001](shapes-diagrams.md#sn-shp-001).

#### Security & privacy
Fully on-device (MASVS-PRIVACY-1); no egress (OWASP-A03). Bound iteration counts in RDP/`$Q` to avoid pathological CPU on adversarial stroke sets (CWE-400). No content logged.

#### UX notes
Backs the Shapes surface (design/Sane Notes.dc.html §7.3). Snapped shapes get semantic labels for screen readers; a haptic fires on recognition ([SN-SHP-001](shapes-diagrams.md#sn-shp-001)). Rendering via `sane_ui`/`sane_render` across all looks + dark. A11y: shape objects expose a description ("circle", "arrow").

#### Test plan
`packages/sane_ml/test/shape_recognizer_test.dart` (per-shape classification on fixtures, least-squares fit accuracy, angle-snap), golden of beautified shapes across looks, perf micro-benchmark for dwell budget.

#### Dependencies
SN-HWR-002 (registry), SN-INK-002 (stroke polylines). Tool UX in [SN-SHP-001](shapes-diagrams.md#sn-shp-001).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-013

<a id="sn-hwr-013"></a>

**Provide handwriting refine, straighten and reflow backing**

| Field | Value |
|---|---|
| GitHub | #278 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-ED-004](editor.md#sn-ed-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117` |
| Extra labels | agent-ready |

#### Context
Sane Notes offers Smart-Script-style clean-up on selected ink: **Refine** (smooth/straighten while preserving the writer's style), **Straighten** (level to baseline), and **Reflow/Reorganize** (adjust spacing / insert space so ink behaves like typed text) — all non-destructive, undoable, with ink kept as the source of truth (PRD-ED-187). The recognition/geometry backing for these actions lives in the recognition layer (prd-02 §11; ADR-0016 decision 5), because reflow needs word/line segmentation and baseline detection from the same engine that powers search and convert. This issue provides that backing (segmentation, baseline/slant estimation, spacing model) and the transform ops; the editor exposes the commands ([SN-ED-004](editor.md#sn-ed-004) selection, PRD-ED-187 UX).

#### Scope
**In:** word/line segmentation and baseline + x-height + slant estimation from selected strokes; a Refine transform (per-stroke smoothing preserving style), a Straighten transform (rotate/translate to level baseline), and a Reflow transform (re-space words/insert gaps) producing new stroke geometry as undoable ops; style-preservation guards.
**Out:** the editor command surfacing and toolbar (PRD-ED-187, [SN-ED-004](editor.md#sn-ed-004)); spellcheck ([SN-HWR-017](ocr-hwr.md#sn-hwr-017)); convert-to-text ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)).

#### Acceptance criteria
- [ ] Straighten levels a slanted line of handwriting to a horizontal baseline while preserving relative letter shapes; a single Undo restores the original strokes exactly.
- [ ] Reflow inserts/removes horizontal space between words so text can be reorganised like typed text, without distorting individual glyph strokes.
- [ ] Refine smooths jitter while keeping the writer's recognisable style (measured against a before/after golden set); it is non-destructive.
- [ ] All three transforms run off the UI isolate and are fully undoable via the op-log ([SN-ED-003](editor.md#sn-ed-003)); ink remains the source of truth.
- [ ] Entirely on-device; no network path.

#### Technical notes
`packages/sane_ml/lib/src/refine/` (segmentation, baseline/slant fit, spacing) reusing recognition bounds from [SN-HWR-003](ocr-hwr.md#sn-hwr-003); transforms emit `sane_core` stroke-edit ops (undoable, [SN-ED-003](editor.md#sn-ed-003)). Consumes selection from [SN-ED-004](editor.md#sn-ed-004). Backs PRD-ED-187; cross-refs Apple Smart Script, Samsung Straighten, Goodnotes Reorganization.

#### Security & privacy
On-device (MASVS-PRIVACY-1); transformed ink is note content, local + E2E-encryptable, never logged (MASVS-STORAGE-1, CWE-117). No cloud path (OWASP-A03). Original ink always recoverable via Undo (improves legibility, an a11y win).

#### UX notes
Commands live on the selection bar (design/Sane Notes.dc.html §7.4; PRD-ED-187) — Refine / Straighten / Reflow. Non-destructive with clear Undo; respect Reduce Motion on any animated reflow. `sane_ui` tokens across all looks + dark. A11y: transforms improve legibility; controls labelled and keyboard-operable.

#### Test plan
`packages/sane_ml/test/refine_reflow_test.dart` (baseline/slant fit, spacing, undo-restores-exact), golden `app/test/golden/handwriting_straighten_before_after_*`.

#### Dependencies
SN-HWR-003 (recognition bounds), SN-ED-004 (selection). Command UX PRD-ED-187 / [SN-ED-003](editor.md#sn-ed-003) undo.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-014

<a id="sn-hwr-014"></a>

**Add math recognition producing typeset expressions and LaTeX**

| Field | Value |
|---|---|
| GitHub | #279 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, text |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-002](ocr-hwr.md#sn-hwr-002), [SN-HWR-008](ocr-hwr.md#sn-hwr-008) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117`, `CWE-319` |
| Extra labels | agent-ready, needs-decision |

#### Context
Convert-to-math turns a lassoed equation into a typeset expression plus **editable LaTeX** (copyable, copy-as-image) — PRD-LB-306, PRD-ED-112. Per docs/adr/0016-on-device-ml-and-ai.md decision 3 the on-device engines are **Apple Math Notes** (OS 26) or **MyScript Math** on Apple and **MyScript Math** on Android, with **Mathpix** as an explicit cloud opt-in for hard/printed/chemistry content; there is no local math engine on Web (cloud opt-in only). This issue delivers the `MathRecognizer` capability and its LaTeX output, reusing the confidence/correction UX ([SN-HWR-008](ocr-hwr.md#sn-hwr-008)); the render target (typeset/MathML block) is PRD-ED-112 and the solve step is [SN-HWR-015](ocr-hwr.md#sn-hwr-015).

#### Scope
**In:** the `MathRecognizer` returning a typeset expression + LaTeX + confidence; Apple Math Notes / MyScript Math on-device adapters; the Mathpix cloud adapter behind the per-request opt-in ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)); LaTeX edit + copy-as-image; per-notebook math language/notation where supported.
**Out:** the solve/worked-steps engine ([SN-HWR-015](ocr-hwr.md#sn-hwr-015)); the typeset render widget/MathML a11y (PRD-ED-112, editor); equation graphing (backlog, PRD-CO-163).

#### Acceptance criteria
- [ ] Lassoing a handwritten equation returns a typeset expression and valid, editable LaTeX; editing the LaTeX re-renders the typeset form.
- [ ] On-device engine is used by default (Apple Math Notes/MyScript); Mathpix is used only after the per-request data-leaves-device banner is confirmed ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)).
- [ ] Low-confidence recognition surfaces the correction UX ([SN-HWR-008](ocr-hwr.md#sn-hwr-008)) rather than a silent wrong answer.
- [ ] Copy-as-image and copy-LaTeX both work; the original ink is preserved.
- [ ] Web with no local engine reports unavailable and offers cloud opt-in (never silent).

#### Technical notes
`packages/sane_ml` `MathRecognizer`; `plugins/sane_ml_native` Apple Math Notes / MyScript Math bindings; Mathpix via the cloud adapter (opt-in, [SN-HWR-019](ocr-hwr.md#sn-hwr-019)). LaTeX rendered by the editor target (PRD-ED-112). **needs-decision:** MyScript vs ML-Kit-only overall recognition posture is a maintainer gate before M4 (CLAUDE.md §13, PRD-02 §17 Q5) — implement behind the interface so either resolves; MyScript's 30-day-connectivity licence caveat is a documented vendor risk (ADR-0016 decision 9). Record engines/licences in the SBOM.

#### Security & privacy
On-device by default (MASVS-PRIVACY-1); Mathpix is a per-request cloud opt-in with the banner over TLS (MASVS-NETWORK-1, OWASP-A03, CWE-319) — never a silent fallback. Recognised math/LaTeX is note content: local, E2E-encryptable, never logged (MASVS-STORAGE-1, CWE-117).

#### UX notes
Selection bar "Convert to math" and the typeset result (design/Sane Notes.dc.html §7.4). Confidence/correction from [SN-HWR-008](ocr-hwr.md#sn-hwr-008). A11y (mandatory): expose a text/MathML representation, not an image (PRD-ED-112). `sane_ui` tokens across all looks + dark; copy actions labelled.

#### Test plan
`packages/sane_ml/test/math_recognizer_test.dart` (mock → LaTeX round-trip, confidence), `app/test/editor/math_convert_test.dart` (typeset render, copy-as-image, cloud-opt-in gate), fixtures in [SN-HWR-020](ocr-hwr.md#sn-hwr-020).

#### Dependencies
SN-HWR-002 (registry), SN-HWR-008 (correction UX). Cloud path [SN-HWR-019](ocr-hwr.md#sn-hwr-019); solve [SN-HWR-015](ocr-hwr.md#sn-hwr-015); render PRD-ED-112.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-015

<a id="sn-hwr-015"></a>

**Implement worked step-by-step math solving (Pro-gated)**

| Field | Value |
|---|---|
| GitHub | #280 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, text |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-014](ocr-hwr.md#sn-hwr-014) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
The mock's "Solve math" returns a canned string (screens Open Q8); PRD-LB-307 requires a real, Pro-gated solver that writes a **worked, step-by-step** solution under the ink, with live variable substitution where supported, covering arithmetic, algebra (linear/quadratic/cubic/quartic, systems), factorisation/expansion, trig, calculus (limits/derivatives/integrals), and matrices — and it must surface confidence and an error/low-confidence state, never a silent canned answer. It builds on the recognised expression/LaTeX from [SN-HWR-014](ocr-hwr.md#sn-hwr-014) and produces steps via an on-device computer-algebra approach by default (ADR-0016 decision 6–7: on-device first, cloud only per-request opt-in). Free users hit the Upgrade overlay (PRD-ED-112, PRD-02 §14).

#### Scope
**In:** a solver taking recognised LaTeX/expression → a structured, ordered list of solution steps + final result; coverage of the listed domains; confidence + explicit error/low-confidence state; "write the worked solution under the ink" rendering hand-off; Pro gate + Upgrade overlay; optional cloud escalation for hard cases via [SN-HWR-019](ocr-hwr.md#sn-hwr-019).
**Out:** the recognition/LaTeX step ([SN-HWR-014](ocr-hwr.md#sn-hwr-014)); equation graphing (backlog PRD-CO-163); the render widget details (editor).

#### Acceptance criteria
- [ ] Solving a quadratic returns ordered, human-readable steps and the correct roots; a definite integral returns steps and the correct value — validated against a fixture suite across all listed domains.
- [ ] Unsupported or ambiguous input shows an explicit low-confidence/error state ("Couldn't solve this reliably") — never a fabricated or silently-wrong answer.
- [ ] Free users see the Upgrade overlay; Pro users get the solution; entitlement via [SN-BILL-001](billing.md#sn-bill-001).
- [ ] Solving runs off the UI isolate and is on-device by default; any cloud solve requires the per-request banner ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)).
- [ ] The worked solution is inserted as editable content beneath the source ink, which is preserved.

#### Technical notes
`packages/sane_ml/lib/src/math/solver.dart` — a symbolic engine (CAS) evaluating the recognised expression from [SN-HWR-014](ocr-hwr.md#sn-hwr-014); bound recursion/step counts (CWE-400). Steps rendered by the editor target (PRD-ED-112). Free/Pro via `sane_billing` ([SN-BILL-001](billing.md#sn-bill-001)). **Engine choice** is an on-device CAS by default with a documented cloud-LLM/Mathpix escalation for hard cases (ADR-0016 decision 7); record any library in the SBOM. Cover the domains in PRD-LB-307. Ships without SN-BILL-001: the Pro gate consumes the `EntitlementProvider` contract ([SN-BILL-012](billing.md#sn-bill-012)) with a permissive stub until billing lands in M8.

#### Security & privacy
On-device by default (MASVS-PRIVACY-1); cloud solve only per-request with the banner (OWASP-A03). Expressions/solutions are note content: local, E2E-encryptable, never logged (MASVS-STORAGE-1, CWE-117). Bound solver work to avoid CPU exhaustion on adversarial input (CWE-400). Never present a fabricated answer as authoritative.

#### UX notes
Selection bar "Solve math" (design/Sane Notes.dc.html §7.4; §14 Upgrade overlay for Free). States: solving / worked-solution / low-confidence-error / Free-upgrade. `sane_ui` tokens across all looks + dark; steps are selectable text. A11y: steps are real text (screen-reader-readable), not an image; controls labelled.

#### Test plan
`packages/sane_ml/test/math_solver_test.dart` (per-domain fixtures: algebra/trig/calculus/matrices; correct results + step ordering; error state), `app/test/editor/solve_math_gate_test.dart` (Free overlay, Pro path), golden of a worked solution across looks.

#### Dependencies
[SN-HWR-014](ocr-hwr.md#sn-hwr-014) (recognised expression/LaTeX). The Pro gate reads the `sane_billing` EntitlementProvider contract ([SN-BILL-012](billing.md#sn-bill-012)); a permissive stub (fail-open) stands in until billing ships in M8, so SN-BILL-001 is not a scheduling blocker. Cloud escalation [SN-HWR-019](ocr-hwr.md#sn-hwr-019); render PRD-ED-112.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-016

<a id="sn-hwr-016"></a>

**Add a custom recognition dictionary (per-profile, language-scoped)**

| Field | Value |
|---|---|
| GitHub | #281 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-HWR-008](ocr-hwr.md#sn-hwr-008) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117` |
| Extra labels | agent-ready, good first issue |

#### Context
Recognition accuracy improves and false spell-flags drop when users can add their own words and abbreviations — names, jargon, course codes. PRD-LB-386 requires a **custom recognition dictionary**: per-profile and language-scoped, à la Goodnotes Personal Dictionary and Nebo custom dictionary. The dictionary feeds the recognizer as context ([SN-HWR-003](ocr-hwr.md#sn-hwr-003) pre-context / MyScript lexicon) and suppresses spellcheck false positives ([SN-HWR-017](ocr-hwr.md#sn-hwr-017)); it is also populated by "report mis-recognition" corrections from [SN-HWR-008](ocr-hwr.md#sn-hwr-008). Everything stays on-device (decision 6).

#### Scope
**In:** a `CustomDictionary` store (per-profile, per-language) in `sane_core`/drift; add/edit/delete entries; import corrections from [SN-HWR-008](ocr-hwr.md#sn-hwr-008); feed entries as recognition context/lexicon; a Settings → Recognition dictionary screen; export/clear.
**Out:** spellcheck itself ([SN-HWR-017](ocr-hwr.md#sn-hwr-017)); the recognizer internals ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)); sync of the dictionary (rides normal CRDT sync, [SN-SYNC-001](sync.md#sn-sync-001)).

#### Acceptance criteria
- [ ] Adding a word to the dictionary makes the recognizer prefer it on the fixture set (measurable improvement) and stops spellcheck flagging it.
- [ ] Entries are per-profile and language-scoped; switching profile/notebook language shows the correct set.
- [ ] Corrections reported via [SN-HWR-008](ocr-hwr.md#sn-hwr-008) appear as suggested dictionary additions.
- [ ] The Settings screen supports add/edit/delete/clear; entries persist and survive restart; no network call is made.
- [ ] Dictionary content is deletable (data-minimisation) and never logged.

#### Technical notes
`packages/sane_ml` dictionary model + `sane_core`/drift persistence (per-profile isolation, PRD-LB-350). Fed into [SN-HWR-003](ocr-hwr.md#sn-hwr-003) via `RecognitionContext`/pre-context and, for MyScript, its lexicon API. Settings screen in `app/` with `sane_ui`. PRD-LB-386. Good first issue: self-contained CRUD + wiring.

#### Security & privacy
Dictionary is note-adjacent personal data: on-device only (MASVS-PRIVACY-1), erasable (MASVS-PRIVACY-4), local + E2E-encryptable on sync (MASVS-STORAGE-1), never logged (CWE-117). No cloud path (OWASP-A03).

#### UX notes
Settings → Recognition dictionary (docs/design/screens-and-flows.md §12 recognition settings). Add/edit sheet; suggested additions from corrections; empty state "Add words we should always recognise". `sane_ui` tokens across all 17 looks + dark; 44pt/48dp targets; VoiceOver/TalkBack labels; keyboard-reachable on web.

#### Test plan
`packages/sane_ml/test/custom_dictionary_test.dart` (CRUD, per-profile/language scoping, correction import), `app/test/settings/dictionary_screen_test.dart` (widget), golden across looks.

#### Dependencies
SN-HWR-003 (recognizer context), SN-HWR-008 (correction pairs).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-017

<a id="sn-hwr-017"></a>

**Add handwriting spellcheck that preserves the writer's style**

| Field | Value |
|---|---|
| GitHub | #282 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-006](ocr-hwr.md#sn-hwr-006), [SN-HWR-016](ocr-hwr.md#sn-hwr-016) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117` |
| Extra labels | agent-ready |

#### Context
Sane Notes flags likely misspellings **in ink** and, on tap, corrects them **while preserving the writer's handwriting style** — PRD-LB-387 (Goodnotes Spellcheck; Apple Smart Script correct-spelling; Samsung spell/grammar). It uses the recognised text from background recognition ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)) to detect misspellings, honours the custom dictionary ([SN-HWR-016](ocr-hwr.md#sn-hwr-016)) to avoid false positives, and applies style-preserving glyph correction via the refine backing ([SN-HWR-013](ocr-hwr.md#sn-hwr-013)). It is per-notebook language, disable-able, and on-device by default (decision 6).

#### Scope
**In:** misspelling detection over recognised handwriting (per-notebook language); an unobtrusive in-ink flag (non-colour-only); a correction affordance that rewrites the word preserving the writer's style (via [SN-HWR-013](ocr-hwr.md#sn-hwr-013) glyph synthesis/reflow); dictionary-aware suppression ([SN-HWR-016](ocr-hwr.md#sn-hwr-016)); a per-notebook enable/disable toggle.
**Out:** typed-text spellcheck (OS-provided); grammar suggestions (future); the recognition engine ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)).

#### Acceptance criteria
- [ ] A misspelled handwritten word is flagged with a non-colour-only cue; a word in the custom dictionary is never flagged.
- [ ] Tapping the flag offers correction(s); accepting rewrites the ink preserving the writer's style; a single Undo restores the original ink.
- [ ] Spellcheck honours the per-notebook recognition language and can be disabled per notebook; off by default where it risks false positives during dense writing.
- [ ] Detection runs off the UI isolate; it never blocks writing.
- [ ] Entirely on-device; no network path.

#### Technical notes
`packages/sane_ml` spellcheck over [SN-HWR-006](ocr-hwr.md#sn-hwr-006) recognised text; correction rendering via [SN-HWR-013](ocr-hwr.md#sn-hwr-013) style-preserving transform; suppression from [SN-HWR-016](ocr-hwr.md#sn-hwr-016). Per-notebook language + toggle in settings. PRD-LB-387; cross-refs Apple Smart Script, Samsung, Goodnotes.

#### Security & privacy
On-device (MASVS-PRIVACY-1); recognised text and corrections are note content — local + E2E-encryptable, never logged (MASVS-STORAGE-1, CWE-117). No cloud path (OWASP-A03). Original ink always recoverable via Undo.

#### UX notes
In-ink flag + correction sheet (docs/design/screens-and-flows.md §12 recognition; PRD-ED-187 clean-up family). Non-colour-only cue; corrections keep handwriting style. `sane_ui` tokens across all looks + dark; Reduce Motion respected. A11y (mandatory): flags and corrections are labelled, keyboard-operable, never colour-only; correcting also improves OCR alt-text.

#### Test plan
`packages/sane_ml/test/handwriting_spellcheck_test.dart` (detection, dictionary suppression, per-language, undo-restores-ink), golden `app/test/golden/spellcheck_flag_*` across looks.

#### Dependencies
SN-HWR-006 (recognised text), SN-HWR-016 (dictionary suppression). Correction rendering [SN-HWR-013](ocr-hwr.md#sn-hwr-013).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-018

<a id="sn-hwr-018"></a>

**Surface data detectors over recognised handwriting and text**

| Field | Value |
|---|---|
| GitHub | #283 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, text |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-006](ocr-hwr.md#sn-hwr-006) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-3`, `OWASP-A03`, `OWASP-A01`, `CWE-601`, `CWE-117` |
| Extra labels | agent-ready |

#### Context
Recognised handwriting and typed text should surface actionable phone numbers, emails, URLs and dates — tap to call/mail/open/schedule — on-device, à la Samsung Action icons (PRD-LB-388). Detection runs over the recognised-text output of background recognition ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)); URLs are sanitised per PRD-ED-108 and a tap lands in a view/confirm context, never auto-acting, per the app's deep-link/egress safety rules (CLAUDE.md §7.8). This is a MAY-level convenience that must not become an exfiltration or open-redirect vector.

#### Scope
**In:** on-device detectors for phone/email/URL/date over recognised + typed text; a subtle action affordance on the detected span; safe actions (call/mail/open-in-browser/create-reminder) each requiring an explicit tap and confirmation; URL sanitisation; a per-notebook toggle.
**Out:** the recognition itself ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)); reminders/calendar integration internals ([SN-NOTF-001](notifications.md#sn-notf-001)); web clipper (PRD-LB-390).

#### Acceptance criteria
- [ ] A handwritten phone number/email/URL/date is detected and offers the matching action; tapping requires a confirm and never auto-executes.
- [ ] A malicious or obfuscated URL is sanitised and shown in full before the user confirms opening; no auto-navigation, no beacon.
- [ ] Detection is on-device with no network call; the feature is per-notebook toggleable and off where it causes noise.
- [ ] Detected spans are labelled for screen readers and keyboard-operable.
- [ ] No detected value is logged.

#### Technical notes
`packages/sane_ml` detectors over [SN-HWR-006](ocr-hwr.md#sn-hwr-006) text (regex + locale-aware date parsing); URL sanitisation shared with PRD-ED-108; actions dispatched through safe intent handlers (view/confirm) in `app/`. Reminder creation defers to [SN-NOTF-001](notifications.md#sn-notf-001). PRD-LB-388; Samsung Action icons.

#### Security & privacy
Detection on-device only (MASVS-PRIVACY-1); a tap lands in view/confirm and never auto-mutates or auto-navigates (OWASP-A01, MASVS-PLATFORM-3). URLs sanitised to prevent open-redirect/scheme abuse (CWE-601). No network egress from detection (OWASP-A03); detected PII never logged (CWE-117).

#### UX notes
Subtle underline/affordance on detected spans (docs/design/screens-and-flows.md §12; Samsung Action icons parity). Confirm sheet before any action; `sane_ui` tokens across all looks + dark. A11y: spans announce type + value; actions are labelled controls, keyboard-operable, never colour-only.

#### Test plan
`packages/sane_ml/test/data_detectors_test.dart` (phone/email/URL/date detection, locale dates), `app/test/editor/data_detector_action_test.dart` (confirm-before-act, URL sanitisation, no auto-nav), abuse test for a hostile URL.

#### Dependencies
SN-HWR-006 (recognised text). Actions/reminders via [SN-NOTF-001](notifications.md#sn-notf-001); URL rules PRD-ED-108.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-019

<a id="sn-hwr-019"></a>

**Gate cloud recognition behind per-request opt-in with a leave-device banner**

| Field | Value |
|---|---|
| GitHub | #284 |
| Type | security |
| Priority | p0 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-002](ocr-hwr.md#sn-hwr-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-NETWORK-1`, `OWASP-A03`, `OWASP-A01`, `CWE-319`, `CWE-117`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
Locked decision 6 and docs/adr/0016-on-device-ml-and-ai.md decision 7 are absolute: any cloud recognition path (Mathpix, high-accuracy cloud OCR/translate, a large cloud LLM) is a **per-request opt-in — never a global always-on toggle, never a silent fallback — with a visible data-leaves-device banner stating exactly what is sent and to whom**. `SANE_AI_CLOUD_ENABLED` is a master gate (default false) and even when enabled each use still prompts. This is the single chokepoint every cloud-capable recognition adapter ([SN-HWR-010](ocr-hwr.md#sn-hwr-010), [SN-HWR-014](ocr-hwr.md#sn-hwr-014), [SN-HWR-015](ocr-hwr.md#sn-hwr-015), [SN-HWR-022](ocr-hwr.md#sn-hwr-022), web [SN-HWR-005](ocr-hwr.md#sn-hwr-005)) must route through. Because a mistake here leaks note content off-device, this is p0/security-critical.

#### Scope
**In:** a `CloudEscalation` gate that (1) checks the `SANE_AI_CLOUD_ENABLED` master flag, (2) requires an explicit per-request opt-in, (3) shows the data-leaves-device banner naming the service + the exact data + destination, (4) proceeds only on confirm, (5) enforces TLS + records the egress; a reusable banner/consent widget; a test asserting no cloud call fires without opt-in.
**Out:** the individual cloud adapters' payload building (their own issues); the global privacy dashboard ([SN-PRV-001](privacy.md#sn-prv-001)); telemetry ([SN-TEL-001](telemetry.md#sn-tel-001)).

#### Acceptance criteria
- [ ] With `SANE_AI_CLOUD_ENABLED=false` (default) no cloud recognition path is reachable; the gate returns `unavailable` and offers on-device or nothing.
- [ ] With the flag enabled, every cloud use still shows the banner (service + data + destination) and proceeds only on explicit confirm; declining does nothing.
- [ ] A unit/integration test asserts **no cloud call fires without an explicit opt-in** (regression guard for decision 6).
- [ ] The banner states exactly what leaves the device (e.g. "This equation image is sent to Mathpix to recognise it") and the request goes over TLS only.
- [ ] The opt-in is per-request, not remembered as a global always-on setting.

#### Technical notes
`packages/sane_ml/lib/src/cloud_escalation.dart` (gate + `Result`), banner widget in `sane_ui`/`app/`. Master flag via `--dart-define=SANE_AI_CLOUD_ENABLED` (overview §7.1). Every cloud adapter calls the gate before any network I/O; enforce TLS 1.2+ (and pinning for first-party endpoints). Mirror Apple Private Cloud Compute semantics for first-party escalation: ephemeral, per-request-scoped, no training (ADR-0016 decision 7). Register egress in the PR threat-model row (CLAUDE.md §7.4).

#### Security & privacy
The core privacy control (MASVS-PRIVACY-1/2, LINDDUN, decision 6). No silent cloud fallback (OWASP-A03); explicit consent before egress (OWASP-A01 broken access to the network boundary); TLS only, no cleartext (MASVS-NETWORK-1, CWE-319); the banner prevents unaware disclosure (CWE-200); never log the sent payload or tokens (CWE-117). New egress requires an ADR + threat-model row (CLAUDE.md §7.4).

#### UX notes
The data-leaves-device banner (docs/design/screens-and-flows.md §12 on-device recognition; ADR-0016 decision 7) — a modal/inline consent naming service + data + destination, with Send / Cancel. `sane_ui` tokens across all 17 looks + dark; 44pt/48dp targets; VoiceOver/TalkBack announce the disclosure; keyboard-reachable on web. Never dark-pattern the consent (Cancel is equal weight).

#### Test plan
`packages/sane_ml/test/cloud_escalation_test.dart` (master-flag off = unreachable; on = prompts; decline = no-op), `app/integration_test/no_cloud_without_optin_test.dart` (asserts zero egress without opt-in), golden of the banner across looks.

#### Dependencies
SN-HWR-002 (registry routes cloud engines through this gate). Used by [SN-HWR-005](ocr-hwr.md#sn-hwr-005)/[SN-HWR-010](ocr-hwr.md#sn-hwr-010)/[SN-HWR-014](ocr-hwr.md#sn-hwr-014)/[SN-HWR-015](ocr-hwr.md#sn-hwr-015)/[SN-HWR-022](ocr-hwr.md#sn-hwr-022).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-020

<a id="sn-hwr-020"></a>

**Build recognition accuracy evaluation datasets and test harness**

| Field | Value |
|---|---|
| GitHub | #285 |
| Type | test |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | ocr-hwr, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-HWR-010](ocr-hwr.md#sn-hwr-010), [SN-HWR-012](ocr-hwr.md#sn-hwr-012) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `OWASP-A03`, `CWE-117` |
| Extra labels | agent-ready |

#### Context
Recognition quality is a headline promise ("covers the broadest available set on every platform", PRD-LB-303/371), so it must be measurable and regression-guarded, not vibes. ADR-0016 "How to verify" calls for provable on-device resolution and correct results; this issue builds the shared **accuracy evaluation datasets + harness** that every recognition adapter ([SN-HWR-003](ocr-hwr.md#sn-hwr-003), [SN-HWR-010](ocr-hwr.md#sn-hwr-010), [SN-HWR-011](ocr-hwr.md#sn-hwr-011), [SN-HWR-012](ocr-hwr.md#sn-hwr-012), [SN-HWR-014](ocr-hwr.md#sn-hwr-014)) reports against, producing CER/WER for text, IoU/accuracy for shapes, and exact-match for math/LaTeX. It gives CI a threshold to fail on and a way to compare on-device vs cloud without shipping regressions or platform disparities.

#### Scope
**In:** `tools/recognition_eval/` with curated, licence-clean datasets (multi-script handwriting samples, printed/scanned image OCR, shape samples, handwritten-math→LaTeX pairs); metrics (CER/WER, shape classification accuracy + fit error, math exact-match); a runner that evaluates any registered engine via the [SN-HWR-002](ocr-hwr.md#sn-hwr-002) interfaces (real or mock); per-language and per-platform breakdown; CI thresholds.
**Out:** the engines themselves; on-device-device-lab runs ([SN-PERF-004](perf.md#sn-perf-004)); collecting user data for training (explicitly not done).

#### Acceptance criteria
- [ ] Running the harness against the mock suite yields deterministic CER/WER, shape accuracy, and math exact-match numbers.
- [ ] The harness evaluates any engine that implements the [SN-HWR-002](ocr-hwr.md#sn-hwr-002) interfaces and reports per-language + per-platform breakdowns.
- [ ] CI fails if a recognition change regresses a metric below its threshold on the fixture set.
- [ ] Datasets are licence-clean and committed (or fetched from a pinned, integrity-checked source); no user note content is used.
- [ ] A report artifact (CSV/JSON) is produced for each run.

#### Technical notes
`tools/recognition_eval/` (Dart, headless) driving `packages/sane_ml` interfaces; metrics implemented in-tree. Fixtures under `tools/recognition_eval/data/` with provenance + licence recorded (ADR-0016 decision 9; SBOM). Wire a CI job to the DevSecOps pipeline ([SN-CI-001](ci-cd.md#sn-ci-001)). Uses `MockRecognizerSuite` ([SN-HWR-002](ocr-hwr.md#sn-hwr-002)) for deterministic CI and optionally real engines in a device-lab job ([SN-PERF-004](perf.md#sn-perf-004)).

#### Security & privacy
Evaluation uses only licence-clean fixtures, never user note content (MASVS-PRIVACY-3 data-minimisation; decision: no training on user data). On-device evaluation, no egress (MASVS-PRIVACY-1, OWASP-A03). Report artifacts contain metrics only, no content, and are not logged with PII (CWE-117).

#### UX notes
None beyond baseline (developer tooling): no note content or tokens are logged; the report shows metrics only. No end-user UI.

#### Test plan
`tools/recognition_eval/test/metrics_test.dart` (CER/WER/IoU/exact-match correctness), `tools/recognition_eval/test/runner_test.dart` (mock-engine end-to-end), and the CI threshold job wired in [SN-CI-001](ci-cd.md#sn-ci-001).

#### Dependencies
SN-HWR-003 / SN-HWR-010 / SN-HWR-012 (engines to evaluate). CI wiring [SN-CI-001](ci-cd.md#sn-ci-001); device-lab [SN-PERF-004](perf.md#sn-perf-004).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-021

<a id="sn-hwr-021"></a>

**Provide OCR-backed alt-text and accessibility for handwritten content**

| Field | Value |
|---|---|
| GitHub | #724 |
| Type | task |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | ocr-hwr, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-HWR-006](ocr-hwr.md#sn-hwr-006) |
| Depends on | [SN-HWR-006](ocr-hwr.md#sn-hwr-006), [SN-HWR-010](ocr-hwr.md#sn-hwr-010) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-117` |
| Extra labels | agent-ready, good first issue |

#### Context
Accessibility is a locked decision (10): handwritten and scanned content must be readable by screen readers via OCR-backed alt-text (PRD-LB-370; CLAUDE.md §9). Recognised text from background handwriting recognition ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)) and image/PDF OCR ([SN-HWR-010](ocr-hwr.md#sn-hwr-010)/[SN-HWR-011](ocr-hwr.md#sn-hwr-011)) already exists; this issue exposes it as `Semantics` descriptions on the corresponding on-page objects so VoiceOver/TalkBack read "handwritten: <recognised text>" and image/scan alt-text reflects OCR output. It is a small, high-value wiring task that turns recognition into a first-class a11y feature.

#### Scope
**In:** `Semantics` labels on ink regions (from the [SN-HWR-006](ocr-hwr.md#sn-hwr-006) stroke↔text map), images, and PDF pages using recognised text; a graceful fallback label when recognition is unavailable/low-confidence; respecting the On-device recognition toggle; ensuring reading order is sensible.
**Out:** the recognition itself ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)/[SN-HWR-010](ocr-hwr.md#sn-hwr-010)); the broader a11y audit ([SN-A11Y-001](a11y.md#sn-a11y-001)); convert-to-text ([SN-HWR-007](ocr-hwr.md#sn-hwr-007)).

#### Acceptance criteria
- [ ] VoiceOver/TalkBack read recognised handwriting on a page as text ("handwritten: …") in a sensible reading order.
- [ ] An imported image/scan exposes OCR-derived alt-text; a PDF page exposes its recognised text to the screen reader.
- [ ] When recognition is off/unavailable, a clear fallback label is used (never an empty or misleading label).
- [ ] Labels update when recognition re-runs after edits.
- [ ] No recognised text is logged.

#### Technical notes
`app/` widget layer adds `Semantics(label: ...)` sourced from the [SN-HWR-006](ocr-hwr.md#sn-hwr-006) map and [SN-HWR-010](ocr-hwr.md#sn-hwr-010)/[SN-HWR-011](ocr-hwr.md#sn-hwr-011) OCR rows; gate on the On-device recognition toggle. Follows docs/design/accessibility.md and PRD-LB-370. Small, self-contained (good first issue).

#### Security & privacy
Recognised text used for labels is note content: on-device (MASVS-PRIVACY-1), local + E2E-encryptable (MASVS-STORAGE-1), never logged (CWE-117). No cloud path (OWASP-A03).

#### UX notes
No visible chrome change; screen-reader behaviour per docs/design/accessibility.md. Reading order top-to-bottom then z-order (PRD-ED reading order). Works across all looks + dark (semantics are theme-independent but verify contrast of any visible focus ring via `sane_ui`). A11y is the entire point: labels, 44pt/48dp focusable targets, correct roles.

#### Test plan
`app/test/a11y/handwriting_semantics_test.dart` (Semantics labels present + correct text + reading order), `app/test/a11y/image_pdf_alt_text_test.dart`.

#### Dependencies
SN-HWR-006 (stroke↔text map), SN-HWR-010 (image OCR). Part of [SN-A11Y-001](a11y.md#sn-a11y-001).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-HWR-022

<a id="sn-hwr-022"></a>

**Add whole-document translation for pages and PDFs**

| Field | Value |
|---|---|
| GitHub | #286 |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | ocr-hwr, i18n |
| Size | L |
| SDLC | implementation |
| Parent | [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Depends on | [SN-HWR-010](ocr-hwr.md#sn-hwr-010), [SN-HWR-019](ocr-hwr.md#sn-hwr-019) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `MASVS-STORAGE-1`, `OWASP-A03`, `CWE-319`, `CWE-117` |
| Extra labels | agent-ready |

#### Context
Users translate a whole page or PDF (typed + OCR'd text) into a chosen language, shown as an overlay or side view and **preserving the original** — PRD-LB-392 (Samsung PDF translation; Nebo). Per docs/adr/0016-on-device-ml-and-ai.md decision 3 the default engine is **Apple Translation / ML Kit Translation** on-device (50+ languages, pivots via English), with a cloud translate path only as an explicit per-request opt-in ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)). It builds on OCR ([SN-HWR-010](ocr-hwr.md#sn-hwr-010)/[SN-HWR-011](ocr-hwr.md#sn-hwr-011)) for image/scanned content and never mutates the source (note-content translation as a Sage feature is prd-04 PRD-CO-156). Scheduled M6 alongside the translation/Sage surface, but the recognition backing is reused from M3.

#### Scope
**In:** the `Translator` capability over ML Kit / Apple Translation (on-device); whole-page and whole-PDF translation combining typed text + OCR text; an overlay/side-by-side presentation preserving the original; per-target-language selection; cloud translate behind the per-request banner ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)); on-demand language-pack download via [SN-HWR-004](ocr-hwr.md#sn-hwr-004).
**Out:** note-content Sage translation (prd-04 PRD-CO-156); the OCR engines ([SN-HWR-010](ocr-hwr.md#sn-hwr-010)/[SN-HWR-011](ocr-hwr.md#sn-hwr-011)); UI framework of the side-view (editor/PDF viewer).

#### Acceptance criteria
- [ ] Translating a page/PDF produces target-language text shown as an overlay or side view; the original is untouched and toggle-able.
- [ ] Translation is on-device by default (ML Kit/Apple Translation); packs download via [SN-HWR-004](ocr-hwr.md#sn-hwr-004); airplane-mode works once packs are present.
- [ ] Cloud translate is only used after the per-request banner ([SN-HWR-019](ocr-hwr.md#sn-hwr-019)); never a silent fallback.
- [ ] OCR'd (scanned) content is translatable via [SN-HWR-010](ocr-hwr.md#sn-hwr-010)/[SN-HWR-011](ocr-hwr.md#sn-hwr-011); typed text is translated directly.
- [ ] Translation runs off the UI isolate, is cancellable, and fails into a retryable state (PRD-LB-361).

#### Technical notes
`packages/sane_ml` `Translator` over ML Kit Translation (pivots via English) / Apple Translation; combines typed text + OCR rows ([SN-HWR-010](ocr-hwr.md#sn-hwr-010)/[SN-HWR-011](ocr-hwr.md#sn-hwr-011)); packs via [SN-HWR-004](ocr-hwr.md#sn-hwr-004); cloud via [SN-HWR-019](ocr-hwr.md#sn-hwr-019). Presentation hand-off to the editor/PDF viewer. PRD-LB-392; cross-ref prd-04 §4 (PRD-CO-156). RTL targets (Arabic) render correctly (PRD-LB-371).

#### Security & privacy
On-device by default (MASVS-PRIVACY-1); cloud translate only per-request over TLS with the banner (MASVS-NETWORK-1, OWASP-A03, CWE-319). Translations are note content: local + E2E-encryptable, never logged (MASVS-STORAGE-1, CWE-117). Original preserved (integrity).

#### UX notes
Overlay / side-by-side view (docs/design/screens-and-flows.md §12; Samsung PDF-translation parity) with a language picker and an original/translated toggle. RTL layouts correct for Arabic. `sane_ui` tokens across all 17 looks + dark; 44pt/48dp targets; VoiceOver/TalkBack labels; keyboard-reachable on web. Progress + cancel per PRD-LB-361.

#### Test plan
`packages/sane_ml/test/translator_test.dart` (mock translate, typed+OCR combine, pack-missing), `app/test/editor/document_translation_test.dart` (overlay/side view, original preserved, cloud-opt-in gate), RTL golden.

#### Dependencies
SN-HWR-010 (OCR), SN-HWR-019 (cloud gate). Packs [SN-HWR-004](ocr-hwr.md#sn-hwr-004); Sage translation prd-04 PRD-CO-156.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/adr/0016-on-device-ml-and-ai.md, docs/product/prd-02-library-documents-audio-search.md §11)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, prompts, transcripts, or recognised text in logs

---

### SN-IPAD-008

<a id="sn-ipad-008"></a>

**Implement Scribble handwriting-to-text in text fields via sane_scribble**

| Field | Value |
|---|---|
| GitHub | #309 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | ocr-hwr, input-gestures, text |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
iPadOS gives Scribble (handwriting into text fields) for free, and Sane Notes should let users write into the note title, search bar and text boxes with the Pencil (docs/platform/ipad.md §6/§7; docs/design/gestures-and-shortcuts.md §3.6). Crucially the canvas ink path and the Scribble text-field path are SEPARATE — Scribble strokes never become canvas ink, and Scribble is not scriptable beyond enable/suppress. Implements PRD-ED-110 (Scribble/write-to-text into text fields). Because Flutter paints its own text (limitation L2), first-class fields SHOULD use a native text-input platform view.

#### Scope
**In:** `plugins/sane_scribble` platform-interface + Swift impl: `setScribbleEnabled(enabled, fieldBounds)`, `registerWriteAnywhere(writableElements)` via `UIIndirectScribbleInteraction`, and a `recognizedText` stream; suppress Scribble over the drawing surface so the pen inks there; enable it for the title/search/text-box fields.
**Out:** canvas handwriting recognition/convert-to-text (SN-OCR/SN-ED-086); Android/web handwriting entry.

#### Acceptance criteria
- [ ] Writing with the Pencil over the note-title / search / a text box inserts recognised text into that field; recognised text arrives as normal text input, not canvas ink.
- [ ] Scribble is suppressed over the canvas so a pen stroke there draws, never types (separate input paths).
- [ ] Write-anywhere regions registered via `UIIndirectScribbleInteraction` accept handwriting; unsupported languages degrade to the on-screen keyboard.
- [ ] No attempt is made to build a recognizer from Scribble strokes (docs/platform/ipad.md §6 limitation).

#### Technical notes
Swift `UIScribbleInteraction` (enable/suppress per field) + `UIIndirectScribbleInteraction` (custom regions), per docs/platform/ipad.md §3/§6. Prefer a native text-input platform view for the few first-class fields (L2). Interface sketch `SaneScribblePlatform` in docs/platform/ipad.md §6. Consumed by `app/editor` text entry.

#### Security & privacy
Recognised text is user content entering a field — treat as untrusted input, validate/escape before use in search or persistence (MASVS-PLATFORM-1). Do not log recognised text or send it off device (MASVS-PRIVACY-1); recognition is on-device (Apple Scribble). Baseline: no content in logs.

#### UX notes
Applies to the note-title, universal Search (Cmd+K), and text boxes in design/Sane Notes.dc.html and docs/design/screens-and-flows.md §7/§12. Provide keyboard and dictation as alternatives (WCAG); ensure VoiceOver reads the field correctly since Flutter paints text (hand-author Semantics). 44 pt targets, contrast >= 4.5:1, both light/dark.

#### Test plan
Widget: `app/test/text/scribble_fields_test.dart` (enable/suppress per field via mock). Integration: `app/integration_test/scribble_title_search_test.dart` via `patrol` on an iPad with Pencil (writes into title/search, canvas still inks).

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) monorepo scaffold; text tool from [SN-TXT-001](text.md#sn-txt-001).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-WEB-025

<a id="sn-web-025"></a>

**Implement the web handwriting-recognition path with an explicit opt-in**

| Field | Value |
|---|---|
| GitHub | #838 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | web |
| Areas | ocr-hwr, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-HWR-001](ocr-hwr.md#sn-hwr-001), [SN-WEB-015](security.md#sn-web-015) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `CWE-359`, `OWASP-A04` |
| Extra labels | needs-decision |

#### Context
Google's ML Kit Digital Ink is **mobile-only**, so the web build has **no on-device handwriting recognition** out of the box — a real feature gap that `docs/platform/web.md` §6 and `docs/adr/0010-web-pwa-strategy.md` decision 6 both call out. The documented options are a **Rust/WASM recognition core shared across platforms via `flutter_rust_bridge`** or an explicit **per-request cloud opt-in** with the "data leaves device" indicator (locked decision 6). The choice matters beyond recognition: OCR text is what backs handwriting **search** ([SN-SRCH-002](search.md#sn-srch-002)) and the accessible **alt-text** for ink ([SN-WEB-021](a11y.md#sn-web-021)), so a web user without it loses two features, not one. ADR-0010 says the feature is otherwise **hidden on web — never silently sent to the cloud**.

#### Scope
**In:** the web implementation of the `sane_ml` recognition interface: capability detection, the WASM recogniser integration path (gated on cross-origin isolation where threads are needed), the per-request cloud opt-in flow with the data-leaves-device banner, honest capability messaging where neither is available, and wiring recognised text into the search index and alt-text.
**Out:** the recognition models and the shared interface ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)), search indexing internals ([SN-SRCH-002](search.md#sn-srch-002)), transcription of audio ([SN-WEB-027](audio.md#sn-web-027)), and the maintainer's MyScript-vs-ML-Kit decision (CLAUDE.md §13).

#### Acceptance criteria
- [ ] Where a WASM recogniser is available and isolation is present, ink-to-text runs **fully offline** in a Worker: airplane-mode conversion of a handwritten paragraph succeeds.
- [ ] Where it is not available, recognition-dependent UI is **hidden or clearly disabled with a reason** — never a broken button, and never a silent cloud call (ADR-0010 decision 6).
- [ ] Any cloud path requires a **per-request** opt-in with a visible "data leaves device" banner naming exactly what will be sent; declining leaves the feature unavailable and changes nothing (locked decision 6, `PRD-PRIV-001`).
- [ ] The opt-in is per request, not a sticky global consent, and is withdrawable; the privacy dashboard reflects the true state.
- [ ] Recognised text flows into the search index and into ink alt-text ([SN-WEB-021](a11y.md#sn-web-021)) with a confidence value, and low-confidence output is marked rather than presented as fact.
- [ ] Recognition never blocks the UI isolate; a page of handwriting converts without a frame over 16.7 ms in the editor.
- [ ] Language selection is honoured per notebook and the supported set is stated honestly for web (no iOS-vs-Android-vs-web disparity hidden from the user).

#### Technical notes
**needs-decision (maintainer):** which web recognition path ships — (a) a Rust/WASM core via `flutter_rust_bridge` shared with native, or (b) cloud OCR behind a per-request opt-in, or (c) ship web without recognition in v1. Implement the interface and the capability gating now so the decision is a swap, not a rewrite; record the outcome in ADR-0010 decision 6 and `docs/platform/web.md` §6. Code lives in the web implementation of `plugins/sane_ml_native` plus `packages/sane_ml` interfaces (pure Dart, no Flutter import). Threads need cross-origin isolation ([SN-WEB-015](security.md#sn-web-015)); a single-threaded fallback must still work, slower. Relates to ADR-0016.

#### Security & privacy
This is one of the most privacy-sensitive paths in the product: handwriting is note content, frequently personal (`PRD-PRIV-001`, CWE-359). Threats: silent cloud egress of note content (TM-P-06, locked decision 6, MASVS-PRIVACY-1); a third-party OCR endpoint retaining or training on content (MASVS-PRIVACY-3, OWASP-A04); an unvetted WASM blob executing in the app origin (CWE-1104, supply chain); recognised text leaking through logs (CWE-532). Controls: default off and hidden rather than degraded to cloud; per-request consent with a specific, non-dark-pattern banner; TLS 1.2+ and a pinned, documented endpoint if a cloud path ships, with a no-training/ephemeral contractual guarantee recorded in the ADR (MASVS-NETWORK-1); the WASM artifact is self-hosted, SRI/Integrity-Policy covered ([SN-WEB-016](security.md#sn-web-016)) and version-pinned; no recognised text is ever logged.

#### UX notes
Surfaces: the Editor selection/convert action (`docs/design/screens-and-flows.md` §7.4), Search (§11), and Settings → Handwriting & stylus (§12) where the honest capability statement lives. The data-leaves-device banner is a shared `sane_ui` component and must be unmissable in all **17 looks, light and dark** — golden-test it in two looks per mode with a contrast check across all 17. States: available-offline, available-with-opt-in, unavailable (with reason), in-progress (cancellable), low-confidence result, and error. Copy is plain and student-readable, never "an error occurred". Accessibility: banner announced assertively before any egress, ≥ 44 px actions, ≥ 4.5:1 contrast, keyboard operable, and recognised text available to screen readers (`PRD-CO-310`, `PRD-CO-330`).

#### Test plan
- `packages/sane_ml/test/recognition_interface_test.dart` — capability gating and confidence handling.
- `app/test/web/recognition_gating_test.dart` — feature hidden when unavailable; no cloud call without consent (asserted by a network-call spy).
- `app/test/web/data_leaves_device_banner_golden_test.dart` — goldens in two looks, light and dark.
- `app/integration_test/web/recognition_offline_test.dart` — airplane-mode conversion where the WASM path is available.
- Manual: verify in Safari (no isolation-dependent threads) that the UI is honest about what is missing.

#### Dependencies
[SN-HWR-001](ocr-hwr.md#sn-hwr-001), [SN-WEB-015](security.md#sn-web-015); consumed by [SN-WEB-021](a11y.md#sn-web-021) and [SN-SRCH-002](search.md#sn-srch-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] ADR-0010 decision 6 and docs/platform/web.md §6 record the chosen path
- [ ] Reviewed against docs/security/secure-coding-checklist.md §11 with CODEOWNERS security review

---

