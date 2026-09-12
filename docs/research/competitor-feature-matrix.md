# Competitor Feature Matrix — Sane Notes

> Purpose: a decision-grade, granular feature comparison of the note/ink apps Sane Notes competes with, plus a "Sane Notes target" column that assigns each capability to **v1 / v2 / later**. Written for an autonomous coding agent with zero prior context: every row is a concrete capability, every cell is a verdict. Where a competitor's behaviour is genuinely undocumented in our research it is marked `?` rather than guessed.
>
> Source teardowns (committed under `docs/research/sources/`): `research/notability.md`, `research/goodnotes.md`, `research/goodnotes-userguide-inventory.md`, `research/onenote.md`, `research/notion.md`, `research/apple-notes-freeform.md`, `research/samsung-notes-nebo-other.md`, `research/procreate.md`, `research/concepts-linea-paper-fresco.md`. CollaNote facts are from the product brief (no first-party teardown was crawled — treat as **verify** before shipping parity claims).
>
> Cross-links: product scope and v1/v2 grounding come from `docs/design/screens-and-flows.md`; design system from `docs/design/design-system.md`. Locked product decisions (stack, local-first zero-knowledge, cross-platform parity, on-device AI, MASVS L2) govern the target column.

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | Full first-class support |
| ⚠️ | Partial / gated (paywall, single platform, device-tier, or reduced) |
| ❌ | Not supported |
| ? | Undocumented in our research (unknown) |
| **v1 / v2 / later** | Sane Notes release target. **v1** = first public release (pen-first core, must-ship). **v2** = fast-follow (collaboration M6, advanced AI, presentation). **later** = post-v2 / ecosystem / optimisation. |

Column scope reminder:
- **Notability** = iPad/iPhone/Mac + new Android (Aug 2026) + Web App.
- **Goodnotes** = Goodnotes 6 across iPad/iPhone/Mac (native Swift) + Android/Windows/Web (SwiftWasm PWA). Verdicts reflect the **Apple** app unless the note says otherwise; non-Apple gaps are captured in "Parity gaps by platform".
- **OneNote** = Microsoft 365 client family; verdicts reflect the **strongest** client (usually Windows) with the gating client noted.
- **Notion** = block docs/databases platform (not pen-first) — included because it sets the bar on structure, collaboration, and publishing.
- **Apple Notes** = Apple Notes (with Freeform noted where it fills a gap); Apple-ecosystem only.
- **Samsung Notes** = Galaxy + S Pen (One UI 6/7/8); Galaxy-only + Windows.
- **Nebo** = MyScript Notes (formerly Nebo); recognition leader.
- **CollaNote** = iPad-only community-oriented note app; facts from brief only.
- **Sane Notes target** = what we commit to build and when.

Pen/brush rows also draw on **Procreate** (`research/procreate.md`) and **Concepts/Linea/Paper/Fresco/Tayasui** (`research/concepts-linea-paper-fresco.md`) as the reference bar for ink feel and gestures; those two are not competitor columns but are cited in the target rationale and in "Table stakes".

---

## 1. Organization & library

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Folders / subfolders | ⚠️ 6-level cap | ✅ unlimited + color/emoji/icon | ✅ Notebook→SectionGroup→Section→Page→Subpage | ⚠️ pages nest infinitely (no folders) | ✅ nested folders | ✅ + color | ⚠️ shallow ~3 levels | ⚠️ local/iCloud folders | ✅ **v1** unlimited nesting |
| First-class tags | ❌ | ? (folders/favorites only) | ✅ built-in + custom (desktop) | ⚠️ only via DB select props | ✅ `#tags` (iCloud only) | ❌ | ❌ | ? | ✅ **v1** per-note tags |
| Smart / saved searches | ❌ | ❌ | ⚠️ Find Tags summary | ⚠️ DB filtered views | ✅ Smart Folders | ⚠️ sort/filter | ❌ | ❌ | ⚠️ **v2** saved smart searches |
| Favorites / pinning | ⚠️ (widgets) | ✅ star + page bookmarks | ⚠️ recent/pin | ✅ Favorites | ✅ pin notes | ✅ favorites + pin | ? | ? | ✅ **v1** favorites + page bookmarks |
| Notebook covers | ⚠️ preset (Cloud) | ✅ covers + marketplace | ❌ (name/color only) | ⚠️ page cover image | ❌ | ✅ Note Covers (+AI) | ⚠️ custom covers | ✅ stickers/covers | ✅ **v1** covers; **later** marketplace |
| Grid / list views | ✅ | ✅ (list Apple only) | ⚠️ panes | ⚠️ sidebar | ✅ list + gallery | ✅ | ✅ | ? | ✅ **v1** grid + list |
| Document tabs (open several) | ❌ | ✅ tab bar | ⚠️ multi-window | ⚠️ desktop tabs | ⚠️ window per note | ? | ? | ? | ⚠️ **v2** tabs |
| Trash / recovery | ✅ 30 days | ✅ trash | ✅ 60-day recycle bin | ✅ version restore | ✅ recently deleted | ✅ trash | ✅ trash | ? | ✅ **v1** 30-day trash |
| Multiple local profiles | ❌ | ❌ | ❌ (accounts) | ⚠️ workspaces | ⚠️ accounts | ❌ | ❌ | ⚠️ nicknames | ✅ **v1** device-local profiles |
| Guest / no-account use | ⚠️ | ⚠️ (free) | ⚠️ | ❌ account required | ✅ local account | ✅ | ⚠️ (no sync free) | ✅ local by default | ✅ **v1** first-class guest mode |
| Home / "resume" surface | ✅ Library | ✅ | ⚠️ recent | ✅ Home dashboard | ⚠️ | ⚠️ | ⚠️ | ? | ✅ **v1** "pick up where you left off" |
| Backlinks / bidirectional links | ❌ | ⚠️ internal page links | ✅ wiki links | ✅ `@page` mentions | ✅ note-to-note links | ❌ | ❌ | ? | ⚠️ **v2** backlinks |
| Digital-planner support | ✅ hyperlinked planners | ✅ | ⚠️ | ❌ | ❌ | ⚠️ | ⚠️ | ⚠️ PDF outline/bookmarks | ✅ **v1** (PDF-backed pages) |
| Widgets (home screen) | ✅ iOS | ✅ Apple only | ✅ | ✅ | ✅ Quick Note | ✅ | ? | ? | ⚠️ **v2** widgets |

---

## 2. Ink & pen types

