# Note-Taking & PDF-Annotation Apps: User Pain Points and Market Gaps

**Prepared for:** Sane Notes product strategy
**Date:** 2026-09-13
**Scope:** GoodNotes, Notability, OneNote, Notion, Samsung Notes, Obsidian/Logseq/Anytype, Apple Notes/Freeform, plus adjacent tools (RemNote, Nebo, Whisper-based transcribers). Evidence drawn from Reddit (r/GoodNotes, r/Notion, r/OneNote, r/ipad, r/GalaxyTab, r/samsungnotes, r/ObsidianMD, r/notabilityapp), official support/feedback forums, Microsoft/Apple docs, and comparison blogs (Paperlike, AFFiNE, BeingPaperless, SwitchToiPad).

> **Method note on sourcing.** Live web search quota for this session was exhausted, so discovery was done through a search-reader proxy (DuckDuckGo HTML via `r.jina.ai`) and pages were read the same way. Reddit itself returns a login wall to automated fetches, so Reddit complaints below are cited from **search-result snippets that quote the threads verbatim** rather than from the rendered threads; the thread URLs are given so a human can confirm. Comparison-blog and official-doc pages were read in full. Aggregator "complaint tracker" sites (e.g. RealNewsToday) are treated as low-confidence and marked **(unverified)**. Every feature claim traces to a fetched page or a quoted snippet; anything I could not confirm is marked **(unverified)**.

---

## Executive summary

The incumbent note apps have hardened into two archetypes, each with a structural weakness:

