# Backlog — area: release

27 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-REL-001](release.md#sn-rel-001) **Establish release engineering: versioning, pipelines, store submission and rollback** (epic · M8 Launch & Growth)
  - [SN-REL-002](release.md#sn-rel-002) **Define the version scheme and build-number policy for all five surfaces** · p1 · task · S · M0 Foundations
  - [SN-REL-003](release.md#sn-rel-003) **Generate the changelog and store release notes from Conventional Commits** · p2 · infra · S · M0 Foundations
  - [SN-REL-004](release.md#sn-rel-004) **Build the tag-driven release train workflow (release.yml)** · p1 · feature · L · M8 Launch & Growth
    - [SN-REL-005](release.md#sn-rel-005) **Introduce fastlane lanes for iOS and Android release automation** · p1 · infra · M · M8 Launch & Growth
    - [SN-REL-006](release.md#sn-rel-006) **Implement Play track promotion and staged rollout with automated halt** · p1 · infra · M · M8 Launch & Growth
    - [SN-REL-008](release.md#sn-rel-008) **Implement atomic web deploys with instant rollback and safe worker updates** · p1 · infra · M · M8 Launch & Growth
    - [SN-REL-012](release.md#sn-rel-012) **Gate rollout advancement on crash-free sessions and release health** · p1 · infra · M · M8 Launch & Growth
    - [SN-REL-014](release.md#sn-rel-014) **Implement the hotfix and rollback process across stores and web** · p0 · infra · M · M8 Launch & Growth
  - [SN-REL-007](release.md#sn-rel-007) **Define the beta program: TestFlight groups, Play tracks and feedback intake** · p1 · task · M · M7 Beta Hardening & Security Audit
  - [SN-REL-010](release.md#sn-rel-010) **Publish App Store and Play listings and metadata as code** · p1 · feature · M · M8 Launch & Growth
    - [SN-REL-009](release.md#sn-rel-009) **Automate store screenshots across devices, locales and looks** · p2 · test · M · M8 Launch & Growth
  - [SN-REL-011](release.md#sn-rel-011) **Enforce a pre-submission store review compliance gate** · p0 · security · M · M7 Beta Hardening & Security Audit
  - [SN-REL-013](release.md#sn-rel-013) **Write the release checklist and go/no-go runbook** · p1 · docs · M · M7 Beta Hardening & Security Audit
  - [SN-REL-015](release.md#sn-rel-015) **Add a release-blocker gate for placeholder art, licence and debug flags** · p1 · infra · S · M8 Launch & Growth
  - [SN-REL-016](release.md#sn-rel-016) **Build the in-app What's new sheet, About panel and update prompts** · p2 · feature · M · M8 Launch & Growth
  - [SN-REL-017](release.md#sn-rel-017) **Inventory release secrets and define the rotation runbook** · p0 · security · S · M8 Launch & Growth
  - [SN-GIPAD-008](perf.md#sn-gipad-008) **Hold the iOS app download size to budget with thinning and on-demand packs** · p2 · infra · M · M7 Beta Hardening & Security Audit
  - [SN-GIPAD-015](release.md#sn-gipad-015) **Complete the App Store DSA trader declaration and EU compliance metadata** · p2 · task · S · M8 Launch & Growth
  - [SN-GOPS-008](ci-cd.md#sn-gops-008) **Track service and tooling running costs with budgets and spend alerts** · p2 · infra · S · M8 Launch & Growth
  - [SN-GOPS-009](ci-cd.md#sn-gops-009) **Define service SLOs and wire health checks, uptime probes and alerting** · p1 · infra · M · M8 Launch & Growth
  - [SN-GOPS-012](release.md#sn-gops-012) **Track store policy changes and annual platform compliance deadlines** · p1 · task · S · M8 Launch & Growth
  - [SN-GOPS-014](release.md#sn-gops-014) **Inventory organisational accounts with custody and continuity rules** · p1 · task · S · M8 Launch & Growth
  - [SN-GOPS-016](release.md#sn-gops-016) **Monitor store reviews and route feature requests into the backlog** · p2 · task · S · M8 Launch & Growth

---

## Issues

### SN-AND-026

<a id="sn-and-026"></a>

**Prepare Google Play readiness: Data Safety, permissions rationale & gate**

| Field | Value |
|---|---|
| GitHub | #79 |
| Type | infra |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | android-tablet, android-phone |
| Areas | release, privacy |
| Size | M |
| SDLC | release |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-022](ci-cd.md#sn-and-022), [SN-PRV-001](privacy.md#sn-prv-001), [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3` |
| Extra labels | needs-credentials |

#### Context
Google Play gates release on an accurate Data Safety form, minimal permissions with runtime rationale, target-SDK compliance, 16 KB alignment and AAB delivery (docs/platform/android.md §9, compat matrix §7). Sane Notes declares "no data collected" except opt-in crash reports (locked decision 8) — and this declaration must match actual behaviour and every linked SDK. This assembles the Play-side release checklist and needs a Play developer account, so it carries needs-credentials.

#### Scope
**In:** the Data Safety form declaring "no data collected" except opt-in crash reports, verified against every linked SDK; a permissions inventory with in-context runtime rationale (mic for voice notes, camera for scan — no broad storage); a store-readiness gate composing the target-SDK, 16 KB and AAB checks; Play Data Safety reflecting the zero-knowledge reality.
**Out:** signing keys / staged rollout / SLSA provenance (SN-REL-*, referenced); the privacy dashboard in-app (SN-PRV-001, consumed here); the 16 KB gate ([SN-AND-021](compat.md#sn-and-021)) and build config ([SN-AND-022](ci-cd.md#sn-and-022)) which this depends on.

#### Acceptance criteria
- [ ] The Data Safety form declares "no data collected" except opt-in crash reports and matches actual behaviour and every linked SDK (no analytics SDK, no silent collection).
- [ ] The permission set is minimal: no broad storage permission (SAF handles files); mic declared only for voice notes and camera only for scan/import, each with a runtime rationale shown in-context.
- [ ] A store-readiness gate confirms target-SDK compliance, 16 KB alignment ([SN-AND-021](compat.md#sn-and-021)) and AAB delivery ([SN-AND-022](ci-cd.md#sn-and-022)) before a release build is accepted.
- [ ] Foreground-service types (mic/dataSync) are declared with justifications matching [SN-AND-023](audio.md#sn-and-023).
- [ ] The Play console configuration and the store listing are prepared; the actual account/keys are supplied by the maintainer (needs-credentials).

#### Technical notes
Play Console Data Safety + App content; manifest permission audit; runtime rationale flows (in-context, ADR-0012 rule 6); a CI/release checklist composing [SN-AND-021](compat.md#sn-and-021)/[SN-AND-022](ci-cd.md#sn-and-022) outputs, wired to .github/workflows (SN-FND-003 CI). Mirrors the privacy dashboard truth (SN-PRV-001). docs/platform/android.md §9.

#### Security & privacy
Privacy-by-design and truthful disclosure (MASVS-PRIVACY-1/2/3): the store declaration must reflect the zero-knowledge, no-collection reality; every SDK is audited so the form cannot be silently falsified. Least-privilege permissions with in-context rationale. Opt-in crash reporting only (locked decision 8).

#### UX notes
Users see a Play listing that honestly says "no data collected", and in-app permission prompts appear only when a feature needs them with a plain reason (docs/platform/android.md §9). This transparency is a selling point for the privacy-first persona.

#### Test plan
A release checklist test/script that fails if a non-declared SDK is linked or a broad permission is present; app/test/privacy/permission_inventory_test.dart (declared permissions match features); manual Play pre-launch report review; cross-check against the in-app privacy dashboard (SN-PRV-001).

#### Dependencies
SN-AND-022 (build config), SN-PRV-001 (privacy dashboard truth), SN-FND-003 (CI). Also composes the 16 KB gate ([SN-AND-021](compat.md#sn-and-021)) and recording service ([SN-AND-023](audio.md#sn-and-023)). Blocked on maintainer Play account.

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-GAND-006

<a id="sn-gand-006"></a>

**Meet Google Play large-screen and foldable app-quality requirements**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | android-tablet, android-phone |
| Areas | release, compat, qa |
| Size | M |
| SDLC | release |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-026](release.md#sn-and-026), [SN-AND-012](compat.md#sn-and-012), [SN-AND-013](compat.md#sn-and-013) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | — |

#### Context
[SN-AND-026](release.md#sn-and-026) covers the Play readiness items named in `docs/platform/android.md` §9 (Data Safety, target SDK, 16 KB, permissions). It does **not** cover Google Play's separate **large-screen app quality** requirements, which decide whether a tablet/foldable user ever sees the app: Play ranks and filters tablet search results by large-screen quality, shows device-specific listings, and can surface a warning on the store entry for apps that are letterboxed, orientation-locked or that fail the tablet checks in the Play Console pre-launch report. Android is described in `docs/platform/android.md` as "the surface where competitors are weakest and least consistent — the strategic opening"; being demoted in the Play tablet ranking would forfeit exactly that opening. The engineering work is already scoped across [SN-AND-012](compat.md#sn-and-012)/[SN-AND-013](compat.md#sn-and-013)/[SN-AND-031](input-gestures.md#sn-and-031); what is missing is the **gate** that proves it and the store-listing work that depends on it.

#### Scope
**In:** a written checklist derived from Play's large-screen app quality tiers (layout at every size class, no orientation lock, keyboard/mouse/stylus support, multi-window/split-screen, camera/media in any orientation, state preservation across resize/fold) mapped to the issue that satisfies each line; wiring the Play Console **pre-launch report** (including its tablet and foldable device pool) into the release gate so new warnings block promotion; device-type-targeted store listing assets for tablet and foldable ([SN-BRD-008](brand.md#sn-brd-008), [SN-REL-009](release.md#sn-rel-009) produce the art, this issue defines the requirement); a documented waiver process for any line we deliberately do not meet.
**Out:** the layout implementations themselves ([SN-AND-012](compat.md#sn-and-012), [SN-AND-013](compat.md#sn-and-013), [SN-GAND-005](compat.md#sn-gand-005)); Data Safety and permissions ([SN-AND-026](release.md#sn-and-026)); staged rollout mechanics ([SN-REL-006](release.md#sn-rel-006)); screenshot production ([SN-REL-009](release.md#sn-rel-009)).

#### Acceptance criteria
- [ ] `docs/platform/android.md` §9 gains a "Large-screen quality" subsection: every requirement line, the owning issue key, and current pass/fail.
- [ ] A release-candidate build is run through the Play Console pre-launch report on a tablet and a foldable device pool; crashes, ANRs and layout/accessibility warnings are triaged, and an unwaived warning blocks promotion in [SN-REL-006](release.md#sn-rel-006).
- [ ] The build declares no `screenOrientation`, no `resizableActivity="false"`, no min/max aspect ratio, and no restricted-resizability opt-out — asserted by an automated manifest check in CI, not by review.
- [ ] Tablet and foldable store listings carry device-appropriate screenshots (landscape two-pane, unfolded layout) and the listing passes Play's device-specific listing checks.
- [ ] Keyboard, mouse and stylus support is demonstrated for the checklist (evidence links to [SN-AND-031](input-gestures.md#sn-and-031) and [SN-AND-010](input-gestures.md#sn-and-010) tests).
- [ ] Any waiver has a named owner, a reason and a re-review date in the checklist.

#### Technical notes
The manifest assertion is a small Gradle/CI step over the **merged** manifest (`app/build/outputs/logs/manifest-merger-*.txt` or `bundletool dump manifest`) run in the existing Android CI job ([SN-FND-013](ci-cd.md#sn-fnd-013)) and reused by [SN-REL-011](release.md#sn-rel-011). Pre-launch report retrieval uses the Play Developer API credentials already inventoried in [SN-REL-017](release.md#sn-rel-017)/[SN-AUTH-020](auth.md#sn-auth-020); no new secrets. Keep the checklist in docs, not in a spreadsheet, so it reviews as a diff.

#### Security & privacy
No user data. The pre-launch report runs our app on Google-operated devices: the CI-built RC must contain no test accounts, no auth bypass ([SN-AUTH-021](auth.md#sn-auth-021)), no seeded notes with real content, and no non-public endpoints — assert this in the gate. Credentials for the Play API follow least privilege ([SN-CI-009](ci-cd.md#sn-ci-009)).

#### UX notes
No in-app UI. The listing work must show the *tablet* experience first on tablet listings (two-pane library + editor with the page rail) per `docs/design/screens-and-flows.md`, not a phone screenshot scaled up.

#### Test plan
CI: manifest assertion unit test with a fixture manifest containing each banned attribute. Release rehearsal: run one RC end-to-end through the pre-launch report and record triage in the release checklist ([SN-REL-013](release.md#sn-rel-013)). Manual: verify the store listing preview on a tablet form factor. Files: `tools/ci/check_android_manifest.mjs`, checklist section in `docs/platform/android.md`, gate row in `docs/release/`.

#### Dependencies
[SN-AND-026](release.md#sn-and-026), [SN-AND-012](compat.md#sn-and-012), [SN-AND-013](compat.md#sn-and-013)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-007

<a id="sn-gand-007"></a>

**Budget the Android App Bundle size and move heavy assets to Play delivery modules**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | android-tablet, android-phone |
| Areas | release, perf, ci-cd |
| Size | M |
| SDLC | release |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-022](ci-cd.md#sn-and-022), [SN-I18N-008](i18n.md#sn-i18n-008), [SN-HWR-004](ocr-hwr.md#sn-hwr-004) |
| Security controls | `MASVS-CODE-4`, `CWE-494` |
| Extra labels | — |

#### Context
Sane Notes ships a lot of bytes: twelve bundled font families ([SN-DS-009](design-system.md#sn-ds-009)), script-fallback fonts for CJK/Indic/Arabic ([SN-I18N-008](i18n.md#sn-i18n-008)), vector paper templates ([SN-TPL-003](templates.md#sn-tpl-003), [SN-TPL-004](templates.md#sn-tpl-004)), sticker packs ([SN-MED-011](images-media.md#sn-med-011)), the Flutter engine plus native `.so`s for ink, PDF and ML ([SN-AND-021](compat.md#sn-and-021)), and on-device recognition/AI models ([SN-HWR-004](ocr-hwr.md#sn-hwr-004), [SN-AI-008](ai.md#sn-ai-008)). [SN-AND-022](ci-cd.md#sn-and-022) configures the App Bundle and per-ABI/density/language splits, and [SN-I18N-008](i18n.md#sn-i18n-008) already says CJK should be an on-demand asset — but **nothing owns the overall download-size budget**, and Google Play enforces hard caps on the compressed download an App Bundle may generate. Exceeding them is a hard publish failure discovered at the worst possible moment; sitting just under them is still a conversion problem in India, the first market (`docs/product/` pricing/INR-first positioning) where install size and data cost matter.

#### Scope
**In:** a machine-readable Android size budget (base install-time download, per-ABI, total) added to the performance budget registry ([SN-PERF-018](perf.md#sn-perf-018)); a CI step that builds the release AAB, derives the per-device download size with `bundletool get-size total`, and fails on regression beyond a threshold; classifying every heavy asset as install-time, fast-follow or on-demand; implementing Play Asset Delivery / dynamic feature modules for the on-demand set (CJK fonts, premium template packs, sticker packs, recognition and AI models) with a download-progress and retry UX; making sure an on-demand asset that is missing degrades instead of crashing.
**Out:** 16 KB alignment ([SN-AND-021](compat.md#sn-and-021)); the model-download manager for ML assets, which owns integrity verification ([SN-HWR-004](ocr-hwr.md#sn-hwr-004), [SN-AI-008](ai.md#sn-ai-008)); font licensing ([SN-BRD-011](brand.md#sn-brd-011)); the web bundle budget ([SN-WEB-003](perf.md#sn-web-003)).

#### Acceptance criteria
- [ ] The release AAB's per-device download size is computed in CI for arm64-v8a/armeabi-v7a/x86_64 at a representative density and compared against the budget; a regression > 5% or any breach of the absolute cap fails the build.
- [ ] Base install-time download stays inside the documented budget on the low-end reference device profile; the numbers are recorded in `docs/platform/performance-budgets.md`.
- [ ] CJK/Indic fallback fonts, premium template packs, sticker packs and every ML model are delivered on demand, not in the base install ([SN-I18N-008](i18n.md#sn-i18n-008), [SN-TPL-008](templates.md#sn-tpl-008)).
- [ ] A user on a metered connection is told the size before an on-demand pack downloads, can cancel, and the app remains fully usable for note-taking without it (a missing pack degrades: tofu-free fallback font, no premium templates, recognition disabled with an explanatory state).
- [ ] Asset packs are verified before use (integrity check) and a corrupt/partial pack is deleted and re-fetched rather than loaded ([SN-HWR-004](ocr-hwr.md#sn-hwr-004) pattern).
- [ ] `docs/platform/android.md` §9 documents the delivery mode of every heavy asset class.

#### Technical notes
`bundletool build-apks --mode=default` + `get-size total --dimensions=SDK,ABI,SCREEN_DENSITY,LANGUAGE` in the Android CI job ([SN-FND-013](ci-cd.md#sn-fnd-013)); Play Asset Delivery `install-time`/`fast-follow`/`on-demand` asset packs declared in `app/android`; Play Feature Delivery only if an asset pack cannot express the need (dynamic features complicate Flutter). Budget rows live beside the other B1–B10 budgets ([SN-PERF-018](perf.md#sn-perf-018)). Note that split APK sizes differ per ABI — budget arm64 and armeabi-v7a separately ([SN-GAND-017](perf.md#sn-gand-017)).

#### Security & privacy
Asset packs are code-adjacent inputs fetched at runtime: verify integrity/signature before loading, never execute downloaded code, and treat any pack payload as untrusted input through the existing validation gate ([SN-SEC-004](security.md#sn-sec-004), CWE-494 download of code without integrity check, MASVS-CODE-4). Pack downloads must respect the Wi-Fi-only preference ([SN-SYNC-019](sync.md#sn-sync-019)) and must not carry identifiers beyond what Play requires ([SN-PRV-012](privacy.md#sn-prv-012)).

#### UX notes
Download prompts reuse the model-download sheet from [SN-HWR-004](ocr-hwr.md#sn-hwr-004) (size, Wi-Fi-only hint, cancel, progress) and the empty/degraded states from `docs/design/screens-and-flows.md`. Never block first launch on a pack.

#### Test plan
CI: size job with a golden budget file; a unit test for the budget parser. Integration: launch with a pack absent and assert graceful degradation; simulate a corrupt pack and assert re-fetch. Manual: install from an internal Play track on the 4 GB reference device and record the real download size. Files: `tools/ci/aab_size.mjs`, `docs/platform/performance-budgets.md` rows, `integration_test/asset_pack_missing_test.dart`.

#### Dependencies
[SN-AND-022](ci-cd.md#sn-and-022), [SN-I18N-008](i18n.md#sn-i18n-008), [SN-HWR-004](ocr-hwr.md#sn-hwr-004)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-015

<a id="sn-gipad-015"></a>

**Complete the App Store DSA trader declaration and EU compliance metadata**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, ios-phone |
| Areas | release, privacy, docs |
| Size | S |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-IPAD-023](release.md#sn-ipad-023), [SN-PRV-017](privacy.md#sn-prv-017) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | needs-decision |

#### Context
[SN-IPAD-023](release.md#sn-ipad-023) covers App Store Connect readiness for the nutrition label, encryption export compliance and metadata, and [SN-REL-011](release.md#sn-rel-011) adds a pre-submission review gate — but neither covers the **EU Digital Services Act trader requirements**, which Apple now enforces at the account level: a developer distributing a paid app (or any app, depending on account status) in EU storefronts must declare **trader status** and publish verified trader contact details (legal name, address, phone, email), or the app is removed from EU storefronts. It is a hard launch blocker for a paid product ([SN-BILL-001](billing.md#sn-bill-001)), it needs maintainer-supplied legal identity, and verification takes real calendar time — exactly the kind of item that gets discovered a week before launch.

#### Scope
**In:** determining and recording whether the publishing entity is a trader for DSA purposes; collecting and submitting the trader contact details in App Store Connect and completing Apple's verification; making the same details consistent with the Play Console equivalent, the website imprint/contact page ([SN-SITE-010](website.md#sn-site-010)), the Privacy Policy and Terms ([SN-PRV-017](privacy.md#sn-prv-017)), and the in-app About screen ([SN-SET-015](settings.md#sn-set-015)); a release-checklist item ([SN-REL-013](release.md#sn-rel-013)) that blocks EU-storefront submission until verification is complete; a note on related EU obligations that touch the listing (consumer withdrawal rights for subscriptions, dispute-resolution contact) with links to where they are handled.
**Out:** the privacy nutrition label and export compliance ([SN-IPAD-023](release.md#sn-ipad-023)); Play Data Safety ([SN-AND-026](release.md#sn-and-026)); billing/tax registration ([SN-BILL-010](billing.md#sn-bill-010)); GDPR data-subject rights ([SN-PRV-005](privacy.md#sn-prv-005)), which are separate obligations.

#### Acceptance criteria
- [ ] A written decision records trader vs non-trader status with its reasoning and the date, stored with the release documentation.
- [ ] Trader details are submitted and verified in App Store Connect, and the same legal entity, address and contact appear on the website, in the Terms, and in the in-app About screen — checked by a single reviewer against one source of truth.
- [ ] The release checklist gains a blocking "EU trader verification complete" item; the go/no-go runbook ([SN-REL-013](release.md#sn-rel-013)) cannot be signed off without it.
- [ ] The personal-data consequences of publishing contact details (a natural person's address becomes public) are acknowledged in writing, with a mitigation option (business address / registered agent) offered to the maintainer.
- [ ] A recurring reminder exists to re-confirm details at each major release, since stale trader details are themselves a violation.

#### Technical notes
No application code. Artefacts live in `docs/release/` and the store-metadata-as-code repository slice ([SN-REL-010](release.md#sn-rel-010)) so the About screen and the listing read the same values; add the contact block to the metadata files rather than hard-coding it in the app.

#### Security & privacy
Publishing trader contact details is an intentional disclosure of (possibly personal) data — record it in the processing inventory alongside the DPIA ([SN-PRV-013](privacy.md#sn-prv-013)) and prefer a business address (MASVS-PRIVACY-1 spirit: minimise what is exposed, and make the exposure deliberate). Credentials for App Store Connect follow the release-secrets inventory ([SN-REL-017](release.md#sn-rel-017)).

#### UX notes
The About screen ([SN-SET-015](settings.md#sn-set-015)) gains a compact publisher block (legal name, address, email) reachable offline, matching the store listing. Copy is plain, not legalese, and links to the full Terms.

#### Test plan
Verification, not automation: a checklist walkthrough comparing the four surfaces (App Store Connect, Play Console, website, in-app About) against the source-of-truth file, executed as part of the release QA checklist ([SN-QA-016](qa.md#sn-qa-016)); a CI check that the About screen's publisher strings come from the shared metadata file and are non-empty in release builds.

#### Dependencies
[SN-IPAD-023](release.md#sn-ipad-023), [SN-PRV-017](privacy.md#sn-prv-017), [SN-REL-010](release.md#sn-rel-010).

#### Definition of done
- [ ] Document + gate merged, CI green (markdown lint, link check, issues-validate)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md cross-links the new page
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GOPS-004

<a id="sn-gops-004"></a>

**Apply the chosen licence: SPDX headers, dependency gate and NOTICE**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, docs, ci-cd |
| Size | M |
| SDLC | release |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | [SN-FND-023](docs.md#sn-fnd-023), [SN-CI-004](ci-cd.md#sn-ci-004), [SN-SET-015](settings.md#sn-set-015) |
| Security controls | `SSDF-PS.2`, `OWASP-A06`, `CWE-1104` |
| Extra labels | needs-decision, sec: supply-chain |

#### Context
[SN-FND-023](docs.md#sn-fnd-023) lands a placeholder `LICENSE` and an SPDX-header *policy*, and explicitly leaves out both the licence choice (maintainer, CLAUDE.md §13) and any CI enforcement. `docs/roadmap.md` M8 makes *"License chosen and a `LICENSE` file present"* a launch exit criterion, the SBOMs ([SN-CI-004](ci-cd.md#sn-ci-004)) carry licence fields that must be true, the in-app About screen ([SN-SET-015](settings.md#sn-set-015)) must show third-party notices, and both stores ask about third-party licences at submission. Nothing currently turns the decision into applied reality: headers, a dependency-licence allow-list, and generated attribution. This issue is the fast-follow that closes the loop once the maintainer picks a licence.

#### Scope
**In:** apply the chosen SPDX identifier to `LICENSE`, every `pubspec.yaml`, package `README`s and the website footer; a lightweight SPDX-header lint (new or changed Dart/Kotlin/Swift/JS source files carry `// SPDX-License-Identifier: <id>`) wired into the existing lint job; a dependency-licence allow/deny list evaluated from the CycloneDX SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)) with a documented exception process (an explicit, reviewed entry per accepted outlier); generation of `NOTICE` / `third_party_licenses.json` as a build artefact consumed by the About screen ([SN-SET-015](settings.md#sn-set-015)) and published on the website; store-submission answers about third-party content.
**Out:** choosing the licence (`needs-decision`, maintainer); the SBOM pipeline itself ([SN-CI-004](ci-cd.md#sn-ci-004)); art/font/icon provenance ([SN-BRD-011](brand.md#sn-brd-011)); template licensing metadata ([SN-TPL-013](templates.md#sn-tpl-013)).

#### Acceptance criteria
- [ ] `LICENSE` contains the chosen licence text and its SPDX id; the placeholder wording from [SN-FND-023](docs.md#sn-fnd-023) is gone and `README.md` / `CONTRIBUTING.md` state the terms.
- [ ] The SPDX-header lint fails a PR that adds a source file without a header, and passes on the existing tree after a one-off sweep.
- [ ] CI fails when a dependency's licence is outside the allow-list (default deny for copyleft licences incompatible with app distribution) unless an approved exception row exists with a reason and a reviewer.
- [ ] A generated attribution artefact lists every bundled dependency, its version and licence text; the About screen renders it offline and the website publishes the same file.
- [ ] The generated attribution is byte-identical to what the release SBOM reports — a CI check compares them.

#### Technical notes
Drive both the gate and the attribution from one source: parse the CycloneDX SBOM produced at release, not a second dependency walk, so they cannot disagree. Native and WASM components that are vendored rather than resolved (PDFium, SQLite, zstd, whisper.cpp, CanvasKit) need explicit rows — see [SN-GOPS-013](security.md#sn-gops-013) for their inventory. Keep the allow-list in `docs/dev/license-policy.md` next to the policy [SN-FND-023](docs.md#sn-fnd-023) wrote.

#### Security & privacy
Supply-chain hygiene (SSDF PS.2, OWASP-A06, CWE-1104 use of unmaintained components): a licence gate is also a dependency-review choke point, and an accurate SBOM licence field is part of release integrity. A wrong attribution is a legal exposure, not a security one, but a *missing* dependency row usually means a component nobody is tracking for CVEs. No user data is involved.

#### UX notes
User-visible only through Settings -> About -> Licences ([SN-SET-015](settings.md#sn-set-015)): a scrollable, searchable list, readable offline, rendered with the design-system list rows and respecting Dynamic Type. The website page mirrors it. No mascot, no marketing language — legal text verbatim.

#### Test plan
Unit: attribution generator against a fixture SBOM (missing licence field, dual licence, vendored component). CI: a PR adding a file without an SPDX header fails; a PR adding an AGPL dependency fails; the same PR with an approved exception row passes. Golden/widget: the About -> Licences screen renders the fixture attribution across looks and at 200% text scaling. Manual: confirm the published website file and the in-app file match the release SBOM.

#### Dependencies
[SN-FND-023](docs.md#sn-fnd-023) (policy + the pending decision), [SN-CI-004](ci-cd.md#sn-ci-004) (SBOM), [SN-SET-015](settings.md#sn-set-015) (About/licences screen).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] The M8 roadmap exit criterion 'License chosen and a LICENSE file present' is evidenced in the gate register


---

### SN-GOPS-012

<a id="sn-gops-012"></a>

**Track store policy changes and annual platform compliance deadlines**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, android-tablet, ios-phone, android-phone |
| Areas | release, privacy, compat |
| Size | S |
| SDLC | maintenance |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-REL-011](release.md#sn-rel-011), [SN-PRV-015](privacy.md#sn-prv-015), [SN-AND-022](ci-cd.md#sn-and-022) |
| Security controls | `SSDF-RV.1`, `OWASP-A09`, `MASVS-CODE-2` |
| Extra labels | agent-ready |

#### Context
Shipping on two stores means recurring, dated obligations that have nothing to do with our own roadmap: Google Play's **annual target API level** deadline (existing apps must target the API level of the previous year by 31 August or lose new-install availability), Apple's periodic **minimum SDK/Xcode** requirement for new submissions, privacy-manifest and Data Safety re-declaration whenever data handling changes ([SN-PRV-014](privacy.md#sn-prv-014), [SN-PRV-015](privacy.md#sn-prv-015)), the EU DSA trader declaration and its re-verification ([SN-GIPAD-015](release.md#sn-gipad-015)), age-rating questionnaire refreshes, subscription and billing policy changes ([SN-BILL-006](billing.md#sn-bill-006), [SN-BILL-007](billing.md#sn-bill-007)), and account/tax form renewals. [SN-GPRF-018](compat.md#sn-gprf-018) runs the *technical* readiness cycle against pre-release OS builds; nothing tracks the *calendar* or watches for policy changes, and the failure mode is silent delisting from new installs.

#### Scope
**In:** `docs/release/compliance-calendar.md` — every recurring obligation with its authority, its typical date, the lead time we need, the issue or workflow that does the work, and the evidence that closes it; a scheduled GitHub Action that opens a tracking issue N weeks before each dated obligation, pre-filled with the checklist and the owning issue links; a written watch routine for policy changes (developer news subscriptions, store console notices, and where the maintainer records a change that affects us); a triage rule mapping "policy changed" to either an existing issue, a new issue, or an explicit no-op with a reason.
**Out:** the technical upgrade work itself ([SN-AND-022](ci-cd.md#sn-and-022) target SDK, [SN-IPAD-027](compat.md#sn-ipad-027) availability gating, [SN-GPRF-018](compat.md#sn-gprf-018) readiness runs); store listings and metadata ([SN-REL-010](release.md#sn-rel-010)); the pre-submission compliance gate per release ([SN-REL-011](release.md#sn-rel-011)); org account renewals ([SN-GOPS-014](release.md#sn-gops-014)).

#### Acceptance criteria
- [ ] The calendar lists every known recurring obligation for both stores with date, lead time, owner, the issue that performs the work, and the evidence artefact.
- [ ] A scheduled workflow opens the tracking issue at the configured lead time and labels it for the current milestone; a closed obligation records its evidence link.
- [ ] The watch routine names the sources monitored and where a change is recorded; a policy change produces a triage decision within a stated window.
- [ ] The annual target-API obligation is traced end to end: calendar row -> tracking issue -> [SN-AND-022](ci-cd.md#sn-and-022) bump -> [SN-GPRF-018](compat.md#sn-gprf-018) readiness run -> submitted build.
- [ ] Missing a deadline is treated as an incident with a recorded cause, not a silent slip.

#### Technical notes
Keep the calendar machine-readable (`compliance-calendar.yaml` with `id`, `authority`, `due`, `lead_weeks`, `owner_issue`, `evidence`) and generate both the Markdown table and the scheduler's input from it, so the scheduler cannot drift from the document. Dates from the stores move; store the *rule* ("Play: 31 August each year, target = previous year's API level") alongside the concrete next date, and have the tracking issue ask the human to confirm the date against the current policy page.

#### Security & privacy
Store compliance is partly a security and privacy control: an app stuck below the annual target API level misses platform hardening defaults, and a stale privacy manifest or Data Safety form is a factual misstatement about data handling — the exact risk [SN-PRV-016](privacy.md#sn-prv-016) gates per release. Treat a policy-change notice about security requirements (for example a new attestation or permission rule) as input to the threat-model revision cycle ([SN-GOPS-003](security.md#sn-gops-003)). The calendar holds no credentials; store-console notices may contain account identifiers and stay out of the repo (CWE-200).

#### UX notes
Maintainer-facing. The generated tracking issue is the surface: title carries the deadline date, body is a short checklist with links, and the label set routes it into the current milestone board.

#### Test plan
Manual: run the scheduler with a near-future fixture date and confirm the tracking issue is created once (idempotently) with the right content; close it with an evidence link and confirm the calendar reflects completion. Validate the YAML against a schema in CI. Table-top: walk the last known Play target-API deadline through the process to confirm the lead time is sufficient for a store review round trip.

#### Dependencies
[SN-REL-011](release.md#sn-rel-011) (pre-submission compliance gate), [SN-PRV-015](privacy.md#sn-prv-015) (store privacy declarations), [SN-AND-022](ci-cd.md#sn-and-022) (Android target SDK configuration).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] The next two dated obligations have tracking issues created by the workflow


---

### SN-GOPS-014

<a id="sn-gops-014"></a>

**Inventory organisational accounts with custody and continuity rules**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, security, devx |
| Size | S |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-REL-017](release.md#sn-rel-017), [SN-CI-014](ci-cd.md#sn-ci-014) |
| Security controls | `SSDF-PO.5`, `MASVS-AUTH-2`, `CWE-522`, `OWASP-A07` |
| Extra labels | needs-credentials |

#### Context
Launch requires a set of organisational accounts that no issue currently owns: Apple Developer Program (with a D-U-N-S number if enrolled as an organisation), Google Play Console, the domain registrar and DNS, website/CDN hosting, the relay host, payment gateways and the entitlement provider ([SN-BILL-004](billing.md#sn-bill-004), [SN-BILL-009](billing.md#sn-bill-009)), the GitHub organisation, the support mailbox ([SN-GOPS-006](docs.md#sn-gops-006)) and the PGP key behind `security.txt` ([SN-SEC-036](security.md#sn-sec-036)). [SN-REL-017](release.md#sn-rel-017) inventories *release secrets* and their rotation and [SN-CI-014](ci-cd.md#sn-ci-014) documents signing-key custody, but nothing records who owns the accounts themselves, what second factor protects them, where the recovery codes live, when they renew, or what happens if the sole maintainer is unreachable when a Critical advisory arrives (`ssdlc-process.md` §3 promises a 48-hour acknowledgement).

#### Scope
**In:** `docs/ops/accounts.md` — a register row per account: purpose, owner, login identity type, second-factor method, where recovery codes are held, renewal/billing date, what breaks if it lapses, and the issue that depends on it; custody rules (two hardware security keys per critical account, recovery codes in a sealed offline store, never in the repo or a chat, never in CI secrets); a provisioning checklist for the accounts not yet created, marked `needs-credentials`; a continuity procedure — a named backup contact, the minimum access that person needs, how they would acknowledge a security report and halt a rollout, and a yearly rehearsal; renewal dates fed into the compliance calendar ([SN-GOPS-012](release.md#sn-gops-012)).
**Out:** secret values of any kind; CI secret inventory and rotation ([SN-REL-017](release.md#sn-rel-017)); signing-key custody mechanics ([SN-CI-014](ci-cd.md#sn-ci-014)); OAuth client registration ([SN-AUTH-020](auth.md#sn-auth-020)); cost of these accounts ([SN-GOPS-008](ci-cd.md#sn-gops-008)).

#### Acceptance criteria
- [ ] Every account required to build, sign, ship, host, charge or support is listed with owner, second factor, recovery-code location and renewal date.
- [ ] No credential, recovery code, seed or account number appears in the register or anywhere else in the repository; a secret-scan run over the file is clean.
- [ ] Every critical account uses phishing-resistant multi-factor authentication with at least two enrolled factors, and the register records that state.
- [ ] The continuity procedure names a backup contact, the scope of their access, and the exact steps to acknowledge a security report and halt a store rollout ([SN-REL-006](release.md#sn-rel-006)) without the primary maintainer.
- [ ] Renewal dates appear in the compliance calendar and produce tracking issues before they lapse.
- [ ] The register is reviewed annually as part of the re-verification cadence ([SN-GOPS-017](security.md#sn-gops-017)).

#### Technical notes
Prefer organisation-owned identities over personal ones wherever a store allows it, and route account email to a role address that the backup contact can also reach — a personal address that dies with the account is the most common single point of failure. Where a provider only supports SMS as a second factor, record it as a known weakness with a mitigation. Keep the register in the repo (it contains no secrets) so it is versioned and reviewed; keep the sealed recovery material physically elsewhere.

#### Security & privacy
Account takeover of a store console is a supply-chain compromise: an attacker can publish a build under our identity even though signing keys are held by Play App Signing or Apple (MASVS-RESILIENCE-2, SSDF PO.5/PS.1). Controls: phishing-resistant MFA, least-privilege console roles, no shared logins, recovery-code custody (CWE-522 insufficiently protected credentials), and the incident path in [SN-SEC-035](security.md#sn-sec-035) if a takeover is suspected — including revoking provenance trust and pulling the affected release. The register itself is an information-disclosure risk only if it names personal contact details: refer to people by role.

#### UX notes
No user-facing UI. Maintainer surface: a single table plus a one-page continuity procedure that a non-expert backup contact could execute under stress — numbered steps, exact console names, no jargon.

#### Test plan
Manual audit: for each row, log in and verify the recorded second factor and role scope; confirm recovery codes exist and are readable from the sealed store. Drill: have the backup contact (with the primary maintainer silent) acknowledge a simulated security report and halt a staged rollout on a sandbox listing; record the elapsed time against the 48-hour SLA. CI: gitleaks/trufflehog over `docs/ops/accounts.md` must be clean.

#### Dependencies
[SN-REL-017](release.md#sn-rel-017) (release secret inventory and rotation), [SN-CI-014](ci-cd.md#sn-ci-014) (signing and key custody).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Continuity drill executed once and its timing recorded against the disclosure SLA


---

### SN-GOPS-016

<a id="sn-gops-016"></a>

**Monitor store reviews and route feature requests into the backlog**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, android-tablet, ios-phone, android-phone, web |
| Areas | release, qa, docs |
| Size | S |
| SDLC | maintenance |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-REL-010](release.md#sn-rel-010), [SN-QA-010](qa.md#sn-qa-010), [SN-GOPS-006](docs.md#sn-gops-006) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-200`, `OWASP-A09` |
| Extra labels | agent-ready |

#### Context
Beta feedback has a home ([SN-REL-007](release.md#sn-rel-007), [SN-QA-015](qa.md#sn-qa-015)) and support will have one ([SN-GOPS-006](docs.md#sn-gops-006)), but after launch the loudest public channel is the store review sections, and the repo's `feature_request.yml` template has no stated triage cadence. Store reviews are simultaneously a bug channel (the only report some users will ever make), a public-relations surface (replies are visible to everyone and, on Play, expected), and a ranking input. Without a routine, a reproducible crash sits in a one-star review for months and a request that contradicts the locked scope (CLAUDE.md §13) gets no honest answer.

#### Scope
**In:** `docs/release/review-and-request-triage.md` — a weekly sweep of App Store and Play reviews, tagging each to an area label and a severity using the [SN-QA-010](qa.md#sn-qa-010) taxonomy; reply templates that never ask a user to send note content, route real defects to support or an issue, and stay factual in public; the criteria that turn a review or a `feature_request.yml` submission into an `SN-` issue (reproducible defect, or a request that fits the vision and an existing epic), into the Backlog milestone, or into a declined-with-reason response citing the locked decisions; a monthly digest that reports themes into the backlog alongside the support digest; a rule that ratings/reviews are never solicited in exchange for features or inside a blocking dialog.
**Out:** the in-app rating prompt design (if any) and the store listings themselves ([SN-REL-010](release.md#sn-rel-010)); support correspondence ([SN-GOPS-006](docs.md#sn-gops-006)); beta feedback ([SN-REL-007](release.md#sn-rel-007)); the bug severity taxonomy ([SN-QA-010](qa.md#sn-qa-010)).

#### Acceptance criteria
- [ ] A weekly sweep is documented with an owner, and each review is tagged to an area and a severity or explicitly marked "no action".
- [ ] Public reply templates exist for the common cases (crash, misunderstanding, feature request, pricing complaint, privacy question) and none of them requests user content or reveals internal detail.
- [ ] A reproducible defect surfaced by a review becomes an `SN-` issue with the reporter's platform/version, never their personal data.
- [ ] Feature requests are answered with one of three recorded outcomes — issue created, backlogged, or declined with a reason linked to the locked decisions — and the response cadence is stated in the issue template.
- [ ] A monthly digest records review themes, rating trend and the actions taken, and is reviewed alongside the support digest.
- [ ] No mechanism solicits ratings in exchange for functionality, and any rating prompt (if introduced) is dismissible and never blocks a task.

#### Technical notes
Pull reviews with the store APIs where available so the sweep is a small script rather than manual console reading, and store only what the digest needs (platform, version, locale, rating, area tag) — not reviewer names. Reuse the label taxonomy from `issues/labels.json` so review tags and backlog areas are the same vocabulary. The digest is a generated Markdown file in `docs/backlog/` like the other reports.

#### Security & privacy
Reviews are public personal data written by identifiable people: do not copy names or review text into the repository (CWE-200, MASVS-PRIVACY-1); issues cite a paraphrase and the store/version only. Public replies must never confirm a vulnerability or describe a workaround for one before a fix ships (coordinated disclosure, `ssdlc-process.md` §3) — a review that describes a security problem is routed to the private advisory path and answered with a neutral acknowledgement. OWASP-A09: the digest is part of how we notice a bad release that the crash-free gate ([SN-REL-012](release.md#sn-rel-012)) did not catch.

#### UX notes
Public reply voice follows the tone guide ([SN-BRD-009](brand.md#sn-brd-009)): short, specific, never defensive, never marketing. If a rating prompt is ever introduced it uses the standard dialog pattern, respects reduce-motion, and is suppressed for users who have hit an error in the last session.

#### Test plan
Manual first cycle: run the sweep on the first week of reviews after launch, produce the digest, and confirm every review received a tag, that at least one defect became an issue with no personal data, and that the reply templates render correctly in both consoles. Script test: the fetcher stores only the allow-listed fields (assert on a fixture response containing reviewer names).

#### Dependencies
[SN-REL-010](release.md#sn-rel-010) (store listings), [SN-QA-010](qa.md#sn-qa-010) (severity taxonomy), [SN-GOPS-006](docs.md#sn-gops-006) (support operation and digest).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] First monthly review digest published and its actions filed


---

### SN-IPAD-023

<a id="sn-ipad-023"></a>

**Reach App Store Connect readiness: nutrition label, export compliance, metadata**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, ios-phone |
| Areas | release, privacy |
| Size | M |
| SDLC | release |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-IPAD-021](privacy.md#sn-ipad-021) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-RESILIENCE-1` |
| Extra labels | needs-credentials, agent-ready |

#### Context
Before submission Sane Notes must satisfy the App Store review gates in docs/platform/ipad.md §9: an accurate privacy nutrition label matching the manifest, encryption export compliance for the non-exempt E2EE crypto, the Sign in with Apple presence requirement (Guideline 4.8) if social login is offered, and iPad multitasking / pointer / keyboard expectations. This assembles the store metadata and compliance declarations for M8 launch.

#### Scope
**In:** App Store Connect privacy nutrition label ("Data Not Collected" except opt-in crash reports) matching [SN-IPAD-021](privacy.md#sn-ipad-021); `ITSAppUsesNonExemptEncryption` + the annual self-classification / French declaration (verify current requirement); confirm Sign in with Apple is present when social login is offered (Guideline 4.8) — the identity area owns the implementation (SN-AUTH Sign in with Apple); store listing metadata, screenshots and multitasking/orientation compliance checklist.
**Out:** the privacy manifest itself ([SN-IPAD-021](privacy.md#sn-ipad-021)); TestFlight pipeline ([SN-IPAD-024](ci-cd.md#sn-ipad-024)); the Sign in with Apple implementation (identity area).

#### Acceptance criteria
- [ ] The App Store Connect nutrition label exactly matches the `PrivacyInfo.xcprivacy` manifest (no discrepancy).
- [ ] `ITSAppUsesNonExemptEncryption` is set and the export-compliance declaration is filed/verified per the current requirement (docs/platform/ipad.md §9).
- [ ] Sign in with Apple presence is verified when any social login is offered (Guideline 4.8); a checklist item links the identity-area implementation.
- [ ] The multitasking/orientation/pointer/keyboard compliance checklist passes (no locked orientation, no opt-out of resizability).
- [ ] Store account, Apple Developer team and signing identities are supplied via maintainer credentials (needs-credentials), never committed.

#### Technical notes
App Store Connect metadata + Info.plist `ITSAppUsesNonExemptEncryption`; reference docs/platform/ipad.md §9 and decision 8. Depends on the manifest ([SN-IPAD-021](privacy.md#sn-ipad-021)). Sign in with Apple is implemented in the identity area (SN-AUTH Sign in with Apple) and only referenced here as a review gate. Maintainer supplies the App Store Connect account + team.

#### Security & privacy
Accurate store privacy declarations reflecting the zero-knowledge reality (MASVS-PRIVACY-3). Export-compliance declaration for the non-exempt AEAD crypto. No secrets committed; signing identities via CI (MASVS-RESILIENCE-1). Baseline: no content/tokens in any submitted artefact or log.

#### UX notes
Store screenshots must reflect the real design across looks (design/Sane Notes.dc.html); the watermarked placeholder Sage art is NOT releasable (CLAUDE.md §9), so screenshots must not embed it. Nutrition label copy matches the in-app privacy dashboard (docs/design/screens-and-flows.md).

#### Test plan
Manual checklist: `docs/platform/ipad.md` §9 release-gate table validated on a release candidate; verify label-vs-manifest parity with a script `tools/scripts/verify_label_matches_manifest.mjs`. No automated store submission.

#### Dependencies
[SN-IPAD-021](privacy.md#sn-ipad-021) privacy manifest; identity-area Sign in with Apple (referenced, not blocking this metadata task).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md §9 kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS (security/release) review

---

### SN-PHN-022

<a id="sn-phn-022"></a>

**Produce phone store screenshots and listing assets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | ios-phone, android-phone |
| Areas | release, brand |
| Size | M |
| SDLC | release |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-020](qa.md#sn-phn-020), [SN-BRD-001](brand.md#sn-brd-001), [SN-REL-001](release.md#sn-rel-001) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-RESILIENCE-4` |
| Extra labels | needs-credentials |

#### Context
The App Store and Play listings need phone-sized screenshots, and phones are the surface where the listing does the most work: a student browsing on a phone decides in seconds. The phone story is different from the tablet story — capture, read, review — so the screenshots must show the phone jobs from docs/platform/phones.md (§4 reading/review, §5 quick capture, §6 finger writing) rather than a shrunken picture of the iPad editor.

The docs do not specify screenshot sizes or a caption script (a gap — recorded here per the instruction to decide sensibly when a doc is silent), so this issue defines them: the device frames come from the Tier-1 phone references in docs/platform/compatibility-matrix.md §2 (iPhone 15-class, mid Android), and the content comes from a scripted, synthetic demo profile generated by the same golden harness as [SN-PHN-020](qa.md#sn-phn-020) so the imagery stays truthful and reproducible. Two release constraints bind hard: the store privacy declarations must reflect the zero-knowledge reality ('Data Not Collected' except opt-in crash reports — docs/platform/ipad.md §privacy nutrition label, docs/platform/android.md §data safety form), and the watermarked placeholder mascot in `design/assets/*.png` is **not releasable**, so any asset embedding it is tagged not-releasable until original Sage art exists (CLAUDE.md §9, §13; roadmap M8 exit criterion).

#### Scope
**In:** the screenshot script (which screens, in which order, with which captions), a reproducible generation pipeline from a synthetic demo profile, the required phone sizes for both stores, localised caption strings for the launch locales, the phone app-preview video storyboard, and the checklist tying the imagery to the truthful privacy declarations.
**Out:** tablet and web listing assets ([SN-IPAD-001](input-gestures.md#sn-ipad-001), [SN-AND-001](compat.md#sn-and-001), [SN-SITE-001](website.md#sn-site-001)), store submission and signing ([SN-REL-001](release.md#sn-rel-001)), the mascot artwork itself ([SN-BRD-001](brand.md#sn-brd-001)), and pricing/billing copy ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] A six-shot phone script exists and is implemented: (1) Capture hub — one thumb tap to a note, (2) finger writing on a page, (3) reading mode with the OCR text layer selected, (4) audio-first lecture capture with 'Ink replays in sync', (5) Search with 'handwriting is searched on-device', (6) the look grid showing several of the 17 looks.
- [ ] Screenshots are generated by a **scripted** run against a synthetic demo profile — no hand-composed mockups, no real user data — and regenerating them is one documented command.
- [ ] Sizes cover the current App Store phone requirement (6.9-inch and 6.5-inch classes) and the Play requirement (phone screenshots at the current minimum/maximum dimensions), with the exact values **verified against the store consoles at submission time** and recorded in the PR.
- [ ] Captions use the ux-principles.md §5 voice and reuse canonical lines where they exist ('Study smarter.', 'Tap any word you wrote to hear what was being said.', 'Handwriting recognition runs on your device.') with no exclamation marks.
- [ ] Captions are localised for the launch locales (English first, then Hindi per locked decision 10) and survive +40% expansion without clipping.
- [ ] Every claim visible in an asset is true of the shipped build — no unreleased feature, no fabricated metric, no inflated content.
- [ ] Assets contain **no real personal data**: the demo profile's names, email, phone number and note content are synthetic, and the India-locale line 'chai a week' is marked locale-specific rather than a global default.
- [ ] Any asset embedding `design/assets/*.png` placeholder mascot art is tagged **not-releasable** and blocked from submission until original Sage art lands ([SN-BRD-001](brand.md#sn-brd-001)).
- [ ] Dark-mode variants exist for at least two shots, demonstrating that every look has a night version and that PDFs keep their original colours.
- [ ] The asset set is checked in with a manifest listing each file, its size, its locale, its source command and its releasable/not-releasable status.

#### Technical notes
Generate through `tools/scripts/store_screenshots.dart` driving the app in a test harness at store device resolutions, reusing the deterministic fixtures, bundled font and frozen clock from the golden harness in [SN-PHN-020](qa.md#sn-phn-020) so output is byte-stable. Store outputs under `design/store/phone/<store>/<locale>/` with the manifest alongside. Do not composite marketing frames in a binary design tool — keep the pipeline reproducible from the repo. The demo profile is a fixture notebook set built through the app's own import path, containing only synthetic content. Cross-check the declared privacy labels while producing the assets: an asset showing a feature that would imply data collection (for example a cloud AI answer) must either not appear or must show the data-leaves-device indicator, so the imagery and the declarations agree (docs/platform/ipad.md §9, docs/platform/android.md §store).

#### Security & privacy
Threats and controls: **T-PII-IN-ASSETS** — a screenshot taken from a developer's real device leaks real names, emails, phone numbers or note content into a public listing and into the repository forever. Control: assets are generated only from the synthetic demo profile, and a check asserts no asset is produced outside the scripted pipeline (MASVS-PRIVACY-2, CWE-359, CWE-200). **T-MISLEADING-DECLARATION** — imagery implying capabilities inconsistent with the 'no data collected' declaration would make the store privacy labels inaccurate. Control: the label cross-check in the acceptance criteria, signed off with the release checklist (MASVS-PRIVACY-3, roadmap M7 store-readiness). **T-SECRETS-IN-BUILD** — a demo build containing store or OAuth credentials. Control: all credentials come from CI secrets, never committed, and the demo build uses the dev flavour with no production secrets (CLAUDE.md §7.2; MASVS-RESILIENCE-4, CWE-798). **T-BYPASS-WATERMARK** — a dev build with `SANE_AUTH_BYPASS` shows a persistent 'AUTH BYPASS — dev build' watermark specifically so a bypassed build can never be mistaken for production in screenshots (PRD-AUTH-013); the generation pipeline MUST fail if that watermark is present in an asset.

#### UX notes
The imagery is drawn from the real screens in docs/design/screens-and-flows.md — Library (§6), Editor (§7), Search (§11), Settings → Appearance look grid (§12) — rendered in the compact phone layout. Pick looks that photograph well across the families (Paper for warm, Minimalism for clean, Pop for bold, Cyberpunk for a dark-mode shot) so the '17 looks' claim is visible rather than asserted. Copy must stay in the brand voice: plain, warm, specific, sentences not labels, limits explained honestly. Accessibility of the listing itself matters: caption text in the asset must meet contrast >= 4.5:1 against its background, and the store accessibility declarations (Apple Accessibility Nutrition Labels, Play pre-launch accessibility report — PRD-CO-339) must be substantiated by the M7 audit before any accessibility claim appears in an asset.

#### Test plan
- `tools/scripts/test/store_screenshots_test.dart` — the generator produces the expected file set, sizes and manifest entries deterministically.
- `app/test/release/asset_no_pii_test.dart` — the demo fixture contains no real-looking PII patterns (email, phone, name allow-list) — regression test.
- `app/test/release/asset_watermark_test.dart` — generation fails if the auth-bypass watermark is present (negative test).
- Manual: submit the asset set to the store consoles' validators in a draft listing and record the accepted sizes in the PR; visual review of caption expansion in Hindi.

#### Dependencies
[SN-PHN-020](qa.md#sn-phn-020), [SN-BRD-001](brand.md#sn-brd-001), [SN-REL-001](release.md#sn-rel-001)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Asset manifest committed with releasable/not-releasable status per file
- [ ] Store privacy declarations cross-checked against the imagery
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Maintainer has supplied App Store Connect and Play Console access (store accounts) — CI secrets, never committed (CLAUDE.md §13)

---

### SN-REL-001

<a id="sn-rel-001"></a>

**Establish release engineering: versioning, pipelines, store submission and rollback**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | epic |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, ci-cd |
| Size | XL |
| SDLC | release |
| Parent | — |
| Depends on | [SN-CI-001](ci-cd.md#sn-ci-001), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `SSDF-PS.2`, `SSDF-PS.3`, `MASVS-RESILIENCE-2`, `MASVS-CODE-2`, `MASVS-PRIVACY-1`, `OWASP-A08`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
Sane Notes ships five surfaces (iPad, Android tablet, Web/PWA, iPhone, Android phone) from one Flutter monorepo, and every one of them has to leave CI as a signed, reproducible, store-compliant artifact with an audit trail. `docs/security/ssdlc-process.md` §2.5 makes Release its own SSDLC phase with a hard gate (signing, SBOM, SLSA provenance, notarization, accurate store privacy declarations, release notes crediting reporters), and `docs/security/devsecops-pipeline.md` §2.6-§2.7 and §5 define the pipeline jobs and the secrets/environment policy that back it. `docs/roadmap.md` M8 lists the launch exit criteria this epic owns end to end: signed + notarized artifacts, SBOM + provenance, staged rollout, accurate store labels, original mascot art shipped (watermarked placeholders are a hard release blocker per CLAUDE.md §9), and a chosen licence. This epic is the release *system* — versioning, the tag-driven pipeline, fastlane, store tracks and staged rollout, the web deploy/rollback path, store listings and screenshots, review-guideline compliance, release health gates, the checklist, and the hotfix runbook. It deliberately does **not** re-own the signing mechanics ([SN-CI-014](ci-cd.md#sn-ci-014), [SN-CI-022](ci-cd.md#sn-ci-022), [SN-CI-023](ci-cd.md#sn-ci-023)), the SBOM/provenance job ([SN-CI-004](ci-cd.md#sn-ci-004)), or the privacy-declaration content ([SN-PRV-014](privacy.md#sn-prv-014), [SN-PRV-015](privacy.md#sn-prv-015)) — it consumes and enforces them.

#### Scope
**In:** version + build-number policy; changelog and release notes; `release.yml` release train; fastlane lanes; TestFlight/Play tracks, staged rollout and halt; web atomic deploy + rollback; store listings, metadata and screenshots; Apple/Play review-compliance gate; crash-free release-health gate; release checklist and go/no-go; hotfix + rollback runbook; release-blocker gate; in-app What's new/About; release-secret inventory and rotation.
**Out:** code signing and notarization mechanics ([SN-CI-014](ci-cd.md#sn-ci-014)/[SN-CI-022](ci-cd.md#sn-ci-022)/[SN-CI-023](ci-cd.md#sn-ci-023)); SBOM + SLSA provenance ([SN-CI-004](ci-cd.md#sn-ci-004)); MobSF/ZAP verification jobs ([SN-CI-013](ci-cd.md#sn-ci-013)/[SN-CI-012](ci-cd.md#sn-ci-012)); privacy manifest and store privacy-label *content* ([SN-PRV-014](privacy.md#sn-prv-014)/[SN-PRV-015](privacy.md#sn-prv-015)); marketing website ([SN-SITE-001](website.md#sn-site-001)); billing/store products ([SN-BILL-001](billing.md#sn-bill-001)).

#### Acceptance criteria
- [ ] [SN-REL-002](release.md#sn-rel-002) Version scheme and build-number policy across all five surfaces
- [ ] [SN-REL-003](release.md#sn-rel-003) CHANGELOG and store release notes from Conventional Commits
- [ ] [SN-REL-004](release.md#sn-rel-004) Tag-driven release train workflow (`release.yml`)
- [ ] [SN-REL-005](release.md#sn-rel-005) fastlane lanes for iOS and Android
- [ ] [SN-REL-006](release.md#sn-rel-006) Play track promotion and staged rollout with automated halt
- [ ] [SN-REL-007](release.md#sn-rel-007) Beta program: TestFlight groups, Play tracks and feedback intake
- [ ] [SN-REL-008](release.md#sn-rel-008) Atomic web deploys with instant rollback and safe service-worker updates
- [ ] [SN-REL-009](release.md#sn-rel-009) Automated store screenshots across devices, locales and looks
- [ ] [SN-REL-010](release.md#sn-rel-010) Store listings and metadata as code
- [ ] [SN-REL-011](release.md#sn-rel-011) Pre-submission store review compliance gate
- [ ] [SN-REL-012](release.md#sn-rel-012) Crash-free session and release-health rollout gate
- [ ] [SN-REL-013](release.md#sn-rel-013) Release checklist and go/no-go runbook
- [ ] [SN-REL-014](release.md#sn-rel-014) Hotfix and rollback process across stores and web
- [ ] [SN-REL-015](release.md#sn-rel-015) Release-blocker gate for placeholder art, licence and debug flags
- [ ] [SN-REL-016](release.md#sn-rel-016) In-app What's new sheet and update prompts
- [ ] [SN-REL-017](release.md#sn-rel-017) Release-secret inventory and rotation runbook
- [ ] A tagged commit produces signed, SBOM-bearing artifacts for all five surfaces with zero manual steps beyond the gated environment approval.
- [ ] Any release can be halted (stores) or rolled back (web) inside the runbook's time targets.

#### Technical notes
Workflows live in `.github/workflows/` beside `devsecops.yml` and `scorecard.yml`; the new `release.yml` is `environment: release` gated with required reviewers (`docs/security/devsecops-pipeline.md` §5). fastlane configs live under `app/ios/fastlane/` and `app/android/fastlane/`; runbooks and the secret inventory under `docs/release/`. Build inputs come from the flavour matrix in `docs/architecture/overview.md` §7 (`SANE_FLAVOR`, `SANE_ENV`, `SANE_LOG_LEVEL`, prod OAuth client IDs from CI secrets) established by [SN-FND-005](devx.md#sn-fnd-005). Platform release gates: `docs/platform/ipad.md` §9 (privacy manifest, required-reason APIs, Sign in with Apple 4.8, encryption export compliance, multitasking), `docs/platform/android.md` §9 (Data Safety, target SDK 36, 16 KB page alignment, App Bundle, minimal permissions, foreground-service types), `docs/platform/web.md` §8 (HTTPS, isolated origin with COOP/COEP, CSP/Trusted Types/SRI, installability, durability UX, WCAG 2.2 AA). Relevant ADRs: [ADR-0002](docs/adr/0002-monorepo-layout.md) (repo layout and changelog placement), [ADR-0010](docs/adr/0010-web-pwa-strategy.md) (web deploy shape), [ADR-0011](docs/adr/0011-telemetry-and-diagnostics.md) (opt-in crash reporting constrains release-health metrics), [ADR-0012](docs/adr/0012-native-plugin-strategy.md) (plugin artifacts that must be signed/aligned). PRD anchors: `PRD-AUTH-001` (Sign in with Apple presence), `PRD-AUTH-011/012` (auth bypass impossible in release, CI must fail on a bypass string in a release artifact), `PRD-BILL-007/010/017` (store pricing, multiplatform linking rules, honest disclosure), `PRD-TEL-001/002` (opt-in, content-free telemetry), `PRD-CO-410` (marketing claims the listings must match).

#### Security & privacy
Threats: a tampered or unsigned artifact reaching users (STRIDE-Tampering; MASVS-RESILIENCE-2, CWE-347); a debug/bypass build shipping to a store (TM-E-01, MASVS-AUTH-1, CWE-489, `PRD-AUTH-011/012`); leaked signing or store credentials from CI logs or artifacts (OWASP-A08, CWE-798, CWE-532); a vulnerable release that cannot be halted (availability + unpatched-vulnerability exposure, `ssdlc-process.md` §3 SLA); inaccurate store privacy declarations (MASVS-PRIVACY-1/2, GDPR/DPDP misrepresentation); dependency/supply-chain drift between what was scanned and what shipped (MASVS-CODE-2, OWASP-A06). Controls: gated `release` environment with human approval, signed tags, signing delegated to [SN-CI-014](ci-cd.md#sn-ci-014), SBOM + provenance from [SN-CI-004](ci-cd.md#sn-ci-004), the compliance gate [SN-REL-011](release.md#sn-rel-011), the blocker gate [SN-REL-015](release.md#sn-rel-015), secret inventory + rotation [SN-REL-017](release.md#sn-rel-017), halt/rollback [SN-REL-014](release.md#sn-rel-014). Baseline everywhere: no secrets in repo or artifacts, no note content or PII in release logs, no new network egress without an ADR.

#### UX notes
Most of this epic is developer-facing, but three user-visible surfaces exist and must follow the design system (`docs/design/design-system.md`, `docs/design/tokens.json`): the **What's new** sheet and **Settings -> About** rows ([SN-REL-016](release.md#sn-rel-016)) on the Settings screen described in `docs/design/screens-and-flows.md` §12, the store listing and screenshot artwork ([SN-REL-009](release.md#sn-rel-009), [SN-REL-010](release.md#sn-rel-010)) which must render the real product in the design's looks, and the web 'Update available' affordance ([SN-REL-008](release.md#sn-rel-008)). All three must work in **all 17 looks plus dark mode**, keep 44 pt / 48 dp targets, carry `Semantics` labels, meet 4.5:1 contrast, and be keyboard reachable on web.

#### Test plan
Each child carries its own tests. Epic-level verification: a full rehearsal release from a `v0.0.0-rc` tag producing signed artifacts for iOS, Android and web; `app/test/security/auth_bypass_test.dart` and the [SN-REL-015](release.md#sn-rel-015) blocker gate proven to fail a deliberately broken build; a rollback drill on web and a halt drill on Play recorded in `docs/release/hotfix-runbook.md`; `node scripts/validate-issues.mjs` green for this backlog area.

#### Dependencies
[SN-CI-001](ci-cd.md#sn-ci-001) (pipeline), [SN-FND-005](devx.md#sn-fnd-005) (flavours). Children depend further on [SN-CI-004](ci-cd.md#sn-ci-004), [SN-CI-014](ci-cd.md#sn-ci-014), [SN-CI-022](ci-cd.md#sn-ci-022), [SN-CI-023](ci-cd.md#sn-ci-023), [SN-PRV-015](privacy.md#sn-prv-015), [SN-TEL-001](telemetry.md#sn-tel-001), [SN-WEB-017](ci-cd.md#sn-web-017), [SN-IPAD-024](ci-cd.md#sn-ipad-024), [SN-AND-026](release.md#sn-and-026).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-002

<a id="sn-rel-002"></a>

**Define the version scheme and build-number policy for all five surfaces**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | release, ci-cd |
| Size | S |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `SSDF-PS.2`, `MASVS-CODE-2`, `CWE-1104` |
| Extra labels | agent-ready, good first issue |

#### Context
Every later release step - store upload, crash triage, rollback, SBOM correlation, the supported-versions policy in `SECURITY.md` ('only the latest released minor version per platform receives security fixes') - needs one unambiguous answer to 'which build is this?'. Today the monorepo has no version policy at all: `docs/architecture/overview.md` §7 defines the flavour matrix but not the version string, and [ADR-0002](docs/adr/0002-monorepo-layout.md) leaves package versioning to the workspace tool. Apple and Google both reject a build whose build number is not strictly greater than the previous one, and `versionCode` is a 32-bit integer capped at 2100000000, so the derivation rule has to be decided before the first TestFlight upload rather than after a rejection. This task fixes the scheme and gives CI a check that fails the moment the git tag, the app version and the generated platform metadata disagree. It lands in M0 so every commit from the first day is releasable and attributable.

#### Scope
**In:** the semver policy for the app; the monotonic build-number derivation; per-platform mapping (iOS `CFBundleShortVersionString`/`CFBundleVersion`, Android `versionName`/`versionCode`, web `version.json`); the `SANE_BUILD_ID` dart-define carrying version + short commit SHA + flavour; a `tools/scripts/version.dart` helper with a `--check` mode wired into CI; independent versioning rules for `packages/*` and `plugins/*`; the git tag format.
**Out:** changelog generation ([SN-REL-003](release.md#sn-rel-003)); the release workflow that consumes this ([SN-REL-004](release.md#sn-rel-004)); the About/What's new UI that displays it ([SN-REL-016](release.md#sn-rel-016)); `.sanenote` file-format versioning (owned by [SN-CORE-005](storage.md#sn-core-005)).

#### Acceptance criteria
- [ ] The app version is semver `MAJOR.MINOR.PATCH` declared once in `app/pubspec.yaml`; no other file hardcodes it.
- [ ] The build number is a strictly increasing integer derived from the CI run (`BASE_OFFSET + github.run_number`), identical across iOS/Android/web for one release, and never reused; a local build gets build number `0` and cannot be uploaded.
- [ ] `versionCode` stays below 2100000000 and is asserted to be greater than the last published value recorded in `docs/release/published-builds.json`.
- [ ] Beta builds carry a `-beta.N` prerelease suffix in `versionName`/`CFBundleShortVersionString`; dev builds carry `-dev`; release builds carry no suffix.
- [ ] Git tags are `v<MAJOR>.<MINOR>.<PATCH>` (annotated, signed per [SN-CI-003](ci-cd.md#sn-ci-003)); the tag must equal the pubspec version or `version.dart --check` exits non-zero.
- [ ] `SANE_BUILD_ID` resolves to `<version>+<build>.<shortSha>.<flavour>` and is readable at runtime through a single accessor in `sane_core` (no `dynamic`, explicit return type, dartdoc'd).
- [ ] `packages/*` and `plugins/*` version independently (path-based deps in the workspace); no package version is coupled to the app version.
- [ ] The CI check runs in under 5 s and prints the mismatch it found, not a stack trace.

#### Technical notes
Add `tools/scripts/version.dart` (pure Dart, no Flutter import, so it runs in the analyze job); expose `--print`, `--check`, `--platform-metadata`. iOS values are written into `app/ios/Flutter/Generated.xcconfig`-adjacent overrides by Flutter's `--build-name`/`--build-number`; Android reads the same two flags (`flutter build appbundle --build-name=1.2.3 --build-number=1042`), so the script's job is to *compute* them and assert consistency, not to hand-edit `Info.plist` or `build.gradle`. For web, emit `web/version.json` (`{version, build, sha, builtAt}`) which [SN-REL-008](release.md#sn-rel-008) uses as the update-check and cache-bust key. Pass the identity into the app as `--dart-define=SANE_BUILD_ID=...` alongside the existing `SANE_FLAVOR`/`SANE_ENV` defines from `docs/architecture/overview.md` §7.1; the accessor belongs in `sane_core` (pure Dart) so `sane_ui` and `app/` can both read it without a sideways import (CLAUDE.md §3 DAG). Record every published build in `docs/release/published-builds.json` so the monotonicity check has a source of truth that survives CI runner resets. No PRD requirement covers version strings; the docs are silent, so this issue *decides* the scheme and documents it in `docs/release/versioning.md`.

#### Security & privacy
Threats: a shipped artifact that cannot be tied back to a commit, defeating incident scoping ('which versions are affected?' in `docs/security/ssdlc-process.md` §4 step 3) and SBOM/provenance correlation ([SN-CI-004](ci-cd.md#sn-ci-004), SSDF PS.2); a downgrade or duplicate build number letting an older, vulnerable binary pose as current (CWE-1104 unmaintained/ambiguous component version, MASVS-CODE-2); leaking more than needed in the build id. Controls: build id contains only version, build number, 7-char commit SHA and flavour - **no** branch names, runner identifiers, paths or usernames; the build id is safe to show in the About row and to attach to an opt-in crash report already scrubbed per `PRD-TEL-002`; it is never used as a device or user identifier (MASVS-PRIVACY-3 - no new stable identifier). Monotonicity is enforced in CI, not trusted from the developer.

#### UX notes
Surface-level only: the computed version string appears in **Settings -> About** ([SN-REL-016](release.md#sn-rel-016)) on the Settings screen (`docs/design/screens-and-flows.md` §12) and in store listings. It must be selectable/copyable for support, rendered with the body type token from `docs/design/tokens.json` so it reads correctly in all 17 looks and dark mode, carry a `Semantics` label ('Version 1.2.3, build 1042'), and never be the only way to identify a build. No new screen.

#### Test plan
`tools/test/version_test.dart`: semver parsing, suffix rules per flavour, monotonicity assertion against a fixture `published-builds.json`, the 2100000000 ceiling, and a tag/pubspec mismatch producing exit code 1 with a readable message. `app/test/core/build_id_test.dart`: the accessor returns the dart-define value and a safe default when unset, and contains no path/branch data (regex assertion). CI: the `lint-dart` job (per `docs/security/devsecops-pipeline.md` §2.1) calls `dart run tools/scripts/version.dart --check`. Manual: build the app for iOS, Android and web from one tag and confirm all three report the same build number.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold), [SN-FND-005](devx.md#sn-fnd-005) (flavours and the dart-define matrix).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-003

<a id="sn-rel-003"></a>

**Generate the changelog and store release notes from Conventional Commits**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | release, docs |
| Size | S |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-REL-002](release.md#sn-rel-002), [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | `SSDF-PS.2`, `MASVS-PRIVACY-1`, `CWE-200` |
| Extra labels | agent-ready, good first issue |

#### Context
`docs/security/ssdlc-process.md` §2.5 makes release notes a gate item: they must 'credit any reporters (per SECURITY.md) and list security-relevant changes'. CLAUDE.md §5 already mandates Conventional Commits scoped to an issue key (`feat(sane_ink): add pressure curve editor (SN-INK-012)`), which means the changelog can be generated rather than hand-maintained and drift-prone. Two different artifacts are needed from the same source: an engineering `CHANGELOG.md` (complete, links issues and commits) and the **store release notes** shown to users on App Store 'What's New' and Play 'What's new in this release', which must be short, human, localisable, and must not leak internal issue keys, contributor emails, infrastructure hostnames or unreleased security detail. This issue builds that split and wires it into CI so the release train ([SN-REL-004](release.md#sn-rel-004)) can consume both.

#### Scope
**In:** a `cliff.toml` (git-cliff) configuration matching the repo's commit convention; grouped sections (Features / Fixes / Security / Performance / Docs / Internal); `CHANGELOG.md` generation on tag; a curated `docs/release/release-notes/<version>/<locale>.txt` set copied into the fastlane metadata directories; a commit-message lint in CI; the redaction rules for public notes; the reporter-credit block for security fixes.
**Out:** the workflow that publishes them ([SN-REL-004](release.md#sn-rel-004), [SN-REL-005](release.md#sn-rel-005)); the listing metadata as a whole ([SN-REL-010](release.md#sn-rel-010)); translation of the notes ([SN-I18N-001](i18n.md#sn-i18n-001) supplies the locale process); the in-app What's new rendering ([SN-REL-016](release.md#sn-rel-016)).

#### Acceptance criteria
- [ ] `dart run tools/scripts/changelog.dart --version 1.2.0` (or the git-cliff invocation it wraps) regenerates `CHANGELOG.md` deterministically - running it twice produces a byte-identical file.
- [ ] Commits are grouped by Conventional Commit type and scope; each entry links its `SN-<AREA>-<NNN>` key and the commit SHA.
- [ ] A `Security` section is emitted for any commit typed `sec`/`fix` carrying a `Security:` trailer, and renders a `Reported by <name>` line when a `Reported-by:` trailer is present, omitting it when the reporter declined (per `SECURITY.md`).
- [ ] Public store notes respect each store's limit (Apple What's New 4000 characters; Play per-language release notes 500 characters - the generator fails the build rather than truncating mid-sentence), and contain no `SN-` keys, no commit SHAs, no URLs outside `sanenotes` public domains, and no email addresses - enforced by an automated redaction check that fails the build.
- [ ] A release with no user-visible change produces notes that say so honestly rather than inventing content.
- [ ] CI fails a PR whose commit subject does not parse as a Conventional Commit or lacks an issue key, with a message naming the offending commit.
- [ ] `en` notes always exist; a missing locale falls back to `en` explicitly rather than shipping an empty string.

#### Technical notes
Use **git-cliff** (single pinned binary, no Node/Ruby runtime needed in the lint job) driven by `cliff.toml` at the repo root; wrap it in `tools/scripts/changelog.dart` so agents have one entry point and the redaction check lives in Dart with unit tests. Commit parsing must accept the scopes used by the repo (`sane_ink`, `sane_core`, `app`, `ci`, `docs`, ...) and the type map from CLAUDE.md §5 (`feat`, `fix`, `chore`, `docs`, `sec`, `infra`, `test`, `spike`, `design`). Store-note files land in `app/ios/fastlane/metadata/<locale>/release_notes.txt` and `app/android/fastlane/metadata/android/<locale>/changelogs/<versionCode>.txt` - the Android filename is the `versionCode` computed by [SN-REL-002](release.md#sn-rel-002), so the two scripts share that helper. Release notes are also bundled into the app as `assets/release_notes/<locale>.json` for [SN-REL-016](release.md#sn-rel-016) so the What's new sheet needs **no network call** (CLAUDE.md §7 rule 4: no new egress without an ADR). The changelog is referenced from the GitHub Release body created by [SN-REL-004](release.md#sn-rel-004) alongside the SBOM/provenance attachments from [SN-CI-004](ci-cd.md#sn-ci-004).

#### Security & privacy
Threats: information disclosure through release notes (CWE-200) - internal hostnames, staging URLs, contributor emails, or the details of an embargoed vulnerability before the fix is broadly installed (`docs/security/ssdlc-process.md` §3 coordinated disclosure); crediting a reporter who asked not to be named (privacy, MASVS-PRIVACY-1); a generated file becoming an injection vector into store metadata (control characters, markup) - strip to plain text and validate length/charset before writing. Controls: the redaction check runs before any upload and is unit-tested with hostile fixtures; security entries state the class of issue and the fixed version, never a reproduction path; the `Reported-by:` trailer is opt-in by the reporter; only the maintainer (CODEOWNERS on `/docs/security/`) may edit the Security section by hand. Baseline: no secrets, no note content, no PII in generated output.

#### UX notes
Public notes follow the product voice from `docs/design/screens-and-flows.md` §16 and the marketing copy anchor in `PRD-CO-410` - plain, student-first, no marketing inflation, no emoji spam. Line length and tone must survive the small App Store 'What's New' sheet and the Play listing. The same text feeds the in-app What's new sheet ([SN-REL-016](release.md#sn-rel-016)), which renders it in all 17 looks and dark mode, so keep it markup-free (plain paragraphs and `- ` bullets only) and translatable. Empty/error state: if a locale file is missing the release proceeds with `en` and logs a warning in the CI summary rather than blocking.

#### Test plan
`tools/test/changelog_test.dart`: grouping, deterministic output, the trailer handling, and the redaction rules (fixtures containing an `SN-` key, an email, a staging URL, a control character, and a 5000-character body - each must fail). `tools/test/commit_lint_test.dart`: accepted and rejected commit subjects. CI: a job on `pull_request` running the commit lint; a job on tag running generation and asserting the working tree changes only `CHANGELOG.md` and the notes files. Manual: generate notes for a fake `v0.1.0` tag and paste them into App Store Connect and Play Console drafts to confirm the length and formatting survive.

#### Dependencies
[SN-REL-002](release.md#sn-rel-002) (version + `versionCode` for the Android changelog filename), [SN-FND-003](ci-cd.md#sn-fnd-003) (CI workflow to host the jobs).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-004

<a id="sn-rel-004"></a>

**Build the tag-driven release train workflow (release.yml)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, ci-cd |
| Size | L |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-REL-002](release.md#sn-rel-002), [SN-REL-003](release.md#sn-rel-003), [SN-CI-014](ci-cd.md#sn-ci-014), [SN-CI-004](ci-cd.md#sn-ci-004), [SN-CI-015](ci-cd.md#sn-ci-015), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `SSDF-PS.2`, `SSDF-PS.3`, `SSDF-PO.5`, `MASVS-RESILIENCE-2`, `MASVS-AUTH-1`, `OWASP-A08`, `CWE-489`, `CWE-347` |
| Extra labels | agent-ready, needs-credentials |

#### Context
`docs/security/devsecops-pipeline.md` §2.7 names `release.yml` as the missing workflow that turns a signed tag into signed, notarized, SBOM-bearing artifacts, and §5 requires it to be **environment-gated** so 'a tag push cannot ship without human approval'. `docs/security/ssdlc-process.md` §2.5 lists the exit gate it must satisfy: all artifacts signed, notarization succeeded where applicable, CycloneDX + SPDX SBOMs attached, provenance present, store privacy declarations accurate, release notes complete. Today none of this is automated - the repo has only `devsecops.yml` and `scorecard.yml`. This issue builds the orchestration: preflight checks, a three-target build matrix (iOS/iPadOS IPA, Android AAB, web bundle) on a pinned toolchain, hand-off to the signing and SBOM jobs, and upload to the beta channels. It is the spine the other release children plug into, and it needs maintainer-supplied store credentials, so it is `needs-credentials`.

#### Scope
**In:** `.github/workflows/release.yml` - triggers (`push` on `v*` tags plus `workflow_dispatch` with a version input), the `release` environment gate, preflight validation, the build matrix, artifact retention, invocation of [SN-CI-022](ci-cd.md#sn-ci-022)/[SN-CI-023](ci-cd.md#sn-ci-023) signing, [SN-CI-004](ci-cd.md#sn-ci-004) SBOM/provenance, [SN-CI-013](ci-cd.md#sn-ci-013) MobSF on the RC, [SN-REL-011](release.md#sn-rel-011) compliance gate and [SN-REL-015](release.md#sn-rel-015) blocker gate, upload to TestFlight and the Play internal track via [SN-REL-005](release.md#sn-rel-005), web staging deploy via [SN-REL-008](release.md#sn-rel-008), and the GitHub Release with notes from [SN-REL-003](release.md#sn-rel-003).
**Out:** the signing/notarization mechanics themselves; SBOM generation; production rollout promotion ([SN-REL-006](release.md#sn-rel-006)); the human checklist ([SN-REL-013](release.md#sn-rel-013)); hotfix branching ([SN-REL-014](release.md#sn-rel-014)).

#### Acceptance criteria
- [ ] Pushing an annotated, signed `v*` tag starts the workflow; it pauses at the `release` environment until a required reviewer approves, and no artifact leaves CI before that approval.
- [ ] Preflight fails fast (under 3 minutes) when any of these hold: the tag is unsigned; the tag does not match `app/pubspec.yaml` ([SN-REL-002](release.md#sn-rel-002)); the build number is not greater than the last published one; `CHANGELOG.md`/release notes for the version are missing; [SN-REL-015](release.md#sn-rel-015) blockers are present; [SN-REL-011](release.md#sn-rel-011) compliance items fail; the working tree is dirty.
- [ ] The build matrix produces exactly three artifact groups from one commit: `Runner.ipa` (iOS/iPadOS, `--obfuscate --split-debug-info`), `app-release.aab` (Android, per-ABI splits, 16 KB aligned per [SN-AND-021](compat.md#sn-and-021)), and the web bundle (`--wasm`, emitting both WASM and JS per `docs/platform/web.md` §2).
- [ ] A release-mode artifact scan proves `SANE_AUTH_BYPASS` and the dev watermark string are absent from compiled defines and the string table (`PRD-AUTH-012`), failing the release if found.
- [ ] Debug symbols (`--split-debug-info` output, Android mapping file) are uploaded as private CI artifacts, never attached to the public GitHub Release.
- [ ] The GitHub Release contains: release notes, CycloneDX + SPDX SBOMs and the provenance attestation from [SN-CI-004](ci-cd.md#sn-ci-004), and artifact checksums - and is created only after every upload succeeded.
- [ ] A failed run leaves no partial store upload; re-running the same tag is idempotent (already-uploaded build numbers are detected and skipped, not duplicated).
- [ ] Total wall-clock from approval to store-ready artifacts is under 60 minutes on the standard runners; the run summary lists each gate and its verdict.
- [ ] No secret value appears in any log line (masked), in the run summary, or inside an artifact.

#### Technical notes
Structure the workflow as `preflight -> build (matrix: ios, android, web) -> sign -> verify (MobSF/compliance) -> publish`, with a `concurrency` group keyed on the tag ref and `cancel-in-progress: false` (never cancel a half-published release). Top-level `permissions: contents: read`; escalate per job (`id-token: write` for provenance/OIDC, `contents: write` only on the publish job) per `docs/security/devsecops-pipeline.md` §0 and [SN-CI-009](ci-cd.md#sn-ci-009). Pin every action to a full commit SHA ([SN-CI-005](ci-cd.md#sn-ci-005)) and the Flutter/Xcode/Gradle/NDK toolchain per [SN-CI-015](ci-cd.md#sn-ci-015). macOS runner for the iOS build and notarization; Ubuntu for Android and web. Build inputs come from the flavour matrix (`docs/architecture/overview.md` §7.1): `SANE_FLAVOR=release`, `SANE_ENV=prod`, `SANE_LOG_LEVEL=warn`, `SANE_TELEMETRY_DEFAULT=false`, `SANE_AI_CLOUD_ENABLED=false`, prod OAuth client IDs from CI secrets ([SN-REL-017](release.md#sn-rel-017)). Uploads run through the fastlane lanes from [SN-REL-005](release.md#sn-rel-005) so the same commands work locally for a maintainer dry run. Record the published build in `docs/release/published-builds.json` (the monotonicity ledger from [SN-REL-002](release.md#sn-rel-002)) via a commit from the publish job. Reference [ADR-0001](docs/adr/0001-flutter-single-codebase.md) for why one commit builds all five surfaces and [ADR-0010](docs/adr/0010-web-pwa-strategy.md) for the web target shape.

#### Security & privacy
Threats: shipping an artifact that was never scanned or signed (SSDF PS.2, MASVS-RESILIENCE-2); a debug/auth-bypass build reaching a store (CWE-489, MASVS-AUTH-1, `PRD-AUTH-011/012`, TM-E-01); credential exfiltration through workflow logs or a malicious PR-triggered run (OWASP-A08, CWE-532) - mitigated by tag-only triggers, never building untrusted PR code under release credentials, passing inputs via `env:` and never inlining them into `run:` (`devsecops-pipeline.md` §0 principle 2); symbol/mapping-file disclosure aiding reverse engineering (MASVS-RESILIENCE-2, `docs/platform/ipad.md` L5, `docs/platform/android.md` L6); provenance tampering (CWE-347) - artifacts are attested by [SN-CI-004](ci-cd.md#sn-ci-004) and the tag is signature-verified in preflight. Controls: gated `release` environment with required reviewers, least-privilege `GITHUB_TOKEN`, SHA-pinned actions, OIDC over static credentials where the provider supports it, masked secrets, and the two blocking gates ([SN-REL-011](release.md#sn-rel-011), [SN-REL-015](release.md#sn-rel-015)). Privacy baseline: release logs carry no user data (there is none in CI) and no PII from contributors beyond the commit metadata already public.

#### UX notes
Developer-facing. The run summary is the UI: a table of gates with pass/fail and the reason, artifact names with sizes and checksums, and the store links once uploaded - so a maintainer on a phone can see why a release stopped. The environment-approval prompt must name the version and list the gates already passed. No end-user surface; the user-visible effect is an authentic, store-verified install. None beyond baseline (no logging of content, tokens only).

#### Test plan
Dry runs on a `v0.0.1-rc.N` tag with sandbox credentials: (1) happy path to TestFlight + Play internal + web staging; (2) each preflight failure injected in turn (unsigned tag, version mismatch, missing notes, blocker present, compliance fail) asserting a fast, readable failure; (3) a re-run of the same tag proving idempotence; (4) a forced mid-run failure proving no partial upload. `.github/workflows/release.yml` must pass `actionlint` ([SN-CI-010](ci-cd.md#sn-ci-010)). Add `tools/test/release_preflight_test.dart` for the Dart-side preflight helpers. Record each drill in the PR per CLAUDE.md §5.

#### Dependencies
[SN-REL-002](release.md#sn-rel-002), [SN-REL-003](release.md#sn-rel-003), [SN-CI-014](ci-cd.md#sn-ci-014) (signing umbrella), [SN-CI-004](ci-cd.md#sn-ci-004) (SBOM/provenance), [SN-CI-015](ci-cd.md#sn-ci-015) (pinned toolchain), [SN-FND-005](devx.md#sn-fnd-005) (flavours); consumes [SN-REL-005](release.md#sn-rel-005), [SN-REL-011](release.md#sn-rel-011), [SN-REL-015](release.md#sn-rel-015). Needs maintainer store credentials ([SN-REL-017](release.md#sn-rel-017)).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-005

<a id="sn-rel-005"></a>

**Introduce fastlane lanes for iOS and Android release automation**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, ios-phone, android-tablet, android-phone |
| Areas | release, ci-cd |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-004](release.md#sn-rel-004) |
| Depends on | [SN-REL-004](release.md#sn-rel-004), [SN-CI-022](ci-cd.md#sn-ci-022), [SN-CI-023](ci-cd.md#sn-ci-023), [SN-REL-003](release.md#sn-rel-003) |
| Security controls | `SSDF-PS.2`, `MASVS-RESILIENCE-2`, `OWASP-A08`, `CWE-798`, `CWE-532` |
| Extra labels | agent-ready, needs-credentials |

#### Context
The release train ([SN-REL-004](release.md#sn-rel-004)) needs a stable, scriptable interface to App Store Connect and Google Play that also works on a maintainer's machine for a dry run - otherwise every store interaction becomes a hand-clicked step that cannot be reviewed, tested or repeated during an incident. fastlane is the de-facto layer for this and is what `docs/security/devsecops-pipeline.md` §2.7 implicitly assumes when it talks about uploading signed builds, mapping files and notarized artifacts. This issue adds the two fastlane projects, their pinned Ruby dependencies, and the lanes the pipeline and the runbooks call: `beta`, `release`, `screenshots`, `metadata` and `hotfix`. Credential *handling* stays with [SN-CI-022](ci-cd.md#sn-ci-022)/[SN-CI-023](ci-cd.md#sn-ci-023) and [SN-REL-017](release.md#sn-rel-017); fastlane only consumes what CI injects, which keeps the blast radius small and the lanes runnable in a sandbox.

#### Scope
**In:** `app/ios/fastlane/` and `app/android/fastlane/` (Fastfile, Appfile, Pluginfile, Gemfile + Gemfile.lock); the lane set and their parameters; TestFlight upload with notes from [SN-REL-003](release.md#sn-rel-003); Play `supply` upload to the internal track with the mapping file and native debug symbols; `deliver`/`supply` metadata sync ([SN-REL-010](release.md#sn-rel-010)); a `--verify_only` mode for dry runs; documentation in `docs/release/fastlane.md`.
**Out:** certificate/profile provisioning and notarization ([SN-CI-023](ci-cd.md#sn-ci-023)), keystore and Play App Signing setup ([SN-CI-022](ci-cd.md#sn-ci-022)), staged rollout percentages and halting ([SN-REL-006](release.md#sn-rel-006)), screenshot capture itself ([SN-REL-009](release.md#sn-rel-009)), listing copy ([SN-REL-010](release.md#sn-rel-010)).

#### Acceptance criteria
- [ ] `bundle exec fastlane ios beta` uploads a signed IPA to TestFlight with the release notes for the current version and exits non-zero on any App Store Connect error, printing the API error body (secrets masked).
- [ ] `bundle exec fastlane android beta` uploads the AAB to the Play **internal** track with `mapping.txt` and native debug symbols attached, so Play can deobfuscate crashes for [SN-REL-012](release.md#sn-rel-012).
- [ ] `bundle exec fastlane <platform> release` performs the same upload against the production-bound track/build but does **not** submit for review or start a rollout - promotion is an explicit, separate action ([SN-REL-006](release.md#sn-rel-006), [SN-REL-013](release.md#sn-rel-013)).
- [ ] Every lane accepts `version` and `build` parameters and refuses to run if they disagree with [SN-REL-002](release.md#sn-rel-002)'s computed values.
- [ ] All credentials are read from environment variables injected by CI (App Store Connect API key content, issuer id, key id, Play service-account JSON); the lanes fail with a clear message if one is missing and **never** read from a file committed to the repo.
- [ ] `Gemfile.lock` pins fastlane and all transitive gems; CI installs with `bundle install --deployment` so a gem cannot float between runs.
- [ ] Lane output contains no secret material; a deliberate test with a fake key asserts the masking.
- [ ] The same lanes run locally against sandbox credentials, documented step by step in `docs/release/fastlane.md`.

#### Technical notes
Use the App Store Connect **API key** (`app_store_connect_api_key` with `key_content` from a base64 CI secret, `in_house: false`) rather than an Apple ID + app-specific password, so no human account is embedded in CI and 2FA never blocks a release. Signing material comes from [SN-CI-023](ci-cd.md#sn-ci-023); the Fastfile must not call `match` against a credential repo that this project does not have - it consumes the profile/certificate already installed in the runner keychain by that issue, and fails loudly if the keychain entry is absent. Android uses `supply` with `json_key_data` from a CI secret, `aab: true`, `mapping_paths`, and `skip_upload_screenshots: true` for the `beta` lane (screenshots sync only in the `metadata` lane). Keep lanes thin: parameter validation, one action, explicit error handling; put shared logic in `fastlane/lib/sane_release.rb` with plain Ruby so it is reviewable. The Flutter build itself stays in the workflow ([SN-REL-004](release.md#sn-rel-004)) - fastlane must not shell out to `flutter build`, so a build is never produced twice with different inputs. Reference `docs/platform/ipad.md` §9 and `docs/platform/android.md` §9 for what the upload must carry (privacy manifest present in the IPA, AAB with per-ABI splits). Ruby toolchain version is pinned in `.ruby-version`; CI caches `vendor/bundle` keyed on `Gemfile.lock`.

#### Security & privacy
Threats: hardcoded store credentials in a Fastfile or a committed JSON key (CWE-798, OWASP-A08) - prevented by env-only reads plus gitleaks/trufflehog ([SN-CI-006](ci-cd.md#sn-ci-006)) and a unit check that the fastlane directories contain no `.p8`, `.json` key, `.keystore` or `.mobileprovision` file; credential leakage through verbose lane logs (CWE-532) - fastlane's `--verbose` is disallowed in CI and sensitive env vars are registered with the masking helper; a compromised gem in the dependency tree reaching signing material (supply chain, MASVS-CODE-2, OWASP-A06) - mitigated by `Gemfile.lock` pinning, `bundle install --deployment`, OSV-Scanner coverage ([SN-CI-001](ci-cd.md#sn-ci-001)) and running the lanes only inside the gated `release` environment; unsigned or wrong-flavour artifacts being uploaded (MASVS-RESILIENCE-2) - the lanes verify the artifact's code signature and the `SANE_FLAVOR=release` marker before upload. Baseline: no note content anywhere near this path, tokens only, nothing persisted to the runner after the job.

#### UX notes
Developer/release-manager surface only. Lane names and parameters are the UX: they must be guessable (`ios beta`, `android release`), print a one-line summary of what they will do before doing it, and fail with an actionable message ('Missing APP_STORE_CONNECT_KEY_CONTENT - see docs/release/secrets-inventory.md') rather than a Ruby stack trace. Document the local dry-run path so a maintainer can rehearse before a launch. None beyond baseline (no logging of content, tokens only).

#### Test plan
CI job `fastlane-lint`: `bundle exec fastlane lint`/`rubocop` on the Fastfiles plus a script asserting no credential-shaped file exists under `app/*/fastlane/`. Sandbox runs: TestFlight upload to an internal-only group and a Play internal-track upload of a throwaway build, each verified in the respective console. Negative tests: missing env var, mismatched version/build, unsigned artifact, and a fake secret to confirm masking - each must fail the lane with the expected message. Record the dry-run output (secrets redacted) in the PR.

#### Dependencies
[SN-REL-004](release.md#sn-rel-004) (the workflow that calls these lanes), [SN-CI-022](ci-cd.md#sn-ci-022) (Play App Signing/upload key), [SN-CI-023](ci-cd.md#sn-ci-023) (Apple signing and notarization), [SN-REL-003](release.md#sn-rel-003) (release-note files the lanes upload). Needs maintainer store credentials ([SN-REL-017](release.md#sn-rel-017)).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-006

<a id="sn-rel-006"></a>

**Implement Play track promotion and staged rollout with automated halt**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | android-tablet, android-phone |
| Areas | release, ci-cd |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-004](release.md#sn-rel-004) |
| Depends on | [SN-REL-005](release.md#sn-rel-005), [SN-REL-012](release.md#sn-rel-012), [SN-AND-026](release.md#sn-and-026), [SN-AND-022](ci-cd.md#sn-and-022) |
| Security controls | `SSDF-PS.2`, `SSDF-RV.2`, `MASVS-RESILIENCE-2`, `OWASP-A08` |
| Extra labels | agent-ready, needs-credentials |

#### Context
A bad Android release reaches millions of installs in hours unless it is rolled out in stages and can be halted. `docs/security/devsecops-pipeline.md` §6 step 3 makes this an explicit incident-response control ('Affected release -> halt/roll back rollout (App Store/Play staged release; pull the build if needed)'), and `docs/security/ssdlc-process.md` §2.5 makes staged rollout part of the release gate. `docs/platform/android.md` §9 additionally requires the App Bundle format, target SDK 36, a current Data Safety declaration and 16 KB-aligned native code before anything reaches production. This issue implements the Play side of the release train: the track ladder (internal -> closed -> open -> production), the rollout percentage ladder with a minimum soak between steps, the automated halt driven by the release-health gate ([SN-REL-012](release.md#sn-rel-012)), and the record of rollout state so a human always knows where a version stands.

#### Scope
**In:** a `tools/scripts/rollout.dart` + fastlane `promote`/`halt` lanes wrapping Play's `supply`; the track ladder and percentage ladder; soak-time and health preconditions per step; automated halt; in-app-update priority; recording rollout state in the release issue and `docs/release/published-builds.json`; the Play-side portion of `docs/release/release-checklist.md` ([SN-REL-013](release.md#sn-rel-013)).
**Out:** App Store phased release (covered by [SN-REL-014](release.md#sn-rel-014)'s runbook and the Apple lane in [SN-REL-005](release.md#sn-rel-005)); the crash-free metric itself ([SN-REL-012](release.md#sn-rel-012)); Data Safety content ([SN-AND-026](release.md#sn-and-026), [SN-PRV-015](privacy.md#sn-prv-015)); beta tester recruitment ([SN-REL-007](release.md#sn-rel-007)).

#### Acceptance criteria
- [ ] `fastlane android promote track:production rollout:0.05` moves the already-uploaded build and sets the rollout fraction; it refuses when the target track already has a higher rollout of a newer build.
- [ ] The ladder is 1% -> 5% -> 20% -> 50% -> 100%, with a minimum soak of 24 hours **and** a minimum sample (configurable, default 1000 sessions at that step) before the next step is allowed.
- [ ] Promotion to production is refused unless: the release-health gate from [SN-REL-012](release.md#sn-rel-012) is green, the Data Safety form is current ([SN-AND-026](release.md#sn-and-026)), the compliance gate [SN-REL-011](release.md#sn-rel-011) passed for this build, and the build is an AAB targeting SDK 36 with 16 KB-aligned native libraries ([SN-AND-021](compat.md#sn-and-021)).
- [ ] `fastlane android halt` sets the production rollout to 0 for the current build and completes in under 15 minutes end to end; the runbook documents the manual Play Console equivalent as a fallback.
- [ ] Halting is idempotent and safe to run twice; it never deletes the artifact or the release notes.
- [ ] Every promotion and halt appends an entry (version, build, track, fraction, actor, timestamp, reason) to `docs/release/published-builds.json` and comments on the release tracking issue.
- [ ] In-app update priority is set per release (0-5; default 0, raised to 4+ only for a security hotfix) and is consumed by [SN-REL-016](release.md#sn-rel-016)'s flexible update prompt - never an immediate/blocking update, because note-taking must keep working offline.
- [ ] A dry-run mode prints the exact Play API calls without performing them.

#### Technical notes
Use `supply` (`upload_to_play_store`) with `track`, `rollout`, `skip_upload_aab: true` for pure promotions, and `release_status: 'inProgress'`; halting is `rollout: '0'` on the in-progress release (verify against the current Play Developer API behaviour before relying on it in an incident - mark the verification step in the runbook). The track ladder maps to Play's internal (up to 100 testers, instant), closed (named tester list), open (public beta) and production tracks; [SN-REL-007](release.md#sn-rel-007) owns who is in each. Soak and sample thresholds live in `tools/release/rollout_policy.yaml` so changing policy is a reviewable diff, not a code change. The health precondition calls the check exposed by [SN-REL-012](release.md#sn-rel-012), which reads Play's Android vitals (user-perceived crash rate and ANR rate) - these are OS-reported and do not depend on the app's opt-in telemetry ([ADR-0011](docs/adr/0011-telemetry-and-diagnostics.md)), which is exactly why the gate can exist without breaking the privacy promise. Android build configuration (minSdk 29, target 36, ABI splits, AAB) comes from [SN-AND-022](ci-cd.md#sn-and-022). Where the docs are silent on exact percentages and soak times, this issue **decides** the ladder above and records it in `docs/release/release-checklist.md`.

#### Security & privacy
Threats: a vulnerable build continuing to roll out after a Critical report, breaching the containment step of `docs/security/ssdlc-process.md` §4 and the §3 SLA (SSDF RV.2); an unauthorised promotion (a compromised CI token pushing to production) - mitigated by running promotion only from the gated `release` environment with the narrow Play service-account permissions from [SN-REL-017](release.md#sn-rel-017) and by requiring a human approval for the 100% step (OWASP-A08); an artifact reaching production that skipped the compliance/blocker gates (MASVS-RESILIENCE-2); rollout metadata leaking user data - the state file records only version/track/fraction/actor, never any user identifier (MASVS-PRIVACY-3). Controls: least-privilege service account (release-manager role scoped to this app only), audit trail in the ledger and the release issue, idempotent halt, documented manual fallback for the case where CI itself is compromised or unavailable.

#### UX notes
No end-user UI. The one user-visible coupling is the in-app update priority, which drives the **flexible** (non-blocking) update prompt in [SN-REL-016](release.md#sn-rel-016) - it must never interrupt writing or block an offline session, matching the local-first promise in CLAUDE.md §1. Release-manager surface: the CI summary shows the current ladder step, the soak clock, the health verdict and the next allowed action; the halt command is documented as a single copy-pasteable line at the top of `docs/release/hotfix-runbook.md` so it is usable under pressure. None beyond baseline.

#### Test plan
`tools/test/rollout_policy_test.dart`: ladder ordering, soak/sample enforcement, refusal when health is red or a gate is unmet, idempotent halt, and the ledger entry shape. Sandbox: promote a throwaway build through internal -> closed on a test Play listing and halt it, capturing timings for the runbook. Negative tests: promote with a stale Data Safety flag, promote with a red health verdict, promote a non-AAB artifact, double-halt - all must fail or no-op cleanly. Drill: a timed halt rehearsal recorded in `docs/release/hotfix-runbook.md` ([SN-REL-014](release.md#sn-rel-014)).

#### Dependencies
[SN-REL-005](release.md#sn-rel-005) (fastlane/supply), [SN-REL-012](release.md#sn-rel-012) (release-health verdict), [SN-AND-026](release.md#sn-and-026) (Play readiness/Data Safety), [SN-AND-022](ci-cd.md#sn-and-022) (Android build config). Needs the Play service account ([SN-REL-017](release.md#sn-rel-017)).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-007

<a id="sn-rel-007"></a>

**Define the beta program: TestFlight groups, Play tracks and feedback intake**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, ios-phone, android-tablet, android-phone, web |
| Areas | release, qa |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-IPAD-024](ci-cd.md#sn-ipad-024), [SN-REL-006](release.md#sn-rel-006), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `MASVS-AUTH-1`, `CWE-489`, `CWE-532` |
| Extra labels | agent-ready, needs-credentials |

#### Context
M7 ('Beta Hardening & Security Audit', `docs/roadmap.md`) requires real users on real devices before launch: the perf soak, the accessibility audit and the compatibility matrix all need field coverage that the CI device lab cannot provide. The distribution plumbing exists per platform ([SN-IPAD-024](ci-cd.md#sn-ipad-024) TestFlight, [SN-REL-006](release.md#sn-rel-006) Play tracks), but nothing defines *who* tests, *what* they get, *how* feedback comes back, and how that feedback stays compatible with the product's privacy promise - a beta tester's crash report or screenshot can contain note content, which the app is otherwise architected never to transmit (CLAUDE.md §7 rule 1, `PRD-TEL-001/002`). This issue defines the program and builds the intake path so beta feedback is useful *and* cannot become a privacy incident.

#### Scope
**In:** cohort definition (internal, device-lab, external student cohort, accessibility cohort) and their entry criteria; the beta build configuration (`SANE_FLAVOR=beta` per `docs/architecture/overview.md` §7); TestFlight group and Play closed/open track mapping; the tester-facing notice and what data the program collects; the feedback intake path (TestFlight feedback, a GitHub issue form, an in-app 'Send feedback' that attaches only a redacted diagnostics bundle with explicit consent); triage SLA and routing; beta exit criteria and build expiry.
**Out:** the TestFlight pipeline itself ([SN-IPAD-024](ci-cd.md#sn-ipad-024)); Play track mechanics ([SN-REL-006](release.md#sn-rel-006)); the telemetry/consent framework ([SN-TEL-001](telemetry.md#sn-tel-001), [SN-PRV-009](privacy.md#sn-prv-009)); web canary deploys ([SN-REL-008](release.md#sn-rel-008)).

#### Acceptance criteria
- [ ] `docs/release/beta-program.md` defines four cohorts with entry criteria, size targets, device/OS coverage mapped to `docs/platform/compatibility-matrix.md` tiers, and the exit criteria that end a beta cycle.
- [ ] A beta build is unambiguously identifiable in-app: the About row shows `<version>+<build> (beta)` ([SN-REL-002](release.md#sn-rel-002)), and the beta channel is never confusable with production in a screenshot.
- [ ] Beta builds are release-mode with obfuscation on, telemetry still opt-in and off by default, and `SANE_AUTH_BYPASS` provably absent - the same [SN-REL-015](release.md#sn-rel-015) blocker gate runs for beta uploads.
- [ ] A tester can join, install and submit feedback without creating a Sane Notes account (guest mode stays first-class, `PRD-AUTH-007/008`).
- [ ] The in-app 'Send feedback' path attaches **only** the redacted diagnostics bundle defined by [ADR-0011](docs/adr/0011-telemetry-and-diagnostics.md) - version/build, device model, OS, locale, last N redacted log lines - and shows the exact payload for review before sending; it never attaches note content, ink, titles, file paths, tokens or recovery codes.
- [ ] Testers are shown a plain-language notice before joining stating that beta data handling is identical to production (no extra collection) and what a feedback submission includes.
- [ ] Feedback is triaged within 3 working days into an `SN-*` issue or an explicit 'no action' reply; security-looking reports are routed to the private advisory path in `SECURITY.md`, never a public issue.
- [ ] Every beta build expires: TestFlight's 90-day limit is respected and the program documents what a tester sees when a build expires.

#### Technical notes
Beta builds come from the same `release.yml` matrix ([SN-REL-004](release.md#sn-rel-004)) with `SANE_FLAVOR=beta`, `SANE_ENV=staging`, `SANE_LOG_LEVEL=info` (`docs/architecture/overview.md` §7) - same signing, same gates, staging entitlement/relay endpoints. TestFlight groups: `internal` (maintainer + device lab, App Store Connect internal testers), `students` (external, public link), `a11y` (external, screen-reader users for the [SN-A11Y-001](a11y.md#sn-a11y-001) audit). Play mirrors them: internal track for the first two, a closed track for `students`, open track only if the program needs volume. The in-app feedback composer lives in `app/lib/feedback/` and reuses the redaction allow-list from the `SaneLog` facade in `sane_core` (CLAUDE.md §6) rather than inventing a second redactor; it posts via the OS share sheet / mail composer by default so the app itself opens **no new network egress** (CLAUDE.md §7 rule 4 - a direct upload endpoint would need an ADR and a threat-model row). A GitHub issue form (`.github/ISSUE_TEMPLATE/beta-feedback.yml`) captures device, OS, build id, steps and expected/actual. Cohort recruitment (students first, per the persona in CLAUDE.md §1) is a maintainer activity; the credentials to manage the groups are store-account bound, hence `needs-credentials`.

#### Security & privacy
Threats: a tester's feedback attachment exfiltrating note content or PII (LINDDUN-Disclosure, MASVS-PRIVACY-1/2, CWE-532) - controlled by show-before-send, the shared redaction allow-list, and the absence of any silent upload path; a beta build shipping a dev capability (auth bypass, dev watermark, verbose logs) to external testers (CWE-489, MASVS-AUTH-1, `PRD-AUTH-011/012`) - controlled by running the same release gates for beta; tester identity linkage (emails held by the store, plus any list we keep) creating an unnecessary personal-data store (MASVS-PRIVACY-3, GDPR/DPDP minimisation) - the program keeps **no** tester list outside the store consoles and states the retention in the notice; a security report arriving in a public channel (coordinated-disclosure breach, `docs/security/ssdlc-process.md` §3) - the issue form and the beta notice both point security reports to the private advisory path. Controls also include staging-only endpoints for beta, so a beta defect cannot corrupt production entitlement or relay state.

#### UX notes
Three user-visible pieces, all in the design system (`docs/design/design-system.md`, `docs/design/tokens.json`): the join notice (plain language, student-readable, matching the voice in `docs/design/screens-and-flows.md` §16), the **Settings -> About -> Send feedback** row (Settings screen §12) and the feedback composer sheet showing the exact payload with a 'What we send' disclosure, a Copy button, and Cancel/Send. All must render in **all 17 looks and dark mode**, keep 44 pt / 48 dp targets, expose `Semantics` labels for every control, meet 4.5:1 contrast, and be keyboard operable on web. States: empty (nothing to report yet), sending, sent (2.4 s toast per the design's toast spec), offline (queue locally, never silently drop; explain that nothing has been sent yet), error (retry with the payload preserved).

#### Test plan
`app/test/feedback/redaction_test.dart`: a diagnostics bundle built from a fixture containing note text, a title, a token, a file path and ink coordinates must contain none of them (assert by regex and by exact-substring search). `app/test/feedback/composer_widget_test.dart`: the payload preview matches what is sent; Cancel sends nothing. `app/integration_test/beta_feedback_test.dart`: end-to-end from Settings to the share sheet on iOS and Android. Golden tests for the composer across looks and light/dark. Manual: join each cohort on a real device, install, submit feedback, confirm the triage routing and that a security-worded report surfaces the private-advisory guidance.

#### Dependencies
[SN-IPAD-024](ci-cd.md#sn-ipad-024) (TestFlight pipeline), [SN-REL-006](release.md#sn-rel-006) (Play tracks), [SN-FND-005](devx.md#sn-fnd-005) (beta flavour). Related: [SN-TEL-001](telemetry.md#sn-tel-001), [SN-A11Y-001](a11y.md#sn-a11y-001), [SN-PERF-004](perf.md#sn-perf-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-008

<a id="sn-rel-008"></a>

**Implement atomic web deploys with instant rollback and safe worker updates**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | release, ci-cd |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-004](release.md#sn-rel-004) |
| Depends on | [SN-WEB-017](ci-cd.md#sn-web-017), [SN-WEB-011](compat.md#sn-web-011), [SN-WEB-014](security.md#sn-web-014), [SN-WEB-015](security.md#sn-web-015), [SN-REL-002](release.md#sn-rel-002) |
| Security controls | `ASVS-V14`, `OWASP-A05`, `OWASP-A08`, `MASVS-STORAGE-1`, `CWE-1188`, `CWE-345` |
| Extra labels | agent-ready |

#### Context
The web build is the one surface with no store review between us and the user, which makes both mistakes and fixes instantaneous - so the deploy has to be atomic and the rollback has to be a single, rehearsed action. `docs/platform/web.md` §8 sets the web release gates (HTTPS everywhere, own origin with COOP/COEP, strict CSP/Trusted Types/SRI, valid manifest + registered service worker with an offline fallback, durability UX, WCAG 2.2 AA), and §4 warns that browser storage is evictable and must never hold the only copy of a note. Two web-specific hazards make a naive deploy dangerous: a service worker that activates mid-session can swap the app out from under an in-progress stroke, and a rollback can leave a client whose local OPFS/IndexedDB schema is *newer* than the code it is now running - a straight path to data corruption. This issue builds the deploy/rollback machinery and the guards for both hazards, on top of the hosting/CDN provisioned by [SN-WEB-017](ci-cd.md#sn-web-017).

#### Scope
**In:** immutable, versioned asset publication; the atomic pointer flip that makes a build live; one-command rollback; service-worker update policy and the 'Update available' handshake; a local-schema-newer-than-code guard; a post-deploy smoke check that verifies security headers, installability and the ink budget entry point; retention of previous builds; the deploy portion of `docs/release/release-checklist.md`.
**Out:** hosting/CDN provisioning and edge header configuration ([SN-WEB-017](ci-cd.md#sn-web-017)); the service worker's caching strategy itself ([SN-WEB-011](compat.md#sn-web-011)); CSP/Trusted Types/COOP/COEP definitions ([SN-WEB-014](security.md#sn-web-014), [SN-WEB-015](security.md#sn-web-015), [SN-WEB-016](security.md#sn-web-016)); the marketing site ([SN-SITE-001](website.md#sn-site-001)); the in-app update UI ([SN-REL-016](release.md#sn-rel-016)).

#### Acceptance criteria
- [ ] Each build publishes to an immutable path `/b/<buildId>/` with content-hashed filenames; `index.html`, `flutter_service_worker.js` and `version.json` are served with `no-cache`, hashed assets with `max-age=31536000, immutable`.
- [ ] Going live is a **single atomic switch** (alias/edge-config update); at no point does a client receive a mix of old and new assets.
- [ ] `tools/scripts/web_deploy.dart --rollback <buildId>` repoints to a previous build in under 5 minutes with no rebuild, and the last 10 builds (minimum 30 days) stay fetchable so an open session never 404s mid-flight.
- [ ] The service worker never activates over a live session unprompted: a new version installs, waits, and the app shows the 'Update available - reload' affordance ([SN-REL-016](release.md#sn-rel-016)); `skipWaiting` is used only when the user accepts, or when no unsaved editor state exists.
- [ ] If the local persisted schema version is newer than the running code supports (a rollback), the app opens **read-only** with an explicit explanation and an export action, and performs no migration or write - verified by an automated test, because the failure mode is data loss.
- [ ] A post-deploy smoke check (headless Chromium) asserts: HTTPS, `Cross-Origin-Opener-Policy`/`Cross-Origin-Embedder-Policy` present and `self.crossOriginIsolated === true`, the CSP header matches the expected nonce-based policy, SRI attributes intact, manifest + service worker registered, offline fallback renders, and the app boots to the Library shell - any failure auto-rolls back.
- [ ] Deploys are gated on the same `release` environment approval as store uploads ([SN-REL-004](release.md#sn-rel-004)), and the deploy credential is short-lived/OIDC where the host supports it.
- [ ] Every deploy and rollback appends to `docs/release/published-builds.json` with build id, actor, timestamp and reason.

#### Technical notes
`tools/scripts/web_deploy.dart` wraps the host CLI chosen in [SN-WEB-017](ci-cd.md#sn-web-017); keep the host-specific calls in one adapter class so swapping providers is a small diff. Input is the `flutter build web --wasm` output (both WASM and JS bundles ship per `docs/platform/web.md` §2 - iOS browsers always get CanvasKit). `version.json` from [SN-REL-002](release.md#sn-rel-002) is the update-check source: the app polls it on resume (not on a timer during inking - never touch the network on the draw path, CLAUDE.md §8) and compares `buildId`. The schema guard reads the drift/OPFS schema version written by [SN-WEB-008](storage.md#sn-web-008); the read-only mode reuses the existing failure surface rather than inventing a new screen. Because browser storage is evictable and can be the only copy of a note (`docs/platform/web.md` §4, R6), the read-only path must offer export and must not clear storage. Header verification in the smoke check uses the expected values from [SN-WEB-014](security.md#sn-web-014)/[SN-WEB-015](security.md#sn-web-015) so the two cannot drift. Deploy retention must outlive the longest realistic open session (a tab left open for days) - hence 30 days minimum.

#### Security & privacy
Threats: a deploy that silently drops COOP/COEP/CSP/SRI, downgrading the app's XSS and cross-origin-isolation posture (OWASP-A05 security misconfiguration, ASVS V14, `docs/platform/web.md` §9) - caught by the post-deploy smoke check with auto-rollback; a partially-served deploy producing a broken or exploitable mixed state (CWE-345 insufficient verification of data authenticity) - prevented by immutable paths plus the atomic switch; **local data loss or corruption** when a rolled-back client meets a newer local schema (MASVS-STORAGE-1, CWE-1188 insecure default initialisation) - prevented by the fail-closed read-only guard, which is the p0-grade control in this issue; a stolen deploy token overwriting the live app (OWASP-A08, CWE-798) - mitigated by OIDC/short-lived credentials, the gated environment, and the inventory in [SN-REL-017](release.md#sn-rel-017). Privacy: the deploy pipeline never touches user data (there is none on our servers - the zero-knowledge posture in CLAUDE.md §2), and the smoke check runs against a synthetic guest session only.

#### UX notes
Two user-visible states, both themed from `docs/design/tokens.json` and rendered in **all 17 looks plus dark mode**: the **'Update available - Reload'** affordance (a non-blocking bar or toast consistent with the design's toast spec in `docs/design/screens-and-flows.md` §1, 44 pt targets, `Semantics` label, keyboard focusable and dismissible with Escape - it must never steal focus mid-stroke), and the **read-only rollback notice** ('This browser has newer notes than this version of the app. Your notes are safe - export them or reload later.') with an Export action and no destructive option. Offline state: the service worker's offline fallback must still render the Library shell. Loading state during reload must not flash an unstyled page. All copy is student-plain per the product voice.

#### Test plan
`tools/test/web_deploy_test.dart`: path immutability, pointer-flip ordering, rollback selection, retention pruning, and the ledger entry. `app/test/web/schema_guard_test.dart`: a persisted schema newer than the code opens read-only and performs zero writes (assert with a spy store) - plus the inverse (older schema migrates normally). Playwright/headless-Chromium smoke suite in `tools/web_smoke/`: headers, cross-origin isolation, manifest, service-worker registration, offline fallback, boot. Widget/golden tests for the update bar and read-only notice across looks and light/dark. Manual drill: deploy build N, open a session, deploy N+1, confirm the open session is untouched until the user accepts; then roll back and confirm the read-only guard and the 5-minute target.

#### Dependencies
[SN-WEB-017](ci-cd.md#sn-web-017) (hosting/CDN + edge headers), [SN-WEB-011](compat.md#sn-web-011) (service worker), [SN-WEB-014](security.md#sn-web-014)/[SN-WEB-015](security.md#sn-web-015) (CSP/COOP-COEP definitions), [SN-REL-002](release.md#sn-rel-002) (build id/version.json), [SN-WEB-008](storage.md#sn-web-008) (local schema version).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-009

<a id="sn-rel-009"></a>

**Automate store screenshots across devices, locales and looks**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, ios-phone, android-tablet, android-phone, web |
| Areas | release, qa, design-system |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-010](release.md#sn-rel-010) |
| Depends on | [SN-QA-006](qa.md#sn-qa-006), [SN-DS-002](design-system.md#sn-ds-002), [SN-REL-005](release.md#sn-rel-005), [SN-QA-005](qa.md#sn-qa-005) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `CWE-200` |
| Extra labels | agent-ready, innovation |

#### Context
Apple and Google require screenshots at several exact pixel sizes, per locale, and reject listings whose screenshots misrepresent the app. Doing this by hand for five surfaces, two or more locales and a product whose entire visual identity is **17 looks plus dark mode** (CLAUDE.md §9) is a guaranteed source of stale, inconsistent, or accidentally privacy-leaking assets - a hand-captured screenshot of a real device can contain real notes. Because the app already has an `integration_test` harness ([SN-QA-006](qa.md#sn-qa-006)) and a golden-test system that renders every look ([SN-QA-005](qa.md#sn-qa-005), [SN-DS-002](design-system.md#sn-ds-002)), screenshots can be generated deterministically from a seeded demo workspace instead. That also makes the listing artwork a regression test: if a screen changes, the diff is visible before submission. This is a differentiator worth doing properly - most competitors' store art drifts years behind their UI.

#### Scope
**In:** `app/integration_test/store_screenshots_test.dart` driving the capture; the seeded demo workspace (deterministic content, fixed clock, no network); the screen list and the look/locale matrix; fastlane `snapshot` (iOS) and `screengrab` (Android) wiring plus a headless web capture; output into the fastlane metadata directories; a diff review step; documentation in `docs/release/screenshots.md`.
**Out:** listing copy and upload ([SN-REL-010](release.md#sn-rel-010)); device frames/marketing composites beyond plain screenshots (optional, marked out of scope for v1); the golden-test harness itself ([SN-QA-005](qa.md#sn-qa-005)); brand art ([SN-BRD-001](brand.md#sn-brd-001)).

#### Acceptance criteria
- [ ] One command (`dart run tools/scripts/screenshots.dart`) regenerates every required asset; a second run produces byte-identical files (fixed seed, fixed date `2026-01-15T10:00`, no network, animations disabled).
- [ ] The matrix covers, at minimum: iPad 13-inch, iPhone 6.9-inch, Android phone, Android 10-inch tablet, and a 1280x800 web capture, each at the store's required pixel size.
- [ ] Six screens per device: **Library**, **Editor** with ink over an imported PDF page, **Editor** with the audio recorder bar active, **Search** with results, **Templates** overlay, **Settings -> Appearance** showing the look grid - named after the design surfaces in `docs/design/screens-and-flows.md` §6, §7, §8, §11, §12.
- [ ] Locales: `en` plus every locale enabled by [SN-I18N-001](i18n.md#sn-i18n-001) at release time; a missing locale falls back to `en` explicitly and the report says so.
- [ ] Each screenshot pins its look and mode by token id from `docs/design/tokens.json` (not a hardcoded colour), and at least one dark-mode capture per device is included.
- [ ] No screenshot contains real user data, a real email, a real name outside the demo persona, a dev/beta watermark, a debug banner, or the watermarked placeholder mascot art - asserted programmatically and cross-checked by [SN-REL-015](release.md#sn-rel-015).
- [ ] Status bars are normalised (full signal, 100% battery, fixed time) so the assets look intentional.
- [ ] A visual diff against the previous run is produced for review; an unexpected change fails the job until acknowledged.

#### Technical notes
Drive capture from `integration_test` with `IntegrationTestWidgetsFlutterBinding.convertFlutterSurfaceToImage()` plus fastlane `snapshot`/`screengrab` for the store-correct device/pixel sizes; the web capture uses the headless Chromium harness from [SN-WEB-023](qa.md#sn-web-023)/[SN-REL-008](release.md#sn-rel-008)'s smoke tooling. Seed data comes from a dedicated fixture builder in `app/test_fixtures/demo_workspace.dart` - the design's own seed persona (Riya, subjects Physics/Mathematics/Chemistry/Design, the 'Lecture 12' page, a 'Recording 04:12' clip) from `docs/design/screens-and-flows.md` §0 and §17 - so the marketing art and the design source agree. Freeze time and randomness (fixed `Clock` and seeded RNG) or screenshots will never be reproducible. Disable animations and the ink prediction jitter for capture; do **not** disable the real render path, because the screenshots must show the real ink engine's output. Output paths mirror what [SN-REL-005](release.md#sn-rel-005)'s `metadata` lane uploads: `app/ios/fastlane/screenshots/<locale>/` and `app/android/fastlane/metadata/android/<locale>/images/`. Keep the captures out of git-LFS-less bloat by storing only the current set and regenerating on demand.

#### Security & privacy
Threats: publishing a screenshot containing real note content, a real account email, a file path, or a share link (information disclosure, CWE-200; MASVS-PRIVACY-1/2 - the store listing is a public surface and the app's whole promise is that note content never leaves the device); publishing art that misrepresents privacy behaviour (e.g. showing a cloud-sync UI state the app does not have), which is both a store-review risk and a truthfulness problem against `PRD-CO-410` and the privacy declarations in [SN-PRV-015](privacy.md#sn-prv-015); leaking an unreleased feature in a screenshot. Controls: capture runs **only** against the seeded demo workspace on an ephemeral emulator/simulator with no signed-in account and no network (assert zero egress during capture); an automated scan asserts the absence of the dev/beta watermark, the debug banner and the placeholder mascot hash; a reviewer checkbox in `docs/release/release-checklist.md` confirms every screenshot matches shipped behaviour. Baseline: no secrets, no PII, no content in the capture pipeline or its logs.

#### UX notes
The screenshots *are* a design surface: they must showcase the product's identity - pen-first ink, PDF annotation, audio-linked notes, and the look system - using the tokens and components from `docs/design/design-system.md`, never a mock. Cover **all 17 looks** across the matrix (rotating looks across screens and devices so the set as a whole demonstrates the system) and include dark mode. Respect the design's real layouts: sidebar collapsed in the Editor, palette dock in its default bottom position, page rail on the right (`docs/design/screens-and-flows.md` §7). Accessibility parity: at least one capture uses the largest supported Dynamic Type setting so the listing does not imply a fixed-size UI, and alt text for each screenshot is authored in [SN-REL-010](release.md#sn-rel-010) for the accessibility statement.

#### Test plan
`app/integration_test/store_screenshots_test.dart` runs in CI on an emulator/simulator matrix and asserts: every expected file exists, dimensions match the store requirement table, determinism (hash equality across two runs), and the forbidden-content scan (watermark, debug banner, placeholder-art hash, the strings 'dev', 'beta', a sample email) passes. `app/test/fixtures/demo_workspace_test.dart` verifies the seed is deterministic and contains no real-looking PII. Manual: upload one full set to App Store Connect and Play Console drafts and confirm no size rejection.

#### Dependencies
[SN-QA-006](qa.md#sn-qa-006) (integration_test/patrol harness), [SN-QA-005](qa.md#sn-qa-005) (golden/look harness), [SN-DS-002](design-system.md#sn-ds-002) (tokens as ThemeExtension), [SN-REL-005](release.md#sn-rel-005) (fastlane metadata lane), [SN-I18N-001](i18n.md#sn-i18n-001) (locale list).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-010

<a id="sn-rel-010"></a>

**Publish App Store and Play listings and metadata as code**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, ios-phone, android-tablet, android-phone |
| Areas | release, docs, i18n |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-REL-005](release.md#sn-rel-005), [SN-PRV-015](privacy.md#sn-prv-015), [SN-IPAD-023](release.md#sn-ipad-023), [SN-AND-026](release.md#sn-and-026), [SN-I18N-001](i18n.md#sn-i18n-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `OWASP-A09`, `CWE-200` |
| Extra labels | agent-ready, needs-credentials |

#### Context
The store listing is the product's front door and, legally, a set of claims: Apple and Google both police accuracy, and a listing that promises more privacy than the app delivers is a compliance problem as well as a trust problem. Sane Notes makes unusually strong claims - local-first, zero-knowledge, no server ever stores note content (CLAUDE.md §1, §2) - so the listing text has to be exactly as true as the privacy declarations authored in [SN-PRV-015](privacy.md#sn-prv-015) and the privacy manifest in [SN-PRV-014](privacy.md#sn-prv-014). Keeping metadata **in the repo** rather than in two web consoles means the copy is reviewable, diffable, localisable alongside [SN-I18N-001](i18n.md#sn-i18n-001), and reproducible during an incident when the maintainer may need to change a listing quickly. `docs/roadmap.md` M8 lists store launch as an exit criterion, and `PRD-CO-410` fixes the marketing value proposition the listing must echo.

#### Scope
**In:** `app/ios/fastlane/metadata/<locale>/` and `app/android/fastlane/metadata/android/<locale>/` trees; name, subtitle, short/full description, keywords, promotional text, category, age rating answers, support/marketing/privacy URLs, copyright, and review notes; the truthfulness cross-check against the privacy declarations and the plan matrix; an ASO keyword sheet; upload through the fastlane `metadata` lane; `docs/release/store-listings.md` documenting the update process.
**Out:** screenshots ([SN-REL-009](release.md#sn-rel-009)); privacy labels/Data Safety content ([SN-PRV-015](privacy.md#sn-prv-015)) and the Apple privacy manifest ([SN-PRV-014](privacy.md#sn-prv-014)); the compliance gate ([SN-REL-011](release.md#sn-rel-011)); store products and pricing ([SN-BILL-010](billing.md#sn-bill-010)); the marketing website ([SN-SITE-001](website.md#sn-site-001)).

#### Acceptance criteria
- [ ] Every required field exists for `en` and for each locale enabled by [SN-I18N-001](i18n.md#sn-i18n-001); a locale missing a field falls back to `en` explicitly (recorded in the run summary), never to an empty string.
- [ ] Length limits are validated before upload and fail the job when exceeded: Apple name 30 / subtitle 30 / promotional text 170 / keywords 100 / description 4000; Play title 30 / short description 80 / full description 4000.
- [ ] The copy echoes the product's real value proposition from `PRD-CO-410` and `docs/design/screens-and-flows.md` §3 ('Study smarter.'; handwriting, PDFs and lecture audio in one notebook - linked, searchable, yours) without inventing features.
- [ ] A claims cross-check fails the job if the description asserts a data-handling behaviour that contradicts the privacy declaration from [SN-PRV-015](privacy.md#sn-prv-015) (e.g. claims 'no data collected' while crash reporting is declared, or claims encryption the app does not implement); banned marketing phrases ('military-grade encryption', 'unhackable', '100% secure') are rejected outright.
- [ ] Plan claims match the authoritative plan matrix (`PRD-BILL-001`-`PRD-BILL-007`): the free tier and the ₹999/yr (~₹83/mo) / ₹149/mo reference pricing and the 14-day trial are stated accurately, with renewal terms per `PRD-BILL-017`.
- [ ] Support URL, marketing URL and privacy-policy URL resolve over HTTPS at submission time (checked automatically); the privacy policy is the one authored in [SN-PRV-017](privacy.md#sn-prv-017).
- [ ] Review notes explain guest-first design - no demo account is needed because the app is fully usable without signing in (`PRD-AUTH-007/008`) - and list any credentials a reviewer would need for Pro features.
- [ ] `fastlane deliver --verify_only` and the Play equivalent pass in CI on every PR that touches the metadata tree.

#### Technical notes
Store metadata as plain UTF-8 text files (one field per file, the fastlane convention) so diffs are readable and translators can work file-by-file; the locale directory names follow the store's locale codes (`en-US`, `hi-IN`, ...), which differ from Flutter locale tags - keep the mapping in `tools/release/store_locales.yaml` and unit-test it. Validation lives in `tools/scripts/store_metadata.dart` (lengths, required fields, URL reachability, banned phrases, claims cross-check against the machine-readable declaration file produced by [SN-PRV-015](privacy.md#sn-prv-015) and asserted by [SN-PRV-016](privacy.md#sn-prv-016)). Upload runs through the `metadata` lane from [SN-REL-005](release.md#sn-rel-005) (`deliver` / `supply`), never by hand. Age rating answers and category selections are recorded as a checked-in questionnaire file so the answers are reviewable and reproducible; Apple's encryption export-compliance answer (`ITSAppUsesNonExemptEncryption`) belongs to [SN-IPAD-023](release.md#sn-ipad-023) but the listing must not contradict it. Alt text for each screenshot is authored here for the accessibility statement on the docs site (`PRD-CO-411`).

#### Security & privacy
Threats: an inaccurate privacy claim in the listing (MASVS-PRIVACY-1/2, GDPR/DPDP transparency, and an App Store 5.1.1 / Play policy violation) - controlled by the automated claims cross-check plus the maintainer sign-off in [SN-REL-013](release.md#sn-rel-013); disclosure of internal detail through review notes or promotional text (CWE-200) - review notes must never contain credentials, staging URLs or internal keys, and are linted for them; a store-console account compromise silently rewriting the listing (OWASP-A09 logging/monitoring failures) - mitigated by the repo being the source of truth so drift is detectable by re-running `--verify_only`, and by the least-privilege store roles and rotation in [SN-REL-017](release.md#sn-rel-017); over-claiming security in a way that misleads a user into risky behaviour (MASVS-PRIVACY-4 user education) - banned-phrase list plus a requirement that any security claim links to `docs/security/` or the published privacy policy.

#### UX notes
Listing copy is product copy: it follows the voice captured in `docs/design/screens-and-flows.md` §16 - student-first, plain, specific, no hype - and must line up with the in-app copy the user meets immediately afterwards (Login, Onboarding, Upgrade overlay). The Pro/Free description must match the Upgrade overlay's own words ('Everything, for the price of a chai a week'; free tier limits) so the store and the app never disagree. Localised copy is transcreated, not machine-translated, and must fit the same limits in Devanagari and RTL scripts ([SN-I18N-001](i18n.md#sn-i18n-001)). Accessibility: screenshot alt text is authored for every asset, and the description avoids emoji-only bullets that screen readers announce poorly.

#### Test plan
`tools/test/store_metadata_test.dart`: length limits per field and store, required-field presence, locale mapping, banned-phrase detection, URL scheme validation, and the claims cross-check against fixture declarations (one consistent, one contradictory - the latter must fail). CI: run the validator on every PR touching `**/fastlane/metadata/**`, plus `deliver --verify_only` in the release pipeline. Manual: render the listing preview in both consoles and read it end to end against `docs/security/` claims and the plan matrix before the first submission; re-read after any pricing or privacy change.

#### Dependencies
[SN-REL-005](release.md#sn-rel-005) (metadata lane), [SN-PRV-015](privacy.md#sn-prv-015) (privacy declarations to cross-check), [SN-IPAD-023](release.md#sn-ipad-023) (App Store Connect readiness), [SN-AND-026](release.md#sn-and-026) (Play readiness), [SN-I18N-001](i18n.md#sn-i18n-001) (locale set). Child: [SN-REL-009](release.md#sn-rel-009) (screenshots). Needs store-console access ([SN-REL-017](release.md#sn-rel-017)).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-011

<a id="sn-rel-011"></a>

**Enforce a pre-submission store review compliance gate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, ios-phone, android-tablet, android-phone |
| Areas | release, privacy, auth |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-AUTH-005](auth.md#sn-auth-005), [SN-PRV-014](privacy.md#sn-prv-014), [SN-PRV-015](privacy.md#sn-prv-015), [SN-AND-021](compat.md#sn-and-021), [SN-AND-026](release.md#sn-and-026), [SN-BILL-017](billing.md#sn-bill-017) |
| Security controls | `MASVS-AUTH-1`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PLATFORM-1`, `MASVS-CODE-4`, `ASVS-V1`, `OWASP-A01`, `OWASP-A05`, `CWE-489`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
Store rejection is the cheapest failure mode only if it is caught before submission; caught after, it costs a review cycle at the worst possible moment (launch, or a security hotfix). The platform docs already enumerate the hard requirements: `docs/platform/ipad.md` §9 (privacy manifest with required-reason API codes, accurate nutrition label, **Sign in with Apple under Guideline 4.8** whenever another social login exists, encryption export compliance, no orientation lock / full multitasking, pointer + keyboard support) and `docs/platform/android.md` §9 (Data Safety accuracy, target SDK 36, **16 KB page alignment** for every native library, App Bundle, edge-to-edge and predictive back, minimal permissions with rationale, correct foreground-service types). `PRD-AUTH-001` makes Sign in with Apple mandatory on Apple platforms, `PRD-AUTH-011/012` make a shipped auth bypass a p0 security failure, and `PRD-BILL-010/017` constrain how pricing may be presented inside the iOS app. This issue turns that list into a machine-checked gate that blocks the release train, so a human never has to remember it under pressure.

#### Scope
**In:** `tools/scripts/release_compliance.dart` and its checks; the per-item mapping to the doc line that requires it; a human-checklist section for the items that cannot be automated; wiring into `release.yml` preflight ([SN-REL-004](release.md#sn-rel-004)) and into the PR CI as a warning; the itemised report format.
**Out:** authoring the privacy manifest ([SN-PRV-014](privacy.md#sn-prv-014)) and privacy labels ([SN-PRV-015](privacy.md#sn-prv-015)); implementing Sign in with Apple ([SN-AUTH-005](auth.md#sn-auth-005)); 16 KB alignment itself ([SN-AND-021](compat.md#sn-and-021)); account deletion ([SN-PRV-006](privacy.md#sn-prv-006)); the placeholder-art/licence blockers ([SN-REL-015](release.md#sn-rel-015)); listing copy ([SN-REL-010](release.md#sn-rel-010)).

#### Acceptance criteria
- [ ] The gate runs in under 2 minutes against the built IPA/AAB plus the repo, and emits an itemised report: check id, verdict, the doc line that requires it, and the fix hint.
- [ ] **Apple checks fail the release when:** Sign in with Apple is absent from the login surface while Google/Microsoft are present (`PRD-AUTH-001`, Guideline 4.8); `PrivacyInfo.xcprivacy` is missing, or any bundled plugin lacks its own privacy manifest, or a required-reason API is used without a declared reason code (`docs/platform/ipad.md` §9, [SN-PRV-014](privacy.md#sn-prv-014)); a purpose string is missing for a used capability (`NSFaceIDUsageDescription`, microphone, camera, photo library); `ITSAppUsesNonExemptEncryption` is unset; the app declares a locked orientation or opts out of resizability; in-app account deletion is not reachable ([SN-PRV-006](privacy.md#sn-prv-006)); the binary contains an external-purchase link or price cross-reference that `PRD-BILL-010` forbids for non-US/EU storefronts.
- [ ] **Play checks fail the release when:** `targetSdk` is below the current Play requirement (36 per `docs/platform/android.md` §1); any packaged `.so` is not 16 KB aligned ([SN-AND-021](compat.md#sn-and-021)); the manifest requests a permission outside the allow-list (explicitly banning `MANAGE_EXTERNAL_STORAGE` and `QUERY_ALL_PACKAGES`); a foreground service lacks a declared type ([SN-AND-023](audio.md#sn-and-023)); the artifact is an APK rather than an AAB; the Data Safety declaration file is stale relative to the declared-permission set ([SN-AND-026](release.md#sn-and-026), [SN-PRV-016](privacy.md#sn-prv-016)).
- [ ] **Cross-platform checks fail the release when:** any bypass or debug marker (`SANE_AUTH_BYPASS`, the dev watermark string, a debug banner flag) is present in the release artifact (`PRD-AUTH-012`, CWE-489); an analytics or ad SDK is linked ([SN-PRV-010](privacy.md#sn-prv-010)); telemetry does not default to off (`PRD-TEL-001`); the cloud-AI master switch is not false.
- [ ] Each automated check has a negative test: a deliberately non-compliant fixture makes exactly that check fail, and only that one.
- [ ] Items that cannot be automated (age-rating answers, review-note accuracy, screenshot truthfulness, subscription disclosure wording per `PRD-BILL-017`) appear as an explicit human checklist section in `docs/release/release-checklist.md` with a named sign-off.
- [ ] The gate is advisory (warning) on PRs and blocking in `release.yml`, and its verdict is recorded in the release tracking issue.

#### Technical notes
Implement as pure Dart in `tools/` so it runs in the existing analyze job without a Flutter runtime. Artifact introspection: unzip the IPA/AAB and inspect `Info.plist`, `PrivacyInfo.xcprivacy` (app and every framework), `AndroidManifest.xml` (via `aapt2 dump badging` or an XML parse of the AAB's protobuf manifest), and the `lib/*/*.so` ELF program headers for the 16 KB (`p_align = 0x4000`) check. Static-source checks (Sign in with Apple present in the login builder, no analytics import, telemetry default) run against `app/lib/` with a simple AST/regex pass - documented as heuristic and paired with the widget test in [SN-AUTH-005](auth.md#sn-auth-005) that actually renders the button, because a source grep alone is not proof. Reuse the string-scan helper from [SN-REL-015](release.md#sn-rel-015) rather than writing a second one. Every check carries a stable id (`APPLE-4.8`, `PLAY-16KB`, `XPLAT-BYPASS`, ...) so the report, the checklist and the controls matrix (`docs/security/controls-matrix.md`) can reference the same identifier. Where a store requirement date is uncertain (the 16 KB enforcement date is marked **(verify)** in `docs/platform/android.md` §9 L3), the check still runs but its severity is configurable in `tools/release/compliance_policy.yaml`.

#### Security & privacy
Threats and controls, by id: a **shipped auth bypass** (TM-E-01, MASVS-AUTH-1, CWE-489, `PRD-AUTH-011/012`) - the artifact string scan is the third of the three independent layers CLAUDE.md §7 rule 5 forbids weakening; **inaccurate privacy declarations** reaching users (MASVS-PRIVACY-1/2, GDPR/DPDP transparency, OWASP-A01 broken access to truthful disclosure) - declaration-vs-permission consistency check; **over-broad permissions** granting capability the product does not need (MASVS-PLATFORM-1, OWASP-A05, principle of least privilege) - permission allow-list; **missing platform hardening required by the store** (16 KB alignment, target SDK) leaving users on a weaker runtime (MASVS-CODE-4); **information disclosure** through review notes or debug artefacts (CWE-200). The gate is itself security-critical, so it lives under CODEOWNERS review (it is release tooling referenced by `/docs/security/`) and its policy file changes require the Security Owner's approval per `docs/security/ssdlc-process.md` §1.

#### UX notes
No end-user surface, but the gate protects several: it is what guarantees the **Login** screen still offers Sign in with Apple on Apple devices (`docs/design/screens-and-flows.md` §3, where Continue with Apple sits between Google and Microsoft), that the **Upgrade** overlay's pricing disclosure stays store-legal (§13, `PRD-BILL-017`), and that Settings still exposes account deletion. Release-manager surface: the itemised report must be readable in a terminal and in the CI summary - one line per check, red/green, with the doc reference - and the human checklist items must be phrased as questions a maintainer can answer without re-reading the platform docs.

#### Test plan
`tools/test/release_compliance_test.dart` with fixture artifacts: a compliant IPA/AAB pair and one deliberately broken fixture per check (SIWA removed, privacy manifest deleted, purpose string missing, orientation locked, non-aligned `.so`, `QUERY_ALL_PACKAGES` added, APK instead of AAB, bypass string present, analytics SDK linked, telemetry default true) - each must fail exactly its own check. `app/test/security/auth_bypass_test.dart` remains the authoritative bypass test; this gate is the artifact-level backstop. Integration: run the gate in a dry-run release ([SN-REL-004](release.md#sn-rel-004)) and confirm it blocks. Manual: walk the human checklist once end to end before the first submission and record the sign-off.

#### Dependencies
[SN-AUTH-005](auth.md#sn-auth-005) (Sign in with Apple), [SN-PRV-014](privacy.md#sn-prv-014) (privacy manifest), [SN-PRV-015](privacy.md#sn-prv-015) (privacy declarations), [SN-AND-021](compat.md#sn-and-021) (16 KB alignment), [SN-AND-026](release.md#sn-and-026) (Play readiness), [SN-BILL-017](billing.md#sn-bill-017) (subscription disclosure). Consumed by [SN-REL-004](release.md#sn-rel-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-012

<a id="sn-rel-012"></a>

**Gate rollout advancement on crash-free sessions and release health**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, telemetry, qa |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-004](release.md#sn-rel-004) |
| Depends on | [SN-TEL-001](telemetry.md#sn-tel-001), [SN-REL-006](release.md#sn-rel-006), [SN-PERF-003](perf.md#sn-perf-003) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `SSDF-RV.1`, `OWASP-A09`, `CWE-778` |
| Extra labels | agent-ready, needs-decision |

#### Context
Staged rollout only protects users if someone - or something - is watching the numbers between steps. Sane Notes has an unusual constraint here: [ADR-0011](docs/adr/0011-telemetry-and-diagnostics.md) and `PRD-TEL-001` forbid an always-on analytics or crash SDK, so the app itself reports nothing unless the user opts in. The release-health signal therefore has to come primarily from the **stores' own OS-level vitals** - Google Play Android vitals (user-perceived crash rate, ANR rate) and App Store Connect Metrics/crash reports - which are collected by the platform from users who opted into sharing diagnostics with Apple/Google, not by us. That is both privacy-compatible and sufficient for a rollout gate. This issue defines the metrics, the thresholds, the fetch-and-evaluate job, and how a red verdict stops [SN-REL-006](release.md#sn-rel-006) from promoting and triggers the halt path in [SN-REL-014](release.md#sn-rel-014).

#### Scope
**In:** the release-health metric set and thresholds; a `tools/scripts/release_health.dart` that fetches Play vitals and App Store Connect metrics for the current version and emits a machine-readable verdict; the sample-size and soak rules that make a verdict meaningful; the automatic halt trigger; a daily health report on the release tracking issue during an active rollout; the web equivalent (error-rate signal from the smoke checks and the opt-in bundle only).
**Out:** the opt-in telemetry/consent framework ([SN-TEL-001](telemetry.md#sn-tel-001), [SN-PRV-009](privacy.md#sn-prv-009)); the crash-report redaction pipeline (ADR-0011, owned by telemetry); the performance CI gates ([SN-PERF-003](perf.md#sn-perf-003)); the rollout mechanics ([SN-REL-006](release.md#sn-rel-006)).

#### Acceptance criteria
- [ ] The gate evaluates, per platform and per version: **crash-free sessions >= 99.5%**, **crash-free users >= 99.0%**, Android **ANR rate below Play's bad-behaviour threshold** (0.47% user-perceived, verify current value at implementation), and no new crash signature accounting for more than 0.1% of sessions.
- [ ] A verdict is one of `green`, `insufficient-data` or `red`; `insufficient-data` blocks promotion exactly like `red` - the gate never advances on a guess.
- [ ] Minimum sample before any verdict other than `insufficient-data`: 1000 sessions at the current rollout step and at least 24 hours of exposure (configurable in `tools/release/health_policy.yaml`).
- [ ] A `red` verdict during an active production rollout triggers the automated halt in [SN-REL-006](release.md#sn-rel-006) within 30 minutes of the data being available and comments on the release tracking issue with the top crash signatures.
- [ ] The job runs on a schedule during an active rollout and on demand; it is idempotent and safe to re-run.
- [ ] The fetched data contains and stores **no** user identifiers, device identifiers, or note content - only aggregate rates and crash signatures (class + stack frames); the stored artefact is asserted by a test to contain no email, no path under a user home directory, and no note-shaped string.
- [ ] Where a crash signature originates in the app's own opt-in report pipeline, it is already scrubbed per `PRD-TEL-002` before it reaches this gate.
- [ ] The thresholds, the data sources and their privacy basis are documented in `docs/release/release-health.md` and cross-linked from `docs/security/controls-matrix.md`.

#### Technical notes
Data sources: the **Google Play Developer Reporting API** (vitals metric sets: crash rate, ANR rate, with the `userPerceived` qualifier) using the same service account as [SN-REL-006](release.md#sn-rel-006) but with read-only scope, and the **App Store Connect API** metrics/xcode-crash endpoints using the key from [SN-REL-005](release.md#sn-rel-005). Both are *aggregate* endpoints - no per-user rows are requested or stored. Implement as pure Dart in `tools/` with a thin HTTP client and a recorded-fixture test mode so the logic is unit-testable offline. Persist verdicts to `docs/release/health/<version>.json` (aggregates only) so the rollout ladder has an auditable history. Web health has no store vitals: use the post-deploy smoke checks from [SN-REL-008](release.md#sn-rel-008) plus, if and only if the user opted in, the aggregated error counts from the telemetry pipeline - and say plainly in the doc that web health is weaker evidence, which is a deliberate consequence of the privacy posture. **Maintainer decision required (`needs-decision`):** whether to stand up the self-hosted, opt-in crash backend that [ADR-0011](docs/adr/0011-telemetry-and-diagnostics.md) permits ('if a crash *backend* is used it must be self-hosted ... and only after opt-in'), and the final threshold values. Until that decision, implement store-vitals-only and leave the backend adapter behind an interface.

#### Security & privacy
Threats: building a release-health capability that quietly becomes user tracking (LINDDUN-Identifiability/Linkability, MASVS-PRIVACY-3, and a direct contradiction of `PRD-TEL-001` and the 'no data collected' store declaration in [SN-PRV-015](privacy.md#sn-prv-015)) - controlled by using aggregate-only endpoints, storing only rates and signatures, and an automated content assertion on the stored artefact; a crash signature leaking note content through a stack frame or an exception message (CWE-532) - the app's own reports are scrubbed upstream per `PRD-TEL-002`, and this gate additionally redacts any string longer than 120 characters in a frame; store-API credentials with more scope than reading vitals (OWASP-A08) - read-only scoped credentials, inventoried in [SN-REL-017](release.md#sn-rel-017); **missing detection** of a bad release (CWE-778 insufficient logging/monitoring, OWASP-A09, SSDF RV.1) - the gate's whole purpose, with `insufficient-data` treated as blocking so silence is never read as success. No note content, key material or token ever enters this pipeline.

#### UX notes
No end-user UI, and deliberately so: the user-visible consequence is that a bad build stops reaching people. Release-manager surface: a compact health card in the CI summary and on the release tracking issue - version, platform, rollout step, sessions observed, crash-free %, ANR %, verdict, and the top three crash signatures with counts - readable on a phone. The privacy basis must be stated in that report ('aggregate store vitals; no user or device identifiers') so nobody mistakes it for analytics. The same wording appears in the privacy dashboard's 'what leaves this device' copy ([SN-PRV-002](privacy.md#sn-prv-002)) where relevant - nothing leaves the device for this gate.

#### Test plan
`tools/test/release_health_test.dart` with recorded API fixtures: green/red/insufficient-data classification, threshold boundaries (99.5% exactly, one session short of the minimum sample), the 24-hour soak rule, the redaction assertions on stored artefacts, and idempotent re-runs. `tools/test/release_health_privacy_test.dart`: a fixture payload seeded with an email, a home-directory path and a long note-like string must be absent from the persisted verdict. Integration: run against a sandbox Play listing after a throwaway internal-track release and confirm the verdict and the report render. Drill: force a `red` verdict in a staging configuration and confirm the halt path in [SN-REL-006](release.md#sn-rel-006) fires.

#### Dependencies
[SN-TEL-001](telemetry.md#sn-tel-001) (opt-in telemetry framework and ADR-0011 constraints), [SN-REL-006](release.md#sn-rel-006) (halt/promotion hooks), [SN-PERF-003](perf.md#sn-perf-003) (the sibling CI perf gates). Needs store API credentials ([SN-REL-017](release.md#sn-rel-017)).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-013

<a id="sn-rel-013"></a>

**Write the release checklist and go/no-go runbook**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | docs |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | release, docs |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-REL-004](release.md#sn-rel-004), [SN-REL-011](release.md#sn-rel-011), [SN-REL-012](release.md#sn-rel-012) |
| Security controls | `SSDF-PS.2`, `SSDF-PO.2`, `MASVS-PRIVACY-1`, `OWASP-A09` |
| Extra labels | agent-ready |

#### Context
`docs/security/ssdlc-process.md` §2.5 defines the release exit gate and §1 names the **Release Manager** (the maintainer) as accountable for running it, but there is no document that tells that person - or an autonomous agent acting as them - what to do, in what order, on release day. The gates themselves are automated by [SN-REL-004](release.md#sn-rel-004), [SN-REL-011](release.md#sn-rel-011), [SN-REL-012](release.md#sn-rel-012) and [SN-REL-015](release.md#sn-rel-015), yet several launch-critical items are irreducibly human: confirming the original mascot art shipped (CLAUDE.md §9 - a build embedding the watermarked placeholder is **not releasable**), confirming a licence exists (CLAUDE.md §13, `docs/roadmap.md` M8), confirming the store privacy declarations still match reality, confirming the screenshots depict shipped behaviour, and deciding go/no-go. This issue writes that checklist and the timeline around it, and turns it into a GitHub issue template so every release leaves an auditable record.

#### Scope
**In:** `docs/release/release-checklist.md` (per-surface, gate-by-gate, with owners and evidence required); a T-7 / T-3 / T-0 / T+1 timeline; the go/no-go decision record with named sign-offs (Release Manager, Security Owner); `.github/ISSUE_TEMPLATE/release.yml` generating a tracking issue per version; the definition of a releasable build; the link map from each checklist item to the doc that requires it and the automated check that proves it.
**Out:** the automated gates themselves; the hotfix path ([SN-REL-014](release.md#sn-rel-014)); store listing content ([SN-REL-010](release.md#sn-rel-010)); the beta program ([SN-REL-007](release.md#sn-rel-007)).

#### Acceptance criteria
- [ ] The checklist covers all five surfaces and every M8 exit criterion in `docs/roadmap.md`: signed + notarized artifacts, SBOM + provenance attached, SLSA L3 target met, entitlement failure degrades to Free, **original Sage mascot art shipped**, LICENSE present, store privacy labels accurate, telemetry default off, support + docs live.
- [ ] Every item states: who owns it, what evidence closes it (a CI job name, a console screenshot, a link), and the doc line that requires it - no item is a bare assertion.
- [ ] Items already automated are marked as such and reference the check id from [SN-REL-011](release.md#sn-rel-011) / [SN-REL-015](release.md#sn-rel-015) rather than duplicating the logic in prose.
- [ ] The verification-stage prerequisites from `docs/security/ssdlc-process.md` §2.4 are listed as entry criteria: ZAP full scan clean, MobSF with no unresolved high findings, parser fuzzing clean, milestone pentest P0/P1 fixed or risk-accepted, perf budgets met.
- [ ] The go/no-go section requires two named sign-offs (Release Manager and Security Owner per §1 RACI) and records an explicit decision, including the wording for an accepted risk.
- [ ] `.github/ISSUE_TEMPLATE/release.yml` creates a tracking issue pre-populated with the checklist, the version, and slots for the rollout ladder state ([SN-REL-006](release.md#sn-rel-006)) and health verdicts ([SN-REL-012](release.md#sn-rel-012)).
- [ ] The timeline states realistic lead times, including that App Store review is not instantaneous and that a Play production rollout is staged over days, so the plan never assumes a same-day launch.
- [ ] A dry run of the checklist against a release-candidate build finds at least one gap, which is then fixed or explicitly deferred - proving the checklist is exercised, not theoretical.

#### Technical notes
Keep the checklist machine-friendly: one markdown checkbox per item with a stable id in the text (`REL-CHK-012`) so the issue template, the CI summary and `docs/security/controls-matrix.md` can cross-reference it. Structure: (1) entry criteria (verification gate), (2) build + sign + attest, (3) compliance and blockers, (4) store submission, (5) rollout, (6) post-release. Per-surface sub-sections are needed because the surfaces differ materially: iPad/iPhone go through App Store review with phased release; Android goes through Play tracks with a percentage ladder ([SN-REL-006](release.md#sn-rel-006)); web deploys instantly and rolls back instantly ([SN-REL-008](release.md#sn-rel-008)) and therefore has a *different*, shorter checklist. Record the release in `docs/release/published-builds.json` (the ledger from [SN-REL-002](release.md#sn-rel-002)). Reference `docs/security/ssdlc-process.md` §2.5 and §5 (Definition of Done, security dimension) verbatim where it already says the right thing rather than paraphrasing - drift between the two documents would be worse than duplication.

#### Security & privacy
Threats: shipping without the security gate (SSDF PS.2) because nobody knew it existed; declaring privacy properties that are no longer true after a late change (MASVS-PRIVACY-1, and a GDPR/DPDP transparency problem) - the checklist re-verifies [SN-PRV-015](privacy.md#sn-prv-015)/[SN-PRV-016](privacy.md#sn-prv-016) on every release, not only the first; releasing while an unfixed P0 pentest finding is open (`docs/security/ssdlc-process.md` §2.4 exit gate) - the entry criteria and the Security Owner sign-off make that an explicit, recorded risk acceptance rather than an omission (OWASP-A09 - the audit trail *is* the control); shipping the watermarked placeholder mascot art, which is an IP/licensing exposure as well as a design blocker (CLAUDE.md §9). The checklist itself contains no secrets and no user data; the tracking issue is public, so it must reference evidence by link/job name and never paste credentials, store API responses or crash payloads.

#### UX notes
The artefact is developer documentation, but its usability matters under pressure: short imperative items, one screen per phase, the destructive/irreversible steps (starting a production rollout, submitting for review) visually separated and stated as irreversible. Two items are about end-user UX and must be phrased so they are actually checked: that the **What's new** copy ([SN-REL-016](release.md#sn-rel-016)) reflects the release, and that the store screenshots ([SN-REL-009](release.md#sn-rel-009)) show the shipped UI in the current looks. Accessibility of the release itself is an entry criterion sourced from [SN-A11Y-001](a11y.md#sn-a11y-001) (WCAG 2.2 AA audit passed, VoiceOver/TalkBack spot-checks on the core flows).

#### Test plan
Documentation, verified by use: (1) run the checklist against a release-candidate build and record the outcome in the tracking issue; (2) assert with a small CI script that every `REL-CHK-` id referenced in the issue template exists in `docs/release/release-checklist.md` and vice versa (`tools/test/release_checklist_test.dart`); (3) link-check every doc reference in the checklist as part of the docs lint; (4) have a second person (or a fresh agent session with no context) execute the checklist end to end and report any step they could not complete from the text alone - that report is the acceptance evidence.

#### Dependencies
[SN-REL-004](release.md#sn-rel-004) (the pipeline whose gates it records), [SN-REL-011](release.md#sn-rel-011) (compliance gate ids), [SN-REL-012](release.md#sn-rel-012) (health verdicts). Related: [SN-REL-015](release.md#sn-rel-015), [SN-PRV-015](privacy.md#sn-prv-015), [SN-A11Y-001](a11y.md#sn-a11y-001), [SN-QA-002](qa.md#sn-qa-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-014

<a id="sn-rel-014"></a>

**Implement the hotfix and rollback process across stores and web**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, ci-cd, security |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-REL-004](release.md#sn-rel-004) |
| Depends on | [SN-REL-004](release.md#sn-rel-004), [SN-REL-006](release.md#sn-rel-006), [SN-REL-008](release.md#sn-rel-008), [SN-REL-013](release.md#sn-rel-013) |
| Security controls | `SSDF-RV.2`, `SSDF-RV.3`, `SSDF-PS.2`, `MASVS-RESILIENCE-2`, `OWASP-A09`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
`docs/security/ssdlc-process.md` §3 commits to fixing a Critical vulnerability within 30 days 'hotfix ASAP; may pull the build', and §4 step 2 makes containment - halting a rollout, rotating a compromised key - the second action after detection. `docs/security/devsecops-pipeline.md` §6 repeats it as a runbook step. None of that is executable today: there is no release branch model, no cherry-pick path, no rehearsed halt, and no measured rollback. Under incident pressure, an unrehearsed process is the same as no process, and for a local-first app there is an extra hazard: a hotfix must never be shipped in a way that risks the user's on-device data (a forced migration, a schema change, or a rollback that meets newer local state). This issue defines and rehearses the hotfix path end to end and measures the containment times the incident runbook promises.

#### Scope
**In:** the release-branch model (`release/<major>.<minor>.x`) and cherry-pick rules; the hotfix version bump and expedited pipeline path; per-surface containment actions (Play halt, App Store phased-release pause / expedited review request, web rollback) with measured time targets; the mandatory regression test rule; the coordination with the private advisory and release notes; `docs/release/hotfix-runbook.md`; a rehearsal drill with recorded timings.
**Out:** the incident-response policy itself (`ssdlc-process.md` §4, `devsecops-pipeline.md` §6 - this issue *implements* it); secret rotation mechanics ([SN-REL-017](release.md#sn-rel-017)); the rollout ladder ([SN-REL-006](release.md#sn-rel-006)); web deploy machinery ([SN-REL-008](release.md#sn-rel-008)).

#### Acceptance criteria
- [ ] `docs/release/hotfix-runbook.md` opens with a copy-pasteable containment block: the exact commands to halt the Play rollout, pause App Store phased release, and roll the web back - usable without reading the rest of the document.
- [ ] Measured containment targets, proven by a drill and recorded in the runbook: Play rollout halted in under 15 minutes; App Store phased release paused in under 15 minutes; web rolled back in under 5 minutes.
- [ ] The branch model is defined and enforced: hotfixes branch from the release tag onto `release/<major>.<minor>.x`, land as cherry-picks from `main` (never the reverse), and the patch version bumps per [SN-REL-002](release.md#sn-rel-002); a hotfix that cannot be cherry-picked cleanly is escalated rather than hand-patched silently.
- [ ] The hotfix pipeline path runs the same gates as a normal release ([SN-REL-011](release.md#sn-rel-011), [SN-REL-015](release.md#sn-rel-015), signing, SBOM) - no gate may be skipped for speed; only the *human* soak times in the rollout ladder may be compressed, and that compression is an explicit, recorded decision by the Release Manager and Security Owner.
- [ ] Every hotfix carries a regression test that fails on the unfixed build and passes on the fixed one (`ssdlc-process.md` §3, CLAUDE.md §10), named in the PR.
- [ ] A hotfix must be proven safe for on-device data: the checklist requires an explicit 'no storage schema change' assertion, or a documented forward/backward migration plan verified by a test, before it may ship (this is a data-loss guard, not a formality).
- [ ] The runbook states when to pull a build entirely versus halt-and-replace, and who decides.
- [ ] Coordination steps are included: open/maintain the private advisory, do not describe the vulnerability in public release notes before the fix is broadly installed, credit the reporter per `SECURITY.md`, publish the advisory when the fix ships, and start the GDPR/DPDP 72-hour clock if personal data is at risk (`ssdlc-process.md` §4 step 3).
- [ ] A full drill is executed and recorded: from a simulated Critical report to a signed hotfix artifact in under 4 hours of working time, with each step's actual duration written into the runbook.

#### Technical notes
Add a `hotfix` input to `release.yml` ([SN-REL-004](release.md#sn-rel-004)) that selects the release branch, skips the non-blocking scanners' *baseline* re-runs but keeps every blocking gate, and tags `v<x>.<y>.<z+1>`. The Play halt is the `fastlane android halt` lane from [SN-REL-006](release.md#sn-rel-006); App Store phased release is paused through the App Store Connect API via a `fastlane ios pause_phased_release` lane ([SN-REL-005](release.md#sn-rel-005)); web rollback is `tools/scripts/web_deploy.dart --rollback` ([SN-REL-008](release.md#sn-rel-008)). Branch protection ([SN-CI-003](ci-cd.md#sn-ci-003)) must be configured to allow the release branch the same required checks as `main` - a hotfix is not an excuse to bypass review, and CODEOWNERS still applies to `/packages/sane_crypto/`, `/packages/sane_sync/`, `/app/lib/auth/` and `/docs/security/`. Store review latency is outside our control: the runbook must therefore treat **halt** (immediate) and **replace** (review-bound) as separate decisions, and note that Apple's expedited review request is a request, not a guarantee. For the web surface, rollback is instant but must respect the newer-local-schema guard from [SN-REL-008](release.md#sn-rel-008) - the runbook says so explicitly, because that is where a rushed rollback could otherwise cost user data.

#### Security & privacy
Threats: a known-vulnerable build continuing to install after a Critical report (SSDF RV.2, breaching the §3 SLA); a rushed hotfix bypassing the signing/SBOM/compliance gates and shipping something worse (SSDF PS.2, MASVS-RESILIENCE-2); a rollback reintroducing an already-fixed vulnerability (CWE-1104 - the runbook therefore forbids rolling *back* to a build with a known security fix missing, and requires rolling *forward* instead); premature public disclosure of the vulnerability through release notes or a public issue (coordinated-disclosure breach, `SECURITY.md`); loss of the audit trail during an incident (OWASP-A09) - every containment action is recorded in the advisory and the release tracking issue with actor and timestamp. Privacy: if personal data is at risk the GDPR 72-hour notification clock starts at assessment (`ssdlc-process.md` §4 step 3); by design a server/cloud compromise exposes no note plaintext (zero-knowledge), and the runbook requires confirming that specific path rather than assuming it.

#### UX notes
User-facing consequences must be handled deliberately: a halted rollout means some users are on the old build and some on the new - the What's new copy ([SN-REL-016](release.md#sn-rel-016)) and any in-app update prompt must not promise a version the user cannot get. If a hotfix is security-relevant, the release notes say so plainly without a reproduction path ('fixes an issue that could ... - update recommended'), in the product's plain, non-alarming voice (`docs/design/screens-and-flows.md` §16). Never use a blocking/immediate in-app update that prevents note-taking (`docs/platform/android.md` in-app updates are flexible-only per [SN-REL-006](release.md#sn-rel-006)) - a user must always be able to write, even during an incident. Web users get the standard non-blocking 'Update available - Reload' affordance from [SN-REL-008](release.md#sn-rel-008).

#### Test plan
Drill-based, and the drill is the deliverable: (1) simulate a Critical report on a staging listing - halt Play, pause App Store phased release, roll back web, recording each timing; (2) cut a hotfix branch from the previous tag, cherry-pick a fix with a regression test, run the full pipeline, and confirm every gate ran; (3) confirm the advisory/release-note coordination steps produce the right artefacts; (4) attempt a deliberately non-compliant hotfix (gate skipped, no regression test, schema change without a migration plan) and confirm it is blocked. `tools/test/hotfix_branch_test.dart` validates the version-bump and branch-name rules. Record all timings in `docs/release/hotfix-runbook.md` and re-drill at least once per milestone.

#### Dependencies
[SN-REL-004](release.md#sn-rel-004) (pipeline), [SN-REL-006](release.md#sn-rel-006) (Play halt), [SN-REL-008](release.md#sn-rel-008) (web rollback), [SN-REL-013](release.md#sn-rel-013) (checklist it plugs into); relates to [SN-CI-003](ci-cd.md#sn-ci-003) (branch protection) and [SN-REL-017](release.md#sn-rel-017) (key rotation during containment).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-015

<a id="sn-rel-015"></a>

**Add a release-blocker gate for placeholder art, licence and debug flags**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, ci-cd, brand |
| Size | S |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-BRD-001](brand.md#sn-brd-001), [SN-REL-002](release.md#sn-rel-002) |
| Security controls | `MASVS-AUTH-1`, `MASVS-RESILIENCE-2`, `MASVS-CODE-4`, `MASVS-PRIVACY-1`, `CWE-489`, `CWE-1104`, `OWASP-A05` |
| Extra labels | agent-ready, needs-decision, good first issue |

#### Context
Three things must be impossible to ship, and all three are currently only prose. CLAUDE.md §9 states that the mascot art in `design/assets/*.png` is a **watermarked placeholder - not releasable**, and that any build embedding it is tagged not-releasable; `docs/roadmap.md` M8 repeats it as a hard exit criterion alongside 'License chosen and a LICENSE file present' (the licence is still an open maintainer decision per CLAUDE.md §13). CLAUDE.md §7 rule 5 and `PRD-AUTH-011/012` make a release-mode build containing the dev auth bypass a p0 security failure, and `PRD-TEL-001` requires telemetry to default off in every flavour. A prose rule that depends on someone remembering is not a control; this issue turns all of it into one fast, testable gate that the release train ([SN-REL-004](release.md#sn-rel-004)) runs in preflight and that any agent can run locally before opening a PR.

#### Scope
**In:** `tools/scripts/release_blockers.dart` with one check per blocker, a stable id per check, a readable report, a `--json` mode for CI, and unit tests with deliberately failing fixtures; wiring into `release.yml` preflight and as a non-blocking PR job; the not-releasable tagging rule.
**Out:** commissioning the real mascot art ([SN-BRD-001](brand.md#sn-brd-001)); choosing the licence (maintainer decision); the store-policy checks ([SN-REL-011](release.md#sn-rel-011)); the auth-bypass unit test ([SN-AUTH-002](auth.md#sn-auth-002)'s `app/test/security/auth_bypass_test.dart`, which this gate backstops at artifact level).

#### Acceptance criteria
- [ ] `BLK-ART`: fails if any asset in the built bundle matches the known placeholder hashes from `design/assets/` or carries the watermark marker; the check is hash-based (an allow-list of approved asset digests), not filename-based, so renaming cannot defeat it.
- [ ] `BLK-LICENSE`: fails if `LICENSE` is absent, empty, or still contains a placeholder marker (`TBD`, `TODO`, `CHOOSE-A-LICENSE`), and fails if `pubspec.yaml` declares a licence that disagrees with the `LICENSE` file.
- [ ] `BLK-BYPASS`: fails if `SANE_AUTH_BYPASS`, the 'AUTH BYPASS - dev build' watermark string (`PRD-AUTH-013`) or any equivalent bypass marker appears in the release artifact's compiled defines or string table (`PRD-AUTH-012`).
- [ ] `BLK-FLAVOUR`: fails if the artifact was not built with `SANE_FLAVOR=release`, if `SANE_LOG_LEVEL` is more verbose than `warn`, if `SANE_TELEMETRY_DEFAULT` is not false, or if `SANE_AI_CLOUD_ENABLED` is not false (`docs/architecture/overview.md` §7.1, `PRD-TEL-001`).
- [ ] `BLK-DEBUG`: fails if the debug banner is enabled, if a `TODO-RELEASE` marker exists anywhere in `app/lib/`, or if `print(` survives the arch-lint ban in shipped code (CLAUDE.md §6).
- [ ] The whole gate runs in under 60 seconds on a release artifact and prints one line per check with id, verdict and the exact offending file/string (truncated, never dumping bytes).
- [ ] Every check has a unit test with a synthetic failing fixture, and a passing fixture, so the gate cannot rot into a no-op.
- [ ] A failing gate marks the build **not-releasable** in the run summary and in `docs/release/published-builds.json`, and blocks [SN-REL-004](release.md#sn-rel-004); on a PR it reports as a warning with the same detail.

#### Technical notes
Pure Dart in `tools/` (no Flutter import) so it runs in the analyze job and locally with `dart run`. Asset checking reads the built bundle (`build/app/intermediates/assets` / the IPA's `Frameworks/App.framework/flutter_assets`) and compares SHA-256 digests against `tools/release/approved_assets.json`; the placeholder digests are recorded when [SN-BRD-001](brand.md#sn-brd-001) lands the real art, and until then **every** `design/assets/*.png` derived asset is treated as a blocker, which is the correct default (the docs say such builds are not releasable). String scanning must handle Dart AOT string tables and the Android `resources.arsc`/DEX strings; keep the scanner shared with [SN-REL-011](release.md#sn-rel-011) so there is one implementation of 'does this artifact contain string X'. The dart-define values are recoverable from the artifact's embedded define map; where that is not reliable on a platform, fall back to the build-time manifest the pipeline writes next to the artifact and verify its signature/checksum rather than trusting a loose file. **Maintainer decision (`needs-decision`):** the licence choice (CLAUDE.md §13) - the check ships now and simply fails until a `LICENSE` exists, which is the desired behaviour.

#### Security & privacy
Threats: a **release build containing the auth bypass** (TM-E-01, MASVS-AUTH-1, CWE-489) - this gate is the artifact-level backstop for the third of the three layers CLAUDE.md §7 rule 5 forbids weakening; a debug-configured build leaking verbose logs or enabling non-default behaviour in production (OWASP-A05 security misconfiguration, MASVS-CODE-4, and a privacy risk if logging is verbose - `PRD-TEL-001`, MASVS-PRIVACY-1); shipping unlicensed or watermarked third-party-style art, an IP exposure and a trust problem (CWE-1104 adjacency - shipping a component that is not approved for release); tamper-resistance of the gate itself (MASVS-RESILIENCE-2) - the approved-asset digest list is CODEOWNERS-protected so loosening it needs the maintainer's review. The scanner must not print secret-shaped strings it finds; it reports the matched *marker*, never surrounding bytes.

#### UX notes
No end-user surface; the user-facing effect is that the app they install never shows a watermarked mascot, a debug banner, or a dev watermark over the canvas. Brand correctness is a design requirement: the mascot is referenced through the single `SaneSageMark` asset in `sane_ui` (CLAUDE.md §9), so when [SN-BRD-001](brand.md#sn-brd-001) swaps the art, exactly one digest changes and this gate confirms it. Developer surface: the report must be scannable in a terminal, and the failure message should say what to do ('LICENSE missing - see CLAUDE.md §13; this is a maintainer decision') rather than only what is wrong. None beyond baseline for privacy.

#### Test plan
`tools/test/release_blockers_test.dart` with one failing and one passing fixture per check: a bundle containing a placeholder-hash asset; a missing/placeholder `LICENSE`; an artifact string table containing `SANE_AUTH_BYPASS` and one containing the dev watermark; a define map with `SANE_FLAVOR=beta`, with `SANE_LOG_LEVEL=trace`, with telemetry default true, with cloud AI enabled; a source tree containing `TODO-RELEASE`. Assert the report shape in `--json` mode and the sub-60-second runtime on a realistic artifact. Integration: a dry-run release ([SN-REL-004](release.md#sn-rel-004)) with a deliberately placeholder asset must be blocked in preflight.

#### Dependencies
[SN-BRD-001](brand.md#sn-brd-001) (real mascot art and the approved-asset digests), [SN-REL-002](release.md#sn-rel-002) (build ledger for the not-releasable tag). Consumed by [SN-REL-004](release.md#sn-rel-004); shares the artifact string scanner with [SN-REL-011](release.md#sn-rel-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-016

<a id="sn-rel-016"></a>

**Build the in-app What's new sheet, About panel and update prompts**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, settings, onboarding |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-REL-003](release.md#sn-rel-003), [SN-REL-002](release.md#sn-rel-002), [SN-DS-003](design-system.md#sn-ds-003), [SN-SET-001](settings.md#sn-set-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `MASVS-PLATFORM-3`, `CWE-200`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
Users need three small things from a release: to know what changed, to tell support exactly which build they are on, and to be nudged (never forced) onto a newer version when theirs is no longer supported - `SECURITY.md` states that only the latest released minor version per platform receives security fixes, which is meaningless if a user cannot tell what they are running. The design's Settings screen (`docs/design/screens-and-flows.md` §12) has six tabs but no About row and no What's new surface, and no PRD requirement covers them, so this issue **decides** the design within the existing system rather than inventing a new screen: a dismissible What's new sheet on first launch after an update, an About block in Settings -> Account & plan, and platform-appropriate, non-blocking update prompts. The hard constraint is local-first: the release notes are **bundled**, not fetched, because a notes-fetch would be a new network egress requiring an ADR and a threat-model row (CLAUDE.md §7 rule 4).

#### Scope
**In:** the What's new sheet (content from the bundled `assets/release_notes/<locale>.json` generated by [SN-REL-003](release.md#sn-rel-003)); the Settings About block (version + build + short SHA + flavour from [SN-REL-002](release.md#sn-rel-002), 'What's new', open-source notices, Terms/Privacy links, Send feedback hook from [SN-REL-007](release.md#sn-rel-007)); the supported-version notice; Android flexible in-app update prompt; the web 'Update available - Reload' affordance handshake with [SN-REL-008](release.md#sn-rel-008); iOS soft prompt behaviour.
**Out:** generating the notes ([SN-REL-003](release.md#sn-rel-003)); the OSS licence list generation (from the SBOM, [SN-CI-004](ci-cd.md#sn-ci-004)); the web deploy mechanics ([SN-REL-008](release.md#sn-rel-008)); the feedback composer itself ([SN-REL-007](release.md#sn-rel-007)); the Settings shell ([SN-SET-001](settings.md#sn-set-001)).

#### Acceptance criteria
- [ ] On first launch after the build number increases, a **dismissible, non-blocking** sheet shows the current release's notes; it never appears on a fresh install (first run goes to Onboarding per `docs/design/screens-and-flows.md` §5), never appears twice for the same build, and can be permanently disabled with 'Don't show this again'.
- [ ] The sheet never blocks note-taking: it is dismissible with Escape/back/outside-tap, and appears only on the Library screen, never over the Editor mid-session.
- [ ] Settings -> Account & plan shows an **About** block with app version, build number, short commit SHA, flavour, and platform/OS - selectable and copyable in one tap for support, with a `Semantics` label reading the full string.
- [ ] Release notes are read from the bundled asset; the app makes **zero network requests** to render What's new or About (asserted by a test that fails on any egress).
- [ ] Locale: notes render in the active locale with an explicit `en` fallback; RTL locales lay out correctly ([SN-I18N-001](i18n.md#sn-i18n-001)).
- [ ] Android: a **flexible** (background-download, user-confirmed) in-app update prompt appears when Play reports an available update whose priority is 4+ ([SN-REL-006](release.md#sn-rel-006)); it is never immediate/blocking, and declining leaves the app fully usable offline.
- [ ] Web: the 'Update available - Reload' affordance from [SN-REL-008](release.md#sn-rel-008) appears as a non-focus-stealing bar, is keyboard reachable, and never reloads while an editor has unsaved local state.
- [ ] iOS/iPadOS: no forced update; a soft, dismissible notice appears only when the running version is below the bundled minimum-supported-version marker, with a link to the App Store - and the check works offline (it reads bundled metadata, not a server).
- [ ] All surfaces render correctly in **all 17 looks and in light + dark**, meet 4.5:1 contrast, use 44 pt / 48 dp targets, and are fully keyboard operable on web.

#### Technical notes
UI lives in `app/lib/release/` using components from `sane_ui` ([SN-DS-003](design-system.md#sn-ds-003)) and tokens from `docs/design/tokens.json` - no hardcoded colours or sizes (CLAUDE.md §9). State is a Riverpod provider comparing the stored 'last seen build' (a small preference, not note data) with `SANE_BUILD_ID` from [SN-REL-002](release.md#sn-rel-002); preferences follow the per-profile settings store ([SN-SET-001](settings.md#sn-set-001)) so one profile's dismissal does not silently apply to another unless the setting is device-scoped by design - pick device-scoped for 'Don't show again' and document it. The bundled notes asset is produced by [SN-REL-003](release.md#sn-rel-003) at build time and declared in `pubspec.yaml` assets. The OSS notices screen renders the licence list derived from the CycloneDX SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)) at build time - also bundled, also no network. Android in-app updates use the Play Core in-app update API via a thin plugin or the existing platform channel layer ([ADR-0012](docs/adr/0012-native-plugin-strategy.md)); guard it behind a capability query so non-Play distributions degrade silently. The minimum-supported-version marker is a build-time constant, so the supported-version notice cannot become a remote kill switch - a remote disable of an offline-first notes app would violate the product promise and is explicitly out of scope.

#### Security & privacy
Threats: a release-notes or update check becoming a silent phone-home that profiles users (LINDDUN-Linkability, MASVS-PRIVACY-3, and a violation of the 'no data collected' declaration in [SN-PRV-015](privacy.md#sn-prv-015)) - prevented by bundling everything and by an automated no-egress test; a remote kill switch or forced update locking a user out of their own local notes (availability/user-autonomy; contradicts CLAUDE.md §1 local-first) - prevented by build-time-only markers and flexible-only updates; **information disclosure** through the About block (CWE-200) - it exposes version, build, short SHA, flavour and OS only: never a device identifier, account email, file path, token or notebook name, and the short SHA is public information about a public commit; an insecure store link (MASVS-NETWORK-1) - all outbound links are HTTPS and open in the system browser/store app, never an in-app WebView (MASVS-PLATFORM-3); running an unsupported, unpatched version unknowingly (CWE-1104) - the supported-version notice is the mitigation. Baseline: no note content, ink, or PII in any of these surfaces or their logs.

#### UX notes
Anchor to the design: the sheet reuses the overlay pattern and dimmed backdrop from `docs/design/screens-and-flows.md` §1 (like Templates/Share overlays, z-20, click-outside to close - unlike Onboarding, this one *does* dismiss on outside click), with the Sage mark from `sane_ui` at the top, a short headline, plain bullets, and a single 'Got it' primary action plus a quiet 'Don't show this again'. The About block sits at the bottom of the **Account & plan** tab (§12) under 'Sign out', styled as quiet metadata rows. Copy follows the product voice (§16): plain, specific, no marketing. States: empty (no notes for this build -> do not show the sheet at all), offline (everything works; the update prompt simply does not appear), error (a malformed notes asset falls back to 'See what's new on the website' without crashing). Accessibility: `Semantics` labels on every control, focus order top-to-bottom, Escape/back dismisses, Dynamic Type respected, and the sheet is announced as a dialog to VoiceOver/TalkBack. Golden-test every look and both modes.

#### Test plan
`app/test/release/whats_new_provider_test.dart`: shows once per build increase, never on fresh install, never twice, honours 'Don't show again', and handles a missing/malformed asset. `app/test/release/about_panel_test.dart`: renders the build id, copy action works, and the rendered text contains no path/email/token (regex assertion). `app/test/release/no_egress_test.dart`: rendering both surfaces performs zero HTTP calls (fake HTTP overrides that fail the test on any request). Widget tests for dismissal paths and keyboard/Escape handling. Golden tests `app/test/golden/whats_new_<look>_<mode>.png` across the 17 looks and light/dark ([SN-QA-005](qa.md#sn-qa-005)). `app/integration_test/update_prompt_test.dart`: Android flexible-update flow with a faked availability response; web reload affordance with a simulated service-worker update. Manual: VoiceOver and TalkBack passes on both surfaces.

#### Dependencies
[SN-REL-003](release.md#sn-rel-003) (bundled notes), [SN-REL-002](release.md#sn-rel-002) (build id), [SN-DS-003](design-system.md#sn-ds-003) (components), [SN-SET-001](settings.md#sn-set-001) (Settings shell); integrates with [SN-REL-006](release.md#sn-rel-006) (update priority), [SN-REL-008](release.md#sn-rel-008) (web update), [SN-REL-007](release.md#sn-rel-007) (Send feedback), [SN-CI-004](ci-cd.md#sn-ci-004) (OSS notices from SBOM).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-REL-017

<a id="sn-rel-017"></a>

**Inventory release secrets and define the rotation runbook**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | release, security, ci-cd |
| Size | S |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-CI-006](ci-cd.md#sn-ci-006), [SN-CI-009](ci-cd.md#sn-ci-009), [SN-CI-014](ci-cd.md#sn-ci-014) |
| Security controls | `SSDF-PS.1`, `SSDF-PO.5`, `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `OWASP-A02`, `OWASP-A07`, `OWASP-A08`, `CWE-798`, `CWE-522`, `CWE-532` |
| Extra labels | agent-ready, needs-credentials |

#### Context
The release pipeline is the only place in this project that holds high-value credentials: store signing and upload keys, App Store Connect and Play service-account keys, the web deploy token, and the production OAuth client IDs/secrets that `docs/architecture/overview.md` §7.1 says come from CI secrets at build time. `docs/security/devsecops-pipeline.md` §5 states the policy (no secrets in the repo, OIDC over static credentials, Play App Signing so Google holds the app signing key, rotate on suspicion, gated `release` environment) and §6 step 3 makes rotation an incident-containment action - but there is no list of what exists, who owns it, where it lives, or how to rotate it. Under incident pressure, 'rotate the affected credential' is unactionable without that list. CLAUDE.md §13 also notes these are all maintainer-supplied and not yet issued, so this issue both defines the inventory and gives the maintainer the checklist to populate it.

#### Scope
**In:** `docs/release/secrets-inventory.md` (one row per secret: id, purpose, holder/owner, storage, scope, rotation period, revocation procedure, blast radius, OIDC alternative status); the `release` environment protection configuration; a CI check that every `secrets.*` reference in the release workflows appears in the inventory and vice versa; the rotation runbook and a rehearsed rotation of one credential; the rule set for what must never be a client-side secret.
**Out:** signing mechanics ([SN-CI-022](ci-cd.md#sn-ci-022), [SN-CI-023](ci-cd.md#sn-ci-023)); secret scanning ([SN-CI-006](ci-cd.md#sn-ci-006)); token permissions ([SN-CI-009](ci-cd.md#sn-ci-009)); app-side key storage, which is a different problem entirely ([SN-CRY-002](security.md#sn-cry-002), `sane_secure_store`).

#### Acceptance criteria
- [ ] The inventory lists at minimum: Android upload key / Play App Signing enrolment, Play service-account JSON (release-manager scope, read-only variant for [SN-REL-012](release.md#sn-rel-012)), App Store Connect API key (.p8 content, issuer id, key id), Apple team id and notarization credentials, the web deploy token, the production `SANE_GOOGLE_CLIENT_ID` / `SANE_MS_CLIENT_ID` / `SANE_APPLE_SERVICES_ID`, and any payment/entitlement provider keys used at build time (`PRD-BILL-010/011`).
- [ ] Each row states rotation cadence (default: annually, or immediately on suspicion) and a step-by-step revocation procedure that a fresh agent could follow.
- [ ] The `release` environment has required reviewers and is the only environment exposing these secrets; no release secret is available to a `pull_request`-triggered job.
- [ ] A CI check fails when a workflow references a secret that is not in the inventory, or the inventory lists a secret no workflow uses (stale credential detection).
- [ ] No secret value, and no key material, appears in the repo, in build artifacts, in logs, or in a Flutter `--dart-define` that ends up in a shipped binary as a *secret* - the inventory explicitly separates public client IDs (which may ship) from secrets (which may not), noting that Dart AOT is reversible (`docs/platform/ipad.md` L5, `docs/platform/android.md` L6).
- [ ] One credential is rotated as a rehearsal and the actual steps and duration are recorded in the runbook.
- [ ] The inventory is CODEOWNERS-protected (it lives under `docs/release/` but is referenced from `/docs/security/`, so the Security Owner reviews changes) and contains **no** secret values - only identifiers, owners and locations.
- [ ] Where the provider supports OIDC (deploy targets, cloud services), the row records whether OIDC is in use and, if not, why not and when it will be.

#### Technical notes
Store secrets as GitHub Actions **environment** secrets on `release` (not repository secrets) so the environment gate is the access boundary; the check script (`tools/scripts/secrets_inventory.dart`) parses `.github/workflows/*.yml` for `secrets.` references and diffs them against the inventory table parsed from markdown - keep the table machine-parseable (fixed column order, one row per secret, stable ids like `SEC-PLAY-SA`). Play App Signing means Google holds the app signing key and we hold only an upload key, which materially shrinks the blast radius - record that distinction explicitly, along with what happens if the upload key is lost (Play's key-reset process) versus the App Store signing certificate (revoke and reissue). Notarization and App Store Connect keys are per-team, not per-app: the row must say so, because rotation affects any other app on the team. Production OAuth client IDs are injected at build time via `--dart-define` per `docs/architecture/overview.md` §7.1; client *secrets* must never be in a public client - the rows for Google/Microsoft/Apple must state the PKCE-based public-client posture referenced by `PRD-AUTH-002` and [SN-AUTH-002](auth.md#sn-auth-002). Rotation during an incident follows `docs/security/devsecops-pipeline.md` §6 step 3, including revoking provenance trust and reviewing recent releases for tampering.

#### Security & privacy
Threats: **hardcoded or committed credentials** (CWE-798, OWASP-A08) - prevented by the policy plus gitleaks/trufflehog ([SN-CI-006](ci-cd.md#sn-ci-006)) and push protection; **credential exposure through logs or artifacts** (CWE-532) - masking, no `--verbose` in release lanes, and a check that no artifact contains a key-shaped string ([SN-REL-015](release.md#sn-rel-015) shares the scanner); **over-scoped or stale credentials** (OWASP-A07, CWE-522 insufficiently protected credentials) - least-privilege store roles, read-only variants where possible, and the stale-credential detection in CI; **signing-key compromise** allowing a malicious build to be published under our identity (MASVS-RESILIENCE-2, SSDF PS.1/PO.5) - Play App Signing custody, hardware-backed/Apple-held certificates, gated environment, and a rehearsed revocation; **shipping a secret inside the client** (MASVS-STORAGE-1, MASVS-CRYPTO-2, OWASP-A02) - the public-vs-secret separation rule, enforced by the artifact scan. Privacy: the inventory itself holds no personal data; owner names are recorded by role ('Maintainer / Security Owner' per `docs/security/ssdlc-process.md` §1), not personal contact details.

#### UX notes
No end-user surface. The runbook is the UX and it will be read in an emergency: put the revocation steps for the highest-blast-radius credentials first, keep each procedure to a numbered list that fits one screen, state the expected duration of each step, and name the console/URL where it happens. The inventory table must be scannable - a maintainer should be able to answer 'what do I rotate if the CI runner is compromised?' in under a minute. None beyond baseline (no logging of content, tokens only).

#### Test plan
`tools/test/secrets_inventory_test.dart`: the workflow-vs-inventory diff detects a referenced-but-unlisted secret and a listed-but-unused secret; the inventory parser rejects a row missing owner/rotation/revocation. A repo scan test asserts no credential-shaped file (`*.p8`, `*.keystore`, `*.jks`, service-account JSON, `*.mobileprovision`) exists anywhere in the tree. A release dry run confirms release secrets are unavailable to a `pull_request`-triggered workflow (attempt and expect failure). Rehearsal: rotate one low-risk credential (for example the web deploy token) end to end and record the timing; re-run the pipeline to prove nothing broke.

#### Dependencies
[SN-CI-006](ci-cd.md#sn-ci-006) (secret scanning), [SN-CI-009](ci-cd.md#sn-ci-009) (least-privilege token/permissions), [SN-CI-014](ci-cd.md#sn-ci-014) (signing umbrella that consumes these credentials). Supports [SN-REL-004](release.md#sn-rel-004), [SN-REL-005](release.md#sn-rel-005), [SN-REL-006](release.md#sn-rel-006), [SN-REL-008](release.md#sn-rel-008), [SN-REL-012](release.md#sn-rel-012), [SN-REL-014](release.md#sn-rel-014). Maintainer must issue the credentials.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