Reference bar for feel: Procreate's stamp-along-path engine (pressure/tilt/velocity → editable input curves) and Concepts' velocity/pressure pens with live Size/Opacity/Smoothing. See `research/procreate.md`, `research/concepts-linea-paper-fresco.md`.

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Basic pen (fixed/standard ink) | ✅ Pen | ✅ Ball Pen | ✅ Ink Pen | ❌ | ✅ Pen / Mono line | ✅ Pen | ✅ Interactive Ink | ✅ pen | ✅ **v1** |
| Pressure-sensitive pen | ✅ Pencil | ✅ Fountain/Brush | ⚠️ undocumented | ❌ | ✅ | ✅ (S Pen EMR) | ⚠️ recognition-first | ⚠️ | ✅ **v1** |
| Tilt/azimuth shading pencil | ✅ tilt-shade | ⚠️ tip flatness | ⚠️ undocumented | ❌ | ✅ Pencil tilt | ⚠️ undocumented | ❌ | ❌ | ✅ **v1** tilt-shade pencil |
| Calligraphy / nib-angle pen | ✅ Calligraphy (barrel-roll nib) | ✅ Brush Pen | ⚠️ effect pens | ❌ | ✅ reed pen (iPadOS 26) | ❌ | ❌ | ❌ | ✅ **v1** calligraphy nib |
| Editable pressure curve per pen | ❌ (global) | ⚠️ pressure slider | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ **v2** editable curve (Procreate-style) |
| Tip sharpness / flatness controls | ⚠️ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ⚠️ **v2** |
| Stroke stabilization / smoothing | ✅ (Calligraphy) | ✅ stabilization | ❌ | ❌ | ✅ Smart Script | ✅ clean-up | ⚠️ (ICR) | ⚠️ | ✅ **v1** per-pen smoothing slider |
| Tremor/motion-filter smoothing (a11y) | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ handwriting help | ❌ | ❌ | ⚠️ **v2** motion-filter mode |
| Solid / dashed / dotted strokes | ✅ (HL) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ? | ✅ **v1** |
| Reorderable color slots + HEX + eyedropper | ✅ 8 fast + 64 | ✅ + eyedropper | ⚠️ recent + more | ⚠️ text colors | ✅ grid/spectrum/slider | ✅ palette | ⚠️ | ✅ 11-slot fav bar | ✅ **v1** |
| Favorite-pen presets / quick bar | ✅ Toolbox | ✅ favorite pens | ⚠️ | ❌ | ❌ | ⚠️ | ❌ | ✅ 11 slots | ✅ **v1** favorite-tools bar |
| Effect / novelty pens (rainbow, glitter, galaxy) | ⚠️ Android only | ❌ | ✅ Galaxy/Rainbow/Lava (Win) | ❌ | ❌ | ❌ | ❌ | ? | ⚠️ **later** (pen plugins) |
| Editable vector ink after the fact (recolor/retype strokes) | ⚠️ split segments editable | ⚠️ lasso recolor + reflow | ❌ | ❌ | ⚠️ move/refine | ⚠️ | ⚠️ convert | ⚠️ lasso recolor | ✅ **v1** vector strokes (Concepts-style); **v2** change pen-type |
| Community/importable pen packs | ❌ | ⚠️ marketplace stickers | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ **later** `.sanepen` share |
| 120fps / low-latency wet-ink surface | ⚠️ "highly responsive" | ⚠️ | ⚠️ | n/a | ✅ PencilKit | ✅ | ✅ | ⚠️ | ✅ **v1** native front-buffer (Metal / Jetpack Ink) |

---

## 3. Highlighter modes

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Translucent highlighter, editable/erasable | ✅ | ✅ | ✅ 5 widths | ⚠️ text bg color | ✅ Marker | ✅ | ⚠️ frame/underline | ✅ | ✅ **v1** |
| Highlight sits behind ink (multiply) | ⚠️ | ✅ | ⚠️ | n/a | ⚠️ | ⚠️ | ⚠️ | ? | ✅ **v1** highlight layer under ink |
| Snap-to-text on PDF/typed | ✅ Smart Highlighter | ✅ long-press PDF text | ⚠️ | ❌ | ❌ | ⚠️ quick highlight (Note series) | ⚠️ | ❌ | ✅ **v1** snap PDF/typed text |
| Straight-line highlighter | ✅ hold-to-straighten | ✅ Draw in Straight Line | ⚠️ ruler | ❌ | ⚠️ ruler | ⚠️ | ⚠️ | ⚠️ hold-to-draw | ✅ **v1** |
| Dashed/dotted/pressure highlighter styles | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ **v2** |
| "Wet"/wash physics highlighter (bloom) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ **later** (Fresco-style delight) |

---

## 4. Eraser modes

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Partial / precision eraser (segment) | ✅ (segments stay editable) | ✅ Precision (Apple) | ✅ Point eraser | n/a | ✅ Pixel eraser | ✅ | ⚠️ | ⚠️ | ✅ **v1** |
| Whole-stroke eraser | ✅ | ✅ Stroke eraser | ✅ Stroke eraser | n/a | ✅ Object eraser | ✅ | ⚠️ | ✅ | ✅ **v1** |
| Scribble-to-erase gesture | ❌ | ✅ | ✅ | n/a | ✅ scratch-out | ❌ | ✅ pen gesture | ✅ | ✅ **v1** |
| Erase highlighter only / by content type | ⚠️ | ✅ erase-highlighter-only + choose type | ❌ | n/a | ❌ | ❌ | ❌ | ? | ✅ **v1** erase-by-type |
| Erase auto-corrects to Perfect Shape (hold) | ✅ | ❌ | ❌ | n/a | ❌ | ❌ | ❌ | ❌ | ⚠️ **later** |
| Zoom-scaled eraser size | ❌ | ❌ | ❌ | n/a | ❌ | ❌ | ❌ | ❌ | ⚠️ **v2** (Linea-style) |
| Non-destructive mask erase (recoverable) | ❌ | ❌ | ❌ | n/a | ❌ | ❌ | ❌ | ❌ | ⚠️ **later** (Concepts-style mask) |

---

## 5. Lasso / selection abilities

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Freeform + rectangular lasso | ✅ both | ✅ both | ✅ lasso + select | n/a | ✅ | ⚠️ | ✅ freehand/rect | ✅ | ✅ **v1** |
| Move / scale / rotate selection | ✅ | ✅ | ✅ | n/a | ✅ | ⚠️ | ⚠️ (weak on Docs) | ✅ resize | ✅ **v1** |
| Recolor / restyle selection | ✅ | ✅ | ⚠️ | n/a | ⚠️ | ⚠️ | ⚠️ | ✅ recolour | ✅ **v1** |
| Select by content-type filter | ❌ | ✅ (handwriting/images/text/comments) | ⚠️ | n/a | ⚠️ | ❌ | ❌ | ? | ⚠️ **v2** |
| Convert handwriting → text | ✅ | ✅ | ✅ (Win only) | n/a | ✅ Copy as Text | ✅ S Pen to text | ✅ | ✅ OCR via lasso | ✅ **v1** (Pro-gated convert) |
| Convert handwriting → math | ✅ (Plus) | ✅ (Apple) | ✅ Ink to Math | n/a | ✅ Math Notes | ✅ Math Solver | ✅ math block | ❌ | ⚠️ **v2** |
| Screenshot / export selection | ✅ save as sticker | ✅ screenshot | ⚠️ | n/a | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ **v1** |
| Save selection as reusable element | ✅ My Stickers | ✅ Create Element | ❌ | n/a | ⚠️ | ⚠️ | ❌ | ✅ sticker | ⚠️ **v2** |
| Reflow / resize handwriting like text | ❌ | ✅ Lasso Resize | ❌ | n/a | ⚠️ move/insert space | ⚠️ | ⚠️ | ❌ | ⚠️ **v2** |
| Circle-to-lasso pen gesture | ❌ | ✅ | ⚠️ (Surface loop) | n/a | ❌ | ❌ | ❌ | ? | ⚠️ **v2** |
| Drag selection out to another app | ✅ (Split View) | ✅ (Apple) | ⚠️ | n/a | ⚠️ | ⚠️ | ⚠️ | ? | ⚠️ **v2** (Concepts drag-out) |

---

