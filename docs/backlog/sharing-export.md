# Backlog — area: sharing-export

40 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-SHR-001](sharing-export.md#sn-shr-001) **Build sharing, export & import (exporters, capability share links, competitor import)** (epic · M6 Collaboration, Sharing & Sage AI)
  - [SN-SHR-002](sharing-export.md#sn-shr-002) **Implement the on-device export service: scope, streaming, progress, cancel** · p1 · feature · M · M2 Library & Documents
  - [SN-SHR-003](sharing-export.md#sn-shr-003) **Export a notebook or page range to PDF with vector ink and a searchable text layer** · p1 · feature · L · M2 Library & Documents
  - [SN-SHR-004](sharing-export.md#sn-shr-004) **Export a page or selection to PNG at 1x/2x/3x with optional transparency** · p2 · feature · S · M2 Library & Documents
  - [SN-SHR-005](sharing-export.md#sn-shr-005) **Export ink, shapes and text to SVG as vector paths** · p2 · feature · M · M2 Library & Documents
  - [SN-SHR-006](sharing-export.md#sn-shr-006) **Export typed text and OCR transcripts to Markdown (CommonMark + GFM)** · p2 · feature · M · M2 Library & Documents
  - [SN-SHR-007](sharing-export.md#sn-shr-007) **Export a notebook to structured JSON matching the .sanenote schema** · p2 · feature · S · M2 Library & Documents
  - [SN-SHR-008](sharing-export.md#sn-shr-008) **Export the lossless .sanenote bundle with optional encryption** · p1 · feature · M · M2 Library & Documents
  - [SN-SHR-009](sharing-export.md#sn-shr-009) **Implement "Export everything" ZIP of every notebook as PDF and .sanenote** · p2 · feature · S · M2 Library & Documents
  - [SN-SHR-010](sharing-export.md#sn-shr-010) **Offer the OS share sheet for export artefacts on every platform** · p2 · feature · S · M2 Library & Documents
  - [SN-SHR-011](sharing-export.md#sn-shr-011) **Support system print of a page range with correct paper size and margins** · p2 · feature · S · M2 Library & Documents
  - [SN-SHR-012](sharing-export.md#sn-shr-012) **Preserve alt-text and OCR transcripts as accessible metadata in exports** · p2 · task · S · M2 Library & Documents
  - [SN-SHR-013](sharing-export.md#sn-shr-013) **Implement the capability share-link model with the wrapped key in the URL fragment** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-014](sharing-export.md#sn-shr-014) **Build the Share overlay UI: link toggle, permission, people list, copy link, export** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-015](sharing-export.md#sn-shr-015) **Enforce share roles cryptographically: Owner, Can edit, Can comment, Can view** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-016](sharing-export.md#sn-shr-016) **Implement invite-by-email, People management, and the Free 3-person gate** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-017](sharing-export.md#sn-shr-017) **Implement cryptographic revocation: rotate the content key and re-wrap on removal** · p0 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-018](sharing-export.md#sn-shr-018) **Add expiring share links with an exp claim in the wrapped-key envelope** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-019](sharing-export.md#sn-shr-019) **Add the link-activity view and scoped single-page or page-range shares** · p3 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-020](sharing-export.md#sn-shr-020) **Add the default share-posture build-time flag (link-off/Can-view vs design default)** · p1 · task · S · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-021](sharing-export.md#sn-shr-021) **Build the import pipeline: entry points, isolation, and per-import report** · p1 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-022](sharing-export.md#sn-shr-022) **Implement Markdown import (front-matter, wiki-links, GFM, embedded images)** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-023](sharing-export.md#sn-shr-023) **Implement image import with on-device OCR and camera-scan auto-crop** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-024](sharing-export.md#sn-shr-024) **Implement Notion import from Markdown+CSV and HTML zip exports** · p3 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-025](sharing-export.md#sn-shr-025) **Implement Goodnotes and Notability import (tier-A best-effort + tier-B PDF fallback)** · p3 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-026](sharing-export.md#sn-shr-026) **Implement OneNote import (PDF/.docx tier-B and Graph/.one tier-A, keep PDFs vector)** · p3 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-027](sharing-export.md#sn-shr-027) **Harden competitor and bundle import against malicious files** · p0 · security · M · M6 Collaboration, Sharing & Sage AI
  - [SN-SHR-028](sharing-export.md#sn-shr-028) **Build the export/import round-trip and fidelity test suite** · p1 · test · L · M6 Collaboration, Sharing & Sage AI
  - [SN-GAND-015](sharing-export.md#sn-gand-015) **Implement Samsung Notes import for Galaxy switchers** · p2 · feature · L · M6 Collaboration, Sharing & Sage AI
  - [SN-GAND-019](sharing-export.md#sn-gand-019) **Expose notebooks and exports through an Android DocumentsProvider** · p3 · feature · M · M6 Collaboration, Sharing & Sage AI
  - [SN-GCMP-010](sharing-export.md#sn-gcmp-010) **Implement web clipper / read-it-later capture** · p3 · feature · M · Backlog
  - [SN-GCMP-011](sharing-export.md#sn-gcmp-011) **Support email-to-import for PDFs (ingest by email)** · p3 · feature · M · Backlog
  - [SN-GCMP-016](sharing-export.md#sn-gcmp-016) **Publish a note as a public read-only web page** · p3 · feature · L · M8 Launch & Growth
  - [SN-GCMP-017](sharing-export.md#sn-gcmp-017) **Export to Word (.docx) and PowerPoint (.pptx)** · p3 · feature · L · Backlog
  - [SN-GA11-012](a11y.md#sn-ga11-012) **Export tagged, accessible PDFs with structure, reading order and alt text** · p2 · feature · L · M6 Collaboration, Sharing & Sage AI

---

## Issues

### SN-GAND-015

<a id="sn-gand-015"></a>

**Implement Samsung Notes import for Galaxy switchers**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, pdf, ocr-hwr |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-021](sharing-export.md#sn-shr-021), [SN-SHR-027](sharing-export.md#sn-shr-027), [SN-PDF-006](pdf.md#sn-pdf-006) |
| Security controls | `MASVS-CODE-4`, `MASVS-PLATFORM-1`, `CWE-20`, `CWE-22`, `CWE-400` |
| Extra labels | — |

#### Context
The import backlog covers Markdown ([SN-SHR-022](sharing-export.md#sn-shr-022)), Notion ([SN-SHR-024](sharing-export.md#sn-shr-024)), Goodnotes/Notability ([SN-SHR-025](sharing-export.md#sn-shr-025)) and OneNote ([SN-SHR-026](sharing-export.md#sn-shr-026)) — every major **iPad** competitor and none of the Android one. `docs/research/sources/samsung-notes-nebo-other.md` §1 identifies Samsung Notes as "the reference stylus-native note experience for Android and the app Sane Notes is most likely to be compared against on Galaxy hardware", bundled free on every Galaxy phone and tablet — which is the exact device in our Tier 1 lab. The same research lists Samsung's weaknesses as our wedge (ecosystem lock-in, "imported PDFs can't be edited elsewhere", "no reliable cross-platform backup", rasterised unsearchable PDF export). A switcher path is therefore both the highest-volume migration on Android and a direct hit on the incumbent's worst review theme. Samsung Notes exports **PDF, Word, PowerPoint, image and text**, and stores notes natively as `.sdoc`; the native format is undocumented, so this is deliberately a two-tier import.

#### Scope
**In:** a Samsung Notes importer registered in the import pipeline ([SN-SHR-021](sharing-export.md#sn-shr-021)) with two tiers — **Tier B (must ship):** exported PDF (with per-page ink rasterised by Samsung) and exported DOCX/TXT, imported as PDF-backed pages ([SN-PG-017](pages-canvas.md#sn-pg-017)) or typed text, then OCR'd so the content becomes searchable ([SN-HWR-011](ocr-hwr.md#sn-hwr-011)), which is strictly better than the source (Samsung's export is unsearchable); **Tier A (best-effort):** unpack a `.sdoc` container and recover what is reliably parseable — page images, embedded media, typed text and, if present, stroke data — behind a feature flag, with a truthful per-import report of what was recovered and what was flattened; bulk import of a folder of exports on Android via SAF ([SN-AND-018](storage.md#sn-and-018)); a mapping of Samsung folders/categories onto our folders/subjects ([SN-LIB-011](library.md#sn-lib-011), [SN-LIB-010](library.md#sn-lib-010)).
**Out:** the shared import pipeline, isolation and report UI ([SN-SHR-021](sharing-export.md#sn-shr-021)); malicious-file hardening, which this consumes ([SN-SHR-027](sharing-export.md#sn-shr-027), [SN-SEC-007](security.md#sn-sec-007)); other competitors ([SN-SHR-025](sharing-export.md#sn-shr-025), [SN-SHR-026](sharing-export.md#sn-shr-026)); Nebo/MyScript import (separate issue if demand justifies); exporting *to* Samsung formats.

#### Acceptance criteria
- [ ] A Samsung Notes PDF export imports as a notebook with one PDF-backed page per source page, annotatable with ink on top, and searchable after OCR ([SN-HWR-011](ocr-hwr.md#sn-hwr-011)) — demonstrably better than the source file.
- [ ] A DOCX/TXT export imports as typed text blocks with headings, bullets and checklists preserved where present ([SN-TXT-012](text.md#sn-txt-012), [SN-TXT-013](text.md#sn-txt-013)).
- [ ] Bulk import of ≥ 50 exported files completes with a per-file report (imported / partially imported / skipped + reason) and never leaves a half-written notebook ([SN-SHR-021](sharing-export.md#sn-shr-021)).
- [ ] Tier A `.sdoc` handling, when enabled, either recovers content or fails cleanly to Tier B; it never corrupts the library and never crashes on a malformed container.
- [ ] Every import runs through the hardened reader ([SN-SHR-027](sharing-export.md#sn-shr-027)): zip-bomb, path-traversal, oversized-image and malformed-media cases are rejected with a user-visible reason and a security regression test.
- [ ] A short help-centre page documents exactly how to get files out of Samsung Notes ([SN-DOC-008](docs.md#sn-doc-008)), including its known limits (translated PDFs cannot be saved, orientation must match).

#### Technical notes
`packages/sane_import/` (or wherever [SN-SHR-021](sharing-export.md#sn-shr-021) lands) gains a `SamsungNotesImporter` behind the same interface as the Goodnotes/OneNote importers. PDF path reuses [SN-PDF-006](pdf.md#sn-pdf-006)/[SN-PG-017](pages-canvas.md#sn-pg-017); DOCX path reuses the text import from [SN-SHR-022](sharing-export.md#sn-shr-022) where possible. `.sdoc` is a zip-like container **(verify)** — parse defensively with the bounded unpacker from [SN-SEC-007](security.md#sn-sec-007), treat every entry as hostile, and cap total inflated size and entry count. All parsing happens off the UI isolate.

#### Security & privacy
Competitor files are the classic untrusted-input vector (MASVS-CODE-4, MASVS-PLATFORM-1): zip bombs (CWE-400), path traversal on entry names (CWE-22), malformed images/PDF (CWE-20) and XML entity expansion in DOCX. Controls: reuse [SN-SEC-007](security.md#sn-sec-007) bundle unpacking, [SN-SEC-005](security.md#sn-sec-005) PDF parser hardening, [SN-SEC-006](security.md#sn-sec-006) image decode caps, XML parsed with external entities disabled; the importer runs in the isolated import context with no network access and no credential access; the per-import report never echoes raw file paths into logs ([SN-SEC-021](security.md#sn-sec-021)).

#### UX notes
Entry points: Library → Import, the Android share sheet ([SN-NOTF-005](notifications.md#sn-notf-005)) and open-with. The report screen follows the [SN-SHR-021](sharing-export.md#sn-shr-021) pattern and names Samsung explicitly ("Imported 34 notes from Samsung Notes; 2 pages were flattened to PDF"). The migration story belongs on the website switcher page ([SN-SITE-008](website.md#sn-site-008)).

#### Test plan
Fixture corpus: real Samsung Notes exports (PDF, DOCX, TXT, image) plus synthetic malformed/`.sdoc` fixtures added to the fuzz corpus ([SN-QA-013](qa.md#sn-qa-013)). Unit tests per parser branch; round-trip/fidelity assertions via [SN-SHR-028](sharing-export.md#sn-shr-028); security regression tests per attack class; a manual pass importing a real Galaxy Tab library. Files: `packages/sane_import/lib/src/samsung_notes.dart`, `test/import/samsung_notes_test.dart`, corpus under `test/fixtures/import/samsung/`.

#### Dependencies
[SN-SHR-021](sharing-export.md#sn-shr-021), [SN-SHR-027](sharing-export.md#sn-shr-027), [SN-PDF-006](pdf.md#sn-pdf-006)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-019

<a id="sn-gand-019"></a>

**Expose notebooks and exports through an Android DocumentsProvider**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | android-tablet, android-phone |
| Areas | sharing-export, storage, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-002](sharing-export.md#sn-shr-002), [SN-AND-018](storage.md#sn-and-018), [SN-SEC-020](security.md#sn-sec-020) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-200`, `CWE-863` |
| Extra labels | innovation |

#### Context
`docs/research/sources/android-stylus-capabilities.md` §7 notes that an app can not only *consume* the Storage Access Framework but also **become a provider** by implementing `DocumentsProvider` — and no issue claims it. This is a genuine "competitors lack it on Android" differentiator: Samsung Notes is ecosystem-locked and Nebo hides notes inside its own store, so a student who wants to attach a note to a college portal, an email, or a Word document has to export, find the file, and upload it. With a DocumentsProvider, Sane Notes appears **inside every Android file picker** ("Sane Notes" alongside Drive and Downloads), and any app can browse notebooks and pull a PDF/`.sanenote` rendered on demand. It reinforces the "no lock-in" promise in `docs/research/sources/samsung-notes-nebo-other.md` ("What Sane Notes could beat them on") and rides on the export service that already exists ([SN-SHR-002](sharing-export.md#sn-shr-002), [SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-008](sharing-export.md#sn-shr-008)). It is also a security-sensitive surface, hence p3 and a hard gate on lock/profile rules.

#### Scope
**In:** a read-only `DocumentsProvider` exposing the **active profile's** unlocked notebooks as a virtual tree (subjects/folders → notebooks) with on-demand rendering of a chosen export format (PDF by default, `.sanenote` as an alternative) when another app opens a document; document metadata (name, modified time, size estimate, mime) with no note content in the listing beyond the title; an explicit Settings toggle, **off by default**, to enable the provider; full exclusion of locked notebooks, locked profiles, guest data belonging to another profile, and Trash.
**Out:** write-back/editing from other apps (explicitly out — read-only); the export renderers themselves ([SN-SHR-002](sharing-export.md#sn-shr-002)/[SN-SHR-003](sharing-export.md#sn-shr-003)/[SN-SHR-008](sharing-export.md#sn-shr-008)); consuming SAF for sync ([SN-AND-018](storage.md#sn-and-018), [SN-SYNC-010](sync.md#sn-sync-010)); share links ([SN-SHR-013](sharing-export.md#sn-shr-013)); iOS Files integration ([SN-IPAD-019](sharing-export.md#sn-ipad-019)).

#### Acceptance criteria
- [ ] With the toggle on, "Sane Notes" appears in the system file picker of another app; browsing shows subjects/folders/notebooks matching the library ([SN-LIB-011](library.md#sn-lib-011)).
- [ ] Opening a notebook from another app produces a correctly rendered PDF with vector ink and a searchable text layer ([SN-SHR-003](sharing-export.md#sn-shr-003)), generated on demand off the UI isolate with a progress/cancel-safe path.
- [ ] Locked notebooks, locked profiles and other profiles' data are **never** listed or openable, even when the app itself is unlocked in the foreground ([SN-SEC-020](security.md#sn-sec-020), [SN-AUTH-013](auth.md#sn-auth-013)); an automated test asserts this per state.
- [ ] With the toggle off (default) the provider returns an empty root and no metadata whatsoever.
- [ ] The provider is not writable: any create/delete/rename call is rejected; no path from another app can mutate the library.
- [ ] Access is per-call authorised against the current lock state; a device that locks mid-read fails the read rather than completing it.

#### Technical notes
Kotlin `DocumentsProvider` in `app/android` declared with the SAF provider permission and `exported=true` (required by the framework) but guarded by the toggle, lock state and profile scope on every `queryRoots`/`queryChildDocuments`/`openDocument` call — the framework's exported-ness is exactly why [SN-AND-029](security.md#sn-and-029) must review this component. Rendering calls back into the Dart export service through a platform channel into a background engine, writing to a temporary, profile-scoped file that is deleted after the pipe closes. Document ids must be opaque, non-enumerable handles — never raw database ids or paths (CWE-863).

#### Security & privacy
This intentionally opens a read path from other apps to note content, so it is fail-closed by construction: default off, read-only, unlocked-active-profile-only, opaque ids, no listing of locked or trashed content, and no note body in metadata (MASVS-PLATFORM-1, MASVS-PRIVACY-1, CWE-200). Temporary rendered files live in app-private storage with restrictive permissions and are deleted deterministically; they are excluded from backup ([SN-AND-030](security.md#sn-and-030)). The threat model ([SN-SEC-002](security.md#sn-sec-002)) must be updated with this surface, and it is an explicit target for the pentest plan ([SN-SEC-033](security.md#sn-sec-033)) and the MASVS platform verification ([SN-SEC-030](security.md#sn-sec-030)).

#### UX notes
Settings → Privacy & export ([SN-SET-012](settings.md#sn-set-012)) gains a clearly worded toggle: "Let other apps browse your notes (read-only). Locked notebooks are never shown." A first-enable sheet explains the trade-off honestly. No badge, no nudge to turn it on.

#### Test plan
Instrumented tests driving the provider through `ContentResolver` in each state: toggle off, toggle on + unlocked, app-locked, notebook-locked, other profile, trashed notebook — asserting empty/denied results. A render test asserting the opened PDF matches the export golden ([SN-SHR-028](sharing-export.md#sn-shr-028)). A security regression test that a crafted document id cannot traverse to another profile. Manual: open a note from Gmail and from a college-portal upload flow. Files: `app/android/.../SaneDocumentsProvider.kt`, `app/test/sharing/documents_provider_access_test.dart`.

#### Dependencies
[SN-SHR-002](sharing-export.md#sn-shr-002), [SN-AND-018](storage.md#sn-and-018), [SN-SEC-020](security.md#sn-sec-020)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-010

<a id="sn-gcmp-010"></a>

**Implement web clipper / read-it-later capture**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | Backlog |
| Platforms | web, ios-phone, android-phone, ipad, android-tablet |
| Areas | sharing-export, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-NOTF-005](notifications.md#sn-notf-005), [SN-SHR-023](sharing-export.md#sn-shr-023), [SN-SEC-011](security.md#sn-sec-011) |
| Security controls | — |
| Extra labels | needs-decision |

#### Context
OneNote's Web Clipper is a signature capture path: send an article or a selection from the browser straight into a notebook (docs/research/competitor-feature-matrix.md section 10 notes; PRD-LB-390 from the 2026-09-13 pass). No tracker issue implements web-to-note capture. For the students-and-researchers persona, capturing readings alongside handwritten notes is a common workflow the incumbents own.

#### Scope
**In:** an OS share-target/PWA share-target intake that accepts a URL or shared web selection and creates a note with a readable, sanitised capture (title, cleaned text, key images) plus the source URL; a confirm-and-place step; append-to-existing or new-note options.
**Out:** a browser extension (out of scope for the app repo; note as a possible ecosystem follow-up); real-time collaboration; server-side rendering of pages (keep capture client-side to preserve the zero-server posture).

#### Acceptance criteria
- [ ] Sharing a URL or selection to Sane Notes (share sheet / PWA share target) opens a confirm-and-place screen and creates a note on confirm.
- [ ] Captured HTML is sanitised (DOMPurify/Trusted Types) before render/storage; scripts and remote-loading are stripped.
- [ ] The source URL is stored and shown; captured images are downscaled and EXIF-stripped through the image pipeline.
- [ ] Capture works offline by queuing when the network is unavailable and completing when back online.
- [ ] The clipped note lands in the chosen profile/notebook and respects multi-profile isolation.

#### Technical notes
Route through the share-target intake queue ([SN-NOTF-005](notifications.md#sn-notf-005)) and the import isolation pipeline ([SN-SHR-021](sharing-export.md#sn-shr-021)); reuse image import + OCR ([SN-SHR-023](sharing-export.md#sn-shr-023)) and the URL allow-list/SSRF guard ([SN-SEC-013](security.md#sn-sec-013), [SN-SEC-011](security.md#sn-sec-011)). Readability extraction runs on-device. Sanitisation must reuse the web CSP/Trusted Types work ([SN-SEC-016](security.md#sn-sec-016)). Reference PRD-LB-390. Needs a product decision on capture fidelity scope (full-article vs selection-only) before build.

#### Security & privacy
Untrusted HTML is a primary attack surface: strip scripts, block remote fetches during render, sanitise before persist. Guard outbound fetches against SSRF/redirect ([SN-SEC-013](security.md#sn-sec-013)). No content leaves the device. Maps to OWASP-A03/A10, MASVS-CODE.

#### UX notes
Confirm-and-place sheet with a capture preview; clear source-URL chip; honest 'captured on-device' note. Errors on unreachable URLs are explained.

#### Test plan
Unit: sanitisation + readability extraction (test/sharing/web_clipper_test.dart). Security: XSS/script-strip corpus; SSRF guard. Integration: share-target intake, offline queue, profile isolation.

#### Dependencies
[SN-NOTF-005](notifications.md#sn-notf-005), [SN-SHR-023](sharing-export.md#sn-shr-023), [SN-SEC-011](security.md#sn-sec-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-011

<a id="sn-gcmp-011"></a>

**Support email-to-import for PDFs (ingest by email)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | Backlog |
| Platforms | all |
| Areas | sharing-export |
| Size | M |
| SDLC | design |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-021](sharing-export.md#sn-shr-021), [SN-PDF-023](pdf.md#sn-pdf-023) |
| Security controls | — |
| Extra labels | needs-decision, needs-credentials |

#### Context
Goodnotes' 'email-to-app' lets users mail a PDF to a personal address and have it appear in their library - a low-friction capture path favoured by people who receive documents by email (docs/research/competitor-feature-matrix.md section 9 'Import PDF' notes; PRD-LB-391 from the 2026-09-13 pass, marked verify-infra). No tracker issue covers it. It is called out precisely because it is one of the few features that needs infrastructure beyond the zero-server model, so it must be scoped and decided deliberately.

#### Scope
**In:** a design + spike + implementation of an opt-in email-ingest that maps a per-user forwarding address to a pending-imports inbox the app polls or is notified about; the PDF flows through the existing hardened import path and a confirm-and-place step; user can enable/disable and rotate the address.
**Out:** email-to-note for arbitrary content (start with PDF only); any storage of note content on our servers beyond the transient, encrypted hand-off; this is explicitly not part of the zero-server personal-sync path.

#### Acceptance criteria
- [ ] A user can enable email import, receive a unique forwarding address, and disable/rotate it.
- [ ] A PDF emailed to that address becomes a pending import surfaced in-app with a confirm-and-place step.
- [ ] The PDF passes the hardened import validation gate before it is added (caps, off-isolate, JS disabled).
- [ ] The transient relay stores only the encrypted attachment for a bounded TTL and never note content; deletion after import is verified.
- [ ] Feature is off by default and clearly explained as the one path that uses a minimal server component.

#### Technical notes
Requires a spike (inbound-email provider vs minimal relay), an ADR documenting the deviation from zero-server, and maintainer-supplied credentials/domain. Ingest joins the import pipeline ([SN-SHR-021](sharing-export.md#sn-shr-021)) and PDF hardening ([SN-PDF-023](pdf.md#sn-pdf-023)). Keep the relay ciphertext-only and TTL-bounded, mirroring the collaboration relay invariant ([SN-COL-008](collaboration.md#sn-col-008)). Reference PRD-LB-391 and docs/architecture zero-server notes.

#### Security & privacy
Inbound email is spoofable and a spam/abuse vector: authenticate the mapping, rate-limit, virus/format-scan, and never execute content. Store only ciphertext for a bounded TTL. DPIA update required (deviation from local-only). Maps to OWASP-A04/A08, MASVS-NETWORK.

#### UX notes
Settings toggle with plain-language disclosure of the server hop; pending-imports list with confirm/discard; address rotation control.

#### Test plan
Spike write-up + ADR. Unit: address mapping, TTL purge. Security: format/AV gate, abuse rate-limit, ciphertext-only relay assertion. Integration: email -> pending -> confirm -> import round-trip in a fake relay.

#### Dependencies
[SN-SHR-021](sharing-export.md#sn-shr-021), [SN-PDF-023](pdf.md#sn-pdf-023).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-016

<a id="sn-gcmp-016"></a>

**Publish a note as a public read-only web page**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | sharing-export, website |
| Size | L |
| SDLC | design |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-013](sharing-export.md#sn-shr-013), [SN-SHR-003](sharing-export.md#sn-shr-003), [SN-COL-008](collaboration.md#sn-col-008) |
| Security controls | — |
| Extra labels | needs-decision |

#### Context
Notability publishes notes to a public Gallery and Notion publishes pages as Sites; publishing a note as a read-only web page is a documented 'later' target (docs/research/competitor-feature-matrix.md section 16, 'Publish note as web page'; PRD-CO-040 from the 2026-09-13 pass). No tracker issue covers it. It is a strong sharing-with-non-users path but sits in tension with the zero-server model, so it needs an explicit, opt-in, minimal-hosting design.

#### Scope
**In:** a design + spike + implementation to publish a chosen note/page range as a static, read-only web page at a shareable URL; render from a high-fidelity export (vector ink + selectable text); unpublish/expire controls; a clear per-publish consent that this content leaves the device to a public host.
**Out:** editable/collaborative public pages (that is collaboration [SN-COL-001](collaboration.md#sn-col-001)); publishing whole notebooks/sites; community rooms; capability share links to app users (that is [SN-SHR-013](sharing-export.md#sn-shr-013)).

#### Acceptance criteria
- [ ] Publishing a note produces a static read-only page at a shareable URL with vector ink and selectable text.
- [ ] Publishing requires explicit per-note consent stating the content becomes public and leaves the device.
- [ ] Unpublish removes the page promptly; optional expiry auto-removes it.
- [ ] Locked notebooks cannot be published; personal metadata is stripped from the published artefact.
- [ ] The published surface is WCAG 2.2 AA and carries no third-party trackers ([SN-SITE-014](website.md#sn-site-014), [SN-SITE-015](website.md#sn-site-015)).

#### Technical notes
Needs an ADR on the publishing host (reuse the website content origin [SN-SITE-013](website.md#sn-site-013)) and a decision on whether pages are user-published static artefacts vs relayed. Render from the PDF/SVG/HTML export path ([SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-005](sharing-export.md#sn-shr-005)). Keep any relay ciphertext-agnostic and note-store-free in spirit ([SN-COL-008](collaboration.md#sn-col-008)); a published page is deliberately plaintext-public by user choice, unlike personal sync. Reference PRD-CO-040.

#### Security & privacy
Explicit opt-in; strip EXIF/author metadata; no locked content; hardened headers on the publish origin ([SN-SITE-010](website.md#sn-site-010), [SN-SITE-013](website.md#sn-site-013)); abuse/report + takedown path. Maps to OWASP-A01/A05, MASVS-PRIVACY. DPIA update required.

#### UX notes
Publish sheet with a stark public-content warning; manage-published-pages list; copy-link and unpublish; source attribution optional.

#### Test plan
Spike + ADR. Unit: metadata stripping, lock exclusion. Security: header/CSP checks on published origin; takedown flow. Integration: publish -> fetch -> unpublish -> 404; expiry.

#### Dependencies
[SN-SHR-013](sharing-export.md#sn-shr-013), [SN-SHR-003](sharing-export.md#sn-shr-003), [SN-COL-008](collaboration.md#sn-col-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GCMP-017

<a id="sn-gcmp-017"></a>

**Export to Word (.docx) and PowerPoint (.pptx)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | Backlog |
| Platforms | all |
| Areas | sharing-export, text |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-006](sharing-export.md#sn-shr-006), [SN-SHR-003](sharing-export.md#sn-shr-003) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
OneNote, Samsung Notes, Nebo and LiquidText all export to Office formats; .docx/.pptx export is a documented 'later' target (docs/research/competitor-feature-matrix.md section 16, 'Export Word/DOCX'; PRD-CO-041 from the 2026-09-13 pass). The tracker exports PDF/PNG/SVG/Markdown/JSON/.sanenote and *imports* OneNote .docx, but has no Office *export*. For users handing work to teachers/colleagues on Office, this closes an interoperability gap.

#### Scope
**In:** export typed text, headings, lists, tables and OCR transcripts to a valid .docx (OOXML) with embedded ink/figures as images; export a page-range or slide-structured note to .pptx with one page per slide (ink/figures rasterised or embedded); preserve reading order and alt-text for accessibility.
**Out:** round-trip re-import of Office edits; live editability of ink inside Office; DOCX import (already handled under OneNote import [SN-SHR-026](sharing-export.md#sn-shr-026)).

#### Acceptance criteria
- [ ] A note exports to a valid .docx that opens cleanly in Word/LibreOffice with headings, lists, tables and images intact.
- [ ] A page-range exports to a valid .pptx with one page per slide and correct ordering.
- [ ] Handwriting/figures embed as images with OCR text preserved as accessible alt-text ([SN-SHR-012](sharing-export.md#sn-shr-012)).
- [ ] Export runs on-device through the streaming export service with progress/cancel ([SN-SHR-002](sharing-export.md#sn-shr-002)).
- [ ] Output is deterministic and covered by fidelity round-trip checks ([SN-SHR-028](sharing-export.md#sn-shr-028)).

#### Technical notes
Generate OOXML with a pure-Dart writer (no native Office dependency); reuse the Markdown exporter's document tree ([SN-SHR-006](sharing-export.md#sn-shr-006)) as the structural source and the PDF/vector renderer ([SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-005](sharing-export.md#sn-shr-005)) to rasterise ink/figures. Route through the export service ([SN-SHR-002](sharing-export.md#sn-shr-002)) and share sheet ([SN-SHR-010](sharing-export.md#sn-shr-010)). Reference PRD-CO-041. Keep the OOXML writer dependency vetted and hardened.

#### Security & privacy
OOXML generation only (no macros); sanitise embedded metadata; strip author/EXIF. Respect locked-content export rules ([SN-GCMP-002](security.md#sn-gcmp-002)). Baseline otherwise.

#### UX notes
Add .docx/.pptx to the export format list with a 'best for Office' hint and an honest note that ink becomes images.

#### Test plan
Unit: OOXML structure validity (test/sharing/office_export_test.dart). Integration: open exported files in a validator; fidelity round-trip ([SN-SHR-028](sharing-export.md#sn-shr-028)); alt-text preserved. Golden: representative note -> docx/pptx structure snapshot.

#### Dependencies
[SN-SHR-006](sharing-export.md#sn-shr-006), [SN-SHR-003](sharing-export.md#sn-shr-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GWEB-014

<a id="sn-gweb-014"></a>

**Build the no-install web reader route for capability share links**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | web |
| Areas | sharing-export, security, onboarding |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-SHR-013](sharing-export.md#sn-shr-013), [SN-COL-009](collaboration.md#sn-col-009), [SN-GWEB-006](perf.md#sn-gweb-006) |
| Security controls | `OWASP-A01`, `CWE-200`, `MASVS-CRYPTO-1`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context

A capability share link (`sane.app/n/<slug>-<shortid>#k=…`, [SN-SHR-013](sharing-export.md#sn-shr-013)) is the product's zero-knowledge sharing wedge, and most recipients will open it on a device with **no Sane Notes installed** — a classmate's laptop, a phone, a lab machine. Several issues assume that landing exists and point at the web surface for it: [SN-NOTF-004](notifications.md#sn-notf-004) lists "the web reader for non-installed users ([SN-WEB-001](compat.md#sn-web-001))" as out of scope, [SN-NOTF-006](notifications.md#sn-notf-006) says "an unregistered browser degrades to the web reader with no error", and [SN-WEB-022](onboarding.md#sn-web-022) explicitly excludes "the share-link reader (`PRD-CO-416`)". [SN-COL-009](collaboration.md#sn-col-009) owns joining a **live collaboration room** from a link on all five surfaces; it does not own the plain read-only viewing case, and nothing in the web epic implements the route. So the most-followed inbound link in the product currently lands nowhere. This issue builds it: a small, fast, read-only reader that decrypts in the browser, works without an account, and never mutates anything.

#### Scope

**In:** the `/n/<slug>-<shortid>` route in the web app: fragment key extraction and immediate `replaceState` scrubbing ([SN-COL-009](collaboration.md#sn-col-009) rule, [SN-GWEB-004](compat.md#sn-gweb-004)); client-side unwrap and decrypt of the shared content key ([SN-CRY-018](security.md#sn-cry-018)); a **read-only** renderer (pages, ink, text, images, PDF pages) with page navigation, zoom, search-within and read-aloud/alt-text support, but no editing tools, no palette dock and no sync writes; role handling so a "Can comment"/"Can edit" link offers sign-in to unlock those, while "Can view" never does; graceful states for expired, revoked, not-found, wrong-key and too-large documents; "Open in the app" / "Get Sane Notes" affordances that do not nag; an "import a copy" path that requires an explicit action and an account or guest workspace; and a code-split bundle so the reader loads without the editor ([SN-GWEB-006](perf.md#sn-gweb-006)).

**Out:** the link model, roles and revocation ([SN-SHR-013](sharing-export.md#sn-shr-013), [SN-SHR-015](sharing-export.md#sn-shr-015), [SN-SHR-017](sharing-export.md#sn-shr-017)), live-room joining and presence ([SN-COL-009](collaboration.md#sn-col-009), [SN-COL-010](collaboration.md#sn-col-010)), the comment model ([SN-COL-014](collaboration.md#sn-col-014)), the guest trial flow ([SN-WEB-022](onboarding.md#sn-web-022)), and native link landings ([SN-IPAD-020](security.md#sn-ipad-020)).

#### Acceptance criteria

- [ ] Opening a valid link in a clean browser profile with no account renders the shared content read-only; time to first rendered page on a cached CDN is within the B6 budget and the editor chunk is **never** downloaded ([SN-GWEB-006](perf.md#sn-gweb-006)).
- [ ] The `#k=…` fragment is consumed in memory, scrubbed from the address bar with `replaceState` before any further navigation, and never appears in a request, a log, a history entry, a referrer or the restore record (TM-I-09, verified by capture).
- [ ] Decryption happens entirely client-side; a network capture shows only ciphertext fetches from the user's cloud/relay path and no key material anywhere ([SN-CRY-018](security.md#sn-cry-018)).
- [ ] The reader cannot mutate: an automated test asserts no op is generated, no sync write is attempted, and no notebook is created, for every interaction available in the reader (OWASP-A01).
- [ ] Expired, revoked, not-found, tampered-slug and wrong-key links each land on a distinct, honest, non-leaking state — the failure message never reveals whether the notebook exists ([SN-SHR-018](sharing-export.md#sn-shr-018), CWE-203).
- [ ] "Import a copy" requires an explicit user action and lands the content in a **new isolated notebook** in guest or signed-in state, never overwriting anything ([SN-SHR-021](sharing-export.md#sn-shr-021)).
- [ ] The reader is keyboard operable and screen-reader readable, with OCR alt-text for ink where present ([SN-WEB-020](a11y.md#sn-web-020), [SN-WEB-021](a11y.md#sn-web-021)), and passes axe-core in CI ([SN-A11Y-016](a11y.md#sn-a11y-016)).
- [ ] On a link whose role is "Can edit", signing in upgrades in place without re-opening the link or re-entering the key.

#### Technical notes

Reuse the single allow-list router and fragment parser from [SN-SHR-013](sharing-export.md#sn-shr-013) — do not write a second parser (checklist §1.1). Build the reader as its own deferred route bundle sharing `sane_ui`, `sane_core` read paths and the render pipeline, but excluding the editor state machine ([SN-ED-002](editor.md#sn-ed-002)), brush engine and tool dock. Content fetch follows the same cloud-drive read path as sync ([SN-WEB-019](sync.md#sn-web-019)) in read-only mode. Large documents stream page-by-page with the PDF/tile paths already built ([SN-WEB-028](pdf.md#sn-web-028), [SN-INK-022](ink.md#sn-ink-022)). Implements `PRD-CO-416` and `PRD-CO-032`/`PRD-CO-276`.

#### Security & privacy

Threats and controls: **capability leakage** — the key lives only in the fragment, is scrubbed immediately, is zeroed after use and is never persisted (TM-I-09, CWE-200, CWE-598, MASVS-CRYPTO-2); **broken access control** — the reader is structurally read-only and every route lands in a view state with no auto-mutation (OWASP-A01, `PRD-CO-000`); **revocation must bite** — a revoked or rotated key fails to decrypt and the reader says so plainly ([SN-SHR-017](sharing-export.md#sn-shr-017)); **oracle leakage** — indistinguishable error states for not-found vs unauthorised (CWE-203); **hostile content** — shared documents are untrusted input and go through the same validation gate and resource caps as import ([SN-SEC-004](security.md#sn-sec-004), [SN-SEC-005](security.md#sn-sec-005), CWE-20, CWE-400); **shared-computer residue** — the reader stores nothing durable by default and offers "clear this session" on a public machine (CWE-359, [SN-GWEB-015](storage.md#sn-gweb-015)). No identifier, no analytics, no third-party request (`PRD-PRIV-007`).

#### UX notes

Per `docs/design/screens-and-flows.md` share/reader section: a calm read-only chrome (title, owner display name if the link carries one, page navigation, zoom, search), a single unobtrusive "Open in app / Get Sane Notes" affordance, and a clearly separated "Save a copy". Empty/error states are honest and never blame the recipient. Mobile-width layout follows the phone rules ([SN-PHN-001](compat.md#sn-phn-001) narrow-web adaptation, [SN-LIB-024](library.md#sn-lib-024)). Read-aloud and alt-text are available from the reader so a recipient using a screen reader gets the content, not a blank canvas.

#### Test plan

- `app/test/sharing/web_reader_readonly_test.dart` — no op generated for any reader interaction; role gating.
- `app/test/security/reader_fragment_test.dart` — fragment scrub, no leakage into history/logs/restore record; error-state indistinguishability.
- `app/integration_test/web/share_link_reader_test.dart` — Playwright cold profile: open link, render, keyboard pass, import-a-copy, expired/revoked cases.
- `app/integration_test/web/reader_bundle_test.dart` — editor chunk not requested.
- Manual: Safari iPadOS and Android Chrome reader pass in the Tier 2 matrix ([SN-WEB-023](qa.md#sn-web-023)).

#### Dependencies

[SN-SHR-013](sharing-export.md#sn-shr-013) (link model + parser), [SN-CRY-018](security.md#sn-cry-018) (key unwrap), [SN-GWEB-006](perf.md#sn-gweb-006) (code splitting), [SN-WEB-019](sync.md#sn-web-019) (read-only content fetch). Coordinates with [SN-COL-009](collaboration.md#sn-col-009) (live-room joining) and [SN-WEB-022](onboarding.md#sn-web-022) (guest trial).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-IPAD-019

<a id="sn-ipad-019"></a>

**Integrate Files app document browsing and open-in-place for .sanenote**

| Field | Value |
|---|---|
| GitHub | #320 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | sharing-export, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-STORAGE-2`, `CWE-22`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
iPad users expect to browse, open and manage their documents in the Files app. Sane Notes should register the `.sanenote` bundle as a document type and support coordinated open-in-place with autosave and conflict handling via `UIDocument`/`NSFileCoordinator`/`NSFilePresenter` (docs/platform/ipad.md §3/§6). Imports of file content are untrusted and MUST be hardened (CLAUDE.md §7.8).

#### Scope
**In:** declare the `.sanenote` UTI/document type and register with the Files app / Document Browser; open-in-place with coordinated read/write and autosave; conflict detection via `NSFileVersion`; import a `.sanenote` into a new isolated notebook with resource caps and path confinement.
**Out:** iCloud Drive sync internals ([SN-SYNC-003](sync.md#sn-sync-003)); the file-format writer/reader itself ([SN-CORE-005](storage.md#sn-core-005)); competitor-format import (SN-SHR area).

#### Acceptance criteria
- [ ] A `.sanenote` file opens from the Files app into Sane Notes; edits autosave with coordinated writes; conflicts surface via `NSFileVersion`.
- [ ] A malformed/hostile `.sanenote` fails CLOSED into a user-safe error, parsed off the UI isolate, resource-capped (no zip/decompression bomb), path-confined (no traversal), imported into a NEW isolated notebook (docs/security/secure-coding-checklist.md §1).
- [ ] Opening does not auto-mutate existing notebooks; import is explicit.
- [ ] Files-app metadata (name/dates) uses required-reason-API-compliant access (see [SN-IPAD-021](privacy.md#sn-ipad-021)).

#### Technical notes
`UIDocument` + `NSFileCoordinator`/`NSFilePresenter` in `sane_cloud_drive`/app; `.sanenote` reader/writer from [SN-CORE-005](storage.md#sn-core-005); parse off the UI isolate on a one-shot `Isolate.run` (CLAUDE.md §8). Reference docs/platform/ipad.md §3 (Local docs + autosave). Canonicalise/confine every path from file content.

#### Security & privacy
Untrusted input: validate type/MIME/size/schema before use; cap resources before decode (CWE-400); canonicalise and confine paths from bundle content (CWE-22); import into a new isolated notebook (MASVS-STORAGE-2, MASVS-PLATFORM-1). Fail closed. No content/tokens logged; parser fuzz corpus added.

#### UX notes
Files browsing/open/import flows per docs/design/screens-and-flows.md; import-confirm and error states in all 17 looks + light/dark. Accessible labels on the import sheet; 44 pt targets; the not-found/corrupt state uses the standard error pattern.

#### Test plan
Unit/abuse: `packages/sane_core/test/sanenote_import_fuzz_test.dart` (malformed/bomb/traversal fail closed, new-notebook isolation). Integration: `app/integration_test/files_open_in_place_test.dart` via `patrol` (open from Files, edit, conflict).

#### Dependencies
[SN-CORE-005](storage.md#sn-core-005) .sanenote file-format writer/reader.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; threat model updated for the Files import boundary; CODEOWNERS review

---

### SN-IPAD-030

<a id="sn-ipad-030"></a>

**Support inter-app drag and drop of pages, images and text in Split View**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | sharing-export, images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-010](compat.md#sn-ipad-010), [SN-MED-001](images-media.md#sn-med-001), [SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-004](sharing-export.md#sn-shr-004) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-STORAGE-2`, `MASVS-PRIVACY-2`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Split View and Stage Manager only pay off if content moves between the two apps on screen, and on iPadOS the expected mechanism is system drag and drop. docs/platform/ipad.md §7 requires Sane Notes to coexist with Split View/Slide Over/Stage Manager and §9 lists iPad multitasking as an App Store expectation, but **the docs are silent on drag and drop specifically** — this issue therefore makes the sensible decision to implement it as the natural completion of multitasking ([SN-IPAD-010](compat.md#sn-ipad-010)), and records that choice here per the "if a doc is silent, decide sensibly and say so" rule. The cross-platform clipboard/drag-in path for images belongs to the media area ([SN-MED-001](images-media.md#sn-med-001)); what is iPad-specific is the *drag source* (dragging a page or selection out into Safari/Mail/Files) and drop targeting that lands content at the exact canvas point under the finger.

#### Scope
**In:** a drag **source** on the editor and page rail — long-press a selection or a page thumbnail to drag it out, vending an `NSItemProvider` with PNG + PDF (and plain text when the selection is typed text) representations; a drag **destination** on the canvas accepting image, PDF and text drops at the drop location, including drops from a second app in Split View; drag-and-drop of a notebook from the library to Files; visual drop-target feedback.
**Out:** the export renderers themselves ([SN-SHR-001](sharing-export.md#sn-shr-001) owns PDF/PNG export); clipboard paste and cross-platform image insert ([SN-MED-001](images-media.md#sn-med-001)); Files open-in-place ([SN-IPAD-019](sharing-export.md#sn-ipad-019)); Android/web equivalents.

#### Acceptance criteria
- [ ] Dragging a lasso selection out of the editor into another app in Split View produces a correct PNG (transparent background) and, where the receiver prefers it, a PDF; the source note is unchanged.
- [ ] Dragging a page thumbnail from the page rail into Files writes a PDF of that page; dragging a notebook from the library writes a `.sanenote` bundle.
- [ ] Dropping an image or PDF onto the canvas inserts it **at the drop point** (not the page origin) at a sensible default size, as an undoable single edit.
- [ ] Dropping plain text inserts a text object at the drop point; dropping an unsupported type is rejected with a clear, non-blocking message.
- [ ] Dropped payloads are validated before decode: type/UTI and size are checked, oversized items are rejected with a user-safe error, decoding happens **off the UI isolate**, and a malformed payload fails closed without corrupting the page.
- [ ] Dragging never starts from a locked notebook/page, and a drag in progress does not interrupt or corrupt an in-flight stroke (the wet stroke is committed or cancelled cleanly).
- [ ] Drop-target highlight is visible in all 17 looks plus light/dark, and the whole interaction has a non-drag alternative (Insert menu / Export sheet) per WCAG 2.5.7.

#### Technical notes
Native `UIDragInteraction`/`UIDropInteraction` on the Flutter view hosted in `app/` (Flutter's own drag APIs do not cover cross-app item providers on iPadOS); bridge item providers with Pigeon per [ADR-0012](docs/adr/0012-native-plugin-strategy.md). Render drag previews through the specific M2 export renderers ([SN-SHR-003](sharing-export.md#sn-shr-003) PDF, [SN-SHR-004](sharing-export.md#sn-shr-004) PNG) rather than a second renderer or the SN-SHR-001 epic; image/PDF decode reuses the media/PDF pipelines ([SN-MED-001](images-media.md#sn-med-001), [ADR-0014](docs/adr/0014-pdf-engine.md)) on a one-shot `Isolate.run` so the draw loop never blocks (CLAUDE.md §8). Insertions go through the normal CRDT edit path in `sane_core` so they are undoable and sync cleanly ([ADR-0005](docs/adr/0005-document-model-and-crdt.md)). Coordinate mapping must account for the current zoom/pan transform.

#### Security & privacy
A drop payload is attacker-controlled data from another app — the full untrusted-input rule applies: validate UTI/type, cap size **before** decode to stop decompression bombs (CWE-400), parse off the UI isolate, confine and canonicalise any path or filename from the payload (CWE-22 family, MASVS-STORAGE-2), and fail closed (CLAUDE.md §7.8, MASVS-PLATFORM-1, CWE-20). Strip EXIF/GPS from dropped images before storage as the media pipeline already does (MASVS-PRIVACY-2, PRD-LB-180). Dragging **out** is an intentional egress of note content: it is user-initiated and local (no network), must be blocked for locked content, and must never include hidden metadata such as file paths, profile ids or tokens in the vended item. Nothing about the payload is logged.

#### UX notes
Follow the editor and page-rail surfaces in design/Sane Notes.dc.html and docs/design/screens-and-flows.md §7/§8: the drag preview is the rendered selection at reduced opacity with a token-styled shadow; the canvas shows a token-coloured drop-target outline and an insertion caret for text; rejected drops show the standard inline error. Cover all 17 looks and light/dark with goldens for the drop-target state. Provide the non-drag equivalents (Insert → Image/PDF, Export → Share sheet) so the feature is never the only path (WCAG 2.5.1/2.5.7), keep targets ≥ 44 pt, and announce drop results to VoiceOver.

#### Test plan
Unit/abuse: `app/test/platform/drop_payload_validation_test.dart` (oversized, wrong UTI, decompression bomb, traversal-y filename ⇒ fail closed, off-isolate decode). Widget: `app/test/editor/drop_insert_position_test.dart` (insert at drop point under zoom/pan; single undoable edit). Golden: `app/test/golden/drop_target_looks_test.dart` (17 looks x light/dark). Integration: `app/integration_test/split_view_drag_drop_test.dart` via `patrol` on an iPad (drag out to Files, drop an image from Photos in Split View, locked notebook refuses to drag).

#### Dependencies
[SN-IPAD-010](compat.md#sn-ipad-010) multitasking layout adaptation; [SN-MED-001](images-media.md#sn-med-001) images & media pipeline; [SN-SHR-003](sharing-export.md#sn-shr-003) (PDF export renderer) and [SN-SHR-004](sharing-export.md#sn-shr-004) (PNG export renderer) for the drag previews' PDF/PNG representations (both M2) — the specific children replacing the epic-level dependency on SN-SHR-001.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-SHR-001

<a id="sn-shr-001"></a>

**Build sharing, export & import (exporters, capability share links, competitor import)**

| Field | Value |
|---|---|
| GitHub | #28 |
| Type | epic |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, security, storage |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-1`, `MASVS-NETWORK-1`, `MASVS-PLATFORM-1`, `MASVS-PRIVACY-2`, `ASVS-V4`, `OWASP-A01`, `OWASP-A02`, `OWASP-A08`, `CWE-22`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
Sane Notes promises "open, round-trippable data" and zero lock-in: everything a user creates MUST be exportable in open formats and importable from the tools they are leaving, all on-device (PRD-CO-003, PRD-CO-004; docs/product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md §1-§2). This epic owns three things: (1) the **exporters** — PDF (ink vector + searchable OCR layer), PNG, SVG, Markdown, JSON, and the canonical open **.sanenote** bundle (docs/architecture/file-format.md §9), plus share-sheet and system print; (2) **capability share links** — a notebook id + a wrapped content key carried only in the URL fragment, with roles (Owner/Can edit/Can comment/Can view), link on/off, expiry, and **cryptographic** (not cosmetic) revocation (PRD-CO-030..039; docs/architecture/file-format.md §6.2); and (3) **import** from PDF, images, Markdown, Goodnotes, Notability, OneNote and Notion, with a per-import report and hostile-input hardening (PRD-CO-070..079; docs/security/secure-coding-checklist.md §1). Export/import foundations begin in **M2 Library & Documents**; share links, competitor import and fidelity tests land in **M6** (docs/roadmap.md M6). The Share overlay is already designed (docs/design/screens-and-flows.md §10). Real-time collaboration transport is a sibling epic ([SN-COL-001](collaboration.md#sn-col-001)); crypto primitives come from [SN-CRY-001](security.md#sn-cry-001).

#### Scope
**In:** the on-device export service (streaming, cancellable, scoped to page/range/notebook); PDF/PNG/SVG/Markdown/JSON/.sanenote writers; "Export everything" ZIP; OS share sheet + system print; the capability-link model (mint + resolve, fragment key); Share overlay UI; roles + cryptographic enforcement; invite/people management + Free 3-person gate; expiry; link-activity + scoped single-page share; the default-posture build-time flag; the import pipeline + report; Markdown/image/Notion/Goodnotes/Notability/OneNote importers; import hardening; export/import round-trip fidelity tests.
**Out:** the CRDT/key primitives ([SN-CRY-001](security.md#sn-cry-001), [SN-CRY-002](security.md#sn-cry-002)); sync transport ([SN-SYNC-001](sync.md#sn-sync-001)); real-time collaboration, comments, presence ([SN-COL-001](collaboration.md#sn-col-001)); PDF render/annotate engine internals ([SN-PDF-001](pdf.md#sn-pdf-001)); OS widgets/share-target *registration* deep-dive ([SN-NOTF-001](notifications.md#sn-notf-001)); on-device OCR/recognition engines ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)).

#### Acceptance criteria
- [ ] Every child below is delivered with its named test files and its PRD-CO / MASVS / TM IDs.
- [ ] M6 exit gates hold (docs/roadmap.md M6): share links land in a view/confirm context and never auto-mutate; the share-key stays in the URL fragment; the default share posture follows the resolved maintainer flag ([SN-SHR-020](sharing-export.md#sn-shr-020)); import of a hostile competitor file fails closed ([SN-SHR-027](sharing-export.md#sn-shr-027)).
- [ ] "Export everything" works on **Free** and offline; no export is ever plan-gated (PRD-CO-003/004/016).
- [ ] A network capture during any default (non-opt-in) export/import shows no plaintext note content leaving the device (PRD-CO-000).
- [ ] Revocation is cryptographic: removing a member / turning off a link rotates the content key ([SN-SHR-017](sharing-export.md#sn-shr-017)).

#### Technical notes
Export orchestration lives in `app/` (composition root, Riverpod) driving format writers in the packages that own each surface: PDF in `packages/sane_pdf`, PNG/SVG raster+vector in `packages/sane_render`, Markdown/JSON/.sanenote in `packages/sane_core` (respecting the package DAG, CLAUDE.md §3). Import parsing runs off the UI isolate (`Isolate.run`) into a new isolated notebook. Capability links reuse the envelope key hierarchy ([SN-CRY-002](security.md#sn-cry-002)) and the manifest field-level encryption of docs/architecture/file-format.md §6.2. Implements docs/adr/0004-local-first-zero-server.md and docs/adr/0007-end-to-end-encryption-and-keys.md; share transport aligns with docs/adr/0013-collaboration-transport.md.

#### Security & privacy
This epic is where note content deliberately leaves the app (export) and where recipients gain cryptographic access (share). Threats: TM-I-01 (cloud/relay sees only ciphertext), TM-S-04 (share-link forgery), TM-I-09 (referrer leaking the fragment), TM-D-01 (zip/decompression bombs on import), TM-T-06 (path traversal on import/export), TM-E-04 (parser memory safety). Controls: MASVS-STORAGE-1, MASVS-CRYPTO-1, MASVS-NETWORK-1, MASVS-PLATFORM-1, MASVS-PRIVACY-2, ASVS-V4, OWASP-A01/A02/A08, CWE-22/200 (docs/security/secure-coding-checklist.md §1, §3, §5).

#### UX notes
Anchored on the Share overlay (docs/design/screens-and-flows.md §10) and Settings → Privacy & export "Export everything" (§12). Every user-facing surface renders across all 17 looks + light/dark, meets 44pt/48dp targets, ≥ 4.5:1 contrast, and is keyboard-reachable on web; children own their specific screens and states (empty/progress/error/offline).

#### Test plan
Aggregate across `app/test/sharing/`, `packages/sane_core/test/export/`, `packages/sane_render/test/export/`, `packages/sane_pdf/test/export/`, `app/integration_test/share_flow_test.dart`, and the fidelity suite [SN-SHR-028](sharing-export.md#sn-shr-028). Each child names its own files.

#### Dependencies
Cross-epic: [SN-CORE-001](storage.md#sn-core-001) (document model), [SN-CRY-001](security.md#sn-cry-001) (keys/envelope), [SN-SYNC-001](sync.md#sn-sync-001) (op-log/segments), [SN-PDF-001](pdf.md#sn-pdf-001) (PDF engine), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (OCR for searchable export/import), [SN-BILL-001](billing.md#sn-bill-001) (Free/Pro gate), [SN-COL-001](collaboration.md#sn-col-001) (collaboration), [SN-NOTF-001](notifications.md#sn-notf-001) (share-target/deep-link registration).

### Children
- [ ] [SN-SHR-002](sharing-export.md#sn-shr-002) On-device export service (scope, streaming, progress, cancel)
- [ ] [SN-SHR-003](sharing-export.md#sn-shr-003) Export a notebook/range to PDF (ink vector + searchable text)
- [ ] [SN-SHR-004](sharing-export.md#sn-shr-004) Export page/selection to PNG (1x/2x/3x, transparent)
- [ ] [SN-SHR-005](sharing-export.md#sn-shr-005) Export ink/shapes/text to SVG vector paths
- [ ] [SN-SHR-006](sharing-export.md#sn-shr-006) Export to Markdown (CommonMark + GFM)
- [ ] [SN-SHR-007](sharing-export.md#sn-shr-007) Export structured JSON of the document model
- [ ] [SN-SHR-008](sharing-export.md#sn-shr-008) Export the open .sanenote bundle (lossless)
- [ ] [SN-SHR-009](sharing-export.md#sn-shr-009) "Export everything" ZIP (PDF + .sane), Free + offline
- [ ] [SN-SHR-010](sharing-export.md#sn-shr-010) OS share sheet for export artefacts
- [ ] [SN-SHR-011](sharing-export.md#sn-shr-011) System print of a page range
- [ ] [SN-SHR-012](sharing-export.md#sn-shr-012) Preserve accessibility metadata in exports
- [ ] [SN-SHR-013](sharing-export.md#sn-shr-013) Capability share-link model (wrapped key in fragment)
- [ ] [SN-SHR-014](sharing-export.md#sn-shr-014) Share overlay UI (link, permission, people, export)
- [ ] [SN-SHR-015](sharing-export.md#sn-shr-015) Share roles & cryptographic capability enforcement
- [ ] [SN-SHR-016](sharing-export.md#sn-shr-016) Invite by email + People list management + 3-person gate
- [ ] [SN-SHR-017](sharing-export.md#sn-shr-017) Cryptographic revocation (key rotation + re-wrap)
- [ ] [SN-SHR-018](sharing-export.md#sn-shr-018) Expiring share links (exp claim in wrapped-key envelope)
- [ ] [SN-SHR-019](sharing-export.md#sn-shr-019) Link-activity view + scoped single-page/range share
- [ ] [SN-SHR-020](sharing-export.md#sn-shr-020) Default share posture build-time flag
- [ ] [SN-SHR-021](sharing-export.md#sn-shr-021) Import entry points, pipeline & import report
- [ ] [SN-SHR-022](sharing-export.md#sn-shr-022) Markdown import (front-matter, wikilinks, images)
- [ ] [SN-SHR-023](sharing-export.md#sn-shr-023) Image import with on-device OCR + camera-scan crop
- [ ] [SN-SHR-024](sharing-export.md#sn-shr-024) Notion import (Markdown+CSV / HTML zip)
- [ ] [SN-SHR-025](sharing-export.md#sn-shr-025) Goodnotes & Notability import (tier-A + tier-B)
- [ ] [SN-SHR-026](sharing-export.md#sn-shr-026) OneNote import (PDF/.docx tier-B + Graph/.one tier-A)
- [ ] [SN-SHR-027](sharing-export.md#sn-shr-027) Harden competitor/bundle import (caps, paths, off-isolate)
- [ ] [SN-SHR-028](sharing-export.md#sn-shr-028) Export/import round-trip & fidelity test suite

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-002

<a id="sn-shr-002"></a>

**Implement the on-device export service: scope, streaming, progress, cancel**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-22`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Every export format needs the same skeleton: pick a scope (current page, a page range, or the whole notebook), fold the document model to that scope, run the format writer on a background isolate, stream bytes to a user-chosen destination with a progress indicator, and let the user cancel without leaving a partial file (PRD-CO-017). Exporting a 1,000-page notebook MUST NOT OOM on a 4 GB Android device or block the UI thread (locked decision 7; docs/platform/performance-budgets.md). This service is the shared substrate the PDF/PNG/SVG/Markdown/JSON/.sanenote writers plug into, so it exists before any one format. It reads the folded page state from `sane_core` and the on-disk bundle described in docs/architecture/file-format.md.

#### Scope
**In:** an `ExportRequest {scope, format, options, destination}` model; scope resolution (page / range / notebook / selection); a background export runner (`Isolate.run`) with a progress stream and a cancellation token; temp-then-rename atomic file writing so a cancel/crash leaves no partial artefact; a registry the concrete writers ([SN-SHR-003](sharing-export.md#sn-shr-003)..[SN-SHR-008](sharing-export.md#sn-shr-008)) register into.
**Out:** the individual format writers; the share sheet ([SN-SHR-010](sharing-export.md#sn-shr-010)); print ([SN-SHR-011](sharing-export.md#sn-shr-011)); the "Export everything" batch ([SN-SHR-009](sharing-export.md#sn-shr-009)).

#### Acceptance criteria
- [ ] Export runs off the UI isolate; a `flutter run --profile` timeline shows no frame > 16.7 ms on the reference iPad while a 1,000-page export runs in the background.
- [ ] A progress stream advances 0->1 with page counts; the UI can render "Exporting page N of M".
- [ ] Cancel stops the run and deletes any `.tmp` partial; no partial file remains on disk.
- [ ] Peak memory stays < 300 MB on the reference 4 GB Android device for a 1,000-page notebook (perf budget).
- [ ] Destination paths are canonicalised and confined to the OS-granted directory; a `..` or absolute path from options is rejected.
- [ ] All export runs on-device by default; no bytes go to any network (PRD-CO-000/017).

#### Technical notes
Add `app/lib/sharing/export/export_service.dart` + `export_request.dart`; writers live in their owning packages and register a `FormatWriter` capability. Use `Isolate.run` for the folding+encoding step (CLAUDE.md §8: persistence/heavy work off the UI isolate). Atomic write = write `<name>.tmp`, fsync, rename (mirrors docs/architecture/file-format.md §2.4). Fold state via `sane_core` repository interfaces; do not import feature packages sideways (coordinate in `app/`). Implements PRD-CO-017.

#### Security & privacy
Export writes note content to a user-chosen location: confine and canonicalise the path (reject `..`/absolute/symlink; CWE-22, checklist §1), cap wall-clock and memory before encoding (CWE-400), and never log the content, page titles, or the chosen path (checklist §7). Baseline: no content in logs, tokens only. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-2, CWE-22, CWE-400.

#### UX notes
Drives the Export row toasts in the Share overlay (docs/design/screens-and-flows.md §10: "Exporting PDF with ink & highlights…") and Settings §12. Progress + Cancel affordance render in all 17 looks + dark; the progress control is `Semantics`-labelled ("Export 40 percent"), 44pt/48dp, keyboard-cancellable on web. Empty state (nothing to export) is disabled with a hint; error state shows a user-safe message, never a stack trace.

#### Test plan
`app/test/sharing/export_service_test.dart` (scope resolution, cancellation leaves no partial, progress monotonic), `app/integration_test/export_large_notebook_test.dart` (1,000-page memory + no-jank), path-confinement negative test.

#### Dependencies
[SN-CORE-005](storage.md#sn-core-005) (.sanenote reader/writer + folded state). Coordinates with [SN-CORE-001](storage.md#sn-core-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-003

<a id="sn-shr-003"></a>

**Export a notebook or page range to PDF with vector ink and a searchable text layer**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, pdf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-002](sharing-export.md#sn-shr-002), [SN-PDF-019](pdf.md#sn-pdf-019) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
PDF is the universal hand-off format, and the Share overlay's first Export option is "PDF — with ink & highlights" (docs/design/screens-and-flows.md §10). Sane must export a page, a page range, or a whole notebook with ink, highlights, typed text, images and PDF-backed pages flattened at print fidelity, with a page outline (one bookmark per page/section) and — where recognition exists — a selectable invisible OCR text layer so the exported PDF is searchable (PRD-CO-010, PRD-CO-018). Exported PDF-backed pages MUST keep their original colours even when the app is in dark mode (PRD-CO-022; design §0 "PDFs keep their original colours"). This composes the per-page PDF writer that [SN-PDF-019](pdf.md#sn-pdf-019) builds for PDF-backed pages, extending it to Sane's own paged/infinite/template pages.

#### Scope
**In:** rendering Sane pages (paged, infinite-canvas crop, PDF-backed) to PDF via the export service; embedding typed text as real selectable text (embedded TrueType); ink and shapes as vector where feasible, else high-DPI raster; a document outline; honouring the "never dark-invert PDF pages" rule; wiring the searchable invisible OCR text layer produced by [SN-PDF-020](pdf.md#sn-pdf-020) when recognition is available (graceful: no bogus text when unrecognised).
**Out:** the invisible-OCR-layer generator itself ([SN-PDF-020](pdf.md#sn-pdf-020)); PDF annotation round-trip ([SN-PDF-016](pdf.md#sn-pdf-016)); print ([SN-SHR-011](sharing-export.md#sn-shr-011)); page-scoped share ([SN-SHR-019](sharing-export.md#sn-shr-019)).

#### Acceptance criteria
- [ ] Exported PDF opens in Preview/Acrobat; page count equals the selected scope; outline has one bookmark per page/section.
- [ ] Typed text is selectable (embedded TrueType), not rasterised; ink renders as vector paths where feasible.
- [ ] With recognition available, text search in a reference reader finds handwritten words; with none, the page exports as vector with no fabricated text.
- [ ] A dark-mode notebook exports light PDF pages for PDF-backed content (PRD-CO-022).
- [ ] Highlighter strokes export at multiply/low-alpha so underlying text stays legible.
- [ ] Export runs off the UI isolate via [SN-SHR-002](sharing-export.md#sn-shr-002) and streams to disk.

#### Technical notes
Add `packages/sane_pdf/lib/src/export/notebook_pdf_export.dart`, reusing `package:pdf` writing and the flatten path from [SN-PDF-019](pdf.md#sn-pdf-019). Ink vector geometry comes from `sane_render`/`sane_ink`; the invisible text render mode + OCR bounds come from [SN-PDF-020](pdf.md#sn-pdf-020) (Apple Vision / ML Kit / Tesseract per platform, [SN-HWR-001](ocr-hwr.md#sn-hwr-001)). Implements PRD-CO-010/018/022 and docs/architecture/file-format.md §9 (PDF row). Follows docs/adr/0014-pdf-engine.md.

#### Security & privacy
OCR runs on-device by default; any cloud OCR escalation is per-request opt-in with the data-leaves-device banner (decision 6, TM-I-08). Recognised text and page content are note content: never logged (checklist §7); validate recognition output before embedding (CWE-20). IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-20.

#### UX notes
Triggered from the Share overlay Export row (design §10, toast "Exporting PDF with ink & highlights…") and the library `⋯` menu. A scope picker (This page / Pages A-B / Whole notebook) and an optional "Make handwriting searchable" checkbox. Renders in all 17 looks + dark; progress/cancel and a11y from [SN-SHR-002](sharing-export.md#sn-shr-002); alt-text metadata handled by [SN-SHR-012](sharing-export.md#sn-shr-012).

#### Test plan
`packages/sane_pdf/test/export/notebook_pdf_export_test.dart` (page count, outline, selectable typed text, dark-mode colour preservation, highlighter alpha, no-fabrication when unrecognised), interop open in a reference reader in `app/integration_test/export_pdf_test.dart`.

#### Dependencies
[SN-SHR-002](sharing-export.md#sn-shr-002) (export service), [SN-PDF-019](pdf.md#sn-pdf-019) (PDF flatten writer). References [SN-PDF-020](pdf.md#sn-pdf-020) (searchable layer) and [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (OCR).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-004

<a id="sn-shr-004"></a>

**Export a page or selection to PNG at 1x/2x/3x with optional transparency**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, images-media |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-002](sharing-export.md#sn-shr-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
The Share overlay's "Image" export produces a PNG of the current page ("Exporting this page as PNG…", docs/design/screens-and-flows.md §10). Users need a raster they can drop into slides, chats, or an LMS. The app MUST export the current page or a lasso selection to PNG at a user-chosen scale (1x/2x/3x), with an optional transparent background, honouring the page tint (PRD-CO-011). This is a thin writer over the render pipeline that already rasterises pages for thumbnails.

#### Scope
**In:** a PNG `FormatWriter` that rasterises the selected page or lasso selection to a `dart:ui` Picture at the chosen scale, with transparent-background toggle and page-tint honouring; registration into the export service.
**Out:** SVG vector export ([SN-SHR-005](sharing-export.md#sn-shr-005)); multi-page batch ([SN-SHR-009](sharing-export.md#sn-shr-009)); the share sheet ([SN-SHR-010](sharing-export.md#sn-shr-010)).

#### Acceptance criteria
- [ ] PNG dimensions equal page units x scale for 1x/2x/3x (exact pixel counts asserted).
- [ ] With "transparent" chosen, the output has an alpha channel and no page-tint fill; without it, the page tint is painted.
- [ ] A lasso selection exports only the selection's bounding region, not the whole page.
- [ ] Export runs off the UI isolate and streams to disk via [SN-SHR-002](sharing-export.md#sn-shr-002); cancel leaves no partial file.
- [ ] Colours match the on-screen page in light mode; dark-mode PDF-backed content is not inverted.

#### Technical notes
Add `packages/sane_render/lib/src/export/png_export.dart` using `Picture.toImage` / `Image.toByteData(png)` at the device pixel ratio x scale. Reuse the page painter used for thumbnails so ink/brush fidelity matches the canvas. Register the writer with [SN-SHR-002](sharing-export.md#sn-shr-002). Implements PRD-CO-011.

#### Security & privacy
The rasterised page is note content; write only to the confined export destination (CWE-22) and never log the bytes or path (checklist §7). Baseline: no content in logs, tokens only. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-2, CWE-22.

#### UX notes
Share overlay Export "Image" and the library `⋯` menu; a small scale segmented control (1x/2x/3x) and a "Transparent background" switch. Toast per design. Renders in all 17 looks + dark; controls are `Semantics`-labelled, 44pt/48dp, keyboard-reachable on web.

#### Test plan
`packages/sane_render/test/export/png_export_test.dart` (dimensions per scale, alpha present/absent, selection cropping, tint honouring), golden comparison of a themed page raster.

#### Dependencies
[SN-SHR-002](sharing-export.md#sn-shr-002) (export service).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-005

<a id="sn-shr-005"></a>

**Export ink, shapes and text to SVG as vector paths**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, ink |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-002](sharing-export.md#sn-shr-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
SVG is the loss-free vector export: strokes stay as scalable paths so a diagram or handwritten figure re-imports or opens in a browser without rasterisation (PRD-CO-012; docs/architecture/file-format.md §9 PNG/SVG row). This is a differentiator over apps that only flatten to raster, and it feeds accessible metadata (SVG `<title>/<desc>`, [SN-SHR-012](sharing-export.md#sn-shr-012)). One `<path>` per stroke preserves colour, width and opacity; the highlighter maps to a multiply/low-alpha compositing so overlaps read correctly.

#### Scope
**In:** an SVG `FormatWriter` emitting one `<path>` per stroke with stroke colour, width and opacity; highlighter as multiply/low-alpha groups; typed text as `<text>` where feasible (fallback: outline path); shapes as native SVG primitives where recognised; a viewBox matching page units.
**Out:** PNG raster ([SN-SHR-004](sharing-export.md#sn-shr-004)); Markdown embedding of SVG ([SN-SHR-006](sharing-export.md#sn-shr-006)); accessibility `<title>/<desc>` injection ([SN-SHR-012](sharing-export.md#sn-shr-012)).

#### Acceptance criteria
- [ ] Opening the SVG in a browser reproduces strokes as vectors (no rasterisation) at any zoom.
- [ ] Each stroke is a single `<path>`; colour/width/opacity match the source stroke within tolerance.
- [ ] Highlighter strokes render at low alpha / multiply so overlapping text stays visible.
- [ ] Typed text exports as selectable `<text>` where the font permits; otherwise as an outline path (no dropped content).
- [ ] The `viewBox` maps page coordinates so a re-import lands geometry in the right place.

#### Technical notes
Add `packages/sane_render/lib/src/export/svg_export.dart` (or `sane_ink` for pure geometry-to-path), building path `d` data from the stroke outline geometry ([SN-INK-004](ink.md#sn-ink-004)). Keep numeric precision bounded (fixed-point) so files stay small. Register with [SN-SHR-002](sharing-export.md#sn-shr-002). Implements PRD-CO-012.

#### Security & privacy
SVG is note content written to the confined destination (CWE-22); never log content/path (checklist §7). Do not embed remote references or scripts in emitted SVG (no `<script>`, no external `href`) so the artefact cannot become an exfiltration/XSS vector when opened elsewhere. Baseline: no content in logs, tokens only. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-2, CWE-22.

#### UX notes
Offered under an "Export as… > SVG (vector)" affordance in the library `⋯` / share Export overflow (design §10 Export row + overflow). Renders/consistent in all 17 looks; a11y metadata added by [SN-SHR-012](sharing-export.md#sn-shr-012).

#### Test plan
`packages/sane_render/test/export/svg_export_test.dart` (one path per stroke, colour/width/opacity fidelity, highlighter alpha, viewBox mapping, no `<script>`/remote href), browser-render golden.

#### Dependencies
[SN-SHR-002](sharing-export.md#sn-shr-002) (export service), [SN-INK-004](ink.md#sn-ink-004) (stroke outline geometry).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-006

<a id="sn-shr-006"></a>

**Export typed text and OCR transcripts to Markdown (CommonMark + GFM)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, text |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-002](sharing-export.md#sn-shr-002), [SN-SHR-005](sharing-export.md#sn-shr-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
Markdown is the maximally portable text export and the anti-lock-in path for note-takers who also live in Obsidian/Notion (PRD-CO-013; docs/architecture/file-format.md §9). Sane must export typed text, headings, lists, tables, checkboxes, backlinks and OCR transcripts of ink to CommonMark + GFM (tables, task lists); ink pages with no recognised text MUST be embedded as linked PNG/SVG so nothing is silently dropped; wiki-links export as `[[target]]` and as relative links. A round-trip (Markdown export -> import -> Markdown) MUST preserve headings, lists, links and image references.

#### Scope
**In:** a Markdown `FormatWriter` folding typed rich-text blocks, lists, GFM tables, task-list checkboxes, backlinks/wiki-links and (when recognition exists) ink OCR transcripts; embedding un-recognised ink pages as linked PNG/SVG assets in a sibling folder; front-matter with note title/tags/properties.
**Out:** the SVG/PNG asset writers themselves ([SN-SHR-004](sharing-export.md#sn-shr-004)/[SN-SHR-005](sharing-export.md#sn-shr-005)); Markdown *import* ([SN-SHR-022](sharing-export.md#sn-shr-022)); the OCR engine ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)).

#### Acceptance criteria
- [ ] Round-trip Markdown -> [SN-SHR-022](sharing-export.md#sn-shr-022) import -> Markdown preserves headings, lists, task-lists, links and image references.
- [ ] GFM tables and `- [ ]`/`- [x]` checkboxes render correctly in a reference viewer.
- [ ] Wiki-links export both as `[[target]]` and as a working relative link to the exported target file.
- [ ] An ink page with no recognised text is embedded as a linked PNG/SVG (never dropped); with recognition, its transcript is inlined.
- [ ] YAML front-matter carries the note title, tags and typed properties.

#### Technical notes
Add `packages/sane_core/lib/src/export/markdown_export.dart` (pure Dart; no `package:flutter`). Compose the PNG/SVG asset writers via the export service for embedded ink. Use the Peritext/text CRDT snapshot for rich text (docs/architecture/document-model.md §TEXT). Implements PRD-CO-013. OCR transcripts are optional and graceful when [SN-HWR-001](ocr-hwr.md#sn-hwr-001) is unavailable at runtime.

#### Security & privacy
Markdown + assets are note content written to the confined destination (CWE-22); never log content/path (checklist §7). Normalise text to Unicode NFC and strip meaningless control characters before writing (checklist §1). Baseline: no content in logs. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-22.

#### UX notes
"Export as… > Markdown" in the library `⋯`/share Export overflow. A folder-style export (`note.md` + `assets/`) with a toast. Consistent across 17 looks + dark; a11y alt attributes for embedded images set by [SN-SHR-012](sharing-export.md#sn-shr-012).

#### Test plan
`packages/sane_core/test/export/markdown_export_test.dart` (headings/lists/tables/checkboxes, wiki-link dual form, ink-embedding fallback, front-matter, NFC normalisation), round-trip test paired with [SN-SHR-022](sharing-export.md#sn-shr-022).

#### Dependencies
[SN-SHR-002](sharing-export.md#sn-shr-002) (export service), [SN-SHR-005](sharing-export.md#sn-shr-005) (SVG asset writer). References [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (OCR transcripts) and [SN-SHR-022](sharing-export.md#sn-shr-022) (round-trip import).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-007

<a id="sn-shr-007"></a>

**Export a notebook to structured JSON matching the .sanenote schema**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, storage |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-002](sharing-export.md#sn-shr-002), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-22` |
| Extra labels | agent-ready, good first issue |

#### Context
For programmatic re-use, backup tooling and debugging, Sane must export a notebook to structured JSON describing the document model — pages, layers, objects, stroke geometry, the text CRDT snapshot and metadata — per the published `.sanenote` schema (PRD-CO-014; docs/architecture/file-format.md §9 JSON row). This is the "your data is really yours, and readable without our app" guarantee for developers, and it validates against the same schema a headless reader uses to reconstruct page geometry.

#### Scope
**In:** a JSON `FormatWriter` that folds the current document state (snapshot + op tail) to a single JSON document matching the published schema, including stroke geometry (decoded from the ink-v1 blob), object records and the Peritext text snapshot; deterministic key ordering so output is diff-stable.
**Out:** the binary `.sanenote` bundle ([SN-SHR-008](sharing-export.md#sn-shr-008)); JSON *import* (covered by the generic importer / out of v1); schema publication doc (owned by [SN-CORE-005](storage.md#sn-core-005)).

#### Acceptance criteria
- [ ] The emitted JSON validates against the published `.sanenote` document-model schema.
- [ ] A headless reader can reconstruct page geometry (stroke sample points within fixed-point tolerance) from the JSON alone.
- [ ] Object ids, layers, z-order and the text CRDT snapshot are all present.
- [ ] Output key ordering is deterministic (stable across two exports of the same state).
- [ ] Export runs off the UI isolate and streams to disk via [SN-SHR-002](sharing-export.md#sn-shr-002).

#### Technical notes
Add `packages/sane_core/lib/src/export/json_export.dart` (pure Dart). Decode stroke geometry from the `application/ink-v1` blob framing (docs/architecture/file-format.md §5.3) into explicit sample arrays. Reuse the folded snapshot from [SN-CORE-005](storage.md#sn-core-005). Implements PRD-CO-014.

#### Security & privacy
JSON is a full plaintext dump of note content — write only to the confined destination (CWE-22), never log it (checklist §7), and clearly label it as an unencrypted export in the UI. Baseline: no content in logs, tokens only. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-2, CWE-22.

#### UX notes
"Export as… > JSON (developer)" in the Export overflow, with a one-line "plain, unencrypted structural export" note. Consistent in all 17 looks + dark; a11y-labelled control.

#### Test plan
`packages/sane_core/test/export/json_export_test.dart` (schema validation, geometry round-trip tolerance, deterministic ordering, presence of layers/text snapshot).

#### Dependencies
[SN-SHR-002](sharing-export.md#sn-shr-002) (export service), [SN-CORE-005](storage.md#sn-core-005) (.sanenote schema + folded state).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-008

<a id="sn-shr-008"></a>

**Export the lossless .sanenote bundle with optional encryption**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-002](sharing-export.md#sn-shr-002), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-1`, `MASVS-PRIVACY-2`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
The `.sanenote` bundle is the canonical, documented, published format and the "your data outlives the app" guarantee (PRD-CO-015; docs/architecture/file-format.md §1). The Share overlay labels it "**.sane (with audio) — keeps audio sync**" (docs/design/screens-and-flows.md §10). Exporting it folds the sync store to snapshots, optionally decrypts (a cleartext export on the user's own device is the longevity guarantee), and zips a Zip64 archive with MANIFEST.cbor, per-page snapshots/op-tail, content-addressed blobs (including audio, chunk-framed) and derived thumbnails/index. Export then re-import MUST reproduce the notebook bit-for-bit (ink, audio-ink timestamps, backlinks, tags).

#### Scope
**In:** a `.sanenote` `FormatWriter` that compacts pages to a snapshot, assembles MANIFEST.cbor (deterministic CBOR) with the hash tree and hlcVector, packs blobs (audio chunked), writes the FORMAT sentinel, and produces a Zip64 (or directory) bundle; a "cleartext" vs "encrypted-for-backup" option (encrypted reuses the sync-store envelope).
**Out:** the crypto envelope internals ([SN-CRY-001](security.md#sn-cry-001)); the reader ([SN-CORE-005](storage.md#sn-core-005)); "Export everything" batching ([SN-SHR-009](sharing-export.md#sn-shr-009)).

#### Acceptance criteria
- [ ] Export -> re-import reproduces the notebook bit-for-bit: ink geometry, audio-ink timestamps, backlinks and tags all match.
- [ ] The bundle contains MANIFEST.cbor (parsed first), the FORMAT sentinel "sanenote/1", per-page snapshots, content-addressed blobs and derived thumbnails/index per docs/architecture/file-format.md §1.
- [ ] The manifest hash tree verifies (every snapshot/segment/blob/page-meta hash matches) on re-open.
- [ ] Cleartext export decrypts on-device; encrypted export uses XChaCha20-Poly1305 / AES-256-GCM per the sync-store envelope (§6) with no key in the manifest in the clear.
- [ ] Large audio blobs stream chunk-by-chunk without loading the whole file into memory (< 300 MB peak on reference Android).

#### Technical notes
Add `packages/sane_core/lib/src/export/sanenote_bundle_export.dart` composing the writer from [SN-CORE-005](storage.md#sn-core-005); use a streaming Zip64 writer (docs/architecture/file-format.md §11 flags the `archive` package Zip64/streaming caveat — verify, else fall back to a directory bundle). Encrypted exports call [SN-CRY-001](security.md#sn-cry-001) for envelope wrapping; blob chunking per §5.2. Implements PRD-CO-015 and docs/architecture/file-format.md §1/§5/§6.

#### Security & privacy
A cleartext `.sanenote` is a full plaintext export — confine the write path (CWE-22), never log content/path (checklist §7), and warn in-UI that it is unencrypted. Encrypted exports encrypt before write and keep only wrapped keys/refs in the manifest (checklist §3; docs/architecture/file-format.md §6.2). IDs: MASVS-STORAGE-1, MASVS-CRYPTO-1, MASVS-PRIVACY-2, CWE-22.

#### UX notes
Share overlay Export ".sane (with audio)" (design §10, toast "Exporting .sane — keeps audio sync") and Settings §12 "Export everything". An "Encrypt this export (needs your recovery key to reopen elsewhere)" toggle, off by default for the longevity/cleartext case. All 17 looks + dark; a11y + progress from [SN-SHR-002](sharing-export.md#sn-shr-002).

#### Test plan
`packages/sane_core/test/export/sanenote_bundle_export_test.dart` (bit-for-bit round-trip, manifest hash-tree verify, cleartext vs encrypted, chunked-audio streaming, FORMAT sentinel present), `app/integration_test/export_sanenote_test.dart`.

#### Dependencies
[SN-SHR-002](sharing-export.md#sn-shr-002) (export service), [SN-CORE-005](storage.md#sn-core-005) (bundle reader/writer + schema). References [SN-CRY-001](security.md#sn-cry-001) (encrypted-export envelope), [SN-AUD-001](audio.md#sn-aud-001) (audio blobs).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-009

<a id="sn-shr-009"></a>

**Implement "Export everything" ZIP of every notebook as PDF and .sanenote**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, privacy |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-008](sharing-export.md#sn-shr-008) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-22`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
"Export everything" is the honesty promise: from Settings -> Privacy & export, produce a ZIP of every notebook as PDF **and** `.sanenote`, available on **Free**, runnable offline (PRD-CO-016; docs/design/screens-and-flows.md §12 "PDF and .sane for every notebook — yours to keep, even on Free"). It is the single-click "leave any time with all your data" gesture that attacks lock-in (PRD-CO-003/004). It batches the per-notebook PDF ([SN-SHR-003](sharing-export.md#sn-shr-003)) and `.sanenote` ([SN-SHR-008](sharing-export.md#sn-shr-008)) writers over the whole library.

#### Scope
**In:** a batch export that iterates every notebook (across the current profile), runs the PDF + `.sanenote` writers for each, and streams them into one ZIP with per-notebook progress; cancel-safe; the Settings entry point + toast.
**Out:** the per-notebook writers ([SN-SHR-003](sharing-export.md#sn-shr-003)/[SN-SHR-008](sharing-export.md#sn-shr-008)); cross-profile export (per-profile isolation — one profile at a time); cloud upload of the ZIP.

#### Acceptance criteria
- [ ] The resulting ZIP contains exactly one PDF + one `.sanenote` per notebook in the current profile.
- [ ] Available and fully functional on the **Free** plan and with no network (offline).
- [ ] Toast reads "Preparing a ZIP of every notebook (PDF + .sane)…" (design §12), and progress reflects notebooks completed.
- [ ] Cancel mid-run leaves no partial ZIP on disk.
- [ ] Peak memory stays within the 4 GB Android budget (< 300 MB) by streaming one notebook at a time.

#### Technical notes
Add `app/lib/sharing/export/export_everything.dart` driving [SN-SHR-002](sharing-export.md#sn-shr-002) once per notebook and appending to a streaming ZIP. Scope to the active profile's notebooks only (multi-profile data isolation, [SN-LIB-001](library.md#sn-lib-001)). Implements PRD-CO-016.

#### Security & privacy
Batches full plaintext exports — confine the write path (CWE-22), cap total wall-clock/memory (CWE-400), never log content/paths (checklist §7), and never bundle another profile's notebooks (data isolation). Baseline: no content in logs. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-2, CWE-22, CWE-400.

#### UX notes
Settings -> Privacy & export -> "Export everything" (design §12). Progress dialog with notebook count + Cancel; success hands off to the share sheet ([SN-SHR-010](sharing-export.md#sn-shr-010)) or a "Saved to Files" confirmation. All 17 looks + dark; a11y-labelled progress; keyboard-reachable on web.

#### Test plan
`app/test/sharing/export_everything_test.dart` (one PDF + one .sane per notebook, Free-plan availability, offline, cancel leaves no partial, profile scoping), `app/integration_test/export_everything_test.dart`.

#### Dependencies
[SN-SHR-003](sharing-export.md#sn-shr-003) (PDF export), [SN-SHR-008](sharing-export.md#sn-shr-008) (.sanenote export). Coordinates with [SN-LIB-001](library.md#sn-lib-001) (profile scoping) and [SN-SHR-010](sharing-export.md#sn-shr-010) (share sheet).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-010

<a id="sn-shr-010"></a>

**Offer the OS share sheet for export artefacts on every platform**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-002](sharing-export.md#sn-shr-002) |
| Security controls | `MASVS-PLATFORM-3`, `MASVS-PRIVACY-2`, `CWE-200` |
| Extra labels | agent-ready, good first issue |

#### Context
Once an artefact is exported it must reach other apps through the native share UI: iOS/iPadOS `UIActivityViewController`, Android `ACTION_SEND`/`Intent.createChooser`, and Web `navigator.share()` (Web Share API level 2 with files where supported, else a download fallback) (PRD-CO-020). This is what turns "Export PDF" into "AirDrop this to my professor" or "share to WhatsApp". On unsupported web browsers it MUST degrade to a plain download so the user is never stuck.

#### Scope
**In:** a `ShareSheet` service that takes an exported file (or bytes) + a title/MIME and invokes the platform share UI on each surface; the web capability check with download fallback; wiring from every export flow.
**Out:** receiving shares *into* the app (import share-target, [SN-SHR-021](sharing-export.md#sn-shr-021)); print ([SN-SHR-011](sharing-export.md#sn-shr-011)); the OS share-target/file-handler *registration* deep-dive ([SN-NOTF-001](notifications.md#sn-notf-001)).

#### Acceptance criteria
- [ ] The share sheet appears with the correct file type and title for a PDF/PNG/SVG/Markdown/.sanenote artefact on iPad, Android tablet, iPhone and Android phone.
- [ ] On a web browser with Web Share API level 2 (files), `navigator.share({files})` is used; on an unsupported browser a download occurs instead (no dead button).
- [ ] The share flow never blocks the UI thread and works for a large (>50 MB audio) `.sanenote`.
- [ ] No note content, file path, or recipient is logged.

#### Technical notes
Add `app/lib/sharing/share_sheet.dart` over a thin platform channel (or a vetted, pinned share plugin — justify per checklist §10). Web uses `navigator.canShare({files})` before `navigator.share`; else an `<a download>`-style save via the browser. Implements PRD-CO-020. Coordinates registration with [SN-NOTF-001](notifications.md#sn-notf-001).

#### Security & privacy
Handing a file to another app is a deliberate egress: share only the user-selected artefact, strip nothing extra, and do not attach metadata beyond the file (CWE-200). Never log the artefact, path, or chosen target (checklist §7). Baseline: no content in logs, tokens only. IDs: MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200.

#### UX notes
Invoked at the end of any export (Share overlay Export row, library `⋯`, "Export everything"). A brief "Preparing…" then the native sheet. All 17 looks + dark for the pre-share affordance; the native sheet is OS-styled. A11y: the trigger is labelled and 44pt/48dp; web trigger keyboard-reachable.

#### Test plan
`app/test/sharing/share_sheet_test.dart` (correct MIME/title mapping, web canShare gating, download fallback path), `app/integration_test/share_sheet_test.dart` per platform smoke.

#### Dependencies
[SN-SHR-002](sharing-export.md#sn-shr-002) (produces the artefact). Coordinates with [SN-NOTF-001](notifications.md#sn-notf-001) (platform registration).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-011

<a id="sn-shr-011"></a>

**Support system print of a page range with correct paper size and margins**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-003](sharing-export.md#sn-shr-003) |
| Security controls | `MASVS-PRIVACY-2`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
Students print handouts and marked-up PDFs. Sane must support system Print (AirPrint / Android Print Framework / `window.print()` on web) of a page range with the correct paper size (Auto/A4/Letter per template) and margins; PDF-backed pages print at their native size; and printed PDF-backed content is never dark-inverted (PRD-CO-021, PRD-CO-022). Print reuses the PDF export path so the paginated output matches the exported PDF exactly.

#### Scope
**In:** a print service that renders the selected page range to the platform print pipeline via the PDF writer ([SN-SHR-003](sharing-export.md#sn-shr-003)), with paper-size selection (Auto/A4/Letter) and margins; native-size printing for PDF-backed pages; the dark-mode colour-preservation rule.
**Out:** export-to-file ([SN-SHR-003](sharing-export.md#sn-shr-003)); the share sheet ([SN-SHR-010](sharing-export.md#sn-shr-010)).

#### Acceptance criteria
- [ ] Print preview shows correct pagination for the selected range; an A4 export prints without clipping.
- [ ] Paper size Auto/A4/Letter is honoured; PDF-backed pages print at native size.
- [ ] A dark-mode notebook prints light PDF-backed pages (PRD-CO-022).
- [ ] Web uses `window.print()` against the generated PDF; iOS uses `UIPrintInteractionController` (AirPrint); Android uses the Print Framework.
- [ ] No note content or printer identity is logged.

#### Technical notes
Add `app/lib/sharing/print_service.dart` reusing [SN-SHR-003](sharing-export.md#sn-shr-003)'s PDF bytes as the print payload (a vetted, pinned printing plugin is acceptable — justify per checklist §10). Implements PRD-CO-021/022.

#### Security & privacy
Printing is an egress to a system service and possibly a network printer: hand off only the selected range, never log content or printer details (CWE-200, checklist §7). Baseline: no content in logs. IDs: MASVS-PRIVACY-2, CWE-200.

#### UX notes
A "Print…" action in the library `⋯` and the Share overlay Export overflow, opening the OS print dialog with a range + paper-size picker first. All 17 looks + dark for the pre-print affordance; a11y-labelled; keyboard-reachable on web.

#### Test plan
`app/test/sharing/print_service_test.dart` (range pagination, paper-size mapping, dark-mode colour preservation), manual AirPrint/Android/web print smoke documented in the PR.

#### Dependencies
[SN-SHR-003](sharing-export.md#sn-shr-003) (PDF export payload).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-012

<a id="sn-shr-012"></a>

**Preserve alt-text and OCR transcripts as accessible metadata in exports**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | sharing-export, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-005](sharing-export.md#sn-shr-005), [SN-SHR-006](sharing-export.md#sn-shr-006) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, good first issue |

#### Context
Exports must stay accessible: alt-text / OCR transcripts must survive into PDF `/Alt`, SVG `<title>/<desc>`, and Markdown image alt attributes so a screen reader reading the exported artefact announces per-image alt text (PRD-CO-018; WCAG 1.1.1). This is a small cross-cutting task over the PDF/SVG/Markdown writers, and it doubles as a market wedge — Sane's on-device OCR means even handwritten pages carry a text alternative into the export (PRD-CO-310, user-pain idea #20).

#### Scope
**In:** injecting the object title + on-device OCR transcript + alt text into each writer's accessible-metadata slot (PDF `/Alt` on marked content, SVG `<title>/<desc>` per group, Markdown `![alt](…)`); marking decorative strokes skip-able.
**Out:** generating the OCR transcript ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)); the writers' geometry paths ([SN-SHR-003](sharing-export.md#sn-shr-003)/[SN-SHR-005](sharing-export.md#sn-shr-005)/[SN-SHR-006](sharing-export.md#sn-shr-006)).

#### Acceptance criteria
- [ ] A screen reader reading the exported PDF announces per-image/per-object alt text.
- [ ] Exported SVG carries `<title>` and `<desc>` for each stroke-group/shape; decorative ink is marked skip-able / omitted from the a11y tree.
- [ ] Exported Markdown images carry a non-empty `alt` when a transcript or title exists.
- [ ] When no transcript exists, a sensible fallback (object title / "handwritten note") is used, never an empty or fabricated alt.

#### Technical notes
Extend [SN-SHR-003](sharing-export.md#sn-shr-003) (PDF marked-content `/Alt`), [SN-SHR-005](sharing-export.md#sn-shr-005) (SVG `<title>/<desc>`) and [SN-SHR-006](sharing-export.md#sn-shr-006) (Markdown alt) to read the per-object title + OCR transcript from the model. Transcript source is [SN-HWR-001](ocr-hwr.md#sn-hwr-001); degrade gracefully when absent. Implements PRD-CO-018; aligns with docs/design/accessibility.md.

#### Security & privacy
The alt text is note content (an OCR transcript) placed into the user's chosen export only — never logged (checklist §7). Baseline: no content in logs. IDs: MASVS-PRIVACY-1.

#### UX notes
No new surface; it improves the accessibility of what the export writers already produce. Verified with VoiceOver reading an exported PDF and a screen reader on an exported Markdown page.

#### Test plan
`app/test/sharing/export_accessibility_test.dart` (PDF /Alt present, SVG title/desc per group, Markdown alt non-empty, decorative-skip, no fabricated alt), a11y assertion in the export golden tests.

#### Dependencies
[SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-005](sharing-export.md#sn-shr-005), [SN-SHR-006](sharing-export.md#sn-shr-006) (the writers). References [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (transcripts).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-013

<a id="sn-shr-013"></a>

**Implement the capability share-link model with the wrapped key in the URL fragment**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, security |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-SYNC-002](sync.md#sn-sync-002) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-NETWORK-1`, `MASVS-PLATFORM-1`, `ASVS-V4`, `OWASP-A01`, `OWASP-A02`, `CWE-200`, `CWE-522` |
| Extra labels | agent-ready, innovation |

#### Context
Sane shares are **capability links**, not server ACLs: the link fragment carries the notebook id **and a wrapped content key** so a recipient can decrypt without any Sane server ever holding the key (PRD-CO-032; docs/architecture/file-format.md §6.2; "share links carry noteId + wrapped content key in the URL fragment #…, never sent to any server"). This is the zero-knowledge sharing wedge. The link field is `sane.app/n/<slug>-<shortid>` with the decryption key in the fragment `#k=…`; the slug/key carries >= 96 bits of entropy so brute-forcing is infeasible; and an inbound link lands in a **view/confirm** context and never auto-mutates (checklist §1.1). This issue owns minting the link and resolving it on the way back in.

#### Scope
**In:** the `ShareLink` model (notebookId + wrapped content key + role + optional exp); minting a link (generate a per-share capability, wrap the content key for the link, build the URL with the key in the fragment); resolving an inbound link (parse the allow-listed route `/n/<slug>`, read the fragment key, land in a view/confirm reader, never auto-mutate); referrer stripping so the fragment never leaks; App Links / Universal Links verification config (via [SN-NOTF-001](notifications.md#sn-notf-001)).
**Out:** the Share overlay UI ([SN-SHR-014](sharing-export.md#sn-shr-014)); role enforcement ([SN-SHR-015](sharing-export.md#sn-shr-015)); revocation/rotation ([SN-SHR-017](sharing-export.md#sn-shr-017)); expiry enforcement ([SN-SHR-018](sharing-export.md#sn-shr-018)).

#### Acceptance criteria
- [ ] A minted link has the shape `sane.app/n/<slug>-<shortid>` with the wrapped key only in the `#k=…` fragment; the fragment is never placed in a query or path.
- [ ] The slug/key has >= 96 bits of CSPRNG entropy; brute-forcing the slug is computationally infeasible (documented estimate).
- [ ] Opening a link lands in a read-only view/confirm reader; it never auto-imports, auto-shares, auto-deletes, or sends anything to the network.
- [ ] A server/relay access log never contains the fragment (verified by capture); `Referrer-Policy: no-referrer` is set on outbound navigations from the reader.
- [ ] Only `https` `sane.app/n/…` routes resolve; unknown hosts/schemes/paths are rejected.
- [ ] Guest recipients (no account) can open and read a link (PRD-CO-002).

#### Technical notes
Add `packages/sane_sync/lib/src/share/share_link.dart` (pure Dart, model + mint/resolve) using the envelope hierarchy from [SN-CRY-002](security.md#sn-cry-002) to wrap the content key for the link, and the op-log/segment access from [SN-SYNC-002](sync.md#sn-sync-002). Fragment parsing + allow-list routing in `app/lib/sharing/share_link_router.dart`; App Links/Universal Links + AASA/assetlinks config coordinated with [SN-NOTF-001](notifications.md#sn-notf-001) (docs/adr/0013-collaboration-transport.md; checklist §1.1). Implements PRD-CO-032/276.

#### Security & privacy
Threats: TM-S-04 (link forgery), TM-I-09 (fragment leaking via referrer), TM-E-02 (intent redirection). Controls: capability keys never sent to a server (MASVS-NETWORK-1), CSPRNG high-entropy slug/key (MASVS-CRYPTO-1, CWE-522), allow-list routing + verified deep links (MASVS-PLATFORM-1), view/confirm-only landing (OWASP-A01), no fragment in logs (CWE-200, checklist §7). IDs: MASVS-CRYPTO-1, MASVS-NETWORK-1, MASVS-PLATFORM-1, ASVS-V4, OWASP-A01/A02, CWE-200/522.

#### UX notes
The link string is surfaced by the Share overlay ([SN-SHR-014](sharing-export.md#sn-shr-014), design §10 read-only field + Copy link). The inbound reader is a clearly read-only view with an "Open a copy / Join" confirm action — never a silent mutation. All 17 looks + dark; a11y-labelled; keyboard-reachable on web.

#### Test plan
`packages/sane_sync/test/share/share_link_test.dart` (fragment-only key, entropy, mint/resolve round-trip), `app/test/security/share_link_router_test.dart` (allow-list routing, no auto-mutate, unknown host rejected, referrer stripped, no fragment in logs).

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002) (key wrapping), [SN-SYNC-002](sync.md#sn-sync-002) (op-log/segments). Coordinates with [SN-NOTF-001](notifications.md#sn-notf-001) (App Links/Universal Links) and [SN-COL-001](collaboration.md#sn-col-001) (room join reuses the link).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-014

<a id="sn-shr-014"></a>

**Build the Share overlay UI: link toggle, permission, people list, copy link, export**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, onboarding |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-013](sharing-export.md#sn-shr-013) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PLATFORM-1`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
The Share overlay is fully specified in the design (docs/design/screens-and-flows.md §10): title "Share "<notebook>"", an **Anyone with the link** toggle (`linkOn`), a **permission** segmented control (Can view / Can comment / Can edit), a read-only link field `sane.app/n/phy204-waves-8k2f` with **Copy link**, a **People** list (avatar, name, role) seeded Riya S. (you) — Owner / Kabir — Can edit / Ananya — Can comment, **Invite by email**, a Free footnote, and an **Export** row (PDF / Image / .sane). This issue builds that surface and wires it to the capability-link model, export writers, roles and invites owned by sibling issues.

#### Scope
**In:** the Share overlay widget and its state (linkOn, perm, people, link string, copy); the Copy link action + toast; the Export row wiring to [SN-SHR-003](sharing-export.md#sn-shr-003)/[SN-SHR-004](sharing-export.md#sn-shr-004)/[SN-SHR-008](sharing-export.md#sn-shr-008); the People list rendering; empty/loading/error states; adaptive layout for phone width and the `narrow` collapse.
**Out:** the link/crypto model ([SN-SHR-013](sharing-export.md#sn-shr-013)); role capabilities ([SN-SHR-015](sharing-export.md#sn-shr-015)); invite + people management logic + the 3-person gate ([SN-SHR-016](sharing-export.md#sn-shr-016)); expiry control ([SN-SHR-018](sharing-export.md#sn-shr-018)); the default-posture flag ([SN-SHR-020](sharing-export.md#sn-shr-020)).

#### Acceptance criteria
- [ ] The overlay matches design §10: link toggle, permission segmented control (default from [SN-SHR-020](sharing-export.md#sn-shr-020)), read-only link field + Copy link with the "Link copied — anyone with it can …" toast.
- [ ] The People list renders avatar + name + role, marks the current user "(you) — Owner", and reflects live membership.
- [ ] The Export row offers PDF / Image / .sane, each toasting per design and invoking the correct writer.
- [ ] Turning the link toggle off calls into [SN-SHR-017](sharing-export.md#sn-shr-017) (revocation) and updates the field to a disabled state.
- [ ] Fully usable at 320 CSS px and 200% text with no clipping (WCAG 1.4.10); overlays reflow on `narrow`.
- [ ] Renders correctly in all 17 looks + light/dark; every control is `Semantics`-labelled, 44pt/48dp, keyboard-reachable on web with a visible focus ring.

#### Technical notes
Add `app/lib/sharing/share_overlay.dart` using `sane_ui` tokens/components only (no hardcoded colours; CLAUDE.md §9). State via Riverpod. The link string comes from [SN-SHR-013](sharing-export.md#sn-shr-013); export actions call the export service ([SN-SHR-002](sharing-export.md#sn-shr-002)). Implements design §10 and PRD-CO-030/033 UI. Golden-test across looks.

#### Security & privacy
The overlay displays the link (with the fragment key) — do not log it or copy it to any telemetry (CWE-200, checklist §7). The copy action places the full capability URL on the clipboard only on the user's explicit tap (checklist §1.2). Baseline: no content/tokens in logs. IDs: MASVS-PRIVACY-2, MASVS-PLATFORM-1, CWE-200.

#### UX notes
Exact strings/roles/seed from design §10. Loading (resolving membership) shows skeleton rows; error shows a user-safe retry; empty People shows just "(you) — Owner". First-share shows the in-product default-posture note ([SN-SHR-020](sharing-export.md#sn-shr-020)). Golden tests per look + dark.

#### Test plan
`app/test/sharing/share_overlay_test.dart` (widget: toggle, segmented default, copy toast, People rendering, export wiring, narrow reflow), `app/test/sharing/share_overlay_golden_test.dart` (17 looks + dark), a11y label/contrast assertions.

#### Dependencies
[SN-SHR-013](sharing-export.md#sn-shr-013) (link model). Consumes [SN-SHR-015](sharing-export.md#sn-shr-015)/[SN-SHR-016](sharing-export.md#sn-shr-016)/[SN-SHR-017](sharing-export.md#sn-shr-017)/[SN-SHR-018](sharing-export.md#sn-shr-018)/[SN-SHR-020](sharing-export.md#sn-shr-020) and export writers [SN-SHR-003](sharing-export.md#sn-shr-003)/[SN-SHR-004](sharing-export.md#sn-shr-004)/[SN-SHR-008](sharing-export.md#sn-shr-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-015

<a id="sn-shr-015"></a>

**Enforce share roles cryptographically: Owner, Can edit, Can comment, Can view**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, security |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-013](sharing-export.md#sn-shr-013), [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-AUTH-1`, `ASVS-V4`, `OWASP-A01`, `CWE-284`, `CWE-863` |
| Extra labels | agent-ready |

#### Context
A share role must be enforced both client-side (UI) and **cryptographically** so a modified client cannot exceed its grant: edit/comment keys are distinct from the view key (PRD-CO-031). Roles: **Owner** (full control incl. sharing, role changes, deletion, ownership transfer), **Can edit** (create/modify/delete objects + comment, but not manage sharing/delete the notebook), **Can comment** (read + create/resolve comments/reactions, no note-object edits), **Can view** (read-only incl. audio playback + export-to-self, no comment/edit). Because there is no authoritative server, the cryptographic key separation is what actually binds the role.

#### Scope
**In:** the role capability model; deriving distinct view / comment / edit capability keys from the notebook items key ([SN-CRY-002](security.md#sn-cry-002)) so a viewer literally lacks the key to write; client-side gating of tools/menus per role (comment tools vs stroke tools vs sharing controls); ownership-transfer plumbing.
**Out:** revocation/rotation on removal ([SN-SHR-017](sharing-export.md#sn-shr-017)); the invite/people management UI + gate ([SN-SHR-016](sharing-export.md#sn-shr-016)); comment objects themselves ([SN-COL-001](collaboration.md#sn-col-001)); the crypto primitives ([SN-CRY-001](security.md#sn-cry-001)).

#### Acceptance criteria
- [ ] Each role is enforced client-side AND cryptographically: a "Can view" client cannot produce a valid encrypted edit op (it lacks the edit key), verified by test.
- [ ] "Can comment" enables comment tools and disables stroke/edit tools; "Can view" has no comment composer.
- [ ] Only Owner sees role-management and "Stop sharing"; "Can edit" cannot change others' roles.
- [ ] Ownership transfer moves full control to another member and re-wraps keys accordingly.
- [ ] A tampered client that flips its UI role still cannot decrypt/produce content beyond its cryptographic capability (defence-in-depth test).

#### Technical notes
Add `packages/sane_crypto`-adjacent capability derivation via HKDF sub-keys from the items key ([SN-CRY-002](security.md#sn-cry-002): view/comment/edit context strings), consumed by `app/lib/sharing/roles.dart` for UI gating and by [SN-SYNC-002](sync.md#sn-sync-002) for op signing/encryption. Implements PRD-CO-031 and docs/architecture/crypto.md (sub-key derivation). Aligns with docs/adr/0007-end-to-end-encryption-and-keys.md.

#### Security & privacy
Threats: TM-E-01 (privilege escalation), TM-S-03 (peer spoofing). Controls: cryptographic capability separation (MASVS-CRYPTO-1, MASVS-AUTH-1), least-privilege authorization (ASVS-V4, OWASP-A01, CWE-284/863). A role change never re-encrypts note bytes, only re-wraps capability keys (envelope payoff). IDs: MASVS-CRYPTO-1, MASVS-AUTH-1, ASVS-V4, OWASP-A01, CWE-284, CWE-863.

#### UX notes
Role labels + capabilities exactly per design §10 (Owner / Can edit / Can comment / Can view). Tool availability changes visibly by role (a viewer sees a read-only editor; a commenter sees the comment composer only). All 17 looks + dark; disabled tools are `Semantics`-labelled "unavailable for your role".

#### Test plan
`packages/sane_crypto/test/share/role_capability_test.dart` (distinct keys, viewer cannot forge edit op), `app/test/sharing/roles_test.dart` (tool gating per role, owner-only controls, ownership transfer, tampered-UI defence-in-depth).

#### Dependencies
[SN-SHR-013](sharing-export.md#sn-shr-013) (link/capability), [SN-CRY-002](security.md#sn-cry-002) (items key + sub-key derivation). Coordinates with [SN-SYNC-002](sync.md#sn-sync-002) and [SN-COL-001](collaboration.md#sn-col-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-016

<a id="sn-shr-016"></a>

**Implement invite-by-email, People management, and the Free 3-person gate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, billing |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-014](sharing-export.md#sn-shr-014), [SN-SHR-015](sharing-export.md#sn-shr-015) |
| Security controls | `MASVS-PRIVACY-2`, `ASVS-V4`, `OWASP-A01`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
The Share overlay lets the Owner **Invite by email** at the current permission, deriving a display name/initials from the email and issuing that person their own wrapped key; the **People** list then lets the Owner change a member's role and remove them (PRD-CO-033/034; design §10 `sendInvite`, toast "Invite sent to <email>"). On **Free**, at `people.length >= 3` an invite MUST open the Upgrade overlay (toast "Free plan: up to 3 people per notebook"), never silently fail (PRD-CO-004/033; design §14). This resolves screens-and-flows Open Question #13: roles are editable and Owner is transferable.

#### Scope
**In:** the invite flow (validate email, derive display name/initials, add member at current perm, mint + deliver their wrapped key via [SN-SHR-015](sharing-export.md#sn-shr-015)); the People-list management (promote/demote role, remove member); the Free 3-person gate routing to Upgrade; pending-invite state.
**Out:** cryptographic revocation on removal ([SN-SHR-017](sharing-export.md#sn-shr-017)); the entitlement source ([SN-BILL-001](billing.md#sn-bill-001)); notifications/mentions ([SN-COL-001](collaboration.md#sn-col-001)); the overlay chrome ([SN-SHR-014](sharing-export.md#sn-shr-014)).

#### Acceptance criteria
- [ ] Inviting a valid email adds the person at the selected permission with a derived name/initials and a per-member wrapped key; toast "Invite sent to <email>".
- [ ] On Free, the 3rd->4th invite opens the Upgrade overlay with toast "Free plan: up to 3 people per notebook"; on Pro it succeeds (design §14).
- [ ] The Owner can promote/demote a member's role and remove a member; a removed member's removal triggers [SN-SHR-017](sharing-export.md#sn-shr-017).
- [ ] Only the Owner sees role-management + remove; non-owners see a read-only People list.
- [ ] An invalid email is rejected inline with a user-safe message (no crash, no silent failure).

#### Technical notes
Add `app/lib/sharing/membership.dart` + `invite.dart`; membership is a CRDT object set (add-wins) in [SN-SYNC-002](sync.md#sn-sync-002), each member carrying a wrapped key from [SN-SHR-015](sharing-export.md#sn-shr-015). The plan/entitlement check reads [SN-BILL-001](billing.md#sn-bill-001) (fail-open to Free). Implements PRD-CO-033/034; design §10/§14. The 3-person gate reads the `EntitlementProvider` contract ([SN-BILL-012](billing.md#sn-bill-012)), fail-open to Free, with a permissive stub until billing lands in M8.

#### Security & privacy
Member emails are PII: never log them (checklist §7), display only derived initials/name where possible, and resolve mentions/invites against notebook membership only (no directory leakage; CWE-200). Authorization for role changes/removal is Owner-only (ASVS-V4, OWASP-A01). IDs: MASVS-PRIVACY-2, ASVS-V4, OWASP-A01, CWE-200.

#### UX notes
Invite input + Invite button and the People list per design §10, including the Free footnote "Free plan: up to 3 people per notebook. Pro removes the limit." Upgrade routing per §13. All 17 looks + dark; a11y-labelled; 44pt/48dp; keyboard-reachable.

#### Test plan
`app/test/sharing/membership_test.dart` (invite adds member + wrapped key, name derivation, Free gate at 3, Pro unlimited, promote/demote/remove, owner-only gating, invalid email rejected), widget test for the gate routing to Upgrade.

#### Dependencies
[SN-SHR-014](sharing-export.md#sn-shr-014) (overlay), [SN-SHR-015](sharing-export.md#sn-shr-015) (per-member keys/roles). The Free 3-person gate reads the `sane_billing` EntitlementProvider contract ([SN-BILL-012](billing.md#sn-bill-012)), fail-open to Free; a permissive stub stands in until billing ships in M8, so SN-BILL-001 is not a scheduling blocker. Coordinates with [SN-SHR-017](sharing-export.md#sn-shr-017) (removal) and [SN-SYNC-002](sync.md#sn-sync-002) (membership set).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-017

<a id="sn-shr-017"></a>

**Implement cryptographic revocation: rotate the content key and re-wrap on removal**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-015](sharing-export.md#sn-shr-015), [SN-CRY-002](security.md#sn-cry-002) |
| Security controls | `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `ASVS-V4`, `ASVS-V6`, `OWASP-A01`, `OWASP-A02`, `CWE-284`, `CWE-522` |
| Extra labels | agent-ready, innovation |

#### Context
Revocation MUST be cryptographic, not cosmetic: removing a member, turning off the link, or "Stop sharing" MUST rotate the notebook content key and re-wrap it for the remaining members (PRD-CO-035; docs/architecture/file-format.md §6; docs/security/secure-coding-checklist.md §3.1 "note revocation by content-key rotation"). After revocation the removed member's client can no longer decrypt new segments. Content authored before revocation that the ex-member already downloaded cannot be un-seen — the UI MUST state this honestly. This is the guarantee that "unshare" actually means something in a zero-server design.

#### Scope
**In:** the key-rotation + re-wrap flow triggered by member removal ([SN-SHR-016](sharing-export.md#sn-shr-016)), link toggle-off ([SN-SHR-014](sharing-export.md#sn-shr-014)), expiry ([SN-SHR-018](sharing-export.md#sn-shr-018)) and "Stop sharing"; issuing new wrapped items keys to remaining members; the honest "already-downloaded content cannot be un-seen" UI copy; a revocation regression test.
**Out:** the underlying key hierarchy/rotation primitive in `sane_crypto` ([SN-CRY-002](security.md#sn-cry-002)); role derivation ([SN-SHR-015](sharing-export.md#sn-shr-015)); the collaboration transport that denies the ex-member's next sync ([SN-COL-001](collaboration.md#sn-col-001)).

#### Acceptance criteria
- [ ] Removing a member rotates the content/items key and re-wraps it for all remaining members; the removed member's client cannot decrypt segments written after removal (verified end-to-end).
- [ ] Turning off "Anyone with the link" invalidates the old link by rotating the key; re-opening the old link is denied.
- [ ] "Stop sharing" rotates the key and revokes all non-owner access.
- [ ] Rotation re-wraps keys only — it never re-encrypts existing note bytes (envelope payoff).
- [ ] The UI states honestly that content the ex-member already downloaded cannot be retracted.
- [ ] A regression test proves post-revocation decrypt failure for the removed identity.

#### Technical notes
Add `app/lib/sharing/revocation.dart` orchestrating the `sane_crypto` items-key rotation + re-wrap ([SN-CRY-002](security.md#sn-cry-002)) and writing the new wrapped keys into the membership object ([SN-SYNC-002](sync.md#sn-sync-002)). Old segments stay under the old key (already seen); new segments use the rotated key. Implements PRD-CO-035; docs/architecture/crypto.md rotation, checklist §3.1.

#### Security & privacy
This is the confidentiality boundary of sharing. Threats: TM-S-03 (removed peer retaining access), TM-I-02 (key exposure). Controls: content-key rotation + re-wrap (MASVS-CRYPTO-1/2, ASVS-V6), least-privilege authorization for who may revoke — Owner only (ASVS-V4, OWASP-A01, CWE-284), no key material in logs (CWE-522, checklist §7). Fail-closed if rotation cannot complete (do not leave the old key valid silently). IDs: MASVS-CRYPTO-1, MASVS-CRYPTO-2, ASVS-V4, ASVS-V6, OWASP-A01/A02, CWE-284/522.

#### UX notes
On remove/stop-sharing, a confirm dialog states "New activity will be hidden from them; anything already downloaded can't be taken back." Link toggle-off shows the field as disabled + "Link turned off — the old link no longer opens this notebook." All 17 looks + dark; a11y-labelled destructive-action styling.

#### Test plan
`app/test/security/revocation_test.dart` (post-removal decrypt fails, link toggle-off denies old link, re-wrap only — no note re-encrypt, fail-closed on partial rotation), integration test with two identities in `app/integration_test/share_revocation_test.dart`.

#### Dependencies
[SN-SHR-015](sharing-export.md#sn-shr-015) (per-member keys/roles), [SN-CRY-002](security.md#sn-cry-002) (rotation primitive). Consumed by [SN-SHR-014](sharing-export.md#sn-shr-014)/[SN-SHR-016](sharing-export.md#sn-shr-016)/[SN-SHR-018](sharing-export.md#sn-shr-018); coordinates with [SN-COL-001](collaboration.md#sn-col-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-018

<a id="sn-shr-018"></a>

**Add expiring share links with an exp claim in the wrapped-key envelope**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-013](sharing-export.md#sn-shr-013), [SN-SHR-017](sharing-export.md#sn-shr-017) |
| Security controls | `MASVS-CRYPTO-1`, `ASVS-V4`, `OWASP-A01`, `CWE-613` |
| Extra labels | agent-ready |

#### Context
A share link must support an optional expiry (Never / 24 h / 7 days / 30 days / custom date); at expiry the key is rotated so the link stops decrypting (PRD-CO-037). Because there is no authoritative server, expiry is enforced two ways: client-side on the sharer's devices at next sync (rotate the key), **and** by embedding an `exp` claim in the wrapped-key envelope that conformant clients refuse after. The UI MUST warn honestly that a malicious modified client cannot be forced to forget an already-downloaded key.

#### Scope
**In:** the expiry option in the share model + overlay; embedding `exp` in the wrapped-key envelope; the sharer-side rotation at/after expiry (reusing [SN-SHR-017](sharing-export.md#sn-shr-017)); conformant-client refusal past `exp`; the "Link expired" state and the honest warning copy.
**Out:** the base link model ([SN-SHR-013](sharing-export.md#sn-shr-013)); the rotation primitive ([SN-SHR-017](sharing-export.md#sn-shr-017)); link-activity view ([SN-SHR-019](sharing-export.md#sn-shr-019)).

#### Acceptance criteria
- [ ] Setting a 24 h expiry: after 24 h a fresh client opening the link is denied; the sharer sees "Link expired".
- [ ] The expiry options are Never / 24 h / 7 days / 30 days / custom date.
- [ ] The wrapped-key envelope carries an `exp` claim; a conformant client refuses to use the key past `exp`.
- [ ] At/after expiry the sharer's device rotates the key at next sync (reusing [SN-SHR-017](sharing-export.md#sn-shr-017)) so the link stops decrypting new content.
- [ ] The UI warns that an already-downloaded key on a modified client cannot be force-forgotten.

#### Technical notes
Extend `packages/sane_sync/lib/src/share/share_link.dart` ([SN-SHR-013](sharing-export.md#sn-shr-013)) with an `exp` field in the envelope, and schedule the sharer-side rotation via [SN-SHR-017](sharing-export.md#sn-shr-017). Client refusal checks `exp` against the device clock (with skew tolerance) before decrypt. Implements PRD-CO-037.

#### Security & privacy
Threats: TM-S-04 (stale link reuse). Controls: exp-bound capability (MASVS-CRYPTO-1, CWE-613 insufficient session/link expiration), authorization re-check (ASVS-V4, OWASP-A01), and the honest limitation disclosure (privacy-by-design). Enforce fail-closed: an unreadable/absent exp is treated as expired, not as "never". IDs: MASVS-CRYPTO-1, ASVS-V4, OWASP-A01, CWE-613.

#### UX notes
An "Link expires" picker in the Share overlay (Never default unless the posture flag says otherwise), an "Expires in 23 h" chip, and the "Link expired — turn it back on to reshare" state. Honest warning line near the picker. All 17 looks + dark; a11y-labelled; keyboard-reachable.

#### Test plan
`packages/sane_sync/test/share/share_expiry_test.dart` (exp in envelope, conformant refusal past exp, absent-exp treated as expired), `app/test/sharing/expiry_flow_test.dart` (24 h denies fresh client, rotation scheduled, "Link expired" state).

#### Dependencies
[SN-SHR-013](sharing-export.md#sn-shr-013) (link model), [SN-SHR-017](sharing-export.md#sn-shr-017) (rotation on expiry).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-019

<a id="sn-shr-019"></a>

**Add the link-activity view and scoped single-page or page-range shares**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-013](sharing-export.md#sn-shr-013), [SN-SHR-014](sharing-export.md#sn-shr-014) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-CRYPTO-1`, `ASVS-V4`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
Two refinements round out sharing. First, a **link-activity view** shows the Owner which invited people have accessed the notebook and which invites are pending; anonymous "anyone with link" opens may be counted only in aggregate and MUST NOT deanonymise viewers (PRD-CO-038). Second, sharing a **single page** or a **page range** (not just the whole notebook) produces a scoped capability that decrypts only those pages (PRD-CO-039) — a recipient of a single-page share cannot decrypt other pages. Both keep the zero-knowledge and privacy posture intact.

#### Scope
**In:** the Owner-only link-activity list (invited-member last-seen + pending invites; anonymous opens aggregate-only); the scoped-share capability (wrap only the selected pages' keys) and its picker; enforcing that a scoped recipient cannot decrypt out-of-scope pages.
**Out:** the base link/roles model ([SN-SHR-013](sharing-export.md#sn-shr-013)/[SN-SHR-015](sharing-export.md#sn-shr-015)); analytics/telemetry (none — computed locally); the overlay chrome ([SN-SHR-014](sharing-export.md#sn-shr-014)).

#### Acceptance criteria
- [ ] The Owner sees invited-member last-seen and pending invites; no PII or identity is shown for anonymous "anyone with link" viewers (aggregate count only).
- [ ] A single-page share yields a capability that decrypts only that page; the recipient cannot decrypt other pages (verified).
- [ ] A page-range share decrypts only the range.
- [ ] Activity data is computed on-device from local/sync data; nothing is uploaded to a Sane server.
- [ ] Toggling scope from "Whole notebook" to "This page" updates the minted capability accordingly.

#### Technical notes
Extend membership/activity in [SN-SYNC-002](sync.md#sn-sync-002) (last-seen is derived from sync watermarks, not a tracking beacon) and the scoped-key wrapping in [SN-SHR-013](sharing-export.md#sn-shr-013)/[SN-CRY-002](security.md#sn-cry-002) (per-page items sub-keys). Add `app/lib/sharing/link_activity.dart` + a scope picker in the overlay. Implements PRD-CO-038/039.

#### Security & privacy
Threats: TM-P-06/08 (viewer deanonymisation), TM-I-04 (over-broad key grant). Controls: aggregate-only anonymous counts (MASVS-PRIVACY-2, CWE-200), least-scope capability keys so a page share cannot read other pages (MASVS-CRYPTO-1, ASVS-V4). No new persistent identifier for viewers. IDs: MASVS-PRIVACY-2, MASVS-CRYPTO-1, ASVS-V4, CWE-200.

#### UX notes
An "Activity" section under the People list (Owner-only): "Kabir — opened 2h ago", "Ananya — invite pending", "12 anonymous opens". A scope segmented control (This page / Pages A-B / Whole notebook) near the link field. All 17 looks + dark; a11y-labelled; keyboard-reachable.

#### Test plan
`app/test/sharing/link_activity_test.dart` (owner-only, anonymous aggregate-only, no PII), `packages/sane_sync/test/share/scoped_share_test.dart` (single-page/range capability cannot decrypt out-of-scope pages).

#### Dependencies
[SN-SHR-013](sharing-export.md#sn-shr-013) (link model), [SN-SHR-014](sharing-export.md#sn-shr-014) (overlay). Coordinates with [SN-CRY-002](security.md#sn-cry-002) (per-page sub-keys) and [SN-SYNC-002](sync.md#sn-sync-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-020

<a id="sn-shr-020"></a>

**Add the default share-posture build-time flag (link-off/Can-view vs design default)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, privacy, security |
| Size | S |
| SDLC | design |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-014](sharing-export.md#sn-shr-014) |
| Security controls | `MASVS-PRIVACY-2`, `ASVS-V4`, `OWASP-A01`, `CWE-1188` |
| Extra labels | needs-decision |

#### Context
The design default is link-**on** + "Can edit" (docs/design/screens-and-flows.md §10). The PRD **recommends** shipping with default link **off** + "Can view" to avoid accidental public-edit exposure of student notes, but defers the decision to the maintainer — and requires that whichever ships, the safer default is a **build-time configurable flag** (PRD-CO-036; CLAUDE.md §13 "Default share posture"). This issue implements the flag and the in-product first-share disclosure; the actual default value is a maintainer decision (`needs-decision`).

#### Scope
**In:** a compile-time flag (`--dart-define=SANE_SHARE_DEFAULT=link-off-view|link-on-edit`) that sets the Share overlay's initial `linkOn` and `perm`; the in-product first-share note stating the active default; a documented decision record placeholder.
**Out:** the overlay chrome ([SN-SHR-014](sharing-export.md#sn-shr-014)); role enforcement ([SN-SHR-015](sharing-export.md#sn-shr-015)); the actual maintainer choice (deferred).

#### Acceptance criteria
- [ ] The initial `linkOn`/`perm` of the Share overlay is driven by the build-time flag, not hardcoded.
- [ ] Both values are supported: link-off + "Can view" (recommended) and link-on + "Can edit" (design default).
- [ ] On first share, the UI states the active default in-product (PRD-CO-036 "documented in-product on first share").
- [ ] The default is documented in an ADR/threat-model note; the issue carries `needs-decision` until the maintainer chooses.
- [ ] Changing the flag flips the default without any other code change.

#### Technical notes
Add `app/lib/sharing/share_posture.dart` reading the `--dart-define` (overview §7.1 flavour/define pattern) and feeding [SN-SHR-014](sharing-export.md#sn-shr-014). Record the pending choice in docs/adr (new ADR or a note in docs/adr/0013) and docs/security/threat-model.md. Implements PRD-CO-036.

#### Security & privacy
This is a security-posture default (over-permissive default = accidental exposure). Threats: TM-P-06 (unintended disclosure). Controls: fail-safe default toward least privilege (ASVS-V4, OWASP-A01, CWE-1188 insecure default), honest in-product disclosure (MASVS-PRIVACY-2). The safer posture (link-off/view) is the recommended default. IDs: MASVS-PRIVACY-2, ASVS-V4, OWASP-A01, CWE-1188.

#### UX notes
A one-line note on the first share ("New shares start private — turn on the link to share widely" or, if the design default ships, "This link is on and set to Can edit"). All 17 looks + dark; a11y-labelled.

#### Test plan
`app/test/sharing/share_posture_test.dart` (flag drives initial linkOn/perm for both values, first-share disclosure shown). Manual verification of both build defines.

#### Dependencies
[SN-SHR-014](sharing-export.md#sn-shr-014) (overlay initial state).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-021

<a id="sn-shr-021"></a>

**Build the import pipeline: entry points, isolation, and per-import report**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, library |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-4`, `ASVS-V5`, `OWASP-A08`, `CWE-20`, `CWE-22` |
| Extra labels | agent-ready |

#### Context
Import kills switching cost: it must be reachable from Library ("Import" alongside "Import PDF"), the OS share sheet / file-open handlers, and web file drop; imports create new notebooks (or append pages) and never overwrite existing notebooks (PRD-CO-070). Every importer runs off the UI isolate into a **new isolated notebook** and produces an **import report** listing what was preserved vs approximated, with unsupported elements flattened to image, never silently discarded (PRD-CO-078; checklist §1). This issue builds the shared pipeline that the per-format importers plug into; format-specific parsing is delegated to sibling issues.

#### Scope
**In:** the import entry points (Library button, share-target receive, file-open/open-with, web drop); the `ImportJob` runner (off-isolate, into a fresh isolated notebook); the `ImportReport {preserved, approximated, flattened, unsupported}` model + UI; format detection/dispatch to the registered importers; append-vs-new-notebook choice.
**Out:** the per-format parsers ([SN-SHR-022](sharing-export.md#sn-shr-022)..[SN-SHR-026](sharing-export.md#sn-shr-026)); the security-hardening gate details ([SN-SHR-027](sharing-export.md#sn-shr-027)); the PDF import path ([SN-PDF-006](pdf.md#sn-pdf-006), referenced); OS share-target *registration* ([SN-NOTF-001](notifications.md#sn-notf-001)).

#### Acceptance criteria
- [ ] Dropping/opening a supported file creates a **new** notebook with a progress indicator; an existing notebook is never overwritten.
- [ ] Import is reachable from Library, the OS share sheet/file-open, and web file drop.
- [ ] Every import produces an import report listing preserved / approximated / flattened / unsupported elements (e.g. "12 pages, 3,410 strokes, 1 audio track; 2 unsupported widgets flattened to image").
- [ ] Unsupported elements are flattened to image, never silently discarded.
- [ ] Parsing runs off the UI isolate; a hostile large file adds no jank to the editor (no frame > 16.7 ms).
- [ ] Import into a new notebook is fully offline; no note bytes leave the device (PRD-CO-079).

#### Technical notes
Add `app/lib/import/import_pipeline.dart` + `import_report.dart`; run parsers via `Isolate.run` writing into a new notebook through [SN-CORE-004](storage.md#sn-core-004) (drift + blob store). Format detection by sniffed MIME/magic, not extension (checklist §1). Register importers ([SN-SHR-022](sharing-export.md#sn-shr-022)..[SN-SHR-026](sharing-export.md#sn-shr-026)). Share-target receive coordinates with [SN-NOTF-001](notifications.md#sn-notf-001). Implements PRD-CO-070/078.

#### Security & privacy
Every imported byte is hostile (checklist §1): validate MIME/size/schema before use, parse off-isolate with bounded memory, canonicalise/confine any path from file content, and import into a new isolated notebook so no path from content can overwrite an existing note (TM-T-06, CWE-22). Deserialize into explicit validated models, never arbitrary types (MASVS-CODE-4, OWASP-A08). The deep hardening (caps, fuzzing) is [SN-SHR-027](sharing-export.md#sn-shr-027). IDs: MASVS-PLATFORM-1, MASVS-CODE-4, ASVS-V5, OWASP-A08, CWE-20, CWE-22.

#### UX notes
Library "Import" entry + a receive flow from the share sheet; a progress sheet during import; the import report shown as a reviewable summary ("Here's what we brought over") with a "Some things were flattened to image" note when lossy. All 17 looks + dark; a11y-labelled; keyboard-reachable on web; drag-drop target on web has a visible focus/hover state.

#### Test plan
`app/test/import/import_pipeline_test.dart` (new-notebook-not-overwrite, MIME dispatch, off-isolate, report contents, flatten-not-drop), `app/integration_test/import_entry_points_test.dart` (Library / share-target / web drop).

#### Dependencies
[SN-CORE-004](storage.md#sn-core-004) (drift + blob store for the new notebook). Coordinates with [SN-PDF-006](pdf.md#sn-pdf-006) (PDF import), [SN-NOTF-001](notifications.md#sn-notf-001) (share-target), and hardened by [SN-SHR-027](sharing-export.md#sn-shr-027).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-022

<a id="sn-shr-022"></a>

**Implement Markdown import (front-matter, wiki-links, GFM, embedded images)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, text |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-021](sharing-export.md#sn-shr-021) |
| Security controls | `MASVS-PLATFORM-1`, `ASVS-V5`, `CWE-20`, `CWE-79` |
| Extra labels | agent-ready |

#### Context
Markdown import is the Obsidian/Notion escape hatch. It MUST parse CommonMark + GFM (tables, task lists, footnotes), map YAML front-matter to note properties/tags, resolve `[[wikilinks]]` and standard links to backlinks, and import referenced images as embedded blobs; unknown HTML passes through as a raw block rather than being dropped (PRD-CO-076). An Obsidian vault Markdown file must import with tags, backlinks and images intact, and it round-trips with the Markdown exporter ([SN-SHR-006](sharing-export.md#sn-shr-006)).

#### Scope
**In:** a Markdown importer registered into [SN-SHR-021](sharing-export.md#sn-shr-021): CommonMark + GFM block/inline parsing to typed blocks (headings, lists, tables, task-lists, quotes, code, callouts), front-matter -> properties/tags, `[[wikilinks]]`/links -> backlinks, referenced images -> blobs, unknown HTML -> raw block (sanitised).
**Out:** the pipeline/report ([SN-SHR-021](sharing-export.md#sn-shr-021)); Notion's specific export shape ([SN-SHR-024](sharing-export.md#sn-shr-024)); Markdown export ([SN-SHR-006](sharing-export.md#sn-shr-006)); the backlinks/graph model ([SN-AI-001](ai.md#sn-ai-001)/core).

#### Acceptance criteria
- [ ] An Obsidian vault Markdown file imports with tags, backlinks and images intact.
- [ ] GFM tables and `- [ ]`/`- [x]` task lists map to Sane tables and checkboxes.
- [ ] `[[wikilinks]]` and standard links resolve to backlinks; a broken link imports as an unresolved-link placeholder, not a crash.
- [ ] Referenced images import as embedded blobs (path-confined; no fetch of remote images without consent).
- [ ] Unknown/raw HTML is preserved as a sanitised raw block, never silently dropped.
- [ ] Round-trip with [SN-SHR-006](sharing-export.md#sn-shr-006) preserves headings, lists, links and image references.

#### Technical notes
Add `app/lib/import/markdown_import.dart` using a maintained, pinned CommonMark/GFM parser (justify per checklist §10). Normalise text to NFC; sanitise any embedded HTML before storing/rendering (checklist §6). Write blocks/blobs via [SN-SHR-021](sharing-export.md#sn-shr-021) -> [SN-CORE-004](storage.md#sn-core-004). Implements PRD-CO-076.

#### Security & privacy
Markdown/HTML is untrusted: sanitise embedded HTML (no script, no remote auto-fetch) before it can reach any render surface (CWE-79, checklist §6), confine referenced-image paths and never auto-fetch remote URLs without explicit consent (CWE-20), validate/bound field lengths (ASVS-V5). IDs: MASVS-PLATFORM-1, ASVS-V5, CWE-20, CWE-79.

#### UX notes
Reachable from the Import entry ([SN-SHR-021](sharing-export.md#sn-shr-021)); the import report notes any raw-HTML blocks or unresolved links. All 17 looks + dark; imported content is immediately editable. A11y: imported images get alt from any Markdown alt attribute.

#### Test plan
`app/test/import/markdown_import_test.dart` (GFM tables/task-lists, front-matter tags, wikilink/backlink resolution, image-as-blob, raw-HTML sanitised-not-dropped), round-trip test with [SN-SHR-006](sharing-export.md#sn-shr-006), malicious-HTML sanitisation negative test.

#### Dependencies
[SN-SHR-021](sharing-export.md#sn-shr-021) (import pipeline). Round-trips with [SN-SHR-006](sharing-export.md#sn-shr-006); hardened by [SN-SHR-027](sharing-export.md#sn-shr-027).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-023

<a id="sn-shr-023"></a>

**Implement image import with on-device OCR and camera-scan auto-crop**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-021](sharing-export.md#sn-shr-021), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `ASVS-V5`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
Image import (JPG/PNG/HEIC/WEBP) places an image on a page (or one image per page for a batch) and runs on-device OCR to attach a searchable/alt-text transcript (PRD-CO-077). Camera-scan import auto-crops and straightens (design Import sources "Scan with camera — Auto-crop & straighten"). An imported photo of a page becomes searchable by its printed text and carries alt text — a genuine accessibility and search win that many competitors lack.

#### Scope
**In:** an image importer registered into [SN-SHR-021](sharing-export.md#sn-shr-021): decode JPG/PNG/HEIC/WEBP with resource caps, strip EXIF (privacy), place as an image object (batch -> one image per page), run on-device OCR ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)) to attach a searchable transcript + alt text; camera-scan auto-crop/straighten.
**Out:** the OCR engine itself ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)); the pipeline/report ([SN-SHR-021](sharing-export.md#sn-shr-021)); the image-object editing model ([SN-MED-001](images-media.md#sn-med-001)); the search index ([SN-SRCH-001](search.md#sn-srch-001)).

#### Acceptance criteria
- [ ] An imported photo of a page is searchable by its printed text and has non-empty alt text.
- [ ] JPG/PNG/HEIC/WEBP decode with dimension/size caps; an oversized or malformed image fails closed with a user-safe error.
- [ ] EXIF metadata (incl. GPS) is stripped before the image is stored (privacy).
- [ ] Camera-scan import auto-crops and straightens the page.
- [ ] OCR runs on-device; any cloud OCR escalation is per-request opt-in with the data-leaves-device banner (decision 6).
- [ ] A batch of images imports as one image per page with a progress indicator.

#### Technical notes
Add `app/lib/import/image_import.dart` using platform image decoders (checklist §1 "prefer maintained decoders") with caps; EXIF strip before store; OCR via [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (Apple Vision / ML Kit / Tesseract per platform); auto-crop via the scan pipeline ([SN-MED-001](images-media.md#sn-med-001)). Implements PRD-CO-077.

#### Security & privacy
Images are untrusted: cap dimensions/size before decode, decode off the UI isolate, fail closed on malformed input (CWE-20, checklist §1). Strip EXIF/GPS (MASVS-PRIVACY-1). OCR on-device by default; cloud opt-in only with the banner (TM-I-08). Recognised text is note content — never logged (checklist §7). IDs: MASVS-PRIVACY-1, MASVS-PLATFORM-1, ASVS-V5, CWE-20.

#### UX notes
Reachable from Import ([SN-SHR-021](sharing-export.md#sn-shr-021)) and "Scan with camera". A per-image OCR indicator; the on-device recognition posture is visible; the import report notes how many pages were recognised. All 17 looks + dark; imported images get alt text for screen readers (PRD-CO-310).

#### Test plan
`app/test/import/image_import_test.dart` (format decode + caps, EXIF strip, batch one-per-page, on-device OCR default, malformed fails closed), OCR-searchability integration test.

#### Dependencies
[SN-SHR-021](sharing-export.md#sn-shr-021) (pipeline), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (OCR). Coordinates with [SN-MED-001](images-media.md#sn-med-001) (scan/auto-crop) and [SN-SRCH-001](search.md#sn-srch-001) (index); hardened by [SN-SHR-027](sharing-export.md#sn-shr-027).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-024

<a id="sn-shr-024"></a>

**Implement Notion import from Markdown+CSV and HTML zip exports**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, text |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-022](sharing-export.md#sn-shr-022) |
| Security controls | `MASVS-PLATFORM-1`, `ASVS-V5`, `CWE-20`, `CWE-79` |
| Extra labels | agent-ready |

#### Context
Notion is a major source to migrate from. Sane must import Notion's **Markdown+CSV** and **HTML (zip)** exports (docs research notion.md), mapping: pages -> notes (nested pages -> sections), Markdown blocks -> typed blocks, checkboxes/toggles/callouts/quotes/code -> equivalents, database CSV -> tables + tags (Select/Multi-select -> tags, Status -> property), inline `[[`/`@page` links -> backlinks, KaTeX `$$` -> math blocks; images/attachments import as blobs (PRD-CO-074). A Notion workspace export must import with its page hierarchy, checkboxes, tables-as-tags and working internal links. Notion export is the user's own data, so no legality gate applies (unlike proprietary competitor bundles).

#### Scope
**In:** a Notion importer registered into [SN-SHR-021](sharing-export.md#sn-shr-021), reusing the Markdown engine ([SN-SHR-022](sharing-export.md#sn-shr-022)) for block parsing and adding: the zip layout walker (nested-page -> section hierarchy), CSV database -> tables + tags mapping, KaTeX `$$` -> math blocks, Notion internal-link resolution across the export.
**Out:** the base Markdown parser ([SN-SHR-022](sharing-export.md#sn-shr-022)); the pipeline/report ([SN-SHR-021](sharing-export.md#sn-shr-021)); math rendering ([SN-SHP-001](shapes-diagrams.md#sn-shp-001)/core); zip-bomb hardening ([SN-SHR-027](sharing-export.md#sn-shr-027)).

#### Acceptance criteria
- [ ] A Notion Markdown+CSV export imports with page hierarchy (nested pages -> sections), checkboxes, and database CSV mapped to tables + tags (Select/Multi-select -> tags, Status -> property).
- [ ] Internal `@page`/link references resolve to backlinks across the imported set; unresolved links import as placeholders.
- [ ] KaTeX `$$…$$` blocks import as Sane math blocks.
- [ ] The HTML-zip export path imports with equivalent structure (sanitised HTML).
- [ ] Images/attachments import as embedded blobs (path-confined).

#### Technical notes
Add `app/lib/import/notion_import.dart` composing [SN-SHR-022](sharing-export.md#sn-shr-022) for Markdown blocks and adding the Notion-specific zip/CSV/link mapping. Walk the zip via the pipeline's confined extractor ([SN-SHR-027](sharing-export.md#sn-shr-027) caps). Sanitise HTML from the HTML-zip path (checklist §6). Implements PRD-CO-074.

#### Security & privacy
Zip + HTML + CSV are untrusted: extract with entry/size caps and path confinement (via [SN-SHR-027](sharing-export.md#sn-shr-027); CWE-22), sanitise HTML (CWE-79, checklist §6), validate CSV field bounds (ASVS-V5, CWE-20), no remote auto-fetch. IDs: MASVS-PLATFORM-1, ASVS-V5, CWE-20, CWE-79.

#### UX notes
Reachable from Import ([SN-SHR-021](sharing-export.md#sn-shr-021)); the import report notes page/section counts, tables-as-tags conversions, and any unresolved links. All 17 looks + dark; imported content is editable; math blocks render inline.

#### Test plan
`app/test/import/notion_import_test.dart` (nested-page -> section, CSV -> tables+tags, KaTeX -> math, internal-link resolution, HTML-zip path sanitised, images-as-blob), fixture Notion export in `test/fixtures/notion/`.

#### Dependencies
[SN-SHR-022](sharing-export.md#sn-shr-022) (Markdown engine), [SN-SHR-021](sharing-export.md#sn-shr-021) (pipeline). Hardened by [SN-SHR-027](sharing-export.md#sn-shr-027).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-025

<a id="sn-shr-025"></a>

**Implement Goodnotes and Notability import (tier-A best-effort + tier-B PDF fallback)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, pdf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-021](sharing-export.md#sn-shr-021), [SN-PDF-006](pdf.md#sn-pdf-006) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-4`, `ASVS-V5`, `OWASP-A08`, `CWE-20`, `CWE-22` |
| Extra labels | needs-decision, innovation |

#### Context
Goodnotes (`.goodnotes`, legacy v5/v6) and Notability (`.note`, legacy `.ntb`) are the biggest sources students switch from. The strategy is two tiers: **tier-A faithful** (pages, strokes as editable ink, embedded PDFs/images, and — for Notability — **audio + audio-ink timestamps** mapped to Sane's audio-ink model) where the container is readable and legally reverse-engineerable; and **tier-B fallback** (import the source's own PDF export as annotatable pages + OCR), which is always available so no user is blocked (PRD-CO-071/072). Preserving Notability's audio-ink timestamps is a headline win over rivals. Tier-A extraction of proprietary/DRM-bearing formats is legally gated — hence `needs-decision` (CLAUDE.md §13 "competitor tier-A import legality").

#### Scope
**In:** the tier-B PDF-export fallback for both sources (always available, via [SN-PDF-006](pdf.md#sn-pdf-006) + OCR); best-effort tier-A extraction of pages/strokes/embedded PDFs/images where the container is readable; Notability audio + audio-ink timestamp mapping to Sane's audio-ink anchors; the import report flagging tier-A vs tier-B and any lossy conversions.
**Out:** the pipeline/report ([SN-SHR-021](sharing-export.md#sn-shr-021)); PDF import internals ([SN-PDF-006](pdf.md#sn-pdf-006)); the audio-ink anchor model ([SN-AUD-001](audio.md#sn-aud-001)); the legality decision (deferred, `needs-decision`); zip/bundle hardening ([SN-SHR-027](sharing-export.md#sn-shr-027)).

#### Acceptance criteria
- [ ] A Goodnotes/Notability **PDF export** imports as annotatable pages + on-device OCR (tier-B, always works).
- [ ] Where the container is readable, strokes import as editable ink and embedded PDFs stay vector.
- [ ] An imported Notability note plays its audio; where timestamps recover, tap-to-seek (audio-ink) works.
- [ ] The import report states tier-A vs tier-B and lists anything flattened/approximated.
- [ ] Tier-A extraction of a DRM-bearing/reverse-engineering-restricted format stays disabled until the maintainer legality decision is recorded (`needs-decision`); tier-B is unaffected.
- [ ] All parsing is off-isolate and fails closed on malformed input.

#### Technical notes
Add `app/lib/import/goodnotes_import.dart` + `notability_import.dart` registered into [SN-SHR-021](sharing-export.md#sn-shr-021). Tier-B reuses [SN-PDF-006](pdf.md#sn-pdf-006) + [SN-HWR-001](ocr-hwr.md#sn-hwr-001) OCR. Tier-A parses the bundle container (best-effort, behind a flag pending legality); Notability audio maps to [SN-AUD-001](audio.md#sn-aud-001) audio-ink anchors. Document format-access/legality per source (PRD-CO-079 verify). Implements PRD-CO-071/072.

#### Security & privacy
Competitor bundles are hostile archives: extract with entry/size caps + path confinement (via [SN-SHR-027](sharing-export.md#sn-shr-027); CWE-22), deserialize into explicit validated models (MASVS-CODE-4, OWASP-A08), fail closed on malformed input (CWE-20). Do not send bundle content to any cloud converter (PRD-CO-079). IDs: MASVS-PLATFORM-1, MASVS-CODE-4, ASVS-V5, OWASP-A08, CWE-20, CWE-22.

#### UX notes
Reachable from Import ([SN-SHR-021](sharing-export.md#sn-shr-021)); a clear "Best we could bring over" report distinguishing faithful ink vs a flattened PDF page. Notability audio imports show the audio bar with working tap-to-seek. All 17 looks + dark. `needs-decision` note surfaced to the maintainer, not the end user.

#### Test plan
`app/test/import/goodnotes_import_test.dart` + `notability_import_test.dart` (tier-B PDF path, tier-A stroke extraction where readable, Notability audio-ink tap-to-seek, report tier labelling, malformed fails closed), fixtures under `test/fixtures/competitors/`.

#### Dependencies
[SN-SHR-021](sharing-export.md#sn-shr-021) (pipeline), [SN-PDF-006](pdf.md#sn-pdf-006) (PDF import for tier-B). Coordinates with [SN-AUD-001](audio.md#sn-aud-001) (audio-ink), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (OCR); hardened by [SN-SHR-027](sharing-export.md#sn-shr-027). Maintainer legality decision pending (CLAUDE.md §13).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-026

<a id="sn-shr-026"></a>

**Implement OneNote import (PDF/.docx tier-B and Graph/.one tier-A, keep PDFs vector)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, pdf |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-021](sharing-export.md#sn-shr-021), [SN-PDF-006](pdf.md#sn-pdf-006) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-4`, `ASVS-V5`, `OWASP-A08`, `CWE-611`, `CWE-22` |
| Extra labels | needs-decision, needs-credentials |

#### Context
OneNote users migrate via **exported PDF/Word (.docx)** (tier-B, always) and, where available, via the **Microsoft Graph** OneNote API export or `.onepkg`/`.one` (tier-A best-effort), mapping Notebook->Notebook, Section->subject/section, Page->page, ink->ink, tags/to-dos->checkboxes/tags (PRD-CO-073). Critically, OneNote rasterises imported PDFs; Sane MUST NOT — imported PDFs stay **true vector pages** (research onenote.md §5; a genuine "beat them on real PDF annotation" win). The Graph path needs maintainer OAuth credentials (`needs-credentials`) and the tier-A format access is legality-gated (`needs-decision`); tier-B is unblocked.

#### Scope
**In:** the tier-B PDF/.docx import (always available, via [SN-PDF-006](pdf.md#sn-pdf-006) + a .docx reader) mapping structure to sections/checkboxes and keeping imported PDFs vector; best-effort tier-A via Graph export / `.one`/`.onepkg` (behind credentials + legality); the import report.
**Out:** the pipeline/report ([SN-SHR-021](sharing-export.md#sn-shr-021)); PDF import internals ([SN-PDF-006](pdf.md#sn-pdf-006)); the Graph OAuth client credentials (maintainer, `needs-credentials`); the legality decision (`needs-decision`); archive hardening ([SN-SHR-027](sharing-export.md#sn-shr-027)).

#### Acceptance criteria
- [ ] A OneNote **PDF/.docx export** imports with section structure and checkboxes; imported PDFs remain **vector** (not rasterised).
- [ ] Section->subject/section and Page->page structure is preserved; to-dos/tags map to checkboxes/tags.
- [ ] The tier-A Graph/`.one` path is gated behind maintainer OAuth credentials + the legality decision; tier-B works without them.
- [ ] The import report lists preserved vs approximated structure.
- [ ] All parsing is off-isolate and fails closed on malformed input; XML entities are safely handled (no XXE).

#### Technical notes
Add `app/lib/import/onenote_import.dart` registered into [SN-SHR-021](sharing-export.md#sn-shr-021). Tier-B: [SN-PDF-006](pdf.md#sn-pdf-006) for PDF (kept vector) + a pinned .docx (OOXML) reader (justify per checklist §10) with a hardened XML parser (disable external entities; CWE-611). Tier-A: Microsoft Graph OneNote export (needs OAuth client id/secret via CI secrets, never committed) / `.one` container best-effort. Implements PRD-CO-073.

#### Security & privacy
OOXML/`.onepkg` are zip+XML: disable external entity resolution (CWE-611 XXE), extract with caps + path confinement (via [SN-SHR-027](sharing-export.md#sn-shr-027); CWE-22), deserialize into explicit models (MASVS-CODE-4, OWASP-A08), fail closed (ASVS-V5). Graph OAuth uses PKCE + state + nonce; tokens in `sane_secure_store`; no secrets committed (checklist §0/§4). IDs: MASVS-PLATFORM-1, MASVS-CODE-4, ASVS-V5, OWASP-A08, CWE-611, CWE-22.

#### UX notes
Reachable from Import ([SN-SHR-021](sharing-export.md#sn-shr-021)); a report emphasising "your PDFs stayed vector and annotatable". The tier-A Graph sign-in is offered only when credentials are configured; otherwise only tier-B is shown (never a dead button). All 17 looks + dark.

#### Test plan
`app/test/import/onenote_import_test.dart` (PDF-stays-vector, .docx section/checkbox mapping, XXE-safe XML, malformed fails closed, tier-A gated when no creds), fixtures under `test/fixtures/competitors/onenote/`.

#### Dependencies
[SN-SHR-021](sharing-export.md#sn-shr-021) (pipeline), [SN-PDF-006](pdf.md#sn-pdf-006) (vector PDF import). Hardened by [SN-SHR-027](sharing-export.md#sn-shr-027). Maintainer OAuth credentials + legality decision pending (CLAUDE.md §13).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-027

<a id="sn-shr-027"></a>

**Harden competitor and bundle import against malicious files**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-021](sharing-export.md#sn-shr-021) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-4`, `MASVS-STORAGE-1`, `ASVS-V5`, `OWASP-A05`, `OWASP-A08`, `CWE-22`, `CWE-409`, `CWE-611`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Import is the largest untrusted-input surface in the app: competitor bundles, zips, Markdown/HTML, images and `.sanenote` files can be hostile (zip bombs, path traversal, XXE, oversized media, malformed containers). The secure-coding checklist §1 makes hardening a **gate**: validate type/MIME/size/schema before use; cap resources before decompress/decode; canonicalise and confine every path from file content; parse off the UI isolate; import into a new isolated notebook; fail closed. This issue is the shared hardening gate every importer ([SN-SHR-021](sharing-export.md#sn-shr-021)..[SN-SHR-026](sharing-export.md#sn-shr-026), and the `.sanenote` reader) runs through, plus its negative-test suite.

#### Scope
**In:** a hardened extractor/validator used by all importers: MIME/magic sniffing (not extension trust), per-format size/entry/dimension/duration caps + wall-clock timeout, decompression-ratio limits (zip/decompression-bomb defence), path canonicalisation + confinement (reject `..`/absolute/symlink), XML external-entity disabling (XXE), strict-schema parsing that rejects unknown fields, off-isolate execution, and fail-closed `Failure` on any violation; the abuse/negative test corpus.
**Out:** the format parsers themselves ([SN-SHR-022](sharing-export.md#sn-shr-022)..[SN-SHR-026](sharing-export.md#sn-shr-026)); the PDF-specific fuzz corpus ([SN-PDF-024](pdf.md#sn-pdf-024), referenced); the pipeline shell ([SN-SHR-021](sharing-export.md#sn-shr-021)).

#### Acceptance criteria
- [ ] A zip/decompression bomb is rejected before exhausting memory/disk (entry count, uncompressed-size, and ratio caps enforced).
- [ ] A bundle entry with `..`, an absolute path, or a symlink is rejected; extraction writes only under the app's chosen directory.
- [ ] An XML-bearing import (OOXML/`.one`/SVG) resolves no external entities (XXE-safe).
- [ ] Oversized images/audio (dimensions/duration/size beyond caps) fail closed with a user-safe error.
- [ ] Any malformed/unknown-field input produces a user-safe `Failure`, never a partial import, crash, or raw exception surfaced to the user.
- [ ] All import parsing runs off the UI isolate; a hostile file adds no jank to the editor.

#### Technical notes
Add `app/lib/import/import_guard.dart` (caps, path confinement, MIME sniff) and a hardened XML/zip wrapper, consumed by every importer via [SN-SHR-021](sharing-export.md#sn-shr-021). Enforce caps before decode; use `Isolate.run`; return `Result<T, Failure>` (never throw across boundaries). Implements docs/security/secure-coding-checklist.md §1 and threat-model TM-D-01/TM-T-06/TM-E-04/TM-I-06. Feed the corpus into the verification-stage fuzz job alongside [SN-PDF-024](pdf.md#sn-pdf-024).

#### Security & privacy
This is the input-validation gate. Threats: TM-D-01 (zip/decompression bomb -> DoS), TM-T-06 (path traversal overwrite), TM-E-04 (parser memory-safety), TM-I-06 (XSS via imported HTML). Controls: resource caps (CWE-409), path confinement (CWE-22), XXE off (CWE-611), strict validation (CWE-20, ASVS-V5), safe deserialization (MASVS-CODE-4, OWASP-A08), secure defaults (OWASP-A05), off-isolate parse (MASVS-PLATFORM-1). IDs listed in security array.

#### UX notes
Failures surface as a single user-safe message ("This file couldn't be imported safely") with no stack trace or internal path (checklist §7). Partial/hostile imports never land content; the notebook is only created on a clean parse. No new visible chrome beyond the error state; consistent across all 17 looks + dark.

#### Test plan
`app/test/security/import_guard_test.dart` + a corpus under `test/fixtures/malicious/`: zip bomb, path-traversal entry, symlink entry, XXE payload, oversized image/audio, truncated/malformed container, unknown-field schema. Assert fail-closed, no partial write, no jank. Wire into the CI fuzz job.

#### Dependencies
[SN-SHR-021](sharing-export.md#sn-shr-021) (pipeline). Used by [SN-SHR-022](sharing-export.md#sn-shr-022)..[SN-SHR-026](sharing-export.md#sn-shr-026) and the `.sanenote` reader; complements [SN-PDF-024](pdf.md#sn-pdf-024) (PDF fuzz) and [SN-SEC-001](security.md#sn-sec-001) (threat model IDs).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SHR-028

<a id="sn-shr-028"></a>

**Build the export/import round-trip and fidelity test suite**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | sharing-export, qa |
| Size | L |
| SDLC | verification |
| Parent | [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Depends on | [SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-005](sharing-export.md#sn-shr-005), [SN-SHR-006](sharing-export.md#sn-shr-006), [SN-SHR-008](sharing-export.md#sn-shr-008), [SN-SHR-022](sharing-export.md#sn-shr-022) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-2`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Export and import are only trustworthy if fidelity is proven: PRD-CO-013/015 require lossless `.sanenote` round-trips and lossy-but-honest Markdown/PDF/SVG round-trips, and every importer must preserve or explicitly approximate content (PRD-CO-078). This issue builds the cross-format fidelity suite: golden exports, byte-for-byte `.sanenote` round-trips, Markdown export->import->export stability, and importer preservation assertions — the verification gate that stops a regression from silently dropping a user's strokes, tags, or audio timestamps.

#### Scope
**In:** golden export files per format across the 17 looks where visual (PNG/SVG/PDF); a byte-for-byte `.sanenote` export->import round-trip; a Markdown export->import->export stability check; importer preservation assertions (strokes/tags/backlinks/audio-ink counts match the report); a fidelity report the CI publishes.
**Out:** the writers/importers themselves; the malicious-input corpus ([SN-SHR-027](sharing-export.md#sn-shr-027)); PDF perf tests ([SN-PDF-026](pdf.md#sn-pdf-026)).

#### Acceptance criteria
- [ ] A `.sanenote` export -> import -> re-export is byte-for-byte identical for a reference notebook (ink, audio-ink timestamps, backlinks, tags).
- [ ] Markdown export -> [SN-SHR-022](sharing-export.md#sn-shr-022) import -> export preserves headings, lists, task-lists, links and image references (stable).
- [ ] Golden tests cover PDF/PNG/SVG exports of a reference page across a representative set of looks + dark, and fail on visual regression.
- [ ] Each importer's preservation is asserted: imported stroke/tag/backlink/audio-ink counts match the import report; nothing is silently dropped.
- [ ] The suite runs in CI as a verification gate and blocks merge on a fidelity regression.

#### Technical notes
Add `app/integration_test/export_import_fidelity_test.dart` + golden fixtures under `test/goldens/export/` and reference notebooks under `test/fixtures/notebooks/`. Drive the real writers ([SN-SHR-003](sharing-export.md#sn-shr-003)/[SN-SHR-005](sharing-export.md#sn-shr-005)/[SN-SHR-006](sharing-export.md#sn-shr-006)/[SN-SHR-008](sharing-export.md#sn-shr-008)) and importers ([SN-SHR-022](sharing-export.md#sn-shr-022) et al). Follows docs/architecture/file-format.md §10 (size/round-trip expectations) and CLAUDE.md §10 (golden tests for painted output).

#### Security & privacy
Test fixtures MUST contain only synthetic content — no real PII, tokens, or secrets (checklist §0). Validate exported artefacts do not leak metadata beyond the documented cleartext routing headers (file-format.md §6). Baseline: no content/tokens in logs. IDs: MASVS-STORAGE-1, MASVS-PRIVACY-2, CWE-20.

#### UX notes
No user-facing surface; this is a verification harness. Golden diffs are the reviewer's visual evidence in the PR (attach on failure).

#### Test plan
This issue *is* the test plan: `app/integration_test/export_import_fidelity_test.dart`, per-format golden tests in `packages/*/test/export/`, and the `.sanenote` byte-round-trip in `packages/sane_core/test/export/sanenote_roundtrip_test.dart`. Wire into CI as a gate.

#### Dependencies
[SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-005](sharing-export.md#sn-shr-005), [SN-SHR-006](sharing-export.md#sn-shr-006), [SN-SHR-008](sharing-export.md#sn-shr-008) (writers), [SN-SHR-022](sharing-export.md#sn-shr-022) (Markdown import). Coordinates with [SN-QA-001](qa.md#sn-qa-001) (test strategy).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-012

<a id="sn-web-012"></a>

**Register PWA file handlers, share target, shortcuts and app badging**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | web |
| Areas | sharing-export, notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-010](compat.md#sn-web-010), [SN-WEB-011](compat.md#sn-web-011) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `CWE-20`, `CWE-434`, `OWASP-A01` |
| Extra labels | agent-ready |

#### Context
An installed PWA can participate in the operating system the way a native app does: `file_handlers` + `launchQueue.setConsumer` opens `.sanenote`, `.pdf` and `.md` files (Chromium desktop), `share_target` receives shares as a `multipart/form-data` POST (Chromium/Android), `shortcuts` adds jump-list entries, and `navigator.setAppBadge()` shows an unread/sync count (Chromium desktop and iOS 16.4+ when installed). Every one of these is a **progressive enhancement behind feature detection** (`docs/platform/web.md` §5, `docs/adr/0010-web-pwa-strategy.md` decision 4) because Safari supports almost none of them. `PRD-CO-413` requires the installed trial to register `share_target`, `file_handlers`, `shortcuts` and `protocol_handlers`; `PRD-CO-274` and `PRD-CO-275` define the cross-platform share-target and open-with behaviour this implements on web.

#### Scope
**In:** manifest entries for `file_handlers`, `share_target`, `shortcuts` and `protocol_handlers`; a `launchQueue` consumer that routes inbound files into the import flow; the share-target landing route that accepts a POST and hands the payload to the same importer; badge set/clear wiring; capability detection with clean no-ops elsewhere.
**Out:** the import parsers themselves ([SN-SHR-001](sharing-export.md#sn-shr-001), [SN-PDF-002](pdf.md#sn-pdf-002)), share-link resolution ([SN-WEB-022](onboarding.md#sn-web-022) covers the guest reader entry), File System Access save/open ([SN-WEB-013](sharing-export.md#sn-web-013)), and native share targets on iOS/Android apps.

#### Acceptance criteria
- [ ] With the PWA installed on Chromium desktop, double-clicking a `.sanenote` or `.pdf` opens the app and lands on an **import confirmation** screen — never an automatic, silent import.
- [ ] Sharing a PDF or image to the installed app from Android's share sheet lands on the same confirmation screen with the file attached.
- [ ] Manifest `shortcuts` expose "New note" and "Search"; both open the correct route in the existing window (`launch_handler` focus-existing).
- [ ] `protocol_handlers` registration resolves a `sane.app` share URL into the in-app reader route, with the decryption key read from the **fragment** and never sent to a server (`PRD-CO-032`, `PRD-CO-276`).
- [ ] Badging shows a count where supported and is cleared when the user views the relevant surface; where unsupported, nothing is attempted and no error is logged.
- [ ] Every inbound payload is validated (declared type vs sniffed type, size cap, schema) before any parse, and an unsupported or oversized file produces a user-safe error with no partial state.
- [ ] On Safari all four features are absent with no console noise and no broken UI affordances.

#### Technical notes
Manifest entries live in `web/manifest.json` ([SN-WEB-010](compat.md#sn-web-010)); the consumer and routing live in `app/lib/platform/web/launch_queue.dart` and a `go_router` route defined per ADR-0003. The share-target POST requires a server-side (or service-worker-intercepted) route — implement it in the service worker from [SN-WEB-011](compat.md#sn-web-011) so no origin server logic is needed, keeping the zero-server posture (ADR-0004). Hand every payload to the shared import pipeline so validation rules are not duplicated (`docs/security/secure-coding-checklist.md` §1). Badge calls go through a capability-checked wrapper. Implements `PRD-CO-274`, `PRD-CO-275`, `PRD-CO-276`, `PRD-CO-413`.

#### Security & privacy
Threats: an inbound file is untrusted input and the classic route to a parser exploit or zip-bomb (TM-D-01, CWE-20, CWE-434, CWE-409); a handler that auto-imports turns a link or a share into state mutation without consent (TM-S-04, OWASP-A01); a protocol handler leaking a share key to a server if the key were in the query string rather than the fragment (TM-I-09, CWE-598 adjacency). Controls: validate MIME by content sniffing plus extension, enforce size and entry-count caps and a wall-clock timeout **before** decode; parse off the UI isolate; import into a **new isolated notebook** by default and never overwrite by a path taken from file content (CWE-22); every inbound route lands in view/confirm; the share key stays in the fragment with `Referrer-Policy: no-referrer` ([SN-WEB-016](security.md#sn-web-016)); badge counts contain no content and are never logged (MASVS-PRIVACY-1, CWE-532).

#### UX notes
The import confirmation reuses the "Import a PDF" overlay pattern (`design/Sane Notes.dc.html`, `docs/design/screens-and-flows.md` §9) and the Library import entry point (§6), so all **17 looks in light and dark** are covered by the existing overlay goldens plus one new golden for the share-target landing. States: empty (no file), loading (large file with progress and cancel), error (unsupported/oversized/corrupt, with a plain-language reason), offline (import still works — it is local). Accessibility: overlay traps focus correctly, is dismissible by keyboard, action buttons are ≥ 44 px with ≥ 4.5:1 contrast, and the file name is announced by screen readers (`PRD-CO-315`, `PRD-CO-331`).

#### Test plan
- `app/test/web/launch_queue_test.dart` — routing of inbound files, capability no-ops, badge wrapper.
- `app/test/web/share_target_validation_test.dart` — type/size/schema rejection cases including a mislabelled extension and an oversized payload.
- `app/integration_test/web/file_handler_test.dart` — headless Chromium simulates a launch with files and asserts the confirmation screen.
- `app/integration_test/web/share_target_test.dart` — POST to the share-target route through the service worker.
- Manual: install on Chrome desktop and Android; share a PDF; confirm Safari degrades silently.

#### Dependencies
[SN-WEB-010](compat.md#sn-web-010), [SN-WEB-011](compat.md#sn-web-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md §1 and §1.1

---

### SN-WEB-013

<a id="sn-web-013"></a>

**Implement File System Access open and save with a download fallback**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | sharing-export, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-008](storage.md#sn-web-008), [SN-CORE-005](storage.md#sn-core-005) |
| Security controls | `MASVS-STORAGE-1`, `CWE-20`, `CWE-22`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
A web note app that cannot hand the user a real file is a trap — and export is also our GDPR/DPDP portability answer (`PRD-PRIV-004`, `PRD-CO-016`) and the durability escape hatch when browser storage is best-effort ([SN-WEB-009](storage.md#sn-web-009)). The File System Access API (`showOpenFilePicker`/`showSaveFilePicker`) gives a genuine open/save-in-place experience but is **Chromium desktop only**; Safari, Firefox and all mobile browsers need the `<input type="file">` + download fallback, which the `browser-fs-access` ponyfill pattern encapsulates (`docs/platform/web.md` §4). This issue makes open and save work everywhere with the best available mechanism, for `.sanenote` bundles ([SN-CORE-005](storage.md#sn-core-005)), PDF and image import, and PDF/PNG/Markdown export.

#### Scope
**In:** a capability-detecting file-IO service for the web; `showOpenFilePicker`/`showSaveFilePicker` paths with accepted-type descriptors; the input/download fallback; drag-and-drop file import onto the Library and Editor (`PRD-CO-070` "web file drop"); re-saving to a previously granted handle where the browser persists permission; streaming large exports to disk without loading them wholly into memory.
**Out:** the export renderers themselves ([SN-SHR-001](sharing-export.md#sn-shr-001)), PDF parsing ([SN-WEB-028](pdf.md#sn-web-028)), the import confirmation UI ([SN-WEB-012](sharing-export.md#sn-web-012)), and cloud-drive storage ([SN-WEB-019](sync.md#sn-web-019)).

#### Acceptance criteria
- [ ] On Chromium desktop, "Export" opens a native save dialog, writes the file, and a subsequent save to the same handle succeeds without re-prompting where the browser allows it.
- [ ] On Safari, Firefox and mobile browsers the same action produces a normal download with the correct filename and MIME type; no feature is advertised that the browser cannot perform.
- [ ] Opening a `.sanenote`, PDF, image or Markdown file works through the picker or the input fallback and lands on the import confirmation ([SN-WEB-012](sharing-export.md#sn-web-012)) — never an automatic import.
- [ ] Drag-and-drop of one or many files onto Library or Editor is accepted, with a visible drop target and a rejection state for unsupported types.
- [ ] A 200 MB export streams to disk with progress and a working cancel, and never exceeds a bounded memory ceiling or blocks the UI thread (`PRD-CO-017`).
- [ ] Filenames derived from note titles are sanitised (no path separators, control characters, reserved names, or leading dots) and length-bounded.
- [ ] A cancelled picker, a denied permission, and an oversized file each produce a typed `Failure` with a user-safe message and no partial file.

#### Technical notes
Implement `app/lib/platform/web/file_io_service.dart` behind an interface that native surfaces also satisfy, so `app/` export/import code is platform-agnostic. Use `dart:js_interop` for the picker APIs; all file reads/writes stream through a Worker where possible so the UI isolate stays free (`docs/architecture/overview.md` §6). `.sanenote` reading/writing is owned by [SN-CORE-005](storage.md#sn-core-005) — this issue only supplies bytes and sinks. Honour `PRD-STOR-005` (export formats) and `PRD-CO-010`–`PRD-CO-018`. The zero-server posture of `docs/adr/0004-local-first-zero-server.md` means every byte is produced and consumed locally — there is no upload step — and `docs/adr/0010-web-pwa-strategy.md` decision 3 makes an exported file one of the two durable copies a web user can hold. Note in code that File System Access is unavailable on iOS/iPadOS in every browser (`docs/platform/web.md` §5 iOS limits).

#### Security & privacy
Threats: a file chosen by the user is still untrusted input (TM-D-01, CWE-20); a filename or in-bundle path taken from file content can escape the intended directory (CWE-22); an export writes **plaintext** note content to the user's disk by design, so it must be deliberate, never automatic (MASVS-STORAGE-1, MASVS-PRIVACY-1); a decompression bomb inside a `.sanenote` can exhaust memory (CWE-409, CWE-400). Controls: validate type/MIME/size and schema before parse, cap entries and uncompressed size, enforce a timeout, canonicalise and confine every derived path, import into a new isolated notebook, and fail closed on any mismatch (checklist §1); exports are always user-initiated from a gesture and the UI states plainly that an exported file is unencrypted (`PRD-STOR-005`); no file path, filename or content is logged (CWE-532).

#### UX notes
Entry points: Library `⋯` menu and Import affordance (`docs/design/screens-and-flows.md` §6), the Import PDF overlay (§9), Settings → Privacy & export "Export everything" (§12, `PRD-CO-016`), and the Share overlay (§10). Drop targets, progress and cancel controls are `sane_ui` components rendering correctly in all **17 looks, light and dark** — golden-test the drop-target and progress states in two looks per mode. Cover empty (no file), loading (progress + cancel), error (unsupported/oversized/cancelled), and offline (export works offline; make that explicit) states. Accessibility: drag-and-drop must have a keyboard-and-button equivalent (`PRD-CO-318` dragging alternatives), 44 px targets, ≥ 4.5:1 contrast, progress announced politely.

#### Test plan
- `app/test/web/file_io_service_test.dart` — capability branching, filename sanitisation, cancellation and permission-denied mapping.
- `app/test/web/drop_target_golden_test.dart` — drop and rejection states in two looks, light and dark.
- `app/integration_test/web/export_stream_test.dart` — large export streams with bounded memory and a working cancel.
- `app/integration_test/web/import_picker_test.dart` — picker and fallback paths land on the confirmation screen.
- Manual: Safari iPadOS download path; Firefox; a 200 MB export on Chrome desktop.

#### Dependencies
[SN-WEB-008](storage.md#sn-web-008), [SN-CORE-005](storage.md#sn-core-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md §1

---

### SN-WEB-029

<a id="sn-web-029"></a>

**Implement Async Clipboard and Web Share with Safari gesture handling**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | sharing-export, input-gestures |
| Size | S |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-013](sharing-export.md#sn-web-013), [SN-WEB-014](security.md#sn-web-014) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-PRIVACY-1`, `CWE-20`, `CWE-79`, `CWE-200` |
| Extra labels | agent-ready, good first issue |

#### Context
Copy-paste and share are small features with sharp browser edges. `docs/platform/web.md` §10 records the two that bite: the **Async Clipboard** `write([ClipboardItem])` supports images (paste a page as PNG, paste a screenshot in), but **Safari requires the `ClipboardItem` value to be a Promise** resolving to the blob **and** a direct user gesture, while Chromium accepts either; and **Web Share** (`navigator.share()`/`canShare()`) needs a secure context plus a user gesture and is limited in Firefox. Getting these wrong produces the worst kind of bug — works for the developer on Chrome, silently fails for a student on Safari. `PRD-CO-020` requires the OS share sheet for export artefacts on every platform, which on web means Web Share with a download fallback.

#### Scope
**In:** a clipboard service (copy page/selection as PNG and as text, paste image and text) that always runs inside a user-activation handler and uses the Promise form of `ClipboardItem`; a share service using `canShare()` feature detection with a download/copy-link fallback; paste sanitisation; and honest affordance hiding where unsupported.
**Out:** the export renderers ([SN-SHR-001](sharing-export.md#sn-shr-001)), the Share overlay's link and permission model ([SN-SHR-001](sharing-export.md#sn-shr-001), `PRD-CO-030`–`PRD-CO-039`), file save ([SN-WEB-013](sharing-export.md#sn-web-013)), and system share targets ([SN-WEB-012](sharing-export.md#sn-web-012)).

#### Acceptance criteria
- [ ] Copying a page as PNG works on Chrome, Edge and **Safari**, using the Promise-valued `ClipboardItem` form, always inside a direct user-gesture handler.
- [ ] Pasting an image from the OS clipboard into a page inserts it as an image object; pasting text inserts sanitised text.
- [ ] `navigator.share()` is used when `canShare()` accepts the payload (including files where supported); otherwise the UI falls back to download or copy-link with no dead button.
- [ ] The clipboard is **never** read automatically on launch, focus or visibility change — only on an explicit paste action (checklist §1.2).
- [ ] Pasted HTML/markdown is sanitised before render, independently of CSP ([SN-WEB-014](security.md#sn-web-014)).
- [ ] Denied clipboard permission produces a clear, recoverable message and does not break the editor.
- [ ] Where neither clipboard-write nor Web Share is available, the affordance is hidden rather than shown-and-broken.
- [ ] All operations complete without blocking the UI isolate; a large page render for copy shows progress.

#### Technical notes
Implement `app/lib/platform/web/clipboard_service.dart` and `share_service.dart` behind interfaces shared with native so `app/` code is platform-agnostic. Always construct `ClipboardItem` with a Promise value — it is required by Safari and accepted by Chromium, so there is one code path, not two. Rendering a page to PNG reuses the export pipeline ([SN-SHR-001](sharing-export.md#sn-shr-001)); do the raster work off the UI isolate where possible. Web Share requires HTTPS and a gesture; file sharing support varies, so gate on `canShare({files})`. Implements `PRD-CO-020` on web and supports `PRD-CO-011` (PNG export); the browser quirks are recorded in `docs/platform/web.md` §10 and the progressive-enhancement rule comes from `docs/adr/0010-web-pwa-strategy.md` decision 4.

#### Security & privacy
Threats: clipboard content is untrusted input and a classic XSS vector when pasted HTML reaches a DOM sink (CWE-79, CWE-20); automatic clipboard reads are a privacy violation and can capture passwords or other apps' data (CWE-200, MASVS-PRIVACY-1, checklist §1.2); copying from a locked or secure note could leak content to other apps (TM-I-07). Controls: read only on explicit paste; sanitise pasted markup unconditionally via the Trusted Types policy and DOMPurify ([SN-WEB-014](security.md#sn-web-014)); bound pasted payload size before decode (CWE-400); respect the locked-note and screenshot-protection posture (`PRD-LEAK-*`) by disabling copy for locked notebooks; offer the clipboard-clear guidance for sensitive copies (checklist §1.2); never log clipboard or share payloads (CWE-532).

#### UX notes
Entry points: the Editor selection bar (`docs/design/screens-and-flows.md` §7.4), the Library `⋯` menu (§6) and the Share overlay (§10). Buttons and toasts are `sane_ui` components and must render in all **17 looks, light and dark** — golden-test the "Copied" toast and the share fallback sheet in two looks per mode. States: success toast, permission denied, unsupported (affordance hidden), large-render progress, and offline (copy/share of local artefacts still works). Copy follows the product voice in §16 — "Copied" not "Operation succeeded". Accessibility: toasts announce politely and are not the only feedback, targets ≥ 44 px, contrast ≥ 4.5:1, and every copy/share action is keyboard reachable with a visible focus ring (`PRD-CO-315`).

#### Test plan
- `app/test/web/clipboard_service_test.dart` — Promise-form `ClipboardItem` construction, gesture requirement, permission-denied mapping, no-auto-read assertion.
- `app/test/web/paste_sanitisation_test.dart` — an XSS payload corpus renders inert after paste.
- `app/test/web/share_service_test.dart` — `canShare` gating and fallback selection.
- `app/integration_test/web/copy_paste_test.dart` — copy a page as PNG and paste an image back, in headless Chromium.
- Manual: Safari macOS and iPadOS copy/paste; Firefox share fallback.

#### Dependencies
[SN-WEB-013](sharing-export.md#sn-web-013), [SN-WEB-014](security.md#sn-web-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md §1.2 and §6.2

---

