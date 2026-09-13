# Backlog — area: ocr-hwr

26 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

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

### SN-GA11-026

<a id="sn-ga11-026"></a>

**Order RTL and vertical-script transcripts correctly in OCR and reading mode**

| Field | Value |
|---|---|
| GitHub | not published yet |
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
| GitHub | not published yet |
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
| GitHub | not published yet |
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
| GitHub | not published yet |
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