## 6. Shapes, rulers & diagramming

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Ink-to-shape "draw & hold" | ✅ Perfect Shapes | ✅ | ✅ | ❌ | ✅ (~9 shapes) | ⚠️ | ✅ perfect shapes | ✅ hold-to-draw | ✅ **v1** |
| Dedicated shape tool + fill/stroke | ✅ | ✅ + connectors | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ **v1** rect; **v2** full set |
| Smart connectors / flowchart diagramming | ❌ | ✅ Quick Diagramming | ⚠️ | ⚠️ Kanban only | ❌ | ❌ | ✅ interactive diagrams | ❌ | ⚠️ **v2** |
| Snap shapes to grid / other strokes | ✅ red guidelines | ✅ snap to strokes | ⚠️ | n/a | ⚠️ | ❌ | ⚠️ | ? | ⚠️ **v2** |
| Editable shape vertices after creation | ✅ | ✅ Edit Shape | ⚠️ | n/a | ❌ | ❌ | ⚠️ | ? | ⚠️ **v2** |
| Ruler (straight-line guide) | ✅ (not Mac/iPhone) | ✅ | ⚠️ Windows only | ❌ | ✅ | ⚠️ | ❌ | ⚠️ | ✅ **v1** |
| Angle-measurement ruler | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ **later** |
| Grids / guides (iso, perspective) | ❌ | ❌ | ⚠️ rule/grid bg | ❌ | ⚠️ | ⚠️ | ❌ | ? | ⚠️ **later** (Concepts-style) |

---

## 7. Text & typing

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Type-anywhere text boxes | ✅ | ✅ + full-page (Apple) | ✅ note containers | ✅ blocks | ✅ | ✅ | ⚠️ | ✅ (2-layer attachment) | ✅ **v1** text boxes |
| Rich formatting (B/I/U/strike, color, size) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ **v1** |
| Headings / paragraph styles | ⚠️ | ✅ | ✅ H1–6 | ✅ | ✅ title/heading/body | ⚠️ auto-format | ✅ Documents | ❌ | ✅ **v1** |
| Lists: bullet / numbered / checklist | ✅ | ✅ + toggle/to-do | ✅ | ✅ | ✅ (auto-sink done) | ✅ | ✅ | ⚠️ | ✅ **v1** |
| Tables | ❌ | ✅ (Text Docs) | ✅ | ✅ simple + DB | ✅ (twitchy) | ❌ | ❌ | ❌ | ⚠️ **v2** |
| Code blocks (syntax) | ✅ 26 langs | ✅ | ⚠️ | ✅ | ✅ mono | ❌ | ❌ | ❌ | ⚠️ **v2** |
| Markdown-on-type shortcuts | ✅ (quote/code) | ✅ lists | ❌ | ✅ full | ⚠️ import/export only | ❌ | ❌ | ❌ | ✅ **v1** markdown shortcuts |
| Import custom fonts | ✅ | ⚠️ (Helvetica cross-platform) | ✅ | ❌ 3 fonts | ⚠️ | ⚠️ | ⚠️ | ? | ⚠️ **v2** |
| Rich-text CRDT (concurrent editing) | ⚠️ Cloud | ✅ Text Docs | ✅ co-author | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ **v1** sequence CRDT (Peritext/Yjs-style) |
| In-note hyperlinks (web + internal) | ⚠️ weak | ✅ (typed only) | ✅ wiki links | ✅ | ✅ + note-to-note | ⚠️ | ⚠️ | ? | ✅ **v1** links; **v2** on handwriting |
| Text-to-speech read-aloud | ✅ | ⚠️ Study Set speak | ✅ Immersive Reader | ⚠️ | ✅ (Apple Intelligence) | ✅ Listen Brief | ❌ | ❌ | ⚠️ **v2** |
| Scribble (handwriting → field text) | ✅ | ✅ | ⚠️ | ⚠️ iPadOS only | ✅ | ✅ S Pen to text | ✅ convert-as-write | ⚠️ OCR | ✅ **v1** |

---

## 8. Audio

Notability's audio↔ink sync is the signature feature of the category; Samsung, Goodnotes and Flexcil match it; Nebo and Noteshelf notably lack synced playback. The Sane Notes design makes time-linked audio a v1 headline (`docs/design/screens-and-flows.md` §7.6).

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Record audio in a note | ✅ | ✅ | ✅ +video | ⚠️ audio block | ✅ | ✅ | ❌ | ✅ + export | ✅ **v1** |
| Ink/text ↔ audio timeline sync (tap to jump) | ✅ signature | ✅ | ✅ audio-linked (desktop) | ❌ | ✅ tap word → play | ✅ audio bookmark | ❌ | ⚠️ record only | ✅ **v1** |
| Ink "replays in sync" during playback | ⚠️ | ✅ replay modes | ⚠️ | ❌ | ⚠️ | ⚠️ | ❌ | ❌ | ✅ **v1** (design §7.6) |
| Variable playback speed | ✅ 0.7–2× | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ? | ✅ **v1** 1×/1.5×/2× |
| Scrub / seek waveform | ✅ | ✅ ±10s | ✅ ±15s/5min | ⚠️ | ✅ | ✅ | ❌ | ⚠️ | ✅ **v1** |
| Trim / split / merge clips | ✅ | ⚠️ | ⚠️ | ❌ | ⚠️ | ⚠️ | ❌ | ? | ⚠️ **v2** |
| Background recording (app switched) | ❌ | ⚠️ (Android stops) | ✅ | ⚠️ | ✅ | ✅ | ❌ | ? | ✅ **v1** (native plugin) |
| Post-hoc transcription | ✅ 100+ langs (Plus) | ✅ on-device 10 / cloud 99+ | ⚠️ audio search | ⚠️ AI Meeting Notes | ✅ live transcript (free) | ✅ Transcript Assist (AI) | ❌ | ❌ | ⚠️ **v2** on-device transcription |
| Live / real-time transcript | ✅ (Pro) | ✅ | ❌ | ⚠️ | ✅ | ✅ | ❌ | ❌ | ⚠️ **v2** |
| Noise reduction / voice boost | ✅ Voice Boost | ✅ (A16/M1+) | ❌ | ❌ | ❌ | ❌ | ❌ | ? | ⚠️ **later** |

---

## 9. PDF & documents

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Import PDF | ✅ many sources | ✅ + email-to-app | ⚠️ printout images | ⚠️ embed only | ✅ | ✅ | ✅ multi-file | ✅ fast engine | ✅ **v1** |
| True ink/text PDF annotation | ✅ | ✅ | ⚠️ rasterized layer | ❌ | ✅ Markup | ✅ | ✅ | ✅ | ✅ **v1** (pdfium/PDFKit) |
| Preserve PDF outline/TOC navigation | ✅ | ✅ (editable export) | ❌ | ❌ | ⚠️ | ❌ | ⚠️ | ✅ outline/bookmarks | ✅ **v1** |
| Preserve PDF hyperlinks/forms | ⚠️ forms | ⚠️ (editable only) | ❌ | ❌ | ⚠️ AutoFill (26) | ❌ | ⚠️ | ? | ⚠️ **v2** form fill |
| OCR on imported PDFs (make searchable) | ⚠️ | ❌ (needs existing layer) | ⚠️ printout OCR | ❌ | ✅ scans | ⚠️ | ⚠️ | ⚠️ lasso OCR | ✅ **v1** OCR on import (fixes a shared gap) |
| Add margin space to PDF page | ✅ | ⚠️ add page | ❌ | ❌ | ❌ | ❌ | ❌ | ? | ⚠️ **v2** |
| Edit/merge/reorder PDF pages | ⚠️ | ✅ page ops | ⚠️ | ❌ | ⚠️ | ❌ cannot edit | ⚠️ | ⚠️ | ⚠️ **v2** |
| High-fidelity searchable PDF export | ✅ | ✅ editable / flattened | ⚠️ | ⚠️ PDF | ✅ | ❌ rasterized/unsearchable | ✅ vector | ✅ PDF/PNG | ✅ **v1** vector + OCR layer |
| Scroll 600-page PDF at 60fps | ⚠️ | ⚠️ | ⚠️ | n/a | ⚠️ | ⚠️ | ✅ fast (v7.5) | ✅ fast engine | ✅ **v1** perf budget (decision 7) |
| Excerpt/link PDF text into notes | ❌ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ? | ⚠️ **later** (Flexcil/LiquidText-style) |