1. **Ink-first apps (GoodNotes, Notability, Samsung Notes)** nail the pen experience but treat notes as *documents* — siloed, weakly linked, locked in proprietary formats, and only recently (and partially) cross-platform. Their sync layers are the single most-complained-about surface, and both major players monetize through paywalled OCR/search plus (in Notability's case) a subscription pivot that permanently damaged trust.
2. **Structure-first apps (Notion, OneNote, Obsidian)** nail organization, linking, and cross-platform reach but have **no credible handwriting story** — Notion has none at all, OneNote's ink search is Windows-only, and Obsidian users are stuck bolting on OCR pipelines.

Nobody owns the intersection: **fast, expressive ink + real knowledge structure (links/graph/tags) + trustworthy local-first sync + honest pricing + genuine cross-platform parity.** That intersection is Sane Notes' opening.

---

## Ranked list of gaps

Ranked by a blend of complaint intensity, how many apps share the weakness, and how defensible a fix would be.

### 1. Sync is fragile and silently loses data (highest-intensity complaint across every app)
Sync is the number-one recurring pain and the one that makes users churn or lose trust outright.

- **GoodNotes:** an October 2023 outage began as "a set of API load tests that inadvertently affected the user management system"; the sign-in outage "did not itself directly impact any account data," but users who "deleted and reinstalled GoodNotes in an attempt to resolve the issue themselves" and "had data that was not fully synced or backed up… result[ed] in loss of that data," and some "inadvertently creat[ed] a new account rather than signing in," disconnecting from documents and subscriptions. Threads like *"Breaking up with GoodNotes for good"* and *"Goodnotes 6 sync not working at all"* echo this.
  - Evidence: goodnotes.com/blog/message-to-community-regarding-service-disruption; reddit.com/r/GoodNotes/comments/16s0l6i; reddit.com/r/GoodNotes/comments/1ftpcl1
- **Notability:** users report catastrophic loss when cloud backup fails: *"My gdrive which was setup as a backup got full and since notability could not sync… it deleted my local notes too,"* losing *"100 plus pages of handwritten notes."*
  - Evidence: surfaced via search snippet (r/notabilityapp / r/Notability threads); realnewstoday.net/complaints/notability **(unverified aggregator)**
- **OneNote:** chronic sync unreliability — *"every single time I use OneNote, I need to manually sync once at the start… and another time after finished"*; sync interruptions "corrupt local cache, creating 'Misplaced Sections'"; Android is "particularly problematic, requiring… force stopping, cache clearing, and app reinstallation."
  - Evidence: reddit.com/r/OneNote (multiple "why is OneNote sync so unreliable" threads); support.microsoft.com OneNote sync docs
- **Samsung Notes:** sync silently stalls; "notes larger than 1GB won't synchronize," and Windows Samsung Notes shows selective sync failures.
  - Evidence: r/samsungnotes; us.community.samsung.com
- **Notion:** offline edits "queue until reconnection but risk being overwritten by conflicting changes… silently overwritten," a documented data-loss hazard.
  - Evidence: search snippet, "Notion Offline Sync Conflicts: A Silent Data Loss Risk"

**Why it's a gap:** every incumbent relies on a central cloud (iCloud, OneDrive, vendor cloud) as the source of truth, and conflict handling is opaque. There is no widely-trusted, conflict-free, local-first sync in the ink space.

### 2. No handwriting knowledge graph — notes don't link to each other (backlinks are missing where ink lives)
The structure-first world (Obsidian/Logseq) is built on backlinks; the ink-first world has none.

- Obsidian users repeatedly ask for handwriting: they want *"a good OCR option where you can scan/import your handwritten notes to obsidian"* and to "link" GoodNotes/Notability notes into a vault, with community consensus that there is *"no good solution"* today.
  - Evidence: reddit.com/r/ObsidianMD/comments/1532t3r; reddit.com/r/ObsidianMD/comments/1364mjh; forum.obsidian.md/t/how-to-use-and-link-handwritten-notes/16719; talk.macpowerusers.com/t/…/37407
- GoodNotes/Notability offer folders and (recently) links to pages, but no networked backlink/graph model over handwritten content.

**Why it's a gap:** the two capabilities users want most — expressive ink and networked knowledge — live in different apps and nobody has fused them.

### 3. Handwriting OCR/search is paywalled, inaccurate, and English-centric
Search of your own handwriting is the feature that makes ink notes as useful as typed ones, and it is broken three ways:

- **Paywalled:** in both GoodNotes and Notability, "free users cannot search handwritten content in either app"; Notability locks "Searching handwritten notes and audio transcripts… behind the subscription tier."
  - Evidence: paperlike.com/blogs/paperlikers-insights/app-review-goodnotes-vs-notability; affine.pro/blog/goodnotes-vs-notability-tips
- **Inaccurate:** users with "fairly legible" writing report it is "never accurately converted to text," acronyms come out "horribly misspelt," handwritten numbers "never come up," and the search "does not pick it up" even with well-spaced letters.
  - Evidence: search snippets from r/GoodNotes handwriting-recognition threads
- **Language-limited:** recognition "only works in english… does not work in my language (dutch)," cannot recognize "more than one language within a single note," a hard barrier for bilingual students.
  - Evidence: r/GoodNotes language threads; support.goodnotes.com feedback forum

### 4. Genuine cross-platform parity does not exist
- **Notability:** "Zero support for Windows or Android. You are locked in" to Apple.
  - Evidence: affine.pro/blog/goodnotes-vs-notability-tips
- **GoodNotes on Android/Windows:** "online-first — meaning you'll need an internet connection for the best experience," and the Windows build is "a 'Progressive Web App' (PWA) wrapper… lacks the smooth performance of the native iPad app." Users on unreliable campus wifi ask whether they can work offline at all; the top feature request is literally *"Ability to work on notebooks Offline."*
  - Evidence: goodnotes.com/blog/goodnotes-android-windows-web; affine.pro/blog/goodnotes-vs-notability-tips; feedback.goodnotes.com (offline notebooks); reddit.com/r/GoodNotes/comments/15x3r1q
- **OneNote:** ink search/ink-to-text exists on Windows but "currently doesn't have built-in OCR for handwriting search" on Android — notes made on Android "won't be searchable until" processed through Windows.
  - Evidence: reddit.com/r/OneNote/comments/1bzesqh; reddit.com/r/GalaxyTab/comments/w9dlwr; techcommunity.microsoft.com/…/4554604

### 5. Export lock-in via proprietary formats
- "None of the digital notetaking apps have a common format… Notability won't be able to read a .goodnotes file and make it editable and vice versa." The `.goodnotes` format "can only be opened in GoodNotes"; exporting to PDF means "you won't be able to edit the handwriting and images etc anymore." Notability adds an `NTB` proprietary format.
  - Evidence: search snippets on export lock-in; paperlike.com comparison

### 6. Subscription/pricing anger and broken trust
- **Notability's 2021 pivot** to freemium/subscription (v11) is still cited as the reason not to trust the app: *"The trust was broken once when Notability tried to force everyone into a subscription payment model (and failing because it violated app store policies)."* The switch restricted editing and iCloud sync behind ~$15/yr and grandfathered existing buyers only until Nov 1, 2022.
  - Evidence: reddit.com/r/ipad/comments/1d8e9of; switchtoipad.com/news/notability-switches-to-subscription-model
- **GoodNotes** free tier is capped at "three notebooks," and OCR/search sits behind Plus/Pro; broader "subscription creep" fatigue is widely reported.
  - Evidence: affine.pro/blog/goodnotes-vs-notability-tips; newsbreak subscription-creep article

### 7. Large-PDF and general performance lag
- GoodNotes lag traced to "low memory" from "large PDFs, multiple images, or fountain pen usage"; Notability threads report "huge lag… no lag in similar apps." Samsung Notes after a Nov 2024 update made "writing with pen… very slow, making it impossible to take quick notes," and the S10+ "hallucinates where it is expecting the pen to end up."
  - Evidence: support.goodnotes.com performance articles; reddit.com/r/notabilityapp/comments/uwzg86; us.community.samsung.com

### 8. Weak/absent real-time collaboration
- **Notability:** "no native real-time collaboration; you share by exporting a PDF or Notability file" — "sharing is view-only," 100 MB file limit.
- **GoodNotes:** has real-time collaboration with "Live Cursor," but "requires at least one participant with an active GoodNotes Pro subscription."
  - Evidence: affine.pro/vs/goodnotes-vs-notability; beingpaperless.com/notability-vs-goodnotes-for-pdf-reading; support.goodnotes.com/hc/en-us/articles/13922131401615
- No incumbent offers lightweight, session-based **shared classroom rooms** for ink; that space is served by generic web whiteboards (Draw.chat, Woo, Educate) rather than a real note app.
  - Evidence: draw.chat; woowhiteboard.com; educateapp.in

### 9. Audio recording is shallow and fragile
- Notability's synced audio "doesn't support background recording while using other applications." GoodNotes support documents "Can I recover an audio recording after GoodNotes crashes?" and "Why can't I see the Audio Recording feature," and users hit record-but-no-playback bugs. Audio quality is "adequate for lectures but insufficient" otherwise, and transcription (where present) is a paid add-on.
  - Evidence: support.goodnotes.com Audio Recording section; support.gingerlabs.com troubleshooting; realnewstoday **(unverified)**

### 10. No version history where users actually need it
- GoodNotes users hit "undo buttons broken," lose the ability to undo after switching notebooks, and ask "Can I access old version of my notes… I made a change accidentally." Recovery today depends on iCloud/Notability-Cloud version history rather than an in-app, per-stroke timeline.
  - Evidence: search snippets on version history; both apps' iCloud version-history docs

### 11. Pen feel: latency, palm rejection, and expressive brushes
- On Android, palm rejection and latency are device/app-dependent and inconsistent (Samsung "Poor Palm Rejection" threads; workaround is disabling finger drawing). Even on iPad, GoodNotes' pen is described as "shaky," its "fountain pen does not write how a fountain pen should," and users want "the features that procreate features" — pressure, tilt, expressive nibs.
  - Evidence: r/samsungnotes palm-rejection threads; search snippets on GoodNotes pen/brush limits

### 12. Templates are limited and awkward to import
- GoodNotes has "limited built-in options," and importing a multi-page PDF template only adds "the first page," pushing users to Etsy/Reddit for planners. Notability has more built-ins but "cannot change page templates individually within a single note."
  - Evidence: search snippets on templates; paperlike.com comparison

### 13. Weak tagging / organization ceilings
- Organization is folder-based; deep tagging and cross-cutting views are thin. Notability "can nest dividers up to six layers deep" but there is no strong tag/metadata layer. (Lower-confidence: specific tagging complaints were sparse in retrieved snippets — **partially unverified**.)
  - Evidence: paperlike.com comparison

### 14. Accessibility is an afterthought for ink
- OneNote and platform OSes document screen-reader support, but **handwritten strokes are inherently invisible to VoiceOver/TalkBack** unless OCR'd, and I found no evidence any ink app exposes handwriting to assistive tech well. Dark mode is inconsistent (GoodNotes "lacks" true dark mode for PDF reading; Notability has it).
  - Evidence: support.microsoft.com OneNote accessibility; beingpaperless.com PDF comparison; general dark-mode accessibility guidance. Handwriting-specific accessibility gap is **inferred/unverified**.

### 15. AI privacy is asserted, not provable
- GoodNotes says AI spellcheck/word-complete "run locally," yet its privacy policy also collects document data "to help… improve GoodNotes AI features," with raw documents "stripped of any personal data before being used for training." Notion doesn't train on content "unless workspace admins explicitly opt in." Users can't independently verify any of this, and the safe-by-architecture option (fully on-device) is offered only by niche apps.
  - Evidence: goodnotes.com/privacy-policy; goodnoteseducation.zendesk.com/…/13933317574031; notion.com/help/notion-ai-security-practices

---

## 20 differentiating feature ideas for Sane Notes

Each idea names the gap it attacks, a one-paragraph rationale grounded in the evidence above, and a rough feasibility note (build complexity, on-device viability, risk).

### 1. Triple-sync capture: ink + audio + on-device transcript, all time-aligned
**Rationale.** Notability pioneered audio-synced notes and later added transcription, but transcription is paywalled, cloud-tied, English-lecture-grade, and can't record in the background; GoodNotes' audio "feels secondary" and lacks Notability's tap-to-seek. No one ties **stroke timestamps + audio waveform + a searchable transcript** into one scrubbable timeline where tapping any word, stroke, or second jumps the other two. This is the "recover the lecture" superpower students actually want.
**Feasibility.** Medium-high. Stroke timestamping is trivial; the hard part is a good on-device ASR model (Whisper-small/medium class runs on modern tablets) and robust background audio. Ship English first, expand languages. Precedent: Whisper Notes, MacWhisper, Geode all do on-device Whisper today.

### 2. Local-first, server-optional sync with CRDT conflict resolution
**Rationale.** Sync is the #1 complaint and the #1 trust-killer (GoodNotes reinstall data loss, Notability backup-deletes-local, OneNote cache corruption, Notion silent overwrite). A **local-first architecture** — the device is the source of truth, edits apply instantly offline, and a CRDT merges changes with no "last write wins" data loss — directly removes the failure mode. Sync can go peer-to-peer or through any storage the user already owns (iCloud/Drive/Dropbox/self-hosted), so there's no Sane-Notes cloud to go down.
**Feasibility.** High effort but proven: CRDT sync engines and local-first patterns are mature (Anytype, Automerge/Yjs ecosystem, the "sync without servers" pattern). The stroke data model must be CRDT-friendly from day one — retrofitting is painful, so this is a foundational decision.

### 3. No-vendor-server privacy mode ("your notes never touch our machines")
**Rationale.** Every incumbent asks users to trust a claim they can't verify (GoodNotes "we strip personal data"; Notion "we don't train unless you opt in"). A mode where **all storage and all AI run on-device or on the user's own cloud**, with a plainly stated "we operate no server that can read your notes," is a credibility moat no VC-backed cloud incumbent can copy without rearchitecting.
**Feasibility.** Medium, and largely a consequence of ideas #1/#2 plus on-device models. The cost is losing some server-side features (heavy AI, web publishing) unless offered as an explicit, opt-in exception.

### 4. Backlinks and a knowledge graph over handwriting
**Rationale.** The clearest unserved intersection: Obsidian users beg to link handwritten notes and there's "no good solution," while ink apps have no networked linking at all. Sane Notes should let a user **draw or select a phrase and link it** to another note/page/anchor, auto-OCR handwriting into link targets, and render an Obsidian-style graph where nodes can be handwritten pages. Backlinks appear as a panel on each page.
**Feasibility.** Medium. Requires reliable OCR (idea #6) to make handwritten anchors linkable and searchable, plus a bidirectional link store. The graph view is well-trodden UI.

### 5. Hybrid canvas: every note is paged *and* infinitely expandable
**Rationale.** Users want both — paged notebooks for structure and infinite canvas for brainstorming — and today they must choose apps or document types (GoodNotes bolted on a separate "Whiteboard" doc type; Notability still has no infinite canvas). Sane Notes should make **one document that starts paged and expands in any direction on demand**, so a lecture page can spill into a mind-map without exporting or converting.
**Feasibility.** Medium-high. The rendering/virtualization challenge is real (GoodNotes warns each stroke on an infinite canvas "uses memory"), so a tiled, level-of-detail canvas with aggressive culling is required for large-PDF-grade performance.

### 6. Best-in-class, on-device, multilingual, free handwriting search
**Rationale.** OCR is paywalled everywhere, inaccurate, and English-only ("only works in english… does not work in… dutch," can't mix two languages in one note). Making **accurate, multi-script, mixed-language handwriting search free and on-device** flips a universal pain into a headline feature and undercuts the paywalls that anger users.
**Feasibility.** Medium-high; this is the technical crown jewel. On-device recognizers (MyScript-class, or a fine-tuned transformer) are viable but multilingual accuracy on messy handwriting is genuinely hard — scope launch languages honestly and let users correct/train.

### 7. Per-stroke version history with a visual timeline
**Rationale.** "I made a change accidentally — can I get the old version back?" and "undo is broken after switching notebooks" are recurring. Because the CRDT model (idea #2) already records operations, Sane Notes can expose a **scrubbable timeline that replays or restores any page to any past state**, per-stroke, offline, with no reliance on iCloud snapshots.
**Feasibility.** Low-medium once the op-log data model exists — it's mostly a byproduct of doing sync right, plus a timeline UI.

### 8. Open, documented, round-trippable file format (anti-lock-in by design)
**Rationale.** ".goodnotes can only be opened in GoodNotes" and there's "no common format" — export means losing editability. Sane Notes should store notes as an **open, documented package (strokes as vector data + embedded PDFs/media + a manifest)** with lossless import/export and a public spec, so users own their data and could rebuild it elsewhere. "You can always leave" is a trust feature and marketing wedge.
**Feasibility.** Low-medium. Mostly a design discipline (use open primitives: SVG/ink-ML-like stroke data, PDF, JSON manifest) plus importers for `.goodnotes`/PDF/`NTB` where legally possible.

### 9. True cross-platform parity, offline-first on Android and Windows
**Rationale.** Notability is Apple-only; GoodNotes on Android/Windows is "online-first" with a PWA-wrapper Windows build users dislike, and offline is the top request. Shipping **native, fully-offline, feature-equal apps on iPad, Android, Windows, Mac** (same file format, same OCR, same everything) turns the incumbents' biggest structural weakness into Sane Notes' baseline promise.
**Feasibility.** High effort (multi-platform native/near-native ink rendering is expensive), but it's a deliberate strategic bet enabled by local-first (idea #2). A shared Rust/C++ ink+sync core with thin native UIs is the pragmatic path.

### 10. Spaced-repetition study mode generated from handwriting
**Rationale.** Students already hack this together (NotesAnkify, RemNote, StudyCards AI, GoogNotes "Study Sets"), which proves demand and shows no native tool does it well end-to-end. Sane Notes should let a user **lasso handwritten Q/A or highlight terms and auto-generate spaced-repetition cards** (SM-2/FSRS) that review *inside* the note context, with the original ink as the card face — no export to Anki required.
**Feasibility.** Medium. Needs OCR (idea #6) and a scheduling algorithm (FSRS is open). The differentiator is keeping the handwriting as the card, not converting it to lossy text.

### 11. Live-computation math/physics notebooks with real units
**Rationale.** Apple Math Notes and Soulver show the appetite for inline computation, but they're calculator-flavored and unit handling is shallow. A **notebook where handwritten or typed expressions evaluate live, carry physical units (m/s, kg, °C), propagate through equations, and flag dimensional errors** would own STEM students and engineers — a segment the ink incumbents ignore.
**Feasibility.** Medium. A units-aware CAS (open engines exist) plus handwriting-to-math OCR (the hardest part; MyScript-class). Ship typed-math-with-units first, add ink-math second.

### 12. Lightweight shared classroom rooms
**Rationale.** Real-time collaboration is absent (Notability) or subscription-gated (GoodNotes Pro), and education collaboration is served by generic whiteboards outside any note app. A **join-by-link "room"** where a teacher's page streams live to students, students can annotate their own synced copy, and the session is saved to everyone's library, fills a gap Draw.chat/Woo only half-serve (they're ephemeral and not real note apps).
**Feasibility.** Medium-high. Real-time multi-user ink needs a presence/relay service, which slightly tensions with the no-server ethos — solve by making rooms an explicit opt-in relay (ephemeral, E2E-encrypted) separate from personal sync.

### 13. Pen-brush studio: expressive, physically-plausible ink
**Rationale.** Users want Procreate-grade expression in a note app — real fountain-pen thin-up/thick-down strokes, pressure, tilt, custom nibs — and complain GoodNotes' pen is "shaky" and its fountain pen wrong. A **tunable brush engine** (pressure/tilt/velocity curves, nib shapes, ink bleed) makes writing feel good, which is the whole point of an ink app, and attracts the sketch-note/bullet-journal crowd.
**Feasibility.** Medium. Brush engines are well-understood; the challenge is doing it at low latency across platforms. Pairs naturally with a predicted-stroke latency-compensation layer.

### 14. Predictive low-latency ink with per-device tuning
**Rationale.** Latency and palm rejection are inconsistent on Android and even criticized on some iPads/Samsung tablets ("hallucinates where the pen will end up"). A **motion-prediction + adaptive palm-rejection layer**, tuned per device/stylus, makes even mid-range Android tablets feel premium — turning the incumbents' Android weakness into Sane Notes' Android strength.
**Feasibility.** Medium. Stroke prediction is known art (Apple/Samsung do it at OS level; app-level prediction is feasible). Requires real device testing across the Android fragmentation surface.

### 15. Reliable, transparent audio with background capture and recovery
**Rationale.** Audio is fragile everywhere (no background recording in Notability; GoodNotes crash-loss and hidden controls). Sane Notes should offer **rock-solid background recording, continuous crash-safe journaling of audio to disk, and one-tap recovery**, plus the on-device transcript from idea #1 — directly answering "can I recover a recording after a crash?"
**Feasibility.** Low-medium. Mostly disciplined engineering (write-ahead audio buffers, OS background-audio entitlements). High reliability payoff for modest cost.

### 16. Provable on-device AI with a visible "offline AI" indicator
**Rationale.** AI privacy today is a promise. Sane Notes should run its assistant (summaries, cleanup, Q&A over your notes) **on-device by default**, show a clear indicator when anything would leave the device, and require explicit opt-in for any cloud call. "Your notes are never used to train anything, and here's the switch that proves nothing leaves your tablet" is a differentiator against GoodNotes'/Notion's unverifiable claims.
**Feasibility.** Medium. Small on-device LLMs (a few-billion-param class) now summarize and answer over local text acceptably; heavier tasks stay opt-in cloud. Complexity is model size vs. device RAM.

### 17. Semantic, cross-note search over ink + audio + PDF text
**Rationale.** Current search is literal, paywalled, and English-only. Once notes are OCR'd and audio transcribed on-device (ideas #1/#6), Sane Notes can offer **free semantic search that spans handwriting, transcripts, and PDF text at once** — "find where I discussed eigenvalues," whether it was written, spoken, or in an imported paper.
**Feasibility.** Medium. On-device embedding models + a local vector index are viable; the work is indexing pipeline and keeping it incremental/battery-friendly.

### 18. First-class large-PDF engine (annotate 1,000-page textbooks smoothly)
**Rationale.** Large PDFs are a documented performance cliff (GoodNotes low-memory lag, Notability "huge lag"), and heavy annotators (law/med students, researchers) are underserved. A **tiled, GPU-accelerated PDF renderer with lazy loading, recognized outlines, and fast text-snap highlighting** (Notability snaps highlights; GoodNotes recognizes outlines — do both, better) targets exactly the users incumbents frustrate.
**Feasibility.** Medium-high. Mature PDF libs exist; the engineering is virtualization and annotation-layer compositing so ink stays smooth over huge documents.

### 19. Rich metadata: tags, properties, and saved smart views
**Rationale.** Organization tops out at folders/dividers; there's no strong tag/query layer (Notability's six-level dividers are still a tree). Borrowing from Notion/Obsidian, Sane Notes should let pages carry **tags and typed properties (course, date, status) and build saved "smart views"** (e.g. "all Physics pages tagged #exam from this month"), giving ink notes database-like retrieval. *(Direct tagging complaints were thin in sources — this is an inferred, high-value gap rather than a heavily-voiced one.)*
**Feasibility.** Low-medium. A metadata layer + query UI on top of the note store; no novel tech.

### 20. Accessibility-native ink: handwriting exposed to screen readers, plus vision-friendly modes
**Rationale.** Handwritten strokes are invisible to VoiceOver/TalkBack unless OCR'd, and no ink app appears to solve this; dark mode is inconsistent. Because Sane Notes OCRs on-device, it can **feed recognized text to assistive tech, offer high-contrast/true-dark reading, reflow/zoom, and dyslexia-friendly fonts for typed content** — making it the first genuinely accessible handwriting app and opening institutional/education procurement that requires accessibility compliance.
**Feasibility.** Medium. Leans on OCR (idea #6) plus platform accessibility APIs and careful contrast/token work. The handwriting-to-a11y bridge is novel but tractable; broader a11y is standard practice most competitors simply skipped. *(The specific "no ink app exposes handwriting to screen readers" claim is inferred from absence of evidence — treat as **unverified**.)*

---

## Cross-cutting strategic read

- **Trust is the wedge.** The two loudest, most emotional complaints — sync/data loss and the Notability subscription betrayal — are both *trust* failures. Local-first sync (#2), no-vendor-server privacy (#3), open format (#8), and honest pricing are a coherent trust platform that incumbents structurally cannot match without abandoning their cloud/subscription businesses.
- **On-device AI is the enabling technology.** Ideas #1, #6, #16, #17, #20 all depend on good on-device models. Investing early in an efficient on-device ink-OCR + ASR + small-LLM stack unlocks half the differentiators *and* the privacy story simultaneously.
- **The intersection nobody owns:** expressive ink (#13/#14) + knowledge structure (#4/#19) + trustworthy sync (#2) + free/on-device search (#6/#17) + real cross-platform (#9). Winning even three of these five convincingly would already position Sane Notes ahead of any single incumbent.
- **Sequencing suggestion.** Foundational first: local-first CRDT store + open format + cross-platform core (#2, #8, #9) and low-latency expressive ink (#13, #14). Then the search/AI layer (#6, #1, #17). Then knowledge structure and study/STEM verticals (#4, #10, #11). Collaboration rooms (#12) and full accessibility (#20) as differentiating follow-ons.

---

## Sources

**Read in full (content fetched via reader proxy):**
- GoodNotes — Message to Community regarding service disruption: https://www.goodnotes.com/blog/message-to-community-regarding-service-disruption
- GoodNotes goes cross-platform (Android/Windows/Web, "online-first"): https://www.goodnotes.com/blog/goodnotes-android-windows-web
- Paperlike — GoodNotes vs Notability app review: https://paperlike.com/blogs/paperlikers-insights/app-review-goodnotes-vs-notability
- AFFiNE — Goodnotes 6 vs Notability, 30-day test: https://affine.pro/blog/goodnotes-vs-notability-tips
- AFFiNE — Goodnotes vs Notability (collaboration): https://affine.pro/vs/goodnotes-vs-notability
- BeingPaperless — Notability vs GoodNotes for PDF reading: https://beingpaperless.com/notability-vs-goodnotes-for-pdf-reading/
- SwitchToiPad — Notability switches to subscription model: https://switchtoipad.com/news/notability-switches-to-subscription-model/

**Official docs / policies referenced:**
- GoodNotes Support — Sync, Backup, Restore: https://support.goodnotes.com/hc/en-us/sections/7352611553679-Sync-Backup-and-Restore
- GoodNotes Support — Known issues: https://support.goodnotes.com/hc/en-us/articles/7616133760655-Known-issues-of-Goodnotes
- GoodNotes Support — Offline Editing FAQ (Android/Windows/Web): https://support.goodnotes.com/hc/en-us/articles/8643088459791-Offline-Editing-FAQ-for-Android-Windows-and-Web
- GoodNotes Support — cross-platform FAQs: https://support.goodnotes.com/hc/en-us/articles/7378735557519
- GoodNotes Support — Real-time collaboration: https://support.goodnotes.com/hc/en-us/articles/13922131401615
- GoodNotes Support — Audio Recording section: https://support.goodnotes.com/hc/en-us/sections/7352612399631-Audio-Recording
- GoodNotes feedback forum — Ability to work on notebooks offline: https://feedback.goodnotes.com/ (Ideas for improving Goodnotes)
- GoodNotes Privacy Policy: https://www.goodnotes.com/privacy-policy
- GoodNotes AI FAQs: https://goodnoteseducation.zendesk.com/hc/en-us/articles/13933317574031
- Notion — Notion AI security & privacy practices: https://www.notion.com/help/notion-ai-security-practices
- Microsoft Support — OneNote sync guidance; Take handwritten notes in OneNote for Android: https://support.microsoft.com/en-us/onenote/take-handwritten-notes-in-onenote-for-android
- Microsoft Learn — OneNote Android handwriting recognition Q&A: https://learn.microsoft.com/en-us/answers/questions/5336145/
- Microsoft Tech Community — OneNote cannot search for handwriting: https://techcommunity.microsoft.com/discussions/microsoft-365/onenote-cannot-search-for-handwriting/4554604
- Microsoft Support — Accessibility tools for OneNote: https://support.microsoft.com/en-us/accessibility/onenote/accessibility-tools-for-onenote
- Apple Support — Solve math with Math Notes: https://support.apple.com/guide/iphone/solve-math-with-math-notes-iph46efa613a/ios

**Community threads (cited from verbatim search-result snippets; Reddit blocks automated fetch):**
- r/GoodNotes — Breaking up with GoodNotes for good: https://www.reddit.com/r/GoodNotes/comments/16s0l6i/
- r/GoodNotes — Goodnotes 6 sync not working at all: https://www.reddit.com/r/GoodNotes/comments/1ftpcl1/
- r/GoodNotes — Android version, is it possible to work offline: https://www.reddit.com/r/GoodNotes/comments/15x3r1q/
- r/GoodNotes — Best cross-platform GN alternative: https://www.reddit.com/r/GoodNotes/comments/15wogu0/
- r/GoodNotes — Goodnotes privacy concerns: https://www.reddit.com/r/GoodNotes/comments/158l68r/
- r/ipad — A quick reminder that you shouldn't use or recommend Notability: https://www.reddit.com/r/ipad/comments/1d8e9of/
- r/ipad — Should I buy the Notability subscription: https://www.reddit.com/r/ipad/comments/17dndap/
- r/notabilityapp — Huge lag issues in Notability (no lag in similar apps): https://www.reddit.com/r/notabilityapp/comments/uwzg86/
- r/OneNote — Handwritten notes are not searchable: https://www.reddit.com/r/OneNote/comments/1bzesqh/
- r/GalaxyTab — Does OneNote not do ink to text on Android: https://www.reddit.com/r/GalaxyTab/comments/w9dlwr/
- r/Notion — Handwriting support, when?: https://www.reddit.com/r/Notion/comments/svo4gm/
- r/Notion — Are we ever getting handwriting functionality?: https://www.reddit.com/r/Notion/comments/1fi4vcc/
- r/Notion — I wish there was an option to use a stylus: https://www.reddit.com/r/Notion/comments/gyvmz3/
- r/ObsidianMD — Handwriting notes in Obsidian: https://www.reddit.com/r/ObsidianMD/comments/1532t3r/
- r/ObsidianMD — Handwritten notes on Obsidian / link your hand-written notes: https://www.reddit.com/r/ObsidianMD/comments/1364mjh/
- Obsidian Forum — How to use and link handwritten notes: https://forum.obsidian.md/t/how-to-use-and-link-handwritten-notes/16719
- MacPowerUsers — Harnessing handwritten notes in Obsidian (e-ink workflow): https://talk.macpowerusers.com/t/harnessing-handwritten-notes-in-obsidian-an-e-ink-workflow/37407
- Samsung Community — Samsung Notes pen writing lag after Nov 2024 update: https://us.community.samsung.com/
- r/samsungnotes — palm rejection / sync / latency threads: https://www.reddit.com/r/samsungnotes/

**Ecosystem / adjacent tools (for differentiator feasibility):**
- Anytype (local-first, data on device): https://anytype.io
- MyFlexNote — Best local-first note-taking apps 2026 (Obsidian/Logseq/Anytype/Joplin/Standard Notes): https://myflexnote.com/blog/best-local-first-note-taking-apps
- RemNote — Flashcards from handwritten notes: https://remnote.com/feature/flashcards-from-handwritten-notes
- NotesAnkify — handwritten notes to Anki: https://notesankify.com/docs/
- StudyCards AI — Can GoodNotes convert notes to flashcards: https://studycardsai.com/blog/can-goodnotes-convert-notes-to-flashcards
- Whisper Notes (on-device transcription): https://whispernotes.app
- OpenWhispr (local Whisper, zero internet): https://openwhispr.com
- Draw.chat (classroom whiteboard): https://draw.chat/
- Woo Whiteboard: https://woowhiteboard.com/
- Educate App — real-time collaborative whiteboard: https://educateapp.in/features/real-time-collaborative-whiteboard-educate-app

**Low-confidence aggregators (marked unverified in text):**
- RealNewsToday — Notability complaints tracker: https://realnewstoday.net/complaints/notability
