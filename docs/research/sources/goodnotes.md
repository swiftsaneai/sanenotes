# Goodnotes 6 — Exhaustive Feature Research

> Scope: Goodnotes 6 across iPad / iPhone / Mac / Windows / Android / Web, as of September 2026. The App Store product is branded **Goodnotes 6** (bundle `id1444383602`) but ships with build version numbers in the **7.x** range (e.g. 7.1.19) — the "6" is the product line, not the binary version. Sources are official Goodnotes support/blog/feature pages, the goodnotes.com pricing page, Apple App Store and Google Play listings, the Google web.dev engineering case study, and reputable third-party reviews/forums. Every claim traces to a fetched page or search snippet listed in **Sources**. Uncertain items are marked **(unverified)**.

## Headline correction on the "Flutter" premise

The research brief asked me to "confirm and cite" that Goodnotes' Android/Windows/Web apps were built with Flutter. **This is incorrect.** Google's own engineering case study (web.dev/case-studies/goodnotes), co-authored with the Goodnotes team, states that Goodnotes did **not** use Flutter. Instead they:

- Used **SwiftWasm** (the open-source, community-maintained toolchain) to compile their **existing Swift codebase** (100,000+ lines, 10+ years old, shared with iOS) to **WebAssembly (Wasm)**.
- Wrapped that Wasm engine in a **Progressive Web App (PWA)** with a **TypeScript + React** UI layer, using **service workers** for offline/installation.
- Shipped to **Android** via **Trusted Web Activities (TWA)** and to **Windows** via **PWABuilder** (wrapping the PWA into a native binary); the same PWA serves **Web** and **ChromeOS**.

So the correct statement is: *Goodnotes' Android, Windows, Web, and ChromeOS apps are a Swift-to-WebAssembly PWA, not a Flutter app.* This matters for a competitor: it explains why the cross-platform apps historically lagged the native Apple app in features, offline support, and polish.

---

## Organization & library (notebooks / folders / tags / favorites / search)

- **Document types:** Notebooks, single **Text Documents** (typing-first block editor), **Whiteboards** (infinite canvas), and **Study Sets** (flashcards) are distinct file types in the Library.
- **Folders & subfolders:** Unlimited nested folders/subfolders. Folders can be assigned **colors, emoji, and icons** for visual categorization.
- **Favorites:** Star notebooks/folders to pin them in a dedicated **Favorites** view; the Favorites view also surfaces individual **bookmarked pages** (page-level bookmark/star icon).
- **Views & sorting:** Library view with grid/list; documents can be moved, duplicated, renamed. Page scroll direction is configurable **vertical or horizontal**.
- **Search across library:** Global search finds text in typed content, **handwriting (OCR)**, PDF text, document/folder titles, and outline/bookmark titles. A partial title is enough.
- **Tags:** No first-class "tag" system is prominently documented; organization is folder- and favorite-based **(unverified whether formal tags exist)**.
- **Sections/tabs:** Multiple notebooks/documents can be opened; on iPad you can run multiple windows side-by-side (see Presentation/Multi-window).

## Handwriting & ink tools

**Pen types (three):**
- **Fountain Pen** — pressure-sensitive ink for everyday notes and sketches (line width varies with pressure).
- **Ball Pen** — consistent, **non-pressure-sensitive** ink.
- **Brush Pen** — highly pressure-sensitive ink for lettering, expressive strokes, calligraphy.

**Per-pen settings:**
- **Pressure Sensitivity** — controls how strongly line width responds to stylus pressure; a "Min" value reduces but does not fully remove sensitivity.
- **Tip Sharpness** — changes stroke ends from round to sharp (where supported).
- **Tip Flatness** — on supported Apple devices, changes how blunt the Fountain Pen tip appears (nib shape).
- **Stroke Stabilization** — smooths small shakes/jitters (handwriting smoothing).
- **Stroke thickness** slider; **solid / dashed / dotted** stroke patterns.
- **Color presets** — a reorderable palette (drag to reorder); custom colors.
- **Favorite pens / presets** are available on Apple as saved pen+color combos accessible from the toolbar **(favorites bar; partially verified)**.

