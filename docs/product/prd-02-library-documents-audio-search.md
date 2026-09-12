# PRD-02 — Library, Documents, Media, Audio, Search & Recognition

> Status: draft v1 (2026-09-13). Owner: Jatin Kumar Singh.
> Scope of this PRD: everything **outside the live ink surface** that makes a note usable —
> the **library** (finding, organising, and managing notebooks), **paper & templates**,
> **PDF**, **images & media**, **audio** (record / sync / transcribe), **search**,
> **recognition** (handwriting→text, OCR, math, shapes), and **version history**.
> The pen/canvas/tool UX itself is specified in the editor PRD (see
> [Cross-references](#18-cross-references)).

This document is written for an autonomous coding agent with zero prior context. Every
requirement is testable. Where a decision could not be verified against a source it is marked
**verify**. Do not invent platform APIs; the named packages/APIs are traceable to the research
sources cited inline.

---

## 1. How to read this document

### 1.1 Requirement format

Every requirement has a stable ID `PRD-LB-###` (LB = "library & beyond"). IDs are permanent —
never renumber; deprecate instead. Format:

> **PRD-LB-042 · MUST · M2** — <one-sentence normative requirement.>
> Notes / acceptance criteria as sub-bullets. _Refs: research/goodnotes-userguide-inventory.md; screens §7._

- **Level** uses RFC 2119 keywords: **MUST** (ship-blocking), **SHOULD** (strong default; deviation needs a recorded reason), **MAY** (optional / later).
- **Milestone** is an indicative delivery bucket, not a contract. ⚠️ The **authoritative roadmap is
  [`../../issues/milestones.json`](../../issues/milestones.json)** (M0 Foundations · M1 Ink Editor Alpha ·
  M2 Library & Documents · M3 Audio & Recognition · M4 Identity, Sync & Privacy · M5 Phones & Platform
  Parity · M6 Collaboration, Sharing & Sage AI · M7 Beta Hardening · M8 Launch & Growth). The buckets below
  were written against an earlier working roadmap and do **not** map one-to-one to those milestone IDs —
  notably this PRD's "M6 Sync/sharing/collaboration" splits into milestones.json's **M4** (Identity, Sync &
  Privacy) and **M6** (Collaboration, Sharing & Sage AI), and this PRD's "M4 Search + recognition" is
  milestones.json's **M3** (Audio & Recognition). Treat every per-requirement milestone tag as indicative
  sequencing; where it conflicts with milestones.json, **milestones.json wins**.

  | M (indicative bucket) | Theme |
  |---|---|
  | **M1** | Local-first library + editor MVP (guest mode, on-device, no account) |
  | **M2** | PDF import / render / annotate / export |
  | **M3** | Audio capture + ink/text↔audio sync |
  | **M4** | Search + handwriting recognition + OCR |
  | **M5** | Study/AI layer (convert, math solve, Ask-my-notes, flashcards) + template store |
  | **M6** | Sync, sharing, real-time collaboration, cloud version history |

- **Refs** cite research files by the short path `research/<file>.md` (the folder is committed at `docs/research/sources/`) and design docs by section (`screens §N` = [`docs/design/screens-and-flows.md`](../design/screens-and-flows.md)).

### 1.2 Governing constraints (inherited, non-negotiable)

These are fixed by the project's Locked Decisions and repeated here so requirements below can lean on them:

- **Local-first & zero-knowledge.** All note content lives on-device (SQLite via `drift` + a content-addressed blob store). No Sane Notes server stores note content. Sync (M6) uses the user's own cloud, end-to-end encrypted. Requirements here assume the local store is the source of truth and sync is an additive layer.
- **On-device by default AI.** Every recognition/transcription/AI capability MUST have a fully local implementation; cloud inference is per-request opt-in with a visible "data leaves device" indicator. _Refs: research/handwriting-recognition-ai-and-ml.md §"Privacy posture"._
- **Guest mode is first-class.** Identity is never required to take, organise, search, or export notes. Account-gated features degrade gracefully to local-only.
- **Five surfaces in lock-step.** iPadOS, iOS, Android phone/tablet, Web (PWA). A feature is not "done" until it works, or has a defined graceful-degradation, on every surface — turning competitors' platform-parity gap into a wedge. _Refs: research/goodnotes-userguide-inventory.md §"Platform differences"; research/notability.md §"Android parity gaps"._

### 1.3 Positioning summary (what we must match, what we beat)

| Area | Table stakes (must match) | Where Sane Notes wins |
|---|---|---|
| Organization | Folders, favourites, recents, trash+restore, grid/list, sort, bulk actions | **Unlimited nesting** (Notability caps at 6) + **first-class tags** (Notability has none) + **per-page templates in one notebook** (Notability forces one template per note) |
| Search | Search handwriting, typed, PDF text, titles | **Handwriting search free & on-device** (turn Notability's most-resented paywall into a differentiator) + audio-transcript + tag search + semantic "Ask" |
| PDF | Import, annotate, outline nav, faithful export | **OCR on import** (Goodnotes does not OCR imports) + cross-platform parity incl. Web |
| Audio | Record synced to ink, tap-to-jump, transcription | **Background recording rules honoured on Android** (Goodnotes stops on app-switch) + on-device transcript by default |
| Version history | Restore prior versions | Generous **free retention** (Notability free = 7 days) + non-destructive restore-as-copy |

_Refs: research/notability.md §"What Sane Notes could beat them on"; research/goodnotes-userguide-inventory.md §"Weaknesses / gaps"._

---

## 2. Data model foundations

Requirements below reference these entities. This is the **library/document metadata model** (the CRDT object model for a page's contents lives in the editor PRD / `sane_core`). All entities carry `id` (UUIDv7), `createdAt`, `updatedAt` (HLC timestamp), and `deletedAt` (null unless trashed). All are **per-profile** unless noted.

| Entity | Key fields | Notes |
|---|---|---|
| **Workspace** | `id`, `activeProfileId` | One per device install. Holds profiles + device prefs. |
| **Profile** | `id`, `name`, `initials`, `color`, `role`, `note`, `look`, `wallpaper`, `prefs` | Local profiles; data-isolated (see PRD-LB-058). |
| **Subject** | `id`, `name`, `colorHex`, `order` | Single-select classification with a colour spine. Seed six (§3.1). |
| **Folder** | `id`, `parentFolderId?`, `name`, `colorHex?`, `iconId?`, `order` | Arbitrary nesting; `parentFolderId=null` ⇒ library root. |
| **Notebook** | `id`, `title`, `subjectId?`, `folderId?`, `coverId?`, `tagIds[]`, `favorite`, `pageKind`, `defaultPaper`, `defaultTint`, `defaultSize`, `pageCount`, `lastOpenedPage`, `lastOpenedAt`, `flags{audio,pdf,shared}` | The primary document. `pages[]` are child objects (editor PRD). |
| **Tag** | `id`, `label`, `colorHex?`, `usageCount` | Many-to-many with notebooks; also appliable to pages (SHOULD). |
| **Cover** | `id`, `kind(preset\|image)`, `assetRef?` | Optional decorative cover; distinct from the auto thumbnail. |
| **Template** | `id`, `kind`, `paperType`, `tint`, `size`, `orientation`, `source(builtin\|custom\|store)`, `assetRef?` | See §6. |
| **PdfAsset** | `id`, `blobRef`, `pageCount`, `hasTextLayer`, `outline[]`, `bytes` | Content-addressed; referenced by PDF-backed pages. |
| **Annotation** | per research A.2 model (`type`, `pageIndex`, geometry in PDF points, `inkPaths` with per-point `t`, `audioAnchorMs`) | Sane Notes DB is source of truth; XFDF is interop. _Refs: research/pdf-and-audio-technology.md §A.2._ |
| **RecordingSession** | `id`, `notebookId`, `audioBlobRef`, `codec`, `startedAt`, `durationMs`, `peaksRef`, `segments[]` | Multiple per notebook. _Refs: research/pdf-and-audio-technology.md §B.6._ |
| **TimeAnchor** | `id`, `sessionId`, `pageIndex`, `kind(ink\|text\|pageTurn)`, `tStartMs`, `tEndMs`, `strokeId?`, `textRange?` | Links content to the audio clock. |
| **Transcript** | `id`, `sessionId`, `engine`, `language`, `words[]{text,tStartMs,tEndMs,conf}` | Word-level timestamps on the same clock. |
| **SearchIndexRow** | `docId`, `pageIndex`, `source(handwriting\|typed\|pdf\|transcript\|title\|tag)`, `text`, `quads?`, `lang` | Feeds FTS5 (§10). |
| **VersionSnapshot** | `id`, `notebookId`, `takenAt`, `blobRef`, `reason` | See §17. |
| **TrashEntry** | `id`, `entityType`, `entityId`, `originalParent`, `trashedAt`, `purgeAt` | 30-day soft delete (§5.4). |

> **PRD-LB-001 · MUST · M1** — All library entities MUST be stored in the local SQLite database as the source of truth and MUST be fully functional with no account and no network (guest mode). _Refs: Locked Decision 3; screens §0._

> **PRD-LB-002 · MUST · M6** — Every mutable field above MUST be expressible as a CRDT operation (LWW register for scalar props, add-wins set for `tagIds`/membership) so it merges without a server. Library metadata rides the same op-log as page content. _Refs: Locked Decision 4; research/local-first-sync-and-crdt.md._

---

## 3. Organization: subjects, folders, tags, favourites, covers, recents

The mock exposes **subjects** (coloured sidebar categories) but not folders or tags. We add both. These three are **orthogonal** and MUST NOT be conflated:

- **Subject** = single-select, colour-bearing classification (drives the card spine + sidebar grouping). Answers "what class is this for?"
- **Folder** = hierarchical container (unlimited depth). Answers "where do I keep it?"
- **Tag** = many-to-many free-form label. Answers "what themes cut across my notebooks?"

### 3.1 Subjects

> **PRD-LB-030 · MUST · M1** — A notebook MAY have exactly one **subject**. The sidebar MUST list each subject with a colour swatch and live notebook count; tapping filters the library to that subject (sets `libFilter`). _Refs: screens §2, §6._

> **PRD-LB-031 · MUST · M1** — Ship six seed subjects with fixed colours: **Physics** `#2f6df6`, **Mathematics** `#7a3ec9`, **Chemistry** `#2e8b57`, **Design** `#e07b1c`, **Languages** `#d9488a`, **Personal** `#6b7280`. Users MUST be able to add, rename, recolour, reorder, and delete subjects; deleting a subject reassigns its notebooks to "Personal" (never deletes notebooks). _Refs: screens §17 (Subjects)._

> **PRD-LB-032 · SHOULD · M1** — New-notebook subject defaults to the currently active library filter, else "Personal". The subject colour MUST render as the card/list spine and MUST tint the notebook's default template swatch preview only (not the paper itself unless a tint is chosen). _Refs: screens §8 (applyTemplate)._

### 3.2 Folders & nesting

> **PRD-LB-033 · MUST · M1** — Notebooks and folders MUST support **unlimited nesting depth** (explicitly beating Notability's 6-level cap and matching Goodnotes' unlimited). A folder MAY contain sub-folders and notebooks. _Refs: research/notability.md §"Organization limits"; research/goodnotes-userguide-inventory.md §"Folders & documents"._

> **PRD-LB-034 · MUST · M1** — Folders MUST support: create, rename, set colour, set icon (from a curated icon set), move (drag or menu), duplicate (deep-copies contained notebooks), and delete-to-trash (moves the whole subtree to trash as one restorable unit). A folder MUST show a breadcrumb path in the library header when opened. _Refs: research/goodnotes-userguide-inventory.md §"Folders & documents"._

> **PRD-LB-035 · SHOULD · M1** — Moving a notebook onto another notebook MUST NOT silently merge them (Goodnotes merges on drop — a documented foot-gun); instead prompt "Move into a new folder / Merge / Cancel". Default action is a no-op with a hint. _Refs: research/goodnotes-userguide-inventory.md §"Item menu" (merge behaviour)._

### 3.3 Tags

> **PRD-LB-036 · MUST · M1** — Notebooks MUST support many-to-many **tags** (free-form `#label`, shown on list rows per screens §6). Tags MUST be creatable inline (type-ahead against existing tags), removable, recolourable, and renamable globally (rename updates all references). _Refs: screens §6 (list row `#tags`); research/notability.md §"no first-class tags" (gap to exploit)._

> **PRD-LB-037 · SHOULD · M2** — Tags SHOULD also be appliable at **page** granularity (e.g. tag a single lecture page `#exam`), surfaced in search filters and the page rail. _Refs: research/notability.md §"could beat them on" (tagging system)._

> **PRD-LB-038 · SHOULD · M4** — Users MUST be able to save a **filter as a smart collection** (subject + tags + type filters + date range) that appears as a pinnable sidebar entry and re-evaluates live. _Refs: research/notability.md §"saved smart searches"._

### 3.4 Favourites, recents, shared

> **PRD-LB-039 · MUST · M1** — Every notebook card and list row MUST have a **favourite** star toggle (resolves screens Open Question 4). Toggling updates the sidebar **Favorites** filter immediately with a toast ("Added to favourites" / "Removed"). Favourite state is per-profile. _Refs: screens §6, Open Question 4._

> **PRD-LB-040 · MUST · M1** — The sidebar nav MUST provide **All notebooks, Recent, Favorites, Shared, Trash**. "Recent" ranks by `lastOpenedAt` desc; "Shared" lists notebooks with `flags.shared=true` (M6); each selection sets `navItem` and resets `libFilter` to All. _Refs: screens §2._

> **PRD-LB-041 · MUST · M1** — The **"Pick up where you left off"** rail MUST render only when `navItem=all AND libFilter=All`, showing the three most-recently-opened notebooks as horizontal cards (mini thumbnail, title, "subject · page X of Y", relative updated time, Audio/PDF/Shared badges). Tapping opens the notebook at `lastOpenedPage`. _Refs: screens §6._

### 3.5 Covers & thumbnails

> **PRD-LB-042 · MUST · M1** — Each notebook MUST render a **thumbnail** = a live mini-render of page 1 (strokes + PDF facsimile for PDF-backed notebooks), 3:4 aspect in grid. Thumbnails MUST be generated on a background isolate and cached to disk; regenerate on page-1 change (debounced). _Refs: screens §6 (card thumbnail)._

> **PRD-LB-043 · SHOULD · M1** — Notebooks MAY have an optional **cover** (a preset from a curated set, or a custom image / first PDF page). Covers MUST be available on the **free** plan (Notability locks covers to its cloud tier — we do not). Editor-role collaborators MAY change a shared notebook's cover (M6). _Refs: research/notability.md §"Note Covers"._

---

## 4. Library home screen

Implements screens §6. The library is the app home after profile pick.

> **PRD-LB-004 · MUST · M1** — The header MUST show an eyebrow date ("Tuesday, 8 September"), a **time-of-day greeting** using the active profile's name ("Good afternoon, Riya"), and primary actions **Import PDF** and **New notebook**. Greeting bucket boundaries: morning <12:00, afternoon <17:00, evening <21:00, else "Good night". _Refs: screens §6._

> **PRD-LB-005 · MUST · M1** — The notebook section MUST offer **filter chips** (All + each subject; active chip inverts colours) and a **Grid/List toggle** (`libView`). Grid = 3:4 poster cards; List = dense rows with title, "subject · N pages", `#tags`, Audio/PDF badges, updated time. _Refs: screens §6._

> **PRD-LB-006 · MUST · M1** — Provide a **sort menu**: Last modified (default), Date created, Name (A–Z), Type; each toggles asc/desc. Sort applies within the current filter/nav. _Refs: research/goodnotes-userguide-inventory.md §"Views and Sorting"._

> **PRD-LB-007 · MUST · M1** — Section title MUST reflect nav (Notebooks / Recent / Favorites / Shared / Trash). Empty states MUST use the mock copy: Trash → "Trash is empty — deleted notebooks stay here for 30 days."; others → "Nothing here yet." A loading fallback MUST render a minimal shell (sidebar widths, empty lists) before data hydration. _Refs: screens §6._

> **PRD-LB-008 · MUST · M1** — Tapping a card/row MUST open the notebook in the editor at `lastOpenedPage` (page 0 for new), sidebar closed, focus off (`openNb`). _Refs: screens §6._

---

## 5. Notebook lifecycle, bulk actions, quick note, trash

The mock only opens notebooks; it has **no** rename/delete/move/duplicate affordance (screens Open Questions 2–4). This PRD defines the missing lifecycle.

### 5.1 Per-notebook actions

> **PRD-LB-060 · MUST · M1** — Every notebook MUST expose an overflow (`⋯`) menu (and long-press / right-click equivalent) with: **Open**, **Rename**, **Change subject**, **Edit tags**, **Change cover**, **Favourite/Unfavourite**, **Duplicate**, **Move to folder…**, **Export…**, **Share…** (M6), **Version history…** (M6/§17), **Move to Trash**. Resolves screens Open Questions 2–4. _Refs: screens Open Questions 2,3,4; research/goodnotes-userguide-inventory.md §"Item menu"._

> **PRD-LB-061 · MUST · M1** — **Rename** MUST be inline-editable with immediate persistence and undo. Renaming MUST NOT clear version history (Notability's iCloud rename wipes history — an anti-pattern we explicitly avoid). _Refs: research/notability.md §"renaming a note clears its iCloud version history"._

> **PRD-LB-062 · SHOULD · M1** — **Duplicate** MUST deep-copy pages, annotations, and metadata (new IDs), suffix the title " copy", and place the copy beside the original. Linked audio blobs MAY be shared by reference-count rather than byte-copied to save space, but the copy MUST behave as if it owns them. _Refs: research/goodnotes-userguide-inventory.md §"Duplicate"._

### 5.2 Bulk actions

> **PRD-LB-063 · MUST · M1** — The library MUST support **multi-select** (long-press to enter; checkboxes; Select-All). Bulk actions on the selection: **Export**, **Move to folder**, **Add/Remove tag**, **Change subject**, **Favourite**, **Duplicate**, **Move to Trash**. A bulk action MUST be a single undoable transaction with one toast ("Moved 4 notebooks"). _Refs: research/notability.md §"Content Manager & Bulk Actions"; research/goodnotes-userguide-inventory.md §"Bulk actions"._

### 5.3 Quick note

> **PRD-LB-064 · SHOULD · M1** — Provide **Quick Note**: a one-tap, coverless single-page notebook in the last-used paper template, created without the template dialog (double-tap "New notebook", a sidebar shortcut, and — where the OS allows — a home-screen widget / quick action). After writing, the user MUST be able to keep-in-place, move to a folder, merge into an existing notebook, or discard. _Refs: research/goodnotes-userguide-inventory.md §"Quick notes"; research/notability.md §"Widgets"._

### 5.4 Trash & restore

The mock's trash is inert (always empty). This PRD makes it functional (resolves Open Question 2).

> **PRD-LB-065 · MUST · M1** — Deleting a notebook, folder, or page MUST be a **soft delete**: create a `TrashEntry` with `purgeAt = now + 30 days`, remove it from active views, and toast "Moved to Trash · Undo" (10 s undo window). _Refs: screens §6 ("stays here for 30 days"), Open Question 2._

> **PRD-LB-066 · MUST · M1** — The Trash view MUST list trashed items with time-remaining, and offer **Restore** (returns to `originalParent`; if the parent is also trashed/gone, restore to library root), **Delete permanently** (irreversible, confirm), and **Empty Trash**. A background job MUST auto-purge entries past `purgeAt`. _Refs: research/goodnotes-userguide-inventory.md §"Trash Bin"; research/notability.md §"Recently Deleted"._

> **PRD-LB-067 · MUST · M6** — Deleting from the library MUST NOT be destructive on cloud in a way the user cannot recover (explicitly counter Notability's irreversible iCloud-delete). Deletes propagate through the op-log as tombstones; the 30-day trash exists on every synced device. _Refs: research/notability.md §"Destructive iCloud deletion"._

> **PRD-LB-068 · SHOULD · M2** — Provide **Archive** as a non-destructive "hide from main library without deleting" state (distinct from Trash: no purge timer), reachable from the overflow menu and a sidebar "Archived" entry. _Refs: general PKM parity (verify against roadmap)._

---

## 6. Templates & paper

Implements screens §8 (Templates overlay). A key differentiator: **per-page templates within one notebook** — Notability forces one template per note and changing it re-papers every page (a well-known limitation). Sane Notes MUST allow mixed paper per page.

### 6.1 Page kinds

> **PRD-LB-090 · MUST · M1** — A notebook's pages MUST support three **page kinds**: **paged** (fixed-size, e.g. 800×1040 base geometry), **infinite/freeform canvas** (2400×2400 seed, growing every direction, no page max-width/shadow — "endless board"), and **PDF-backed** (facsimile beneath ink). Page kind is per-page; a notebook MAY mix kinds (e.g. a paged lecture with an imported PDF page inserted). _Refs: screens §7.2, §8._

> **PRD-LB-091 · MUST · M1** — **Freeform** selection in the template dialog MUST show the explainer copy and create an "Untitled canvas"; paged selection creates a templated notebook. Freeform MUST provide pan/zoom + a minimap/overview control and a "reset view / fit content" action (resolves screens Open Question 12). _Refs: screens §8, Open Question 12._

### 6.2 Paper types, tints, sizes

> **PRD-LB-092 · MUST · M1** — Ship these built-in **paper templates**: **Blank, Lined, Grid, Dotted, Cornell, Music staff, Weekly planner, Flashcards**, plus (M1+) **Isometric** and **Chemistry (hex)** to match Goodnotes' free set. Cornell/Planner/Flashcards/Music render their structural rules (divider rules, card outline, staff lines). _Refs: screens §8 (TPLS); research/goodnotes-userguide-inventory.md §"Templates"._

> **PRD-LB-093 · MUST · M1** — Provide **paper tints**: White (none), Cream, Yellow, Gray (extensible palette). Provide **page sizes**: Auto, A4, Letter (add A3/A5/Legal as MAY). Provide **orientation** portrait/landscape. Line/grid/dot **spacing** MUST be adjustable (Notability offers ~9 presets ½″–3″). _Refs: screens §8 (TINTS, sizes); research/notability.md §"Backgrounds"._

> **PRD-LB-094 · MUST · M1** — **Per-page re-paper**: from the editor's "Paper & templates" the user MUST be able to change the current page's paper/tint/size **without affecting other pages** (mock's `tplMode:'page'`). For PDF-backed pages only the tint applies. New pages clone the current page's paper/tint (mock `addPage`). _Refs: screens §7.7, §8; research/notability.md §"one template per note" (limitation to beat)._

### 6.3 Custom templates & store

> **PRD-LB-095 · SHOULD · M5** — Users MUST be able to create a **custom template** from: an imported PDF/image (PDF preferred over pixel image; multi-page PDF uses page 1 as the repeating template), or an existing page ("Save page as template"). Custom templates live in "My Templates", groupable/renamable/reorderable; deleting a custom template is irreversible but built-ins are always restorable. _Refs: research/goodnotes-userguide-inventory.md §"Custom templates"; research/notability.md §"Custom Templates"._

> **PRD-LB-096 · MAY · M5** — Provide a **Template / Marketplace store** (paper, covers, stickers, planners) as an in-app browse-and-install surface. Free plan gets lined/grid/dotted (+ the built-ins above); premium templates/planners MAY be Pro-gated or individually purchasable. Store assets install into "My Templates". _Refs: screens §14 (templates Free vs Pro); research/goodnotes-userguide-inventory.md §"Marketplace"; research/notability.md §"Gallery (20,000+ templates)"._

> **PRD-LB-097 · SHOULD · M5** — **Hyperlinked digital planners**: imported/created planners with internal page links (tabs → month/week/day) MUST work — tapping a planner link navigates within the notebook. This depends on internal-link support (PRD-LB-150). _Refs: research/notability.md §"Digital planners"; research/goodnotes-userguide-inventory.md §"Hyperlinks"._

### 6.4 Plan gating (templates)

> **PRD-LB-098 · MUST · M1** — Free plan MUST include at least **Blank, Lined, Grid, Dotted** paper (mock's stated free set) plus Cornell so students aren't blocked on study paper; Pro unlocks the full built-in set + store premium templates. Gate on selecting a Pro template → Upgrade overlay. Do not paywall the everyday paper types. _Refs: screens §14; research/notability.md §"free tier resentment"._

---

## 7. PDF

Implements screens §9 (Import overlay) + the PDF facsimile in §7.2. Engine choices are fixed by research and Locked Decision 1.

### 7.1 Engine & rendering

> **PRD-LB-130 · MUST · M2** — Use **`pdfrx`** (PDFium, MIT) as the single cross-platform render/view/text/search/outline/link engine, including **Web via PDFium-WASM** (no separate pdf.js path). Do **not** use MuPDF (AGPL/commercial trap) or Android `PdfRenderer` as core (render-only). Jetpack `androidx.pdf` MAY be an Android-only accelerator. _Refs: research/pdf-and-audio-technology.md §A.1, §A.8._

> **PRD-LB-131 · MUST · M2** — Text extraction, search-with-bounds (quads), flatten, and PDF/A export MUST use **`syncfusion_flutter_pdf`** (Community License where eligible); generated searchable exports use **`package:pdf`** (embedded TrueType = real text); printing uses **`package:printing`** (AirPrint/native/web). _Refs: research/pdf-and-audio-technology.md §A.4, §A.6, §A.7._

> **PRD-LB-132 · MUST · M2** — Rendered PDF pages MUST **keep their original colours even in dark mode** (only the app chrome and native paper themes go dark). Provide an optional per-document "night filter" (invert/dim) the user can opt into, off by default. _Refs: screens §0 ("PDFs keep their original colours")._

### 7.2 Import & free-plan limit

> **PRD-LB-133 · MUST · M2** — The Import overlay MUST offer sources: **Files** (device), **Google Drive** (user's own, M6), **Scan with camera** (auto-crop/straighten), **Paste a link** (course portal / arXiv / Drive). Also accept PowerPoint and Word on platforms where a converter exists (convert to PDF; recommend native-PDF for fidelity). A **Recent files** list MUST be shown. Importing inserts a PDF page after the current page, switches the tool to highlighter, and toasts "<file> imported · highlighter ready". _Refs: screens §9; research/notability.md §"Import"; research/goodnotes-userguide-inventory.md §"Import"._

> **PRD-LB-134 · MUST · M2** — **Free-plan PDF-import meter**: free accounts get **5 imports per calendar month**. The overlay MUST show "N of 5 imports used this month" + progress bar + "Unlimited with Pro". When free AND `importsUsed ≥ 5`, opening Import MUST instead open the **Upgrade** overlay with toast "Free plan: 5 PDF imports a month". The counter is per-account, tracked locally and reconciled with the entitlement service (M6); it resets on the 1st. _Refs: screens §9; Locked Decision 5/9._

> **PRD-LB-135 · SHOULD · M2** — **Huge-PDF performance** (600+ pages) MUST use: lazy page rasterization (render only viewport±neighbours, dispose off-screen bitmaps), a two-resolution scheme (cheap preview during fast scroll → full-res on settle), tile caching at high zoom, disk-cached thumbnails for a scrubber, and PDFium rasterization + text-index building on **background isolates** with a bounded LRU memory cap. Target: scroll a 600-page PDF at 60 fps (perf budget). _Refs: research/pdf-and-audio-technology.md §A.5; Locked Decision 7._

### 7.3 Annotation, outlines, links, forms

> **PRD-LB-136 · MUST · M2** — PDF annotation MUST use an **overlay layer drawn on pdfrx's coordinate system**, with marks stored in the Sane Notes DB as the source of truth (research A.2 model: geometry in **PDF points**, page-relative; ink strokes carry per-point pressure + `t` for audio sync). Annotations are **live/non-destructive** (never modify page content). _Refs: research/pdf-and-audio-technology.md §A.2._

> **PRD-LB-137 · MUST · M2** — Support these annotation types on PDFs: **Ink** (pen/highlighter with pressure), **Text markup** (highlight/underline/strikeout/squiggly, snapping to text quads via long-press-select), **FreeText** (typed), **Note** (sticky comment), **Shape** (line/rect/oval/polygon), **Image/Stamp**, **Link**. Provide a "**Smart Highlighter**" that snaps to PDF text runs and a straight-line highlighter (draw-then-hold to straighten). _Refs: research/pdf-and-audio-technology.md §A.2; research/notability.md §"Smart Highlighter"; research/goodnotes-userguide-inventory.md §"Highlighter"._

> **PRD-LB-138 · SHOULD · M2** — Provide "**add margin space**" (None/Left/Right/Both) to widen a PDF page for handwriting, per Notability. _Refs: research/notability.md §"add blank margin space"._

> **PRD-LB-139 · MUST · M2** — **Outlines**: load and display the PDF's outline/TOC (pdfrx); tapping a heading jumps to the page; support expand/collapse. Users MUST also be able to add manual outline entries (a page can appear under multiple outline items). Auto-generate an outline (AI, opt-in) MAY be offered later. _Refs: research/pdf-and-audio-technology.md §A.3; research/goodnotes-userguide-inventory.md §"Outlines"; research/notability.md §"PDF Outlines"._

> **PRD-LB-140 · MUST · M2** — **Hyperlinks**: preserve and follow both in-PDF GoTo links and external URL links. On export, keep link annotations live (do not flatten them) so navigation survives. _Refs: research/pdf-and-audio-technology.md §A.3._

> **PRD-LB-141 · SHOULD · M3** — **Forms (AcroForm)**: support fill / flatten / import-export of AcroForm fields (text, radio, checkbox). Target AcroForm only; XFA is out of scope. _Refs: research/pdf-and-audio-technology.md §A.3; research/notability.md §"Forms"._

### 7.4 Page ops & export

> **PRD-LB-142 · MUST · M2** — PDF-backed and paged notebooks MUST support **page operations** from the page rail / page menu: add before/after, duplicate, rotate, reorder (drag in rail), delete-to-trash, clear page, go-to-page, rotate. This resolves screens Open Question 11. Reorder/delete MUST be undoable. _Refs: screens Open Question 11; research/goodnotes-userguide-inventory.md §"Page management"; research/notability.md §"Content Manager"._

> **PRD-LB-143 · MUST · M2** — **Export** a page or whole notebook to: **PDF flattened** (marks merged into page content — for final share/print), **PDF with live annotations** ("editable": marks stay selectable; outlines + original hyperlinks preserved), **PNG/JPEG** (per page), and **`.sanenote`** bundle (manifest + segments + blobs, keeps audio sync). Provide **searchable-handwriting export**: run OCR (§11) and place an invisible text layer behind the ink so exported handwriting is searchable/selectable. _Refs: research/pdf-and-audio-technology.md §A.6; research/goodnotes-userguide-inventory.md §"Export options"; screens §10 (Export row)._

> **PRD-LB-144 · MUST · M1** — **Export everything** (a ZIP of every notebook as PDF + `.sanenote`) MUST be available on **every plan including Free** ("yours to keep, even on Free"). This is a trust/anti-lock-in guarantee. _Refs: screens §12 (Privacy & export)._

---

## 8. Images & media

The mock routes the "Image" tool to the PDF import overlay (Open Question 10). This PRD defines a distinct image/media path.

> **PRD-LB-180 · MUST · M2** — Provide an **Insert media** action distinct from PDF import, with sources: **Photos**, **Camera** (take photo), **Document scan** (auto-crop/straighten to a multi-page PDF or flattened image), **Stickers/Elements**, and **GIF** (searchable, from a provider; free on all plans). Resolves screens Open Question 10. _Refs: screens Open Question 10; research/notability.md §"Add Media"; research/goodnotes-userguide-inventory.md §"Image Tool", §"Elements", §"GIPHY"._

> **PRD-LB-181 · MUST · M2** — Inserted images MUST support **placement, move, resize (side handles), scale (corner handles, aspect-lock with modifier), rotate, crop (rectangular + freehand), and z-order (bring-to-front / send-to-back)**. Provide **object alignment guides** (dashed = centre, solid = edge) while dragging. _Refs: research/goodnotes-userguide-inventory.md §"Image Tool"; research/notability.md §"Image editing"._

> **PRD-LB-182 · SHOULD · M2** — **Document scanning** MUST detect page edges, offer corner adjustment, perspective-correct, and (Apple) index scanned text as searchable. Multi-page scans create a PDF-backed set of pages. _Refs: research/notability.md §"Document scanning"; research/goodnotes-userguide-inventory.md §"Scanning"._

> **PRD-LB-183 · SHOULD · M5** — **Stickers / Elements**: a reusable personal library of any content (handwriting, shapes, images, combos) organised into collections; create from a lasso selection; insert by tap/drag; shareable as a collection file. Provide a starter sticker set + store collections. Users MUST be able to make their own stickers from handwriting. _Refs: research/goodnotes-userguide-inventory.md §"Elements Tool"; research/notability.md §"Stickers"._

> **PRD-LB-184 · SHOULD · M2** — Media objects (images, stickers, GIFs, sticky notes) MUST be **lockable** in place to prevent accidental edits, and MUST optionally show a **caption**. Sticky notes MUST be writable (pen/highlighter), resizable, and available in blank/ruled/grid/dot styles. _Refs: research/notability.md §"Locking", §"Sticky Notes"; research/goodnotes-userguide-inventory.md §"Lock/Unlock"._

> **PRD-LB-185 · MAY · M5** — On Apple-Intelligence-capable devices, offer generative image insertion (Image Playground-style) as an explicit opt-in; not required for parity. _Refs: research/notability.md §"Image Playground"._

---

## 9. Audio

Implements screens §7.6 (recorder bar) and the "audio linked to ink" value prop. Engine choices fixed by research Part B.

### 9.1 Recording & waveform

> **PRD-LB-210 · MUST · M3** — Use **`record`** (BSD-3) as the recorder, encoding **Opus 12–24 kbps wideband mono** by default (≈7–11 MB/hour) with **AAC-LC** as a compatibility/export option. Use its `amplitude(dBFS)` for the **live waveform**; persist an extracted **peaks array** (≈10–50 samples/s) as a sidecar so playback never rescans the file. Waveform UI via **`audio_waveforms`**. _Refs: research/pdf-and-audio-technology.md §B.1, §B.2, §B.3, §B.10._

> **PRD-LB-211 · MUST · M3** — The recorder bar MUST implement the three states from the mock: **Idle-no-recording** (Record button + "Ink is time-linked to audio…" copy), **Recording** (pulsing dot, live `mm:ss` timer, animated bars, Stop; toast "Recording — everything you write is time-linked"), **Has-recording/playback** (play/pause, current time, waveform+scrubber, total duration, speed toggle **1× → 1.5× → 2×**, caption "Ink replays in sync"). On stop, store `durationMs`, toast "Recording saved · mm:ss". _Refs: screens §7.6._

> **PRD-LB-212 · MUST · M3** — A notebook MUST support **multiple `RecordingSession`s** (Notability/Goodnotes allow several clips per note). Clips MUST support rename, delete/trash, trim/split, and (SHOULD) merge. Resolves part of screens Open Question 5. _Refs: research/notability.md §"Editing" (trim/split/merge); research/pdf-and-audio-technology.md §B.6._

### 9.2 Background recording rules

> **PRD-LB-213 · MUST · M3** — **iOS/iPadOS**: set `AVAudioSession` category `.record`/`.playAndRecord`, add `UIBackgroundModes: audio` to Info.plist (without it, recording pauses in background), and handle `AVAudioSession.interruptionNotification` (pause on `.began`; resume on `.ended` when `.shouldResume`) so calls/Siri don't lose a lecture. Include `NSMicrophoneUsageDescription` (+ `NSSpeechRecognitionUsageDescription` when transcribing). _Refs: research/pdf-and-audio-technology.md §B.5._

> **PRD-LB-214 · MUST · M3** — **Android 14+ (API 34+)**: run a **foreground service typed `microphone`** (manifest `foregroundServiceType="microphone"`; permissions `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MICROPHONE`, `RECORD_AUDIO`), start it while in the foreground (cannot start a mic FGS from background), and show the non-dismissible "recording" notification. Drive via **`flutter_foreground_task`**. Result: recording MUST continue across app-switch on Android — explicitly beating Goodnotes (which stops on app-switch) and Notability (undocumented). _Refs: research/pdf-and-audio-technology.md §B.5; research/goodnotes-userguide-inventory.md §"Android — recording STOPS when you switch apps"._

> **PRD-LB-215 · SHOULD · M3** — Write audio in segments so a crash loses only the last chunk and long/resumable sync works. Prefer continuous capture with internal segmenting over forcing a restart (Notability auto-splits at ~1 hour). _Refs: research/pdf-and-audio-technology.md §B.8; research/notability.md §"auto-split"._

### 9.3 Playback

> **PRD-LB-216 · MUST · M3** — Use **`just_audio`** for playback: precise seek (tap-to-jump), `setSpeed()` for speed control (offer at least 0.7×/1×/1.25×/1.5×/2×; the mock's dock toggles 1×/1.5×/2×), ±10 s skip, and **`just_audio_background`** for lock-screen controls. _Refs: research/pdf-and-audio-technology.md §B.4, §B.10; research/notability.md §"Playback speeds"; research/goodnotes-userguide-inventory.md §"Playback"._

> **PRD-LB-217 · SHOULD · M4** — Implement **skip-silence** ourselves by thresholding the stored peaks and auto-seeking across silent spans (no package provides this). Provide a **Voice Boost**-style gain/clarity control (amplify distant voices). _Refs: research/pdf-and-audio-technology.md §B.4; research/notability.md §"Voice Boost"._

### 9.4 Audio ↔ ink ↔ text sync (the signature feature)

> **PRD-LB-218 · MUST · M3** — Implement time-anchored sync per research B.6: on `record.start()` capture `t0`; every ink stroke point and text keystroke stores `now − t0` (adjusted for pause/resume `segments`); persist per-point stroke `t` so handwriting can **replay**. Data lives in `TimeAnchor` rows keyed to `sessionId`. _Refs: research/pdf-and-audio-technology.md §B.6; research/handwriting-recognition-ai-and-ml.md §6._

> **PRD-LB-219 · MUST · M3** — **Two-directional UX**: (1) tapping any stroke/typed word/transcript word seeks audio to its `tStartMs` and plays ("tap anything you wrote to hear what was said"); (2) during playback, strokes/words whose `[tStartMs,tEndMs]` contains the playhead are highlighted (follow-along), and strokes recorded *after* the playhead dim (mock: opacity .12) so ink "replays in sync". Provide reveal modes (Spotlight default / Real-time reveal / Static). _Refs: screens §7.6; research/goodnotes-userguide-inventory.md §"Notes Playback modes"; research/pdf-and-audio-technology.md §B.6._

> **PRD-LB-220 · SHOULD · M3** — A recording SHOULD be able to **span multiple pages** of a lecture (not just its starting page — Goodnotes limits capture to the starting page; a documented gap). `TimeAnchor.pageIndex` records which page each anchor was on; page-turns are anchored events. This fully resolves screens Open Question 5. _Refs: screens Open Question 5; research/goodnotes-userguide-inventory.md §"Notes are only captured on the recording's starting page"._

### 9.5 Transcription (on-device by default)

> **PRD-LB-221 · MUST · M4** — Transcribe **from file, post-hoc** (never rely on short-phrase live recognizers for lectures). iOS/iPadOS/macOS: **WhisperKit** (Core ML) or **`SpeechAnalyzer`/`SpeechTranscriber`** where OS supports long-form; Android/Web: **whisper.cpp** (or Vosk for a tiny footprint). Align transcript **word timestamps** to the same audio clock as §9.4 so a transcript word seeks audio *and* highlights the ink written then. _Refs: research/pdf-and-audio-technology.md §B.7; research/handwriting-recognition-ai-and-ml.md §5, §6._

> **PRD-LB-222 · MUST · M4** — Transcription MUST be **on-device by default** with the "runs on your device" indicator; any cloud transcription (higher accuracy, more languages) is explicit per-request opt-in showing what leaves the device. Free tier gets on-device transcripts (do not paywall the private path); cloud transcription MAY be Pro-metered. Provide a **live transcript** view during recording (best-effort) and a full transcript after. _Refs: research/handwriting-recognition-ai-and-ml.md §"Privacy posture"; screens §12 (on-device recognition); research/notability.md §"Live/Audio Transcripts"._

> **PRD-LB-223 · SHOULD · M4** — Transcripts MUST be **exportable** and copyable (counter Notability, whose Smart Notes can't be exported and don't sync). Transcript text MUST be searchable (§10) and MUST sync across devices. _Refs: research/notability.md §"Smart Notes can't be exported"._

### 9.6 Storage, export, consent

> **PRD-LB-224 · MUST · M3** — Store audio blob + peaks + anchor table + transcript **separately** from the note document (referenced by `sessionId`) so note JSON syncs fast and audio syncs lazily / Wi-Fi-only. Export a note-with-audio as a `.sanenote` bundle (keeps sync) or a ZIP of PDF + audio. _Refs: research/pdf-and-audio-technology.md §B.8; screens §10 (".sane (with audio)")._

> **PRD-LB-225 · MUST · M3** — **Free plan** audio is capped at **30 minutes per recording**. Behaviour at the cap MUST be defined (resolves screens Open Question 6): at 30:00, stop recording, save what exists, and toast/prompt "Free plan: 30-minute recordings — upgrade for unlimited" (a hard stop with a clear upgrade path, never silent truncation without notice). _Refs: screens §7.6, Open Question 6, §14._

> **PRD-LB-226 · MUST · M3** — **Consent & privacy**: show a first-run and per-recording notice ("You're responsible for consent; some regions require all parties to agree"), a visible recording indicator (plus the OS mic indicator / Android persistent notification), an optional start cue, and one-tap delete. Default transcription to on-device. Add honest permission rationale strings. _Refs: research/pdf-and-audio-technology.md §B.9._

---

## 10. Search

Implements screens §11. A core promise: **handwriting is searched on-device**, and search is **not** paywalled (turning Notability's most-resented gate into a wedge).

### 10.1 Index architecture

> **PRD-LB-260 · MUST · M4** — Build a local **full-text index (SQLite FTS5)** over: typed text, **recognised handwriting** (background recognition, §11.1), **PDF text layers** (extract on first open; OCR imports that lack a text layer, §11.3), **audio transcripts**, **titles**, **tags/subjects**, and **outline entries**. Indexing runs on a **background isolate**, incremental (per page on change), and cached. _Refs: research/handwriting-recognition-ai-and-ml.md §8; research/pdf-and-audio-technology.md §A.4; screens §11._

> **PRD-LB-261 · MUST · M4** — Each index row MUST retain enough locality to **deep-link**: `docId`, `pageIndex`, source type, and (for PDF/handwriting) on-page **quads/stroke ids** so a result scrolls to and highlights the exact match. This resolves screens Open Question 14 (several seed results point to page 0 regardless of the human page). _Refs: screens Open Question 14; research/pdf-and-audio-technology.md §A.4._

### 10.2 Global search UX

> **PRD-LB-262 · MUST · M4** — The Search screen MUST implement: a big input (placeholder "Search handwriting, typed text, PDFs and audio"), a clear (×), **type filters** (All / Handwriting / Typed / PDFs / Audio) plus tag/subject filters, a result count line ("N results · handwriting is searched on-device"), and result cards (type icon, notebook title, "Page N · type", handwriting scribble preview, snippet with the matched term `<mark>`-highlighted, timestamp). Tapping a result opens the notebook at the matched page and scrolls to the match. Empty: "No matches for "<query>" — try a shorter word, or switch the filter to All." _Refs: screens §11._

> **PRD-LB-263 · MUST · M4** — Search MUST be reachable from the **sidebar launcher** and a keyboard shortcut (⌘K/Ctrl+K). Library search MUST search **content**, not just titles, on every platform (explicitly beating Goodnotes, where non-Apple searches titles only). _Refs: screens §2; research/goodnotes-userguide-inventory.md §"How search works" (non-Apple title-only gap)._

> **PRD-LB-264 · MUST · M4** — Provide **in-note find** (⌘F/Ctrl+F): search within the open notebook, jump between matches (next/prev), highlight, and a match counter. _Refs: research/notability.md §"within-note search"; research/goodnotes-userguide-inventory.md §"Document search"._

### 10.3 Ask my notes (semantic)

> **PRD-LB-265 · SHOULD · M5** — "**Ask my notes**" MUST answer a natural-language question from the user's own notes: a local RAG pipeline — recognise ink→text, chunk, embed with **EmbeddingGemma** (256-dim Matryoshka for footprint), store in **sqlite-vec**, retrieve, and answer with the on-device LLM (Apple Foundation Models / Gemini Nano / WebLLM). Answers MUST cite sources as chips ("<notebook> · p.N", and audio timestamps like "your audio at 04:12"). _Refs: research/handwriting-recognition-ai-and-ml.md §7, §8; screens §11 (Ask panel)._

> **PRD-LB-266 · MUST · M5** — Ask-my-notes plan behaviour (resolves screens Open Question 7): Free = **preview** (labelled "PRO PREVIEW") — a limited number of asks per month and/or no follow-up threads; Pro = unlimited with follow-ups and library-wide scope. Define the exact free quota with the pricing doc. _Refs: screens §11, §13, Open Question 7._

---

## 11. Recognition, math & shapes

The mock's Convert-to-text and Solve-math return canned strings (Open Question 8). This PRD specifies the real pipelines, confidence handling, and correction UX. Engine choices per research §1–§4.

### 11.1 Handwriting recognition & convert-to-text

> **PRD-LB-300 · MUST · M4** — Run **background handwriting recognition** continuously to build the search index — this **never destroys ink** and is **free / on-device / on by default** (mock's "on-device handwriting recognition" privacy toggle). This is deliberately *not* paywalled — Notability's paywalled handwriting search is its most-resented gate. _Refs: research/handwriting-recognition-ai-and-ml.md §1.2, §2; research/notability.md §"handwriting search paywalled" (complaint); screens §12._

> **PRD-LB-301 · MUST · M4** — Default online-ink engine: **Google ML Kit Digital Ink Recognition** (free, on-device, **300+ languages / 25+ scripts**, plus shape + gesture classifiers). Optional premium: **MyScript iink** for superior math/diagram/interactive-editing (record its licensing model — per-device license, 30-day offline grace, contract pricing — as a vendor/cost risk, not a technical one). _Refs: research/handwriting-recognition-ai-and-ml.md §1.1, §1.2._

> **PRD-LB-302 · MUST · M5** — **Convert-to-typed-text** (explicit): lasso ink → "Convert to text" produces an editable text object. This is the **Pro-gated** action (mock); free users hit the Upgrade overlay. Crucial distinction from PRD-LB-300: *searching* your handwriting is free; *converting* it to editable typed text is Pro. Keep the original ink as the source of truth; store a stroke↔text mapping so tapping text highlights source ink. _Refs: screens §7.4, §14; research/handwriting-recognition-ai-and-ml.md §2._

> **PRD-LB-303 · MUST · M5** — Convert/recognition results MUST expose **confidence and correction UX** (mock's canned output has none — Open Question 8): show low-confidence words distinctly, let the user edit the converted text, re-convert in another language, and report a mis-recognition. Recognition **language** is selectable per notebook (default = device language) and MUST cover the broadest available set on **every** platform (normalise; do not ship iOS-23-vs-Android-72 disparities like Notability). _Refs: screens Open Question 8; research/notability.md §"23 vs 72 languages"; research/goodnotes-userguide-inventory.md §"Handwriting recognition languages"._

### 11.2 Editing gestures on raw ink

> **PRD-LB-304 · SHOULD · M4** — Support **editing gestures on raw ink** so users rarely need to convert: scratch-to-erase, circle-to-lasso, and insert/join/split — reducing reliance on conversion (MyScript Interactive Ink's differentiator). Detailed tool UX is in the editor PRD; this PRD requires the recognition backing. _Refs: research/handwriting-recognition-ai-and-ml.md §2; research/goodnotes-userguide-inventory.md §"Pen Gestures"._

### 11.3 OCR for images & PDFs

> **PRD-LB-305 · MUST · M4** — **OCR imported images and text-layerless PDFs** on import so their text becomes searchable — explicitly beating Goodnotes (which does **not** OCR imports and only searches PDFs that already carry an OCR layer). Engines: **Apple Vision** (`VNRecognizeTextRequest`, on-device) on Apple; **ML Kit Text Recognition v2 / PaddleOCR** on Android; **Tesseract.js / PaddleOCR-WASM** on Web; TrOCR/cloud only as opt-in for hard cases. _Refs: research/handwriting-recognition-ai-and-ml.md §1.3, §1.5; research/goodnotes-userguide-inventory.md §"No OCR on imported PDFs" (gap)._

### 11.4 Math recognition & solve

> **PRD-LB-306 · MUST · M5** — **Convert-to-math**: lasso an equation → recognise to a typeset expression + **LaTeX** (editable LaTeX, copy as image). Engine: **MyScript Math** or **Apple Math Notes** on-device; **Mathpix** as explicit opt-in cloud for hard/printed/chemistry content. _Refs: research/handwriting-recognition-ai-and-ml.md §4; research/notability.md §"Handwriting → Math", §"LaTeX"._

> **PRD-LB-307 · MUST · M5** — **Solve math** (mock's "Solve math", Pro-gated): produce a **worked, step-by-step** solution written under the ink, with live variable substitution where supported. Cover arithmetic, algebra (linear/quadratic/cubic/quartic, systems), factorisation/expansion, trig, calculus (limits/derivatives/integrals), matrices. Surface confidence and an error/low-confidence state (never a silent canned answer). Free → Upgrade overlay. _Refs: screens §7.4, §14; research/handwriting-recognition-ai-and-ml.md §4; research/goodnotes-userguide-inventory.md §"Math Assist" (scope + exclusions)._

### 11.5 Shape recognition

> **PRD-LB-308 · MUST · M4** — **Shape recognition / beautification**: draw a rough shape and hold → snap to a clean form that stays editable (vertices/handles, stroke+fill styling). Recognise at least line, circle, ellipse, triangle, square/rectangle, polygon, arrow (resolves screens Open Question 9's "rectangle-only" gap). Pipeline: RDP simplify → `$P`/`$Q` (or ML Kit shape classifier) for "which shape" → least-squares circle/ellipse (Taubin/Fitzgibbon) + corner-snapping for "make it perfect"; optional angle-snap to 0/45/90°. _Refs: screens §7.3, Open Question 9; research/handwriting-recognition-ai-and-ml.md §3._

---

## 12. Version history

The mock does not surface version history; Locked Decisions require an append-only op-log + periodic snapshots. This section makes history a user feature and counters competitors' foot-guns.

> **PRD-LB-340 · MUST · M6** — Each notebook MUST keep **version history** = periodic `VersionSnapshot`s + the CRDT op-log. Users MUST be able to browse timestamped versions, preview a version, and **restore as a separate copy** (non-destructive — never overwrite current), matching Notability/Goodnotes' safe-restore model. _Refs: research/notability.md §"Version History"._

> **PRD-LB-341 · MUST · M6** — Snapshots MUST be taken on meaningful boundaries (session end, major edit batches, before a destructive op like clear-page or template change, before restore) and coalesced to bound storage. Restoring MUST be possible at page and notebook granularity. _Refs: research/notability.md §"Version History" (retention behaviour)._

> **PRD-LB-342 · SHOULD · M6** — **Retention**: local history is kept until storage pressure; cloud-backed retention SHOULD be **Free ≥ 30 days** (beating Notability's 7-day free) and **Pro ≥ 365 days** — confirm exact tiers with the pricing doc. Renaming or moving a notebook MUST NOT clear its history (counter Notability). _Refs: research/notability.md §"7/30/90-day tiers", §"renaming clears history"; research/pricing-monetization-and-student-verification.md (verify)._

---

## 13. Multi-profile data isolation

Resolves screens Open Questions 15–16.

> **PRD-LB-350 · MUST · M1** — The following are **per-profile** and switch entirely when the active profile changes: notebooks, folders, subjects, tags, covers, recents, favourites, trash, look/theme, wallpaper, and prefs (mock only changes the avatar/greeting today — that is a mock gap). _Refs: screens Open Question 15._

> **PRD-LB-351 · MUST · M6** — The following are **per-account** (shared across a user's profiles): identity, entitlement/plan, student-verification status, and cloud backup destination. Sync store MUST partition content per-profile. Wallpaper is per-device (localStorage today). _Refs: screens Open Question 16, §12._

---

## 14. Free vs Pro gating (this PRD's surfaces)

Single source of truth for gates in scope; the pricing doc governs prices. Where research warns a gate breeds resentment, the "Sane stance" column records our deliberate softening.

| Capability | Free | Pro | Sane stance / source |
|---|---|---|---|
| Notebooks, folders, tags, pages | Unlimited | Unlimited | Never gate core organisation |
| Handwriting **search** (on-device) | ✓ | ✓ | **Free** — counter Notability's resented paywall (research/notability.md) |
| Handwriting **convert-to-text** | ✗ (Upgrade) | ✓ | Mock gate (screens §7.4) — search free, convert Pro |
| Solve math | ✗ (Upgrade) | ✓ | Mock gate (screens §7.4) |
| PDF imports | **5 / month** | Unlimited | Mock gate (screens §9); meter in sidebar |
| Audio recording length | **30 min / recording** | Unlimited | Mock gate (screens §7.6); hard-stop + prompt |
| On-device transcript | ✓ | ✓ | Free — private path not paywalled |
| Cloud transcript / summaries | limited/preview | ✓ | MAY meter (research/goodnotes §"AI credits") |
| Ask my notes | Preview (quota) | ✓ full | Mock "PRO PREVIEW" (screens §11) |
| Templates | Blank/Lined/Grid/Dotted/Cornell | All + store | screens §14 |
| Covers | ✓ | ✓ | Free — unlike Notability |
| Export everything (PDF + .sanenote) | ✓ | ✓ | Free — anti-lock-in (screens §12) |
| Version history retention | ≥30 days | ≥365 days | Beat Notability's 7-day free |
| Sharing people per notebook | 3 | Unlimited | Mock gate (screens §10) |

_Refs: screens §14; research/notability.md §"Pricing" & complaints; research/goodnotes-userguide-inventory.md §"Pricing"._

---

## 15. Cross-cutting acceptance & performance targets

These bind the requirements above to the project's perf budgets (Locked Decision 7) and MUST be enforced by CI perf tests / the device lab.

| Target | Budget | Applies to |
|---|---|---|
| Open a 1,000-page notebook | < 1 s | Library open (PRD-LB-008) |
| Scroll a 600-page PDF | 60 fps | PDF (PRD-LB-135) |
| Library grid scroll (500 notebooks) | 60 fps, no frame > 16.7 ms | Library (PRD-LB-005) |
| Search first results | < 300 ms for on-device FTS over a typical library | Search (PRD-LB-262) **verify** |
| Thumbnail generation | off UI isolate; never blocks scroll | Covers (PRD-LB-042) |
| Audio memory | audio + peaks streamed, not fully resident | Audio (PRD-LB-224) |
| Cold start (library ready) | < 1.5 s iPad / < 2 s mid-Android / < 3 s cached web | Library shell (PRD-LB-007) |

> **PRD-LB-360 · MUST · M1** — All list/grid surfaces MUST virtualise (render only visible rows) and paginate the underlying query so libraries of thousands of notebooks and notebooks of thousands of pages stay within the budgets above. _Refs: Locked Decision 7; research/pdf-and-audio-technology.md §A.5._

> **PRD-LB-361 · MUST · M1** — Every long-running operation (import, OCR, transcription, indexing, export, thumbnailing) MUST run off the UI isolate, show progress, be cancellable, and fail into a clear, retryable error state — resolving the mock's undefined offline/error/loading states. _Refs: screens Open Question 18._

---

## 16. Accessibility & localisation hooks (in-scope surfaces)

> **PRD-LB-370 · MUST · M1** — All library/search/media chrome MUST meet WCAG 2.2 AA and be fully operable and labelled under VoiceOver/TalkBack. Recognised-text (handwriting/OCR) MUST back **OCR descriptions of handwritten content** for screen readers. _Refs: Locked Decision 10; research/accessibility-i18n-and-inclusive-design.md; research/notability.md §"Accessibility"._

> **PRD-LB-371 · SHOULD · M4** — Recognition, transcription, and translation language pickers MUST expose the full on-device language set and default to the device locale; RTL (Arabic) layouts MUST be correct in library and search. _Refs: Locked Decision 10; research/handwriting-recognition-ai-and-ml.md §9._

---

## 17. Resolved & remaining open questions

**Resolved by this PRD** (with the requirement that resolves each screens Open Question):

| screens Q | Topic | Resolved by |
|---|---|---|
| 2 | Trash non-functional | PRD-LB-065/066/067 |
| 3 | No rename/delete/move | PRD-LB-060/061/062 |
| 4 | Favourite toggle | PRD-LB-039 |
| 5 | Audio scope / multi-page | PRD-LB-212/220 |
| 6 | 30-min free limit behaviour | PRD-LB-225 |
| 7 | Ask-my-notes preview | PRD-LB-266 |
| 8 | Canned convert/solve | PRD-LB-303/307 |
| 9 | Shape tool scope | PRD-LB-308 |
| 10 | Image tool → PDF import | PRD-LB-180/181 |
| 11 | Page reorder/delete | PRD-LB-142 |
| 12 | Freeform navigation | PRD-LB-091 |
| 14 | Search result → page mapping | PRD-LB-261 |
| 15 | Multi-profile isolation | PRD-LB-350 |
| 16 | Theme scope per profile | PRD-LB-351 |

**Remaining open questions for the maintainer:**

1. **Exact free quotas** for Ask-my-notes (asks/month) and cloud transcription/summaries — pending the pricing doc.
2. **Version-history retention tiers** (proposed Free ≥30 d / Pro ≥365 d) — confirm against storage-cost model.
3. **Template store monetisation** — Pro-unlock vs individual purchase vs both (PRD-LB-096).
4. **Commercial PDF SDK escape hatch** — if the DIY annotation layer can't reach Goodnotes parity in budget, do we adopt Nutrient/Apryse (per-year cost)? Decision gate at end of M2. _Refs: research/pdf-and-audio-technology.md §A.8._
5. **MyScript vs ML-Kit-only** for recognition — MyScript is best-in-class but a paid, contract-based, connectivity-dependent dependency; ML-Kit-only keeps it free/open. Decide before M4 hardening. _Refs: research/handwriting-recognition-ai-and-ml.md §1.1._
6. **Skip-silence + Voice Boost** are build-it-yourself (no package) — confirm they're in M3/M4 scope.
7. **Archive vs Trash** (PRD-LB-068) — ship both, or fold archive into a tag? Product call.

---

## 18. Cross-references

- Editor / ink / tools / palette / page rail: [`docs/product/prd-01-editor-ink-brushes.md`](prd-01-editor-ink-brushes.md) — owns pen/highlighter/eraser/lasso/shape/text tool UX, the palette dock, focus mode, undo/redo, and freeform pan/zoom controls this PRD depends on.
- Identity, local-first CRDT sync, E2EE, entitlements: [`docs/product/prd-03-identity-sync-privacy-settings-billing.md`](prd-03-identity-sync-privacy-settings-billing.md) — owns account, sync/keys, and the entitlement service that backs the plan meters here. Sharing, the Share overlay (screens §10), collaboration and the relay live in [`docs/product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md`](prd-04-sharing-collaboration-ai-study-a11y-i18n.md).
- Design source of truth: [`docs/design/screens-and-flows.md`](../design/screens-and-flows.md), [`docs/design/design-system.md`](../design/design-system.md), [`docs/design/tokens.json`](../design/tokens.json).
- Architecture decision: [`docs/adr/0001-flutter-single-codebase.md`](../adr/0001-flutter-single-codebase.md) — Flutter stack, PDF/audio/recognition engine choices, and the SN-INK latency spike exit criterion.
- Security & privacy: [`SECURITY.md`](../../SECURITY.md), [`docs/security/threat-model.md`](../security/threat-model.md) (STRIDE + LINDDUN) — E2EE of blobs, on-device recognition posture, recording-consent handling.
- Research sources (committed): `docs/research/sources/` — chiefly `goodnotes-userguide-inventory.md`, `notability.md`, `pdf-and-audio-technology.md`, `handwriting-recognition-ai-and-ml.md`, and `user-pain-points-and-market-gaps.md`.

---

## 19. Additional requirements — competitor & design parity (2026-09-13 gap-closure pass)

These close library/document/media/search/recognition gaps found by auditing the competitor teardowns (`research/goodnotes-userguide-inventory.md`, `research/notability.md`, `research/onenote.md`, `research/apple-notes-freeform.md`, `research/samsung-notes-nebo-other.md`) against §2–§16. IDs continue the PRD-LB sequence; all inherit the governing constraints (§1.2).

### 19.1 Organization

> **PRD-LB-380 · SHOULD · M4** — Ship a small set of **predefined quick-tags** (e.g. To-do, Important, Question, Definition, Review) alongside free-form tags (PRD-LB-036), and a **tagged-items roll-up** view listing every tagged page/notebook grouped by tag with jump-to-source. _Refs: research/onenote.md §1 (tags + Find Tags summary); research/apple-notes-freeform.md §1 (Tag Browser)._

### 19.2 Pages, PDF & documents

> **PRD-LB-381 · SHOULD · M3** — Support **converting a page (or notebook) between page kinds** — paged ↔ freeform — preserving objects; ink/text is remapped into the target geometry and the conversion is undoable (Goodnotes "Convert to Whiteboard"). _Refs: research/goodnotes-userguide-inventory.md §Page management._

> **PRD-LB-382 · SHOULD · M3** — Support **merging / combining PDFs and notebooks**: append one PDF's/notebook's pages into another and reorder across the merge (Flexcil merge/edit pages). Undoable. _Refs: research/samsung-notes-nebo-other.md §Flexcil._

> **PRD-LB-383 · SHOULD · M4** — Provide an **attachments / media browser** listing every image, scan, audio clip, PDF and link across a notebook (and, library-wide, across notebooks) grouped by type, each deep-linking to its page (Apple Notes Attachments browser). _Refs: research/apple-notes-freeform.md §1._

> **PRD-LB-384 · SHOULD · M5** — Support **excerpt-to-note**: drag selected PDF text or an image region out of a PDF page into a note, creating an editable excerpt that keeps a **back-reference link** to its PDF source (ties to backlinks, `prd-04` §6). This is the Flexcil/LiquidText spatial-study workflow. _Refs: research/samsung-notes-nebo-other.md §Flexcil, §LiquidText._

> **PRD-LB-385 · MAY · M3** — Offer a **side-by-side multi-page PDF view** (1/2/4-up) for reading, distinct from continuous scroll (PRD-LB-011) (Flexcil split view). _Refs: research/samsung-notes-nebo-other.md §Flexcil._

### 19.3 Recognition — dictionary, spellcheck, detectors

> **PRD-LB-386 · SHOULD · M4** — Provide a **custom recognition dictionary**: users add words/abbreviations to improve handwriting recognition and reduce false spell-flags, per-profile and language-scoped (Goodnotes Personal Dictionary; Nebo custom dictionary). _Refs: research/goodnotes-userguide-inventory.md §On-device AI; research/samsung-notes-nebo-other.md §Nebo._

> **PRD-LB-387 · SHOULD · M5** — Provide **handwriting spellcheck**: flag likely misspellings in ink and, on tap, correct them **while preserving the writer's handwriting style**; per-notebook language, disable-able, on-device by default (decision 6) (Goodnotes Spellcheck; Apple Smart Script correct-spelling; Samsung spell/grammar). _Refs: research/goodnotes-userguide-inventory.md §On-device AI; research/apple-notes-freeform.md §2._

> **PRD-LB-388 · MAY · M4** — Run **data detectors** over recognised handwriting and typed text to surface actionable phone numbers, emails, URLs and dates (tap to call/mail/open/schedule), on-device; URLs sanitised per PRD-ED-108 (Samsung Action icons). _Refs: research/samsung-notes-nebo-other.md §Samsung._

### 19.4 Media

> **PRD-LB-389 · MAY · M5** — Support **video note capture** and **online-video embeds** (paste a YouTube/Vimeo URL → playable inline preview) as media objects; embeds fetch only on explicit user play, never autoplay/beacon (OneNote video record + embeds; Goodnotes Text-Doc video). _Refs: research/onenote.md §4, §6; research/goodnotes-userguide-inventory.md §Text Document._

### 19.5 Capture & import (extends §7.2)

> **PRD-LB-390 · MAY · M6** — Provide a **web clipper / read-it-later capture**: save a web article (readable text + images) into a note via the OS share-target (`prd-04` PRD-CO-274) or a browser extension, formatted/OCR'd on-device (OneNote Web Clipper). _Refs: research/onenote.md §1 (Web Clipper)._

> **PRD-LB-391 · MAY · M6** — Optionally support **email-to-import**: a per-user ingest alias that turns an emailed PDF/image into a library import (Goodnotes "Email to Goodnotes"). **verify** infrastructure — needs a minimal ingest relay and MUST NOT weaken the zero-server / zero-knowledge posture (attachments encrypted before landing in the user's own store); if it cannot, defer. _Refs: research/goodnotes-userguide-inventory.md §Import methods._

### 19.6 Translation (extends §11; cross-ref prd-04 §4)

> **PRD-LB-392 · SHOULD · M5** — Support **whole-document translation** of a page/PDF (typed + OCR'd text) into a chosen language, shown as an overlay or side view and preserving the original; on-device by default with explicit cloud opt-in. Note-content translation is the Sage feature `prd-04` PRD-CO-156 and never mutates the original (Samsung PDF translation; Nebo). _Refs: research/samsung-notes-nebo-other.md §Samsung (PDF translation)._
