# Backlog — area: billing

20 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-BILL-001](billing.md#sn-bill-001) **Billing & entitlements (sane_billing): plans, purchases, entitlement verification** (epic · M8 Launch & Growth)
  - [SN-BILL-002](billing.md#sn-bill-002) **Define the plan model and PlanLimits registry (authoritative plan matrix)** · p1 · feature · M · M8 Launch & Growth
  - [SN-BILL-003](billing.md#sn-bill-003) **SPIKE: choose entitlement verification architecture (RevenueCat vs minimal verifier)** · p1 · spike · S · M8 Launch & Growth
  - [SN-BILL-004](billing.md#sn-bill-004) **Implement the entitlement provider abstraction and RevenueCat adapter** · p0 · feature · L · M8 Launch & Growth
    - [SN-BILL-005](billing.md#sn-bill-005) **Implement fail-open-to-Free evaluation and offline entitlement grace** · p0 · task · M · M8 Launch & Growth
  - [SN-BILL-006](billing.md#sn-bill-006) **Implement StoreKit 2 IAP with on-device JWS entitlement verification** · p0 · feature · L · M8 Launch & Growth
  - [SN-BILL-007](billing.md#sn-bill-007) **Implement Google Play Billing purchase and acknowledgement** · p0 · feature · L · M8 Launch & Growth
    - [SN-BILL-008](billing.md#sn-bill-008) **Add Play Integrity licensing check with tiered, non-punitive enforcement** · p1 · security · M · M8 Launch & Growth
  - [SN-BILL-009](billing.md#sn-bill-009) **Implement web checkout (Razorpay UPI AutoPay + Stripe) with entitlement bridge** · p1 · feature · L · M8 Launch & Growth
  - [SN-BILL-010](billing.md#sn-bill-010) **Configure regional pricing and store products (INR-first, GST, global points)** · p0 · task · S · M8 Launch & Growth
  - [SN-BILL-011](billing.md#sn-bill-011) **Build the Upgrade paywall overlay (plan cards, billing toggle, honest disclosure)** · p1 · feature · M · M8 Launch & Growth
    - [SN-BILL-017](billing.md#sn-bill-017) **Implement anti-dark-pattern disclosures, cancellation and refunds** · p1 · feature · M · M8 Launch & Growth
  - [SN-BILL-012](billing.md#sn-bill-012) **Implement the Pro feature-gate API and Upgrade-overlay routing** · p1 · feature · M · M8 Launch & Growth
    - [SN-BILL-013](billing.md#sn-bill-013) **Enforce the free-plan PDF import monthly quota (5/month) with Upgrade gate** · p1 · feature · S · M8 Launch & Growth
  - [SN-BILL-014](billing.md#sn-bill-014) **Add restore and manage subscription to the Account & plan tab** · p1 · feature · M · M8 Launch & Growth
  - [SN-BILL-015](billing.md#sn-bill-015) **Implement tiered student verification with annual re-verification** · p1 · feature · L · M8 Launch & Growth
  - [SN-BILL-016](billing.md#sn-bill-016) **Implement the family/household plan grant in the entitlement layer** · p2 · feature · M · M8 Launch & Growth
  - [SN-BILL-018](billing.md#sn-bill-018) **Harden receipt/entitlement-token security and anti-piracy posture** · p1 · security · M · M8 Launch & Growth
  - [SN-BILL-019](billing.md#sn-bill-019) **Build the billing sandbox and test matrix across stores and gateways** · p1 · test · M · M8 Launch & Growth
  - [SN-GUX-012](billing.md#sn-gux-012) **Implement the plan-limit disclosure pattern: upsell card, meters and limit lines** · p1 · feature · M · M2 Library & Documents

---

## Issues

### SN-BILL-001

<a id="sn-bill-001"></a>

**Billing & entitlements (sane_billing): plans, purchases, entitlement verification**

| Field | Value |
|---|---|
| GitHub | #6 |
| Type | epic |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `MASVS-CODE-2`, `MASVS-CODE-4`, `MASVS-RESILIENCE-1`, `MASVS-RESILIENCE-2`, `MASVS-PRIVACY-1`, `MASVS-STORAGE-1`, `ASVS-V6`, `OWASP-A01`, `OWASP-A04`, `OWASP-A08`, `CWE-345`, `CWE-807`, `CWE-359` |
| Extra labels | agent-ready, innovation |

#### Context
Sane Notes is monetized without operating purchase infrastructure: the only "servers" are the app stores, a hosted entitlement provider (RevenueCat or equivalent), and the payment gateways (Stripe/Razorpay) — everything else stays local-first and zero-knowledge (docs/adr/0004-local-first-zero-server.md; docs/architecture/overview.md §services). `packages/sane_billing` (pure Dart, depends only on `sane_core` per the package DAG, CLAUDE.md §3) owns the plan matrix, the free-plan quotas (unlimited notebooks, 5 PDF imports/month, 30-minute audio, 3 people per shared notebook, Pro-gated actions), the verified entitlement object, the StoreKit 2 / Google Play Billing / web-checkout purchase paths, restore/manage/refund flows, student verification, the family plan, regional pricing and the anti-piracy posture. This epic delivers PRD-BILL-001…019 and the design's Upgrade overlay + Account & plan tab (docs/product/prd-03-identity-sync-privacy-settings-billing.md §10; docs/design/screens-and-flows.md §12–§14) in milestone M8 (docs/roadmap.md M8). The single hard rule threaded through every child: **entitlement failure must degrade to Free, never block local note-taking** (roadmap M8 exit criterion; threat model TM-S-05). It does not own identity/OIDC ([SN-AUTH-001](auth.md#sn-auth-001)), the settings shell ([SN-SET-001](settings.md#sn-set-001)), the store listing/signing ([SN-REL-001](release.md#sn-rel-001)) or telemetry ([SN-TEL-001](telemetry.md#sn-tel-001)).

#### Scope
**In:** the plan/limit/entitlement domain model; provider abstraction + RevenueCat adapter; fail-open evaluation & offline grace; StoreKit 2 IAP; Play Billing + Play Integrity; web checkout (Razorpay UPI / Stripe) + cross-platform entitlement bridge; the Upgrade paywall overlay; the Pro feature-gate API + Upgrade routing; the PDF-import monthly quota; the Account & plan tab (restore/manage subscription); regional/store price configuration; student verification (tiered) + annual re-verification; family/household plan; anti-dark-pattern disclosures, cancellation & refunds; receipts/token security & anti-piracy; the sandbox test matrix.
**Out:** OIDC token handling and the account key the entitlement is keyed to ([SN-AUTH-001](auth.md#sn-auth-001), [SN-AUTH-002](auth.md#sn-auth-002)); the settings navigation host ([SN-SET-001](settings.md#sn-set-001)); PDF import itself ([SN-PDF-001](pdf.md#sn-pdf-001)); audio-cap and share-cap *enforcement UI* (owned by [SN-AUD-001](audio.md#sn-aud-001) / [SN-COL-001](collaboration.md#sn-col-001), which call this epic's gate); store submission, signing and privacy labels ([SN-REL-001](release.md#sn-rel-001)); opt-in telemetry ([SN-TEL-001](telemetry.md#sn-tel-001)).

#### Acceptance criteria
- [ ] Every child issue below is delivered with its named test file(s) and its PRD-BILL/TM-*/MASVS IDs.
- [ ] M8 billing exit gates hold (docs/roadmap.md M8): an entitlement failure degrades to Free and never blocks local note-taking; premium is gated behind a **verified entitlement object** cached last-known-good for offline grace, never a boolean on disk.
- [ ] The same plan is purchasable on iOS (StoreKit 2), Android (Play Billing) and web (Razorpay/Stripe), and a purchase on any surface unlocks Pro on the others for the signed-in account.
- [ ] Pricing is store-localized India-first (₹999/yr ~₹83/mo, ₹149/mo, 14-day trial) with honest recurring-price disclosure and cancel-as-easy-as-signup (PRD-BILL-007/017).
- [ ] No payment token, receipt, entitlement token, or student PII is ever logged; entitlement verification uses a pinned public key and fails closed on a bad signature but open (to Free) on absence/offline.

#### Technical notes
Owner package `packages/sane_billing` (pure Dart, no `package:flutter` — docs/architecture/overview.md §5). The concrete IAP SDK (`purchases_flutter` for RevenueCat, or `in_app_purchase`) is wired in `app/` via Riverpod providers, never imported into the pure-Dart package. Config flows through `--dart-define` / flavour env (`SANE_ENTITLEMENTS_URL`, provider keys — docs/architecture/overview.md §flavours), never committed. Implements docs/product/prd-03 §10 and docs/research/sources/pricing-monetization-and-student-verification.md §1–§10. Optional `services/entitlements/` is the only stateless, content-blind first-party fallback (ADR-0004).

#### Security & privacy
This epic is the revenue-integrity and billing-privacy boundary. Threats: TM-S-05 (spoofed Pro entitlement), TM-P-02 (identifiability at the entitlement service), TM-P-09 (student PII over-collection), TM-R-02 (service logs). Controls: verified/pinned entitlement tokens (MASVS-AUTH-1, ASVS-V6, CWE-345/807), TLS + pinning to provider/gateway (MASVS-NETWORK-1), no dynamic license keys / no hard-lock (MASVS-CODE-4, MASVS-RESILIENCE-1/2), student-data minimisation (MASVS-PRIVACY-1, CWE-359), fail-open design (OWASP-A04). Children carry the specific rows.

#### UX notes
Surfaces: the **Upgrade** overlay ("Everything, for the price of a chai a week") and the **Account & plan** settings tab (docs/design/screens-and-flows.md §12–§14). Every painted surface renders across all 17 looks + dark mode, meets WCAG 2.2 AA (screen-reader labels on price/plan controls, 44pt targets, no colour-only "recommended" cue) and shows honest recurring price before any CTA. Children own their themed, a11y-labelled screens.

#### Test plan
Aggregate: `packages/sane_billing/test/` (plan/limit/entitlement unit tests), `app/test/billing/` (gate routing, fail-open, restore), `app/integration_test/billing_sandbox_test.dart` (StoreKit test + Play license testers + gateway test mode). Each child names its own files.

#### Dependencies
Spans M8. Cross-epic: [SN-CORE-002](storage.md#sn-core-002) (Result/entities), [SN-AUTH-001](auth.md#sn-auth-001)/[SN-AUTH-002](auth.md#sn-auth-002) (account key), [SN-SET-001](settings.md#sn-set-001) (settings host), [SN-DS-003](design-system.md#sn-ds-003) (components), [SN-PDF-002](pdf.md#sn-pdf-002) (PDF import gate), [SN-AUD-001](audio.md#sn-aud-001)/[SN-COL-001](collaboration.md#sn-col-001) (cap/share gate callers), [SN-CI-001](ci-cd.md#sn-ci-001) (pipeline), [SN-SEC-001](security.md#sn-sec-001) (threat model), [SN-PRV-001](privacy.md#sn-prv-001) (privacy labels).

### Children
- [ ] [SN-BILL-002](billing.md#sn-bill-002) Plan model & PlanLimits registry (authoritative plan matrix as code)
- [ ] [SN-BILL-003](billing.md#sn-bill-003) SPIKE: entitlement verification architecture (RevenueCat vs minimal verifier)
- [ ] [SN-BILL-004](billing.md#sn-bill-004) Entitlement provider abstraction + RevenueCat adapter (verified object, cached LKG)
- [ ] [SN-BILL-005](billing.md#sn-bill-005) Fail-open-to-Free evaluation & offline entitlement grace engine
- [ ] [SN-BILL-006](billing.md#sn-bill-006) StoreKit 2 IAP + on-device JWS entitlement verification (iOS/iPadOS)
- [ ] [SN-BILL-007](billing.md#sn-bill-007) Google Play Billing purchase + acknowledgement (Android)
- [ ] [SN-BILL-008](billing.md#sn-bill-008) Play Integrity licensing/app-integrity check with tiered enforcement
- [ ] [SN-BILL-009](billing.md#sn-bill-009) Web checkout (Razorpay UPI AutoPay + Stripe Billing) + entitlement bridge
- [ ] [SN-BILL-010](billing.md#sn-bill-010) Regional pricing & store product configuration (₹999/yr, ₹149/mo, GST)
- [ ] [SN-BILL-011](billing.md#sn-bill-011) Upgrade paywall overlay UI (billing toggle, plan cards, anti-dark-pattern, a11y)
- [ ] [SN-BILL-012](billing.md#sn-bill-012) Pro feature-gate API & Upgrade-overlay routing
- [ ] [SN-BILL-013](billing.md#sn-bill-013) PDF import monthly quota counter (5/month) & gate
- [ ] [SN-BILL-014](billing.md#sn-bill-014) Account & plan settings tab (current plan, restore, manage subscription)
- [ ] [SN-BILL-015](billing.md#sn-bill-015) Student verification (tiered email allowlist → SheerID → doc) + annual re-verify
- [ ] [SN-BILL-016](billing.md#sn-bill-016) Family/household plan grant in the entitlement layer (up to 6)
- [ ] [SN-BILL-017](billing.md#sn-bill-017) Anti-dark-pattern disclosures, cancellation & refunds
- [ ] [SN-BILL-018](billing.md#sn-bill-018) Receipts/entitlement-token security & anti-piracy posture
- [ ] [SN-BILL-019](billing.md#sn-bill-019) Billing sandbox & test matrix (StoreKit test, Play testers, gateway test mode)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-002

<a id="sn-bill-002"></a>

**Define the plan model and PlanLimits registry (authoritative plan matrix)**

| Field | Value |
|---|---|
| GitHub | #120 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | core |
| Areas | billing |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-STORAGE-1`, `OWASP-A04`, `CWE-807` |
| Extra labels | agent-ready, innovation |

#### Context
Every gate in the app (PDF import, audio length, share size, Convert-to-text, templates, history retention, sync cap) reads from one authoritative plan matrix; without a single source of truth those limits drift between the paywall copy, the enforcement code and the store listing. This issue encodes the plan matrix from docs/product/prd-03-identity-sync-privacy-settings-billing.md §10.1 (authoritative) and docs/design/screens-and-flows.md §14 as immutable value objects in `packages/sane_billing` so the whole product references one registry. It is the foundation the entitlement engine ([SN-BILL-005](billing.md#sn-bill-005)), the feature gate ([SN-BILL-012](billing.md#sn-bill-012)) and the paywall ([SN-BILL-011](billing.md#sn-bill-011)) build on. Deliberately generous Free limits (unlimited notebooks/pages — not GoodNotes' 3-notebook cap) are the acquisition differentiator recorded in research/pricing-monetization-and-student-verification.md §"Recommended plan structure" (PRD-BILL-001).

#### Scope
**In:** a `Plan` enum (`free`, `pro`, and a `lifetime` placeholder), a `PlanLimits` value object with every capability and its Free/Pro value, a `PlanCatalog` exposing the authoritative limits, and `Result`-typed lookups; encode PRD-BILL-001 (unlimited notebooks/pages), PRD-BILL-002 (5 PDF imports/month), PRD-BILL-003 (30-min audio), PRD-BILL-004 (3 people/notebook), PRD-BILL-005 (Convert-to-text / Solve-math / Ask-my-notes preview Pro gates), PRD-BILL-006 (templates: lined/grid/dotted free), PRD-STOR-007 (7-day free history), PRD-SYNC-012 (5 GB/50 GB soft cap).
**Out:** enforcement of any limit (owned by feature areas + [SN-BILL-012](billing.md#sn-bill-012)); the verified entitlement object ([SN-BILL-004](billing.md#sn-bill-004)); prices/currency ([SN-BILL-010](billing.md#sn-bill-010)); paywall UI ([SN-BILL-011](billing.md#sn-bill-011)).

#### Acceptance criteria
- [ ] `PlanCatalog.limits(Plan.free)` and `.limits(Plan.pro)` return every capability in the §10.1 matrix with the exact documented values (5, 30 min, 3, 7 days, 5 GB / 50 GB, unlimited).
- [ ] All `PlanLimits` fields are `final`/immutable value objects (hand-written or `freezed`); a mismatch between code and the §10.1 table is a failing unit test.
- [ ] A capability that is Pro-gated (Convert-to-text, Solve-math, full Ask-my-notes, non-basic templates) is queryable via a single `bool isProGated(Feature)` helper.
- [ ] The soft-cap and version-history values carry a `needs-decision` note in code (`// DESIGN-OPEN`) because PRD-03 §15 leaves the storage-cap metaphor open, defaulting to the §10.1 values.
- [ ] No `dynamic` in the public API; every public member has an explicit return type and `///` dartdoc (CLAUDE.md §6).

#### Technical notes
New files under `packages/sane_billing/lib/src/plan/` (`plan.dart`, `plan_limits.dart`, `plan_catalog.dart`, `feature.dart`), pure Dart, importing only `sane_core` for `Result`/`Failure`. This registry is a compile-time constant table (no I/O). Keep it the single place limits are named so the paywall, gate and store config all reference it (docs/product/prd-03 §10.1; docs/design/screens-and-flows.md §14). Do not couple to prices — those localise per store in [SN-BILL-010](billing.md#sn-bill-010).

#### Security & privacy
Limits are a business-logic access-control boundary; encoding them centrally prevents client-side drift (OWASP-A04 insecure design; CWE-807 reliance on untrusted inputs for a security decision — mitigated by making the *authoritative* copy a constant, with the real gate keyed to the verified entitlement in [SN-BILL-005](billing.md#sn-bill-005)). No secrets, no PII, no logging of plan state beyond an opaque enum. MASVS-STORAGE-1 (no sensitive value cached improperly — this file holds none).

#### UX notes
None beyond baseline (pure model). Baseline: the copy strings that surface these limits live in the paywall/Account tab and localisation, not here; no content or tokens are logged. The registry must expose values the paywall reads verbatim so "5 PDF imports a month" cannot disagree with enforcement (docs/design/screens-and-flows.md §13 copy).

#### Test plan
`packages/sane_billing/test/plan/plan_catalog_test.dart` — asserts every §10.1 value; `plan_limits_test.dart` — immutability + `isProGated` truth table across all features. Golden-free (no painting).

#### Dependencies
[SN-CORE-002](storage.md#sn-core-002) (Result/Failure + entity conventions).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-003

<a id="sn-bill-003"></a>

**SPIKE: choose entitlement verification architecture (RevenueCat vs minimal verifier)**

| Field | Value |
|---|---|
| GitHub | #121 |
| Type | spike |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing, security |
| Size | S |
| SDLC | design |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `OWASP-A04`, `CWE-345` |
| Extra labels | needs-decision |

#### Context
PRD-BILL-011 names **RevenueCat** as the recommended entitlement provider (free to $2,500 MTR, then 1%) and lists Adapty/Qonversion as equivalents, but the zero-server posture (docs/adr/0004-local-first-zero-server.md) leaves a genuine architecture fork the maintainer must decide: adopt a third-party hosted provider (fastest, widest SDK, built-in web billing) versus stand up the minimal stateless `services/entitlements/` verifier that ADR-0004 already sketches (receipt → signed entitlement token, no content). This time-boxed spike compares the two against cost, privacy (TM-P-02 identifiability, TM-P-09 student PII), operational burden, cross-platform grant, and the offline-grace requirement, and writes the decision so [SN-BILL-004](billing.md#sn-bill-004) can build the adapter against a settled choice. Deferring this risks a mid-M8 rewrite of the most revenue-critical package (research/pricing-monetization-and-student-verification.md §3, §8).

#### Scope
**In:** evaluate RevenueCat vs a minimal self-hosted verifier (and briefly Adapty/Qonversion) on: MTR-based cost at projected scale, data residency / PII exposure, cross-platform (iOS+Android+web) entitlement sync, web-billing integration (Stripe/Razorpay), offline verification story, SDK maturity for Flutter, and lock-in; produce a written decision as an appendix to a new or existing ADR (docs/adr) plus a follow-up list.
**Out:** implementing any adapter ([SN-BILL-004](billing.md#sn-bill-004)); building `services/entitlements/`; StoreKit/Play SDK work ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)).

#### Acceptance criteria
- [ ] A written decision recommends one architecture with evidence across cost, privacy, cross-platform grant and offline grace, and records the default (RevenueCat) plus the conditions that would flip it to the self-hosted verifier.
- [ ] The decision states exactly what data the chosen path sends off-device (account id, receipt, student proof) and maps it to TM-P-02 / TM-P-09 with retention limits.
- [ ] The web-billing bridge story (how a Razorpay/Stripe purchase writes the same cross-platform entitlement) is described for the chosen path.
- [ ] An ADR (new `docs/adr/NNNN-entitlement-provider.md` or an appendix to ADR-0004) is written per CLAUDE.md §11 and linked from the epic.

#### Technical notes
Produce a throwaway comparison harness/notes under `tools/` (not shipped). Cite research/pricing-monetization-and-student-verification.md §3, §8, §"Recommended entitlement architecture" and docs/adr/0004-local-first-zero-server.md §services. The chosen provider is keyed to the lightweight account from [SN-AUTH-002](auth.md#sn-auth-002); note that requirement in the decision. No production code, no credentials committed.

#### Security & privacy
The decision *is* a privacy-boundary decision. Threats: TM-P-02 (IP + device id + timing identify a user behind pseudonymous entitlement data), TM-P-09 (student email/ID over-collected), TM-S-05 (forge-ability of the entitlement token). Controls to weigh: pinned-key server-signed tokens (MASVS-AUTH-1, CWE-345), TLS-only + pinning (MASVS-NETWORK-1), minimise identifiers and retention (MASVS-PRIVACY). Baseline: the harness touches no user data and hardcodes no keys.

#### UX notes
None beyond baseline (research spike). The only UX-relevant output is confirming the offline-grace behaviour that [SN-BILL-005](billing.md#sn-bill-005) and the paywall depend on: premium keeps working offline on a cached last-known-good entitlement.

#### Test plan
Throwaway harness; the deliverable is the ADR + comparison table. No production tests.

#### Dependencies
[SN-BILL-002](billing.md#sn-bill-002) (plan model context); needs the account concept from [SN-AUTH-002](auth.md#sn-auth-002) for the cross-platform key discussion.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-004

<a id="sn-bill-004"></a>

**Implement the entitlement provider abstraction and RevenueCat adapter**

| Field | Value |
|---|---|
| GitHub | #122 |
| Type | feature |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `MASVS-STORAGE-1`, `ASVS-V6`, `OWASP-A01`, `OWASP-A08`, `CWE-345`, `CWE-807` |
| Extra labels | needs-credentials, needs-decision |

#### Context
The client must gate premium behind a **verified entitlement object** shared across iOS/Android/web for a signed-in account, never a boolean on disk (PRD-BILL-011, P0). This issue defines the pure-Dart `EntitlementProvider` interface in `sane_billing` and the concrete RevenueCat adapter (the default chosen in [SN-BILL-003](billing.md#sn-bill-003)), so a later swap to a self-hosted verifier or Adapty/Qonversion is a one-adapter change. The provider validates every transaction, hosts entitlement state, and exposes a `CustomerInfo`-style object the whole app reads through Riverpod. This is the spine of monetization: purchase paths ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)) write to it and the feature gate ([SN-BILL-012](billing.md#sn-bill-012)) reads from it (research/pricing-monetization-and-student-verification.md §3, §8; docs/product/prd-03 §10.2).

#### Scope
**In:** the `EntitlementProvider` interface (`refresh()`, `currentEntitlement`, purchase/restore hooks, a stream of entitlement changes); the RevenueCat adapter wired in `app/` via `purchases_flutter`; the `Entitlement` value object (plan, source, expiry, isActive, lastVerifiedAt); keying the provider to the [SN-AUTH-002](auth.md#sn-auth-002) account id; secure caching of the last-known-good entitlement.
**Out:** the fail-open/grace evaluation logic ([SN-BILL-005](billing.md#sn-bill-005)); store-specific purchase flows ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)); the paywall/Account UI ([SN-BILL-011](billing.md#sn-bill-011)/[SN-BILL-014](billing.md#sn-bill-014)); server-side receipt validation internals (the provider owns them).

#### Acceptance criteria
- [ ] The public interface lives in pure-Dart `sane_billing`; the RevenueCat SDK is imported only in `app/` (no `package:flutter` or SDK import inside the package — CLAUDE.md §3).
- [ ] Premium is represented only by a verified `Entitlement` object; there is **no** writable "isPro" boolean persisted to disk (grep test asserts this).
- [ ] The provider is keyed to the signed-in account id so an iOS, Android or web purchase for that account resolves to the same active entitlement.
- [ ] The last-known-good entitlement is cached via `sane_secure_store` (or an encrypted store), never in plain SharedPreferences/localStorage; the cache stores a signed/opaque object, not a plain flag.
- [ ] All network calls to the provider are TLS-only with certificate pinning for first-party endpoints and fail **open to Free** on network error (never a crash, never a hard block).

#### Technical notes
Interface in `packages/sane_billing/lib/src/entitlement/` (`entitlement_provider.dart`, `entitlement.dart`); adapter `app/lib/billing/revenuecat_provider.dart` using `purchases_flutter`. Config (`SANE_ENTITLEMENTS_URL`, RevenueCat public API keys) via `--dart-define`/flavour env (docs/architecture/overview.md §flavours), never committed. Implements PRD-BILL-011 and docs/adr/0004-local-first-zero-server.md §services. Needs the maintainer's RevenueCat project + store product IDs (`needs-credentials`).

#### Security & privacy
Threats: TM-S-05 (spoofed Pro entitlement), TM-P-02 (identifiability at provider). Controls: verified entitlement object gates access (MASVS-AUTH-1, ASVS-V6, CWE-345 insufficient verification, CWE-807 security decision on untrusted data → mitigated by provider-side validation + pinned transport), TLS + pinning (MASVS-NETWORK-1), cache in secure storage only (MASVS-STORAGE-1), fail-open design (OWASP-A04/A08). Never log the account id, receipt or entitlement token; log only an opaque plan enum.

#### UX notes
No direct UI; exposes the entitlement stream the paywall ([SN-BILL-011](billing.md#sn-bill-011)) and Account tab ([SN-BILL-014](billing.md#sn-bill-014)) render. A returning web purchaser's app must reflect Pro within a poll cycle (SDK polls `CustomerInfo` on foreground — research §4.2). Empty/error state: on provider failure the app shows Free silently, never an error wall.

#### Test plan
`packages/sane_billing/test/entitlement/entitlement_provider_test.dart` (interface contract with a fake adapter); `app/test/billing/revenuecat_provider_test.dart` (mapping SDK CustomerInfo → `Entitlement`, cache-in-secure-store, fail-open on error); a no-boolean-on-disk grep/analyzer test.

#### Dependencies
[SN-BILL-002](billing.md#sn-bill-002), [SN-BILL-003](billing.md#sn-bill-003), [SN-AUTH-002](auth.md#sn-auth-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-005

<a id="sn-bill-005"></a>

**Implement fail-open-to-Free evaluation and offline entitlement grace**

| Field | Value |
|---|---|
| GitHub | #778 |
| Type | task |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-004](billing.md#sn-bill-004) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-STORAGE-1`, `OWASP-A04`, `CWE-807` |
| Extra labels | agent-ready |

#### Context
The product's non-negotiable billing rule is that an entitlement problem must **degrade to Free and never punish the user** — a paying student on a plane, a flaky network, or a provider outage must keep writing notes and keep their already-created content (docs/roadmap.md M8 exit criteria; research/pricing-monetization-and-student-verification.md §9 "Don't punish offline usage"). This issue is the deterministic evaluation engine that turns a possibly-stale, possibly-absent verified `Entitlement` (from [SN-BILL-004](billing.md#sn-bill-004)) into an effective plan, applying an offline grace window and a re-verify cadence. It sits between the provider adapter and the feature gate ([SN-BILL-012](billing.md#sn-bill-012)) so every gate decision goes through one audited rule. Getting it wrong either locks out paying users (unacceptable) or hands out Pro forever from a single cached grant (revenue leak) — so the grace window and staleness handling are the whole point.

#### Scope
**In:** an `EntitlementEvaluator` that maps `(verifiedEntitlement?, now, lastVerifiedAt)` → `EffectivePlan`; an offline grace window (default 14 days of last-known-good before falling to Free); a re-verify cadence (attempt refresh on foreground and after the grace half-life); explicit "active", "grace", "expired→Free" states; deterministic clock injection for testing.
**Out:** the provider/network refresh itself ([SN-BILL-004](billing.md#sn-bill-004)); UI copy for a lapsed subscription ([SN-BILL-014](billing.md#sn-bill-014)); the gate that consumes the effective plan ([SN-BILL-012](billing.md#sn-bill-012)).

#### Acceptance criteria
- [ ] With no cached entitlement and no network, the effective plan is **Free** (never a crash, never a block on note-taking).
- [ ] With a valid cached Pro entitlement and no network, the effective plan is **Pro** for the whole grace window; after the window it degrades to Free.
- [ ] A signature-invalid or tampered cached entitlement is rejected (fail closed on authenticity) and the plan degrades to Free (fail open on availability).
- [ ] The evaluator is pure and clock-injected: unit tests drive time forward across the grace boundary and assert every transition.
- [ ] Degrading to Free never deletes or hides existing notes; only Pro-gated *new* actions are affected (verified by a test asserting note read/write is plan-independent).

#### Technical notes
`packages/sane_billing/lib/src/entitlement/entitlement_evaluator.dart`, pure Dart, clock injected via a `Clock` abstraction from `sane_core`. Consumes the `Entitlement` from [SN-BILL-004](billing.md#sn-bill-004) and its `lastVerifiedAt`. The grace-window default (14 days) is a documented constant with a `// DESIGN-OPEN` note; re-verify cadence follows research §9 ("cache last-known-good, re-verify periodically and after a grace window"). Implements PRD-BILL-011's "cached last-known-good for offline grace".

#### Security & privacy
Threat: TM-S-05 (a stale/forged entitlement granting Pro indefinitely). Controls: authenticity checked before trust (fail closed on bad signature — MASVS-AUTH-1, CWE-345), availability degrades open to Free (OWASP-A04 secure-by-design default; CWE-807 avoids trusting an unbounded cached flag by bounding it with a grace window). No PII; the evaluator logs only opaque state transitions at debug level, never the entitlement contents.

#### UX notes
None beyond baseline; this engine has no UI. Baseline: it must guarantee the note-taking surface is never gated by plan state, and it feeds the "Verified · until <date>" and lapsed-plan copy that [SN-BILL-014](billing.md#sn-bill-014) renders. No content or tokens logged.

#### Test plan
`packages/sane_billing/test/entitlement/entitlement_evaluator_test.dart` — table-driven across (present/absent/tampered) × (fresh/stale/expired) × network states, asserting Free/Pro/grace transitions and that note read/write is always allowed.

#### Dependencies
[SN-BILL-004](billing.md#sn-bill-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-006

<a id="sn-bill-006"></a>

**Implement StoreKit 2 IAP with on-device JWS entitlement verification**

| Field | Value |
|---|---|
| GitHub | #123 |
| Type | feature |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, ios-phone |
| Areas | billing |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `MASVS-CODE-4`, `MASVS-RESILIENCE-2`, `ASVS-V6`, `OWASP-A08`, `CWE-345` |
| Extra labels | needs-credentials |

#### Context
On iOS/iPadOS, unlocking Pro **must** use StoreKit 2 in-app purchase (Apple Guideline 3.1.1); custom license keys are forbidden and would be a rejection. StoreKit 2 also gives a genuinely serverless offline check: `Transaction.currentEntitlements` returns Apple-signed JWS transactions verified locally against Apple's public keys, so Pro works on a plane and cannot be trivially forged (PRD-BILL-008, P0; research/pricing-monetization-and-student-verification.md §2.1, §8.1). This issue wires the Apple purchase flow and the on-device belt-and-suspenders verification into the entitlement provider ([SN-BILL-004](billing.md#sn-bill-004)), enrolling the product in the subscription group with Family Sharing enabled (the mechanism for [SN-BILL-016](billing.md#sn-bill-016) bonus) and the Small Business Program (15%). It is one of the three purchase surfaces the epic unifies.

#### Scope
**In:** StoreKit 2 product fetch, purchase, and transaction handling for the Pro subscription (monthly + yearly) and the 14-day intro free trial; on-device JWS verification via `Transaction.currentEntitlements` feeding the entitlement provider; subscription-group + Family Sharing configuration notes; graceful handling of pending/deferred/cancelled/refunded transactions.
**Out:** Play Billing ([SN-BILL-007](billing.md#sn-bill-007)); web checkout ([SN-BILL-009](billing.md#sn-bill-009)); the paywall UI ([SN-BILL-011](billing.md#sn-bill-011)); price definitions ([SN-BILL-010](billing.md#sn-bill-010)); the family-grant logic in the entitlement layer ([SN-BILL-016](billing.md#sn-bill-016)).

#### Acceptance criteria
- [ ] A sandbox purchase of the yearly and monthly Pro products completes and results in an active entitlement within one refresh; a 14-day free trial starts without an immediate charge.
- [ ] `Transaction.currentEntitlements` JWS is verified on-device (Apple public key) with **no network call required**; a tampered/absent transaction yields no Pro (fail closed on authenticity) but the app still runs as Free (fail open on availability).
- [ ] Refunded/expired/cancelled transactions remove Pro at the next evaluation; pending (ask-to-buy / deferred) purchases show a non-blocking pending state.
- [ ] No license key, QR, or side-channel unlock exists (Guideline 3.1.1 compliance); the only unlock path is StoreKit + the verified entitlement.
- [ ] `StoreKit Testing` (.storekit config) drives the flow in CI-friendly tests; no secrets committed.

#### Technical notes
Driven through `purchases_flutter` (RevenueCat StoreKit 2 mode) or `in_app_purchase_storekit`, wired in `app/lib/billing/` and feeding [SN-BILL-004](billing.md#sn-bill-004). Requires an Apple Developer team, App Store Connect subscription group, product IDs and a `.storekit` test file (`needs-credentials`). Enroll in Small Business Program (15%) and enable Family Sharing on the subscription (App Store Connect, irreversible) per research §2.2, §5. Implements PRD-BILL-008. No dynamic code / OTA (MASVS-CODE-4, TM-T-04).

#### Security & privacy
Threats: TM-S-05 (forged Pro), TM-T-04 (tampered client). Controls: Apple-signed JWS verified on-device (MASVS-AUTH-1, ASVS-V6, CWE-345), TLS-only for any store calls (MASVS-NETWORK-1), no custom unlock (MASVS-RESILIENCE-2, OWASP-A08 integrity). Never log the transaction JWS, original transaction id, or account token; log an opaque plan enum only.

#### UX notes
Purchase is initiated from the Upgrade overlay (docs/design/screens-and-flows.md §13) and restore from Account & plan (§12); this issue owns only the platform plumbing behind those buttons. States: purchasing (spinner, cancellable), success (toast "Pro trial started — 14 days free"), pending (ask-to-buy), failure (non-blocking toast, stays Free). a11y labels on any native sheet are Apple-provided.

#### Test plan
`app/test/billing/storekit_purchase_test.dart` (product fetch → purchase → entitlement mapping with a fake StoreKit); `app/integration_test/billing_sandbox_test.dart` StoreKit-test lane (trial start, refund removes Pro, offline JWS verify). Manual: sandbox account purchase on a device.

#### Dependencies
[SN-BILL-004](billing.md#sn-bill-004), [SN-BILL-010](billing.md#sn-bill-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-007

<a id="sn-bill-007"></a>

**Implement Google Play Billing purchase and acknowledgement**

| Field | Value |
|---|---|
| GitHub | #124 |
| Type | feature |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | android-tablet, android-phone |
| Areas | billing |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `MASVS-CODE-4`, `ASVS-V6`, `OWASP-A08`, `CWE-345` |
| Extra labels | needs-credentials |

#### Context
On Android, unlocking Pro **must** use Google Play Billing for digital subscriptions, and every purchase must be **acknowledged** within Google's window or it auto-refunds (PRD-BILL-009, P0; research/pricing-monetization-and-student-verification.md §2.4, §8.2). Unlike Apple, Google "strongly recommends" server-side verification, so Android leans on the hosted entitlement provider ([SN-BILL-004](billing.md#sn-bill-004)) for robustness rather than pure on-device checks. This issue wires the Play purchase flow, acknowledgement, and the India user-choice-billing option (which also enables the Razorpay UPI alternative and shaves ~4% off the fee) into the entitlement provider. It is the Android sibling of [SN-BILL-006](billing.md#sn-bill-006) and one of the three unified purchase surfaces.

#### Scope
**In:** Play Billing product query, purchase and **acknowledgement** for the Pro subscription (monthly + yearly) and the 14-day trial base-plan/offer; purchase-token hand-off to the entitlement provider; India **user-choice billing** enrollment path (offer Play Billing + Razorpay UPI side by side); pending-purchase and repurchase handling.
**Out:** StoreKit ([SN-BILL-006](billing.md#sn-bill-006)); the Play Integrity licensing check ([SN-BILL-008](billing.md#sn-bill-008)); web checkout ([SN-BILL-009](billing.md#sn-bill-009)); prices ([SN-BILL-010](billing.md#sn-bill-010)); paywall UI ([SN-BILL-011](billing.md#sn-bill-011)).

#### Acceptance criteria
- [ ] A license-tester purchase of yearly and monthly Pro completes and is **acknowledged**; an unacknowledged purchase is proven to auto-refund (documented + guarded by a test that fails if acknowledgement is skipped).
- [ ] The 14-day free-trial offer starts without an immediate charge; the effective entitlement becomes Pro within one provider refresh.
- [ ] Pending (slow card / UPI mandate) purchases surface a non-blocking pending state and resolve to Pro on completion; a cancelled/refunded purchase removes Pro at next evaluation.
- [ ] India build exposes user-choice billing (Play Billing OR Razorpay UPI) where enabled; the app never hard-locks if billing is unavailable (degrades to Free).
- [ ] No license key or side-channel unlock; the only unlock path is a Play purchase feeding the verified entitlement.

#### Technical notes
Driven through `purchases_flutter` (RevenueCat Play Billing mode) or `in_app_purchase_android`, wired in `app/lib/billing/` and feeding [SN-BILL-004](billing.md#sn-bill-004). Requires a Play Console account, subscription products/base-plans/offers, and license testers (`needs-credentials`). India user-choice billing is enrolled in Play Console → Settings → Alternative billing (research §2.4). Purchases must be acknowledged; prefer server-side (provider) verification. No dynamic code / OTA (MASVS-CODE-4). Implements PRD-BILL-009.

#### Security & privacy
Threats: TM-S-05 (forged Pro), TM-T-04 (tampered client). Controls: provider-side purchase-token validation (MASVS-AUTH-1, ASVS-V6, CWE-345), TLS + pinning (MASVS-NETWORK-1), no custom unlock (OWASP-A08). Never log the purchase token or order id; log an opaque plan enum. The Play Integrity licensing signal is added in [SN-BILL-008](billing.md#sn-bill-008) (tiered, non-punitive).

#### UX notes
Purchase starts from the Upgrade overlay (docs/design/screens-and-flows.md §13); this issue owns the plumbing. States: purchasing, pending (UPI mandate / slow settlement), success (toast "Pro trial started — 14 days free"), failure (non-blocking toast, stays Free). The user-choice billing sheet is Google-provided; ensure our labels are localised.

#### Test plan
`app/test/billing/play_billing_test.dart` (query → purchase → acknowledge → entitlement mapping with a fake billing client; test that missing acknowledgement fails the guard); `app/integration_test/billing_sandbox_test.dart` Play-tester lane (trial, refund removes Pro, pending resolves).

#### Dependencies
[SN-BILL-004](billing.md#sn-bill-004), [SN-BILL-010](billing.md#sn-bill-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-008

<a id="sn-bill-008"></a>

**Add Play Integrity licensing check with tiered, non-punitive enforcement**

| Field | Value |
|---|---|
| GitHub | #779 |
| Type | security |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | android-tablet, android-phone |
| Areas | billing, security |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-007](billing.md#sn-bill-007) |
| Depends on | — |
| Security controls | `MASVS-RESILIENCE-1`, `MASVS-RESILIENCE-2`, `MASVS-RESILIENCE-4`, `MASVS-CODE-4`, `OWASP-A08`, `CWE-693` |
| Extra labels | needs-credentials |

#### Context
A local-first app can't stop a cracked APK from flipping a flag on-device, but it can make piracy not worth the effort with a lightweight Play Integrity check: `appLicensingVerdict = LICENSED` confirms the user got the app on Google Play, `appRecognitionVerdict` catches tampered binaries, and device integrity flags emulators/rooted devices (PRD-BILL-009; research/pricing-monetization-and-student-verification.md §9). Google's own guidance and the PRD both insist on **tiered enforcement — degrade, never hard-lock** — because false positives lock out paying students. This issue adds that signal as one input to the entitlement decision, never as the sole gate, and never as a reason to block note-taking. It complements the signed StoreKit/Play purchases (which already resist forgery) rather than replacing them.

#### Scope
**In:** request a Play Integrity token, evaluate `appLicensingVerdict` / `appRecognitionVerdict` / device integrity (hardware-backed where available), and feed a `PiracyRisk` signal into the entitlement/anti-abuse layer; a **tiered response** ladder (full → soft-degrade extras → nudge, never hard-lock); rate-limited, cached integrity checks to avoid battery/latency cost.
**Out:** the StoreKit equivalent (Apple's signed JWS already covers iOS — [SN-BILL-006](billing.md#sn-bill-006)); the purchase flow itself ([SN-BILL-007](billing.md#sn-bill-007)); any UI that accuses the user (there is none — the response is silent degradation).

#### Acceptance criteria
- [ ] The check requests a Play Integrity verdict and classifies it into a `PiracyRisk` enum without ever throwing on the note-taking path.
- [ ] Enforcement is **tiered**: an unlicensed/tampered verdict may soft-limit Pro *extras*, but **never** blocks opening, creating, editing, or exporting existing notes (asserted by test).
- [ ] A false-positive-prone signal (no network, Play services absent, older device) resolves to "allow" (fail open), never to a lock.
- [ ] Integrity checks are rate-limited/cached (not on every launch) so they add no measurable startup or battery regression.
- [ ] No accusatory UI, no hard error wall; the response is silent degradation of paid extras only.

#### Technical notes
Use the Play Integrity API via a thin platform channel or `google_play_integrity`-style plugin wired in `app/lib/billing/`; the pure-Dart `sane_billing` only sees a `PiracyRisk` value object. Requires a Google Cloud project + Play Integrity enablement and a cloud project number (`needs-credentials`). Follow research §9: hardware-backed signals, integrity as "part of an overall strategy, not the sole mechanism", tiered enforcement. Implements the anti-piracy half of PRD-BILL-009. No dynamic code (MASVS-CODE-4).

#### Security & privacy
Threat: TM-S-05 (unlocking Pro without paying via a cracked build). Controls: Play Integrity licensing/app/device verdicts (MASVS-RESILIENCE-1/2/4), integrity-as-defence-in-depth (OWASP-A08), tiered enforcement avoids the security-decision anti-pattern of hard-failing legitimate users (CWE-693 protection-mechanism failure). The integrity token is verified server-side by the provider where possible; never log the raw token or device identifiers.

#### UX notes
None beyond baseline — by design there is no user-facing integrity UI (no accusations, no lock). Baseline: the only observable effect is that pirated builds silently lose Pro *extras* while note-taking stays fully functional. No content or tokens logged.

#### Test plan
`app/test/billing/play_integrity_test.dart` — maps mocked verdicts to `PiracyRisk`; asserts note read/write/export is never blocked for any verdict; asserts fail-open when Play services/network are unavailable; asserts checks are cached/rate-limited.

#### Dependencies
[SN-BILL-007](billing.md#sn-bill-007), [SN-BILL-005](billing.md#sn-bill-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-009

<a id="sn-bill-009"></a>

**Implement web checkout (Razorpay UPI AutoPay + Stripe) with entitlement bridge**

| Field | Value |
|---|---|
| GitHub | #125 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | billing |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-NETWORK-1`, `MASVS-AUTH-1`, `ASVS-V6`, `OWASP-A01`, `OWASP-A07`, `OWASP-A08`, `CWE-345`, `CWE-522` |
| Extra labels | needs-credentials, innovation |

#### Context
Many Indian students have no card, so the highest-converting and most margin-friendly purchase path is web checkout with **Razorpay Subscriptions + UPI AutoPay** for India and **Stripe Billing** globally (PRD-BILL-010; research/pricing-monetization-and-student-verification.md §4). A web purchase must unlock the mobile app too, which is legally honorable under Apple 3.1.3(b) multiplatform / Google cross-platform tolerance **provided the same plan is also sold via IAP/Play Billing** ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)). This issue builds the web checkout on the PWA surface and the bridge that writes the same cross-platform entitlement (via the provider from [SN-BILL-004](billing.md#sn-bill-004)) so signing in on any device lights up Pro. Critically, it must **not** surface or deep-link the cheaper web price inside the iOS app except in the US/EU carve-outs, or the app risks rejection.

#### Scope
**In:** a Razorpay Subscriptions (UPI AutoPay) checkout for India and a Stripe Billing checkout globally, launched from the web/PWA paywall; wiring the completed purchase to the entitlement provider so it writes the same account-scoped entitlement; the return-to-app poll that confirms activation; storefront/geo segmentation so iOS never advertises the web price outside US/EU.
**Out:** the mobile store purchases ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)); the paywall visual design ([SN-BILL-011](billing.md#sn-bill-011)); refunds (covered in [SN-BILL-017](billing.md#sn-bill-017)); GST/price configuration ([SN-BILL-010](billing.md#sn-bill-010)).

#### Acceptance criteria
- [ ] An India web user can subscribe via UPI AutoPay (Razorpay) and a global user via Stripe; both write an account-scoped entitlement that unlocks Pro on web and, on next foreground poll, on mobile.
- [ ] The same Pro plan is confirmed available via IAP/Play Billing (3.1.3(b) compliance); a checklist/test asserts the iOS app does **not** surface or deep-link the web price outside the US/EU storefronts.
- [ ] Checkout runs over TLS only; no card/UPI credential ever touches Sane code (gateway-hosted checkout); the app stores no PAN/VPA.
- [ ] A failed or abandoned web checkout leaves the account on Free with no partial entitlement; a completed one is idempotent (a double redirect does not double-charge or duplicate the entitlement).
- [ ] Returning to the app after web purchase reflects Pro within one poll cycle (SDK/`CustomerInfo` poll on foreground).

#### Technical notes
Web checkout uses Razorpay Subscriptions (UPI AutoPay) and Stripe Billing hosted checkout, invoked from the PWA build (app/ web output) and wired to the provider (RevenueCat Web Billing / Stripe, or provider web paywall) so the purchase writes the cross-platform entitlement (research §4.2). Keys (Razorpay/Stripe publishable + secret handled gateway-side, provider webhooks) via CI secrets / provider config, never committed (`needs-credentials`). Geo/storefront segmentation per research §4.2 and PRD-BILL-010. GST is Sane's responsibility on Razorpay web (handled in [SN-BILL-010](billing.md#sn-bill-010)).

#### Security & privacy
Threats: TM-S-05 (forged entitlement), TM-P-02 (identifiability), payment-data exposure. Controls: hosted gateway checkout (no card data in-app → CWE-522 avoided), TLS + pinning (MASVS-NETWORK-1), provider-verified entitlement (MASVS-AUTH-1, ASVS-V6, CWE-345), idempotent grant (OWASP-A08), account-scoped access (OWASP-A01/A07). Never log VPA/card/token/email; log only an opaque plan + gateway result code.

#### UX notes
Launches from the web/PWA Upgrade overlay (docs/design/screens-and-flows.md §13). States: redirecting to gateway, processing/pending (UPI mandate approval), success ("Pro trial started — 14 days free"), failure (stays Free, retry offered). Must show the real recurring price + cadence before the CTA (anti-dark-pattern, [SN-BILL-017](billing.md#sn-bill-017)). Keyboard-operable, a11y-labelled controls (web WCAG 2.2 AA).

#### Test plan
`app/test/billing/web_checkout_test.dart` (Razorpay/Stripe launch + entitlement-write mapping with fakes; idempotency; abandoned checkout stays Free); a storefront-segmentation test asserting no web-price surfacing on iOS outside US/EU; `app/integration_test/billing_sandbox_test.dart` gateway test-mode lane.

#### Dependencies
[SN-BILL-004](billing.md#sn-bill-004), [SN-AUTH-002](auth.md#sn-auth-002), [SN-BILL-010](billing.md#sn-bill-010).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-010

<a id="sn-bill-010"></a>

**Configure regional pricing and store products (INR-first, GST, global points)**

| Field | Value |
|---|---|
| GitHub | #126 |
| Type | task |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing |
| Size | S |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-NETWORK-1`, `OWASP-A04`, `CWE-472` |
| Extra labels | needs-credentials |

#### Context
Pricing must be store-localized and India-first: the reference is **₹999/yr (~₹83/mo)** and **₹149/mo**, yearly default with "save 44%" and a 14-day free trial, with global pricing allowed to differ (~$2.99/mo, ~$19.99/yr) and **18% GST** applied in India (PRD-BILL-007, P0; research/pricing-monetization-and-student-verification.md §7.1). Apple's 800 price points and Play's localized INR let us hit round, psychologically-priced numbers rather than blind currency conversion. This issue defines the product identifiers, price tiers, trial/intro offers and the display-price model the paywall reads, and documents the store-side product setup so the purchase surfaces ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)) all reference the same catalog. Prices are display-only and never a security boundary — the entitlement, not the price, gates access.

#### Scope
**In:** a `ProductCatalog` mapping Pro monthly/yearly (and the lifetime placeholder) to per-store product IDs and localized display prices; the yearly "save 44%" derivation; trial/intro-offer config (14-day free trial); GST-inclusive display for India web (Razorpay) vs store-handled tax for IAP; documentation of the App Store Connect / Play Console product setup.
**Out:** the plan *limits* ([SN-BILL-002](billing.md#sn-bill-002)); the purchase SDKs ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)); the paywall visual ([SN-BILL-011](billing.md#sn-bill-011)); student-discount offer codes ([SN-BILL-015](billing.md#sn-bill-015)).

#### Acceptance criteria
- [ ] The catalog exposes localized display prices sourced from the store (StoreKit `Product.displayPrice` / Play `formattedPrice`), never a hardcoded currency string, so a user always sees their storefront's real price.
- [ ] India reference values render as ₹999/yr and ₹149/mo with "about ₹83 a month" and "save 44%" derived from the two, matching design copy (docs/design/screens-and-flows.md §13).
- [ ] The 14-day free-trial intro offer is configured for both monthly and yearly and reflected in the catalog.
- [ ] India web (Razorpay) prices display GST-inclusive (18%); IAP/Play prices rely on store tax handling; a note documents which path owns tax.
- [ ] Product IDs are placeholders in code with a documented mapping to the maintainer's real store products (`needs-credentials`), and no price is treated as an access-control input.

#### Technical notes
`packages/sane_billing/lib/src/pricing/product_catalog.dart` (IDs + derivation helpers, pure Dart) with concrete display prices fetched at runtime from the store SDK in `app/`. Reference research §7.1 (₹ round numbers, 800 Apple price points, 18% GST) and PRD-BILL-007. Store product creation (App Store Connect subscription group, Play base-plans/offers) is documented here and executed by the maintainer with their accounts.

#### Security & privacy
Display prices are not a trust boundary — the verified entitlement is (OWASP-A04 secure design: never gate on a client-side price; CWE-472 external control of an assumed-immutable value is avoided by reading price from the store, not client input). Store/gateway price fetches are TLS-only (MASVS-NETWORK-1). No PII; no secrets in code (product IDs are not secret; gateway keys live in CI/provider config).

#### UX notes
Feeds the Upgrade overlay's billing toggle and price labels (docs/design/screens-and-flows.md §13: "Yearly · save 44%" / "₹999 per year · about ₹83 a month" / "₹149 per month · cancel anytime") and the Account tab "from ₹83/mo" CTA (§12). Localized number/currency formatting per locale (i18n); prices must be readable by screen readers as full amounts, not glyphs.

#### Test plan
`packages/sane_billing/test/pricing/product_catalog_test.dart` — "save 44%" and "~₹83/mo" derivations from ₹999/₹149; GST-inclusive India-web computation; a test asserting no code path uses price for a gating decision.

#### Dependencies
[SN-BILL-002](billing.md#sn-bill-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-011

<a id="sn-bill-011"></a>

**Build the Upgrade paywall overlay (plan cards, billing toggle, honest disclosure)**

| Field | Value |
|---|---|
| GitHub | #127 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing, onboarding |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A04` |
| Extra labels | agent-ready |

#### Context
The Upgrade overlay is the single conversion surface every Pro gate routes to, and the design specifies it precisely: heading "Everything, for the price of a chai a week", a Yearly/Monthly billing toggle (Yearly default, "save 44%"), a Free card (₹0 forever) and a Pro card badged "MOST STUDENTS", and a "Start 14-day free trial" CTA (docs/design/screens-and-flows.md §13). It must be honest by construction — real recurring price, currency and cadence shown before the CTA, no pre-selected add-ons, no hidden auto-renew — to satisfy the anti-dark-pattern requirement (PRD-BILL-017) and accessibility basics (PRD-BILL-018). This issue builds that overlay in `sane_ui`/`app`, reading prices from [SN-BILL-010](billing.md#sn-bill-010) and starting purchases via the platform surfaces ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)). It is where students meet Pro, so its clarity is a product and legal requirement, not polish.

#### Scope
**In:** the Upgrade overlay widget (modal/sheet, adaptive to phone→tablet), the billing toggle, Free/Pro comparison cards with the design's exact feature copy, the "MOST STUDENTS" badge, the trial CTA, the real-price disclosure line, and the entry-point plumbing that any gate can open with a `reason` (e.g. "PDF imports"); golden tests across looks.
**Out:** the actual purchase SDK calls ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)); price derivation ([SN-BILL-010](billing.md#sn-bill-010)); the gate routing logic ([SN-BILL-012](billing.md#sn-bill-012)); cancellation/refund copy ([SN-BILL-017](billing.md#sn-bill-017)); the Account & plan tab ([SN-BILL-014](billing.md#sn-bill-014)).

#### Acceptance criteria
- [ ] The overlay matches design §13: heading + subhead, Yearly(default)/Monthly toggle, Free card (₹0 forever + its 5 bullets), Pro card ("MOST STUDENTS" + its 5 bullets), "Start 14-day free trial" CTA.
- [ ] The real recurring price, currency and cadence are visible **before** the CTA ("renews at ₹999/year, cancel anytime"); there is no pre-ticked add-on and no obscured auto-renew (PRD-BILL-017).
- [ ] Renders correctly across all 17 looks and light/dark; the "recommended" (Pro) plan is distinguished by more than colour (badge + label), meeting WCAG 2.2 AA and PRD-BILL-018.
- [ ] All price/plan controls have screen-reader labels reading full amounts; tap targets ≥ 44pt/48dp; keyboard-operable on web.
- [ ] Opening the overlay accepts a `reason` string so the toast/context reflects which gate triggered it (e.g. "Free plan: 5 PDF imports a month").

#### Technical notes
Build with `sane_ui` components ([SN-DS-003](design-system.md#sn-ds-003)) and tokens only (no hardcoded colours — CLAUDE.md §9); widget in `app/lib/billing/upgrade_overlay.dart`. Prices from [SN-BILL-010](billing.md#sn-bill-010); CTA dispatches to the platform purchase provider. Copy strings go through i18n. Implements PRD-BILL-007 (display), PRD-BILL-017, PRD-BILL-018 and docs/design/screens-and-flows.md §13.

#### Security & privacy
None beyond baseline plus the honest-disclosure control: the UI must not employ deceptive design (OWASP-A04 insecure/deceptive design; FTC dark-pattern list, research §10). Baseline: no note content, tokens, or account PII rendered or logged here; the overlay only reads plan/price display values. MASVS-PRIVACY-1 (no over-collection in the conversion flow).

#### UX notes
Source of truth: docs/design/screens-and-flows.md §13 (Upgrade overlay) with copy from §11.2 ("Everything, for the price of a chai a week" / "Student pricing. Free stays free — Pro removes the limits"). Empty/error: if prices fail to load, show the plan structure with a retry rather than a blank sheet; never block dismissal. Dismiss is always one tap (no gauntlet). Cover all 17 looks + dark via goldens.

#### Test plan
`app/test/billing/upgrade_overlay_test.dart` (widget: toggle switches price, reason string surfaces, CTA dispatches, dismiss always works); `app/test/billing/upgrade_overlay_golden_test.dart` (golden per look + light/dark); a11y test asserting semantic labels + target sizes.

#### Dependencies
[SN-BILL-002](billing.md#sn-bill-002), [SN-BILL-010](billing.md#sn-bill-010), [SN-DS-003](design-system.md#sn-ds-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-012

<a id="sn-bill-012"></a>

**Implement the Pro feature-gate API and Upgrade-overlay routing**

| Field | Value |
|---|---|
| GitHub | #128 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `OWASP-A01`, `OWASP-A04`, `CWE-807` |
| Extra labels | agent-ready |

#### Context
Every Pro-gated action across the app — Convert-to-text, Solve math, full Ask-my-notes, non-basic templates, and (via their own areas) the audio cap and share cap — needs one consistent way to ask "is this allowed on the current plan, and if not, open Upgrade with the right reason" (PRD-BILL-005/006; docs/design/screens-and-flows.md §8, §14). This issue builds that `FeatureGate` API in `sane_billing`/`app`: it reads the effective plan from the evaluator ([SN-BILL-005](billing.md#sn-bill-005)), checks the limit registry ([SN-BILL-002](billing.md#sn-bill-002)), and either proceeds or routes to the Upgrade overlay ([SN-BILL-011](billing.md#sn-bill-011)) with a contextual toast. Centralising this prevents the classic bug where one surface enforces a limit and another forgets, and it keeps the security decision anchored to the verified entitlement rather than scattered booleans.

#### Scope
**In:** a `FeatureGate.check(Feature)` returning `allowed` / `gated(reason)`; a `FeatureGate.run(Feature, action)` helper that either runs the action or opens Upgrade with the design's toast; wiring for the four editor Pro actions (Convert-to-text, Solve math, Ask-my-notes preview, Pro templates); a stable `Feature` enum shared with feature areas so audio ([SN-AUD-001](audio.md#sn-aud-001)) and collab ([SN-COL-001](collaboration.md#sn-col-001)) call the same gate.
**Out:** the plan registry ([SN-BILL-002](billing.md#sn-bill-002)); the entitlement evaluator ([SN-BILL-005](billing.md#sn-bill-005)); the paywall UI ([SN-BILL-011](billing.md#sn-bill-011)); the PDF import counter ([SN-BILL-013](billing.md#sn-bill-013)); audio-cap and share-cap enforcement UI (their areas, using this gate).

#### Acceptance criteria
- [ ] `FeatureGate.check` returns `gated` for a Free user on a Pro feature and `allowed` for a Pro user, driven solely by the effective plan from [SN-BILL-005](billing.md#sn-bill-005) (never a persisted boolean).
- [ ] `FeatureGate.run` opens the Upgrade overlay with the correct contextual toast for each gated action (e.g. Convert-to-text → Upgrade; docs/design/screens-and-flows.md §8 "Convert to text: free → Upgrade overlay").
- [ ] The "Ask my notes" Free path may show a labelled **PRO PREVIEW** teaser then route to Upgrade, defaulting to a small monthly quota (PRD-BILL-005, open question 7) with a `// DESIGN-OPEN` note.
- [ ] Templates: lined/grid/dotted are allowed on Free; selecting any other template gates to Upgrade (PRD-BILL-006).
- [ ] Note-taking core actions are never routed through the gate (a test asserts editing/opening/exporting is plan-independent).

#### Technical notes
`packages/sane_billing/lib/src/gate/feature_gate.dart` (pure decision) + an `app/` Riverpod provider that performs the navigation to [SN-BILL-011](billing.md#sn-bill-011). `Feature` enum lives in `sane_billing` so cross-area callers depend only on it (no sideways package imports — CLAUDE.md §3; coordination in `app/`). Implements PRD-BILL-005/006 and the design gates in screens-and-flows.md §8/§14. Ask-my-notes preview default: a small monthly quota (research §"Recommended plan structure").

#### Security & privacy
Threat: TM-S-05 (bypassing a Pro gate). Control: the gate resolves against the verified entitlement's effective plan, not client-writable state (MASVS-AUTH-1, OWASP-A01 broken access control, CWE-807), with fail-open-to-Free preserving usability (OWASP-A04). No PII; the gate logs an opaque feature id + decision at debug only, never note content.

#### UX notes
Routing and toasts follow docs/design/screens-and-flows.md §8 (lasso Convert-to-text/Solve-math), §9 (PDF), §10 (share), §14 (plan table) and §11.2 toast strings. The gate must feel instant (no spinner) since it reads a cached effective plan. Every gated entry shows *why* ("Pro removes the limit") rather than a dead end.

#### Test plan
`packages/sane_billing/test/gate/feature_gate_test.dart` (truth table: each Feature × Free/Pro → allowed/gated); `app/test/billing/feature_gate_routing_test.dart` (gated action opens Upgrade with the right reason; core note actions bypass the gate).

#### Dependencies
[SN-BILL-002](billing.md#sn-bill-002), [SN-BILL-005](billing.md#sn-bill-005), [SN-BILL-011](billing.md#sn-bill-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-013

<a id="sn-bill-013"></a>

**Enforce the free-plan PDF import monthly quota (5/month) with Upgrade gate**

| Field | Value |
|---|---|
| GitHub | #780 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing, pdf |
| Size | S |
| SDLC | implementation |
| Parent | [SN-BILL-012](billing.md#sn-bill-012) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `OWASP-A01`, `CWE-807` |
| Extra labels | agent-ready |

#### Context
The most concrete Free limit is PDF import: Free shows "N of 5 imports used this month" on the import overlay, and at `importsUsed ≥ 5` opening import instead opens the Upgrade overlay with the toast "Free plan: 5 PDF imports a month"; the counter resets monthly (PRD-BILL-002; docs/design/screens-and-flows.md §9). This is a billing-owned counter (a monthly usage meter), unlike the plan's static limits, so it lives here rather than in the PDF area, which merely calls the gate at its import entry point. This issue implements the persistent monthly counter, the meter display, and the gate, wiring into the PDF import flow ([SN-PDF-002](pdf.md#sn-pdf-002)). It is small and self-contained but exercises the whole gate → paywall path end to end, making it the reference implementation other quota gates follow.

#### Scope
**In:** a persistent `pdfImportsUsedThisMonth` counter with monthly reset (calendar-month boundary in the user's locale), a `PdfImportQuota` service reading the Free limit (5) from [SN-BILL-002](billing.md#sn-bill-002), the "N of 5 imports used this month" meter + "Unlimited with Pro" line on the import overlay, and the gate at ≥ 5 that opens Upgrade with the design toast; Pro users bypass entirely.
**Out:** the PDF import/render itself ([SN-PDF-002](pdf.md#sn-pdf-002)); the plan registry ([SN-BILL-002](billing.md#sn-bill-002)); the paywall ([SN-BILL-011](billing.md#sn-bill-011)); the generic gate API ([SN-BILL-012](billing.md#sn-bill-012), reused here).

#### Acceptance criteria
- [ ] On Free, the import overlay shows "N of 5 imports used this month" with a progress bar and "Unlimited with Pro" (docs/design/screens-and-flows.md §9); Pro shows no meter.
- [ ] The counter increments only on a successful import and resets at the start of each calendar month; a mid-month plan upgrade to Pro removes the gate immediately.
- [ ] At `importsUsed ≥ 5` on Free, invoking import opens the Upgrade overlay with toast "Free plan: 5 PDF imports a month" instead of importing (PRD-BILL-002).
- [ ] The counter persists across restarts and is stored locally (no server); it is not a Pro-unlock boolean and cannot be trivially edited to grant Pro (it only meters Free usage).
- [ ] Downgrading Pro→Free mid-month restores the meter with the correct remaining count.

#### Technical notes
`packages/sane_billing/lib/src/quota/pdf_import_quota.dart` (counter + reset logic, pure Dart, clock-injected) persisted via the local store (drift/`sane_core` repository); the meter widget + gate call in `app/` at the PDF import entry ([SN-PDF-002](pdf.md#sn-pdf-002)). Reuses [SN-BILL-012](billing.md#sn-bill-012)'s `FeatureGate`. Implements PRD-BILL-002 and design §9. Reset boundary uses the injected clock for testability.

#### Security & privacy
Threat: TM-S-05 (bypassing the import cap). Control: the *gate* to Pro is the verified entitlement (MASVS-AUTH-1, OWASP-A01, CWE-807); the counter only meters Free usage, so tampering with it at worst gives a Free user extra Free imports, never Pro. No PII; the counter stores an integer + month, never file names or paths (CLAUDE.md §7 no content in logs).

#### UX notes
Meter + gate per docs/design/screens-and-flows.md §9: "Free-plan meter (free only): 'N of 5 imports used this month' + progress bar + 'Unlimited with Pro'"; gate opens Upgrade with the exact toast. The meter is a11y-labelled ("3 of 5 monthly PDF imports used"); progress not colour-only. Across 17 looks + dark.

#### Test plan
`packages/sane_billing/test/quota/pdf_import_quota_test.dart` (increment, month-boundary reset with injected clock, upgrade removes gate, downgrade restores meter); `app/test/billing/pdf_import_gate_test.dart` (≥5 opens Upgrade with the right toast; Pro bypasses).

#### Dependencies
[SN-BILL-012](billing.md#sn-bill-012), [SN-PDF-002](pdf.md#sn-pdf-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-014

<a id="sn-bill-014"></a>

**Add restore and manage subscription to the Account & plan tab**

| Field | Value |
|---|---|
| GitHub | #129 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing, settings |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | [SN-SET-005](settings.md#sn-set-005) |
| Security controls | `MASVS-AUTH-1`, `MASVS-PRIVACY-1`, `OWASP-A01`, `CWE-359` |
| Extra labels | agent-ready |

#### Context
The Account & plan tab is where a user sees their plan, restores purchases, manages their subscription, and reads their student status — the design specifies a current-plan card (Free/Pro descriptions verbatim), an Upgrade/Manage CTA, Details rows (Name, Email, Student status "Verified · until <date>"), Replay-the-welcome-tour, Profiles-on-this-account, and Sign out (docs/design/screens-and-flows.md §12; PRD-SET-020). Two billing actions live here: **Restore purchases** (re-read entitlements and re-grant without re-charging) and **Manage subscription** (deep-link the store's manage screen), both required by PRD-BILL-012. The Account & plan tab shell (layout, Details rows, Replay tour, Profiles, Sign out, guest variant, plan card display + Upgrade CTA) is owned by [SN-SET-005](settings.md#sn-set-005); this issue adds the tab's billing actions - Restore purchases and Manage subscription - plus the entitlement-driven and lapsed-plan states and the student re-verify prompt, rendered into that tab within the settings host ([SN-SET-001](settings.md#sn-set-001)). It is the calm counterpart to the Upgrade overlay: no selling, just facts and controls.

#### Scope
**In:** the tab's billing actions rendered into the [SN-SET-005](settings.md#sn-set-005) tab - **Restore purchases** (re-read entitlements and re-grant without re-charging), **Manage subscription** (store deep-link / web portal), the entitlement-stream-driven plan state and lapsed-plan messaging ("moved to Free"), the Pro→"Manage subscription" CTA, and the Student status re-verify prompt; wiring restore/manage into the provider/store.
**Out:** the Account & plan tab shell, layout, Details rows, Replay-the-welcome-tour, Profiles block, Sign out, guest variant, the plan-card display and the Free→Upgrade CTA - all owned by [SN-SET-005](settings.md#sn-set-005); the Upgrade overlay itself ([SN-BILL-011](billing.md#sn-bill-011)); the purchase SDKs ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)); the student verification flow ([SN-BILL-015](billing.md#sn-bill-015)); profiles/sign-out ([SN-AUTH-001](auth.md#sn-auth-001)/[SN-SET-001](settings.md#sn-set-001)); refund copy ([SN-BILL-017](billing.md#sn-bill-017)).

#### Acceptance criteria
- [ ] Within the [SN-SET-005](settings.md#sn-set-005) plan card, the Pro state shows "Manage subscription" with toast "Opens your app-store subscription" (the card layout and the Free→Upgrade CTA are owned by [SN-SET-005](settings.md#sn-set-005)).
- [ ] **Restore purchases** is a visible action that re-reads entitlements from the provider/StoreKit and re-grants Pro without re-charging; it shows a result (restored / nothing to restore) and never errors the user out (PRD-BILL-012).
- [ ] **Manage subscription** deep-links the correct store screen on iOS/Android and the self-serve web portal on web.
- [ ] The Student status row shows "Verified · until <date>" when verified and a re-verify prompt when expired (feeds [SN-BILL-015](billing.md#sn-bill-015)); email is shown but never logged.
- [ ] Renders across all 17 looks + dark, WCAG 2.2 AA (labels, 44pt targets, contrast), and reflects a lapsed subscription as "moved to Free" without hiding notes.

#### Technical notes
Widget in `app/lib/settings/account_plan_tab.dart` inside the settings host ([SN-SET-001](settings.md#sn-set-001)); reads the entitlement stream ([SN-BILL-004](billing.md#sn-bill-004)) and effective plan ([SN-BILL-005](billing.md#sn-bill-005)). Restore calls the provider/StoreKit restore; Manage uses `showManageSubscriptions`/store deep-link or web portal URL. Uses `sane_ui` tokens/components. Implements PRD-BILL-012, PRD-SET-020 and design §12.

#### Security & privacy
Threat: TM-P-09 (student PII exposure), TM-S-05 (restore path re-granting). Controls: restore re-verifies via the provider (MASVS-AUTH-1, OWASP-A01), email/student status shown to the owner only and never logged (MASVS-PRIVACY-1, CWE-359 privacy exposure). Manage/restore over TLS. Baseline: no tokens or receipts rendered/logged.

#### UX notes
Source: docs/design/screens-and-flows.md §12 (Account & plan). States: Free (Upgrade CTA), Pro (Manage CTA + renewal info), lapsed ("Your Pro ended — you're on Free; your notes are safe"), restoring (spinner then result toast). Student row shows "Verified · until Jun 2027" per the mock. Sign-out is destructive-styled (owned elsewhere). a11y: every control labelled; the plan card is not colour-only.

#### Test plan
`app/test/billing/account_plan_tab_test.dart` (Free vs Pro rendering, restore re-grants without charge via fake provider, manage deep-links, lapsed messaging); golden per look + dark; a11y labels/targets test.

#### Dependencies
[SN-SET-005](settings.md#sn-set-005) (Account & plan tab shell), [SN-BILL-004](billing.md#sn-bill-004), [SN-BILL-005](billing.md#sn-bill-005), [SN-SET-001](settings.md#sn-set-001), [SN-DS-003](design-system.md#sn-ds-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-015

<a id="sn-bill-015"></a>

**Implement tiered student verification with annual re-verification**

| Field | Value |
|---|---|
| GitHub | #130 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing, privacy |
| Size | L |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-NETWORK-1`, `MASVS-AUTH-1`, `OWASP-A01`, `CWE-359`, `CWE-345` |
| Extra labels | needs-credentials, innovation |

#### Context
Student-first pricing is the whole go-to-market, so verification must be cheap, fast, India-aware, and privacy-preserving. The PRD mandates a tiered flow: (1) instant institutional-email match against a curated allowlist (India `.ac.in`/`.edu.in`/university domains + global WHED list, free), (2) SheerID instant database match for anything not allowlisted, (3) SheerID document-upload fallback — with the discount granted as a **store promotional offer / offer code** (Apple 3.1.1-compliant, never a hidden license key), and **re-verified annually** so graduates roll off (PRD-BILL-015/016; research/pricing-monetization-and-student-verification.md §6). The design shows "Verified · until Jun 2027" in the Account tab. This issue builds the verification flow and the annual expiry/roll-off, storing proof-not-documents and minimising student PII to satisfy the privacy threats (TM-P-09).

#### Scope
**In:** the tiered verification flow (email-allowlist → SheerID instant → SheerID document upload), the curated India+WHED allowlist, issuing the discount as a store promo/offer code, storing a verification token + expiry (proof, not raw documents), the "Verified · until <date>" status, the annual re-verification prompt at expiry, and graceful roll-off to standard pricing without deleting notes.
**Out:** the pricing/offer-code product config ([SN-BILL-010](billing.md#sn-bill-010)); the Account tab UI shell ([SN-BILL-014](billing.md#sn-bill-014), which renders the status); the entitlement provider ([SN-BILL-004](billing.md#sn-bill-004)); the family plan ([SN-BILL-016](billing.md#sn-bill-016)).

#### Acceptance criteria
- [ ] An institutional email on the curated allowlist (e.g. `.ac.in`/`.edu.in`/WHED domain) verifies instantly and issues a student offer code; an off-allowlist email falls through to SheerID instant match, then to document upload.
- [ ] The discount is granted as a **store promotional offer / offer code** redeemed via official billing — never a hidden license key (Apple 3.1.1 compliance, asserted in review checklist).
- [ ] Verification is time-boxed; the Account tab shows "Verified · until <date>"; at expiry the app prompts re-verification and, if not renewed, moves to standard pricing **without deleting notes** (PRD-BILL-016).
- [ ] Only a verification token + expiry (and minimal proof) is stored — never raw ID documents; document uploads go straight to SheerID, not Sane storage; short retention documented.
- [ ] Student email/status is never written to logs and never used beyond verification (purpose limitation).

#### Technical notes
`packages/sane_billing/lib/src/student/` (allowlist matcher + verification state model, pure Dart) with the SheerID integration and offer-code redemption wired in `app/`. The allowlist is a curated, updatable data file (India `.ac.in`/`.edu.in` + WHED). SheerID API keys via CI/provider config (`needs-credentials`). Offer codes are configured with pricing in [SN-BILL-010](billing.md#sn-bill-010). Implements PRD-BILL-015/016 and research §6. Re-verify cadence = annual; expiry drives [SN-BILL-014](billing.md#sn-bill-014)'s status row.

#### Security & privacy
Threat: TM-P-09 (student email/ID over-collected or retained). Controls: verify via third party where possible and store proof-not-documents with short retention (MASVS-PRIVACY-1/2, CWE-359), purpose-limited to verification, no logging of email/status; SheerID/allowlist calls TLS-only (MASVS-NETWORK-1); the granted entitlement is provider-verified (MASVS-AUTH-1, OWASP-A01, CWE-345). Data map updated in docs/security/threat-model.md (TM-P-09 asset A8).

#### UX notes
Entry from the Upgrade overlay / Account tab ("Are you a student?"). Flow states: checking email (instant), SheerID instant match, document upload (last resort, clearly explained), verified ("Verified · until Jun 2027"), expired (re-verify prompt). Copy is honest about what's collected and why. a11y-labelled, across 17 looks + dark. Graduating users see a gentle roll-off, never a lockout of their notes.

#### Test plan
`packages/sane_billing/test/student/allowlist_matcher_test.dart` (India + WHED domains match; alumni/generic domains fall through); `app/test/billing/student_verification_test.dart` (tiered fall-through, offer-code grant, annual expiry → re-verify → roll-off without note loss, proof-not-documents storage, no-PII-in-logs assertion).

#### Dependencies
[SN-BILL-004](billing.md#sn-bill-004), [SN-BILL-010](billing.md#sn-bill-010), [SN-AUTH-002](auth.md#sn-auth-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-016

<a id="sn-bill-016"></a>

**Implement the family/household plan grant in the entitlement layer**

| Field | Value |
|---|---|
| GitHub | #131 |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `OWASP-A01`, `CWE-807` |
| Extra labels | needs-decision |

#### Context
A family/household plan (up to 6) is a real acquisition/retention lever, but the stores can't deliver it uniformly: Apple Family Sharing can share a subscription (bonus), while **Google Play Family Library cannot share subscriptions or IAPs** — so a cross-platform family plan must be implemented in **our own entitlement provider layer**, granting Pro to N linked accounts, identical on iOS and Android (PRD-BILL-013; research/pricing-monetization-and-student-verification.md §5). This issue builds the household grant on top of the provider ([SN-BILL-004](billing.md#sn-bill-004)): a purchaser links up to 6 accounts, each gets the verified entitlement. It also surfaces the open maintainer decision — does a household plan grant Pro to all local profiles on a shared device, or only the signed-in owner's profiles (PRD-PROF-006, PRD-03 §15 open question 6)? — implementing the documented default behind a flag.

#### Scope
**In:** a household model (owner + up to 5 members) in the entitlement provider, an invite/link flow keyed to member accounts ([SN-AUTH-002](auth.md#sn-auth-002)), each member resolving to a verified Pro entitlement, Apple Family Sharing enabled as a bonus path, and the per-profile-vs-per-account default behind a build-time flag with a `needs-decision` note.
**Out:** the purchase of the family SKU itself ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)); the provider abstraction ([SN-BILL-004](billing.md#sn-bill-004)); local profiles ([SN-AUTH-007](auth.md#sn-auth-007)); pricing ([SN-BILL-010](billing.md#sn-bill-010)).

#### Acceptance criteria
- [ ] A household owner can link up to 6 accounts total; each linked member resolves to an active verified Pro entitlement on both iOS and Android via the provider (not relying on Play Family Library).
- [ ] Removing a member revokes their Pro at the next evaluation; the count never exceeds 6.
- [ ] Apple Family Sharing works as a bonus where enabled, but the provider-layer grant is the authoritative mechanism (identical cross-platform behaviour).
- [ ] The per-profile-vs-per-account default is implemented behind a build-time flag and documented as `needs-decision` (PRD-PROF-006); the shipped default is stated in Technical notes.
- [ ] A member's Pro degrades to Free (never a lockout) if the household subscription lapses, preserving all notes.

#### Technical notes
Household grant lives in the provider layer (RevenueCat shared-entitlement / household record) driven from `app/lib/billing/household.dart`; the pure-Dart `sane_billing` models the household + membership. Keyed to accounts from [SN-AUTH-002](auth.md#sn-auth-002); interacts with local profiles from [SN-AUTH-007](auth.md#sn-auth-007) for the per-profile decision. Default (proposed): a family plan grants Pro to the **signed-in owner's account across all their profiles**, and to each linked member's account — matching the account-scoped entitlement model (PRD-PROF-006); flag `SANE_FAMILY_PER_PROFILE`. Implements PRD-BILL-013.

#### Security & privacy
Threat: TM-S-05 (a member forging membership to get Pro). Control: membership is provider-verified and the entitlement is the gate (MASVS-AUTH-1, OWASP-A01, CWE-807 — no client-side membership boolean). Invites are capability-scoped and revocable. No PII beyond the linked account identifiers required for the grant; never log member emails.

#### UX notes
Managed from the Account & plan tab ([SN-BILL-014](billing.md#sn-bill-014)): "Family — up to 6 people", add/remove members, each member's status. States: invite pending, member active, member removed, household lapsed (all → Free, notes safe). a11y-labelled, across 17 looks + dark. Copy explains the Android caveat honestly ("works on iPhone and Android alike").

#### Test plan
`packages/sane_billing/test/household_test.dart` (max 6 enforced, add/remove membership, lapse → Free); `app/test/billing/household_grant_test.dart` (each member resolves to Pro via fake provider on both platforms; per-profile flag behaviour; removal revokes at next eval).

#### Dependencies
[SN-BILL-004](billing.md#sn-bill-004), [SN-AUTH-002](auth.md#sn-auth-002), [SN-AUTH-007](auth.md#sn-auth-007).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-017

<a id="sn-bill-017"></a>

**Implement anti-dark-pattern disclosures, cancellation and refunds**

| Field | Value |
|---|---|
| GitHub | #781 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-011](billing.md#sn-bill-011) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A04` |
| Extra labels | agent-ready |

#### Context
The pricing surfaces must be honest by construction: show the real recurring price, currency and cadence before any CTA, make **cancel as easy as sign-up** (one tap to the store's manage-subscription screen or the web self-serve portal), carry no pre-selected add-ons or hidden auto-renew, and state the trial's first-charge date and amount clearly (PRD-BILL-017; research/pricing-monetization-and-student-verification.md §10, the FTC deceptive-design list + click-to-cancel best practice). Refunds must be handled per rail: Apple/Google purchases deep-link to `reportaproblem.apple.com` / the Play refund flow, while web (Stripe/Razorpay) purchases — which Sane controls — get a self-serve refund/cancel within a stated goodwill window (PRD-BILL-019). This issue implements those disclosures and flows across the Upgrade overlay ([SN-BILL-011](billing.md#sn-bill-011)) and Account tab ([SN-BILL-014](billing.md#sn-bill-014)), turning legal/ethical requirements into concrete, tested behaviour.

#### Scope
**In:** the pre-CTA disclosure component ("renews at ₹X/year, cancel anytime", trial first-charge date/amount), the one-tap cancellation deep-links (store manage-subscription; web portal), the web self-serve refund/cancel within a stated goodwill window, and store-mediated refund deep-links for IAP/Play; a review checklist mapping to the FTC dark-pattern list.
**Out:** the paywall layout ([SN-BILL-011](billing.md#sn-bill-011)); the web gateway integration ([SN-BILL-009](billing.md#sn-bill-009), whose refund API this calls); the Account tab shell ([SN-BILL-014](billing.md#sn-bill-014)); pricing values ([SN-BILL-010](billing.md#sn-bill-010)).

#### Acceptance criteria
- [ ] The recurring price, currency and cadence appear **before** the CTA on every purchase surface; the trial states its first-charge date and amount explicitly (PRD-BILL-017).
- [ ] Cancellation is one tap from within the app: iOS/Android deep-link to the store's manage-subscription screen; web opens the self-serve portal — no promo gauntlet before quitting.
- [ ] There are no pre-selected add-ons and no obscured auto-renew anywhere in the flow (asserted by a UI checklist test).
- [ ] Web (Stripe/Razorpay) purchases can be refunded/cancelled self-serve within the stated goodwill window; IAP/Play deep-link to the store refund flow with clear guidance (PRD-BILL-019).
- [ ] All disclosure/cancel/refund controls are a11y-labelled, keyboard-operable on web, and render across 17 looks + dark.

#### Technical notes
Disclosure widget + cancellation deep-links in `app/lib/billing/` reused by [SN-BILL-011](billing.md#sn-bill-011) and [SN-BILL-014](billing.md#sn-bill-014); web refund calls the gateway/provider from [SN-BILL-009](billing.md#sn-bill-009). Store deep-links: `showManageSubscriptions` (iOS), Play subscription-center URL, web portal URL. Goodwill window is a documented constant. Implements PRD-BILL-017/019 and research §10.1–§10.3. Copy through i18n.

#### Security & privacy
Control: honest, non-deceptive design (OWASP-A04 insecure/deceptive design; FTC dark-pattern categories). Baseline: no note content, tokens or PII in these flows or logs; the refund flow logs only an opaque gateway result code (MASVS-PRIVACY-1). Cancellation must not require re-authentication beyond the platform's own (no dark-pattern friction).

#### UX notes
Disclosure copy anchors on docs/design/screens-and-flows.md §13 ("cancel anytime", "renews at…") and §12 ("Manage subscription" → "Opens your app-store subscription"). States: pre-purchase disclosure, cancelling (deep-link handoff), refund requested (web: confirmation within window; store: guidance). Honest, plain-language, student-readable. No fake urgency/countdowns (FTC list).

#### Test plan
`app/test/billing/disclosure_test.dart` (price/cadence/trial-charge shown before CTA; no pre-ticked add-ons); `app/test/billing/cancel_refund_test.dart` (one-tap cancel deep-links per platform; web self-serve refund within window; IAP/Play deep-link). a11y test for labels/keyboard.

#### Dependencies
[SN-BILL-011](billing.md#sn-bill-011), [SN-BILL-014](billing.md#sn-bill-014), [SN-BILL-009](billing.md#sn-bill-009).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-018

<a id="sn-bill-018"></a>

**Harden receipt/entitlement-token security and anti-piracy posture**

| Field | Value |
|---|---|
| GitHub | #132 |
| Type | security |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `MASVS-NETWORK-1`, `MASVS-CODE-4`, `MASVS-RESILIENCE-2`, `MASVS-STORAGE-1`, `ASVS-V6`, `OWASP-A02`, `OWASP-A08`, `CWE-345`, `CWE-807`, `CWE-320` |
| Extra labels | agent-ready |

#### Context
Revenue integrity for a zero-server, local-first app rests on one control: a spoofed "Pro" entitlement token must not grant paid features (threat model TM-S-05). The mitigation is a server-signed/store-signed entitlement token verified with a **pinned public key**, receipts validated by the provider/store, and a **graceful, non-punitive failure** — exactly the posture research/pricing-monetization-and-student-verification.md §9 prescribes (signed StoreKit JWS, provider-side Play validation, entitlement caching not trust, light Play Integrity). This issue is the consolidated hardening + verification pass across the billing surfaces: it proves forged/expired/tampered tokens are rejected (fail closed on authenticity) while absence/offline degrades to Free (fail open on availability), and that no license-key or dynamic-unlock backdoor exists (MASVS-CODE-4, TM-T-04). It turns the scattered per-surface checks into an auditable control with a regression test, per the DoD's "abuse/negative tests" rule (CLAUDE.md §5).

#### Scope
**In:** pinned-public-key verification of the entitlement/receipt signature; rejection of unsigned/expired/tampered/replayed tokens; confirmation that the cached entitlement is stored as a signed/opaque object in secure storage (not a plain flag); a negative-test suite for forgery/replay/rollback; a check that no license-key/QR/dynamic-code unlock path exists; documentation of the anti-piracy posture in the threat model.
**Out:** the provider adapter itself ([SN-BILL-004](billing.md#sn-bill-004)); the evaluator's grace logic ([SN-BILL-005](billing.md#sn-bill-005)); Play Integrity ([SN-BILL-008](billing.md#sn-bill-008), referenced here); the store submission ([SN-REL-001](release.md#sn-rel-001)).

#### Acceptance criteria
- [ ] An unsigned, expired, tampered, or replayed entitlement/receipt token is rejected (fail closed on authenticity) and results in Free — never Pro and never a crash (unit + abuse tests).
- [ ] The entitlement signature is verified against a **pinned public key**; rotating the pin is documented and does not break offline verification within the grace window.
- [ ] A grep/analyzer test proves there is **no** license-key, QR, or dynamic-code unlock path (Guideline 3.1.1 + MASVS-CODE-4 / TM-T-04).
- [ ] The cached last-known-good entitlement is stored as a signed/opaque object in secure storage; editing the local store cannot flip a user to Pro (verified by a tamper test).
- [ ] The threat model (TM-S-05) and controls matrix are updated with the verified control and its test; a regression test covers each abuse case.

#### Technical notes
Verification lives with the provider adapter ([SN-BILL-004](billing.md#sn-bill-004)) and StoreKit path ([SN-BILL-006](billing.md#sn-bill-006)); this issue adds the pinned-key check, the negative/abuse suite, and the audit. Pinned keys are **public** (not secrets) and may be shipped; TLS pinning for provider/gateway per MASVS-NETWORK-1. Update docs/security/threat-model.md (TM-S-05) and docs/security/controls-matrix.md. No dynamic code loading (MASVS-CODE-4). Reference research §9 and PRD-BILL-011.

#### Security & privacy
Threats: TM-S-05 (spoofed Pro), TM-T-04 (tampered client/unlock), rollback/replay. Controls: signature verification with pinned key (MASVS-AUTH-1, ASVS-V6, OWASP-A02 cryptographic failures, CWE-345), no client-trust unlock (CWE-807), secure at-rest cache (MASVS-STORAGE-1, CWE-320), no dynamic unlock (MASVS-CODE-4, MASVS-RESILIENCE-2), graceful non-punitive failure (OWASP-A08). Never log tokens/receipts/keys (CLAUDE.md §7).

#### UX notes
None beyond baseline — hardening is invisible in the happy path and degrades silently to Free on failure (never an accusatory wall). Baseline: no tokens/receipts/PII logged or shown; the only user-observable effect of a forged token is that piracy silently yields Free.

#### Test plan
`packages/sane_billing/test/security/entitlement_token_test.dart` (reject unsigned/expired/tampered/replayed; accept valid; fail-open on absence); `app/test/security/no_license_key_test.dart` (no dynamic-unlock/license-key path); `app/test/billing/entitlement_cache_tamper_test.dart` (edited cache cannot grant Pro). Feeds the MASTG mapping in the controls matrix.

#### Dependencies
[SN-BILL-004](billing.md#sn-bill-004), [SN-BILL-006](billing.md#sn-bill-006), [SN-SEC-001](security.md#sn-sec-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BILL-019

<a id="sn-bill-019"></a>

**Build the billing sandbox and test matrix across stores and gateways**

| Field | Value |
|---|---|
| GitHub | #133 |
| Type | test |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | billing, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | — |
| Security controls | `MASVS-AUTH-1`, `OWASP-A08`, `CWE-345` |
| Extra labels | needs-credentials |

#### Context
Billing bugs cost real money and real trust, and they only surface under the stores' and gateways' sandbox environments, so a repeatable sandbox test matrix is mandatory before launch (docs/roadmap.md M8; scope: "tests with sandbox"). This issue builds the end-to-end verification harness across all purchase surfaces — StoreKit Testing (`.storekit` config) for iOS, Play license testers for Android, Stripe/Razorpay test mode for web — exercising the full lifecycle: trial start, renewal, cancellation, refund, restore, cross-platform grant, and the all-important fail-open-to-Free behaviour. It ties together the surfaces from [SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009) and the evaluator ([SN-BILL-005](billing.md#sn-bill-005)) into one integration suite the CI perf/verification stage can run, catching regressions in the money path before users do.

#### Scope
**In:** a StoreKit-test lane, a Play-license-tester lane, and a Stripe/Razorpay test-mode lane; scenario coverage for trial→charge, renewal, cancellation, refund, restore-purchases, cross-platform grant (buy on web → Pro on mobile), and fail-open-to-Free under network/provider failure; a documented sandbox setup runbook and the CI wiring to run the suite.
**Out:** the production purchase code ([SN-BILL-006](billing.md#sn-bill-006)/[SN-BILL-007](billing.md#sn-bill-007)/[SN-BILL-009](billing.md#sn-bill-009)); the security abuse suite ([SN-BILL-018](billing.md#sn-bill-018)); store submission ([SN-REL-001](release.md#sn-rel-001)).

#### Acceptance criteria
- [ ] The StoreKit-test lane drives trial start, renewal, refund-removes-Pro, and offline JWS verification without live network; it runs in CI.
- [ ] The Play-license-tester lane drives purchase→acknowledge, trial, refund-removes-Pro, and asserts a missing acknowledgement is caught.
- [ ] The gateway (Stripe/Razorpay) test-mode lane drives a web purchase that writes a cross-platform entitlement and is reflected on a mobile session within one poll.
- [ ] A fail-open scenario (provider/network down) is proven to leave the app fully usable as Free with note-taking intact.
- [ ] A restore-purchases scenario re-grants Pro without re-charging; a sandbox setup runbook is documented (`needs-credentials` for sandbox accounts/keys).

#### Technical notes
`app/integration_test/billing_sandbox_test.dart` orchestrates the lanes with fakes/sandbox configs; a `.storekit` config under `app/`; Play license testers + gateway test-mode keys via CI secrets (`needs-credentials`). Uses `patrol`/`integration_test`. Hooks into the CI verification stage ([SN-CI-001](ci-cd.md#sn-ci-001)) alongside the perf/MobSF gates. Reference research §2, §4, §8 and PRD-BILL-008/009/010/012.

#### Security & privacy
Threat: TM-S-05 (a regression that lets forgery through). Control: the suite asserts entitlement verification and fail-open behaviour hold across every surface (MASVS-AUTH-1, OWASP-A08, CWE-345). Sandbox keys/accounts live in CI secrets, never committed (CLAUDE.md §7). No real PII in test fixtures; test emails are synthetic.

#### UX notes
None beyond baseline (test harness). Baseline: the suite verifies the user-facing guarantees other issues promise — trial toast, restore result, silent fail-open to Free — but adds no UI. No content or tokens logged by the harness.

#### Test plan
This issue *is* the test plan: `app/integration_test/billing_sandbox_test.dart` (three lanes + cross-platform + fail-open + restore), a `.storekit` config, and a `docs/` sandbox runbook. CI must run the StoreKit and fake-gateway lanes headlessly; device-bound lanes run in the device lab ([SN-PERF-004](perf.md#sn-perf-004)).

#### Dependencies
[SN-BILL-005](billing.md#sn-bill-005), [SN-BILL-006](billing.md#sn-bill-006), [SN-BILL-007](billing.md#sn-bill-007), [SN-BILL-009](billing.md#sn-bill-009), [SN-CI-001](ci-cd.md#sn-ci-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GUX-012

<a id="sn-gux-012"></a>

**Implement the plan-limit disclosure pattern: upsell card, meters and limit lines**

| Field | Value |
|---|---|
| GitHub | #1048 |
| Type | feature |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | billing, design-system, library |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BILL-001](billing.md#sn-bill-001) |
| Depends on | [SN-DS-018](design-system.md#sn-ds-018), [SN-PDF-007](pdf.md#sn-pdf-007) |
| Security controls | `OWASP-A01`, `MASVS-RESILIENCE-1` |
| Extra labels | agent-ready |

#### Context

The same free-plan limit is stated on at least four surfaces in the design, in four different shapes: the sidebar card "Free plan · N of 5 PDF imports" with a progress bar and "Upgrade · ₹83/mo" (`screens-and-flows.md` §2); the import overlay meter "N of 5 imports used this month" plus "Unlimited with Pro" (§9); the Share footnote "Free plan: up to 3 people per notebook. Pro removes the limit." (§10); the Settings storage meter "1.8 GB of 5 GB … Pro raises the limit to 50 GB" (§12). `component-inventory.md` names `SaneUpsellCard` and `SaneImportMeter`. None of it has an owner: [SN-DS-020](design-system.md#sn-ds-020) lists the upsell card as an out-of-scope app composition, [SN-LIB-009](library.md#sn-lib-009) punts it to the billing epic, and no billing issue implements it — [SN-BILL-011](billing.md#sn-bill-011) builds the Upgrade overlay, [SN-BILL-012](billing.md#sn-bill-012) the gate routing, [SN-PDF-007](pdf.md#sn-pdf-007) the quota logic. Without a shared pattern the four surfaces will disagree about the same number, which is the one thing `ux-principles.md` §10 forbids: "Every limit has a door", stated honestly and consistently.

#### Scope

**In:** three components plus the view-model that feeds them — `SaneUpsellCard` (free + wide only: title line, `SaneProgress`, upgrade button with the current price, dismissible? no — it is persistent but quiet), `SaneMeter` (a labelled progress wrapper whose accessible value reads "2 of 5 imports used this month" and which never signals state by colour alone), `SaneLimitLine` (one honest sentence naming the Free allowance and what Pro does, no pressure, no exclamation mark); and a single `PlanLimit` view-model (id, used, cap, period, reset date, copy keys, upgrade route) so the sidebar, the overlay and Settings render from one source and cannot disagree. Wire the four known limits: PDF imports per month, people per notebook, recording length, cloud storage. All of it hidden entirely on Pro.

**Out:** the entitlement source of truth ([SN-BILL-002](billing.md#sn-bill-002), [SN-BILL-004](billing.md#sn-bill-004)), quota enforcement and the gates themselves ([SN-PDF-007](pdf.md#sn-pdf-007), [SN-AUD-017](audio.md#sn-aud-017), [SN-SHR-016](sharing-export.md#sn-shr-016)), the Upgrade overlay ([SN-BILL-011](billing.md#sn-bill-011)), pricing and regional formatting ([SN-BILL-010](billing.md#sn-bill-010), [SN-I18N-006](i18n.md#sn-i18n-006)), anti-dark-pattern policy ([SN-BILL-017](billing.md#sn-bill-017) — this issue implements to it).

#### Acceptance criteria

- [ ] One provider feeds all renderings of a limit; a widget test renders the sidebar card, the import meter and the settings row from the same state and asserts identical numbers and reset periods.
- [ ] The meter exposes a text value to assistive technology ("2 of 5 imports used this month") and does not rely on bar colour to convey "nearly full".
- [ ] At the cap, the gated control stays visible and routes to the Upgrade overlay with the canonical toast ("Free plan: 5 PDF imports a month") — never a hidden control, never a dead end.
- [ ] Anti-dark-pattern rules hold: no countdown urgency, no red, no pre-checked upgrade, and the line always states what Free keeps as well as what Pro adds.
- [ ] Pro (and trialling) accounts render none of these surfaces; a test asserts the sidebar card is absent.
- [ ] Copy fits the pseudo-locale (+40%) at the 248 px sidebar width and mirrors under RTL; prices format per locale ([SN-I18N-006](i18n.md#sn-i18n-006)).
- [ ] Renders correctly in all 17 looks × light/dark and over wallpaper's frosted surface.

#### Technical notes

Components in `sane_ui` (they are pure presentation) with the `PlanLimit` view-model in `app/` reading the entitlement provider from [SN-BILL-004](billing.md#sn-bill-004) — never the store SDK directly. `SaneMeter` wraps `SaneProgress` from [SN-DS-018](design-system.md#sn-ds-018); do not introduce a second progress primitive. Reset dates must come from the entitlement layer, not be computed locally from a device clock, so a changed clock cannot grant extra imports. These are pure presentation; the `PlanLimit` view-model reads the `EntitlementProvider` contract ([SN-BILL-004](billing.md#sn-bill-004)) behind a narrow interface, with a stub until billing lands in M8 — not blocked on SN-BILL-012.

#### Security & privacy

Entitlement state is a client-side read of a verified claim and must **fail closed to Free** ([SN-BILL-005](billing.md#sn-bill-005)); the UI must never be the enforcement point — the gate is enforced where the action happens ([SN-BILL-012](billing.md#sn-bill-012)), so a tampered meter cannot unlock a feature (MASVS-RESILIENCE, OWASP M4 insufficient validation). The card must not display account identifiers, emails or receipt data. Impression counting, if ever added, is telemetry and requires opt-in consent ([SN-PRV-009](privacy.md#sn-prv-009), [SN-TEL-010](telemetry.md#sn-tel-010)) — this issue adds none.

#### UX notes

References: `screens-and-flows.md` §2/§9/§10/§12/§14, `ux-principles.md` §3 ("Pro features are visible but honest") and §5 ("Explain limits, never hide them"), `component-inventory.md` §3/§6. The tone is the product's differentiator: "Free plan: up to 3 people per notebook. Pro removes the limit." — a fact, a door, and no pressure.

#### Test plan

`packages/sane_ui/test/components/meter_test.dart` (a11y value, no colour-only state, 17 looks), `app/test/features/billing/plan_limit_consistency_test.dart` (three surfaces, one number), `app/test/features/billing/limit_gate_test.dart` (at cap → Upgrade + toast, control still visible), pseudo-locale layout test. Golden: sidebar card and import meter per look family × light/dark.

#### Dependencies
[SN-DS-018](design-system.md#sn-ds-018), [SN-PDF-007](pdf.md#sn-pdf-007). The `PlanLimit` view-model reads the verified entitlement object via the `sane_billing` EntitlementProvider contract ([SN-BILL-004](billing.md#sn-bill-004)); a permissive stub stands in until billing ships in M8, so SN-BILL-012 is not a scheduling blocker.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

