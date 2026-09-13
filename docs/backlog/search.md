# Backlog — area: search

22 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-SRCH-001](search.md#sn-srch-001) **Build unified on-device search over handwriting, text, PDF and audio** (epic · M2 Library & Documents)
  - [SN-SRCH-002](search.md#sn-srch-002) **Implement FTS5 index schema, SearchIndexRow model and query model** · p1 · feature · L · M2 Library & Documents
  - [SN-SRCH-003](search.md#sn-srch-003) **Implement query parsing, BM25 ranking, snippet extraction and highlighting** · p1 · feature · M · M2 Library & Documents
  - [SN-SRCH-004](search.md#sn-srch-004) **Build the incremental search indexing pipeline on a background isolate** · p1 · feature · L · M2 Library & Documents
  - [SN-SRCH-005](search.md#sn-srch-005) **Index typed text, titles, tags, subjects and outline entries** · p1 · feature · M · M2 Library & Documents
  - [SN-SRCH-006](search.md#sn-srch-006) **Build the global search screen with filters, result cards and snippets** · p1 · feature · L · M2 Library & Documents
    - [SN-SRCH-007](search.md#sn-srch-007) **Add the search launcher and keyboard shortcut (sidebar, Cmd/Ctrl-K)** · p2 · task · S · M2 Library & Documents
    - [SN-SRCH-013](search.md#sn-srch-013) **Render the handwriting scribble preview in search result cards** · p2 · design · S · M3 Audio & Recognition
  - [SN-SRCH-008](search.md#sn-srch-008) **Implement in-note find and highlight (Cmd/Ctrl-F, next/prev, counter)** · p2 · feature · M · M2 Library & Documents
  - [SN-SRCH-009](search.md#sn-srch-009) **Deep-link search results to the exact page and highlight the quad or stroke** · p1 · feature · M · M3 Audio & Recognition
  - [SN-SRCH-010](search.md#sn-srch-010) **Integrate background handwriting recognition into the search index** · p1 · feature · M · M3 Audio & Recognition
  - [SN-SRCH-011](search.md#sn-srch-011) **Index PDF text layers and OCR imported PDFs and images for search** · p1 · feature · M · M3 Audio & Recognition
  - [SN-SRCH-012](search.md#sn-srch-012) **Index audio transcripts and surface timestamped audio search results** · p1 · feature · M · M3 Audio & Recognition
  - [SN-SRCH-014](search.md#sn-srch-014) **Implement saved smart collections from search filters** · p2 · feature · M · M4 Identity, Sync & Privacy
  - [SN-SRCH-015](search.md#sn-srch-015) **Encrypt the search index at rest and exclude locked notebooks from results** · p0 · security · M · M4 Identity, Sync & Privacy
  - [SN-SRCH-016](search.md#sn-srch-016) **Add the search performance harness and CI budget gates** · p2 · test · M · M3 Audio & Recognition
  - [SN-SRCH-017](search.md#sn-srch-017) **Make search accessible and internationalised (labels, alt-text, RTL, tokenizers)** · p2 · feature · M · M3 Audio & Recognition
  - [SN-SRCH-018](search.md#sn-srch-018) **Build the derived backlink index by inverting Link objects** · p3 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-GPHN-004](search.md#sn-gphn-004) **Adapt the global Search screen for phones** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GUX-013](search.md#sn-gux-013) **Implement recent searches and the no-query search state** · p2 · feature · S · M2 Library & Documents

---

## Issues

### SN-GIPAD-004

<a id="sn-gipad-004"></a>

**Schedule background indexing, OCR and sync with BGTaskScheduler on iPadOS**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | ipad, ios-phone |
| Areas | search, sync, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-SRCH-004](search.md#sn-srch-004), [SN-HWR-006](ocr-hwr.md#sn-hwr-006), [SN-SYNC-006](sync.md#sn-sync-006) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `MASVS-STORAGE-2` |
| Extra labels | agent-ready |

#### Context
Three expensive background pipelines are specified — incremental search indexing ([SN-SRCH-004](search.md#sn-srch-004)), background handwriting recognition ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)) and cloud-drive sync ([SN-SYNC-006](sync.md#sn-sync-006)) — and all of them assume they can make progress while the user is not staring at the app. On iPadOS that only happens through **BGTaskScheduler** (`BGAppRefreshTask` / `BGProcessingTask`); iOS suspends a backgrounded app within seconds otherwise. No issue registers those tasks, declares the identifiers, or defines what happens when the system expires a task mid-batch. Without this, a student who imports a 600-page PDF and switches apps gets no OCR until they reopen the notebook, and sync appears stuck.

#### Scope
**In:** a `sane_background_tasks` capability in the iOS runner/plugin layer: `BGTaskSchedulerPermittedIdentifiers` in Info.plist, registration at launch, submission policy (`requiresNetworkConnectivity` for sync, `requiresExternalPower` for OCR/index batches), an expiration handler that checkpoints and yields within the OS budget, exponential back-off when the system declines to run tasks, and a Dart-facing scheduler API so `sane_sync`/`sane_ml` enqueue work without knowing about UIKit.
**Out:** the pipelines themselves; Android WorkManager/foreground services ([SN-AND-023](audio.md#sn-and-023)); background audio recording, which uses the audio background mode ([SN-AUD-006](audio.md#sn-aud-006)); push-driven sync ([SN-SYNC-009](sync.md#sn-sync-009)).

#### Acceptance criteria
- [ ] Both task identifiers are declared, registered before `application(_:didFinishLaunchingWithOptions:)` returns, and are debuggable via the documented `_simulateLaunchForTaskWithIdentifier` procedure recorded in docs/platform/ipad.md.
- [ ] An expiring task checkpoints within 200 ms of the expiration handler firing; on next run the pipeline resumes from the checkpoint with no duplicated or skipped items (property test over a synthetic queue).
- [ ] A killed or expired index/OCR task never leaves the FTS index or op-log in a torn state — verified by running the convergence/corruption fixtures of [SN-CORE-026](storage.md#sn-core-026) after forced expiry.
- [ ] Sync tasks are not submitted while the user has auto-sync off, is on cellular with Wi-Fi-only set ([SN-SYNC-019](sync.md#sn-sync-019)), or has not completed consent; a CI assertion proves no network call originates from a background task in those states.
- [ ] Battery: a 30-minute background session on the Tier 1 iPad stays inside the energy budget of docs/platform/performance-budgets.md; tasks respect thermal state ([SN-PERF-015](perf.md#sn-perf-015)) and abort when `ProcessInfo.thermalState` is serious or worse.
- [ ] The task only touches paths whose Data Protection class allows access while locked ([SN-GIPAD-003](security.md#sn-gipad-003)); otherwise it defers.

#### Technical notes
Implement in `app/ios/Runner` plus a thin platform channel; keep the Dart side a queue abstraction so web/Android substitute their own driver. Use `BGProcessingTask` for OCR/indexing (long, power-hungry) and `BGAppRefreshTask` for short sync polls. Never assume a task will run — the OS decides; all pipelines must remain correct with zero background executions. Log only counts and durations, never content ([SN-SEC-021](security.md#sn-sec-021)).

#### Security & privacy
Background execution is a classic silent-egress risk: enforce the consent and Wi-Fi-only gates in the task entry point, not only in the UI (MASVS-PRIVACY-1). Validate anything read back from the cloud during a background run through the normal integrity path ([SN-SYNC-013](sync.md#sn-sync-013)). Task identifiers and Info.plist keys are part of the attack surface review for [SN-SEC-030](security.md#sn-sec-030).

#### UX notes
No new UI. The sync-status chip ([SN-SYNC-020](sync.md#sn-sync-020)) and the recognition progress row ([SN-HWR-008](ocr-hwr.md#sn-hwr-008)) simply reflect that work advanced while the app was away. If iOS has starved tasks for a long period (e.g. Low Power Mode), surface an unobtrusive "finishing up when you next open" hint rather than a scary error.

#### Test plan
Unit: `packages/sane_sync/test/background_queue_test.dart`, `packages/sane_ml/test/checkpoint_resume_test.dart` (expiry/resume property tests). Integration: `integration_test/background_task_test.dart` using the simulated-launch debug hook on a real iPad. Manual: Low Power Mode, thermal-throttle and offline matrices from docs/platform/ipad.md §11.

#### Dependencies
[SN-SRCH-004](search.md#sn-srch-004), [SN-HWR-006](ocr-hwr.md#sn-hwr-006), [SN-SYNC-006](sync.md#sn-sync-006), [SN-GIPAD-003](security.md#sn-gipad-003).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-005

<a id="sn-gipad-005"></a>

**Index notes in Core Spotlight with locked-notebook and profile exclusions**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | search, privacy, notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-SRCH-015](search.md#sn-srch-015), [SN-IPAD-015](notifications.md#sn-ipad-015), [SN-AUTH-013](auth.md#sn-auth-013) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
"Find it from the Home Screen" is table stakes against Apple Notes, which is fully Spotlight-searchable. [SN-IPAD-015](notifications.md#sn-ipad-015) exposes `AppEntity`/`EntityQuery` so Shortcuts and Siri can *act* on notes, but system-wide **Core Spotlight** indexing (`CSSearchableItem`, `CSSearchableItemAttributeSet`, the `NSUserActivity` continuation path) is a different mechanism and is not covered anywhere in the backlog. It is also the single riskiest integration in this lens: the Spotlight index lives **outside** our encryption boundary, so an unqualified "index everything" would quietly undo the E2EE and locked-notebook guarantees that [SN-SRCH-015](search.md#sn-srch-015) enforces inside the app.

#### Scope
**In:** a `sane_spotlight` bridge that indexes notebook and page titles, subject/tag names and a short OCR-free snippet; a strict allow-list of indexable fields; hard exclusions for locked notebooks, notebooks in a locked profile, guest-profile content, Trash and shared-with-me content the user has not opened; deletion propagation (`deleteSearchableItems` on delete, rename, lock, profile switch and sign-out); a Settings toggle (default **off** until the user opts in, with an honest explanation); deep-linking a Spotlight hit to the exact page through the allow-list router ([SN-SEC-011](security.md#sn-sec-011)).
**Out:** in-app search ([SN-SRCH-006](search.md#sn-srch-006)); App Intents/Shortcuts ([SN-IPAD-015](notifications.md#sn-ipad-015)); indexing handwriting transcripts or audio transcripts into Spotlight (explicitly excluded — they stay in the encrypted local index); Android App Search.

#### Acceptance criteria
- [ ] With the toggle off (default), the app writes zero items to Core Spotlight; a test asserts the index is empty after creating notebooks.
- [ ] With the toggle on, a new notebook is findable from the Home Screen within 10 s, and tapping the result opens that exact page in the correct profile.
- [ ] Locking a notebook, deleting it, renaming it, emptying Trash, switching profile or signing out removes or updates its Spotlight items within one app foreground cycle; a locked notebook is never re-indexed.
- [ ] Indexed snippets contain no note body text beyond the first N characters of the *title*; the field allow-list is unit-tested and a Semgrep rule blocks new attribute writes that are not on it.
- [ ] Multi-profile isolation holds: profile B's notebooks are not visible in Spotlight while profile A is active ([SN-AUTH-013](auth.md#sn-auth-013)).
- [ ] The privacy dashboard ([SN-PRV-002](privacy.md#sn-prv-002)) lists Spotlight as a place where titles leave the encrypted store, with a one-tap purge.

#### Technical notes
Implement in `plugins/sane_spotlight` (Swift `CSSearchableIndex.default()`), driven by the same change stream that feeds [SN-SRCH-004](search.md#sn-srch-004) so indexing is incremental, not a full re-walk. Use a stable `uniqueIdentifier` of `profileId:notebookId:pageId` — hashed, not raw ids — so the index cannot be used to enumerate a user's object graph. Handle `CSSearchableIndexDelegate` reindex requests by rebuilding from the local store. Batch writes off the main isolate.

#### Security & privacy
LINDDUN: this is a deliberate, consented metadata disclosure to the OS. Apply data minimisation (titles only), purpose limitation (find-my-note), and a working purge (MASVS-PRIVACY-1/2, CWE-200). The default-off posture must be enforced in code, not only in the settings UI. Incoming Spotlight `NSUserActivity` payloads are untrusted: validate the identifier, resolve it locally, and never trust an embedded path or URL ([SN-SEC-011](security.md#sn-sec-011), [SN-SEC-013](security.md#sn-sec-013)).

#### UX notes
Settings → Privacy & export gains "Find notes in Spotlight" with the copy "Titles of unlocked notebooks are shared with iPadOS search. Locked notebooks are never included." Turning it off shows a confirmation that the existing index is being cleared. A Spotlight hit that resolves to a now-locked notebook lands on the unlock screen, not the content.

#### Test plan
Unit: `plugins/sane_spotlight/test/allow_list_test.dart`, `exclusion_rules_test.dart` (locked/guest/trash/profile matrices). Integration: `integration_test/spotlight_test.dart` — index, query via `CSSearchQuery`, lock, assert removal. Security: add a case to [SN-SEC-030](security.md#sn-sec-030) verifying no body text or transcript reaches the OS index.

#### Dependencies
[SN-SRCH-015](search.md#sn-srch-015), [SN-IPAD-015](notifications.md#sn-ipad-015), [SN-AUTH-013](auth.md#sn-auth-013).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-004

<a id="sn-gphn-004"></a>

**Adapt the global Search screen for phones**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | search, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-006](search.md#sn-srch-006), [SN-PHN-003](design-system.md#sn-phn-003), [SN-GPHN-002](editor.md#sn-gphn-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-2` |
| Extra labels | agent-ready |

#### Context
Search is a first-class phone job — reviewing and finding a note one-handed — and it is one of the five bottom-navigation destinations ([SN-PHN-003](design-system.md#sn-phn-003), docs/platform/phones.md §2). [SN-SRCH-006](search.md#sn-srch-006) builds the global search screen for all platforms (input, filter chips, virtualised result list, result cards, count line, "Ask my notes" placement), but its layout targets the wide frame. This issue is the phone parity of [SN-LIB-024](library.md#sn-lib-024) for Search: a full-screen, thumb-first compact layout for the search screen so the field, filters, Ask panel and results are all reachable with one hand on a 390 dp screen. Handwriting search runs on-device (screens-and-flows.md §11 "handwriting is searched on-device"), and that on-device fact must remain visible on the phone.

#### Scope
**In:** the compact layout branch of the search screen — the search field pinned at the top under the safe area, horizontally scrolling type-filter chips (All / Handwriting / Typed / PDFs / Audio), the "Ask my notes" button and the Ask panel laid out for one-handed reach, full-width result cards with the scribble preview and matched-term highlight, the count line, and the empty/no-results/loading states in compact form; entry from the bottom-nav Search tab; keyboard behaviour via [SN-GPHN-002](editor.md#sn-gphn-002).
**Out:** the index, ranking, query parsing and snippet internals (SN-SRCH-002..005); the scribble preview renderer ([SN-SRCH-013](search.md#sn-srch-013)); deep-link scroll/highlight ([SN-SRCH-009](search.md#sn-srch-009)); Ask-panel answer synthesis (SN-AI-001); the in-editor find bar ([SN-SRCH-008](search.md#sn-srch-008)); and index-at-rest encryption ([SN-SRCH-015](search.md#sn-srch-015)).

#### Acceptance criteria
- [ ] Opening the Search tab on a phone shows a full-screen search screen with the field pinned at the top and the keyboard raised, the field visible above it via [SN-GPHN-002](editor.md#sn-gphn-002).
- [ ] The five type-filter chips scroll horizontally when they do not fit, keep the active chip visible, and the active chip inverts to ink-on-surface exactly as on tablet.
- [ ] Result cards are full-width, show the type icon, notebook title, "Page N · <type>", the handwriting scribble preview where applicable and the matched term highlighted; tapping a card opens the notebook at that page.
- [ ] The "Ask my notes" button and the Ask panel are reachable one-handed; on Free the panel carries the PRO PREVIEW label (screens §11) unchanged.
- [ ] The count line reads "N results · handwriting is searched on-device" and the on-device indicator is visible without scrolling.
- [ ] No-results and empty states use the copy from ux-principles.md §4.1 and offer the reset-filter-to-All action.
- [ ] The result list is virtualised and scrolls at 60 fps on the Android-lowend device with 500+ results.
- [ ] Works at 320 dp width and 200% Dynamic Type with no two-dimensional scroll; every control is >= 44x44 pt / 48x48 dp with `Semantics`.
- [ ] Renders correctly in all 17 looks and dark mode.

#### Technical notes
Add a compact branch to the search screen in `app/lib/search/` driven by the size class from [SN-PHN-002](compat.md#sn-phn-002); reuse the debounced query controller, result-card widget and virtualised list from [SN-SRCH-006](search.md#sn-srch-006) — this is a layout reflow, not a new screen. Chips use the shared `SaneChip`/segmented components so all looks apply (docs/design/component-inventory.md). Keyboard handling comes from [SN-GPHN-002](editor.md#sn-gphn-002), not a local observer. Result taps route through the same go_router paths as the wide screen so behaviour matches the shell exactly (ADR-0003). Do not branch on platform identity (CLAUDE.md §8).

#### Security & privacy
None beyond baseline, with two named controls. **T-SEARCH-LOG** — query strings and result titles are note-derived; none may be logged in profile/release (CLAUDE.md §7.3; MASVS-PRIVACY-1, CWE-532). **T-LOCKED-RESULTS** — locked notebooks must not appear in phone results; this relies on the index exclusion from [SN-SRCH-015](search.md#sn-srch-015), and this screen must not re-introduce them by rendering a raw list — a test asserts a locked notebook is absent (MASVS-STORAGE-2, CWE-200). Search stays on-device by default; any cloud "Ask" path is owned by SN-AI-001 with its own opt-in and leave-device indicator. No new permission or egress from this screen.

#### UX notes
Source: docs/design/screens-and-flows.md §11. The phone layout keeps the calm, page-first voice (ux-principles.md §2, §5): plain labels, the on-device privacy fact stated plainly ("handwriting is searched on-device"), no exclamation marks. Loading prefers content then skeleton, never a full-screen spinner (§4.2). The Ask panel is a card, not a modal, so the user can scroll from answer to sources one-handed. Motion: result list has no entrance animation beyond the standard list build; Reduce Motion respected. a11y: the field is labelled, chips announce selected state (not colour-only), and results are a semantic list with each card a single focusable element.

#### Test plan
- `app/test/search/search_screen_compact_test.dart` — field pinned, chips scroll, active-chip state, count line, empty/no-results states.
- `app/test/search/search_locked_exclusion_test.dart` — a locked notebook never renders in results (negative test).
- `app/test/golden/phone/search_screen_golden_test.dart` — goldens per look family, light and dark, at 390x844.
- `app/integration_test/phone_search_test.dart` — patrol run: open Search tab, type, filter, open a result at the right page.

#### Dependencies
[SN-SRCH-006](search.md#sn-srch-006), [SN-PHN-003](design-system.md#sn-phn-003), [SN-GPHN-002](editor.md#sn-gphn-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GUX-013

<a id="sn-gux-013"></a>

**Implement recent searches and the no-query search state**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | search, privacy, design-system |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-006](search.md#sn-srch-006), [SN-SRCH-015](search.md#sn-srch-015) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

`docs/design/ux-principles.md` §4.1 specifies the Search screen's empty state as "Show recent searches + 'Search handwriting, typed text, PDFs and audio.'" — the only empty state in the whole matrix that requires a feature rather than a sentence. [SN-SRCH-006](search.md#sn-srch-006) builds the screen and covers "loading/empty/error states" for the results area, and [SN-ONB-010](onboarding.md#sn-onb-010) covers the no-query copy, but no issue in the backlog implements a recent-query history: a search of every issue body for "recent search" returns a single empty-state mention. Without it, Search opens to an empty field above a blank area — a dead surface on the screen the design reaches by ⌘K from everywhere, and the one place a student returns to repeatedly during revision.

#### Scope

**In:** a per-profile, on-device recent-query store (most-recent-first, deduplicated case-insensitively, capped at 10 entries and a sane per-entry length); the no-query panel rendering the recents as rows or chips with a per-item remove and a "Clear" action, above the placeholder line; restoring the filter that was active when the query was run; keyboard and assistive-technology support (focus order, a labelled list, announcement on clear); a Settings → Privacy toggle "Remember recent searches" (default on, off in guest mode); and the privacy rules: query text only (never results or snippets), stored with the encrypted index, never synced, never logged or sent in telemetry, cleared on sign-out and profile deletion, and suppressed while the app or profile lock is engaged.

**Out:** the search screen scaffold and result list ([SN-SRCH-006](search.md#sn-srch-006)), saved smart collections ([SN-SRCH-014](search.md#sn-srch-014) — a different, deliberate artefact), the index and ranking ([SN-SRCH-002](search.md#sn-srch-002)–[SN-SRCH-004](search.md#sn-srch-004)), the launcher and shortcut ([SN-SRCH-007](search.md#sn-srch-007)).

#### Acceptance criteria

- [ ] Opening Search with no query shows up to 10 recents plus the placeholder line; with no history it shows the placeholder line alone and no empty container.
- [ ] Tapping a recent re-runs it with its saved type filter; the list re-orders to most-recent-first without duplicating.
- [ ] Remove and Clear take effect immediately and survive a restart; Clear announces "Recent searches cleared".
- [ ] History is stored inside the encrypted search-index store ([SN-SRCH-015](search.md#sn-srch-015)) — a test asserts no plaintext query string appears in any on-disk file or in `SharedPreferences`.
- [ ] Nothing is retained in guest mode beyond the session, and profile A never sees profile B's recents.
- [ ] With the Settings toggle off, no new entries are recorded and existing ones are purged.
- [ ] Queries never appear in logs, crash records or the diagnostics bundle ([SN-TEL-008](telemetry.md#sn-tel-008)); a redaction test covers it.
- [ ] Renders in all 17 looks × light/dark; chips use `SaneChip`, rows use the standard list row; RTL mirrored.

#### Technical notes

Store in the existing per-profile encrypted database rather than a new file, so key management and profile isolation come for free ([SN-CORE-004](storage.md#sn-core-004), [SN-SRCH-015](search.md#sn-srch-015)). Cap entry length before persisting to avoid storing a pasted document as a "query". Reuse `SaneChip`/`SaneEmptyState` from `sane_ui`; the panel is a state of the existing screen, not a new route.

#### Security & privacy

Search queries are among the most sensitive derived data in a note app — they reveal what a person is studying, worried about, or hiding. Controls: encryption at rest with the index (MASVS-STORAGE-1), no network egress ever (MASVS-NETWORK-1, LINDDUN detectability/disclosure), exclusion from OS auto-backup ([SN-SEC-023](security.md#sn-sec-023)), suppression behind app lock ([SN-SEC-020](security.md#sn-sec-020)), no telemetry (CWE-532; [SN-TEL-003](telemetry.md#sn-tel-003) deny-by-default serialiser), deletion on account/profile deletion as part of [SN-PRV-006](privacy.md#sn-prv-006)'s guarantees, and a user-visible off switch ([SN-PRV-002](privacy.md#sn-prv-002) "What leaves this device" lists it as staying).

#### UX notes

References: `ux-principles.md` §4.1, `screens-and-flows.md` §11, `component-inventory.md` §8. Keep it quiet: recents are a convenience, not a feed — no "trending", no server suggestions, no autocomplete from other users. The removal affordance must be reachable without a drag, per the non-drag alternative rule ([SN-A11Y-009](a11y.md#sn-a11y-009)).

#### Test plan

`app/test/features/search/recent_searches_test.dart` (cap, dedupe, order, filter restore, remove/clear, toggle off purges), `app/test/features/search/recent_searches_privacy_test.dart` (no plaintext on disk, no logs, guest and locked behaviour, per-profile isolation). Golden: the no-query panel with and without history across a representative look per family.

#### Dependencies

[SN-SRCH-006](search.md#sn-srch-006), [SN-SRCH-015](search.md#sn-srch-015)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-SRCH-001

<a id="sn-srch-001"></a>

**Build unified on-device search over handwriting, text, PDF and audio**

| Field | Value |
|---|---|
| GitHub | #29 |
| Type | epic |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | search, storage, privacy |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-004](storage.md#sn-core-004), [SN-LIB-001](library.md#sn-lib-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `OWASP-A03`, `CWE-89`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Search is a core Sane Notes promise: **your handwriting is searched on-device, and search is never paywalled** — deliberately turning Notability's most-resented gate (paid handwriting search) into a wedge (`docs/product/prd-02-library-documents-audio-search.md` §10; positioning table §1.3). This epic delivers the whole search stack: the `sane_search` package (SQLite FTS5 index + query model), the incremental background-isolate indexing pipeline that keeps the index fresh, the content extractors for every source (typed text, titles, tags/subjects, outline entries, recognised handwriting, PDF text layers, OCR'd imports, audio transcripts), ranking/snippets, the global Search screen (`docs/design/screens-and-flows.md` §11), the sidebar launcher + `Cmd/Ctrl-K`, in-note find (`Cmd/Ctrl-F`), deep-linking a result to the exact page and on-page quad/stroke, saved smart collections, the derived backlink index, at-rest encryption of the index, and the performance/a11y/i18n guarantees.

The index is **note content**: it lives only on device, is encrypted at rest with the rest of the store, and never leaves the device to be built (`docs/adr/0016-on-device-ml-and-ai.md` §"Privacy posture"; CLAUDE.md §7). This work spans M2 (basic FTS over typed/title/tag/outline + the screen + in-note find, per `docs/roadmap.md` M2) and M3 (handwriting/PDF/transcript indexing + deep-linking, per roadmap M3), with smart collections and index encryption in M4 and the backlink index in M6. It implements PRD-LB-038, PRD-LB-260 through PRD-LB-266, PRD-LB-300/305 (index feed), PRD-LB-380, and PRD-LOCK-006 (locked-content exclusion).

#### Scope

**In:** the `sane_search` package (FTS5 store, query model, ranking), indexing pipeline + incremental updates, all content extractors, the global search screen + launcher + shortcuts, in-note find, deep-link/highlight, smart collections, backlink index, index-at-rest encryption + locked-notebook exclusion, search performance harness, and search a11y/i18n.

**Out (referenced, not built here):** the recognition/OCR/transcription engines themselves (SN-HWR-001 — `sane_search` only *consumes* their output), the PDF render/text engine (SN-PDF-002), the audio recorder (SN-AUD-002), and semantic "Ask my notes" RAG (embeddings + on-device LLM), which is owned by SN-AI-001; the Search screen only hosts the Ask entry point rendered by that area.

#### Acceptance criteria
- [ ] A query typed into the Search screen returns ranked results across handwriting, typed text, PDF text and audio transcripts, with `<mark>`-highlighted snippets and a "N results · handwriting is searched on-device" count.
- [ ] First on-device FTS results render in < 300 ms over a typical library (PRD-LB §15 target); indexing runs on a background isolate and never blocks a frame while writing.
- [ ] Tapping a result opens the notebook at the matched page and scrolls to / highlights the exact quad or stroke (PRD-LB-261, resolves screens Open Question 14).
- [ ] The index and all snippets stay on device, are encrypted at rest, and locked notebooks are excluded from results (PRD-LOCK-006).
- [ ] Every child issue below is closed and its acceptance criteria met.

#### Technical notes
Package `packages/sane_search` (pure Dart, no `package:flutter`; DAG: depends on `sane_core` only — `docs/architecture/overview.md` §5). SQLite via `drift` FTS5 virtual tables next to the notes DB (SN-CORE-004). `SearchIndexRow{docId,pageIndex,source,text,quads?,lang}` per `docs/architecture/document-model.md` §2. Cross-feature coordination (kicking off indexing after a save, opening a result) lives in `app/` via Riverpod providers, never as a package-to-package import. See ADR-0016 for the recognition/embedding stack and `docs/roadmap.md` for milestone placement.

Children:
- [ ] [SN-SRCH-002](search.md#sn-srch-002) FTS5 index schema, `SearchIndexRow` model & query model
- [ ] [SN-SRCH-003](search.md#sn-srch-003) Query parsing, BM25 ranking, snippet extraction & highlighting
- [ ] [SN-SRCH-004](search.md#sn-srch-004) Incremental indexing pipeline on a background isolate
- [ ] [SN-SRCH-005](search.md#sn-srch-005) Index typed text, titles, tags, subjects & outline entries
- [ ] [SN-SRCH-006](search.md#sn-srch-006) Global search screen (input, filters, result cards, snippets)
- [ ] [SN-SRCH-007](search.md#sn-srch-007) Search launcher & keyboard shortcut (sidebar, Cmd/Ctrl-K)
- [ ] [SN-SRCH-008](search.md#sn-srch-008) In-note find & highlight (Cmd/Ctrl-F)
- [ ] [SN-SRCH-009](search.md#sn-srch-009) Deep-link results to page + quad/stroke highlight
- [ ] [SN-SRCH-010](search.md#sn-srch-010) Handwriting recognition index integration
- [ ] [SN-SRCH-011](search.md#sn-srch-011) PDF text-layer & OCR-import indexing
- [ ] [SN-SRCH-012](search.md#sn-srch-012) Audio transcript indexing & timestamped audio results
- [ ] [SN-SRCH-013](search.md#sn-srch-013) Handwriting scribble result preview (golden across looks)
- [ ] [SN-SRCH-014](search.md#sn-srch-014) Saved smart collections
- [ ] [SN-SRCH-015](search.md#sn-srch-015) Encrypt the search index at rest & exclude locked notebooks
- [ ] [SN-SRCH-016](search.md#sn-srch-016) Search performance harness & CI budgets
- [ ] [SN-SRCH-017](search.md#sn-srch-017) Accessibility & internationalisation for search
- [ ] [SN-SRCH-018](search.md#sn-srch-018) Derived backlink index (invert Link objects)

#### Security & privacy
The whole index is note content: keep it on device, encrypt it at rest, never log query text/snippets/coordinates, and never emit a network call to build or serve a result (MASVS-STORAGE-1, MASVS-PRIVACY-1, MASVS-NETWORK-1, CWE-532). All FTS queries are parameterised `MATCH` — untrusted query text is never string-concatenated into SQL (OWASP-A03, CWE-89). Locked notebooks are access-controlled out of results (PRD-LOCK-006, OWASP-A01). Threats + controls tracked in `docs/security/threat-model.md` and the controls matrix.

#### UX notes
Implements the design **Search** screen (`design/Sane Notes.dc.html`, `docs/design/screens-and-flows.md` §11): field placeholder "Search handwriting, typed text, PDFs and audio", type filters All/Handwriting/Typed/PDFs/Audio, result cards with type icon + "Page N · type" + snippet + timestamp, the "N results · handwriting is searched on-device" line, and the "No matches…" empty state. All chrome must render in all 17 looks + dark mode and meet WCAG 2.2 AA (Semantics labels, 44pt/48dp targets, contrast, web keyboard reachability) via `sane_ui` tokens.

#### Test plan
Aggregate of children: unit tests in `packages/sane_search/test/`, widget/golden tests for the screen in `app/test/search/`, integration flow in `app/integration_test/search_flow_test.dart`, and a perf test asserting the < 300 ms budget. Each child names its own files.

#### Dependencies
SN-CORE-002 (document model), SN-CORE-004 (drift/SQLite + blob store), SN-LIB-001 (library entities/tags/subjects), SN-DS-003 (component library). Downstream area consumers: SN-HWR-001, SN-PDF-002, SN-AUD-002, SN-AI-001, SN-CRY-002.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-002

<a id="sn-srch-002"></a>

**Implement FTS5 index schema, SearchIndexRow model and query model**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | search, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-CORE-004](storage.md#sn-core-004), [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `OWASP-A03`, `CWE-89`, `CWE-312` |
| Extra labels | agent-ready |

#### Context

This is the foundation of the whole search area (the well-known "FTS index" unit): the local **full-text index** and the typed query model that every other search issue builds on. Per `docs/product/prd-02-library-documents-audio-search.md` PRD-LB-260, Sane Notes builds a **SQLite FTS5** index over typed text, recognised handwriting, PDF text layers, audio transcripts, titles, tags/subjects and outline entries. Per PRD-LB-261 each index row must retain enough locality to deep-link (docId, pageIndex, source, and — for PDF/handwriting — on-page quads/stroke ids). The index lives next to the notes database and is note content, so it stays on device and encrypted at rest (`docs/adr/0016-on-device-ml-and-ai.md`; CLAUDE.md §7).

This issue delivers the schema + model + query API only; the pipeline that fills it ([SN-SRCH-004](search.md#sn-srch-004)), the extractors ([SN-SRCH-005](search.md#sn-srch-005)) and ranking ([SN-SRCH-003](search.md#sn-srch-003)) are separate. It defines the `SearchIndexRow` entity from `docs/architecture/document-model.md` §2 and the `sane_search` public query interface returning `Result<SearchResults, Failure>` (sealed types in `sane_core`; CLAUDE.md §6).

#### Scope
**In:** the drift FTS5 virtual table + a shadow content table, the `SearchIndexRow{docId,pageIndex,source,text,quads?,lang}` model, insert/update/delete-by-doc primitives, a parameterised `query(String, {Set<Source> filters, profileId})` API returning `Result`, a `porter`/`unicode61` tokenizer configuration with per-row `lang`, and headless unit tests.

**Out:** ranking/snippets ([SN-SRCH-003](search.md#sn-srch-003)), the indexing pipeline ([SN-SRCH-004](search.md#sn-srch-004)), content extraction ([SN-SRCH-005](search.md#sn-srch-005)), and any UI.

#### Acceptance criteria
- [ ] A `search_index` FTS5 table exists (drift migration) with columns for `text`, and a companion `search_meta` table holding `docId`, `pageIndex`, `source`, `quads` (nullable), `lang`, joined by rowid.
- [ ] `source` is a closed enum: handwriting | typed | pdf | transcript | title | tag | outline (matches PRD-LB-260 sources).
- [ ] `upsertRows`, `deleteByDoc(docId)` and `deleteByPage(docId,pageIndex)` are idempotent and transactional; re-indexing a page replaces exactly that page's rows for a given source.
- [ ] `query()` uses a **parameterised** FTS5 `MATCH` (no string concatenation of user text); a query containing FTS operators/quotes/`*` cannot break out or error the statement (fuzz cases pass).
- [ ] `query()` accepts a `filters` set (the All/Handwriting/Typed/PDFs/Audio filter) and a `profileId`, and never returns rows from another profile.
- [ ] Tokenizer handles diacritics (unicode61 `remove_diacritics 2`) and is documented as extensible for CJK/Indic ([SN-SRCH-017](search.md#sn-srch-017)).
- [ ] `packages/sane_search` imports no `package:flutter` (arch-lint green) and returns `Result<T,Failure>`, never throws across the boundary.

#### Technical notes
Package `packages/sane_search` (pure Dart). Use the existing `drift` database from SN-CORE-004; add an FTS5 module (`CREATE VIRTUAL TABLE … USING fts5`). Model + repository interface in `sane_core` style (immutable value objects). Query text is bound via `Variable`/`?` placeholders. Map FTS5 `MATCH` syntax carefully: sanitise user tokens into quoted phrase tokens to avoid accidental operator injection while preserving prefix search (`term*`). Reference `docs/architecture/document-model.md` §2 (op-log/model) and ADR-0016 for how recognised text/transcripts/embeddings are all note content stored locally.

#### Security & privacy
The index is note content: stored only in the local SQLite DB, encrypted at rest with the rest of the store ([SN-SRCH-015](search.md#sn-srch-015)), never logged (MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-312, CWE-532). Untrusted query text is bound as a parameter and token-sanitised, never concatenated into SQL (OWASP-A03, CWE-89). Per-profile scoping prevents cross-profile leakage (OWASP-A01). No network egress.

#### UX notes
None beyond baseline — this is a pure-Dart package with no UI. Baseline: no query text, snippet, or ink coordinate is ever logged; object ids appear in any debug output only as opaque short hashes (CLAUDE.md §7.3). The query API shape must support the Search screen contract in `docs/design/screens-and-flows.md` §11 (filters, result locality).

#### Test plan
Unit: `packages/sane_search/test/fts_index_test.dart` (upsert/delete/replace idempotency, per-profile isolation), `packages/sane_search/test/query_model_test.dart` (parameterisation, filter sets), `packages/sane_search/test/fts_injection_fuzz_test.dart` (hostile query tokens fail closed, never SQL-error). No widget/golden tests (no UI).

#### Dependencies
SN-CORE-004 (drift/SQLite + blob store), SN-FND-002 (monorepo scaffold). Blocks the rest of the search area.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-003

<a id="sn-srch-003"></a>

**Implement query parsing, BM25 ranking, snippet extraction and highlighting**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | search |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002) |
| Security controls | `MASVS-PRIVACY-3`, `OWASP-A03`, `CWE-89`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

A search that returns unranked rows is unusable — the design (`docs/design/screens-and-flows.md` §11) shows ordered result cards each with a snippet where the matched term is `<mark>`-highlighted, and a most-relevant-first order. This issue adds relevance ranking and snippet generation on top of the FTS5 store from [SN-SRCH-002](search.md#sn-srch-002), so PRD-LB-262's result cards can render a meaningful preview and order. FTS5 ships BM25 ranking (`bm25()`), and column/phrase-level `snippet()`/`highlight()` helpers we can lean on rather than reimplementing.

Ranking must weight sources sensibly (a title hit outranks a mid-body hit; a handwriting hit is first-class, not demoted) and must be deterministic for golden/regression testing. This is pure-Dart logic in `sane_search` and testable headlessly.

#### Scope
**In:** a query parser (tokenise, quote, prefix `term*`, drop stopwords optionally), BM25 scoring with per-source column weights, `snippet()`-based context extraction with match offsets, a highlight model (match ranges, not HTML) the UI turns into `<mark>`, and a stable secondary sort (recency `updatedAt`) for ties.

**Out:** the FTS table itself ([SN-SRCH-002](search.md#sn-srch-002)), any UI rendering ([SN-SRCH-006](search.md#sn-srch-006)), and semantic/embedding ranking (SN-AI-001).

#### Acceptance criteria
- [ ] Results are ordered by BM25 relevance with documented per-source weights (title/tag > outline > body/handwriting/pdf/transcript baseline), tie-broken by `updatedAt` desc — deterministic across runs.
- [ ] Each result carries a snippet of ≤ ~120 chars centred on the best match, with explicit match offset ranges the UI maps to `<mark>` (no raw HTML crosses the package boundary).
- [ ] Multi-term queries AND terms by default; a quoted "phrase" matches the exact phrase; a trailing `term*` does prefix search.
- [ ] A query that matches nothing returns an empty ranked list (not an error), so the UI can show the "No matches…" empty state.
- [ ] Ranking + snippet extraction for a 10k-row index returns in well under the 300 ms first-results budget (measured in the perf test).
- [ ] Public API returns `Result<List<SearchResult>, Failure>`; no throw across boundary; no `dynamic` in the signature.

#### Technical notes
Extend `packages/sane_search`. Use FTS5 `bm25(search_index, w1, w2, …)` per-column weights and `snippet(search_index, col, '[', ']', '…', N)` (translate the delimiters to structured offsets rather than shipping bracket strings). Parser lives in `lib/src/query_parser.dart`; `SearchResult{row, score, snippet, matchRanges}` value object. Keep the parser conservative — it feeds the same parameterised `MATCH` from [SN-SRCH-002](search.md#sn-srch-002); never build SQL by concatenation. Reference PRD-LB-262 for the result-card fields.

#### Security & privacy
Snippets are note content — return them to the caller but never log them (MASVS-PRIVACY-3, CWE-532). The parser output is still bound as an FTS5 parameter, preserving the OWASP-A03/CWE-89 protection from [SN-SRCH-002](search.md#sn-srch-002). No network. No new stored asset.

#### UX notes
None beyond baseline (pure-Dart logic). It must satisfy the Search screen's ordering + snippet + `<mark>` expectations in `docs/design/screens-and-flows.md` §11 and the "N results" count. Baseline: no query/snippet logging.

#### Test plan
Unit: `packages/sane_search/test/ranking_test.dart` (weight order, tie-break determinism, phrase/prefix), `packages/sane_search/test/snippet_test.dart` (offset correctness, truncation, multi-match). Golden of the *ordering* via a fixed corpus fixture. Perf assertion folded into [SN-SRCH-016](search.md#sn-srch-016).

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (FTS store + query model).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-004

<a id="sn-srch-004"></a>

**Build the incremental search indexing pipeline on a background isolate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | search, perf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-PLATFORM-2`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Indexing must be **incremental, per-page on change, cached, and run on a background isolate** so it never blocks a frame while the student writes (PRD-LB-260; CLAUDE.md §8 "UI isolate does input + paint only"; `docs/roadmap.md` M1/M2 perf gates). This issue builds the orchestration layer between the document model's op-log and the FTS store: it observes changes, marks pages dirty, debounces, dispatches extraction ([SN-SRCH-005](search.md#sn-srch-005) and the M3 extractors) on the search isolate, and upserts rows ([SN-SRCH-002](search.md#sn-srch-002)). It is the engine that keeps search fresh without the user ever seeing a spinner or a dropped frame.

Because recognised handwriting, OCR and transcripts arrive asynchronously and after the ink/import that triggered them, the pipeline must be re-entrant: a page can be re-indexed several times as new source text becomes available, always replacing exactly that page+source's rows.

#### Scope
**In:** a dirty-page tracker fed by op-log commits (from SN-CORE-002), a debounce/coalesce scheduler, an `Isolate`-hosted worker (or `Isolate.run` per batch) that runs extraction + `upsertRows`, backpressure/cancellation, a durable "pending re-index" queue that survives restart, and progress/So-far counters for [SN-SRCH-016](search.md#sn-srch-016).

**Out:** the individual extractors (typed/title/tag → [SN-SRCH-005](search.md#sn-srch-005); handwriting → [SN-SRCH-010](search.md#sn-srch-010); PDF/OCR → [SN-SRCH-011](search.md#sn-srch-011); transcript → [SN-SRCH-012](search.md#sn-srch-012)), the FTS store ([SN-SRCH-002](search.md#sn-srch-002)), and UI.

#### Acceptance criteria
- [ ] Editing a page marks only that page dirty; after a debounce window (≈500 ms idle) its rows are re-extracted and upserted; unrelated pages are untouched.
- [ ] All extraction + FTS writes happen off the UI isolate; a soak of continuous writing shows no frame > 16.7 ms attributable to indexing (profile trace attached).
- [ ] The pending-reindex queue is persisted; killing the app mid-index resumes cleanly on next launch with no duplicate or lost rows.
- [ ] A late-arriving source (recognition finishing after a save) re-indexes just that page+source and merges into results without a full rebuild.
- [ ] Indexing is cancellable per notebook (e.g. on delete) and bounded (an LRU/queue cap prevents unbounded memory when importing a huge PDF).
- [ ] Deleting/trashing a notebook or page removes its index rows (via [SN-SRCH-002](search.md#sn-srch-002) delete primitives).

#### Technical notes
Lives in `packages/sane_search/lib/src/indexer/`. Subscribe to op-log commit events exposed by `sane_core` (SN-CORE-002); the coordination that wires model changes → pipeline is set up in `app/` via a Riverpod provider (no package-to-package import; `docs/architecture/overview.md` §5). Use the storage/search isolate model from CLAUDE.md §8. Extractors are registered by `source`; the pipeline just schedules and persists. Reference `docs/architecture/document-model.md` §2 for op-log semantics and ADR-0016 §"background recognition" for the async recognition feed.

#### Security & privacy
All indexed text is note content; it is produced and written entirely on device, never logged (MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-532). The isolate boundary is a trust boundary only for resource isolation — no plaintext leaves the process (MASVS-PLATFORM-2). Resource caps on batch size guard against a decompression/large-import bomb exhausting memory (CLAUDE.md §7.8).

#### UX notes
No direct UI, but it powers the "indexing…" progress affordance the long-running-op rule requires (PRD-LB-361: every long op shows progress, is cancellable, fails into a retryable state). Baseline: nothing from the indexing path is logged in profile/release.

#### Test plan
Unit: `packages/sane_search/test/indexer/dirty_tracker_test.dart`, `.../debounce_scheduler_test.dart`, `.../resume_queue_test.dart` (crash-resume, no dup/loss). Integration: `app/integration_test/index_incremental_test.dart` (edit → search reflects change within the debounce). Perf soak folded into [SN-SRCH-016](search.md#sn-srch-016).

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (FTS store), SN-CORE-002 (op-log/model change events).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-005

<a id="sn-srch-005"></a>

**Index typed text, titles, tags, subjects and outline entries**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | search, text |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002), [SN-SRCH-004](search.md#sn-srch-004), [SN-TXT-001](text.md#sn-txt-001), [SN-LIB-001](library.md#sn-lib-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The M2 "basic search" deliverable is FTS over typed text, titles, tags/subjects and outline entries (`docs/roadmap.md` M2; PRD-LB-260). This issue provides the concrete **content extractors** for those non-recognition sources — the ones available before handwriting/PDF/transcript indexing lands in M3 — so search is useful from the moment the library and text tool exist. Library search must search **content, not just titles**, on every platform (PRD-LB-263, explicitly beating Goodnotes where non-Apple search is title-only).

Each extractor reads document-model objects (typed TextBlocks from SN-TXT-001, notebook titles/tags/subjects from SN-LIB-001, outline entries) and emits `SearchIndexRow`s with the right `source` and locality (docId/pageIndex) for the pipeline ([SN-SRCH-004](search.md#sn-srch-004)) to persist.

#### Scope
**In:** extractors for `typed` (rich-text TextBlocks, flattened to plain text with page locality), `title`, `tag`, `subject`, and `outline` sources; correct handling of edits/renames (a tag rename re-indexes references; a title edit updates the title row); language tagging per notebook default.

**Out:** handwriting ([SN-SRCH-010](search.md#sn-srch-010)), PDF/OCR ([SN-SRCH-011](search.md#sn-srch-011)), transcripts ([SN-SRCH-012](search.md#sn-srch-012)), ranking ([SN-SRCH-003](search.md#sn-srch-003)), UI.

#### Acceptance criteria
- [ ] Typing text into a note makes it findable within the debounce window; the result deep-links to the correct page.
- [ ] Notebook title, each tag label, subject name, and each outline heading are individually indexed with their own `source` so filters and ranking can treat them distinctly.
- [ ] Renaming a tag globally (PRD-LB-036) re-indexes all notebooks referencing it; renaming a notebook updates its title row without dropping other rows.
- [ ] Rich-text formatting (bold/italic/lists/tables) is flattened to searchable plain text without losing words across inline mark boundaries.
- [ ] Each row carries `lang` = the notebook's recognition/text language (default device locale) for tokenizer selection.
- [ ] Deleting a page/notebook removes its typed/title/tag rows.

#### Technical notes
`packages/sane_search/lib/src/extractors/text_extractor.dart` etc., registered with the pipeline ([SN-SRCH-004](search.md#sn-srch-004)). Read TextBlock CRDT content via `sane_core` model APIs (Peritext plain-text projection; `docs/architecture/document-model.md` §"Rich text"). Tags/subjects/titles come from the Library metadata model (SN-LIB-001, `docs/product/prd-02-library-documents-audio-search.md` §2). Keep extractors pure functions `object → List<SearchIndexRow>` for easy testing.

#### Security & privacy
All extracted text is note content, produced and stored on device, never logged (MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-532). No network. Per-profile scoping is inherited from [SN-SRCH-002](search.md#sn-srch-002).

#### UX notes
None beyond baseline — no UI. Powers the Search screen result sources (typed/title/tag) in `docs/design/screens-and-flows.md` §11. Baseline: no content logging.

#### Test plan
Unit: `packages/sane_search/test/extractors/text_extractor_test.dart` (rich-text flattening, boundary words), `.../title_tag_subject_extractor_test.dart` (rename re-index, delete cleanup, per-source rows). Integration: `app/integration_test/basic_search_test.dart` (type → find → open page).

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (store), [SN-SRCH-004](search.md#sn-srch-004) (pipeline), SN-TXT-001 (typed text), SN-LIB-001 (titles/tags/subjects/outline).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-006

<a id="sn-srch-006"></a>

**Build the global search screen with filters, result cards and snippets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | search, design-system |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002), [SN-SRCH-003](search.md#sn-srch-003), [SN-DS-003](design-system.md#sn-ds-003), [SN-LIB-002](library.md#sn-lib-002) |
| Security controls | `MASVS-PRIVACY-3`, `OWASP-A03`, `CWE-89`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

The global Search screen is where the product's search promise becomes visible (`docs/design/screens-and-flows.md` §11; design **Search** screen). It implements PRD-LB-262: a big input ("Search handwriting, typed text, PDFs and audio"), a clear (×), type filters **All / Handwriting / Typed / PDFs / Audio**, a result-count line "N results · handwriting is searched on-device", result cards (type icon, notebook title, "Page N · type", snippet with matched term `<mark>`-highlighted, timestamp), and the empty state "No matches for '<query>' — try a shorter word, or switch the filter to All." Tapping a result opens the notebook at the matched page ([SN-SRCH-009](search.md#sn-srch-009)).

This is a `StatelessWidget` + Riverpod screen that binds the `sane_search` query API ([SN-SRCH-002](search.md#sn-srch-002)/[SN-SRCH-003](search.md#sn-srch-003)) to the design, debounced as the user types, and hosts (but does not implement) the "Ask my notes" entry point owned by SN-AI-001.

#### Scope
**In:** the search screen route (go_router), the debounced query controller (Riverpod), the input + clear + filter chips, result list (virtualised), result-card widget (icon/title/page-type/snippet/timestamp), the count line, loading/empty/error states, and the "Ask my notes" button placement that delegates to SN-AI-001.

**Out:** handwriting scribble preview rendering ([SN-SRCH-013](search.md#sn-srch-013)), deep-link scroll/highlight ([SN-SRCH-009](search.md#sn-srch-009)), the launcher/shortcut ([SN-SRCH-007](search.md#sn-srch-007)), Ask panel answer synthesis (SN-AI-001), and the index/ranking internals.

#### Acceptance criteria
- [ ] Typing debounces (≈200 ms) and shows ranked results; the count line reads "N results · handwriting is searched on-device"; the × clears the field and results.
- [ ] Filter chips (All/Handwriting/Typed/PDFs/Audio) re-run the query with the matching `Source` filter set and visually invert when active (tokens from `sane_ui`).
- [ ] Result cards render type icon, notebook title, "Page N · <type>", a `<mark>`-highlighted snippet, and a relative timestamp; tapping routes to the notebook/page (wires to [SN-SRCH-009](search.md#sn-srch-009)).
- [ ] Empty, loading (skeleton), and error/retry states render exactly per PRD-LB-361 and the design copy; offline works (search is on-device).
- [ ] Renders correctly in all 17 looks + light/dark (golden-tested) and meets WCAG 2.2 AA: input has a Semantics label, chips are 44pt/48dp toggle buttons with state, list is keyboard-navigable on web, contrast ≥ 4.5:1.
- [ ] The 500-result list scrolls at 60 fps with no frame > 16.7 ms (virtualised).

#### Technical notes
Screen in `app/lib/search/` using `sane_ui` components (SN-DS-003) and tokens; no hardcoded colours/spacing (CLAUDE.md §9). Query via a Riverpod `AsyncNotifier` calling `sane_search`. Reuse the library nav/shell from SN-LIB-002. Virtualise with `ListView.builder`/slivers. The Ask button is a slot that calls into the SN-AI-001 provider; if that area is not yet present, the slot is hidden behind a capability check (leave a `// DESIGN-OPEN` comment per CLAUDE.md §9). Map the ranking `matchRanges` from [SN-SRCH-003](search.md#sn-srch-003) to `<mark>` styling.

#### Security & privacy
Query text and snippets are note content — bound as parameters to the on-device index and never logged or sent anywhere (MASVS-PRIVACY-3, OWASP-A03, CWE-89, CWE-532). No analytics on keystrokes. The screen shows only the active profile's results (scoping inherited from [SN-SRCH-002](search.md#sn-srch-002)). No new network call.

#### UX notes
Follow `docs/design/screens-and-flows.md` §11 region order: field → filter chips + Ask → optional Ask panel → count → result list. Placeholder, count and empty-state copy verbatim from the design. Type icons per source (ink/PDF/audio/typed). Adaptive: full-width field and single-column results at phone width (~400px); the sidebar collapses < 900px. All 17 looks + dark via tokens.

#### Test plan
Widget: `app/test/search/search_screen_test.dart` (debounce, filter toggles, empty/loading/error, card fields, tap routing stub). Golden: `app/test/search/goldens/search_screen_<look>_<mode>.png` across all 17 looks + dark. Integration: `app/integration_test/search_flow_test.dart` (type → results → open).

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (query), [SN-SRCH-003](search.md#sn-srch-003) (ranking/snippets), SN-DS-003 (components), SN-LIB-002 (library shell/nav).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-007

<a id="sn-srch-007"></a>

**Add the search launcher and keyboard shortcut (sidebar, Cmd/Ctrl-K)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | search, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SRCH-006](search.md#sn-srch-006) |
| Depends on | [SN-SRCH-006](search.md#sn-srch-006) |
| Security controls | `CWE-532` |
| Extra labels | agent-ready, good first issue |

#### Context

Search must be reachable from the **sidebar launcher** and a keyboard shortcut **Cmd/Ctrl-K** (PRD-LB-263; `docs/design/screens-and-flows.md` §2 "Search launcher → opens Search screen", and the sidebar button "Search notes, PDFs, audio…" + ⌘K badge). This small task wires those entry points to the search route from [SN-SRCH-006](search.md#sn-srch-006), so the screen is discoverable from anywhere in the shell. It is a self-contained good-first-issue.

The launcher already appears in the design sidebar; this issue makes it functional and adds the global shortcut with correct platform modifiers (Cmd on Apple/web-mac, Ctrl elsewhere) and a visible key badge.

#### Scope
**In:** the sidebar launcher button behaviour (navigate to search, preserve/clear query), the global `Cmd/Ctrl-K` shortcut (Flutter `Shortcuts`/`Actions`), the platform-correct modifier + badge, and focus handling (focus the input on open).

**Out:** the search screen itself ([SN-SRCH-006](search.md#sn-srch-006)), in-note find ([SN-SRCH-008](search.md#sn-srch-008)), and any indexing.

#### Acceptance criteria
- [ ] Tapping the sidebar "Search notes, PDFs, audio…" launcher opens the Search screen with the input focused.
- [ ] Pressing Cmd-K (Apple/macOS-web) or Ctrl-K (Windows/Linux/Android-web) from any main screen opens Search and focuses the input; the badge shows the correct modifier.
- [ ] The shortcut does not fire while typing inside an unrelated text field is intentional (it is global and overrides), and it is registered once (no duplicate handlers).
- [ ] On phones (no keyboard) the launcher is the primary entry; the badge is hidden when no hardware keyboard is present.
- [ ] Launcher and shortcut have Semantics labels ("Search") and the launcher is a 44pt/48dp target; keyboard-reachable on web.

#### Technical notes
Add to `app/lib/shell/` sidebar and the app-level `Shortcuts`/`Actions` map; route via go_router to the search route from [SN-SRCH-006](search.md#sn-srch-006). Detect platform for the modifier via `defaultTargetPlatform`/`kIsWeb`. Badge uses `sane_ui` tokens. Reference `docs/design/screens-and-flows.md` §2, §11.

#### Security & privacy
None beyond baseline. Baseline: no logging of what the user searches; the shortcut carries no data. (CWE-532.)

#### UX notes
Match the design sidebar launcher label and ⌘K badge (`docs/design/screens-and-flows.md` §2). In the collapsed (< 900px) sidebar the launcher becomes an icon with a Semantics label. All 17 looks + dark via tokens (badge/hover states).

#### Test plan
Widget: `app/test/search/launcher_shortcut_test.dart` (tap opens + focuses; Cmd/Ctrl-K opens per platform; badge modifier; single handler). Golden: launcher in collapsed + expanded sidebar across a representative look set.

#### Dependencies
[SN-SRCH-006](search.md#sn-srch-006) (search screen route).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-008

<a id="sn-srch-008"></a>

**Implement in-note find and highlight (Cmd/Ctrl-F, next/prev, counter)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | search, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002), [SN-ED-002](editor.md#sn-ed-002), [SN-TXT-001](text.md#sn-txt-001) |
| Security controls | `MASVS-PRIVACY-3`, `OWASP-A03`, `CWE-89`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Beyond global search, users need **in-note find** — search within the currently open notebook, jump between matches, highlight them, and see a match counter (PRD-LB-264; `research/notability.md` within-note search; `research/goodnotes` document search). Triggered by Cmd/Ctrl-F, it is a focused editor overlay that queries the same on-device index ([SN-SRCH-002](search.md#sn-srch-002)) scoped to the open notebook, then scrolls to and highlights each match on the page.

This complements the global screen: global search finds *which* notebook/page; in-note find navigates *within* the open document. It reuses the deep-link/highlight mechanics ([SN-SRCH-009](search.md#sn-srch-009)) but stays inside one notebook and adds next/prev traversal.

#### Scope
**In:** the Cmd/Ctrl-F find bar over the editor, a notebook-scoped query, match list with next/prev traversal, a "k of N" counter, per-match highlight on the page (typed text ranges and handwriting quads), wrap-around, and clear/close.

**Out:** global search screen ([SN-SRCH-006](search.md#sn-srch-006)), the underlying quad/stroke highlight primitive ([SN-SRCH-009](search.md#sn-srch-009)), and cross-notebook results.

#### Acceptance criteria
- [ ] Cmd/Ctrl-F opens a find bar over the open notebook with the input focused; Esc/× closes it and clears highlights.
- [ ] Typing filters to matches within this notebook only; the counter shows "k of N"; Enter / down and Shift-Enter / up move to next/previous match with wrap-around.
- [ ] Moving to a match scrolls its page into view and highlights the exact typed-text range or handwriting quad (via [SN-SRCH-009](search.md#sn-srch-009) primitive).
- [ ] Matches update live as the debounced query changes; an empty query clears the counter; no-match shows "0 of 0".
- [ ] The find bar renders in all 17 looks + dark, has Semantics labels, 44pt/48dp controls, and is keyboard-driven on web.
- [ ] Works offline; nothing about the search is logged.

#### Technical notes
Find bar in `app/lib/editor/find/`; query `sane_search` with a `notebookId` scope (add a scoped query variant to [SN-SRCH-002](search.md#sn-srch-002) if needed). Reuse the highlight/scroll primitive from [SN-SRCH-009](search.md#sn-srch-009) against the editor canvas (SN-ED-002) and text model (SN-TXT-001). Overlay is a `StatelessWidget` + Riverpod controller; no business logic in `build`. Reference PRD-LB-264 and `docs/design/screens-and-flows.md` §7 editor chrome.

#### Security & privacy
The find query and matched content are note content — queried against the on-device index with parameterised MATCH, never logged or sent (MASVS-PRIVACY-3, OWASP-A03, CWE-89, CWE-532). Scoped to the open notebook (and thus the active profile). No network.

#### UX notes
A compact find bar (input + counter + up/down + close) docked at the top of the editor, styled via `sane_ui` tokens for all 17 looks + dark. On phones it overlays without covering the active line. Provide clear focus states and keyboard traversal. Reference the editor surface in `docs/design/screens-and-flows.md` §7.

#### Test plan
Widget: `app/test/editor/find_bar_test.dart` (open/close, counter, next/prev wrap, live update, empty/no-match). Golden: find bar across a representative look set + dark. Integration: `app/integration_test/in_note_find_test.dart` (open notebook → Ctrl-F → traverse → highlight scrolls).

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (scoped query), [SN-SRCH-009](search.md#sn-srch-009) (highlight primitive — for handwriting quads), SN-ED-002 (editor canvas), SN-TXT-001 (text ranges).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-009

<a id="sn-srch-009"></a>

**Deep-link search results to the exact page and highlight the quad or stroke**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | search, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002), [SN-SRCH-006](search.md#sn-srch-006), [SN-ED-002](editor.md#sn-ed-002), [SN-PG-002](pages-canvas.md#sn-pg-002) |
| Security controls | `MASVS-PLATFORM-3`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

A search result is only useful if it takes you to the exact spot. PRD-LB-261 requires each index row to keep locality (docId, pageIndex, and on-page **quads/stroke ids**) so a result "scrolls to and highlights the exact match" — resolving screens Open Question 14 (seed results wrongly point to page 0). This issue builds the navigation + highlight primitive: given a `SearchResult`, open its notebook, jump to `pageIndex`, scroll the match into view, and flash a highlight over the matched text range, PDF text quad, or handwriting stroke/quad.

This primitive is shared by the global screen ([SN-SRCH-006](search.md#sn-srch-006)) and in-note find ([SN-SRCH-008](search.md#sn-srch-008)). Opening a result is strictly a **view** action — it never mutates the document (CLAUDE.md §7.8: a link lands in view/confirm, never auto-mutates).

#### Scope
**In:** a `openResult(SearchResult)` app-level action (open notebook → go to page → scroll → highlight), the highlight overlay renderer for text ranges / PDF quads / handwriting quads/strokes, a brief flash-then-fade animation, and correct behaviour when the target was edited/deleted since indexing (graceful fallback to page or a "moved/deleted" toast).

**Out:** producing the quads/stroke ids (extractors: [SN-SRCH-010](search.md#sn-srch-010)/[SN-SRCH-011](search.md#sn-srch-011)), the FTS store ([SN-SRCH-002](search.md#sn-srch-002)), and audio-timestamp seeking ([SN-SRCH-012](search.md#sn-srch-012)).

#### Acceptance criteria
- [ ] Tapping a result opens the notebook at the matched `pageIndex` (not page 0) with the sidebar closed, per PRD-LB-008.
- [ ] The match is scrolled into the viewport and highlighted: typed text as a range highlight, PDF text as its quad(s), handwriting as its stroke(s)/quad(s); the highlight flashes then fades.
- [ ] If the underlying object was deleted or moved since indexing, navigation falls back to the page and shows a non-blocking "match may have moved" toast rather than erroring.
- [ ] Opening a result performs no document mutation (verified by a negative test: op-log length unchanged after open).
- [ ] Highlight overlay renders in all 17 looks + dark (contrast ≥ 3:1 against paper and PDF) and is announced to screen readers ("Match on page N").
- [ ] Navigation + first highlight paint completes in < 400 ms for a 1,000-page notebook (uses lazy page load).

#### Technical notes
App-level action in `app/lib/search/open_result.dart`; route via go_router to the editor with `{notebookId, pageIndex, matchLocator}`. Highlight overlay is a `CustomPainter` in a `RepaintBoundary` layered above the page (coordinates in page space; PDF quads in PDF points per PRD-LB-136). Coordinate with the editor canvas (SN-ED-002) and paged navigation (SN-PG-002). Stroke ids/quads come from index rows ([SN-SRCH-002](search.md#sn-srch-002)). Reference `docs/architecture/document-model.md` (Stroke/quad geometry) and `docs/design/screens-and-flows.md` §11 (result → openNb).

#### Security & privacy
Result navigation is a read-only view action that must not mutate state (CLAUDE.md §7.8; MASVS-PLATFORM-3). Results are scoped to the active profile and exclude locked notebooks (OWASP-A01; enforced with [SN-SRCH-015](search.md#sn-srch-015)). No content logged (CWE-532). No network.

#### UX notes
Mirror the design: a result tap opens the notebook at that page and reveals the match (`docs/design/screens-and-flows.md` §11). The highlight should feel like a gentle "here it is" flash, not a persistent selection. Respect reduced-motion (fade only). All 17 looks + dark; PDFs keep original colours, so the highlight must read on both light paper and coloured PDF.

#### Test plan
Widget: `app/test/search/open_result_test.dart` (routes to correct page; highlight overlay placed at locator; deleted-target fallback + toast). Negative: `app/test/search/open_result_no_mutation_test.dart` (op-log unchanged). Golden: highlight overlay on paper + PDF across a look subset. Integration: `app/integration_test/search_deeplink_test.dart`.

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (locality rows), [SN-SRCH-006](search.md#sn-srch-006) (screen), SN-ED-002 (canvas), SN-PG-002 (paged navigation).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-010

<a id="sn-srch-010"></a>

**Integrate background handwriting recognition into the search index**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | search, ocr-hwr, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-004](search.md#sn-srch-004), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

The headline differentiator: **handwriting is searched, on-device and free** — Notability's most-resented paywall becomes our wedge (PRD-LB-300; positioning §1.3). Background handwriting recognition runs continuously and **non-destructively** (never alters ink) to feed the search index (PRD-LB-260/300; ADR-0016 §"Non-destructive recognition"). This issue is the **integration**: it consumes recognised text + per-word on-page quads/stroke ids from the recognition engine (SN-HWR-001, ML Kit Digital Ink by default) and turns them into `SearchIndexRow`s (`source: handwriting`) via the pipeline ([SN-SRCH-004](search.md#sn-srch-004)), preserving locality so results deep-link to the exact strokes ([SN-SRCH-009](search.md#sn-srch-009)).

Recognition itself (engine choice, language packs, accuracy, correction UX) lives in SN-HWR-001; this issue only wires its output into search and guarantees the privacy posture (on by default, on-device, controllable via the settings toggle).

#### Scope
**In:** the handwriting extractor (recognised word → `SearchIndexRow{source:handwriting, quads, strokeIds, lang}`), hooking recognition-complete events into the incremental pipeline, honouring the per-notebook recognition language and the "On-device handwriting recognition" settings toggle, and re-indexing on ink edits.

**Out:** the recognition engine + language packs + convert-to-text UX (SN-HWR-001), the FTS store ([SN-SRCH-002](search.md#sn-srch-002)), ranking ([SN-SRCH-003](search.md#sn-srch-003)), and the deep-link renderer ([SN-SRCH-009](search.md#sn-srch-009)).

#### Acceptance criteria
- [ ] Writing a word by hand makes it findable in global search within the recognition+debounce window, with a result that deep-links to those strokes.
- [ ] Recognition runs on a background isolate and **never destroys ink**; disabling the "On-device handwriting recognition" toggle (settings) stops indexing new handwriting and (per privacy dashboard) can clear the handwriting rows.
- [ ] No handwriting recognition triggers any network egress (airplane-mode test passes); recognised text is stored only locally (MASVS-NETWORK-1, MASVS-PRIVACY-1).
- [ ] Each handwriting row carries on-page quads + stroke ids so [SN-SRCH-009](search.md#sn-srch-009) can highlight the exact strokes.
- [ ] Recognition language is the notebook default (device locale) and covers the broadest available set on every platform (no iOS-vs-Android disparity shipped) — verified against SN-HWR-001's language list.
- [ ] Editing/erasing ink re-indexes just that page's handwriting rows.

#### Technical notes
`packages/sane_search/lib/src/extractors/handwriting_extractor.dart`, registered with [SN-SRCH-004](search.md#sn-srch-004). Consume the `sane_ml` recognition adapter interface (from SN-HWR-001 / ADR-0016); the app wires recognition-complete → pipeline via a Riverpod provider (no package-to-package import). Map recogniser word boxes to page-space quads and to the stroke ids they cover. Respect the `onDevice` pref (`docs/design/screens-and-flows.md` §12 Privacy). Reference ADR-0016 §5 (background recognition) and PRD-LB-300/303.

#### Security & privacy
Recognised handwriting is note content: on-device only, never logged, no egress; on by default but user-controllable and clearable (MASVS-PRIVACY-1, MASVS-NETWORK-1, MASVS-STORAGE-1, CWE-532; privacy dashboard PRD-LB-370). The "runs on your device" guarantee is a headline privacy claim — any future cloud recognition would need a per-request opt-in banner (out of scope here). Locked notebooks are excluded ([SN-SRCH-015](search.md#sn-srch-015)).

#### UX notes
No new screen; surfaces through search results (handwriting cards) and the settings "On-device handwriting recognition" toggle copy ("Your ink never leaves the device to become searchable", `docs/design/screens-and-flows.md` §12). The scribble preview is [SN-SRCH-013](search.md#sn-srch-013). Recognised text also backs OCR alt-text for a11y ([SN-SRCH-017](search.md#sn-srch-017)).

#### Test plan
Unit: `packages/sane_search/test/extractors/handwriting_extractor_test.dart` (word→row mapping, quad/stroke locality, lang tagging) with a faked recognition adapter. Integration: `app/integration_test/handwriting_search_test.dart` (write → find → deep-link to strokes) and an airplane-mode no-egress assertion. Non-destructive: assert ink strokes unchanged after recognition.

#### Dependencies
[SN-SRCH-004](search.md#sn-srch-004) (pipeline), SN-HWR-001 (recognition engine + language + settings toggle).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-011

<a id="sn-srch-011"></a>

**Index PDF text layers and OCR imported PDFs and images for search**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | search, pdf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-004](search.md#sn-srch-004), [SN-PDF-002](pdf.md#sn-pdf-002), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `OWASP-A03`, `CWE-20`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

PDF content must be searchable, and Sane Notes goes further than Goodnotes by **OCR-ing imports that lack a text layer** (PRD-LB-260, PRD-LB-305 — explicitly beating Goodnotes, which does not OCR imports and only searches pre-OCR'd PDFs). This issue feeds PDF text into the index: on first open, extract the PDF's text layer with page-relative quads (via the PDF engine SN-PDF-002 / pdfrx text-with-bounds); for text-layerless PDFs and imported images, run OCR (Apple Vision / ML Kit / Tesseract via SN-HWR-001) and index the recognised text with quads. Rows carry locality so results highlight the exact quad ([SN-SRCH-009](search.md#sn-srch-009)).

All PDF/image parsing is untrusted input handled off the UI isolate with resource caps (CLAUDE.md §7.8). Extraction/OCR is one-time per document (cached) and incremental via the pipeline ([SN-SRCH-004](search.md#sn-srch-004)).

#### Scope
**In:** a PDF-text extractor (text + quads, per page), an OCR extractor for text-layerless PDFs and imported images (recognised text + quads), `source: pdf` rows with locality, caching so re-open does not re-extract, and resource-capped off-isolate parsing.

**Out:** the PDF render/text engine and OCR engines themselves (SN-PDF-002, SN-HWR-001), the store/pipeline ([SN-SRCH-002](search.md#sn-srch-002)/[SN-SRCH-004](search.md#sn-srch-004)), and the highlight renderer ([SN-SRCH-009](search.md#sn-srch-009)).

#### Acceptance criteria
- [ ] Opening a text-layer PDF indexes its text with per-page quads; searching a phrase returns a result that deep-links to and highlights the exact quad.
- [ ] Importing a scanned/text-layerless PDF or an image OCRs it on a background isolate and indexes the recognised text (PRD-LB-305), also with quads.
- [ ] Extraction/OCR is cached per document (content-addressed): re-opening does not re-run; a hostile/malformed PDF fails **closed** into a safe error, parsed off the UI isolate, resource-capped (no decompression bomb), path-confined (secure-coding checklist §1).
- [ ] A 600-page PDF indexes without blocking the UI and within the memory cap (LRU); scrolling stays at 60 fps during background indexing.
- [ ] PDF text indexing performs no network egress; OCR runs on-device by default.
- [ ] Deleting/removing a PDF page removes its `pdf` rows.

#### Technical notes
`packages/sane_search/lib/src/extractors/pdf_extractor.dart` + `ocr_extractor.dart`, registered with [SN-SRCH-004](search.md#sn-srch-004). Use SN-PDF-002 (pdfrx text-with-bounds / `syncfusion_flutter_pdf` per PRD-LB-131) for text+quads; use the `sane_ml` OCR adapter (SN-HWR-001) for image/text-layerless PDFs (Apple Vision / ML Kit / Tesseract.js per ADR-0016). Parse off-isolate with a bounded LRU (PRD-LB-135). Quads in PDF points, page-relative (PRD-LB-136). Cache keyed by PDF blob hash.

#### Security & privacy
Untrusted PDF/image bytes: validate type/size, cap resources before decode, parse off the UI isolate, confine any embedded path (OWASP-A03, CWE-20; CLAUDE.md §7.8). Extracted/OCR'd text is note content — stored locally, never logged, no egress (MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-532). Feeds the parser-fuzzing corpus at verification.

#### UX notes
No new screen; results appear as PDF-text cards on the Search screen (`docs/design/screens-and-flows.md` §11) and deep-link with quad highlight ([SN-SRCH-009](search.md#sn-srch-009)). Long imports show the shared indexing progress affordance (PRD-LB-361). PDFs keep original colours; highlight must read on them.

#### Test plan
Unit: `packages/sane_search/test/extractors/pdf_extractor_test.dart` (text+quads, cache hit), `.../ocr_extractor_test.dart` (image/text-layerless path with a faked OCR adapter). Security: `packages/sane_search/test/pdf_extract_fuzz_test.dart` (malformed PDF fails closed, resource-capped). Integration: `app/integration_test/pdf_search_test.dart`.

#### Dependencies
[SN-SRCH-004](search.md#sn-srch-004) (pipeline), SN-PDF-002 (PDF render/text engine), SN-HWR-001 (OCR engines).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-012

<a id="sn-srch-012"></a>

**Index audio transcripts and surface timestamped audio search results**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | search, audio |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-004](search.md#sn-srch-004), [SN-AUD-002](audio.md#sn-aud-002), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1`, `MASVS-STORAGE-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Lecture audio is searchable too: on-device transcripts (PRD-LB-221/222) must be indexed so a query can find "the moment the lecturer said X" and jump to it. PRD-LB-223 requires transcript text to be searchable and PRD-LB-260 lists transcripts as an index source; the design result types include "Audio · mm:ss" (`docs/design/screens-and-flows.md` §11). This issue indexes transcript words (`source: transcript`) with their audio timestamps + `sessionId`, so a result card reads "Audio · mm:ss" and tapping it opens the notebook and seeks audio to that moment (and, via the audio↔ink sync, highlights the ink written then).

Transcription itself (WhisperKit / whisper.cpp / SpeechAnalyzer, on-device by default) is owned by SN-HWR-001/SN-AUD-002; this issue consumes the word-timestamped transcript and wires it into search.

#### Scope
**In:** the transcript extractor (transcript word → `SearchIndexRow{source:transcript, sessionId, tStartMs, pageIndex, lang}`), the "Audio · mm:ss" result payload, seeking audio to `tStartMs` on result tap, re-indexing when a transcript is (re)generated/edited, and honouring the on-device-by-default posture.

**Out:** transcription engines (SN-HWR-001), the recorder/playback (SN-AUD-002), the audio↔ink sync highlight (owned by SN-AUD), and the FTS store/pipeline.

#### Acceptance criteria
- [ ] Searching a word spoken in a lecture returns an "Audio · mm:ss" result; tapping it opens the notebook and seeks audio playback to that timestamp.
- [ ] Transcript rows carry `sessionId` + `tStartMs` + `pageIndex` so the result timestamp is correct even for a recording that spans multiple pages (PRD-LB-220).
- [ ] Transcripts are indexed on-device by default with no network egress; any cloud transcription is a separate per-request opt-in (out of scope) and never silently indexed remotely.
- [ ] (Re)generating or editing a transcript re-indexes just that session's rows; deleting a recording removes them.
- [ ] Transcript search respects the Audio filter on the search screen and is excluded from other filters appropriately.
- [ ] Airplane-mode: recording → on-device transcript → transcript search all work.

#### Technical notes
`packages/sane_search/lib/src/extractors/transcript_extractor.dart`, registered with [SN-SRCH-004](search.md#sn-srch-004). Consume `Transcript{words[]{text,tStartMs,tEndMs,conf}}` (PRD-02 §2 model) from the audio/recognition layer (SN-AUD-002 / SN-HWR-001 via `sane_ml`). Result payload includes `sessionId`+`tStartMs`; the app-level open action ([SN-SRCH-009](search.md#sn-srch-009)) delegates the actual seek to the audio player (SN-AUD-002). Reference ADR-0015 (audio) + ADR-0016 (transcription) and PRD-LB-221/222/223.

#### Security & privacy
Transcripts are note content — indexed and stored on device, never logged, no egress by default (MASVS-PRIVACY-1, MASVS-NETWORK-1, MASVS-STORAGE-1, CWE-532). The on-device default is a privacy guarantee; recording consent + indicators are handled by the audio area. Locked notebooks excluded ([SN-SRCH-015](search.md#sn-srch-015)).

#### UX notes
Surfaces as the "Audio · mm:ss" result card in `docs/design/screens-and-flows.md` §11; the Audio filter chip narrows to these. Tapping should feel like "jump to the moment it was said". Snippet shows surrounding transcript words with the match `<mark>`-highlighted. All looks + dark inherited from the screen.

#### Test plan
Unit: `packages/sane_search/test/extractors/transcript_extractor_test.dart` (word→row with timestamp/session/page, re-index on regen, delete cleanup) with a faked transcript source. Integration: `app/integration_test/audio_search_test.dart` (record → transcribe on-device → search → tap seeks audio). No-egress airplane-mode assertion.

#### Dependencies
[SN-SRCH-004](search.md#sn-srch-004) (pipeline), SN-AUD-002 (recorder/playback + seek), SN-HWR-001 (on-device transcription).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-013

<a id="sn-srch-013"></a>

**Render the handwriting scribble preview in search result cards**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | design |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | search, design-system |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SRCH-006](search.md#sn-srch-006) |
| Depends on | [SN-SRCH-006](search.md#sn-srch-006), [SN-SRCH-010](search.md#sn-srch-010) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

For handwriting results, the design shows a **rendered ink-scribble preview** of the matched strokes inside the result card, not just text (PRD-LB-262; `docs/design/screens-and-flows.md` §11 "for handwriting a rendered ink-scribble preview"). This makes a handwriting hit instantly recognisable — you see your own writing. This issue renders that preview: given the matched stroke ids/quads (from [SN-SRCH-010](search.md#sn-srch-010)), paint a small, cropped, theme-aware thumbnail of those strokes into the card from [SN-SRCH-006](search.md#sn-srch-006).

It is a focused painting task: crop to the match bounds with padding, scale to the card preview box, paint via the shared ink renderer, and cache. It must render across all 17 looks + dark and carry OCR alt-text for a11y.

#### Scope
**In:** the scribble-preview widget (crop matched strokes → mini `CustomPainter`/cached `Picture` → card slot), bounds cropping with padding, disk/mem caching keyed by (docId,page,matchId), reduced-motion/static rendering, and OCR-backed Semantics alt-text.

**Out:** stroke capture/geometry (SN-INK area), recognition ([SN-SRCH-010](search.md#sn-srch-010)), and the card layout itself ([SN-SRCH-006](search.md#sn-srch-006)).

#### Acceptance criteria
- [ ] A handwriting result card shows a cropped thumbnail of exactly the matched strokes (with small padding), scaled to the card preview box, not the whole page.
- [ ] The preview paints via the shared ink renderer so it matches on-canvas ink; it renders correctly in all 17 looks + light/dark (golden-tested).
- [ ] Previews are cached (mem + disk) and generated off the UI isolate; scrolling a list of handwriting results stays at 60 fps.
- [ ] Each preview has a Semantics label = the recognised text of the match ("handwritten: <text>") so screen readers get OCR alt-text (PRD-LB-370).
- [ ] Respects reduced-motion (no animation) and never blocks the card's text from rendering (async placeholder while painting).

#### Technical notes
Widget in `app/lib/search/widgets/scribble_preview.dart`; reuse the `sane_render` ink painter to draw stroke geometry cropped to match bounds. Stroke ids/quads come from the handwriting index rows ([SN-SRCH-010](search.md#sn-srch-010)). Cache like notebook thumbnails (PRD-LB-042 pattern; off-isolate generation, disk cache). Use `sane_ui` tokens for the frame/background. Reference `docs/design/screens-and-flows.md` §11.

#### Security & privacy
The preview is note content shown only in-app to the authenticated local user; the cache is part of the encrypted local store and never logged or exported unexpectedly (MASVS-PRIVACY-3, CWE-532). Alt-text exposes recognised text to accessibility services intentionally (a11y), consistent with on-device recognition. No network.

#### UX notes
Match the design result card: type icon, title, "Page N · Handwriting", the scribble preview, snippet, timestamp (`docs/design/screens-and-flows.md` §11). The preview is a small rounded thumbnail; ink colour is the original stroke colour, framed on a token background that works in every look + dark. Placeholder shimmer while painting.

#### Test plan
Golden: `app/test/search/goldens/scribble_preview_<look>_<mode>.png` across all 17 looks + dark, with a fixed stroke fixture. Widget: `app/test/search/scribble_preview_test.dart` (crop bounds, cache hit, alt-text label, async placeholder).

#### Dependencies
[SN-SRCH-006](search.md#sn-srch-006) (result card slot), [SN-SRCH-010](search.md#sn-srch-010) (matched stroke ids/quads).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-014

<a id="sn-srch-014"></a>

**Implement saved smart collections from search filters**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | search, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002), [SN-SRCH-006](search.md#sn-srch-006), [SN-LIB-001](library.md#sn-lib-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Power users want to save a search as a living view. PRD-LB-038 requires users to **save a filter as a smart collection** (subject + tags + type filters + date range) that appears as a pinnable sidebar entry and re-evaluates live (`research/notability.md` saved smart searches). This turns search from a one-shot into an organising tool. This issue defines the `SmartCollection` entity, the "save current search as collection" action, its sidebar entry, and live re-evaluation against the index/library.

Smart collections are per-profile CRDT metadata (like other library entities, PRD-LB-002) so they sync without a server. They land in M4 alongside the tag/filter maturity and sync foundation.

#### Scope
**In:** the `SmartCollection{id,name,query?,subjectIds,tagIds,sourceFilters,dateRange,pinned}` entity + repository, a "Save as smart collection" action from the search screen, a pinnable sidebar entry that opens a live-re-evaluated result list, and edit/rename/delete/reorder.

**Out:** the FTS query engine ([SN-SRCH-002](search.md#sn-srch-002)), the base search screen ([SN-SRCH-006](search.md#sn-srch-006)), and generic library folders/tags (SN-LIB-001).

#### Acceptance criteria
- [ ] From a search with active filters, "Save as smart collection" creates a named collection capturing the query + subject/tag/source/date filters.
- [ ] The collection appears as a sidebar entry; opening it re-runs the query live so newly-matching notebooks/pages appear without manual refresh.
- [ ] Collections can be pinned/unpinned, renamed, reordered, and deleted; state is per-profile and switches with the active profile (PRD-LB-350).
- [ ] A collection is a CRDT object (LWW scalars, add-wins sets for id lists) so it merges across devices (PRD-LB-002/002).
- [ ] Empty collection shows a helpful empty state; a collection whose tags/subjects were deleted degrades gracefully (ignores dangling ids).
- [ ] Sidebar entry + editor render in all 17 looks + dark, with Semantics labels and 44pt/48dp targets.

#### Technical notes
Entity + repo in `sane_core`/library model (per `docs/product/prd-02-library-documents-audio-search.md` §2 pattern); re-evaluation calls `sane_search` ([SN-SRCH-002](search.md#sn-srch-002)) plus a library metadata query for subject/tag/date. Sidebar entry via the library shell (SN-LIB-001/002) and go_router. Coordinate in `app/` via Riverpod. Reference PRD-LB-038 and CRDT semantics in `docs/architecture/document-model.md`.

#### Security & privacy
Collection definitions and their evaluated content are per-profile; scoping prevents cross-profile leakage (OWASP-A01, MASVS-PRIVACY-2). Definitions are metadata stored in the encrypted local store; no query text or results logged (MASVS-STORAGE-1, CWE-532). Riding the op-log, they are E2E-encrypted when synced (inherits SN-CRY/SN-SYNC). No new network call of its own.

#### UX notes
Sidebar smart-collection entries sit with Library nav (`docs/design/screens-and-flows.md` §2); the save action is a control on the search screen (§11). Pinned collections show first. Use `sane_ui` tokens across all 17 looks + dark. Provide clear "0 matches yet" empty states.

#### Test plan
Unit: `packages/sane_core/test/smart_collection_test.dart` (CRDT merge, dangling-id tolerance). Widget: `app/test/search/smart_collection_test.dart` (save, live re-eval, pin/rename/delete, per-profile switch). Golden: sidebar entry + editor across a look subset.

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (query), [SN-SRCH-006](search.md#sn-srch-006) (save action), SN-LIB-001 (subjects/tags/library shell).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-015

<a id="sn-srch-015"></a>

**Encrypt the search index at rest and exclude locked notebooks from results**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | search, security, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002), [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `OWASP-A01`, `OWASP-A02`, `CWE-312`, `CWE-922`, `ASVS-V8` |
| Extra labels | agent-ready |

#### Context

The search index is a plaintext mirror of everything the user ever wrote, typed, imported or recorded — so it is one of the most sensitive stores in the app. Locked decision 3 and CLAUDE.md §7 require note content to be encrypted at rest; PRD-LOCK-006 requires **locked notebooks to be excluded from search/preview** and their content ciphertext-at-rest. This issue makes the index encrypted at rest with the rest of the local store (SQLCipher-style DB encryption keyed via `sane_secure_store`) and enforces that **locked notebooks are excluded from all search results and index reads** while locked.

Without this, a device-level compromise or a locked-notebook bypass would leak everything through search. It lands in M4 when the key hierarchy (SN-CRY-002) and lock features exist.

#### Scope
**In:** at-rest encryption of the FTS/index tables (via the encrypted `drift`/SQLCipher store keyed from `sane_secure_store`), excluding locked-notebook rows from every query path, redacting/omitting locked content from snippets/previews, and a re-index/purge hook when a notebook is locked/unlocked.

**Out:** the key hierarchy + Keychain/Keystore storage (SN-CRY-002), the lock UI/biometric gate (PRD-LOCK-005, identity area), and the FTS store schema ([SN-SRCH-002](search.md#sn-srch-002)).

#### Acceptance criteria
- [ ] The index DB is encrypted at rest with an approved AEAD/DB-encryption scheme keyed from `sane_secure_store`; the key never touches disk/logs/backups (CLAUDE.md §7.7).
- [ ] A locked notebook returns **zero** search results and zero snippet/preview content while locked — verified by a negative test that a known phrase in a locked notebook is unfindable.
- [ ] Unlocking makes its content searchable again; locking purges or gates its rows so they cannot leak via a stale query.
- [ ] Inspecting the raw index DB file (without keys) yields no plaintext note content (CWE-312/CWE-922); AEAD tags are verified and reads fail closed on tamper.
- [ ] No regression to the < 300 ms first-results budget from encryption (measured in [SN-SRCH-016](search.md#sn-srch-016)).
- [ ] Backups/exports never include the plaintext index.

#### Technical notes
Use the encrypted local DB from SN-CORE-004 + SN-CRY-002 (`sane_secure_store` for the DB key; approved crypto only — CLAUDE.md §7.7). Add a `locked` predicate to every query in [SN-SRCH-002](search.md#sn-srch-002) that joins against the notebook lock state (PRD-LOCK-005/006). On lock, either delete-and-reindex-on-unlock or gate by predicate; document the chosen approach in an ADR update. Reference `docs/architecture/crypto.md`, ADR-0007, and PRD-LOCK-006.

#### Security & privacy
Core mitigations: encrypt the most sensitive derived store at rest (MASVS-STORAGE-1/2, MASVS-CRYPTO-1/2, CWE-312, CWE-922, ASVS V8); enforce access control so locked content is never returned (OWASP-A01); fail closed on AEAD tag mismatch (OWASP-A02). Threat rows: device theft, forensic image, locked-notebook bypass — track in `docs/security/threat-model.md` and the controls matrix. CODEOWNERS review required (security-critical path).

#### UX notes
None beyond baseline — behaviour is invisible except that locked notebooks simply do not appear in results (aligns with the lock feature's expectation). Ensure the "no results" case for a locked-but-matching query is indistinguishable from a genuine no-match (do not hint that hidden matches exist). Baseline: no content/keys logged.

#### Test plan
Security tests: `app/test/security/search_index_encryption_test.dart` (raw DB has no plaintext; key from secure store; fail-closed on tamper), `app/test/security/locked_notebook_search_exclusion_test.dart` (locked phrase unfindable; unlock restores; lock purges). Perf regression check in [SN-SRCH-016](search.md#sn-srch-016).

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (query paths to gate), SN-CRY-002 (key hierarchy + secure store).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-016

<a id="sn-srch-016"></a>

**Add the search performance harness and CI budget gates**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | search, perf |
| Size | M |
| SDLC | verification |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-004](search.md#sn-srch-004), [SN-PERF-002](perf.md#sn-perf-002) |
| Security controls | `CWE-532` |
| Extra labels | agent-ready |

#### Context

Search has hard performance targets: **first on-device FTS results < 300 ms over a typical library** (PRD-LB §15, marked verify), indexing that **never blocks a frame while writing** (PRD-LB-360/361; CLAUDE.md §8), and no regression from index encryption ([SN-SRCH-015](search.md#sn-srch-015)). Budgets that are not measured are not real, so this issue builds a search-specific perf harness and wires it into CI as a gate, using the shared latency measurement harness (SN-PERF-002).

It generates representative corpora (e.g. 500 notebooks / 10k pages / mixed sources), measures query latency percentiles and index throughput, and fails CI on regression — matching the roadmap's "a regression does not merge" stance.

#### Scope
**In:** a synthetic corpus generator, query-latency benchmarks (p50/p95 first-results), index-throughput + incremental-update benchmarks, a "no frame > 16.7 ms during background indexing" soak assertion, and a CI job that gates on the budgets.

**Out:** the shared device-lab/latency harness itself (SN-PERF-002/004) and the features being measured.

#### Acceptance criteria
- [ ] A reproducible corpus generator produces a "typical" and a "large" library fixture with all six index sources.
- [ ] Query benchmark asserts p95 first-results < 300 ms on the reference target for the typical library; the number is recorded to de-verify PRD-LB §15.
- [ ] An indexing soak (continuous writes) asserts no frame > 16.7 ms attributable to indexing (profile trace captured as a CI artifact).
- [ ] Index throughput (rows/sec) and incremental re-index latency are tracked over time; a configurable regression threshold fails the CI job.
- [ ] The encryption path ([SN-SRCH-015](search.md#sn-srch-015)) is included so its overhead is bounded and measured.
- [ ] The harness logs only timings/aggregates — never query text or note content.

#### Technical notes
Add `tools/perf_harness/search/` benchmarks and a `packages/sane_search/benchmark/` entry using the shared harness from SN-PERF-002; wire a CI job in `.github/workflows/` (perf gate, per `docs/security/devsecops-pipeline.md` and `docs/platform/performance-budgets.md`). Corpus generator in `tools/`. Reference PRD-LB §15 targets and CLAUDE.md §8.

#### Security & privacy
None beyond baseline. The harness must synthesise or hash any content and log only timing aggregates — never real query text, snippets, or note content (CWE-532). No network.

#### UX notes
None beyond baseline — this is CI/tooling with no user surface. Baseline: no content in logs/artifacts (only timings and profile traces).

#### Test plan
The harness *is* the test: `tools/perf_harness/search/query_latency_bench.dart`, `.../index_throughput_bench.dart`, and `app/integration_test/search_index_soak_test.dart` (frame-time soak). CI job runs them and compares against recorded budgets; self-test that the gate fails on an injected regression.

#### Dependencies
[SN-SRCH-004](search.md#sn-srch-004) (pipeline to measure), SN-PERF-002 (shared latency harness).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-017

<a id="sn-srch-017"></a>

**Make search accessible and internationalised (labels, alt-text, RTL, tokenizers)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | search, a11y, i18n |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-006](search.md#sn-srch-006), [SN-A11Y-001](a11y.md#sn-a11y-001), [SN-I18N-001](i18n.md#sn-i18n-001) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-PLATFORM-2`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Search must be usable by everyone and in every supported language. Locked decision 10 mandates WCAG 2.2 AA, VoiceOver/TalkBack for all chrome, and **OCR alt-text for handwritten content** (PRD-LB-370); PRD-LB-371 requires language pickers to expose the full on-device set and correct RTL (Arabic) layouts. English-only tokenisation also silently breaks handwriting/typed search for CJK and Indic scripts — Sane Notes ships Hindi + major Indian languages, so the FTS tokenizer must handle them. This issue closes the a11y + i18n gaps across the search surfaces built in [SN-SRCH-006](search.md#sn-srch-006)/[SN-SRCH-008](search.md#sn-srch-008).

It layers on the shared a11y (SN-A11Y-001) and i18n (SN-I18N-001) foundations, applying them specifically to search chrome, result cards, and the tokenizer configuration in [SN-SRCH-002](search.md#sn-srch-002).

#### Scope
**In:** Semantics labels + focus order for the search field/chips/result cards + in-note find, OCR alt-text on handwriting results and scribble previews, RTL layout correctness for search + in-note find, tokenizer/analyzer selection per script (CJK bigram/ICU, Indic segmentation) wired to the row `lang`, and localised copy for all search strings.

**Out:** the base screens ([SN-SRCH-006](search.md#sn-srch-006)/[SN-SRCH-008](search.md#sn-srch-008)), the app-wide a11y/i18n infra (SN-A11Y-001/SN-I18N-001), and recognition language packs (SN-HWR-001).

#### Acceptance criteria
- [ ] Every search control has a Semantics label; VoiceOver/TalkBack can search, switch filters, move through results, and open a result without sight.
- [ ] Handwriting result cards and scribble previews expose their recognised text as alt-text ("handwritten: <text>") (PRD-LB-370).
- [ ] Arabic (RTL) renders the search screen and in-note find correctly (mirrored layout, correct text direction, aligned chips).
- [ ] Searching CJK and Indic (e.g. Hindi/Devanagari) handwriting and typed text returns correct matches — the tokenizer segments these scripts rather than treating a line as one token.
- [ ] All search strings (placeholder, count line, empty state, filters) are localised and pass with pseudo-loc (no truncation/overlap) across looks.
- [ ] Contrast ≥ 4.5:1 for text and ≥ 3:1 for the match highlight in all 17 looks + dark; targets ≥ 44pt/48dp; keyboard-reachable on web.

#### Technical notes
Screen a11y in `app/lib/search/`; add per-script FTS5 tokenizers in `packages/sane_search` (unicode61 baseline + an ICU/bigram path selected by row `lang` from [SN-SRCH-002](search.md#sn-srch-002)). Localised strings via the app ARB/l10n pipeline (SN-I18N-001). Alt-text sourced from recognised text ([SN-SRCH-010](search.md#sn-srch-010)). Reference `docs/design/accessibility.md`, Locked decision 10, PRD-LB-370/371, and ADR-0016 (ML Kit 300+ languages / 25+ scripts).

#### Security & privacy
Alt-text intentionally exposes recognised note content to accessibility services for the local user (MASVS-PLATFORM-2) — consistent with on-device recognition; nothing is logged or sent (MASVS-PRIVACY-3, CWE-532). No network.

#### UX notes
Applies to the design **Search** screen and the in-note find bar (`docs/design/screens-and-flows.md` §11, §7). Follow `docs/design/accessibility.md`; verify with the 17 looks in both light + dark and with RTL. Respect Dynamic Type / readable-font settings.

#### Test plan
Widget/a11y: `app/test/search/search_a11y_test.dart` (Semantics labels, focus order, alt-text, target sizes, contrast). i18n: `packages/sane_search/test/tokenizer_i18n_test.dart` (CJK/Indic segmentation matches), `app/test/search/search_rtl_test.dart` (Arabic layout). Golden: search screen in Arabic + a CJK locale.

#### Dependencies
[SN-SRCH-006](search.md#sn-srch-006) (search screen), [SN-SRCH-008](search.md#sn-srch-008) (in-note find), SN-A11Y-001, SN-I18N-001.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

### SN-SRCH-018

<a id="sn-srch-018"></a>

**Build the derived backlink index by inverting Link objects**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | core |
| Areas | search |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SRCH-001](search.md#sn-srch-001) |
| Depends on | [SN-SRCH-002](search.md#sn-srch-002), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A01`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The document model deliberately stores links one-directional and derives backlinks: "Backlinks are **DERIVED**: never stored as their own edges. An index (`sane_search`) scans Link objects and inverts them" (`docs/architecture/document-model.md` §"Link / Backlink"). This keeps the CRDT free of the "dangling edge on concurrent delete" bug class — a link to a tombstoned target renders as broken and filterable. This issue builds that inverted index in `sane_search`, so backlinks & the note graph (PRD-04 §6, roadmap M6) can query "what links here" efficiently.

It is the search-area data structure only; the backlinks UI / graph view lives in the editor/study areas and consumes this index.

#### Scope
**In:** an inverted-link index (target → sources) built from Link objects via the incremental pipeline, a `backlinksOf(targetId)` query, tombstone-aware filtering (broken links flagged, not crashing), and incremental updates as links are added/removed.

**Out:** the backlink/graph UI (editor/study areas), Link object creation (editor/PDF excerpt-to-note SN-* areas), and full-text search ([SN-SRCH-002](search.md#sn-srch-002)).

#### Acceptance criteria
- [ ] Creating a Link from A→B makes B queryable for its backlink from A via `backlinksOf(B)`; removing the link removes the backlink.
- [ ] A link whose target is tombstoned is returned flagged as broken (filterable), never as a crash or dangling reference.
- [ ] The index updates incrementally through the pipeline ([SN-SRCH-004](search.md#sn-srch-004)); no full rescan on each edit.
- [ ] Backlinks are per-profile and never cross profiles.
- [ ] `backlinksOf` returns in well under a frame for a notebook with thousands of links (indexed lookup, not a scan).
- [ ] Public API returns `Result<List<Backlink>, Failure>`; pure Dart, no `package:flutter`.

#### Technical notes
`packages/sane_search/lib/src/backlink_index.dart`, fed by the pipeline ([SN-SRCH-004](search.md#sn-srch-004)) observing Link object ops from `sane_core` (SN-CORE-002). Store as an indexed table (targetId → sourceIds) in the same DB. Tombstone-awareness reads the folded CRDT state (`docs/architecture/document-model.md` §Deletion/tombstones). Coordination to surface backlinks in UI is done in the consuming area via a Riverpod provider. Reference the Link/Backlink model section and PRD-04 §6.

#### Security & privacy
Backlink data is note-structure content — on device only, per-profile scoped, never logged (MASVS-PRIVACY-1, OWASP-A01, CWE-532). Broken/tombstoned targets are filtered so a deleted note is not leaked via a dangling backlink. No network. Rides the encrypted store + op-log (E2E-encrypted on sync).

#### UX notes
None beyond baseline — no direct UI; it powers backlinks/graph surfaces owned elsewhere (PRD-04 §6). Baseline: no content logging; ids as opaque hashes.

#### Test plan
Unit: `packages/sane_search/test/backlink_index_test.dart` (invert add/remove, tombstone flagging, per-profile isolation, incremental update, indexed lookup perf). Integration: `app/integration_test/backlinks_test.dart` (create link → backlink appears → delete target → flagged broken).

#### Dependencies
[SN-SRCH-002](search.md#sn-srch-002) (shared DB/store), SN-CORE-002 (Link objects + op-log), [SN-SRCH-004](search.md#sn-srch-004) (incremental pipeline).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner).
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR-0016 on-device ML/search, `docs/architecture/document-model.md`, controls-matrix if a control mapping changed).
- [ ] Reviewed against `docs/security/secure-coding-checklist.md`; Security & privacy section IDs verified; no note content, query text, or ink coordinates in logs (object ids as opaque short hashes).

---