**Highlighter:** Separate highlighter tool; can be set to **straighten/snap** and can draw **perfect shapes** too (shape recognition now works with the highlighter, not just pens). **(Highlight-behind-text / free-form modes unverified as named modes.)**

**Eraser:** Dedicated eraser with size options; can be set to **erase whole strokes** vs partial; option to **erase highlighter only**. **Scribble to Erase** (see gestures) lets you cross out to delete without switching tools.

**Shapes & diagramming:**
- **Shape Tool** for deliberate perfect shapes.
- **Draw and Hold** (ink-to-shape): draw a rough shape freehand, hold the stylus at the end, and it snaps to a perfect form; keep holding and drag to reshape.
- Lines can **snap to other strokes/endpoints** for precise graphs/diagrams.
- **Quick Diagramming** (newer, ~2025–26): tap edge dots on a shape to instantly spawn a connected node and build flowcharts; connector-style switching.

**Ruler:** Ruler tool works with Pen, Highlighter, and Pencil; ink snaps to the ruler edge for straight lines.

**Lasso Tool:** Selects handwriting, images, text boxes, sticky notes, shapes, and other content. After selecting you can move, resize, rotate, cut, copy, duplicate, delete, change color, screenshot, or convert to text. Selection can be filtered by content type (e.g. toggle whether images are included).

**Lasso Resize / Edit Handwriting Mode:** Reflow and resize handwriting — handwritten text can be **reflowed** like typed text (a distinctive feature).

## Text & typing

- **Text Tool** creates movable text boxes; **Text Documents** are a separate typing-first, block-based format.
- **Rich formatting:** bold, italic, underline, strikethrough; text color, size, alignment, line spacing; **headings, styles, quotes, code blocks**.
- **Lists:** bulleted (`- ` / `* `), numbered (`1. `), auto-continue on new line — i.e. **Markdown-style shortcuts** for lists. Full checklist/checkbox support is a frequent user request; native checkboxes exist in Text Documents **(partially verified)**.
- **Tables** are supported in Text Documents.
- **Media in text docs:** images and other media blocks.
- **Hyperlinks:** internal links (jump between pages/notes) and external links (websites).
- **Fonts:** custom fonts supported broadly on Apple; **cross-platform documents are limited to Helvetica** for compatibility.
- **Collaboration** and **Goodnotes AI** are available inside Text Documents.

## Audio

- **Record while writing:** tap the microphone; audio records in sync with handwriting/typing.
- **Handwriting–audio timeline sync:** tap any word/stroke to jump the audio to the exact moment it was written; during playback handwriting can be replayed in different "Replay" modes.
- **Playback controls:** adjustable speed, **skip silences**, precise navigation.
- **Transcription:** real-time transcript while recording; view/copy/paste transcript into notes; transcripts are **searchable**. **Cloud Transcription** requires Goodnotes Pro or AI Pass + internet; **On-device Transcription** requires supported hardware + a downloaded language model. Transcription started English-only and is expanding to more languages; the App Store/marketing now claim "multiple languages."
- **Audio Transcription Summary** / **Meeting AI** turns recordings into summaries and action items (cloud, uses AI credits).
- Free tier caps audio at **~20 minutes**; unlimited recording requires a paid plan.

## PDF & documents

- **Import:** from within the app, from other apps (share sheet), drag-and-drop, and **"Email to Goodnotes"** (a unique per-user address that imports emailed PDFs — subscription-only).
- **Annotation:** handwriting, highlights, typed notes, shapes, stickers over any PDF; digital planners and lecture slides are common uses.
- **Interactive PDFs:** imported PDF **hyperlinks and outlines/table of contents** are preserved and navigable; imported PDF TOC becomes the document outline.
- **Export formats:** **Flattened PDF** (smaller, universally compatible, makes handwriting searchable) vs **Editable PDF** (preserves outlines and hyperlinks). Also export as image (PNG/JPG) and to other formats. Choosing Flattened **drops** outlines/hyperlinks — a known export-fidelity gotcha.
- **Forms:** basic PDF form-field fill is possible via annotation; robust AcroForm form support is limited **(unverified as a first-class feature)**.

