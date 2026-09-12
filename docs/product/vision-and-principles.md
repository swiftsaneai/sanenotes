# Sane Notes — Product Vision & Principles

> **Audience:** a future autonomous coding agent (and any engineer) building Sane Notes with zero prior context.
> **Status:** foundational. Every other product, design, architecture, and security doc MUST agree with this one.
> **Scope:** why the product exists, who it is for, the ten principles that arbitrate every trade-off, what we will
> deliberately NOT build in v1, and how we will measure whether we won.
> **Cross-links:** design system → [`../design/design-system.md`](../design/design-system.md) ·
> screens & flows → [`../design/screens-and-flows.md`](../design/screens-and-flows.md) ·
> tokens → [`../design/tokens.json`](../design/tokens.json) ·
> roadmap milestones → [`../../issues/milestones.json`](../../issues/milestones.json) ·
> threat model → [`../security/threat-model.md`](../security/threat-model.md) ·
> architecture decisions → [`../adr/`](../adr/) (stack decision: [`ADR-0001`](../adr/0001-flutter-single-codebase.md)).
> **Primary evidence:** [`../research/sources/user-pain-points-and-market-gaps.md`](../research/sources/user-pain-points-and-market-gaps.md),
> plus every competitor inventory under [`../research/sources/`](../research/sources/).

---

## 1. Vision

**Sane Notes is the note-taking app that finally fuses expressive, lag-proof handwriting with real knowledge
structure and trustworthy, local-first sync — on every screen a student or professional owns, without ever asking
them to trust a server with their notes.**

The market has hardened into two archetypes, each with a structural weakness
([`user-pain-points-and-market-gaps.md`](../research/sources/user-pain-points-and-market-gaps.md) §Executive summary):

1. **Ink-first apps** (GoodNotes, Notability, Samsung Notes) nail the pen but treat notes as *siloed documents* —
   weakly linked, locked in proprietary formats, only partially cross-platform, and monetised through paywalled
   OCR/search. Their **sync layer is the single most-complained-about surface in the entire category.**
2. **Structure-first apps** (Notion, OneNote, Obsidian) nail organisation, linking, and cross-platform reach but have
   **no credible handwriting story** — Notion has none at all, OneNote's ink search is Windows-only, and Obsidian
   users bolt on OCR pipelines that the community agrees have "no good solution."

**Nobody owns the intersection:** fast, expressive ink **+** real knowledge structure (links/graph/tags) **+**
trustworthy local-first sync **+** honest pricing **+** genuine cross-platform parity. That intersection is Sane
Notes' entire reason to exist. The research is unambiguous that winning even three of those five convincingly already
positions us ahead of any single incumbent (ibid. §Cross-cutting strategic read).

We build for **students first** (design persona "Riya", a B.Tech Physics student — see
[`../design/screens-and-flows.md`](../design/screens-and-flows.md) §Persona) and **professionals second**, in that
priority order. The order matters: students are the harshest latency critics, the most price-sensitive, the most
multi-device, and the loudest when trust is broken — win them and the professionals follow.

Our order of values, applied whenever two goods collide, is: **UX first, then security & privacy first.** A feature
that is more secure but worse to use loses to a feature that is delightful *and* achieves the same security by
architecture rather than by friction. We do not accept that trade-off as inevitable; local-first design lets us have
both (see Principle 2).

---

## 2. Positioning — one line per competitor

Each line names what they are good at, then the specific structural gap Sane Notes attacks. Every claim traces to the
cited research file's "Known complaints" and "What Sane Notes could beat them on" sections.

