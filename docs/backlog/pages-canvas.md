# Backlog — area: pages-canvas

24 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-PG-001](pages-canvas.md#sn-pg-001) **Pages & canvas: page kinds, viewport, navigation and templates** (epic · M1 Ink Editor Alpha)
  - [SN-PG-002](pages-canvas.md#sn-pg-002) **Implement Page model and PageKind entities in sane_core** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-PG-003](pages-canvas.md#sn-pg-003) **Implement paged page kind geometry, sizes and orientation** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-PG-004](pages-canvas.md#sn-pg-004) **Render paper fill patterns and tint washes for all templates** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-PG-005](pages-canvas.md#sn-pg-005) **Implement pan and zoom viewport with documented limits** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-PG-006](pages-canvas.md#sn-pg-006) **Implement fit-to-viewport and recenter action** · p2 · feature · S · M1 Ink Editor Alpha
  - [SN-PG-007](pages-canvas.md#sn-pg-007) **Implement canvas rotate with snap detents and reset** · p2 · feature · S · M2 Library & Documents
  - [SN-PG-008](pages-canvas.md#sn-pg-008) **Implement page navigation: prev/next, go-to-page and jump-to-bookmark** · p1 · feature · S · M1 Ink Editor Alpha
  - [SN-PG-009](pages-canvas.md#sn-pg-009) **Implement page bookmarks model and toggle** · p2 · feature · S · M1 Ink Editor Alpha
  - [SN-PG-010](pages-canvas.md#sn-pg-010) **Generate and disk-cache page thumbnails on a background isolate** · p1 · task · M · M1 Ink Editor Alpha
  - [SN-PG-011](pages-canvas.md#sn-pg-011) **Implement page rail thumbnail column with left-handed mirroring** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-PG-012](pages-canvas.md#sn-pg-012) **Implement add page cloning current paper, tint and size** · p1 · feature · S · M1 Ink Editor Alpha
  - [SN-PG-013](pages-canvas.md#sn-pg-013) **Implement duplicate, reorder and delete page operations** · p1 · feature · M · M2 Library & Documents
  - [SN-PG-014](pages-canvas.md#sn-pg-014) **Implement moving a page between notebooks** · p2 · feature · M · M2 Library & Documents
  - [SN-PG-015](pages-canvas.md#sn-pg-015) **Implement the paper and templates picker overlay** · p1 · feature · M · M2 Library & Documents
  - [SN-PG-016](pages-canvas.md#sn-pg-016) **Implement infinite freeform canvas with growth, bounds cap and minimap** · p1 · feature · L · M2 Library & Documents
  - [SN-PG-017](pages-canvas.md#sn-pg-017) **Integrate PDF-backed page kind beneath the ink layers** · p1 · feature · M · M2 Library & Documents
  - [SN-PG-018](pages-canvas.md#sn-pg-018) **Implement scroll modes: paged, continuous vertical, horizontal and single** · p2 · feature · M · M3 Audio & Recognition
  - [SN-PG-019](pages-canvas.md#sn-pg-019) **Implement convert page kind and hybrid paged-freeform behaviour** · p3 · feature · M · M3 Audio & Recognition
  - [SN-PG-020](pages-canvas.md#sn-pg-020) **Implement print layout and pagination for pages and PDFs** · p2 · feature · M · M2 Library & Documents
  - [SN-GUX-008](pages-canvas.md#sn-gux-008) **Implement page-turn, zoom and overlay transition motion with reduce-motion fallbacks** · p2 · feature · M · M2 Library & Documents
  - [SN-GCMP-004](pages-canvas.md#sn-gcmp-004) **Implement freeform scenes: saved framed views and present** · p2 · feature · M · M4 Identity, Sync & Privacy

---

## Issues

### SN-GCMP-004

<a id="sn-gcmp-004"></a>

**Implement freeform scenes: saved framed views and present**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, android-tablet, web |
| Areas | pages-canvas, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-016](pages-canvas.md#sn-pg-016), [SN-ED-021](editor.md#sn-ed-021) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Apple Freeform lets users save named 'scenes' - framed regions of an infinite board - and step through them like slides, which turns a whiteboard into a presentation and a navigation aid (docs/research/competitor-feature-matrix.md section 18; PRD-ED-190 from the 2026-09-13 pass). Our infinite freeform canvas ([SN-PG-016](pages-canvas.md#sn-pg-016)) and presentation mode ([SN-ED-021](editor.md#sn-ed-021)) exist, but nothing lets a user bookmark and replay framed views. On a large hybrid/freeform canvas this is the primary way to navigate and to present.

#### Scope
**In:** capture the current viewport (rect + zoom + rotation) as a named Scene on a freeform/hybrid page; a Scenes list with reorder/rename/delete; tap-to-fly-to a scene with an animated transition; step forward/back through scenes; drive presentation mode ([SN-ED-021](editor.md#sn-ed-021)) and external display from the scene sequence.
**Out:** paged-notebook slide export (separate); laser pointer ([SN-ED-020](editor.md#sn-ed-020)); the infinite canvas itself ([SN-PG-016](pages-canvas.md#sn-pg-016)).

#### Acceptance criteria
- [ ] 'Save scene' captures the exact framed view (pan/zoom/rotate) with a user-editable name; scenes persist and sync as CRDT list items.
- [ ] The Scenes panel supports reorder (fractional index), rename and delete.
- [ ] Selecting a scene animates to that framed view; next/prev steps through the ordered list.
- [ ] Presentation mode can run the scene sequence to an external display with next/prev controls.
- [ ] Scenes survive canvas growth and content moves (anchored to canvas coordinates, not to strokes).

#### Technical notes
Store scenes as a movable-list of `{name, rectInCanvas, zoom, rotation}` on the page node in `sane_core` (reuse fractional indexing from [SN-CORE-008](sync.md#sn-core-008)). Fly-to reuses the viewport controller from [SN-PG-005](pages-canvas.md#sn-pg-005). Presentation wiring extends [SN-ED-021](editor.md#sn-ed-021). Coordinates are canvas-space so they remain stable as the freeform region grows. Reference PRD-ED-190 and docs/design/screens-and-flows.md canvas/presentation sections.

#### Security & privacy
None beyond baseline; scenes hold only view geometry, no content. Respect locked-notebook rules ([SN-GCMP-002](security.md#sn-gcmp-002)) when presenting.

#### UX notes
Scenes panel as a rail/overlay; thumbnails generated off-isolate ([SN-PG-010](pages-canvas.md#sn-pg-010)); transitions honour Reduce Motion ([SN-A11Y-006](a11y.md#sn-a11y-006)); scene list reachable by keyboard for desktop/web ([SN-A11Y-008](a11y.md#sn-a11y-008)).

#### Test plan
Unit: scene model + fractional reorder + coordinate stability under growth (test/pages/freeform_scenes_test.dart). Widget: panel CRUD. Integration: fly-to accuracy; present-to-external step-through. Golden: scenes panel across looks.

#### Dependencies
[SN-PG-016](pages-canvas.md#sn-pg-016), [SN-ED-021](editor.md#sn-ed-021).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-009

<a id="sn-gphn-009"></a>

**Manage pages from the bottom-sheet page picker on phones**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | pages-canvas, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-003](design-system.md#sn-phn-003), [SN-PG-013](pages-canvas.md#sn-pg-013), [SN-ED-017](editor.md#sn-ed-017) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
On a phone the editor page rail is hidden (docs/design/ux-principles.md §8, docs/platform/phones.md §2) and page navigation happens through the bottom-sheet page picker and horizontal page swipe from [SN-PHN-003](design-system.md#sn-phn-003). But the tablet page rail is also where a user reorders, duplicates and deletes pages ([SN-ED-017](editor.md#sn-ed-017), [SN-PG-013](pages-canvas.md#sn-pg-013)), and adds a page. With the rail gone, the phone has no home for those page-management actions. docs/design/screens-and-flows.md open question 11 flags page reorder/delete as needing a touch home; [SN-LIB-024](library.md#sn-lib-024) established the precedent that on phones drag-to-organise is replaced by menu-based actions. This issue gives the bottom-sheet page picker the same management affordances so phone users can add, reorder, duplicate, delete and bookmark pages without a rail.

#### Scope
**In:** extending the bottom-sheet page picker (from [SN-PHN-003](design-system.md#sn-phn-003)) with page thumbnails, current-page and bookmarked indicators, an add-page control, and per-page actions — duplicate, delete (with undo), reorder (drag within the sheet or move-up/move-down menu items), and bookmark toggle — wired to the existing page operations; the empty/single-page states; safe-area handling.
**Out:** the bottom-sheet picker shell and swipe navigation themselves ([SN-PHN-003](design-system.md#sn-phn-003)); the page-operation model and undo ([SN-PG-013](pages-canvas.md#sn-pg-013), [SN-ED-017](editor.md#sn-ed-017), [SN-ED-003](editor.md#sn-ed-003)); moving a page between notebooks ([SN-PG-014](pages-canvas.md#sn-pg-014)); thumbnail generation ([SN-PG-010](pages-canvas.md#sn-pg-010)); and the tablet page rail ([SN-ED-015](editor.md#sn-ed-015), [SN-PG-011](pages-canvas.md#sn-pg-011)).

#### Acceptance criteria
- [ ] The bottom-sheet page picker shows a scrollable set of page thumbnails with the current page ringed and bookmarked pages flagged, matching the rail's semantics (screens §7.7).
- [ ] An add-page control clones the current paper/tint into a new page (screens §7.7 behaviour, [SN-PG-012](pages-canvas.md#sn-pg-012)) and scrolls to it.
- [ ] Each page offers duplicate, delete and bookmark-toggle; delete moves through the same single-step undo as the rail ([SN-ED-003](editor.md#sn-ed-003)) and shows a recovery toast.
- [ ] Reorder works by drag within the sheet with a touch-friendly handle, and also via move-up / move-down menu items so reordering has a non-drag alternative (WCAG 2.5.1 / PRD-CO-318).
- [ ] Deleting the only page is prevented with a clear message, not a broken state; deleting the current page selects a sensible neighbour.
- [ ] Left-handed mode does not misplace the handle or actions; the sheet remains one-handed reachable.
- [ ] Thumbnails come from the disk cache ([SN-PG-010](pages-canvas.md#sn-pg-010)) and the sheet holds 60 fps scrolling a 200-page notebook on Android-lowend without rasterising the whole notebook (budget B9).
- [ ] Every control is >= 44x44 pt / 48x48 dp with `Semantics`; the sheet announces its page count and the current page.
- [ ] Renders correctly in all 17 looks and dark mode.

#### Technical notes
Extend the page-picker widget in `app/lib/editor/` (built by [SN-PHN-003](design-system.md#sn-phn-003)) rather than adding a second sheet. Page operations call the existing repository operations from [SN-PG-013](pages-canvas.md#sn-pg-013)/[SN-ED-017](editor.md#sn-ed-017); this issue adds only the phone presentation and the menu-based reorder alternative. Reorder uses `ReorderableListView`-style drag plus explicit move actions; both map to the same fractional-index move op ([SN-CORE-008](sync.md#sn-core-008)) so ordering is a CRDT-safe operation, not a local swap. Thumbnails read the disk cache from [SN-PG-010](pages-canvas.md#sn-pg-010); never render full pages into the sheet. Consume the size class from [SN-PHN-002](compat.md#sn-phn-002); do not branch on platform identity (CLAUDE.md §8).

#### Security & privacy
None beyond baseline. Page thumbnails are note-derived; the sheet must not write thumbnails to a shared/unencrypted cache and must not log page ids or titles (CLAUDE.md §7.1/§7.3; MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-532). Delete is undoable and routes through the tombstone lifecycle ([SN-CORE-018](storage.md#sn-core-018)); a deleted page is not purged immediately, matching the product's undo-is-sacred rule (ux-principles.md §10). No new permission or egress.

#### UX notes
Source: docs/design/screens-and-flows.md §7.7 (page rail), open question 11, phones.md §2. The sheet is the phone's page rail; it must feel as calm and direct as the rail (ux-principles.md §2). Destructive delete confirms only when not trivially undoable, otherwise it relies on the undo toast (§4.3 / §10). Copy per §5: "Page deleted" with an Undo action, no exclamation marks. Motion: reorder uses a short lift/settle; Reduce Motion drops the animation and applies the move instantly (§6). a11y: reorder is announced ("Moved page 3 to position 1"), and move-up/move-down are always present for non-drag users.

#### Test plan
- `app/test/editor/page_picker_manage_test.dart` — add, duplicate, delete+undo, bookmark toggle, current-page selection after delete.
- `app/test/editor/page_picker_reorder_test.dart` — drag reorder and move-up/down both emit a fractional-index move op; single-page delete prevented.
- `app/test/golden/phone/page_picker_golden_test.dart` — goldens per look family, light and dark, with a bookmarked and current page.
- `app/integration_test/phone_page_manage_test.dart` — patrol run: open picker, reorder, duplicate, delete, undo on a phone profile.

#### Dependencies
[SN-PHN-003](design-system.md#sn-phn-003), [SN-PG-013](pages-canvas.md#sn-pg-013), [SN-ED-017](editor.md#sn-ed-017)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GUX-008

<a id="sn-gux-008"></a>

**Implement page-turn, zoom and overlay transition motion with reduce-motion fallbacks**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pages-canvas, design-system, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-DS-025](design-system.md#sn-ds-025), [SN-PG-005](pages-canvas.md#sn-pg-005), [SN-PG-008](pages-canvas.md#sn-pg-008) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

[SN-DS-025](design-system.md#sn-ds-025) defines the motion tokens (micro 175 ms, control 200 ms, surface 250 ms, toast dwell 2.4 s, the curves and the reduce-motion helper) but explicitly puts "page-turn/zoom (editor/pages area)" **out of scope**, and no pages or editor issue picks it up: [SN-PG-005](pages-canvas.md#sn-pg-005) implements the pan/zoom viewport limits, [SN-PG-008](pages-canvas.md#sn-pg-008) implements prev/next and go-to-page as state changes, [SN-PG-006](pages-canvas.md#sn-pg-006) implements fit-to-viewport as an action. Nothing specifies what the user *sees* between page 3 and page 4, or between a zoomed-in view and fit-to-page. `ux-principles.md` §6 sets the constraints: surface transitions ~200–300 ms, nothing chrome-related over ~350 ms, motion is interruptible ("a user can start writing mid-animation; input always takes precedence"), and Reduce Motion replaces directional/scale transitions with cross-fades and "disable[s] page-turn and zoom animations".

#### Scope

**In:** the page transition for prev/next, go-to-page and jump-to-bookmark (a short directional slide or cross-fade built on the `surface` duration token, ≤ 250 ms, with the direction following reading direction and mirroring under RTL); the animated transform for fit-to-viewport, recenter and zoom-to-fit ([SN-PG-006](pages-canvas.md#sn-pg-006)); the page-rail thumbnail → page focus transition ([SN-PG-011](pages-canvas.md#sn-pg-011)); interruption semantics — a pointer-down on the canvas cancels the in-flight animation and the first ink sample lands on the settled page, never a dropped or misplaced stroke; the reduce-motion path (cross-fade or instant) driven by `reduceMotion(context)`; frame budget adherence on the transition.

**Out:** the ink path itself (never animated — `ux-principles.md` §6), the palette dock drag and edge-glow ([SN-ED-005](editor.md#sn-ed-005)), scroll modes and continuous scrolling ([SN-PG-018](pages-canvas.md#sn-pg-018)), overlay open/close mechanics owned by `SaneOverlay` ([SN-DS-019](design-system.md#sn-ds-019)) — this issue only ensures the pages surface uses them consistently.

#### Acceptance criteria

- [ ] Page next/prev animates within the `surface` token duration and is visually identical in all 17 looks (motion is not a look-specific effect, except where a look's identity permits a spring per §6).
- [ ] A pointer-down mid-transition cancels it immediately; an integration test writes a stroke starting 80 ms into a page turn and asserts the stroke lands on the destination page at the correct page coordinates with no lost samples.
- [ ] With Reduce Motion on, page turns and zoom transitions are a cross-fade or instant, and a test asserts no directional/scale animation runs.
- [ ] No frame exceeds 16.7 ms during a page turn on the Tier 1 device with a 5,000-stroke page ([SN-PERF-012](perf.md#sn-perf-012) fixture), measured by the existing perf harness.
- [ ] Transitions mirror correctly under RTL and compose with left-handed mode (rail on the left).
- [ ] Page turn does not animate during audio playback follow-along in a way that fights the ink-replay dimming ([SN-AUD-011](audio.md#sn-aud-011)).

#### Technical notes

Implement in the pages/editor layer over the transform owned by [SN-PG-005](pages-canvas.md#sn-pg-005); use `AnimationController` with the `SaneMotion` tokens rather than literal durations, and the `AnimatedX` convention from [SN-DS-025](design-system.md#sn-ds-025). Guard with `RepaintBoundary` so the transition repaints the page layer only, per [SN-PERF-021](perf.md#sn-perf-021). Cancellation must run through the same tool state machine as [SN-ED-002](editor.md#sn-ed-002) so a cancelled animation cannot leave the viewport transform mid-flight.

#### Security & privacy

None beyond baseline. One correctness-adjacent note: an interrupted transition must never commit a stroke to the wrong page — that would be silent data corruption from the user's point of view, so the interruption test is a data-integrity test as much as a motion test.

#### UX notes

References: `ux-principles.md` §6 (durations, easing, interruptibility, reduce-motion), §1 (never block the writing thread), `screens-and-flows.md` §7.2/§7.7. The intent is calm: a page turn should read as "the page moved", not as an effect. Nothing here may add perceived latency to inking — if a transition and a pen-down race, the pen wins.

#### Test plan

`app/test/features/editor/page_transition_test.dart` (duration, direction, RTL mirroring, reduce-motion fallback), `integration_test/page_turn_interrupt_test.dart` (stroke during transition lands correctly), and a perf run added to the jank suite from [SN-PERF-007](perf.md#sn-perf-007) with the dense-page fixture. Golden: a reduce-motion static frame per representative look.

#### Dependencies

[SN-DS-025](design-system.md#sn-ds-025), [SN-PG-005](pages-canvas.md#sn-pg-005), [SN-PG-008](pages-canvas.md#sn-pg-008)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-PG-001

<a id="sn-pg-001"></a>

**Pages & canvas: page kinds, viewport, navigation and templates**

| Field | Value |
|---|---|
| GitHub | #22 |
| Type | epic |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `OWASP-A04`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Every Sane Notes surface renders one or more pages inside a canvas viewport (design `design/Sane Notes.dc.html`, screens §7.2 Canvas, §7.7 Page rail, §8 Templates). The page is also the CRDT unit of load/sync/merge (`docs/architecture/document-model.md` §0-§1, ADR-0005), so "pages & canvas" spans data-model entities, rendering, viewport gestures, navigation and the template picker. This epic groups the work that makes a page exist, look right in all 17 looks + dark mode, and be pannable/zoomable/navigable at the decision-7 latency budgets. It implements PRD-ED-001..020 (canvas & pages), PRD-ED-131/133 (fit/focus), PRD-LB-090..094 (page kinds, paper, per-page re-paper), PRD-LB-142 (page operations) and PRD-LB-381 (convert page kind).

Three page kinds must coexist inside one notebook: fixed `paged` (800x1040 base units), `infinite`/freeform (endless board), and `pdfBacked` (facsimile beneath ink). Pages must add/duplicate/reorder/delete, move between notebooks, re-paper per page, scroll (paged/continuous), zoom/pan/rotate within limits, thumbnail on a background isolate, and print. All of it is local-first, on-device, zero-knowledge (CLAUDE.md §7, PRD-01 SEC-BASE).

#### Scope
**In:** the page/canvas child issues below — model, paged geometry, paper/tint rendering, pan/zoom/rotate/fit, navigation, bookmarks, thumbnails, page rail, add/duplicate/reorder/delete/move, templates picker, freeform canvas, PDF-backed integration, scroll modes, convert-page-kind, print layout.
**Out:** the ink pipeline ([SN-INK-001](ink.md#sn-ink-001)), brushes ([SN-BRS-001](brushes.md#sn-brs-001)), editor tool state machine & undo ([SN-ED-001](editor.md#sn-ed-001)), PDF render engine internals ([SN-PDF-001](pdf.md#sn-pdf-001)), library home/organisation ([SN-LIB-001](library.md#sn-lib-001)), the template store/custom templates ([SN-TPL-001](templates.md#sn-tpl-001)).

#### Acceptance criteria
- [ ] A notebook can mix `paged`, `infinite` and `pdfBacked` pages (PRD-LB-090); page kind is per-page.
- [ ] Pan/zoom hold >= 60 fps and never log on the hot path; open a 1,000-page notebook < 1 s (structure-only Library doc, decision 7).
- [ ] Every painted surface renders correctly across all 17 looks + light/dark; PDF pages keep original colours in dark mode.
- [ ] Deleting a page is a tombstone with 30-day retention and is undoable (PRD-ED-016, document-model §8).
- [ ] All child issues below are closed.

#### Technical notes
Model lives in `packages/sane_core` (Page entity, `PageKind`, `PaperTemplate`, `PageSize`); rendering in `packages/sane_render` + `packages/sane_ui`; viewport/navigation state in `app/` via Riverpod (ADR-0003). Tokens from `docs/design/tokens.json` (`page`, `paperFill`, `tint`, `tintSwatches`, `templates`, `widths`). Follows ADR-0005 (document model), ADR-0002 (monorepo), ADR-0008 (ink surface tiers). Children:
- [ ] [SN-PG-002](pages-canvas.md#sn-pg-002) Page model & PageKind entities
- [ ] [SN-PG-003](pages-canvas.md#sn-pg-003) Paged page kind geometry, sizes, orientation
- [ ] [SN-PG-004](pages-canvas.md#sn-pg-004) Paper fill & tint rendering
- [ ] [SN-PG-005](pages-canvas.md#sn-pg-005) Pan & zoom viewport with limits
- [ ] [SN-PG-006](pages-canvas.md#sn-pg-006) Fit / recenter action
- [ ] [SN-PG-007](pages-canvas.md#sn-pg-007) Canvas rotate with snap detents
- [ ] [SN-PG-008](pages-canvas.md#sn-pg-008) Page navigation (prev/next, go-to-page, jump-to-bookmark)
- [ ] [SN-PG-009](pages-canvas.md#sn-pg-009) Bookmarks model & toggle
- [ ] [SN-PG-010](pages-canvas.md#sn-pg-010) Thumbnail generation & disk caching
- [ ] [SN-PG-011](pages-canvas.md#sn-pg-011) Page rail / thumbnail column
- [ ] [SN-PG-012](pages-canvas.md#sn-pg-012) Add page (clone paper/tint/size)
- [ ] [SN-PG-013](pages-canvas.md#sn-pg-013) Duplicate / reorder / delete page operations
- [ ] [SN-PG-014](pages-canvas.md#sn-pg-014) Move page between notebooks
- [ ] [SN-PG-015](pages-canvas.md#sn-pg-015) Templates & paper picker overlay
- [ ] [SN-PG-016](pages-canvas.md#sn-pg-016) Infinite / freeform canvas
- [ ] [SN-PG-017](pages-canvas.md#sn-pg-017) PDF-backed page kind integration
- [ ] [SN-PG-018](pages-canvas.md#sn-pg-018) Scroll modes (paged / continuous / single)
- [ ] [SN-PG-019](pages-canvas.md#sn-pg-019) Convert page kind & hybrid behaviour
- [ ] [SN-PG-020](pages-canvas.md#sn-pg-020) Print layout & pagination

#### Security & privacy
All page content is note content: never leaves the device except as ciphertext via the user's own cloud (CLAUDE.md §7.1). Freeform growth and imported `.sanenote`/PDF geometry are untrusted input — cap logical bounds and stream tiles to prevent resource-exhaustion DoS (CWE-400, CWE-770, OWASP-A04). Thumbnails and derived rasters are stored in app-private/at-rest-protected storage (MASVS-STORAGE-1). No page/ink coordinates in logs (MASVS-STORAGE-2, CWE-532). Deletion purges plaintext only after retention + causal stability (MASVS-PRIVACY-4).

#### UX notes
Source of truth: `docs/design/screens-and-flows.md` §7 (Editor), §8 (Templates). Adaptive from phone (~400 px, `narrow` collapses the rail) to tablet/desktop. Accessibility per PRD-01 A11Y-BASE (WCAG 2.2 AA): labelled controls, 44x44 pt targets, keyboard reachable on web, non-drag alternatives for reorder (WCAG 2.5.7), no meaning by colour alone. Every look + dark mode covered by golden tests.

#### Test plan
Each child names its own tests. Epic-level integration: `app/integration_test/pages_canvas_smoke_test.dart` exercises create page of each kind, navigate, zoom, add/delete/undo across a seed notebook; golden coverage `app/test/golden/paper_fills_golden_test.dart` across the 17 looks + dark.

#### Dependencies
SN-CORE-002 (document model entities), SN-CORE-003 (CRDT), SN-CORE-004 (persistence), SN-ED-002 (editor canvas widget), SN-DS-002 (tokens), SN-PDF-002 (PDF render), SN-LIB-002 (library home), SN-TPL-001 (templates).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-002

<a id="sn-pg-002"></a>

**Implement Page model and PageKind entities in sane_core**

| Field | Value |
|---|---|
| GitHub | #396 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | pages-canvas, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `OWASP-A04`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
The page is the unit of load/sync/merge in Sane Notes (`docs/architecture/document-model.md` §0, ADR-0005) and the container every editor object hangs off. Before any rendering, navigation or template work can start, `packages/sane_core` needs the immutable, CRDT-friendly `Page` entity and the `PageKind` discriminator with its per-kind fields. This implements the Page row of the document-model entity table (`document-model.md` §1.2) and PRD-LB-090 (three page kinds, per-page, mixable within one notebook). Getting the field kinds right (IMM vs LWW vs POS) is load-bearing: `kind` and PDF refs are immutable, `template`/`size`/`background` are LWW registers, `position` is a fractional index, and `layers` is a movable-list.

#### Scope
**In:** the `Page` value object, `PageKind {paged, infinite, pdfBacked}`, `PaperTemplate {ruling, colorToken, spacingPt}`, `PageSize` (Auto/A4/Letter + orientation), `canvasBounds` (DERIVED for infinite), `pdfRef`/`pdfPageIndex` (IMM for pdfBacked), `background` ColorToken, and the CRDT op wiring (`createNode`/`moveNode`/`setAttr`) for these fields.
**Out:** rendering the page ([SN-PG-003](pages-canvas.md#sn-pg-003), [SN-PG-004](pages-canvas.md#sn-pg-004)), viewport ([SN-PG-005](pages-canvas.md#sn-pg-005)), the `.sanenote` byte layout (SN-CORE-005), Layer/Object entities (SN-CORE-002).

#### Acceptance criteria
- [ ] `Page` is an immutable Dart value object with `id: ObjectId`, `parent`, `position: FracIndex`, `kind: PageKind` (IMM), `template`, `size`, `background`, `pdfRef?`, `pdfPageIndex?`, `layers` (movable-list), `trashed`/`deletedAt` — matching `document-model.md` §1.2.
- [ ] `PageKind` is IMM after creation; changing kind is a delete+create (see [SN-PG-019](pages-canvas.md#sn-pg-019)), never an in-place mutation.
- [ ] `template`, `size`, `background` are LWW registers resolved by HLC; concurrent re-paper + resize both survive (independence rule, document-model §4.4).
- [ ] A notebook can hold a mix of all three kinds; a `paged` page carries a valid `PageSize`, an `infinite` page ignores `size` and computes `canvasBounds`, a `pdfBacked` page carries IMM `pdfRef`+`pdfPageIndex`.
- [ ] Malformed/oversized page records from a decoded `.sanenote` are rejected (bounds/enum validation) before construction; unknown CBOR fields round-trip untouched (document-model §9).
- [ ] 100% unit coverage of field-kind semantics and CRDT merge outcomes.

#### Technical notes
Add to `packages/sane_core/lib/src/model/` (pure Dart, no `package:flutter`). Reuse `ObjectId`, `FracIndex`, `Hlc`, `Result<T,Failure>` from SN-CORE-002/003. Ops from the registry: `createNode`, `moveNode`, `setAttr` (`document-model.md` §2.3). Enforce the enum for `PageKind`/ruling and the documented freeform cap constant (100,000x100,000 units, PRD-ED-002) here as a shared constant used later by [SN-PG-016](pages-canvas.md#sn-pg-016). Follow ADR-0005; do not fatten ops with vector clocks (HLC total order only).

#### Security & privacy
Untrusted `.sanenote` input: validate `kind`/`ruling`/`size` enums, clamp numeric fields, cap `canvasBounds`, and never construct a Page from unbounded values (CWE-20, CWE-400, MASVS-CODE-4, OWASP-A04). Page titles/paper are encrypted metadata; ids log as opaque short hashes only (MASVS-STORAGE-1/2). No content leaves the device.

#### UX notes
None beyond baseline (data layer, no UI). Baseline: no note content or coordinates logged; opaque ids only. Field semantics must let higher layers render every one of the 17 looks by reading tokens, never hard-coded values.

#### Test plan
`packages/sane_core/test/page_model_test.dart` (construction, field kinds, validation of hostile records), `packages/sane_core/test/page_kind_crdt_test.dart` (concurrent re-paper vs resize both survive; move/reorder converges; kind is immutable). Headless unit tests only (no widget harness), per CLAUDE.md §10.

#### Dependencies
SN-CORE-002 (document model entities), SN-CORE-003 (CRDT semantics: add-wins set, LWW, HLC, movable-list).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-003

<a id="sn-pg-003"></a>

**Implement paged page kind geometry, sizes and orientation**

| Field | Value |
|---|---|
| GitHub | #397 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
The `paged` page kind is the default note surface: a fixed-size sheet with a drop shadow that reads like real paper (design screens §7.2; `docs/design/tokens.json` `page` = `{W:800,H:1040,editorMaxWidthPx:820,freeform:[2400,2400]}`). Ink is captured in page-units so it is resolution-independent across zoom and export (PRD-ED-001). This issue builds the page widget geometry, the Auto/A4/Letter size options, and portrait/landscape orientation (PRD-ED-006, PRD-LB-093). It is a hard prerequisite for the ink editor alpha (M1) because you cannot draw before there is a sized, positioned page to draw on.

#### Scope
**In:** the paged page widget (800x1040 base units, drawn <= 820 px wide, 4 px corner radius, drop shadow), the `PageSize` segmented options Auto (800x1040 ratio) / A4 (210x297 mm) / Letter (8.5x11 in), portrait/landscape orientation, adjustable line/grid/dot spacing hook, and page-unit <-> screen-pixel coordinate mapping consumed by the ink layer.
**Out:** the paper fill/tint pixels themselves ([SN-PG-004](pages-canvas.md#sn-pg-004)), freeform ([SN-PG-016](pages-canvas.md#sn-pg-016)), pdfBacked ([SN-PG-017](pages-canvas.md#sn-pg-017)), the templates picker UI ([SN-PG-015](pages-canvas.md#sn-pg-015)), pan/zoom ([SN-PG-005](pages-canvas.md#sn-pg-005)).

#### Acceptance criteria
- [ ] A `paged` page renders at 800x1040 page-units, at most 820 px wide, with a 4 px radius and drop shadow, exactly per `tokens.page` (no hard-coded numbers; read tokens via `sane_ui`).
- [ ] Size control Auto / A4 / Letter changes the unit aspect ratio (Auto = 800x1040, A4 = 210x297 mm, Letter = 8.5x11 in) and orientation toggles portrait/landscape; the choice is stored on the Page and preserved on export to PDF (PRD-ED-006, PRD-LB-093).
- [ ] Ink coordinates are captured/stored in page-units and map 1:1 back to screen pixels at any zoom (crisp at 25%-1600%).
- [ ] Line/grid/dot spacing is adjustable (default preset) and exposed to [SN-PG-004](pages-canvas.md#sn-pg-004) for fill rendering.
- [ ] Renders correctly in all 17 looks + light/dark (page ground uses the `pp` paper token per look).
- [ ] Page exposes accessibility label "Page X of N -- <template> <tint>" (PRD-ED-001).

#### Technical notes
Widget in `packages/sane_ui` + composition in `app/`; geometry constants only from `tokens.json.page`. Use a `RepaintBoundary` around the page so only the active stroke repaints (CLAUDE.md §8). Size math converts physical page sizes to the 800-unit-wide base ratio. Coordinate mapping is the contract the ink capture layer ([SN-INK-002](ink.md#sn-ink-002)) consumes. Follow ADR-0003 (Riverpod/go_router) for size/orientation state.

#### Security & privacy
None beyond baseline. Baseline: page content stays on device; nothing logged from layout; only opaque page ids in any diagnostics (MASVS-STORAGE-1/2).

#### UX notes
Mirror screens §7.2 (page 800x1040, max 820 px, shadow, 4 px radius) and §8 size segmented control (Auto/A4/Letter). Size control is a labelled segmented control, keyboard-operable on web, 44 pt targets. Orientation change reflows without losing ink. Respect "reduce transparency" for glass looks.

#### Test plan
`app/test/pages/paged_geometry_test.dart` (unit->pixel mapping, size ratios, orientation), `app/test/golden/paged_page_golden_test.dart` (golden across the 17 looks + dark for Auto/A4/Letter portrait+landscape). Widget test for the size segmented control and its a11y labels.

#### Dependencies
SN-PG-002 (Page model), SN-DS-002 (tokens as ThemeExtension for 17 looks).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-004

<a id="sn-pg-004"></a>

**Render paper fill patterns and tint washes for all templates**

| Field | Value |
|---|---|
| GitHub | #398 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas, templates, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-003](pages-canvas.md#sn-pg-003), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
A page's background is its paper fill pattern plus an optional tint wash (design screens §7.2, §8; `docs/design/tokens.json` `paperFill`, `tint`, `tintSwatches`, `templates`). This issue paints those backgrounds beneath ink for the built-in templates Blank, Lined, Grid, Dotted, Cornell, Music staff, Weekly planner, Flashcards (plus M1+ Isometric and Chemistry/hex per PRD-LB-092). It implements PRD-ED-004 (paper templates), PRD-ED-005 (tints) and PRD-LB-093 (tints/sizes/spacing). Correctness across 17 looks + dark mode and AA contrast against every look's page colour is the quality bar (PRD-ED-004 A11y).

#### Scope
**In:** SVG/CustomPainter rendering of each `paperFill` (`lined`, `grid`, `dot`, `music`, `flash`; Cornell = lined + divider rules; planner = grid) with adjustable spacing; the four tints White(none)/Cream/Yellow/Gray as a translucent wash over the fill; Isometric and hex grids; caching the fill as a `Picture` so it is not repainted per frame.
**Out:** the template *picker* UI ([SN-PG-015](pages-canvas.md#sn-pg-015)), custom/imported templates ([SN-TPL-001](templates.md#sn-tpl-001)), applying only the tint to PDF pages beyond the rule stated here ([SN-PG-017](pages-canvas.md#sn-pg-017)).

#### Acceptance criteria
- [ ] Each template renders from `tokens.paperFill`/`tokens.templates` with no hard-coded colours; Cornell adds divider rules, Music renders staff lines, Flashcards renders the card outline (screens §7.2).
- [ ] Tints White/Cream/Yellow/Gray apply as a translucent wash over the fill (from `tokens.tint`/`tintSwatches`) on paged, freeform and PDF pages (tint only for PDF).
- [ ] Ruled/grid/dot density keeps >= 4.5:1 AA contrast against every look's `pp` page colour; a non-blocking warning is surfaced if a chosen ink+tint fails contrast (PRD-ED-005).
- [ ] The fill layer is flattened to a cached `Picture`/tile and does not repaint while the user writes (60 fps hot path preserved).
- [ ] Correct in all 17 looks + light/dark; the fill re-derives when the look or dark mode changes.
- [ ] Line/grid/dot spacing is honoured from the Page (PRD-LB-093, [SN-PG-003](pages-canvas.md#sn-pg-003)).

#### Technical notes
Implement in `packages/sane_render` (painting into `dart:ui` Canvas, tile/Picture cache) with tokens from `sane_ui`. Prefer vector fills (SVG-equivalent path painting) so they stay crisp at zoom (no bitmap scaling). Keep the fill in its own layer beneath the highlight+ink layers (highlighter sits under ink, PRD-ED-069). Contrast check uses the WCAG relative-luminance formula against the resolved `pp` token.

#### Security & privacy
None beyond baseline. Baseline: templates are first-party static vector fills, no external fetch (PRD-ED-004 Sec); no content logged; on-device only (MASVS-STORAGE-1, MASVS-NETWORK-1 -- no egress).

#### UX notes
Match screens §7.2/§8: fills and tints as shown; the tint is a subtle wash, never overpowering ink. Each template has a name + one-line description for the picker (not colour-only). PDF pages keep original colours in dark mode; only the tint wash may apply (screens §0). Golden every look.

#### Test plan
`app/test/golden/paper_fills_golden_test.dart` (every template x every tint across 17 looks + dark), `packages/sane_render/test/paper_fill_test.dart` (spacing, layer order beneath ink), `app/test/pages/tint_contrast_test.dart` (AA contrast + low-contrast warning trigger).

#### Dependencies
SN-PG-003 (paged geometry + spacing), SN-DS-002 (tokens/looks).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-005

<a id="sn-pg-005"></a>

**Implement pan and zoom viewport with documented limits**

| Field | Value |
|---|---|
| GitHub | #399 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Panning and zooming the canvas are core editor gestures the pen app cannot ship without (design screens §7.2; PRD-ED-007 pan, PRD-ED-008 zoom). Ink must stay crisp at every zoom via vector re-tessellation, not bitmap scaling, and the gestures must never regress the pen-down->pixel latency budget (decision 7). This issue owns the viewport transform (translation + scale) shared by paged, freeform and PDF pages, plus the platform-specific pan/zoom inputs (two-finger drag, pinch, trackpad, scroll-wheel, spacebar-drag on web).

#### Scope
**In:** the viewport transform matrix and controller; two-finger drag pan; pinch-to-zoom 25%-1600%; over-scroll clamp for paged pages vs free pan for freeform; web/desktop scroll-wheel + spacebar-drag pan + Ctrl/Cmd +/-; keeping the active-stroke layer decoupled so writing stays 60 fps.
**Out:** fit/recenter ([SN-PG-006](pages-canvas.md#sn-pg-006)), rotate ([SN-PG-007](pages-canvas.md#sn-pg-007)), freeform growth/minimap ([SN-PG-016](pages-canvas.md#sn-pg-016)), scroll-through-pages continuous mode ([SN-PG-018](pages-canvas.md#sn-pg-018)).

#### Acceptance criteria
- [ ] Pinch zoom spans 25%-1600% (documented upper bound; verify against memory budget) and ink is re-tessellated so it is crisp at all zoom, never pixelated.
- [ ] Two-finger drag pans; a paged page pans only within a small over-scroll margin when zoomed to fit; a freeform page pans freely.
- [ ] On web/desktop: scroll-wheel and spacebar-drag pan; trackpad pinch and Ctrl/Cmd +/- zoom; the app provides its own zoom controls because `touch-action:none` blocks browser zoom (WCAG 1.4.4, PRD-ED-008).
- [ ] Panning/zooming holds >= 60 fps and no frame > 16.7 ms while a stroke is in progress; nothing is logged on the hot path.
- [ ] Momentum/inertia matches platform norms; Reduce Motion disables fling.
- [ ] Keyboard pan (arrow keys when canvas focused, no selection) works on web.

#### Technical notes
Wrap the canvas in a raw `Listener` (not `GestureDetector`) and disambiguate pen vs finger by `event.kind` (CLAUDE.md §8); pan/zoom are finger/trackpad gestures so they must not fight pen ink. Keep the finished-strokes `Picture` and the active-stroke `CustomPainter` in separate `RepaintBoundary`s; apply the viewport transform to the static layer, never re-tessellate finished strokes per frame except on scale-settle. State in `app/` Riverpod (ADR-0003). Do not enable `GestureBinding.resamplingEnabled` on the draw path.

#### Security & privacy
None beyond baseline. Baseline: gesture coordinates are note-adjacent -- never logged; on-device only (MASVS-STORAGE-1/2, CWE-532).

#### UX notes
Match Procreate/Linea conventions (screens §7.2): pinch to zoom, two-finger pan. Provide visible zoom controls for web/a11y. Honour system text-zoom for chrome. Cursor changes per tool. Respect Reduce Motion.

#### Test plan
`app/test/pages/viewport_pan_zoom_test.dart` (clamp limits 25%-1600%, over-scroll margin, freeform free-pan), `app/integration_test/editor_latency_test.dart` (assert 60 fps + no frame > 16.7 ms while writing during zoom), `app/test/pages/viewport_web_input_test.dart` (wheel/spacebar/Ctrl+- + keyboard pan).

#### Dependencies
SN-PG-002 (Page model), SN-ED-002 (editor canvas widget & tool state machine).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-006

<a id="sn-pg-006"></a>

**Implement fit-to-viewport and recenter action**

| Field | Value |
|---|---|
| GitHub | #400 |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-005](pages-canvas.md#sn-pg-005) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready, good first issue |

#### Context
A one-tap "fit" is essential for orientation, especially on freeform pages where there are no edges to anchor to (PRD-ED-133, PRD-ED-002 A11y; Linea recenter, `docs/research/sources/concepts-linea-paper-fresco.md` §2). This is a small, self-contained addition on top of the viewport controller ([SN-PG-005](pages-canvas.md#sn-pg-005)): compute the transform that fits the page (paged) or all content bounds (freeform) into the viewport and animate to it.

#### Scope
**In:** a "fit page to viewport" action for paged/PDF pages and a "fit all content" action for freeform; both reachable by a dock button, a quick-pinch gesture, and a keyboard shortcut; an animated (Reduce-Motion-aware) transition to the target transform.
**Out:** the freeform minimap/overview and edge-of-content indicators ([SN-PG-016](pages-canvas.md#sn-pg-016)), pan/zoom mechanics ([SN-PG-005](pages-canvas.md#sn-pg-005)).

#### Acceptance criteria
- [ ] Fit computes the correct transform: paged/PDF fits the page rect to the viewport with a small margin; freeform fits the union of all object bounds (`canvasBounds`, document-model §1.2 DERIVED).
- [ ] Triggered by a labelled dock button, by quick-pinch, and by a keyboard shortcut; announced to screen readers.
- [ ] On an empty freeform page, fit recenters to the seed origin (no NaN/empty-bounds crash).
- [ ] Transition respects Reduce Motion (instant when enabled); result clamps within the zoom limits from [SN-PG-005](pages-canvas.md#sn-pg-005).
- [ ] Works identically across all five surfaces.

#### Technical notes
Pure transform math on the viewport controller from [SN-PG-005](pages-canvas.md#sn-pg-005); read `canvasBounds` for freeform (recompute if stale). Add a `fitToViewport()` / `fitToContent()` method and wire the dock button + shortcut (extends the shortcut map in [SN-ED-001](editor.md#sn-ed-001)). No new isolate work; this is synchronous math.

#### Security & privacy
None beyond baseline. Baseline: on-device only; no logging of coordinates (MASVS-STORAGE-1).

#### UX notes
Match Linea recenter (screens/research). Button uses a clear "fit" glyph + label; essential for freeform orientation. Keyboard shortcut discoverable via the shortcuts sheet. 44 pt target.

#### Test plan
`app/test/pages/fit_recenter_test.dart` (paged fit rect, freeform content-bounds fit, empty-page recenter, zoom-limit clamp, Reduce-Motion instant path). Widget test for the dock button + keyboard shortcut + a11y announcement.

#### Dependencies
SN-PG-005 (viewport controller).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-007

<a id="sn-pg-007"></a>

**Implement canvas rotate with snap detents and reset**

| Field | Value |
|---|---|
| GitHub | #401 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pages-canvas, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-005](pages-canvas.md#sn-pg-005) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Rotating the canvas is a comfort feature for sketching and left-handed writing, and a MUST for freeform boards (PRD-ED-009). Rotation is a *view transform only* -- the stored ink orientation never changes -- so it composes cleanly with pan/zoom ([SN-PG-005](pages-canvas.md#sn-pg-005)). This adds two-finger twist with a snap detent at 0/90/180/270 degrees and a visible reset affordance.

#### Scope
**In:** two-finger twist rotation on the viewport transform; snap detents at 0/90/180/270 with a haptic tick where available; a compass/"reset rotation" affordance shown while rotated; a menu/keyboard "reset orientation" alternative.
**Out:** rotating a *page's stored content* or objects (that is selection/transform in [SN-ED-001](editor.md#sn-ed-001)); pan/zoom ([SN-PG-005](pages-canvas.md#sn-pg-005)).

#### Acceptance criteria
- [ ] Two-finger twist rotates the canvas smoothly; a detent snaps to 0/90/180/270 with a haptic tick (PRD-ED-160) on supporting hardware.
- [ ] Rotation is a view transform only: exported/stored ink orientation is unchanged; toggling rotation and back is loss-less.
- [ ] A compass / reset affordance appears while rotated and returns to 0 degrees; a keyboard/menu "reset orientation" exists (no gesture required).
- [ ] Rotation composes with pan/zoom without drift; content stays crisp (vector).
- [ ] Screen-reader reading order is not broken by visual rotation (PRD-ED-009 A11y).
- [ ] Paged pages default to rotation off unless enabled; freeform allows free rotation.

#### Technical notes
Extend the viewport transform in [SN-PG-005](pages-canvas.md#sn-pg-005) with a rotation component; keep it in the view matrix, never applied to stored geometry. Detent logic snaps within a small angular threshold. Haptics via the platform channel where present (degrade silently). State in `app/` Riverpod.

#### Security & privacy
None beyond baseline. Baseline: on-device only; no coordinate logging (MASVS-STORAGE-1).

#### UX notes
Match Linea rotate + compass reset (research `concepts-linea-paper-fresco.md` §2). Reset affordance is a 44 pt labelled control; keyboard alternative in the menu. Respect Reduce Motion for the snap animation.

#### Test plan
`app/test/pages/canvas_rotate_test.dart` (twist->angle, detent snap, reset to 0, lossless round-trip, compose with pan/zoom). Widget test for the reset affordance + keyboard/menu alternative + a11y reading order.

#### Dependencies
SN-PG-005 (viewport controller).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-008

<a id="sn-pg-008"></a>

**Implement page navigation: prev/next, go-to-page and jump-to-bookmark**

| Field | Value |
|---|---|
| GitHub | #402 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Users move between pages constantly, so the dock carries a `< X / N >` stepper plus a numeric "go to page" and jump-to-bookmark (design screens §7.3; PRD-ED-010). Navigation must clamp to `[1, N]`, support swipe-across-page-edge on paged notebooks when not mid-stroke, and announce the current page for accessibility.

#### Scope
**In:** the in-dock `< X / N >` stepper (`gotoPage`), a numeric "go to page..." entry, jump-to-bookmark, swipe-across-page-edge navigation on paged notebooks, keyboard PageUp/PageDown, and the current-page state shared with the rail and toolbar title.
**Out:** the bookmark toggle/model ([SN-PG-009](pages-canvas.md#sn-pg-009)), continuous scroll mode ([SN-PG-018](pages-canvas.md#sn-pg-018)), the page rail thumbnails ([SN-PG-011](pages-canvas.md#sn-pg-011)).

#### Acceptance criteria
- [ ] `< X / N >` steps pages, clamped to `[1, N]`; the toolbar title reflects "<notebook> - page X of Y" (screens §7.1).
- [ ] "Go to page..." accepts a number and jumps (clamped, invalid input ignored with a hint); jump-to-bookmark cycles bookmarked pages.
- [ ] Swipe across the page edge navigates on paged notebooks only when not mid-stroke; disabled in freeform.
- [ ] Keyboard PageUp/PageDown navigate on web/desktop; the control announces "Page X of N" to screen readers.
- [ ] Navigation restores viewport to a sensible default (fit) for the arrived page; current page persists as `lastOpenedPage`.
- [ ] Navigating past the last page offers add-page rather than wrapping.

#### Technical notes
Drive from the Page movable-list order in [SN-PG-002](pages-canvas.md#sn-pg-002); current-page index is `app/` Riverpod state consumed by the dock, rail ([SN-PG-011](pages-canvas.md#sn-pg-011)) and title. `lastOpenedPage` persists via the library metadata (PRD-LB-041). Coordinate with [SN-ED-002](editor.md#sn-ed-002) to suppress edge-swipe while a `PointerMoveEvent` stroke is active.

#### Security & privacy
None beyond baseline. Baseline: on-device only; page ids opaque in diagnostics (MASVS-STORAGE-1).

#### UX notes
Match screens §7.3 dock page-nav. Controls labelled; 44 pt targets; keyboard-reachable. Announce page changes. Numeric jump is a labelled field usable without a pointer.

#### Test plan
`app/test/pages/page_nav_test.dart` (clamp, go-to-page validation, jump-to-bookmark cycle, edge-swipe suppressed mid-stroke), `app/integration_test/page_nav_test.dart` (keyboard PageUp/PageDown + a11y announcements end-to-end).

#### Dependencies
SN-PG-002 (Page model / order), SN-ED-002 (editor canvas widget & stroke state).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-009

<a id="sn-pg-009"></a>

**Implement page bookmarks model and toggle**

| Field | Value |
|---|---|
| GitHub | #403 |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Bookmarking a page lets students flag key pages and jump to them (design screens §7.1; PRD-ED-017). The toolbar bookmark toggle fills when the current page is bookmarked and toasts the change; bookmarked pages are flagged in the rail and are jump targets for navigation ([SN-PG-008](pages-canvas.md#sn-pg-008)). This is a small, self-contained model+toggle unit.

#### Scope
**In:** a `bookmarked` flag on the Page (LWW register), the toolbar toggle with filled/unfilled pressed state, the toasts "Page bookmarked"/"Bookmark removed", and the rail flag hook + jump-target list feeding [SN-PG-008](pages-canvas.md#sn-pg-008).
**Out:** the rail rendering itself ([SN-PG-011](pages-canvas.md#sn-pg-011)), navigation stepping ([SN-PG-008](pages-canvas.md#sn-pg-008)), a document-wide outline panel (tracked in the outline work under [SN-PG-008](pages-canvas.md#sn-pg-008)).

#### Acceptance criteria
- [ ] The toolbar toggle fills when the current page is bookmarked and clears when not; state is an LWW register on the Page, merged by HLC.
- [ ] Toggling toasts "Page bookmarked" / "Bookmark removed" (2.4 s auto-dismiss, screens §7.1).
- [ ] Bookmarked pages expose a jump list consumed by [SN-PG-008](pages-canvas.md#sn-pg-008) and a flag consumed by [SN-PG-011](pages-canvas.md#sn-pg-011).
- [ ] The toggle exposes pressed/unpressed state to screen readers and is not colour-only (icon fill + label) (PRD-ED-017 A11y).
- [ ] Bookmarks survive close/reopen and sync/merge without loss.

#### Technical notes
`bookmarked` is an LWW register added via `setAttr` (document-model §2.3, §4.4). Toggle lives in the top toolbar (screens §7.1); toast via the shared toast surface. Jump list is derived from the Page order + flag in [SN-PG-002](pages-canvas.md#sn-pg-002).

#### Security & privacy
None beyond baseline. Baseline: on-device only; opaque ids in diagnostics (MASVS-STORAGE-1).

#### UX notes
Match screens §7.1 bookmark toggle. Filled/hollow icon + text label; 44 pt; announce pressed state. Toast confirms both directions.

#### Test plan
`packages/sane_core/test/bookmark_lww_test.dart` (LWW merge of the flag), `app/test/pages/bookmark_toggle_test.dart` (toggle state, toasts, a11y pressed state, jump-list output).

#### Dependencies
SN-PG-002 (Page model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-010

<a id="sn-pg-010"></a>

**Generate and disk-cache page thumbnails on a background isolate**

| Field | Value |
|---|---|
| GitHub | #404 |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas, library, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `CWE-312` |
| Extra labels | agent-ready |

#### Context
The page rail ([SN-PG-011](pages-canvas.md#sn-pg-011)) and the library grid (PRD-LB-042) both render live mini-renders of pages, and they must never block scrolling (PRD-LB-361; decision 7). This task builds the thumbnail service: render a page (strokes + PDF facsimile + paper) to a small raster on a background isolate, cache it to disk, and regenerate (debounced) when the page changes. It is a prerequisite for the rail and the library thumbnails.

#### Scope
**In:** an off-UI-isolate thumbnail renderer (page 1 for notebook cards, per-page for the rail), a disk cache keyed by page id + content hash, debounced regeneration on change, an LRU eviction bound, and a 3:4 notebook-card variant.
**Out:** the rail widget ([SN-PG-011](pages-canvas.md#sn-pg-011)), the library grid card ([SN-LIB-002](library.md#sn-lib-002)), PDF page rasterization internals ([SN-PDF-002](pdf.md#sn-pdf-002)).

#### Acceptance criteria
- [ ] Thumbnails render on a background isolate (`Isolate.run` / storage isolate), never on the UI isolate; scrolling stays 60 fps while thumbnails generate (PRD-LB-361).
- [ ] The cache is keyed by page id + a content hash so it invalidates on change; regeneration is debounced (page-1 change for cards).
- [ ] A bounded LRU cap limits memory + disk; eviction is deterministic.
- [ ] Thumbnails are written to app-private, at-rest-protected storage (never a world-readable path); they are note-derived content (MASVS-STORAGE-1, CWE-312).
- [ ] A missing/failed thumbnail falls back to a placeholder without crashing and is retried.
- [ ] Notebook-card variant is 3:4; rail variant matches the 132 px column.

#### Technical notes
Render via `sane_render` into an off-screen `Picture` -> `toImage`; run under the storage isolate per the isolate model (CLAUDE.md §8, overview §data flow). Cache path under the app's private documents dir; if a page is in a locked notebook, defer to the same at-rest protection as blobs ([SN-CRY-001](security.md#sn-cry-001) boundary -- do not cache decrypted thumbnails outside protected storage). Content hash reuses the blob/content-addressing scheme (document-model §6).

#### Security & privacy
Thumbnails are note content: store in app-private storage, respect at-rest encryption for locked notebooks, never log paths (MASVS-STORAGE-1/2, CWE-312, CWE-532). No egress. Excluded from OS-level unencrypted backups where the platform allows.

#### UX notes
None beyond baseline (service layer). Baseline: no content/paths logged; on-device only. Consumers ([SN-PG-011](pages-canvas.md#sn-pg-011), [SN-LIB-002](library.md#sn-lib-002)) show a loading placeholder while a thumbnail generates and never block the UI.

#### Test plan
`app/test/pages/thumbnail_cache_test.dart` (isolate offload, cache hit/miss by content hash, debounce, LRU eviction, placeholder fallback), `app/integration_test/thumbnail_scroll_perf_test.dart` (assert 60 fps while generating a batch). Assert cache path is app-private in a security unit test.

#### Dependencies
SN-PG-002 (Page model), SN-CORE-004 (SQLite persistence + blob/content-addressed store).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-011

<a id="sn-pg-011"></a>

**Implement page rail thumbnail column with left-handed mirroring**

| Field | Value |
|---|---|
| GitHub | #405 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, android-tablet, web |
| Areas | pages-canvas, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-010](pages-canvas.md#sn-pg-010), [SN-PG-008](pages-canvas.md#sn-pg-008), [SN-PG-012](pages-canvas.md#sn-pg-012) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
The page rail is the 132 px column of live page thumbnails on the editor's right (or left in left-handed mode), with the current page ringed and bookmarked pages flagged, plus a dashed "+ Page" button (design screens §7.7; PRD-ED-012). It is shown only when `showThumbs` AND wide AND not focus mode. It is the primary spatial page navigator on tablets and web.

#### Scope
**In:** the rail widget (132 px column, current page ringed with accent, bookmarked pages flagged, dashed + Page button), the toolbar "Pages" toggle (wide only), left-handed `row-reverse` mirroring, scroll-to-current, tap-to-navigate, and keyboard navigation of the rail.
**Out:** thumbnail generation ([SN-PG-010](pages-canvas.md#sn-pg-010)), add-page behaviour ([SN-PG-012](pages-canvas.md#sn-pg-012)), reorder/delete via the rail ([SN-PG-013](pages-canvas.md#sn-pg-013)), phones (rail is MAY on phones; handled via the overview grid later).

#### Acceptance criteria
- [ ] Rail renders when `showThumbs` AND wide AND not focus mode; hidden for freeform notebooks (PRD-ED-002); toggled by the toolbar Pages button.
- [ ] Current page shows an accent ring AND an icon (not colour-only); bookmarked pages show a flag; tap navigates ([SN-PG-008](pages-canvas.md#sn-pg-008)).
- [ ] Left-handed mode flips the editor row to `row-reverse` so the rail sits on the left (screens §7.7, `prefs.leftHanded`).
- [ ] The dashed "+ Page" button triggers add-page ([SN-PG-012](pages-canvas.md#sn-pg-012)); each thumbnail is a labelled button ("Page X, bookmarked"); the rail is keyboard-navigable (WCAG).
- [ ] Rail scrolls to keep the current page visible; loading thumbnails show a placeholder (never block).
- [ ] Renders correctly across the 17 looks + dark.

#### Technical notes
Widget in `packages/sane_ui` + composed in `app/`; consumes thumbnails from [SN-PG-010](pages-canvas.md#sn-pg-010) and current-page state from [SN-PG-008](pages-canvas.md#sn-pg-008). `narrow` (<900 px) hides the rail per screens §0. Left-handed mirroring is a visual `row-reverse`, preserving logical focus order (PRD-ED-032 A11y). Bookmarked flag from [SN-PG-009](pages-canvas.md#sn-pg-009).

#### Security & privacy
None beyond baseline. Baseline: thumbnails render on-device from local pages only (PRD-ED-012 Sec); nothing logged (MASVS-STORAGE-1).

#### UX notes
Match screens §7.7 exactly: 132 px column, ringed current page, bookmark flags, dashed + Page. Not colour-only for current/bookmarked (ring + icon). Keyboard-navigable; 44 pt targets. Mirror for left-handed without reordering semantics.

#### Test plan
`app/test/pages/page_rail_test.dart` (visibility conditions, current-page ring+icon, bookmark flag, +Page trigger, keyboard nav, left-handed mirror), `app/test/golden/page_rail_golden_test.dart` (17 looks + dark, left/right handed).

#### Dependencies
SN-PG-010 (thumbnails), SN-PG-008 (navigation/current page), SN-PG-012 (add page).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-012

<a id="sn-pg-012"></a>

**Implement add page cloning current paper, tint and size**

| Field | Value |
|---|---|
| GitHub | #406 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | pages-canvas |
| Size | S |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-PG-003](pages-canvas.md#sn-pg-003) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Adding a page is the most common page operation, so it must be instant and predictable: the new page clones the current page's paper template, tint and size and is inserted right after the current page (design screens §7.7 `addPage`; PRD-ED-013). On PDF notebooks, a blank insert adds a Sane paged page (not a PDF page) unless the user imports a PDF.

#### Scope
**In:** the `+ Page` action (from the rail and the dock), cloning paper/tint/size of the current page into a new page inserted after it, navigating to the new page, the "Added page X of N" announcement, and the PDF-notebook rule (blank insert = paged page).
**Out:** duplicating a page's *content* ([SN-PG-013](pages-canvas.md#sn-pg-013)), the templates picker for choosing a different paper ([SN-PG-015](pages-canvas.md#sn-pg-015)), PDF import insertion ([SN-PDF-001](pdf.md#sn-pdf-001)).

#### Acceptance criteria
- [ ] `+ Page` creates a new page cloning the current page's `template`, `tint` and `size`, inserted immediately after the current page, then navigates to it (screens §7.7).
- [ ] The new page has a fresh `ObjectId` and a fractional index strictly between the current page and its next sibling (CRDT-clean insert, document-model §4.3).
- [ ] On a PDF-backed notebook, a blank `+ Page` inserts a paged page (not a PDF page) after the current one (PRD-ED-013).
- [ ] Announces "Added page X of N"; the rail and title update.
- [ ] Add is undoable and merges without conflict on sync.

#### Technical notes
Emit `createNode` + position via `FracIndex.between` (document-model §4.3); clone only paper/tint/size registers, not objects. Navigation reuses [SN-PG-008](pages-canvas.md#sn-pg-008). The action is exposed from both the rail dashed button ([SN-PG-011](pages-canvas.md#sn-pg-011)) and the dock. Insert is a single undoable op batch ([SN-ED-003](editor.md#sn-ed-003)).

#### Security & privacy
None beyond baseline. Baseline: on-device only; opaque ids (MASVS-STORAGE-1).

#### UX notes
Match screens §7.7 `addPage`. The dashed + Page button and dock action both 44 pt, labelled. Announce completion. New page inherits accessibility labels.

#### Test plan
`packages/sane_core/test/add_page_test.dart` (clone of paper/tint/size, fractional-index insert position, fresh id), `app/test/pages/add_page_ux_test.dart` (navigate-to-new, announcement, PDF-notebook paged-insert rule, undo).

#### Dependencies
SN-PG-002 (Page model), SN-PG-003 (paged geometry/size).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-013

<a id="sn-pg-013"></a>

**Implement duplicate, reorder and delete page operations**

| Field | Value |
|---|---|
| GitHub | #407 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-011](pages-canvas.md#sn-pg-011), [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-4`, `CWE-212` |
| Extra labels | agent-ready |

#### Context
Beyond add, the page rail/menu must support duplicate, reorder and delete (design screens Open Question 11 -> resolved by PRD-LB-142; PRD-ED-014/015/016). These operate on CRDT structure so they merge cleanly, and delete must be a recoverable tombstone with 30-day retention (document-model §8). Reorder must offer a non-drag alternative for accessibility (WCAG 2.5.7).

#### Scope
**In:** duplicate a page (paper + tint + size + all layers + objects + bookmarks, new object ids; audio anchors NOT duplicated), reorder via drag in the rail + a non-drag move-up/down/move-to menu, delete-to-trash with confirm/undo, the "a notebook has >= 1 page" guard (offer clear page instead), and multi-select run reorder.
**Out:** move a page to another notebook ([SN-PG-014](pages-canvas.md#sn-pg-014)), clear-page content wipe internals ([SN-ED-001](editor.md#sn-ed-001)), convert page kind ([SN-PG-019](pages-canvas.md#sn-pg-019)).

#### Acceptance criteria
- [ ] Duplicate copies paper/tint/size, all layers and objects (strokes/text/images/shapes) and bookmarks into a new page after the original, minting fresh object ids (add-wins clean merge, PRD-ED-014); audio anchors are not duplicated.
- [ ] Reorder by long-press+drag in the rail shows an insertion indicator and writes a new fractional index (LWW-ordered, PRD-ED-015); a non-drag alternative (move up / move down / move to...) exists for switch/keyboard/screen-reader users (WCAG 2.5.7).
- [ ] Delete removes a page after a single-level confirm or immediate-delete + Undo toast; it is a tombstone (remove-from-add-wins), retained in the op-log for Undo and 30-day Trash; plaintext is purged only after retention + causal stability (document-model §8, CWE-212).
- [ ] Deleting the last page is disallowed (offer "clear page"); reorder/delete/duplicate are all undoable.
- [ ] Multi-select drag reorders a contiguous run.

#### Technical notes
`moveNode` for reorder (fractional index, document-model §4.3), `createObject` per duplicated object with fresh ids (add-wins), `deleteNode` tombstone for delete (§2.3, §8). Retention = `Profile.trashRetentionDays` (default 30). Wire drag into the rail ([SN-PG-011](pages-canvas.md#sn-pg-011)); menu alternative in the page context menu. Single undoable transaction per op ([SN-ED-003](editor.md#sn-ed-003)).

#### Security & privacy
Delete is a tombstone; content is never destructively erased and no residual plaintext leaks -- purge waits for retention + causal stability (MASVS-PRIVACY-4, CWE-212, document-model §8). On-device only; opaque ids logged (MASVS-STORAGE-1/2).

#### UX notes
Match screens §7.7 rail + PRD-LB-142 page menu. Insertion indicator on drag; confirm or Undo toast on delete; non-drag reorder alternative mandatory. Announce "Duplicated page", "Moved page", "Deleted page -- Undo". 44 pt targets, keyboard-reachable.

#### Test plan
`packages/sane_core/test/page_ops_crdt_test.dart` (duplicate new-ids, reorder fractional-index convergence, delete tombstone + retention, last-page guard), `app/test/pages/page_ops_ux_test.dart` (drag reorder + non-drag alternative, confirm/undo, multi-select run, a11y announcements).

#### Dependencies
SN-PG-011 (rail for drag), SN-CORE-003 (CRDT tombstone/movable-list).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-014

<a id="sn-pg-014"></a>

**Implement moving a page between notebooks**

| Field | Value |
|---|---|
| GitHub | #408 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pages-canvas, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-CORE-003](sync.md#sn-core-003), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-4` |
| Extra labels | agent-ready |

#### Context
Students reorganise notes, so a page must be movable from one notebook to another without losing ink, objects, bookmarks or audio anchors (PRD-LB-142 page operations; PRD-LB-035 warns that moving must never silently merge). Because the Notebook->Page structure lives in the movable-tree Library doc (document-model §1, §4.3), a move is a re-parent op, not a copy -- it must converge across devices and keep referenced blobs intact.

#### Scope
**In:** a "Move to notebook..." action (from the page menu / multi-select), a destination picker over the library, re-parenting the page (and its subtree) via `moveNode`, keeping object ids and blob refs, position at the destination end (or chosen index), and the anti-foot-gun confirm when dropping onto a notebook (Move / Cancel, never silent merge).
**Out:** merging whole notebooks/PDFs ([SN-PG-019](pages-canvas.md#sn-pg-019) / library area), the library grid drag itself ([SN-LIB-001](library.md#sn-lib-001)), cross-profile moves (out of scope; profiles are isolated).

#### Acceptance criteria
- [ ] Moving a page re-parents it to the target notebook via a single `moveNode` op; ink, objects, bookmarks and audio anchors are preserved (blob refs unchanged, no re-encode).
- [ ] The move converges across devices with no data loss and no cycle (movable-tree last-mover-wins, document-model §4.3); concurrent moves resolve deterministically.
- [ ] Dropping/selecting a destination never silently merges; the user confirms Move (PRD-LB-035).
- [ ] The source notebook keeps >= 1 page rule (cannot move away the last page without a guard/clear).
- [ ] Move is undoable and announced ("Moved page to <notebook>").
- [ ] A move across notebooks with different default page kinds keeps the page's own kind (per-page kind, PRD-LB-090).

#### Technical notes
`moveNode(page, newParentNotebook, pos)` on the Library doc (document-model §4.3); the page's Page doc is unchanged (content travels by reference). Blob store is content-addressed so no attachment moves are needed (§6). Destination picker reads the library from [SN-LIB-002](library.md#sn-lib-002). Guard against cross-profile targets (profiles are isolated, PRD-PROF-004).

#### Security & privacy
Content moves by reference and stays on-device/encrypted; no plaintext copy is written (MASVS-STORAGE-1, MASVS-PRIVACY-4). Move within one profile only -- never leak a page across the profile boundary (PRD-PROF-004). Opaque ids logged.

#### UX notes
Match PRD-LB-142 page menu + PRD-LB-035 move semantics. Destination picker is a focus-trapped modal; confirm Move; announce completion; Undo toast. 44 pt targets, keyboard-reachable, no drag-only path.

#### Test plan
`packages/sane_core/test/move_page_between_notebooks_test.dart` (re-parent op, convergence, no-cycle, blob refs intact, last-page guard), `app/test/pages/move_page_ux_test.dart` (destination picker, confirm, undo, cross-profile blocked, a11y).

#### Dependencies
SN-PG-002 (Page model), SN-CORE-003 (movable-tree), SN-LIB-002 (library home for destination picker).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-015

<a id="sn-pg-015"></a>

**Implement the paper and templates picker overlay**

| Field | Value |
|---|---|
| GitHub | #409 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pages-canvas, templates |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-003](pages-canvas.md#sn-pg-003), [SN-PG-004](pages-canvas.md#sn-pg-004), [SN-TPL-001](templates.md#sn-tpl-001), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4` |
| Extra labels | agent-ready, innovation |

#### Context
The Templates overlay is the single surface for choosing page style, template, tint and size when creating a notebook or re-papering the current page (design screens §8; PRD-ED-004/005/018, PRD-LB-092/093/094). Its state is the four canvas props `tplStyle`, `tplSel`, `tplTint`, `tplSize` plus `tplMode` ('new' vs 'page'). A differentiator over Notability is **per-page templates within one notebook**: re-papering one page must not touch other pages (PRD-LB-094), which is why this is marked innovation.

#### Scope
**In:** the overlay in both modes -- `tplMode:'new'` ("New notebook") and `tplMode:'page'` ("Paper & template", preselecting the current page's paper/tint); the Page-style segmented Pages/Freeform with the freeform explainer; the Template grid (Blank/Lined/Grid/Dotted/Cornell/Music staff/Weekly planner/Flashcards) from `tokens.templates`; the Paper-color tint swatches; the Page-size segmented Auto/A4/Letter; Cancel + the apply button ("Create notebook" / "Apply to this page"); and the Pro-gate that opens Upgrade when a Free user picks a Pro template.
**Out:** rendering the fills/tints themselves ([SN-PG-004](pages-canvas.md#sn-pg-004)), custom/imported templates + the template store ([SN-TPL-001](templates.md#sn-tpl-001)), creating the freeform canvas mechanics ([SN-PG-016](pages-canvas.md#sn-pg-016)), entitlement logic internals ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] Overlay opens in `tplMode:'new'` from Library "New notebook" and `tplMode:'page'` from Editor "Paper & templates", preselecting the current page's paper/tint in page mode (screens §8).
- [ ] Page-style segmented Pages vs Freeform; choosing Freeform shows the explainer copy and hides the Template grid + size (freeform has no paper/size) (screens §8).
- [ ] Template grid and tint swatches read from `tokens.templates`/`tokens.tintSwatches`; size segmented Auto/A4/Letter; Cornell/Planner show preview rules.
- [ ] Apply in page mode re-papers only the current page (PDF pages take only the tint) and never deletes ink/objects (PRD-ED-018, PRD-LB-094); apply in new mode creates the notebook and opens the editor with the right toast.
- [ ] Free plan exposes Lined/Grid/Dotted (+Blank, +Cornell per PRD-LB-098); selecting a Pro-gated template opens the Upgrade overlay (screens §14).
- [ ] The overlay is a focus-trapped modal (ESC/backdrop closes), all controls labelled, keyboard-operable, correct across the 17 looks + dark.

#### Acceptance criteria (edge/empty)
- [ ] Re-papering a PDF page applies the tint only and leaves the facsimile untouched.

#### Technical notes
Overlay in `app/` using `sane_ui` components ([SN-DS-003](design-system.md#sn-ds-003)); template metadata from `tokens.templates` and the templates package ([SN-TPL-001](templates.md#sn-tpl-001)). `applyTemplate` maps to: new+pages -> create templated notebook; new+freeform -> "Untitled canvas"; page -> `setAttr` re-paper of the current Page only (LWW, no cross-page effect). Pro-gate reads entitlement (fail-open to free). Validate any selection against the known template/tint/size enums.

#### Security & privacy
Templates are first-party static data -- validate selections against the enum, no external fetch, no executable content (MASVS-CODE-4, MASVS-NETWORK-1). On-device only; opaque ids (MASVS-STORAGE-1).

#### UX notes
Mirror screens §8 exactly: titles, segmented controls, grid, tint swatches, size control, footer buttons, freeform explainer copy. Toasts: "New notebook -- start writing", "Freeform canvas -- it grows as you write". Focus-trapped modal; 44 pt targets; keyboard/web operable; golden every look.

#### Test plan
`app/test/pages/templates_overlay_test.dart` (both modes, page-mode preselect, per-page re-paper isolation, PDF tint-only, Pro-gate -> Upgrade, freeform hides grid/size), `app/test/golden/templates_overlay_golden_test.dart` (17 looks + dark).

#### Dependencies
SN-PG-003 (sizes), SN-PG-004 (fill/tint rendering), SN-TPL-001 (templates), SN-DS-003 (component library).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-016

<a id="sn-pg-016"></a>

**Implement infinite freeform canvas with growth, bounds cap and minimap**

| Field | Value |
|---|---|
| GitHub | #410 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pages-canvas |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-PG-005](pages-canvas.md#sn-pg-005) |
| Security controls | `MASVS-CODE-4`, `OWASP-A04`, `CWE-400`, `CWE-770` |
| Extra labels | agent-ready, innovation |

#### Context
The freeform (infinite) canvas is an "endless board" for mind maps, problem-solving and group whiteboarding (design screens §7.2, §8; PRD-ED-002, PRD-LB-091). It seeds at 2400x2400 units (`tokens.page.freeform`), has no max width and no shadow, and grows in every direction as content approaches an edge. Because unbounded growth is a denial-of-service surface via a crafted `.sanenote`, the logical bounds are capped and tiles are streamed rather than allocating one giant buffer. Freeform navigation is hardened in M3 (PRD-ED-002).

#### Scope
**In:** the freeform page surface (2400x2400 seed, no shadow, no page-max-width), automatic growth of `canvasBounds` as ink/objects approach an edge with content preserved and reachable, a documented logical-bounds cap (100,000x100,000 units) enforced with tile streaming, a minimap/overview toggle, "fit all content" (reuses [SN-PG-006](pages-canvas.md#sn-pg-006)), and edge-of-content indicators when panned into empty space.
**Out:** paged geometry ([SN-PG-003](pages-canvas.md#sn-pg-003)), core pan/zoom mechanics ([SN-PG-005](pages-canvas.md#sn-pg-005)), converting a paged page to freeform ([SN-PG-019](pages-canvas.md#sn-pg-019)), freeform scenes/present (PRD-ED-190, editor area).

#### Acceptance criteria
- [ ] A freeform page seeds at 2400x2400 units, has no shadow/max-width, and grows in every direction as content nears an edge; content beyond the initial bounds is preserved and reachable by pan/zoom (PRD-ED-002).
- [ ] The page rail is hidden for freeform notebooks (freeform = one growing surface); a minimap/overview toggle and "fit content" replace it (PRD-LB-091).
- [ ] Logical bounds are capped at the documented maximum (100,000x100,000 units, PRD-ED-002); growth beyond the cap is refused gracefully, and the surface streams tiles rather than allocating a single buffer (no OOM).
- [ ] A crafted `.sanenote` claiming enormous bounds cannot force a giant allocation -- bounds are clamped on load and tiles are lazily materialised (CWE-400, CWE-770, OWASP-A04).
- [ ] Edge-of-content indicators appear when panned away from ink; "fit content" recenters; "reset view" works (resolves screens Open Question 12).
- [ ] Renders correctly across the 17 looks + dark; ink stays crisp at all zoom.

#### Technical notes
Surface in `packages/sane_render` with a tiled painter; `canvasBounds` is DERIVED (document-model §1.2) and recomputed from object bounds. Reuse the freeform-cap constant from [SN-PG-002](pages-canvas.md#sn-pg-002). Tile the visible region ± buffer; dispose off-screen tiles under an LRU cap (mirror the huge-PDF strategy, PRD-LB-135). Minimap renders a downscaled overview. Fit reuses [SN-PG-006](pages-canvas.md#sn-pg-006).

#### Security & privacy
Unbounded growth + hostile `.sanenote` is a resource-exhaustion DoS: clamp bounds on load, cap tile allocation, and stream (CWE-400, CWE-770, OWASP-A04, MASVS-CODE-4). Parse imported page geometry off the UI isolate (CLAUDE.md §7.8). On-device only; no coordinate logging (MASVS-STORAGE-1).

#### UX notes
Match screens §7.2/§8 freeform: endless board, explainer copy, no rail. Minimap + fit + reset view are keyboard/screen-reader actions (PRD-ED-002/019 A11y) because there are no page edges to orient by. Respect Reduce Motion for the fit animation. Golden every look.

#### Test plan
`packages/sane_core/test/freeform_bounds_test.dart` (growth, cap clamp, hostile-bounds `.sanenote` refused without allocation), `app/test/pages/freeform_canvas_test.dart` (minimap toggle, fit content, edge indicators, rail hidden), `app/integration_test/freeform_tile_perf_test.dart` (60 fps pan across a large board, tile LRU).

#### Dependencies
SN-PG-002 (Page model + freeform cap constant), SN-PG-005 (pan/zoom).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-017

<a id="sn-pg-017"></a>

**Integrate PDF-backed page kind beneath the ink layers**

| Field | Value |
|---|---|
| GitHub | #411 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pages-canvas, pdf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-CODE-4`, `OWASP-A03`, `CWE-94` |
| Extra labels | agent-ready |

#### Context
A `pdfBacked` page renders an imported PDF page as an immutable backdrop beneath the user's ink/highlight/text layers (design screens §7.2; PRD-ED-003, PRD-LB-090). This issue is the *page-kind integration* -- how the pages/canvas layer composes the PDF facsimile with the Sane annotation layers, keeps original colours in dark mode, and applies only the tint -- distinct from the PDF render engine itself ([SN-PDF-002](pdf.md#sn-pdf-002)). Annotations are Sane objects stored separately and composited on export; the PDF is never modified in place.

#### Scope
**In:** composing the PDF page raster (from [SN-PDF-002](pdf.md#sn-pdf-002)) as an immutable backdrop under the highlight+ink+text layers; per-page mapping to the source `pdfRef`+`pdfPageIndex` (IMM); enforcing "PDF pages keep original colours in dark mode" and "only tint applies, templates/paper fills do not"; and exposing the PDF text layer to the accessibility tree.
**Out:** the PDF render/text/outline engine internals ([SN-PDF-002](pdf.md#sn-pdf-002)), snap-to-text highlight (PRD-ED-067, editor/PDF area), PDF import flow ([SN-PDF-001](pdf.md#sn-pdf-001)), forms/hyperlinks (PDF area).

#### Acceptance criteria
- [ ] A `pdfBacked` page renders the correct source page as an immutable backdrop; user ink/highlight/text composite above it and never mutate the PDF (PRD-ED-003, PRD-LB-136 non-destructive).
- [ ] The PDF backdrop keeps its original colours even in dark mode; only the tint wash may apply; template/paper fills do not (screens §0, §8).
- [ ] `pdfRef`/`pdfPageIndex` are immutable on the Page; annotations are separate Sane objects composited on export.
- [ ] The PDF text layer is exposed to the screen reader; snapped highlights (when present) carry their anchored text as a label (PRD-ED-003 A11y).
- [ ] Embedded PDF JavaScript and launch/URI actions are never executed without explicit user confirmation (PRD-ED-003 Sec).
- [ ] Renders correctly across the 17 looks + dark (chrome themes, PDF colours preserved).

#### Technical notes
Compose in `packages/sane_render`: the PDF page image from `sane_pdf` ([SN-PDF-002](pdf.md#sn-pdf-002)) is the bottom layer, then highlight, then ink, then text (highlighter under ink, PRD-ED-069). Read the immutable `pdfRef`/`pdfPageIndex` from the Page ([SN-PG-002](pages-canvas.md#sn-pg-002)). Do not apply the dark-mode display mapping to the PDF layer. The PDF blob is parsed off the UI isolate and stored encrypted like any blob (document-model §6, CLAUDE.md §7.8).

#### Security & privacy
Imported PDFs are untrusted: render in the sandboxed engine, never execute embedded JS or follow embedded launch/URI actions without explicit confirmation (MASVS-PLATFORM-2, MASVS-CODE-4, OWASP-A03, CWE-94). Parse off the UI isolate, resource-capped (no decompression bomb). Store encrypted at rest; no content logged (MASVS-STORAGE-1).

#### UX notes
Match screens §7.2 PDF facsimile beneath ink; §0 dark-mode rule. Provide an optional per-document night filter (off by default, PRD-LB-132). Text layer accessible. Tint-only re-paper for PDF pages in the templates overlay ([SN-PG-015](pages-canvas.md#sn-pg-015)). Golden across looks with a fixture PDF page.

#### Test plan
`app/test/pages/pdf_backed_compose_test.dart` (layer order, immutable backdrop, dark-mode colour preserved, tint-only), `app/test/pages/pdf_backed_security_test.dart` (embedded-JS/launch-action not executed), `app/test/golden/pdf_backed_golden_test.dart` (looks + dark with a fixture page).

#### Dependencies
SN-PG-002 (Page model, pdfRef), SN-PDF-002 (PDF render pipeline).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-018

<a id="sn-pg-018"></a>

**Implement scroll modes: paged, continuous vertical, horizontal and single**

| Field | Value |
|---|---|
| GitHub | #412 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | pages-canvas, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-003](pages-canvas.md#sn-pg-003), [SN-PG-011](pages-canvas.md#sn-pg-011) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Study and PDF-reading want a continuous scroll of pages, while note-taking wants one page at a time -- so a per-notebook mode toggle switches between paged (swipe to next) and continuous scroll (pages stacked, virtualized) (PRD-ED-011; PRD-LB-385 side-by-side is separate). Continuous scroll must sustain 60 fps on a 600-page PDF via page virtualization (decision 7). This issue owns the scroll-mode machinery over the page list.

#### Scope
**In:** a per-notebook toggle between paged and continuous-vertical scroll; a horizontal scroll option; a single-page (no-scroll) mode; page virtualization (render only visible ± buffer pages, dispose off-screen); scroll-position + current-page reporting; Reduce-Motion handling (no fling).
**Out:** the huge-PDF rasterization strategy internals ([SN-PDF-002](pdf.md#sn-pdf-002), PRD-LB-135), side-by-side multi-up PDF view (PRD-LB-385, PDF area), pan/zoom mechanics ([SN-PG-005](pages-canvas.md#sn-pg-005)).

#### Acceptance criteria
- [ ] A per-notebook toggle switches paged (one page, swipe to next) vs continuous-vertical (stacked, continuous scroll); a horizontal option and a single-page mode are available (PRD-ED-011).
- [ ] Continuous scroll uses page virtualization (visible ± buffer only, off-screen disposed) and sustains 60 fps scrolling a 600-page PDF (decision 7).
- [ ] Scroll position and current page are announced; current-page state stays consistent with [SN-PG-008](pages-canvas.md#sn-pg-008) and the rail ([SN-PG-011](pages-canvas.md#sn-pg-011)).
- [ ] Reduce Motion disables smooth-scroll fling; switching modes preserves the current page (no jump-to-top).
- [ ] Memory stays within budget on the low-end reference device while scrolling a long notebook (< 300 MB target context, decision 7).
- [ ] Works across all five surfaces; freeform notebooks ignore paged/continuous (they are one surface).

#### Technical notes
Build over a virtualized list (e.g. a lazy `ListView`/custom viewport) keyed by the Page order from [SN-PG-002](pages-canvas.md#sn-pg-002); reuse thumbnails ([SN-PG-010](pages-canvas.md#sn-pg-010)) for the fast-scroll scrubber. Page rasters for PDF come from [SN-PDF-002](pdf.md#sn-pdf-002) with the two-resolution scheme (cheap preview during fling, full-res on settle). Keep rasterization on background isolates (CLAUDE.md §8). Mode is a per-notebook LWW setting.

#### Security & privacy
None beyond baseline. Baseline: on-device only; no content/coordinate logging (MASVS-STORAGE-1/2). Virtualization must not spill decrypted page rasters outside protected memory/storage.

#### UX notes
Match the common study/PDF reading mode (PRD-ED-011). Mode toggle is a labelled control; announce scroll position + page. Respect Reduce Motion. Keep the current page on mode switch. 44 pt targets.

#### Test plan
`app/test/pages/scroll_modes_test.dart` (toggle paged/continuous/horizontal/single, current-page preserved on switch, Reduce-Motion path), `app/integration_test/scroll_600pdf_perf_test.dart` (60 fps + memory bound scrolling a 600-page fixture, virtualization disposes off-screen).

#### Dependencies
SN-PG-003 (paged geometry), SN-PG-011 (rail/current-page).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-019

<a id="sn-pg-019"></a>

**Implement convert page kind and hybrid paged-freeform behaviour**

| Field | Value |
|---|---|
| GitHub | #413 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-016](pages-canvas.md#sn-pg-016), [SN-PG-003](pages-canvas.md#sn-pg-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
Users sometimes start on a paged page and outgrow it, so Sane Notes supports converting a page (or notebook) between kinds -- paged <-> freeform -- preserving objects (PRD-LB-381, Goodnotes "Convert to Whiteboard"). Combined with per-page mixed kinds within one notebook (PRD-LB-090), this is the "hybrid paged+infinite" behaviour in scope. Because `PageKind` is immutable on a Page (document-model §1.2), a conversion is a deterministic delete+create that remaps geometry, expressed as ordinary ops so it merges.

#### Scope
**In:** convert a paged page to freeform (unbounding the surface, preserving object positions) and freeform to paged (choosing a size/crop, clamping/warning on out-of-bounds content); an undoable conversion; a notebook-level convert-all; and the hybrid rule that a notebook may hold both kinds side by side.
**Out:** converting to/from PDF-backed (a PDF backdrop is immutable; not a target of convert), the freeform surface itself ([SN-PG-016](pages-canvas.md#sn-pg-016)), merging notebooks/PDFs (PRD-LB-382, library area).

#### Acceptance criteria
- [ ] Convert paged -> freeform preserves all objects at their positions and unbounds the surface; convert freeform -> paged asks for a size and remaps content into the target geometry, warning (non-blocking) about content outside the chosen page bounds (PRD-LB-381).
- [ ] Conversion is a deterministic delete+create expressed as ordinary ops (new Page id, kept object ids where possible) so all devices converge; it is undoable.
- [ ] Freeform -> paged clamps to the documented bounds and never allocates unboundedly (CWE-400) if the freeform content is huge.
- [ ] A notebook can display a mix of paged and freeform (and PDF-backed) pages after conversions (PRD-LB-090 hybrid).
- [ ] Objects, bookmarks and audio anchors survive the conversion; blob refs are unchanged.
- [ ] Renders correctly in all 17 looks + dark after conversion.

#### Technical notes
Because `PageKind` is IMM, implement as `deleteNode(old)` + `createNode(new, kind)` + object re-parent ops (document-model §2.3, §9 migrations-as-ops guidance) within one undoable transaction. Geometry remap is a local deterministic function (page-units -> freeform space is identity at the origin; freeform -> paged offsets/scales into the size). Reuse the freeform cap constant ([SN-PG-002](pages-canvas.md#sn-pg-002)). Coordinate with [SN-PG-016](pages-canvas.md#sn-pg-016) for the target surface and [SN-PG-003](pages-canvas.md#sn-pg-003) for target sizes.

#### Security & privacy
Remap is local and bounded: clamp when converting a huge freeform to paged (CWE-400, MASVS-CODE-4). Content stays on-device; no plaintext copy leaks; opaque ids logged (MASVS-STORAGE-1).

#### UX notes
Match Goodnotes Convert-to-Whiteboard intent (PRD-LB-381). Present a confirm with the target choice (size for freeform->paged); non-blocking warning if content would fall outside page bounds; Undo toast. Announce "Converted to freeform/paged". 44 pt targets, keyboard-reachable.

#### Test plan
`packages/sane_core/test/convert_page_kind_test.dart` (delete+create ops, object preservation, convergence, huge-freeform clamp, undo), `app/test/pages/convert_page_kind_ux_test.dart` (size prompt, out-of-bounds warning, hybrid mixed-kind notebook, a11y).

#### Dependencies
SN-PG-016 (freeform surface), SN-PG-003 (paged sizes).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PG-020

<a id="sn-pg-020"></a>

**Implement print layout and pagination for pages and PDFs**

| Field | Value |
|---|---|
| GitHub | #414 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | pages-canvas, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PG-001](pages-canvas.md#sn-pg-001) |
| Depends on | [SN-PG-003](pages-canvas.md#sn-pg-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2` |
| Extra labels | agent-ready |

#### Context
Students print notes and annotated PDFs, so pages must lay out correctly to physical paper via the platform print pipeline (PRD-LB-131 uses `package:printing` for AirPrint/native/web; PRD-LB-143 export to PDF flattened). Print layout is the pages/canvas concern of mapping page-units and the chosen page size/orientation to a printable, paginated document with ink+highlights merged onto the page content -- distinct from the export/share flow that packages it.

#### Scope
**In:** a print layout that maps each page (paged/freeform/PDF-backed) to physical paper using its `PageSize`+orientation; pagination of a notebook into an ordered printable document; flattening ink+highlights onto the page (marks merged for print); freeform tiling to fit paper (or fit-to-one-sheet option); a page-range selector; and margin handling.
**Out:** the export overlay/share UI ([SN-SHR-001](sharing-export.md#sn-shr-001)), searchable-handwriting export OCR (PRD-LB-143, search area), the PDF render engine ([SN-PDF-002](pdf.md#sn-pdf-002)).

#### Acceptance criteria
- [ ] Each page prints at its `PageSize`+orientation; Auto maps to the printer's default paper; A4/Letter map to their physical sizes (PRD-ED-006, PRD-LB-093).
- [ ] A notebook paginates into an ordered document; a page-range selector limits output; ink+highlights are flattened onto page content (marks merged) for print (PRD-LB-143 flattened).
- [ ] PDF-backed pages print the PDF backdrop with annotations composited, keeping original colours (screens §0); freeform pages tile across sheets or fit-to-one-sheet per the user's choice.
- [ ] Printing runs via `package:printing` on iPad/Android/web/phones; a print preview reflects the final layout; margins are correct.
- [ ] The print job contains only the intended notebook -- no library/thumbnail/other-notebook content leaks (MASVS-PRIVACY-2).
- [ ] Layout is generated off the UI isolate and shows progress/cancel for large notebooks (PRD-LB-361).

#### Technical notes
Generate a printable PDF with `package:pdf` and hand it to `package:printing` (PRD-LB-131); render page rasters/vector via `sane_render` and PDF pages via [SN-PDF-002](pdf.md#sn-pdf-002); flatten marks onto the page for the print variant (distinct from the live-annotations export). Freeform tiling reuses the tile bounds from [SN-PG-016](pages-canvas.md#sn-pg-016). Run generation on a background isolate. Self-contained: the printable PDF is generated here via `package:pdf`/`package:printing`; the SN-SHR-001 sharing/export epic is not a dependency — [SN-SHR-011](sharing-export.md#sn-shr-011) (system print) consumes this layout.

#### Security & privacy
Print output is a deliberate user action but still note content: include only the selected notebook/pages, never other data (MASVS-PRIVACY-2). Generate off the UI isolate; do not write an unprotected temp file (clean up any spool; app-private) (MASVS-STORAGE-1). No content logged.

#### UX notes
Standard platform print sheet via `package:printing`, preceded by an in-app page-range + fit option. Preview shows pagination. Freeform offers tile vs fit-to-sheet. Announce progress; cancellable. PDF colours preserved. 44 pt targets, keyboard-reachable on web.

#### Test plan
`app/test/pages/print_layout_test.dart` (size/orientation mapping, pagination, page-range, flatten marks, freeform tiling vs fit), `app/test/pages/print_privacy_test.dart` (only selected notebook in the job), `app/integration_test/print_pipeline_test.dart` (package:printing invocation + off-isolate generation).

#### Dependencies
[SN-PG-003](pages-canvas.md#sn-pg-003) (sizes/orientation). Print generates its own PDF via `package:pdf`/`package:printing`; it coordinates with — but does not block on — the export area ([SN-SHR-003](sharing-export.md#sn-shr-003) vector PDF, [SN-SHR-011](sharing-export.md#sn-shr-011) system print, both M2), which consume this print layout.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-008

<a id="sn-phn-008"></a>

**Build phone reading mode with auto-hiding chrome and continuous scroll**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | pages-canvas, pdf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-003](design-system.md#sn-phn-003), [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-CODE-4`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Reading is a primary phone activity — Riya writes on the tablet in the lecture and re-reads on her phone on the bus — so docs/platform/phones.md §4 requires a first-class **reading mode**: a full-bleed page with chrome auto-hidden (tap to toggle), pinch-zoom, single-column reflow for text-heavy notes, and **continuous vertical scroll** across the pages of a notebook or of a PDF at 60 fps. The doc points out that decision 7's '600-page PDF at 60 fps' budget (B8 in docs/platform/performance-budgets.md §1) is felt most on the phone, and the Tier-1 gate device for B8 is exactly the Android-lowend 4 GB reference.

Reading mode is distinct from the existing Focus mode (docs/design/screens-and-flows.md §7.8), which hides chrome for *writing*. Reading mode additionally changes the scroll model (continuous instead of paged), disables ink commitment by default so a stray thumb cannot mark the page, and is where the OCR text layer of [SN-PHN-009](a11y.md#sn-phn-009) becomes selectable and screen-reader-readable.

#### Scope
**In:** the reading-mode state and entry/exit, full-bleed layout with auto-hiding chrome on tap, continuous vertical scroll across notebook pages and PDF pages with recycling, pinch-zoom and double-tap-to-fit, single-column reflow for text-heavy notes, a scroll-position/page indicator, resume-where-you-left-off, and the read-only input policy.
**Out:** the OCR text layer and its screen-reader semantics ([SN-PHN-009](a11y.md#sn-phn-009)), Read Aloud and reading fonts (PRD-CO-336, owned by [SN-A11Y-001](a11y.md#sn-a11y-001)), PDF render internals ([SN-PDF-002](pdf.md#sn-pdf-002)), study/flashcard review ([SN-STDY-001](study.md#sn-stdy-001)), and memory-cap tuning ([SN-PHN-018](perf.md#sn-phn-018)).

#### Acceptance criteria
- [ ] Reading mode is reachable in one tap from the editor and from a library card long-press, and its state is per-notebook and remembered.
- [ ] The page is full-bleed with all chrome hidden; a single tap toggles chrome in and out; the chrome auto-hides again after 3 s of no interaction.
- [ ] Continuous vertical scroll crosses page boundaries within a notebook and within a PDF; a scrubber/indicator shows 'page X of N' and can jump.
- [ ] Scrolling a **600-page PDF sustains 60 fps** on the Android-lowend reference device (budget B8), with page rasters recycled so memory stays under the < 300 MB ceiling (budget B9).
- [ ] Opening a 1,000-page notebook into reading mode reaches interactive in < 1 s (budget B7).
- [ ] Pinch-zoom works and ink stays crisp (vector re-tessellation, not bitmap scaling); double-tap fits the page width.
- [ ] In reading mode a finger scrolls and never inks — no accidental marks — and entering edit from reading mode is an explicit action.
- [ ] Text-heavy notes can reflow to a single column at the reader's text size without horizontal scroll (WCAG 1.4.10, PRD-CO-313).
- [ ] PDFs keep their original colours in dark mode; an optional user 'dim PDF' overlay may be offered but never recolours the PDF's own pixels (docs/design/ux-principles.md §7).
- [ ] Reading mode is offline-silent: no banner, no spinner for local content (ux-principles.md §4.2/§4.4); a PDF page still rasterising shows a skeleton of the eventual page, never a centred spinner.
- [ ] Chrome controls are >= 44×44 pt / 48×48 dp with `Semantics` labels; the chrome-toggle tap target does not swallow screen-reader gestures.

#### Technical notes
Add `app/lib/reading/` (mode state, chrome controller, scroll controller) composing the existing viewport from the pages/canvas area and the PDF pipeline in `packages/sane_pdf` (ADR-0014, pdfrx/PDFium). Use a `CustomScrollView` with a lazily-built, recycled sliver list keyed by page id; never hold whole notebooks rasterised — `packages/sane_render` tile/raster caching MUST cap memory and evict off-screen tiles (phones.md §8). Raster PDF pages **off the UI isolate** (CLAUDE.md §7.8/§8) and cap decode resources before decode. Reuse the fixed page geometry (800×1040 units, max 820 px wide; freeform 2400×2400 — ux-principles.md §8) and never mutate it for the phone. The read-only input policy reuses the arbitration layer from [SN-PHN-006](input-gestures.md#sn-phn-006) with the drawing policy set to none. Chrome auto-hide is a simple timer in `app/`, cancelled on any pointer or a11y interaction; it MUST be disabled when a screen reader is active so chrome does not vanish under an AT user.

#### Security & privacy
Threats: **T-PDFPARSE** — reading mode is the main phone consumer of PDF rasterisation, and a hostile PDF is the classic mobile RCE/DoS vector. Controls: parse and raster off the UI isolate, validate type/size/page count before decode, cap memory and time per page, and fail **closed** into a user-safe error toast rather than a crash (CLAUDE.md §7.8; MASVS-CODE-4, MASVS-PLATFORM-2, OWASP-A03, CWE-20, CWE-400). **T-SHOULDERSURF/TASKSNAP** — a full-bleed reading surface is exactly what a task-switcher snapshot captures. Control: honour app/notebook lock and the screenshot deterrent option for protected content (PRD-LOCK-005/006, PRD-LEAK-002; MASVS-PLATFORM-3). **T-CONTENTLOG** — no page text, OCR text, or PDF path may be logged; cloud file paths are explicitly on the never-log list (CLAUDE.md §7.3; MASVS-PRIVACY-1, CWE-532). No new network egress: reading is entirely local.

#### UX notes
Surfaces: Editor (docs/design/screens-and-flows.md §7) minus chrome, and the exit affordance follows the existing `SaneFocusPill` pattern (§7.8) with reading-mode copy so the two modes are visually distinguishable. Voice per ux-principles.md §5 — 'Reading — tap to show the controls.' Reading chrome uses only tokens, so it holds across all 17 looks in light and dark; the page itself renders pixel-identically regardless of look (ux-principles.md §2), and paper darkens by token in dark mode while PDFs keep their own colours (§7). Empty state: a notebook with no pages shows 'Nothing here yet.' with a 'New page' action. Error state: a PDF page that fails to render shows an inline, per-page message with a retry, never a full-screen error (§4.3). Motion: chrome fade 150–200 ms, cross-fade only under Reduce Motion; no page-turn animation in continuous scroll.

#### Test plan
- `app/test/reading/reading_mode_state_test.dart` — entry/exit, per-notebook persistence, chrome auto-hide timer, auto-hide disabled with a screen reader active.
- `app/test/reading/continuous_scroll_test.dart` — page boundary crossing, indicator accuracy, jump-to-page, recycling (off-screen tiles evicted).
- `app/test/reading/read_only_input_test.dart` — a finger drag scrolls and commits no stroke (negative test).
- `app/test/security/pdf_hostile_reading_test.dart` — a malformed/oversized PDF fails closed to a toast, off the UI isolate, with no crash (abuse test).
- `app/integration_test/phone_reading_perf_test.dart` — 600-page PDF scroll at 60 fps and < 300 MB on Android-lowend via `tools/perf_harness`; 1,000-page notebook open < 1 s.
- `app/test/golden/phone/reading_mode_golden_test.dart` — goldens per look family, light and dark, including a PDF page in dark mode.

#### Dependencies
[SN-PHN-003](design-system.md#sn-phn-003), [SN-PG-002](pages-canvas.md#sn-pg-002), [SN-PDF-002](pdf.md#sn-pdf-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