## Images, media & stickers

- **Images:** insert from Photos/Files/camera; scan documents.
- **Elements tool:** insert reusable **stickers/elements** from a personal Elements collection and from the Marketplace; elements can be favorited for quick reuse.
- **Stickers:** resize/rotate; a common tip is to re-select with the image tool for clean straight resizing.
- **Tape** tool for washi-tape-style decorative strips.
- **Sticky Notes** (repositionable note objects).

## Templates, paper types & covers

- **Dynamic Templates:** customize template **size, orientation, line color, background color, accent color** directly in-app (a Goodnotes 6 flagship).
- **Paper sizes:** A0–A8, B0–B8, Letter, and a native "Goodnotes" size.
- **Built-in library** of covers and paper (lined, grid, dotted, planners, etc.), plus **dark-mode paper**.
- **Custom templates:** import any PDF page or image as a cover/paper via "+ Import"; PDFs recommended over images for crispness. Create a template from an existing page (export single page as flattened PDF, re-import).
- **Manage Notebook Templates** via the cog menu (Size/Color dropdowns).

## Search, OCR & handwriting recognition

- **On-device handwriting recognition** powers search and Convert-to-Text.
- **Recognition languages (current Apple builds):** Chinese (Traditional & Simplified), Dutch, English (US), English (UK), French, German, Italian, Japanese, Korean, Portuguese. *(GoodNotes 5 supported a longer list that additionally included Russian, Spanish, Thai, Turkish — some may have been dropped/changed in 6; treat the 5-era extras as **unverified** for 6.)*
- Search covers handwriting, typed text, PDF text, and titles.

## Math & conversion

- **Math Conversion:** convert handwritten equations to clean digital math (on-device, no AI credits).
- **AI Math Assistance / Math solver:** detects errors in handwritten equations and solves problems with **step-by-step explanations** (cloud, uses AI credits).
- **Interactive Exam Practice:** built-in SAT and DSE (Hong Kong) math prep courses.
- **Convert to Text** turns handwriting into editable typed text.

## AI features (Goodnotes AI)

**On-device (no AI credits, more private):** Math Conversion, Circle to Lasso, **Spellcheck** (corrects typos *in your own handwriting style*), **Handwriting Reflow**, **Convert to Text**, **Scribble to Erase**. **Word Complete** was an experimental on-device feature but was **discontinued March 31, 2025**.

**Cloud (consume monthly AI credits; require internet):**
- **Ask Goodnotes** — chat/Q&A assistant inside a notebook. Answers questions from your notes, **cites the exact page/spot**, summarizes selected pages/paragraphs (lasso or highlight to scope), rewrites/simplifies, translates, and **generates quizzes/practice questions** (regenerate for more). Access via chat icon, object menu (tap-hold), or lasso selection; works on handwriting, typed text, and images; shows in floating window, sidebar, or full window.
- **Create mode** — generates new content: summaries onto new pages, **visual summaries**, **diagrams (flowcharts, mind maps, timelines)**, templates from notes, and **image generation**.
- **Meeting AI** — voice notes → summaries and actionable insights.
- Text-document AI: smart formatting, reorganization, paraphrase, shorten/lengthen, adjust tone.

**Availability/limits:** AI is **geo-restricted** — unavailable in Afghanistan, Belarus, Iran, Macau, North Korea, Russia, Syria, Ukraine, Venezuela. AI credits scale by plan; **AI Pass** add-on ($9.99/mo) grants ~12× more credits / full AI experience. The one-time "Special Edition" purchase gets only **limited AI**.

**Privacy claims for AI:** On-device features (spellcheck, math conversion, handwriting) run entirely on-device and data isn't sent anywhere. Goodnotes states it **does not access or collect data from your notebooks to train its AI**. Cloud AI features do send the relevant content to servers for processing.

## Sync, backup & offline

