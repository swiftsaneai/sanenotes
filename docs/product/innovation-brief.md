# Sane Notes — Innovation Brief

**Status:** authoritative product-strategy input for the build.
**Audience:** a future autonomous coding agent (and any human maintainer) with zero prior context.
**Purpose:** name the user pain we are attacking, the differentiating features we will build, and the five bets that define the product. Everything here MUST stay consistent with the project's LOCKED DECISIONS; where research pressures a locked decision, the decision holds and the risk is recorded.

**Related docs (read alongside):**
- Design system and tokens: [`../design/design-system.md`](../design/design-system.md), [`../design/tokens.json`](../design/tokens.json)
- Screens and flows (editor is §7): [`../design/screens-and-flows.md`](../design/screens-and-flows.md)
- Stack / ink-architecture decision and its exit criteria: [`../adr/0001-flutter-single-codebase.md`](../adr/0001-flutter-single-codebase.md) (this brief assumes its SN-INK risk gate)
- Research sources cited below live in the repo under `docs/research/sources/`; this brief cites them in the short form `research/<file>.md`.

**How to read this brief.** Part 1 ranks the pain. Part 2 is a catalogue of 25 differentiating features, each with a fixed metadata block (why competitors lack it / feasibility on the locked stack / risk / milestone / user story). Part 3 selects the **signature five** we bet the product on and justifies the choice. Part 4 isolates the **category-defining features that no note app ships at all** — the maintainer asked for at least one; we commit to five. Features are numbered `F01…F25` and referenced by that id throughout.

**Milestone legend.** ⚠️ The **authoritative roadmap and milestone identities are
[`../../issues/milestones.json`](../../issues/milestones.json)** (M0 Foundations · M1 Ink Editor Alpha ·
M2 Library & Documents · M3 Audio & Recognition · M4 Identity, Sync & Privacy · M5 Phones & Platform
Parity · M6 Collaboration, Sharing & Sage AI · M7 Beta Hardening & Security Audit · M8 Launch & Growth ·
Backlog). The themed buckets below (and every per-feature **Milestone** tag in Part 2) are an
**indicative thematic grouping written before that roadmap was finalised**; their M-numbers do **not**
map one-to-one to the authoritative milestone IDs (e.g. this brief's "M2 sync/E2EE" corresponds to
milestones.json's **M4** Identity, Sync & Privacy; this brief's "M4 audio" corresponds to milestones.json's
**M3** Audio & Recognition). Treat these tags as sequencing intent only; where a number here conflicts with
milestones.json, **milestones.json wins**, and the issue tracker holds the binding assignment.

| Bucket | Theme | Contains |
|----|-------|----------|
| **M0** | Foundations & spikes | SN-INK pen-to-pixel latency spike (p0 risk gate), CRDT/op-log core in `sane_core`, `.sanenote` format spec, design-system wiring |
| **M1** | Single-device editor MVP | ink engine + pens, paged canvas, PDF view, local `drift`/blob store, guest mode |
| **M2** | Zero-server sync + E2EE | op-log sync over iCloud Drive / Google Drive, envelope keys, recovery code, version history |
| **M3** | Recognition & search | on-device handwriting OCR, free handwriting search, shape beautification, semantic search |
| **M4** | Sage AI + audio | on-device summaries/Q&A/flashcards, transcription, audio↔ink↔transcript sync |
| **M5** | Knowledge & study verticals | backlinks graph, spaced repetition, math/physics scratchpad, infinite-canvas expansion |
| **M6** | Collaboration | E2E-encrypted classroom rooms, real-time WebRTC editing |
| **M7** | Ecosystem & polish | pen/template marketplace, deep accessibility, note-creation replay |

---

## Part 1 — Ranked user pain points (with evidence)

Ranking blends **complaint intensity**, **how many incumbents share the weakness**, and **how defensibly Sane Notes can fix it**. All evidence traces to `research/user-pain-points-and-market-gaps.md` and the competitor teardowns' closing sections (`research/goodnotes.md`, `research/notability.md`, `research/onenote.md`, `research/notion.md`, `research/apple-notes-freeform.md`, `research/samsung-notes-nebo-other.md`). The two loudest complaints are both *trust* failures — data loss and the Notability subscription betrayal — which is why "trust is the wedge" is the strategic through-line.

