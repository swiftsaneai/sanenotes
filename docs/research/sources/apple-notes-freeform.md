# Apple Notes & Apple Freeform — Exhaustive Feature Inventory (iOS/iPadOS/macOS, through iPadOS 26)

**Scope:** Apple Notes and Apple Freeform on iPhone, iPad, Mac and Apple Vision Pro, current through iPadOS 18 (2024) and iPadOS 26 (2025 — Apple renumbered all OSes to `26`, so "iPadOS 26" is the 2025 successor to iPadOS 18, not a far-future release). Sourced from Apple's own support guides, Apple Newsroom / WWDC posts, the Apple Platform Security guide, and — for weaknesses only — third-party reviews and forums. Claims not traceable to a fetched Apple page are marked **(unverified)**.

Both apps are **free**, bundled with the OS, and require no separate purchase or subscription. Their cost surface is iCloud storage (see Pricing).

---

## 1. Organization & Library (Notes)

- **Folders and subfolders.** Notes supports nested folders; from the folders list you tap **Edit** to add, move, rename and delete folders. Notes can also be **pinned** to the top of a list.
- **Tags.** Type `#` followed by a name (e.g. `#work`, `#shopping`) plus a space/return to tag a note. A note can carry multiple tags. A **Tag Browser** lets you filter across folders. Tags are an **iCloud-account-only** feature (not available on IMAP/Gmail-backed accounts).
- **Smart Folders.** Auto-populating folders driven by **filters** — you can filter by tags, dates (created/edited), mentions, checklists, attachments, locked state, quick-notes, "shared", and more, and choose **match any / match all**. Notes stay in their original folder; Smart Folders are saved queries. Converting an existing folder to a Smart Folder moves its notes to the Notes folder and tags them with the folder name; you **cannot** convert a shared folder, a folder containing a subfolder, or a folder containing locked notes.
- **Views:** list view, **Gallery view** (thumbnail grid), and an **Attachments browser** (photos, scans, links, documents grouped by type). Sort order and (in iOS/iPadOS 26) tag-filter state are now **persistent/sticky** across sessions.
- **Search** across typed text, handwriting, objects in images, scanned text and tags (see §8).

Freeform library: boards live in a single grid; you can **search boards**, delete and **recover** boards, and browse recently deleted.

---

## 2. Handwriting & Ink Tools

Notes uses Apple's system **Markup / PencilKit** toolbar (shared with Preview, Freeform, Journal and third-party apps).