---

## 10. Images, media & stickers

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Insert image (photos/files/camera) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ **v1** |
| Image crop / rotate / resize / wrap | ✅ | ✅ + align guides | ✅ in-app crop | ⚠️ | ⚠️ | ⚠️ | ✅ crop | ? | ✅ **v1** basic; **v2** wrap |
| Document scanner (to PDF, OCR) | ✅ | ✅ Apple | ⚠️ | ❌ | ✅ | ⚠️ | ❌ | ✅ camera scan | ✅ **v1** |
| Sticker library / custom stickers | ✅ + My Stickers | ✅ Elements + marketplace | ⚠️ premium | ⚠️ emoji/Unsplash | ✅ stickers | ⚠️ AI covers | ❌ | ✅ stickers | ⚠️ **v2**; **later** marketplace |
| GIFs | ✅ | ✅ GIPHY (free) | ⚠️ | ⚠️ embed | ❌ | ❌ | ❌ | ? | ⚠️ **later** |
| Sticky notes | ✅ | ✅ | ⚠️ separate app | ⚠️ callout | ⚠️ | ✅ | ❌ | ? | ⚠️ **v2** |
| Video / rich embeds | ❌ | ✅ Text Docs | ✅ | ✅ 500+ | ✅ links | ⚠️ | ❌ | ❌ | ⚠️ **later** |
| Lock object in place | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ? | ⚠️ **v2** |
| AI image generation into note | ✅ Image Playground | ✅ Create mode | ⚠️ Copilot | ✅ Notion AI | ✅ Image Playground | ✅ AI covers | ❌ | ❌ | ⚠️ **later** (opt-in cloud) |

---

## 11. Templates, paper & covers

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Built-in paper (rule/grid/dot/blank) | ✅ | ✅ | ✅ rule/grid | ❌ no paper | ⚠️ Lines & Grids | ✅ 12 templates | ⚠️ | ? | ✅ **v1** (blank/lined/grid/dotted/Cornell/music/planner/flashcards) |
| Adjustable line/dot spacing | ✅ 9 presets | ✅ dynamic | ⚠️ | ❌ | ⚠️ | ⚠️ | ❌ | ? | ✅ **v1** |
| Page sizes (A4/Letter/etc.) | ✅ many | ✅ A0–A8/B0–B8 | ✅ | ❌ | ⚠️ | ⚠️ | ✅ fixed | ? | ✅ **v1** Auto/A4/Letter; **v2** more |
| Per-page templates within one notebook | ❌ (one/note) | ✅ | ⚠️ new pages only | ❌ | ❌ | ⚠️ reflows all | ✅ | ? | ✅ **v1** per-page paper (beats Notability) |
| Dynamic template color/orientation | ⚠️ paper color | ✅ | ⚠️ | ❌ | ❌ | ✅ color tab | ⚠️ | ? | ✅ **v1** tint + orientation |
| Custom template import (PDF/image) | ✅ | ✅ | ✅ | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | ✅ **v1** |
| Large template/planner gallery | ✅ 20,000+ | ✅ marketplace | ⚠️ | ✅ gallery | ❌ | ⚠️ | ❌ | ? | ⚠️ **later** marketplace |

---

## 12. Search, OCR & handwriting recognition

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Global library search | ✅ | ✅ (Apple; non-Apple titles only) | ✅ scoped | ✅ (no OCR) | ✅ | ⚠️ title/subject | ✅ incl. handwriting | ❌ not documented | ✅ **v1** |
| Search handwriting (OCR of ink) | ⚠️ paywalled (Plus) | ✅ on-device | ⚠️ unreliable | ❌ | ✅ | ⚠️ weak | ✅ best-in-class | ⚠️ lasso only | ✅ **v1** on-device, **in free tier** |
| Search text inside images | ⚠️ | ❌ | ✅ image OCR | ❌ | ✅ objects/Live Text | ⚠️ | ⚠️ | ⚠️ | ✅ **v1** OCR |
| Search inside audio (spoken words) | ✅ transcript | ✅ transcript | ✅ Audio Search | ❌ | ✅ transcript | ✅ | ❌ | ❌ | ⚠️ **v2** (after transcription) |
| Handwriting → typed text conversion | ✅ 23 iOS / 72 Android | ✅ (12–14, more Apple) | ✅ (Win only) | ❌ | ✅ ~25 langs | ✅ | ✅ 66 langs | ✅ OCR via lasso | ✅ **v1** (target broad langs across all platforms) |
| Recognition language breadth | ⚠️ uneven iOS/Android | ⚠️ ~14 | ⚠️ OS packs | ❌ | ⚠️ ~25 | ⚠️ | ✅ 66 | ⚠️ | ✅ **v1** broad; **v2** parity everywhere |
| RTL / one-note-multi-language | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ Arabic/Hindi | ⚠️ | ❌ no RTL, one lang/note | ❌ | ⚠️ **v2** RTL + multi-lang (open market) |
| "Ask my notes" semantic Q&A | ✅ Chat (Pro) | ✅ Ask Goodnotes | ✅ Copilot | ✅ Enterprise Search | ⚠️ | ⚠️ | ✅ Chat (iOS) | ❌ | ⚠️ **v2** (Pro; on-device where possible) |

---

## 13. Math

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Handwriting → typeset math | ✅ (Plus, not Android) | ✅ on-device (Apple) | ✅ Ink to Math | ❌ | ✅ Math Notes | ✅ | ✅ math block | ❌ | ⚠️ **v2** |
| Edit underlying LaTeX | ✅ | ✅ | ⚠️ | ✅ KaTeX author | ⚠️ | ❌ | ⚠️ | ❌ | ⚠️ **v2** |
| Solve equations (result) | ⚠️ AI | ✅ Math Assist | ✅ Math Assistant | ❌ | ✅ `=` trigger | ✅ Math Solver | ✅ develop/solve | ❌ | ⚠️ **v2** (Solve — design §7.4) |
| Step-by-step solution / teach | ⚠️ AI | ✅ AI Math (Wolfram) | ✅ steps + methods | ❌ | ⚠️ | ⚠️ | ⚠️ | ❌ | ⚠️ **v2** step-by-step |
| Graphing (2D/3D) | ❌ | ⚠️ | ✅ 2D | ❌ | ✅ 2D + 3D | ❌ | ❌ | ❌ | ⚠️ **later** |

---

## 14. AI features

Locked decision: on-device by default (Apple Foundation Models / Vision / Speech; Gemini Nano via ML Kit; Whisper on web); any cloud inference is explicit per-request opt-in with a visible "data leaves device" indicator (decision 6).

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Summaries of notes/PDFs/recordings | ✅ Learn (Plus) | ✅ Meeting AI | ✅ Copilot | ✅ | ✅ (Apple Intelligence) | ✅ Note Assist | ✅ | ❌ | ⚠️ **v2** (on-device first) |
| Chat / Q&A over notes (cited) | ✅ Chat (Pro) | ✅ Ask Goodnotes (page cites) | ✅ Copilot | ✅ | ⚠️ | ⚠️ | ✅ Chat (iOS) | ❌ | ⚠️ **v2** "Ask my notes" (design §11) |
| Flashcard / quiz generation | ✅ (Plus) | ✅ Study Sets AI | ✅ practice quizzes | ⚠️ | ⚠️ | ⚠️ | ✅ quiz | ❌ | ⚠️ **v2** |
| Spaced-repetition study mode | ⚠️ Anki import | ✅ Smart Learning | ⚠️ | ❌ | ❌ | ❌ | ✅ Study Sets | ❌ | ⚠️ **v2** |
| On-device handwriting spellcheck (own style) | ❌ | ✅ (Apple) | ⚠️ | ❌ | ⚠️ | ✅ spell/grammar | ⚠️ custom dict | ❌ | ⚠️ **v2** |
| Action items / to-dos from notes | ✅ (Pro) | ✅ Meeting AI | ✅ Copilot | ✅ | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ **v2** |
| Rewrite / tone / translate | ⚠️ | ✅ Text Doc AI | ✅ | ✅ | ✅ Writing Tools | ✅ Composer/Translate | ⚠️ | ❌ | ⚠️ **v2** |
| Diagram / mind-map generation | ❌ | ✅ Create mode | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ⚠️ **later** |
| Exportable AI outputs / cross-device | ⚠️ Smart Notes can't export | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ | ✅ **v2** exportable + synced (beats Notability) |
| On-device / private-by-default AI | ⚠️ cloud (Claude/Gemini) | ⚠️ mixed + geo-blocks | ⚠️ Copilot cloud | ⚠️ cloud | ✅ on-device + PCC | ⚠️ mostly server | ⚠️ | ❌ | ✅ **v2** on-device default, opt-in cloud (decision 6) |

