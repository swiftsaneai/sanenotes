# Backlog — area: study

16 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-STDY-001](study.md#sn-stdy-001) **Build Study tools: flashcards, spaced repetition, quizzes, focus, backlinks & graph** (epic · M6 Collaboration, Sharing & Sage AI)
  - [SN-STDY-002](study.md#sn-stdy-002) **Model study objects: cards, decks, sets, review state, quizzes, timer logs, links** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-003](study.md#sn-stdy-003) **Create flashcards from handwriting and lasso with ink face and OCR text layer** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-004](study.md#sn-stdy-004) **Implement the FSRS spaced-repetition scheduler with SM-2 fallback, on-device** · p1 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-005](study.md#sn-stdy-005) **Build review mode that runs inside note context with rate and open-source** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-006](study.md#sn-stdy-006) **Build study sets that group cards across notebooks with new/learning/due counts** · p1 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-007](study.md#sn-stdy-007) **Build quiz generation and quiz mode with grading and wrong-answer capture** · p2 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-008](study.md#sn-stdy-008) **Add a focus / Pomodoro timer with time-on-task logging and DND request** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-009](study.md#sn-stdy-009) **Build local-only study progress analytics: retention, streaks, time-per-subject** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-010](study.md#sn-stdy-010) **Add study and review-due reminders via local notifications** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-011](study.md#sn-stdy-011) **Export study sets to CSV/Anki and a classroom-friendly printable handout** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-012](study.md#sn-stdy-012) **Import study sets from Quizlet, Anki and CSV/TSV** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-013](study.md#sn-stdy-013) **Create backlinks from a selection, stroke group or page region to any anchor** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-014](study.md#sn-stdy-014) **Build the bidirectional backlinks panel with context snippets** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-STDY-015](study.md#sn-stdy-015) **Build the knowledge graph view of notes and links with filtering** · p2 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-GPHN-005](study.md#sn-gphn-005) **Build a one-handed swipe review surface for Study on phones** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-GCMP-019](editor.md#sn-gcmp-019) **Implement live ink transclusion (draw once, embed everywhere)** · p2 · feature · L · M6 Collaboration, Sharing & Sage AI

---

## Issues

### SN-GPHN-005

<a id="sn-gphn-005"></a>

**Build a one-handed swipe review surface for Study on phones**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | ios-phone, android-phone |
| Areas | study, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-005](study.md#sn-stdy-005), [SN-PHN-003](design-system.md#sn-phn-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready, innovation |

#### Context
docs/platform/phones.md §4 singles out Study/Review as the surface that is "especially phone-shaped: on the bus, one-handed, review generated flashcards", and gives it a dedicated bottom-navigation slot. [SN-PHN-003](design-system.md#sn-phn-003) wires that slot, and [SN-STDY-005](study.md#sn-stdy-005) builds review mode for all platforms with a reveal control, four rating buttons and web keyboard shortcuts (space/1-4) — but that layout is desk/tablet shaped. There is no phone-optimised review surface where a card is revealed with a tap and rated with a thumb: a swipe or a large bottom rating bar rather than four small targets reached with a second hand. This issue is that surface, driven by the same scheduler and card model as [SN-STDY-005](study.md#sn-stdy-005).

#### Scope
**In:** the phone review session UI — a full-screen card (ink face composited via `sane_render`, or typed), tap-to-reveal, a thumb-reachable rating bar (Again / Hard / Good / Easy) at the bottom with optional swipe-to-rate gestures, the new/learning/due counter, undo-last-rating, the end-of-session summary, and the "open source page" affordance; entry from the Study/Review bottom-nav slot; offline operation.
**Out:** the FSRS/SM-2 scheduler ([SN-STDY-004](study.md#sn-stdy-004)); card creation from handwriting/lasso ([SN-STDY-003](study.md#sn-stdy-003)); study sets ([SN-STDY-006](study.md#sn-stdy-006)); quiz mode ([SN-STDY-007](study.md#sn-stdy-007)); analytics ([SN-STDY-009](study.md#sn-stdy-009)); and Read-Aloud pipeline internals (a11y area).

#### Acceptance criteria
- [ ] The Study/Review bottom-nav slot opens a full-screen review session driven by the due queue from the scheduler ([SN-STDY-004](study.md#sn-stdy-004)), usable entirely with one thumb.
- [ ] A tap reveals the answer; the four rating actions (Again / Hard / Good / Easy) sit in a bottom rating bar within thumb reach, each >= 48x48 dp, and each maps to the same scheduler call as [SN-STDY-005](study.md#sn-stdy-005).
- [ ] Swipe gestures are an optional, configurable equivalent for rating; every swipe has a visible button equivalent (WCAG 2.5.1 / PRD-CO-318) and swipe can be turned off.
- [ ] A running counter shows new/learning/due remaining and updates after each rating.
- [ ] Undo-last-rating restores the previous card and scheduler state as a single step.
- [ ] "Open source page" jumps to the card's `sourceRef` and highlights the source strokes, then returns to the session.
- [ ] The session runs and rates fully offline; ratings persist locally and sync later.
- [ ] An end-of-session summary states how many were reviewed and when the next batch is due, in the ux-principles.md §5 voice.
- [ ] Card render and transitions hold 60 fps on the Android-lowend device; ink faces are memory-capped and do not retain whole notebooks rasterised (budget B9).
- [ ] Renders correctly in all 17 looks and dark mode; ink faces render theme-independently from the shared ink/paper constants.

#### Technical notes
Add `app/lib/study/review/phone_review.dart` composing the review controller from `packages/sane_study` (the same one [SN-STDY-005](study.md#sn-stdy-005) uses) so scheduling, undo and source refs are shared — the phone surface owns only presentation and gestures. Card faces render through `sane_render` with the tile/raster memory cap ([SN-INK-022](ink.md#sn-ink-022)) so a long session does not grow memory. Swipe uses a `Listener`/gesture recogniser that never conflicts with the system back-swipe (coordinate with [SN-GPHN-012](input-gestures.md#sn-gphn-012)). Consume the size class from [SN-PHN-002](compat.md#sn-phn-002); do not branch on platform identity (CLAUDE.md §8).

#### Security & privacy
None beyond baseline, with named controls. **T-CARD-LOG** — card fronts/backs and OCR text are note content; nothing may be logged in profile/release (CLAUDE.md §7.3; MASVS-PRIVACY-1, CWE-532). **T-STUDY-AT-REST** — review state and card faces are stored through the normal `sane_core` + `sane_crypto` path, encrypted at rest, never to a shared cache (MASVS-STORAGE-1, CWE-312). Review analytics stay local-only ([SN-STDY-009](study.md#sn-stdy-009)); no telemetry of review content, and any Sage-generated card content follows the AI opt-in and leave-device rules (SN-AI-001). No new permission or egress.

#### UX notes
Source: docs/design/screens-and-flows.md §1 (Study/Review surface concept), phones.md §4, and [SN-STDY-005](study.md#sn-stdy-005). The surface is calm and single-purpose (ux-principles.md §2) — one card, one action. Motion: card reveal and advance are short (200-300 ms) and cross-fade under Reduce Motion; a swipe-to-rate must have an equal non-motion path (§6). Copy per §5: "5 reviewed · next batch in 2 hours", no exclamation marks. Empty state when nothing is due: "You're caught up — nothing to review right now." a11y: the card and each rating are screen-reader labelled with state, Switch/Voice Control reach every rating, and swipe is never the only way to rate (PRD-CO-318/332).

#### Test plan
- `app/test/study/phone_review_test.dart` — reveal, rate via buttons and via swipe (when enabled), counter updates, undo-last, end summary.
- `app/test/study/phone_review_offline_test.dart` — a full session runs and persists ratings offline.
- `app/test/study/phone_review_source_jump_test.dart` — "open source page" highlights the source strokes and returns.
- `app/test/golden/phone/phone_review_golden_test.dart` — goldens per look family, light and dark, front and revealed states.
- `app/integration_test/phone_review_test.dart` — patrol run: review a due queue one-handed with swipe off then on.

#### Dependencies
[SN-STDY-005](study.md#sn-stdy-005), [SN-PHN-003](design-system.md#sn-phn-003)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-001

<a id="sn-stdy-001"></a>

**Build Study tools: flashcards, spaced repetition, quizzes, focus, backlinks & graph**

| Field | Value |
|---|---|
| GitHub | #30 |
| Type | epic |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, ai, storage |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `CWE-532`, `CWE-311` |
| Extra labels | agent-ready, innovation |

#### Context

Study tools are what turn Sane Notes from a place a student *writes* notes into a place they *learn* from them — the emotional peak of the students-first persona (`docs/product/innovation-brief.md` Part 3/4). This epic delivers the study layer specified in `docs/product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md` §5 (PRD-CO-200..208) and §6 (PRD-CO-240..245): flashcards whose face is the original handwriting (F09), an on-device FSRS spaced-repetition scheduler, in-context review, cross-notebook study sets, quiz mode, a focus/Pomodoro timer, local-only progress analytics, study reminders, classroom-friendly export/import, and the category-defining cross-notebook handwritten backlinks + knowledge graph (F06). Two of these — pen-driven spaced repetition where the ink *is* the card, and a knowledge graph over handwriting — are features no note app ships today (`innovation-brief.md` Part 4).

Everything here is **on-device and local-first** (PRD-CO-000/206, Locked Decision 6/8): flashcards, decks, review state, quiz results, timer logs, links, and study stats are all objects in the document model (PRD-CO-207/245), CRDT-synced (ADR-0005, ADR-0006), E2E-encrypted on sync (ADR-0007), and never sent to any Sane server. AI-drafted card/quiz content routes through the on-device Sage (`SN-AI-001`, ADR-0016) with prompt-injection defences (PRD-CO-170..176). The study layer's domain logic (models, FSRS scheduler) lives in `packages/sane_core` (pure Dart); UI (review, timer, graph, backlinks panel) composes in `app/` + `packages/sane_ui`; recognition/OCR for card backs and link anchors comes from `SN-HWR-001`/`SN-SRCH-001`. This is a headline M6 deliverable (`docs/roadmap.md` M6; PRD-04 §11.2).

#### Scope

**In:** every study surface in PRD-04 §5–§6 — flashcards from handwriting/lasso, FSRS+SM-2 scheduling, review mode, study sets, quiz mode, focus timer, progress stats, study/review reminders, Anki/CSV/Quizlet import + classroom-friendly export, backlinks (create + panel), and the graph view — plus their data model, CRDT sync, E2EE, a11y and golden coverage.

**Out (referenced, not built here):** the on-device AI generators themselves (`SN-AI-001`); handwriting recognition/OCR pipeline (`SN-HWR-001`); FTS/search index (`SN-SRCH-001`); local notifications transport (`SN-NOTF-001`); general export/import framework (`SN-SHR-001`); Library tags & smart collections (`SN-LIB-001`); identity/sync transport (`SN-SYNC-001`, `SN-CRY-001`).

#### Acceptance criteria

- [ ] Every child issue below is merged, CI green, and its own acceptance criteria met.
- [ ] A card created from lassoed handwriting shows the original ink on its face and is found by its OCR text (PRD-CO-200).
- [ ] Rating a card reschedules it via FSRS on-device; the same due date appears on a second device after sync with no review-state loss (PRD-CO-201).
- [ ] Study analytics render in airplane mode and no network call carries any study data (PRD-CO-206).
- [ ] Linking page A to page B makes B's backlinks panel list A, and the graph view opens and navigates (PRD-CO-241/243).
- [ ] Exporting a study set yields a CSV/Anki-importable file; importing a Quizlet/Anki/CSV deck re-creates a set (PRD-CO-207/208).
- [ ] Every study surface renders correctly across all 17 looks + dark mode and meets WCAG 2.2 AA.

#### Children

- [ ] [SN-STDY-002](study.md#sn-stdy-002) Study document-model objects (cards, decks, sets, review state, quiz, timer log, links)
- [ ] [SN-STDY-003](study.md#sn-stdy-003) Flashcards from handwriting & lasso (ink face + OCR text layer)
- [ ] [SN-STDY-004](study.md#sn-stdy-004) FSRS spaced-repetition scheduler (+ SM-2 fallback), on-device
- [ ] [SN-STDY-005](study.md#sn-stdy-005) Review mode inside note context
- [ ] [SN-STDY-006](study.md#sn-stdy-006) Study sets across notebooks
- [ ] [SN-STDY-007](study.md#sn-stdy-007) Quiz generation & quiz mode
- [ ] [SN-STDY-008](study.md#sn-stdy-008) Focus / Pomodoro timer with time-on-task logging
- [ ] [SN-STDY-009](study.md#sn-stdy-009) Study progress analytics (local-only)
- [ ] [SN-STDY-010](study.md#sn-stdy-010) Study & review-due reminders
- [ ] [SN-STDY-011](study.md#sn-stdy-011) Study-set export (CSV/Anki) + classroom-friendly handout
- [ ] [SN-STDY-012](study.md#sn-stdy-012) Study-set import from Quizlet / Anki / CSV
- [ ] [SN-STDY-013](study.md#sn-stdy-013) Create backlinks from selection, stroke group or region
- [ ] [SN-STDY-014](study.md#sn-stdy-014) Bidirectional backlinks panel
- [ ] [SN-STDY-015](study.md#sn-stdy-015) Knowledge graph view

#### Technical notes

Study domain lives in `packages/sane_core/lib/src/study/` (pure Dart: models + FSRS scheduler, `Result<T, Failure>`), persisted via drift/blob store from `SN-CORE-004`, expressed as CRDT ops on the document model per ADR-0005 (`docs/adr/0005-document-model-and-crdt.md`) and `docs/architecture/document-model.md`. AI drafting via `sane_ml` guided generation (ADR-0016). UI + cross-feature Riverpod providers in `app/` (ADR-0003); components in `packages/sane_ui`. Study entry points hang off the Library (`SN-LIB-001`) and the Search/Ask surface (`docs/design/screens-and-flows.md` §11). Reminders via `SN-NOTF-001`.

#### Security & privacy

Study content is note content: encrypted at rest and on sync (MASVS-STORAGE-1, MASVS-CRYPTO-2, CWE-311, ADR-0007); analytics computed and aggregated on-device only, no egress (MASVS-NETWORK-1, MASVS-PRIVACY-1/4, ADR-0011); no card text, prompts, transcripts, or stats in logs (MASVS-PRIVACY-3, CWE-532); imported decks are untrusted input parsed off the UI isolate under resource caps (children carry the specific IDs). AI paths inherit the prompt-injection controls PRD-CO-170..176.

#### UX notes

Delivers the study surfaces across all 17 looks + dark mode per `docs/design/design-system.md` and `docs/design/tokens.json`. The design source (`design/Sane Notes.dc.html`, `docs/design/screens-and-flows.md`) fully specifies the editor/library/share/settings but is thin on dedicated study screens; children implement the decisive defaults and leave `// DESIGN-OPEN` markers per CLAUDE.md §9. A11y (labels, 44 pt / 48 dp targets, contrast, keyboard on web, parallel accessible tree for the graph) is mandatory (PRD-CO-310..339).

#### Test plan

Children name their own tests. Epic-level gates: FSRS scheduling conformance vectors, a review-then-sync integration proving no review-state loss across devices, a golden sweep of study surfaces across looks, and an import fuzz corpus for Anki/CSV/Quizlet.

#### Dependencies

`SN-CORE-002` (entities), `SN-CORE-003` (CRDT), `SN-CORE-004` (persistence), `SN-HWR-001` (OCR), `SN-SRCH-001` (index), `SN-AI-001` (generation), `SN-ED-004` (lasso), `SN-DS-002`/`SN-DS-003` (design system), `SN-CRY-002` (keys), `SN-SYNC-002` (op-log), `SN-NOTF-001` (reminders), `SN-LIB-001` (entry points). Children carry finer-grained `depends_on`.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-002

<a id="sn-stdy-002"></a>

**Model study objects: cards, decks, sets, review state, quizzes, timer logs, links**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | study, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-003](sync.md#sn-core-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `MASVS-PRIVACY-3`, `CWE-311`, `CWE-532`, `OWASP-A02` |
| Extra labels | agent-ready |

#### Context

Every study feature reads and writes the same underlying entities, so this issue defines them once as first-class objects in the document model. PRD-CO-207 requires that flashcards, sets, review state, quizzes and timer logs are objects in the document model (CRDT-synced, E2E-encrypted, exportable), and PRD-CO-245 requires the same for links, backlinks, tags and properties. Modelling these as immutable value objects with CRDT semantics (add-wins object-id set for existence, LWW registers for mutable fields, per-object HLC) from day one is what lets two devices review offline and converge without losing review history (`docs/architecture/document-model.md`, ADR-0005 `docs/adr/0005-document-model-and-crdt.md`). Getting the model right here is the foundation the whole epic ([SN-STDY-001](study.md#sn-stdy-001)) stands on; retrofitting CRDT-friendliness later is painful (innovation-brief F03/F09).

#### Scope

**In:** the pure-Dart entities and their repository interface in `sane_core` — `Flashcard` (`front`/`back` content refs that may be a stroke-group id + optional OCR text, `sourceRef` to page/stroke/opId, `deckId`), `Deck`, `StudySet` (membership by card id, subject/tag/manual criteria), `ReviewState` (per-card FSRS fields: `stability`, `difficulty`, `due`, `lastReview`, `reps`, `lapses`, `state` new/learning/review/relearning), `ReviewLog` (append-only rating events), `Quiz`/`QuizQuestion`/`QuizAttempt`, `TimerSession` (subject, intervals, elapsed), and `NoteLink` (edge: source anchor → target anchor, LWW metadata); CRDT op projections (`createNode`/`setAttr`/add-wins set membership) and `Result<T, Failure>` repository methods; schema-version + migration hook.

**Out:** the FSRS algorithm ([SN-STDY-004](study.md#sn-stdy-004)); any UI; card *creation* from ink ([SN-STDY-003](study.md#sn-stdy-003)); export/import serialisers ([SN-STDY-011](study.md#sn-stdy-011)/[SN-STDY-012](study.md#sn-stdy-012)); encryption transport (`SN-CRY-002`); sync transport (`SN-SYNC-002`).

#### Acceptance criteria

- [ ] All entities are immutable value objects (freezed or hand-written) with explicit types; no `dynamic` in public APIs (CLAUDE.md §6).
- [ ] Existence is an add-wins id set and mutable fields are LWW registers, so concurrent create-on-A and rate-on-B converge with both effects preserved (unit-tested).
- [ ] `ReviewLog` is append-only; a review event is never overwritten, so history survives merges (PRD-CO-201).
- [ ] Every repository method returns `Result<T, Failure>`; nothing throws across the package boundary.
- [ ] A card's `sourceRef` anchors to a stable stroke/opId, not a text offset, and survives page reflow/rename (PRD-CO-200, innovation-brief F06 risk).
- [ ] Round-trip persist → reopen reproduces every entity byte-for-byte; a schema-version bump migrates old rows.
- [ ] No card text or field values are logged; object ids log as opaque short hashes (CWE-532).

#### Technical notes

Entities and interface in `packages/sane_core/lib/src/study/` (pure Dart — MUST NOT import `package:flutter`, CLAUDE.md §3 DAG); drift-backed implementation via `SN-CORE-004`. Mutations flow through the op-log per `docs/architecture/document-model.md` §2 using the CRDT primitives from [SN-CORE-003](sync.md#sn-core-003). Follow ADR-0005 for object identity and ADR-0002 for the package boundary. Keep `ReviewState` numeric fields as `double`/`int` with documented units so the scheduler ([SN-STDY-004](study.md#sn-stdy-004)) and analytics ([SN-STDY-009](study.md#sn-stdy-009)) read them directly.

#### Security & privacy

Study objects are note content: plaintext only in memory, encrypted at rest and on sync via the envelope scheme (MASVS-STORAGE-1, MASVS-CRYPTO-2, CWE-311, OWASP-A02, ADR-0007). No field value is ever logged (MASVS-PRIVACY-3, CWE-532). No network. Validate inputs (bounded string lengths, id shape) before persisting to avoid unbounded storage cost.

#### UX notes

No direct UI. The model must expose the fields the review ([SN-STDY-005](study.md#sn-stdy-005)), analytics ([SN-STDY-009](study.md#sn-stdy-009)) and graph ([SN-STDY-015](study.md#sn-stdy-015)) surfaces need — new/learning/due counts, per-subject rollups, and link endpoints — so those screens render across all 17 looks without extra queries.

#### Test plan

Unit: `packages/sane_core/test/study/study_model_test.dart` (immutability, equality, JSON round-trip), `study_crdt_test.dart` (add-wins existence, LWW field convergence, append-only `ReviewLog`, concurrent create/rate merge), `study_migration_test.dart` (schema bump). No widget/golden (pure Dart).

#### Dependencies

[SN-CORE-002](storage.md#sn-core-002) (entities/op-log), [SN-CORE-003](sync.md#sn-core-003) (CRDT primitives).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-003

<a id="sn-stdy-003"></a>

**Create flashcards from handwriting and lasso with ink face and OCR text layer**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, ocr-hwr, ai |
| Size | L |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002), [SN-ED-004](editor.md#sn-ed-004), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

The signature study move — and a category-defining feature no note app ships (`docs/product/innovation-brief.md` F09, Part 4) — is turning handwriting directly into a flashcard whose *face is the original ink*, not a lossy text conversion. PRD-CO-200 requires the user to lasso a Q/A region or highlight terms and create cards whose front renders the handwritten region, with an optional OCR text layer for search and TTS; PRD-CO-152 requires the same cards to link back to their source ink. This is the feature students currently hack together with NotesAnkify/RemNote, which proves the demand and that no native tool does it end-to-end (`research/user-pain-points-and-market-gaps.md` idea #10). This issue delivers the *creation* path; scheduling ([SN-STDY-004](study.md#sn-stdy-004)) and review ([SN-STDY-005](study.md#sn-stdy-005)) consume what it produces.

#### Scope

**In:** a 'Make card' action on a lasso selection (from [SN-ED-004](editor.md#sn-ed-004)) and on a highlighted term; a card composer that (a) captures the selected stroke group as the card face via a content-addressed reference (never a re-raster that loses vectors), (b) lets the user split front/back (e.g. two lassoed regions, or one region + typed answer), (c) attaches an OCR text layer for the face using the on-device recogniser (`SN-HWR-001`) so the card is searchable/readable by TTS, (d) writes a `Flashcard` with `sourceRef` to the source page/stroke/opId, and (e) an optional 'Draft with Sage' shortcut that proposes front/back text from the recognised region (`SN-AI-001`, PRD-CO-152), always shown for correction and never auto-committed.

**Out:** the scheduler ([SN-STDY-004](study.md#sn-stdy-004)); review UI ([SN-STDY-005](study.md#sn-stdy-005)); decks/sets ([SN-STDY-006](study.md#sn-stdy-006)); quiz generation ([SN-STDY-007](study.md#sn-stdy-007)); the recogniser itself (`SN-HWR-001`); the AI generator internals (`SN-AI-001`).

#### Acceptance criteria

- [ ] A card created from lassoed ink renders the original handwriting on its front (vector, not a blurred raster) and preserves colour/pressure fidelity (PRD-CO-200).
- [ ] The same card is found by searching its OCR text (PRD-CO-200) and its OCR text is available to TTS/accessibility.
- [ ] Tapping the card's source affordance jumps to the exact source page and highlights the source strokes (PRD-CO-152/202).
- [ ] Raw ink is never mutated or destroyed by card creation; the card references it (ADR-0016 non-destructive rule).
- [ ] 'Draft with Sage' shows the recognised/proposed text for edit before commit; declining still creates an ink-only card; low-confidence OCR is flagged (PRD-CO-154).
- [ ] With cloud AI off (default), card creation and OCR run fully on-device; no network call fires (PRD-CO-001, MASVS-NETWORK-1).
- [ ] Card composer renders across all 17 looks + dark mode; controls are 44 pt / 48 dp and keyboard-reachable on web; ink face carries the OCR text as its accessible label (PRD-CO-310).

#### Technical notes

Creation flow in `app/lib/features/study/card_composer.dart` reading the lasso selection from the editor selection model ([SN-ED-004](editor.md#sn-ed-004)) and writing a `Flashcard` via the study repository ([SN-STDY-002](study.md#sn-stdy-002)). The card face references the stroke-group id (content-addressed) so `sane_render` can composite it at review time — reuse the render path rather than snapshotting a bitmap. OCR via the `InkRecognizer`/`ImageOcr` adapters in `sane_ml` (ADR-0016); AI drafting via `TextGenerator` guided generation. Keep the `sourceRef` an opId/stroke anchor per `document-model.md` (never a text offset — innovation-brief F06 risk). Tokens only (`docs/design/design-system.md`).

#### Security & privacy

OCR text and card content are note content: stored encrypted, never logged (MASVS-STORAGE-1, MASVS-PRIVACY-3, CWE-532). On-device recognition is the privacy control — the cloud path stays disabled unless a per-request opt-in with the data-leaves-device banner is taken (PRD-CO-001/165/166, MASVS-NETWORK-1). AI drafting inherits the prompt-injection isolation for note content fed to the model (PRD-CO-170).

#### UX notes

Hang the 'Make card' action off the lasso selection bar alongside 'Convert to text'/'Solve math' (`docs/design/screens-and-flows.md` §7.4). The composer is a bottom sheet on phone, a side panel on tablet (narrow-class collapse). No dedicated study screen exists in the design mock, so implement the decisive default and leave a `// DESIGN-OPEN` marker (CLAUDE.md §9). Show a small 'on-device' indicator; light the data-leaves-device banner only on a consented cloud draft. Empty/low-confidence OCR shows an editable, flagged field, never a silent wrong answer.

#### Test plan

Widget: `app/test/features/study/card_composer_test.dart` (lasso → card, front/back split, source jump, decline-AI still creates ink card, low-confidence flag). Golden: `card_face_looks_test.dart` (ink face across looks + dark). Integration: `app/integration_test/study_card_creation_test.dart` (create from ink, search finds it by OCR, airplane-mode has no network). Unit: OCR-attach mapping in `sane_ml` mock.

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (model), [SN-ED-004](editor.md#sn-ed-004) (lasso selection), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (OCR); soft: [SN-AI-001](ai.md#sn-ai-001) (AI drafting).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-004

<a id="sn-stdy-004"></a>

**Implement the FSRS spaced-repetition scheduler with SM-2 fallback, on-device**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | study |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Spaced repetition is only useful if the scheduling is correct, so this issue implements the open, modern **FSRS** algorithm as the default scheduler with **SM-2** as a fallback/option, computed entirely on-device (PRD-CO-201). FSRS and SM-2 are open algorithms (`innovation-brief.md` F09 recommends reusing a proven FSRS implementation rather than inventing scheduling — scheduling correctness is the top risk). Review state is CRDT-synced (PRD-CO-201, [SN-STDY-002](study.md#sn-stdy-002)), so the scheduler must be a pure function of `(ReviewState, rating, now)` producing a new `ReviewState` — deterministic, side-effect-free, and identical on every device so two devices that see the same review history compute the same due date. This is the engine [SN-STDY-005](study.md#sn-stdy-005) (review) and [SN-STDY-009](study.md#sn-stdy-009) (analytics) build on.

#### Scope

**In:** a pure-Dart `Scheduler` interface in `sane_core` with an `Fsrs` implementation (current FSRS weights as a documented, versioned constant vector; the four-grade Again/Hard/Good/Easy mapping; new/learning/review/relearning state machine; retrievability, stability and difficulty updates; configurable target retention and maximum interval; fuzz/jitter of intervals to avoid pile-ups) and an `Sm2` implementation (ease factor, interval, repetitions); selection of scheduler per study set or globally; a `nextDue(state, rating, now)` and a `retrievability(state, now)` API; deterministic behaviour under a fixed clock.

**Out:** the review UI ([SN-STDY-005](study.md#sn-stdy-005)); persistence of `ReviewState` ([SN-STDY-002](study.md#sn-stdy-002)); analytics rendering ([SN-STDY-009](study.md#sn-stdy-009)); any network parameter fetch.

#### Acceptance criteria

- [ ] `nextDue` is a deterministic pure function of `(state, rating, now)`; the same inputs yield the same output on any platform (unit-tested against FSRS reference vectors).
- [ ] Rating Again/Hard/Good/Easy moves cards through new → learning → review → relearning correctly and reschedules per FSRS (PRD-CO-201).
- [ ] The default FSRS weight vector is a named, documented constant with a `// TODO(verify)` note citing the current FSRS parameter source (PRD-CO-201 verify); swapping to SM-2 is a one-line policy change.
- [ ] Target retention and max interval are configurable and clamped to sane bounds; interval fuzz keeps two cards rated together from always co-occurring.
- [ ] The scheduler performs no I/O and no network; it is pure Dart with no `package:flutter` import.
- [ ] Given a synced review history from two devices, both compute an identical `due` (determinism proven in test).

#### Technical notes

`packages/sane_core/lib/src/study/scheduler.dart` (+ `fsrs.dart`, `sm2.dart`), pure Dart, `Result`-free hot path (it cannot fail — invalid input is a programmer error, use `assert`). Read/write the `ReviewState` fields defined in [SN-STDY-002](study.md#sn-stdy-002). Keep the weight vector and algorithm version stamped on `ReviewState` so a future parameter change can migrate. Reference FSRS/SM-2 open specs; do not invent scheduling (innovation-brief F09 risk). No ADR needed unless the parameter-storage approach changes the model — then update `document-model.md`.

#### Security & privacy

None beyond baseline: the scheduler is pure computation over local review state — no content, no network, no logging of card text or ratings (MASVS-NETWORK-1, MASVS-PRIVACY-3, CWE-532). Determinism also avoids leaking timing-based information across devices.

#### UX notes

No direct UI, but the scheduler defines the four rating buttons' semantics that [SN-STDY-005](study.md#sn-stdy-005) renders and the due-count that sets ([SN-STDY-006](study.md#sn-stdy-006)) and reminders ([SN-STDY-010](study.md#sn-stdy-010)) display, so the state names (new/learning/due) must be stable and human-labelled for all 17 looks.

#### Test plan

Unit: `packages/sane_core/test/study/fsrs_test.dart` (reference-vector conformance, state transitions, retrievability curve, determinism under fixed clock, config clamping, interval fuzz bounds) and `sm2_test.dart` (ease/interval progression). Cross-device determinism test replays a shared `ReviewLog` on two simulated clocks and asserts equal `due`.

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (ReviewState/ReviewLog model).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-005

<a id="sn-stdy-005"></a>

**Build review mode that runs inside note context with rate and open-source**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study |
| Size | L |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-003](study.md#sn-stdy-003), [SN-STDY-004](study.md#sn-stdy-004), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Students should revise inside their own notes, not export to Anki — the point of pen-driven spaced repetition is that the ink they trust is the thing they review (`docs/product/innovation-brief.md` F09; `research/user-pain-points-and-market-gaps.md` idea #10). PRD-CO-202 requires review to run inside note context: show the card, reveal the answer, rate Again/Hard/Good/Easy (feeding the scheduler [SN-STDY-004](study.md#sn-stdy-004)), and offer 'open source page' to see the card in situ. This is the daily loop that makes the whole study epic ([SN-STDY-001](study.md#sn-stdy-001)) worth building; it composites the ink face from [SN-STDY-003](study.md#sn-stdy-003) and reschedules through [SN-STDY-004](study.md#sn-stdy-004).

#### Scope

**In:** a review session screen driven by a queue of due cards (from a set or a notebook): render the card front (handwritten ink face composited via `sane_render`, or typed), a reveal control, the answer (back), the four rating buttons wired to the scheduler, a running counter of new/learning/due remaining, an undo-last-rating, a session summary at the end, and an 'open source page' affordance that jumps to the card's `sourceRef` and highlights the source strokes (PRD-CO-202); keyboard shortcuts on web (space to reveal, 1–4 to rate); Read-Aloud of the card's OCR/typed text via the accessibility reading pipeline.

**Out:** the scheduler itself ([SN-STDY-004](study.md#sn-stdy-004)); card creation ([SN-STDY-003](study.md#sn-stdy-003)); set/deck selection UI ([SN-STDY-006](study.md#sn-stdy-006)); quiz mode ([SN-STDY-007](study.md#sn-stdy-007)); analytics ([SN-STDY-009](study.md#sn-stdy-009)); reminders ([SN-STDY-010](study.md#sn-stdy-010)).

#### Acceptance criteria

- [ ] The session presents due cards in scheduler order, reveals the back on demand, and rating a card advances the queue and reschedules via [SN-STDY-004](study.md#sn-stdy-004) (PRD-CO-202).
- [ ] 'Open source page' jumps to the exact source page and highlights the source stroke group (PRD-CO-202/152).
- [ ] A handwritten card's front renders as vector ink (not a blurred raster) and matches the source fidelity.
- [ ] The remaining new/learning/due counters update live and the end-of-session summary shows counts and next-due.
- [ ] Undo restores the previous card and its pre-rating `ReviewState`; the review is idempotent on repeat (no double-log).
- [ ] Web keyboard shortcuts (space reveal, 1–4 rate) work and focus never traps; buttons are 44 pt / 48 dp with non-colour rating cues (WCAG 1.4.1, 2.1.1).
- [ ] Renders across all 17 looks + dark mode; runs fully offline with no network call (MASVS-NETWORK-1).

#### Technical notes

`app/lib/features/study/review_session.dart` + a `reviewSessionProvider` (Riverpod) that pulls the due queue from the study repository ([SN-STDY-002](study.md#sn-stdy-002)), applies ratings via the scheduler ([SN-STDY-004](study.md#sn-stdy-004)), and appends to `ReviewLog`. Composite the ink face through the existing render path (reference the stroke-group id, do not snapshot). 'Open source page' uses go_router deep navigation to the page + stroke highlight. Components from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003)); no business logic in `build` (CLAUDE.md §6). Reading-aloud reuses the accessibility reading mode (PRD-CO-336).

#### Security & privacy

None beyond baseline: review runs over local encrypted study objects; card text and ratings are never logged (MASVS-PRIVACY-3, CWE-532). No network egress from a review session (MASVS-NETWORK-1). No new stored asset or trust boundary.

#### UX notes

The design mock has no dedicated review screen, so implement the decisive default (full-screen focused card, calm reveal, four rating chips) and leave a `// DESIGN-OPEN` marker (CLAUDE.md §9); use only tokens (`docs/design/tokens.json`) and match the app's calm tone (`screens-and-flows.md` §16). Reduce-motion turns the reveal/advance into a cross-fade. Empty state ('nothing due — you're caught up') is a first-class, encouraging screen, never an error. Rating buttons pair colour with label/shape (Again/Hard/Good/Easy) for colour-blind users (PRD-CO-311/335).

#### Test plan

Widget: `app/test/features/study/review_session_test.dart` (queue order, reveal, rate advances + reschedules, undo restores state, counters, empty state, web keyboard shortcuts). Golden: `review_card_looks_test.dart` across looks + dark. Integration: `app/integration_test/study_review_flow_test.dart` (create card → review → open source page highlights strokes → offline no-network).

#### Dependencies

[SN-STDY-003](study.md#sn-stdy-003) (cards + ink face), [SN-STDY-004](study.md#sn-stdy-004) (scheduler), [SN-DS-003](design-system.md#sn-ds-003) (controls).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-006

<a id="sn-stdy-006"></a>

**Build study sets that group cards across notebooks with new/learning/due counts**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002), [SN-STDY-004](study.md#sn-stdy-004), [SN-LIB-001](library.md#sn-lib-001) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-STORAGE-1`, `CWE-532`, `OWASP-A01` |
| Extra labels | agent-ready |

#### Context

Revision rarely maps to a single notebook — a student preparing for a Physics exam wants every 'Waves' card regardless of which notebook it lives in. PRD-CO-203 requires study sets that group cards across notebooks (by subject, tag, or manual set) and start a session over a set with counts of new/learning/due. This is the organising layer between the cards ([SN-STDY-003](study.md#sn-stdy-003)) and the review session ([SN-STDY-005](study.md#sn-stdy-005)), and it is where the scheduler's state names ([SN-STDY-004](study.md#sn-stdy-004)) surface as live counts. Sets reuse the Library's subjects/tags (`SN-LIB-001`) rather than inventing a parallel taxonomy.

#### Scope

**In:** a `StudySet` management surface — create/rename/delete sets; define membership by subject, by tag, or by manual card selection (a set is a `StudySet` object from [SN-STDY-002](study.md#sn-stdy-002) whose membership is either a saved query or an explicit add-wins card-id set); a sets list showing each set's live new/learning/due counts computed via the scheduler ([SN-STDY-004](study.md#sn-stdy-004)); a 'Study' entry point that opens [SN-STDY-005](study.md#sn-stdy-005) scoped to the set; a default 'All due today' cross-notebook set; per-set scheduler choice (FSRS/SM-2) and target retention.

**Out:** the review session UI ([SN-STDY-005](study.md#sn-stdy-005)); card creation ([SN-STDY-003](study.md#sn-stdy-003)); quiz mode ([SN-STDY-007](study.md#sn-stdy-007)); export/import of sets ([SN-STDY-011](study.md#sn-stdy-011)/[SN-STDY-012](study.md#sn-stdy-012)); the Library tags/subjects source (`SN-LIB-001`); analytics ([SN-STDY-009](study.md#sn-stdy-009)).

#### Acceptance criteria

- [ ] Creating a 'Physics — Waves' set by subject/tag draws cards from multiple notebooks (PRD-CO-203).
- [ ] Each set shows correct live new/learning/due counts derived from the scheduler; counts update when cards are rated or added.
- [ ] Query-based sets update automatically as matching cards are created/retagged; manual sets persist explicit membership across close/reopen.
- [ ] 'Study' launches the review session scoped to exactly the set's cards, in scheduler order.
- [ ] Sets are per-profile: a set cannot include another profile's cards (OWASP-A01, unit-tested).
- [ ] The sets surface renders across all 17 looks + dark mode with 44 pt / 48 dp targets and keyboard reachability on web.

#### Technical notes

`app/lib/features/study/study_sets.dart` + repository queries in `sane_core` ([SN-STDY-002](study.md#sn-stdy-002)) that resolve set membership and fold `ReviewState` into counts using [SN-STDY-004](study.md#sn-stdy-004). Subject/tag criteria read the Library taxonomy (`SN-LIB-001`) — do not duplicate tags. Counts are computed reactively from the op-log stream (no polling). Enforce the `profileId` scope on every query (OWASP-A01) exactly as the Library repository does. Tokens only; components from `sane_ui`.

#### Security & privacy

Set names and membership are note metadata: encrypted at rest, never logged (MASVS-STORAGE-1, MASVS-PRIVACY-3, CWE-532). Per-profile scoping is an access-control boundary — a missing scope would let one local profile read another's cards (OWASP-A01, MASVS-PRIVACY-2). No network.

#### UX notes

Surface study sets from the Library home ([SN-LIB-002](library.md#sn-lib-002)) and the Search/Ask area as a 'Study' destination (`docs/design/screens-and-flows.md` §6/§11); no dedicated design frame exists, so implement the decisive default (a sets list with count chips and a big 'Study N due' button) and leave a `// DESIGN-OPEN` marker. Empty state guides the user to make their first card. Count chips pair number with label, not colour alone (PRD-CO-311).

#### Test plan

Widget: `app/test/features/study/study_sets_test.dart` (subject/tag/manual membership, live counts, launch scoped review, empty state). Unit: `packages/sane_core/test/study/set_membership_test.dart` (query resolution, count folding, per-profile isolation with two seeded profiles). Golden: `study_sets_looks_test.dart` across a light + dark look.

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (model), [SN-STDY-004](study.md#sn-stdy-004) (counts), [SN-LIB-001](library.md#sn-lib-001) (subjects/tags).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-007

<a id="sn-stdy-007"></a>

**Build quiz generation and quiz mode with grading and wrong-answer capture**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, ai |
| Size | L |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002), [SN-STDY-005](study.md#sn-stdy-005), [SN-AI-001](ai.md#sn-ai-001) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-3`, `MASVS-CODE-1`, `CWE-532`, `OWASP-A04` |
| Extra labels | agent-ready |

#### Context

Active recall is stronger when a student is tested, not just shown answers, so this issue adds quiz mode on top of the study loop. PRD-CO-153 requires Sage to produce multiple-choice / short-answer quizzes from selected content with an answer key and per-question source refs; PRD-CO-204 requires quiz mode to present generated quizzes, grade them, record scores into study analytics ([SN-STDY-009](study.md#sn-stdy-009)), and make wrong answers convertible to review cards ([SN-STDY-003](study.md#sn-stdy-003)). Generation runs on-device by default through the Sage (`SN-AI-001`, ADR-0016) with the same non-fabrication and citation guarantees as Ask-my-notes (PRD-CO-151). Quizzes are `Quiz` objects in the model ([SN-STDY-002](study.md#sn-stdy-002)).

#### Scope

**In:** a 'Make quiz' action over a selection, page, or set that calls the `TextGenerator` to produce a `Quiz` of MCQ/short-answer questions with an answer key and per-question `sourceRef` (guided/structured output, PRD-CO-153); a quiz-taking screen (present question, accept answer, immediate or end grading); a graded result with score and per-question source links; a 'turn wrong answers into cards' action that creates `Flashcard`s ([SN-STDY-003](study.md#sn-stdy-003)) for missed items; recording each `QuizAttempt` for analytics ([SN-STDY-009](study.md#sn-stdy-009)); the on-device/cloud consent + data-leaves-device banner for any cloud escalation.

**Out:** the generator model internals (`SN-AI-001`); the review scheduler ([SN-STDY-004](study.md#sn-stdy-004)); analytics rendering ([SN-STDY-009](study.md#sn-stdy-009)); export of quiz results ([SN-STDY-011](study.md#sn-stdy-011)).

#### Acceptance criteria

- [ ] A 10-question quiz generates with correct answers and per-question source links (PRD-CO-153).
- [ ] Taking a quiz produces a score and records a `QuizAttempt`; wrong answers can spawn review cards (PRD-CO-204).
- [ ] Every answer's source chip deep-links to the cited page/region; the generator never fabricates a citation (PRD-CO-151/153).
- [ ] With cloud AI off (default), generation runs on-device or degrades gracefully; a cloud escalation requires per-request consent and shows the data-leaves-device banner (PRD-CO-001/165/166).
- [ ] Generated content fed back into the note is inserted as editable, undoable, AI-attributed content (PRD-CO-158).
- [ ] Model output rendered in the quiz is sanitised — no auto-fetch of remote images/links from AI output (PRD-CO-172).
- [ ] Quiz screens render across all 17 looks + dark mode; controls meet 44 pt / 48 dp and keyboard operability on web.

#### Technical notes

`app/lib/features/study/quiz.dart` calling `sane_ml` `TextGenerator` (Apple guided generation / ML Kit Prompt API, ADR-0016 §4) to produce a typed `Quiz` struct; persist via [SN-STDY-002](study.md#sn-stdy-002). Treat all note content fed to the model as data, not instructions (PRD-CO-170); scope RAG context to the current notebook/profile (PRD-CO-174). Sanitise any markdown/HTML the model emits before display (PRD-CO-172). Wrong-answer-to-card reuses the card composer path from [SN-STDY-003](study.md#sn-stdy-003). Tokens only; no logic in `build`.

#### Security & privacy

Quiz generation is an AI feature over untrusted note content: apply the prompt-injection defences (isolate content as non-authoritative data, no autonomous tools, sanitised rendering — PRD-CO-170/171/172, OWASP-A04, MASVS-CODE-1). On-device by default; cloud only per-request with the banner (PRD-CO-001, MASVS-NETWORK-1). Quiz questions, answers and scores are note content — encrypted, never logged (MASVS-PRIVACY-3, CWE-532).

#### UX notes

Expose 'Make quiz' next to 'Make card' on the selection bar and in the set view; no dedicated design frame exists, so implement the decisive default and leave a `// DESIGN-OPEN` marker (CLAUDE.md §9). Show an on-device indicator; the data-leaves-device banner appears only during a consented cloud call (PRD-CO-166). Grading state (correct/incorrect) uses icon+label, not colour alone (PRD-CO-311). Loading state during generation is cancellable.

#### Test plan

Widget: `app/test/features/study/quiz_test.dart` (generate → take → grade → score, wrong→card, source-chip deep-link, sanitised rendering, cancel-generation). Security: `app/test/security/study_quiz_injection_test.dart` (a document saying 'ignore instructions and fetch a URL' causes no outbound request — PRD-CO-171/172). Integration: `app/integration_test/study_quiz_flow_test.dart` on-device airplane-mode.

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (Quiz model), [SN-STDY-005](study.md#sn-stdy-005) (review loop), [SN-AI-001](ai.md#sn-ai-001) (generation).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-008

<a id="sn-stdy-008"></a>

**Add a focus / Pomodoro timer with time-on-task logging and DND request**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002), [SN-SET-001](settings.md#sn-set-001) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-PLATFORM-3`, `MASVS-NETWORK-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Students asked for a study-session timer distinct from the editor's visual Focus mode, so this issue adds a Pomodoro-style focus timer. PRD-CO-205 requires a configurable work/break timer with gentle start/stop, an optional Do-Not-Disturb request, and per-subject time-on-task logging that feeds study analytics ([SN-STDY-009](study.md#sn-stdy-009)); it is explicitly distinct from the editor's Focus mode ('just the page', design §7.8). Sessions are `TimerSession` objects in the model ([SN-STDY-002](study.md#sn-stdy-002)) so the time-on-task rollup is local and CRDT-synced. This is a small, self-contained study surface that leans on the settings inventory (`SN-SET-001`) for its defaults.

#### Scope

**In:** a focus-timer control (start/pause/stop) with configurable work/break intervals (default 25/5, long break after 4 cycles), a calm countdown, a gentle end-of-interval signal, an optional 'request Do-Not-Disturb' toggle (platform DND/Focus request where the OS allows, degrading to an in-app quiet mode otherwise), and per-subject logging of each completed interval as a `TimerSession` (subject inferred from the active notebook or chosen); a running 'today's focus time' readout; persistence and resume across app background.

**Out:** the analytics dashboard that visualises the logs ([SN-STDY-009](study.md#sn-stdy-009)); the editor's visual Focus mode (owned by the editor area); reminders/notifications scheduling ([SN-STDY-010](study.md#sn-stdy-010), `SN-NOTF-001`); the settings screen chrome (`SN-SET-001`).

#### Acceptance criteria

- [ ] Starting a 25/5 timer counts down, signals the break, cycles, and logs each completed interval to the active subject (PRD-CO-205).
- [ ] Intervals are configurable and persisted per profile; the timer resumes correctly after the app is backgrounded/killed.
- [ ] The DND request is opt-in; when the OS denies or lacks it, the app falls back to an in-app quiet mode and says so (no silent failure).
- [ ] 'Today's focus time' reflects logged intervals and matches what analytics later reports.
- [ ] The timer surface renders across all 17 looks + dark mode; the pulsing/countdown animation stops under Reduce Motion (PRD-CO-317); controls are 44 pt / 48 dp and keyboard-reachable on web.
- [ ] No study data leaves the device (MASVS-NETWORK-1); nothing about the session is logged (CWE-532).

#### Technical notes

`app/lib/features/study/focus_timer.dart` + a `focusTimerProvider` (Riverpod) persisting `TimerSession`s via [SN-STDY-002](study.md#sn-stdy-002). Defaults read from the settings store (`SN-SET-001`). DND uses the platform Focus/Interruption APIs via a thin plugin call where available (guard by capability query, not platform check); degrade to in-app quiet. Use a monotonic wall-clock so pauses/backgrounding are accounted correctly. Tokens only; no logic in `build`.

#### Security & privacy

Time-on-task logs are personal behavioural data: stored encrypted, aggregated on-device only, never uploaded (MASVS-PRIVACY-1/3, MASVS-NETWORK-1, ADR-0011). Requesting DND touches a platform capability — request the minimum, honour denial (MASVS-PLATFORM-3). Nothing about a session is written to logs (CWE-532).

#### UX notes

Implement the decisive default (a compact timer accessible from the editor toolbar and the Library) and leave a `// DESIGN-OPEN` marker since the design mock lacks a focus-timer frame (CLAUDE.md §9); keep the tone calm (`screens-and-flows.md` §16), tokens only. Reduce-motion disables the countdown ring animation and pulse (PRD-CO-317). The end-of-interval signal respects system sound/vibration settings and never flashes > 3x/s (PRD-CO-317).

#### Test plan

Widget: `app/test/features/study/focus_timer_test.dart` (countdown with fixed clock, cycle/break transitions, config persistence, resume after background, DND-denied fallback, reduce-motion). Unit: `timer_session_log_test.dart` (per-subject interval logging correctness). Golden: `focus_timer_looks_test.dart` light + dark.

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (TimerSession model), [SN-SET-001](settings.md#sn-set-001) (timer defaults/settings).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-009

<a id="sn-stdy-009"></a>

**Build local-only study progress analytics: retention, streaks, time-per-subject**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002), [SN-STDY-004](study.md#sn-stdy-004), [SN-STDY-008](study.md#sn-stdy-008) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Students stay motivated when they can see progress, but that insight must never become a telemetry leak. PRD-CO-206 requires study analytics that show retention, streak and time-per-subject, computed on-device from local data only, with nothing uploaded (telemetry stays opt-in and on-device-aggregated, Locked Decision 8, ADR-0011 `docs/adr/0011-telemetry-and-diagnostics.md`). This surface reads the review history and scheduler state ([SN-STDY-002](study.md#sn-stdy-002)/[SN-STDY-004](study.md#sn-stdy-004)) and the focus-timer logs ([SN-STDY-008](study.md#sn-stdy-008)) and turns them into a private dashboard that renders in airplane mode. It closes the loop for the study epic ([SN-STDY-001](study.md#sn-stdy-001)): create cards, review them, and see whether it is working — all local.

#### Scope

**In:** an analytics view computing, from local objects only — review retention (% correct / true-retention estimate from the scheduler), a daily study streak, cards reviewed/added over time, per-subject time-on-task (from `TimerSession`), due-forecast (cards coming due per day), and quiz score trends ([SN-STDY-007](study.md#sn-stdy-007)); charts rendered per the dataviz conventions; a date-range selector; an explicit, clearly-labelled note that these numbers never leave the device.

**Out:** the raw model/queries ([SN-STDY-002](study.md#sn-stdy-002)); the scheduler math ([SN-STDY-004](study.md#sn-stdy-004)); the timer that produces logs ([SN-STDY-008](study.md#sn-stdy-008)); any crash/telemetry pipeline (`SN-TEL-001`); export of stats ([SN-STDY-011](study.md#sn-stdy-011)).

#### Acceptance criteria

- [ ] Retention, streak, cards-over-time, per-subject time, due-forecast and quiz-score trend all render from local data (PRD-CO-206).
- [ ] Analytics render fully in airplane mode; a network capture during the view shows no request carrying study data (PRD-CO-206, MASVS-NETWORK-1).
- [ ] The streak logic is correct across day boundaries, timezone changes and DST (unit-tested with fixed clocks).
- [ ] Charts are accessible: each has a text alternative / data table equivalent, meets contrast in all 17 looks, and does not encode meaning by colour alone (PRD-CO-310/311/312).
- [ ] The view renders across all 17 looks + dark mode; reduce-motion disables chart entrance animation (PRD-CO-317).
- [ ] No stat value or subject name is written to logs (CWE-532).

#### Technical notes

`app/lib/features/study/analytics.dart` computing aggregates from the study repository ([SN-STDY-002](study.md#sn-stdy-002)) and scheduler retrievability ([SN-STDY-004](study.md#sn-stdy-004)); charts follow the project dataviz palette/tokens (`docs/design/tokens.json`, dataviz guidance) and render as accessible SVG/CustomPaint with a data-table fallback. All computation is on-device; do not add any analytics SDK (CLAUDE.md §7.4). Aggregation runs off the UI isolate if a large history makes it heavy. Tokens only; no logic in `build`.

#### Security & privacy

Study analytics are the exact data a privacy-first app must not exfiltrate: computed and aggregated on-device, never uploaded, no analytics SDK linked (MASVS-NETWORK-1, MASVS-PRIVACY-1/4, ADR-0011). Values are note-derived content and are never logged (MASVS-PRIVACY-3, CWE-532). This surface is a proof point for the 'provable privacy' story (innovation-brief F18) — the visible copy states the numbers stay on-device.

#### UX notes

Implement the decisive default (a calm stats page reachable from the study home) and leave a `// DESIGN-OPEN` marker; the design mock has no analytics frame (CLAUDE.md §9). Follow the dataviz skill for chart form/colour and provide light + dark palettes that pass contrast in every look. Empty state ('review a few cards to see your progress') is encouraging, not an error. Every chart carries an accessible summary and a screen-reader-navigable data table (PRD-CO-310/321).

#### Test plan

Unit: `app/test/features/study/analytics_compute_test.dart` (retention, streak across DST/timezone, per-subject rollups, due-forecast). Widget: `analytics_view_test.dart` (renders charts, empty state, data-table fallback). Golden: `analytics_looks_test.dart` across looks + dark. Security: assert no network egress during the view (`app/test/security/study_no_egress_test.dart`).

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (review data), [SN-STDY-004](study.md#sn-stdy-004) (retention), [SN-STDY-008](study.md#sn-stdy-008) (time-on-task).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-010

<a id="sn-stdy-010"></a>

**Add study and review-due reminders via local notifications**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-004](study.md#sn-stdy-004), [SN-STDY-006](study.md#sn-stdy-006), [SN-NOTF-001](notifications.md#sn-notf-001) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `CWE-200`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Spaced repetition only works if the student comes back on the day a card is due, so this issue schedules local reminders. The scheduler ([SN-STDY-004](study.md#sn-stdy-004)) knows when cards fall due and the focus timer/sets know study intent, so reminders nudge the user to review — delivered entirely through the on-device local-notification transport (`SN-NOTF-001`, PRD-03 `NOTIF`) with no server and no content in the payload. This complements the widget's 'today's classes/reminders' surface (PRD-CO-271) while respecting guest mode and lock state (PRD-CO-277). The class-timetable reminder source (manual timetable vs calendar import) is a pending maintainer decision (CLAUDE.md §13) and is scoped out here so this issue stays agent-ready on the well-defined review-due path.

#### Scope

**In:** scheduling a local notification when a study set has cards due (a daily 'N cards due in <set>' reminder at a user-chosen time), an optional focus-session reminder, per-set opt-in and a global on/off in settings; rescheduling on review (recompute next-due), on app launch, and on timezone change; tapping a reminder deep-links into the scoped review session ([SN-STDY-005](study.md#sn-stdy-005)); honouring OS notification permission (request minimally, degrade gracefully if denied); lock-state-safe content (no card text on the lock screen).

**Out:** the local-notification transport/permission plumbing (`SN-NOTF-001`); class/timetable reminders and their schedule source (needs-decision, CLAUDE.md §13 — referenced, not built); shared-notebook activity notifications (PRD-CO-111/114); push infrastructure (there is none — local only).

#### Acceptance criteria

- [ ] When a set has cards due, a reminder is scheduled for the user's chosen time and tapping it opens that set's review session (PRD-CO-202/205).
- [ ] Reminders reschedule correctly after a review, an app relaunch, and a timezone/DST change (no duplicate or missed fire).
- [ ] Reminders are opt-in per set and globally; with notifications denied, the app degrades to an in-app due badge and explains, never silently failing.
- [ ] The notification payload contains no card text or note content — only a count and a set name the user can suppress; nothing sensitive shows on a locked device (PRD-CO-277, CWE-200).
- [ ] Guest mode works: reminders function with no account and no network (PRD-CO-002, MASVS-NETWORK-1).
- [ ] Settings entries render across all 17 looks + dark mode with 44 pt / 48 dp targets and keyboard reachability on web.

#### Technical notes

`app/lib/features/study/reminders.dart` computing due windows from the scheduler ([SN-STDY-004](study.md#sn-stdy-004)) and set counts ([SN-STDY-006](study.md#sn-stdy-006)), then scheduling via the `SN-NOTF-001` notification service (no direct plugin calls here). Store reminder preferences in the settings store. Deep-link via go_router to the scoped review route. Keep payloads content-free (a count + optional set label the user can hide); respect the lock/biometric gate before revealing content on open (PRD-CO-277). For the class-reminder source leave a `// NEEDS-DECISION` marker linking CLAUDE.md §13.

#### Security & privacy

Local notifications can leak content onto a lock screen, so payloads carry no card text or note content (CWE-200, MASVS-PRIVACY-2/3, PRD-CO-114 analog). Request notification permission minimally and honour denial (MASVS-PLATFORM-3). No push service, no server, no network (MASVS-NETWORK-1). Reminder preferences and due data never logged (CWE-532).

#### UX notes

Add reminder controls to the study set view ([SN-STDY-006](study.md#sn-stdy-006)) and the Settings → Notifications section (`docs/design/screens-and-flows.md` §12); implement the decisive default and leave a `// DESIGN-OPEN` marker where the mock is silent (CLAUDE.md §9). Copy is gentle, not nagging (`screens-and-flows.md` §16). The denied-permission state clearly explains the in-app fallback. All controls tokenised and accessible.

#### Test plan

Unit: `app/test/features/study/reminders_schedule_test.dart` (due-window computation, reschedule on review/relaunch/timezone, no duplicate fire — fixed clocks). Widget: `reminders_settings_test.dart` (per-set + global opt-in, denied-permission fallback). Security: `app/test/security/reminder_payload_test.dart` (payload contains no note content — CWE-200). Integration: tap reminder → scoped review deep-link.

#### Dependencies

[SN-STDY-004](study.md#sn-stdy-004) (due dates), [SN-STDY-006](study.md#sn-stdy-006) (set counts), [SN-NOTF-001](notifications.md#sn-notf-001) (local notifications).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-011

<a id="sn-stdy-011"></a>

**Export study sets to CSV/Anki and a classroom-friendly printable handout**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002), [SN-STDY-006](study.md#sn-stdy-006), [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `CWE-532`, `CWE-22` |
| Extra labels | agent-ready |

#### Context

Portability is a trust feature — 'you can always leave' (Locked Decision, innovation-brief F14) — and teachers need study material in a form they can hand out. PRD-CO-207 requires flashcards, sets, review state, quizzes and timer logs to be exportable in `.sanenote` and to Anki-compatible/CSV for portability, and the study scope adds a classroom-friendly export. This issue delivers the study-specific serialisers and a printable handout on top of the general export framework (`SN-SHR-001`), running on-device (PRD-CO-017). The flashcard portability target (Anki `.apkg` vs CSV vs both) is an open maintainer question (PRD-04 §12 #6); this issue ships the well-defined CSV/TSV + Anki-plaintext path as the default and notes `.apkg` as a follow-up so it stays agent-ready.

#### Scope

**In:** exporting a study set / deck to CSV and TSV (term/definition, plus source-ref and OCR-text columns) and to Anki-importable tab-separated plain text (fronts/backs; handwritten faces flattened to PNG with OCR alt-text since Anki has no ink type); exporting the full study objects (cards, sets, review state) inside the `.sanenote` bundle via `SN-SHR-001`; a classroom-friendly printable handout (a paginated PDF of a set: question/answer or fill-in-the-blank layout, print-fidelity, with an answer key page) using the app's print/PDF export path (PRD-CO-021); streaming to disk with progress and cancel; running fully offline.

**Out:** the general export/print framework and `.sanenote` writer (`SN-SHR-001`); import ([SN-STDY-012](study.md#sn-stdy-012)); the `.apkg` (zip+sqlite) writer (follow-up, noted); sharing links/collaboration (`SN-COL-001`).

#### Acceptance criteria

- [ ] Exporting a set yields a CSV/TSV and an Anki-importable text file; re-importing ([SN-STDY-012](study.md#sn-stdy-012)) restores fronts/backs (PRD-CO-207).
- [ ] Handwritten card faces export as PNG with OCR text as alt-text/companion column so nothing is silently dropped (PRD-CO-018).
- [ ] The `.sanenote` export round-trips cards, sets and review state bit-for-bit via `SN-SHR-001` (PRD-CO-015/207).
- [ ] The classroom handout produces a paginated PDF (questions + separate answer key) at print fidelity, A4/Letter correct, ink not dark-inverted (PRD-CO-021/022).
- [ ] Export runs on-device, streams with a progress indicator, is cancellable (cancel leaves no partial file), and does not block the UI thread (PRD-CO-017).
- [ ] No card content is written to logs; exported file paths are confined and never derived unsanitised from card text (CWE-22/532).

#### Technical notes

Study serialisers in `app/lib/features/study/export/` (or a study export submodule) calling the general export/print pipeline from `SN-SHR-001`; CSV/TSV via a well-formed encoder (quote/escape correctly); Anki plaintext is tab-separated with an HTML-escaped body. Handwritten faces flatten via the existing render → PNG path with the card's OCR text attached as alt-text/metadata (PRD-CO-018). The handout reuses the PDF export/print path (PDFs keep original colours, PRD-CO-022). Do all work off the UI isolate under the export progress model (PRD-CO-017). Confine output paths (CWE-22).

#### Security & privacy

Exports contain note content: written only to a user-chosen destination via the OS share/save sheet, on-device, never through a Sane server (MASVS-NETWORK-1, MASVS-STORAGE-1). Card text is never logged (MASVS-PRIVACY-3, CWE-532). Sanitise/confine any path or filename derived from user content to prevent traversal (CWE-22). Alt-text is preserved for accessibility (PRD-CO-018).

#### UX notes

Expose 'Export set' from the set view ([SN-STDY-006](study.md#sn-stdy-006)) offering CSV/Anki/PDF-handout/`.sanenote`; implement the decisive default and leave a `// DESIGN-OPEN` marker (CLAUDE.md §9). The handout layout offers Q/A and fill-in-the-blank templates across all 17 looks (print uses light paper regardless of app theme, PRD-CO-022). Progress and cancel states are explicit; empty set is disabled with a hint. Format picker labels are accessible and keyboard-reachable.

#### Test plan

Unit: `app/test/features/study/export/csv_anki_export_test.dart` (CSV/TSV escaping, Anki tab format, handwritten→PNG+alt-text, round-trip with [SN-STDY-012](study.md#sn-stdy-012)). Widget: `export_sheet_test.dart` (format picker, progress, cancel leaves no partial). Golden: `handout_layout_looks_test.dart` (PDF handout Q/A + answer key). Integration: on-device export streams without UI jank.

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (study objects), [SN-STDY-006](study.md#sn-stdy-006) (sets), [SN-SHR-001](sharing-export.md#sn-shr-001) (export/print framework + `.sanenote` writer).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-012

<a id="sn-stdy-012"></a>

**Import study sets from Quizlet, Anki and CSV/TSV**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, sharing-export |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002), [SN-STDY-006](study.md#sn-stdy-006), [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Security controls | `MASVS-STORAGE-2`, `MASVS-CODE-4`, `MASVS-PLATFORM-3`, `MASVS-NETWORK-1`, `CWE-400`, `CWE-22`, `CWE-502`, `OWASP-A08` |
| Extra labels | agent-ready |

#### Context

Students arrive with decks they have already built, so importing them kills switching cost. PRD-CO-208 requires study sets to be importable from Quizlet and Anki and plain CSV/TSV (term/definition rows; Anki `.txt`/CSV and `.apkg` where feasible, media best-effort), complementing the export in [SN-STDY-011](study.md#sn-stdy-011). These files come from outside the app and are therefore hostile input: an `.apkg` is a ZIP containing a SQLite database and a media folder, and CSV/TSV can be malformed or enormous — all of which must be parsed defensively, off the UI isolate, under resource caps, into a *new* isolated study set (CLAUDE.md §7.8, `docs/security/secure-coding-checklist.md` §1). Imports run on-device (PRD-CO-079) and never overwrite existing data (PRD-CO-070).

#### Scope

**In:** import of CSV/TSV (configurable delimiter and column mapping term/definition/tags), Anki plain-text/CSV exports, Quizlet exports (its term/definition text export), and best-effort Anki `.apkg` (unzip → read the SQLite `notes`/`cards` tables → map fronts/backs; media best-effort); each import creates a new `StudySet` and its cards ([SN-STDY-002](study.md#sn-stdy-002)/[SN-STDY-006](study.md#sn-stdy-006)) and shows an import report of what was preserved vs approximated (PRD-CO-078); reachable from the study home, the OS share sheet/file-open, and web file drop (PRD-CO-070/274/275).

**Out:** the export serialisers ([SN-STDY-011](study.md#sn-stdy-011)); the general import framework/file handlers (`SN-SHR-001`, `SN-NOTF`/share-target); competitor *note* importers (Goodnotes/Notability/OneNote — PRD-CO-071..074); the recogniser (`SN-HWR-001`).

#### Acceptance criteria

- [ ] Importing a Quizlet/Anki/CSV export creates a study set with fronts/backs mapped correctly (PRD-CO-208).
- [ ] A malformed or oversized file fails **closed** into a user-safe error, parsed off the UI isolate, resource-capped (no decompression/CSV bomb), path-confined (no Zip Slip) — the input-validation checklist is met (CLAUDE.md §7.8, CWE-400/22).
- [ ] `.apkg` unzip enforces entry-count/size/ratio caps and canonicalises every entry path before extraction; the embedded SQLite is opened read-only with bounded queries (CWE-22/400/502).
- [ ] Import always creates a **new** set and never overwrites or appends to an existing one without explicit user choice (PRD-CO-070).
- [ ] An import report lists counts and any lossy conversions (unsupported media flattened/skipped, never silently dropped — PRD-CO-078).
- [ ] Import runs on-device with progress and cancel; no note bytes leave the device (PRD-CO-079, MASVS-NETWORK-1).
- [ ] The importer UI renders across all 17 looks + dark mode with accessible, keyboard-reachable controls.

#### Technical notes

Parsers in `app/lib/features/study/import/` run inside `Isolate.run` (never the UI isolate). CSV/TSV via a hardened decoder with row/cell/size caps; `.apkg` via a ZIP reader that caps entry count, per-entry and total uncompressed size, and compression ratio, and canonicalises/rejects `..`/absolute paths (Zip Slip, CWE-22); the embedded Anki SQLite is opened read-only with parameterised, bounded queries. Map into `StudySet`/`Flashcard` via [SN-STDY-002](study.md#sn-stdy-002). Validate type/MIME/size before decode; import into a new isolated set (checklist §1). Reuse the general import entry points from `SN-SHR-001`.

#### Security & privacy

Imported files are untrusted input: validate type/MIME/size/schema before use; cap resources before decode to defeat zip/CSV decompression bombs (CWE-400); canonicalise/confine every path from archive content (CWE-22, Zip Slip); open embedded databases read-only with bounded queries and avoid unsafe deserialisation (CWE-502, OWASP-A08); parse off the UI isolate and import into a new isolated set (CLAUDE.md §7.8, MASVS-STORAGE-2, MASVS-CODE-4). No third-party/cloud conversion — on-device only (PRD-CO-079, MASVS-NETWORK-1). Report, do not log, content.

#### UX notes

Expose 'Import study set' from the study home and via share-target/file-drop; implement the decisive default and leave a `// DESIGN-OPEN` marker (CLAUDE.md §9). Show a progress indicator and, on completion, the import report (PRD-CO-078). A hostile file yields a calm, specific error, never a crash. Column-mapping UI for CSV is accessible and keyboard-operable; all controls tokenised across looks.

#### Test plan

Unit: `app/test/features/study/import/csv_anki_import_test.dart` (column mapping, fronts/backs, tags). Fuzz/abuse: `app/test/security/apkg_import_fuzz_test.dart` (Zip Slip entry rejected, decompression-bomb capped, malformed SQLite fails closed, oversized CSV capped — CWE-22/400/502). Integration: `app/integration_test/study_import_flow_test.dart` (import creates new set, report shown, offline no-network). Golden: importer sheet light + dark.

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (model), [SN-STDY-006](study.md#sn-stdy-006) (sets), [SN-SHR-001](sharing-export.md#sn-shr-001) (import entry points/framework).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-013

<a id="sn-stdy-013"></a>

**Create backlinks from a selection, stroke group or page region to any anchor**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, ocr-hwr |
| Size | L |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-002](study.md#sn-stdy-002), [SN-HWR-001](ocr-hwr.md#sn-hwr-001), [SN-ED-004](editor.md#sn-ed-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-3`, `MASVS-PLATFORM-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

The clearest unserved intersection in the market is expressive ink *and* networked knowledge — Obsidian users beg to link handwriting and there is 'no good solution' (`docs/product/innovation-brief.md` F06, Part 4; `research/user-pain-points-and-market-gaps.md` gap #2). This issue delivers the link-creation half of that category-defining feature. PRD-CO-240 requires creating a link from a selected phrase (typed or handwritten, OCR-resolved), a stroke group, or a page region to another note/page/anchor, with a `[[` picker; PRD-CO-242 requires link targets over handwriting to be resolvable via on-device OCR so handwritten anchors are linkable and searchable. Links are CRDT `NoteLink` objects ([SN-STDY-002](study.md#sn-stdy-002)/PRD-CO-245); the panel ([SN-STDY-014](study.md#sn-stdy-014)) and graph ([SN-STDY-015](study.md#sn-stdy-015)) render what this creates.

#### Scope

**In:** a 'Link to…' action on a lasso selection ([SN-ED-004](editor.md#sn-ed-004)), a highlighted phrase, or a page region; a target picker (search notes/pages/anchors; typing `[[` in text offers the same picker, Notion/Obsidian pattern); creation of a `NoteLink` edge whose source anchor is a stable stroke-group/opId or text range and whose target is a note/page/anchor id; OCR resolution of a handwritten source phrase into a searchable, linkable anchor via `SN-HWR-001`; link integrity across renames/moves/CRDT merges (anchor to stable ids, never text offsets); a subtle in-canvas affordance to follow a link.

**Out:** the backlinks panel ([SN-STDY-014](study.md#sn-stdy-014)); the graph view ([SN-STDY-015](study.md#sn-stdy-015)); tags/typed properties/smart views (Library, `SN-LIB-001`, PRD-CO-244); the recogniser (`SN-HWR-001`); Markdown wikilink export (`SN-SHR-001`/[SN-STDY-011](study.md#sn-stdy-011)).

#### Acceptance criteria

- [ ] Selecting handwriting and 'Link to…' creates a working jump to the target page (PRD-CO-240).
- [ ] Typing `[[` offers a page/anchor picker and inserts a working link (PRD-CO-240).
- [ ] A handwritten heading becomes a link target found via search after OCR resolution (PRD-CO-242).
- [ ] Links anchor to stable stroke/opIds (not text offsets) and survive page rename/move and a CRDT merge (innovation-brief F06 risk; PRD-CO-245).
- [ ] Following a link lands in a view/confirm context and never auto-mutates the target (CLAUDE.md §7.8 deep-link rule).
- [ ] With cloud AI off (default), OCR anchor resolution runs on-device (PRD-CO-001).
- [ ] The link affordance and picker render across all 17 looks + dark mode with 44 pt / 48 dp targets and keyboard reachability on web.

#### Technical notes

Link creation in `app/lib/features/study/linking/` writing `NoteLink` edges via the study repository ([SN-STDY-002](study.md#sn-stdy-002)); the picker reuses the search index (`SN-SRCH-001`) for target resolution. Handwritten anchors resolve via the `InkRecognizer` in `sane_ml` (`SN-HWR-001`, ADR-0016) and are indexed for search. Anchor to opIds/stroke-group ids per `docs/architecture/document-model.md` so links survive merges (never text offsets). The `[[` trigger hooks the text tool's input. Following a link uses go_router to a view context (no auto-mutation). Tokens only; no logic in `build`.

#### Security & privacy

Link text and anchors are note content: encrypted at rest, never logged (MASVS-STORAGE-1, MASVS-PRIVACY-3, CWE-532). Following a link is an in-app navigation, not a network fetch, and must land in view/confirm, never auto-mutate (MASVS-PLATFORM-1, CLAUDE.md §7.8). OCR resolution is on-device by default (PRD-CO-001). A link to externally-authored (shared/imported) content should be provenance-aware downstream (PRD-CO-175).

#### UX notes

Hang 'Link to…' off the selection bar next to 'Make card' (`docs/design/screens-and-flows.md` §7.4) and support `[[` in typed text; implement the decisive default and leave a `// DESIGN-OPEN` marker (CLAUDE.md §9). The picker is a searchable list (recent + matches); the in-canvas link affordance is subtle but discoverable and exposes an accessible name = its target title (PRD-CO-321). Reduce-motion keeps the follow transition a cross-fade.

#### Test plan

Widget: `app/test/features/study/linking/link_create_test.dart` (lasso→link, `[[` picker, follow lands in view, target search). Unit: `packages/sane_core/test/study/note_link_test.dart` (anchor stability across rename/move, CRDT merge convergence). Integration: `app/integration_test/backlink_create_test.dart` (handwritten heading → OCR anchor → searchable link, on-device). Golden: picker + affordance light + dark.

#### Dependencies

[SN-STDY-002](study.md#sn-stdy-002) (NoteLink model), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (OCR anchors), [SN-ED-004](editor.md#sn-ed-004) (selection).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-014

<a id="sn-stdy-014"></a>

**Build the bidirectional backlinks panel with context snippets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, search |
| Size | M |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-013](study.md#sn-stdy-013) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

A link is only half a knowledge graph — the value comes from seeing what points *back* at the page you are on. PRD-CO-241 requires backlinks to be bidirectional: each page shows a backlinks panel listing pages that link to it, with context snippets. This consumes the `NoteLink` edges created by [SN-STDY-013](study.md#sn-stdy-013) and inverts them, so linking A→B makes B's panel list A (PRD-CO-241). It is the everyday surface of the F06 knowledge-graph feature (`innovation-brief.md` Part 4) and the reading complement to the graph view ([SN-STDY-015](study.md#sn-stdy-015)).

#### Scope

**In:** a backlinks panel attached to a page/note showing every source that links to it, each row with the source page title, a short context snippet around the source anchor (OCR text for handwriting), and a jump-to-source; live updates as links are created/removed; a resolved/unresolved indicator for links whose target was deleted (tombstone); a count badge; open/collapse of the panel.

**Out:** link creation ([SN-STDY-013](study.md#sn-stdy-013)); the graph visualisation ([SN-STDY-015](study.md#sn-stdy-015)); tags/properties (Library); the search index internals (`SN-SRCH-001`).

#### Acceptance criteria

- [ ] Linking A→B makes B's backlinks panel list A with a context snippet (PRD-CO-241).
- [ ] The panel updates live when a link is added or removed (no manual refresh).
- [ ] Context snippets show OCR text for handwritten anchors and typed text for text anchors, truncated cleanly.
- [ ] Tapping a backlink jumps to the source page and highlights the source anchor (view/confirm, no mutation).
- [ ] A link whose target was deleted shows a clear unresolved/tombstone state, never a crash.
- [ ] The panel renders across all 17 looks + dark mode; rows are 44 pt / 48 dp, keyboard-navigable on web, and expose accessible names (PRD-CO-321).

#### Technical notes

`app/lib/features/study/linking/backlinks_panel.dart` querying the inverse of the `NoteLink` edge set from the study repository ([SN-STDY-002](study.md#sn-stdy-002)) via [SN-STDY-013](study.md#sn-stdy-013); snippets pull OCR/typed text around the anchor from the search index (`SN-SRCH-001`). The inverse index updates reactively from the op-log stream. Tombstoned targets render an unresolved row. Tokens only; no logic in `build`. Panel docks adaptively (side on tablet, sheet on phone).

#### Security & privacy

None beyond baseline: the panel renders local encrypted link/snippet data and must never log note titles, snippets or content (MASVS-PRIVACY-3, CWE-532). No network egress (MASVS-NETWORK-1). Following a backlink is in-app navigation to a view context, not a fetch.

#### UX notes

Implement the decisive default (a collapsible 'Linked references' panel like Obsidian/Roam) and leave a `// DESIGN-OPEN` marker since the design mock lacks a backlinks frame (CLAUDE.md §9); tokens only, calm tone. Empty state ('no backlinks yet') is informative, not an error. Reduce-motion keeps expand/collapse a fade. Snippets never encode meaning by colour alone (PRD-CO-311).

#### Test plan

Widget: `app/test/features/study/linking/backlinks_panel_test.dart` (A→B shows in B, live add/remove, snippet content, tombstone/unresolved, jump-to-source). Golden: `backlinks_panel_looks_test.dart` across a light + dark look. Integration: create link then assert inverse appears in the target's panel.

#### Dependencies

[SN-STDY-013](study.md#sn-stdy-013) (NoteLink creation + anchors).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-STDY-015

<a id="sn-stdy-015"></a>

**Build the knowledge graph view of notes and links with filtering**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | study, a11y |
| Size | L |
| SDLC | implementation |
| Parent | [SN-STDY-001](study.md#sn-stdy-001) |
| Depends on | [SN-STDY-013](study.md#sn-stdy-013), [SN-STDY-014](study.md#sn-stdy-014) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `CWE-532`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context

The payoff of linking handwriting is seeing the whole web of one's knowledge assemble itself — the Obsidian-style graph, but the nodes are your handwritten pages (`docs/product/innovation-brief.md` F06, Part 4). PRD-CO-243 requires a graph view that renders notes/pages as nodes and links as edges, supports filtering by subject/tag, and opens a node into the editor; nodes may be handwritten pages shown as thumbnail nodes. This visualises the `NoteLink` edges from [SN-STDY-013](study.md#sn-stdy-013) and complements the per-page backlinks panel ([SN-STDY-014](study.md#sn-stdy-014)). Because the ink canvas is opaque to assistive tech, the graph must also publish a parallel accessible structure (PRD-CO-321/330).

#### Scope

**In:** a force-directed (or tidy) graph of note/page nodes and link edges; pan/zoom; filter by subject/tag; node labels (title, optional handwritten thumbnail); tap/click a node to open it in the editor; hover/focus highlights a node's neighbourhood; performance culling so large graphs stay at 60 fps; a keyboard/screen-reader-navigable list representation of the same nodes/edges (parallel accessible tree, PRD-CO-330) as a first-class alternative, not an afterthought.

**Out:** link creation ([SN-STDY-013](study.md#sn-stdy-013)); the backlinks panel ([SN-STDY-014](study.md#sn-stdy-014)); tags/subjects source (Library `SN-LIB-001`); tag/property smart-views (PRD-CO-244, Library); infinite-canvas rendering internals (`SN-PG-003`).

#### Acceptance criteria

- [ ] The graph opens, is navigable (pan/zoom), and clicking a node opens that page in the editor (PRD-CO-243).
- [ ] Filtering by subject/tag shows only matching nodes/edges and updates live.
- [ ] Handwritten pages can render as thumbnail nodes without blocking the UI thread (thumbnails from the existing render cache).
- [ ] A large graph (hundreds of nodes) pans/zooms at 60 fps with no frame > 16.7 ms via culling/level-of-detail (Locked Decision 7).
- [ ] The graph has a keyboard- and screen-reader-navigable equivalent (list of nodes with their links and jump-to-node), meeting WCAG 2.2 AA (PRD-CO-321/330).
- [ ] Renders across all 17 looks + dark mode; edges/nodes meet contrast and do not encode meaning by colour alone (PRD-CO-311/312); reduce-motion disables the physics animation (PRD-CO-317).
- [ ] Renders fully offline; no node title or content is logged (MASVS-NETWORK-1, CWE-532).

#### Technical notes

`app/lib/features/study/graph/graph_view.dart` reading nodes from the note/page store and edges from the `NoteLink` set ([SN-STDY-002](study.md#sn-stdy-002)/[SN-STDY-013](study.md#sn-stdy-013)). Lay out with a lightweight force-directed algorithm computed off the UI isolate for large graphs; paint via `CustomPainter` in a `RepaintBoundary` with viewport culling and node level-of-detail to hold the perf budget (Locked Decision 7/8; cap node/edge processing to avoid unbounded cost, CWE-400). Thumbnails reuse the render cache (never re-raster on the UI thread). Emit `CustomPainterSemantics` / a parallel widget list for the accessible representation (PRD-CO-330). Tokens only.

#### Security & privacy

None beyond baseline: the graph renders local encrypted link/title data and must never log node titles or content (MASVS-PRIVACY-3, CWE-532). No network egress (MASVS-NETWORK-1). Bound layout/paint work to node/edge counts to avoid a self-inflicted resource-exhaustion stall on a pathological graph (CWE-400).

#### UX notes

Implement the decisive default (an Obsidian-style graph reachable from the study home / Search area) and leave a `// DESIGN-OPEN` marker since the design mock has no graph frame (CLAUDE.md §9); tokens only, both modes, every look. The accessible list view is a peer surface, not a fallback (PRD-CO-330). Reduce-motion freezes the layout to a static tidy graph (PRD-CO-317). Empty state ('link some notes to grow your graph') is encouraging. Node focus ring meets ≥ 3:1 contrast (PRD-CO-316).

#### Test plan

Widget: `app/test/features/study/graph/graph_view_test.dart` (render nodes/edges, filter by subject/tag, tap opens page, accessible-list navigation, empty state). Perf: `app/integration_test/graph_perf_test.dart` (pan/zoom a hundreds-node fixture at 60 fps via the perf harness). Golden: `graph_looks_test.dart` across a light + dark look. A11y: screen-reader navigation of the parallel list.

#### Dependencies

[SN-STDY-013](study.md#sn-stdy-013) (NoteLink edges), [SN-STDY-014](study.md#sn-stdy-014) (link data + snippets).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

