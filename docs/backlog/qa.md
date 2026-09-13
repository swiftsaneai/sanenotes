# Backlog — area: qa

32 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-QA-001](qa.md#sn-qa-001) **Quality & testing engineering** (epic · M0 Foundations)
  - [SN-QA-002](qa.md#sn-qa-002) **Author the test strategy and test-pyramid document** · p1 · docs · M · M0 Foundations
  - [SN-QA-003](qa.md#sn-qa-003) **Establish the headless unit-test layer for pure-Dart packages** · p1 · test · M · M0 Foundations
  - [SN-QA-004](qa.md#sn-qa-004) **Establish the widget-test layer and shared test utilities** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-QA-005](qa.md#sn-qa-005) **Build the golden-test harness across 17 looks and light/dark** · p1 · test · L · M1 Ink Editor Alpha
  - [SN-QA-006](qa.md#sn-qa-006) **Establish the integration_test and patrol end-to-end harness per platform** · p1 · test · L · M1 Ink Editor Alpha
  - [SN-QA-007](qa.md#sn-qa-007) **Define and enforce per-package code-coverage gates** · p1 · infra · M · M0 Foundations
  - [SN-QA-008](qa.md#sn-qa-008) **Define the flaky-test policy and quarantine automation** · p2 · infra · M · M1 Ink Editor Alpha
  - [SN-QA-009](qa.md#sn-qa-009) **Set up the cloud device farm for functional and integration runs** · p2 · infra · L · M5 Phones & Platform Parity
  - [SN-QA-010](qa.md#sn-qa-010) **Define the bug-triage process, severity taxonomy and report templates** · p2 · docs · M · M1 Ink Editor Alpha
  - [SN-QA-011](qa.md#sn-qa-011) **Build test-data factories and deterministic synthetic fixtures** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-QA-012](qa.md#sn-qa-012) **Implement multi-device convergence and fault-injection tests for sync** · p0 · test · L · M4 Identity, Sync & Privacy
  - [SN-QA-013](qa.md#sn-qa-013) **Curate the fuzz corpus and the crash-to-regression-test pipeline** · p1 · test · M · M3 Audio & Recognition
  - [SN-QA-014](qa.md#sn-qa-014) **Author per-milestone manual test plans and exploratory charters** · p2 · docs · L · M1 Ink Editor Alpha
  - [SN-QA-015](qa.md#sn-qa-015) **Define the beta rings, tester cohorts and privacy-safe feedback intake** · p2 · task · M · M7 Beta Hardening & Security Audit
  - [SN-QA-016](qa.md#sn-qa-016) **Define the release QA checklist and the go/no-go release gate** · p1 · docs · M · M7 Beta Hardening & Security Audit
  - [SN-GIPAD-012](qa.md#sn-gipad-012) **Author the iPad editor conformance checklist and enforce it as a PR gate** · p1 · test · M · M5 Phones & Platform Parity
  - [SN-GUX-015](qa.md#sn-gux-015) **Add screen and overlay golden coverage across looks and dark mode** · p1 · test · L · M2 Library & Documents
  - [SN-GOPS-001](qa.md#sn-gops-001) **Turn the roadmap milestone exit criteria into a tracked gate register** · p2 · task · M · M0 Foundations

---

## Issues

### SN-AND-032

<a id="sn-and-032"></a>

**Golden-test the Impeller Vulkan and legacy-GL Android render paths**

| Field | Value |
|---|---|
| GitHub | #497 |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | qa, compat |
| Size | S |
| SDLC | verification |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-005](ink.md#sn-and-005), [SN-AND-027](perf.md#sn-and-027) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-CODE-4` |
| Extra labels | agent-ready |

#### Context
docs/platform/android.md §10 records limitation **L5**: Impeller is the default on API 29+ via Vulkan and **auto-falls back to legacy OpenGL (Skia)** on older or non-Vulkan devices, and the mitigation it prescribes is explicit — "Golden-test both paths; keep GL fallback in Tier B; low-end 4 GB device is a CI gate". §3 makes that GL path the Tier-B pure-Flutter render for devices without a usable native front-buffer, and docs/platform/compatibility-matrix.md §3 puts Android 10–12 arm64 (where the low-end reference lives) and all of `armeabi-v7a` on it. Today nothing proves a stroke, a highlighter multiply blend, a textured brush or a themed surface looks the same on both backends, so a Vulkan-only golden suite can stay green while the GL fallback ships visibly wrong colours. [SN-AND-027](perf.md#sn-and-027) covers performance on the low-end device; this issue covers **visual parity**, closing the L5 mitigation.

#### Scope
**In:** a golden harness that renders one fixture set under both Impeller/Vulkan and the forced legacy-GL fallback and compares the pairs; the fixture set (a pressure/tilt stroke, a highlighter multiply blend over ink, a textured brush, a dashed shape, a text run, a template page background, and one screen of editor chrome); running the pair across all 17 looks in light and dark; wiring it into CI on the Android-lowend and Android-tablet-stylus device-lab slots; a documented pixel tolerance and a triage path for a legitimate backend difference.
**Out:** performance, fps and memory on the low-end device ([SN-AND-027](perf.md#sn-and-027)); the golden infrastructure and the per-look golden convention ([SN-DS-002](design-system.md#sn-ds-002), [SN-QA-001](qa.md#sn-qa-001) area); the ink surface implementation ([SN-AND-002](ink.md#sn-and-002), [SN-AND-005](ink.md#sn-and-005)); iPad and web render paths (SN-IPAD-001, SN-WEB-001).

#### Acceptance criteria
- [ ] CI executes **both** runs: the default Impeller/Vulkan run and a run forced onto the legacy-GL fallback via the engine's disable flag; each run logs the backend it actually used and the test **fails** if the intended backend was not the one in use, so a silently-Vulkan "GL" run can never pass.
- [ ] The fixture set renders in all 17 looks × light/dark on both backends, and every pair matches within a documented tolerance (default: ≤ 0.5 % of pixels differing by more than 2/255 per channel) held in one named constant with a comment explaining the number.
- [ ] A deliberately introduced regression — for example changing the highlighter blend mode — fails the GL run as well as the Vulkan run; the PR records that this was actually exercised, not assumed.
- [ ] A failure uploads side-by-side and diff images as CI artifacts so a reviewer can judge a legitimate backend difference in under a minute.
- [ ] Any accepted backend difference is recorded per-fixture in docs/platform/android.md §10 L5 with a scoped allowance — never by widening the global tolerance.
- [ ] The suite runs on the Android-lowend slot (4 GB, Snapdragon 680-class, Android 10–13) and the Android-tablet-stylus slot and completes inside the device-lab CI job budget.

#### Technical notes
Goldens live beside the painted code: `packages/sane_render/test/goldens/` for ink and brush surfaces, `app/test/goldens/` for chrome, following the per-look golden convention from [SN-DS-002](design-system.md#sn-ds-002). Execution uses the `tools/device_lab` configs for the two Android slots and the on-device runner from `tools/perf_harness`. Flutter picks Impeller/Vulkan by default on API 29+; the GL fallback is reached with the engine's disable flag or on a device without a usable Vulkan driver — assert the effective backend at test start rather than trusting the flag. Fixtures must be deterministic: fixed seeds, fixed stroke sample arrays from `packages/sane_ink` test data, no wall-clock or animation-dependent frames. Governing decisions: ADR-0008 (ink pipeline and low-latency surfaces) and ADR-0001 (the Flutter single-codebase bet this parity check defends); tier definitions in docs/platform/compatibility-matrix.md §1 and §3.

#### Security & privacy
None beyond baseline — no new data flow, no network egress, no persistence, no credentials needed by the job. The baseline still binds: golden fixtures are **synthetic** and MUST NOT contain real note content, real handwriting samples from a device, user names or any PII (MASVS-PRIVACY-1, CLAUDE.md §7.3), because CI artifacts including diff images are uploaded and retained. The harness logs no ink coordinates or note content. The device-lab job pins every dependency it pulls and adds no new third-party action, keeping the supply-chain posture unchanged (MASVS-CODE-4, docs/security/devsecops-pipeline.md).

#### UX notes
No user-visible surface — but the fixture set **is** the UX contract, so it must cover all 17 looks in light and dark exactly as docs/design/design-system.md requires of anything painted, and include one chrome screen (the Editor from docs/design/screens-and-flows.md §7 with the palette dock docked at the bottom) so token colours, elevation, dividers and the focus ring are compared and not just ink. Include at least one high-contrast look in the set so a backend colour shift that breaks a ≥ 4.5:1 contrast pair fails the suite rather than reaching a user with low vision (docs/design/accessibility.md). Fixture names in the golden files read as their look name so a reviewer sees immediately which look regressed.

#### Test plan
`packages/sane_render/test/goldens/impeller_backend_parity_test.dart` (fixture definitions, the pair comparison, the effective-backend assertion, the tolerance constant); `app/test/goldens/editor_chrome_backend_parity_test.dart` (the chrome screen across looks on both backends); `tools/device_lab/android_lowend.yaml` and `tools/device_lab/android_tablet_stylus.yaml` updated to run the pair; a job in `.github/workflows/` that uploads side-by-side and diff artifacts on failure; and a manual pass on a Tier-3 `armeabi-v7a` device confirming the GL path renders the fixture set correctly, recorded in the PR.

#### Dependencies
[SN-AND-005](ink.md#sn-and-005) (Tier A/B capability selection decides which devices land on the GL path), [SN-AND-027](perf.md#sn-and-027) (the low-end device is already wired into the device lab and CI).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] docs/platform/android.md §10 L5 updated: the mitigation is implemented, with any accepted per-fixture differences listed
- [ ] docs/platform/compatibility-matrix.md §7 release-gate summary references the parity suite
- [ ] Reviewed against docs/security/secure-coding-checklist.md (fixtures carry no real user data)

---

### SN-BTY-044

<a id="sn-bty-044"></a>

**Assemble the labelled messy-handwriting corpus with synthetic tremor**

| Field | Value |
|---|---|
| GitHub | #1188 |
| Type | test |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | qa, ocr-hwr, a11y |
| Size | L |
| SDLC | verification |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-HWR-020](ocr-hwr.md#sn-hwr-020), [SN-QA-011](qa.md#sn-qa-011) |
| Security controls | `MASVS-PRIVACY-1`, `GDPR-Art6` |
| Extra labels | agent-ready |

#### Context
Every claim beautification makes — "more legible", "still looks like you", "never changes meaning" — is unfalsifiable without a corpus. [SN-HWR-020](ocr-hwr.md#sn-hwr-020) already builds recognition-accuracy datasets for the recogniser; this issue extends that harness with the data beautification specifically needs: **messy** handwriting across bands of legibility, across scripts and input devices, plus synthetically degraded samples where the clean ground truth is known exactly so improvement can be measured rather than eyeballed.

Synthetic degradation is the key trick. Recording genuinely tremulous or dysgraphic handwriting at scale is slow and ethically heavy; taking clean samples and applying a parameterised, seeded degradation (band-limited tremor, size jitter, baseline drift, slant jitter, gap jitter) gives thousands of items whose *correct* output is literally the pre-degradation sample.

#### Scope
**In:** the corpus contents, manifest and licensing/consent record; the seeded degradation generator; the shared loader; human legibility ratings and their reliability check; CI fetch/verify plumbing.
**Out:** the metrics computed over it ([SN-BTY-045](qa.md#sn-bty-045)); the CI gate ([SN-BTY-046](ci-cd.md#sn-bty-046)); the do-not-correct adversarial set ([SN-BTY-038](ocr-hwr.md#sn-bty-038)), which uses this loader but has its own labels.

#### Acceptance criteria
- [ ] ≥ 2,000 labelled lines from ≥ 40 writers, stratified into **5 legibility bands**, covering ≥ 4 scripts (Latin, Devanagari, Arabic/RTL, CJK), stylus **and** finger input, phone **and** tablet capture, and left- and right-handed writers.
- [ ] A seeded degradation generator produces tremor (band-limited 3–12 Hz with amplitude and coherence parameters), size jitter, baseline drift, slant jitter and gap jitter; identical seed ⇒ byte-identical output; every generated item links to its clean source.
- [ ] Every item carries: raw `InkSample` stream with `tMicros`, ground-truth text, writer id, script, device/pointer kind, handedness, condition tags, and a **human legibility rating** (5-point).
- [ ] Human ratings use ≥ 3 raters per item with inter-rater reliability **Krippendorff α ≥ 0.7**; items below threshold are re-rated or dropped, and α is recorded in the manifest.
- [ ] Provenance: every item is synthetic **or** carries a recorded consent and licence entry; zero real user notes without one; a fixture-integrity test fails the build on a missing field.
- [ ] Corpus is content-addressed and versioned; CI verifies hashes before use; it is **excluded from the app bundle** and from any release artifact (asserted by a bundle-size/content test).
- [ ] A fast PR subset (≤ 200 items, ≤ 90 s) and a full nightly set are both defined and selectable by the runner.
- [ ] Documented in docs/product/ and referenced from the beautification section so a new agent can regenerate the synthetic half from scratch.

#### Technical notes
Layout: `tools/eval/beautify_corpus/{clean,degraded,phone,scripts}/` with a top-level `manifest.json` (schema versioned) and per-item JSON in the `InkSample` shape of docs/architecture/ink-engine.md §1.2. Generator in `tools/eval/bin/degrade_ink.dart` (pure Dart, seeded `Random`), sharing the tremor synthesis model with [SN-BTY-040](a11y.md#sn-bty-040)'s tests so the generator and the fixer cannot silently diverge. Loader in `packages/sane_ml/test/support/beautify_corpus.dart` built on the deterministic fixture factories from [SN-QA-011](qa.md#sn-qa-011). Large binaries are fetched by a CI step with hash verification, never committed raw if they exceed the repo policy.

#### Security & privacy
Handwriting samples are personal data and are handwriting-biometric-adjacent. Store consent records with the fixtures; support withdrawal (an item can be removed and the baseline re-cut); never ship the corpus in a build; never send it anywhere. The runner logs item ids and aggregate counts only — no recognised text, no sample coordinates (CWE-117). Real-writer items are pseudonymised by writer id with the mapping kept out of the repo. GDPR/DPDP lawful-basis note recorded with the DPIA template ([SN-PRV-013](privacy.md#sn-prv-013)).

#### UX notes
None beyond baseline — internal evaluation asset. One indirect user-facing requirement: the corpus must include the writing of people with tremor and dysgraphia (synthetic at minimum, consented real samples where available from the accessibility sessions of [SN-GA11-025](a11y.md#sn-ga11-025)), or the accessibility claims of [SN-BTY-040](a11y.md#sn-bty-040)/[SN-BTY-041](a11y.md#sn-bty-041) cannot be substantiated.

#### Test plan
`tools/eval/test/degrade_ink_test.dart` (determinism, parameter ranges, clean↔degraded linkage), `packages/sane_ml/test/support/beautify_corpus_test.dart` (loader, stratification counts, manifest schema), a fixture-integrity test asserting consent/licence/ground-truth completeness, and a release test asserting the corpus is absent from built artifacts.

#### Dependencies
SN-HWR-020 (recognition eval harness this extends), SN-QA-011 (deterministic fixture factories). Consumed by [SN-BTY-038](ocr-hwr.md#sn-bty-038), [SN-BTY-045](qa.md#sn-bty-045), [SN-BTY-046](ci-cd.md#sn-bty-046), [SN-BTY-047](ocr-hwr.md#sn-bty-047).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/product/prd-02-library-documents-audio-search.md §11, docs/security/threat-model.md)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, recognised text, style features or ink coordinates in logs

---

### SN-BTY-045

<a id="sn-bty-045"></a>

**Define the beautification quality bar: legibility, consistency and accuracy metrics**

| Field | Value |
|---|---|
| GitHub | #1189 |
| Type | test |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | qa, ocr-hwr, perf |
| Size | M |
| SDLC | verification |
| Parent | [SN-BTY-001](ocr-hwr.md#sn-bty-001) |
| Depends on | [SN-BTY-044](qa.md#sn-bty-044), [SN-HWR-020](ocr-hwr.md#sn-hwr-020) |
| Security controls | — |
| Extra labels | agent-ready, innovation |

#### Context
"Neater" is a feeling. To gate a feature in CI we need numbers, and they must be numbers that correlate with what a human means by legible — otherwise we optimise a metric and ship worse handwriting. This issue defines the beautification quality bar: a small set of automatic metrics, each validated against the human ratings collected in [SN-BTY-044](qa.md#sn-bty-044), emitted as one machine-readable report that [SN-BTY-046](ci-cd.md#sn-bty-046) turns into a gate.

The headline metric is deliberately indirect: **recognition accuracy before vs after**. If tidying really made the writing more legible, an independent on-device recogniser should read it better. It is cheap, objective, hard to game by cosmetic means, and it doubles as a safety check — a beautification that *lowers* recognition accuracy is almost certainly destroying information.

#### Scope
**In:** the metric definitions and implementations; their validation against human ratings; the composite legibility score and its weights; the report schema and renderer.
**Out:** the corpus ([SN-BTY-044](qa.md#sn-bty-044)); the CI gate and baselines ([SN-BTY-046](ci-cd.md#sn-bty-046)); the style-similarity metric, which is owned by [SN-BTY-047](ocr-hwr.md#sn-bty-047) and consumed here.

#### Acceptance criteria
- [ ] **M1 Recognition-accuracy proxy:** CER and WER of the on-device recogniser before vs after beautification. Beautification MUST NOT reduce accuracy on any band; target **≥ 8 points WER improvement** on the two messiest bands.
- [ ] **M2 Baseline straightness:** RMS deviation of word centroids from the per-line least-squares baseline, normalised by x-height.
- [ ] **M3 Slant consistency:** circular standard deviation of per-letter principal-axis angle.
- [ ] **M4 Size consistency:** coefficient of variation of x-height across a line.
- [ ] **M5 Spacing regularity:** CV of inter-word gaps plus a bimodality score separating intra- from inter-word gaps.
- [ ] **M6 Ink preservation:** fraction of original sample points lying within ε (default 1.5 × stroke half-width) of the beautified centreline — proves we tidied rather than redrew; a re-rendered word scores low and must be flagged, not silently accepted.
- [ ] **M7 Style similarity:** imported from [SN-BTY-047](ocr-hwr.md#sn-bty-047) and reported alongside the rest.
- [ ] **M8 Cost:** wall-clock per word and per page, and peak memory delta, per reference device tier.
- [ ] Each metric is a pure function with unit tests on synthetic inputs whose correct value is known analytically (e.g. a perfectly straight line scores 0 on M2).
- [ ] **Validation gate:** each retained metric correlates with human legibility ratings at Spearman ρ ≥ 0.6 on the corpus; a metric that fails is either fixed or removed and the rejection recorded in the report and the docs — we do not keep decorative metrics.
- [ ] The composite legibility score is a documented, version-stamped weighting of M2–M5; changing the weights changes the version and forces a baseline re-cut.
- [ ] One `beautify_quality_report.json` artifact per run plus a Markdown summary table suitable for a CI job summary, including the 10 worst before/after cases by composite delta.

#### Technical notes
Implement in `packages/sane_ml/lib/src/beautify/metrics/` as pure Dart (no `package:flutter`) so they run headless in CI: `baseline.dart`, `slant.dart`, `size.dart`, `spacing.dart`, `ink_preservation.dart`, `composite.dart`. Geometry helpers (least-squares fitting, principal axis, point-to-polyline distance) already exist in `packages/sane_ink` §7/§9 — reuse them, do not fork. M1 runs the registered on-device `InkRecognizer` ([SN-HWR-002](ocr-hwr.md#sn-hwr-002)); in the PR-scope job use the deterministic mock plus a recorded reference transcription so the job is hermetic, and use the real ML Kit adapter ([SN-HWR-003](ocr-hwr.md#sn-hwr-003)) in the nightly device-lab run. Report schema versioned and validated in-test.

#### Security & privacy
None beyond baseline. Enforce one rule strictly: the report contains **ids, scores and rendered before/after images of corpus items only** — never user content, never recognised text from a real note. Metric code must not log sample coordinates (CWE-117). Rendered artifacts are corpus-derived and inherit its consent record ([SN-BTY-044](qa.md#sn-bty-044)).

#### UX notes
None beyond baseline (internal). The composite score does surface indirectly in two places and must be stable enough for both: the first-run "this would help you" heuristic ([SN-BTY-051](onboarding.md#sn-bty-051)) and the accessibility profile recommendations ([SN-BTY-042](a11y.md#sn-bty-042)).

#### Test plan
`packages/sane_ml/test/beautify/metrics/*_test.dart` — one file per metric with analytic fixtures; `packages/sane_ml/test/beautify/metric_validation_test.dart` asserting the ρ ≥ 0.6 correlation against human ratings; `packages/sane_ml/test/beautify/report_schema_test.dart`; a determinism test (same input ⇒ identical report).

#### Dependencies
SN-BTY-044 (corpus and human ratings), SN-HWR-020 (recogniser eval plumbing). Feeds [SN-BTY-046](ci-cd.md#sn-bty-046); consumes [SN-BTY-047](ocr-hwr.md#sn-bty-047).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner, dependency-review)
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/product/prd-02-library-documents-audio-search.md §15, docs/adr/0016-on-device-ml-and-ai.md)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; no note content, recognised text, style features or ink coordinates in logs

---

### SN-CORE-024

<a id="sn-core-024"></a>

**Build CRDT convergence property-based test harness**

| Field | Value |
|---|---|
| GitHub | #199 |
| Type | test |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | qa, sync |
| Size | L |
| SDLC | verification |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-008](sync.md#sn-core-008), [SN-CORE-009](sync.md#sn-core-009), [SN-CORE-010](sync.md#sn-core-010) |
| Security controls | `MASVS-RESILIENCE-3`, `OWASP-A04`, `ASVS-V11`, `CWE-707` |
| Extra labels | agent-ready, innovation |

#### Context
[ADR-0005](docs/adr/0005-document-model-and-crdt.md) names the hand-built CRDT as the highest-risk single component and mandates a convergence test harness (property-based + differential + fuzz) as an early M0 deliverable, mirroring Peritext's proof obligations. Without it, a subtle merge bug ships as silent, unrecoverable data loss. This harness is the safety net every subsequent CRDT change runs against and is an M0 exit-criterion enabler.

#### Scope
**In:** a property-based test framework (random op generators per model) asserting the CRDT laws — **convergence** (all replicas that see the same op-set reach identical folded state regardless of delivery order), **commutativity**, **idempotence** (re-delivery is a no-op), and **causal safety** (add-wins, no resurrection within the model's rules); a **differential** harness comparing our fold against an independent reference model for scripted cases; a **fuzz** generator producing large randomised multi-replica op interleavings with shrinking on failure.
**Out:** on-disk format fuzzing ([SN-CORE-026](storage.md#sn-core-026)) and performance benchmarking ([SN-CORE-027](perf.md#sn-core-027)).

#### Acceptance criteria
- [ ] For OR-Set, LWW, movable-list, movable-tree and Peritext, a randomised test with ≥ 3 simulated replicas and ≥ 10,000 generated op sequences per run shows byte-identical folded state across replicas (canonical CBOR hash equality).
- [ ] Commutativity: shuffling delivery order never changes the result; idempotence: delivering any op twice never changes the result.
- [ ] Add-wins is proven: a concurrent draw-vs-erase converges to the stroke **present**; a move-cycle converges to a valid acyclic tree.
- [ ] Failures shrink to a minimal reproducing op script and are printed deterministically (seeded) so a CI failure is reproducible locally.
- [ ] The harness runs in CI on every `sane_core` change and completes within the CI time budget (seeded, bounded iterations).

#### Technical notes
`packages/sane_core/test/crdt/convergence_property_test.dart`, `differential_test.dart`, `fuzz/op_generators.dart`. Use a property-testing approach (e.g. `glados`/`fast_check`-style generators; confirm package in [SN-CORE-013](storage.md#sn-core-013) or hand-roll seeded generators). Depends on [SN-CORE-003](sync.md#sn-core-003), [SN-CORE-008](sync.md#sn-core-008), [SN-CORE-009](sync.md#sn-core-009), [SN-CORE-010](sync.md#sn-core-010). Reference model kept intentionally simple/independent to catch shared-code bugs. Hash equality uses the canonical CBOR + hasher seam.

#### Security & privacy
Threats: adversarial op interleavings causing divergence or unbounded memory (CWE-707); silent replica divergence (MASVS-RESILIENCE-3) is the core risk this mitigates. Controls: the harness itself is the control (proves convergence/idempotence), plus resource bounds on generated inputs. OWASP-A04, ASVS V11. Generated content is synthetic — no real note data.

#### UX notes
None beyond baseline. This test suite is what lets us honestly promise "your stroke never vanishes and your edit is never clobbered" — the trust story in [ADR-0004](docs/adr/0004-local-first-zero-server.md).

#### Test plan
This issue *is* the test plan; deliverables are the harness files above plus a CI job wiring. A seeded regression corpus of previously-failing scripts is kept under `packages/sane_core/test/crdt/fuzz/corpus/`.

#### Dependencies
[SN-CORE-003](sync.md#sn-core-003), [SN-CORE-008](sync.md#sn-core-008), [SN-CORE-009](sync.md#sn-core-009), [SN-CORE-010](sync.md#sn-core-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-012

<a id="sn-dim-012"></a>

**Build the layout golden harness that renders screens across the whole matrix**

| Field | Value |
|---|---|
| GitHub | #1127 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | qa, compat |
| Size | L |
| SDLC | verification |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-QA-005](qa.md#sn-qa-005), [SN-DIM-002](compat.md#sn-dim-002) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
[SN-QA-005](qa.md#sn-qa-005) builds the golden harness across the 17 looks × light/dark at a canonical size; [SN-GUX-015](qa.md#sn-gux-015) covers composed screens at two frames × five looks. Neither iterates the **device/viewport matrix**. To prove "reliable for all the types of dimensions," the golden harness must render key screens across every row of [SN-DIM-002](compat.md#sn-dim-002) (size, DPR, insets, fold state, orientation) crossed with light/dark, so a dimensional regression is caught by pixel diff on every PR.

#### Scope
**In:** a `layoutMatrix(builder, {name})` helper that wraps [SN-QA-005](qa.md#sn-qa-005)'s `goldenMatrix` and loops the [SN-DIM-002](compat.md#sn-dim-002) rows (and the synthetic sweep from [SN-DIM-003](compat.md#sn-dim-003) on the nightly job), applying each row's `MediaQueryData` (size, devicePixelRatio, viewPadding/padding, displayFeatures, orientation) via a test wrapper; render the key surfaces — Library, Editor (dock at each edge, audio bar states), Search, Settings, and each overlay — at a representative look-per-family × light/dark; write goldens under `app/test/goldens/dimensions/<screen>/<device>-<orientation>-<mode>.png`; a PR gate on a curated core subset and a nightly job over the full matrix with a diff artifact.
**Out:** the pass/fail overflow/clip/occlusion *assertions* ([SN-DIM-013](qa.md#sn-dim-013)); overflow-assertion promotion ([SN-DIM-014](qa.md#sn-dim-014)); the look-only matrix ([SN-QA-005](qa.md#sn-qa-005)); text-scale ([SN-DIM-041](compat.md#sn-dim-041)) and DPR-crispness ([SN-DIM-016](design-system.md#sn-dim-016)) which extend this harness.

#### Acceptance criteria
- [ ] `layoutMatrix` renders any registered screen across all shipped rows of [SN-DIM-002](compat.md#sn-dim-002) in both orientations × light/dark, deterministically (fonts preloaded, animations off, clock/DPR pinned) — two runs are byte-identical.
- [ ] The core PR subset (Editor, Library at ~6 representative rows incl. iPhone 15, iPad Pro 11", a 320×480 sliver, a Z Fold unfolded, an ultrawide, a low-DPI Android) runs within the PR time budget; the full matrix runs nightly and publishes diffs on failure.
- [ ] Adding a device row in [SN-DIM-002](compat.md#sn-dim-002) (or a projected row in [SN-DIM-003](compat.md#sn-dim-003)) produces new goldens with no harness code change.
- [ ] The Z Fold unfolded row applies a 24 pt hinge display feature to the `MediaQueryData`, and the iPhone 15 row applies the 59/34 pt insets, so goldens exercise real insets/features.
- [ ] Fixtures are synthetic (pinned seed, no real PII) per [SN-GUX-015](qa.md#sn-gux-015)'s fixture rule.
- [ ] The matrix treats size class × orientation × inset/cutout/hinge profile × text scale as independent axes drawn from [SN-DIM-002](compat.md#sn-dim-002), and the same data-driven set feeds the per-release device-farm run ([SN-DIM-053](qa.md#sn-dim-053)).

#### Technical notes
Build on [SN-QA-005](qa.md#sn-qa-005) (`goldenMatrix`, `FontLoader`, pinned CI image) and [SN-QA-004](qa.md#sn-qa-004) `pumpApp`; drive screens through their real routes with Riverpod overrides. Construct `MediaQueryData(size, devicePixelRatio, padding, viewPadding, displayFeatures, textScaler)` per row; `displayFeatures` carries the hinge/cutout. Keep run time bounded via the one-look-per-family heuristic (`ux-principles.md` §9.3) on the PR subset. Run on the pinned Linux CI image to avoid AA drift.

#### Security & privacy
Goldens are committed UI images: fixtures must be synthetic only — no real names/emails/phones/notebook content/share links/tokens (use the `sane.app/n/…` placeholder); a DoD check rejects a dev-bypass watermark in a golden (LINDDUN disclosure, MASVS-PRIVACY-1), mirroring [SN-GUX-015](qa.md#sn-gux-015).

#### UX notes
This harness is the visual contract for "no issue in the design on every dimension." Diff artifacts are side-by-side and easy to read. It pairs with the look matrix ([SN-QA-005](qa.md#sn-qa-005)) so both theme and dimension regressions are caught.

#### Test plan
`app/test/support/layout_matrix.dart` + `layout_matrix_test.dart` (determinism, row application, hinge/inset injection); exemplar suites for Editor and Library; a `goldens-dimensions-nightly` CI job over the full matrix. Consumed by [SN-DIM-013](qa.md#sn-dim-013), [SN-DIM-041](compat.md#sn-dim-041), [SN-DIM-016](design-system.md#sn-dim-016).

#### Dependencies
[SN-QA-005](qa.md#sn-qa-005), [SN-DIM-002](compat.md#sn-dim-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-013

<a id="sn-dim-013"></a>

**Fail CI on overflow, clipping or occlusion across the layout matrix**

| Field | Value |
|---|---|
| GitHub | #1128 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | qa, compat, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-DIM-012](qa.md#sn-dim-012), [SN-DIM-006](editor.md#sn-dim-006) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Rendering the matrix ([SN-DIM-012](qa.md#sn-dim-012)) is not enough; CI must **fail** when a dimension causes a control to overflow its bounds, be clipped off-screen, or be occluded by a cutout, hinge, or another surface. A golden pixel-diff catches visual change but not semantic "this button is now half off-screen." This issue adds automated structural assertions over every matrix cell so a real dimensional break blocks merge — the enforcement half of the epic.

#### Scope
**In:** per matrix cell ([SN-DIM-012](qa.md#sn-dim-012)), assert: no `RenderFlex`/render overflow; every interactive element's rect lies fully inside the viewport minus the keep-out rects from [SN-DIM-005](design-system.md#sn-dim-005) (no control under a cutout/island/home-indicator/hinge/rounded corner); no element is clipped by an ancestor to zero size; and a defined set of **must-be-visible** elements (primary action, the "data leaves device" indicator, PRO/consent chrome, a locked-note veil, the focus-exit pill) are present, hit-testable, and unoccluded. A CI job runs this over the PR subset and nightly over the full matrix, emitting a readable per-cell report.
**Out:** the rendering harness ([SN-DIM-012](qa.md#sn-dim-012)); runtime overflow-assertion promotion for all tests ([SN-DIM-014](qa.md#sn-dim-014)); text-scale-specific overflow ([SN-DIM-041](compat.md#sn-dim-041)).

#### Acceptance criteria
- [ ] A seeded regression (a toolbar button placed under the Dynamic Island, or a dock overlapping the home indicator) fails the gate with a message naming the screen, device row, and the occluded element.
- [ ] Any `RenderFlex` overflow in any matrix cell fails the gate (not just a golden diff).
- [ ] Every interactive element's global rect is asserted inside viewport-minus-keepout for all shipped rows; a control landing under a cutout/hinge fails.
- [ ] The must-be-visible set (primary action, data-leaves-device indicator, consent/PRO gate chrome, lock veil, focus-exit pill) is asserted present and unoccluded on every relevant screen/row; hiding one fails the gate.
- [ ] The gate runs in the verification workflow on the PR subset and nightly on the full matrix, with a per-cell pass/fail artifact.
- [ ] With the on-screen keyboard up (`viewInsets` bottom > 0), the active field and its action controls remain fully visible and unoccluded; a failure names the control key, the viewport, and the region (inset/cutout/hinge) that occluded it.

#### Technical notes
Use `tester` element/rect introspection (`tester.getRect`, `RenderBox` bounds, `hitTest`) over the widgets rendered by [SN-DIM-012](qa.md#sn-dim-012); capture Flutter overflow via the mechanism from [SN-DIM-014](qa.md#sn-dim-014). Keep-out rects come from [SN-DIM-005](design-system.md#sn-dim-005); must-be-visible tags are semantic keys on the widgets (privacy chrome tagged for this assertion). No device checks (enforced by [SN-DIM-004](design-system.md#sn-dim-004)). Reference `docs/security/secure-coding-checklist.md` for the privacy-chrome list.

#### Security & privacy
Directly privacy-relevant: this gate is what guarantees the "data leaves device" indicator, consent/opt-in prompts, and a locked-note veil can never be pushed off-screen or hidden behind a cutout/hinge/other surface by any dimension or posture — a LINDDUN disclosure / consent-integrity control (privacy-by-design). Fixtures synthetic only.

#### UX notes
This is the objective definition of "no issue in the design": if any control on any dimension is off-screen, clipped, or hidden, the build is red. It turns the maintainer's requirement into an enforceable gate rather than a hope.

#### Test plan
`app/test/goldens/dimensions/occlusion_gate_test.dart` — rect-in-keepout and must-be-visible assertions per cell; negative fixtures (occluded button, RenderFlex overflow, hidden indicator) fail; a `dimensions-gate` CI job (PR subset + nightly full). Builds on [SN-DIM-012](qa.md#sn-dim-012).

#### Dependencies
[SN-DIM-012](qa.md#sn-dim-012), [SN-DIM-006](editor.md#sn-dim-006)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-014

<a id="sn-dim-014"></a>

**Promote Flutter overflow and layout assertions to hard test failures**

| Field | Value |
|---|---|
| GitHub | #1197 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | qa, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-QA-004](qa.md#sn-qa-004) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Flutter reports layout overflow (the yellow-and-black stripe / "A RenderFlex overflowed by N pixels") as a `FlutterError` that, in tests, is often swallowed or only printed. For a product that must be correct on every dimension, any overflow anywhere — not just in the layout matrix — should fail the test that produced it. This issue wires overflow and other layout assertions to hard failures across the whole widget/golden suite, so dimensional bugs cannot slip through a test that "passed."

#### Scope
**In:** a shared test harness hook (extending [SN-QA-004](qa.md#sn-qa-004) `pumpApp`) that installs a `FlutterError.onError`/`FlutterExceptionHandler` which converts `RenderFlex` overflow, `RenderConstrainedOverflowBox`, and "cannot be negative"/unbounded-constraint layout errors into test failures; an opt-out annotation for the rare intentional overflow (documented, reviewed); a lint/CI note so new widget tests inherit the hook by default. Applies to `app/` and `packages/*` widget + golden tests.
**Out:** the matrix rect/occlusion assertions ([SN-DIM-013](qa.md#sn-dim-013)); the golden harness ([SN-DIM-012](qa.md#sn-dim-012)); runtime (non-debug) overflow behaviour.

#### Acceptance criteria
- [ ] A widget test that produces a `RenderFlex` overflow fails, with the failure message including the overflow amount and widget, when run through the shared harness.
- [ ] Unbounded-constraint and negative-size layout errors also fail the test rather than only printing.
- [ ] The hook is on by default for `pumpApp`-based tests; a documented `allowOverflow(reason:)` escape hatch suppresses a single expected case and is reported.
- [ ] Existing suites are migrated to the hook; the verification CI job treats a captured layout error as a failure.
- [ ] A negative fixture proves the hook catches a deliberate 10 px overflow.

#### Technical notes
In the test binding, set `FlutterError.onError` to record and rethrow overflow/layout errors; `RenderFlex` overflow surfaces via `FlutterError` with a specific message prefix — match on the error's `RenderObject`/diagnostics rather than string-only where possible. Integrate into `app/test/support/pump_app.dart` ([SN-QA-004](qa.md#sn-qa-004)). Document in `docs/qa/test-strategy.md`. This complements [SN-DIM-013](qa.md#sn-dim-013): 014 catches overflow in *every* test; 013 adds occlusion/visibility across the *matrix*.

#### Security & privacy
None beyond baseline: test-infrastructure only; no content or PII involved.

#### UX notes
No user surface. It is a guardrail ensuring the "no issue in the design" bar is enforced everywhere a widget is tested, not only in the dedicated dimension suite.

#### Test plan
`app/test/support/overflow_guard_test.dart` — a deliberate overflow fails; an `allowOverflow` case passes and is reported; a clean layout passes. Wired into `pumpApp` and the CI verification job.

#### Dependencies
[SN-QA-004](qa.md#sn-qa-004)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-038

<a id="sn-dim-038"></a>

**Build the foldable, orientation and resize continuity test matrix**

| Field | Value |
|---|---|
| GitHub | #1141 |
| Type | test |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, ios-phone, android-phone, web |
| Areas | qa, compat, perf |
| Size | L |
| SDLC | verification |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-DIM-021](compat.md#sn-dim-021), [SN-PHN-017](compat.md#sn-phn-017), [SN-DIM-027](compat.md#sn-dim-027), [SN-DIM-030](compat.md#sn-dim-030), [SN-QA-001](qa.md#sn-qa-001), [SN-PERF-004](perf.md#sn-perf-004) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
The foldable/resize/orientation work (SN-DIM-021..037) needs one shared, enforced test matrix so "reliable for all dimensions" is verified continuously, not spot-checked. This issue builds the golden + integration + perf harness that exercises fold postures, rotations, live resize, multi-window and process-death across a defined device/viewport list, and wires it into CI under the quality epic (SN-QA-001) and the device lab (SN-PERF-004).

#### Scope
**In:**
- A golden layout matrix over an explicit viewport/posture list.
- Integration tests for fold/unfold, rotation, live resize, multi-window and process death (reusing the tests authored in SN-DIM-021..037 as a suite).
- A perf assertion for the resize/rotation workloads on Tier 1 slots.
- CI wiring so a regression in any dimension fails the build.

**Out:**
- The features themselves (SN-DIM-021..037).
- Google Play large-screen/foldable store-quality submission ([SN-GAND-006](release.md#sn-gand-006), M7) — this feeds it but is separate.

#### Acceptance criteria
- [ ] A golden matrix `app/test/golden/layout_matrix_test.dart` renders the editor and library at, at minimum: 320/375 dp phones, iPhone 18-class 402x874 & 440x956 pt, iPad Air 820x1180 pt, iPad Pro 1032x1376 pt (portrait+landscape), Pixel 9 Pro Fold 968x2376 cover & 2076x2152 inner, Z Fold6 968x2376 & 2160x1856, a tabletop half-opened posture, and Split View 320/507/981 pt widths.
- [ ] Golden coverage includes text scale at 100%, 130%, 200% and 310% for at least the compact and expanded editor.
- [ ] Integration suite `app/integration_test/` runs fold_posture, fold_continuity, rotation_continuity, resize_continuity, midstroke_config_change, multi_window and process_death_restore and passes on the CI emulator/simulator set (functional/golden only; latency gates excluded on emulators per performance-budgets.md §3).
- [ ] A perf test asserts the resize and rotation workloads hold B4/B5 (no frame > 16.7 ms; >= 120 fps on 120 Hz) on the Tier 1 device slots via tools/perf_harness.
- [ ] The matrix documents the device/viewport list in docs/platform (single source of truth) and fails CI on any missing or broken golden.
- [ ] Hinge-occlusion assertions verify no interactive control intersects the hinge band on every foldable profile.

#### Technical notes
Build on Flutter golden tests (`flutter test --update-goldens` workflow, `matchesGoldenFile`) with a parameterised list of `Size` + `devicePixelRatio` + `displayFeatures` + `textScaler`. Inject synthetic `MediaQueryData.displayFeatures` for hinge/posture (no physical device needed for goldens). Integration tests via `integration_test` + `patrol` for real fold (`adb emu fold`) and process death. Perf via the SN-PERF harness (FrameTiming / long-animation-frame, performance-budgets.md §2) on the SN-PERF-004 device lab. Emulators run functional/golden only, never latency gates (performance-budgets.md §3). Wire all into `.github/workflows`.

#### Security & privacy
None beyond baseline. Test fixtures use synthetic notes, never real user content; no secrets in fixtures.

#### UX notes
This is the safety net behind the maintainer's promise that the app is "reliable for all the types of dimensions." Golden diffs make any layout regression on any device visible in review. Reference docs/platform/compatibility-matrix.md §5.

#### Test plan
This issue IS the test infrastructure. Self-verifying: the goldens and integration/perf suites must be green on the CI device set, and an intentionally introduced layout break (e.g. a control under the hinge) must make the suite fail (a negative test proves the matrix has teeth).

#### Dependencies
Depends on SN-DIM-021, SN-PHN-017, SN-DIM-027, SN-DIM-030 (the features it exercises), SN-QA-001 (quality/testing) and SN-PERF-004 (device lab). Feeds [SN-GAND-006](release.md#sn-gand-006) and [SN-GA11-024](a11y.md#sn-ga11-024). Parent SN-DIM-001.

#### Definition of done
- [ ] Golden + integration + perf matrix merged and green on the CI device/emulator set
- [ ] A negative test proves the matrix catches a hinge-occlusion / off-screen-control regression
- [ ] Device/viewport list documented in docs/platform and referenced from CLAUDE.md test guidance
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DIM-051

<a id="sn-dim-051"></a>

**Golden-test the degraded looks on the low-end tier across 17 looks and dark mode**

| Field | Value |
|---|---|
| GitHub | #1151 |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone, web |
| Areas | qa, design-system, perf |
| Size | S |
| SDLC | verification |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-DIM-050](design-system.md#sn-dim-050), [SN-QA-005](qa.md#sn-qa-005), [SN-AND-027](perf.md#sn-and-027) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
The reduced-effects degradation profile ([SN-DIM-050](design-system.md#sn-dim-050)) is only trustworthy if it is pixel-verified and proven to hit the frame budget on the actual low-end reference. This issue adds the golden coverage for every look's reduced variant and ties it to a frame-budget check on the 4 GB Snapdragon 680-class device ([SN-AND-027](perf.md#sn-and-027)), so a change that reintroduces an expensive effect on the low tier fails CI. It extends the [SN-QA-005](qa.md#sn-qa-005) 17-looks golden harness with the reduced profile as an additional axis.

#### Scope
**In:** golden diffs for all 17 looks × light/dark in the reduced profile; a low-end frame-budget assertion that the reduced profile sustains 60 fps where the full profile would not; regression coverage.
**Out:** the profile definition ([SN-DIM-050](design-system.md#sn-dim-050)), the ladder mechanism ([SN-PERF-023](perf.md#sn-perf-023)), the general looks harness ([SN-QA-005](qa.md#sn-qa-005)).

#### Acceptance criteria
- [ ] A golden exists for each of the 17 looks × {light, dark} in the reduced profile; diffs are stable and reviewed.
- [ ] On Android-lowend, a scripted scroll/write workload in the reduced profile sustains **≥ 60 fps** with zero frames > 16.7 ms, where the same workload in the full profile is allowed to miss.
- [ ] The test asserts no `BackdropFilter`/glow effect is present in the reduced golden (visual + widget-tree check).
- [ ] Contrast is re-verified AA on each reduced golden.
- [ ] A regression that raises effect cost on the low tier (e.g. re-adds a blur) fails the golden or the fps assertion.
- [ ] Reduced-profile goldens are wired into the nightly device-lab run.

#### Technical notes
Reuse the [SN-QA-005](qa.md#sn-qa-005) golden harness and pump with `reduced: true` on `SaneLookScope`. Frame-budget check via `flutter drive --profile` + `FrameTiming` on Android-lowend from [SN-AND-027](perf.md#sn-and-027); emulators run the golden diffs only, not the fps gate (`docs/platform/performance-budgets.md` §3). Store goldens under `app/test/golden/reduced_looks/`.

#### Security & privacy
None beyond baseline; goldens use synthetic content.

#### UX notes
Confirms each look stays recognisable and legible when degraded — no look becomes an unstyled grey box on a cheap phone.

#### Test plan
`app/test/golden/reduced_looks_matrix_test.dart` (17 × 2); `tools/perf_harness` low-end fps job in the reduced profile; nightly integration into the [SN-PERF-019](perf.md#sn-perf-019) dashboard.

#### Dependencies
[SN-DIM-050](design-system.md#sn-dim-050), [SN-QA-005](qa.md#sn-qa-005), [SN-AND-027](perf.md#sn-and-027).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, golden, perf gate, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-053

<a id="sn-dim-053"></a>

**Add a per-release device-farm job that runs the layout matrix on real and virtual devices**

| Field | Value |
|---|---|
| GitHub | #1152 |
| Type | infra |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | qa, compat, ci-cd |
| Size | L |
| SDLC | verification |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-QA-009](qa.md#sn-qa-009), [SN-PERF-004](perf.md#sn-perf-004), [SN-DIM-012](qa.md#sn-dim-012) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Golden tests catch layout defects in a headless renderer, but real devices expose real safe-area insets, real fold postures, real font renderers, and real browser reflow that a simulated `MediaQuery` cannot. This issue adds a per-release job on the [SN-QA-009](qa.md#sn-qa-009) device farm plus emulators/simulators that runs the [SN-DIM-012](qa.md#sn-dim-012) layout matrix on actual and virtual hardware, so a new OS or a real cutout that breaks a screen is caught before release. It reuses the [SN-PERF-004](perf.md#sn-perf-004) device-lab definitions.

#### Scope
**In:** a scheduled per-release-candidate device-farm run of the layout matrix across the Tier 1/2 device set (real) and a virtual-device set (emulators/simulators for coverage); screenshot capture and diff/triage; a release gate hook.
**Out:** the farm setup itself ([SN-QA-009](qa.md#sn-qa-009)), the matrix definition ([SN-DIM-012](qa.md#sn-dim-012)), latency/fps gates (owned by perf issues), the viewport registry ([SN-DIM-002](compat.md#sn-dim-002)).

#### Acceptance criteria
- [ ] The job runs the layout matrix on real Tier 1 devices (iPad-Pro-ProMotion, iPad-Air, Android-tablet-stylus, Android-lowend, iPhone-ref, a foldable, Web-Chrome-desktop) and a virtual-device set each release candidate.
- [ ] Real-device runs use each device's *actual* safe-area/cutout/hinge insets, not simulated ones, and flag any control that lands under a real inset.
- [ ] Screenshots are captured per device × screen and diffed against approved references with a triage workflow.
- [ ] Emulators/simulators are used for breadth (extra viewports/OS versions) but are explicitly excluded from any latency/fps assertion (`docs/platform/performance-budgets.md` §3).
- [ ] A layout regression on any Tier 1 real device is a **release blocker** wired into the go/no-go gate ([SN-QA-016](qa.md#sn-qa-016)).
- [ ] The device/viewport set consumed by the job is the [SN-DIM-002](compat.md#sn-dim-002) registry, so it extends by data.

#### Technical notes
Extend the [SN-QA-009](qa.md#sn-qa-009) cloud/self-hosted farm and [SN-PERF-004](perf.md#sn-perf-004) device-lab configs; drive via `integration_test`/`patrol` screenshot capture on device and `flutter test` goldens on emulators; foldable postures via the emulator/real-device hinge sensor. Store references and diffs as CI artifacts feeding the [SN-PERF-019](perf.md#sn-perf-019) dashboard pattern. Web runs across the [SN-WEB-023](qa.md#sn-web-023) cross-browser matrix.

#### Security & privacy
Device-farm artifacts (screenshots) use synthetic fixtures only — never real user notes; scrub any device identifiers from logs.

#### UX notes
The last line of defence before release: a human sees every screen on every reference device and a diff flags anything off, so the shipped build has no dimension surprises.

#### Test plan
The job itself is the test asset (`tools/device_lab/jobs/layout_matrix_farm.yaml` + `app/integration_test/layout_matrix_capture_test.dart`); a dry-run on one real device and one emulator validates the pipeline; gate integration verified against [SN-QA-016](qa.md#sn-qa-016).

#### Dependencies
[SN-QA-009](qa.md#sn-qa-009), [SN-PERF-004](perf.md#sn-perf-004), [SN-DIM-012](qa.md#sn-dim-012).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, integration, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-012

<a id="sn-gipad-012"></a>

**Author the iPad editor conformance checklist and enforce it as a PR gate**

| Field | Value |
|---|---|
| GitHub | #986 |
| Type | test |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | qa, editor, docs |
| Size | M |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-IPAD-010](compat.md#sn-ipad-010), [SN-IPAD-012](input-gestures.md#sn-ipad-012), [SN-IPAD-013](input-gestures.md#sn-ipad-013), [SN-QA-006](qa.md#sn-qa-006) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready |

#### Context
iPad is the flagship surface, but the editor issues that define the product ([SN-ED-002](editor.md#sn-ed-002) canvas, [SN-ED-005](editor.md#sn-ed-005) palette dock, [SN-ED-026](editor.md#sn-ed-026) gestures, [SN-ED-004](editor.md#sn-ed-004) lasso, [SN-ED-013](editor.md#sn-ed-013) text tool, [SN-PG-005](pages-canvas.md#sn-pg-005) viewport) are written platform-neutrally and carry few or no iPad-specific acceptance criteria. Those issues are already published and cannot be rewritten, so the gap has to be closed the way platform teams normally close it: with **one conformance checklist that every editor-touching change is measured against**, plus an automated slice of it. Without this, "works on iPad" keeps meaning "worked in the simulator with a mouse", and the Pencil/keyboard/pointer/window-size matrix of docs/platform/ipad.md §7 and docs/design/gestures-and-shortcuts.md §3 and §6 is verified by nobody.

#### Scope
**In:** `docs/platform/ipad-editor-conformance.md` — a numbered checklist covering input (Pencil Pro / Pencil 2 / USB-C Pencil / finger / Magic Keyboard / trackpad / mouse), palm rejection and precedence order, keyboard-shortcut and menu-bar parity, pointer hover and right-click parity for every long-press menu, window sizes (full screen, 1/2 and 1/3 Split View, Slide Over, Stage Manager, external display), orientation change, left-handed mode, Dynamic Type and VoiceOver, and the latency/fps budget references; a PR-template section and a CODEOWNERS-backed reminder for changes under the editor packages; an automated subset run in CI (`integration_test` at four window sizes plus a synthetic-input replay) and a documented manual subset for what CI cannot reach; a per-release sign-off record.
**Out:** the device-lab latency gate itself ([SN-IPAD-025](perf.md#sn-ipad-025)); Pencil capability degradation testing ([SN-IPAD-029](compat.md#sn-ipad-029)); the general integration harness ([SN-QA-006](qa.md#sn-qa-006)) — this issue consumes it.

#### Acceptance criteria
- [ ] The checklist exists, is linked from docs/platform/ipad.md and CONTRIBUTING.md, and every item states an observable pass condition (not "looks right").
- [ ] The PR template gains an "iPad conformance" section that a PR touching `packages/sane_editor`, `packages/sane_ink`, `packages/sane_ui` or the iOS plugins must fill in; CI fails the PR when the section is missing for those paths.
- [ ] The automated subset runs on a real iPad in CI at four window sizes and asserts: no chrome overlaps the safe area or the Pencil hover zone, the dock stays reachable in Slide Over, every `⌘` shortcut in docs/design/gestures-and-shortcuts.md §6 resolves to an action, and every long-press menu has a right-click equivalent.
- [ ] The manual subset is a single page a tester can complete in under 30 minutes, with a results table stored per release ([SN-QA-016](qa.md#sn-qa-016)).
- [ ] Running the checklist against the current build produces a list of real defects filed as issues — the checklist proves itself on first use.
- [ ] Left-handed mode, RTL and Dynamic Type at 200% are each an explicit checklist row ([SN-A11Y-005](a11y.md#sn-a11y-005), [SN-A11Y-012](a11y.md#sn-a11y-012)).

#### Technical notes
Reuse the deterministic synthetic-input replay ([SN-PERF-005](perf.md#sn-perf-005)) to drive Pencil-like events where hardware is unavailable, and `patrol` for native dialogs. Window sizes are set through scene resizing in the integration harness; where iPadOS blocks programmatic resize, the checklist marks the row manual. Keep the checklist versioned alongside the docs so a change in gesture grammar updates it in the same PR.

#### Security & privacy
Verification artefacts must contain no note content: screenshots captured by failing tests come from synthetic fixtures only, and CI artefacts are retention-limited (MASVS-PRIVACY-1 spirit). Conformance includes one security row: locked-notebook chrome must not render content before the gate ([SN-SEC-020](security.md#sn-sec-020)).

#### UX notes
The checklist encodes the design system's iPad rules (dock edges, hover zone, menu-bar parity, focus ring) so design review and QA argue from the same document. Failures should link to the design source (docs/design/screens-and-flows.md §7) rather than to opinion.

#### Test plan
The deliverable is itself test infrastructure: `integration_test/ipad_conformance_test.dart` (automated subset), `tools/pr_gate/ipad_conformance_check.mjs` (template enforcement) with unit tests, and the manual page. Dry-run the gate on a sample PR before enabling it as required.

#### Dependencies
[SN-IPAD-010](compat.md#sn-ipad-010), [SN-IPAD-012](input-gestures.md#sn-ipad-012), [SN-IPAD-013](input-gestures.md#sn-ipad-013), [SN-QA-006](qa.md#sn-qa-006).

#### Definition of done
- [ ] Document + gate merged, CI green (markdown lint, link check, issues-validate)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md cross-links the new page
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GOPS-001

<a id="sn-gops-001"></a>

**Turn the roadmap milestone exit criteria into a tracked gate register**

| Field | Value |
|---|---|
| GitHub | #1097 |
| Type | task |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | qa, docs, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-FND-015](ci-cd.md#sn-fnd-015), [SN-QA-002](qa.md#sn-qa-002) |
| Security controls | `SSDF-PO.1`, `SSDF-PW.8`, `OWASP-A09` |
| Extra labels | agent-ready |

#### Context
`docs/roadmap.md` gives every milestone M0-M8 an **Exit criteria** checklist (perf gates, security gates, "no note content leaves the device", "store privacy declarations accurate"), and `docs/security/ssdlc-process.md` §2 gives every SDLC phase an exit gate. Neither is tracked anywhere machine-readable: the criteria live in prose, nothing links a criterion to the issue that satisfies it or to the evidence that it held, and nothing stops a milestone being declared done with an unmet gate. [SN-QA-014](qa.md#sn-qa-014) derives *manual test plans* from the same checklists and [SN-QA-016](qa.md#sn-qa-016) / [SN-REL-013](release.md#sn-rel-013) gate a *release*, but a milestone can close months before a release. This issue makes milestone closure evidenced and auditable.

#### Scope
**In:** `docs/qa/milestone-gates.yaml` — one row per roadmap exit criterion with a stable id (`GATE-M2-03`), the criterion text, the owning issue key(s), the evidence kind (CI job name, perf budget id, test file, document, sign-off) and status; `scripts/validate-gates.mjs` checking that every roadmap criterion appears, every referenced issue key exists in `issues/*.json`, and no gate row is orphaned; a `.github/ISSUE_TEMPLATE/milestone-close.yml` that renders the milestone's gates as a sign-off checklist; the gate table rendered into `docs/backlog/` by `scripts/render-issues.mjs`.
**Out:** the release go/no-go checklist ([SN-REL-013](release.md#sn-rel-013), [SN-QA-016](qa.md#sn-qa-016)); the manual test plans ([SN-QA-014](qa.md#sn-qa-014)); the perf budget registry itself ([SN-PERF-018](perf.md#sn-perf-018)); changing any roadmap criterion.

#### Acceptance criteria
- [ ] Every exit criterion in `docs/roadmap.md` M0-M8 exists as a row in `milestone-gates.yaml` with an id, owning issue key(s) and an evidence kind.
- [ ] `node scripts/validate-gates.mjs` exits non-zero on: a roadmap criterion with no row, a row citing an unknown issue key, a row with no evidence kind.
- [ ] The validator runs in the issues-schema CI job ([SN-FND-015](ci-cd.md#sn-fnd-015)) on every PR touching `docs/roadmap.md` or `issues/*.json`.
- [ ] Closing a milestone requires the generated checklist issue with a recorded sign-off (Maintainer per `ssdlc-process.md` §1) and an evidence link per gate.
- [ ] The rendered gate table appears in `docs/backlog/` and states, per milestone, how many gates are evidenced.

#### Technical notes
Mirror `scripts/validate-issues.mjs`: plain Node 22, no dependencies, exit 1 on error and warn on unresolved future keys so the register can be written before the owning issues exist. Parse roadmap criteria from the `- [ ]` bullets under each `**Exit criteria**` heading; match on a normalised hash of the criterion text so re-wording is detected as drift rather than silently dropped. Reuse the issue key index from `validate-issues.mjs` rather than re-parsing.

#### Security & privacy
This is the audit trail for the security gates themselves (SSDF PO.1/PW.8; OWASP-A09 logging and monitoring failures applied to process evidence): without it, "pentest P0/P1 fixed or risk-accepted" (M7) or "no note content leaves the device" (M1) can be asserted without proof. The register holds no user data; it must not embed credentials, staging URLs or unpublished advisory detail (CWE-200) — evidence links point at CI runs and documents, never at raw artefacts containing user content.

#### UX notes
Developer-facing only. The rendered `docs/backlog/milestone-gates.md` table uses the same column style as the rendered backlog; the milestone-close issue template groups gates by SDLC phase so the reviewer reads requirements-first. No app UI, no design tokens involved.

#### Test plan
`tools/test/validate_gates_test.mjs` with fixture roadmaps: (1) all criteria mapped -> exit 0; (2) a criterion missing from the register -> exit 1 with the criterion text in the message; (3) an unknown issue key -> exit 1; (4) a re-worded criterion -> drift error. Manual: run against the current `docs/roadmap.md` and confirm the report lists exactly the criteria that have no owning issue yet.

#### Dependencies
[SN-FND-015](ci-cd.md#sn-fnd-015) (issues-schema CI job to hang the validator on), [SN-QA-002](qa.md#sn-qa-002) (test strategy defines the evidence vocabulary).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Every M0-M8 gate row has an owning issue key or an explicit `unassigned` marker


---

### SN-GUX-015

<a id="sn-gux-015"></a>

**Add screen and overlay golden coverage across looks and dark mode**

| Field | Value |
|---|---|
| GitHub | #1054 |
| Type | test |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | ipad, android-tablet, web |
| Areas | qa, design-system, theming |
| Size | L |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-005](qa.md#sn-qa-005), [SN-DS-027](design-system.md#sn-ds-027) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context

Golden coverage today stops at the component boundary and at two screens: [SN-DS-027](design-system.md#sn-ds-027) captures `sane_ui` components across the 17 looks, [SN-QA-005](qa.md#sn-qa-005) builds the harness, [SN-LIB-028](library.md#sn-lib-028) covers the Library, [SN-PHN-020](qa.md#sn-phn-020) covers compact phone layouts. Nothing captures the **composed screens and overlays** that `design-system.md` §"Screens" calls the proven token sheets — Login, Who's writing, Onboarding, Library, Editor, Templates, Share/Import/Upgrade, Search, Settings, rendered at the 1180×820 iPad-landscape reference frame. Composition is exactly where look regressions appear: a 26 px Claymorphism radius colliding with a 132 px page rail, Brutalism's 2 px borders doubling along the sidebar seam, Y2K's translucent surfaces stacking three deep under an overlay, Editorial's uppercase headings overflowing the Upgrade plan cards.

#### Scope

**In:** golden sets at the 1180×820 reference frame plus one medium (840 dp) frame for: Login (methods, phone, OTP), Profiles, Onboarding steps 0–2, Editor (dock at each of the four edges; audio bar idle / recording / has-recording; selection bar; text-edit bar; focus mode), Search (results, Ask panel, no results), Settings (all six tabs), and the five overlays (Templates new and page mode, Import with the free meter, Share, Upgrade yearly and monthly). Default gate: one look per family (Paper, Minimalism, Pop, Neumorphism, Brutalism) × light/dark. Nightly: the full 17 looks for a smoke subset (Library, Editor, Upgrade). Deterministic fixtures — pinned date and greeting, fixed notebook seed, fixed strokes, fixed audio duration, fixed locale — plus Free and Pro variants wherever the plan changes the UI.

**Out:** the harness ([SN-QA-005](qa.md#sn-qa-005)), component goldens ([SN-DS-027](design-system.md#sn-ds-027)), Library internals ([SN-LIB-028](library.md#sn-lib-028)), compact phone layouts ([SN-PHN-020](qa.md#sn-phn-020)), on-device screenshot and device-farm runs ([SN-QA-006](qa.md#sn-qa-006), [SN-QA-009](qa.md#sn-qa-009)), and wallpaper-mode goldens ([SN-DS-014](theming.md#sn-ds-014) owns those).

#### Acceptance criteria

- [ ] Every screen and overlay listed above has committed goldens for the five representative looks × light/dark at both frames, and the file paths follow the [SN-QA-005](qa.md#sn-qa-005) convention.
- [ ] Two consecutive CI runs on an unchanged tree produce byte-identical images (fonts preloaded, animations disabled, `devicePixelRatio` and clock pinned).
- [ ] The nightly 17-look job completes within a documented budget and publishes a diff artifact on failure.
- [ ] Free and Pro variants are captured for Library (sidebar card), Import (meter), Share (people limit) and Upgrade.
- [ ] A seeded token change (one look's `rs`) fails the gate with a readable side-by-side diff.
- [ ] The `--update-goldens` review flow is documented, and a PR updating goldens must state why in its description.

#### Technical notes

Build on `goldenMatrix` from [SN-QA-005](qa.md#sn-qa-005); drive screens through their real routes with Riverpod overrides supplying the seeded repositories from [SN-QA-011](qa.md#sn-qa-011) so goldens exercise real composition rather than stub widgets. Keep CI time bounded by the family-representative default (`ux-principles.md` §9.3 justifies it: if it reads in one look per family, it reads in all seventeen) and push the exhaustive sweep to the nightly job. Mask nothing that carries design meaning; if a region is genuinely non-deterministic, fix the fixture instead of masking.

#### Security & privacy

Goldens are committed images of the app's UI: fixtures must contain only synthetic data — no real names, emails, phone numbers, notebook content, share links or tokens (a share-link golden must use the documented `sane.app/n/…` placeholder). Add a DoD check that a golden never captures a dev-bypass watermark ([SN-ONB-014](onboarding.md#sn-onb-014)) or a debug affordance. This keeps the repository clear of inadvertent PII (LINDDUN disclosure; MASVS-PRIVACY-1).

#### UX notes

References: `design-system.md` §"Screens" (1180×820 reference frame, page geometry), `screens-and-flows.md` §1 (the full inventory of screens, overlays and inline surfaces), `ux-principles.md` §9.3 (the one-look-per-family heuristic these goldens implement). The Editor set doubles as the visual contract for the dock's four dock positions and the audio bar's three states, which no other test pins.

#### Test plan

New golden suites under `app/test/goldens/screens/` and `app/test/goldens/overlays/`, one file per screen with a parameterised look×mode loop; a `goldens-nightly` workflow job for the 17-look subset; a negative test proving the gate fails on a token mutation. Manual: review the first generated set against the design canvas frames before committing ([SN-GUX-016](design-system.md#sn-gux-016)).

#### Dependencies

[SN-QA-005](qa.md#sn-qa-005), [SN-DS-027](design-system.md#sn-ds-027)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-PHN-020

<a id="sn-phn-020"></a>

**Add compact-layout golden tests across the 17 looks and dark mode**

| Field | Value |
|---|---|
| GitHub | #864 |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | qa, design-system |
| Size | M |
| SDLC | verification |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-004](editor.md#sn-phn-004), [SN-PHN-008](pages-canvas.md#sn-phn-008), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
docs/platform/phones.md §10 lists 'golden tests for compact layouts' as a required part of the phone testing strategy, and CLAUDE.md §9 makes it a hard rule for the whole product: anything painted MUST render correctly in **all 17 looks and in light + dark**, and the surface must be golden-tested. The phone is where this is most likely to break silently, because the compact branch reflows components the tablet layout never puts under pressure — a bottom navigation bar in Brutalism (0 radius, 2 px border, uppercase), a bottom sheet in Glassmorphism (backdrop blur), a palette row in Neumorphism (no border, dual shadow, inset-on-press) and a record control in Cyberpunk (neon glow, 2 px pill radius) are four genuinely different rendering problems.

This issue creates the compact golden suite and wires it into CI so a token change or a layout tweak cannot regress a look nobody is looking at. It is a good first issue: the surfaces and the look list are fully specified, and the work is mechanical once the harness exists.

#### Scope
**In:** a compact-golden harness (fixed phone viewport, deterministic fonts and time, look/mode parameterisation), goldens for the phone shell and bottom navigation, the compact palette dock and its sheets, the Capture hub sheet, reading mode chrome, Library and Search in compact, the Settings tab nav in its narrow arrangement, the standard overlays, and CI wiring with a documented regeneration command.
**Out:** ink and brush goldens ([SN-INK-001](ink.md#sn-ink-001), [SN-BRS-001](brushes.md#sn-brs-001)), the token layer itself ([SN-DS-002](design-system.md#sn-ds-002)), integration tests ([SN-PHN-021](qa.md#sn-phn-021)), and target-size assertions ([SN-PHN-019](a11y.md#sn-phn-019)).

#### Acceptance criteria
- [ ] A harness renders any given widget at a fixed compact viewport (390×844 logical px, devicePixelRatio 3) with a bundled test font and a frozen clock, so goldens are byte-stable across machines.
- [ ] Every listed surface has goldens for **all 17 looks** in **both light and dark** (34 images per surface), driven by a parameterised test rather than 34 hand-written cases.
- [ ] Look coverage matches docs/design/tokens.json exactly: paper, minimal, pop, maximal, glass, neumorph, clay, brutal, neobrutal, skeuo, flat, material, bento, y2k, retro, cyber, editorial — a test fails if tokens.json gains a look with no golden.
- [ ] Look-specific effects are actually exercised: backdrop blur (glass, y2k), dual shadow and inset-on-press (neumorph, skeuo), hard offset shadow (neobrutal, retro), neon glow (cyber), uppercase casing (brutal, retro, cyber, editorial), ground patterns (`bgi`).
- [ ] A second viewport (320×568, the WCAG reflow floor) is covered for the shell and the overlays, asserting no overflow.
- [ ] Goldens are regenerated by one documented command, and the PR template's UX checklist references it.
- [ ] The suite runs in CI on every PR touching `packages/sane_ui`, `app/lib/shell`, `app/lib/capture` or `docs/design/tokens.json`, and a diff fails the build with the image attached.
- [ ] Total suite runtime stays under 3 minutes on CI so it is not skipped.
- [ ] No golden contains real note content — all fixtures are synthetic (lorem-free, non-PII placeholder strings).

#### Technical notes
Put the harness in `app/test/golden/phone/golden_harness.dart` (viewport, `ThemeExtension` injection from [SN-DS-002](design-system.md#sn-ds-002), look/mode matrix) and one test file per surface alongside it. Use `matchesGoldenFile` with a tolerant comparator only where platform text rendering genuinely differs; prefer a bundled font so no tolerance is needed. Drive looks from the parsed `docs/design/tokens.json` rather than a hardcoded list so the 'new look must have goldens' assertion is automatic. Keep `sane_ui` component goldens in `packages/sane_ui/test/golden/` and app-shell goldens in `app/test/golden/phone/` — the package is a leaf and must not depend on `app/` (docs/architecture/overview.md §5). Freeze animations with `tester.pumpAndSettle` plus a fixed `Duration`; test both the default and the Reduce Motion variant where a look uses motion. CI wiring goes in the existing workflow from [SN-FND-003](ci-cd.md#sn-fnd-003).

#### Security & privacy
None beyond baseline. Baseline controls that matter here specifically: golden fixtures MUST use synthetic content — never a real notebook, never a real name, never a real email or phone number — so no PII enters the repository or CI artefacts (CLAUDE.md §7.2/§7.3; MASVS-PRIVACY-1, CWE-359). Golden images are committed artefacts, so they are also a supply-chain surface: they are generated by the documented command from committed fixtures only, and no binary is added from an unverified source (MASVS-CODE-1). No secrets, no network access from the test suite, and the suite must not require a device or a signed build.

#### UX notes
The suite is the enforcement mechanism for the design rules rather than a design deliverable: docs/design/ux-principles.md §9.1 (what changes per look — radius, border, elevation, pressed state, glass, casing, ground, fonts, pill radius) and §9.2 (what must not change — component heights, semantics, badge meaning, accent-as-selection, contrast) are the checklist the goldens encode. Include at least one surface per look family so §9.3 holds: Warm (Paper), Clean (Minimalism), Bold (Pop), Soft (Neumorphism), Raw (Brutalism). Dark mode is a separate switch, not a look variant, so both maps are covered for every look (§7); the page paper token darkens and PDFs keep their colours, which a reading-mode golden should demonstrate. Where a look's accent fails contrast in light mode (Pop, Glass, Clay, Flat, Retro, Cyberpunk for button text; Neo-Brutalism and Cyberpunk for accent icons), the golden must show the **accessibility-adjusted** token, not the raw one (docs/design/accessibility.md).

#### Test plan
- `app/test/golden/phone/golden_harness.dart` — the harness.
- `app/test/golden/phone/phone_shell_golden_test.dart`, `capture_sheet_golden_test.dart`, `reading_mode_golden_test.dart`, `library_compact_golden_test.dart`, `search_compact_golden_test.dart`, `settings_compact_golden_test.dart`, `overlays_compact_golden_test.dart`.
- `packages/sane_ui/test/golden/tool_palette_compact_golden_test.dart` — the palette dock and its sheets.
- `app/test/golden/phone/look_coverage_test.dart` — fails if tokens.json contains a look with no golden.
- `app/test/golden/phone/reflow_320_test.dart` — 320×568 overflow assertions.

#### Dependencies
[SN-PHN-003](design-system.md#sn-phn-003), [SN-PHN-004](editor.md#sn-phn-004), [SN-PHN-008](pages-canvas.md#sn-phn-008), [SN-DS-002](design-system.md#sn-ds-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-021

<a id="sn-phn-021"></a>

**Add integration tests for phone capture entry points and share targets**

| Field | Value |
|---|---|
| GitHub | #865 |
| Type | test |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | qa, notifications |
| Size | M |
| SDLC | verification |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-013](notifications.md#sn-phn-013), [SN-PHN-014](notifications.md#sn-phn-014), [SN-PHN-015](security.md#sn-phn-015), [SN-QA-001](qa.md#sn-qa-001) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PRIVACY-2`, `CWE-926` |
| Extra labels | agent-ready |

#### Context
docs/platform/phones.md §10 requires `integration_test` plus **patrol** coverage for capture entry points, widgets and share targets — the three things that cannot be verified by a widget test because they cross the process boundary into the OS. These are also the surfaces most likely to break silently on an OS upgrade (a widget that stops refreshing, a share extension that stops resolving a UTI, a shortcut the OS no longer offers), and the ones where a regression is a privacy incident rather than a cosmetic bug ([SN-PHN-015](security.md#sn-phn-015)).

This issue builds the end-to-end suite over what [SN-PHN-013](notifications.md#sn-phn-013), [SN-PHN-014](notifications.md#sn-phn-014) and [SN-PHN-010](library.md#sn-phn-010) deliver, running on the Tier-1 phone devices in `tools/device_lab` (iPhone-ref, mid-Android, Android-lowend) per docs/platform/compatibility-matrix.md §2, and folds the security-relevant assertions into the same run so the guarantees are continuously proven, not proven once.

#### Scope
**In:** patrol-driven end-to-end tests for the in-app Capture hub, home-screen widget, lock-screen widget/Control Center control, Quick Settings tile, app shortcuts, Siri/Assistant intents, share receipt of PDF/image/text/URL, file open-with for `.sanenote` and `.pdf`, deep-link resolution; plus lock-state, guest-mode and offline variants of each; plus the device-lab job that runs them.
**Out:** the features themselves, the golden suite ([SN-PHN-020](qa.md#sn-phn-020)), the perf gates ([SN-PHN-018](perf.md#sn-phn-018)), and the general test strategy ([SN-QA-001](qa.md#sn-qa-001)).

#### Acceptance criteria
- [ ] Each entry point has an end-to-end test that starts from the OS surface (not from inside the app) and asserts the app lands on the correct route with the correct state.
- [ ] Quick Note from every entry point lands on a **writable page**, and the cold-start timing is captured and asserted against < 1.5 s / < 2 s (PRD-CO-270, budget B6).
- [ ] Sharing a PDF, a single image, multiple images, plain text and a URL each produce the expected confirm screen and, on confirm, the expected notebook or page (PRD-CO-274).
- [ ] Opening a `.sanenote` and a `.pdf` from the file picker opens them in the app (PRD-CO-275).
- [ ] **Locked-device variants**: with the device locked or the profile lock-gated, the widget shows the redacted state and Quick Note prompts to unlock (PRD-CO-277) — asserted, not assumed.
- [ ] **Guest-mode variants**: every entry point works with no account and never routes to Login.
- [ ] **Offline variants**: every entry point works with the network disabled, and a network capture during the run shows **no note bytes leaving the device** (PRD-CO-079).
- [ ] **Abuse variants**: a forged deep link and a hostile shared file each fail closed without mutating state or crashing.
- [ ] The suite runs on iPhone-ref, mid-Android and Android-lowend in `tools/device_lab`, is stable (three consecutive green runs, < 2% flake), and completes within the release-candidate CI window.
- [ ] Failures produce an artefact (screenshot + log excerpt) with no note content in it.

#### Technical notes
Tests live in `app/integration_test/` using `patrol` for the native interactions (opening the share sheet from a stub sender app, tapping a widget, pulling the Quick Settings shade, invoking a shortcut). Use a dedicated test flavour built with `--dart-define` so fixtures and stub senders are compiled in for the test build only and are absent from release ([SN-FND-005](devx.md#sn-fnd-005) flavours; never weaken the auth-bypass guards — CLAUDE.md §7.5). Seed fixtures through the app's own import path so no test writes directly into the encrypted store. Network assertions use a proxy/capture harness in `tools/device_lab` rather than an in-app hook, so the assertion is about real traffic. Wire the job into the release-candidate stage of the pipeline (docs/security/devsecops-pipeline.md) alongside MobSF, ZAP and the fuzz corpus; per-PR runs use the emulator/simulator subset, and the physical-device matrix runs on the release-candidate schedule via [SN-PERF-004](perf.md#sn-perf-004).

#### Security & privacy
This suite is itself a security control: it is the continuous proof of the PRD-CO-277 and PRD-CO-079 guarantees. Threats the tests cover: **T-LOCKSCREEN-DISCLOSURE** (widget content on a locked device — MASVS-PLATFORM-3, CWE-200), **T-INTENT-REDIRECTION / T-LINK-FORGERY** (a crafted intent or link driving a mutation — MASVS-PLATFORM-1, CWE-926, CWE-441), **T-HOSTILE-INBOUND** (malformed shared file — MASVS-PLATFORM-2, MASVS-CODE-4, CWE-20), **T-SILENT-EXFIL** (any note bytes on the wire during import — MASVS-NETWORK-1, MASVS-PRIVACY-3). Test hygiene controls: fixtures contain no real PII and no secrets; credentials for any store or device farm come from CI secrets and are never committed (CLAUDE.md §7.2); failure artefacts are scrubbed of note content before upload (MASVS-PRIVACY-1, CWE-532); the test flavour must be provably absent from release builds, asserted the same way `app/test/security/auth_bypass_test.dart` asserts the bypass is unreachable.

#### UX notes
The tests encode the user-visible contract, so their assertions should read like the design's own copy: after a share the toast reads '<file> imported · highlighter ready' (docs/design/screens-and-flows.md §9); after a capture it reads 'Saved to Quick Notes'; the redacted widget reads 'Unlock to see your notebooks'; a failed import reads 'Couldn't import that PDF — check the file and try again.' (docs/design/ux-principles.md §4.3). Assert those strings so a copy regression is caught too. Include one screen-reader-enabled variant of the capture flow to confirm the entry points remain AT-reachable (PRD-CO-331, PRD-CO-332), and one 200% Dynamic Type variant of the confirm screen so the inbound surfaces stay legible.

#### Test plan
- `app/integration_test/phone_capture_flows_test.dart` — in-app hub, widget, lock-screen control, QS tile, shortcut, Siri/Assistant.
- `app/integration_test/phone_share_target_test.dart` — PDF, image, multi-image, text, URL receipt and confirm.
- `app/integration_test/phone_file_open_with_test.dart` — `.sanenote` and `.pdf` open-with.
- `app/integration_test/phone_locked_device_test.dart` — locked and guest variants of every entry point.
- `app/integration_test/phone_offline_capture_test.dart` — offline variants plus the no-bytes-on-the-wire assertion.
- `app/integration_test/phone_entry_point_abuse_test.dart` — forged deep link and hostile shared file fail closed.
- `tools/device_lab/jobs/phone_integration.yaml` — the device-lab job definition and device matrix.

#### Dependencies
[SN-PHN-013](notifications.md#sn-phn-013), [SN-PHN-014](notifications.md#sn-phn-014), [SN-PHN-015](security.md#sn-phn-015), [SN-QA-001](qa.md#sn-qa-001)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-001

<a id="sn-qa-001"></a>

**Quality & testing engineering**

| Field | Value |
|---|---|
| GitHub | #474 |
| Type | epic |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | qa |
| Size | XL |
| SDLC | verification |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-CODE-4`, `MASVS-RESILIENCE-1`, `ASVS-V5`, `SSDF-PW.8`, `OWASP-A03`, `OWASP-A08` |
| Extra labels | agent-ready |

#### Context
Quality & testing is the cross-cutting discipline that makes Sane Notes' three promises — lag-proof pen-first UX, zero-knowledge local-first data, and one codebase across five surfaces — actually verifiable rather than aspirational. `docs/security/ssdlc-process.md` §2.3/§2.4 make unit/widget/golden/integration tests plus the security tests a hard merge gate; `docs/architecture/overview.md` §9 requires unit tests on every pure-Dart package and golden tests on anything painted; `CLAUDE.md` §10 mandates the four test layers, negative/abuse tests, and a named test file per issue. `docs/platform/compatibility-matrix.md` §7 blocks a release unless the automated functional + golden + integration suites pass on every Tier 1 device. This epic owns the test **infrastructure and process** that all other areas plug into: the strategy doc, the four automated layers, the 17-looks × dark golden matrix, cross-platform integration (patrol/`integration_test`), the cloud device farm, coverage and flaky-test policy, manual test plans, beta programs, bug triage, sync chaos tests, and parser fuzzing (jointly with security).

#### Scope
**In:** the shared test harness, utilities, CI wiring, policies and processes tracked by these children:
- [ ] [SN-QA-002](qa.md#sn-qa-002) Author the test strategy & test-pyramid doc
- [ ] [SN-QA-003](qa.md#sn-qa-003) Establish the headless unit-test layer for pure-Dart packages
- [ ] [SN-QA-004](qa.md#sn-qa-004) Establish the widget-test layer & test utilities
- [ ] [SN-QA-005](qa.md#sn-qa-005) Build the golden-test harness across 17 looks × light/dark
- [ ] [SN-QA-006](qa.md#sn-qa-006) Establish the integration_test + patrol end-to-end harness per platform
- [ ] [SN-QA-007](qa.md#sn-qa-007) Define and enforce per-package code-coverage gates
- [ ] [SN-QA-008](qa.md#sn-qa-008) Define the flaky-test policy and quarantine automation
- [ ] [SN-QA-009](qa.md#sn-qa-009) Set up the cloud device farm for functional/integration runs
- [ ] [SN-QA-010](qa.md#sn-qa-010) Define the bug-triage process, severity taxonomy & templates
- [ ] [SN-QA-011](qa.md#sn-qa-011) Build test-data factories & deterministic fixtures
- [ ] [SN-QA-012](qa.md#sn-qa-012) Implement multi-device convergence & fault-injection tests for sync
- [ ] [SN-QA-013](qa.md#sn-qa-013) Curate the fuzz corpus & the crash-to-regression-test pipeline (with [SN-SEC-010](security.md#sn-sec-010))
- [ ] [SN-QA-014](qa.md#sn-qa-014) Author per-milestone manual test plans & exploratory charters
- [ ] [SN-QA-015](qa.md#sn-qa-015) Define the beta rings, tester cohorts & privacy-safe feedback intake
- [ ] [SN-QA-016](qa.md#sn-qa-016) Define the release QA checklist & go/no-go gate

**Out:** the decision-7 performance gates and the physical reference-device latency lab (owned by [SN-PERF-001](perf.md#sn-perf-001) / [SN-PERF-003](perf.md#sn-perf-003) / [SN-PERF-004](perf.md#sn-perf-004)); the security SAST/DAST/secret scanners ([SN-CI-001](ci-cd.md#sn-ci-001)); the accessibility audit itself ([SN-A11Y-001](a11y.md#sn-a11y-001)); and the feature code under test (each area's own issues). QA wires the functional/golden/integration suites those gates consume.

#### Acceptance criteria
- [ ] Every child is merged and CI runs unit + widget + golden + integration suites green on each PR (the `lint-dart`/`unit-tests`/`goldens` jobs from `devsecops-pipeline.md` §2.1).
- [ ] The 17-look × light/dark golden matrix (34 variants per registered surface) is enforced and a >0.1 % pixel diff fails CI.
- [ ] Per-package coverage gates enforce thresholds; the security tests (`app/test/security/auth_bypass_test.dart`, crypto fail-closed, no-PII-in-logs) are covered and green.
- [ ] The cloud device farm runs the functional/integration suite across the Tier 1/Tier 2 matrix; the flaky-test policy quarantines and tracks intermittent tests.
- [ ] The release QA checklist ([SN-QA-016](qa.md#sn-qa-016)) gates M7 and no S1/S2 bug is open at a release.

#### Technical notes
Layers and layout follow `CLAUDE.md` §10 and `overview.md` §9: `packages/<pkg>/test/**_test.dart` (unit/widget/golden mirror the source path), `app/test/` (widget + security), `app/integration_test/` (`integration_test` + `patrol`). Pure-Dart packages test headlessly (no widget binding); painted surfaces carry goldens across all looks from `docs/design/tokens.json` via `sane_ui` ([SN-DS-002](design-system.md#sn-ds-002)). CI jobs are the ones enumerated in `docs/security/devsecops-pipeline.md` §2.1. Coordinate with `tools/perf_harness` ([SN-PERF-002](perf.md#sn-perf-002)) and the fuzzing/pentest verification stage in `ssdlc-process.md` §2.4. No new `PRD-*` (this is process/infra); the requirements it verifies live across all four PRDs.

#### Security & privacy
Threats: shipped regressions in security-critical paths (auth bypass reachable, crypto not fail-closed, PII leaking to logs), untrusted-parser crashes (TM-E-04, TM-D-01), and secrets/real note content leaking into fixtures, CI logs, or the device farm. Controls: the test suite is itself a control (MASVS-CODE-4 test coverage, MASVS-RESILIENCE-1, ASVS V5 validation, SSDF PW.8 test executable code). Baseline for every child: no note content, ink coordinates, keys, tokens, or real PII in test logs/artifacts/fixtures; synthetic data only; tokens-not-content.

#### UX notes
No direct end-user UI. Where tests render UI (golden/widget) they must exercise the design system (`docs/design/design-system.md`, `design/Sane Notes.dc.html` screen names) across all 17 looks + dark mode and the `narrow`/`expanded` layout classes, and assert the a11y baseline (Semantics labels, 44 pt / 48 dp targets, ≥4.5:1 contrast, keyboard reachability on web) per `docs/design/accessibility.md`. Developer surface: clear CI check names, actionable failure output, and a golden-diff artifact.

#### Test plan
This epic is verified by its children's suites running green in CI and by the release gate. Meta-check: a CI dashboard shows the four layers' pass rate, coverage, and flaky count per run; a deliberately-broken security test (seeded) fails the gate.

#### Dependencies
Foundational: [SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold), [SN-FND-003](ci-cd.md#sn-fnd-003) (CI), [SN-FND-004](devx.md#sn-fnd-004) (lints/workspace). Coordinates with [SN-PERF-001](perf.md#sn-perf-001) (perf gates), [SN-CI-001](ci-cd.md#sn-ci-001) (security scanners), [SN-SEC-001](security.md#sn-sec-001) (fuzzing/pentest), [SN-A11Y-001](a11y.md#sn-a11y-001) (a11y audit). Children carry their own finer dependencies.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-002

<a id="sn-qa-002"></a>

**Author the test strategy and test-pyramid document**

| Field | Value |
|---|---|
| GitHub | #905 |
| Type | docs |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | qa, docs |
| Size | M |
| SDLC | design |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `SSDF-PW.8`, `MASVS-CODE-4` |
| Extra labels | agent-ready |

#### Context
Before any test harness is built, the repo needs one authoritative description of *what* is tested at *which* layer, *where* the files live, and *how* they are named — so that every future issue's Test plan can cite it and a new agent knows exactly where to add a test. `CLAUDE.md` §10 and `docs/architecture/overview.md` §9 already state the four layers (unit / widget / golden / integration) and the rule that pure-Dart packages carry unit tests while painted surfaces carry goldens, but this is scattered. This issue consolidates it into `docs/qa/test-strategy.md`: the test pyramid, the per-package layer map, the file/naming conventions, tagging, and the coordination boundaries with performance ([SN-PERF-001](perf.md#sn-perf-001)) and security ([SN-CI-001](ci-cd.md#sn-ci-001), [SN-SEC-001](security.md#sn-sec-001)).

#### Scope
**In:** write `docs/qa/test-strategy.md` covering: (1) the pyramid and target ratios (many unit, fewer widget, fewer golden, fewest integration); (2) a table mapping each `packages/*` and `plugins/*` to its required layers (e.g. `sane_core`/`sane_ink`/`sane_crypto` → unit only; `sane_render`/`sane_brushes`/`sane_ui` → unit + golden; `app/` → widget + integration + security); (3) directory + naming conventions (`<source>_test.dart`, `packages/<pkg>/test/`, `app/integration_test/`, golden dir layout); (4) test tags (`@Tags(['golden'])`, `slow`, `security`, `perf`) and how CI selects them; (5) the negative/abuse-test and regression-test requirements; (6) links from the issue-schema Test-plan section to this doc.
**Out:** building any harness (that is [SN-QA-003](qa.md#sn-qa-003)–[SN-QA-006](qa.md#sn-qa-006)); coverage thresholds ([SN-QA-007](qa.md#sn-qa-007)); perf/fuzzing method (their own issues).

#### Acceptance criteria
- [ ] `docs/qa/test-strategy.md` exists and is linked from `docs/README.md` and `CLAUDE.md` §10.
- [ ] The per-package layer map lists all 12 `packages/` and 7 `plugins/`, each with its required layers and rationale.
- [ ] Naming/placement conventions are unambiguous: an agent can place a new test with no further questions (mirrors source path + `_test.dart`).
- [ ] Test tags and the CI selection matrix (fast PR set vs nightly full set) are documented and consistent with `devsecops-pipeline.md` §2.1.
- [ ] Negative/abuse + regression-test policy is stated (every fixed bug/vuln gets a regression test) matching `ssdlc-process.md` §5.

#### Technical notes
Pure Markdown under `docs/qa/`. Reference `CLAUDE.md` §10, `overview.md` §9/§10 (the model→…→tests through-line), `ssdlc-process.md` §2.3/§2.4/§5, and the package DAG in `overview.md` §5 (tests must not introduce a disallowed dependency edge). Align tags with the CI jobs to be added in [SN-QA-006](qa.md#sn-qa-006)/[SN-QA-007](qa.md#sn-qa-007). No `PRD-*` (process doc). No code.

#### Security & privacy
Threats: an under-specified strategy that lets security-critical paths (auth bypass, crypto fail-closed, no-PII-in-logs) ship untested. Controls: mandate the security tests as a named layer (SSDF PW.8, MASVS-CODE-4) and the abuse/regression-test rule. Baseline: the doc must instruct that fixtures never contain secrets or real PII, and tests never log note content.

#### UX notes
Developer-facing document. Must meet the docs a11y baseline (semantic headings, tables with headers, ≥4.5:1 contrast if rendered to the docs site). Include a one-glance decision table ("I'm adding X → write these tests here"). None beyond that baseline.

#### Test plan
No automated test (it is documentation). Verification: a reviewer confirms every package/plugin appears in the layer map and that the conventions match what [SN-QA-003](qa.md#sn-qa-003)–[SN-QA-006](qa.md#sn-qa-006) implement; a link-check passes. Record the review in the PR.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold so the package/plugin list is real). Informs [SN-QA-003](qa.md#sn-qa-003)–[SN-QA-007](qa.md#sn-qa-007) and [SN-QA-014](qa.md#sn-qa-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-003

<a id="sn-qa-003"></a>

**Establish the headless unit-test layer for pure-Dart packages**

| Field | Value |
|---|---|
| GitHub | #906 |
| Type | test |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | qa, devx |
| Size | M |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-FND-004](devx.md#sn-fnd-004) |
| Security controls | `MASVS-CODE-4`, `SSDF-PW.8`, `MASVS-CRYPTO-1` |
| Extra labels | agent-ready |

#### Context
The pure-Dart packages (`sane_core`, `sane_ink`, `sane_sync`, `sane_crypto`, `sane_search`, `sane_ml`, `sane_billing`) are the model/logic layer and MUST be testable **without a widget harness** so they stay portable to a future Rust core (`docs/architecture/overview.md` §4/§9). This issue stands up the shared headless unit-test harness and the reusable helpers those packages need — deterministic time (HLC/clock), seeded CSPRNG-free RNG for reproducibility, and `Result<T, Failure>` matchers — so that CRDT semantics, ink math, crypto envelopes, and sync merges can be unit-tested precisely. It is the base every pure-Dart package's own tests build on.

#### Scope
**In:** a `test/` scaffold pattern and a small internal `sane_test_support` helper set (or a `test/support/` shared dir) providing: a `FakeClock`/deterministic `Hlc` source, a seeded pseudo-random generator for reproducible fixtures, custom matchers for `Ok`/`Err(Failure)` sealed types, and golden-JSON round-trip helpers for serialisation. Wire `dart test` for pure-Dart packages and `flutter test` for the Flutter ones, headless. Add example unit tests proving the harness (e.g. an HLC ordering test, an add-wins/LWW merge test, an AEAD round-trip test with a fixed test vector).
**Out:** widget/golden/integration layers ([SN-QA-004](qa.md#sn-qa-004)–[SN-QA-006](qa.md#sn-qa-006)); coverage thresholds ([SN-QA-007](qa.md#sn-qa-007)); the packages' full test suites (owned by each area).

#### Acceptance criteria
- [ ] `dart test` runs headlessly for every pure-Dart package with no Flutter binding; a `package:flutter` import in a pure-Dart package's test fails arch-lint.
- [ ] `FakeClock`/deterministic HLC and seeded RNG make CRDT and serialisation tests fully reproducible (same seed → identical output across runs/machines).
- [ ] `Result`/`Failure` matchers exist and are used in the example tests; a mismatched variant fails with a readable message.
- [ ] AEAD round-trip example uses a fixed, non-secret test vector (never a real key) and asserts tampered-ciphertext fails closed.
- [ ] The harness is invoked by the CI `unit-tests` job (`devsecops-pipeline.md` §2.1) and is green.

#### Technical notes
Use `package:test` for pure-Dart, `flutter_test` only where a package is `[Flutter]`. Place shared helpers so they don't violate the DAG (`overview.md` §5) — a `dev_dependency` test-support package or per-package `test/support/`. Deterministic HLC per `docs/architecture/document-model.md` and ADR-0005 (add-wins set + LWW + HLC). Crypto test vectors per ADR-0007 / `docs/architecture/crypto.md` (XChaCha20-Poly1305 / AES-256-GCM). Lints from [SN-FND-004](devx.md#sn-fnd-004) (`very_good_analysis`). No `PRD-*` (test infra).

#### Security & privacy
Threats: crypto tested with real keys or non-deterministic vectors; fixtures containing secrets. Controls: MASVS-CRYPTO-1 (correct primitive use verified by test vectors), MASVS-CODE-4, SSDF PW.8. Baseline: fixed public test vectors only, never a real key/nonce/salt; no secrets in the harness; no note content logged.

#### UX notes
Developer-facing. Failure output must name the package, test, and expected-vs-actual clearly. None beyond baseline.

#### Test plan
The deliverable *is* tests plus helpers: add `packages/sane_core/test/hlc_test.dart` (ordering) and `crdt_merge_test.dart` (add-wins/LWW) as exemplars; `packages/sane_crypto/test/aead_roundtrip_test.dart` (fixed vector, fail-closed on tamper). Assert seeded RNG reproducibility in `test/support/seeded_random_test.dart`. Run headless in CI.

#### Dependencies
[SN-FND-004](devx.md#sn-fnd-004) (workspace + lints). Consumed by every pure-Dart package's tests and by [SN-QA-011](qa.md#sn-qa-011) (factories) and [SN-QA-012](qa.md#sn-qa-012) (chaos).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-004

<a id="sn-qa-004"></a>

**Establish the widget-test layer and shared test utilities**

| Field | Value |
|---|---|
| GitHub | #907 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | qa, design-system |
| Size | M |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-003](qa.md#sn-qa-003), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-CODE-4`, `SSDF-PW.8` |
| Extra labels | agent-ready |

#### Context
Widget tests cover interactions and wiring — palette taps, tool switching, provider-driven state, empty/loading/error states — without a full device. Because the app uses Riverpod + `go_router` (ADR-0003) and a token-driven design system across 17 looks (`docs/design/design-system.md`), widget tests need a shared `pumpApp` harness that injects a chosen look/theme, overrides Riverpod providers, and stubs federated plugins (secure store, ink surface, cloud drive) so no test touches a real device capability. This issue builds that harness and the a11y assertion helpers every UI issue's Test plan will reuse.

#### Scope
**In:** a `testWidgets` harness in `app/test/support/` exposing `pumpApp(widget, {look, brightness, overrides, locale})` that wraps the widget in `ProviderScope` (with overrides), the selected `sane_ui` theme, and a `MediaQuery` for a chosen window-size class; fake plugin implementations (mock `sane_secure_store`, `sane_ink_surface`, `sane_cloud_drive` platform-interfaces) for deterministic tests; a11y helpers (`expectSemanticsLabel`, `expectMinTapTarget(44/48)`, contrast helper); and example widget tests (a `sane_ui` button across two looks, an error-state widget).
**Out:** pixel goldens ([SN-QA-005](qa.md#sn-qa-005)); end-to-end flows ([SN-QA-006](qa.md#sn-qa-006)); the features' own widget tests.

#### Acceptance criteria
- [ ] `pumpApp` renders any widget under a chosen look + brightness + locale + window class with overridable providers; switching look changes tokens with no other change.
- [ ] Mock plugin platform-interfaces let a widget test run with zero real native calls (no Keychain, no ink surface, no network).
- [ ] `expectMinTapTarget` fails when an interactive target is < 44 pt (Apple) / 48 dp (Android); `expectSemanticsLabel` asserts a Semantics label exists.
- [ ] Example tests cover a component in ≥2 looks and an error/empty state, and are green in the CI `unit-tests`/widget job.
- [ ] The harness forbids business logic in `build` (a lint/pattern) and works for `StatelessWidget` + provider composition.

#### Technical notes
`flutter_test` + `ProviderScope(overrides:...)`. Themes via `sane_ui` `ThemeExtension` from [SN-DS-002](design-system.md#sn-ds-002) (17 looks, light/dark). Plugin mocks against each plugin's platform-interface (ADR-0012). Window-size classes per `docs/platform/compatibility-matrix.md` §5 (Compact/Medium/Expanded). a11y thresholds per `docs/design/accessibility.md` and locked decision 10. Builds on [SN-QA-003](qa.md#sn-qa-003) support helpers. No `PRD-*` (test infra).

#### Security & privacy
Threats: a widget test accidentally invoking real secure-store/network; leaking tokens through a fake. Controls: MASVS-CODE-4, SSDF PW.8; mocks return synthetic values only. Baseline: no real credentials/tokens/note content in fixtures or logs; fakes never persist.

#### UX notes
Developer-facing, but the harness is the enforcement point for the design + a11y bars: it must make it trivial to test a widget in all 17 looks and both modes (`design/Sane Notes Design Sheet.dc.html`) and to assert Semantics/tap-target/contrast. Provide helpers for empty/loading/error/offline state rendering. None beyond that baseline.

#### Test plan
Add `app/test/support/pump_app.dart` + `pump_app_test.dart` (look/brightness switch), `a11y_matchers_test.dart` (tap-target + semantics), and `app/test/support/fakes/` plugin mocks with a `fake_secure_store_test.dart`. Run in CI widget job.

#### Dependencies
[SN-QA-003](qa.md#sn-qa-003) (support helpers), [SN-DS-002](design-system.md#sn-ds-002) (theme tokens/looks). Consumed by every UI area's widget tests and by [SN-QA-005](qa.md#sn-qa-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-005

<a id="sn-qa-005"></a>

**Build the golden-test harness across 17 looks and light/dark**

| Field | Value |
|---|---|
| GitHub | #908 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | qa, theming |
| Size | L |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-QA-004](qa.md#sn-qa-004) |
| Security controls | `MASVS-CODE-4`, `SSDF-PW.8` |
| Extra labels | agent-ready, innovation |

#### Context
Locked decision 9 and `CLAUDE.md` §9 require that *anything painted* renders correctly in **all 17 looks** and in **light + dark** — ink, brushes, components, screens. The only scalable way to hold that line is pixel golden tests parametrised over the full look × mode matrix, caught by diff on every PR (`overview.md` §9: "ink/UI regressions are caught by pixel-diff golden tests"). This issue builds the golden harness: a runner that renders each registered surface across 17 looks × 2 modes (34 variants), with deterministic fonts/animations/pixel-ratio so goldens are stable across machines, plus the CI update/review flow. This matrix-golden capability is a differentiator — no competitor themes to 17 fully-tested looks.

#### Scope
**In:** a `goldenMatrix(builder, {name})` helper (over `flutter_test` `matchesGoldenFile`) that loops the 17 looks from `docs/design/tokens.json` × light/dark, loads real fonts via `FontLoader` for determinism, disables implicit animations, pins `devicePixelRatio` and a canonical surface size, and writes goldens under a structured path (`test/goldens/<component>/<look>-<mode>.png`); a CI `goldens` job that fails on diff and publishes a diff artifact; the `--update-goldens` review flow documented; a masking/tolerance strategy for platform font-AA differences (render on a fixed CI image, small perceptual tolerance justified). Prove it on a `sane_ui` component and a `sane_render` stroke.
**Out:** authoring goldens for every component (each area does its own); on-device screenshot tests ([SN-QA-006](qa.md#sn-qa-006)/[SN-QA-009](qa.md#sn-qa-009)); perf.

#### Acceptance criteria
- [ ] `goldenMatrix` produces exactly 34 golden files (17 looks × light/dark) per registered surface, named deterministically.
- [ ] Goldens are byte-stable across two CI runs on the pinned runner image (fonts loaded, animations off, fixed DPR); a >0.1 % pixel diff fails the `goldens` job and uploads a before/after/diff artifact.
- [ ] A token change in one look regenerates only that look's goldens (proven by a deliberate token tweak).
- [ ] `--update-goldens` regeneration + review flow is documented in `docs/qa/test-strategy.md`; goldens are stored in-repo (or LFS) with a size budget noted.
- [ ] Exemplar goldens for one `sane_ui` component and one painted `sane_render` stroke exist and are green.

#### Technical notes
`flutter_test` `matchesGoldenFile` + a custom `GoldenFileComparator` for tolerance; `TestWidgetsFlutterBinding` with animations disabled. Themes/looks via `sane_ui` `ThemeExtension` ([SN-DS-002](design-system.md#sn-ds-002)); look list is the source-of-truth 17 from `tokens.json`. Deterministic fonts through bundled test fonts + `FontLoader` (system fonts differ across runners). Build on the `pumpApp` harness ([SN-QA-004](qa.md#sn-qa-004)). Run goldens only on the pinned Linux CI image to avoid host AA drift. Reference `docs/design/design-system.md`. No `PRD-*` (test infra).

#### Security & privacy
Threats: none to user data — goldens render synthetic sample content. Controls: MASVS-CODE-4, SSDF PW.8 (regression protection for the visual layer). Baseline: sample/lorem content only in goldens — never real notes; no secrets/tokens in fixtures.

#### UX notes
This harness is the guardrail for the entire design system: it must cover all 17 looks (`design/Sane Notes Design Sheet.dc.html`) in light + dark, and support rendering at the Compact/Medium/Expanded window classes (`compatibility-matrix.md` §5) so responsive regressions are caught. Diff artifacts must be easy to read (side-by-side). None beyond that baseline.

#### Test plan
Add `app/test/support/golden_matrix.dart` + `golden_matrix_test.dart`; `packages/sane_ui/test/button_golden_test.dart` (34 variants); `packages/sane_render/test/stroke_golden_test.dart`. CI `goldens` job diffs and uploads artifacts. Verify determinism by running twice.

#### Dependencies
[SN-DS-002](design-system.md#sn-ds-002) (17-look theme tokens), [SN-QA-004](qa.md#sn-qa-004) (pumpApp). Consumed by every painted area (ink, brushes, editor, ui, pdf, templates) and referenced by [SN-QA-016](qa.md#sn-qa-016).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-006

<a id="sn-qa-006"></a>

**Establish the integration_test and patrol end-to-end harness per platform**

| Field | Value |
|---|---|
| GitHub | #909 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | qa, compat |
| Size | L |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-FND-003](ci-cd.md#sn-fnd-003), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `MASVS-CODE-4`, `MASVS-AUTH-1`, `SSDF-PW.8`, `ASVS-V5` |
| Extra labels | agent-ready |

#### Context
Unit/widget/golden layers can't prove that a real build on a real surface lets a user take a note offline and get their strokes back. `CLAUDE.md` §10 requires `integration_test`/`patrol` end-to-end flows, and `docs/roadmap.md` M1 exit criteria demand "write → close → reopen preserves strokes byte-for-byte" and "editor works with no account (guest) and no network". This issue stands up the end-to-end harness: `integration_test` for in-app flows and `patrol` for native system interactions (permission dialogs, biometric prompts, share sheets) that `integration_test` alone cannot drive, plus the per-platform runners (iOS/iPadOS, Android, web via chromedriver).

#### Scope
**In:** the `app/integration_test/` scaffold with a `patrol` setup; a canonical smoke flow (`guest_note_flow`: launch as guest → create notebook → draw a stroke → background/kill → relaunch → assert the stroke persists byte-for-byte, all with no network); per-platform run configs (Android `patrol test`, iOS on simulator/device, web `flutter drive` + chromedriver); an offline/airplane assertion; and hooks so the flow runs on the cloud device farm ([SN-QA-009](qa.md#sn-qa-009)). Guard native-only steps behind capability checks so the web run skips them cleanly.
**Out:** the device farm provisioning ([SN-QA-009](qa.md#sn-qa-009)); perf timing of these flows ([SN-PERF-002](perf.md#sn-perf-002)); exhaustive per-feature e2e (each area adds its own flows using this harness).

#### Acceptance criteria
- [ ] `guest_note_flow` runs on Android and iOS via patrol and on web via chromedriver, all green, with no sign-in and no network.
- [ ] The flow asserts strokes persist byte-for-byte across a real close/reopen (reads back the `.sanenote`/store) — matching the M1 exit criterion.
- [ ] Patrol drives at least one native dialog (e.g. a permission or file-picker prompt) that `integration_test` cannot; the web run skips native-only steps via capability check, not a platform hardcode.
- [ ] The harness runs in CI on emulator/simulator for functional correctness (explicitly not a latency gate — emulators are barred from perf gates per `performance-budgets.md` §3) and is invokable on the device farm.
- [ ] Auth-dependent flows respect the guest-first invariant; a test proves the dev auth bypass path is not reachable in a release-mode build (links `app/test/security/auth_bypass_test.dart`).

#### Technical notes
`integration_test` + `patrol` (`patrol test`, native automation). Web via `flutter drive` + `chromedriver` / `package:integration_test` web support (CanvasKit build). Build flavours from [SN-FND-005](devx.md#sn-fnd-005) (`SANE_FLAVOR`, and crucially never `SANE_AUTH_BYPASS=true` in the release run). Persistence assertions read the drift store / `.sanenote` bundle (`docs/architecture/file-format.md`). Capability-gate native steps per `compatibility-matrix.md` §6. CI wiring from [SN-FND-003](ci-cd.md#sn-fnd-003). No `PRD-*` here (harness); flows verify PRD-ED/PRD-STOR requirements cited by their own issues.

#### Security & privacy
Threats: an e2e test with real accounts/tokens; the auth-bypass flavour leaking into a release e2e run; note content in test logs. Controls: MASVS-AUTH-1 (bypass unreachable in release, guest-first), MASVS-CODE-4, ASVS V5, SSDF PW.8. Baseline: synthetic accounts only, no real tokens; the release-mode e2e never sets the bypass; no note content or coordinates logged.

#### UX notes
End-to-end flows exercise real screens (`design/Sane Notes.dc.html` — Library, Editor) so they double as smoke tests for empty/first-run and offline states. Assert core Semantics labels are present during the flow (a11y smoke). Cover the Compact and Expanded layouts on at least one run. None beyond that baseline.

#### Test plan
Add `app/integration_test/guest_note_flow_test.dart` and `app/integration_test/support/` (patrol config, persistence readback helper). Provide `tool/run_integration_<android|ios|web>.sh`. CI runs on emulator/simulator; farm run wired in [SN-QA-009](qa.md#sn-qa-009).

#### Dependencies
[SN-FND-003](ci-cd.md#sn-fnd-003) (CI), [SN-FND-005](devx.md#sn-fnd-005) (flavours). Feeds [SN-QA-008](qa.md#sn-qa-008) (flaky policy), [SN-QA-009](qa.md#sn-qa-009) (device farm), [SN-QA-016](qa.md#sn-qa-016) (release checklist).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-007

<a id="sn-qa-007"></a>

**Define and enforce per-package code-coverage gates**

| Field | Value |
|---|---|
| GitHub | #910 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | qa, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | `SSDF-PW.8`, `MASVS-CODE-4`, `OWASP-A08` |
| Extra labels | agent-ready |

#### Context
A test suite only protects what it covers, and `docs/security/ssdlc-process.md` §5 lists unit/widget/golden green as a DoD item. Without a coverage gate, security-critical logic (crypto envelopes, CRDT merges, the auth-bypass guard, log redaction) can silently drift out of test coverage. This issue adds per-package coverage collection, a merged report, and CI thresholds — differentiated so the pure-Dart model/logic/crypto packages are held to a high bar while UI packages (partly covered by goldens) have a sensible floor.

#### Scope
**In:** collect `lcov` per package (`flutter test --coverage` / `dart test --coverage`), merge to a single report, enforce thresholds in CI: an overall project floor, a higher per-package floor for `sane_core`/`sane_crypto`/`sane_sync`/`sane_ink` (the model/logic/crypto layer), and a **patch/differential** threshold on changed lines so new code can't lower coverage; publish an HTML/summary artifact and a PR comment; exclude generated code (`*.g.dart`, `*.freezed.dart`) and mocks from the denominator.
**Out:** mutation testing (backlog); the tests themselves ([SN-QA-003](qa.md#sn-qa-003)–[SN-QA-006](qa.md#sn-qa-006)); the security scanners ([SN-CI-001](ci-cd.md#sn-ci-001)).

#### Acceptance criteria
- [ ] CI produces a merged `lcov` report across all packages + `app/` and uploads a human-readable summary artifact + PR comment.
- [ ] Threshold gate: overall ≥ 70 % lines; `sane_core`/`sane_crypto`/`sane_sync`/`sane_ink` ≥ 85 % lines; a PR that drops a gated package below its floor fails.
- [ ] Patch coverage: ≥ 80 % of changed executable lines are covered, or the PR fails with a clear message (with a documented, reviewer-approved override label for justified exceptions).
- [ ] Generated files and mocks are excluded from coverage; the exclusion list is documented.
- [ ] The security tests (`auth_bypass_test.dart`, crypto fail-closed, log-redaction) are within a gated package's covered set.

#### Technical notes
`lcov`/`genhtml` or a Dart coverage-merge script under `tools/scripts/`; combine per-package `coverage/lcov.info`. Thresholds config in-repo (e.g. `coverage-config.yaml`) consumed by a `scripts/coverage-gate.mjs`. Differential coverage against the merge-base. Wire into [SN-FND-003](ci-cd.md#sn-fnd-003) CI after the `unit-tests` job. Exclude `**/*.g.dart`, `**/*.freezed.dart`, `**/*.mocks.dart`. No `PRD-*` (CI policy).

#### Security & privacy
Threats: security-critical code drifting out of coverage (regression risk, OWASP-A08 integrity). Controls: SSDF PW.8, MASVS-CODE-4; the higher crypto/sync/core floor is itself a control. Baseline: coverage reports contain no source secrets/content; the report artifact is non-sensitive line data only.

#### UX notes
Developer-facing. The PR comment must show per-package deltas and the changed-lines miss list so the fix is obvious. Colour is paired with text (not colour-only) for the a11y baseline. None beyond that baseline.

#### Test plan
Unit-test `scripts/coverage-gate.mjs` with sample `lcov` fixtures (overall pass/fail, per-package floor, patch-coverage calc, exclusion handling). Manual: open a PR that adds uncovered code and confirm the patch gate fails. Record in the PR.

#### Dependencies
[SN-FND-003](ci-cd.md#sn-fnd-003) (CI), consumes [SN-QA-003](qa.md#sn-qa-003)–[SN-QA-006](qa.md#sn-qa-006) suites. Feeds [SN-QA-016](qa.md#sn-qa-016) (release checklist).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-008

<a id="sn-qa-008"></a>

**Define the flaky-test policy and quarantine automation**

| Field | Value |
|---|---|
| GitHub | #911 |
| Type | infra |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | qa, ci-cd |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-006](qa.md#sn-qa-006) |
| Security controls | `SSDF-PW.8`, `MASVS-CODE-4` |
| Extra labels | agent-ready |

#### Context
Integration and golden suites are the most prone to intermittency (timing, fonts, emulator noise), and a flaky suite is worse than no suite — engineers learn to ignore red, and a real regression slips through. This issue defines the flaky-test policy and the automation that detects, quarantines, and tracks flaky tests without letting retries mask genuine failures — and critically, forbids retry-masking on the security and perf tests where a single failure is meaningful.

#### Scope
**In:** a written flaky-test policy in `docs/qa/test-strategy.md` (definition of flaky, the quarantine SLA, who owns fixing); automation: a CI reporting step that records pass/fail history per test and flags tests that fail-then-pass; a `@Tags(['quarantine'])` mechanism that moves a known-flaky test out of the blocking set into a nightly non-blocking run that still tracks it; a rule that a bounded single retry is allowed only for tagged integration tests, never for `security`/`perf`-tagged tests; and an auto-filed tracking issue (label `blocked`/`p2`) when a test is quarantined, with an expiry so quarantine is not permanent.
**Out:** fixing individual flaky tests; the perf gates' own stability policy ([SN-PERF-003](perf.md#sn-perf-003)); the device farm retry behaviour ([SN-QA-009](qa.md#sn-qa-009), which reuses this policy).

#### Acceptance criteria
- [ ] The policy defines "flaky", the max quarantine duration, and the fix-owner, and is committed to `docs/qa/test-strategy.md`.
- [ ] CI detects fail-then-pass within a run/retry and surfaces a flaky-tests summary artifact per run.
- [ ] A `quarantine`-tagged test is excluded from the blocking PR set but still executed and reported in the nightly run; a `security`- or `perf`-tagged test is never retried or quarantinable (a single failure blocks).
- [ ] Quarantining a test auto-files/updates a tracking issue and the quarantine expires (re-blocks) after the SLA if unfixed.
- [ ] A dashboard/summary shows the current flaky/quarantine count per suite.

#### Technical notes
Use `flutter test`/`patrol` machine-readable output (JSON reporter) parsed by `scripts/flaky-report.mjs`; tag-based selection via `dart test --tags`/`--exclude-tags`. Retry only for `integration`-tagged, bounded to 1, logged as flaky-if-recovered. GitHub issue automation via the Actions REST API with a read/write-issues-scoped token. Reference `devsecops-pipeline.md` §2.1 and the perf-gate stability note in `performance-budgets.md` §3. No `PRD-*` (process/CI).

#### Security & privacy
Threats: a retry masking a real security-test failure (auth bypass, crypto fail-closed). Controls: the no-retry rule on `security`/`perf` tags is the key control (SSDF PW.8, MASVS-CODE-4). Baseline: the flaky report contains test names/statuses only — no note content or secrets.

#### UX notes
Developer-facing. The flaky summary must clearly separate "newly flaky" from "known quarantined" and link the tracking issue. None beyond baseline.

#### Test plan
Unit-test `scripts/flaky-report.mjs` with fixtures (fail-then-pass detection, tag exclusion, security-tag no-retry enforcement, quarantine expiry). Manual: tag a deliberately-flaky test and confirm it is quarantined + tracked, and that a `security`-tagged failure still blocks. Record in the PR.

#### Dependencies
[SN-QA-006](qa.md#sn-qa-006) (the flakiest suite to govern). Reused by [SN-QA-009](qa.md#sn-qa-009) (device farm) and referenced by [SN-QA-016](qa.md#sn-qa-016).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-009

<a id="sn-qa-009"></a>

**Set up the cloud device farm for functional and integration runs**

| Field | Value |
|---|---|
| GitHub | #912 |
| Type | infra |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | qa, compat, ci-cd |
| Size | L |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-006](qa.md#sn-qa-006), [SN-PERF-004](perf.md#sn-perf-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-AUTH-1`, `MASVS-STORAGE-1`, `OWASP-A05`, `OWASP-A08`, `CWE-200`, `CWE-522`, `SSDF-PW.8` |
| Extra labels | needs-decision, needs-credentials |

#### Context
`docs/platform/compatibility-matrix.md` §2–§3 commits Sane Notes to a Tier 1 CI-tested set (iPad Pro ProMotion, iPad Air, iPhone-ref, Android tablet + stylus, Android low-end 4 GB/Android 10–13, an Android 16 device, Chrome desktop) and a Tier 2 manual pool spanning foldables, Chromebooks/USI, Safari iPadOS, Firefox, Edge and Samsung Internet — and §7 blocks any release unless the automated functional + golden + integration suites pass on **every Tier 1 slot**. The emulator/simulator runs stood up in [SN-QA-006](qa.md#sn-qa-006) cannot reach that breadth: they miss real styluses, OEM skins, Android 16 behaviours (predictive back, edge-to-edge, 16 KB pages, forced resizability), foldable window-class changes and the real browser matrix. A cloud device farm buys that breadth on real hardware without owning every device, while the physical latency lab from [SN-PERF-004](perf.md#sn-perf-004) stays the perf authority — `docs/platform/performance-budgets.md` §3 explicitly bars emulators/simulators from being a latency or fps gate, and a shared cloud device is equally unfit for B1–B3.

#### Scope
**In:** choose and wire one cloud farm for **functional/integration** runs; define the shard matrix against the Tier 1/Tier 2 tables; run `app/integration_test` + patrol suites on it nightly and per release candidate; collect and redact artifacts (logcat/`xcresult`/screenshots/video/JUnit XML); publish a per-shard result summary; wire farm credentials through GitHub OIDC/secrets; apply the flaky policy from [SN-QA-008](qa.md#sn-qa-008); document the whole thing in `docs/qa/test-strategy.md`.
**Out:** any latency/fps/battery gate (owned by [SN-PERF-003](perf.md#sn-perf-003)/[SN-PERF-004](perf.md#sn-perf-004)); the physical device lab configs; unit/widget/golden suites, which stay on the pinned CI runner ([SN-QA-005](qa.md#sn-qa-005) needs a fixed image for byte-stable goldens).

**Maintainer decision required (`needs-decision`):** which farm — **Firebase Test Lab** (cheap, Android-strong, weak iOS/stylus coverage), **BrowserStack App Automate + Automate** (covers real iPads, Android and the browser matrix in one vendor, paid), or **AWS Device Farm**. Record the choice and its data-handling review in `docs/qa/test-strategy.md` plus an ADR if it introduces a standing vendor dependency. **`needs-credentials`:** farm account/API key, and signed dev-channel builds for the iOS shards.

#### Acceptance criteria
- [ ] A nightly workflow runs the `guest_note_flow` suite ([SN-QA-006](qa.md#sn-qa-006)) on ≥ 6 shards covering at minimum: an M-series iPad, an iPhone 15-class device, a stylus-capable Android tablet, a 4 GB Snapdragon-680-class Android 10–13 device, an Android 16 device, and Chrome desktop.
- [ ] Wall-clock for the full farm run is ≤ 45 minutes; shards run in parallel and a single shard failure does not abort the others.
- [ ] Every shard emits a JUnit-XML result plus device logs, screenshots and video on failure, attached as a run artifact and linked from the job summary.
- [ ] Farm runs execute **guest-mode only**: no real account, no OAuth token, no production endpoint; the app runs the `dev`/`beta` flavour with `SANE_AUTH_BYPASS` unset.
- [ ] Credentials are injected from GitHub OIDC/secrets at run time and appear in no log, artifact or committed file (gitleaks stays green).
- [ ] Results feed the flaky detector ([SN-QA-008](qa.md#sn-qa-008)); a farm-only failure is triaged as a compat bug via [SN-QA-010](qa.md#sn-qa-010), not silently retried.
- [ ] Tier 2 devices that the farm covers are marked in `compatibility-matrix.md` as farm-covered so [SN-QA-014](qa.md#sn-qa-014) can drop them from the manual pass.

#### Technical notes
Drive Android via `gcloud firebase test android run` (Test Lab) or the BrowserStack REST/CLI upload + `patrol test --device`; iOS via an `xctestrun`/`.ipa` upload of the `integration_test` bundle; web via the farm's Selenium grid with `flutter drive` + chromedriver against the CanvasKit build (`docs/platform/web.md`, ADR-0010). Build artifacts come from the flavour matrix in [SN-FND-005](devx.md#sn-fnd-005) and the CI defined in [SN-FND-003](ci-cd.md#sn-fnd-003); job placement follows `docs/security/devsecops-pipeline.md` §2 (nightly + release-candidate stages, least-privilege `permissions:`, pinned action SHAs). Shard definitions live beside the reference-device configs in `tools/device_lab/` so the farm matrix and the physical lab stay in one vocabulary. Capability-gate native-only steps per `compatibility-matrix.md` §6 rather than hardcoding platform checks. No `PRD-*` requirement — this is verification infrastructure for all of them.

#### Security & privacy
Threats: a third-party device farm is a **new trust boundary and a new data flow**, so `docs/security/threat-model.md` gets a row in the same PR (`ssdlc-process.md` §2.1 gate). Concrete risks: shared/rooted farm devices retaining app data between tenants (MASVS-STORAGE-1); screenshots or video capturing note content (MASVS-PRIVACY-1/2, CWE-200); farm API keys or a signing identity leaking into logs (CWE-522, OWASP-A05); a compromised vendor injecting into the build/test path (OWASP-A08). Controls: synthetic fixtures only ([SN-QA-011](qa.md#sn-qa-011)) so no artifact can contain real content; guest-mode-only runs with no real credential or token on a shared device (MASVS-AUTH-1); ephemeral device sessions with post-run wipe requested; secrets via OIDC/short-lived tokens, never committed; artifact retention capped and artifacts marked non-public; vendor data-processing terms reviewed by the Security Owner before enabling (GDPR/DPDP processor check).

#### UX notes
No end-user UI. The runs exercise the Library and Editor screens from `design/Sane Notes.dc.html` (§6, §7 in `docs/design/screens-and-flows.md`) across the Compact/Medium/Expanded window classes (`compatibility-matrix.md` §5), so screenshots double as a cross-device visual sanity pass for the active look and dark mode — though pixel-exact theming stays with the golden matrix ([SN-QA-005](qa.md#sn-qa-005)). Developer surface: a job summary table of shard × pass/fail with one-click artifacts, with status conveyed by text as well as colour.

#### Test plan
Add `.github/workflows/device-farm.yml` and `tools/device_lab/farm_shards.yaml`; unit-test the shard-matrix expander and the artifact-redaction filter in `tools/scripts/test/farm_shards_test.mjs`. Verify by: (1) a green nightly run across all shards; (2) a deliberately failing assertion producing screenshot/video artifacts on exactly the failing shard; (3) a grep over collected artifacts proving no credential and no non-synthetic content; (4) re-running to confirm flaky detection attributes shard-only failures correctly.

#### Dependencies
[SN-QA-006](qa.md#sn-qa-006) (the e2e harness being run), [SN-PERF-004](perf.md#sn-perf-004) (device-tier vocabulary and the physical lab boundary). Applies the policy from [SN-QA-008](qa.md#sn-qa-008); feeds [SN-QA-014](qa.md#sn-qa-014) and [SN-QA-016](qa.md#sn-qa-016). Blocked until the maintainer picks a vendor and supplies credentials.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-010

<a id="sn-qa-010"></a>

**Define the bug-triage process, severity taxonomy and report templates**

| Field | Value |
|---|---|
| GitHub | #913 |
| Type | docs |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | qa, docs |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-002](qa.md#sn-qa-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `SSDF-RV.1`, `SSDF-RV.2`, `SSDF-RV.3`, `CWE-532`, `ASVS-V7` |
| Extra labels | agent-ready |

#### Context
From M1 onward the project will receive bugs from three very different pipes — CI/farm failures, the beta programme ([SN-QA-015](qa.md#sn-qa-015)), and (later) public reports — and without one written taxonomy every reporter invents their own severity, security bugs risk being filed in the open, and nothing is comparable across milestones. `docs/security/ssdlc-process.md` §3 already fixes the **vulnerability** side (Critical/High/Medium/Low with acknowledge/triage/fix SLAs and the rule that security bugs never get a public issue), and §5 requires a regression test for every fixed vuln. This issue defines the **functional-bug** counterpart that sits next to it: an S1–S4 severity taxonomy tied to the product's own promises (data loss, latency budget, zero-knowledge), a triage cadence and owner, the routing rule that sends anything security-shaped into the private-advisory path instead, and the issue templates/labels that make a report actionable by an autonomous agent.

#### Scope
**In:** write `docs/qa/bug-triage.md` (taxonomy, triage cadence, routing, re-open/regression rules, dedupe policy, SLA table); add/extend `.github/ISSUE_TEMPLATE/bug_report.yml` with the fields triage needs (build flavour + version, platform/OS/device from the compatibility matrix, stylus type, look + light/dark, steps, expected/actual, frequency, logs-with-no-content, whether note data was lost); add a `severity: S1..S4` label set proposal to `issues/labels.json`; define the mapping from severity → priority (p0–p4) and → milestone triage; define the "no security bug in a public issue" banner and the SECURITY.md hand-off.
**Out:** the vulnerability SLA itself (already `ssdlc-process.md` §3 — this doc references it, never restates a different number); the flaky-test path ([SN-QA-008](qa.md#sn-qa-008)); the release go/no-go gate that consumes the S1/S2 count ([SN-QA-016](qa.md#sn-qa-016)).

#### Acceptance criteria
- [ ] `docs/qa/bug-triage.md` exists, is linked from `docs/README.md`, `docs/qa/test-strategy.md` and `CLAUDE.md` §12, and defines S1–S4 with concrete, testable examples: **S1** = data loss, corruption, a crash on launch, a broken zero-knowledge guarantee, or auth bypass; **S2** = a core flow blocked with no workaround, or a missed decision-7 latency/fps budget on a Tier 1 device; **S3** = a degraded flow with a workaround, or a Tier 2 cosmetic break; **S4** = polish/nit.
- [ ] Triage SLA is stated and measurable: S1 triaged same working day and fixed or reverted before the next release candidate; S2 triaged ≤ 2 working days; S3/S4 triaged at the weekly sweep; every triaged bug leaves with a severity label, a priority label, a milestone and an owner.
- [ ] Severity → priority mapping is explicit (S1 → p0, S2 → p1, S3 → p2/p3, S4 → p3/p4) and matches `issues/labels.json` definitions.
- [ ] The bug template refuses to accept a report without build flavour + version, platform/OS/device, and reproduction steps, and it carries a visible banner routing suspected security/privacy issues to the private advisory path in `SECURITY.md` instead of a public issue.
- [ ] The template's log/attachment guidance states that logs must be the redacted diagnostics bundle (`docs/architecture/overview.md` §8.2) and that screenshots of real notes must not be attached.
- [ ] Every fixed bug requires a regression test naming its file, per `ssdlc-process.md` §5 and `CLAUDE.md` §10; a bug closed without one fails review.
- [ ] Re-open and duplicate rules are defined (a returning bug re-opens the original and the regression test is strengthened rather than a new issue being filed).

#### Technical notes
Pure process + templates: `docs/qa/bug-triage.md`, `.github/ISSUE_TEMPLATE/bug_report.yml` (GitHub issue forms so fields are enforced, not optional prose), and a `severity` block appended to `issues/labels.json` — run `node scripts/validate-issues.mjs` after touching that file (`CLAUDE.md` §11). Keep the taxonomy consistent with the perf budgets in `docs/platform/performance-budgets.md` §1 (B1–B10) so "missed budget" is unambiguous, and with the tier definitions in `docs/platform/compatibility-matrix.md` §1 so "Tier 2 cosmetic" is unambiguous. Triage roles come from the RACI in `ssdlc-process.md` §1 (Maintainer triages; Implementer fixes). No `PRD-*` requirement — this is process.

#### Security & privacy
Threats: a reporter pasting note content, tokens, cloud file paths or a recovery code into a **public** issue (CWE-532, MASVS-PRIVACY-1); a genuine vulnerability disclosed in the open before a fix exists (coordinated-disclosure breach, `SECURITY.md`); triage losing a security bug into the functional backlog where the §3 SLA does not apply (SSDF RV.1/RV.2). Controls: the routing banner and a template checkbox acknowledging the private path; attachment guidance limited to the redacted diagnostics bundle; a triage step that re-classifies any privacy/security-shaped report into an advisory and deletes the public copy; root-cause + regression test required on close (SSDF RV.3); privacy-notice wording for what a bug report collects (MASVS-PRIVACY-4, ASVS V7 logging/error handling).

#### UX notes
The issue form is a real user-facing surface for beta testers, so it must read in plain language, use the product's own vocabulary (notebook, page, look, stylus) from `docs/design/screens-and-flows.md`, and stay short enough to fill on a phone. Accessibility baseline: every field has a label and help text, required fields are marked in text (not colour alone), and the form is fully keyboard-navigable on web. If an in-app "report a problem" entry point is added later it must live in Settings → Privacy & export (`screens-and-flows.md` §12) and reuse this taxonomy.

#### Test plan
No runtime code. Verification: (1) `node scripts/validate-issues.mjs` passes after the label addition; (2) a link-check over the new doc; (3) a dry-run triage of three seeded sample reports (a data-loss report, a latency report, a suspected-privacy report) proving each lands in the right severity and the privacy one is routed to the advisory path; (4) reviewer confirms no number in the doc contradicts `ssdlc-process.md` §3. Record the dry run in the PR.

#### Dependencies
[SN-QA-002](qa.md#sn-qa-002) (test-strategy doc it links from). Consumed by [SN-QA-009](qa.md#sn-qa-009), [SN-QA-014](qa.md#sn-qa-014), [SN-QA-015](qa.md#sn-qa-015) and [SN-QA-016](qa.md#sn-qa-016); coordinates with [SN-SEC-001](security.md#sn-sec-001) for the vulnerability path.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-011

<a id="sn-qa-011"></a>

**Build test-data factories and deterministic synthetic fixtures**

| Field | Value |
|---|---|
| GitHub | #914 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | qa, devx, storage |
| Size | M |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-003](qa.md#sn-qa-003), [SN-CORE-002](storage.md#sn-core-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-CRYPTO-2`, `MASVS-CODE-4`, `CWE-798`, `CWE-330`, `SSDF-PW.8` |
| Extra labels | agent-ready |

#### Context
Nearly every test in the repo needs a document to test against — a notebook with pages, a page with strokes, a `.sanenote` bundle, a 1,000-page library — and if each area invents its own ad-hoc builders the fixtures drift, tests become non-deterministic, and someone eventually drops a real note into `test/fixtures/`. The document model is fixed by `docs/architecture/document-model.md` and ADR-0005 (Workspace → Profiles → Notebooks → Pages → Layers → Objects, add-wins id set + LWW registers + per-object HLC) and the bundle by `docs/architecture/file-format.md`, so a single shared factory layer can serve unit, widget, golden, integration, chaos ([SN-QA-012](qa.md#sn-qa-012)) and fuzz ([SN-QA-013](qa.md#sn-qa-013)) tests alike. This issue builds that layer on top of the headless harness from [SN-QA-003](qa.md#sn-qa-003), and makes "synthetic only, seeded, reproducible" a mechanical property rather than a rule people remember.

#### Scope
**In:** a test-support factory set — `workspace()`, `profile()`, `notebook()`, `page()`, `layer()`, `stroke()`, `textObject()`, `imageObject()`, `audioAnchor()` — each taking a seed and sensible defaults and returning immutable `sane_core` value objects with deterministic ids and HLC stamps; a synthetic ink generator producing realistic sample streams (pressure/tilt/azimuth/timestamp curves, palm-rejection noise, a coalesced-sample burst) from a seed; scale fixtures generated on demand (a 1,000-page notebook, a 600-page PDF stand-in, a 5,000-stroke page) so no huge binary is committed; a small committed corpus of canonical `.sanenote` bundles (v1 valid, empty, unicode/RTL titles, and a deliberately truncated one); and a CI check that fails if a fixture file is added outside the allowed synthetic paths.
**Out:** the malformed/hostile parser corpus ([SN-QA-013](qa.md#sn-qa-013) and [SN-SEC-010](security.md#sn-sec-010)); perf workloads ([SN-PERF-002](perf.md#sn-perf-002)); each area's own domain fixtures built *using* these factories.

#### Acceptance criteria
- [ ] Every factory is seeded: the same seed produces byte-identical objects and serialised bytes across runs, machines and OSes (asserted by a round-trip hash test).
- [ ] Ids and HLC stamps are deterministic under the `FakeClock` from [SN-QA-003](qa.md#sn-qa-003); two replicas built from the same seed merge to an identical state hash (the oracle [SN-QA-012](qa.md#sn-qa-012) depends on).
- [ ] Scale fixtures are generated, not committed: a 1,000-page notebook builds in < 5 s in a test and the repo grows by no binary larger than 256 KB per committed fixture.
- [ ] The synthetic ink generator emits pressure/tilt/azimuth within valid ranges and monotonic timestamps, and can be told to omit pressure (to model a finger or a USB-C Pencil per `docs/platform/compatibility-matrix.md` §4).
- [ ] All committed fixtures are provably synthetic: a CI check scans `**/test/fixtures/**` for email/phone/URL-shaped strings, non-test crypto material and oversized binaries, and fails on a hit.
- [ ] Factories are usable from pure-Dart tests with **no** `package:flutter` import, so arch-lint stays green for `sane_core`, `sane_ink`, `sane_sync`, `sane_crypto`, `sane_search`, `sane_ml` and `sane_billing`.
- [ ] The factory API is documented in `docs/qa/test-strategy.md` with a copy-pasteable example per test layer.

#### Technical notes
Ship as a `dev_dependency` test-support package (e.g. `packages/sane_test_support/`) or a shared `test/support/` mirrored per package — whichever keeps the dependency DAG in `docs/architecture/overview.md` §5 intact; it must never become a runtime dependency of a shipped package, and it must not create a sideways edge between feature packages. Objects are the immutable value objects from [SN-CORE-002](storage.md#sn-core-002); CRDT stamping follows [SN-CORE-003](sync.md#sn-core-003); bundle writing uses the reader/writer from [SN-CORE-005](storage.md#sn-core-005) once it lands, and a minimal local writer before that. Seeded randomness uses a plain deterministic PRNG — never `Random.secure()` — and that distinction is documented so nobody copies the pattern into production key generation. Docs: `document-model.md`, `file-format.md`, ADR-0005, `CLAUDE.md` §6 (immutability, no mutable globals). No `PRD-*` requirement.

#### Security & privacy
Threats: real user notes, emails, phone numbers or cloud paths committed as fixtures (MASVS-PRIVACY-1/2, CWE-532 adjacency); a real key, token or recovery code pasted into a fixture (CWE-798, gate rule 2 in `CLAUDE.md` §7); a test PRNG being mistaken for a CSPRNG and leaking into production key/nonce generation (CWE-330, MASVS-CRYPTO-2). Controls: synthetic-only factories plus the CI fixture scanner as an enforcing gate; gitleaks/trufflehog already cover committed secrets and must stay green; the PRNG type is named `SeededTestRandom` and dartdoc'd "test only — never for keys, nonces or salts"; any crypto fixture uses published, non-secret test vectors only (ADR-0007, `docs/architecture/crypto.md`). Factories never touch the real file system outside a temp dir and never write to the user's store.

#### UX notes
Developer-facing. The factories are the place where "what a realistic note looks like" is encoded, so their defaults should mirror the seeded sample data in `design/Sane Notes.dc.html` (Library cards, notebook titles, subjects) and `docs/design/screens-and-flows.md` §17 so widget and golden tests render plausible, well-proportioned content in all 17 looks and dark mode rather than lorem noise. Provide a fixture with a long RTL/Arabic title and a Devanagari title so i18n and text-overflow regressions surface early ([SN-I18N-001](i18n.md#sn-i18n-001)). None beyond that baseline.

#### Test plan
Add `packages/sane_test_support/lib/factories.dart` with `packages/sane_test_support/test/factories_test.dart` (seed determinism, id/HLC stability, range validity of synthetic ink), `bundle_fixtures_test.dart` (canonical `.sanenote` round-trip, truncated bundle rejected), `scale_fixtures_test.dart` (1,000-page build time and memory), and `tools/scripts/test/fixture_scan_test.mjs` for the fixture scanner (positive and negative cases). All run in the CI `unit-tests` job.

#### Dependencies
[SN-QA-003](qa.md#sn-qa-003) (headless harness, FakeClock, matchers), [SN-CORE-002](storage.md#sn-core-002) (document-model entities); uses [SN-CORE-003](sync.md#sn-core-003) and [SN-CORE-005](storage.md#sn-core-005) as they land. Consumed by [SN-QA-004](qa.md#sn-qa-004), [SN-QA-005](qa.md#sn-qa-005), [SN-QA-006](qa.md#sn-qa-006), [SN-QA-012](qa.md#sn-qa-012), [SN-QA-013](qa.md#sn-qa-013) and every feature area's tests.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-012

<a id="sn-qa-012"></a>

**Implement multi-device convergence and fault-injection tests for sync**

| Field | Value |
|---|---|
| GitHub | #915 |
| Type | test |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | qa, sync |
| Size | L |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-011](qa.md#sn-qa-011), [SN-CORE-003](sync.md#sn-core-003), [SN-SYNC-002](sync.md#sn-sync-002) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-CRYPTO-2`, `MASVS-NETWORK-1`, `MASVS-CODE-4`, `ASVS-V5`, `OWASP-A02`, `OWASP-A08`, `CWE-345`, `CWE-354`, `SSDF-PW.8` |
| Extra labels | agent-ready |

#### Context
The M4 exit criteria in `docs/roadmap.md` are unusually absolute: "two devices editing offline then syncing converge with **no data loss**", "everything written to the cloud is **ciphertext only**", and "AEAD tag verified before use, **fail-closed**". Those are properties of a distributed system under failure, and no happy-path integration test can establish them — they need adversarial, deterministic fault injection against the op-log/CRDT stack described in `docs/architecture/sync.md`, ADR-0006 (sync over user cloud drives) and ADR-0005 (add-wins set + LWW registers + HLC). A user's own cloud drive is a hostile-by-accident transport: it reorders, duplicates, truncates, rate-limits, runs out of quota, and returns stale reads. This issue builds the QA-owned convergence and fault-injection suite that makes each of those failure modes a repeatable, seeded test with a hard oracle, so a data-loss regression fails CI instead of surfacing as a lost lecture.

#### Scope
**In:** a deterministic in-memory multi-replica harness (N simulated devices over a fake cloud-drive adapter) plus a scenario matrix of injected faults: network partition then reconciliation; out-of-order and duplicated segment delivery; a truncated/half-written segment; a crash between op-log append and snapshot; clock skew and a backwards-jumping wall clock (HLC must still order correctly); drive-level 409/429/quota-exceeded/5xx and a stale read-after-write; a single-bit flip in a ciphertext segment; a segment written by an unknown/rotated key. Each scenario asserts a three-part oracle: **(1) convergence** — all replicas reach an identical state hash; **(2) no loss** — every acknowledged op is present in the merged state; **(3) fail-closed** — a tampered or undecryptable segment is rejected whole, never partially applied, and never surfaces plaintext.
**Out:** the long-running, real-drive soak harness and its dashboards ([SN-SYNC-025](sync.md#sn-sync-025)), which this suite's scenarios feed; the cloud-drive adapters themselves ([SN-SYNC-003](sync.md#sn-sync-003), [SN-SYNC-004](sync.md#sn-sync-004)); crypto primitive correctness ([SN-CRY-001](security.md#sn-cry-001)); performance of sync ([SN-PERF-001](perf.md#sn-perf-001)).

#### Acceptance criteria
- [ ] Every scenario is seeded and reproducible: the same seed replays the identical interleaving, and a failing run prints the seed plus a minimal reproduction script.
- [ ] Convergence oracle: after reconciliation, all N replicas produce an identical document state hash for ≥ 3 replicas across ≥ 20 randomised interleavings per scenario.
- [ ] No-loss oracle: for every op the local store acknowledged, the op is present in the merged state of every replica; a deliberately dropped op makes the test fail (mutation check).
- [ ] Fail-closed oracle: a bit-flipped ciphertext segment fails AEAD verification, is rejected in full, applies zero ops, logs no plaintext and surfaces a typed `SyncFailure`/`CryptoFailure` rather than an exception across the package boundary.
- [ ] Concurrent-edit semantics are asserted against ADR-0005: concurrent adds both survive (add-wins), concurrent property writes resolve by HLC (LWW) with a deterministic tie-break, and a delete concurrent with an edit resolves as the document model specifies.
- [ ] A crash injected between op-log append and snapshot loses nothing on restart (replay from the last snapshot + segments reconstructs the acknowledged state).
- [ ] Drive-error scenarios (429/quota/5xx) result in retry-with-backoff and eventual convergence, never in a partially applied or silently dropped segment.
- [ ] A ciphertext-only assertion runs over every byte the fake drive received: no plaintext object id, title, stroke coordinate or text run appears in any written blob.
- [ ] The whole suite runs headlessly in < 3 minutes in the CI `unit-tests` job, is tagged so it cannot be retried or quarantined ([SN-QA-008](qa.md#sn-qa-008)), and is excluded from flaky tolerance.

#### Technical notes
Build on the headless harness ([SN-QA-003](qa.md#sn-qa-003)) and factories ([SN-QA-011](qa.md#sn-qa-011)); replicas are plain `sane_sync` instances wired to an in-memory fake implementing the cloud-drive port, with a scriptable fault middleware (delay, reorder, duplicate, truncate, corrupt, error-code, stale-read). Op-log segments and snapshots per [SN-SYNC-002](sync.md#sn-sync-002) and `docs/architecture/sync.md`; CRDT merge per [SN-CORE-003](sync.md#sn-core-003)/ADR-0005; envelope encryption per ADR-0007 with **fixed public test vectors**, never a real key. Everything stays pure Dart (no `package:flutter`) so it runs in `dart test`; no sideways package import — coordination lives in the test harness, not between packages (`overview.md` §5). Property-style generation (seeded operation sequences) plus a small shrinker gives minimal counterexamples. Verifies PRD-03 `PRD-SYNC-*` and `PRD-KEY-*` behaviour cited by the sync/crypto issues.

#### Security & privacy
Threats this directly tests: **tampered ciphertext accepted** (CWE-345 insufficient integrity check, MASVS-CRYPTO-2, OWASP-A02); **partial application of an untrusted segment** (CWE-354, fail-open behaviour — `CLAUDE.md` §7 rule 1 demands verify-then-use and fail closed); **plaintext reaching the user's cloud** (MASVS-STORAGE-1, the zero-knowledge guarantee in ADR-0004); **replay/duplicate segments** causing divergence or resurrection of deleted objects; **a rotated-out collaborator's key still decrypting** (checked as an unknown-key scenario, aligning with the M6 key-rotation criterion). Controls asserted, not merely described: AEAD verification before use, whole-segment rejection, typed `Result`/`Failure` returns, ciphertext-only egress assertion, and a no-PII-in-logs assertion over the log sink during every scenario (MASVS-NETWORK-1 for transport expectations, ASVS V5 for validation). Fixtures use synthetic content and published test vectors only.

#### UX notes
No UI in this suite, but its failures map directly to user-visible states the editor must show: sync-paused, conflict-resolved, "this notebook could not be decrypted", and offline. Each fail-closed scenario asserts the typed failure carries a user-safe message **key** (localisable via `sane_ui`/l10n, `overview.md` §8.1) rather than a raw exception string, so the Settings → Sync & backup surface (`docs/design/screens-and-flows.md` §12) and the editor's sync indicator can render a real, translated, non-alarming message with an actionable next step. None beyond that baseline.

#### Test plan
Add `packages/sane_sync/test/convergence/multi_replica_harness.dart` plus `convergence_test.dart` (partition/reorder/duplicate/interleaving), `fault_injection_test.dart` (truncated segment, crash-before-snapshot, drive 429/quota/5xx, stale read), `tamper_fail_closed_test.dart` (bit-flip, unknown key, replay) and `ciphertext_only_test.dart` (byte-scan of everything written to the fake drive). Include a mutation check that deliberately drops an op and proves the no-loss oracle fails. Tagged `security` so no retry applies. Scenarios are exported for reuse by the real-drive soak in [SN-SYNC-025](sync.md#sn-sync-025).

#### Dependencies
[SN-QA-011](qa.md#sn-qa-011) (factories/determinism), [SN-CORE-003](sync.md#sn-core-003) (CRDT semantics), [SN-SYNC-002](sync.md#sn-sync-002) (op-log segments & snapshots); relates to [SN-SYNC-001](sync.md#sn-sync-001), [SN-CRY-001](security.md#sn-cry-001) and [SN-SYNC-025](sync.md#sn-sync-025).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-013

<a id="sn-qa-013"></a>

**Curate the fuzz corpus and the crash-to-regression-test pipeline**

| Field | Value |
|---|---|
| GitHub | #916 |
| Type | test |
| Priority | p1 |
| Milestone | M3 Audio & Recognition |
| Platforms | core |
| Areas | qa, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-011](qa.md#sn-qa-011), [SN-SEC-010](security.md#sn-sec-010) |
| Security controls | `MASVS-CODE-4`, `MASVS-PLATFORM-3`, `ASVS-V5`, `OWASP-A03`, `OWASP-A08`, `CWE-20`, `CWE-400`, `CWE-502`, `CWE-787`, `SSDF-PW.8`, `SSDF-RV.3` |
| Extra labels | agent-ready |

#### Context
`docs/security/ssdlc-process.md` §2.4 makes parser fuzzing a **MUST for any parser change** — `sane_pdf`, `sane_audio`, image decode and `.sanenote` unpack — and `CLAUDE.md` §10 repeats it as a verification-stage requirement closing TM-E-04 and TM-D-01. [SN-SEC-010](security.md#sn-sec-010) owns the *runner*: the fuzzing engine, the AddressSanitizer build for native decoders and the CI job. What is still missing is the QA half that makes fuzzing pay off over time: a curated, shared **corpus** with a defined layout and seeding policy, corpus minimisation so the nightly run stays affordable, deduplicated crash triage, and — most importantly — the pipeline that turns every crash into a committed, minimised **regression test** that runs in the fast PR suite forever after, as `ssdlc-process.md` §3 requires of every fixed vulnerability. Without that loop a fuzzer finds the same bug twice and the fix is never protected.

#### Scope
**In:** the corpus layout and policy (`tools/fuzz/corpus/<target>/` for `pdf`, `image`, `audio`, `sanenote`, with a `seeds/` and a `regressions/` subtree); seed-generation from the synthetic factories ([SN-QA-011](qa.md#sn-qa-011)) plus small hand-written structurally-valid samples; a minimisation step so the committed corpus stays under a size budget; crash triage tooling that deduplicates by a normalised stack/ASAN signature, minimises the input, and opens or updates one tracking issue per unique signature via the taxonomy in [SN-QA-010](qa.md#sn-qa-010); a generator that emits a `*_fuzz_regression_test.dart` per confirmed crash with the minimised input committed as a fixture; and documentation of the loop in `docs/qa/test-strategy.md`.
**Out:** the fuzzing engine, ASAN build and CI job ([SN-SEC-010](security.md#sn-sec-010)); the PDF-specific malformed corpus ([SN-PDF-002](pdf.md#sn-pdf-002)'s area, tracked separately) and the `.sanenote` corruption corpus ([SN-CORE-005](storage.md#sn-core-005)'s area) — this issue defines the shared home, format and pipeline they all plug into; production hardening of the parsers themselves (each owning area).

#### Acceptance criteria
- [ ] The corpus layout, naming (`<target>/<seeds|regressions>/<sha256-prefix>.<ext>`) and size budget (≤ 5 MB total committed, no single input > 64 KB after minimisation) are documented and enforced by a CI check.
- [ ] Seeds exist for all four targets and are provably synthetic — no third-party or user-supplied document is committed without an explicit licence note, and the fixture scanner from [SN-QA-011](qa.md#sn-qa-011) runs over the corpus.
- [ ] Crash triage deduplicates: two inputs producing the same normalised signature produce **one** tracking issue, and a repeat crash updates rather than duplicates it.
- [ ] Every confirmed crash produces a committed minimised input under `regressions/` plus a generated `*_fuzz_regression_test.dart` that asserts the parser now returns a typed `Failure` (fail-closed) instead of crashing, hanging or allocating unboundedly.
- [ ] Regression tests run in the **fast PR suite** (not just nightly), are tagged `security`, and are therefore never retried or quarantinable ([SN-QA-008](qa.md#sn-qa-008)).
- [ ] Each regression test asserts the resource caps hold: parsing is bounded in time and memory (no decompression bomb, no unbounded allocation) and runs **off the UI isolate** per `CLAUDE.md` §7 rule 8.
- [ ] A seeded, deliberately-crashing stub parser exercises the whole loop end to end in CI (crash → triage → minimised fixture → generated regression test) so the pipeline itself is tested.

#### Technical notes
Corpus and tooling live under `tools/fuzz/` next to the runner from [SN-SEC-010](security.md#sn-sec-010); triage/minimisation scripts as Node ESM in `tools/scripts/` alongside the other repo scripts, consistent with `scripts/validate-issues.mjs` conventions. Signature normalisation strips addresses/offsets and keeps the top frames of the Dart or ASAN stack. Generated tests target the parser entry points behind `Result<T, Failure>` (`overview.md` §8.1) — the assertion is always "typed failure, no throw across the package boundary, no partial object graph". Issue automation reuses the labels and severity mapping from [SN-QA-010](qa.md#sn-qa-010); a parser crash on untrusted input is at least S2 and, if it is reachable from an import or a deep link, it goes down the private-advisory path in `SECURITY.md` instead of a public issue. Relevant docs: `ssdlc-process.md` §2.4/§3, `secure-coding-checklist.md` §1 (input validation), `docs/architecture/file-format.md`, ADR-0014 (PDF engine), ADR-0015 (audio pipeline). Verifies the hostile-import exit criteria for M2 in `docs/roadmap.md`. Scheduled in M3 because it plugs into the fuzzing runner ([SN-SEC-010](security.md#sn-sec-010), M3, which also covers the M3 audio decode path); it still validates the M2 hostile-import exit criteria.

#### Security & privacy
Threats: memory corruption or unbounded resource use in a native/C decoder reached from an imported PDF, image, audio file or `.sanenote` bundle (CWE-787, CWE-400, CWE-20, TM-E-04); unsafe deserialisation of a crafted bundle (CWE-502); a fixed crash silently regressing (SSDF RV.3 root-cause + prevention). Controls: the corpus + regression loop is itself the control (MASVS-CODE-4, ASVS V5, SSDF PW.8); every regression test asserts fail-closed behaviour, resource caps before decode, path confinement and off-UI-isolate parsing per `secure-coding-checklist.md` §1 and `CLAUDE.md` §7 rule 8 (MASVS-PLATFORM-3 for untrusted external input). Privacy: corpus inputs are synthetic or explicitly licensed — never a real user document; crash artifacts are scanned before attachment so no file content leaks into a public issue; a crash reachable pre-authentication or via a link is disclosed privately, not in the tracker.

#### UX notes
No end-user UI, but the loop encodes the user-visible contract for a bad file: a hostile or corrupt import must fail into a **user-safe error state**, never a crash or a half-imported notebook. Each generated regression test asserts a typed failure carrying a localisable message key so the Import PDF overlay (`docs/design/screens-and-flows.md` §9) and the library import flow can show a calm, actionable message ("This file couldn't be opened") in all 17 looks and dark mode, with the error announced to screen readers per `docs/design/accessibility.md`. None beyond that baseline.

#### Test plan
Add `tools/fuzz/corpus/` with seeds for the four targets; `tools/scripts/fuzz-triage.mjs` + `tools/scripts/fuzz-regression-gen.mjs` with unit tests in `tools/scripts/test/fuzz_triage_test.mjs` (dedupe by signature, minimisation, issue create-vs-update) and `fuzz_regression_gen_test.mjs` (generated test compiles and asserts fail-closed). Add the loop smoke test `tools/scripts/test/fuzz_loop_e2e_test.mjs` driving the deliberately-crashing stub parser. Corpus size/licence checks run in CI.

#### Dependencies
[SN-QA-011](qa.md#sn-qa-011) (synthetic seed generation and the fixture scanner), [SN-SEC-010](security.md#sn-sec-010) (fuzzing runner, ASAN build, CI job). Uses [SN-QA-010](qa.md#sn-qa-010) for severity/routing; feeds [SN-QA-016](qa.md#sn-qa-016) (release gate requires a clean fuzz run) and the parser areas [SN-PDF-001](pdf.md#sn-pdf-001), [SN-AUD-001](audio.md#sn-aud-001), [SN-MED-001](images-media.md#sn-med-001), [SN-CORE-005](storage.md#sn-core-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-014

<a id="sn-qa-014"></a>

**Author per-milestone manual test plans and exploratory charters**

| Field | Value |
|---|---|
| GitHub | #917 |
| Type | docs |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | qa, compat, docs |
| Size | L |
| SDLC | verification |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-002](qa.md#sn-qa-002), [SN-QA-010](qa.md#sn-qa-010) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-AUTH-1`, `MASVS-STORAGE-1`, `ASVS-V5`, `SSDF-PW.8` |
| Extra labels | agent-ready |

#### Context
Automation cannot see everything that matters in a pen-first app: whether the ink *feels* attached to the nib, whether palm rejection survives a real resting hand, whether a fold/unfold keeps the editor state, whether a look reads well on a real panel in sunlight. `docs/platform/compatibility-matrix.md` §1 explicitly defines **Tier 2 — Manual**: smoke-tested by a human every release on the base iPad, iPad mini, Pixel Tablet, a foldable, a Chromebook with USI, Galaxy Tab and S-Ultra, Safari iPadOS/macOS, Firefox, Edge and Samsung Internet — and §7 requires those gaps be documented rather than ignored. Each milestone in `docs/roadmap.md` also carries explicit human-verifiable exit criteria (M1 "write → close → reopen preserves strokes byte-for-byte"; M2 "switching profiles swaps the entire visible dataset"; M3 "airplane-mode recognition"; M4 "two devices converge"; M5 foldables). This issue turns those into repeatable manual test plans and session-based exploratory charters that a human — or an agent driving a device — can execute and sign off.

#### Scope
**In:** `docs/qa/manual-test-plans/` containing (1) one plan per milestone M0–M8 whose cases are derived one-for-one from that milestone's roadmap exit criteria, each case written as preconditions / steps / expected result / severity-if-failed; (2) a **Tier 2 smoke script** (≤ 30 minutes per device) covering launch, create notebook, draw with the device's stylus, type text, import a PDF, search, switch look + dark mode, rotate/resize, and offline use; (3) **exploratory charters** in session-based form (charter, time-box, tester, areas touched, notes, bugs found) for the areas automation covers worst: stylus feel and palm rejection, gesture conflicts, long-writing sessions, foldable/window-class changes, and first-run onboarding; (4) a results template that records device, OS, build, flavour, pass/fail per case and the resulting bug keys.
**Out:** automated suites ([SN-QA-003](qa.md#sn-qa-003)–[SN-QA-006](qa.md#sn-qa-006)); the cloud farm's automated coverage ([SN-QA-009](qa.md#sn-qa-009), which shrinks this manual list); measured perf numbers ([SN-PERF-002](perf.md#sn-perf-002)) — manual plans record *perceived* lag only and defer to the harness; the release go/no-go gate that consumes the results ([SN-QA-016](qa.md#sn-qa-016)).

#### Acceptance criteria
- [ ] A plan exists for every milestone M0–M8 and every roadmap exit criterion appears as at least one numbered, executable case with an unambiguous expected result.
- [ ] Each case states the severity if it fails, using the S1–S4 taxonomy from [SN-QA-010](qa.md#sn-qa-010), so results convert straight into triaged bugs.
- [ ] The Tier 2 smoke script names every device class in `compatibility-matrix.md` §2's manual pool and is executable in ≤ 30 minutes per device by someone who has never used the app.
- [ ] Exploratory charters are time-boxed (60–90 min), name their target area, and include a debrief template; at least five charters cover stylus feel, palm rejection, gestures, foldables/window classes and onboarding.
- [ ] Every plan includes an explicit **offline/airplane-mode** case and an explicit **guest-mode (no account)** case, per the M1 and M4 exit criteria.
- [ ] Every plan includes an a11y spot-check (VoiceOver/TalkBack pass over the screens touched, 44 pt/48 dp targets, Dynamic Type at the largest setting) and an i18n spot-check (one RTL locale) per `docs/design/accessibility.md`.
- [ ] A filled results template from one real execution is committed as the worked example, with any gaps recorded as bugs rather than left in the doc.
- [ ] Cases that [SN-QA-009](qa.md#sn-qa-009) automates are marked so the manual pass shrinks as coverage grows, and the plan states who signs off ([SN-QA-016](qa.md#sn-qa-016) gate owner).

#### Technical notes
Pure Markdown under `docs/qa/manual-test-plans/` (`m0.md` … `m8.md`, `tier2-smoke.md`, `charters.md`, `results-template.md`), linked from `docs/qa/test-strategy.md` ([SN-QA-002](qa.md#sn-qa-002)) and `docs/README.md`. Derive cases mechanically from `docs/roadmap.md` exit-criteria checklists so the two stay traceable; use device/stylus/browser vocabulary exactly as `compatibility-matrix.md` §2–§5 defines it (Tier 1/2/3, Compact/Medium/Expanded window classes, Apple Pencil Pro / S Pen / USI / finger / mouse) so results are comparable across releases. Screen names come from `design/Sane Notes.dc.html` via `docs/design/screens-and-flows.md`. Where a case verifies a product requirement, cite its `PRD-ED-*`/`PRD-LB-*`/`PRD-*` id so the requirement → test traceability in `ssdlc-process.md` §0.4 holds end to end. No code.

#### Security & privacy
Threats: manual testing on shared or personal devices with real accounts and real notes, then attaching screenshots or logs to a public bug (MASVS-PRIVACY-1); a tester leaving a signed-in build or a test cloud account on a loaner device (MASVS-AUTH-1, MASVS-STORAGE-1). Controls: every plan mandates synthetic test content and a dedicated test account, a device-handback step (sign out, delete test profiles, wipe app data), and the redacted-diagnostics-bundle rule from `overview.md` §8.2 for any attached log. Each milestone plan also carries the security-flavoured cases from that milestone's exit criteria — hostile PDF import fails closed (M2), airplane-mode recognition with no egress (M3), ciphertext-only sync and recovery-code restore (M4) — executed as **abuse cases**, and anything suspicious is routed to the private advisory path, never a public issue (`SECURITY.md`, ASVS V5).

#### UX notes
The plans are written against the real design surfaces — Login, Profiles, Onboarding, Library, Editor (toolbar, palette dock, page rail, focus mode), Templates, Import PDF, Share, Search, Settings, Upgrade (`docs/design/screens-and-flows.md` §3–§13) — and each screen-touching case names the screen so results are unambiguous. Every plan requires at least one pass with a non-default look and one in dark mode, and calls out empty, loading, error and offline states explicitly, since those are the states automation covers least and users hit first. Accessibility and RTL spot-checks are part of the plan, not an afterthought.

#### Test plan
Documentation, so verification is by execution: (1) a reviewer confirms every roadmap exit criterion maps to a case (a small script in `tools/scripts/check-manual-coverage.mjs` can diff the roadmap checkboxes against the plan headings and is run in CI); (2) one full Tier 2 smoke run is executed against the current build and the filled results template committed; (3) one exploratory session is run and its debrief committed. Bugs found are filed through [SN-QA-010](qa.md#sn-qa-010).

#### Dependencies
[SN-QA-002](qa.md#sn-qa-002) (test-strategy doc), [SN-QA-010](qa.md#sn-qa-010) (severity taxonomy and filing route). Shrinks as [SN-QA-009](qa.md#sn-qa-009) grows; results feed [SN-QA-016](qa.md#sn-qa-016) and the beta programme [SN-QA-015](qa.md#sn-qa-015).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-015

<a id="sn-qa-015"></a>

**Define the beta rings, tester cohorts and privacy-safe feedback intake**

| Field | Value |
|---|---|
| GitHub | #918 |
| Type | task |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | qa, release, privacy |
| Size | M |
| SDLC | release |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-010](qa.md#sn-qa-010), [SN-QA-014](qa.md#sn-qa-014) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-PRIVACY-4`, `MASVS-STORAGE-1`, `CWE-532`, `ASVS-V7`, `SSDF-RV.1` |
| Extra labels | needs-credentials |

#### Context
M7 in `docs/roadmap.md` is "prove the guarantees before real users arrive", and a beta programme is the only way to find the bugs a device lab cannot: real handwriting habits, real notebooks, real cloud drives, real OEM quirks. But a beta for a **zero-knowledge, privacy-first** app cannot work the way a normal beta does — the usual "attach your data so we can reproduce" loop is exactly what this product promises never to do, telemetry is opt-in and off by default (ADR-0011, locked decision 8), and no Sane Notes server may ever hold note content (ADR-0004). This issue defines the beta **programme**: the rings and their entry/exit criteria, the tester cohorts mapped onto the compatibility matrix, the release-notes and what-to-test format, and a feedback/crash intake that is useful to engineers while collecting nothing the privacy posture forbids. The signed-build pipelines themselves are separate work ([SN-IPAD-024](ci-cd.md#sn-ipad-024) for TestFlight, [SN-REL-001](release.md#sn-rel-001) for release engineering); this issue consumes them.

#### Scope
**In:** `docs/qa/beta-program.md` defining three rings — **internal** (maintainer + agents, every RC), **closed beta** (invited cohort, milestone builds), **open beta** (public TestFlight link / Play open testing, pre-launch only) — with entry criteria (all Tier 1 automated suites green, perf budgets met, zero open S1, manual plan for the milestone executed) and exit criteria (no S1/S2 open, crash-free-session rate above the agreed floor, feedback triaged); cohort composition mapped to `compatibility-matrix.md` (each ring must cover iPad + Apple Pencil Pro, an S Pen Android tablet, a USI device, a 4 GB low-end Android, an iPhone, an Android phone, a foldable and at least two browsers); a release-notes + "what to test" template driven by the milestone's manual plan ([SN-QA-014](qa.md#sn-qa-014)); the privacy-safe feedback intake (in-app entry point → redacted diagnostics bundle → issue via the [SN-QA-010](qa.md#sn-qa-010) taxonomy); and the opt-in crash-report consent copy.
**Out:** the signed-build/upload pipelines ([SN-IPAD-024](ci-cd.md#sn-ipad-024), [SN-AND-001](compat.md#sn-and-001), [SN-REL-001](release.md#sn-rel-001)); telemetry implementation ([SN-TEL-001](telemetry.md#sn-tel-001), ADR-0011); store listing and launch ([SN-BILL-001](billing.md#sn-bill-001)/[SN-REL-001](release.md#sn-rel-001)); the pentest and audits themselves ([SN-SEC-001](security.md#sn-sec-001), [SN-A11Y-001](a11y.md#sn-a11y-001)).

**`needs-credentials`:** App Store Connect (TestFlight) and Google Play Console accounts with tester-management rights, plus the distribution signing identities — supplied by the maintainer via CI secrets, never committed (`CLAUDE.md` §13).

#### Acceptance criteria
- [ ] `docs/qa/beta-program.md` defines the three rings, each with written entry and exit criteria that are checkable, not aspirational, and names the owner of the go/no-go per ring (Release Manager per `ssdlc-process.md` §1).
- [ ] Cohort table shows the minimum device/stylus/browser coverage per ring and maps each slot to a Tier in `compatibility-matrix.md`; a ring cannot open with an unfilled Tier 1 slot.
- [ ] A release-notes template exists that states, per build: what changed, what to test (linked to the milestone manual plan), known issues, and how to report — in plain language a student can act on.
- [ ] Feedback intake collects **no note content by default**: the in-app path attaches only the redacted diagnostics bundle (`docs/architecture/overview.md` §8.2), and attaching anything else is an explicit, per-item user action with a visible warning.
- [ ] Crash reporting is **opt-in**, off by default in the beta flavour, with consent copy that says exactly what is sent and what is not; declining leaves the app fully functional.
- [ ] A documented "reproduce without the data" playbook exists (ask for steps, device, flavour, a synthetic repro; never ask for the user's notebook) and is referenced from the feedback template.
- [ ] Every incoming beta report is triaged within the [SN-QA-010](qa.md#sn-qa-010) SLA and lands with a severity, a platform label and an owner; a weekly beta-health summary reports crash-free sessions, open S1/S2 and per-cohort coverage gaps.
- [ ] Tester onboarding covers the NDA/expectations, the "this is pre-release, back up your notes" warning, and how to leave the programme and remove the build without losing local notes.

#### Technical notes
Process + templates; the mechanics ride on existing pipelines: TestFlight groups from [SN-IPAD-024](ci-cd.md#sn-ipad-024), Play internal/closed/open tracks from the Android release work, and the web/PWA beta served as a separate origin so an unstable build cannot touch the production PWA's IndexedDB state (ADR-0010, `docs/platform/web.md`). Builds are the **beta** flavour from `docs/architecture/overview.md` §7 — obfuscated, `SANE_AUTH_BYPASS` rejected, log level `info`, telemetry opt-in and defaulted off — so a beta build is never a debug build in disguise. Feedback intake is a form using the [SN-QA-010](qa.md#sn-qa-010) schema plus the ring and build number; the diagnostics bundle is the existing redacted export from Settings → Privacy & export. Store-side consent text must match the Apple Privacy Labels / Play Data Safety declarations prepared for release (`ssdlc-process.md` §2.5). No `PRD-*` requirement is implemented here; it verifies PRD-03 `PRD-TEL-*` and `PRD-PRIV-*` behaviour in the field.

#### Security & privacy
Threats: a beta build shipping with verbose logging, a bypass flag, or a third-party analytics SDK; testers mailing screenshots of real notes into a public tracker (CWE-532, MASVS-PRIVACY-1); a crash report carrying note content, keys, tokens, recovery codes or cloud file paths (MASVS-STORAGE-1, `CLAUDE.md` §7 rule 3); consent that is not real consent (pre-ticked opt-in, GDPR/DPDP violation, MASVS-PRIVACY-3/4). Controls: beta flavour asserted by CI (obfuscation on, bypass rejected, log level `info`, no analytics SDK linked — ADR-0011); the redaction allow-list applied to every diagnostics bundle before it can be attached, with a test asserting no content/keys/paths survive; opt-in crash reporting with explicit, revocable consent and a plain-language disclosure; a triage step that strips and re-files anything containing personal data (ASVS V7); a documented tester-data retention limit and deletion on leaving the programme. Any vulnerability a tester reports goes to the private advisory path in `SECURITY.md` under the `ssdlc-process.md` §3 SLA, never a public issue.

#### UX notes
Tester-facing surfaces must match the product's tone and design system: the in-app feedback entry point lives in Settings → Privacy & export (`docs/design/screens-and-flows.md` §12), uses `sane_ui` components and tokens so it renders correctly in all 17 looks and light/dark, and shows a clear "what gets sent" summary before the send action. The consent sheet must be readable (no dark patterns, decline as prominent as accept), meet the a11y baseline (Semantics labels, 44 pt/48 dp targets, ≥ 4.5:1 contrast, keyboard-reachable on web), and be localised. Release notes and the beta invite copy follow the microcopy voice captured in `docs/design/screens-and-flows.md` §16 — warm, concrete, never hype. Empty state for "no feedback sent yet" and an offline state for a failed send are both specified.

#### Test plan
No product code beyond the feedback entry point, so verification is largely procedural plus targeted tests: add `app/test/privacy/diagnostics_redaction_test.dart` asserting the bundle contains no note content, ink coordinates, tokens, keys, recovery codes, emails, phone numbers or cloud paths; `app/test/security/beta_flavour_guard_test.dart` asserting the beta flavour rejects `SANE_AUTH_BYPASS` and defaults telemetry off; a widget test `app/test/settings/feedback_consent_test.dart` proving consent is unticked by default and declining keeps the app usable. Procedurally, run one full internal-ring cycle (build → notes → cohort → feedback → triage) and commit the retrospective.

#### Dependencies
[SN-QA-010](qa.md#sn-qa-010) (triage taxonomy and routing), [SN-QA-014](qa.md#sn-qa-014) (the "what to test" plans). Consumes [SN-IPAD-024](ci-cd.md#sn-ipad-024) / [SN-REL-001](release.md#sn-rel-001) build pipelines and coordinates with [SN-TEL-001](telemetry.md#sn-tel-001) (opt-in telemetry) and [SN-PRV-001](privacy.md#sn-prv-001) (privacy posture). Blocked on maintainer-supplied store credentials.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-QA-016

<a id="sn-qa-016"></a>

**Define the release QA checklist and the go/no-go release gate**

| Field | Value |
|---|---|
| GitHub | #919 |
| Type | docs |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | qa, release, ci-cd |
| Size | M |
| SDLC | release |
| Parent | [SN-QA-001](qa.md#sn-qa-001) |
| Depends on | [SN-QA-007](qa.md#sn-qa-007), [SN-QA-014](qa.md#sn-qa-014), [SN-PERF-003](perf.md#sn-perf-003) |
| Security controls | `MASVS-CODE-4`, `MASVS-RESILIENCE-2`, `MASVS-PRIVACY-4`, `ASVS-V5`, `OWASP-A08`, `SSDF-PS.2`, `SSDF-PW.8` |
| Extra labels | agent-ready |

#### Context
Sane Notes has quality gates scattered across four documents — `docs/security/ssdlc-process.md` §2.4/§2.5 (verification and release gates, MobSF/ZAP/fuzzing/signing/SBOM/provenance/store labels), `docs/platform/compatibility-matrix.md` §7 (Tier 1 suites + perf + store compliance), `docs/platform/performance-budgets.md` §3 (per-RC budgets including the camera-rig ground truth and the 2-hour battery soak), and `docs/roadmap.md` (per-milestone exit criteria). At release time somebody has to confirm **all** of them in one pass, in a fixed order, with named owners — otherwise a release ships on a green CI badge that never covered the manual Tier 2 pass or the store privacy declarations. This issue writes the single release QA checklist and the go/no-go gate that consumes every other QA artefact, and makes it executable rather than ceremonial.

#### Scope
**In:** `docs/qa/release-checklist.md` with the ordered gate sections — (1) automated: Tier 1 functional + golden + integration suites green ([SN-QA-005](qa.md#sn-qa-005), [SN-QA-006](qa.md#sn-qa-006), [SN-QA-009](qa.md#sn-qa-009)), coverage gates met ([SN-QA-007](qa.md#sn-qa-007)), zero quarantined `security`/`perf` tests ([SN-QA-008](qa.md#sn-qa-008)); (2) performance: every decision-7 budget met on every Tier 1 device including the RC-only camera-rig and battery measurements ([SN-PERF-003](perf.md#sn-perf-003)); (3) manual: the milestone plan and Tier 2 smoke executed with results committed ([SN-QA-014](qa.md#sn-qa-014)); (4) security: verification-stage gates clean — MobSF, ZAP full scan, parser fuzzing with no reproducible crash, pentest P0/P1 fixed or risk-accepted (`ssdlc-process.md` §2.4, [SN-SEC-001](security.md#sn-sec-001), [SN-QA-013](qa.md#sn-qa-013)); (5) privacy/store: Apple Privacy Labels + privacy manifest and Play Data Safety accurate to the zero-knowledge reality, telemetry defaults off; (6) supply chain: artifacts signed/notarised, CycloneDX + SPDX SBOMs and SLSA provenance attached ([SN-CI-004](ci-cd.md#sn-ci-004)); (7) bug state: zero open S1/S2 for the release scope ([SN-QA-010](qa.md#sn-qa-010)); (8) release-blocker specials: original Sage mascot art present (no watermarked placeholder), `LICENSE` present. Plus a machine-checkable manifest and a `release-gate` CI job that fails on any unchecked item, and the sign-off table (Release Manager + Security Owner per `ssdlc-process.md` §1).
**Out:** the gates themselves (each owned by its area); the release pipeline, signing and store submission ([SN-REL-001](release.md#sn-rel-001), [SN-CI-004](ci-cd.md#sn-ci-004)); the pentest and audits ([SN-SEC-001](security.md#sn-sec-001), [SN-A11Y-001](a11y.md#sn-a11y-001)).

#### Acceptance criteria
- [ ] `docs/qa/release-checklist.md` exists, is linked from `docs/README.md`, `docs/roadmap.md` and `ssdlc-process.md` §2.5, and every item names its evidence (a CI run, an artifact, a committed results file or a named sign-off) — no item is satisfiable by opinion.
- [ ] A `release-gate` job reads a `release/<version>/gate.yaml` manifest and **fails the release workflow** if any required item is missing, unchecked, or references a stale CI run (older than the RC commit).
- [ ] The checklist encodes the hard blockers verbatim: no open S1/S2; any missed Tier 1 perf budget blocks; a reproducible fuzz crash blocks; an unresolved high MobSF or high/medium ZAP finding blocks; inaccurate store privacy declarations block; watermarked mascot art blocks (`CLAUDE.md` §9 / `docs/roadmap.md` M8).
- [ ] Risk acceptance is possible but expensive: only the Security Owner may risk-accept, only for P1-and-below, and the acceptance is recorded in the manifest with a rationale and an expiry.
- [ ] The checklist includes a rollback/halt plan (halt staged rollout, pull the build, hotfix path per `ssdlc-process.md` §4) and names who can trigger it.
- [ ] An a11y and i18n confirmation item exists (WCAG 2.2 AA on all chrome; every supported locale incl. Arabic RTL renders) referencing [SN-A11Y-001](a11y.md#sn-a11y-001) and [SN-I18N-001](i18n.md#sn-i18n-001).
- [ ] A dry run against a mock RC proves the gate fails with a missing item and passes when complete, and the run takes < 5 minutes.

#### Technical notes
The doc lives in `docs/qa/`; the manifest schema (`release/gate.schema.json`) and the checker (`tools/scripts/release-gate.mjs`, Node ESM like the other repo scripts) are the enforcement. Wire the job into the release workflow described in `docs/security/devsecops-pipeline.md` §2.6/§2.7, environment-gated, with least-privilege `permissions:` and pinned action SHAs. Where an item has a CI source of truth, the checker should query it (workflow run conclusion, artifact presence, coverage summary, perf-harness result JSON from [SN-PERF-003](perf.md#sn-perf-003)) rather than trusting a hand-ticked box; only genuinely human items (manual smoke executed, store declarations reviewed, sign-offs) stay manual and require a named approver. Keep every threshold a **reference** to its owning doc — never a second copy of a number — so budgets and SLAs cannot drift between documents. No `PRD-*` requirement; this gate verifies the milestone exit criteria across all four PRDs.

#### Security & privacy
Threats: shipping a release that silently skipped a verification gate (OWASP-A08 software/data integrity, SSDF PS.2); an unsigned or unattested artifact reaching a store; store privacy declarations that contradict the actual data flows, which is both a compliance failure and a trust failure for a zero-knowledge product (MASVS-PRIVACY-4, GDPR/DPDP); a release built from a build environment whose debug flags or bypasses were not asserted off (MASVS-RESILIENCE-2). Controls: the gate is itself the control — it requires evidence of the SAST/DAST/MobSF/fuzz/pentest results from `ssdlc-process.md` §2.4, the signing/SBOM/provenance artifacts from §2.5, and the Security Owner's sign-off on privacy declarations; the manifest is committed and reviewable so a skipped gate is visible in git history; risk acceptances are explicit, attributed and time-boxed. The checker itself handles no secrets and reads only non-sensitive run metadata.

#### UX notes
No end-user UI, but two checklist items exist purely to protect the user experience and must not be negotiable: the **17 looks × light/dark golden suite** is green ([SN-QA-005](qa.md#sn-qa-005)) so no release ships a broken theme, and the a11y confirmation covers Semantics labels, 44 pt/48 dp targets, ≥ 4.5:1 contrast, Dynamic Type and keyboard reachability on web (`docs/design/accessibility.md`). The manual items reference the real screens from `design/Sane Notes.dc.html` (Library, Editor, Settings, Share, Search) so the reviewer knows exactly what to look at. Developer surface: the gate's failure output lists exactly which items are missing and links their evidence, with status in text as well as colour.

#### Test plan
Add `tools/scripts/release-gate.mjs` with unit tests in `tools/scripts/test/release_gate_test.mjs` covering: a complete manifest passes; a missing required item fails; a stale CI-run reference fails; a risk acceptance without an approver or expiry fails; a P0 risk acceptance is rejected outright. Add a workflow smoke test that runs the gate against `release/mock-rc/gate.yaml` fixtures (one passing, one failing). Manually execute one full checklist pass against an RC build and commit the completed manifest as the worked example.

#### Dependencies
[SN-QA-007](qa.md#sn-qa-007) (coverage gate evidence), [SN-QA-014](qa.md#sn-qa-014) (manual results), [SN-PERF-003](perf.md#sn-perf-003) (perf gate evidence); consumes [SN-QA-005](qa.md#sn-qa-005), [SN-QA-006](qa.md#sn-qa-006), [SN-QA-008](qa.md#sn-qa-008), [SN-QA-009](qa.md#sn-qa-009), [SN-QA-010](qa.md#sn-qa-010), [SN-QA-013](qa.md#sn-qa-013) and coordinates with [SN-SEC-001](security.md#sn-sec-001), [SN-CI-004](ci-cd.md#sn-ci-004), [SN-REL-001](release.md#sn-rel-001), [SN-A11Y-001](a11y.md#sn-a11y-001), [SN-I18N-001](i18n.md#sn-i18n-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-023

<a id="sn-web-023"></a>

**Build the cross-browser test harness and support-matrix runs**

| Field | Value |
|---|---|
| GitHub | #836 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | qa, compat |
| Size | M |
| SDLC | verification |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-002](compat.md#sn-web-002), [SN-QA-001](qa.md#sn-qa-001) |
| Security controls | `MASVS-CODE-1`, `MASVS-PRIVACY-1`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
Web is the only surface where the runtime is chosen by the user, so "it works" has to be proven per browser. `docs/platform/compatibility-matrix.md` §3 makes **Chrome desktop the single Tier 1 web slot** (perf gates and automated suites run there) while Safari iPadOS, Safari macOS, Firefox, Edge and Samsung Internet are **Tier 2 manual** — they must be functional each release with gaps documented rather than release-blocking. `docs/platform/web.md` §12 specifies the harness: headless Chromium for automated PWA/offline/service-worker tests, a manual Tier 2 pass, a screen-reader gate, and a storage/eviction test. This issue builds that harness and the checklist so a release decision is evidence-based rather than a guess.

#### Scope
**In:** a headless-Chromium web integration job running the `app/integration_test/web/` suites in CI; a reusable page-object/driver layer; a checked-in Tier 2 manual matrix with pass/fail/known-gap per browser and per feature; capability-report collection per browser; wiring of the results into the release checklist.
**Out:** the perf and Lighthouse budgets themselves ([SN-WEB-024](perf.md#sn-web-024)), the device lab for native surfaces ([SN-PERF-004](perf.md#sn-perf-004)), the screen-reader protocol ([SN-WEB-021](a11y.md#sn-web-021)), and eviction verification ([SN-WEB-032](storage.md#sn-web-032)).

#### Acceptance criteria
- [ ] `flutter test integration_test` (web driver) runs headless Chromium in CI on every PR touching `app/`, `packages/`, `web/` or `plugins/`, and fails the PR on a red test.
- [ ] The suite covers: boot and renderer selection, note round-trip through OPFS, offline boot, service-worker update, install/manifest, file open/import, keyboard-only flow, and sign-in with a mocked provider.
- [ ] A Tier 2 manual checklist lives at `tools/device_lab/web-matrix.md` with one row per browser × feature, an owner, a date and a result; a release cannot be tagged with an empty or stale matrix.
- [ ] Each run records the browser's capability report (renderer, WasmGC, isolation, OPFS sync handles, File System Access, Ink API, altitude/azimuth, MediaRecorder mime support) so gaps are data, not folklore.
- [ ] A known-gap entry requires a linked issue; an undocumented Tier 2 failure blocks the release checklist item.
- [ ] The web job completes in under 20 minutes and is not flaky: three consecutive green runs are required before it becomes required-status.
- [ ] Test fixtures contain no real user data and no secrets.

#### Technical notes
Extend the CI workflow from [SN-FND-003](ci-cd.md#sn-fnd-003) and reuse the QA conventions from [SN-QA-001](qa.md#sn-qa-001); pin the browser and driver versions explicitly (a silent Chrome bump must not change results) and pin all actions to full commit SHAs (checklist §10). Prefer Flutter's web driver for in-app assertions and add Playwright only where native-browser behaviour (install prompt, file picker, permissions) cannot be reached from Dart (`docs/platform/web.md` §12). Keep the driver layer in `app/integration_test/web/support/` so individual tests stay readable. This suite is the concrete implementation of verification step 1 in `docs/adr/0010-web-pwa-strategy.md` ("cross-browser matrix passes") and the evidence behind `PRD-CO-412`/`PRD-CO-413` (the trial runs the real PWA and is installable). Record results against the browser rows of `docs/platform/compatibility-matrix.md` §3 in the same PR when a row changes.

#### Security & privacy
Threats: test fixtures leaking real notes or credentials into the repo (CWE-798, checklist §0.1); an unpinned browser/driver silently introducing an unvetted binary into CI (MASVS-CODE-1, CWE-1104); CI logs capturing content from a failing test (CWE-532, MASVS-PRIVACY-1). Controls: synthetic fixtures only, generated by the sample seeder ([SN-WEB-022](onboarding.md#sn-web-022)); mocked identity providers with fake tokens that are obviously non-secret; pinned browser, driver and action versions with checksum verification where the tool allows; test output redacts note text; artifacts (screenshots, traces) are retained in the private CI store only and expire.

#### UX notes
No user-facing UI, but the suite is the guard rail for UX quality: it must assert the **states**, not just the happy path — empty library, loading, error, offline and update-available — on the Library and Editor screens (`docs/design/screens-and-flows.md` §6, §7). Include at least one golden comparison per run across two looks in light and dark so a theme regression on web is caught (all **17 looks** are covered by the shared theme goldens from [SN-DS-002](design-system.md#sn-ds-002)). The manual matrix template must be readable as plain Markdown for accessibility.

#### Test plan
- `app/integration_test/web/support/driver_test.dart` — sanity tests for the page-object layer itself.
- The suites listed above, each named in its own issue, are registered here in `app/integration_test/web/all_web_tests.dart`.
- `tools/scripts/__tests__/web_matrix_lint_test.mjs` — fails when `tools/device_lab/web-matrix.md` has an empty result cell, a stale date, or a known gap without a linked issue.
- Manual: one full Tier 2 pass recorded before the first beta.

#### Dependencies
[SN-WEB-002](compat.md#sn-web-002), [SN-QA-001](qa.md#sn-qa-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/platform/compatibility-matrix.md updated where a browser row changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