- **Pen tools (confirmed on Apple's Markup guide):** **Pen**, **Mono line** (monoline), **Marker** (highlighter-style), **Pencil**, plus **Eraser**, **Lasso** (selection), and **Ruler**. iPadOS 26 adds a **reed pen** — a calligraphy nib using **stroke-angle presets** for traditional calligraphy with Apple Pencil or touch, available across Notes, Preview, Freeform, Journal and Markup. Additional PencilKit nibs commonly cited (fountain pen, watercolor, crayon) exist in the broader palette **(unverified against an Apple page in this pass)**.
- **Pressure & tilt:** Apple Pencil strokes respond to pressure and tilt (thicker/shading), a PencilKit behavior **(unverified in the exact fetched pages, but standard)**.
- **Line weight & opacity:** tap the selected tool again to choose a **thickness**, and drag a slider for **opacity**.
- **Color:** color picker with **Grid**, **Spectrum**, and **Sliders** tabs for precise color choice.
- **Eraser modes (two):** **Pixel Eraser** — scrub over part of a stroke to remove just that area; **Object Eraser** — tap a whole stroke to delete it entirely.
- **Lasso / Smart Selection:** select drawings and handwriting with the same gestures as typed text; selected ink can be **Cut / Copy / Delete / Duplicate / Copy as Text / Translate**, and added to **Image Playground** ("Add to Playground").
- **Ruler:** draw straight lines along its edge; rotate with two fingers, move with one; toggle off by tapping the ruler again.
- **Ink-to-shape / shape recognition:** draw a shape and hold at the end to snap it to a perfect shape — Apple's shape set includes circles, ellipses, squares, rectangles, triangles, stars, hearts, pentagons and speech bubbles, plus straight lines, curves and arrows (~9 shapes) **(shape count from third-party guide)**.
- **Smart Script (iPadOS 18+):** refines handwriting in real time to be smoother, straighter and more legible while preserving your personal style. Enable via handwriting tools → More → **Auto-refine Handwriting**. On selected ink you can **Refine** (smoother/straighter/more legible), **Straighten** (level it), **Correct spelling** (tap underlined words), **Move handwriting** (drag to reposition, or insert space so text reflows), and **paste typed text so it renders in your own handwriting**. You can **scratch out** writing to erase it.
- **Scribble:** tap the Scribble tool (left of the pen) to convert handwriting to typed text as you write, in supported languages.
- **Paper style:** Notes offers **Lines & Grids** background options for handwriting **(unverified in this pass; known feature)**.

---

## 3. Text & Typing (Notes)

- **Paragraph styles:** Title, Heading, Subheading, Body, and **Monospaced/Monostyled**.
- **Character formatting:** bold, italic, underline, strikethrough, and **highlight** — five colors added in iOS/iPadOS 18: **pink, purple, orange, mint, blue**.
- **Structure:** block quote; **bulleted, dashed and numbered lists**; **checklists** (with an option to auto-move completed items to the bottom). **Collapsible sections** under Headings/Subheadings (tap the chevron to collapse) — **iCloud- or Mac-account only**, not on Google/IMAP accounts.
- **Tables:** insert tables; add/remove rows and columns; convert table to text. Widely reported as **"twitchy" on large tables**.
- **Links:** hyperlinks on text (Cmd-K), and **note-to-note links** (link one note to another) — introduced before iOS 18.
- **Markdown:** Notes has **no true Markdown editing/source mode**, but iOS/iPadOS/macOS 26 add **import and export of a note as a Markdown file**. iOS/iPadOS 26 also improved paste-formatting behavior and inline checklist styling.
- The **first line becomes the note's title**; a default account and default "new note starts as" style are configurable in Settings.

---

## 4. Audio (Notes)

- **Record audio** as an attachment inside a note: attachment button → **Record Audio**. You can keep typing/handwriting while recording.
- **Live transcription:** a running transcript is generated as you speak; **does not require Apple Intelligence** (available to all supported devices).
- **Transcript interactions:** tap any word to **play the audio from that point**; **search** the transcript; **add the transcript text into the note**; **copy** it; **rename** the recording.
- **Summaries:** with **Apple Intelligence** enabled you can **summarize** a recording.
- **Transcription languages:** English, Spanish, Portuguese, Italian, French, German, Japanese, Korean, Simplified Chinese, Traditional Chinese.
- **Call recording:** iOS 18 added Phone-app **call recording with transcription saved into Notes**; iPadOS/iOS 26 extend capturing Phone conversations as **audio recordings with transcriptions** in Notes.

---

## 5. PDF & Documents (Notes)

- **Document scanner:** scan multi-page documents (auto edge detection). Scans are **OCR-searchable (Live Text)**.
- **Scanned-document editing:** per-page **Rotate Left/Right**, **Filters**, **Crop Page**, **Insert Blank Page** (Filters and Crop are scanned-document only).
- **PDF import & view sizes:** small / **Medium** / **Large** inline previews plus **Quick Look** full-screen; at Medium/Large you can **Show/Hide Thumbnails**.
- **Markup / annotation:** draw and write on PDFs and scans with Apple Pencil or finger using the full Markup toolset; real-time updates for collaborators.
- **AutoFill from handwriting:** the new **Preview app for iPad (iPadOS 26)** adds PDF form **AutoFill** and Apple Pencil markup; Preview reads/writes via the Files app. (Preview is a separate app but part of the same PDF workflow story.)
- **Export fidelity:** notes export/print to **PDF**; Markdown export (26) is text-only and reportedly imperfect.

---

## 6. Images, Media & Stickers

- Attach **photos, video, links (rich previews), maps, documents, scanned docs**. **Live Text** works on images (select/copy text, look up).
- **Stickers** and diagrams can be added and appear live to collaborators when marking up a shared note.
- **Add to Image Playground** ("Playground") from selected content on Apple-Intelligence devices.

---

## 7. Templates, Paper Types & Covers

- Notes has **no rich template gallery or note "covers."** It offers **Lines & Grids** paper backgrounds for handwriting **(unverified this pass)** but nothing like page templates/covers found in dedicated note apps — a recurring complaint.
- Freeform has **no formal template library** either; it starts from a blank infinite canvas (Apple positions it as a brainstorming surface, not a document/deck producer).

---

## 8. Search, OCR & Handwriting Recognition (Languages)

- **Search** covers tags, typed text, **handwritten text** (supported languages), **objects in images**, and **text in scanned documents**.
- Handwriting recognition indexes **automatically** as you write — no manual scan step.
- **Recognition languages:** ~**25** including English, Spanish, French, German, Italian, Portuguese, Dutch, Simplified & Traditional Chinese, Japanese, Korean, Arabic, Hindi, Russian **(count/list from a third-party OCR guide — treat exact list as (unverified))**.
- **Scribble (handwriting→text) languages** are a smaller subset: English, Chinese, French, German, Italian, Portuguese, Spanish.
- Reported accuracy ~95%+ on neat print, 80–90% on cursive **(third-party estimate, unverified)**.

---

## 9. Math & Conversion (Math Notes)

- **Math Notes** solves **typed or handwritten** expressions. Add an **`=`** to trigger a result; answers render in your own handwriting (handwritten input) or as suggested solution text (typed).
- **Live/dynamic:** editing the expression updates the result in real time; input errors get a **red underline** you can tap to diagnose.
- **Variables:** assign values to variables (great for budgets/coursework); iPadOS/iOS 26 supports equations with **three variables**.
- **Graphing:** write/type an equation and **Insert Graph** (one tap); plot **multiple equations on one graph**; resize/color/inspect points. iPadOS/iOS 26 adds **3D graphs** for three-variable equations.
- **Math Zones** let equations live inside regular notes.
- **Availability:** Notes, the **Calculator** app (iPad got Calculator + Math Notes in iPadOS 18), **Freeform**, and per third-party reporting **Journal** and **Messages** **(latter two unverified)**. Math Notes basic solving does **not** require Apple Intelligence, but requires a supported device.

---

## 10. AI Features (Apple Intelligence)

- **Writing Tools** (systemwide, incl. Notes): **Proofread** (grammar/word-choice/structure with explanations you can accept), **Rewrite** with tone presets **Friendly / Professional / Concise** plus **"Describe your change"** free-text (e.g. "make this more enthusiastic"), **Summary**, **Key Points**, **List**, and **Table** (reorganize text into a table).
- **Audio summaries** of recordings (see §4).
- **Image Playground / Genmoji** insertion from Notes on supported devices.
- **Requirements:** Apple Intelligence needs **iPad with M1 or later** (and supported iPhones), Apple Intelligence turned on, and a supported Siri/device language. Runs **on-device + Private Cloud Compute** **(PCC detail unverified this pass)**.

---

## 11. Sync, Backup & Offline

- **iCloud sync** across iPhone, iPad, Mac, Vision Pro, and the web at **iCloud.com/notes**.
- **Locked notes are end-to-end encrypted** in iCloud (see §14).
- **Accounts:** iCloud, **"On My iPad/iPhone" local** account, and third-party (Gmail/IMAP, Exchange) — but IMAP/Google accounts **lose** tags, Smart Folders, collapsible sections, locked notes, and other advanced features.
- Notes work **offline** and sync when reconnected. iOS/iPadOS 26 reduced cross-device **reflow/formatting drift** when reopening notes on another device.

---

## 12. Sharing, Export, Links & Publishing

- **Share/export a note:** send a copy, **PDF**, or **print**; **Markdown export** added in OS 26.
- **Note links:** link notes to each other; hyperlinks to the web.
- No public web **publishing** of individual notes (share is invite/link-based collaboration, not open publishing).

---

## 13. Collaboration & Comments

- **Notes:** tap Share → **Collaborate**; invite via Messages, Mail, or a **link**. Everyone can add text, checklists, drawings, stickers, attachments with **live updates**. An **activity/highlights** view shows recent changes and who made them; **@mentions** notify collaborators. **Shared folders** are supported. Collaboration requires all participants on **Apple devices / iCloud**.
- **Freeform:** share a board with **up to 100 people**; real-time multi-user editing; integrated **FaceTime**; comments. **Apple devices only** — Windows/Android users are excluded.

---

## 14. Privacy & Security Claims

- **Locked notes** can be secured with the **device passcode** or a **custom Notes password**, unlocked by **Face ID / Touch ID / Optic ID** or password.
- **End-to-end encryption (per Apple Platform Security guide):** a **16-byte key is derived from the passphrase using PBKDF2 + SHA-256**; notes and attachments are encrypted with **AES-GCM** (Galois/Counter Mode). Encrypted content includes note text, images, sketches, tables, maps, websites, initialization vectors and **tags**.
- **Not encrypted / caveats:** metadata such as **creation and modification dates**; notes containing **unsupported attachment types cannot be locked at all**.
- **Sessions:** locked notes stay open briefly then re-lock — **~3 minutes** in background on iPhone/iPad, **~8 minutes** on Mac, or when the device locks.
- **Shared (non-passphrase) notes** use CloudKit encrypted data types; assets are always encrypted with a key that is itself encrypted in the CKRecord, though metadata stays unencrypted.
- **Recovery:** forgetting the passphrase (after 3 tries you can reset) leaves previously locked notes **inaccessible** unless you recall the original passphrase.

---

## 15. Presentation / Whiteboard / Multi-Window / Split View

- **Freeform scenes:** a **scene** is a saved view (frame) of the board. Save via More → **Add Scene**; the **Scene Navigator** docks at the bottom. You can **present/play** scenes with back/forward navigation, **reorder**, **rename**, **reframe** and **delete** them. A scene framed on Mac may reframe on iPhone portrait.
- **Freeform canvas:** infinite board, **zoom 10%–400%**, alignment guides and a hideable grid.
- **Multi-window:** iPad supports Split View / Stage Manager; **iPadOS 26 adds a full Mac-like windowing system**. Notes supports opening a note in its own window on iPad/Mac; **Quick Note** floats as an overlay.

---

## 16. Stylus Gestures & Apple Pencil

- **Quick Note:** swipe Apple Pencil in from the **bottom-right corner** of the iPad to start a Quick Note anywhere in the system; **bottom-left corner** captures a **screenshot** to mark up.
- **Take a note from the Lock Screen** by tapping the screen with Apple Pencil (compatible iPad).
- **Scribble** (handwriting→text) and **scratch-to-erase** on ink.
- **Model-specific gestures (general knowledge; the fetched Apple pages did not enumerate them cleanly, so treat model mapping as (unverified)):**
  - **Apple Pencil Pro:** **squeeze** (tool palette/menu), **barrel roll** (rotate shaped/calligraphy nibs), **haptic feedback**, **hover**, **double-tap**, and **Find My** location.
  - **Apple Pencil (2nd gen):** **double-tap** to switch tools; **hover** on M-series iPads.
  - **Apple Pencil (USB-C):** **hover** support; no double-tap, squeeze, or pressure sensitivity.
  - **Apple Pencil (1st gen):** no double-tap/squeeze/hover.
- **Palm rejection / wrist protection** is automatic while a Markup tool is active.

---

## 17. Keyboard Shortcuts (Notes)

- **New note:** Cmd-N.
- **Checklist:** Shift-Cmd-L.
- **Title:** Shift-Cmd-T · **Heading:** Shift-Cmd-H · **Body:** Shift-Cmd-B.
- **Add link:** Cmd-K.
- **Indent / outdent list:** Tab / Shift-Tab.
- On iPad, **hold Cmd** to reveal the on-screen shortcut cheat sheet. Freeform and Notes both ship keyboard-shortcut reference pages in Apple's guides.

---

## 18. Platforms & Feature Differences

- **Apple Notes:** iPhone (iOS), iPad (iPadOS), Mac (macOS), **Apple Vision Pro** (visionOS), and web (**iCloud.com/notes**). iPad/Pencil-exclusive: **Smart Script, handwriting refinement, Math Notes handwriting, Scribble, Quick Note corner swipe**. **iCloud-account-only:** tags, Smart Folders, collapsible sections, locked notes, note links. Apple Intelligence features need M1+ iPad / supported iPhone.
- **Freeform:** iPhone, iPad, Mac, **Apple Vision Pro** — **Apple-only**, no Windows/Android/Linux app. Requires **iOS/iPadOS 16.2, macOS 13.1 (Ventura), visionOS 1.0**; launched **Dec 13, 2022**. Web access via iCloud.com has historically been limited/absent **(a Freeform web endpoint exists but appears gated — unverified)**.

---

## 19. Accessibility

- Both apps inherit system accessibility: **VoiceOver, Dynamic Type, Voice Control, Switch Control, Zoom, Increase Contrast** **(general platform support; not enumerated on the fetched app pages — treat as (unverified) specifics).** Notes' typed text, transcripts and OCR'd scans improve screen-reader usability of otherwise-image content.

---

## 20. Localization

- Notes UI is localized broadly. **Transcription:** 10 languages (§4). **Handwriting recognition:** ~25 languages (§8). **Scribble:** 7 languages. **Live Translation** and Writing Tools follow Apple Intelligence's supported-language rollout.

---

## 21. Pricing & Plans & Free-Tier Limits

- **Both apps are free** with the OS; no in-app purchase.
- Storage is via **iCloud**: **5 GB free**, then **iCloud+** — **50 GB $0.99/mo, 200 GB $2.99/mo, 2 TB $9.99/mo, 6 TB $29.99/mo, 12 TB $59.99/mo** (US). Paid tiers add Private Relay, Hide My Email, Custom Email Domain, HomeKit Secure Video, and Family Sharing (up to 6). No feature paywall inside Notes/Freeform themselves; only total attachment/storage volume is bounded by the iCloud tier.

---

## 22. Known User Complaints / Weaknesses (cited)

- **No true Markdown editing/source mode** — only file import/export in OS 26, and export is reportedly lossy (Podfeet; techyorker: "still lacks full Markdown mode or source view").
- **Tables get "twitchy"** on large/complex tables (Podfeet).
- **Ecosystem lock-in:** Apple-only; Notes collaboration and Freeform both exclude Windows/Android (Intego; note-app comparisons).
- **Advanced features gated to iCloud accounts** (tags, Smart Folders, collapsible sections, locked notes) — silently missing on Gmail/IMAP (MacRumors, 9to5Mac).
- **No knowledge-base features:** no databases, no backlinks/graph view, weak structure — repeatedly contrasted with Obsidian/Notion; "no structure, no links, no databases… will you find notes again?" (note-app comparison reviews).
- **AI is device- and account-gated:** base Notes can't summarize a PDF, generate flashcards, etc., without Apple Intelligence on newer hardware (comparison reviews).
- **No version history** in Notes **(commonly reported; not confirmed on an Apple page — unverified)**.
- **Freeform export is PDF-only** (whole board as one page, or one scene per page) — no OPML/structured export; users also report **Export button crashes** and **images not syncing** on shared boards (Intego; Apple Community "Freeform Woes").
- **No template/cover library** in either app (§7).

---

## What Sane Notes must match (table stakes)

| Capability | Why it's table stakes |
|---|---|
| Folders + subfolders, tags, saved/smart searches, pinning, gallery view | Baseline organization users expect from Notes. |
| Rich text: title/heading/subheading/body/monospaced, lists, checklists (auto-sink completed), tables, block quote, highlight colors, collapsible sections | Direct parity with Notes' formatting. |
| Full Apple Pencil ink stack: multiple nibs (incl. calligraphy/reed), pressure/tilt, opacity + weight, Grid/Spectrum/Slider color, pixel **and** object erasers, ruler, lasso, ink-to-shape | Notes/PencilKit set is the floor for a serious iPad note app. |
| Handwriting refinement (Smart Script-equivalent), handwriting→text (Scribble), handwriting **search** and Copy-as-Text | Now expected on iPad. |
| Audio recording with **live transcript** (tap-to-seek) — without requiring paid AI | Notes gives this free to everyone. |
| Document scanner with OCR + searchable scans; PDF import, inline view sizes, thumbnails, Markup annotation, PDF form fill | Core "paperless" workflow. |
| Math solving/graphing (type or handwrite, live results, variables, 2D graphs) | Math Notes is now a headline expectation on iPad. |
| Real-time collaboration with invite links, change highlights, @mentions, comments | Baseline for shared notes/boards. |
| **End-to-end-encrypted locked notes** (passcode or custom password, biometrics), reliable sync + offline, web access | Security + ubiquity users assume. |
| Markdown **import/export** and PDF export; keyboard shortcuts | OS-26-era baseline. |
| Infinite-canvas / whiteboard mode with shapes, connectors, sticky notes, scenes/presentation (Freeform parity) | If Sane competes with Freeform too. |

## What Sane Notes could beat them on

- **True Markdown-native editing** with a live source/preview toggle — Apple still refuses this; the single most-requested gap.
- **Backlinks, a graph view, and lightweight databases/queries** — beat Notes on knowledge management (the Obsidian/Notion wedge) while keeping Notes' speed.
- **Cross-platform, including Windows/Android/Linux/web** — Apple's hardest limitation to overcome; collaboration that isn't Apple-only.
- **Version history / note timeline** with restore — absent from Notes.
- **Local-first, portable file storage** (own your `.md` + attachments, no export wait) — Obsidian's advantage over Notes' opaque store.
- **On-device AI that works on any device and any account tier** — no M-series/Apple-Intelligence gating for summaries, transcript search, and PDF Q&A.
- **Structured export beyond PDF** for canvases (OPML/SVG/PNG/interactive), fixing Freeform's PDF-only, crash-prone export.
- **A real template & paper-style library** (covers, ruled/grid/dotted paper, reusable note templates) — a gap in both apps.
- **Robust large-table and long-document editing** without the reflow/twitchiness users report.
- **Rich AI-graded features** Notes lacks: flashcard generation from notes, lecture-recording summarization tied to the transcript timeline, and PDF key-point extraction.
- **Advanced pen physics** (per-nib tilt shading, custom nibs, brush import) and **stroke-level editing** exceeding PencilKit.

---

## Sources

- Apple Newsroom — iPadOS 18 introduces powerful intelligence features and apps for Apple Pencil: https://www.apple.com/newsroom/2024/06/ipados-18-introduces-powerful-intelligence-features-and-apps-for-apple-pencil/
- Apple Newsroom — iPadOS 26 introduces powerful new features: https://www.apple.com/newsroom/2025/06/ipados-26-introduces-powerful-new-features-that-push-ipad-even-further/
- Apple Support — Get started with Freeform on iPad: https://support.apple.com/guide/ipad/get-started-with-freeform-ipad9c59637d/ipados
- Apple Support — iPad User Guide (Notes & Freeform table of contents): https://support.apple.com/guide/ipad/toc/ipados
- Apple Support — Add drawings and handwriting in Notes on iPad: https://support.apple.com/guide/ipad/add-drawings-and-handwriting-ipada87a6078/ipados
- Apple Support — Write and draw in documents with Markup on iPad: https://support.apple.com/guide/ipad/write-and-draw-in-documents-ipad6350b8dc/ipados
- Apple Support — Do more with Apple Pencil: https://support.apple.com/guide/ipad/do-more-with-apple-pencil-ipad89415cd5/ipados
- Apple Support — Create and format notes on iPad: https://support.apple.com/guide/ipad/create-and-format-notes-ipad99e3f0bb/ipados
- Apple Support — Record and transcribe audio in Notes on iPad: https://support.apple.com/guide/ipad/record-and-transcribe-audio-ipadd0bde806/ipados
- Apple Support — Work with PDFs in Notes on iPad: https://support.apple.com/guide/ipad/work-with-pdfs-ipad6c8f7f84/ipados
- Apple Support — Search through your notes on iPad: https://support.apple.com/guide/ipad/search-notes-ipad64863a98/ipados
- Apple Support — Use Smart Folders on iPad: https://support.apple.com/guide/ipad/use-smart-folders-ipad0a267d6e/ipados
- Apple Support — Organize your notes with tags on iPad: https://support.apple.com/en-in/guide/ipad/ipadf688557f/ipados
- Apple Support — Use Tags and Smart Folders in Notes on iPhone and iPad: https://support.apple.com/en-us/102288
- Apple Support — Find the right words with Writing Tools on iPad: https://support.apple.com/guide/ipad/find-the-right-words-with-writing-tools-ipad04c3f67f/ipados
- Apple Support — How to lock or unlock notes on your iPhone or iPad: https://support.apple.com/en-us/102537
- Apple Platform Security — Secure features in the Notes app: https://support.apple.com/guide/security/secure-features-in-the-notes-app-sec1782bcab1/web
- Apple Support — Use keyboard shortcuts in Notes on iPad: https://support.apple.com/guide/ipad/use-keyboard-shortcuts-ipad8a907a42/ipados
- Apple Support — Keyboard shortcuts and gestures in Notes on Mac: https://support.apple.com/guide/notes/keyboard-shortcuts-and-gestures-apd46c25187e/mac
- Apple Support — Freeform: Navigate and present scenes: https://support.apple.com/guide/iphone/navigate-and-present-scenes-iphbe64aa259/ios
- Apple Support — Freeform: Add shapes, lines, and arrows: https://support.apple.com/guide/iphone/add-shapes-lines-and-arrows-iphd5300a341/ios
- Apple Support — Freeform: Send a copy or PDF of a board on iPad: https://support.apple.com/guide/ipad/send-a-copy-or-pdf-ipadfde4a50f/ipados
- Apple Support — Freeform User Guide for Mac: https://support.apple.com/guide/freeform/welcome/mac
- 9to5Mac — Everything new in Apple Notes for iOS 18: https://9to5mac.com/whats-new-in-apple-notes-for-ios-18/
- Techyorker — Everything new for Apple Notes in iOS 26: https://techyorker.com/heres-everything-new-for-apple-notes-in-ios-26/
- MacRumors — iOS 18: collapse sections, highlight text, attach files: https://www.macrumors.com/how-to/ios-notes-collapse-sections-highlight-text-attach-files/
- MacRumors — iPadOS 26 roundup: https://www.macrumors.com/roundup/ipados-26/
- How-To Geek — How to use Math Notes on iPhone, iPad, and Mac: https://www.howtogeek.com/how-to-use-math-notes-on-your-iphone-ipad-and-mac/
- How-To Geek — Apple Intelligence Writing Tools: https://www.howtogeek.com/how-to-use-apple-intelligence-writing-tools-on-iphone-ipad-and-mac/
- Intego — Apple Freeform lets you brainstorm and collaborate: https://www.intego.com/mac-security-blog/apple-freeform-lets-you-brainstorm-and-collaborate-on-mac-ipad-and-iphone/
- Wikipedia — Freeform (Apple): https://en.wikipedia.org/wiki/Freeform_(Apple)
- AppleMagazine — iPad handwriting search / Scribble recognition: https://applemagazine.com/ipad-handwriting-search/
- HandwritingOCR — Convert handwriting to text in Apple Notes (2026 guide): https://www.handwritingocr.com/handwriting-to-text/how-to-convert-handwriting-to-text-in-apple-notes
- Podfeet — Exporting Apple Notes as Markdown: https://www.podfeet.com/blog/2025/10/notes-export-as-markdown/
- AppleInsider — Record, summarize, and transcribe audio with Apple Notes on iOS 18: https://appleinsider.com/articles/24/06/13/record-summarize-and-transcribe-audio-with-apple-notes-on-ios-18
- MacRumors — iCloud+ perks / storage: https://www.macrumors.com/2025/10/06/apple-highlights-icloud-plus/
- SlashGear — iCloud storage plans and prices guide: https://www.slashgear.com/1966548/icloud-storage-plans-and-prices-guide/
- NoteLyn — Obsidian vs Apple Notes (weaknesses): https://www.notelyn.com/blog/obsidian-vs-apple-notes
- Apple Community — Freeform Woes (export crashes, sync): https://discussions.apple.com/thread/254884959
