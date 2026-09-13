# Backlog — area: editor

43 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-ED-001](editor.md#sn-ed-001) **Build the Sane Notes editor surface (canvas, tools, dock, pages)** (epic · M1 Ink Editor Alpha)
  - [SN-ED-002](editor.md#sn-ed-002) **Implement the editor canvas widget and tool state machine** · p0 · feature · L · M1 Ink Editor Alpha
  - [SN-ED-003](editor.md#sn-ed-003) **Implement per-page undo/redo stacks (60-step, selection-clearing)** · p0 · feature · M · M1 Ink Editor Alpha
    - [SN-ED-008](editor.md#sn-ed-008) **Bind two-finger undo and three-finger redo gestures** · p1 · task · S · M1 Ink Editor Alpha
  - [SN-ED-004](editor.md#sn-ed-004) **Implement lasso selection (loop, marquee, select-by-type)** · p1 · feature · L · M2 Library & Documents
    - [SN-ED-010](editor.md#sn-ed-010) **Implement lasso transform handles (move, resize, rotate)** · p1 · task · M · M2 Library & Documents
    - [SN-ED-011](editor.md#sn-ed-011) **Implement the selection action bar (recolour, restyle, convert, group)** · p1 · task · M · M2 Library & Documents
    - [SN-ED-012](editor.md#sn-ed-012) **Implement copy, cut, paste and duplicate for a selection** · p1 · task · S · M2 Library & Documents
  - [SN-ED-005](editor.md#sn-ed-005) **Implement the floating palette dock with drag-to-dock (4 edges)** · p0 · feature · L · M1 Ink Editor Alpha
    - [SN-ED-007](editor.md#sn-ed-007) **Implement the colour and width sub-pickers in the dock** · p1 · task · S · M1 Ink Editor Alpha
  - [SN-ED-006](editor.md#sn-ed-006) **Implement the editor top toolbar and title block** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-ED-009](editor.md#sn-ed-009) **Implement the eraser tool UI and erase-target filter** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-ED-013](editor.md#sn-ed-013) **Implement the text tool UI and inline text-edit bar** · p1 · feature · M · M2 Library & Documents
  - [SN-ED-014](editor.md#sn-ed-014) **Implement the image insertion UI (place, resize, crop)** · p1 · feature · M · M2 Library & Documents
  - [SN-ED-015](editor.md#sn-ed-015) **Implement the page rail with live thumbnails** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-ED-016](editor.md#sn-ed-016) **Wire add-page, bookmark and in-dock page navigation** · p1 · task · S · M1 Ink Editor Alpha
    - [SN-ED-017](editor.md#sn-ed-017) **Implement duplicate, delete and reorder pages** · p1 · task · M · M2 Library & Documents
  - [SN-ED-018](editor.md#sn-ed-018) **Implement focus mode and the hide-UI toggle** · p1 · feature · S · M1 Ink Editor Alpha
  - [SN-ED-019](editor.md#sn-ed-019) **Implement the zoom window (write-small, place-precise)** · p2 · feature · M · M3 Audio & Recognition
  - [SN-ED-020](editor.md#sn-ed-020) **Implement the laser pointer for presenting** · p2 · feature · S · M4 Identity, Sync & Privacy
  - [SN-ED-021](editor.md#sn-ed-021) **Implement presentation mode and external-display output** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-ED-022](editor.md#sn-ed-022) **Implement editor keyboard shortcuts and the cheat sheet** · p1 · feature · M · M2 Library & Documents
  - [SN-ED-023](editor.md#sn-ed-023) **Implement context menus (right-click and long-press)** · p2 · feature · M · M2 Library & Documents
  - [SN-ED-024](editor.md#sn-ed-024) **Bind the Pencil and S Pen double-tap action** · p1 · feature · S · M1 Ink Editor Alpha
  - [SN-ED-025](editor.md#sn-ed-025) **Bind squeeze, barrel-roll, hover, air actions and gesture customisation** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-ED-026](editor.md#sn-ed-026) **Implement touch gestures and input precedence** · p0 · feature · M · M1 Ink Editor Alpha
  - [SN-ED-027](editor.md#sn-ed-027) **Implement editor toasts, auto-save and sync-status indicators** · p1 · feature · S · M1 Ink Editor Alpha
  - [SN-ED-028](editor.md#sn-ed-028) **Implement in-editor onboarding tips** · p3 · feature · S · M2 Library & Documents
  - [SN-ED-029](editor.md#sn-ed-029) **Implement split view, multi-window and document tabs** · p2 · feature · M · M3 Audio & Recognition
  - [SN-ED-030](editor.md#sn-ed-030) **Implement adaptive editor layout and phone-adaptation hooks** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-GCMP-003](editor.md#sn-gcmp-003) **Add the Tape / masking tool for active recall and redaction** · p2 · feature · M · M2 Library & Documents
  - [SN-GCMP-005](editor.md#sn-gcmp-005) **Add the circle-to-lasso pen gesture** · p2 · feature · S · M2 Library & Documents
  - [SN-GCMP-006](editor.md#sn-gcmp-006) **Build the customizable radial QuickMenu** · p2 · feature · M · M3 Audio & Recognition
  - [SN-GCMP-022](editor.md#sn-gcmp-022) **Add nudge-to-reshape, slice-to-split and non-destructive mask erase** · p3 · feature · L · Backlog

---

## Issues

### SN-ED-001

<a id="sn-ed-001"></a>

**Build the Sane Notes editor surface (canvas, tools, dock, pages)**

| Field | Value |
|---|---|
| GitHub | #13 |
| Type | epic |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor, input-gestures, perf |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-INK-001](ink.md#sn-ink-001), [SN-CORE-001](storage.md#sn-core-001), [SN-DS-001](design-system.md#sn-ds-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `OWASP-A01`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
The editor is the screen the product lives or dies on: it is where ink, PDFs, audio, text and images come together on the page (docs/design/screens-and-flows.md section 7). This epic delivers `app/lib/features/editor` per ADR-0003 (feature-first Riverpod + go_router) - the canvas widget and tool state machine, the floating palette dock (drag-to-dock four edges), per-page undo/redo, lasso selection, eraser/text/image tool UI, page rail, focus/zoom/laser/presentation viewport tools, keyboard shortcuts, context menus, stylus and touch gesture bindings, toasts and the auto-save indicator, split view / document tabs, and the phone-adaptive layout. It wires the engine (`sane_ink`/`sane_render`, SN-INK epic), the document model (`sane_core`, SN-CORE epic) and the design system (`sane_ui`, SN-DS epic) together; it never re-implements ink capture, geometry, hit-testing or persistence (those live below it in the DAG, CLAUDE.md section 3). The whole editor MUST work in guest mode with no account and no network (PRD-ED-177), hold the decision-7 latency budgets (PRD-ED-173), and render in all 17 looks plus dark mode.

#### Scope
**In:** the editor composition root and screen scaffold; the tool state machine and every tool's UI; the palette dock, top toolbar, selection bar, text-edit bar and page rail; undo/redo; lasso transform + selection actions; eraser/text/image tool UI; focus/zoom-window/laser/presentation; keyboard shortcuts, context menus, stylus and touch gesture bindings; toasts, auto-save/sync indicators, in-editor tips; split view / multi-window / tabs; adaptive/phone layout.
**Out:** ink capture/filter/geometry/render/hit-test (SN-INK), brush presets + studio (SN-BRS), document model + persistence + CRDT (SN-CORE), page-kind geometry + pan/zoom transform math (SN-PG), rich-text engine (SN-TXT), image/media pipeline + EXIF (SN-MED), PDF backdrop (SN-PDF), recognition/convert-to-text engine (SN-HWR), audio recorder bar internals (SN-AUD), settings screens (SN-SET).

#### Acceptance criteria
- [ ] All child issues below are closed and CI is green (analyze, unit, widget, golden, perf, security scans).
- [ ] The editor opens with the sidebar closed, works fully offline in guest mode, and never logs note content from the draw loop in profile/release.
- [ ] Every editor control has a Semantics label, a 44 pt / 48 dp target, and a non-gesture alternative (WCAG 2.5.1/2.5.7).
- [ ] Every painted editor surface passes golden tests across all 17 looks in light and dark.
- [ ] Pen-down to pixel and frame budgets (PRD-ED-173) are held while writing with the editor chrome mounted.

#### Technical notes
Package/path: `app/lib/features/editor` (widgets + Riverpod notifiers), consuming `sane_ui`, `sane_render`, `sane_ink`, `sane_core`; cross-feature state via `app/providers/` (ADR-0003). Never a sideways package import (ADR-0002). PRDs: docs/product/prd-01-editor-ink-brushes.md (PRD-ED-001..192). Design: docs/design/screens-and-flows.md section 7, docs/design/component-inventory.md section 5, docs/design/gestures-and-shortcuts.md, docs/design/ux-principles.md. Children:
- [ ] [SN-ED-002](editor.md#sn-ed-002) canvas widget + tool state machine
- [ ] [SN-ED-003](editor.md#sn-ed-003) per-page undo/redo
- [ ] [SN-ED-004](editor.md#sn-ed-004) lasso selection
- [ ] [SN-ED-005](editor.md#sn-ed-005) palette dock + drag-to-dock
- [ ] [SN-ED-006](editor.md#sn-ed-006) top toolbar
- [ ] [SN-ED-007](editor.md#sn-ed-007) colour + width sub-pickers
- [ ] [SN-ED-008](editor.md#sn-ed-008) gesture undo/redo
- [ ] [SN-ED-009](editor.md#sn-ed-009) eraser tool UI
- [ ] [SN-ED-010](editor.md#sn-ed-010) lasso transform handles
- [ ] [SN-ED-011](editor.md#sn-ed-011) selection action bar
- [ ] [SN-ED-012](editor.md#sn-ed-012) copy/cut/paste/duplicate
- [ ] [SN-ED-013](editor.md#sn-ed-013) text tool UI
- [ ] [SN-ED-014](editor.md#sn-ed-014) image insertion UI
- [ ] [SN-ED-015](editor.md#sn-ed-015) page rail + thumbnails
- [ ] [SN-ED-016](editor.md#sn-ed-016) add page + bookmark + page nav
- [ ] [SN-ED-017](editor.md#sn-ed-017) duplicate/delete/reorder pages
- [ ] [SN-ED-018](editor.md#sn-ed-018) focus + hide-UI
- [ ] [SN-ED-019](editor.md#sn-ed-019) zoom window
- [ ] [SN-ED-020](editor.md#sn-ed-020) laser pointer
- [ ] [SN-ED-021](editor.md#sn-ed-021) presentation mode
- [ ] [SN-ED-022](editor.md#sn-ed-022) keyboard shortcuts
- [ ] [SN-ED-023](editor.md#sn-ed-023) context menus
- [ ] [SN-ED-024](editor.md#sn-ed-024) pencil/S Pen double-tap
- [ ] [SN-ED-025](editor.md#sn-ed-025) squeeze/roll/hover/air + gesture customisation
- [ ] [SN-ED-026](editor.md#sn-ed-026) touch gestures + precedence
- [ ] [SN-ED-027](editor.md#sn-ed-027) toasts + auto-save indicator
- [ ] [SN-ED-028](editor.md#sn-ed-028) in-editor tips
- [ ] [SN-ED-029](editor.md#sn-ed-029) split view + tabs
- [ ] [SN-ED-030](editor.md#sn-ed-030) adaptive + phone layout

#### Security & privacy
Everything on the page is note content: local, E2E-encrypted on sync, never logged (CLAUDE.md section 7; overview section 8.2). Trust boundaries the editor touches: the system clipboard (sanitise pasted HTML/SVG, no script; user-gesture on web), inserted files/images (validate + EXIF-strip via SN-MED), URLs/links (safe-scheme allow-list), external-display/presentation (no library or notification leak). Guest data is encrypted like any note; no auth wall to write (PRD-ED-177). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-PLATFORM-1, MASVS-PLATFORM-3, OWASP-A01, CWE-20.

#### UX notes
Surface: design/Sane Notes.dc.html Editor; docs/design/screens-and-flows.md section 7; components in docs/design/component-inventory.md section 5 (SaneEditorToolbar, SaneCanvas, SaneToolPalette, SanePageThumb, SaneSelectionBar, ...). The page is the hero, chrome is a guest (ux-principles section 2): sidebar closed on open, focus mode one pill away, dock floats and docks. All chrome in all 17 looks + light/dark; toasts are the only inverted surface. A11y: Semantics on every control, 44 pt/48 dp, contrast, keyboard on web, non-gesture alternatives.

#### Test plan
Widget/golden suites under `app/test/features/editor/` per look, integration flows in `app/integration_test/editor_*.dart`, and the latency gate `app/integration_test/editor_latency_test.dart`. Each child names its own files; this epic is green only when the child suites and the cross-look golden matrix pass.

#### Dependencies
SN-FND-002 (monorepo scaffold), SN-INK-001 (ink engine), SN-CORE-001 (document model), SN-DS-001 (design system). Coordinates with SN-PG-001 (pages/canvas), SN-BRS-001 (brushes), SN-AUD-001 (audio bar), SN-PDF-001, SN-MED-001, SN-TXT-001, SN-HWR-001, SN-PERF-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-002

<a id="sn-ed-002"></a>

**Implement the editor canvas widget and tool state machine**

| Field | Value |
|---|---|
| GitHub | #234 |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor, input-gestures |
| Size | L |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
The canvas widget hosts the page and routes every pointer to the right consumer, and the tool state machine decides what a pointer means at any moment - so this is the spine the whole editor hangs on (docs/design/screens-and-flows.md section 7.2, section 7.3). The canvas wraps a raw `Listener` (never a GestureDetector on the draw path) and forwards stylus PointerMove to `sane_ink` (SN-INK-002/005) while a coexisting gesture recogniser serves pan/zoom, disambiguated by `event.kind` (CLAUDE.md section 8; ADR-0008). The tool state machine models `tool in {pen, hl, eraser, lasso, shape, text, image}` (PRD-ED-141) plus the transient rules the design encodes: picking an INK/HL colour or a width on the wrong tool snaps back to pen (PRD-ED-036, PRD-ED-042, PRD-ED-066), completing an erase auto-deselects (PRD-ED-078), and a committed stroke pushes undo (SN-ED-003). It owns the per-tool cursor (crosshair/cell/text/copy) and the active-tool indicator, and exposes the current tool/colour/width/brush as Riverpod state for the dock and toolbar to read.

#### Scope
**In:** the `SaneCanvas`-hosting editor widget and its `RepaintBoundary`/layer stack wiring to `sane_render`; the raw `Listener` + pen/finger routing by `PointerDeviceKind`; the tool state machine notifier (`EditorToolController`) with the seven tools, active colour/width/brush, and the snap-back-to-pen transitions; per-tool cursor; commit-to-undo hook on stroke end; the client-to-page coordinate map handed off to `sane_ink` (page-space inverse via SN-PG transform).
**Out:** the ink pipeline and wet renderer (SN-INK-002/005), pan/zoom transform math and page kinds (SN-PG-002/003), palm/finger-draw policy (SN-INK-013), undo stack internals ([SN-ED-003](editor.md#sn-ed-003)), each tool's own UI ([SN-ED-009](editor.md#sn-ed-009), [SN-ED-013](editor.md#sn-ed-013), [SN-ED-014](editor.md#sn-ed-014), [SN-ED-004](editor.md#sn-ed-004)), dock chrome ([SN-ED-005](editor.md#sn-ed-005)).

#### Acceptance criteria
- [ ] The active canvas uses a raw `Listener`; a widget test asserts no GestureDetector sits on the ink path and `GestureBinding.resamplingEnabled` is false.
- [ ] `tool` switches among the seven tools; the active tool is visually indicated (accent) and announced to screen readers (not colour-only).
- [ ] Selecting an INK/HL colour while on eraser/lasso/image snaps `tool` back to pen; selecting a width while on highlighter snaps back to pen (unit tests per transition, PRD-ED-036/042/066).
- [ ] A committed pen/hl/shape stroke pushes one undo entry ([SN-ED-003](editor.md#sn-ed-003)); completing an erase clears any selection (PRD-ED-078).
- [ ] Cursor changes per tool (crosshair/cell/text/copy) on pointer platforms; on web `touch-action:none` is scoped to the canvas only (PRD-ED-172).
- [ ] No widget subtree rebuilds on PointerMove; the wet stroke repaint is driven by a Listenable, not setState (asserted in a widget test).

#### Technical notes
Files under `app/lib/features/editor/canvas/` and `app/lib/features/editor/state/editor_tool_controller.dart` (Riverpod `@riverpod` notifier, immutable `EditorToolState`, ADR-0003). Consumes `sane_render` layer stack ([SN-INK-005](ink.md#sn-ink-005)) and pushes samples into `sane_ink` ([SN-INK-002](ink.md#sn-ink-002)); reads the page-space transform from SN-PG. Implements PRD-ED-141 tool set and the screens section 7.3 snap rules. Do not enable resampling; do not hop isolates on PointerMove (CLAUDE.md section 8).

#### Security & privacy
Pointer coordinates and strokes are note content: on-device, never logged from the draw loop in profile/release (overview 8.2). Validate the shape/length of any native sample batch before use (CWE-20). Guest-first: no identity required to draw (PRD-ED-177). IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-20.

#### UX notes
Surface: Editor canvas (design/Sane Notes.dc.html Editor; screens section 7.2-7.3). Tool selection reads `--ac`/`--aci` in every look (ux-principles section 9.2); the canvas paper/tint/PDF render beneath ink. A11y: active tool has name + selected state (not colour-only); the canvas hosts the parallel a11y tree (component-inventory section 5, accessibility.md section 3); every tool reachable by keyboard tool-key ([SN-ED-022](editor.md#sn-ed-022)) and by tap.

#### Test plan
`app/test/features/editor/canvas/editor_canvas_test.dart` (Listener not GestureDetector, resampling off, no rebuild on move), `editor_tool_controller_test.dart` (seven tools, snap-back transitions, auto-deselect), and a golden of the mounted canvas per look fed into the editor golden matrix.

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet-layer renderer + layer stack), [SN-CORE-002](storage.md#sn-core-002) (document model entities the tools mutate).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-003

<a id="sn-ed-003"></a>

**Implement per-page undo/redo stacks (60-step, selection-clearing)**

| Field | Value |
|---|---|
| GitHub | #235 |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Undo is sacred: every destructive editor action must be reversible, so the undo/redo model is a core-editor primitive that every tool commits through (ux-principles section 10; screens section 7.9). The design specifies per-page undo/redo stacks holding at most 60 snapshots of a page's strokes; `commit` pushes to undo and clears redo, the eraser captures its snapshot on pointer-down, and undo/redo restore the affected page and clear the current selection (PRD-ED-127). The toolbar Undo/Redo dim to 0.35 opacity when their stack is empty (screens section 7.1). This issue ships the user-visible 60-step model first; PRD-ED-128 later evolves the internal representation to an operation log that interoperates with the CRDT op-log (SN-CORE-003) while keeping the >=60 user-visible depth, so the public controller API here is designed to survive that swap.

#### Scope
**In:** the `UndoController` Riverpod notifier per active page; a bounded 60-entry undo stack + redo stack; `commit(before,after)` pushing undo and clearing redo; eraser snapshot-on-pointer-down; undo/redo that restore the page and clear the selection; `canUndo`/`canRedo` exposed for the toolbar dim state; keyboard hooks surfaced to [SN-ED-022](editor.md#sn-ed-022) and gesture hooks to [SN-ED-008](editor.md#sn-ed-008).
**Out:** the op-log migration internals (PRD-ED-128, coordinated with SN-CORE-003 - tracked as a follow-up), the toolbar buttons themselves ([SN-ED-006](editor.md#sn-ed-006)), gesture recognition ([SN-ED-008](editor.md#sn-ed-008)), the scrubbable history timeline (PRD-ED-130, backlog).

#### Acceptance criteria
- [ ] Undo and redo stacks are per-page and cap at 60 entries; the 61st commit evicts the oldest (unit test on depth + eviction).
- [ ] `commit` pushes one undo entry and clears redo; after undo, a new commit clears the redo stack (test).
- [ ] Undo/redo restore the affected page byte-for-byte and clear the active selection (PRD-ED-127).
- [ ] The eraser captures its snapshot on pointer-down, so a multi-stroke erase gesture is one undo step (test with a 3-stroke erase).
- [ ] `canUndo`/`canRedo` are false when the respective stack is empty (drives the 0.35 toolbar dim, screens 7.1).
- [ ] Switching pages preserves each page's own stacks (test opening page A, editing, page B, editing, back to A).

#### Technical notes
Files under `app/lib/features/editor/state/undo_controller.dart` (immutable `UndoState`, Riverpod, ADR-0003). Snapshots reference `sane_core` page entities ([SN-CORE-002](storage.md#sn-core-002)); keep them structurally shared so 60 snapshots do not blow the memory budget (PRD-ED-174, decision 7). Design the API so the storage can migrate from whole-page snapshots to op-log deltas (PRD-ED-128) without changing callers. Undo history is local/session, never synced as content (CLAUDE.md section 7.3).

#### Security & privacy
Undo history is note content held in memory/session; never logged, never synced (PRD-ED-127 Sec). Snapshots stay on-device and are dropped on notebook close. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor toolbar Undo/Redo (screens section 7.1) and gestures (gestures-and-shortcuts section 1). Buttons dim to 0.35 when empty (component-inventory: undo/redo dim pattern). A11y: Undo/Redo expose disabled state to AT; announce what was undone where feasible; keyboard Cmd/Ctrl-Z and Shift-Cmd/Ctrl-Z ([SN-ED-022](editor.md#sn-ed-022)); two/three-finger tap ([SN-ED-008](editor.md#sn-ed-008)) are additive, never the only path.

#### Test plan
`app/test/features/editor/state/undo_controller_test.dart` (depth cap + eviction, commit clears redo, per-page isolation, eraser single-step, restore + selection clear, canUndo/canRedo). Integration coverage of the toolbar dim in [SN-ED-006](editor.md#sn-ed-006).

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) (page entities the snapshots capture and restore).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (PRD-ED-128 follow-up noted)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-004

<a id="sn-ed-004"></a>

**Implement lasso selection (loop, marquee, select-by-type)**

| Field | Value |
|---|---|
| GitHub | #236 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, input-gestures |
| Size | L |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-INK-001](ink.md#sn-ink-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready, innovation |

#### Context
Selection is the gateway to editing existing ink and the single biggest differentiator available to a note app (editable vector ink; PRD-01 section 7 intro). The lasso lets the user draw a loop and select the objects whose bounding-box centre falls inside (screens section 7.3 tool table); an empty selection toasts 'Circle some ink to select it' (PRD-ED-079). It shows a dashed selection rectangle and the selection action bar. This issue ships the selection primitive - loop capture, hit resolution against the page objects, the dashed `SaneSelectionRect`, and the selection model that downstream actions consume ([SN-ED-010](editor.md#sn-ed-010) transform, [SN-ED-011](editor.md#sn-ed-011) recolour/convert/group, [SN-ED-012](editor.md#sn-ed-012) clipboard). Hit-testing geometry itself lives in `sane_ink` (SN-INK-024/025 R-tree + point-in-polygon); this issue calls it and manages the editor-side selection state, non-gesture alternatives (select-all, select-by-type), and the marquee variant.

#### Scope
**In:** the lasso tool loop capture and closed-path build; resolving selected object ids via `sane_ink` hit-testing (bbox-centre-in-loop rule, PRD-ED-079); the `SelectionController` Riverpod state (selected ids, selection bbox, kind mix); the dashed `SaneSelectionRect` overlay; the empty-selection toast; the SHOULD marquee/rectangle select and tap-to-add/remove; non-gesture 'Select all on page' and 'Select by type' menu commands (PRD-ED-079 A11y).
**Out:** move/resize/rotate handles ([SN-ED-010](editor.md#sn-ed-010)), the selection action bar and recolour/restyle/convert/group ([SN-ED-011](editor.md#sn-ed-011)), copy/cut/paste ([SN-ED-012](editor.md#sn-ed-012)), cross-page move (PRD-ED-090, tracked with SN-PG), the circle-to-lasso pen gesture (PRD-ED-186, [SN-ED-025](editor.md#sn-ed-025)), hit-test geometry internals (SN-INK-024/025).

#### Acceptance criteria
- [ ] Drawing a loop selects objects whose bbox centre is inside the loop; a dashed selection rect and the selection bar appear (screens 7.3).
- [ ] An empty loop toasts 'Circle some ink to select it' and leaves no selection (PRD-ED-079).
- [ ] Selection state announces 'N strokes selected' to screen readers; 'Select all on page' and 'Select by type' exist as menu commands (non-gesture alternatives).
- [ ] Marquee/rectangle select and tap-to-add/remove modify the selection set (SHOULD; unit tests).
- [ ] The selection is cleared on tool change, page change, undo/redo, and erase (consistent with PRD-ED-078/127).
- [ ] Locked-layer objects are excluded from selection (PRD-ED-122).

#### Technical notes
Files under `app/lib/features/editor/selection/` and `app/lib/features/editor/state/selection_controller.dart` (Riverpod, immutable `SelectionState`). Call `sane_ink` spatial index + point-in-polygon ([SN-INK-001](ink.md#sn-ink-001) exposes SN-INK-024/025); never re-implement geometry in `app/`. Overlay via `SaneSelectionRect` (component-inventory section 5) painted above ink in the layer stack. Implements PRD-ED-079; groundwork for PRD-ED-080..090, PRD-ED-185.

#### Security & privacy
Selected object ids and geometry are note content: on-device, never logged. Selection is transient session state, never synced. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor lasso + `SaneSelectionBar`/`SaneSelectionRect` (screens section 7.3-7.4; component-inventory section 5). Dashed rect and accent selection read in all 17 looks + dark. A11y: announce selection count; provide 'select all' / 'select by type' as labelled non-gesture commands (WCAG 2.5.1); selection state is not colour-only (dashed outline + count).

#### Test plan
`app/test/features/editor/selection/lasso_selection_test.dart` (bbox-centre rule, empty toast, marquee, tap add/remove, clear-on-transition, locked-layer exclusion), plus a golden of the dashed selection rect per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool state machine + canvas), [SN-INK-001](ink.md#sn-ink-001) (hit-testing + spatial index).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-005

<a id="sn-ed-005"></a>

**Implement the floating palette dock with drag-to-dock (4 edges)**

| Field | Value |
|---|---|
| GitHub | #237 |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor, input-gestures |
| Size | L |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
The tool palette floats and docks rather than being a fixed wall of buttons - this is a core 'chrome is a guest' decision (ux-principles section 2). The 6-dot grip drags the whole toolbar; while dragging, four edge drop-zones light up and the nearest edge is chosen on release, giving `dock in {bottom, top, left, right}` - bottom (default) and top lay it out horizontally centred, left and right lay it out vertically (screens section 7.3, PRD-ED-142). Dock position is also settable from Settings > Handwriting & stylus > Toolbar position, and it persists per profile. This issue builds the `SaneToolPalette` container, the grip drag interaction with live edge-guide feedback and snap, the four layouts, the tool-button row (`tool in {pen, hl, eraser, lasso, shape, text, image}`, PRD-ED-141), and the in-dock page nav slot; colour/width sub-pickers are [SN-ED-007](editor.md#sn-ed-007) and the brush favourites bar is a later M2 slot ([SN-ED-007](editor.md#sn-ed-007) wires the picker, favourites tracked with SN-BRS).

#### Scope
**In:** the `SaneToolPalette` floating container (pad 6, radius 18, bg `--sf`, border `--ln`, `--sh`); the seven `SaneToolButton`s with active state; the 6-dot grip drag (`gripDown`) with four lit drop-zones and nearest-edge `dockHint` snap on release; the bottom/top row and left/right column layouts; per-profile persistence of `dock`; the Settings 'Toolbar position' segmented control as the non-drag alternative (PRD-ED-142 A11y); the page-nav slot host for [SN-ED-016](editor.md#sn-ed-016).
**Out:** colour/width sub-pickers ([SN-ED-007](editor.md#sn-ed-007)), the brush favourites bar (PRD-ED-144, SN-BRS), collapsible/resizable dock + QuickMenu + Touch Shortcut (PRD-ED-146/147/148, [SN-ED-025](editor.md#sn-ed-025)), the top toolbar ([SN-ED-006](editor.md#sn-ed-006)), the tool state machine itself ([SN-ED-002](editor.md#sn-ed-002)).

#### Acceptance criteria
- [ ] Dragging the 6-dot grip moves the whole dock; four edge drop-zones light up during drag and the nearest edge is highlighted (`dockHint`) and snapped on release (screens 7.3).
- [ ] `dock=bottom|top` renders a centred horizontal row; `dock=left|right` renders a vertical column; layout matches the mockup at each edge.
- [ ] The chosen dock persists per profile locally and is restored on reopen; changing Settings > Toolbar position moves the dock without a drag (PRD-ED-142).
- [ ] The seven tool buttons are 44x44, labelled, and show active state as `--ac`/`--aci` (not colour-only) in all 17 looks + dark.
- [ ] Drop zones are announced to AT; the dock is keyboard-navigable and the Settings segmented control is the documented non-drag alternative (WCAG 2.5.7).
- [ ] On compact width the dock defaults to a bottom row and stays drag-dockable ([SN-ED-030](editor.md#sn-ed-030)).

#### Technical notes
Files under `app/lib/features/editor/dock/` using `SaneToolPalette`, `SaneToolButton` from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003); component-inventory section 5). Dock position stored via the profile-prefs provider (`app/providers/`, ADR-0003), mirrored to Settings > Handwriting & stylus (screens section 12; SN-SET). Reads tool state from [SN-ED-002](editor.md#sn-ed-002). Implements PRD-ED-142; the dock container tokens per component-inventory section 5.

#### Security & privacy
None beyond baseline: dock position is a per-profile UI preference (not note content), stored locally, never logged with content, never synced as content. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: Editor palette dock (design/Sane Notes.dc.html Editor; screens section 7.3; `SaneToolPalette`). Container radius/shadow/border come from tokens so it restyles across all 17 looks; the grip is 6 dots; drop-zone guides light on drag (motion respects Reduce Motion, ux-principles section 6). A11y: 44 pt/48 dp tool targets, labelled toggles, Settings segmented control as the non-drag path.

#### Test plan
`app/test/features/editor/dock/tool_palette_test.dart` (drag to each edge, snap, layout per edge, persistence, Settings-driven move), golden of the dock at all four edges per look family, and an a11y test asserting labels + non-drag alternative.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool state), [SN-DS-003](design-system.md#sn-ds-003) (SaneToolPalette/SaneToolButton components).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-006

<a id="sn-ed-006"></a>

**Implement the editor top toolbar and title block**

| Field | Value |
|---|---|
| GitHub | #238 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-003](editor.md#sn-ed-003), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
The top toolbar is the editor's command surface above the canvas (hidden in focus mode), and it is where the user reaches undo/redo, bookmark, audio, import, templates, share, the page-rail toggle and focus mode (screens section 7.1). It carries a left group (sidebar toggle, back to library, title block '<notebook> - page X of Y[ - PDF name]') and a right group of icon actions. This issue builds `SaneEditorToolbar` and `SaneTitleBlock`, wires the undo/redo buttons to the undo controller ([SN-ED-003](editor.md#sn-ed-003)) with the 0.35-opacity dim-when-empty rule, the bookmark toggle with its toasts, and the buttons that open other surfaces (audio bar SN-AUD, Import PDF overlay SN-PDF, Paper and templates overlay SN-TPL, Share overlay SN-SHR, focus mode [SN-ED-018](editor.md#sn-ed-018), page rail [SN-ED-015](editor.md#sn-ed-015)). Buttons that open surfaces owned by other areas dispatch to those surfaces; this issue owns the toolbar chrome, layout, states and wiring only.

#### Scope
**In:** `SaneEditorToolbar` left/right groups and `SaneTitleBlock`; sidebar-toggle and back-to-library actions; Undo/Redo buttons bound to [SN-ED-003](editor.md#sn-ed-003) (dim to 0.35 when the stack is empty); the Bookmark toggle (fills when set) with 'Page bookmarked'/'Bookmark removed' toasts (PRD-ED-017); the Audio button (tinted while open, red glyph while recording) opening the SN-AUD bar; Import PDF, Paper and templates, Share, Pages (wide only) and Focus buttons dispatching to their surfaces; hide in focus mode ([SN-ED-018](editor.md#sn-ed-018)).
**Out:** the audio recorder bar internals (SN-AUD), Import/Templates/Share overlays (SN-PDF/SN-TPL/SN-SHR), undo model ([SN-ED-003](editor.md#sn-ed-003)), page rail ([SN-ED-015](editor.md#sn-ed-015)), focus behaviour ([SN-ED-018](editor.md#sn-ed-018)), keyboard equivalents ([SN-ED-022](editor.md#sn-ed-022)).

#### Acceptance criteria
- [ ] The toolbar shows the left group (sidebar toggle, back, title block) and right group (undo, redo, bookmark, audio, import, templates, share, pages, focus) per screens section 7.1.
- [ ] Undo/Redo dim to 0.35 opacity when their stack is empty and enable when it is not ([SN-ED-003](editor.md#sn-ed-003) canUndo/canRedo).
- [ ] The title block reads '<notebook> - page X of Y' and appends ' - <PDF name>' on PDF pages (screens 7.1).
- [ ] Bookmark toggles fill state and toasts 'Page bookmarked'/'Bookmark removed'; state exposes pressed/unpressed and is not colour-only (PRD-ED-017).
- [ ] The Audio button is tinted while the bar is open and shows a red glyph while recording (screens 7.1); Pages button is present only on wide widths.
- [ ] The toolbar is hidden in focus mode and every action is keyboard-reachable and labelled.

#### Technical notes
Files under `app/lib/features/editor/toolbar/` using `SaneEditorToolbar`, `SaneTitleBlock`, `SaneButton`(icon) from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003); component-inventory section 5). Buttons dispatch via `app/providers/` to the audio (SN-AUD-001), import (SN-PDF-001), templates (SN-TPL-001), share (SN-SHR-001) surfaces; wide/narrow from the layout provider ([SN-ED-030](editor.md#sn-ed-030)). Reads [SN-ED-002](editor.md#sn-ed-002) and [SN-ED-003](editor.md#sn-ed-003). Implements screens section 7.1, PRD-ED-017.

#### Security & privacy
None beyond baseline: the toolbar carries no note content; the title block shows only the notebook title (already on-device). Nothing is logged. Share/import buttons only open surfaces; the actual egress rules live in those areas. IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-1.

#### UX notes
Surface: design/Sane Notes.dc.html Editor top toolbar (screens section 7.1; `SaneEditorToolbar`). Chrome buttons are 42 high and restyle in all 17 looks + dark; the toolbar hides entirely in focus mode ([SN-ED-018](editor.md#sn-ed-018)). A11y: 44 pt/48 dp targets, each icon button labelled, dim state exposed as disabled, bookmark pressed state announced.

#### Test plan
`app/test/features/editor/toolbar/editor_toolbar_test.dart` (button set, undo/redo dim binding, title block PDF suffix, bookmark toast + pressed state, audio tint/recording glyph, Pages hidden when narrow, hidden in focus), plus a golden per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool/page state), [SN-ED-003](editor.md#sn-ed-003) (undo dim state), [SN-DS-003](design-system.md#sn-ds-003) (toolbar components).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-007

<a id="sn-ed-007"></a>

**Implement the colour and width sub-pickers in the dock**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor, theming |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-005](editor.md#sn-ed-005) |
| Depends on | [SN-ED-005](editor.md#sn-ed-005), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
The dock exposes the ink/highlighter swatch row and the three-width picker, context-switching to the HL palette when the highlighter is active (screens section 7.3; PRD-ED-143). The pen picker shows the 6-swatch INK palette (near-black, blue, red, green, purple, orange) with a double-ring on the selected swatch; in dark mode the same indices map to the lighter DARK_INK set as a display mapping, not a re-authoring (PRD-ED-036/037). When the highlighter is active the picker switches to the 4-swatch HL palette rendered semantically (PRD-ED-038). The width picker shows three dots for WIDTHS = [1.6, 2.6, 4.4] page-units (~5/9/13 px at 100%); selecting a width while on the highlighter switches back to pen, and picking an ink colour on a non-pen tool snaps back to pen (PRD-ED-042; screens 7.3). This task wires `SaneColorRow` and `SaneWidthRow` to the tool state machine.

#### Scope
**In:** the `SaneColorRow` (INK 6 / HL 4) and `SaneWidthRow` (S/M/L) in the dock; context switch to the HL palette when `tool=hl`; double-ring selected state; reading INK/DARK_INK/HL from tokens ([SN-DS-002](design-system.md#sn-ds-002)); the snap-back-to-pen transitions on colour/width pick (delegated to [SN-ED-002](editor.md#sn-ed-002)); the active colour-name announcement on change.
**Out:** the full custom colour picker (disc/hex/recent), eyedropper, per-notebook palettes, opacity slider (PRD-ED-039/040/041/044, SN-BRS), the brush favourites bar (PRD-ED-144), dark-mode ink inversion rendering (SN-INK-030), the dock container itself ([SN-ED-005](editor.md#sn-ed-005)).

#### Acceptance criteria
- [ ] The INK row shows the 6 documented swatches; the selected swatch shows a double ring; the active colour name is announced on change (PRD-ED-036 A11y).
- [ ] When `tool=hl` the picker switches to the 4 HL swatches; HL swatches do not dark-invert (PRD-ED-038).
- [ ] In dark mode the INK indices render via DARK_INK (display mapping), while the stored index is unchanged (PRD-ED-037).
- [ ] The width row shows three dots rendering ~5/9/13 px at 100% for WIDTHS=[1.6,2.6,4.4]; each is labelled Thin/Medium/Thick (PRD-ED-042).
- [ ] Picking an ink colour on eraser/lasso/image, or a width on the highlighter, snaps `tool` back to pen ([SN-ED-002](editor.md#sn-ed-002) transitions).
- [ ] Swatches and width dots are keyboard-navigable with a selected state that is not colour-only (ring/label).

#### Technical notes
Files under `app/lib/features/editor/dock/color_width_row.dart` using `SaneColorRow`, `SaneWidthRow`, `SaneSwatch`, `SaneWidthDot` from `sane_ui` (component-inventory section 5). Read `ink.INK`/`ink.DARK_INK`/`hl` and `widths` from tokens via [SN-DS-002](design-system.md#sn-ds-002); never hard-code a colour (CLAUDE.md section 9). Snap-back transitions are owned by [SN-ED-002](editor.md#sn-ed-002); this task drives them. Implements PRD-ED-036/037/038/042/143.

#### Security & privacy
None beyond baseline: the active colour/width is a per-stroke authoring choice (note content once committed) held locally; no logging of content. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: dock colour/width rows (screens section 7.3; `SaneColorRow`/`SaneWidthRow`). Swatches expose colour names (accessible Color Cards, PRD-ED-036 A11y) and render correctly in all 17 looks + dark. A11y: named swatches, labelled width dots (Thin/Medium/Thick), selected state as ring not colour-only, keyboard-navigable.

#### Test plan
`app/test/features/editor/dock/color_width_row_test.dart` (INK/HL swatch sets, HL context switch, dark-mode index mapping, double-ring selected, width labels, snap-back transitions, colour-name announcement), plus a golden per look for both palettes.

#### Dependencies
[SN-ED-005](editor.md#sn-ed-005) (dock container hosting the rows), [SN-DS-002](design-system.md#sn-ds-002) (token ThemeExtension for INK/DARK_INK/HL/widths).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-008

<a id="sn-ed-008"></a>

**Bind two-finger undo and three-finger redo gestures**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | editor, input-gestures, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-003](editor.md#sn-ed-003) |
| Depends on | [SN-ED-003](editor.md#sn-ed-003), [SN-ED-026](editor.md#sn-ed-026) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Two-finger tap = undo and three-finger tap = redo are the de-facto standard across Procreate, Concepts, Linea and Fresco, so users arrive already trained (PRD-ED-129; gestures-and-shortcuts section 1). Two-finger tap-and-hold is a rapid-repeat undo. This task binds those gestures to the undo controller ([SN-ED-003](editor.md#sn-ed-003)), disambiguating a two-finger tap (down+up, minimal movement) from a two-finger drag (pan) by a movement + time threshold (gestures-and-shortcuts section 7), and it makes the finger count configurable for motor accessibility (PRD-ED-129 A11y). The gestures are additive: the toolbar buttons ([SN-ED-006](editor.md#sn-ed-006)) and keyboard shortcuts ([SN-ED-022](editor.md#sn-ed-022)) remain the primary path so nothing is gesture-only (WCAG 2.5.1). Multi-finger gesture recognition and precedence live in [SN-ED-026](editor.md#sn-ed-026); this task consumes that recogniser and maps the tap counts to undo/redo.

#### Scope
**In:** mapping a two-finger tap to undo and a three-finger tap to redo via the [SN-ED-026](editor.md#sn-ed-026) recogniser; two-finger tap-and-hold rapid-repeat undo; the tap-vs-drag disambiguation threshold; a Settings-backed finger-count option (per-profile) for accessibility; a brief undo/redo confirmation announcement to AT.
**Out:** the multi-finger recogniser and precedence resolution ([SN-ED-026](editor.md#sn-ed-026)), the undo model ([SN-ED-003](editor.md#sn-ed-003)), keyboard shortcuts ([SN-ED-022](editor.md#sn-ed-022)), toolbar buttons ([SN-ED-006](editor.md#sn-ed-006)), the scrubbable history timeline (PRD-ED-130).

#### Acceptance criteria
- [ ] A two-finger tap triggers undo and a three-finger tap triggers redo (PRD-ED-129/168).
- [ ] A two-finger tap (minimal movement, short time) is distinguished from a two-finger drag (pan) by threshold; a drag never fires undo (gestures-and-shortcuts section 7).
- [ ] Two-finger tap-and-hold repeats undo at a steady rate until release.
- [ ] The finger count is configurable per profile for motor accessibility; the default is 2/3 (PRD-ED-129 A11y).
- [ ] Undo/redo via gesture is announced to AT and never the only path (buttons + shortcuts remain).
- [ ] Gestures are disabled inside a focused text box so multi-finger selection is not hijacked.

#### Technical notes
Files under `app/lib/features/editor/gestures/undo_redo_gesture.dart`. Consumes the multi-finger recogniser from [SN-ED-026](editor.md#sn-ed-026) (which owns precedence over single-pointer ink, gestures-and-shortcuts section 7). Calls [SN-ED-003](editor.md#sn-ed-003) undo()/redo(). Finger-count preference via the profile-prefs provider (SN-SET). Implements PRD-ED-129/168; matches gestures-and-shortcuts section 1 grammar.

#### Security & privacy
None beyond baseline: gesture handling touches no note content beyond invoking undo/redo; nothing is logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor canvas gestures (gestures-and-shortcuts section 1). No visible chrome; the effect is instant undo/redo. A11y: THIS composes with WCAG 2.5.1 - the gesture is additive to the Undo/Redo buttons and Cmd/Ctrl-Z; the finger count is remappable for users who cannot do three-finger taps (PRD-ED-129 A11y).

#### Test plan
`app/test/features/editor/gestures/undo_redo_gesture_test.dart` (two-finger tap undo, three-finger tap redo, tap-vs-drag threshold, hold-repeat, configurable count, suppressed in text edit), integrating the recogniser from [SN-ED-026](editor.md#sn-ed-026).

#### Dependencies
[SN-ED-003](editor.md#sn-ed-003) (undo/redo controller), [SN-ED-026](editor.md#sn-ed-026) (multi-finger recogniser + precedence).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-009

<a id="sn-ed-009"></a>

**Implement the eraser tool UI and erase-target filter**

| Field | Value |
|---|---|
| GitHub | #239 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-003](editor.md#sn-ed-003), [SN-INK-001](ink.md#sn-ink-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
The eraser removes any whole stroke it touches, with a hit-test radius proportional to width and a 'cell' cursor, capturing its undo snapshot on pointer-down (screens section 7 tool table; PRD-ED-071). This issue builds the eraser tool UI and behaviour in the editor: size selection, the 'cell' cursor, the erase count announcement, auto-deselect after erase (PRD-ED-078), and the erase-target filter (This layer only / Ink only / Highlights only / All), defaulting to the current layer while sparing highlights so cleaning ink does not wipe highlights (PRD-ED-074). Hit-testing is `sane_ink`'s (SN-INK-025); erase is a CRDT tombstone recoverable via Undo until convergence (PRD-ED-071 Sec). The pixel/area eraser and scribble-to-erase are later M3 refinements referenced but out of scope here.

#### Scope
**In:** the eraser tool UI (size control, 'cell' cursor); whole-stroke erase via `sane_ink` hit-testing with radius proportional to width; undo snapshot on pointer-down (single step per gesture, [SN-ED-003](editor.md#sn-ed-003)); 'erased N strokes' announcement; auto-deselect + restore-prior-tool on erase complete (PRD-ED-078); the erase-target filter menu (This layer / Ink only / Highlights only / All) with the default that spares highlights (PRD-ED-074).
**Out:** hit-test geometry (SN-INK-025), pixel/area partial eraser (PRD-ED-072, M3), lasso/area-scoped erase (PRD-ED-073), scribble-to-erase (PRD-ED-075, M3), zoom-scaled eraser (PRD-ED-076), double-tap-to-clear (PRD-ED-077), the eraser-end/barrel-button binding ([SN-ED-024](editor.md#sn-ed-024)/[SN-ED-025](editor.md#sn-ed-025)).

#### Acceptance criteria
- [ ] The eraser removes any whole stroke it touches with a hit radius proportional to the selected size; the cursor is 'cell' (screens 7; PRD-ED-071).
- [ ] One erase gesture is one undo step (snapshot on pointer-down); undo restores every stroke removed in that gesture ([SN-ED-003](editor.md#sn-ed-003)).
- [ ] Completing an erase clears any active selection and restores the prior tool per preference (PRD-ED-078).
- [ ] The erase-target filter offers This layer only / Ink only / Highlights only / All; the default spares highlights when erasing ink (PRD-ED-074).
- [ ] Erasing announces 'erased N strokes' to AT; the size control and target filter are labelled menus (not colour-only).
- [ ] Erased strokes are recoverable via Undo (CRDT tombstone until convergence, PRD-ED-071 Sec).

#### Technical notes
Files under `app/lib/features/editor/tools/eraser/`. Calls `sane_ink` stroke hit-testing (SN-INK-025 via [SN-INK-001](ink.md#sn-ink-001)); erase marks CRDT tombstones in `sane_core` (SN-CORE-003) rather than hard-deleting. Undo snapshot on pointer-down through [SN-ED-003](editor.md#sn-ed-003). The target filter is a labelled menu in the tool's secondary options (progressive disclosure, ux-principles section 3). Implements PRD-ED-071/074/078.

#### Security & privacy
Erase is a recoverable CRDT tombstone; content is purged from the blob store only after the retention window and sync convergence, never leaving residual plaintext (PRD-ED-016/071 Sec). Erased ids/coordinates are note content, never logged. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor eraser tool (screens section 7.3 tool table). The 'cell' cursor and size control read in all 17 looks + dark; the target filter is a labelled menu (component-inventory setting-row pattern). A11y: announce erased count, labelled size + target controls, works with larger radii for users without precise motor control (PRD-ED-072 A11y intent).

#### Test plan
`app/test/features/editor/tools/eraser_test.dart` (whole-stroke erase, radius-by-size, single undo step per gesture, auto-deselect + tool restore, target filter defaults sparing highlights, erased-count announcement), plus a golden of the eraser cursor per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool state), [SN-ED-003](editor.md#sn-ed-003) (undo snapshot), [SN-INK-001](ink.md#sn-ink-001) (hit-testing).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-010

<a id="sn-ed-010"></a>

**Implement lasso transform handles (move, resize, rotate)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-004](editor.md#sn-ed-004) |
| Depends on | [SN-ED-004](editor.md#sn-ed-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Once ink is selected, the user expects to move, resize and rotate it like any vector object - the payoff of editable ink (PRD-ED-080/081/082). Dragging the selection translates it with a live preview and a commit-to-undo; corner/edge handles scale it (Shift = uniform, vector strokes rescale without quality loss, widths scale proportionally unless 'keep line weight' is set); a rotation handle rotates it with 15-degree magnetic detents and a haptic tick (PRD-ED-082). This task builds the transform overlay and the three interactions on top of the selection model ([SN-ED-004](editor.md#sn-ed-004)), with keyboard/numeric non-gesture alternatives required by WCAG 2.5.7: arrow-key nudge (Shift = 10 units), numeric size entry, and numeric angle entry.

#### Scope
**In:** the transform overlay (bounding box + corner/edge handles + rotation handle) over a selection; move by drag with live preview; resize with corner/edge handles, Shift for uniform, a 'keep line weight' toggle; rotate with 15-degree magnetic detents + haptic tick; commit each transform as one undo step ([SN-ED-003](editor.md#sn-ed-003)); arrow-key nudge (1 unit, Shift=10); numeric size and angle entry (PRD-ED-080/081/082 A11y).
**Out:** the selection primitive itself ([SN-ED-004](editor.md#sn-ed-004)), recolour/restyle/convert/group and the selection bar ([SN-ED-011](editor.md#sn-ed-011)), copy/paste ([SN-ED-012](editor.md#sn-ed-012)), cross-page move (PRD-ED-090), re-edit stroke geometry (nudge/slice, PRD-ED-088), haptic engine plumbing (SN-INK/SN-PHN provide the feedback generator).

#### Acceptance criteria
- [ ] Dragging the selection translates it with a live preview; release commits one undo step (PRD-ED-080).
- [ ] Corner/edge handles scale the selection; Shift constrains to uniform; vector strokes rescale crisply and widths scale proportionally unless 'keep line weight' is on (PRD-ED-081).
- [ ] The rotation handle rotates the selection with 15-degree magnetic detents and a haptic tick where the device supports it (PRD-ED-082).
- [ ] Arrow keys nudge the selection by 1 unit (Shift = 10); numeric size and angle entry set exact values (WCAG 2.5.7 non-gesture alternatives).
- [ ] Each transform is a single undoable step and announces the result to AT (e.g. 'moved', 'resized to N%', 'rotated to D degrees').
- [ ] Object ids are preserved through transforms so a transform is a clean CRDT merge (PRD-ED-090 groundwork).

#### Technical notes
Files under `app/lib/features/editor/selection/transform/`. Operates on `SelectionState` from [SN-ED-004](editor.md#sn-ed-004); mutates `sane_core` object transforms (SN-CORE-002) preserving ids. Handles overlay painted above ink in the layer stack. Haptic via the platform feedback generator (Apple UICanvasFeedbackGenerator / Android haptics, PRD-ED-102). Commit through [SN-ED-003](editor.md#sn-ed-003). Implements PRD-ED-080/081/082.

#### Security & privacy
Transforms mutate note content locally; coordinates/ids never logged, changes flow through the CRDT op-log for E2E-encrypted sync (decision 3). Selection/transform state is session-local. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor selection transform overlay (screens section 7.3-7.4; `SaneSelectionRect`). Handles and detent guides read in all 17 looks + dark; the haptic is an additional non-visual confirm, never the only signal (PRD-ED-102 A11y), and respects the system haptics-off setting. A11y: numeric size/angle entry and arrow-nudge are labelled non-gesture alternatives; results announced.

#### Test plan
`app/test/features/editor/selection/transform_test.dart` (move preview + single undo, resize uniform/proportional-width/keep-line-weight, rotate detents, arrow nudge + Shift step, numeric size/angle, id preservation), plus a golden of the transform overlay per look.

#### Dependencies
[SN-ED-004](editor.md#sn-ed-004) (selection model + overlay).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-011

<a id="sn-ed-011"></a>

**Implement the selection action bar (recolour, restyle, convert, group)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-004](editor.md#sn-ed-004) |
| Depends on | [SN-ED-004](editor.md#sn-ed-004), [SN-ED-003](editor.md#sn-ed-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
With a lasso selection active, the design shows a selection action bar - 'N stroke(s) selected' plus Convert to text (Pro), Delete and Solve math (Pro) (screens section 7.4). Beyond those, the PRD requires post-hoc editing that competitors lack: recolour a whole highlighted passage at once (PRD-ED-083), restyle width or even pen type of selected strokes (PRD-ED-084), group/ungroup a selection into one movable object (PRD-ED-185), and route the Pro-gated Convert to text / Solve math / Recognise-to-shape to the on-device recognition engine (SN-HWR) with a correction affordance rather than a canned string (PRD-ED-086/087/112). This task builds `SaneSelectionBar` and wires recolour, restyle, group/ungroup and delete directly, and dispatches the recognition actions to SN-HWR with the Free->Upgrade gate. Convert/Solve for Free users open the Upgrade overlay (SN-BILL); the actual recognition engine and math solver live in SN-HWR/SN-AI.

#### Scope
**In:** `SaneSelectionBar` showing the selection count and actions; recolour selected strokes of the matching kind by picking an INK/HL colour (PRD-ED-083); restyle width and pen type of the selection (PRD-ED-084); group/ungroup into a nested movable object persisted in `.sanenote` (PRD-ED-185); Delete with 'Deleted N stroke(s)' toast; dispatch Convert to text / Solve math / Recognise-to-shape to SN-HWR, routing Free users to the Upgrade overlay (screens 7.4); each action a single undo step ([SN-ED-003](editor.md#sn-ed-003)).
**Out:** the recognition/solve engine and correction UI internals (SN-HWR-001, SN-AI-001), the colour picker itself ([SN-ED-007](editor.md#sn-ed-007)), transform handles ([SN-ED-010](editor.md#sn-ed-010)), clipboard ops ([SN-ED-012](editor.md#sn-ed-012)), billing/entitlement checks (SN-BILL-001 provides the gate), handwriting refine/reflow (PRD-ED-187, SN-HWR).

#### Acceptance criteria
- [ ] The bar shows 'N stroke(s) selected' plus Convert to text (Pro), Delete, Solve math (Pro) and the recolour/restyle/group actions (screens 7.4; PRD-ED-083/084/185).
- [ ] Picking an INK/HL colour with a selection recolours all selected strokes of the matching kind and announces 'recoloured N strokes to <name>' (PRD-ED-083).
- [ ] Restyle changes width and pen type of selected strokes after the fact (PRD-ED-084); group/ungroup produces/dissolves a nested object that persists (PRD-ED-185).
- [ ] Delete removes the selection and toasts 'Deleted N stroke(s)'; each action is one undo step ([SN-ED-003](editor.md#sn-ed-003)).
- [ ] Convert to text and Solve math on Free open the Upgrade overlay; on Pro they dispatch to SN-HWR/SN-AI (no canned string; correction affordance owned there) (screens 7.4; PRD-ED-086).
- [ ] Every action is a labelled control (not gesture-only) and the group exposes a labelled container to AT (PRD-ED-185 A11y).

#### Technical notes
Files under `app/lib/features/editor/selection/action_bar/` using `SaneSelectionBar` (component-inventory section 5). Recolour/restyle/group mutate `sane_core` objects (SN-CORE-002) preserving ids; commit via [SN-ED-003](editor.md#sn-ed-003). Recognition actions dispatch through `app/providers/` to SN-HWR-001 (Convert/Recognise) and SN-AI-001 (Solve math); the Free gate reads entitlements (SN-BILL-001) and opens the Upgrade overlay. Implements PRD-ED-083/084/086/087/185 and screens section 7.4.

#### Security & privacy
Recognition runs on-device by default (screens section 12 on-device recognition on); any cloud assist is per-request opt-in with the data-leaves-device indicator (decision 6) and is owned by SN-HWR/SN-AI, not here. Original ink is kept recoverable via Undo after conversion (PRD-ED-086 A11y). Selected content stays on-device, never logged. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor selection bar (screens section 7.4; `SaneSelectionBar`). Pro actions are visible but honest - they route to Upgrade, never a dead end (ux-principles section 3). Bar restyles in all 17 looks + dark. A11y: labelled actions; recolour announces the colour name; grouped selection is a labelled container; Convert to text makes ink screen-reader-readable (PRD-ED-086 A11y).

#### Test plan
`app/test/features/editor/selection/action_bar_test.dart` (count label, recolour by kind, restyle width/pen, group/ungroup persistence, delete toast, single undo per action, Free->Upgrade routing, Pro dispatch to SN-HWR), plus a golden per look.

#### Dependencies
[SN-ED-004](editor.md#sn-ed-004) (selection model), [SN-ED-003](editor.md#sn-ed-003) (undo). Coordinates with SN-HWR-001, SN-AI-001, SN-BILL-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-012

<a id="sn-ed-012"></a>

**Implement copy, cut, paste and duplicate for a selection**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-004](editor.md#sn-ed-004) |
| Depends on | [SN-ED-004](editor.md#sn-ed-004), [SN-ED-003](editor.md#sn-ed-003) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `OWASP-A03`, `CWE-79` |
| Extra labels | agent-ready |

#### Context
Standard clipboard operations on a selection - copy, cut, paste, duplicate - are table stakes, and paste places at the pointer or at an offset (PRD-ED-085). This is also a security boundary: when copying to the system clipboard the content must be sanitised and platform privacy honoured (no silent background reads; on web a paste requires a user gesture per the Clipboard API), and any external HTML/SVG pasted in must be sanitised to strip scripts and external references (PRD-ED-085 Sec). This task wires the internal object clipboard (fast path for same-app copy/paste preserving vector objects), the system-clipboard bridge for cross-app copy of a transparent PNG where supported, and the sanitised inbound paste path. Cmd/Ctrl-C/X/V and duplicate come from [SN-ED-022](editor.md#sn-ed-022); the actions themselves live here.

#### Scope
**In:** copy/cut/paste/duplicate of a selection via an internal object clipboard preserving ids-as-new-on-paste (CRDT add-wins); paste at pointer or offset; cross-app copy-out of the selection as a transparent PNG where the platform supports it (PRD-ED-085); a sanitised inbound paste path for external HTML/SVG (strip scripts + external refs, safe subset only); the system-clipboard bridge honouring the web user-gesture rule; each op a single undo step ([SN-ED-003](editor.md#sn-ed-003)).
**Out:** keyboard binding of the shortcuts ([SN-ED-022](editor.md#sn-ed-022)), paste-image-from-clipboard for photos (PRD-ED-119, [SN-ED-014](editor.md#sn-ed-014)), cross-page/notebook move ([SN-ED-029](editor.md#sn-ed-029), PRD-ED-090), canvas clips/snippet clipboard (PRD-ED-118), the selection model ([SN-ED-004](editor.md#sn-ed-004)).

#### Acceptance criteria
- [ ] Copy/cut/paste/duplicate operate on the current selection; paste places at the pointer (or an offset when pasted in place); each is one undo step (PRD-ED-085; [SN-ED-003](editor.md#sn-ed-003)).
- [ ] Pasted internal objects get new ids (CRDT add-wins) so paste is a clean merge on sync (decision 4).
- [ ] Copying to the system clipboard sanitises content and requires a user gesture on web (Clipboard API); no silent background clipboard read occurs (PRD-ED-085 Sec).
- [ ] Inbound external HTML/SVG paste is sanitised: scripts removed, external references stripped, only a safe subset kept (CWE-79 abuse test with a script-bearing SVG fails closed).
- [ ] Cross-app drag-out/copy exports the selection as a transparent PNG where supported; degrades cleanly where not.
- [ ] All four actions are keyboard-reachable ([SN-ED-022](editor.md#sn-ed-022)) and announced to AT.

#### Technical notes
Files under `app/lib/features/editor/selection/clipboard/`. Internal clipboard holds `sane_core` object snapshots; paste regenerates ids (SN-CORE-003 add-wins). System-clipboard access via the platform clipboard plugin; on web use the async Clipboard API with the required user gesture (research/web-stylus-and-pwa-capabilities section 6). Sanitise inbound HTML/SVG through an allow-list (no <script>, no external url()/href, no data: executables). Commit via [SN-ED-003](editor.md#sn-ed-003). Implements PRD-ED-085.

#### Security & privacy
The system clipboard is a trust boundary: sanitise outbound content, never read it silently, require a user gesture on web; treat inbound HTML/SVG as hostile and strip scripts/external refs (CWE-79). Note content on the internal clipboard stays on-device. IDs: MASVS-PLATFORM-3, MASVS-PRIVACY-1, OWASP-A03, CWE-79.

#### UX notes
Surface: Editor selection (screens section 7.4). No dedicated chrome beyond context-menu ([SN-ED-023](editor.md#sn-ed-023)) and shortcut entries; paste shows the pasted objects selected for immediate transform. A11y: Cmd/Ctrl-C/X/V and duplicate labelled; actions announced ('copied N', 'pasted N'); works in all 17 looks (no visual specifics beyond selection overlay).

#### Test plan
`app/test/features/editor/selection/clipboard_test.dart` (copy/cut/paste/duplicate, new-ids-on-paste, single undo per op, paste-at-pointer vs offset), and `clipboard_sanitise_test.dart` (script-bearing SVG stripped, external ref removed, web user-gesture required) as the abuse/regression tests.

#### Dependencies
[SN-ED-004](editor.md#sn-ed-004) (selection model), [SN-ED-003](editor.md#sn-ed-003) (undo).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans incl. sanitise abuse test)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-013

<a id="sn-ed-013"></a>

**Implement the text tool UI and inline text-edit bar**

| Field | Value |
|---|---|
| GitHub | #240 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, text |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-TXT-001](text.md#sn-txt-001) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `CWE-79` |
| Extra labels | agent-ready |

#### Context
Typed text is a first-class object alongside ink: tapping with the Text tool drops a text box and enters inline edit, showing the text-edit bar, and empty boxes are discarded on Done with the tool snapping back to pen (screens section 7.5; PRD-ED-103). A critical platform caveat: Flutter-Web painted text needs a real editable input path for IME, Scribble, selection and accessibility, so the text layer MUST use a native editable field on web, not a painted-only field (PRD-ED-103 A11y; ux-principles section 8). This issue builds the editor-side text tool: the tap-to-drop interaction, `SaneTextEditBar`, box placement/move/resize as an object, and the wiring to the rich-text engine (SN-TXT) for formatting, markdown-on-type, lists and checkboxes. The rich-text CRDT model, formatting engine and markdown parsing live in SN-TXT; this issue owns the tool UX, the edit bar and the box object placement.

#### Scope
**In:** the Text tool tap-to-drop + inline edit entry; `SaneTextEditBar` ('Type your text...' + Done); discard-empty-on-Done and snap-to-pen; the text box as a movable/resizable object (position/size/z-order via [SN-ED-010](editor.md#sn-ed-010)); a real native editable input path (contenteditable/DOM overlay on web, native field on mobile) rather than painted-only; suppressing single-key tool shortcuts while a text box is focused ([SN-ED-022](editor.md#sn-ed-022) coordination); wiring formatting/markdown/lists/checkboxes actions to SN-TXT.
**Out:** the rich-text engine, sequence-CRDT, markdown-on-type parsing, quote/callout/code blocks, tables, fonts, links (PRD-ED-104..109, PRD-ED-179..183, SN-TXT-001), Scribble/handwriting-into-fields (PRD-ED-110, SN-HWR), math typesetting (PRD-ED-112), image tool ([SN-ED-014](editor.md#sn-ed-014)).

#### Acceptance criteria
- [ ] Tapping with the Text tool drops a text box and enters inline edit with the text-edit bar shown (screens 7.5).
- [ ] An empty box is discarded on Done and the tool snaps back to pen (PRD-ED-103).
- [ ] The text box is movable and resizable like any object and keeps an editable z-order (PRD-ED-111 groundwork).
- [ ] On web the field is a real editable DOM input (IME/selection/a11y work), never painted-only; on mobile it uses the native field (PRD-ED-103 A11y).
- [ ] Single-key tool shortcuts (P/H/E/...) type characters while a text box is focused, not switch tools; Esc returns focus to the canvas (gestures-and-shortcuts section 7).
- [ ] The text tool and edit bar are labelled for screen readers and support dictation/IME.

#### Technical notes
Files under `app/lib/features/editor/tools/text/` using `SaneTextEditBar` (component-inventory section 5). The box is a `sane_core` Text object (SN-CORE-002); formatting/markdown/lists route to `sane_text` (SN-TXT-001). On web use an overlaid HTML input via platform view; never Flutter painted text (research/web-stylus-and-pwa-capabilities Flutter-vs-React). Coordinate shortcut suppression with [SN-ED-022](editor.md#sn-ed-022). Implements PRD-ED-103; groundwork for PRD-ED-104..111.

#### Security & privacy
Typed text is note content: on-device, never logged. If any rich-text paste enters here, HTML is sanitised (no scripts/external refs, CWE-79) - shared with [SN-ED-012](editor.md#sn-ed-012). Native input paths keep IME on-device. IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-1, CWE-79.

#### UX notes
Surface: Editor text tool + `SaneTextEditBar` (screens section 7.5). The bar restyles in all 17 looks + dark; placeholder 'Type your text...'. A11y: native editable field gives IME/dictation/Scribble/selection and screen-reader editing for free on native, and a real DOM field on web; text box exposes editable-text role; honour Dynamic Type minimum (PRD-ED-105 A11y).

#### Test plan
`app/test/features/editor/tools/text_tool_test.dart` (tap-to-drop, inline edit, discard-empty + snap-to-pen, move/resize box, shortcut suppression while editing, Esc returns focus), plus a web widget test asserting a real DOM input path and a golden per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool state + canvas), [SN-TXT-001](text.md#sn-txt-001) (rich-text engine + object model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-014

<a id="sn-ed-014"></a>

**Implement the image insertion UI (place, resize, crop)**

| Field | Value |
|---|---|
| GitHub | #241 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-MED-001](images-media.md#sn-med-001) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `MASVS-STORAGE-1`, `MASVS-CODE-4`, `CWE-359` |
| Extra labels | agent-ready |

#### Context
The design's Image tool currently routes to the PDF import overlay, but the PRD requires a distinct image flow with sizing, cropping and placement (screens Open Q10; PRD-ED-113). This issue builds the editor-side image insertion UX: inserting a photo/figure from Files/Photos/camera/paste as an Image object with position, scale, rotation and crop, rendered on the page beneath or above ink per z-order (PRD-ED-113). Privacy is load-bearing: location/EXIF metadata is stripped by default with an opt-in to keep it, images are stored as content-addressed encrypted blobs, and camera/Photos access is user-initiated and permission-gated - all owned by the `sane_pdf`/media pipeline (SN-MED) which this issue calls. Alt-text prompting/generation for inserted images (on-device where available) makes them screen-reader-describable (PRD-ED-113 A11y). This issue owns the placement/resize/crop UI and the insertion flow; decode/EXIF/blob storage live in SN-MED.

#### Scope
**In:** the Image tool insertion flow (Files/Photos/camera/paste) producing an Image object; on-page placement with move/resize/rotate ([SN-ED-010](editor.md#sn-ed-010)) and non-destructive rectangular + freeform crop (PRD-ED-114); z-order relative to ink; paste-image-from-clipboard (PRD-ED-119, user-gesture on web); an alt-text prompt/generate affordance on insert (PRD-ED-113 A11y); routing the actual decode/EXIF-strip/blob-store to SN-MED.
**Out:** image decode, EXIF/location stripping, content-addressed encrypted blob storage, camera scan + OCR pipeline (PRD-ED-120), stickers/elements libraries (PRD-ED-116/117), multi-image collage (PRD-ED-115) - all SN-MED-001; the PDF import overlay (SN-PDF-001); transform handles ([SN-ED-010](editor.md#sn-ed-010)).

#### Acceptance criteria
- [ ] The Image tool opens a distinct image flow (not the PDF overlay) and inserts an Image object with position/scale/rotation/crop (PRD-ED-113; screens Open Q10 resolved).
- [ ] Inserted images can be moved, resized, rotated ([SN-ED-010](editor.md#sn-ed-010)) and cropped rectangularly and freeform, non-destructively (PRD-ED-114).
- [ ] Location/EXIF metadata is stripped by default via SN-MED with an explicit opt-in to keep it (verified by an insertion test asserting the stripped path is default, PRD-ED-113 Sec).
- [ ] Images render at the chosen z-order beneath or above ink; a large image is capped/downscaled before decode by SN-MED (no decompression bomb, CWE-400 handled there).
- [ ] On insert the user is prompted for alt text (or an on-device description is offered) so the image is described to screen readers (PRD-ED-113 A11y).
- [ ] Paste-from-clipboard inserts an image only on an explicit user gesture (web) and EXIF-strips it (PRD-ED-119).

#### Technical notes
Files under `app/lib/features/editor/tools/image/`. The Image object is a `sane_core` entity (SN-CORE-002); decode, EXIF strip and content-addressed encrypted blob storage are called from `sane_pdf`/media (SN-MED-001, ADR-0014). Placement uses the transform overlay ([SN-ED-010](editor.md#sn-ed-010)); crop is a non-destructive mask on the object. Clipboard image paste shares the user-gesture rule with [SN-ED-012](editor.md#sn-ed-012). Implements PRD-ED-113/114/119.

#### Security & privacy
Inserted images are untrusted input: SN-MED strips EXIF/location by default (opt-in to keep), caps size before decode, and stores content-addressed encrypted blobs (decision 3). Camera/Photos are user-initiated and permission-gated. Alt-text generation is on-device. IDs: MASVS-PRIVACY-2, MASVS-PRIVACY-4, MASVS-STORAGE-1, MASVS-CODE-4, CWE-359.

#### UX notes
Surface: Editor Image tool (screens section 7.3 tool table; Open Q10). Placement/crop handles read in all 17 looks + dark. A11y: alt-text prompt on insert so inserted images are described (PRD-ED-113 A11y); crop handles keyboard-operable with numeric entry (PRD-ED-114 A11y).

#### Test plan
`app/test/features/editor/tools/image_tool_test.dart` (distinct flow, insert object, move/resize/crop, z-order, EXIF-strip-by-default asserted via SN-MED fake, alt-text prompt, clipboard paste user-gesture), plus a golden of a placed+cropped image per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool state), [SN-MED-001](images-media.md#sn-med-001) (image decode/EXIF/blob pipeline). Uses [SN-ED-010](editor.md#sn-ed-010) for transform.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-015

<a id="sn-ed-015"></a>

**Implement the page rail with live thumbnails**

| Field | Value |
|---|---|
| GitHub | #242 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, android-tablet, web |
| Areas | editor, pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
When thumbnails are enabled and the window is wide and not in focus mode, a 132 px column of live page thumbnails renders - the current page ringed with the accent, bookmarked pages flagged - plus a dashed + Page button, toggled by the toolbar Pages button (screens section 7.7; PRD-ED-012). In left-handed mode the editor row is reversed so the rail sits on the left (PRD-ED-032). The rail is hidden for freeform notebooks (one growing surface, not paginated). This issue builds `SanePageThumb`, the rail column, the current/bookmarked flags, the wide/focus/freeform visibility rules, the left-handed placement, and thumbnails rendered on-device from local strokes. Add-page/bookmark/nav wiring is [SN-ED-016](editor.md#sn-ed-016); duplicate/delete/reorder is [SN-ED-017](editor.md#sn-ed-017); this issue owns the rail chrome and thumbnail rendering.

#### Scope
**In:** the 132 px thumbnail column with `SanePageThumb` (current-page accent ring, bookmarked flag); the dashed `SaneAddPageButton` host; live thumbnails rendered on-device from the page's local strokes (PDF notebooks show a faux typeset page); visibility gated by showThumbs AND wide AND not focus; hidden for freeform notebooks (PRD-ED-002/012); left-handed placement on the left via row-reverse (PRD-ED-032); the Pages toolbar toggle binding ([SN-ED-006](editor.md#sn-ed-006)).
**Out:** add-page/bookmark/page-nav actions ([SN-ED-016](editor.md#sn-ed-016)), duplicate/delete/reorder ([SN-ED-017](editor.md#sn-ed-017)), page-kind geometry + pan/zoom (SN-PG-001), thumbnail rasterisation engine internals (rendered via `sane_render`), the freeform minimap/overview (PRD-ED-019, SN-PG).

#### Acceptance criteria
- [ ] A 132 px thumbnail column renders when showThumbs AND wide AND not focus; the current page shows an accent ring and bookmarked pages show a flag (screens 7.7; PRD-ED-012).
- [ ] The rail is hidden for freeform notebooks and hidden in focus mode (PRD-ED-002/012).
- [ ] In left-handed mode the rail sits on the left (row-reverse) (PRD-ED-032).
- [ ] Each thumbnail is a labelled button ('Page X, bookmarked'), the rail is keyboard-navigable, and current/bookmarked state is not colour-only (ring + icon) (PRD-ED-012 A11y).
- [ ] Thumbnails render on-device from local strokes only; opening a 1,000-page notebook keeps the rail responsive via thumbnail virtualization (PRD-ED-174 budget).
- [ ] Tapping a thumbnail navigates to that page and rings it.

#### Technical notes
Files under `app/lib/features/editor/page_rail/` using `SanePageThumb`, `SaneAddPageButton` (component-inventory section 5). Thumbnails render via `sane_render` from `sane_core` pages (SN-CORE-002); virtualize off-screen thumbnails (render only visible +/- buffer). Wide/narrow and left-handed from the layout + profile-prefs providers ([SN-ED-030](editor.md#sn-ed-030); PRD-ED-032). Freeform detection from the page-kind model (SN-PG-003). Implements PRD-ED-012.

#### Security & privacy
Thumbnails are note content rendered on-device from local strokes only; never uploaded, never logged (PRD-ED-012 Sec). Rail state is session-local. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor page rail (screens section 7.7; `SanePageThumb`). The rail restyles in all 17 looks + dark; the current-page ring uses the accent, bookmarked pages get a flag icon (not colour-only). A11y: each thumbnail a labelled button, keyboard-navigable, current/bookmarked conveyed by ring + icon; hidden in focus mode.

#### Test plan
`app/test/features/editor/page_rail/page_rail_test.dart` (visibility gates wide/focus/freeform, current ring, bookmarked flag, left-handed placement, thumbnail button labels, navigate-on-tap, virtualization for large notebooks), plus a golden of the rail per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (editor state), [SN-CORE-002](storage.md#sn-core-002) (page entities to thumbnail).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-016

<a id="sn-ed-016"></a>

**Wire add-page, bookmark and in-dock page navigation**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor, pages-canvas |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-015](editor.md#sn-ed-015) |
| Depends on | [SN-ED-015](editor.md#sn-ed-015), [SN-ED-006](editor.md#sn-ed-006) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
The most basic page operations - add a page, bookmark the current page, and step through pages - are M1 MVP and appear in both the rail and the dock (screens section 7.3, 7.7). The dashed + Page button clones the current page's paper template, tint and size into a new page inserted after the current one and navigates to it (PRD-ED-013). The in-dock page nav is a '< X / N >' control that steps pages clamped to [1, N] (PRD-ED-010/145), and a numeric 'go to page...' jump plus jump-to-bookmark are available. Bookmark is a toolbar toggle handled in [SN-ED-006](editor.md#sn-ed-006); this task provides the add-page, page-nav and jump logic that both the rail and dock call, and keeps them consistent with the CRDT page model.

#### Scope
**In:** add-page cloning paper/tint/size into a new page after the current and navigating to it (PRD-ED-013); the in-dock `SanePageNav` '< X / N >' stepper clamped to [1, N] (PRD-ED-010/145); a numeric 'go to page...' jump and jump-to-bookmark; swipe-across-page-edge navigation on paged notebooks when not mid-stroke; the shared page-index provider the rail, dock and toolbar read; 'Added page X of N' / 'Page X of N' announcements.
**Out:** the rail chrome + thumbnails ([SN-ED-015](editor.md#sn-ed-015)), duplicate/delete/reorder ([SN-ED-017](editor.md#sn-ed-017)), the bookmark toggle UI ([SN-ED-006](editor.md#sn-ed-006) owns the toolbar toggle; this task exposes the jump-to-bookmark list), page-kind geometry + pan/zoom (SN-PG), continuous-scroll mode (PRD-ED-011, SN-PG).

#### Acceptance criteria
- [ ] + Page clones the current page's paper template + tint + size into a new page after the current and navigates to it; announces 'Added page X of N' (PRD-ED-013).
- [ ] On a PDF notebook, + Page inserts a Sane paged page (not a PDF page) unless a PDF is imported (PRD-ED-013; screens section 9).
- [ ] The dock '< X / N >' stepper moves between pages clamped to [1, N] and announces 'Page X of N' (PRD-ED-010/145).
- [ ] A numeric 'go to page...' jump and jump-to-bookmark navigate to the target; keyboard PageUp/PageDown navigate (PRD-ED-010 A11y).
- [ ] Swipe across a page edge navigates on paged notebooks only when not mid-stroke.
- [ ] The page index is a single shared source the rail, dock and toolbar all reflect.

#### Technical notes
Files under `app/lib/features/editor/pages/` using `SanePageNav` and `SaneAddPageButton` (component-inventory section 5). Add-page and index live in a shared page provider (`app/providers/`), mutating the `sane_core` notebook (SN-CORE-002/003; new object ids for CRDT add-wins). Clamping + jump are pure. Swipe-nav coordinates with the touch-gesture layer ([SN-ED-026](editor.md#sn-ed-026)) to avoid firing mid-stroke. Implements PRD-ED-010/013/145.

#### Security & privacy
None beyond baseline: page operations mutate note content locally through the CRDT op-log; nothing is logged, no content leaves the device. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: dock page nav + rail + Page button (screens section 7.3, 7.7; `SanePageNav`). Controls read in all 17 looks + dark. A11y: page control announces 'Page X of N'; add announces 'Added page X of N'; PageUp/PageDown work; numeric jump is a labelled field (non-gesture alternative to swipe).

#### Test plan
`app/test/features/editor/pages/page_nav_test.dart` (add clones paper/tint/size + navigates, PDF-notebook insert rule, stepper clamp, numeric jump, jump-to-bookmark, swipe-not-mid-stroke, shared index consistency across rail/dock/toolbar).

#### Dependencies
[SN-ED-015](editor.md#sn-ed-015) (page rail + Page button host), [SN-ED-006](editor.md#sn-ed-006) (toolbar bookmark toggle it coordinates with).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-017

<a id="sn-ed-017"></a>

**Implement duplicate, delete and reorder pages**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, pages-canvas |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-015](editor.md#sn-ed-015) |
| Depends on | [SN-ED-015](editor.md#sn-ed-015), [SN-ED-016](editor.md#sn-ed-016) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Beyond adding pages, the editor needs duplicate, delete and reorder - not shown in the mockup but required by the PRD (screens Open Q11; PRD-ED-014/015/016). Duplicate copies a page's paper/tint/size, all layers, all objects and bookmarks into a new page after the original with fresh object ids (CRDT add-wins), while audio anchors are not duplicated (PRD-ED-014). Reorder is a long-press-drag in the rail (or a Pages-overview grid) with an insertion indicator, ordered by an LWW index merged by CRDT (PRD-ED-015). Delete removes a page after a single-level confirm or an immediate delete + Undo toast, disallows deleting the last page of a notebook, and keeps deleted-page data in the op-log so Undo and 30-day Trash semantics stay consistent (PRD-ED-016). Crucially, drag-only reorder fails WCAG 2.5.7 without a non-drag alternative, so move-up/move-down/move-to menu commands are mandatory.

#### Scope
**In:** duplicate page (paper/tint/size + layers + objects + bookmarks, new ids, no audio anchors) (PRD-ED-014); reorder via long-press-drag in the rail with an insertion indicator, plus move-up/move-down/move-to non-drag commands (PRD-ED-015); delete with confirm-or-Undo-toast, last-page guard, op-log retention (PRD-ED-016); multi-select drag to reorder a run; announcements for each action.
**Out:** the rail chrome/thumbnails ([SN-ED-015](editor.md#sn-ed-015)), add-page/nav ([SN-ED-016](editor.md#sn-ed-016)), notebook-level trash/restore/purge (SN-LIB), audio-anchor model (SN-AUD), context-menu host ([SN-ED-023](editor.md#sn-ed-023) provides the menu surface), CRDT LWW-ordering internals (SN-CORE-003).

#### Acceptance criteria
- [ ] Duplicate copies paper/tint/size + all layers/objects + bookmarks into a new page after the original with fresh object ids; audio anchors are not duplicated (PRD-ED-014).
- [ ] Long-press-drag reorders a rail thumbnail with a visible insertion indicator; multi-select drag reorders a run (PRD-ED-015).
- [ ] Move-up / move-down / move-to... exist as non-drag commands (WCAG 2.5.7) reachable by keyboard and screen reader (PRD-ED-015 A11y).
- [ ] Delete removes a page after a single-level confirm or an immediate delete + Undo toast; deleting the last page is disallowed and offers 'clear page' instead (PRD-ED-016).
- [ ] Deleted-page data is retained in the local op-log so Undo and 30-day Trash semantics remain consistent (PRD-ED-016).
- [ ] Each action is announced to AT ('Duplicated page X', 'Moved page X to Y', 'Deleted page X - Undo').

#### Technical notes
Files under `app/lib/features/editor/pages/page_ops.dart`. Duplicate/reorder/delete mutate the `sane_core` notebook manifest: LWW-ordered index for reorder, add-wins new ids for duplicate, tombstone for delete (SN-CORE-003). Reorder drag in the rail ([SN-ED-015](editor.md#sn-ed-015)); non-drag commands via the context menu ([SN-ED-023](editor.md#sn-ed-023)). Delete confirm uses the look's dialog (ux-principles section 4.3). Implements PRD-ED-014/015/016.

#### Security & privacy
Page operations mutate note content via the CRDT op-log; delete is a tombstone, purged only after the retention window + sync convergence, never leaving residual plaintext (PRD-ED-016 Sec). Nothing is logged. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor page rail + Pages overview (screens section 7.7; Open Q11). Insertion indicator and confirm dialog read in all 17 looks + dark; destructive delete confirms with the consequence named (ux-principles section 4.3). A11y: non-drag move commands (WCAG 2.5.7), announced actions, Undo offered via toast + shortcut.

#### Test plan
`app/test/features/editor/pages/page_ops_test.dart` (duplicate copies content + new ids + no audio, reorder drag + insertion indicator, non-drag move commands, multi-select reorder, delete confirm/undo, last-page guard, op-log retention), plus a widget test of the insertion indicator per look family.

#### Dependencies
[SN-ED-015](editor.md#sn-ed-015) (rail), [SN-ED-016](editor.md#sn-ed-016) (page index + add).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-018

<a id="sn-ed-018"></a>

**Implement focus mode and the hide-UI toggle**

| Field | Value |
|---|---|
| GitHub | #243 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-006](editor.md#sn-ed-006) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Focus mode hides the toolbar, all bars and the rail - 'just the page' - with a floating 'Exit focus' pill top-right to return (screens section 7.8; PRD-ED-131). It is a core expression of the 'page is the hero' principle (ux-principles section 2). Alongside it, a full-screen / hide-UI toggle (four-finger tap, Procreate grammar, PRD-ED-136) toggles all chrome and is distinct from focus mode's persistent pill. This issue builds the focus-mode state, the chrome-hiding wiring across toolbar/bars/rail, the `SaneFocusPill`, the four-finger hide-UI toggle, and the keyboard shortcut (Cmd/Ctrl-Shift-F). Entering focus announces how to exit for screen-reader users, and the exit pill is keyboard-reachable so focus mode is never a trap (PRD-ED-131 A11y).

#### Scope
**In:** the focus-mode session state; hiding the top toolbar ([SN-ED-006](editor.md#sn-ed-006)), audio/selection/text bars and the page rail ([SN-ED-015](editor.md#sn-ed-015)) when focus is on; the `SaneFocusPill` 'Exit focus' top-right; the four-finger-tap hide-UI toggle distinct from focus (PRD-ED-136); the Cmd/Ctrl-Shift-F shortcut ([SN-ED-022](editor.md#sn-ed-022) binding); entering-focus announcement + a keyboard-reachable exit.
**Out:** the toolbar/bars/rail themselves, keyboard binding registration ([SN-ED-022](editor.md#sn-ed-022)), presentation mode + external display ([SN-ED-021](editor.md#sn-ed-021)), reading/annotation lock mode (PRD-ED-137, backlog), the multi-finger recogniser ([SN-ED-026](editor.md#sn-ed-026) provides the four-finger tap).

#### Acceptance criteria
- [ ] Toggling focus hides the toolbar, all bars and the rail, leaving only the page; the `SaneFocusPill` appears top-right (screens 7.8; PRD-ED-131).
- [ ] Tapping the Exit-focus pill (or Cmd/Ctrl-Shift-F, or four-finger tap) restores chrome to its prior state.
- [ ] The four-finger-tap hide-UI toggle toggles all chrome and is distinct from focus mode's persistent pill (PRD-ED-136).
- [ ] Entering focus announces how to exit; the exit pill is reachable by keyboard and screen reader so focus mode is never a trap (PRD-ED-131 A11y).
- [ ] Focus state is per session and survives page navigation within the notebook.
- [ ] The pill renders correctly in all 17 looks + dark and respects Reduce Motion on its entrance.

#### Technical notes
Files under `app/lib/features/editor/focus/` using `SaneFocusPill` (component-inventory section 5). Focus state in a Riverpod session provider (`app/providers/`); the toolbar/bars/rail read it to hide. Four-finger tap from [SN-ED-026](editor.md#sn-ed-026); Cmd/Ctrl-Shift-F from [SN-ED-022](editor.md#sn-ed-022). Implements PRD-ED-131/136 and screens section 7.8.

#### Security & privacy
None beyond baseline: focus mode is a chrome-visibility toggle touching no note content; nothing is logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor focus mode + `SaneFocusPill` (screens section 7.8; copy 'Focus mode - just the page' / 'Exit focus', ux-principles section 5). Pill restyles in all 17 looks + dark and its entrance respects Reduce Motion (ux-principles section 6). A11y: entering focus announces the exit path; the pill is keyboard-focusable; never a trap.

#### Test plan
`app/test/features/editor/focus/focus_mode_test.dart` (hide toolbar/bars/rail, pill appears, exit via pill/shortcut/four-finger, hide-UI toggle distinct from focus, focus survives page nav, entering-focus announcement), plus a golden of the pill per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (editor scaffold), [SN-ED-006](editor.md#sn-ed-006) (toolbar it hides).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-019

<a id="sn-ed-019"></a>

**Implement the zoom window (write-small, place-precise)**

| Field | Value |
|---|---|
| GitHub | #244 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | editor, pages-canvas, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The zoom window is the classic notes 'write big, place small' tool: the user writes at a comfortable size in a floating magnified region while ink lands small and precise on the page, with an advance-region control that moves the write zone across the line (PRD-ED-132). It is both a productivity feature and an accessibility aid for low-vision writing, so it must offer adjustable magnification and a keyboard advance (PRD-ED-132 A11y). This issue builds the floating zoom box, the mapping from the enlarged write area to the small target region on the page, and the advance control. The zoom transform math and page geometry come from SN-PG; ink capture is `sane_ink`; this issue owns the zoom-window UI, the write-area-to-page mapping and the advance interaction.

#### Scope
**In:** the floating zoom-window overlay showing a magnified slice of the page; capturing strokes in the enlarged write area and placing them at the small target region; an advance-region control (button + drag) that steps the write zone along the line; adjustable magnification; a keyboard advance; show/hide toggle.
**Out:** the page pan/zoom transform + geometry (SN-PG-002/003), ink capture/render (SN-INK), the fit/recenter control and general zoom gestures ([SN-ED-026](editor.md#sn-ed-026), SN-PG), presentation/laser ([SN-ED-020](editor.md#sn-ed-020)/[SN-ED-021](editor.md#sn-ed-021)).

#### Acceptance criteria
- [ ] A floating zoom window shows a magnified slice of the page; strokes drawn in it land small and precise at the mapped target region (PRD-ED-132).
- [ ] The advance-region control (button and drag) moves the write zone across the line; a keyboard advance exists (PRD-ED-132 A11y).
- [ ] Magnification is adjustable across a documented range and persists per session.
- [ ] The window can be moved and hidden; hiding it returns to normal drawing without losing placement.
- [ ] The zoom window is labelled for screen readers and its advance/magnification controls are keyboard-operable (PRD-ED-132 A11y).
- [ ] Ink placed via the zoom window is identical in the document to ink drawn directly (round-trip test).

#### Technical notes
Files under `app/lib/features/editor/viewport/zoom_window/`. Uses the SN-PG page transform to map the enlarged write area to page coordinates; strokes still flow through `sane_ink` capture ([SN-INK-002](ink.md#sn-ink-002)). The window is an overlay above the canvas layer stack. Implements PRD-ED-132; coordinate the advance with the line model where available (paper template baselines).

#### Security & privacy
None beyond baseline: the zoom window magnifies on-device page content only; ink stays note content, never logged or uploaded. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor viewport zoom window (PRD-ED-132; a notes-app staple). The window chrome restyles in all 17 looks + dark. A11y: this is an accessibility aid for low-vision writing - adjustable magnification and a keyboard advance are required; the window and its controls are labelled.

#### Test plan
`app/test/features/editor/viewport/zoom_window_test.dart` (write-area-to-page mapping, advance-region step, keyboard advance, magnification range + persistence, move/hide, ink-identity round-trip), plus a golden of the window per look family.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (editor canvas + tool state).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-020

<a id="sn-ed-020"></a>

**Implement the laser pointer for presenting**

| Field | Value |
|---|---|
| GitHub | #245 |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The laser pointer renders strokes as a temporary glowing trail that fades after roughly 1-2 seconds and is never committed to the page - for teaching and presenting (PRD-ED-134). Colour and size are configurable. Because laser strokes never persist and never sync, the laser is a clean, low-risk tool, but it must respect Reduce Motion (shorter or no glow animation) and it pairs with presentation mode ([SN-ED-021](editor.md#sn-ed-021)) where the audience sees only the page + laser/ink. This issue builds the laser tool: transient trail rendering with a fade, configurable colour/size, and the guarantee that no laser stroke enters the document, the undo stack or sync.

#### Scope
**In:** the laser tool producing a temporary glowing trail that fades after ~1-2 s; configurable colour and size; the guarantee that laser strokes never persist, never push undo and never sync; a Reduce-Motion path (shorter/no glow); activation from the dock/QuickMenu and via presentation mode ([SN-ED-021](editor.md#sn-ed-021)).
**Out:** presentation mode + external display ([SN-ED-021](editor.md#sn-ed-021)), the wet-ink renderer it reuses ([SN-INK-005](ink.md#sn-ink-005)), gesture customisation to bind laser to a stylus action ([SN-ED-025](editor.md#sn-ed-025)), collaboration live-cursor presence (SN-COL).

#### Acceptance criteria
- [ ] Laser strokes render as a glowing trail that fades after ~1-2 s and are never added to the page, the undo stack or sync (PRD-ED-134; unit test asserts the document and undo stack are unchanged after a laser stroke).
- [ ] Laser colour and size are configurable and persist per session.
- [ ] With Reduce Motion enabled the glow animation is shortened or removed while the pointer still functions (PRD-ED-134 A11y).
- [ ] The laser trail renders correctly in all 17 looks + dark over any page ground.
- [ ] Switching away from the laser tool leaves no residual trail.
- [ ] The laser is a presenter-facing aid; the persistent ink tools remain available for durable annotation (PRD-ED-134 A11y).

#### Technical notes
Files under `app/lib/features/editor/viewport/laser/`. Reuses the transient wet layer from `sane_render` ([SN-INK-005](ink.md#sn-ink-005)) with a fade animation; never calls the commit path ([SN-CORE-002](storage.md#sn-core-002) untouched). Reduce Motion via the platform accessibility signal (ux-principles section 6). Implements PRD-ED-134; used by [SN-ED-021](editor.md#sn-ed-021).

#### Security & privacy
Laser strokes never persist and never sync (PRD-ED-134 Sec); nothing is logged. No note content is created. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor laser tool (PRD-ED-134), used in presentation ([SN-ED-021](editor.md#sn-ed-021)). Trail restyles in all 17 looks + dark; respects Reduce Motion. A11y: presenter-facing; persistent ink tools remain for durable annotation; colour/size configurable (never colour-only meaning).

#### Test plan
`app/test/features/editor/viewport/laser_test.dart` (trail fades, never persists/undo/sync, colour/size config, Reduce-Motion path, no residual on tool switch), plus a golden of the trail per look family.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool state + canvas).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-021

<a id="sn-ed-021"></a>

**Implement presentation mode and external-display output**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, android-tablet, web |
| Areas | editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-020](editor.md#sn-ed-020) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
Presentation mode outputs the canvas to an external display, AirPlay or a projector with no UI chrome: the presenter keeps tools on the device while the audience sees only the page plus laser/ink (PRD-ED-135). This is a teaching feature for the student/teacher persona and pairs with the laser pointer ([SN-ED-020](editor.md#sn-ed-020)). It carries a real privacy risk: presenting must show only the intended notebook - no library, thumbnails, notifications or other notebooks may leak to the external screen (PRD-ED-135 Sec; CWE-200). This issue builds the audience view (chrome-free page mirror), the presenter view (full tools retained), external-display/AirPlay wiring where the platform supports it (Stage Manager on M-iPads, Android presentation display, web second-window/present), and the leak-prevention that scopes the audience view to the current notebook page only.

#### Scope
**In:** a chrome-free audience view mirroring the current page + laser/ink; the presenter view retaining full tools and accessible chrome; external-display / AirPlay / projector output where the platform supports it; the leak guard restricting the audience view to the intended notebook (no library/thumbnails/notifications); scene-based stepping on freeform where scenes exist (PRD-ED-190 groundwork, hand-off to SN-PG); enter/exit presentation.
**Out:** the laser tool itself ([SN-ED-020](editor.md#sn-ed-020)), freeform scenes authoring (PRD-ED-190, SN-PG), multi-window/tabs ([SN-ED-029](editor.md#sn-ed-029)), notification suppression policy (SN-NOTF provides the OS hook this consumes), collaboration follow-a-collaborator (SN-COL).

#### Acceptance criteria
- [ ] Presentation outputs the current page to an external display / AirPlay / projector with no UI chrome; the presenter device keeps its tools (PRD-ED-135).
- [ ] The audience view shows only the intended notebook page + laser/ink; no library, thumbnails, other notebooks or notifications appear on the external screen (PRD-ED-135 Sec; CWE-200 abuse test navigates away and asserts the audience view does not leak).
- [ ] Laser/ink drawn by the presenter appears on the audience view; the laser respects its transient rules ([SN-ED-020](editor.md#sn-ed-020)).
- [ ] The presenter view retains full accessible chrome even when the audience view is chrome-free (PRD-ED-135 A11y).
- [ ] Entering/exiting presentation is reachable by keyboard and announced; on unsupported platforms the feature degrades cleanly (hidden, not broken).
- [ ] The audience mirror renders correctly in all 17 looks + dark (PDFs keep original colours).

#### Technical notes
Files under `app/lib/features/editor/present/`. External display via platform channels (iPad external screen / Stage Manager, Android Presentation/second display, web second window) - feature-detect, degrade where absent. The audience view is a separate widget tree bound only to the current page provider, never the library or notification stream (leak guard). Reuses [SN-ED-020](editor.md#sn-ed-020) laser. Implements PRD-ED-135; scene stepping hands off to SN-PG (PRD-ED-190).

#### Security & privacy
Presenting is an information-leak boundary: scope the audience view to the current notebook page only; suppress notifications on the external screen; never surface library/thumbnails/other notebooks (PRD-ED-135 Sec; CWE-200). Note content shown is already on-device; nothing new egresses. IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-1, CWE-200.

#### UX notes
Surface: Editor presentation (PRD-ED-135). Audience view is chrome-free; presenter keeps the dock/toolbar. Both restyle in all 17 looks + dark; PDFs keep original colours (screens section 0). A11y: presenter view keeps full accessible chrome; enter/exit keyboard-reachable and announced.

#### Test plan
`app/test/features/editor/present/presentation_test.dart` (chrome-free audience view, presenter keeps tools, laser mirrors, leak guard when navigating away, unsupported-platform degrade, keyboard enter/exit), plus a golden of the audience view per look and a CWE-200 leak abuse test.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (editor state), [SN-ED-020](editor.md#sn-ed-020) (laser pointer).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans incl. leak test)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-022

<a id="sn-ed-022"></a>

**Implement editor keyboard shortcuts and the cheat sheet**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, android-tablet, web |
| Areas | editor, input-gestures, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-003](editor.md#sn-ed-003) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Large-screen and web users expect full keyboard control, and shortcuts follow the Notability/Goodnotes conventions users already know, normalised so Cmd on Apple maps to Ctrl elsewhere (PRD-ED-149; gestures-and-shortcuts section 6). This issue implements the editor's keyboard map: the core edit/file/nav/view shortcuts (undo/redo, cut/copy/paste, select-all, delete, save-checkpoint, zoom, page nav, search, text B/I/U), single-key tool switches (P/H/E/V/S/T/I/R), bracket-size and number-colour bindings, and a discoverable cheat sheet (long-press Cmd on iPad/desktop, ? or Cmd-/ on web). The load-bearing rule is context sensitivity: single-key tool switches must be suppressed while a text field/box is focused (they type the letter), and only modified shortcuts act there (gestures-and-shortcuts section 7). Everything remains additive - no action is keyboard-only, and bindings are remappable to avoid assistive-tech conflicts.

#### Scope
**In:** core shortcuts (Cmd/Ctrl-Z, Shift-Cmd/Ctrl-Z or Ctrl-Y, C/X/V, A, Del/Backspace, S local checkpoint, +/-/0 zoom, PageUp/PageDown, Cmd/Ctrl-K search, B/I/U text) (PRD-ED-149); single-key tool switches P/H/E/V(L)/S(D)/T/I/R with text-field suppression (PRD-ED-150; gestures-and-shortcuts section 6.1); bracket-size `[`/`]` and number-key colour slots (PRD-ED-151); the shortcut cheat-sheet overlay (PRD-ED-152); remappability + assistive-tech-safe defaults.
**Out:** the actions themselves (undo [SN-ED-003](editor.md#sn-ed-003), clipboard [SN-ED-012](editor.md#sn-ed-012), zoom/pan SN-PG, search SN-SRCH), stylus/touch gestures ([SN-ED-024](editor.md#sn-ed-024)/[SN-ED-026](editor.md#sn-ed-026)), document-tab switching keys ([SN-ED-029](editor.md#sn-ed-029)), settings screen for remapping (SN-SET).

#### Acceptance criteria
- [ ] The core edit/file/nav/view shortcuts are bound and normalised (Cmd on Apple, Ctrl elsewhere) (PRD-ED-149; gestures-and-shortcuts section 6.3).
- [ ] Single-key tool switches (P/H/E/V/S/T/I/R) switch tools only when the canvas has focus and no text field is active; while a text box is focused the key types the character and Esc returns focus to the canvas (PRD-ED-150; gestures-and-shortcuts section 7).
- [ ] `[`/`]` decrease/increase brush size; number keys pick palette swatches (PRD-ED-151).
- [ ] A cheat-sheet overlay lists all bindings (long-press Cmd / Cmd-/ / ?) and is screen-reader-readable and keyboard-dismissible (PRD-ED-152).
- [ ] No action is keyboard-only; every binding has a dock/menu equivalent (WCAG 2.1.1 additive) (PRD-ED-149 A11y).
- [ ] Bindings are remappable so they do not clash with assistive technology (PRD-ED-150 A11y).

#### Technical notes
Files under `app/lib/features/editor/shortcuts/` using Flutter `Shortcuts`/`Actions` with a `FocusScope` that distinguishes canvas focus from text-field focus (gestures-and-shortcuts section 7). Bindings dispatch to the tool controller ([SN-ED-002](editor.md#sn-ed-002)), undo ([SN-ED-003](editor.md#sn-ed-003)), clipboard ([SN-ED-012](editor.md#sn-ed-012)) and page nav ([SN-ED-016](editor.md#sn-ed-016)). The cheat sheet reads the binding registry. Remap store via SN-SET. Implements PRD-ED-149/150/151/152.

#### Security & privacy
None beyond baseline: Cmd/Ctrl-S is a local checkpoint, not a cloud action (PRD-ED-149 Sec); shortcuts touch no note content beyond invoking editor actions; nothing is logged. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor keyboard control + cheat sheet (gestures-and-shortcuts section 6; screens Cmd-K badge). The cheat-sheet overlay restyles in all 17 looks + dark. A11y: shortcuts are discoverable via the cheat sheet and never the only path; remappable to avoid conflicts with Switch/Voice control (gestures-and-shortcuts section 9).

#### Test plan
`app/test/features/editor/shortcuts/keyboard_shortcuts_test.dart` (core bindings normalised, single-key suppressed in text field + Esc returns focus, bracket size, number colours, cheat-sheet contents + dismiss, remap applies), covering canvas-focus vs text-focus contexts.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool controller), [SN-ED-003](editor.md#sn-ed-003) (undo actions).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-023

<a id="sn-ed-023"></a>

**Implement context menus (right-click and long-press)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-004](editor.md#sn-ed-004), [SN-ED-012](editor.md#sn-ed-012) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-79` |
| Extra labels | agent-ready |

#### Context
Right-click context menus are the desktop equivalent of long-press object menus, and every long-press menu MUST have a right-click equivalent (gestures-and-shortcuts section 6.4). Context menus are also the home for the non-gesture, non-drag alternatives that WCAG 2.5.7 requires - move-to-page, move up/down, group/ungroup, convert, and clipboard actions all need a discoverable menu entry (PRD-ED-015/079/085 A11y). This issue builds the editor context-menu system: object menus on a selection (cut/copy/paste/duplicate, delete, group/ungroup, recolour/restyle, convert, move-to-page) and page/canvas menus on empty canvas (paste, select-all, add/duplicate/delete page, paper and templates). It provides both the long-press (touch) and right-click (mouse/trackpad) triggers over the same menu model, and keeps entries labelled and keyboard-reachable.

#### Scope
**In:** the context-menu model + host; object menus on a selection (cut/copy/paste/duplicate via [SN-ED-012](editor.md#sn-ed-012), delete, group/ungroup + recolour/restyle/convert via [SN-ED-011](editor.md#sn-ed-011), move-to-page); page/canvas menus on empty canvas (paste, select-all, add/duplicate/delete page via [SN-ED-016](editor.md#sn-ed-016)/[SN-ED-017](editor.md#sn-ed-017), paper and templates); long-press (touch) and right-click (mouse) triggers over one model; labelled, keyboard-reachable entries as the non-gesture alternatives (WCAG 2.5.7).
**Out:** the actions themselves (they live in [SN-ED-011](editor.md#sn-ed-011)/[SN-ED-012](editor.md#sn-ed-012)/[SN-ED-016](editor.md#sn-ed-016)/[SN-ED-017](editor.md#sn-ed-017)), the QuickMenu/radial ([SN-ED-025](editor.md#sn-ed-025), PRD-ED-147), keyboard shortcuts ([SN-ED-022](editor.md#sn-ed-022)), link context handling (SN-TXT), sharing menu (SN-SHR).

#### Acceptance criteria
- [ ] Long-press on touch and right-click on mouse both open the same context menu over a selection or empty canvas (gestures-and-shortcuts section 6.4).
- [ ] Object menus offer cut/copy/paste/duplicate, delete, group/ungroup, recolour/restyle, convert and move-to-page; canvas menus offer paste, select-all, add/duplicate/delete page and paper and templates.
- [ ] Every context-menu entry is a labelled, keyboard-reachable command that serves as the non-drag/non-gesture alternative for its action (WCAG 2.5.7).
- [ ] Menu entries reflect state (disabled when not applicable, e.g. paste with an empty clipboard, ungroup with no group).
- [ ] Any label or content shown from note data (e.g. a link target) is rendered as inert text, never interpreted as markup (CWE-79).
- [ ] The menu renders and positions correctly in all 17 looks + dark and at phone width.

#### Technical notes
Files under `app/lib/features/editor/context_menu/`. One menu model dispatched from a long-press recogniser (touch) and a secondary-button `Listener` (mouse); reuses `SaneOverlay`/menu components from `sane_ui`. Entries call the owning issues' actions ([SN-ED-011](editor.md#sn-ed-011)/[SN-ED-012](editor.md#sn-ed-012)/[SN-ED-016](editor.md#sn-ed-016)/[SN-ED-017](editor.md#sn-ed-017)). State/enablement from the selection + clipboard + page providers. Implements gestures-and-shortcuts section 6.4 and the non-gesture-alternative requirements.

#### Security & privacy
None beyond baseline plus: any note-derived text in a menu label is inert (no markup interpretation, CWE-79). Menus touch note content only through the actions they invoke; nothing is logged. IDs: MASVS-PRIVACY-1, CWE-79.

#### UX notes
Surface: Editor object/canvas context menus (gestures-and-shortcuts section 6.4). Menus restyle in all 17 looks + dark and reflow at phone width (no off-screen menus). A11y: right-click equivalent for every long-press menu; entries labelled and keyboard-reachable; these menus are the documented non-gesture alternatives.

#### Test plan
`app/test/features/editor/context_menu/context_menu_test.dart` (long-press and right-click open same menu, object vs canvas entries, disabled-state reflection, inert note-text labels, keyboard reachability, phone-width positioning), plus a golden per look family.

#### Dependencies
[SN-ED-004](editor.md#sn-ed-004) (selection for object menus), [SN-ED-012](editor.md#sn-ed-012) (clipboard actions the menu invokes).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-024

<a id="sn-ed-024"></a>

**Bind the Pencil and S Pen double-tap action**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, ios-phone, android-tablet, android-phone |
| Areas | editor, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-SET-001](settings.md#sn-set-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
The double-tap on Apple Pencil 2/Pro and the S Pen button is the one stylus interaction users reach for constantly, and the design fixes its options: the Settings 'Double-tap the pencil' action is Eraser (default) / Previous tool / Colors (screens section 12; PRD-ED-153). It is delivered via UIPencilInteraction/preferredTapAction on Apple and the S Pen button/MotionEvent on Samsung, feature-detected not device-sniffed (gestures-and-shortcuts section 3.1). This issue binds the double-tap to the editor: reading the user's chosen action from Settings (SN-SET), applying it to the tool state ([SN-ED-002](editor.md#sn-ed-002)), and guaranteeing every double-tap target also has a dock equivalent so the feature is additive (PRD-ED-153 A11y). The native pencil/S Pen event capture lives in the stylus plugin (SN-PHN/sane_stylus); this issue consumes those events and maps them to editor actions. Squeeze/barrel-roll/hover/air actions and customisation are [SN-ED-025](editor.md#sn-ed-025).

#### Scope
**In:** consuming double-tap events from the stylus plugin (Apple UIPencilInteraction, Samsung S Pen button); mapping to the Settings action Eraser / Previous tool / Colors (screens section 12); applying to [SN-ED-002](editor.md#sn-ed-002) tool state (toggle to eraser, swap to previous tool, or open the colour picker); respecting the system preferredTapAction where set; ensuring each target has a dock equivalent (PRD-ED-153 A11y).
**Out:** native pencil/S Pen event capture (sane_stylus, SN-PHN), squeeze/barrel-roll/hover/air actions ([SN-ED-025](editor.md#sn-ed-025)), extending targets to eyedropper/QuickMenu ([SN-ED-025](editor.md#sn-ed-025), M5), the Settings UI row itself (SN-SET provides it; this reads the value), estimated-property reconciliation (SN-INK-018).

#### Acceptance criteria
- [ ] A Pencil 2/Pro double-tap or S Pen button double-press performs the Settings-selected action: Eraser (default), Previous tool, or Colors (screens section 12; PRD-ED-153).
- [ ] The action is read live from the profile setting; changing it in Settings changes the behaviour without restart.
- [ ] Where the system preferredTapAction is set to a system shortcut and the app does not receive the tap, the app does not rely on it as the only path (PRD-ED-153/154 caveat).
- [ ] Every double-tap target also exists in the dock so the feature is purely additive (PRD-ED-153 A11y).
- [ ] Capability is feature-detected (Pencil 2/Pro, S Pen with button); on styluses without a double-tap nothing breaks (graceful no-op).
- [ ] Double-tap is a separate event that does not interrupt a committed stroke and maps only to non-destructive actions (gestures-and-shortcuts section 7).

#### Technical notes
Files under `app/lib/features/editor/stylus/double_tap_binding.dart`. Consumes the stylus plugin's double-tap stream (sane_stylus, SN-PHN); reads the action from the profile-prefs provider (SN-SET-001, screens section 12). Applies to [SN-ED-002](editor.md#sn-ed-002) tool controller. Feature-detect via the plugin's capability query, never a device string (gestures-and-shortcuts section 3). Implements PRD-ED-153.

#### Security & privacy
None beyond baseline: the binding maps a hardware event to an editor action; no note content is touched beyond tool switching; nothing is logged. IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-1.

#### UX notes
Surface: Editor stylus double-tap, configured in Settings > Handwriting & stylus (screens section 12). No new chrome; the effect is a fast tool swap. A11y: all double-tap actions have dock equivalents; feature is additive; users without the hardware are unaffected (PRD-ED-153 A11y).

#### Test plan
`app/test/features/editor/stylus/double_tap_binding_test.dart` (each Settings action applied, live setting change, additive dock equivalence, feature-detect graceful no-op, non-destructive mapping, does not interrupt a stroke) using a fake stylus event stream.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool controller), [SN-SET-001](settings.md#sn-set-001) (double-tap action setting). Consumes sane_stylus (SN-PHN).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-025

<a id="sn-ed-025"></a>

**Bind squeeze, barrel-roll, hover, air actions and gesture customisation**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, android-phone |
| Areas | editor, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-024](editor.md#sn-ed-024) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, innovation |

#### Context
Stylus mastery is the M5 differentiator competitors fail at: Apple Pencil Pro squeeze, barrel roll and hover, Samsung S Pen air actions and barrel button, plus a Gesture Controls surface that lets power users remap them (PRD-ED-154..160; gestures-and-shortcuts section 3-4). Squeeze opens the contextual QuickMenu/arc palette at the hover pose (PRD-ED-154); barrel roll rotates chisel/calligraphy nibs live (PRD-ED-155); hover shows the brush cursor and MAY adjust size/opacity (PRD-ED-156/033); S Pen air actions map the single allowed remote action and page-turn gestures (PRD-ED-157); the barrel button triggers erase/secondary (PRD-ED-158). This issue binds those editor-side actions, builds the radial QuickMenu ([SN-ED-005](editor.md#sn-ed-005) dock companion) and the Touch Shortcut modifier, and the Gesture Controls customisation that keeps every remapped action's button/keyboard equivalent (PRD-ED-160 A11y). Native capture (squeeze phase, rollAngle, hover pose, SpenRemote) lives in sane_stylus (SN-PHN); this issue consumes and maps.

#### Scope
**In:** squeeze -> contextual QuickMenu/arc palette at the hover point (PRD-ED-154); barrel roll -> nib rotation for chisel/calligraphy brushes (PRD-ED-155); hover -> brush cursor preview + optional size/opacity (PRD-ED-156/033); S Pen air actions -> page turns + the one remote action (PRD-ED-157); barrel button -> erase/secondary (PRD-ED-158); the radial QuickMenu (PRD-ED-147) with a linear/list fallback; the Touch Shortcut on-canvas modifier (PRD-ED-148); the Gesture Controls settings surface remapping double-tap/squeeze/finger-role/QuickMenu with preserved button/keyboard equivalents (PRD-ED-160).
**Out:** double-tap binding ([SN-ED-024](editor.md#sn-ed-024)), native stylus capture + estimated-property reconciliation (sane_stylus SN-PHN, SN-INK-018), the brush nib geometry (SN-BRS), hover-capability rendering of the cursor (SN-INK-033/render), haptics on snap (PRD-ED-102, SN-INK/SN-PHN).

#### Acceptance criteria
- [ ] Squeeze (Pencil Pro) opens the contextual QuickMenu/arc palette at the hover pose; when the system preferredSqueezeAction is a system shortcut the app does not receive it and does not depend on it (PRD-ED-154).
- [ ] Barrel roll rotates chisel/calligraphy nibs live; a 'Lock angle' toggle overrides roll (PRD-ED-155; gestures-and-shortcuts section 3.3).
- [ ] Hover shows the brush cursor before contact; hover pinch/slide MAY adjust size/opacity; the dock always shows brush state without hover (PRD-ED-156/033 A11y).
- [ ] S Pen air gestures turn pages (left/right -> prev/next) and the single remote action maps to a high-value editor action; barrel button erases/does its secondary (PRD-ED-157/158).
- [ ] The radial QuickMenu has a linear/list fallback for screen readers and labelled items (PRD-ED-147 A11y).
- [ ] Gesture Controls remap double-tap/squeeze/finger-role/QuickMenu; a remap never removes the button/keyboard equivalent (PRD-ED-160 A11y); all extras feature-detected and degrade cleanly.

#### Technical notes
Files under `app/lib/features/editor/stylus/` (squeeze_binding, barrel_roll, hover, air_actions, quick_menu, touch_shortcut) and `app/lib/features/editor/settings/gesture_controls.dart`. Consumes sane_stylus capability-gated streams (SN-PHN; Apple .onPencilSqueeze/rollAngle/UIPencilHoverPose, Samsung SpenRemote/AirMotionEvent, gestures-and-shortcuts section 3-4). QuickMenu is a dock companion ([SN-ED-005](editor.md#sn-ed-005)). Remap store via SN-SET. Feature-detect, never device-sniff. Implements PRD-ED-147/148/154..160.

#### Security & privacy
None beyond baseline: BLE pairing for S Pen is user-initiated (PRD-ED-157 Sec); bindings map hardware events to editor actions; no note content beyond tool/brush actions; nothing is logged. IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-1.

#### UX notes
Surface: Editor stylus mastery + QuickMenu + Gesture Controls settings (gestures-and-shortcuts section 3-4; PRD-01 section 16). QuickMenu/arc restyle in all 17 looks + dark. A11y: radial has a list fallback; hover is additive (dock shows brush state); remaps preserve button/keyboard equivalents; extras degrade where hardware lacks them (PRD-ED-160 A11y).

#### Test plan
`app/test/features/editor/stylus/stylus_mastery_test.dart` (squeeze opens QuickMenu, preferredSqueezeAction not-received handling, barrel-roll nib rotation + lock, hover cursor + optional size, air page-turns + remote action, barrel-button erase, QuickMenu list fallback, remap keeps equivalents, feature-detect degrade) using fake capability-gated streams.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (tool controller), [SN-ED-024](editor.md#sn-ed-024) (double-tap binding it extends). Consumes sane_stylus (SN-PHN).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-026

<a id="sn-ed-026"></a>

**Implement touch gestures and input precedence**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-INK-001](ink.md#sn-ink-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
A pen-first app lives or dies on getting the finger/stylus/palm precedence right: the pen writes, the finger navigates, two-or-more fingers gesture, and a second finger during a stroke cancels/holds the wet stroke (gestures-and-shortcuts section 1, section 7). This issue implements the editor's touch-gesture layer and the fixed precedence order: system gestures > multi-finger gestures (zoom/pan/undo/redo/focus) > stylus ink > single finger (scroll/pan, or draw if 'Draw with finger' is on) > palm. It provides pinch-zoom + twist-rotate, two-finger pan, the multi-finger tap recogniser consumed by undo/redo ([SN-ED-008](editor.md#sn-ed-008)) and focus ([SN-ED-018](editor.md#sn-ed-018)), the two-finger-tap-vs-drag disambiguation, and the single-touch gesture companion for motor accessibility (single-finger undo/redo/zoom/pan, WCAG 2.5.1). Palm rejection policy and finger-draw routing live in `sane_ink` (SN-INK-013); this issue owns the gesture recognisers, the precedence resolver and the web touch-action isolation.

#### Scope
**In:** pinch-zoom + pinch-twist-rotate (freeform) via the SN-PG transform; two-finger pan; the multi-finger tap recogniser (2-finger, 3-finger, 4-finger) feeding undo/redo ([SN-ED-008](editor.md#sn-ed-008)) and focus/hide-UI ([SN-ED-018](editor.md#sn-ed-018)); the fixed precedence resolver (gestures-and-shortcuts section 7) that cancels/holds a wet stroke when a second finger lands; two-finger tap-vs-drag threshold; the single-touch gesture companion (PRD-ED-171); web `touch-action:none` scoped to the canvas with `setPointerCapture` (PRD-ED-172).
**Out:** palm rejection + finger-draw + left-handed policy (SN-INK-013/016), the pan/zoom transform math + page kinds (SN-PG), stylus gestures ([SN-ED-024](editor.md#sn-ed-024)/[SN-ED-025](editor.md#sn-ed-025)), the undo/focus actions themselves ([SN-ED-008](editor.md#sn-ed-008)/[SN-ED-018](editor.md#sn-ed-018)), second-finger transient select (PRD-ED-170, M3), three-finger copy/clear (PRD-ED-169, M5).

#### Acceptance criteria
- [ ] Precedence resolves in the fixed order system > multi-finger > stylus ink > single finger > palm; a second finger during a stroke cancels/holds the wet stroke and the aborted stroke is removed, not committed (gestures-and-shortcuts section 7; WCAG 2.5.2).
- [ ] Pinch zooms, pinch+twist rotates freeform (paged pages do not rotate), quick-pinch fits (PRD-ED-166; via SN-PG transform).
- [ ] Two-finger drag pans; a two-finger tap (minimal movement) is distinguished from a pan by threshold and routed to undo ([SN-ED-008](editor.md#sn-ed-008)).
- [ ] The multi-finger recogniser emits 2/3/4-finger tap events consumed by undo/redo and focus/hide-UI without firing during a pan.
- [ ] The single-touch gesture companion performs undo/redo/zoom/pan with single-finger gestures for users who cannot do multi-finger gestures (PRD-ED-171; WCAG 2.5.1).
- [ ] On web, `touch-action:none` is scoped to the canvas only and `setPointerCapture` keeps a stroke's events on-canvas; in-app zoom compensates for blocked browser zoom (PRD-ED-172; WCAG 1.4.4).

#### Technical notes
Files under `app/lib/features/editor/gestures/` (touch_gestures, precedence_resolver, single_touch_companion). Coexists with the raw `Listener` ink path ([SN-ED-002](editor.md#sn-ed-002)); disambiguates by pointer count + `event.kind`. Zoom/rotate call the SN-PG transform; hit-testing via `sane_ink` ([SN-INK-001](ink.md#sn-ink-001)). Web interop for touch-action/pointer-capture (research/web-stylus-and-pwa-capabilities section 1). Implements PRD-ED-166/167/168/171/172 and gestures-and-shortcuts section 7.

#### Security & privacy
Secure-context (HTTPS) required on web for coalesced/predicted events (shared with SN-INK). Gesture handling touches note content only via zoom/pan/select; nothing is logged. IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-1.

#### UX notes
Surface: Editor canvas gestures (gestures-and-shortcuts section 1, section 7). No visible chrome; behaviour must feel invisible and correct. A11y: the single-touch companion satisfies WCAG 2.5.1 (single-pointer alternatives to every multi-finger gesture); button/keyboard zoom+fit exist for users who cannot pinch (PRD-ED-166 A11y).

#### Test plan
`app/test/features/editor/gestures/touch_gestures_test.dart` (precedence order, second-finger cancels wet stroke, pinch zoom/twist, two-finger pan, tap-vs-drag threshold, 2/3/4-finger tap emission, single-touch companion, web touch-action scoped + pointer capture), with a web integration test for touch-action isolation.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (canvas + ink path it coexists with), [SN-INK-001](ink.md#sn-ink-001) (hit-testing + palm/finger policy it composes with).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, web integration, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-027

<a id="sn-ed-027"></a>

**Implement editor toasts, auto-save and sync-status indicators**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Toasts are the app's single inverted surface and replace red error text everywhere: ink-on-ground, pill, bottom-centre above the palette, auto-dismissing at 2.4 s (ux-principles section 2, section 4.3; screens section 1). The editor emits many of them ('Page bookmarked', 'Deleted N stroke(s)', 'Circle some ink to select it', '<file> imported - highlighter ready'). Alongside toasts, the editor needs an honest, quiet data-safety story: ink is committed to the local op-log within one frame of stroke-end so no crash can lose more than the last in-flight stroke (PRD-ED-175), and sync shows a quiet status (synced / syncing / paused / waiting for network), never an alarm, with offline silent for note-taking (ux-principles section 4.4). This issue builds the editor toast host (`SaneToast` live-region mirrored), the auto-save/checkpoint indicator reflecting the op-log commit, and the subtle sync-status indicator.

#### Scope
**In:** the editor toast host using `SaneToast` (2.4 s, bottom-centre above the dock, AT live-region mirror); wiring the editor's toast events; the auto-save indicator reflecting the op-log commit ('saved'/'saving' quietly) from SN-CORE-004; the subtle sync-status indicator (synced / syncing / paused Wi-Fi-only / waiting for network) with offline silent for note-taking; announcing completion of long ops (export/import) via the toast.
**Out:** the op-log persistence + safe-save engine (SN-CORE-004, PRD-ED-175), the sync engine + status source (SN-SYNC-001), the full settings sync status (SN-SET), red-error removal in other screens (owned per-area), the audio recorder bar (SN-AUD).

#### Acceptance criteria
- [ ] Editor toasts render via `SaneToast` (the only inverted surface), pill, bottom-centre above the palette, auto-dismiss at 2.4 s, and mirror to an AT live region (ux-principles section 2; screens section 1).
- [ ] All editor validation/confirmation messages are toasts, never inline red text (ux-principles section 4.3).
- [ ] The auto-save indicator reflects the op-log commit and shows 'saved'/'saving' quietly; a killed-app relaunch loses at most the last in-flight stroke (PRD-ED-175; asserted with a simulated kill).
- [ ] The sync-status indicator shows synced / syncing / paused / waiting for network and is never a red modal; offline is silent for note-taking (ux-principles section 4.4).
- [ ] Long operations report completion via the toast ('Exporting PDF...'/done), not just motion (ux-principles section 4.2).
- [ ] Toasts and indicators render correctly in all 17 looks + dark and respect Reduce Motion on their entrance.

#### Technical notes
Files under `app/lib/features/editor/status/` using `SaneToast` (component-inventory section 3) and a small status strip. The auto-save indicator reads the storage-isolate commit signal (SN-CORE-004, PRD-ED-175); the sync indicator reads the sync-status provider (SN-SYNC-001). Toast events flow from editor actions via `app/providers/`. Implements ux-principles section 2/4 and PRD-ED-175 (indicator half).

#### Security & privacy
Toasts and indicators MUST NOT include note content, tokens, file paths, coordinates or PII - only plain status (CLAUDE.md section 7.3). The auto-save indicator reflects a local commit; the sync indicator shows status, not content. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: `SaneToast` + status indicators (screens section 1; ux-principles section 2, section 4). Toast is the only inverted surface, restyled in all 17 looks + dark; sync status is quiet and honest, never an alarm; offline is silent. A11y: toasts mirror to a live region; the auto-save/sync state is text + non-colour; Reduce Motion softens entrances.

#### Test plan
`app/test/features/editor/status/toast_status_test.dart` (toast placement/duration/live-region, no inline red, auto-save reflects commit + at-most-last-stroke-on-kill, sync status states + offline silent, long-op completion toast, no PII in toast text), plus a golden of a toast per look.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (editor actions emitting toasts), [SN-CORE-004](storage.md#sn-core-004) (op-log commit signal for auto-save). Coordinates with SN-SYNC-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-028

<a id="sn-ed-028"></a>

**Implement in-editor onboarding tips**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, onboarding |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-SET-001](settings.md#sn-set-001) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The app must not preemptively teach: there is no coach-marks storm on first launch, and everything past the 3-step onboarding is learned by using the app, with at most one gentle tip surface (Settings > Tips, off by default) (ux-principles section 3). The Settings 'Tips' toggle is off by default and described as 'One short tip a week, never more' (screens section 12 Notifications). This issue builds the restrained in-editor tips surface: a single, dismissible, non-blocking tip that appears at most rarely, gated on the Tips setting, teaching one high-value editor gesture or feature at a time (e.g. draw-and-hold to make a shape, two-finger undo, drag the dock to any edge). Tips never interrupt writing, never stack, and always have a 'don't show tips' path back to Settings. This is deliberately minimal per the calm-UX principle.

#### Scope
**In:** a single dismissible, non-blocking in-editor tip surface gated on the Settings Tips toggle (off by default, screens section 12); a small rotating set of high-value editor tips (draw-and-hold to shape, two-finger undo, drag-to-dock, focus mode); frequency cap (at most one per session, honouring 'one a week'); a 'don't show tips' action linking to Settings; per-profile 'seen' tracking so a tip is not repeated.
**Out:** the 3-step first-run onboarding overlay (SN-ONB), the Settings Tips toggle UI (SN-SET provides it), coach-mark storms (explicitly forbidden, ux-principles section 3), notifications/class reminders (SN-NOTF), library/first-run empty-state mascot (SN-LIB).

#### Acceptance criteria
- [ ] Tips appear only when the Settings Tips toggle is on (default off); with it off, no tip ever shows (screens section 12; ux-principles section 3).
- [ ] At most one tip shows per session and the cadence honours 'one short tip a week, never more' (screens section 12).
- [ ] A tip is non-blocking (never interrupts writing), dismissible, and never stacks with another tip.
- [ ] Each tip offers a 'don't show tips' action that turns the setting off; per-profile 'seen' tracking prevents repeats.
- [ ] Tips are labelled for screen readers and dismissible by keyboard; they render correctly in all 17 looks + dark and respect Reduce Motion.
- [ ] No tip blocks a first-time user from writing without opening any menu (ux-principles section 3 rule).

#### Technical notes
Files under `app/lib/features/editor/tips/`. Reads the Tips setting + per-profile seen-set from the profile-prefs provider (SN-SET-001, screens section 12). Renders as a small dismissible surface above the canvas (reuse `SaneToast`/overlay styling but non-auto-dismiss). Frequency cap in the tips controller. Implements ux-principles section 3 (restraint) and screens section 12 Tips.

#### Security & privacy
None beyond baseline: tips carry no note content and no PII; the seen-set is a per-profile UI preference stored locally, never logged with content. ID: MASVS-PRIVACY-1.

#### UX notes
Surface: Editor tips (ux-principles section 3; screens section 12 'Tips'). Voice is plain and warm, no exclamation marks (ux-principles section 5); one tip at a time, non-blocking. Restyles in all 17 looks + dark. A11y: dismissible by keyboard, labelled; never blocks writing; always a path to turn tips off.

#### Test plan
`app/test/features/editor/tips/editor_tips_test.dart` (only shows when enabled, at-most-one-per-session cap, non-blocking + dismissible, 'don't show tips' turns setting off, seen-set prevents repeats, keyboard dismiss), plus a golden of a tip per look family.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (editor surface), [SN-SET-001](settings.md#sn-set-001) (Tips toggle + per-profile prefs).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-029

<a id="sn-ed-029"></a>

**Implement split view, multi-window and document tabs**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | ipad, android-tablet, web |
| Areas | editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-022](editor.md#sn-ed-022) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Large-screen users want several notebooks open at once for reference and side-by-side work. Two distinct capabilities cover this: OS multi-window - opening a notebook/page in a new window for side-by-side reference, with split view / two-pane on large screens (PRD-ED-139) - and a browser-style document tab bar that keeps several notebooks open for fast switch/close/reorder, distinct from OS windows (PRD-ED-191). Both carry descriptive window/tab names for accessibility, and tabs get Cmd/Ctrl-1..9 switch and Cmd/Ctrl-W close ([SN-ED-022](editor.md#sn-ed-022)). This issue builds the in-app document tab bar, the split-view/two-pane layout on wide screens, and the additive-window hook where the platform supports it (iPadOS additive windowing, Android window size classes, web second window). Each open notebook is an independent editor instance so state does not bleed between panes/tabs.

#### Scope
**In:** the document tab bar (open/switch/close/reorder several notebooks) with descriptive labels and Cmd/Ctrl-1..9 / Cmd/Ctrl-W ([SN-ED-022](editor.md#sn-ed-022)); split-view / two-pane layout on wide screens with independent editor instances per pane; the additive-window hook (open notebook/page in a new OS window) where supported, degrading cleanly where not; independent per-instance editor state (tool/undo/selection) so panes/tabs do not bleed.
**Out:** presentation/external display ([SN-ED-021](editor.md#sn-ed-021)), the adaptive single-pane layout ([SN-ED-030](editor.md#sn-ed-030)), the library/router shell (ADR-0003, app router), collaboration multi-user editing (SN-COL), the keyboard binding registration ([SN-ED-022](editor.md#sn-ed-022) owns it; this consumes tab keys).

#### Acceptance criteria
- [ ] A document tab bar keeps several notebooks open; tabs switch, close and reorder, expose selected state + labels, and support Cmd/Ctrl-1..9 switch and Cmd/Ctrl-W close (PRD-ED-191; [SN-ED-022](editor.md#sn-ed-022)).
- [ ] On wide screens a split-view / two-pane layout shows two notebooks side by side, each an independent editor instance (PRD-ED-139).
- [ ] Opening a notebook/page in a new OS window works where the platform supports it and is hidden/degraded where not (PRD-ED-139; feature-detect).
- [ ] Editor state (active tool, undo stack, selection) is independent per pane/tab; editing one never affects another (test with two open notebooks).
- [ ] Tabs and windows carry descriptive accessible names; close has a non-gesture control (PRD-ED-139/191 A11y).
- [ ] Tabs/split view render correctly in all 17 looks + dark; the feature is toggleable.

#### Technical notes
Files under `app/lib/features/editor/multi/` (tab_bar, split_view, window_hook). Each open notebook is a scoped editor instance (Riverpod family keyed by notebook id, ADR-0003) so tool/undo/selection providers are per-instance. Additive window via platform channels (iPad additive windowing / Android window size classes / web window.open), feature-detected (research/apple-pencil-ipados-capabilities section 11, research/android-stylus-capabilities section 8). Tab keys from [SN-ED-022](editor.md#sn-ed-022). Implements PRD-ED-139/191.

#### Security & privacy
Each window/tab shows only its own notebook (already on-device); independent instances prevent state bleed. No content is logged; nothing new egresses. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Surface: Editor document tabs + split view (PRD-ED-139/191). Tab bar and split divider restyle in all 17 looks + dark and reflow at narrower widths (tabs may collapse; split disabled below the wide threshold, [SN-ED-030](editor.md#sn-ed-030)). A11y: tabs expose selected state + labels; windows carry descriptive titles; close has a non-gesture control.

#### Test plan
`app/test/features/editor/multi/multi_window_test.dart` (tab open/switch/close/reorder, tab keys, split-view two independent instances, per-instance state isolation, additive-window feature-detect degrade, accessible tab/window names), plus a golden of the tab bar + split view per look family.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (editor instance), [SN-ED-022](editor.md#sn-ed-022) (tab keyboard bindings).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-ED-030

<a id="sn-ed-030"></a>

**Implement adaptive editor layout and phone-adaptation hooks**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | editor, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-ED-005](editor.md#sn-ed-005) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
The editor is one Flutter codebase across five surfaces, adapting to window size class rather than device identity: a phone, a small desktop window and a folded foldable all resolve to the same compact layout (ux-principles section 8; PRD-ED-140). The design breakpoint is `narrow` at width < 900 px, which collapses the sidebar and hides desktop-only affordances (page rail, subjects); compact widths (< 600 dp) put the editor full-bleed with the dock docked bottom and the rail hidden (screens section 0; ux-principles section 8). Foldable postures shift compact<->expanded instantly without state loss (PRD-ED-140). This issue provides the editor layout provider and the phone-adaptation hooks that every other editor feature reads: the size-class resolver, the narrow/compact rules that hide the rail and reflow the dock, foldable posture handling, and the guarantee of no horizontal body scroll at phone width. It is the shared layout substrate the toolbar, dock and rail all consume.

#### Scope
**In:** the editor layout provider resolving Compact/Medium/Expanded/Large from window size class (ux-principles section 8 table); the `narrow` (<900 px) rule hiding the page rail + desktop-only affordances and the compact (<600 dp) full-bleed rule with dock docked bottom; instant foldable posture reflow (compact<->expanded) with no state loss (PRD-ED-140); the one-hand-reach phone hooks (dock defaults, larger targets); reflow at 320 CSS px with no 2-D scroll (WCAG 1.4.10); the shared API the toolbar/dock/rail read.
**Out:** the phone editor's own feature set (built by the editor features that consume this provider), the library/router adaptive layout (app shell), split view / tabs ([SN-ED-029](editor.md#sn-ed-029)), stylus phone extras ([SN-ED-025](editor.md#sn-ed-025)), the compatibility matrix + low-end perf hardening (SN-PERF/SN-PHN).

#### Acceptance criteria
- [ ] The layout provider resolves Compact/Medium/Expanded/Large from window size class and exposes it to the toolbar/dock/rail (ux-principles section 8).
- [ ] At `narrow` (<900 px) the page rail and desktop-only affordances hide; at compact (<600 dp) the editor is full-bleed with the dock docked bottom (screens section 0; ux-principles section 8).
- [ ] Foldable fold/unfold and window-class changes reflow compact<->expanded instantly with no state loss (PRD-ED-140; tested with a simulated posture change preserving tool/undo/selection).
- [ ] The editor reflows at 320 CSS px with no horizontal body scroll and no loss of function (WCAG 1.4.10; PRD-ED-140 A11y).
- [ ] Touch targets meet the platform minimum (44 pt iPadOS / 48 dp Android / 24 CSS px floor web) at every width (ux-principles section 8).
- [ ] Layout changes preserve focus and reading order for screen readers (PRD-ED-140 A11y).

#### Technical notes
Files under `app/lib/features/editor/layout/` exposing an `EditorLayout` provider (Riverpod, ADR-0003) read by [SN-ED-006](editor.md#sn-ed-006), [SN-ED-005](editor.md#sn-ed-005), [SN-ED-015](editor.md#sn-ed-015). Size classes align to Android window size classes / iPad windowing; verify exact breakpoints per platform (ux-principles section 8; research/android-stylus-capabilities section 8). Foldable postures via the platform window-info stream. No horizontal body scroll; canvas geometry is fixed (page 800x1040, freeform 2400x2400), only chrome reflows (ux-principles section 8). Implements PRD-ED-140.

#### Security & privacy
None beyond baseline: layout resolution reads only window metrics (not note content); nothing is logged. IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-1.

#### UX notes
Surface: Editor adaptive layout across phone/tablet/web/foldable (ux-principles section 8; screens section 0 narrow). The canvas is fixed geometry, chrome is fluid; dock defaults bottom on compact and stays drag-dockable ([SN-ED-005](editor.md#sn-ed-005)). Renders in all 17 looks + dark at every width. A11y: reflow at 320 px with no 2-D scroll, platform-minimum targets, preserved focus/reading order across posture changes.

#### Test plan
`app/test/features/editor/layout/editor_layout_test.dart` (size-class resolution, narrow hides rail, compact full-bleed dock-bottom, foldable posture reflow preserves state, 320 px no-horizontal-scroll, target sizes per platform, focus/reading-order preserved), plus goldens at phone/tablet/desktop widths per look family.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002) (editor scaffold), [SN-ED-005](editor.md#sn-ed-005) (dock that reflows with the layout).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-003

<a id="sn-gcmp-003"></a>

**Add the Tape / masking tool for active recall and redaction**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | editor, study |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-002](editor.md#sn-ed-002), [SN-MED-002](images-media.md#sn-med-002) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Goodnotes ships a 'Tape' tool and Notability a 'Tape' feature that lays opaque or coloured strips over content; students use it to mask answers for active recall and to redact before sharing (docs/research/competitor-feature-matrix.md 'Deliberately deferred'/gap notes; PRD-ED-189 from the 2026-09-13 pass). No tracker issue implements it. Because the Sane Notes wedge is students-first study, a first-class masking tool that doubles as an active-recall aid is a genuine parity item that also feeds the study epic.

#### Scope
**In:** a Tape tool that draws re-editable opaque/semi-opaque rectangles (and freehand strips) over ink, text, images and PDF; per-strip colour/opacity; tap-to-peek (temporarily reveal) and toggle-all-reveal for study; strips are objects (movable, resizable, deletable) that never destroy the content beneath; strips participate in undo/redo and CRDT sync.
**Out:** true redaction-on-export flattening for privacy (call out as a follow-up); spaced-repetition scheduling (that is the study epic [SN-STDY-004](study.md#sn-stdy-004)); non-destructive stroke mask erase (that is [SN-GCMP-022](editor.md#sn-gcmp-022)).

#### Acceptance criteria
- [ ] Selecting Tape and dragging creates an opaque strip; colour and opacity are adjustable from the dock.
- [ ] Tapping a strip in 'study' mode peeks the content beneath for as long as held (or toggles), then re-masks.
- [ ] A 'reveal all / hide all' control toggles every strip on the current page.
- [ ] Strips are movable/resizable/deletable objects, are covered by undo/redo, and survive sync and export z-order.
- [ ] Content beneath a strip is never modified or lost; deleting a strip fully restores the view.

#### Technical notes
Model Tape as a media/annotation object extension ([SN-MED-002](images-media.md#sn-med-002)) with a `mask` role and reveal state (session-only, not persisted). Render above ink/text/PDF layers in the editor canvas ([SN-ED-002](editor.md#sn-ed-002)). Tool state joins the editor tool state machine. For PDF, strips live in the annotation overlay ([SN-PDF-013](pdf.md#sn-pdf-013)) so the underlying PDF stays intact. Reference PRD-ED-189 and docs/design/screens-and-flows.md editor section.

#### Security & privacy
Masking is visual only by default; document clearly that export does not flatten unless the user chooses redaction, to avoid a false sense of privacy. No content is transmitted. Baseline only otherwise.

#### UX notes
Tape tool icon in the dock toolbox; study 'peek' uses a subtle lift animation honouring Reduce Motion ([SN-A11Y-006](a11y.md#sn-a11y-006)); colours from the palette tokens. Empty state: first use shows a one-line tip.

#### Test plan
Unit: strip object model, reveal-state toggling (test/editor/tape_tool_test.dart). Widget: peek/hide-all controls. Golden: strip over ink/text/PDF across looks. Integration: undo/redo and sync round-trip; content-beneath integrity after delete.

#### Dependencies
[SN-ED-002](editor.md#sn-ed-002), [SN-MED-002](images-media.md#sn-med-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-005

<a id="sn-gcmp-005"></a>

**Add the circle-to-lasso pen gesture**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, android-tablet, ios-phone, android-phone, web |
| Areas | editor, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-004](editor.md#sn-ed-004), [SN-INK-025](ink.md#sn-ink-025) |
| Security controls | — |
| Extra labels | agent-ready, good first issue |

#### Context
Goodnotes lets a user circle content with the pen to instantly select it without switching to the lasso tool - a fast, well-loved shortcut for pen-first editing (docs/research/competitor-feature-matrix.md section 5, 'Circle-to-lasso pen gesture'; PRD-ED-186 from the 2026-09-13 pass). Our lasso selection exists ([SN-ED-004](editor.md#sn-ed-004)) but must be explicitly chosen; the circle-to-lasso gesture is referenced in the editor epic body only as a future cross-ref and has no implementing issue. Adding it removes a tool-switch from the most common selection flow.

#### Scope
**In:** while a pen/writing tool is active, recognising a closed circular/loop stroke drawn around content as an intent to lasso-select the enclosed objects; a short configurable dwell or draw-around heuristic to disambiguate from writing; entering the standard selection state ([SN-ED-004](editor.md#sn-ed-004)) with transform handles; a setting to disable it for users who write loops.
**Out:** the lasso tool itself and its action bar ([SN-ED-004](editor.md#sn-ed-004), [SN-ED-011](editor.md#sn-ed-011)); shape recognition dwell ([SN-SHP-003](shapes-diagrams.md#sn-shp-003)).

#### Acceptance criteria
- [ ] Drawing a closed loop around objects with the pen selects the enclosed strokes/text/images without a tool switch.
- [ ] The gesture never fires mid-word or on open strokes; a closure/area threshold and optional brief dwell disambiguate it.
- [ ] After recognition the standard selection handles and action bar appear (reuses [SN-ED-004](editor.md#sn-ed-004)/[SN-ED-011](editor.md#sn-ed-011)).
- [ ] A settings toggle disables the gesture; when off, loops are treated as ink.
- [ ] The gesture works with palm rejection and does not conflict with two-finger undo or shape dwell.

#### Technical notes
Detect closure via the ink pipeline: RDP-simplify the just-finished stroke, test start/end proximity and enclosed area, then run point-in-polygon against the R-tree ([SN-INK-024](ink.md#sn-ink-024), [SN-INK-025](ink.md#sn-ink-025)) to gather enclosed objects, then hand off to selection ([SN-ED-004](editor.md#sn-ed-004)). Threshold and dwell are configurable in the stylus settings ([SN-SET-007](settings.md#sn-set-007)). Reference PRD-ED-186. Keep detection on the editor thread, not the draw isolate.

#### Security & privacy
None beyond baseline (pure UI interaction).

#### UX notes
Brief highlight of the recognised loop before it converts to a selection marquee; honour left-handed mode ([SN-INK-016](ink.md#sn-ink-016)); no gesture over locked content the user cannot edit.

#### Test plan
Unit: closure/area heuristic, false-positive on open strokes and words (test/editor/circle_to_lasso_test.dart). Widget: hand-off to selection. Integration: gesture + palm rejection + undo coexistence; setting off restores ink.

#### Dependencies
[SN-ED-004](editor.md#sn-ed-004), [SN-INK-025](ink.md#sn-ink-025).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-006

<a id="sn-gcmp-006"></a>

**Build the customizable radial QuickMenu**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | ipad, android-tablet, web |
| Areas | editor, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-ED-005](editor.md#sn-ed-005), [SN-BRS-024](brushes.md#sn-brs-024) |
| Security controls | — |
| Extra labels | needs-design |

#### Context
Notability's Arc menu and CollaNote's 11-slot favourites bar give one-gesture access to tools and colours without traversing the toolbar; it is a documented v2 target in our matrix (docs/research/competitor-feature-matrix.md section 19, 'Radial quick-menu (customizable) -> v2 radial QuickMenu'). The favourites bar ([SN-BRS-024](brushes.md#sn-brs-024)) and palette dock ([SN-ED-005](editor.md#sn-ed-005)) exist, but no issue delivers a summonable radial quick-menu. On tablets this is the fastest expert path and a differentiator over the fixed toolbars of most competitors.

#### Scope
**In:** a radial menu summoned by a configurable trigger (long-press, two-finger tap, or Apple Pencil Pro squeeze where available); user-assignable slots (tools, pens, colours, actions like undo/redo/insert); a customisation editor; adaptive slot count by screen size; dismissal by release or tap-out.
**Out:** the favourites bar itself ([SN-BRS-024](brushes.md#sn-brs-024)); Pencil Pro squeeze binding plumbing ([SN-IPAD-003](input-gestures.md#sn-ipad-003), [SN-ED-025](editor.md#sn-ed-025)) which this consumes as a trigger; phone layout (phones use the bottom-sheet toolbox [SN-PHN-004](editor.md#sn-phn-004)).

#### Acceptance criteria
- [ ] A configurable gesture opens a radial menu at the pen/touch point; releasing on a slot invokes it.
- [ ] Slots are user-customisable (assign tool/pen/colour/action) via an editor, persisted per profile and synced.
- [ ] Slot count adapts to window size class; the menu never overflows the safe area.
- [ ] Works with palm rejection and does not conflict with pan/zoom or two-finger undo.
- [ ] Fully keyboard- and screen-reader-operable as a fallback list menu ([SN-A11Y-009](a11y.md#sn-a11y-009)).

#### Technical notes
Render as an overlay in `app/lib/features/editor`; reuse the favourites/quick-switch model from [SN-BRS-024](brushes.md#sn-brs-024) for slot contents and the dock action registry from [SN-ED-005](editor.md#sn-ed-005). Trigger sources: gesture recognisers plus optional Pencil Pro squeeze ([SN-IPAD-003](input-gestures.md#sn-ipad-003)). Persist slot config in per-profile preferences ([SN-SET-003](settings.md#sn-set-003)). Reference docs/design/screens-and-flows.md editor gestures. Needs a short design pass on radial layout and hit targets.

#### Security & privacy
None beyond baseline. Do not surface actions on locked content the user cannot perform.

#### UX notes
Radial hit-targets meet the 44px minimum ([SN-A11Y-009](a11y.md#sn-a11y-009)); honour Reduce Motion; provide a non-radial fallback menu for accessibility and for pointer users; colours/tools use design-system tokens.

#### Test plan
Unit: slot config persistence + adaptive count (test/editor/radial_quickmenu_test.dart). Widget: open/select/dismiss, customisation editor. Integration: gesture coexistence with pan/zoom/undo. A11y: keyboard + semantics fallback.

#### Dependencies
[SN-ED-005](editor.md#sn-ed-005), [SN-BRS-024](brushes.md#sn-brs-024).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-019

<a id="sn-gcmp-019"></a>

**Implement live ink transclusion (draw once, embed everywhere)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | editor, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-013](study.md#sn-stdy-013), [SN-CORE-005](storage.md#sn-core-005), [SN-ED-004](editor.md#sn-ed-004) |
| Security controls | — |
| Extra labels | innovation, needs-design |

#### Context
Innovation-brief feature F24 [CATEGORY-DEFINING]: lasso a diagram or block of strokes and transclude it live into other notes - one source group that updates everywhere it is embedded (docs/product/innovation-brief.md F24 and Part 4 item 5). No note app transcludes handwritten content live; copy-paste makes dead duplicates that drift. This extends Concepts' drag-out and Paper's canvas clips into a live, syncing reference and is one of the five category-defining bets. Confirmed absent from the tracker (grep for 'transclu' returns nothing).

#### Scope
**In:** mark a lassoed stroke/object group as a reusable source; insert a live transclusion of that source into other notes/pages; edits to the source propagate to every embed; a transclusion is a reference (edge) to the source group, composited at render time; fork-to-copy option; deletion of a source leaves a tombstone + placeholder, never a crash.
**Out:** cross-user transclusion in collaboration (later); the backlink store itself ([SN-STDY-013](study.md#sn-stdy-013)); the selection tooling ([SN-ED-004](editor.md#sn-ed-004)).

#### Acceptance criteria
- [ ] A selected stroke group can be designated a reusable source with a stable id.
- [ ] Inserting a transclusion embeds a live reference; editing the source updates all embeds after sync.
- [ ] A transcluded instance shows it is a reference and offers 'edit source' or 'fork to a copy'.
- [ ] Deleting or losing a source shows a placeholder in embeds (tombstone), with a recover/relink path.
- [ ] Transclusions round-trip through .sanenote export/import and CRDT merge without duplication.

#### Technical notes
Model a transclusion as a Link/edge object ([SN-STDY-013](study.md#sn-stdy-013)) pointing at a content-addressed source stroke group; `sane_render` composites the referenced group at render time; the source group is an immutable stroke set with independent LWW attributes ([SN-CORE-003](sync.md#sn-core-003)). Persist source ids in the .sanenote manifest ([SN-CORE-005](storage.md#sn-core-005)). Anchor to stable opIds, never text offsets. Reference docs/product/innovation-brief.md F24 and docs/research/local-first-sync-and-crdt.md. Needs a design pass on edit-vs-fork semantics.

#### Security & privacy
Respect locked-notebook boundaries: a source in a locked notebook must not render in an unlocked embed. No new egress. Baseline storage; ensure tombstones do not leak deleted content.

#### UX notes
Transclusion badge/outline distinguishing it from native ink; clear edit-source vs fork choice; placeholder state for missing sources; honour Reduce Motion on update.

#### Test plan
Unit: reference model, propagation, tombstone handling (test/editor/transclusion_test.dart). Integration: edit source -> all embeds update after merge; fork isolates; export/import round-trip. CRDT: no duplication under concurrent edits.

#### Dependencies
[SN-STDY-013](study.md#sn-stdy-013), [SN-CORE-005](storage.md#sn-core-005), [SN-ED-004](editor.md#sn-ed-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-021

<a id="sn-gcmp-021"></a>

**Add note-creation replay (session time-lapse over the timeline)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | Backlog |
| Platforms | all |
| Areas | editor, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-021](storage.md#sn-core-021), [SN-AUD-011](audio.md#sn-aud-011), [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | — |
| Extra labels | innovation |

#### Context
Innovation-brief feature F10 [CATEGORY-DEFINING]: replay a page being drawn stroke-by-stroke, optionally over its synced audio - 'watch how this note was built' (docs/product/innovation-brief.md F10 and Part 4 item 4; docs/research/competitor-feature-matrix.md section 18, 'Session time-lapse replay -> later'). Procreate proves the appetite with time-lapse; a note app can do it better because the op-log already records every stroke in order. [SN-AUD-012](audio.md#sn-aud-012) covers ink replay *synced to audio playback*, but there is no standalone note-creation time-lapse with scrub speed/range independent of audio. Confirmed absent (grep 'time-lapse'/'creation replay' returns nothing).

#### Scope
**In:** replay a page's construction by re-applying ops in HLC order; scrub bar with variable speed and a selectable range; optional overlay of synced audio ([SN-AUD-011](audio.md#sn-aud-011)) when present; keyframing/sampling for long pages; a shareable/export-to-video path where the platform allows.
**Out:** per-stroke restore/version-history editing (that is version history [SN-CORE-021](storage.md#sn-core-021)/[SN-SYNC-023](sync.md#sn-sync-023)); audio-synced highlight during normal playback ([SN-AUD-012](audio.md#sn-aud-012)); collaboration replay.

#### Acceptance criteria
- [ ] A page can be replayed stroke-by-stroke from its op-log in correct order.
- [ ] A scrub bar supports variable speed (e.g. 0.5x-8x) and a selectable start/end range.
- [ ] Where a synced recording exists, audio can play alongside the replay in time.
- [ ] Long pages remain smooth via op-stream sampling/keyframing; the draw budget is respected.
- [ ] Replay is read-only and never mutates the note; exiting returns to the current state exactly.

#### Technical notes
Drive replay from the op-log ([SN-CORE-010](sync.md#sn-core-010), [SN-CORE-016](storage.md#sn-core-016)) by re-applying ops through the renderer ([SN-INK-005](ink.md#sn-ink-005)); reuse snapshot ring keyframes ([SN-CORE-021](storage.md#sn-core-021)) to seek without replaying from zero. Audio alignment uses the monotonic record clock ([SN-AUD-004](audio.md#sn-aud-004), [SN-AUD-011](audio.md#sn-aud-011)). Video export is best-effort per platform. Reference docs/product/innovation-brief.md F10. Shares the replay engine intent with F13 version history.

#### Security & privacy
Read-only over local data; respect locked-notebook rules. Video export leaves the device only on explicit user action. Baseline otherwise.

#### UX notes
Replay overlay with scrub, speed and range controls; honour Reduce Motion (offer a stepped/paused mode); clear 'replay is read-only' affordance.

#### Test plan
Unit: op-replay ordering + keyframe seek (test/editor/note_replay_test.dart). Widget: scrub/speed/range controls. Perf: long-page replay within the draw budget. Integration: audio-aligned replay; exit restores exact state.

#### Dependencies
[SN-CORE-021](storage.md#sn-core-021), [SN-AUD-011](audio.md#sn-aud-011), [SN-INK-005](ink.md#sn-ink-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-022

<a id="sn-gcmp-022"></a>

**Add nudge-to-reshape, slice-to-split and non-destructive mask erase**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | Backlog |
| Platforms | all |
| Areas | editor, ink |
| Size | L |
| SDLC | implementation |
| Parent | [SN-ED-001](editor.md#sn-ed-001) |
| Depends on | [SN-CORE-019](sync.md#sn-core-019), [SN-ED-004](editor.md#sn-ed-004), [SN-INK-004](ink.md#sn-ink-004) |
| Security controls | — |
| Extra labels | innovation |

#### Context
Innovation-brief feature F16: drag an existing stroke to reshape it like a string, slice with width 0 to split a stroke in two, and mask-erase that hides ink while keeping it recoverable (docs/product/innovation-brief.md F16; docs/research/competitor-feature-matrix.md section 4, 'Non-destructive mask erase (recoverable) -> later'). Note-app erasers are destructive; only vector drawing apps (Concepts) offer nudge/slice/mask. Image masking exists ([SN-MED-007](images-media.md#sn-med-007)) but no stroke-level nudge/slice/mask-erase exists in the tracker. This makes editing forgiving and is a differentiator.

#### Scope
**In:** nudge - drag part of a stroke to reshape it; slice - a width-0 cut that splits one stroke into two independent strokes; mask-erase - a recoverable hide of ink (and highlighter) that can be un-hidden, so an accidental scrub never destroys content; all three integrate with undo/redo and CRDT sync.
**Out:** the destructive precision/stroke erasers ([SN-BRS-019](brushes.md#sn-brs-019)); image mask ([SN-MED-007](images-media.md#sn-med-007)); selection tooling ([SN-ED-004](editor.md#sn-ed-004)).

#### Acceptance criteria
- [ ] Nudge reshapes a stroke by dragging without redrawing; the change is undoable and syncs.
- [ ] Slice at width 0 splits a stroke into two independently selectable/editable strokes.
- [ ] Mask-erase hides ink but the content is recoverable via un-hide (and via version history [SN-CORE-021](storage.md#sn-core-021)).
- [ ] Mask state merges cleanly under CRDT (it is an attribute, not a deletion) with no lost strokes.
- [ ] All three respect palm rejection and do not conflict with pan/zoom or writing.

#### Technical notes
Implement nudge as an explicit geometry-edit op or a derived stroke referencing the original (cache original samples so any pen can re-render) - do not silently mutate the immutable capture; slice creates two stroke objects sharing provenance; mask-erase is an LWW 'hidden' attribute (not a tombstone) so it merges and is reversible, consistent with the ink erase CRDT semantics ([SN-CORE-019](sync.md#sn-core-019)). Geometry via [SN-INK-004](ink.md#sn-ink-004)/[SN-INK-026](ink.md#sn-ink-026). Reference docs/product/innovation-brief.md F16 and docs/research/local-first-sync-and-crdt.md section 3.

#### Security & privacy
Mask-erase must be clearly non-destructive; document that a masked stroke still exists in the file (not redaction) to avoid a false privacy assumption. Baseline otherwise.

#### UX notes
Distinct tool affordances for nudge/slice/mask; un-hide affordance for masked ink; honour left-handed mode and Reduce Motion; make 'this hides, does not delete' obvious.

#### Test plan
Unit: nudge geometry op, slice split, mask attribute + merge (test/editor/nudge_slice_mask_test.dart). Integration: undo/redo, CRDT merge no-loss, un-hide restores. Golden: reshaped/sliced/masked strokes across looks.

#### Dependencies
[SN-CORE-019](sync.md#sn-core-019), [SN-ED-004](editor.md#sn-ed-004), [SN-INK-004](ink.md#sn-ink-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-011

<a id="sn-gipad-011"></a>

**Keep a notebook coherent when it is open in two iPad windows at once**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | editor, compat, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-011](compat.md#sn-ipad-011), [SN-ED-003](editor.md#sn-ed-003), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-STORAGE-2`, `CWE-362` |
| Extra labels | agent-ready, needs-design |

#### Context
[SN-IPAD-011](compat.md#sn-ipad-011) adopts additive windowing — a scene per note — and [SN-IPAD-010](compat.md#sn-ipad-010) adapts layout to Split View and Stage Manager. Neither answers the question iPadOS 26 users will hit on day one: **what happens when the same notebook is open in two windows**, side by side, with a Pencil in one and a keyboard in the other? That is the natural way to compare two pages, and it is a correctness problem, not a layout problem: two scenes sharing one document must share one CRDT instance and one storage isolate, while keeping per-window undo, selection, tool state, viewport and page position. Getting it wrong produces the worst possible bug class — silently diverging or lost strokes — so it needs its own issue with its own tests.

#### Scope
**In:** a scene-aware document-session layer that vends one shared `sane_core` document + repository per (profile, notebook) with reference counting across scenes; per-scene UI state (tool, colour, selection, viewport, current page, focus mode); a decision and implementation for undo scope (default: per page as [SN-ED-003](editor.md#sn-ed-003) specifies, with the stack shared by page across windows, and an explicit rule for undoing another window's edit); live propagation so an edit in window A repaints window B within one frame budget; safe teardown when one window closes or the app is backgrounded; the same rules applied when a notebook is open in a window *and* referenced by a widget/Quick Note deep link; routing a deep link to an existing scene instead of opening a duplicate.
**Out:** cross-device concurrency ([SN-SYNC-006](sync.md#sn-sync-006)); real-time collaboration ([SN-COL-004](collaboration.md#sn-col-004)); the windowing adoption itself ([SN-IPAD-011](compat.md#sn-ipad-011)); Android multi-instance ([SN-AND-013](compat.md#sn-and-013)).

#### Acceptance criteria
- [ ] Opening the same notebook in a second window reuses the existing document instance (asserted by identity in an integration test), not a second store — memory does not double ([SN-GIPAD-007](perf.md#sn-gipad-007)).
- [ ] A stroke drawn in window A appears in window B within 2 frames at 120 Hz when both show the same page; when they show different pages, neither repaints unnecessarily.
- [ ] Undo in window B behaves per the documented rule and never resurrects or deletes content the user did not act on; a property test over interleaved two-window edit/undo sequences ends in a single converged document with no orphaned strokes.
- [ ] Closing one window leaves the other fully functional; closing the last window flushes and releases the store; force-quitting mid-stroke loses at most the in-flight stroke ([SN-CORE-026](storage.md#sn-core-026)).
- [ ] Tool, colour, selection and zoom are independent per window and restored per scene after termination ([SN-IPAD-028](editor.md#sn-ipad-028)).
- [ ] A Spotlight/Handoff/widget deep link to a notebook already open activates that scene rather than creating a third window, unless the user explicitly asks for a new window.
- [ ] The same guarantees hold when one window is in Slide Over and the other is full screen.

#### Technical notes
Implement the session registry in `packages/sane_app`/`app/` over the storage isolate from [SN-CORE-004](storage.md#sn-core-004); the isolate is the single writer, so cross-scene coherence is a subscription problem, not a locking problem — but reference counting, disposal and stream fan-out are where races appear (CWE-362). If the Flutter multi-view spike ([SN-IPAD-009](compat.md#sn-ipad-009)) concludes that native scenes are not feasible, apply the identical rules to in-app tabs ([SN-ED-029](editor.md#sn-ed-029)) and record it in ADR-0001.

#### Security & privacy
A second window must respect the same gates as the first: a locked notebook opened in window B still requires the biometric gate ([SN-SEC-020](security.md#sn-sec-020)), and a profile switch must not leave another profile's document live in a second scene (MASVS-PLATFORM-1, [SN-AUTH-013](auth.md#sn-auth-013)). Torn writes from concurrent scene teardown are a data-integrity threat (MASVS-STORAGE-2).

#### UX notes
Windows carry the notebook title as the scene name ([SN-IPAD-011](compat.md#sn-ipad-011)) and a subtle page indicator so two windows of one notebook are distinguishable in the app menu's window list. No "this note is open elsewhere" warnings — it simply works. Selection highlights are local to a window so one user's lasso does not flash in the other.

#### Test plan
Unit: `packages/sane_app/test/document_session_registry_test.dart` (ref counting, disposal, double-open). Property: `test/property/two_window_edit_undo_test.dart` over interleaved operations. Integration: `integration_test/multi_window_test.dart` driving two scenes with `patrol` on iPadOS 26. Manual: Stage Manager with two windows plus an external display, per docs/platform/ipad.md §7.

#### Dependencies
[SN-IPAD-011](compat.md#sn-ipad-011), [SN-ED-003](editor.md#sn-ed-003), [SN-CORE-004](storage.md#sn-core-004), [SN-IPAD-009](compat.md#sn-ipad-009).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-001

<a id="sn-gphn-001"></a>

**Collapse the editor top toolbar into a compact bar with overflow on phones**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | editor, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-002](compat.md#sn-phn-002), [SN-ED-006](editor.md#sn-ed-006), [SN-ED-030](editor.md#sn-ed-030) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-1`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
The editor top toolbar built by [SN-ED-006](editor.md#sn-ed-006) carries a large action set: sidebar toggle, back-to-library, the notebook/page title block, undo, redo, bookmark, audio, import PDF, paper & templates, share, pages (wide only) and focus (docs/design/screens-and-flows.md §7.1). That is designed for the iPad reference frame (1180x820) and does not fit the compact width of a phone, where docs/design/ux-principles.md §8 requires the editor to be full-bleed with the page rail hidden and the chrome reflowed. [SN-ED-030](editor.md#sn-ed-030) provides the adaptive layout provider and the "shared API the toolbar/dock/rail read", but it explicitly excludes the phone editor's own feature set — no issue actually implements the compact toolbar. This is that issue.

On a phone the toolbar must keep the highest-frequency actions inline (back, title, undo, redo) and move the rest behind a single overflow control, while the title block truncates gracefully and the "Pages" affordance defers to the bottom-sheet page picker from [SN-PHN-003](design-system.md#sn-phn-003). Focus mode still hides the whole bar ([SN-ED-018](editor.md#sn-ed-018)).

#### Scope
**In:** the compact layout branch of `SaneEditorToolbar`; the inline action set for phones (back, title block, undo, redo) plus a single overflow (…) menu holding bookmark, audio, import PDF, paper & templates, share and focus; title-block truncation and the page indicator; safe-area/edge-to-edge insets at the top; the empty-stack dimming of undo/redo preserved.
**Out:** the adaptive layout provider and size-class resolution ([SN-ED-030](editor.md#sn-ed-030), [SN-PHN-002](compat.md#sn-phn-002)); the palette dock reflow ([SN-PHN-004](editor.md#sn-phn-004)); the bottom-sheet page picker ([SN-PHN-003](design-system.md#sn-phn-003)); the audio bar internals (SN-AUD); and the overlay destinations themselves (SN-PDF/SN-TPL/SN-SHR).

#### Acceptance criteria
- [ ] On the compact class the top toolbar shows only back, title block, undo and redo inline, plus one overflow (…) button; medium and above render the full [SN-ED-006](editor.md#sn-ed-006) toolbar unchanged.
- [ ] The overflow menu lists bookmark, audio, import PDF, paper & templates, share and focus, each with an icon, label and correct enabled/disabled state, and dismisses back to the (…) trigger with focus restored.
- [ ] The title block truncates the notebook and PDF name with an ellipsis and never pushes the undo/redo group off-screen at 320 dp width.
- [ ] Undo and redo dim to 0.35 opacity when their stacks are empty, exactly as on tablet.
- [ ] Bookmark, audio (tinted while open, red glyph while recording) and focus toggles reflect live state inside the overflow menu.
- [ ] The toolbar respects top safe-area insets under enforced edge-to-edge (docs/platform/android.md §7) and does not overlap the status bar or a display cutout.
- [ ] Every control is >= 44x44 pt / 48x48 dp with a `Semantics` label; the overflow button announces "More actions".
- [ ] Opening the overflow menu drops no frame at 60 fps on the Android-lowend reference device and never repaints the wet-ink layer.
- [ ] Renders correctly in all 17 looks, light and dark, with radius/shadow/inset from tokens only.

#### Technical notes
Add a compact branch to `packages/sane_ui`'s editor toolbar (`SaneEditorToolbar`) driven by the size class from [SN-PHN-002](compat.md#sn-phn-002) — a layout branch, not a second widget, so semantics and tokens stay shared (docs/design/component-inventory.md §3). The overflow menu uses the app-level menu/sheet helper with `useSafeArea: true`. Action dispatch stays in `app/lib/editor/` and is identical to the wide toolbar; only presentation differs. Keep the toolbar outside the canvas `RepaintBoundary` so opening the menu cannot repaint the ink surface (CLAUDE.md §8). Do not branch on `Platform.isIOS`; consume the size-class provider.

#### Security & privacy
None beyond baseline, with one control worth naming: **T-TITLE-DISCLOSURE** — the title block renders the notebook name, which is note-derived metadata. On the task-switcher snapshot or a locked device this must be covered by the existing screenshot/lock deterrent applied at the shell ([SN-PHN-015](security.md#sn-phn-015)), not re-implemented here (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200). Baseline: the toolbar logs no titles, ids or note content; `print()` is banned and only `SaneLog` with redaction is used (MASVS-PRIVACY-1, CWE-532). No new permission or network egress.

#### UX notes
Source: docs/design/screens-and-flows.md §7.1 (top toolbar) and §7.8 (focus mode). The compact bar keeps the page-is-the-hero principle (ux-principles.md §2): fewer visible controls, depth behind the overflow (progressive disclosure, §3). Motion: the overflow menu enters at 200-300 ms ease-out, cross-fade under Reduce Motion (§6). Errors and confirmations remain toasts, never red inline text (§4.3). The active/selected state uses `--ac`/`--aci` and is never colour-only. The design blocker on the watermarked mascot art does not apply (no mascot in the toolbar).

#### Test plan
- `packages/sane_ui/test/editor/editor_toolbar_compact_test.dart` — inline set on compact, full set on medium+, overflow contents, disabled-stack dimming.
- `packages/sane_ui/test/golden/editor_toolbar_compact_golden_test.dart` — goldens per look family (Paper, Minimalism, Pop, Neumorphism, Brutalism), light and dark, at 390x844.
- `app/test/editor/toolbar_overflow_dispatch_test.dart` — every overflow action dispatches to the same handler as the wide toolbar; focus returns to the trigger.
- `app/test/shell/toolbar_reflow_320_test.dart` — no horizontal overflow at 320 dp with textScaler 2.0.

#### Dependencies
[SN-PHN-002](compat.md#sn-phn-002), [SN-ED-006](editor.md#sn-ed-006), [SN-ED-030](editor.md#sn-ed-030)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-002

<a id="sn-gphn-002"></a>

**Handle on-screen keyboard insets and keep the active field visible on phones**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | editor, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-003](design-system.md#sn-phn-003), [SN-ED-013](editor.md#sn-ed-013), [SN-TXT-006](text.md#sn-txt-006) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-CODE-2` |
| Extra labels | agent-ready |

#### Context
On a phone the software keyboard occupies roughly 40-50% of the screen, which the tablet design never has to contend with. Whenever the user types — editing a text box on the canvas ([SN-ED-013](editor.md#sn-ed-013)), naming a notebook, entering a search query, typing an invite email in Share, or entering the +91 number and OTP at login — the focused field, its inline action bar and the caret MUST stay visible above the keyboard, and the surrounding chrome (palette dock, bottom navigation) MUST yield rather than be covered or push the field off-screen. This is a cross-cutting phone layout foundation that no current issue owns: [SN-TXT-006](text.md#sn-txt-006) handles IME/composition and [SN-ED-013](editor.md#sn-ed-013) builds the text-edit bar, but neither addresses keyboard-inset layout or scroll-into-view, and docs/platform/phones.md §7 requires bottom-anchored input to remain reachable.

#### Scope
**In:** a shared keyboard-inset layout foundation for the phone shell that reads the animated keyboard/view insets, scrolls the active editable element (and its inline bar) into the visible region above the keyboard, temporarily hides or floats the bottom navigation and re-anchors the palette dock / text-edit bar above the keyboard, and restores the previous layout on dismiss; application of this foundation to the canvas text box, the notebook-name field, the Search field, the Share invite field and the login phone/OTP fields.
**Out:** the IME/composition and dictation bridge ([SN-TXT-006](text.md#sn-txt-006)); the text-edit bar's own contents ([SN-ED-013](editor.md#sn-ed-013)); the bottom-chrome stacking order ([SN-GPHN-003](editor.md#sn-gphn-003)); and hardware-keyboard shortcuts ([SN-ED-022](editor.md#sn-ed-022)).

#### Acceptance criteria
- [ ] Focusing any single-line or multi-line field on a phone scrolls it fully into view above the keyboard within one animation frame of the keyboard appearing, with a small margin so the caret is never flush against the keyboard.
- [ ] While a canvas text box is being edited, the text-edit bar re-anchors directly above the keyboard and the edited box remains visible; on dismiss the canvas returns to its prior viewport without a scroll jump.
- [ ] The bottom navigation does not overlap a focused field; it is hidden or offset while the keyboard is open and restored on dismiss.
- [ ] The layout follows the keyboard's own show/hide animation (no snap) and does not overshoot or leave a gap when the keyboard height changes (e.g. an accessory bar or a different keyboard height).
- [ ] Rotating to landscape with the keyboard open keeps the field visible and does not clip it.
- [ ] Works at 200% Dynamic Type and at 320 dp width with no two-dimensional scroll (WCAG 1.4.10) and no clipped controls.
- [ ] The foundation is applied uniformly: the same behaviour is observable at the canvas text box, notebook rename, Search, Share invite and the login OTP field.
- [ ] No dropped frame at 60 fps on the Android-lowend device while the keyboard animates.

#### Technical notes
Add `app/lib/shell/keyboard_insets.dart` exposing the animated bottom inset via `MediaQuery.viewInsetsOf` and a `KeyboardAware` wrapper that combines a scroll-into-view controller with a `SafeArea`/`AnimatedPadding` region; drive it from `WidgetsBindingObserver`/`didChangeMetrics` so it tracks the platform animation. Reuse Flutter's `Scrollable.ensureVisible` for the focused element and keep the wet-ink layer outside the resized region so the canvas viewport transform is restored exactly (page geometry is fixed at 800x1040 units — docs/design/ux-principles.md §8). Do not resize via a naive `resizeToAvoidBottomInset` that would repaint the ink surface. Consume the size class from [SN-PHN-002](compat.md#sn-phn-002); never branch on platform identity (CLAUDE.md §8).

#### Security & privacy
None beyond baseline. Baseline that applies: text being entered is note content or account data; nothing typed (field values, search terms, invite emails, OTP digits) may be logged, and the scroll-into-view path must not emit `SaneLog` records carrying field contents (CLAUDE.md §7.3; MASVS-PRIVACY-1, CWE-532). The OTP and phone fields must keep `autocorrect` off and use the secure/one-time-code content types already specified in [SN-ONB-003](onboarding.md#sn-onb-003); this issue must not weaken those. The keyboard-inset fallback (when the platform reports no animation) must fail to a safe visible-field state, tested as an explicit branch, not a silent default (MASVS-CODE-2). No new permission or egress.

#### UX notes
Surfaces: the editor text-edit bar (docs/design/screens-and-flows.md §7.5), the Library header rename, the Search field (§11), the Share invite field (§10) and the Login phone/OTP steps (§3). The motion must match the keyboard, per ux-principles.md §6 (motion is interruptible and never fights the system); under Reduce Motion the field simply appears in place with no slide. No dead ends: if a field cannot be fully revealed (very small landscape), the field takes priority over decorative chrome. a11y: screen-reader focus and visual focus stay on the same element; the active field is announced and reachable by Switch/Voice Control (PRD-CO-332).

#### Test plan
- `app/test/shell/keyboard_insets_test.dart` — simulate `viewInsets` changes; the focused field scrolls into view and the bottom nav yields, then restores on dismiss.
- `app/test/editor/text_edit_bar_keyboard_test.dart` — the text-edit bar re-anchors above the keyboard and the edited box stays visible; viewport restored on Done.
- `app/test/shell/keyboard_insets_landscape_test.dart` — field stays visible in landscape with the keyboard open at 200% text scale.
- `app/integration_test/phone_typing_flows_test.dart` — patrol run: type in canvas text, Search, Share invite and OTP; assert the field is never covered.

#### Dependencies
[SN-PHN-003](design-system.md#sn-phn-003), [SN-ED-013](editor.md#sn-ed-013), [SN-TXT-006](text.md#sn-txt-006)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-003

<a id="sn-gphn-003"></a>

**Coordinate the phone bottom-chrome stack so bars never overlap**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | editor, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-004](editor.md#sn-phn-004), [SN-ED-011](editor.md#sn-ed-011) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The phone puts every important control in the bottom third for one-handed reach (docs/platform/phones.md §7), but that same region is contested by several stacked bars that on a tablet have room to spread out: the bottom navigation ([SN-PHN-003](design-system.md#sn-phn-003)), the palette dock ([SN-PHN-004](editor.md#sn-phn-004)), the audio recorder bar (SN-AUD-010), the selection action bar ([SN-ED-011](editor.md#sn-ed-011), shown on a lasso selection) and the text-edit bar ([SN-ED-013](editor.md#sn-ed-013)). On a 390 dp-wide phone these can appear at once and, without a coordinator, will overlap the home indicator, cover each other, or hide the active writing line. docs/design/screens-and-flows.md §7 defines each bar independently; no issue defines how they stack on a phone. This issue is that coordinator.

#### Scope
**In:** a single bottom-chrome layout coordinator for the phone editor that assigns a deterministic vertical order and visibility policy to the bottom navigation, palette dock, audio bar, selection action bar and text-edit bar; the rule set for which bars are mutually exclusive (e.g. selection bar replaces the palette essentials while a selection exists; text-edit bar takes precedence while editing) versus stacked; safe-area handling above the gesture bar/home indicator; and coordination with the keyboard-inset foundation from [SN-GPHN-002](editor.md#sn-gphn-002).
**Out:** the individual bars' contents (owned by [SN-PHN-004](editor.md#sn-phn-004), [SN-ED-011](editor.md#sn-ed-011), [SN-ED-013](editor.md#sn-ed-013), SN-AUD-010); keyboard scroll-into-view mechanics ([SN-GPHN-002](editor.md#sn-gphn-002)); the top toolbar ([SN-GPHN-001](editor.md#sn-gphn-001)); and compact-height/landscape rules ([SN-GPHN-008](compat.md#sn-gphn-008)).

#### Acceptance criteria
- [ ] Only one of {palette essentials, selection action bar, text-edit bar} occupies the primary bottom slot at a time, chosen by a documented precedence (text-edit > selection > palette), and switching between them is animation-clean with no overlap frame.
- [ ] The audio recorder bar, when open, stacks above the primary bottom slot and neither covers it nor the bottom navigation.
- [ ] No bar ever overlaps the home indicator / gesture bar; all bottom insets come from `viewPadding`, never a hardcoded height.
- [ ] When the keyboard opens, the active bar re-anchors above it via [SN-GPHN-002](editor.md#sn-gphn-002) and lower-priority bars hide; on dismiss the prior stack is restored exactly.
- [ ] The active writing line is never covered by the bottom-chrome stack by more than 40% of the viewport height in any combination of bars.
- [ ] Entering and leaving focus mode collapses the whole stack to nothing and restores it (behaviour from [SN-ED-018](editor.md#sn-ed-018)).
- [ ] Every bar keeps its >= 44x44 pt / 48x48 dp targets and `Semantics` in every combination.
- [ ] The full stack (nav + audio + selection) renders without a dropped frame at 60 fps on Android-lowend and reads correctly in all 17 looks and dark mode.

#### Technical notes
Add `app/lib/editor/bottom_chrome.dart` with a `BottomChromeController` (Riverpod, ADR-0003) that owns the ordered slot model and a `BottomChromeStack` widget that lays the bars out with `Column`/`Wrap` under a single `SafeArea`. The precedence and mutual-exclusion rules are data (a small state machine), so a new bar cannot be added without declaring where it sits — a Dart 3 sealed slot enum makes an unhandled bar a compile error. Read the keyboard inset from [SN-GPHN-002](editor.md#sn-gphn-002) rather than re-observing metrics. Keep the stack outside the canvas `RepaintBoundary`. Consume the size class from [SN-PHN-002](compat.md#sn-phn-002); do not branch on platform identity (CLAUDE.md §8).

#### Security & privacy
None beyond baseline — this is chrome layout. Baseline: the coordinator carries no note content and must not log bar-visibility telemetry tied to a document (no analytics SDK; telemetry opt-in and off by default — CLAUDE.md §7.4, MASVS-PRIVACY-1). The selection bar surfaces Pro actions (convert/solve) that route Free users to Upgrade ([SN-ED-011](editor.md#sn-ed-011)); the coordinator must not change that gating. No new permission, sensor or network egress.

#### UX notes
Source: docs/design/screens-and-flows.md §7.3 (palette dock), §7.4 (selection bar), §7.5 (text-edit bar), §7.6 (audio bar), plus the bottom navigation from [SN-PHN-003](design-system.md#sn-phn-003). The result must feel calm and predictable (ux-principles.md §2): bars appear where the thumb already is and never jump. Motion: bar transitions 150-200 ms, cross-fade under Reduce Motion (§6); ink is never animated. The toast still floats bottom-centre above the whole stack (§2). a11y: focus order follows visual order top-to-bottom within the stack; a screen reader announces the newly presented bar (e.g. "3 strokes selected").

#### Test plan
- `app/test/editor/bottom_chrome_precedence_test.dart` — text-edit > selection > palette precedence; audio stacks above; no overlap in any combination.
- `app/test/editor/bottom_chrome_safearea_test.dart` — all bars clear the home indicator using injected `viewPadding`.
- `app/test/editor/bottom_chrome_keyboard_test.dart` — active bar re-anchors above the keyboard and restores on dismiss.
- `app/test/golden/phone/bottom_chrome_golden_test.dart` — goldens for nav+audio+selection per look family, light and dark.
- `app/integration_test/phone_bottom_chrome_test.dart` — patrol run exercising selection, text edit and recording together on a 6.1-inch profile.

#### Dependencies
[SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-004](editor.md#sn-phn-004), [SN-ED-011](editor.md#sn-ed-011)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-IPAD-028

<a id="sn-ipad-028"></a>

**Restore editor and scene state after termination and window reconnection**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | editor, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-010](compat.md#sn-ipad-010), [SN-IPAD-011](compat.md#sn-ipad-011), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `MASVS-AUTH-1`, `CWE-312` |
| Extra labels | agent-ready |

#### Context
iPadOS aggressively suspends and terminates background scenes, and with Stage Manager and additive windowing a user can have several Sane Notes windows that the system reconnects at will. docs/platform/compatibility-matrix.md §5 makes the requirement explicit: the window size class *"changes at runtime (rotation, multi-window, fold/unfold, window resize, iPadOS 26 windowing) and MUST re-lay-out without losing editor state"*, and docs/platform/ipad.md §7 requires each window to carry a descriptive, restorable identity. [SN-IPAD-010](compat.md#sn-ipad-010) preserves state across a live resize and [SN-IPAD-011](compat.md#sn-ipad-011) gives each note its own scene, but neither covers the case that actually loses work in the field: the app is killed while backgrounded and the user taps the app switcher expecting their page, tool and scroll position to still be there. Because Sane Notes is local-first (device is the system of record, [ADR-0004](docs/adr/0004-local-first-zero-server.md)), restoration is entirely local — but the restoration payload is OS-managed storage and therefore must never contain note content.

#### Scope
**In:** per-scene state restoration — for each `UISceneSession`, persist an opaque restoration record (notebook id, page id, active tool + brush id, zoom/scroll viewport, selection id list) and rehydrate it on scene reconnection or cold launch; version the record and fall back safely when it is stale or corrupt; honour app/notebook/note locks on restore; restore each window independently.
**Out:** live resize/size-class reflow ([SN-IPAD-010](compat.md#sn-ipad-010)); scene creation and window naming ([SN-IPAD-011](compat.md#sn-ipad-011)); the undo stack's own persistence ([SN-ED-003](editor.md#sn-ed-003)); Android/web equivalents (their areas).

#### Acceptance criteria
- [ ] Kill the app from the switcher and relaunch: the previously open notebook, page, active tool, brush and zoom/scroll viewport are restored, and the restored editor is interactive within the cold-start budget (< 1.5 s on iPad, docs/platform/performance-budgets.md).
- [ ] With two windows open, each restores its own note independently; neither window's state overwrites the other's.
- [ ] A restoration record referencing a deleted/moved notebook or page resolves to the library home with a non-blocking toast — never a crash, never a blank canvas.
- [ ] A **locked** notebook/note restores to the lock prompt, not to content; nothing of it is rendered before the biometric/passphrase gate passes (PRD-LOCK-006).
- [ ] The persisted record contains only opaque ids and view state — an automated test asserts no stroke data, note text, titles, tokens or file paths appear in it (CLAUDE.md §7.3).
- [ ] A record written by an older schema version is discarded cleanly (version field checked) rather than mis-parsed.

#### Technical notes
Implement scene-state hand-off in Swift (`stateRestorationActivity` / `NSUserActivity` per `UISceneSession`) and mirror it into the Dart layer through the existing app scene channel from [SN-IPAD-011](compat.md#sn-ipad-011); hold the authoritative record in `app/` Riverpod state and persist the durable half through the storage isolate on `sane_core`'s drift database ([SN-CORE-004](storage.md#sn-core-004)), not in `UserDefaults` beyond the small pointer the OS needs ([ADR-0003](docs/adr/0003-state-management-and-app-structure.md), [ADR-0005](docs/adr/0005-document-model-and-crdt.md)). Restoration work must not run on the hot draw path and must not block first frame — hydrate the viewport before the ink layer and let strokes stream in (CLAUDE.md §8). Note that any `UserDefaults` access is a **required-reason API** and must be covered by the declaration in [SN-IPAD-021](privacy.md#sn-ipad-021).

#### Security & privacy
The restoration payload lives in OS-managed storage that is included in device backups and readable by anyone who can unlock the device, so it is a classic cleartext-storage sink (CWE-312, MASVS-STORAGE-1): store opaque ids only, never titles or content, and apply `FileProtectionType.complete` to anything Sane Notes writes itself (docs/platform/ipad.md §8). Restoring must not bypass the lock gate — a scene that restores a locked notebook shows the lock screen and no preview, including in the app-switcher snapshot (MASVS-AUTH-1, MASVS-PRIVACY-2, PRD-LEAK-001). Corrupt records are untrusted input: validate the schema and fail closed to the library home.

#### UX notes
Restoration should be invisible when it works: the editor comes back where the user left it (design/Sane Notes.dc.html editor screen; docs/design/screens-and-flows.md §7). Provide a skeleton/loading state using design tokens while the page hydrates, the standard "notebook not found" empty state when it cannot, and the lock screen when the target is locked — all in the 17 looks plus light/dark. Announce the restored page to VoiceOver on first frame so a screen-reader user knows where they are; respect Reduce Motion (no animated re-entry).

#### Test plan
Unit: `app/test/platform/scene_restoration_record_test.dart` (serialise/deserialise, version mismatch discarded, **no content in payload** assertion). Widget: `app/test/platform/restore_locked_note_test.dart` (locked target ⇒ lock prompt, no preview). Integration: `app/integration_test/scene_restoration_test.dart` via `patrol` (two windows, kill, relaunch, both restore; deleted-notebook fallback). Perf: cold-start-with-restore measured in `tools/perf_harness` scenario `ipad_cold_start`.

#### Dependencies
[SN-IPAD-010](compat.md#sn-ipad-010) multitasking layout adaptation; [SN-IPAD-011](compat.md#sn-ipad-011) additive windowing/scenes; [SN-CORE-004](storage.md#sn-core-004) SQLite persistence.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-PHN-004

<a id="sn-phn-004"></a>

**Collapse the palette dock to six favourites with a bottom-sheet toolbox**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | editor, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-002](compat.md#sn-phn-002), [SN-ED-005](editor.md#sn-ed-005), [SN-BRS-002](brushes.md#sn-brs-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The palette dock is a dockable, reflowing element: a 6-dot grip drags it and it snaps to the nearest edge, laying out as a row on bottom/top and a column on left/right (docs/design/screens-and-flows.md §7.3, docs/design/design-system.md §Tool palette). On a phone that full toolbar cannot fit in thumb reach, so docs/platform/phones.md §3 specifies a precise reflow: default to a **single bottom row** above the home indicator, **collapse to essentials** — pen, highlighter, eraser, colour, undo — with an expander (…) opening a bottom-sheet full toolbox; open colour and brush pickers as **bottom sheets, not side popovers**; and do **not** dock left/right by default because a vertical column wastes narrow width and is a two-handed reach (allow it as an option).

This is the concrete application of progressive disclosure (docs/design/ux-principles.md §3): the outermost layer is the quick palette of 5–6 tools the user actually reaches for; tool secondary options are one tap down; Brush Studio and the full colour picker are deliberate. Limitation P3 in phones.md §9 names the risk this closes — a small screen hides the full toolbox and kills feature discoverability.

#### Scope
**In:** the compact layout of `SaneToolPalette` (six favourite slots + overflow), the favourites model and its per-profile persistence, the bottom-sheet full toolbox, bottom-sheet colour and width/brush pickers, the 'bottom by default, left/right allowed but not default' docking policy on compact, and safe-area handling.
**Out:** the dock/drag machinery and tablet layout ([SN-ED-005](editor.md#sn-ed-005)), the brush parameter schema ([SN-BRS-002](brushes.md#sn-brs-002)), Brush Studio itself, and the thumb-zone audit of other surfaces ([SN-PHN-019](a11y.md#sn-phn-019)).

#### Acceptance criteria
- [ ] On the compact class the dock renders a single bottom row of exactly six slots: pen, highlighter, eraser, colour, undo, and an overflow (…) — matching phones.md §3.
- [ ] Tapping (…) opens a bottom-sheet toolbox listing every remaining tool (lasso, shape, text, image, page nav, redo, focus) with labels, reachable one-handed; dismissing it returns focus to the (…) button.
- [ ] Tapping the colour slot opens a bottom sheet showing the active palette — INK (6 colours) or HL (4) — with the selected swatch double-ringed; picking an ink colour while on eraser/lasso/image snaps the tool back to pen (screens §7.3 behaviour preserved).
- [ ] Width selection offers the three widths (1.6 / 2.6 / 4.4 page units) in the same sheet; choosing a width while the highlighter is active switches back to pen.
- [ ] The six favourites are user-reorderable and persist per profile across restarts; a reset-to-default action exists.
- [ ] Default dock on compact is bottom; left/right is selectable from Settings → Handwriting & stylus → Toolbar position but is never the default, and top remains available.
- [ ] The dock sits above the gesture bar/home indicator with correct safe-area insets and never overlaps the audio bar or selection bar.
- [ ] Every dock button is >= 44×44 pt / 48×48 dp with a `Semantics` label and a distinct selected state that is not colour-only (PRD-CO-311, PRD-CO-320).
- [ ] Opening or dismissing a sheet costs no dropped frame at 60 fps on Android-lowend, and the sheet never covers the active writing line by more than 40% of the viewport height.
- [ ] Renders correctly in all 17 looks, light and dark, with radius/shadow/inset driven only by tokens (including the neumorphic inset-on-press).

#### Technical notes
Extend `packages/sane_ui/lib/src/editor/sane_tool_palette.dart` with a compact layout variant driven by the size class from [SN-PHN-002](compat.md#sn-phn-002) — a layout branch, not a second widget, so tokens and semantics stay shared (docs/design/component-inventory.md §7 `SaneToolPalette`, `SaneToolButton`, `SaneColorRow`, `SaneWidthRow`, `SanePageNav`). Favourites live in the editor tool state in `app/lib/editor/` as an immutable value object persisted through the profile preferences repository (`sane_core` repository interface; ADR-0005) — `sane_ui` must stay a leaf and own no persistence. Sheets use the app-level sheet helper with `useSafeArea: true` and `showDragHandle` mapped to the look's grip treatment. Honour `prefs.leftHanded` by mirroring slot order. Do not enable `GestureBinding.resamplingEnabled` and keep the dock outside the canvas `RepaintBoundary` so opening a sheet cannot repaint the wet-ink layer (CLAUDE.md §8).

#### Security & privacy
None beyond baseline — this is chrome layout. Baseline that still applies: the palette must not log tool, colour or stroke telemetry (no note content, no ink coordinates, no analytics SDK; telemetry is opt-in and off by default — CLAUDE.md §7.3/§7.4, MASVS-PRIVACY-1). Favourites persist as local preference rows inside the profile's existing encrypted-at-rest store; they contain no note content and no identifiers beyond the profile id (MASVS-STORAGE-1 by inheritance). No new permission, no new network call.

#### UX notes
Source: design/Sane Notes.dc.html Editor screen, palette dock (screens §7.3) and design-system.md §Tool palette (container pad 6, radius 18, background `--sf`, border `--ln`, shadow `--sh`; order tools · colours · widths · page nav; grip = 6 dots). On compact the order compresses to tools · colour · undo · overflow, and page nav moves into the toolbox sheet (page swipe and the bottom-sheet page picker from [SN-PHN-003](design-system.md#sn-phn-003) are the primary phone page-nav path). Component heights are invariant across looks — tool buttons 44, chips 34 (ux-principles.md §9.2) — only radius and shadow change. Empty/error states: none for the dock itself; a disabled undo dims to 0.35 opacity exactly as on tablet. Motion: sheet entrance 200–300 ms ease-out, cross-fade under Reduce Motion (ux-principles.md §6).

#### Test plan
- `packages/sane_ui/test/editor/sane_tool_palette_compact_test.dart` — six slots, overflow present, left-handed mirroring, disabled-undo state.
- `packages/sane_ui/test/golden/tool_palette_compact_golden_test.dart` — goldens for all 17 looks in light and dark at 390×844 logical pixels.
- `app/test/editor/palette_favourites_test.dart` — reorder, persist, reset; per-profile isolation.
- `app/test/editor/palette_sheet_behaviour_test.dart` — colour pick snaps tool to pen; width pick leaves highlighter; focus returns to the trigger on dismiss.
- `app/integration_test/phone_palette_test.dart` — one-handed reach run on a 6.1-inch profile; sheet never covers more than 40% viewport.

#### Dependencies
[SN-PHN-002](compat.md#sn-phn-002), [SN-ED-005](editor.md#sn-ed-005), [SN-BRS-002](brushes.md#sn-brs-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-007

<a id="sn-phn-007"></a>

**Add the zoom-to-write magnified writing box for phone-sized pages**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | editor, a11y |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-005](ink.md#sn-phn-005), [SN-PHN-006](input-gestures.md#sn-phn-006), [SN-PG-002](pages-canvas.md#sn-pg-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
Writing legibly with a fingertip on a 6-inch screen is the core ergonomic problem of phone note-taking. docs/platform/phones.md §6 names the standard remedy and makes it a phone priority: **zoom-to-write** — a magnified writing box in which the user writes large with a finger while the ink lands small and precise on the page — and instructs reuse of the tablet zoom-write control if it exists, otherwise building it here. PRD-01 defines the same capability as **PRD-ED-132 · Zoom window (write-small, place-precise)**: a floating zoomed region with an advance-region control that moves the write zone across the line, plus adjustable magnification and a keyboard advance for accessibility.

It is also an accessibility feature, not only an ergonomic one: docs/design/accessibility.md notes the magnified writing box that auto-advances aids users with large fingers or thick styli, and PRD-ED-132's a11y clause makes adjustable magnification mandatory. This is a genuine differentiator on phones — most competitors either omit it or ship it tablet-only — hence the `innovation` label.

#### Scope
**In:** the zoom-write overlay (magnified write region + a page-position indicator), the coordinate transform from write-box space to page space, the advance-region control with auto-advance at the end of the box, magnification and box-height settings, keyboard/AT advance, and entry/exit from the compact palette toolbox.
**Out:** general pinch-zoom of the canvas ([SN-PG-002](pages-canvas.md#sn-pg-002)), reading mode ([SN-PHN-008](pages-canvas.md#sn-phn-008)), handwriting recognition or reflow ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)), and the tablet-specific presentation of the same control.

#### Acceptance criteria
- [ ] Activating zoom-to-write shows a magnified writing region plus a clear indicator of where on the page the ink is landing; strokes drawn in the box appear on the page at the mapped location in the same frame as the wet stroke.
- [ ] The transform is exact: a stroke drawn at box scale `s` lands with page coordinates equal to `box_origin + point / s` within 0.5 page units, verified numerically in a unit test, at every supported magnification.
- [ ] Magnification is adjustable across at least 2×–6× and persists per profile; box height is adjustable.
- [ ] An advance control moves the write zone forward by one box width; **auto-advance** triggers when ink reaches the trailing margin of the box, with a short, interruptible transition.
- [ ] Advance and retreat are reachable by a single-pointer button and by keyboard (PRD-ED-132 a11y clause, PRD-CO-318), and the region position is announced to screen readers ('Writing zone, line 3, right half').
- [ ] Reaching the end of a line wraps to the start of the next line at the same left margin.
- [ ] Ink written in the box is ordinary ink in the document — same objects, same undo behaviour, same audio time-anchors when recording — with no separate storage path.
- [ ] Zoom-to-write holds the frame budget: 60 fps floor and no frame > 16.7 ms while writing on Android-lowend; the magnified layer must not force a full-page repaint per sample.
- [ ] Exiting zoom-to-write leaves the viewport where the user left it, not reset to fit.
- [ ] The overlay renders correctly in all 17 looks and dark mode, and obeys Reduce Motion by removing the advance animation.

#### Technical notes
Build `app/lib/editor/zoom_write/` with an overlay widget composed over the canvas, plus a pure transform in `packages/sane_ink` (e.g. `lib/src/transform/write_box_transform.dart`) so the mapping is unit-testable without a widget harness (pure Dart, no `package:flutter`). Render the magnified region as a transformed view of the same `Picture`/tile cache from `packages/sane_render` rather than re-tessellating — a scaled `Canvas.transform` over the cached layer, with the active stroke painted in its own `CustomPainter` inside a `RepaintBoundary` (CLAUDE.md §8, ADR-0008). Input flows through the same `Listener` and arbitration as [SN-PHN-006](input-gestures.md#sn-phn-006); the only difference is the transform applied before the point enters the stroke builder, so pressure/velocity dynamics from [SN-PHN-005](ink.md#sn-phn-005) are unaffected. Auto-advance is computed from the committed stroke bounds in page space, debounced, and must not run on the `PointerMoveEvent` hot path. Settings rows join Settings → Handwriting & stylus per docs/design/screens-and-flows.md §12. Related: PRD-ED-132 (SHOULD), PRD-ED-133 (fit/recenter, for the exit behaviour), ADR-0008.

#### Security & privacy
None beyond baseline. Baseline: the write box magnifies note content, so it must never be captured into a screenshot-able system surface beyond the app window, and when app-lock or a protected profile is active it inherits the existing screenshot deterrent (`FLAG_SECURE` / capture-blur, PRD-LEAK-002, MASVS-PLATFORM-3). No coordinates, transforms, or content may be logged (CLAUDE.md §7.3, MASVS-PRIVACY-1, CWE-532). No new permission and no network egress; ink stays local and is written through the normal document path so encryption-at-rest and CRDT semantics are unchanged (MASVS-STORAGE-1 by inheritance).

#### UX notes
Surface: Editor (docs/design/screens-and-flows.md §7.2), entered from the compact toolbox sheet built in [SN-PHN-004](editor.md#sn-phn-004). The box sits in the bottom half of the screen so the writing hand does not cover it, respecting the thumb-zone rule (phones.md §7); the page-position indicator sits above it. Copy follows the ux-principles.md §5 voice — 'Write big here; it lands small on the page.' Use tokens only: the box surface is `--sf` with the look's radius/border/shadow, so Brutalism gets 0 radius and a 2 px border while Claymorphism gets 26 px and no border, automatically. Dark mode needs no special handling because the page paper (`pp`) is itself a token and ink flips by index, not by re-authoring (ux-principles.md §7). Motion: the advance transition is ~200 ms ease-out and becomes an instant jump under Reduce Motion; ink itself is never animated. Empty/error states: none — the box is only reachable with a page open.

#### Test plan
- `packages/sane_ink/test/transform/write_box_transform_test.dart` — round-trip accuracy at 2×/3×/4×/6×, box origin changes, line wrap.
- `app/test/editor/zoom_write_advance_test.dart` — auto-advance threshold, manual advance/retreat, keyboard advance, semantics announcements.
- `app/test/editor/zoom_write_undo_test.dart` — ink from the box is a normal document object with normal undo and audio anchors.
- `app/test/golden/phone/zoom_write_golden_test.dart` — goldens across the five look families in light and dark.
- `app/integration_test/phone_zoom_write_test.dart` — a full written line on a phone profile; frame budget asserted via the perf harness.

#### Dependencies
[SN-PHN-005](ink.md#sn-phn-005), [SN-PHN-006](input-gestures.md#sn-phn-006), [SN-PG-002](pages-canvas.md#sn-pg-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

