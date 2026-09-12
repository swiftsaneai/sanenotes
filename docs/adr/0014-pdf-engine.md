# ADR-0014 — PDF engine (render, annotate, search, export)

## Status

**Accepted** (M0 Foundations). Serves the core "annotate PDFs" use case and locked decisions 1
(one codebase incl. web), 3 (local-first, E2E-encrypted), 7 (scroll a 600-page PDF at 60 fps).
Related: [ADR-0008](0008-ink-pipeline-and-low-latency-surfaces.md) (ink drawn over the PDF),
[ADR-0016](0016-on-device-ml-and-ai.md) (OCR for searchable export). Package: **`sane_pdf`**;
optional native accelerator plugin **`sane_pdfkit`**. Perf strategy:
[`docs/architecture/rendering-and-performance.md` §5](../architecture/rendering-and-performance.md#5-pdf--large-document-tiling).

## Context

Notes are drawn *over* PDFs; PDF is a first-class page kind (decision 4, PDF-backed pages). We must
render, annotate (freehand ink + highlight + text), search, and export PDFs — including 600+ page
documents — across iOS/Android/**web**, staying local-first and permissively licensed. Research
(`research/pdf-and-audio-technology.md`) establishes:

- **`pdfrx` (PDFium, MIT)** is the widest single Flutter renderer: Android, iOS 15+, macOS 12+,
  Windows, Linux, **and Web via PDFium-WASM** — so web fidelity matches native without pdf.js
  glue. It provides text selection, **text search**, outline/bookmarks, link handling, password
  docs, layouts, dark mode, lazy rendering, and an **overlay** mechanism for drawing an annotation
  layer on top. Requires Flutter 3.47+/Dart 3.13+.
- **PDF is an open ISO standard (ISO 32000);** annotations are separate objects layered over page
  content — they don't modify the underlying content, enabling non-destructive marks. Standard
  subtypes: Ink (freehand pen), text-markup (Highlight/Underline/Strikeout/Squiggly), FreeText,
  Note, Stamp/Image, Shapes, Link, Widget (forms). **XFDF** (ISO 19444-1) round-trips annotations
  independently of the PDF and interoperates with Acrobat/Preview.
- **Huge-doc performance** is solved by lazy page rendering + tile caching for zoom +
  two-resolution scroll + background isolates + incremental search (pdfrx lazy; Syncfusion virtual
  scrolling).
- **Searchable export:** `package:pdf` (Apache-2.0) embeds TrueType fonts so generated typed text
  is real selectable text; for handwritten ink, place an **invisible OCR text layer** behind the
  ink (searchable-scanned-PDF technique). `package:printing` (Apache-2.0) handles print/share incl.
  web print. `syncfusion_flutter_pdf` gives text/search **bounds (quads)**, flatten, and PDF/A —
  under a **free Community License** if eligible.
- **Licensing traps:** **MuPDF is AGPL-or-paid — avoid.** Commercial full-stack SDKs (Nutrient/
  PSPDFKit, Apryse ~$1,500+, Syncfusion) are the "buy your way to GoodNotes-parity" option at real
  per-year cost. Android `PdfRenderer` is render-only (too limited as a core); Jetpack `androidx
  .pdf` is a strong **Android-only** accelerator but beta for editing.

The strategic tension: a commercial SDK is the fastest route to full annotation/forms/redaction,
but a per-seat cost and a closed dependency conflict with a local-first, low-cost, one-codebase
product. Annotations are also **our** ink — pressure-, audio-synced strokes we already own —
so we want full UX control of the mark layer.

## Decision

**Render and read PDFs with `pdfrx` (PDFium, MIT) on all surfaces; draw our own annotation
overlay (ink/highlight/text) using the Sane Notes ink engine, storing marks in our own document
model as the source of truth; use XFDF as the interop/export format and `package:pdf` +
`package:printing` for searchable export and print.**

Specifics:

1. **Core renderer: `pdfrx` (PDFium, MIT)** — one engine for iOS/Android/**Web(WASM)**/desktop.
   Read paths (render, text selection, search, outline, links, password) come from pdfrx; no
   pdf.js and no MuPDF. **Verify** the exact text-bounds/quad and search-rect API shapes against
   pdfrx's API docs before relying on them (`research/pdf-and-audio-technology.md` flags this).
2. **Annotation overlay is ours, not the SDK's.** Ink/highlight/shape/text marks are drawn with
   the Sane Notes ink engine ([ADR-0008](0008-ink-pipeline-and-low-latency-surfaces.md)) on a
   layer composited over pdfrx's page via its overlay/coordinate system. This keeps annotations
   **live** (movable/editable/deletable), gives full UX control (pressure, tilt, audio-synced
   strokes), and reuses one ink pipeline for blank pages and PDFs alike.
3. **Our DB is the source of truth for annotations**, modelled as document objects (decision 4:
   Stroke/Text/Shape/Image on a Layer over a PDF-backed Page). **Geometry stored in PDF points
   (page user-space), page-relative**, so it survives zoom/DPI and re-flows to any renderer.
   Persist per-point stroke timestamps (`t`) for audio sync ([ADR-0015](0015-audio-pipeline.md)).
   The annotation row model in `research/pdf-and-audio-technology.md` A.2 is the reference shape.
4. **Interop/export = XFDF** for round-tripping marks to Acrobat/Preview, and **flattened PDF**
   for final share/print (flatten only on export; keep live marks as the working format).
   `syncfusion_flutter_pdf` (Community License if eligible, else budget it) provides text/search
   **quads**, flatten, and PDF/A; it is the export/manipulation engine even though pdfrx renders.
5. **Searchable note export:** `package:pdf` embeds TrueType fonts → typed notes export as real
   selectable text; handwritten ink exports as vector with an **invisible OCR text layer** behind
   it (OCR from [ADR-0016](0016-on-device-ml-and-ai.md)). **Verify** the exact invisible-text
   render-mode call in the chosen library. Print/share via `package:printing` (incl. web print).
6. **Huge-doc strategy** (600+ pages, decision 7): lazy page rendering, tile caching for zoom,
   two-resolution scroll, disk-cached thumbnails, background-isolate rasterisation + text indexing,
   incremental page-by-page search, LRU-bounded page/tile memory — detailed in
   [`rendering-and-performance.md` §5](../architecture/rendering-and-performance.md#5-pdf--large-document-tiling).
7. **Optional native accelerator `sane_pdfkit`:** on Apple, PDFKit (`PDFView`/`PDFDocument`/
   `PDFAnnotation`) MAY accelerate render/markup where it measurably beats PDFium; on Android,
   Jetpack `androidx.pdf` MAY be used similarly. These are **accelerators behind the same `sane_pdf`
   interface**, never the cross-platform core, so behaviour stays consistent
   ([ADR-0012](0012-native-plugin-strategy.md)).
8. **Commercial-SDK escape hatch:** if the DIY overlay proves too costly to reach parity on
   forms/redaction/advanced annotation, adopt **Nutrient (PSPDFKit)** or **Apryse** behind the
   `sane_pdf` interface — a revisit-this-ADR trigger, budgeted, not an M0 commitment.
9. **Encryption boundary:** imported PDFs and our annotations are note content — stored as
   content-addressed blobs and E2E-encrypted on sync; the cloud never sees plaintext (decision 3).
   Support password-protected source PDFs via pdfrx `PasswordProvider`.

## Alternatives considered

| Option | Cross-platform incl. web | Annotation control | License/cost | Verdict |
|---|---|---|---|---|
| **pdfrx (PDFium) + own overlay + XFDF/pdf/printing [chosen]** | Yes (PDFium-WASM on web) | Full — our ink engine | Permissive (MIT/Apache; Syncfusion Community if eligible) | **Chosen** — widest reach, full UX control, local-first, low cost |
| Commercial SDK (Nutrient/Apryse) as core | Yes | Full, out-of-box forms/redaction | Per-year, contact-sales / ~$1,500+ | Rejected as default — cost + closed dep vs local-first; kept as **escape hatch** |
| Syncfusion viewer as core | Yes (needs pdf.js on web) | Text-markup strong; ink limited (verify) | Community/commercial | Rejected as renderer — pdfrx wider; **keep syncfusion_flutter_pdf for export quads/flatten/PDF-A** |
| Android `androidx.pdf` + Apple PDFKit natively | No (two native cores, no web) | Full native | Free | Rejected as core — platform-divergent; kept as optional accelerators behind `sane_pdf` |
| MuPDF | Yes | Full | **AGPL or paid** | Rejected — AGPL incompatible with the product; paid otherwise |
| Android `PdfRenderer` | No (Android only) | None (render-only) | Free | Rejected — render-only, no text/annotations |

## Consequences

**Positive**
- One permissive renderer across all five surfaces incl. web, no pdf.js glue, no AGPL trap.
- Annotations are our own live, audio-syncable, pressure-aware ink — full control, one ink
  pipeline for PDF and blank pages.
- DB-as-source-of-truth + XFDF gives interop without locking marks inside the PDF; PDF/A + flatten
  give clean final exports; `package:pdf` gives searchable typed exports.
- Local-first and E2E-encryptable; no per-seat cost in the default build.

**Negative / costs**
- Building a GoodNotes-grade annotation layer (text-markup snapping, forms, redaction) ourselves
  is real work; the commercial escape hatch exists precisely for this.
- Exact pdfrx quad/search APIs and the invisible-text render mode are **unverified** — settle at
  implementation.
- Syncfusion Community License **eligibility** must be confirmed per release, or the export engine
  becomes a paid dependency.
- Web PDF is heavier (PDFium-WASM download) and inherits the web ink constraints
  ([ADR-0010](0010-web-pwa-strategy.md)).

**Neutral**
- XFA forms are out of scope (AcroForm only); acceptable for a note app.

## Security & privacy impact

- Imported PDFs are **untrusted input**: parse defensively (PDFium hardening), enforce page/size
  limits, and treat embedded JavaScript/links per policy (don't auto-execute; confirm link
  navigation). MobSF/OSV scan the native PDFium dependency; track CVEs on the pinned version.
- PDFs + annotations are note content: content-addressed blobs, E2E-encrypted on sync, never
  logged; support source-PDF passwords without persisting them in plaintext.
- Export/flatten happens locally; a "share" is an explicit user action, and searchable export
  embeds only content the user chose to export.

## How to verify

1. **600-page PDF scrolls at 60 fps** with memory under budget (perf timeline + memory sampler on
   the low-end device).
2. **Round-trip annotations:** our marks → XFDF → re-import reproduces geometry (page-space) and
   opens correctly in Acrobat/Preview.
3. **Searchable export:** exported note PDF has selectable typed text and a working invisible OCR
   text layer behind handwritten ink (text search finds handwritten words).
4. **Web parity:** pdfrx renders and searches the same document on web (PDFium-WASM) and native.
5. **Accelerator swap-safe:** enabling `sane_pdfkit` (Apple PDFKit / Android androidx.pdf) changes
   no observable annotation behaviour (same `sane_pdf` interface, same golden output).
6. **License gate:** CI records the Syncfusion Community License eligibility check for the release.
