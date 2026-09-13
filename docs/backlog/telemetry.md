# Backlog — area: telemetry

15 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-TEL-001](telemetry.md#sn-tel-001) **Epic: Opt-in, content-free telemetry, crash reporting and diagnostics** (epic · M4 Identity, Sync & Privacy)
  - [SN-TEL-002](telemetry.md#sn-tel-002) **Define the telemetry event catalogue and field allow-list** · p1 · task · S · M4 Identity, Sync & Privacy
  - [SN-TEL-003](telemetry.md#sn-tel-003) **Implement the deny-by-default telemetry serialiser with redaction fuzzing** · p0 · security · M · M4 Identity, Sync & Privacy
  - [SN-TEL-004](telemetry.md#sn-tel-004) **Implement the redacted in-memory ring-buffer diagnostics log sink** · p1 · task · M · M4 Identity, Sync & Privacy
  - [SN-TEL-005](telemetry.md#sn-tel-005) **Capture sanitised crash records from every Dart error entrypoint** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-TEL-006](telemetry.md#sn-tel-006) **Aggregate usage and performance metrics on-device into coarse buckets** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-TEL-007](telemetry.md#sn-tel-007) **Implement the telemetry kill switch, queue purge and send state machine** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-TEL-008](telemetry.md#sn-tel-008) **Export a redacted diagnostics bundle for support from Settings** · p1 · feature · M · M4 Identity, Sync & Privacy
  - [SN-TEL-009](telemetry.md#sn-tel-009) **Add a rotating, resettable install token with no stable identifier** · p1 · task · S · M4 Identity, Sync & Privacy
  - [SN-TEL-010](telemetry.md#sn-tel-010) **Prove zero telemetry egress before opt-in with a blocking CI gate** · p0 · test · S · M4 Identity, Sync & Privacy
  - [SN-TEL-011](telemetry.md#sn-tel-011) **SPIKE: choose the opt-in crash backend under ADR-0011 constraints** · p1 · spike · S · M4 Identity, Sync & Privacy
  - [SN-TEL-012](telemetry.md#sn-tel-012) **Implement the opt-in crash and metrics upload adapter** · p1 · feature · M · M8 Launch & Growth
  - [SN-TEL-013](telemetry.md#sn-tel-013) **Collect opt-in field performance metrics against the decision-7 budgets** · p2 · feature · M · M8 Launch & Growth
  - [SN-TEL-014](telemetry.md#sn-tel-014) **Build the release symbolication pipeline for obfuscated crash reports** · p1 · infra · M · M8 Launch & Growth
  - [SN-TEL-015](telemetry.md#sn-tel-015) **Gate every new telemetry event behind a privacy review in CI** · p1 · security · S · M4 Identity, Sync & Privacy

---

## Issues

### SN-TEL-001

<a id="sn-tel-001"></a>

**Epic: Opt-in, content-free telemetry, crash reporting and diagnostics**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | epic |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | telemetry, privacy |
| Size | XL |
| SDLC | requirements |
| Parent | — |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-FND-005](devx.md#sn-fnd-005), [SN-PRV-009](privacy.md#sn-prv-009), [SN-CRY-002](security.md#sn-cry-002), [SN-PERF-002](perf.md#sn-perf-002) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-PRIVACY-4`, `MASVS-STORAGE-1`, `MASVS-NETWORK-1`, `ASVS-V14`, `ASVS-V16`, `OWASP-A09`, `TM-I-05`, `TM-P-06`, `TM-R-03`, `CWE-532` |
| Extra labels | agent-ready, sec: privacy-by-design, innovation |

#### Context
Sane Notes promises local-first, zero-knowledge note-taking with App Store privacy labels and Play Data Safety declaring 'no data collected' except opt-in crash reports (locked decisions 6 and 8, CLAUDE.md section 2). At the same time the team still has to diagnose field crashes and jank, prove the decision-7 performance budgets on real hardware, and let a user help debug an issue without leaking a single character of their notes. [ADR-0011](../adr/0011-telemetry-and-diagnostics.md) resolves that tension: telemetry is **opt-in only, off by default on every flavour, aggregated on-device before any transmission, and never contains note content or personal identifiers**, with **no always-on third-party analytics SDK linked into the app**. This epic owns the *pipeline* that makes that true in code: the event catalogue and deny-by-default field allow-list, the redacting serialiser, the in-memory ring-buffer diagnostics log, sanitised crash capture, on-device bucketed aggregation, the kill switch and purge, the user-driven diagnostics bundle, the opt-in crash/perf upload path, and the CI proof that a fresh install transmits nothing.
It implements `PRD-TEL-001..004` (docs/product/prd-03-identity-sync-privacy-settings-billing.md section 11), supports `PRD-PRIV-001` / `PRD-PRIV-004` / `PRD-DEL-003`, and builds on the logging policy in docs/architecture/overview.md section 8.2 and the flavour matrix in section 7.1 (`SANE_TELEMETRY_DEFAULT=false` on dev, beta and release). The consent UI, the 'what we collect' screen and the analytics-SDK dependency ban live in the privacy area ([SN-PRV-009](privacy.md#sn-prv-009), [SN-PRV-010](privacy.md#sn-prv-010)); this epic provides the mechanisms they switch on and off.

#### Scope
**In:** telemetry event catalogue + field allow-list; deny-by-default serialiser with redaction fuzzing; redacted ring-buffer log sink; sanitised crash capture from every Dart error entrypoint; on-device coarse-bucket aggregation; kill switch / queue purge / transmission state machine; redacted diagnostics-bundle export; rotating resettable install token; zero-egress CI gate; crash-backend decision spike; crash upload adapter; opt-in field performance metrics; release symbolication pipeline; a PR gate requiring privacy review of every new event.
**Out:** the consent toggle and 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009)), the CI ban on analytics/ad SDKs ([SN-PRV-010](privacy.md#sn-prv-010)), the Apple Privacy Manifest and Required-Reason API audit ([SN-PRV-014](privacy.md#sn-prv-014)), the CI perf gates themselves ([SN-PERF-003](perf.md#sn-perf-003)), and any server-side dashboarding.

#### Acceptance criteria
- [ ] [SN-TEL-002](telemetry.md#sn-tel-002) Telemetry event catalogue + field allow-list defined and documented
- [ ] [SN-TEL-003](telemetry.md#sn-tel-003) Deny-by-default telemetry serialiser with redaction property/fuzz tests
- [ ] [SN-TEL-004](telemetry.md#sn-tel-004) Redacted in-memory ring-buffer diagnostics log sink
- [ ] [SN-TEL-005](telemetry.md#sn-tel-005) Sanitised crash capture from all Dart error entrypoints
- [ ] [SN-TEL-006](telemetry.md#sn-tel-006) On-device coarse-bucket aggregation of counters and histograms
- [ ] [SN-TEL-007](telemetry.md#sn-tel-007) Kill switch, queue purge and transmission state machine
- [ ] [SN-TEL-008](telemetry.md#sn-tel-008) Redacted diagnostics bundle export for support
- [ ] [SN-TEL-009](telemetry.md#sn-tel-009) Rotating, resettable install token with no stable identifier
- [ ] [SN-TEL-010](telemetry.md#sn-tel-010) CI gate proving zero telemetry egress before opt-in
- [ ] [SN-TEL-011](telemetry.md#sn-tel-011) Crash-backend decision spike (self-hosted Sentry vs Crashlytics vs DIY)
- [ ] [SN-TEL-012](telemetry.md#sn-tel-012) Opt-in crash-report upload adapter and transport
- [ ] [SN-TEL-013](telemetry.md#sn-tel-013) Opt-in field performance metrics against the decision-7 budgets
- [ ] [SN-TEL-014](telemetry.md#sn-tel-014) Release symbolication pipeline for obfuscated crash reports
- [ ] [SN-TEL-015](telemetry.md#sn-tel-015) PR gate requiring privacy review of every new telemetry event

#### Technical notes
Pure-Dart mechanics (catalogue, allow-list serialiser, ring buffer, aggregation, bundle assembly) live in `packages/sane_core/lib/src/telemetry/` next to the `SaneLog` facade (docs/architecture/overview.md section 8.2); anything needing Flutter or platform APIs (error hooks, share sheet, network, secure store) lives in `app/lib/telemetry/` and the `sane_secure_store` plugin — `sane_core` must never import `package:flutter` (CLAUDE.md section 3 DAG). Config comes from `--dart-define` (`SANE_TELEMETRY_DEFAULT`, `SANE_LOG_LEVEL`, `SANE_FLAVOR`) per overview section 7.1 and [SN-FND-005](devx.md#sn-fnd-005). Implements ADR-0011 decisions 1-8 and its seven 'How to verify' items.

#### Security & privacy
Threats: TM-I-05 (content/keys/PII written to logs or diagnostics), TM-P-06 (user unaware what is processed), TM-P-01/TM-P-02/TM-P-04 (linkability/identifiability/detectability through identifiers and timing), TM-P-07 (GDPR/DPDP/COPPA non-compliance), TM-R-03 (user cannot prove what left the device). Controls: MASVS-PRIVACY-1..4, MASVS-STORAGE-1 (queued records at rest), MASVS-NETWORK-1 (TLS-only egress), ASVS V14 (data protection), ASVS V16 (logging and error handling), OWASP-A09, CWE-532 (sensitive info in logs), CWE-359 (private info exposure). Baseline for every child: no note content, ink coordinates, decrypted data, keys, tokens, recovery codes, cloud file paths, email or phone numbers are ever logged or transmitted; object ids appear only as opaque short hashes.

#### UX notes
User-visible surfaces are the Settings screen, **Privacy & export** tab (design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12): the telemetry opt-in ([SN-PRV-009](privacy.md#sn-prv-009)) and **Export diagnostics** ([SN-TEL-008](telemetry.md#sn-tel-008)). Both use `sane_ui` tokens, render correctly in all **17 looks plus light/dark**, and meet docs/design/accessibility.md (Semantics labels, 44pt/48dp targets, contrast >= 4.5:1, keyboard reachable on web). Copy is plain, student-readable and never alarming; when telemetry is off the surface says so explicitly.

#### Test plan
Tracked across children: `packages/sane_core/test/telemetry/` (catalogue, serialiser, ring buffer, aggregation), `app/test/telemetry/` (crash capture, kill switch, install token), `app/integration_test/telemetry_zero_egress_test.dart` (ADR-0011 verify item 1), golden tests for the diagnostics-export screen across looks, and the CI jobs added by [SN-TEL-010](telemetry.md#sn-tel-010) and [SN-TEL-015](telemetry.md#sn-tel-015).

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold), [SN-FND-005](devx.md#sn-fnd-005) (flavours and --dart-define matrix), [SN-PRV-009](privacy.md#sn-prv-009) (consent authority), [SN-CRY-002](security.md#sn-cry-002) (secure store for the install token), [SN-PERF-002](perf.md#sn-perf-002) (perf metric definitions).

#### Definition of done
- [ ] All 14 child issues closed; a fresh install provably transmits nothing before opt-in
- [ ] ADR-0011 'How to verify' items 1-7 each covered by an automated test or documented gate
- [ ] docs/security/controls-matrix.md MASVS-PRIVACY rows and docs/security/threat-model.md TM-I-05 / TM-P-06 rows updated to Implemented where behaviour changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TEL-002

<a id="sn-tel-002"></a>

**Define the telemetry event catalogue and field allow-list**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | telemetry, privacy |
| Size | S |
| SDLC | design |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `ASVS-V14`, `TM-P-06`, `TM-I-05`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design, good first issue |

#### Context
ADR-0011 decision 4 requires a **hard redaction allow-list (deny by default)** so that a new field cannot be exfiltrated by accident, and decision 8 requires a 'what we collect' screen that lists every metric verbatim. Both need one machine-readable source of truth, authored before any collection code exists, otherwise the screen and the serialiser will drift apart. This issue defines that catalogue: every event name, every field on it, the field type, its bucketing rule, the retention window and the plain-English sentence shown to the user. ADR-0011 decision 3 fixes what may ever be collected after opt-in: aggregate content-free counters and performance traces such as wet-ink p95 latency bucket, cold-start ms bucket, frames over 16.7 ms while writing, feature X used N times this week, and crash type plus symbol-only stack.
The catalogue is consumed by the serialiser ([SN-TEL-003](telemetry.md#sn-tel-003)), the aggregator ([SN-TEL-006](telemetry.md#sn-tel-006)), the 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009)) and the PR gate ([SN-TEL-015](telemetry.md#sn-tel-015)). It implements `PRD-TEL-002` and `PRD-TEL-003` from docs/product/prd-03-identity-sync-privacy-settings-billing.md section 11.

#### Scope
**In:** `docs/security/telemetry-catalogue.md` (human-readable table, one row per field, with the verbatim user-facing sentence) and a matching const Dart catalogue in `packages/sane_core/lib/src/telemetry/telemetry_catalogue.dart`; bucket boundary definitions; the initial event set (app lifecycle, ink latency, frame jank, cold start, notebook open, feature-use counters, crash type); the retention window per event; the explicit **deny list** restating what may never appear.
**Out:** the serialiser ([SN-TEL-003](telemetry.md#sn-tel-003)), aggregation windows ([SN-TEL-006](telemetry.md#sn-tel-006)), any UI, and any upload.

#### Acceptance criteria
- [ ] Every catalogue entry carries: event name, field name, type (counter | bucketed histogram | enum | version string), bucket boundaries, retention window, and a one-sentence user-facing description.
- [ ] No entry permits a free-text field, a raw timestamp finer than ISO-week granularity, a stable device or user identifier, or any note-derived value; the document states this as an invariant.
- [ ] The Dart catalogue is a `const` structure with no `dynamic` in its public API and is unit-testable without Flutter (`sane_core` is pure Dart).
- [ ] Every event lists the ADR-0011 decision-3 category it belongs to (usage counter, performance trace, crash record).
- [ ] The initial set covers at minimum: cold start bucket, pen-to-pixel p95 bucket per ink tier, frames over 16.7 ms count bucket, notebook-open bucket, per-feature weekly use counters, crash type + symbol-only stack, app version, flavour, OS major version, device class.
- [ ] Doc and Dart constant are asserted identical by a test, so they cannot drift.
- [ ] A short 'how to add an event' section points at [SN-TEL-015](telemetry.md#sn-tel-015) (privacy review gate).

#### Technical notes
Author the Dart side as `const List<TelemetryEventSpec>` with `TelemetryFieldSpec` value objects (immutable, `final`, dartdoc on every public member per CLAUDE.md section 6). Device class means a coarse bucket (for example `tablet-high`, `tablet-mid`, `phone-low`, `web-desktop`) drawn from docs/platform/compatibility-matrix.md, never a model string plus serial. Performance field names must line up with the budget IDs B1-B10 in docs/platform/performance-budgets.md section 1 so [SN-TEL-013](telemetry.md#sn-tel-013) and [SN-PERF-002](perf.md#sn-perf-002) speak the same language. Keep the catalogue in `sane_core` because every layer may emit events and the package sits below the feature packages in the DAG (CLAUDE.md section 3).

#### Security & privacy
Threats: TM-I-05 (content or PII reaching diagnostics), TM-P-06 (unawareness), TM-P-01/TM-P-02 (linkability/identifiability from identifiers or high-resolution timing). Controls: MASVS-PRIVACY-2 (collection transparency), MASVS-PRIVACY-4 (third-party sharing restrictions), ASVS V14, CWE-359. The catalogue is itself the control: deny-by-default means a field that is not listed here can never be serialised. Baseline: no note content or tokens anywhere; ids only as opaque short hashes.

#### UX notes
No UI in this issue, but the user-facing sentence column *is* the copy rendered by the 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009), Settings > Privacy & export in design/Sane Notes.dc.html). Write each sentence in student-readable plain English, no jargon, no marketing ('How long the app took to open, rounded to the nearest half second'). Long lists must stay scannable at phone width, so keep sentences under ~90 characters.

#### Test plan
- Unit: `packages/sane_core/test/telemetry/telemetry_catalogue_test.dart` — no free-text fields; every field has bucket boundaries and a description; names unique; doc table and Dart constant match (parse the markdown table in the test).
- Manual: Security/Privacy Owner reviews the catalogue against ADR-0011 decision 3 and 4 before merge.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (monorepo scaffold so `sane_core` exists).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/security/telemetry-catalogue.md published and linked from ADR-0011 and docs/security/controls-matrix.md
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TEL-003

<a id="sn-tel-003"></a>

**Implement the deny-by-default telemetry serialiser with redaction fuzzing**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | telemetry, privacy, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-002](telemetry.md#sn-tel-002) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `MASVS-CODE-3`, `ASVS-V14`, `ASVS-V16`, `OWASP-A09`, `TM-I-05`, `TM-P-01`, `CWE-532`, `CWE-359`, `CWE-200` |
| Extra labels | agent-ready, sec: privacy-by-design, sec: masvs |

#### Context
ADR-0011 decision 4 makes data minimisation an enforced code property rather than a policy: 'the telemetry serialiser uses a field allow-list (deny by default), so a new field cannot be exfiltrated by accident'. ADR-0011 'How to verify' item 3 requires allow-list unit tests that fuzz the serialiser with note content, keys and emails and assert none of it appears in the output; item 4 requires the same property for the diagnostics-bundle exporter and log sinks. This is the single highest-value control in the telemetry area — every other component ([SN-TEL-004](telemetry.md#sn-tel-004) ring buffer, [SN-TEL-005](telemetry.md#sn-tel-005) crash records, [SN-TEL-006](telemetry.md#sn-tel-006) aggregates, [SN-TEL-008](telemetry.md#sn-tel-008) diagnostics bundle, [SN-TEL-012](telemetry.md#sn-tel-012) upload) serialises through it, so one correct implementation protects all of them.
It implements `PRD-TEL-002` ('stripped of note content and stable identifiers... crash reports MUST scrub file paths, note titles, and tokens') and the logging policy in docs/architecture/overview.md section 8.2.

#### Scope
**In:** `TelemetrySerialiser` in `packages/sane_core/lib/src/telemetry/` that takes an event name plus typed fields and returns either an allow-listed, bucketed, canonical JSON map or a `Failure`; drop-and-count behaviour for unknown fields; bucketing of numerics; truncation of timestamps to ISO week; opaque short-hash rendering of object ids; a shared `redact()` helper used by the log sink and bundle exporter; property-based and corpus fuzz tests.
**Out:** the catalogue itself ([SN-TEL-002](telemetry.md#sn-tel-002)), aggregation windows ([SN-TEL-006](telemetry.md#sn-tel-006)), transport ([SN-TEL-012](telemetry.md#sn-tel-012)), and the consent gate ([SN-PRV-009](privacy.md#sn-prv-009)).

#### Acceptance criteria
- [ ] A field whose name is not in the catalogue is **dropped**, never emitted, and counted in a local `droppedFieldCount` diagnostic (itself content-free).
- [ ] A field whose value type does not match the catalogue spec is dropped, not coerced.
- [ ] Numeric fields are emitted only as catalogue bucket labels; a raw value never reaches the output (assert on 10,000 random values that output cardinality equals the bucket count).
- [ ] Timestamps are truncated to ISO week; no field in the output can order two events within a session.
- [ ] Object ids are emitted as a salted 8-character hash; the same id in two different runs of a fresh install does not produce the same hash (salt is per install, from [SN-TEL-009](telemetry.md#sn-tel-009)).
- [ ] Fuzz test: given a corpus of note text (including Devanagari and Arabic), ink coordinate lists, base64 keys, JWTs, emails, +91 phone numbers, file paths and URLs injected into every field position, the serialised output contains **zero** substrings of length >= 6 from the corpus.
- [ ] Serialisation of a 200-field event completes in < 1 ms on the reference CI runner and never runs on the UI isolate hot path.
- [ ] Errors are returned as `Result<T, Failure>` (`TelemetryFailure`), never thrown across the package boundary (CLAUDE.md section 6).

#### Technical notes
Pure Dart in `sane_core` (no `package:flutter`). Public API: `Result<Map<String, Object>, TelemetryFailure> serialise(TelemetryEvent event)`. Implement the deny-by-default check as a lookup in the `const` catalogue from [SN-TEL-002](telemetry.md#sn-tel-002) — never reflection, never `dynamic` (MASVS-CODE-4 bans dynamic deserialisation patterns). Reuse the same `redact()` for the `SaneLog` structured-field allow-list described in docs/architecture/overview.md section 8.2 so there is exactly one redaction implementation in the codebase. Property tests can use a small hand-rolled generator; if a package is added it must clear [SN-PRV-010](privacy.md#sn-prv-010)'s dependency policy and the SBOM.

#### Security & privacy
Threats: TM-I-05 (note content, keys, tokens, PII written to logs or diagnostics), TM-P-01 (linkability through ids or timing), TM-P-04 (detectability through precise timestamps). Controls: MASVS-PRIVACY-2/4, MASVS-CODE-3 (code-quality/injection prevention), ASVS V14 (data protection) and V16 (logging without sensitive data), OWASP-A09, CWE-532, CWE-359, CWE-200. Fail-closed: on any catalogue mismatch the serialiser drops the field rather than passing it through, and on catalogue corruption it returns a `Failure` and emits nothing. This issue is p0 because a defect here silently breaks the 'no data collected' store declaration.

#### UX notes
No direct UI. The behaviour is visible indirectly in the 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009)) and in the diagnostics bundle preview ([SN-TEL-008](telemetry.md#sn-tel-008)), both in Settings > Privacy & export (design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12); both must be able to render the serialiser's exact output so the user sees the truth. None beyond that baseline.

#### Test plan
- Unit: `packages/sane_core/test/telemetry/telemetry_serialiser_test.dart` — unknown field dropped; type mismatch dropped; bucketing; week truncation; hash salting; Result error paths.
- Property/fuzz: `packages/sane_core/test/telemetry/telemetry_redaction_fuzz_test.dart` — the hostile corpus above, >= 1,000 iterations, asserting zero leakage; corpus fixture in `packages/sane_core/test/fixtures/redaction_corpus.dart` (synthetic data only, no real PII).
- Perf: micro-benchmark asserting the < 1 ms bound.

#### Dependencies
[SN-TEL-002](telemetry.md#sn-tel-002) (catalogue), and [SN-TEL-009](telemetry.md#sn-tel-009) for the per-install hash salt (the serialiser accepts the salt as a parameter so it can land first).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, Semgrep, mobsfscan)
- [ ] ADR-0011 verify items 3 and 4 demonstrably covered by the named tests
- [ ] docs/security/controls-matrix.md MASVS-PRIVACY-2/4 rows moved toward Implemented
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER

---

### SN-TEL-004

<a id="sn-tel-004"></a>

**Implement the redacted in-memory ring-buffer diagnostics log sink**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | telemetry, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-003](telemetry.md#sn-tel-003), [SN-FND-005](devx.md#sn-fnd-005) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-3`, `ASVS-V16`, `OWASP-A09`, `TM-I-05`, `CWE-532`, `CWE-312` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
docs/architecture/overview.md section 8.2 fixes the sinks per flavour: dev logs pretty-printed to console at trace level, while **beta and release write to an in-memory ring buffer the user can export as a redacted diagnostics bundle**, plus an opt-in sanitised crash report. ADR-0011 decision 5 builds the 'Export diagnostics' feature on exactly that buffer: levels, event names, sanitised fields, device model, OS, app version, flavour. Without the buffer there is no way to debug a beta user's problem without either shipping an analytics SDK (forbidden) or writing logs to disk (a new at-rest asset we do not want). Keeping it in memory only means a crash or a kill switch discards it, which is the privacy-preferred default.
This issue implements the sink behind the existing `SaneLog` facade in `sane_core` so no call site changes, and it is the data source for [SN-TEL-008](telemetry.md#sn-tel-008) (bundle export) and [SN-TEL-005](telemetry.md#sn-tel-005) (crash context).

#### Scope
**In:** a fixed-capacity ring buffer in `packages/sane_core/lib/src/telemetry/`; registration as the `SaneLog` sink for beta/release (console sink stays for dev); level filtering from `SANE_LOG_LEVEL`; structured-field redaction through [SN-TEL-003](telemetry.md#sn-tel-003); capacity and byte caps with oldest-first eviction; a read API that returns an immutable snapshot; a `clear()` used by the kill switch ([SN-TEL-007](telemetry.md#sn-tel-007)).
**Out:** the bundle file format and share sheet ([SN-TEL-008](telemetry.md#sn-tel-008)), crash records ([SN-TEL-005](telemetry.md#sn-tel-005)), any disk persistence, any upload.

#### Acceptance criteria
- [ ] Buffer holds at most 2,000 entries **and** at most 512 KB; whichever cap is reached first evicts oldest-first, and a counter records how many entries were dropped.
- [ ] Entries store level, monotonic sequence number, ISO-week-truncated time, event name and redacted structured fields only — never an interpolated free-text message.
- [ ] Every field passes through the [SN-TEL-003](telemetry.md#sn-tel-003) redactor before entering the buffer, so the buffer itself can never hold note content, coordinates, keys, tokens, paths, email or phone numbers.
- [ ] Nothing is written to disk: a test asserts no file handle is opened by the sink, and the buffer is gone after process restart.
- [ ] Level filtering honours `SANE_LOG_LEVEL` (dev trace, beta info, release warn per overview section 7.1); a filtered-out call allocates nothing.
- [ ] Appending 10,000 entries costs < 20 ms total on the CI runner, and the draw loop in profile/release logs nothing at all (asserted by [SN-PERF-002](perf.md#sn-perf-002)'s no-log assertion where available).
- [ ] `clear()` leaves the buffer empty and resets counters; a snapshot taken before `clear()` is unaffected (immutability).

#### Technical notes
Implement as a pre-allocated circular list of immutable `LogRecord` value objects, no growth allocation per append. Register in the app bootstrap (`app/lib/bootstrap/`) rather than in `sane_core` so flavour selection lives with the composition root (docs/architecture/overview.md section 7 and ADR-0003). Do not make it a mutable global singleton — expose it through a Riverpod provider in `app/` per CLAUDE.md section 6. Web note: Dart isolates map to Web Workers, so the buffer is per-isolate; expose a merge on read so storage/sync/search isolate records appear in the bundle (docs/architecture/overview.md section 6).

#### Security & privacy
Threats: TM-I-05 (diagnostics leakage). Controls: MASVS-STORAGE-1 (nothing sensitive at rest — here satisfied by holding nothing at rest at all), MASVS-PRIVACY-3 (retention and user control: bounded, memory-only, clearable), ASVS V16 (logging without sensitive data), OWASP-A09, CWE-532, CWE-312 (cleartext storage — avoided by not storing). The buffer must stay memory-only precisely so that a device seizure or an OS backup cannot yield diagnostics (`PRD-LEAK-005`).

#### UX notes
No direct UI; it feeds Settings > Privacy & export > Export diagnostics ([SN-TEL-008](telemetry.md#sn-tel-008), design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12). The empty-buffer case must be representable so that screen can show 'Nothing to report yet'. None beyond baseline (no content logged, tokens never logged).

#### Test plan
- Unit: `packages/sane_core/test/telemetry/ring_buffer_sink_test.dart` — capacity and byte eviction, drop counter, level filtering, immutability of snapshots, `clear()`.
- Unit: `packages/sane_core/test/telemetry/ring_buffer_redaction_test.dart` — hostile corpus (shared with [SN-TEL-003](telemetry.md#sn-tel-003)) never appears in a snapshot.
- Widget/integration: `app/test/telemetry/log_sink_wiring_test.dart` — dev uses console, beta/release use the ring buffer; `SANE_LOG_LEVEL` respected.

#### Dependencies
[SN-TEL-003](telemetry.md#sn-tel-003) (redaction), [SN-FND-005](devx.md#sn-fnd-005) (flavours and --dart-define matrix).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] docs/architecture/overview.md section 8.2 updated if the sink contract changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TEL-005

<a id="sn-tel-005"></a>

**Capture sanitised crash records from every Dart error entrypoint**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | telemetry, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-003](telemetry.md#sn-tel-003), [SN-TEL-004](telemetry.md#sn-tel-004) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-STORAGE-1`, `MASVS-CODE-3`, `ASVS-V16`, `OWASP-A09`, `TM-I-05`, `TM-P-06`, `CWE-532`, `CWE-209` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
ADR-0011 decision 2 rules out third-party crash SDKs as the *capture* mechanism: 'crash capture uses our own handlers (`FlutterError.onError`, `PlatformDispatcher.instance.onError`, per-isolate error listeners) feeding a sanitised crash record'. docs/architecture/overview.md section 8.1 says the same thing from the error-handling side: those three hooks plus `Isolate.current.addErrorListener` funnel into the sanitised crash recorder. Capturing locally and sanitising before any backend sees the data is what lets a crash backend (decided in [SN-TEL-011](telemetry.md#sn-tel-011), wired in [SN-TEL-012](telemetry.md#sn-tel-012)) receive **only** the redacted payload, and what keeps crash reporting honest with the Play Data Safety declaration (opt-in crash reports, nothing else).
This issue builds the recorder and its local pending queue; nothing is transmitted here. It implements `PRD-TEL-002` (crash reports MUST scrub file paths, note titles and tokens) and ADR-0011 decision 6.

#### Scope
**In:** installing `FlutterError.onError`, `PlatformDispatcher.instance.onError`, `runZonedGuarded` and `Isolate.current.addErrorListener` in the app bootstrap; building a `CrashRecord` from exception type, sanitised stack, app version, flavour, OS major version, device class, ink tier and the rotating install token; a bounded on-device pending queue; reporting through `Result`/`Failure` codes rather than raw exception strings.
**Out:** native (Swift/Kotlin) crash capture and upload ([SN-TEL-012](telemetry.md#sn-tel-012) after the [SN-TEL-011](telemetry.md#sn-tel-011) decision), symbolication ([SN-TEL-014](telemetry.md#sn-tel-014)), the consent toggle ([SN-PRV-009](privacy.md#sn-prv-009)).

#### Acceptance criteria
- [ ] All four Dart error entrypoints are installed at bootstrap; a thrown error in a widget build, in an async gap, in a spawned isolate and in a platform-dispatcher callback each produce exactly one `CrashRecord`.
- [ ] The record contains: exception runtime type, `Failure` machine code where the error is a `Failure`, symbol-only stack frames, app version, flavour, OS major version, device class, ink tier, install token. Nothing else.
- [ ] Exception **messages** are dropped unless the exception is a `Failure` with an allow-listed machine code — a test throws `StateError('note text: Riya chemistry notes')` and asserts the note text never appears.
- [ ] Stack frames are stripped of absolute file paths and user home directories; only package-relative paths or obfuscated symbols survive.
- [ ] Records are queued locally (max 20, oldest evicted), stored in app-private storage with platform data protection, and are **never** transmitted while consent is off — with consent off the queue accepts records but a network interceptor test sees zero requests.
- [ ] Disabling telemetry purges the queue via [SN-TEL-007](telemetry.md#sn-tel-007) within 100 ms.
- [ ] The recorder itself never throws; a failure inside it is swallowed and counted, and it never blocks app startup by more than 5 ms.
- [ ] In release the app still shows a user-safe error UI (localised message key), never a raw exception string (ASVS V16, CWE-209).

#### Technical notes
Live in `app/lib/telemetry/crash_recorder.dart` (needs Flutter, so not `sane_core`); build the record through [SN-TEL-003](telemetry.md#sn-tel-003)'s serialiser, and attach the last N ring-buffer entries from [SN-TEL-004](telemetry.md#sn-tel-004) as redacted breadcrumbs. Queue storage uses the app-private directory with iOS Data Protection (complete-until-first-unlock) and Android FBE defaults, excluded from OS backups per `PRD-LEAK-005`. Release builds run `--obfuscate --split-debug-info`, so stacks are obfuscated by construction; keep the build-id so [SN-TEL-014](telemetry.md#sn-tel-014) can symbolicate. Wire bootstrap per ADR-0003 composition-root guidance.

#### Security & privacy
Threats: TM-I-05 (content/keys/PII in crash payloads), TM-P-06 (collection the user did not expect). Controls: MASVS-PRIVACY-2, MASVS-STORAGE-1 (queue at rest), MASVS-CODE-3, ASVS V16, OWASP-A09, CWE-532, CWE-209 (error message exposure). Fail-closed: if serialisation of a record fails, drop the record rather than fall back to `toString()`. The queue must be small and purgeable so a user who never opts in accumulates nothing meaningful.

#### UX notes
Crash reporting is invisible until the user opts in ([SN-PRV-009](privacy.md#sn-prv-009), Settings > Privacy & export, design/Sane Notes.dc.html). After a crash the app must return to a calm state using `sane_ui` error components in all **17 looks plus light/dark** — never a red Flutter error box in release. The user-safe error surface needs Semantics labels, 44pt/48dp actions and >= 4.5:1 contrast (docs/design/accessibility.md), and the message must be localisable (no English-only exception text).

#### Test plan
- Unit: `app/test/telemetry/crash_recorder_test.dart` — record shape; message dropping; path stripping; queue cap and eviction; recorder never throws.
- Widget: `app/test/telemetry/crash_error_ui_test.dart` — release-mode error UI shows a localised user-safe message.
- Integration: `app/integration_test/crash_capture_test.dart` — errors from widget build, async gap, isolate and platform dispatcher are each captured once, and zero network requests occur with consent off.

#### Dependencies
[SN-TEL-003](telemetry.md#sn-tel-003) (serialiser), [SN-TEL-004](telemetry.md#sn-tel-004) (breadcrumbs). Soft, may land after: [SN-TEL-009](telemetry.md#sn-tel-009) (install token — until then records are ungrouped) and [SN-TEL-007](telemetry.md#sn-tel-007) (purge API — until then the queue is cleared manually).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/integration, security scans)
- [ ] ADR-0011 decision 2 and 6 behaviour matches the implementation; docs/architecture/overview.md section 8.1 updated if hooks changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TEL-006

<a id="sn-tel-006"></a>

**Aggregate usage and performance metrics on-device into coarse buckets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | telemetry, privacy, perf |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-002](telemetry.md#sn-tel-002), [SN-TEL-003](telemetry.md#sn-tel-003), [SN-CORE-004](storage.md#sn-core-004) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-STORAGE-1`, `ASVS-V14`, `TM-P-01`, `TM-P-04`, `TM-I-05`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design, innovation |

#### Context
ADR-0011 decision 3 requires **on-device aggregation first**: after opt-in the app may collect aggregate, content-free counters and performance traces, aggregated locally into coarse buckets, and may transmit only summaries — 'never per-event streams, never timestamps precise enough to reconstruct activity'. `PRD-TEL-002` says the same in normative form: aggregated on-device first (counts/histograms, not raw events). This is what makes the telemetry design genuinely different from an analytics SDK: even after a user opts in, the raw event stream never exists outside the device, so there is nothing to subpoena, leak or correlate.
This issue builds the aggregator: a per-window store of counters and histograms defined by the catalogue ([SN-TEL-002](telemetry.md#sn-tel-002)), rolled up per ISO week, with cardinality caps so a bug cannot turn it into an event log. It feeds [SN-TEL-012](telemetry.md#sn-tel-012) (crash/metric upload) and [SN-TEL-013](telemetry.md#sn-tel-013) (field performance metrics), and is purged by [SN-TEL-007](telemetry.md#sn-tel-007).

#### Scope
**In:** `TelemetryAggregator` in `packages/sane_core/lib/src/telemetry/`; counter and histogram accumulation against catalogue bucket boundaries; ISO-week rollup windows; a persisted summary (via a repository interface implemented on the storage isolate); cardinality and size caps; `snapshot()` and `purge()` APIs; deterministic bucketing tests.
**Out:** the transport ([SN-TEL-012](telemetry.md#sn-tel-012)), perf metric sourcing from the harness ([SN-TEL-013](telemetry.md#sn-tel-013), [SN-PERF-002](perf.md#sn-perf-002)), the consent gate ([SN-PRV-009](privacy.md#sn-prv-009)), and any server-side rollup.

#### Acceptance criteria
- [ ] Recording an event increments a counter or a histogram bucket only; no per-event row is ever stored (a test records 100,000 events and asserts stored rows <= the catalogue's bucket count).
- [ ] Windows are ISO weeks; the summary carries the week label and no finer time field.
- [ ] Bucketing is deterministic and matches the catalogue boundaries exactly, including edge values on boundaries (inclusive-lower, exclusive-upper, documented).
- [ ] Total persisted telemetry state stays under 64 KB and under a fixed row cap; exceeding either drops new *series* (not silently reallocating) and records a drop counter.
- [ ] Aggregation runs off the UI isolate (storage isolate or `Isolate.run`) and never on the draw hot path (docs/architecture/overview.md section 6 and CLAUDE.md section 8).
- [ ] With consent off, recording is a no-op that allocates nothing — asserted by a test, so an un-opted-in user pays zero cost.
- [ ] `purge()` removes all windows and counters and is idempotent; a snapshot taken earlier is unaffected.
- [ ] Aggregates older than the catalogue retention window (default 8 weeks) are dropped automatically on the next write.

#### Technical notes
Pure Dart in `sane_core`; persistence goes through a `TelemetryStore` repository interface implemented in `app/` over drift (`PRD-STOR-001`) so `sane_core` keeps no I/O. Run writes on the storage isolate (docs/architecture/overview.md section 6). Values arriving from the perf harness use the B1-B10 names from docs/platform/performance-budgets.md section 1 so [SN-TEL-013](telemetry.md#sn-tel-013) can attach field data to the same budgets CI gates on ([SN-PERF-003](perf.md#sn-perf-003)). Keep the API `Result`-returning and immutable-value-object based (CLAUDE.md section 6); no mutable global singleton — expose via a Riverpod provider in `app/`.

#### Security & privacy
Threats: TM-P-01 (linkability — defeated by removing per-event timing and ids), TM-P-04 (detectability — coarse weekly windows hide activity shape), TM-I-05 (content leakage — impossible because only catalogue-defined numeric buckets are stored), TM-P-03 (non-repudiation harm — no attributable action log). Controls: MASVS-PRIVACY-2/3, MASVS-STORAGE-1 (the persisted summary sits in the app-private encrypted DB), ASVS V14, CWE-359. Fail-closed: an unknown series name is dropped by the serialiser before it reaches the aggregator.

#### UX notes
No direct UI. The aggregate categories are exactly what the 'what we collect' screen lists verbatim ([SN-PRV-009](privacy.md#sn-prv-009), Settings > Privacy & export in design/Sane Notes.dc.html and docs/design/screens-and-flows.md section 12), so bucket labels must be human-readable ('opened in under 1 second'), not raw ranges, when surfaced. None beyond baseline otherwise.

#### Test plan
- Unit: `packages/sane_core/test/telemetry/telemetry_aggregator_test.dart` — counter/histogram maths, boundary values, week rollup, retention drop, caps, `purge()` idempotence, no-op when disabled.
- Unit: `packages/sane_core/test/telemetry/aggregator_cardinality_test.dart` — 100,000 events produce bounded storage.
- Integration: `app/integration_test/telemetry_aggregation_test.dart` — aggregation happens off the UI isolate and does not add a frame over 16.7 ms while writing.

#### Dependencies
[SN-TEL-002](telemetry.md#sn-tel-002) (catalogue and buckets), [SN-TEL-003](telemetry.md#sn-tel-003) (serialiser), [SN-CORE-004](storage.md#sn-core-004) (drift persistence for the summary store).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/integration, security scans)
- [ ] ADR-0011 decision 3 reflected exactly; catalogue retention windows documented in docs/security/telemetry-catalogue.md
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TEL-007

<a id="sn-tel-007"></a>

**Implement the telemetry kill switch, queue purge and send state machine**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | telemetry, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-004](telemetry.md#sn-tel-004), [SN-TEL-005](telemetry.md#sn-tel-005), [SN-TEL-006](telemetry.md#sn-tel-006), [SN-PRV-009](privacy.md#sn-prv-009) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `MASVS-NETWORK-1`, `ASVS-V14`, `OWASP-A09`, `TM-P-06`, `TM-P-07`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
ADR-0011 decision 8 requires 'a single Settings toggle turns everything off and purges any queued data', and verify item 7 is a kill-switch test proving exactly that. `PRD-TEL-003` adds the legal framing: consent must be withdrawable at any time, withdrawal must stop collection immediately (India DPDP requires withdrawal to be as easy as granting), and the app should offer to delete already-sent aggregates where feasible. `PRD-DEL-003` extends this to account deletion — opt-in telemetry aggregates are deleted where feasible. `PRD-PRIV-005` and ADR-0011 decision 7 add the age gate: below the threshold, telemetry and crash reporting stay off and unofferable.
This issue owns the state machine and the purge API behind those promises; the toggle UI and the 'what we collect' copy belong to [SN-PRV-009](privacy.md#sn-prv-009), which calls into this.

#### Scope
**In:** a `TelemetryController` state machine (`disabled` -> `enabled` -> `queued` -> `sending` -> `sent`/`failed`) in `app/lib/telemetry/`; the `purgeAll()` API that clears the ring buffer ([SN-TEL-004](telemetry.md#sn-tel-004)), the crash queue ([SN-TEL-005](telemetry.md#sn-tel-005)) and the aggregates ([SN-TEL-006](telemetry.md#sn-tel-006)); age-gate suppression; offline queue TTL and size caps; exponential backoff; the default-off resolution from `SANE_TELEMETRY_DEFAULT`; a deletion request hook for [SN-PRV-006](privacy.md#sn-prv-006) account deletion.
**Out:** the toggle and 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009)), the actual HTTP transport ([SN-TEL-012](telemetry.md#sn-tel-012)), the zero-egress CI gate ([SN-TEL-010](telemetry.md#sn-tel-010)).

#### Acceptance criteria
- [ ] Initial state is `disabled` on dev, beta and release regardless of build (reads `SANE_TELEMETRY_DEFAULT`, which is `false` everywhere per docs/architecture/overview.md section 7.1); a corrupt or missing stored preference resolves to `disabled`.
- [ ] Flipping the kill switch off moves to `disabled`, cancels any in-flight send, and completes `purgeAll()` within 100 ms; a follow-up assertion finds zero queued crash records, zero aggregate rows and an empty ring buffer.
- [ ] After a purge, a subsequent opt-in starts from empty — no pre-consent data is ever sent retroactively.
- [ ] While `disabled`, every record/aggregate call is a no-op and no network client is constructed at all (not merely unused).
- [ ] Below the age threshold the controller reports `unofferable`; the toggle cannot be enabled programmatically, and a test asserts an attempt fails closed.
- [ ] Queued items expire after 14 days or 200 KB, whichever first; expiry drops oldest-first and is recorded as a content-free counter.
- [ ] Send failures back off exponentially (1 min, 2, 4, ... capped at 6 h) and never retry more than 5 times before dropping.
- [ ] Account deletion ([SN-PRV-006](privacy.md#sn-prv-006)) triggers `purgeAll()` plus a best-effort server-side delete request, and reports partial completion honestly to the caller.

#### Technical notes
Riverpod `Notifier` in `app/lib/telemetry/telemetry_controller.dart`; consent truth comes from `ConsentController` ([SN-PRV-003](privacy.md#sn-prv-003)/[SN-PRV-009](privacy.md#sn-prv-009)) — this controller subscribes, it does not own consent. State is an immutable sealed union (Dart 3 `sealed class` + `switch`) per CLAUDE.md section 6, and all operations return `Result<Unit, TelemetryFailure>`. The purge must be transactional across the three stores so a crash mid-purge cannot leave orphan records; run store deletes on the storage isolate. Implements ADR-0011 decisions 1, 7, 8 and verify item 7.

#### Security & privacy
Threats: TM-P-06 (unawareness), TM-P-07 (GDPR/DPDP/COPPA non-compliance — consent withdrawal and minor protection are legal obligations, docs/security/controls-matrix.md section 7), TM-I-05 (residual queued data). Controls: MASVS-PRIVACY-1 (consent management), MASVS-PRIVACY-3 (retention and user control), MASVS-NETWORK-1 (no client constructed while disabled), ASVS V14, OWASP-A09, CWE-359. Fail-closed default: anything ambiguous resolves to `disabled`.

#### UX notes
The visible control is the telemetry toggle in Settings > Privacy & export ([SN-PRV-009](privacy.md#sn-prv-009), design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12). This issue must expose the states that screen renders: off ('Telemetry is off. Nothing is collected.'), on, queued-offline ('Waiting for a connection'), and unofferable (control hidden entirely below the age gate). States render in all **17 looks plus light/dark** with `sane_ui` tokens, Semantics labels, 44pt/48dp targets, >= 4.5:1 contrast, keyboard reachable on web (docs/design/accessibility.md).

#### Test plan
- Unit: `app/test/telemetry/telemetry_controller_test.dart` — default disabled; corrupt pref fails closed; state transitions; backoff schedule; TTL and size expiry; unofferable below age gate.
- Unit: `app/test/telemetry/telemetry_purge_test.dart` — purge clears all three stores; transactional under simulated mid-purge failure.
- Integration: `app/integration_test/telemetry_kill_switch_test.dart` — opt in, generate data, kill switch, assert zero residue and zero further egress (ADR-0011 verify item 7).

#### Dependencies
[SN-TEL-004](telemetry.md#sn-tel-004), [SN-TEL-005](telemetry.md#sn-tel-005), [SN-TEL-006](telemetry.md#sn-tel-006) (the three stores it purges), [SN-PRV-009](privacy.md#sn-prv-009) (consent authority it subscribes to).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/integration, security scans)
- [ ] ADR-0011 verify item 7 covered; docs/security/controls-matrix.md consent/retention rows updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER

---

### SN-TEL-008

<a id="sn-tel-008"></a>

**Export a redacted diagnostics bundle for support from Settings**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | telemetry, privacy, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-003](telemetry.md#sn-tel-003), [SN-TEL-004](telemetry.md#sn-tel-004) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-PLATFORM-3`, `MASVS-STORAGE-1`, `ASVS-V14`, `TM-I-05`, `TM-R-03`, `CWE-532`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design, innovation |

#### Context
Because Sane Notes ships no always-on analytics, debugging a user's problem depends on the user handing us something — and ADR-0011 decision 5 defines exactly what: Settings > 'Export diagnostics' produces a **redacted** bundle from the in-memory ring-buffer log (levels, event names, sanitised fields, device model, OS, app version, flavour) that the user **reviews and shares manually**. It is never uploaded automatically. ADR-0011 verify item 4 requires a property-based test proving the exporter never emits note text, ink coordinates, keys, tokens, file paths, email or phone. This is also the concrete answer to TM-R-03 (the user cannot otherwise prove what left the device): here they see the entire payload before it moves.
The surface lives in Settings > Privacy & export alongside 'Export everything' (docs/design/screens-and-flows.md section 12, `PRD-SET-018`), and complements the privacy dashboard ([SN-PRV-002](privacy.md#sn-prv-002)).

#### Scope
**In:** bundle assembly (ring-buffer snapshot from [SN-TEL-004](telemetry.md#sn-tel-004), device class, OS version, app version, flavour, enabled feature flags, aggregate summary if telemetry is on); a **preview screen** showing the exact bundle text before sharing; JSON + a human-readable text rendering inside a single file; the OS share/save sheet hand-off; size cap and truncation; the Settings row and its copy.
**Out:** any automatic upload (forbidden), crash-report transport ([SN-TEL-012](telemetry.md#sn-tel-012)), the 'Export everything' notebook archive (`PRD-BKP-001`, library/sharing area).

#### Acceptance criteria
- [ ] 'Export diagnostics' appears in Settings > Privacy & export and is available on **all** flavours, with telemetry on or off (it is user-driven, not consent-gated).
- [ ] The preview screen shows the complete bundle content, scrollable, before any share action; the user must tap Share explicitly; Cancel discards.
- [ ] The bundle contains only: log records (level, sequence, ISO-week time, event name, redacted fields), device class, OS major version, app version + build, flavour, locale, ink tier, non-secret feature flags, and optional aggregate summary.
- [ ] Property test over the hostile corpus: no note text, ink coordinates, keys, tokens, recovery codes, cloud file paths, email or phone appears in a generated bundle (ADR-0011 verify item 4).
- [ ] Bundle is capped at 1 MB; beyond that the oldest records are dropped and the bundle states how many were omitted.
- [ ] Empty state: with an empty buffer the screen says 'Nothing to report yet' and the Share action is disabled (not hidden).
- [ ] Error state: if assembly fails, a user-safe message appears and nothing partial is shared; offline has no effect (the flow is entirely local).
- [ ] The bundle is written to a temporary file that is deleted after the share sheet closes; it is never placed in a user-visible cloud-synced directory by default.

#### Technical notes
Assembly is pure Dart in `packages/sane_core/lib/src/telemetry/diagnostics_bundle.dart` (testable headlessly); the screen and share sheet live in `app/lib/settings/privacy/diagnostics_export/` using `share_plus`-style platform hand-off through the existing plugin layer (CLAUDE.md section 3 — plugins are leaves). Everything passes through [SN-TEL-003](telemetry.md#sn-tel-003)'s redactor a second time at assembly, defence in depth. Run assembly in `Isolate.run` to keep the UI isolate free (docs/architecture/overview.md section 6). Implements ADR-0011 decision 5 and `PRD-TEL-003`'s transparency intent.

#### Security & privacy
Threats: TM-I-05 (diagnostics leakage — the entire point of the redaction pass), TM-R-03 (user cannot verify what leaves), TM-P-05 (disclosure if a bundle is over-shared). Controls: MASVS-PRIVACY-2 (transparency), MASVS-PRIVACY-3 (user control), MASVS-PLATFORM-3 (the temp file must not linger in a shared/backed-up location and the preview must respect the locked-profile screenshot rules, `PRD-LEAK-001`), MASVS-STORAGE-1, ASVS V14, CWE-532, CWE-359. The share copy must warn once, plainly, that the user is about to send this file to a person.

#### UX notes
Design: Settings screen, **Privacy & export** tab (design/Sane Notes.dc.html; docs/design/screens-and-flows.md section 12) — a row under 'Export everything' with a one-line description in the same voice ('A technical summary you can send us. No note content, ever.'). Preview uses monospace body text in a scrollable card; all **17 looks plus light/dark** must render it legibly (frosted panels when a wallpaper is set, `PRD-SET-021`). a11y: Semantics label on the row and the Share action, 44pt/48dp targets, contrast >= 4.5:1, keyboard reachable and focus-trapped preview on web, and the preview text must respect Dynamic Type (docs/design/accessibility.md).

#### Test plan
- Unit: `packages/sane_core/test/telemetry/diagnostics_bundle_test.dart` — content shape, 1 MB cap and omission note, empty bundle.
- Property: `packages/sane_core/test/telemetry/diagnostics_bundle_redaction_test.dart` — hostile corpus never leaks (ADR-0011 verify item 4).
- Widget + golden: `app/test/settings/diagnostics_export_test.dart` and goldens per look in `app/test/golden/diagnostics_export_<look>.png` — preview, empty state, error state, share disabled/enabled.
- Manual: export on iPad, Android tablet and Chrome; confirm the temp file is removed afterwards.

#### Dependencies
[SN-TEL-003](telemetry.md#sn-tel-003) (redaction), [SN-TEL-004](telemetry.md#sn-tel-004) (ring buffer), [SN-SET-001](settings.md#sn-set-001) (Settings host screen).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/widget/golden, security scans)
- [ ] ADR-0011 decision 5 and verify item 4 satisfied; docs/design/screens-and-flows.md section 12 updated with the new row
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TEL-009

<a id="sn-tel-009"></a>

**Add a rotating, resettable install token with no stable identifier**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | telemetry, privacy |
| Size | S |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-CRY-002](security.md#sn-cry-002), [SN-TEL-007](telemetry.md#sn-tel-007) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-1`, `ASVS-V14`, `TM-P-01`, `TM-P-02`, `CWE-359`, `CWE-1188` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
ADR-0011 decision 6 allows crash reports to carry 'a rotating, local, resettable install token at most' and explicitly forbids a stable user id or precise device identifier; decision 4 bans precise device identifiers from any telemetry payload. Without *some* grouping key, two crashes from one device look like two users and a crash storm is unreadable; with the wrong key (IDFV, ANDROID_ID, advertising id) the app becomes trackable and the Play Data Safety and Apple Privacy Manifest declarations stop being true (`PRD-PRIV-006`, [SN-PRV-014](privacy.md#sn-prv-014)). The compromise is a locally generated random token that rotates on a schedule and on user request, so short-term grouping works and long-term linkability does not.
The token is also the salt for the opaque object-id hashes produced by [SN-TEL-003](telemetry.md#sn-tel-003), which is what stops two installs producing the same hash for the same notebook id (TM-P-01 linkability).

#### Scope
**In:** generation of a 128-bit CSPRNG token; storage in the platform secure store via the `sane_secure_store` plugin; a 30-day rotation schedule plus rotation on kill-switch purge, on account deletion and on explicit user reset; exposure as the hash salt to [SN-TEL-003](telemetry.md#sn-tel-003); a `reset()` API for the 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009)); a negative test asserting no OS advertising/vendor identifier API is called anywhere in the app.
**Out:** the key hierarchy for note encryption ([SN-CRY-002](security.md#sn-cry-002)), the consent UI, and any server-side identity.

#### Acceptance criteria
- [ ] The token is 128 bits from a CSPRNG (`Random.secure()` / platform CSPRNG), never derived from any device, account, email, phone or hardware value.
- [ ] It is stored only in Keychain/Keystore through `sane_secure_store`, never in the notes DB, SharedPreferences/UserDefaults, logs, backups or the synced cloud store.
- [ ] It rotates automatically after 30 days, and immediately on: telemetry kill switch ([SN-TEL-007](telemetry.md#sn-tel-007)), account deletion ([SN-PRV-006](privacy.md#sn-prv-006)), and explicit user reset.
- [ ] After rotation, a new crash record carries the new token and there is no field linking old and new tokens (test asserts payload equality is impossible across a rotation).
- [ ] The token never appears in the diagnostics bundle ([SN-TEL-008](telemetry.md#sn-tel-008)) or in any log line.
- [ ] With telemetry disabled, no token is generated at all (a fresh, never-opted-in install has no token in the secure store).
- [ ] A static check/test asserts the codebase calls no advertising or vendor-identifier API (`ASIdentifierManager`, `identifierForVendor`, `Settings.Secure.ANDROID_ID`, Advertising ID) — feeding the Required-Reason API audit in [SN-PRV-014](privacy.md#sn-prv-014).
- [ ] Web surface: the token lives in memory plus an origin-scoped store, documented as a reduced guarantee (no hardware binding) consistent with `PRD-STOR-003` open decision 7.

#### Technical notes
Implement `InstallTokenStore` in `app/lib/telemetry/install_token.dart` over the `sane_secure_store` federated plugin (Keychain with `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`-style class so it never migrates to a new device via backup; Android Keystore-backed preference). Expose the salt to `sane_core`'s serialiser as a plain `String` parameter so the pure-Dart package keeps no platform dependency (CLAUDE.md section 3 DAG). Rotation bookkeeping stores only the rotation date, not a history. Cite ADR-0011 decision 4 and 6, ADR-0007 for secure-store usage patterns, and `PRD-AUTH-006`-adjacent secure-storage rules in `PRD-AUTH-006`/`PRD-KEY-002` for where secrets may live.

#### Security & privacy
Threats: TM-P-01 (linkability across time), TM-P-02 (identifiability from device identifiers), TM-I-05 (identifier leaking into logs). Controls: MASVS-PRIVACY-1/4, MASVS-STORAGE-2 (keys and secrets in the platform keystore), MASVS-CRYPTO-1 (CSPRNG only, never a non-cryptographic `Random`), ASVS V14, CWE-359, CWE-1188 (insecure default initialisation). Fail-closed: if secure storage is unavailable the app must run **without** a token and mark affected records ungrouped, never fall back to a device identifier.

#### UX notes
One visible control: a 'Reset the diagnostics id' action on the 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009), Settings > Privacy & export in design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12), with copy explaining it in one line ('Starts a new anonymous id. Old reports cannot be linked to new ones.'). Renders in all **17 looks plus light/dark**, 44pt/48dp target, Semantics label, >= 4.5:1 contrast, keyboard reachable on web (docs/design/accessibility.md). Confirmation toast on reset; no dialog needed (the action is harmless).

#### Test plan
- Unit: `app/test/telemetry/install_token_test.dart` — CSPRNG source, 30-day rotation, rotation on purge/reset, no token when telemetry disabled, unavailable-secure-store fallback is 'no token'.
- Unit: `app/test/telemetry/no_device_identifier_test.dart` — source scan asserts no advertising/vendor identifier API usage.
- Integration: `app/integration_test/install_token_rotation_test.dart` — crash records before and after rotation share no linking field.

#### Dependencies
[SN-CRY-002](security.md#sn-cry-002) (secure store / Keychain-Keystore layer), [SN-TEL-007](telemetry.md#sn-tel-007) (purge triggers rotation).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/integration, security scans)
- [ ] ADR-0011 decision 6 satisfied; identifier findings fed into [SN-PRV-014](privacy.md#sn-prv-014) Required-Reason API audit
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER

---

### SN-TEL-010

<a id="sn-tel-010"></a>

**Prove zero telemetry egress before opt-in with a blocking CI gate**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | test |
| Priority | p0 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | telemetry, privacy, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-007](telemetry.md#sn-tel-007), [SN-FND-003](ci-cd.md#sn-fnd-003), [SN-CI-001](ci-cd.md#sn-ci-001) |
| Security controls | `MASVS-PRIVACY-4`, `MASVS-NETWORK-1`, `MASVS-CODE-2`, `ASVS-V14`, `OWASP-A09`, `TM-P-06`, `TM-P-07`, `TM-R-03`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design, sec: threat-model |

#### Context
ADR-0011 'How to verify' item 1 is the load-bearing test for the whole privacy posture: 'a fresh install (any flavour) transmits no telemetry/crash data before opt-in — assert zero egress to any analytics/crash endpoint in an instrumented run'. If that ever regresses, the App Store privacy labels and the Play Data Safety declaration of 'no data collected' become false statements to two app stores and to every user — which is why this is p0 and must **block** merges, not warn. CLAUDE.md section 7 rule 4 makes the same point generally: no new network call without an ADR and a threat-model row, telemetry off by default.
This issue builds the instrumented run and wires it into CI as a required check, complementing [SN-PRV-010](privacy.md#sn-prv-010) (which bans analytics SDKs at the dependency level) and [SN-TEL-007](telemetry.md#sn-tel-007) (which guarantees the default-off state machine).

#### Scope
**In:** an integration test that boots the app with a fresh profile directory under each flavour define set, drives a short scripted session (open library, draw a stroke, force a caught error), and asserts **zero** outbound HTTP/WebSocket requests; an egress interceptor that fails on any host not on an explicit allow-list; a CI job wired into `.github/workflows/devsecops.yml` as a required check; a second assertion that no telemetry client object is constructed while disabled.
**Out:** the pubspec/SBOM analytics-SDK ban ([SN-PRV-010](privacy.md#sn-prv-010)), MobSF/ZAP dynamic scans (security area), and post-opt-in payload checks ([SN-TEL-012](telemetry.md#sn-tel-012)).

#### Acceptance criteria
- [ ] The test runs with `SANE_FLAVOR` set to dev, beta and release-equivalent define sets and passes in all three.
- [ ] Zero network requests are observed during the scripted session with consent off; the assertion message names the offending URL host and the originating stack when it fails.
- [ ] Triggering a caught error and a crash-record write produces a queued record locally but still zero requests.
- [ ] The allow-list is empty for this scenario (no host may be contacted); any future legitimate egress must be added deliberately with a code comment citing its ADR and threat-model row.
- [ ] A negative-control run (a deliberately injected request behind a test-only flag) makes the test fail, proving the interceptor works.
- [ ] The CI job runs on every PR, completes in under 10 minutes, and is listed as a required status check in branch protection (docs/security/devsecops-pipeline.md section 3).
- [ ] Failure output tells the developer exactly which ADR-0011 guarantee broke, so the fix is obvious without reading this issue.

#### Technical notes
Implement as `app/integration_test/telemetry_zero_egress_test.dart` using an `HttpOverrides`-based interceptor plus a platform-channel mock that fails any native network plugin call; for web, run under a headless Chrome with a request-logging proxy or a `fetch` monkey-patch guard. Wire a `telemetry-egress` job into `.github/workflows/devsecops.yml` beside the existing `issues-schema` and planned `unit-tests` jobs (docs/security/devsecops-pipeline.md sections 1 and 2.1), pinning the action SHAs per the supply-chain rules. Keep it in the same suite as [SN-TEL-005](telemetry.md#sn-tel-005)'s crash-capture integration test so one boot covers both.

#### Security & privacy
Threats: TM-P-06 (unawareness), TM-P-07 (non-compliance with GDPR/DPDP consent-before-collection), TM-R-03 (user cannot prove what left the device), TM-P-02 (identifiability if an SDK phoned home). Controls: MASVS-PRIVACY-4 (third-party sharing restrictions), MASVS-NETWORK-1, MASVS-CODE-2 (dependency hygiene, jointly with [SN-PRV-010](privacy.md#sn-prv-010)), ASVS V14, OWASP-A09, CWE-359. This is a verification control: it does not add attack surface, it proves the absence of one.

#### UX notes
No UI. It protects the truthfulness of the copy on Settings > Privacy & export and the privacy dashboard ([SN-PRV-002](privacy.md#sn-prv-002), [SN-PRV-009](privacy.md#sn-prv-009); design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12), which claims nothing is collected by default. None beyond baseline: the test itself must log no note content or tokens, and its fixtures use synthetic data only.

#### Test plan
- Integration: `app/integration_test/telemetry_zero_egress_test.dart` (the deliverable).
- Meta-test: `app/integration_test/telemetry_zero_egress_negative_control_test.dart` — injected request fails the gate.
- CI: the `telemetry-egress` job green on PRs; verified red on a branch that enables telemetry by default.

#### Dependencies
[SN-TEL-007](telemetry.md#sn-tel-007) (default-off state machine), [SN-FND-003](ci-cd.md#sn-fnd-003) (Flutter CI workflow), [SN-CI-001](ci-cd.md#sn-ci-001) (DevSecOps pipeline that hosts the job).

#### Definition of done
- [ ] Code + tests merged, CI green and the new job required in branch protection
- [ ] ADR-0011 verify item 1 explicitly cited in the test file header; docs/security/devsecops-pipeline.md job table updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER

---

### SN-TEL-011

<a id="sn-tel-011"></a>

**SPIKE: choose the opt-in crash backend under ADR-0011 constraints**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | spike |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | all |
| Areas | telemetry, privacy, security |
| Size | S |
| SDLC | design |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-005](telemetry.md#sn-tel-005), [SN-TEL-010](telemetry.md#sn-tel-010) |
| Security controls | `MASVS-PRIVACY-4`, `MASVS-CODE-2`, `MASVS-NETWORK-1`, `ASVS-V14`, `OWASP-A03`, `TM-P-08`, `TM-T-05`, `CWE-1104` |
| Extra labels | needs-decision, sec: privacy-by-design, sec: supply-chain |

#### Context
ADR-0011 decision 2 permits a crash *backend* only if it 'is self-hosted or configured to receive only the redacted payload, and only after opt-in', and requires verifying that the chosen pipeline sends nothing on first run. It does not name a vendor — that is a maintainer decision with cost, hosting and supply-chain consequences, so it carries `needs-decision`. The candidates behave very differently under our constraints: self-hosted Sentry with `sentry_flutter` can be configured with `sendDefaultPii: false`, auto-breadcrumbs off and a `beforeSend` scrub, but it is a large dependency that captures a lot by default; Firebase Crashlytics pulls in Firebase installations identifiers and Play Services, which collides with 'no third-party analytics SDK' and with the Play Data Safety story; a DIY endpoint receiving only our own serialised payload ([SN-TEL-003](telemetry.md#sn-tel-003)) is the smallest attack surface but means we operate it.
The deliverable is a written decision recorded as an ADR-0011 addendum (or a new ADR per CLAUDE.md section 11), not code. It unblocks [SN-TEL-012](telemetry.md#sn-tel-012) and [SN-TEL-014](telemetry.md#sn-tel-014).

#### Scope
**In:** a time-boxed (2-day) evaluation of self-hosted Sentry, Firebase Crashlytics and a DIY endpoint against a fixed criteria matrix; a prototype spike branch measuring first-run egress and binary size for the top two; the written decision + ADR update; an SBOM/licence note for whatever is proposed.
**Out:** the production integration ([SN-TEL-012](telemetry.md#sn-tel-012)), symbolication tooling ([SN-TEL-014](telemetry.md#sn-tel-014)), and any credential provisioning.

#### Acceptance criteria
- [ ] A criteria matrix is published covering, per candidate: default egress on first run (measured, not claimed); identifiers collected by default; ability to receive only our redacted payload; self-hostability and data residency; native (Swift/Kotlin) crash coverage; symbolication support for `--split-debug-info`; binary/size impact; transitive dependency count and licences; cost at 10k and 100k installs; and Play Data Safety / Apple Privacy Manifest consequences.
- [ ] First-run egress is **measured** for each candidate on a spike branch using the [SN-TEL-010](telemetry.md#sn-tel-010) harness, with results recorded in the matrix.
- [ ] The recommendation states explicitly how ADR-0011 decision 2 ('verify the chosen crash pipeline sends nothing on first run') will remain continuously enforced after integration.
- [ ] A rejected-option rationale is written for each non-chosen candidate, in the ADR's Alternatives-considered style.
- [ ] The decision names the required maintainer inputs (hosting, budget, data region) so [SN-TEL-012](telemetry.md#sn-tel-012) can be labelled `needs-credentials` precisely.
- [ ] Spike code is deleted or clearly quarantined; nothing from the spike ships.
- [ ] The outcome is reflected in docs/security/controls-matrix.md (MASVS-PRIVACY-4 row) and, if a new dependency is proposed, in the dependency policy enforced by [SN-PRV-010](privacy.md#sn-prv-010).

#### Technical notes
Run the measurement with the [SN-TEL-010](telemetry.md#sn-tel-010) zero-egress harness on a branch per candidate; capture packet-level evidence (proxy log) rather than trusting SDK documentation. Sentry configuration to test: `sendDefaultPii=false`, `attachScreenshot=false`, `attachViewHierarchy=false`, auto session tracking off, breadcrumbs off, `beforeSend` forcing our serialised payload. Crashlytics must be assessed with Firebase installations behaviour on both platforms. Record the decision per CLAUDE.md section 11 (ADR style: Context / Decision / Alternatives / Consequences / How to verify / Status) and link it from ADR-0011 and docs/architecture/overview.md Appendix B.

#### Security & privacy
Threats: TM-P-08 (data sent to a third party is retained or linked), TM-T-05 (supply-chain compromise via a heavyweight SDK), TM-P-02 (identifiability through SDK-generated installation ids), TM-P-07 (store-declaration mismatch). Controls: MASVS-PRIVACY-4, MASVS-CODE-2 (dependency currency and CVE exposure), MASVS-NETWORK-1, ASVS V14, OWASP-A03 (2025 supply-chain failures), CWE-1104 (use of unmaintained/unvetted third-party components). The spike must not add any dependency to `main`.

#### UX notes
No UI. The decision constrains the copy on the 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009)) and the store declarations ([SN-PRV-015](privacy.md#sn-prv-015)), because whatever the backend receives must be listed verbatim there. None beyond baseline.

#### Test plan
- Measurement: run `app/integration_test/telemetry_zero_egress_test.dart` on each spike branch; attach proxy logs to the issue.
- Review: Security/Privacy Owner signs off the matrix and the recommendation before the maintainer decision is recorded.
- No production tests (spike produces a document, not shipping code).

#### Dependencies
[SN-TEL-005](telemetry.md#sn-tel-005) (a sanitised record to send), [SN-TEL-010](telemetry.md#sn-tel-010) (the egress harness used for measurement).

#### Definition of done
- [ ] Written decision merged as an ADR-0011 addendum or a new ADR, linked from docs/architecture/overview.md Appendix B
- [ ] Criteria matrix with measured first-run egress published; maintainer decision recorded (issue carries `needs-decision` until then)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; docs/security/controls-matrix.md updated

---

### SN-TEL-012

<a id="sn-tel-012"></a>

**Implement the opt-in crash and metrics upload adapter**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | telemetry, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-011](telemetry.md#sn-tel-011), [SN-TEL-007](telemetry.md#sn-tel-007), [SN-TEL-003](telemetry.md#sn-tel-003) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-NETWORK-2`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `ASVS-V12`, `ASVS-V14`, `OWASP-A02`, `TM-P-08`, `TM-I-01`, `CWE-311`, `CWE-295` |
| Extra labels | needs-credentials, sec: privacy-by-design, sec: masvs |

#### Context
Once a user opts in, the sanitised crash records ([SN-TEL-005](telemetry.md#sn-tel-005)) and weekly aggregates ([SN-TEL-006](telemetry.md#sn-tel-006)) have to reach the backend chosen in [SN-TEL-011](telemetry.md#sn-tel-011) — and that upload path is the **only** egress in the product that carries anything derived from app behaviour, so it gets the strictest treatment. `PRD-TEL-004` calls it out: telemetry endpoints are the one narrow exception to 'no Sane server for content', they must be strictly separate infrastructure that never receives note content, and they must be documented in the threat model under LINDDUN linkability/identifiability. CLAUDE.md section 7 rule 4 requires an ADR plus a threat-model row for any new network call, with purpose and data sent listed in the PR.
This lands in M8 alongside launch, matching ADR-0011's status line ('opt-in telemetry ships in M8 Launch & Growth'). It needs maintainer-supplied endpoint/DSN credentials via CI secrets, hence `needs-credentials`.

#### Scope
**In:** a `TelemetrySink` interface plus the adapter for the chosen backend in `app/lib/telemetry/`; construction only after consent is granted; TLS 1.2+ with certificate pinning for our own endpoint; payload built solely from [SN-TEL-003](telemetry.md#sn-tel-003) output; batching, retry with the [SN-TEL-007](telemetry.md#sn-tel-007) backoff, and honouring the kill switch mid-flight; endpoint configuration via `--dart-define` and CI secrets; threat-model and ADR rows for the new egress.
**Out:** the backend choice ([SN-TEL-011](telemetry.md#sn-tel-011)), symbolication ([SN-TEL-014](telemetry.md#sn-tel-014)), field perf metrics content ([SN-TEL-013](telemetry.md#sn-tel-013)), the consent UI ([SN-PRV-009](privacy.md#sn-prv-009)).

#### Acceptance criteria
- [ ] No HTTP client, SDK or connection is created while consent is off; construction happens lazily on first send after opt-in (asserted by [SN-TEL-010](telemetry.md#sn-tel-010)).
- [ ] Every payload is byte-identical to the [SN-TEL-003](telemetry.md#sn-tel-003) serialiser output plus a schema version — the adapter may not add fields, headers with identifiers, or SDK-default metadata.
- [ ] TLS 1.2+ enforced; certificate pinning applied for a Sane-operated endpoint; no cleartext traffic on any platform (Android `usesCleartextTraffic=false`, iOS ATS on) — a MitM attempt with a user-installed CA fails closed.
- [ ] Sends are batched at most once per hour and only on an unmetered connection by default, respecting the `wifiOnly`-style preference semantics in `PRD-SYNC-008`.
- [ ] Flipping the kill switch mid-send cancels the request and purges the queue ([SN-TEL-007](telemetry.md#sn-tel-007)); a test asserts no retry follows.
- [ ] A 4xx response drops the payload (never retried into a loop); a 5xx backs off per the schedule; all failures are content-free logged at `warn`.
- [ ] Endpoints come from `SANE_*` dart-defines with no default pointing at production in dev/beta; no secret is hardcoded (gitleaks/trufflehog clean).
- [ ] The PR lists every new egress with purpose and exact data sent, and adds the corresponding row to docs/security/threat-model.md.

#### Technical notes
Adapter in `app/lib/telemetry/telemetry_sink_http.dart` behind a `TelemetrySink` interface so the backend can be swapped without touching callers; pinning via the platform plugin layer (CLAUDE.md section 3 — plugins are leaves) following the MASVS-NETWORK-2 pattern already used for the entitlement/relay endpoints (docs/security/controls-matrix.md section 1). Configuration keys follow the `--dart-define` matrix style of docs/architecture/overview.md section 7.1 (for example `SANE_TELEMETRY_URL`, injected from CI secrets for release). Run sends on the sync/background isolate, never the UI isolate (overview section 6).

#### Security & privacy
Threats: TM-P-08 (third-party retention/linking), TM-I-01 (interception in transit), TM-P-01/TM-P-02 (linkability/identifiability through headers, IP and timing — mitigate with batching, jitter and no custom identifying headers), TM-T-05 (supply chain, if an SDK is involved). Controls: MASVS-NETWORK-1/2, MASVS-PRIVACY-1/4, ASVS V12 (secure communication), ASVS V14, OWASP-A02, CWE-311 (missing encryption), CWE-295 (improper certificate validation). Fail-closed: any pinning or TLS failure drops the payload rather than downgrading.

#### UX notes
The only user-visible effects are the states rendered by [SN-PRV-009](privacy.md#sn-prv-009) and [SN-TEL-007](telemetry.md#sn-tel-007) in Settings > Privacy & export (design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12): on, waiting for a connection, off. No upload progress UI is needed or wanted; telemetry must never interrupt the user. Any error is silent to the user and visible only in the diagnostics bundle ([SN-TEL-008](telemetry.md#sn-tel-008)). None beyond baseline for looks/a11y since no new surface is added.

#### Test plan
- Unit: `app/test/telemetry/telemetry_sink_http_test.dart` — payload equality with serialiser output, no extra headers, 4xx drop, 5xx backoff, cancel on kill switch.
- Integration: `app/integration_test/telemetry_upload_test.dart` against a local test server — batching cadence, unmetered-only behaviour, TLS failure fails closed.
- Security: MitM test with a user-installed CA proves pinning blocks the send; gitleaks/trufflehog clean on the PR.

#### Dependencies
[SN-TEL-011](telemetry.md#sn-tel-011) (backend decision), [SN-TEL-007](telemetry.md#sn-tel-007) (state machine and kill switch), [SN-TEL-003](telemetry.md#sn-tel-003) (payload), plus maintainer-supplied endpoint credentials via CI secrets.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit/integration, Semgrep, mobsfscan, secret scan)
- [ ] New ADR row/addendum + docs/security/threat-model.md egress row + docs/security/controls-matrix.md NETWORK rows updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER

---

### SN-TEL-013

<a id="sn-tel-013"></a>

**Collect opt-in field performance metrics against the decision-7 budgets**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | telemetry, perf, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-006](telemetry.md#sn-tel-006), [SN-PERF-002](perf.md#sn-perf-002), [SN-TEL-012](telemetry.md#sn-tel-012), [SN-TEL-002](telemetry.md#sn-tel-002) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `ASVS-V14`, `TM-P-01`, `TM-P-04`, `TM-I-05`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design, innovation |

#### Context
ADR-0011's Context names the second reason telemetry exists at all: 'prove the performance budgets (decision 7) in the field, not just in CI', and its Consequences accept that field data will be sparse and volunteer-biased, compensated by strong CI gates and a device lab. docs/platform/performance-budgets.md fixes ten budgets B1-B10 with p95/p99 gating and warns that emulators are never a valid latency signal — which means real-device field data, however sparse, is the only way to know whether the budgets hold on the long tail of hardware students actually own. This issue wires the perf harness metrics into the opt-in aggregate pipeline as coarse buckets so that a device class, not a device, is what we learn about.
It depends on the aggregator ([SN-TEL-006](telemetry.md#sn-tel-006)) for storage and on [SN-PERF-002](perf.md#sn-perf-002) for the metric definitions, and reports through [SN-TEL-012](telemetry.md#sn-tel-012).

#### Scope
**In:** instrumentation hooks that feed B1/B2/B3 pen-to-pixel p95, B4 frame rate, B5 frames over 16.7 ms while writing, B6 cold start, B7 1,000-page notebook open and B9 peak memory into the aggregator as catalogue buckets; an ink-tier label (Tier A native front-buffer vs Tier B pure Flutter); a device-class label; sampling so instrumentation costs nothing measurable; documentation of how field buckets compare to CI baselines.
**Out:** the measurement harness itself ([SN-PERF-002](perf.md#sn-perf-002)), CI perf gates ([SN-PERF-003](perf.md#sn-perf-003)), the device lab ([SN-PERF-004](perf.md#sn-perf-004)), the transport ([SN-TEL-012](telemetry.md#sn-tel-012)), any dashboard.

#### Acceptance criteria
- [ ] Each shipped metric maps to a budget ID from docs/platform/performance-budgets.md section 1 and to a catalogue entry from [SN-TEL-002](telemetry.md#sn-tel-002); a metric with no catalogue entry cannot be emitted.
- [ ] Values are recorded as p95 within a session and then bucketed; no raw per-frame or per-stroke sample ever leaves the aggregator (test asserts stored rows are bounded by bucket count).
- [ ] Ink tier (A/B) and device class are attached; device **model strings, serials and screen identifiers are not**.
- [ ] With telemetry off, instrumentation is compiled-out or short-circuited so it adds no measurable cost: the draw loop budget (no frame over 16.7 ms while writing, B5) is unaffected, proven by a before/after harness run.
- [ ] Instrumentation itself never logs on the hot path in profile/release (CLAUDE.md section 8, overview section 8.2).
- [ ] The cold-start metric (B6) is captured without delaying startup by more than 2 ms.
- [ ] A short doc section explains how to read field buckets against the CI baseline, including the volunteer-bias caveat from ADR-0011 Consequences.
- [ ] Web surface degrades gracefully where a metric is unavailable (for example memory), emitting nothing rather than a fabricated value.

#### Technical notes
Hooks live where the measurements already exist: `tools/perf_harness` metric names are reused verbatim, and the runtime collectors sit in `app/lib/telemetry/perf_metrics.dart` reading frame timings via `SchedulerBinding.addTimingsCallback` and the ink pipeline's existing latency instrumentation from [SN-INK-009](ink.md#sn-ink-009)/[SN-PERF-002](perf.md#sn-perf-002). Aggregation is the [SN-TEL-006](telemetry.md#sn-tel-006) path (storage isolate). Do not add a new sampling thread; reuse existing callbacks. Cite ADR-0011 decision 3, ADR-0001 (the ink-tier exit criterion that field data continuously re-evaluates, per performance-budgets.md section 3 'both ink tiers tracked').

#### Security & privacy
Threats: TM-P-01 (linkability — a device model plus timing is near-identifying, so only device class ships), TM-P-04 (detectability — coarse weekly windows hide usage shape), TM-I-05 (no content, no coordinates: latency is a scalar, never a stroke). Controls: MASVS-PRIVACY-2/3, ASVS V14, CWE-359. Fail-closed: an unavailable metric emits nothing. Every metric added here must appear verbatim on the 'what we collect' screen ([SN-PRV-009](privacy.md#sn-prv-009)) via [SN-TEL-015](telemetry.md#sn-tel-015)'s review gate.

#### UX notes
No new UI. The metric list is surfaced verbatim on the 'what we collect' screen in Settings > Privacy & export (design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12) with student-readable phrasing ('How long the app takes to show your ink, rounded into ranges'). Copy must not imply we watch what the user writes. None beyond baseline for looks/a11y.

#### Test plan
- Unit: `app/test/telemetry/perf_metrics_test.dart` — budget-ID mapping, p95 computation, bucketing, unavailable-metric behaviour, disabled no-op.
- Integration: `app/integration_test/perf_metrics_overhead_test.dart` — with telemetry on and off, the B5 jank budget and B6 cold-start budget are unchanged within noise.
- Harness: a `tools/perf_harness` run before/after the change showing no regression in B1-B3.

#### Dependencies
[SN-TEL-006](telemetry.md#sn-tel-006) (aggregator), [SN-PERF-002](perf.md#sn-perf-002) (latency measurement harness and metric definitions), [SN-TEL-012](telemetry.md#sn-tel-012) (upload path), [SN-TEL-002](telemetry.md#sn-tel-002) (catalogue entries).

#### Definition of done
- [ ] Code + tests merged, CI green including the perf gates ([SN-PERF-003](perf.md#sn-perf-003))
- [ ] docs/platform/performance-budgets.md cross-referenced with the field-metric names; docs/security/telemetry-catalogue.md updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-TEL-014

<a id="sn-tel-014"></a>

**Build the release symbolication pipeline for obfuscated crash reports**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | telemetry, ci-cd, release |
| Size | M |
| SDLC | release |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-012](telemetry.md#sn-tel-012), [SN-REL-001](release.md#sn-rel-001), [SN-CI-004](ci-cd.md#sn-ci-004) |
| Security controls | `MASVS-RESILIENCE-3`, `MASVS-CODE-4`, `ASVS-V13`, `OWASP-A08`, `TM-T-05`, `TM-I-05`, `CWE-522`, `CWE-540` |
| Extra labels | needs-credentials, sec: supply-chain |

#### Context
Release builds run `--obfuscate --split-debug-info` (docs/security/controls-matrix.md MASVS-RESILIENCE-3, docs/architecture/overview.md section 7 flavour table), which means a field crash report arrives as obfuscated symbols and is unreadable without the matching debug-info map. ADR-0011's Security impact section fixes the rule: 'crash symbolication uses `--split-debug-info` maps kept server-side/off-device; obfuscation maps are secrets, not shipped in the app'. Without a pipeline that captures, stores and retrieves those maps per build id, opt-in crash reporting is technically working and practically useless, and there is a real risk an engineer 'temporarily' ships a map or disables obfuscation to debug — a resilience regression.
This issue builds the pipeline as part of release engineering ([SN-REL-001](release.md#sn-rel-001)), so every signed artifact has a retrievable map and a documented symbolicate step.

#### Scope
**In:** emitting and archiving `--split-debug-info` maps (plus Android mapping files and iOS dSYMs for native frames) from the release workflow; a private, access-controlled artifact store keyed by build id + version + platform; a `tools/scripts/symbolicate.mjs` wrapper around `flutter symbolize`; retention policy; a CI check that a release build is rejected if its map was not archived; documentation in the release runbook.
**Out:** the crash transport ([SN-TEL-012](telemetry.md#sn-tel-012)), backend-side automatic symbolication if the chosen vendor does it ([SN-TEL-011](telemetry.md#sn-tel-011) decides), and store signing itself ([SN-REL-001](release.md#sn-rel-001)).

#### Acceptance criteria
- [ ] Every release and beta build emits a debug-info map, an Android mapping file and iOS dSYMs, all uploaded to the private store as part of the release job; the job fails if any is missing.
- [ ] Maps are **never** included in the shipped artifact — a test unpacks the APK/AAB/IPA and asserts no `.symbols`/mapping/dSYM payload is present.
- [ ] Maps are stored with restricted access (CI secret-scoped credentials, least-privilege token), are not in the git repo, and are excluded from SBOM publication while being recorded in the release manifest by checksum.
- [ ] `tools/scripts/symbolicate.mjs <build-id> <stack-file>` resolves a stack from a real obfuscated release build end-to-end in under 60 seconds.
- [ ] Retention is explicit (maps kept at least as long as the corresponding app version is supported, minimum 18 months) and documented.
- [ ] A rotation/audit note records who can access the store; access is reviewed at each release per docs/security/devsecops-pipeline.md section 5 (secrets policy).
- [ ] The release runbook documents the symbolicate step so an on-call engineer can use it without reading code.

#### Technical notes
Extend the release workflow (`.github/workflows/release.yml`, planned in docs/security/devsecops-pipeline.md section 2.7) with an upload step using pinned full-SHA actions and OIDC-based credentials rather than long-lived keys. Build ids come from the Flutter build metadata already embedded in the crash record by [SN-TEL-005](telemetry.md#sn-tel-005), so the lookup key is available on every report. Keep the wrapper in `tools/scripts/` per the monorepo layout (ADR-0002). Attach map checksums to the release provenance/SBOM artifacts produced by [SN-CI-004](ci-cd.md#sn-ci-004) so map integrity is verifiable without exposing the maps.

#### Security & privacy
Threats: TM-T-05 (supply chain / build-artifact tampering), TM-I-05 (a leaked map plus a crash stack reveals more internal structure than intended), plus the anti-pattern risk of shipping maps in-app. Controls: MASVS-RESILIENCE-3 (obfuscation preserved), MASVS-CODE-4, ASVS V13 (secure configuration), OWASP-A08 (software and data integrity), CWE-522 (insufficiently protected credentials — the store's access token), CWE-540 (sensitive info in source/artifacts). Maps are secrets: never committed, never attached to a public GitHub Release, never handed to a third party that has not been assessed in [SN-TEL-011](telemetry.md#sn-tel-011).

#### UX notes
No user-facing surface. Indirect user benefit: crashes that users opted into reporting can actually be fixed, and obfuscation (which protects them) never has to be weakened to debug. None beyond baseline — the pipeline handles no note content and no personal data, only build artifacts.

#### Test plan
- CI: a release dry-run proves maps are uploaded and the job fails when the upload step is removed.
- Unit/script: `tools/scripts/__tests__/symbolicate_test.mjs` — resolves a fixture obfuscated stack to the expected frames.
- Artifact test: `tools/scripts/check_no_symbols_in_artifact.mjs` run in CI against the built APK/AAB/IPA.
- Manual: on-call walkthrough of the runbook by someone who did not write it.

#### Dependencies
[SN-TEL-012](telemetry.md#sn-tel-012) (reports to symbolicate), [SN-REL-001](release.md#sn-rel-001) (release workflow and signing), [SN-CI-004](ci-cd.md#sn-ci-004) (SBOM/provenance to record map checksums), plus maintainer-supplied artifact-store credentials.

#### Definition of done
- [ ] Pipeline + scripts + tests merged, release dry-run green
- [ ] docs/security/devsecops-pipeline.md and the release runbook updated; ADR-0011 Security-impact bullet satisfied
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER

---

### SN-TEL-015

<a id="sn-tel-015"></a>

**Gate every new telemetry event behind a privacy review in CI**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M4 Identity, Sync & Privacy |
| Platforms | core |
| Areas | telemetry, privacy, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-TEL-001](telemetry.md#sn-tel-001) |
| Depends on | [SN-TEL-002](telemetry.md#sn-tel-002), [SN-CI-001](ci-cd.md#sn-ci-001), [SN-PRV-009](privacy.md#sn-prv-009) |
| Security controls | `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `MASVS-CODE-3`, `ASVS-V14`, `OWASP-A09`, `TM-P-06`, `TM-P-07`, `TM-I-05`, `CWE-359` |
| Extra labels | agent-ready, sec: privacy-by-design, good first issue |

#### Context
Telemetry scope creep is the normal failure mode: a well-meaning change adds one more field, then another, and six months later the 'no data collected' declaration is false. ADR-0011 verify item 5 requires that the 'what we collect' screen match the actual allow-list, and decision 4 requires deny-by-default so a new field cannot be exfiltrated by accident. `PRD-PRIV-007` goes further — any future SDK or collection addition must be gated on a threat-model and privacy-label update. A serialiser that drops unknown fields protects users at runtime, but nothing yet forces a human privacy review when someone legitimately *adds* an entry to the catalogue.
This issue adds that gate: a CI check plus CODEOWNERS plus a PR-template section, so every catalogue change is reviewed, described in user-facing language, and reflected in the screen the user reads.

#### Scope
**In:** `tools/scripts/check_telemetry_catalogue.mjs` validating catalogue diffs; a CI job wired into `.github/workflows/devsecops.yml`; a CODEOWNERS entry making the Security/Privacy Owner a required reviewer for the catalogue and `packages/sane_core/lib/src/telemetry/`; a checklist block in `.github/PULL_REQUEST_TEMPLATE.md`; a test that the 'what we collect' screen content equals the catalogue.
**Out:** the catalogue content itself ([SN-TEL-002](telemetry.md#sn-tel-002)), the consent screen ([SN-PRV-009](privacy.md#sn-prv-009)), the analytics-SDK dependency ban ([SN-PRV-010](privacy.md#sn-prv-010)), store-label verification ([SN-PRV-016](privacy.md#sn-prv-016)).

#### Acceptance criteria
- [ ] The CI job fails when a PR adds or changes a catalogue entry that lacks: a bucket definition, a retention window, a one-sentence user-facing description, or a justification line.
- [ ] The job fails if a catalogue entry exists without a matching row on the 'what we collect' screen data source, or vice versa (ADR-0011 verify item 5).
- [ ] The job fails on any new field whose name or type matches a deny pattern (free text, raw timestamp, identifier-like names such as `email`, `phone`, `deviceId`, `path`, `title`, `content`).
- [ ] CODEOWNERS requires Security/Privacy Owner review for `docs/security/telemetry-catalogue.md` and `packages/sane_core/lib/src/telemetry/**`.
- [ ] The PR template gains a 'Telemetry change' block: what is collected, why, bucket, retention, screen copy, threat-model/controls-matrix rows touched.
- [ ] The job runs in under 60 seconds and produces an error message naming the exact catalogue line at fault.
- [ ] A documented escape hatch does not exist: there is no skip label; a needed exception requires an ADR update.

#### Technical notes
Write the checker in Node 22 (matching `scripts/validate-issues.mjs` conventions) and run it in the same workflow as the existing `issues-schema` job (docs/security/devsecops-pipeline.md section 1.7), with pinned full-SHA actions. Parse `docs/security/telemetry-catalogue.md` and the Dart const catalogue and compare both against the screen's data source; reuse the doc/Dart equality test added by [SN-TEL-002](telemetry.md#sn-tel-002). CODEOWNERS additions follow the existing security-critical path pattern in CLAUDE.md section 5. Keep the deny-pattern list next to the catalogue so it is reviewed like code.

#### Security & privacy
Threats: TM-P-06 (unawareness — screen and reality drift apart), TM-P-07 (non-compliance — store declarations and privacy policy become inaccurate), TM-I-05 (a new field smuggles content or PII). Controls: MASVS-PRIVACY-2/4, MASVS-CODE-3, ASVS V14, OWASP-A09, CWE-359. This is a process control implementing NIST SSDF PO.4 (criteria for security checks) and PW.7 as mapped in docs/security/controls-matrix.md section 6.

#### UX notes
No UI, but the gate exists to protect a UI guarantee: the 'what we collect' screen in Settings > Privacy & export (design/Sane Notes.dc.html, docs/design/screens-and-flows.md section 12) must list every metric verbatim, in student-readable English. The checker enforces that each new entry ships copy that reads well at phone width and in all **17 looks plus light/dark** (the screen is a simple list, so the constraint is sentence length, not layout). None beyond baseline otherwise.

#### Test plan
- Script tests: `tools/scripts/__tests__/check_telemetry_catalogue_test.mjs` — passes on the current catalogue; fails on a fixture missing a description, a fixture with a deny-pattern field, and a fixture out of sync with the screen.
- CI: job green on `main`, verified red on a branch that adds an undescribed field.
- Unit: reuse `packages/sane_core/test/telemetry/telemetry_catalogue_test.dart` for doc/Dart equality.

#### Dependencies
[SN-TEL-002](telemetry.md#sn-tel-002) (catalogue to check), [SN-CI-001](ci-cd.md#sn-ci-001) (DevSecOps pipeline hosting the job), [SN-PRV-009](privacy.md#sn-prv-009) (the screen data source compared against).

#### Definition of done
- [ ] Script + CI job + CODEOWNERS + PR-template block merged, CI green
- [ ] ADR-0011 verify item 5 covered; docs/security/devsecops-pipeline.md job table and docs/security/controls-matrix.md SSDF rows updated
- [ ] Reviewed against docs/security/secure-coding-checklist.md by a CODEOWNER

---