| # | Pain point | Who suffers | Evidence (abridged; see `research/user-pain-points-and-market-gaps.md`) | Sane Notes answer |
|---|-----------|-------------|------------------------------------------------------------------------|-------------------|
| 1 | **Sync is fragile and silently loses data** | Every incumbent | GoodNotes Oct-2023 outage → reinstall data loss; Notability backup-full "deleted my local notes too… 100+ pages"; OneNote "Misplaced Sections" cache corruption; Notion offline edits "silently overwritten" | Local-first CRDT op-log, single-writer segment files, device is source of truth (**F03**) |
| 2 | **No knowledge graph over handwriting — notes don't link** | Ink users + Obsidian refugees | Obsidian users beg to "link your hand-written notes," community says "no good solution"; ink apps have no backlinks | Cross-notebook handwritten backlinks + graph (**F06**) |
| 3 | **Handwriting OCR/search is paywalled, inaccurate, English-centric** | Free users, bilingual students | Both GoodNotes & Notability lock search behind subscription; "only works in english… not… dutch"; can't mix two languages in one note | Free, on-device, multilingual, mixed-script search (**F07**) |
| 4 | **No genuine cross-platform parity** | Android/Windows/Web users | Notability Apple-only; GoodNotes Android/Windows "online-first," Windows is a PWA wrapper; top request is literally "work offline" | One Flutter codebase, offline-first on every surface (locked decision 1; enables **F03**) |
| 5 | **Export lock-in via proprietary formats** | Everyone leaving an app | ".goodnotes can only be opened in GoodNotes"; "no common format"; PDF export loses editability | Open, round-trippable `.sanenote` bundle + importers (**F14**) |
| 6 | **Subscription anger / broken trust** | Long-time buyers | Notability's 2021 forced-subscription pivot "broke trust"; GoodNotes free capped at 3 notebooks, OCR behind Pro | Honest pricing, generous guest/free tier, sync never paywalled (see Part 3 note) |
| 7 | **Large-PDF and general performance lag** | Law/med/STEM annotators | GoodNotes low-memory lag on "large PDFs… fountain pen"; Notability "huge lag"; Samsung post-update pen lag | Tiled GPU PDF engine (**F20**) + predictive low-latency ink (**F17**) |
| 8 | **Weak/absent real-time collaboration** | Students, teams, classrooms | Notability "no native real-time collaboration… view-only"; GoodNotes collab needs a Pro subscriber; no ink "classroom rooms" exist | E2E-encrypted classroom rooms (**F11**) |
| 9 | **Audio recording is shallow and fragile** | Lecture note-takers | Notability "doesn't support background recording"; GoodNotes crash-loses audio; transcription is a paid add-on | Crash-safe background audio (**F23**) inside triple-sync (**F02**) |
| 10 | **No version history where users need it** | Anyone who mis-edits | "Can I access old version of my notes… changed by accident"; "undo broken after switching notebooks" | Per-stroke time-travel scrubber (**F13**) |
| 11 | **Pen feel: latency, palm rejection, weak/expressive brushes** | All pen users | GoodNotes pen "shaky," "fountain pen does not write how a fountain pen should," users want "the features that procreate features" | Procreate-grade Pen & Brush Studio (**F01**) + predictive ink (**F17**) |
| 12 | **Templates are limited and awkward to import** | Planner/bullet-journal users | GoodNotes "limited built-in," multi-page template import "only adds the first page"; Notability can't mix templates in one note | Per-page paper + custom template import (table-stakes; see `../design/screens-and-flows.md` §8) |
| 13 | **Weak tagging / organization ceilings** | Heavy libraries | Folder-only trees; Notability caps nesting at 6, "no tags" | Tags, typed properties, saved smart views (**F21**) |
| 14 | **Accessibility is an afterthought for ink** | Blind/low-vision, dyslexic users | Handwritten strokes are invisible to VoiceOver/TalkBack unless OCR'd; no ink app solves this; inconsistent dark mode | Accessibility-native ink (**F22**) |
| 15 | **AI privacy is asserted, not provable** | Privacy-conscious users | GoodNotes claims local AI yet policy "collects document data… to improve AI"; users can't verify | Provable on-device Sage + data-leaves-device indicator (**F05**, **F18**) |

**The unowned intersection.** No incumbent owns *expressive ink + real knowledge structure + trustworthy local-first sync + free on-device search + genuine cross-platform parity* at once (`research/user-pain-points-and-market-gaps.md`, "Cross-cutting strategic read"). Sane Notes is architected to own all five.

---

## Part 2 — 25 differentiating features

Each feature carries the same metadata block: a one-paragraph **description**, **why competitors lack it**, **feasibility** on the locked Flutter/Dart stack (naming the package/plugin/model that carries it), the top **risk**, a **milestone** suggestion, and a one-line **user story**. Tags: **[SIGNATURE]** = one of the five bets (Part 3); **[CATEGORY-DEFINING]** = shipped by *no* note app today (Part 4).

Feasibility grounds itself in the locked packages: `sane_core` (document model + CRDT), `sane_ink` (capture/smoothing/prediction/geometry), `sane_render` (tessellation/painting), `sane_brushes` (brush engine), `sane_sync` (op-log sync), `sane_crypto` (E2EE), `sane_pdf`, `sane_audio`, `sane_search` (FTS + ink index), `sane_ml` (recognition/AI adapters), and the federated `plugins/` layer (Swift Metal / Kotlin Jetpack Ink front-buffers).

### F01 — Pen & Brush Studio **[SIGNATURE]**

**Description.** A best-in-class ink studio modelled on Procreate's Brush Studio and Concepts' vector pens (`research/procreate.md` §2, `research/concepts-linea-paper-fresco.md` §1). Every pen is a *stamp dragged along a path*, with editable input→output curves so any visual property (size, opacity, flow) can be bound to **pressure, tilt, azimuth, velocity, or Apple Pencil Pro barrel-roll**. Ship a curated default kit — **graphite pencil with tilt-shading** (grain texture fixed to page, tilt→size/opacity), **fountain pen with velocity-driven thickness** (fast=thin/thick, one-toggle inverted for lefties), **felt marker**, **brush pen / calligraphy nib** (roundness squash following azimuth), **fine-liner**, **highlighter** (Multiply blend so it sits *behind* ink), and **dashed / dotted / pattern pens** (pure spacing + custom stamp). Add **StreamLine-style stabilisation** as a visible per-pen slider (0% raw → 100% straight) with a separate **Motion Filtering** mode marketed as a tremor/accessibility aid, plus per-pen **min/max clamps** so the global size slider can't ruin a tuned pen. Pens are shareable, versioned `.sanepen` documents with author metadata and a reset point.

- **Why competitors lack it.** Note apps ship 3–5 fixed pens with no curve editing; users explicitly ask for "the features that procreate features" and call GoodNotes' fountain pen wrong (`research/user-pain-points-and-market-gaps.md` #11, `research/goodnotes.md`). Drawing apps have the engine but no notes/sync/OCR around it.
- **Feasibility.** High but core. `sane_brushes` implements the stamp-along-path model; `sane_ink` conditions the line (StreamLine/stabilise/motion-filter) before `sane_render` tessellates. The latency bar (≤16 ms iPad, ≤25 ms Android) is met by the native front-buffer plugins, not the Flutter canvas — **this is exactly what the M0 SN-INK spike measures and the ADR-0001 exit criterion protects**.
- **Risk.** Cross-platform low-latency parity is the single biggest technical risk in the product; if the pure-Flutter path misses budget, the editor surface pivots to native views per ADR-0001 while `sane_brushes`/`sane_core` stay in Dart.
- **Milestone.** M1 (default kit + curves + StreamLine); M7 (custom `.sanepen` authoring + marketplace).
- **User story.** *"As Riya sketching a free-body diagram, I flick a fast line and it tapers like a real fountain pen, then tilt my Pencil to shade the block — and it feels like paper, not lag."*

### F02 — Triple-sync capture: ink + audio + transcript **[SIGNATURE]**