- **Goodnotes Cloud** — first-party sync keeping the library in sync across Apple, Android, Windows, and Web when signed into the same account; **requires Goodnotes Pro** (not available to one-time "Special Edition" buyers).
- **iCloud sync** — two-way sync across Apple devices (available without Pro).
- **Auto Backup** — one-way automatic backup to **Google Drive, Dropbox, OneDrive, or WebDAV** (notably **not iCloud Drive**); runs ~every 12 hours; iOS/iPadOS only (not macOS). Formats configurable (PDF/Goodnotes/image). Locked documents are **excluded** from Auto Backup.
- **Cross-platform sync caveat:** full library sync between legacy iOS/Mac and Android/Windows was historically **not** available — users shared individual documents via links; Goodnotes Cloud (Pro) is the path to true cross-platform sync now.
- **Offline:** Apple apps are offline-first. **Android and Windows were launched "online-first" and need connectivity for the best experience**, with offline support improving over time.

## Sharing, export, links & publishing

- **Share Link** — generate a URL to a notebook; **anyone with the link can view, comment, and edit** (documents shared this way are effectively public to link-holders).
- **Export** — PDF (Flattened/Editable), image, and per-page or whole-document.
- Share across platforms (iOS ↔ Android/Windows/Web) primarily via share links.
- **Marketplace publishing** — creators sell planners, covers, paper, and stickers (see Marketplace).

## Collaboration & comments

- **Real-time collaboration** on shared notebooks, text documents, and whiteboards.
- **Up to 50 participants** in real time.
- **Live Cursor** shows where each collaborator is writing/editing.
- **Comments, sticky notes, annotations** for async feedback.
- Gate: a real-time session can't start until at least one participant with an **active Goodnotes Pro** subscription opens the shared document.

## Presentation / whiteboard / multi-window / split view

- **Presentation Mode** (iPad + iPhone only; **not** on macOS, Android, Windows, Web): output to external screen/projector via **AirPlay or HDMI**; hides UI; **Mirror Presenter Page** (shows zoom/page animations) vs **Mirror Full Page** (static full page); **laser pointer**.
- **Whiteboard** — infinite/expandable canvas document type with AI and real-time collaboration.
- **Multi-window (iPadOS):** open multiple Goodnotes windows in full screen, Slide Over, or Split View, including two Goodnotes windows side-by-side; when presenting with two windows you choose which is shown to the audience. Works within iPad Stage Manager on supported hardware **(Stage Manager specifics unverified)**.

## Stylus gestures & input

- **Scribble to Erase** — scribble over a stroke to delete it without switching to the eraser.
- **Circle to Lasso** — draw a circle around content to select it.
- **Apple Pencil Pro:** **Squeeze** opens the floating **Palette** (switch tools, color, thickness) — configurable to switch tools, show color palette, show ink attributes, run a Siri shortcut, or off; **Barrel Roll** rotates shaped pen/brush nibs; **Hover** previews the touch-down point; **Haptic feedback** on squeeze.
- **Double-tap** (Apple Pencil 2/Pro) — switch tools / show palette / show ink attributes (configurable).
- **Palm rejection / wrist protection** — supported so you can rest your hand while writing **(named "Palm Rejection"; wrist-guard/zoom-write covered below, partially verified)**.
- **Zoom Write** box for writing small neat text in a magnified area **(standard Goodnotes feature; verify exact name)**.

## Keyboard shortcuts

- Official shortcut reference covers **macOS, iPadOS (external keyboard), Windows, and Web**. Uses ⌘ on Mac/iPad and Ctrl on Windows/Web.
- Tool shortcuts exist (e.g. **H** for Highlighter) but don't fire while editing a text box.
- Study Sets have their own keyboard-shortcut set for review sessions.
- Standard editing shortcuts (copy/paste/undo/redo/duplicate) plus tool switches; full grid is on the support page (see Sources).

## Platforms & per-platform feature differences

