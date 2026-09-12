# Sane Notes — documentation index

Every document under `docs/`, with a one-line description. If you are new, read in the **suggested
order** below; the full per-folder index follows. Agents: start instead with
[`../CLAUDE.md`](../CLAUDE.md) (operating manual), then come back here for depth.

> Doc set status: **M0 planning complete.** A cross-consistency pass is recorded in
> [`QUALITY-REPORT.md`](QUALITY-REPORT.md); milestone authority is `../issues/milestones.json`.

## Suggested reading order for a newcomer

1. [`product/vision-and-principles.md`](product/vision-and-principles.md) — what we're building and why.
2. [`architecture/overview.md`](architecture/overview.md) — the whole system on one page (read fully).
3. [`product/prd-00-index.md`](product/prd-00-index.md) — the 567 product requirements, indexed.
4. The PRD for your area: [`prd-01`](product/prd-01-editor-ink-brushes.md) /
   [`prd-02`](product/prd-02-library-documents-audio-search.md) /
   [`prd-03`](product/prd-03-identity-sync-privacy-settings-billing.md) /
   [`prd-04`](product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md).
5. The ADRs your work touches ([`adr/`](adr/)) — the *why* behind each decision.
6. The architecture doc for your layer (document-model / ink-engine / crypto / sync / …).
7. [`design/README.md`](design/README.md) then the design surface you're building.
8. [`security/secure-coding-checklist.md`](security/secure-coding-checklist.md) — how your PR is reviewed.
9. [`roadmap.md`](roadmap.md) — where your work sits in the plan.

---

## Product — why and what

| Doc | One line |
|---|---|
| [`product/vision-and-principles.md`](product/vision-and-principles.md) | The product vision, target persona (Riya), and the non-negotiable principles. |
| [`product/innovation-brief.md`](product/innovation-brief.md) | The differentiators no major competitor has (the `F01…F25` innovation bets). |
| [`product/prd-00-index.md`](product/prd-00-index.md) | Master index of the four PRDs: which owns what, requirement counts, ID schemes. |
| [`product/prd-01-editor-ink-brushes.md`](product/prd-01-editor-ink-brushes.md) | Editor, ink capture, pens/brushes, eraser, selection, shapes, text, layers, gestures (`PRD-ED-*`, 173). |
| [`product/prd-02-library-documents-audio-search.md`](product/prd-02-library-documents-audio-search.md) | Library, notebooks, templates, PDF, media, audio, search, recognition, profiles, plan gating (`PRD-LB-*`, 115). |
| [`product/prd-03-identity-sync-privacy-settings-billing.md`](product/prd-03-identity-sync-privacy-settings-billing.md) | Onboarding, guest mode, profiles, storage & `.sanenote`, backup, sync, E2EE keys, settings, privacy, billing, locks (`PRD-<AREA>-*`, 135). |
| [`product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md`](product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md) | Sharing/export, import, real-time collab, Sane Sage AI, study tools, backlinks, a11y, i18n, website (`PRD-CO-*`, 144). |

## Architecture — how it's built

| Doc | One line |
|---|---|
| [`architecture/overview.md`](architecture/overview.md) | **Read first.** C4 views, the pen→pixel→persist→sync data flow, package DAG, isolate model, build flavours, error/log policy, coding standards, add-a-feature walkthrough. |
| [`architecture/document-model.md`](architecture/document-model.md) | Workspace→Profiles→Notebooks→Pages→Layers→Objects, CRDT (add-wins + LWW + HLC), rich-text semantics. |
| [`architecture/file-format.md`](architecture/file-format.md) | The open `.sanenote` bundle (manifest + segments + blobs), migrations, export formats. |
| [`architecture/ink-engine.md`](architecture/ink-engine.md) | Stroke capture, smoothing/streamline/prediction, pressure model, serialisation, the two inking tiers. |
| [`architecture/rendering-and-performance.md`](architecture/rendering-and-performance.md) | Tessellation, tile/`Picture` caching, `RepaintBoundary` strategy, how the perf budgets are met. |
| [`architecture/crypto.md`](architecture/crypto.md) | Envelope encryption, key hierarchy & storage, recovery codes, the approved primitives. |
| [`architecture/sync.md`](architecture/sync.md) | Append-only op-log segments + snapshots over the user's cloud drive; CRDT merge, conflicts, attachments. |

