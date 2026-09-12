# Notability (Ginger Labs) — Exhaustive Feature & Product Research

*Competitive teardown for the Sane Notes team. Scope: Notability for iPad/iPhone/Mac (plus new Android + Web App). Compiled from support.gingerlabs.com, the App Store/Play Store listings, notability.com, Wikipedia, and independent reviews/press. Claims trace to the Sources list at the end; items I could not confirm from an official page are marked "(unverified)".*

Notability is a freemium note-taking + PDF-annotation app by Ginger Labs (founded 2008; Notability v1 shipped April 1, 2010 alongside the original iPad; Mac version 2014). It is an Apple Design / Editors' Choice app with ~4.8★ across ~456K ratings. In 2025–2026 it pivoted hard toward AI ("Notability Learn"), launched its own cross-platform "Notability Cloud," shipped a Web App and a **native Android app** (Aug 2026), and re-introduced a one-time "Classic" purchase (July 2026). Written in Swift, TypeScript, and Objective-C.

---

## Organization & Library (notebooks / folders / tags / favorites / search)

- **Library** is the home surface: create notes (+New), search, create folders, open the Gallery, and reach Settings.
- **Folders / nesting:** Notes live in folders. Nesting is limited to **six levels deep** (GoodNotes allows unlimited) — a documented competitive weakness.
- **No first-class tags** and **no per-note tag system** are documented (tags exist only for Gallery publishing metadata). This is a recurring gap vs. tag-driven apps.
- **Note Covers** (Notability Cloud only): decorative preset covers shown as thumbnails in "All Notes" to add color/visual ID to the library. Collaborators with editor rights can change a shared note's cover. Preset-only (no custom uploads).
- **Content Manager & Bulk Actions:** page-level management (reorder, add, delete, bookmark, rotate pages) and bulk operations on notes/folders.
- **Recently Deleted:** deleted notes recoverable for 30 days.
- **Widgets:** Home Screen widgets (iOS) for quick note access/creation.
- **Digital planners:** supports importing external planners and using hyperlinked digital planners; 20,000+ templates available via Gallery.

## Handwriting & Ink Tools

Notability is Apple Pencil–optimized with "Highly Responsive Ink" (low latency). Every tool is customizable and can be duplicated/reordered in a **moveable, customizable Toolbox**; each tool has a **style tray** with up to **8 fast custom colors** in the toolbar and a 64-slot palette (color picker, eyedropper, HEX input).

### Pen / Pencil types
- **Pen** — standard ink for writing.
- **Pencil tool** — for sketching/shading/writing; **pressure-sensitive** ("press harder → darker"), and **tilt-shading** ("tilt the Pencil sideways to shade; more tilt = thicker line"). Note: **Apple Pencil (USB-C) does not support pressure sensitivity.**
- **Calligraphy Pen** (subscriber / Notability Cloud; iPhone + iPad only) — strokes "shift between thick and thin like a flat nib." **Nib-angle slider** (0° = widest vertical downstrokes; 30°/45° for right-handers; negative angles for left-handers) with a rotating visual preview. With **Apple Pencil Pro, nib angle follows barrel roll**, previews on hover, locks at stroke start; a **"Lock angle" toggle** overrides barrel roll and uses the slider. Optional **stabilization** to reduce jitter. Renders as regular ink on Android/Web.
- Android adds ink styles not on iOS: **rainbow and glitter pens** (per press coverage) (unverified against official Android docs).

### Pressure / tilt / smoothing
- Pressure sensitivity (line thickness/darkness) and tilt-shading as above.
- **Stabilization** exists for the Calligraphy Pen; general ink smoothing is implied but not documented in detail (unverified).

### Highlighter
- Translucent ink; editable/erasable "like regular ink."
- **Smart Highlighter:** long-press PDF text or typed text to snap-highlight (works on PDF/typed text, not handwriting).
- **Straight-line highlighter:** draw a line over text then hold to straighten.
- Style tray (~ menu): **pressure-sensitive ink, dashed lines, dotted lines**, adjustable size, custom colors.

### Eraser
- **Partial (precision) eraser** — erases ink segments; the resulting segments remain individually movable/editable with independent width/color.
- **Whole-stroke eraser** — removes an entire stroke at once.
- Size chosen from a popover. Neat trick: **draw a shape with the partial eraser and hold ~1s → it auto-corrects into a Perfect Shape.**

