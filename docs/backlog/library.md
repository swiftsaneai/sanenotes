# Backlog — area: library

31 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-LIB-001](library.md#sn-lib-001) **Build the notebook Library: organise, find and manage notebooks** (epic · M2 Library & Documents)
  - [SN-LIB-002](library.md#sn-lib-002) **Build the Library home screen scaffold and region layout** · p1 · feature · L · M2 Library & Documents
    - [SN-LIB-004](library.md#sn-lib-004) **Add the Library header with greeting, date and primary actions** · p2 · task · S · M2 Library & Documents
  - [SN-LIB-003](library.md#sn-lib-003) **Implement the per-profile library data layer and repository** · p1 · feature · L · M2 Library & Documents
  - [SN-LIB-005](library.md#sn-lib-005) **Implement notebook grid/list views with view toggle and filter chips** · p1 · feature · L · M2 Library & Documents
    - [SN-LIB-007](library.md#sn-lib-007) **Add the library sort menu (modified/created/name/type)** · p3 · task · S · M2 Library & Documents
    - [SN-LIB-013](library.md#sn-lib-013) **Add the notebook favourite toggle with sidebar sync** · p3 · task · S · M2 Library & Documents
  - [SN-LIB-006](library.md#sn-lib-006) **Build the 'Pick up where you left off' recents rail** · p2 · feature · M · M2 Library & Documents
  - [SN-LIB-008](library.md#sn-lib-008) **Implement library empty, loading, error and offline states** · p2 · feature · M · M2 Library & Documents
  - [SN-LIB-009](library.md#sn-lib-009) **Wire the sidebar navigation (All, Recent, Favorites, Shared, Trash)** · p1 · feature · M · M2 Library & Documents
  - [SN-LIB-010](library.md#sn-lib-010) **Implement subjects: model, six seeds, CRUD and colour spine** · p1 · feature · M · M2 Library & Documents
  - [SN-LIB-011](library.md#sn-lib-011) **Implement folders with unlimited nesting, breadcrumb and move** · p1 · feature · L · M2 Library & Documents
  - [SN-LIB-012](library.md#sn-lib-012) **Implement tags: many-to-many, inline create, global rename, page tags** · p1 · feature · L · M2 Library & Documents
  - [SN-LIB-014](library.md#sn-lib-014) **Generate notebook thumbnails off-isolate with a disk cache** · p2 · feature · M · M2 Library & Documents
  - [SN-LIB-015](library.md#sn-lib-015) **Implement notebook covers (preset, custom image, first PDF page)** · p3 · feature · M · M2 Library & Documents
  - [SN-LIB-016](library.md#sn-lib-016) **Build the notebook overflow menu and lifecycle actions** · p1 · feature · L · M2 Library & Documents
  - [SN-LIB-017](library.md#sn-lib-017) **Implement bulk multi-select actions in the library** · p2 · feature · M · M2 Library & Documents
  - [SN-LIB-018](library.md#sn-lib-018) **Implement Quick Note for one-tap capture** · p2 · feature · M · M2 Library & Documents
  - [SN-LIB-019](library.md#sn-lib-019) **Implement Trash: soft-delete, restore and 30-day auto-purge** · p1 · feature · L · M2 Library & Documents
  - [SN-LIB-020](library.md#sn-lib-020) **Propagate trash deletes as cloud tombstones across devices** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-LIB-021](library.md#sn-lib-021) **Implement drag & drop to organise notebooks and folders** · p2 · feature · M · M2 Library & Documents
  - [SN-LIB-022](library.md#sn-lib-022) **Add per-notebook look/theme override in notebook settings** · p3 · feature · M · M2 Library & Documents
  - [SN-LIB-023](library.md#sn-lib-023) **Enforce multi-profile data isolation across the library** · p1 · feature · M · M2 Library & Documents
  - [SN-LIB-024](library.md#sn-lib-024) **Adapt the library layout for phones and narrow web** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-LIB-025](library.md#sn-lib-025) **Virtualise and paginate library grid, list and page collections** · p1 · task · M · M2 Library & Documents
  - [SN-LIB-026](library.md#sn-lib-026) **Implement smart collections (saved filters) in the sidebar** · p3 · feature · M · M4 Identity, Sync & Privacy
  - [SN-LIB-027](library.md#sn-lib-027) **Add an Archive state for non-destructive hide-from-library** · p3 · feature · S · M2 Library & Documents
  - [SN-LIB-028](library.md#sn-lib-028) **Add library golden, widget and integration tests with a11y coverage** · p2 · test · M · M2 Library & Documents
  - [SN-GUX-011](library.md#sn-gux-011) **Implement the sidebar brand row, plan label and profile switcher** · p1 · feature · S · M2 Library & Documents
  - [SN-GCMP-007](library.md#sn-gcmp-007) **Build the attachments and media browser (by type)** · p2 · feature · M · M2 Library & Documents

---

## Issues

### SN-GCMP-007

<a id="sn-gcmp-007"></a>

**Build the attachments and media browser (by type)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-MED-002](images-media.md#sn-med-002), [SN-CORE-014](storage.md#sn-core-014) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Apple Notes offers an attachments browser that gathers every image, scan, PDF, sketch and link across notes into one type-filtered gallery, which is a fast way to find media without remembering which note holds it (docs/research/competitor-feature-matrix.md section 10; PRD-LB-383 from the 2026-09-13 pass). No tracker issue provides a cross-library media view; today media is only reachable inside its host page. For a heavy library this is a real retrieval gap.

#### Scope
**In:** a per-profile browser listing all attachments (images, scans, PDFs, audio, GIFs, links) grouped/filtered by type, with jump-to-source; thumbnails generated off-isolate; search/sort within the browser; respect trash and multi-profile isolation.
**Out:** editing media (that lives in the editor [SN-ED-014](editor.md#sn-ed-014), [SN-MED-006](images-media.md#sn-med-006)); the global full-text search screen ([SN-SRCH-006](search.md#sn-srch-006)); export ([SN-SHR-002](sharing-export.md#sn-shr-002)).

#### Acceptance criteria
- [ ] The browser enumerates every attachment for the active profile, grouped by type with a type filter.
- [ ] Tapping an item deep-links to its exact page/anchor in the host notebook.
- [ ] Thumbnails render from the disk cache off the UI isolate; the list virtualises for large libraries.
- [ ] Trashed and locked-notebook attachments are excluded (per [SN-LIB-019](library.md#sn-lib-019), [SN-GCMP-002](security.md#sn-gcmp-002)).
- [ ] Multi-profile isolation holds: no attachment from another profile appears.

#### Technical notes
Build a query over the blob store and media object index ([SN-CORE-014](storage.md#sn-core-014), [SN-MED-002](images-media.md#sn-med-002)) joined to their host page/notebook, exposed by the library data layer ([SN-LIB-003](library.md#sn-lib-003)). Reuse thumbnail caching ([SN-LIB-014](library.md#sn-lib-014)/[SN-PG-010](pages-canvas.md#sn-pg-010)) and virtualisation ([SN-LIB-025](library.md#sn-lib-025)). Deep-link via the route table ([SN-NOTF-004](notifications.md#sn-notf-004)). Reference PRD-LB-383 and docs/design/screens-and-flows.md library section.

#### Security & privacy
Enforce profile isolation ([SN-AUTH-013](auth.md#sn-auth-013), [SN-LIB-023](library.md#sn-lib-023)) and locked-content exclusion ([SN-GCMP-002](security.md#sn-gcmp-002)). No new network egress. Strip nothing already stripped (EXIF handled at ingest [SN-MED-004](images-media.md#sn-med-004)).

#### UX notes
Grid with type chips; empty state per type; loading skeletons; accessible labels/alt-text carried from [SN-MED-010](images-media.md#sn-med-010). Follows library grid tokens.

#### Test plan
Unit: attachment query + type grouping + isolation (test/library/media_browser_test.dart). Widget: filter chips, deep-link. Integration: 1,000+ attachment virtualisation; trashed/locked exclusion. Golden: grid across looks.

#### Dependencies
[SN-LIB-003](library.md#sn-lib-003), [SN-MED-002](images-media.md#sn-med-002), [SN-CORE-014](storage.md#sn-core-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GUX-011

<a id="sn-gux-011"></a>

**Implement the sidebar brand row, plan label and profile switcher**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, design-system, brand |
| Size | S |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-DS-020](design-system.md#sn-ds-020), [SN-BRD-003](brand.md#sn-brd-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-3` |
| Extra labels | agent-ready |

#### Context

`docs/design/screens-and-flows.md` §2 lays the sidebar out top to bottom: a **brand row** (Sage mark + the "Sane" wordmark + the plan label "Free · Student" / "Pro · Student"), the search launcher, the nav list, subjects, then a bottom block containing the free-plan card, Settings and the **profile switcher** (avatar + name + note → Profiles screen). `component-inventory.md` §3 names both components (`SaneBrandRow`, `SaneProfileSwitcher`). Neither has an owner: [SN-DS-020](design-system.md#sn-ds-020) builds the shell and explicitly puts both out of scope as "app/library compositions", [SN-LIB-009](library.md#sn-lib-009) wires only the five nav items and the subjects list and punts the upsell card elsewhere, and a search of the whole backlog for "profile switcher" returns nothing. The sidebar is on every non-fullscreen screen, so these are the two most-seen components in the product.

#### Scope

**In:** `SaneBrandRow` — the Sage mark at ≥ 24 px with clear space equal to the hat-brim height, the wordmark rendered in the **display face of the active look** with "Sane" at weight 600 and (where the full name is shown) "Notes" at 400 in `--mu`, tracking −.01em, plus the plan label fed by the entitlement provider with the student suffix; the 68 px rail variant that keeps the mark and drops the wordmark and label; `SaneProfileSwitcher` — avatar (initial, per-profile colour), name, note, current-profile ring, tap routes to the Profiles screen, target ≥ 44 pt / 48 dp, accessible name like "Switch profile, currently Riya, B.Tech · Physics minor"; guest and signed-out variants.

**Out:** the mascot asset and its tile grounds ([SN-BRD-003](brand.md#sn-brd-003)), the Profiles screen itself ([SN-ONB-009](onboarding.md#sn-onb-009)), profile CRUD and switching logic ([SN-AUTH-007](auth.md#sn-auth-007), [SN-AUTH-015](auth.md#sn-auth-015)), the free-plan upsell card and meters ([SN-GUX-012](billing.md#sn-gux-012)), the search launcher ([SN-SRCH-007](search.md#sn-srch-007)), and the sidebar chrome ([SN-DS-020](design-system.md#sn-ds-020)).

#### Acceptance criteria

- [ ] Both components render correctly in all 17 looks × light/dark, in the 248 px sidebar and the 68 px rail, and in wallpaper mode over a frosted surface.
- [ ] The plan label updates live when a trial starts ([SN-BILL-011](billing.md#sn-bill-011)) or an entitlement is restored, and reads "Free · Student" / "Pro · Student" only when student status is verified; otherwise "Free" / "Pro".
- [ ] Guest mode shows a guest identity with a plain line about notes staying on this device — never an empty avatar or a sign-in nag ([SN-AUTH-010](auth.md#sn-auth-010)).
- [ ] The mark is never recoloured, stretched, flipped or cropped: the widget exposes only a size parameter, and a test asserts a uniform-scale, unflipped render at ≥ 24 px.
- [ ] Text does not truncate or overflow in the pseudo-locale (+40%) at either sidebar width; the layout mirrors correctly under RTL.
- [ ] Accessibility: mark is decorative (`ExcludeSemantics`) when the wordmark is present; the switcher exposes name, role (button), and the current profile as its value.

#### Technical notes

Compose from `SaneSurface`, `SaneText` (`displayS`/`muted`/`label` roles), `SaneAvatar` and `SaneSageMark`; read the plan from the entitlement provider ([SN-BILL-004](billing.md#sn-bill-004)) behind a narrow interface so the library layer does not depend on billing internals. Place in `app/lib/features/library/widgets/` (or `sane_ui` if the coverage gate [SN-GUX-006](design-system.md#sn-gux-006) assigns them there — update `component-owners.json` accordingly). The wordmark must use `--fd` of the active look; it is text, not an image, so it restyles with the look and stays localisable. Reads the active-profile provider ([SN-AUTH-007](auth.md#sn-auth-007)) and plan via the entitlement provider ([SN-BILL-004](billing.md#sn-bill-004)) behind narrow interfaces; a single-profile stub is used until profiles land in M4.

#### Security & privacy

The profile name and note are user content and appear in the persistent chrome: they must be excluded from screenshots and app-switcher snapshots when a profile or app lock is engaged ([SN-SEC-019](security.md#sn-sec-019), [SN-AUTH-014](auth.md#sn-auth-014)), must never be written to logs or telemetry ([SN-SEC-021](security.md#sn-sec-021), MASVS-PRIVACY-1), and the switcher must not reveal other profiles' notebook counts or activity, preserving per-profile isolation ([SN-AUTH-013](auth.md#sn-auth-013)). Plan state is read-only client-side and fails closed to Free ([SN-BILL-005](billing.md#sn-bill-005)).

#### UX notes

References: `screens-and-flows.md` §2 and §4, `component-inventory.md` §3, `design-system.md` §1 (wordmark weights and tracking, mark rules). Voice: the plan label is a fact, not an advert — the upsell lives in the card below it ([SN-GUX-012](billing.md#sn-gux-012)). The switcher's note ("Sibling · Class 12 · JEE prep") is what makes multi-profile feel personal; keep it, and truncate with an ellipsis plus a tooltip rather than dropping it.

#### Test plan

`app/test/features/library/brand_row_test.dart` (plan label states: free, pro, student, guest; rail variant; pseudo-locale; RTL), `app/test/features/library/profile_switcher_test.dart` (semantics, target size, routing, locked-profile redaction). Golden: both components across a representative look per family × light/dark, plus wallpaper mode. Manual: switch profiles and start a trial with the sidebar open.

#### Dependencies
[SN-DS-020](design-system.md#sn-ds-020), [SN-BRD-003](brand.md#sn-brd-003). The profile switcher and plan label read the active-profile provider ([SN-AUTH-007](auth.md#sn-auth-007)) and the entitlement provider ([SN-BILL-004](billing.md#sn-bill-004)) behind narrow interfaces; a single-profile (guest) stub is used until profiles land in M4, so SN-AUTH-007 is not a scheduling blocker.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-LIB-001

<a id="sn-lib-001"></a>

**Build the notebook Library: organise, find and manage notebooks**

| Field | Value |
|---|---|
| GitHub | #18 |
| Type | epic |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, storage, privacy |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

The Library is the app's home after the profile picker — the surface where a student finds, organises and manages every notebook (design 'Library' screen; `docs/design/screens-and-flows.md` §6). Today the design mock only *opens* notebooks: it has no rename, delete, move, duplicate, favourite or trash affordance (screens Open Questions 2–4), and the Trash view renders permanently empty. This epic turns that inert mock into a real, local-first notebook manager per `docs/product/prd-02-library-documents-audio-search.md` §3–§5: the home screen (greeting, 'pick up where you left off', filter chips, grid/list), subjects with colour spines, folders with unlimited nesting, first-class tags, favourites, recents, shared, covers, sorting and in-library filtering, notebook lifecycle (rename/duplicate/change-subject/move/export hook), bulk actions, drag & drop, quick note, trash + restore + 30-day auto-purge, per-notebook look override, multi-profile data isolation, and the adaptive phone/web layout.

All library entities live in the local SQLite store as the source of truth and MUST be fully functional with no account and no network (guest mode; PRD-LB-001, Locked Decision 3). The library metadata is the Library CRDT doc (a movable-tree, one per Profile) from `docs/architecture/document-model.md` §1 and ADR-0005 (`docs/adr/0005-document-model-and-crdt.md`); it is deliberately split from page contents so browsing/reorder/rename stay instant even when heavy page payloads are evicted. This epic is the heart of milestone M2 (`docs/roadmap.md`).

#### Scope

**In:** every organisation/management surface in PRD-02 §3–§5 — subjects, folders, tags, favourites, recents, shared, covers, thumbnails, trash/restore/purge, sort, in-library filter, bulk actions, drag & drop, quick note, per-notebook look, multi-profile isolation, adaptive layout, and the library-level perf/virtualisation and a11y.

**Out (referenced, not built here):** templates & paper (SN-TPL-001), PDF (SN-PDF-001), images & media (SN-MED-001), audio (SN-AUD-001), global search & recognition (SN-SRCH-001, SN-HWR-001), sharing/export/collaboration (SN-SHR-001, SN-COL-001), version history, identity/auth (SN-AUTH-001), and sync transport (SN-SYNC-001).

#### Acceptance criteria

- [ ] Every child issue below is merged, CI green, and its own acceptance criteria met.
- [ ] Open a 1,000-page notebook in < 1 s and scroll a 500-notebook grid at 60 fps with no frame > 16.7 ms (PRD-LB-360, §15).
- [ ] Switching the active profile swaps the entire visible dataset — notebooks, folders, subjects, tags, favourites, trash, look/wallpaper/prefs — not just the avatar (PRD-LB-350).
- [ ] Trash soft-delete + restore + 30-day auto-purge works, is undoable, and never destroys recoverable data before causal stability (PRD-LB-065/066).
- [ ] The library is fully usable as a guest and fully offline; nothing logs note titles, tags or content.
- [ ] Every library surface renders correctly across all 17 looks + dark mode and meets WCAG 2.2 AA.

#### Children

- [ ] [SN-LIB-002](library.md#sn-lib-002) Library home screen scaffold
- [ ] [SN-LIB-003](library.md#sn-lib-003) Library data layer & repository (per-profile)
- [ ] [SN-LIB-004](library.md#sn-lib-004) Library header (greeting, date, primary actions)
- [ ] [SN-LIB-005](library.md#sn-lib-005) Notebook grid/list views + view toggle + filter chips
- [ ] [SN-LIB-006](library.md#sn-lib-006) 'Pick up where you left off' recents rail
- [ ] [SN-LIB-007](library.md#sn-lib-007) Sort menu
- [ ] [SN-LIB-008](library.md#sn-lib-008) Empty, loading, error & offline states
- [ ] [SN-LIB-009](library.md#sn-lib-009) Sidebar navigation (All/Recent/Favorites/Shared/Trash)
- [ ] [SN-LIB-010](library.md#sn-lib-010) Subjects (model, seed, CRUD, colour spine)
- [ ] [SN-LIB-011](library.md#sn-lib-011) Folders & unlimited nesting
- [ ] [SN-LIB-012](library.md#sn-lib-012) Tags (many-to-many, inline, global rename, page tags)
- [ ] [SN-LIB-013](library.md#sn-lib-013) Favourite toggle
- [ ] [SN-LIB-014](library.md#sn-lib-014) Notebook thumbnails (background render + disk cache)
- [ ] [SN-LIB-015](library.md#sn-lib-015) Notebook covers
- [ ] [SN-LIB-016](library.md#sn-lib-016) Notebook overflow menu & lifecycle actions
- [ ] [SN-LIB-017](library.md#sn-lib-017) Bulk multi-select actions
- [ ] [SN-LIB-018](library.md#sn-lib-018) Quick Note
- [ ] [SN-LIB-019](library.md#sn-lib-019) Trash, restore & 30-day auto-purge
- [ ] [SN-LIB-020](library.md#sn-lib-020) Trash cloud tombstone propagation
- [ ] [SN-LIB-021](library.md#sn-lib-021) Drag & drop organise
- [ ] [SN-LIB-022](library.md#sn-lib-022) Per-notebook look/theme override
- [ ] [SN-LIB-023](library.md#sn-lib-023) Multi-profile data isolation
- [ ] [SN-LIB-024](library.md#sn-lib-024) Phone & web adaptive library layout
- [ ] [SN-LIB-025](library.md#sn-lib-025) Library virtualisation & pagination
- [ ] [SN-LIB-026](library.md#sn-lib-026) Smart collections (saved filters)
- [ ] [SN-LIB-027](library.md#sn-lib-027) Archive state
- [ ] [SN-LIB-028](library.md#sn-lib-028) Library golden, widget & integration tests + a11y

#### Technical notes

Library read model + repository interfaces live in `packages/sane_core` (pure Dart, the Library doc movable-tree per ADR-0005); local persistence via drift/SQLite from SN-CORE-004; UI components from `packages/sane_ui` §4 (`docs/design/component-inventory.md`). Screen composition, routing (go_router) and cross-feature Riverpod providers live in `app/` per ADR-0003 (`docs/adr/0003-state-management-and-app-structure.md`) and ADR-0002 layout. Entity fields (Notebook/Folder/Subject/Tag/Cover/TrashEntry) are in PRD-02 §2 and `document-model.md` §1.2.

#### Security & privacy

Per-profile data isolation is an access-control + privacy boundary (OWASP-A01, MASVS-PRIVACY-1/2, ASVS V8); notebook titles and tags are encrypted metadata (MASVS-STORAGE-1); no note title/tag/content or PII in logs (CWE-532, MASVS-PRIVACY-3); cover/thumbnail images from untrusted sources decode off the UI isolate under resource caps (MASVS-CODE-4, CWE-400). Children carry the specific IDs.

#### UX notes

Delivers the 'Library' screen (screens §6) and sidebar (screens §2) across all 17 looks + dark mode, honouring every cross-cutting state in `docs/design/component-inventory.md` §9 (default/hover/pressed/focus/selected/disabled/loading/error/empty/RTL/reduce-motion). Components: `SaneNotebookCard`, `SaneNotebookRow`, `SaneRecentCard`, `SaneChipBar`, `SaneViewToggle`, `SaneEmptyState`, `SaneSkeleton`, `SaneSidebar`.

#### Test plan

Children name their own tests. Epic-level gates: golden coverage of the library across looks + dark ([SN-LIB-028](library.md#sn-lib-028)); integration flows (create → organise → trash → restore); and the perf harness proving the open-1000-page and 500-card-scroll budgets ([SN-LIB-025](library.md#sn-lib-025)).

#### Dependencies

SN-CORE-002 (entities), SN-CORE-004 (drift persistence), SN-DS-001/SN-DS-020 (design system + nav shell), SN-FND-002 (scaffold); SN-AUTH-007 (local profiles) for profile switching. Children carry finer-grained `depends_on`.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-002

<a id="sn-lib-002"></a>

**Build the Library home screen scaffold and region layout**

| Field | Value |
|---|---|
| GitHub | #327 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-DS-020](design-system.md#sn-ds-020), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The Library is the home surface after the profile picker (`docs/design/screens-and-flows.md` §6). This issue builds the screen scaffold that hosts every other library surface: the region stack (header → optional 'pick up where you left off' rail → notebook section title + filter chips + grid/list toggle → grid or list body) and the routing/state wiring that binds it to the sidebar nav and library repository. It is the container the header ([SN-LIB-004](library.md#sn-lib-004)), views ([SN-LIB-005](library.md#sn-lib-005)), recents rail ([SN-LIB-006](library.md#sn-lib-006)) and states ([SN-LIB-008](library.md#sn-lib-008)) slot into. Without it there is no home to render. It implements PRD-LB-004/005/007/008 at the composition level and follows the app-structure decision in ADR-0003 (`docs/adr/0003-state-management-and-app-structure.md`).

#### Scope

**In:** the `LibraryScreen` widget in `app/` and its go_router route; the region layout (header/recents/section/body) driven by the `navItem` (All/Recent/Favorites/Shared/Trash) and `libFilter` (All/subject) state; the section title that reflects nav ('Notebooks'/'Recent'/'Favorites'/'Shared'/'Trash', PRD-LB-007); Riverpod providers that expose the current profile's notebook list, nav and filter to child widgets; opening a card/row → editor at `lastOpenedPage` with the sidebar closed (PRD-LB-008); the responsive scaffold hook that collapses the sidebar below 900 px.

**Out:** the header content ([SN-LIB-004](library.md#sn-lib-004)); the grid/list body and cards ([SN-LIB-005](library.md#sn-lib-005)); recents rail content ([SN-LIB-006](library.md#sn-lib-006)); sort ([SN-LIB-007](library.md#sn-lib-007)); empty/loading states ([SN-LIB-008](library.md#sn-lib-008)); sidebar internals ([SN-LIB-009](library.md#sn-lib-009)); the repository queries ([SN-LIB-003](library.md#sn-lib-003)).

#### Acceptance criteria

- [ ] `LibraryScreen` renders the four regions in order and shows/hides the recents rail only when `navItem == all AND libFilter == All` (PRD-LB-041).
- [ ] The section title matches the active nav item exactly (PRD-LB-007).
- [ ] Changing `navItem` or `libFilter` re-queries the repository and rebuilds only the body, not the whole screen.
- [ ] Tapping a notebook opens it in the editor at `lastOpenedPage` (page 0 for new), sidebar closed, focus off (PRD-LB-008).
- [ ] The scaffold reflows to a single column with an icon-rail sidebar below 900 px without state loss.
- [ ] No note title, tag or content is written to logs (CWE-532).

#### Technical notes

`app/lib/features/library/library_screen.dart` + a `libraryStateProvider` (Riverpod) holding `navItem`/`libFilter`/`libView`/`sort`. Routing via go_router per ADR-0003; the composition root injects the `LibraryRepository` from [SN-LIB-003](library.md#sn-lib-003). Use `sane_ui` layout primitives (adaptive window classes) and `SaneScreenHeader`/`SaneSidebar` slots. Business logic stays out of `build` (CLAUDE.md §6). Reference: `docs/design/component-inventory.md` §4, ADR-0002 for the `app/` boundary.

#### Security & privacy

None beyond baseline: the scaffold renders repository data and must never log note titles/tags/content (CWE-532, MASVS-PRIVACY-3). No network egress from the screen; all data is local. Profile scoping is enforced in the repository ([SN-LIB-023](library.md#sn-lib-023)), not re-implemented here.

#### UX notes

Matches the 'Library' frame in `design/Sane Notes.dc.html` and screens §6 across all 17 looks + dark mode. Region spacing and the section header use design tokens only (`docs/design/design-system.md`). A11y: the screen exposes a logical heading order (greeting → section title), keyboard-reachable regions on web, and 44 pt targets. Reduce-motion: region changes cross-fade, no slide.

#### Test plan

Widget: `app/test/features/library/library_screen_test.dart` (region order; recents-rail visibility rule; section-title-per-nav; tap → editor route with correct args; narrow reflow). Integration seed for [SN-LIB-028](library.md#sn-lib-028).

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (repository), SN-DS-020 (nav shell), SN-DS-003 (controls).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-003

<a id="sn-lib-003"></a>

**Implement the per-profile library data layer and repository**

| Field | Value |
|---|---|
| GitHub | #328 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | library, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Every library surface reads and writes the same underlying data: subjects, folders, tags, covers, favourites, recents and notebook metadata. This issue delivers the single repository that materialises those from the Library CRDT doc (a movable-tree, one per Profile; `docs/architecture/document-model.md` §1) and the drift/SQLite store (SN-CORE-004), exposing them to the UI as fast, virtualisable, per-profile queries returning `Result<T, Failure>` (CLAUDE.md §6). It is the data foundation the whole epic stands on, and it is where the per-profile scoping and the 'open a 1,000-page notebook < 1 s' budget are actually enforced (PRD-LB-001, PRD-LB-350, PRD-LB-360). Splitting the light Library doc from heavy page payloads (document-model §1) is what keeps browsing instant.

#### Scope

**In:** the `LibraryRepository` interface (in `sane_core`) and its drift-backed implementation: paginated notebook queries filtered by `navItem`/`libFilter`/folder/tag with sort; subject/folder/tag/cover CRUD projected onto CRDT ops (`createNode`/`moveNode`/`setAttr`/`setKeyMeta`/tag add-wins set, document-model §2.3); a reactive stream that emits on op-log change; `lastOpenedAt`/`lastOpenedPage` writes on open; a strict `profileId` scope on every query so no query can cross profiles; denormalised counts (per-subject notebook count, tag `usageCount`).

**Out:** the UI screens ([SN-LIB-002](library.md#sn-lib-002), [SN-LIB-005](library.md#sn-lib-005)); trash lifecycle ops ([SN-LIB-019](library.md#sn-lib-019)); thumbnail generation ([SN-LIB-014](library.md#sn-lib-014)); sync transport (SN-SYNC-001); the raw CRDT primitives themselves (SN-CORE-002/003).

#### Acceptance criteria

- [ ] Every query takes a `profileId` and cannot return another profile's rows (unit-tested with two seeded profiles).
- [ ] Listing notebooks is paginated (cursor/offset) and returns the first page for a 500-notebook / 1,000-page library within budget on the reference device.
- [ ] Subject/folder/tag/favourite/cover mutations are expressed as CRDT ops on the Library doc and survive a close/reopen byte-for-byte.
- [ ] The repository exposes a reactive stream so the UI updates without polling.
- [ ] All expected/recoverable failures return `Result<T, Failure>`; nothing throws across the package boundary.
- [ ] No note title, tag text or content is logged; object ids log as opaque short hashes (CWE-532).

#### Technical notes

Interface in `packages/sane_core/lib/src/library/library_repository.dart`; drift implementation in the storage layer from SN-CORE-004. Model the Notebook/Folder/Subject/Tag/Cover fields from PRD-02 §2 and `document-model.md` §1.2 (Notebook: `title` LWW, `colorToken`, `coverBlob`, `lookId`, `parent` POS+LWW, `position` FracIndex, `tags` add-wins set, `trashed`/`deletedAt` LWW). Pure Dart — MUST NOT import `package:flutter` (CLAUDE.md §3 DAG). Mutations go through the op-log per document-model §2. Follows ADR-0005 and ADR-0002.

#### Security & privacy

The `profileId` scope is a privacy/access-control control: a missing scope would let one local profile read another's notebooks (OWASP-A01, MASVS-PRIVACY-2). Titles/tags are encrypted metadata at rest (MASVS-STORAGE-1, `docs/architecture/crypto.md`); the repository holds plaintext only in memory and never logs it (CWE-532, MASVS-PRIVACY-3). No network. Validate/paginate inputs to avoid unbounded query cost.

#### UX notes

No direct UI, but this is where the 'instant library' feel is won or lost (`docs/design/screens-and-flows.md` §6; perf budget §15). Ordering and counts feed the sidebar subject rows and filter chips. Empty results are a normal state the UI renders as an empty state ([SN-LIB-008](library.md#sn-lib-008)), never an error.

#### Test plan

Unit: `packages/sane_core/test/library/library_repository_test.dart` (per-profile isolation with two profiles; pagination correctness; CRDT round-trip of subject/folder/tag/favourite; sort ordering; reactive stream fires on op). Bench: a seeded 500-notebook fixture asserts first-page latency headroom for [SN-LIB-025](library.md#sn-lib-025).

#### Dependencies

SN-CORE-002 (entities), SN-CORE-004 (drift persistence + blob store).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-004

<a id="sn-lib-004"></a>

**Add the Library header with greeting, date and primary actions**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | S |
| SDLC | implementation |
| Parent | [SN-LIB-002](library.md#sn-lib-002) |
| Depends on | [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, good first issue |

#### Context

The Library header sets the personal, calm tone of the home screen: an eyebrow date, a time-of-day greeting using the active profile's name, and the two primary actions (Import PDF, New notebook). It implements PRD-LB-004 and the header described in `docs/design/screens-and-flows.md` §6, rendered by `SaneScreenHeader` (`docs/design/component-inventory.md` §3). It is a small, self-contained unit that depends only on the screen scaffold and the active profile, making it a good first issue.

#### Scope

**In:** the header widget wiring `SaneScreenHeader` (Library variant): eyebrow date formatted per locale (e.g. 'Tuesday, 8 September'); the greeting with correct bucket boundaries — morning < 12:00, afternoon < 17:00, evening < 21:00, else 'Good night' — and the active profile's display name ('Good afternoon, Riya'); an 'Import PDF' action that opens the import overlay (subject to the free-import gate, owned by SN-PDF-001) and a 'New notebook' action that opens the templates overlay in new mode (owned by SN-TPL-001).

**Out:** the import overlay and its free-plan meter (SN-PDF-001); the templates overlay (SN-TPL-001); the greeting name source beyond reading the active profile (SN-AUTH-007).

#### Acceptance criteria

- [ ] The greeting bucket is correct at each boundary (11:59 → morning, 12:00 → afternoon, 16:59 → afternoon, 17:00 → evening, 21:00 → night) — unit-tested with fixed clocks.
- [ ] The greeting uses the active profile's name and updates when the profile switches.
- [ ] The eyebrow date is locale-formatted and RTL-correct (Arabic renders right-aligned).
- [ ] 'Import PDF' and 'New notebook' dispatch the correct overlay intents; both expose accessible names and 44 pt targets.
- [ ] Renders correctly in all 17 looks + dark mode.
- [ ] The profile name is not logged (CWE-532).

#### Technical notes

`app/lib/features/library/library_header.dart` consuming `SaneScreenHeader`. Greeting logic is a pure function `greetingFor(DateTime, name)` unit-tested independently. Date formatting via `intl`/`DateFormat` with the app locale (i18n per Locked Decision 10). Action intents route through the library state; the overlays themselves are other areas' issues. Tokens only (`docs/design/design-system.md`).

#### Security & privacy

None beyond baseline: the greeting displays but never logs the profile name (a personal identifier — CWE-532, MASVS-PRIVACY-3). No network, no storage. Actions dispatch local intents only.

#### UX notes

The header is the first thing a student reads; copy and spacing come from screens §6 and §16. Greeting and date use `SaneText` display/eyebrow roles. Buttons follow `SaneButton` primary/secondary. A11y: greeting is an `h1`-equivalent heading; actions are labelled buttons reachable by keyboard on web. Reduce-motion: no animated greeting.

#### Test plan

Unit: `app/test/features/library/greeting_test.dart` (bucket boundaries, name substitution). Widget: `library_header_test.dart` (actions dispatch correct intents; profile-switch updates name). Golden: header specimen across a light + dark look.

#### Dependencies

[SN-LIB-002](library.md#sn-lib-002) (screen scaffold).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-005

<a id="sn-lib-005"></a>

**Implement notebook grid/list views with view toggle and filter chips**

| Field | Value |
|---|---|
| GitHub | #329 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-DS-003](design-system.md#sn-ds-003), [SN-LIB-010](library.md#sn-lib-010) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The notebook section is the core of the library body: the grid of poster cards or the dense list of rows, with a Grid/List toggle and a row of filter chips (All + each subject). It implements PRD-LB-005 and the notebook section in `docs/design/screens-and-flows.md` §6, rendering `SaneNotebookCard`, `SaneNotebookRow`, `SaneChipBar` and `SaneViewToggle` (`docs/design/component-inventory.md` §4). This is what a student looks at every day, so it must be legible across all 17 looks and scroll smoothly at 500 notebooks (perf budget §15).

#### Scope

**In:** the grid view (3:4 poster cards — thumbnail, coloured subject spine, favourite star, Audio/PDF/Shared badges bottom-left, title, 'N pages · updated') and the list view (dense rows — colour spine, title, 'subject · N pages', `#tags`, badges, updated); the `SaneViewToggle` persisting `libView` per profile; the filter-chip bar (All + subjects; active chip inverts colours) driving `libFilter`; wiring both to the repository query from [SN-LIB-003](library.md#sn-lib-003); the card/row tap → open notebook (delegating to [SN-LIB-002](library.md#sn-lib-002)).

**Out:** the thumbnail image itself ([SN-LIB-014](library.md#sn-lib-014)); the favourite toggle behaviour ([SN-LIB-013](library.md#sn-lib-013)); sort ([SN-LIB-007](library.md#sn-lib-007)); overflow menu / long-press ([SN-LIB-016](library.md#sn-lib-016)); virtualisation internals ([SN-LIB-025](library.md#sn-lib-025)); the Audio/PDF/Shared badge data sources (SN-AUD-001, SN-PDF-001, SN-SHR-001).

#### Acceptance criteria

- [ ] Grid renders 3:4 cards with subject spine, badges, title and 'N pages · updated'; list renders dense rows with `#tags` and badges (PRD-LB-005).
- [ ] The Grid/List toggle switches instantly and persists `libView` per profile across app restarts.
- [ ] Filter chips show All + each subject with live counts; the active chip inverts to ink-on-surface; selecting one sets `libFilter` and re-queries.
- [ ] Badges (Audio/PDF/Shared) are exposed to assistive tech as text, not colour-only (`SaneBadge`).
- [ ] The grid scrolls a 500-notebook library at 60 fps with no frame > 16.7 ms (§15) — measured via the perf harness.
- [ ] Correct in all 17 looks + dark; 44 pt targets; keyboard focus order on web.

#### Technical notes

`app/lib/features/library/notebook_grid.dart` + `notebook_list.dart` + `filter_chip_bar.dart`, consuming `sane_ui` components and the repository stream. Subject spine colour comes from the subject `colorToken` ([SN-LIB-010](library.md#sn-lib-010)). Use a virtualised builder (`SliverGrid`/`SliverList`) so only visible cells build ([SN-LIB-025](library.md#sn-lib-025) tunes the query paging). `libView`/`libFilter` live in the library state (Riverpod). Tokens only; badges are facts (`docs/design/component-inventory.md` §2).

#### Security & privacy

None beyond baseline: renders local repository data. Titles and tags are user content — never logged (CWE-532, MASVS-PRIVACY-3). Thumbnails are decoded/cached by [SN-LIB-014](library.md#sn-lib-014) under its resource caps; this issue only places the widget.

#### UX notes

Matches the 'Library' frame poster cards and list rows in `design/Sane Notes.dc.html` (screens §6). Card hover lifts 3 px on pointer platforms; selected/active states use a non-colour signal (ring/weight), never colour alone (WCAG 1.4.1). Empty results defer to [SN-LIB-008](library.md#sn-lib-008). Reduce-motion disables the lift.

#### Test plan

Widget: `app/test/features/library/notebook_views_test.dart` (grid vs list rendering; toggle persistence; filter chip sets `libFilter` and counts; badge semantics). Golden: `notebook_card_looks_test.dart` and `notebook_row_looks_test.dart` across all 17 looks × light/dark. Perf: harness scroll test on the 500-notebook fixture.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (repository), [SN-LIB-010](library.md#sn-lib-010) (subjects for spine/chips), SN-DS-003 (controls).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-006

<a id="sn-lib-006"></a>

**Build the 'Pick up where you left off' recents rail**

| Field | Value |
|---|---|
| GitHub | #330 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-002](library.md#sn-lib-002), [SN-LIB-003](library.md#sn-lib-003) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Students return to the same two or three notebooks between lectures. The 'Pick up where you left off' rail gives them a one-tap return to their most-recently-opened notebooks, opened at the exact page they left. It implements PRD-LB-041 and the recents region in `docs/design/screens-and-flows.md` §6, rendering `SaneRecentCard` (`docs/design/component-inventory.md` §4). It is a distinct, testable region with a strict visibility rule.

#### Scope

**In:** the horizontal rail of the three most-recently-opened notebooks (ranked by `lastOpenedAt` desc), each a `SaneRecentCard` (mini page-1 thumbnail, title, 'subject · page X of Y', relative updated time, Audio/PDF/Shared badges); the visibility rule that renders the rail only when `navItem == all AND libFilter == All` (PRD-LB-041); tapping a card opens the notebook at `lastOpenedPage`; horizontal scroll/snap on touch and keyboard reachability on web.

**Out:** the 'Recent' nav item full list ([SN-LIB-009](library.md#sn-lib-009)); thumbnail generation ([SN-LIB-014](library.md#sn-lib-014)); the badge data sources (other areas); `lastOpenedAt` writes (owned by [SN-LIB-003](library.md#sn-lib-003) on open).

#### Acceptance criteria

- [ ] The rail shows exactly the three most-recently-opened notebooks, most-recent first, and hides when fewer than one recent exists.
- [ ] The rail renders only when `navItem == all AND libFilter == All`; it disappears under any subject filter or other nav item.
- [ ] Each card shows title, 'subject · page X of Y', relative updated time ('2h ago') and the correct badges.
- [ ] Tapping a card opens the notebook at `lastOpenedPage`, not page 0.
- [ ] Correct in all 17 looks + dark; horizontal scroll works with touch, trackpad and keyboard; 44 pt targets.
- [ ] No title/content logged (CWE-532).

#### Technical notes

`app/lib/features/library/recents_rail.dart` consuming a `recentNotebooksProvider` (top-3 by `lastOpenedAt` from [SN-LIB-003](library.md#sn-lib-003)). Relative-time formatting via a shared helper (also used by cards). The 'page X of Y' uses `lastOpenedPage`/`pageCount` from the notebook metadata (PRD-02 §2). Tokens only. Visibility rule lives in [SN-LIB-002](library.md#sn-lib-002)'s region logic but the rail owns its own empty-guard.

#### Security & privacy

None beyond baseline: displays local recent notebooks; titles are user content and are never logged (CWE-532, MASVS-PRIVACY-3). Recents are per-profile (scoped by the repository). No network.

#### UX notes

Matches the recents cards in the 'Library' frame (screens §6). Cards hover-lift on pointer platforms; the rail is a labelled region ('Pick up where you left off') for assistive tech. On phone the rail scrolls horizontally with snap; reduce-motion disables snap animation. Empty: the rail is simply absent (no dead-end placeholder).

#### Test plan

Widget: `app/test/features/library/recents_rail_test.dart` (top-3 ordering; visibility rule under nav/filter changes; open-at-`lastOpenedPage`; badge rendering; empty guard). Golden: recents rail across a light + dark look.

#### Dependencies

[SN-LIB-002](library.md#sn-lib-002) (scaffold + region rule), [SN-LIB-003](library.md#sn-lib-003) (recent query).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-007

<a id="sn-lib-007"></a>

**Add the library sort menu (modified/created/name/type)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | S |
| SDLC | implementation |
| Parent | [SN-LIB-005](library.md#sn-lib-005) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-LIB-005](library.md#sn-lib-005) |
| Security controls | `MASVS-PRIVACY-3` |
| Extra labels | agent-ready, good first issue |

#### Context

Students organise by different axes at different times — most-recently-touched during exam week, alphabetical when hunting a specific class. The sort menu gives the library those axes. It implements PRD-LB-006 and the 'Views and Sorting' parity item, applying within the current nav/filter. It is a small, self-contained control over the repository query, making it a good first issue.

#### Scope

**In:** a sort menu offering Last modified (default), Date created, Name (A–Z), and Type; each option toggles ascending/descending; the choice persists per profile and applies within the current `navItem`/`libFilter`/folder context; the repository query orders accordingly; an accessible menu button showing the active sort.

**Out:** the query implementation details ([SN-LIB-003](library.md#sn-lib-003) provides the orderable query); filter chips ([SN-LIB-005](library.md#sn-lib-005)); smart collections ([SN-LIB-026](library.md#sn-lib-026)).

#### Acceptance criteria

- [ ] All four sort axes work and re-order the visible list/grid; Last modified desc is the default.
- [ ] Each axis toggles asc/desc, indicated in the menu (arrow + accessible state).
- [ ] Sort applies within the current filter/nav (sorting a subject-filtered view sorts only that subset).
- [ ] The chosen sort persists per profile across restarts.
- [ ] 'Name (A–Z)' collates per locale (accent- and case-insensitive for the active locale).
- [ ] Correct in all 17 looks + dark; menu is keyboard-navigable on web with 44 pt targets.

#### Technical notes

`app/lib/features/library/sort_menu.dart`; the active sort lives in the library state (Riverpod) and is passed to the repository query ([SN-LIB-003](library.md#sn-lib-003)). Locale-aware name collation via `intl`/`Collator`-style comparison. 'Type' sorts by page-kind/PDF-vs-blank grouping (PRD-LB-006). Tokens only; use `SaneButton` (menu) + a menu surface from `sane_ui`.

#### Security & privacy

None beyond baseline: sort is a query-ordering preference over local data; nothing sensitive is logged (MASVS-PRIVACY-3). No network, no new stored assets beyond a small per-profile preference.

#### UX notes

Matches the sort affordance implied by screens §6 and the parity item. The menu shows the current axis + direction; selecting re-sorts with a cross-fade (reduce-motion: instant). A11y: menu items expose selected state; the trigger announces the active sort.

#### Test plan

Widget: `app/test/features/library/sort_menu_test.dart` (each axis orders correctly; asc/desc toggle; persistence; applies within a subject filter; locale collation of accented names). Feeds the integration flow in [SN-LIB-028](library.md#sn-lib-028).

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (orderable query), [SN-LIB-005](library.md#sn-lib-005) (views to sort).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-008

<a id="sn-lib-008"></a>

**Implement library empty, loading, error and offline states**

| Field | Value |
|---|---|
| GitHub | #331 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-002](library.md#sn-lib-002), [SN-DS-022](design-system.md#sn-ds-022) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The design mock leaves empty/loading/error/offline states largely undefined (screens Open Question 18) beyond a minimal pre-logic shell. This issue makes every library state first-class per PRD-LB-007 and PRD-LB-361, using `SaneEmptyState` and `SaneSkeleton` (`docs/design/component-inventory.md` §4) and the toast-not-red error convention (`docs/design/component-inventory.md` §9). Getting these right is what makes the library feel trustworthy when there is nothing to show, data is hydrating, or the device is offline.

#### Scope

**In:** the empty states with exact mock copy — Trash → 'Trash is empty — deleted notebooks stay here for 30 days.', all others → 'Nothing here yet.', plus favourites/shared variants — each offering a next step (e.g. 'New notebook') rather than a dead end; the loading skeleton (a minimal library shell: sidebar widths, empty lists) shown before data hydration; the error state as a toast with a fact + retry (never inline red); the offline banner where a nav item needs the network (Shared before sync) that degrades gracefully to local-only.

**Out:** the sidebar chrome itself ([SN-LIB-009](library.md#sn-lib-009)); the skeleton primitive (SN-DS-022 provides `SaneSkeleton`); sync/offline transport (SN-SYNC-001).

#### Acceptance criteria

- [ ] Empty Trash shows the exact copy 'Trash is empty — deleted notebooks stay here for 30 days.'; other empty views show 'Nothing here yet.' (PRD-LB-007).
- [ ] Each empty state offers a relevant next step (never a dead end) per `component-inventory.md` §9.
- [ ] A loading skeleton renders the library shell (sidebar widths, empty lists) before hydration and is replaced without layout shift.
- [ ] Errors surface as a toast stating the fact + a retry affordance; no inline red text anywhere (WCAG 1.4.1; the toast is the only inverted surface).
- [ ] 'Shared' before sync exists shows a graceful local-only message, not an error.
- [ ] All states correct in all 17 looks + dark, announced to assistive tech (live region for toasts/count), and do not leak titles into logs (CWE-532).

#### Technical notes

`app/lib/features/library/library_states.dart`: state widgets keyed off the repository `AsyncValue` (data/loading/error) and the offline signal. Use `SaneEmptyState`, `SaneSkeleton`, `SaneToast`. Empty copy from screens §6/§16; the at-most-one-Sage rule on first run (`docs/design/component-inventory.md` §4). Skeleton over spinner for perceived speed. Follows the cross-cutting states table (`component-inventory.md` §9).

#### Security & privacy

None beyond baseline: error toasts state a fact and a recovery step without echoing note titles, file paths or content (CWE-532, MASVS-PRIVACY-3). Offline handling degrades to local-first (Locked Decision 3) — no data is fetched from any server for the core library.

#### UX notes

Matches screens §6 empty/loading copy and the toast-voice principle. Empty states are calm and actionable; loading is a skeleton, not a spinner; errors are toasts with recovery. Reduce-motion: skeletons use a static shimmer-off fallback. RTL-correct. A11y: toasts mirror to a live region; empty-state next-step is a labelled button.

#### Test plan

Widget: `app/test/features/library/library_states_test.dart` (exact empty copy per nav; skeleton→data no-shift; error → toast + retry, no inline red; offline Shared graceful). Golden: empty + skeleton across a light + dark look.

#### Dependencies

[SN-LIB-002](library.md#sn-lib-002) (scaffold), SN-DS-022 (empty state + skeleton primitives).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-009

<a id="sn-lib-009"></a>

**Wire the sidebar navigation (All, Recent, Favorites, Shared, Trash)**

| Field | Value |
|---|---|
| GitHub | #332 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-002](library.md#sn-lib-002), [SN-LIB-003](library.md#sn-lib-003), [SN-DS-020](design-system.md#sn-ds-020) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The sidebar is the shared shell's primary navigation: it lets a student jump between All notebooks, Recent, Favorites, Shared and Trash, and (wide only) filter by subject. It implements PRD-LB-040 and the sidebar in `docs/design/screens-and-flows.md` §2, wiring the `SaneSidebar`/`SaneNavItem`/`SaneSubjectRow` components (SN-DS-020) to the library state. The design ships the chrome; this issue makes the nav actually drive the library.

#### Scope

**In:** wiring the five nav items — All notebooks, Recent, Favorites, Shared, Trash — so each sets `navItem`, returns to the Library, and resets `libFilter` to All (PRD-LB-040); the active item highlight (`--acs` background, weight 700, `aria-current`); 'Recent' ranks by `lastOpenedAt` desc; 'Favorites' filters favourite notebooks; 'Shared' lists notebooks with `flags.shared == true` (empty/local-only until sync); the subjects list (wide only) with colour swatch + live count driving `libFilter` ([SN-LIB-010](library.md#sn-lib-010) owns subjects); the search-launcher button routing to the Search screen (SN-SRCH-001 owns the screen).

**Out:** the sidebar visual component itself (SN-DS-020); subject CRUD ([SN-LIB-010](library.md#sn-lib-010)); the free-plan upsell card (SN-BILL-001); the Search screen (SN-SRCH-001); trash contents ([SN-LIB-019](library.md#sn-lib-019)).

#### Acceptance criteria

- [ ] Each nav item sets `navItem`, resets `libFilter` to All, and highlights as active with `aria-current` and a non-colour weight signal.
- [ ] 'Recent' orders by `lastOpenedAt` desc; 'Favorites' shows only favourites; 'Shared' shows `flags.shared` notebooks (empty state when none/local-only).
- [ ] Selecting a subject row sets `libFilter` to that subject and shows its live notebook count.
- [ ] The sidebar collapses to a 68 px icon rail below 900 px and to hidden in the editor, preserving the selected nav.
- [ ] Correct in all 17 looks + dark; every nav item and subject row is keyboard-reachable on web with a labelled, 44 pt target.
- [ ] No note titles/tags logged (CWE-532).

#### Technical notes

`app/lib/features/library/sidebar_nav.dart` binding `SaneSidebar`/`SaneNavItem`/`SaneSubjectRow` (SN-DS-020) to `libraryStateProvider`. Counts come from [SN-LIB-003](library.md#sn-lib-003) denormalised aggregates. Narrow (< 900 px) rail behaviour follows the adaptive layout (`docs/design/screens-and-flows.md` §0). Subject rows read subject `colorToken` from [SN-LIB-010](library.md#sn-lib-010). Search launcher dispatches a route to SN-SRCH-001.

#### Security & privacy

None beyond baseline: nav is local navigation over per-profile data; 'Shared' reflects a local flag until sync exists and never fetches from a server here (Locked Decision 3). Titles/tags are user content, never logged (CWE-532, MASVS-PRIVACY-3).

#### UX notes

Matches the sidebar in `design/Sane Notes.dc.html` (screens §2): brand row → search launcher → nav list → subjects → bottom block. Active state uses background + weight + `aria-current`, never colour alone (WCAG 1.4.1). Subject swatch colour is paired with the subject name for AT (never colour-only). Reduce-motion: no rail slide animation.

#### Test plan

Widget: `app/test/features/library/sidebar_nav_test.dart` (each nav sets state + resets filter; active highlight + `aria-current`; Recent ordering; Favorites/Shared filtering; subject row sets filter + count; narrow rail collapse). Golden: sidebar across a light + dark look.

#### Dependencies

[SN-LIB-002](library.md#sn-lib-002) (scaffold), [SN-LIB-003](library.md#sn-lib-003) (queries/counts), SN-DS-020 (sidebar components).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-010

<a id="sn-lib-010"></a>

**Implement subjects: model, six seeds, CRUD and colour spine**

| Field | Value |
|---|---|
| GitHub | #333 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Subjects are the single-select, colour-bearing classification that answers 'what class is this for?' — they drive the card/list colour spine and the sidebar grouping. They are orthogonal to folders and tags and MUST NOT be conflated (PRD-02 §3). This issue implements PRD-LB-030/031/032: the subject model, the six seed subjects with fixed colours, full CRUD, and the colour spine on cards and rows.

#### Scope

**In:** the Subject entity (`id`, `name`, `colorHex`, `order`) mapped to Library-doc CRDT ops; six seed subjects with fixed colours — Physics #2f6df6, Mathematics #7a3ec9, Chemistry #2e8b57, Design #e07b1c, Languages #d9488a, Personal #6b7280; add/rename/recolour/reorder/delete of subjects; delete reassigns its notebooks to 'Personal' and never deletes notebooks; a notebook has at most one subject; new-notebook subject defaults to the active library filter, else 'Personal'; rendering the subject colour as the card/list spine and tinting the template swatch preview only (not the paper unless a tint is chosen).

**Out:** the sidebar subject-row wiring ([SN-LIB-009](library.md#sn-lib-009) consumes this); template paper tinting (SN-TPL-001); folders and tags ([SN-LIB-011](library.md#sn-lib-011), [SN-LIB-012](library.md#sn-lib-012)).

#### Acceptance criteria

- [ ] The six seeds exist on first run with the exact hex colours above and can be reordered.
- [ ] Users can add, rename, recolour, reorder and delete subjects; deleting reassigns affected notebooks to 'Personal' and leaves those notebooks intact (PRD-LB-031).
- [ ] A notebook has at most one subject; changing it is a single undoable op.
- [ ] New-notebook subject defaults to the active `libFilter` subject, else 'Personal' (PRD-LB-032).
- [ ] The subject colour renders as the 6 px card/list spine and tints only the template swatch preview.
- [ ] Correct in all 17 looks + dark; subject colour is paired with the subject name for assistive tech (never colour-only); no subject names logged (CWE-532).

#### Technical notes

Subject CRUD projects onto Library-doc ops via [SN-LIB-003](library.md#sn-lib-003) (`createNode`/`setAttr`/`moveNode` with a subject `kind` discriminator per `document-model.md` §1.2 note). Store `colorHex` but map to the nearest design token where the spine renders (tokens-only rule, `docs/design/design-system.md` §9); the six seed hexes are fixed brand colours from PRD-LB-031 and screens §17. Reassignment-on-delete is a batch op. Reorder uses fractional-index `order`.

#### Security & privacy

None beyond baseline: subject names are user content (a course name can be personal) — never logged (CWE-532, MASVS-PRIVACY-3). Subjects are per-profile (repository-scoped). No network.

#### UX notes

Matches the subjects list (screens §2) and the coloured spine on cards/rows (screens §6). The Subjects management surface (screens §17) supports add/rename/recolour/reorder/delete. Colour is always paired with a name label for AT and for colour-blind users (WCAG 1.4.1). Reduce-motion: reorder animates via cross-fade or is instant.

#### Test plan

Unit: `packages/sane_core/test/library/subject_test.dart` (seed presence + colours; delete → reassign to Personal, notebooks intact; single-subject invariant; default-on-create rule). Widget/golden: `app/test/features/library/subject_spine_test.dart` (spine colour on card/row across looks; colour+name semantics).

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (repository).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-011

<a id="sn-lib-011"></a>

**Implement folders with unlimited nesting, breadcrumb and move**

| Field | Value |
|---|---|
| GitHub | #334 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-LIB-005](library.md#sn-lib-005) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Folders answer 'where do I keep it?' and are the hierarchical container orthogonal to subjects and tags (PRD-02 §3). Sane Notes supports **unlimited nesting depth** — explicitly beating Notability's 6-level cap and matching Goodnotes' unlimited (PRD-LB-033), which is a real differentiator for power users. This issue implements PRD-LB-033/034: folder CRUD, arbitrary nesting, breadcrumb navigation, move, subtree duplicate, and delete-to-trash of a whole subtree as one restorable unit.

#### Scope

**In:** the Folder entity (`id`, `parentFolderId?`, `name`, `colorHex?`, `iconId?`, `order`) as movable-tree nodes; create/rename/set-colour/set-icon (from a curated icon set)/move/duplicate/delete-to-trash; unlimited depth (a folder may contain sub-folders and notebooks); a breadcrumb path in the library header when a folder is open; duplicate deep-copies contained notebooks (new ids); delete-to-trash moves the whole subtree as one restorable `TrashEntry` unit (restore returns the subtree).

**Out:** drag-to-move gestures ([SN-LIB-021](library.md#sn-lib-021)); the merge-on-drop prompt ([SN-LIB-021](library.md#sn-lib-021)); trash lifecycle/purge internals ([SN-LIB-019](library.md#sn-lib-019)); notebook duplicate mechanics ([SN-LIB-016](library.md#sn-lib-016) shares the deep-copy helper).

#### Acceptance criteria

- [ ] Folders nest to arbitrary depth (test a 10-level chain) with no cap; a folder holds both sub-folders and notebooks.
- [ ] Create/rename/recolour/set-icon/move/duplicate/delete-to-trash all work and are undoable single transactions.
- [ ] Opening a folder shows a breadcrumb path in the header; tapping a crumb navigates up.
- [ ] Duplicating a folder deep-copies its notebooks with new ids and ' copy' titling; the original is untouched.
- [ ] Deleting a folder moves the entire subtree to Trash as one entry; restoring it returns the whole subtree to its original parent (or root if the parent is gone).
- [ ] Concurrent re-parenting cannot create a cycle (movable-tree cycle rule); correct in all 17 looks + dark; no folder names logged (CWE-532).

#### Technical notes

Folders are movable-tree nodes in the Library doc; move = `moveNode` (LWW by HLC), with the cycle-avoidance rule from `document-model.md` §4.3 (undo the lower-HLC move of a cycle) — do not invent a variant (ADR-0005). CRUD via [SN-LIB-003](library.md#sn-lib-003). Deep-copy shares a helper with [SN-LIB-016](library.md#sn-lib-016). Icon set is a curated `sane_ui` glyph subset. Breadcrumb reads the ancestor chain from the tree.

#### Security & privacy

None beyond baseline: folder names are user content — never logged (CWE-532, MASVS-PRIVACY-3). Folders are per-profile (repository-scoped). Deep-copy stays within the local store; no network. Deletion is a tombstone, never destructive (data-loss safety; see [SN-LIB-019](library.md#sn-lib-019)).

#### UX notes

Matches the folders/nesting parity item (PRD-LB-033/034) and the library header breadcrumb. Moving a notebook onto another notebook is handled in [SN-LIB-021](library.md#sn-lib-021) (prompt, never silent merge — avoiding Goodnotes' foot-gun, PRD-LB-035). Icons and colours are decorative but the folder name is always the accessible label. Reduce-motion: expand/collapse is instant.

#### Test plan

Unit: `packages/sane_core/test/library/folder_tree_test.dart` (10-level nesting; move; concurrent-move cycle avoidance; subtree delete/restore as one unit; deep-copy new ids). Widget: `app/test/features/library/breadcrumb_test.dart` (breadcrumb path + up-navigation). Golden: folder row/breadcrumb across a light + dark look.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (repository/tree ops), [SN-LIB-005](library.md#sn-lib-005) (views that render folders).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-012

<a id="sn-lib-012"></a>

**Implement tags: many-to-many, inline create, global rename, page tags**

| Field | Value |
|---|---|
| GitHub | #335 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-LIB-005](library.md#sn-lib-005) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Tags answer 'what themes cut across my notebooks?' — a many-to-many, free-form label that Notability lacks entirely (a gap we turn into a wedge, PRD-02 §1.3). This issue implements PRD-LB-036/037 and the predefined quick-tags + tagged-items roll-up from PRD-LB-380: inline tag creation with type-ahead, global rename, recolour, removal, page-level tagging, a small set of predefined quick-tags, and a roll-up view listing every tagged item grouped by tag.

#### Scope

**In:** the Tag entity (`id`, `label`, `colorHex?`, `usageCount`) as an add-wins set on notebooks (and, at page granularity, on pages); inline creation with type-ahead against existing tags; remove; recolour; **global rename** that updates all references atomically; a curated set of predefined quick-tags (To-do, Important, Question, Definition, Review) alongside free-form tags; the tagged-items roll-up view grouping every tagged page/notebook by tag with jump-to-source; `#tags` rendering on list rows (screens §6).

**Out:** saved smart collections ([SN-LIB-026](library.md#sn-lib-026)); search over tags (SN-SRCH-001 indexes them); the overflow 'Edit tags' entry point ([SN-LIB-016](library.md#sn-lib-016) launches this UI); bulk add/remove tag ([SN-LIB-017](library.md#sn-lib-017)).

#### Acceptance criteria

- [ ] A notebook can carry many tags and a tag can apply to many notebooks (add-wins set; concurrent add/remove converges add-wins).
- [ ] Inline creation offers type-ahead against existing tags; picking an existing tag reuses it (no duplicate label).
- [ ] Global rename updates every reference in one undoable transaction and preserves `usageCount`.
- [ ] Tags apply at page granularity as well as notebook granularity (PRD-LB-037), surfaced on the page rail and in the roll-up.
- [ ] The five predefined quick-tags are available and the roll-up view groups all tagged items by tag with working jump-to-source (PRD-LB-380).
- [ ] Correct in all 17 looks + dark; `#tags` are keyboard-focusable on web; tag labels are never logged (CWE-532).

#### Technical notes

Tags are an add-wins set (`document-model.md` §4.1); rename is an LWW on the tag `label` register that all references resolve through (references store the tag id, not the string). Page-level tags attach to the Page node. CRUD via [SN-LIB-003](library.md#sn-lib-003). The roll-up is a repository query grouping by tag with deep-links to the owning notebook/page. Quick-tags are seeded tag presets. Follows PRD-LB-036/037/380 and ADR-0005.

#### Security & privacy

None beyond baseline: tag labels are user content (a tag like '#therapy' is sensitive) — never logged (CWE-532, MASVS-PRIVACY-3). Tags are per-profile (repository-scoped) and encrypted metadata at rest (MASVS-STORAGE-1). No network.

#### UX notes

Matches the list-row `#tags` (screens §6) and the tagged-items roll-up (OneNote 'Find Tags' / Apple 'Tag Browser' parity, PRD-LB-380). Tag colour is paired with the label for AT (never colour-only). Type-ahead is keyboard-first; reduce-motion keeps suggestions static. Empty roll-up defers to [SN-LIB-008](library.md#sn-lib-008).

#### Test plan

Unit: `packages/sane_core/test/library/tag_test.dart` (many-to-many; add-wins convergence; global rename updates all refs + preserves count; page-level tag). Widget: `app/test/features/library/tag_input_test.dart` (type-ahead reuse; roll-up grouping + jump-to-source). Golden: `#tags` row + roll-up across a light + dark look.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (repository/set ops), [SN-LIB-005](library.md#sn-lib-005) (rows that render tags).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-013

<a id="sn-lib-013"></a>

**Add the notebook favourite toggle with sidebar sync**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | S |
| SDLC | implementation |
| Parent | [SN-LIB-005](library.md#sn-lib-005) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-LIB-005](library.md#sn-lib-005) |
| Security controls | `MASVS-PRIVACY-3` |
| Extra labels | agent-ready, good first issue |

#### Context

The design shows a favourite star on cards but has no control to set or unset it (screens Open Question 4). This issue resolves that by wiring the star to a per-profile favourite flag, updating the sidebar Favorites filter immediately with a toast. It implements PRD-LB-039 and is a small, self-contained interaction, making it a good first issue.

#### Scope

**In:** the favourite star toggle on `SaneNotebookCard`/`SaneNotebookRow` and in the overflow menu; toggling flips the notebook's per-profile `favorite` flag via a single undoable op; a toast ('Added to favourites' / 'Removed'); immediate update of the sidebar Favorites filter and the card star state; keyboard-toggle on web with a labelled control.

**Out:** the overflow menu container ([SN-LIB-016](library.md#sn-lib-016) adds the Favourite/Unfavourite entry that calls this toggle); the Favorites nav item ([SN-LIB-009](library.md#sn-lib-009)); bulk favourite ([SN-LIB-017](library.md#sn-lib-017)).

#### Acceptance criteria

- [ ] Tapping the star toggles the `favorite` flag and shows the correct toast; the state persists across restarts.
- [ ] The sidebar Favorites view updates immediately (add/remove) without a manual refresh.
- [ ] Favourite state is per-profile (switching profiles shows that profile's favourites).
- [ ] The star exposes on/off state to assistive tech (not colour-only) and is a 44 pt target reachable by keyboard on web.
- [ ] Correct in all 17 looks + dark; the toggle is undoable via the toast where applicable.

#### Technical notes

`app/lib/features/library/favourite_toggle.dart`; the flag is a LWW register on the Notebook via [SN-LIB-003](library.md#sn-lib-003) (`setAttr favorite`). Toast via `SaneToast`. The Favorites filter reads the flag through the repository stream. Star is a `SaneBadge`/icon control exposing selected state. Follows PRD-LB-039 and screens §6.

#### Security & privacy

None beyond baseline: a boolean flag on a per-profile notebook; nothing sensitive logged (MASVS-PRIVACY-3). No network. The favourite state does not reveal note content.

#### UX notes

Matches the card star (screens §6). The star's on/off is signalled by fill + accessible state, never colour alone (WCAG 1.4.1). Toast confirms the action (2.4 s). Reduce-motion: the star fills without a bounce. RTL places the star per `EdgeInsetsDirectional`.

#### Test plan

Widget: `app/test/features/library/favourite_toggle_test.dart` (toggle flips flag + toast; sidebar Favorites updates; per-profile isolation; a11y on/off state; persistence). Golden: card star on/off across a light + dark look.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (flag op), [SN-LIB-005](library.md#sn-lib-005) (card/row host).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-014

<a id="sn-lib-014"></a>

**Generate notebook thumbnails off-isolate with a disk cache**

| Field | Value |
|---|---|
| GitHub | #336 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Every notebook card shows a live thumbnail — a mini-render of page 1 (strokes plus a PDF facsimile for PDF-backed notebooks). It must be generated without ever blocking the library scroll and cached so the grid stays at 60 fps (PRD-LB-042, §15). This issue implements the background thumbnailer, the disk cache and the regenerate-on-change trigger.

#### Scope

**In:** a thumbnail service that renders page 1 to a 3:4 raster on a background isolate; a disk cache keyed by notebook id + a content hash of page 1; debounced regeneration when page 1 changes; eviction under a bounded cache size; a placeholder shown while a thumbnail is pending; supplying the raster to `SaneNotebookCard`/`SaneRecentCard`.

**Out:** the card widget layout ([SN-LIB-005](library.md#sn-lib-005)); the PDF facsimile renderer (SN-PDF-002 provides the page raster this composes); covers (a distinct decorative image, [SN-LIB-015](library.md#sn-lib-015)); the ink renderer itself (SN-INK/SN-ED provide stroke painting).

#### Acceptance criteria

- [ ] Thumbnails render on a background isolate and never cause a frame > 16.7 ms while scrolling the grid (§15) — verified with the perf harness.
- [ ] A thumbnail is cached to disk and reused across app restarts; a page-1 edit regenerates it (debounced) within a bounded delay.
- [ ] The cache is size-bounded with LRU eviction; a cold card shows a placeholder, then swaps in without layout shift.
- [ ] PDF-backed notebooks show a page-1 facsimile behind ink; blank/paged notebooks show the ruled paper + strokes.
- [ ] Cached thumbnails live in the app's private, per-profile storage and are not world-readable (MASVS-STORAGE-1).
- [ ] No note content is logged; the cache key uses opaque hashes, not titles (CWE-532).

#### Technical notes

`app/lib/features/library/thumbnail_service.dart` using `Isolate.run` for the raster and the content-addressed blob/cache store from SN-CORE-004. Never hop isolates on the draw path (CLAUDE.md §8) — thumbnailing is off-UI-isolate work. Debounce on the repository's page-1-change signal. Cache path is app-private and per-profile. PDF page raster comes from SN-PDF-002. Bounded LRU cap tuned against the memory budget (< 300 MB on 4 GB Android).

#### Security & privacy

Thumbnails are a rendering of note content, so the cache is sensitive-at-rest: store in app-private, per-profile storage with no world-readable permission (MASVS-STORAGE-1, MASVS-PRIVACY-2). Cache keys are content hashes, not titles; nothing is logged (CWE-532). Regeneration and eviction run locally; no network. On profile switch, only the active profile's thumbnails are surfaced.

#### UX notes

Matches the card thumbnail (screens §6): 3:4 aspect, real mini-strokes, PDF facsimile for PDF notebooks. A pending thumbnail shows a calm skeleton placeholder (never a spinner in-card). Reduce-motion: the swap cross-fades or is instant. Thumbnails are decorative; the card's accessible label is the title + meta, not the image.

#### Test plan

Unit: `app/test/features/library/thumbnail_service_test.dart` (off-isolate render; cache hit/miss; debounce; LRU eviction; regenerate-on-change). Perf: harness scroll of a 500-card grid asserts no dropped frame during thumbnail loads. Security: a test asserts the cache directory is app-private and keyed by hash.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (page-1-change signal), SN-CORE-004 (blob/cache store).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-015

<a id="sn-lib-015"></a>

**Implement notebook covers (preset, custom image, first PDF page)**

| Field | Value |
|---|---|
| GitHub | #337 |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-CODE-4`, `MASVS-STORAGE-1`, `CWE-400`, `CWE-434` |
| Extra labels | agent-ready |

#### Context

A cover is an optional decorative face for a notebook — a preset from a curated set, a custom image, or the first page of an imported PDF — distinct from the auto-generated thumbnail. Covers MUST be available on the **free** plan (Notability locks them to its cloud tier; we do not), a small anti-lock-in win (PRD-LB-043). This issue implements PRD-LB-043: the Cover entity, the picker, and safe decoding of user-supplied images.

#### Scope

**In:** the Cover entity (`id`, `kind(preset|image)`, `assetRef?`); a cover picker offering a curated preset set, 'Choose image' (from photos/files), and 'Use first PDF page' for PDF-backed notebooks; storing a custom image as a content-addressed blob after safe decode + downscale; rendering the cover on the card face (falling back to the thumbnail when no cover is set); a 'Remove cover' action.

**Out:** the thumbnail service ([SN-LIB-014](library.md#sn-lib-014)); the overflow 'Change cover' entry point ([SN-LIB-016](library.md#sn-lib-016) launches this picker); the full image-insert pipeline (SN-MED-001); the PDF renderer (SN-PDF-002 supplies the first-page raster).

#### Acceptance criteria

- [ ] A notebook can have a preset cover, a custom image cover, or a first-PDF-page cover; with none set it falls back to the thumbnail (PRD-LB-043).
- [ ] Covers are available on the free plan (no Pro gate).
- [ ] A custom image is validated (type/MIME/size) and decoded off the UI isolate with a resource cap before it is stored; a hostile/oversized image fails closed into a user-safe error, never a crash (CWE-400, MASVS-CODE-4).
- [ ] Stored cover blobs live in app-private, per-profile storage and are EXIF-stripped (MASVS-STORAGE-1, privacy).
- [ ] Removing a cover reverts the card to the thumbnail.
- [ ] Correct in all 17 looks + dark; the cover is decorative and does not become the card's accessible label.

#### Technical notes

`app/lib/features/library/cover_picker.dart`; custom images decode via a bounded off-isolate decoder (CLAUDE.md §7.8 — cap resources before decode, parse off the UI isolate), downscale, strip EXIF, and store as a content-addressed blob (SN-CORE-004). `Cover.assetRef` is a `BlobRef`. First-PDF-page cover pulls a raster from SN-PDF-002. Validate MIME/size before decode (CWE-434). Presets ship as bundled `sane_ui` assets.

#### Security & privacy

A custom cover is untrusted input: validate type/MIME/size, cap decode resources against decompression bombs (CWE-400), and parse off the UI isolate (CLAUDE.md §7.8, MASVS-CODE-4). Reject non-image content masquerading by extension (CWE-434). Strip EXIF (location/device metadata) before storing (privacy). Store app-private, per-profile (MASVS-STORAGE-1). No network; the picker reads only what the user explicitly selects.

#### UX notes

Matches the optional cover concept (PRD-LB-043) layered over the card face (screens §6). The picker offers presets + custom + first-PDF-page with a clear 'Remove'. On decode failure, a toast states the fact + a retry (no inline red). Reduce-motion: cover swap cross-fades. Covers must not reduce title legibility (contrast overlay in every look).

#### Test plan

Unit/abuse: `app/test/features/library/cover_decode_test.dart` (oversized/malformed image fails closed off-isolate; EXIF stripped; MIME/extension mismatch rejected). Widget: `cover_picker_test.dart` (preset/custom/first-PDF selection; free plan, no gate; remove reverts to thumbnail). Golden: card with cover across a light + dark look.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (cover ref on notebook), SN-CORE-004 (blob store).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-016

<a id="sn-lib-016"></a>

**Build the notebook overflow menu and lifecycle actions**

| Field | Value |
|---|---|
| GitHub | #338 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-LIB-005](library.md#sn-lib-005), [SN-LIB-010](library.md#sn-lib-010), [SN-LIB-011](library.md#sn-lib-011) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The design mock only *opens* notebooks — there is no rename, delete, move, duplicate or change-subject affordance anywhere (screens Open Questions 2–3). This issue adds the notebook lifecycle: an overflow (⋯) menu (plus long-press and right-click equivalents) exposing every per-notebook action. It implements PRD-LB-060/061/062 and is the control surface the rest of the library management hangs off.

#### Scope

**In:** the overflow/long-press/right-click menu with Open, Rename, Change subject, Edit tags, Change cover, Favourite/Unfavourite, Duplicate, Move to folder…, Export…, Share… (M6 hook), Version history… (hook), Move to Trash; inline rename with immediate persistence and undo (renaming MUST NOT clear version history); Duplicate that deep-copies pages/annotations/metadata with new ids, ' copy' suffix, placed beside the original (audio blobs may be shared by ref-count); wiring Change subject/Edit tags/Change cover/Favourite/Move-to-folder/Move-to-Trash to their owning features.

**Out:** the trash lifecycle itself ([SN-LIB-019](library.md#sn-lib-019)); export (SN-SHR-001) and share (SN-SHR-001/SN-COL-001) — hooks only; version history (out of scope, hook only); drag-to-move ([SN-LIB-021](library.md#sn-lib-021)); bulk actions ([SN-LIB-017](library.md#sn-lib-017)).

#### Acceptance criteria

- [ ] The menu is reachable via ⋯, long-press and right-click, and exposes all listed actions with accessible names (PRD-LB-060).
- [ ] Rename is inline, persists immediately, is undoable, and does NOT clear version history (PRD-LB-061; explicitly avoiding Notability's rename-wipes-history anti-pattern).
- [ ] Duplicate deep-copies pages + annotations + metadata with new ids, adds ' copy', and places the copy beside the original; the copy behaves as if it owns its audio even if blobs are shared by ref-count (PRD-LB-062).
- [ ] Change subject / Edit tags / Change cover / Favourite / Move to folder invoke the correct owning feature and reflect immediately.
- [ ] Move to Trash routes through the soft-delete flow ([SN-LIB-019](library.md#sn-lib-019)) with the undo toast.
- [ ] Correct in all 17 looks + dark; menu is keyboard-operable on web; no titles logged (CWE-532).

#### Technical notes

`app/lib/features/library/notebook_menu.dart` dispatching intents to the repository ([SN-LIB-003](library.md#sn-lib-003)) and owning features (subjects [SN-LIB-010](library.md#sn-lib-010), folders [SN-LIB-011](library.md#sn-lib-011), tags [SN-LIB-012](library.md#sn-lib-012), covers [SN-LIB-015](library.md#sn-lib-015), favourite [SN-LIB-013](library.md#sn-lib-013), trash [SN-LIB-019](library.md#sn-lib-019)). Duplicate uses the shared deep-copy helper (new ObjectIds per `document-model.md` §1.1). Rename is a `setAttr title` LWW op that never touches the op-log history (history preserved by construction). Export/Share/Version-history are stubbed hooks to SN-SHR-001.

#### Security & privacy

None beyond baseline: all actions are local mutations on per-profile notebooks; titles/tags are user content, never logged (CWE-532, MASVS-PRIVACY-3). Move to Trash is a tombstone (non-destructive, [SN-LIB-019](library.md#sn-lib-019)). Export/Share are gated behind their own security review in SN-SHR-001 and are only launched, not implemented, here.

#### UX notes

Resolves screens Open Questions 2–3 with the ⋯ menu. Rename is inline with immediate feedback; destructive 'Move to Trash' shows the undo toast. Menu ordering follows PRD-LB-060. Long-press on touch, right-click on pointer, ⋯ button always. A11y: menu items expose role/state; reduce-motion keeps the menu static.

#### Test plan

Widget: `app/test/features/library/notebook_menu_test.dart` (all entry points open the menu; rename inline + undo + history preserved; duplicate new ids + ' copy' + placement; each action dispatches the right intent). Unit: `duplicate_deep_copy_test.dart` (new ids, shared-audio ref-count). Golden: menu across a light + dark look.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003), [SN-LIB-005](library.md#sn-lib-005) (host cards), [SN-LIB-010](library.md#sn-lib-010) (subjects), [SN-LIB-011](library.md#sn-lib-011) (folders).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-017

<a id="sn-lib-017"></a>

**Implement bulk multi-select actions in the library**

| Field | Value |
|---|---|
| GitHub | #339 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-005](library.md#sn-lib-005), [SN-LIB-016](library.md#sn-lib-016) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Managing a semester of notebooks one-by-one is tedious. Bulk multi-select lets a student act on many notebooks at once — move a whole subject's notebooks to a folder, tag them, or trash a batch — as a single undoable transaction. It implements PRD-LB-063 (Content Manager / bulk actions parity).

#### Scope

**In:** a multi-select mode entered by long-press (or a Select button), with per-card checkboxes and Select-All; a contextual action bar offering Export, Move to folder, Add/Remove tag, Change subject, Favourite, Duplicate, Move to Trash; each bulk action as one undoable transaction with a single summary toast ('Moved 4 notebooks'); a selection count and a clear/exit affordance.

**Out:** the per-notebook menu ([SN-LIB-016](library.md#sn-lib-016) defines the underlying actions this batches); export (SN-SHR-001, hook); trash internals ([SN-LIB-019](library.md#sn-lib-019)); drag-to-move ([SN-LIB-021](library.md#sn-lib-021)).

#### Acceptance criteria

- [ ] Long-press (or Select) enters multi-select; checkboxes and Select-All work; a count shows 'N selected'.
- [ ] Each bulk action applies to the whole selection as one op-log transaction and is undoable via a single toast summarising the count (PRD-LB-063).
- [ ] Move to folder / Add-Remove tag / Change subject / Favourite / Duplicate / Move to Trash all operate on the selection.
- [ ] Exiting multi-select clears the selection; selecting across pagination boundaries keeps the selection intact.
- [ ] Correct in all 17 looks + dark; checkboxes are 44 pt targets, keyboard-operable on web, and expose selected state to assistive tech.
- [ ] No titles logged; the summary toast reports counts only (CWE-532).

#### Technical notes

`app/lib/features/library/multi_select.dart`; a selection set in the library state; bulk actions call the repository ([SN-LIB-003](library.md#sn-lib-003)) with a batched op transaction (all-or-nothing per `document-model.md` §2). Reuse the single-notebook action implementations from [SN-LIB-016](library.md#sn-lib-016). Undo reverses the batch as one unit. Selection survives virtualised scroll ([SN-LIB-025](library.md#sn-lib-025)).

#### Security & privacy

None beyond baseline: batch mutations over per-profile notebooks; the summary toast and logs report counts, never titles/content (CWE-532, MASVS-PRIVACY-3). Move to Trash stays non-destructive ([SN-LIB-019](library.md#sn-lib-019)). No network. Export in bulk is delegated to SN-SHR-001 under its own review.

#### UX notes

Matches the bulk-actions parity item (PRD-LB-063). The action bar appears on selection and summarises with one toast. Selecting is finger-friendly (checkbox overlay) and keyboard-friendly on web (space to toggle, shift-range). Reduce-motion: checkbox toggles without a bounce. Empty selection disables the action bar.

#### Test plan

Widget: `app/test/features/library/multi_select_test.dart` (enter/exit; Select-All; count; each bulk action as one undoable op with a count toast; selection persists across scroll). Integration: a move-4-then-undo flow. Golden: multi-select action bar across a light + dark look.

#### Dependencies

[SN-LIB-005](library.md#sn-lib-005) (cards to select), [SN-LIB-016](library.md#sn-lib-016) (underlying actions).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-018

<a id="sn-lib-018"></a>

**Implement Quick Note for one-tap capture**

| Field | Value |
|---|---|
| GitHub | #340 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-002](library.md#sn-lib-002), [SN-LIB-003](library.md#sn-lib-003) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Mid-lecture, a student needs to start writing in one tap, not navigate a template dialog. Quick Note creates a coverless single-page notebook in the last-used paper template instantly, and lets the student decide where it belongs afterwards. It implements PRD-LB-064 (Goodnotes 'Quick notes' / Notability widget parity).

#### Scope

**In:** a Quick Note action (double-tap 'New notebook', a sidebar shortcut, and — where the OS allows — a home-screen widget / quick action) that creates a coverless single-page notebook using the last-used paper template with no template dialog and opens it in the editor immediately; an after-writing choice to keep-in-place, move to a folder, merge into an existing notebook, or discard.

**Out:** the template dialog itself (SN-TPL-001); the OS widget/quick-action plumbing beyond the intent (SN-NOTF-001 owns widgets/shortcuts); the editor canvas (SN-ED-002); merge-into-notebook page mechanics (shares the page-append helper).

#### Acceptance criteria

- [ ] Quick Note creates a coverless single-page notebook in the last-used paper template with no dialog and lands in the editor ready to write (PRD-LB-064).
- [ ] The entry points work: double-tap New notebook, a sidebar shortcut, and the OS widget/quick action where available.
- [ ] After writing, the student can keep-in-place, move to a folder, merge into an existing notebook, or discard; discard removes the quick note cleanly.
- [ ] The last-used template is remembered per profile.
- [ ] Correct in all 17 looks + dark; entry points are labelled, 44 pt targets, keyboard-reachable on web.
- [ ] No note content or title logged (CWE-532).

#### Technical notes

`app/lib/features/library/quick_note.dart`; creates a Notebook + single Page via [SN-LIB-003](library.md#sn-lib-003) using the stored last-used `PaperTemplate` (PRD-02 §2). The keep/move/merge/discard decision is a post-write prompt. Merge appends the quick note's page into a target notebook via the shared page-append helper. The OS widget dispatches a deep link that lands in view/confirm, never auto-mutating beyond creating the note (CLAUDE.md §7.8). Editor is SN-ED-002.

#### Security & privacy

None beyond baseline: local creation of a per-profile notebook; nothing sensitive logged (CWE-532, MASVS-PRIVACY-3). The OS quick-action deep link is a verified intent that only creates/opens a quick note — it never mutates existing content without confirmation (CLAUDE.md §7.8, MASVS-PLATFORM-1). No network.

#### UX notes

Matches the Quick Note parity item (PRD-LB-064). The flow is one tap to write, decide later — the post-write bar offers keep/move/merge/discard without blocking. Reduce-motion: no create animation. On phone, Quick Note is a prominent one-hand-reachable entry. Discard confirms only if strokes exist.

#### Test plan

Widget: `app/test/features/library/quick_note_test.dart` (each entry point creates the note in the last template; lands in editor; keep/move/merge/discard outcomes; last-template remembered). Integration: create-quick-note → write → merge-into-existing flow. Golden: post-write decision bar across a light + dark look.

#### Dependencies

[SN-LIB-002](library.md#sn-lib-002) (entry points), [SN-LIB-003](library.md#sn-lib-003) (create/merge).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-019

<a id="sn-lib-019"></a>

**Implement Trash: soft-delete, restore and 30-day auto-purge**

| Field | Value |
|---|---|
| GitHub | #341 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-LIB-009](library.md#sn-lib-009) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The mock's Trash is inert — it always renders empty and no notebook has a delete or restore action (screens Open Question 2). Deletion must be safe: a soft-delete with a 30-day grace, undo, restore, and an auto-purge that never destroys recoverable data prematurely. This is a data-loss-sensitive surface, so correctness of the tombstone lifecycle matters. It implements PRD-LB-065/066 and the tombstone/retention model in `docs/architecture/document-model.md` §8.

#### Scope

**In:** soft-delete of a notebook, folder subtree or page — create a `TrashEntry` with `purgeAt = now + 30 days`, remove it from active views, toast 'Moved to Trash · Undo' (10 s undo window); the Trash view listing trashed items with time-remaining; Restore (returns to `originalParent`, or library root if that parent is gone); Delete permanently (irreversible, confirmed); Empty Trash; a background job that auto-purges entries past `purgeAt` only when the deletion is causally stable (document-model §8.1) so an offline device cannot resurrect data.

**Out:** cross-device tombstone propagation over sync ([SN-LIB-020](library.md#sn-lib-020)); the Trash nav item chrome ([SN-LIB-009](library.md#sn-lib-009)); the Archive state ([SN-LIB-027](library.md#sn-lib-027)); blob GC beyond marking orphaned blobs (SN-SYNC/SN-CORE own compaction).

#### Acceptance criteria

- [ ] Deleting a notebook/folder/page is a soft delete creating a `TrashEntry` with a 30-day `purgeAt`; it leaves active views and toasts 'Moved to Trash · Undo' with a working 10 s undo (PRD-LB-065).
- [ ] The Trash view shows each item with time-remaining and offers Restore, Delete permanently (confirmed) and Empty Trash (PRD-LB-066).
- [ ] Restore returns the item to `originalParent`; if that parent is trashed/gone it restores to library root; a trashed folder restores its whole subtree.
- [ ] Auto-purge removes entries past `purgeAt`, but only once the delete is causally stable — an offline-since-before-delete device cannot resurrect purged data (document-model §8.1). Purging early is treated as a data-loss defect.
- [ ] Delete-permanently and Empty-Trash are irreversible and require explicit confirmation.
- [ ] Correct in all 17 looks + dark; time-remaining is announced to assistive tech; no titles logged (CWE-532).

#### Technical notes

`app/lib/features/library/trash.dart` + repository lifecycle in [SN-LIB-003](library.md#sn-lib-003). Deletion is a `deleteNode` tombstone op (never a destructive erase) per `document-model.md` §8; retention = `Profile.trashRetentionDays` (default 30). The auto-purge job runs as part of compaction and MUST gate on the causal-stability condition (every non-revoked device's `lastSeenHlc >= tombstone Hlc`) — do not purge early. Orphaned blobs are marked for GC after the retention window. Follows ADR-0005; cross-device behaviour is [SN-LIB-020](library.md#sn-lib-020).

#### Security & privacy

Data-loss safety is the primary control: soft-delete + causal-stability-gated purge prevent both accidental loss and resurrection (document-model §8). Trashed items remain per-profile and encrypted-at-rest (MASVS-STORAGE-1, MASVS-PRIVACY-2). Delete-permanently actually removes the local ciphertext + orphaned blobs. Nothing logs titles/content; the toast and Trash list use the (decrypted-in-memory) title only for display (CWE-532).

#### UX notes

Resolves screens Open Question 2. Empty Trash shows the exact copy from [SN-LIB-008](library.md#sn-lib-008) ('Trash is empty — deleted notebooks stay here for 30 days.'). The delete toast offers Undo for 10 s; destructive permanent actions confirm. Time-remaining ('27 days left') is shown per item. Reduce-motion: no purge animation; restore returns items without a fly-in.

#### Test plan

Unit: `packages/sane_core/test/library/trash_lifecycle_test.dart` (soft-delete creates TrashEntry + purgeAt; restore to originalParent / root fallback; subtree restore; permanent delete removes ciphertext). Critical: `auto_purge_causal_stability_test.dart` (an offline device's stale add cannot resurrect a purged item; purge does not run before stability). Widget: undo-within-10s; confirm dialogs. Regression test for any purge-timing bug.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (tombstone ops), [SN-LIB-009](library.md#sn-lib-009) (Trash nav).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-020

<a id="sn-lib-020"></a>

**Propagate trash deletes as cloud tombstones across devices**

| Field | Value |
|---|---|
| GitHub | #342 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | library, sync |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-019](library.md#sn-lib-019), [SN-SYNC-002](sync.md#sn-sync-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Deleting from the library MUST NOT be destructive on the cloud in a way the user cannot recover — explicitly countering Notability's irreversible iCloud delete (PRD-LB-067). Deletes propagate through the op-log as tombstones, and the 30-day Trash exists on every synced device. This issue lands once sync exists (M4) and makes trash a safe, cross-device experience.

#### Scope

**In:** encoding library deletes as tombstone ops on the op-log that sync via the user's cloud drive; ensuring a delete on device A shows in device B's Trash (not gone forever) with the same 30-day window; restore/undelete propagating as an LWW un-set of `trashed`; the causal-stability gate for cross-device purge (every non-revoked device seen the tombstone); conflict handling where one device restores while another deletes (add-wins / LWW resolution per the CRDT model).

**Out:** the local trash UI and lifecycle ([SN-LIB-019](library.md#sn-lib-019)); the sync transport, segments and snapshots (SN-SYNC-002); E2EE of the segments (SN-CRY-001); device registry / revocation (SN-SYNC-001).

#### Acceptance criteria

- [ ] A notebook/folder/page deleted on device A appears in device B's Trash after sync, with the same remaining 30-day window (PRD-LB-067).
- [ ] Restoring on any device un-tombstones it everywhere via the op-log; a delete-vs-restore conflict resolves deterministically (LWW by HLC / add-wins) with no data loss.
- [ ] Cross-device auto-purge runs only after causal stability across all non-revoked devices (document-model §8.1) — no device resurrects purged data.
- [ ] Tombstone ops and any synced trash metadata are ciphertext-only in the cloud; the cloud never sees plaintext titles (MASVS-STORAGE-1).
- [ ] Two devices editing offline then syncing converge with the trash state intact (CRDT).
- [ ] No titles/content in logs (CWE-532).

#### Technical notes

Builds on the tombstone ops from [SN-LIB-019](library.md#sn-lib-019) and the op-log segment sync in SN-SYNC-002 (`docs/architecture/sync.md`, ADR-0006). Deletes are `deleteNode` tombstones; restore is `setAttr trashed=false`; purge is gated by the per-device `lastSeenHlc` watermark in `Workspace.devices` (document-model §2.4, §8). Encryption of segments is handled by SN-CRY/SN-SYNC — this issue must not weaken it. Follows ADR-0005 + ADR-0006.

#### Security & privacy

Non-destructive cross-device delete is the core guarantee (PRD-LB-067): a delete never irreversibly destroys the other device's copy before the 30-day window and causal stability. All cloud-borne tombstone/trash metadata is E2E-encrypted ciphertext (MASVS-STORAGE-1, MASVS-PRIVACY-2, Locked Decision 3) — the drive is dumb transport. Per-profile partitioning of the sync store prevents cross-profile leakage (OWASP-A01). Nothing logs titles/content (CWE-532).

#### UX notes

A delete on the tablet is recoverable on the phone for 30 days — the trust story students expect. The Trash view (from [SN-LIB-019](library.md#sn-lib-019)) is populated from synced tombstones; time-remaining is consistent across devices. Offline deletes queue and reconcile on reconnect with a clear synced/queued indicator. Reduce-motion respected.

#### Test plan

Integration: `app/integration_test/library/trash_sync_test.dart` (two-device sim: delete on A → Trash on B; restore on B → live on A; offline-then-sync convergence). Unit: `trash_conflict_test.dart` (delete-vs-restore LWW/add-wins resolution; cross-device causal-stability purge gate). Security: assert synced trash metadata is ciphertext.

#### Dependencies

[SN-LIB-019](library.md#sn-lib-019) (local trash), SN-SYNC-002 (op-log segments & snapshots).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, integration, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Threat model updated (a trust boundary / stored asset changed)

---

### SN-LIB-021

<a id="sn-lib-021"></a>

**Implement drag & drop to organise notebooks and folders**

| Field | Value |
|---|---|
| GitHub | #343 |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, android-tablet, web |
| Areas | library, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-005](library.md#sn-lib-005), [SN-LIB-011](library.md#sn-lib-011) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Dragging a notebook into a folder is the fastest way to organise. This issue adds drag & drop across the grid/list — moving notebooks into folders, reordering, and dropping onto a folder — with a deliberate guard against Goodnotes' silent merge-on-drop foot-gun (PRD-LB-035). It implements PRD-LB-034/035 at the gesture level.

#### Scope

**In:** drag a notebook/folder onto a folder to move it in; drag to reorder within a view (writing a new fractional-index position); visual drop targets and a drag ghost; dropping a notebook **onto another notebook** prompts 'Move into a new folder / Merge / Cancel' (default a no-op with a hint) instead of silently merging (PRD-LB-035); keyboard-accessible move as an equivalent (menu-based) path on web.

**Out:** the folder model and menu-based move ([SN-LIB-011](library.md#sn-lib-011)); the merge page-append mechanics (shared helper); bulk drag of a multi-selection ([SN-LIB-017](library.md#sn-lib-017) may layer on this); touch-only phone layout adaptations ([SN-LIB-024](library.md#sn-lib-024)).

#### Acceptance criteria

- [ ] Dragging a notebook onto a folder moves it in; dragging within a view reorders it (new fractional-index position), both undoable.
- [ ] Dropping a notebook onto another notebook shows the 'Move into a new folder / Merge / Cancel' prompt; the default action is a no-op with a hint — never a silent merge (PRD-LB-035).
- [ ] Drop targets highlight while dragging; a drag ghost follows the pointer/finger; an invalid drop is rejected cleanly.
- [ ] A keyboard/menu-based move exists as an accessible equivalent on web (drag is not the only path — WCAG 2.5.7).
- [ ] Concurrent moves cannot create a folder cycle (movable-tree rule); correct in all 17 looks + dark.
- [ ] No titles logged during drag (CWE-532).

#### Technical notes

`app/lib/features/library/drag_drop.dart` using Flutter `Draggable`/`DragTarget`. Move/reorder call the repository ([SN-LIB-003](library.md#sn-lib-003)) `moveNode` with a new `FracIndex` between neighbours (`document-model.md` §4.3); cycle avoidance per §4.3. The drop-onto-notebook prompt routes to a new-folder create or the merge helper. Provide the dragging-alternative menu path for a11y (WCAG 2.5.7). Not offered on phones by default ([SN-LIB-024](library.md#sn-lib-024) decides phone affordances).

#### Security & privacy

None beyond baseline: drag & drop is local reorganisation of per-profile items; nothing sensitive logged (CWE-532, MASVS-PRIVACY-3). No cross-app drag payload leaves the app. Moves are tombstone-free position/parent ops; no data-loss.

#### UX notes

Matches the folders parity item (PRD-LB-034) and explicitly fixes Goodnotes' merge foot-gun (PRD-LB-035). Drop zones light up; the ghost is a mini card; reduce-motion keeps the ghost static and skips the settle animation. RTL: drag composes with `EdgeInsetsDirectional` and left-handed mode. A dragging alternative (menu move) is always available for pointer-free users.

#### Test plan

Widget: `app/test/features/library/drag_drop_test.dart` (move into folder; reorder position; drop-onto-notebook prompt not silent merge; invalid drop rejected; keyboard/menu equivalent). Unit: `reorder_fracindex_test.dart` (position between neighbours; no cycle). Golden: drop-target highlight across a light + dark look.

#### Dependencies

[SN-LIB-005](library.md#sn-lib-005) (draggable cards), [SN-LIB-011](library.md#sn-lib-011) (folders as drop targets).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-022

<a id="sn-lib-022"></a>

**Add per-notebook look/theme override in notebook settings**

| Field | Value |
|---|---|
| GitHub | #344 |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, theming |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-016](library.md#sn-lib-016), [SN-DS-001](design-system.md#sn-ds-001) |
| Security controls | `MASVS-PRIVACY-3` |
| Extra labels | agent-ready, innovation |

#### Context

Every one of the 17 looks restyles the whole app including the notebook pages (screens §0). The document model gives each Notebook its own `lookId` (`document-model.md` §1.2), which means a student can give a specific notebook its own look — a calm Paper look for reading, a bold Cyberpunk for brainstorming — independent of the app-wide default. This issue exposes that per-notebook override in notebook settings, a differentiator over competitors that theme globally only.

#### Scope

**In:** a 'Notebook look' control in a notebook's settings (reached from the overflow menu) letting the user pick any of the 17 looks or 'Use app default'; persisting the choice to the Notebook `lookId` (LWW); applying that look to the notebook's editor and its card preview; a clear indicator when a notebook overrides the app default; falling back to the active profile's look when set to default.

**Out:** the app-wide look switcher and dark-mode (SN-DS-001 / settings appearance); the token/theme engine (SN-DS-001); per-profile look ([SN-LIB-023](library.md#sn-lib-023) handles profile-scoped defaults); wallpaper (settings, per-device).

#### Acceptance criteria

- [ ] A notebook can be set to any of the 17 looks or 'Use app default', persisted to `lookId` and surviving close/reopen and profile switch.
- [ ] Opening a notebook with an override applies that look to its editor and card; 'Use app default' follows the profile/app look live.
- [ ] Dark mode still applies (each look has a night version); PDFs keep their original colours regardless of look (screens §0).
- [ ] The override is indicated in the notebook settings and (subtly) on the card.
- [ ] Correct across all 17 looks + dark; the control is labelled, keyboard-operable on web, 44 pt targets.
- [ ] The look id is a token reference, not a colour; nothing sensitive logged (MASVS-PRIVACY-3).

#### Technical notes

`app/lib/features/library/notebook_look.dart`; the override is a `setAttr lookId` LWW op on the Notebook via [SN-LIB-003](library.md#sn-lib-003). Applying it wraps the notebook editor in a `SaneLookScope` with the notebook's look (SN-DS-001 provides the theme layer and the 17 looks). Default = null → inherit the active profile/app look. Dark mode is orthogonal (each look has light/dark). Follows ADR-0003 (theming via ThemeExtension) and screens §0.

#### Security & privacy

None beyond baseline: `lookId` is a theme token reference carrying no user content; nothing sensitive is logged (MASVS-PRIVACY-3). No network. The choice is per-notebook, per-profile local state.

#### UX notes

Matches 'Every look restyles the entire app including the notebook pages' (screens §0) taken to per-notebook granularity. The settings control is a compact theme picker with a live preview; 'Use app default' is the top option. Reduce-motion: the look applies without a cross-fade of the whole palette (snap, per SN-DS-001). RTL-correct.

#### Test plan

Widget: `app/test/features/library/notebook_look_test.dart` (set/override/reset to default; persistence across reopen + profile switch; dark-mode orthogonality; PDF colours unaffected). Golden: a notebook card + editor chrome with an override look vs the default across light + dark.

#### Dependencies

[SN-LIB-016](library.md#sn-lib-016) (settings entry point), SN-DS-001 (look/theme engine).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-023

<a id="sn-lib-023"></a>

**Enforce multi-profile data isolation across the library**

| Field | Value |
|---|---|
| GitHub | #345 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `OWASP-A01`, `ASVS-V8`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Profiles claim 'separate notebooks and looks', but the mock only changes the avatar/greeting on switch (screens Open Question 15). The underlying per-profile partitioning mechanism (schema scope, query/index/cache scoping, per-profile sub-keys, the active-profile provider) is owned by [SN-AUTH-013](auth.md#sn-auth-013); this issue applies and verifies it across every library surface so switching the active profile swaps the entire visible dataset. It implements PRD-LB-350 (and the per-account boundary in PRD-LB-351) and is the privacy backbone of a shared family/study device.

#### Scope

**In:** verifying every library surface honours the profile partition from [SN-AUTH-013](auth.md#sn-auth-013) - notebooks, folders, subjects, tags, covers, recents, favourites, trash, look/theme, wallpaper, and prefs all switch entirely on profile change with zero bleed-through across All/Recent/Favorites/Shared/Trash, subjects and tags; the fast library profile-switch UX that re-scopes every library query and rebuilds the UI to the new profile's data; keying the library thumbnail/cover caches by profile; and documenting the per-account boundary (identity, entitlement/plan, student-verification, cloud backup destination) shared across a user's profiles (PRD-LB-351).

**Out:** the underlying per-profile partitioning mechanism - drift schema profileId scope, repository/query scoping, FTS index and cache-directory partitioning, per-profile encryption sub-keys and the active-profile provider - owned by [SN-AUTH-013](auth.md#sn-auth-013), which this issue consumes and verifies; the profile picker and profile CRUD (SN-AUTH-007); identity/account (SN-AUTH-001); the sync store's per-profile partitioning (SN-SYNC-001); wallpaper storage (settings/per-device).

#### Acceptance criteria

- [ ] Switching profiles swaps notebooks, folders, subjects, tags, covers, recents, favourites, trash, look, wallpaper and prefs — not just the avatar/greeting (PRD-LB-350).
- [ ] No library query can return another profile's rows; a test with two seeded profiles proves zero bleed-through in every view (All/Recent/Favorites/Shared/Trash, subjects, tags).
- [ ] The switch is fast (re-scope, no full reload of unaffected caches) and loses no unsaved state in the outgoing profile.
- [ ] Per-account fields (identity, plan, student status, backup destination) are shared across profiles and are NOT swapped (PRD-LB-351).
- [ ] Thumbnails/covers of one profile are not visible while another profile is active.
- [ ] No profile names or note titles logged (CWE-532).

#### Technical notes

The `profileId` scope is enforced by the persistence mechanism in [SN-AUTH-013](auth.md#sn-auth-013) (and [SN-LIB-003](library.md#sn-lib-003)); this issue verifies every library surface passes the active profile and that caches (thumbnails [SN-LIB-014](library.md#sn-lib-014), covers [SN-LIB-015](library.md#sn-lib-015)) are keyed by profile. Active profile lives in the Workspace doc (`activeProfileId`, document-model §1.2) and is set by SN-AUTH-007. Per-account vs per-profile split follows PRD-LB-350/351. This is a privacy boundary, not a hard auth boundary (local profiles are spaces, not accounts) — document that in Technical notes. Consumes the active-profile provider ([SN-AUTH-007](auth.md#sn-auth-007)) and the profileId-scope partition mechanism ([SN-AUTH-013](auth.md#sn-auth-013)) behind interfaces; the library-surface wiring and per-profile cache keying ship in M2 against a single-profile (guest) stub, with full isolation verified when both land in M4.

#### Security & privacy

Data isolation between profiles is a privacy + access-control control (MASVS-PRIVACY-1/2, OWASP-A01, ASVS V8): a leak would show one family member another's notes. Every query is profile-scoped; caches are profile-keyed; nothing crosses on switch. Note that local profiles are a UX privacy boundary on a shared device, not an authenticated security boundary (a determined local attacker with device access is out of scope) — recorded here per CLAUDE.md §13 open item. No profile names/titles logged (CWE-532).

#### UX notes

Resolves screens Open Question 15. The switch feels like changing users: the whole library, look and wallpaper change together. Reduce-motion: the swap is a cross-fade, not a slide. The active profile is always indicated in the sidebar. Empty new profile shows the 'Nothing here yet.' state ([SN-LIB-008](library.md#sn-lib-008)).

#### Test plan

Unit: `packages/sane_core/test/library/profile_isolation_test.dart` (two profiles; every query type returns only the active profile's rows; per-account fields shared). Widget/integration: `app/integration_test/library/profile_switch_test.dart` (switch swaps notebooks/look/wallpaper/trash; no cache bleed-through; outgoing unsaved state preserved). Security: negative test that a crafted query cannot escape the profile scope.

#### Dependencies
[SN-LIB-003](library.md#sn-lib-003) (scoped queries). This wires every library surface to the active-profile provider and the per-profile partition — the `activeProfileId` provider from [SN-AUTH-007](auth.md#sn-auth-007) and the profileId-scope mechanism from [SN-AUTH-013](auth.md#sn-auth-013) — through their interfaces; a single-profile (guest) stub is used until profiles/partitioning land in M4, so neither is a scheduling blocker for the library wiring.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, integration, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Threat model updated if the profile trust boundary changed

---

### SN-LIB-024

<a id="sn-lib-024"></a>

**Adapt the library layout for phones and narrow web**

| Field | Value |
|---|---|
| GitHub | #346 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | web, ios-phone, android-phone |
| Areas | library, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-002](library.md#sn-lib-002), [SN-LIB-005](library.md#sn-lib-005), [SN-LIB-009](library.md#sn-lib-009) |
| Security controls | `MASVS-PRIVACY-3` |
| Extra labels | agent-ready |

#### Context

The library must work from a ~400 px phone through tablet and desktop web. Below 900 px the sidebar collapses to an icon rail and desktop-only affordances change (screens §0). This issue makes the library first-class on phones and narrow web: one-hand reach, a compact grid, a reachable primary action, and drag alternatives — parity that competitors fail at (milestone M5).

#### Scope

**In:** the responsive library layout for the `narrow` class (< 900 px) and phone sizes — sidebar collapses to a 68 px icon rail (or a bottom sheet on phone), the notebook grid reflows to fewer columns, the header actions collapse into a reachable menu/FAB, filter chips scroll horizontally, and drag-to-organise is replaced by menu-based move where touch drag is awkward; one-hand-reachable New notebook / Quick Note; foldable window-class changes reflow without state loss.

**Out:** the desktop/tablet layout ([SN-LIB-002](library.md#sn-lib-002)/[SN-LIB-005](library.md#sn-lib-005)); the phone editor (SN-PHN-001 / SN-ED); OS widgets (SN-NOTF-001); the general adaptive primitives (SN-DS-001 provides window-size classes).

#### Acceptance criteria

- [ ] At ~400 px the library is fully usable: grid reflows to fewer columns, sidebar becomes an icon rail / bottom nav, and no horizontal body scroll occurs.
- [ ] Primary actions (New notebook, Quick Note, Search) are reachable one-handed on a phone.
- [ ] Drag-to-organise degrades to a menu-based move on phone; all management actions remain reachable.
- [ ] Foldable fold/unfold and window-class changes reflow the library without losing selection, scroll or filter state.
- [ ] Correct in all 17 looks + dark; touch targets ≥ 44 pt; keyboard-reachable on narrow web.
- [ ] Nothing sensitive logged (MASVS-PRIVACY-3).

#### Technical notes

`app/lib/features/library/library_adaptive.dart` using the window-size classes from SN-DS-001 and the `narrow` threshold (< 900 px, screens §0). Reflow the `SliverGrid` cross-axis count by width; swap the sidebar for a rail/bottom sheet. Foldable handling reads `MediaQuery`/display features and preserves the library state object across reconfiguration. Menu-based move is the a11y/touch fallback for [SN-LIB-021](library.md#sn-lib-021). Follows the phones platform doc (`docs/platform/phones.md`) and compatibility matrix.

#### Security & privacy

None beyond baseline: layout adaptation only; nothing sensitive logged (MASVS-PRIVACY-3). No new data flows. Screenshot/recents-thumbnail privacy on task-switch is handled by the platform hardening area, not here.

#### UX notes

Matches the `narrow` collapse (screens §0). On phone the grid is a comfortable two columns, chips scroll, and the sidebar is a bottom or drawer nav. Reduce-motion respected during reflow. RTL and left-handed compose. The library never scrolls horizontally at the body level (only chips do).

#### Test plan

Widget: `app/test/features/library/library_adaptive_test.dart` (column reflow by width; sidebar → rail/bottom nav at < 900 px; no horizontal body scroll at 400 px; state preserved across a simulated fold). Golden: library at 400 px, 768 px and 1180 px across a light + dark look.

#### Dependencies

[SN-LIB-002](library.md#sn-lib-002) (scaffold), [SN-LIB-005](library.md#sn-lib-005) (grid/list), [SN-LIB-009](library.md#sn-lib-009) (sidebar).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-025

<a id="sn-lib-025"></a>

**Virtualise and paginate library grid, list and page collections**

| Field | Value |
|---|---|
| GitHub | #347 |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-003](library.md#sn-lib-003), [SN-LIB-005](library.md#sn-lib-005) |
| Security controls | `MASVS-PRIVACY-3` |
| Extra labels | agent-ready |

#### Context

A student's library can hold thousands of notebooks and a notebook thousands of pages. All list/grid surfaces MUST virtualise (render only visible rows) and paginate the underlying query so those libraries stay within the perf budgets — open a 1,000-page notebook < 1 s, scroll a 500-notebook grid at 60 fps with no frame > 16.7 ms (PRD-LB-360, §15). This issue delivers that virtualisation and enforces it with a perf gate.

#### Scope

**In:** virtualised builders for the grid, list and page collections (only visible cells build); cursor/offset pagination against the repository query so the whole dataset is never loaded; recycling of card/thumbnail widgets; a bounded in-memory window with eviction; a perf-harness test that fails CI if the open-1000-page or 500-card-scroll budgets regress.

**Out:** the card/row widgets ([SN-LIB-005](library.md#sn-lib-005)); the repository query itself ([SN-LIB-003](library.md#sn-lib-003) exposes the paginated API); thumbnail generation ([SN-LIB-014](library.md#sn-lib-014)); the perf-harness tool itself (SN-PERF-001/002).

#### Acceptance criteria

- [ ] Opening a 1,000-page notebook renders the first screen in < 1 s on the reference device (§15).
- [ ] Scrolling a 500-notebook grid holds 60 fps with no frame > 16.7 ms (§15) — asserted by the perf harness in CI.
- [ ] Only visible cells are built; off-screen cards/thumbnails are recycled and evicted within a bounded memory window (memory stays < 300 MB on 4 GB Android).
- [ ] Pagination fetches additional pages as the user scrolls; there is no full-dataset load.
- [ ] A deliberate regression (e.g. building all cells) fails the CI perf gate.
- [ ] Nothing sensitive logged (MASVS-PRIVACY-3).

#### Technical notes

`app/lib/features/library/virtualised_collection.dart` using `SliverGrid`/`SliverList` builder delegates and a paged data source over [SN-LIB-003](library.md#sn-lib-003). Fetch-ahead by a small window; evict beyond it. Wire a `tools/perf_harness` scenario for library open + scroll (SN-PERF-002) into CI as a hard gate (docs/roadmap.md standing gates; Locked Decision 7). Never do heavy work on the scroll frame; thumbnails are off-isolate ([SN-LIB-014](library.md#sn-lib-014)).

#### Security & privacy

None beyond baseline: virtualisation is a rendering/performance concern over local per-profile data; nothing sensitive logged (MASVS-PRIVACY-3). Bounded windows also cap memory residency of decrypted metadata, a minor privacy benefit. No network.

#### UX notes

Invisible when right — the library simply never janks. A pending page shows the skeleton ([SN-LIB-008](library.md#sn-lib-008)), never a blocking spinner. Reduce-motion respected. Scroll position is preserved across nav/filter where sensible. This underwrites the 'instant library' promise (screens §6, §15).

#### Test plan

Perf: `app/integration_test/library/library_perf_test.dart` via the perf harness (open-1000-page < 1 s; 500-card scroll 60 fps; memory ceiling). Widget: `virtualised_collection_test.dart` (only visible cells built; pagination fetch-ahead; eviction). CI gate proven to fail on a synthetic non-virtualised build.

#### Dependencies

[SN-LIB-003](library.md#sn-lib-003) (paginated query), [SN-LIB-005](library.md#sn-lib-005) (cells to virtualise).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, perf gate, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-026

<a id="sn-lib-026"></a>

**Implement smart collections (saved filters) in the sidebar**

| Field | Value |
|---|---|
| GitHub | #348 |
| Type | feature |
| Priority | p3 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-009](library.md#sn-lib-009), [SN-LIB-012](library.md#sn-lib-012) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Power users repeat the same searches — 'everything tagged #exam in Physics from this month'. Smart collections let a student save a filter (subject + tags + type + date range) as a pinnable sidebar entry that re-evaluates live. It implements PRD-LB-038 and turns the ad-hoc filters into durable, reusable views.

#### Scope

**In:** a 'Save as collection' action from the current filter state (subject + tags + type filters + date range); a SmartCollection entity persisted per profile; pinnable sidebar entries that re-evaluate live (adding a matching notebook updates the collection automatically); rename/edit/delete of a collection; the collection view reusing the standard grid/list.

**Out:** the underlying filter chips/sort ([SN-LIB-005](library.md#sn-lib-005)/[SN-LIB-007](library.md#sn-lib-007)); tags ([SN-LIB-012](library.md#sn-lib-012)); folders ([SN-LIB-011](library.md#sn-lib-011)); and the search-screen "Save current search as a collection" entry point plus FTS-query-backed collections (a saved full-text query re-run live via the search engine), which are owned by [SN-SRCH-014](search.md#sn-srch-014) and reuse the SmartCollection entity + sidebar this issue defines. This issue owns the SmartCollection entity, its per-profile persistence, the sidebar UI, and live re-evaluation over library metadata (subject/tag/type/date).

#### Acceptance criteria

- [ ] A current filter (subject + tags + type + date range) can be saved as a named collection and appears in the sidebar (PRD-LB-038).
- [ ] The collection re-evaluates live: a notebook that starts matching the criteria appears without a manual refresh; one that stops matching drops out.
- [ ] Collections are pinnable/reorderable, renamable, editable and deletable, per profile.
- [ ] Opening a collection shows results in the standard grid/list with the active sort.
- [ ] Correct in all 17 looks + dark; sidebar entries are labelled and keyboard-reachable on web.
- [ ] Collection criteria may reference tags/subjects (sensitive labels) and are never logged (CWE-532).

#### Technical notes

`app/lib/features/library/smart_collection.dart`; a SmartCollection stores the filter predicate and is evaluated by the repository ([SN-LIB-003](library.md#sn-lib-003)) as a live query (reactive stream). Persist per profile via the Library doc (LWW/set). Sidebar integration extends [SN-LIB-009](library.md#sn-lib-009). Date-range is evaluated against `updatedAt`/`createdAt`. Follows PRD-LB-038; milestone M4 aligns with when saved-search value peaks (post-sync), but it is local-first and works offline.

#### Security & privacy

None beyond baseline: a collection is a stored predicate over per-profile metadata; tag/subject labels in the predicate are user content and are never logged (CWE-532, MASVS-PRIVACY-3). Evaluation is local (no server query). Per-profile scoped like every other library surface.

#### UX notes

Matches the saved-smart-search parity item (PRD-LB-038). A saved collection sits in the sidebar under the fixed nav items; a subtle 'live' indicator conveys it updates automatically. Editing reopens the filter builder. Reduce-motion respected. Empty collection defers to [SN-LIB-008](library.md#sn-lib-008).

#### Test plan

Unit: `packages/sane_core/test/library/smart_collection_test.dart` (predicate evaluation; live add/remove on matching change; date-range). Widget: `smart_collection_sidebar_test.dart` (save from filter; pin/reorder/rename/delete; open shows results). Golden: a smart-collection sidebar entry across a light + dark look.

#### Dependencies

[SN-LIB-009](library.md#sn-lib-009) (sidebar), [SN-LIB-012](library.md#sn-lib-012) (tags in criteria).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-027

<a id="sn-lib-027"></a>

**Add an Archive state for non-destructive hide-from-library**

| Field | Value |
|---|---|
| GitHub | #349 |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library |
| Size | S |
| SDLC | implementation |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-016](library.md#sn-lib-016) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | needs-decision |

#### Context

Students finish a semester's notebooks but do not want to delete them — they want them out of the main library without a purge timer. Archive is a non-destructive 'hide from main library' state distinct from Trash (no purge). PRD-LB-068 proposes it as SHOULD, but whether to ship Archive as its own state or fold it into a tag is an open maintainer decision (CLAUDE.md §13, PRD-02 §17 Q7) — so this issue is scoped but blocked on that call.

#### Scope

**In (pending the decision):** an `archived` state on a notebook/folder (distinct from `trashed`, no `purgeAt`); an 'Archive' / 'Unarchive' action in the overflow menu; an 'Archived' sidebar entry listing archived items; archived items excluded from the main library, All, Recent and search-by-default but restorable at any time; the alternative (fold Archive into a reserved system tag) documented so the maintainer can choose.

**Out:** Trash ([SN-LIB-019](library.md#sn-lib-019)); tags ([SN-LIB-012](library.md#sn-lib-012)) — the fold-into-tag alternative reuses tags if chosen; the overflow menu container ([SN-LIB-016](library.md#sn-lib-016)).

#### Acceptance criteria

- [ ] (If shipped as a state) Archiving hides a notebook/folder from the main library, All, Recent and default search, with no purge timer, and Unarchive restores it exactly (PRD-LB-068).
- [ ] Archived items are reachable via an 'Archived' sidebar entry and are per-profile.
- [ ] Archive is clearly distinct from Trash (no countdown, no permanent-delete implication) in copy and placement.
- [ ] The chosen approach (dedicated state vs system tag) is recorded in the issue and the relevant PRD/decision note.
- [ ] Correct in all 17 looks + dark; accessible labels; nothing sensitive logged (CWE-532).

#### Technical notes

Maintainer decision required (CLAUDE.md §13 'Archive vs Trash'): (a) an `archived` LWW flag on the Notebook/Folder plus an Archived view, or (b) a reserved system tag reusing [SN-LIB-012](library.md#sn-lib-012). Implement the decisive default proposed in PRD-LB-068 (a distinct Archive state) behind the decision, leaving a `// DESIGN-OPEN` marker linking the decision if unresolved. CRUD via [SN-LIB-003](library.md#sn-lib-003). Marked needs-decision and not agent-ready until the maintainer chooses.

#### Security & privacy

None beyond baseline: Archive is a non-destructive visibility flag over per-profile items; nothing sensitive logged (CWE-532, MASVS-PRIVACY-3). No data-loss risk (unlike Trash, there is no purge). No network. Per-profile scoped.

#### UX notes

Matches the Archive proposal (PRD-LB-068). Copy must make clear Archive is 'set aside, not deleted' — no 30-day language. Reduce-motion respected. If folded into a tag, the UX becomes a predefined system tag + a smart-collection view ([SN-LIB-026](library.md#sn-lib-026)). Empty Archived defers to [SN-LIB-008](library.md#sn-lib-008).

#### Test plan

Widget: `app/test/features/library/archive_test.dart` (archive hides from main/All/Recent; Archived view lists; unarchive restores; distinct from Trash; per-profile). Unit: `archive_state_test.dart` (flag round-trip). Note: finalise once the maintainer resolves the Archive-vs-tag decision.

#### Dependencies

[SN-LIB-016](library.md#sn-lib-016) (overflow menu entry point); maintainer decision (Archive vs Trash, CLAUDE.md §13).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, security scans)
- [ ] Maintainer decision recorded (Archive state vs system tag) in the PRD/decision note
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-LIB-028

<a id="sn-lib-028"></a>

**Add library golden, widget and integration tests with a11y coverage**

| Field | Value |
|---|---|
| GitHub | #350 |
| Type | test |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | library, qa, a11y |
| Size | M |
| SDLC | verification |
| Parent | [SN-LIB-001](library.md#sn-lib-001) |
| Depends on | [SN-LIB-005](library.md#sn-lib-005), [SN-LIB-016](library.md#sn-lib-016), [SN-LIB-019](library.md#sn-lib-019), [SN-LIB-023](library.md#sn-lib-023) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The library is the daily home surface, so its behaviour and appearance must be locked down by tests: golden coverage across all 17 looks + dark, widget tests for every interaction, integration tests for the end-to-end organise/trash/restore flows, and an accessibility pass (WCAG 2.2 AA, VoiceOver/TalkBack labels, 44 pt targets, keyboard on web, RTL). It implements the library slice of PRD-LB-370 and the testing rules in CLAUDE.md §10.

#### Scope

**In:** golden tests for `SaneNotebookCard`, `SaneNotebookRow`, filter chips, empty/loading states, sidebar and recents across all 17 looks × light/dark; widget tests aggregating the feature tests into a suite; integration tests for the core flows (create → subject/tag/folder organise → favourite → move → trash → restore; profile switch isolation); an a11y audit asserting labels, roles, states, contrast, 44 pt targets, keyboard reachability on web, RTL mirroring, and OCR-backed alt-text hooks for handwriting thumbnails.

**Out:** the features themselves (their own issues); the perf gate ([SN-LIB-025](library.md#sn-lib-025)); global a11y infrastructure (SN-A11Y-001); the search/recognition surfaces (SN-SRCH/SN-HWR).

#### Acceptance criteria

- [ ] Golden tests cover the library card/row/chips/empty/sidebar/recents across all 17 looks × light/dark and fail on any visual drift.
- [ ] Integration tests cover create → organise (subject/tag/folder) → favourite → move → trash → restore, and a profile-switch isolation flow, all green.
- [ ] The a11y suite asserts every interactive element exposes name/role/state, contrast ≥ 4.5:1 (text) / ≥ 3:1 (UI), 44 pt targets, keyboard operability on web, and correct RTL mirroring.
- [ ] Handwriting thumbnails expose OCR-backed alt-text where recognition is available (PRD-LB-370 hook).
- [ ] The suite runs in CI and gates merges to library code; no test logs note titles/content (CWE-532).

#### Technical notes

Tests live under `app/test/features/library/goldens/`, `app/test/features/library/`, and `app/integration_test/library/`. Golden harness parameterises the 17 looks × 2 modes (mirrors the SN-DS golden approach). Integration uses `integration_test`/`patrol`. A11y assertions use the Flutter semantics + a contrast checker (reuse SN-DS-006/007 tooling). RTL cases force Arabic. Follows CLAUDE.md §10 and `docs/design/accessibility.md`.

#### Security & privacy

None beyond baseline: tests use synthetic fixtures, never real user data, and assert that library widgets do not log note titles/tags/content (CWE-532, MASVS-PRIVACY-3). A negative test confirms profile isolation ([SN-LIB-023](library.md#sn-lib-023)) holds. No network in tests.

#### UX notes

Guards the visible library across every look in `design/Sane Notes.dc.html` and every cross-cutting state (`docs/design/component-inventory.md` §9). The a11y pass ensures the library is operable with VoiceOver/TalkBack and a keyboard, and correct in RTL and left-handed mode — the accessibility mandate (Locked Decision 10).

#### Test plan

This issue *is* the test plan: golden (`notebook_card_looks`, `sidebar_looks`, `empty_states_looks`), widget aggregation, integration (`organise_flow`, `trash_restore_flow`, `profile_switch`), and a11y (`library_a11y_test.dart`). CI wires them into the library gate.

#### Dependencies

[SN-LIB-005](library.md#sn-lib-005), [SN-LIB-016](library.md#sn-lib-016), [SN-LIB-019](library.md#sn-lib-019), [SN-LIB-023](library.md#sn-lib-023) (surfaces under test).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, integration, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-010

<a id="sn-phn-010"></a>

**Implement the Capture hub and the Quick Notes inbox**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | library, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-003](design-system.md#sn-phn-003), [SN-CORE-004](storage.md#sn-core-004), [SN-AUTH-007](auth.md#sn-auth-007) |
| Security controls | `MASVS-AUTH-1`, `MASVS-STORAGE-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Quick capture is 'the phone's killer job' (docs/platform/phones.md §5) and the centre bottom-nav Capture affordance is called the phone's signature: one thumb tap to a new note, a new voice note, or a camera scan, with the explicit instruction **do not bury capture behind the library** (phones.md §2, §5). Captured notes must land in a well-known **Inbox / Quick Notes** location and sync via the user's own cloud so they appear on the tablet (decision 3), and capture **MUST work in guest mode (no sign-in) and offline** (phones.md §5).

PRD-04 pins the quality bar: PRD-CO-270 requires a one-tap 'new note now' that opens a blank ink page with the last-used paper and pen, minimal chrome, and lands in a **writable page in < 1.5 s** from a cold start (locked decision 7). This issue builds the in-app half of that — the hub sheet, the Quick Notes destination, and the cold-start path — so that [SN-PHN-013](notifications.md#sn-phn-013) (widgets/tiles) and [SN-PHN-014](notifications.md#sn-phn-014) (shortcuts/share targets) only have to route into it.

#### Scope
**In:** the Capture bottom sheet (New note / Voice note / Scan), the Quick Notes inbox notebook and its lifecycle (auto-created per profile, visible in Library, movable/filable), the fast cold-start route that lands directly on a writable page, last-used paper/pen restoration, guest-mode and offline behaviour, and a file-into-a-notebook action from the inbox.
**Out:** camera scan implementation ([SN-PHN-011](images-media.md#sn-phn-011)), audio-first lecture mode ([SN-PHN-012](audio.md#sn-phn-012)), widgets and tiles ([SN-PHN-013](notifications.md#sn-phn-013)), shortcuts/share targets ([SN-PHN-014](notifications.md#sn-phn-014)), the lock/guest hardening of external entry points ([SN-PHN-015](security.md#sn-phn-015)), and cloud sync mechanics ([SN-SYNC-001](sync.md#sn-sync-001)).

#### Acceptance criteria
- [ ] Tapping the centre Capture slot opens a bottom sheet with exactly three actions — New note, Voice note, Scan — each >= 48×48 dp / 44×44 pt with labels and `Semantics`.
- [ ] 'New note' lands on a **writable** blank page with the last-used paper, tint and pen in < 1.5 s measured from process start on the iPhone-ref device and < 2 s on Android-lowend (budget B6, PRD-CO-270).
- [ ] The page is writable before any sync, index or recognition work has started — nothing on the capture path waits on a database write, network call or recognition (ux-principles.md §1).
- [ ] Captured notes land in a per-profile **Quick Notes** notebook that appears in the Library with its own cover and is reachable from the sidebar/bottom nav; it is created lazily on first capture, never pre-seeded as clutter.
- [ ] An inbox item can be moved into a real notebook in two taps, and the move is undoable.
- [ ] Capture works fully in **guest mode** with no account and with the network off; nothing in the flow prompts to sign in.
- [ ] A capture started while the device is offline is durable across process death: killing the app mid-stroke loses at most the current stroke.
- [ ] Re-entering Capture while an unfiled quick note from the last 5 minutes exists offers 'Continue that note' as well as 'New note'.
- [ ] The sheet renders correctly in all 17 looks and dark mode, and honours Reduce Motion (cross-fade instead of slide).
- [ ] Empty inbox shows the standard empty state voice ('Nothing here yet.' plus one line explaining what lands here) per ux-principles.md §4.1.

#### Technical notes
Add `app/lib/capture/` (hub sheet, capture intents, cold-start route) and route it through go_router with a dedicated `/capture/new` route so external entry points in [SN-PHN-013](notifications.md#sn-phn-013)/[SN-PHN-014](notifications.md#sn-phn-014) target a URL rather than an internal API (ADR-0003; keeps deep links identical to tablet/web per phones.md §2). The Quick Notes notebook is an ordinary `Notebook` in `sane_core` with a reserved role flag — not a special table — so CRDT, sync, export and trash behave normally (ADR-0005, docs/architecture/document-model.md). For the cold-start budget, defer heavy plugin init (ML, PDF, audio) until used (phones.md §8) and open the editor against an empty in-memory page while the storage isolate warms; persistence catches up through the normal op-log path ([SN-CORE-004](storage.md#sn-core-004)). Last-used paper/pen comes from profile preferences ([SN-AUTH-007](auth.md#sn-auth-007) local profiles). Measure the cold-start path with `tools/perf_harness` so it can be gated in CI ([SN-PERF-003](perf.md#sn-perf-003)).

#### Security & privacy
Threats and controls: **T-GUEST-GATE** — a capture flow that requires or nudges sign-in would break locked decision 5 and push content toward an account. Control: guest mode is first-class; the capture route has no auth dependency and an automated test asserts it never navigates to Login (MASVS-AUTH-1, ASVS V3). **T-UNENCRYPTED-DRAFT** — a fast path that writes a draft outside the normal store would leave plaintext note content on disk. Control: drafts persist only through the standard `sane_core` + `sane_crypto` path; no temp files, no shared-preferences blobs, no unencrypted cache (MASVS-STORAGE-1, MASVS-CRYPTO-1, CWE-312, CWE-922). **T-INBOX-LEAK** — the Quick Notes notebook becomes a predictable place to look on a shared device. Control: it participates in app/profile lock and per-notebook lock exactly like any other notebook (PRD-LOCK-005/006; MASVS-PLATFORM-3). **T-LOG** — no note titles or content in logs; object ids log as opaque short hashes (CLAUDE.md §7.3, MASVS-PRIVACY-1). No new network egress.

#### UX notes
Surfaces: the compact shell's centre Capture slot ([SN-PHN-003](design-system.md#sn-phn-003)), the Library screen (docs/design/screens-and-flows.md §6) where Quick Notes appears as a notebook card, and the Editor (§7) as the landing surface. Sheets slide from the bottom (phones.md §7) and use `SaneButton`/`SaneToast` from `sane_ui`, so every look and both modes are covered by construction. Copy follows the ux-principles.md §5 voice and reuses existing lines where a moment recurs — the post-capture toast reads 'Saved to Quick Notes', and filing reads 'Moved to <notebook>'. The inbox empty state: 'Nothing here yet.' + 'Anything you capture from a widget, a share, or the Capture button lands here.' Loading: none — local content renders instantly; the capture route must never show a spinner. a11y: sheet items are in a logical focus order, the sheet traps focus while open and returns focus to the Capture slot on dismiss, and each action has a distinct, spoken label.

#### Test plan
- `app/test/capture/capture_hub_test.dart` — three actions, semantics, dismiss/focus return, Reduce Motion path.
- `app/test/capture/quick_notes_inbox_test.dart` — lazy creation per profile, appears in Library, file-into-notebook is undoable, empty state copy.
- `app/test/capture/guest_capture_test.dart` — capture with no account and no network never routes to Login (negative test).
- `app/test/capture/capture_durability_test.dart` — simulated process death mid-capture loses at most the current stroke.
- `app/integration_test/phone_quick_capture_test.dart` — cold-start-to-writable timing on iPhone-ref and Android-lowend via `tools/perf_harness`.
- `app/test/golden/phone/capture_sheet_golden_test.dart` — goldens per look family, light and dark.

#### Dependencies
[SN-PHN-003](design-system.md#sn-phn-003), [SN-CORE-004](storage.md#sn-core-004), [SN-AUTH-007](auth.md#sn-auth-007)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