## ADRs — the decisions (in [`adr/`](adr/))

| ADR | One line |
|---|---|
| [0001](adr/0001-flutter-single-codebase.md) | Flutter single codebase for all five surfaces; the native-pivot exit criterion. |
| [0002](adr/0002-monorepo-layout.md) | Monorepo layout and the enforced package-boundary DAG. |
| [0003](adr/0003-state-management-and-app-structure.md) | State management (Riverpod), routing (go_router), app structure, coding standards. |
| [0004](adr/0004-local-first-zero-server.md) | Local-first, zero-server architecture (device is system of record). |
| [0005](adr/0005-document-model-and-crdt.md) | Document model and CRDT strategy. |
| [0006](adr/0006-sync-over-user-cloud-drives.md) | Sync over user-owned cloud drives (iCloud Drive / Google Drive). |
| [0007](adr/0007-end-to-end-encryption-and-keys.md) | End-to-end encryption and key management. |
| [0008](adr/0008-ink-pipeline-and-low-latency-surfaces.md) | Ink pipeline and low-latency wet-ink surfaces. |
| [0009](adr/0009-brush-engine.md) | Brush engine (stamp-along-path, input-bound curves, shareable pens). |
| [0010](adr/0010-web-pwa-strategy.md) | Web / PWA strategy (CanvasKit/skwasm, COOP/COEP, constraints). |
| [0011](adr/0011-telemetry-and-diagnostics.md) | Telemetry and diagnostics (opt-in, no analytics SDK). |
| [0012](adr/0012-native-plugin-strategy.md) | Native plugin strategy (federated platform-interface). |
| [0013](adr/0013-collaboration-transport.md) | Real-time collaboration transport (WebRTC data channels + ciphertext relay). |
| [0014](adr/0014-pdf-engine.md) | PDF engine (render, annotate, search, export). |
| [0015](adr/0015-audio-pipeline.md) | Audio pipeline (record, background, playback, ink/text↔audio sync). |
| [0016](adr/0016-on-device-ml-and-ai.md) | On-device ML & AI ("Sane Sage": recognition, transcription, LLM, search). |

## Design — the look and the screens (in [`design/`](design/))

| Doc | One line |
|---|---|
| [`design/README.md`](design/README.md) | Design source-of-truth index; the `.dc.html` canvas, the Claude Design link, and the design open questions. |
| [`design/ux-principles.md`](design/ux-principles.md) | The UX philosophy and the proposed empty/error/loading state patterns. |
| [`design/design-system.md`](design/design-system.md) | The design system: 17 looks, typography, spacing, components, per-look rules. |
| [`design/tokens.json`](design/tokens.json) | Machine-readable design tokens (colours/spacing/radii/type) for all 17 looks, light + dark. |
| [`design/screens-and-flows.md`](design/screens-and-flows.md) | Every screen, overlay, inline surface, state, navigation map, seed data, copy, and the 20 open design questions. |
| [`design/component-inventory.md`](design/component-inventory.md) | The `sane_ui` component catalogue (including the `SaneSageMark` mascot asset). |
| [`design/gestures-and-shortcuts.md`](design/gestures-and-shortcuts.md) | Stylus/touch gestures, keyboard shortcuts, mouse/trackpad mapping. |
| [`design/pen-and-brush-spec.md`](design/pen-and-brush-spec.md) | The default pen/brush kit spec and dynamics. |
| [`design/accessibility.md`](design/accessibility.md) | WCAG 2.2 AA requirements, VoiceOver/TalkBack, OCR alt-text for handwriting. |

## Platform — per-surface capabilities & budgets (in [`platform/`](platform/))

