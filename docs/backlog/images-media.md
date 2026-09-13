# Backlog — area: images-media

17 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-MED-001](images-media.md#sn-med-001) **Images & media (insert, scan, crop, stickers, elements, GIF/video, OCR, privacy)** (epic · M2 Library & Documents)
  - [SN-MED-002](images-media.md#sn-med-002) **Model media object extensions with caption, alt text, lock, z-order and mask** · p1 · feature · M · M2 Library & Documents
  - [SN-MED-003](images-media.md#sn-med-003) **Build the image ingest, decode, downscale and compression pipeline** · p1 · feature · L · M2 Library & Documents
  - [SN-MED-004](images-media.md#sn-med-004) **Strip EXIF and location metadata from inserted images by default** · p1 · security · S · M2 Library & Documents
  - [SN-MED-005](images-media.md#sn-med-005) **Add the Insert-media action and source picker distinct from PDF import** · p1 · feature · M · M2 Library & Documents
  - [SN-MED-006](images-media.md#sn-med-006) **Render image objects with move, resize, rotate, z-order and alignment guides** · p1 · feature · L · M2 Library & Documents
  - [SN-MED-007](images-media.md#sn-med-007) **Crop, mask and rotate images with rectangular and freehand non-destructive edits** · p2 · feature · M · M2 Library & Documents
  - [SN-MED-008](images-media.md#sn-med-008) **Paste images from the clipboard and drag-and-drop from other apps** · p2 · feature · M · M2 Library & Documents
  - [SN-MED-009](images-media.md#sn-med-009) **Add a document scanner with edge detection and perspective correction** · p2 · feature · L · M2 Library & Documents
  - [SN-MED-010](images-media.md#sn-med-010) **Hook image OCR and on-device alt-text generation for search and screen readers** · p1 · feature · M · M3 Audio & Recognition
  - [SN-MED-011](images-media.md#sn-med-011) **Ship first-party stickers and starter packs including the Sage mascot set** · p2 · feature · M · M2 Library & Documents
  - [SN-MED-012](images-media.md#sn-med-012) **Build a personal element library with stickers created from lasso selections** · p3 · feature · L · M2 Library & Documents
  - [SN-MED-013](images-media.md#sn-med-013) **Add media lock, captions and writable sticky notes** · p2 · feature · M · M2 Library & Documents
  - [SN-MED-014](images-media.md#sn-med-014) **Add provider-backed GIF search and insert, free on all plans** · p2 · feature · M · M2 Library & Documents
  - [SN-MED-015](images-media.md#sn-med-015) **Support video note capture and online-video and link embeds** · p3 · feature · M · M5 Phones & Platform Parity

---

## Issues

### SN-GAND-008

<a id="sn-gand-008"></a>

**Use the Android photo picker and handle partial media-permission grants**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | android-tablet, android-phone |
| Areas | images-media, privacy, compat |
| Size | S |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-MED-005](images-media.md#sn-med-005), [SN-PRV-004](privacy.md#sn-prv-004), [SN-MED-003](images-media.md#sn-med-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1`, `MASVS-STORAGE-2`, `CWE-200` |
| Extra labels | — |

#### Context
[SN-MED-005](images-media.md#sn-med-005) builds the insert-media action and source picker, and [SN-PRV-004](privacy.md#sn-prv-004) builds in-context permission requests — but the Android media-permission model is a platform-specific minefield that neither issue names, and getting it wrong costs us both privacy posture and a Play declaration. Since Android 13 the single storage permission is split into `READ_MEDIA_IMAGES`/`READ_MEDIA_VIDEO`; since Android 14 the user can grant **partial** access (`READ_MEDIA_VISUAL_USER_SELECTED`), so an app that assumes all-or-nothing silently shows an empty gallery. The correct answer for a note app is to use the **system photo picker**, which needs **no permission at all**, returns only what the user picked, and matches `docs/platform/android.md` §9 ("Notes need no broad storage permission") and the decision-8 promise of "no data collected". Declaring broad photo/video permissions also triggers an extra Play Console declaration and undermines the Data Safety story in [SN-AND-026](release.md#sn-and-026)/[SN-PRV-015](privacy.md#sn-prv-015).

#### Scope
**In:** routing every "insert image" and "pick a photo" entry point on Android through the system photo picker (`ACTION_PICK_IMAGES` / the Jetpack `PickVisualMedia` contract) with no runtime permission; handling the partial-grant case if any legacy path still requests media permissions (show the "select more photos" affordance instead of an empty grid); removing `READ_MEDIA_*` and legacy `READ_EXTERNAL_STORAGE` from the manifest unless a documented feature requires them; importing the returned content URI safely (take the transient read grant, copy into our store, never keep a dangling URI); a CI manifest assertion that no broad media permission reappears.
**Out:** the cross-platform insert-media UI ([SN-MED-005](images-media.md#sn-med-005)); image decode/downscale and EXIF stripping ([SN-MED-003](images-media.md#sn-med-003), [SN-MED-004](images-media.md#sn-med-004)); the document scanner ([SN-MED-009](images-media.md#sn-med-009)); SAF document access for PDFs and sync folders ([SN-AND-018](storage.md#sn-and-018)).

#### Acceptance criteria
- [ ] On Android 13+ inserting an image opens the system photo picker and the app holds **no** media runtime permission; `adb shell dumpsys package` shows none granted.
- [ ] On API 29–32 the app uses the photo picker backport/SAF path and still requests no broad storage permission.
- [ ] If a media permission is ever requested, a partial grant renders the picked subset plus a visible "Select more photos" action — never an empty state or a repeated permission prompt.
- [ ] The returned URI is read once, copied into the content-addressed blob store ([SN-CORE-014](storage.md#sn-core-014)) off the UI isolate, and the URI is not persisted; revoking access later does not break the note.
- [ ] Size/MIME are validated before decode ([SN-SEC-006](security.md#sn-sec-006)); a picked file that is not a real image is rejected with a clear message.
- [ ] A CI manifest check fails the build if `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, `READ_MEDIA_VISUAL_USER_SELECTED` or `READ_EXTERNAL_STORAGE` appear without a documented waiver; the Play Data Safety form ([SN-PRV-015](privacy.md#sn-prv-015)) matches.

#### Technical notes
Jetpack `ActivityResultContracts.PickVisualMedia` / `PickMultipleVisualMedia` behind the existing `sane_*` media entry point, or the equivalent through the Flutter plugin already chosen in [SN-MED-005](images-media.md#sn-med-005) — the requirement is the *picker*, not a specific plugin. Take the returned URI's read permission for the current call only (`FLAG_GRANT_READ_URI_PERMISSION`), stream it to the ingest pipeline ([SN-MED-003](images-media.md#sn-med-003)), then drop it. Reuse the manifest checker from [SN-GAND-006](release.md#sn-gand-006).

#### Security & privacy
This is a privacy-by-design control, not just a compatibility fix: no permission means no access to the user's library, which is exactly what the privacy dashboard claims ([SN-PRV-002](privacy.md#sn-prv-002)) and what the Data Safety form declares (MASVS-PRIVACY-1). Content URIs from another app are untrusted input (MASVS-PLATFORM-1, CWE-20): validate MIME and size caps, decode off-isolate, strip EXIF/location ([SN-MED-004](images-media.md#sn-med-004)), and never log the URI or filename ([SN-SEC-021](security.md#sn-sec-021), CWE-532).

#### UX notes
Follow `docs/design/screens-and-flows.md` insert-media flow: the picker is the OS sheet, so our chrome disappears — the return must land the image in place with the standard placement handles ([SN-MED-006](images-media.md#sn-med-006)). The permission-rationale sheet ([SN-ONB-011](onboarding.md#sn-onb-011)) is **not** shown for the picker path, because there is nothing to ask for; that is a visible privacy win worth a line in the privacy page.

#### Test plan
`integration_test` + patrol driving the system picker on API 29, 33 and 36 emulators; a widget test for the partial-grant branch using a fake platform channel; a unit test asserting the manifest permission allow-list. Manual on the Galaxy Tab (Samsung's picker skin differs). Files: `app/test/media/android_photo_picker_test.dart`, `integration_test/android_media_pick_test.dart`, manifest fixture in `tools/ci/`.

#### Dependencies
[SN-MED-005](images-media.md#sn-med-005), [SN-PRV-004](privacy.md#sn-prv-004), [SN-MED-003](images-media.md#sn-med-003)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-001

<a id="sn-med-001"></a>

**Images & media (insert, scan, crop, stickers, elements, GIF/video, OCR, privacy)**

| Field | Value |
|---|---|
| GitHub | #19 |
| Type | epic |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-CORE-002](storage.md#sn-core-002), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `MASVS-PLATFORM-2`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-NETWORK-1`, `CWE-20`, `CWE-400`, `CWE-409` |
| Extra labels | agent-ready, innovation |

#### Context
Images and media turn a page from pure ink into a real study artefact: a photo of the whiteboard, a scanned worksheet, a diagram cropped from a slide, a sticker, a GIF. The mock has **no distinct media path** — its "Image" tool routes straight to the PDF import overlay (docs/design/screens-and-flows.md Open Question 10) — so this epic builds the whole media subsystem from scratch: a hardened image ingest/decode/compression pipeline, content-addressed **encrypted** image blobs, EXIF/metadata stripping by default (privacy), an Insert-media action with Photos/Camera/Files/Scan/Stickers/GIF sources, on-canvas placement/resize/rotate/crop/mask with alignment guides and z-order, a document scanner with edge detection and perspective correction, an image OCR + alt-text hook that feeds search and screen readers, first-party sticker packs and a personal element library, media lock/caption/sticky notes, provider-backed GIF search, and (decision-gated) video/online-video embeds. Everything obeys the locked guarantees: untrusted files are hostile and parsed **off the UI isolate** with resource caps (docs/security/secure-coding-checklist.md §1), images are E2E-encrypted **before** any cloud write (decision 3), and nothing is logged. Requirements: PRD-LB-180..185, PRD-LB-305, PRD-LB-388, PRD-LB-389, PRD-LB-392 (docs/product/prd-02-library-documents-audio-search.md §8, §11.3, §19) and the editor-side image tool PRD-ED-113..120 (docs/product/prd-01-editor-ink-brushes.md §10). ADRs: ADR-0005 (Image/Sticker object model), ADR-0007 (blob encryption), ADR-0012 (sane_ml_native for scan/OCR/description), ADR-0016 (OCR engines).

#### Scope
**In:** the media object model extensions + image blob pipeline; EXIF stripping; Insert-media action & source picker; on-canvas image transform (move/resize/scale/rotate/z-order/alignment guides); crop/mask/rotate; paste + drag-and-drop; document scanner; image OCR + alt-text hooks; first-party stickers + personal element library; media lock, captions, sticky notes; GIF search; video/link embeds (decision-gated). All 17 looks + dark mode, a11y, and the perf budgets.
**Out:** the shared Image/Sticker CRDT base fields owned by [SN-CORE-002](storage.md#sn-core-002); the content-addressed blob store + encryption primitives ([SN-CORE-004](storage.md#sn-core-004), [SN-CRY-001](security.md#sn-cry-001)); the PDF render engine ([SN-PDF-002](pdf.md#sn-pdf-002)); the lasso selection engine ([SN-ED-004](editor.md#sn-ed-004)); the FTS index internals ([SN-SRCH-002](search.md#sn-srch-002)); handwriting/math recognition ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)); audio media ([SN-AUD-001](audio.md#sn-aud-001)); billing/entitlement machinery ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] All child issues below are closed and CI is green.
- [ ] Inserting a photo/scan/sticker/GIF creates an Image/Sticker object rendered beneath or above ink per z-order, movable/resizable/rotatable, and persisted as a content-addressed **encrypted** blob.
- [ ] Every inserted photo has GPS/EXIF stripped by default; opting in to keep metadata is explicit.
- [ ] A hostile/malformed image, clipboard payload, dropped file, or embed URL fails **closed** into a user-safe error, decoded off the UI isolate, resource-capped (no decompression bomb), never adding a millisecond to ink latency.
- [ ] Media chrome renders correctly in all 17 looks + light/dark, is fully labelled for VoiceOver/TalkBack, and inserted images carry OCR-backed alt text.

#### Technical notes
Model + blob metadata in `packages/sane_core`; image object rendering in `packages/sane_render`; recognition/description adapters in `packages/sane_ml` + `plugins/sane_ml_native`; index hand-off to `packages/sane_search`; UI + orchestration in `app/lib/features/media/`; components/tokens from `packages/sane_ui`. Respect the DAG (CLAUDE.md §3) and the isolate rule (overview §6: decode/compress/scan/OCR off the UI isolate). ⚠ PRD-02 stamps M2/M4/M5 with the older editor-centric numbering; per docs/roadmap.md the authority is issues/milestones.json — images/media → **M2**, OCR/recognition → **M3**. Children:
- [ ] [SN-MED-002](images-media.md#sn-med-002) Media object model extensions (caption/altText/locked/zOrder/mask) + repository
- [ ] [SN-MED-003](images-media.md#sn-med-003) Image ingest, decode, downscale & compression pipeline + encrypted blob
- [ ] [SN-MED-004](images-media.md#sn-med-004) Strip EXIF/location metadata on insert (privacy)
- [ ] [SN-MED-005](images-media.md#sn-med-005) Insert-media action & source picker (Photos/Camera/Files/Scan/Stickers/GIF)
- [ ] [SN-MED-006](images-media.md#sn-med-006) Image object rendering & on-canvas transform (handles, z-order, alignment guides)
- [ ] [SN-MED-007](images-media.md#sn-med-007) Crop, mask & rotate images (rectangular + freehand, non-destructive)
- [ ] [SN-MED-008](images-media.md#sn-med-008) Paste images from clipboard & drag-and-drop from other apps
- [ ] [SN-MED-009](images-media.md#sn-med-009) Document scanner (edge detect, corner adjust, perspective correct)
- [ ] [SN-MED-010](images-media.md#sn-med-010) Image OCR & alt-text hooks (search index + screen-reader descriptions)
- [ ] [SN-MED-011](images-media.md#sn-med-011) First-party stickers & starter packs (incl. Sage mascot set)
- [ ] [SN-MED-012](images-media.md#sn-med-012) Personal element library & stickers from a lasso selection
- [ ] [SN-MED-013](images-media.md#sn-med-013) Media lock, captions & writable sticky notes
- [ ] [SN-MED-014](images-media.md#sn-med-014) GIF search & insert (provider-backed, free on all plans)
- [ ] [SN-MED-015](images-media.md#sn-med-015) Video note capture & online-video/link embeds (decision-gated)

#### Security & privacy
Media is the app's biggest untrusted-input surface after PDF: every imported/pasted/dropped image and every embed URL is hostile until validated (MIME not extension, size/dimension caps, decode off the UI isolate, fail closed) — docs/security/secure-coding-checklist.md §1, §1.2. Images are content-addressed and E2E-encrypted before any sync write (decision 3, ADR-0007); EXIF/GPS is stripped by default (privacy, LINDDUN); network sources (GIF, embeds) are TLS-only with no autoplay/beacon and add an ADR + threat-model row. IDs: MASVS-STORAGE-1, MASVS-CODE-4, MASVS-PLATFORM-2, MASVS-PRIVACY-1, MASVS-PRIVACY-2, MASVS-NETWORK-1, CWE-20, CWE-400, CWE-409.

#### UX notes
Surfaces: Editor toolbar Image tool (docs/design/screens-and-flows.md §7.1, tool set `image`), the Insert-media overlay (new, replacing the Open Q10 PDF-import shortcut), and the Import overlay's Scan source (§9). All media chrome renders in all 17 looks + light/dark; controls carry Semantics labels, 44 pt / 48 dp targets, ≥ 4.5:1 contrast, keyboard-reachable on web. Empty (no media yet), loading (decode/scan/GIF fetch), error (bad file / offline) and offline (network sources unreachable) states are specified per child.

#### Test plan
Unit tests for the model + pipeline (`packages/sane_core/test/media/`, `app/test/features/media/`), golden tests for the rendered image object across looks, fuzz/negative tests for decode + embed-URL hardening, integration tests for insert→transform→persist→reopen, and a11y tests for alt text. Umbrella suites: `app/integration_test/media_test.dart`.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (scaffold), [SN-CORE-002](storage.md#sn-core-002) (Image/Sticker base object), [SN-CORE-004](storage.md#sn-core-004) (blob store + persistence). Coordinates with [SN-CRY-001](security.md#sn-cry-001) (blob encryption), [SN-ED-002](editor.md#sn-ed-002) (editor canvas + tool state), [SN-ED-004](editor.md#sn-ed-004) (lasso), [SN-PDF-002](pdf.md#sn-pdf-002) (scan → PDF-backed pages), [SN-SRCH-002](search.md#sn-srch-002) (OCR index), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (recognition), [SN-DS-003](design-system.md#sn-ds-003) (components), [SN-BILL-001](billing.md#sn-bill-001) (Pro gating).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-002

<a id="sn-med-002"></a>

**Model media object extensions with caption, alt text, lock, z-order and mask**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | images-media, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-CORE-002](storage.md#sn-core-002), [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-STORAGE-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Every media feature reads and writes the same value types, so the model comes first (CLAUDE.md §5 DAG order: model → logic → …). The shared **Image / Sticker** object base already lives in `sane_core` with `blobRef` (IMM, content-addressed image blob), `naturalSize` (IMM), `cropRect` (LWW) and `stickerId` (IMM) plus the base transform fields (docs/architecture/document-model.md §Objects, §Image/Sticker). Media in Sane Notes needs more than that base: PRD-LB-184 requires media to be **lockable** in place and to carry an optional **caption**; PRD-ED-113 requires **alt text** for screen readers; z-order is editable (PRD-LB-181, PRD-ED-111); and freehand crop (PRD-LB-181, PRD-ED-114) needs a **mask path** distinct from the rectangular `cropRect`. This issue extends the media object with those fields as immutable value objects (or CRDT registers), defines the enums, serialisation, and a `MediaRepository` interface — the substrate the pipeline ([SN-MED-003](images-media.md#sn-med-003)) and renderer ([SN-MED-006](images-media.md#sn-med-006)) build on. It does **not** redefine the base object owned by [SN-CORE-002](storage.md#sn-core-002); it adds the media-specific facets.

#### Scope
**In:** `MediaObjectFacets` extending the `sane_core` Image/Sticker base with `caption` (LWW string?), `altText` (LWW string?), `altTextSource` (enum: user|ocr|description|none), `locked` (LWW bool), `zOrder` (LWW int), `rotation` (LWW radians), `maskPath` (LWW VectorPath? for freehand crop), and `mediaKind` (photo|scan|sticker|element|gif|videoEmbed); JSON + `.sanenote` serialisation with `schemaVersion`; the `MediaRepository` interface (create/update/delete/reorder-z, resolve blob metadata); validation of every deserialised field.
**Out:** the shared base Image/Sticker fields ([SN-CORE-002](storage.md#sn-core-002)); blob bytes + encryption ([SN-MED-003](images-media.md#sn-med-003), [SN-CRY-001](security.md#sn-cry-001)); drift table wiring ([SN-CORE-004](storage.md#sn-core-004)); rendering ([SN-MED-006](images-media.md#sn-med-006)); OCR that fills `altText` ([SN-MED-010](images-media.md#sn-med-010)).

#### Acceptance criteria
- [ ] `MediaObjectFacets` and the `mediaKind`/`altTextSource` enums are immutable value types with `==`/`hashCode`; a change yields a new instance (no mutation).
- [ ] Round-trip serialise → deserialise is lossless for every `mediaKind` × facet combination (property test), including a null caption/altText/maskPath.
- [ ] `caption` and `altText` are length-bounded (e.g. ≤ 2,000 chars) and NFC-normalised before storage; over-length or invalid input returns a `Result<T,Failure>`, never throws across the package boundary.
- [ ] Unknown/forward enum values in a deserialised `.sanenote` degrade to a safe default (`mediaKind=photo`, `altTextSource=none`) rather than failing the whole page load.
- [ ] `zOrder` and `locked` are CRDT LWW registers that merge deterministically (ADR-0005); reordering two objects concurrently converges without loss.

#### Technical notes
Create `packages/sane_core/lib/src/media/media_object.dart`, `media_enums.dart`, `media_repository.dart`. Pure Dart — no `package:flutter` in sane_core (CLAUDE.md §3). Use sealed `Result<T,Failure>` for validation and freezed-style immutability. `maskPath` reuses the `VectorPath` type used by Shape (document-model §Shape). Serialisation carries a `schemaVersion` int for `.sanenote` forward-compat (docs/architecture/file-format.md). Implements the model half of PRD-LB-181/184 and PRD-ED-113/114; the base object is ADR-0005. `blobRef` stays an opaque content hash, never a filesystem path.

#### Security & privacy
Model only; note content (image blobs, captions, alt text) stays on device and is E2E-encrypted on sync (decision 3). Validate deserialised fields (type/range/enum/length) before use so a malformed `.sanenote` cannot inject invalid state (CWE-20). Alt text and captions are user content — never logged. IDs: MASVS-STORAGE-1, CWE-20.

#### UX notes
No direct chrome; this is the data substrate for the image object (docs/design/screens-and-flows.md §7 canvas) and its context actions (lock, caption, alt text). The facets directly back the lock toggle, caption field and alt-text prompt users see in [SN-MED-013](images-media.md#sn-med-013) and [SN-MED-010](images-media.md#sn-med-010). A11y: `altText`/`altTextSource` exist precisely so every image can be described to a screen reader (PRD-LB-370). Baseline only at this layer.

#### Test plan
`packages/sane_core/test/media/media_object_serialization_test.dart` (round-trip, forward-compat degradation), `media_enums_test.dart` (bounds, rejection, NFC), `media_zorder_merge_test.dart` (CRDT convergence). Pure unit tests, headless.

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) (Image/Sticker base object), [SN-FND-002](devx.md#sn-fnd-002) (scaffold).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-003

<a id="sn-med-003"></a>

**Build the image ingest, decode, downscale and compression pipeline**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, storage, security |
| Size | L |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-002](images-media.md#sn-med-002), [SN-CORE-004](storage.md#sn-core-004), [SN-CRY-001](security.md#sn-cry-001) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `MASVS-PLATFORM-2`, `CWE-20`, `CWE-400`, `CWE-409`, `CWE-770` |
| Extra labels | agent-ready |

#### Context
Every media source — Photos, Camera, Files, Scan, paste, drop, GIF still-frame — funnels through one pipeline that turns an untrusted byte stream into a safe, small, content-addressed **encrypted** blob plus a decode-ready handle and a thumbnail. This is the single most security-sensitive media surface: an imported image is hostile input and MUST be validated and decoded **off the UI isolate** with bounded memory so a decompression bomb or malformed header cannot hang the UI or add a millisecond to ink latency (docs/security/secure-coding-checklist.md §1; Locked Decision 7). It is also where the app keeps storage sane: photos are downscaled to a sensible max dimension and re-encoded to WebP so a 12 MP camera shot does not bloat the notebook (research/pdf-and-audio-technology.md §A.5 memory discipline; PRD-LB-181/224 storage separation). The output feeds the object model ([SN-MED-002](images-media.md#sn-med-002)) and the blob store ([SN-CORE-004](storage.md#sn-core-004)).

#### Scope
**In:** an `ImageIngestService` in `app/lib/features/media/` (or a small `sane_media` util) that: sniffs true MIME (magic bytes, not extension), enforces size + max-dimension + max-pixel caps and a wall-clock decode timeout, decodes JPEG/PNG/WebP/HEIC/GIF(first frame) via platform decoders off the UI isolate, downscales to a max long edge (config, e.g. 2048 px for photos / higher for scans), re-encodes to WebP (lossy quality token + lossless for line art), computes a `BlobRef`, encrypts via [SN-CRY-001](security.md#sn-cry-001) and writes to the blob store, and generates a cached display thumbnail; a bounded LRU decode cache; a `Result<ImageAsset,Failure>` API. Cancellable + progress for large inputs.
**Out:** EXIF stripping detail ([SN-MED-004](images-media.md#sn-med-004)); the source picker UI ([SN-MED-005](images-media.md#sn-med-005)); rendering the object ([SN-MED-006](images-media.md#sn-med-006)); OCR ([SN-MED-010](images-media.md#sn-med-010)); GIF animation playback ([SN-MED-014](images-media.md#sn-med-014)); PDF rasterisation ([SN-PDF-002](pdf.md#sn-pdf-002)).

#### Acceptance criteria
- [ ] MIME is determined from magic bytes; a file whose extension lies about its type is classified by content and rejected if unsupported (test with a renamed payload).
- [ ] Decode runs off the UI isolate (`Isolate.run`/storage isolate); a 100 MP or bomb image is rejected before full decode by the pixel/size cap and never allocates unbounded memory (negative test) — fails **closed** into a user-safe `Failure`.
- [ ] A valid 12 MP JPEG is downscaled to the configured max long edge and re-encoded to WebP with a > 60% size reduction at the default quality (measured), preserving aspect ratio.
- [ ] The resulting blob is content-addressed and **encrypted** before it touches disk/the blob store; identical images de-duplicate by `BlobRef` (test).
- [ ] Inserting an image never causes a frame > 16.7 ms on the reference iPad while writing (profile timeline attached); a thumbnail is produced and cached for library/canvas display.

#### Technical notes
Prefer maintained platform image decoders over hand-rolled parsers (checklist §1 SHOULD); use `dart:ui` `instantiateImageCodec` with `targetWidth/targetHeight` for scaled decode where possible, and the `image` package (pure Dart) only for format transforms/EXIF work on the isolate. Caps and quality are tokens/config, not literals. Encrypt via `sane_crypto` chunked AEAD ([SN-CRY-001](security.md#sn-cry-001), ADR-0007) — never write plaintext image bytes to the blob store. Blob write goes through the `sane_core` store interface ([SN-CORE-004](storage.md#sn-core-004)), on the storage isolate (overview §6). HEIC decode uses the platform codec (iOS native; Android via platform decoder; web falls back to canvas decode or rejects with guidance). Implements PRD-LB-181 (image objects), PRD-LB-224 (media stored separately from note JSON), PRD-ED-113. Never hop isolates on the hot draw path (CLAUDE.md §8).

#### Security & privacy
This is the input-validation gate (checklist §1, TM-D-01/TM-T-06): validate type/size/dimensions before decode; cap resources before decoding to block decompression/pixel bombs (CWE-400, CWE-409, CWE-770); parse off the UI isolate with bounded memory; fail closed to a `Failure`, never a partial image or a raw thrown exception. Decoded bytes and blobs are E2E-encrypted before egress (decision 3). No image content or paths logged (object ids as opaque short hashes). IDs: MASVS-STORAGE-1, MASVS-CODE-4, MASVS-PLATFORM-2, CWE-20, CWE-400, CWE-409, CWE-770.

#### UX notes
Surface: invoked from the Insert-media overlay ([SN-MED-005](images-media.md#sn-med-005)) and paste/drop ([SN-MED-008](images-media.md#sn-med-008)); the user sees a brief progress indicator for large images and a clear, retryable error for an unsupported/oversized/corrupt file ("Couldn't add this image — it may be too large or damaged"). No 17-look chrome of its own beyond the progress/error surfaces (which use `sane_ui` tokens). A11y: progress + error states are announced; no colour-only signalling.

#### Test plan
`app/test/features/media/image_ingest_test.dart` (MIME sniffing, caps, downscale ratio, dedupe, encryption-before-write), `image_ingest_fuzz_test.dart` (renamed payloads, truncated/malformed headers, bomb inputs fail closed), `image_ingest_bench_test.dart` (decode off UI isolate, no frame > 16.7 ms). Parser corpus feeds the verification-stage fuzz job (CLAUDE.md §10).

#### Dependencies
[SN-MED-002](images-media.md#sn-med-002) (media object/model), [SN-CORE-004](storage.md#sn-core-004) (blob store + persistence), [SN-CRY-001](security.md#sn-cry-001) (blob encryption).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans, fuzz)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-004

<a id="sn-med-004"></a>

**Strip EXIF and location metadata from inserted images by default**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, privacy |
| Size | S |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-003](images-media.md#sn-med-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-STORAGE-1`, `CWE-359`, `CWE-200` |
| Extra labels | agent-ready, good first issue |

#### Context
A photo taken on a phone typically embeds GPS coordinates, a device model, a serial-ish maker note, and an exact timestamp in its EXIF block. If Sane Notes stored that verbatim, a note shared or synced would silently leak where and when the user was — a classic privacy failure. PRD-ED-113 makes the requirement explicit: **strip location/EXIF metadata by default** on inserted photos, with an opt-in to keep it (docs/product/prd-01-editor-ink-brushes.md §10; also PRD-ED-119 for pasted images and the roadmap M2 line "EXIF-strip"). This is a small, self-contained privacy control layered onto the ingest pipeline ([SN-MED-003](images-media.md#sn-med-003)): before an image is re-encoded and stored, drop all metadata except the minimum needed to render correctly (orientation), unless the user has explicitly chosen to preserve metadata for this insert.

#### Scope
**In:** an EXIF/metadata scrubbing step in the ingest pipeline that removes GPS/location, camera make/model/serial, maker notes, thumbnails-with-metadata, and timestamps from JPEG/HEIC/PNG/WebP before storage; **applying** and then discarding the orientation tag (bake rotation into pixels so the image still displays upright); a per-insert "Keep photo metadata" opt-in (default off) surfaced in the insert flow and Settings; a guarantee that scrubbing runs for **all** image sources (Photos, Camera, Files, paste, drop, scan output).
**Out:** the decode/downscale/encrypt pipeline itself ([SN-MED-003](images-media.md#sn-med-003)); the privacy dashboard entry (PRD-03 `PRIV`, [SN-PRV-001](privacy.md#sn-prv-001)); document-scan capture ([SN-MED-009](images-media.md#sn-med-009)).

#### Acceptance criteria
- [ ] A JPEG/HEIC with GPS + maker-note EXIF, once inserted with defaults, produces a stored blob with **no** GPS, device, serial, or maker-note metadata (assert by re-parsing the stored bytes).
- [ ] The image still renders in the correct orientation (the EXIF orientation is applied to pixels, then the tag dropped) — golden compares upright output for all 8 orientation values.
- [ ] With "Keep photo metadata" opted in for an insert, the original metadata is preserved (test both branches).
- [ ] Scrubbing applies uniformly across Photos/Camera/Files/paste/drop sources (parametrised test).
- [ ] Scrubbing runs on the ingest isolate and adds no UI-thread work; no metadata values are ever logged.

#### Technical notes
Implement as a transform in `app/lib/features/media/` (or the `sane_media` util) using the pure-Dart `image` package (`decodeXxxExif`/strip) or a targeted metadata rewriter, executed on the same off-UI isolate as [SN-MED-003](images-media.md#sn-med-003) so decode + scrub + re-encode happen together. Orientation is the one tag we honour then discard. The opt-in flag is a `MediaImportOptions` value passed from the picker; default = strip. Ties to the privacy posture in docs/security/secure-coding-checklist.md §11 and Locked Decision 8 (privacy by design). Do not rely on the platform picker to strip — do it ourselves so behaviour is identical on all five surfaces.

#### Security & privacy
Direct privacy control against metadata leakage (LINDDUN, TM-P-*): default-deny on personal metadata; explicit, in-context opt-in to retain (checklist §11 "consent in-context, specific, withdrawable"). Prevents an information-exposure leak through synced/shared images (CWE-200, CWE-359). Reflect the behaviour in the privacy dashboard/store labels ("images are stripped of location by default"). No metadata logged. IDs: MASVS-PRIVACY-1, MASVS-PRIVACY-2, MASVS-STORAGE-1, CWE-359, CWE-200.

#### UX notes
Surface: a subtle "Location & metadata removed" affordance in the insert confirmation, and a Settings toggle default-off "Keep photo metadata (location, camera)" (docs/design/screens-and-flows.md §12 Privacy; Settings appearance/privacy). Copy is honest and non-alarming. All 17 looks + dark for any chrome. A11y: the toggle is a labelled switch ("Keep photo metadata, off"), 44 pt target, not colour-only.

#### Test plan
`app/test/features/media/exif_strip_test.dart` (GPS/maker-note removal, orientation baking across all 8 values, opt-in branch, per-source uniformity). Include a fixture image with known EXIF; assert re-parsed output is clean.

#### Dependencies
[SN-MED-003](images-media.md#sn-med-003) (ingest pipeline this step plugs into).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-005

<a id="sn-med-005"></a>

**Add the Insert-media action and source picker distinct from PDF import**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-003](images-media.md#sn-med-003), [SN-DS-003](design-system.md#sn-ds-003), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-3`, `CWE-250` |
| Extra labels | agent-ready |

#### Context
In the mock the Image tool has no real home — it opens the PDF import overlay (docs/design/screens-and-flows.md §7.1 tool `image`, Open Question 10). PRD-LB-180 fixes this: provide an **Insert media** action distinct from PDF import, with sources **Photos**, **Camera** (take photo), **Document scan** (auto-crop/straighten), **Stickers/Elements**, and **GIF** (docs/product/prd-02-library-documents-audio-search.md §8; resolves Open Question 10). This issue builds the media source picker overlay and the action that routes each source into the ingest pipeline ([SN-MED-003](images-media.md#sn-med-003)) and object model — the front door for everything in this epic. Permissions (camera, photo library) are requested **lazily, in-context, with a rationale**, never at launch (checklist §8; Locked Decision 8).

#### Scope
**In:** an `InsertMediaSheet` overlay listing Photos / Camera / Files / Document scan / Stickers / GIF with icons + one-line descriptions; wiring Photos + Files to the platform picker (`image_picker`/file picker) → [SN-MED-003](images-media.md#sn-med-003); Camera to a capture flow → [SN-MED-003](images-media.md#sn-med-003); Scan, Stickers, GIF to their features ([SN-MED-009](images-media.md#sn-med-009)/[SN-MED-011](images-media.md#sn-med-011)/[SN-MED-014](images-media.md#sn-med-014)) via injected callbacks; lazy, rationaled permission requests for camera + photo access with graceful denial handling; a Recent-media shortcut row; inserting places the object at the viewport centre in edit-selected state.
**Out:** the actual decode/store ([SN-MED-003](images-media.md#sn-med-003)); the scanner ([SN-MED-009](images-media.md#sn-med-009)); sticker/element libraries ([SN-MED-011](images-media.md#sn-med-011)/[SN-MED-012](images-media.md#sn-med-012)); GIF search ([SN-MED-014](images-media.md#sn-med-014)); PDF import (separate overlay, [SN-PDF-002](pdf.md#sn-pdf-002)); on-canvas transform ([SN-MED-006](images-media.md#sn-med-006)).

#### Acceptance criteria
- [ ] Tapping the Image tool opens the Insert-media sheet (not the PDF import overlay); PDF import remains reachable from its own "Import PDF" entry (regression test that the two are separate).
- [ ] Each source routes correctly: Photos/Files → picker → ingest → object inserted; Camera → capture → ingest; Scan/Stickers/GIF → their feature surfaces.
- [ ] Camera and photo-library permissions are requested only when their source is chosen, with a rationale string; a denied permission shows a recoverable "Enable in Settings" path, not a crash or dead end.
- [ ] After a successful insert the object appears at viewport centre, selected, ready to move/resize; a toast confirms ("Photo added").
- [ ] The sheet renders correctly in all 17 looks + light/dark, stacks to one column at ~400 px width, is keyboard-reachable on web, and every source row has a Semantics label + 44 pt/48 dp target.

#### Technical notes
Build `app/lib/features/media/insert_media_sheet.dart` as a `StatelessWidget` fed by a Riverpod `insertMediaProvider` (ADR-0003; no business logic in `build`). Use `sane_ui` modal scaffold + list-row components ([SN-DS-003](design-system.md#sn-ds-003)). Photo/file selection via `image_picker` + a file picker; camera via `image_picker` camera or the `camera` plugin. Permission requests use in-context prompts with `NSCameraUsageDescription`/`NSPhotoLibraryUsageDescription` and Android runtime permissions (least privilege, checklist §8). On web, Camera/Scan degrade to file upload with a note. Inserting emits an op through `sane_core` ([SN-MED-002](images-media.md#sn-med-002)) on the editor's tool state ([SN-ED-002](editor.md#sn-ed-002)). Implements PRD-LB-180, PRD-ED-113.

#### Security & privacy
Permission hygiene is the core control: request camera/photo access lazily, in-context, with a rationale, and only the scope the feature needs (MASVS-PLATFORM-3, MASVS-PRIVACY-3, CWE-250 excessive privilege; checklist §8). A deep link or share must never open this sheet in a way that auto-inserts media — it lands in a view/confirm state requiring an explicit tap (MASVS-PLATFORM-1; CLAUDE.md §7.8). No selected file paths or content logged. IDs: MASVS-PLATFORM-1, MASVS-PLATFORM-3, MASVS-PRIVACY-3, CWE-250.

#### UX notes
Surface: new Insert-media overlay modelled on the Import PDF overlay layout (docs/design/screens-and-flows.md §9) but for media sources, opened from the editor toolbar Image tool (§7.1). Source rows mirror the import-source styling (icon + title + subtitle, e.g. "Camera — Take a photo", "Document scan — Auto-crop & straighten"). Loading state while a picker/camera is open; error state on denied permission with a Settings deep link; offline state disables GIF only. All 17 looks + dark; adaptive to phone width. A11y: labelled rows, focus order, screen-reader announcements on insert.

#### Test plan
`app/test/features/media/insert_media_sheet_test.dart` (routing per source, Image-tool opens media not PDF, permission-denied recovery, insert-at-centre-selected), golden `insert_media_sheet_golden_test.dart` (representative looks + phone width). Widget tests mock the pickers and permission layer.

#### Dependencies
[SN-MED-003](images-media.md#sn-med-003) (ingest pipeline), [SN-DS-003](design-system.md#sn-ds-003) (components), [SN-ED-002](editor.md#sn-ed-002) (editor tool state + canvas).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-006

<a id="sn-med-006"></a>

**Render image objects with move, resize, rotate, z-order and alignment guides**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, editor |
| Size | L |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-002](images-media.md#sn-med-002), [SN-MED-003](images-media.md#sn-med-003), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-STORAGE-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Once an image is on the page it must feel like a first-class object: draggable, resizable from side and corner handles, aspect-lockable, rotatable, and orderable above or below ink. PRD-LB-181 spells out the exact set — "placement, move, resize (side handles), scale (corner handles, aspect-lock with modifier), rotate, crop (rectangular + freehand), and z-order (bring-to-front / send-to-back)" plus **object alignment guides** (dashed = centre, solid = edge) while dragging (docs/product/prd-02-library-documents-audio-search.md §8; PRD-ED-113/PRD-ED-111 z-order). This issue renders the image object into the canvas and implements the transform interactions and guides; crop/mask lives in [SN-MED-007](images-media.md#sn-med-007) to keep each a PR-sized unit. Rendering uses the cached, downscaled blob from [SN-MED-003](images-media.md#sn-med-003) and repaints only the selected object so it never disturbs the ink hot path (CLAUDE.md §8; overview §6).

#### Scope
**In:** an `ImageObjectPainter` in `sane_render` drawing the decoded image at its transform (position, scale, rotation, cropRect) within a `RepaintBoundary`; a selection frame with 8 handles (4 side = 1-axis resize, 4 corner = scale, aspect-locked by default, free with a modifier); rotate handle with 15°/45° snap; drag-to-move; **alignment/snap guides** (centre = dashed, edges = solid) against page centre and neighbouring objects; z-order actions (bring-to-front/forward/backward/send-to-back) mutating `zOrder` ([SN-MED-002](images-media.md#sn-med-002)); a floating context bar (move/scale/rotate/z-order/crop/lock/caption entry points); commit as CRDT ops with one undo step per gesture.
**Out:** crop/mask editing ([SN-MED-007](images-media.md#sn-med-007)); lock/caption/sticky UI ([SN-MED-013](images-media.md#sn-med-013)); lasso multi-select (owned by [SN-ED-004](editor.md#sn-ed-004)); the ingest/decode pipeline ([SN-MED-003](images-media.md#sn-med-003)).

#### Acceptance criteria
- [ ] An image can be moved, resized from side handles (one axis), scaled from corner handles (aspect-locked by default; free with modifier), and rotated with 15°/45° snap; the rendered result matches the transform (golden at several transforms).
- [ ] Dragging shows alignment guides (dashed centre, solid edge) that snap to page centre and to neighbouring objects within a small threshold; releasing outside the threshold does not snap.
- [ ] Z-order actions reorder the object relative to ink and other objects and persist; concurrent reorders converge (CRDT, [SN-MED-002](images-media.md#sn-med-002)).
- [ ] Only the selected/active object repaints during a transform (RepaintBoundary asserted); manipulating an image never causes a frame > 16.7 ms while another stroke could be drawn (profile timeline attached).
- [ ] Each gesture pushes exactly one undo step; undo restores the previous transform exactly and reselects the object.

#### Technical notes
Add `packages/sane_render/lib/src/media/image_object_painter.dart` and the interaction controller in `app/lib/features/media/` on the editor tool state ([SN-ED-002](editor.md#sn-ed-002)). Draw with `Canvas.drawImageRect` using the cached scaled `ui.Image` from [SN-MED-003](images-media.md#sn-med-003); transform via `Canvas.transform`/matrix. Guides are computed against page geometry + sibling object bounds; snap thresholds are tokens, not literals. Handles/guide colours from `sane_ui` tokens (never `Color(0x…)`, CLAUDE.md §9). Transforms are CRDT LWW registers on the object (ADR-0005) written as op-log ops so they sync + undo. Wrap the active object in its own `RepaintBoundary` above finished ink so ink stays cached (overview §6, rendering-and-performance.md). Implements PRD-LB-181, PRD-ED-113/111.

#### Security & privacy
Baseline: image bytes stay local + encrypted (decision 3), no content logged. Cap guide/snap computation and repaint work to the viewport + nearby objects so a page with thousands of objects cannot make a drag O(n) unbounded (CWE-400). Validate that a transform op targets an object in the open notebook before applying. IDs: MASVS-STORAGE-1, CWE-400.

#### UX notes
Surface: Editor canvas object manipulation (docs/design/screens-and-flows.md §7 canvas; design-system object-handle styling). Handles, guides and the context bar use `sane_ui` tokens and render in all 17 looks + light/dark (guides stay visible on both neon and paper looks). A11y: handles are keyboard-operable on web (arrow-key nudge, resize with modifiers) with numeric size/rotation announced; the context bar actions carry Semantics labels; 44 pt/48 dp targets. Empty state: no selection = no frame. Manipulating a locked object ([SN-MED-013](images-media.md#sn-med-013)) shows the frame greyed with a hint rather than moving it.

#### Test plan
`packages/sane_render/test/media/image_object_painter_golden_test.dart` (transforms, z-order over/under ink, per-look), `app/test/features/media/image_transform_test.dart` (handle math, aspect-lock, rotate snap, alignment-guide snap, undo-per-gesture), `image_transform_bench_test.dart` (RepaintBoundary + frame budget). Integration in `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-002](images-media.md#sn-med-002) (object facets incl. zOrder/rotation), [SN-MED-003](images-media.md#sn-med-003) (decoded/cached image), [SN-ED-002](editor.md#sn-ed-002) (editor canvas + tool state). Coordinates with [SN-ED-004](editor.md#sn-ed-004) (lasso multi-select).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-007

<a id="sn-med-007"></a>

**Crop, mask and rotate images with rectangular and freehand non-destructive edits**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-006](images-media.md#sn-med-006) |
| Security controls | `MASVS-STORAGE-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Students rarely want the whole photo — they want the figure, the paragraph, the diagram. PRD-LB-181 requires **crop (rectangular + freehand)** as part of image editing, and PRD-ED-114 requires **rectangular and freeform crop/mask of inserted images, non-destructive** (docs/product/prd-02-library-documents-audio-search.md §8; docs/product/prd-01-editor-ink-brushes.md §10). Non-destructive is the key word: cropping only changes what is displayed (the `cropRect`/`maskPath` on the object, [SN-MED-002](images-media.md#sn-med-002)), never the stored blob, so the crop is fully reversible and the original pixels are always recoverable. This builds on the transform work ([SN-MED-006](images-media.md#sn-med-006)) by adding a dedicated crop/mask editing mode.

#### Scope
**In:** a crop/mask edit mode entered from the image context bar; a rectangular crop with draggable edges/corners and optional aspect presets (free/original/1:1/4:3/16:9); a **freehand mask** (draw a closed path with pen/finger) that clips the image to an arbitrary shape; live preview with dimmed out-of-crop area; reset-crop; applying writes `cropRect`/`maskPath` LWW registers (never mutates the blob); rotate-in-crop (straighten) baked into the display transform; one undo step for a crop apply.
**Out:** the transform handles/guides/z-order ([SN-MED-006](images-media.md#sn-med-006)); background removal / generative edits (out of scope for v1); the blob pipeline ([SN-MED-003](images-media.md#sn-med-003)); shape recognition ([SN-SHP-001](shapes-diagrams.md#sn-shp-001)).

#### Acceptance criteria
- [ ] Rectangular crop clips the visible image to the chosen rect with the out-of-crop area dimmed during editing; presets constrain the aspect while dragging.
- [ ] Freehand mask clips the image to a drawn closed path (anti-aliased edge); an open path auto-closes on release.
- [ ] Crop/mask is **non-destructive**: the stored blob is byte-identical before and after (test); reset-crop restores the full image exactly.
- [ ] Straighten rotates the displayed image without cropping data loss beyond the crop rect and persists as part of the display transform.
- [ ] Applying a crop pushes one undo step; undo restores the previous crop/mask; the edit renders correctly in all 17 looks + light/dark (golden).

#### Technical notes
Implement the crop/mask editor in `app/lib/features/media/` writing `cropRect` (LWW) and `maskPath` (LWW VectorPath) on the object ([SN-MED-002](images-media.md#sn-med-002)); rendering respects them via `Canvas.clipRect`/`clipPath` in the `ImageObjectPainter` ([SN-MED-006](images-media.md#sn-med-006)). Freehand path capture reuses the ink `Listener` capture discipline (raw pointer, pen vs finger) but produces a vector clip path, not a stroke. Aspect presets and dim colour are tokens. Because it is display-only clipping, no re-encode/isolate hop is needed. Implements PRD-LB-181 (crop), PRD-ED-114 (crop & mask, non-destructive). Keep the mask path bounded (simplify via RDP) so a pathological freehand path cannot explode clip cost (CWE-400).

#### Security & privacy
Baseline: edits are display-only, local, and E2E-encrypted with the object on sync (decision 3); the original blob is never modified, so no data is destroyed and a crop can always be undone. Bound mask-path complexity before clipping to avoid a resource-exhaustion path (CWE-400). No content logged. IDs: MASVS-STORAGE-1, CWE-400.

#### UX notes
Surface: image crop/mask mode from the object context bar (docs/design/screens-and-flows.md §7 canvas object actions; design-system). The crop UI dims the discarded region and shows edge/corner handles; freehand mask shows a live outline. All 17 looks + dark; the dim overlay respects the look's surface tokens. A11y: aspect presets are labelled segmented controls; rectangular crop handles are keyboard-nudgeable on web with numeric readout; freehand mask offers an "undo last point" and is not the only path to crop (rectangular is keyboard-accessible). Empty/error: reset-crop always available.

#### Test plan
`app/test/features/media/image_crop_test.dart` (rect crop clipping, aspect presets, freehand mask close, non-destructive blob-identity, reset, straighten, undo), golden `image_crop_golden_test.dart` (rect + freehand across representative looks). Feeds `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-006](images-media.md#sn-med-006) (image object rendering + transform this mode edits).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-008

<a id="sn-med-008"></a>

**Paste images from the clipboard and drag-and-drop from other apps**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-003](images-media.md#sn-med-003), [SN-MED-006](images-media.md#sn-med-006) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-STORAGE-1`, `CWE-20`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
The fastest way to get an image into a note is often to paste it or drag it from Safari, Files, Photos, or a split-screen app. PRD-ED-119 requires **paste an image from the system clipboard** (with the Web caveat that the Async Clipboard API needs a user gesture and a Promise value on Safari), and the MED scope adds **drag-and-drop from other apps** (docs/product/prd-01-editor-ink-brushes.md §10; CLAUDE.md §7.8 treats clipboard + share-sheet payloads as hostile input). Both are just alternate entry points into the same hardened ingest pipeline ([SN-MED-003](images-media.md#sn-med-003)) and object placement ([SN-MED-006](images-media.md#sn-med-006)), but they carry a security requirement the picker does not: the payload is fully untrusted and the clipboard must only ever be read on an **explicit** paste, never on launch/focus (checklist §1.2).

#### Scope
**In:** paste handling (⌘V/Ctrl+V + context-menu Paste) that reads an image from the system clipboard on explicit action only, routes it through [SN-MED-003](images-media.md#sn-med-003) (incl. EXIF strip [SN-MED-004](images-media.md#sn-med-004)), and places it at the caret/viewport centre selected; drag-and-drop targets on the canvas accepting image drops from other apps (iPadOS drag/drop, Android drag, desktop-web `DataTransfer`), with a drop indicator and drop-at-pointer placement; multi-item paste/drop inserts several images arranged without overlap; graceful handling when the clipboard/drop has no supported image.
**Out:** pasting ink/objects within the app (editor clipboard, [SN-ED-002](editor.md#sn-ed-002)); pasting text (text tool, [SN-TXT-001](text.md#sn-txt-001)); the ingest pipeline internals ([SN-MED-003](images-media.md#sn-med-003)); transform/crop ([SN-MED-006](images-media.md#sn-med-006)/[SN-MED-007](images-media.md#sn-med-007)).

#### Acceptance criteria
- [ ] Paste inserts a clipboard image only on an explicit paste action; the app never auto-reads the clipboard on launch or focus (test asserts no read without the gesture).
- [ ] On web, paste uses the Async Clipboard API from a user gesture and handles the Safari Promise-value path; a denied/empty clipboard shows a non-blocking hint, not a crash.
- [ ] Dragging an image from another app onto the canvas shows a drop indicator and inserts the image at the drop point; dropping a non-image or unsupported type is rejected with a hint.
- [ ] Pasted/dropped images pass through validation + EXIF strip (renamed/oversized/bomb payloads fail closed, metadata removed) — negative tests.
- [ ] Multi-image paste/drop inserts each as a separate selectable object without overlapping stack; each insert is one undo step.

#### Technical notes
Implement in `app/lib/features/media/` using `Clipboard`/platform clipboard for mobile, `super_clipboard`-style rich clipboard or the browser Async Clipboard API on web, and `super_drag_and_drop`/platform drag targets for cross-app drops. Route every payload through [SN-MED-003](images-media.md#sn-med-003) (MIME sniff, caps, decode off UI isolate) — do not trust the declared type. Read clipboard only inside the paste handler (checklist §1.2 MUST NOT auto-read). Placement uses the [SN-MED-006](images-media.md#sn-med-006) object controller. Web needs COOP/COEP-safe clipboard access and a user gesture (checklist §6.2; ADR-0010). Implements PRD-ED-119 + MED drag-and-drop scope.

#### Security & privacy
Clipboard and cross-app drops are hostile input (TM-I-07, checklist §1/§1.2): treat every payload as untrusted, validate type/size/dimensions before decode (CWE-20, CWE-400), and read the clipboard only on explicit paste (never on launch/focus). Strip EXIF on paste/drop ([SN-MED-004](images-media.md#sn-med-004)). Do not log clipboard/drop content or source app. On Android, respect `EXTRA_IS_SENSITIVE` when the source marks content sensitive. IDs: MASVS-PLATFORM-1, MASVS-PLATFORM-2, MASVS-STORAGE-1, CWE-20, CWE-400.

#### UX notes
Surface: canvas paste + drop (docs/design/gestures-and-shortcuts.md paste shortcut; §7 canvas). A drop shows a dashed insertion indicator at the pointer; paste places at caret/viewport centre. All 17 looks + dark for the drop indicator/hint. Empty/error states: "No image on the clipboard" / "That file type isn't supported" as non-blocking toasts. A11y: paste is keyboard-triggerable on web (⌘V) and announced on success; drag-drop has a keyboard-free alternative via the Insert-media picker ([SN-MED-005](images-media.md#sn-med-005)); no action is drop-only.

#### Test plan
`app/test/features/media/paste_image_test.dart` (explicit-read-only, empty/denied clipboard, multi-item), `drag_drop_image_test.dart` (image drop inserts at point, non-image rejected, EXIF-stripped, fail-closed on bomb). Web-specific gesture path covered with a fake clipboard. Integration in `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-003](images-media.md#sn-med-003) (ingest pipeline), [SN-MED-006](images-media.md#sn-med-006) (object placement/transform). Coordinates with [SN-MED-004](images-media.md#sn-med-004) (EXIF strip) and [SN-ED-002](editor.md#sn-ed-002) (editor clipboard for in-app objects).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-009

<a id="sn-med-009"></a>

**Add a document scanner with edge detection and perspective correction**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, ios-phone, android-tablet, android-phone |
| Areas | images-media, ocr-hwr |
| Size | L |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-003](images-media.md#sn-med-003), [SN-MED-005](images-media.md#sn-med-005), [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PRIVACY-3`, `MASVS-CODE-4`, `CWE-20`, `CWE-250` |
| Extra labels | agent-ready |

#### Context
Scanning a worksheet or a page from a textbook is table-stakes for a study app — every major competitor ships it (research/competitor-feature-matrix.md: "Document scanner — v1"). PRD-LB-182 requires document scanning to **detect page edges, offer corner adjustment, perspective-correct, and (Apple) index scanned text as searchable**, with multi-page scans creating a PDF-backed set of pages; PRD-ED-120 requires camera scan with auto-crop & straighten inserted as an image or OCR'd page (docs/product/prd-02-library-documents-audio-search.md §8; docs/product/prd-01-editor-ink-brushes.md §10). This uses native document-scan capability where available and degrades gracefully elsewhere. The scanner is reached from the Insert-media picker ([SN-MED-005](images-media.md#sn-med-005)) and from the Import overlay's "Scan with camera" source (docs/design/screens-and-flows.md §9).

#### Scope
**In:** a scan flow that opens the platform document scanner (iOS/iPadOS VisionKit `VNDocumentCameraViewController`; Android ML Kit Document Scanner / `GmsDocumentScanning`) via `sane_ml_native` ([SN-MED-012](images-media.md#sn-med-012)-independent); automatic edge detection + perspective correction + de-skew; a **corner-adjust** review step to fix a mis-detected quad; multi-page capture accumulating into a PDF-backed page set (or a flattened image for a single page); output routed through [SN-MED-003](images-media.md#sn-med-003) for storage; a colour/greyscale/B&W filter choice; a manual-fallback crop when native scanning is unavailable.
**Out:** OCR of the scan (the searchable text layer is [SN-MED-010](images-media.md#sn-med-010)); the PDF page-set render/annotate engine ([SN-PDF-002](pdf.md#sn-pdf-002)); the picker UI ([SN-MED-005](images-media.md#sn-med-005)); EXIF handling ([SN-MED-004](images-media.md#sn-med-004)); web (no camera scanner — degrades to file upload via [SN-MED-005](images-media.md#sn-med-005)).

#### Acceptance criteria
- [ ] Scanning detects the page quad, perspective-corrects and de-skews to a rectangular page; a mis-detected quad can be corrected by dragging the four corners before confirming.
- [ ] A multi-page scan produces a PDF-backed page set inserted after the current page; a single-page scan can be inserted as a flattened image or a one-page PDF (user choice).
- [ ] Colour / greyscale / black-and-white filters are selectable and applied before storage.
- [ ] Camera permission is requested lazily with a rationale; denial shows an "Enable in Settings" recovery, never a crash (test).
- [ ] Where native scanning is absent (web, unsupported OS), the flow degrades to file upload + manual crop with a clear note; the feature never hard-fails on an unsupported surface.

#### Technical notes
Wrap the platform scanners behind the `sane_ml_native` federated plugin (ADR-0012: Vision/VisionKit on Apple, ML Kit Document Scanner on Android) with a Pigeon-typed channel and a capability probe; consumers depend on the platform-interface, never a concrete impl. Corrected page images flow through [SN-MED-003](images-media.md#sn-med-003) (decode/downscale/encrypt off the UI isolate). Multi-page output builds a PDF assembled for [SN-PDF-002](pdf.md#sn-pdf-002) to render as PDF-backed pages (document-model §pdfBacked). Structured document scan on Apple can use Vision `RecognizeDocumentsRequest` where available (docs/product/prd-01-editor-ink-brushes.md §10 ref). Capability-query, not platform-check (ADR-0012 rule 4). Implements PRD-LB-182, PRD-ED-120.

#### Security & privacy
Camera is a sensitive capability: request it lazily, in-context, with a rationale, scoped to scanning only (MASVS-PRIVACY-3, CWE-250; checklist §8). Native scanner output is still untrusted image data — validate + decode via [SN-MED-003](images-media.md#sn-med-003) (MASVS-CODE-4, CWE-20). Scan + any OCR happen on-device (screens §12 on-device recognition); no scan bytes leave the device without explicit opt-in. Validate the plugin channel payload sizes/ranges (checklist §2). No scan content or paths logged. IDs: MASVS-PLATFORM-1, MASVS-PRIVACY-3, MASVS-CODE-4, CWE-20, CWE-250.

#### UX notes
Surface: "Document scan" source in the Insert-media picker ([SN-MED-005](images-media.md#sn-med-005)) and "Scan with camera — Auto-crop & straighten" in the Import overlay (docs/design/screens-and-flows.md §9). The review step shows the detected quad with draggable corners and a filter row. Loading state during capture/processing; error state on permission denial or detection failure with a manual-crop fallback; offline is irrelevant (on-device). All 17 looks + dark for the review chrome. A11y: corner handles keyboard-adjustable on platforms with a keyboard; filters are labelled; the scanned page gets OCR-backed alt text via [SN-MED-010](images-media.md#sn-med-010).

#### Test plan
`app/test/features/media/document_scanner_test.dart` (routing, multi-page accumulation, single-page image-vs-PDF choice, permission-denied recovery, unsupported-surface degradation), plugin contract test with a mock `sane_ml_native` scanner. Manual device steps documented for the native scanner UI. Integration in `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-003](images-media.md#sn-med-003) (ingest), [SN-MED-005](images-media.md#sn-med-005) (picker entry), [SN-PDF-002](pdf.md#sn-pdf-002) (PDF-backed page render). Uses the `sane_ml_native` plugin (ADR-0012). OCR indexing via [SN-MED-010](images-media.md#sn-med-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-010

<a id="sn-med-010"></a>

**Hook image OCR and on-device alt-text generation for search and screen readers**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | all |
| Areas | images-media, ocr-hwr, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-003](images-media.md#sn-med-003), [SN-HWR-001](ocr-hwr.md#sn-hwr-001), [SN-SRCH-002](search.md#sn-srch-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `MASVS-CODE-4`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
Two differentiators ride on the same on-device image-understanding hook. First, **OCR on import**: PRD-LB-305 requires OCR of imported images and text-layerless content so their text becomes searchable — explicitly beating Goodnotes, which does not OCR imports (docs/product/prd-02-library-documents-audio-search.md §11.3). Second, **accessibility**: PRD-ED-113 and PRD-LB-370 require inserted images to carry OCR-backed alt text / on-device image descriptions so screen readers can describe them (docs/product/prd-01-editor-ink-brushes.md §10; docs/product/prd-02 §16). Both run on-device by default with the "runs on your device" posture; any cloud escalation is per-request opt-in with the data-leaves-device banner (Locked Decision 6; checklist §11). This issue is the hook that, when an image is inserted, runs OCR + (where available) a caption/description, writes recognised text into the search index ([SN-SRCH-002](search.md#sn-srch-002)) with page/quad locality, and fills the object's `altText` ([SN-MED-002](images-media.md#sn-med-002)).

#### Scope
**In:** an `ImageRecognitionHook` invoked after ingest ([SN-MED-003](images-media.md#sn-med-003)) that runs OCR via `sane_ml`/`sane_ml_native` (Apple Vision `VNRecognizeTextRequest`; Android ML Kit Text Recognition / PaddleOCR; web Tesseract.js) off the UI isolate; writing recognised text + bounding quads to the FTS index ([SN-SRCH-002](search.md#sn-srch-002)) as `source=pdf`/image rows with `docId/pageIndex/quads` for deep-linking; generating alt text (OCR summary, plus on-device image description where the platform offers it) into `altText` with `altTextSource=ocr|description`; a user affordance to edit/replace the generated alt text; a per-request cloud-OCR opt-in path (banner) for hard cases; language selection following device locale.
**Out:** the recognition engines themselves ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)); the FTS index internals ([SN-SRCH-002](search.md#sn-srch-002)); handwriting recognition of ink strokes (PRD-LB-300, [SN-HWR-001](ocr-hwr.md#sn-hwr-001)); data-detector actions (PRD-LB-388, later); the alt-text prompt UI plumbing shared with captions ([SN-MED-013](images-media.md#sn-med-013)).

#### Acceptance criteria
- [ ] Inserting an image with legible text produces index rows whose recognised text is findable in search and whose result deep-links to the image's page + on-image quad ([SN-SRCH-002](search.md#sn-srch-002)).
- [ ] The image object gets non-empty `altText` with `altTextSource` set; a screen reader reads the description; the user can edit or clear it.
- [ ] OCR runs on-device by default (airplane-mode works); cloud OCR is only invoked after an explicit per-request opt-in showing the data-leaves-device banner (test both paths).
- [ ] Recognition runs off the UI isolate and is cancellable; inserting an image never blocks the draw loop or adds a frame > 16.7 ms (profile).
- [ ] Recognition language defaults to the device locale and can be overridden; an unrecognisable image yields empty text + a generic alt-text fallback, never a crash.

#### Technical notes
Implement the hook in `app/lib/features/media/` calling `sane_ml` adapters backed by `sane_ml_native` (ADR-0012, ADR-0016 engine matrix: Apple Vision / ML Kit Text / PaddleOCR / Tesseract.js). Index writes go to `sane_search` ([SN-SRCH-002](search.md#sn-srch-002)) with the `SearchIndexRow` shape (`docId,pageIndex,source,text,quads,lang` — PRD-02 §2, §10.1). Alt-text generation prefers an on-device image-description model where present (ADR-0016), else an OCR-derived summary. Run on the search/one-shot isolate (overview §6), never the UI isolate. On-device-first, cloud opt-in per Locked Decision 6 + checklist §11. Implements PRD-LB-305, PRD-LB-370, PRD-ED-113 (a11y).

#### Security & privacy
Privacy-by-design: recognition is on-device by default; no image or recognised text leaves the device unless a per-request cloud opt-in is taken with the visible banner (MASVS-PRIVACY-1; checklist §11). Validate recognition-engine outputs before storing/indexing (bound text length, NFC-normalise, reject control chars — CWE-20, MASVS-CODE-4). Index rows are note content — stored locally, E2E-encrypted on sync, never logged. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, MASVS-CODE-4, CWE-20.

#### UX notes
Surface: the "on-device recognition" posture users see (docs/design/screens-and-flows.md §12), search results with an image thumbnail + snippet (§11), and the alt-text field on an image (shared with caption UI, [SN-MED-013](images-media.md#sn-med-013)). A subtle "Text recognised on your device" affordance; the cloud-OCR opt-in shows the standard data-leaves-device banner. All 17 looks + dark for any chrome. A11y is the point: every image ends up describable; the alt-text editor is labelled and keyboard-reachable. Loading: recognition runs in the background with a quiet indicator; error: falls back to generic alt text.

#### Test plan
`app/test/features/media/image_recognition_hook_test.dart` (OCR → index rows with quads, alt-text filled + editable, on-device default, cloud opt-in gated by banner, language override, empty-image fallback), off-isolate/frame-budget bench. Uses a fake `sane_ml` adapter. Integration with a search deep-link in `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-003](images-media.md#sn-med-003) (ingest produces the image to recognise), [SN-HWR-001](ocr-hwr.md#sn-hwr-001) (recognition engines/adapters), [SN-SRCH-002](search.md#sn-srch-002) (FTS index target). Alt-text UI shares with [SN-MED-013](images-media.md#sn-med-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-011

<a id="sn-med-011"></a>

**Ship first-party stickers and starter packs including the Sage mascot set**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, brand |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-006](images-media.md#sn-med-006), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-1` |
| Extra labels | agent-ready |

#### Context
Stickers make notes playful and are a low-friction win: PRD-LB-180 lists **Stickers/Elements** as a first-class Insert-media source, and PRD-ED-116 requires a library of first-party stickers **including the Sane Sage mascot set** (docs/product/prd-02-library-documents-audio-search.md §8; docs/product/prd-01-editor-ink-brushes.md §10). The mascot has a hard rule: the Sage is a **fixed-colour trademark — never recolour, stretch, or flip** (design-system §1; CLAUDE.md §9), and the current mascot art is a **watermarked placeholder, not releasable** (CLAUDE.md §9) — so this issue references the mascot through the single `SaneSageMark`/sticker-asset indirection so the placeholder swaps in one place. This delivers the sticker picker + placement of first-party sticker packs as Sticker objects; the personal element library (user-made stickers) is [SN-MED-012](images-media.md#sn-med-012).

#### Scope
**In:** a bundled sticker catalogue (a starter set + the Sage mascot set) as `stickerId`-addressed vector/raster assets; a sticker picker panel (browse by pack, search by name) opened from the Insert-media picker ([SN-MED-005](images-media.md#sn-med-005)); placing a sticker as a **Sticker object** ([SN-MED-002](images-media.md#sn-med-002), `stickerId` set) that is scalable/rotatable/z-orderable via [SN-MED-006](images-media.md#sn-med-006); per-sticker names/alt text for a11y; the Sage-mascot integrity rule (aspect-locked scaling only, no recolour/flip); dark-mode-aware sticker variants where needed.
**Out:** user-created stickers from selections + collections ([SN-MED-012](images-media.md#sn-med-012)); a paid sticker store (template/marketplace store is [SN-TPL-001](templates.md#sn-tpl-001) scope); GIFs ([SN-MED-014](images-media.md#sn-med-014)); the object transform engine ([SN-MED-006](images-media.md#sn-med-006)); final mascot art (blocked on commissioned art, CLAUDE.md §13).

#### Acceptance criteria
- [ ] The sticker picker lists bundled packs (starter + Sage) with names and searchable labels; selecting one inserts a Sticker object at viewport centre, selected.
- [ ] A placed sticker scales, rotates and z-orders via the shared transform ([SN-MED-006](images-media.md#sn-med-006)); the Sage mascot scales aspect-locked only and cannot be recoloured or flipped (test asserts the constraint).
- [ ] Every sticker carries a name + alt text exposed to screen readers.
- [ ] Stickers render crisply at all sizes in all 17 looks + light/dark (golden); dark-mode variants are used where a light-only sticker would disappear.
- [ ] The mascot is referenced only through the single `SaneSageMark`/sticker-asset indirection so the placeholder can be swapped in one place; a build embedding the placeholder is flagged not-releasable (CLAUDE.md §9).

#### Technical notes
Store bundled sticker assets under `packages/sane_ui` (assets) addressed by `stickerId`; place via the Sticker branch of the media object ([SN-MED-002](images-media.md#sn-med-002)) and render/transform through [SN-MED-006](images-media.md#sn-med-006). Prefer vector (SVG→`Picture`) for crispness; raster stickers go through the standard blob path. The Sage is a fixed-colour mark surfaced via `SaneSageMark` (design-system §1) — enforce no-recolour/no-flip at the object level. Picker UI reuses `sane_ui` components ([SN-DS-003](design-system.md#sn-ds-003)). Bundled assets only (no runtime download here) — MASVS-CODE-1 keep-current, no active content in assets. Implements PRD-LB-180 (stickers source), PRD-LB-183 (starter set), PRD-ED-116.

#### Security & privacy
Baseline: bundled, trusted assets only — no untrusted decode, no network (MASVS-CODE-1). Stickers are local note content, E2E-encrypted on sync (decision 3), never logged. No SVG scripting / active content in bundled assets. IDs: MASVS-STORAGE-1, MASVS-CODE-1.

#### UX notes
Surface: Stickers panel from the Insert-media picker (docs/design/screens-and-flows.md §7 canvas; §8-style overlay) and the mascot per design-system §1. Packs are browsable with previews; the Sage set is highlighted as the brand voice. All 17 looks + dark; the Sage keeps its trademark colours in every look (never themed). A11y: each sticker is a labelled, keyboard-reachable button ("Sage waving sticker"), 44 pt/48 dp; placed stickers announce their name. Empty state: search with no match shows "No stickers match".

#### Test plan
`app/test/features/media/sticker_picker_test.dart` (browse/search, insert-as-Sticker-object, mascot no-recolour/no-flip constraint, alt-text present), golden `sticker_render_golden_test.dart` (representative stickers across looks + dark). Feeds `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-006](images-media.md#sn-med-006) (object transform/render), [SN-DS-003](design-system.md#sn-ds-003) (picker components). Coordinates with [SN-BRD-001](brand.md#sn-brd-001) (mascot art) and [SN-TPL-001](templates.md#sn-tpl-001) (store).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-012

<a id="sn-med-012"></a>

**Build a personal element library with stickers created from lasso selections**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, study |
| Size | L |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-011](images-media.md#sn-med-011), [SN-ED-004](editor.md#sn-ed-004) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CODE-4`, `MASVS-PLATFORM-2`, `CWE-20` |
| Extra labels | agent-ready, innovation |

#### Context
The standout media feature is a **personal element library**: a reusable library of any content — handwriting, shapes, images, combos — organised into collections, created from a lasso selection, and inserted by tap/drag. PRD-LB-183 requires exactly this and says **users MUST be able to make their own stickers from handwriting**, with collections shareable as a collection file (docs/product/prd-02-library-documents-audio-search.md §8); PRD-ED-117/118 add the elements/graphics library and a snippet clipboard (docs/product/prd-01-editor-ink-brushes.md §10). This turns a student's own diagrams, formula templates, and doodles into reusable stamps — a genuine differentiator. It builds on the first-party sticker infrastructure ([SN-MED-011](images-media.md#sn-med-011)) and the lasso selection engine ([SN-ED-004](editor.md#sn-ed-004)). ⚠ PRD-02 tags this M5 (older study/AI-layer numbering); per docs/roadmap.md issues/milestones.json is authoritative and the roadmap delivers Images & media at M2 — this ships with the media area at M2 but at low priority (p3) since it is depth, not a launch blocker.

#### Scope
**In:** a "Save as element/sticker" action on a lasso selection ([SN-ED-004](editor.md#sn-ed-004)) that flattens the selected objects (strokes/shapes/images) into a reusable element (vector where possible, raster fallback via [SN-MED-003](images-media.md#sn-med-003)); a **My Elements** library grouped into user-renamable collections (create/rename/reorder/delete); insert by tap or drag onto the page as an object; export/import a collection as a `.saneelements` bundle; per-element name + alt text.
**Out:** first-party bundled stickers ([SN-MED-011](images-media.md#sn-med-011)); the lasso engine itself ([SN-ED-004](editor.md#sn-ed-004)); the marketplace/store ([SN-TPL-001](templates.md#sn-tpl-001)); cross-device sync of collections (rides the normal op-log, [SN-SYNC-001](sync.md#sn-sync-001)).

#### Acceptance criteria
- [ ] Lassoing content and choosing "Save as element" creates a reusable element preserving the selection's appearance (golden compares element vs source region); handwriting-only selections work (PRD-LB-183 "stickers from handwriting").
- [ ] Elements live in named collections that can be created, renamed, reordered and deleted; deleting an element is confirmed and undoable within the session.
- [ ] Inserting an element places a new object (or object group) editable independently of the saved element (the element is a template, not a live link).
- [ ] A collection exports to a `.saneelements` bundle and re-imports losslessly; importing a **hostile/malformed** bundle fails **closed**, is parsed off the UI isolate, resource-capped and path-confined (negative test).
- [ ] The My Elements UI renders in all 17 looks + dark, is keyboard-navigable on web, and every element has a name + alt text.

#### Technical notes
Flatten a selection using the render pipeline (`sane_render`) to produce a vector `Picture` or a rasterised blob ([SN-MED-003](images-media.md#sn-med-003)); store element metadata + blob refs in `sane_core` ([SN-MED-002](images-media.md#sn-med-002) sticker/element facet, `mediaKind=element`). Collections are library entities; a `.saneelements` bundle reuses the `.sanenote` manifest/segment/blob discipline (file-format.md) with strict-parse + schema validation on import. Insertion emits object-create ops through the editor tool state ([SN-ED-002](editor.md#sn-ed-002)). Implements PRD-LB-183, PRD-ED-117/118. Bundle import follows the untrusted-input checklist (§1): validate MIME/schema, cap entries/size, canonicalise paths, import into the user's own store.

#### Security & privacy
Element bundles are untrusted input on import (checklist §1, TM-T-06): validate schema, cap resources before decode (CWE-20, decompression bombs), canonicalise/confine paths, strip active content, parse off the UI isolate, fail closed (MASVS-CODE-4, MASVS-PLATFORM-2). Elements are note content, E2E-encrypted on sync (decision 3), never logged. Exported bundles carry only user content the user chose to share. IDs: MASVS-STORAGE-1, MASVS-CODE-4, MASVS-PLATFORM-2, CWE-20.

#### UX notes
Surface: My Elements panel (Insert-media picker → Elements; docs/design/screens-and-flows.md §7 canvas + §8-style overlay). Create-from-selection appears in the lasso context menu (design gestures-and-shortcuts.md). All 17 looks + dark. Empty state: "No elements yet — lasso anything and Save as element." Loading (bundle import) + error (bad bundle) + offline (share via file, no network) states specified. A11y: elements are labelled, keyboard-insertable; collections navigable by screen reader.

#### Test plan
`app/test/features/media/element_library_test.dart` (save-from-selection incl. handwriting, collection CRUD, insert-as-independent-object, export/import round-trip), `element_bundle_fuzz_test.dart` (malformed/hostile bundle fails closed), golden for the panel across looks. Integration in `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-011](images-media.md#sn-med-011) (sticker/element infrastructure), [SN-ED-004](editor.md#sn-ed-004) (lasso selection). Coordinates with [SN-MED-003](images-media.md#sn-med-003) (raster fallback), [SN-SYNC-001](sync.md#sn-sync-001) (collection sync), [SN-TPL-001](templates.md#sn-tpl-001) (store).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans, fuzz)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-013

<a id="sn-med-013"></a>

**Add media lock, captions and writable sticky notes**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media, editor |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-002](images-media.md#sn-med-002), [SN-MED-006](images-media.md#sn-med-006) |
| Security controls | `MASVS-STORAGE-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Once a page has images, GIFs and sticky notes on it, users need to stop nudging them by accident and to annotate them. PRD-LB-184 requires media objects to be **lockable in place** to prevent accidental edits, to optionally show a **caption**, and requires **writable sticky notes** (pen/highlighter), resizable, available in blank/ruled/grid/dot styles (docs/product/prd-02-library-documents-audio-search.md §8). Lock and caption are small facets on the media object ([SN-MED-002](images-media.md#sn-med-002)); the sticky note is a small composite object (a tinted card the user can write on). This issue delivers all three so media feels finished and durable on the page.

#### Scope
**In:** a **lock** toggle on any media object (image/sticker/GIF/element) that disables move/resize/rotate/crop until unlocked, with a clear locked affordance; an optional **caption** below a media object (editable text, shown/hidden, wraps, localised); a **sticky note** object — a resizable tinted card in blank/ruled/grid/dot styles that accepts pen + highlighter ink and (optionally) typed text; the lock/caption entry points on the media context bar ([SN-MED-006](images-media.md#sn-med-006)); persistence of `locked`/`caption` as CRDT registers.
**Out:** the object transform engine ([SN-MED-006](images-media.md#sn-med-006)); alt text (accessibility description, [SN-MED-010](images-media.md#sn-med-010)); note-level lock / biometric locking (PRD-LOCK, [SN-CRY-001](security.md#sn-cry-001)/[SN-SET-001](settings.md#sn-set-001) — a different feature); the ink capture engine reused by sticky notes ([SN-INK-001](ink.md#sn-ink-001)/[SN-ED-002](editor.md#sn-ed-002)).

#### Acceptance criteria
- [ ] Locking a media object prevents move/resize/rotate/crop and shows a locked affordance; unlocking restores editing; the state persists across reopen and syncs (CRDT).
- [ ] A caption can be added, edited, shown/hidden and cleared; it renders below the object, wraps, and follows the locale text direction (RTL correct).
- [ ] A sticky note can be placed, resized, and written on with pen + highlighter; blank/ruled/grid/dot styles render their rules; the note is itself lockable and captionable.
- [ ] Attempting to move a locked object gives non-destructive feedback (hint/greyed frame), never a silent move.
- [ ] Lock, caption and sticky-note chrome render correctly in all 17 looks + light/dark (golden) and are fully labelled for screen readers.

#### Technical notes
Lock + caption set the `locked`/`caption` LWW registers on the media object ([SN-MED-002](images-media.md#sn-med-002)); the transform controller ([SN-MED-006](images-media.md#sn-med-006)) checks `locked` before applying a gesture. The sticky note is a small object kind rendered by a `StickyNotePainter` in `sane_render` (tinted card + rule pattern reusing the paper-pattern strategies where sensible) with an embedded ink layer captured via the editor's `Listener` discipline. Caption text is length-bounded + NFC-normalised (CWE-20). Style/tint colours from `sane_ui` tokens (never literals, CLAUDE.md §9). Implements PRD-LB-184.

#### Security & privacy
Baseline: captions + sticky-note ink are note content, stored locally and E2E-encrypted on sync (decision 3), never logged. Validate caption input (type/length, NFC, strip control chars) before storage/search indexing (CWE-20). The media "lock" is an accidental-edit guard, not a security boundary — it is not the biometric note-lock (that is PRD-LOCK) and must not be presented as protecting content. IDs: MASVS-STORAGE-1, CWE-20.

#### UX notes
Surface: media context bar lock/caption actions and the sticky-note object (docs/design/screens-and-flows.md §7 canvas; research/notability.md §Locking/§Sticky Notes cited by PRD-LB-184). Locked objects show a small lock glyph; captions use a caption text token. Sticky notes come in blank/ruled/grid/dot with tint choices. All 17 looks + dark. A11y: lock is a labelled toggle ("Lock image, off"), captions are read after the image alt text, sticky notes announce their style; 44 pt/48 dp targets; not colour-only. Empty caption = no caption row.

#### Test plan
`app/test/features/media/media_lock_caption_test.dart` (lock blocks transforms + persists, caption CRUD + RTL, locked-move feedback), `sticky_note_test.dart` (place/resize/write, styles render, lockable/captionable), golden across looks. Integration in `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-002](images-media.md#sn-med-002) (locked/caption facets), [SN-MED-006](images-media.md#sn-med-006) (transform controller that honours lock). Sticky-note ink reuses [SN-ED-002](editor.md#sn-ed-002)/[SN-INK-001](ink.md#sn-ink-001). Alt text via [SN-MED-010](images-media.md#sn-med-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-014

<a id="sn-med-014"></a>

**Add provider-backed GIF search and insert, free on all plans**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-003](images-media.md#sn-med-003), [SN-MED-005](images-media.md#sn-med-005) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-NETWORK-2`, `MASVS-CODE-2`, `MASVS-PRIVACY-4`, `CWE-20`, `OWASP-A10` |
| Extra labels | agent-ready, needs-credentials |

#### Context
PRD-LB-180 lists **GIF (searchable, from a provider; free on all plans)** as a first-class Insert-media source (docs/product/prd-02-library-documents-audio-search.md §8; competitors: Goodnotes GIPHY, Notability). This is the epic's one routine network egress for a media source, so it needs an ADR + threat-model row and careful hardening: it queries a GIF provider (GIPHY/Tenor) over TLS, shows results, and on selection downloads the chosen GIF through the standard ingest pipeline ([SN-MED-003](images-media.md#sn-med-003)) to a local encrypted blob — after which it plays entirely offline. The provider **API key is a maintainer secret** injected via `--dart-define`/CI, never committed (checklist §0, §9.1) — hence `needs-credentials`; the feature is implemented against a capability-flagged provider client and a mock so all logic is testable without the live key.

#### Scope
**In:** a GIF search panel (query input, grid of results, attribution as the provider requires) opened from the Insert-media picker ([SN-MED-005](images-media.md#sn-med-005)); a provider client (GIPHY/Tenor) over HTTPS with the key from `--dart-define`; on selection, download the GIF via [SN-MED-003](images-media.md#sn-med-003) into a local encrypted blob and insert it as an animated media object; play/pause of the animation on the page (no autoplay beacon); free on all plans; graceful offline/empty/error states.
**Out:** the ingest/decode/storage pipeline ([SN-MED-003](images-media.md#sn-med-003)); the picker shell ([SN-MED-005](images-media.md#sn-med-005)); video embeds ([SN-MED-015](images-media.md#sn-med-015)); the provider account/key provisioning (maintainer); animated-image rendering internals shared with the object painter ([SN-MED-006](images-media.md#sn-med-006)).

#### Acceptance criteria
- [ ] Searching returns provider results over HTTPS with required attribution; typing debounces requests; no request fires without a query.
- [ ] Selecting a GIF downloads it through [SN-MED-003](images-media.md#sn-med-003) to a **local encrypted blob**; after insert it plays fully offline (airplane-mode test) and can be paused.
- [ ] The provider key is read only from `--dart-define`/secure config — no key in source/tests/fixtures (gitleaks-clean); with no key configured, the GIF source is disabled with a clear message rather than crashing.
- [ ] All network calls use TLS 1.2+; the response is validated (content-type, size caps) before decode; a hostile/oversized response fails closed (negative test).
- [ ] GIF is available on the free plan; the panel renders in all 17 looks + dark, degrades cleanly offline ("You're offline — GIF search needs a connection"), and is keyboard-navigable on web.

#### Technical notes
Add `app/lib/features/media/gif/` with a `GifProviderClient` interface + a GIPHY/Tenor impl and a mock; key via `--dart-define` (overview §7.1). Every download flows through [SN-MED-003](images-media.md#sn-med-003) (MIME sniff, size cap, decode off UI isolate) so a GIF is treated like any untrusted image; store as an animated media object (`mediaKind=gif`) played via the object painter ([SN-MED-006](images-media.md#sn-med-006)). Record the egress in an ADR + a threat-model row (new network call rule, CLAUDE.md §7.4). TLS 1.2+ enforced, no cleartext (checklist §8); pin our own endpoints only (the provider is third-party — validate responses strictly). Implements PRD-LB-180 (GIF).

#### Security & privacy
This is a network egress (TM new-call rule, checklist §7.4/§8): document purpose + data sent (only the search query) in the PR; TLS 1.2+ (MASVS-NETWORK-1/2); validate the provider response strictly before decode (content-type/size, CWE-20) and treat SSRF/redirect surface conservatively (https only, no attacker-controlled URL into a client — OWASP-A10). The query is a minor privacy signal — send no user identifiers, no note content, and do not log queries (MASVS-PRIVACY-4). Provider key is a secret (checklist §0). New dependency (provider SDK/HTTP) is pinned + OSV-clean (MASVS-CODE-2). IDs: MASVS-NETWORK-1, MASVS-NETWORK-2, MASVS-CODE-2, MASVS-PRIVACY-4, CWE-20, OWASP-A10.

#### UX notes
Surface: GIF source in the Insert-media picker (docs/design/screens-and-flows.md §7/§8-style overlay). Results grid with provider attribution; a search field with debounce. All 17 looks + dark. Loading (spinner during search/download), empty ("No GIFs for '<q>'"), error (provider/network failure with retry), and offline (source disabled with message) states all specified. A11y: results are labelled buttons, keyboard-navigable; attribution is readable; motion-reduced users get a paused-by-default preference.

#### Test plan
`app/test/features/media/gif_search_test.dart` (debounce, no-query-no-request, select→download→encrypted-blob→offline-play, key-absent disables source, response validation fail-closed) against the mock provider client; gitleaks asserts no key in tree. Integration behind a test flag in `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-003](images-media.md#sn-med-003) (ingest for the downloaded GIF), [SN-MED-005](images-media.md#sn-med-005) (picker entry). Maintainer supplies the provider API key (needs-credentials).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR + threat-model row for the egress)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-MED-015

<a id="sn-med-015"></a>

**Support video note capture and online-video and link embeds**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | images-media |
| Size | M |
| SDLC | implementation |
| Parent | [SN-MED-001](images-media.md#sn-med-001) |
| Depends on | [SN-MED-005](images-media.md#sn-med-005), [SN-MED-006](images-media.md#sn-med-006) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PLATFORM-1`, `CWE-20`, `CWE-601`, `OWASP-A10` |
| Extra labels | needs-decision |

#### Context
PRD-LB-389 (MAY) proposes **video note capture** and **online-video embeds** — paste a YouTube/Vimeo URL to get a playable inline preview — with the strict rule that embeds **fetch only on explicit user play, never autoplay/beacon** (docs/product/prd-02-library-documents-audio-search.md §19.4; OneNote/Goodnotes parity). The MED scope frames GIF/video/link embeds as a **decision** — hence `needs-decision`: the maintainer must choose whether v1 ships true inline video embeds (a WebView/player surface with its privacy + WebView-hardening cost) or the safer default of a **rich link card** (thumbnail + title + tap-to-open in the system player/browser), and whether local video-file capture is in scope for the zero-knowledge storage model. This issue captures the requirement and the two proposed designs so a maintainer can pick before implementation; it is not agent-ready until that decision lands.

#### Scope
**In (pending decision):** pasting/inserting a video URL → a media object; **Option A (default, safer):** a rich link/video card (on-device-fetched thumbnail + title, tap-to-play opens the system player/browser, no embedded WebView, no autoplay/beacon); **Option B:** an inline embedded player (WebView-based) with the full WebView-hardening + privacy cost, play-on-tap only; optional local video-file capture/insert as an encrypted blob via [SN-MED-003](images-media.md#sn-med-003) where storage budget allows; URL allow-listing (https + known providers) and sanitisation.
**Out:** the picker shell ([SN-MED-005](images-media.md#sn-med-005)); the object transform/render ([SN-MED-006](images-media.md#sn-med-006)); GIFs ([SN-MED-014](images-media.md#sn-med-014)); audio recording ([SN-AUD-001](audio.md#sn-aud-001)); the web-clipper/read-it-later capture (PRD-LB-390, separate).

#### Acceptance criteria
- [ ] **Maintainer decision recorded** (Option A rich card vs Option B inline WebView player; and whether local video capture is in scope) as an ADR before implementation begins.
- [ ] A pasted video URL is validated against an allow-list (https only; known providers) and sanitised; a `file:`/`javascript:`/`data:` or unknown-host URL is rejected (test).
- [ ] The embed **never autoplays and never fetches on insert** — network fetch happens only on an explicit user play/expand action (test asserts no network on insert).
- [ ] If Option A: the card shows thumbnail + title and taps out to the system player; if Option B: the WebView is hardened per checklist §6.1 (no broad JS bridge, block `file:`/`javascript:`/`data:`, TLS verified) — whichever ships is tested to those rules.
- [ ] Any local video capture is stored as an encrypted content-addressed blob; the embed card renders in all 17 looks + dark and is screen-reader labelled.

#### Technical notes
Because this is `needs-decision`, first write the ADR (Option A vs B; capture in/out) and link it here. Option A avoids a WebView entirely — fetch an oEmbed/thumbnail on explicit expand and hand playback to the OS. Option B requires a hardened `WebView`/`WKWebView` per checklist §6.1 and a new network egress (ADR + threat-model row, CLAUDE.md §7.4). URL handling follows checklist §1.1 (allow-list routes/hosts, https only, block dangerous schemes; open-redirect guard, CWE-601). Local capture (if chosen) routes through an ingest path analogous to [SN-MED-003](images-media.md#sn-med-003) for encryption/storage. Object rendered via [SN-MED-006](images-media.md#sn-med-006) (`mediaKind=videoEmbed`). Implements PRD-LB-389.

#### Security & privacy
Embeds are a network + WebView risk surface: no autoplay/beacon, fetch only on explicit play (privacy — no silent egress, checklist §11); allow-list + sanitise every URL, https only, block `file:`/`javascript:`/`data:` (MASVS-PLATFORM-1, OWASP-A10 SSRF/redirect, CWE-20, CWE-601). If a WebView ships, apply the full §6.1 hardening (no broad JS bridge, TLS verified, no file/universal access). No embed URL or note content logged. Local video blobs are E2E-encrypted (decision 3). IDs: MASVS-NETWORK-1, MASVS-PLATFORM-1, CWE-20, CWE-601, OWASP-A10.

#### UX notes
Surface: a video/link embed card on the canvas (docs/design/screens-and-flows.md §7 canvas). Card shows a poster + title + play affordance; playback is explicit. All 17 looks + dark. Empty/error: an unresolvable URL shows a plain link chip with a warning; offline shows the cached poster + tap-to-open. A11y: the card is labelled ("Video: <title>, tap to play"), keyboard-activatable, and respects reduced-motion (no animated preview). Because scope is decision-gated, the shipped interaction depends on Option A vs B.

#### Test plan
`app/test/features/media/video_embed_test.dart` (URL allow-list + scheme rejection, no-network-on-insert, play-on-tap fetch, WebView hardening if Option B, local-capture encrypted-blob if in scope), plus the ADR review. Integration behind a flag in `app/integration_test/media_test.dart`.

#### Dependencies
[SN-MED-005](images-media.md#sn-med-005) (insert entry), [SN-MED-006](images-media.md#sn-med-006) (object render). Blocked on a maintainer decision (Option A vs B; local capture in/out) — not agent-ready until the ADR lands. Related: [SN-PRV-001](privacy.md#sn-prv-001) (privacy posture), [SN-WEB-001](compat.md#sn-web-001) (WebView/PWA rules).

#### Definition of done
- [ ] Maintainer decision + ADR recorded; then code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated (embed decision + threat-model row for any egress)
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-PHN-011

<a id="sn-phn-011"></a>

**Add camera scan-first capture with auto-crop and straightening**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | images-media, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-010](library.md#sn-phn-010), [SN-MED-001](images-media.md#sn-med-001), [SN-PDF-002](pdf.md#sn-pdf-002) |
| Security controls | `MASVS-PLATFORM-2`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `MASVS-CODE-4`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
On a phone the camera is the fastest input device in the room: photographing the whiteboard or a friend's page is one of the three capture jobs docs/platform/phones.md §5 names, and 'Scan with camera — Auto-crop & straighten' is already an Import source in the design (docs/design/screens-and-flows.md §9). PRD-02 requires a dedicated Insert media action distinct from PDF import, with Photos, Camera, **Document scan (auto-crop/straighten to a multi-page PDF or flattened image)**, stickers and GIF as sources (PRD-LB-180), and PRD-04 requires that an imported photo is OCR'd on-device so it is searchable and carries alt text (PRD-CO-077).

This issue makes scan the **first-class phone capture path**: from the Capture hub ([SN-PHN-010](library.md#sn-phn-010)) the user goes straight to a camera scanner, captures one or many pages, and lands in an annotatable note — without ever visiting the library. On phones the camera-first ordering matters: Scan is the default highlighted action in the hub when the last three captures were scans.

#### Scope
**In:** the scan capture flow (live edge detection, capture, multi-page batch, retake/reorder/delete), auto-crop and perspective straightening, output as a multi-page document in a new or existing notebook, EXIF stripping, on-device OCR hand-off for searchability and alt text, permission rationale and denial handling, and the low-light/no-edge fallback to a plain photo.
**Out:** general image insert and stickers ([SN-MED-001](images-media.md#sn-med-001)), the PDF render/annotate pipeline ([SN-PDF-002](pdf.md#sn-pdf-002)), the OCR engine ([SN-HWR-001](ocr-hwr.md#sn-hwr-001)), share-sheet receipt of an existing photo ([SN-PHN-014](notifications.md#sn-phn-014)), and the Capture hub itself ([SN-PHN-010](library.md#sn-phn-010)).

#### Acceptance criteria
- [ ] Capture → Scan opens the scanner in < 1 s with a live edge-detection overlay; capturing a page auto-crops and straightens it to a rectangular page.
- [ ] Multi-page batch: capture N pages in sequence with a visible count, then review with retake, reorder and delete before committing.
- [ ] The committed result is an annotatable multi-page document in the target notebook (vector-page semantics preserved per PRD-CO-075 where the output is a PDF; a flattened image page otherwise) — never a rasterised blob the user cannot annotate.
- [ ] **EXIF and location metadata are stripped** before the image is stored or shared (PRD-LB-180 EXIF-strip).
- [ ] On-device OCR attaches a searchable transcript and alt text to each scanned page; the page is findable in search afterwards (PRD-CO-077).
- [ ] Camera permission is requested only at the moment of use with an honest rationale string; denial lands on a clear, non-dead-end state offering Photos instead and a link to system settings.
- [ ] Low light or no detectable edges falls back to a plain photo capture with a stated reason, never a silent failure.
- [ ] A scan session survives an interruption (incoming call, app switch) without losing already-captured pages.
- [ ] Committing a 10-page scan on Android-lowend stays within the memory ceiling (< 300 MB) — pages are processed and written one at a time, never all held decoded in memory.
- [ ] The whole flow works offline and in guest mode.
- [ ] The review UI renders correctly in all 17 looks and dark mode; all controls >= 44×44 pt / 48×48 dp with `Semantics` labels.

#### Technical notes
Add `app/lib/capture/scan/` for the flow and reuse the media pipeline in the images/media area for storage and EXIF stripping; output assembly (multi-page PDF) goes through `packages/sane_pdf` (ADR-0014). Prefer the platform document scanners where available behind the plugin boundary (`plugins/` federated plugin with Swift/Kotlin impls, ADR-0012) with a Dart fallback, chosen by **capability query** not platform check; record the chosen APIs in the PR and treat them as **verify** items per docs/platform/phones.md §5. All decode, crop, warp and encode work runs **off the UI isolate** (`Isolate.run` or the storage isolate) with resource caps applied **before** decode (CLAUDE.md §7.8, §8). Write each page through the content-addressed blob store ([SN-CORE-004](storage.md#sn-core-004)) as it is produced. OCR is dispatched asynchronously through `packages/sane_ml` adapters (ADR-0016) and must not block the commit. Permission strings live in the platform manifests with honest rationale (PRD-LB-226 style).

#### Security & privacy
Threats and controls: **T-HOSTILE-IMAGE** — a crafted image (including one returned by a third-party camera app through an intent) can trigger decoder bugs or decompression bombs. Control: validate type/MIME/size and dimension caps **before** decode, decode off the UI isolate, fail closed to a user-safe toast (CLAUDE.md §7.8; MASVS-CODE-4, MASVS-PLATFORM-2, OWASP-A03, CWE-20, CWE-400, CWE-434). **T-METADATA-LEAK** — photos carry GPS, device and timestamp EXIF; a scan shared later would leak where the user was. Control: strip all EXIF/metadata at ingest, before the bytes touch the blob store, and assert it in a test (MASVS-PRIVACY-2, MASVS-PRIVACY-4, CWE-200). **T-PERMISSION-OVERREACH** — requesting camera (or, worse, location) at launch. Control: request camera only at point of use, never request location, and declare 'no data collected' truthfully in store labels (PRD-03 privacy posture; MASVS-PRIVACY-3). **T-PLAINTEXT-TEMP** — scanner intermediates written to a shared temp dir would be world-readable on some Android versions. Control: intermediates stay in app-private storage and are deleted on commit or cancel; the final asset is encrypted through the normal path (MASVS-STORAGE-1, MASVS-STORAGE-2, CWE-312, CWE-378). Baseline: no content in logs; no network egress — scanning and OCR are on-device.

#### UX notes
Surfaces: the Capture hub sheet ([SN-PHN-010](library.md#sn-phn-010)) and the Import overlay's 'Scan with camera — Auto-crop & straighten' source (docs/design/screens-and-flows.md §9), whose copy must be reused verbatim. The review screen uses `SaneCard`-family components and the standard destructive-confirm dialog for deleting a captured page (ux-principles.md §4.3). Voice: 'Point at the page — we will straighten it.'; on fallback, 'Could not find the page edges — captured as a photo.' Errors are toasts, never red inline text. Empty state: none (the scanner is transient). Loading: per-page skeletons in review while a page is processed; long commits report progress, not just motion ('Saving 4 of 10 pages…'). Every control must clear the thumb zone requirement — capture and retake live in the bottom third (phones.md §7). All 17 looks and dark mode apply to the review and commit chrome; the camera preview itself is un-themed by nature.

#### Test plan
- `app/test/capture/scan/scan_pipeline_test.dart` — crop/warp geometry on fixture corner sets; fallback when no quadrilateral is detected.
- `app/test/capture/scan/exif_strip_test.dart` — a fixture JPEG with GPS EXIF is stored with all metadata removed (privacy regression test).
- `app/test/security/hostile_image_scan_test.dart` — oversized/malformed image fails closed off the UI isolate, no crash (abuse test, joins the fuzz corpus).
- `app/test/capture/scan/batch_review_test.dart` — retake/reorder/delete, interruption recovery, memory-safe one-at-a-time commit.
- `app/integration_test/phone_scan_capture_test.dart` — patrol run with a stubbed camera: scan → review → commit → searchable by OCR text.
- `app/test/golden/phone/scan_review_golden_test.dart` — goldens per look family, light and dark.

#### Dependencies
[SN-PHN-010](library.md#sn-phn-010), [SN-MED-001](images-media.md#sn-med-001), [SN-PDF-002](pdf.md#sn-pdf-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