| Competitor | Positioning against Sane Notes (one line) | Source |
|---|---|---|
| **GoodNotes 6** | Best-known ink app, but Android/Windows/Web are "online-first," core sync/OCR sit behind Pro, files lock into `.goodnotes`, and its "password protection" is an Apple-only access block that is *not* encryption and is unrecoverable if forgotten. | [`goodnotes.md`](../research/sources/goodnotes.md) |
| **Notability** | Pioneered audio-synced notes, but is **Apple-only**, paywalls handwriting search, has no infinite canvas, states no E2EE, and permanently damaged trust with its 2021 forced-subscription pivot. | [`notability.md`](../research/sources/notability.md) |
| **OneNote** | Truly cross-platform and free-form, but its **sync is the category's least reliable** (cache corruption, "Misplaced Sections"), ink search is Windows-only, PDFs are rasterised (no real annotation layer), and web has no true offline. | [`onenote.md`](../research/sources/onenote.md) |
| **Notion** | Best structure, linking, and databases in the category, but has **zero handwriting/ink**, no OCR, weak/distrusted offline, no E2EE, and sluggish mobile. | [`notion.md`](../research/sources/notion.md) |
| **Apple Notes / Freeform** | Free, fast, and beautifully integrated, but **Apple-only**, no Markdown source mode, no backlinks/graph/databases, AI gated to newer hardware, and Freeform export is crash-prone PDF-only. | [`apple-notes-freeform.md`](../research/sources/apple-notes-freeform.md) |
| **Samsung Notes** | Excellent S Pen ink and audio bookmarks, but **Galaxy-only**, exports rasterised (unsearchable) PDFs, sync silently stalls (>1 GB won't sync), and a 2024 update introduced pen lag. | [`samsung-notes-nebo-other.md`](../research/sources/samsung-notes-nebo-other.md) |
| **Nebo (MyScript)** | Best-in-class handwriting recognition, but shallow organisation (no deep hierarchy/tags/backlinks), no synced audio playback, one language per note, and no RTL (Arabic/Hebrew/Urdu). | [`samsung-notes-nebo-other.md`](../research/sources/samsung-notes-nebo-other.md) |
| **Obsidian / Logseq** | The gold standard for backlinks, graph, and local-first Markdown, but **no ink engine at all** — handwriting is a bolted-on OCR pipeline the community calls unsolved. | [`user-pain-points-and-market-gaps.md`](../research/sources/user-pain-points-and-market-gaps.md) §Gap 2 |
| **Procreate** | The benchmark for brush feel and 120 fps Metal ink, but it is a **drawing app**, not a note app: no OCR, no PDF study, no audio-synced notes, no cross-device note sync. | [`procreate.md`](../research/sources/procreate.md) |
| **Concepts / Linea / Paper / Fresco** | Expressive vector ink, "dwell-to-perfect" shapes, and self-hiding UI worth stealing, but they are **sketching tools, not knowledge tools** — no search, links, PDF study, or sync of notes as knowledge. | [`concepts-linea-paper-fresco.md`](../research/sources/concepts-linea-paper-fresco.md) |
| **Noteshelf / Notewise / Flexcil / LiquidText / MarginNote** | Each nails one vertical — templates, AI canvas, PDF excerpting, spatial research, flashcards — but every one is **partial and/or ecosystem-locked**, with no cross-platform parity across all five surfaces. | [`samsung-notes-nebo-other.md`](../research/sources/samsung-notes-nebo-other.md) |

**The through-line:** every incumbent forces a compromise on at least one of {ink quality, knowledge structure,
sync trust, cross-platform parity, honest pricing}. Sane Notes refuses all five compromises simultaneously. That is
the wedge.

---

## 3. Personas

Five personas govern prioritisation. **Riya is primary**; a feature that helps Riya outranks a feature that only
helps the others, all else equal. Each persona lists their context, the jobs they hire a note app to do, their top
pains today, and the single thing that would make them switch.

### 3.1 Riya S. — the student *(PRIMARY)*

- **Who:** B.Tech, Physics minor, India. Uses a mid-range Android tablet at home and a college lab PC / borrowed iPad;
  writes in English with Hindi mixed in. Verified student, price-sensitive (thinks in ₹). Profile and locale mirror
  the design source ([`../design/screens-and-flows.md`](../design/screens-and-flows.md) §Persona: "Good afternoon,
  Riya"; `+91` phone auth; prices in ₹; student pricing "until Jun 2027").
- **Context:** lectures move fast; she writes formulas, imports the professor's PDF slides, records audio when she
  falls behind, and revises on the bus from her phone. Campus wifi is unreliable.
- **Jobs:** capture a lecture faster than she can lose the thread; never lose a page; find "where I wrote about
  eigenvalues" across handwriting, slides, and recordings; turn a messy page into flashcards before an exam.
- **Top pains today:** OCR is paywalled and can't read her mixed Hindi/English; sync eats notes when wifi drops;
  the "free" tier caps her at three notebooks; mid-range Android ink lags.
- **Switch trigger:** *"It's fast on my cheap tablet, it works with no signal, handwriting search is free and reads
  my language, and it never lost a single stroke."*

### 3.2 Dr. Meera Iyer — the university lecturer

- **Who:** Assistant Professor. Teaches from an iPad Pro connected to a projector; office desktop for prep; reviews
  student submissions on a laptop.
- **Context:** annotates slide decks live during class, presents to a room, marks up PDFs of student work, and wants
  a clean copy of "what I drew in class" shared to students afterwards.
- **Jobs:** present ink to a projector with a laser pointer and no clutter; annotate a 300-page course PDF at 60 fps;
  hand students a link to today's board without exposing her whole library; reuse last year's annotated deck.
- **Top pains today:** presentation mode and password lock are Apple-only in the incumbents; export silently drops
  outlines/hyperlinks; shared links are "public to anyone with the link"; PDF markup is rasterised in OneNote.
- **Switch trigger:** *"I can present my ink cleanly, annotate huge PDFs without lag, and share exactly one page —
  encrypted, revocable — to my class."*

### 3.3 Daniel Okafor — the engineer / product manager

- **Who:** Software engineer turned PM at a mid-size company. iPad + Android phone + Windows work laptop + web.
- **Context:** whiteboards architecture in meetings, keeps a running decision log, sketches system diagrams that
  start on one page and sprawl, and needs the same note open on whichever device is nearest.
- **Jobs:** brainstorm on an infinite canvas that *also* holds structured meeting notes; draw a rough box/arrow and
  have it snap crisp; link a decision to the spec that caused it; open the exact same note on web at his desk and on
  Android on the train, offline, with zero sync anxiety.
- **Top pains today:** must choose between paged notebooks and infinite canvas (different apps or doc types); no
  backlinks where ink lives; cross-platform apps are "online-first" or feature-behind; Notion has no ink and slow
  mobile.
- **Switch trigger:** *"One note is both a tidy doc and an infinite whiteboard, it links to my other notes, and it
  is genuinely identical and offline on iPad, Android, Windows, and web."*

### 3.4 Dr. (cand.) Wei Zhang — the researcher / PhD

- **Who:** PhD candidate, reading-heavy field. iPad Pro for reading, macOS/Linux desktop for writing.
- **Context:** annotates hundreds of papers, keeps a literature graph, pulls quotes and figures into synthesis notes,
  and cannot risk a proprietary format holding a thesis' worth of annotations hostage.
- **Jobs:** annotate 1,000-page PDFs smoothly with searchable text preserved; drag an excerpt from a paper into a
  linked note; see a backlink graph over handwritten *and* typed notes; export everything to open formats for
  archival and for tools like Obsidian.
- **Top pains today:** large-PDF performance cliffs; no knowledge graph over ink; export means losing editability;
  OCR is English-centric; nobody exposes handwriting to a knowledge graph.
- **Switch trigger:** *"It handles giant PDFs, gives me a real backlink graph over my handwriting, and I can export
  the whole thing to open formats — so my thesis is never trapped."*

### 3.5 Sam Rivera — the accessibility-first learner *(ACCESSIBILITY PERSONA)*

- **Who:** University student with low vision and a mild hand tremor; primary daily driver is an Android phone/tablet
  with **TalkBack**; also uses an iPad with **VoiceOver** and a Bluetooth keyboard.
- **Context:** relies on the screen reader for all chrome, needs high-contrast/true-dark reading, larger dynamic type,
  and stroke stabilisation to write legibly; often needs the *content* of handwritten notes — their own and shared
  ones — read aloud.
- **Jobs:** operate every control by screen reader; write with tremor smoothing so their handwriting stays legible;
  have handwritten strokes described/read aloud via on-device OCR (the thing **no ink app does today**); read PDFs and
  notes at high contrast with reflow and dyslexia-friendly typefaces for typed content.
- **Top pains today:** handwritten strokes are invisible to VoiceOver/TalkBack unless OCR'd, and no ink app solves
  this; dark mode is inconsistent; motor accommodations (single-touch gestures, tremor filtering) exist only in a
  couple of drawing apps.
- **Switch trigger:** *"It reads my handwriting aloud, every button is labelled for my screen reader, and tremor
  smoothing lets me actually write."*
- **Why this persona is load-bearing:** accessibility is not charity here — it is a *product and procurement moat*.
  Because Sane Notes OCRs on-device, it can feed recognised text to assistive tech and become **the first genuinely
  accessible handwriting app**, opening institutional/education procurement that mandates accessibility compliance
  ([`user-pain-points-and-market-gaps.md`](../research/sources/user-pain-points-and-market-gaps.md) §Gap 14, §Idea 20;
  [`accessibility-i18n-and-inclusive-design.md`](../research/sources/accessibility-i18n-and-inclusive-design.md)).

---

## 4. Jobs to be done

Framed as JTBD statements ("When ___, I want to ___, so I can ___"). These are the atomic outcomes the product is
hired for; every feature MUST map to at least one. Grouped by the user's loop: **capture → keep → find → make sense →
share → trust.**

**Capture**
- When a lecture or meeting is moving faster than I can think, I want ink, typed text, imported PDF, and recorded
  audio to land on **one page in one motion**, so I can keep up without switching apps.
- When I write with a stylus, I want the ink to appear **under the nib with no perceptible lag**, so writing feels
  like paper and I trust the tool during fast note-taking.
- When I sketch a rough box, arrow, table, or underline, I want to **draw-and-hold and have it snap crisp**, so
  diagrams are usable without a mode switch.

**Keep**
- When I close a notebook, lose signal, reinstall, or switch devices, I want **every stroke to still be there,
  merged without "last write wins" loss**, so I never fear the app that holds my coursework.
- When I make a change I regret, I want a **scrubbable per-page timeline** to replay or restore any past state, so a
  mistake is never permanent.

**Find**
- When I need a fact I recorded weeks ago, I want **free, on-device, multilingual search across my handwriting, PDF
  text, and audio transcripts at once**, so retrieval is as good as if I'd typed everything.
- When one idea relates to another, I want to **link a phrase (even handwritten) to another note and see backlinks**,
  so my notes become a knowledge graph, not a pile of documents.

**Make sense**
- When I revise, I want to **turn selected handwriting into flashcards / summaries / clean text on-device**, so I can
  study without exporting to another tool.
- When I do STEM work, I want **handwritten and typed math recognised and (optionally) solved with real units**, so
  my notebook does the arithmetic I'd otherwise do by hand.

**Share & collaborate**
- When I want to hand someone exactly one page, I want to **share a scoped, encrypted, revocable link — or run a live
  session — without exposing my whole library**, so sharing is safe and precise.

**Trust**
- When I choose where my notes live, I want them to **stay on my device and, optionally, only my own cloud, never a
  Sane Notes server**, and to **export everything to open formats at any time**, so I own my data and can always
  leave.

---

## 5. The ten product principles

These are the constitution. When two requirements conflict, resolve in favour of the **higher-numbered-earlier**
principle order below (UX and privacy are co-supreme; ties break toward whichever is more foundational). Each
principle states **what it means**, **how it is enforced** (so an agent can check compliance), and **what it
forbids**. "MUST / SHOULD / MAY" carry RFC-2119 weight.

### Principle 1 — UX first

- **Means:** the experience of writing, finding, and trusting a note is the product. Design source of truth is
  [`../design/design-system.md`](../design/design-system.md) and
  [`../design/screens-and-flows.md`](../design/screens-and-flows.md). Interactions borrow the proven grammar of the
  best pen apps: two-finger undo / three-finger redo, draw-and-hold to perfect a shape, configurable Pencil
  double-tap/squeeze, self-hiding chrome
  ([`concepts-linea-paper-fresco.md`](../research/sources/concepts-linea-paper-fresco.md),
  [`procreate.md`](../research/sources/procreate.md)).
- **Enforced by:** design review against the design system before merge; interaction parity checklist derived from the
  competitor "table stakes" lists; no shipped screen without a screens-and-flows entry.
- **Forbids:** shipping a technically-correct feature that is slower, more modal, or uglier than the incumbent's; using
  security or engineering convenience as an excuse for friction the user feels.

### Principle 2 — Security & privacy first *(co-supreme with UX)*

- **Means:** **zero-knowledge by architecture.** No Sane Notes server ever stores note content. Notes live on-device;
  optional sync uses the **user's own** iCloud Drive or Google Drive, end-to-end encrypted (XChaCha20-Poly1305 or
  AES-256-GCM, envelope encryption; per-notebook keys wrapped by a user master key in Keychain/Keystore/Secure
  Enclave/StrongBox, escrowed via platform keychain + a printable recovery code). Targets: OWASP MASVS 2.x L2 (+R
  where cheap), ASVS 5.0 L2 for web/services, SLSA L3 builds, SBOM per release, STRIDE + LINDDUN threat model
  ([`../security/threat-model.md`](../security/threat-model.md); [`security-standards-and-devsecops.md`](../research/sources/security-standards-and-devsecops.md)).
- **Enforced by:** the DevSecOps pipeline (`.github/workflows/devsecops.yml`: gitleaks, semgrep, OSV-Scanner,
  dependency-review, trivy, actionlint, scorecard; CodeQL; MobSF on release candidates; ZAP for web); the E2EE relay
  for collaboration MUST only ever see ciphertext; Play "Data Safety" = no data collected except opt-in crash reports.
- **Forbids:** any server that can read note content; any AI call that leaves the device without explicit per-request
  opt-in and a visible indicator; telemetry that is not opt-in and on-device-aggregated first; the `SANE_AUTH_BYPASS`
  dev flag ever being reachable in a release build (tracked as a p0 risk).

### Principle 3 — Pen-first

- **Means:** the stylus is the primary input, not an afterthought bolted onto a keyboard app. Full pressure/tilt/
  azimuth capture; a tunable brush engine (fountain/pencil/marker with editable pressure & velocity curves, tilt
  shading, taper) built on a "stamp-along-path" model; expressive, physically-plausible ink
  ([`procreate.md`](../research/sources/procreate.md) §Brush engine model;
  [`apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md),
  [`android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md)). Apple Pencil Pro
  squeeze/barrel-roll/hover/haptics, S Pen, and USI are first-class.
- **Enforced by:** the ink data model (Stroke = points with x,y,pressure,tilt,azimuth,timestamp) is fixed from day one
  (see the Document model in the project charter and ADR-0001); every pen behaviour has a competitor-parity entry.
- **Forbids:** treating ink as a raster image; storing strokes in a way that loses pressure/tilt/timestamp; a pen that
  feels "shaky" or a fountain pen that doesn't taper (the exact GoodNotes complaints).

### Principle 4 — Lag-proof

- **Means:** ink appears under the nib and the app never janks. Hard budgets, enforced by CI and a device lab:
  pen-down→pixel ≤ **16 ms** on ProMotion iPads (native front-buffer path), ≤ **25 ms** on mid-range Android (Ink API
  low-latency), ≤ **30 ms** web on Chrome desktop; steady **60 fps** minimum everywhere, **120 fps** where the display
  allows; no frame > 16.7 ms while writing; cold start < 1.5 s (iPad) / < 2 s (mid Android) / < 3 s (cached web PWA);
  open a 1,000-page notebook < 1 s; scroll a 600-page PDF at 60 fps; memory < 300 MB on a 4 GB Android; a 2-hour
  writing session ≤ 12 % battery on iPad Pro.
- **Enforced by:** CI perf tests + a device lab across three reference devices; the **M0 SN-INK latency spike** (p0)
  measures pure-Flutter-canvas vs Flutter+native-wet-ink paths and, if budgets can't be met, the editor surface
  **pivots to native views with the Dart core kept** (ADR-0001 exit criterion).
- **Forbids:** shipping any surface that misses its latency budget on its reference device; "we'll optimise later" for
  the writing hot path.

### Principle 5 — Works offline, always

- **Means:** the device is the source of truth. Every edit applies **instantly, offline**, and a CRDT merges changes
  with no data loss when connectivity returns
  ([`local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)). Notes are stored locally
  (SQLite via drift + a content-addressed blob store). Sync is **server-optional**; there is no Sane Notes cloud to go
  down. This directly attacks the category's #1 complaint — fragile sync that silently loses data.
- **Enforced by:** the CRDT/op-log document model is foundational (per-object HLC vector clocks, add-wins id set, LWW
  registers, Peritext/Yjs-style rich text); offline-first is a launch acceptance test, not a follow-on; conflict
  resolution is visible and never "last write wins."
- **Forbids:** any feature that requires a network round-trip to take or read a note; "online-first" clients on any
  platform (the exact GoodNotes Android/Windows/Web failure); destructive deletes that can't be recovered.

### Principle 6 — Your data is yours (open format, export everything)

- **Means:** notes are stored in an **open, documented, round-trippable format** (`.sanenote` bundle = manifest +
  segments + blobs; strokes as vector data, PDFs/media embedded) with a public spec, and export to **PDF/PNG/SVG/
  Markdown/JSON** is lossless where the target allows. "You can always leave" is a trust feature and a marketing
  wedge. Directly attacks `.goodnotes`/`NTB` lock-in and OneNote's "can't get my notes out."
- **Enforced by:** the file-format spec is versioned and lives in `docs/`; a round-trip test (import → export →
  re-import) is part of CI; export never silently drops outlines/hyperlinks (the GoodNotes "Flattened PDF" gotcha).
- **Forbids:** a proprietary-only container; export that loses editability without warning; holding a user's data
  hostage to keep them subscribed.

### Principle 7 — One app, every surface

- **Means:** a **single Flutter codebase** (Dart 3, Impeller renderer) with adaptive layouts and a federated native
  plugin layer (Swift on Apple, Kotlin on Android, web JS interop) delivers **feature-equal, offline-capable apps** on
  iPadOS 17+, iOS 17+, Android 10+ (arm64/armeabi-v7a/x86_64) phone & tablet, and Web (PWA, CanvasKit/skwasm) on
  Chrome/Edge 120+, Safari 17+, Firefox 125+, Samsung Internet — including foldables and large-screen window classes
  ([`flutter-ink-stack.md`](../research/sources/flutter-ink-stack.md),
  [`web-stylus-and-pwa-capabilities.md`](../research/sources/web-stylus-and-pwa-capabilities.md)). Competitors' biggest
  structural weakness is platform inconsistency; one codebase keeps five surfaces in lock-step.
  *(Alternative considered: Goodnotes compiled a Swift core to WebAssembly with a TypeScript/React PWA/TWA — a shared
  core + per-platform UI — compared in ADR-0001.)*
- **Enforced by:** the same file format, same OCR, same brush engine, and same sync on every platform; a
  platform-parity matrix ([`../platform/`](../platform/), verify) gates release; no "iOS-first, everyone-else-later"
  feature debt.
- **Forbids:** a platform that is a "PWA wrapper" second-class citizen; features that exist on one OS and silently
  vanish on another (the OneNote and Apple-Notes-account-gating failures).

### Principle 8 — Delightful by default (17 looks)

- **Means:** the app is beautiful out of the box and personal on demand. **17 visual "looks"** (Paper, Minimalism,
  Pop, Maximalism, Glassmorphism, Neumorphism, Claymorphism, Brutalism, Neo-Brutalism, Skeuomorphism, Flat, Material,
  Bento, Y2K, Retro, Cyberpunk, Editorial), each with light + dark palettes and "feel" tokens, restyle the **entire
  app including the notebook pages** ([`../design/screens-and-flows.md`](../design/screens-and-flows.md) §Theme system;
  [`../design/tokens.json`](../design/tokens.json)). Mascot "Sane Sage" gives the product warmth. PDFs keep their
  original colours even in dark mode.
- **Enforced by:** all colour/spacing/type comes from tokens (no hard-coded values); every look ships a validated
  light and dark palette; theming is data-driven, not per-screen bespoke.
- **Forbids:** hard-coded colours; a look that breaks contrast/accessibility (Principle 10 always wins over a look);
  delight that adds latency (Principle 4 always wins).

### Principle 9 — On-device intelligence

- **Means:** "Sane Sage" AI runs **on-device by default** (Apple Foundation Models / Vision / Speech; Gemini Nano via
  ML Kit GenAI + ML Kit Digital Ink & Text Recognition; Whisper on web/wasm), covering handwriting search & convert,
  math recognition, summaries, Q&A over notes, flashcard generation, and lecture transcription synced to ink
  ([`handwriting-recognition-ai-and-ml.md`](../research/sources/handwriting-recognition-ai-and-ml.md),
  [`pdf-and-audio-technology.md`](../research/sources/pdf-and-audio-technology.md)). Best-in-class handwriting search
  is **free, multilingual, and mixed-script** — turning the universal paywall into our headline feature. Any cloud
  inference is **explicit per-request opt-in with a visible "data leaves device" indicator.**
- **Enforced by:** AI features degrade gracefully to on-device models; the offline-AI indicator is a design-system
  component; cloud calls require an affirmative user action and are never geo-blocked arbitrarily (a GoodNotes
  complaint).
- **Forbids:** silent cloud inference; training on user content; an "AI privacy" claim that is asserted rather than
  provable by architecture; hiding basic handwriting search behind a paywall.

### Principle 10 — Accessible & inclusive

- **Means:** **WCAG 2.2 AA** across all chrome; **VoiceOver/TalkBack** for every control **and OCR-backed descriptions
  of handwritten content** (the industry-first bridge); tremor smoothing / motion filtering, single-touch gesture
  companions, high-contrast/true-dark reading, reflow/zoom, and dyslexia-friendly fonts for typed content
  ([`accessibility-i18n-and-inclusive-design.md`](../research/sources/accessibility-i18n-and-inclusive-design.md)).
  Localisation: English first, then Hindi and major Indian languages, Spanish, German, French, Portuguese, Japanese,
  Chinese, Korean, and Arabic (RTL). Privacy law posture: GDPR + India DPDP 2023 + COPPA-aware age gate.
- **Enforced by:** automated a11y scans (axe for web, Android accessibility-scanner, Accessibility Inspector for
  Apple) in CI; every interactive element has a semantic label; RTL and dynamic-type layouts are tested; the M7
  accessibility audit gates launch.
- **Forbids:** handwriting that is invisible to assistive tech once OCR exists; a look or feature that fails AA
  contrast; shipping a locale with broken RTL or truncated dynamic type.

---

## 6. Non-goals for v1

Explicit non-goals keep v1 shippable and lag-proof. These are **deliberately deferred**, not rejected forever; most map
to a later milestone in [`../../issues/milestones.json`](../../issues/milestones.json). An agent MUST NOT build these
in v1 without an explicit decision reversing this section.

| Non-goal for v1 | Why deferred | Revisit |
|---|---|---|
| **A Sane Notes content cloud / hosted storage** | Violates Principle 2 (zero-knowledge). Sync is the user's own iCloud/Drive only. | Never for content; a ciphertext-only collab relay is M6. |
| **Real-time multiplayer collaboration** | Needs a presence/relay and tensions with the no-server ethos; must be an explicit, ephemeral, E2E-encrypted opt-in done right. | **M6** (WebRTC data channels + ciphertext relay). |
| **OneDrive / Dropbox / WebDAV sync backends** | iCloud Drive + Google Drive cover the primary personas; more backends multiply test surface. | Post-launch, after the sync engine is proven. |
| **A template/sticker/planner marketplace** | Ecosystem/monetisation feature, not core to the trust+ink wedge. | Post-launch growth. |
| **Live-computation math with full unit propagation (CAS)** | High-value STEM differentiator but deep; ship handwriting/typed math recognition first. | After M3 recognition lands; typed-math-with-units before ink-math. |
| **Spaced-repetition study mode (FSRS) as a full subsystem** | Depends on reliable OCR; flashcard *generation* is M6, full scheduling is later. | Iterate after M6. |
| **Full knowledge-graph / backlinks UI over ink** | Depends on reliable multilingual OCR to make handwritten anchors linkable. | After M3; graph view is a fast-follow. |
| **Windows and Linux desktop clients** | Flutter can target them, but v1 surfaces are iPad, iPhone, Android phone/tablet, and Web PWA (which covers desktop browsers). | Post-launch, reusing the same codebase. |
| **Apple Vision Pro / visionOS** | Niche for the primary personas. | Backlog. |
| **Team/enterprise admin, SSO/SCIM, audit logs** | B2C students/professionals first; enterprise is a different sale. | Backlog. |
| **A public plugin/extension API** | Stabilise the file format and core first. | After the format spec is v1.0. |
| **More than the launch localisation set** | English + the committed languages first; each locale is real test cost. | Rolling, per Principle 10 order. |

**Also explicitly out of scope as product identity (not just v1):** we are **not** a general drawing/illustration app
(Procreate's turf), **not** a project-management/database tool (Notion/monday territory beyond notes-grade tags), and
**not** an ad- or data-monetised free app. Those boundaries are permanent, not deferrals.

---

## 7. Success metrics

Targets an agent can measure and a release can gate on. Split into **North-Star**, **activation & retention**,
**performance SLOs** (from Principle 4 / project charter decision 7), **reliability**, and **accessibility &
inclusion**. Where a number is a first target rather than a hard SLO, it is marked *(target)*; SLOs are release
gates. Instrumentation MUST be opt-in and on-device-aggregated first (Principle 2/9).

### 7.1 North-Star

- **North-Star metric:** **weekly retained note-taking minutes per active user** — i.e., people actually writing, not
  just installing. It captures the whole thesis (fast ink they trust, on every device) in one number. *(target:
  establish baseline in beta, then grow cohort-over-cohort.)*

### 7.2 Activation & retention

| Metric | Definition | Target |
|---|---|---|
| **Activation** | % of new users who, in their first session, create a notebook **and** write ≥ 1 real page of ink (or import a PDF and annotate it). | **≥ 40%** *(target)* |
| **Time-to-first-ink** | Median seconds from first launch to first stroke (guest mode is first-class — no sign-in wall). | **< 60 s** *(target)* |
| **D1 retention** | % returning the next day. | **≥ 45%** *(target)* |
| **D7 retention** | % active 7 days after install. | **≥ 30%** *(target)* |
| **D30 retention** | % active 30 days after install. | **≥ 20%** *(target)* |
| **Free→Pro conversion** | % of monthly actives on a paid plan (Pro ≈ ₹83/month reference; student verification). | **≥ 4%** *(target)*; see [`pricing-monetization-and-student-verification.md`](../research/sources/pricing-monetization-and-student-verification.md). |
| **Guest→account** | % of guest users who later create an identity (for sharing/entitlements only). | *(baseline in beta)* |

### 7.3 Performance SLOs *(release gates — from Principle 4)*

| SLO | Threshold | Reference device / condition |
|---|---|---|
| Pen-down→pixel latency | ≤ **16 ms** | ProMotion iPad, native front-buffer path |
| Pen-down→pixel latency | ≤ **25 ms** | Mid-range Android (Snapdragon 680-class), Ink API low-latency |
| Pen-down→pixel latency | ≤ **30 ms** | Web, Chrome desktop |
| Frame rate while writing | ≥ **60 fps** everywhere; **120 fps** where display allows; **no frame > 16.7 ms** | All supported devices |
| Cold start | < **1.5 s** iPad · < **2 s** mid Android · < **3 s** cached web PWA | — |
| Open 1,000-page notebook | < **1 s** | — |
| Scroll 600-page PDF | **60 fps** | — |
| Memory ceiling | < **300 MB** | 4 GB Android |
| Battery | ≤ **12%** for a 2-hour writing session | iPad Pro |

Any build that misses an SLO on its reference device does not ship that surface (Principle 4).

### 7.4 Reliability & trust

| Metric | Target |
|---|---|
| **Crash-free sessions** | **≥ 99.9%** *(gate: ≥ 99.5%)* |
| **Crash-free users** | **≥ 99.5%** *(gate: ≥ 99%)* |
| **Sync data-loss incidents** | **0** strokes lost across any offline/reconnect/reinstall/multi-device merge — the category's #1 complaint; this is a **hard zero**, tested, not a percentage. |
| **Non-destructive delete** | 100% of deletes recoverable from the per-page timeline / trash. |
| **Export round-trip fidelity** | 100% lossless `.sanenote` → export → re-import for supported targets; outlines/hyperlinks never silently dropped. |

### 7.5 Accessibility & inclusion

| Metric | Target |
|---|---|
| **WCAG conformance** | **2.2 AA** across all chrome (M7 audit gate). |
| **Automated a11y score** | **0 critical/serious** issues from axe (web) / accessibility-scanner (Android) / Accessibility Inspector (Apple) in CI. |
| **Screen-reader coverage** | **100%** of interactive elements labelled; handwritten content exposed to VoiceOver/TalkBack via on-device OCR wherever OCR is available. |
| **Localisation** | Launch set complete (English + committed languages), Arabic RTL verified, dynamic type without truncation. |
| **Contrast** | Every one of the 17 looks passes AA contrast in light and dark. |

---

## 8. Why we will win

Grounded directly in
[`user-pain-points-and-market-gaps.md`](../research/sources/user-pain-points-and-market-gaps.md) and the competitor
"could beat them on" sections.

1. **Trust is the wedge, and it is ours to take.** The two loudest, most emotional complaints in the entire category
   are **sync/data-loss** and the **Notability subscription betrayal** — both *trust* failures (ibid.
   §Cross-cutting strategic read). Local-first CRDT sync (no server to lose your data), zero-knowledge privacy (no
   server that can read your notes), an open format (you can always leave), and honest pricing form a **coherent trust
   platform that incumbents structurally cannot copy without abandoning the cloud/subscription businesses they depend
   on.** We win on the axis they can't move.

2. **We own the intersection nobody owns.** Expressive ink (Principles 3–4) **+** knowledge structure (backlinks/tags,
   Principle 6/9) **+** trustworthy sync (Principle 5) **+** free on-device search (Principle 9) **+** real
   cross-platform parity (Principle 7). The research states plainly that winning even three of these five already beats
   any single incumbent. We are building all five (ibid. §Ranked gaps 1–6, §Cross-cutting read).

3. **On-device AI is the enabling technology, and it doubles as the privacy story.** Handwriting search, transcription,
   Q&A, and accessibility OCR all depend on efficient on-device models — and running them on-device is simultaneously
   the feature *and* the proof that "your notes never touch our machines" (ibid. §Ideas 1, 6, 16, 17, 20). One
   investment unlocks half the differentiators and the entire trust narrative at once.

4. **We turn every incumbent's paywall and platform gap into our baseline.** Free, multilingual, mixed-script
   handwriting search (their most-resented paywall). Fully offline on Android/Windows/Web (their "online-first"
   weakness). Real vector PDF annotation with searchable export (Samsung/OneNote rasterise). Genuinely encrypted,
   recoverable, cross-platform note locking (GoodNotes' lock is Apple-only, not encryption, and unrecoverable). Each is
   a specific, cited complaint we answer by design, not by roadmap promise
   (see every competitor file's "What Sane Notes could beat them on").

5. **We are accessible where the whole category simply isn't.** No ink app exposes handwriting to screen readers; we
   can, because we OCR on-device. That is both a genuine inclusion win and a **procurement moat** into education and
   institutions that mandate accessibility compliance (ibid. §Gap 14, §Idea 20).

6. **Students first is a durable strategy, not a niche.** The harshest critics of latency, price, trust, and
   multi-device parity are students; a product that satisfies Riya on a 4 GB Android tablet with no signal, free OCR
   in her language, and zero lost strokes will satisfy every professional persona that follows — and students carry
   the product into their careers.

**The one-sentence bet:** every competitor forces a compromise on ink, structure, sync trust, cross-platform parity,
or honest pricing; **Sane Notes refuses all five at once**, and the research says that refusal is exactly the opening
the market has left wide open.

---

## Sources

All evidence is in [`../research/sources/`](../research/sources/). Primary file for this document:
[`user-pain-points-and-market-gaps.md`](../research/sources/user-pain-points-and-market-gaps.md). Competitor
inventories relied on: [`goodnotes.md`](../research/sources/goodnotes.md),
[`notability.md`](../research/sources/notability.md), [`onenote.md`](../research/sources/onenote.md),
[`notion.md`](../research/sources/notion.md), [`apple-notes-freeform.md`](../research/sources/apple-notes-freeform.md),
[`samsung-notes-nebo-other.md`](../research/sources/samsung-notes-nebo-other.md),
[`procreate.md`](../research/sources/procreate.md),
[`concepts-linea-paper-fresco.md`](../research/sources/concepts-linea-paper-fresco.md). Capability and platform
evidence: [`apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md),
[`android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md),
[`web-stylus-and-pwa-capabilities.md`](../research/sources/web-stylus-and-pwa-capabilities.md),
[`flutter-ink-stack.md`](../research/sources/flutter-ink-stack.md),
[`local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md),
[`security-standards-and-devsecops.md`](../research/sources/security-standards-and-devsecops.md),
[`handwriting-recognition-ai-and-ml.md`](../research/sources/handwriting-recognition-ai-and-ml.md),
[`pdf-and-audio-technology.md`](../research/sources/pdf-and-audio-technology.md),
[`accessibility-i18n-and-inclusive-design.md`](../research/sources/accessibility-i18n-and-inclusive-design.md),
[`pricing-monetization-and-student-verification.md`](../research/sources/pricing-monetization-and-student-verification.md).