| Doc | One line |
|---|---|
| [`platform/performance-budgets.md`](platform/performance-budgets.md) | The decision-7 latency/fps/cold-start/memory/battery budgets and how CI enforces them. |
| [`platform/compatibility-matrix.md`](platform/compatibility-matrix.md) | Supported OS/browser/architecture matrix, foldables, low-end reference device. |
| [`platform/ipad.md`](platform/ipad.md) | iPadOS specifics: Apple Pencil (incl. Pro), ProMotion, Scribble, Metal front-buffer. |
| [`platform/android.md`](platform/android.md) | Android specifics: Jetpack Ink low-latency, S Pen, USI, Keystore/StrongBox. |
| [`platform/web.md`](platform/web.md) | Web/PWA specifics: CanvasKit vs skwasm, WasmGC limits, COOP/COEP, Pointer Events. |
| [`platform/phones.md`](platform/phones.md) | iPhone / Android phone adaptations, foldables, compact layouts. |

## Security — the process and the controls (in [`security/`](security/))

| Doc | One line |
|---|---|
| [`security/threat-model.md`](security/threat-model.md) | STRIDE + LINDDUN threat model: assets, trust boundaries, the `TM-*` threats and mitigations. |
| [`security/controls-matrix.md`](security/controls-matrix.md) | Control-by-control mapping: MASVS/ASVS/Top-10/Mobile-Top-10 → requirement → test → CI gate. |
| [`security/secure-coding-checklist.md`](security/secure-coding-checklist.md) | **The checklist every PR is reviewed against** — input validation, crypto, auth, platform hardening, WebView, logging, deps. |
| [`security/ssdlc-process.md`](security/ssdlc-process.md) | The shift-left SDLC: each phase's gate, RACI, vulnerability SLA, incident response, security Definition of Done. |
| [`security/devsecops-pipeline.md`](security/devsecops-pipeline.md) | The CI/CD security pipeline: which scanner runs where and enforces which gate. |

## Research — the evidence base (in [`research/`](research/))

| Doc | One line |
|---|---|
| [`research/competitor-feature-matrix.md`](research/competitor-feature-matrix.md) | Cross-map of Sane Notes vs Goodnotes/Notability/OneNote/Apple/Samsung/Notion feature-by-feature. |
| [`research/sources/`](research/sources/) | Committed copies of the research inventories cited across the docs as `research/*.md` (see below). |

Sources under [`research/sources/`](research/sources/): competitor teardowns (`notability.md`,
`goodnotes.md`, `goodnotes-userguide-inventory.md`, `goodnotes-official-guide-crawl.md`, `onenote.md`,
`notion.md`, `apple-notes-freeform.md`, `samsung-notes-nebo-other.md`); drawing apps (`procreate.md`,
`concepts-linea-paper-fresco.md`); platform capability (`apple-pencil-ipados-capabilities.md`,
`android-stylus-capabilities.md`, `web-stylus-and-pwa-capabilities.md`, `flutter-ink-stack.md`);
and the domain studies (`local-first-sync-and-crdt.md`, `security-standards-and-devsecops.md`,
`handwriting-recognition-ai-and-ml.md`, `pdf-and-audio-technology.md`,
`accessibility-i18n-and-inclusive-design.md`, `pricing-monetization-and-student-verification.md`,
`user-pain-points-and-market-gaps.md`).

## Meta

| Doc | One line |
|---|---|
| [`README.md`](README.md) | This index. |
| [`roadmap.md`](roadmap.md) | Milestone-by-milestone scope (M0–M8) with the PRD IDs/ADRs each delivers, exit criteria, and sequencing. |
| [`QUALITY-REPORT.md`](QUALITY-REPORT.md) | The M0 cross-consistency pass over every doc: what was fixed, what remains an open maintainer decision. |
| [`../CLAUDE.md`](../CLAUDE.md) · [`../AGENTS.md`](../AGENTS.md) | The agent operating manual (full / condensed). |
| [`../CONTRIBUTING.md`](../CONTRIBUTING.md) · [`../SECURITY.md`](../SECURITY.md) | How to contribute; how to report vulnerabilities. |
