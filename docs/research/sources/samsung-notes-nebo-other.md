# Competitive Research: Samsung Notes, Nebo (MyScript Notes), and the PDF‑Study Field

Prepared for the Sane Notes team. Every claim below traces to a fetched official page, an App/Play Store listing, or a review/forum thread (see **Sources**). Items I could not fully confirm are marked **(unverified)**.

---

## 1. Samsung Notes (Galaxy Tab S‑series + S Pen, One UI 6/7/8)

Samsung's first‑party note app, bundled free on every Galaxy phone/tablet. It is the reference "stylus‑native" note experience for Android and the app Sane Notes is most likely to be compared against on Galaxy hardware. Its power depends heavily on the device tier (S Pen model, One UI version, Galaxy AI eligibility).

### Organization & library
- **Folders and subfolders** with color customization and rename; notes moved via a **Move** function. Deleting a folder deletes its contents.
- **Favorites** section with **Pin favorites to top**.
- **Sort** by **Title, Date created, Date modified**; a **Filter** icon sorts by date created.
- **Categories** for grouping; **Trash** for recovery.
- General **Search** by title/subject. **No user tags** and **no dedicated handwriting‑search filter** documented — a real gap versus competitors.
- **Add to Home screen** shortcut for a specific note; reminder scheduling on a note.

### Handwriting & ink tools
- S Pen writing on compatible models; **Pen, Highlighter, Eraser** are the core tools.
- **Handwriting help mode**: on‑screen guidelines that correct letter shapes and align letters as you write.
- **Straighten / Clean up**: a single tap straightens messy handwriting; alignment and letter‑straightening are part of the "S Pen to text" cleanup pipeline (One UI 6.1+).
- **Quick highlight** text selection — **Note series only** (feature‑gated by hardware).
- Pressure sensitivity and tilt are handled by the S Pen digitizer (Wacom EMR); specific nib‑shape and tilt‑shading controls are not documented on the support pages **(unverified — likely limited vs. Procreate‑class ink engines)**.
- **Zoom in/out** pinch; **Action icons** auto‑detect phone numbers, emails, equations, and websites in handwriting.

### Text & typing
- Keyboard typing with a **Title** field; mixes typed and handwritten content.
- **Auto format** into **Headers and bullets** or **Meeting notes** structures (AI).
- **Checklists**, headers, and bullets via formatting; rich‑text formatting toolbar. Tables and Markdown are **not documented** as native features **(unverified)**.

### Audio
- **Voice recording** inside a note.
- **Synced recording**: writing with the S Pen while recording links the handwriting timeline to the audio timeline — tapping a portion of the written notes plays back the corresponding audio moment. This is the classic **audio bookmark** feature ("never trawl through a recording to find a moment again").
- **Text transcripts** of recordings and **Transcript Assist** to view transcripts inside the note (Galaxy AI, One UI 6.1+).
- **Listen Brief** — on‑device text‑to‑speech that reads a summary aloud (One UI 8).

