# Backlog — area: docs

20 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-DOC-001](docs.md#sn-doc-001) **Deliver the documentation system (dev docs, API docs, help centre, upkeep)** (epic · M8 Launch & Growth)
  - [SN-DOC-002](docs.md#sn-doc-002) **Render the machine-readable backlog to docs/backlog in CI** · p2 · task · S · M0 Foundations
  - [SN-DOC-003](docs.md#sn-doc-003) **Add markdown lint and link-integrity checks for docs/ in CI** · p2 · infra · S · M0 Foundations
  - [SN-DOC-004](docs.md#sn-doc-004) **Add the agent-onboarding drift check for CLAUDE.md and AGENTS.md** · p1 · task · M · M0 Foundations
  - [SN-DOC-005](docs.md#sn-doc-005) **Publish the developer documentation site built from docs/** · p2 · feature · L · M8 Launch & Growth
  - [SN-DOC-006](docs.md#sn-doc-006) **Generate the dartdoc API reference in CI and gate public-API docs** · p2 · task · M · M1 Ink Editor Alpha
  - [SN-DOC-007](docs.md#sn-doc-007) **Write the README and public-API overview for each sane_ package** · p2 · docs · M · M1 Ink Editor Alpha
  - [SN-DOC-008](docs.md#sn-doc-008) **Define the help-centre content plan and information architecture** · p2 · docs · M · M8 Launch & Growth
  - [SN-DOC-009](docs.md#sn-doc-009) **Publish the open .sanenote format specification and export guides** · p1 · docs · M · M8 Launch & Growth
  - [SN-DOC-010](docs.md#sn-doc-010) **Implement the in-app offline help centre** · p2 · feature · L · M8 Launch & Growth
  - [SN-DOC-011](docs.md#sn-doc-011) **Implement the What's new and weekly tips surfaces** · p3 · feature · M · M8 Launch & Growth
  - [SN-DOC-012](docs.md#sn-doc-012) **Automate the changelog and store release notes from commits** · p2 · infra · M · M8 Launch & Growth
  - [SN-DOC-013](docs.md#sn-doc-013) **Define the ADR and documentation upkeep cadence with a staleness report** · p3 · chore · S · M7 Beta Hardening & Security Audit
  - [SN-DOC-014](docs.md#sn-doc-014) **Automate help-centre screenshots from golden tests** · p3 · task · M · M8 Launch & Growth
  - [SN-GA11-013](a11y.md#sn-ga11-013) **Caption, transcribe and audio-describe every product video** · p2 · task · M · M8 Launch & Growth
  - [SN-GOPS-006](docs.md#sn-gops-006) **Stand up the user support operation: inbox, SLA and escalation path** · p1 · docs · M · M8 Launch & Growth
  - [SN-GOPS-018](docs.md#sn-gops-018) **Write the user data-recovery support playbook for local-first failures** · p2 · docs · M · M8 Launch & Growth

---

## Issues

### SN-DOC-001

<a id="sn-doc-001"></a>

**Deliver the documentation system (dev docs, API docs, help centre, upkeep)**

| Field | Value |
|---|---|
| GitHub | #469 |
| Type | epic |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | docs, devx, website |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `MASVS-CODE-4`, `MASVS-PLATFORM-2`, `ASVS-V1`, `ASVS-V14`, `OWASP-A05`, `OWASP-A08`, `CWE-540`, `CWE-1059` |
| Extra labels | agent-ready |

#### Context
Sane Notes is a documentation-first, agent-built repo: `CLAUDE.md` promises that "an autonomous coding agent with zero prior context" can read the docs and start work, `CONTRIBUTING.md` §1–§2 routes every contributor through `docs/README.md` → `docs/architecture/overview.md` → the cited PRD/ADR, and `docs/README.md` indexes ~40 documents plus 16 ADRs. That promise decays silently: links rot, `CLAUDE.md` §3's repo map drifts from the real tree, ADRs outlive their decisions, and the machine-readable backlog in `issues/*.json` has no human-readable rendering. On the product side `PRD-CO-411` requires a **docs site** hosting user guides, the published open `.sanenote` spec, import/export guides, the accessibility statement and the privacy/security documentation, and `docs/roadmap.md` M8 lists "support & docs" as a launch deliverable; the design (`docs/design/screens-and-flows.md` §12) already exposes "Replay the welcome tour" and a **Tips** toggle (default off, "One short tip a week, never more") with no help surface behind them.

This epic owns the whole documentation system end to end: the CI pipeline that keeps `docs/` honest (lint, link integrity, onboarding-drift, backlog rendering), the generated API reference for the twelve `sane_*` packages, the published developer docs site, the user help-centre content plan and its in-app offline surface, the published format spec, changelog/release-note automation, and the upkeep cadence that stops all of it going stale. It does **not** own the marketing site ([SN-SITE-001](website.md#sn-site-001)), the privacy policy text ([SN-PRV-001](privacy.md#sn-prv-001)), the onboarding tour itself ([SN-ONB-001](onboarding.md#sn-onb-001)), or the ADR template/index automation ([SN-FND-021](docs.md#sn-fnd-021)).

#### Scope
**In:** the children below.
- [ ] [SN-DOC-002](docs.md#sn-doc-002) Render the machine-readable backlog to docs/backlog in CI
- [ ] [SN-DOC-003](docs.md#sn-doc-003) Add markdown lint and link-integrity checks for docs/ in CI
- [ ] [SN-DOC-004](docs.md#sn-doc-004) Add the agent-onboarding drift check for CLAUDE.md and AGENTS.md
- [ ] [SN-DOC-005](docs.md#sn-doc-005) Publish the developer documentation site built from docs/
- [ ] [SN-DOC-006](docs.md#sn-doc-006) Generate the dartdoc API reference in CI and gate public-API docs
- [ ] [SN-DOC-007](docs.md#sn-doc-007) Write the README and public-API overview for each sane_ package
- [ ] [SN-DOC-008](docs.md#sn-doc-008) Define the help-centre content plan and information architecture
- [ ] [SN-DOC-009](docs.md#sn-doc-009) Publish the open .sanenote format specification and export guides
- [ ] [SN-DOC-010](docs.md#sn-doc-010) Implement the in-app offline help centre
- [ ] [SN-DOC-011](docs.md#sn-doc-011) Implement the What's new and weekly tips surfaces
- [ ] [SN-DOC-012](docs.md#sn-doc-012) Automate the changelog and store release notes from commits
- [ ] [SN-DOC-013](docs.md#sn-doc-013) Define the ADR and documentation upkeep cadence with a staleness report
- [ ] [SN-DOC-014](docs.md#sn-doc-014) Automate help-centre screenshots from golden tests

**Out:** marketing pages and "try on web" ([SN-SITE-001](website.md#sn-site-001), PRD-CO-410/412–417); the privacy dashboard and policy text ([SN-PRV-001](privacy.md#sn-prv-001)); the onboarding overlay ([SN-ONB-001](onboarding.md#sn-onb-001)); store listing copy and upload ([SN-REL-001](release.md#sn-rel-001)); the ADR template/index/link-check automation ([SN-FND-021](docs.md#sn-fnd-021)) and the versioning policy ([SN-FND-022](devx.md#sn-fnd-022)), which this epic consumes.

#### Acceptance criteria
- [ ] Every child is merged; the docs CI job (lint + links + drift + backlog render) is required on PRs touching `docs/**`, `issues/**`, `CLAUDE.md`, `AGENTS.md` or `CONTRIBUTING.md`.
- [ ] A developer can open the published docs site, search it offline, and reach every file under `docs/` plus the dartdoc API reference from the nav.
- [ ] The P0 help set (≈25 articles) ships inside the app and works in airplane mode on the low-end reference device.
- [ ] `CHANGELOG.md`, per-package changelogs and the store "what's new" blurb are generated from Conventional Commits at every tagged release, with embargoed security fixes excluded until their advisory is public.
- [ ] The staleness report runs weekly and no doc cited by `CLAUDE.md` §14 or `docs/README.md` is a dead link.

#### Technical notes
Sources of truth: `docs/README.md` (index), `docs/architecture/overview.md` §4–§5 (repo map + package DAG), `CLAUDE.md` §3/§11/§12/§14, `CONTRIBUTING.md`, `docs/roadmap.md` M8, `PRD-CO-411`. Tooling lives in `scripts/` (Node 22 ESM, the style of `scripts/validate-issues.mjs`) and `tools/scripts/`; CI in `.github/workflows/docs.yml` alongside the existing `devsecops.yml`. In-app help is Flutter code under `app/lib/features/help/` using `sane_ui` components (ADR-0003 for routing/state). Static site generation uses a markdown-native generator so existing GitHub-flavoured markdown and mermaid blocks render unmodified ([SN-DOC-005](docs.md#sn-doc-005)).

#### Security & privacy
Documentation is a publication channel and a trust surface. Threats: publishing a secret or an internal endpoint that landed in a doc or doc comment (CWE-540, CWE-200); a docs site that ships third-party trackers or CDN assets, contradicting the zero-telemetry posture (ADR-0011, MASVS-PRIVACY-1, OWASP-A05); help content rendered in a WebView giving script execution over bundled content (MASVS-PLATFORM-2, CWE-79/CWE-749); a published format spec handing attackers a malformed-input roadmap unless the hardening contract is documented and fuzzed (MASVS-CODE-4, CWE-22/CWE-409/CWE-502); release notes disclosing a vulnerability before the fix ships (CWE-200, `docs/security/ssdlc-process.md` §3); and documentation drift that silently invalidates a security rule (ASVS-V1, CWE-1059). Controls: read-only CI tokens and SHA-pinned actions ([SN-CI-005](ci-cd.md#sn-ci-005), [SN-CI-009](ci-cd.md#sn-ci-009)), gitleaks/trufflehog on the same paths, no analytics anywhere in the docs stack, native markdown rendering in-app, and the upkeep cadence in [SN-DOC-013](docs.md#sn-doc-013).

#### UX notes
All published surfaces use the design tokens in `docs/design/tokens.json` (default **Paper** look) and the voice rules in `docs/design/ux-principles.md` §5; in-app surfaces must render correctly in **all 17 looks + light/dark** and follow `docs/design/accessibility.md` (Semantics labels, 44 pt / 48 dp targets, contrast ≥ 4.5:1, keyboard operability on web, Dynamic Type, reduce-motion). The mascot may only be referenced through the single `SaneSageMark` asset, and the watermarked placeholder art in `design/assets/*.png` is **not releasable** (`CLAUDE.md` §9) — use the wordmark until [SN-BRD-001](brand.md#sn-brd-001) lands. Empty/error/offline states follow `docs/design/ux-principles.md` §4.

#### Test plan
Per child; at epic level: `scripts/test/` node:test suites for every docs script, `app/test/help/**` widget + golden tests, `app/integration_test/help_offline_test.dart`, and a docs CI job that must be green on `docs/**` PRs.

#### Dependencies
[SN-FND-003](ci-cd.md#sn-fnd-003), [SN-FND-015](ci-cd.md#sn-fnd-015), [SN-FND-021](docs.md#sn-fnd-021), [SN-FND-022](devx.md#sn-fnd-022), [SN-QA-005](qa.md#sn-qa-005), [SN-SITE-001](website.md#sn-site-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Every child issue closed or explicitly deferred with a reason in this epic


---

### SN-DOC-002

<a id="sn-doc-002"></a>

**Render the machine-readable backlog to docs/backlog in CI**

| Field | Value |
|---|---|
| GitHub | #520 |
| Type | task |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | docs, devx |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-FND-003](ci-cd.md#sn-fnd-003), [SN-FND-015](ci-cd.md#sn-fnd-015) |
| Security controls | `CWE-540`, `CWE-79`, `CWE-732`, `CWE-829`, `OWASP-A08`, `SSDF-PW.4` |
| Extra labels | agent-ready, good first issue |

#### Context
`CLAUDE.md` §11 states that the backlog is machine-readable JSON in `issues/*.json`, validated by `scripts/validate-issues.mjs`, published by `scripts/publish-issues.mjs`, and **rendered to `docs/backlog/` by `scripts/render-issues.mjs`**. The renderer exists but nothing runs it, so `docs/backlog/` is absent and the only readable view of several hundred issues is GitHub — useless to an offline agent and to anyone reviewing the plan inside a PR diff. `CONTRIBUTING.md` §1 tells contributors to pick work by label, milestone and `agent-ready` state; a rendered, in-repo backlog makes that possible without network access and gives the docs site ([SN-DOC-005](docs.md#sn-doc-005)) a plan section. This issue wires the renderer into CI in check mode so the rendered output can never drift from the JSON source of truth.

#### Scope
**In:** a `--check` mode for `scripts/render-issues.mjs` (regenerate into a temp dir, diff against the committed tree, exit non-zero with the stale paths); a `render-backlog` job in `.github/workflows/docs.yml` triggered on `issues/**` and `scripts/render-issues.mjs`; a generated `docs/backlog/README.md` index grouped by milestone (in `issues/milestones.json` order) and by area with counts and epic → child nesting; one page per area file; a link from `docs/README.md` §Meta.
**Out:** publishing to GitHub (`publish-issues.mjs`, maintainer-run with `gh`), the schema validator itself ([SN-FND-015](ci-cd.md#sn-fnd-015)), the docs site build ([SN-DOC-005](docs.md#sn-doc-005)), and any change to `issues/SCHEMA.md`.

#### Acceptance criteria
- [ ] Running the renderer twice produces byte-identical output (issues sorted by key, stable heading anchors, no timestamps in the output).
- [ ] CI fails when `issues/**` changes without regenerating `docs/backlog/`, and the failure message names each stale file and prints the exact regenerate command.
- [ ] The index lists every milestone in `milestones.json` order with issue counts, plus per-area counts and epic → child nesting; an area with no issues renders "No issues yet" instead of an empty file.
- [ ] Cross-reference tokens (the double-brace `SN-AREA-NNN` syntax defined in `issues/SCHEMA.md`) render as relative in-repo links when the key exists and as plain code spans when it does not, matching the publisher's dangling-reference behaviour.
- [ ] Rendering 600 issues completes in < 10 s on a CI runner and makes zero network requests.
- [ ] Generated markdown passes the lint/link job from [SN-DOC-003](docs.md#sn-doc-003).

#### Technical notes
Work in `scripts/render-issues.mjs` (Node 22, ESM). Reuse the loading and `slugify` conventions of `scripts/validate-issues.mjs` (labels from `issues/labels.json`, milestone titles from `issues/milestones.json`). Add `--check` and `--out <dir>`; keep the default write path `docs/backlog/`. Workflow: `.github/workflows/docs.yml`, `permissions: contents: read` only ([SN-CI-009](ci-cd.md#sn-ci-009)), every action pinned to a full commit SHA ([SN-CI-005](ci-cd.md#sn-ci-005)), Node pinned to 22 per `CONTRIBUTING.md` §2. Emit relative links so the output works both on GitHub and inside the generated site.

#### Security & privacy
`docs/backlog/` is public content derived from files any contributor can edit. Threats and controls: (a) an issue body containing a credential becomes published documentation — gitleaks/trufflehog already gate the same PR path, and the renderer must never copy files outside `issues/` (CWE-540); (b) issue text is untrusted input to a markdown/HTML generator — escape backticks, pipes and raw HTML so a crafted body cannot inject markup into every rendered page (CWE-79); (c) the workflow must run on `pull_request` (never `pull_request_target`) with a read-only `GITHUB_TOKEN` so a fork PR cannot write to the repo (CWE-732, CWE-269); (d) all actions SHA-pinned against tag-move attacks (CWE-829, OWASP-A08, SSDF PW.4). No personal data is processed; issue authorship is not rendered.

#### UX notes
Rendered pages follow the table style of `docs/README.md` and `docs/roadmap.md` so they read consistently in the docs site. No design tokens are involved (markdown only), but accessibility still applies per `docs/design/accessibility.md`: one `#` title per page, hierarchical headings with no skipped levels, tables with header rows, and descriptive link text (never "here"), so the generated site inherits a WCAG 2.2 AA-clean structure.

#### Test plan
- Unit: `scripts/test/render-issues.test.mjs` (node:test) — deterministic output on a fixture set, `--check` exit codes (0 clean / 1 stale), token rewriting for existing vs dangling keys, HTML/pipe escaping of hostile issue text, empty-area handling.
- CI: a dry run against `issues/` fixtures in the `render-backlog` job.
- Manual: edit one issue file, push, confirm CI fails; regenerate, confirm green.

#### Dependencies
[SN-FND-003](ci-cd.md#sn-fnd-003), [SN-FND-015](ci-cd.md#sn-fnd-015).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DOC-003

<a id="sn-doc-003"></a>

**Add markdown lint and link-integrity checks for docs/ in CI**

| Field | Value |
|---|---|
| GitHub | #521 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | docs, ci-cd |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-FND-003](ci-cd.md#sn-fnd-003), [SN-CI-005](ci-cd.md#sn-ci-005) |
| Security controls | `CWE-918`, `CWE-829`, `CWE-732`, `OWASP-A08`, `OWASP-A10`, `SSDF-PW.4` |
| Extra labels | agent-ready, good first issue |

#### Context
The doc set is a dense graph: `docs/README.md` indexes every file, `CLAUDE.md` §14 and `docs/architecture/overview.md` Appendix B are link tables, every ADR cross-links others, and every PRD requirement is cited by ID (`PRD-ED-###`, `PRD-LB-###`, `PRD-CO-###`, `PRD-<AREA>-###`) from issues and architecture docs. The whole agent-onboarding promise in `CLAUDE.md` §1 rests on those links resolving. Nothing checks them today, so a renamed doc or a mistyped requirement ID silently strands a future agent mid-task. This issue adds a fast, deterministic docs CI gate: markdown style lint, internal link and anchor resolution, and citation validation for PRD/ADR IDs.

#### Scope
**In:** a `markdownlint` config (`.markdownlint.jsonc`) tuned to the existing house style (ATX headings, tables, long-line tolerance for tables, no bare-URL rule exceptions where needed); a `docs-lint` job in `.github/workflows/docs.yml` running lint + an internal-link checker over `docs/**`, `*.md` at the repo root, and `issues/*.md`; anchor validation for `file.md#section` links; a citation check (`scripts/check-citations.mjs`) asserting every `PRD-[A-Z]+-\d{3}` referenced in `docs/` or `issues/` exists in one of `docs/product/prd-0{1..4}-*.md` and every `docs/adr/NNNN-*.md` reference resolves to a file; a scheduled weekly external-link job that opens/updates a single tracking issue instead of failing PRs; an allowlist file for hosts that rate-limit.
**Out:** the ADR index/link check that [SN-FND-021](docs.md#sn-fnd-021) owns (this job must not duplicate it — call it from the same workflow instead), prose/grammar linting, and the docs site build ([SN-DOC-005](docs.md#sn-doc-005)).

#### Acceptance criteria
- [ ] Every relative link and heading anchor in `docs/**` and the root markdown files resolves; a broken one fails CI with `file:line` and the offending target.
- [ ] A `PRD-XX-###` citation that does not exist in any PRD fails the citation check and names the citing file and ID.
- [ ] The job runs in < 60 s on a standard runner, makes **no** outbound network requests in PR mode, and is required for merge on paths `docs/**`, `*.md`, `issues/*.md`.
- [ ] The weekly external-link job never fails a PR; it writes a job summary and maintains exactly one tracking issue (updated, not duplicated).
- [ ] Running the checker on the repo as it stands today reports zero internal-link errors after fixes (any pre-existing breakage is fixed in the same PR).
- [ ] `markdownlint` passes on all existing docs with the committed config (rules disabled rather than docs mass-rewritten where the house style deliberately differs).

#### Technical notes
Use `markdownlint-cli2` and `lychee` (or `markdown-link-check`) pinned by version, plus a small local `scripts/check-citations.mjs` (Node 22 ESM, same style as `scripts/validate-issues.mjs`) for PRD/ADR IDs — a local script avoids network for the citation half. Wire into `.github/workflows/docs.yml` next to the backlog render job from [SN-DOC-002](docs.md#sn-doc-002). Actions and container images pinned to full commit SHAs per [SN-CI-005](ci-cd.md#sn-ci-005); `permissions: contents: read` (the weekly job needs `issues: write` only, in a separate job) per [SN-CI-009](ci-cd.md#sn-ci-009). Paths and process context: `CLAUDE.md` §11, `CONTRIBUTING.md` §4, `docs/security/devsecops-pipeline.md` §2.1 for where the job sits in the pipeline.

#### Security & privacy
A link checker is an outbound-request engine driven by untrusted repository content, i.e. a request-forgery primitive inside CI (CWE-918, OWASP-A10). Controls: external checking runs **only** in the scheduled job, never on fork PRs; the resolver refuses non-`http(s)` schemes and private/link-local address ranges; no secrets are exposed to the job environment; request timeout and concurrency caps prevent a crafted doc turning CI into a flooder. All tool images/actions are SHA-pinned (CWE-829, OWASP-A08, SSDF PW.4) and the PR job token is read-only (CWE-732). No personal data is processed. The job also indirectly protects security: it prevents a silent break of the links from `CLAUDE.md` §7 to `docs/security/secure-coding-checklist.md`.

#### UX notes
Developer-experience surface only; the design system is not involved. Failure output is the UX: one line per problem as `path:line: message → target`, grouped by file, with a copy-pasteable local command (`npm run docs:lint`) echoed in the job summary, per the actionable-error principle in `docs/design/ux-principles.md` §4 applied to tooling. Accessibility of the docs themselves is enforced by the structural rules (heading order, descriptive link text) from `docs/design/accessibility.md` §10.

#### Test plan
- Unit: `scripts/test/check-citations.test.mjs` — valid ID, unknown ID, ID inside a code fence (ignored), ADR reference to a missing file.
- Integration: a fixture docs tree with one broken relative link, one broken anchor and one bad PRD ID; assert exit code 1 and the three messages.
- Manual: break a link in `docs/README.md` on a branch, confirm CI red; fix, confirm green.

#### Dependencies
[SN-FND-003](ci-cd.md#sn-fnd-003), [SN-CI-005](ci-cd.md#sn-ci-005).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DOC-004

<a id="sn-doc-004"></a>

**Add the agent-onboarding drift check for CLAUDE.md and AGENTS.md**

| Field | Value |
|---|---|
| GitHub | #522 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | docs, devx |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-FND-003](ci-cd.md#sn-fnd-003), [SN-FND-008](devx.md#sn-fnd-008) |
| Security controls | `ASVS-V1`, `MASVS-CODE-1`, `OWASP-A04`, `CWE-1059`, `SSDF-PO.1`, `SSDF-PW.1` |
| Extra labels | agent-ready, innovation |

#### Context
`CLAUDE.md` is the rulebook an autonomous agent reads before touching anything: §3 is the repo map and package DAG, §7 is the list of security rules that "can NEVER be broken", §12 is the label/milestone taxonomy, §13 is the pending-maintainer-decision list, §14 is the reading table. `AGENTS.md` is its condensed twin for non-Claude agents and `CONTRIBUTING.md` §2 pins the toolchain versions. Every one of these restates facts owned elsewhere — the real directory tree, `issues/labels.json`, `issues/milestones.json`, the ADR count, the toolchain pin — and every restatement rots the moment the source changes. A stale rulebook is worse than none: an agent will confidently follow a rule that no longer matches the repo. This check makes the onboarding docs self-verifying, which is a genuine differentiator for an agent-built codebase.

#### Scope
**In:** `tools/scripts/docs_drift` (Node 22 ESM) asserting that (1) every directory listed in `CLAUDE.md` §3 and `docs/architecture/overview.md` §4 exists and every top-level dir/package exists in both maps; (2) the package DAG prose in §3 matches the arch-lint allow-set from [SN-FND-008](devx.md#sn-fnd-008); (3) the milestone list in §12 matches `issues/milestones.json` titles exactly and in order; (4) the label families in §12 match `issues/labels.json`; (5) the ADR count and numbering in §11/§14 match `docs/adr/`; (6) every path in the §14 reading table and in `docs/README.md` exists; (7) the non-negotiables in `AGENTS.md` are a subset of `CLAUDE.md` §7 (compare normalised rule lines, fail on a rule present in one and missing from the other); (8) the tool versions in `CONTRIBUTING.md` §2 match the toolchain pin from [SN-FND-010](devx.md#sn-fnd-010). An explicit `<!-- drift-ignore: reason -->` marker suppresses a single assertion and the reason is required.
**Out:** rewriting the docs' prose, the ADR index/status automation ([SN-FND-021](docs.md#sn-fnd-021), [SN-DOC-013](docs.md#sn-doc-013)), and the docs link checker ([SN-DOC-003](docs.md#sn-doc-003)).

#### Acceptance criteria
- [ ] Adding a package under `packages/` without updating `CLAUDE.md` §3 **and** `docs/architecture/overview.md` §4 fails CI, naming both files and the missing entry.
- [ ] Adding or renaming a milestone in `issues/milestones.json` without updating `CLAUDE.md` §12 fails CI.
- [ ] Deleting a security rule from `AGENTS.md` that still exists in `CLAUDE.md` §7 (or vice versa) fails CI with a diff of the two rule lists.
- [ ] Every failure message states the exact file, the exact line to change, and the source of truth it disagreed with.
- [ ] The check completes in < 15 s, needs no network, and runs both in `.github/workflows/docs.yml` and in the pre-commit hook set ([SN-FND-016](devx.md#sn-fnd-016)).
- [ ] A `drift-ignore` marker without a reason is itself an error.
- [ ] The check passes on the repository as it stands today (any real drift found is fixed in the same PR).

#### Technical notes
Implement under `tools/scripts/docs_drift/` with `index.mjs` plus one assertion module per rule so new assertions are cheap to add; read `issues/labels.json` and `issues/milestones.json` the way `scripts/validate-issues.mjs` does. The DAG assertion should import the same allow-set data structure the arch-lint in [SN-FND-008](devx.md#sn-fnd-008) uses (`tools/scripts/arch_check`) rather than re-encoding it — one source of truth, two consumers. Parse markdown structurally (headings + fenced blocks + tables) rather than with fragile regexes over whole files. Hook it into `.github/workflows/docs.yml` and `tools/scripts/doctor` ([SN-FND-017](devx.md#sn-fnd-017)) so a local run reports drift before CI does.

#### Security & privacy
This is a security-relevant control even though it processes no user data: `CLAUDE.md` §7 and `AGENTS.md` carry the rules that keep note content on-device, keep secrets out of the repo, keep PII out of logs and keep the dev auth bypass impossible in release. If those documents drift out of sync with the code or with each other, agents implement to a stale contract — an insecure-design failure (OWASP-A04) rooted in insufficient documentation (CWE-1059). Mapping: ASVS V1 (secure architecture and documented security requirements), MASVS-CODE-1 (the app's documented build/dependency posture stays accurate), SSDF PO.1/PW.1 (define and maintain security requirements for the software). The checker itself runs with a read-only token, no network and no ability to write repository files (report-only), so it cannot be turned into a write primitive.

#### UX notes
Developer-experience surface; no app UI. The output is the UX — a table of `assertion · file:line · expected vs found`, ordered by file, ending with a one-line summary and the local command to reproduce, following the actionable-error guidance in `docs/design/ux-principles.md` §4. The docs it protects (the `CLAUDE.md` §14 and `docs/README.md` tables) keep their existing table formatting so the reading order for a newcomer is unchanged.

#### Test plan
- Unit: `tools/scripts/docs_drift/test/assertions.test.mjs` (node:test) — one case per assertion with a fixture repo tree: missing package in the repo map, milestone mismatch, label-family mismatch, ADR count mismatch, missing §14 path, `AGENTS.md` rule divergence, tool-version mismatch, valid and invalid `drift-ignore`.
- Integration: run the checker against the real repo in CI; assert exit 0.
- Manual: add a throwaway `packages/sane_demo/` locally, confirm the pre-commit hook blocks the commit with an actionable message.

#### Dependencies
[SN-FND-003](ci-cd.md#sn-fnd-003), [SN-FND-008](devx.md#sn-fnd-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DOC-005

<a id="sn-doc-005"></a>

**Publish the developer documentation site built from docs/**

| Field | Value |
|---|---|
| GitHub | #523 |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | web |
| Areas | docs, website |
| Size | L |
| SDLC | release |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-DOC-003](docs.md#sn-doc-003), [SN-CI-003](ci-cd.md#sn-ci-003), [SN-SITE-001](website.md#sn-site-001) |
| Security controls | `OWASP-A05`, `OWASP-A08`, `MASVS-PRIVACY-1`, `ASVS-V14`, `CWE-79`, `CWE-540`, `CWE-732`, `CWE-829` |
| Extra labels | needs-decision |

#### Context
`PRD-CO-411` requires a searchable docs site that hosts user guides, the published `.sanenote` spec, import/export guides, the accessibility statement and the privacy/security documentation; `docs/roadmap.md` M8 lists "support & docs" as a launch deliverable. That user-facing site belongs to the `website/` package ([SN-SITE-001](website.md#sn-site-001)). This issue builds the **developer** half of it: a static site generated from `docs/` — architecture, the 16 ADRs, security process, platform notes, the rendered backlog from [SN-DOC-002](docs.md#sn-doc-002) and the API reference from [SN-DOC-006](docs.md#sn-doc-006) — using the same generator and brand tokens so the two halves can be served from one build. Today those documents are readable only by cloning the repo, which blocks external contributors, reviewers and auditors (an MASVS/ASVS assessor asking for the threat model should get a URL, not a git clone).

**Maintainer decision required:** the public hostname for the developer docs and whether the developer docs are public before launch. This issue implements the safe default — build on every PR, deploy from `main` to the repository's default GitHub Pages URL with a custom-domain slot left empty — and the maintainer picks the domain and visibility.

#### Scope
**In:** a generator config at `tools/docs_site/` producing a static site from `docs/**` with zero edits to the existing markdown; navigation derived from `docs/README.md`'s structure (Product, Architecture, ADRs, Design, Platform, Security, Research, Meta); mermaid rendering; client-side offline search; light/dark theming from `docs/design/tokens.json`; a `docs-site` build job on every PR touching `docs/**` and a deploy job restricted to `main`; a 404 page; a "pre-alpha — planning docs" banner; self-hosted fonts and assets.
**Out:** the marketing pages, pricing and "try on web" (PRD-CO-410/412–417, [SN-SITE-001](website.md#sn-site-001)); the help-centre article content ([SN-DOC-008](docs.md#sn-doc-008)); the in-app help ([SN-DOC-010](docs.md#sn-doc-010)); DNS/custom-domain configuration (maintainer).

#### Acceptance criteria
- [ ] Every `.md` under `docs/` is reachable from the site nav; a new doc that is not in the nav fails the build (assert the file set equals the nav set).
- [ ] Mermaid diagrams in `docs/architecture/overview.md` and `docs/roadmap.md` render as diagrams, not code blocks.
- [ ] Search works with the network disabled after first load (prebuilt index, no third-party search service).
- [ ] Zero requests to any third-party origin — verified by an automated network-capture assertion over the built site (no CDN fonts, no analytics, no embeds).
- [ ] A Content-Security-Policy is applied (`default-src 'self'`, no `unsafe-inline` script) and validated by a test; assets carry integrity attributes where the generator emits them.
- [ ] Lighthouse ≥ 95 accessibility and ≥ 90 performance on the docs home and one deep page, in CI.
- [ ] Dark mode follows `prefers-color-scheme`; the palette matches the Paper look tokens in `docs/design/tokens.json`; contrast ≥ 4.5:1 body / ≥ 3:1 UI per `docs/design/accessibility.md` §4.
- [ ] The build is reproducible: two runs from the same commit produce identical output hashes.
- [ ] Deploy runs only from `main` behind branch protection ([SN-CI-003](ci-cd.md#sn-ci-003)); a PR build is an artifact, never a deployment.

#### Technical notes
Choose **MkDocs Material** unless the maintainer decides otherwise, recorded as a short ADR: the repo's docs are already plain GitHub-flavoured markdown with mermaid fences and relative links, and MkDocs Material renders them unmodified (`pymdownx.superfences` for mermaid, built-in offline `search` index, `content.code.copy`), avoiding the MDX rewrite a Docusaurus move would force. Config lives at `tools/docs_site/mkdocs.yml` with `docs_dir: ../../docs`; nav is generated by `tools/docs_site/build_nav.py|mjs` from the filesystem plus an ordering file, and the nav-completeness assertion runs in the same script. Reuse the link checker from [SN-DOC-003](docs.md#sn-doc-003) against the built HTML. Pin the generator and every plugin to exact versions; pin all actions to full commit SHAs ([SN-CI-005](ci-cd.md#sn-ci-005)); `permissions: contents: read` for build, `pages: write id-token: write` only on the deploy job ([SN-CI-009](ci-cd.md#sn-ci-009)). Brand usage per `docs/design/design-system.md` §1.

#### Security & privacy
Threats: (a) the site becomes an unnoticed telemetry channel via CDN fonts/analytics, contradicting ADR-0011's "no analytics SDK" and the store privacy claims — control: everything self-hosted, asserted by the network test (MASVS-PRIVACY-1, OWASP-A05); (b) client-side search or a mermaid renderer executing injected markup from a doc — control: CSP without `unsafe-inline` script, generator HTML sanitisation, no raw-HTML passthrough (CWE-79, ASVS V14); (c) publishing content that should stay internal — control: only `docs/` is published, the pre-publication review in the DoD checks for endpoints/credentials, gitleaks runs on the same paths (CWE-540, CWE-200); (d) a compromised build step deploying arbitrary content — control: SHA-pinned actions, least-privilege tokens, deploy only from a protected branch, deployment provenance recorded alongside [SN-CI-004](ci-cd.md#sn-ci-004) (CWE-829, CWE-732, OWASP-A08).

#### UX notes
The site is the first impression for contributors and auditors. Use the **Paper** look palette and type scale from `docs/design/tokens.json` and the voice rules in `docs/design/ux-principles.md` §5; landing page mirrors the reading order in `docs/README.md` ("Suggested reading order for a newcomer"). Mascot: reference only the wordmark until original Sage art exists — `design/assets/*.png` is watermarked placeholder and not releasable (`CLAUDE.md` §9, [SN-BRD-001](brand.md#sn-brd-001)). Responsive from 360 px (sidebar collapses to a menu below 900 px, matching the app's `narrow` class); skip-to-content link; visible focus rings (contrast ≥ 3:1); keyboard-operable nav and search (`/` to focus, Esc to close); prefers-reduced-motion honoured (`docs/design/accessibility.md` §6); 404 page offers search and a link to `docs/README.md`.

#### Test plan
- Build: `tools/docs_site/test/nav_completeness.test.mjs` — every `docs/**.md` appears exactly once in the nav; orphan/duplicate detection.
- Static analysis of output: `tools/docs_site/test/no_third_party.test.mjs` — parse built HTML/CSS for non-relative origins; `csp_test.mjs` — the meta/header policy exists and contains no `unsafe-inline` for scripts.
- Accessibility/perf: Lighthouse CI config `tools/docs_site/lighthouserc.json` with the thresholds above, run in `.github/workflows/docs-site.yml`.
- Manual: build locally, verify mermaid, dark mode, offline search after disconnecting, and keyboard-only navigation with VoiceOver/NVDA.

#### Dependencies
[SN-DOC-003](docs.md#sn-doc-003), [SN-CI-003](ci-cd.md#sn-ci-003), [SN-SITE-001](website.md#sn-site-001); consumes [SN-DOC-002](docs.md#sn-doc-002) and [SN-DOC-006](docs.md#sn-doc-006) output when present.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed (ADR recording the generator choice)
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Maintainer decision on hostname/visibility recorded in the ADR before the deploy job is enabled


---

### SN-DOC-006

<a id="sn-doc-006"></a>

**Generate the dartdoc API reference in CI and gate public-API docs**

| Field | Value |
|---|---|
| GitHub | #524 |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | docs, devx |
| Size | M |
| SDLC | verification |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-FND-004](devx.md#sn-fnd-004), [SN-FND-006](devx.md#sn-fnd-006) |
| Security controls | `CWE-540`, `CWE-200`, `MASVS-CRYPTO-1`, `MASVS-CODE-1`, `OWASP-A05`, `SSDF-PW.4` |
| Extra labels | agent-ready |

#### Context
`docs/architecture/overview.md` §9 and `CLAUDE.md` §6 require every public API to carry `///` dartdoc, and `very_good_analysis` can flag missing member docs — but nothing generates the reference, nothing checks that the generated output is warning-free, and nothing publishes it. For an agent working inside `packages/sane_ink` or `packages/sane_crypto`, a browsable API reference with resolved cross-links is the difference between reading the source of twelve packages and reading one page. It is also the artifact the docs site ([SN-DOC-005](docs.md#sn-doc-005)) needs for its API section, and the evidence an external reviewer needs to check that `sane_crypto`'s fail-closed semantics are documented at the call site.

#### Scope
**In:** a `melos run docs:api` task running `dart doc` for the twelve `sane_*` packages and the seven plugin platform-interface packages; an `api-docs` CI job that fails on any dartdoc warning (unresolved reference, broken doc import, ambiguous link); a per-package documented-percentage gate (≥ 95 % of public members, **100 %** for `sane_core` and `sane_crypto`); aggregation of the per-package output into `build/api/<package>/` and upload as a CI artifact for [SN-DOC-005](docs.md#sn-doc-005); a `dartdoc_options.yaml` per package excluding `src/` internals; a doc-comment example gate so snippets compile.
**Out:** writing the doc comments themselves (each area's own issues), the package READMEs ([SN-DOC-007](docs.md#sn-doc-007)), publishing to pub.dev (packages are not published), and the docs site build itself ([SN-DOC-005](docs.md#sn-doc-005)).

#### Acceptance criteria
- [ ] `dart doc` completes with **zero** warnings for all 19 packages; a new public member without `///` fails CI with `file:line` and the member name.
- [ ] Documented-percentage gates are enforced per package and the thresholds are declared in one config file, not duplicated per package.
- [ ] Generated output excludes `lib/src/**` internals and includes library-level docs for every exported library.
- [ ] Doc-comment code samples compile: extracted snippets are analysed and a broken sample fails CI.
- [ ] Cross-package references (e.g. a `sane_ink` doc linking `Result` in `sane_core`) resolve in the generated HTML rather than rendering as plain text.
- [ ] The job finishes in < 5 minutes on CI and the uploaded artifact is ≤ 50 MB.
- [ ] `sane_crypto`'s public API docs state fail-closed behaviour (AEAD tag verified before any plaintext is returned) and never document a bypass or a debug-only shortcut.

#### Technical notes
Add the task to `melos.yaml` from [SN-FND-004](devx.md#sn-fnd-004) (`melos exec -- dart doc --output ../../build/api/$MELOS_PACKAGE_NAME`). Enforce warnings-as-errors by parsing dartdoc's output (it exits 0 on warnings) or by using `--validate-links` plus a wrapper script `tools/scripts/dartdoc_gate.dart` that reads dartdoc's JSON/`--json` stream, applies the thresholds from `tools/docs_site/api_thresholds.yaml`, and prints a per-package table. Package inventory and the DAG that determines cross-package links: `docs/architecture/overview.md` §4–§5, ADR-0002. `[pure Dart]` packages must stay Flutter-free, so the job runs `dart doc` (not `flutter`) for them, which also catches an accidental `package:flutter` import as a build failure — complementing arch-lint ([SN-FND-008](devx.md#sn-fnd-008)). Wire the job into `.github/workflows/docs.yml` with `permissions: contents: read` ([SN-CI-009](ci-cd.md#sn-ci-009)) and SHA-pinned actions ([SN-CI-005](ci-cd.md#sn-ci-005)).

#### Security & privacy
Generated API docs are published artifacts derived from source comments, so anything written in a `///` becomes public. Threats and controls: a doc comment containing a key, token, internal hostname or a real user identifier (CWE-540, CWE-200) — gitleaks/trufflehog run on the same source and the reviewer checklist in `CONTRIBUTING.md` §5.2 applies to comments as well as code; documentation that describes how to weaken a control (for example how to force `SANE_AUTH_BYPASS`) is forbidden by `CLAUDE.md` §7.5 and must be caught in review; crypto API documentation must state the approved primitives and fail-closed behaviour so callers cannot misuse it (MASVS-CRYPTO-1, `docs/architecture/crypto.md`). Publication happens only from `main` (OWASP-A05 misconfiguration), and the artifact is built with the pinned toolchain (MASVS-CODE-1, SSDF PW.4).

#### UX notes
Developer surface. The generated site inherits the docs-site theme from [SN-DOC-005](docs.md#sn-doc-005) (Paper look tokens in `docs/design/tokens.json`, light/dark via `prefers-color-scheme`); the package landing pages must show the package's one-line purpose and its allowed DAG edges so the reader immediately knows what may import it (mirrors the README template in [SN-DOC-007](docs.md#sn-doc-007)). Accessibility: generated pages are checked with the same Lighthouse a11y threshold as the docs site (≥ 95), and code blocks keep a contrast ratio ≥ 4.5:1 in both modes per `docs/design/accessibility.md` §4.

#### Test plan
- Unit: `tools/scripts/test/dartdoc_gate_test.dart` — threshold parsing, pass/fail at boundary percentages, warning detection, missing-package handling.
- Integration: run the gate over a fixture package with one undocumented public member (expect failure naming it) and over a fully documented one (expect pass).
- CI: the `api-docs` job on a PR that adds an undocumented public member must go red.
- Manual: open `build/api/sane_core/index.html`, confirm cross-links to `sane_crypto` resolve and `src/` internals are absent.

#### Dependencies
[SN-FND-004](devx.md#sn-fnd-004), [SN-FND-006](devx.md#sn-fnd-006).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DOC-007

<a id="sn-doc-007"></a>

**Write the README and public-API overview for each sane_ package**

| Field | Value |
|---|---|
| GitHub | #525 |
| Type | docs |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | core |
| Areas | docs, devx |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-FND-006](devx.md#sn-fnd-006), [SN-FND-008](devx.md#sn-fnd-008) |
| Security controls | `ASVS-V1`, `MASVS-CODE-1`, `OWASP-A04`, `CWE-1059`, `SSDF-PO.1` |
| Extra labels | agent-ready |

#### Context
ADR-0002 and `docs/architecture/overview.md` §4–§5 define twelve `sane_*` packages and seven federated plugins bound by a strict dependency DAG whose violation is a build failure. Those rules live only in root-level documents, so an agent that opens `packages/sane_render/` and starts editing has nothing local telling it that it may import `sane_brushes`, `sane_ink` and `sane_core` but never `sane_pdf`, that `sane_ui` is a leaf, or that `[pure Dart]` packages must not import `package:flutter`. `docs/architecture/overview.md` §1.2 also notes that "component-level detail lives in each package's own README" — those READMEs do not exist yet. This issue creates them from one template so the DAG is stated where the work happens, and makes the statement machine-checked so it cannot drift.

#### Scope
**In:** `docs/dev/package-readme-template.md`; a `README.md` in each of the twelve `packages/sane_*` directories and each of the seven `plugins/*` directories, covering: one-line purpose (matching `overview.md` §4), pure-Dart vs Flutter status, **Allowed dependencies** (exact in/out edges), public entrypoints (the exported libraries and their main types), how to run its tests, a short "do not" list (no sideways imports, no `package:flutter` in pure Dart, no SQL outside `sane_core` repositories, no `print()`), and links to the owning ADR/PRD/architecture doc; a CI assertion that each package has a README with the required headings and that its **Allowed dependencies** list equals the arch-lint allow-set.
**Out:** the dartdoc API reference ([SN-DOC-006](docs.md#sn-doc-006)), the arch-lint implementation ([SN-FND-008](devx.md#sn-fnd-008)), and per-feature design docs.

#### Acceptance criteria
- [ ] 19 READMEs exist (12 packages + 7 plugins), each generated from the shared template and each carrying the headings: Purpose, Runtime (pure Dart / Flutter), Allowed dependencies, Public API, Tests, Do not, Further reading.
- [ ] The **Allowed dependencies** list in every README exactly matches the arch-lint allow-set; a mismatch fails CI and names the package and the differing edge.
- [ ] Every README's Purpose line is byte-identical to the package's one-line purpose in `docs/architecture/overview.md` §4 (checked, not copied by hand at review time).
- [ ] Each plugin README states that plugins are leaves (never import `packages/` or `app/`) and names its platform-interface package plus the Swift/Kotlin/web implementations per ADR-0012.
- [ ] `sane_crypto` and `sane_sync` READMEs link `docs/architecture/crypto.md` / `sync.md` and state that changes require CODEOWNERS review (`CONTRIBUTING.md` §4).
- [ ] All READMEs pass the markdown lint and link checks from [SN-DOC-003](docs.md#sn-doc-003) and appear in the docs-site nav ([SN-DOC-005](docs.md#sn-doc-005)).

#### Technical notes
Package inventory, purposes and DAG edges: `docs/architecture/overview.md` §4–§5 and `CLAUDE.md` §3. Plugin structure: ADR-0012 (federated platform-interface + Swift/Kotlin/web impls + a mock impl for tests). Implement the check as `tools/scripts/docs_drift/assertions/package_readme.mjs` so it reuses the drift harness from [SN-DOC-004](docs.md#sn-doc-004) and the arch-lint allow-set data structure from [SN-FND-008](devx.md#sn-fnd-008) (import it; never re-encode the DAG a third time). Write the template so a new package created by the scaffold ([SN-FND-006](devx.md#sn-fnd-006)) gets a README stub automatically — extend that scaffold's generator rather than adding a separate one.

#### Security & privacy
No user data is involved, but this is a security-relevant control: the package DAG is a **trust boundary map** (`docs/security/threat-model.md` boundaries, `CLAUDE.md` §7.6 "no layering / trust-boundary violations"). Stating the boundary locally and machine-checking it reduces the chance of an agent introducing a sideways import that routes plaintext around `sane_crypto` or bypasses `sane_core`'s repository interfaces — an insecure-design failure (OWASP-A04) caused by insufficient documentation (CWE-1059). Mapping: ASVS V1 (documented architecture and trust boundaries), MASVS-CODE-1 (accurate component inventory), SSDF PO.1. The READMEs must not name internal endpoints, credentials or unreleased security controls; the standard no-secrets rules apply (`CLAUDE.md` §7.2).

#### UX notes
Developer-experience surface; no app UI and no design tokens. Readability rules from `docs/design/ux-principles.md` §5 still apply to the prose (plain, specific, no marketing voice), and accessibility rules from `docs/design/accessibility.md` §10 apply to the rendered pages on the docs site: hierarchical headings, a single H1, tables with header rows, descriptive link text, and the dependency edges written as text (not only a diagram) so screen-reader users get the same information as sighted readers.

#### Test plan
- Unit: `tools/scripts/docs_drift/test/package_readme.test.mjs` — missing README, missing heading, dependency list with an extra edge, dependency list with a missing edge, purpose-line mismatch.
- Integration: run the assertion over the real repo after the 19 READMEs land; expect exit 0.
- Manual: delete one allowed edge from `packages/sane_render/README.md`, confirm CI fails with the exact edge named.

#### Dependencies
[SN-FND-006](devx.md#sn-fnd-006), [SN-FND-008](devx.md#sn-fnd-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DOC-008

<a id="sn-doc-008"></a>

**Define the help-centre content plan and information architecture**

| Field | Value |
|---|---|
| GitHub | #527 |
| Type | docs |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | docs, onboarding |
| Size | M |
| SDLC | requirements |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-DOC-003](docs.md#sn-doc-003) |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-PRIVACY-4`, `ASVS-V1`, `CWE-200`, `CWE-1059`, `GDPR-Art12`, `DPDP-Notice` |
| Extra labels | agent-ready |

#### Context
`PRD-CO-411` requires the docs site to host user guides, the published open-format spec, import/export guides, the accessibility statement and the privacy/security documentation including the AI data-handling and cloud-opt-in policy. `docs/roadmap.md` M8 makes "support & docs" a launch exit item, and the design already leaves two hooks with nothing behind them: **Settings → Account & plan → "Replay the welcome tour"** and **Settings → Notifications → Tips** (default off, "One short tip a week, never more") in `docs/design/screens-and-flows.md` §12. Writing 60+ articles without a plan produces a pile of pages nobody can navigate and claims nobody verified — dangerous for a product whose core promise is "your ink never leaves the device". This issue produces the plan, the taxonomy and the article contract that both the docs site ([SN-DOC-005](docs.md#sn-doc-005)) and the in-app help ([SN-DOC-010](docs.md#sn-doc-010)) build against.

#### Scope
**In:** `docs/help/CONTENT-PLAN.md` containing: the article inventory (one article per screen, overlay and top task from `docs/design/screens-and-flows.md` §1, plus every Free-vs-Pro gate in §14); the ten-category taxonomy (Get started · Write & draw · Organise your library · PDFs & media · Audio & recognition · Search & Sane Sage · Sync, backup & privacy · Sharing & collaboration · Account & plans · Troubleshooting); the article template (stable slug, task-shaped title, ≤ 30-word summary, numbered steps, a platform-differences matrix for iPad / Android tablet / Web / phone, "related articles", last-reviewed date); tone-of-voice rules derived from `docs/design/ux-principles.md` §5 and the preserved copy in `screens-and-flows.md` §16; a factual-accuracy review rule (every privacy/E2EE/recognition claim cites `docs/architecture/crypto.md`, `docs/adr/0016-on-device-ml-and-ai.md` or a PRD ID); localisation readiness (source English, ICU-safe placeholders, no text baked into images, RTL-safe layout) for [SN-I18N-001](i18n.md#sn-i18n-001); the P0 launch set and priority tiers.
**Out:** writing the article bodies (tracked as follow-on work per area), the site build ([SN-DOC-005](docs.md#sn-doc-005)), the in-app surface ([SN-DOC-010](docs.md#sn-doc-010)), the privacy policy and legal texts ([SN-PRV-001](privacy.md#sn-prv-001)), and screenshots ([SN-DOC-014](docs.md#sn-doc-014)).

#### Acceptance criteria
- [ ] The inventory covers 100 % of the full screens, overlays and persistent surfaces listed in `docs/design/screens-and-flows.md` §1, and every plan gate in §14; a coverage table shows screen → article slug.
- [ ] ≥ 60 articles are planned, with a P0 launch set of ~25 explicitly marked and each article assigned an owning `area:` label and at least one PRD requirement ID.
- [ ] Every planned article that makes a privacy, encryption, recognition or plan-limit claim carries a citation to the doc or PRD ID that makes the claim true; claims with no source are removed or marked **verify** rather than published.
- [ ] Slugs are stable, lowercase-kebab, unique, and usable as `sane://help/<slug>` deep-link targets by [SN-DOC-010](docs.md#sn-doc-010).
- [ ] The template mandates the platform-differences matrix, so no article silently describes only the iPad behaviour.
- [ ] The plan states the review cadence (each article re-reviewed at every minor release or when its area changes) feeding [SN-DOC-013](docs.md#sn-doc-013).
- [ ] The document passes the markdown lint and citation checks from [SN-DOC-003](docs.md#sn-doc-003).

#### Technical notes
Primary sources: `docs/design/screens-and-flows.md` (§1 inventory, §12 Settings tabs, §14 plan matrix, §16 microcopy), `docs/design/ux-principles.md` §4–§5, `docs/product/prd-04-*.md` §10 (PRD-CO-411), `docs/product/prd-00-index.md` for requirement IDs, `docs/design/accessibility.md` §11–§12 for the accessibility-statement content, `docs/adr/0016-on-device-ml-and-ai.md` for the AI data-handling article. Store the inventory as a machine-readable `docs/help/articles.json` alongside the prose plan so the in-app index ([SN-DOC-010](docs.md#sn-doc-010)), the site nav ([SN-DOC-005](docs.md#sn-doc-005)) and the screenshot map ([SN-DOC-014](docs.md#sn-doc-014)) all read one source: fields `slug`, `title`, `summary`, `category`, `tier`, `areas[]`, `prd[]`, `platforms[]`, `screens[]`, `lastReviewed`.

#### Security & privacy
Help content is a transparency obligation and an attack surface for social engineering. Threats and controls: (a) an inaccurate privacy claim ("nothing ever leaves your device") that contradicts the opt-in cloud-AI escalation misleads users and breaches transparency duties — control: every claim cited and reviewed, matching the actual behaviour (MASVS-PRIVACY-3/4, GDPR Art. 12–13, India DPDP notice requirements); (b) an article that teaches users to weaken protection ("turn off the notebook lock if sync is slow") — control: an explicit rule forbidding security-weakening guidance, with the safer alternative documented instead; (c) documenting internal-only behaviour such as the dev auth bypass or diagnostic flags (`CLAUDE.md` §7.5, CWE-200) — control: an explicit do-not-document list; (d) screenshots or examples containing real personal data — control: only the fictional seed profile ("Riya S.", `screens-and-flows.md` §17) may appear ([SN-DOC-014](docs.md#sn-doc-014)). Insufficient or wrong documentation is itself the weakness class CWE-1059; ASVS V1 requires documented security/privacy behaviour.

#### UX notes
The plan is written against the real design: screen names come from `design/Sane Notes.dc.html` as catalogued in `docs/design/screens-and-flows.md` §1 (Login, Profiles "Who's writing?", Library, Editor, Search, Settings; overlays Onboarding, Templates, Share, Import PDF, Upgrade; surfaces Sidebar, Palette dock, Page rail, Audio recorder bar, Ask-my-notes panel, Toast). Voice follows §16's existing copy ("Study smarter.", "Ink is time-linked to audio") — warm, concrete, never salesy. Each article must specify its empty/error/offline framing so in-app rendering has something to show when content is missing. Accessibility rules for the content itself: descriptive headings, no colour-only instructions (`docs/design/accessibility.md` §5), alt-text mandatory for every figure, and instructions written so they work for keyboard and screen-reader users, not just pen users.

#### Test plan
- Schema: `scripts/test/help-articles-schema.test.mjs` — `articles.json` validates (unique slugs, valid category, tier, area labels from `issues/labels.json`, PRD IDs resolvable via the citation checker).
- Coverage: a test asserting every screen/overlay/surface name in `screens-and-flows.md` §1 appears in at least one article's `screens[]`.
- Lint: markdown lint + link + citation checks from [SN-DOC-003](docs.md#sn-doc-003) on `docs/help/**`.
- Manual: review pass by an area owner for the P0 set; verify each privacy claim against `docs/architecture/crypto.md`.

#### Dependencies
[SN-DOC-003](docs.md#sn-doc-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DOC-009

<a id="sn-doc-009"></a>

**Publish the open .sanenote format specification and export guides**

| Field | Value |
|---|---|
| GitHub | #528 |
| Type | docs |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | docs, sharing-export, storage |
| Size | M |
| SDLC | release |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-CORE-005](storage.md#sn-core-005), [SN-SHR-001](sharing-export.md#sn-shr-001) |
| Security controls | `MASVS-CODE-4`, `MASVS-STORAGE-2`, `MASVS-CRYPTO-1`, `MASVS-CRYPTO-2`, `ASVS-V13`, `OWASP-A08`, `CWE-22`, `CWE-409`, `CWE-502`, `CWE-200` |
| Extra labels | needs-decision, innovation |

#### Context
Locked decision 4 commits Sane Notes to an **open `.sanenote` bundle format**, and `PRD-CO-411` requires the docs site to host the *published* spec together with import/export guides. That publication is the product's anti-lock-in promise made checkable: a user can verify that their notes are readable without our app, and a third party can write a reader. The internal description lives in `docs/architecture/file-format.md` (manifest + op-log segments + content-addressed blobs) and the writer/reader is [SN-CORE-005](storage.md#sn-core-005), but an internal architecture note is not a specification — it has no versioning contract, no conformance rules and no normative requirements for a *reader*, which is exactly where security lives once outsiders start producing files. This issue turns it into a published, versioned, testable spec.

**Maintainer decision required:** the licence for the specification text (the repository licence is still undecided, `CLAUDE.md` §13). A permissive spec licence (e.g. CC BY 4.0) is proposed so third parties may implement it; the maintainer confirms.

#### Scope
**In:** `docs/spec/sanenote-1.0.md` — scope and goals, container layout (bundle entries, manifest schema, op-log segment encoding, content-addressed blob naming), the CRDT op encoding surface needed to read a document (add-wins object set, LWW registers, HLC stamps), the **encryption envelope** description stating exactly which bytes are ciphertext and which metadata is plaintext, version/migration rules (additive-only within a major), a **normative reader-hardening section** (RFC-2119 MUSTs), and a conformance checklist; a reference sample bundle plus `tools/scripts/sanenote_validate` that anyone can run; import/export guides for PDF/PNG/SVG/Markdown/JSON and `.sanenote`; publication on the docs site at a stable URL.
**Out:** the writer/reader implementation ([SN-CORE-005](storage.md#sn-core-005)), export rendering ([SN-SHR-001](sharing-export.md#sn-shr-001)), competitor importers, the fuzzing harness itself ([SN-QA-001](qa.md#sn-qa-001)), and the crypto design ([SN-CRY-001](security.md#sn-cry-001), `docs/architecture/crypto.md`).

#### Acceptance criteria
- [ ] The spec is versioned `1.0` with a changelog and a stability policy; every structure has a field table with type, required/optional, and meaning.
- [ ] A round-trip CI test writes a sample document with the real [SN-CORE-005](storage.md#sn-core-005) writer, reads it back, and asserts the produced bundle matches the spec's field tables — a spec/implementation divergence fails the build.
- [ ] The reader-hardening section states, normatively: verify the AEAD tag before using any decrypted byte and fail closed; reject entries whose path escapes the bundle root or is a symlink; cap total uncompressed size and per-entry expansion ratio; reject nesting beyond depth 1; parse off the UI thread; treat every field as untrusted.
- [ ] The spec states precisely which metadata is **not** encrypted (e.g. segment counts, sizes, timestamps) so users can judge the leakage, with no claim that exceeds what `docs/architecture/crypto.md` actually implements.
- [ ] `tools/scripts/sanenote_validate` validates the reference bundle and rejects six crafted hostile samples (traversal, bomb, truncated segment, tampered tag, unknown major version, depth-2 nesting) with distinct, non-leaking error codes.
- [ ] Import/export guides cover every format in PRD-CO's export set and state what is lossy (e.g. PDF export flattens ink).
- [ ] The spec and guides are reachable from the docs site nav and pass the lint/link/citation checks from [SN-DOC-003](docs.md#sn-doc-003).

#### Technical notes
Derive from `docs/architecture/file-format.md` (do not fork it: the architecture doc stays the design rationale, the spec becomes the normative artifact, and each links the other). Crypto envelope wording must match `docs/architecture/crypto.md` and ADR-0007 — XChaCha20-Poly1305 / AES-256-GCM AEAD, Argon2id passphrase KDF, HKDF subkeys, SHA-256/BLAKE3 content addressing. CRDT semantics: ADR-0005 and `docs/architecture/document-model.md`. The validator is a small Dart CLI in `tools/scripts/sanenote_validate/` reusing `sane_core`'s reader so there is one parser, not two. Hostile sample fixtures live with the fuzz corpus referenced by [SN-QA-001](qa.md#sn-qa-001).

#### Security & privacy
Publishing a format specification hands attackers an exact map of the parser — which is correct and safe **only** if the hardening contract is published with it and enforced in code. Threats: path traversal via bundle entry names (CWE-22), decompression/zip bombs (CWE-409), unsafe deserialization of manifest/op structures (CWE-502), tag-skipping or downgrade attempts against the envelope (MASVS-CRYPTO-2), and metadata leakage that the spec must disclose honestly rather than hide (MASVS-STORAGE-2, CWE-200). Controls: the normative reader MUSTs above, the validator as an executable statement of them, the requirement that import lands in a **new isolated notebook** parsed off the UI isolate (`CLAUDE.md` §7.8, MASVS-CODE-4), and fuzzing of the reader before release (`docs/roadmap.md` M2/M7 exit criteria, ASVS V13 for format/API validation). Integrity of the published spec and sample bundle is covered by the release provenance work in [SN-CI-004](ci-cd.md#sn-ci-004) (OWASP-A08).

#### UX notes
Published on the docs site with the Paper look tokens ([SN-DOC-005](docs.md#sn-doc-005)); the user-facing framing follows the design's promise copy "PDF and .sane for every notebook — yours to keep, even on Free" (`docs/design/screens-and-flows.md` §12, Privacy & export) and Settings → Privacy & export is where users reach the export flow the guides describe. Guides must state platform differences (iPad / Android / Web / phone) per the template in [SN-DOC-008](docs.md#sn-doc-008) and include an offline note: export works with no account and no network. Accessibility: field tables carry header rows and are readable linearly by a screen reader; the byte-layout diagram has a text equivalent (`docs/design/accessibility.md` §11) rather than being image-only.

#### Test plan
- Unit: `tools/scripts/sanenote_validate/test/validator_test.dart` — reference bundle passes; six hostile fixtures fail with the expected codes and no path or key material in the message.
- Integration: `packages/sane_core/test/file_format/spec_roundtrip_test.dart` — write with the real writer, assert the on-disk structure matches the spec field tables (table parsed from the markdown so it cannot drift).
- Docs: lint/link/citation checks from [SN-DOC-003](docs.md#sn-doc-003); nav-completeness on the docs site.
- Manual: hand a third party the spec + sample and confirm they can enumerate pages without our code.

#### Dependencies
[SN-CORE-005](storage.md#sn-core-005), [SN-SHR-001](sharing-export.md#sn-shr-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Spec licence decided by the maintainer and stated in the document header


---

### SN-DOC-010

<a id="sn-doc-010"></a>

**Implement the in-app offline help centre**

| Field | Value |
|---|---|
| GitHub | #529 |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | docs, settings, a11y |
| Size | L |
| SDLC | implementation |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-DOC-008](docs.md#sn-doc-008), [SN-SET-001](settings.md#sn-set-001), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-2`, `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-CODE-4`, `OWASP-A03`, `CWE-79`, `CWE-749`, `CWE-532`, `CWE-939` |
| Extra labels | agent-ready |

#### Context
Sane Notes is local-first: a student in a lecture hall with no signal must still be able to work, and that includes getting unstuck. The Settings screen (`docs/design/screens-and-flows.md` §12) has six tabs and a "Replay the welcome tour" row but no help surface, so today the only support path would be a web page the user cannot load offline. `PRD-CO-411`'s docs site covers the online case; this issue covers the offline one by shipping the P0 help set from [SN-DOC-008](docs.md#sn-doc-008) inside the app bundle and rendering it natively — deliberately **not** in a WebView, which would import a scripting engine and a network surface into a privacy-first app for no benefit.

#### Scope
**In:** `app/lib/features/help/` — a `/help` route (go_router, ADR-0003), a `HelpArticle` model and an asset-bundled index (`app/assets/help/<locale>/articles.json` + markdown bodies from [SN-DOC-008](docs.md#sn-doc-008)), category browse, an offline ranked search over titles/summaries/headings, article rendering (headings, lists, code, bundled images, related links), `sane://help/<slug>` deep links from empty/error states elsewhere in the app, a **Help & support** entry in Settings, and a "Contact support" action that composes an email draft referencing the user-initiated redacted diagnostics bundle (ADR-0011) without auto-sending anything.
**Out:** authoring articles ([SN-DOC-008](docs.md#sn-doc-008)), the docs site ([SN-DOC-005](docs.md#sn-doc-005)), the onboarding tour ([SN-ONB-001](onboarding.md#sn-onb-001)), tips and What's new ([SN-DOC-011](docs.md#sn-doc-011)), screenshots ([SN-DOC-014](docs.md#sn-doc-014)), localisation of the content ([SN-I18N-001](i18n.md#sn-i18n-001) — the index is locale-aware, English ships first), and any usage analytics.

#### Acceptance criteria
- [ ] Help opens, browses, searches and renders with the device in airplane mode; an automated test asserts **zero** network requests while the help feature is used.
- [ ] Search returns ranked results in ≤ 50 ms for a 200-article index on the low-end reference device (4 GB Android, `docs/platform/compatibility-matrix.md`), with index parsing done off the UI isolate so opening help never drops a frame (no frame > 16.7 ms, `docs/platform/performance-budgets.md`).
- [ ] Markdown renders with HTML and script execution disabled; a fixture article containing `<script>` and an `onerror` attribute renders as inert text.
- [ ] A `sane://help/<slug>` deep link opens the article read-only; an unknown slug lands on a friendly "We couldn't find that article" state with a search field, never an error dialog and never a state mutation.
- [ ] Empty state ("No results for '<query>' — try a shorter word, or browse the categories"), loading state (skeleton, not a spinner over a blank screen) and asset-missing state (falls back to the category list) all exist, per `docs/design/ux-principles.md` §4.
- [ ] Golden tests pass across **all 17 looks × light/dark** for the help home, an article and the empty-search state.
- [ ] Accessibility: every control has a `Semantics` label, targets are ≥ 44 pt / 48 dp, contrast ≥ 4.5:1 in every look, full keyboard operation on web (Tab/Shift+Tab, Enter, Esc closes, `/` focuses search), Dynamic Type up to the largest accessibility size without clipping, and reduce-motion honoured (`docs/design/accessibility.md` §6–§9).
- [ ] Opening help from the editor preserves editor state; returning restores the exact page and tool.

#### Technical notes
Build the UI from `sane_ui` components (`docs/design/component-inventory.md`: list rows, search field, sheet, toast) and tokens from `docs/design/tokens.json` — no hardcoded colours (`CLAUDE.md` §9). State via Riverpod (`helpIndexProvider` loading and parsing the index in `Isolate.run`, `helpSearchProvider` for queries), routing via go_router per ADR-0003. Render markdown with a pure-Dart renderer configured with raw HTML disabled; **do not** add `flutter_html`, a WebView plugin, or any remote image loader — all images resolve from the asset bundle only. Ranking: title exact > title prefix > summary > heading > body, deterministic tie-break by slug, with a simple token index built at load; no FTS5 dependency (that belongs to `sane_search`, which must not be imported by a UI feature outside the DAG — coordinate in `app/` per `docs/architecture/overview.md` §5). Deep-link registration follows the verified-link rules in `CLAUDE.md` §7.8.

#### Security & privacy
Threats and controls: (a) rendering content in a WebView or with HTML enabled would give injected markup script execution and a JS bridge to native (CWE-79, CWE-749, MASVS-PLATFORM-2) — control: native markdown rendering, raw HTML disabled, asserted by test; (b) remote images or link prefetching would create tracking pixels and a network egress the privacy dashboard does not declare (MASVS-PRIVACY-1, ADR-0011 no-analytics) — control: bundle-only assets and the zero-network assertion; (c) logging search queries would record personal context, violating the no-PII-in-logs rule (`CLAUDE.md` §7.3, CWE-532) — control: `SaneLog` events carry event names and result counts only, never query text; (d) a forged `sane://help/...` deep link attempting to mutate state or escalate (CWE-939, MASVS-PLATFORM-1) — control: the help route is read-only, validates the slug against the bundled index, and performs no writes; (e) the diagnostics bundle must stay user-initiated and redacted (MASVS-PRIVACY-2). Bundled content is untrusted input to the parser and is size-capped and schema-validated (MASVS-CODE-4).

#### UX notes
Entry points per `docs/design/screens-and-flows.md`: **Settings → Account & plan** gains "Help & support" beside the existing "Replay the welcome tour" row, and the Sidebar's settings area links it; the Search screen's no-results state and editor error toasts deep-link to the matching article. Presentation matches the Settings visual language (left tab nav + right content on wide, single column when `narrow` < 900 px) and the app's toast pattern (bottom-centre, 2.4 s auto-dismiss). Voice follows §16 ("No matches for '<query>' — try a shorter word"). Every surface must theme across the 17 looks and dark mode, including code blocks and the search field; wallpaper/frosted-glass panels from the Appearance tab must not reduce text contrast below 4.5:1. Left-handed mode and one-hand reach on phones follow `docs/platform/phones.md`.

#### Test plan
- Unit: `app/test/help/help_index_parse_test.dart` (schema validation, oversize/malformed index rejected), `app/test/help/help_search_ranking_test.dart` (ranking order, tie-break, empty query, unicode query), `app/test/help/help_deeplink_test.dart` (valid slug, unknown slug, hostile slug with traversal characters).
- Widget: `app/test/help/help_home_screen_test.dart`, `app/test/help/help_article_screen_test.dart` (markdown with `<script>` renders inert).
- Golden: `app/test/help/goldens/help_home_<look>_<mode>.png` and `help_article_<look>_<mode>.png` via the harness from [SN-QA-005](qa.md#sn-qa-005) (17 looks × 2 modes).
- Integration: `app/integration_test/help_offline_test.dart` — airplane-mode browse → search → article → back to editor with state intact.
- Security: `app/test/security/help_no_network_test.dart` — no `HttpClient`/`http` call during any help flow; `app/test/security/help_no_pii_logs_test.dart` — no query text in emitted log records.
- Manual: VoiceOver and TalkBack passes; keyboard-only pass on web; Dynamic Type at maximum.

#### Dependencies
[SN-DOC-008](docs.md#sn-doc-008), [SN-SET-001](settings.md#sn-set-001), [SN-DS-003](design-system.md#sn-ds-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Goldens reviewed across all 17 looks + dark mode


---

### SN-DOC-011

<a id="sn-doc-011"></a>

**Implement the What's new and weekly tips surfaces**

| Field | Value |
|---|---|
| GitHub | #530 |
| Type | feature |
| Priority | p3 |
| Milestone | M8 Launch & Growth |
| Platforms | ipad, android-tablet, web, ios-phone, android-phone |
| Areas | docs, onboarding, notifications |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-DOC-010](docs.md#sn-doc-010), [SN-DOC-012](docs.md#sn-doc-012), [SN-NOTF-001](notifications.md#sn-notf-001) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-2`, `MASVS-PLATFORM-1`, `MASVS-NETWORK-1`, `CWE-200`, `CWE-939`, `OWASP-A05` |
| Extra labels | agent-ready |

#### Context
The design already promises two lightweight education surfaces and neither has an implementation: **Settings → Notifications → "Tips"**, default **off**, with the copy "One short tip a week, never more" (`docs/design/screens-and-flows.md` §12), and **Settings → Account & plan → "Replay the welcome tour"** which reopens the 3-step Onboarding overlay (§5). Nothing tells a returning user what changed after an update, even though the release pipeline will be generating release notes ([SN-DOC-012](docs.md#sn-doc-012)). This issue implements a **What's new** sheet driven by the generated notes and a strictly rate-limited, opt-in tips mechanism — both entirely local, because fetching either from a server would add an egress and an identifier to an app that claims neither (ADR-0011, `CLAUDE.md` §7.4).

#### Scope
**In:** `app/lib/features/whats_new/` — a What's new sheet shown once per version bump, dismissible, reopenable from Settings → Account & plan, sourced from a bundled `app/assets/whatsnew/<version>.json` produced by [SN-DOC-012](docs.md#sn-doc-012); `app/lib/features/tips/` — a tip catalogue bundled as assets, a scheduler honouring the Tips toggle (default off), a hard cap of one tip per 7 days, quiet rules (never during focus mode, never while a pointer is down, never during an audio recording), and a "Learn more" link into a help article slug ([SN-DOC-010](docs.md#sn-doc-010)); the Settings wiring for both.
**Out:** the onboarding tour itself ([SN-ONB-001](onboarding.md#sn-onb-001)), the release-note generation ([SN-DOC-012](docs.md#sn-doc-012)), the notification infrastructure and permissions ([SN-NOTF-001](notifications.md#sn-notf-001)), opt-in telemetry ([SN-TEL-001](telemetry.md#sn-tel-001)), and any remote content delivery or A/B testing.

#### Acceptance criteria
- [ ] What's new appears exactly once after the app version changes, is dismissible, and never reappears for that version even after a force-quit; it can always be reopened from Settings.
- [ ] If `assets/whatsnew/<version>.json` is absent or malformed, nothing is shown and nothing is logged as an error to the user (fail-soft), verified by test.
- [ ] Tips are **off** by default; enabling them yields at most one tip in any rolling 7-day window, verified with a fake clock across a 30-day simulation (≤ 4 tips).
- [ ] No tip is shown during focus mode, while the pen is down, or while recording; a suppressed tip is skipped, not queued into a burst.
- [ ] Every tip links to a valid help slug; an invalid slug means the tip is not shipped (build-time assertion against `articles.json`).
- [ ] Both surfaces register **no** push tokens and make **no** network requests — asserted by test; no FCM/APNs registration occurs as a result of this feature.
- [ ] Both surfaces render correctly in all 17 looks × light/dark (goldens), honour reduce-motion, are announced to screen readers on appearance, have ≥ 44 pt / 48 dp dismiss targets and contrast ≥ 4.5:1, and are fully keyboard-dismissible on web (Esc).
- [ ] Turning Tips off stops all future tips within the same session and cancels any pending local schedule.

#### Technical notes
Version detection via the app's package version (`package_info_plus` or the build constant from [SN-FND-005](devx.md#sn-fnd-005)), persisted as a "last seen version" preference in the settings store ([SN-SET-001](settings.md#sn-set-001)); do not use a mutable global — state flows through Riverpod providers (`docs/architecture/overview.md` §9). Tip scheduling uses the local-notification/in-app scheduler from [SN-NOTF-001](notifications.md#sn-notf-001) in **local-only** mode; no remote push path is added. Content lives in `app/assets/tips/<locale>/tips.json` with the same locale-aware layout as help ([SN-DOC-010](docs.md#sn-doc-010)), ready for [SN-I18N-001](i18n.md#sn-i18n-001). UI is composed from `sane_ui` sheet/toast components and tokens (`docs/design/component-inventory.md`, `docs/design/tokens.json`); routing per ADR-0003. The quiet rules read the editor's tool/recording state via providers in `app/`, never by importing feature packages sideways.

#### Security & privacy
This is the classic place where privacy-first apps quietly acquire a tracking channel, so the design is deliberately inert: content is bundled, never fetched (no egress to justify with an ADR + threat-model row, `CLAUDE.md` §7.4; MASVS-NETWORK-1 vacuously satisfied because there is no call), and no push registration means no device token and no server-side identifier (MASVS-PRIVACY-1/2). Tips and What's new are consent-respecting: Tips default off, matching the design copy and GDPR/India DPDP consent expectations. Local notifications must never contain note content or notebook titles beyond what the user already chose to surface (CWE-200). A tip's "Learn more" target is a validated internal help slug, never an arbitrary URL, so a modified asset cannot become an open-redirect or phishing vector (MASVS-PLATFORM-1, CWE-939). Bundled JSON is schema-validated and size-capped before use; a malformed catalogue disables the feature rather than crashing (fail-closed, OWASP-A05).

#### UX notes
What's new is a bottom sheet on phones and a centred modal on tablet/web, using the overlay conventions in `docs/design/screens-and-flows.md` §1 (dimmed backdrop, click-outside to close) and the Upgrade overlay's visual weight as the reference. Copy follows §16's voice — short, concrete, no marketing superlatives — and each entry states the user-visible change, not the commit subject. Tips appear as the standard toast (bottom-centre, 2.4 s auto-dismiss) with an optional "Learn more" action; the Tips preference row keeps its exact design copy ("One short tip a week, never more"). Both surfaces respect focus mode (the design's "just the page" promise, §7.8) and the reduce-motion rules in `docs/design/accessibility.md` §6; entrance animations are ≤ 200 ms and disabled under reduce-motion. All 17 looks + dark mode, including the frosted-glass wallpaper case, must keep text contrast ≥ 4.5:1.

#### Test plan
- Unit: `app/test/whats_new/version_gate_test.dart` (shown once per version, persists across restart, missing/malformed asset is a no-op), `app/test/tips/tip_scheduler_test.dart` (fake clock: ≤ 1 per 7 days, ≤ 4 per 30 days, suppression during focus/pen-down/recording, toggle-off cancels), `app/test/tips/tip_catalogue_test.dart` (every slug resolves).
- Widget: `app/test/whats_new/whats_new_sheet_test.dart`, `app/test/tips/tip_toast_test.dart` (Semantics announcement, Esc dismiss on web).
- Golden: `app/test/whats_new/goldens/whats_new_<look>_<mode>.png`, `app/test/tips/goldens/tip_toast_<look>_<mode>.png` via [SN-QA-005](qa.md#sn-qa-005).
- Security: `app/test/security/tips_no_network_test.dart` (no HTTP, no push registration).
- Integration: `app/integration_test/whats_new_flow_test.dart` — simulate a version bump, see the sheet once, reopen from Settings.

#### Dependencies
[SN-DOC-010](docs.md#sn-doc-010), [SN-DOC-012](docs.md#sn-doc-012), [SN-NOTF-001](notifications.md#sn-notf-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Goldens reviewed across all 17 looks + dark mode


---

### SN-DOC-012

<a id="sn-doc-012"></a>

**Automate the changelog and store release notes from commits**

| Field | Value |
|---|---|
| GitHub | #531 |
| Type | infra |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | docs, release, ci-cd |
| Size | M |
| SDLC | release |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-FND-022](devx.md#sn-fnd-022), [SN-REL-001](release.md#sn-rel-001), [SN-CI-004](ci-cd.md#sn-ci-004), [SN-REL-003](release.md#sn-rel-003) |
| Security controls | `OWASP-A08`, `CWE-200`, `CWE-78`, `CWE-732`, `SSDF-RV.2`, `SSDF-PS.3`, `ASVS-V1` |
| Extra labels | agent-ready |

#### Context
`CLAUDE.md` §5 and `CONTRIBUTING.md` §3 mandate Conventional Commits scoped to the issue key (`feat(sane_ink): add pressure curve editor (SN-INK-012)`), and [SN-FND-022](devx.md#sn-fnd-022) defines the versioning/changelog **policy** (SemVer, `melos version`, signed `v*` tags, a root `CHANGELOG.md`). `docs/security/ssdlc-process.md` §2.5–§2.6 additionally requires release notes that list security-relevant changes and credit reporters per `SECURITY.md`. The commit->artifacts generator (git-cliff config, CHANGELOG.md, store release notes, the Security section with reporter credit, redaction and commit-lint) is owned by [SN-REL-003](release.md#sn-rel-003) (release engineering). What is missing on the documentation side is publishing the generated changelog on the docs site, curating the user-facing "what's new" entries in the product voice, and feeding the in-app What's new ([SN-DOC-011](docs.md#sn-doc-011)) from the generator's output - this issue owns those, consuming [SN-REL-003](release.md#sn-rel-003).

#### Scope
**In:** publishing the generated `CHANGELOG.md` on the docs site ([SN-DOC-005](docs.md#sn-doc-005)) with the house style and passing the markdown lint/link checks ([SN-DOC-003](docs.md#sn-doc-003)); curating the user-facing "what's new" entries in the product voice (concrete user outcomes, help-slug links) from the generator's output and validating them against the schema [SN-DOC-011](docs.md#sn-doc-011) consumes (`app/assets/whatsnew/<version>.json`); and defining the per-package `CHANGELOG.md` presentation. The commit->artifacts generation engine itself (grouping, store-blurb capping, Security/embargo handling, `--dry-run`/`--check`, release-workflow wiring) is owned by [SN-REL-003](release.md#sn-rel-003) and produces the artifacts this issue documents/publishes.
**Out:** the commit->artifacts generator (git-cliff/commit parsing, CHANGELOG.md/store-note/Security-section generation, embargo filtering, commit-lint) - owned by [SN-REL-003](release.md#sn-rel-003), which this issue consumes; signing, notarization, SBOM/provenance ([SN-CI-004](ci-cd.md#sn-ci-004)); store upload and listing metadata ([SN-REL-001](release.md#sn-rel-001)); the versioning policy itself ([SN-FND-022](devx.md#sn-fnd-022)); and the disclosure SLA (`docs/security/ssdlc-process.md` §3).

#### Acceptance criteria
- [ ] The generator ([SN-REL-003](release.md#sn-rel-003)) produces byte-identical output on repeated runs; this issue asserts the docs-site publication and the whatsnew entries derived from it are likewise reproducible.
- [ ] Each entry renders the user-visible summary, a link to the PR, and the `SN-AREA-NNN` key parsed from the subject; commits with no Conventional prefix land under "Other" and produce a warning, never a failed release.
- [ ] `!`/`BREAKING CHANGE` commits produce a MAJOR section that is impossible to miss (first, with its own heading).
- [ ] The Play blurb is ≤ 500 characters, truncated on a word boundary with a deterministic ellipsis, and the generator fails if the curated highlight list cannot fit — it never silently drops a highlight.
- [ ] Commits touching a security advisory that is still embargoed are **excluded** (detected by an `security-embargo` label or an advisory-state lookup) and their absence is reported in the dry-run summary so a human notices.
- [ ] Generated markdown passes the lint/link checks from [SN-DOC-003](docs.md#sn-doc-003), and `--check` fails CI if `CHANGELOG.md` is out of date at tag time.
- [ ] The `whatsnew/<version>.json` output validates against the schema [SN-DOC-011](docs.md#sn-doc-011) consumes, including the per-entry help-slug field when present.

#### Technical notes
Parse commits with `git log --no-merges --format=%H%x1f%s%x1f%b` and a strict Conventional-Commit grammar; never shell-interpolate commit text (build argv arrays, no `sh -c`). Advisory data comes from the GitHub Security Advisories API with a read-only token; if the token is absent (fork/PR context) the Security section is omitted and the run is marked incomplete rather than silently empty. Version resolution and tagging follow [SN-FND-022](devx.md#sn-fnd-022) (`melos version`, signed `v*` tags verified per [SN-CI-003](ci-cd.md#sn-ci-003)). Wire the generator into the release workflow from [SN-REL-001](release.md#sn-rel-001) with `permissions: contents: read` for generation and a separate job for any write step ([SN-CI-009](ci-cd.md#sn-ci-009)); pin actions to SHAs ([SN-CI-005](ci-cd.md#sn-ci-005)). Output paths: `CHANGELOG.md`, `packages/*/CHANGELOG.md`, `build/release/whats-new-<locale>.txt`, `app/assets/whatsnew/<version>.json`.

#### Security & privacy
Release notes are a disclosure channel and part of release integrity. Threats and controls: (a) publishing vulnerability detail before the fix reaches users (CWE-200, `ssdlc-process.md` §3 disclosure flow) — control: embargo filtering plus a mandatory human confirmation step before the Security section is published; (b) a crafted commit message injecting shell or markdown (CWE-78, CWE-79) — control: no shell interpolation and escaping of all commit-derived text; (c) tampered or unattributed release artifacts (OWASP-A08, SSDF PS.3) — control: notes are generated only from signed-tag ranges and are attached alongside the SBOM/provenance from [SN-CI-004](ci-cd.md#sn-ci-004); (d) over-privileged release tokens (CWE-732) — control: least-privilege, job-scoped permissions; (e) reporter credit must match `SECURITY.md` and must not publish a reporter's contact details (personal data minimisation). Generation makes the security-change list reproducible evidence for the M7 audit (ASVS V1, SSDF RV.2).

#### UX notes
Two audiences, two voices. The developer-facing `CHANGELOG.md` follows the house table/heading style used across `docs/` and is published on the docs site ([SN-DOC-005](docs.md#sn-doc-005)) with the Paper look tokens. The user-facing blurb and `whatsnew` entries follow the product voice in `docs/design/screens-and-flows.md` §16 and `docs/design/ux-principles.md` §5 — concrete user outcomes ("Search now finds words inside imported PDFs"), never commit-speak ("refactor sane_search index builder"). Each `whatsnew` entry may carry a help slug so [SN-DOC-011](docs.md#sn-doc-011) can offer "Learn more"; entries must be readable at Dynamic Type maximum and carry no colour-only meaning (`docs/design/accessibility.md` §5).

#### Test plan
- Unit: `tools/scripts/release_notes/test/parser_test` — Conventional-Commit grammar (type, scope, `!`, footer), key extraction, non-conforming subject, multi-line body, hostile subject with backticks/pipes/shell metacharacters.
- Unit: `.../test/render_test` — ordering, breaking-first, 500-char truncation at a word boundary, deterministic output on repeat runs, embargo exclusion.
- Integration: generate notes over a fixture repository with 30 commits and two tags; assert all five artifacts and the `whatsnew` schema.
- CI: `--check` on a PR that changes `CHANGELOG.md` incorrectly must fail.
- Manual: dry-run against the real repo before the first tagged release; confirm the Security section matches published advisories only.

#### Dependencies
[SN-REL-003](release.md#sn-rel-003) (changelog/release-notes generator), [SN-FND-022](devx.md#sn-fnd-022), [SN-REL-001](release.md#sn-rel-001), [SN-CI-004](ci-cd.md#sn-ci-004).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DOC-013

<a id="sn-doc-013"></a>

**Define the ADR and documentation upkeep cadence with a staleness report**

| Field | Value |
|---|---|
| GitHub | #532 |
| Type | chore |
| Priority | p3 |
| Milestone | M7 Beta Hardening & Security Audit |
| Platforms | core |
| Areas | docs, devx |
| Size | S |
| SDLC | maintenance |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-FND-021](docs.md#sn-fnd-021), [SN-DOC-003](docs.md#sn-doc-003) |
| Security controls | `ASVS-V1`, `OWASP-A04`, `CWE-1059`, `SSDF-PO.1`, `SSDF-RV.3` |
| Extra labels | agent-ready |

#### Context
The repo carries 16 ADRs and ~40 documents whose truth has an expiry date. Several decisions are explicitly provisional: ADR-0001's Flutter choice is gated on the `SN-INK` latency spike ([SN-INK-009](ink.md#sn-ink-009)) with a documented native-pivot exit criterion, ADR-0014's DIY PDF annotation has a maintainer decision gate at the end of M2, ADR-0016's recognition vendor must be settled before M4 hardening, and `CLAUDE.md` §13 lists a dozen further open decisions (licence, storage caps, web at-rest posture, relay hosting, share-default posture). `CLAUDE.md` §11 requires `docs/architecture/overview.md` to be updated in the same PR as any boundary/data-flow/threading change, but nothing detects the case where that simply did not happen. [SN-FND-021](docs.md#sn-fnd-021) gives ADRs a template, an index and a link check; this issue adds the **lifecycle and the cadence** so a decision that stopped being true gets noticed before an auditor or an agent acts on it.

#### Scope
**In:** an ADR status lifecycle (`Proposed` / `Accepted` / `Superseded by NNNN` / `Deprecated`) expressed as front-matter and validated by the existing ADR check; `docs/dev/docs-upkeep.md` defining the review cadence (weekly automated report, a docs review at every milestone exit, a full pass in M7) and the reviewer checklist; `tools/scripts/docs_staleness` producing an advisory report covering: ADRs still `Proposed` after their milestone, superseded ADRs without a back-link from their successor, docs untouched for > 180 days whose referenced code paths changed in that window, open maintainer decisions in `CLAUDE.md` §13 with no linked issue key, PRD rows still marked **verify**, and help articles past their `lastReviewed` window from [SN-DOC-008](docs.md#sn-doc-008); a weekly CI job writing a job summary and maintaining exactly one tracking issue.
**Out:** the ADR template/index/link check ([SN-FND-021](docs.md#sn-fnd-021)), the markdown lint/link job ([SN-DOC-003](docs.md#sn-doc-003)), the onboarding drift check ([SN-DOC-004](docs.md#sn-doc-004)), and making any actual decision (maintainer, `CLAUDE.md` §13).

#### Acceptance criteria
- [ ] Every ADR carries a validated status; a `Superseded by NNNN` status fails validation unless ADR NNNN exists and back-links to it.
- [ ] The staleness report runs weekly, exits 0 **always** (advisory, never blocks a PR), writes a GitHub job summary, and updates a single tracking issue instead of opening a new one each run.
- [ ] The report lists, for each finding: the file, the rule that fired, the evidence (dates, commits, missing link) and the suggested action.
- [ ] A doc whose subject area saw code changes in the last 180 days while the doc itself was untouched appears in the report with the changed paths named.
- [ ] Every open decision in `CLAUDE.md` §13 either links an issue key or appears in the report as unlinked.
- [ ] `docs/dev/docs-upkeep.md` defines the M7 documentation sign-off that `docs/roadmap.md` M7 exit criteria can reference, and names the reviewer roles from `docs/security/ssdlc-process.md` (Security Owner for `docs/security/**`).
- [ ] The report and the upkeep doc pass the lint/link/citation checks from [SN-DOC-003](docs.md#sn-doc-003).

#### Technical notes
Implement under `tools/scripts/docs_staleness/` (Node 22 ESM), reusing the assertion harness from [SN-DOC-004](docs.md#sn-doc-004) and the ADR parsing from [SN-FND-021](docs.md#sn-fnd-021) — three separate markdown parsers would itself become drift. Map doc → code paths with a small committed table (`tools/scripts/docs_staleness/ownership.json`, e.g. `docs/architecture/ink-engine.md` → `packages/sane_ink/**`, `plugins/sane_ink_surface/**`) so "related code changed" is a real signal rather than a guess; use `git log --since` for both sides. Milestone expectations for ADR status come from `docs/roadmap.md` (M0 delivers the ADR set; the spike/PDF/recognition gates are named in `CLAUDE.md` §13). The weekly job needs `issues: write` only in its final step ([SN-CI-009](ci-cd.md#sn-ci-009)) with SHA-pinned actions ([SN-CI-005](ci-cd.md#sn-ci-005)).

#### Security & privacy
Stale architecture and security documentation is an insecure-design risk (OWASP-A04) rooted in insufficient documentation (CWE-1059): an ADR that still says "Tier A native front-buffer" after a pivot, or a threat model that predates a new data flow, causes reviewers to approve changes against a contract that no longer exists. `docs/security/threat-model.md` and `docs/security/controls-matrix.md` are in scope of the report and carry the shortest staleness window, because the M7 MASVS/ASVS verification is evidenced from them (ASVS V1 documented architecture, SSDF PO.1/RV.3 for maintaining requirements and reviewing recurring weaknesses). The tool is report-only: it never rewrites documents, runs with a read-only token except for the single issue-update step, and never includes file contents in the tracking issue (paths and dates only, so an embargoed security doc's contents are not mirrored into a public issue).

#### UX notes
Developer-experience surface. The report is the UX: a markdown table in the job summary (rule · file · evidence · suggested action) grouped by severity, ordered so security docs appear first, plus a one-line "N findings, 0 blocking" summary — matching the actionable, non-alarming tone in `docs/design/ux-principles.md` §4 and §5. The tracking issue reuses the repository issue template style from `.github/ISSUE_TEMPLATE/` and links `docs/dev/docs-upkeep.md`. On the docs site the upkeep doc sits under Meta next to `QUALITY-REPORT.md`, with hierarchical headings and tables carrying header rows for screen-reader users (`docs/design/accessibility.md` §10).

#### Test plan
- Unit: `tools/scripts/docs_staleness/test/rules.test.mjs` — one case per rule with a fixture repo: `Proposed` ADR past its milestone, superseded ADR without back-link, doc stale vs changed code paths, unlinked §13 decision, overdue help article, and a clean repo (zero findings).
- Integration: run against the real repo; assert exit 0 and a non-empty, well-formed summary.
- Idempotence: run twice; assert the tracking issue is updated, not duplicated.
- Manual: mark an ADR `Superseded by 0017` with no ADR 0017 and confirm the ADR validation fails.

#### Dependencies
[SN-FND-021](docs.md#sn-fnd-021), [SN-DOC-003](docs.md#sn-doc-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-DOC-014

<a id="sn-doc-014"></a>

**Automate help-centre screenshots from golden tests**

| Field | Value |
|---|---|
| GitHub | #533 |
| Type | task |
| Priority | p3 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | docs, qa |
| Size | M |
| SDLC | verification |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-QA-005](qa.md#sn-qa-005), [SN-DOC-008](docs.md#sn-doc-008) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-200`, `CWE-212`, `OWASP-A05`, `SSDF-PW.4` |
| Extra labels | agent-ready, innovation |

#### Context
Screenshots are the fastest-rotting asset in any documentation set: the palette dock moves, a look is retuned, a label changes, and every help article quietly starts lying. Sane Notes has an unusual advantage — [SN-QA-005](qa.md#sn-qa-005) builds a golden-test harness that already renders every registered surface across **17 looks × light/dark** from deterministic seed data (the design's fictional profile "Riya S." and the seeded Physics notebook in `docs/design/screens-and-flows.md` §17). This issue reuses that harness as a documentation screenshot generator, so the help centre ([SN-DOC-010](docs.md#sn-doc-010)) and the docs site ([SN-DOC-005](docs.md#sn-doc-005)) get images that are regenerated by the same CI that catches UI regressions, and a stale screenshot becomes a build failure instead of a support ticket.

#### Scope
**In:** a documentation-scene registry mapping a golden scene to a documentation slug (`tools/docs_shots/scenes.dart` registering e.g. `library-home`, `editor-palette-dock`, `import-pdf-overlay`, `search-results`, `settings-appearance`); a `melos run docs:shots` task rendering the registered scenes at 2× into `docs/help/assets/<slug>@2x.png` (default look + light/dark); a staleness check that fails when an article references a screenshot that is missing or whose scene has changed since the image was generated; image optimisation and metadata stripping; alt-text enforcement in the article front-matter.
**Out:** the golden harness itself ([SN-QA-005](qa.md#sn-qa-005)), article content ([SN-DOC-008](docs.md#sn-doc-008)), localised screenshots (path layout is locale-aware; rendering per locale waits for [SN-I18N-001](i18n.md#sn-i18n-001)), marketing imagery ([SN-SITE-001](website.md#sn-site-001)), and store screenshots ([SN-REL-001](release.md#sn-rel-001)).

#### Acceptance criteria
- [ ] ≥ 20 documentation scenes render deterministically: fixed seed data, fixed fonts, frozen clock and fixed device pixel ratio produce byte-identical PNGs across repeated runs on the same platform.
- [ ] Light and dark variants are produced for the default look; the generator can render any of the 17 looks on request for look-specific articles.
- [ ] A referenced screenshot that is missing, or whose scene hash differs from the hash recorded beside the image, fails the docs job with the exact `melos run docs:shots` command to regenerate.
- [ ] Every generated image is ≤ 200 KB after optimisation and carries **no** metadata (EXIF/XMP stripped), verified by test.
- [ ] An article referencing an image without alt-text fails the docs lint ([SN-DOC-003](docs.md#sn-doc-003)), satisfying WCAG 2.2 1.1.1.
- [ ] Rendered content contains only fixture data: an assertion checks the rendered widget tree's strings against the seed fixture allow-list, so no ad-hoc or real-looking personal data can appear.
- [ ] The generator makes no network requests and runs headless in CI in < 5 minutes for the full scene set.

#### Technical notes
Build on the golden harness from [SN-QA-005](qa.md#sn-qa-005) (`flutter test --update-goldens` machinery, `sane_ui` theming across `docs/design/tokens.json` looks, deterministic fixtures). A documentation scene is a golden scene plus metadata (`slug`, `caption`, `looks`, `platforms`); keep the registry in code so a renamed widget breaks compilation rather than silently orphaning an image. Record a scene hash (widget tree description + token version + fixture version) next to each PNG in `docs/help/assets/manifest.json`; the staleness check compares hashes, not pixels, so it survives harmless anti-aliasing differences while still catching real UI changes. Optimise with a pinned `oxipng`/`pngcrush` step and strip metadata in the same step. Consume from both `app/assets/help/**` (in-app, [SN-DOC-010](docs.md#sn-doc-010)) and the docs site build ([SN-DOC-005](docs.md#sn-doc-005)); reference images only by relative path so both targets resolve them offline.

#### Security & privacy
Screenshots are the classic accidental-disclosure channel in documentation. Threats and controls: (a) a screenshot containing real user content, an email address, a token or a notebook title from a developer's device (CWE-200, MASVS-PRIVACY-1) — control: images are machine-generated from committed fixtures only, hand-captured screenshots are forbidden by the docs lint rule, and the fixture allow-list assertion enforces it; (b) image metadata leaking device, path or location data (CWE-212) — control: metadata stripped and asserted, matching the EXIF-strip requirement the app already applies to imported images (PRD-LB-180); (c) a compromised or unpinned optimisation binary modifying committed binaries (SSDF PW.4, OWASP-A05) — control: pinned tool versions, deterministic output verified by hash in CI; (d) the renderer must not hit the network, so no remote asset can be baked into a published image. No note content ever reaches the generator because fixtures are synthetic.

#### UX notes
Screenshots must look like the product a reader is holding: default look and light/dark variants, the design's seeded Physics notebook (standing-waves lecture page with a 504-second linked recording and `chapter-14.pdf`, `docs/design/screens-and-flows.md` §17), and the real chrome (Sidebar, Palette dock, Page rail) so the article's steps match what is on screen. Where a feature differs by platform the article must show the matrix rather than one screenshot implying universality ([SN-DOC-008](docs.md#sn-doc-008) template). Accessibility: alt-text is mandatory and must describe the *task state* ("The Import a PDF overlay with the free-import meter showing 3 of 5 used"), never "screenshot"; no instruction may depend on the image alone (`docs/design/accessibility.md` §5, §11); images scale with the page and never carry text that only exists inside the raster, keeping content localisable and readable at Dynamic Type maximum.

#### Test plan
- Unit: `tools/docs_shots/test/scene_registry_test.dart` — every registered slug exists in `docs/help/articles.json`; duplicate slugs rejected; unknown look rejected.
- Determinism: `tools/docs_shots/test/determinism_test.dart` — render twice, assert identical bytes.
- Privacy: `tools/docs_shots/test/fixture_only_test.dart` — rendered strings ⊆ fixture allow-list; `metadata_strip_test.dart` — no EXIF/XMP in output.
- Docs job: a test article referencing a missing image fails the docs lint; regenerating makes it pass.
- Manual: visually review the generated set once per release; confirm captions and alt-text match the images.

#### Dependencies
[SN-QA-005](qa.md#sn-qa-005), [SN-DOC-008](docs.md#sn-doc-008).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-FND-021

<a id="sn-fnd-021"></a>

**Formalise the ADR process: template, index and CI link check**

| Field | Value |
|---|---|
| GitHub | #264 |
| Type | docs |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | docs, devx |
| Size | S |
| SDLC | design |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-1`, `ASVS-V1` |
| Extra labels | agent-ready, good first issue |

#### Context
Architecture decisions are recorded as ADRs (`docs/adr/NNNN-*.md`); there are 16 today (0001–0016). CLAUDE.md §11 defines the process: copy an existing ADR's style, next number, sections Context/Decision/Alternatives/Consequences/How to verify/Status, link it from `overview.md` Appendix B and from the issue, and update `overview.md` in the same PR when a boundary/data-flow/threading/flavour changes. That process is prose in CLAUDE.md but has no template file or automation. This issue makes it a repeatable, checkable process so agents author consistent ADRs and no ADR goes un-indexed.

#### Scope
**In:** `docs/adr/TEMPLATE.md` matching the existing ADR structure (Status, Context, Decision, Alternatives considered, Consequences, Security impact, How to verify); an `docs/adr/README.md` index listing all ADRs; a CI check that every `docs/adr/NNNN-*.md` is linked from the index and from `overview.md` Appendix B and that ADR numbers are unique/sequential; a short “how to add an ADR” section in `docs/dev/local-setup.md`.
**Out:** authoring any new ADR (each feature does that), and the PRD process (SN-DOC-001).

#### Acceptance criteria
- [ ] `docs/adr/TEMPLATE.md` exists and mirrors the sections used by 0001–0016.
- [ ] `docs/adr/README.md` lists all 16 existing ADRs with title + status.
- [ ] A CI link-check fails if an ADR file is missing from the index or from `overview.md` Appendix B, or if two ADRs share a number.
- [ ] The process (next number, required sections, update overview.md same-PR) is documented for agents.
- [ ] Adding a stub `docs/adr/0017-*.md` without indexing it fails the check.

#### Technical notes
Derive the template from the real structure of `docs/adr/0002-monorepo-layout.md` (all ADRs carry a “Security impact” and “How to verify” section — include both). The link-check can be a small Node/Dart script run in CI (reuse the issues-schema job pattern from [SN-FND-015](ci-cd.md#sn-fnd-015)). Cross-link `overview.md` Appendix B as the canonical index target. Keep it lightweight — this is process hygiene, not tooling sprawl.

#### Security & privacy
ADRs carry the security rationale for architectural decisions (each has a “Security impact” section); an un-indexed or template-less ADR risks a decision landing without its security review being discoverable (MASVS-CODE-1, ASVS V1 architecture governance). The template's mandatory “Security impact” section enforces that every decision states its security consequences. No secrets or PII.

#### UX notes
Developer/agent-facing. The template is the UX: fill-in-the-blanks with guidance comments so an agent produces a consistent ADR. The link-check message must name the missing link and where to add it. No end-user UI.

#### Test plan
Run the link-check against the current tree (passes) and against a seeded un-indexed ADR (fails); assert the template has all required sections. Name file: `tools/scripts/test/adr_index_test.dart` (or `.mjs`).

#### Dependencies
None.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-FND-023

<a id="sn-fnd-023"></a>

**Add a LICENSE placeholder and define the SPDX header policy**

| Field | Value |
|---|---|
| GitHub | #266 |
| Type | docs |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | docs, devx |
| Size | XS |
| SDLC | requirements |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | — |
| Security controls | `OWASP-A08`, `ASVS-V14` |
| Extra labels | needs-decision |

#### Context
The project license is **undecided** — CLAUDE.md §13 records that the README carries a placeholder and the maintainer must choose, because the choice impacts contribution terms, the SBOM, and store submission (and the M8 launch gate requires “License chosen and a `LICENSE` file present”, `docs/roadmap.md` §M8). Until then, contributors/agents have no clear IP terms and dependency licenses cannot be checked for compatibility. This issue lands a placeholder `LICENSE` and an SPDX-header policy now, and flags the actual license choice as a maintainer decision so it is not silently made by an agent.

#### Scope
**In:** a `LICENSE` file with a clearly-marked placeholder (e.g. “All rights reserved — license TBD, see SN-FND-023”); a `docs/dev/license-policy.md` describing the SPDX short-form header convention for source files and the dependency-license allow/deny list to enforce once the license is chosen; a note in `README.md`/`CONTRIBUTING.md` pointing to the pending decision.
**Out:** choosing the actual license (maintainer decision — `needs-decision`), automated SPDX-header enforcement in CI (fast-follow once chosen), and the SBOM/dependency-license scan (SN-CI-004).

#### Acceptance criteria
- [ ] A `LICENSE` file exists at the repo root with an explicit placeholder stating the license is undecided.
- [ ] `docs/dev/license-policy.md` defines the SPDX header format and a dependency-license allow/deny approach to enable after the decision.
- [ ] `README.md`/`CONTRIBUTING.md` reference the pending license decision (CLAUDE.md §13).
- [ ] The issue is labeled `needs-decision`; the decision (which license) is left to the maintainer and explicitly not resolved by an agent.
- [ ] No source file claims a specific license until the decision is made.

#### Technical notes
Use SPDX short-form identifiers (`SPDX-License-Identifier: <TBD>`) so the switch to the chosen license is a mechanical find-replace later. Keep the placeholder unambiguous to avoid implying an open-source grant prematurely. Once chosen, a fast-follow issue can add a CI header-check and a dependency-license gate (tie into OSV/`dependency-review`, SN-CI-001). Do not add third-party code assuming a license that may conflict.

#### Security & privacy
Software-integrity/compliance concern (OWASP-A08, ASVS V14): a missing or wrong license undermines SBOM accuracy and store submission and can force a dependency to be removed late. No secrets or PII. The maintainer decision is the control here — do not guess a license.

#### UX notes
Developer/legal-facing. The placeholder and policy must be unambiguous so contributors know terms are pending. No end-user UI. Store-facing license copy is out of scope (SN-REL/SN-SITE).

#### Test plan
Assert `LICENSE` and `docs/dev/license-policy.md` exist and that the placeholder text marks the license as undecided; assert README/CONTRIBUTING reference the decision. Name file: `tools/scripts/test/license_present_test.dart`.

#### Dependencies
None.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, arch-lint, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GOPS-002

<a id="sn-gops-002"></a>

**Maintain the maintainer decision register with due-by milestones**

| Field | Value |
|---|---|
| GitHub | #1098 |
| Type | docs |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | docs, devx |
| Size | S |
| SDLC | requirements |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | [SN-FND-021](docs.md#sn-fnd-021) |
| Security controls | `SSDF-PO.1`, `OWASP-A09` |
| Extra labels | agent-ready |

#### Context
CLAUDE.md §13 lists roughly twenty decisions the maintainer still owes the project — the **licence**, relay/TURN hosting, PDF SDK escape hatch, MyScript vs ML-Kit, default share posture, web at-rest posture, storage caps, cloud-AI provider policy, Sage mascot art, per-profile vs per-account entitlement. Issues that depend on one carry `needs-decision`, but nothing records *which* decision blocks *which* issue, when it must be resolved by, or what the proposed default is if it is not. The failure mode is discovering at M8 that the licence is still undecided (a hard M8 exit criterion in `docs/roadmap.md`) or at M6 that relay hosting was never chosen. This issue turns §13 into a tracked register with due-by milestones.

#### Scope
**In:** `docs/decisions/register.md` (plus a machine-readable `docs/decisions/register.json`) with one row per decision: `DEC-###`, statement, owner, proposed default and where it is documented, the issue keys it blocks, the **due-by milestone** (the earliest milestone of any blocked issue), status (open / decided / superseded), decision date and the ADR or issue that records the outcome; a check in the issues validation job that every issue labelled `needs-decision` names a `DEC-###` in its body and that no `DEC-###` is still open past its due-by milestone; a short "how a decision gets made and recorded" section pointing at the ADR process ([SN-FND-021](docs.md#sn-fnd-021)).
**Out:** making any of the decisions (explicitly the maintainer's, CLAUDE.md §13); the ADR template itself ([SN-FND-021](docs.md#sn-fnd-021)); design-specific open questions owned by `docs/design/screens-and-flows.md` §Open beyond linking them.

#### Acceptance criteria
- [ ] Every decision in CLAUDE.md §13 (product, engine/dependency, security/privacy posture, design, credentials) has a `DEC-###` row with owner, proposed default, blocked issue keys and a due-by milestone.
- [ ] Every issue carrying `needs-decision` in `issues/*.json` references its `DEC-###`; the validator reports any that do not.
- [ ] The register records, for each decided item, the date and the ADR/issue that captured the outcome — no decision is "remembered" only in chat.
- [ ] A decision whose due-by milestone is the current one is surfaced in the milestone-close checklist ([SN-GOPS-001](qa.md#sn-gops-001)).
- [ ] `docs/README.md` and CLAUDE.md §13 link to the register as the authoritative list; §13 stops being a second, drifting copy.

#### Technical notes
Keep `register.json` as the source and generate the Markdown table in CI so the two cannot drift (same pattern as the rendered backlog). Due-by milestone is computed from the blocked issue keys' `milestone` fields in `issues/*.json` — do not hand-maintain it. Statuses are a closed vocabulary. Where a doc already states a proposed default (ADR-0013 relay hosting, ADR-0010 web posture, PRD-CO-036 share posture), cite the file and anchor rather than restating the reasoning.

#### Security & privacy
Several open decisions are security postures: default share posture, web PWA at-rest protection, anti-tamper stance, cloud-AI provider guarantees. Leaving them implicit means an agent silently picks one (SSDF PO.1 — security requirements must be explicit and owned). The register is the control that makes an unresolved posture visible before it ships; pair it with the build-time flags the docs mandate. No user data; the register must not contain credentials or vendor contract terms (CWE-200).

#### UX notes
Developer/maintainer surface only. The rendered table is sorted by due-by milestone then priority so the maintainer sees "what must I decide before this milestone closes". Mark the proposed default visually so an agent knows what to implement behind a flag while the decision is open.

#### Test plan
Validator fixtures: an issue labelled `needs-decision` with no `DEC-` reference fails; an open `DEC` whose due-by milestone has closed fails; a decided `DEC` with no recorded outcome link fails. Manual: generate the register from the current CLAUDE.md §13 and confirm every `needs-decision` issue in `issues/*.json` maps to a row.

#### Dependencies
[SN-FND-021](docs.md#sn-fnd-021) (ADR process, where decisions are recorded).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] CLAUDE.md §13 points at the register instead of duplicating it


---

### SN-GOPS-005

<a id="sn-gops-005"></a>

**Establish repository governance: conduct, contribution terms and triage SLA**

| Field | Value |
|---|---|
| GitHub | #1101 |
| Type | docs |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | docs, devx |
| Size | S |
| SDLC | requirements |
| Parent | [SN-FND-001](devx.md#sn-fnd-001) |
| Depends on | [SN-FND-023](docs.md#sn-fnd-023) |
| Security controls | `SSDF-PO.2`, `OWASP-A09` |
| Extra labels | needs-decision |

#### Context
`CONTRIBUTING.md`, `CODEOWNERS`, PR and issue templates exist, but three governance pieces do not: there is **no Code of Conduct**, **no contribution licensing mechanism** (DCO sign-off vs CLA — undecidable until the licence decision in CLAUDE.md §13 lands), and **no stated response commitment** for outside contributions. The repository is public-facing enough to carry a security policy and a vulnerability disclosure programme ([SN-SEC-036](security.md#sn-sec-036)), which means strangers will file issues, and a classroom-facing product attracts student contributors. Without conduct rules and IP terms, the maintainer cannot safely merge an outside PR, and moderation of abusive or spam issues has no written basis.

#### Scope
**In:** `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1) with a working enforcement contact and an escalation ladder (warning -> temporary interaction limit -> block), and the enforcement record kept privately; a decision row and the chosen mechanism for contribution terms — DCO (`Signed-off-by` trailer + a CI check) or a CLA — wired as a required check; a triage section in `CONTRIBUTING.md`: label taxonomy for inbound issues, first-response target (7 days), what gets closed as out-of-scope (CLAUDE.md §13 scope lock) and how to say so kindly; the stance on GitHub Discussions (on/off) and who moderates; a reminder that security reports never go in public issues ([SN-SEC-036](security.md#sn-sec-036), `SECURITY.md`).
**Out:** the licence choice itself ([SN-FND-023](docs.md#sn-fnd-023), `needs-decision`); end-user support ([SN-GOPS-006](docs.md#sn-gops-006)); in-product abuse handling for classroom rooms ([SN-GOPS-007](collaboration.md#sn-gops-007)); the bug-triage severity taxonomy ([SN-QA-010](qa.md#sn-qa-010)) which this links to rather than restates.

#### Acceptance criteria
- [ ] `CODE_OF_CONDUCT.md` exists, is linked from `README.md`, `CONTRIBUTING.md` and the issue templates, and names a monitored enforcement contact.
- [ ] The contribution-terms mechanism is decided (register row per [SN-GOPS-002](docs.md#sn-gops-002)) and enforced: either a DCO check fails a PR whose commits lack `Signed-off-by`, or the CLA bot blocks until signed.
- [ ] `CONTRIBUTING.md` states the first-response target, the triage labels an inbound issue receives, and the criteria for closing as out-of-scope with a pointer to the locked decisions.
- [ ] Issue templates route security reports to the private advisory path and say so in the form description.
- [ ] Moderation actions are recorded (privately) with date, action and reason; the ladder is documented before it is first used.

#### Technical notes
Prefer DCO over a CLA for a solo-maintainer open project — it is a commit trailer plus a CI check, with no contributor paperwork — but the choice depends on the licence and is the maintainer's. Wire the check as a required status so branch protection ([SN-CI-003](ci-cd.md#sn-ci-003)) enforces it. Keep the enforcement contact as a role address that also serves support ([SN-GOPS-006](docs.md#sn-gops-006)), not a personal inbox.

#### Security & privacy
SSDF PO.2 (roles and responsibilities) and the coordinated-disclosure commitment in `SECURITY.md`: a public issue tracker with no routing rule eventually receives a working exploit in the open. Moderation records contain personal data about reporters and contributors — keep them minimal, private, and retained only as long as the enforcement action lasts (GDPR/DPDP data minimisation, MASVS-PRIVACY-1 spirit applied to project operations). Never publish an enforcement record naming an individual.

#### UX notes
Contributor-facing text only. Keep the tone consistent with the product's voice guide ([SN-BRD-009](brand.md#sn-brd-009)): direct, kind, non-bureaucratic. The templates should make the private-report path visually obvious (a first-line callout), because the failure we care about is a well-meaning reporter publishing a vulnerability.

#### Test plan
CI: a PR without the required contribution-terms artefact fails; with it, passes. Manual: file a test issue via each template and confirm the labels, the routing note and the first-response clock behave as documented; walk the enforcement ladder on paper with one hypothetical case to check the escalation contact is reachable.

#### Dependencies
[SN-FND-023](docs.md#sn-fnd-023) (licence choice gates the contribution-terms mechanism).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Contribution-terms decision recorded in the decision register


---

### SN-GOPS-006

<a id="sn-gops-006"></a>

**Stand up the user support operation: inbox, SLA and escalation path**

| Field | Value |
|---|---|
| GitHub | #1102 |
| Type | docs |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | docs, privacy, qa |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-DOC-010](docs.md#sn-doc-010), [SN-QA-010](qa.md#sn-qa-010), [SN-TEL-008](telemetry.md#sn-tel-008) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-359`, `CWE-532`, `OWASP-A09` |
| Extra labels | needs-credentials, sec: privacy-by-design |

#### Context
The product has an in-app **Contact support** action that composes an email referencing a user-initiated redacted diagnostics bundle ([SN-DOC-010](docs.md#sn-doc-010), [SN-TEL-008](telemetry.md#sn-tel-008)), and `docs/roadmap.md` M8 lists "support & docs live" as a launch deliverable — but nothing defines where that email lands, who answers it, in what time, how a support thread becomes an `SN-` issue, or what happens to the note-bearing screenshot a user inevitably attaches. That last point is the sharp edge: a zero-knowledge product that architecturally never sees note content will, through support, receive note content by email. Without a written handling rule this becomes an unmanaged personal-data store and a privacy incident waiting to happen.

#### Scope
**In:** `docs/support/runbook.md` — the support address and routing (shared mailbox or a minimal helpdesk), operating expectations for a solo maintainer (first response target, triage cadence, holiday expectations stated honestly on the help page), the severity mapping onto the bug taxonomy ([SN-QA-010](qa.md#sn-qa-010)) and the rule for opening an `SN-` issue (reproduce first, never paste user content into a public issue, attach only redacted extracts); a data-handling policy for inbound attachments (treat as user personal data: store only in the support mailbox, never in the repo or a shared drive, delete on resolution, mailbox retention window, no forwarding); canned answers keyed to help-centre slugs ([SN-DOC-008](docs.md#sn-doc-008)); a monthly support -> backlog digest; the escalation path to the private advisory channel when a report looks like a vulnerability.
**Out:** the in-app entry point ([SN-DOC-010](docs.md#sn-doc-010)); the diagnostics bundle format ([SN-TEL-008](telemetry.md#sn-tel-008)); help-centre content ([SN-DOC-008](docs.md#sn-doc-008)); store-review replies ([SN-GOPS-016](release.md#sn-gops-016)); data-subject requests ([SN-GOPS-015](privacy.md#sn-gops-015)).

#### Acceptance criteria
- [ ] A monitored support address exists, is published in-app and on the website, and the runbook names its owner and first-response target.
- [ ] The runbook states the attachment-handling rule: user content stays in the mailbox, is never copied into a public issue, and is deleted when the thread closes; the retention window is written down.
- [ ] Every support thread that becomes a defect produces an `SN-` issue using the [SN-QA-010](qa.md#sn-qa-010) severity taxonomy with a reproduction written from the reporter's description, not from their data.
- [ ] A report that describes a security weakness is redirected to the private advisory path within the acknowledgement SLA (`ssdlc-process.md` §3) and never answered in public.
- [ ] A monthly digest records volume by category and feeds recurring causes into the backlog.

#### Technical notes
Keep the tooling boring: a shared mailbox with labels beats a helpdesk that becomes another sub-processor to declare ([SN-GSEC-004](privacy.md#sn-gsec-004)). If a helpdesk is adopted, it is a processor and must appear in the RoPA and the privacy policy. The canned answers should be generated from the same Markdown as the help centre so they cannot drift. `needs-credentials`: the mailbox/domain and any helpdesk account come from the maintainer.

#### Security & privacy
Threats: sensitive personal data in a support mailbox (CWE-359), note content forwarded into a public issue (CWE-200), diagnostics bundles containing more than the allow-list (CWE-532 — the bundle's redaction is verified in [SN-TEL-003](telemetry.md#sn-tel-003)), and social engineering of support to unlock an account (impossible by design — there is no vendor key-recovery path, [SN-CRY-014](security.md#sn-cry-014): state this explicitly so support never invents one). Controls: MASVS-PRIVACY-1 minimisation applied to operations, retention limits, and a scripted refusal for "please recover my notes" that points at [SN-GOPS-018](docs.md#sn-gops-018).

#### UX notes
User-facing pieces: the Settings -> Help & support entry ([SN-DOC-010](docs.md#sn-doc-010)) already exists; this issue supplies the honest wording around response times (never promise 24/7), the explicit "we cannot read your notes, so please describe rather than attach" guidance shown before composing, and the consent line on the diagnostics bundle.

#### Test plan
Dry run the loop end to end before launch: send a support mail from a test device with a diagnostics bundle attached; confirm routing, the acknowledgement template, the redaction of the bundle, the creation of an `SN-` issue without user content, and deletion of the attachment on close. Table-top the security-report path and the "recover my notes" path. Verify the published response target matches the runbook.

#### Dependencies
[SN-DOC-010](docs.md#sn-doc-010) (in-app contact), [SN-TEL-008](telemetry.md#sn-tel-008) (diagnostics bundle), [SN-QA-010](qa.md#sn-qa-010) (severity taxonomy).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Support mailbox retention and deletion rule reflected in the privacy policy


---

### SN-GOPS-018

<a id="sn-gops-018"></a>

**Write the user data-recovery support playbook for local-first failures**

| Field | Value |
|---|---|
| GitHub | #1114 |
| Type | docs |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | docs, storage, security |
| Size | M |
| SDLC | maintenance |
| Parent | [SN-DOC-001](docs.md#sn-doc-001) |
| Depends on | [SN-CRY-015](security.md#sn-cry-015), [SN-CORE-026](storage.md#sn-core-026), [SN-WEB-032](storage.md#sn-web-032) |
| Security controls | `MASVS-STORAGE-1`, `MASVS-PRIVACY-1`, `CWE-212`, `OWASP-A09` |
| Extra labels | agent-ready |

#### Context
In a local-first, end-to-end-encrypted product, support cannot restore anything for a user — there is no vendor key-recovery path by design ([SN-CRY-014](security.md#sn-cry-014)), and the cloud copy is ciphertext in the user's own drive. Users will nonetheless arrive with: a lost recovery code, a notebook stuck in "Paused (no key)" ([SN-CRY-020](security.md#sn-cry-020)), a corrupt local store ([SN-CORE-026](storage.md#sn-core-026)), a browser that evicted OPFS storage ([SN-WEB-009](storage.md#sn-web-009), [SN-WEB-032](storage.md#sn-web-032)), a sync folder they deleted from Drive, notes written in a guest profile they cannot find after signing in ([SN-AUTH-011](auth.md#sn-auth-011)), or a device that died before the last sync. Without a playbook, each of these gets an improvised answer — and the worst improvisation is inventing a recovery capability that does not and must not exist.

#### Scope
**In:** `docs/support/data-recovery.md` — a symptom-first decision tree covering the cases above, each with: the diagnostic questions that need no note content, the in-app steps to try in order (retry sync, re-pair a device [SN-SYNC-017](sync.md#sn-sync-017), restore from Trash [SN-LIB-019](library.md#sn-lib-019), restore a snapshot [SN-SYNC-023](sync.md#sn-sync-023), import a `.sanenote` backup [SN-SHR-008](sharing-export.md#sn-shr-008), re-enter the recovery code [SN-CRY-015](security.md#sn-cry-015)), what the app can repair automatically ([SN-CORE-026](storage.md#sn-core-026) corruption recovery), what is genuinely unrecoverable and the exact honest wording for saying so, and the preventative follow-up (save the recovery code, enable Export everything [SN-SHR-009](sharing-export.md#sn-shr-009), keep sync on); the escalation rule that turns a recurring cause into a defect issue; and a short user-facing help-centre article version ([SN-DOC-008](docs.md#sn-doc-008)) so most users self-serve.
**Out:** the recovery mechanisms themselves ([SN-CRY-015](security.md#sn-cry-015), [SN-CORE-026](storage.md#sn-core-026), [SN-SYNC-023](sync.md#sn-sync-023)); the support operation ([SN-GOPS-006](docs.md#sn-gops-006)); backup/restore features ([SN-SHR-008](sharing-export.md#sn-shr-008)).

#### Acceptance criteria
- [ ] Every symptom in the tree names the mechanism that may recover it, in the order to try, with the exact in-app path.
- [ ] Cases that are unrecoverable are marked as such with wording that is honest, kind and never suggests that support could decrypt or restore the data.
- [ ] No step in the playbook asks the user to send note content, keys, a recovery code or a screenshot of one; the diagnostic questions are written to avoid it explicitly.
- [ ] The playbook names the diagnostics artefact to request ([SN-TEL-008](telemetry.md#sn-tel-008)) and what it does and does not contain.
- [ ] A recurring cause produces an `SN-` issue (for example, eviction on a browser that should have been covered by [SN-WEB-009](storage.md#sn-web-009)) and the playbook records which causes have already done so.
- [ ] A user-facing help article covers the three most likely cases and is reachable offline from the in-app help centre.

#### Technical notes
Derive the tree from the real failure states the app can show — "Paused (no key)", sync error states ([SN-SYNC-020](sync.md#sn-sync-020)), the storage-eviction warning ([SN-WEB-009](storage.md#sn-web-009)), corruption recovery outcomes ([SN-CORE-026](storage.md#sn-core-026)) — so every branch starts from a string the user can read to support. Where a state is ambiguous, fix the state, not the script: a symptom that cannot be distinguished from the UI is a defect worth filing.

#### Security & privacy
Support-driven recovery is a classic social-engineering target: an attacker claiming a lost recovery code is asking us to break the product's central guarantee. The playbook must state plainly that no such capability exists and that no identity proof can create one (MASVS-STORAGE-1, MASVS-AUTH-2 spirit; CWE-212 improper removal of sensitive information if a well-meaning agent asked for key material). Diagnostics bundles are redacted by construction ([SN-TEL-003](telemetry.md#sn-tel-003)) and are user-initiated; the playbook must not ask for raw databases or `.sanenote` bundles, which contain note content (MASVS-PRIVACY-1).

#### UX notes
The user-facing article uses the help-centre pattern ([SN-DOC-010](docs.md#sn-doc-010)): symptom headings, numbered steps with screenshots generated from goldens ([SN-DOC-014](docs.md#sn-doc-014)), and an honest "if none of this worked" section. Tone per [SN-BRD-009](brand.md#sn-brd-009) — this is the moment a user is most upset; the copy must be calm, specific and never blame them.

#### Test plan
Rehearse each branch on a test device: corrupt the local store and confirm the documented recovery path works; evict web storage and confirm the documented restore-from-cloud path works ([SN-WEB-032](storage.md#sn-web-032)); wipe a device and restore with the recovery code ([SN-CRY-015](security.md#sn-cry-015)); delete the sync folder and confirm the documented outcome. Confirm the article renders offline and that no step asks for prohibited content. Where a rehearsal fails, file the defect and update the tree.

#### Dependencies
[SN-CRY-015](security.md#sn-cry-015) (recovery-code restore), [SN-CORE-026](storage.md#sn-core-026) (corruption recovery), [SN-WEB-032](storage.md#sn-web-032) (eviction recovery).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Every branch rehearsed on a real device and its outcome recorded


---

