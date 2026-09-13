# Backlog — area: templates

15 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-TPL-001](templates.md#sn-tpl-001) **Templates, paper & covers (paper types, tints, sizes, custom templates, store)** (epic · M2 Library & Documents)
  - [SN-TPL-002](templates.md#sn-tpl-002) **Model template and cover entities with per-notebook paper defaults** · p1 · feature · M · M2 Library & Documents
  - [SN-TPL-003](templates.md#sn-tpl-003) **Render blank, lined, grid, dot, isometric and chemistry paper as vector patterns** · p1 · feature · L · M2 Library & Documents
  - [SN-TPL-004](templates.md#sn-tpl-004) **Render Cornell, music staff, weekly planner and flashcard structural templates** · p1 · feature · M · M2 Library & Documents
  - [SN-TPL-005](templates.md#sn-tpl-005) **Add paper tints, page sizes and orientation with adjustable line spacing** · p1 · feature · S · M2 Library & Documents
  - [SN-TPL-006](templates.md#sn-tpl-006) **Build the Templates overlay for new notebooks and per-page paper changes** · p1 · feature · M · M2 Library & Documents
  - [SN-TPL-007](templates.md#sn-tpl-007) **Apply per-page re-paper and clone the current paper onto new pages** · p1 · feature · S · M2 Library & Documents
  - [SN-TPL-008](templates.md#sn-tpl-008) **Gate premium templates behind the plan with a free everyday-paper set** · p2 · feature · S · M2 Library & Documents
  - [SN-TPL-009](templates.md#sn-tpl-009) **Add notebook covers with presets and custom image or PDF-first-page art** · p2 · feature · M · M2 Library & Documents
  - [SN-TPL-010](templates.md#sn-tpl-010) **Create custom templates from a page, PDF or image into My Templates** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-TPL-011](templates.md#sn-tpl-011) **Define the template store catalogue format and browse-and-install surface** · p3 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-TPL-012](templates.md#sn-tpl-012) **Support hyperlinked digital planners with internal tab-to-page navigation** · p3 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-TPL-013](templates.md#sn-tpl-013) **Harden template and cover import and record template licensing metadata** · p1 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-TPL-014](templates.md#sn-tpl-014) **Golden-test every paper template across the 17 looks, dark mode and tints** · p2 · test · S · M2 Library & Documents
  - [SN-TPL-015](templates.md#sn-tpl-015) **Cache paper rendering to hold the 1,000-page open and 60 fps scroll budgets** · p1 · task · M · M2 Library & Documents
  - [SN-GA11-017](i18n.md#sn-ga11-017) **Localise planner templates: month names, first day of week and calendars** · p3 · feature · M · M2 Library & Documents

---

## Issues

### SN-TPL-001

<a id="sn-tpl-001"></a>

**Templates, paper & covers (paper types, tints, sizes, custom templates, store)**

| Field | Value |
|---|---|
| GitHub | #32 |
| Type | epic |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-1`, `MASVS-CODE-4`, `MASVS-NETWORK-1`, `MASVS-PRIVACY-2`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
Templates and paper are how a note becomes a *page*: the fill pattern behind the ink (lined/grid/dot/blank/Cornell/music/planner/flashcards), the tint wash, the page size, and the notebook cover. Sane Notes' headline differentiator here is **per-page templates within one notebook** — competitors (Notability) force one template per note and re-paper every page when it changes, a well-known limitation we must beat (docs/product/prd-02-library-documents-audio-search.md §6 intro). This epic delivers the template/cover data model, a **vector** (never raster) paper-pattern renderer that holds the perf budgets and renders correctly across all 17 looks + dark mode, the Templates overlay (screens §8), per-page re-paper, plan gating, covers, custom templates from PDF/image, a template store/catalogue format, hyperlinked planners, and the licensing/import-hardening that lets untrusted template files in safely. Paper is drawn from design tokens (docs/design/tokens.json `paperFill`/`tint`/`tintSwatches`/`templates`), so nothing hard-codes a colour.

#### Scope
**In:** Template & Cover entities and per-notebook defaults; vector paper patterns (blank/lined/grid/dot/isometric/chemistry-hex) with adjustable spacing; structural templates (Cornell/Music/Weekly planner/Flashcards); tints, sizes (Auto/A4/Letter), orientation; the Templates overlay in `new` and `page` modes; per-page re-paper and new-page clone; template plan gating; covers (preset + custom image / PDF first page); custom templates + "My Templates"; template store/catalogue format & browse-install; hyperlinked digital planners; import hardening + template licensing metadata; golden + render-perf gates.
**Out:** page-kind navigation internals for paged/infinite/PDF-backed canvases (SN-PG area), the PDF render engine ([SN-PDF-002](pdf.md#sn-pdf-002)), the image import pipeline ([SN-MED-001](images-media.md#sn-med-001)), notebook thumbnails/library cards ([SN-LIB-002](library.md#sn-lib-002)), internal-link plumbing consumed by planners (SN-PG/library), billing/entitlement machinery ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] All child issues below are closed and CI is green.
- [ ] Every built-in paper renders as vector geometry (no bitmap), pixel-correct in all 17 looks and light+dark, at every tint and the 9 spacing presets.
- [ ] A notebook can hold pages with different paper/tint/size at once; changing one page's paper never mutates another page.
- [ ] Opening a 1,000-page notebook stays < 1 s and paper never causes a frame > 16.7 ms while scrolling (perf gate).
- [ ] A hostile custom-template PDF/image or downloaded store asset fails **closed**, is parsed off the UI isolate, resource-capped and path-confined.

#### Technical notes
Model + logic live in `packages/sane_core` (Template, Cover value types) and rendering in `packages/sane_render` (PaperPainter). Tokens via `packages/sane_ui` from docs/design/tokens.json. DAG (CLAUDE.md §3): sane_render → sane_ink → sane_core → sane_crypto; feature packages depend on sane_core only. PRDs: PRD-LB-090..098 (page kinds, paper, tints, per-page, custom, store, gating), PRD-LB-043 (covers), PRD-LB-032 (subject tint on swatch). ADRs: ADR-0005 (document model), ADR-0014 (PDF engine for PDF-backed pages + custom-template PDFs), ADR-0003 (state/app structure for the overlay). ⚠ PRD-02 stamps M1/M5 with the older editor-centric numbering; per docs/roadmap.md the authority is issues/milestones.json (PDF+library → M2; study/template-store → M6). Children:
- [ ] [SN-TPL-002](templates.md#sn-tpl-002) Template & cover data model + per-notebook defaults
- [ ] [SN-TPL-003](templates.md#sn-tpl-003) Vector paper-pattern renderer (blank/lined/grid/dot/isometric/chemistry-hex)
- [ ] [SN-TPL-004](templates.md#sn-tpl-004) Structural templates (Cornell/Music/Weekly planner/Flashcards)
- [ ] [SN-TPL-005](templates.md#sn-tpl-005) Paper tints, page sizes & orientation
- [ ] [SN-TPL-006](templates.md#sn-tpl-006) Templates overlay (New notebook / Paper & template)
- [ ] [SN-TPL-007](templates.md#sn-tpl-007) Per-page re-paper & new-page clone
- [ ] [SN-TPL-008](templates.md#sn-tpl-008) Template plan gating + Upgrade overlay
- [ ] [SN-TPL-009](templates.md#sn-tpl-009) Notebook covers (presets + custom image / PDF first page)
- [ ] [SN-TPL-010](templates.md#sn-tpl-010) Custom templates from page/PDF/image + My Templates
- [ ] [SN-TPL-011](templates.md#sn-tpl-011) Template store / catalogue format & browse-install
- [ ] [SN-TPL-012](templates.md#sn-tpl-012) Hyperlinked digital planners
- [ ] [SN-TPL-013](templates.md#sn-tpl-013) Harden custom-template/cover import + template licensing metadata
- [ ] [SN-TPL-014](templates.md#sn-tpl-014) Paper & template golden suite (17 looks + dark + tints)
- [ ] [SN-TPL-015](templates.md#sn-tpl-015) Template rendering performance & caching gate

#### Security & privacy
Built-in paper is pure rendering (baseline: no content logging, tokens only). The risk concentrates in *ingest*: custom-template PDFs/images and downloaded store assets are untrusted input — validate MIME/size/schema, cap resources before decode (decompression bombs), parse off the UI isolate, canonicalise paths, and strip active content (no SVG/font scripting) (CLAUDE.md §7.8). Custom cover images strip EXIF (privacy). Store downloads use TLS 1.2+ with integrity verification. IDs: MASVS-STORAGE-1, MASVS-CODE-1, MASVS-CODE-4, MASVS-NETWORK-1, MASVS-PRIVACY-2, CWE-20, CWE-400.

#### UX notes
Surfaces: Templates overlay (docs/design/screens-and-flows.md §8), Editor canvas paper fill (§7.2), Free vs Pro (§14). All paper + chrome render in all 17 looks and light+dark; controls carry Semantics labels, 44 pt / 48 dp targets, contrast ≥ 4.5:1, keyboard-reachable on web. Empty ("My Templates" empty), loading (store fetch), error (bad import) and offline (store unreachable) states are specified in the children.

#### Test plan
Unit tests for the model (`packages/sane_core/test/template/`), golden tests per look for every paper ([SN-TPL-014](templates.md#sn-tpl-014)), widget tests for the overlay, integration test for per-page re-paper, fuzz/negative tests for import hardening ([SN-TPL-013](templates.md#sn-tpl-013)), and the render-perf benchmark ([SN-TPL-015](templates.md#sn-tpl-015)). Umbrella suites: `packages/sane_render/test/paper/` and `app/integration_test/templates_test.dart`.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold), [SN-CORE-002](storage.md#sn-core-002) (document-model entities). Coordinates with [SN-DS-002](design-system.md#sn-ds-002) (tokens), [SN-LIB-002](library.md#sn-lib-002) (library home entry point), [SN-PDF-002](pdf.md#sn-pdf-002) (PDF render), [SN-MED-001](images-media.md#sn-med-001) (images), [SN-BILL-001](billing.md#sn-bill-001) (entitlements), [SN-PG-002](pages-canvas.md#sn-pg-002)/[SN-PG-003](pages-canvas.md#sn-pg-003) (page kinds).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-002

<a id="sn-tpl-002"></a>

**Model template and cover entities with per-notebook paper defaults**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | templates, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-STORAGE-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Every template feature reads and writes the same value types, so the model comes first (CLAUDE.md §5 DAG order: model → logic → …). PRD-02 §2 fixes the shapes: a **Template** carries `id, kind, paperType, tint, size, orientation, source(builtin|custom|store), assetRef?`, a **Cover** carries `id, kind(preset|image), assetRef?`, and a **Notebook** carries `coverId?, pageKind, defaultPaper, defaultTint, defaultSize` while each **Page** stores its own `paper, tint` (design §17 seed) so paper is per-page, not per-notebook (docs/product/prd-02-library-documents-audio-search.md §2, §6). This issue defines these immutable Dart value objects, their enums, serialisation, and the repository interface — the substrate the renderer ([SN-TPL-003](templates.md#sn-tpl-003)) and overlay ([SN-TPL-006](templates.md#sn-tpl-006)) build on.

#### Scope
**In:** `Template`, `Cover`, `PaperType` (blank/lined/grid/dot/cornell/music/planner/flash/isometric/chemHex), `PaperTint` (none/cream/yellow/gray), `PageSize` (auto/a4/letter/a3/a5/legal), `PageOrientation` (portrait/landscape), `PaperSpacing` (the 9 presets), `TemplateSource` (builtin/custom/store) as immutable freezed-style value types in `sane_core`; JSON (and `.sanenote`) serialisation with schema versioning; the `TemplateRepository` interface; per-notebook default resolution (`defaultPaper/defaultTint/defaultSize`) and the page-clone rule.
**Out:** rendering the patterns ([SN-TPL-003](templates.md#sn-tpl-003)), the overlay UI ([SN-TPL-006](templates.md#sn-tpl-006)), custom-template asset ingest ([SN-TPL-010](templates.md#sn-tpl-010)), store catalogue schema ([SN-TPL-011](templates.md#sn-tpl-011)), drift table wiring (SN-CORE-004 persistence).

#### Acceptance criteria
- [ ] `Template`, `Cover` and the enums are immutable value types with `==`/`hashCode`; a change yields a new instance.
- [ ] Round-trip serialise → deserialise is lossless for every built-in `paperType` × `tint` × `size` × `orientation` × spacing combination (property test).
- [ ] `PaperSpacing` enumerates the 9 presets (½″–3″ range per PRD-LB-093) with millimetre values; an out-of-range value is rejected via `Result<T,Failure>`, never a throw across the boundary.
- [ ] Unknown/forward enum values in a deserialised bundle degrade to a safe default (blank/none/auto) rather than failing the whole page load.
- [ ] `resolveNewPagePaper(currentPage)` returns a clone of the current page's paper/tint (PRD-LB-094 `addPage`), and for PDF-backed pages returns tint-only.

#### Technical notes
Create `packages/sane_core/lib/src/template/template.dart`, `cover.dart`, `paper.dart` (enums), `template_repository.dart`. Pure Dart — no `package:flutter` in sane_core (CLAUDE.md §3). Use sealed `Result<T,Failure>` for validation. Serialisation carries a `schemaVersion` int for `.sanenote` forward-compat (docs/architecture/file-format.md). Implements PRD-LB-090 (pageKind lives on Page), PRD-LB-092/093 (paper/tint/size sets), PRD-LB-094 (per-page + clone), PRD-02 §2 entity tables; ADR-0005 (document model & CRDT — template fields are LWW registers on Notebook/Page). Token keys mirror docs/design/tokens.json (`templates[].key`, `tintSwatches[].key`).

#### Security & privacy
Model only; note content (paper choice, custom assetRefs) stays on device and is E2E-encrypted on sync (decision 3). Validate deserialised fields (type/range/enum) before use so a malformed `.sanenote` cannot inject an invalid state (CWE-20). `assetRef` is an opaque content hash, never a filesystem path. IDs: MASVS-STORAGE-1, CWE-20.

#### UX notes
No direct chrome; this is the data substrate for the Templates overlay (docs/design/screens-and-flows.md §8) and Editor canvas (§7.2). The default-resolution rule directly serves the "new page clones current paper" behaviour users feel in the page rail (§7.7). A11y: none beyond baseline (model layer).

#### Test plan
`packages/sane_core/test/template/template_serialization_test.dart` (round-trip, forward-compat degradation), `paper_enums_test.dart` (spacing range, rejection), `new_page_clone_test.dart` (clone + PDF tint-only). Pure unit tests, headless.

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) (document-model entities), [SN-FND-002](devx.md#sn-fnd-002) (scaffold).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-003

<a id="sn-tpl-003"></a>

**Render blank, lined, grid, dot, isometric and chemistry paper as vector patterns**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates, design-system |
| Size | L |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-002](templates.md#sn-tpl-002), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-STORAGE-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
The paper fill is the most-seen pixel in the app — it sits behind every stroke on every page — so it must be resolution-independent, tokenised, and cheap. The mockup expresses paper as SVG pattern refs (`url(#ss-lined)`, `#ss-grid`, `#ss-dot`… in docs/design/tokens.json `paperFill`); in Flutter these become a **`PaperPainter` `CustomPainter`** that tessellates the repeating geometry directly into the canvas, never a rasterised image, so it stays crisp at 25%–400% zoom and on ProMotion/HiDPI screens (docs/product/prd-02-library-documents-audio-search.md §6.2; design §7.2). This issue builds the repeating geometric papers — **blank, lined, grid, dotted, isometric, chemistry (hex)** — with adjustable spacing; the structured papers (Cornell/music/planner/flash) are [SN-TPL-004](templates.md#sn-tpl-004).

#### Scope
**In:** `PaperPainter` in `sane_render` drawing blank (no-op), lined (horizontal rules), grid (rules both axes), dotted (dot lattice), isometric (30°/150°/vertical guides), chemistry-hex (hex lattice); spacing parameterised from `PaperSpacing` (9 presets, ½″–3″); line/dot colour and weight pulled from `sane_ui` tokens (`ln`, `mu` palette roles) so every look restyles paper; margin/edge handling for A4/Letter vs Auto; tiling so only the visible viewport tessellates.
**Out:** structural region rules ([SN-TPL-004](templates.md#sn-tpl-004)), tint wash overlay ([SN-TPL-005](templates.md#sn-tpl-005)), the caching/Picture-flatten perf work ([SN-TPL-015](templates.md#sn-tpl-015)), PDF-backed page facsimile ([SN-PDF-002](pdf.md#sn-pdf-002)).

#### Acceptance criteria
- [ ] Each of blank/lined/grid/dot/isometric/chemHex renders as vector geometry (assert no `Image`/bitmap in the paint path) and stays crisp at 25%, 100% and 400% zoom (golden at 3 zooms).
- [ ] Line/dot colour derives from the active look's tokens (`ln`/`mu`), so switching any of the 17 looks or toggling dark mode restyles paper with no hard-coded colour (golden per look).
- [ ] All 9 spacing presets produce the documented millimetre pitch at A4 100% (measured in a golden/pixel test within ±1 px).
- [ ] Only viewport-visible tiles are tessellated; painting a 2400×2400 freeform page does not iterate the whole page each frame (benchmark asserts bounded draw ops).
- [ ] Paper paints in < 2 ms on the reference iPad at 100% for an 800×1040 page (profile timeline attached).

#### Technical notes
Create `packages/sane_render/lib/src/paper/paper_painter.dart` and one strategy per pattern (`lined_paper.dart`, `grid_paper.dart`, `dot_paper.dart`, `iso_paper.dart`, `hex_paper.dart`). Draw with `Canvas.drawLine`/`drawPoints`/`Path`; clip to the visible rect; snap coordinates to device pixels to avoid shimmer. Colours come from the `sane_ui` ThemeExtension ([SN-DS-002](design-system.md#sn-ds-002)) — never `Color(0x…)` literals (CLAUDE.md §9). Page geometry constants from tokens.json `page` (`W:800,H:1040`, freeform `2400×2400`). Isometric/chemistry match Goodnotes' free set (PRD-LB-092 M1+). Wrap in a `RepaintBoundary` under the stroke layer so ink repaints do not repaint paper.

#### Security & privacy
None beyond baseline: pure rendering, no note content, no logging, tokens only. Cap tessellation work by viewport so a pathological zoom/spacing cannot exhaust CPU/GPU (CWE-400). IDs: MASVS-STORAGE-1, CWE-400.

#### UX notes
Surface: Editor canvas paper fill (docs/design/screens-and-flows.md §7.2) and the Template overlay previews (§8). Must render correctly in all 17 looks and light+dark; on dark looks paper rules dim rather than glare (use `ln` role, not pure white). A11y: paper is decorative — exclude from Semantics; ensure ink contrast over the busiest paper (chemistry hex) still meets 4.5:1 for typed text via token choice. Empty state: blank paper renders nothing (transparent to the page ground).

#### Test plan
`packages/sane_render/test/paper/paper_painter_golden_test.dart` (each pattern × 3 zooms, contributes to [SN-TPL-014](templates.md#sn-tpl-014)), `spacing_pitch_test.dart` (measured pitch), `paper_bench_test.dart` (draw-op bound + paint time). Golden across looks handled centrally in [SN-TPL-014](templates.md#sn-tpl-014).

#### Dependencies
[SN-TPL-002](templates.md#sn-tpl-002) (paper enums), [SN-DS-002](design-system.md#sn-ds-002) (tokens ThemeExtension).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-004

<a id="sn-tpl-004"></a>

**Render Cornell, music staff, weekly planner and flashcard structural templates**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-003](templates.md#sn-tpl-003) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Beyond plain rules, students need paper with *structure*: Cornell note-taking (cue column + notes + summary), music staves, a weekly planner grid, and flashcard outlines. The design calls these out explicitly — "Cornell adds divider rules; Music = staff lines; Flashcards = card outline" (docs/design/screens-and-flows.md §7.2) — and PRD-LB-092 requires them to "render their structural rules (divider rules, card outline, staff lines)" as MUST built-ins (docs/product/prd-02-library-documents-audio-search.md §6.2). These are region-aware papers that build on the base pattern renderer ([SN-TPL-003](templates.md#sn-tpl-003)): Cornell overlays a lined field with a cue divider and summary band; music draws grouped 5-line staves; planner draws a labelled day grid; flashcards draw the fold/card outline.

#### Scope
**In:** `CornellPaper` (left cue column ~22%, bottom summary band ~15%, lined notes field), `MusicPaper` (repeating 5-line staves with configurable staff count/gap), `PlannerPaper` (7-day × time-row grid with weekday labels), `FlashcardPaper` (front/back card outline + fold line) as `PaperPainter` strategies; token-driven divider/label colours; A4/Letter/Auto layout scaling; landscape variants where sensible (planner).
**Out:** planner *hyperlinks* (tabs → month/week/day) which are [SN-TPL-012](templates.md#sn-tpl-012); flashcard *study mode* (spaced repetition, SN-STDY area); base geometric patterns ([SN-TPL-003](templates.md#sn-tpl-003)); tints ([SN-TPL-005](templates.md#sn-tpl-005)).

#### Acceptance criteria
- [ ] Cornell renders a cue divider, notes field and summary band at documented proportions; proportions scale correctly for A4, Letter and Auto (golden per size).
- [ ] Music renders evenly spaced 5-line staves that tile the page height with no partial staff clipped at the bottom margin.
- [ ] Weekly planner renders 7 labelled day columns and time rows; weekday labels come from the active locale (i18n-aware, PRD-LB / locale formats).
- [ ] Flashcards render the card outline + fold line and align to a whole number of cards per page.
- [ ] All four render correctly in all 17 looks and light+dark using tokens only (golden), and the overlay preview thumbnails match the full-page render.

#### Technical notes
Add `packages/sane_render/lib/src/paper/cornell_paper.dart`, `music_paper.dart`, `planner_paper.dart`, `flashcard_paper.dart`, each extending the `PaperPainter` base from [SN-TPL-003](templates.md#sn-tpl-003). Divider/label/rule colours from `sane_ui` tokens (`ln`, `mu`). Weekday labels via the app's `intl`/localisation layer (do not hard-code English). tokens.json maps these to `paperFill` keys (`cornell`→lined base, `music`→`#ss-music`, `planner`→grid base, `flash`→`#ss-flash`). Implements PRD-LB-092. Structural regions must be pure geometry so ink sits above them and hit-testing is unaffected.

#### Security & privacy
None beyond baseline: decorative rendering, no note content, no logging, tokens only. IDs: MASVS-STORAGE-1.

#### UX notes
Surfaces: Editor canvas (docs/design/screens-and-flows.md §7.2), Template overlay grid where "Cornell/Planner get preview rules" (§8). Cornell/music/planner/flash must be legible on warm looks (Paper/Skeuo) and neon looks (Cyber/Y2K) alike. A11y: label the paper choice in the overlay (`Semantics` "Cornell paper") though the rendered rules themselves are decorative; keep divider contrast subtle so it never competes with ink. Landscape planner reflows columns without overlap.

#### Test plan
`packages/sane_render/test/paper/structural_paper_golden_test.dart` (each template × A4/Letter/Auto, feeds [SN-TPL-014](templates.md#sn-tpl-014)), `music_staff_tiling_test.dart` (no clipped staff), `planner_locale_test.dart` (weekday labels follow locale). Golden-across-looks centralised in [SN-TPL-014](templates.md#sn-tpl-014).

#### Dependencies
[SN-TPL-003](templates.md#sn-tpl-003) (base PaperPainter).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-005

<a id="sn-tpl-005"></a>

**Add paper tints, page sizes and orientation with adjustable line spacing**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates |
| Size | S |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-002](templates.md#sn-tpl-002), [SN-TPL-003](templates.md#sn-tpl-003) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Paper is more than its pattern: a tint wash softens glare, page size fixes print fidelity, and orientation + spacing adapt the sheet to the task. PRD-LB-093 requires tints **White (none), Cream, Yellow, Gray** (extensible), sizes **Auto, A4, Letter** (A3/A5/Legal as MAY), **portrait/landscape** orientation, and adjustable line/grid/dot **spacing** (Notability offers ~9 presets ½″–3″) (docs/product/prd-02-library-documents-audio-search.md §6.2). The tint values are already tokenised (docs/design/tokens.json `tint` = `none`/`cream`/`yellow`/`gray`, plus `tintSwatches` for the picker), so this issue is mostly wiring the tint overlay above the pattern and mapping sizes to physical page geometry.

#### Scope
**In:** a tint wash layer painted above the paper pattern and below ink using tokens.json `tint` rgba values; `PageSize` → physical dimension mapping (A4 210×297 mm, Letter 8.5×11″, Auto = base 800×1040 logical) with DPI-correct sizing; portrait/landscape swap; the 9 spacing presets exposed to the pattern painters ([SN-TPL-003](templates.md#sn-tpl-003)/[SN-TPL-004](templates.md#sn-tpl-004)); the picker swatches from `tintSwatches`.
**Out:** the overlay layout itself ([SN-TPL-006](templates.md#sn-tpl-006)), per-page application flow ([SN-TPL-007](templates.md#sn-tpl-007)), A3/A5/Legal (leave as MAY stubs behind a flag), PDF-backed pages (tint-only handled in [SN-TPL-007](templates.md#sn-tpl-007)).

#### Acceptance criteria
- [ ] Cream/Yellow/Gray tints render as the exact rgba washes in tokens.json `tint`; White = no wash; the wash sits above paper and below ink (z-order golden).
- [ ] A4 and Letter produce physically correct aspect ratios and export at the right physical size; Auto keeps the 800×1040 base (test asserts mm dimensions).
- [ ] Toggling orientation swaps width/height and re-lays the pattern without distortion (golden portrait + landscape).
- [ ] All 9 spacing presets are selectable and change the rendered pitch live (widget test drives the control, pattern updates).
- [ ] Tints render correctly over every look in light+dark (the gray tint stays subtle on dark looks; golden).

#### Technical notes
Add a `TintLayer` painter in `packages/sane_render/lib/src/paper/tint_layer.dart` reading `sane_ui` token `tint.*`; add `PageGeometry` in `sane_core` mapping `PageSize`+`PageOrientation` to logical px and mm. Wire `PaperSpacing` presets through the pattern painters. A3/A5/Legal enum values exist ([SN-TPL-002](templates.md#sn-tpl-002)) but are gated behind a `// DESIGN-OPEN:` MAY flag per PRD-LB-093. Reference tokens.json `tintSwatches` for picker colours (distinct from the wash rgba). Implements PRD-LB-093.

#### Security & privacy
None beyond baseline: rendering + geometry math, no note content, no logging, tokens only. IDs: MASVS-STORAGE-1.

#### UX notes
Surfaces: Template overlay TINTS + size segmented control (docs/design/screens-and-flows.md §8), Settings paper defaults. Swatches show the four tints with the selected one double-ringed (mirrors the ink swatch pattern in §7.3). Tint names are localised. A11y: each swatch is a labelled toggle (`Semantics` "Cream paper tint, selected"), 44 pt targets, and selection is not colour-only (add the ring). Spacing control announces its value.

#### Test plan
`packages/sane_render/test/paper/tint_layer_test.dart` (rgba + z-order), `packages/sane_core/test/template/page_geometry_test.dart` (mm dimensions, orientation swap), `spacing_control_test.dart` (widget). Contributes tint goldens to [SN-TPL-014](templates.md#sn-tpl-014).

#### Dependencies
[SN-TPL-002](templates.md#sn-tpl-002) (enums), [SN-TPL-003](templates.md#sn-tpl-003) (pattern painters).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-006

<a id="sn-tpl-006"></a>

**Build the Templates overlay for new notebooks and per-page paper changes**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates, onboarding |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-002](templates.md#sn-tpl-002), [SN-TPL-003](templates.md#sn-tpl-003), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PLATFORM-3` |
| Extra labels | agent-ready |

#### Context
The Templates overlay is where a user picks paper — either creating a notebook ("New notebook") or re-papering the current page ("Paper & template"). Its full spec is design §8: a **Page style** segmented control (Pages vs Freeform canvas, with the freeform explainer copy), a **Template** grid from `TPLS`, **Paper color** tint swatches from `TINTS`, a **Page size** segmented control, and a footer whose apply button reads "Create notebook" or "Apply to this page" depending on `tplMode` (docs/design/screens-and-flows.md §8; docs/product/prd-02-library-documents-audio-search.md §6.1). This issue builds the overlay widget and its state (`tplMode/tplStyle/tplSel/tplTint/tplSize`); the actual apply behaviour for pages is [SN-TPL-007](templates.md#sn-tpl-007) and plan gating is [SN-TPL-008](templates.md#sn-tpl-008).

#### Scope
**In:** the overlay widget with `tplMode` (`new`|`page`) driving title + apply-label; the Pages/Freeform segmented control with the freeform explainer ("An endless board instead of pages…"); the template grid rendering live previews via the painters ([SN-TPL-003](templates.md#sn-tpl-003)/[SN-TPL-004](templates.md#sn-tpl-004)); the tint swatches and size segmented control ([SN-TPL-005](templates.md#sn-tpl-005)); preselecting the current page's paper/tint in `page` mode; Cancel; wiring the freeform choice to hide the template grid + size control; the subject-colour tint on the default swatch preview (PRD-LB-032).
**Out:** applying to a page / creating the notebook ([SN-TPL-007](templates.md#sn-tpl-007)), Pro gating + Upgrade overlay ([SN-TPL-008](templates.md#sn-tpl-008)), custom-template rows / "My Templates" ([SN-TPL-010](templates.md#sn-tpl-010)), the store tab ([SN-TPL-011](templates.md#sn-tpl-011)).

#### Acceptance criteria
- [ ] Opening from Library "New notebook" shows title "New notebook" and apply label "Create notebook"; opening from Editor "Paper & templates" shows "Paper & template", "Apply to this page", and preselects the current page's paper/tint (widget test both modes).
- [ ] Selecting Freeform shows the explainer copy and hides the template grid + page-size control (per §8); selecting Pages restores them.
- [ ] Template tiles render live vector previews (not static images) and the selected tile shows a clear selected state (ring), matching the ink-swatch pattern.
- [ ] The overlay renders correctly in all 17 looks + light+dark, at phone width (~400 px) it stacks to one column, and click-outside / Cancel closes without mutating state.
- [ ] All controls are keyboard-reachable on web and carry Semantics labels; targets are ≥ 44 pt / 48 dp.

#### Technical notes
Build in `app/lib/features/templates/templates_overlay.dart` as a `StatelessWidget` fed by a Riverpod `templatesOverlayProvider` holding `tplMode/tplStyle/tplSel/tplTint/tplSize` (ADR-0003; no business logic in `build`). Reuse `sane_ui` components ([SN-DS-003](design-system.md#sn-ds-003): segmented control, swatch, card, modal scaffold). Previews reuse the `PaperPainter`s ([SN-TPL-003](templates.md#sn-tpl-003)/[SN-TPL-004](templates.md#sn-tpl-004)) at thumbnail scale. Copy strings from design §8/§16 go through localisation. Overlay is a `state.overlay` modal (screens §1) with dimmed backdrop + click-outside-to-close. Implements PRD-LB-091 (freeform explainer), PRD-LB-092/093 (grids), PRD-LB-032 (subject-tinted swatch).

#### Security & privacy
UI only; no note content leaves the overlay. A deep link or share must never open this overlay in a way that auto-mutates a document — it lands in a view/confirm state and requires an explicit apply tap (CLAUDE.md §7.8; MASVS-PLATFORM-3). No logging of selections. IDs: MASVS-STORAGE-1, MASVS-PLATFORM-3.

#### UX notes
Exact surface: docs/design/screens-and-flows.md §8 (Templates overlay) with copy preserved from §16. Freeform explainer verbatim: "An endless board instead of pages — it grows in every direction as you write, sketch and pin PDFs. Best for mind maps, problem-solving and group whiteboarding." Loading state: previews paint immediately (vector, no async). Empty state: N/A (built-ins always present). Error state: none (local). All 17 looks + dark mode; adaptive to phone width.

#### Test plan
`app/test/features/templates/templates_overlay_test.dart` (mode-driven title/label, freeform toggles grid, preselection, Cancel no-mutate, a11y labels), golden `templates_overlay_golden_test.dart` (a few representative looks + phone width). Feeds [SN-TPL-014](templates.md#sn-tpl-014) for full look coverage.

#### Dependencies
[SN-TPL-002](templates.md#sn-tpl-002) (model), [SN-TPL-003](templates.md#sn-tpl-003) (previews), [SN-DS-003](design-system.md#sn-ds-003) (components). Entry points from [SN-LIB-002](library.md#sn-lib-002) and the editor toolbar ([SN-ED-002](editor.md#sn-ed-002)).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-007

<a id="sn-tpl-007"></a>

**Apply per-page re-paper and clone the current paper onto new pages**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates, pages-canvas |
| Size | S |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-006](templates.md#sn-tpl-006), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready, innovation |

#### Context
This is the differentiator: **per-page templates within one notebook**. Notability forces one template per note and re-papers every page when it changes; Sane Notes MUST let each page carry its own paper and change it in isolation (docs/product/prd-02-library-documents-audio-search.md §6 intro, PRD-LB-094). From the editor's "Paper & templates" the user changes *the current page's* paper/tint/size without touching other pages (mock `tplMode:'page'`), PDF-backed pages accept **tint only**, and adding a page **clones** the current page's paper/tint (mock `addPage`) so a lecture stays visually consistent unless the user chooses otherwise (design §7.7, §8).

#### Scope
**In:** the `applyTemplate` action for `page` mode — mutate only the active page's `paper/tint/size` via the CRDT LWW registers, close the overlay, repaint; the PDF-backed-page rule (accept tint, ignore pattern/size); the `addPage` clone rule (new page inherits current paper/tint); an undo entry so a re-paper is reversible; toasts per §8.
**Out:** the overlay UI ([SN-TPL-006](templates.md#sn-tpl-006)), creating a *new notebook* from `new` mode (library flow, [SN-TPL-006](templates.md#sn-tpl-006)/[SN-LIB-002](library.md#sn-lib-002)), converting page kind paged↔freeform (PRD-LB-381, SN-PG area), undo/redo engine internals ([SN-ED-002](editor.md#sn-ed-002)).

#### Acceptance criteria
- [ ] Changing page 3's paper leaves pages 1,2,4… byte-identical (integration test asserts other pages unchanged).
- [ ] Re-papering a PDF-backed page applies the tint only and leaves the facsimile and pattern untouched (test).
- [ ] `+ Page` creates a page whose paper/tint equals the current page's (clone), and the new page is independently re-paperable afterwards.
- [ ] A re-paper pushes one undo step; undo restores the previous paper exactly and clears any transient selection.
- [ ] Applying shows the documented toast and closes the overlay; no frame > 16.7 ms during the swap.

#### Technical notes
Implement the action in `app/lib/features/templates/` calling into `sane_core` document mutations (LWW register set on Page — ADR-0005). Re-paper is an op-log operation so it syncs and is undoable ([SN-ED-002](editor.md#sn-ed-002) undo model, op-log-backed). Snapshot-before-destructive: PRD-LB-341 lists "before template change" as a version-history boundary — emit that boundary here. New-page clone uses `resolveNewPagePaper` from [SN-TPL-002](templates.md#sn-tpl-002). Implements PRD-LB-094; design §7.7 `addPage`, §8 `applyTemplate` page branch. Do not hop isolates on the swap (CLAUDE.md §8).

#### Security & privacy
Paper choice is note content — stays local, E2E-encrypted on sync (decision 3), never logged. The re-paper op mutates only the targeted page id; validate the page id belongs to the open notebook before mutating (no cross-notebook write). IDs: MASVS-STORAGE-1.

#### UX notes
Surface: Editor "Paper & templates" (docs/design/screens-and-flows.md §7.1 toolbar → §8 overlay, §7.7 page rail `+ Page`). Toast copy from §8. The change is instant and local; no loading state. Error state: if a page id is stale, fail silently to no-op with a debug log (no PII). A11y: the apply button and `+ Page` carry labels; announce "Paper changed" to screen readers.

#### Test plan
`app/integration_test/templates_test.dart` (re-paper isolation across pages, PDF tint-only, clone-on-add, undo), `app/test/features/templates/repaper_action_test.dart` (op emitted, snapshot boundary). Uses the document-model test harness from SN-CORE.

#### Dependencies
[SN-TPL-006](templates.md#sn-tpl-006) (overlay), [SN-ED-002](editor.md#sn-ed-002) (editor canvas + undo). Coordinates with [SN-PG-002](pages-canvas.md#sn-pg-002) (paged page kind).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-008

<a id="sn-tpl-008"></a>

**Gate premium templates behind the plan with a free everyday-paper set**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates, billing |
| Size | S |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-006](templates.md#sn-tpl-006) |
| Security controls | `MASVS-STORAGE-1`, `OWASP-A01` |
| Extra labels | agent-ready |

#### Context
Sane Notes must not paywall the paper students use daily. PRD-LB-098 requires the free plan to include at least **Blank, Lined, Grid, Dotted plus Cornell** (so study paper is never blocked), while Pro unlocks the full built-in set plus store premium templates; selecting a Pro template opens the **Upgrade** overlay rather than silently failing (docs/product/prd-02-library-documents-audio-search.md §6.4; design §14 Free vs Pro "Lined / grid / dotted" → "Every template"). This issue adds the entitlement check to the Templates overlay and the gated-selection → Upgrade flow, honouring the locked rule that entitlement failures **degrade to free, never block local note-taking** (docs/roadmap.md M8).

#### Scope
**In:** a `TemplateEntitlement` gate mapping each built-in `paperType`/store item to free|pro; badging Pro tiles (lock glyph) in the overlay ([SN-TPL-006](templates.md#sn-tpl-006)); intercepting a Pro selection on the free plan → open the Upgrade overlay (design §13) with the correct toast; reading plan state from `sane_billing` ([SN-BILL-001](billing.md#sn-bill-001)); fail-open (treat unknown/expired entitlement as free, and never crash the overlay).
**Out:** the Upgrade overlay UI itself ([SN-BILL-001](billing.md#sn-bill-001)/onboarding), the store catalogue + purchases ([SN-TPL-011](templates.md#sn-tpl-011)), template-store *monetisation model* decision (needs-decision, tracked in [SN-TPL-011](templates.md#sn-tpl-011)), student verification ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] On the free plan, Blank/Lined/Grid/Dotted/Cornell are selectable and apply normally; the rest of the built-in set shows a Pro badge.
- [ ] Selecting a Pro-gated template on the free plan opens the Upgrade overlay and does not create/re-paper anything (widget test).
- [ ] On Pro, all built-ins select with no gate and no badge.
- [ ] If entitlement state is missing/expired/errored, the app fails **open** to the free set (never blocks note-taking, never crashes) — negative test.
- [ ] The gate reads entitlement through the `sane_billing` interface only (no direct store/IAP call from the templates layer).

#### Technical notes
Add `app/lib/features/templates/template_entitlement.dart` mapping `PaperType`/store item id → tier, consuming `EntitlementRepository` from `sane_billing` ([SN-BILL-001](billing.md#sn-bill-001)). The free set is a constant list per PRD-LB-098 (blank, lined, grid, dot, cornell). Gate at selection, not at render (previews always show). Upgrade overlay is invoked, not built here (design §13 copy: "3 people per notebook · Lined, grid, dotted paper" free vs "every template" Pro). Entitlement is per-account (PRD-LB-351). Implements PRD-LB-098; ties to §14 plan matrix. Ships in M2 without SN-BILL-001: the entitlement read is behind the `EntitlementProvider` contract ([SN-BILL-012](billing.md#sn-bill-012)), with a permissive stub (fail-open to Free) until billing lands in M8.

#### Security & privacy
Authorization boundary: a client-side gate is a UX affordance, not a trust boundary — do not treat the free/Pro flag as a security control for anything sensitive; it only unlocks local paper (OWASP-A01 broken access control is out of scope because no server asset is protected here). Entitlement token is verified in `sane_billing`, not re-implemented here. No plan/PII logging. Fail-open by design. IDs: MASVS-STORAGE-1, OWASP-A01.

#### UX notes
Surface: Templates overlay Pro badges + Upgrade overlay (docs/design/screens-and-flows.md §8, §13, §14). The lock glyph and "Pro" chip use `sane_ui` tokens; badges render in all 17 looks + dark. Toast on gated tap: "Every template is on Pro" (align with §13 copy). A11y: Pro tiles announce "Music staff paper, Pro" so the gate is not colour/icon-only; Upgrade CTA is keyboard-reachable.

#### Test plan
`app/test/features/templates/template_entitlement_test.dart` (free set selectable, Pro badged + gated, Pro plan ungated, fail-open on missing entitlement). Uses a fake `EntitlementRepository`.

#### Dependencies
[SN-TPL-006](templates.md#sn-tpl-006) (overlay to badge/gate). The entitlement/Pro state is read through the `sane_billing` EntitlementProvider contract ([SN-BILL-012](billing.md#sn-bill-012)); a permissive stub (fail-open to Free) stands in until billing ships in M8, so SN-BILL-001 is not a scheduling blocker for this milestone.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-009

<a id="sn-tpl-009"></a>

**Add notebook covers with presets and custom image or PDF-first-page art**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-002](templates.md#sn-tpl-002), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-212`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
A cover is the notebook's face on the shelf — decorative art distinct from the auto-generated page-1 thumbnail. PRD-LB-043 makes covers **free** (Notability locks covers to its cloud tier; we deliberately do not) and allows a preset from a curated set or a custom image / the first PDF page (docs/product/prd-02-library-documents-audio-search.md §3.5). The Cover entity (`id, kind(preset|image), assetRef?`) already exists from [SN-TPL-002](templates.md#sn-tpl-002); this issue delivers the curated preset set, the custom-image/PDF-page picker, cover rendering on library cards, and the "Change cover" action wired into the notebook `⋯` menu (PRD-LB-060). It is distinct from — and composes with — the live thumbnail owned by the library ([SN-LIB-002](library.md#sn-lib-002)).

#### Scope
**In:** a curated preset cover set (token-driven colour/pattern art, no external assets); the Change-cover flow (Preset | Photo | First PDF page | Remove); custom-image ingest with **EXIF stripping** and downscale; using PDF page 1 as a cover (via [SN-PDF-002](pdf.md#sn-pdf-002)); rendering the chosen cover on the 3:4 library card and falling back to the thumbnail when no cover is set; persisting `coverId` on the notebook.
**Out:** the auto page-1 thumbnail generation ([SN-LIB-002](library.md#sn-lib-002), PRD-LB-042), the full image editor ([SN-MED-001](images-media.md#sn-med-001)), store-purchased covers ([SN-TPL-011](templates.md#sn-tpl-011)), the `⋯` menu itself ([SN-LIB-002](library.md#sn-lib-002); this issue only contributes the Change-cover entry).

#### Acceptance criteria
- [ ] A curated preset set (≥ 8) renders from tokens (no bundled bitmaps) and displays correctly in all 17 looks + dark on the 3:4 card.
- [ ] Choosing a custom photo strips EXIF (no GPS/camera metadata persists), downscales to a capped dimension, and stores it in the content-addressed blob store as an opaque `assetRef`.
- [ ] Choosing "First PDF page" renders page 1 of a PDF-backed notebook as the cover.
- [ ] Covers are available on the **free** plan (no gate) and "Remove" reverts to the live thumbnail.
- [ ] A malformed/oversized image fails **closed** with a user-safe error and is decoded off the UI isolate (never blocks scrolling).

#### Technical notes
Add `app/lib/features/covers/` (picker + render) and preset art in `sane_ui` (token-driven `CoverArt` widgets). Custom-image path: decode + EXIF-strip + downscale on a one-shot `Isolate.run` (CLAUDE.md §8), store bytes via the content-addressed blob store (SN-CORE-004), keep only the hash on the notebook. PDF-first-page via [SN-PDF-002](pdf.md#sn-pdf-002). Cover renders on the library card ([SN-LIB-002](library.md#sn-lib-002)) taking precedence over the thumbnail when `coverId != null`. Implements PRD-LB-043 (covers, free), PRD-LB-032 (subject colour tints the card spine). ADR-0014 (PDF page raster). Editor-role collaborators may change a shared cover in M6 (out of scope now).

#### Security & privacy
Custom cover images are untrusted input and a privacy vector: strip EXIF/metadata before persist (MASVS-PRIVACY-2, CWE-212), cap size before decode to defeat decompression bombs (CWE-400), decode off the UI isolate, and confine the source path. The stored `assetRef` is a content hash, never a device path in logs. Cover art is note content, E2E-encrypted on sync. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-2, CWE-212, CWE-400.

#### UX notes
Surfaces: Library card cover (docs/design/screens-and-flows.md §6), notebook `⋯` menu "Change cover" (§6 / PRD-LB-060), Change-cover sheet. Preset grid uses `sane_ui` cards; selected preset shows a ring. Loading state while a photo/PDF page rasters (skeleton on the card); error state "Couldn't use that image"; empty state = no cover → live thumbnail. All 17 looks + dark. A11y: covers are decorative but the picker options carry labels ("Aurora preset cover"), 44 pt targets, keyboard-reachable on web.

#### Test plan
`app/test/features/covers/cover_picker_test.dart` (preset select, remove→thumbnail fallback, free-plan no gate), `cover_image_ingest_test.dart` (EXIF stripped, downscale cap, malformed fails closed off-isolate), golden `cover_card_golden_test.dart` (presets across looks, feeds [SN-TPL-014](templates.md#sn-tpl-014)).

#### Dependencies
[SN-TPL-002](templates.md#sn-tpl-002) (Cover entity), [SN-LIB-002](library.md#sn-lib-002) (library card + `⋯` menu). Uses [SN-PDF-002](pdf.md#sn-pdf-002) (first-page raster), [SN-MED-001](images-media.md#sn-med-001) (image decode utilities).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-010

<a id="sn-tpl-010"></a>

**Create custom templates from a page, PDF or image into My Templates**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | templates |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-002](templates.md#sn-tpl-002), [SN-TPL-003](templates.md#sn-tpl-003), [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Power users want their own paper. PRD-LB-095 requires creating a **custom template** from an imported PDF/image (PDF preferred over a pixel image; a multi-page PDF uses page 1 as the repeating template) or from an existing page ("Save page as template"); custom templates live in **My Templates**, are groupable/renamable/reorderable, and — unlike built-ins — deleting one is irreversible while built-ins are always restorable (docs/product/prd-02-library-documents-audio-search.md §6.3). This turns any well-designed page into reusable paper and is the substrate the template store ([SN-TPL-011](templates.md#sn-tpl-011)) installs into. ⚠ PRD-02 tags this M5; per docs/roadmap.md the authoritative remap sends the PRD-02 study/template-store bucket to **M6** (issues/milestones.json is authoritative, CLAUDE.md §12).

#### Scope
**In:** "Save page as template" (snapshot the current page's non-ink structure into a `Template{source:custom, assetRef}`); import a PDF/image as a custom template (PDF page 1 as repeating art, prefer vector); the **My Templates** section in the overlay ([SN-TPL-006](templates.md#sn-tpl-006)) with rename / group / reorder / delete; showing custom templates in the template grid; irreversible-delete confirmation for customs; built-ins always restorable.
**Out:** the store/catalogue + purchases ([SN-TPL-011](templates.md#sn-tpl-011)), import *hardening* + licensing metadata ([SN-TPL-013](templates.md#sn-tpl-013) — this issue calls the hardened importer but the validation lives there), the base renderer ([SN-TPL-003](templates.md#sn-tpl-003)), planners' hyperlinks ([SN-TPL-012](templates.md#sn-tpl-012)).

#### Acceptance criteria
- [ ] "Save page as template" produces a reusable custom template that, when applied to a new page, reproduces the source page's paper structure (not its ink) — round-trip test.
- [ ] Importing a single/multi-page PDF creates a custom template using page 1 as the repeating art; a pixel image works but shows the "PDF preferred" hint.
- [ ] My Templates supports rename, grouping, drag-reorder, and delete; deleting a custom prompts an irreversible-delete confirmation; built-ins never appear as deletable.
- [ ] Custom templates persist across app restart and switch with the active profile (per-profile, PRD-LB-350).
- [ ] Applying a custom template respects per-page semantics ([SN-TPL-007](templates.md#sn-tpl-007)) — it re-papers only the current page.

#### Technical notes
Add `app/lib/features/templates/my_templates.dart` and a `CustomTemplateService` in `sane_core`/app that writes the source art to the content-addressed blob store and records `Template{source:custom, assetRef}`. PDF ingest via [SN-PDF-002](pdf.md#sn-pdf-002) (render page 1 to a vector-preferred backdrop, ADR-0014). Reorder/group persist as user prefs (per-profile). Deletion is irreversible for customs; built-ins are code constants so "restore" just re-adds them. The actual byte-level validation of imported PDFs/images is delegated to [SN-TPL-013](templates.md#sn-tpl-013). Implements PRD-LB-095. Reuse the overlay grid from [SN-TPL-006](templates.md#sn-tpl-006).

#### Security & privacy
Imported PDFs/images are untrusted (see [SN-TPL-013](templates.md#sn-tpl-013) for the hardened path): validate MIME/size/schema, cap resources, parse off the UI isolate, import into an isolated context, confine paths (CLAUDE.md §7.8). Custom-template art is note content — E2E-encrypted on sync, stored by content hash, never logged. IDs: MASVS-STORAGE-1, MASVS-CODE-4, CWE-20, CWE-400.

#### UX notes
Surfaces: Templates overlay My Templates section (docs/design/screens-and-flows.md §8), notebook/page "Save page as template" action. Empty state: "Your templates will appear here — save any page or import a PDF." Loading: spinner while a PDF rasters. Error: "Couldn't import that file" (fail closed). Delete confirmation names the template. All 17 looks + dark; drag-reorder has keyboard equivalents on web; 44 pt targets and Semantics labels on every row.

#### Test plan
`app/test/features/templates/custom_template_test.dart` (save-page-as-template round-trip, PDF/image import, rename/group/reorder/delete, per-profile isolation), integration in `app/integration_test/templates_test.dart`. Hostile-file cases live in [SN-TPL-013](templates.md#sn-tpl-013).

#### Dependencies
[SN-TPL-002](templates.md#sn-tpl-002) (Template entity), [SN-TPL-003](templates.md#sn-tpl-003) (render), [SN-PDF-002](pdf.md#sn-pdf-002) (PDF page raster). Hardening from [SN-TPL-013](templates.md#sn-tpl-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-011

<a id="sn-tpl-011"></a>

**Define the template store catalogue format and browse-and-install surface**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | templates, billing |
| Size | L |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-010](templates.md#sn-tpl-010) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-CODE-2`, `MASVS-CODE-4`, `CWE-494`, `CWE-829`, `CWE-400` |
| Extra labels | needs-decision, innovation |

#### Context
PRD-LB-096 (MAY) proposes a **Template / Marketplace store** — paper, covers, stickers, planners — as an in-app browse-and-install surface; the free plan keeps lined/grid/dotted (+ built-ins) and premium templates/planners MAY be Pro-gated or individually purchasable, installing into My Templates (docs/product/prd-02-library-documents-audio-search.md §6.3; design §14). This issue defines the **catalogue format** (a signed, versioned manifest describing installable template packs) and the browse/install UX, installing into the store from [SN-TPL-010](templates.md#sn-tpl-010). It carries `needs-decision` because the **monetisation model — Pro-unlock vs individual purchase vs both — is an open maintainer decision** (CLAUDE.md §13, PRD-LB-096); build the format and flow behind a build-time flag defaulting to Pro-unlock and leave the pricing decision to the maintainer.

#### Scope
**In:** a versioned catalogue/manifest schema (pack id, name, author, license, preview, template payload refs, integrity hash, price/entitlement metadata); a signed-manifest + per-asset integrity verification on install; the store browse UI (categories, search, preview, install) and the install-into-My-Templates path; offline/error/empty states; the build-time monetisation flag (Pro-unlock default).
**Out:** the actual store *backend/hosting* (zero-server constraint — this consumes a static signed catalogue; hosting is a maintainer/ops decision), the payment/IAP plumbing ([SN-BILL-001](billing.md#sn-bill-001)), My Templates itself ([SN-TPL-010](templates.md#sn-tpl-010)), import hardening + licensing enforcement ([SN-TPL-013](templates.md#sn-tpl-013)).

#### Acceptance criteria
- [ ] The catalogue manifest is a documented, versioned schema; an unknown-version or unsigned manifest is rejected (fail closed).
- [ ] Installing a pack verifies the manifest signature and each asset's integrity hash before writing anything; a tampered/partial download is rejected and cleaned up.
- [ ] Installed packs land in My Templates and are indistinguishable from other customs afterwards (apply, rename, delete).
- [ ] Store fetch/install run off the UI isolate; the browse grid virtualises and stays at 60 fps.
- [ ] With no network, the store shows a clear offline state and previously installed packs still work; monetisation follows the build-time flag (default Pro-unlock) — a `// DESIGN-OPEN:` comment links the pending decision.

#### Technical notes
Define the schema in `docs/` (a new `template-catalogue.md`) and a Dart model in `sane_core`/app. Downloads use TLS 1.2+; verify an Ed25519 signature over the manifest and BLAKE3/SHA-256 per-asset hashes before install (approved crypto only, CLAUDE.md §7.7; via `sane_crypto`). No new egress without an ADR + threat-model row (CLAUDE.md §7.4) — add the store-fetch row. Entitlement/price fields resolve through `sane_billing` ([SN-BILL-001](billing.md#sn-bill-001)); the Pro-unlock-vs-purchase behaviour is a compile-time flag (PRD-LB-096 open decision). Install path reuses [SN-TPL-010](templates.md#sn-tpl-010) My Templates. Any sticker/font/SVG payload must be sanitised by [SN-TPL-013](templates.md#sn-tpl-013). Ships without SN-BILL-001: entitlement/price fields consume the `EntitlementProvider` contract ([SN-BILL-012](billing.md#sn-bill-012)) behind a narrow interface, with a Pro-unlock stub until billing lands in M8.

#### Security & privacy
A store is a supply-chain surface: verify signatures + integrity hashes before trusting any downloaded byte (CWE-494 download-without-integrity, CWE-829 inclusion of untrusted functionality), reject active content, cap sizes (CWE-400), and pin/validate TLS (MASVS-NETWORK-1). Manifest parsing validates schema/version (MASVS-CODE-2/4). No note content is sent to the store; browsing telemetry stays off (opt-in only). IDs: MASVS-NETWORK-1, MASVS-CODE-2, MASVS-CODE-4, CWE-494, CWE-829, CWE-400.

#### UX notes
Surface: store tab within the Templates overlay + Free vs Pro (docs/design/screens-and-flows.md §8, §14). States: loading (skeleton grid), empty ("No packs match"), error ("Couldn't reach the store"), offline (installed still usable). Pro/purchase badges per the resolved flag. All 17 looks + dark; browse grid keyboard-navigable on web; previews carry alt-text labels; 44 pt targets.

#### Test plan
`app/test/features/templates/store_catalogue_test.dart` (schema/version validation, unsigned/ tampered rejected, install→My Templates), `store_offline_test.dart` (offline + installed-still-works), `manifest_signature_test.dart` (Ed25519 verify via sane_crypto). Negative/abuse cases coordinate with [SN-TPL-013](templates.md#sn-tpl-013).

#### Dependencies
[SN-TPL-010](templates.md#sn-tpl-010) (My Templates install target). Entitlement/price fields resolve through the `sane_billing` EntitlementProvider contract ([SN-BILL-012](billing.md#sn-bill-012)); a compile-time Pro-unlock stub stands in until billing ships in M8, so SN-BILL-001 is not a scheduling blocker. Coordinates with [SN-SEC-001](security.md#sn-sec-001) (threat-model row) and [SN-TPL-013](templates.md#sn-tpl-013) (payload sanitising). **Maintainer decision required:** template-store monetisation model (PRD-LB-096; CLAUDE.md §13).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-012

<a id="sn-tpl-012"></a>

**Support hyperlinked digital planners with internal tab-to-page navigation**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | templates, pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-010](templates.md#sn-tpl-010) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PLATFORM-3`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Digital planners are a huge template category, and they only work if their tabs navigate. PRD-LB-097 requires **hyperlinked digital planners**: imported or created planners with internal page links (tabs → month/week/day) must navigate within the notebook when tapped, depending on internal-link support (PRD-LB-150) (docs/product/prd-02-library-documents-audio-search.md §6.3). This issue makes a planner template's link regions live: tapping a "March" tab jumps to the March page inside the same notebook, with no external navigation. ⚠ PRD-02 tags this M5; the roadmap remap sends the PRD-02 study/template-store bucket to **M6** (issues/milestones.json authoritative, CLAUDE.md §12); it also depends on internal-link plumbing (PRD-LB-150) landing first.

#### Scope
**In:** a planner link model (rectangular link regions on a template page → target page index/id within the notebook); honouring links baked into an imported planner PDF (PDF GoTo link annotations) and links authored on custom planners; tap-to-navigate that stays inside the notebook; visual affordance on hover/press; disabling link navigation while a page is being edited (so a tap draws, not navigates, per the active tool).
**Out:** the generic internal-link engine (PRD-LB-150, SN-PG/library area — this consumes it), external URL/data-detector links (PRD-LB-388), the planner *paper* rendering ([SN-TPL-004](templates.md#sn-tpl-004)), creating planner content (author flow uses [SN-TPL-010](templates.md#sn-tpl-010)).

#### Acceptance criteria
- [ ] Tapping a planner tab/link navigates to the correct target page within the same notebook; an out-of-range/broken target is a safe no-op (never a crash, never an external jump).
- [ ] Link regions imported from a planner PDF's GoTo annotations resolve to the right internal pages.
- [ ] Links only fire when the current tool is a navigation/select tool — while inking, a tap over a link draws instead (no accidental navigation).
- [ ] A malformed/hostile link target (e.g. an external URI smuggled as an internal link) is rejected; only in-notebook page targets are honoured.
- [ ] Navigation via a link is undoable via back/page-history and announced to screen readers.

#### Technical notes
Add a `PlannerLink` overlay in `app/lib/features/templates/` mapping link rects → in-notebook page targets, layered above paper and below ink; consume the internal-link resolver from PRD-LB-150 (SN-PG/library). PDF GoTo annotations parsed via [SN-PDF-002](pdf.md#sn-pdf-002)/`syncfusion_flutter_pdf` (ADR-0014) and mapped to internal page ids; **reject** URI/launch actions — internal targets only (CLAUDE.md §7.8: a link lands in view, never auto-mutates, and never leaves the app implicitly). Implements PRD-LB-097. Coexist with the tool state machine ([SN-ED-002](editor.md#sn-ed-002)) so ink wins while a pen tool is active.

#### Security & privacy
Link targets are untrusted (especially from imported PDFs): validate that every resolved target is an in-notebook page id and refuse any external URI/launch/file action (CWE-20; MASVS-PLATFORM-3 — no implicit navigation off a document). No link/target logging with PII. Paper + links are note content, E2E-encrypted on sync. IDs: MASVS-STORAGE-1, MASVS-PLATFORM-3, CWE-20.

#### UX notes
Surface: Editor canvas over a planner template (docs/design/screens-and-flows.md §7.2), page navigation (§7.7 rail). Link regions show a subtle pressed/hover affordance in all 17 looks + dark; they are invisible while inking. A11y: each link is a labelled control ("Go to March") reachable by keyboard on web; navigation announces the destination. Error state: broken link → subtle "That page isn't here" toast, no jump.

#### Test plan
`app/test/features/templates/planner_link_test.dart` (tab→page navigation, broken target no-op, external-URI rejected, tool-gated firing), integration in `app/integration_test/templates_test.dart` (imported planner PDF GoTo links). Uses the internal-link resolver fixtures from PRD-LB-150.

#### Dependencies
[SN-TPL-010](templates.md#sn-tpl-010) (planner templates). Consumes internal-link support (PRD-LB-150, SN-PG/library) and [SN-PDF-002](pdf.md#sn-pdf-002) (GoTo annotations), coordinates with [SN-ED-002](editor.md#sn-ed-002) (tool state).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-013

<a id="sn-tpl-013"></a>

**Harden template and cover import and record template licensing metadata**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | templates, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-010](templates.md#sn-tpl-010) |
| Security controls | `MASVS-CODE-1`, `MASVS-CODE-4`, `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-20`, `CWE-22`, `CWE-400`, `CWE-434`, `CWE-829` |
| Extra labels | agent-ready |

#### Context
Every template feature that ingests a file — custom templates from PDF/image ([SN-TPL-010](templates.md#sn-tpl-010)), store packs ([SN-TPL-011](templates.md#sn-tpl-011)), custom covers ([SN-TPL-009](templates.md#sn-tpl-009)) — is an attack surface, and CLAUDE.md §7.8 is explicit: untrusted input is hostile. This issue centralises the **hardened importer** used by all of them and adds **licensing metadata** so imported/store templates carry attribution and usage terms (template licensing is an explicit area concern). A malformed PDF, a decompression-bomb image, a path-traversal filename, or an SVG/font carrying active content must all fail **closed** into a user-safe error, parsed off the UI isolate (docs/security/secure-coding-checklist.md §1; CLAUDE.md §7.8).

#### Scope
**In:** a single `TemplateImporter` that validates type/MIME/magic/size/schema before decode; resource caps before decompress (defeat zip/image bombs); off-UI-isolate parsing; path canonicalisation/confinement for any embedded reference; stripping active content from SVG/font/PDF payloads; EXIF/metadata stripping for images (shared with [SN-TPL-009](templates.md#sn-tpl-009)); a `TemplateLicense` field (source, author, license id, attribution text, redistribution flag) persisted on custom/store templates and shown in template details; a licensing check that blocks redistribution of non-redistributable imports via the store.
**Out:** the feature flows themselves ([SN-TPL-009](templates.md#sn-tpl-009)/[SN-TPL-010](templates.md#sn-tpl-010)/[SN-TPL-011](templates.md#sn-tpl-011)), competitor-file import legality (SN-SHR area), the fuzz-corpus harness reused from SN-PDF (referenced, not rebuilt).

#### Acceptance criteria
- [ ] A corpus of malformed/hostile PDFs, images, SVGs and fonts each fail closed to a user-safe error with no crash, no hang, and no UI-isolate block (fuzz/negative tests green).
- [ ] Resource caps reject an image/PDF whose decoded size exceeds the cap before allocation (decompression-bomb test).
- [ ] A path-traversal or absolute path embedded in an import cannot write outside the blob store (test asserts confinement).
- [ ] Active content in an SVG/font payload is stripped/rejected (no script executes; test).
- [ ] Imported/store templates carry `TemplateLicense`; a non-redistributable template cannot be published to the store (guard test); attribution renders in template details.

#### Technical notes
Add `packages/sane_core`/app `TemplateImporter` invoked by [SN-TPL-009](templates.md#sn-tpl-009)/[SN-TPL-010](templates.md#sn-tpl-010)/[SN-TPL-011](templates.md#sn-tpl-011). Parse on a one-shot `Isolate.run` (CLAUDE.md §8); validate magic bytes + declared MIME + size before decode; cap pixels/pages/decompressed bytes (CWE-400); canonicalise paths (CWE-22); reject `<script>`/JS in SVG and executable font tables (CWE-829/434). Reuse the SN-PDF fuzz corpus in the verification stage (CLAUDE.md §10). Add `TemplateLicense` to the Template model ([SN-TPL-002](templates.md#sn-tpl-002)) and a controls-matrix row. Add a threat-model entry for template ingest (docs/security/threat-model.md) and update docs/security/controls-matrix.md.

#### Security & privacy
This IS the security control for template ingest. Threats: RCE/DoS via malformed parsers, decompression bombs, path traversal on embedded refs, active content in SVG/fonts, metadata/PII leakage via EXIF, and IP/licensing violation via redistribution. Controls: strict validation, resource caps, isolate sandboxing, path confinement, content sanitisation, EXIF strip, and a redistribution guard. IDs: MASVS-CODE-1, MASVS-CODE-4, MASVS-STORAGE-1, MASVS-PRIVACY-2, CWE-20, CWE-22, CWE-400, CWE-434, CWE-829.

#### UX notes
Surfaces: import error toasts across the Templates overlay and Change-cover sheet (docs/design/screens-and-flows.md §8, §6); a template-details panel showing attribution/license. Error copy is user-safe and non-technical ("Couldn't import that file — it may be damaged or unsupported"). All 17 looks + dark. A11y: errors are announced to screen readers; license/attribution text is selectable and labelled.

#### Test plan
`packages/sane_core/test/template/template_importer_test.dart` (type/size/magic validation, path confinement, active-content strip, EXIF strip), `template_importer_fuzz_test.dart` (hostile corpus fails closed, reuses SN-PDF corpus), `template_license_test.dart` (license recorded, redistribution guard). Wire into the CI verification stage.

#### Dependencies
[SN-TPL-010](templates.md#sn-tpl-010) (primary consumer). Guards [SN-TPL-009](templates.md#sn-tpl-009) and [SN-TPL-011](templates.md#sn-tpl-011). Coordinates with [SN-SEC-001](security.md#sn-sec-001) (threat model / controls matrix) and [SN-PDF-002](pdf.md#sn-pdf-002) (shared fuzz corpus).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-014

<a id="sn-tpl-014"></a>

**Golden-test every paper template across the 17 looks, dark mode and tints**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates, qa |
| Size | S |
| SDLC | verification |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-003](templates.md#sn-tpl-003), [SN-TPL-004](templates.md#sn-tpl-004), [SN-TPL-005](templates.md#sn-tpl-005) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Paper is painted, so per CLAUDE.md §6/§9/§10 it MUST carry golden tests across all 17 looks and light+dark — a single regression in the `ln`/`mu` token wiring or a spacing constant would silently ugly-up every page. The design mandates "Every look, both modes" for anything painted (CLAUDE.md §9), and the tokens list 17 looks (`lookOrder` in docs/design/tokens.json). This issue centralises the golden coverage that [SN-TPL-003](templates.md#sn-tpl-003) (geometric), [SN-TPL-004](templates.md#sn-tpl-004) (structural) and [SN-TPL-005](templates.md#sn-tpl-005) (tints/sizes) contribute to, so paper rendering is locked against visual regression before M2 ships.

#### Scope
**In:** a parametrised golden harness rendering each `paperType` (blank/lined/grid/dot/isometric/chemHex/cornell/music/planner/flash) × each of the 17 looks × light+dark, plus a representative tint × size matrix and the 9 spacing presets at A4 100%; the overlay preview thumbnails; a phone-width (~400 px) rendering check; a CI job that fails on any pixel diff.
**Out:** the painters themselves ([SN-TPL-003](templates.md#sn-tpl-003)/[SN-TPL-004](templates.md#sn-tpl-004)/[SN-TPL-005](templates.md#sn-tpl-005)), the render-perf benchmark ([SN-TPL-015](templates.md#sn-tpl-015)), library-card cover goldens ([SN-TPL-009](templates.md#sn-tpl-009) owns those, though they may share the look loop).

#### Acceptance criteria
- [ ] A golden exists for every `paperType` × 17 looks × {light, dark}; the suite fails on any unreviewed pixel diff.
- [ ] Tints (Cream/Yellow/Gray/White) are golden-covered over at least 3 representative looks; the gray tint stays subtle on dark looks.
- [ ] The 9 spacing presets each have a golden at A4 100% proving distinct pitch.
- [ ] Overlay preview thumbnails match the corresponding full-page render (same painter, scaled).
- [ ] The suite runs in CI (`flutter test --update-goldens` gated) and is deterministic across machines (fixed device pixel ratio + fonts).

#### Technical notes
Add `packages/sane_render/test/paper/paper_all_looks_golden_test.dart` iterating `tokens.json lookOrder` × brightness via the `sane_ui` ThemeExtension ([SN-DS-002](design-system.md#sn-ds-002)). Pin `debugDefaultTargetPlatformOverride`, device pixel ratio and a bundled test font to keep goldens stable (CLAUDE.md §10). Use `matchesGoldenFile` with per-look sub-directories. Keep golden PNGs small (single page at a modest DPR). This suite is the umbrella referenced by [SN-TPL-003](templates.md#sn-tpl-003)/[SN-TPL-004](templates.md#sn-tpl-004)/[SN-TPL-005](templates.md#sn-tpl-005). Implements the §9 "golden-test the surface" rule for paper.

#### Security & privacy
None beyond baseline: test-only, no note content, no logging, tokens only. Golden fixtures contain no PII. IDs: MASVS-STORAGE-1.

#### UX notes
This test *enforces* the UX contract: paper legible and on-theme in all 17 looks + dark (docs/design/screens-and-flows.md §0 look list, §7.2 canvas). No runtime chrome. A11y: N/A (test), but the suite includes a contrast assertion that typed-text tokens over the busiest paper (chemistry hex) meet 4.5:1.

#### Test plan
The deliverable is the golden suite itself: `packages/sane_render/test/paper/paper_all_looks_golden_test.dart` plus the tint/spacing goldens. CI job added to the analyze/test workflow ([SN-FND-003](ci-cd.md#sn-fnd-003)). Run locally with `flutter test` and regenerate intentionally with `--update-goldens`.

#### Dependencies
[SN-TPL-003](templates.md#sn-tpl-003) (geometric papers), [SN-TPL-004](templates.md#sn-tpl-004) (structural papers), [SN-TPL-005](templates.md#sn-tpl-005) (tints/sizes). Uses [SN-DS-002](design-system.md#sn-ds-002) (tokens).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TPL-015

<a id="sn-tpl-015"></a>

**Cache paper rendering to hold the 1,000-page open and 60 fps scroll budgets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | templates, perf |
| Size | M |
| SDLC | verification |
| Parent | [SN-TPL-001](templates.md#sn-tpl-001) |
| Depends on | [SN-TPL-003](templates.md#sn-tpl-003), [SN-PERF-002](perf.md#sn-perf-002) |
| Security controls | `MASVS-STORAGE-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Paper sits behind every page, so if it re-tessellates each frame it silently eats the frame budget. The locked budgets are hard CI gates: open a 1,000-page notebook < 1 s, scroll a 600-page PDF at 60 fps, and no frame > 16.7 ms while writing (CLAUDE.md §1 decision 7; docs/platform/performance-budgets.md; PRD-LB-360 virtualisation). This task makes paper rendering cheap and cached — a static paper pattern for a given (paperType, tint, size, spacing, look) is flattened once into a reusable `Picture`/tile and reused across pages that share it, so scrolling and re-paint never re-run tessellation.

#### Scope
**In:** caching the tessellated paper as a `Picture`/tiled raster keyed by (paperType, tint, size, spacing, look, dpr); reusing one cached paper across all pages that share those params; cache invalidation on look/dpr/spacing change; a bounded LRU so memory stays within the < 300 MB/4 GB-Android budget; wiring paper paint under a `RepaintBoundary` so ink repaints never repaint paper; the CI perf assertion that paper does not regress the 1,000-page-open and scroll budgets.
**Out:** the painters ([SN-TPL-003](templates.md#sn-tpl-003)/[SN-TPL-004](templates.md#sn-tpl-004)), the golden suite ([SN-TPL-014](templates.md#sn-tpl-014)), the app-wide perf harness ([SN-PERF-002](perf.md#sn-perf-002) — this consumes it), PDF facsimile caching ([SN-PDF-002](pdf.md#sn-pdf-002)).

#### Acceptance criteria
- [ ] Opening a synthetic 1,000-page notebook (all same paper) completes < 1 s on the reference iPad, and paper is tessellated once, not per page (assert cache hit count).
- [ ] Scrolling a 600-page notebook holds 60 fps with no frame > 16.7 ms attributable to paper (perf-harness timeline attached).
- [ ] Changing the look/dpr/spacing invalidates and rebuilds the cache exactly once; stale tiles are never shown.
- [ ] The paper cache is a bounded LRU; memory stays within budget on a 4 GB Android device under a 1,000-page scroll (memory assertion).
- [ ] Ink repaints do not repaint paper (RepaintBoundary verified; benchmark shows paper paint calls ≈ 0 during active inking).

#### Technical notes
Add a `PaperCache` in `packages/sane_render/lib/src/paper/paper_cache.dart` producing a `ui.Picture` per param key via `PictureRecorder`, stored in a size-bounded LRU. Key must include the active look + dpr so a theme switch invalidates. Paint the cached Picture under the stroke `RepaintBoundary` (CLAUDE.md §8). Feed measurements through `tools/perf_harness` ([SN-PERF-002](perf.md#sn-perf-002)) and add a CI perf gate ([SN-PERF-003](perf.md#sn-perf-003) pattern). Respect virtualisation (PRD-LB-360): only visible pages hold a live paper layer. This is the performance backstop for [SN-TPL-003](templates.md#sn-tpl-003)/[SN-TPL-004](templates.md#sn-tpl-004).

#### Security & privacy
None beyond baseline for content, but resource safety matters: bound the cache and per-tile size so a pathological spacing/zoom/look-thrash cannot exhaust memory (CWE-400). Cache holds only rendered paper (no note content, no ink). No logging on the paint path in profile/release (CLAUDE.md §8). IDs: MASVS-STORAGE-1, CWE-400.

#### UX notes
Invisible when correct: users only notice if it regresses (jank, memory pressure). Ensures the "lag-proof" promise holds on long notebooks across all 17 looks (a look switch must not stall). No chrome. A11y: N/A (rendering perf), but a smooth 60 fps scroll is itself an accessibility/comfort win.

#### Test plan
`packages/sane_render/test/paper/paper_cache_test.dart` (cache hit/miss, invalidation on look/dpr/spacing, LRU bound), `app/integration_test/templates_perf_test.dart` (1,000-page open < 1 s, 600-page scroll 60 fps, memory bound) driven by `tools/perf_harness`. CI perf gate added.

#### Dependencies
[SN-TPL-003](templates.md#sn-tpl-003) (painters to cache), [SN-PERF-002](perf.md#sn-perf-002) (latency/perf harness). Aligns with [SN-PERF-003](perf.md#sn-perf-003) (CI perf gates).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

