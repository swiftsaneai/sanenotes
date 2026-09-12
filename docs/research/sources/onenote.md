# Microsoft OneNote — Exhaustive Feature Inventory (Competitive Research)

*Research date: 2026-09-13. Primary source: support.microsoft.com/en-us/onenote and its sub-pages, supplemented by official Microsoft blogs, Microsoft 365/OneDrive pricing pages, and third-party reviews/forums where cited. Claims that could not be confirmed against a fetched page or a search snippet are marked "(unverified)."*

OneNote is Microsoft's free-form digital notebook. It is not a single app but a **family of clients** sharing one cloud notebook format (`.one` files on OneDrive/SharePoint). Feature parity varies sharply by platform — this is the single most important fact for a competitor. The current flagship is **OneNote on Windows** (the merged Microsoft 365 desktop app); **OneNote for Windows 10** (the UWP app) reached end-of-support in October 2025; **OneNote 2016/2019** are legacy. Clients: Windows desktop, Mac, iPad, iPhone, Android, and Web (onenote.com).

---

## 1. Organization & Library

- **Hierarchy:** Notebooks → Section Groups → Sections → Pages → Subpages. Pages can be nested up to two subpage levels. Sections are the atomic unit for password protection and color-coding.
- **Notebook storage:** Cloud notebooks live on OneDrive (personal) or SharePoint/OneDrive for Business. Only the **Windows desktop app** supports local-only notebooks on the hard drive; every other client is cloud-only.
- **Navigation:** Collapsible notebook/section/page panes; tabbed section headers with custom colors; page tabs on the right; Quick Notes (unfiled notes) scratch area.
- **Tags:** Built-in tags include **To Do (checkbox), Important, Question, Remember for later, Definition, Highlight, Contact, Address, Phone Number**, and many more. Tags are keyboard-assignable (`Ctrl+1`–`Ctrl+9`, `Ctrl+0` removes). Custom tags can be created on desktop. **Find Tags** builds a **Tags Summary** task pane grouping all tagged notes; scope can be narrowed (page/section/notebook/all) and results refreshed. Custom tags **cannot** be created or applied in the web version.
- **To-Do checklists:** The To Do tag renders an interactive checkbox; clicking marks complete. 2026 update introduced **redesigned circular task checkboxes**.
- **Search:** `Ctrl+F` (current page) / `Ctrl+E` (all notebooks). Scope selector: All Notebooks / Current Notebook / Current Section / Current Page. Search covers typed text, **handwritten ink (OCR of handwriting)**, **text inside inserted images (OCR)**, and **spoken words in audio/video recordings** when *Audio Search* is enabled (off by default because it slows searching). *Note: third-party reviewers report handwriting search is unreliable in practice.*
- **Favorites/pinning:** Recent notebooks list; pin pages/sections (unverified as a formal "favorites" system — OneNote uses recent + quick access rather than starred favorites).
- **Recycle Bin & recovery:** Deleted pages/sections go to the **Notebook Recycle Bin** (History > Notebook Recycle Bin), retained ~**60 days**. Backups (File > Info > Open Backups) on desktop. OneDrive version history and Recycle Bin provide a second recovery layer.

---

## 2. Handwriting & Ink Tools