### PDF & documents
- **Import PDF** from the Create‑note menu; annotate with text, S Pen drawing/handwriting, and S Pen‑to‑text.
- **Export**: notes (including annotated PDFs) export as **PDF, Microsoft Word, PowerPoint, image, or text**.
- **PDF translation** of entire documents inside a note (AI) — but **translated PDFs cannot be saved in translated state** and do not sync/back up.
- **Hard limitations**: imported/exported PDFs **cannot be edited** (only ink and text added); **orientation must match** (a portrait PDF can't be inserted into a landscape default, and vice‑versa); **no PDF outline/bookmark viewing**; forms/hyperlink fidelity not supported.

### Images, media & stickers
- Insert images from Gallery, My Files, or cloud.
- **Sticky notes** with customizable background colors (AI cover/sticky styling).
- Dedicated sticker packs are not a documented first‑party feature **(unverified)**.

### Templates, paper types & covers
- **Twelve page templates** (grids, lined, etc.); a template can be applied before or after writing, and existing content reflows to the chosen template.
- **Template tab** sets a default; **Color tab** sets a default background color.
- **Note Covers** — customizable, with **Pattern / Illustration / Text** options, and **AI‑generated covers**.

### Search, OCR & handwriting recognition
- **S Pen to text** conversion (handwriting → editable text), improved in One UI 6.1+ with auto‑format, summarize, spell‑check, and clean‑up.
- Handwriting search inside notes is weak/undocumented; exported PDFs are reportedly rasterized (see complaints).

### Math & conversion
- **Math Solver**: write an equation with the S Pen ending in an equal sign and it is solved.
- Handwriting → text conversion as above.

### AI features (Note Assist / Galaxy AI)
- **Summarize** (Standard / Detailed; requires ≥200 characters, up to 4,000).
- **Auto format** (Headers & bullets / Meeting notes).
- **Spelling & grammar**.
- **Translate** notes (add languages) and **PDF translation**.
- **Composer** (change format/tone), **Writing style** presets, **Chat translation** — One UI 7 freed these "writing assist" tools to work on *any selected text* in Notes, not just via Samsung Keyboard.
- **Transcript Assist**, **Listen Brief**, **AI Note Covers**, **Interpreter** (real‑time conversation translation with clipboard copy).
- Requirements: Galaxy account + internet for most features; **One UI 6.1+ / Android 14+**; some features One UI 8 only. Newer One UI versions let AI features run **without a stylus** (finger works).

### Sync, backup & offline
- **Samsung Cloud** sync across Galaxy phone/tablet/PC.
- **Microsoft OneNote** integration/import; import from Samsung account and other sources.
- Automatic saving; Wi‑Fi or mobile‑data sync options.
- Offline note‑taking works; sync requires account. Heavily **Samsung‑ecosystem locked** — no first‑class iOS/web client.

### Sharing, export, links, publishing
- **Share** via email, text, etc.; export formats as above (PDF/Word/PPT/image/text).
- No public "publish to web link" feature documented.

### Collaboration & comments
- **No real‑time multi‑user collaboration** documented — a notable gap.

### Presentation / whiteboard / multi‑window / split view
- Works in Samsung DeX and Android split‑screen/multi‑window **(unverified as an in‑app feature)**; pairs with **Samsung Notes on PC** and the separate **Samsung Notes / Infinite canvas** style pages.

### Stylus gestures (S Pen)
- **Air actions** (Bluetooth S Pen on Tab S7/S8/S9/S10, Note series, S21–S24 Ultra): flick up/down/left/right or clockwise/counter‑clockwise while holding the pen button; also single/double click. Used for page turns, tool switching, camera shutter, etc.
- **Air command** hover menu (hover pen over the blue icon) → **Create note** and other shortcuts; memos auto‑save to Samsung Notes.
- **Hover** preview; **palm rejection** and wrist protection are standard on Galaxy Tab hardware **(unverified as an in‑app toggle)**.

### Keyboard shortcuts
- Works with Book Cover Keyboard / Bluetooth keyboards; a documented shortcut list was not found **(unverified)**.

### Platforms & per‑platform differences
- **Android (Galaxy only)** + **Windows** (Samsung Notes for PC). No iOS/macOS/web. Many features gated by device tier: **Quick highlight = Note series**; **Air actions = specific flagships**; **Galaxy AI = One UI 6.1+ eligible devices**.

### Accessibility
- **Listen Brief** TTS (One UI 8); inherits Android/One UI accessibility (TalkBack, font scaling) **(unverified in‑app specifics)**.

### Localization
- Broad One UI localization; AI translate covers many languages **(exact count unverified)**.

### Pricing & plans
- **Free** with the device. Galaxy AI features were free through 2025 with a stated possibility of future charges **(unverified current status in 2026)**.

### Privacy & security
- **Lock** with password (requires Samsung account); **note unlock methods** and **change password** in settings.
- Cloud data stored in Samsung Cloud; some AI features process on‑device (Listen Brief TTS), others require server/internet.

### Known complaints / weaknesses (cited)
- **Exported PDFs pixelated / letters exported as images → unsearchable** (community reports).
- **Windows app RAM hog** (6–8 GB while syncing) and **won't download more than ~⅓ of notes**; recurring "cannot synchronize / keep two versions?" conflict prompts.
- **Ecosystem lock‑in**: Samsung‑only; imported PDFs can't be edited elsewhere; no reliable cross‑platform backup.
- **"Save to file" disappears when selecting all notes.**
- **No PDF outline view, no note outlines, no custom‑font handwriting‑to‑text, no math box (older versions), speech‑to‑text gaps** on some devices.

---

## 2. Nebo — now "MyScript Notes" (by MyScript)

The handwriting‑recognition leader, powered by **Interactive Ink**. Rebranded from *Nebo* to **MyScript Notes** (App Store: *"MyScript Notes: AI Handwriting App (formerly Nebo)"*, v7.5.0, **4.7★ / 39K ratings**). Best‑in‑class conversion; comparatively lighter on organization, media, and audio.

### Organization & library
- Three page types: **Notebooks** (fixed‑size pages, custom covers/backgrounds), **Documents** (structured, auto‑reflowing content with titles/checklists), and **Boards** (expandable/infinite canvas). Plus **PDFs** as multi‑page imports.
- **Global search** across the entire library **including handwritten content**.
- **Trash / recovery** for notes, folders, collections.
- Organization is comparatively shallow — reviewers call the **~three‑level hierarchy insufficient** for heavy users.

### Handwriting & ink tools
- **Interactive Ink** with **Intelligent Character Recognition (ICR)** — widely praised as the best in the field, handling cursive and "super‑sloppy" writing.
- **Pen gestures**: **scratch‑to‑erase**, **draw a line to split/merge words**, **frame content to highlight**, underline to emphasize.
- **Perfect shapes**: draw a shape → convert to a clean form; **interactive diagrams** (hand‑drawn diagram → editable connected shapes).
- **Lasso**: freehand or rectangle. **Weakness**: on **Documents** the lasso is largely redundant (it just triggers the OS text ribbon) and **can't move/resize** items — much weaker than on Boards/Notebooks.
- Active‑pen strongly recommended for precision; also supports typing + dictation.

### Text & typing
- **Convert as you write** vs on‑demand conversion; live **conversion preview**.
- **Documents** auto‑structure: titles, headings, **checklists**, bullet lists, reflowing paragraphs.
- **Custom dictionary** to add words and tune recognition.
- Editing typed text has friction (reviewers: you must type first, then modify).

### Audio
- **No audio recording / no synced audio playback** — a repeatedly cited gap on both iOS and Android.

### PDF & documents
- Import files as **multi‑page PDFs**; annotate with ink and text.
- v7.5.0 added **faster PDF loading**, **search by note name**, and **import multiple PDFs at once**.
- Complaint: **can't insert a single PDF page into an existing text document**.

### Images, media & stickers
- **Image annotation**: insert, crop, mark up photos/sketches. No dedicated sticker store.

### Templates, paper types & covers
- **Custom covers and page backgrounds** on Notebooks. Template ecosystem is minimal vs. Goodnotes/Noteshelf/Kilonotes.

### Search, OCR & handwriting recognition (languages)
- **66 recognition languages** (Afrikaans, Chinese, English, French, German, Japanese, Korean, Russian, Spanish, +57 more).
- Constraint: **one recognition language per note** (English always co‑recognized). **No Hebrew/Arabic/Farsi/Urdu** (RTL layout limitation).
- Both handwritten and typed content are searchable.

### Math & conversion
- **Math block**: write equations → convert and **solve** ("develop equations"), simple calculations.
- Also converts **diagrams/shapes** and text. (MyScript's core tech also recognizes musical notation in the SDK, though not all surfaced in Notes.)

### AI features
- **Summarize**, **Explain** (define terms/phrases), **Quiz generation**, **Chat** (converse with notes), **Study Sets** (interactive revision).
- **Platform gating**: full AI on **iOS**; **Android** has Summarize/Explain/Quiz but **Study Sets / Chat are iOS‑only** ("coming soon on Android"). AI features are **paid‑tier only**.

### Sync, backup & offline
- **iCloud, Google Drive, Dropbox**; auto‑sync (manual toggle in Settings). Up to **10 devices** across platforms.
- **Free tier has no cloud sync**; complaint that **background sync isn't default** on iOS, causing lost work when users forget to sync manually.

### Sharing, export, links, publishing
- Export **PDF, PNG, SVG, Word (DOCX), and the native Nebo format**; copy/paste across pages and apps.

### Collaboration & comments
- **No real‑time collaboration** documented.

### Presentation / whiteboard / multi‑window
- **Boards** provide an infinite whiteboard‑style canvas; standard OS multitasking otherwise.

### Stylus gestures
- Pen gestures for editing (scratch/split/merge/frame); relies on OS palm rejection. Apple Pencil hover/double‑tap/squeeze support is standard on iPad **(unverified in‑app mapping)**.

### Keyboard shortcuts
- Not documented **(unverified)**.

### Platforms & per‑platform differences
- **iOS/iPadOS** (full feature set, Apple Pencil, Apple Silicon Macs via M1/M2), **Android**, and **Windows** (still branded **Nebo**). AI parity favors iOS; Windows sold separately.

### Accessibility
- **Dark mode**; general OS accessibility **(unverified in‑app specifics)**.

### Localization
- **11 UI languages** (English, French, German, Italian, Portuguese, Spanish, Russian, Japanese, Korean, Simplified & Traditional Chinese).

### Pricing & plans (2026)
- **Free**: notebooks up to **5 pages each**, **no cloud sync, no AI**.
- **Subscription** ~**$1.99/month** or **$7.99/year**; **Lifetime $24.99** (one‑time, incl. future updates).
- **7‑day free trial** of all features; **legacy Nebo buyers keep lifetime access free**.

### Privacy & security
- Directs users to a Privacy & Analytics section; specifics (encryption, note passwords) **not detailed / (unverified)**.

### Known complaints / weaknesses (cited)
- **No audio recording**; **weak organization** (shallow hierarchy, hard to review earlier content on infinite scroll).
- **Lasso is near‑useless on Documents**; **typed‑text editing friction**; **can't insert single PDF pages into text docs**.
- **Manual‑sync data‑loss reports**; **Enter key sometimes spawns a stray new text bubble** (bug).
- **Android AI lag** behind iOS; Android also historically lacked **custom .ttf fonts, audio, lasso‑crop, text boxes, and web links**.

---

## 3. The PDF‑study / handwriting field (brief)

### Noteshelf 3 (FluidTouch / MWM)
- **Known for**: gorgeous templates (**200+**), realistic pens, and a mature AI layer.
- **Handwriting**: 4 pen styles (ball, felt, fountain, pencil) with pressure; **handwriting‑to‑text in 65 languages**.
- **Audio**: record on pages; **real‑time transcription** into searchable text (iOS 26); **but no synced audio‑to‑ink playback** (weakness).
- **AI**: summarize, outline, translate, explain topics, and **generate notes in your own approximated handwriting**.
- **Organization**: notebooks, nested folders/groups, **tags**, color‑coded bookmarks, table of contents, content search; **customizable toolbar**.
- **Pricing**: Apple **subscription** ($7.99/wk, $9.99/mo, $29.99/yr); Android **$9.99 one‑time**, Windows **$7.99 one‑time**.
- **Weaknesses**: enlarged strokes look **blurry** (vector claim questioned); clunky page‑moving between notebooks; **no cross‑ecosystem sync** (Apple↔Android impossible); no audio‑text sync.

### Notewise
- **Known for**: an AI‑first freeform canvas; 6M+ users, **2025 Apple Design Award nominee**.
- **Features**: handwriting, PDF annotation, sketching, audio recording, **instant audio transcripts**, **guided podcast generation**, **chat with notes**, summarize, search handwritten content, "a living AI note that writes itself" from captured audio/text/handwriting/docs/images.
- **Ink**: ultra‑low‑latency, pressure pens, smooth highlighters, **stroke stabilization**, **smart shape assist**, reliable palm rejection.
- **Collaboration**: **real‑time collaboration in shared notebooks**; sync across iPad/iPhone/web; offline‑first.
- **Privacy**: "privacy‑first, no ads, no data selling."

### Kilonotes (Topstack)
- **Known for**: templates, **stickers, covers**, fonts — student/creative aesthetic.
- **Features**: paper templates (blank/dot/graph), custom covers, PDF import + annotation + export, audio, images; move/scale/rotate handwriting, adjustable eraser.
- **Free tier** exists but adds a **watermark + ads** and locks premium content.

### Penbook
- **Known for**: **~1,000 paper/stationery types** (lined, graph, calendars, habit trackers, music tab, storyboards, sheet music, engineering paper, dev tools) with real‑world variations, plus **Live Paper**.
- **Features**: unlimited cover combinations, **search handwriting**, **shape recognition (snap strokes)**, PDF import/annotate. iPad/iPhone (and a separate Windows product).

### Flexcil
- **Known for**: **gesture‑based excerpting** — drag selected PDF text/images straight into a linked study note.
- **Features**: markup PDFs, **merge PDFs / edit pages / outlines / bookmarks**, split view (1/2/4 pages), **vector ink**, pen set (**squared/round highlighter, dotted pen, straight‑line pen, fountain pen, shape tool**), sticky notes, **reference links** between docs, **audio recording synced with handwriting**, **content‑hiding study/memorization mode**, save images as stickers, templates/planners.
- **Cloud**: Box, Google Drive, iCloud, Dropbox, OneDrive. **Platforms**: iPad + Android.

### LiquidText
- **Known for**: spatial research workspace — **pinch pages together to connect**, **drag out excerpts**, **gather highlights**, comparisons across documents, "search without losing context."
- **Export**: PDF and DOCX; ink/highlight/margin notes; touch/pen/mouse.
- **Platforms**: iPadOS, Windows 10, macOS. **LiquidText LIVE** adds real‑time project sync, cloud backup, multi‑device.
- **Pricing**: Basic **free** (has annotation, unlike MarginNote free); **Live ~$3.99–4.99/mo**, **Live Unlimited ~$5.99–7.99/mo**; **Pro $79.99 one‑time per platform**.

### MarginNote 4
- **Known for**: turning reading into **mind maps + flashcards** with spaced repetition.
- **Features**: PDF/EPUB/web/video; highlights **auto‑become cards**; mind‑map styles (**tree, fishbone, timeline, concept map, matrix**); outline; **bidirectional links** card↔source; **wiki‑style card links + global search**; **OCR for equations, tables, handwriting**; **FSRS spaced repetition**; **Immersive Recall** study mode; **AI** to summarize chapters, surface key terms, generate quizzes.
- **Platforms**: iPad/Mac/iPhone, iCloud sync. **Pricing**: **Max Annual $16.99/yr** (500 AI credits/mo) or **Max Lifetime $51.99** (AI credits only for first 3 years); 14‑day trial. Free version is basically just an e‑reader.

---

## What Sane Notes must match (table stakes)

| Capability | Why it's table stakes | Set by |
|---|---|---|
| Low‑latency pressure/tilt ink with palm rejection, smoothing/stabilization, smart shape‑snap | Baseline of every serious app | Samsung, Notewise, all |
| Pen gestures: scratch‑to‑erase, lasso (move/resize/duplicate), highlighter, per‑stroke restyle | Expected editing model | Nebo, Samsung |
| Handwriting → text OCR in many languages + **search of handwritten content** | Core differentiator competitors already ship (Nebo 66, Noteshelf 65) | Nebo, Noteshelf |
| Math recognition + solve | Standard in Nebo, Samsung, MarginNote | Nebo/Samsung |
| PDF import, ink/text annotation, faithful export (PDF/DOCX/PNG) **that stays searchable** | Samsung's rasterized export is a known failure to avoid | Flexcil/LiquidText |
| Folders/subfolders, favorites/pins, **tags**, sort/filter, global search, trash/recovery | Nebo's shallow hierarchy is a cited weakness; match Noteshelf | Noteshelf |
| Templates, paper types, custom covers | Users expect a library (Penbook ~1,000; Noteshelf 200+) | Penbook/Noteshelf |
| Audio recording **synced to ink/text with timestamp bookmarks** + transcription | Samsung/Flexcil/Notewise have it; Nebo & Noteshelf's lack is a cited complaint | Samsung/Flexcil |
| AI: summarize, translate, spell/grammar, auto‑format, explain, quiz/study sets | Now baseline (Samsung, Nebo, Noteshelf, Notewise, MarginNote) | All |
| Reliable **background** cross‑device sync + offline‑first | Manual sync = the #1 data‑loss complaint (Nebo, Samsung) | Notewise |
| Password/lock on notes, clear privacy stance | Samsung lock; Notewise privacy‑first | Samsung/Notewise |
| Dark mode, accessibility, broad localization | Expected | All |

## What Sane Notes could beat them on

- **Truly cross‑platform, background‑first sync with zero data loss** — the single most common complaint across Nebo (manual sync) and Samsung (conflict prompts, Windows partial downloads, ecosystem lock‑in). A silent, conflict‑free, offline‑first engine is a wedge.
- **Search‑preserving, high‑fidelity PDF/vector export** — beat Samsung's rasterized, unsearchable PDFs and Noteshelf's blurry enlargements with real vector text + selectable OCR layer.
- **Nebo‑grade recognition *plus* deep organization** — Nebo wins recognition but loses on hierarchy; combine best‑in‑class ICR with tags, nested folders, backlinks, and a real outline.
- **Audio‑to‑ink sync done everywhere** — deliver Samsung's audio‑bookmark magic (tap a word → jump to that moment) on all platforms, with transcription; Nebo and Noteshelf have no synced playback.
- **Unified AI over the whole library, not per‑note** — chat/quiz/summarize/study‑sets across notebooks (Notewise/MarginNote direction) with **on‑device options** for privacy, beating Samsung's server‑dependent, account‑gated, device‑tiered AI.
- **Real‑time collaboration + comments** — largely absent in Samsung and Nebo; only Notewise ships it. Shared notebooks with comments would be a clear differentiator.
- **Lasso that actually works on documents/PDFs** (move/resize/reflow) — directly fixes Nebo's most‑cited editing weakness.
- **RTL & one‑note‑multi‑language recognition** — Nebo explicitly can't do Hebrew/Arabic/Farsi/Urdu and limits one language per note; supporting these is an open market.
- **Fair, transparent pricing with a usable free tier** — avoid Nebo's 5‑page/no‑sync free cap, Kilonotes' watermark+ads, and Noteshelf's fractured platform pricing; a generous, sync‑included free tier plus honest lifetime option would stand out.
- **No ecosystem lock‑in** — first‑class web + iOS + Android + Windows/Mac clients with identical features, unlike Samsung (Galaxy‑only) and Noteshelf (no Apple↔Android sync).

---

## Sources

- Samsung Notes features & settings — https://www.samsung.com/us/support/answer/ANS10001384/
- Samsung Notes FAQ — https://www.samsung.com/us/support/answer/ANS10002888/
- Note Assist with Galaxy AI — https://www.samsung.com/us/support/answer/ANS10000941/
- Import/export PDFs with Samsung Notes — https://www.samsung.com/us/support/answer/ANS10002404/
- Organize notes and PDFs in Samsung Notes — https://www.samsung.com/us/support/answer/ANS10004548
- Sync voice recordings with Samsung Notes — https://www.samsung.com/us/support/answer/ANS10001577/
- Samsung Notes marketing page (audio bookmark/sync) — https://www.samsung.com/ie/apps/samsung-notes/
- Use S Pen Air actions — https://www.samsung.com/us/support/answer/ANS10003221/
- Use Air actions with Galaxy tablet S Pen — https://www.samsung.com/us/support/answer/ANS00087382/
- Samsung Notes handwriting‑to‑text (OCR) overview — https://www.handwritingocr.com/blog/samsung-notes-handwriting-to-text
- Galaxy AI (Wikipedia) — https://en.wikipedia.org/wiki/Galaxy_AI
- One UI 7 writing tools — https://www.phonearena.com/news/Samsungs-One-UI-7-frees-Galaxy-AI-writing-tools-from-its-own-keyboard_id167226
- One UI 9 Samsung Notes AI (finger, no stylus) — https://www.makeuseof.com/ive-used-samsung-notes-now-that-i-have-one-ui-9-and-i-was-surprised-at-how-good-it-is/
- Samsung Notes voice recorder / bad notes — https://www.androidpolice.com/samsung-notes-voice-recorder-lets-me-take-terrible-notes-on-purpose/
- Samsung Notes complaints (Windows RAM, sync, export) — https://eu.community.samsung.com/t5/mobile-apps-services/samsung-notes/td-p/9726601
- Samsung Notes pages disappeared / sync — https://r2.community.samsung.com/t5/Tablets/Samsung-notes-not-syncing-pages-disappeared/m-p/14295306
- Samsung Notes on alternativeto.net — https://alternativeto.net/software/samsung-notes/about
- MyScript Notes (Nebo) product page — https://www.myscript.com/notes/
- MyScript Notes handwriting overview — https://help.myscript.com/notes/overview/handwriting/
- MyScript Notes FAQ (languages, sync, free tier) — https://help.myscript.com/notes/faq/
- MyScript SDK (interactive ink, math/diagram/music) — https://www.myscript.com/sdk/
- MyScript Notes App Store listing (v7.5.0, rating, reviews) — https://apps.apple.com/us/app/myscript-nebo-note-taking-for-apple-pencil/id1119601770
- Paperlike — MyScript Notes (Nebo) review — https://paperlike.com/blogs/paperlikers-insights/myscript-notes-app-review
- MacStories — Nebo handwriting review — https://www.macstories.net/reviews/nebos-handwriting-recognition-elevates-your-notes/
- Nebo pricing/reviews — https://www.techjockey.com/detail/nebo
- Noteshelf 3 App Store — https://apps.apple.com/us/app/noteshelf-3-ai-digital-notes/id6458735203
- Noteshelf 3 (MWM) — https://mwm.ai/apps/noteshelf-3-ai-digital-notes/6458735203
- Paperlike — Noteshelf 3 review — https://paperlike.com/blogs/paperlikers-insights/noteshelf-review
- Notewise product site — https://notewise.dev/
- Notewise App Store — https://apps.apple.com/us/app/notewise-note-taking-pdf/id6480045936
- Kilonotes features & plans — https://www.kilonotesapp.com/en/product
- Kilonotes review (free?) — https://updf.com/mobile-app/is-kilonotes-free-answer-with-complete-review/
- Penbook review — https://www.educationalappstore.com/app/penbook
- Penbook App Store — https://apps.apple.com/us/app/penbook/id1473064295
- Flexcil (via reader proxy) — https://www.flexcil.com/
- LiquidText product site — https://www.liquidtext.net/
- LiquidText pricing — https://www.capterra.com/p/264823/Liquid-Text/pricing/
- MarginNote product site — https://www.marginnote.com/
- MarginNote pricing — https://www.marginnote.com/en/pricing/
- Paperlike — LiquidText vs MarginNote 4 — https://paperlike.com/blogs/paperlikers-insights/liquidtext-vs-marginnote
- Flexcil vs LiquidText vs MarginNote comparison — https://slashdot.org/software/comparison/Flexcil-vs-LiquidText-vs-MarginNote-vs-WizNote/