### Select / Lasso tool (formerly "Lasso")
- **Boxed (rectangle)** and **Freeform** selection modes (can duplicate the tool to keep both handy).
- Selects handwriting/sketches (and content across pages via workarounds).
- Actions: move, scale (pinch or bounding-box corners), rotate (two-finger twist or handles), style, **convert handwriting → text or → math**, copy/cut/paste (incl. into other apps via Split View), duplicate, group, delete, save as sticker.

### Shapes / ink-to-shape
- **Perfect Shapes:** draw and **hold** the stroke until it snaps. Recognizes **circle, ellipse, triangle, square, rectangle, pentagon, hexagon, arrow**, plus straight lines and 3-point curved lines. Works with any tool except Hand; finger or Pencil.
- **Red snapping guidelines** align shapes to other shapes/grid.
- Style menu: **Stroke and Fill** colors. Editable vertices/points; proportional resize; hold-during-creation to size. **Lock shapes** (Notability Cloud).

### Ruler
- Move with one finger; **tap compass → snap to nearest 45°**, **double-tap → 90° CCW**, **vertical pan → smooth rotation**. Double-tap to stamp lines; hold triangle to preview target line; auto-snaps drawn lines to the ruler.
- **Angle-measurement mode** (blue compass shows the angle difference; works with straight and curved lines). Units configurable (metric/imperial). **Not available on Mac or iPhone.**