| Capability | iPad/iPhone | Mac | Android | Windows | Web |
|---|---|---|---|---|---|
| Engine | Native Swift | Native Swift | SwiftWasm PWA (TWA) | SwiftWasm PWA (PWABuilder) | SwiftWasm PWA |
| Core note-taking (ink, typing, PDF, shapes) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Collaboration + share links | ✅ | ✅ | ✅ | ✅ | ✅ |
| Presentation Mode | ✅ (iPad+iPhone) | ❌ | ❌ | ❌ | ❌ |
| Password Protection | ✅ (iOS) | limited | ❌ | ❌ | ❌ |
| Auto Backup (Drive/Dropbox/OneDrive) | ✅ (iOS/iPadOS) | ❌ (use iCloud) | limited | limited | limited |
| Apple Pencil Pro gestures | ✅ | n/a | n/a | n/a | n/a |
| Offline-first | ✅ | ✅ | ⚠️ online-first | ⚠️ online-first | ⚠️ online-first |

- **Android device requirement:** originally Samsung tablets, 8"+ screen, ≥3 GB RAM; via **Play Store** and **Galaxy Store**.
- **Windows:** via **Microsoft Store**, optimized for **Surface**.
- **Web:** supported browsers; **ChromeOS** served by the same PWA.
- The cross-platform apps have historically **trailed** the Apple app on features and polish (a recurring review/forum theme).

## Accessibility

- **System Dark Mode** support plus dark-mode paper templates.
- **VoiceOver** support (documented at least for the Marketplace; buttons/menus announced in logical order).
- **Dynamic Type** — text scales with device accessibility settings (documented for Marketplace UI).
- Adjustable colors/contrast; high-contrast considerations.
- **EU Accessibility Act** compliance page exists in support.
- Left-handed-specific settings: **not clearly documented (unverified).**

## Localization

- App **UI localized into English + ~14 more languages** (~15 total; full list not published in support docs).
- Handwriting recognition languages are a separate, shorter set (see OCR section).
- Android/Windows/Web pull UI language from the browser/OS default (e.g. ChromeOS uses the Chrome language).

## Pricing, plans & free-tier limits

Goodnotes shifted from a **one-time purchase (GoodNotes 5)** to a **freemium + subscription** model with Goodnotes 6, which drew significant backlash. Current structure (2026, USD):

- **Free** — $0. Up to **3 files total** (notebooks + whiteboards + text documents combined), **100 MB** storage, ~**20 min** audio, handwriting-to-text, shape recognition, handwriting search, iCloud sync, bookmarks, **limited AI**.
- **Essential** — **$11.99/yr** (7-day trial). Unlimited files, unlimited audio, **5 GB** storage, full sharing, basic AI (spellcheck, math assistance), Google Calendar integration, templates.
- **Goodnotes Pro** — **$35.99/yr** (7-day trial), "most popular." Everything in Essential plus **Goodnotes Cloud cross-platform sync**, Google Drive integration, private link sharing, **real-time collaboration**, advanced AI (**Meeting AI, Create mode**), priority support.
- **Teams** — **$120/seat/yr** (30-day trial). Pro + SAML SSO, domain control, consolidated billing, admin management.
- **Enterprise** — custom. Teams + custom security, AI permissions, dedicated support, **Microsoft Intune SDK**.
- **AI Pass** — **+$9.99/mo** add-on; unlocks full AI experience with ~**12× more AI credits**.
- **Special Edition / One-Time Payment** — **~$28.99–$29.99**, **Apple devices only**. Unlimited Apple note-taking with no subscription, but **limited AI** and **ineligible for Goodnotes Cloud** cross-platform sync. (Launch pricing in 2023 was $29.99 one-time or $9.99/yr; the plan lineup has since expanded.)
- **Marketplace content:** individual items typically **$1.99–$9.99** (planners/covers/stickers), some free.

*Note: exact prices vary by region and over time; the App Store listing showed Essential $11.99/yr, Pro $35.99/yr, AI Pass $9.99/mo, One-Time $28.99.*

## Privacy & security claims

- **On-device AI/handwriting** (spellcheck, math conversion, recognition) processes data locally; nothing leaves the device for those.
- Goodnotes states it **does not use notebook content to train its AI**.
- **Cloud AI** features (Ask Goodnotes, Meeting AI, Create mode, cloud transcription, math solver) upload the relevant content to servers.
- **Password Protection** (iOS only): a **single universal password** locks chosen notebooks/whiteboards; supports Face ID / Touch ID; relocks ~2 min after leaving the app. **Notebooks are NOT encrypted** — it's an access-block layer, not encryption. **Forgotten password = unrecoverable** notes. Not available on Android/Windows/Web.
- **Share links are public to anyone holding the link** (view + comment + edit) — a real confidentiality consideration.

