# Backlog — area: pdf

31 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-PDF-001](pdf.md#sn-pdf-001) **Build the Sane Notes PDF engine (sane_pdf: import, render, annotate, export)** (epic · M2 Library & Documents)
  - [SN-PDF-002](pdf.md#sn-pdf-002) **Implement the PDF render pipeline and PdfEngine abstraction (pdfrx/PDFium)** · p1 · feature · L · M2 Library & Documents
    - [SN-PDF-004](pdf.md#sn-pdf-004) **Add tile caching for PDF zoom with an LRU memory cap** · p1 · task · M · M2 Library & Documents
    - [SN-PDF-026](pdf.md#sn-pdf-026) **Add PDF performance tests: 600-page 60fps scroll and memory budget** · p1 · test · M · M2 Library & Documents
    - [SN-PDF-028](pdf.md#sn-pdf-028) **Add the sane_pdfkit native accelerator behind the sane_pdf interface** · p3 · task · L · M5 Phones & Platform Parity
  - [SN-PDF-003](pdf.md#sn-pdf-003) **Implement the continuous PDF scroll viewer with lazy rendering** · p1 · feature · M · M2 Library & Documents
  - [SN-PDF-005](pdf.md#sn-pdf-005) **Render disk-cached PDF page thumbnails and a page scrubber** · p2 · feature · M · M2 Library & Documents
  - [SN-PDF-006](pdf.md#sn-pdf-006) **Implement PDF import via file picker, link, and recents** · p1 · feature · M · M2 Library & Documents
  - [SN-PDF-007](pdf.md#sn-pdf-007) **Enforce the free-plan PDF import meter (5 per month)** · p1 · feature · S · M2 Library & Documents
  - [SN-PDF-008](pdf.md#sn-pdf-008) **Support PDF share-in, open-with, and OS share-target import** · p1 · feature · M · M2 Library & Documents
  - [SN-PDF-009](pdf.md#sn-pdf-009) **Extract PDF text layers with search bounds (quads) for indexing** · p1 · feature · M · M2 Library & Documents
  - [SN-PDF-010](pdf.md#sn-pdf-010) **Add in-document PDF find with next/prev, highlight, and counter** · p2 · feature · M · M2 Library & Documents
  - [SN-PDF-011](pdf.md#sn-pdf-011) **Load PDF outlines/bookmarks navigation with manual entries** · p2 · feature · M · M2 Library & Documents
  - [SN-PDF-012](pdf.md#sn-pdf-012) **Follow PDF hyperlinks (in-doc GoTo and external URL) with confirm** · p2 · feature · S · M2 Library & Documents
  - [SN-PDF-013](pdf.md#sn-pdf-013) **Implement the PDF ink/highlight annotation overlay (DB source of truth)** · p1 · feature · L · M2 Library & Documents
  - [SN-PDF-014](pdf.md#sn-pdf-014) **Implement the Smart Highlighter (snap-to-text) and straight-line highlighter** · p1 · feature · M · M2 Library & Documents
  - [SN-PDF-015](pdf.md#sn-pdf-015) **Add FreeText, Note, Shape, and Stamp/Image annotations on PDFs** · p2 · feature · M · M2 Library & Documents
  - [SN-PDF-016](pdf.md#sn-pdf-016) **Round-trip PDF annotations to XFDF (export and import)** · p2 · feature · M · M2 Library & Documents
  - [SN-PDF-017](pdf.md#sn-pdf-017) **Implement PDF page operations (insert, rotate, delete, reorder, go-to)** · p1 · feature · M · M2 Library & Documents
  - [SN-PDF-018](pdf.md#sn-pdf-018) **Merge and combine PDFs/notebooks and add margin space** · p2 · feature · M · M3 Audio & Recognition
  - [SN-PDF-019](pdf.md#sn-pdf-019) **Export PDF flattened, with live annotations, and as PNG/JPEG** · p1 · feature · M · M2 Library & Documents
  - [SN-PDF-020](pdf.md#sn-pdf-020) **Export searchable handwriting via an invisible OCR text layer** · p2 · feature · M · M3 Audio & Recognition
  - [SN-PDF-021](pdf.md#sn-pdf-021) **Print and share PDFs via the platform print pipeline** · p2 · feature · S · M2 Library & Documents
  - [SN-PDF-022](pdf.md#sn-pdf-022) **Support AcroForm fill, flatten, and import/export** · p3 · feature · M · M3 Audio & Recognition
  - [SN-PDF-023](pdf.md#sn-pdf-023) **Harden the PDF import validation gate (caps, off-isolate, JS disabled)** · p0 · security · M · M2 Library & Documents
    - [SN-PDF-024](pdf.md#sn-pdf-024) **Build the malformed-PDF fuzz corpus and parser fuzzing job** · p1 · test · M · M2 Library & Documents
  - [SN-PDF-025](pdf.md#sn-pdf-025) **Enforce the PDF encryption boundary and source-password handling** · p1 · security · M · M2 Library & Documents
  - [SN-PDF-027](pdf.md#sn-pdf-027) **Keep PDF colours in dark mode and add an optional night filter** · p3 · feature · S · M2 Library & Documents
  - [SN-GCMP-008](pdf.md#sn-gcmp-008) **Implement excerpt-to-note: drag PDF text or region into a linked note** · p3 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-GCMP-009](pdf.md#sn-gcmp-009) **Add side-by-side multi-page PDF view (1/2/4-up)** · p3 · feature · M · M2 Library & Documents

---

## Issues

### SN-GCMP-008

<a id="sn-gcmp-008"></a>

**Implement excerpt-to-note: drag PDF text or region into a linked note**

| Field | Value |
|---|---|
| GitHub | #1062 |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | ipad, android-tablet, web |
| Areas | pdf, library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-009](pdf.md#sn-pdf-009), [SN-STDY-013](study.md#sn-stdy-013), [SN-HWR-011](ocr-hwr.md#sn-hwr-011) |
| Security controls | — |
| Extra labels | needs-design |

#### Context
Flexcil and LiquidText built their following on 'excerpting' - drag a passage or a boxed region out of a PDF into a study note, keeping a live link back to the source page. No mainstream ink app does it, and our matrix marks it a differentiator ('Excerpt/link PDF text into notes -> later (Flexcil/LiquidText-style)', docs/research/competitor-feature-matrix.md section 9; PRD-LB-384 from the 2026-09-13 pass). It is referenced in tracker bodies as a future SN-LIB/PDF item but has no implementing issue. It directly serves the law/med/researcher persona the large-PDF engine targets.

#### Scope
**In:** select PDF text (or draw a region marquee) and drag/send it into a note as an excerpt block (text keeps a selectable copy; region becomes an image crop); each excerpt carries a backlink to the exact source page/quad; a 'jump to source' affordance; excerpts collect in a chosen note/notebook.
**Out:** the backlink store itself ([SN-STDY-013](study.md#sn-stdy-013)); PDF text extraction ([SN-PDF-009](pdf.md#sn-pdf-009)); OCR-on-import ([SN-HWR-011](ocr-hwr.md#sn-hwr-011)); Markdown/DOCX excerpt export.

#### Acceptance criteria
- [ ] Selecting PDF text and dragging it into a note creates a text excerpt with a live backlink to the source quad.
- [ ] Drawing a region marquee on a PDF and sending it creates an image excerpt cropped to that region, also backlinked.
- [ ] 'Jump to source' from an excerpt opens the PDF at the exact page and highlights the source region.
- [ ] Excerpts survive sync and export z-order; deleting the source shows a tombstoned placeholder, not a crash.
- [ ] Works on iPad/Android tablet drag and on web via a send-to-note action.

#### Technical notes
Use PDF text quads ([SN-PDF-009](pdf.md#sn-pdf-009)) for text excerpts and the render pipeline ([SN-PDF-002](pdf.md#sn-pdf-002)) to raster region crops; store excerpts as note blocks with a Link edge to the source anchor ([SN-STDY-013](study.md#sn-stdy-013)). Content-addressed crops go through the blob store ([SN-CORE-014](storage.md#sn-core-014)). Anchor to stable page/quad ids, not text offsets, so links survive edits. Reference PRD-LB-384 and docs/design/screens-and-flows.md PDF section. Needs a short interaction-design pass for the drag/send affordance.

#### Security & privacy
PDF parsing already hardened ([SN-PDF-023](pdf.md#sn-pdf-023)); excerpting must not bypass those caps. Respect locked-notebook exclusion. Baseline otherwise.

#### UX notes
Drag ghost preview; excerpt block styled distinctly with a source chip; honour Reduce Motion; web uses an explicit 'Send to note' menu where native drag is unavailable.

#### Test plan
Unit: excerpt block + backlink creation + anchor stability (test/pdf/excerpt_to_note_test.dart). Widget: drag/send flows. Integration: jump-to-source accuracy; tombstone on source delete; sync round-trip.

#### Dependencies
[SN-PDF-009](pdf.md#sn-pdf-009), [SN-STDY-013](study.md#sn-stdy-013), [SN-HWR-011](ocr-hwr.md#sn-hwr-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-009

<a id="sn-gcmp-009"></a>

**Add side-by-side multi-page PDF view (1/2/4-up)**

| Field | Value |
|---|---|
| GitHub | #1063 |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, android-tablet, web |
| Areas | pdf, pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-003](pdf.md#sn-pdf-003), [SN-PDF-004](pdf.md#sn-pdf-004) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Flexcil and other PDF-study apps let readers view two or four PDF pages at once for comparison and dense reading on large screens (docs/research/competitor-feature-matrix.md section 9; PRD-LB-385 from the 2026-09-13 pass). Our PDF viewer is single-column continuous scroll ([SN-PDF-003](pdf.md#sn-pdf-003)); no issue offers a multi-up layout. On tablets and wide web this is a standard reading affordance for textbooks and papers.

#### Scope
**In:** a view-mode control offering 1-up, 2-up and 4-up page grids on tablet/wide-web PDF reading; correct annotation compositing per tile; independent per-tile page tracking; smooth transition between modes; annotation input still targets the correct page under the pointer/pen.
**Out:** annotation tooling itself ([SN-PDF-013](pdf.md#sn-pdf-013)); scroll modes for notebooks ([SN-PG-018](pages-canvas.md#sn-pg-018)); phone layout (single-up).

#### Acceptance criteria
- [ ] A control switches between 1/2/4-up on tablet and wide web; the setting persists per document.
- [ ] Each tile renders the correct page with its ink/highlight overlay aligned ([SN-PDF-013](pdf.md#sn-pdf-013)).
- [ ] Pen/touch annotation lands on the page under the input point, not a neighbour.
- [ ] The 60fps scroll and memory budgets still hold in 2/4-up (page-window + tile eviction).
- [ ] Below the wide breakpoint the view falls back to 1-up automatically.

#### Technical notes
Extend the continuous viewer ([SN-PDF-003](pdf.md#sn-pdf-003)) with a grid layout driver keyed off window size class ([SN-PHN-002](compat.md#sn-phn-002)/[SN-DS-026](design-system.md#sn-ds-026)); reuse tile caching ([SN-PDF-004](pdf.md#sn-pdf-004)) with an LRU cap sized for the visible tile count. Hit-testing maps input coordinates to the owning tile/page before dispatching to the annotation overlay. Reference PRD-LB-385 and the decision-7 perf budgets. Verify against [SN-PDF-026](pdf.md#sn-pdf-026).

#### Security & privacy
None beyond baseline; rendering only. Respect locked-notebook rules.

#### UX notes
View-mode segmented control in the PDF toolbar; smooth mode transition honouring Reduce Motion; clear active-page affordance in multi-up.

#### Test plan
Unit: coordinate-to-tile mapping (test/pdf/multi_up_test.dart). Widget: mode switch + persistence. Perf: 2/4-up 60fps + memory gate (extends [SN-PDF-026](pdf.md#sn-pdf-026)). Golden: 2-up/4-up layout.

#### Dependencies
[SN-PDF-003](pdf.md#sn-pdf-003), [SN-PDF-004](pdf.md#sn-pdf-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-001

<a id="sn-pdf-001"></a>

**Build the Sane Notes PDF engine (sane_pdf: import, render, annotate, export)**

| Field | Value |
|---|---|
| GitHub | #21 |
| Type | epic |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, storage, search |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-004](storage.md#sn-core-004), [SN-INK-001](ink.md#sn-ink-001), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-2`, `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `OWASP-A03`, `OWASP-A08`, `CWE-20`, `CWE-400`, `CWE-22` |
| Extra labels | agent-ready, innovation |

#### Context
PDF is a first-class page kind in Sane Notes: notes are drawn *over* imported PDFs and the app must render, annotate, search, and export them faithfully across iPadOS, iPhone, Android, and Web while staying local-first and permissively licensed (docs/adr/0014-pdf-engine.md; docs/product/prd-02-library-documents-audio-search.md §7). This epic delivers `packages/sane_pdf` (import, render, annotation overlay, page ops, export) and the optional `plugins/sane_pdfkit` native accelerator, holding the locked perf budgets: scroll a 600-page PDF at 60 fps and open a 1,000-page notebook in under 1 s (CLAUDE.md decision 7; docs/architecture/rendering-and-performance.md §5). The chosen architecture (ADR-0014) is: render with `pdfrx` (PDFium, MIT) on every surface including Web (PDFium-WASM); draw our own annotation overlay with the Sane Notes ink engine; keep our SQLite DB as the source of truth for marks (geometry in PDF points, page-relative); use XFDF for interop and `syncfusion_flutter_pdf` + `package:pdf` + `package:printing` for export/print. Every imported PDF is untrusted input parsed off the UI isolate, resource-capped, and fails closed (docs/security/secure-coding-checklist.md §1; docs/security/threat-model.md TM-D-01/TM-E-04/TM-T-06).

#### Scope
**In:** the `sane_pdf` package and its `PdfEngine` abstraction; import (file picker, share-in, free-plan meter); lazy render + tiling + thumbnails for 600+ pages; text-layer extraction + search bounds; outlines, hyperlinks; the ink/highlight/text/note/shape/stamp annotation overlay and its XFDF round-trip; page operations and merge; flattened / live-annotation / image / searchable exports; print; AcroForm forms; the security hardening gate, fuzz corpus, encryption boundary, and perf harness; the `sane_pdfkit` accelerator.
**Out:** the library home and Import overlay chrome (SN-LIB), the FTS global index (SN-SRCH), OCR/handwriting recognition engines (SN-HWR), audio-sync playback (SN-AUD), the ink engine internals (SN-INK), the document model (SN-CORE), and sync/E2EE internals (SN-SYNC/SN-CRY) which this epic only consumes.

#### Acceptance criteria
- [ ] Every child issue below is closed and CI is green (lint, analyze, unit, golden, fuzz, perf, security scans).
- [ ] A 600-page PDF scrolls at 60 fps on the low-end reference device with memory under budget (docs/platform/performance-budgets.md).
- [ ] A hostile/malformed PDF fails closed into a user-safe error, parsed off the UI isolate, resource-capped, path-confined, with embedded JavaScript never executed (M2 exit criterion).
- [ ] Annotations round-trip our DB -> XFDF -> re-import with identical page-space geometry and open in Acrobat/Preview (ADR-0014 verify 2).
- [ ] pdfrx renders and searches the same document identically on Web (PDFium-WASM) and native (ADR-0014 verify 4).

#### Technical notes
Package `packages/sane_pdf` (Flutter); plugin `plugins/sane_pdfkit` (federated, ADR-0012). DAG: `sane_pdf` depends on `sane_core` (+ `sane_ink`/`sane_render` via `app/` composition, never a sideways import) and never on other feature packages (CLAUDE.md §3). Libraries: `pdfrx` (PDFium/WASM), `syncfusion_flutter_pdf` (quads/flatten/PDF-A, Community License gate), `package:pdf` (searchable export), `package:printing`. PRD-LB-130..144 (PDF), PRD-LB-180..184 (media on PDF), PRD-LB-260/261 (index), PRD-LB-305 (OCR import). Children:
- [ ] [SN-PDF-002](pdf.md#sn-pdf-002) render pipeline + PdfEngine abstraction
- [ ] [SN-PDF-003](pdf.md#sn-pdf-003) continuous scroll viewer + lazy render
- [ ] [SN-PDF-004](pdf.md#sn-pdf-004) tile caching for zoom + LRU cap
- [ ] [SN-PDF-005](pdf.md#sn-pdf-005) disk-cached thumbnails + scrubber
- [ ] [SN-PDF-006](pdf.md#sn-pdf-006) import via file picker + insert
- [ ] [SN-PDF-007](pdf.md#sn-pdf-007) free-plan import meter
- [ ] [SN-PDF-008](pdf.md#sn-pdf-008) share-in / open-with / share-target
- [ ] [SN-PDF-009](pdf.md#sn-pdf-009) text-layer extraction + search bounds
- [ ] [SN-PDF-010](pdf.md#sn-pdf-010) in-document find bar
- [ ] [SN-PDF-011](pdf.md#sn-pdf-011) outlines / bookmarks navigation
- [ ] [SN-PDF-012](pdf.md#sn-pdf-012) hyperlinks follow + confirm
- [ ] [SN-PDF-013](pdf.md#sn-pdf-013) annotation overlay model
- [ ] [SN-PDF-014](pdf.md#sn-pdf-014) Smart Highlighter + straight-line
- [ ] [SN-PDF-015](pdf.md#sn-pdf-015) FreeText / Note / Shape / Stamp
- [ ] [SN-PDF-016](pdf.md#sn-pdf-016) XFDF round-trip
- [ ] [SN-PDF-017](pdf.md#sn-pdf-017) page operations
- [ ] [SN-PDF-018](pdf.md#sn-pdf-018) merge / combine + margin space
- [ ] [SN-PDF-019](pdf.md#sn-pdf-019) export flattened / live / image
- [ ] [SN-PDF-020](pdf.md#sn-pdf-020) searchable-handwriting export
- [ ] [SN-PDF-021](pdf.md#sn-pdf-021) print & share
- [ ] [SN-PDF-022](pdf.md#sn-pdf-022) AcroForm forms
- [ ] [SN-PDF-023](pdf.md#sn-pdf-023) import validation gate (security)
- [ ] [SN-PDF-024](pdf.md#sn-pdf-024) malformed-PDF fuzz corpus
- [ ] [SN-PDF-025](pdf.md#sn-pdf-025) encryption boundary + password PDFs
- [ ] [SN-PDF-026](pdf.md#sn-pdf-026) 600-page perf tests
- [ ] [SN-PDF-027](pdf.md#sn-pdf-027) dark-mode fidelity + night filter
- [ ] [SN-PDF-028](pdf.md#sn-pdf-028) sane_pdfkit native accelerator

#### Security & privacy
Imported PDFs are untrusted (TB1/TB3): validate MIME/size/page caps, parse off-isolate, fail closed, confine paths, never execute embedded JS/launch actions (TM-D-01, TM-E-04, TM-T-06). PDFs and annotations are note content: content-addressed blobs, E2E-encrypted before any sync write, never logged (TM-I-01/05, decision 3). Pasted-link import is SSRF surface (TM-I-06/OWASP-A10). IDs: MASVS-STORAGE-1, MASVS-CODE-2, MASVS-PLATFORM-1, MASVS-PRIVACY-1, OWASP-A03, OWASP-A08, CWE-20, CWE-400, CWE-22.

#### UX notes
Surfaces: design/Sane Notes.dc.html Import overlay (screens §9), the PDF facsimile in the Editor (screens §7.2), Export (screens §10), Search (screens §11). Rendered PDF pages keep their original colours in dark mode (screens §0). All app chrome renders in all 17 looks + light/dark; controls carry Semantics labels, 44 pt / 48 dp targets, and are keyboard-reachable on web (docs/design/accessibility.md).

#### Test plan
Unit/widget/golden/integration/fuzz/perf across children; umbrella suites `packages/sane_pdf/test/` and `app/integration_test/pdf_scroll_perf_test.dart`, `app/integration_test/pdf_annotation_roundtrip_test.dart`. Each child names its own files.

#### Dependencies
SN-FND-002 (scaffold), SN-CORE-004 (SQLite + blob store), SN-INK-001 (ink engine for annotation overlay), SN-ED-002 (editor tool state). Coordinates with SN-PG-002 (paged page kind), SN-LIB-002 (library/import chrome), SN-SRCH-002 (FTS index), SN-HWR-001 (OCR), SN-SYNC-002/SN-CRY-002 (sync + E2EE), SN-PERF-002 (perf harness), SN-BILL-001 (entitlement meter).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-002

<a id="sn-pdf-002"></a>

**Implement the PDF render pipeline and PdfEngine abstraction (pdfrx/PDFium)**

| Field | Value |
|---|---|
| GitHub | #373 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-2`, `MASVS-PRIVACY-1`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Every PDF capability (viewer, tiling, search, annotation, export) sits on one render/read engine, so the first PDF issue defines the `PdfEngine` abstraction and its `pdfrx` (PDFium, MIT) implementation (docs/adr/0014-pdf-engine.md Decision 1; docs/product/prd-02-library-documents-audio-search.md PRD-LB-130). pdfrx is the widest single Flutter renderer, covering Android, iOS 15+, desktop, and Web via PDFium-WASM, so web fidelity matches native without a separate pdf.js path (docs/platform/web.md line 159). Making the engine an interface (not a direct pdfrx call from feature code) is what lets `plugins/sane_pdfkit` swap in Apple PDFKit / Android androidx.pdf later with zero observable behaviour change (ADR-0014 Decision 7; docs/platform/ipad.md §sane_pdfkit; docs/platform/android.md §sane_pdfkit). All rasterisation runs off the UI isolate so a hostile file can never add a millisecond to ink latency (docs/security/secure-coding-checklist.md §1).

#### Scope
**In:** the `PdfEngine` interface (open, page count, page size in PDF points, render page/region to an image at a target DPI, text extraction handle, outline handle, dispose) returning `Result<T, Failure>`; the pdfrx-backed default implementation; a `PdfDocument` value type keyed by content-addressed blob ref; the `PasswordProvider` hook for encrypted source PDFs (never persisting the password); background-isolate rasterisation with bounded memory.
**Out:** the scrolling viewer widget ([SN-PDF-003](pdf.md#sn-pdf-003)), tile caching ([SN-PDF-004](pdf.md#sn-pdf-004)), thumbnails ([SN-PDF-005](pdf.md#sn-pdf-005)), text search bounds ([SN-PDF-009](pdf.md#sn-pdf-009)), the annotation overlay ([SN-PDF-013](pdf.md#sn-pdf-013)), and the native accelerator ([SN-PDF-028](pdf.md#sn-pdf-028)).

#### Acceptance criteria
- [ ] `PdfEngine.open` on a valid PDF returns a `PdfDocument` with correct page count and per-page size in PDF points; a malformed byte range returns a `Failure`, never throws to the caller (test asserts both).
- [ ] Page rasterisation runs on a background isolate; a unit test asserts no `PdfEngine` render call executes on the root isolate.
- [ ] Rendering a fixture PDF on Web (PDFium-WASM) and native produces pixel-equivalent output within a golden tolerance (ADR-0014 verify 4).
- [ ] A password-protected fixture opens via `PasswordProvider`; the password is held transiently and never written to disk, logs, or the DB (assertion test).
- [ ] Memory for open documents is LRU-bounded; opening 20 documents in sequence does not exceed the configured resident cap.

#### Technical notes
Create `packages/sane_pdf/lib/src/engine/pdf_engine.dart` (interface), `pdfrx_pdf_engine.dart` (impl), `pdf_document.dart`. Use `pdfrx` `PdfDocument.openFile`/`openData` and `PdfPage.render`; verify the exact render + text APIs against pdfrx docs before relying on them (ADR-0014 Decision 1 flags this as unverified). Rasterise via `Isolate.run` / a long-lived render isolate (docs/architecture/overview.md §6). Blob bytes come from the content-addressed store (SN-CORE-004); the engine never reads a raw filesystem path from file content. Pin the pdfium version and track its CVEs (OSV-Scanner; ADR-0014 security impact).

#### Security & privacy
PDF bytes are untrusted (TB3) and note content (A1): parse off-isolate, bound memory, fail closed (TM-D-01, TM-E-04). Never log document bytes, page content, or the source password (TM-I-05). Passwords are held in RAM only and scrubbed after open (TM-I-03). IDs: MASVS-STORAGE-1, MASVS-CODE-2, MASVS-PRIVACY-1, CWE-20, CWE-400.

#### UX notes
No direct chrome; this is the substrate for the PDF facsimile in the Editor (screens §7.2). A password-required document surfaces a passphrase prompt handled by the viewer ([SN-PDF-003](pdf.md#sn-pdf-003)); the engine only exposes the `PasswordProvider` callback. Errors map to user-safe `Failure` copy, never a raw exception string.

#### Test plan
`packages/sane_pdf/test/engine/pdf_engine_test.dart` (open/page-size/render, malformed fail-closed, password provider, off-isolate assertion), and a golden `packages/sane_pdf/test/engine/render_web_native_golden_test.dart`. Malformed fixtures come from [SN-PDF-024](pdf.md#sn-pdf-024).

#### Dependencies
SN-FND-002 (scaffold + sane_pdf skeleton), SN-CORE-004 (content-addressed blob store).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-003

<a id="sn-pdf-003"></a>

**Implement the continuous PDF scroll viewer with lazy rendering**

| Field | Value |
|---|---|
| GitHub | #374 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
A PDF-backed notebook must scroll a 600-page document at 60 fps without blowing the memory budget, which is impossible if every page is rasterised eagerly (docs/adr/0014-pdf-engine.md Decision 6; docs/architecture/rendering-and-performance.md §5; CLAUDE.md decision 7). This issue builds the virtualised continuous-scroll viewer that renders only the viewport plus one neighbour on each side, disposes off-screen bitmaps, and swaps a cheap low-resolution preview during fast scroll for a full-resolution render when scrolling settles (PRD-LB-135). The viewer is the on-screen host for the PDF facsimile beneath the ink overlay (screens §7.2) and must interoperate cleanly with the editor's pan/zoom and the annotation layer so drawing over a PDF feels identical to drawing on blank paper.

#### Scope
**In:** a virtualised scrolling widget that queries `PdfEngine` for viewport-relevant pages; the two-resolution scheme (low-res preview during fling, full-res on settle); off-screen bitmap disposal; the password prompt UI when the engine reports a password-required document; the page-position model shared with the page rail ([SN-PDF-017](pdf.md#sn-pdf-017)); a fit-to-width / fit-to-page control.
**Out:** high-zoom tile caching ([SN-PDF-004](pdf.md#sn-pdf-004)), the thumbnail scrubber ([SN-PDF-005](pdf.md#sn-pdf-005)), the annotation overlay compositing ([SN-PDF-013](pdf.md#sn-pdf-013)), and infinite/paged blank page kinds (SN-PG).

#### Acceptance criteria
- [ ] Only viewport +/- 1 page bitmaps are resident at any time (test inspects the live cache while scrolling a 600-page fixture).
- [ ] Fast fling shows the low-res preview within one frame and upgrades to full-res within 150 ms of settle (integration timeline assertion).
- [ ] Scrolling a 600-page PDF sustains 60 fps with no frame > 16.7 ms on the mid-range reference device (perf gate via [SN-PDF-026](pdf.md#sn-pdf-026)).
- [ ] A password-required document shows a prompt; a wrong password re-prompts with a user-safe error and no partial render.
- [ ] Fit-to-width and fit-to-page reflow correctly at phone (~400px) through tablet widths.

#### Technical notes
Create `packages/sane_pdf/lib/src/viewer/pdf_scroll_view.dart` using a `CustomScrollView`/`SliverList` sized from `PdfEngine` page sizes; render pages into `RepaintBoundary`-wrapped tiles; drive full-res render on scroll-settle via a debounced controller. Reuse the LRU/tile machinery of the ink engine (docs/architecture/rendering-and-performance.md §5; ink-engine §6). The active-stroke overlay composites above the page raster (the PDF raster is the background layer). Never rasterise on the UI isolate (SN-PDF-002). Implements PRD-LB-135.

#### Security & privacy
None beyond baseline: page bitmaps are note content, held in memory only, never logged (TM-I-05). Cap resident bitmaps and tile memory to defend against a giant-page decompression attack (TM-D-01, CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
Surface: Editor with a PDF facsimile (screens §7.2). Scroll must feel native; the two-resolution swap must not flicker visibly. Empty/loading: a skeleton page frame while the first render lands; error: a user-safe 'This page could not be rendered' card with retry. Rendered pages keep original colours in dark mode ([SN-PDF-027](pdf.md#sn-pdf-027)). A11y: page-change announcements, keyboard PageUp/PageDown on web, 44 pt targets on the fit controls.

#### Test plan
`packages/sane_pdf/test/viewer/pdf_scroll_view_test.dart` (residency, two-resolution swap, fit controls, password prompt), golden tests per look for the viewer chrome, and the perf integration test in [SN-PDF-026](pdf.md#sn-pdf-026).

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (PdfEngine + rasterisation).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-004

<a id="sn-pdf-004"></a>

**Add tile caching for PDF zoom with an LRU memory cap**

| Field | Value |
|---|---|
| GitHub | #703 |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Depends on | [SN-PDF-003](pdf.md#sn-pdf-003) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
At high zoom a full-page PDF bitmap becomes enormous and blows the memory budget, so the viewer must render only the visible region in display-DPI tiles rather than the whole page at full resolution (docs/adr/0014-pdf-engine.md Decision 6; docs/architecture/rendering-and-performance.md §5, jank runbook item 9). This task adds the zoom tiling layer over the scroll viewer: it buckets zoom levels, rasterises the visible page region into tiles at the current bucket, and LRU-bounds the tile cache to the configured memory cap (PRD-LB-135). Reusing the same tile model as the ink engine keeps one caching discipline across the app (ink-engine §6.1).

#### Scope
**In:** a zoom-bucket function (re-raster only on bucket change, not every pinch delta); per-page tile grid keyed by (pageIndex, bucket, tileXY); background-isolate tile rasterisation via `PdfEngine.renderRegion`; an LRU cache bounded to the memory budget with eviction of off-screen/old-bucket tiles; integration with the two-resolution scheme so the low-res whole-page preview shows while tiles fill.
**Out:** the base scroll viewer ([SN-PDF-003](pdf.md#sn-pdf-003)), thumbnails ([SN-PDF-005](pdf.md#sn-pdf-005)), and annotation rendering ([SN-PDF-013](pdf.md#sn-pdf-013)).

#### Acceptance criteria
- [ ] Zooming to 400% renders only visible tiles at display DPI; no full-page full-res bitmap is ever allocated (test asserts max single-bitmap size).
- [ ] Re-rasterisation fires only on zoom-bucket change, not on every pinch delta (counter assertion over a pinch gesture stream).
- [ ] The tile cache never exceeds the configured resident cap; oldest off-screen tiles evict first (LRU unit test).
- [ ] Pinch-zoom on a dense vector page holds 60 fps with no frame > 16.7 ms (perf gate [SN-PDF-026](pdf.md#sn-pdf-026)).
- [ ] Tiles for a disposed/closed page are evicted promptly (no leak across page close).

#### Technical notes
Create `packages/sane_pdf/lib/src/viewer/tile_cache.dart` and `zoom_buckets.dart`. Reuse the ink engine tile-model conventions (ink-engine §6). `PdfEngine` gains a `renderRegion(pageIndex, rect, targetDpi)` path (added in SN-PDF-002 or here as a small extension). Cap tile dimensions and total resident bytes from the platform memory budget (docs/platform/performance-budgets.md). All rasterisation stays off the UI isolate.

#### Security & privacy
None beyond baseline: tiles are note content held in memory only, never logged. The resident cap and tile-size bound are the defence against a maliciously huge page exhausting memory (TM-D-01, CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
High-zoom text/vectors must stay crisp (tiles at display DPI), never upscaled-blurry. The preview-to-tile fill must not flch or flicker. No new chrome. Behaviour is identical across all 17 looks (tiles are page content, not themed).

#### Test plan
`packages/sane_pdf/test/viewer/tile_cache_test.dart` (LRU eviction, resident cap, bucket re-raster count) and a zoom perf scenario added to `app/integration_test/pdf_scroll_perf_test.dart` ([SN-PDF-026](pdf.md#sn-pdf-026)).

#### Dependencies
[SN-PDF-003](pdf.md#sn-pdf-003) (scroll viewer provides the viewport + two-resolution host).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-005

<a id="sn-pdf-005"></a>

**Render disk-cached PDF page thumbnails and a page scrubber**

| Field | Value |
|---|---|
| GitHub | #375 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Jumping across a 600-page PDF is only usable with a thumbnail scrubber/overview, and thumbnails must be pre-rendered on a background isolate and cached to disk so they never block scroll or the draw loop (docs/adr/0014-pdf-engine.md Decision 6; docs/architecture/rendering-and-performance.md §5; PRD-LB-135). This feature builds the small-page thumbnail generator and the page-overview UI used by the page rail, outline, and go-to-page. The same disk-thumbnail infrastructure also backs the notebook thumbnail for PDF-backed notebooks (PRD-LB-042), so it must be robust and memory-bounded.

#### Scope
**In:** background-isolate thumbnail rasterisation at a small fixed size; a content-addressed disk cache keyed by (pdf blob hash, pageIndex, thumb size); a scrollable page-overview grid/strip with lazy thumbnail loading and a current-page marker; go-to-page from a tapped thumbnail; cache invalidation when the PDF blob changes; a bounded disk-cache size with LRU purge.
**Out:** the page rail reorder/rotate operations ([SN-PDF-017](pdf.md#sn-pdf-017)), the outline TOC ([SN-PDF-011](pdf.md#sn-pdf-011)), and continuous-scroll rendering ([SN-PDF-003](pdf.md#sn-pdf-003)).

#### Acceptance criteria
- [ ] Thumbnails render on a background isolate; generating 600 thumbnails never drops a frame in the foreground (perf assertion).
- [ ] Thumbnails persist to a content-addressed disk cache and reload without re-rasterising on the next open (cache-hit test).
- [ ] The overview strip lazy-loads only visible thumbnails and shows a placeholder until each lands.
- [ ] Tapping a thumbnail scrolls the viewer to that page and marks it current.
- [ ] The disk cache is LRU-bounded and self-purges past its size cap; a corrupt cache entry is regenerated, never crashes (test).

#### Technical notes
Create `packages/sane_pdf/lib/src/thumbs/thumbnail_service.dart` and `page_overview.dart`. Rasterise via `PdfEngine` at a small DPI on `Isolate.run`; store under the app cache dir (path-confined, excluded from OS backup per docs/security/secure-coding-checklist.md §8). Cache key includes the PDF blob content hash so a re-imported/edited PDF invalidates stale thumbnails. Reuse for PRD-LB-042 notebook thumbnails (page 1 of a PDF-backed notebook).

#### Security & privacy
Thumbnails are note content: store in app-private cache, exclude from OS auto-backup, never log paths (TM-I-05, TM-I-10, MASVS-STORAGE-1). Bound rasterisation memory and disk (TM-D-01, CWE-400). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-400.

#### UX notes
Surface: page overview / scrubber invoked from the page rail (screens §7.7) and go-to-page (PRD-LB-142). Overview must render in all 17 looks + dark mode; PDF thumbnails keep original colours. Placeholder skeletons while loading; a11y labels 'Page N of M' on each thumbnail; 44 pt targets; keyboard-navigable grid on web.

#### Test plan
`packages/sane_pdf/test/thumbs/thumbnail_service_test.dart` (off-isolate, disk cache hit/purge, invalidation, corrupt-entry recovery), widget test `page_overview_test.dart`, golden per look.

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (PdfEngine rasterisation).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-006

<a id="sn-pdf-006"></a>

**Implement PDF import via file picker, link, and recents**

| Field | Value |
|---|---|
| GitHub | #376 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002), [SN-PDF-023](pdf.md#sn-pdf-023) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-NETWORK-1`, `OWASP-A10`, `CWE-20`, `CWE-434`, `CWE-918` |
| Extra labels | agent-ready |

#### Context
Import is the entry point for every PDF, invoked from the library 'Import PDF' action and the editor Import overlay (docs/product/prd-02-library-documents-audio-search.md PRD-LB-133; screens §9). It must offer Files (device picker), Paste-a-link (course portal / arXiv / Drive URL), and a Recent-files list, ingest the bytes into the content-addressed blob store, create a PDF-backed page after the current page, switch the tool to highlighter, and toast '<file> imported - highlighter ready' (PRD-LB-133). Every imported byte is untrusted and must pass the validation gate before it is opened (docs/security/secure-coding-checklist.md §1; docs/security/threat-model.md TM-D-01/TM-T-06), and a pasted link is SSRF surface that must be scheme-allow-listed (TM-I-06).

#### Scope
**In:** the device file picker path (`file_picker`); the paste-a-link fetch behind an https-only allow-list with size/type caps; a Recent-files list persisted per profile; ingest into the blob store as a `PdfAsset`; insert a PDF-backed page after the current page and switch tool to highlighter; import into a new isolated notebook by default when imported from the library.
**Out:** the free-plan meter/upgrade gate ([SN-PDF-007](pdf.md#sn-pdf-007)), OS share-in / open-with ([SN-PDF-008](pdf.md#sn-pdf-008)), camera scan and image insert (SN-MED / PRD-LB-180), Google Drive OAuth (SN-SYNC-004, needs-credentials), and the validation gate internals ([SN-PDF-023](pdf.md#sn-pdf-023)).

#### Acceptance criteria
- [ ] Picking a valid PDF ingests it, creates a PDF-backed page after the current page, switches the tool to highlighter, and toasts '<file> imported - highlighter ready' (PRD-LB-133).
- [ ] A pasted link is fetched only over https with a size cap and content-type check; file:, javascript:, data:, and non-https URLs are rejected with a user-safe error (SSRF guard, TM-I-06).
- [ ] A non-PDF or oversize file is rejected by the validation gate ([SN-PDF-023](pdf.md#sn-pdf-023)) with a clear message and no partial import.
- [ ] Import runs off the UI isolate with progress and is cancellable (PRD-LB-361).
- [ ] The Recent-files list shows the last imports per profile and is cleared on profile switch (per-profile isolation, PRD-LB-350).

#### Technical notes
Create `packages/sane_pdf/lib/src/import/pdf_import_service.dart`; the picker uses `file_picker`, link fetch uses the app HTTP client with an https-only scheme allow-list (docs/security/secure-coding-checklist.md §1.1) and TLS enforced (MASVS-NETWORK-1). Bytes flow to the content-addressed blob store (SN-CORE-004) as a `PdfAsset` (blobRef, pageCount, hasTextLayer, bytes). PDF-backed page kind is created via the page model (SN-PG-002). Google Drive import is deferred to SN-SYNC-004 and surfaced as a disabled/coming-soon source here. Implements PRD-LB-133.

#### Security & privacy
Untrusted import (TB1/TB3): MIME/size/page caps and off-isolate parse via [SN-PDF-023](pdf.md#sn-pdf-023) before use; import into a new isolated notebook, never overwrite by a path from file content (TM-T-06, CWE-22). Pasted-link fetch is SSRF/redirect surface: https-only allow-list, no internal-address fetch, no auto-navigation (TM-I-06, OWASP-A10, CWE-918). Never log file bytes, names, or URLs (TM-I-05). IDs: MASVS-STORAGE-1, MASVS-NETWORK-1, OWASP-A10, CWE-20, CWE-434, CWE-918.

#### UX notes
Surface: Import overlay (screens §9) with sources Files / Paste a link / Recent (Google Drive and Scan shown as their own rows, owned elsewhere). Loading: progress with cancel; error: user-safe copy ('That file could not be imported'); offline: link import disabled with a hint. Renders in all 17 looks + dark mode; 44 pt targets; VoiceOver/TalkBack labels; keyboard-reachable on web.

#### Test plan
`packages/sane_pdf/test/import/pdf_import_service_test.dart` (ingest, insert-after, highlighter switch, recents, per-profile clear), link-guard test rejecting non-https/file/data schemes, widget test for the overlay, integration `app/integration_test/pdf_import_test.dart`.

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (engine), [SN-PDF-023](pdf.md#sn-pdf-023) (validation gate). Coordinates with SN-LIB-002 (Import overlay chrome), SN-PG-002 (PDF-backed page), SN-SYNC-004 (Drive import).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-007

<a id="sn-pdf-007"></a>

**Enforce the free-plan PDF import meter (5 per month)**

| Field | Value |
|---|---|
| GitHub | #377 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, billing |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-006](pdf.md#sn-pdf-006) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-20` |
| Extra labels | agent-ready, good first issue |

#### Context
Free accounts get 5 PDF imports per calendar month; the Import overlay must show 'N of 5 imports used this month' with a progress bar and 'Unlimited with Pro', and when a free user at the cap opens Import it must instead open the Upgrade overlay with toast 'Free plan: 5 PDF imports a month' (docs/product/prd-02-library-documents-audio-search.md PRD-LB-134; screens §9, §14). The counter is per-account, tracked locally and reconciled with the entitlement service, and resets on the 1st (PRD-LB-134). Gating must fail open to the free tier and never punish the user (docs/security/secure-coding-checklist.md §4; TM-S-05).

#### Scope
**In:** a per-account monthly import counter (local, reconciled with the entitlement provider); the meter UI in the Import overlay; the cap-reached redirect to the Upgrade overlay with the specified toast; month-boundary reset; treating Pro entitlement as unlimited.
**Out:** the entitlement service and receipt validation (SN-BILL-001), the Upgrade overlay design (SN-BILL/SN-ONB), and the import mechanics themselves ([SN-PDF-006](pdf.md#sn-pdf-006)).

#### Acceptance criteria
- [ ] A free account sees 'N of 5 imports used this month' + progress bar + 'Unlimited with Pro' in the overlay (PRD-LB-134).
- [ ] The 6th import attempt in a month opens the Upgrade overlay and toasts 'Free plan: 5 PDF imports a month'; no import occurs.
- [ ] The counter resets on the 1st of the month (clock-boundary test).
- [ ] A Pro entitlement removes the meter and allows unlimited imports.
- [ ] Entitlement lookup failure fails open to the free tier (never blocks below 5, never punitively locks; TM-S-05).

#### Technical notes
Create `packages/sane_pdf/lib/src/import/import_meter.dart`; counter keyed per-account (per-account not per-profile, PRD-LB-351), persisted locally and reconciled with the entitlement token verified against a pinned public key (SN-BILL-001; docs/security/secure-coding-checklist.md §4). The meter reads the plan from the billing provider abstraction, never hardcodes plan state. Implements PRD-LB-134; gate table in PRD-02 §14.

#### Security & privacy
Entitlement token verified against a pinned key; fail open to free, never punitive (TM-S-05, MASVS-privacy baseline). No PII in the counter; do not log account ids in the clear (TM-I-05). Validate the reconciled count (CWE-20). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-20.

#### UX notes
Surface: Import overlay meter row + Upgrade overlay (screens §9, §14). Renders in all 17 looks + dark mode; progress bar uses design tokens (no hardcoded colours); 44 pt targets; the meter and toast carry Semantics labels; the Upgrade path is keyboard-reachable on web.

#### Test plan
`packages/sane_pdf/test/import/import_meter_test.dart` (count/increment, cap redirect + toast copy, month reset, Pro unlimited, fail-open), widget test asserting the meter and Upgrade redirect.

#### Dependencies
[SN-PDF-006](pdf.md#sn-pdf-006) (import service increments the meter). Coordinates with SN-BILL-001 (entitlements).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-008

<a id="sn-pdf-008"></a>

**Support PDF share-in, open-with, and OS share-target import**

| Field | Value |
|---|---|
| GitHub | #378 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, android-tablet, ios-phone, android-phone, web |
| Areas | pdf, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-006](pdf.md#sn-pdf-006) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `OWASP-A01`, `CWE-20`, `CWE-434`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
Users expect to share a PDF into Sane Notes from Files, a browser, or another app (iOS share sheet / Android send-intent / PWA share_target), and to set Sane Notes as the handler for opening a .pdf (PRD-LB-133; docs/platform/android.md, docs/platform/ipad.md, docs/platform/web.md line 123/126). This inbound path crosses the outside-world trust boundary (TB1) and is a classic intent-redirection / unrestricted-file-type surface, so it must validate the payload, land in a view/confirm context, and never auto-mutate state or auto-import without an explicit user action (docs/security/secure-coding-checklist.md §1.1, §5; TM-S-04/TM-E-02).

#### Scope
**In:** iOS/iPadOS document/share extension receiving a PDF; Android intent-filter (ACTION_SEND / ACTION_VIEW for application/pdf) with `exported` correctly scoped and extras validated; PWA `share_target` (POST multipart) and `file_handlers` for .pdf on Chromium; a confirm-and-place screen (choose target notebook or new notebook) before ingest; routing accepted bytes through the same import + validation path as [SN-PDF-006](pdf.md#sn-pdf-006).
**Out:** the file-picker/link import ([SN-PDF-006](pdf.md#sn-pdf-006)), the free-plan meter ([SN-PDF-007](pdf.md#sn-pdf-007)), and .sanenote deep-link handling (SN-SHR).

#### Acceptance criteria
- [ ] Sharing a PDF from another app opens Sane Notes in a confirm-and-place screen; nothing is imported until the user confirms (view/confirm context, TM-S-04).
- [ ] Android components handling the intent validate action/type/extras; nothing sensitive is exported without guard, and a forged/implicit intent cannot mutate state (test).
- [ ] A non-PDF or oversize shared payload is rejected by the validation gate ([SN-PDF-023](pdf.md#sn-pdf-023)) with a user-safe error.
- [ ] The PWA share_target and file_handlers import a .pdf on a supporting browser; unsupported browsers degrade gracefully (feature-detected).
- [ ] The shared file imports into a new isolated notebook by default (never overwrites an existing note by a path from the payload, CWE-22).

#### Technical notes
Manifest/Info.plist config plus a thin native handoff to `sane_pdf` import. Android: `exported` only where required, `FLAG_IMMUTABLE` on any PendingIntent, validate all extras (docs/security/secure-coding-checklist.md §5; TM-E-02). iOS: a Share/Action extension or `UTType.pdf` document type; hand bytes to the app group, not a world path. Web: `share_target` with `method: POST`, `multipart/form-data` and `launchQueue` file handlers (docs/platform/web.md). All bytes go through [SN-PDF-023](pdf.md#sn-pdf-023) then [SN-PDF-006](pdf.md#sn-pdf-006).

#### Security & privacy
Inbound share/intent is untrusted (TB1): validate type/size, confirm before import, land in view context, never auto-import/auto-share (TM-S-04, TM-E-02, MASVS-PLATFORM-1). Path-confine any file reference; import into an isolated notebook (TM-T-06, CWE-22). Do not log payloads or source-app identifiers (TM-I-05). IDs: MASVS-PLATFORM-1, MASVS-PLATFORM-2, OWASP-A01, CWE-20, CWE-434, CWE-22.

#### UX notes
Surface: a confirm-and-place sheet reusing the Import overlay visual language (screens §9). Show the file name and a target picker (existing notebook / new notebook). Renders in all 17 looks + dark mode; 44 pt / 48 dp targets; VoiceOver/TalkBack labels; keyboard-reachable confirm on web. Error and offline states are explicit.

#### Test plan
`packages/sane_pdf/test/import/share_in_test.dart` (confirm-before-import, isolated-notebook default), an Android intent-validation test, a `patrol`/integration test for the share sheet, and a web share_target integration check.

#### Dependencies
[SN-PDF-006](pdf.md#sn-pdf-006) (import + validation path). Coordinates with SN-SHR (deep links), SN-AND-001/SN-IPAD-001/SN-WEB-001 (platform shells).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-009

<a id="sn-pdf-009"></a>

**Extract PDF text layers with search bounds (quads) for indexing**

| Field | Value |
|---|---|
| GitHub | #379 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, search |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-400`, `CWE-611` |
| Extra labels | agent-ready |

#### Context
A PDF's text must become searchable and its text runs must be locatable so the Smart Highlighter can snap to them and search results can deep-link to on-page quads (docs/adr/0014-pdf-engine.md Decision 4; docs/product/prd-02-library-documents-audio-search.md PRD-LB-131, PRD-LB-260/261). This feature extracts the text layer on first open, produces per-run text with page-space bounds (quads), and emits index rows for the FTS pipeline; PDFs lacking a text layer are flagged for OCR-on-import (PRD-LB-305, owned by SN-HWR). Extraction runs on a background isolate and streams page-by-page so it never blocks the UI (PRD-LB-360/361).

#### Scope
**In:** text extraction per page with word/run text and page-space quads via `syncfusion_flutter_pdf` text bounds (and pdfrx text where sufficient); a `SearchIndexRow` emitter (docId, pageIndex, source=pdf, text, quads, lang); a `hasTextLayer` flag per document; a hook that marks text-layerless PDFs for OCR (handoff to SN-HWR); background-isolate execution with incremental progress.
**Out:** the FTS5 index itself (SN-SRCH-002), the in-document find bar ([SN-PDF-010](pdf.md#sn-pdf-010)), the Smart Highlighter that consumes quads ([SN-PDF-014](pdf.md#sn-pdf-014)), and OCR engines (SN-HWR-001).

#### Acceptance criteria
- [ ] Extraction yields per-run text with page-space quads that, when highlighted, align to the rendered glyphs within a small tolerance (golden overlay test).
- [ ] `SearchIndexRow`s are emitted with docId, pageIndex, quads, and detected language for a text-bearing fixture (schema test).
- [ ] A text-layerless (scanned) PDF sets `hasTextLayer=false` and is queued for OCR, not indexed as empty.
- [ ] Extraction runs off the UI isolate and streams per page; a 600-page document reports progress and never blocks scroll (PRD-LB-360/361).
- [ ] Extraction is resource-capped and fails closed on a malformed text object (no crash, no partial index of a rejected doc).

#### Technical notes
Create `packages/sane_pdf/lib/src/text/text_extractor.dart`. Use `syncfusion_flutter_pdf` for text + bounds (quads) and `PdfEngine` text handles; verify the exact quad/bounds API shapes against library docs before relying on them (ADR-0014 Consequences flags these as unverified; confirm the Syncfusion Community License eligibility per release, ADR-0014 verify 6). Quads are stored in PDF points, page-relative, so they survive zoom/DPI (ADR-0014 Decision 3). Rows feed SN-SRCH-002. PDFs are XML/structured containers: disable external entity resolution when parsing any embedded XML (CWE-611).

#### Security & privacy
Extracted text is note content: index locally, never log, never egress (TM-I-05, decision 3). Bound extraction memory/time to defend against a malformed text tree (TM-D-01, CWE-400); disable XXE on any XML in the PDF (CWE-611). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-400, CWE-611.

#### UX notes
No direct chrome; this backs search (screens §11) and the Smart Highlighter ([SN-PDF-014](pdf.md#sn-pdf-014)). Language detection feeds the per-notebook recognition language picker (PRD-LB-303/371). A11y: extracted PDF text provides the accessible reading of otherwise image-like pages.

#### Test plan
`packages/sane_pdf/test/text/text_extractor_test.dart` (run text + quads accuracy, hasTextLayer flag, index-row schema, off-isolate, fail-closed), a golden quad-overlay test, and malformed fixtures from [SN-PDF-024](pdf.md#sn-pdf-024).

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (engine + text handles). Feeds SN-SRCH-002 (FTS index); hands off to SN-HWR-001 (OCR).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-010

<a id="sn-pdf-010"></a>

**Add in-document PDF find with next/prev, highlight, and counter**

| Field | Value |
|---|---|
| GitHub | #380 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, search |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-009](pdf.md#sn-pdf-009) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Readers need to find a phrase inside the open PDF without leaving the document, matching the in-note find behaviour the app promises on every platform (docs/product/prd-02-library-documents-audio-search.md PRD-LB-264; docs/adr/0014-pdf-engine.md Decision 1 lists pdfrx text search). This is distinct from global library search (SN-SRCH, M4): it searches only the currently-open PDF's text layer, streams matches incrementally page-by-page, highlights them, and lets the user step next/prev with a match counter. It reuses the extracted quads ([SN-PDF-009](pdf.md#sn-pdf-009)) so a match scrolls to and highlights the exact on-page location (PRD-LB-261).

#### Scope
**In:** a find bar (Cmd+F / Ctrl+F) over the open PDF; incremental page-by-page search (never block on a whole-doc scan); next/prev navigation with scroll-to-match; match highlighting using page-space quads; a match counter (e.g. '3 of 27'); case-insensitive default with a match-case toggle.
**Out:** global cross-notebook search (SN-SRCH), handwriting/audio search, and the FTS index ([SN-PDF-009](pdf.md#sn-pdf-009) feeds that separately).

#### Acceptance criteria
- [ ] Cmd+F/Ctrl+F opens the find bar over the open PDF; typing streams matches page-by-page without freezing the UI (PRD-LB-264, incremental per ADR-0014 Decision 6).
- [ ] Next/prev scrolls to and highlights each match using page-space quads; the highlight aligns to the glyphs (golden).
- [ ] The counter shows current/total and updates as incremental results arrive.
- [ ] Clearing/closing the find bar removes highlights and returns focus to the canvas.
- [ ] Empty query and no-match states show a clear, user-safe message; a very large result set stays responsive (capped streaming).

#### Technical notes
Create `packages/sane_pdf/lib/src/search/in_doc_find.dart` and a `PdfFindBar` widget. Drive search via `PdfEngine`/pdfrx text search returning page hits with rects, mapped to quads from [SN-PDF-009](pdf.md#sn-pdf-009); verify pdfrx's search-rect API before relying on it (ADR-0014 Decision 1). Highlights composite over the page raster like the annotation overlay. Cap concurrent result buffering (CWE-400). Implements PRD-LB-264.

#### Security & privacy
None beyond baseline: the query and matches are note content, kept on device, never logged (TM-I-05). Bound streamed result buffers (TM-D-01, CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
Surface: an in-document find bar consistent with the Search visual language (screens §11) but scoped to the open PDF. Renders in all 17 looks + dark mode; highlight colour from design tokens; 44 pt targets; keyboard shortcuts and focus order correct on web; VoiceOver/TalkBack announces 'N of M matches'. Empty/no-match copy: 'No matches in this document.'

#### Test plan
`packages/sane_pdf/test/search/in_doc_find_test.dart` (incremental streaming, next/prev, counter, clear), golden highlight-alignment test, widget test for shortcuts + focus.

#### Dependencies
[SN-PDF-009](pdf.md#sn-pdf-009) (text + quads). Distinct from SN-SRCH-002 (global FTS).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-011

<a id="sn-pdf-011"></a>

**Load PDF outlines/bookmarks navigation with manual entries**

| Field | Value |
|---|---|
| GitHub | #381 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Long PDFs (textbooks, papers, planners) are only navigable with their outline/TOC, and Sane Notes must load the embedded outline, jump to a heading on tap, support expand/collapse, and let users add their own manual outline entries where the PDF has none (docs/product/prd-02-library-documents-audio-search.md PRD-LB-139; docs/adr/0014-pdf-engine.md notes pdfrx outline support). Manual entries make an un-outlined scan navigable and let a page appear under multiple headings (PRD-LB-139). This is the reading-navigation backbone that hyperlinked planners ([SN-PDF-012](pdf.md#sn-pdf-012)) and the page overview ([SN-PDF-005](pdf.md#sn-pdf-005)) build on.

#### Scope
**In:** parse and display the PDF's embedded outline/TOC (nested, expand/collapse); jump-to-page on tap; a manual outline model persisted in our DB (add/rename/remove entries, a page can appear under multiple items); a combined view of embedded + manual entries.
**Out:** hyperlink following ([SN-PDF-012](pdf.md#sn-pdf-012)), the thumbnail scrubber ([SN-PDF-005](pdf.md#sn-pdf-005)), and AI auto-outline generation (deferred, PRD-LB-139 MAY).

#### Acceptance criteria
- [ ] The embedded outline renders nested with working expand/collapse; tapping a heading jumps to its destination page (PRD-LB-139).
- [ ] A PDF with no embedded outline shows an empty state and allows adding manual entries.
- [ ] Manual entries persist in the DB, survive reopen, and a single page can be referenced by multiple entries.
- [ ] Outline destinations resolve to the correct page even after page operations (reorder/insert) via stable page ids ([SN-PDF-017](pdf.md#sn-pdf-017)).
- [ ] A malformed/oversized outline tree is bounded and fails closed to 'no outline', never crashes (CWE-20/CWE-400).

#### Technical notes
Create `packages/sane_pdf/lib/src/outline/outline_service.dart` and an `OutlinePanel` widget. Read the embedded outline via `PdfEngine`/pdfrx outline API (verify shapes, ADR-0014 Decision 1). Manual entries are document objects in our model (SN-CORE-002) keyed to stable page ids so they survive reorder. Destinations map to the viewer's page-position model ([SN-PDF-003](pdf.md#sn-pdf-003)). Implements PRD-LB-139.

#### Security & privacy
None beyond baseline: outline titles are note content, never logged (TM-I-05). Validate/bound the outline tree from the untrusted PDF (CWE-20). IDs: MASVS-PRIVACY-1, CWE-20.

#### UX notes
Surface: an outline/TOC panel in the reading chrome (screens §7.7 page tools). Renders in all 17 looks + dark mode; nested rows with disclosure; empty state 'This PDF has no outline - add your own'; 44 pt / 48 dp targets; keyboard-navigable tree on web; VoiceOver/TalkBack tree semantics with expand/collapse state.

#### Test plan
`packages/sane_pdf/test/outline/outline_service_test.dart` (parse nested, jump, manual add/rename/remove, multi-parent, survive reorder, malformed fail-closed), widget test for the panel, golden per look.

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (engine outline handle). Coordinates with [SN-PDF-017](pdf.md#sn-pdf-017) (stable page ids), SN-CORE-002 (object model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-012

<a id="sn-pdf-012"></a>

**Follow PDF hyperlinks (in-doc GoTo and external URL) with confirm**

| Field | Value |
|---|---|
| GitHub | #382 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-NETWORK-1`, `OWASP-A10`, `CWE-601`, `CWE-918` |
| Extra labels | agent-ready |

#### Context
PDFs and hyperlinked digital planners rely on links: in-document GoTo links (tab -> month/week/day) and external URL links must be preserved and followed, and on export the link annotations must stay live so navigation survives (docs/product/prd-02-library-documents-audio-search.md PRD-LB-140, PRD-LB-097; docs/adr/0014-pdf-engine.md Decision 4). External links are an SSRF/open-redirect surface: a link embedded in an untrusted PDF must never auto-navigate or fetch; it lands in a confirm step and only opens over an allow-listed scheme (docs/security/secure-coding-checklist.md §1.1; TM-I-06, TM-S-04).

#### Scope
**In:** parse link annotations (GoTo + URI) via the engine; follow GoTo links by scrolling to the destination page; open external URLs only after a user confirm and only for https (with a visible destination); keep link annotations live (not flattened) so planner navigation works and survives export.
**Out:** the outline TOC ([SN-PDF-011](pdf.md#sn-pdf-011)), export flattening rules ([SN-PDF-019](pdf.md#sn-pdf-019)), and creating new link annotations ([SN-PDF-015](pdf.md#sn-pdf-015)).

#### Acceptance criteria
- [ ] Tapping an in-document GoTo link scrolls to the correct destination page (PRD-LB-140, PRD-LB-097 planner tabs).
- [ ] Tapping an external link shows a confirm with the full destination; it opens only over https; file:, javascript:, data: and non-https are blocked with a user-safe message (TM-I-06, CWE-601).
- [ ] No link auto-navigates or fetches on page render/scroll (view/confirm only, TM-S-04).
- [ ] Link annotations remain live through the with-annotations export path ([SN-PDF-019](pdf.md#sn-pdf-019)); a round-trip preserves navigation.
- [ ] Destinations resolve correctly after page operations via stable page ids ([SN-PDF-017](pdf.md#sn-pdf-017)).

#### Technical notes
Create `packages/sane_pdf/lib/src/links/link_service.dart`. Read link annotations via `PdfEngine`/pdfrx link handling; GoTo destinations map to the viewer page-position model. External open uses the platform URL launcher behind an https-only scheme allow-list; strip referrers (docs/security/secure-coding-checklist.md §1.1). Never pass a PDF-derived URL into a WebView or network client without allow-listing (CWE-918). Implements PRD-LB-140.

#### Security & privacy
External links from an untrusted PDF are hostile (TB1): confirm before open, https-only allow-list, no auto-fetch, no internal-address navigation, referrer stripped (TM-I-06, TM-S-04, OWASP-A10, CWE-601, CWE-918). Never log link URLs (TM-I-05). IDs: MASVS-PLATFORM-1, MASVS-NETWORK-1, OWASP-A10, CWE-601, CWE-918.

#### UX notes
Surface: link tap in the PDF facsimile (screens §7.2). External link confirm sheet shows the full URL and a warning tone for non-obvious destinations. Renders in all 17 looks + dark mode; 44 pt targets; VoiceOver/TalkBack announces link role and destination; keyboard activation on web.

#### Test plan
`packages/sane_pdf/test/links/link_service_test.dart` (GoTo scroll, external confirm + https-only guard, no-auto-navigate, survive reorder, live through export), a scheme-allow-list negative test.

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (engine link handle). Coordinates with [SN-PDF-017](pdf.md#sn-pdf-017) (stable page ids), [SN-PDF-019](pdf.md#sn-pdf-019) (keep links live on export).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-013

<a id="sn-pdf-013"></a>

**Implement the PDF ink/highlight annotation overlay (DB source of truth)**

| Field | Value |
|---|---|
| GitHub | #383 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, ink |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002), [SN-INK-001](ink.md#sn-ink-001), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `OWASP-A08`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
Sane Notes' differentiator is that annotations are OUR ink: pressure-, tilt-, and audio-synced strokes drawn with the Sane Notes ink engine on a layer composited over the PDF, not the SDK's flat annotations (docs/adr/0014-pdf-engine.md Decision 2/3; docs/product/prd-02-library-documents-audio-search.md PRD-LB-136). Marks are stored in our SQLite DB as the source of truth, with geometry in PDF points (page user-space), page-relative, so they survive zoom/DPI and re-flow to any renderer, and per-point stroke timestamps are persisted for audio sync (ADR-0014 Decision 3; research A.2 annotation model). Annotations are live and non-destructive: they never modify the underlying page content (PRD-LB-136). This issue wires the ink pipeline over the PDF viewer as one shared wet/committed layering (docs/architecture/rendering-and-performance.md §5).

#### Scope
**In:** the annotation layer composited over the PDF page raster using the ink engine's wet/committed layering; the `Annotation` object model (type, pageIndex, geometry in PDF points, inkPaths with per-point pressure + t, audioAnchorMs) persisted via SN-CORE; page-space <-> screen-space coordinate mapping that holds across zoom/scroll; ink (pen) and highlighter marks that are movable/editable/deletable (live).
**Out:** the Smart Highlighter text-snap ([SN-PDF-014](pdf.md#sn-pdf-014)); FreeText/Note/Shape/Stamp types ([SN-PDF-015](pdf.md#sn-pdf-015)); XFDF interop ([SN-PDF-016](pdf.md#sn-pdf-016)); export flatten ([SN-PDF-019](pdf.md#sn-pdf-019)); the ink engine internals (SN-INK).

#### Acceptance criteria
- [ ] Ink/highlighter strokes drawn over a PDF store geometry in PDF points, page-relative, with per-point pressure and t (schema + round-trip test).
- [ ] Marks re-render at the identical page location across 25%/100%/400% zoom and after scroll (coordinate round-trip golden).
- [ ] Annotations are non-destructive: the underlying page bytes are never modified; deleting a mark leaves the page intact.
- [ ] Drawing over a PDF meets the same pen-down->pixel latency budget as a blank page on the reference devices (perf gate [SN-PDF-026](pdf.md#sn-pdf-026)).
- [ ] Marks are movable/editable/deletable and persist byte-for-byte across close/reopen.

#### Technical notes
Create `packages/sane_pdf/lib/src/annotate/annotation_layer.dart` and the page-space mapping in `coord_map.dart`. The ink comes from SN-INK-001 (capture/filter/geometry/render) composited via the same `RepaintBoundary` wet layer used for blank pages (docs/architecture/rendering-and-performance.md §5). `Annotation` rows follow research A.2 and are CRDT objects in the document model (SN-CORE-002/003); geometry in PDF points per ADR-0014 Decision 3. Per-point t enables audio sync (ADR-0015, SN-AUD). Coordinate mapping uses `PdfEngine` page size (points) vs rendered size.

#### Security & privacy
Annotations are note content: local, never logged, content-addressed and E2E-encrypted before any sync write ([SN-PDF-025](pdf.md#sn-pdf-025), decision 3, TM-I-01/05). Non-destructive overlay preserves source integrity (OWASP-A08). Validate page indices and geometry from any imported marks (CWE-20). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, OWASP-A08, CWE-20.

#### UX notes
Surface: drawing over the PDF facsimile with the standard pen/highlighter tools (screens §7.2). Highlighter over PDF text is legible in all 17 looks + dark mode (blend mode preserves PDF colours, [SN-PDF-027](pdf.md#sn-pdf-027)). 44 pt targets on mark handles; VoiceOver/TalkBack exposes marks as objects with OCR-backed descriptions where applicable; keyboard delete on web.

#### Test plan
`packages/sane_pdf/test/annotate/annotation_layer_test.dart` (PDF-point geometry, zoom/scroll round-trip, non-destructive, persist reopen), golden overlay tests per look, latency scenario in [SN-PDF-026](pdf.md#sn-pdf-026).

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (viewer/engine), SN-INK-001 (ink engine), SN-CORE-002 (object model). Feeds [SN-PDF-016](pdf.md#sn-pdf-016) (XFDF) and [SN-PDF-019](pdf.md#sn-pdf-019) (export).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-014

<a id="sn-pdf-014"></a>

**Implement the Smart Highlighter (snap-to-text) and straight-line highlighter**

| Field | Value |
|---|---|
| GitHub | #384 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-009](pdf.md#sn-pdf-009), [SN-PDF-013](pdf.md#sn-pdf-013), [SN-BRS-018](brushes.md#sn-brs-018) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
Highlighting PDF text is only satisfying when the mark snaps cleanly to text runs rather than smearing freehand, so Sane Notes ships a Smart Highlighter that snaps to PDF text quads plus a straight-line highlighter (draw-then-hold to straighten) (docs/product/prd-02-library-documents-audio-search.md PRD-LB-137). This uses the extracted text quads ([SN-PDF-009](pdf.md#sn-pdf-009)) to align a highlight annotation to the underlying runs, reuses the annotation overlay ([SN-PDF-013](pdf.md#sn-pdf-013)) so the result is our live, editable mark (not a flattened SDK annotation), and consumes the highlighter tool + straight-line/smart-snap behaviour from [SN-BRS-018](brushes.md#sn-brs-018) (the brush engine owns the tool; this issue owns the PDF text-markup). It is a direct answer to competitors' text-markup and a differentiator when combined with our audio-synced ink.

#### Scope
**In:** the PDF text-markup layer that consumes the highlighter tool + straight-line/smart-snap behaviour from [SN-BRS-018](brushes.md#sn-brs-018) and the PDF text quads from [SN-PDF-009](pdf.md#sn-pdf-009): hit-testing a drag against text quads to produce highlight geometry snapped to whole runs/lines; long-press-select to markup a span (highlight/underline/strikeout/squiggly using the text quads); text-markup annotations persisted as live objects (page-space geometry) via the overlay ([SN-PDF-013](pdf.md#sn-pdf-013)).
**Out:** the highlighter tool, its palette toggle, the straight-line dwell mode and the generic smart-snap/anchor model - owned by [SN-BRS-018](brushes.md#sn-brs-018), which this layer consumes; the base overlay/coordinate mapping ([SN-PDF-013](pdf.md#sn-pdf-013)); text extraction ([SN-PDF-009](pdf.md#sn-pdf-009)); FreeText/Note/Shape/Stamp ([SN-PDF-015](pdf.md#sn-pdf-015)); shape recognition on blank pages (SN-SHP).

#### Acceptance criteria
- [ ] Dragging in Smart Highlighter mode snaps the highlight to the covered text runs; the mark aligns to glyph bounds within tolerance (golden).
- [ ] Long-press-select produces highlight/underline/strikeout/squiggly snapped to the selected quads (PRD-LB-137).
- [ ] The straight-line highlighter straightens a freehand highlight on hold while keeping it a live, editable mark.
- [ ] On a text-layerless page, Smart Highlighter degrades gracefully to freehand highlight with a hint (no crash, no empty mark).
- [ ] Text-markup marks re-render at the correct page location across zoom/scroll and persist across reopen.

#### Technical notes
Create `packages/sane_pdf/lib/src/annotate/smart_highlighter.dart`. Consume text quads from [SN-PDF-009](pdf.md#sn-pdf-009); build markup geometry (union of covered quads) in PDF points; render via the annotation overlay ([SN-PDF-013](pdf.md#sn-pdf-013)). Straightening reuses the ink engine's straight-line/shape hold path (SN-INK/SN-SHP). Implements PRD-LB-137; text-markup subtypes map to PDF Highlight/Underline/StrikeOut/Squiggly for XFDF export ([SN-PDF-016](pdf.md#sn-pdf-016)).

#### Security & privacy
None beyond baseline: markup geometry and selected text are note content, on device, never logged (TM-I-05). Validate quad indices from extraction before building geometry (CWE-20). IDs: MASVS-PRIVACY-1, CWE-20.

#### UX notes
Surface: highlighter tool over the PDF facsimile (screens §7.2, §7.3). The Smart vs freehand highlighter is a tool option; the snap must feel instant. Highlight colours from design tokens, legible over PDF text in all 17 looks + dark mode. 44 pt targets on the selection handles; VoiceOver/TalkBack announces the marked text; keyboard select on web.

#### Test plan
`packages/sane_pdf/test/annotate/smart_highlighter_test.dart` (snap accuracy, markup subtypes, straighten-on-hold, text-layerless fallback, zoom/scroll persistence), golden per look.

#### Dependencies
[SN-BRS-018](brushes.md#sn-brs-018) (highlighter tool + straight-line/smart-snap), [SN-PDF-009](pdf.md#sn-pdf-009) (text quads), [SN-PDF-013](pdf.md#sn-pdf-013) (annotation overlay). Feeds [SN-PDF-016](pdf.md#sn-pdf-016) (XFDF markup subtypes).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-015

<a id="sn-pdf-015"></a>

**Add FreeText, Note, Shape, and Stamp/Image annotations on PDFs**

| Field | Value |
|---|---|
| GitHub | #385 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-013](pdf.md#sn-pdf-013) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-20`, `CWE-434` |
| Extra labels | agent-ready |

#### Context
Beyond ink and highlight, PDF annotation must support typed FreeText, a sticky Note comment, geometric Shapes (line/rect/oval/polygon), and Image/Stamp marks, all as live, non-destructive objects layered over the page (docs/product/prd-02-library-documents-audio-search.md PRD-LB-137; docs/adr/0014-pdf-engine.md Decision 2 lists the standard subtypes). These reuse the annotation overlay and coordinate mapping from [SN-PDF-013](pdf.md#sn-pdf-013) and our existing text/shape/image tooling, and they map cleanly onto the PDF annotation subtypes for XFDF export ([SN-PDF-016](pdf.md#sn-pdf-016)). Inserted images/stamps must be validated as untrusted media before decode (docs/security/secure-coding-checklist.md §1).

#### Scope
**In:** FreeText (typed text object placed on a page); Note (sticky comment, expandable); Shape (line/rect/oval/polygon with stroke+fill styling, editable vertices); Image/Stamp (insert an image as a page-space mark, movable/resizable); persistence as live document objects in page-space geometry; z-order among annotations.
**Out:** the base overlay ([SN-PDF-013](pdf.md#sn-pdf-013)); Smart Highlighter text markup ([SN-PDF-014](pdf.md#sn-pdf-014)); AcroForm form widgets ([SN-PDF-022](pdf.md#sn-pdf-022)); the full image editor and stickers library (SN-MED / PRD-LB-181/183).

#### Acceptance criteria
- [ ] FreeText, Note, Shape, and Stamp/Image marks can be created, moved, resized, restyled, and deleted; all are non-destructive (page bytes unchanged).
- [ ] Each mark stores page-space geometry (PDF points) and re-renders at the correct location across zoom/scroll and after reopen.
- [ ] An inserted image is validated (type/size/dimensions) before decode and rejected safely if hostile (CWE-434, off-isolate per §1).
- [ ] Shapes expose editable vertices/handles and snap options consistent with the editor shape tool.
- [ ] Marks map to the correct PDF annotation subtypes for XFDF export ([SN-PDF-016](pdf.md#sn-pdf-016)).

#### Technical notes
Create `packages/sane_pdf/lib/src/annotate/annotation_types.dart`. Reuse the editor's text object (SN-TXT), shape tool (SN-SHP), and image insert (SN-MED) rendered through the annotation overlay ([SN-PDF-013](pdf.md#sn-pdf-013)); geometry in PDF points (ADR-0014 Decision 3). Image bytes are validated and decoded off the UI isolate with dimension caps (docs/security/secure-coding-checklist.md §1; TM-D-01). Subtype mapping: FreeText->FreeText, Note->Text/Popup, Shape->Line/Square/Circle/Polygon, Image->Stamp (ADR-0014 Decision 2).

#### Security & privacy
Marks and inserted media are note content: local, never logged, E2E-encrypted before sync (TM-I-05, decision 3). Inserted images are untrusted input: validate type/size/dimensions, decode off-isolate, strip EXIF where required (PRD-LB-180), fail closed (TM-D-01, CWE-434). Validate geometry from imported marks (CWE-20). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-20, CWE-434.

#### UX notes
Surface: annotation tools over the PDF facsimile (screens §7.2, §7.4). Sticky Note collapses to an icon and expands on tap. Renders in all 17 looks + dark mode; 44 pt / 48 dp targets; VoiceOver/TalkBack exposes each mark type and its content; keyboard editing of FreeText on web. Empty Note shows a placeholder; oversize image shows a user-safe error.

#### Test plan
`packages/sane_pdf/test/annotate/annotation_types_test.dart` (create/move/resize/delete each type, page-space persistence, subtype mapping, hostile-image rejection), golden per look for each mark type.

#### Dependencies
[SN-PDF-013](pdf.md#sn-pdf-013) (annotation overlay). Coordinates with SN-TXT-001, SN-SHP-001, SN-MED-001; feeds [SN-PDF-016](pdf.md#sn-pdf-016).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-016

<a id="sn-pdf-016"></a>

**Round-trip PDF annotations to XFDF (export and import)**

| Field | Value |
|---|---|
| GitHub | #386 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-013](pdf.md#sn-pdf-013), [SN-PDF-015](pdf.md#sn-pdf-015) |
| Security controls | `MASVS-CODE-2`, `MASVS-PRIVACY-1`, `OWASP-A05`, `CWE-611`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
XFDF (ISO 19444-1) is the interop format for round-tripping annotations independently of the PDF, so marks can be exchanged with Acrobat/Preview without locking them inside the file (docs/adr/0014-pdf-engine.md Decision 4; docs/product/prd-02-library-documents-audio-search.md PRD-LB-143). Because our DB is the source of truth, XFDF is an export/interop projection: we serialise our live annotations to XFDF and import external XFDF back into our model with page-space geometry preserved (ADR-0014 verify 2). XFDF is XML, so parsing untrusted XFDF must disable external entities to avoid XXE (docs/security/secure-coding-checklist.md §1; CWE-611).

#### Scope
**In:** export our annotations (ink, text-markup, FreeText, Note, Shape, Stamp) to XFDF with page-space geometry; import external XFDF into our annotation model; a mapping table between our subtypes and XFDF/PDF annotation subtypes; XXE-safe XML parsing; a round-trip validation.
**Out:** flattened/searchable PDF export ([SN-PDF-019](pdf.md#sn-pdf-019)/[SN-PDF-020](pdf.md#sn-pdf-020)), print ([SN-PDF-021](pdf.md#sn-pdf-021)), and the annotation editing UI ([SN-PDF-013](pdf.md#sn-pdf-013)/[SN-PDF-015](pdf.md#sn-pdf-015)).

#### Acceptance criteria
- [ ] Our marks -> XFDF -> re-import reproduces page-space geometry within tolerance and opens correctly in Acrobat/Preview (ADR-0014 verify 2).
- [ ] Each supported subtype maps correctly both directions (mapping-table test).
- [ ] Importing untrusted XFDF disables external entity resolution (XXE); a malicious entity payload is neutralised and the import fails closed (CWE-611).
- [ ] Unknown/oversize XFDF elements are rejected in strict-parse mode with a user-safe error, never a partial import (CWE-20, §1).
- [ ] Ink stroke pressure/points survive export where XFDF supports it; unsupported detail is documented as a known lossy edge.

#### Technical notes
Create `packages/sane_pdf/lib/src/interop/xfdf_codec.dart`. Use `syncfusion_flutter_pdf` where it provides XFDF, else a hardened XML codec with entity resolution disabled (secure XML parser config; docs/security/secure-coding-checklist.md §1). Geometry stays in PDF points (ADR-0014 Decision 3). Subtype mapping mirrors [SN-PDF-015](pdf.md#sn-pdf-015). Confirm Syncfusion Community License eligibility per release (ADR-0014 verify 6).

#### Security & privacy
XFDF import is untrusted input (TB3): XXE-safe parsing, schema validation, size caps, fail closed (CWE-611, CWE-20, OWASP-A05, TM-D-01/TM-T-06). Annotations are note content: never logged; export is an explicit user action (TM-I-05, decision 3). IDs: MASVS-CODE-2, MASVS-PRIVACY-1, OWASP-A05, CWE-611, CWE-20.

#### UX notes
Surface: an export/interop option in the Export flow (screens §10). Import XFDF via the import path with a confirm step. Success/error toasts are user-safe; a lossy round-trip warns the user which detail may not transfer. No themed content of its own; any dialogs render in all 17 looks + dark mode with a11y labels.

#### Test plan
`packages/sane_pdf/test/interop/xfdf_codec_test.dart` (round-trip geometry, subtype mapping both ways, XXE-safe import, strict-parse rejection), fixtures include a malicious-entity XFDF from [SN-PDF-024](pdf.md#sn-pdf-024).

#### Dependencies
[SN-PDF-013](pdf.md#sn-pdf-013), [SN-PDF-015](pdf.md#sn-pdf-015) (annotation model + subtypes).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-017

<a id="sn-pdf-017"></a>

**Implement PDF page operations (insert, rotate, delete, reorder, go-to)**

| Field | Value |
|---|---|
| GitHub | #387 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
PDF-backed and paged notebooks must support page management from the page rail: add before/after, duplicate, rotate, reorder (drag), delete-to-trash, clear page, and go-to-page, all undoable (docs/product/prd-02-library-documents-audio-search.md PRD-LB-142; screens Open Question 11). Because our DB is the source of truth and annotations are keyed to stable page ids, page operations must remap outline destinations, hyperlinks, and annotations correctly rather than mutating the source PDF bytes. Reorder and delete must be undoable and, once sync lands, propagate as CRDT ops (PRD-LB-142; SN-CORE-003).

#### Scope
**In:** insert page before/after (blank or PDF page), duplicate page, rotate page (90/180/270), reorder via drag in the page rail, delete-to-trash, clear page, go-to-page; stable page ids that annotations/outline/links reference; undo/redo for every operation; keeping the source PDF bytes immutable (operations act on our page model, not the file).
**Out:** merge across documents ([SN-PDF-018](pdf.md#sn-pdf-018)), the thumbnail rail rendering ([SN-PDF-005](pdf.md#sn-pdf-005)), trash purge (SN-LIB / PRD-LB-065), and blank page kinds (SN-PG).

#### Acceptance criteria
- [ ] Insert/duplicate/rotate/reorder/delete/clear/go-to all work from the page rail and are individually undoable (PRD-LB-142).
- [ ] Rotation is a view/model transform; the source PDF bytes are never rewritten (test asserts blob hash unchanged).
- [ ] Annotations, outline destinations, and hyperlinks follow their page across reorder/insert via stable page ids (no dangling references).
- [ ] Delete moves the page to trash (restorable), not a hard delete; restore returns it to the correct position.
- [ ] A bulk reorder is a single undoable transaction; page indices remain valid (bounds-checked, CWE-20).

#### Technical notes
Create `packages/sane_pdf/lib/src/pages/page_ops.dart`. Operations mutate the page-order model in SN-CORE (document objects, CRDT LWW/order per SN-CORE-003), never the PDF blob; rotation stores a per-page rotation applied at render. Stable page ids are the anchor for annotations/outline/links ([SN-PDF-011](pdf.md#sn-pdf-011)/[SN-PDF-012](pdf.md#sn-pdf-012)/[SN-PDF-013](pdf.md#sn-pdf-013)). Trash uses the library trash model (PRD-LB-065). Implements PRD-LB-142.

#### Security & privacy
None beyond baseline: page model is note content, never logged (TM-I-05). Bounds-check page indices from any UI/import to avoid out-of-range writes (CWE-20). Source PDF integrity preserved (non-destructive). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-20.

#### UX notes
Surface: page rail / page menu (screens §7.7, Open Question 11). Drag-to-reorder with haptic/visual feedback; undo toast after destructive ops. Renders in all 17 looks + dark mode; 44 pt / 48 dp targets; VoiceOver/TalkBack reorder actions; keyboard reorder on web. Empty page rail and single-page edge cases handled.

#### Test plan
`packages/sane_pdf/test/pages/page_ops_test.dart` (each op + undo/redo, blob-immutable rotation, reference remap across reorder, trash restore position, bulk transaction), widget test for the rail, golden per look.

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (engine), SN-CORE-002/003 (object model + CRDT). Coordinates with [SN-PDF-005](pdf.md#sn-pdf-005) (rail thumbnails), SN-LIB (trash).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-018

<a id="sn-pdf-018"></a>

**Merge and combine PDFs/notebooks and add margin space**

| Field | Value |
|---|---|
| GitHub | #388 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | pdf, pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-017](pdf.md#sn-pdf-017) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Study workflows need to combine documents: append one PDF's or notebook's pages into another and reorder across the merge, and widen a PDF page with blank margin space for handwriting (docs/product/prd-02-library-documents-audio-search.md PRD-LB-382, PRD-LB-138). These build directly on the page-operation model ([SN-PDF-017](pdf.md#sn-pdf-017)): merge is a cross-document page-order operation, and add-margin is a per-page canvas extension applied at render, both non-destructive to source bytes and undoable. PRD-LB-382 tags this M3 as sequencing after core PDF (M2); it depends on nothing from the recognition milestone beyond landing after page ops.

#### Scope
**In:** append/insert another PDF's or notebook's pages into the current notebook (referencing shared PDF blobs by content hash, not byte-copying); reorder across the merge; 'add margin space' (None/Left/Right/Both) that extends a PDF page's drawable area without altering the source; undo for merge and margin.
**Out:** page-level ops themselves ([SN-PDF-017](pdf.md#sn-pdf-017)), export ([SN-PDF-019](pdf.md#sn-pdf-019)), excerpt-to-note/backlinks (SN-LIB PRD-LB-384), and side-by-side reading views (deferred, PRD-LB-385 MAY).

#### Acceptance criteria
- [ ] Appending another PDF/notebook inserts its pages in order; pages can then be reordered across the merge boundary (PRD-LB-382).
- [ ] Merged PDF pages reference the source blob by content hash (dedup), and their annotations stay attached to the correct pages.
- [ ] Add-margin widens the drawable area (None/Left/Right/Both) without rewriting the source PDF bytes (blob hash unchanged; PRD-LB-138).
- [ ] Merge and margin are undoable in a single transaction each.
- [ ] Page counts and indices remain valid after merge (bounds-checked, CWE-20); a huge merge stays memory-bounded (CWE-400).

#### Technical notes
Create `packages/sane_pdf/lib/src/pages/merge_service.dart` and extend the page model with margin metadata. Merge composes page-order entries pointing at existing content-addressed PDF blobs (SN-CORE-004) so no bytes are duplicated; annotations keyed by stable page id follow (from [SN-PDF-017](pdf.md#sn-pdf-017)). Add-margin is a render-time canvas extension, not a source edit. Implements PRD-LB-382, PRD-LB-138.

#### Security & privacy
None beyond baseline: merged content is note content, never logged (TM-I-05); source PDFs unchanged (non-destructive). Bound merge size and validate indices (CWE-20, CWE-400, TM-D-01). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-20, CWE-400.

#### UX notes
Surface: page menu / 'combine' action and the paper/margin control (screens §7.7). Merge shows a source picker and a confirm; add-margin previews the widened page. Renders in all 17 looks + dark mode; 44 pt targets; a11y labels; keyboard on web. Undo toast after each.

#### Test plan
`packages/sane_pdf/test/pages/merge_service_test.dart` (append + cross-merge reorder, blob dedup, annotation follow, add-margin non-destructive, undo, bounds/memory caps).

#### Dependencies
[SN-PDF-017](pdf.md#sn-pdf-017) (page operations + stable ids). Coordinates with SN-CORE-004 (blob dedup).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-019

<a id="sn-pdf-019"></a>

**Export PDF flattened, with live annotations, and as PNG/JPEG**

| Field | Value |
|---|---|
| GitHub | #389 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-013](pdf.md#sn-pdf-013), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A08`, `CWE-22`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Users must be able to export a page or whole notebook as a flattened PDF (marks merged into content for final share/print), a PDF with live annotations (marks stay selectable; outlines and original hyperlinks preserved), and PNG/JPEG per page (docs/product/prd-02-library-documents-audio-search.md PRD-LB-143; docs/adr/0014-pdf-engine.md Decision 4). Export is a local, explicit user action; flatten happens only on export while live marks remain the working format (ADR-0014 Decision 4). Export-everything (PDF + .sanenote) is a free, anti-lock-in guarantee (PRD-LB-144), so this path must be robust and reachable on every plan.

#### Scope
**In:** flattened-PDF export (annotations rasterised/merged into page content); with-annotations export (live marks + preserved outlines + live hyperlinks per [SN-PDF-012](pdf.md#sn-pdf-012)); per-page PNG/JPEG; page-range and whole-notebook selection; writing to a user-chosen destination with path confinement; progress + cancel off the UI isolate.
**Out:** searchable-handwriting export ([SN-PDF-020](pdf.md#sn-pdf-020)), print ([SN-PDF-021](pdf.md#sn-pdf-021)), XFDF ([SN-PDF-016](pdf.md#sn-pdf-016)), .sanenote bundle writer (SN-CORE-005), and the share-sheet plumbing (SN-SHR).

#### Acceptance criteria
- [ ] Flattened export merges marks into page content; the result opens in any reader with marks visible but not selectable (golden/interop check).
- [ ] With-annotations export keeps marks selectable and preserves outlines and live hyperlinks (do not flatten links, PRD-LB-140).
- [ ] Per-page PNG/JPEG export produces correctly-sized images at a chosen DPI.
- [ ] Export runs off the UI isolate with progress and cancel; a large notebook does not block the UI (PRD-LB-361).
- [ ] Output is written only under the user-chosen directory (path-confined, no traversal, CWE-22); non-destructive to the source (OWASP-A08).

#### Technical notes
Create `packages/sane_pdf/lib/src/export/pdf_exporter.dart`. Use `syncfusion_flutter_pdf` for flatten and PDF/A and to preserve link annotations; render page images via `PdfEngine`; keep live-annotation export as our model + XFDF/live PDF annotations. Geometry from PDF points (ADR-0014 Decision 3). Confirm Syncfusion Community License eligibility per release (ADR-0014 verify 6). Path confinement per docs/security/secure-coding-checklist.md §1. Implements PRD-LB-143.

#### Security & privacy
Export is an explicit user action producing only content the user chose to export (TM-P-06). Path-confine the destination; reject traversal/absolute/symlink targets (CWE-22, §1). Source unchanged (OWASP-A08). Never log exported bytes or paths (TM-I-05). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, OWASP-A08, CWE-22, CWE-20.

#### UX notes
Surface: Export flow (screens §10) with format choices (PDF flattened / PDF editable / PNG / JPEG) and scope (page/range/notebook). Progress with cancel; success reveals the file. Renders in all 17 looks + dark mode; 44 pt targets; a11y labels; keyboard-reachable on web. Note the anti-lock-in 'yours to keep, even on Free' framing (PRD-LB-144).

#### Test plan
`packages/sane_pdf/test/export/pdf_exporter_test.dart` (flatten vs live, link preservation, PNG/JPEG sizing, off-isolate, path confinement), interop check opening exports in a reference reader, golden for image export.

#### Dependencies
[SN-PDF-013](pdf.md#sn-pdf-013) (annotation model), SN-CORE-005 (.sanenote for the bundle path). Coordinates with [SN-PDF-012](pdf.md#sn-pdf-012) (live links), [SN-PDF-021](pdf.md#sn-pdf-021) (print).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-020

<a id="sn-pdf-020"></a>

**Export searchable handwriting via an invisible OCR text layer**

| Field | Value |
|---|---|
| GitHub | #390 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | pdf, ocr-hwr |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-019](pdf.md#sn-pdf-019), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
Exported notes should be searchable even when they are handwritten: typed notes export as real selectable text (embedded TrueType via package:pdf), and handwritten ink exports as vector with an invisible OCR text layer placed behind the ink so a reader's text search finds the handwritten words (docs/adr/0014-pdf-engine.md Decision 5; docs/product/prd-02-library-documents-audio-search.md PRD-LB-143). This is a genuine differentiator (Goodnotes does not OCR imports; our exports are searchable) and depends on the on-device OCR/handwriting recognition engines (SN-HWR, PRD-LB-305/300). OCR runs on-device by default with the privacy posture intact (decision 6).

#### Scope
**In:** running OCR/handwriting recognition over ink content and placing an invisible (render-mode 3) text layer aligned behind the ink in the exported PDF via package:pdf; embedding TrueType so typed text exports as real selectable text; alignment of the invisible text to the ink bounds so search highlights land on the handwriting.
**Out:** the OCR/HWR engines themselves (SN-HWR-001), the base export path ([SN-PDF-019](pdf.md#sn-pdf-019)), print ([SN-PDF-021](pdf.md#sn-pdf-021)), and the search index (SN-SRCH).

#### Acceptance criteria
- [ ] Exported handwriting has an invisible text layer behind the ink; text search in a reference reader finds handwritten words (ADR-0014 verify 3).
- [ ] Typed text exports as real selectable text (embedded TrueType), not rasterised.
- [ ] The invisible text aligns to the ink so selecting a found word visually covers the handwriting within tolerance.
- [ ] OCR runs on-device by default; any cloud OCR escalation is per-request opt-in with the data-leaves-device banner (decision 6, TM-I-08).
- [ ] A page whose ink cannot be recognised exports as vector with no bogus text (graceful, no fabricated words).

#### Technical notes
Create `packages/sane_pdf/lib/src/export/searchable_export.dart`. Use `package:pdf` with the invisible text render mode; verify the exact invisible-text render-mode call in the chosen library (ADR-0014 Decision 5 flags this unverified). OCR text + bounds come from SN-HWR-001 (Apple Vision / ML Kit / Tesseract-PaddleOCR per platform, PRD-LB-305). Ink exports as vector geometry from the ink engine. On-device-first posture (ADR-0016, decision 6). Implements PRD-LB-143 searchable export.

#### Security & privacy
OCR is on-device by default; cloud OCR is explicit per-request opt-in with the banner (TM-I-08, decision 6). Recognised text is note content: never logged, only embedded in the user's chosen export (TM-I-05). Validate recognition output before embedding (CWE-20). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-20.

#### UX notes
Surface: an Export option 'Make handwriting searchable' in the Export flow (screens §10). Show on-device recognition indicator; if cloud OCR is offered, the data-leaves-device banner precedes it. Renders in all 17 looks + dark mode; a11y: the invisible text layer also improves screen-reader access to handwritten pages (PRD-LB-370 OCR alt-text).

#### Test plan
`packages/sane_pdf/test/export/searchable_export_test.dart` (invisible-layer presence, typed-text selectable, alignment tolerance, on-device default, no-fabrication on unrecognised ink), interop search check in a reference reader.

#### Dependencies
[SN-PDF-019](pdf.md#sn-pdf-019) (export path), SN-HWR-001 (OCR/handwriting recognition). Coordinates with SN-AI/SN-SRCH.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-021

<a id="sn-pdf-021"></a>

**Print and share PDFs via the platform print pipeline**

| Field | Value |
|---|---|
| GitHub | #391 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, sharing-export |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-019](pdf.md#sn-pdf-019) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-3`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Users must be able to print or system-share a PDF (a page, a range, or the whole notebook), including from the web, using the platform print pipeline (docs/adr/0014-pdf-engine.md Decision 5 names package:printing; docs/product/prd-02-library-documents-audio-search.md PRD-LB-131/143). Printing flattens marks into the page for the print job (reusing [SN-PDF-019](pdf.md#sn-pdf-019)) and hands the result to AirPrint / Android print / web print. Print/share is an explicit user action and a moment where secure-note leakage must be considered (docs/security/secure-coding-checklist.md §8).

#### Scope
**In:** print via `package:printing` (AirPrint, Android print framework, web print); a print preview with page-range selection; system share of a flattened PDF; honouring secure-note protections (do not print a locked note's content without the app-lock gate).
**Out:** the export file writer ([SN-PDF-019](pdf.md#sn-pdf-019)), searchable export ([SN-PDF-020](pdf.md#sn-pdf-020)), share-link/collaboration (SN-SHR/SN-COL), and app-lock itself (SN-AUTH / PRD-03 LOCK).

#### Acceptance criteria
- [ ] Print produces a correct flattened PDF for the chosen page range on iOS (AirPrint), Android (print framework), and web print.
- [ ] The print preview shows accurate pages and respects range selection.
- [ ] System-share hands a flattened PDF to the OS share sheet; no live editable marks leak unless the user chose the editable export.
- [ ] A locked/secure notebook requires the app-lock gate before print/share (no bypass of LOCK/LEAK protections, TM-I-07).
- [ ] Print runs off the UI isolate; a large job shows progress and does not freeze the UI.

#### Technical notes
Create `packages/sane_pdf/lib/src/export/print_service.dart` using `package:printing` for `layoutPdf`/`sharePdf`. Reuse the flatten path from [SN-PDF-019](pdf.md#sn-pdf-019). Web print goes through the browser print dialog (docs/platform/web.md). Respect secure-note gating (PRD-03 LOCK/LEAK; docs/security/secure-coding-checklist.md §8). Implements PRD-LB-131/143 print.

#### Security & privacy
Print/share is explicit user action (TM-P-06). Locked-note content is gated behind app-lock before print/share (TM-I-07, MASVS-PLATFORM-3, PRD-03 LEAK). Validate page ranges (CWE-20). Never log print job content (TM-I-05). IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-3, CWE-20.

#### UX notes
Surface: Print/Share entries in the Export flow (screens §10). Print preview with range picker. Renders in all 17 looks + dark mode; 44 pt targets; a11y labels; keyboard-reachable on web. Error/offline states explicit; a locked note prompts for unlock first.

#### Test plan
`packages/sane_pdf/test/export/print_service_test.dart` (range selection, flatten reuse, locked-note gate), a platform print smoke test per surface, web print integration check.

#### Dependencies
[SN-PDF-019](pdf.md#sn-pdf-019) (flatten/export). Coordinates with SN-AUTH (app-lock), SN-SHR (share).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-022

<a id="sn-pdf-022"></a>

**Support AcroForm fill, flatten, and import/export**

| Field | Value |
|---|---|
| GitHub | #392 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | pdf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-013](pdf.md#sn-pdf-013) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `OWASP-A08`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Many academic and administrative PDFs are fillable forms, so Sane Notes must support filling AcroForm fields (text, radio, checkbox), flattening them, and importing/exporting field values; XFA is explicitly out of scope, which is acceptable for a note app (docs/product/prd-02-library-documents-audio-search.md PRD-LB-141; docs/adr/0014-pdf-engine.md Consequences 'XFA out of scope'). PRD-LB-141 tags this SHOULD/M3 as sequencing after the core PDF layer (M2). Form data is note content stored in our model; the source PDF stays non-destructive until an explicit flatten on export.

#### Scope
**In:** detect and render AcroForm widgets (text field, checkbox, radio, choice) over the page; fill values persisted in our model; import/export field values (FDF/XFDF or the library's form API); flatten form fields into content on export; validation of field values and types.
**Out:** XFA forms (out of scope, ADR-0014), the annotation overlay ([SN-PDF-013](pdf.md#sn-pdf-013)), export mechanics ([SN-PDF-019](pdf.md#sn-pdf-019)), and digital-signature fields (deferred).

#### Acceptance criteria
- [ ] AcroForm text/checkbox/radio/choice fields render and are fillable; values persist across reopen (PRD-LB-141).
- [ ] Filling is non-destructive until export; the source PDF bytes are unchanged (blob hash test, OWASP-A08).
- [ ] Field values export/import correctly (round-trip test); flatten on export bakes values into content.
- [ ] An XFA-only form is detected and the user is told AcroForm-only is supported (graceful, no crash).
- [ ] Field input is validated by type and bounded in length (CWE-20).

#### Technical notes
Create `packages/sane_pdf/lib/src/forms/acroform_service.dart`. Use `syncfusion_flutter_pdf` form APIs for field read/fill/flatten and FDF/XFDF value round-trip; verify field API shapes before relying on them. Field values are document objects in our model; flatten reuses the export path ([SN-PDF-019](pdf.md#sn-pdf-019)). Detect XFA and degrade. Implements PRD-LB-141.

#### Security & privacy
Form values are note content and may be PII: local, never logged, E2E-encrypted before sync (TM-I-05, decision 3). Non-destructive until export (OWASP-A08). Validate/bound field input (CWE-20). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, OWASP-A08, CWE-20.

#### UX notes
Surface: tapping a form field on the PDF facsimile opens the appropriate input (screens §7.2). Renders in all 17 looks + dark mode; 44 pt / 48 dp targets; VoiceOver/TalkBack exposes field label, role, and value; keyboard tab-order across fields on web. XFA-unsupported message is user-safe.

#### Test plan
`packages/sane_pdf/test/forms/acroform_service_test.dart` (render/fill each field type, persist reopen, value round-trip, flatten on export, XFA detection, input validation), widget test for field input.

#### Dependencies
[SN-PDF-013](pdf.md#sn-pdf-013) (overlay/coordinate mapping). Coordinates with [SN-PDF-019](pdf.md#sn-pdf-019) (flatten on export).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PDF-023

<a id="sn-pdf-023"></a>

**Harden the PDF import validation gate (caps, off-isolate, JS disabled)**

| Field | Value |
|---|---|
| GitHub | #393 |
| Type | security |
| Priority | p0 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-CODE-2`, `MASVS-CODE-4`, `MASVS-PLATFORM-1`, `OWASP-A05`, `OWASP-A08`, `CWE-20`, `CWE-400`, `CWE-22`, `CWE-434` |
| Extra labels | agent-ready |

#### Context
Every imported PDF crosses the outside-world/untrusted-input trust boundaries (TB1/TB3) and a crafted document is the classic parser-exploit vector (docs/security/threat-model.md TM-D-01, TM-E-04, TM-T-06, TA8). The M2 exit criterion is explicit: a hostile/malformed PDF must fail closed into a user-safe error, parsed off the UI isolate, resource-capped (no decompression bomb), and path-confined (docs/roadmap.md M2; docs/security/secure-coding-checklist.md §1). This issue builds the single validation gate that all import paths ([SN-PDF-006](pdf.md#sn-pdf-006)/[SN-PDF-008](pdf.md#sn-pdf-008)) funnel through, and it enforces that embedded PDF JavaScript and launch/GoToR actions are never executed (ADR-0014 security impact).

#### Scope
**In:** MIME sniffing (not extension trust), byte-size and page-count caps, a wall-clock parse timeout, bounded decode memory; off-UI-isolate parsing; fail-closed to a user-safe Failure with no partial import; path canonicalisation/confinement for any file reference; import into a new isolated notebook by default; a policy that embedded JavaScript, launch actions, and remote GoToR are disabled/ignored (not executed).
**Out:** the fuzz corpus and CI fuzz job ([SN-PDF-024](pdf.md#sn-pdf-024)), the import UI ([SN-PDF-006](pdf.md#sn-pdf-006)), share-in ([SN-PDF-008](pdf.md#sn-pdf-008)), and the encryption boundary ([SN-PDF-025](pdf.md#sn-pdf-025)).

#### Acceptance criteria
- [ ] A file whose sniffed type is not PDF is rejected regardless of extension (test).
- [ ] Byte-size, page-count, and parse-time caps are enforced; exceeding any cap fails closed with a user-safe error and no partial state (CWE-400).
- [ ] Parsing runs off the UI isolate; a hostile file adds zero measurable latency to the draw loop (assertion).
- [ ] Embedded PDF JavaScript / launch / remote-GoToR actions are never executed; a fixture containing them imports inert (MASVS-CODE-4, ADR-0014).
- [ ] Any path derived from file content is canonicalised and confined (no .., absolute, or symlink escape); import lands in a new isolated notebook (CWE-22, TM-T-06).

#### Technical notes
Create `packages/sane_pdf/lib/src/security/import_guard.dart`. Sniff type by magic bytes; caps sourced from config (page-count, max bytes, timeout, max decode memory). Parse via `PdfEngine` on a background isolate with a watchdog (docs/architecture/overview.md §6). Configure PDFium/pdfrx to disable JavaScript and not follow launch/remote actions. Path confinement per docs/security/secure-coding-checklist.md §1. This gate is the enforcement point for TM-D-01/TM-E-04/TM-T-06 and must be updated with the threat model in the same PR if a new inbound path is added.

#### Security & privacy
Primary control for untrusted-PDF threats (TB1/TB3): validate-before-use, resource caps, off-isolate parse, fail closed, JS disabled, path confinement (TM-D-01, TM-E-04, TM-T-06, MASVS-CODE-2/4, MASVS-PLATFORM-1, OWASP-A05/A08, CWE-20/400/22/434). Never log rejected file bytes/names (TM-I-05). IDs listed in the security array.

#### UX notes
Rejections surface a single user-safe message ('This PDF could not be imported - it may be corrupted or too large'), never a stack trace or internal path (secure-coding §7). No themed content of its own; the message appears in the Import overlay (screens §9) in all 17 looks + dark mode with a11y labels.

#### Test plan
`packages/sane_pdf/test/security/import_guard_test.dart` (type sniff, each cap, off-isolate, JS/launch/GoToR inert, path-traversal confinement, fail-closed no-partial-state), abuse fixtures from [SN-PDF-024](pdf.md#sn-pdf-024); a regression test per fixed parser finding.

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (engine). Gates [SN-PDF-006](pdf.md#sn-pdf-006) and [SN-PDF-008](pdf.md#sn-pdf-008); corpus from [SN-PDF-024](pdf.md#sn-pdf-024). Aligns with SN-SEC-002 (threat model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md and the threat model updated if a new inbound path was added


---

### SN-PDF-024

<a id="sn-pdf-024"></a>

**Build the malformed-PDF fuzz corpus and parser fuzzing job**

| Field | Value |
|---|---|
| GitHub | #704 |
| Type | test |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | pdf, security, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PDF-023](pdf.md#sn-pdf-023) |
| Depends on | [SN-PDF-023](pdf.md#sn-pdf-023) |
| Security controls | `MASVS-CODE-2`, `MASVS-CODE-4`, `OWASP-A08`, `CWE-400`, `CWE-611`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Parser changes require a fuzz corpus and a fuzzing job in the verification stage, and the M2 exit criterion requires PDF parser fuzzing to be clean (docs/roadmap.md M2; CLAUDE.md §10; docs/security/threat-model.md TM-E-04 verification). This issue creates the malformed/hostile PDF and XFDF corpus (decompression bombs, truncated xref, cyclic objects, huge page counts, malicious JS/launch actions, XXE-in-XFDF, path-traversal payloads in bundles) and wires a CI fuzzing job that drives the import guard ([SN-PDF-023](pdf.md#sn-pdf-023)) and the parsers, asserting they fail closed without crash, hang, or resource exhaustion.

#### Scope
**In:** a curated + generated corpus of malformed/adversarial PDFs and XFDF; a fuzz harness that feeds them through the import guard and parsers off-isolate; assertions that every input either parses safely or fails closed within the resource/time caps; a CI job (nightly / release-candidate) with crash/timeout/leak detection; regression fixtures for any finding.
**Out:** the guard logic itself ([SN-PDF-023](pdf.md#sn-pdf-023)), native AddressSanitizer builds of PDFium (a MAY, docs/security/secure-coding-checklist.md §2), and the full MobSF/ZAP release scans (SN-SEC / M7).

#### Acceptance criteria
- [ ] The corpus covers decompression/zip bombs, truncated/cyclic xref, oversize page counts, embedded JS/launch/GoToR, XXE-in-XFDF, and path-traversal bundle payloads (CWE-400/611/22).
- [ ] Every corpus input either imports safely or fails closed within the caps; no crash, no hang, no unbounded memory (assertion harness).
- [ ] The fuzz job runs in CI and blocks merge on a new crash/timeout for parser-touching PRs.
- [ ] Each historical finding has a regression fixture that stays in the corpus.
- [ ] The harness runs the parser off the UI isolate and reports peak memory/time per input.

#### Technical notes
Create `packages/sane_pdf/test/fuzz/corpus/` and `packages/sane_pdf/test/fuzz/pdf_fuzz_test.dart`, plus a CI workflow step in the DevSecOps pipeline (docs/security/devsecops-pipeline.md; SN-CI-001). Generate mutated inputs from a small seed set; keep the corpus small in-repo and expand via CI generation. Drive inputs through [SN-PDF-023](pdf.md#sn-pdf-023). This satisfies TM-E-04 verification and the M2 fuzzing-clean gate. Pin and track the pdfium version's CVEs via OSV-Scanner (ADR-0014 security impact).

#### Security & privacy
This is a verification control for the untrusted-parser threats (TM-D-01/TM-E-04/TM-T-06). Corpus contains only synthetic adversarial data, no real user content (no PII). IDs: MASVS-CODE-2, MASVS-CODE-4, OWASP-A08, CWE-400, CWE-611, CWE-20.

#### UX notes
None beyond baseline: this is a test/CI asset with no user-facing surface. Baseline: no content or tokens logged by the harness; failures report input hashes, not bytes.

#### Test plan
`packages/sane_pdf/test/fuzz/pdf_fuzz_test.dart` (corpus drive, fail-closed assertions, memory/time reporting) and the CI job; regression fixtures added per finding. Coordinates with [SN-PDF-023](pdf.md#sn-pdf-023).

#### Dependencies
[SN-PDF-023](pdf.md#sn-pdf-023) (import guard is the target). Coordinates with SN-CI-001 (pipeline), SN-SEC-002 (threat model verification).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, fuzz, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-PDF-025

<a id="sn-pdf-025"></a>

**Enforce the PDF encryption boundary and source-password handling**

| Field | Value |
|---|---|
| GitHub | #394 |
| Type | security |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, security, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-2`, `OWASP-A02`, `CWE-311`, `CWE-312` |
| Extra labels | agent-ready |

#### Context
Imported PDFs and their annotations are note content, so they must be stored as content-addressed blobs and end-to-end encrypted before any sync write, with the cloud never seeing plaintext, and password-protected source PDFs must be supported without persisting the password in plaintext (docs/adr/0014-pdf-engine.md Decision 9, security impact; docs/security/threat-model.md TM-I-01/TM-I-03; CLAUDE.md decision 3/7). This issue defines the PDF-side of the encryption boundary: blobs are stored locally content-addressed (M2, local storage exists), the sync/E2EE machinery (SN-CRY/SN-SYNC, M4) encrypts them before egress, and the source-PDF `PasswordProvider` holds the password transiently only.

#### Scope
**In:** storing imported PDFs + thumbnails + annotation blobs as content-addressed blobs in the local store; declaring these blobs as note content to the crypto/sync layer so they are E2E-encrypted before any cloud write; source-PDF password handling via `PasswordProvider` that never writes the password to disk/logs/DB and scrubs it from RAM after open; excluding PDF caches/keys from OS auto-backup.
**Out:** the crypto envelope and key hierarchy (SN-CRY-002), the sync op-log and cloud adapters (SN-SYNC-002/003/004), and the engine open path ([SN-PDF-002](pdf.md#sn-pdf-002)).

#### Acceptance criteria
- [ ] Imported PDFs, thumbnails, and annotation blobs are content-addressed in the local store (hash-verified on read; TM-T-03).
- [ ] These blobs are marked note content and are E2E-encrypted before any sync write; a sync integration test shows only ciphertext leaves the device (TM-I-01, deferred verification with SN-SYNC at M4).
- [ ] A source-PDF password is held transiently, never written to disk/logs/DB, and scrubbed from RAM after open (assertion test; TM-I-03).
- [ ] PDF caches and any key material are excluded from OS auto-backup (MASVS-STORAGE-1, TM-I-10).
- [ ] No PDF bytes, page content, or passwords appear in any log (grep/redaction test; TM-I-05).

#### Technical notes
Create `packages/sane_pdf/lib/src/security/pdf_blob_policy.dart`. Blobs go to the content-addressed store (SN-CORE-004); the sync layer (SN-SYNC) encrypts via `sane_crypto` envelope encryption before egress (ADR-0007, decision 3). The password provider surfaces to [SN-PDF-002](pdf.md#sn-pdf-002) and is never persisted (docs/security/secure-coding-checklist.md §3.1). Backup-exclusion per §8/§9.2/§9.3. This issue owns the PDF-specific declarations; the crypto/sync verification lands with SN-SYNC at M4.

#### Security & privacy
Core confidentiality control for PDF content (A1/A4): content-addressed blobs, E2EE before egress, hash-verify on read, no plaintext to cloud, password never persisted, caches out of backup (TM-I-01/03/05/10, TM-T-03, MASVS-STORAGE-1/2, MASVS-CRYPTO-2, OWASP-A02, CWE-311/312). IDs in the security array.

#### UX notes
None beyond baseline: a password-required PDF prompts once (handled by the viewer, [SN-PDF-003](pdf.md#sn-pdf-003)); the prompt copy is user-safe and the password is never shown or stored. Any 'this document is protected' state renders in all 17 looks + dark mode with a11y labels.

#### Test plan
`packages/sane_pdf/test/security/pdf_blob_policy_test.dart` (content-addressing, hash-verify, note-content flagging, password non-persistence + RAM scrub, backup exclusion, no-PII-in-logs). Sync ciphertext assertion coordinates with SN-SYNC-002 at M4.

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (password provider), SN-CORE-004 (blob store). Coordinates with SN-CRY-002 (envelope), SN-SYNC-002 (op-log/E2EE, M4).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md and threat model updated if a stored asset changed


---

### SN-PDF-026

<a id="sn-pdf-026"></a>

**Add PDF performance tests: 600-page 60fps scroll and memory budget**

| Field | Value |
|---|---|
| GitHub | #705 |
| Type | test |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, perf, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Depends on | [SN-PDF-003](pdf.md#sn-pdf-003), [SN-PDF-004](pdf.md#sn-pdf-004) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
The M2 exit criteria are hard perf gates: scroll a 600-page PDF at 60 fps and keep memory under budget, and drawing over a PDF must meet the same pen-down->pixel latency as a blank page (docs/roadmap.md M2; docs/platform/performance-budgets.md; CLAUDE.md decision 7; docs/architecture/rendering-and-performance.md §5). This issue builds the PDF performance test suite that runs in CI against the reference devices via the perf harness, so any regression that breaks 60 fps or the memory cap fails the build and does not merge.

#### Scope
**In:** an integration perf test scrolling a 600-page fixture measuring frame times and peak memory; a high-zoom pinch scenario exercising tile caching; a draw-over-PDF latency scenario; wiring these into the perf harness / CI perf gate; baseline thresholds from the performance budgets.
**Out:** the perf harness/device lab itself (SN-PERF-002/003/004), the viewer/tiling implementations ([SN-PDF-003](pdf.md#sn-pdf-003)/[SN-PDF-004](pdf.md#sn-pdf-004)), and the ink latency harness (SN-INK/SN-PERF).

#### Acceptance criteria
- [ ] The 600-page scroll test asserts sustained 60 fps with no frame > 16.7 ms on the mid-range reference device (fails the build otherwise).
- [ ] Peak memory during the scroll stays under the platform budget (< 300 MB on 4 GB Android; docs/platform/performance-budgets.md).
- [ ] The high-zoom pinch scenario holds 60 fps and never allocates a full-page full-res bitmap (ties to [SN-PDF-004](pdf.md#sn-pdf-004)).
- [ ] Drawing over a PDF meets the pen-down->pixel budget for the device tier (<= 16 ms ProMotion iPad, <= 25 ms mid Android, <= 30 ms web).
- [ ] Tests run in CI as a perf gate; a regression blocks merge (docs/security/devsecops-pipeline.md perf gate).

#### Technical notes
Create `app/integration_test/pdf_scroll_perf_test.dart` and `pdf_draw_latency_test.dart`, driven by `tools/perf_harness` on reference devices (docs/architecture/rendering-and-performance.md §2; SN-PERF-002). Use a synthetic/committed 600-page fixture (no PII). Thresholds come from docs/platform/performance-budgets.md. Attach the profile timeline to the PR (CLAUDE.md §8). Follows the jank triage runbook (rendering-and-performance §6) when a test fails.

#### Security & privacy
None beyond baseline: fixtures are synthetic, no user content; the harness logs metrics, never note content (TM-I-05). Memory caps are also a DoS defence (TM-D-01/TM-D-04, CWE-400). IDs: MASVS-PRIVACY-1, CWE-400.

#### UX notes
None beyond baseline: this is a test/CI asset. It indirectly guarantees the smooth-scroll and lag-proof-draw UX promised across all surfaces and looks.

#### Test plan
`app/integration_test/pdf_scroll_perf_test.dart` (fps + memory), `app/integration_test/pdf_draw_latency_test.dart` (latency), high-zoom pinch scenario; results gated in CI. Coordinates with [SN-PDF-003](pdf.md#sn-pdf-003), [SN-PDF-004](pdf.md#sn-pdf-004), SN-PERF-002/003.

#### Dependencies
[SN-PDF-003](pdf.md#sn-pdf-003) (viewer), [SN-PDF-004](pdf.md#sn-pdf-004) (tiling). Coordinates with SN-PERF-002 (harness), SN-PERF-003 (CI perf gate).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-PDF-027

<a id="sn-pdf-027"></a>

**Keep PDF colours in dark mode and add an optional night filter**

| Field | Value |
|---|---|
| GitHub | #395 |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pdf, theming |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PDF-001](pdf.md#sn-pdf-001) |
| Depends on | [SN-PDF-003](pdf.md#sn-pdf-003) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Rendered PDF pages must keep their original colours even in dark mode - only the app chrome and native paper themes go dark - and users may opt into a per-document night filter (invert/dim) that is off by default (docs/product/prd-02-library-documents-audio-search.md PRD-LB-132; screens §0 'PDFs keep their original colours'). Getting this right avoids the common bug where a dark theme washes out a coloured diagram or a scanned page, and it is a small, self-contained surface ideal as a good-first-issue.

#### Scope
**In:** ensuring the PDF page raster ignores app theme inversion (original colours in every look + dark mode); a per-document 'night filter' toggle (invert / dim) applied at composite, off by default and persisted per document; correct interaction with the highlighter/ink overlay so marks stay legible.
**Out:** app chrome theming (SN-DS/SN-theming), native paper themes for blank pages (SN-TPL/SN-PG), and the viewer itself ([SN-PDF-003](pdf.md#sn-pdf-003)).

#### Acceptance criteria
- [ ] In all 17 looks and in dark mode, the PDF page raster shows original colours (golden per look; PRD-LB-132).
- [ ] The night filter is off by default and toggled per document; enabling it inverts/dims only the PDF layer, not the ink overlay legibly (test).
- [ ] The night-filter choice persists per document across reopen.
- [ ] Highlighter and ink remain legible over both normal and night-filtered pages.
- [ ] The toggle is reachable, labelled, and 44 pt / 48 dp; keyboard-reachable on web.

#### Technical notes
Create the night-filter compositing in the viewer layer (`packages/sane_pdf/lib/src/viewer/`) and a per-document setting. The page raster is drawn outside the theme colour-inversion path (design tokens govern chrome only, CLAUDE.md §9). Night filter is a composite-time colour matrix (invert/dim) applied to the PDF layer only. Implements PRD-LB-132.

#### Security & privacy
None beyond baseline: page content is note content, rendered locally, never logged (TM-I-05). ID: MASVS-PRIVACY-1.

#### UX notes
Surface: a per-document display option near the PDF reading controls (screens §7.7). The toggle label reads 'Night filter (invert/dim)'. Renders in all 17 looks + dark mode; PDF colours preserved by default; a11y label announces state; 44 pt target. Empty/first-use: filter off.

#### Test plan
`packages/sane_pdf/test/viewer/night_filter_test.dart` (default off, per-doc persistence, invert/dim applies to PDF layer only), golden tests per look asserting original PDF colours and the filtered variant.

#### Dependencies
[SN-PDF-003](pdf.md#sn-pdf-003) (viewer compositing). Coordinates with SN-DS-002 (tokens/looks).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-PDF-028

<a id="sn-pdf-028"></a>

**Add the sane_pdfkit native accelerator behind the sane_pdf interface**

| Field | Value |
|---|---|
| GitHub | #706 |
| Type | task |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | pdf, perf, compat |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-2`, `MASVS-CODE-3`, `CWE-20` |
| Extra labels | needs-decision |

#### Context
pdfrx/PDFium is the cross-platform core, but on Apple, PDFKit (PDFView/PDFDocument/PDFAnnotation) and on Android, Jetpack androidx.pdf may render/markup measurably faster, so ADR-0014 keeps an optional native accelerator behind the same `sane_pdf` interface with identical observable behaviour (docs/adr/0014-pdf-engine.md Decision 7; docs/platform/ipad.md §sane_pdfkit; docs/platform/android.md §sane_pdfkit). This is a platform-parity/perf-hardening item (M5) and carries a maintainer decision: whether to build the accelerator at all, and the related commercial-SDK escape-hatch and Syncfusion licence gates (ADR-0014 Decision 8, verify 5/6; CLAUDE.md §13). It is marked needs-decision and is not agent-ready until the maintainer confirms scope.

#### Scope
**In:** the `plugins/sane_pdfkit` federated plugin (Dart platform-interface + Apple PDFKit impl + Android androidx.pdf impl) implementing the `PdfEngine` render/markup paths; a capability query that selects the accelerator only where it beats PDFium; a golden equivalence check proving no observable annotation-behaviour change; graceful fallback to `sane_pdf` (pdfrx) everywhere else.
**Out:** the `sane_pdf` interface and pdfrx core ([SN-PDF-002](pdf.md#sn-pdf-002)), the annotation model ([SN-PDF-013](pdf.md#sn-pdf-013)), and the commercial-SDK adoption (a separate ADR-revisit trigger).

#### Acceptance criteria
- [ ] Maintainer decision recorded: build the accelerator (and licence/commercial-SDK stance) before implementation (needs-decision; CLAUDE.md §13).
- [ ] The accelerator is selected by capability query, never a platform string; where absent, `sane_pdf` (pdfrx) is used (ADR-0012).
- [ ] Enabling `sane_pdfkit` changes no observable annotation behaviour: same `sane_pdf` interface, same golden output (ADR-0014 verify 5).
- [ ] Ink-over-PDF stays in our object model; the accelerator never flattens our marks into PDF annotations by default (docs/platform/ipad.md/android.md).
- [ ] Native channel arguments are validated (lengths/ranges/null); a bad argument returns an error, never crashes the host (docs/security/secure-coding-checklist.md §2, CWE-20).

#### Technical notes
Federated plugin `plugins/sane_pdfkit` (ADR-0012): Dart platform-interface, Swift PDFKit impl (`PDFView`/`PDFDocument`/`PDFAnnotation`, docs/platform/ipad.md), Kotlin androidx.pdf impl (`PdfViewerFragment`/`PdfView`, `@ExperimentalPdfApi`, docs/platform/android.md). Plugins are leaves (never import packages/, CLAUDE.md §3). Validate all method-channel args and build native code with hardening flags (docs/security/secure-coding-checklist.md §2). 16 KB page alignment for the native .so (docs/platform/android.md L3). Accelerator selected via [SN-PDF-002](pdf.md#sn-pdf-002) capability query.

#### Security & privacy
Native plugin is attack surface (TB3): validate every channel argument, no arbitrary-code/library-load method, minimal allow-listed surface, memory-safe/hardened native build (TM-E-04, MASVS-PLATFORM-1, MASVS-CODE-2/3, CWE-20). Plugins hold no secrets. IDs in the security array.

#### UX notes
None beyond baseline: the accelerator is invisible to the user; behaviour and rendering must be indistinguishable from the pdfrx path across all 17 looks + dark mode (golden equivalence). No new chrome; a11y unchanged.

#### Test plan
`plugins/sane_pdfkit/test/` (platform-interface contract), golden equivalence tests comparing accelerator vs pdfrx output, native channel-arg validation tests, capability-query selection test. Coordinates with [SN-PDF-002](pdf.md#sn-pdf-002) and [SN-PDF-013](pdf.md#sn-pdf-013).

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002) (sane_pdf interface + capability query). Coordinates with SN-IPAD-001/SN-AND-001 (native shells), SN-PERF-004 (device lab).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0014 revisit if commercial SDK adopted)
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-WEB-028

<a id="sn-web-028"></a>

**Implement the PDFium-WASM render and annotate path for web**

| Field | Value |
|---|---|
| GitHub | #841 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | pdf, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-PDF-002](pdf.md#sn-pdf-002), [SN-WEB-008](storage.md#sn-web-008) |
| Security controls | `MASVS-CODE-4`, `CWE-20`, `CWE-400`, `CWE-787`, `OWASP-A08` |
| Extra labels | agent-ready |

#### Context
PDF is central to the student workflow ("Slides and PDFs inside your notes", `PRD-AUTH-014`) and the web surface must render and annotate PDFs like every other surface — `docs/platform/compatibility-matrix.md` §6 lists PDF view + annotate as ✅ on web via **pdf.js / PDFium WASM (`pdfrx` web)**. The hard requirements are shared with native: imported PDFs are **annotatable vector pages, not rasterised** (`PRD-CO-075`), a 600-page PDF scrolls at **60 fps**, and a hostile or malformed file must **fail closed** off the UI thread with resource caps (M2 exit criteria in `docs/roadmap.md`, checklist §1). On web, "off the UI isolate" means a Worker, and the WASM decoder is a C++ parser running in our origin — the single most attackable code path in the web build.

#### Scope
**In:** the web implementation of the `sane_pdf` render interface using the chosen WASM engine in a Worker; page raster/vector tiles with a bounded cache; text layer extraction for search and selection; annotation compositing over the page; outline/bookmark extraction; import validation and resource caps; memory ceilings tuned for browsers.
**Out:** the shared PDF pipeline, annotation model and export ([SN-PDF-001](pdf.md#sn-pdf-001), [SN-PDF-002](pdf.md#sn-pdf-002)), the import confirmation UI ([SN-WEB-012](sharing-export.md#sn-web-012)), file IO ([SN-WEB-013](sharing-export.md#sn-web-013)), and the maintainer's commercial-SDK escape-hatch decision (CLAUDE.md §13, decided at the end of M2).

#### Acceptance criteria
- [ ] A 600-page PDF scrolls at **60 fps** on Chrome desktop with no frame over 16.7 ms, using tile caching with a bounded memory ceiling.
- [ ] Pages render as vector/text-preserving content with a working text layer — selection and search return correct positions, not OCR guesses (`PRD-CO-075`).
- [ ] Ink annotations composite over the page at the correct scale and position across zoom levels, and persist through reload.
- [ ] A malformed, truncated, encrypted or adversarial PDF (fuzz corpus) fails closed with a user-safe message, no crash, no partial import, and no UI-thread stall.
- [ ] Decode runs in a Worker with explicit caps: max file size, max page count, max page dimensions and a wall-clock timeout, all enforced **before** decode.
- [ ] Memory use for a 600-page document stays under a documented ceiling and is released when the document closes.
- [ ] Outline/bookmarks are extracted where present and the missing case renders an empty state rather than an error.
- [ ] The engine binary is self-hosted, version-pinned and hash-verified.

#### Technical notes
Implement the `sane_pdf` platform interface ([SN-PDF-002](pdf.md#sn-pdf-002), ADR-0014) with the web impl under `plugins/sane_pdfkit` (web) or the `pdfrx` web path — whichever the M2 engine decision selects; keep `packages/sane_pdf` free of web imports. Run the WASM engine in a dedicated Worker with structured-clone or transferable buffers for tiles; never decode on the UI isolate (CLAUDE.md §8). Cache tiles content-addressed in OPFS ([SN-WEB-008](storage.md#sn-web-008)) so re-opening is fast. Under COEP, the WASM and any worker script must be same-origin ([SN-WEB-015](security.md#sn-web-015)). Keep the engine pinned and patched (OSV-Scanner), since PDFium CVEs are frequent (checklist §1, §10).

#### Security & privacy
Threats: PDF parsers are a classic memory-safety target — a crafted file can trigger out-of-bounds writes in the WASM heap (CWE-787, MASVS-CODE-4), decompression bombs can exhaust memory (CWE-409, CWE-400), embedded JavaScript or remote-resource references can attempt egress (OWASP-A08, CWE-918 adjacency), and a malicious file could attempt path traversal via embedded names (CWE-22). Controls: validate type/MIME/size and page-count caps before decode; run in a Worker sandbox with a timeout and a hard memory ceiling; **disable PDF JavaScript and external resource loading**; import into a new isolated notebook; canonicalise every derived name; fail closed to a typed `Failure` with a user-safe message and no internal paths (CWE-209); keep the engine pinned, patched and covered by fuzzing in the verification stage; never log file names or content (CWE-532).

#### UX notes
Surfaces: the Import PDF overlay (`docs/design/screens-and-flows.md` §9), the Editor with a PDF-backed page kind (§7.2) and the page rail (§7.7). PDFs must keep their **original colours even in dark mode** (design §0 rule, `PRD-CO-022`) — verify this explicitly across all **17 looks, light and dark**, since it is the one surface that must *not* re-tint; golden-test a PDF page with ink in two looks per mode. States: loading with progress and cancel, password-protected (unsupported message), corrupt/unsupported (plain-language reason), empty outline, and offline (import works offline). Accessibility: the text layer feeds screen readers, page navigation is keyboard operable, controls are ≥ 44 px with ≥ 4.5:1 contrast (`PRD-CO-310`, `PRD-CO-315`).

#### Test plan
- `packages/sane_pdf/test/web_engine_contract_test.dart` — the engine contract against a fake backend.
- `app/test/web/pdf_caps_test.dart` — size/page/dimension/timeout caps enforced before decode.
- `app/integration_test/web/pdf_scroll_perf_test.dart` — 600-page scroll at 60 fps with bounded memory.
- `app/integration_test/web/pdf_hostile_import_test.dart` — fuzz-corpus files fail closed with no UI stall.
- `app/test/web/pdf_dark_mode_golden_test.dart` — original colours preserved in dark mode.
- Manual: Safari iPadOS render check; a 100 MB scanned PDF.

#### Dependencies
[SN-PDF-002](pdf.md#sn-pdf-002), [SN-WEB-008](storage.md#sn-web-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Fuzz corpus extended and clean; engine version recorded in the SBOM
- [ ] Reviewed against docs/security/secure-coding-checklist.md §1 and §2

---

