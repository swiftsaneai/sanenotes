# PRD-00 — Product Requirements Index

> Master index of the four Sane Notes product-requirement documents. Written for a future
> autonomous coding agent with zero context: use this to find which PRD owns a surface, how many
> requirements each carries, and what the **2026-09-13 competitor/design gap-closure pass** added.
>
> **Locked decisions** (stack, local-first zero-knowledge, document model, identity, on-device AI,
> perf budgets, MASVS/ASVS, privacy, i18n) govern every requirement below and are not restated here.
> **Design source of truth:** [`../design/screens-and-flows.md`](../design/screens-and-flows.md),
> [`../design/design-system.md`](../design/design-system.md), [`../design/tokens.json`](../design/tokens.json).
> **Research sources** (committed at `../research/sources/`) are cited inline in each PRD by short
> path (`research/<file>.md`); the competitor cross-map is [`../research/competitor-feature-matrix.md`](../research/competitor-feature-matrix.md).

---

## 1. The four PRDs

| PRD | Owns | ID scheme | Classification axis | Requirements |
|---|---|---|---|---|
| [**PRD-01 — Editor, Ink & Brushes**](prd-01-editor-ink-brushes.md) | Canvas & pages, ink capture, pens/brushes, highlighter, eraser, lasso/selection, shapes & rulers, text tool, images/stickers, layers, undo/redo, viewport tools, palette dock, keyboard & stylus/touch gestures | `PRD-ED-NNN` | RFC-2119 **level** + **platform** + **milestone (M0–M6)** | **173** |
| [**PRD-02 — Library, Documents, Media, Audio, Search & Recognition**](prd-02-library-documents-audio-search.md) | Library home & organisation (subjects/folders/tags/favourites/covers), notebook lifecycle & trash, templates & paper, PDF, images & media, audio (record/sync/transcribe), search, recognition (handwriting/OCR/math/shape), version history, multi-profile isolation, plan gating | `PRD-LB-NNN` | RFC-2119 **level** + **milestone (M1–M6)** | **115** |
| [**PRD-03 — Identity, Sync, Privacy, Settings & Billing**](prd-03-identity-sync-privacy-settings-billing.md) | Onboarding/login, guest mode, profiles, local storage & `.sanenote` format, backup/restore, cloud sync, E2EE keys, settings (full pref inventory), privacy dashboard, notifications, billing & student verification, telemetry, app/notebook lock, clipboard/screenshot protection, account deletion | `PRD-<AREA>-NNN` (14 areas) | **Priority P0/P1/P2** (RFC-2119 level inline, MUST-dominant) | **135** |
| [**PRD-04 — Sharing, Collaboration, Sane Sage AI, Study, A11y & i18n**](prd-04-sharing-collaboration-ai-study-a11y-i18n.md) | Sharing & export, competitor import, real-time collaboration & classroom rooms, Sane Sage AI (+ prompt-injection defences), study tools, backlinks & graph, widgets/shortcuts/share-target, accessibility (WCAG 2.2 AA), localisation, marketing/docs website & "try on web" | `PRD-CO-NNN` (area ranges) | RFC-2119 **level** + **feature-area milestone (M2–M8)** | **144** |
| | | | **Total** | **567** |

> **Why the axes differ.** PRD-01 and PRD-02 stamp an RFC-2119 level *and* a per-requirement milestone on
> every header. PRD-03 classifies by **Priority (P0/P1/P2)** — P0 = launch-blocking (M0–M1), P1 = v1.0, P2 =
> later — because identity/sync/billing work is gated by risk, not editor milestones; its RFC-2119 keywords are
> overwhelmingly **MUST**. PRD-04 stamps a level per requirement and assigns milestones by **feature area**
> (its §11.2 table), because collaboration/AI/a11y/i18n cut across milestones. The tables below use each PRD's
> native axis.

---

## 2. Requirement counts

### 2.1 PRD-01 — Editor, Ink & Brushes (173)