- **Pen types:** **Ink Pen** (standard), plus **Effect Pens: Galaxy, Rainbow, and Lava** (Windows). A dedicated separate "pencil" texture tool is not documented on Windows (unverified).
- **Highlighter:** Available from the Draw ribbon; **five thickness options**, multiple colors.
- **Thickness:** Pen has multiple thickness presets. On iPad, thickness runs **0.25 mm to 3.5 mm across five settings**, adjustable with +/− controls.
- **Colors:** Preset palette plus Recent Colors and **More Colors** (custom/infinite). iPad offers a color+brightness picker via **More Ink Colors**.
- **Eraser modes:** **Stroke eraser** (removes an entire stroke in one pass) and **Point eraser** (precision, with multiple sizes). **Scribble-to-erase** ("Scribble Erase"): with a pen selected, scribbling over ink deletes the covered strokes without switching tools.
- **Lasso Select:** Free-form selection of ink strokes; prerequisite for Ink-to-Text and Ink-to-Math conversions.
- **Select tool:** Selects mixed objects (ink, shapes, text boxes).
- **Ruler:** Draw straight lines at any angle; rotatable. **Windows only** (shared with Word/PowerPoint).
- **Laser pointer:** Six colors; **Windows-only, OneNote for Microsoft 365** (presentation aid, doesn't leave ink).
- **Ink to Shape:** Draw a rough shape; OneNote snaps it to a perfect geometric shape (flow charts/diagrams). Windows and iPad ("shape recognition").
- **Pressure/tilt:** Ink responds to supported active styluses (Surface Pen, Apple Pencil). Explicit pressure/tilt behavior and smoothing parameters are **not documented in support pages (unverified)** — behaviour is inferred from stylus support rather than a stated feature.
- **Draw with Touch toggle:** Lets you ink with a finger vs. reserve touch for scrolling (palm/finger separation).
- **Stylus orientation / palm rejection:** iPad has **Stylus Orientation** (tell OneNote how you hold the pen) so it ignores palm input. Windows/Surface Pen relies on OS palm rejection.

---

## 3. Text & Typing

- **Rich text:** Bold/italic/underline/strikethrough, sub/superscript, font family & size, font color, highlight, text alignment, indent.
- **Styles:** Paragraph styles / Heading 1–6 (`Ctrl+Alt+1`…`6` on Windows); customizable styles on Windows.
- **Lists:** Bulleted (`Ctrl+.`), numbered (`Ctrl+/`), multi-level, auto-continue. Auto-format shortcuts (e.g., `*` + space starts a bullet on Mac).
- **Tables:** Insert tables; press Tab from a line to auto-create; shading, sorting, add/remove rows/columns. Tables can convert to Excel spreadsheets on Windows (unverified for all clients).
- **Checkboxes:** Via To Do tag (interactive).
- **Hyperlinks:** Web links plus internal links to notebooks/sections/pages/paragraphs (wiki-style linking).
- **Markdown:** OneNote does **not** offer true Markdown authoring; it has limited auto-format shortcuts only (mark as (unverified) beyond bullet/number auto-start).
- **Free-form canvas:** Text lives in movable/resizable "note containers" placed anywhere on an infinite-ish page — a defining differentiator from linear editors.
- **Insert:** Date/time stamps (`Alt+Shift+D`/`F`), symbols, equations (`Alt+=`), file printouts, attachments, links, meeting details (Outlook), online video embeds.

---

## 4. Audio & Video

- **Recording:** Insert > Audio (audio-only) or Insert > Record Video. Recording begins immediately; a media icon is placed on the page and a Recording/Audio & Video ribbon tab appears with Pause/Stop.
- **Playback:** Double-click the media icon. Windows 10 client exposes Pause, **Back 5 min / Back 15 sec / Forward 15 sec / Forward 5 min** controls.
- **Sync to notes ("audio-linked notes"):** Notes typed during a recording are timestamp-linked so playback can jump to what you were writing at that moment (classic OneNote feature; linked-notes behaviour present on desktop).
- **Audio Search / transcription:** Spoken words become searchable when Audio Search is enabled. Full automatic **transcription** to text is not a native OneNote support-documented feature (unverified — Copilot/other Microsoft services handle transcription, not OneNote's recorder directly).
- **Web limitation:** Audio/video **cannot be recorded** in OneNote for the web (existing recordings are preserved but not playable/recordable there).

---

## 5. PDF & Documents

- **File Printout:** "Print" any document into OneNote via the **Send to OneNote** printer or Insert > File Printout / Insert file as PDF Printout (Mac). Each page becomes a **separate image** you can annotate; images can be pushed to background and inked over. Supports move/resize/delete of printout images.
- **File Attachment:** Insert > File Attachment embeds a copy of the file as a double-clickable icon (opens in native app).
- **PDF handling:** PDFs insert as page-image printouts for viewing/annotation, not as an editable/form-fillable PDF. **Form fields, outlines/bookmarks, and PDF hyperlinks are not preserved** — the PDF is rasterized to images (a real weakness vs. Notability/GoodNotes for PDF markup).
- **OCR on printouts:** Right-click > "Copy Text from this Page of the Printout" / "Copy Text from All the Pages of the Printout."
- **Export fidelity:** Export a page/section/notebook to **PDF**, **Word (.docx)**, or (Windows) OneNote package (.onepkg). Web version cannot open .onepkg or PDF-format notebooks.

---

## 6. Images, Media & Stickers

- **Images:** Insert from file, camera, online pictures, screen clipping (desktop). 2026 added **built-in image cropping/resizing/adjustment** inside the app with shortcuts.
- **OCR of images:** Right-click a picture > **Copy Text from Picture**. Runs server-side; may take moments (occasionally 24–48h for backlog). Accuracy varies with image quality. Available in Microsoft 365, 2024, 2021, 2016; also OneNote for the web (for inserted pictures).
- **Stickers:** Decorative sticker library — a **premium (Microsoft 365 subscription)** feature; called out specifically for Mac/subscription clients.
- **Online video embeds:** Paste a supported video URL (YouTube/Vimeo etc.) to embed a playable preview.

---

## 7. Templates, Paper Types & Covers

- **Built-in templates:** Categories include decorative page backgrounds, to-do lists, and (per broader documentation) Academic, Blank, Business, Decorative, and Planner groupings. Apply via Insert > Page Templates. **Templates only apply to new, empty pages.**
- **Custom templates:** Design a page, set Paper Size + margins (View > Paper Size), then "Save current page as a template." Can set a template as the **default for new pages in the current section**.
- **Paper/background:** Page background **color**, **rule lines** and **grid lines** (View > Rule Lines), page size presets.
- **No "covers":** OneNote has no notebook cover-art concept the way GoodNotes/Notability do (notebooks are identified by name/color only) — a differentiator gap.

---

## 8. Search, OCR & Handwriting Recognition (Languages)

- **Unified search** across text, ink, image OCR, and audio (see §1).
- **Handwriting recognition:** Ink-to-Text conversion depends on the **OS handwriting language pack**. On Windows you must install the handwriting language (Windows 10+ and local admin rights) and set the proofing language (Review > Language > Set Proofing Language). This ties recognition breadth to Windows' language packs rather than an in-app engine.
- **Ink-to-Text availability:** Windows desktop yes; **not available in OneNote for the web**; **iPad does not currently convert handwriting to text**; Mac does not convert handwriting to text.
- **OCR languages:** Microsoft doesn't publish an explicit OneNote OCR language list on the support page (unverified count).

---

## 9. Math & Conversion

- **Ink to Math / Math Assistant:** Convert handwritten or typed equations to clean symbols, then **solve** with step-by-step solutions.
- **Problem coverage:** basic arithmetic/statistics, **algebra, calculus, matrices, polar/complex numbers, trigonometry**. Offers alternate solution methods (factoring, completing the square, quadratic formula) and selectable step detail.
- **Graphing:** Plots interactive 2-D graphs of selected equations (Ink Math Assistant).
- **Practice quizzes:** Generates practice math quizzes from equations for self-study.
- **Requirements:** Math Assistant requires a **Microsoft 365 subscription** (documented as Enterprise/Education for full solve/graph/quiz). Platforms: OneNote for the web, Windows, iPad. Handwriting is sometimes misread and must be corrected manually.

---

## 10. AI Features (Copilot)

- **Copilot in OneNote** can: summarize notes (into bullets/talking points), draft new content (plans, agendas, outlines, brainstorms), create **to-do lists/tasks** from notes, **rewrite** selected text, list pros/cons, and organize pages.
- **Copilot Notebooks (2026):** Deeper project workspace; **proactively recommends and generates Word/Excel/PowerPoint artifacts** from notebook content + WorkIQ context; syncs between the Copilot app and OneNote ("Open in OneNote"). Rolling out beyond the original Copilot audience to Copilot Chat users in commercial/education tenants.
- **Multimodal capture (2026):** Capture audio, images, and notes in one flow (Android live; iOS/iPad rolling out Sept 2026); Copilot auto-generates structured notes.
- **Licensing:** Full Copilot in OneNote needs a **Microsoft Copilot (Work) license** (Windows, Mac, iPad, Web). Some capabilities available to eligible **Microsoft 365 subscribers on Windows only**. 2026 brought **Copilot Chat** into the app.
- **Limits/privacy:** Microsoft states Copilot works "within existing data security and privacy commitments"; outputs "aren't guaranteed to be 100% factual," may reflect training bias, and lack context beyond what's provided. Best quality in English; other languages improving. Whether commercial data is excluded from training is governed by the broader Microsoft 365 Copilot data-protection commitments, not restated on the OneNote page (mark specifics unverified).

---

## 11. Sync, Backup & Offline

- **Storage:** OneDrive or SharePoint; sync must be done by OneNote itself, **not** by file-sync tools (corrupts notebooks).
- **Auto vs manual:** Automatic background sync by default. Manual: File > Info > View Sync Status > Sync All / Sync Now (Windows). Mac can't disable auto-sync but can force sync. Mobile syncs on navigation; Android can restrict to Wi-Fi and disable "Auto Sync Attachments."
- **Offline:** Windows keeps a local cached copy for offline edits and merges on reconnect. Web "continually syncs in background" (no offline authoring in browser).
- **Sync status indicators:** green circular arrows (syncing), red circle-X (sync error), yellow triangle (offline).
- **Backup:** Local automatic backups (Windows) + OneDrive version history + 60-day Notebook Recycle Bin.
- **Version history:** **Page Versions** (History tab) shows prior versions by date/author; restore individual versions. Web supports view/restore of previous page versions but **cannot** filter by recency/author. Recent Edits view lists changed pages by date range.

---

## 12. Sharing, Export, Links & Publishing

- **Share whole notebook:** Invite by email (view/edit) or "Copy Link to Notebook" (anyone-with-link). Requires cloud storage.
- **Single-page sharing:** **Deprecated** for personal OneDrive notebooks — old single-page links expired; recipients need full-notebook access.
- **Static copies:** Email a page snapshot (Windows), **Send Page PDF** (Mac).
- **Export:** Page/section/notebook to **PDF** or **Word**; Windows also exports .one / .onepkg. No native export to PowerPoint/Markdown (reviewer complaint: hard to move notes out).
- **Permissions:** Can View vs Can Edit; modifiable after sharing.
- **Android gap:** Native notebook sharing historically limited — users directed to PC/Mac/Web to manage sharing.

---

## 13. Collaboration & Comments

- **Real-time co-authoring:** Multiple people edit a shared notebook simultaneously; changes sync automatically.
- **Author attribution:** History > Show/Hide Authors toggles author initials next to edits. Newly synced changes from others are **highlighted** until read.
- **Change tracking:** History > Recent Edits lets you list pages changed within a chosen date range; Find by Author.
- **Meeting sharing:** Share notes during a meeting (web/Windows, Outlook/Teams integration).
- **Comments:** OneNote lacks a dedicated margin-comment/threaded-comment system like Word — collaboration is via inline edits + author colors (a gap vs. Notion/Google Docs).

---

## 14. Presentation / Whiteboard / Multi-window / Split View

- **Infinite canvas** page model supports whiteboard-style free placement.
- **Dock to Desktop / multi-window:** Windows can open pages in separate windows and dock OneNote beside other apps for side-by-side note-taking.
- **Full-page/immersive view;** iPad supports iPadOS Split View / Slide Over and Stage Manager (OS-level, unverified as OneNote-specific feature).
- No dedicated "presentation mode" beyond the Windows **Laser Pointer**; Microsoft **Whiteboard** is a separate product, not OneNote.

---

## 15. Stylus Gestures

- **Palm rejection:** iPad Stylus Orientation; OS-level on Surface.
- **Scribble-to-erase:** Supported (scribble over ink with pen selected).
- **Surface Pen gestures:** hold barrel/right-click button + drag = select text; + draw loop = lasso ink; pen tip touch + move = scroll/pan.
- **Touch gestures (Win10 client):** tap to select object, double-tap to select text/word, two-finger pinch/stretch zoom, one-finger swipe scroll/pan, press-and-hold to move page/section.
- **Apple Pencil double-tap / squeeze, barrel-roll:** Not documented as mapped to OneNote actions in support pages (unverified — likely OS/tool-switch default only).

---

## 16. Keyboard Shortcuts (selection)

- Formatting: `Ctrl/Cmd+B/I/U`; Heading `Ctrl+Alt+1..6`; bullet `Ctrl+.`; number `Ctrl+/`.
- Tags: `Ctrl+1` To Do … `Ctrl+9`, `Ctrl+0` remove all.
- Structure (Win): New page `Ctrl+N`, new section `Ctrl+T`, next section `Ctrl+Tab`.
- Search: `Ctrl+F` (page), `Ctrl+E` (all notebooks).
- Insert (Win): date `Alt+Shift+D`, date+time `Alt+Shift+F`, equation `Alt+=`, picture `Alt+N,P`.
- Mac uses `Cmd` equivalents; **Web differs** (e.g., `Ctrl+F6` for focus navigation, `Alt+PageUp/Down` for first/last page). Microsoft publishes full per-platform tables.

---

## 17. Platforms & Feature Differences

| Capability | Windows (M365) | Mac | iPad | iPhone | Android | Web |
|---|---|---|---|---|---|---|
| Local (non-cloud) notebooks | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Full ink toolset (effect pens, ruler, laser) | ✅ (laser/ruler Win-only) | Pen/Marker/Highlighter only | Rich ink | Limited | Limited | ❌ ink insert/edit |
| Ink → Text | ✅ | ❌ | ❌ | ❌ | — | ❌ |
| Ink → Shape | ✅ | ❌ | ✅ (shape recog.) | — | — | ❌ |
| Math Assistant | ✅ (M365) | — | ✅ | — | ✅ | ✅ |
| Record audio/video | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Password-protect sections | ✅ | ✅ | ✅ | ✅ | ✅ | Unlock only |
| Custom tags | ✅ | ✅ | limited | limited | limited | ❌ create/apply |
| Copilot | ✅ | ✅ | ✅ | (rolling) | (capture) | ✅ |
| Templates create/apply | ✅ | ✅ | apply | apply | apply | limited |

Key platform notes: **Mac and iPad/iPhone lack ink-to-text**; **web can't record media, insert/edit ink, or create custom tags**; **Windows desktop is the only full-featured, locally-storable client**; **Android is the weakest** (reviewers call it buggy).

---

## 18. Accessibility

- **Immersive Reader:** Read Aloud (word-by-word highlight, adjustable voice/speed), **Line Focus** (1/3/5-line highlight), **Text Spacing**, syllable splitting, parts-of-speech coloring, picture dictionary, and **inline translation** (Learning Tools). Line Focus supported in Win10 client and web.
- **Learning Tools** localized in **35+ languages**; dictation in several languages.
- **Screen readers:** Documented Narrator/JAWS/VoiceOver workflows for reading pages, inserting content, and sharing.
- **Keyboard-only** operation supported across clients.
- **Dictation / voice typing** available (Microsoft 365).

---

## 19. Localization

- Core OneNote UI ships localized via Office Language Interface Packs (broad Office language coverage; exact OneNote count not published — unverified).
- **OneNote Mobile** historically: English, French, Italian, German, Spanish, Dutch, Swedish, Brazilian Portuguese, Chinese (Simplified/Traditional), Japanese.
- 2026 added **per-page proofing-language** interoperability for multilingual notes.
- Handwriting recognition and OCR breadth depend on installed OS language packs.

---

## 20. Pricing & Plans & Free-Tier Limits

- **OneNote app is free** on all platforms; almost all core features work for free.
- **Storage is the paywall:** free tier is bounded by OneDrive's **5 GB free** shared across all OneDrive/M365 apps.
- **Microsoft 365 Basic:** 100 GB (~$1.99/mo).
- **Microsoft 365 Personal:** ~$9.99/mo or $99.99/yr, **1 TB**.
- **Microsoft 365 Family:** ~$12.99/mo or $129.99/yr, up to 6 users, **1 TB each**, includes full Office.
- **Subscription-gated features:** Math Assistant, Stickers, some ink/effect features, and (for individuals) parts of Copilot. Full **Copilot in OneNote** needs a Copilot (Work) add-on.

---

## 21. Privacy & Security Claims

- **Password-protected sections:** **128-bit AES** encryption at the section level. Cannot lock an entire notebook — only individual sections. Auto-lock on navigate-away or after an idle timeout. **If the password is lost, notes are unrecoverable — "Not even Microsoft Technical Support could unlock your notes."**
- **Limits of password protection:** locked sections are **excluded from search**, **excluded from Find Tags summaries**, **inaccessible in live sharing sessions even if unlocked**, and **audio/video recordings inside a section are stored as separate files that cannot be password-protected**.
- **Enterprise:** Sensitivity labels (2026 "modern sensitivity labels"), IRM-protected SharePoint (web opens read-only), Intune/MAM controls. Microsoft warns some features (Immersive Reader, Sticky Notes, Translator, Researcher, Copilot, Class Notebook add-in) can leak enterprise data via copy/paste/drag-drop due to web-tech limits, mitigated via URL filtering/Intune.
- **No zero-knowledge / end-to-end encryption:** third-party review rates privacy "Decent (~70%)," notes default diagnostic-data collection and absence of zero-knowledge encryption. Data residency follows the underlying OneDrive/SharePoint tenant region (not restated on OneNote pages — unverified specifics).

---

## 22. Known User Complaints / Weaknesses (cited)

- **Sync reliability:** recurring complaints of sync failures, "not connected" red-X with no error, permission errors, and notes that "will NOT sync into OneDrive" (Microsoft Q&A threads; Cloudwards review). Data-loss reports ("all gone") appear in reviews.
- **Performance:** app reported as slow/laggy, causing MacBook lag/overheating; typing lag (sometimes 1–2s/char), occasionally traced to Grammarly integration (Microsoft Q&A).
- **Handwriting search unreliable:** reviewers say search of handwritten notes "does not work, regardless of what Microsoft advertises" (Cloudwards).
- **Export friction:** no easy export to PowerPoint/Markdown; getting notes *out* of OneNote is hard (Cloudwards).
- **Android app quality:** described as buggy with "horrible controls," image-insert difficulty vs. iOS.
- **Version fragmentation:** confusing split between Windows desktop, retired Windows 10 UWP app, web, and mobile with uneven features; ink-to-text absent on Mac/iPad; web can't ink/record.
- **PDF markup:** PDFs rasterized to images (no true PDF annotation layer, no form fields/outlines) — weak vs. GoodNotes/Notability/Xodo.
- **No true offline on web; no notebook covers; no threaded comments.**

---

## What Sane Notes must match (table stakes)

| Area | The bar OneNote sets |
|---|---|
| Free-form canvas | Movable text/image/ink containers on an unbounded page, not just linear docs |
| Cross-platform sync | Real-time cloud sync across Win/Mac/iPad/iPhone/Android/Web with offline cache + merge |
| Organization | Notebook → section → page → subpage hierarchy, color-coding, favorites, fast global search with scope |
| Universal search | Search typed text **and** OCR'd image text **and** handwriting **and** audio |
| Ink toolkit | Multiple pens, highlighter (5 widths), stroke + point + scribble erase, lasso, ruler, custom colors, palm rejection |
| Ink conversion | Ink-to-text, ink-to-shape, ink-to-math on the primary tablet platform (not desktop-only) |
| Tags & tasks | Interactive checkboxes, taggable notes with a filterable tag-summary/roll-up |
| Rich text & tables | Headings/styles, lists, tables, internal wiki-links, hyperlinks |
| Media | Insert images with in-app crop, audio/video recording with playback |
| PDF/doc import | Import files as annotatable pages + attach originals |
| Templates | Built-in + custom templates, page backgrounds/rule lines, per-section default |
| Math | Solve steps, graphing, multiple methods |
| Collaboration | Multi-user co-authoring with author attribution and change highlighting |
| Version history | Per-page version restore + recycle bin (~60 days) |
| Security | Password/section locking with real encryption; clear data-loss warnings |
| AI | Summarize, rewrite, generate to-dos, draft from notes |
| Accessibility | Read-aloud, line focus, text spacing, dyslexia-friendly reading, screen-reader support |
| Export | PDF **and** editable-doc export |
| Pricing | A genuinely usable free tier |

## What Sane Notes could beat them on

- **One consistent app** — kill the platform feature-matrix chaos. Ink-to-text, ink-to-shape, ink-to-math, media recording, and custom tags should work **identically on every platform including web and Mac/iPad** (OneNote's biggest structural weakness).
- **Rock-solid sync + zero data loss** — a reliability-first sync engine with visible conflict resolution and instant, trustworthy version history directly addresses OneNote's #1 complaint.
- **Real PDF annotation** — a true vector PDF layer (preserve forms, outlines, hyperlinks, searchable text; no rasterization) beats OneNote's image-printout approach and rivals GoodNotes/Notability.
- **Reliable handwriting search & recognition** built-in and cross-platform, not dependent on OS language packs — and honest about supported languages.
- **Frictionless export & portability** — clean export to Markdown, PDF, Word, HTML, and images; no lock-in. Directly targets the "can't get my notes out" complaint.
- **Performance** — fast typing/inking with no lag on large notebooks; lightweight mobile apps (OneNote is criticized as heavy/slow, Android especially).
- **Modern collaboration** — threaded margin comments, mentions, presence, and live cursors (OneNote lacks true comments).
- **Privacy leadership** — offer optional **end-to-end / zero-knowledge encryption** for locked content and clear data-residency; whole-**notebook** (not just section) locking with biometric unlock.
- **Notebook identity & delight** — cover art, richer paper/template ecosystem, better sticker/handwriting aesthetics.
- **Transparent, generous free tier** — more than 5 GB and features not gated behind an Office subscription (Math Assistant, effect pens, stickers are paywalled in OneNote).
- **Best-in-class stylus UX** — map Apple Pencil double-tap/squeeze and Surface Pen barrel actions to real tool switches; superior pressure/tilt/smoothing that OneNote never documents.

---

## Sources

Pages fetched and read in full:
- https://support.microsoft.com/en-us/onenote/ (OneNote help hub)
- https://support.microsoft.com/en-US/OneNote/onenote-help-and-learning/learn-more-about-drawing-tools
- https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/convert-your-ink-to-text-shape-and-math-equations
- https://support.microsoft.com/en-us/topic/create-math-equations-using-ink-or-text-with-math-assistant-in-onenote-dc818fad-60e0-432d-8cae-b61f9febf874
- https://support.microsoft.com/en-us/office/copy-text-from-pictures-and-file-printouts-using-ocr-in-onenote-93a70a2f-ebcd-42dc-9f0b-19b09fd775b4
- https://support.microsoft.com/en-us/office/take-handwritten-notes-in-onenote-0ec88c54-05f3-4cac-b452-9ee62cebbd4c
- https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/sync-a-notebook-in-onenote
- https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/how-to-share-a-onenote-notebook
- https://support.microsoft.com/en-us/office/password-protect-your-notes-e5ffd8fd-e811-441a-aa02-e13f0f445933
- https://support.microsoft.com/en-us/onenote/create-or-customize-page-templates
- https://support.microsoft.com/en-us/office/frequently-asked-questions-about-copilot-in-onenote-2d9136e0-132a-4d4c-ab0e-39cf3ed914cc
- https://support.microsoft.com/en-us/accessibility/onenote/keyboard-shortcuts-in-onenote
- https://support.microsoft.com/en-us/office/what-s-the-difference-between-the-onenote-versions-a624e692-b78b-4c09-b07f-46181958118f
- https://support.microsoft.com/en-us/office/differences-between-using-a-notebook-in-the-browser-and-in-onenote-a3d1fc13-ac74-456b-b391-b633a62aa83f
- https://support.microsoft.com/en-us/onenote/touch-gestures-in-onenote-for-windows-10
- https://support.microsoft.com/en-us/office/handwrite-draw-and-sketch-in-onenote-for-ipad-or-iphone-1c1f961e-138e-4090-80d3-5b7af4543bfb
- https://support.microsoft.com/en-us/office/draw-and-annotate-with-ink-in-onenote-for-mac-07dcdd04-140c-4e1e-9e01-ed40938f21a9
- https://support.microsoft.com/en-us/office/enterprise-data-protection-considerations-in-microsoft-onenote-16cbf4fc-456c-4576-b9d2-206c25d0f1f2
- https://www.cloudwards.net/onenote-review/
- https://www.geeky-gadgets.com/latest-onenote-update-2026/

Pages surfaced via search whose snippets informed specific claims:
- https://support.microsoft.com/en-us/onenote/convert-your-ink-to-shapes-and-math-equations
- https://support.microsoft.com/en-us/office/solve-math-equations-with-math-assistant-in-onenote-1b37bb8d-ecd1-40d7-8d0f-5e6e46547441
- https://support.microsoft.com/en-us/office/record-audio-or-video-notes-b90fa4a2-253b-47ec-99bd-c9b368268465
- https://support.microsoft.com/en-us/office/record-audio-notes-in-onenote-for-windows-10-96301c11-ad5b-44b5-a446-8f30f5d1b9d0
- https://support.microsoft.com/en-us/onenote/getting-started-with-the-onenote-web-clipper
- https://support.microsoft.com/en-us/office/apply-a-tag-to-a-note-in-onenote (and search-for-tagged-notes / create-a-to-do-checklist pages)
- https://support.microsoft.com/en-us/office/search-notes-in-onenote-539c3b56-accb-4e16-834d-61a6252ad65b
- https://support.microsoft.com/en-us/topic/use-immersive-reader-for-onenote-10712138-b4ed-4513-958d-d9a1b3038170
- https://support.microsoft.com/en-us/topic/use-line-focus-in-immersive-reader-for-office-for-the-web-and-onenote-815d5ae2-9291-4d57-b6d5-780280da27c7
- https://support.microsoft.com/en-us/topic/create-a-class-notebook-in-onenote-5d30ac45-dc22-4399-a80a-700ce7d18d11
- https://support.microsoft.com/en-us/education/teams/use-class-notebook-in-teams
- https://support.microsoft.com/en-us/topic/get-started-with-sticky-notes-86b36182-fdf5-4f9b-af7a-2846f83263f5
- https://support.microsoft.com/en-us/office/see-your-sticky-notes-on-other-devices-and-the-web-cf4bacd0-c042-46fd-9077-ca8c82dc0236
- https://support.microsoft.com/en-us/office/use-the-onenote-feed-in-microsoft-onenote-02f298f8-f098-4bf3-a7ef-9eba6c980982
- https://support.microsoft.com/en-us/office/insert-pdf-printouts-into-notes-in-onenote-for-mac-fdf776d5-f18b-4d82-b2c5-0eb1ce5d6701
- https://support.microsoft.com/en-us/office/insert-or-attach-files-to-notes-f11eac68-144d-48bd-946f-c42d9104b17e
- https://support.microsoft.com/en-us/office/show-authors-in-a-shared-notebook-in-onenote-for-windows-b6a043bd-e46b-4d50-9e96-b6df1b0ce569
- https://support.microsoft.com/en-us/office/how-to-check-recent-changes-in-a-notebook-in-onenote-for-windows-55dc5183-9112-4c7e-a9cf-44cd66c19c77
- https://support.microsoft.com/en-us/office/recover-deleted-notes-32ed1036-74fd-4c21-bc28-033a486e6b14
- https://support.microsoft.com/en-us/office/select-a-drawing-mode-in-onenote-for-ipad-or-iphone-8e2249f8-23ff-4fd8-b0bf-693aea21744c
- https://support.microsoft.com/en-us/office/erase-ink-strokes-in-microsoft-onenote-68e89773-02d8-477f-9661-d1096e8cc6e2
- https://support.microsoft.com/en-us/onenote/protect-notes-with-a-password-in-onenote-for-windows-10
- https://www.microsoft.com/en-us/microsoft-365/onedrive/onedrive-plans-and-pricing
- https://techcommunity.microsoft.com/blog/microsoft-copilot-blog/what%E2%80%99s-new-in-microsoft-copilot--august-2026/4551960
- https://learn.microsoft.com/en-us/answers/questions/4916508/onenote-doesnt-sync-error-code-80070005 (sync-failure complaints)
- https://www.neowin.net/news/learning-tools-for-onenote-enters-general-availability-supports-more-languages/ (Learning Tools 35+ languages)