## Known user complaints / weaknesses (cited)

- **Subscription backlash:** moving from one-time (GN5) to subscription (GN6) angered long-time users; some felt pushed/tricked into upgrading, and "lifetime" was questioned. Users migrated to alternatives like **Noteful** and **Nebo** (MacPowerUsers forum, MalayMail review, thereport substack).
- **Android sync problems:** reports of "terribly bad" syncing — deleted/erased content **reverting** minutes after closing a notebook; general advice to keep the app updated to avoid sync issues (Samsung Community, review threads).
- **QA/stability:** complaints that "every update breaks a feature," bugs, and inconsistent quality control.
- **Cross-platform lag:** Android/Windows/Web are online-first and feature-behind the Apple apps; Presentation Mode, Password Protection, and Auto Backup are Apple-limited.
- **Export fidelity gotcha:** exporting **Flattened** PDF silently drops outlines/hyperlinks; users must remember to pick **Editable**.
- **Cross-platform fonts** limited to Helvetica in shared docs.
- **AI geo-restrictions** exclude several countries entirely.
- **Word Complete removed** (Mar 2025) after being promoted as a headline feature.
- App Store rating remains high overall (**4.7★, ~452K ratings, Editors' Choice**), so complaints coexist with broad satisfaction.

---

## What Sane Notes must match (table stakes)

- Three+ ink engines with **pressure & tilt** response (fountain/ball/brush equivalents), adjustable pressure curve, tip sharpness/flatness, stroke stabilization, dashed/dotted styles, reorderable color palette, favorite pen presets.
- **Ink-to-shape** (draw-and-hold), a real **shape tool**, a **ruler**, snapping to strokes/endpoints, and shape recognition that also works with the highlighter.
- **Lasso** that selects mixed content and supports move/resize/rotate/cut/copy/duplicate/recolor/**convert-to-text**, plus **handwriting reflow/resize**.
- **Scribble-to-erase**, whole-stroke vs partial eraser, palm rejection.
- **On-device handwriting recognition + search** across handwriting/typed/PDF/titles, multi-language.
- **PDF import + annotation** with preserved outlines/hyperlinks and both flattened & editable export; drag-drop and email import.
- **Templates** (dynamic size/color/orientation), broad paper library, custom template import, covers.
- **Typed text** with rich formatting, headings, lists (Markdown shortcuts), tables, media, internal/external hyperlinks.
- **Audio recording synced to ink timeline** with playback speed/skip-silence and **transcription**.
- **Study/flashcard mode** with spaced repetition, plus AI quiz generation.
- **AI assistant** that answers questions over your notes **with page citations**, summarizes, and generates study questions; math help with step-by-step; on-device spellcheck.
- **Cross-platform sync** (iOS/Mac/Android/Windows/Web) with true offline support.
- **Real-time collaboration** (live cursors, comments) + share links; **presentation mode** to external display with laser pointer.
- **Multi-window / split view**, Apple Pencil Pro gestures (squeeze/hover/double-tap/barrel-roll), keyboard shortcuts.
- **Password/biometric lock**, dark mode, VoiceOver/Dynamic Type accessibility.
- **Marketplace/ecosystem** for templates, stickers, planners.
- A **free tier** that's usable and a **fair pricing** story.

## What Sane Notes could beat them on

- **True end-to-end encryption** for notes and **encrypted, cross-platform password lock** — Goodnotes' lock is Apple-only, is *not* encryption, and forgotten passwords are unrecoverable. A genuinely encrypted, recoverable, all-platform vault is a clear differentiator.
- **First-class offline on every platform.** Goodnotes' Android/Windows/Web are "online-first"; a fully offline-capable non-Apple client (real native or a hardened local-first PWA) would beat a known pain point.
- **Reliable cross-platform sync** with conflict handling — directly attack the documented Android "content reverts after closing" complaints; local-first CRDT sync that never loses strokes.
- **No subscription lock-out of core note-taking / sync.** Goodnotes gates cross-platform Cloud sync behind Pro and caps free at 3 files/100 MB. A generous free tier or one-time option that still includes sync would win migrants (Noteful/Nebo already capture these).
- **Native performance parity across platforms** instead of a Swift-Wasm PWA — a competitor with genuinely fast Android/Windows/Web apps can out-polish the areas users complain about.
- **Private/on-device AI by default** with transparent controls, plus AI available **without geo-blocks** and **without a separate credits paywall** — Goodnotes' best AI needs Pro + AI Pass and is unavailable in many countries.
- **Better export fidelity** (never silently drop outlines/hyperlinks) and **broader font support in shared documents** (Goodnotes forces Helvetica cross-platform).
- **Robust tags / smart folders / backlinks** for knowledge management — Goodnotes' organization is largely folders + favorites; add tags, saved searches, and note-linking.
- **PDF form-filling and richer PDF editing** where Goodnotes is thin.
- **Stability and QA** as a marketing wedge, given repeated "every update breaks something" feedback.
- **More handwriting-recognition languages** and **more transcription languages** than Goodnotes' current set.

---

## Sources

- https://www.goodnotes.com/blog/introducing-goodnotes-6
- https://www.goodnotes.com/blog/goodnotes-android-windows-web
- https://web.dev/case-studies/goodnotes
- https://www.goodnotes.com/pricing
- https://www.goodnotes.com/blog/ask-goodnotes
- https://www.goodnotes.com/features/audio-recording
- https://apps.apple.com/us/app/goodnotes-6/id1444383602
- https://play.google.com/store/apps/details?id=com.goodnotes.android.app
- https://support.goodnotes.com/hc/en-us/articles/7353756785679-Using-the-Pen-tool (via r.jina.ai)
- https://support.goodnotes.com/hc/en-us/articles/10779112528399-A-guide-to-Goodnotes-AI (via r.jina.ai)
- https://support.goodnotes.com/hc/en-us/articles/7444477153295-Goodnotes-AI-Frequently-Asked-Questions
- https://support.goodnotes.com/hc/en-us/articles/10779390143247-Select-content-with-the-Lasso-Tool
- https://support.goodnotes.com/hc/en-us/articles/10779382123919-Reflow-your-handwriting-with-Lasso-Resize-Mode
- https://support.goodnotes.com/hc/en-us/articles/7352688559631-Add-Audio-Recordings-to-your-documents
- https://support.goodnotes.com/hc/en-us/articles/10234257108879-Explore-Audio-Transcription-Experimental-Feature
- https://support.goodnotes.com/hc/en-us/articles/11400139776399-Audio-Transcription-Summary-FAQs
- https://support.goodnotes.com/hc/en-us/articles/7353727932047-What-languages-does-Goodnotes-support-for-handwriting-recognition-and-search
- https://support.goodnotes.com/hc/en-us/articles/7353743594127-Search-your-notes
- https://support.goodnotes.com/hc/en-us/articles/15303674514191-Organize-folders-and-documents-in-Goodnotes
- https://support.goodnotes.com/hc/en-us/articles/4403641962383-Customize-Templates-in-Goodnotes-6
- https://support.goodnotes.com/hc/en-us/articles/8116482743311-Manage-notebook-templates
- https://support.goodnotes.com/hc/en-us/articles/360000115295-Add-custom-templates-to-the-template-library
- https://www.goodnotes.com/features/collaboration
- https://support.goodnotes.com/hc/en-us/articles/7353695997839-Share-a-document-for-collaboration
- https://support.goodnotes.com/hc/en-us/articles/13922131401615-Real-time-Collaboration-with-Live-Cursor-in-shared-documents
- https://support.goodnotes.com/hc/en-us/articles/9585471154447-Lock-notebooks-and-whiteboards-with-Password-Protection
- https://support.goodnotes.com/hc/en-us/articles/9767427999119-Password-Protection-Frequently-Asked-Questions
- https://support.goodnotes.com/hc/en-us/articles/9757771783823-Utilize-the-new-features-of-Apple-Pencil-Pro
- https://support.goodnotes.com/hc/en-us/articles/17220521238159-Keyboard-Shortcuts-in-Goodnotes
- https://support.goodnotes.com/hc/en-us/articles/7353727934223-Presentation-Mode
- https://support.goodnotes.com/hc/en-us/articles/7353757107215-Open-Goodnotes-in-multiple-windows-on-iPadOS
- https://www.goodnotes.com/blog/digital-flashcards
- https://www.goodnotes.com/blog/shape-recognition
- https://support.goodnotes.com/hc/en-us/articles/8254946748687-Draw-straight-lines-with-the-Ruler-tool
- https://support.goodnotes.com/hc/en-us/articles/13682939148943-Shapes-and-Diagramming-Draw-perfect-lines-curves-and-shapes
- https://support.goodnotes.com/hc/en-us/articles/7353742854543-PDF-outlines-and-hyperlinks-are-missing-when-I-export-a-document
- https://support.goodnotes.com/hc/en-us/articles/8537070839183-Differences-between-Editable-and-Flattened-PDF-Formats
- https://support.goodnotes.com/hc/en-us/articles/7353742797327-Use-Email-to-Goodnotes-for-importing-PDF-files
- https://www.goodnotes.com/features/pdf-annotation
- https://support.goodnotes.com/hc/en-us/articles/360001282956-Use-Auto-Backup-to-automatically-create-a-copy-of-your-documents-in-a-supported-cloud-storage
- https://support.goodnotes.com/hc/en-us/articles/10277366719759-Sync-your-Goodnotes-library-across-all-platforms-with-Goodnotes-Cloud
- https://support.goodnotes.com/hc/en-us/articles/7378735557519-Goodnotes-for-Android-Windows-and-Web-general-FAQs
- https://support.goodnotes.com/hc/en-us/articles/7353727615375-Type-text-with-the-Text-Tool
- https://support.goodnotes.com/hc/en-us/articles/13692184123279-Text-Document
- https://support.goodnotes.com/hc/en-us/articles/7353727452175-Getting-Started-with-the-Marketplace
- https://support.goodnotes.com/hc/en-us/articles/5545124623375-Buy-digital-stationaries-from-Goodnotes-6-Marketplace-or-GoodNotes-5-Shop
- https://marketplace.goodnotes.com/en/
- https://support.goodnotes.com/hc/en-us/articles/12056225100559-How-to-Change-Language-Settings
- https://support.goodnotes.com/hc/en-us/articles/13798736642703-EU-Accessibility-Act
- https://support.goodnotes.com/hc/en-us/articles/13808767840015-Compare-Goodnotes-Plans-and-Features
- https://support.goodnotes.com/hc/en-us/articles/7436120592015-Goodnotes-6-Subscription-and-Refunds-FAQs
- https://thejournal.com/articles/2023/08/29/goodnotes-6-debuts-with-ai-handwriting-features-ai-math-help.aspx
- https://techcrunch.com/2023/08/09/goodnotes-biggest-update-in-four-years-brings-ai-powered-handwriting-features-and-a-digital-marketplace
- https://www.techradar.com/computing/artificial-intelligence/goodnotes-adds-an-ai-that-can-read-and-explain-even-the-worst-handwriting
- https://beingpaperless.com/goodnotes/
- https://medium.com/@paperlessx/everything-you-can-add-in-goodnotes-6-what-works-and-what-doesnt-30253d1e7dc7
- https://talk.macpowerusers.com/t/goodnotes-6-new-version-new-payment-models/34474
- https://www.malaymail.com/news/tech-gadgets/2023/08/24/is-it-all-good-with-the-updated-goodnotes-6/87000
- https://thereport.substack.com/p/goodnotes-6
- https://r2.community.samsung.com/t5/Tech-Talk/Worthless-goodnotes-5-android-app/m-p/15621757
- https://www.macrumors.com/2024/05/15/goodnotes-apple-pencil-pro-support/
- https://en.wikipedia.org/wiki/Flutter_(software)
