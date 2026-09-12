# ADR-0011 — Telemetry and diagnostics

## Status

**Accepted** (M0 policy; opt-in telemetry ships in M8 Launch & Growth). Related:
[`docs/architecture/overview.md`](../architecture/overview.md) (§8 error/logging policy),
[`SECURITY.md`](../../SECURITY.md), [`docs/security/threat-model.md`](../security/threat-model.md). This ADR is a
**privacy control**, not a growth feature.

## Context

Locked decisions 3, 6 and 8 make privacy a product promise: local-first, zero-knowledge, AI
on-device by default, **App Store privacy labels & Play Data Safety "no data collected"
except opt-in crash reports**, telemetry **strictly opt-in and aggregated on-device first**,
GDPR + India DPDP 2023 + COPPA-aware age gate. The persona is students, including minors.

At the same time, we still need to:

- **Diagnose crashes and jank** without shipping a data-harvesting SDK.
- **Prove the performance budgets** (decision 7) in the field, not just in CI.
- **Let a user help us debug** by exporting a diagnostics bundle — without leaking note
  content.

The tension: almost every off-the-shelf analytics/crash SDK (Firebase, Amplitude, Sentry with
default config, etc.) collects device/user identifiers and phones home by default, which would
break the "no data collected" labels and the zero-knowledge promise. The logging facade and
redaction rules in [overview §8](../architecture/overview.md#8-error-handling--logging-policy)
are the foundation this ADR builds on.

## Decision

**Telemetry is opt-in only, off by default on every flavour, aggregated on-device before any
transmission, and never contains note content or personal identifiers. No always-on
third-party analytics SDK is linked into the app. Diagnostics are local-first: an in-memory
redacted log the user can export, plus an opt-in, sanitised crash report.**

Specifics:

1. **Default state:** `SANE_TELEMETRY_DEFAULT=false` on dev, beta **and** release
   ([overview §7](../architecture/overview.md#7-build-flavours--the---dart-define-matrix)).
   The app collects and transmits nothing until the user explicitly opts in from Settings,
   with plain-language copy about what is and isn't sent.
2. **No third-party analytics SDK** (no Firebase Analytics/Amplitude/GA). Crash capture uses
   our own handlers (`FlutterError.onError`, `PlatformDispatcher.instance.onError`, per-isolate
   error listeners) feeding a **sanitised** crash record; if a crash *backend* is used it must
   be self-hosted or configured to receive **only** the redacted payload, and only after
   opt-in. **Verify** the chosen crash pipeline sends nothing on first run.
3. **On-device aggregation first.** What *may* be collected after opt-in: **aggregate,
   content-free** counters and performance traces — e.g. "wet-ink p95 latency bucket," "cold-
   start ms bucket," "frames > 16.7 ms during writing," "feature X used N times this week,"
   crash type + stack (symbol-only). Aggregate on-device into coarse buckets; transmit
   summaries, never per-event streams, never timestamps precise enough to reconstruct
   activity.
4. **Hard redaction allow-list** (overview §8.2): **never** transmit or log note text, ink
   coordinates, decrypted data, keys/tokens/recovery codes, cloud file paths, email, phone
   numbers, or precise device identifiers. Object ids appear only as opaque short hashes. The
   telemetry serialiser uses a **field allow-list** (deny by default), so a new field cannot
   be exfiltrated by accident.
5. **Diagnostics bundle:** Settings → "Export diagnostics" produces a **redacted** bundle from
   the in-memory ring-buffer log (levels, event names, sanitised fields, device model, OS,
   app version, flavour) that the user reviews and shares **manually**. It is never uploaded
   automatically.
6. **Crash reports are opt-in and sanitised:** symbolicated with `--split-debug-info` maps on
   our side; the on-device payload carries no content and no stable user id (a rotating,
   local, resettable install token at most).
7. **Age gate / COPPA:** for users below the age threshold, telemetry and crash reporting stay
   **off and unofferable**; the opt-in is not shown.
8. **Kill switch & transparency:** a single Settings toggle turns everything off and purges
   any queued data; a "what we collect" screen lists every metric verbatim.

## Alternatives considered

| Option | Default data collection | Privacy-label truthfulness | Debuggability | Regulatory fit (GDPR/DPDP/COPPA) | Verdict |
|---|---|---|---|---|---|
| **Opt-in, local-first, no SDK (chosen)** | None until opt-in | "No data collected" holds by default | Good — crash + redacted diagnostics bundle | Strong | **Chosen** — matches locked decisions 6 & 8 exactly |
| Always-on analytics SDK (Firebase/Amplitude) | Device/user ids by default | Would **break** "no data collected" | Best dashboards | Poor — consent + minor-data problems | Rejected — violates the privacy promise |
| Opt-out telemetry (on by default, user can disable) | Yes by default | Breaks the labels; dark-pattern risk | Good | Weak — pre-consent collection | Rejected — "opt-in" is a locked decision |
| No telemetry or crash reporting at all | None | Trivially true | **Poor** — blind to field crashes/jank | Strong | Rejected — can't prove decision-7 budgets or fix field crashes |
| Self-hosted crash backend, opt-in only | None until opt-in | Holds | Good | Strong | **Folded into the chosen option** as the crash pipeline, if used |

## Consequences

**Positive**

- The Play "no data collected" / App Store labels are **true by default**; the privacy promise
  is credible.
- No third-party SDK means a smaller attack surface, no hidden data flows, and nothing to
  disclose in a supply-chain audit for analytics.
- We can still fix field crashes and prove performance — via opt-in, content-free aggregates
  and the user-driven diagnostics bundle.
- COPPA/minor handling is clean because collection is off and unofferable below the age gate.

**Negative**

- **Lower analytics coverage** than a typical app — most users won't opt in, so field data is
  sparse and biased toward volunteers. We compensate with strong CI perf gates and a device
  lab (decision 7) rather than field telemetry.
- **More engineering** — we build the aggregation, allow-list serialiser, redaction and export
  ourselves instead of dropping in an SDK.
- Debugging a non-consenting user's issue relies on them exporting a diagnostics bundle
  manually.

## Security impact

- **Data-minimisation is enforced in code** by the field allow-list (deny-by-default), not
  just policy — the strongest guard against accidental PII/content exfiltration.
- **Zero-knowledge is preserved:** telemetry never carries note content or keys; there is no
  path from decrypted data to a network sink.
- **Reduced supply-chain risk:** no analytics SDK to be compromised or to silently expand its
  collection in an update.
- **Regulatory:** aligns with GDPR (consent, minimisation), India DPDP 2023, and COPPA (no
  collection from minors) — recorded against the LINDDUN analysis in
  `docs/security/threat-model.md`.
- **Crash symbolication** uses `--split-debug-info` maps kept **server-side/off-device**;
  obfuscation maps are secrets, not shipped in the app.

## How to verify

1. **First-run network test:** a fresh install (any flavour) transmits **no** telemetry/crash
   data before opt-in — assert zero egress to any analytics/crash endpoint in an instrumented
   run.
2. **Dependency check:** CI fails if a known always-on analytics SDK appears in
   `pubspec.lock` (allow-list of permitted packages); SBOM shows no analytics SDK.
3. **Allow-list unit tests:** the telemetry serialiser drops any field not on the allow-list;
   fuzz it with note content/keys/emails and assert none appear in the output.
4. **Redaction tests:** the diagnostics-bundle exporter and log sinks never emit note text,
   ink coordinates, keys, tokens, file paths, email or phone (property-based test over sample
   data).
5. **Privacy-label audit:** App Store privacy labels and Play Data Safety declare "no data
   collected" for the default configuration; the "what we collect" screen matches the actual
   allow-list.
6. **Age-gate test:** below-threshold accounts never see the telemetry opt-in and collect
   nothing.
7. **Kill-switch test:** disabling telemetry purges any queued data and stops all collection.
