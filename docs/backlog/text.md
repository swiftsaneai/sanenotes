# Backlog — area: text

27 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-TXT-001](text.md#sn-txt-001) **Deliver typed text: rich-text CRDT, text boxes, lists, tables, links** (epic · M2 Library & Documents)
  - [SN-TXT-002](text.md#sn-txt-002) **Adopt the sane_core rich-text CRDT for TextBlock content** · p1 · feature · L · M2 Library & Documents
    - [SN-TXT-003](text.md#sn-txt-003) **Implement inline mark ops and the mark registry (anchor growth, overlap)** · p1 · task · M · M2 Library & Documents
  - [SN-TXT-004](text.md#sn-txt-004) **Implement the TextBlock object and block movable-list model** · p1 · feature · M · M2 Library & Documents
    - [SN-TXT-015](text.md#sn-txt-015) **Add quote and callout blocks** · p3 · feature · S · M2 Library & Documents
    - [SN-TXT-016](text.md#sn-txt-016) **Add code blocks with on-device syntax highlighting** · p2 · feature · M · M2 Library & Documents
    - [SN-TXT-017](text.md#sn-txt-017) **Add toggle / collapsible sections** · p3 · feature · S · M3 Audio & Recognition
  - [SN-TXT-005](text.md#sn-txt-005) **Add the Text tool to insert and edit a text box on the canvas** · p1 · feature · M · M2 Library & Documents
    - [SN-TXT-006](text.md#sn-txt-006) **Build the editable text input bridge (IME, dictation, web contenteditable)** · p1 · feature · L · M2 Library & Documents
      - [SN-TXT-007](text.md#sn-txt-007) **Support CJK and Indic complex-script input, shaping and editing** · p2 · feature · M · M2 Library & Documents
    - [SN-TXT-008](text.md#sn-txt-008) **Implement text selection, caret and text keyboard shortcuts** · p1 · feature · M · M2 Library & Documents
  - [SN-TXT-009](text.md#sn-txt-009) **Harden copy/cut/paste with clipboard content sanitisation** · p1 · security · M · M2 Library & Documents
  - [SN-TXT-010](text.md#sn-txt-010) **Build the rich text formatting toolbar (bold, colour, highlight, align)** · p1 · feature · M · M2 Library & Documents
    - [SN-TXT-014](text.md#sn-txt-014) **Add markdown-on-type shortcuts for text blocks** · p2 · feature · M · M2 Library & Documents
    - [SN-TXT-024](text.md#sn-txt-024) **Add an insert date / time stamp text action** · p3 · task · XS · M2 Library & Documents
  - [SN-TXT-011](text.md#sn-txt-011) **Add curated fonts and a text size scale (per-run families)** · p2 · feature · M · M2 Library & Documents
    - [SN-TXT-025](text.md#sn-txt-025) **Import custom fonts through a hardened, sandboxed loader** · p3 · feature · M · M3 Audio & Recognition
  - [SN-TXT-012](text.md#sn-txt-012) **Implement bulleted, numbered and nested lists with indent/outdent** · p1 · feature · M · M2 Library & Documents
  - [SN-TXT-013](text.md#sn-txt-013) **Add checklist / to-do items with tappable checkboxes** · p2 · feature · S · M2 Library & Documents
  - [SN-TXT-018](text.md#sn-txt-018) **Add hyperlinks and note/page links with URL sanitisation** · p1 · feature · M · M3 Audio & Recognition
  - [SN-TXT-019](text.md#sn-txt-019) **Implement tables (insert, edit, add/remove rows and columns)** · p2 · feature · L · M2 Library & Documents
  - [SN-TXT-020](text.md#sn-txt-020) **Ensure text-ink coexistence, z-order and selectable-text export** · p2 · feature · M · M2 Library & Documents
  - [SN-TXT-021](text.md#sn-txt-021) **Make typed text fully accessible (semantics, Dynamic Type, SR editing)** · p1 · task · M · M2 Library & Documents
  - [SN-TXT-022](text.md#sn-txt-022) **Build the text test suite (CRDT, widget, golden, integration)** · p2 · test · M · M2 Library & Documents
  - [SN-TXT-023](text.md#sn-txt-023) **Add on-device spellcheck for typed text** · p2 · feature · M · M3 Audio & Recognition

---

## Issues

### SN-IPAD-026

<a id="sn-ipad-026"></a>

**Back the note title and universal search with native UIKit text input views**

| Field | Value |
|---|---|
| GitHub | #809 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | text, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-008](ocr-hwr.md#sn-ipad-008), [SN-TXT-001](text.md#sn-txt-001) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `MASVS-CODE-4`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Flutter paints its own text rather than hosting `UITextField`, so IME, Scribble, dictation, native selection handles, the edit menu and VoiceOver text editing are all measurably weaker than native on iPadOS — this is recorded as limitation **L2** in docs/platform/ipad.md §10, and §7 ("Scribble & text") states the mitigation directly: *"For any first-class text-entry field that must feel native (search bar, note title), consider a native text-input platform view rather than a Flutter text field."* [SN-IPAD-008](ocr-hwr.md#sn-ipad-008) delivers the `sane_scribble` enable/suppress plumbing but deliberately leaves the hosting decision open; this issue closes it for the two fields users hit constantly — the **note title** and the **universal search** field (⌘K, docs/design/gestures-and-shortcuts.md §6.3). Getting these native also fixes dictation and the system edit menu for free, and it is the difference between "a Flutter app on iPad" and an app that feels like it belongs there. PRD-ED-109 makes the same point for the typed-text layer ("the text layer MUST use a real editable input path, not a painted-only field") and PRD-ED-110 is the Scribble requirement this serves.

#### Scope
**In:** a `UiKitView`-hosted native text-input platform view (a `UITextField`/`UITextView` subclass) used by the note-title field and the universal search field; two-way text/selection/focus binding to the Riverpod state in `app/`; styling driven from `sane_ui` tokens so the native view matches every look; focus/keyboard interop (single-key tool shortcuts must type, not switch tools, while the field is focused; `Esc` returns focus to the canvas); a graceful fallback to the ordinary Flutter `TextField` when platform-view creation fails or on non-Apple platforms.
**Out:** on-canvas text boxes and the rich-text model (SN-TXT area, [SN-TXT-001](text.md#sn-txt-001)); Scribble enable/suppress itself ([SN-IPAD-008](ocr-hwr.md#sn-ipad-008)); Android/web text input (their platform areas).

#### Acceptance criteria
- [ ] Scribble, dictation, third-party/IME keyboards, native selection handles and the system edit menu all work in the note-title and universal-search fields on iPadOS 17+.
- [ ] Text, selection and focus stay consistent between the native view and Dart state under rapid edits (no lost keystrokes, no duplicated characters) — verified by a 200-character scripted typing test.
- [ ] While the field has focus, single-key tool shortcuts (`P`/`H`/`E`/`V`/`S`/`T`/`I`/`R`) insert characters and only `⌘…` shortcuts act; `Esc` blurs the field and returns focus to the canvas (docs/design/gestures-and-shortcuts.md §7).
- [ ] VoiceOver reads the field role, label, value and insertion point; the field is reachable by Full Keyboard Access with a visible focus ring; target height ≥ 44 pt; contrast ≥ 4.5:1.
- [ ] The native view repaints correctly in all 17 looks and light/dark (colours, corner radius and type scale read from `sane_ui` tokens, never hardcoded).
- [ ] Hosting the platform view costs no dropped frames while a stroke is in progress: the editor still meets ≤ 16 ms pen-to-pixel on the ProMotion reference iPad with the field mounted.
- [ ] If `UiKitView` creation fails the field falls back to a Flutter `TextField` and logs a single non-PII warning.

#### Technical notes
Add the Swift view to `plugins/sane_scribble` (it already owns the iPadOS text-entry surface per docs/platform/ipad.md §6) and expose it through a small Dart widget in `app/` — not in `sane_ui`, which is a pure leaf and must stay free of platform views (CLAUDE.md §3 DAG). Bridge text/selection/focus with Pigeon per [ADR-0012](docs/adr/0012-native-plugin-strategy.md); keep state in Riverpod per [ADR-0003](docs/adr/0003-state-management-and-app-structure.md). Read tokens from `docs/design/tokens.json` via the `sane_ui` `ThemeExtension` ([SN-DS-002](design-system.md#sn-ds-002)) and push the resolved colours/metrics across the channel — do not re-declare palettes natively. Deployment target stays `IPHONEOS_DEPLOYMENT_TARGET = 17.0`.

#### Security & privacy
Text crossing the platform channel is untrusted input in both directions: validate length and encoding, and escape before it reaches search (FTS) or persistence (MASVS-PLATFORM-1, MASVS-CODE-4, CWE-20). Never log field contents, recognised Scribble text, or search terms — they are note content (MASVS-PRIVACY-1; CLAUDE.md §7.3). Disable the native autocorrect/keyboard *learning* cache for the title of a locked notebook so protected content does not leak into the system dictionary, and set `isSecureTextEntry` only where a lock is active. No content ever leaves the device; recognition is Apple's on-device Scribble.

#### UX notes
Fields appear in the editor header (note title) and the search overlay launched by the sidebar `⌘K` badge — see design/Sane Notes.dc.html and docs/design/screens-and-flows.md §7/§8. Empty state shows the token-styled placeholder ("Untitled note" / "Search everything"); error state (rename rejected) uses the standard inline-error pattern; loading/disabled state greys via tokens. Golden-test the field in all 17 looks plus light/dark. Respect Dynamic Type and the "readable font" preference (docs/design/accessibility.md), and mirror correctly under RTL while left-handed mode leaves the field unmirrored (docs/design/gestures-and-shortcuts.md §8).

#### Test plan
Widget: `app/test/text/native_text_field_host_test.dart` (binding, fallback path, shortcut suppression, Esc blur — using the mock platform interface). Golden: `app/test/golden/native_title_field_looks_test.dart` (17 looks x light/dark). Integration: `app/integration_test/native_text_input_test.dart` via `patrol` on a real iPad (Scribble into title, dictation, selection handles, VoiceOver labels). Perf: `tools/perf_harness` scenario `ipad_latency` re-run with the field mounted to prove no latency regression.

#### Dependencies
[SN-IPAD-008](ocr-hwr.md#sn-ipad-008) Scribble plugin; [SN-TXT-001](text.md#sn-txt-001) text area (field semantics and rich-text model); [SN-DS-002](design-system.md#sn-ds-002) design tokens as ThemeExtension.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-TXT-001

<a id="sn-txt-001"></a>

**Deliver typed text: rich-text CRDT, text boxes, lists, tables, links**

| Field | Value |
|---|---|
| GitHub | #33 |
| Type | epic |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-CODE-4`, `MASVS-PLATFORM-2`, `OWASP-A03`, `CWE-79`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
Typed text is a first-class object on the page, sitting alongside ink, so students who mix handwriting with typed structure (headings, lists, tables, links) get one document, not two apps (docs/product/prd-01-editor-ink-brushes.md section 9). The persona Riya types lecture structure and hand-annotates it, so text must merge conflict-free across her phone/tablet: rich text uses a Peritext/Yjs-style sequence CRDT in pure Dart (decision 4, docs/architecture/document-model.md section 4.2), block structure uses the movable-list CRDT (section 4.3), and tables reuse the same machinery (section 1.2 Table). This epic delivers the whole text subsystem: the sequence-CRDT model in packages/sane_core, the editable input path (IME/dictation/Scribble native, contenteditable on web) that never becomes painted-only, formatting/lists/checklists/blocks/links/tables UI in app/ + packages/sane_ui, markdown-on-type, copy/paste and link/font sanitisation, spellcheck, complex-script (CJK/Indic) input, and full text accessibility.

#### Scope
**In:** rich-text sequence CRDT (chars + inline marks), TextBlock object + block model, text-box tool, native/web editable input bridge, CJK/Indic input, selection + keyboard shortcuts, clipboard sanitisation, formatting toolbar, fonts, lists, checklists, markdown-on-type, quote/callout/code/toggle blocks, hyperlinks + note links, tables, text<->ink coexistence, spellcheck, date/time insert, custom-font import, text a11y, and the text test suite.
**Out:** handwriting recognition / ink-to-text conversion (SN-HWR area), math typesetting/solve (SN-HWR/SN-AI), the brush engine (SN-BRS), lasso selection of ink (SN-ED-004), FTS indexing internals (SN-SRCH), PDF text-layer rendering (SN-PDF).

#### Acceptance criteria
- [ ] All child issues below are closed and CI is green (analyze, unit, widget, golden, security scans).
- [ ] Two devices editing the same TextBlock offline then merging converge to identical rich text with no lost characters or marks (Peritext determinism, document-model 4.2).
- [ ] Every text surface renders correctly in all 17 looks x light/dark, honouring the dark-ink token mapping (PRD-ED-037), verified by golden tests.
- [ ] A hostile paste, a javascript:/data: link, and a malformed imported font all fail closed with a user-safe result and never execute.
- [ ] Every text control is reachable and labelled for VoiceOver/TalkBack and external-keyboard focus; Dynamic Type is honoured (A11Y-BASE).

#### Technical notes
Model in packages/sane_core/lib/src/text/ (pure Dart, no package:flutter): RichTextCrdt, mark registry, TextBlock, block movable-list, Table. Editor UI in app/lib/editor/text/ + packages/sane_ui (SaneTextEditBar, SaneToolButton text, SaneText). ADR-0005 (document model & CRDT), ADR-0003 (Riverpod + go_router state), ADR-0010 (web/PWA text caveat), ADR-0002 (package layout). Implements PRD-ED-103..111, PRD-ED-179..185. Children:
- [ ] [SN-TXT-002](text.md#sn-txt-002) rich-text sequence CRDT (Peritext chars)
- [ ] [SN-TXT-003](text.md#sn-txt-003) inline mark ops + mark registry
- [ ] [SN-TXT-004](text.md#sn-txt-004) TextBlock object + block movable-list
- [ ] [SN-TXT-005](text.md#sn-txt-005) insert & edit text box (Text tool)
- [ ] [SN-TXT-006](text.md#sn-txt-006) editable input bridge (IME/dictation/web contenteditable)
- [ ] [SN-TXT-007](text.md#sn-txt-007) CJK / Indic complex-script input & shaping
- [ ] [SN-TXT-008](text.md#sn-txt-008) text selection, caret & keyboard shortcuts
- [ ] [SN-TXT-009](text.md#sn-txt-009) copy/cut/paste sanitisation & clipboard hardening
- [ ] [SN-TXT-010](text.md#sn-txt-010) rich text formatting toolbar
- [ ] [SN-TXT-011](text.md#sn-txt-011) fonts & size scale
- [ ] [SN-TXT-012](text.md#sn-txt-012) lists (bulleted/numbered/nested)
- [ ] [SN-TXT-013](text.md#sn-txt-013) checklists / to-do items
- [ ] [SN-TXT-014](text.md#sn-txt-014) markdown-on-type shortcuts
- [ ] [SN-TXT-015](text.md#sn-txt-015) quote & callout blocks
- [ ] [SN-TXT-016](text.md#sn-txt-016) code block + on-device syntax highlighting
- [ ] [SN-TXT-017](text.md#sn-txt-017) toggle / collapsible sections
- [ ] [SN-TXT-018](text.md#sn-txt-018) hyperlinks & note/page links
- [ ] [SN-TXT-019](text.md#sn-txt-019) tables
- [ ] [SN-TXT-020](text.md#sn-txt-020) text<->ink coexistence, z-order & selectable export
- [ ] [SN-TXT-021](text.md#sn-txt-021) text accessibility (semantics, Dynamic Type, SR editing)
- [ ] [SN-TXT-022](text.md#sn-txt-022) text test suite (golden/unit/integration)
- [ ] [SN-TXT-023](text.md#sn-txt-023) spellcheck for typed text (on-device)
- [ ] [SN-TXT-024](text.md#sn-txt-024) insert date/time stamp
- [ ] [SN-TXT-025](text.md#sn-txt-025) import custom fonts (hardened loader)

#### Security & privacy
Typed text is note content: it stays on device (drift/SQLite + content-addressed blobs), is E2E-encrypted before any sync (decision 3, docs/architecture/crypto.md), and is never logged (CLAUDE.md section 7.3). Two hostile surfaces exist: pasted/imported rich text and hyperlinks (sanitise HTML/URLs, block javascript:/data:, no CSV/formula injection on export) and imported font files (hardened parser). CRDT ops arriving over sync are untrusted input and are bounds/schema-validated before fold. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-CODE-4, MASVS-PLATFORM-2, OWASP-A03, CWE-79, CWE-20.

#### UX notes
Surface: design/Sane Notes.dc.html Editor screen and docs/design/screens-and-flows.md section 7.5 (text-edit bar). Components: SaneTextEditBar, SaneToolButton (text), SaneText, SaneToast (component-inventory sections 2/5). Text colour uses the INK/DARK_INK tokens (PRD-ED-036/037); fonts use tokens.json fd/fb + typeScale. All 17 looks + dark; a11y = 44 pt targets, contrast >= 4.5:1, keyboard-reachable on web, VoiceOver/TalkBack editing, Dynamic Type.

#### Test plan
Umbrella suites: packages/sane_core/test/text/ (CRDT convergence, marks, blocks, table), app/test/widget/editor/text/ (input, formatting, lists), app/integration_test/text_editing_test.dart (IME end-to-end), app/test/golden/text_looks_test.dart (17 looks x dark), app/test/security/ (paste + link + font sanitisation). Named per child.

#### Dependencies
SN-CORE-002 (document model entities), SN-CORE-003 (CRDT primitives), SN-ED-002 (editor canvas & tool state). Coordinates with SN-DS-003 (components), SN-SRCH-002 (FTS over typed text), SN-PDF-002 (selectable text export), SN-A11Y-001, SN-I18N-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-002

<a id="sn-txt-002"></a>

**Adopt the sane_core rich-text CRDT for TextBlock content**

| Field | Value |
|---|---|
| GitHub | #646 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | text, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-009](sync.md#sn-core-009) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-CODE-4`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
Typed rich text must merge conflict-free when the same paragraph is edited on two devices offline. The character-sequence CRDT itself (RGA/Fugue causal tree, opId = Hlc, deterministic interleaving, per-character tombstones, `render()`) is owned by `sane_core` in [SN-CORE-009](sync.md#sn-core-009) (docs/architecture/document-model.md section 4.2, ADR-0005). This issue is the TXT-side adoption of that primitive: it binds sane_core's RichTextCrdt to TextBlock.content, maps the text ops onto the CBOR op frames, and exposes the materialised runs the editor renders. It is the load-bearing integration surface for all typed text; marks are layered on in [SN-TXT-003](text.md#sn-txt-003) and block structure is the movable-list in [SN-TXT-004](text.md#sn-txt-004).

#### Scope
**In:** the text-stack adapter that adopts the sane_core RichTextCrdt ([SN-CORE-009](sync.md#sn-core-009)) for TextBlock.content - wiring insert/delete against the content field, mapping textInsert/textDelete ops onto the CBOR op frames, exposing render() output as the materialised plain runs the editor consumes, and the tombstone-retention/GC hooks the text layer needs; property-based tests that the integrated content field converges and round-trips through the op frames.
**Out:** the character-sequence CRDT algorithm, causal-tree representation and convergence proofs themselves - owned by [SN-CORE-009](sync.md#sn-core-009); inline marks and the mark registry ([SN-TXT-003](text.md#sn-txt-003)); block/list/table structure ([SN-TXT-004](text.md#sn-txt-004)); the editor input path ([SN-TXT-006](text.md#sn-txt-006)); persistence/segment framing (SN-CORE-004); sync transport (SN-SYNC).

#### Acceptance criteria
- [ ] TextBlock.content is backed by the sane_core RichTextCrdt ([SN-CORE-009](sync.md#sn-core-009)); insert/delete on a text block go through it and round-trip through the CBOR op frames.
- [ ] Two replicas editing the same block offline converge to identical text once ops are exchanged (100 randomised property runs) - the adapter preserves the primitive's convergence guarantee end to end.
- [ ] render() output is exposed as materialised runs for the editor in O(n); a 50,000-char block materialises under 4 ms on the reference machine.
- [ ] Malformed or out-of-range op indices arriving from a remote replica are rejected (Result<Failure>) at the adapter boundary without throwing across the package boundary (CWE-20).
- [ ] The adapter adds no CRDT algorithm of its own - a block op is delegated to [SN-CORE-009](sync.md#sn-core-009), never reimplemented here.

#### Technical notes
sane_core text integration binding TextBlock.content to the RichTextCrdt from [SN-CORE-009](sync.md#sn-core-009) (pure Dart, MUST NOT import package:flutter). opId = Hlc from SN-CORE-003; ops are textInsert/textDelete (registry section 2.3) serialised to the CBOR op frames. Do not reimplement the causal-tree ordering - consume it. Cap block length and op size before fold to bound memory (CWE-400). Return Result<T, Failure> for all fallible ops (CLAUDE.md section 6). ADR-0005 records the build-it-ourselves decision that [SN-CORE-009](sync.md#sn-core-009) implements.

#### Security & privacy
Text characters are note content: never logged, on-device only, E2E-encrypted before sync. Ops arriving from a remote replica are untrusted: the adapter validates index/length bounds and caps total sequence size before applying so a crafted segment cannot exhaust memory or corrupt state; fail closed. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-CODE-4, CWE-20, CWE-400.

#### UX notes
None beyond baseline (pure model/adapter layer, no chrome). Correct convergence is what makes the visible text a11y tree stable across sync; the editor renders runs from render(). No logging of content; no secrets.

#### Test plan
packages/sane_core/test/text/rich_text_adapter_test.dart (content-field insert/delete via the CRDT, op-frame round-trip, index bounds), packages/sane_core/test/text/rich_text_adapter_convergence_test.dart (randomised property convergence through the adapter). Headless, no widget harness. The core algorithm's own tests live with [SN-CORE-009](sync.md#sn-core-009).

#### Dependencies
[SN-CORE-009](sync.md#sn-core-009) (rich-text sequence CRDT), SN-CORE-002 (document model entities incl. TextBlock), SN-CORE-003 (HLC + CRDT primitives).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-003

<a id="sn-txt-003"></a>

**Implement inline mark ops and the mark registry (anchor growth, overlap)**

| Field | Value |
|---|---|
| GitHub | #647 |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | text, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-002](text.md#sn-txt-002) |
| Depends on | [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Inline formatting (bold/italic/underline/strike/colour/highlight/link) must survive concurrent edits and resolve overlaps deterministically, so marks are commutative span ops anchored to character ids, not offsets (docs/architecture/document-model.md section 4.2). The classic bug is link-expansion: typing at the end of a link should not extend the link, but typing at the end of a bold run should stay bold. This issue implements addMark/removeMark, the per-mark-type anchor-growth policy (before vs after anchoring), and the mark registry that fixes each mark type's growth and overlap rule. It sits on the character sequence from [SN-TXT-002](text.md#sn-txt-002) and feeds the render runs the editor toolbar in [SN-TXT-010](text.md#sn-txt-010) paints.

#### Scope
**In:** addMark(type, startAnchor, endAnchor, attr, Hlc), removeMark(...); the MarkType registry with MarkGrowth (grows/fixed) per type; commutative accumulation of mark ops into per-gap op-sets; incompatible-overlap resolution by LWW on opId (red vs blue highlight); compatible marks (bold+italic) coexisting; materialising marks into render() spans.
**Out:** the character sequence itself ([SN-TXT-002](text.md#sn-txt-002)), block structure ([SN-TXT-004](text.md#sn-txt-004)), the visual toolbar ([SN-TXT-010](text.md#sn-txt-010)), link target objects and URL sanitisation ([SN-TXT-018](text.md#sn-txt-018)).

#### Acceptance criteria
- [ ] Bold anchored before grows: inserting at a bold run boundary keeps new text bold; link anchored after does not grow (fixture asserts both).
- [ ] Two incompatible overlapping marks (colour A vs colour B) resolve to the greater opId on every replica (deterministic, order-independent, 100 randomised runs).
- [ ] Compatible marks (bold + italic + underline) all coexist on the same range.
- [ ] removeMark over a partially-marked range clears exactly the intended gaps; re-apply is idempotent.
- [ ] The mark registry is the single source of growth/overlap policy; adding a new MarkType needs one registry entry and no engine change.

#### Technical notes
packages/sane_core/lib/src/text/marks.dart + mark_registry.dart (pure Dart). Ops addMark/removeMark from the registry (document-model section 2.3); anchors are RangeAnchor(before|after, charOpId). Growth policy per MarkType: bold/italic/underline/strike/colour/highlight = grows (before); link/comment = fixed (after) (document-model section 4.2). Overlap resolves by LWW on opId (Hlc) from SN-CORE-003. colour/highlight attr stores an INK/HL token id (PRD-ED-036/038), not a raw hex, so dark-ink mapping (PRD-ED-037) works at render.

#### Security & privacy
Mark attributes are note content: on-device, never logged, E2E-encrypted before sync. Remote mark ops are untrusted: validate anchor char-ids resolve and attr values are known enum/token members before applying; unknown MarkType is preserved verbatim (forward-compat, document-model section 2.3) not executed. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-20.

#### UX notes
None beyond baseline (model layer). Growth policy is what makes the toolbar toggles feel correct (bold sticks, link does not creep) in the text-edit bar (docs/design/screens-and-flows.md section 7.5). Colour marks reference tokens so all 17 looks + dark render correctly downstream. No logging of content; no secrets.

#### Test plan
packages/sane_core/test/text/marks_test.dart (growth before/after, compatible coexist, removeMark gaps, idempotence), packages/sane_core/test/text/marks_overlap_test.dart (LWW overlap convergence). Headless.

#### Dependencies
[SN-TXT-002](text.md#sn-txt-002) (character sequence), SN-CORE-003 (HLC/LWW).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-004

<a id="sn-txt-004"></a>

**Implement the TextBlock object and block movable-list model**

| Field | Value |
|---|---|
| GitHub | #648 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | text, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-TXT-002](text.md#sn-txt-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Peritext covers inline formatting only; block structure (headings, list nesting, quotes, code, tables, callouts) is explicitly out of scope for the sequence CRDT and lives in the movable-list block layer (docs/architecture/document-model.md sections 4.2 limitation, 4.3). This issue defines the TextBlock object (its base fields, width LWW, block style, and content = RichTextCrdt) and the ordered list of blocks within it, using fractional-index position registers so a concurrent reorder + edit both survive (blockOp in the op registry, section 2.3). It is the container every block feature ([SN-TXT-012](text.md#sn-txt-012) lists, [SN-TXT-015](text.md#sn-txt-015) quote/callout, [SN-TXT-016](text.md#sn-txt-016) code, [SN-TXT-017](text.md#sn-txt-017) toggle) hangs off, and the object the text-box tool ([SN-TXT-005](text.md#sn-txt-005)) creates.

#### Scope
**In:** the TextBlock object record (base Object fields + content: RichTextCrdt + width LWW + style: BlockStyle LWW per document-model section 1.2); the block list (paragraph/heading1-3/bullet/numbered/checklist/quote/callout/code/toggle/divider block kinds) as a movable-list of block ids with FracIndex positions; blockOp create/move/setKind/delete; indent/outdent as a parent+position move; CBOR (de)serialisation of the block tree.
**Out:** rich-text characters/marks ([SN-TXT-002](text.md#sn-txt-002)/[SN-TXT-003](text.md#sn-txt-003)), the tool/UI that creates a text box ([SN-TXT-005](text.md#sn-txt-005)), per-block-kind rendering and toolbars ([SN-TXT-010](text.md#sn-txt-010)..[SN-TXT-017](text.md#sn-txt-017)), the Table object ([SN-TXT-019](text.md#sn-txt-019)).

#### Acceptance criteria
- [ ] A block can be created, reordered, indented/outdented, kind-changed, and deleted, each as a mergeable op; two devices reordering the same block converge to a deterministic order (FracIndex tiebreak by device).
- [ ] Concurrent reorder on device A and text edit on device B both survive (position register independent of content).
- [ ] Block kind is an enum covering paragraph, heading1-3, bullet, numbered, checklist, quote, callout, code, toggle, divider; an unknown kind round-trips untouched (forward-compat).
- [ ] Indent depth is bounded (default max 8) and outdent below 0 is a no-op.
- [ ] Serialise -> deserialise a 500-block document is byte-stable and preserves unknown fields (CBOR map round-trip).

#### Technical notes
packages/sane_core/lib/src/text/text_block.dart + blocks.dart (pure Dart). Reuses the movable-list machinery from SN-CORE-003 (FracIndex.between, LWW position). BlockStyle carries default font/size/colour token for the block (document-model section 1.2 TextBlock). Block kinds map to render widgets built in later issues. Follow the independence rule: width and style are separate registers; never bundle. Implements the block substrate for PRD-ED-104/106/107 and PRD-ED-180/181/182.

#### Security & privacy
Block text and structure are note content: on-device, never logged, E2E-encrypted before sync. Remote blockOps are untrusted: validate parent ids resolve, clamp indent depth, and cap block count before applying to bound memory; preserve (never execute) unknown block kinds. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-20.

#### UX notes
None beyond baseline (model layer). The block model backs the visible structure in the text-edit bar and body (docs/design/screens-and-flows.md section 7.5); BlockStyle tokens ensure all 17 looks + dark render. No logging of content; no secrets.

#### Test plan
packages/sane_core/test/text/text_block_test.dart (create/move/setKind/delete, indent bounds), packages/sane_core/test/text/block_reorder_convergence_test.dart (concurrent reorder+edit), packages/sane_core/test/text/block_roundtrip_test.dart (CBOR + unknown-field preservation). Headless.

#### Dependencies
SN-CORE-002 (Object base + TextBlock fields), [SN-TXT-002](text.md#sn-txt-002) (RichTextCrdt content).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-005

<a id="sn-txt-005"></a>

**Add the Text tool to insert and edit a text box on the canvas**

| Field | Value |
|---|---|
| GitHub | #649 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-004](text.md#sn-txt-004), [SN-ED-002](editor.md#sn-ed-002), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The Text tool is how typed text enters a page: tapping with it drops a text box, enters inline edit, and shows the text-edit bar; empty boxes are discarded on Done and the tool snaps back to pen (PRD-ED-103; docs/design/screens-and-flows.md section 7.5). A text box is a movable/resizable object like any other, so it must integrate with the editor tool state machine (SN-ED-002) and the object transform/z-order model (SN-CORE-002). This issue delivers the tool, the on-canvas box lifecycle (create/enter-edit/commit/discard/move/resize), and its wiring to the TextBlock model from [SN-TXT-004](text.md#sn-txt-004); the actual keystroke-to-CRDT input path is [SN-TXT-006](text.md#sn-txt-006).

#### Scope
**In:** the Text tool in the palette dock (SaneToolButton text); tap-to-create at the tapped page point; enter/exit edit mode; discard-if-blank on Done and snap-to-pen; move and resize handles reusing the object transform; text-box selection and the text-edit bar (SaneTextEditBar) show/hide; placeholder "Type your text..."; undo/redo of create/move/resize via SN-ED-003.
**Out:** the editable input connection / IME ([SN-TXT-006](text.md#sn-txt-006)), formatting toolbar contents ([SN-TXT-010](text.md#sn-txt-010)), lists/blocks ([SN-TXT-012](text.md#sn-txt-012)+), text<->ink z-order rules ([SN-TXT-020](text.md#sn-txt-020)), a11y semantics ([SN-TXT-021](text.md#sn-txt-021)).

#### Acceptance criteria
- [ ] Selecting the Text tool and tapping the canvas creates a TextBlock at the tapped page-space point and focuses it for editing.
- [ ] Committing an empty box (Done or tap-away with no characters) discards it and returns the active tool to pen (PRD-ED-103).
- [ ] A committed box is movable and resizable; width is an LWW register, height derives from layout; move/resize are undoable.
- [ ] The text-edit bar appears in edit mode and hides on commit; the box shows a selection outline when selected (SaneSelectionRect).
- [ ] The tool works with finger, stylus and mouse; hit targets are >= 44 pt.

#### Technical notes
app/lib/editor/text/text_tool.dart + text_box.dart; state via Riverpod in the editor tool machine (SN-ED-002, ADR-0003). Creates the TextBlock object ([SN-TXT-004](text.md#sn-txt-004)); position/scale/rotation are the object base registers (document-model section 1.2). Uses packages/sane_ui SaneTextEditBar, SaneToolButton, SaneSelectionRect (component-inventory section 5). tool enum extends {pen,hl,eraser,lasso,shape,text,image} (PRD-ED-147). Discard/snap-to-pen mirrors the highlighter/eraser snap pattern (screens section 7.3).

#### Security & privacy
None beyond baseline: text is note content, on-device, never logged, E2E-encrypted before sync (decision 3). No new egress. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5 (text-edit bar) + design/Sane Notes.dc.html Editor screen. Components: SaneToolButton (active state uses accent tokens), SaneTextEditBar ("Type your text..." + Done), SaneSelectionRect. All 17 looks + dark. Empty state: a fresh box shows the placeholder; discarding shows no toast (silent). A11y: tool button labelled "Text"; box announces edit/idle; 44 pt targets; keyboard focus enters/exits the box.

#### Test plan
app/test/widget/editor/text/text_tool_test.dart (create/discard-if-blank/snap-to-pen), app/test/widget/editor/text/text_box_transform_test.dart (move/resize/undo), app/test/golden/text_box_looks_test.dart (box chrome across looks). 

#### Dependencies
[SN-TXT-004](text.md#sn-txt-004) (TextBlock model), SN-ED-002 (editor canvas & tool state), SN-DS-003 (SaneTextEditBar + components).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-006

<a id="sn-txt-006"></a>

**Build the editable text input bridge (IME, dictation, web contenteditable)**

| Field | Value |
|---|---|
| GitHub | #650 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, input-gestures |
| Size | L |
| SDLC | implementation |
| Parent | [SN-TXT-005](text.md#sn-txt-005) |
| Depends on | [SN-TXT-002](text.md#sn-txt-002), [SN-TXT-003](text.md#sn-txt-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-PLATFORM-2`, `OWASP-A03`, `CWE-79` |
| Extra labels | agent-ready, innovation |

#### Context
The text layer MUST use a real editable input path, not a painted-only field, so IME composition, system dictation, iPadOS Scribble and screen-reader editing work for free on native platforms; on web a painted CanvasKit field breaks IME/selection/a11y, so text needs a real contenteditable/input overlay (docs/product/prd-01-editor-ink-brushes.md section 9; ADR-0010 web/PWA strategy). This issue bridges the platform text input (Flutter EditableText/TextInputConnection on native, a DOM contenteditable overlay positioned over the canvas on web) into the RichTextCrdt from [SN-TXT-002](text.md#sn-txt-002)/[SN-TXT-003](text.md#sn-txt-003), translating composing regions, insertions, deletions and replacements into textInsert/textDelete/mark ops.

#### Scope
**In:** the TextInputConnection bridge feeding characters into the CRDT with composing-region handling (marked/committed text); backspace/forward-delete/replacement mapping to CRDT deletes; system dictation and autocorrect flowing through the same path; on web, a DOM contenteditable/input overlay aligned to the box in page space with input events mapped to ops; gating iPadOS Scribble / Android stylus handwriting to text-edit mode only (setAutoHandwritingEnabled(false) on the drawing canvas) via plugins/sane_scribble.
**Out:** complex-script shaping/reordering correctness ([SN-TXT-007](text.md#sn-txt-007)), selection model + shortcuts ([SN-TXT-008](text.md#sn-txt-008)), paste sanitisation ([SN-TXT-009](text.md#sn-txt-009)), the recognition engine behind handwriting-to-text (SN-HWR).

#### Acceptance criteria
- [ ] Typing with a hardware and on-screen keyboard inserts characters into the CRDT in order; an active IME composition shows marked text and commits atomically as textInsert ops.
- [ ] Backspace, forward-delete and select-and-replace map to correct CRDT deletes/inserts; undo/redo reverse them as coherent steps.
- [ ] System dictation and autocorrect suggestions enter through the same path and are undoable.
- [ ] On web the field is a real contenteditable overlay (not painted): browser text selection, IME candidate window, and VoiceOver/TalkBack editing all work; the overlay tracks the box on pan/zoom.
- [ ] While a text box is being edited, Scribble/stylus-handwriting is enabled for the field and disabled on the ink canvas so the two never conflict (PRD-ED-110).

#### Technical notes
app/lib/editor/text/input_bridge.dart (native EditableText/TextInputConnection) and web_contenteditable.dart (conditional import, dart:html/js_interop). Maps TextEditingDelta streams to RichTextCrdt.insert/delete ([SN-TXT-002](text.md#sn-txt-002)). plugins/sane_scribble handles Apple Scribble hooks (ADR-0012: text-field only, not scriptable). ADR-0010 documents the web text caveat and CanvasKit vs HTML strategy. No painted-only fields anywhere (PRD-ED-103 A11y).

#### Security & privacy
Typed/dictated text is note content: on-device, never logged, E2E-encrypted before sync. On web the contenteditable overlay is an injection surface: never set innerHTML from model or paste data; write text nodes / use textContent and the sanitiser in [SN-TXT-009](text.md#sn-txt-009); no javascript: sinks (CWE-79, OWASP-A03). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-PLATFORM-2, OWASP-A03, CWE-79.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. The caret, composing underline and selection follow platform norms; the field honours Dynamic Type / system font scale (A11Y-BASE). All 17 looks + dark (caret uses accent token). Loading/error: an IME that fails to attach falls back to the on-screen keyboard, never a dead box. A11y: native input gives VoiceOver/TalkBack editing; web overlay is focusable and labelled.

#### Test plan
app/integration_test/text_ime_test.dart (composition commit, dictation, backspace), app/test/widget/editor/text/input_bridge_test.dart (delta -> op mapping), app/test/web/contenteditable_overlay_test.dart (overlay tracks box; no innerHTML sink). 

#### Dependencies
[SN-TXT-002](text.md#sn-txt-002) (character CRDT), [SN-TXT-003](text.md#sn-txt-003) (marks). Coordinates with SN-ED-003 (undo/redo).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-007

<a id="sn-txt-007"></a>

**Support CJK and Indic complex-script input, shaping and editing**

| Field | Value |
|---|---|
| GitHub | #651 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, i18n |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-006](text.md#sn-txt-006) |
| Depends on | [SN-TXT-006](text.md#sn-txt-006) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
The persona is an Indian student (CLAUDE.md section 1) and localisation targets Hindi + major Indian languages plus CJK and Arabic RTL (CLAUDE.md decision 10), so typed text must handle grapheme clusters, conjuncts, combining marks and bidirectional runs correctly, not just ASCII. Naive index-based CRDT edits break when a single visible character is several code points (Devanagari conjunct, emoji ZWJ sequence) or when the IME commits multi-codepoint composition. This issue makes the input bridge ([SN-TXT-006](text.md#sn-txt-006)) and the CRDT indexing ([SN-TXT-002](text.md#sn-txt-002)) grapheme-aware, and ensures shaping/reordering render correctly across the 17 looks.

#### Scope
**In:** grapheme-cluster-aware caret movement, selection and delete (extended grapheme clusters, not code units); CJK IME composition through the marked-text path; Indic conjunct/combining-mark input and cursor navigation; bidirectional (Arabic/Hebrew) run layout and logical-vs-visual caret; ensuring CRDT op indices are stable under multi-codepoint commits; locale-aware line breaking for CJK.
**Out:** the base input bridge ([SN-TXT-006](text.md#sn-txt-006)), font bundling/fallback for scripts ([SN-TXT-011](text.md#sn-txt-011)), full RTL mirroring of app chrome (SN-I18N-001), translation of UI strings (SN-I18N-001), handwriting recognition of these scripts (SN-HWR).

#### Acceptance criteria
- [ ] Caret and backspace operate on extended grapheme clusters: deleting one visible Devanagari conjunct or one emoji ZWJ sequence removes the whole cluster, not a stray code point.
- [ ] A CJK IME composition (pinyin -> Han) commits as a single coherent textInsert and is undoable as one step.
- [ ] A mixed LTR+RTL paragraph lays out with correct bidi ordering; caret movement follows logical order and selection highlights the right visual runs.
- [ ] CRDT op indices remain correct after multi-codepoint commits (round-trip: type, edit mid-cluster, converge on a second replica).
- [ ] Line breaking for a long CJK run wraps without breaking inside a grapheme.

#### Technical notes
Use Dart characters package (Unicode extended grapheme clusters) for all caret/selection/delete math in app/lib/editor/text/grapheme.dart; feed cluster boundaries to RichTextCrdt indexing ([SN-TXT-002](text.md#sn-txt-002)). Rely on the platform text engine + Flutter for shaping and bidi (TextPainter/Directionality); ensure the CRDT never assumes 1 char = 1 code unit. Doc is silent on a specific shaping library beyond Flutter's own; decision: rely on the platform/Flutter shaper and keep the model grapheme-indexed (recorded here). Coordinates with SN-I18N-001 for locale wiring.

#### Security & privacy
Text is note content: on-device, never logged, E2E-encrypted before sync. Validate that decoded input is well-formed Unicode before applying (reject lone surrogates / overlong sequences) to avoid corrupt-state edge cases on merge (CWE-20). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-20.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Text composes with left-handed mode and RTL (component-inventory section 9 RTL row: mirror via EdgeInsetsDirectional). All 17 looks + dark; script fonts fall back legibly. A11y: screen readers read correct grapheme sequences; caret navigation matches assistive expectations; honour Dynamic Type.

#### Test plan
app/test/widget/editor/text/grapheme_caret_test.dart (cluster delete/caret for Devanagari + emoji), app/integration_test/text_cjk_ime_test.dart (composition commit), app/test/widget/editor/text/bidi_layout_test.dart (LTR+RTL caret/selection). 

#### Dependencies
[SN-TXT-006](text.md#sn-txt-006) (input bridge). Coordinates with SN-I18N-001 (localisation).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-008

<a id="sn-txt-008"></a>

**Implement text selection, caret and text keyboard shortcuts**

| Field | Value |
|---|---|
| GitHub | #652 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-005](text.md#sn-txt-005) |
| Depends on | [SN-TXT-006](text.md#sn-txt-006) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Editing typed text requires a real selection model and the standard shortcuts users expect: select-all, word/line selection, and Cmd/Ctrl-B/I/U for formatting (PRD-ED-104 A11y; PRD-ED-149 keyboard shortcuts). Because selection anchors to CRDT character ids ([SN-TXT-002](text.md#sn-txt-002)), selection must survive concurrent edits from another device without jumping. This issue implements the selection/caret model over the sequence CRDT and the text-scoped keyboard shortcuts, wiring copy/cut/paste to the sanitiser in [SN-TXT-009](text.md#sn-txt-009) and B/I/U to the marks in [SN-TXT-003](text.md#sn-txt-003).

#### Scope
**In:** caret + range selection anchored to character opIds; tap-to-place, drag-to-select, double-tap word, triple-tap paragraph; shift+arrow / word / line extension; select-all (Cmd/Ctrl-A) scoped to the box; formatting shortcuts Cmd/Ctrl-B/I/U (and strike); Copy/Cut/Paste (Cmd/Ctrl-C/X/V) routed through [SN-TXT-009](text.md#sn-txt-009); Delete/Backspace; selection stability when a remote edit lands before/inside the selection.
**Out:** the clipboard sanitiser itself ([SN-TXT-009](text.md#sn-txt-009)), the visual formatting toolbar ([SN-TXT-010](text.md#sn-txt-010)), lasso selection of ink objects (SN-ED-004), page-level shortcuts (SN-ED), complex-script caret ([SN-TXT-007](text.md#sn-txt-007)).

#### Acceptance criteria
- [ ] Selection anchors to character ids: a remote insert before the selection shifts it correctly and does not collapse or jump.
- [ ] Double-tap selects a word, triple-tap a paragraph; shift+arrow extends by grapheme, word and line.
- [ ] Cmd/Ctrl-B/I/U toggle bold/italic/underline on the selection and update the toolbar state; the same shortcut untoggles.
- [ ] Cmd/Ctrl-A selects all text in the focused box only (never the whole page); Copy/Cut/Paste invoke the sanitiser and are undoable.
- [ ] All shortcuts work on an external keyboard on web and iPad; the caret is keyboard-navigable.

#### Technical notes
app/lib/editor/text/selection.dart (selection over opId anchors) + shortcuts.dart (Flutter Shortcuts/Actions, ADR-0003). Formatting shortcuts call addMark/removeMark ([SN-TXT-003](text.md#sn-txt-003)); clipboard actions call [SN-TXT-009](text.md#sn-txt-009). Shortcut map mirrors PRD-ED-149: B/I/U = Cmd/Ctrl, C/X/V, A, Del/Backspace. Selection must be resilient to concurrent CRDT ops (rebase anchors on merge). No business logic in build methods (CLAUDE.md section 6).

#### Security & privacy
None beyond baseline: selected/copied text is note content, on-device, never logged, E2E-encrypted before sync; clipboard writes are user-initiated and the paste path is sanitised in [SN-TXT-009](text.md#sn-txt-009). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Selection handles and caret use accent tokens; all 17 looks + dark. A11y: shortcuts are discoverable, selection is exposed to the a11y tree, 44 pt targets on handles, keyboard reachable on web (WCAG 2.1.1). Reduce-motion: no selection animation flourish.

#### Test plan
app/test/widget/editor/text/selection_test.dart (word/paragraph/extend, remote-edit stability), app/test/widget/editor/text/text_shortcuts_test.dart (B/I/U/A/C/X/V), app/integration_test/text_keyboard_test.dart (external keyboard on web). 

#### Dependencies
[SN-TXT-006](text.md#sn-txt-006) (input bridge). Uses [SN-TXT-003](text.md#sn-txt-003) (marks) and [SN-TXT-009](text.md#sn-txt-009) (clipboard).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-009

<a id="sn-txt-009"></a>

**Harden copy/cut/paste with clipboard content sanitisation**

| Field | Value |
|---|---|
| GitHub | #653 |
| Type | security |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-003](text.md#sn-txt-003) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-CODE-4`, `OWASP-A03`, `CWE-79`, `CWE-116`, `CWE-1236`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Pasted content is untrusted third-party input: rich text from a browser or another app can carry active HTML, script URLs, dangerous styles, and spreadsheet cells that become formula-injection on export (CLAUDE.md section 7.8 untrusted input; PRD-ED-108 link sanitisation rationale). On web the editable overlay ([SN-TXT-006](text.md#sn-txt-006)) is a direct XSS sink if paste HTML is trusted. This issue implements a single clipboard sanitiser that maps external clipboard payloads into safe Sane rich text (allowed marks only, safe link schemes only) and neutralises formula-injection when text lands in a table cell or is exported to CSV.

#### Scope
**In:** a paste pipeline that reads text/plain and text/html (and platform pasteboard equivalents), strips scripts/event handlers/unknown tags, maps a whitelist of tags to Sane marks/blocks, sanitises URLs (https/mailto/sane only), and prefixes leading =,+,-,@ in cell/CSV contexts to defuse formula injection; copy/cut writes plain + a Sane-native rich payload (no executable HTML); a size cap on a single paste to prevent a paste bomb.
**Out:** the selection/shortcut wiring that triggers it ([SN-TXT-008](text.md#sn-txt-008)), link object creation ([SN-TXT-018](text.md#sn-txt-018)), export file writers (SN-SHR), custom-font import ([SN-TXT-025](text.md#sn-txt-025)).

#### Acceptance criteria
- [ ] Pasting HTML containing <script>, onclick=, or a javascript:/data: link yields sanitised text with those removed; nothing executes on web (asserted against the contenteditable overlay).
- [ ] Allowed formatting (bold/italic/underline/strike/links to safe schemes, lists, headings) is preserved and mapped to Sane marks/blocks; unknown tags degrade to plain text.
- [ ] A pasted cell beginning with =,+,-,@ is neutralised (leading apostrophe or equivalent) before it can land in a table cell or CSV export (CWE-1236).
- [ ] A paste larger than the configured cap (default 2 MB text) is rejected with a user-safe toast, not a hang (CWE-400/paste bomb).
- [ ] Copy/Cut place both text/plain and a Sane-native payload on the clipboard; no raw executable HTML is written.

#### Technical notes
app/lib/editor/text/clipboard/sanitiser.dart with an allow-list HTML mapper (no innerHTML anywhere; parse to a safe node model then to Sane marks/blocks via [SN-TXT-003](text.md#sn-txt-003)/[SN-TXT-004](text.md#sn-txt-004)). URL scheme check shared with [SN-TXT-018](text.md#sn-txt-018). Follows docs/security/secure-coding-checklist.md section 1 (untrusted input: validate type/size/schema before use, encode on output CWE-116). Register an abuse-test corpus of hostile clipboard payloads.

#### Security & privacy
This issue IS a security control. Threats: stored/DOM XSS via pasted HTML (CWE-79), CSV/formula injection via pasted cells (CWE-1236), improper output encoding (CWE-116), resource exhaustion via paste bomb (CWE-400), and unsafe link schemes (OWASP-A03). Controls: allow-list parsing, scheme whitelist, formula-prefix neutralisation, size caps, textContent-only DOM writes. IDs: MASVS-PLATFORM-2, MASVS-CODE-4, OWASP-A03, CWE-79, CWE-116, CWE-1236, CWE-20.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. On a rejected/over-cap paste show a SaneToast ("That paste was too large" / "Some formatting was removed for safety"), never inline red (component-inventory section 3 Toast). All 17 looks + dark. A11y: the toast mirrors to the AT live region; sanitisation never drops the readable text, only unsafe formatting.

#### Test plan
app/test/security/paste_sanitiser_test.dart (script/handler/js-link stripping, formula-injection neutralise, size cap), app/test/widget/editor/text/paste_mapping_test.dart (allowed tags -> marks), app/test/web/contenteditable_no_xss_test.dart. Abuse corpus in app/test/security/fixtures/hostile_clipboard/.

#### Dependencies
[SN-TXT-003](text.md#sn-txt-003) (marks target for mapped formatting). Coordinates with [SN-TXT-018](text.md#sn-txt-018) (URL scheme rules).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-010

<a id="sn-txt-010"></a>

**Build the rich text formatting toolbar (bold, colour, highlight, align)**

| Field | Value |
|---|---|
| GitHub | #654 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-003](text.md#sn-txt-003), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Rich text formatting is a MUST: bold, italic, underline, strikethrough, size, colour (ink token or hex), highlight, and paragraph alignment, all driven by the Peritext marks so concurrent edits merge (PRD-ED-104). This issue delivers the visible formatting controls in the text-edit bar and their two-way binding to the mark registry ([SN-TXT-003](text.md#sn-txt-003)) and block style ([SN-TXT-004](text.md#sn-txt-004)): pressing a control applies a mark to the selection, and moving the caret updates the control's active state to reflect the marks under it.

#### Scope
**In:** the text-edit bar formatting controls (bold/italic/underline/strike toggles, size stepper, colour swatch using the INK palette + hex, highlight swatch using the HL palette, alignment segmented control); active-state reflection from the marks under the selection/caret; applying/removing marks over a range or as a typing attribute at the caret; colour stored as an INK/HL token id so dark-ink mapping works (PRD-ED-037).
**Out:** the mark model ([SN-TXT-003](text.md#sn-txt-003)), fonts/family and size scale definition ([SN-TXT-011](text.md#sn-txt-011)), lists/blocks controls ([SN-TXT-012](text.md#sn-txt-012)+), the custom colour picker/eyedropper (PRD-ED-039/040, SN-BRS/SN-ED), keyboard shortcuts ([SN-TXT-008](text.md#sn-txt-008)).

#### Acceptance criteria
- [ ] Selecting text and pressing Bold applies bold; the button shows active while the selection is fully bold and mixed-state when partially bold.
- [ ] Colour uses the 6 INK swatches (PRD-ED-036) and highlight uses the 4 HL swatches (PRD-ED-038); both store token ids and render correctly in light and dark (PRD-ED-037).
- [ ] Paragraph alignment (left/center/right/justify) applies at the block level and reflects the current block.
- [ ] Applying a format with no selection sets a typing attribute so the next typed characters carry it, then clears on caret move away.
- [ ] Every control is >= 44 pt, labelled, and not colour-only (icon + selected ring/weight).

#### Technical notes
app/lib/editor/text/format_bar.dart using packages/sane_ui SaneTextEditBar, SaneSwatch (INK/HL), SaneSegmented (alignment), SaneWidthDot-style size stepper (component-inventory sections 2/5). Toggles call addMark/removeMark ([SN-TXT-003](text.md#sn-txt-003)); alignment is a BlockStyle LWW write ([SN-TXT-004](text.md#sn-txt-004)). Colour reads INK/DARK_INK/HL from tokens.json via sane_ui (never hard-coded, CLAUDE.md section 9). Active-state derives from render() spans under the selection.

#### Security & privacy
None beyond baseline: formatting is note content, on-device, never logged, E2E-encrypted before sync; colour/highlight are token ids, no external fetch. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5 (text-edit bar). Swatches expose colour names (accessible Color Cards, PRD-ED-036 A11y) and a non-colour selected state (double ring). All 17 looks + dark; highlight keeps underlying text at AA legibility (PRD-ED-066 A11y). Mixed-selection shows an indeterminate control state. A11y: toggles expose pressed/unpressed; announce the active colour name on change.

#### Test plan
app/test/widget/editor/text/format_bar_test.dart (apply/active/mixed-state, typing-attribute at caret), app/test/golden/text_format_looks_test.dart (bold/colour/highlight across 17 looks + dark). 

#### Dependencies
[SN-TXT-003](text.md#sn-txt-003) (marks), SN-DS-003 (SaneTextEditBar + swatches + tokens).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-011

<a id="sn-txt-011"></a>

**Add curated fonts and a text size scale (per-run families)**

| Field | Value |
|---|---|
| GitHub | #655 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-004](text.md#sn-txt-004), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-NETWORK-1` |
| Extra labels | agent-ready |

#### Context
Text needs a curated, bundled, licensed font set with a size scale, applied per text run, with the default body following the active look's fb font (PRD-ED-105). Fonts must be bundled, never fetched remotely, because a remote font request would leak reading activity (PRD-ED-105 Sec). This issue wires a font picker + size scale into the formatting UI and stores font/size as run attributes, honouring Dynamic Type minimums and a "readable font" accessibility option.

#### Scope
**In:** the bundled font list (from tokens.json fonts fd/fb/mono families) exposed as a per-run choice; a size scale bound to typeScale; storing font-family and size as mark/run attributes; default body = active look fb; a "readable font" accessibility override; a legible size floor.
**Out:** importing user fonts ([SN-TXT-025](text.md#sn-txt-025)), the code-block monospace family ([SN-TXT-016](text.md#sn-txt-016)), colour/weight controls ([SN-TXT-010](text.md#sn-txt-010)), the look/token definitions themselves (SN-DS-002).

#### Acceptance criteria
- [ ] A font can be chosen per run from the bundled set; a run keeps its family across edits and on reopen.
- [ ] Size follows typeScale; the picker never allows a size below the legible floor; the default body font is the active look's fb.
- [ ] No network request is made for any glyph (asserted by a no-egress test); all fonts are bundled assets.
- [ ] Turning on "readable font" overrides the display family app-wide for text and never drops below Dynamic Type minimums (PRD-ED-105 A11y).
- [ ] Fonts and sizes render correctly in all 17 looks x dark.

#### Technical notes
Font families sourced from docs/design/tokens.json (fd/fb/mono) via packages/sane_ui (SN-DS-002 ThemeExtension); font/size stored as run attributes on the CRDT ([SN-TXT-003](text.md#sn-txt-003) attr or BlockStyle [SN-TXT-004](text.md#sn-txt-004)). Use Flutter TextStyle fontFamily from bundled assets declared in pubspec; no google_fonts remote fetch (PRD-ED-105 Sec, MASVS-NETWORK-1). "Readable font" reads the accessibility setting (docs/design/accessibility.md). Licensing: only bundle fonts whose licence permits app embedding.

#### Security & privacy
Text and font choice are note content: on-device, never logged, E2E-encrypted before sync. Control: no remote font fetch (no reading-activity leak) - all fonts bundled and served locally. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-NETWORK-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Font picker labels each family by name; size stepper shows the value. All 17 looks + dark; default body = fb per look. A11y: honour Dynamic Type / system font scale, provide "readable font", never below the legible floor (PRD-ED-105 A11y); picker keyboard-operable.

#### Test plan
app/test/widget/editor/text/font_picker_test.dart (per-run family, size floor, default fb), app/test/security/no_remote_font_test.dart (no egress), app/test/golden/text_fonts_looks_test.dart. 

#### Dependencies
[SN-TXT-004](text.md#sn-txt-004) (block/run style), SN-DS-002 (tokens/fonts ThemeExtension).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-012

<a id="sn-txt-012"></a>

**Implement bulleted, numbered and nested lists with indent/outdent**

| Field | Value |
|---|---|
| GitHub | #656 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-004](text.md#sn-txt-004), [SN-TXT-008](text.md#sn-txt-008) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Lists are a MUST for note structure: bulleted, numbered and nested lists with indent/outdent, exposing real list semantics to screen readers (PRD-ED-106). Lists build on the block movable-list model ([SN-TXT-004](text.md#sn-txt-004)), so a list item is a block with a list kind and an indent depth, and numbering is derived from sibling order. This issue delivers the list block kinds, their rendering, and the indent/outdent + Enter/Backspace editing behaviour.

#### Scope
**In:** bullet and numbered list block kinds; nesting via indent depth; Tab/Shift-Tab and toolbar controls to indent/outdent; Enter creates the next item, Enter on an empty item outdents/exits the list, Backspace at item start outdents; auto-renumbering of numbered lists from sibling order; list rendering with markers per depth.
**Out:** checklists ([SN-TXT-013](text.md#sn-txt-013)), markdown-on-type triggers ([SN-TXT-014](text.md#sn-txt-014)), quote/callout/code blocks ([SN-TXT-015](text.md#sn-txt-015)/[SN-TXT-016](text.md#sn-txt-016)), the block model itself ([SN-TXT-004](text.md#sn-txt-004)).

#### Acceptance criteria
- [ ] Toggling bullet/numbered turns the current block(s) into list items; toggling again returns them to paragraphs.
- [ ] Tab indents (bounded to the max depth from [SN-TXT-004](text.md#sn-txt-004)); Shift-Tab outdents; Backspace at item start outdents by one level.
- [ ] Enter creates a sibling item; Enter on an empty item exits the list; numbered items renumber automatically after insert/delete/reorder.
- [ ] Nested lists render distinct markers per depth and reflow correctly across widths (phone to tablet).
- [ ] Lists expose semantic list + listitem roles with correct nesting to VoiceOver/TalkBack (PRD-ED-106 A11y).

#### Technical notes
app/lib/editor/text/blocks/list_block.dart; list kind + indent are block fields on the movable-list ([SN-TXT-004](text.md#sn-txt-004)); numbering is DERIVED from sibling position, never stored. Indent/outdent is a block move op. Uses selection/shortcuts from [SN-TXT-008](text.md#sn-txt-008) for Tab/Shift-Tab/Enter/Backspace. Renders with SaneText styles from tokens (no hard-coded indent/colour). Semantics via Flutter Semantics(list/listItem). Implements PRD-ED-106.

#### Security & privacy
None beyond baseline: list text/structure is note content, on-device, never logged, E2E-encrypted before sync. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Markers/indent use spacing tokens; all 17 looks + dark. Empty state: an empty list item shows a faint marker; exiting on empty removes it. A11y: list/listitem roles + nesting exposed; Tab/Shift-Tab reachable by keyboard on web; 44 pt targets on toolbar controls.

#### Test plan
app/test/widget/editor/text/list_block_test.dart (toggle, indent bounds, Enter/Backspace behaviour, renumber), app/test/a11y/list_semantics_test.dart (list roles + nesting), app/test/golden/list_looks_test.dart. 

#### Dependencies
[SN-TXT-004](text.md#sn-txt-004) (block movable-list), [SN-TXT-008](text.md#sn-txt-008) (Tab/Enter/Backspace handling).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-013

<a id="sn-txt-013"></a>

**Add checklist / to-do items with tappable checkboxes**

| Field | Value |
|---|---|
| GitHub | #657 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-012](text.md#sn-txt-012) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Checklists are a MUST and directly serve the study persona's task lists: checklist items with tappable checkboxes whose checked state is stored per item (LWW) so it merges cleanly and toggling is instant (PRD-ED-107). This is a small block-kind on top of the list model ([SN-TXT-012](text.md#sn-txt-012)): a checklist item adds a checked boolean stored as an LWW register on the block, plus a tappable checkbox that reads/writes it.

#### Scope
**In:** the checklist block kind; a tappable checkbox with checked/unchecked visual + role; per-item checked state as an LWW boolean; toggling by tap and by keyboard; optional strikethrough/dim of checked item text; convert between paragraph/bullet/checklist.
**Out:** the base list machinery ([SN-TXT-012](text.md#sn-txt-012)), markdown [] trigger ([SN-TXT-014](text.md#sn-txt-014)), study/spaced-repetition features (SN-STDY), progress roll-ups across a page (SN-LIB).

#### Acceptance criteria
- [ ] Toggling a block to checklist adds a leading checkbox; tapping the checkbox flips checked state and persists it (LWW) across reopen.
- [ ] Checked state merges: two devices toggling the same item converge to the greater-Hlc value with no lost text.
- [ ] The checkbox exposes a checkbox role with checked/unchecked state and is toggleable by keyboard (Space/Enter) (PRD-ED-107 A11y).
- [ ] Checked items optionally show strikethrough/dim without altering the underlying text.
- [ ] The checkbox hit target is >= 44 pt.

#### Technical notes
app/lib/editor/text/blocks/checklist_block.dart; checked is an LWW register on the block ([SN-TXT-004](text.md#sn-txt-004)); toggle emits a setAttr op (document-model section 2.3). Reuse list indent/Enter behaviour from [SN-TXT-012](text.md#sn-txt-012). Checkbox is a Semantics(checked:) toggle; visuals from tokens via sane_ui (no hard-coded colour). Implements PRD-ED-107.

#### Security & privacy
None beyond baseline: checklist text and checked state are note content, on-device, never logged, E2E-encrypted before sync. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Checkbox and checked style use tokens; all 17 looks + dark; checked is not colour-only (checkmark + optional strikethrough). A11y: checkbox role + state announced; keyboard-toggle; 44 pt target. Reduce-motion: no bounce on toggle.

#### Test plan
app/test/widget/editor/text/checklist_block_test.dart (toggle persist, keyboard toggle), packages/sane_core/test/text/checklist_lww_test.dart (merge convergence), app/test/golden/checklist_looks_test.dart. 

#### Dependencies
[SN-TXT-012](text.md#sn-txt-012) (list model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-014

<a id="sn-txt-014"></a>

**Add markdown-on-type shortcuts for text blocks**

| Field | Value |
|---|---|
| GitHub | #658 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-010](text.md#sn-txt-010) |
| Depends on | [SN-TXT-010](text.md#sn-txt-010), [SN-TXT-012](text.md#sn-txt-012) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Markdown-on-type is the fast, keyboard-first way to structure notes that every competitor ships: typed prefixes auto-format on space/return, and a single Undo reverts the auto-format to literal text (PRD-ED-179). It is additive - every block type it produces is also reachable from the labelled formatting menu (PRD-ED-179 A11y) - so it never traps a user who did not mean to trigger it. This issue implements the prefix recogniser over the block model and marks, mapping shorthands to headings, lists, checkboxes, quotes, code, dividers and inline code.

#### Scope
**In:** on space/return, transform #,##,### -> heading1-3; -,*,+ -> bullet; 1. -> numbered; [] -> checkbox; > -> block quote; backtick -> inline code, triple-backtick -> code block; --- -> divider; single-Undo reverts the transform to the literal typed characters; a per-profile toggle to disable.
**Out:** the target block/mark implementations ([SN-TXT-010](text.md#sn-txt-010)/[SN-TXT-012](text.md#sn-txt-012)/[SN-TXT-013](text.md#sn-txt-013)/[SN-TXT-015](text.md#sn-txt-015)/[SN-TXT-016](text.md#sn-txt-016)), quote/callout styling ([SN-TXT-015](text.md#sn-txt-015)), code syntax highlighting ([SN-TXT-016](text.md#sn-txt-016)), date/time insert ([SN-TXT-024](text.md#sn-txt-024)).

#### Acceptance criteria
- [ ] Each documented prefix (PRD-ED-179) transforms on space/return into the correct block or inline mark.
- [ ] Exactly one Undo reverts the auto-format back to the literal typed text (e.g. "# " stays "# ") and a second Undo removes the characters.
- [ ] The recogniser only fires at block start (or for inline code, around a token) and never mid-word, avoiding false positives during dense writing.
- [ ] Disabling the per-profile toggle turns all shortcuts off; every block type remains reachable from the formatting menu.
- [ ] Triggers work with an external keyboard on web and with on-screen keyboards.

#### Technical notes
app/lib/editor/text/markdown_shortcuts.dart hooks the input delta stream ([SN-TXT-006](text.md#sn-txt-006)) and, on a space/return delta, matches the block-start prefix, then issues the corresponding blockOp/setKind ([SN-TXT-004](text.md#sn-txt-004)) or addMark ([SN-TXT-003](text.md#sn-txt-003)) and deletes the prefix in one undo-coalesced step (SN-ED-003). Toggle persists per profile (settings). Implements PRD-ED-179; targets PRD-ED-180/181 blocks.

#### Security & privacy
None beyond baseline: transformed text is note content, on-device, never logged, E2E-encrypted before sync; no parsing of untrusted external input here (paste is handled by [SN-TXT-009](text.md#sn-txt-009)). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. The transform is instant and silent; the reverting Undo is the safety valve. All 17 looks + dark. A11y: additive only; announce the new block type on transform; every type also in the formatting menu (PRD-ED-179 A11y). Reduce-motion: no animation on transform.

#### Test plan
app/test/widget/editor/text/markdown_shortcuts_test.dart (each prefix, single-Undo revert, no mid-word trigger, toggle off), app/integration_test/text_markdown_test.dart. 

#### Dependencies
[SN-TXT-010](text.md#sn-txt-010) (marks/format), [SN-TXT-012](text.md#sn-txt-012) (lists). Uses [SN-TXT-004](text.md#sn-txt-004) block ops and SN-ED-003 undo.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-015

<a id="sn-txt-015"></a>

**Add quote and callout blocks**

| Field | Value |
|---|---|
| GitHub | #659 |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-TXT-004](text.md#sn-txt-004) |
| Depends on | [SN-TXT-004](text.md#sn-txt-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Quote and callout blocks give notes visual emphasis structures students rely on (a quoted passage, a tinted "note" box), and both expose the correct semantic role to screen readers (PRD-ED-180). They are two block kinds on the block model ([SN-TXT-004](text.md#sn-txt-004)): a block-quote (indent + left rule) and a callout (tinted panel with an optional icon). This issue implements their rendering and the toolbar/menu entries to apply them.

#### Scope
**In:** the block-quote block kind (indent + rule) and the callout block kind (tinted panel, optional leading icon); applying/removing them from the formatting menu; nesting text and other inline formatting inside them; token-based styling for both; markdown > trigger routes here (via [SN-TXT-014](text.md#sn-txt-014)).
**Out:** the block model ([SN-TXT-004](text.md#sn-txt-004)), code/toggle blocks ([SN-TXT-016](text.md#sn-txt-016)/[SN-TXT-017](text.md#sn-txt-017)), the markdown recogniser ([SN-TXT-014](text.md#sn-txt-014)), icon-picker library (SN-MED elements).

#### Acceptance criteria
- [ ] Applying block-quote wraps the current block(s) with an indent + left rule; applying callout renders a tinted panel with an optional icon; both are reversible to paragraph.
- [ ] Inline formatting and lists work inside a quote/callout.
- [ ] The block-quote exposes a blockquote role and the callout a note/aside role to VoiceOver/TalkBack (PRD-ED-180 A11y).
- [ ] Tint and rule colours come from tokens and pass AA contrast in all 17 looks x dark.
- [ ] Applying/removing is undoable as one step.

#### Technical notes
app/lib/editor/text/blocks/quote_callout_block.dart; block kinds on [SN-TXT-004](text.md#sn-txt-004); styling from tokens via sane_ui (panel bg, rule colour - no hard-coded colour, CLAUDE.md section 9). Semantics roles via Flutter Semantics. Callout icon references a sane_ui SaneIcon glyph. Implements PRD-ED-180.

#### Security & privacy
None beyond baseline: block text/structure is note content, on-device, never logged, E2E-encrypted before sync. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Quote = indent + rule; callout = tinted SaneSurface-like panel; all styling from tokens; all 17 looks + dark. A11y: correct semantic roles; tint never the only signal (rule/icon present); 44 pt menu targets. Reduce-transparency respected for any glass callout.

#### Test plan
app/test/widget/editor/text/quote_callout_test.dart (apply/reverse, nested formatting), app/test/a11y/quote_callout_roles_test.dart, app/test/golden/quote_callout_looks_test.dart. 

#### Dependencies
[SN-TXT-004](text.md#sn-txt-004) (block model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-016

<a id="sn-txt-016"></a>

**Add code blocks with on-device syntax highlighting**

| Field | Value |
|---|---|
| GitHub | #660 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-004](text.md#sn-txt-004) |
| Depends on | [SN-TXT-004](text.md#sn-txt-004), [SN-TXT-011](text.md#sn-txt-011) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `CWE-1333` |
| Extra labels | agent-ready |

#### Context
Code blocks are expected by CS students and are shipped by competitors: a monospace block that preserves whitespace, carries a per-block language, and applies on-device read-only syntax highlighting for a curated language set (>= the 26 Notability ships), remembering the last language, with a triple-backtick shortcut (PRD-ED-181). Highlighting must run on-device with no remote grammar fetch (PRD-ED-181 Sec). The roadmap places code blocks in M2 delivery (docs/roadmap.md M2), which supersedes the PRD's indicative M3 tag. This issue implements the code block kind, its monospace layout, language selection and the on-device highlighter.

#### Scope
**In:** the code block kind (monospace, whitespace-preserving, no autocorrect/spellcheck); a per-block language selector remembering the last used; on-device syntax highlighting for a curated set (Bash, C, C#, C++, CSS, Go, Haskell, HTML, Java, JS, JSON, Kotlin, Lua, Markdown, MATLAB, Obj-C, OCaml, PHP, Python, R, Racket, Ruby, Rust, SQL, Swift, TS + plain); triple-backtick trigger routes here (via [SN-TXT-014](text.md#sn-txt-014)).
**Out:** running or evaluating code (never), the block model ([SN-TXT-004](text.md#sn-txt-004)), the monospace family definition ([SN-TXT-011](text.md#sn-txt-011)), markdown trigger recogniser ([SN-TXT-014](text.md#sn-txt-014)), toggle blocks ([SN-TXT-017](text.md#sn-txt-017)).

#### Acceptance criteria
- [ ] A code block preserves exact whitespace/indentation and uses the monospace family; spellcheck/autocorrect are disabled inside it.
- [ ] A per-block language can be set and is remembered as the default for the next new code block; "plain" disables highlighting.
- [ ] Highlighting runs fully on-device with no network request (no-egress test) and no ReDoS: tokenising a 5,000-line block completes under a bounded time budget on the reference device (CWE-1333).
- [ ] Highlight colours come from tokens and are legible (AA) in all 17 looks x dark; highlighting is read-only (never mutates the text).
- [ ] The language name is announced and honours Dynamic Type minimum (PRD-ED-181 A11y).

#### Technical notes
app/lib/editor/text/blocks/code_block.dart; block kind on [SN-TXT-004](text.md#sn-txt-004); monospace family from [SN-TXT-011](text.md#sn-txt-011)/tokens. Use a bundled on-device highlighter (e.g. a vendored grammar/token set) with linear-time tokenisation and input-length caps to avoid catastrophic backtracking (CWE-1333); no remote grammar fetch (MASVS-NETWORK-1). Highlight is a render-time overlay, not stored marks. Implements PRD-ED-181.

#### Security & privacy
Code text is note content: on-device, never logged, E2E-encrypted before sync. Threats: ReDoS via a crafted grammar/input (CWE-1333) - mitigated by bounded/linear tokenisation and length caps; reading-activity leak via remote grammar - mitigated by bundling grammars (MASVS-NETWORK-1). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-NETWORK-1, CWE-1333.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Monospace block with a subtle panel and a language chip; colours from tokens; all 17 looks + dark. Empty state: an empty code block shows the language chip and a caret. A11y: language chip labelled and announced; highlighting never the only signal; Dynamic Type minimum honoured. Reduce-motion: none.

#### Test plan
app/test/widget/editor/text/code_block_test.dart (whitespace preserve, language memory, spellcheck off), app/test/security/highlighter_redos_test.dart (bounded time on adversarial input, no egress), app/test/golden/code_block_looks_test.dart. 

#### Dependencies
[SN-TXT-004](text.md#sn-txt-004) (block model), [SN-TXT-011](text.md#sn-txt-011) (monospace family).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-017

<a id="sn-txt-017"></a>

**Add toggle / collapsible sections**

| Field | Value |
|---|---|
| GitHub | #661 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | text, editor |
| Size | S |
| SDLC | implementation |
| Parent | [SN-TXT-004](text.md#sn-txt-004) |
| Depends on | [SN-TXT-004](text.md#sn-txt-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Toggle / collapsible sections let a long note fold under a heading, a study-friendly way to hide answers or detail: headings and toggle blocks collapse/expand their child content, collapsed state is per-view and persisted, and export preserves the full content (PRD-ED-182). The disclosure exposes expanded/collapsed state and toggles by keyboard (PRD-ED-182 A11y). This issue implements the toggle block and heading-collapse over the block model ([SN-TXT-004](text.md#sn-txt-004)).

#### Scope
**In:** a toggle block with a disclosure triangle and child blocks; collapse/expand of a heading's following child blocks; per-view persisted collapsed state (does not delete content); export/print always emits full content; keyboard toggle.
**Out:** the block model ([SN-TXT-004](text.md#sn-txt-004)), export writers (SN-SHR) beyond the "emit full content" contract, markdown trigger, code/quote blocks.

#### Acceptance criteria
- [ ] A toggle block collapses/expands its children; a heading can collapse the blocks beneath it up to the next same-or-higher heading.
- [ ] Collapsed state persists per view/device and never removes the underlying child blocks (verified by collapse -> reopen -> expand shows identical content).
- [ ] Export/print includes the full (expanded) content regardless of collapsed state.
- [ ] The disclosure exposes expanded/collapsed state to AT and toggles with keyboard (Enter/Space) (PRD-ED-182 A11y).
- [ ] Works across widths; the triangle target is >= 44 pt.

#### Technical notes
app/lib/editor/text/blocks/toggle_block.dart; toggle kind + child grouping on [SN-TXT-004](text.md#sn-txt-004); collapsed is view state (local, per-device) not a synced content field, so it never causes merge churn. Heading-collapse computes the child range from block order + heading level. Disclosure via Flutter Semantics(expanded:). Export contract: serialisers ignore collapsed view state. Implements PRD-ED-182.

#### Security & privacy
None beyond baseline: block text/structure is note content, on-device, never logged, E2E-encrypted before sync; collapsed state is local view metadata. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Disclosure triangle uses accent/ink tokens; all 17 looks + dark. A11y: expanded/collapsed announced; keyboard-toggle; 44 pt target. Reduce-motion: collapse cross-fades rather than animating height.

#### Test plan
app/test/widget/editor/text/toggle_block_test.dart (collapse/expand, content preserved, keyboard toggle), app/test/widget/editor/text/toggle_export_test.dart (export emits full content), app/test/golden/toggle_looks_test.dart. 

#### Dependencies
[SN-TXT-004](text.md#sn-txt-004) (block model).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-018

<a id="sn-txt-018"></a>

**Add hyperlinks and note/page links with URL sanitisation**

| Field | Value |
|---|---|
| GitHub | #662 |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | text, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-003](text.md#sn-txt-003), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-CODE-4`, `OWASP-A03`, `CWE-79`, `CWE-601`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Inline links to URLs and to other notebooks/pages, with bidirectional backlinks surfaced in a page's "linked from" list, are a key knowledge-base feature (PRD-ED-108). Links are the highest-risk text feature: only safe schemes may be allowed (https, mailto, internal sane), never javascript:/data: executable links, and external links must be confirmed before opening (PRD-ED-108 Sec; CLAUDE.md section 7.8 - a link lands in view/confirm, never auto-mutates). This issue implements the Link object/mark, the note/page link target, URL sanitisation, the confirm-before-open flow, and derived backlinks.

#### Scope
**In:** applying an inline link mark (fixed/after anchor, from [SN-TXT-003](text.md#sn-txt-003)) with a Link object target {kind: page|notebook|object|url|heading, ref} (document-model section 1.2 Link); URL scheme sanitisation (allow https/mailto/sane only); confirm dialog before opening an external URL; internal links navigate in-app; derived backlinks ("linked from") computed by inverting Link objects, never stored as edges; broken-link (tombstoned target) renders as broken and is filterable.
**Out:** the FTS/backlink index build-out (SN-SRCH-002), the graph view (SN-STDY/PRD-CO), paste-link sanitisation ([SN-TXT-009](text.md#sn-txt-009)), external browser/app launch policy beyond confirm.

#### Acceptance criteria
- [ ] A link to https/mailto/sane is accepted; a javascript:, data:, file: or vbscript: URL is rejected and never becomes a clickable link (CWE-79).
- [ ] Opening an external URL shows a confirm sheet with the destination before navigating; an internal page/notebook link navigates in-app without confirm (PRD-ED-108 Sec).
- [ ] A link to a tombstoned target renders as "broken" and is filterable; it never dangles or crashes.
- [ ] Backlinks are derived: a page shows every page/note that links to it ("linked from") without a stored edge; deleting a source updates it.
- [ ] Links carry descriptive accessible names, never "click here" (PRD-ED-108 A11y).

#### Technical notes
app/lib/editor/text/link/ for the mark + confirm flow; the Link object is created in packages/sane_core ([SN-TXT-003](text.md#sn-txt-003) anchors + SN-CORE-002 Link record). URL scheme allow-list shared with [SN-TXT-009](text.md#sn-txt-009). Backlinks are DERIVED by scanning Link objects (document-model section 1.2 Link) - inverted by SN-SRCH-002 at index time; render "linked from" from that index. Verified deep links only for sane targets (CLAUDE.md section 7.8). Implements PRD-ED-108.

#### Security & privacy
Links are the primary injection/redirect surface in text. Threats: XSS via script-scheme link (CWE-79), open redirect / unexpected navigation (CWE-601), unvalidated target (CWE-20), untrusted link data (MASVS-CODE-4), unsafe deep link (MASVS-PLATFORM-3). Controls: scheme allow-list, confirm-before-open for external, in-app resolution for internal, broken-target handling, descriptive names. IDs: MASVS-PLATFORM-3, MASVS-CODE-4, OWASP-A03, CWE-79, CWE-601, CWE-20.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. External-open confirm uses a SaneOverlay/sheet showing the full destination; broken links show a muted broken style (not colour-only). All 17 looks + dark. A11y: link accessible name = its label/target text; confirm dialog focus-trapped; 44 pt targets. 

#### Test plan
app/test/security/link_sanitiser_test.dart (scheme allow-list, js/data rejection), app/test/widget/editor/text/link_confirm_test.dart (external confirm, internal navigate), packages/sane_core/test/text/backlinks_derived_test.dart (inverted, broken-target). 

#### Dependencies
[SN-TXT-003](text.md#sn-txt-003) (link mark anchoring), SN-CORE-002 (Link object). Coordinates with SN-SRCH-002 (backlink index).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-019

<a id="sn-txt-019"></a>

**Implement tables (insert, edit, add/remove rows and columns)**

| Field | Value |
|---|---|
| GitHub | #663 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | L |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-004](text.md#sn-txt-004), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-400`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Tables let students lay out structured notes (comparisons, data), and are a Table object in the document model with add/remove rows/cols, cell text and basic borders (PRD-ED-109). The model already specifies tables: ordered row/col movable-lists, a cell map to independent text sub-documents so two people editing different cells never conflict, and per-row/col size maps (docs/architecture/document-model.md section 1.2 Table). The roadmap places tables in M2 delivery (docs/roadmap.md M2), superseding the PRD's indicative M3 tag. This issue implements the Table object, its editing UI, and export of table semantics.

#### Scope
**In:** the Table object (rows/cols movable-lists, cells map to TextBlock sub-documents, colWidths/rowHeights LWW-maps); insert table; add/remove/reorder rows and columns; edit cell text (each cell is a rich-text CRDT); basic borders; tab/arrow navigation between cells; column resize; row/column header semantics.
**Out:** hand-drawn table recognition (rough grid -> clean table) which is a MAY via the shape engine (SN-SHP/SN-HWR), spreadsheet formulas, CSV import/export writers (SN-SHR - but coordinate the injection-safe contract), the block model container ([SN-TXT-004](text.md#sn-txt-004)).

#### Acceptance criteria
- [ ] Inserting a table creates an R x C grid; add/remove/reorder rows and columns work and merge (movable-list) with no cell loss.
- [ ] Two devices editing different cells never conflict; editing the same cell converges via the cell's rich-text CRDT.
- [ ] Cell text supports the standard inline formatting; Tab/Shift-Tab and arrows move between cells; a new row is added on Tab past the last cell.
- [ ] Row/column counts are bounded (default max 200x50) so a crafted document cannot exhaust memory (CWE-400); over-cap insert is a no-op with a toast.
- [ ] Tables expose row/column header + cell semantics to screen readers (PRD-ED-109 A11y).

#### Technical notes
packages/sane_core/lib/src/text/table.dart (Table CRDT: rows/cols movable-list, cells LWW-map of CellRef -> TextBlock id, colWidths/rowHeights LWW-maps per document-model section 1.2) + app/lib/editor/text/table/ for the grid UI. Cell contents are independent RichTextCrdt sub-documents ([SN-TXT-002](text.md#sn-txt-002)). Row/col ops reuse the movable-list machinery (section 4.3). Bound counts before applying remote ops (CWE-20/400). Borders/sizes from tokens. Implements PRD-ED-109; export selectable in PDF via [SN-TXT-020](text.md#sn-txt-020).

#### Security & privacy
Table text is note content: on-device, never logged, E2E-encrypted before sync. Threats: resource exhaustion via a crafted huge table (CWE-400) - mitigated by row/col caps; malformed remote table ops (CWE-20) - validated before fold. Cell text destined for CSV export must be formula-injection-safe (defused in [SN-TXT-009](text.md#sn-txt-009) / export). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-400, CWE-20.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5. Grid, borders and resize handles use tokens; all 17 looks + dark. Empty state: a fresh table shows placeholder cells. A11y: row/column headers + cell coordinates announced; keyboard cell navigation; 44 pt resize handles with a non-drag alternative (add/remove menu, WCAG 2.5.7). RTL mirrors column order.

#### Test plan
packages/sane_core/test/text/table_crdt_test.dart (row/col ops merge, per-cell convergence, caps), app/test/widget/editor/text/table_edit_test.dart (Tab navigation, add-on-tab, resize), app/test/a11y/table_semantics_test.dart, app/test/golden/table_looks_test.dart. 

#### Dependencies
[SN-TXT-004](text.md#sn-txt-004) (block container), SN-CORE-002 (Table object fields). Uses [SN-TXT-002](text.md#sn-txt-002) for cell text.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-020

<a id="sn-txt-020"></a>

**Ensure text-ink coexistence, z-order and selectable-text export**

| Field | Value |
|---|---|
| GitHub | #664 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-005](text.md#sn-txt-005), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
Sane Notes' differentiator is one page where typed text and handwriting coexist: ink can be written over/around text, text boxes reflow without disturbing anchored ink, z-order is editable, and on export text stays selectable in PDF where possible (PRD-ED-111). Reading order for mixed content must be defined and exposed to screen readers (PRD-ED-111 A11y). This issue makes text and ink share the canvas correctly - hit-testing, z-order, reflow, and the export contract - without regressing ink latency.

#### Scope
**In:** interleaving text boxes and ink/shape objects in one layer z-order; editable z-order (bring forward/send back) for text boxes; text reflow that does not move anchored ink; correct pointer routing (a tap in a text box edits text, a stroke over a box draws ink) using the tool state machine; the export contract that emits text as selectable text (not a raster) in PDF where the exporter supports it; defined reading order (top-to-bottom, then z-order).
**Out:** the export file writers themselves (SN-SHR/SN-PDF-002 - this issue defines the selectable-text contract they consume), ink capture/rendering (SN-INK), lasso selection of mixed objects (SN-ED-004), the text box tool ([SN-TXT-005](text.md#sn-txt-005)).

#### Acceptance criteria
- [ ] A text box and ink can overlap; changing a box's z-order moves it above/below ink and persists.
- [ ] Editing/reflowing a text box (typing, resize) does not move ink drawn over or around it.
- [ ] Pointer routing is correct: with the Text tool a tap edits the box; with the pen ink is drawn over the box; palm/finger rules from ink are respected.
- [ ] Exported PDF keeps typed text as selectable, searchable text (verified by extracting text from the export) where the exporter supports it; otherwise it degrades to a faithful raster with a recorded note.
- [ ] Reading order for mixed content is defined (top-to-bottom, then z-order) and exposed to VoiceOver/TalkBack (PRD-ED-111 A11y).

#### Technical notes
Z-order uses the object FracIndex zIndex within the layer (document-model section 1.2 Object base); text boxes and ink share the layer object set. Pointer routing lives in the editor tool state machine (SN-ED-002): a raw Listener for ink, hit-testing text boxes for edit (must not hop isolates on the hot draw path, CLAUDE.md section 8). Export contract: text objects expose their runs to the PDF exporter (SN-PDF-002) as a selectable text layer; document the fallback. Implements PRD-ED-111.

#### Security & privacy
None beyond baseline: text and ink are note content, on-device, never logged, E2E-encrypted before sync; export is user-initiated. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7 (Editor). Overlap and z-order feel natural; all 17 looks + dark. A11y: the a11y tree presents mixed content in a defined reading order (component-inventory section 5 SaneCanvas parallel a11y tree); OCR alt-text for ink comes from the recognition engine (out of scope here). Must not add latency to the ink draw loop (perf budget, decision 7).

#### Test plan
app/test/widget/editor/text/coexistence_zorder_test.dart (overlap, z-order persist, reflow-does-not-move-ink), app/test/widget/editor/text/pointer_routing_test.dart, app/integration_test/text_pdf_export_selectable_test.dart (extract selectable text). 

#### Dependencies
[SN-TXT-005](text.md#sn-txt-005) (text box), SN-ED-002 (tool state + canvas). Coordinates with SN-PDF-002 (export text layer).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-021

<a id="sn-txt-021"></a>

**Make typed text fully accessible (semantics, Dynamic Type, SR editing)**

| Field | Value |
|---|---|
| GitHub | #665 |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-006](text.md#sn-txt-006), [SN-TXT-010](text.md#sn-txt-010) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Accessibility is a locked decision (WCAG 2.2 AA; VoiceOver/TalkBack for all chrome; keyboard-reachable on web; Dynamic Type) and the text layer is where much of it lives, because a painted-only text field would be invisible to a screen reader (docs/product/prd-01-editor-ink-brushes.md section 9; A11Y-BASE; docs/design/accessibility.md). This issue consolidates and verifies the text-specific a11y: the editable field is a real accessible input, every formatting/list/table/link control exposes name/role/state/value, structure (headings/lists/quotes/tables) maps to correct semantic roles, and Dynamic Type is honoured.

#### Scope
**In:** ensuring the native/web editable field is a real accessible text input (screen-reader read + edit); name/role/state/value on every text control (toolbar toggles, list markers, checkboxes, disclosure, link, table cells); semantic roles for headings/lists/quotes/callouts/code/tables; Dynamic Type / system font scale on all text chrome and body; focus order and keyboard reachability on web; announcing formatting/colour changes; contrast checks against every look.
**Out:** the underlying widgets ([SN-TXT-006](text.md#sn-txt-006)/[SN-TXT-010](text.md#sn-txt-010)/[SN-TXT-012](text.md#sn-txt-012)/[SN-TXT-019](text.md#sn-txt-019)) which own their own a11y AC (this issue is the cross-cutting audit + gaps), OCR alt-text for handwriting (SN-HWR), the global a11y framework (SN-A11Y-001).

#### Acceptance criteria
- [ ] A screen reader can read and edit text in a box on iOS/Android/web (native input + web contenteditable), with caret/selection announced.
- [ ] Every text control exposes correct name/role/state/value (WCAG 4.1.2); casing is visual only, never in the accessible name.
- [ ] Headings, lists, checkboxes, quotes/callouts, code language, links and table headers announce their correct roles/state.
- [ ] All text respects Dynamic Type / system font scale and never drops below the legible floor; text chrome contrast >= 4.5:1 in all 17 looks x dark (uses a11y-adjusted tokens where needed).
- [ ] Full keyboard operation on web: enter/exit boxes, move caret, apply formatting, navigate lists/tables.

#### Technical notes
Cross-cutting pass over app/lib/editor/text/*; use Flutter Semantics (label/role/checked/expanded/textField), Directionality for RTL, and the a11y-adjusted tokens (aciA11y, acIconA11y) from component-inventory section headers where raw pairings fail contrast. Verify against docs/design/accessibility.md. Reading order per PRD-ED-111. No painted-only fields (PRD-ED-103 A11y).

#### Security & privacy
None beyond baseline: text is note content, on-device, never logged, E2E-encrypted before sync; a11y metadata carries no secrets. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/accessibility.md + screens-and-flows.md section 7.5. Covers all 17 looks + dark for contrast; honours reduce-motion and reduce-transparency. This issue is the text a11y guarantee behind every other text UI issue.

#### Test plan
app/test/a11y/text_semantics_audit_test.dart (name/role/state/value on all controls), app/test/a11y/text_dynamic_type_test.dart (scale + floor), app/integration_test/text_screenreader_test.dart (read + edit via SR), contrast golden checks in app/test/golden/text_contrast_test.dart. 

#### Dependencies
[SN-TXT-006](text.md#sn-txt-006) (accessible input), [SN-TXT-010](text.md#sn-txt-010) (formatting controls). Coordinates with SN-A11Y-001.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-022

<a id="sn-txt-022"></a>

**Build the text test suite (CRDT, widget, golden, integration)**

| Field | Value |
|---|---|
| GitHub | #666 |
| Type | test |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-002](text.md#sn-txt-002), [SN-TXT-005](text.md#sn-txt-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4` |
| Extra labels | agent-ready |

#### Context
Text correctness is easy to regress (a merge that drops a character, a golden that shifts a look, a sanitiser that lets a link through), so the area needs a consolidated, CI-gated test suite alongside the per-issue tests (docs/security/ssdlc-process.md DoD; CLAUDE.md section 10). This issue builds the umbrella suite and the shared fixtures/harness: a CRDT convergence corpus, golden coverage across the 17 looks x dark, integration coverage of IME/typing, and the security abuse fixtures for paste/link/font.

#### Scope
**In:** a shared text test harness (a fake input-delta source, a two-replica merge driver, a rich-text golden helper); a randomised CRDT convergence corpus and replay; golden tests for text/format/list/table/code/quote across all 17 looks + light/dark; an IME/typing integration flow; wiring the security abuse fixtures ([SN-TXT-009](text.md#sn-txt-009) paste, [SN-TXT-018](text.md#sn-txt-018) links, [SN-TXT-025](text.md#sn-txt-025) fonts) into CI; a per-issue coverage checklist.
**Out:** the features under test (their own issues), the perf harness (SN-PERF), the global golden infra (SN-QA-001) which this consumes.

#### Acceptance criteria
- [ ] A two-replica merge driver replays a randomised op corpus and asserts convergence for characters, marks, blocks and tables (>= 200 seeds), failing on any divergence.
- [ ] Golden tests cover a representative text page (headings/lists/checklist/quote/callout/code/table/links) in all 17 looks x light/dark and are stable.
- [ ] An integration test types via the IME path, applies formatting, and asserts the persisted + reopened document matches.
- [ ] The paste/link/font abuse fixtures run in CI and fail the build on any regression (a script link accepted, an oversized paste hanging, a malformed font loaded).
- [ ] The suite runs headless in CI within the standard job budget.

#### Technical notes
packages/sane_core/test/text/_harness/ (merge driver, corpus generator) and app/test/text/_harness/ (golden + fake input). Reuse the golden infra from SN-QA-001 and tokens from SN-DS-002 to enumerate the 17 looks. Abuse fixtures live under app/test/security/fixtures/. Ties into CI per docs/security/devsecops-pipeline.md (unit/widget/golden gates). Fake input-delta source mirrors [SN-TXT-006](text.md#sn-txt-006).

#### Security & privacy
None beyond baseline for the code under test; the suite itself asserts the text security controls (paste/link/font) and MUST use only synthetic fixtures - no real note content, no secrets in fixtures (CLAUDE.md section 7.2). IDs: MASVS-STORAGE-1, MASVS-CODE-4.

#### UX notes
None beyond baseline (test infrastructure). It guarantees the 17-looks + dark rendering promise and the a11y/latency promises are actually verified for text. No logging of content; fixtures are synthetic.

#### Test plan
This issue IS the test plan; deliverables: packages/sane_core/test/text/text_convergence_suite_test.dart, app/test/golden/text_page_looks_test.dart, app/integration_test/text_end_to_end_test.dart, plus CI wiring of app/test/security/*_test.dart. 

#### Dependencies
[SN-TXT-002](text.md#sn-txt-002) (CRDT under test), [SN-TXT-005](text.md#sn-txt-005) (text box). Consumes SN-QA-001 (golden infra), SN-DS-002 (looks enumeration).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-023

<a id="sn-txt-023"></a>

**Add on-device spellcheck for typed text**

| Field | Value |
|---|---|
| GitHub | #667 |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | text, ocr-hwr |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-001](text.md#sn-txt-001) |
| Depends on | [SN-TXT-006](text.md#sn-txt-006) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-NETWORK-1` |
| Extra labels | agent-ready |

#### Context
Typed notes need spellcheck, and the privacy posture requires it to run on-device so note content never leaves the device for a cloud spell service (CLAUDE.md decision 3/6; PRD-ED-105 no-remote-fetch spirit). The PRDs specify handwriting spellcheck (PRD-LB-387, recognition area) but are silent on typed-text spellcheck; decision: use the platform's on-device spellcheck/text-services APIs and a bundled dictionary fallback, with a per-language toggle, and no cloud call (recorded here per the "decide sensibly when a doc is silent" rule). This issue adds inline misspelling detection, suggestions, and a per-language/per-notebook enable.

#### Scope
**In:** inline misspelling detection using the platform on-device spell service (iOS/macOS UITextChecker, Android/Flutter SpellCheckService) with a bundled dictionary fallback; underline of misspellings; a suggestion menu to replace/ignore/learn; a per-language selection and a per-notebook/profile toggle; a custom-dictionary of learned words stored locally; disabling spellcheck inside code blocks.
**Out:** handwriting-style spellcheck of ink (PRD-LB-387, SN-HWR), grammar/AI rewrite (SN-AI), the recognition engine, autocorrect during composition (owned by the IME, [SN-TXT-006](text.md#sn-txt-006)).

#### Acceptance criteria
- [ ] Misspelled words are underlined as the user types; a suggestion menu offers replacements, Ignore, and Add to dictionary.
- [ ] Spellcheck runs fully on-device with no network request (no-egress test); the selected language and learned words persist locally.
- [ ] Language is selectable per notebook; spellcheck is off inside code blocks ([SN-TXT-016](text.md#sn-txt-016)).
- [ ] Choosing a suggestion replaces the word as an undoable edit through the CRDT.
- [ ] The suggestion menu is keyboard-operable and announces suggestions to screen readers.

#### Technical notes
app/lib/editor/text/spellcheck/ wrapping Flutter's SpellCheckService / platform text checker (on-device) with a bundled word-list fallback; misspelling ranges map to render-time underlines (not stored marks); replacement issues CRDT insert/delete ([SN-TXT-002](text.md#sn-txt-002)). Learned words stored in local settings, never synced to any server (MASVS-NETWORK-1). Doc-silent decision (platform on-device + bundled dictionary, no cloud) recorded in this issue's notes and to be reflected in a settings row. Coordinates with recognition-language selection (PRD-02) where a shared language pref exists.

#### Security & privacy
Text and learned words are note content: on-device, never logged, E2E-encrypted where synced; the custom dictionary is local. Control: no cloud spellcheck call - all checking on-device (MASVS-NETWORK-1) so reading content is never leaked. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-NETWORK-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5 + Settings (a per-notebook toggle, docs/design/component-inventory.md section 8 SaneSettingRow). Misspelling underline uses a token colour + non-colour cue; all 17 looks + dark. A11y: suggestion menu labelled, keyboard-operable, announced; never colour-only. 

#### Test plan
app/test/widget/editor/text/spellcheck_test.dart (underline, suggestion replace/ignore/learn, off-in-code), app/test/security/spellcheck_no_egress_test.dart, app/integration_test/text_spellcheck_test.dart. 

#### Dependencies
[SN-TXT-006](text.md#sn-txt-006) (input path). Coordinates with [SN-TXT-016](text.md#sn-txt-016) (disable in code).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-024

<a id="sn-txt-024"></a>

**Add an insert date / time stamp text action**

| Field | Value |
|---|---|
| GitHub | #668 |
| Type | task |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | text, editor |
| Size | XS |
| SDLC | implementation |
| Parent | [SN-TXT-010](text.md#sn-txt-010) |
| Depends on | [SN-TXT-010](text.md#sn-txt-010) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
A small, high-value convenience competitors ship: a text action that inserts the current date, time, or date-time at the caret, locale-formatted, as ordinary editable text (PRD-ED-183). This is a self-contained action on top of the formatting toolbar ([SN-TXT-010](text.md#sn-txt-010)) and the input path: format now() via intl for the active locale and insert it as a normal textInsert, after which it is just editable text.

#### Scope
**In:** a formatting-menu action (and optional shortcut) to insert Date, Time, or Date-time at the caret; locale-aware formatting via intl; inserted content is plain editable text (not a live/updating field); respects the active locale and 12/24h setting.
**Out:** live/auto-updating timestamps, scheduled reminders/notifications (SN-NOTF), the formatting toolbar itself ([SN-TXT-010](text.md#sn-txt-010)), the input bridge ([SN-TXT-006](text.md#sn-txt-006)).

#### Acceptance criteria
- [ ] The action inserts the current date, time, or date-time at the caret as editable text in the active locale's format (verified for en, hi, and one RTL locale).
- [ ] The inserted text is an ordinary textInsert (editable, undoable, selectable) - not a special field.
- [ ] The action is reachable from the formatting menu and via an optional shortcut; it is keyboard-operable.
- [ ] Formatting honours the user's 12/24-hour and locale settings.
- [ ] No timezone or content is logged.

#### Technical notes
app/lib/editor/text/actions/insert_datetime.dart; format DateTime.now() with package:intl DateFormat for the active locale; insert via RichTextCrdt.insert ([SN-TXT-002](text.md#sn-txt-002)) as a normal edit (undoable through SN-ED-003). Menu entry lives in the formatting bar ([SN-TXT-010](text.md#sn-txt-010)). Implements PRD-ED-183.

#### Security & privacy
None beyond baseline: the inserted timestamp becomes note content, on-device, never logged, E2E-encrypted before sync; the current time is not a secret and is not sent anywhere. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1.

#### UX notes
Surface: docs/design/screens-and-flows.md section 7.5 (formatting/insert menu). Menu item labelled "Insert date / time"; all 17 looks + dark. A11y: labelled menu action, keyboard-operable, announced; 44 pt target. 

#### Test plan
app/test/widget/editor/text/insert_datetime_test.dart (locale formats en/hi/RTL, inserts editable text, undoable, 12/24h). 

#### Dependencies
[SN-TXT-010](text.md#sn-txt-010) (formatting menu). Uses [SN-TXT-002](text.md#sn-txt-002) insert + SN-ED-003 undo.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TXT-025

<a id="sn-txt-025"></a>

**Import custom fonts through a hardened, sandboxed loader**

| Field | Value |
|---|---|
| GitHub | #669 |
| Type | feature |
| Priority | p3 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | text, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TXT-011](text.md#sn-txt-011) |
| Depends on | [SN-TXT-011](text.md#sn-txt-011) |
| Security controls | `MASVS-CODE-4`, `MASVS-STORAGE-1`, `OWASP-A08`, `CWE-434`, `CWE-400`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Users may import a TTF/OTF font for text runs (a competitor-parity MAY), embedded into .sanenote/PDF export where licensing allows (PRD-ED-184). Critically, a font file is untrusted third-party content and historically a rich exploit surface, so it MUST be parsed in a hardened, sandboxed loader with bounds checks, malformed-table rejection, size caps and no code execution beyond the platform shaper (PRD-ED-184 Sec; CLAUDE.md section 7.8). This issue implements the import flow, the hardened validation, per-profile storage, and the licence-aware embedding gate.

#### Scope
**In:** importing a TTF/OTF via Files/share-sheet; a hardened validator (verify magic/type, bounds-check table directory, reject malformed/oversized tables, cap file size, reject variable-font/CFF features we do not support rather than trusting them); per-profile storage of accepted fonts; exposing imported fonts in the per-run font picker ([SN-TXT-011](text.md#sn-txt-011)); a licence-aware embedding gate for .sanenote/PDF export; provenance shown before enabling.
**Out:** the bundled font set + size scale ([SN-TXT-011](text.md#sn-txt-011)), general blob storage (SN-CORE-004), export writers (SN-SHR/SN-PDF), brush/.sanepen import (SN-BRS-... PRD-ED-065 which follows the same rules).

#### Acceptance criteria
- [ ] A valid TTF/OTF imports and becomes selectable per run; a malformed, truncated, or oversized (> cap, default 8 MB) file is rejected with a user-safe toast and never loaded (CWE-434/CWE-400).
- [ ] The loader validates the file type by content, not extension, and bounds-checks the table directory before use (CWE-20); it never executes embedded programs beyond the platform text shaper.
- [ ] Imported fonts are per-profile and do not leak across profiles.
- [ ] Embedding into .sanenote/PDF export is gated by a licence acknowledgement; provenance (name, "unverified") is shown before the font is enabled.
- [ ] A fuzz corpus of malformed fonts fails closed (no crash, no load) in CI.

#### Technical notes
app/lib/editor/text/fonts/import/ + a hardened parser step before handing bytes to Flutter's FontLoader; validate off the UI isolate (Isolate.run) with resource caps (CLAUDE.md section 8/7.8). Store as a content-addressed blob (SN-CORE-004) referenced per profile; register with the font picker ([SN-TXT-011](text.md#sn-txt-011)). Mirror the untrusted-import discipline used for brushes (PRD-ED-065) and the input-validation checklist (docs/security/secure-coding-checklist.md section 1). Implements PRD-ED-184. Licence gate is a user acknowledgement, not a legal guarantee.

#### Security & privacy
This is a supply-chain/untrusted-file surface. Threats: malicious font parsing (CWE-434 unrestricted upload of dangerous type, CWE-20 improper validation), decompression/allocation bomb (CWE-400), tampered font integrity (OWASP-A08), untrusted third-party code (MASVS-CODE-4). Controls: content-type + table bounds validation, size/allocation caps, off-isolate parsing, no code execution, provenance display, fuzz corpus. Fonts stored encrypted at rest like any blob (MASVS-STORAGE-1). IDs: MASVS-CODE-4, MASVS-STORAGE-1, OWASP-A08, CWE-434, CWE-400, CWE-20.

#### UX notes
Surface: font picker (docs/design/screens-and-flows.md section 7.5) + import via Files. On reject show a SaneToast ("That font could not be loaded"), never inline red. Provenance/licence acknowledgement in a SaneOverlay before enabling. All 17 looks + dark. A11y: import flow announces success/failure and the font name (PRD-ED-184 A11y); never overrides the user's "readable font" choice.

#### Test plan
app/test/security/font_import_hardening_test.dart (type-by-content, table bounds, size cap, off-isolate), app/test/security/font_fuzz_corpus_test.dart (malformed corpus fails closed), app/test/widget/editor/text/custom_font_picker_test.dart (per-profile, provenance gate). Corpus under app/test/security/fixtures/hostile_fonts/.

#### Dependencies
[SN-TXT-011](text.md#sn-txt-011) (font picker + size scale). Uses SN-CORE-004 (blob storage).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-030

<a id="sn-web-030"></a>

**Evaluate a DOM text overlay for IME, Scribble and selection on web**

| Field | Value |
|---|---|
| GitHub | #843 |
| Type | spike |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | text, a11y |
| Size | M |
| SDLC | design |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-TXT-001](text.md#sn-txt-001), [SN-WEB-021](a11y.md#sn-web-021) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-PRIVACY-1`, `CWE-79`, `CWE-1021` |
| Extra labels | needs-decision |

#### Context
Flutter web's weakest area is text: it is **painted, not DOM**, so IME composition, Apple **Scribble** (which only works in real DOM text fields), native selection, spellcheck and screen-reader semantics are all degraded (`docs/platform/web.md` §3 L3 and §11 R3, `docs/adr/0010-web-pwa-strategy.md` decision 5). ADR-0010 explicitly flags a **`verify`**: determine whether an `HtmlElementView`-hosted DOM text field improves IME/Scribble/selection on web, and states that if the painted-text UX misses WCAG 2.2 AA the escalation is a DOM/React shell for web only. This is a time-boxed spike that ends in a written decision, because the answer changes the typed-text plan for the whole web surface and affects `PRD-CO-374` (platform IMEs must work without intercepting composition).

#### Scope
**In:** a time-boxed prototype (≤ 5 days) hosting a DOM text input over the Flutter canvas via `HtmlElementView`, measured against the painted-text baseline for: Pinyin/Kana/Hangul IME composition, iPadOS Scribble into the field, native selection handles and caret, spellcheck, screen-reader interaction, RTL/Arabic shaping, focus coordination with Flutter, and z-order/scroll/zoom correctness; a written recommendation with evidence.
**Out:** shipping the chosen approach (a follow-up issue), the rich-text model ([SN-TXT-001](text.md#sn-txt-001)), and canvas semantics ([SN-WEB-021](a11y.md#sn-web-021)).

#### Acceptance criteria
- [ ] A prototype branch exists demonstrating both paths side by side on the same text block.
- [ ] Evidence is recorded for each dimension (IME per language, Scribble, selection, spellcheck, screen reader, RTL, focus, scroll/zoom) as pass/partial/fail with screenshots or recordings.
- [ ] Measured cost is reported: added frame time, added bundle size, and any ink-latency effect on the B3 budget.
- [ ] The security implications of introducing a DOM element into the app origin are analysed (XSS surface, CSP/Trusted Types compatibility, event bridging).
- [ ] A written recommendation lands in `docs/platform/web.md` §11 R3 and ADR-0010 decision 5 with one of: (a) keep painted text, (b) adopt the DOM overlay for text fields, (c) escalate to a DOM/React web shell for web only.
- [ ] If WCAG 2.2 AA cannot be met by the recommended option, the escalation decision is explicitly raised to the maintainer rather than deferred.
- [ ] A follow-up implementation issue is filed with a concrete scope derived from the recommendation.

#### Technical notes
Prototype in a scratch branch under `app/lib/text/web_dom_overlay/`; `HtmlElementView` places a real element in the platform-view layer, so test z-ordering against the canvas, hit-testing, scroll and zoom (the classic failure modes) and what happens during a repaint-heavy inking session. Any DOM element must comply with the CSP and Trusted Types policy from [SN-WEB-014](security.md#sn-web-014) — no inline handlers, no `innerHTML`. Test IMEs on real systems (macOS Pinyin, Japanese Kana/Kanji, Korean Hangul) and Scribble on an iPad; emulators will mislead. Reference `PRD-CO-374` (IME support) and `PRD-CO-372` (RTL mirroring). ADR-0003 governs how the resulting state integrates with Riverpod.

#### Security & privacy
**needs-decision (maintainer):** whether to keep painted text, adopt a DOM overlay, or escalate to a web-only DOM shell — a decision with architecture, accessibility and cost consequences. Threats introduced by a DOM overlay: a new HTML sink inside the app origin (CWE-79, OWASP-A03) and a focus/overlay confusion surface that could be abused for clickjacking-style input capture (CWE-1021); keystrokes and composition text are note content (MASVS-PRIVACY-1, CWE-532). Controls to evaluate in the spike: the overlay must be same-origin, non-`contenteditable`-HTML (plain input/textarea) or sanitised through the Trusted Types policy; no inline script; no logging of composition text; the overlay must never be positioned to overlay another app-critical control invisibly.

#### UX notes
The affected surfaces are the Editor text tool and text-edit bar (`docs/design/screens-and-flows.md` §7.5), Search input (§11), and every settings/login field. Whatever the recommendation, caret, selection handles, placeholder and error styling must be reproducible in all **17 looks, light and dark** — a DOM overlay that cannot be themed with `sane_ui` tokens is a finding, not a detail, and must be recorded as such. States to evaluate: empty, composing (IME candidate window), selected, error, disabled, and RTL. Accessibility is a primary evaluation axis: screen-reader announcement quality, keyboard behaviour, 44 px targets and ≥ 4.5:1 contrast (`PRD-CO-310`, `PRD-CO-315`, `PRD-CO-321`).

#### Test plan
Spike deliverables rather than permanent tests: a prototype branch, a recorded evidence matrix in `docs/research/web-text-overlay-spike.md`, and screen-reader session notes. If option (b) is recommended, the follow-up issue must name `app/test/web/dom_text_overlay_test.dart`, `app/test/web/ime_composition_test.dart` and `app/integration_test/web/text_selection_test.dart` as its required tests. Manual evaluation on: macOS Safari + VoiceOver, Chrome + NVDA, iPadOS Safari + Scribble, and an Arabic RTL locale.

#### Dependencies
[SN-TXT-001](text.md#sn-txt-001), [SN-WEB-021](a11y.md#sn-web-021).

#### Definition of done
- [ ] Written recommendation merged into docs/platform/web.md §11 and ADR-0010 decision 5
- [ ] Follow-up implementation issue filed with concrete scope and tests
- [ ] Reviewed against docs/security/secure-coding-checklist.md §6.2

---