### Other ink surfaces
- **Zoom View / Zoom writing box:** magnified writing area at bottom with a target box; **auto-scroll/auto-advance** across the line then wraps to a new line; pinch to zoom; adjustable box.
- **Tape (study aid):** cover content (terms/definitions) to self-quiz; 12 sizes, 9 patterns, custom colors; tap to reveal, "reveal all" toggle. (Note: some reviews mis-describe Tape as content-rearranging — official docs say it's a masking/study tool.)

## Text & Typing

- Tap to type directly on the page **or** create movable **text boxes** (single-tap type; double-tap or press-hold for text-box options; "Draw Text Boxes" mode; configurable Text Box Paper defaults).
- **Fonts:** import custom fonts (via third-party apps); recently used surface at top; up to **3 favorite Font Styles** as presets (Heart icon).
- **Emphasis:** bold / italic / underline / strikethrough (⌘B/⌘I/⌘U); size; color.
- **Lists:** bullet, numbered, checklists, and indentation (confirmed on the Web App feature list; also present on iOS).
- **Quote Blocks** (Notability Cloud) — toolbar or markdown `>` shortcut.
- **Code Blocks** (Notability Cloud) — monospace, preserves spacing; **26 languages** (Bash/Shell, C, C#, C++, CSS, Go, Haskell, HTML, Java, JavaScript, JSON, Kotlin, Lua, Markdown, MATLAB, Objective-C, OCaml, PHP, Python, R, Racket, Ruby, Rust, SQL, Swift, TypeScript, + Plain Text default); remembers last language; per-block language; markdown ``` shortcut.
- **Scribble** — Apple's handwriting-to-text-in-field (converts handwriting to typed text where enabled).
- **Text-to-Speech** — reads selected text in a language-appropriate voice.
- **Markdown shortcuts** for quote/code blocks. Hyperlinks in typed text: historically weak (a review cites "no hyperlink support within notes; requires copy/paste") (partially unverified — Notability has added link handling over time).

## Audio

- **Recording:** mic icon shows input meter + timer; a Library record button creates a note and starts capturing immediately. Recordings auto-split into ~1-hour segments (app recommends restarting after 1 hr).
- **Ink/text ↔ audio sync (signature feature):** "Audio recordings are linked to your annotations. While playing, tap anything in a note to jump to that point in the recording," and "annotations added while playing are synced to the recording." This is Notability's historical differentiator.
- **Playback speeds:** 0.7×, Normal, 1.25×, 1.5×, 2×.
- **Editing:** trim/split (drag black bars), rename, **merge** multiple recordings (except imported audio), delete, multiple clips per note.
- **Voice Boost** slider (amplify distant voices) + frequency tuning.
- **Import** MP4s and voice memos; **export** notes-with-audio as PDF (`.zip` bundling recordings) or native format.
- **Transcription — Audio Transcripts (post-recording, Plus):** unlimited for Plus; **~100+ languages** supported (Afrikaans through Yoruba — a very long Whisper-style list incl. Arabic, Chinese, Hindi, Japanese, Korean, etc.). Best with high-quality, single-speaker, single-language audio; **requires internet**. Time-stamped; copy/paste into notes.
- **Live Transcripts (Pro):** real-time words on-screen as you record, shown in the **Learn panel**. Can't be exported but can be copied ("Copy All"). Also on Web App.
- Background recording is **not** documented.

## PDF & Documents

- **Import:** PDFs, PowerPoints, spreadsheets, images, `.NBN`/`.note` native files; sources include Files, Dropbox, Google Drive, OneDrive, Box, WebDAV. Import into Library (long-press +New → Import) or into an open note; **drag-and-drop on Mac** (drag PDF onto a note to append; folder/bulk import with subfolders). File-size/count limits not documented.
- **Annotation:** full ink/highlight/text/media markup on PDFs, textbooks, slides. Option to **add blank margin space** (None/Left/Right/Both) to each PDF page for extra writing room.
- **Smart Highlighter** snaps to PDF text.
- **PDF Outlines:** auto-detects headings/TOC; tap heading to jump; expand/collapse subsections (via Content Manager → Outlines). iPad/iPhone/Mac.
- **Forms:** form-filling supported (App Store: "form filling capabilities").
- **Export fidelity:** PDF export preserves annotations; export also to JPEG/PNG/Note/NTB. One-tap PDF sharing.
- Bookmarks/thumbnails within PDFs and in-PDF hyperlink following are not fully documented (unverified).

## Images, Media & Stickers

- **Add Media tool:** Photos, Camera, **Stickers**, **GIFs**, **Sticky Notes**, and **Image Playground** (Apple Intelligence generative images; iOS 18.2+).
- **Stickers:** categories Home/Recents/Favorites/**My Stickers** (create your own from handwriting). Tap to place.
- **GIFs:** searchable; limitation — can't be sent behind images/stickers.
- **Sticky Notes:** blank/rule/grid/dot; writable with pen/pencil/highlighter; resizable; move with content.
- **Document scanning:** scan to PDF with corner adjustment.
- **Image editing:** crop, rotate (rotation handle), resize, send forward/backward, caption toggle, corner styles, **text wrap around images** (newer), draw on an image then send it backward to separate ink.
- **Locking:** stickers/images/stickies/GIFs can be locked to prevent accidental edits.
- **Image Playground** requires Apple Intelligence-capable device.

## Templates, Paper Types & Covers

- **Backgrounds:** Rule, Grid, Dot, (blank). Adjustable line/box/dot spacing via slider — 9 presets (½"–3").
- **Paper sizes:** Letter, Legal, Tabloid, A3, A4, A5, A6, A7; "Letter (Optimized)" recommended for iOS↔Mac.
- **Orientation:** portrait or landscape.
- **Paper color** customizable (specific palette not documented).
- **Custom Templates:** create from Gallery, from an existing note (Content Manager), or from scratch; live in "My Templates." **One template per note** — changing template/color changes *every* page in the note (a well-known limitation vs. GoodNotes' per-page templates). Multi-page PDF-as-template uses only page 1.
- **Gallery:** 20,000+ templates, planners, and community notes.

## Search, OCR & Handwriting Recognition

- **Global search** (Library) and **within-note search** (Content Manager); folder-filtered search with filter options.
- **Handwriting → text conversion:** Select ink → Convert → Text. **23 recognition languages:** English, Danish, Dutch, Filipino (Tagalog), French, German, Indonesian, Italian, Japanese, Korean, Malay, Norwegian Bokmål, Polish, Portuguese, Russian, Simplified Chinese, Spanish, Swedish, Thai, Traditional Chinese, Turkish, Ukrainian, Vietnamese. Language follows device default; changeable globally (new notes) or per note. **Android handwriting recognition covers 72 languages** (incl. Arabic, Hindi, Hebrew) — notably broader than iOS's 23.
- **Handwriting search** is gated behind subscription (Plus+); the free tier's lack of it is a common complaint that "cripples search."
- Constraint: Notability can only process handwriting in existing notes while the app is open.

## Math & Conversion

- **Handwriting → Math:** Select → Convert → Math produces hi-res, scalable equation images. Supports Latin alphabet + digits, math symbols/operations, Greek, functions (sin, cos, tan, mean, median, mod, norm, ceil, sort, var…), chemical elements, international units, and structural rules (fractions, roots, subscripts, matrices, partial fractions).
- **LaTeX:** edit the underlying LaTeX (right-click/tap → LaTeX editor); can author custom LaTeX. Color-coded equations retain colors.
- Math conversion requires Plus+. **Not available on Android at launch.**

## AI Features (Notability Learn / Notability AI)

Backed by **Anthropic Claude and Google Gemini** (per Wikipedia). Learn panel is the AI hub.

- **Summaries** (Plus): auto summaries of notes/PDFs/recordings.
- **Quizzes, Flashcards, Fill-in-the-blank** (Plus): generated from notes/PDFs/recordings; Memorize/Practice/Test modes; recent-score tracking; auto language detection. Content must be ~250–20,000 words to generate quizzes. **Plus cap = 400 combined questions+flashcards/month; Pro = unlimited.**
- **Smart Notes** (Pro): real-time structured notes that update as you record (pulls from ink/text/PDF); differs from raw transcripts. Don't sync across devices, can't export (only Copy All); on Mac but not during active recording.
- **Chat with Notes** (Pro): ask questions across a note — and, as of 2026, **across your whole library**; supports images in Chat.
- **Action Items** (Pro): checklist of tasks auto-generated from meeting notes/recordings.
- **Finish My Notes** (2026): enhances your notes with context from the transcript.
- **YouTube link-to-note:** paste a YouTube link → full note with transcript + summary (Plus: up to 100/mo, web only; Pro: unlimited).
- **Flashcards Import** (Notability Cloud): from **Anki** (TXT/CSV/APKG; APKG audio/images unsupported) or manual comma/tab-delimited; auto-creates a note; spaced-repetition ratings (Again/Hard/Good/Easy).
- **Learn Guarantee** marketing: coverage for the semester if it doesn't help.
- Availability: excluded in China Mainland, Hong Kong, Macau; not on MDM-managed devices.

## Sync, Backup & Offline

- **Notability Cloud** (new, free, separate from billing): Ginger Labs' own infrastructure syncing notes/folders/recordings across **iOS, Android, Mac, Web**. "Generous" (unspecified) storage; independent of Apple storage quota; **offline editing** syncs on reconnect; notes stay synced regardless of subscription status. Unavailable in China/HK/Macau or on Chinese App Store accounts.
- **iCloud Syncing** (legacy): two-way; same Apple ID across devices; **destructive risk** — deleting from iCloud deletes in Notability irreversibly (delete inside the app instead). **iCloud sync is unavailable within Notability Cloud** (the two are mutually exclusive).
- **Version History:** restore prior versions (restored as a separate note, doesn't overwrite). Retention by tier: **7-day (Starter/Classic), 30-day (Plus/Business), 90-day (Pro/Business Pro).** Caveats: renaming a note clears its iCloud version history; deleting removes version history.
- **Third-party auto-backup** (Dropbox/Drive/OneDrive/Box/WebDAV) — from Lite up (iOS only for purchase). Android currently lacks Auto-Backup (manual downloads only).

## Sharing, Export, Links & Publishing

- **Export formats:** PDF, Note (native), JPEG, PNG, NTB (Cloud format) — each with "More options."
- **Quick Share / Share** via Apple share sheet; export to connected cloud services; **Print** (⌘P).
- **Link sharing** (Notability Cloud): share a link with view/edit control; public-vs-restricted.
- **Publish to Gallery:** publish a note publicly with description + up to 5 tags (can't link-share and publish simultaneously); others download as `.note`. Unavailable in China/HK/Macau.

## Collaboration & Comments

- **Live Collaboration** (Notability Cloud; iOS, Mac, Web): real-time co-editing; invite by email or link; **unlimited collaborators**; **can-edit vs can-view** permissions; view-only users can request edit access and can select/copy; **presence indicator** shows active participant count/avatars in the toolbar.
- **Comments:** exist on iOS/Mac/Web but are **not yet on Android** ("native comments" listed as missing on Android). Historically Notability's collaboration/comments were considered weaker than competitors.
- **Shared Libraries:** for **Notability for Business** users.

## Presentation / Whiteboard / Multi-Window / Split View

- **Presentation Mode:** full-screen, no toolbars, via AirPlay or HDMI; Single Page View turns pages into slides; can show a private secondary note (Mirror → Left/Right) hidden from the audience.
- **Laser Pointer:** finger/Pencil, no permanent marks; **Tail / No-Tail** trail; adjustable size; 64-color palette (8 fast).
- **Multi-Note:** two notes side-by-side, horizontal or vertical; swipe-from-left **Note Switcher**; "Open on Right/Bottom," Switch Notes, Switch Orientation; drag content between them.
- **Multi-window:** Mac "Open in New Window" (⇧⌘N); Apple Multitasking / Split View on iPad; drag/copy content into other apps.
- **Focus Mode:** hide toolbars/panels; four-finger tap (iPad) or ⌘⇧F; Hand tool = fully clean view.
- **No infinite canvas / whiteboard** (a documented gap vs. GoodNotes).

## Stylus Gestures (Apple Pencil)

- **Palm rejection** built in (rest your hand while writing).
- **Double-tap** (Apple Pencil 2): switch to eraser / last tool / show color palette / show ink attributes / off (configured in iOS Settings).
- **Squeeze** (Apple Pencil Pro): switch to eraser (hold), last-tool (quick vs hold), show color palette, or an **Arc menu** (pen/pencil/highlighter/eraser/select/undo). Configured in iOS Settings.
- **Barrel roll** (Apple Pencil Pro): rotates Calligraphy Pen nib angle.
- **Hover** (iPad Pro + Apple Pencil Pro, iOS 18+): previews selection area.
- **Scribble** supported.
- **One-finger scroll while writing with Pencil**; can disconnect Pencil to write with finger/other stylus and auto-reconnect.
- **Wrist/palm protection:** palm rejection covers this; no separate "wrist guard" documented for Zoom View.

## Keyboard Shortcuts (hold ⌘ to see menu; keyboard required)

- **Tools:** ⌘1–⌘9 (toolbox order). **Colors:** ⌥⌘1–⌥⌘8 (⌥⌘9 prev, ⌥⌘0 next). **Sizes:** ⌃⌥1–⌃⌥3.
- **Text:** Bold ⌘B, Italic ⌘I, Underline ⌘U; Text box ⇧⌘T; Photo ⇧⌘I; Math ⇧⌘M.
- **Notes:** New ⌘N; New from template ⌥⌘N; New window ⇧⌘N; Duplicate ⌘D.
- **Nav:** Top ⌘↑, Bottom ⌘↓; next/prev page (⌘↓/⌘↑ iPad, ⌥↓/⌥↑ Mac); Forward view Space, Back ⇧Space; Return to Library ⌥⌘L.
- **Edit:** Undo ⌘Z; Redo ⌘⇧Z (Mac).
- **Search:** ⌘F, next ⌘G, prev ⌘⇧G. **Focus mode:** ⌘⇧F. **Night mode:** ⌘I. **Help:** ⌘/.
- **Audio:** Record ⌘R; FF/RW ⌃⇧→ / ⌃⇧← (iPad) or ⌘⇧→ / ⌘⇧← (Mac).
- **System:** Settings ⌘,; Print ⌘P; Share ⌥⌘E; Content Manager ⌥⌘P; Close window ⌘W; Show/hide Library ⌘L; Zoom ⌘+/⌘− (Mac), ⌃0 (iPad).

## Platforms & Feature Differences

- **iPad:** full feature set (Ruler, Zoom View, Multi-Note, all gestures).
- **iPhone:** most features; smaller UI; **no Ruler**.
- **Mac:** windows/multi-window, menu bar, trackpad/mouse drawing, drag-drop import; **no Ruler**; Smart Notes viewable but not during active recording. (Mac FAQ page was behind a login wall — details partly unverified.)
- **Apple Vision (visionOS 1.2+):** supported.
- **Web App:** browser note creation/editing, audio, checklists/bullets/numbered/indent/highlight, search (incl. PDFs), collaboration, Learn (Auto/Flashcards/Quiz + summaries), Chat, Live Transcripts, YouTube-to-note. Handwriting/pen tooling on web is limited/undocumented.
- **Android (native, Aug 2026):** stylus + **S Pen**; **72-language handwriting recognition**; Notability Cloud sync + offline; Learn/Chat/Live Transcript/Smart Notes; unified subscription across devices. **Missing at launch:** Convert-to-Math/LaTeX, handwriting-language customization, post-recording + live transcript parity edge cases, content-matching dark mode, native comments, Version History panel, Text-Only Mode, **Ruler and Tape**, Auto-Backup. "Stylus-specific behaviors still being refined." Notes look *mostly* (not identically) the same across platforms.
- **Windows:** listed as a platform on notability.com (likely via Web App) (unverified as native).

## Accessibility

- **Dynamic Type** support and **screen-reader (VoiceOver) icon labels** added in recent updates.
- **Text-to-Speech** reads selected text in a language-appropriate voice.
- Focus Mode reduces cognitive load / distraction. (Deeper a11y detail not documented.)

## Localization

- App localized in **English + 20 languages** (Danish, Dutch, French, German, Indonesian, Italian, Japanese, Korean, Malay, Norwegian Bokmål, Portuguese, Russian, Simplified Chinese, Spanish, Swedish, Thai, Traditional Chinese, Turkish, Ukrainian, Vietnamese).
- Handwriting recognition: 23 languages (iOS) / 72 (Android). Audio transcription: 100+ languages. Learn auto-detects language.

## Pricing & Plans & Free-Tier Limits

*(App Store standard prices; notability.com/pricing showed ~20% lower during a back-to-school sale.)*

- **Starter (Free):** 5 notes total, all editing tools & content, PDF/doc import, 20,000+ templates, Notability Cloud sync, audio recording, 7-day version history. **Editing cap:** a monthly allowance of edits (handwriting/erase/text/media count; audio + page/note management don't).
- **Lite** — ~$14.99/yr or $5.99/mo: unlimited notes, third-party backup, all tools/content/templates. *Purchasable only on iOS; usable on Web.*
- **Plus** (most popular) — ~$19.99/yr or $7.99/mo: adds AI summaries, up to 400 questions+flashcards/mo, audio recording + **post-recording transcription**, **handwriting & math conversion / handwriting search**, YouTube-to-note (≤100/mo, web), 30-day version history.
- **Pro** — ~$99.99/yr or $19.99/mo: adds **real-time Live Transcription (unlimited)**, **Smart Notes**, **Chat with Notes**, unlimited quizzes/flashcards, unlimited YouTube conversions, 90-day version history.
- **Classic (one-time, re-introduced July 13, 2026)** — ~$49.99: unlimited editing, third-party backup, iCloud syncing, handwriting recognition, math conversion, live collaboration, 7-day version history, 1-hour Audio Transcripts trial. Non-transferable. Pre-Nov-2021 buyers were grandfathered into Classic free.
- **Business** — $60/user/yr; **Business Pro** — $180/user/yr (adds unlimited real-time transcription, Chat, 90-day history, audit logs, Intune MAM); **Custom** contracts. **Notability for Organizations/Schools:** free full-featured for schools.
- Family Sharing supported for some purchases.

## Privacy & Security Claims

- **Locked Folders:** protect folders with **Face ID / Touch ID / device passcode**; change password under Account → Locked Folders. **Cannot** password-protect individual notes or the whole app; **Locked Folders unavailable in Notability Cloud.**
- **Encryption:** no explicit end-to-end or at-rest encryption claim is made in the Cloud FAQ (notable — treat as *not* E2EE unless proven).
- **Data location:** Notability Cloud is Ginger Labs' own infra; unavailable in China/HK/Macau.
- **App Store privacy labels:** *Data used to track you* — Identifiers. *Linked to you* — email (advertising/marketing), crash data. *Not linked* — device ID (analytics/marketing), product-interaction/usage, diagnostics. Privacy policy at notability.com/privacy. Practices "not verified by Apple."

## Known User Complaints / Weaknesses (cited)

- **The 2021 subscription backlash:** switching from an $8.99 one-time purchase to subscription on Nov 1, 2021 triggered mass 1-star reviews and claims it violated App Store rules (changing already-paid features to subscription). Ginger Labs U-turned within ~2 days, granting **lifetime access to pre-Nov-2021 buyers** (9to5Mac, MacRumors, Forbes). Lingering trust damage; in 2026 they re-added a one-time "Classic."
- **Organization limits:** only **6-level folder nesting** (vs GoodNotes unlimited); **no tags**; **one template per note** (changing paper changes every page).
- **No infinite canvas / whiteboard**; no per-page templates; weaker "elements/collection" reuse than GoodNotes.
- **Handwriting search/OCR paywalled** — free tier can't search handwriting, which reviewers call crippling.
- **Handwriting recognition accuracy** "not as precise" as some competitors (reviews).
- **Sync issues:** slow Notability Cloud/iCloud catch-up, occasional blurry pages, notes "spinning"/inaccessible requiring restart, slow loads on low-storage devices (Capterra).
- **Collaboration historically weak** (TechRadar's headline: "collaboration skills are weak"); comments still absent on Android; real-time collab is new and Cloud-dependent.
- **Destructive iCloud deletion** (deleting from iCloud is irreversible).
- **Hyperlinks within notes** historically limited (reviews).
- **Android parity gaps** (Math/LaTeX, Ruler, Tape, comments, version-history panel, auto-backup, content-matching dark mode).
- **Pricing perceived "pricey"**; Pro at ~$99.99/yr is steep; several core features (transcription, handwriting search) require paid tiers.
- **Smart Notes / transcripts can't be exported** and Smart Notes don't sync across devices.

---

## What Sane Notes must match (table stakes)

- **Low-latency, pressure- & tilt-sensitive ink** with multiple pen types (pen, pencil/shading, calligraphy), highlighter (with snap-to-text), and precise **partial + whole-stroke erasers**; **ink-to-shape** (draw-and-hold) with fill/stroke styling; **ruler** with angle snapping.
- **Lasso/select** that can move/scale/rotate/recolor ink and **convert handwriting → text and → math (LaTeX)**.
- **PDF import + annotation** with margins, **PDF outlines/TOC navigation**, and faithful PDF export; import of PPT/images/native format from Files + Dropbox/Drive/OneDrive/Box/WebDAV.
- **Audio recording synced to ink/text** (tap-to-jump) — Notability's signature; plus **transcription** (post-hoc + live) in many languages.
- **Handwriting search / OCR** across notes and PDFs (and don't hide basic search behind a paywall the way reviewers resent).
- **Cross-platform cloud sync** (iOS/Mac/Android/Web) with **offline editing**, **version history**, and third-party backup.
- **Templates/paper** (rule/grid/dot/blank, sizes, spacing), **custom templates**, and a large template/planner gallery.
- **Text tools:** rich text, lists, checkboxes, code blocks, markdown shortcuts.
- **Presentation mode + laser pointer**, **multi-note/split view**, **multi-window**, **Focus Mode**.
- **Full stylus gesture support** (double-tap, squeeze, hover, barrel roll, Scribble) + rock-solid **palm rejection**.
- **Comprehensive keyboard shortcuts**; **accessibility** (Dynamic Type, VoiceOver labels, TTS); broad **localization**.
- **AI study layer:** summaries, quizzes, flashcards, chat-with-notes, action items — increasingly expected.
- A **transparent pricing story** with a usable free tier and, ideally, a **one-time purchase option** (Notability learned this the hard way).

## What Sane Notes could beat them on

- **Real per-page templates & mixed paper within one notebook** (Notability forces one template per note).
- **Unlimited (or deeper) folder nesting + a real tagging system** and saved smart searches — Notability caps nesting at 6 and has no tags.
- **Infinite canvas / whiteboard mode** — Notability has none.
- **Handwriting search in the free tier** (or far cheaper) — turn their most-resented paywall into your differentiator.
- **Best-in-class handwriting recognition accuracy** and the **72-language breadth on every platform** (Notability's iOS OCR is only 23 languages vs Android's 72 — normalize this everywhere).
- **True end-to-end / at-rest encryption + per-note and app-level locking** (Notability only locks folders, has no stated E2EE, and folder locks don't work in the cloud). A credible privacy posture is a wedge.
- **Exportable AI outputs and cross-device Smart Notes** (theirs can't be exported / don't sync).
- **First-class comments + robust real-time collaboration on all platforms including Android** (Notability's collab is new, Cloud-gated, and comment-less on Android) — plus presence, threaded comments, and offline-merge.
- **Reliable, fast sync with conflict-free merge and non-destructive deletes** (directly counter their sync-speed and iCloud-deletion complaints).
- **In-note hyperlinks, backlinks, and bidirectional note linking** (PKM-style) — a gap in Notability.
- **A generous, honest free tier + optional one-time license** to win the users still burned by the 2021 subscription pivot.
- **Native, fully-at-parity apps on Android/Windows from day one**, avoiding the "iOS-first, everyone-else-later" feature debt Notability carries.

---

## Sources

- https://support.gingerlabs.com/hc/en-us/articles/4867633230234-Getting-Started-with-Notability
- https://support.gingerlabs.com/hc/en-us (support home / navigation)
- https://apps.apple.com/us/app/notability-smarter-ai-notes/id360593530 (App Store listing)
- https://support.gingerlabs.com/hc/en-us/sections/360000127572-Writing-and-Sketching
- https://support.gingerlabs.com/hc/en-us/sections/200852768-Taking-Notes
- https://support.gingerlabs.com/hc/en-us/articles/206060617-Recording-and-Playing-Audio
- https://support.gingerlabs.com/hc/en-us/articles/8073483239834-Notability-Learn
- https://support.gingerlabs.com/hc/en-us/articles/5363620836634-Pencil
- https://support.gingerlabs.com/hc/en-us/articles/11113646664218-Calligraphy-Pen
- https://support.gingerlabs.com/hc/en-us/articles/4968218861978-Highlighter
- https://support.gingerlabs.com/hc/en-us/articles/360029432891-Eraser
- https://support.gingerlabs.com/hc/en-us/articles/226905028-Creating-and-Styling-Perfect-Shapes
- https://support.gingerlabs.com/hc/en-us/articles/4546486303514-Ruler
- https://support.gingerlabs.com/hc/en-us/articles/360018646412-Select-Tool
- https://support.gingerlabs.com/hc/en-us/articles/206059387-Text-and-Text-Boxes
- https://support.gingerlabs.com/hc/en-us/articles/360003878731-Handwriting-and-Math-Conversion
- https://support.gingerlabs.com/hc/en-us/articles/218333197-Writing-with-Apple-Pencil
- https://support.gingerlabs.com/hc/en-us/articles/7316896037786-Squeeze-Gestures-with-Apple-Pencil-Pro
- https://support.gingerlabs.com/hc/en-us/articles/205270648-Add-and-Edit-Media
- https://support.gingerlabs.com/hc/en-us/articles/206061357-Importing-Files
- https://support.gingerlabs.com/hc/en-us/articles/10544263339290-PDF-Outlines
- https://support.gingerlabs.com/hc/en-us/articles/227864627-Custom-Templates-and-Note-Background
- https://support.gingerlabs.com/hc/en-us/articles/9595133824410-Smart-Notes-Pro
- https://support.gingerlabs.com/hc/en-us/articles/9588037788826-Live-Transcripts-Pro
- https://support.gingerlabs.com/hc/en-us/articles/6059035461146-Audio-Transcripts
- https://support.gingerlabs.com/hc/en-us/articles/206061487-Syncing-Notes-across-Devices-with-iCloud
- https://support.gingerlabs.com/hc/en-us/sections/9624383599514-Notability-Cloud
- https://support.gingerlabs.com/hc/en-us/articles/9598417028378-Notability-Cloud-FAQ
- https://support.gingerlabs.com/hc/en-us/articles/10463526132122-Live-Collaboration
- https://support.gingerlabs.com/hc/en-us/articles/205228298-Exporting-and-Sharing-Notes
- https://support.gingerlabs.com/hc/en-us/articles/4409501940122-Notability-Subscription-FAQ
- https://support.gingerlabs.com/hc/en-us/articles/9265503216794-Getting-Started-with-the-Notability-Web-App
- https://support.gingerlabs.com/hc/en-us/sections/11084006676762-Notability-for-Android
- https://support.gingerlabs.com/hc/en-us/articles/11084032368538-Notability-for-Android-FAQ
- https://support.gingerlabs.com/hc/en-us/articles/11084175635354-Getting-Started-with-Notability-on-Android
- https://support.gingerlabs.com/hc/en-us/articles/4912437077914-Search-your-Notes
- https://support.gingerlabs.com/hc/en-us/articles/11012024558106-Focus-Mode
- https://support.gingerlabs.com/hc/en-us/articles/11098423135130-Note-Covers
- https://support.gingerlabs.com/hc/en-us/articles/360003857512-Multi-Note-and-Note-Switcher
- https://support.gingerlabs.com/hc/en-us/articles/11089433943962-Code-Blocks
- https://support.gingerlabs.com/hc/en-us/articles/360021489291-Keyboard-shortcuts
- https://support.gingerlabs.com/hc/en-us/articles/11128218737690-Flashcards-Import
- https://support.gingerlabs.com/hc/en-us/articles/5871329959066-Laser-Pointer
- https://support.gingerlabs.com/hc/en-us/articles/5554940885402-Tape
- https://support.gingerlabs.com/hc/en-us/articles/206058497-Zoom-View
- https://support.gingerlabs.com/hc/en-us/articles/4409773826586-Notability-Gallery-Overview
- https://support.gingerlabs.com/hc/en-us/articles/360018837092-Note-Security-Locked-Folders (via search)
- https://support.gingerlabs.com/hc/en-us/articles/5543562363162-iCloud-Version-History (via search)
- https://notability.com/
- https://notability.com/pricing
- https://en.wikipedia.org/wiki/Notability_(application)
- https://paperlike.com/blogs/paperlikers-insights/app-review-goodnotes-vs-notability
- https://www.capterra.com/p/229356/Notability/reviews/
- https://www.techradar.com/pro/software-services/notability-review (paywalled; via search snippet)
- https://9to5mac.com/2021/11/03/notability-subscription-broke-app-store-rules/ (via search)
- https://www.macrumors.com/2021/11/03/notability-changes-subscription-strategy-outcry/ (via search)
- https://www.forbes.com/sites/barrycollins/2021/11/03/notability-backs-down-after-subscription-plan-backlash/ (via search)
- https://kurtis-redux.medium.com/notability-brings-back-a-one-time-purchase-after-four-years-of-subscriptions-3639bf6e53a7 (via search)
- https://play.google.com/store/apps/details?id=com.gingerlabs.notability (Play Store listing, via search)
