# Backlog — area: website

17 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-SITE-001](website.md#sn-site-001) **Ship the marketing site, docs site and web trial launcher** (epic · M8 Launch & Growth)
  - [SN-SITE-002](website.md#sn-site-002) **Scaffold the website workspace with a zero-JavaScript static build** · p1 · infra · M · M8 Launch & Growth
  - [SN-SITE-003](website.md#sn-site-003) **Build the landing page with the value proposition and Sage brand** · p1 · feature · M · M8 Launch & Growth
  - [SN-SITE-004](website.md#sn-site-004) **Build the interactive 17-looks demo for the landing page** · p2 · feature · M · M8 Launch & Growth
  - [SN-SITE-005](website.md#sn-site-005) **Build the pricing page with honest Free versus Pro and student pricing** · p1 · feature · M · M8 Launch & Growth
  - [SN-SITE-006](website.md#sn-site-006) **Build the privacy promise page that proves the zero-knowledge architecture** · p1 · feature · M · M8 Launch & Growth
  - [SN-SITE-007](website.md#sn-site-007) **Build the docs site with guides, the .sanenote spec and offline search** · p1 · feature · L · M8 Launch & Growth
  - [SN-SITE-008](website.md#sn-site-008) **Build the try-on-web launcher and native download page** · p1 · feature · M · M8 Launch & Growth
  - [SN-SITE-009](website.md#sn-site-009) **Publish the blog and changelog with RSS and Atom feeds** · p2 · feature · M · M8 Launch & Growth
  - [SN-SITE-010](website.md#sn-site-010) **Publish the security page and serve security.txt from the website** · p1 · security · S · M8 Launch & Growth
  - [SN-SITE-011](website.md#sn-site-011) **Add SEO metadata, sitemap, robots and build-time Open Graph images** · p2 · task · S · M8 Launch & Growth
  - [SN-SITE-012](website.md#sn-site-012) **Enforce website performance and Lighthouse budgets in CI** · p2 · infra · M · M8 Launch & Growth
  - [SN-SITE-013](website.md#sn-site-013) **Provision website hosting on a content origin with hardened headers** · p1 · infra · M · M8 Launch & Growth
  - [SN-SITE-014](website.md#sn-site-014) **Keep the website analytics-free and third-party-free by default** · p0 · security · S · M8 Launch & Growth
  - [SN-SITE-015](website.md#sn-site-015) **Make the website WCAG 2.2 AA accessible and localisation-ready** · p1 · feature · M · M8 Launch & Growth
  - [SN-GOPS-010](website.md#sn-gops-010) **Publish a status page and define user-facing incident communications** · p2 · feature · M · M8 Launch & Growth
  - [SN-GOPS-019](website.md#sn-gops-019) **Publish and version the legal pages with in-app links and change history** · p1 · task · M · M8 Launch & Growth

---

## Issues

### SN-GOPS-010

<a id="sn-gops-010"></a>

**Publish a status page and define user-facing incident communications**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | website, collaboration, docs |
| Size | M |
| SDLC | release |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-013](website.md#sn-site-013), [SN-SEC-035](security.md#sn-sec-035), [SN-GOPS-009](ci-cd.md#sn-gops-009) |
| Security controls | `OWASP-A09`, `MASVS-PRIVACY-1`, `CWE-200` |
| Extra labels | agent-ready |

#### Context
When the relay, the entitlement service or the website degrades, users need one truthful place to look — and the app needs to say the right thing in the moment ("live collaboration is unavailable; your notes and sync are unaffected"). [SN-SEC-035](security.md#sn-sec-035) covers the *internal* incident runbook and the regulatory breach clock; [SN-REL-014](release.md#sn-rel-014) covers hotfix and rollback; [SN-GOPS-009](ci-cd.md#sn-gops-009) detects the outage. Nothing communicates it. Absent a status page, support volume spikes ([SN-GOPS-006](docs.md#sn-gops-006)) and users reasonably assume their notes are at risk — the worst possible misunderstanding for a local-first product whose whole promise is that they are not.

#### Scope
**In:** a static status page served from the website origin (no third-party script, consistent with the analytics-free posture [SN-SITE-014](website.md#sn-site-014)) listing the three services with current state and an incident history; a machine-readable `service-status.json` on the same CDN that the app fetches **only** when a cloud action has just failed (no beacons, no identifiers, no polling at rest) to render an accurate in-app banner; incident templates (investigating / identified / monitoring / resolved) with honest, non-technical wording and an explicit "your local notes are unaffected" line where true; the comms ladder — who writes, when the first update goes out, update cadence, and the handoff to [SN-SEC-035](security.md#sn-sec-035) when personal data may be at risk (GDPR 72-hour clock); a postmortem template published for user-visible incidents lasting beyond a stated threshold.
**Out:** detection and alerting ([SN-GOPS-009](ci-cd.md#sn-gops-009)); internal incident response and the breach clock ([SN-SEC-035](security.md#sn-sec-035)); rollback mechanics ([SN-REL-014](release.md#sn-rel-014)); support replies ([SN-GOPS-006](docs.md#sn-gops-006)).

#### Acceptance criteria
- [ ] The status page is reachable on a documented URL, renders without JavaScript, and is hosted so that it survives an outage of the services it reports on.
- [ ] `service-status.json` has a versioned schema, is cached with a short TTL and contains no user-specific data; the app fetches it only after a failed cloud action.
- [ ] The in-app banner distinguishes "service degraded" from "you are offline" and never implies note data is at risk when it is not.
- [ ] Incident templates exist for all four states with a first-update target measured from detection, and a worked example.
- [ ] An incident that may involve personal data triggers the [SN-SEC-035](security.md#sn-sec-035) path, and the status page never publishes vulnerability detail before a fix ships (coordinated disclosure, `ssdlc-process.md` §3).
- [ ] User-visible incidents beyond the stated duration get a published postmortem with cause, fix and prevention.

#### Technical notes
Keep the page static Markdown -> HTML in the existing zero-JS website build ([SN-SITE-002](website.md#sn-site-002)) with incidents as dated files, so publishing an update is a commit and a deploy ([SN-REL-008](release.md#sn-rel-008) atomic deploys). Host the status JSON on the CDN edge, not on the relay, so it stays available when the relay is down. The client uses the existing offline/degraded state pattern ([SN-GUX-009](design-system.md#sn-gux-009)) rather than inventing a new one, and treats a missing/invalid JSON as "unknown", never as "everything is fine".

#### Security & privacy
The status fetch must not become a tracking channel: no query parameters, no client identifiers, cacheable and identical for everyone (LINDDUN linkability; MASVS-PRIVACY-1). Incident text is an information-disclosure surface (CWE-200): no internal hostnames, stack traces, staging URLs or embargoed vulnerability detail. The page is also part of the OWASP-A09 story — a public record of detection-to-resolution times keeps the monitoring honest.

#### UX notes
Status page: the website's typography and tokens, a single legible state per service, newest incident first, no dashboards or graphs. In-app: the standard offline/error banner with a "learn more" that opens the status URL in the browser (never an embedded WebView, per [SN-SEC-015](security.md#sn-sec-015)), reduce-motion friendly, screen-reader announced politely rather than assertively.

#### Test plan
Integration: force a staging relay outage and assert (1) the status JSON flips, (2) the app shows the degraded banner only after a failed action, (3) the banner clears when service returns. Widget/golden: banner across looks, dark mode and 200% text scaling. Manual: publish a rehearsal incident through all four templates and confirm the page builds and deploys atomically; verify the status host stays up when the services are stopped.

#### Dependencies
[SN-SITE-013](website.md#sn-site-013) (website hosting), [SN-GOPS-009](ci-cd.md#sn-gops-009) (detection), [SN-SEC-035](security.md#sn-sec-035) (incident response and breach clock).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] A rehearsal incident has been published and rolled back on the real hosting


---

### SN-GOPS-019

<a id="sn-gops-019"></a>

**Publish and version the legal pages with in-app links and change history**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | website, privacy, docs |
| Size | M |
| SDLC | release |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-PRV-017](privacy.md#sn-prv-017), [SN-SITE-007](website.md#sn-site-007), [SN-DOC-010](docs.md#sn-doc-010) |
| Security controls | `MASVS-PRIVACY-3`, `OWASP-A09`, `CWE-200` |
| Extra labels | agent-ready, sec: privacy-by-design |

#### Context
[SN-PRV-017](privacy.md#sn-prv-017) drafts the Privacy Policy and Terms of Service and leaves them as source text pending legal review. Publishing them is a separate, unowned job with real constraints: `PRD-AUTH-005` requires the login fine-print to link **live URLs** that stay true; the rights surface ([SN-PRV-005](privacy.md#sn-prv-005)) needs a policy link and a contact route; store listings require working policy URLs at submission ([SN-REL-010](release.md#sn-rel-010)); a user with no network must still be able to read what they agreed to; and when the policy materially changes, users need to be told in-app (we may hold no email address for them at all — guest mode is first-class). Nothing today versions these documents, records effective dates, or keeps the in-app copy in step with the published one.

#### Scope
**In:** published legal routes on the website ([SN-SITE-007](website.md#sn-site-007) docs build) for Privacy Policy, Terms of Service, third-party licences ([SN-GOPS-004](release.md#sn-gops-004)) and any jurisdiction-specific notice ([SN-GIPAD-015](release.md#sn-gipad-015) DSA trader info), each with an effective date, a version id and a link to previous versions; an archived-versions index; a bundled offline copy shipped with the app and surfaced in Settings -> About/Help ([SN-SET-015](settings.md#sn-set-015), [SN-DOC-010](docs.md#sn-doc-010)), with a build-time check that the bundled version id matches the published one; a **material change** notice in-app (a one-time dismissible sheet naming what changed, with the diff summary) and the rule for when a change is material; store-listing URL wiring; localisation hooks so translated versions declare which source version they track ([SN-I18N-001](i18n.md#sn-i18n-001)).
**Out:** drafting or legally reviewing the text ([SN-PRV-017](privacy.md#sn-prv-017)); the rights surface ([SN-PRV-005](privacy.md#sn-prv-005)); store privacy questionnaires ([SN-PRV-015](privacy.md#sn-prv-015)); the marketing privacy-promise page ([SN-SITE-006](website.md#sn-site-006)), which links here rather than duplicating.

#### Acceptance criteria
- [ ] Privacy Policy, Terms and licences are published at stable URLs, render without JavaScript, and each shows an effective date and version id.
- [ ] Previous versions remain reachable from an archive index; a change never silently rewrites history.
- [ ] The app ships an offline copy; a CI check fails the build when the bundled version id does not match the published one.
- [ ] Login fine-print, onboarding, the rights surface and both store listings link to the live URLs, verified by the link checker ([SN-DOC-003](docs.md#sn-doc-003)).
- [ ] A material change triggers a one-time in-app notice that names the change and links the diff; the rule distinguishing material from editorial changes is written down.
- [ ] A translated page states which source version it tracks and falls back to the source language when it is stale.

#### Technical notes
Treat the legal pages as content in the zero-JS site build ([SN-SITE-002](website.md#sn-site-002)): Markdown with front-matter (`version`, `effective`, `supersedes`), rendered to static HTML, deployed atomically ([SN-REL-008](release.md#sn-rel-008)). The bundled copy is generated from the same source at build time into the app's help assets so a version mismatch is a build error rather than a discovery in production. The in-app notice reads a small `legal-version.json` published on the CDN, fetched with the same no-identifier discipline as the status JSON ([SN-GOPS-010](website.md#sn-gops-010)).

#### Security & privacy
A published policy is a factual claim about processing; if it drifts from `controls-matrix.md`, the DPIA ([SN-PRV-013](privacy.md#sn-prv-013)) or the store declarations ([SN-PRV-015](privacy.md#sn-prv-015)), the mismatch is a compliance finding and a trust failure (MASVS-PRIVACY-3 transparency; OWASP-A09 for the audit trail of versions). The fetch for the version marker must not become a tracking beacon: no identifiers, cacheable, identical for everyone. Legal pages must not disclose internal infrastructure detail (CWE-200) — sub-processors are named at the level the RoPA ([SN-GSEC-004](privacy.md#sn-gsec-004)) supports, no hostnames.

#### UX notes
Reading surfaces: website pages using the site typography with a prominent effective date; in-app, a scrollable document view in Settings using the design-system reading layout, Dynamic Type and 200% scaling safe, dark-mode correct, with a "last updated" line. The material-change sheet is a standard bottom sheet/dialog with a plain-language summary first and the full text one tap away — never a blocking modal that prevents note-taking.

#### Test plan
CI: version-mismatch check fails on a deliberately stale bundled copy; link checker passes for every referenced URL; the site builds with no JS. Widget/golden: the in-app document view and the material-change sheet across looks, dark mode and 200% text. Manual: publish a rehearsal version bump and confirm the archive index, the in-app notice fires exactly once per user, and the store listing URLs resolve from both consoles.

#### Dependencies
[SN-PRV-017](privacy.md#sn-prv-017) (drafted text), [SN-SITE-007](website.md#sn-site-007) (docs site build), [SN-DOC-010](docs.md#sn-doc-010) (in-app help centre).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Policy URLs verified live from both store consoles before submission


---

### SN-SITE-001

<a id="sn-site-001"></a>

**Ship the marketing site, docs site and web trial launcher**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | epic |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, docs, release |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | [SN-FND-009](devx.md#sn-fnd-009) |
| Security controls | `ASVS-V14`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-4`, `OWASP-A05`, `OWASP-A06`, `CWE-1021`, `CWE-693` |
| Extra labels | agent-ready |

#### Context
The `website/` package is one of the seven top-level folders locked by [ADR-0002](docs/adr/0002-monorepo-layout.md) and scaffolded as a placeholder by [SN-FND-009](devx.md#sn-fnd-009); this epic fills it. `docs/product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md` §10 (PRD-CO-410 … PRD-CO-417) specifies four deliverables: a marketing site that tells the value proposition, pricing and privacy story honestly; a docs site that hosts the user guides, the published open `.sanenote` spec, the accessibility statement and the AI data-handling policy; a “try it on the web” path that launches the real Flutter PWA in guest mode with no login; and a promise that nothing about the site leaks note content or tracks visitors. `docs/roadmap.md` places all of it in **M8 Launch & Growth**, after the product surface exists.

The site is also the public face of the trust wedge described in `docs/product/vision-and-principles.md` §8: local-first, zero-knowledge, open format, honest pricing. A marketing site carrying a third-party analytics tag or a stock-watermarked mascot would contradict the product it sells, so the epic treats “analytics-free by default”, “no third-party origins”, and “no placeholder Sage art” as build-time gates, not intentions.

#### Scope
**In:** the `website/` build (static, zero-JS by default), landing page and the 17-looks demo, pricing, privacy promise, docs site with search, the web-trial launcher and download page, blog/changelog with feeds, the security/disclosure page, SEO and performance budgets, hosting on a content origin separate from the app origin, site accessibility and localisation readiness.
**Out:** the Flutter web app itself and its origin ([SN-WEB-001](compat.md#sn-web-001), [SN-WEB-017](ci-cd.md#sn-web-017), [SN-WEB-022](onboarding.md#sn-web-022)); the vulnerability-disclosure programme and SECURITY.md ([SN-SEC-036](security.md#sn-sec-036)); store listings and release artefacts ([SN-REL-001](release.md#sn-rel-001)); in-app onboarding ([SN-ONB-001](onboarding.md#sn-onb-001)); billing implementation ([SN-BILL-001](billing.md#sn-bill-001)); the accessibility conformance report itself ([SN-A11Y-018](a11y.md#sn-a11y-018)).

#### Acceptance criteria
- [ ] Every child issue below is closed and the site is live on its own content origin.
- [ ] A network capture of a full visit shows requests to the site origin only — zero third-party hosts, zero cookies, zero analytics beacons (PRD-CO-415).
- [ ] The landing, pricing, privacy, docs and download pages pass WCAG 2.2 AA and the Lighthouse budgets in CI (PRD-CO-410, PRD-CO-417).
- [ ] “Try it on the web” reaches the real PWA in guest mode with no login (PRD-CO-412).
- [ ] `/.well-known/security.txt` and the human-readable security page are served and non-expired.
- [ ] No build embeds `design/assets/*.png` watermarked mascot art (`docs/design/README.md` §6 release blocker).

### Children
- [ ] [SN-SITE-002](website.md#sn-site-002) Scaffold the website workspace with a zero-JavaScript static build
- [ ] [SN-SITE-003](website.md#sn-site-003) Build the landing page with the value proposition and Sage brand
- [ ] [SN-SITE-004](website.md#sn-site-004) Build the interactive 17-looks demo for the landing page
- [ ] [SN-SITE-005](website.md#sn-site-005) Build the pricing page with honest Free versus Pro and student pricing
- [ ] [SN-SITE-006](website.md#sn-site-006) Build the privacy promise page that proves the zero-knowledge architecture
- [ ] [SN-SITE-007](website.md#sn-site-007) Build the docs site with guides, the .sanenote spec and offline search
- [ ] [SN-SITE-008](website.md#sn-site-008) Build the try-on-web launcher and native download page
- [ ] [SN-SITE-009](website.md#sn-site-009) Publish the blog and changelog with RSS and Atom feeds
- [ ] [SN-SITE-010](website.md#sn-site-010) Publish the security page and serve security.txt from the website
- [ ] [SN-SITE-011](website.md#sn-site-011) Add SEO metadata, sitemap, robots and build-time Open Graph images
- [ ] [SN-SITE-012](website.md#sn-site-012) Enforce website performance and Lighthouse budgets in CI
- [ ] [SN-SITE-013](website.md#sn-site-013) Provision website hosting on a content origin with hardened headers
- [ ] [SN-SITE-014](website.md#sn-site-014) Keep the website analytics-free and third-party-free by default
- [ ] [SN-SITE-015](website.md#sn-site-015) Make the website WCAG 2.2 AA accessible and localisation-ready

#### Technical notes
Everything lives under `website/` ([ADR-0002](docs/adr/0002-monorepo-layout.md)); the site is a **separate build from `app/`** and must never import `packages/` or `app/` code — it reads `docs/design/tokens.json` through a generator instead ([SN-SITE-002](website.md#sn-site-002)). Origin separation is an architectural constraint, not a preference: the PWA lives on its own cross-origin-isolated origin with COOP/COEP ([ADR-0010](docs/adr/0010-web-pwa-strategy.md) decision 2, `docs/platform/web.md` §8–§9, [SN-WEB-017](ci-cd.md#sn-web-017)), so marketing content can never share a script or storage context with the notes database. Implements PRD-CO-410 … PRD-CO-417 and supports PRD-CO-002 (guest first) and PRD-CO-003 (open formats).

#### Security & privacy
Threats: a marketing origin is the softest target in the system and an attractive pivot (OWASP-A05 misconfiguration, CWE-693); third-party scripts and fonts silently create tracking and a supply-chain foothold (OWASP-A06, MASVS-PRIVACY-1/4, CWE-1104); clickjacking or an unisolated origin next to the app (CWE-1021); stale dependencies in a rarely-touched package (OWASP-A06); untruthful privacy claims are themselves a compliance risk under GDPR and India DPDP (MASVS-PRIVACY-2). Controls: deny-by-default headers and CSP ([SN-SITE-013](website.md#sn-site-013)), no third-party origins enforced by test ([SN-SITE-014](website.md#sn-site-014)), dependency scanning in the same DevSecOps pipeline as the app (`docs/security/devsecops-pipeline.md`), and every privacy claim traced to a doc or ADR ([SN-SITE-006](website.md#sn-site-006)).

#### UX notes
Voice and brand come from `docs/design/README.md` §5 and `docs/design/design-system.md` §1: wordmark “Sane” 600 + “Notes” 400, tagline “Study smarter.”, plain warm copy, **no exclamation marks**, honest numbers. Visual language is the **Paper** look palette from `docs/design/tokens.json` with a light and dark map, so the site feels like the product; the 17-looks demo shows the rest. The site is responsive from 320 px, keyboard-first, and reduced-motion aware.

#### Test plan
Per-child test plans; at epic level a `website/test/e2e/` suite covering: no third-party request, all internal links resolve, every page passes axe-core, Lighthouse budgets hold, feeds validate, and `security.txt` parses.

#### Dependencies
[SN-FND-009](devx.md#sn-fnd-009) for the `website/` placeholder; [SN-WEB-022](onboarding.md#sn-web-022), [SN-REL-001](release.md#sn-rel-001), [SN-SEC-036](security.md#sn-sec-036), [SN-BILL-001](billing.md#sn-bill-001), [SN-PRV-001](privacy.md#sn-prv-001), [SN-DS-002](design-system.md#sn-ds-002) and [SN-BRD-001](brand.md#sn-brd-001) for the content the site points at.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-002

<a id="sn-site-002"></a>

**Scaffold the website workspace with a zero-JavaScript static build**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, devx, ci-cd |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-FND-009](devx.md#sn-fnd-009), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `OWASP-A06`, `OWASP-A08`, `CWE-1104`, `CWE-829`, `MASVS-CODE-3`, `SSDF-PO.5` |
| Extra labels | agent-ready |

#### Context
`website/` currently holds only a README from [SN-FND-009](devx.md#sn-fnd-009). Every other site issue needs a build to attach to, and the constraints on that build are already fixed by the product: PRD-CO-415 forbids third-party beacons, `docs/design/README.md` §2 forbids hard-coded colours (the build must read `docs/design/tokens.json`), and PRD-CO-410 requires the pages to pass Lighthouse performance and accessibility budgets. The docs do **not** name a site framework, so this issue decides one and records it: a **static-site generator emitting pre-rendered HTML with zero client JavaScript by default** (Astro 5 with `output: 'static'` is the proposed default; any generator that ships no runtime JS unless a component opts in satisfies the requirement). This is a decisive default per CLAUDE.md §9 rather than a maintainer decision, because nothing downstream depends on the specific generator.

#### Scope
**In:** the `website/` workspace (package manifest, pinned lockfile, `npm run build` → `website/dist/`), the directory layout (`src/pages/`, `src/content/{docs,blog}/`, `src/components/`, `src/styles/`, `public/`), the token generator `tools/scripts/gen_site_tokens.mjs` that compiles `docs/design/tokens.json` into `website/src/styles/tokens.css` custom properties, self-hosted subset fonts, a shared page shell (header, footer, skip link, light/dark), the `.github/workflows/website.yml` CI job (build, drift check, link check, dependency review), and a `website/README.md` for agents.
**Out:** page content ([SN-SITE-003](website.md#sn-site-003) … [SN-SITE-009](website.md#sn-site-009)), hosting and headers ([SN-SITE-013](website.md#sn-site-013)), budgets enforcement ([SN-SITE-012](website.md#sn-site-012)), and anything inside `app/` or `packages/`.

#### Acceptance criteria
- [ ] `npm ci && npm run build` inside `website/` produces `dist/` with no network access beyond the package registry, and the build is reproducible (same input → same output hashes).
- [ ] A page with no island ships **0 bytes** of JavaScript; the HTML byte size of the shell is asserted in a test.
- [ ] `tools/scripts/gen_site_tokens.mjs` emits CSS custom properties for the Paper look in light and dark plus the full `looks` map used by [SN-SITE-004](website.md#sn-site-004); CI fails if `tokens.css` drifts from `docs/design/tokens.json` (same contract as the Flutter codegen in `docs/design/README.md` §2).
- [ ] No colour, radius, shadow or type size is hard-coded in any component — a lint rule greps for hex literals outside `tokens.css` and fails.
- [ ] Fonts are self-hosted, subset, `font-display: swap`; no `fonts.googleapis.com` or any CDN appears in the built output.
- [ ] All dependencies are pinned to exact versions with an committed lockfile; OSV-Scanner and dependency-review run on `website/` in CI.
- [ ] The shell renders correctly at 320 px and at 200% zoom, includes a skip link, `<html lang>`, and landmark elements.
- [ ] `website/README.md` tells a new agent how to add a page, add a doc, and regenerate tokens.

#### Technical notes
Keep the site outside the Dart workspace: it is a Node package, so `melos`/`pub workspaces` must not try to resolve it ([ADR-0002](docs/adr/0002-monorepo-layout.md)); add it to `.github/workflows/website.yml` only. The token generator is the single seam to the design system — it must parse `rgba()`, `#rrggbbaa` and the multi-layer shadow strings exactly as `docs/design/README.md` §2 describes, and must ship the SVG `<defs>` (`ss-lined`, `ss-grid`, `ss-dot`, `ss-music`, `ss-flash`) into `public/` for the looks demo. Pin every GitHub Action to a full commit SHA (`docs/security/devsecops-pipeline.md`). Images build to AVIF/WebP with explicit width/height to protect CLS. Any inline `<style>`/`<script>` must be hashable so [SN-SITE-013](website.md#sn-site-013) can ship a CSP with no `unsafe-inline`.

#### Security & privacy
Threats: a compromised or typosquatted build dependency injecting a tracker or crypto-miner into static output (OWASP-A08, CWE-829, MASVS-CODE-3); transitive CDN fetches at build time pulling unpinned bytes (CWE-1104); unpatched generator dependencies (OWASP-A06). Controls: exact-version pins plus lockfile, OSV-Scanner and dependency-review gates, SHA-pinned actions, no runtime third-party origin (enforced by [SN-SITE-014](website.md#sn-site-014)), build runs with no secrets in scope, and the output is plain static files with no server-side execution. No visitor data of any kind is processed by the build.

#### UX notes
The shell is the frame every page inherits: header with the wordmark per `docs/design/design-system.md` §1 (“Sane” 600 + “Notes” 400 muted, tracking −1%), a footer linking Privacy, Security, Docs, Changelog and the GitHub repo, and a colour scheme driven by `prefers-color-scheme` with a manual toggle stored in `localStorage` only (a per-visitor convenience, never an identifier). Focus rings are visible at ≥ 2 px and ≥ 3:1 contrast; targets are ≥ 44 px per the project rule in CLAUDE.md §9.

#### Test plan
- `website/test/build_test.mjs` — build succeeds, `dist/` contains the expected routes, shell page ships 0 bytes JS.
- `tools/scripts/__tests__/gen_site_tokens_test.mjs` — token parsing (rgba, 8-digit hex, multi-layer shadows) and drift detection against `docs/design/tokens.json`.
- `website/test/no_hardcoded_colours_test.mjs` — grep gate over `src/`.
- `website/test/a11y_shell_test.mjs` — axe-core on the empty shell; skip link and landmarks present.
- Manual: build offline with the registry cache warm; verify fonts load from the site origin only.

#### Dependencies
[SN-FND-009](devx.md#sn-fnd-009) (the `website/` placeholder), [SN-DS-002](design-system.md#sn-ds-002) (the canonical token encoding this generator mirrors).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] `website/README.md` documents the stack decision and the token-drift contract
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-003

<a id="sn-site-003"></a>

**Build the landing page with the value proposition and Sage brand**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, brand |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-BRD-001](brand.md#sn-brd-001) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A05`, `CWE-1021`, `CWE-79` |
| Extra labels | agent-ready |

#### Context
PRD-CO-410 requires the marketing site to present the value proposition, feature pages, honest pricing, the privacy/local-first story and the Sane Sage mascot per brand rules. The copy spine already exists: `docs/design/README.md` §5 fixes the tagline (“Study smarter.” with the two S initials in the accent) and the voice (plain, warm, specific; sentences not labels; **no exclamation marks**; honest numbers), and `docs/product/vision-and-principles.md` §1/§8 fixes the claim set — expressive lag-proof ink, real knowledge structure, trustworthy local-first sync, free on-device multilingual handwriting search, genuine parity on five surfaces. This page is where a visitor meets all of that in under a minute, and it is the top of the funnel that [SN-SITE-008](website.md#sn-site-008) hands to the web trial.

One hard constraint governs the art: `docs/design/README.md` §6 marks `design/assets/sane-sage.png` and `sane-sage-icon.png` as **watermarked stock placeholders that must not ship on the website**. The build must fail rather than publish them.

#### Scope
**In:** `website/src/pages/index.astro` and its sections — hero (tagline, one-sentence promise, primary CTA to `/try`, secondary CTA to downloads), five proof sections mapped to the five refusals in `vision-and-principles.md` §8, a lag-proof/latency section citing the real budgets, a students-first section using the Riya persona framing, a privacy strip linking [SN-SITE-006](website.md#sn-site-006), a pricing teaser linking [SN-SITE-005](website.md#sn-site-005), and the footer; the copy deck in `website/src/content/landing/*.md`; responsive layout 320 px → desktop; light and dark.
**Out:** the interactive looks demo ([SN-SITE-004](website.md#sn-site-004)), pricing detail ([SN-SITE-005](website.md#sn-site-005)), privacy detail ([SN-SITE-006](website.md#sn-site-006)), download links ([SN-SITE-008](website.md#sn-site-008)), SEO/OG metadata ([SN-SITE-011](website.md#sn-site-011)), and any claim about features that have not shipped.

#### Acceptance criteria
- [ ] The hero renders the tagline with the S·S accent treatment and the wordmark per `docs/design/design-system.md` §1 (“Sane” 600, “Notes” 400 muted ink, tracking −1%).
- [ ] Every headline claim on the page links to the page or doc that substantiates it (pricing → [SN-SITE-005](website.md#sn-site-005), privacy → [SN-SITE-006](website.md#sn-site-006), open format → the `.sanenote` spec in [SN-SITE-007](website.md#sn-site-007)).
- [ ] Latency claims quote the published budgets exactly (≤ 16 ms iPad, ≤ 25 ms mid-range Android, ≤ 30 ms Chrome desktop; `docs/platform/performance-budgets.md` B1–B3) and no rounder number.
- [ ] A copy lint fails the build on an exclamation mark or a superlative not backed by a cited doc.
- [ ] A build gate fails if any asset under `design/assets/` is referenced or copied into `dist/` (`docs/design/README.md` §6); the mascot is referenced through one component, `SageMark`, so the art swaps in one place.
- [ ] The page ships zero client JavaScript of its own and no third-party request.
- [ ] Layout is correct at 320 px, at 200% text zoom, and with text-spacing overrides (WCAG 1.4.12); no horizontal scroll.
- [ ] Every image has meaningful `alt` (or `alt=""` when decorative), explicit dimensions, and an AVIF/WebP source.
- [ ] Contrast ≥ 4.5:1 for body text and ≥ 3:1 for large text, UI components and focus rings, in light and dark.

#### Technical notes
Use the shell and tokens from [SN-SITE-002](website.md#sn-site-002) — the site palette is the Paper look (`lookOrder[0]`) from `docs/design/tokens.json`, light and dark maps. Product screenshots must be generated from the real app builds (a `tools/scripts/capture_site_shots.mjs` run against the Flutter web build) rather than mocked in a design tool, so the site never advertises UI that does not exist; store them under `website/public/shots/` with their capture commit recorded. The hero illustration and mascot go through `website/src/components/SageMark.astro`, the single swap point mirroring `sane_ui`'s `SaneSageMark` ([SN-BRD-001](brand.md#sn-brd-001)). Implements PRD-CO-410; supports PRD-CO-002 by making the primary CTA a no-login trial.

#### Security & privacy
Baseline plus specifics. Threats: marketing pages historically attract embedded video players, chat widgets and tag managers — each one is a third-party origin and a tracking channel (MASVS-PRIVACY-1, OWASP-A05); any user-supplied or CMS-supplied HTML would be an injection path (CWE-79); framing the page for clickjacking a CTA (CWE-1021). Controls: no embeds (a poster image with a click-to-load local video instead), no forms and no cookies on this page, all content authored in-repo Markdown rendered at build time with HTML escaped by default, `frame-ancestors 'none'` from [SN-SITE-013](website.md#sn-site-013), and the zero-third-party test in [SN-SITE-014](website.md#sn-site-014). No visitor identifier of any kind is set.

#### UX notes
Reference surfaces: the `design/Sane Notes.dc.html` **Library** and **Editor** screens for the screenshots, and `docs/design/ux-principles.md` for motion and microcopy. Motion is limited to short fades and must be disabled entirely under `prefers-reduced-motion` (PRD-CO-317). States to build: default, reduced-motion, dark, narrow (< 900 px collapses the section grids to one column), and image-load failure (alt text carries the message). CTA buttons are ≥ 44 px tall with visible focus. The mascot sits on the look's accent-soft (`acs`) tile, never recoloured, at ≥ 24 px with clear space equal to the hat-brim height (`docs/design/README.md` §6).

#### Test plan
- `website/test/landing_content_test.mjs` — copy lint (no exclamation marks, claims carry links), tagline and wordmark markup present.
- `website/test/no_placeholder_art_test.mjs` — fails if `design/assets/*.png` is referenced or emitted.
- `website/test/a11y_landing_test.mjs` — axe-core zero critical/serious; contrast pairs computed from tokens in light and dark.
- `website/test/responsive_landing_test.mjs` — no horizontal overflow at 320 px, 200% zoom, and with text-spacing overrides.
- Manual: NVDA and VoiceOver read-through of the hero and section headings; screenshot capture script re-run.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002); [SN-BRD-001](brand.md#sn-brd-001) for the mascot asset and its licence status.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Screenshots regenerated from a real build and their source commit recorded
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-004

<a id="sn-site-004"></a>

**Build the interactive 17-looks demo for the landing page**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, design-system, theming |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A05`, `CWE-79`, `CWE-1104` |
| Extra labels | agent-ready, innovation |

#### Context
The 17 looks are a genuine differentiator — Principle 8 in `docs/product/vision-and-principles.md` and the full token sheet in `docs/design/tokens.json` (13 palette keys × light/dark × 17 looks, plus fonts, radii, border widths, shadow recipes and ground patterns). No competitor restyles the whole app, notebook pages included. A static screenshot cannot convey that, so the landing page carries a live demo: a mock notebook card and toolbar that re-renders under any look and mode the visitor picks, driven by the same `tokens.json` the app compiles. PRD-CO-410 requires the site to “match brand tokens”; this component is the proof.

The constraint is that it must not cost the page its performance or accessibility budget ([SN-SITE-012](website.md#sn-site-012)), and it must degrade to something useful with JavaScript disabled.

#### Scope
**In:** `website/src/components/LooksDemo/` — the look picker grouped as Warm / Clean / Bold / Soft / Raw in `lookOrder` sequence, a light/dark toggle, and a preview card composed of a page thumbnail (paper pattern + ink strokes), a toolbar, two buttons, a chip and a card so shadows/radii/borders are visible; the static no-JS fallback; the SVG `<defs>` for the paper patterns; per-look contrast verification.
**Out:** the design-system codegen itself ([SN-DS-002](design-system.md#sn-ds-002)), the component library ([SN-DS-003](design-system.md#sn-ds-003)), running the real Flutter app inside the page (that is the trial, [SN-SITE-008](website.md#sn-site-008)), and theming the rest of the site (the site stays on the Paper palette).

#### Acceptance criteria
- [ ] All **17 looks** (`paper, minimal, pop, maximal, glass, neumorph, clay, brutal, neobrutal, skeuo, flat, material, bento, y2k, retro, cyber, editorial`) render in **light and dark** — 34 combinations — using values read from generated token CSS, with no hard-coded colour.
- [ ] Switching a look repaints the preview with no layout shift (CLS contribution 0) and no network request.
- [ ] The interactive island ships **≤ 15 KB gzipped** of JavaScript and is the only JS on the landing page; the page still meets the budgets in [SN-SITE-012](website.md#sn-site-012).
- [ ] With JavaScript disabled the demo renders the Paper look statically with a visible note that switching needs JavaScript, and all links still work.
- [ ] Keyboard operable: the picker is a roving-tabindex radio group (arrow keys move, Home/End jump, Enter/Space select), each option exposes `aria-checked`, and the preview announces the change via a polite live region (“Cyberpunk, dark”).
- [ ] Look-specific behaviours from `docs/design/ux-principles.md` are honoured: glass blur, neo-brutalist hard offset shadows, neumorphic inset-on-press, brutalist zero radius, editorial hairlines.
- [ ] Every look/mode pair passes contrast ≥ 4.5:1 for preview body text and ≥ 3:1 for controls; a failing pair fails CI rather than shipping.
- [ ] Transitions are disabled under `prefers-reduced-motion` (PRD-CO-317); nothing animates faster than 3 Hz.
- [ ] The chosen look persists for the visit in `localStorage` only, is wrapped in try/catch, and is never sent anywhere.

#### Technical notes
Consume the CSS custom properties emitted by `tools/scripts/gen_site_tokens.mjs` ([SN-SITE-002](website.md#sn-site-002)) under a `[data-look][data-mode]` selector block — exactly the web target described in `docs/design/README.md` §2 — so the demo cannot drift from the app's `SaneLook` ThemeExtension ([SN-DS-002](design-system.md#sn-ds-002)). Resolve `var(--ln)`/`var(--ac)`/`var(--ink)` indirections inside `btnB`/`btnSh`/`cardSh` against the active palette before painting. Paper grounds come from `bgi` values referencing the shipped SVG pattern ids (`ss-lined`, `ss-grid`, `ss-dot`, `ss-music`, `ss-flash`). Ink strokes in the thumbnail are inline SVG paths using the look-independent `ink.INK` / `DARK_INK` constants, flipping by index in dark mode as the token contract requires. Keep the island framework-free (vanilla DOM + CSS attribute switching) to stay inside the byte budget.

#### Security & privacy
Baseline plus: the demo is the only scripted surface on the landing page, so it is the only XSS-relevant code (CWE-79) — it must never inject HTML from token strings, only set CSS custom properties and `data-` attributes, and token values are validated against a colour/shadow grammar at build time. No third-party script, font or image is loaded (MASVS-PRIVACY-1, CWE-1104). `localStorage` holds one non-identifying preference key (`sane-site-look`) and the page works when storage throws (private mode). Inline styles are hashed so the CSP in [SN-SITE-013](website.md#sn-site-013) needs no `unsafe-inline` (OWASP-A05).

#### UX notes
Model the preview on the `design/Sane Notes.dc.html` **Editor** and **Library** cards so a visitor sees the real product shapes; group labels and the grid order follow `docs/design/README.md` §4. Each look option shows its name and a two-swatch mini-preview, and the control announces the colour **name**, never colour alone (PRD-CO-311). Targets ≥ 44 px; focus ring visible on every option in all 34 combinations — the Glassmorphism and Cyberpunk pairs are the known-risky ones, so verify them explicitly (`docs/design/accessibility.md` §Contrast across the 17 looks). Empty/failure state: if token CSS is missing, the component renders the static Paper fallback rather than an unstyled block.

#### Test plan
- `website/test/looks_demo_tokens_test.mjs` — all 17 looks × 2 modes resolve every palette key used by the preview; no hex literal in the component source.
- `website/test/looks_demo_contrast_test.mjs` — computed contrast for text/control pairs per look and mode.
- `website/test/looks_demo_keyboard_test.mjs` — roving tabindex, arrow/Home/End, `aria-checked`, live-region announcement.
- `website/test/looks_demo_budget_test.mjs` — gzipped island size ≤ 15 KB; no-JS fallback markup present in `dist/`.
- Manual: VoiceOver pass on the picker; reduced-motion check; private-browsing storage failure.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-DS-002](design-system.md#sn-ds-002).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Contrast results for all 34 look/mode pairs recorded in the PR
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-005

<a id="sn-site-005"></a>

**Build the pricing page with honest Free versus Pro and student pricing**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, billing |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-BILL-001](billing.md#sn-bill-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `OWASP-A01`, `CWE-359`, `ASVS-V14` |
| Extra labels | needs-decision |

#### Context
Pricing is a trust surface for this product, not a conversion funnel: `docs/product/vision-and-principles.md` §2 names Notability's forced-subscription pivot as a trust failure the category still resents, and PRD-CO-004 requires plan gates to be honest and non-destructive — they degrade to an upgrade prompt and never block export or data access. PRD-CO-410 requires the site to show “honest pricing (Free vs Pro ₹83/mo reference, student verification)”. The plan matrix itself is specified in the design (`docs/design/screens-and-flows.md` §14) and mirrored by the in-app Upgrade overlay ([SN-BILL-011](billing.md#sn-bill-011)), so the page must agree with the app exactly — a page that promises more than the entitlement engine grants is a support and compliance problem.

Two numbers are still open at the maintainer level (CLAUDE.md §13): the **“Ask my notes” free preview quota** and the **version-history retention tiers**. The page must not invent them.

#### Scope
**In:** `website/src/pages/pricing.astro`; the machine-readable plan matrix `website/src/content/pricing/plans.json` (feature rows, Free value, Pro value, footnote reference); the Free/Pro comparison table; the ₹83/month and ₹999/year reference prices with the store-versus-web-checkout disclosure; student verification (time-boxed, annually re-verified); the “export everything, even on Free” row (PRD-CO-003, PRD-CO-016); cancellation/refund and price-change policy links; an FAQ covering “what happens if I stop paying”.
**Out:** the checkout or IAP implementation ([SN-BILL-001](billing.md#sn-bill-001)), entitlement verification, the in-app Upgrade overlay ([SN-BILL-011](billing.md#sn-bill-011)), student-verification vendor integration, and locale price tables beyond the ₹ reference (store tiers are per-storefront, PRD-CO-375).

#### Acceptance criteria
- [ ] The comparison table is generated from `plans.json`; a CI check fails if a row's gate contradicts the documented gates (3 people per shared notebook on Free, Ask-my-notes preview on Free, convert-to-text and solve-math Pro, transcripts Pro, unlimited collaborators and live cursors Pro — `docs/design/screens-and-flows.md` §14, PRD-CO-004, PRD-CO-033, PRD-CO-106).
- [ ] The page states plainly that **Free never blocks export or access to your data** and links to the export docs (PRD-CO-003, PRD-CO-016).
- [ ] The page states that ending a subscription degrades to Free and never deletes or hides notes already created (PRD-CO-004, roadmap M8 exit criterion “entitlement failure never punishes the user”).
- [ ] Prices render as ₹83/month and ₹999/year with Indian digit grouping, marked as reference prices, with a note that store prices are set per storefront (PRD-CO-375).
- [ ] Student pricing explains the verification, its time-box and annual re-verification, and what happens when it lapses.
- [ ] No dark patterns: no countdown timer, no pre-ticked upsell, no fake scarcity, no strike-through price that was never charged; the cancellation path is described in one sentence and linked (parity with [SN-BILL-017](billing.md#sn-bill-017)).
- [ ] Copy passes the voice lint (no exclamation marks, honest numbers explained not hidden).
- [ ] **needs-decision:** the AI free-preview quota row and the version-history retention row render from a single `"pending"` state that prints “to be confirmed before launch” rather than a guessed number, and the page cannot ship to production with a pending row (release check).
- [ ] Page ships zero JavaScript, no cookies, no third-party request.

#### Technical notes
`plans.json` is the shared truth: the same file feeds the site table and a CI comparison against the entitlement matrix owned by [SN-BILL-001](billing.md#sn-bill-001), so drift fails the build rather than being discovered by a user. Currency formatting is produced at build time with `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })` — the same lakh/crore grouping rule PRD-CO-375 sets for the app — never hand-formatted. Keep the page static: pricing experiments, geo-pricing lookups and A/B scripts are out of scope permanently, because each one is a third-party request ([SN-SITE-014](website.md#sn-site-014)). Link to the privacy page ([SN-SITE-006](website.md#sn-site-006)) for what account creation entails, and to the docs site ([SN-SITE-007](website.md#sn-site-007)) for the export guide. Implements PRD-CO-410 and PRD-CO-004.

#### Security & privacy
Threats: pricing pages are where analytics, ad pixels and session-replay tools are usually justified — all forbidden here (MASVS-PRIVACY-1/2, PRD-CO-415); a checkout link that hands identifiers to a payment vendor before consent (CWE-359, OWASP-A01); a stale claim that grants more than the entitlement engine does, which is a misrepresentation risk under consumer law (ASVS-V14 configuration correctness of published claims). Controls: no third-party scripts and no cookies on the page; outbound checkout links carry `rel="noopener noreferrer"` and no query identifiers; the plan matrix is CI-verified against the app's gates; every claim about data access maps to a PRD requirement id in `plans.json` for audit.

#### UX notes
Mirror the in-app Upgrade overlay (`docs/design/screens-and-flows.md` §13/§14) so the site and app read as one product: the same row order, the same wording, the same honest-limits tone (“5 imports a month”, not “limited imports”). Table must reflow to stacked cards below 900 px and remain readable at 200% zoom and with text-spacing overrides. The comparison table uses real `<table>` semantics with `<caption>`, row and column headers, so screen readers can navigate it; ticks and crosses carry text alternatives (never colour or icon alone, PRD-CO-311). Empty state: a pending row shows an explicit “to be confirmed” chip, not a blank cell.

#### Test plan
- `website/test/pricing_matrix_test.mjs` — `plans.json` schema, gate parity against the documented entitlement matrix, no pending row in a production build.
- `website/test/pricing_currency_test.mjs` — ₹ formatting and grouping for `en-IN` and `hi-IN`.
- `website/test/pricing_darkpattern_test.mjs` — forbids countdown/scarcity markup and pre-checked inputs; asserts the cancellation link exists.
- `website/test/a11y_pricing_test.mjs` — axe-core, table semantics, non-colour indicators, 200% zoom reflow.
- Manual: read the page beside the in-app Upgrade overlay and confirm identical claims.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-BILL-001](billing.md#sn-bill-001); blocked for release on the maintainer decisions named above (CLAUDE.md §13).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Plan matrix verified against the shipped entitlement gates
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-006

<a id="sn-site-006"></a>

**Build the privacy promise page that proves the zero-knowledge architecture**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, privacy |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-PRV-001](privacy.md#sn-prv-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-3`, `MASVS-PRIVACY-4`, `MASVS-CRYPTO-1`, `MASVS-STORAGE-1`, `OWASP-A02`, `ASVS-V14`, `CWE-359` |
| Extra labels | agent-ready |

#### Context
The product's core claim is architectural: no Sane Notes server ever stores or can read note content ([ADR-0004](docs/adr/0004-local-first-zero-server.md)), sync goes to the user's own iCloud Drive or Google Drive as ciphertext ([ADR-0006](docs/adr/0006-sync-over-user-cloud-drives.md)), keys live in Keychain/Secure Enclave or Keystore/StrongBox with a printable recovery code and no vendor recovery ([ADR-0007](docs/adr/0007-end-to-end-encryption-and-keys.md)), AI runs on-device by default with per-request cloud opt-in ([ADR-0016](docs/adr/0016-on-device-ml-and-ai.md), PRD-CO-001/165–168), and telemetry is opt-in ([ADR-0011](docs/adr/0011-telemetry-and-diagnostics.md)). `docs/product/vision-and-principles.md` §8 calls this the wedge incumbents structurally cannot copy. PRD-CO-410 requires the site to carry the privacy/local-first story and PRD-CO-411 requires the docs site to host privacy and security documentation including the AI data-handling policy.

This page is the marketing-side, human-readable version of that — and it must be **provable, not asserted** (Principle 9: an AI-privacy claim that is asserted rather than provable by architecture is forbidden). It is also where the honest limitations go.

#### Scope
**In:** `website/src/pages/privacy.astro` (the promise page) with sections for: where notes live, what leaves the device and when, how sync works, how encryption and recovery work, what AI does on-device and what a cloud opt-in sends, what telemetry is (off by default), what an account is used for (profile, sharing, entitlements — never required to take notes), store privacy-label summaries, regional posture (GDPR, India DPDP 2023, COPPA-aware age gate), deletion and export routes, and an **Honest limits** section; the machine-checked claims file `website/src/content/privacy/claims.json`; links to the full policy and the security page.
**Out:** the legal privacy-policy text and store label filings ([SN-PRV-001](privacy.md#sn-prv-001)), the in-app privacy dashboard, the telemetry implementation ([SN-TEL-001](telemetry.md#sn-tel-001)), and the disclosure programme ([SN-SITE-010](website.md#sn-site-010), [SN-SEC-036](security.md#sn-sec-036)).

#### Acceptance criteria
- [ ] Every claim on the page has an entry in `claims.json` naming the doc/ADR/PRD id that substantiates it; CI fails on a claim with no reference or a reference to a missing file.
- [ ] The page states the four architectural facts precisely: device is the system of record; cloud copies are ciphertext the sync target cannot read; keys never leave the device unwrapped and there is **no vendor recovery**; an account is never required to take notes (PRD-CO-002).
- [ ] The AI section states on-device by default, the per-request consent model, the visible “data leaves device” indicator, the hard master switch, and the no-training / ephemeral-processing guarantee (PRD-CO-165 … PRD-CO-168).
- [ ] The telemetry section states opt-in, on-device aggregation first, and what a crash report contains.
- [ ] The **Honest limits** section names, without spin: (a) the web PWA's reduced at-rest guarantee — no Keychain/Keystore, ciphertext in browser storage, no hardware binding (`docs/platform/web.md` R4, CLAUDE.md §13); (b) revocation cannot un-download what a recipient already fetched (PRD-CO-035, PRD-04 R2); (c) browser storage can be evicted so a durable copy matters (`docs/platform/web.md` §4, R6).
- [ ] Store-label summaries match what will actually be filed (Play Data Safety “no data collected” except opt-in crash reports; Apple privacy labels) and link to [SN-PRV-001](privacy.md#sn-prv-001)'s filings.
- [ ] The page itself demonstrates the promise: zero third-party requests, zero cookies, zero analytics, no forms.
- [ ] Reading level and voice pass the copy lint; no absolute claim (“unhackable”, “100% private”) appears.

#### Technical notes
`claims.json` entries are `{ id, claim, evidence: ["docs/adr/0004-local-first-zero-server.md", "PRD-CO-000"], lastReviewed }`; the CI check resolves each path in the repo and each `PRD-*` id against `docs/product/prd-0{1..4}-*.md`, so a doc change that invalidates a claim breaks the build — this is the mechanism that keeps marketing honest as the product evolves. Render the crypto summary from the primitive list in `docs/architecture/crypto.md` (XChaCha20-Poly1305 / AES-256-GCM, Argon2id, HKDF, SHA-256/BLAKE3, Ed25519) without naming parameters that could drift. Link the `.sanenote` spec ([SN-SITE-007](website.md#sn-site-007)) as the “you can always leave” proof (PRD-CO-003). Implements PRD-CO-410 and the site half of PRD-CO-411 and PRD-CO-415.

#### Security & privacy
This page *is* a privacy control: an inaccurate statement here is a regulatory exposure under GDPR Art. 13/14 and India DPDP notice duties (MASVS-PRIVACY-2, CWE-359), and an over-claim undermines MASVS-PRIVACY-1/3/4 posture the rest of the system earns. Threats: drift between page and implementation (mitigated by `claims.json` CI); a contact form or newsletter widget quietly collecting email (forbidden — link to the repo/disclosure channels instead); crypto claims that outrun the implementation (MASVS-CRYPTO-1, OWASP-A02 — the page describes the design, references ADR-0007, and never claims audit status before an audit exists). The page must also state the site's own data handling: no cookies, no analytics, and edge access logs with query strings stripped and short retention ([SN-SITE-013](website.md#sn-site-013)).

#### UX notes
Structure it as question-led sections (“Where do my notes live?”, “What happens when I turn on sync?”) matching the in-app privacy dashboard's language (`docs/design/screens-and-flows.md` §12 Privacy & export) so the same person reads the same sentences in both places. Use the Paper palette in light and dark; diagrams are inline SVG with `<title>`/`<desc>` and a text alternative that carries the same information (WCAG 1.1.1, PRD-CO-310). Honest-limits content uses a distinct but non-alarming callout style that is legible without colour (PRD-CO-311). Long page: provide an in-page table of contents with skip-to-section links and stable anchors so support can deep-link an answer.

#### Test plan
- `website/test/privacy_claims_test.mjs` — every claim resolves to an existing doc path and PRD id; no orphan claim; `lastReviewed` within the release window.
- `website/test/privacy_forbidden_claims_test.mjs` — absolute-claim lint (“unhackable”, “military-grade”, “100%”) and exclamation-mark lint.
- `website/test/a11y_privacy_test.mjs` — axe-core, heading order, SVG alternatives, ToC anchors.
- `website/test/e2e/no_third_party_test.mjs` (shared with [SN-SITE-014](website.md#sn-site-014)) — this page issues no third-party request and sets no cookie.
- Manual: read the page against `docs/security/threat-model.md` and the privacy dashboard copy for contradictions.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-PRV-001](privacy.md#sn-prv-001); references [SN-SITE-007](website.md#sn-site-007) for the format spec and [SN-SITE-010](website.md#sn-site-010) for the disclosure route.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Claims reviewed by the Security Owner against the threat model and controls matrix
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-007

<a id="sn-site-007"></a>

**Build the docs site with guides, the .sanenote spec and offline search**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, docs |
| Size | L |
| SDLC | implementation |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-CORE-005](storage.md#sn-core-005), [SN-DOC-001](docs.md#sn-doc-001) |
| Security controls | `OWASP-A03`, `OWASP-A05`, `CWE-79`, `CWE-601`, `MASVS-PRIVACY-1`, `ASVS-V5` |
| Extra labels | agent-ready |

#### Context
PRD-CO-411 requires a docs site hosting the user guides, the **published open-format spec** for `.sanenote`, import/export guides, the accessibility statement and the privacy/security documentation including the AI data-handling and cloud-opt-in policy. That publication is load-bearing for two product promises: Principle 6 (“your data is yours” — an open, documented, round-trippable format with a public spec) and PRD-CO-003 (anything the user creates is exportable in a format with a published spec, on Free as well as Pro). Support content also reduces the trust cost of a zero-knowledge product, where “we can restore it for you” is deliberately impossible.

The docs site is a separate information architecture from the marketing pages but shares the build from [SN-SITE-002](website.md#sn-site-002), so it inherits the zero-JS default, the token styling and the no-third-party rule.

#### Scope
**In:** `website/src/content/docs/` collections and the `/docs` routes — getting started per surface (iPad, Android tablet, web, phones), notebooks and library, the pen and brush guide, PDF import and annotation, audio and transcripts, handwriting search, sharing and permissions, import from other apps, **export and the `.sanenote` format spec** (versioned under `/docs/format/v1`), the accessibility statement page that renders [SN-A11Y-018](a11y.md#sn-a11y-018)'s statement, the privacy and security docs including the AI data-handling policy, a troubleshooting/FAQ section, and a self-hosted client-side search index that works offline.
**Out:** authoring the developer-facing docs in `docs/` ([SN-DOC-001](docs.md#sn-doc-001)), the format implementation ([SN-CORE-005](storage.md#sn-core-005)), the accessibility conformance report itself ([SN-A11Y-018](a11y.md#sn-a11y-018)), the blog and changelog ([SN-SITE-009](website.md#sn-site-009)), and localisation of doc content ([SN-SITE-015](website.md#sn-site-015) covers readiness only).

#### Acceptance criteria
- [ ] `/docs` renders a sidebar-navigable tree with stable URLs, a breadcrumb, previous/next links, and a heading-anchored in-page table of contents.
- [ ] The `.sanenote` spec is published at a versioned path, states its version and the app versions that read it, and is byte-identical in content to the repo spec (a CI diff against `docs/architecture/file-format.md` and [SN-CORE-005](storage.md#sn-core-005)'s schema fails on drift).
- [ ] Search is self-hosted and static (for example a Pagefind-style prebuilt index), returns results with no network call to any third party, works from the service-worker-free static site, and degrades to a visible “search needs JavaScript” note plus a full text index page.
- [ ] Search index chunks total ≤ 300 KB and load lazily; the docs shell itself still ships zero JS.
- [ ] Every doc page carries `lastUpdated` from git and a “edit this page” link to the repo.
- [ ] Code samples render with build-time highlighting (no runtime highlighter), are copy-safe (no JS required to select), and never contain a real key, token or path from a maintainer machine.
- [ ] The accessibility statement, privacy/security docs and AI data-handling policy are reachable within two clicks of `/docs` and are linked from the footer.
- [ ] Internal links are checked in CI; a broken link fails the build. External links open with `rel="noopener noreferrer"`.
- [ ] Docs pages pass axe-core with zero critical/serious findings and read correctly at 320 px and 200% zoom.

#### Technical notes
Use the generator's content collections with a schema per collection (`title`, `summary`, `surface`, `order`, `updated`) so a malformed doc fails at build ([SN-SITE-002](website.md#sn-site-002)). Markdown is rendered at build time with raw HTML disabled by default; any needed HTML uses explicit components, which keeps the docs pipeline free of injection paths. The spec page is generated from the repo source rather than copy-pasted — add `tools/scripts/sync_format_spec.mjs` and run it in CI so `website/` can never publish a spec the code no longer implements ([SN-CORE-005](storage.md#sn-core-005), `docs/architecture/file-format.md`). Search index generation runs post-build over `dist/`. Keep the docs on the **content origin**, not the app origin ([SN-SITE-013](website.md#sn-site-013), [SN-WEB-017](ci-cd.md#sn-web-017)). Implements PRD-CO-411 and supports PRD-CO-003 and PRD-CO-013 … PRD-CO-016.

#### Security & privacy
Threats: a docs pipeline that renders raw HTML or unsanitised Markdown is a stored-XSS path on a site that also links to the app origin (CWE-79, OWASP-A03, ASVS-V5); “edit this page” and external links can be abused for open redirects if built from user-supplied strings (CWE-601); hosted third-party search (Algolia-class) would send every visitor query off-origin and break the analytics-free promise (MASVS-PRIVACY-1, PRD-CO-415); leaked example credentials in code samples (CWE-798). Controls: raw HTML disabled, schema-validated frontmatter, link allow-listing for redirect-style links, fully local search, gitleaks over `website/` content in CI, and no forms or comment system on docs pages.

#### UX notes
Style from the Paper palette with the same header/footer shell as marketing so the two read as one site; documentation typography uses the `typeScale` tokens rather than ad-hoc sizes (`docs/design/tokens.json`). Screenshots are captured from real builds and carry alt text describing the action, not the pixels. States: search empty (“no results — try a different word”), search-without-JS, page-not-found (a 404 that suggests the docs index and search), and offline (pages already visited still open if the visitor installed the PWA — the docs site itself has no service worker). Sidebar collapses to a disclosure menu below 900 px; keyboard users get a skip link to the main content and a focus-visible outline on every tree item (PRD-CO-315, PRD-CO-316).

#### Test plan
- `website/test/docs_schema_test.mjs` — frontmatter schema validation across all doc pages.
- `website/test/format_spec_sync_test.mjs` — published spec matches the repo spec byte-for-byte.
- `website/test/docs_search_test.mjs` — index builds, query returns expected pages, no network call leaves the origin, size budget holds.
- `website/test/links_test.mjs` — internal link integrity and external-link rel attributes.
- `website/test/a11y_docs_test.mjs` — axe-core on a sample of ten pages including the spec page.
- Manual: NVDA navigation of the sidebar tree; read the spec page against a real `.sanenote` bundle.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-CORE-005](storage.md#sn-core-005), [SN-DOC-001](docs.md#sn-doc-001); renders content owned by [SN-A11Y-018](a11y.md#sn-a11y-018) and [SN-PRV-001](privacy.md#sn-prv-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Published `.sanenote` spec verified against the shipping reader/writer
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-008

<a id="sn-site-008"></a>

**Build the try-on-web launcher and native download page**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, onboarding, release |
| Size | M |
| SDLC | implementation |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-WEB-022](onboarding.md#sn-web-022), [SN-REL-001](release.md#sn-rel-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-NETWORK-1`, `OWASP-A01`, `CWE-601`, `CWE-1021`, `CWE-1022` |
| Extra labels | needs-credentials |

#### Context
PRD-CO-412 makes “try it on the web” a core acquisition path: the real Flutter PWA, in guest mode, with a sample notebook, no login, able to ink and import a PDF at the ≤ 30 ms Chrome-desktop budget. PRD-CO-413 adds that the trial must be an installable PWA. The trial experience itself is built inside the app by [SN-WEB-022](onboarding.md#sn-web-022); **this issue is the site-side launcher** — the button that takes a visitor from marketing to the app origin cleanly, tells the truth about browser support before they get a broken experience, and offers the native builds for people who want the fast path. `docs/platform/web.md` §1 fixes the support matrix (Chrome/Edge 120+, Safari 17+, Firefox 125+, Samsung Internet tracking Chrome) and §11 R1 warns that iOS browsers get the heavier CanvasKit fallback — a visitor deserves to know that before judging the product on latency.

#### Scope
**In:** `website/src/pages/try.astro` and `website/src/pages/download.astro`; the cross-origin launch to the app origin's `/try` route; a local capability pre-flight (browser/version, WebGL2, WasmGC presence, storage availability) rendering one of three states — go, degraded-but-usable, unsupported; honest expectation copy (“web is great for viewing and light editing; heavy inking is best in the installed apps”, `docs/platform/web.md` intro); the PWA install hint per browser; download cards for iPad/iPhone (App Store), Android tablet/phone (Play), and the installable PWA, driven by `website/src/content/downloads.json`; the “what the trial keeps” explanation (guest data stays in the browser; sign in to keep it — PRD-CO-414).
**Out:** the trial itself, sample notebook and guest→account adoption ([SN-WEB-022](onboarding.md#sn-web-022)); store listing assets, screenshots and metadata ([SN-REL-001](release.md#sn-rel-001)); the app origin and its headers ([SN-WEB-017](ci-cd.md#sn-web-017)); pricing ([SN-SITE-005](website.md#sn-site-005)).

#### Acceptance criteria
- [ ] The primary CTA opens the app origin's `/try` route in the same tab with no query parameters, no fragment and no referrer beyond origin (`Referrer-Policy` from [SN-SITE-013](website.md#sn-site-013)); the destination is a compile-time constant, never taken from a URL parameter (CWE-601).
- [ ] Capability pre-flight runs entirely locally, sets no cookie and sends nothing; results are: supported (launch), degraded (launch with a one-line note naming the limitation, e.g. iOS browsers run the CanvasKit fallback), unsupported (a plain page telling the visitor which browser version they need, with the native downloads offered instead).
- [ ] The unsupported and degraded copy matches `docs/platform/compatibility-matrix.md` and `docs/platform/web.md` §1 exactly; a CI check fails on a version number that disagrees.
- [ ] The page states that the trial needs no account and that export works without signing in (PRD-CO-002, PRD-CO-003, PRD-CO-414).
- [ ] Download cards render from `downloads.json`; a production build fails if any URL is still the placeholder (**needs-credentials**: real App Store and Play listing URLs plus official badge assets come from the maintainer at launch).
- [ ] Official store badges are served from the site origin (downloaded into `public/`), never hot-linked from Apple or Google (MASVS-PRIVACY-1).
- [ ] The install hint is correct per browser family: Chromium shows the install affordance explanation, Safari iOS/iPadOS explains manual Add to Home Screen (`docs/platform/web.md` §5).
- [ ] Page ships ≤ 3 KB gzipped of JavaScript (feature detection only), zero third-party requests, zero cookies.
- [ ] Keyboard and screen-reader complete: the three states are announced, CTA targets ≥ 44 px, contrast ≥ 4.5:1 in light and dark.

#### Technical notes
Feature-detect, do not sniff: test `WebAssembly` + WasmGC (`WebAssembly.validate` of a probe module), `navigator.storage`, WebGL2 context creation and `PointerEvent` support, and treat the user-agent string only as a last-resort hint for naming a browser in copy — no fingerprint is computed or stored (MASVS-PRIVACY-2). The app origin URL lives in one build constant shared with [SN-SITE-011](website.md#sn-site-011)'s canonical map. Because marketing and app are different origins ([ADR-0010](docs/adr/0010-web-pwa-strategy.md) decision 2, [SN-WEB-017](ci-cd.md#sn-web-017)), no state can be handed across: the launcher passes nothing, and the trial seeds itself locally ([SN-WEB-022](onboarding.md#sn-web-022)). Never embed the app in an iframe — cross-origin isolation and `frame-ancestors 'none'` forbid it and it would break OPFS and COOP/COEP (CWE-1021). Implements PRD-CO-412 and PRD-CO-413 from the site side.

#### Security & privacy
Threats: an open redirect through a `?next=` style launch parameter (CWE-601); a launcher that hands attribution parameters to the app origin, creating a cross-origin identifier (MASVS-PRIVACY-2, CWE-1022); hot-linked store badges leaking every visitor to Apple/Google CDNs (MASVS-PRIVACY-1, PRD-CO-415); framing or embedding the app to capture input (CWE-1021); download links served over plain HTTP or pointing at a non-official mirror (MASVS-NETWORK-1, OWASP-A01). Controls: constant destination URLs, no query strings, `rel="noopener noreferrer"` on external links, locally hosted badges, `frame-ancestors 'none'` and no iframes, HTTPS-only links verified in CI, and no cookie or storage write on the launcher page.

#### UX notes
Follow the design's onboarding tone (`docs/design/screens-and-flows.md` §5 and §16 copy rules): calm, specific, no exclamation marks. The three pre-flight states must look deliberate, not like errors — the unsupported state is a plain card with the required browser versions and the download options, never a dead end. The download page groups by device family matching the five surfaces in CLAUDE.md §1 and uses the Sage mark through the shared `SageMark` component (never the watermarked placeholder, `docs/design/README.md` §6). Announce state changes with a polite live region; ensure the CTA is the first focusable element after the skip link. Below 900 px the download cards stack; badge images carry alt text naming the store.

#### Test plan
- `website/test/try_launcher_test.mjs` — destination constant, no query/fragment, three pre-flight states render, no cookie written.
- `website/test/compat_copy_test.mjs` — browser version numbers match `docs/platform/compatibility-matrix.md` and `docs/platform/web.md` §1.
- `website/test/downloads_config_test.mjs` — schema, HTTPS-only, no placeholder URL in a production build, badges served locally.
- `website/test/a11y_try_test.mjs` — axe-core, live-region announcement, focus order, target sizes.
- Manual: launch on Chrome desktop, Safari iPadOS (degraded copy), and an outdated Firefox (unsupported copy); confirm the trial starts with no login.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-WEB-022](onboarding.md#sn-web-022), [SN-REL-001](release.md#sn-rel-001); store URLs and badge assets are maintainer-supplied at launch.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Real store URLs configured and the placeholder gate verified
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-009

<a id="sn-site-009"></a>

**Publish the blog and changelog with RSS and Atom feeds**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, release, docs |
| Size | M |
| SDLC | release |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-FND-022](devx.md#sn-fnd-022) |
| Security controls | `OWASP-A03`, `CWE-79`, `CWE-1104`, `MASVS-PRIVACY-1`, `ASVS-V5` |
| Extra labels | agent-ready |

#### Context
A zero-server, local-first product cannot phone users to tell them what changed, and it deliberately has no in-app analytics to infer engagement from. The public record of what shipped therefore has to be the changelog, and it has to be trustworthy: `docs/product/vision-and-principles.md` §2 names Notability's unannounced pricing pivot as a trust failure this project positions against, so “we tell you what changed, including the unflattering parts” is part of the brand. [SN-FND-022](devx.md#sn-fnd-022) already defines the versioning and changelog policy (SemVer plus Melos versioning); this issue publishes it on the site alongside a small editorial blog for release notes, engineering posts (the ink latency work, the CRDT model, on-device AI) and policy changes.

Feeds matter more than usual here because there is no newsletter: the site sends no email and stores no address, so RSS/Atom/JSON feeds are the only subscription mechanism offered (PRD-CO-415 forbids the tracking infrastructure a mailing list would normally bring).

#### Scope
**In:** `website/src/content/blog/` and `website/src/content/releases/` collections; `/blog`, `/blog/<slug>`, `/changelog` and `/changelog/<version>` routes; generation of release entries from the repo `CHANGELOG.md` produced under [SN-FND-022](devx.md#sn-fnd-022); RSS 2.0, Atom 1.0 and JSON Feed endpoints with correct content types and `<link rel="alternate">` discovery; per-post frontmatter schema (title, date, summary, author, tags, `draft`); tag index pages; a “subscribe” explainer that offers feeds and the GitHub releases page instead of email.
**Out:** the versioning policy itself ([SN-FND-022](devx.md#sn-fnd-022)), store release notes and staged rollout ([SN-REL-001](release.md#sn-rel-001)), in-app What's New, comments of any kind, and email capture in any form.

#### Acceptance criteria
- [ ] `/changelog` lists every released version newest-first with date, SemVer, surface-specific notes, and a link to the tagged release; entries are generated from the repo changelog, and a CI check fails if a published version is missing from either side.
- [ ] A release entry that contains a security fix links to the advisory and the security page ([SN-SITE-010](website.md#sn-site-010)) without disclosing exploit detail before the disclosure window closes (`docs/security/ssdlc-process.md` §3).
- [ ] `/feed.xml` (RSS), `/atom.xml` and `/feed.json` validate against their specs, carry absolute URLs, `lastBuildDate`, and are discoverable via `<link rel="alternate">` on every page.
- [ ] Posts marked `draft: true` are excluded from `dist/`, feeds, sitemap and search.
- [ ] No tracking pixel, no remote image, no embedded video or social widget appears in any post; all images are local and built to AVIF/WebP with dimensions.
- [ ] Feeds contain full post content with HTML sanitised at build time; no script, iframe, form or event attribute survives into a feed or a page.
- [ ] Post pages ship zero JavaScript and set no cookie.
- [ ] Dates render in an unambiguous format with `<time datetime>`; reading order and heading levels pass axe-core.
- [ ] Each post has a stable permalink and a canonical URL; renaming a post leaves a redirect entry in the route map.

#### Technical notes
Parse `CHANGELOG.md` with a Keep-a-Changelog-shaped reader in `tools/scripts/gen_release_pages.mjs` so the site cannot drift from the tagged releases ([SN-FND-022](devx.md#sn-fnd-022)); version ordering uses SemVer comparison, not string sort. Markdown rendering keeps raw HTML disabled (same pipeline decision as [SN-SITE-007](website.md#sn-site-007)) and runs a sanitiser over the feed serialisation as a second layer. Feeds are static files emitted at build. Keep the blog on the content origin ([SN-SITE-013](website.md#sn-site-013)), never the app origin. The tags taxonomy is closed (`release`, `engineering`, `privacy`, `design`, `education`) and validated by the collection schema so tag pages cannot be created by typo.

#### Security & privacy
Threats: a blog is the classic entry point for stored XSS through rich content and for third-party embeds that resurrect tracking (CWE-79, OWASP-A03, ASVS-V5, MASVS-PRIVACY-1); feed readers render HTML in other people's contexts, so unsanitised feed content attacks subscribers (CWE-79); remote images act as read receipts and leak IP addresses (MASVS-PRIVACY-1, CWE-1104); premature detail in a security release note becomes an exploit recipe (`docs/security/ssdlc-process.md` §3). Controls: build-time-only rendering with raw HTML disabled plus feed sanitisation, a build gate rejecting any absolute external image or `<script>`/`<iframe>`/`on*` attribute, no comments or forms, and a security-note review step by the Security Owner before a version page publishes.

#### UX notes
Use the shared shell and Paper palette ([SN-SITE-002](website.md#sn-site-002)) with the editorial typography scale from `docs/design/tokens.json` (`typeScale`), long-form measure capped around 70 characters. Voice follows `docs/design/README.md` §5 — plain and specific, no exclamation marks, numbers explained. States: empty blog (before the first post, `/blog` explains the feeds instead of showing an empty list), tag with no posts (404 to the tag index), and feed-only content. Changelog entries collapse long lists per surface with a native `<details>` disclosure that is open by default for the newest release, keyboard operable with no JavaScript. Reading at 200% zoom and with text-spacing overrides must not clip code or tables (WCAG 1.4.10/1.4.12).

#### Test plan
- `website/test/changelog_sync_test.mjs` — every tagged version appears once, ordering is SemVer-correct, no orphan page.
- `website/test/feeds_test.mjs` — RSS/Atom/JSON validate, absolute URLs, content type, alternate links present, drafts excluded.
- `website/test/content_sanitiser_test.mjs` — script/iframe/on* attributes and remote images are rejected at build in pages and feeds.
- `website/test/a11y_blog_test.mjs` — axe-core on a post and the changelog index; `<time datetime>` present.
- Manual: subscribe in a feed reader; confirm a security entry links to the advisory without exploit detail.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-FND-022](devx.md#sn-fnd-022); release content originates from [SN-REL-001](release.md#sn-rel-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Changelog generation verified against the tagged releases
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-010

<a id="sn-site-010"></a>

**Publish the security page and serve security.txt from the website**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, security |
| Size | S |
| SDLC | release |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-SEC-036](security.md#sn-sec-036) |
| Security controls | `ASVS-V14`, `OWASP-A05`, `OWASP-A09`, `CWE-1059`, `MASVS-CODE-4`, `SSDF-RV.1` |
| Extra labels | agent-ready |

#### Context
[SN-SEC-036](security.md#sn-sec-036) stands up the vulnerability-disclosure programme: SECURITY.md scope and SLA, the PGP key, GitHub private advisory intake, and the RFC 9116 `security.txt` fields. It explicitly leaves the site build out of its scope. This issue is the publishing half — the routes, headers, human-readable page and expiry monitoring that make the programme findable by the researchers who look for exactly two things: `/.well-known/security.txt` and a `/security` page. `docs/security/ssdlc-process.md` §3 sets the commitments (acknowledge ≤ 48 h, triage ≤ 7 days, fix Critical ≤ 30 days, credit reporters) and `docs/security/devsecops-pipeline.md` §7 ties disclosure into the response process.

A `security.txt` with a lapsed `Expires` field is worse than none — RFC 9116 requires consumers to treat it as invalid — so expiry monitoring is part of the deliverable, not an afterthought.

#### Scope
**In:** serving `/.well-known/security.txt` as `text/plain; charset=utf-8` with the fields authored in [SN-SEC-036](security.md#sn-sec-036) (Contact, Encryption, Policy, Acknowledgments, Preferred-Languages, Canonical, Expires) and the detached signature `security.txt.sig` if the maintainer supplies one; serving the PGP public key at `/pgp.txt`; the human-readable `/security` page (what is in scope, what is out, the SLA, safe-harbour statement, crediting, how to report, links to published advisories); footer links from every page; a build-time check plus a scheduled CI check on `Expires`; a `/security/advisories` index linking GitHub advisories.
**Out:** the programme, policy text, PGP key generation and advisory intake ([SN-SEC-036](security.md#sn-sec-036)); incident response ([SN-SEC-001](security.md#sn-sec-001)); the privacy promise page ([SN-SITE-006](website.md#sn-site-006)); paid bounty economics.

#### Acceptance criteria
- [ ] `https://<site>/.well-known/security.txt` returns 200 with `Content-Type: text/plain; charset=utf-8`, parses as RFC 9116, and every field resolves (Policy → `/security`, Encryption → `/pgp.txt`, Canonical → its own URL).
- [ ] The build fails if `Expires` is absent, unparseable, in the past, or less than 30 days away; a scheduled weekly CI job opens a p1 issue 30 days before expiry.
- [ ] `/pgp.txt` serves the ASCII-armoured public key as `text/plain` and its fingerprint is printed on `/security` for out-of-band verification.
- [ ] `/security` states scope (the apps, the site, the optional relay and entitlements services), explicit out-of-scope items (social engineering, physical attacks, volumetric DoS, findings only reachable on a rooted or jailbroken device against the local user's own data), the SLA numbers from `docs/security/ssdlc-process.md` §3, safe-harbour wording, and the crediting policy.
- [ ] `/security` links the GitHub private advisory intake and SECURITY.md, and explains that no note content can be recovered by the team by design (a frequent report theme in zero-knowledge products).
- [ ] Both routes are linked from the site footer and are excluded from any redirect or trailing-slash rewrite that would break the well-known path.
- [ ] The page ships zero JavaScript, sets no cookie, and contains no contact form (reporting goes to the documented channels).
- [ ] Content passes axe-core and reads correctly at 320 px and 200% zoom.

#### Technical notes
Put the source in `website/src/content/security/security-txt.mjs` so the file is generated with a computed `Expires` (issue date + 365 days) rather than hand-edited, and emit it to `dist/.well-known/security.txt` — verify the static host does not strip dot-directories ([SN-SITE-013](website.md#sn-site-013)); if it does, add an explicit route mapping and assert it in the post-deploy check. The expiry gate lives in `tools/scripts/check_security_txt.mjs`, used both by the build and by a scheduled workflow. Keep the advisory index generated from the GitHub advisories API at build time with the response cached into the repo so the site build stays network-independent and reproducible ([SN-SITE-002](website.md#sn-site-002)). Supports SSDF RV.1 (receiving vulnerability reports) and the DevSecOps response process.

#### Security & privacy
Threats: an expired or malformed `security.txt` silently kills the reporting channel (CWE-1059 insufficient documentation of the intended route, OWASP-A09 logging/monitoring failures at the process level); a contact form would collect reporter PII and become a spam and injection target (MASVS-PRIVACY-1); a wrong PGP fingerprint enables an adversary-in-the-middle on encrypted reports (MASVS-CODE-4); publishing exploit detail before the fix ships harms users (`docs/security/ssdlc-process.md` §3); a stale scope statement invites out-of-scope noise that delays real reports (ASVS-V14). Controls: generated fields with an automated expiry gate, fingerprint published in two places (site and repo SECURITY.md) for cross-checking, no forms, advisories published only after the fix release, and Security Owner review of the page content before each change.

#### UX notes
Researcher-facing, so density over decoration: a short intro, then the report path in three numbered steps, then the SLA table, then scope and out-of-scope lists, then crediting. Same shell, Paper palette, light and dark ([SN-SITE-002](website.md#sn-site-002)). The PGP fingerprint renders in a monospace block with an explicit text alternative and is selectable without JavaScript. Copy follows the project voice (plain, no exclamation marks) and avoids legal threat language — the safe-harbour paragraph must read as an invitation. Link the privacy page ([SN-SITE-006](website.md#sn-site-006)) for what happens to a reporter's data: the answer is “email only, retained for the life of the report”.

#### Test plan
- `tools/scripts/__tests__/check_security_txt_test.mjs` — RFC 9116 parsing, expiry rules, required-field coverage.
- `website/test/security_routes_test.mjs` — `/.well-known/security.txt` and `/pgp.txt` exist in `dist/` with correct content types and are excluded from rewrites.
- `website/test/security_page_content_test.mjs` — SLA numbers match `docs/security/ssdlc-process.md` §3; scope lists present; no form element.
- Post-deploy synthetic check asserting both routes return 200 with the right content type.
- Manual: fetch `security.txt` with a standard parser; verify the PGP key imports and matches the printed fingerprint.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-SEC-036](security.md#sn-sec-036) (fields, policy, key and intake); serving relies on [SN-SITE-013](website.md#sn-site-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Security Owner (CODEOWNERS) reviewed the page and the published fields
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-011

<a id="sn-site-011"></a>

**Add SEO metadata, sitemap, robots and build-time Open Graph images**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website |
| Size | S |
| SDLC | implementation |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-SITE-003](website.md#sn-site-003) |
| Security controls | `MASVS-PRIVACY-1`, `OWASP-A05`, `CWE-200`, `CWE-601` |
| Extra labels | agent-ready, good first issue |

#### Context
Organic search and link previews are the only distribution this product has that does not involve paying an ad network — and an ad network is off the table, since PRD-CO-415 and locked decision 8 forbid the tracking that comes with it. That makes correct, boring SEO hygiene disproportionately valuable: unique titles and descriptions, canonical URLs, a sitemap, honest structured data, and link-preview images that render without calling a third-party image service. PRD-CO-410 requires the marketing pages to pass Lighthouse budgets, and the Lighthouse SEO category is part of the gate defined in [SN-SITE-012](website.md#sn-site-012).

The constraint that shapes the work: every commonly-used solution here (hosted OG image generators, tag managers, social pixels, third-party schema widgets) is a third-party origin, so all of it must be produced at build time from local assets.

#### Scope
**In:** a `<SeoHead>` component consumed by every route (title, meta description, canonical, `og:*`, `twitter:card`, `theme-color`, `lang`); a per-page metadata schema enforced at build; `sitemap.xml` with `lastmod` from git; `robots.txt` (allow production, disallow previews, point at the sitemap); JSON-LD for `SoftwareApplication` and `Organization` with honest fields only; build-time Open Graph image generation from the design tokens into `public/og/`; a branded 404 page; a redirect map for renamed routes.
**Out:** localisation `hreflang` wiring beyond the hook ([SN-SITE-015](website.md#sn-site-015)), performance budgets ([SN-SITE-012](website.md#sn-site-012)), hosting-level header rules ([SN-SITE-013](website.md#sn-site-013)), and anything that ships a runtime script.

#### Acceptance criteria
- [ ] Every route has a unique `<title>` (≤ 60 characters) and meta description (≤ 155 characters); duplicates or missing values fail the build.
- [ ] Every page emits a self-referencing canonical URL on the production origin; preview deployments emit `noindex, nofollow` and a canonical to production.
- [ ] `sitemap.xml` lists every indexable route with a git-derived `lastmod`, excludes drafts, previews and `/.well-known/*`, and is referenced from `robots.txt`.
- [ ] JSON-LD validates and contains no invented claim — no `aggregateRating`, no `review`, no fabricated award; `offers` (if present) matches `plans.json` from [SN-SITE-005](website.md#sn-site-005).
- [ ] Open Graph images are generated at build from token colours and the wordmark into 1200×630 PNG/WebP, served from the site origin, with no remote font or image fetch at build or runtime.
- [ ] A link preview renders correctly when a page URL is pasted into a chat client (verified manually for one Apple, one Google and one Meta-family renderer) with alt-equivalent text in `og:image:alt`.
- [ ] The 404 page is branded, links to the docs index and search, and leaks no server, path or stack detail (CWE-200).
- [ ] Redirects come from a static map with absolute internal targets only; no redirect target is ever read from a query parameter (CWE-601).
- [ ] No tag manager, no social pixel, no verification script that executes; search-console verification uses a DNS record or a static file, never an inline script.

#### Technical notes
Generate OG images with a local renderer (satori/resvg-class library or a headless render of a token-styled HTML template) inside `tools/scripts/gen_og_images.mjs`, fed by the same `tokens.css` generator as the rest of the site ([SN-SITE-002](website.md#sn-site-002)), and cache the output in `public/og/` keyed by a content hash so builds stay reproducible. `lastmod` comes from `git log -1 --format=%cI <file>` at build; when git metadata is unavailable (shallow CI clone), fall back to the build date and record that in the sitemap generator output. Canonical origin is the single build constant shared with [SN-SITE-008](website.md#sn-site-008). Implements the discoverability half of PRD-CO-410.

#### Security & privacy
Threats: search-console and social verification traditionally arrive as third-party scripts, which would break the analytics-free promise (MASVS-PRIVACY-1, PRD-CO-415); hosted OG image services receive the URL of every share and act as a beacon (MASVS-PRIVACY-1); an open redirect via a parameterised redirect handler (CWE-601, OWASP-A05); a verbose 404 or directory listing exposing build paths (CWE-200); structured data that misrepresents the product invites both search penalties and consumer-protection exposure. Controls: DNS or static-file verification only, local OG generation, static redirect map with allow-listed internal targets, a plain 404 with no diagnostics, and honest JSON-LD reviewed against the pricing and privacy pages.

#### UX notes
Link previews are a brand surface: the OG template uses the Paper palette tokens, the wordmark per `docs/design/design-system.md` §1, and the page title in the display face, with the mascot only through the shared `SageMark` component (never the watermarked placeholder, `docs/design/README.md` §6). The 404 page keeps the project voice — plain and helpful, no exclamation marks — and offers three routes out (home, docs search, changelog). Titles read as sentences, not keyword strings. All metadata text is localisable later without a template change ([SN-SITE-015](website.md#sn-site-015)).

#### Test plan
- `website/test/seo_metadata_test.mjs` — uniqueness, length limits, canonical correctness, preview `noindex`.
- `website/test/sitemap_robots_test.mjs` — route coverage, exclusions, `lastmod` format, robots directives per environment.
- `website/test/jsonld_test.mjs` — schema validation and a forbidden-field list (ratings, reviews).
- `website/test/og_images_test.mjs` — every route resolves an OG image, dimensions correct, generated locally, hash-stable across two builds.
- Manual: paste three page URLs into chat clients and inspect the previews; verify the 404 in production.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-SITE-003](website.md#sn-site-003); canonical origin shared with [SN-SITE-008](website.md#sn-site-008) and enforced by [SN-SITE-013](website.md#sn-site-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Structured data checked against the pricing and privacy pages for accuracy
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-012

<a id="sn-site-012"></a>

**Enforce website performance and Lighthouse budgets in CI**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, perf, ci-cd |
| Size | M |
| SDLC | verification |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-SITE-003](website.md#sn-site-003) |
| Security controls | `OWASP-A05`, `OWASP-A06`, `CWE-400`, `MASVS-PRIVACY-1`, `SSDF-PW.7` |
| Extra labels | agent-ready |

#### Context
PRD-CO-410 requires the marketing pages to “pass Lighthouse a11y/perf budgets”, but no numbers are written down anywhere: `docs/platform/performance-budgets.md` covers the **app** (B1–B10: pen-to-pixel latency, frame rate, cold start, memory, battery) and says nothing about the marketing site. This issue therefore defines the site budgets and makes them a CI gate, in the same spirit as the app's budgets — a regression fails the PR rather than being discovered later. The choice is justified by the audience: the primary persona writes on a mid-range Android tablet over unreliable campus wifi (`docs/product/vision-and-principles.md` §3.1), so a heavy marketing page is a credibility failure for a product whose headline claim is that it is fast.

The budgets also protect the privacy posture indirectly: a page that cannot afford third-party scripts will not acquire them.

#### Scope
**In:** `website/lighthouse-budgets.json` and the CI job that builds the site, serves `dist/` locally and runs Lighthouse CI against the key routes (`/`, `/pricing`, `/privacy`, `/docs`, a docs leaf, `/try`, `/changelog`); byte budgets computed from `dist/` per route; an HTML validation and internal link check in the same job; a budget report comment on the PR; documentation of the budgets in `website/README.md`.
**Out:** the app's performance harness ([SN-PERF-002](perf.md#sn-perf-002), [SN-PERF-003](perf.md#sn-perf-003)) and its B1–B10 budgets; hosting-level compression and caching ([SN-SITE-013](website.md#sn-site-013)); accessibility rules beyond the Lighthouse category ([SN-SITE-015](website.md#sn-site-015) owns the deep a11y gate).

#### Acceptance criteria
- [ ] Budgets defined and enforced, measured with Lighthouse mobile emulation (Moto-G-class CPU throttle, simulated slow 4G): **LCP ≤ 1.8 s**, **CLS ≤ 0.05**, **TBT ≤ 100 ms**, **INP proxy ≤ 200 ms**, performance score ≥ 95, accessibility 100, best-practices 100, SEO ≥ 95.
- [ ] Byte budgets per route: total transferred ≤ 250 KB, HTML ≤ 50 KB, CSS ≤ 40 KB, fonts ≤ 60 KB, images ≤ 120 KB — all gzipped/Brotli-equivalent; JavaScript ≤ 0 KB on content routes and ≤ 15 KB on the one route carrying the looks demo ([SN-SITE-004](website.md#sn-site-004)).
- [ ] A PR that exceeds any budget fails the `website` workflow with a diff showing which route and which resource grew.
- [ ] The job runs on every PR touching `website/` and nightly on `main`; nightly regressions open an issue.
- [ ] The docs search index ([SN-SITE-007](website.md#sn-site-007)) is measured separately and is excluded from the page byte budget but has its own ≤ 300 KB lazy-loaded cap.
- [ ] Third-party request count on every measured route is **0**; a non-zero count fails the job (shared assertion with [SN-SITE-014](website.md#sn-site-014)).
- [ ] Measurements are reproducible: pinned Lighthouse version, fixed throttling settings, three runs with the median reported.
- [ ] `website/README.md` documents each budget, why it exists, and how to re-measure locally.

#### Technical notes
Run Lighthouse CI against a locally served `dist/` rather than a deployed preview so the job is hermetic and does not depend on CDN warm-up; separately, the post-deploy synthetic check in [SN-SITE-013](website.md#sn-site-013) verifies real-world compression and caching. Compute byte budgets from the built files with `tools/scripts/site_budget_report.mjs`, pre-compressing with Brotli at the same quality the host uses so the numbers match reality. Pin the Lighthouse action to a full commit SHA (`docs/security/devsecops-pipeline.md`). Keep the fonts budget honest by subsetting to the Latin ranges the site actually uses, with the Devanagari subset loaded only on Hindi pages once [SN-SITE-015](website.md#sn-site-015) lands. Supports PRD-CO-410 and SSDF PW.7 (automated verification in the pipeline).

#### Security & privacy
Mostly a quality gate, with three security-relevant effects. Threats: an unbounded page weight is a denial-of-quality for low-bandwidth users and can be exploited by a large generated asset (CWE-400); third-party resources arriving unnoticed through a dependency update would break the privacy promise (OWASP-A06, MASVS-PRIVACY-1); a CI job that fetches remote pages could be tricked into scanning an attacker-chosen origin (keep the target list static, OWASP-A05). Controls: static route list, hermetic local serving, zero-third-party assertion in the same job, pinned actions and no secrets in the workflow. Baseline: the job logs URLs and timings only — never page content, never visitor data (there is none).

#### UX notes
The budgets exist to protect a felt experience, so tie them to what a user notices: the hero renders and is readable before the fonts settle (`font-display: swap`, no invisible text), nothing shifts under the cursor or thumb after load (CLS), and the looks demo stays interactive within the TBT budget on a mid-range phone ([SN-SITE-004](website.md#sn-site-004)). Images carry explicit dimensions to prevent shift; the LCP image is preloaded and never lazy-loaded. When a budget forces a trade-off, the rule from `docs/product/vision-and-principles.md` Principle 8 applies: delight never buys latency.

#### Test plan
- `website/test/budget_report_test.mjs` — the byte-budget calculator against fixture builds (pass and fail cases).
- CI job `website-perf` — Lighthouse CI with `lighthouse-budgets.json`, three runs median, on the seven listed routes.
- `website/test/no_third_party_request_test.mjs` — shared assertion with [SN-SITE-014](website.md#sn-site-014).
- `website/test/html_validity_test.mjs` — HTML validation across `dist/`.
- Manual: run the budgets locally on a throttled profile and compare with the CI report.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-SITE-003](website.md#sn-site-003); interacts with [SN-SITE-004](website.md#sn-site-004), [SN-SITE-007](website.md#sn-site-007) and [SN-SITE-013](website.md#sn-site-013).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Budgets and their rationale documented in `website/README.md`
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-013

<a id="sn-site-013"></a>

**Provision website hosting on a content origin with hardened headers**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, ci-cd, security |
| Size | M |
| SDLC | release |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-WEB-017](ci-cd.md#sn-web-017) |
| Security controls | `MASVS-NETWORK-1`, `MASVS-PRIVACY-3`, `ASVS-V13`, `ASVS-V14`, `OWASP-A05`, `CWE-319`, `CWE-1021`, `CWE-798`, `SSDF-PO.5` |
| Extra labels | needs-credentials, needs-decision |

#### Context
The marketing and docs content **must not** share an origin with the Flutter PWA. The app origin is cross-origin isolated with COOP/COEP, hosts the OPFS-backed notes database and runs under a strict nonce CSP ([ADR-0010](docs/adr/0010-web-pwa-strategy.md) decision 2, `docs/platform/web.md` §8–§9, [SN-WEB-017](ci-cd.md#sn-web-017)); putting editable marketing content, a docs search index and blog Markdown into that same script and storage context would place unaudited content next to user data. So the site gets its own origin with its own, differently-shaped hardening: a content site needs `frame-ancestors 'none'`, a tight CSP with no scripts beyond its own island, privacy-preserving referrer and permissions policies, and caching rules that never strand a visitor on a stale page.

This is the deployment half of the site epic and is deliberately **not** agent-ready: the host/CDN vendor and the domain layout are maintainer decisions, and DNS/CDN/OIDC credentials must never be committed (CLAUDE.md §7 rule 2, §13).

#### Scope
**In:** hosting configuration as code under `website/infra/`; the content origin (for example `www.sane.<tld>` with docs under `/docs`) distinct from the app origin; TLS 1.3 with 1.2 minimum and HSTS; the response-header set generated from `website/headers.json`; CSP for a static site; cache-control policy (immutable for hashed assets, short/revalidated for HTML, correct types for feeds, `.well-known` and OG images); Brotli and gzip negotiation; atomic deploy with one-command rollback from CI using short-lived OIDC credentials; PR preview deployments that are `noindex` and robots-denied; a post-deploy synthetic header check; access-log minimisation documented on the privacy page.
**Out:** the app origin and its COOP/COEP isolation ([SN-WEB-017](ci-cd.md#sn-web-017)); the CSP of the app ([SN-SEC-016](security.md#sn-sec-016), [SN-SEC-017](security.md#sn-sec-017)); site content; store/app release engineering ([SN-REL-001](release.md#sn-rel-001)).

#### Acceptance criteria
- [ ] The site is served from an origin that hosts no application code and no user data, documented in an origin map alongside the app origin from [SN-WEB-017](ci-cd.md#sn-web-017).
- [ ] TLS 1.3 (1.2 floor), HTTP redirects to HTTPS, HSTS with a long max-age and `includeSubDomains`, preload readiness recorded (CWE-319).
- [ ] Every response carries: `Content-Security-Policy` with `default-src 'none'; script-src 'self'; style-src 'self' <hashes>; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`, plus `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, and a `Permissions-Policy` denying camera, microphone, geolocation, USB, serial, payment and interest-cohort.
- [ ] A post-deploy synthetic check (`tools/scripts/site_post_deploy_check.mjs`) asserts every header, the TLS version, compression and cache-control, and **fails the deploy** on a missing or weakened value.
- [ ] Hashed assets are `immutable, max-age=31536000`; HTML and feeds are `no-cache` (revalidated) so a publish is visible immediately; `/.well-known/security.txt` is served as `text/plain` and is not rewritten ([SN-SITE-010](website.md#sn-site-010)).
- [ ] Brotli is negotiated and the measured transfer sizes match [SN-SITE-012](website.md#sn-site-012)'s budgets within tolerance.
- [ ] Deploys are atomic with a one-command rollback; the deployed commit SHA is retrievable from a static build-info file containing no secrets.
- [ ] CI deploys with short-lived OIDC credentials — no long-lived token in any workflow file or repository secret used at build time (CWE-798).
- [ ] PR previews are on a separate hostname, `noindex`, robots-denied, and never receive production DNS.
- [ ] Access logs are configured to drop query strings and fragments, truncate IP addresses where the vendor allows, and retain for the shortest feasible period; the retention posture is stated on [SN-SITE-006](website.md#sn-site-006).

#### Technical notes
Generate vendor config from `website/headers.json` with `tools/scripts/gen_site_headers.mjs` so the specification and the edge cannot drift — the same pattern [SN-WEB-016](security.md#sn-web-016) uses for the app. Because the site ships no inline scripts, the CSP needs no nonce and therefore no edge function: a purely static host is acceptable here, which is a deliberate difference from the app origin. **needs-decision:** the host/CDN vendor and the domain layout (apex versus `www`, docs on a path versus a subdomain — a subdomain would need its own header set and its own entry in the origin map). **needs-credentials:** DNS control, the CDN account, and the CI OIDC trust relationship, supplied by the maintainer and never committed. Pin every action to a commit SHA (`docs/security/devsecops-pipeline.md`).

#### Security & privacy
Threats: an origin shared with the app would expose the notes database context to marketing content (CWE-1021, ASVS-V13); default host settings leave directory listings, missing headers and sniffable content types (OWASP-A05, ASVS-V14); CDN access logs are a visitor-tracking surface even without analytics (MASVS-PRIVACY-3); cleartext or downgraded transport (CWE-319, MASVS-NETWORK-1); a long-lived deploy token in CI (CWE-798); a cached stale HTML page keeping a corrected privacy or security statement out of sight. Controls: dedicated origin, deny-by-default CSP with `form-action 'none'` (the site has no forms), `no-referrer` so outbound clicks leak nothing, permissions denied wholesale, log minimisation documented publicly, OIDC short-lived credentials, and SBOM/provenance attached per [SN-CI-004](ci-cd.md#sn-ci-004) (SSDF PO.5).

#### UX notes
Infrastructure with two visible consequences: first-paint speed (the budgets in [SN-SITE-012](website.md#sn-site-012) assume Brotli and immutable asset caching) and correctness of the error pages. The host-level 404/5xx pages must be branded, token-styled, readable in light and dark at ≥ 4.5:1 contrast, and must leak no server or path detail (CWE-200); they link home, to docs search and to the status of the deploy only in generic terms. A deploy must never leave a visitor on a half-updated page — HTML is revalidated, assets are content-hashed.

#### Test plan
- `tools/scripts/__tests__/gen_site_headers_test.mjs` — generation and drift detection against `website/headers.json`.
- `tools/scripts/__tests__/site_post_deploy_check_test.mjs` — the checker's pass/fail logic against fixture responses.
- Post-deploy synthetic run against the preview URL in the same workflow, blocking promotion on failure.
- `website/test/csp_no_inline_test.mjs` — built output contains no unhashed inline script or style.
- Manual: rollback drill; verify `.well-known` is served untouched; confirm preview robots and `noindex`.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-WEB-017](ci-cd.md#sn-web-017) (origin map consistency); blocks [SN-SITE-010](website.md#sn-site-010) and the enforcement half of [SN-SITE-014](website.md#sn-site-014).

#### Definition of done
- [ ] Infrastructure-as-code + checks merged, CI green (lint, analyze, unit, security scans)
- [ ] Vendor decision, domain map and log-retention posture recorded in `website/README.md` and on the privacy page
- [ ] Reviewed against docs/security/secure-coding-checklist.md with CODEOWNERS security review

---

### SN-SITE-014

<a id="sn-site-014"></a>

**Keep the website analytics-free and third-party-free by default**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | security |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, privacy, telemetry |
| Size | S |
| SDLC | verification |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-002](website.md#sn-site-002), [SN-SITE-013](website.md#sn-site-013) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PRIVACY-4`, `MASVS-CODE-3`, `OWASP-A06`, `OWASP-A08`, `CWE-1104`, `CWE-359`, `ASVS-V14` |
| Extra labels | agent-ready, innovation |

#### Context
Locked decision 8 and `docs/product/vision-and-principles.md` Principle 2 forbid linking an analytics SDK and require telemetry to be opt-in; PRD-CO-415 extends that to the site: the trial and site must not send note content to any Sane server and “analytics on the marketing site are privacy-preserving and consented per GDPR/India DPDP”. The strongest version of that promise — and the one this project can actually defend — is **no measurement at all by default and no third-party origin anywhere on the site**, which is also what makes the consent banner unnecessary. The privacy page ([SN-SITE-006](website.md#sn-site-006)) states this publicly, so it needs a mechanical guarantee behind it rather than a policy and good intentions.

This is p0 because a single merged dependency or a well-meaning embed silently converts the product's central trust claim into a false statement, and because the failure is invisible without a test.

#### Scope
**In:** an executable guarantee — a crawler over the built site that loads every route in a headless browser and asserts zero requests to any origin other than the site origin, zero cookies, zero `localStorage`/`sessionStorage`/IndexedDB writes except the one documented look preference from [SN-SITE-004](website.md#sn-site-004), and no beacon on unload; a static scan of `dist/` and of the dependency tree for known tracker hosts and SDK names; a documented exception process (what would have to be true for any measurement to be added, and the consent design it would require); the wording on the privacy page that this test backs.
**Out:** the app's opt-in telemetry ([SN-TEL-001](telemetry.md#sn-tel-001), [ADR-0011](docs/adr/0011-telemetry-and-diagnostics.md)); server-side access logs, which are minimised and documented by [SN-SITE-013](website.md#sn-site-013); the app origin ([SN-WEB-017](ci-cd.md#sn-web-017)).

#### Acceptance criteria
- [ ] `website/test/e2e/no_third_party_test.mjs` loads every route from `dist/` in a headless browser with request interception and fails on any request whose origin is not the site origin (including fonts, images, scripts, XHR, beacons and prefetches).
- [ ] The same test asserts `document.cookie` is empty after load and interaction, and that storage writes are limited to the single allow-listed key `sane-site-look`.
- [ ] `sendBeacon`, `navigator.sendBeacon` usage and `visibilitychange`/`unload` network calls are asserted absent.
- [ ] A static scan fails the build on any occurrence of a known tracker host or SDK name (Google Analytics/gtag/GTM, Segment, Meta pixel, Hotjar, FullStory, Mixpanel, Plausible, Fathom, Cloudflare Insights, Sentry browser SDK, Intercom, Crisp) in `dist/` or in `package.json` and its lockfile.
- [ ] No `<iframe>`, no embedded video player, no social widget, no web font from a third-party origin exists in the output.
- [ ] There is **no consent banner**, and the privacy page explains why one is unnecessary — no cookies, no tracking, no personal data processed by the site (GDPR Art. 6/ePrivacy analysis recorded in the PR; India DPDP notice covered by the privacy page).
- [ ] The test runs on every PR touching `website/` and nightly on `main`; a failure is release-blocking.
- [ ] `website/README.md` documents the exception process: any future measurement must be self-hosted, aggregate-only, cookieless, consented where required, documented on the privacy page, and approved by the Security Owner — with no exception permitted for the app origin.

#### Technical notes
Implement the crawler with a pinned headless-browser driver in CI, routing all requests through an interceptor that allow-lists exactly one origin (the local static server) and records everything else with the initiating route for the failure message. Run it against `dist/` served locally so it is hermetic ([SN-SITE-012](website.md#sn-site-012) shares the harness). The dependency scan reads the lockfile rather than `node_modules` so it catches transitive additions (MASVS-CODE-3, OWASP-A08). Pair it with the existing pipeline gates — OSV-Scanner, dependency-review and gitleaks already run per `docs/security/devsecops-pipeline.md`; this adds the behavioural assertion they cannot make. Implements PRD-CO-415 for the site and supports the claims file in [SN-SITE-006](website.md#sn-site-006).

#### Security & privacy
Threats: supply-chain injection of a tracker or exfil script through a transitive build dependency (OWASP-A08, CWE-1104, MASVS-CODE-3); a marketing request to “just add one pixel” (MASVS-PRIVACY-1/4); third-party fonts and embeds leaking visitor IPs to a US ad network, which is a GDPR transfer problem as well as a promise violation (CWE-359, MASVS-PRIVACY-2); a false public claim of being analytics-free, which is itself a compliance exposure (ASVS-V14). Controls: the behavioural test above as a release-blocking gate, lockfile scanning, CSP `connect-src 'self'` and `default-src 'none'` from [SN-SITE-013](website.md#sn-site-013) as defence in depth, self-hosted fonts from [SN-SITE-002](website.md#sn-site-002), and a written exception process with Security Owner approval. Baseline holds throughout: no content is logged, no identifiers are created, only aggregate build-time metrics exist.

#### UX notes
The visible result is an absence: no cookie banner, no consent modal, no “we value your privacy” interstitial — which is itself a differentiating first impression for a privacy-first product. The privacy page ([SN-SITE-006](website.md#sn-site-006)) carries one short section explaining what the site does and does not do, in the project voice (plain, specific, no exclamation marks). The single stored preference (chosen look) is disclosed there and is clearable by the visitor's browser controls; if storage is unavailable the site still works (try/catch per CLAUDE.md's browser-storage rule).

#### Test plan
- `website/test/e2e/no_third_party_test.mjs` — request interception across all routes, cookie and storage assertions, beacon absence.
- `website/test/tracker_scan_test.mjs` — static scan of `dist/`, `package.json` and the lockfile against the tracker list.
- `website/test/no_embeds_test.mjs` — no iframe, object, embed or remote font reference in the output.
- CI wiring: both tests run in the `website` workflow on PR and nightly; failure blocks merge and release.
- Manual: load the site with a request-logging proxy and confirm a single origin appears.

#### Dependencies
[SN-SITE-002](website.md#sn-site-002), [SN-SITE-013](website.md#sn-site-013); backs the public claims in [SN-SITE-006](website.md#sn-site-006).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Exception process documented and approved by the Security Owner (CODEOWNERS)
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-SITE-015

<a id="sn-site-015"></a>

**Make the website WCAG 2.2 AA accessible and localisation-ready**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | website, a11y, i18n |
| Size | M |
| SDLC | verification |
| Parent | [SN-SITE-001](website.md#sn-site-001) |
| Depends on | [SN-SITE-003](website.md#sn-site-003), [SN-SITE-007](website.md#sn-site-007) |
| Security controls | `MASVS-PRIVACY-1`, `ASVS-V14`, `CWE-1021`, `OWASP-A05` |
| Extra labels | agent-ready |

#### Context
Accessibility is a locked decision (CLAUDE.md §2 item 10) and a product moat: `docs/product/vision-and-principles.md` §3.5 makes an accessibility-first learner a load-bearing persona, and PRD-CO-417 holds the web experience to the same WCAG 2.2 AA bar as the app. A marketing site that fails AA while selling “the first genuinely accessible handwriting app” is a self-refuting artefact, and institutional buyers who read the accessibility statement hosted on this very site will check the site itself first. Localisation is the twin requirement: PRD-CO-370 commits to English first, then Hindi and major Indian languages, and PRD-CO-375 fixes ₹ formatting with lakh grouping — the site must be structured so adding a locale is content work, not a rebuild.

The site's a11y gate is separate from the Lighthouse category in [SN-SITE-012](website.md#sn-site-012) because automated tools catch roughly a third of AA issues; this issue adds the structural rules and the manual screen-reader pass.

#### Scope
**In:** an accessibility pass over the whole site (landing, looks demo, pricing, privacy, docs, try/download, blog/changelog, security page) against the WCAG 2.2 AA criteria PRD-CO-310 … PRD-CO-321 map to; axe-core in CI on every built route with zero critical/serious allowed; a manual NVDA and VoiceOver common-task run; localisation readiness — per-locale content collections, `lang` and `dir` attributes, `hreflang` alternates, CSS logical properties throughout, locale-aware date and currency formatting at build time, a string extraction convention, and a pseudo-locale build check mirroring PRD-CO-376.
**Out:** translating the content (a content task per locale), the app's a11y work ([SN-A11Y-001](a11y.md#sn-a11y-001)) and its conformance report ([SN-A11Y-018](a11y.md#sn-a11y-018), which this site merely hosts), and app localisation ([SN-I18N-001](i18n.md#sn-i18n-001)).

#### Acceptance criteria
- [ ] axe-core reports **zero critical or serious** issues on every route in `dist/`; the check is release-blocking.
- [ ] Keyboard: every interactive element is reachable and operable, focus order matches reading order, a skip link precedes the header, no focus trap exists, and the focus indicator is ≥ 2 px at ≥ 3:1 contrast and never fully obscured (PRD-CO-315, PRD-CO-316).
- [ ] Targets are ≥ 44 px on all controls (the project rule, stricter than WCAG 2.5.8's 24 px) (PRD-CO-320).
- [ ] Contrast ≥ 4.5:1 body and ≥ 3:1 large text, icons and UI components in light and dark, computed from tokens rather than eyeballed (PRD-CO-312).
- [ ] Text resizes to 200% and reflows at 320 CSS px with no two-dimensional scrolling, and text-spacing overrides (1.5× line, 2× paragraph, 0.12× letter, 0.16× word) cause no clipping (PRD-CO-313, PRD-CO-314).
- [ ] All motion is disabled under `prefers-reduced-motion`; nothing flashes more than three times per second (PRD-CO-317).
- [ ] Semantics: one `h1` per page, no skipped heading levels, landmark regions, `<table>` semantics on the pricing matrix, images with accurate alt text, SVG diagrams with `<title>`/`<desc>` and a text equivalent (PRD-CO-310, PRD-CO-321).
- [ ] A scripted common-task run passes with **NVDA on Windows** and **VoiceOver on macOS**: find the pricing, read the privacy promise, start the web trial, find a doc page through search (PRD-CO-331).
- [ ] Localisation readiness: all user-visible strings come from per-locale content files (no English hard-coded in components), every page emits `lang` and `dir`, `hreflang` alternates and `x-default` are generated, layout uses logical properties so an RTL locale mirrors without new CSS, and dates/currency are formatted with `Intl` at build time (PRD-CO-372, PRD-CO-375).
- [ ] A pseudo-locale build (`en-XA` accents with +40% expansion and `en-XB` bidi mirroring) renders with no truncation, overlap or untranslated-string leakage, and runs in CI (PRD-CO-376).

#### Technical notes
Structure content as `website/src/content/<collection>/<locale>/…` with English as the fallback chain, so a missing translation renders English with the correct `lang` attribute on that block rather than an empty page. Generate the pseudo-locale at build from the English strings — no committed pseudo files. Use CSS logical properties (`margin-inline`, `padding-block`, `inset-inline-start`) everywhere from the start; auditing them later is far more expensive. The contrast check reuses the token pairs computed in [SN-SITE-004](website.md#sn-site-004) and the look sheets in `docs/design/accessibility.md`. Keep the accessibility statement page a render of [SN-A11Y-018](a11y.md#sn-a11y-018)'s source so the site and repo never disagree. Implements PRD-CO-410 (Lighthouse a11y), PRD-CO-417, PRD-CO-370/372/375/376 for the site.

#### Security & privacy
Mostly baseline — no content is logged, no identifiers are created, and no token or secret appears in any page. Three specifics: an accessibility overlay widget (the common “one line of JavaScript fixes your a11y” product) is **forbidden** because it is a third-party script and a tracking vector (MASVS-PRIVACY-1, [SN-SITE-014](website.md#sn-site-014)); a published accessibility claim that overstates conformance is a procurement and regulatory exposure, so the statement must match the evidence from [SN-A11Y-018](a11y.md#sn-a11y-018) (ASVS-V14); and focus-visible styling must not be defeated by any embed or framing (`frame-ancestors 'none'`, CWE-1021, OWASP-A05).

#### UX notes
Authority for the rules is `docs/design/accessibility.md` (WCAG mapping, contrast across looks, reduce-motion, left-handed/motor notes) and `docs/design/ux-principles.md` (motion, microcopy, states). Language switching, once locales exist, appears in the footer as a plain list of languages in their own script — never a flag icon. Hindi is the first non-English locale (`docs/product/vision-and-principles.md` §3.1: the primary persona writes English with Hindi mixed in), and the Devanagari font subset loads only on Hindi routes to protect the byte budget ([SN-SITE-012](website.md#sn-site-012)). Empty state for an untranslated page: a short note in the target language explaining the page is available in English, with the link — never a blank page or a machine translation.

#### Test plan
- `website/test/a11y_all_routes_test.mjs` — axe-core across every route in `dist/`, zero critical/serious.
- `website/test/contrast_tokens_test.mjs` — computed contrast for every text/background pair used by the site in light and dark.
- `website/test/keyboard_nav_test.mjs` — focus order, skip link, no traps, focus-indicator presence.
- `website/test/reflow_spacing_test.mjs` — 320 px, 200% zoom and text-spacing overrides produce no overflow or clipping.
- `website/test/i18n_readiness_test.mjs` — no hard-coded English in components, `lang`/`dir`/`hreflang` emitted, `Intl` formatting used, pseudo-locale build clean.
- Manual: NVDA (Firefox and Chrome) and VoiceOver (Safari) common-task scripts recorded in the PR.

#### Dependencies
[SN-SITE-003](website.md#sn-site-003), [SN-SITE-007](website.md#sn-site-007); hosts content from [SN-A11Y-018](a11y.md#sn-a11y-018); budgets shared with [SN-SITE-012](website.md#sn-site-012).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Manual screen-reader run recorded and any gap filed with a remediation date
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