| Level | Count | | Milestone (first stamped) | Count |
|---|---|---|---|---|
| MUST | 76 | | M0 (SN-INK spike) | 6 |
| SHOULD | 69 | | M1 (Editor MVP) | 45 |
| MAY | 28 | | M2 (full pen kit + selection) | 55 |
| | | | M3 (PDF, canvas depth, layers) | 43 |
| | | | M4 (recognition & staging) | 9 |
| | | | M5 (stylus mastery) | 15 |

### 2.2 PRD-02 — Library, Documents, Media, Audio, Search & Recognition (115)

| Level | Count | | Milestone | Count |
|---|---|---|---|---|
| MUST | 76 | | M1 (local-first library MVP) | 36 |
| SHOULD | 32 | | M2 (PDF) | 19 |
| MAY | 7 | | M3 (audio) | 17 |
| | | | M4 (search + recognition + OCR) | 20 |
| | | | M5 (study/AI + template store) | 15 |
| | | | M6 (sync/sharing/history) | 8 |

> Excludes the `PRD-LB-042` **format-template placeholder** in §1.1 (documentation, not a requirement; the real
> `PRD-LB-042` is the notebook-thumbnail requirement).

### 2.3 PRD-03 — Identity, Sync, Privacy, Settings & Billing (135)

| Priority | Count | | Area | Count | | Area | Count |
|---|---|---|---|---|---|---|---|
| P0 (launch-blocking) | 33 | | `AUTH` | 18 | | `BILL` | 19 |
| P1 (v1.0) | 94 | | `SET` | 26 | | `SYNC` | 15 |
| P2 (later) | 8 | | `KEY` | 10 | | `STOR` | 8 |
| | | | `PRIV` | 7 | | `PROF` | 7 |
| | | | `LOCK` | 6 | | `LEAK` | 5 |
| | | | `BKP` | 4 | | `DEL` | 4 |
| | | | `NOTIF` | 4 | | `TEL` | 4 |

> RFC-2119 keyword: PRD-03 is **MUST-dominant** (the §7.1 preference inventory `PRD-SET-001…018` and nearly all
> security/sync/billing rows are MUST; a small tail is SHOULD/MAY). Priority is the authoritative axis. `SET`
> area count includes the 18 preference rows plus `PRD-SET-019…024`.

### 2.4 PRD-04 — Sharing, Collaboration, AI, Study, A11y & i18n (144)

| Level (approx.) | Count | | Feature area → milestone (§11.2) |
|---|---|---|---|
| MUST | 123 | | Export foundations (PDF/PNG/SVG/MD/JSON/`.sanenote`) → **M2**, hardened M6/M7 |
| SHOULD | 16 | | PDF import → M2; competitor importers → **M6** |
| MAY | 5 | | Sharing links/roles, real-time collab, classroom rooms, study tools, backlinks & graph → **M6** |
| | | | Sane Sage AI: recognition **M3** → assistant **M6** |
| | | | Widgets/shortcuts/share-target → **M5** (phones)/M6 |
| | | | Accessibility & localisation → cross-cutting, audited **M7** |
| | | | Website & "try on web" → **M8** |

> Level is read from each requirement's normative verb. ~18 capability rows and the WCAG-mapped a11y rows state
> the requirement without an explicit modal; those are classified by intent (WCAG-AA rows and core-capability
> rows → MUST; AI capability rows → SHOULD). The **MUST** count folds in 5 **MUST NOT** constraints (e.g.
> PRD-CO-000/002 zero-knowledge, PRD-CO-171/172 no-autonomous-exfil). Treat 123/16/5 as ±3 exact.

---

## 3. Gaps closed by this pass (2026-09-13)

Auditing the five competitor teardowns (`goodnotes-userguide-inventory.md`, `notability.md`, `onenote.md`,
`apple-notes-freeform.md`, `samsung-notes-nebo-other.md`), the competitor feature matrix, and the design
(`screens-and-flows.md`) against all four PRDs surfaced **38 competitor/design features not covered by any
existing requirement**. Each was appended to the correct PRD (new section, ID sequence continued). None were
already present; the design's 20 open questions were already fully resolved across PRD-01/02/03, so all 38
closures are **competitor-parity** gaps.

### 3.1 PRD-01 — Editor (14 new: `PRD-ED-179…192`; §20)

