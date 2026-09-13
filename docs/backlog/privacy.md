# Backlog — area: privacy

25 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-PRV-001](privacy.md#sn-prv-001) **Epic: Privacy & compliance — dashboard, rights, consent, store labels, DPIA** (epic · M4 Identity, Sync & Privacy)
  - [SN-PRV-002](privacy.md#sn-prv-002) **Build the privacy dashboard 'What leaves this device' panel** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-PRV-003](privacy.md#sn-prv-003) **Implement consent management framework and 'data leaves device' indicator** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-PRV-004](privacy.md#sn-prv-004) **Implement in-context OS permission requests and a permissions panel** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-PRV-005](privacy.md#sn-prv-005) **Build the GDPR/DPDP data-subject-rights surface** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-PRV-006](privacy.md#sn-prv-006) **Implement the per-scope local data-erasure engine and compliance** · p0 · feature · L · M4 Identity, Sync & Privacy
  - [SN-PRV-007](privacy.md#sn-prv-007) **Implement a neutral age gate with minor-safe defaults (COPPA/DPDP)** · p0 · feature · M · M4 Identity, Sync & Privacy
    - [SN-PRV-008](privacy.md#sn-prv-008) **Decide and integrate a verifiable parental-consent mechanism for minors** · p1 · task · M · M4 Identity, Sync & Privacy
  - [SN-PRV-009](privacy.md#sn-prv-009) **Build the telemetry consent surface, 'what we collect' screen and kill switch** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-PRV-010](privacy.md#sn-prv-010) **Add a CI gate banning always-on analytics and ad SDKs** · p1 · infra · S · M4 Identity, Sync & Privacy
  - [SN-PRV-011](privacy.md#sn-prv-011) **Implement a data-retention policy engine and purge scheduler** · p1 · task · M · M4 Identity, Sync & Privacy
  - [SN-PRV-012](privacy.md#sn-prv-012) **Document the LINDDUN metadata-minimisation control set and cleartext register** · p1 · docs · S · M4 Identity, Sync & Privacy
  - [SN-PRV-013](privacy.md#sn-prv-013) **Author the DPIA for identity/sync/E2EE and a reusable DPIA template** · p1 · docs · M · M4 Identity, Sync & Privacy
  - [SN-PRV-014](privacy.md#sn-prv-014) **Author the Apple Privacy Manifest and run a Required-Reason API audit** · p1 · task · M · M7 Beta Hardening & Security Audit
  - [SN-PRV-015](privacy.md#sn-prv-015) **Author store privacy declarations: Apple Nutrition Labels and Play Data Safety** · p1 · task · S · M7 Beta Hardening & Security Audit
  - [SN-PRV-016](privacy.md#sn-prv-016) **Add a gate verifying store privacy declarations match reality** · p2 · test · S · M7 Beta Hardening & Security Audit
  - [SN-PRV-017](privacy.md#sn-prv-017) **Draft the Privacy Policy and Terms of Service** · p1 · docs · M · M7 Beta Hardening & Security Audit
  - [SN-GSEC-001](privacy.md#sn-gsec-001) **Verify complete right-to-erasure across all derived-data stores** · p1 · test · M · M7 Beta Hardening & Security Audit
  - [SN-GSEC-004](privacy.md#sn-gsec-004) **Maintain the GDPR/DPDP Records of Processing and sub-processor register** · p1 · docs · M · M4 Identity, Sync & Privacy
  - [SN-GSEC-010](privacy.md#sn-gsec-010) **Minimise payment and third-party PII data flow and PCI SAQ-A scope** · p1 · security · M · M8 Launch & Growth
  - [SN-GSEC-012](privacy.md#sn-gsec-012) **Enforce minor-safe feature gating for accounts flagged as minors** · p0 · security · M · M4 Identity, Sync & Privacy
  - [SN-GOPS-015](privacy.md#sn-gops-015) **Write the data-subject request intake and fulfilment runbook** · p1 · docs · M · M7 Beta Hardening & Security Audit

---

## Issues

### SN-GAND-020

<a id="sn-gand-020"></a>

**Support shared Android tablets: multi-user and managed school profiles**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet |
| Areas | privacy, auth, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AUTH-013](auth.md#sn-auth-013), [SN-AND-030](security.md#sn-and-030), [SN-CRY-009](security.md#sn-cry-009) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `MASVS-AUTH-1`, `CWE-200` |
| Extra labels | — |

#### Context
Sane Notes' persona is a student, and a large share of Android tablets in education are **shared or managed**: Android supports multiple device users (and restricted/child users) on tablets, and schools deploy work/school profiles through Android Enterprise. The backlog has app-level profiles ([SN-AUTH-007](auth.md#sn-auth-007), [SN-AUTH-013](auth.md#sn-auth-013)) — "Who's writing?" inside one installation — but nothing about the **OS-level** case where two device users each have their own installation instance, or where the app runs inside a managed profile with admin policies (blocked copy/paste across profiles, disabled screenshots, forced backup settings, blocked accounts). The failure modes are serious and silent: keys created under one device user must never be reachable by another (they are not, by Keystore design — but this must be *verified*, not assumed), cross-profile sharing intents may hand a note to the other profile, and a managed device may disable exactly the Google account sign-in we default to.

#### Scope
**In:** verifying and documenting behaviour under a second device user and under a work/managed profile: separate storage and separate Keystore keys, no cross-user data visibility, no cross-user notification or widget leakage; making sharing and open-with behave correctly when a cross-profile intent is offered (explicit user confirmation, no silent cross-profile write); detecting when policies block an assumed capability (account types disabled, screenshots restricted, backup forced) and degrading with an honest message rather than a broken flow; a documented statement of what Sane Notes supports on shared/managed devices in `docs/platform/android.md` §1 and the compatibility matrix.
**Out:** app-level profiles ([SN-AUTH-007](auth.md#sn-auth-007), [SN-AUTH-013](auth.md#sn-auth-013)); an MDM/EMM managed-configuration feature set or a schools SKU (out of scope for launch; note as a Backlog candidate); age gating and minor defaults ([SN-PRV-007](privacy.md#sn-prv-007), [SN-PRV-008](privacy.md#sn-prv-008)).

#### Acceptance criteria
- [ ] With two device users on a tablet, notes, thumbnails, search index, preferences and Keystore keys created by user A are unreachable and invisible to user B — verified by test, not assumption.
- [ ] Widgets, notifications and quick-capture entry points ([SN-AND-024](notifications.md#sn-and-024), [SN-NOTF-011](notifications.md#sn-notf-011)) never render another device user's content.
- [ ] Inside a work/managed profile the app launches, takes notes offline and encrypts at rest; if the policy blocks the Google account type, sign-in offers the remaining providers and guest mode without a dead end ([SN-GAND-012](compat.md#sn-gand-012) degradation pattern).
- [ ] A cross-profile share into Sane Notes routes through the same confirm-and-place screen as any other share ([SN-NOTF-005](notifications.md#sn-notf-005)) and never writes into the wrong profile's library.
- [ ] Where an admin policy disables a feature (screenshots, backup, accounts), the UI says so plainly once, in context.
- [ ] `docs/platform/compatibility-matrix.md` gains a shared/managed-device row stating the tested tier.

#### Technical notes
Device-user separation is enforced by the OS (per-user data directories and per-user Keystore), so the work is verification plus not defeating it: never write to a world-readable location, never key anything on a device-wide identifier, and keep profile-scoped paths from [SN-AUTH-013](auth.md#sn-auth-013). For managed profiles, read `DevicePolicyManager`/`UserManager` restriction flags defensively (`getUserRestrictions`, account-type restrictions) and treat absence of the ability as a capability-false, reusing the probe pattern from [SN-GAND-012](compat.md#sn-gand-012). Cross-profile intents surface as normal share intents and go through the [SN-NOTF-005](notifications.md#sn-notf-005) validator.

#### Security & privacy
The core control is data isolation across OS users and profiles (MASVS-STORAGE-1, MASVS-PRIVACY-1, CWE-200) — a leak here is the same severity as a profile-isolation bug ([SN-AUTH-013](auth.md#sn-auth-013)) and is in scope for the pentest plan ([SN-SEC-033](security.md#sn-sec-033)) and MASVS storage verification ([SN-SEC-029](security.md#sn-sec-029)). Keys must remain non-exportable and per-user ([SN-CRY-009](security.md#sn-cry-009)); backup exclusion still applies per user ([SN-AND-030](security.md#sn-and-030)). No device-identifying signal may be collected to detect a managed state ([SN-TEL-002](telemetry.md#sn-tel-002)).

#### UX notes
Nothing new in the happy path — the app simply behaves. Where a policy blocks something, use the honest-limits microcopy ([SN-BRD-009](brand.md#sn-brd-009)): "Your school's settings don't allow screenshots." The Settings → Account tab ([SN-SET-005](settings.md#sn-set-005)) shows which sign-in methods are available on this device rather than greyed-out mysteries.

#### Test plan
Instrumented/manual matrix on a tablet with a second device user created (`adb shell pm create-user`) asserting invisibility of user A's data from user B; a managed-profile emulator (Test DPC) run of the core-flow checklist with restrictions toggled on. Unit tests for the restriction-probe degradation branches. Files: `app/test/platform/managed_restrictions_test.dart`, checklist + matrix rows in `docs/platform/`.

#### Dependencies
[SN-AUTH-013](auth.md#sn-auth-013), [SN-AND-030](security.md#sn-and-030), [SN-CRY-009](security.md#sn-cry-009)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-013

<a id="sn-gipad-013"></a>

**Insert photos through the out-of-process picker and ship no Photos permission**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, ios-phone |
| Areas | privacy, images-media, security |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SEC-001](security.md#sn-sec-001) |
| Depends on | [SN-MED-005](images-media.md#sn-med-005) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, good first issue |

#### Context
[SN-MED-005](images-media.md#sn-med-005) builds the Insert-media sheet and correctly requests photo access lazily with a rationale — but on iPadOS the *best* answer is to request nothing at all. `PHPickerViewController` runs **out of process**, returns only the assets the user picked, and requires **no photo-library permission and no `NSPhotoLibraryUsageDescription` string**. A Flutter app that reaches for a plugin's legacy path silently triggers the full-library prompt, which is a worse experience, a worse privacy posture, an App Review risk (Guideline 5.1.1 asks for the least-privileged API), and an extra entry in the privacy nutrition label. Nothing in the backlog pins this down, so this issue makes "no Photos permission on Apple platforms" a tested invariant.

#### Scope
**In:** routing the Photos source of the Insert-media sheet through the out-of-process picker (`PHPickerViewController`, multi-select, live-photo/HEIC handling) on iPadOS/iOS; removing `NSPhotoLibraryUsageDescription`/`NSPhotoLibraryAddUsageDescription` from the app Info.plist unless a save-to-Photos feature genuinely needs the latter; auditing every Flutter plugin in the dependency graph for a transitively added Photos usage string or `PHPhotoLibrary` call and pinning or replacing offenders; a CI grep gate that fails the build if a Photos usage string or `PHPhotoLibrary.requestAuthorization` reappears; handling the picker's limited results (no asset enumeration, no metadata beyond the returned item).
**Out:** camera capture and its `NSCameraUsageDescription` ([SN-MED-005](images-media.md#sn-med-005), [SN-MED-009](images-media.md#sn-med-009)); the decode/downscale pipeline ([SN-MED-003](images-media.md#sn-med-003)); EXIF stripping ([SN-MED-004](images-media.md#sn-med-004)); Android's Photo Picker ([SN-AND-001](compat.md#sn-and-001) scope).

#### Acceptance criteria
- [ ] Inserting an image on iPadOS shows the system picker with **no permission alert**, on a device where the app has never been granted photo access.
- [ ] The built app's Info.plist contains no Photos usage strings; a CI check (`tools/ci/plist_permission_gate.sh`) fails on reintroduction, including strings injected by a dependency.
- [ ] The privacy manifest and nutrition label ([SN-IPAD-021](privacy.md#sn-ipad-021), [SN-PRV-015](privacy.md#sn-prv-015)) declare no photo-library access; the permissions panel ([SN-PRV-004](privacy.md#sn-prv-004)) shows Photos as "not requested".
- [ ] Multi-select returns every chosen image through the hardened ingest path ([SN-MED-003](images-media.md#sn-med-003)) with dimension caps and EXIF stripping applied ([SN-SEC-006](security.md#sn-sec-006), [SN-MED-004](images-media.md#sn-med-004)).
- [ ] A user who *has* previously granted limited access experiences no regression: the picker still works and the app never enumerates the library.
- [ ] HEIC, Live Photos, screenshots, panoramas and iCloud-not-downloaded assets each import or fail with a clear message (no silent no-op).

#### Technical notes
If the chosen Flutter plugin cannot guarantee the out-of-process path, implement a small Swift platform view/channel in `plugins/sane_media_picker` rather than accepting the legacy API. Beware transitive plugins that ship their own Info.plist entries via CocoaPods — the gate must inspect the built app, not just the source plist. Cross-check with the required-reason API audit in [SN-IPAD-021](privacy.md#sn-ipad-021). By design this needs no Photos permission, so it does not depend on [SN-PRV-004](privacy.md#sn-prv-004) — the out-of-process picker requires no runtime grant.

#### Security & privacy
Straight data minimisation (MASVS-PRIVACY-1/2): the app never holds library-wide access, so a compromise of the app cannot enumerate photos. Picker results arrive as file URLs from another process and are untrusted input — validate type and size before decode (MASVS-PLATFORM-1) and never trust the supplied filename when writing to the blob store ([SN-SEC-007](security.md#sn-sec-007)).

#### UX notes
No rationale sheet is needed for Photos on Apple platforms — one fewer interruption. The Insert-media sheet's Photos row therefore opens the picker directly; the rationale pattern from [SN-ONB-011](onboarding.md#sn-onb-011) remains for Camera and Microphone. Denial states for Photos simply disappear on iPadOS.

#### Test plan
Unit: `plugins/sane_media_picker/test/picker_result_test.dart` (type/size validation, filename sanitisation). Integration: `integration_test/photo_picker_test.dart` with `patrol` asserting no permission dialog appears. CI: the plist gate, exercised by a fixture app that deliberately reintroduces the string.

#### Dependencies
[SN-MED-005](images-media.md#sn-med-005) (Insert-media entry point). This ships **no** Photos permission (out-of-process `PHPickerViewController`), so it does not depend on the permissions panel [SN-PRV-004](privacy.md#sn-prv-004) (M4); cross-checked with the required-reason API audit [SN-IPAD-021](privacy.md#sn-ipad-021).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GOPS-015

<a id="sn-gops-015"></a>

**Write the data-subject request intake and fulfilment runbook**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | docs |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | privacy, docs, security |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-005](privacy.md#sn-prv-005), [SN-PRV-006](privacy.md#sn-prv-006), [SN-PRV-007](privacy.md#sn-prv-007) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `CWE-359`, `OWASP-A01` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
[SN-PRV-005](privacy.md#sn-prv-005) builds the in-app data-subject-rights surface and [SN-PRV-006](privacy.md#sn-prv-006)/[SN-AUTH-018](auth.md#sn-auth-018) build self-service deletion; [SN-GSEC-001](privacy.md#sn-gsec-001) verifies erasure across derived stores and [SN-GSEC-004](privacy.md#sn-gsec-004) maintains the Records of Processing. What is missing is the human path: a request that arrives by **email** — from a user who cannot sign in, from a parent exercising a minor's rights ([SN-PRV-007](privacy.md#sn-prv-007), [SN-PRV-008](privacy.md#sn-prv-008)), or from a regulator — starts a statutory clock (one month under GDPR, comparable duties under India's DPDP Act) and must be answered even though the honest answer for a zero-knowledge product is unusually short: an install token, an entitlement record, an email address, support correspondence. Beta testers at M7 are real data subjects, so this must exist before the first external cohort.

#### Scope
**In:** `docs/privacy/dsr-runbook.md` — the intake channels (in-app surface, privacy address, and the support inbox routing rule [SN-GOPS-006](docs.md#sn-gops-006)); an identity-verification policy that does **not** collect more data than we hold (verify through the signed-in session or the registered address; never demand an ID document for an account that holds only an email); the statutory clocks and how they are tracked; per-right procedures (access, rectification, erasure, portability, objection/withdrawal of consent, restriction) each stating what we can actually produce and what is cryptographically impossible for us to produce; templates for acknowledgement, fulfilment, extension and refusal (with reasons); the parent/guardian path for minors; a request register with minimal fields and its own retention limit; the escalation to counsel and to the supervisory authority; the interaction with the breach path ([SN-SEC-035](security.md#sn-sec-035)).
**Out:** the in-app rights surface ([SN-PRV-005](privacy.md#sn-prv-005)); deletion implementation ([SN-PRV-006](privacy.md#sn-prv-006)); erasure verification ([SN-GSEC-001](privacy.md#sn-gsec-001)); the RoPA ([SN-GSEC-004](privacy.md#sn-gsec-004)); the privacy policy text ([SN-PRV-017](privacy.md#sn-prv-017)).

#### Acceptance criteria
- [ ] Every right has a written procedure naming the systems touched (entitlement records, telemetry queue, support mailbox, install token) and the expected turnaround inside the statutory clock.
- [ ] The access/portability response template states plainly that note content is end-to-end encrypted and not available to us, and points the user at in-app export ([SN-SHR-009](sharing-export.md#sn-shr-009)) for their own content.
- [ ] Identity verification is proportionate and documented; no procedure asks for government ID.
- [ ] A parent/guardian request for a minor has a defined path consistent with the age gate and parental-consent mechanism.
- [ ] A request register exists with the minimum fields (id, date received, right, channel, due date, outcome date, outcome) and a stated retention period; it contains no request content beyond what is needed.
- [ ] Extension and refusal templates cite the lawful basis and the complaint route to the supervisory authority.
- [ ] A rehearsal request has been processed end to end and its timing recorded.

#### Technical notes
Prefer self-service: every template's first line should route the user to the in-app surface when they can sign in, because self-service deletion is faster and collects nothing. Where a right touches the opt-in telemetry queue ([SN-TEL-007](telemetry.md#sn-tel-007)), the runbook must name the concrete action (purge queue, rotate install token) rather than a generic "delete data". Keep the register outside the repo (it contains personal data) in the same controlled store as support correspondence.

#### Security & privacy
The DSR channel is itself an attack surface: a convincing erasure request from an impostor destroys the victim's entitlement record, and an over-broad access response leaks personal data to an attacker (OWASP-A01 broken access control applied to a manual process; CWE-359 exposure of private information). Controls: proportionate verification, dual-check before any destructive action, minimal response content, minimal register retention (MASVS-PRIVACY-1/4). The runbook must also state that no vendor-side note recovery or decryption exists — a DSR cannot be used to compel access we do not have ([SN-CRY-014](security.md#sn-cry-014)).

#### UX notes
User-facing only through templates and the rights surface copy: plain language, no legalese where plain words work, and an explicit statement of what we hold versus what stays on the device. Tone per the voice guide ([SN-BRD-009](brand.md#sn-brd-009)); never defensive.

#### Test plan
Rehearsal: submit one access, one erasure and one parental request from test identities through each intake channel; confirm routing, verification, the produced response content, the systems actually touched, and the recorded timing against the clock. Cross-check the access response against [SN-GSEC-004](privacy.md#sn-gsec-004) RoPA and [SN-PRV-002](privacy.md#sn-prv-002) dashboard claims — any discrepancy is a bug in one of the three. Confirm the register retains nothing beyond its stated window.

#### Dependencies
[SN-PRV-005](privacy.md#sn-prv-005) (rights surface), [SN-PRV-006](privacy.md#sn-prv-006) (deletion), [SN-PRV-007](privacy.md#sn-prv-007) (age gate and guardian path).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Rehearsal request processed and timings recorded before the first external beta cohort


---

### SN-GSEC-001

<a id="sn-gsec-001"></a>

**Verify complete right-to-erasure across all derived-data stores**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | privacy, storage, search |
| Size | M |
| SDLC | verification |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-006](privacy.md#sn-prv-006), [SN-SRCH-015](search.md#sn-srch-015), [SN-AI-010](ai.md#sn-ai-010) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-STORAGE-1`, `TM-P-07`, `TM-I-05`, `OWASP-A01`, `CWE-212`, `ASVS-V14` |
| Extra labels | sec: privacy-by-design, agent-ready |

#### Context
Note content is copied into many *derived* stores: the FTS search index ([SN-SRCH-015](search.md#sn-srch-015)), the sqlite-vec embedding store ([SN-AI-010](ai.md#sn-ai-010)), page/notebook thumbnail caches ([SN-PG-010](pages-canvas.md#sn-pg-010)), OCR text layers ([SN-HWR-006](ocr-hwr.md#sn-hwr-006)), AI summary/flashcard caches, and backlink indexes ([SN-STDY-013](study.md#sn-stdy-013)). Each feature issue owns its own purge hook, but no issue proves that deleting a note, page or notebook — or deleting an account ([SN-PRV-006](privacy.md#sn-prv-006)) — removes *every* derived copy. A surviving thumbnail or embedding after "delete" breaks the GDPR/DPDP right to erasure (docs/security/threat-model.md TM-P-07) and is an information-disclosure residue (TM-I-05). This is the completeness gate that ties the per-store hooks together.

#### Scope
**In:** an erasure map enumerating every derived/cache store that holds content or content-derived data; an automated completeness test that creates a note with unique markers across ink, text, PDF, image, audio and AI-derived artefacts, deletes it (and separately deletes its notebook, and separately runs account deletion), then asserts no marker survives in any store, cache directory, thumbnail cache, vector index, FTS index, backlink table or the encrypted blob store after the retention/Trash window; filing follow-up issues for any store missing a purge hook (notably thumbnails and OCR/AI caches).
**Out:** implementing individual purge hooks already owned elsewhere ([SN-SRCH-015](search.md#sn-srch-015), [SN-AI-010](ai.md#sn-ai-010), [SN-PRV-011](privacy.md#sn-prv-011)); cloud-side deletion (the user owns their drive); the Trash UI/tombstone op ([SN-CORE-018](storage.md#sn-core-018)).

#### Acceptance criteria
- [ ] A committed erasure map lists every derived/cache store and its purge owner.
- [ ] Deleting a note/page purges its rows from FTS, vector, backlink, thumbnail and OCR/AI caches within the defined window.
- [ ] Deleting a notebook and running account deletion leaves zero markers in any local store or cache dir (asserted by test).
- [ ] Any store lacking a purge hook is either fixed here or has a filed follow-up issue.
- [ ] The test runs in CI and fails on a surviving derived copy.

#### Technical notes
Add `app/test/privacy/erasure_completeness_test.dart` and a store-enumeration helper in `sane_core`. Drive real delete/tombstone flows ([SN-CORE-018](storage.md#sn-core-018)), the retention engine ([SN-PRV-011](privacy.md#sn-prv-011)) and account deletion ([SN-PRV-006](privacy.md#sn-prv-006)). Scan on-device cache directories (thumbnails, OCR intermediates) plus the encrypted stores. Reference docs/security/controls-matrix.md PRIVACY-3 and threat-model TM-P-07/TM-I-05.

#### Security & privacy
Threats: TM-P-07 (non-compliance with erasure), TM-I-05 (content residue in caches). Controls: MASVS-PRIVACY-3, ASVS V14, GDPR Art.17 / DPDP erasure. Ensures the zero-knowledge promise is not undone by plaintext derivatives.

#### UX notes
No new UI. Surfaces confidence for the privacy dashboard ([SN-PRV-002](privacy.md#sn-prv-002)) copy that "delete means gone"; feeds the Definition of Done for any feature that adds a new derived store.

#### Test plan
Unit: per-store purge unit tests. Integration: the end-to-end erasure_completeness_test across note/notebook/account deletion with cross-store marker assertions; a negative test that intentionally skips one hook and confirms the gate catches it.

#### Dependencies
[SN-PRV-006](privacy.md#sn-prv-006), [SN-SRCH-015](search.md#sn-srch-015), [SN-AI-010](ai.md#sn-ai-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans).
- [ ] Erasure map documented under docs/security/; controls-matrix PRIVACY-3 updated.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-004

<a id="sn-gsec-004"></a>

**Maintain the GDPR/DPDP Records of Processing and sub-processor register**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | docs |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, docs |
| Size | M |
| SDLC | requirements |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-013](privacy.md#sn-prv-013) |
| Security controls | `TM-P-07`, `TM-P-02`, `MASVS-PRIVACY-4`, `ASVS-V14`, `CWE-359` |
| Extra labels | sec: privacy-by-design, needs-decision |

#### Context
The privacy stack has a DPIA ([SN-PRV-013](privacy.md#sn-prv-013)), a privacy policy ([SN-PRV-017](privacy.md#sn-prv-017)), store declarations ([SN-PRV-015](privacy.md#sn-prv-015)) and a metadata register ([SN-PRV-012](privacy.md#sn-prv-012)) — but no GDPR Art.30 **Records of Processing Activities (ROPA)** and no **sub-processor register** with the Art.28 data-processing agreements. Even a zero-knowledge, local-first product relies on real third parties that process personal data: RevenueCat/store billing, the web payment gateways (Razorpay/Stripe), the student-verification provider ([SN-BILL-015](billing.md#sn-bill-015)), the optional crash backend ([SN-TEL-011](telemetry.md#sn-tel-011)), and the TURN/relay hosting ([SN-COL-023](collaboration.md#sn-col-023)). DPDP 2023 imposes parallel obligations. This artefact is the accountability spine regulators ask for and the source of truth for the public sub-processor list.

#### Scope
**In:** a maintained ROPA (`docs/privacy/ropa.md`) enumerating each processing activity — purpose, lawful basis, data categories, subjects, recipients, retention, international transfers and safeguards; a sub-processor register (name, role, data shared, region, DPA status/link, SCCs where transfers occur); a public-facing sub-processor list for the website; and a lightweight change process so adding any new SDK/service updates the ROPA in the same PR (tie into the [SN-PRV-010](privacy.md#sn-prv-010) SDK gate). Confirm which parties are processors vs the user acting as controller of their own cloud drive.
**Out:** the DPIA methodology ([SN-PRV-013](privacy.md#sn-prv-013)); the privacy policy prose ([SN-PRV-017](privacy.md#sn-prv-017)); the sync metadata register ([SN-PRV-012](privacy.md#sn-prv-012)); signing the DPAs themselves (maintainer/legal action, tracked as needs-decision).

#### Acceptance criteria
- [ ] A committed ROPA covers every processing activity with all Art.30 fields.
- [ ] A sub-processor register lists every third party, its data-sharing scope, region and DPA status.
- [ ] A public sub-processor list is prepared for the website.
- [ ] Adding a data-processing SDK/service requires a ROPA update in the same PR (documented, tied to [SN-PRV-010](privacy.md#sn-prv-010)).
- [ ] International-transfer safeguards (SCCs/adequacy) are recorded per sub-processor.

#### Technical notes
Keep ROPA and register as versioned Markdown; cross-link the SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)) so a new data-collecting dependency is visible. Reference docs/security/controls-matrix.md §7 and threat-model TM-P-07.

#### Security & privacy
Threats: TM-P-07 (non-compliance), TM-P-02 (identifiability via third parties). Controls: MASVS-PRIVACY-4 (third-party sharing), GDPR Art.30/28, DPDP obligations, ASVS V14. Minimises and documents every PII egress.

#### UX notes
Feeds the public sub-processor list linked from the privacy promise page ([SN-SITE-006](website.md#sn-site-006)); no in-app UI.

#### Test plan
Review-based: a CI doc-consistency check that the sub-processor register and the SBOM/SDK allow-list do not disagree; manual legal review checklist for DPA coverage.

#### Dependencies
[SN-PRV-013](privacy.md#sn-prv-013).

#### Definition of done
- [ ] ROPA + sub-processor register merged and linked from the privacy docs.
- [ ] Change process documented and wired to [SN-PRV-010](privacy.md#sn-prv-010).
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-010

<a id="sn-gsec-010"></a>

**Minimise payment and third-party PII data flow and PCI SAQ-A scope**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | privacy, billing, security |
| Size | M |
| SDLC | design |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-BILL-009](billing.md#sn-bill-009), [SN-BILL-015](billing.md#sn-bill-015) |
| Security controls | `MASVS-PRIVACY-4`, `TM-P-09`, `TM-P-02`, `ASVS-V14`, `OWASP-A01`, `CWE-359` |
| Extra labels | sec: privacy-by-design, agent-ready |

#### Context
Billing is the product's largest deliberate PII egress: web checkout via Razorpay/Stripe ([SN-BILL-009](billing.md#sn-bill-009)), store IAP receipts ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)), and student verification ([SN-BILL-015](billing.md#sn-bill-015)). [SN-BILL-018](billing.md#sn-bill-018) hardens the entitlement token and [SN-BILL-017](billing.md#sn-bill-017) handles cancellation/refund dark-patterns, but no issue treats the *payment/PII data-flow minimisation and PCI-DSS scope* as a first-class privacy control. If card data ever touches our code we inherit PCI SAQ-D; the correct posture is redirect/hosted-fields so we stay in SAQ-A and no cardholder data reaches us. Student verification must store proof, not raw ID documents (TM-P-09). These decisions must be locked before launch.

#### Scope
**In:** document and enforce the payment data-flow — use gateway-hosted redirect/fields so no PAN/CVV/card data reaches our client or any service (PCI SAQ-A); map exactly what PII each gateway/receipt/verification flow sends and receives, its purpose, retention and lawful basis (feed the ROPA [SN-GSEC-004](privacy.md#sn-gsec-004)); ensure student verification stores a boolean/proof token with short retention rather than raw documents; disclose payment/verification third parties in the sub-processor list; a test/lint that our code never persists or logs card fields or raw verification documents.
**Out:** the checkout implementation ([SN-BILL-009](billing.md#sn-bill-009)); IAP verification ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)); entitlement-token hardening ([SN-BILL-018](billing.md#sn-bill-018)); the ROPA register itself ([SN-GSEC-004](privacy.md#sn-gsec-004)); refund/cancellation UX ([SN-BILL-017](billing.md#sn-bill-017)).

#### Acceptance criteria
- [ ] The payment architecture keeps us in PCI SAQ-A: no PAN/CVV/card data in our client, services, logs or storage (asserted by review + test).
- [ ] Every payment/verification PII flow is mapped (data, purpose, retention, basis) and added to the ROPA/sub-processor register.
- [ ] Student verification stores proof/short-lived tokens, never raw documents (TM-P-09).
- [ ] A lint/test fails if card fields or raw verification docs are persisted or logged.
- [ ] Payment third parties are disclosed in the sub-processor list.

#### Technical notes
Prefer gateway SDKs that never expose card data to our origin; keep the web checkout on an isolated flow. Cross-link SBOM and ROPA ([SN-GSEC-004](privacy.md#sn-gsec-004)). Reference controls-matrix §7 (student data) and threat-model TM-P-09/TM-P-02.

#### Security & privacy
Threats: TM-P-09 (over-collection/retention of student PII), TM-P-02 (identifiability via processors). Controls: MASVS-PRIVACY-4, ASVS V14, PCI-DSS SAQ-A, GDPR/DPDP minimisation. Payment is the main real-world PII surface.

#### UX notes
Honest, minimal data prompts at checkout and verification; a clear statement of which third party receives what, linked from the pricing/privacy pages.

#### Test plan
Review: PCI SAQ-A applicability walkthrough. Unit: assert no card/verification-document fields are persisted or logged. Integration: verify the redirect/hosted-field flow keeps card data off our origin (network capture).

#### Dependencies
[SN-BILL-009](billing.md#sn-bill-009), [SN-BILL-015](billing.md#sn-bill-015).

#### Definition of done
- [ ] Data-flow doc + tests merged; ROPA/sub-processor list updated.
- [ ] PCI SAQ-A posture recorded and reviewed by the Security Owner.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-GSEC-012

<a id="sn-gsec-012"></a>

**Enforce minor-safe feature gating for accounts flagged as minors**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, onboarding, ai |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-007](privacy.md#sn-prv-007), [SN-PRV-003](privacy.md#sn-prv-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `TM-P-07`, `OWASP-A01`, `CWE-359`, `ASVS-V14` |
| Extra labels | sec: privacy-by-design, agent-ready |

#### Context
[SN-PRV-007](privacy.md#sn-prv-007) adds a neutral age gate that resolves an `AgeAssuranceState` and clamps *consent purposes* (telemetry/cloud-AI) for minors, and [SN-PRV-008](privacy.md#sn-prv-008) handles verifiable parental consent. But COPPA and DPDP 2023 Rule 10 (plus age-appropriate design expectations) require more than clamping consent: minors must not be exposed to behavioural monitoring, and higher-risk *features* — cloud AI egress, public share links, open collaboration/classroom join, and any behavioural nudging — should be off or restricted by default and not silently re-enabled. No issue enforces this *feature-level* gating end to end from the minor flag.

#### Scope
**In:** a single `MinorPolicy` derived from `AgeAssuranceState` ([SN-PRV-007](privacy.md#sn-prv-007)) that feature gates consult: cloud-AI master switch forced off for minors ([SN-AI-004](ai.md#sn-ai-004)/[SN-AI-019](ai.md#sn-ai-019)); public/open share links restricted and collaboration/classroom join constrained to a safe default ([SN-SHR-013](sharing-export.md#sn-shr-013)/[SN-COL-009](collaboration.md#sn-col-009)); telemetry and any behavioural surface unofferable ([SN-TEL-001](telemetry.md#sn-tel-001) via [SN-PRV-003](privacy.md#sn-prv-003)); no behavioural ads/monitoring anywhere; enforcement that survives settings changes (a minor cannot toggle a clamped feature on); and tests proving each gate. Where verified parental consent ([SN-PRV-008](privacy.md#sn-prv-008)) is present, document which restrictions may lift.
**Out:** the age-gate UI and threshold resolution ([SN-PRV-007](privacy.md#sn-prv-007)); the parental-consent mechanism ([SN-PRV-008](privacy.md#sn-prv-008)); the consent framework internals ([SN-PRV-003](privacy.md#sn-prv-003)); the individual feature implementations.

#### Acceptance criteria
- [ ] A minor-flagged account cannot enable cloud AI; cloud egress is impossible for minors (asserted by test).
- [ ] Public share links and open collaboration/classroom join default to the safe/restricted state for minors and cannot be silently re-enabled.
- [ ] Telemetry and behavioural surfaces are unofferable to minors; no behavioural monitoring occurs.
- [ ] Restrictions persist across settings changes and app restarts.
- [ ] Any lifting of restrictions requires verified parental consent ([SN-PRV-008](privacy.md#sn-prv-008)) and is documented.

#### Technical notes
Centralise in `MinorPolicy` consumed by AI ([SN-AI-004](ai.md#sn-ai-004)), sharing ([SN-SHR-013](sharing-export.md#sn-shr-013)), collaboration ([SN-COL-009](collaboration.md#sn-col-009)) and telemetry ([SN-TEL-001](telemetry.md#sn-tel-001)) gates; drive from [SN-PRV-007](privacy.md#sn-prv-007)'s `AgeAssuranceState`. Reference controls-matrix §7 (Children) and threat-model TM-P-07.

#### Security & privacy
Threats: TM-P-07 (COPPA/DPDP non-compliance). Controls: MASVS-PRIVACY-1/4, GDPR Art.8 / COPPA / DPDP Rule 10, ASVS V14, CWE-359. Protects the most vulnerable users and the company's legal exposure.

#### UX notes
Restricted features appear disabled with a neutral, non-stigmatising explanation and (where applicable) a parental-consent path; empty/disabled states are honest, not punitive.

#### Test plan
Unit: MinorPolicy resolution across thresholds/jurisdictions. Widget: disabled/consent states for AI, share, collab, telemetry toggles. Integration: attempt cloud-AI/public-share/collab-join as a minor and confirm they are blocked and cannot be re-enabled; confirm parental consent lifts the documented subset.

#### Dependencies
[SN-PRV-007](privacy.md#sn-prv-007), [SN-PRV-003](privacy.md#sn-prv-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans).
- [ ] controls-matrix §7 Children row updated; behaviour documented.
- [ ] Reviewed against docs/security/secure-coding-checklist.md.

---

### SN-IPAD-021

<a id="sn-ipad-021"></a>

**Ship the privacy manifest and audit required-reason APIs across plugins**

| Field | Value |
|---|---|
| GitHub | #322 |
| Type | security |
| Priority | p0 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, ios-phone |
| Areas | privacy, release |
| Size | M |
| SDLC | release |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-PRIVACY-4` |
| Extra labels | agent-ready |

#### Context
Apple has required a privacy manifest (`PrivacyInfo.xcprivacy`) since May 1, 2024, and the app is not submittable without it (docs/platform/ipad.md §9). The manifest must declare no tracking, the collected data types (aim: none except opt-in crash reports), and the required-reason API reasons, and EVERY Flutter plugin that touches a required-reason API MUST ship its own signed manifest. This is a p0 release gate matching the zero-knowledge posture (decision 8).

#### Scope
**In:** author the app's `PrivacyInfo.xcprivacy` (`NSPrivacyTracking=false`, `NSPrivacyCollectedDataTypes` = none except opt-in crash reports, `NSPrivacyAccessedAPITypes` with approved reason codes for UserDefaults, file-timestamp and disk-space APIs); audit every plugin dependency for its own manifest; a CI check that fails if a required manifest is missing or declares tracking.
**Out:** the App Store Connect nutrition label + submission ([SN-IPAD-023](release.md#sn-ipad-023)); encryption export compliance ([SN-IPAD-023](release.md#sn-ipad-023)).

#### Acceptance criteria
- [ ] The app manifest declares `NSPrivacyTracking=false`, data types = none (except opt-in crash reports), and required-reason codes for User defaults / File timestamp / Disk space APIs (docs/platform/ipad.md §9).
- [ ] Every bundled plugin touching a required-reason API ships its own signed privacy manifest; the audit list is recorded.
- [ ] A CI gate fails the build if any required manifest is missing or any manifest declares tracking or an undeclared data type.
- [ ] The manifest matches the App Store privacy nutrition label ("Data Not Collected" except opt-in crash reports).

#### Technical notes
Add `PrivacyInfo.xcprivacy` to the iOS runner; enumerate plugins from `pubspec` and verify each `.xcprivacy`. Wire the check into `.github/workflows/devsecops.yml` (ADR referenced from docs/security/devsecops-pipeline.md). Reference docs/platform/ipad.md §9 and decision 8. Telemetry is opt-in (ADR-0011); crash reports are the only declared collection.

#### Security & privacy
Directly implements privacy-by-design and the store privacy posture (MASVS-PRIVACY-1..4): no tracking, minimal declared collection, accurate required-reason declarations. Ensures no plugin silently accesses fingerprinting-prone APIs without a declared reason. No secrets in manifests.

#### UX notes
None beyond baseline (no user-facing UI): baseline privacy rules apply — no content/tokens logged, telemetry off by default with the opt-in surfaced in the privacy dashboard (docs/design/screens-and-flows.md settings). Document the declared data types for the in-app privacy dashboard.

#### Test plan
CI/unit: `tools/scripts/verify_privacy_manifests.mjs` (asserts app + every required plugin manifest present, tracking=false). Manual: validate against Xcode's privacy report on a release-candidate archive.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) monorepo scaffold (plugins present to audit).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md §9 kept current; controls matrix updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS (security) review

---

### SN-PRV-001

<a id="sn-prv-001"></a>

**Epic: Privacy & compliance — dashboard, rights, consent, store labels, DPIA**

| Field | Value |
|---|---|
| GitHub | #23 |
| Type | epic |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy |
| Size | XL |
| SDLC | requirements |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-PRIVACY-4`, `ASVS-V14`, `OWASP-A01`, `TM-P-06`, `TM-P-07` |
| Extra labels | agent-ready, sec: privacy-by-design, innovation |

#### Context
Sane Notes makes a hard product promise — local-first, zero-knowledge, on-device by default — and privacy is the thing that must stay *legible and true*, not just architecturally correct. This epic owns the surfaces and controls that turn the architecture into user-exercisable rights and honest store declarations: the privacy dashboard ('What leaves this device'), consent flows, GDPR / India DPDP 2023 / COPPA obligations (access, export/portability, rectification, erasure, withdrawal), the age gate, App Store Privacy Manifest + Nutrition Labels, Google Play Data Safety, LINDDUN metadata-minimisation, data-retention/deletion, telemetry consent, the Privacy Policy / ToS drafting, and per-feature DPIAs. It implements PRD-03 §8 (`PRD-PRIV-001..007`), §11 (`PRD-TEL-001..004`), §14 (`PRD-DEL-001..004`), the privacy obligations mapping in `docs/security/controls-matrix.md` §7, the LINDDUN register in `docs/security/threat-model.md` §6 (`TM-P-01..09`), and [ADR-0011](../adr/0011-telemetry-and-diagnostics.md). Most work lands in M4 alongside identity/sync/E2EE (the milestone where 'what leaves the device' first becomes non-empty); the store-declaration and policy-drafting children land in M7 store-readiness.

#### Scope
**In:** privacy dashboard; consent management + 'data leaves device' indicator; in-context OS permission requests + a permissions panel; GDPR/DPDP data-subject-rights surface; self-service account/data deletion; neutral age gate + minor-safe defaults; verifiable parental-consent decision; telemetry consent + kill switch; a CI gate banning always-on analytics/ad SDKs; a data-retention policy engine; the LINDDUN metadata-minimisation control set; DPIAs; Apple Privacy Manifest + Nutrition Labels; Play Data Safety; Privacy Policy / ToS drafting; and a store-declaration accuracy gate.
**Out:** the E2EE crypto itself ([SN-CRY-001](security.md#sn-cry-001)), sync transport/metadata implementation ([SN-SYNC-001](sync.md#sn-sync-001)), app/notebook lock + clipboard/screenshot hardening (security area), auth/identity flows ([SN-AUTH-001](auth.md#sn-auth-001)), and the telemetry *pipeline* internals ([SN-TEL-001](telemetry.md#sn-tel-001)) — this epic owns the privacy *policy, consent, transparency and rights* layer over them.

#### Acceptance criteria
- [ ] [SN-PRV-002](privacy.md#sn-prv-002) Privacy dashboard 'What leaves this device' panel shipped and truthful
- [ ] [SN-PRV-003](privacy.md#sn-prv-003) Consent management framework + 'data leaves device' indicator
- [ ] [SN-PRV-004](privacy.md#sn-prv-004) In-context OS permission requests + permissions panel
- [ ] [SN-PRV-005](privacy.md#sn-prv-005) GDPR/DPDP data-subject-rights surface (access/port/rectify/erase/withdraw/object)
- [ ] [SN-PRV-006](privacy.md#sn-prv-006) Self-service account & data deletion flows
- [ ] [SN-PRV-007](privacy.md#sn-prv-007) Neutral age gate + minor-safe defaults (COPPA/DPDP)
- [ ] [SN-PRV-008](privacy.md#sn-prv-008) Decide + integrate verifiable parental-consent mechanism
- [ ] [SN-PRV-009](privacy.md#sn-prv-009) Telemetry consent surface + 'what we collect' + kill switch
- [ ] [SN-PRV-010](privacy.md#sn-prv-010) CI gate banning always-on analytics/ad SDKs
- [ ] [SN-PRV-011](privacy.md#sn-prv-011) Data-retention policy engine + purge scheduler
- [ ] [SN-PRV-012](privacy.md#sn-prv-012) LINDDUN metadata-minimisation control set + cleartext register
- [ ] [SN-PRV-013](privacy.md#sn-prv-013) DPIA for identity/sync/E2EE + reusable template
- [ ] [SN-PRV-014](privacy.md#sn-prv-014) Apple Privacy Manifest + Required-Reason API audit
- [ ] [SN-PRV-015](privacy.md#sn-prv-015) Author store privacy declarations (Apple Nutrition Labels + Play Data Safety)
- [ ] [SN-PRV-016](privacy.md#sn-prv-016) Verify store privacy declarations match reality (CI/manual gate)
- [ ] [SN-PRV-017](privacy.md#sn-prv-017) Draft the Privacy Policy and Terms of Service (needs-decision)

#### Technical notes
Surfaces live in `app/` (Settings → Privacy & export tab, Account & plan tab, Login/Onboarding gates) per `docs/design/screens-and-flows.md` §12, §3, §5. A shared `ConsentController` (Riverpod, `app/lib/privacy/`) is the single source of consent truth; retention config in `sane_core`; store artifacts under `app/ios/Runner/PrivacyInfo.xcprivacy` and Play Console. Cite `PRD-PRIV-*`, `PRD-TEL-*`, `PRD-DEL-*`, ADR-0011, `docs/security/controls-matrix.md` §7, `docs/security/threat-model.md` §6.

#### Security & privacy
This whole epic is the privacy control plane. Threats: TM-P-06 (Unawareness), TM-P-07 (Non-compliance), TM-P-01/02/04 (Linkability/Identifiability/Detectability via metadata), TM-I-05 (log leakage), TM-R-03 (user cannot prove what left the device). Controls: MASVS-PRIVACY-1..4, ASVS V14 (Data Protection), OWASP-A01 (access control on deletion/rights). Baseline everywhere: no note content or tokens in logs.

#### UX notes
All UI children obey `docs/design/design-system.md` tokens via `sane_ui`, render correctly across all **17 looks + light/dark**, use frosted panels behind wallpaper, and meet a11y (44pt/48dp targets, contrast ≥ 4.5:1, `Semantics` labels, web keyboard reachability) per `docs/design/accessibility.md`. Copy is plain, student-readable, and non-alarming.

#### Test plan
Each child names its own tests; the epic tracks: `app/test/privacy/` widget/unit suites, `app/integration_test/privacy_rights_test.dart` (export→delete→verify), golden tests for dashboard/consent across looks, and the store-declaration accuracy gate ([SN-PRV-016](privacy.md#sn-prv-016)).

#### Dependencies
[SN-CORE-004](storage.md#sn-core-004) (persistence to delete/retain), [SN-AUTH-001](auth.md#sn-auth-001) (identity to attach/erase), [SN-SYNC-001](sync.md#sn-sync-001) (what actually leaves the device), [SN-CRY-001](security.md#sn-cry-001) (ciphertext-only guarantee), [SN-TEL-001](telemetry.md#sn-tel-001) (telemetry pipeline), [SN-SET-001](settings.md#sn-set-001) (settings host), [SN-ONB-001](onboarding.md#sn-onb-001) (age gate + consent placement).

#### Definition of done
- [ ] All 15 child issues closed; dashboard/rights/consent/deletion demoably true end-to-end
- [ ] `docs/security/controls-matrix.md` §7 and `docs/security/threat-model.md` §6 updated where behaviour changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md; store declarations signed off by the Security/Privacy Owner

---

### SN-PRV-002

<a id="sn-prv-002"></a>

**Build the privacy dashboard 'What leaves this device' panel**

| Field | Value |
|---|---|
| GitHub | #415 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-003](privacy.md#sn-prv-003) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `ASVS-V14`, `TM-P-06`, `TM-R-03`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design, innovation |

#### Context
The local-first / zero-knowledge promise is invisible unless the app makes it legible. `PRD-PRIV-001` requires a single **'What leaves this device'** panel that enumerates — truthfully and live — every data flow: note content (never, unless sync is on → then only ciphertext to the user's own cloud), handwriting recognition (on-device), any cloud-AI request (only per explicit opt-in, with a running count), crash reports (only if opted in), and identity tokens (to the auth provider only). This directly answers threat TM-P-06 (Unawareness) and TM-R-03 (the user cannot otherwise prove what left the device). It lives in Settings → Privacy & export (`docs/design/screens-and-flows.md` §12) and is the flagship transparency surface named in `docs/security/controls-matrix.md` §7 (Purpose limitation & transparency) and ADR-0011 §Consequences.

#### Scope
**In:** a read-model that aggregates live egress state from `ConsentController` ([SN-PRV-003](privacy.md#sn-prv-003)), sync ([SN-SYNC-001](sync.md#sn-sync-001)), AI opt-in, and telemetry ([SN-TEL-001](telemetry.md#sn-tel-001)); one row per data category showing **destination + encryption state + last activity**; a running cloud-AI request counter; deep links into the relevant toggle (sync, telemetry, AI). 
**Out:** the Permissions panel ([SN-PRV-004](privacy.md#sn-prv-004)), the rights actions ([SN-PRV-005](privacy.md#sn-prv-005)), deletion ([SN-PRV-006](privacy.md#sn-prv-006)), and the underlying sync/telemetry mechanisms.

#### Acceptance criteria
- [ ] The panel lists at minimum: Note content, Handwriting recognition, Cloud AI, Crash reports, Identity tokens — each with a destination string and an encryption-state chip (Never leaves / Ciphertext to your cloud / On-device / Sent on opt-in).
- [ ] With sync **off**, AI **off**, telemetry **off** (defaults), every row reads a 'stays on this device' state; the panel asserts 'Nothing is leaving this device right now.'
- [ ] Turning sync on flips the Note-content row to 'Ciphertext to <provider>' within one frame of the state change, never showing 'plaintext'.
- [ ] The cloud-AI row shows an accurate running count of opt-in requests this session/period; count is 0 until a per-request opt-in is taken.
- [ ] Empty/offline/error states render (offline → 'Offline; nothing is syncing'); no row ever shows note text, tokens, coordinates, or file paths.
- [ ] Each row's 'Manage' affordance deep-links to the controlling toggle.

#### Technical notes
Implement `PrivacyDashboardController` in `app/lib/privacy/` reading a `PrivacyEgressState` composed from `ConsentController` ([SN-PRV-003](privacy.md#sn-prv-003)), the sync status provider ([SN-SYNC-001](sync.md#sn-sync-001)), and telemetry state ([SN-TEL-001](telemetry.md#sn-tel-001)). Pure `StatelessWidget` rows from `sane_ui`; no business logic in `build`. Values are booleans/counters only — never content. Cite `PRD-PRIV-001`, ADR-0011, controls-matrix §7, threat-model TM-P-06/TM-R-03.

#### Security & privacy
Threats: TM-P-06 (Unawareness) — the panel is the mitigation; TM-R-03 (egress transparency); CWE-359 (exposure of private info) — the panel MUST render *states*, never the private data itself. Controls: MASVS-PRIVACY-2 (collection transparency), MASVS-PRIVACY-3 (user control), ASVS V14. Baseline: no content/tokens logged; the read-model carries no PII.

#### UX notes
Design: Settings → **Privacy & export** tab (`docs/design/screens-and-flows.md` §12), reachable from the Account & plan tab too. Use `sane_ui` tokens; render across all **17 looks + light/dark** with frosted panels behind wallpaper (respect `prefers-reduced-transparency`). Each row: leading icon, category label, destination sub-label, trailing state chip, 'Manage' link. a11y: `Semantics` label combining category + state for screen readers, 44pt/48dp targets, contrast ≥ 4.5:1, keyboard-focusable on web. Copy is calm and factual.

#### Test plan
- Widget: `app/test/privacy/privacy_dashboard_test.dart` — default all-off state asserts 'nothing leaving'; sync-on flips note row to ciphertext; AI counter increments only after opt-in.
- Golden: `app/test/privacy/goldens/privacy_dashboard_*` across a representative subset of the 17 looks + dark.
- Negative: assert no row string ever contains sample note text/token fixtures.

#### Dependencies
[SN-PRV-003](privacy.md#sn-prv-003) (consent state), [SN-SYNC-001](sync.md#sn-sync-001), [SN-TEL-001](telemetry.md#sn-tel-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] Docs/controls-matrix §7 updated if behaviour changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-003

<a id="sn-prv-003"></a>

**Implement consent management framework and 'data leaves device' indicator**

| Field | Value |
|---|---|
| GitHub | #416 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, telemetry |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `TM-P-06`, `TM-P-08`, `TM-R-03`, `ASVS-V14`, `OWASP-A04` |
| Extra labels | agent-ready, sec: privacy-by-design, innovation |

#### Context
Every privacy-relevant flow in the app (telemetry, optional cloud AI, cloud-drive access, calendar import for class reminders, notifications) needs one consistent, auditable, withdrawable consent model — India DPDP 2023 requires consent be withdrawable 'as easily as given', GDPR requires it be free/specific/informed, and locked decision 6 requires a visible 'data leaves device' indicator before any cloud inference. `PRD-PRIV-004`, `PRD-SET-022`, `PRD-TEL-003` and ADR-0011 all lean on a single consent authority rather than scattered booleans. This feature builds `ConsentController` (the source of truth the dashboard [SN-PRV-002](privacy.md#sn-prv-002) reads) and the reusable **'data leaves device'** indicator/banner component that gates every cloud-AI request (TM-P-08, TM-I-08).

#### Scope
**In:** a typed `ConsentController` (Riverpod) tracking each consent purpose (telemetry, cloudAi, cloudDrive, calendarImport, notifications) with state = granted/denied/never-asked + timestamp; grant/withdraw APIs; per-request cloud-AI consent gate; the shared `DataLeavesDeviceBanner` widget; persistence of consent per profile (LWW-registered so it follows the profile).
**Out:** the actual telemetry pipeline ([SN-TEL-001](telemetry.md#sn-tel-001)), the AI feature itself ([SN-AI-001](ai.md#sn-ai-001)), permission OS prompts ([SN-PRV-004](privacy.md#sn-prv-004)), and the dashboard UI ([SN-PRV-002](privacy.md#sn-prv-002)).

#### Acceptance criteria
- [ ] Every consent purpose defaults to **denied/off** (telemetry, cloud AI, sync) per ADR-0011 and locked decisions 6/8; a fresh install grants nothing.
- [ ] `withdraw(purpose)` is reachable from the same surface as grant and takes effect immediately (collection/egress stops within the same tick); a withdrawal is observable by the dashboard.
- [ ] No cloud-AI network call is issued unless a per-request opt-in is recorded first; the `DataLeavesDeviceBanner` is shown before the call and names the destination + the data span being sent.
- [ ] Consent state persists per profile and is swapped on profile switch (`PRD-PROF-004`); a Guest profile can still grant/withdraw locally.
- [ ] Below the age gate ([SN-PRV-007](privacy.md#sn-prv-007)) the telemetry and cloud-AI consents are **unofferable** (grant API refuses; UI hides the control).
- [ ] Consent changes never write note content, tokens, or identifiers anywhere.

#### Technical notes
`app/lib/privacy/consent_controller.dart`; a sealed `ConsentPurpose` enum + immutable `ConsentState` value object (freezed). Persist via `sane_core` repositories as LWW registers (HLC-stamped) so consent follows the profile across devices. `DataLeavesDeviceBanner` in `sane_ui`. The per-request AI gate is a `Future<Result<Unit, ConsentDenied>>` that callers ([SN-AI-001](ai.md#sn-ai-001)) MUST await before any egress. Cite `PRD-PRIV-004`, `PRD-SET-022`, `PRD-TEL-001/003`, ADR-0011, threat-model TM-P-06/08, TM-I-08, TM-R-03.

#### Security & privacy
Threats: TM-P-06 (Unawareness), TM-P-08 / TM-I-08 (cloud-AI content retention) — mitigated by the mandatory pre-call banner + minimum-span principle; TM-R-03 (transparency of egress); OWASP-A04 (insecure design of consent). Controls: MASVS-PRIVACY-1 (permission/consent mgmt), MASVS-PRIVACY-2, ASVS V14. Deny-by-default is enforced in code, not just policy.

#### UX notes
The `DataLeavesDeviceBanner` follows `docs/design/design-system.md` tokens, is unmissable but non-modal-blocking, and states destination + data span in plain words. Renders across all **17 looks + light/dark**. a11y: announced via `Semantics` live region, 44pt/48dp confirm target, contrast ≥ 4.5:1, keyboard-operable on web. Consent toggles appear in Privacy & export (`screens-and-flows.md` §12).

#### Test plan
- Unit: `app/test/privacy/consent_controller_test.dart` — defaults denied; withdraw is immediate; per-profile swap; below-age-gate grant refused.
- Widget: `app/test/privacy/data_leaves_device_banner_test.dart` — banner shown before a simulated cloud-AI call; no call without opt-in.
- Negative: `app/test/privacy/consent_no_pii_test.dart` — consent records contain no content/tokens.

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) (LWW registers), [SN-CORE-004](storage.md#sn-core-004) (persistence), [SN-SET-001](settings.md#sn-set-001) (settings host). Blocks [SN-PRV-002](privacy.md#sn-prv-002), [SN-PRV-009](privacy.md#sn-prv-009).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget, security scans)
- [ ] ADR-0011 / controls-matrix cross-references updated if behaviour changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-004

<a id="sn-prv-004"></a>

**Implement in-context OS permission requests and a permissions panel**

| Field | Value |
|---|---|
| GitHub | #417 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `ASVS-V14`, `TM-P-06`, `CWE-250`, `OWASP-A01` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
`PRD-PRIV-002` requires the app to (a) request every OS permission **only at point of use** with a purpose string (never a launch-time prompt burst) and (b) surface a **Permissions panel** listing every permission the app can request — camera (scan), microphone (audio), photos, notifications, biometrics, cloud-drive access — with current grant state and a deep link to OS settings. This is MASVS-PRIVACY-1 and ASVS V14, and it closes TM-P-06 (Unawareness) by making the permission surface auditable. It also embodies least-privilege (CWE-250): the app requests nothing it is not about to use.

#### Scope
**In:** a `PermissionsService` abstraction over `permission_handler` (or platform channels) exposing query + request-with-rationale per permission; the point-of-use request wired into the camera/scan, audio-record, photo-picker, notifications, biometric, and cloud-drive entry points; the Permissions panel UI reading live grant state with an 'Open system settings' deep link.
**Out:** the actual feature flows behind each permission (audio recorder [SN-AUD-001](audio.md#sn-aud-001), etc.), and the biometric app-lock logic (security area).

#### Acceptance criteria
- [ ] No permission is requested at app launch or first-run; a fresh install triggers zero OS permission dialogs until a feature needing one is invoked.
- [ ] Each request is preceded by an in-app rationale sheet naming the concrete purpose (e.g. 'Microphone — to record audio pinned to your notes'); declining leaves the feature gracefully disabled, never crashes.
- [ ] The Permissions panel lists all six permission categories with an accurate state chip (Granted / Denied / Not requested / Restricted) refreshed on resume.
- [ ] 'Open system settings' deep-links to the app's OS settings page on iOS and Android; on web, unsupported permissions are labelled 'Managed by your browser'.
- [ ] Re-requesting a permanently-denied permission routes to system settings rather than silently no-op'ing.
- [ ] iOS `Info.plist` usage strings and Android runtime-permission declarations exist for every requested permission.

#### Technical notes
`app/lib/privacy/permissions_service.dart`; keep platform specifics behind the abstraction. iOS `NSCameraUsageDescription`/`NSMicrophoneUsageDescription`/`NSPhotoLibraryUsageDescription`/`NSFaceIDUsageDescription` in `app/ios/Runner/Info.plist`; Android `<uses-permission>` + runtime request. Deep link via `AppSettings`/`openAppSettings`. Cloud-drive access uses the `sane_cloud_drive` plugin's own auth, surfaced here as a state row. Cite `PRD-PRIV-002`, controls-matrix MASVS-PRIVACY-1, threat-model TM-P-06.

#### Security & privacy
Threats: TM-P-06 (Unawareness), CWE-250 (execution with unnecessary privilege) — mitigated by lazy, purpose-stringed requests; OWASP-A01 (no over-broad grants). Controls: MASVS-PRIVACY-1 (lazy in-context consent, no launch-time prompts), ASVS V14. Baseline: rationale copy contains no PII; grant state logs as booleans only.

#### UX notes
Design: Privacy & export tab, Permissions subsection (`docs/design/screens-and-flows.md` §12). Rationale sheets and the panel use `sane_ui` tokens across all **17 looks + light/dark**. a11y: rationale sheet is a focus-trapped dialog with `Semantics`, 44pt/48dp targets, contrast ≥ 4.5:1, keyboard-reachable on web; state chips are not colour-only (include text). Empty state: 'No permissions requested yet.'

#### Test plan
- Widget: `app/test/privacy/permissions_panel_test.dart` — all six rows render; state chips reflect a mocked `PermissionsService`.
- Unit: `app/test/privacy/permissions_service_test.dart` — request-with-rationale flow; permanently-denied routes to settings.
- Manual: fresh-install run confirms zero launch-time prompts (documented in the PR).

#### Dependencies
[SN-SET-001](settings.md#sn-set-001) (settings host), [SN-PRV-003](privacy.md#sn-prv-003) (consent authority for cloud-drive/notification categories).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget, mobsfscan)
- [ ] Info.plist / manifest permission strings reviewed and minimal
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-005

<a id="sn-prv-005"></a>

**Build the GDPR/DPDP data-subject-rights surface**

| Field | Value |
|---|---|
| GitHub | #418 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-006](privacy.md#sn-prv-006) |
| Security controls | `MASVS-PRIVACY-3`, `ASVS-V14`, `TM-P-07`, `CWE-212` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
`PRD-PRIV-004` requires that GDPR and India DPDP 2023 rights be exercisable **in-app**, mapped to concrete product actions: access/portability = the Export-everything archive (§4), rectification = editing notes, erasure = deletion, withdraw-consent = toggling off sync/telemetry/AI at any time, objection where applicable; plus a visible link to the Privacy Policy and a contact/redress channel. This is the user-facing rights hub that ties existing capabilities together under a single legible surface, satisfying the 'Data subject rights' row of `docs/security/controls-matrix.md` §7 and mitigating TM-P-07 (Non-compliance). Because the underlying capabilities already exist elsewhere, this feature is mostly aggregation + honest copy, but it is the difference between 'compliant on paper' and 'a user can actually do it'.

#### Scope
**In:** a 'Your data & rights' section wiring each right to its action — Access/Portability → Export everything ([SN-PRV-011](privacy.md#sn-prv-011)/`PRD-BKP-001`), Rectification → open editor, Erasure → deletion flows ([SN-PRV-006](privacy.md#sn-prv-006)), Withdraw consent → deep links to sync/telemetry/AI toggles ([SN-PRV-003](privacy.md#sn-prv-003)), Objection → contact channel; a Privacy Policy link ([SN-PRV-017](privacy.md#sn-prv-017)); a redress/contact affordance.
**Out:** implementing export ([SN-SHR-001](sharing-export.md#sn-shr-001)/[SN-PRV-011](privacy.md#sn-prv-011)), deletion internals ([SN-PRV-006](privacy.md#sn-prv-006)), and the policy text itself ([SN-PRV-017](privacy.md#sn-prv-017)).

#### Acceptance criteria
- [ ] Each of the five rights (access/portability, rectification, erasure, withdraw-consent, objection) has a labelled entry that routes to a working action, not a dead link.
- [ ] 'Export everything' produces the portability archive and completes without network (delegates to `PRD-BKP-001`).
- [ ] 'Withdraw consent' entries deep-link to the exact toggles and reflect current state; withdrawal is immediate (from [SN-PRV-003](privacy.md#sn-prv-003)).
- [ ] A Privacy Policy link opens the live URL; a contact/redress channel (email or in-app form) is present and copyable.
- [ ] Copy states plainly that, because notes are E2EE in the user's own cloud, Sane holds no note content to hand over or erase — rights are exercised over the user's own data.
- [ ] The surface is reachable for a Guest profile too (rights that need an account show a single inline 'Sign in to…' affordance).

#### Technical notes
`app/lib/privacy/rights_screen.dart` composes existing actions; no new data path. Export delegates to the backup/export flow ([SN-SHR-001](sharing-export.md#sn-shr-001) / `PRD-BKP-001`); deletion to [SN-PRV-006](privacy.md#sn-prv-006); consent to [SN-PRV-003](privacy.md#sn-prv-003). Contact channel is a `mailto:`/in-app form (no server storage of the message beyond delivery). Cite `PRD-PRIV-004`, controls-matrix §7 (Data subject rights), threat-model TM-P-07.

#### Security & privacy
Threats: TM-P-07 (Non-compliance) — this surface is the mitigation; CWE-212 (improper removal of sensitive info before release) — erasure links must reach the real wipe, not a cosmetic one. Controls: MASVS-PRIVACY-3 (retention & user control), ASVS V14. Baseline: no PII in the contact form telemetry; the form body is user-authored and not logged.

#### UX notes
Design: Privacy & export tab (`docs/design/screens-and-flows.md` §12). List-of-rights layout with `sane_ui` tokens across all **17 looks + light/dark**. a11y: each right is a `Semantics`-labelled button, 44pt/48dp targets, contrast ≥ 4.5:1, keyboard-reachable on web. Destructive actions (erasure) are visually distinct and confirm before acting. Copy is reassuring and precise.

#### Test plan
- Widget: `app/test/privacy/rights_screen_test.dart` — five rights route to their actions; Guest shows inline sign-in for account-bound rights.
- Integration: covered by `app/integration_test/privacy_rights_test.dart` (export → withdraw → erase happy path).
- Manual: verify Privacy Policy link + contact channel resolve.

#### Dependencies
[SN-PRV-006](privacy.md#sn-prv-006) (deletion), [SN-PRV-003](privacy.md#sn-prv-003) (consent), [SN-PRV-011](privacy.md#sn-prv-011) (retention/export), [SN-SHR-001](sharing-export.md#sn-shr-001) (export archive), [SN-PRV-017](privacy.md#sn-prv-017) (policy link).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget, security scans)
- [ ] controls-matrix §7 'Data subject rights' row moved toward Implemented
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-006

<a id="sn-prv-006"></a>

**Implement the per-scope local data-erasure engine and compliance**

| Field | Value |
|---|---|
| GitHub | #419 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, storage |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-STORAGE-1`, `ASVS-V14`, `TM-P-07`, `TM-I-10`, `CWE-212`, `OWASP-A01` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
GDPR/DPDP/CCPA require self-service erasure, and once note content is E2EE in the user's own cloud, "deletion" means securely removing local material and the user's own cloud store + keys. The user-facing deletion *flow* - the three scopes (sign out / delete cloud data / delete account), export-first, typed consent, identity + entitlement revocation and cloud disconnect - is owned by [SN-AUTH-018](auth.md#sn-auth-018). This issue owns the piece that flow depends on: the reusable per-scope local data-erasure engine plus the regulatory erasure mapping. Getting erasure wrong is a compliance failure (incomplete erasure, CWE-212) or a data-loss disaster, so the engine is a p0 data-lifecycle control (PRD-DEL-004, PRD-PRIV-003).

#### Scope
**In:** a reusable per-scope local erasure engine that, given a scope + profile, securely removes local DB content rows, content-addressed blobs, thumbnails, caches and the FTS search index, and removes the relevant Keychain/Keystore key material (incl. backup-eligible copies); it is idempotent and resumable (records scope + progress; safe to re-run) and returns a Result<DeletionReport, Failure>; a residue-scan verifier that proves no plaintext remains for the deleted scope; and the GDPR/DPDP/CCPA erasure mapping in controls-matrix section 7.
**Out:** the three-scope deletion UI, export-first offer, typed-consent gate, identity/entitlement revocation and cloud-store disconnect/delete - owned by [SN-AUTH-018](auth.md#sn-auth-018), which invokes this engine and surfaces its report; notebook-level soft delete to Trash and the retention engine ([SN-PRV-011](privacy.md#sn-prv-011)).

#### Acceptance criteria
- [ ] The engine, given a scope, removes DB content rows, blobs, thumbnails, caches and the FTS index for that scope, and removes the matching keys from Keychain/Keystore (including backup-eligible copies).
- [ ] A follow-up residue scan finds no residual plaintext or key material for the deleted scope (negative test).
- [ ] The engine is idempotent and resumable: a re-run after an interruption completes without double-deleting or erroring, and reports partial vs full completion.
- [ ] The engine returns Result<DeletionReport, Failure> and never silently claims completion on a partial wipe (fail closed).
- [ ] controls-matrix section 7 maps the erasure engine to GDPR/DPDP/CCPA erasure and to TM-P-07/TM-I-10.

#### Technical notes
`app/lib/privacy/deletion/erasure_engine.dart` returning Result<DeletionReport, Failure>; run wipes off the UI isolate. Local erasure spans sane_core (drift rows), the content-addressed blob store, sane_search FTS index, thumbnail/cache dirs, and sane_secure_store key removal ([SN-SEC-001](security.md#sn-sec-001)). Must be resumable/idempotent (record scope + progress). The deletion flow that calls this engine - scope choice, consent, identity/entitlement revocation, cloud disconnect - lives in [SN-AUTH-018](auth.md#sn-auth-018). Cite PRD-DEL-004, PRD-PRIV-003, controls-matrix section 7, threat-model TM-P-07/TM-I-10.

#### Security & privacy
Threats: TM-P-07 (non-compliant erasure), TM-I-10 (backups retaining deleted keys/notes) - the wipe MUST also clear backup-eligible copies of keys; CWE-212 (incomplete removal); OWASP-A01 (only the owner's flow can trigger it). Controls: MASVS-PRIVACY-3, MASVS-STORAGE-1, ASVS V14. Fail closed: a partial wipe is reported, never silently claimed complete. No note text is ever logged.

#### UX notes
No standalone UI: the engine is invoked by the deletion flow in [SN-AUTH-018](auth.md#sn-auth-018) (Settings/Privacy -> Delete, design section 12), which owns the in-progress / success / partial-failure-with-retry states. This issue surfaces an accurate DeletionReport for that UI to render. Baseline: no content in logs.

#### Test plan
- Unit: `app/test/privacy/erasure_engine_test.dart` - each scope removes exactly its data; idempotent re-run; partial-completion reporting; key removal incl. backup-eligible copies.
- Negative: `app/test/privacy/deletion_residue_test.dart` - DB/blob/index/keystore residue assertions after a wipe.

#### Dependencies
[SN-CORE-004](storage.md#sn-core-004) (storage), [SN-SEC-001](security.md#sn-sec-001) (secure-store wipe); consumed by [SN-AUTH-018](auth.md#sn-auth-018) (the deletion flow).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/integration, security scans)
- [ ] controls-matrix section 7 + threat-model TM-P-07/TM-I-10 updated if behaviour changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md (data-lifecycle, fail-closed)

---

### SN-PRV-007

<a id="sn-prv-007"></a>

**Implement a neutral age gate with minor-safe defaults (COPPA/DPDP)**

| Field | Value |
|---|---|
| GitHub | #420 |
| Type | feature |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, onboarding |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `TM-P-07`, `OWASP-A01`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
The persona is students, including minors, so `PRD-PRIV-005` requires a **neutral age screen** and, for users under the applicable threshold (**<13** COPPA, **<18** DPDP Rule 10), verifiable parental/guardian consent before any data collection, plus no behavioural monitoring or targeted advertising to minors (there is none in this product by design). ADR-0011 §7 requires that below the age threshold telemetry and crash reporting stay **off and unofferable**. This feature builds the neutral age gate, the age-derived jurisdiction/threshold resolution, and the minor-safe default clamp that makes collection controls disappear for minors. It mitigates TM-P-07 (Non-compliance) and must be documented for store review.

#### Scope
**In:** a **neutral** age-collection screen (a date/age entry that does not nudge toward an adult answer); jurisdiction/threshold resolution (COPPA <13, DPDP <18, default adult otherwise); an `AgeAssuranceState` that clamps consent purposes (telemetry/cloud-AI) to unofferable for minors via [SN-PRV-003](privacy.md#sn-prv-003); a hook into onboarding placement; and the store-review documentation note.
**Out:** the verifiable-parental-consent *mechanism* selection + integration (that is [SN-PRV-008](privacy.md#sn-prv-008), needs-decision) and the sign-in flows ([SN-AUTH-001](auth.md#sn-auth-001)).

#### Acceptance criteria
- [ ] The age screen is **neutral**: it collects birth date/age without default-selecting an adult value and without copy that steers the answer (documented against COPPA neutral-age-screen guidance).
- [ ] Threshold resolution is correct: an entered age <13 → COPPA-minor, <18 (DPDP jurisdictions) → DPDP-minor, else adult; the result is stored as an assurance state, not the raw birth date beyond what is needed.
- [ ] For a resolved minor, the telemetry and cloud-AI opt-ins are **not shown** and the grant APIs refuse (verified via [SN-PRV-003](privacy.md#sn-prv-003)); no behavioural monitoring or ads exist for any user.
- [ ] The gate runs before any optional data collection could occur; note-taking itself (guest, local, no collection) is never blocked by age.
- [ ] A minor path surfaces the parental-consent entry point ([SN-PRV-008](privacy.md#sn-prv-008)) rather than silently enabling account features.
- [ ] Age handling is documented in `docs/security/` for store review.

#### Technical notes
`app/lib/privacy/age_gate/`; store an `AgeAssuranceState` (minorCoppa / minorDpdp / adult / unknown) rather than persisting raw DOB where avoidable (data minimisation). Wire the clamp into `ConsentController` ([SN-PRV-003](privacy.md#sn-prv-003)) so minor states make telemetry/AI unofferable. Placement in onboarding per [SN-ONB-001](onboarding.md#sn-onb-001) and `docs/design/screens-and-flows.md` §5. Cite `PRD-PRIV-005`, ADR-0011 §7, controls-matrix §7 (Children), threat-model TM-P-07.

#### Security & privacy
Threats: TM-P-07 (Non-compliance — COPPA/DPDP minors), OWASP-A01 (age-derived authorization of collection), CWE-359 (minimise stored DOB). Controls: MASVS-PRIVACY-1 (consent), MASVS-PRIVACY-4 (no third-party data sharing / no ads to minors). The assurance state is the gate; collection controls are removed for minors in code, not by hiding-only.

#### UX notes
Design: onboarding, before the optional tour (`docs/design/screens-and-flows.md` §5). Neutral, calm copy; `sane_ui` tokens across all **17 looks + light/dark**. a11y: date entry is `Semantics`-labelled, keyboard/voice friendly, 44pt/48dp targets, contrast ≥ 4.5:1. No dark-pattern nudging. Minor path copy explains why some features wait for a guardian.

#### Test plan
- Unit: `app/test/privacy/age_gate_test.dart` — threshold resolution across ages/jurisdictions; assurance-state persistence; DOB minimisation.
- Widget: `app/test/privacy/age_gate_screen_test.dart` — neutral defaults; minor path hides telemetry/AI opt-ins.
- Integration: below-threshold run never surfaces telemetry consent (ties to ADR-0011 age-gate verify #6).

#### Dependencies
[SN-PRV-003](privacy.md#sn-prv-003) (consent clamp), [SN-ONB-001](onboarding.md#sn-onb-001) (placement). Blocks [SN-PRV-008](privacy.md#sn-prv-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget, security scans)
- [ ] Store-review age-handling note added under docs/security/
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-008

<a id="sn-prv-008"></a>

**Decide and integrate a verifiable parental-consent mechanism for minors**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, onboarding |
| Size | M |
| SDLC | design |
| Parent | [SN-PRV-007](privacy.md#sn-prv-007) |
| Depends on | [SN-PRV-007](privacy.md#sn-prv-007) |
| Security controls | `MASVS-PRIVACY-1`, `TM-P-07` |
| Extra labels | needs-decision, sec: privacy-by-design |

#### Context
`PRD-PRIV-005` requires **verifiable parental/guardian consent** before any data collection for users under the threshold (<13 COPPA, <18 DPDP Rule 10). The *neutral age gate* and minor clamp are built in [SN-PRV-007](privacy.md#sn-prv-007), but the **method** of verifying a parent — and whether Sane needs it at all given collection is off-by-default and note-taking requires no account — is a maintainer/legal decision: options range from 'no verifiable consent needed because we collect nothing from minors' (the strongest, minimisation-first reading) to an email-plus-consent flow, to a third-party VPC provider. COPPA VPC methods (credit-card/ID/knowledge-based, signed form) carry their own PII cost, which fights our minimisation posture. This task captures the decision and, once decided, integrates the chosen mechanism.

#### Scope
**In:** an options analysis (no-collection-so-no-VPC vs email+ vs third-party VPC provider) with legal/PII trade-offs; a recommended default; and — after the maintainer decides — the integration behind the minor path from [SN-PRV-007](privacy.md#sn-prv-007).
**Out:** the age gate itself ([SN-PRV-007](privacy.md#sn-prv-007)) and the consent framework ([SN-PRV-003](privacy.md#sn-prv-003)).

#### Acceptance criteria
- [ ] A written options analysis exists (in the PR / `docs/security/`) covering COPPA VPC methods, DPDP Rule 10 guardian consent, and the minimisation-first 'we collect nothing from minors, so no VPC is triggered' argument, each with its PII cost.
- [ ] A recommended default is stated with rationale; the issue carries `needs-decision` until the maintainer picks one.
- [ ] If a VPC mechanism is chosen: it is integrated behind the minor path, collects the **minimum** to verify (no note content, minimal parent PII, short retention), and is documented for store review.
- [ ] If 'no VPC needed' is chosen: the minor clamp from [SN-PRV-007](privacy.md#sn-prv-007) is the whole control, and this is documented as the compliance basis.
- [ ] Whichever path ships, minors can still take notes locally with zero collection.

#### Technical notes
Maintainer decision (CLAUDE.md §13 — privacy posture). Document under `docs/security/` and reference from `docs/security/controls-matrix.md` §7 (Children row). If integrating a provider, keep it behind an interface in `app/lib/privacy/age_gate/` and never store raw verification documents (store proof/flag + short retention, mirroring the student-verification posture `TM-P-09`). Cite `PRD-PRIV-005`, threat-model TM-P-07.

#### Security & privacy
Threats: TM-P-07 (Non-compliance) and the paradox that a heavyweight VPC method *collects more* minor/parent PII than the product otherwise touches (TM-P-09-style over-collection). Controls: MASVS-PRIVACY-1. Decision must be minimisation-first. Baseline: no verification artefacts persisted beyond a proof flag.

#### UX notes
Minor-path screens (post age gate) use `sane_ui` tokens across all **17 looks + light/dark**; calm, guardian-directed copy; a11y 44pt/48dp, contrast ≥ 4.5:1, keyboard-reachable on web. Exact screens depend on the chosen mechanism and are specified once the decision lands.

#### Test plan
- Once decided: `app/test/privacy/parental_consent_test.dart` covering the chosen flow (or a test asserting the minor clamp is the sole control if 'no VPC').
- Data-map review test: no verification documents persisted; minimal PII retained.

#### Dependencies
[SN-PRV-007](privacy.md#sn-prv-007) (age gate + minor clamp). Blocked on a maintainer decision.

#### Definition of done
- [ ] Decision recorded; options analysis merged under docs/security/
- [ ] Chosen mechanism integrated (or 'no VPC' basis documented); tests green
- [ ] Reviewed against docs/security/secure-coding-checklist.md; controls-matrix Children row updated

---

### SN-PRV-009

<a id="sn-prv-009"></a>

**Build the telemetry consent surface, 'what we collect' screen and kill switch**

| Field | Value |
|---|---|
| GitHub | #421 |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, telemetry |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-003](privacy.md#sn-prv-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `TM-P-06`, `TM-I-05`, `OWASP-A09` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
`PRD-TEL-001..004` and ADR-0011 make telemetry **opt-in, off by default on every flavour, aggregated on-device first, and never containing note content or identifiers**. This feature builds the *consent and transparency* surface for telemetry (the pipeline itself is [SN-TEL-001](telemetry.md#sn-tel-001)): the toggle that lives in the Privacy dashboard, a verbatim **'what we collect'** screen listing every metric, a one-tap **kill switch** that stops collection and purges any queued data, and DPDP-compliant withdrawal ('as easily as given'). It mitigates TM-P-06 (Unawareness) and keeps the Play 'no data collected' / App Store labels true by default.

#### Scope
**In:** the telemetry consent toggle (bound to `ConsentController` [SN-PRV-003](privacy.md#sn-prv-003)); the 'what we collect' screen enumerating each metric verbatim from the allow-list; the kill switch that purges queued aggregates on disable; the crash-report opt-in (separate, also default off); and the DPDP withdrawal path.
**Out:** the on-device aggregation, allow-list serialiser, and crash pipeline (all [SN-TEL-001](telemetry.md#sn-tel-001)); the age-gate suppression (from [SN-PRV-007](privacy.md#sn-prv-007), consumed here).

#### Acceptance criteria
- [ ] Telemetry and crash-report opt-ins default **off** on dev, beta and release; a fresh install transmits nothing before opt-in.
- [ ] The 'what we collect' screen lists every metric the allow-list permits, verbatim, and matches the actual serialiser allow-list (asserted by a test shared with [SN-TEL-001](telemetry.md#sn-tel-001)).
- [ ] Toggling telemetry off (kill switch) stops collection immediately and purges any queued/aggregated data; the dashboard reflects the change.
- [ ] Below the age gate the opt-in is **not shown** and cannot be enabled ([SN-PRV-007](privacy.md#sn-prv-007)/[SN-PRV-003](privacy.md#sn-prv-003)).
- [ ] Withdrawal is reachable from the same place as opt-in and offers to delete already-sent aggregates where feasible.
- [ ] The consent copy plainly states what is and isn't sent (content-free, no identifiers).

#### Technical notes
`app/lib/privacy/telemetry_consent/`; the toggle writes through `ConsentController` ([SN-PRV-003](privacy.md#sn-prv-003)); the 'what we collect' list is generated from the same allow-list constant that [SN-TEL-001](telemetry.md#sn-tel-001) enforces (single source of truth) so they cannot drift. Kill switch calls the telemetry pipeline's purge API. Cite `PRD-TEL-001..004`, ADR-0011 §1/§8/§How-to-verify, threat-model TM-P-06, TM-I-05, controls-matrix §7 (Lawful basis / consent).

#### Security & privacy
Threats: TM-P-06 (Unawareness), TM-I-05 (content/PII in diagnostics) — the surface must describe only allow-listed, content-free metrics; OWASP-A09 (logging/collection governance). Controls: MASVS-PRIVACY-1/2/4. Deny-by-default; withdrawal immediate; no analytics SDK (enforced by [SN-PRV-010](privacy.md#sn-prv-010)).

#### UX notes
Design: Privacy & export tab (`docs/design/screens-and-flows.md` §12), per `PRD-TEL-003`. `sane_ui` tokens, all **17 looks + light/dark**. a11y: toggles + list are `Semantics`-labelled, 44pt/48dp, contrast ≥ 4.5:1, keyboard-reachable on web. The 'what we collect' screen reads like plain English, one metric per row. Empty state when off: 'Telemetry is off. Nothing is collected.'

#### Test plan
- Widget: `app/test/privacy/telemetry_consent_test.dart` — defaults off; kill switch disables + purges; below-age-gate hidden.
- Unit: `app/test/privacy/what_we_collect_matches_allowlist_test.dart` — the displayed list equals the serialiser allow-list.
- Integration: first-run instrumented egress check asserts zero telemetry before opt-in (shared with [SN-TEL-001](telemetry.md#sn-tel-001)).

#### Dependencies
[SN-PRV-003](privacy.md#sn-prv-003) (consent authority), [SN-TEL-001](telemetry.md#sn-tel-001) (pipeline + allow-list + purge), [SN-PRV-007](privacy.md#sn-prv-007) (age suppression).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/integration, security scans)
- [ ] ADR-0011 verify items #1/#5/#7 covered by tests; controls-matrix consent row updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-010

<a id="sn-prv-010"></a>

**Add a CI gate banning always-on analytics and ad SDKs**

| Field | Value |
|---|---|
| GitHub | #422 |
| Type | infra |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | privacy, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-CI-001](ci-cd.md#sn-ci-001) |
| Security controls | `MASVS-PRIVACY-4`, `MASVS-CODE-2`, `OWASP-A06`, `OWASP-A08`, `TM-P-08`, `TM-T-05` |
| Extra labels | agent-ready, good first issue, sec: privacy-by-design, sec: supply-chain |

#### Context
`PRD-PRIV-007` states **no third-party analytics/ad SDKs ship in the client** (MASVS-PRIVACY-4, CCPA 'do not sell/share'), and ADR-0011 §How-to-verify #2 requires CI to **fail if a known always-on analytics SDK appears in `pubspec.lock`** (with an allow-list of permitted packages) and for the SBOM to show no analytics SDK. This is the machine enforcement of the 'no data collected by default' promise: a policy that lives only in a doc will erode the first time someone adds Firebase 'just for crashes'. This gate closes TM-P-08 (linkability via third-party SDK) and complements the supply-chain posture (TM-T-05). It is a small, self-contained CI job — a good first issue.

#### Scope
**In:** a CI check (a step in `.github/workflows/devsecops.yml` under [SN-CI-001](ci-cd.md#sn-ci-001), plus a runnable script `tools/scripts/check_no_analytics_sdk.mjs`) that scans `pubspec.lock`, Gradle/SPM manifests, and the generated SBOM for a denylist of analytics/ad SDKs (Firebase Analytics, Google Analytics/GA, Amplitude, Mixpanel, Segment, AppsFlyer, Adjust, Facebook SDK, Sentry-with-default-config, etc.) against a small allow-list; the job fails the PR on a match.
**Out:** the SBOM generation itself ([SN-CI-004](ci-cd.md#sn-ci-004)) and the telemetry pipeline ([SN-TEL-001](telemetry.md#sn-tel-001)).

#### Acceptance criteria
- [ ] A denylist + allow-list is defined in-repo (documented) and the check reads `pubspec.lock` and native dependency manifests.
- [ ] Introducing a denied SDK to any lockfile fails the CI job with a clear message naming the offending package and the policy (`PRD-PRIV-007` / ADR-0011).
- [ ] The check also inspects the release SBOM and fails if a denied SDK is present there.
- [ ] The job runs on every PR (not release-only) so regressions are caught early; it is green on the current scaffold.
- [ ] A documented escape hatch: adding to the allow-list requires a threat-model + privacy-label update reference in the PR (per `PRD-PRIV-007`).
- [ ] The check is deterministic and completes in seconds.

#### Technical notes
Add `tools/scripts/check_no_analytics_sdk.mjs` (Node 22, matches the existing `scripts/*.mjs` style) and wire it as a required step in `.github/workflows/devsecops.yml` ([SN-CI-001](ci-cd.md#sn-ci-001)). Denylist as a JSON constant; match on package name (and known transitive coordinates for native SDKs). Prefer parsing `pubspec.lock` YAML and the CycloneDX SBOM JSON from [SN-CI-004](ci-cd.md#sn-ci-004). Cite `PRD-PRIV-007`, ADR-0011 verify #2, controls-matrix §1 (PRIVACY-4) + §8 (supply-chain), threat-model TM-P-08, TM-T-05.

#### Security & privacy
Threats: TM-P-08 (third-party retention/linkability), TM-T-05 (supply-chain dependency swap). Controls: MASVS-PRIVACY-4 (third-party data-sharing restriction), MASVS-CODE-2 (deps CVE-free/known), OWASP-A06 (vulnerable/outdated components), OWASP-A08 (software integrity). This is a preventive gate, not a runtime control.

#### UX notes
No end-user UI. Developer-facing failure message must be actionable (name package + policy + how to request an allow-list exception). Surfaces in PR checks / CI logs only.

#### Test plan
- Unit: `tools/scripts/check_no_analytics_sdk.test.mjs` — a fixture lockfile with a denied SDK fails; a clean lockfile passes; allow-listed package passes.
- CI: the job is present and required in `devsecops.yml`; a deliberate test branch adding Firebase Analytics is rejected.

#### Dependencies
[SN-CI-001](ci-cd.md#sn-ci-001) (workflow host), [SN-CI-004](ci-cd.md#sn-ci-004) (SBOM to scan).

#### Definition of done
- [ ] Script + CI step merged, required check enabled, green on scaffold
- [ ] controls-matrix PRIVACY-4 / supply-chain rows reference this gate
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-011

<a id="sn-prv-011"></a>

**Implement a data-retention policy engine and purge scheduler**

| Field | Value |
|---|---|
| GitHub | #423 |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | privacy, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-PRIVACY-3`, `ASVS-V14`, `TM-P-07`, `CWE-212` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
GDPR/DPDP 'storage limitation' and the plan matrix require concrete, enforced retention windows rather than data that lives forever: Trash purges after **30 days** (`PRD-STOR-006`), version history retains **7 days on Free / unlimited on Pro** (`PRD-STOR-007`), unreferenced content-addressed blobs are garbage-collected only **after** the trash/version window passes (`PRD-STOR-008`), and opt-in telemetry aggregates are purged on withdrawal. Today these windows are scattered across PRDs; this task centralises them into a single **retention policy engine** so the numbers are declared once, enforced by a scheduled purge, and auditable — satisfying the controls-matrix §7 'Storage limitation / retention' row and mitigating TM-P-07. It also removes deleted data completely (CWE-212), not cosmetically.

#### Scope
**In:** a `RetentionPolicy` config (the window per data class) in `sane_core`; a purge scheduler that runs off the UI isolate on app resume / periodically; Trash 30-day purge, version-history windowing (plan-aware), and post-window blob GC; a purge hook the telemetry kill switch and deletion flows can call.
**Out:** the Trash *UI* and soft-delete tombstone op (library area / `PRD-STOR-006` owner), the account-deletion orchestrator ([SN-PRV-006](privacy.md#sn-prv-006), which calls this engine), and cloud-side retention (the user owns their cloud).

#### Acceptance criteria
- [ ] Retention windows are declared in one place: Trash 30 days, version history Free 7 days / Pro unlimited, blob GC only after the longest applicable window.
- [ ] A tombstoned notebook is physically purged from local DB + blobs at 30 days (±1 scheduler tick) and is restorable before then.
- [ ] Version snapshots older than the plan window are pruned; Pro removes the cap; changing plan re-evaluates windows without data loss for still-in-window data.
- [ ] Blob GC never deletes a blob still referenced by an in-window snapshot or note; a referenced-then-orphaned blob is collected only after the window.
- [ ] The engine runs off the UI isolate and never blocks input; a large backlog purges incrementally.
- [ ] Purge is complete (CWE-212): purged rows/blobs/index entries leave no residual plaintext.

#### Technical notes
`packages/sane_core/lib/src/retention/`; a pure-Dart `RetentionPolicy` value object + `RetentionScheduler` invoked from the storage isolate (`app/` composition root). Windows are plan-aware via [SN-BILL-001](billing.md#sn-bill-001) entitlement (fail-open to Free windows). Blob GC uses the content-addressed store's reference count from `sane_core`. Reuse the same wipe primitives as [SN-PRV-006](privacy.md#sn-prv-006). Cite `PRD-STOR-006/007/008`, `PRD-PRIV-003`, controls-matrix §7 (Storage limitation), threat-model TM-P-07.

#### Security & privacy
Threats: TM-P-07 (Non-compliance — retention), CWE-212 (incomplete removal). Controls: MASVS-PRIVACY-3 (retention & user control), ASVS V14. Fail-open on entitlement (unknown plan → Free windows, never 'keep forever'). No content logged during purge; counts only.

#### UX notes
No dedicated UI, but the engine's outcomes are visible in Trash ('deleted notebooks stay here for 30 days') and version history; those surfaces (library/editor areas) render across the **17 looks + light/dark**. Ensure copy elsewhere matches the enforced numbers. a11y handled by the consuming surfaces.

#### Test plan
- Unit: `packages/sane_core/test/retention/retention_policy_test.dart` — window math per plan; plan-change re-evaluation.
- Unit: `packages/sane_core/test/retention/purge_scheduler_test.dart` — 30-day Trash purge; snapshot pruning; blob GC only post-window; incremental purge.
- Negative: residual-scan test after purge finds no plaintext.

#### Dependencies
[SN-CORE-004](storage.md#sn-core-004) (drift + blob store), [SN-BILL-001](billing.md#sn-bill-001) (plan windows), [SN-PRV-006](privacy.md#sn-prv-006) (shared wipe primitives).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] controls-matrix §7 Storage-limitation row moved toward Implemented
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-012

<a id="sn-prv-012"></a>

**Document the LINDDUN metadata-minimisation control set and cleartext register**

| Field | Value |
|---|---|
| GitHub | #424 |
| Type | docs |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | privacy, sync |
| Size | S |
| SDLC | design |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-SYNC-001](sync.md#sn-sync-001) |
| Security controls | `MASVS-PRIVACY-2`, `TM-P-01`, `TM-P-02`, `TM-P-04`, `TM-I-04`, `ASVS-V14` |
| Extra labels | agent-ready, sec: privacy-by-design, sec: threat-model |

#### Context
Even with perfect E2EE of content, a cloud provider can link a user's devices/sessions and detect activity from **metadata** — object names, sizes, timestamps, per-device segment counts (TM-P-01 Linkability, TM-P-02 Identifiability, TM-P-04 Detectability, TM-I-04 metadata disclosure). `PRD-SYNC-007` requires opaque object ids, size padding/rounding, and — critically — that the PRD **document exactly what metadata is intentionally cleartext and why**. Residual risk **RR4** in `docs/security/threat-model.md` §7 is explicitly **Open** pending this register. This docs task produces the authoritative LINDDUN metadata-minimisation control set and the intentionally-cleartext register that the sync implementation ([SN-SYNC-001](sync.md#sn-sync-001)) and its tests must conform to, before GA.

#### Scope
**In:** a document (under `docs/security/` or `sane_sync` docs) enumerating every piece of sync/collab metadata, classified encrypted / padded / intentionally-cleartext, each cleartext item with a justification and the LINDDUN threat it accepts; the minimisation controls (opaque ids, no deterministic filename hashes, size padding, batching/jitter); and closure of RR4 in the threat model.
**Out:** implementing the sync metadata handling ([SN-SYNC-001](sync.md#sn-sync-001)/[SN-SYNC-002](sync.md#sn-sync-002)) — this task specifies and constrains it.

#### Acceptance criteria
- [ ] Every sync/collab metadata field is listed with a classification (encrypted / padded / intentionally-cleartext) and, for cleartext, an explicit justification + accepted LINDDUN threat.
- [ ] The controls are concrete and testable: opaque object ids, **no deterministic filename hashes** (confirmation-attack avoidance, TM-I-04), size padding/rounding scheme, and write batching/jitter guidance.
- [ ] The register defines the assertions that [SN-SYNC-001](sync.md#sn-sync-001) tests must satisfy (e.g. 'object names carry no plaintext', 'sizes are rounded to N buckets').
- [ ] `docs/security/threat-model.md` §7 **RR4** is updated from Open to a recorded disposition citing this register.
- [ ] The doc is cross-linked from `docs/security/controls-matrix.md` §7 (Data minimisation) and TM-P-01/02/04/TM-I-04.

#### Technical notes
Author as `docs/security/metadata-minimisation.md` (new) or a section in the `sane_sync` architecture doc; keep it the single source the sync tests reference. Base the scheme on `research/local-first-sync-and-crdt.md` §4/§6 and the sync filename layout in `PRD-SYNC-004` (`notes/<opaqueId>/ops/<deviceId>.<seq>.enc`, etc.). Note which fields (per-device segment counts, mtimes) are unavoidably observable and why. Cite `PRD-SYNC-007`, threat-model TM-P-01/02/04, TM-I-04, RR4; controls-matrix §7.

#### Security & privacy
Threats: TM-P-01 (Linkability), TM-P-02 (Identifiability), TM-P-04 (Detectability), TM-I-04 (metadata disclosure). Controls: MASVS-PRIVACY-2 (collection transparency), ASVS V14. This is the specification that makes those mitigations verifiable; it accepts and documents residual timing detectability (RR3).

#### UX notes
None beyond baseline — this is a specification doc with no UI. Baseline: the intentionally-cleartext set it defines is also what the privacy dashboard ([SN-PRV-002](privacy.md#sn-prv-002)) and Play Data Safety ([SN-PRV-015](privacy.md#sn-prv-015)) must describe honestly, so the register is the source of truth those surfaces cite.

#### Test plan
- Docs review: the register is complete (every field classified) and internally consistent with `PRD-SYNC-004`.
- The acceptance assertions it defines are later implemented as `packages/sane_sync/test/metadata_minimisation_test.dart` (owned by [SN-SYNC-001](sync.md#sn-sync-001)); this task delivers the spec + checklist those tests encode.

#### Dependencies
[SN-SYNC-001](sync.md#sn-sync-001) (the implementation this constrains), [SN-SYNC-002](sync.md#sn-sync-002) (op-log/segment layout).

#### Definition of done
- [ ] Register merged; RR4 disposition recorded in threat-model §7
- [ ] Cross-linked from controls-matrix §7 and the LINDDUN register §6
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-013

<a id="sn-prv-013"></a>

**Author the DPIA for identity/sync/E2EE and a reusable DPIA template**

| Field | Value |
|---|---|
| GitHub | #425 |
| Type | docs |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | privacy, docs |
| Size | M |
| SDLC | requirements |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-2`, `TM-P-07`, `ASVS-V14` |
| Extra labels | agent-ready, sec: privacy-by-design, sec: threat-model |

#### Context
The controls matrix (`docs/security/controls-matrix.md` §9) commits to a **DPIA per major feature**, and GDPR Art.35 / DPDP require a Data Protection Impact Assessment for high-risk processing. The M4 feature set — optional identity, cloud sync of personal notes, and E2EE key management for minors and adults — is exactly such processing and is the first DPIA the product needs. This task authors that DPIA and, importantly, a **reusable template** so every later major feature (cloud AI, collaboration, student verification) inherits a consistent assessment. It operationalises TM-P-07 (Non-compliance) mitigation and gives store reviewers and auditors a concrete artefact.

#### Scope
**In:** a DPIA document for M4 identity/sync/E2EE covering: processing description + purposes, data categories + minors, necessity/proportionality, the LINDDUN risk assessment (linking to `threat-model.md` §6), mitigations + residual risk, and consultation/sign-off; plus a `docs/security/dpia-template.md` other features clone.
**Out:** DPIAs for later features (cloud AI, collab, student verification) — they reuse the template in their own milestones.

#### Acceptance criteria
- [ ] A completed DPIA for identity/sync/E2EE exists under `docs/security/` with all standard sections (processing, purposes, data categories incl. minors, necessity/proportionality, risks, mitigations, residual risk, sign-off).
- [ ] The DPIA cross-references the STRIDE/LINDDUN rows it relies on (`TM-P-05..09`, `TM-I-01..04`) rather than restating them, and the controls in `controls-matrix.md`.
- [ ] Residual risks are named and dispositioned (aligning with §7 RR1–RR7), including 'lost recovery code = permanent loss' and metadata detectability.
- [ ] A reusable `docs/security/dpia-template.md` exists and is referenced from `ssdlc-process.md` as the required artefact for major-feature design reviews.
- [ ] The DPIA is linked from `controls-matrix.md` §9 and the privacy obligations §7 (Privacy by design).

#### Technical notes
Author `docs/security/dpia-identity-sync-e2ee.md` + `docs/security/dpia-template.md`. Reuse the assets/actors/boundaries and TM-* ids from `docs/security/threat-model.md`; do not fork the risk analysis, reference it. Cite `PRD-PRIV-004..007`, `PRD-KEY-*`, `PRD-SYNC-*`, controls-matrix §7/§9, ADR-0004/0006/0007. Tie the minors angle to the age gate ([SN-PRV-007](privacy.md#sn-prv-007)) and parental-consent decision ([SN-PRV-008](privacy.md#sn-prv-008)).

#### Security & privacy
Threats: TM-P-07 (Non-compliance) — the DPIA is the mitigation evidence; TM-P-05 (Disclosure), TM-I-01..04. Controls: MASVS-PRIVACY-2, ASVS V14. The DPIA also documents the zero-knowledge posture that reduces breach-notification scope (GDPR Art.33) because Sane holds no plaintext.

#### UX notes
None beyond baseline — a governance/compliance document with no UI. Baseline: it must accurately describe the on-device-default, opt-in, ciphertext-only reality that the user-facing dashboard ([SN-PRV-002](privacy.md#sn-prv-002)) and store labels ([SN-PRV-015](privacy.md#sn-prv-015)) also assert, so the three stay consistent.

#### Test plan
- Docs review by the Security/Privacy Owner against GDPR Art.35 / DPDP DPIA expectations.
- Consistency check: DPIA claims match the threat-model rows, controls-matrix, and the privacy dashboard copy (no contradiction).

#### Dependencies
[SN-PRV-007](privacy.md#sn-prv-007) (minors), [SN-PRV-008](privacy.md#sn-prv-008) (parental consent), [SN-SYNC-001](sync.md#sn-sync-001), [SN-CRY-001](security.md#sn-cry-001), [SN-AUTH-001](auth.md#sn-auth-001) (the processing assessed).

#### Definition of done
- [ ] DPIA + template merged under docs/security/ and linked from controls-matrix §9 + ssdlc-process
- [ ] Residual risks dispositioned; Security/Privacy Owner sign-off recorded
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-014

<a id="sn-prv-014"></a>

**Author the Apple Privacy Manifest and run a Required-Reason API audit**

| Field | Value |
|---|---|
| GitHub | #426 |
| Type | task |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, ios-phone |
| Areas | privacy, release |
| Size | M |
| SDLC | release |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-012](privacy.md#sn-prv-012) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-CODE-2`, `MASVS-PLATFORM-1`, `TM-P-06` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
`PRD-PRIV-006` requires an Apple **Privacy Manifest** (`PrivacyInfo.xcprivacy`) declaring data use, tracking, and **Required-Reason API** usage, plus that third-party SDK manifests are accounted for. Apple rejects apps at review that call Required-Reason APIs (e.g. file timestamps, `UserDefaults`, disk space, system boot time) without a declared reason, and that lack manifests for listed SDKs. Because Sane collects essentially nothing, the manifest should be small and honest — but it must be **correct and complete**, including every first-party and plugin usage. This task authors the manifest, audits Required-Reason API usage across `app/` and `plugins/`, and ensures the declaration matches the on-device-default reality (TM-P-06 Unawareness — but toward the store/reviewer).

#### Scope
**In:** `app/ios/Runner/PrivacyInfo.xcprivacy` declaring NSPrivacyTracking=false, an empty/accurate tracking-domains list, accurate `NSPrivacyCollectedDataTypes` (none by default; opt-in crash only), and `NSPrivacyAccessedAPITypes` with reasons for every Required-Reason API used; an audit of first-party + plugin Required-Reason API usage; and confirming each bundled SDK ships its own manifest.
**Out:** the App Store Connect Nutrition Labels questionnaire and Play Data Safety ([SN-PRV-015](privacy.md#sn-prv-015)); the accuracy verification gate ([SN-PRV-016](privacy.md#sn-prv-016)).

#### Acceptance criteria
- [ ] `PrivacyInfo.xcprivacy` exists with `NSPrivacyTracking=false` and no tracking domains (consistent with 'no analytics SDK', [SN-PRV-010](privacy.md#sn-prv-010)).
- [ ] `NSPrivacyCollectedDataTypes` reflects the default 'no data collected' plus the opt-in crash-report type only, with linked=false / tracking=false.
- [ ] Every Required-Reason API actually used (audited across `app/` + `plugins/`) has a correct reason code in `NSPrivacyAccessedAPITypes`; unused categories are omitted.
- [ ] A written audit lists each Required-Reason API call site and its declared reason; the intentionally-cleartext metadata set from [SN-PRV-012](privacy.md#sn-prv-012) is consistent with what the manifest implies.
- [ ] Every third-party SDK/plugin bundled is confirmed to include its own privacy manifest (or is flagged for removal/replacement).
- [ ] A `TestFlight`/archive build passes Apple's manifest validation (no missing-reason warnings).

#### Technical notes
Author the manifest as the Xcode privacy-manifest plist under `app/ios/Runner/`. Audit Required-Reason APIs (Apple categories: File timestamp, System boot time, Disk space, Active keyboard, `UserDefaults`) across Dart plugin channels and native code in `plugins/*`. Keep the manifest the single iOS-side declaration; it must agree with [SN-PRV-015](privacy.md#sn-prv-015) labels and [SN-PRV-012](privacy.md#sn-prv-012). Cite `PRD-PRIV-006`, controls-matrix §7 (Store privacy declarations), threat-model TM-P-06.

#### Security & privacy
Threats: TM-P-06 (Unawareness / inaccurate disclosure to store + user). Controls: MASVS-PRIVACY-2 (accurate labels/manifest), MASVS-CODE-2 (deps accounted), MASVS-PLATFORM-1 (platform declarations). Baseline: the manifest must not over- or under-declare; both fail review or mislead.

#### UX notes
No end-user UI. The manifest is what the App Store privacy card is generated against, so it indirectly drives what users see on the store listing — it must match the in-app privacy dashboard ([SN-PRV-002](privacy.md#sn-prv-002)) claims exactly.

#### Test plan
- CI/build: archive validation step asserts no missing Required-Reason declarations (part of [SN-PRV-016](privacy.md#sn-prv-016) gate).
- Manual: reviewer diff of the audit vs the manifest; confirm each bundled SDK has a manifest.

#### Dependencies
[SN-PRV-012](privacy.md#sn-prv-012) (cleartext/metadata consistency), [SN-CI-004](ci-cd.md#sn-ci-004) (SBOM to enumerate SDKs), [SN-REL-001](release.md#sn-rel-001) (release build).

#### Definition of done
- [ ] Manifest + audit merged; archive passes Apple manifest validation
- [ ] controls-matrix §7 Store-declarations row updated; consistent with dashboard + labels
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-015

<a id="sn-prv-015"></a>

**Author store privacy declarations: Apple Nutrition Labels and Play Data Safety**

| Field | Value |
|---|---|
| GitHub | #427 |
| Type | task |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | privacy, release |
| Size | S |
| SDLC | release |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-014](privacy.md#sn-prv-014) |
| Security controls | `MASVS-PRIVACY-2`, `TM-P-06` |
| Extra labels | needs-credentials, sec: privacy-by-design |

#### Context
`PRD-PRIV-006` requires the store-facing privacy declarations to **match reality**: Apple **Privacy Nutrition Labels** in App Store Connect and Google Play **Data Safety** declaring *no data collected* except opt-in crash reports, encryption-in-transit, and user-requestable deletion. Because the product is local-first, zero-knowledge, on-device-default, and ships no analytics SDK ([SN-PRV-010](privacy.md#sn-prv-010)), these declarations should be the strongest 'no data collected' posture on either store — but they must be authored carefully and honestly (the opt-in crash report and the account-based sharing/entitlement are the only nuances). This task fills both store questionnaires. It requires maintainer store credentials, so it carries `needs-credentials`.

#### Scope
**In:** the Apple App Privacy questionnaire (Nutrition Labels) in App Store Connect; the Google Play Data Safety form; both declaring no default collection, opt-in crash reporting, encryption in transit, and user-requestable deletion; both consistent with the Apple manifest ([SN-PRV-014](privacy.md#sn-prv-014)) and the LINDDUN register ([SN-PRV-012](privacy.md#sn-prv-012)); a committed source-of-truth mapping doc so the questionnaires can be reproduced.
**Out:** the on-device privacy dashboard ([SN-PRV-002](privacy.md#sn-prv-002)), the Apple manifest file ([SN-PRV-014](privacy.md#sn-prv-014)), and the accuracy gate ([SN-PRV-016](privacy.md#sn-prv-016)).

#### Acceptance criteria
- [ ] Google Play Data Safety declares 'no data collected' by default, crash reports only if the user opts in, data encrypted in transit, and that users can request deletion — matching ADR-0011 and `PRD-TEL-001`.
- [ ] Apple Nutrition Labels declare no tracking, no data linked to identity by default, and only the opt-in crash-report data type — consistent with `PrivacyInfo.xcprivacy` ([SN-PRV-014](privacy.md#sn-prv-014)).
- [ ] A committed mapping doc (`docs/security/store-privacy-declarations.md`) records every questionnaire answer and its justification/source so the labels are reproducible and auditable.
- [ ] Any account-based nuance (identity token to provider; entitlement email) is declared accurately, not hidden.
- [ ] The declarations agree field-for-field with the in-app dashboard ([SN-PRV-002](privacy.md#sn-prv-002)) and the LINDDUN cleartext register ([SN-PRV-012](privacy.md#sn-prv-012)).

#### Technical notes
The questionnaires are authored in App Store Connect and Play Console (maintainer accounts — `needs-credentials`). Commit the reproducible answer set as `docs/security/store-privacy-declarations.md`. Ensure alignment with [SN-PRV-014](privacy.md#sn-prv-014) (Apple manifest) and [SN-PRV-010](privacy.md#sn-prv-010) (no analytics SDK, so no third-party data collection to declare). Cite `PRD-PRIV-006`, controls-matrix §7 (Store privacy declarations), ADR-0011, threat-model TM-P-06.

#### Security & privacy
Threats: TM-P-06 (Unawareness / inaccurate store disclosure). Controls: MASVS-PRIVACY-2. Honesty is the control: under-declaring risks store rejection/removal; over-declaring misleads users about a product whose whole value is privacy.

#### UX notes
No in-app UI; the output is the store listing's privacy section that users read before install. It MUST read consistently with the in-app dashboard ([SN-PRV-002](privacy.md#sn-prv-002)) so a user sees the same story on the store and in the app.

#### Test plan
- Review: the committed mapping doc is checked against ADR-0011, the manifest, and the dashboard for contradictions ([SN-PRV-016](privacy.md#sn-prv-016) automates part of this).
- Manual: screenshots of both store questionnaires attached to the PR for the record.

#### Dependencies
[SN-PRV-014](privacy.md#sn-prv-014) (Apple manifest), [SN-PRV-012](privacy.md#sn-prv-012) (cleartext register), [SN-PRV-010](privacy.md#sn-prv-010) (no analytics SDK), [SN-REL-001](release.md#sn-rel-001) (store presence). Blocked on maintainer store credentials.

#### Definition of done
- [ ] Both questionnaires submitted; mapping doc merged under docs/security/
- [ ] controls-matrix §7 Store-declarations row moved toward Implemented
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-016

<a id="sn-prv-016"></a>

**Add a gate verifying store privacy declarations match reality**

| Field | Value |
|---|---|
| GitHub | #428 |
| Type | test |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | privacy, qa |
| Size | S |
| SDLC | verification |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | [SN-PRV-015](privacy.md#sn-prv-015) |
| Security controls | `MASVS-PRIVACY-2`, `TM-P-06` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
Store privacy declarations drift: a new dependency, a new network call, or a changed default can silently make the Apple manifest / Nutrition Labels ([SN-PRV-014](privacy.md#sn-prv-014), [SN-PRV-015](privacy.md#sn-prv-015)) and Play Data Safety false — which is both a compliance risk and a store-removal risk. Locked decision 8 and the roadmap M7 exit criterion require that 'store privacy declarations are accurate and signed off'. This task adds a verification gate that checks the committed declaration source-of-truth against observable facts: the SBOM (no undeclared data-collecting SDK), the manifest's Required-Reason coverage, a first-run zero-egress assertion, and consistency with the LINDDUN cleartext register. It closes TM-P-06 on the store side and gives M7 a concrete pass/fail.

#### Scope
**In:** a CI/test gate (`app/test/privacy/store_declarations_consistency_test.dart` + a script step) that (1) asserts the committed `store-privacy-declarations.md` mapping is consistent with `PrivacyInfo.xcprivacy` and ADR-0011; (2) fails if the SBOM contains a data-collecting SDK not declared; (3) references the first-run zero-egress instrumented check; (4) checks the dashboard copy claims match the declarations.
**Out:** authoring the declarations themselves ([SN-PRV-014](privacy.md#sn-prv-014), [SN-PRV-015](privacy.md#sn-prv-015)) and the telemetry first-run test ownership ([SN-TEL-001](telemetry.md#sn-tel-001), reused here).

#### Acceptance criteria
- [ ] The gate fails if `PrivacyInfo.xcprivacy` declares a collected data type or tracking domain not present in the committed declaration mapping, or vice versa.
- [ ] The gate fails if the SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)) lists a known data-collecting SDK that is not declared (reuses the [SN-PRV-010](privacy.md#sn-prv-010) denylist).
- [ ] The gate references/asserts a green first-run zero-egress instrumented run (no telemetry/crash egress before opt-in) — reused from [SN-TEL-001](telemetry.md#sn-tel-001) / ADR-0011 verify #1.
- [ ] The gate checks that privacy-dashboard ([SN-PRV-002](privacy.md#sn-prv-002)) claim strings and the declaration mapping do not contradict (a shared constants source or a documented mapping).
- [ ] The gate runs in CI at release-candidate time and is required for the M7 exit; it is green on the current scaffold with placeholder declarations.
- [ ] Failure messages name the specific inconsistency and the doc/field to fix.

#### Technical notes
Implement as a Dart test plus a small Node checker (`tools/scripts/check_store_declarations.mjs`) wired into the release-candidate workflow ([SN-CI-001](ci-cd.md#sn-ci-001)). Parse `PrivacyInfo.xcprivacy`, the CycloneDX SBOM, and `docs/security/store-privacy-declarations.md`. Reuse the analytics denylist from [SN-PRV-010](privacy.md#sn-prv-010) and the first-run egress harness from [SN-TEL-001](telemetry.md#sn-tel-001). Cite `PRD-PRIV-006`, ADR-0011 verify #1/#2/#5, controls-matrix §7, threat-model TM-P-06, roadmap M7 exit criteria.

#### Security & privacy
Threats: TM-P-06 (Unawareness / declaration drift). Controls: MASVS-PRIVACY-2. This is a preventive/verification gate ensuring the honesty controls stay honest across changes; no runtime data handling.

#### UX notes
No end-user UI. Developer/reviewer-facing: failures point at the exact field and file. Indirectly protects what users read on the store and in the dashboard, keeping the two consistent.

#### Test plan
- Unit: `tools/scripts/check_store_declarations.test.mjs` — a manifest/SBOM/mapping mismatch fails; a consistent set passes.
- Widget/integration: `app/test/privacy/store_declarations_consistency_test.dart` — dashboard claim strings vs declaration mapping; references the first-run egress run.
- CI: gate present and required in the release-candidate workflow.

#### Dependencies
[SN-PRV-015](privacy.md#sn-prv-015) (declarations), [SN-PRV-014](privacy.md#sn-prv-014) (manifest), [SN-PRV-002](privacy.md#sn-prv-002) (dashboard claims), [SN-PRV-010](privacy.md#sn-prv-010) (denylist), [SN-CI-001](ci-cd.md#sn-ci-001) (workflow), [SN-TEL-001](telemetry.md#sn-tel-001) (egress harness).

#### Definition of done
- [ ] Gate + tests merged, required at release-candidate, green on scaffold
- [ ] controls-matrix §7 Store-declarations verification noted; M7 exit criterion satisfiable
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PRV-017

<a id="sn-prv-017"></a>

**Draft the Privacy Policy and Terms of Service**

| Field | Value |
|---|---|
| GitHub | #429 |
| Type | docs |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | privacy, docs |
| Size | M |
| SDLC | requirements |
| Parent | [SN-PRV-001](privacy.md#sn-prv-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-2`, `TM-P-07`, `ASVS-V14` |
| Extra labels | needs-decision, sec: privacy-by-design |

#### Context
`PRD-AUTH-005` requires the login fine-print ('By continuing you agree to the Terms and Privacy Policy. Handwriting recognition runs on your device.') to link **Terms and Privacy Policy to live URLs** that remain literally true, and `PRD-PRIV-004` requires a visible Privacy Policy link plus a contact/redress channel in the rights surface ([SN-PRV-005](privacy.md#sn-prv-005)). The zero-knowledge, on-device-default, opt-in-telemetry architecture makes an honest policy unusually short — but the *text* must be drafted, legally reviewed for the target jurisdictions (India DPDP 2023, GDPR, COPPA), and reconciled with the still-undecided **license** (CLAUDE.md §13). Because it needs legal review and depends on the license/jurisdiction decisions, this task carries `needs-decision` — the agent drafts the source text and structure; the maintainer/counsel finalises.

#### Scope
**In:** a drafted Privacy Policy and Terms of Service (source Markdown under `docs/legal/` or `website/`) accurately describing local-first/zero-knowledge processing, on-device default, opt-in telemetry/AI, user-owned cloud, data-subject rights, retention windows, minors handling, and the contact/redress channel; a jurisdiction matrix (DPDP/GDPR/COPPA/CCPA) noting where wording differs; and the placeholder→live-URL wiring for login/onboarding and the rights surface.
**Out:** the rights *surface* ([SN-PRV-005](privacy.md#sn-prv-005)), the store questionnaires ([SN-PRV-015](privacy.md#sn-prv-015)), and the marketing site hosting ([SN-SITE-001](website.md#sn-site-001)).

#### Acceptance criteria
- [ ] Draft Privacy Policy + ToS exist as versioned source, accurately reflecting the architecture (no claim contradicts the DPIA [SN-PRV-013](privacy.md#sn-prv-013), the dashboard [SN-PRV-002](privacy.md#sn-prv-002), or the store declarations [SN-PRV-015](privacy.md#sn-prv-015)).
- [ ] The policy covers: what data is processed and where, on-device default, opt-in telemetry/AI, user-owned E2EE cloud, data-subject rights + how to exercise them, retention windows ([SN-PRV-011](privacy.md#sn-prv-011)), minors handling ([SN-PRV-007](privacy.md#sn-prv-007)/[SN-PRV-008](privacy.md#sn-prv-008)), breach contact, and a redress channel.
- [ ] A jurisdiction matrix records DPDP/GDPR/COPPA/CCPA wording deltas and any items blocked on the license decision.
- [ ] Live URLs are wired into the login fine-print (`PRD-AUTH-005`) and the rights surface (`PRD-PRIV-004`); until finalised, a clearly-labelled placeholder is used and the issue stays `needs-decision`.
- [ ] The draft is flagged for legal review; the maintainer decisions it depends on (license, jurisdictions) are listed.

#### Technical notes
Author `docs/legal/privacy-policy.md` and `docs/legal/terms-of-service.md` (source of truth) that the website renders; wire URLs through `sane_ui`/`app/` constants so login and rights link to them. Keep the policy consistent with ADR-0011 (telemetry), ADR-0004/0006/0007 (local-first/sync/E2EE), and [SN-PRV-013](privacy.md#sn-prv-013) (DPIA). Cite `PRD-AUTH-005`, `PRD-PRIV-004`, controls-matrix §7, threat-model TM-P-07, CLAUDE.md §13 (license undecided).

#### Security & privacy
Threats: TM-P-07 (Non-compliance) — an inaccurate or absent policy is itself a violation. Controls: MASVS-PRIVACY-2 (transparency), ASVS V14. The honesty control is that every sentence must be verifiable against the architecture; no aspirational claims.

#### UX notes
The policy is linked from the Login fine-print (`docs/design/screens-and-flows.md` §3), Onboarding, and the rights surface ([SN-PRV-005](privacy.md#sn-prv-005)); the linked pages render in the browser/web view and must be readable, `Semantics`-friendly, high-contrast, and keyboard-navigable. In-app links use `sane_ui` tokens across all 17 looks + light/dark.

#### Test plan
- Docs review + legal sign-off; consistency check against DPIA, dashboard, and store declarations.
- Widget: `app/test/privacy/policy_links_test.dart` — login + rights surface link to the configured URLs (placeholder acceptable pre-finalisation).

#### Dependencies
[SN-PRV-013](privacy.md#sn-prv-013) (DPIA consistency), [SN-PRV-005](privacy.md#sn-prv-005) (rights surface links), [SN-PRV-015](privacy.md#sn-prv-015) (store-declaration consistency), [SN-SITE-001](website.md#sn-site-001) (hosting). Blocked on the license + jurisdiction decisions (CLAUDE.md §13).

#### Definition of done
- [ ] Draft policy + ToS + jurisdiction matrix merged under docs/legal/; flagged for legal review
- [ ] Live/placeholder URLs wired into login + rights surface; controls-matrix §7 updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