---

## 15. Sync, backup & offline

Locked decision: local-first; no Sane Notes server stores note content; optional sync uses the **user's own cloud** (iCloud Drive / Google Drive, later OneDrive/Dropbox/WebDAV) as encrypted append-only op-log segments + CRDT merge (decisions 2–3).

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| First-party cross-platform cloud sync | ✅ Notability Cloud | ✅ Goodnotes Cloud (Pro) | ✅ OneDrive | ✅ | ⚠️ iCloud (Apple only) | ⚠️ Samsung Cloud (Galaxy) | ⚠️ iCloud/Drive/Dropbox | ❌ local + opt-in iCloud | ⚠️ **v1** sync via user's own cloud (no vendor store) |
| Sync via user's own cloud drive | ⚠️ backup only | ✅ Auto Backup targets | ✅ OneDrive | ❌ | ✅ iCloud | ⚠️ | ✅ | ✅ iCloud folder | ✅ **v1** iCloud Drive + Google Drive |
| Offline editing that merges on reconnect | ✅ | ⚠️ Apple offline-first; Android/Win online-first | ✅ Windows cache | ⚠️ weak/limited | ✅ | ✅ | ⚠️ | ✅ local-first | ✅ **v1** offline-first + CRDT merge |
| Conflict-free merge (no lost strokes) | ⚠️ sync complaints | ⚠️ Android reverts | ⚠️ conflicts | ⚠️ distrust | ⚠️ | ⚠️ conflict prompts | ⚠️ manual-sync loss | ⚠️ | ✅ **v1** CRDT op-log (fixes shared #1 complaint) |
| Version history / restore | ✅ tiered 7/30/90d | ⚠️ | ✅ page versions | ✅ 7/30/90d | ⚠️ (unverified) | ⚠️ | ❌ | ❌ | ⚠️ **v2** version timeline |
| Third-party backup (Drive/Dropbox/OneDrive/WebDAV) | ✅ iOS | ✅ (not iCloud) | ✅ OneDrive | ⚠️ export | ⚠️ | ⚠️ OneNote import | ✅ | ⚠️ | ✅ **v1** (own-cloud is the model); **later** WebDAV |
| Manual full-library export/backup | ✅ | ✅ ZIP (Apple) | ✅ .onepkg | ✅ workspace export | ⚠️ | ⚠️ | ✅ | ✅ | ✅ **v1** export everything (even free) |
| Non-destructive delete (no cloud-delete cascade) | ❌ iCloud delete destroys | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ local | ✅ **v1** (counter Notability) |

---

## 16. Sharing & export

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Export PDF | ✅ | ✅ flattened/editable | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ **v1** |
| Export PNG/JPEG/image | ✅ | ✅ (Apple) | ⚠️ | ⚠️ | ✅ | ✅ | ✅ PNG | ✅ | ✅ **v1** |
| Export SVG / vector | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ SVG | ❌ | ✅ **v1** (open format goal) |
| Export Markdown | ❌ | ❌ | ❌ | ✅ | ✅ (OS 26) | ✅ text | ❌ | ❌ | ✅ **v1** (.sanenote → MD/JSON) |
| Export Word/DOCX | ⚠️ | ⚠️ (iOS convert-in) | ✅ | ⚠️ | ❌ | ✅ | ✅ DOCX | ❌ | ⚠️ **later** |
| Native/portable open bundle format | ✅ .note | ✅ .goodnotes | ⚠️ .onepkg | ❌ | ❌ | ❌ | ✅ native | ⚠️ | ✅ **v1** open `.sanenote` (manifest+segments+blobs) |
| Public share link (view/comment/edit) | ✅ (Cloud) | ✅ (public link) | ✅ | ✅ | ✅ invite/link | ⚠️ | ⚠️ | ✅ nickname share | ✅ **v1** link + role (design §10) |
| Publish note as web page | ✅ Gallery | ⚠️ open-on-web | ❌ | ✅ Notion Sites | ❌ | ❌ | ❌ | ⚠️ community rooms | ⚠️ **later** |
| Print (AirPrint/etc.) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ? | ✅ **v1** |

---

## 17. Collaboration & comments

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Real-time co-editing | ✅ (Cloud) | ✅ up to 50 | ✅ co-author | ✅ multiplayer | ✅ | ❌ | ❌ | ⚠️ shared notes | ⚠️ **v2** (WebRTC, M6) |
| Live cursors / presence | ✅ presence | ✅ Live Cursor | ⚠️ author colors | ✅ | ✅ activity | ❌ | ❌ | ? | ⚠️ **v2** |
| Threaded / margin comments | ⚠️ (not Android) | ✅ (edit/resolve Apple only) | ❌ no true comments | ✅ inline + page | ✅ (Freeform) | ❌ | ❌ | ⚠️ report-voting rooms | ⚠️ **v2** comments + resolve |
| Permission roles (view/comment/edit) | ✅ | ✅ (private = Pro) | ✅ view/edit | ✅ granular | ✅ | ⚠️ | ⚠️ | ⚠️ moderators | ✅ **v1** roles (design §10) |
| Follow-a-collaborator view | ❌ | ✅ (Apple) | ❌ | ⚠️ | ❌ | ❌ | ❌ | ? | ⚠️ **later** |
| Ciphertext-only relay (zero-knowledge collab) | ❌ | ❌ | ❌ | ❌ | ⚠️ CloudKit | ❌ | ❌ | ✅ no vendor server | ✅ **v2** E2E relay sees only ciphertext (decision 3) |
| Public community rooms | ❌ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ✅ moderated rooms | ⚠️ **later** |

---

## 18. Presentation, whiteboard, multi-window

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Presentation mode to external display | ✅ | ✅ (iPad/iPhone) | ❌ | ❌ | ⚠️ Freeform scenes | ⚠️ DeX | ❌ | ❌ | ⚠️ **v2** |
| Laser pointer | ✅ | ✅ | ⚠️ Windows | ❌ | ❌ | ❌ | ❌ | ? | ⚠️ **v2** |
| Infinite canvas / whiteboard | ❌ | ✅ Whiteboard | ✅ free-form page | ❌ (Kanban only) | ✅ Freeform | ⚠️ infinite canvas | ✅ Boards | ⚠️ | ✅ **v1** freeform canvas (design §8) |
| Multi-note / split view | ✅ Multi-Note | ✅ multi-window (iPad) | ✅ dock | ⚠️ side-peek | ✅ | ⚠️ | ⚠️ | ❌ | ⚠️ **v2** |
| Focus / distraction-free mode | ✅ Focus Mode | ✅ read-only | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ? | ✅ **v1** focus mode (design §7.8) |
| Zoom-writing window | ✅ Zoom View | ✅ Zoom Window (Apple) | ❌ | ❌ | ❌ | ⚠️ | ❌ | ? | ⚠️ **v2** |
| Session time-lapse replay | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ **later** (Procreate-style) |

---

## 19. Stylus gestures & input

Bar set by Procreate/Concepts/Linea/Fresco: two-finger undo, three-finger redo, draw-and-hold, configurable Pencil double-tap/squeeze, touch-role setting.

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Palm rejection / wrist protection | ✅ | ✅ | ✅ stylus orientation | n/a | ✅ | ✅ | ✅ OS | ✅ | ✅ **v1** |
| Apple Pencil double-tap (configurable) | ✅ | ⚠️ squeeze only doc | ⚠️ | n/a | ✅ | n/a | ⚠️ | ? | ✅ **v1** (design: Eraser/Prev/Colors) |
| Apple Pencil Pro squeeze | ✅ Arc menu | ✅ Palette | ⚠️ | n/a | ✅ | n/a | ⚠️ | ? | ⚠️ **v2** (native plugin) |
| Barrel roll (nib rotate) | ✅ Calligraphy | ✅ | ⚠️ | n/a | ✅ | n/a | ⚠️ | ? | ⚠️ **v2** |
| Hover preview | ✅ | ✅ | ⚠️ | n/a | ✅ | ✅ Air command | ⚠️ | ? | ⚠️ **v2** |
| Haptics on squeeze | ⚠️ | ✅ | ❌ | n/a | ✅ | ⚠️ | ❌ | ? | ⚠️ **v2** |
| S Pen Air actions | ⚠️ (Android) | ⚠️ | ⚠️ | n/a | n/a | ✅ Air actions | ⚠️ | n/a | ⚠️ **v2** (Android plugin) |
| Two-finger undo / three-finger redo | ❌ | ❌ | ⚠️ | n/a | ⚠️ | ⚠️ | ⚠️ | ? | ✅ **v1** (adopt Procreate grammar) |
| Configurable finger-role while stylus active | ⚠️ | ⚠️ scroll | ✅ Draw with Touch | n/a | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ **v1** "Draw with finger" toggle (design §12) |
| Radial quick-menu (customizable) | ✅ Arc | ⚠️ | ❌ | n/a | ⚠️ | ⚠️ Air command | ❌ | ✅ 11-slot fav bar | ⚠️ **v2** radial QuickMenu |

---

## 20. Keyboard shortcuts

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Comprehensive documented shortcut set | ✅ extensive | ✅ cross-platform | ✅ per-platform | ✅ | ✅ | ? | ? | ? | ✅ **v1** core; **v2** full |
| Tool-switch hotkeys (P/H/E/etc.) | ✅ ⌘1–9 | ✅ P/H/E/V/T | ⚠️ | n/a | ⚠️ | ? | ? | ? | ✅ **v1** |
| Global command palette / quick-find | ✅ ⌘F | ✅ ⌘F | ✅ Ctrl+E | ✅ ⌘K | ⚠️ | ? | ? | ? | ✅ **v1** ⌘K search (design §2) |

---

## 21. Platforms

Locked decision 1: one Flutter codebase across iPadOS/iOS/Android phone+tablet/Web(PWA), with native plugin layer; **parity from day one** is the wedge against competitors' platform inconsistency.

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| iPad / iPadOS | ✅ | ✅ native | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ **v1** |
| iPhone / iOS | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ⚠️ iPad-first | ✅ **v1** |
| Android phone | ✅ (Aug 2026) | ⚠️ tablet-first | ⚠️ weak | ✅ (buggy) | ❌ | ✅ Galaxy | ✅ | ❌ | ✅ **v1** |
| Android tablet | ✅ | ⚠️ Samsung 8"+ | ⚠️ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ **v1** |
| Web (PWA) | ✅ Web App | ✅ (SwiftWasm PWA) | ✅ (limited) | ✅ | ✅ iCloud.com | ❌ | ❌ | ❌ | ✅ **v1** (CanvasKit/skwasm) |
| macOS | ✅ | ✅ native | ✅ | ✅ | ✅ | ❌ | ✅ (M-series) | ❌ | ⚠️ **later** (via Catalyst/Flutter desktop) |
| Windows | ⚠️ web | ✅ (PWABuilder) | ✅ flagship | ✅ | ❌ | ✅ PC | ✅ Nebo | ❌ | ⚠️ **later** |
| Feature parity across all platforms | ⚠️ Android gaps | ❌ big Apple/non-Apple gap | ❌ chaos | ⚠️ mobile weak | ❌ Apple only | ❌ Galaxy only | ⚠️ AI iOS-first | ❌ iPad only | ✅ **v1** parity is the wedge |
| Foldables / large-screen window classes | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ | ✅ **v1** adaptive layouts |

---

## 22. Accessibility

Target: WCAG 2.2 AA; VoiceOver/TalkBack for all chrome + OCR-backed descriptions of handwritten content (decision 10).

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Screen reader (VoiceOver/TalkBack) | ✅ labels | ⚠️ partial (Marketplace) | ✅ Narrator/JAWS | ⚠️ partial | ✅ system | ⚠️ TalkBack | ? | ? | ✅ **v1** all chrome |
| Dynamic Type / font scaling | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ? | ? | ✅ **v1** |
| Read-aloud / TTS | ✅ | ⚠️ Study Set | ✅ Immersive Reader | ⚠️ | ✅ | ✅ Listen Brief | ❌ | ? | ⚠️ **v2** |
| Dyslexia-friendly reading (line focus, spacing) | ❌ | ❌ | ✅ Learning Tools | ❌ | ❌ | ❌ | ❌ | ? | ⚠️ **later** |
| High-contrast / color-blind support | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ system | ⚠️ | ⚠️ dark | ? | ✅ **v1** (17 looks + tokens, WCAG AA) |
| Tremor-friendly ink (motion filter) | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ⚠️ **v2** (Procreate-style) |
| OCR-backed descriptions of handwriting | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ | ⚠️ **v2** (a11y differentiator) |

---

## 23. Localisation

English first, then Hindi + major Indian languages, ES/DE/FR/PT/JA/ZH/KO/AR (RTL) (decision 10).

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| UI languages | ✅ 20 | ⚠️ ~15 | ✅ broad (Office) | ⚠️ few | ✅ broad | ✅ broad | ⚠️ 11 | ? | ✅ **v1** EN; **v2** Hindi + majors |
| RTL (Arabic/Hebrew) UI | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ❌ | ? | ⚠️ **v2** RTL |
| Handwriting recognition languages | ⚠️ 23/72 split | ⚠️ ~14 | ⚠️ OS packs | ❌ | ✅ ~25 | ⚠️ | ✅ 66 | ⚠️ | ✅ **v1** broad; **v2** parity |
| Indian-language OCR (Hindi etc.) | ⚠️ Android only | ❌ | ⚠️ | ❌ | ✅ Hindi | ⚠️ | ❌ | ? | ✅ **v1** Hindi priority (student persona) |

---

## 24. Pricing & free-tier limits

Sane Notes: generous free tier (unlimited notebooks/pages, 5 PDF imports/mo, 30-min recordings, 3 people/notebook, export-everything even on free), Pro ₹999/yr (~₹83/mo) or ₹149/mo with 14-day trial, student verification (`docs/design/screens-and-flows.md` §13–14).

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| Free tier exists | ✅ 5 notes + edit cap | ✅ 3 files/100MB | ✅ (5GB storage) | ✅ | ✅ (with OS) | ✅ (with device) | ⚠️ 5 pages/note, no sync | ✅ local | ✅ **v1** generous free |
| Handwriting search in free tier | ❌ (Plus) | ✅ | ⚠️ | n/a | ✅ | ⚠️ | ❌ | ⚠️ lasso | ✅ **v1** (turn their paywall into our wedge) |
| Sync included in free | ✅ Cloud | ❌ (Pro) | ✅ | ✅ | ✅ | ✅ | ❌ | ⚠️ | ✅ **v1** own-cloud sync free |
| Subscription | ✅ Lite/Plus/Pro | ✅ Essential/Pro | ✅ M365 | ✅ Plus/Business | ❌ (iCloud only) | ⚠️ Galaxy AI | ✅ mo/yr | ? | ✅ **v1** Pro ₹999/yr |
| One-time / lifetime option | ✅ Classic $49.99 | ✅ Special Ed. (Apple) | ❌ | ❌ | n/a | n/a | ✅ Lifetime $24.99 | ? | ⚠️ **later** consider lifetime |
| Student pricing / verification | ⚠️ | ⚠️ | ✅ education | ⚠️ | n/a | n/a | ⚠️ | ? | ✅ **v1** student verify |
| Ads / watermark on free | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ? | ✅ **v1** none (privacy-first) |

---

## 25. Privacy & security

Targets: MASVS 2.x L2, ASVS 5.0 L2, zero-knowledge cloud, E2EE (XChaCha20-Poly1305/AES-256-GCM, per-notebook keys wrapped by user master key in Keychain/Keystore, printable recovery code), Play "no data collected" / opt-in telemetry (decisions 3, 8).

| Feature | Notability | Goodnotes | OneNote | Notion | Apple Notes | Samsung Notes | Nebo | CollaNote | Sane Notes target |
|---|---|---|---|---|---|---|---|---|---|
| App/folder/note lock (biometric) | ⚠️ Locked Folders | ⚠️ password (iOS, not encrypted) | ⚠️ section 128-bit AES | ❌ | ✅ note lock (E2EE) | ✅ note lock | ? | ? | ✅ **v1** note lock (biometric) |
| End-to-end encryption of synced content | ❌ no E2EE claim | ⚠️ Goodnotes Cloud encrypted (not E2E) | ❌ no zero-knowledge | ❌ (AES at rest only) | ⚠️ locked notes only | ⚠️ | ? | ✅ no vendor server | ✅ **v1** E2EE for all cloud content (wedge) |
| Zero-knowledge (vendor can't read notes) | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ? | ✅ local/no server | ✅ **v1** zero-knowledge by design |
| Encrypted-key escrow + recovery code | ❌ | ❌ (forgotten = lost) | ❌ (lost = unrecoverable) | ❌ | ⚠️ (lost passphrase = lost) | ⚠️ | ? | ? | ✅ **v1** escrow + printable recovery code |
| No note content on vendor servers | ❌ | ❌ | ❌ | ❌ | ❌ (iCloud) | ❌ | ❌ | ✅ | ✅ **v1** local-first, own-cloud only |
| "No data collected" / opt-in telemetry | ⚠️ tracks identifiers | ⚠️ | ⚠️ diagnostics | ⚠️ | ✅ | ⚠️ | ? | ✅ | ✅ **v1** opt-in, on-device-aggregated |
| SBOM / SLSA / DevSecOps supply chain | ❌ | ❌ | ⚠️ (MS) | ⚠️ SOC2/ISO | ⚠️ (Apple) | ⚠️ | ❌ | ❌ | ✅ **v1** SLSA L3 target, SBOM per release |
| Compliance (GDPR/DPDP/COPPA age gate) | ⚠️ | ⚠️ | ✅ enterprise | ✅ SOC2/HIPAA(Ent) | ✅ | ⚠️ | ? | ? | ✅ **v1** GDPR+DPDP+COPPA age gate |

---

## Table stakes (must have for v1)

These are the capabilities that appear in essentially every serious competitor; shipping v1 without them means we are not credible. Grouped and each mapped to a competitor that sets the bar.

1. **Low-latency, pressure- & tilt-sensitive ink** with at least three pen characters (fountain/velocity pen, tilt-shading pencil, calligraphy nib), per-pen smoothing, solid/dashed/dotted strokes, reorderable color slots with HEX + eyedropper, and favorite-pen presets. *Bar: Goodnotes, Notability, Procreate feel.* This is non-negotiable and gated by the M0 SN-INK latency spike (must hit ≤16ms iPad / ≤25ms mid-Android / ≤30ms web, decision 7); if pure Flutter can't, the editor surface pivots to native views (ADR-0001).
2. **Highlighter** that lays behind ink (multiply), with snap-to-text on PDF/typed content and a straight-line mode. *Bar: Notability Smart Highlighter, Goodnotes.*
3. **Partial + whole-stroke erasers**, erase-by-content-type, and scribble-to-erase. *Bar: Goodnotes, Apple Notes.*
4. **Lasso** (freeform + rectangular) that moves/scales/rotates/recolors mixed content and **converts handwriting → text**; screenshot/export selection. *Bar: Goodnotes, Notability.*
5. **Ink-to-shape draw-and-hold** plus a shape tool and a ruler. *Bar: everyone; Concepts/Procreate/Linea for the dwell-to-perfect gesture.*
6. **Typed text** with rich formatting, headings, bullet/numbered/checklist lists, markdown-on-type, and in-note hyperlinks, backed by a **sequence CRDT** for concurrent edits. *Bar: Notion for structure, Apple Notes for formatting.*
7. **Audio recording time-linked to ink** (tap a stroke/word to seek; ink replays in sync), with variable speed and scrub. This is the category's signature and a v1 headline in our own design. *Bar: Notability, Samsung Notes.*
8. **PDF import + true vector annotation** with preserved outline/TOC navigation, **OCR-on-import** so imported PDFs are searchable, and high-fidelity searchable PDF export (never rasterized/unsearchable). *Bar: Goodnotes; avoid Samsung's rasterized export and Notion/OneNote's non-annotation.*
9. **Image insert + document scanner** with OCR. *Bar: everyone.*
10. **Templates & paper** (blank/lined/grid/dotted/Cornell/music/planner/flashcards), adjustable spacing, page sizes, **per-page paper within one notebook** (beats Notability), tint, and custom template import. *Bar: Goodnotes per-page; Samsung 12 templates.*
11. **On-device handwriting search / OCR across notes and PDFs, in the free tier** — turn Notability's most-resented paywall into a differentiator. *Bar: Goodnotes free search; Nebo recognition quality.*
12. **Freeform infinite canvas** as an alternative to paged notebooks. *Bar: Apple Freeform, Goodnotes Whiteboard, Nebo Boards; Notability/Notion lack it.*
13. **Cross-platform sync via the user's own cloud** (iCloud Drive + Google Drive) with **offline-first CRDT merge and non-destructive deletes** — directly attacks the #1 shared complaint (Goodnotes Android reverts, Notability iCloud-delete, Nebo/Samsung manual-sync loss). *Bar: reliability, not features.*
14. **Sharing with link + roles (view/comment/edit)** and **export everything** (PDF/PNG/SVG/Markdown/open `.sanenote`) available even on free. *Bar: Goodnotes links; Notion export breadth.*
15. **Full stylus support**: palm rejection, configurable Pencil double-tap, "draw with finger" toggle, plus the two-finger-undo / three-finger-redo grammar. *Bar: Procreate/Concepts/Linea gesture language; Notability/Goodnotes palm rejection.*
16. **Comprehensive keyboard shortcuts** including a ⌘K global search/command surface. *Bar: Notability, Notion.*
17. **Accessibility floor**: VoiceOver/TalkBack on all chrome, Dynamic Type, WCAG 2.2 AA contrast across the 17 looks. *Bar: Apple Notes system a11y; OneNote Learning Tools for the stretch.*
18. **Privacy posture as a feature**: local-first, zero-knowledge, E2EE for all cloud content, biometric note lock with a recovery code, no ads/watermark, opt-in telemetry. *No competitor offers true zero-knowledge E2EE — this is our clearest wedge.*
19. **Generous, honest free tier + student verification** with a clear Pro (₹999/yr). *Bar: avoid Goodnotes' 3-file cap resentment and the 2021 Notability subscription backlash.*
20. **Guest mode / no-account note-taking** as first-class. *Bar: Apple Notes local account; identity never required to take notes (decision 5).*

Deliberately deferred out of v1 (v2/later): real-time collaboration + comments (v2, M6), advanced/cloud AI beyond on-device convert/search (v2), live+post transcription (v2), math typeset/solve step-by-step (v2), presentation mode + laser + zoom-window (v2), tables/code-blocks in text (v2), marketplace/pen-packs (later), macOS/Windows native (later), session time-lapse (later).

---

## Parity gaps by platform (what competitors lack on Android / Web / non-Apple that we will ship)

The single most exploitable structural weakness in this market is that the incumbents are **Apple-first** and degrade sharply everywhere else. Our locked decision 1 (one Flutter codebase + native plugin layer, parity from day one) is aimed straight at this. Concrete gaps we close:

**Goodnotes (Android / Windows / Web are a SwiftWasm PWA, "online-first"):**
- No full-page typing, no on-device AI (spellcheck / math conversion / math assist), no Study Sets, no Zoom Window, no Time Keeper, no Presentation Mode, no widgets, **no password/lock**, no native/image/editable-PDF export (Flattened-only), **library content search is title-only**, several handwriting-recognition languages (Chinese/Japanese/Korean/Russian/Thai) are Apple-only, comment **edit/resolve unavailable**, and **background audio recording stops on app-switch on Android**. Sync is documented as online-first with "content reverts after closing" reports. → **Sane Notes ships all of these identically on Android/Web with offline-first CRDT sync.**

**Notability (Android launched Aug 2026 with parity debt):**
- Missing at Android launch: Convert-to-Math/LaTeX, handwriting-language customization, content-matching dark mode, **native comments**, Version History panel, Text-Only Mode, **Ruler and Tape**, and **Auto-Backup**. → **We ship math, comments (v2), version history (v2), ruler (v1), and backup on Android from the start.**

**OneNote (per-client feature matrix chaos):**
- **Ink→Text is Windows-only** (absent on Mac/iPad/iPhone/Web); Ink→Shape and Math Assistant are gated to specific clients; **Web can't record audio/video, insert or edit ink, or create custom tags**; local (non-cloud) notebooks are Windows-only; PDFs are rasterized to images everywhere (no real annotation/forms/outlines); Android client is "the weakest / buggy". → **We ship ink, ink→text, ink→shape, media capture, real PDF annotation, and tags identically on every platform including Web.**

**Apple Notes / Freeform (Apple-only, no cross-platform):**
- No Windows / Android / Linux client; collaboration is Apple-ID-only; advanced features (tags, Smart Folders, collapsible sections, locked notes, note links) silently vanish on Gmail/IMAP accounts; AI is gated to M1+ hardware; no template/cover library; no version history. → **We are cross-platform including Android/Web, our advanced org features work on every account, and on-device AI is not hardware-gated to a premium chip.**

**Samsung Notes (Galaxy-only + Windows):**
- No iOS / macOS / Web client; **no real-time collaboration**; imported/exported **PDFs are rasterized and unsearchable**; imported PDFs **can't be edited elsewhere** and orientation must match; no PDF outline view; Galaxy-AI features gated by device tier (Quick highlight = Note series; Air actions = specific flagships; AI = One UI 6.1+). → **We are truly cross-platform, keep exported PDFs vector + searchable, and don't tier features by hardware.**

**Nebo / MyScript Notes (recognition leader, thin elsewhere):**
- **No audio recording / no synced playback** at all; shallow ~3-level organization; lasso is near-useless on Documents (can't move/resize); **no real-time collaboration**; free tier has **no cloud sync** and a 5-page cap; **no RTL** (no Hebrew/Arabic/Farsi/Urdu) and one recognition language per note; Android AI trails iOS. → **We pair Nebo-grade recognition ambitions with audio-sync, deep org (tags/nesting/backlinks), collaboration (v2), free-tier sync, and RTL + multi-language recognition (v2).**

**CollaNote (iPad-only):**
- iPad-only; **no documented global search**; no documented math/AI; organization is minimal (local + opt-in iCloud folder). Its genuinely novel bits are the moderated public community rooms and nickname-based shared notes. → **We ship global on-device search, cross-platform reach, and richer AI, while treating community rooms as a possible "later" differentiator to study (verify CollaNote facts first).**

**The cross-cutting wins we bank on every non-Apple platform:**
1. **Identical feature set** on iPad/iPhone/Android/Web (no "Apple-only" asterisks).
2. **Offline-first with conflict-free CRDT sync** and non-destructive deletes (fixes the reliability complaints that recur across Goodnotes, Notability, Samsung, Nebo, OneNote).
3. **On-device handwriting search + OCR-on-PDF-import in the free tier** on Android and Web, where competitors either paywall it, restrict it to Apple, or don't offer it.
4. **True zero-knowledge E2EE** on every platform — none of the eight competitors offers it.
5. **Background audio recording that survives app-switch on Android** (Goodnotes explicitly does not).
6. **Searchable, vector PDF export** on Android (Samsung rasterizes; Goodnotes non-Apple is Flattened-only).

---

## Sources

Competitor teardowns (to be committed under `docs/research/sources/`), read in full:
- `research/notability.md` — Notability (Ginger Labs), incl. Notability Cloud, Learn AI, Android/Web parity gaps.
- `research/goodnotes.md` — Goodnotes 6 overview, incl. the SwiftWasm-PWA correction and per-platform table.
- `research/goodnotes-userguide-inventory.md` — exhaustive Goodnotes User Guide feature inventory + Apple-vs-non-Apple gap list.
- `research/onenote.md` — Microsoft OneNote client-family inventory and per-platform matrix.
- `research/notion.md` — Notion block/database platform (structure, collaboration, publishing bar).
- `research/apple-notes-freeform.md` — Apple Notes + Freeform through iPadOS 26, incl. locked-note E2EE details.
- `research/samsung-notes-nebo-other.md` — Samsung Notes, Nebo/MyScript Notes, and the PDF-study field (Noteshelf, Notewise, Kilonotes, Penbook, Flexcil, LiquidText, MarginNote).
- `research/procreate.md` — Procreate brush engine, gestures, colour tools (pen/brush and gesture reference bar).
- `research/concepts-linea-paper-fresco.md` — Concepts, Linea, Paper, Fresco, Tayasui (vector ink, dwell-to-perfect, gestures).

Product grounding for the "Sane Notes target" column:
- `docs/design/screens-and-flows.md` — v1 product behaviour (editor, audio sync, templates, freeform, share, plan limits).
- `docs/design/design-system.md`, `docs/design/tokens.json` — 17 looks, dark mode, accessibility tokens.
- Locked product decisions (this project's brief): stack (Flutter + native plugins, ADR-0001), monorepo layout, local-first zero-knowledge, document model + CRDT, identity, on-device AI, performance budgets, MASVS/ASVS security, privacy/compliance, localisation.

**CollaNote caveat:** the CollaNote column is built from the product brief's facts only; no first-party teardown was crawled. Verify against CollaNote's App Store listing / support docs before making any public parity claim.