**Description.** One scrubbable timeline binds three streams: **stroke timestamps**, the **audio waveform**, and an **on-device transcript**. Tap any word, stroke, or second and the other two jump to it; during playback the ink written at the current audio moment highlights itself. Every stroke already carries a timestamp (locked decision 4), so we store per-stroke `offsetMs = strokeTime − recordStart`; Whisper/SpeechAnalyzer word timestamps give `word → audioMs` for both spoken and recognised-ink words (`research/handwriting-recognition-ai-and-ml.md` §6).

- **Why competitors lack it.** Notability pioneered audio-synced notes but paywalls transcription, ties it to the cloud, and can't record in the background; GoodNotes' audio "feels secondary" and lacks tap-to-seek. Nobody unifies stroke + waveform + searchable transcript into one timeline (`research/user-pain-points-and-market-gaps.md` idea #1).
- **Feasibility.** Medium-high. `sane_audio` handles crash-safe capture (F23); `sane_ml` runs WhisperKit (Core ML) on Apple and whisper.cpp on Android/desktop, both with word-level timestamps (`research/handwriting-recognition-ai-and-ml.md` §5). The sync is trivial once strokes and ASR share one monotonic clock — store absolute wall-clock, not cumulative note time, to survive pauses/edits.
- **Risk.** On-device ASR accuracy/latency in noisy lecture halls; ship English first, expand languages honestly. Background-audio OS entitlements must be correct or capture silently fails.
- **Milestone.** M1 (capture + tap-to-play by stroke), M4 (transcript + word-level cross-navigation).
- **User story.** *"I zoned out in the eigenvalues lecture; I tap the messy line I wrote at 14:32 and hear exactly what the professor said as I wrote it."*

### F03 — Zero-server, local-first CRDT sync over the user's own cloud **[SIGNATURE]**

**Description.** The device is the source of truth. Edits apply instantly offline; sync flows through the **user's own** iCloud Drive or Google Drive (later OneDrive/Dropbox/WebDAV) as dumb, **fully-encrypted** transport. The layout is **per-device append-only op-log segment files + periodic compacted snapshots** — single-writer files mean the cloud *never* makes a conflict copy, and a CRDT merges everyone's tails with no last-write-wins data loss (`research/local-first-sync-and-crdt.md` §3–4). No Sane Notes server ever stores note content (locked decision 3).

- **Why competitors lack it.** Every incumbent relies on a central cloud as source of truth with opaque conflict handling — the #1 complaint across all apps. They structurally *can't* copy this without abandoning their cloud/subscription business (`research/user-pain-points-and-market-gaps.md` #1, idea #2).
- **Feasibility.** High effort, proven pattern. `sane_core` uses a movable-tree CRDT for the notebook/page tree and immutable-stroke add-wins sets for ink (Loro is the closest fit for native move + time-travel; Automerge 3 / Yjs are alternatives — decided in a CRDT ADR). `sane_sync` writes `ops/<deviceId>.<seq>.enc` via `NSFileCoordinator` (iCloud) and the Drive Changes API. **The stroke model must be CRDT-friendly from day one — retrofitting is painful, so this is an M0 foundational decision.**
- **Risk.** CRDT history blow-up (chunk per page, compact to snapshots); iCloud "you cannot force a sync" latency (expose a manual "sync now" and tolerate seconds-to-hours).
- **Milestone.** M0 (op-log core), M2 (cloud backends + snapshots).
- **User story.** *"My tablet died mid-exam-prep; I open the web app on a library PC, everything's there, and nothing I wrote on the train got overwritten."*

### F04 — Hybrid paged + infinite canvas **[SIGNATURE]**

**Description.** One document that starts **paged** (fixed-size, structured, PDF-backed) and **expands infinitely** in any direction on demand — a lecture page can spill sideways into a mind-map without exporting or converting document types. Page kinds (fixed-size paged, infinite canvas, PDF-backed) are already in the locked document model (decision 4).

- **Why competitors lack it.** Users must choose apps or document types today: GoodNotes bolted on a separate "Whiteboard" doc type; Notability has no infinite canvas at all; OneNote is free-form but not paged-first (`research/user-pain-points-and-market-gaps.md` idea #5, `research/notion.md`, `research/apple-notes-freeform.md`).
- **Feasibility.** Medium-high. The rendering challenge is real — a naive infinite canvas makes "each stroke use memory." `sane_render` needs a **tiled, level-of-detail canvas with aggressive culling** to hold the 60 fps / 300 MB budgets (decision 7). Content-addressed stroke chunks (F03) map naturally onto tiles.
- **Risk.** Performance on 4 GB Android with a large expanded canvas; scope the expansion with region chunking and lazy tessellation.
- **Milestone.** M1 (paged + PDF-backed), M5 (on-demand infinite expansion + spatial navigation).
- **User story.** *"My chemistry notes are neat paged notes until the reaction mechanism gets big — then I just pull the canvas right and keep going."*

### F05 — On-device Sage AI with a data-leaves-device indicator **[SIGNATURE]**

**Description.** "Sane Sage" runs **on-device by default** — summaries, cleanup, Q&A over your notes, flashcard generation, lecture transcription — with a visible indicator whenever anything would leave the device and **explicit per-request opt-in** for any cloud call (locked decision 6). Answers over your notes cite their source page/stroke.

- **Why competitors lack it.** GoodNotes/Notion assert privacy users can't verify (GoodNotes' policy "collects document data… to improve AI features"). The safe-by-architecture option is offered only by niche apps (`research/user-pain-points-and-market-gaps.md` #15, idea #16).
- **Feasibility.** Medium. `sane_ml` adapts **Apple Foundation Models** (guided generation → typed flashcard/quiz structs) on Apple, **Gemini Nano via ML Kit GenAI** on supported Android, **WebLLM (WebGPU)** on web (`research/handwriting-recognition-ai-and-ml.md` §7). RAG uses **EmbeddingGemma (256-dim Matryoshka) + sqlite-vec** in the local notes DB (§8). Constraints to design around: ML Kit GenAI is foreground-only with per-app quotas; heavy tasks stay opt-in cloud.
- **Risk.** On-device model size vs device RAM on the low-end reference device; degrade gracefully (smaller model / offer opt-in cloud) rather than failing.
- **Milestone.** M4.
- **User story.** *"I ask 'what did I say about entropy?' and Sage answers from my own handwriting with page links — and a little dot confirms nothing left my iPad."*

### F06 — Cross-notebook handwritten backlinks & knowledge graph **[CATEGORY-DEFINING]**

**Description.** Select or draw a phrase and **link it** to another note, page, or anchor; auto-OCR turns handwriting into link targets; each page shows a **backlinks panel**; an Obsidian-style **graph view** renders handwritten pages as nodes. This fuses the two capabilities users want most but that live in different apps: expressive ink and networked knowledge.

- **Why competitors lack it.** The clearest unserved intersection in the market — Obsidian users beg to link handwritten notes ("no good solution"); ink apps have no networked linking (`research/user-pain-points-and-market-gaps.md` #2, idea #4).
- **Feasibility.** Medium. Requires reliable OCR (F07) to make handwritten anchors linkable, plus a bidirectional link store in `sane_core` (links are CRDT objects: add-wins set of edges with LWW metadata). The graph view is well-trodden UI.
- **Risk.** Link integrity across renames/moves and CRDT merges — anchor links to stable stroke/opIds, never to text offsets.
- **Milestone.** M5 (needs M3 recognition first).
- **User story.** *"I circle 'Fourier transform' in my signals notes and link it to the maths page where I derived it — months later the graph shows every place I touched it."*

### F07 — Free, on-device, multilingual, mixed-script handwriting search

**Description.** Accurate handwriting search that is **free**, runs **on-device**, and handles **multiple scripts and mixed languages in one note** — flipping a universal pain into a headline feature. Background recognition builds a searchable per-word index without ever destroying or converting the ink.

- **Why competitors lack it.** OCR is paywalled everywhere, inaccurate, and English-only; can't mix two languages in a note (`research/user-pain-points-and-market-gaps.md` #3).
- **Feasibility.** Medium-high — the technical crown jewel. `sane_ml` uses **ML Kit Digital Ink Recognition** (free, on-device, 300+ languages / 25+ writing systems, same `(x,y,t)` stroke model we already capture) as the default online-ink engine; **MyScript iink** is the paid upgrade for top-tier accuracy/math/diagrams; **Apple Vision** handles imported-image/PDF OCR (`research/handwriting-recognition-ai-and-ml.md` §1). Index in `sane_search` (SQLite FTS + ink index).
- **Risk.** Multilingual accuracy on messy handwriting is genuinely hard; scope launch languages honestly (English first per locale plan) and let users correct/train. MyScript's on-device license needs periodic connectivity after a 30-day grace — document if adopted.
- **Milestone.** M3.
- **User story.** *"My notes mix English and Hindi in the same line and search still finds 'त्वरण' and 'acceleration' — for free, offline."*

### F08 — Live-unit physics/math scratchpad **[CATEGORY-DEFINING]**

**Description.** A notebook where handwritten or typed expressions **evaluate live**, carry **physical units** (m/s, kg, °C), propagate units through equations, and **flag dimensional errors**. Owns STEM students and engineers — a segment the ink incumbents ignore.

- **Why competitors lack it.** Apple Math Notes and Soulver show appetite for inline computation but are calculator-flavoured with shallow unit handling; no note app does units-aware CAS over handwriting (`research/user-pain-points-and-market-gaps.md` idea #11).
- **Feasibility.** Medium. Ship **typed-math-with-units first** (a units-aware CAS in Dart), add **ink-math second** via handwriting-to-math OCR (MyScript Math or Apple Math Notes on OS 26; Mathpix as opt-in cloud for hard/chemistry content — `research/handwriting-recognition-ai-and-ml.md` §4). `sane_ml` owns the recognition adapter; `sane_core` stores the expression graph.
- **Risk.** Handwriting→math OCR is the hardest recognition task; keep it opt-in and always show the recognised expression for correction.
- **Milestone.** M5.
- **User story.** *"I write `v = 9.8 m/s² × 3 s` and it shows `29.4 m/s`; when I fumble and add a metre to a second, it flags the unit mismatch before I carry the mistake through the whole problem."*

### F09 — Pen-driven spaced repetition (handwriting stays the card) **[CATEGORY-DEFINING]**

**Description.** Lasso handwritten Q/A or highlight terms and **auto-generate spaced-repetition cards** (FSRS/SM-2) that review **inside** the note, with the **original ink as the card face** — no export to Anki, no lossy text conversion.

- **Why competitors lack it.** Students hack this together today (NotesAnkify, RemNote, StudyCards AI), which proves demand and shows no native tool does it end-to-end; converting handwriting to text loses the note's character (`research/user-pain-points-and-market-gaps.md` idea #10).
- **Feasibility.** Medium. FSRS is open and small; `sane_ml` optionally uses the on-device LLM (F05) to draft Q/A pairs from recognised text; `sane_core` stores cards as objects linked to their source strokes. The differentiator is keeping the ink as the card, not the text.
- **Risk.** Scheduling correctness and review-UI friction; reuse a proven FSRS implementation rather than inventing scheduling.
- **Milestone.** M5.
- **User story.** *"I lasso the definition I wrote in class, tap 'make card', and next week Sane Notes quizzes me on my own handwriting."*

### F10 — Note-creation replay over the audio timeline **[CATEGORY-DEFINING]**

**Description.** Replay a page being **drawn stroke-by-stroke**, optionally over its synced audio (F02) — "watch how this note was built." Procreate proves the appetite with time-lapse; a note app can do it *better* because the op-log already records every stroke in order (`research/procreate.md` §9, "Session time-lapse replay").

- **Why competitors lack it.** Note apps rarely offer any replay; the ones that record video (Procreate) aren't note apps and don't tie replay to audio or transcript.
- **Feasibility.** Low-medium — mostly a byproduct of doing the op-log right (F03). `sane_render` replays ops in HLC order; scrub speed and range are UI. Ties directly to per-stroke version history (F13).
- **Risk.** Replay fidelity for very long pages — sample/keyframe the op stream for scrubbing.
- **Milestone.** M7 (after op-log M0 and audio M4).
- **User story.** *"For my study group I replay the derivation building up in sync with the lecturer's voice — it's a mini screencast I never had to record."*

### F11 — E2E-encrypted collaborative classroom rooms **[CATEGORY-DEFINING]**

**Description.** A **join-by-link "room"** where a teacher's page streams live to students, each student annotates their own synced copy, and the session saves to everyone's library — filling a gap that generic web whiteboards (Draw.chat, Woo) only half-serve. Real-time collaboration uses **WebRTC data channels with an optional ciphertext-only relay** (locked decision 3), so even the relay sees only encrypted CRDT updates.

- **Why competitors lack it.** Real-time collab is absent (Notability) or Pro-gated (GoodNotes needs a paying participant); no incumbent offers session-based shared ink rooms for education (`research/user-pain-points-and-market-gaps.md` #8, idea #12).
- **Feasibility.** Medium-high. Builds on `sane_sync`/`sane_crypto`: y-webrtc-style P2P where signaling does peer discovery only, a **room password encrypts signaling**, and app-layer CRDT updates are E2E-encrypted so any TURN relay carries only ciphertext (`research/local-first-sync-and-crdt.md` §7). Practical cap ~dozens of peers → the relay-only catch-up server handles larger classes and late joiners.
- **Risk.** Mild tension with the no-server ethos — solve by making rooms an explicit, opt-in, *ephemeral* relay separate from personal sync, holding no keys. NAT traversal needs STUN/TURN.
- **Milestone.** M6.
- **User story.** *"My professor shares a room link; her worked example appears on my page live, I scribble my own questions in the margin, and the whole session is in my library after class — end-to-end encrypted."*

### F12 — Editable vector ink after the fact

**Description.** Store handwriting/diagram strokes as **re-selectable vectors** so a user can later change a stroke's **colour, thickness, or pen type** — recolour an entire highlighted passage, bump every heading stroke thicker, or convert a pencil scribble to a fountain-pen line — without redrawing (`research/concepts-linea-paper-fresco.md` §1, idea #3).

- **Why competitors lack it.** Raster-ink note apps flatten strokes; only vector drawing apps (Concepts) keep strokes editable, and they aren't note apps.
- **Feasibility.** Medium. Falls out of the immutable-stroke-object model (F03): geometry is captured once; **mutable attributes (colour/width/opacity/pen id) are independent LWW registers** on the stroke (`research/local-first-sync-and-crdt.md` §3). "Independence mirrors intent" — separate registers so concurrent move and recolour both survive.
- **Risk.** Changing pen type after the fact may re-tessellate differently — cache original sample data so any pen can re-render the stroke.
- **Milestone.** M1 (attributes) → M5 (bulk restyle by selection/query).
- **User story.** *"I decide my headings should be teal, select them all, and recolour a week of notes in one tap."*

### F13 — Per-stroke version history & time-travel scrubber

**Description.** A **scrubbable timeline** that replays or restores any page to any past state, per-stroke, **offline**, with no reliance on iCloud/Notability snapshots — directly answering "I changed something by accident, can I get the old version back?" and "undo is broken after switching notebooks."

- **Why competitors lack it.** Recovery today depends on cloud version history, not an in-app per-stroke timeline; undo breaks across notebook switches (`research/user-pain-points-and-market-gaps.md` #10, idea #7).
- **Feasibility.** Low-medium — mostly a byproduct of the op-log (F03) plus a timeline UI. Keep a bounded ring of snapshots (hourly for a day, daily for a month) plus the op tail (`research/local-first-sync-and-crdt.md` §9).
- **Risk.** History size (F03 compaction bounds it).
- **Milestone.** M2 (with sync/snapshots); shares the replay engine with F10.
- **User story.** *"I erased a paragraph I actually needed; I drag the timeline back ten minutes and it's back — offline, no cloud round-trip."*

### F14 — Open, round-trippable `.sanenote` format + importers

**Description.** Notes stored as an **open, documented package** — `manifest.json` (ids, HLC vector, schema version) + open stroke segments (points, pressure, tilt, tool, colour, timestamps) + embedded PDFs/media blobs — with lossless import/export and a **public spec**, plus importers for `.goodnotes`/PDF/`NTB` where legally possible. "You can always leave" is a trust feature and a marketing wedge (locked decision 4; `research/local-first-sync-and-crdt.md` §9, idea #8).

- **Why competitors lack it.** ".goodnotes can only be opened in GoodNotes"; "no common format"; export means losing editability (`research/user-pain-points-and-market-gaps.md` #5).
- **Feasibility.** Low-medium — mostly design discipline: use open primitives (SVG/ink-ML-like stroke data, PDF, JSON manifest). Export also to PDF/PNG/SVG/Markdown/JSON (decision 4).
- **Risk.** Legality/robustness of importing competitors' proprietary formats — do PDF and open formats first; reverse-engineered importers are best-effort.
- **Milestone.** M0 (spec) → M2 (export) → M3+ (importers).
- **User story.** *"Before I commit, I export my whole library to open files I can read without the app — so I know I'm never trapped."*

### F15 — Dwell-to-perfect QuickShape / QuickLine

**Description.** Draw a rough line, box, arrow, circle, or polyline and **hold the pen at the end** — it snaps to a perfect shape, stays scalable/rotatable without lifting, and exposes **Edit Shape** nodes and 15° magnetic-rotate. The single highest-leverage feature for hand-drawn diagrams, tables, underlines, and flowcharts, and a de-facto standard across drawing apps (Procreate QuickShape, Concepts Draw-&-Hold, Linea ZipShape — `research/procreate.md` §4, `research/concepts-linea-paper-fresco.md`).

- **Why competitors lack it.** Note apps offer shape recognition unevenly and rarely with post-edit nodes; the *same dwell* handling both a straight ruled line and a whole shape is a drawing-app idiom notes haven't adopted well.
- **Feasibility.** Medium. `sane_ink` pipeline: **RDP simplification → $P/$Q or ML Kit shape classifier → least-squares line/circle/ellipse fit + polyline-corner snapping**, triggered by a configurable dwell (`research/handwriting-recognition-ai-and-ml.md` §3).
- **Risk.** Over-eager snapping frustrates freehand writers — make dwell time configurable and never snap mid-sentence handwriting.
- **Milestone.** M1.
- **User story.** *"I sketch a lopsided rectangle for a truth table, pause, and it snaps square — then I draw-hold three lines into a perfect grid."*

### F16 — Nudge-to-reshape, Slice-to-split, non-destructive mask erase

**Description.** Drag an existing stroke to **reshape** it like a string (fix a wobbly underline), **slice with width 0** to *split* a stroke in two (separate two run-together words), and **mask-erase** that hides ink while keeping it recoverable — so an accidental scrub or a highlighter mistake never destroys the note (`research/concepts-linea-paper-fresco.md` §1, ideas #4/#5).

- **Why competitors lack it.** Note-app erasers are destructive; only vector drawing apps (Concepts) offer nudge/slice/mask.
- **Feasibility.** Medium. Depends on editable vector strokes (F12); masks are LWW attributes, not deletions, so they merge cleanly and are undoable via F13.
- **Risk.** Reshaping immutable strokes conflicts with the "geometry captured once" model — implement nudge as a new derived stroke referencing the original, or as an explicit geometry-edit op.
- **Milestone.** M5.
- **User story.** *"I scrubbed out a line I actually wanted; because erase is a mask, I just un-hide it instead of redrawing."*

### F17 — Predictive low-latency ink with per-device tuning + tremor mode

**Description.** A **motion-prediction + adaptive palm-rejection** layer, tuned per device/stylus, that makes even mid-range Android tablets feel premium, plus a **Motion Filtering** tremor/accessibility mode that deletes wobble extremities (`research/procreate.md` §2.3, `research/user-pain-points-and-market-gaps.md` idea #14).

- **Why competitors lack it.** Latency and palm rejection are inconsistent on Android and criticised even on some iPads/Samsung ("hallucinates where the pen will end up"); tremor support is rare.
- **Feasibility.** Medium. `sane_ink` does app-level stroke prediction; the `plugins/` native layer taps **Jetpack Ink + androidx.graphics.lowlatency** on Android and **Metal/CAMetalLayer front-buffer** on Apple. Requires real device-lab testing across the Android fragmentation surface (`tools/` perf harness + device-lab configs).
- **Risk.** Over-prediction produces visible "rubber-banding" on direction changes; cap prediction horizon and blend out.
- **Milestone.** M0 (measured in the SN-INK spike) → M1 (shipped) → ongoing per-device tuning.
- **User story.** *"On my ₹25k Android tablet the ink still sticks to the nib — the thing that makes cheap tablets feel broken elsewhere."*

### F18 — Provable privacy mode ("your notes never touch our machines")

**Description.** A mode where **all storage and all AI run on-device or on the user's own cloud**, with a plainly stated, verifiable "we operate no server that can read your notes" — a credibility moat no VC-backed cloud incumbent can copy without rearchitecting. Everything in the cloud is E2E-encrypted (XChaCha20-Poly1305, envelope keys, per-notebook keys wrapped by a user master key in Keychain/Keystore, escrowed via a printable recovery code — locked decision 3).

- **Why competitors lack it.** Every incumbent asks users to trust an unverifiable claim; the architecture that makes it provable (F03 + F05) is one they can't adopt without abandoning their cloud business (`research/user-pain-points-and-market-gaps.md` #15, idea #3).
- **Feasibility.** Medium — largely a *consequence* of F03 and F05 plus `sane_crypto`. Envelope scheme follows Standard Notes/Notesnook: Argon2id KDF, per-item content keys, passkey-PRF preferred with platform-keychain and passphrase fallbacks, user-held recovery code for true zero-knowledge (`research/local-first-sync-and-crdt.md` §6).
- **Risk.** True zero-knowledge means **lost passphrase = permanent data loss**; make the recovery-code UX unmissable and escrow the wrapped master key via iCloud Keychain / Android Keystore / Google Password Manager.
- **Milestone.** M2.
- **User story.** *"I flip on 'nothing leaves my devices' and I can actually prove it — the network indicator never lights up while I work."*

### F19 — Semantic cross-modal search over ink + audio + PDF text

**Description.** Free **semantic search** that spans handwriting, transcripts, and PDF text at once — "find where I discussed eigenvalues," whether written, spoken, or in an imported paper — entirely offline (`research/user-pain-points-and-market-gaps.md` idea #17).

- **Why competitors lack it.** Current search is literal, paywalled, and English-only; none span modalities.
- **Feasibility.** Medium. Once ink is OCR'd (F07) and audio transcribed (F02), `sane_search` embeds chunks with **EmbeddingGemma** and stores vectors in **sqlite-vec** right next to content, feeding on-device-LLM RAG (`research/handwriting-recognition-ai-and-ml.md` §8).
- **Risk.** Incremental, battery-friendly indexing — embed on save, throttle, never block the writing thread.
- **Milestone.** M4 (after F07 recognition and F02 transcript).
- **User story.** *"I search 'entropy' and get the paragraph I wrote, the minute the lecturer said it, and the page in the PDF I imported — one result list."*

### F20 — First-class large-PDF engine

**Description.** A **tiled, GPU-accelerated PDF renderer** with lazy loading, recognised outlines, and fast text-snap highlighting — annotate 1,000-page textbooks and scroll a 600-page PDF at 60 fps (locked decision 7), targeting exactly the law/med/researcher users the incumbents frustrate.

- **Why competitors lack it.** Large PDFs are a documented performance cliff (GoodNotes low-memory lag, Notability "huge lag"); Samsung exports rasterised, unsearchable PDFs (`research/user-pain-points-and-market-gaps.md` #7, idea #18, `research/samsung-notes-nebo-other.md`).
- **Feasibility.** Medium-high. `sane_pdf` wraps **PDFKit** (Apple) / **pdfium** (Android/web via the plugin layer); the engineering is virtualisation and annotation-layer compositing so ink stays smooth over huge documents. Keep a selectable OCR text layer so export stays searchable.
- **Risk.** Memory on 4 GB Android with a huge PDF + ink overlay — page-window the renderer and evict off-screen tiles.
- **Milestone.** M1 (view/annotate) → M3 (outline recognition + text-snap highlight).
- **User story.** *"My 1,200-page anatomy PDF opens instantly and my highlights snap to the text — no lag, no rasterised blur on export."*

### F21 — Rich metadata: tags, typed properties, saved smart views

**Description.** Pages carry **tags** and **typed properties** (course, date, status) and users build **saved smart views** ("all Physics pages tagged #exam from this month"), giving ink notes database-like retrieval — borrowing from Notion/Obsidian without leaving the pen behind.

- **Why competitors lack it.** Organisation tops out at folders/dividers; Notability caps nesting at 6 with no tags; ink apps have no query layer (`research/user-pain-points-and-market-gaps.md` #13, idea #19, `research/notion.md`).
- **Feasibility.** Low-medium — a metadata layer + query UI on `sane_core`'s note store; no novel tech. Properties are LWW registers on notebook/page nodes.
- **Risk.** Feature creep toward a full Notion database — keep it "databases-lite" and pen-first.
- **Milestone.** M5.
- **User story.** *"One smart view shows every #exam page across all my subjects, sorted by date — my whole revision queue in one place."*

### F22 — Accessibility-native ink

**Description.** Because Sane Notes OCRs on-device, it can **feed recognised handwriting to VoiceOver/TalkBack**, offer OCR-backed descriptions of handwritten content, high-contrast/true-dark reading, reflow/zoom, and dyslexia-friendly fonts for typed content — making it the first genuinely accessible handwriting app and opening education/institutional procurement that *requires* accessibility (WCAG 2.2 AA, locked decision 10).

- **Why competitors lack it.** Handwritten strokes are invisible to screen readers unless OCR'd, and no ink app appears to bridge this; dark mode is inconsistent (`research/user-pain-points-and-market-gaps.md` #14, idea #20).
- **Feasibility.** Medium. Leans on F07 OCR plus platform accessibility APIs and the design system's contrast tokens (`../design/design-system.md`). Adopt Procreate's accessibility set wholesale: Color Cards with names, colour-name announcements, single-touch gesture companion, tremor filtering (`research/procreate.md` §10).
- **Risk.** OCR errors mislead screen-reader users — expose confidence and let users correct the recognised text that assistive tech reads.
- **Milestone.** M3 (ink→a11y bridge) with a11y baked into every screen from M1.
- **User story.** *"As a low-vision student, my screen reader can finally read a friend's handwritten notes aloud to me."*

### F23 — Reliable, transparent audio with background capture & crash recovery

**Description.** **Rock-solid background recording**, continuous **crash-safe journaling of audio to disk** (write-ahead buffers), and **one-tap recovery** — directly answering "can I recover a recording after a crash?" and Notability's inability to record in the background.

- **Why competitors lack it.** Audio is fragile everywhere — no background recording in Notability, crash-loss and hidden controls in GoodNotes (`research/user-pain-points-and-market-gaps.md` #9, idea #15).
- **Feasibility.** Low-medium — disciplined engineering in `sane_audio` (write-ahead audio buffers, correct OS background-audio entitlements). High reliability payoff for modest cost; underpins F02.
- **Risk.** Background-audio entitlement rejection / OS kills — test on real devices and flush frequently.
- **Milestone.** M1.
- **User story.** *"The app crashed 50 minutes into a two-hour seminar; I reopen it and the whole recording is intact."*

### F24 — Live ink transclusion (draw once, embed everywhere) **[CATEGORY-DEFINING]**

**Description.** Lasso a diagram or block of strokes and **transclude it live** into other notes — a single source group that updates everywhere it's embedded. Extends Concepts' "drag out a selection" and Paper's "canvas clips" (`research/concepts-linea-paper-fresco.md`) into a *live, syncing* reference rather than a one-time copy. Reuse a hand-drawn figure across a lecture note, a summary, and a flashcard, and fix it once.

- **Why competitors lack it.** No note app transcludes handwritten content live; copy-paste makes dead duplicates that drift out of sync.
- **Feasibility.** Medium. Builds on immutable stroke groups (F03/F12) and the backlink store (F06): a transclusion is an edge to a source stroke-group id; `sane_render` composites the referenced group at render time. Content-addressed blobs make the referenced ink cache cheaply.
- **Risk.** Edit semantics — clarify that editing a transcluded instance edits the source (or forks it), and handle deletion of a source that others reference (tombstone + placeholder).
- **Milestone.** M5.
- **User story.** *"I drew the Krebs cycle once; it lives in my metabolism note, my exam summary, and a flashcard — I fixed one arrow and all three updated."*

### F25 — Sage "understanding-gap" study companion **[CATEGORY-DEFINING]**

**Description.** An on-device Sage mode that reviews a notebook **plus your flashcard performance** (F09) and surfaces **what you haven't captured or are weak on** — concepts mentioned in the lecture transcript or imported PDF but missing from your notes, terms you keep failing, derivations you never finished — and offers to generate targeted cards or a revision page. A private tutor that reads *only* your own material, on-device.

- **Why competitors lack it.** AI note features today summarise or quiz per-note; none cross-reference your notes against your sources *and* your recall performance to find gaps. It's only possible because F02/F07/F09/F19 put ink, transcript, PDF, and recall in one local index.
- **Feasibility.** Medium-high. `sane_ml` composes the on-device LLM (F05) over the semantic index (F19) and FSRS stats (F09); everything stays local. Frame outputs as suggestions the student accepts, never silent edits to their notes.
- **Risk.** Hallucinated "gaps" erode trust — cite the source (transcript minute / PDF page) for every claimed gap, and keep it opt-in.
- **Milestone.** M5–M6 (after AI, search, and study layers exist).
- **User story.** *"Before my exam, Sage tells me the lecturer spent ten minutes on Lagrangians but my notes barely mention them — and offers to build me a page and five cards."*

---

## Part 3 — The signature five (our bets)

Of the 25, five are the ones we bet the product on. They are chosen so that **winning even three of the five convincingly already puts Sane Notes ahead of any single incumbent** (`research/user-pain-points-and-market-gaps.md`, "Cross-cutting strategic read"), and so that each is *architecturally load-bearing* — half the other 20 features depend on these five existing.

| Bet | Feature | Attacks pain | Enables |
|-----|---------|--------------|---------|
| 1 | **Pen & Brush Studio** (F01) | #11 pen feel; the whole point of an ink app | F12, F15, F16, F17 |
| 2 | **Triple-sync: ink + audio + transcript** (F02) | #9 audio; the "recover the lecture" superpower | F10, F19, F25 |
| 3 | **Zero-server encrypted sync via the user's own cloud** (F03) | #1 sync/data-loss; #6 trust | F13, F14, F18, F24, and all of collaboration |
| 4 | **Hybrid paged + infinite canvas** (F04) | the paged-vs-infinite false choice | F20, spatial note-taking |
| 5 | **On-device Sage AI** (F05) | #15 unprovable AI privacy | F07, F09, F19, F25 |

**Why these five, and why not others.**

- **Trust is the wedge, and F03 is its keystone.** The two loudest, most emotional complaints in the market — sync/data loss and the Notability subscription betrayal — are both *trust* failures. Local-first zero-server sync (F03) plus provable privacy (F18) plus open format (F14) form a coherent trust platform that incumbents **structurally cannot match** without abandoning their cloud/subscription businesses. F03 is first among equals: version history (F13), the open format's portability guarantee (F14), live transclusion (F24), and collaboration all fall out of getting the op-log/CRDT model right. This is why it is an **M0** decision — the stroke data model must be CRDT-friendly from day one.

- **On-device AI (F05) is the enabling technology for a whole cluster.** Free handwriting search (F07), spaced repetition (F09), semantic search (F19), and the understanding-gap companion (F25) all depend on a good on-device ink-OCR + ASR + small-LLM + embeddings stack. Investing early in `sane_ml` unlocks *half the differentiators and the privacy story simultaneously*.

- **The pen must feel unimpeachable (F01), or nothing else matters.** A note app that lags on handwriting loses instantly (`research/procreate.md` §9). F01 is where the perceptual bar is set, and its latency requirement is the reason the **M0 SN-INK spike is a p0 risk gate** with a native-view exit criterion in ADR-0001.

- **Audio triple-sync (F02) is the single most-wanted student superpower** that no one has unified, and it is the spine of F10/F19/F25. Notability owns "audio notes" reputationally; we take it further (background, on-device transcript, cross-navigation) and make it free.

- **Hybrid canvas (F04) resolves a false choice** every incumbent forces, and its tiled renderer is the same virtualisation engine the large-PDF engine (F20) needs — one hard rendering investment, two headline payoffs.

**What we deliberately did *not* make a signature bet.** The knowledge graph (F06) and study verticals (F08/F09/F25) are differentiators but they *depend on* the five (recognition, AI, sync) — they are the second wave, not the foundation. Collaboration (F11) is a strong differentiator but is correctly an M6 follow-on that leans on the F03 sync/crypto substrate. Betting the foundation first is what lets the later differentiators ship quickly and safely.

---

## Part 4 — Features missing in ALL note apps (category-defining)

The maintainer asked for at least one feature that *no note app ships*. We commit to **five**, each marked **[CATEGORY-DEFINING]** above. These are the boldest wedge — where Sane Notes doesn't just do an existing feature better, but creates a capability the category has never had. Each is only *possible* because the signature five put ink, audio, transcript, PDF, recall, and a networked knowledge store into one local, encrypted, CRDT-backed index.

1. **Cross-notebook handwritten backlinks & knowledge graph (F06).** The clearest unowned intersection in the market: Obsidian's networked knowledge, but the nodes are your *handwriting*. Draw a phrase, link it, and watch a graph of your handwritten pages assemble itself. No ink app links; no linking app inks.

2. **Live-unit physics/math scratchpad (F08).** Handwritten or typed expressions that evaluate live, carry real physical units, propagate them through equations, and flag dimensional errors. Owns the STEM segment the ink incumbents ignore — a calculator that lives inside your notes and checks your physics.

3. **Pen-driven spaced repetition where the handwriting *is* the card (F09).** Students already smuggle their notes into Anki; we make the note itself the flashcard, reviewed in place, scheduled by FSRS, with zero lossy conversion. The ink you trust is the thing you revise.

4. **Note-creation replay over the audio timeline (F10).** "Watch how this note was built" — the page redraws stroke-by-stroke, optionally over the synced lecture audio. Procreate proved people love time-lapse; only a note app with an op-log and audio sync can replay *thinking*, not just *drawing*.

5. **Live ink transclusion (F24)** and **the Sage understanding-gap companion (F25)** — draw a diagram once and embed it live across every note that needs it; and let an on-device tutor cross-reference your notes against your own lectures, PDFs, and recall performance to tell you *what you don't yet understand*. Both are impossible without the unified local index the signature five create, and both keep every byte on-device.

**Boldest single bet, if forced to pick one:** **F25, the understanding-gap companion.** It is the feature that turns a note app from a *recording* tool into a *learning* tool — it reads only the student's own material, runs entirely on-device, and answers the question every student actually has ("am I ready?") that no competitor even attempts. It is the emotional peak of the "students first" persona and the clearest proof that on-device AI (F05) over a unified private index (F02/F07/F19) is a category shift, not a checkbox.

---

## Appendix — traceability

- Every pain point in Part 1 maps to at least one feature in Part 2; every Part 2 feature names the research file(s) it derives from.
- Feature ids `F01…F25` are stable references for the roadmap, issue tracker (`issues/`), and ADRs.
- Locked decisions honoured: single Flutter codebase (F01/F04/F17 note the native-plugin ink layer and ADR-0001 exit criterion), monorepo package split (feasibility notes name the owning package), local-first zero-knowledge sync (F03/F18), the locked document model and `.sanenote` format (F04/F12/F14), on-device-first AI (F05 and its dependent cluster), performance budgets (F01/F04/F17/F20), and accessibility/localisation commitments (F22).
- Where research pressured a locked decision, the decision was kept and the risk recorded in the feature's **Risk** line (notably F01's latency risk → ADR-0001 native-view exit criterion; F03's CRDT history growth → chunk/compact; F18's zero-knowledge → recovery-code UX).
