# Issue file schema

Every file in `issues/*.json` is a JSON array of issue objects. `scripts/validate-issues.mjs` enforces this schema; `scripts/publish-issues.mjs` creates them on GitHub (labels, milestones, issues, sub-issue links, cross-reference rewriting).

```jsonc
{
  "key": "SN-INK-012",              // REQUIRED. Stable ID. SN-<AREA>-<3 digits>. Unique across all files.
  "title": "Pressure curve editor for pen tool",   // REQUIRED. <= 90 chars, imperative, no platform prefix (labels carry platform)
  "type": "feature",                // REQUIRED. epic | feature | task | bug | security | design | spike | docs | infra | test | chore
  "priority": "p1",                 // REQUIRED. p0 | p1 | p2 | p3 | p4
  "platforms": ["ipad", "android-tablet", "web", "ios-phone", "android-phone"], // REQUIRED. subset; use ["core"] for platform-agnostic shared-package work, ["all"] for everything
  "areas": ["ink"],                 // REQUIRED. 1..3 of the area slugs in labels.json
  "milestone": "M1 Ink MVP",        // REQUIRED. must match a milestone title in milestones.json
  "size": "M",                      // REQUIRED. XS | S | M | L | XL  (XS <2h, S <1d, M 1-3d, L 3-7d, XL epic-sized)
  "sdlc": "implementation",         // REQUIRED. requirements | design | implementation | verification | release | maintenance
  "security": ["MASVS-STORAGE-1", "OWASP-A02"],  // OPTIONAL. control IDs this issue satisfies/touches
  "parent": "SN-INK-001",           // OPTIONAL. key of the parent (epic or feature). Creates a GitHub sub-issue link.
  "depends_on": ["SN-CORE-003"],    // OPTIONAL. keys; rewritten to #numbers on publish
  "labels_extra": ["good first issue", "agent-ready"], // OPTIONAL. any additional labels from labels.json
  "body": "..."                     // REQUIRED. Markdown. Must contain the section headings listed below.
}
```

## Required body sections (in this order)

```
## Context
Why this exists. Link the design/doc it comes from (docs/... paths). A new agent must be able to start from this alone.

## Scope
**In:** ...
**Out:** ...

## Acceptance criteria
- [ ] Observable, testable statements. Include UX quality bars (latency, frame rate, a11y) where relevant.

## Technical notes
Concrete pointers: packages/paths to touch, APIs, libraries, data model, platform APIs. Reference ADRs (docs/adr/NNNN-*.md).

## Security & privacy
Threats this touches, controls to apply, OWASP Top 10 / MASVS / ASVS references. "None beyond baseline" is acceptable only for pure UI polish.

## UX notes
Design references (design/*.dc.html screen names, docs/design/*.md tokens), interaction details, empty/error/loading states.

## Test plan
Unit / widget / integration / golden / manual steps. Name the test files to add.

## Dependencies
Keys of issues that must land first (mirrors depends_on) or "None".

## Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
```

Cross-references inside the body use the `{{SN-XXX-000}}` token syntax; the publisher rewrites tokens to `#123` links after all issues exist.
