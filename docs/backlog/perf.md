# Backlog — area: perf

50 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-PERF-001](perf.md#sn-perf-001) **Build the Sane Notes performance and lag-proofing discipline** (epic · M1 Ink Editor Alpha)
  - [SN-PERF-002](perf.md#sn-perf-002) **Build the latency measurement harness (on-device pen-to-pixel proxy)** · p0 · feature · L · M0 Foundations
  - [SN-PERF-003](perf.md#sn-perf-003) **Wire the CI perf gates (baselines, regression alerts, three cadences)** · p0 · infra · L · M1 Ink Editor Alpha
  - [SN-PERF-004](perf.md#sn-perf-004) **Define the device lab and Tier 1/2/3 reference-device configs** · p1 · infra · M · M0 Foundations
  - [SN-PERF-005](perf.md#sn-perf-005) **Build the synthetic input corpus and deterministic replay driver** · p1 · test · M · M0 Foundations
  - [SN-PERF-006](perf.md#sn-perf-006) **Define the high-speed camera pen-to-pixel rig and protocol** · p1 · task · S · M0 Foundations
  - [SN-PERF-007](perf.md#sn-perf-007) **Add the frame-rate and jank perf test (flutter drive --profile)** · p0 · test · M · M1 Ink Editor Alpha
  - [SN-PERF-008](perf.md#sn-perf-008) **Add the cold-start startup trace and budget test** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-PERF-009](perf.md#sn-perf-009) **Add the memory sampler and leak / steady-state budget tests** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-PERF-010](perf.md#sn-perf-010) **Add the 1,000-page notebook open benchmark** · p1 · test · M · M2 Library & Documents
  - [SN-PERF-011](perf.md#sn-perf-011) **Add the 600-page PDF scroll benchmark fixture and the 60 fps gate** · p1 · test · M · M2 Library & Documents
  - [SN-PERF-012](perf.md#sn-perf-012) **Add the 5,000-stroke dense-page stress benchmark** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-PERF-013](perf.md#sn-perf-013) **Build the battery and energy protocol for the 2-hour writing soak** · p1 · task · M · M5 Phones & Platform Parity
  - [SN-PERF-014](perf.md#sn-perf-014) **Measure and gate frame pacing at 120 Hz and adaptive refresh** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-PERF-015](perf.md#sn-perf-015) **Detect thermal throttling and drive the adaptive quality ladder** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-PERF-016](perf.md#sn-perf-016) **Enforce draw-path isolate discipline (no hop, no blocking I/O, no logging)** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-PERF-017](perf.md#sn-perf-017) **Warm up and reuse shaders, paints and paths on the draw path** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-PERF-018](perf.md#sn-perf-018) **Define the machine-readable performance budget registry (B1-B10 + web bundle)** · p1 · infra · S · M0 Foundations
  - [SN-PERF-019](perf.md#sn-perf-019) **Build the local performance trend dashboard as a CI artifact** · p2 · infra · M · M2 Library & Documents
  - [SN-PERF-020](perf.md#sn-perf-020) **Automate the jank triage runbook into a timeline analyser** · p2 · infra · L · M2 Library & Documents
  - [SN-PERF-021](perf.md#sn-perf-021) **Enforce the lag-proof checklist: repaint scope and zero per-sample allocations** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-PERF-022](perf.md#sn-perf-022) **Verify Impeller is active on every target build and record the renderer** · p2 · test · S · M1 Ink Editor Alpha
  - [SN-PERF-023](perf.md#sn-perf-023) **Implement the adaptive quality ladder for low-end and throttled devices** · p1 · feature · L · M5 Phones & Platform Parity
  - [SN-PERF-024](perf.md#sn-perf-024) **Run the beta performance soak across the full Tier 1 device lab** · p1 · test · L · M7 Beta Hardening & Security Audit
  - [SN-GIPAD-007](perf.md#sn-gipad-007) **Handle iPadOS memory pressure and jetsam termination without losing ink** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-GAND-016](perf.md#sn-gand-016) **Generate and ship Android baseline profiles for cold start and first frame** · p2 · infra · M · M5 Phones & Platform Parity
  - [SN-GWEB-012](perf.md#sn-gweb-012) **Add the web memory ceiling and long-session stability gate** · p2 · test · M · M2 Library & Documents
  - [SN-GPRF-002](perf.md#sn-gprf-002) **Validate 90 Hz and variable-refresh Android panels against the frame budget** · p2 · test · S · M5 Phones & Platform Parity
  - [SN-GPRF-006](compat.md#sn-gprf-006) **Publish the compatibility matrix as a machine-readable registry with a CI drift check** · p1 · infra · M · M0 Foundations
  - [SN-GPRF-007](compat.md#sn-gprf-007) **Enforce the minimum OS and browser bar at runtime with an update wall** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GPRF-009](perf.md#sn-gprf-009) **Add warm-start and resume-to-ink latency budgets and gates** · p2 · test · M · M5 Phones & Platform Parity
  - [SN-GPRF-010](perf.md#sn-gprf-010) **Respond to OS memory-pressure signals and prove no data loss on a low-memory kill** · p1 · feature · M · M5 Phones & Platform Parity
  - [SN-GPRF-011](perf.md#sn-gprf-011) **Split deferred components and move plugin initialisation off the startup path** · p1 · task · L · M2 Library & Documents
  - [SN-GPRF-012](perf.md#sn-gprf-012) **Define the performance run statistical protocol and device preconditions** · p1 · task · S · M0 Foundations
  - [SN-GPRF-013](perf.md#sn-gprf-013) **Provision the self-hosted physical device runner for the perf gates** · p1 · infra · L · M1 Ink Editor Alpha
  - [SN-GPRF-014](perf.md#sn-gprf-014) **Add the in-app performance HUD and local jank capture behind a debug flag** · p2 · task · M · M2 Library & Documents
  - [SN-GPRF-015](perf.md#sn-gprf-015) **Measure idle, screen-on and background energy drain beyond the writing soak** · p2 · test · M · M5 Phones & Platform Parity
  - [SN-GPRF-016](perf.md#sn-gprf-016) **Gate startup and document-open performance against slow storage and a cold cache** · p2 · test · M · M5 Phones & Platform Parity
  - [SN-GPRF-018](compat.md#sn-gprf-018) **Run the OS, browser and target-SDK upgrade readiness cycle on pre-release builds** · p2 · task · M · M7 Beta Hardening & Security Audit
  - [SN-GPRF-019](perf.md#sn-gprf-019) **Feed Low Power Mode and Battery Saver into the adaptive quality ladder** · p2 · feature · M · M5 Phones & Platform Parity
  - [SN-GPRF-020](perf.md#sn-gprf-020) **Automate performance-regression bisect on the physical device runner** · p3 · infra · M · M2 Library & Documents

---

## Issues

### SN-AND-027

<a id="sn-and-027"></a>

**Validate performance on the 4 GB Snapdragon 680-class low-end device**

| Field | Value |
|---|---|
| GitHub | #80 |
| Type | test |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | perf, compat, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-AND-005](ink.md#sn-and-005), [SN-AND-002](ink.md#sn-and-002), [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
The low-end reference is a 4 GB RAM, Snapdragon 680-class device on Android 10-13; it is a Tier-1 CI slot and gates memory, fps and cold-start floors (docs/platform/android.md §1, §11, compat matrix §2). The decision-7 budgets that apply here: memory < 300 MB, 60 fps floor while writing, cold start < 2 s, and the Impeller GL fallback path must be exercised (this device is the most likely to hit it, L5). A regression on this slot blocks the release (compat matrix §7).

#### Scope
**In:** wiring the low-end device into the CI perf gates via tools/perf_harness; asserting memory < 300 MB, 60 fps while writing, cold start < 2 s; validating the Impeller GL fallback rendering; exercising a large notebook and a long writing session on the device.
**Out:** the perf harness engine and reference-device latency budgets on high-end slots (SN-PERF-*, referenced); the ink surface implementation ([SN-AND-002](ink.md#sn-and-002)/[SN-AND-005](ink.md#sn-and-005), exercised here).

#### Acceptance criteria
- [ ] On the 4 GB Snapdragon-680-class slot, memory stays < 300 MB during a typical editing session (decision 7).
- [ ] Writing sustains a 60 fps floor with no frame > 16.7 ms on this device; the Tier chosen is the Impeller-GL-fallback Tier B where no usable front-buffer exists, and it still holds 60 fps.
- [ ] Cold start is < 2 s on this device (decision 7).
- [ ] Opening a large notebook and scrolling behave within budget (no OOM, no ANR) on 4 GB.
- [ ] These checks run as a Tier-1 CI gate; a regression blocks the release (compat matrix §7).

#### Technical notes
tools/device_lab config for the low-end slot; tools/perf_harness scenarios for memory/fps/cold-start; Impeller GL fallback validated (docs/platform/android.md §3, L5). Exercises the Tier A/B selection ([SN-AND-005](ink.md#sn-and-005)) and the ink surface ([SN-AND-002](ink.md#sn-and-002)). Wired into CI (SN-FND-003). docs/platform/performance-budgets.md.

#### Security & privacy
None beyond baseline: perf validation only; no content in logs/traces captured by the harness; no network egress. Any captured trace must be scrubbed of note content before it leaves the runner.

#### UX notes
The payoff is that a student on an inexpensive 4 GB phone gets the same lag-proof pen experience as someone on a flagship — the product thesis on Android's weakest hardware (docs/platform/android.md §0). No jank, no OOM, fast start.

#### Test plan
app/integration_test/lowend_perf_test.dart run on the low-end slot via tools/perf_harness (memory/fps/cold-start assertions); a golden confirming Impeller GL fallback rendering matches Vulkan across looks; a large-notebook open/scroll scenario asserting no OOM/ANR.

#### Dependencies
SN-AND-005 (tier selection), SN-AND-002 (ink surface), SN-FND-003 (CI). Uses the shared perf harness / device lab (SN-PERF-*).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-CORE-027

<a id="sn-core-027"></a>

**Benchmark 1,000-page notebook open and CRDT merge performance**

| Field | Value |
|---|---|
| GitHub | #201 |
| Type | test |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | core |
| Areas | perf, qa |
| Size | S |
| SDLC | verification |
| Parent | [SN-CORE-001](storage.md#sn-core-001) |
| Depends on | [SN-CORE-004](storage.md#sn-core-004), [SN-CORE-005](storage.md#sn-core-005), [SN-CORE-015](storage.md#sn-core-015) |
| Security controls | `MASVS-STORAGE-2`, `ASVS-V11` |
| Extra labels | agent-ready, good first issue |

#### Context
A hard perf budget (locked decision 7; roadmap M2 exit criterion) is **open a 1,000-page notebook in < 1 s**, which is only achievable because the Library doc holds structure only and page contents are lazy ([`docs/architecture/document-model.md`](docs/architecture/document-model.md) §1/§7). This benchmark proves the storage/model layer meets that budget and guards against regressions as the schema grows; it also measures merge cost for a large page so the CRDT stays within budget.

#### Scope
**In:** a reproducible benchmark harness that (a) generates a synthetic 1,000-page notebook (structure + representative per-page snapshots, including a canonical 5,000-stroke lecture page) and measures **Library-structure open time** (must be < 1 s) independent of page payloads; (b) measures single-page load (fold snapshot + tail) and (c) merge time for a page receiving a batch of remote ops; results emitted as machine-readable numbers for CI gating.
**Out:** the device-lab/pen-to-pixel latency harness (`tools/perf_harness`, SN-PERF-002 — this is model-layer only), rendering perf, and the CI perf-gate wiring (SN-PERF-003, referenced).

#### Acceptance criteria
- [ ] Opening the 1,000-page notebook's Library structure completes in < 1 s on the CI reference machine, measured over ≥ 20 runs (report p50/p95); the measurement does not load page contents.
- [ ] The mergeable page state for a 5,000-stroke page is ~1 MB (geometry offloaded to blobs) — asserted as an order-of-magnitude check (document-model §7).
- [ ] Single-page load and a remote-op-batch merge complete within documented budgets and are emitted as numbers a CI gate can read.
- [ ] The benchmark is deterministic/seeded and runnable locally with one command; results are written to a stable path for trend tracking.
- [ ] A regression (structure open > 1 s) fails the benchmark assertion.

#### Technical notes
`packages/sane_core/test/perf/notebook_open_bench_test.dart`, `merge_bench_test.dart`, `tools/` generator for the synthetic corpus. Depends on [SN-CORE-004](storage.md#sn-core-004) (drift open), [SN-CORE-005](storage.md#sn-core-005) (bundle/manifest), [SN-CORE-015](storage.md#sn-core-015) (snapshot load). Numbers feed the CI perf gate (SN-PERF-003, referenced). Keep the corpus generator seeded so results are comparable across runs. Implements the M2 open-time exit criterion at the model layer.

#### Security & privacy
None beyond baseline: synthetic data only (no real notes), no network, no content or ids logged in the clear (MASVS-STORAGE-2). ASVS V11 (the benchmark also guards against a pathological merge that could be a DoS vector on import).

#### UX notes
None beyond baseline. The budget this guards is the felt "open a huge notebook instantly, no spinner" experience ([ADR-0004](docs/adr/0004-local-first-zero-server.md)); no UI in this issue.

#### Test plan
The benchmark files above are the deliverable, run in a dedicated CI job (not the fast unit lane). Assertions gate the < 1 s open time and the ~1 MB page-state order of magnitude; results archived for trend analysis.

#### Dependencies
[SN-CORE-004](storage.md#sn-core-004), [SN-CORE-005](storage.md#sn-core-005), [SN-CORE-015](storage.md#sn-core-015).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze --fatal-infos, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-016

<a id="sn-gand-016"></a>

**Generate and ship Android baseline profiles for cold start and first frame**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | perf, ci-cd, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-008](perf.md#sn-perf-008), [SN-AND-022](ci-cd.md#sn-and-022), [SN-AND-027](perf.md#sn-and-027) |
| Security controls | `MASVS-CODE-4` |
| Extra labels | — |

#### Context
`docs/platform/phones.md` §8 sets **cold start < 2 s on mid Android**, and the low-end reference is a 4 GB Snapdragon 680-class device where ART's JIT warm-up dominates the first seconds of an app's life. [SN-PERF-008](perf.md#sn-perf-008) adds the cold-start trace and budget test — it measures the number but nothing in the backlog *moves* it on Android. The standard Android lever is a **baseline profile** (an AOT/JIT hint profile shipped in the AAB and installed by Play), which typically cuts cold start and first-frame jank on exactly this class of device, and it applies to the Kotlin/embedding/plugin layer that surrounds our AOT Dart code — the ink surface plugin, PDF, Keystore, WorkManager and the Flutter embedding itself. Whether the current Flutter/AGP toolchain generates a useful profile for a Flutter app is **(verify)**: this issue must prove the win with numbers before it becomes permanent build weight.

#### Scope
**In:** adding the baseline-profile Gradle plugin and a `:baselineprofile` module that drives a scripted critical-user-journey (cold launch → library → open a notebook → first stroke) on a managed device; generating `baseline-prof.txt` (plus a startup profile if supported) into the release AAB; a CI job that regenerates the profile on demand and fails if the committed profile is stale relative to the app version; before/after measurements on the Tier 1 low-end reference and the mid tablet feeding the [SN-PERF-008](perf.md#sn-perf-008) budget; a documented decision to keep or drop the profile based on the measured delta.
**Out:** the cold-start measurement harness itself ([SN-PERF-008](perf.md#sn-perf-008), [SN-PERF-002](perf.md#sn-perf-002)); R8/ProGuard rules ([SN-AND-028](security.md#sn-and-028)); AAB size budgeting ([SN-GAND-007](release.md#sn-gand-007)); iOS startup work.

#### Acceptance criteria
- [ ] A baseline profile is generated from a scripted journey and included in the release AAB; `bundletool`/Play validation shows it present.
- [ ] Measured cold start and first-frame time on the 4 GB Snapdragon 680-class reference improve versus the same build without the profile, with both numbers recorded in `docs/platform/performance-budgets.md`; if the improvement is < 5% the profile is dropped and the decision recorded (no cargo cult).
- [ ] The profile-generation job runs on a Gradle managed device in CI and is reproducible; a stale profile (generated for an older version) is detected and flagged.
- [ ] Adding the profile does not regress the AAB size budget ([SN-GAND-007](release.md#sn-gand-007)) or the 16 KB alignment check ([SN-AND-021](compat.md#sn-and-021)).
- [ ] The journey script exercises the real ink path (at least one committed stroke), not just the launcher activity.
- [ ] Results are added to the perf trend dashboard ([SN-PERF-019](perf.md#sn-perf-019)).

#### Technical notes
`androidx.baselineprofile` Gradle plugin + `BaselineProfileRule`/macrobenchmark module under `app/android`; Gradle managed devices for reproducibility (an emulator is acceptable for *generation*; the *measurement* must run on the physical Tier 1 device per `docs/platform/android.md` §11, since emulators cannot represent real device timing). Keep the generated profile committed and reviewable so a diff is visible. Coordinate with [SN-AND-028](security.md#sn-and-028): obfuscation changes symbol names, so the profile must be generated from the same minified configuration as the release build.

#### Security & privacy
The generated profile is a build artefact derived from our own code; it must be produced by a trusted CI job from a pinned toolchain ([SN-CI-015](ci-cd.md#sn-ci-015)) and reviewed as a diff so an untrusted profile cannot be slipped into the bundle (MASVS-CODE-4, supply chain). The journey script must use synthetic fixtures ([SN-QA-011](qa.md#sn-qa-011)) — never a real account, never real notes.

#### UX notes
No UI. The user-visible effect is the app opening faster on cheap devices, which is a stated product promise ("lag-proof", `docs/product/vision-and-principles.md`) and worth a line in release notes only if the measured win is real.

#### Test plan
CI: profile generation job + staleness check; existing cold-start budget test ([SN-PERF-008](perf.md#sn-perf-008)) runs on both variants during the evaluation. Manual: three cold starts per variant on the low-end reference with the device thermally settled, medians reported. Files: `app/android/baselineprofile/`, `app/android/app/src/main/baseline-prof.txt`, budget rows in `docs/platform/performance-budgets.md`.

#### Dependencies
[SN-PERF-008](perf.md#sn-perf-008), [SN-AND-022](ci-cd.md#sn-and-022), [SN-AND-027](perf.md#sn-and-027)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-017

<a id="sn-gand-017"></a>

**Guard 32-bit address-space limits and fuzz the parsers on armeabi-v7a**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | perf, compat, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-GPRF-003](compat.md#sn-gprf-003), [SN-AND-022](ci-cd.md#sn-and-022), [SN-PERF-023](perf.md#sn-perf-023) |
| Security controls | `MASVS-CODE-4`, `CWE-400`, `CWE-190` |
| Extra labels | — |

#### Context
`docs/platform/compatibility-matrix.md` §3 ships `armeabi-v7a` as **Tier 3 best-effort**: "MUST launch and take a note; no perf guarantee". A parallel issue ([SN-GPRF-003](compat.md#sn-gprf-003)) runs the Tier 3 smoke checklist on a 32-bit artifact and observes a memory ceiling; it explicitly defers "any optimisation work the run uncovers" to a separate issue. **This is that issue**, and the work is not optimisation in general but the two failure classes unique to a 32-bit process. First, address space: a 32-bit process has a small user virtual-address space, so a 600-page PDF ([SN-PDF-026](pdf.md#sn-pdf-026)), a 1,000-page notebook ([SN-PERF-010](perf.md#sn-perf-010)), tile caches ([SN-INK-022](ink.md#sn-ink-022), [SN-PDF-004](pdf.md#sn-pdf-004)) and a loaded ML model can exhaust VA long before the device runs out of RAM — producing an `mmap`/native OOM abort rather than slow behaviour, which reads to the user as "this app crashes on my tablet". Second, integer sizing: length/offset arithmetic in pdfium, the ink codec and the bundle reader behaves differently where `size_t` is 32 bits, so overflow bugs that arm64 hides become reachable memory-safety issues.

#### Scope
**In:** deriving cache and prefetch ceilings (ink tile cache, PDF tile cache, blob cache, concurrently loaded ML models) from a runtime address-space/memory-class signal rather than a hard-coded per-ABI constant, and documenting the resulting values; a graceful, user-readable "this document is too large for this device" state instead of a native abort when a document cannot be held; making the adaptive quality ladder ([SN-PERF-023](perf.md#sn-perf-023)) engage on 32-bit without a separate code path; running the existing malformed-PDF ([SN-PDF-024](pdf.md#sn-pdf-024)) and bundle ([SN-SEC-007](security.md#sn-sec-007)) fuzz corpora once per release train against a 32-bit build and promoting every crash to a regression test.
**Out:** the Tier 3 smoke run and the compatibility-matrix verdict ([SN-GPRF-003](compat.md#sn-gprf-003)); the ABI/build configuration ([SN-AND-022](ci-cd.md#sn-and-022)); render-path goldens ([SN-AND-032](qa.md#sn-and-032)); 16 KB alignment, which is an arm64 concern ([SN-AND-021](compat.md#sn-and-021)); arm64 low-end perf ([SN-AND-027](perf.md#sn-and-027)).

#### Acceptance criteria
- [ ] Cache ceilings are computed from a runtime memory/address-space signal (not from `Build.SUPPORTED_ABIS`) and the chosen values are recorded in `docs/platform/performance-budgets.md`.
- [ ] Opening the 600-page PDF fixture and the 1,000-page notebook fixture on a 32-bit build either succeeds within the reduced ceilings or degrades with an explicit, user-readable limit message — never a native OOM abort.
- [ ] The adaptive quality ladder ([SN-PERF-023](perf.md#sn-perf-023)) engages on the 32-bit target with no ABI-specific branch in feature code.
- [ ] The malformed-PDF and bundle fuzz corpora run against a 32-bit build at least once per release train; any crash becomes a named regression test ([SN-QA-013](qa.md#sn-qa-013)).
- [ ] A source audit of the native glue we own ([SN-AND-002](ink.md#sn-and-002), [SN-PDF-028](pdf.md#sn-pdf-028)) records that size/offset arithmetic is width-safe and that the hardening flags in `docs/security/secure-coding-checklist.md` §2 are enabled for the 32-bit variant.
- [ ] Results feed the Tier 3 verdict in [SN-GPRF-003](compat.md#sn-gprf-003) rather than duplicating it.

#### Technical notes
Runtime signals: `ActivityManager.getMemoryClass()`/`getLargeMemoryClass()`, `isLowRamDevice`, `Runtime.maxMemory()`, and where useful the mapped-region headroom — surfaced once through the existing device-capability provider and consumed by `sane_render`/`sane_pdf` cache configuration. Use an `armeabi-v7a` emulator image for the fuzz pass in CI; the physical-device pass rides along with [SN-GPRF-003](compat.md#sn-gprf-003). Keep the fuzz job out of the blocking path but report failures in the release checklist ([SN-QA-016](qa.md#sn-qa-016)).

#### Security & privacy
32-bit overflow of length/offset arithmetic in parsers is a memory-safety risk class (CWE-190, CWE-400) that the arm64-only fuzz job cannot reach; running the corpora on 32-bit closes it. Any native crash is triaged as a potential security finding, not just a stability bug ([SN-QA-013](qa.md#sn-qa-013), [SN-SEC-010](security.md#sn-sec-010)). Cache-ceiling logic must not weaken encryption or spill plaintext to disk when it evicts ([SN-SRCH-015](search.md#sn-srch-015) pattern).

#### UX notes
When a document exceeds what the device can hold, use the honest-limits pattern from `docs/design/` microcopy ([SN-BRD-009](brand.md#sn-brd-009)): what happened, what the user can do (open it on another device, split the PDF), no jargon, no stack trace. Nothing else is user-visible.

#### Test plan
Unit tests for the ceiling calculator across memory-class fixtures. `integration_test` on a 32-bit emulator opening the oversized PDF/notebook fixtures and asserting the explicit limit state rather than a crash. A CI fuzz job (`android-armeabi-fuzz`) running the existing corpora against the 32-bit build. Files: `packages/sane_render/lib/src/cache_budget.dart`, `test/perf/cache_budget_32bit_test.dart`, CI job in `.github/workflows/`.

#### Dependencies
[SN-GPRF-003](compat.md#sn-gprf-003), [SN-AND-022](ci-cd.md#sn-and-022), [SN-PERF-023](perf.md#sn-perf-023)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-007

<a id="sn-gipad-007"></a>

**Handle iPadOS memory pressure and jetsam termination without losing ink**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone |
| Areas | perf, compat, storage |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-INK-022](ink.md#sn-ink-022), [SN-PERF-009](perf.md#sn-perf-009), [SN-CORE-026](storage.md#sn-core-026) |
| Security controls | `MASVS-STORAGE-2`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
iPadOS does not page to disk: an app that exceeds its footprint is killed by **jetsam**, with no exception and no warning beyond a memory-warning notification. Sane Notes is exactly the shape of app that hits this — 1,000-page notebooks, tiled raster caches ([SN-INK-022](ink.md#sn-ink-022)), 600-page PDFs ([SN-PDF-004](pdf.md#sn-pdf-004)), thumbnails, a search index and audio buffers, often in Split View next to another memory-hungry app where the per-app budget is smaller. The backlog **measures** memory ([SN-PERF-009](perf.md#sn-perf-009)) and defines an adaptive quality ladder ([SN-PERF-023](perf.md#sn-perf-023)), but nothing subscribes to memory pressure, sheds caches, or guarantees that an unexpected kill costs the user zero strokes. This issue makes termination survivable and, where possible, avoidable.

#### Scope
**In:** a memory-pressure service that observes `UIApplication.didReceiveMemoryWarningNotification` and `DispatchSource.makeMemoryPressureSource` (warn/critical) and drives a documented shed order — predicted/wet buffers last, PDF tile cache first, then thumbnails, then off-screen page rasters, then the decoded-image cache; footprint sampling via `os_proc_available_memory()`/`task_vm_info` to pre-emptively shed before the warning arrives; a hard cap that switches to the low-memory tier of [SN-PERF-023](perf.md#sn-perf-023); scene-aware budgets (two open windows share one budget); a crash-safe commit point so an in-progress stroke and the current op-log segment are durable within 500 ms of pen-up ([SN-CORE-026](storage.md#sn-core-026)); a "restored after a low-memory close" recovery path.
**Out:** the measurement harness ([SN-PERF-009](perf.md#sn-perf-009)); Android low-memory behaviour ([SN-AND-027](perf.md#sn-and-027)); the quality ladder itself ([SN-PERF-023](perf.md#sn-perf-023)); the Extended Memory entitlement (record the decision in the notes, do not adopt it).

#### Acceptance criteria
- [ ] Under a synthetic memory-pressure storm on a Tier 1 iPad with a 1,000-page notebook open, the app sheds caches in the documented order and stays inside the docs/platform/performance-budgets.md steady-state budget without dropping below 60 fps on the draw path.
- [ ] Simulated jetsam (force-kill during drawing) loses at most the stroke in flight at kill time; on relaunch the notebook reopens at the same page with all committed strokes present (10 repetitions, zero corruption per [SN-CORE-026](storage.md#sn-core-026) fixtures).
- [ ] Two open windows of the same notebook do not double the raster cache: shared caches are accounted once, verified by a memory sampler assertion.
- [ ] In Split View at 1/3 width with another app active, the app sheds proactively and does not get killed during a 10-minute writing soak.
- [ ] A shed never discards unsaved model state — only regenerable caches; a unit test enumerates cache registries and fails if a new cache is not classified.
- [ ] Recovery shows a neutral "picked up where you left off" state; no data-loss dialog, no lost bookmark.

#### Technical notes
Put the service in `packages/sane_render`/`packages/sane_core` with a platform hook in the iOS runner; every cache registers with a priority and a `shed(level)` callback (the same registry the Android and web tiers can reuse). Avoid shedding during an active stroke — defer to the next idle frame. Keep the sampler off the draw path ([SN-PERF-016](perf.md#sn-perf-016)). Record findings and the Extended Memory decision in docs/platform/performance-budgets.md.

#### Security & privacy
Availability/robustness control (CWE-400): resource exhaustion on a huge or hostile document must degrade, not crash, and must never leave a torn database (MASVS-STORAGE-2). Shed caches must be wiped, not merely dereferenced, when they hold decrypted content from a locked-capable notebook. No new data collection; diagnostics record counts and bytes only.

#### UX notes
Invisible when it works: quality drops before the app dies. If the ladder engages, the existing quality indicator from [SN-PERF-023](perf.md#sn-perf-023) applies — never a modal. After a low-memory relaunch, restore scroll position, tool and selection per [SN-IPAD-028](editor.md#sn-ipad-028).

#### Test plan
Unit: `packages/sane_render/test/cache_registry_shed_test.dart` (ordering, classification completeness). Integration: `integration_test/memory_pressure_test.dart` driving the pressure source and a force-kill loop with the 1,000-page fixture. Manual: Instruments Allocations + VM Tracker run on Tier 1 and a Tier 3 iPad, attached to the [SN-PERF-009](perf.md#sn-perf-009) report.

#### Dependencies
[SN-INK-022](ink.md#sn-ink-022), [SN-PERF-009](perf.md#sn-perf-009), [SN-CORE-026](storage.md#sn-core-026).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GIPAD-008

<a id="sn-gipad-008"></a>

**Hold the iOS app download size to budget with thinning and on-demand packs**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p2 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | ipad, ios-phone |
| Areas | perf, release, compat |
| Size | M |
| SDLC | release |
| Parent | [SN-REL-001](release.md#sn-rel-001) |
| Depends on | [SN-DS-009](design-system.md#sn-ds-009), [SN-BRS-007](brushes.md#sn-brs-007), [SN-TPL-011](templates.md#sn-tpl-011) |
| Security controls | `MASVS-CODE-4`, `OWASP-A08` |
| Extra labels | agent-ready |

#### Context
Sane Notes bundles twelve look font families ([SN-DS-009](design-system.md#sn-ds-009)), brush shape/grain textures ([SN-BRS-007](brushes.md#sn-brs-007)), paper and cover art ([SN-TPL-003](templates.md#sn-tpl-003), [SN-TPL-009](templates.md#sn-tpl-009)), mascot art ([SN-BRD-002](brand.md#sn-brd-002)), stickers ([SN-MED-011](images-media.md#sn-med-011)) and a Flutter engine — a combination that trivially pushes an `.ipa` past the size where iPadOS warns about a cellular download and where students on constrained storage abandon the install. The web surface has a bundle-size gate ([SN-WEB-003](perf.md#sn-web-003)); **iOS has none**, and no issue plans asset thinning or on-demand delivery. Install size is also a store-listing conversion number we will be judged on, and it only ever grows once shipped.

#### Scope
**In:** a measured budget for thinned download size and installed size on a reference iPad, recorded in docs/platform/performance-budgets.md; a CI job that builds the release archive, reads the App Store Connect/`Bitcode`-free thinned report (or `xcodebuild` + `.ipa` analysis) and fails the build on regression beyond a tolerance; asset-catalog migration for images so per-device variants are thinned; converting large optional assets (extra look fonts, premium templates, sticker packs, brush grains beyond the stock set) into downloadable packs fetched on first use with integrity verification and cache eviction; a size breakdown artefact per build.
**Out:** the web bundle gate ([SN-WEB-003](perf.md#sn-web-003)); Android App Bundle splits ([SN-AND-022](ci-cd.md#sn-and-022)); the template store catalogue ([SN-TPL-011](templates.md#sn-tpl-011)) — this issue only provides the delivery mechanism it will use.

#### Acceptance criteria
- [ ] CI publishes a per-build size breakdown (engine, Dart AOT, fonts, textures, art, other) and fails when thinned download size exceeds the budget or grows more than the agreed delta versus the last release.
- [ ] The app installs and runs fully offline with only the *stock* asset set: the default pen set, the default look, blank/lined/grid paper and the mascot — no feature is dead on a fresh install with no network.
- [ ] Downloadable packs verify a publisher signature/digest before use; a tampered or truncated pack is rejected, logged without content, and the feature falls back to stock ([SN-AI-008](ai.md#sn-ai-008) pattern reused, not re-invented).
- [ ] Packs are evictable from Settings → Storage ([SN-SET-014](settings.md#sn-set-014)) and re-downloadable; eviction never deletes user content.
- [ ] Bundled fonts still satisfy the offline requirement of [SN-DS-009](design-system.md#sn-ds-009) for the default look set and every script fallback required by [SN-I18N-008](i18n.md#sn-i18n-008).
- [ ] The store listing's size claim and the help-centre storage page are generated from the measured number, not hand-written.

#### Technical notes
Prefer plain hosted packs over On-Demand Resources if ODR complicates the CI/TestFlight path — record the choice in an ADR. Keep pack manifests content-addressed so the blob store ([SN-CORE-014](storage.md#sn-core-014)) can hold them. Measure with `xcrun altool`/App Store Connect thinned report for the true number; the raw `.ipa` size is not the user-visible figure. Wire the gate into the release train ([SN-REL-004](release.md#sn-rel-004)).

#### Security & privacy
Post-install code or asset delivery is a supply-chain surface: packs must be data only (no executable code, no dylibs — App Review requires it anyway), fetched over pinned TLS ([SN-SEC-022](security.md#sn-sec-022)), digest-verified before unpack, and unpacked through the hardened archive reader ([SN-SEC-007](security.md#sn-sec-007)) with path-traversal and zip-bomb limits (OWASP-A08, MASVS-CODE-4). Pack fetches must not carry account identifiers.

#### UX notes
A first use of a premium template or extra look shows an inline "Downloading (2.4 MB)" row with cancel, not a blocking modal; failure offers retry and keeps the stock alternative selected. Storage settings list packs with sizes and a Remove action.

#### Test plan
Unit: `tools/size_gate/test/report_parse_test.dart` (breakdown parsing, threshold logic); `packages/sane_assets/test/pack_verify_test.dart` (signature, truncation, traversal). Integration: `integration_test/asset_pack_test.dart` (first-use download, offline fallback, eviction). CI: the gate itself, exercised by a deliberate oversize fixture in a dry-run job.

#### Dependencies
[SN-DS-009](design-system.md#sn-ds-009), [SN-BRS-007](brushes.md#sn-brs-007), [SN-TPL-011](templates.md#sn-tpl-011), [SN-REL-004](release.md#sn-rel-004).

#### Definition of done
- [ ] Code + tests merged, CI green (format, analyze, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks, OSV-Scanner, CodeQL over Swift)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/ipad.md kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPRF-001

<a id="sn-gprf-001"></a>

**Validate the mid-range Android stylus tablet against the 25 ms pen-to-pixel budget**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet |
| Areas | perf, compat, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-006](perf.md#sn-perf-006), [SN-AND-002](ink.md#sn-and-002) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Budget B2 — pen-down to pixel in 25 ms or less on a mid-range Android tablet — is half of the product's core promise, and its named Tier-1 gate device is the `Android-tablet-stylus` slot: a mid-range tablet (Snapdragon 7-class) with an S Pen or a USI 2.0 pen (docs/platform/performance-budgets.md B2 and section 4; docs/platform/compatibility-matrix.md section 2). Two sibling validation runs already exist — [SN-IPAD-025](perf.md#sn-ipad-025) validates the iPad slots against B1, and [SN-AND-027](perf.md#sn-and-027) validates the 4 GB Snapdragon-680 low-end floor against B4/B6/B9 — but no issue owns the mid-range stylus slot that B2 is actually gated on. Without it the 25 ms number is measured by the harness and never signed off on real pen hardware, and a front-buffer regression on the device class most Android students own would ship.

#### Scope
**In:** wiring the `Android-tablet-stylus` device-lab slot into the perf gate; the camera-rig ground-truth run ([SN-PERF-006](perf.md#sn-perf-006)) and the per-commit proxy run ([SN-PERF-002](perf.md#sn-perf-002)) on this slot; recording Tier A (Jetpack Ink front-buffer) and Tier B numbers separately; exercising both an S Pen device and a USI 2.0 device from the pool; the release-blocking pass/fail record under `tools/device_lab/results`.
**Out:** the harness and gate mechanics ([SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-003](perf.md#sn-perf-003)), the ink surface implementation ([SN-AND-002](ink.md#sn-and-002), [SN-AND-005](ink.md#sn-and-005)), the low-end slot ([SN-AND-027](perf.md#sn-and-027)) and the iPad slots ([SN-IPAD-025](perf.md#sn-ipad-025)).

#### Acceptance criteria
- [ ] Camera-rig ground truth on the mid-range stylus tablet reports p95 pen-to-pixel <= 25 ms on Tier A, recorded with date, OS build, pen model and tier.
- [ ] The per-commit proxy runs on this slot and its estimate is calibrated against the camera number with the documented display-latency constant.
- [ ] Tier A and Tier B are both measured so the ADR-0001 gap on Android stays visible; a Tier-B-only fallback on this device class is reported as a finding, not a silent pass.
- [ ] 60 fps floor with zero frames over 16.7 ms holds during the scripted writing workload on this slot; 90/120 fps is asserted where the panel allows.
- [ ] A regression on this slot fails the required perf check and blocks the release, exactly as the iPad and low-end slots do.
- [ ] An S Pen device and a USI 2.0 device are both exercised and their numbers are reported separately.

#### Technical notes
`tools/device_lab/android-tablet-stylus.json` from [SN-PERF-004](perf.md#sn-perf-004) supplies display Hz, arch, stylus and min OS. Drive the workload with the synthetic corpus and replay driver ([SN-PERF-005](perf.md#sn-perf-005)); the ADB stylus simulation hook is for functional automation only and MUST NOT be the latency number. Ink capture comes through `MotionEvent` historical samples with `requestUnbufferedDispatch` and prediction ([SN-AND-004](ink.md#sn-and-004)); the Tier A surface is Jetpack Ink / `GLFrontBufferedRenderer` ([SN-AND-002](ink.md#sn-and-002), [SN-AND-003](ink.md#sn-and-003)). Confirm the renderer per run ([SN-PERF-022](perf.md#sn-perf-022)) so an unexpected Skia GL fallback is not mistaken for a hardware ceiling.

#### Security & privacy
None beyond baseline. Perf traces and camera footage must contain no note content: the workload uses synthetic strokes only, and any captured trace is scrubbed before it leaves the runner (CLAUDE.md logging rule; MASVS-PRIVACY-1). Results published to the repo carry device metadata, never user data.

#### UX notes
No user-facing surface. The payoff is the one the product is sold on: a student writing on a mid-range Android tablet feels the pen keep up with the nib. If the slot cannot hold 25 ms on Tier A, that is the ADR-0008 native-pivot review trigger for Android, and the finding must say so explicitly rather than quietly relaxing the number.

#### Test plan
Manual, lab-run: the camera protocol from [SN-PERF-006](perf.md#sn-perf-006) (>= 20 strokes at varied speeds, median + p95) per pen. Automated: the perf job runs `tools/perf_harness` on the slot per commit and nightly. Add `tools/device_lab/results/android-tablet-stylus-<os>.md` as the signed-off record, and a fixture-driven test proving the gate fails when the slot's numbers regress beyond tolerance.

#### Dependencies
[SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-006](perf.md#sn-perf-006), [SN-AND-002](ink.md#sn-and-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-002

<a id="sn-gprf-002"></a>

**Validate 90 Hz and variable-refresh Android panels against the frame budget**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | perf, compat, qa |
| Size | S |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-014](perf.md#sn-perf-014), [SN-PERF-004](perf.md#sn-perf-004) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
The refresh-rate row of the compatibility matrix has three entries — 120 Hz (Tier 1), **90 Hz (Tier 2)**, and 60 Hz (Tier 1) — and the 90 Hz row carries its own expectation: 90 fps with no frame over the frame budget while writing (docs/platform/compatibility-matrix.md section 5; docs/architecture/rendering-and-performance.md section 9.3, mid GPU tier). Nothing in the issue set mentions 90 Hz today: [SN-PERF-014](perf.md#sn-perf-014) gates 120 Hz and the idle-refresh behaviour, and the rest of the perf suite assumes the 16.7 ms 60 Hz ceiling. That leaves the most common mid-range Android panel untested, and 90 Hz is the case most likely to expose a frame-pacing bug, because a pipeline tuned for 8.3 ms or 16.7 ms buckets can systematically miss an 11.1 ms deadline and still look "under 16.7 ms" in the report.

#### Scope
**In:** a 90 Hz device entry in the Tier 2 manual pool config; a harness run that reads the panel's actual mode and asserts against an 11.1 ms frame budget rather than a hardcoded 16.7 ms; a variable-refresh case (LTPO / adaptive panels that switch 60 <-> 90 <-> 120 mid-session) asserting no dropped frame at the mode switch and no stale frame-budget assumption after it; a Battery-Saver-capped-to-60 Hz case; reporting the measured mode alongside every fps result.
**Out:** the 120 Hz gate and idle-refresh assertions ([SN-PERF-014](perf.md#sn-perf-014)), the draw-path frame-rate-range request ([SN-INK-023](ink.md#sn-ink-023)), and the power-save policy itself ([SN-GPRF-019](perf.md#sn-gprf-019)).

#### Acceptance criteria
- [ ] The harness derives the frame budget from the display mode reported at runtime (8.3 / 11.1 / 16.7 ms) instead of a constant, and the value used is printed in the result JSON.
- [ ] On a 90 Hz device the scripted writing workload sustains >= 90 fps with p99 frame time <= 11.1 ms, and zero frames exceed the 16.7 ms absolute ceiling.
- [ ] A mid-session refresh-mode change (adaptive panel, Battery Saver, or a forced mode switch) produces no dropped frame beyond the documented single-frame allowance and the harness re-reads the new budget within one second.
- [ ] A 90 Hz result is recorded as Tier 2 — measured and reported, a documented gap rather than a release blocker — per the tier definitions.
- [ ] The result file names the panel, the modes observed, and the time spent in each.

#### Technical notes
Read the mode via `Display.getMode()` / `Display.Mode.getRefreshRate()` (and `getSupportedModes()` for the adaptive set) through the platform channel that already backs [SN-PERF-014](perf.md#sn-perf-014); on Flutter the frame stream stays `SchedulerBinding`/`FrameTiming`. Do not infer the rate from measured frame deltas alone — an idle app at 90 Hz and a struggling app at 90 Hz produce similar deltas. Feed the derived budget into the jank counter used by [SN-PERF-007](perf.md#sn-perf-007) so one code path owns "what counts as a janky frame".

#### Security & privacy
None beyond baseline: display metadata only, no content, no egress. Device-mode strings recorded in results are hardware facts, not identifiers tied to a user (ADR-0011 zero-server posture).

#### UX notes
No user-facing surface. The user-visible effect is that a mid-range 90 Hz tablet feels as smooth as the spec sheet promises instead of pacing to 60 and wasting a third of its frames.

#### Test plan
Unit: a frame-budget resolver test mapping reported refresh rates to budgets, including unknown/zero rates (falls back to 16.7 ms and flags the run). Integration: the writing workload on a 90 Hz Tier 2 device plus a forced-mode-switch scenario. Manual: one lab pass on an adaptive-refresh panel with Battery Saver toggled mid-stroke, recorded under `tools/device_lab/results`.

#### Dependencies
[SN-PERF-014](perf.md#sn-perf-014), [SN-PERF-004](perf.md#sn-perf-004)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-009

<a id="sn-gprf-009"></a>

**Add warm-start and resume-to-ink latency budgets and gates**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | perf, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-008](perf.md#sn-perf-008), [SN-PERF-018](perf.md#sn-perf-018) |
| Security controls | `MASVS-AUTH-2` |
| Extra labels | agent-ready, sec: masvs |

#### Context
Budget B6 measures cold start — process launch to first interactive frame (docs/platform/performance-budgets.md B6). But a student does not cold-start the app twenty times a lecture; they lock the tablet, unlock it, and expect to write. The path that dominates real use is warm start and resume: returning from background, reconnecting a scene after iPadOS window reconnection, coming back from an Android process death, restoring a web tab from bfcache, or relaunching an installed PWA. None of those have a budget or a test today, which means the most frequent "is it laggy?" moment in the product is ungoverned. Cold start is explicitly measured ([SN-PERF-008](perf.md#sn-perf-008)); this issue adds its everyday sibling.

#### Scope
**In:** proposing and ratifying three additional budget entries in the registry ([SN-PERF-018](perf.md#sn-perf-018)) — warm start to interactive, resume-to-ink from background with the process alive, and restore-after-process-death (which MAY use the cold budget); trace markers and harness scenarios for each per surface; the gate wiring at the same cadence as B6; a first-stroke-after-resume assertion so the wet-ink path is proven live, not just the UI.
**Out:** the cold-start measurement ([SN-PERF-008](perf.md#sn-perf-008)), state-restoration correctness on iPad ([SN-IPAD-028](editor.md#sn-ipad-028)) and Android ([SN-PHN-017](compat.md#sn-phn-017)), which this measures but does not implement, and the deferred-init work ([SN-GPRF-011](perf.md#sn-gprf-011)).

#### Acceptance criteria
- [ ] Three budgets exist in the registry with targets, statistics (median plus p95), gate devices and cadence; the proposed defaults are warm start <= 600 ms, resume-to-ink <= 300 ms, restore-after-kill within the cold-start budget, and any change to them is an explicit registry edit.
- [ ] Resume is measured to *first ink accepted*, not first frame: the scenario resumes the app and immediately replays a stroke, and the timestamp captured is the first presented wet-ink frame.
- [ ] Each surface has a working scenario: iOS/iPadOS scene reconnect, Android `onStart` with the process alive and again after `am kill`, web tab restore including bfcache, and installed-PWA relaunch.
- [ ] A regression fails the perf check on the Tier 1 slots at the same cadence as B6.
- [ ] Results separate the three cases; a restore-after-kill run is never reported as a warm start.

#### Technical notes
Reuse the first-usable-frame marker from [SN-PERF-008](perf.md#sn-perf-008) and add a resume marker on the lifecycle transition (`AppLifecycleState.resumed` in Flutter, with the native side stamping the OS-level callback so the Dart hop is inside the measurement, not before it). Android process death is driven with `adb shell am kill`; web bfcache with a scripted navigation plus `pageshow.persisted`. Beware the trap that makes warm start look free: the app may render a stale frame instantly and only accept input hundreds of milliseconds later, which is why the acceptance criterion is first ink, not first pixel.

#### Security & privacy
Resume crosses a security boundary: a locked note or a biometric-gated notebook must re-authenticate on resume, and the harness must not disable that to make the number look good. The scenario therefore runs in both states and asserts that a gated notebook shows its lock on resume ([SN-AUTH-001](auth.md#sn-auth-001) area; MASVS-AUTH-2). No content appears in traces.

#### UX notes
The felt experience is picking up the tablet mid-lecture and writing immediately. If a surface cannot hit resume-to-ink, the fallback is to make the editor accept and buffer strokes while the rest of the app finishes waking, never to show a spinner over the page.

#### Test plan
Integration per surface in `tools/perf_harness/scenarios/resume_*`, run on the Tier 1 slots. Unit: the marker resolver mapping lifecycle transitions to the right scenario type. Manual: a lab pass on iPad and a low-end Android confirming the numbers with a stopwatch-class sanity check, recorded under `tools/device_lab/results`.

#### Dependencies
[SN-PERF-008](perf.md#sn-perf-008), [SN-PERF-018](perf.md#sn-perf-018)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-010

<a id="sn-gprf-010"></a>

**Respond to OS memory-pressure signals and prove no data loss on a low-memory kill**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone, android-tablet, android-phone, web |
| Areas | perf, storage, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-009](perf.md#sn-perf-009), [SN-INK-022](ink.md#sn-ink-022) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-STORAGE-2` |
| Extra labels | agent-ready, sec: masvs |

#### Context
The memory budget treats an OOM or a low-memory kill as an automatic fail ([SN-PERF-009](perf.md#sn-perf-009); docs/platform/performance-budgets.md B9), but a gate that fails a benchmark does nothing for the student whose 4 GB tablet kills the app mid-lecture because a browser and a video call are also open. Two behaviours are missing. First, the app never listens to the OS asking for memory back — Android's `onTrimMemory`/`ComponentCallbacks2` and iOS's memory-warning notification are the platform's explicit early warning, and the tile and PDF caches are exactly the evictable things they are asking about (docs/architecture/rendering-and-performance.md section 3). Second, nothing proves the invariant that matters most: a kill must lose no ink.

#### Scope
**In:** a memory-pressure facade with platform bindings (Android `ComponentCallbacks2.onTrimMemory` levels, iOS `didReceiveMemoryWarning`, web `navigator.storage` pressure plus visibility as a weak proxy); a documented response ladder mapping pressure levels to eviction of the ink tile LRU, PDF page bitmaps, thumbnails and decoded images; a durability guarantee that the in-flight stroke and the pending journal are flushed at the first pressure signal; kill-and-restore tests on both mobile platforms; recording pressure events into the perf result so a benchmark run that survived by evicting is not mistaken for one that never needed to.
**Out:** the cache implementations themselves ([SN-INK-022](ink.md#sn-ink-022), [SN-PDF-003](pdf.md#sn-pdf-003)), the memory sampler and gates ([SN-PERF-009](perf.md#sn-perf-009)), the quality ladder ([SN-PERF-023](perf.md#sn-perf-023), which this feeds rather than replaces), and editor scene restoration ([SN-IPAD-028](editor.md#sn-ipad-028), [SN-PHN-017](compat.md#sn-phn-017)).

#### Acceptance criteria
- [ ] A pressure signal at each platform level triggers the documented eviction step and the freed bytes are recorded; a test drives `adb shell am send-trim-memory` at `RUNNING_MODERATE`, `RUNNING_LOW` and `RUNNING_CRITICAL` and asserts the step taken.
- [ ] After any pressure signal the app remains correct: evicted tiles re-raster from vector strokes and evicted PDF bitmaps re-render, with no visual difference proven by a golden before and after.
- [ ] Killing the app (`adb shell am kill`, iOS jetsam simulation) at any point during a stroke loses no committed ink and at most the in-flight stroke, and reopening restores the page and scroll position.
- [ ] Eviction never touches unsaved data: the pending write journal is flushed before caches are dropped, asserted by a test that kills immediately after the signal.
- [ ] Pressure events appear in the perf result JSON with timestamps so [SN-PERF-024](perf.md#sn-perf-024) soak runs can correlate them.
- [ ] On web, where no pressure API exists, the app behaves exactly as at nominal and the absence is recorded, not silently assumed.

#### Technical notes
Expose pressure as an immutable value through a Riverpod provider, matching the thermal probe pattern in [SN-PERF-015](perf.md#sn-perf-015), so consumers subscribe rather than poll a singleton. The eviction order is deliberate — furthest-from-viewport first, re-derivable data before anything needing I/O to rebuild. Do not free the wet-layer surface under pressure: dropping the active stroke's buffer is a visible failure and the surface is small. Flush through the same storage path as ordinary autosave ([SN-CORE-001](storage.md#sn-core-001) area) so durability semantics are identical.

#### Security & privacy
Flushing under pressure must keep encryption invariants: the journal is written through the same encrypted-at-rest path, never a plaintext emergency dump (MASVS-STORAGE-1, [SN-CRY-001](security.md#sn-cry-001)). Eviction must not leave decrypted page bitmaps in a cache directory that survives the process; dropped buffers are zeroed where the platform allows. A low-memory kill must not bypass a note lock on restore ([SN-AUTH-001](auth.md#sn-auth-001) area).

#### UX notes
Invisible when it works. The user must never see a "low memory" dialog: the app sheds caches quietly, and the worst visible effect is a page re-rendering a fraction of a second later after severe pressure. After a kill, reopening lands on the same page at the same scroll position with the last stroke present.

#### Test plan
Unit: the level-to-step mapping, including unknown levels. Integration: `am send-trim-memory` at each level with golden comparison, and a kill-during-stroke durability test on Android and iOS. Widget: none. Manual: fill a low-end device with background apps and write for ten minutes, recorded under `tools/device_lab/results`.

#### Dependencies
[SN-PERF-009](perf.md#sn-perf-009), [SN-INK-022](ink.md#sn-ink-022)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-011

<a id="sn-gprf-011"></a>

**Split deferred components and move plugin initialisation off the startup path**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | perf, devx |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-008](perf.md#sn-perf-008) |
| Security controls | `OWASP-A05`, `MASVS-CODE-4` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
The startup strategy is explicit: defer everything not needed for first ink, split rarely-used features (brush studio, PDF export, ML) into deferred libraries so they do not inflate first paint, and warm the storage, sync and index isolates only after the editor is interactive (docs/architecture/rendering-and-performance.md section 4; docs/platform/performance-budgets.md B6 and section 5 item 3). [SN-PERF-008](perf.md#sn-perf-008) measures cold start and explicitly places the deferred-component splitting implementation out of its scope, and no other issue picks it up — so the budget has a gate and no remedy. This is the work that makes B6 pass on a 4 GB Android and a cached web PWA, and it must land before the heavy subsystems (PDF, ML, audio, transcription) arrive, because retro-fitting deferral after every plugin is eagerly registered is far more expensive.

#### Scope
**In:** an audit of what runs before the first interactive frame; deferred-library boundaries for the brush studio, PDF export, ML/handwriting, transcription, billing and cloud-drive SDKs (`deferred as` in Dart, `--split-debug-info`-compatible AOT splitting, web code-splitting); lazy plugin registration so a federated plugin's native side initialises on first use rather than at boot; post-first-frame warm-up scheduling for the storage, sync and index isolates; a CI guard listing the symbols/packages allowed on the startup path and failing when a new eager import appears.
**Out:** the cold-start measurement ([SN-PERF-008](perf.md#sn-perf-008)), warm start and resume ([SN-GPRF-009](perf.md#sn-gprf-009)), the individual plugin implementations, and the web precache strategy ([SN-WEB-011](compat.md#sn-web-011)).

#### Acceptance criteria
- [ ] A documented list of everything initialised before the first interactive frame exists, and each entry is justified as required for first ink or moved behind deferral.
- [ ] The brush studio, PDF, ML, transcription, billing and cloud-drive code paths are deferred libraries that are provably not loaded at boot, asserted by a test inspecting loaded libraries / bundle chunks.
- [ ] Native plugin initialisation is lazy: launching and writing a stroke never triggers PDF, ML or cloud SDK init, proven by an init counter in profile builds.
- [ ] Isolate warm-up starts only after the first interactive frame, and a cold start with warm-up disabled is measurably no faster (proving warm-up is off the critical path).
- [ ] A CI guard fails when a new import puts a non-allowlisted package on the startup path, with a message naming the import chain.
- [ ] Cold start improves or holds on every Tier 1 slot; the numbers before and after are recorded.

#### Technical notes
Dart deferred loading works on web natively and via AOT split units on mobile; verify per platform rather than assuming, and keep a fallback path where a deferred load fails (offline PWA, interrupted download) so a feature degrades with a message instead of throwing. Federated plugins scaffolded in the Foundations area already isolate platform code; lazy registration means not calling their `registerWith` until the feature's first use, which needs care on the iOS side where plugin registration is generated. Guest mode stays first-class: no auth or network on the boot path.

#### Security & privacy
Deferred code must not become unverified code: on web, split chunks are covered by the same CSP and SRI posture as the main bundle ([SN-WEB-014](security.md#sn-web-014), [SN-WEB-016](security.md#sn-web-016)), and a chunk fetched at runtime is same-origin only. Lazy plugin init must not defer a security control — key material, note locks and the encrypted store initialise on the normal path, never lazily (MASVS-STORAGE-1). The startup allowlist doubles as a supply-chain signal: an unexpected package on the boot path is worth a look (sec: supply-chain).

#### UX notes
The user sees the library or their last page fast, and can write before sync connects. When a deferred feature is opened for the first time and its chunk must load, show the standard inline loading state from the design system rather than a blocking spinner, and never more than once per install.

#### Test plan
Unit: deferred-load failure handling per feature. Integration: a cold-start trace asserting the deferred set is absent at first frame, plus a first-use test asserting each feature loads and works. CI: the startup-path import guard with a fixture violation. Benchmark: `tools/perf_harness` cold-start runs before/after on iPad, Android-lowend and web cached.

#### Dependencies
[SN-PERF-008](perf.md#sn-perf-008)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-012

<a id="sn-gprf-012"></a>

**Define the performance run statistical protocol and device preconditions**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | perf, qa, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-018](perf.md#sn-perf-018) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
The gates are defined in terms of p95, p99 and peak, and they fail a PR that regresses beyond a tolerance versus a stored baseline (docs/platform/performance-budgets.md section 3; [SN-PERF-003](perf.md#sn-perf-003)). What is not defined anywhere is how a number is produced: how many runs, whether the first is discarded, what device state is required, and how large a difference has to be before it is a regression rather than noise. That gap is how perf gates die. Too tight a tolerance and the check flakes until someone marks it non-blocking; too loose and a real 15% regression sails through. A warm device, a background app update, a different screen brightness or an unlucky first run can each move a frame-time p99 more than the regression being hunted.

#### Scope
**In:** a written protocol plus its implementation in `tools/perf_harness`: run counts per metric class, warm-up runs discarded, the statistic computed per run and across runs, an empirically derived per-slot noise floor (measured by running the same commit N times), tolerance derived from that noise floor rather than guessed, a minimum detectable effect stated per budget, and the device preconditions the runner enforces before a run (battery level and charging state, fixed brightness, airplane mode or a declared network state, thermal cooldown wait, no other foreground apps, animator scales, developer-option overrides off); a re-run-once-then-fail policy for perf jobs and how it differs from the general flaky-test policy ([SN-QA-008](qa.md#sn-qa-008)).
**Out:** the gate workflow ([SN-PERF-003](perf.md#sn-perf-003)), the budget values ([SN-PERF-018](perf.md#sn-perf-018)), the runner provisioning ([SN-GPRF-013](perf.md#sn-gprf-013)), and the trend dashboard ([SN-PERF-019](perf.md#sn-perf-019)).

#### Acceptance criteria
- [ ] A documented protocol exists per metric class (latency proxy, frame time, cold start, memory, energy) naming run count, warm-up discards, statistic and aggregation.
- [ ] A noise-floor run mode executes the same commit N times per slot and writes a noise profile; tolerances in the gate are derived from that profile and regenerating it is a documented, reviewed action.
- [ ] The harness refuses to record a gating result when a precondition fails (low battery, charging where the protocol forbids it, device above the thermal threshold, wrong brightness) and says which precondition blocked it.
- [ ] Each budget states its minimum detectable effect on each gate device, so a regression smaller than the noise floor cannot silently become a required check.
- [ ] A perf job that fails re-runs once; a second failure is a real failure, and the pair of results is attached.
- [ ] A synthetic fixture proves the gate distinguishes a 3% shift within noise (pass) from a 20% regression (fail).

#### Technical notes
Compute both a within-run statistic (p95/p99 of frames in one run) and an across-run statistic (median of the per-run p99) so a single unlucky run does not decide a merge. Prefer a trimmed or bootstrap confidence interval over assuming normality — frame-time distributions are heavily skewed. Preconditions come from the device config ([SN-PERF-004](perf.md#sn-perf-004)) and are read on-device: battery via platform APIs, thermal via the probe from [SN-PERF-015](perf.md#sn-perf-015), brightness set by the runner script. Record every precondition value in the result so an old result can be audited. The gate workflow [SN-PERF-003](perf.md#sn-perf-003) (M1) consumes this protocol; the protocol itself is defined in M0 in `tools/perf_harness` and does not depend on the gate.

#### Security & privacy
None beyond baseline. The protocol records device state, never content, and all numbers stay local to the runner and the repo (ADR-0011: no vendor analytics). A precondition that requires disabling a security feature is never acceptable: runs happen on a normally configured device, not one with verification disabled.

#### UX notes
No user-facing surface. The developer experience is the point: a failing perf check must tell an engineer "this is 22% over the noise floor on Android-lowend, here are the two runs", not "perf failed", which is the difference between a gate people fix and a gate people bypass.

#### Test plan
Unit: statistics implementation (percentiles, trimming, confidence interval) against fixed vectors; precondition evaluator tests for each failing state. Integration: a noise-floor run on one slot producing a profile; a fixture-driven gate test with a within-noise and an over-noise series. Docs: the protocol lives in `tools/perf_harness/README.md` and is linked from the budgets doc.

#### Dependencies
[SN-PERF-018](perf.md#sn-perf-018) (budget values). This defines the protocol standalone in `tools/perf_harness`; the CI perf gate [SN-PERF-003](perf.md#sn-perf-003) (M1) consumes it, so PERF-003 is a consumer, not a scheduling dependency.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-013

<a id="sn-gprf-013"></a>

**Provision the self-hosted physical device runner for the perf gates**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | perf, ci-cd, qa |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-003](perf.md#sn-perf-003), [SN-GPRF-012](perf.md#sn-gprf-012) |
| Security controls | `SLSA-BUILD-L3`, `OWASP-CICD-SEC-4`, `OWASP-CICD-SEC-7` |
| Extra labels | needs-credentials, sec: supply-chain |

#### Context
Every perf gate in the plan assumes a machine with real devices attached to it. [SN-PERF-004](perf.md#sn-perf-004) defines the device-lab configs and explicitly leaves provisioning the physical runner out of scope; [SN-QA-009](qa.md#sn-qa-009) sets up a cloud device farm for functional and integration runs, which is the right tool for those but cannot serve latency or fps gates — a shared cloud device gives no control over thermal state, brightness, background load or pen hardware, and the budgets doc forbids emulators from gating at all (docs/platform/performance-budgets.md section 3). So the infrastructure that every blocking perf check depends on is currently owned by nobody. This issue provisions it: a host, the attached Tier 1 devices, the job plumbing, and the security posture that a self-hosted runner demands.

#### Scope
**In:** a documented runner topology (a macOS host for iPad/iPhone slots, a Linux or macOS host for Android slots) with the Tier 1 devices attached; a self-hosted GitHub Actions runner configured for trusted refs only; device provisioning scripts (developer mode, stay-awake, brightness, locale, animation scales, cleanup between jobs); a watchdog that reboots a wedged device and quarantines a slot that fails to prepare; ephemeral per-job workspaces; artifact upload of results and timelines; a runbook for adding, replacing or retiring a device.
**Out:** the harness and gate logic ([SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-003](perf.md#sn-perf-003)), the cloud functional farm ([SN-QA-009](qa.md#sn-qa-009)), the camera rig ([SN-PERF-006](perf.md#sn-perf-006)), and the statistical protocol ([SN-GPRF-012](perf.md#sn-gprf-012)) that this runner enforces.

#### Acceptance criteria
- [ ] The runner executes the perf job on at least the iPad, Android-tablet-stylus and Android-lowend slots and uploads results to the workflow run.
- [ ] Jobs from forked pull requests never execute on the self-hosted runner; perf on an untrusted PR runs only after an explicit maintainer label, and a test PR proves the block.
- [ ] Each job starts from a clean workspace and leaves no build output, credentials or note fixtures on the host or the devices; a post-job check asserts it.
- [ ] Device preparation is scripted and idempotent, and a device failing preparation quarantines its slot with a clear message instead of producing a bogus number.
- [ ] A wedged or disconnected device is detected and recovered (reboot, re-pair) automatically; a slot offline for more than one nightly cycle raises an issue.
- [ ] The runbook documents adding a device, rotating runner credentials, and the physical/network security expectations of the host.

#### Technical notes
Self-hosted runners execute arbitrary workflow code, so the isolation posture is the design, not an afterthought: dedicated machine, non-admin service account, no long-lived cloud credentials on the host, network segment with egress limited to the package and Actions endpoints, and no reuse of the host for release signing ([SN-REL-017](release.md#sn-rel-017) keeps signing separate). Devices connect over USB with authorised debugging keys; Android runs `adb` with a persisted key, iOS uses a provisioned profile and `devicectl`/`xcrun`. Keep device state reset cheap — uninstall the app between jobs rather than factory-resetting.

#### Security & privacy
This is the highest-value target in the CI estate: a compromised runner with attached, authorised devices can install arbitrary builds. Controls: trusted-ref-only execution, maintainer-gated PR runs, least-privilege service account, no secrets beyond what a perf run needs, egress allow-list, host patching, and audit logging of job invocations (sec: supply-chain; OWASP CI/CD-SEC-4 insufficient flow control, CI/CD-SEC-7 insecure system configuration; SLSA build-platform expectations). Devices hold only synthetic fixtures; no real user data ever reaches the lab.

#### UX notes
No user-facing surface. Internally, a contributor should see perf results attached to their PR within the documented turnaround, and a queue that is backed up must be visible rather than silently delaying merges.

#### Test plan
Infrastructure verification rather than unit tests: a smoke workflow that claims a slot, prepares a device, runs a two-minute scenario and uploads a result; a negative test proving a fork PR cannot schedule on the runner; a chaos check that physically disconnects a device mid-job and asserts recovery and quarantine. The runbook is validated by a second person following it to attach a new device.

#### Dependencies
[SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-003](perf.md#sn-perf-003), [SN-GPRF-012](perf.md#sn-gprf-012)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-014

<a id="sn-gprf-014"></a>

**Add the in-app performance HUD and local jank capture behind a debug flag**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | perf, devx, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-020](perf.md#sn-perf-020), [SN-PERF-022](perf.md#sn-perf-022) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-2` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
The jank triage runbook and its automated analyser ([SN-PERF-020](perf.md#sn-perf-020)) both start from a captured timeline. In the lab that is easy. Everywhere else — a tester's foldable, a beta user's low-end tablet, a maintainer reproducing a report on the train — there is no way to see what the app thinks is happening or to capture the moment it stuttered. The information exists internally: the active ink tier, the renderer ([SN-PERF-022](perf.md#sn-perf-022)), the quality-ladder step ([SN-PERF-023](perf.md#sn-perf-023)), the thermal state ([SN-PERF-015](perf.md#sn-perf-015)), frame times, the latency proxy and the tile-cache size. This issue surfaces it in a debug HUD and adds a one-tap local capture, so a jank report arrives with evidence instead of "it felt laggy sometimes".

#### Scope
**In:** an overlay widget showing instantaneous and p99 frame time, fps, the latency proxy, the active tier and renderer, the quality-ladder step, thermal and power state, tile-cache bytes and the last eviction; a rolling in-memory frame-timing ring buffer with a "capture last 10 seconds" action that writes a timeline plus run metadata to a local file; a hidden entry point in Settings (a build-flavour toggle in internal builds, a deliberate gesture in release) and a kill switch; the file format consumed directly by the triage CLI.
**Out:** the triage analyser itself ([SN-PERF-020](perf.md#sn-perf-020)), the CI dashboard ([SN-PERF-019](perf.md#sn-perf-019)), field metrics upload ([SN-TEL-013](telemetry.md#sn-tel-013), opt-in and separate), and the diagnostics bundle ([SN-TEL-008](telemetry.md#sn-tel-008), which this capture may be attached to by the user).

#### Acceptance criteria
- [ ] The HUD renders outside the wet-ink repaint scope and costs no measurable frame time when enabled (its own overhead measured and under 0.2 ms at 60 Hz), and zero when disabled.
- [ ] The HUD is absent from release builds unless explicitly enabled by the documented gesture, and the overlay is never shown to a user who has not enabled it.
- [ ] Capture writes a timeline plus metadata (device, OS, build, tier, renderer, ladder step, thermal, budgets in force) to app-private storage and the triage CLI parses it without modification.
- [ ] A capture contains no note content, no page images, no file names and no identifiers; a test asserts the serialised capture against a content deny-list.
- [ ] The capture file is shareable by the user's explicit action only, through the system share sheet; the app never uploads it.
- [ ] Enabling the HUD survives a hot restart but not an app update, so a forgotten HUD cannot ship enabled on someone's device forever.

#### Technical notes
Drive the HUD from the same `FrameTiming` stream the harness uses so one source of truth reports build and raster separately; paint it in its own `RepaintBoundary` in an overlay above the editor, never inside the canvas layer. The ring buffer must pre-allocate — a diagnostic that allocates per frame would create the jank it exists to find ([SN-PERF-021](perf.md#sn-perf-021)). Reuse the redacted logging facade's rules for anything written to disk. Thermal/quality-ladder fields are populated when [SN-PERF-015](perf.md#sn-perf-015) (M5) lands; the core HUD ships in M2.

#### Security & privacy
This is a diagnostics surface in a zero-server, content-free product, so the deny-list is the design: no note text, no titles, no OCR output, no file paths containing user names, no stable device identifiers (ADR-0011; [SN-TEL-003](telemetry.md#sn-tel-003) deny-by-default serialiser is the model to follow). Captures live in app-private storage, are excluded from backups where note data is ([SN-AND-030](security.md#sn-and-030)), and are deletable from Settings. No egress path exists in this issue at all (MASVS-PRIVACY-1, MASVS-STORAGE-2).

#### UX notes
Internal-facing. The HUD is a compact, monospaced, translucent panel, draggable out of the way, high-contrast in both themes, and dismissible with one tap; it must never intercept pen input. The Settings entry lives in the advanced/diagnostics area described by [SN-SET-001](settings.md#sn-set-001), with plain language about what a capture contains and what it does not.

#### Test plan
Widget: HUD rendering in light/dark with golden snapshots; a test asserting it paints outside the ink repaint scope. Unit: ring-buffer allocation behaviour, capture serialiser against the content deny-list, enable-state lifetime across restart and update. Integration: enable, ink for ten seconds, capture, and feed the file to the triage CLI in the same test.

#### Dependencies
[SN-PERF-020](perf.md#sn-perf-020) (triage analyser feed), [SN-PERF-022](perf.md#sn-perf-022). The core HUD (frame time, fps, latency proxy, tile-cache) ships in M2; the thermal and quality-ladder fields are populated when [SN-PERF-015](perf.md#sn-perf-015) (M5) lands, so PERF-015 is not a scheduling blocker.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-015

<a id="sn-gprf-015"></a>

**Measure idle, screen-on and background energy drain beyond the writing soak**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone, android-tablet, android-phone |
| Areas | perf, compat, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-013](perf.md#sn-perf-013), [SN-PERF-014](perf.md#sn-perf-014) |
| Security controls | `MASVS-PRIVACY-3` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
Budget B10 caps a two-hour *continuous writing* session at 12% drain on an iPad Pro ([SN-PERF-013](perf.md#sn-perf-013); docs/platform/performance-budgets.md B10). Real sessions are not continuous writing: a notebook sits open on a desk while a student listens, the app sits in the background while they use something else, and a recording runs for an hour with the screen off. Those states have no budget and no measurement, and they are where energy bugs hide — a repaint loop that never idles, a ProMotion panel held at 120 Hz with nothing moving, a sync or index isolate waking every few seconds, an audio session keeping the CPU awake. The remedy list even names the cause (reduce continuous repaint, respect adaptive refresh, coalesce sync — docs/platform/performance-budgets.md section 5 item 6), so the measurement that would catch it should exist.

#### Scope
**In:** three additional energy scenarios and their proposed budgets in the registry — editor open and idle with the screen on (30 minutes), app backgrounded with sync enabled (60 minutes), and background audio recording (60 minutes); per-scenario sampling reusing the [SN-PERF-013](perf.md#sn-perf-013) protocol and preconditions; wakeup/wake-lock accounting on Android (`dumpsys batterystats`) and energy-impact capture on iOS; an assertion that the idle editor requests no high frame-rate range and produces no repaint; results recorded per device with the thermal timeline.
**Out:** the writing soak itself ([SN-PERF-013](perf.md#sn-perf-013)), the idle-refresh draw-path behaviour ([SN-INK-023](ink.md#sn-ink-023), [SN-PERF-014](perf.md#sn-perf-014)), background sync scheduling policy ([SN-SYNC-001](sync.md#sn-sync-001) area), and fixing whatever the measurements find.

#### Acceptance criteria
- [ ] Three energy scenarios exist with documented preconditions, durations and proposed budgets in the budget registry, each marked with its cadence (nightly or release candidate).
- [ ] Screen-on idle with a notebook open produces zero app-driven frames after the documented idle period and its drain is within tolerance of a display-only baseline measured on the same device.
- [ ] Backgrounded with sync enabled records wakeups per hour and CPU time per hour; both are under the documented caps and any wake-lock held longer than its cap fails the run.
- [ ] Background recording holds only the audio session and its documented wake-lock; no ink, index or render work runs while the screen is off.
- [ ] Results include the thermal timeline and the refresh-rate timeline so an idle run that quietly sat at 120 Hz is visible.
- [ ] A regression opens a release-blocking issue on the nightly cadence like the other energy budgets.

#### Technical notes
Android: `dumpsys batterystats --reset` before, `--checkin` after, parsing wakeup counts, partial wake-lock durations, and per-uid CPU; `dumpsys power` for held locks. iOS: Instruments Energy Log plus `UIDevice.batteryLevel` sampling, with the app isolated per [SN-PERF-013](perf.md#sn-perf-013) preconditions. The idle assertion is easiest from the app side: a frame counter exposed in profile builds that must not advance while idle. Keep the display-only baseline per device — energy budgets are meaningless without the panel's own cost subtracted.

#### Security & privacy
None beyond baseline. Battery statistics are device-level and contain no content; the scenarios use synthetic notebooks and a silent audio input. Background recording is only exercised with the same foreground-service notification and consent posture the feature ships with ([SN-AND-023](audio.md#sn-and-023)), never with a test build that bypasses it (MASVS-PRIVACY-3).

#### UX notes
No user-facing surface. The user-visible payoff is a tablet that is not warm and half-empty after a lecture it spent mostly idle, and an app that does not appear at the top of the battery-usage screen — which, for a note app, is a trust-destroying place to appear.

#### Test plan
Lab-run scenarios executed on the iPad and Android Tier 1 slots at the nightly/RC cadence, recorded under `tools/device_lab/results`. Unit: the batterystats parser against captured fixtures. Integration: a profile-build test asserting zero frames and zero isolate messages during a two-minute idle window, which is the cheap proxy the per-commit job can run.

#### Dependencies
[SN-PERF-013](perf.md#sn-perf-013), [SN-PERF-014](perf.md#sn-perf-014)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-016

<a id="sn-gprf-016"></a>

**Gate startup and document-open performance against slow storage and a cold cache**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone, web, ipad |
| Areas | perf, storage, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-008](perf.md#sn-perf-008), [SN-PERF-010](perf.md#sn-perf-010), [SN-GPRF-012](perf.md#sn-gprf-012) |
| Security controls | `MASVS-STORAGE-1` |
| Extra labels | agent-ready, sec: masvs |

#### Context
Cold start (B6) and opening a 1,000-page notebook (B7) are both dominated by I/O: reading the manifest, opening the SQLite database, faulting in blobs, and on web warming the service-worker cache ([SN-PERF-008](perf.md#sn-perf-008), [SN-PERF-010](perf.md#sn-perf-010)). Both are measured in the best possible conditions — a lab device that just ran the same scenario, with the file already in the OS page cache and the database file hot. The low-end reference device has eMMC-class storage, often nearly full, and the user's first open of the day is always cold. A benchmark that only ever measures the warm path will report a passing B6 while real first-launches take twice as long, and the gap will never appear in CI.

#### Scope
**In:** a cold-cache mode for the startup and notebook-open benchmarks (drop the page cache or reboot between runs so each measurement is a genuine first read); a slow-storage mode that runs the same scenarios with background I/O contention on the device; a nearly-full-storage case on the low-end slot; the web equivalent (a cold service-worker/HTTP cache load and an OPFS-cold open); reporting warm and cold numbers as separate series so both trends are visible.
**Out:** the benchmarks themselves ([SN-PERF-008](perf.md#sn-perf-008), [SN-PERF-010](perf.md#sn-perf-010)), the storage layer ([SN-CORE-001](storage.md#sn-core-001) area), web durability and eviction ([SN-WEB-009](storage.md#sn-web-009), [SN-WEB-032](storage.md#sn-web-032)), and the statistical protocol ([SN-GPRF-012](perf.md#sn-gprf-012)) that both modes obey.

#### Acceptance criteria
- [ ] The harness can run any startup or open scenario in cold-cache mode, and the method used per platform (reboot, cache drop, fresh install, cache-busted load) is documented and recorded in the result.
- [ ] Cold and warm numbers are stored as separate series with separate baselines; a change that improves warm and regresses cold is visible rather than averaged away.
- [ ] A slow-storage run with documented background I/O contention completes within a documented multiple of the warm budget on the low-end slot, and any run that exceeds it fails with the contention level attached.
- [ ] A near-full storage case (device at the documented free-space threshold) is exercised at least nightly on the low-end slot, and a failure to write is handled by the app as a user-visible, recoverable error rather than data loss.
- [ ] Web cold load is measured with an empty HTTP and service-worker cache and reported separately from the cached PWA budget, per the rule that the 3 s budget is the cached case.
- [ ] The lazy-materialisation contract from B7 still holds under cold cache: opening the 1,000-page fixture still reads only the manifest and the current page, asserted by counting file reads, not just wall time.

#### Technical notes
Android page cache can be dropped via `sync; echo 3 > /proc/sys/vm/drop_caches` on a rooted lab device, or approximated by a reboot on a stock one — document whichever the lab uses, and never mix the two in one series. Background contention can be generated with a controlled writer process; keep it reproducible and record its rate. Counting reads is more stable than timing them: instrument the store's file access in profile builds so the contract assertion does not depend on device speed.

#### Security & privacy
None beyond baseline, with one caveat: the near-full-storage case is a durability scenario, and the app must fail closed — an encrypted write that cannot complete must not leave a partial or plaintext artifact, and the journal must recover on next launch ([SN-CRY-001](security.md#sn-cry-001), MASVS-STORAGE-1). The lab must not disable encryption to make I/O numbers look better; the measured path is the shipped path.

#### UX notes
No user-facing surface, but the error path it exercises is: when the device is out of space the app shows the standard recoverable error with a route to free space or export, never a silent failure. The real payoff is that the first launch of the day feels like the second.

#### Test plan
Integration: cold-cache and contention variants of the existing startup and 1,000-page-open scenarios on the low-end and iPad slots, plus the web cold-load variant. Unit: the read-count instrumentation and its assertion helper. Manual: one near-full-storage pass per release recorded under `tools/device_lab/results`.

#### Dependencies
[SN-PERF-008](perf.md#sn-perf-008), [SN-PERF-010](perf.md#sn-perf-010), [SN-GPRF-012](perf.md#sn-gprf-012)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-017

<a id="sn-gprf-017"></a>

**Profile and document Tier 2 browser performance for Safari, Firefox and Samsung Internet**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | web |
| Areas | perf, compat, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-023](qa.md#sn-web-023), [SN-WEB-024](perf.md#sn-web-024), [SN-WEB-002](compat.md#sn-web-002) |
| Security controls | `OWASP-A05`, `MASVS-NETWORK-1` |
| Extra labels | agent-ready, sec: owasp-top10 |

#### Context
Only Chrome and Edge desktop are Tier 1 on the web, where the 30 ms ink budget and the PWA gates are enforced ([SN-WEB-024](perf.md#sn-web-024)). Safari on iPadOS and macOS, Firefox and Samsung Internet are Tier 2: they MUST be functional, and their known cosmetic and performance gaps are documented rather than release-blocking (docs/platform/compatibility-matrix.md sections 1 and 3). [SN-WEB-023](qa.md#sn-web-023) builds the cross-browser functional harness, but nobody ever measures these browsers, so "known gaps are documented" is currently an empty promise — and iPad Safari is the constraining web target, the browser where a student is most likely to open a shared note. The matrix also carries an unresolved "(verify)" on Firefox skwasm support that a measured run would settle.

#### Scope
**In:** a per-browser performance profile run on Safari iPadOS, Safari macOS, Firefox and Samsung Internet covering ink latency proxy, frame time during writing and scrolling, cached and uncached load, and a 600-page PDF scroll; recording which renderer path was taken (CanvasKit vs skwasm) and which progressive-enhancement APIs were honoured (`desynchronized`, coalesced and predicted events, Ink API); writing the results into a Tier 2 known-gaps table in the docs and the compatibility registry; resolving the Firefox skwasm "(verify)" cell.
**Out:** the Tier 1 Chrome gates ([SN-WEB-024](perf.md#sn-web-024)), the functional cross-browser harness ([SN-WEB-023](qa.md#sn-web-023)), Safari Pencil support ([SN-WEB-007](ink.md#sn-web-007)), and fixing the gaps found (each filed separately with its measurement attached).

#### Acceptance criteria
- [ ] Each Tier 2 browser has a recorded profile with the same metric set as the Chrome run, marked non-gating, dated and tied to a browser version.
- [ ] The renderer path and each progressive-enhancement API is recorded as honoured, ignored or unavailable per browser, not assumed from documentation.
- [ ] The Firefox skwasm question is answered with evidence and the registry row is updated with `verified` and a date.
- [ ] A Tier 2 known-gaps table exists in the web platform docs, written in language support can quote to a user, and is regenerated from the results rather than hand-maintained.
- [ ] iPad Safari is profiled on real hardware with a real Pencil, since it is the constraining target and the one most likely to receive a share link.
- [ ] A Tier 2 result that falls below "functional" (the app cannot take a note) is escalated as a release blocker even though its perf numbers are not gated.

#### Technical notes
Reuse the web latency proxy from [SN-PERF-002](perf.md#sn-perf-002) (`event.timeStamp` to `requestAnimationFrame` present timing) and the Lighthouse/load capture from [SN-WEB-024](perf.md#sn-web-024); the numbers need to be comparable across browsers, so the same scenario code must run everywhere with no Chromium-only path. Detect honoured `desynchronized` by behaviour, not by the constructor accepting the flag — WebKit accepts it and ignores it. Samsung Internet tracks Chromium with a lag, so record its Chromium base version alongside its own.

#### Security & privacy
None beyond baseline. Runs use synthetic notebooks on a test origin with the production header posture ([SN-WEB-014](security.md#sn-web-014), [SN-WEB-015](security.md#sn-web-015), [SN-WEB-016](security.md#sn-web-016)) so a browser that silently drops COOP/COEP or Trusted Types is caught here; a Tier 2 browser that cannot enforce a security header must be recorded, since reduced isolation changes the web key-protection posture ([SN-WEB-031](security.md#sn-web-031)).

#### UX notes
The output is honesty: a support page and an in-app best-effort notice ([SN-GPRF-007](compat.md#sn-gprf-007)) that say exactly what is slower or missing in a given browser, instead of a user concluding the product is broken. Where a gap is severe (no low-latency path on iPad Safari), the docs should recommend the installed app rather than pretending parity.

#### Test plan
Automated where the browser can be driven in CI (Firefox, Chromium-family via the cross-browser harness); manual per release for Safari iPadOS with a Pencil and for Samsung Internet on a device. Results land in `tools/device_lab/results/web-<browser>-<version>.md` and regenerate the gaps table. Add a test asserting the gaps table is in sync with the recorded results.

#### Dependencies
[SN-WEB-023](qa.md#sn-web-023), [SN-WEB-024](perf.md#sn-web-024), [SN-WEB-002](compat.md#sn-web-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-019

<a id="sn-gprf-019"></a>

**Feed Low Power Mode and Battery Saver into the adaptive quality ladder**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, ios-phone, android-tablet, android-phone |
| Areas | perf, compat, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-023](perf.md#sn-perf-023), [SN-PERF-015](perf.md#sn-perf-015), [SN-PERF-014](perf.md#sn-perf-014) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
The quality ladder has two inputs today: device capability and thermal pressure ([SN-PERF-023](perf.md#sn-perf-023), [SN-PERF-015](perf.md#sn-perf-015)). It is missing the third signal the OS gives us, and the one users deliberately switch on in the second half of a lecture: Low Power Mode on iOS/iPadOS and Battery Saver on Android. Both change the environment underneath the renderer — Battery Saver caps many panels to 60 Hz and restricts background work, Low Power Mode reduces CPU/GPU frequency and can drop ProMotion — and both signal user intent: spend less. An app that keeps requesting 120 Hz, keeps indexing in the background and keeps running prediction overdraw while the user is trying to survive to the end of the day is ignoring an explicit instruction, and it will also silently fail the frame-pacing assumptions in [SN-PERF-014](perf.md#sn-perf-014) because the panel is no longer where the app thinks it is.

#### Scope
**In:** a power-save probe behind the same capability interface style as the thermal probe (iOS `ProcessInfo.isLowPowerModeEnabled` plus its change notification, Android `PowerManager.isPowerSaveMode` plus `ACTION_POWER_SAVE_MODE_CHANGED`); mapping power-save state onto ladder steps with hysteresis; pausing or deferring optional background work (indexing, thumbnail generation, non-urgent sync, prefetch) while power-save is on; re-reading the display mode when power-save changes so the frame budget follows the panel; recording the power-save timeline in perf and energy results; a diagnostics line in Settings naming the active ladder step and why.
**Out:** the ladder mechanism ([SN-PERF-023](perf.md#sn-perf-023)), thermal detection ([SN-PERF-015](perf.md#sn-perf-015)), refresh-rate measurement ([SN-GPRF-002](perf.md#sn-gprf-002), [SN-PERF-014](perf.md#sn-perf-014)), and Reduce Motion, which is an accessibility preference handled in the a11y area and must not be conflated with a power signal.

#### Acceptance criteria
- [ ] Power-save state is exposed as an immutable value through a provider with an explicit unknown state where no API exists (web), and consumers observe it rather than polling.
- [ ] Entering power-save drops the ladder one step and pauses the documented optional background work within one second; leaving it restores after the documented hysteresis window, proven with a fake clock to not oscillate.
- [ ] Wet-ink latency, stroke geometry and everything persisted are byte-identical in power-save and out of it; a golden and a round-trip test prove the pen is never degraded.
- [ ] When power-save changes the display mode, the frame budget used by the jank counter is re-derived, so a Battery-Saver-capped 60 Hz panel is not judged against an 8.3 ms budget or vice versa.
- [ ] The energy scenarios ([SN-GPRF-015](perf.md#sn-gprf-015)) record the power-save timeline, and a run that entered power-save mid-measurement is annotated rather than silently compared with one that did not.
- [ ] Settings shows the active quality step and its cause (capability, thermal, power-save) as read-only diagnostics.

#### Technical notes
Treat the three ladder inputs as a max-of-constraints rather than a last-writer-wins: thermal serious plus power-save must not cancel out. Keep the hysteresis windows separate per input, because a user toggling Battery Saver expects an immediate effect while a thermal recovery should be slow. Android's Battery Saver behaviour varies by OEM, so read the panel mode from the platform after the change rather than assuming a 60 Hz cap.

#### Security & privacy
None beyond baseline. Power state is device-level, not personal, and stays local; it is never used as a fingerprinting signal or sent anywhere (ADR-0011). Pausing background sync under power-save must not weaken durability: queued changes stay in the encrypted local journal and flush when power-save ends or when the user explicitly syncs ([SN-SYNC-001](sync.md#sn-sync-001) area; MASVS-STORAGE-1).

#### UX notes
Nothing flashes, nothing nags. The user gets a subtly cheaper frame and a quieter background, and if they look, Settings tells them why the app is in reduced quality. The one hard rule the design must honour: the pen never changes. Ink feel is the product, and it is the last thing that may be traded, including when the user has asked the whole device to slow down.

#### Test plan
Unit: state mapping and hysteresis with a fake clock; the max-of-constraints resolver across capability, thermal and power inputs. Widget: the Settings diagnostics line. Integration: toggle Battery Saver on a device mid-stroke and assert stroke geometry is unchanged, background work pauses and the frame budget re-derives; the iOS equivalent with Low Power Mode. Golden: ink rendering identical across states.

#### Dependencies
[SN-PERF-023](perf.md#sn-perf-023), [SN-PERF-015](perf.md#sn-perf-015), [SN-PERF-014](perf.md#sn-perf-014)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GPRF-020

<a id="sn-gprf-020"></a>

**Automate performance-regression bisect on the physical device runner**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p3 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | perf, ci-cd, devx |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-GPRF-013](perf.md#sn-gprf-013), [SN-PERF-003](perf.md#sn-perf-003), [SN-GPRF-012](perf.md#sn-gprf-012) |
| Security controls | `SLSA-BUILD-L3`, `OWASP-CICD-SEC-4` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
The nightly perf job files a release-blocking issue when a budget regresses ([SN-PERF-003](perf.md#sn-perf-003)), and the trend dashboard shows the slope ([SN-PERF-019](perf.md#sn-perf-019)). Neither answers the only question that matters next: which commit did it. A nightly covers a day of merges, and on a codebase built to be worked by autonomous agents that can be dozens of commits. Today someone would hand-bisect by rebuilding and re-running on a lab device, which takes hours and is exactly the work a machine with the harness already attached should do. Without it, perf regressions get triaged late, blamed on the wrong change, or absorbed into a new baseline — which is how a lag-proof product stops being one.

#### Scope
**In:** a bisect job that takes a budget id, a device slot and a commit range, builds and runs the relevant scenario at each probe commit on the physical runner, applies the statistical protocol ([SN-GPRF-012](perf.md#sn-gprf-012)) so a probe is only called regressed when it clears the noise floor, and posts the identified commit and its evidence into the existing release-blocking issue; a cap on probes and wall-clock time with a partial result when it is hit; reuse of build artifacts where a commit was already built.
**Out:** the gate and issue filing ([SN-PERF-003](perf.md#sn-perf-003)), the runner itself ([SN-GPRF-013](perf.md#sn-gprf-013)), the triage analyser ([SN-PERF-020](perf.md#sn-perf-020), which explains *why* a frame was slow while this finds *when* it started), and any automatic revert (a human decides).

#### Acceptance criteria
- [ ] The job accepts a budget id, slot and commit range and returns the first commit whose measurement is over the threshold, with the per-probe series attached.
- [ ] Each probe uses the run count and noise floor from the statistical protocol; a range whose endpoints differ by less than the noise floor terminates early with "no significant regression" instead of bisecting noise.
- [ ] Probe results are cached by commit and slot, so re-running a bisect over an overlapping range does not rebuild or re-measure.
- [ ] The job respects a configured probe budget and wall-clock cap and reports the narrowed range when it stops early.
- [ ] The result is posted as a comment on the release-blocking issue naming the commit, the metric, the before/after values and the confidence.
- [ ] A dry-run mode with a synthetic injected regression proves the search converges on the right commit.

#### Technical notes
Use `git bisect run` semantics with a wrapper that turns the harness result into an exit code, but keep the decision in the harness so the protocol is applied consistently. Builds dominate the cost: cache per-commit artifacts keyed by commit and slot, and prefer a profile build with the same flags the gate uses — a bisect on differently-built binaries measures the build, not the change. Serialise access to the device slot so a bisect cannot interleave with a gating run and poison both.

#### Security & privacy
Inherits the runner's posture ([SN-GPRF-013](perf.md#sn-gprf-013)): bisect builds arbitrary historical commits, which is trusted-ref code only, never a fork PR, and each probe runs in an ephemeral workspace with no release-signing credentials on the host (sec: supply-chain; OWASP CI/CD-SEC-4). Cached artifacts are content-addressed and purged on a schedule so stale binaries cannot be resurrected into a release path.

#### UX notes
No user-facing surface. For a maintainer or an agent the experience is that a perf regression issue arrives with a culprit commit and a chart already attached, so the next action is a code review rather than an afternoon of rebuilding.

#### Test plan
Unit: the decision wrapper mapping harness results to bisect exit codes, including inconclusive probes; the cache key derivation. Integration: a dry run over a synthetic history with a known injected regression, asserting the identified commit and the probe count; a second run proving the cache is used. Manual: one real bisect against a historical regression once the runner is live.

#### Dependencies
[SN-GPRF-013](perf.md#sn-gprf-013), [SN-PERF-003](perf.md#sn-perf-003), [SN-GPRF-012](perf.md#sn-gprf-012)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GWEB-001

<a id="sn-gweb-001"></a>

**Implement the web Worker execution model for storage, sync, index and one-shot work**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | perf, storage, compat |
| Size | L |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-008](storage.md#sn-web-008), [SN-CORE-004](storage.md#sn-core-004), [SN-GWEB-005](security.md#sn-gweb-005) |
| Security controls | `CWE-400`, `MASVS-PRIVACY-1`, `ASVS-V1` |
| Extra labels | agent-ready |

#### Context

`docs/architecture/overview.md` §6 defines the threading contract the whole product is written against: a UI/root isolate that only captures input and paints, plus a **storage isolate**, a **sync isolate**, a **search/index isolate**, and one-shot `Isolate.run`/`compute` jobs for tessellation, decode, export and thumbnails. The document states the web mapping in one line — "Dart isolates compile to Web Workers" — and stops there. That line hides the single biggest correctness trap in the web build: Flutter web does **not** provide real isolates. `Isolate.spawn` is unsupported, and `compute()`/`Isolate.run` run the callback **inline on the main thread**. Every acceptance criterion elsewhere in the backlog that says "off the UI isolate" ([SN-CORE-004](storage.md#sn-core-004), [SN-SRCH-004](search.md#sn-srch-004), [SN-PG-010](pages-canvas.md#sn-pg-010), [SN-WEB-013](sharing-export.md#sn-web-013), [SN-WEB-019](sync.md#sn-web-019), [SN-WEB-025](ocr-hwr.md#sn-web-025), [SN-WEB-028](pdf.md#sn-web-028)) therefore passes on mobile and silently degrades to blocking main-thread work on web, taking B3 (≤ 30 ms pen-to-pixel, `docs/platform/performance-budgets.md`) and B6 (< 3 s cached cold start) with it. It is also not optional at the storage layer: OPFS `createSyncAccessHandle()` is **Worker-only** (`docs/platform/web.md` §4), so [SN-WEB-008](storage.md#sn-web-008) already needs a worker it does not own. This issue builds the one web concurrency facade everything else consumes, so no other issue has to invent its own.

#### Scope

**In:** a `SaneCompute` facade (interface in `packages/sane_core/lib/src/platform/compute.dart`, native implementation over isolates, web implementation over `dart:js_interop` dedicated Workers) with: a worker entry bundle built and versioned alongside the app; a typed request/response protocol (request id, op name, payload, cancel, progress) carrying only serialisable values and transferables; long-lived workers for storage, sync/crypto and index; a bounded one-shot worker pool for tessellation, image/PDF decode, export and thumbnail rendering; structured-clone vs transferable rules documented per payload type; a single-threaded degraded mode when Workers or cross-origin isolation are unavailable, surfaced in the capability report; and a mapping table appended to `docs/platform/web.md` §5.

**Out:** the OPFS/drift backend itself ([SN-WEB-008](storage.md#sn-web-008)), cross-origin isolation headers ([SN-WEB-015](security.md#sn-web-015)), multithreaded WASM inside a worker ([SN-WEB-027](audio.md#sn-web-027)), native isolate wiring, and the draw-path rule that nothing hops off the UI thread mid-stroke ([SN-PERF-016](perf.md#sn-perf-016)).

#### Acceptance criteria

- [ ] A documented `SaneCompute` API exists and is the **only** sanctioned way to run heavy work; an arch-lint test fails any `compute(`/`Isolate.run(` call outside it in code that ships to web.
- [ ] On Chrome, Safari and Firefox, opening a 1,000-page notebook, running a full-text query, generating 20 thumbnails and exporting a 50-page PDF each keep the main thread free of any task longer than **50 ms**, measured from a Performance trace.
- [ ] The storage, sync and index workers are spawned once per session and reused; a counter proves no worker is created per operation.
- [ ] Cancelling an in-flight job (navigate away mid-export) terminates the work and frees the worker within 200 ms.
- [ ] Payloads cross the boundary as bytes or transferables; a test asserts no closure, no live `sane_core` entity graph and no `dart:ui` handle is sent.
- [ ] With Workers unavailable, the app still functions: heavy work is chunked with yields, the capability report says `workers: false`, and the UI shows progress rather than freezing.
- [ ] B3 on Chrome desktop is unchanged with all workers warm ([SN-WEB-024](perf.md#sn-web-024) run attached to the PR).

#### Technical notes

Implement in `app/lib/platform/web/compute/` with the worker entry compiled as a separate Dart entry point (`web/workers/sane_worker.dart`) so it is cacheable and code-split ([SN-GWEB-006](perf.md#sn-gweb-006)). Use `dart:js_interop` + `postMessage`; prefer `ArrayBuffer`/`Uint8List` transfers over structured clone for stroke and blob payloads (`sane_core` value objects are already immutable byte-friendly, overview §6). drift's web build already expects a worker for the OPFS sync handle — reuse the same worker rather than spawning a second one. Record the decision and the web mapping in `docs/adr/0010-web-pwa-strategy.md` as a clarifying amendment (it currently implies isolates map for free).

#### Security & privacy

Workers execute same-origin code with full access to OPFS and decrypted note bytes, so the worker bundle is part of the trusted computing base: it must be self-hosted, integrity-pinned and covered by the CSP `worker-src 'self'` directive ([SN-WEB-014](security.md#sn-web-014), [SN-GWEB-005](security.md#sn-gweb-005)) — CWE-1104, OWASP-A08. Messages must be validated on receipt (op name against an allow-list, bounded payload sizes) so a DOM-XSS foothold cannot drive the storage worker as a confused deputy (OWASP-A03, CWE-20). Unbounded worker spawning is a local DoS and memory-exhaustion vector: the pool is capped and queue-bounded (CWE-400, CWE-770). No note content, key material or object ids may be logged from a worker; `SaneLog` redaction applies inside workers too ([SN-SEC-021](security.md#sn-sec-021), CWE-532, MASVS-PRIVACY-1).

#### UX notes

Invisible when it works. The only visible surfaces are the progress and cancel affordances already specified for export, import and indexing (`docs/design/screens-and-flows.md`), plus the degraded-mode note in Settings → About → Diagnostics when workers are unavailable ("Background processing is limited in this browser"). No spinner may appear for operations under 200 ms; long operations show determinate progress with a cancel button that is keyboard reachable.

#### Test plan

- `packages/sane_core/test/platform/compute_contract_test.dart` — shared contract suite run against the fake, isolate and web implementations.
- `app/test/platform/web/worker_protocol_test.dart` — request/response/cancel/progress, malformed-message rejection, payload-size caps.
- `app/test/arch/no_direct_compute_test.dart` — arch-lint for direct `compute`/`Isolate.run` usage.
- `app/integration_test/web/main_thread_budget_test.dart` — long-task assertion over the four heavy flows, run in the headless-Chromium job from [SN-WEB-023](qa.md#sn-web-023).
- Manual: Safari iPadOS and Firefox runs recorded in the Tier 2 matrix.

#### Dependencies

[SN-WEB-008](storage.md#sn-web-008) (OPFS/drift backend that consumes the storage worker), [SN-CORE-004](storage.md#sn-core-004) (schema and storage isolate contract), [SN-GWEB-005](security.md#sn-gweb-005) (self-hosted, pinned worker/engine artifacts). Coordinates with [SN-WEB-015](security.md#sn-web-015) (isolation) and [SN-PERF-016](perf.md#sn-perf-016) (draw-path discipline).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GWEB-006

<a id="sn-gweb-006"></a>

**Implement deferred loading and route-level code splitting for the web build**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | perf, compat, ci-cd |
| Size | M |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-003](perf.md#sn-web-003), [SN-WEB-011](compat.md#sn-web-011), [SN-GWEB-005](security.md#sn-gweb-005) |
| Security controls | `CWE-1104`, `OWASP-A08`, `CWE-400` |
| Extra labels | agent-ready |

#### Context

[SN-WEB-003](perf.md#sn-web-003) sets the web bundle budget and explicitly defers the work that makes it achievable: "Deferred-loading levers to be used by later work (not here): lazy plugin init, code-split routes, subset fonts." That later work has no issue. The numbers make it unavoidable: CanvasKit is ~1.5 MB before our own compiled Dart (`docs/adr/0010-web-pwa-strategy.md`), and the feature set adds several **independent multi-megabyte WASM payloads** — SQLite ([SN-WEB-008](storage.md#sn-web-008)), PDFium ([SN-WEB-028](pdf.md#sn-web-028)), whisper.cpp plus a model ([SN-WEB-027](audio.md#sn-web-027)), the handwriting recogniser ([SN-WEB-025](ocr-hwr.md#sn-web-025)), tesseract for image OCR ([SN-MED-010](images-media.md#sn-med-010)). A user who opens `/try` to scribble one page must not download a PDF engine and a speech model to do it, and B6 (< 3 s cold start on a cached PWA) cannot survive a monolithic bundle. This issue builds the splitting discipline and the guardrail that keeps it from rotting.

#### Scope

**In:** Dart deferred imports (`import … deferred as …` + `loadLibrary()`) around the heavy feature modules (PDF, audio/transcription, recognition/OCR, import/export of competitor formats, Brush Studio, Settings sub-trees); a small `FeatureLoader` that owns load state, progress, retry and error for each deferred module; route-level splitting so Library, Editor, Reader ([SN-GWEB-014](sharing-export.md#sn-gweb-014)) and Settings load independently; lazy initialisation of federated plugin web implementations so a capability probe does not pull its payload; service-worker runtime caching rules per deferred chunk ([SN-WEB-011](compat.md#sn-web-011)); a per-chunk entry in the budget file so [SN-WEB-003](perf.md#sn-web-003) gates each chunk, not just the total; and documentation of the split map in `docs/platform/web.md`.

**Out:** the budget mechanism itself ([SN-WEB-003](perf.md#sn-web-003)), engine self-hosting ([SN-GWEB-005](security.md#sn-gweb-005)), font subsetting ([SN-GWEB-007](design-system.md#sn-gweb-007)), and the features inside each module.

#### Acceptance criteria

- [ ] First interactive canvas on `/try` downloads **only** the shell, engine and ink/editor chunks — a test asserts the PDF, audio, transcription and recognition chunks are not requested until a user action needs them.
- [ ] Opening a PDF for the first time shows a determinate "Preparing PDF engine" progress state and loads the chunk once per session; the second open is instant.
- [ ] Each deferred module has a named chunk with its own budget line; CI fails when a chunk exceeds its ceiling beyond tolerance ([SN-WEB-003](perf.md#sn-web-003)).
- [ ] A failed chunk load (offline, evicted cache, HTTP error) surfaces a retry affordance and never leaves a half-initialised feature or a silent dead button.
- [ ] B6 cold start (< 3 s cached) and first-uncached transfer size both improve against the pre-split baseline, with the numbers recorded in the PR ([SN-WEB-024](perf.md#sn-web-024)).
- [ ] Deferred chunks are precached only when the user has used the feature at least once; otherwise they are runtime-cached on first use, keeping the install footprint small ([SN-WEB-011](compat.md#sn-web-011)).
- [ ] An arch-lint test fails any direct import that re-links a deferred module back into the main bundle.

#### Technical notes

Flutter web supports deferred loading for the JS build; verify behaviour for the `--wasm`/skwasm output on the pinned Flutter version and record the result — if a path does not split, say so in `docs/platform/web.md` rather than pretending. Keep the loader UI in `sane_ui` so every feature gets the same progress/error treatment ([SN-DS-022](design-system.md#sn-ds-022) skeletons, [SN-DS-019](design-system.md#sn-ds-019) toasts). Chunk URLs must stay same-origin and integrity-covered ([SN-GWEB-005](security.md#sn-gweb-005), [SN-WEB-016](security.md#sn-web-016)). Coordinate the chunk manifest with the immutable `/b/<buildId>/` deploy layout so a deploy mid-session never 404s a chunk ([SN-REL-008](release.md#sn-rel-008)).

#### Security & privacy

Deferred chunks are executable code loaded at runtime: they must be same-origin, hash-pinned and CSP-clean (`script-src 'nonce-…' 'strict-dynamic'`), never fetched from a URL derived from user input (CWE-1104, OWASP-A08, CWE-829). A stale-deploy 404 on a chunk is an availability bug that must fail closed with a retry rather than leaving the editor in a partially working state (CWE-400, fail-closed per checklist §0). Model and engine downloads that cost real bandwidth stay behind explicit consent where they are large ([SN-WEB-027](audio.md#sn-web-027)), and no download beacon or third-party host is introduced (MASVS-PRIVACY-1).

#### UX notes

Progress is honest and bounded: a skeleton or inline progress with the payload size stated for anything over ~2 MB, matching the consent pattern already specified for the whisper model ([SN-WEB-027](audio.md#sn-web-027)). Errors are recoverable ("Couldn't load the PDF engine — Retry"), never a blank pane. Everything is keyboard reachable and announced through a live region ([SN-WEB-021](a11y.md#sn-web-021)).

#### Test plan

- `app/test/web/deferred_map_test.dart` — the split map matches the arch-lint expectation; no eager import of a deferred module.
- `app/integration_test/web/first_paint_requests_test.dart` — request allow-list on first interactive paint.
- `app/integration_test/web/chunk_failure_test.dart` — simulated 404/offline chunk load shows retry and recovers.
- CI: per-chunk budget table posted to the PR by the [SN-WEB-003](perf.md#sn-web-003) job.

#### Dependencies

[SN-WEB-003](perf.md#sn-web-003) (budget registry), [SN-WEB-011](compat.md#sn-web-011) (caching strategy), [SN-GWEB-005](security.md#sn-gweb-005) (same-origin, pinned artifacts). Consumed by [SN-WEB-025](ocr-hwr.md#sn-web-025), [SN-WEB-027](audio.md#sn-web-027), [SN-WEB-028](pdf.md#sn-web-028), [SN-GWEB-014](sharing-export.md#sn-gweb-014).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GWEB-012

<a id="sn-gweb-012"></a>

**Add the web memory ceiling and long-session stability gate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | web |
| Areas | perf, compat, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-009](perf.md#sn-perf-009), [SN-WEB-008](storage.md#sn-web-008), [SN-WEB-024](perf.md#sn-web-024) |
| Security controls | `CWE-400`, `CWE-770` |
| Extra labels | agent-ready |

#### Context

[SN-PERF-009](perf.md#sn-perf-009) builds the memory sampler and steady-state budget tests — for iPad, Android tablet and Android phone. Web is excluded, and web is where memory failure is most abrupt: a browser tab has a hard ceiling (a 32-bit WASM heap cannot exceed 4 GiB, and in practice Chrome tabs, iPad Safari and Chromebooks die far earlier), there is no OS memory-pressure callback to respond to, and the failure mode is not a slow degradation but an instant "Aw, Snap"/"A problem repeatedly occurred" that takes the whole session with it. Our web build also stacks several large consumers in one tab: the CanvasKit/skwasm heap, SQLite-WASM pages, an OPFS blob cache, tile rasters for large pages ([SN-INK-022](ink.md#sn-ink-022)), PDFium page buffers ([SN-WEB-028](pdf.md#sn-web-028)), audio buffers ([SN-WEB-026](audio.md#sn-web-026)) and, if used, a whisper model of a few hundred megabytes ([SN-WEB-027](audio.md#sn-web-027)). Nothing currently states a web memory budget, measures it, or tests what happens when a tab is killed mid-session. `docs/platform/performance-budgets.md` covers B3/B6 on web but has no memory row for the web column.

#### Scope

**In:** a web memory budget added to the budget registry ([SN-PERF-018](perf.md#sn-perf-018)) — steady-state ceiling for a typical notebook, a peak ceiling for the heavy paths (large PDF, transcription) and a documented "do not load" threshold; a sampler using `performance.measureUserAgentSpecificMemory()` where available with a `performance.memory`/heuristic fallback, run inside the web perf harness ([SN-WEB-024](perf.md#sn-web-024)); bounded caches audited and capped on web specifically (tile raster LRU, PDF page cache, blob cache, thumbnail cache); a **pre-flight capability check** that refuses to start a memory-hungry optional feature (whisper model, huge PDF) when headroom is insufficient, with an honest message instead of a tab crash; tab-crash recovery verification (reload restores the last committed state via [SN-GWEB-003](storage.md#sn-gweb-003)); and a 2-hour web soak scenario added to the beta soak ([SN-PERF-024](perf.md#sn-perf-024)).

**Out:** native memory work ([SN-PERF-009](perf.md#sn-perf-009)), the adaptive quality ladder ([SN-PERF-023](perf.md#sn-perf-023)), storage quota and eviction ([SN-WEB-009](storage.md#sn-web-009)), and the features' own implementations.

#### Acceptance criteria

- [ ] The budget registry gains web memory rows (steady-state, peak, refuse-threshold) with justified numbers and the measurement method documented.
- [ ] A scripted 2-hour session (write, scroll a 600-page PDF, record 30 minutes of audio, run search, switch looks) stays under the steady-state ceiling with **no monotonic growth**: the last-hour slope is within tolerance, proving no leak.
- [ ] Every web cache has an explicit, tested cap; a test drives each one past its limit and asserts eviction rather than growth.
- [ ] With insufficient headroom, loading the transcription model or a very large PDF is refused **before** allocation with a clear message and a suggested alternative (use the installed app, or free space), and the tab does not crash.
- [ ] A forced tab crash (`chrome://crash` or equivalent) followed by a reload restores the notebook, page and viewport with zero committed data loss ([SN-GWEB-003](storage.md#sn-gweb-003), [SN-WEB-032](storage.md#sn-web-032)).
- [ ] The measurement runs in CI on Chrome headless and reports a trend artifact; a regression beyond tolerance fails the job ([SN-WEB-024](perf.md#sn-web-024), [SN-PERF-019](perf.md#sn-perf-019)).
- [ ] iPad Safari and a low-RAM Chromebook are exercised manually once per release and recorded in the Tier 2 matrix ([SN-WEB-023](qa.md#sn-web-023)).

#### Technical notes

`measureUserAgentSpecificMemory()` requires **cross-origin isolation** ([SN-WEB-015](security.md#sn-web-015)) — another reason isolation is worth having; fall back to heuristic sampling (allocation counters plus cache sizes we control) where it is unavailable, and say which method produced a number. Caches to audit live in `sane_render` (tiles), `app/lib/platform/web/storage` (blobs), the PDF worker ([SN-WEB-028](pdf.md#sn-web-028)) and the thumbnail cache ([SN-PG-010](pages-canvas.md#sn-pg-010)). Use the existing replay corpus ([SN-PERF-005](perf.md#sn-perf-005)) so the soak is deterministic. Record results in the performance trend dashboard ([SN-PERF-019](perf.md#sn-perf-019)).

#### Security & privacy

Memory exhaustion is an availability threat and, in a parser context, often the visible end of a resource-consumption bug: unbounded caches and unbounded decode buffers are CWE-400/CWE-770, which the input-validation gate ([SN-SEC-004](security.md#sn-sec-004)) already treats as fail-closed requirements — this issue extends that discipline to the browser, where the ceiling is lower and the crash is total. Measurement data is aggregate and content-free; sizes and counts are logged, never ids or titles (CWE-532, MASVS-PRIVACY-1). The refuse-to-load path must fail closed and leave no partially initialised decoder behind (checklist §0).

#### UX notes

Two honest surfaces, both from `sane_ui`: an inline capability message where a feature is refused ("This browser doesn't have enough free memory for on-device transcription — the installed app can do this"), and, after a crash-and-restore, the same "Pick up where you left off" card as [SN-GWEB-003](storage.md#sn-gweb-003). No scary technical numbers, no blame, and never a dead button that silently does nothing.

#### Test plan

- `tools/perf_harness/web/memory_soak.dart` — the 2-hour scripted scenario with sampling and slope assertion.
- `app/test/perf/cache_caps_test.dart` — each cache evicts at its cap.
- `app/integration_test/web/low_memory_refusal_test.dart` — simulated low headroom refuses the heavy feature cleanly.
- `app/integration_test/web/crash_restore_test.dart` — forced crash, reload, state restored.
- CI: budget assertion + trend artifact in the [SN-WEB-024](perf.md#sn-web-024) job.

#### Dependencies

[SN-PERF-009](perf.md#sn-perf-009) (sampler patterns), [SN-WEB-008](storage.md#sn-web-008) (storage/caches), [SN-WEB-024](perf.md#sn-web-024) (web perf job), [SN-PERF-018](perf.md#sn-perf-018) (budget registry). Feeds [SN-PERF-024](perf.md#sn-perf-024).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-IPAD-025

<a id="sn-ipad-025"></a>

**Validate iPad pen-to-pixel latency, fps and battery on the Tier 1 device lab**

| Field | Value |
|---|---|
| GitHub | #326 |
| Type | test |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad |
| Areas | perf, compat, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-IPAD-001](input-gestures.md#sn-ipad-001) |
| Depends on | [SN-INK-006](ink.md#sn-ink-006) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
iPad is the reference surface for the <= 16 ms pen-to-pixel budget (decision 7) and its budgets are release-blocking on the Tier 1 device lab (docs/platform/compatibility-matrix.md §7; docs/platform/ipad.md §11). This issue wires the iPad device-lab slots (M-series ProMotion iPad Pro + iPad Air, each with Apple Pencil Pro and Pencil 2) into the CI perf gate and validates latency, fps/jank, cold start and battery on real Pencil hardware, extending the harness from the perf area's SN-PERF-002 (latency measurement harness) to full Pencil-Pro coverage.

#### Scope
**In:** device-lab configs for iPad-Pro-ProMotion and iPad-Air in `tools/device_lab`; run `tools/perf_harness` for pen-down->pixel (<= 16 ms ProMotion), >= 60 fps floor / 120 fps where available, no frame > 16.7 ms while writing, cold start < 1.5 s, and the 2-hour-writing <= 12% battery soak on iPad Pro; gate a regression as release-blocking.
**Out:** the SN-PERF-002 harness itself; the native Metal surface ([SN-INK-006](ink.md#sn-ink-006)); Android/web perf (their areas).

#### Acceptance criteria
- [ ] Pen-down->pixel <= 16 ms on the ProMotion iPad Pro and within the non-ProMotion floor on iPad Air, measured on real Pencil hardware (Simulator MUST NOT be the latency gate, docs/platform/ipad.md §11).
- [ ] >= 60 fps floor, 120 fps where the display allows, and no frame > 16.7 ms while writing.
- [ ] Cold start < 1.5 s on iPad; a 2-hour writing session consumes <= 12% battery on iPad Pro (soak).
- [ ] A latency/fps regression on a Tier 1 iPad blocks the release (CI gate).
- [ ] Both Apple Pencil Pro and Pencil 2 paths are exercised.

#### Technical notes
Extend `tools/perf_harness` + `tools/device_lab` (ADR references docs/platform/performance-budgets.md B1-B5). Depends on the Metal front-buffer surface ([SN-INK-006](ink.md#sn-ink-006)). Use Instruments (time-profiler / Metal system trace) for diagnosis (docs/platform/ipad.md §11). The draw loop logs nothing in profile/release.

#### Security & privacy
None beyond baseline: measurement only; no note content used; the draw loop logs nothing in profile/release; no tokens. Ensure the harness uses synthetic strokes, not user content (MASVS-PRIVACY-1).

#### UX notes
None beyond baseline (no shipped UI). The gate protects the felt quality that the design targets across all 17 looks; golden ink rendering is validated separately in the ink area.

#### Test plan
Perf: `tools/perf_harness` scenarios `ipad_latency`, `ipad_fps_jank`, `ipad_cold_start`, `ipad_battery_soak` run on the two Tier 1 iPad slots in CI; thresholds from docs/platform/performance-budgets.md. Manual: Instruments Metal system trace attached for any regression.

#### Dependencies
[SN-INK-006](ink.md#sn-ink-006) iPadOS Metal low-latency surface; SN-PERF-002 latency measurement harness (well-known perf-area key, created by the perf writer).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner; CodeQL over Swift plugin code)
- [ ] Docs/ADR updated if behaviour or architecture changed; docs/platform/performance-budgets.md + docs/platform/ipad.md §11 kept current
- [ ] Reviewed against docs/security/secure-coding-checklist.md; CODEOWNERS review where a plugin/entitlement changed

---

### SN-PERF-001

<a id="sn-perf-001"></a>

**Build the Sane Notes performance and lag-proofing discipline**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | epic |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | perf, compat, qa |
| Size | XL |
| SDLC | verification |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `MASVS-CODE-4`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
Lag-proof is the product's core promise, and the incumbents' single most-cited failure is lag and jank while writing (docs/platform/performance-budgets.md intro; research/user-pain-points-and-market-gaps.md). This epic builds the whole performance discipline: the measurement harness (on-device timestamp proxy plus high-speed-camera ground truth), the device lab (Tier 1/2/3 including the 4 GB Snapdragon-680-class low-end floor, older iPads, x86_64 emulators), the automated perf tests (flutter drive --profile) and the CI gates that make the locked decision-7 budgets B1-B10 release-blocking, plus the standing engine controls (120 Hz frame pacing, isolate discipline, shader warm-up, thermal handling, memory/battery/startup budgets, large-document benchmarks, web bundle budget) and the monitoring dashboard and jank-triage automation. The budgets are hard gates, not aspirations (docs/architecture/rendering-and-performance.md section 1; docs/platform/performance-budgets.md section 3). The M0 SN-INK latency spike is the go/no-go for the Flutter editor surface and depends on this harness producing an honest pen-to-pixel number (ADR-0001 exit criterion; [SN-INK-009](ink.md#sn-ink-009)).

#### Scope
**In:** the perf harness and device lab, the synthetic corpus and camera protocol, per-commit/nightly/release-candidate CI gates, frame/jank/cold-start/memory/battery tests, the 1,000-page + 600-page-PDF + 5,000-stroke benchmarks, 120 Hz pacing, thermal degradation and the adaptive quality ladder, isolate-hot-path enforcement, shader warm-up, the shared budget registry the web bundle and Lighthouse gates read, the trend dashboard, the beta soak, and jank-runbook automation.
**Out:** the ink engine and render/tiling implementation (SN-INK, sane_render), the PDF engine (SN-PDF), the DevSecOps pipeline (SN-CI), the web bundle and Lighthouse gate enforcement ([SN-WEB-003](perf.md#sn-web-003), [SN-WEB-024](perf.md#sn-web-024)), and per-feature perf owned inside each feature's own area.

#### Acceptance criteria
- [ ] All child issues below are closed and CI is green.
- [ ] Decision-7 budgets B1-B10 pass on every Tier 1 device; a regression does not merge (docs/platform/performance-budgets.md section 1).
- [ ] Both ink tiers are tracked for B1-B3 so the ADR-0001 exit criterion stays continuously evaluated, not just at M0.
- [ ] No perf artifact or harness logs note content or ink coordinates.

#### Technical notes
Packages/paths: tools/perf_harness (metrics, parsers, gates, dashboard, triage), tools/device_lab (reference configs + results), tools/perf_harness/baselines/<device>.json, app/integration_test/editor_latency_test.dart, a .github/workflows perf gate. Budgets B1-B10 and their measurement methods are in docs/platform/performance-budgets.md sections 1-2; the jank runbook is docs/architecture/rendering-and-performance.md section 6; the compatibility matrix is docs/platform/compatibility-matrix.md. ADRs: ADR-0001 (native-pivot exit criterion), ADR-0008 (tiers/surfaces), ADR-0010 (web), ADR-0014 (PDF), ADR-0011 (telemetry off by default). Children:
- [ ] [SN-PERF-002](perf.md#sn-perf-002) latency measurement harness
- [ ] [SN-PERF-003](perf.md#sn-perf-003) CI perf gates
- [ ] [SN-PERF-004](perf.md#sn-perf-004) device lab and reference configs
- [ ] [SN-PERF-005](perf.md#sn-perf-005) synthetic input corpus and replay driver
- [ ] [SN-PERF-006](perf.md#sn-perf-006) high-speed camera pen-to-pixel rig and protocol
- [ ] [SN-PERF-007](perf.md#sn-perf-007) frame-rate and jank perf test
- [ ] [SN-PERF-008](perf.md#sn-perf-008) cold-start startup budget test
- [ ] [SN-PERF-009](perf.md#sn-perf-009) memory sampler and leak/steady-state tests
- [ ] [SN-PERF-010](perf.md#sn-perf-010) 1,000-page notebook open benchmark
- [ ] [SN-PERF-011](perf.md#sn-perf-011) 600-page PDF scroll benchmark
- [ ] [SN-PERF-012](perf.md#sn-perf-012) 5,000-stroke dense-page stress benchmark
- [ ] [SN-PERF-013](perf.md#sn-perf-013) 2-hour battery drain and thermal test
- [ ] [SN-PERF-014](perf.md#sn-perf-014) 120 Hz frame pacing and adaptive refresh
- [ ] [SN-PERF-015](perf.md#sn-perf-015) thermal throttling detection and degradation
- [ ] [SN-PERF-016](perf.md#sn-perf-016) isolate hot-path audit and enforcement
- [ ] [SN-PERF-017](perf.md#sn-perf-017) shader warm-up and reuse
- [ ] [SN-PERF-018](perf.md#sn-perf-018) machine-readable budget registry (B1-B10 + web bundle)
- [ ] [SN-PERF-019](perf.md#sn-perf-019) perf trend dashboard
- [ ] [SN-PERF-020](perf.md#sn-perf-020) jank triage runbook automation
- [ ] [SN-PERF-021](perf.md#sn-perf-021) lag-proof checklist enforcement (repaint scope, per-sample allocations)
- [ ] [SN-PERF-022](perf.md#sn-perf-022) Impeller-active verification on every target build
- [ ] [SN-PERF-023](perf.md#sn-perf-023) adaptive quality ladder for low-end and throttled devices
- [ ] [SN-PERF-024](perf.md#sn-perf-024) beta performance soak across the Tier 1 device lab

#### Security & privacy
Perf tooling handles metrics only: ink coordinates, pressure, tilt and note content are never logged (overview section 8.2) and never sent off-device (zero-server, decision 3; ADR-0011 telemetry off by default). Uncontrolled memory or large-document growth is a resource-exhaustion vector, so tile-cache caps and eviction are treated as security controls. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, MASVS-CODE-4, CWE-400.

#### UX notes
The entire epic exists to protect the lag-proof feel across all 17 looks and light+dark (design/Sane Notes.dc.html Editor screen; docs/design/screens-and-flows.md section 7). Latency is not animation, so the low-latency and high-refresh path stays on even when Reduce Motion is enabled (PRD-ED-027). Developer-facing dashboards and triage reports must still be readable: labelled axes, contrast >= 4.5:1, and colour-plus-shape for regression flags (never colour alone).

#### Test plan
app/integration_test/editor_latency_test.dart, startup_test.dart, memory_soak_test.dart, large_notebook_open_test.dart, pdf_scroll_test.dart, dense_page_test.dart, frame_pacing_test.dart, thermal_degrade_test.dart, shader_warmup_test.dart; tools/perf_harness/test/* for parsers and gate logic; camera-rig and battery are supervised release-candidate runbook steps recorded under tools/device_lab/results.

#### Dependencies
SN-FND-002 (monorepo scaffold + tools/perf_harness + tools/device_lab). Coordinates with [SN-INK-001](ink.md#sn-ink-001) (ink engine), SN-CORE-004 (storage), SN-PDF-002 (PDF), SN-FND-003 (CI), SN-FND-004 (arch-lint).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-002

<a id="sn-perf-002"></a>

**Build the latency measurement harness (on-device pen-to-pixel proxy)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | perf, qa |
| Size | L |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready, innovation |

#### Context
The M0 exit criterion requires the harness to produce a pen-to-pixel latency number on at least one reference device (docs/roadmap.md M0; docs/architecture/rendering-and-performance.md section 2). There are two regimes: ground truth (the high-speed camera, [SN-PERF-006](perf.md#sn-perf-006)) and the CI proxy (this issue's on-device timestamps). Pen-to-pixel is the single most important number and is undercounted by software timers, which miss display scan-out and panel latency (docs/platform/performance-budgets.md B1-B3). The proxy therefore times pointer-event-received then sample-committed then frame-presented and adds a fixed per-device display-latency constant derived once from the camera rig, so a per-commit run can estimate the end-to-end number without a camera. The harness lives in tools/perf_harness with device configs in tools/device_lab.

#### Scope
**In:** the tools/perf_harness package scaffold (Dart CLI + integration_test hooks); the on-device instrumentation capturing t_sample (OS event timestamp) and t_present (FrameTiming on Tier B, native present callback on Tier A) and computing software latency; the per-device display-latency-constant table; a machine-readable JSON emitter to tools/perf_harness/baselines/<device>.json; both tiers measured so the Tier-A-vs-Tier-B gap is reported.
**Out:** the camera protocol ([SN-PERF-006](perf.md#sn-perf-006)), the CI gate wiring ([SN-PERF-003](perf.md#sn-perf-003)), the synthetic corpus ([SN-PERF-005](perf.md#sn-perf-005)), and the frame/jank extraction ([SN-PERF-007](perf.md#sn-perf-007)).

#### Acceptance criteria
- [ ] The harness emits a median and p95 software pen-to-pixel number for a scripted stroke on at least one reference device (M0 exit criterion).
- [ ] Both tiers are measured and the Tier-A-vs-Tier-B gap is reported so the ADR-0001 exit criterion stays continuously evaluated.
- [ ] The result is written as machine-readable JSON to tools/perf_harness/baselines/<device>.json with date, OS build, tier, and pen model.
- [ ] The per-device display-latency constant is documented and added to the software number to estimate end-to-end; the estimate is labelled an estimate, not camera ground truth.
- [ ] On web the proxy uses event.timeStamp then requestAnimationFrame present timing and accounts for desynchronized.
- [ ] The harness logs no ink coordinates or note content, only timing metrics.

#### Technical notes
tools/perf_harness (Dart CLI + IntegrationTestWidgetsFlutterBinding traceAction/reportData); SchedulerBinding.addTimingsCallback / FrameTiming (buildDuration + rasterDuration + vsync overhead); on Tier A the native surface present callback from [SN-INK-006](ink.md#sn-ink-006)/[SN-INK-007](ink.md#sn-ink-007). Timestamps are monotonic microseconds, never wall-clock (docs/architecture/ink-engine.md section 1.2). ADR-0001 exit criterion, ADR-0008 tiers; measurement method docs/architecture/rendering-and-performance.md section 2.1-2.2.

#### Security & privacy
Metrics only: never log ink coordinates, pressure or tilt (they are note content, overview section 8.2). Result files hold timing numbers, not content, and stay on the device / CI artifact. IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Developer-facing; the numbers gate the lag-proof feel that every one of the 17 looks and light+dark shares (design/Sane Notes.dc.html Editor). No end-user chrome. Latency is not animation, so this path must be measured with the low-latency mode on even under Reduce Motion (PRD-ED-027). The CLI/JSON output must be readable and labelled.

#### Test plan
tools/perf_harness/test/latency_proxy_test.dart (timestamp math, constant addition, JSON shape), app/integration_test/editor_latency_test.dart (drives a synthetic stroke from [SN-PERF-005](perf.md#sn-perf-005) and asserts a median+p95 number is produced).

#### Dependencies
SN-FND-002 (monorepo scaffold + tools/perf_harness). Coordinates with [SN-PERF-005](perf.md#sn-perf-005), [SN-PERF-006](perf.md#sn-perf-006), [SN-INK-005](ink.md#sn-ink-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-003

<a id="sn-perf-003"></a>

**Wire the CI perf gates (baselines, regression alerts, three cadences)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | perf, ci-cd |
| Size | L |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-007](perf.md#sn-perf-007), [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A05`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
The decision-7 budgets are release-blocking: a PR that regresses a budget must fail the check (docs/platform/performance-budgets.md section 3). This issue wires the perf gate into CI with three cadences: per-commit/PR (B1-B3 proxy, B4, B5, B6, B7), nightly (the full device set plus B8-B9 and golden re-render), and per release candidate (B1-B3 camera ground truth, B8, B9, B10). It compares each metric against per-device baselines in tools/perf_harness/baselines and fails on regression beyond tolerance, and it opens a release-blocking issue on a nightly regression. Emulators and simulators MUST NOT be a latency or fps gate because they do not reflect real display/input latency; they may run functional/golden checks only.

#### Scope
**In:** a perf gate workflow (a job in .github/workflows) that runs tools/perf_harness in profile mode; baseline comparison with both an absolute-budget check and a regression-percent threshold; p95/p99 for latency and frame time and peak for memory (no silent averaging); the PR check that blocks merge; the nightly job that files a labelled release-blocking issue; the release-candidate gate; both ink tiers tracked for B1-B3.
**Out:** the harness metrics themselves ([SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-007](perf.md#sn-perf-007)), the trend dashboard ([SN-PERF-019](perf.md#sn-perf-019)), the physical device runners ([SN-PERF-004](perf.md#sn-perf-004)), and the camera rig ([SN-PERF-006](perf.md#sn-perf-006)).

#### Acceptance criteria
- [ ] A PR that regresses a Tier 1 budget beyond tolerance fails the required perf check; one within tolerance passes (fixture-driven).
- [ ] Gates use p95/p99 (latency, frame time) and peak (memory); a spiky-distribution fixture proves no averaging masks a worst case.
- [ ] Baselines are per-device JSON under tools/perf_harness/baselines; a baseline changes only via an explicit PR and the change is called out (never silently loosened).
- [ ] Emulator/CI-VM runs are marked non-gating for latency/fps and never block on those numbers.
- [ ] A nightly regression opens a labelled release-blocking issue automatically.
- [ ] Both Tier A and Tier B numbers are recorded for B1-B3 so the ADR-0001 gap stays visible.

#### Technical notes
Extend .github/workflows (SN-FND-003, aligns with SN-CI-001 devsecops.yml); run flutter drive --profile on a self-hosted or Firebase Test Lab device runner; store baselines as tools/perf_harness/baselines/<device>.json. Regression tolerance is a per-metric percent plus the absolute budget from docs/platform/performance-budgets.md section 1 (B1-B10). The issue-filing step uses Node 22 + gh (mirrors scripts/ patterns).

#### Security & privacy
CI must not leak secrets; perf artifacts hold timings only, never note content (MASVS-PRIVACY-1). Pin third-party actions by commit SHA and grant a least-privilege token so the gate is not a supply-chain foothold (aligns SN-CI-001). IDs: MASVS-PRIVACY-1, OWASP-A05, CWE-1104.

#### UX notes
Developer-facing gate; it protects the lag-proof feel (all 17 looks, light+dark) by preventing silent regression. A failure message must name the device, budget, baseline, and measured value so the fix is actionable rather than a bare red X.

#### Test plan
tools/perf_harness/test/gate_test.dart (threshold logic, p95/p99, peak, regression math), plus a workflow dry-run fixture that feeds a regressed metric and asserts a non-zero exit and an issue-file call.

#### Dependencies
[SN-PERF-002](perf.md#sn-perf-002) (metrics), [SN-PERF-007](perf.md#sn-perf-007) (frame/jank numbers), SN-FND-003 (CI workflow), SN-CI-001 (DevSecOps pipeline).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-004

<a id="sn-perf-004"></a>

**Define the device lab and Tier 1/2/3 reference-device configs**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | perf, compat, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A05` |
| Extra labels | agent-ready, needs-credentials |

#### Context
For any OS x architecture x stylus x refresh x screen class we must know whether Sane Notes is CI-tested, manually tested, or best-effort (docs/platform/compatibility-matrix.md). This issue defines the Tier 1 reference-device set and the machine-readable configs in tools/device_lab that the harness and the gates consume, plus the Tier 2 manual pool and the Tier 3 best-effort bar. It encodes the low-end floor (4 GB RAM, Snapdragon 680-class, 60 Hz, arm64) that triggers the native-pivot review, older iPads (iPad Air 60 Hz, USB-C Pencil), and x86_64 emulators (functional/golden only, never a latency gate). This is the single source of truth for do-we-support-X and the substrate every perf run reads.

#### Scope
**In:** tools/device_lab config files, one per Tier 1 slot (iPad-Pro-ProMotion, iPad-Air, iPhone-ref, Android-tablet-stylus, Android-lowend, Android-A16, Web-Chrome-desktop), each carrying display Hz, arch, stylus, min OS, and which budgets apply; the Tier 2 manual pool list; the Tier 3 minimum bar; and a tools/device_lab/results/<device>-<os>.md template.
**Out:** the harness code ([SN-PERF-002](perf.md#sn-perf-002)), the CI gate ([SN-PERF-003](perf.md#sn-perf-003)), the camera rig ([SN-PERF-006](perf.md#sn-perf-006)), and provisioning the physical runner (which needs maintainer credentials).

#### Acceptance criteria
- [ ] Every Tier 1 slot in docs/platform/compatibility-matrix.md section 2 has a config file the harness and gate can read.
- [ ] The low-end floor config exists and a test asserts it is never removed (only added to), matching the compatibility-matrix rule.
- [ ] x86_64 emulator configs are flagged functional/golden-only and are non-gating for latency/fps.
- [ ] A schema test rejects a config missing display Hz, arch, stylus, or min OS.
- [ ] The results template records date, OS build, tier, and pen model per docs/architecture/rendering-and-performance.md section 2.1.

#### Technical notes
tools/device_lab; align exactly with docs/platform/compatibility-matrix.md section 2 (reference devices) and section 5 (refresh + screen class). Per-device budgets come from docs/platform/performance-budgets.md section 1 (the Tier-1 gate-device column). Physical execution runs on a self-hosted runner or Firebase Test Lab, injected via CI secrets, never committed (needs-credentials).

#### Security & privacy
Configs hold no secrets; runner credentials come from CI secrets, never committed (OWASP-A05). Result files hold metrics, never note content (MASVS-PRIVACY-1). IDs: MASVS-PRIVACY-1, OWASP-A05.

#### UX notes
Developer- and release-facing; guarantees the lag-proof promise holds on the real matrix. All 17 looks and light+dark are validated on Tier 1 per docs/platform/compatibility-matrix.md section 7. No end-user chrome.

#### Test plan
tools/device_lab/test/config_schema_test.dart (schema validity, low-end-floor presence, emulator non-gating flag, results-template fields).

#### Dependencies
SN-FND-002 (scaffold). Coordinates with [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-003](perf.md#sn-perf-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-005

<a id="sn-perf-005"></a>

**Build the synthetic input corpus and deterministic replay driver**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | perf, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `CWE-20` |
| Extra labels | agent-ready |

#### Context
Real pens are not reproducible, so latency and jank tests must be driven by recorded or synthetic InkSample streams (docs/architecture/rendering-and-performance.md section 2.3). This issue delivers a corpus of representative strokes (handwriting, fast diagonals, tight loops, slow shading) captured as timestamped InkSample sequences and a replay driver that feeds them deterministically through the pipeline, so latency and jank become deterministic and diffable across commits. It complements the ink-engine corpus ([SN-INK-033](ink.md#sn-ink-033)) with the perf-harness replay driver and the worst-case writing+scroll workloads that B4/B5 need.

#### Scope
**In:** a corpus format (InkSample sequences with monotonic tMicros) under tools/perf_harness/corpus; a replay driver that injects samples at recorded cadence into the pipeline (or a synthetic PointerEvent stream); worst-case writing+scroll workload scripts used by [SN-PERF-007](perf.md#sn-perf-007); a documented Android stylus-over-ADB simulation hook (debug.input.simulate_stylus_with_touch).
**Out:** the filter/geometry under test (SN-INK area), frame/jank extraction ([SN-PERF-007](perf.md#sn-perf-007)), and the camera rig ([SN-PERF-006](perf.md#sn-perf-006)).

#### Acceptance criteria
- [ ] The corpus covers at least handwriting, fast diagonals, tight loops, and slow shading; each stroke replays with identical sample count and ordering (determinism test).
- [ ] Replaying the same corpus twice yields identical frame-timing input (no wall-clock dependence; monotonic tMicros only).
- [ ] A worst-case writing+scroll workload script exists and is consumed by the frame/jank test.
- [ ] The ADB stylus-simulation path is documented and gated behind a debug flag.
- [ ] The corpus files contain synthetic or anonymised coordinates only, with no real user note content.

#### Technical notes
tools/perf_harness/corpus + tools/perf_harness/lib/replay.dart; InkSample comes from packages/sane_ink ([SN-INK-002](ink.md#sn-ink-002)). Injection goes through the same Listener path or a synthetic PointerEvent generator. Android simulation uses debug.input.simulate_stylus_with_touch (docs/architecture/rendering-and-performance.md section 2.3). The pure replay logic is pure Dart with no package:flutter dependency.

#### Security & privacy
The corpus is synthetic/anonymised; no note content is committed (MASVS-PRIVACY-1, MASVS-STORAGE-1). Validate sample shape and length before replay so a malformed corpus fails closed rather than crashing the harness (CWE-20). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1, CWE-20.

#### UX notes
Developer-facing; it ensures the lag-proof feel is measured on realistic strokes across tiers and all 17 looks (indirectly, via the harness). No end-user chrome of its own.

#### Test plan
tools/perf_harness/test/replay_test.dart (determinism, ordering, no-wall-clock), corpus_schema_test.dart (shape/length validation, synthetic-only assertion).

#### Dependencies
SN-FND-002 (scaffold). Coordinates with [SN-INK-002](ink.md#sn-ink-002) (InkSample), [SN-INK-033](ink.md#sn-ink-033) (ink corpus).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-006

<a id="sn-perf-006"></a>

**Define the high-speed camera pen-to-pixel rig and protocol**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | ipad, android-tablet, web |
| Areas | perf, compat |
| Size | S |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-004](perf.md#sn-perf-004) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, needs-credentials |

#### Context
Absolute latency can only be measured optically; software timestamps cannot see photons, and a green software timeline with a 45 ms optical latency is a failing product (docs/architecture/rendering-and-performance.md section 2.1; docs/platform/performance-budgets.md B1-B3). This issue defines the high-speed camera ground-truth protocol (>= 240 fps, 1000 fps preferred), the frame-counting method, the on-device corroboration logging, and a small parser that turns counted frames into latency_ms with median+p95, recorded to tools/device_lab/results. It is the exact measurement the M0 SN-INK spike ([SN-INK-009](ink.md#sn-ink-009)) runs for Tier A and Tier B on the three reference devices; its written pass/pivot decision is the gate for the whole ink architecture (ADR-0001).

#### Scope
**In:** the documented rig and procedure (camera fps, pen-tip-plus-screen framing, at least 20 strokes at varied speeds, median+p95 reporting); the simultaneous on-device corroboration log (t_sample, t_present per sample); a parser that computes latency_ms = frames_gap * (1000 / camera_fps) and the camera-vs-software gap (the fixed hardware latency); the results template.
**Out:** the CI proxy ([SN-PERF-002](perf.md#sn-perf-002)), the gate ([SN-PERF-003](perf.md#sn-perf-003)), and the spike decision write-up itself ([SN-INK-009](ink.md#sn-ink-009)).

#### Acceptance criteria
- [ ] A written protocol (in tools/device_lab/README or docs/architecture) specifies fps, framing, stroke count, and the median+p95 rule.
- [ ] The parser converts a frame-count log to latency_ms and reports median, p95, and the camera-vs-software gap.
- [ ] Results are recorded to tools/device_lab/results/<device>-<os>.md with date, OS build, tier, and pen model.
- [ ] Both Tier A and Tier B are measured on the three reference devices for the spike.
- [ ] The protocol states plainly that the camera is trusted for the absolute number and the proxy only for regressions.

#### Technical notes
docs/architecture/rendering-and-performance.md section 2.1; tools/device_lab/results; parser under tools/perf_harness. The physical rig (high-speed camera plus reference devices and pens) is a manual, human-supervised step requiring maintainer hardware/accounts (needs-credentials). ADR-0001 exit criterion, ADR-0008 tiers. The on-device corroboration reuses [SN-PERF-002](perf.md#sn-perf-002) timestamps.

#### Security & privacy
Result artifacts hold timings and frame counts, never note content (MASVS-PRIVACY-1). No secrets live in configs; captured footage of a device screen is treated as sensitive lab material and not committed. ID: MASVS-PRIVACY-1.

#### UX notes
Developer- and release-facing; the ground-truth number that guarantees the lag-proof promise on real hardware across all 17 looks. No end-user chrome.

#### Test plan
tools/perf_harness/test/camera_parser_test.dart (frame-count to latency math, median/p95, camera-vs-software gap). The physical measurement is a manual runbook step recorded under tools/device_lab/results.

#### Dependencies
[SN-PERF-002](perf.md#sn-perf-002) (on-device corroboration), [SN-PERF-004](perf.md#sn-perf-004) (device configs). Coordinates with [SN-INK-009](ink.md#sn-ink-009) (M0 spike).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-007

<a id="sn-perf-007"></a>

**Add the frame-rate and jank perf test (flutter drive --profile)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p0 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | perf, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-005](perf.md#sn-perf-005), [SN-INK-005](ink.md#sn-ink-005) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
Every PR that touches the draw path runs an automated perf test measuring frame build and raster times and jank (not absolute latency), gating on regression from the committed baseline (docs/architecture/rendering-and-performance.md section 2.2; docs/platform/performance-budgets.md B4/B5). This delivers the flutter drive --profile integration test that scripts a worst-case writing+scroll workload and extracts UI-thread frame time, raster-thread frame time, worst frame, the count of frames over 16.7 ms, and the 99th percentile, failing beyond tolerance versus the baseline. Impeller removes shader-compile jank (compiled offline), so any jank the test finds is app logic and must be investigated.

#### Scope
**In:** app/integration_test/editor_latency_test.dart driving synthetic strokes ([SN-PERF-005](perf.md#sn-perf-005)) via IntegrationTestWidgetsFlutterBinding traceAction/reportData; timeline extraction of UI frame time, raster frame time, worst frame, frames-over-16.7 ms count, and p99; the 60 fps floor and no-frame-over-16.7 ms assertions; the 120 fps assertion where the display allows; both tiers.
**Out:** the gate workflow wiring ([SN-PERF-003](perf.md#sn-perf-003)), the latency proxy ([SN-PERF-002](perf.md#sn-perf-002)), and cold start ([SN-PERF-008](perf.md#sn-perf-008)).

#### Acceptance criteria
- [ ] The test drives a scripted stroke and reports UI frame time, raster frame time, worst frame, frames-over-16.7 ms count, and p99.
- [ ] Zero frames over 16.7 ms during a scripted stroke on the Tier 1 gate device (a tiny documented tolerance only for the first frame after cold start).
- [ ] 60 fps floor held; on a 120 Hz panel >= 120 fps during the same workload.
- [ ] Results serialise to tools/perf_harness/baselines/<device>.json for [SN-PERF-003](perf.md#sn-perf-003) to compare.
- [ ] Runs against Tier B on CI where there is no device; when run on a VM the number is labelled emulator-non-gating.

#### Technical notes
integration_test + flutter drive --profile; SchedulerBinding/FrameTiming buildDuration + rasterDuration; extract worst and p99 (docs/architecture/rendering-and-performance.md section 2.2, section 7). Reuse the corpus and worst-case workload from [SN-PERF-005](perf.md#sn-perf-005); draw against the Tier B wet renderer [SN-INK-005](ink.md#sn-ink-005). A slow frame is classified UI-thread vs raster-thread for the triage tool ([SN-PERF-020](perf.md#sn-perf-020)).

#### Security & privacy
Metrics only; the timeline dump contains no note content (MASVS-PRIVACY-1, MASVS-STORAGE-1). IDs: MASVS-PRIVACY-1, MASVS-STORAGE-1.

#### UX notes
Guards the lag-proof feel across all 17 looks and light+dark; a jank regression is exactly the incumbent failure this product beats (design/Sane Notes.dc.html Editor). Reduce Motion never disables low latency (PRD-ED-027). No end-user chrome.

#### Test plan
app/integration_test/editor_latency_test.dart; tools/perf_harness/test/timeline_extract_test.dart (worst/p99/jank-count math over a fixture timeline).

#### Dependencies
[SN-PERF-002](perf.md#sn-perf-002) (harness), [SN-PERF-005](perf.md#sn-perf-005) (corpus/workload), [SN-INK-005](ink.md#sn-ink-005) (Tier B wet renderer).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, perf, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-008

<a id="sn-perf-008"></a>

**Add the cold-start startup trace and budget test**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | perf, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-PERF-002](perf.md#sn-perf-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-NETWORK-1` |
| Extra labels | agent-ready |

#### Context
Cold-start budgets are under 1.5 s on iPad, under 2 s on mid Android, and under 3 s on cached web PWA, measured to first interactive frame (editor ready to ink), not first pixel (docs/platform/performance-budgets.md B6; docs/architecture/rendering-and-performance.md section 4). This delivers the startup trace with a first-usable-frame marker and the per-surface method (adb shell am start -W TotalTime plus a Flutter marker on Android, Instruments App Launch plus a marker on iOS, service-worker cache warm then an interactive mark on web), gating on the median over N launches. The startup path must defer everything not needed for first ink and must never require auth or network (guest-first, decision 5).

#### Scope
**In:** a first-usable-frame trace marker in the app/ boot path; the Android adb am start -W capture plus the Flutter marker; the iOS launch trace marker; the web cached-load interactive mark (after service-worker warm); the median-over-N gate; the web first-ever (uncached) load measured but not gated to 3 s.
**Out:** the web bundle-size budget ([SN-PERF-018](perf.md#sn-perf-018)), the gate wiring ([SN-PERF-003](perf.md#sn-perf-003)), and the deferred-component splitting implementation (owned in app/, referenced here).

#### Acceptance criteria
- [ ] Cold start is measured to first interactive frame via a trace marker, not first pixel.
- [ ] Median over N launches is under 1.5 s iPad, under 2 s mid Android, under 3 s web cached (per gate device).
- [ ] Web first-ever load is measured and reported but not gated to 3 s (that budget is the cached PWA).
- [ ] The startup path performs no auth or network before first ink (guest-first), asserted by a no-egress-on-boot test.
- [ ] Deferred components (brush studio, PDF export, ML) are not loaded before the first interactive frame.

#### Technical notes
app-start trace; adb shell am start -W (TotalTime); Instruments App Launch; navigator.serviceWorker warm plus a custom interactive mark (docs/architecture/rendering-and-performance.md section 4). Never load the whole document; open the .sanenote manifest plus current page only ([SN-INK-022](ink.md#sn-ink-022), [SN-PERF-010](perf.md#sn-perf-010)). Emit results to tools/perf_harness/baselines for [SN-PERF-003](perf.md#sn-perf-003).

#### Security & privacy
Startup does no network or auth before first ink; the boot path logs no content and reads no secrets on the hot path (MASVS-PRIVACY-1, MASVS-NETWORK-1 - no unexpected egress at launch). IDs: MASVS-PRIVACY-1, MASVS-NETWORK-1.

#### UX notes
The app must be writable within budget on every surface and all 17 looks / light+dark; on web a fast HTML splash precedes the engine boot (docs/architecture/rendering-and-performance.md section 4). Guest mode is first-class, so no login wall sits on the startup path (docs/design/screens-and-flows.md onboarding).

#### Test plan
app/integration_test/startup_test.dart (first-usable-frame marker, no-egress-on-boot, no deferred lib loaded early), tools/perf_harness/test/startup_parse_test.dart (median-over-N math).

#### Dependencies
SN-FND-002 (app shell), [SN-PERF-002](perf.md#sn-perf-002) (harness). Coordinates with [SN-PERF-018](perf.md#sn-perf-018), [SN-INK-022](ink.md#sn-ink-022).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-009

<a id="sn-perf-009"></a>

**Add the memory sampler and leak / steady-state budget tests**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | android-tablet, android-phone, ipad |
| Areas | perf, compat |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-002](perf.md#sn-perf-002), [SN-INK-022](ink.md#sn-ink-022) |
| Security controls | `CWE-400`, `CWE-770`, `MASVS-CODE-4`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The memory budget is under 300 MB on a 4 GB Android during steady editing; the dominant consumers are tile rasters, PDF page bitmaps, and audio buffers (docs/platform/performance-budgets.md B9; docs/architecture/rendering-and-performance.md section 3). This delivers the memory sampler (PSS/RSS plus Dart heap) and the leak and steady-state gates: an open/close-50-notebooks test that asserts RSS returns to baseline, and a sustained-write test that asserts RSS stays under budget while drawing 10,000 strokes. An OOM or low-memory kill during the session is an automatic fail, because a kill mid-note is the worst possible outcome.

#### Scope
**In:** the sampler using adb shell dumpsys meminfo (PSS/RSS) and dart:developer / observatory heap; a long mixed-session script (write, scroll a big PDF, open several notebooks) reporting peak; the open/close-50 leak test (return to baseline within tolerance); the sustained 10,000-stroke test (stays under budget); OOM / low-memory-kill treated as an automatic fail.
**Out:** the tile LRU implementation itself ([SN-INK-022](ink.md#sn-ink-022)), PDF bitmap disposal ([SN-PERF-011](perf.md#sn-perf-011)), and the gate wiring ([SN-PERF-003](perf.md#sn-perf-003)).

#### Acceptance criteria
- [ ] Peak is under 300 MB on the Android-lowend reference during the scripted mixed session.
- [ ] Open/close 50 notebooks returns steady-state RSS to baseline within tolerance (no monotonic growth).
- [ ] Drawing 10,000 strokes keeps RSS under budget as the tile cache evicts off-screen tiles.
- [ ] An OOM or low-memory kill during the session is an automatic fail.
- [ ] The sampler reports PSS/RSS and the Dart heap separately.

#### Technical notes
tools/perf_harness memory sampler; adb shell dumpsys meminfo and dart:developer. The tile raster LRU defaults to <= 96 MB on 4 GB Android and evicts least-recently-visible tiles, re-rastering from vector strokes on demand ([SN-INK-022](ink.md#sn-ink-022); docs/architecture/rendering-and-performance.md section 3, section 6.2). Stream image/audio blobs from disk; never hold whole assets resident.

#### Security & privacy
Uncontrolled memory growth is a resource-exhaustion / DoS vector; caps plus eviction are the control (CWE-400, CWE-770, MASVS-CODE-4). The sampler logs numbers only, never note content (MASVS-PRIVACY-1). IDs: CWE-400, CWE-770, MASVS-CODE-4, MASVS-PRIVACY-1.

#### UX notes
A low-memory kill mid-note is the worst possible UX; the budget protects it on the low-end floor across all 17 looks and light+dark. No end-user chrome; the guarantee is invisible when it works.

#### Test plan
app/integration_test/memory_soak_test.dart (open/close 50, 10,000-stroke sustained, OOM = fail), tools/perf_harness/test/meminfo_parse_test.dart (PSS/RSS parsing, baseline-return math).

#### Dependencies
[SN-PERF-002](perf.md#sn-perf-002) (harness), [SN-INK-022](ink.md#sn-ink-022) (tiling and LRU cache).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-010

<a id="sn-perf-010"></a>

**Add the 1,000-page notebook open benchmark**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | perf, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-CORE-004](storage.md#sn-core-004), [SN-INK-022](ink.md#sn-ink-022), [SN-PERF-002](perf.md#sn-perf-002) |
| Security controls | `CWE-400`, `CWE-20`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
The budget is to open a 1,000-page notebook in under 1 s to interactive, and the store MUST NOT deserialize all pages eagerly (docs/platform/performance-budgets.md B7; docs/architecture/ink-engine.md section 6.3). This delivers a generated 1,000-page fixture notebook (mixed ink, text, and a few PDFs) and a benchmark timing open to first-page-interactive with lazy load of the rest, reusing drift/SQLite plus the content-addressed blob store. Instant open of a huge notebook is a headline lag-proof promise, so the benchmark asserts the lazy-materialisation contract, not just the wall time.

#### Scope
**In:** a deterministic fixture generator producing a 1,000-page notebook (mixed content); the benchmark timing open to first-page-interactive; an assertion that only the manifest plus the current page (and near neighbours) are materialised on open; the under-1 s gate on iPad and Android-tablet-stylus.
**Out:** the persistence layer ([SN-CORE-004](storage.md#sn-core-004)), the tiling implementation ([SN-INK-022](ink.md#sn-ink-022)), and the gate wiring ([SN-PERF-003](perf.md#sn-perf-003)).

#### Acceptance criteria
- [ ] Opening the 1,000-page fixture reaches first-page interactive in under 1 s on iPad and Android-tablet-stylus.
- [ ] A counter asserts only the manifest plus the current page (and near neighbours) are materialised on open, never all 1,000 pages.
- [ ] Scrolling to a far page lazily materialises it without loading the whole document.
- [ ] The fixture is generated deterministically and committed as a generator, not a giant binary blob.

#### Technical notes
fixture generator in tools/perf_harness/fixtures; the open path reads the .sanenote manifest plus the current page only (docs/architecture/file-format.md; docs/architecture/ink-engine.md section 6.3). Storage is drift/SQLite plus the content-addressed blob store ([SN-CORE-004](storage.md#sn-core-004)); pages materialise lazily via the tile model ([SN-INK-022](ink.md#sn-ink-022)). Emit results to tools/perf_harness/baselines for [SN-PERF-003](perf.md#sn-perf-003).

#### Security & privacy
The fixture holds synthetic content only (no real notes). The loader validates the manifest before use and caps resources so a hostile or oversized manifest fails closed rather than exhausting memory (CWE-400, CWE-20). Metrics only in logs (MASVS-PRIVACY-1). IDs: CWE-400, CWE-20, MASVS-PRIVACY-1.

#### UX notes
Instant open of a huge notebook must feel immediate across all 17 looks and light+dark (design/Sane Notes.dc.html Library and Editor). The first page is interactive before the rest loads, so the user can write immediately.

#### Test plan
app/integration_test/large_notebook_open_test.dart (under 1 s, lazy-materialise counter, far-page lazy load), tools/perf_harness/test/fixture_gen_test.dart (deterministic generation).

#### Dependencies
SN-CORE-004 (SQLite + blob store), [SN-INK-022](ink.md#sn-ink-022) (tiling/lazy pages), [SN-PERF-002](perf.md#sn-perf-002) (harness).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-011

<a id="sn-perf-011"></a>

**Add the 600-page PDF scroll benchmark fixture and the 60 fps gate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | perf, pdf, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-007](perf.md#sn-perf-007), [SN-PDF-003](pdf.md#sn-pdf-003) |
| Security controls | `CWE-400`, `CWE-409`, `CWE-20`, `MASVS-PRIVACY-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
Budget B8 requires a 600-page PDF to scroll at a sustained 60 fps with no page-load stall visible as a blank page during a normal-speed scroll (docs/platform/performance-budgets.md B8; docs/architecture/rendering-and-performance.md section 5). Students read textbooks inside Sane Notes and draw over them, so a stutter here is the incumbent failure this product exists to beat. This issue owns the harness side of B8: a deterministic 600-page fixture generator, the scripted fling-and-settle scroll workload, a blank-page detector, and the gate wiring into tools/perf_harness/baselines. The sane_pdf-side assertions ([SN-PDF-026](pdf.md#sn-pdf-026)) consume this same fixture and these same thresholds, so the numbers and the fixture live in exactly one place and cannot drift apart.

#### Scope
**In:** tools/perf_harness/fixtures/pdf_600 (a seeded generator producing a 600-page PDF with text, vector art and a few images); the scripted continuous-scroll and fling workload; frame-time capture reusing [SN-PERF-007](perf.md#sn-perf-007); a blank-page detector that flags any frame where a viewport page has no raster; peak-memory capture during the scroll; emission of the B8 result to tools/perf_harness/baselines/<device>.json.
**Out:** the PDF viewer, lazy rendering and tile cache implementations ([SN-PDF-003](pdf.md#sn-pdf-003), [SN-PDF-004](pdf.md#sn-pdf-004)), the sane_pdf integration assertions ([SN-PDF-026](pdf.md#sn-pdf-026)), and the gate workflow itself ([SN-PERF-003](perf.md#sn-perf-003)).

#### Acceptance criteria
- [ ] A 60-second scripted scroll (fling, settle, fling, high-zoom pinch) holds 60 fps on Android-lowend and iPad-Pro-ProMotion: p95 frame time <= 16.7 ms, zero frames > 16.7 ms beyond a documented one-frame tolerance at scroll start.
- [ ] Zero blank-page frames at normal scroll speed; a blank page visible for longer than one frame budget fails the run and names the page index.
- [ ] The two-resolution scheme is proven: a low-res preview is shown during the fling and replaced by full-res within 300 ms of the scroll settling.
- [ ] Peak memory during the scroll stays under the B9 300 MB ceiling on Android-lowend, and only viewport plus one page of bitmaps is resident (asserted by a resident-page counter).
- [ ] The fixture is generated deterministically from a seed and committed as a generator plus a hash, never as a large binary.
- [ ] Results are written to tools/perf_harness/baselines/<device>.json; an emulator run is labelled non-gating for fps.

#### Technical notes
Generator and workload in tools/perf_harness (fixtures + workloads); frame extraction from [SN-PERF-007](perf.md#sn-perf-007); replay/driver plumbing from [SN-PERF-005](perf.md#sn-perf-005). Rendering goes through sane_pdf on pdfrx/PDFium ([SN-PDF-002](pdf.md#sn-pdf-002), [SN-PDF-003](pdf.md#sn-pdf-003)) with the LRU tile cache ([SN-PDF-004](pdf.md#sn-pdf-004)). The strategy being measured is lazy page rendering, tile caching for zoom, the two-resolution preview, background-isolate rasterisation and disk-cached thumbnails (docs/architecture/rendering-and-performance.md section 5; ADR-0014). Budget numbers are read from the registry ([SN-PERF-018](perf.md#sn-perf-018)), never hardcoded. PDF rasterisation must stay off the UI isolate (docs/architecture/overview.md section 6).

#### Security & privacy
The fixture is synthetic and generated; no real user PDF is ever committed or uploaded to CI (MASVS-PRIVACY-1). The benchmark exercises the hardened import path, so it keeps the resource caps that defend against decompression bombs and pathological page trees (CWE-409, CWE-400) and validates that the fixture path is confined to the harness directory (CWE-20). Timings and page indices only in logs and artifacts; never page text or note content (CWE-532).

#### UX notes
PDF study is the core student loop: a 600-page textbook must scroll like a native reader in every one of the 17 looks and in light and dark (design/Sane Notes.dc.html Editor screen, PDF-backed page kind; docs/design/screens-and-flows.md section 7.2). PDFs keep their original colours in dark mode, so the low-res preview must use the token surface colour and never flash white. The benchmark also asserts the page rail/scrubber stays responsive during the scroll so its 44 pt targets remain usable (docs/design/screens-and-flows.md section 7.7).

#### Test plan
app/integration_test/pdf_scroll_test.dart (60 s scroll, fps, blank-page detector, resident-page counter); tools/perf_harness/test/pdf_fixture_test.dart (deterministic generation, page count, size cap); tools/perf_harness/test/blank_frame_detect_test.dart (detector math over a fixture timeline).

#### Dependencies
[SN-PERF-002](perf.md#sn-perf-002) (harness), [SN-PERF-007](perf.md#sn-perf-007) (frame extraction), [SN-PDF-003](pdf.md#sn-pdf-003) (scroll viewer). Coordinates with [SN-PDF-026](pdf.md#sn-pdf-026), [SN-PDF-004](pdf.md#sn-pdf-004), [SN-PERF-018](perf.md#sn-perf-018).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-012

<a id="sn-perf-012"></a>

**Add the 5,000-stroke dense-page stress benchmark**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | perf, ink, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-005](perf.md#sn-perf-005), [SN-PERF-007](perf.md#sn-perf-007), [SN-INK-022](ink.md#sn-ink-022) |
| Security controls | `CWE-400`, `CWE-770`, `MASVS-PRIVACY-1`, `MASVS-STORAGE-1` |
| Extra labels | agent-ready |

#### Context
A real lecture page is not empty: after ninety minutes of dense note-taking a single page holds thousands of strokes, and that is exactly where naive ink engines collapse because every dried stroke is redrawn each frame. The architecture answers this with tiled raster caching of committed ink and an R-tree for spatial queries (docs/architecture/ink-engine.md sections 6 and 7), and this benchmark is what proves the answer holds. It generates a canonical 5,000-stroke page (the same shape sane_core uses for its snapshot benchmark, [SN-CORE-027](perf.md#sn-core-027)) and measures the operations that degrade with stroke count: drawing one more stroke, panning and zooming, hit-testing, vector erase, and page open. Without this gate, dense-page regressions would only surface in a user's exam-week notebook.

#### Scope
**In:** a seeded 5,000-stroke page fixture (mixed handwriting, highlighter and sketch strokes with realistic bounding boxes); a workload that draws stroke 5,001 while the page is dense; pan, zoom-bucket-change and fling measurements; hit-test and vector-erase query timing; resident tile-memory capture; page open timing; emission of results to tools/perf_harness/baselines.
**Out:** the tiling and LRU implementation ([SN-INK-022](ink.md#sn-ink-022)), the R-tree and hit-testing implementation ([SN-INK-024](ink.md#sn-ink-024), [SN-INK-025](ink.md#sn-ink-025)), the model-layer snapshot benchmark ([SN-CORE-027](perf.md#sn-core-027)), and the gate workflow ([SN-PERF-003](perf.md#sn-perf-003)).

#### Acceptance criteria
- [ ] Drawing stroke 5,001 on the dense page produces zero frames > 16.7 ms and meets the same latency proxy number as an empty page within a documented tolerance (dense pages must not cost latency).
- [ ] Pan and fling across the dense page hold 60 fps; a zoom-bucket change re-rasters affected tiles without a frame > 16.7 ms (re-raster is scheduled, not synchronous).
- [ ] Committed tiles do not repaint on a pointer move while drawing on the dense page (repaint-scope counter from [SN-PERF-021](perf.md#sn-perf-021) is zero for the committed layer).
- [ ] Hit-test (tap) and vector-erase candidate queries return at p95 < 2 ms on the Android-lowend reference, proving the R-tree broad phase is doing its job.
- [ ] Resident tile rasters stay within the per-device tile budget (default <= 96 MB on 4 GB Android) with least-recently-visible eviction; total process memory stays under B9.
- [ ] Opening the dense page from cold storage reaches interactive in < 1 s.

#### Technical notes
Fixture generator in tools/perf_harness/fixtures/dense_page; strokes are produced from the corpus primitives of [SN-PERF-005](perf.md#sn-perf-005) so geometry is realistic rather than random noise. Measurement reuses [SN-PERF-007](perf.md#sn-perf-007) timeline extraction and the [SN-PERF-002](perf.md#sn-perf-002) latency proxy. The behaviour under test is the tile model and zoom buckets (docs/architecture/ink-engine.md section 6.1), the LRU budget (section 6.2), and broad-phase/narrow-phase hit-testing (section 7). Budget values come from the registry ([SN-PERF-018](perf.md#sn-perf-018)). Finished-stroke tessellation may move to a one-shot isolate under load but the wet stroke stays on the UI isolate (docs/architecture/overview.md section 6).

#### Security & privacy
Unbounded stroke counts and unbounded tile caches are resource-exhaustion vectors, so this benchmark is also the control test for the caps: the tile LRU must evict rather than grow, and page load must stream rather than materialise everything (CWE-400, CWE-770). The fixture contains synthetic coordinates only, never captured user ink, and the harness logs stroke counts and timings but never coordinates or note content (MASVS-PRIVACY-1, MASVS-STORAGE-1).

#### UX notes
The promise is that page 40 of a physics lecture feels exactly like page 1, in all 17 looks and in light and dark (design/Sane Notes.dc.html Editor screen; docs/design/screens-and-flows.md section 7.2). Dark-mode ink inversion ([SN-INK-030](ink.md#sn-ink-030)) must not force a full-page re-raster on theme switch beyond the documented one-time cost, which this benchmark records. Developer-facing output only; no end-user chrome.

#### Test plan
app/integration_test/dense_page_test.dart (draw-on-dense-page latency and jank, pan/zoom fps, page open); packages/sane_ink/test/index/rtree_query_bench_test.dart (hit-test/erase query timing over the fixture); tools/perf_harness/test/dense_fixture_test.dart (deterministic generation, stroke count, bbox spread).

#### Dependencies
[SN-PERF-005](perf.md#sn-perf-005) (corpus), [SN-PERF-007](perf.md#sn-perf-007) (frame extraction), [SN-INK-022](ink.md#sn-ink-022) (tiling and LRU). Coordinates with [SN-INK-024](ink.md#sn-ink-024), [SN-INK-025](ink.md#sn-ink-025), [SN-CORE-027](perf.md#sn-core-027), [SN-PERF-021](perf.md#sn-perf-021).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-013

<a id="sn-perf-013"></a>

**Build the battery and energy protocol for the 2-hour writing soak**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, android-phone, ios-phone |
| Areas | perf, compat |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-005](perf.md#sn-perf-005) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-532`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, needs-credentials |

#### Context
Budget B10 caps a two-hour continuous writing session at 12 percent battery drain on an iPad Pro, measured at fixed brightness with background noise removed (docs/platform/performance-budgets.md B10 and section 2; docs/architecture/rendering-and-performance.md section 2.4). Battery is the budget users feel last and complain about loudest: a note app that eats a lecture hall's worth of charge during one lecture is unusable regardless of its frame times. The measurement is too slow for per-commit CI, so it runs nightly or weekly and per release candidate, which means the protocol must be scripted, repeatable and self-documenting rather than a human with a stopwatch. This issue delivers that protocol and the sampling harness; the per-surface validation runs that consume it live in [SN-IPAD-025](perf.md#sn-ipad-025) and [SN-AND-027](perf.md#sn-and-027).

#### Scope
**In:** a scripted two-hour writing driver that replays the [SN-PERF-005](perf.md#sn-perf-005) corpus at a realistic human cadence (write, pause, turn page, re-read) without wall-clock drift; the documented lab preconditions (fixed brightness, airplane mode or a documented network state, no other foreground apps, battery start range); battery sampling on iOS (UIDevice.batteryLevel polling plus an Instruments Energy Log run) and Android (BatteryManager plus dumpsys batterystats deltas); per-hour drain reporting with the thermal-state timeline from [SN-PERF-015](perf.md#sn-perf-015); results recorded under tools/device_lab/results/<device>-<os>.md; the nightly/weekly and release-candidate cadences.
**Out:** the per-device pass/fail runs ([SN-IPAD-025](perf.md#sn-ipad-025), [SN-AND-027](perf.md#sn-and-027)), the thermal ladder itself ([SN-PERF-015](perf.md#sn-perf-015), [SN-PERF-023](perf.md#sn-perf-023)), and any in-app battery UI.

#### Acceptance criteria
- [ ] The driver replays two hours of writing deterministically and reports elapsed wall time, strokes drawn and pages turned, so two runs are comparable.
- [ ] Battery level is sampled at least every 60 s on both platforms; the report gives total drain percent, per-hour drain, and drain per 1,000 strokes.
- [ ] The iPad Pro run gates at <= 12 percent drain over two hours; a run that started outside the documented battery range or brightness is rejected as invalid rather than recorded as a pass.
- [ ] The thermal-state timeline is attached, and a run that throttled is annotated as throttled-but-passing instead of silently passing (docs/architecture/rendering-and-performance.md section 2.4).
- [ ] The known drain levers are asserted as active during the run: only the wet stroke repaints, prediction overdraw is capped, sync is coalesced, and adaptive refresh is respected when idle (docs/platform/performance-budgets.md section 5.6).
- [ ] The protocol is documented well enough for a new engineer to reproduce the run from tools/device_lab/README alone.

#### Technical notes
Driver and parsers in tools/perf_harness; device preconditions and results templates in tools/device_lab ([SN-PERF-004](perf.md#sn-perf-004)). iOS sampling uses UIDevice.isBatteryMonitoringEnabled and batteryLevel, corroborated by an Instruments Energy Log export; Android uses BatteryManager.BATTERY_PROPERTY_CAPACITY and dumpsys batterystats deltas. Physical devices, an Apple developer machine and lab hardware are maintainer-supplied, so the run is human-supervised and the issue carries needs-credentials. Budget values are read from the registry ([SN-PERF-018](perf.md#sn-perf-018)). Background recording, sync and indexing must be in a documented state for the run so the number is attributable.

#### Security & privacy
Energy artifacts contain device model, OS build and timings only; never note content, coordinates or account identifiers (MASVS-PRIVACY-1, CWE-532). Battery APIs are a known fingerprinting surface, so sampling stays inside the profile/debug harness and is never compiled into or reported from a release build (MASVS-PLATFORM-1). Instruments traces and screen recordings from the lab are treated as sensitive lab material and are not committed to the repository.

#### UX notes
Battery life is invisible when it works and fatal when it does not; the protocol protects the promise across all 17 looks and light and dark, including the look-dependent costs (wallpaper blur and frosted panels are the most expensive appearance settings, docs/design/screens-and-flows.md section 12 Appearance). The run must exercise a default look and the most expensive look so the delta is known. Developer- and release-facing only; no end-user chrome.

#### Test plan
tools/perf_harness/test/battery_parse_test.dart (level sampling, drain math, per-hour and per-1,000-stroke derivation, invalid-precondition rejection); tools/perf_harness/test/soak_driver_test.dart (cadence determinism, no wall-clock drift); the physical two-hour run is a supervised runbook step recorded under tools/device_lab/results.

#### Dependencies
[SN-PERF-004](perf.md#sn-perf-004) (device configs and results template), [SN-PERF-005](perf.md#sn-perf-005) (corpus). Coordinates with [SN-PERF-015](perf.md#sn-perf-015), [SN-IPAD-025](perf.md#sn-ipad-025), [SN-AND-027](perf.md#sn-and-027), [SN-PERF-024](perf.md#sn-perf-024).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-014

<a id="sn-perf-014"></a>

**Measure and gate frame pacing at 120 Hz and adaptive refresh**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, android-tablet, android-phone |
| Areas | perf, ink |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-INK-023](ink.md#sn-ink-023), [SN-PERF-007](perf.md#sn-perf-007) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
Budget B4 requires 120 fps where the display allows and a 60 fps floor everywhere, and the per-frame budget math is 8.3 ms at 120 Hz versus 16.7 ms at 60 Hz (docs/platform/performance-budgets.md B4/B5; docs/architecture/rendering-and-performance.md section 1.2). The budgets doc explicitly flags an ambiguity to resolve in the harness: decision 7 states no frame > 16.7 ms as the absolute ceiling, while a 120 Hz panel additionally SHOULD hit 8.3 ms. This issue resolves it in code: 16.7 ms is a hard fail on every device, and on a 120 Hz gate device a frame over 8.3 ms is a separate, reported soft-fail that blocks only when it exceeds a documented rate. It also gates the other half of frame pacing, which is not asking for 120 Hz when nothing is moving, because holding ProMotion at 120 Hz while idle is a direct attack on battery budget B10. The draw-path implementation lives in [SN-INK-023](ink.md#sn-ink-023); this is the measurement and the gate.

#### Scope
**In:** fps distribution reporting bucketed by the display refresh rate read from the device config ([SN-PERF-004](perf.md#sn-perf-004)); the 120 fps assertion on ProMotion and high-refresh Android during the writing workload; the dual 16.7 ms hard ceiling plus 8.3 ms soft target at 120 Hz; an idle-refresh assertion that the app stops requesting the high frame-rate range after a documented idle period; a 60 Hz panel run proving the floor holds and no high-refresh range is requested; the web variant measured with requestAnimationFrame deltas and long-animation-frame entries.
**Out:** requesting the frame-rate range on the draw path ([SN-INK-023](ink.md#sn-ink-023)), the native surfaces ([SN-INK-006](ink.md#sn-ink-006), [SN-INK-007](ink.md#sn-ink-007)), and the gate workflow ([SN-PERF-003](perf.md#sn-perf-003)).

#### Acceptance criteria
- [ ] During the scripted writing workload on iPad-Pro-ProMotion the app sustains >= 120 fps with p99 frame time <= 8.3 ms; a breach of 8.3 ms is reported as a soft-fail and blocks when it exceeds the documented rate.
- [ ] Zero frames > 16.7 ms on every gate device; this remains a hard fail independent of the panel rate.
- [ ] On a 60 Hz gate device the 60 fps floor holds and the app does not request a high frame-rate range.
- [ ] After a documented idle period (default 2 s with no pointer and no animation) the measured presentation cadence drops off the 120 Hz range, proving adaptive refresh is respected.
- [ ] The report states, per run, the panel rate, the requested frame-rate range and the achieved distribution, so a throttled 120 Hz to 60 Hz transition is visible rather than silent.
- [ ] The resolved 16.7 ms hard / 8.3 ms soft rule is written back into docs/platform/performance-budgets.md B5 in the same PR, removing the (verify) marker.

#### Technical notes
Measurement via SchedulerBinding.addTimingsCallback and FrameTiming (vsyncOverhead, buildDuration, rasterDuration, totalSpan) plus the display refresh rate from the device config; the requested range comes from the Tier A surface (UIUpdateLink preferredFrameRateRange on Apple, high-refresh request on Android) exposed through [SN-INK-023](ink.md#sn-ink-023). Extraction reuses [SN-PERF-007](perf.md#sn-perf-007); thresholds come from the registry ([SN-PERF-018](perf.md#sn-perf-018)). Emulators and simulators are never an fps gate (docs/platform/performance-budgets.md section 3).

#### Security & privacy
Metrics only: frame timings, panel rate and requested range, never ink coordinates or note content (MASVS-PRIVACY-1). Holding a high refresh rate while idle is a battery-drain and thermal resource-exhaustion issue in its own right, and the idle assertion is its control (CWE-400). Instrumentation is profile-mode only and compiled out of release builds.

#### UX notes
120 Hz is the difference between ink that feels attached to the pen and ink that feels printed a moment later; it must hold in every one of the 17 looks and in light and dark, including looks with wallpaper blur and frosted panels (docs/design/screens-and-flows.md section 12 Appearance; design/Sane Notes.dc.html Editor screen). Frame pacing is not animation: Reduce Motion must never reduce the ink path's refresh rate, only decorative motion ([SN-A11Y-006](a11y.md#sn-a11y-006)). Developer-facing output; no end-user chrome.

#### Test plan
app/integration_test/frame_pacing_test.dart (120 fps on ProMotion, 60 fps floor, idle drop-off, requested-range reporting); tools/perf_harness/test/frame_pacing_parse_test.dart (bucketing by panel rate, hard/soft threshold logic over fixture timelines).

#### Dependencies
[SN-INK-023](ink.md#sn-ink-023) (draw-path refresh handling), [SN-PERF-007](perf.md#sn-perf-007) (timeline extraction). Coordinates with [SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-013](perf.md#sn-perf-013), [SN-PERF-018](perf.md#sn-perf-018).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-015

<a id="sn-perf-015"></a>

**Detect thermal throttling and drive the adaptive quality ladder**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ipad, android-tablet, android-phone, ios-phone |
| Areas | perf, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-023](perf.md#sn-perf-023), [SN-PERF-007](perf.md#sn-perf-007) |
| Security controls | `CWE-400`, `MASVS-PLATFORM-1`, `MASVS-PRIVACY-1`, `CWE-532` |
| Extra labels | agent-ready |

#### Context
A long lecture on a thin tablet ends with a warm device, and a warm device throttles: ProMotion drops from 120 Hz to 60 Hz mid-session and sustained GPU work gets slower (docs/architecture/rendering-and-performance.md section 2.4). The budgets doc is explicit that a throttled device which still hits 60 fps passes the frame gate but must be noted, which means the app has to know it is throttled, react before frames are dropped, and record the fact in perf results. This issue adds the thermal-state probe and the policy that maps thermal pressure onto the adaptive quality ladder from [SN-PERF-023](perf.md#sn-perf-023), so the app sheds optional work (background indexing, thumbnail generation, grain shaders, prediction overdraw) instead of shedding frames. Wet-ink latency is never traded away: degrading the pen is the one thing this product may not do.

#### Scope
**In:** a thermal-state probe behind a capability interface (nominal, fair, serious, critical, unknown); the iOS and Android platform bindings; the mapping from thermal state to ladder steps with hysteresis; recording the thermal timeline into the perf result JSON so a throttled run is annotated; a debug override to force a state for tests; graceful no-op on platforms without a thermal API (web).
**Out:** the ladder mechanism and what each step changes ([SN-PERF-023](perf.md#sn-perf-023)), the battery protocol ([SN-PERF-013](perf.md#sn-perf-013)), and the frame-pacing gate ([SN-PERF-014](perf.md#sn-perf-014)).

#### Acceptance criteria
- [ ] Thermal state is exposed as an immutable value through a Riverpod provider with an explicit unknown state where no API exists; no mutable global singleton.
- [ ] iOS reads ProcessInfo.thermalState and observes thermalStateDidChangeNotification; Android reads PowerManager.getCurrentThermalStatus with addThermalStatusListener (API 29+) and getThermalHeadroom where available (API 30+); web reports unknown and the app behaves exactly as at nominal.
- [ ] Serious drops the quality ladder one step, critical drops two; recovery requires 60 s at a cooler state (hysteresis), and a fake-clock test proves no oscillation when the state flaps.
- [ ] Wet-ink latency, stroke geometry and persisted data are identical at every thermal state; a golden test proves the committed stroke output is unchanged.
- [ ] The perf result JSON carries the thermal timeline, and a run that entered serious or critical is annotated throttled in the report rather than silently passing.
- [ ] No modal, banner or toast fires on a thermal transition; the state appears only as a read-only diagnostics line in Settings.

#### Technical notes
The docs do not assign a home for device-state platform calls (plugins/ lists sane_ink_surface, sane_stylus, sane_scribble, sane_secure_store, sane_cloud_drive, sane_ml_native, sane_pdfkit), so the decision taken here is a thin app-level MethodChannel named sane/device_state registered in the iOS and Android runners under app/, with a pure-Dart capability interface so tests fake it; if device-state needs grow beyond thermal status this is promoted to a federated plugin with an ADR (docs/architecture/overview.md section 5, ADR-0012). Listener registration happens after first interactive frame so cold start B6 is untouched, and the probe is polled at most every 5 s. Ladder application goes through the service in [SN-PERF-023](perf.md#sn-perf-023).

#### Security & privacy
Thermal status and thermal headroom are a documented device-fingerprinting and side-channel surface, so the value stays on device, is never sent anywhere, and is never included in opt-in telemetry beyond a coarse bucket (ADR-0011; MASVS-PLATFORM-1, MASVS-PRIVACY-1). Logs carry the state enum only, never timestamps correlated with note activity (CWE-532). Ignoring thermal pressure until frames drop is itself a resource-exhaustion path on low-end hardware, and this control is the mitigation (CWE-400).

#### UX notes
The correct user experience of throttling is that nothing appears to happen: ink stays instant, and only invisible work is deferred. Nothing in the 17 looks or in light or dark may visibly change when a step is taken, except the documented grain-texture fallback ([SN-PERF-023](perf.md#sn-perf-023)); no colour, spacing or type token changes. The Settings diagnostics line follows the SaneSettingRow pattern with a Semantics label and 44 pt target (docs/design/screens-and-flows.md section 12; docs/design/accessibility.md).

#### Test plan
app/test/perf/thermal_policy_test.dart (state mapping, hysteresis with a fake clock, no oscillation); app/test/perf/thermal_channel_test.dart (channel contract, unknown-state fallback); app/integration_test/thermal_degrade_test.dart (forced state via the debug override: ladder step applied, latency unchanged); golden test asserting identical committed-stroke output at every state.

#### Dependencies
[SN-PERF-023](perf.md#sn-perf-023) (quality ladder), [SN-PERF-007](perf.md#sn-perf-007) (frame measurement). Coordinates with [SN-PERF-013](perf.md#sn-perf-013), [SN-PERF-024](perf.md#sn-perf-024), [SN-AND-027](perf.md#sn-and-027).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-016

<a id="sn-perf-016"></a>

**Enforce draw-path isolate discipline (no hop, no blocking I/O, no logging)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | perf, ink, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-FND-008](devx.md#sn-fnd-008), [SN-INK-005](ink.md#sn-ink-005), [SN-PERF-007](perf.md#sn-perf-007) |
| Security controls | `CWE-532`, `MASVS-PRIVACY-1`, `MASVS-STORAGE-2`, `CWE-400` |
| Extra labels | agent-ready |

#### Context
The threading rule is absolute: the UI isolate does input and paint, and persistence, encryption, network, PDF raster, ML and indexing happen elsewhere; a message to another isolate on a PointerMoveEvent is a bug, not a style preference (docs/architecture/overview.md section 6; CLAUDE.md section 8; docs/architecture/rendering-and-performance.md section 6 step 6). Rules that live only in prose rot, and this one rots invisibly because a single await on a database call inside a pointer handler costs milliseconds that no unit test notices. This issue turns the rule into two enforcement layers: a static check that fails the build when draw-path code reaches for an isolate, a blocking API or the logger, and a profile-mode runtime assertion that counts cross-isolate messages and log emissions while a stroke is replayed. It also covers the related hot-path bans: no print(), and nothing logged from draw code in profile or release.

#### Scope
**In:** an allowlisted draw-path file set (packages/sane_ink/lib/src/capture/**, packages/sane_render wet-layer painting, the app editor pointer handlers) declared in one config; a static check extending tools/scripts/arch_check that flags Isolate.run, compute, SendPort, dart:io, drift/SQL, http and SaneLog calls in those files; a profile-mode counter asserting zero cross-isolate messages and zero log records during a replayed stroke; the print() ban re-asserted on the draw path; a clear failure message naming the file, symbol and the rule it breaks.
**Out:** the isolate implementations themselves (storage, sync, index workers in their own areas), per-sample allocation checks ([SN-PERF-021](perf.md#sn-perf-021)), and the general arch-lint DAG rules ([SN-FND-008](devx.md#sn-fnd-008)).

#### Acceptance criteria
- [ ] A fixture file that awaits a database call inside a pointer handler fails the static check with a message naming the file, the symbol and docs/architecture/overview.md section 6.
- [ ] A fixture that sends a message to another isolate from the draw path fails; committing a finished stroke to the storage isolate on pointer-up passes (the rule bans the hot path, not persistence).
- [ ] A profile-mode replay of a 300-sample stroke records zero cross-isolate messages and zero SaneLog records from draw-path code.
- [ ] print() anywhere in the draw-path set fails, consistent with the repo-wide ban (CLAUDE.md section 6).
- [ ] The draw-path file set lives in one config file that a reviewer can read, and adding a file to it requires an explicit PR change (no implicit widening).
- [ ] The check runs in the same CI job as the perf gate and adds less than 30 s to the job.

#### Technical notes
Extend tools/scripts/arch_check ([SN-FND-008](devx.md#sn-fnd-008)) with a draw-path rule set driven by a config (for example tools/scripts/arch_check/draw_path.yaml) using the analyzer package to resolve imports and invocations rather than regex where possible. The runtime counter hooks the same instrumentation as [SN-INK-031](ink.md#sn-ink-031) and runs under the replay driver of [SN-PERF-005](perf.md#sn-perf-005); it is compiled out of release via kProfileMode guards. Tessellation of finished strokes may move to a one-shot isolate under load, and that exemption is expressed in the config, not as a silent pass (docs/architecture/ink-engine.md section 5.3).

#### Security & privacy
This check is also the enforcement point for two standing security rules: no PII or note content in logs (CLAUDE.md section 7 rule 3; CWE-532, MASVS-PRIVACY-1, MASVS-STORAGE-2) and no unexpected work on the input path that could block the UI and be used to starve the app (CWE-400). Because it bans logging outright in draw code, it removes the possibility of ink coordinates or object ids leaking into a diagnostics bundle.

#### UX notes
The entire user-visible payoff is ink that never stutters mid-word, in every one of the 17 looks and in light and dark (design/Sane Notes.dc.html Editor screen). The failure message is the developer-facing UX here and must be actionable: file, symbol, rule, doc anchor, and the suggested fix (move the work to the storage/sync/index isolate or to pointer-up). No end-user chrome.

#### Test plan
tools/scripts/arch_check/test/draw_path_rule_test.dart (positive and negative fixtures: isolate hop, blocking I/O, logging, print, allowed pointer-up commit); app/test/perf/draw_path_isolate_counter_test.dart (zero messages and zero logs over a replayed stroke); a CI job-time assertion that the check stays under 30 s.

#### Dependencies
[SN-FND-008](devx.md#sn-fnd-008) (arch-lint), [SN-INK-005](ink.md#sn-ink-005) (wet renderer), [SN-PERF-007](perf.md#sn-perf-007) (perf job). Coordinates with [SN-INK-031](ink.md#sn-ink-031), [SN-PERF-005](perf.md#sn-perf-005), [SN-PERF-021](perf.md#sn-perf-021).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-017

<a id="sn-perf-017"></a>

**Warm up and reuse shaders, paints and paths on the draw path**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | perf, ink, brushes |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005), [SN-BRS-007](brushes.md#sn-brs-007), [SN-PERF-007](perf.md#sn-perf-007) |
| Security controls | `CWE-400`, `CWE-770`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Shader-compilation jank is the classic first-stroke artifact in Flutter ink apps: the first time a stroke effect is drawn, the shader compiles and the frame blows the budget. Impeller removes it on iOS and on Android API 29+ by compiling shaders offline, but the web runs CanvasKit or skwasm with no Impeller, and an unexpected Android Skia GL fallback reintroduces it (docs/architecture/rendering-and-performance.md sections 1.3 and 6 step 3). The same section adds the standing rule that shaders, paints and paths are precached and reused across frames and never allocated per stroke (section 7 and section 3). This issue implements both halves: a warm-up pass that primes every shipped brush's shader and grain texture after the first interactive frame, and a reuse layer so the draw path allocates nothing per stroke.

#### Scope
**In:** a BrushPaintCache in sane_render that owns one FragmentProgram/FragmentShader, Paint and reusable Path per active pen preset, keyed by preset id and revision; a warm-up pass that primes the stock pen set ([SN-BRS-008](brushes.md#sn-brs-008)) and the grain/shape ImageShaders ([SN-BRS-007](brushes.md#sn-brs-007)) on a post-first-frame scheduler callback; a capability check so a missing FragmentProgram falls back to plain fill; cache eviction bounded by preset count; first-stroke-after-cold-start jank assertions on mobile and web.
**Out:** brush parameter and texture definitions ([SN-BRS-002](brushes.md#sn-brs-002), [SN-BRS-007](brushes.md#sn-brs-007)), the wet renderer itself ([SN-INK-005](ink.md#sn-ink-005)), the renderer-active check ([SN-PERF-022](perf.md#sn-perf-022)), and cold-start budget measurement ([SN-PERF-008](perf.md#sn-perf-008)).

#### Acceptance criteria
- [ ] Selecting a stock pen and drawing the first stroke after a cold start produces no frame > 16.7 ms on every Tier 1 device, including the web Chrome-desktop reference.
- [ ] A counter proves zero FragmentShader, Paint or Path allocations per pointer sample and per stroke in the steady state; objects are created once per preset revision and reused.
- [ ] The warm-up runs after the first interactive frame and measurably does not regress cold start (B6 unchanged within tolerance, verified by [SN-PERF-008](perf.md#sn-perf-008)).
- [ ] Where FragmentProgram is unavailable (web fallback path, older browsers) the plain-fill fallback renders and the app does not throw; a golden test compares fallback and shader output within the documented tolerance.
- [ ] The cache is bounded: the number of resident shader/paint objects is capped by the number of loaded presets and is released on notebook close (no unbounded growth across sessions).
- [ ] Changing a pen preset invalidates exactly that preset's cache entry, not the whole cache.

#### Technical notes
Implementation in packages/sane_render (paint cache) with brush data from packages/sane_brushes; warm-up is scheduled via SchedulerBinding.instance.addPostFrameCallback on the first interactive frame so it cannot sit in front of first ink (docs/architecture/rendering-and-performance.md section 4). Textures are content-addressed blobs referenced by hash and precached once (docs/architecture/ink-engine.md section 4.4). Blend modes map to dart:ui BlendMode on Tier B, and shader use stays behind a capability check with a plain-fill fallback (ink-engine section 4.4; ADR-0009). Measurement uses [SN-PERF-007](perf.md#sn-perf-007) plus the triage classifier ([SN-PERF-020](perf.md#sn-perf-020)) to distinguish raster-thread compile stalls from UI-thread work.

#### Security & privacy
Per-stroke allocation of shaders and textures is an unbounded-resource path that shows up as GC pauses and, on low-end devices, as memory pressure and kills; the cap and reuse rules are the control (CWE-400, CWE-770). Grain and shape textures are content-addressed blobs whose hashes are verified before use, so a corrupted or substituted texture fails closed rather than being drawn. The warm-up logs counts and durations only, never note content or texture bytes (MASVS-PRIVACY-1).

#### UX notes
Every pen must feel identical on its first stroke and its thousandth, in all 17 looks and in light and dark, and the warm-up must cover the looks' ink display mapping including dark-mode inversion ([SN-INK-030](ink.md#sn-ink-030); docs/design/pen-and-brush-spec.md). Golden tests per look guard against a perf fix silently changing how strokes look (docs/architecture/rendering-and-performance.md section 2.2). Warm-up must never delay the first interactive frame, so the user can write before the cache is primed; the first stroke drawn during warm-up is still rendered correctly via the fallback path.

#### Test plan
app/integration_test/shader_warmup_test.dart (first stroke after cold start on each stock pen: no frame > 16.7 ms); packages/sane_render/test/brush_paint_cache_test.dart (one object per preset revision, invalidation, bounded size, release on close); packages/sane_render/test/golden/brush_fallback_golden_test.dart (shader versus plain-fill tolerance, across looks and light/dark).

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet renderer), [SN-BRS-007](brushes.md#sn-brs-007) (texture pipeline), [SN-PERF-007](perf.md#sn-perf-007) (frame measurement). Coordinates with [SN-BRS-008](brushes.md#sn-brs-008), [SN-PERF-008](perf.md#sn-perf-008), [SN-PERF-022](perf.md#sn-perf-022).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-018

<a id="sn-perf-018"></a>

**Define the machine-readable performance budget registry (B1-B10 + web bundle)**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | perf, ci-cd, qa |
| Size | S |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A05`, `CWE-1104` |
| Extra labels | agent-ready, good first issue |

#### Context
The decision-7 budgets are quoted in at least five places today: CLAUDE.md section 2, docs/platform/performance-budgets.md section 1, docs/architecture/rendering-and-performance.md section 1.1, docs/platform/compatibility-matrix.md section 7 and each surface doc. Several independent gates will consume them (the perf gate [SN-PERF-003](perf.md#sn-perf-003), the web bundle and cold-start gate [SN-WEB-003](perf.md#sn-web-003), the Lighthouse and web-ink gate [SN-WEB-024](perf.md#sn-web-024), the PDF perf tests [SN-PDF-026](pdf.md#sn-pdf-026), the search budgets [SN-SRCH-016](search.md#sn-srch-016)). If each hardcodes its own number, one of them will quietly drift and a budget will be enforced at the wrong value forever. This issue makes the budgets data: one machine-readable registry that every gate reads, plus a CI check that fails when the registry and the budgets document disagree. It is small, self-contained and unblocks every later gate.

#### Scope
**In:** tools/perf_harness/budgets/budgets.json holding B1-B10 plus the web initial-transfer (bundle) budget; per entry an id, human name, target, unit, statistic (p95, p99, peak, median), the device slots it gates, cadence (per-commit, nightly, release-candidate), gating flag, and the source doc anchor; a typed Dart loader in tools/perf_harness; a schema test; a docs-drift check comparing the registry to the table in docs/platform/performance-budgets.md section 1; a short README explaining how to change a budget.
**Out:** the gate logic that applies the budgets ([SN-PERF-003](perf.md#sn-perf-003)), the measurements themselves, and per-device baselines (which record measured values, not targets).

#### Acceptance criteria
- [ ] Every budget B1-B10 from docs/platform/performance-budgets.md section 1 plus the web bundle budget exists in the registry with target, unit, statistic, device slots, cadence, gating flag and doc anchor.
- [ ] A typed loader exposes the registry to Dart callers and fails loudly on an unknown budget id rather than returning null.
- [ ] A schema test rejects an entry missing statistic, cadence or source anchor, and rejects a target that is not a number with a unit.
- [ ] A drift check parses the budgets table in docs/platform/performance-budgets.md and fails CI when a target differs from the registry, so a doc edit and a gate edit must happen in the same PR.
- [ ] A grep-style test asserts no other file under tools/ or app/ hardcodes a budget literal (the documented allowlist is the registry and the doc).
- [ ] The README states plainly that loosening a budget is an explicit, reviewed change and never a silent one (docs/architecture/rendering-and-performance.md section 8).

#### Technical notes
Registry and loader live in tools/perf_harness/budgets; consumers read it rather than embedding literals: [SN-PERF-003](perf.md#sn-perf-003) (gate), [SN-PERF-011](perf.md#sn-perf-011), [SN-PERF-012](perf.md#sn-perf-012), [SN-PERF-014](perf.md#sn-perf-014), [SN-WEB-003](perf.md#sn-web-003), [SN-WEB-024](perf.md#sn-web-024), [SN-PDF-026](pdf.md#sn-pdf-026), [SN-SRCH-016](search.md#sn-srch-016). Distributions matter, so the statistic field is mandatory and the gates must use p95/p99 for latency and frame time and peak for memory, never an average (docs/platform/performance-budgets.md section 3). Cadence encodes that B10 (battery) and the camera ground truth are release-candidate only, while B1-B7 run per commit. Pure Dart with no package:flutter dependency so it runs headless in CI.

#### Security & privacy
The registry holds targets only; it contains no secrets, no device identifiers and no user data (MASVS-PRIVACY-1). Because it is the single input to release-blocking gates, it is a supply-chain-relevant file: it lives in the repo under review and CODEOWNERS, never fetched at runtime from a network location, and changes are visible in the diff (OWASP-A05, CWE-1104). A gate that silently reads a remote budget would be a way to disable a release gate without review, which this design forecloses.

#### UX notes
Developer- and release-facing; no end-user chrome. The registry is the contract behind the lag-proof feel that every one of the 17 looks and both light and dark share (design/Sane Notes.dc.html Editor screen). Its human name and unit fields are what appear in gate failure messages and on the trend dashboard ([SN-PERF-019](perf.md#sn-perf-019)), so they must read as sentences a tired engineer can act on at 2 a.m., not as opaque ids.

#### Test plan
tools/perf_harness/test/budgets_schema_test.dart (required fields, unit and statistic validation, unknown-id failure); tools/perf_harness/test/budgets_doc_drift_test.dart (registry versus the budgets-doc table); tools/perf_harness/test/no_hardcoded_budget_test.dart (repo scan with the documented allowlist).

#### Dependencies
SN-FND-002 (monorepo scaffold with tools/perf_harness). Consumed by [SN-PERF-003](perf.md#sn-perf-003), [SN-WEB-003](perf.md#sn-web-003), [SN-WEB-024](perf.md#sn-web-024), [SN-PDF-026](pdf.md#sn-pdf-026), [SN-SRCH-016](search.md#sn-srch-016).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-019

<a id="sn-perf-019"></a>

**Build the local performance trend dashboard as a CI artifact**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | perf, ci-cd, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-003](perf.md#sn-perf-003), [SN-PERF-018](perf.md#sn-perf-018) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A05`, `CWE-532`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context
A gate tells you that today's run failed; a trend tells you that the last nine runs have each cost half a millisecond and the tenth will fail. The budgets doc requires results to be published as a trend dashboard per device, per budget, over time, so regressions are visible before they reach a gate (docs/platform/performance-budgets.md section 3). Sane Notes is a zero-server product and does not link analytics SDKs or ship metrics to a vendor (CLAUDE.md section 7 rule 4; ADR-0011), so the dashboard must be a self-contained artifact produced by CI and opened from a downloaded file, not a hosted service. This issue builds that generator: run results in, a static HTML page plus a JSON series out, attached to the CI run.

#### Scope
**In:** a generator in tools/perf_harness that reads the per-run result JSON files and the budget registry ([SN-PERF-018](perf.md#sn-perf-018)) and emits dashboard.html plus series.json; one chart per budget per device slot showing the last N runs with the budget line and the current baseline; a regression marker where a run crosses the tolerance; the upload step that attaches the artifact to the perf CI job; a retention policy that keeps summarised points and drops raw timelines.
**Out:** the gate decision itself ([SN-PERF-003](perf.md#sn-perf-003)), the jank analyser ([SN-PERF-020](perf.md#sn-perf-020)), and any hosted or in-app telemetry (explicitly excluded by ADR-0011).

#### Acceptance criteria
- [ ] The generator produces a single self-contained HTML file that renders correctly with no network access: all data and styles are inlined, with zero external scripts, fonts or CDN references.
- [ ] There is one series per budget per device slot, showing at least the last 30 runs with commit sha, date, measured value, the budget target and the baseline.
- [ ] A run that crossed the regression tolerance is marked by shape and a text label, never by colour alone, and every chart has labelled axes and units taken from the budget registry.
- [ ] The page meets the same accessibility bar as the product: contrast >= 4.5:1 in both its light and dark rendering, all controls keyboard-reachable, and a data table equivalent for every chart so a screen reader can read the numbers.
- [ ] Retention: summarised points are kept for 90 days and raw timelines are dropped after 14 days; the policy is enforced by the generator and documented.
- [ ] The artifact is attached to both the per-commit and the nightly perf jobs, and its absence fails the job loudly rather than passing silently.

#### Technical notes
Generator in tools/perf_harness (pure Dart, headless, no package:flutter); inputs are the baseline and result JSON files written by [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-007](perf.md#sn-perf-007), [SN-PERF-011](perf.md#sn-perf-011), [SN-PERF-012](perf.md#sn-perf-012) and friends, plus targets from [SN-PERF-018](perf.md#sn-perf-018). Charts are hand-emitted inline SVG rather than a charting dependency, which keeps the artifact offline-safe and the supply chain small. Upload uses the CI actions already pinned by SN-CI-005. The dashboard reads the same statistic field (p95, p99, peak) the gates use, so a chart can never show an average while the gate uses a percentile.

#### Security & privacy
The dashboard contains timings, device slots and commit shas only; never note content, ink coordinates, user identifiers or tokens (MASVS-PRIVACY-1, CWE-532). A dashboard that loaded a remote script would be both a supply-chain risk and an egress from a build machine, so external references are banned and asserted by a test (OWASP-A05, CWE-1104). Artifacts inherit the repository's access controls and are not published to any third party; no analytics SDK is introduced, keeping the store privacy declaration of no data collected intact (ADR-0011).

#### UX notes
Developer- and release-facing, but it is still a Sane Notes surface and follows the design system where practical: colours and spacing from docs/design/tokens.json, a light and a dark rendering that follow prefers-color-scheme, and the Sage mark used through a single asset reference (docs/design/design-system.md; CLAUDE.md section 9). It is not one of the 17 product looks and does not need to be themed 17 ways; it needs to be readable at 2 a.m. on a phone screen, so it must lay out down to roughly 400 px wide with no horizontal scrolling except inside a chart container.

#### Test plan
tools/perf_harness/test/dashboard_generator_test.dart (series assembly, retention pruning, regression marking, units from the registry); tools/perf_harness/test/dashboard_offline_test.dart (no external script, style, font or image references in the emitted HTML); a snapshot test of the emitted HTML structure for a fixture run set.

#### Dependencies
[SN-PERF-003](perf.md#sn-perf-003) (gate and result plumbing), [SN-PERF-018](perf.md#sn-perf-018) (budget registry). Consumed by [SN-PERF-020](perf.md#sn-perf-020) and [SN-PERF-024](perf.md#sn-perf-024).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-020

<a id="sn-perf-020"></a>

**Automate the jank triage runbook into a timeline analyser**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | perf, qa, devx |
| Size | L |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-007](perf.md#sn-perf-007), [SN-PERF-019](perf.md#sn-perf-019) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-532`, `CWE-400` |
| Extra labels | agent-ready, innovation |

#### Context
The jank triage runbook is twelve ordered checks, from is it UI or raster, through is Impeller active, is the whole canvas repainting, is there a cross-isolate hop on the draw path, down to GC pressure, tile churn and logging on the hot path (docs/architecture/rendering-and-performance.md section 6). Today that is a human procedure, which means a failing perf job hands an engineer a red X and a timeline file. This issue turns the runbook into a tool: feed it a timeline plus the run metadata and it classifies each janky frame, executes the checks it can automate, and prints the runbook step that matches with the doc anchor and the evidence. That is the difference between a perf gate people fix and a perf gate people disable, and it is a genuine differentiator for an agent-run codebase because an autonomous agent can act on the output directly.

#### Scope
**In:** a triage CLI in tools/perf_harness that ingests a timeline plus run metadata and emits a plain-text and a JSON report; per-frame UI-thread versus raster-thread classification; automated checks for at least six runbook steps (renderer/Impeller active, whole-canvas repaint, build or layout on the pointer path, cross-isolate hop, GC pause correlation, logging on the hot path); tile-churn and big-bitmap heuristics where the timeline exposes them; an unknown-cause path that prints the capture-file-baseline instruction and bundles the artifact; a link from a failing gate message to the triage output.
**Out:** the checks' enforcement counterparts ([SN-PERF-016](perf.md#sn-perf-016), [SN-PERF-021](perf.md#sn-perf-021), [SN-PERF-022](perf.md#sn-perf-022)), the dashboard ([SN-PERF-019](perf.md#sn-perf-019)), and fixing any jank it finds (that is the owning area's issue).

#### Acceptance criteria
- [ ] dart run tools/perf_harness:triage <timeline.json> produces a report naming, per janky frame, the thread (UI or raster), the duration, and the matching runbook step with its doc anchor.
- [ ] At least six runbook checks are automated, and each has a fixture timeline that proves detection and a fixture that proves no false positive.
- [ ] The renderer check reports Impeller Vulkan, Impeller Metal, Skia GL, CanvasKit or skwasm and flags an unexpected Android GL fallback as runbook step 2 (shared with [SN-PERF-022](perf.md#sn-perf-022)).
- [ ] Frames with no matching cause are reported as unknown with the capture, file and baseline instruction and the path to the bundled artifact, never as a pass.
- [ ] The JSON report is stable and machine-readable so CI can paste the top finding into the failing check's summary.
- [ ] Running triage over a clean timeline exits zero and prints no findings (no noise on green runs).

#### Technical notes
CLI in tools/perf_harness (pure Dart, headless). Inputs are the timeline captured by [SN-PERF-007](perf.md#sn-perf-007) via flutter drive --profile with traceAction and reportData, plus the renderer probe from [SN-PERF-022](perf.md#sn-perf-022) and the isolate/log counters from [SN-PERF-016](perf.md#sn-perf-016). Classification uses the timeline's thread names and the FrameTiming build versus raster split; GC correlation uses the VM GC events present in the trace; repaint-scope evidence comes from the counters added in [SN-PERF-021](perf.md#sn-perf-021). Every check maps to a numbered step in docs/architecture/rendering-and-performance.md section 6 and cites it in the output, so the tool and the doc cannot diverge silently. Web specifics (desynchronized not honoured, main-thread contention) are reported as a step-11 finding.

#### Security & privacy
Timelines and reports carry frame timings, thread names and symbol names only. The tool must strip anything else before writing an artifact and must never emit ink coordinates, note text, file paths containing user data, or tokens (MASVS-PRIVACY-1, CWE-532). Timeline files can be large, so the parser caps input size and streams rather than loading unbounded JSON into memory, failing closed on an oversized or malformed trace (CWE-400).

#### UX notes
Developer- and agent-facing. The output is the UX: one finding per frame cluster, ordered by cost, each with a step number, the evidence and a one-line suggested fix, formatted so it is readable in a terminal at 80 columns and in a CI log. Colour is never the only signal (findings carry severity words), matching the accessibility bar the product holds itself to (docs/design/accessibility.md). It protects the same lag-proof feel across all 17 looks and light and dark that the rest of this epic defends (design/Sane Notes.dc.html Editor screen).

#### Test plan
tools/perf_harness/test/triage_classify_test.dart (UI versus raster classification over fixture timelines); tools/perf_harness/test/triage_checks_test.dart (one detect and one no-false-positive fixture per automated check); tools/perf_harness/test/triage_report_test.dart (stable JSON shape, redaction assertions, oversized-input rejection, clean-timeline exit zero).

#### Dependencies
[SN-PERF-007](perf.md#sn-perf-007) (timelines), [SN-PERF-019](perf.md#sn-perf-019) (artifact plumbing). Coordinates with [SN-PERF-016](perf.md#sn-perf-016), [SN-PERF-021](perf.md#sn-perf-021), [SN-PERF-022](perf.md#sn-perf-022).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-021

<a id="sn-perf-021"></a>

**Enforce the lag-proof checklist: repaint scope and zero per-sample allocations**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | perf, editor, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-INK-005](ink.md#sn-ink-005), [SN-ED-002](editor.md#sn-ed-002), [SN-PERF-007](perf.md#sn-perf-007) |
| Security controls | `CWE-400`, `CWE-770`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Every editor PR must pass the lag-proof checklist, and two of its items are the ones that silently regress most often: only the wet layer repaints on a pointer move, and there are no per-sample allocations with shaders, paints and paths reused (docs/architecture/rendering-and-performance.md section 8; CLAUDE.md section 8). The first is the commonest ink jank of all, a pointer move invalidating more than the wet RepaintBoundary, which does not show up as an obvious bug because the frame still renders, just slower; the second causes GC pauses that appear as random stutter minutes later. Both are invisible to functional tests and both are cheap to assert if the instrumentation exists. This issue adds those assertions to the perf job so the checklist items stop depending on a reviewer remembering them.

#### Scope
**In:** a repaint-scope test asserting that a PointerMoveEvent repaints only the wet layer (committed-ink tiles, page background and editor chrome paint counts unchanged) using RenderObject paint counters in a test harness; an allocation-budget test asserting zero new Path, Paint, FragmentShader or List allocations per sample on the steady-state draw path; a GC-pause assertion over a replayed 3,000-sample stroke; wiring both into the perf CI job with failure messages naming the checklist item; marking the automated items as CI-enforced in .github/PULL_REQUEST_TEMPLATE.md.
**Out:** isolate, I/O and logging discipline ([SN-PERF-016](perf.md#sn-perf-016)), shader warm-up and the paint cache implementation ([SN-PERF-017](perf.md#sn-perf-017)), and the ink and editor implementations themselves.

#### Acceptance criteria
- [ ] A pointer move during an active stroke repaints exactly one layer: the wet RepaintBoundary or the Tier A texture; counters for the committed tile layer, page background and chrome stay unchanged, and a deliberately-broken fixture (a setState on the canvas) fails the test.
- [ ] Replaying 3,000 samples allocates zero new Path, Paint or FragmentShader objects after the first stroke, and per-sample list allocations stay at zero (pre-allocated sample buffer).
- [ ] Major GC events during the replayed stroke are zero, and any GC pause that does occur is reported with its frame index so [SN-PERF-020](perf.md#sn-perf-020) can pick it up.
- [ ] Failure messages quote the failing line of the lag-proof checklist and its doc anchor, so the fix is obvious from the CI log alone.
- [ ] The PR template marks the automated checklist items as CI-enforced and leaves the reviewer-enforced ones explicitly manual, so no item is assumed covered when it is not.
- [ ] The assertions run against Tier B on CI where no device is present and are skipped with a recorded reason, never silently, when a Tier A surface is unavailable.

#### Technical notes
The repaint-scope harness uses a widget test pumping synthetic pointer events into the editor canvas ([SN-ED-002](editor.md#sn-ed-002)) with RenderObject paint-count instrumentation, the programmatic equivalent of the DevTools highlight-repaints check (docs/architecture/rendering-and-performance.md section 6 step 4). The active stroke must drive repaint through a Listenable passed as repaint on the CustomPainter rather than setState, which is exactly what the counters prove ([SN-INK-005](ink.md#sn-ink-005); docs/architecture/ink-engine.md section 5). Allocation counting uses the VM service allocation profile in profile mode over the replay driver of [SN-PERF-005](perf.md#sn-perf-005); the budget is expressed as a delta between two snapshots to tolerate unrelated framework allocations, with the tolerance documented and asserted at zero for the named classes.

#### Security & privacy
Per-sample allocation is an unbounded-resource path on the hottest code in the app and is the mechanism behind GC-pause stutter and, on 4 GB devices, memory pressure; the zero-allocation assertion is its control (CWE-400, CWE-770). The harness inspects object counts and class names only and must not dump heap contents into CI artifacts, since a heap dump of the editor would contain note content (MASVS-PRIVACY-1).

#### UX notes
These two checks defend the single most important feel in the product: ink that keeps up with the pen in every one of the 17 looks and in light and dark, including the expensive looks with wallpaper blur and frosted panels, which is precisely where an over-broad repaint hurts most (docs/design/screens-and-flows.md section 12 Appearance; design/Sane Notes.dc.html Editor screen). Chrome that must not repaint on a pointer move includes the palette dock, page rail and toolbar (docs/design/screens-and-flows.md sections 7.1, 7.3 and 7.7), and those surfaces keep their 44 pt targets and Semantics labels regardless.

#### Test plan
app/test/perf/repaint_scope_test.dart (paint counters per layer, broken-fixture negative case); app/test/perf/allocation_budget_test.dart (zero per-sample allocations for the named classes, GC event count); app/integration_test/editor_lagproof_test.dart (the combined assertions under flutter drive --profile on a device).

#### Dependencies
[SN-INK-005](ink.md#sn-ink-005) (wet renderer), [SN-ED-002](editor.md#sn-ed-002) (editor canvas and tool state machine), [SN-PERF-007](perf.md#sn-perf-007) (perf job). Coordinates with [SN-PERF-016](perf.md#sn-perf-016), [SN-PERF-017](perf.md#sn-perf-017), [SN-PERF-020](perf.md#sn-perf-020).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-022

<a id="sn-perf-022"></a>

**Verify Impeller is active on every target build and record the renderer**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | ipad, android-tablet, android-phone, ios-phone, web |
| Areas | perf, compat, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-007](perf.md#sn-perf-007) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, good first issue |

#### Context
The performance profile of the whole app depends on which renderer is actually running. Impeller compiles shaders offline and removes first-use shader-compilation jank; an unexpected Skia GL fallback on Android changes the profile and can reintroduce that jank, and the jank runbook makes confirming the renderer its second step (docs/architecture/rendering-and-performance.md sections 1.3 and 6 step 2). Impeller is the only renderer on iOS, is default on Android API 29+ with Vulkan, and does not exist on web, where CanvasKit or skwasm runs instead (docs/platform/compatibility-matrix.md section 3). A silent fallback is the kind of change that arrives with a toolchain upgrade and is noticed three weeks later as mysterious jank, so the renderer must be recorded on every perf run and asserted on Tier 1 devices. This is a small, self-contained task and a good first issue.

#### Scope
**In:** a startup probe that determines the active rendering backend (Impeller Metal, Impeller Vulkan, Skia GL, CanvasKit, skwasm) and writes it into the perf result JSON and the run metadata; a CI assertion that Impeller is active on iOS/iPadOS always and on the Android Tier 1 arm64 slots; recording rather than failing for known-fallback slots (armeabi-v7a, no-Vulkan devices); the launch-log parsing fallback where no runtime API exposes the backend; surfacing the renderer in the dashboard and the triage report.
**Out:** fixing a fallback when one is found (that is an Android platform issue), shader warm-up ([SN-PERF-017](perf.md#sn-perf-017)), and the device configs themselves ([SN-PERF-004](perf.md#sn-perf-004)).

#### Acceptance criteria
- [ ] Every perf run records the active renderer string in its result JSON alongside device slot, OS build and app flavour.
- [ ] CI fails when an iPadOS or iOS run reports anything other than Impeller Metal, or when an Android Tier 1 arm64 run reports Skia GL.
- [ ] A known-fallback slot (armeabi-v7a or a no-Vulkan device) records Skia GL and passes, with the fallback visible in the report rather than hidden.
- [ ] Web runs record CanvasKit or skwasm and assert that an iOS browser never reports skwasm, matching the documented WasmGC constraint.
- [ ] Where no runtime API exposes the backend, the documented launch-log parse is used and the detection method is recorded with the value, so an ambiguous detection is never reported as certain.
- [ ] The renderer appears on the trend dashboard and in the triage report as runbook step 2 evidence.

#### Technical notes
Probe lives in tools/perf_harness with a tiny app-side hook in app/ that reports the backend it can observe; on Android prefer the runtime signal and fall back to parsing the engine launch log line for the Impeller backend, on iOS assert Impeller by platform invariant plus the same log check, and on web detect the renderer from the Flutter web bootstrap configuration ([SN-WEB-002](compat.md#sn-web-002)). Slot expectations come from the device configs ([SN-PERF-004](perf.md#sn-perf-004)) and the compatibility matrix (docs/platform/compatibility-matrix.md section 3). The value flows into [SN-PERF-019](perf.md#sn-perf-019) and [SN-PERF-020](perf.md#sn-perf-020). Keep the probe out of the release binary: it is profile-mode only.

#### Security & privacy
The probe records a renderer name and a detection method, nothing else; no device identifiers beyond the lab slot name and no user data (MASVS-PRIVACY-1). Renderer and GPU strings are a fingerprinting surface, so the probe is profile-mode only, never compiled into release builds, and never included in opt-in telemetry beyond a coarse bucket (MASVS-PLATFORM-1; ADR-0011).

#### UX notes
The user-visible stake is the absence of first-stroke stutter in every one of the 17 looks and in light and dark, especially for textured pens whose grain shaders are exactly what compiles late under a Skia fallback (docs/design/pen-and-brush-spec.md; design/Sane Notes.dc.html Editor screen). Developer-facing output only; the renderer line in a report must be plain English (for example Impeller Vulkan, detected from launch log) rather than an enum name.

#### Test plan
tools/perf_harness/test/renderer_probe_test.dart (log-line parsing for each backend, ambiguous-detection handling, slot expectation matrix); app/test/perf/renderer_report_test.dart (the value reaches the result JSON); a CI fixture run asserting an Android Skia GL report on a Tier 1 arm64 slot fails the job.

#### Dependencies
[SN-PERF-004](perf.md#sn-perf-004) (device configs and slot expectations), [SN-PERF-007](perf.md#sn-perf-007) (perf run plumbing). Consumed by [SN-PERF-019](perf.md#sn-perf-019), [SN-PERF-020](perf.md#sn-perf-020), [SN-PERF-017](perf.md#sn-perf-017).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-023

<a id="sn-perf-023"></a>

**Implement the adaptive quality ladder for low-end and throttled devices**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | perf, compat, ink |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-INK-022](ink.md#sn-ink-022), [SN-PERF-009](perf.md#sn-perf-009), [SN-PERF-007](perf.md#sn-perf-007) |
| Security controls | `CWE-400`, `CWE-770`, `MASVS-CODE-4`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, innovation |

#### Context
On the low-end reference device the rule is explicit: degrade effects before dropping frames (docs/platform/performance-budgets.md section 4, Android low-end row). The 60 fps floor and the 300 MB ceiling are absolute on a 4 GB Snapdragon-680-class tablet, which is the device a student in the target persona actually owns, and the honest way to hold both is to spend less on the parts of the frame nobody is looking at. This issue implements the mechanism: a named quality ladder, a capability-driven initial step, and a documented table of exactly what each step changes. Thermal pressure feeds the same ladder ([SN-PERF-015](perf.md#sn-perf-015)). The invariant that makes this safe is that the ladder may never change wet-ink latency, stroke geometry or anything persisted; it only changes optional rendering work and background scheduling.

#### Scope
**In:** a RenderQuality ladder with three named steps (full, reduced, minimal) in a pure-Dart policy plus the app-side service that applies it; capability-based initial selection from device memory class, core count and measured frame headroom rather than a platform string; the documented change table per step (prediction lead length, tile re-raster zoom bucket and deferral during fling, grain and texture fragment shaders replaced by the plain-fill fallback, background indexing, thumbnail generation and off-isolate tessellation paused or throttled, PDF preview resolution); a debug override to force a step; a read-only diagnostics line in Settings naming the active step.
**Out:** thermal detection ([SN-PERF-015](perf.md#sn-perf-015)), the tile cache implementation ([SN-INK-022](ink.md#sn-ink-022)), the low-end validation run ([SN-AND-027](perf.md#sn-and-027)), and any user-facing quality toggle (not shipped in v1, see UX notes).

#### Acceptance criteria
- [ ] The ladder is an immutable value object selected through a Riverpod provider; no mutable global singleton, and the step is observable by every consumer.
- [ ] Initial selection uses a capability query (memory class, core count, measured frame headroom over the first N frames), never a platform or model-name check, matching the tier-selection rule used for inking.
- [ ] Each step has a documented, tested effect: at reduced, background indexing, thumbnail generation and off-isolate tessellation are throttled and tile re-raster is deferred during a fling; at minimal, grain and texture shaders fall back to plain fill and the prediction lead is shortened to one frame.
- [ ] Wet-ink latency is unchanged at every step (the latency proxy shows no regression beyond tolerance between full and minimal), and stroke geometry plus everything persisted is byte-identical, proven by a serialisation round-trip test.
- [ ] On the Android-lowend reference the 60 fps floor and the 300 MB ceiling hold at the step the capability query selects, with the step recorded in the perf result.
- [ ] Stepping down and back up is hysteretic and rate-limited (no more than one step change per 30 s) so quality never visibly pulses during normal use.

#### Technical notes
Policy in pure Dart (a sane_core-adjacent policy type or a tools-shared package if the DAG demands it, never a sideways package import), applied in app/ through Riverpod providers, which is where cross-feature coordination belongs (docs/architecture/overview.md section 5; ADR-0003). Consumers read the step: the renderer for tile re-raster scheduling ([SN-INK-022](ink.md#sn-ink-022)), the paint cache for the shader fallback ([SN-PERF-017](perf.md#sn-perf-017)), the search index and thumbnail jobs, and the PDF preview path ([SN-PDF-004](pdf.md#sn-pdf-004)). The tile LRU budget already scales per device (default <= 96 MB on 4 GB Android, docs/architecture/rendering-and-performance.md section 3) and the ladder tightens that budget rather than inventing a second cap. The docs prescribe the principle but not the step names or the table; both are decided here and written into docs/architecture/rendering-and-performance.md in the same PR.

#### Security & privacy
The ladder is the app's controlled response to resource pressure: without it, a low-memory device degrades into eviction storms, OOM kills and lost work, which is the availability half of the threat model (CWE-400, CWE-770, MASVS-CODE-4). Because it can pause background indexing and sync work, the implementation must guarantee that paused jobs are resumed and never dropped, so no note becomes permanently unsearchable or unsynced; a resume test asserts this. The capability query reads coarse device properties only and never builds a device fingerprint or sends anything off device (MASVS-PRIVACY-1).

#### UX notes
The ladder must be felt as speed, never seen as ugliness: at every step the layout, colours, spacing and type tokens of all 17 looks and light and dark are unchanged, and the only permitted visual difference is the documented grain-texture fallback on textured pens, which is compared against the shader output by a golden test within a stated tolerance (docs/design/pen-and-brush-spec.md; docs/design/design-system.md). No toast, banner or modal announces a step change. v1 ships no user-facing quality switch because an automatic ladder that is honest about its invariants is better UX than a setting nobody understands; the active step appears only as a read-only diagnostics line in Settings, built from SaneSettingRow with a Semantics label and a 44 pt target (docs/design/screens-and-flows.md section 12).

#### Test plan
app/test/perf/quality_ladder_policy_test.dart (capability selection, step table, hysteresis and rate limiting with a fake clock); app/test/perf/quality_ladder_resume_test.dart (paused background jobs always resume); app/integration_test/low_end_quality_test.dart (forced minimal on the low-end profile: 60 fps floor, memory ceiling, latency unchanged); packages/sane_render/test/golden/grain_fallback_golden_test.dart (fallback versus shader across looks and light/dark); a serialisation round-trip test proving persisted output is identical at every step.

#### Dependencies
[SN-INK-022](ink.md#sn-ink-022) (tiling and LRU), [SN-PERF-009](perf.md#sn-perf-009) (memory budgets and sampler), [SN-PERF-007](perf.md#sn-perf-007) (frame measurement). Consumed by [SN-PERF-015](perf.md#sn-perf-015); validated by [SN-AND-027](perf.md#sn-and-027) and [SN-PERF-024](perf.md#sn-perf-024).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PERF-024

<a id="sn-perf-024"></a>

**Run the beta performance soak across the full Tier 1 device lab**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | all |
| Areas | perf, compat, qa |
| Size | L |
| SDLC | verification |
| Parent | [SN-PERF-001](perf.md#sn-perf-001) |
| Depends on | [SN-PERF-003](perf.md#sn-perf-003), [SN-PERF-004](perf.md#sn-perf-004), [SN-PERF-013](perf.md#sn-perf-013) |
| Security controls | `CWE-400`, `CWE-770`, `MASVS-PRIVACY-1`, `CWE-532` |
| Extra labels | agent-ready, needs-credentials |

#### Context
M7 exists to prove the guarantees before real users arrive, and one of its exit criteria is that all decision-7 budgets hold under soak on every reference device (docs/roadmap.md M7). Short benchmark runs catch the obvious regressions; they do not catch the failures that only appear after three hours, which are the ones that ruin a real lecture: memory drift from a cache that never quite evicts, frame times that creep as fragmentation grows, a thermal step that never steps back up, a background job that wakes every minute and never finishes. This issue defines and runs that long soak across every Tier 1 slot, records a signed-off report per device, and files release-blocking issues for anything it finds. It is the last gate before the store surfaces in M8.

#### Scope
**In:** a documented four-hour mixed soak scenario (continuous writing, 600-page PDF scrolling, audio recording, opening and closing 50 notebooks, search while indexing, sync enabled and disabled phases); execution on every Tier 1 slot from docs/platform/compatibility-matrix.md section 2; drift assertions comparing hour 1 with hour 4 for frame time, latency proxy and memory; thermal and battery timelines attached from [SN-PERF-013](perf.md#sn-perf-013) and [SN-PERF-015](perf.md#sn-perf-015); a per-device report committed under tools/device_lab/results; automatic filing of release-blocking issues on failure.
**Out:** the individual budget benchmarks (they are reused, not redefined), the harness and gates ([SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-003](perf.md#sn-perf-003)), the security pentest and accessibility audit (other M7 issues), and fixing what the soak finds.

#### Acceptance criteria
- [ ] The soak scenario is documented step by step and runs unattended for four hours on each Tier 1 slot, producing one machine-readable result file per device.
- [ ] Frame-time p99 and the latency proxy at hour 4 are within the documented tolerance of hour 1 on every slot; a creeping regression fails even when every absolute budget still passes.
- [ ] Memory at hour 4 is within tolerance of hour 1 with no monotonic growth trend, and there are zero OOM events, low-memory kills or crashes across the whole run.
- [ ] All decision-7 budgets (B1-B9) are re-evaluated under soak conditions and pass on every Tier 1 slot; B10 battery is attached from the dedicated protocol run.
- [ ] Thermal transitions are recorded; a device that entered a throttled state and did not return to nominal within the documented window is reported as a finding rather than a pass.
- [ ] Each device report is reviewed and signed off (device, OS build, app build, flavour, date, result per budget), and any failure files a release-blocking issue with the triage output attached.

#### Technical notes
Scenario driver in tools/perf_harness composed from the existing workloads: the writing corpus ([SN-PERF-005](perf.md#sn-perf-005)), the 600-page PDF scroll ([SN-PERF-011](perf.md#sn-perf-011)), the dense-page stress ([SN-PERF-012](perf.md#sn-perf-012)), the open/close leak loop ([SN-PERF-009](perf.md#sn-perf-009)) and the notebook-open benchmark ([SN-PERF-010](perf.md#sn-perf-010)). Budgets and statistics come from the registry ([SN-PERF-018](perf.md#sn-perf-018)); results feed the trend dashboard ([SN-PERF-019](perf.md#sn-perf-019)); failures are handed to the triage analyser ([SN-PERF-020](perf.md#sn-perf-020)) before an issue is filed. Reports follow the tools/device_lab/results template ([SN-PERF-004](perf.md#sn-perf-004)). Physical Tier 1 hardware, store-signed beta builds and lab access are maintainer-supplied, hence needs-credentials; emulator slots participate for functional stability only and are non-gating for latency and fps.

#### Security & privacy
A four-hour soak is also an availability and resource-exhaustion test, and an OOM kill mid-note is data loss, so crash-free completion is a security-relevant outcome, not only a performance one (CWE-400, CWE-770). Soak artifacts contain timings, counters and device metadata only; note content, ink coordinates, audio, transcripts, account identifiers and tokens never appear in a report or an attached trace, and the redaction is asserted before artifacts are committed (MASVS-PRIVACY-1, CWE-532). Recordings made during the audio phase use synthetic input and are deleted with the fixture data at the end of the run.

#### UX notes
The soak is the closest the project gets to reproducing a real user's week, so the scenario exercises the product as the design describes it: Library to Editor to Search and back, the palette dock, the page rail, audio recording and playback, and at least two looks including an expensive one with wallpaper blur and frosted panels, in both light and dark (docs/design/screens-and-flows.md sections 6, 7, 11 and 12; design/Sane Notes.dc.html). Any visible degradation over four hours (ink lag, stutter while scrolling, a quality step that never restores) is a finding, because the promise the user hears is that hour four feels like minute one.

#### Test plan
tools/perf_harness/test/soak_scenario_test.dart (scenario composition, phase ordering, unattended completion against a fake driver); tools/perf_harness/test/soak_drift_test.dart (hour-1 versus hour-4 drift math, monotonic-growth detection); tools/perf_harness/test/soak_report_redaction_test.dart (no content or identifiers in artifacts); the four-hour physical runs are supervised runbook steps recorded under tools/device_lab/results.

#### Dependencies
[SN-PERF-003](perf.md#sn-perf-003) (gates and result plumbing), [SN-PERF-004](perf.md#sn-perf-004) (device lab), [SN-PERF-013](perf.md#sn-perf-013) (battery protocol). Coordinates with [SN-PERF-015](perf.md#sn-perf-015), [SN-PERF-019](perf.md#sn-perf-019), [SN-PERF-020](perf.md#sn-perf-020), [SN-PERF-023](perf.md#sn-perf-023), [SN-IPAD-025](perf.md#sn-ipad-025), [SN-AND-027](perf.md#sn-and-027).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-018

<a id="sn-phn-018"></a>

**Harden phone memory, cold start and battery to the low-end budgets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | perf, compat |
| Size | L |
| SDLC | verification |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-008](pages-canvas.md#sn-phn-008), [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-003](perf.md#sn-perf-003), [SN-PERF-004](perf.md#sn-perf-004) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-CODE-3` |
| Extra labels | agent-ready |

#### Context
Phones are the memory and thermal floor of the product (docs/platform/phones.md §8). The budgets that bind hardest there are **B9 memory < 300 MB on a 4 GB Android**, **B6 cold start < 2 s on mid Android**, **B4/B5 60 fps with no frame > 16.7 ms while writing**, and **B8 600-page PDF scroll at 60 fps** — with the Tier-1 gate device being the Android-lowend 4 GB / Snapdragon 680-class reference (docs/platform/performance-budgets.md §1, docs/platform/compatibility-matrix.md §2). phones.md §8 also names the concrete levers: tile/raster caching in `sane_render` MUST cap memory and evict off-screen tiles, never holding whole notebooks rasterised; cold start must code-split and **defer heavy plugin init (ML, PDF) until used**; and background sync must be efficient because on iOS there is no reliable PWA background work.

Limitation **P4** in phones.md §9 sets the policy for when the budget is at risk: *degrade effects before dropping frames*. This issue makes that policy real — a measured, gated hardening pass rather than ad-hoc optimisation, and it is a milestone exit criterion for M5 (docs/roadmap.md).

#### Scope
**In:** a memory-capped tile/raster policy with eviction for phone surfaces, deferred/lazy plugin initialisation on the cold-start path, a startup trace and trimming pass, a graceful-degradation ladder (reduce effects — blur, wallpaper frosting, shadow layers, prediction depth — before dropping frames), battery measurement for a 30-minute phone capture session, and wiring the three phone budgets into the CI perf gates.
**Out:** the perf harness and gate infrastructure ([SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-003](perf.md#sn-perf-003), [SN-PERF-004](perf.md#sn-perf-004)), the ink pipeline itself ([SN-INK-001](ink.md#sn-ink-001)), PDF rendering internals ([SN-PDF-002](pdf.md#sn-pdf-002)), and tablet/web budgets.

#### Acceptance criteria
- [ ] Steady-state memory on the Android-lowend reference stays **< 300 MB** while: a 1,000-page notebook is open, a 600-page PDF is scrolled, and a 30-minute recording is running (budget B9).
- [ ] Cold start to a writable page is **< 2 s** on mid-Android and **< 1.5 s** on iPhone-ref (budget B6, PRD-CO-270), measured by `tools/perf_harness` and gated in CI.
- [ ] The tile cache has an explicit byte budget derived from device memory class, evicts least-recently-used off-screen tiles, and never holds a whole notebook rasterised; an instrumented test asserts the cap is respected under a scripted scroll.
- [ ] No heavy plugin (ML, PDF, audio, cloud drive) is initialised during cold start; each initialises on first use, verified by a startup-trace assertion listing the plugins touched before first frame.
- [ ] Under memory pressure or sustained thermal throttling the app **degrades effects before dropping frames**: wallpaper blur, glass backdrop filters, shadow layers and prediction depth reduce in a defined order, and the frame budget still holds (phones.md §9 P4).
- [ ] Degradation is reversible and silent — no modal, no error; if the user opted into a heavy look it returns when pressure clears.
- [ ] A 30-minute phone capture session (screen on, recording, occasional ink) has a measured battery drain recorded as a baseline in `tools/device_lab`, with a regression threshold set from it.
- [ ] 60 fps floor and no frame > 16.7 ms while writing hold on Android-lowend after all changes (budgets B4/B5).
- [ ] The three phone budgets are enforced as CI gates on the reference devices, and a regression fails the build (a feature that regresses latency does not merge — CLAUDE.md §8).
- [ ] All measurements are reproducible from a documented harness invocation recorded in the PR.

#### Technical notes
Work spans `packages/sane_render` (tile cache budget + eviction), `app/lib/bootstrap/` (deferred plugin registration, code-split of the editor route), and `tools/perf_harness` (phone scenarios). Derive the tile budget from the device memory class rather than a constant, and expose it as a single tuning point. Use `flutter run --profile` timelines plus the harness's frame/memory sampling; attach the timeline to the PR as CLAUDE.md §5 requires for any editor/draw-loop change. Keep the hot draw path allocation-free and isolate-hop-free (CLAUDE.md §8); persistence, encryption, PDF raster, ML and indexing remain on their own isolates. For the degradation ladder, drive it from one `PerformanceMode` provider so every consumer (wallpaper frosting, `BackdropFilter` glass looks, shadow layers, ink prediction depth) reads a single value — this is also the hook a future 'battery saver' setting would use. Reference: ADR-0008 (ink pipeline/tiers), ADR-0010 (web strategy, for the shared render budget reasoning), docs/architecture/rendering-and-performance.md.

#### Security & privacy
None beyond baseline, with two specific controls. **T-PERFLOG** — perf instrumentation is the classic place where content leaks: a trace that records notebook titles, page ids or stroke coordinates would put note content into a file that gets attached to a bug report. Control: the harness records only counters and timings, ids are opaque short hashes, and a test asserts no content-bearing field is emitted (CLAUDE.md §7.3; MASVS-PRIVACY-1, CWE-532). **T-DEBUG-IN-RELEASE** — leaving the profiling hooks reachable in release. Control: instrumentation is compiled out of release builds behind `kProfileMode`/`kDebugMode` guards and verified by a build-time test, mirroring the auth-bypass discipline (MASVS-CODE-3, MASVS-RESILIENCE-1, CWE-489). Telemetry remains opt-in and off by default; no measurement leaves the device (ADR-0011).

#### UX notes
Performance is a UX requirement, not an engineering target (docs/design/ux-principles.md §1): the user must never see the stroke catch up, never see a spinner for something local, and never be told the app is degrading. The degradation ladder therefore has **no UI** — it is silent by design, and the only visible consequence is that a heavy look's blur or shadow softens under pressure, which must still read correctly in all 17 looks and in dark mode (test the glass looks, Glassmorphism and Y2K, and the neumorphic dual-shadow look, at each degradation step). Loading states follow §4.2 — content, then skeleton, then spinner as a last resort — and the cold-start path shows the page, not a splash queue. Wallpaper mode must keep note contrast at every degradation level (§7, docs/design/accessibility.md).

#### Test plan
- `packages/sane_render/test/tile_cache_budget_test.dart` — byte budget respected, LRU eviction, no whole-notebook rasterisation under a scripted scroll.
- `app/test/bootstrap/deferred_plugin_init_test.dart` — startup trace lists no heavy plugin before first frame (regression test).
- `app/test/perf/performance_mode_test.dart` — degradation ladder order, reversibility, no user-visible modal.
- `app/test/security/perf_trace_no_content_test.dart` — traces contain no titles, ids or coordinates (negative test).
- `app/integration_test/phone_memory_soak_test.dart` — 1,000-page notebook + 600-page PDF + 30-minute recording under the 300 MB ceiling on Android-lowend.
- `app/integration_test/phone_cold_start_test.dart` — cold-start timings on iPhone-ref and mid-Android, gated in CI via `tools/perf_harness`.

#### Dependencies
[SN-PHN-008](pages-canvas.md#sn-phn-008), [SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-003](perf.md#sn-perf-003), [SN-PERF-004](perf.md#sn-perf-004)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Profile timeline / perf-harness output attached to the PR
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-003

<a id="sn-web-003"></a>

**Enforce a web bundle-size budget and cached cold-start gate in CI**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | perf, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-002](compat.md#sn-web-002), [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | `MASVS-CODE-2`, `CWE-1104` |
| Extra labels | agent-ready, good first issue |

#### Context
Bundle size is the web surface's structural disadvantage: CanvasKit adds ~1.5 MB of WASM before a single line of app code, skwasm ~1.1 MB, and compiled Dart sits on top (`docs/adr/0010-web-pwa-strategy.md` Consequences). Budget **B6** requires a cached PWA cold start under **3 s** (`docs/platform/performance-budgets.md`), and the honest way to keep that true over months of feature work is a CI gate that fails when transfer size grows without a deliberate decision. Without it, every new package silently taxes the "try it on the web" acquisition flow (`PRD-CO-412`, `PRD-CO-413`). This issue adds the measurement and the gate; it does not optimise the app.

#### Scope
**In:** a CI step that builds the web release, computes Brotli-compressed transfer sizes per artifact class (engine WASM/JS, app JS, fonts, assets), compares them to a checked-in budget file, fails on regression beyond tolerance, and posts a size table to the PR.
**Out:** the actual splitting/lazy-loading work, the Lighthouse audit ([SN-WEB-024](perf.md#sn-web-024)), the service-worker caching strategy ([SN-WEB-011](compat.md#sn-web-011)), and hosting-level compression config ([SN-WEB-017](ci-cd.md#sn-web-017)).

#### Acceptance criteria
- [ ] `tools/scripts/web_bundle_budget.mjs` prints raw and Brotli sizes for every emitted file grouped into engine / app / assets / fonts.
- [ ] Budgets live in `tools/perf_harness/web_budgets.json` with an initial baseline captured from the first green build plus an explicit per-group ceiling.
- [ ] The job fails when any group exceeds its ceiling, or grows by more than **5 %** versus the baseline, and the failure message names the three largest contributors.
- [ ] A deliberate increase is possible in one commit by editing the budget file, and the diff is visible in review.
- [ ] The job runs on every PR touching `app/`, `packages/`, `web/` or `pubspec.lock` and completes in under 10 minutes.
- [ ] A measured cached-load timing (service-worker warm, Largest Contentful Paint) is reported in the job summary; the < 3 s B6 gate is asserted by [SN-WEB-024](perf.md#sn-web-024) and merely reported here.

#### Technical notes
Extend the existing workflow from [SN-FND-003](ci-cd.md#sn-fnd-003) rather than creating a parallel pipeline; pin every action to a full commit SHA (secure-coding checklist §10). Measure post-compression bytes, because that is what a user downloads — use Node's `zlib.brotliCompressSync` at the quality the CDN will use ([SN-WEB-017](ci-cd.md#sn-web-017)). Report both the WASM and JS artifact sets from the dual build ([SN-WEB-002](compat.md#sn-web-002)) so a CanvasKit-only regression is still caught. Budget rationale and the B6 definition are in `docs/platform/performance-budgets.md` §B6; record the chosen ceilings there in the same PR. Deferred-loading levers to be used by later work (not here): lazy plugin init, code-split routes, subset fonts.

#### Security & privacy
Supply-chain adjacency: an unexpected bundle jump is often the first visible sign of an unvetted transitive dependency, so the failure message doubles as a supply-chain signal (MASVS-CODE-2, OWASP-A06). Controls: pin actions by SHA, run with a read-only `GITHUB_TOKEN`, do not upload build artifacts containing source maps to any public location (CWE-540 adjacency — source maps are retained only in the private CI artifact store), and never echo `--dart-define` values into the log (CWE-532). No note data is involved.

#### UX notes
No user-visible UI is added, so the **17 looks × light/dark** matrix is unaffected and the existing `sane_ui` theme goldens ([SN-DS-002](design-system.md#sn-ds-002)) remain the coverage for it — re-run them to prove the build change did not drop an asset. The user-facing effect is the first-load experience of the Editor and Library screens in `design/Sane Notes.dc.html` (`docs/design/screens-and-flows.md` §6, §7): keeping the budget green is what allows the branded loading state to finish before a visitor loses patience (`PRD-CO-413`). Ensure the PR comment table is plain text so it is readable by screen readers in the GitHub UI.

#### Test plan
- `tools/scripts/__tests__/web_bundle_budget_test.mjs` — unit tests for grouping, Brotli sizing, threshold maths and the failure message.
- A deliberate fixture build with an oversized asset asserts the job fails; removing it asserts it passes.
- Manual: run the script locally against a release build and confirm the numbers match browser DevTools transfer sizes.

#### Dependencies
[SN-WEB-002](compat.md#sn-web-002), [SN-FND-003](ci-cd.md#sn-fnd-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/platform/performance-budgets.md records the chosen ceilings
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-WEB-024

<a id="sn-web-024"></a>

**Add Lighthouse PWA and web ink/perf budget gates to CI**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | perf, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-011](compat.md#sn-web-011), [SN-PERF-003](perf.md#sn-perf-003) |
| Security controls | `MASVS-CODE-2`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready |

#### Context
Two web budgets are contractual: **B3** pen-down→pixel ≤ **30 ms** on Chrome desktop and **B6** cached PWA cold start < **3 s** (locked decision 7, `docs/platform/performance-budgets.md`). ADR-0010's verification section additionally requires a passing **Lighthouse PWA audit** (installable, offline, manifest, service worker) per release. A budget that is only measured by hand decays; `docs/platform/performance-budgets.md` §B6 is explicit that the gate applies to the cached case while the first-ever uncached load is measured and reported but not gated. This issue turns all of that into an automated, non-negotiable CI gate for the web surface, mirroring the native perf gates from [SN-PERF-003](perf.md#sn-perf-003).

#### Scope
**In:** a CI job that builds and serves the web app with production headers, runs Lighthouse (PWA + performance + accessibility categories), runs `tools/perf_harness` in web mode for pen-to-pixel and frame time, asserts the thresholds, uploads the traces, and comments a results table; threshold configuration checked into the repo; a documented tolerance and re-run policy for noisy runs.
**Out:** the bundle-size budget ([SN-WEB-003](perf.md#sn-web-003)), the functional browser matrix ([SN-WEB-023](qa.md#sn-web-023)), native perf gates ([SN-PERF-003](perf.md#sn-perf-003)), and any optimisation work.

#### Acceptance criteria
- [ ] The job fails when pen-to-pixel exceeds **30 ms** (median of N ≥ 20 scripted strokes) or when any frame exceeds **16.7 ms** during a scripted writing session on Chrome desktop.
- [ ] The job fails when cached cold start exceeds **3 s** (median over N ≥ 5 loads, service-worker warm, measured to first interactive editor frame).
- [ ] Lighthouse PWA checks pass (installable, offline-capable, valid manifest, registered service worker); the accessibility category score is recorded and regressions are reported.
- [ ] First-ever uncached load time is measured and reported, explicitly **not** gated.
- [ ] Results, traces and the Lighthouse JSON are uploaded as build artifacts and summarised in a PR comment.
- [ ] A documented anti-flake policy exists (warm-up run discarded, median not mean, automatic single re-run, two failures in a row = real failure).
- [ ] The job runs against a build served with the real security headers so isolation and CSP costs are included in the measurement.
- [ ] Thresholds live in `tools/perf_harness/web_budgets.json` and any change is an explicit, reviewable diff.

#### Technical notes
Reuse the harness and reporting format from [SN-PERF-002](perf.md#sn-perf-002)/[SN-PERF-003](perf.md#sn-perf-003) so web numbers sit in the same dashboard as native ones. On web, latency is measured from `event.timeStamp` to the `requestAnimationFrame` present timing, and frame time from `requestAnimationFrame` deltas (`docs/platform/performance-budgets.md` §B3/§B5 methodology). Serve the build through the same local server used by [SN-WEB-016](security.md#sn-web-016) so headers match production. Pin Lighthouse, Chrome and all actions by SHA/version. Run on a consistent CI machine class and record it in the results, since latency numbers are meaningless without the hardware context.

#### Security & privacy
Threats: a perf job that uploads full traces could include note content from the scripted session (CWE-532, MASVS-PRIVACY-1); an unpinned Lighthouse/Chrome pulling an unvetted binary (MASVS-CODE-2, OWASP-A06); a public artifact store exposing internal URLs. Controls: scripted sessions use synthetic content only; traces are scrubbed of text content before upload and retained in the private CI artifact store with expiry; tooling is version-pinned and actions SHA-pinned; the job needs no secrets and runs with a read-only token; no external analytics endpoint is contacted during measurement (`PRD-PRIV-007`).

#### UX notes
No UI, but this job is the enforcement arm of the product's core promise — "ink that keeps up" (`docs/design/screens-and-flows.md` §16 copy). The scripted session must exercise the real Editor surface with the palette dock and page rail visible in the **default look, both light and dark**, so measurements reflect what users see rather than a stripped test page; record which look was used. Because heavier looks (shadows, blur, gradients) cost frame time, the job additionally runs the writing session in the **heaviest of the 17 looks** once per release so a theme-driven regression is attributable rather than invisible (`docs/design/design-system.md`, `docs/design/tokens.json`). The PR comment table should stay plain text for screen-reader users.

#### Test plan
- `tools/perf_harness/test/web_metrics_test.dart` — metric extraction, median/percentile maths, threshold comparison.
- `tools/scripts/__tests__/lighthouse_gate_test.mjs` — parsing the Lighthouse JSON and mapping categories to pass/fail.
- A deliberate slow-fixture run asserts the job fails; the normal build asserts it passes.
- Manual: compare harness numbers against a DevTools performance recording once, and record the correlation in `docs/platform/performance-budgets.md`.

#### Dependencies
[SN-WEB-011](compat.md#sn-web-011), [SN-PERF-003](perf.md#sn-perf-003); measurement methodology from [SN-PERF-002](perf.md#sn-perf-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/platform/performance-budgets.md records the web methodology and machine class
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