| ID | Gap closed | Level·Milestone | Set by |
|---|---|---|---|
| PRD-ED-179 | Markdown-on-type shortcuts (`#`, `-`, `>`, ``` ``` ```) | SHOULD·M2 | Notion, Notability, Goodnotes, Apple Notes |
| PRD-ED-180 | Quote & callout blocks | SHOULD·M2 | Notability, Notion |
| PRD-ED-181 | Code block (monospace, per-block language, syntax) | SHOULD·M3 | Notability (26 langs), Goodnotes, Notion |
| PRD-ED-182 | Toggle / collapsible sections | SHOULD·M3 | Notion, Apple Notes |
| PRD-ED-183 | Insert date/time stamp | MAY·M2 | OneNote |
| PRD-ED-184 | Import custom fonts (hardened loader) | MAY·M3 | Notability, OneNote, Nebo |
| PRD-ED-185 | Group / ungroup selection | SHOULD·M2 | Notability |
| PRD-ED-186 | Circle-to-lasso pen gesture | SHOULD·M3 | Goodnotes |
| PRD-ED-187 | Handwriting refine / reflow (beautify, straighten, reorganize) | SHOULD·M4 | Apple Smart Script, Samsung, Goodnotes |
| PRD-ED-188 | Writing guideline aid ("handwriting help") | SHOULD·M2 | Samsung, Nebo |
| PRD-ED-189 | Tape / masking (active-recall) tool | SHOULD·M4 | Goodnotes Tape, Notability Tape |
| PRD-ED-190 | Freeform scenes (saved framed views) & present | SHOULD·M4 | Apple Freeform |
| PRD-ED-191 | Document tabs (multiple open notebooks) | SHOULD·M3 | Goodnotes tab bar |
| PRD-ED-192 | Novelty / effect pens (rainbow, glitter) | MAY·M5 | OneNote, Notability |

### 3.2 PRD-02 — Library/Documents/Recognition (13 new: `PRD-LB-380…392`; §19)

| ID | Gap closed | Level·Milestone | Set by |
|---|---|---|---|
| PRD-LB-380 | Predefined quick-tags + tagged-items roll-up | SHOULD·M4 | OneNote Find Tags, Apple Tag Browser |
| PRD-LB-381 | Convert page kind (paged ↔ freeform) | SHOULD·M3 | Goodnotes Convert-to-Whiteboard |
| PRD-LB-382 | Merge / combine PDFs & notebooks | SHOULD·M3 | Flexcil |
| PRD-LB-383 | Attachments / media browser (by type) | SHOULD·M4 | Apple Notes |
| PRD-LB-384 | Excerpt-to-note (drag PDF text/image → linked note) | SHOULD·M5 | Flexcil, LiquidText |
| PRD-LB-385 | Side-by-side multi-page PDF view (1/2/4-up) | MAY·M3 | Flexcil |
| PRD-LB-386 | Custom recognition dictionary | SHOULD·M4 | Goodnotes, Nebo |
| PRD-LB-387 | Handwriting spellcheck in your own style | SHOULD·M5 | Goodnotes, Apple, Samsung |
| PRD-LB-388 | Data detectors (phone/email/URL/date in ink & text) | MAY·M4 | Samsung Action icons |
| PRD-LB-389 | Video note capture & online-video embeds | MAY·M5 | OneNote, Goodnotes |
| PRD-LB-390 | Web clipper / read-it-later capture | MAY·M6 | OneNote Web Clipper |
| PRD-LB-391 | Email-to-import (ingest a PDF by email; **verify** infra) | MAY·M6 | Goodnotes Email-to-app |
| PRD-LB-392 | Whole-document translation (PDF/page) | SHOULD·M5 | Samsung, Nebo |

### 3.3 PRD-03 — Identity/Security (2 new: `PRD-LOCK-005…006`; §12)

| ID | Gap closed | Priority | Set by |
|---|---|---|---|
| PRD-LOCK-005 | **Per-notebook & per-folder lock** (biometric), composing with app/profile lock | P1 | Apple locked notes, Goodnotes, Notability, OneNote, Samsung — and this project's own matrix target ("v1 note lock") |
| PRD-LOCK-006 | Locked-content behaviour (search/preview/share exclusion; ciphertext backup; key-hierarchy recovery) | P1 | Apple, Goodnotes, OneNote |

### 3.4 PRD-04 — Sharing/Collab/AI/Study (9 new; §13)

| ID | Gap closed | Level·Milestone | Set by |
|---|---|---|---|
| PRD-CO-107 | Follow-a-collaborator (mirror a peer's view in a room) | SHOULD·M6 | Goodnotes, Notability |
| PRD-CO-115 | Mark pages/changes as seen (shared activity) | SHOULD·M6 | Goodnotes, OneNote |
| PRD-CO-160 | Action items / task extraction (AI) | SHOULD·M6 | Notability, Goodnotes, OneNote, Notion |
| PRD-CO-161 | URL/YouTube-to-note (transcript + summary) | MAY·M6 | Notability |
| PRD-CO-162 | Diagram / mind-map generation (AI) | MAY·later | Goodnotes, MarginNote |
| PRD-CO-163 | Equation graphing (2D/3D plots) | MAY·later | OneNote, Apple Math Notes |
| PRD-CO-040 | Publish note as public read-only web page | MAY·M8 | Notability Gallery, Notion Sites |
| PRD-CO-041 | Export to Word (.docx) / PowerPoint (.pptx) | MAY·later | OneNote, Samsung, Nebo, LiquidText |
| PRD-CO-208 | Import study sets from Quizlet/Anki/CSV | SHOULD·M6 | Goodnotes, Notability |

**Pass total: 38 new requirements** — PRD-01 +14, PRD-02 +13, PRD-03 +2, PRD-04 +9. New-requirement level mix:
SHOULD 25, MAY 11, P1 (PRD-03) 2.

---

## 4. Coverage notes for the implementing agent

- **Design coverage is complete.** All 20 open questions in `screens-and-flows.md` were already resolved by the
  PRDs (trash/rename/favourite → PRD-LB-039/060/065; audio scope → PRD-LB-212/220; shape scope → PRD-LB-308;
  image flow → PRD-LB-180; page ops → PRD-LB-142; freeform nav → PRD-LB-091; multi-profile isolation →
  PRD-PROF-004 / PRD-LB-350; "SS Cloud" naming → PRD-03 §0.4). This pass added **no** design-only requirements —
  every closure is a competitor-parity gap.
- **Deliberately deferred (not added), per the competitor matrix "later" bucket and locked scope:** macOS/Windows
  native clients, marketplace/pen-pack economy beyond `.sanepen` sharing, and Goodnotes-style external-LLM
  connectors (ChatGPT/Claude app). These are ecosystem/optimisation items, not v1–v2 parity gaps.
- **Cross-PRD dependencies to respect:** the Tape tool (PRD-ED-189) is an editor tool that also serves study
  (PRD-04 §5); handwriting refine/reflow (PRD-ED-187) is an editor action backed by PRD-02 §11 recognition;
  excerpt-to-note (PRD-LB-384) creates a backlink defined in PRD-04 §6; email-to-import (PRD-LB-391) and web
  publish (PRD-CO-040) are the only two additions needing infrastructure beyond the zero-server model and are
  both marked **MAY / verify**.
- **Reproducing these counts:** headers match `^\*\*PRD-ED-` (PRD-01) and `^> \*\*PRD-LB-…· (MUST|SHOULD|MAY) ·`
  (PRD-02, excluding the §1.1 placeholder); PRD-03 priorities are the `| P0/P1/P2 |` column plus the 18
  Pr-less preference rows (default P1 per §0.2); PRD-04 defined requirements are the `| **PRD-CO-###** |` table
  rows plus the five `**PRD-CO-00X —**` principles (§0.2 range labels like `PRD-CO-069` are not requirements).

---

## 5. Change log

| Date | Change |
|---|---|
| 2026-09-13 | Index created. Competitor/design gap-closure pass appended 38 requirements (PRD-01 §20, PRD-02 §19, PRD-03 §12 rows, PRD-04 §13). Baseline totals: PRD-01 159→173, PRD-02 102→115, PRD-03 133→135, PRD-04 135→144; grand total 567. |
