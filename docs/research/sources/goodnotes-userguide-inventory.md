# Goodnotes User Guide — Exhaustive Feature Inventory

Source scope: official Goodnotes User Guide covering Goodnotes 7.1.10+ on Apple platforms (iPadOS, iOS, macOS) and Goodnotes 316803.0l+ on Android, Windows, and Web. Includes a legacy GoodNotes 5 (v1.96) guide appended at the end of the source. Unless stated, "Apple only" markers are quoted directly from the guide. This inventory is a competitor reference for the "Sane Notes" pen-first note-taking app.

Terminology note: screenshots in the guide are from iPadOS; navigation paths are stated to be the same/similar across platforms except where explicitly flagged.

---

## Organization & library

### Library View
- First screen on launch; home to your own documents and those shared with you. Empty initially.
- Tabs (accessed via Sidebar icon, top-left): **Documents** (main management + Search), **Favorites** (bookmarked folders/documents/pages), **Shared** (documents shared by/with you), **Marketplace** (templates, covers, stickers, planners).
- **Filter menu (Apple only)** below tab header — shows only a chosen item type.
- Top-right: **In-app Notification (Apple only)** (study-set review reminders, comment notifications) and **Goodnotes menu** (subscription + settings).
- **Views and Sorting menu**: Select Items (multi-select for bulk export/move/delete; on Android/Windows/Web the Select icon is top-right; on macOS you Cmd-click multiple items instead); **Grid** view (large thumbnails) / **List** view (List View is Apple only); sort by **Date created (Apple only)**, **Last Modified** ("Date" on non-Apple), **Name**, **Type** — tap an attribute to toggle asc/desc.
- **Cloud Status menu (Apple only)** — shows Cloud Sync status.

### Folders & documents
- Computer-like hierarchy. **Folders** = virtual bookshelves; **documents** = notebooks you create or files you import. Unlimited folders and sub-folders.
- Colored folders and sub-folders with custom icons (Customize Color / Set Icon — folders only, Apple).
- **+New…** creates: Notebook, Text Document, Whiteboard, Import, Quick Record (Apple only), QuickNote, Scan Documents (Apple only), Study Set (Apple only), Image, Take Photo, Folder.
- Open a library item: Apple = single tap/click; **Android/Windows/Web = double-tap**.
- Item menu (via down-arrow next to title): Rename; Customize Color / Set Icon (folders, Apple); Duplicate (documents); Move (moving a document onto another document **merges** them); Export; Share Link to Collaborate / Share…; Add Lock (documents, Apple); Move to Trash.
- Bulk actions on multiple items: Export (Apple only), Duplicate, Move, Trash.

### Favorites / bookmarks
- Star a library item (turns red) → appears in Favorites tab. Star again to unfavorite.
- Page-level bookmarks: "Add to Favorites" (Apple) / "Bookmark Page" (Android/Windows/Web). Find via Sidebar page filter > Bookmarks Only (Apple) or the dedicated **Bookmarks tab (Android/Windows/Web only)**.

### Document tabs
- **Document Tab Bar** at top of Document View shows all open documents (by default), like browser tabs. Switch, close, rearrange (long-press until it widens, then drag). Tabs can be disabled in settings.
- Close Document icon next to the title; "Close Other Tabs" keeps only current.

### Page management (within a document)
- **Sidebar** sections vary by document type: Pages/Boards, Outline, Bookmarks (Android/Windows/Web only), Audio.
- Per-page menu: Add Page Before/After, Copy, Duplicate, Rotate (clockwise), Move to… (another location / new or existing document), Add Page to Outline / Manage Outline, Export, Open in New Window (Apple only), Clear Page, Move to Trash.
- Current-page More menu: Add to Favorites/Bookmark; Copy Page; **Duplicate Page (Android/Windows/Web only)**; Rotate Page; Change Template; Go to Page; **Delete Specific Items** (choose which item types to delete — added Jun 2 2026); Clear Page; Move Page to Trash.
- Bulk page actions: Copy, Rotate, Export, Mark as Seen (Apple only), Convert to Whiteboard (Apple only), Move to Trash.
- Move constraints: content moves only within the same document type; a Study Set or Text Document can move only to a folder; notebooks/Whiteboards can also append whole documents, and pages/boards move within their own type.
- **Add page**: pull up on last page (vertical scrolling) or right-to-left (horizontal); or Add Page menu → position (Before/After/Last Page) → Current Template / recent template / More from Templates / Paste Page(s) / Import.

### Outlines
- See "PDF & documents" and "Sync" sections; full detail under Document outlines below.

### Quick notes
- **QuickNote**: temporary one-page, coverless notebook in the last-used paper template. Create via New… > QuickNote or **double-tap/double-click the +New… button**. Afterward: save, move to folder, merge with an existing notebook, or discard.
- **QuickNote widget (Apple only)**: one-tap QuickNote from Home Screen / Mac desktop.

### Trash Bin
- Stores deleted documents, folders, pages until manually purged. Apple: via Trash. Android/Windows/Web: Trash tab in left sidebar.
- Actions: Delete Permanently (cannot be undone), Recover (returns item to original location), Move (Apple only), Empty (top-right, cannot be undone). Filter + sort supported. Guide recommends emptying regularly for performance.

---

## Handwriting & ink tools

### Toolbar structure
- Four parts: **Lasso Selection**, **Tools** (writing/drawing/inserting), **Accessories Menu** (Ruler, Time Keeper, Zoom Window, etc.), **Active Tool Menu** (secondary options; right side = contextual section with color/thickness slots).
- Active Tool Menu is draggable to any of the four screen sides.
- **Sticky tools** (stay active after use): Lasso, Pen, Eraser, Pencil, Highlighter, Tape, Laser Pointer.
- **Non-sticky tools** (revert to Lasso after one use): Images, Elements, Shapes, Sticky Notes, Text (Text enters Typing state after insertion).
- Customize tool visibility/order via Accessories menu > Toolbar Customization.

### Pen Tool
- Handwrite with finger or stylus. Pressure-sensitive AI features.
- **Pen styles**: **Fountain Pen** (everyday, pressure sensitive), **Ball Pen** (everyday, NOT pressure sensitive), **Brush Pen** (artistic, highly pressure sensitive).
- Appearance sliders: **Tip Sharpness** (sharpness of stroke end); **Pressure Sensitivity** (line width vs. Apple Pencil pressure — Min value does NOT remove sensitivity); **Tip Flatness (Apple only)** (blunt tip / dynamic inking for Fountain Pen); **Stroke Stabilization** (smooths strokes, reduces jitter/shakes).
- GN5 documented defaults: 50% Tip Sharpness (Fountain + Brush), 50% Pressure Sensitivity (Fountain only).
- **Stroke style**: Solid, Dashed, or Dotted; thickness slider; Restore Stroke.
- **Color slots**: reorder (hold + drag); tap again to customize (Presets/History/Custom on Apple; palette/color-wheel on non-Apple); HEX field; Eyedropper/Color Picker (screen-pixel pick); Add Color Slot; delete custom slot; "Restore color sets to original" (Apple only, irreversible).
- **Spellcheck (Apple only)**: Recognition Language + "Check Handwriting Spelling" toggle here.
- **Math Assist (Apple only)** settings here.

### Pencil Tool
- Simulates a real pencil; pressure varies line weight. Use cases: writing, underlining, decorating, shading, drawing. Same color/width slot model as Pen.

### Highlighter Tool
- Highlight/emphasize; typical use = annotate imported PDF.
- **Draw in Straight Line** toggle — auto-straightens all drawn lines. Can draw shapes.
- Apple: long-press PDF text → Highlight (created highlight is yellow but can be moved/erased/colored).

### Eraser Tool
- Erases handwriting, highlighting, shapes (created by Pen/Pencil/Highlighter/Shape). **Cannot erase images/other objects.**
- **Styles**: **Precision Eraser (Apple only)** (erases only content strictly within the erasing circle); **Standard Eraser** (erases a small segment of a continuous stroke); **Stroke Eraser** (erases an entire continuous stroke).
- Settings: **Erase Highlighter Only**; **Erase Tape Only (Apple only)**; **Clear Page**; **Auto-Deselect** (switch back to last-used tool when stylus lifts). Size adjustable via Active Tool Menu.
- **Choose content type to erase** (added Aug 3 2026).

### Tape Tool
- Hide/reveal text for active recall. Run stylus over content to cover; finger-tap tape (with Eraser or Tape selected) to uncover.
- Tape slots/styles; History tab (Apple only); Add Slot; delete custom slot (unavailable if only 3 slots). "Straight tape" toggle; "Remove all tape" (Apple) / "Remove all from page" (non-Apple).
- Custom tape: solid color (palette/wheel/HEX/eyedropper) or **Upload from Files** (optimal 100×100px image → repeating pattern). Marketplace patterns available.

### Shapes Tool
- Shape library for diagrams/flowcharts; connectors that link shapes; text inside shapes.
- Shape types: **Elbow Connectors** (90° turns), **Curved Connectors** (smooth path), Ovals/Circles, Rectangles/Squares/Diamonds, Triangles/Polygons.
- All pre-defined shapes drawn with a subtle **corner radius by default** (added May 25 2026); Rounded toggle applies to new shapes only; new **Rounded Rectangle** for button-style labels/cards.
- Fill Color (fills new closed shape) + Opacity slider. Arrow-head styles (elbow/curve connectors only).
- **Connectors** attach to a shape's edge and stay attached when shapes move/resize; sliding along the edge; editable paths via control points/waypoints (add/move/remove).
- **AutoShape** icon: draw freehand, auto-corrected/smoothed.
- **Draw shape with Pen/Pencil/Highlighter**: draw in one stroke, hold at end, adjust scale/angle while holding, release. (GN5: "Draw and Hold", "Snap to Other Shapes", "Require Hold to Snap" for line snapping.)
- Attach other objects (lasso selection/image/element) to a shape → they move together. Edit Text / Edit Shape (vertices).

### Lasso Tool
- Select and manipulate content. Draw a loop/frame; loop should touch only the target to avoid grabbing neighbors.
- **Lasso Type**: Rectangular (diagonal drag frame — good for organized notes) or Freehand (default; curved/irregular). 
- **Included in Selection**: enable/disable content types — Handwriting, Images, Text Boxes, Comments; **Equations (Apple only)**.
- Object Menu actions after selection:
  - Transform: Move (drag; **Apple only can move across page boundaries in vertical scrolling**); Resize mode (corner handles scale, Rotate icon).
  - **Goodnotes AI** (ask about the selection).
  - Color (if selection has color property).
  - Take Screenshot (rectangular screenshot of selection).
  - Create Element.
  - Cut / Copy / Duplicate / Delete.
  - Bring to Front / Send to Back (layering).
  - Handwriting-specific: **Edit Handwriting** ("Notes Reorganization" — adjust handwriting as if typed text); **Convert** to typed text or (Apple only) math equation.
  - Text/Shape-specific: Edit Text.
- Tap a single object (image/text box/sticky/shape) with Lasso to act on it directly.
- Drag selected handwriting to an external app → auto-converts to typed text if receiving app supports it (Apple only).

### Elements Tool
- Personal reusable library. An element = any Goodnotes content (handwriting, highlighting, shapes, images, text boxes, or combinations). Organized into **collections** (like folders).
- Create element from selection (Create Element → pick/create collection). Create new collection (Apple only via + at end of collection list); add via Add Photos or Import from…
- Insert: choose **Stickers** (static/your own) or **GIFs** (animated, from **GIPHY**). Choose collection → tap or drag element onto page.
- **GIPHY**: available on ALL plans incl. Free; works in Notebooks and Whiteboards; needs internet to search/insert new (placed GIFs remain visible offline); GIFs animate on the page; can save GIPHY GIF to a collection.
- Open Elements popover in a new window (Split View) for drag-drop (Apple); Slide Over mode.
- Inserted element stays selected as a whole for easy editing (e.g., "Sign here" sticker = image + text you can edit separately).
- Edit/Share a Stickers collection: Rename, Delete Collection, **Share** (recipient imports the `.collection` file), delete/reorder elements, add more. Android/Windows/Web can edit **custom collections only**.
- Marketplace offers ready-to-use collections.

### Pen Gestures (scribble-to-erase & circle-to-lasso)
- **Scribble to Erase**: with Pen Tool, draw a tight zigzag (or horizontal back-and-forth) over strokes to erase them. Strokes outside the initial stroke (e.g., the dot on "i") may not be erased.
- **Circle to Lasso**: with Pen Tool, draw a loop, lift, then long-press with pen on the circle → it becomes a dotted lasso selection; drag to move or release for options.

### Ruler Tool
- Appears on current page (scaled to zoom level). Draw along its edge with Pen or Highlighter → stroke snaps to ruler.
- Two-finger rotate; **Set Angle** (exact numeric); **Set Position**; Hide; Options → Show/Hide Digits, Change to Inches/Centimeters. Finger-drag along body to access invisible part of scale.

---

## Text & typing

### Text Tool — movable text boxes
- Tap page → type. Format via Object Menu (Format / Align and Spacing / Textbox Style).
- Large pasted text won't cross page boundaries (hidden until moved/resized). Recommendation: paste smaller chunks or resize box.
- **Pin Text Tool (Apple only)**: keeps Text tool active for continuous box creation; auto-off when switching tools.
- Move (drag), Resize (side handles), Edit (tap again).
- **Writing Tools (Apple only)** on a text box: use Apple Intelligence to edit/create writing.
- **Save as Default** style for new text boxes (Apple).
- GN5 text-box style detail: Fonts list, Size (± / slider), Text Color; Paragraph (alignment L/C/R, Line Spacing ± / Automatic); Text Box Style presets or Advanced (Background Color, Border Color, Rounded Corner, Shadow, Border width, Padding — all via hex or ± controls).

### Full-page text (Apple only)
- Type directly on the page without individual boxes. Long-press with Text tool → Start Typing; tap text to edit.
- **Limitations**: line spacing on custom PDF templates defaults to standard (use built-in ruled templates for proper spacing — "typing-optimized templates" marked with a green keyboard icon); **only Helvetica font supported** (cross-platform compatibility); export only as PDF/Goodnotes/JPG (**not Word or TXT**); must manually add a page when full; **text does not reflow between pages**; nested lists not supported (GN5).

### Lists & formatting
- Numbered: "1. " ; Bulleted: "- " or "* ". Continue on new lines.
- Indent/outdent: buttons; Android/Windows/Web via More > Indentation; hardware keyboard Tab / Shift+Tab. Lists also work in shapes and Text Documents.
- Format: select text (or format applies to next typed text). Triple-tap selects a paragraph/block. Bold/Italic/Underline/Strikethrough/Color.

### Hyperlinks
- **Internal links** (jump between pages) and **external links** (websites).
- Create in Notebook/Whiteboard: select text → Cmd/Ctrl+K or Link icon → (Apple: Link Settings) → Link To: **Website** (URL) or **Document** ("This document" → notebook/Whiteboard → "This page"). Linked text is underlined.
- Manage: Open Link/Go to Page, Copy Link, Link Settings (edit/remove), Edit Link Content.
- **Constraints (Q&A)**: can link to a specific page but **NOT a specific section/location on a page/board**; links only on **typed text** (convert handwriting first); **NO links on images or elements**; **NO links to local computer files**; phone numbers/emails **NOT auto-linked**.
- In a Text Document: only external links; add via select text → Link → URL; double-tap linked text to edit/follow/remove.
- GN5 tip: typed text resembling a URL auto-becomes a tappable link; can hide a link colored like page background.

### Text Document (typing-focused format)
- Pageless (no page breaks); richer formatting incl. **tables** and **media**; real-time collaboration + comments; **AI co-editing**.
- Create: New… > Text Doc. Blocks via typing "/" → choose block type.
- Block styling: Turn into (block type), Link (external), Format (Paragraph, Headings, Code, Quote), text format (Bold/Italic/Underline/Strikethrough/Color), list type (Bulleted/Numbered/Toggle/To-do).
- **Tables**: add via Table icon or "/Table"; select row/column/whole table (hover handle on Mac; tap handle on iPad); floating menu (add/delete/merge/split, background color, borders); resize columns (rows are NOT resizable — grow with content); reorder rows/columns by dragging handle; move table via block handle; "/" inside a cell for table-focused insert menu.
- **Media**: insert image ("/image") in its own block; embed video ("/video").
- Audio recording supported (Mic icon; background recording with flashing orange status icon on Apple; playback with 1x speed, ±10s, seek).
- Goodnotes AI: document-wide help (AI icon) and block-level help (select block → Goodnotes AI). Availability — Create mode: Essential, Pro, AI Pass, CN-Special Edition; Image generation: Pro, AI Pass, CN-Special Edition.
- Outline via heading tags (H1/H2/H3).
- Q&A: can't fully convert a freeform notebook (copy/paste text; drawings/annotations transfer as images); no drawing tools; basic editing works offline (AI + real-time collab need internet); can print/export as PDF.

---

## Audio

### Recording
- Start: Overflow menu > Record & Summarize (or, for a Quick Record/Text Doc, tap the Mic icon). Notes taken during recording are captured with the audio. Recording status indicator on all platforms.
- Background behavior: **Apple** — continues in background (flashing orange Mic in status bar; tap to return); **Windows/Web** — continues in background; **Android — recording STOPS when you switch apps** (no background recording).
- Stop via Stop Recording icon → creates a new audio clip.

### Playback
- Overflow menu > Show Recordings (Text Doc/Quick Record: Sidebar > Audio tab). Controls: playback **speed (1.0x)**, **Rewind 10s**, Play/Pause (replays notes as written), Seek Bar, **Fast-forward 10s**, More (…).
- **Noise Reduction** — reduces background noise; only on **A16 / M1 chip or later**.
- **Notes Playback modes (Apple only; added May 8 2026)**: **Spotlight (default)** (notes ahead faded, played notes fully visible), **Real-time reveal** (handwriting revealed progressively), **Static** (all visible, no animation). Do NOT sync across platforms; notebook documents only (not Whiteboards/Text Docs).
- Play notes linked to a recording: select/long-press notes → Play Recording (jumps to that clip). Notes are only captured on the recording's **starting page**.

### Managing clips
- Rename/Delete (Apple: swipe across clip; non-Apple: selection mode). **Export is Apple only.** Select Audios / Select All → Export (Apple) or Delete/Trash.
- Config (Apple only, More …): Recording Settings, AI Credits (remaining for Audio Summary), Privacy Settings, User Guide.

### Transcription
- **On-device Transcription**: audio stays on device; higher battery; needs newer device + downloaded language packs; languages: English, German, Spanish, French, Italian, Dutch, Portuguese, Japanese, Korean, Thai. Internet only for initial model download.
- **Cloud Transcription**: audio to secure cloud; lower battery; requires internet; **99+ languages**; no download; uses AI credits continuously; works on all compatible devices. Device reqs for on-device: iPad/iPhone A15 or M1+, iOS/iPadOS 17+; Mac Apple Silicon M1+, macOS 14 (Sonoma)+.
- Cloud auto-activates online; on-device takes over offline.
- Subscription: Cloud Transcription = Pro, AI Pass, CN-Essential, CN-Special Edition. Free: **20-min recording cap, 3-document cap**; Essential: no caps (Essential in China treated as Pro).

### Summary
- **Basic Summarization**: after recording; entire recording at once; one-time credit use; all devices; Free/Essential/Special Edition.
- **Live Summarization**: real-time during recording; updates as meeting progresses; continuous credit use; all devices; Pro/AI Pass/CN-Essential/CN-Special Edition.
- Live transcript with timestamped entries in Transcript tab; Get Basic Summary button appears only after recording stops. Drag a line from Summary/Transcript onto the page to add to notes.

---

## PDF & documents (import / annotation / outlines / hyperlinks / export)

### Import — supported formats
- PDF; Image (.jpg, .png); Goodnotes document (.goodnotes); **Goodnotes backup (.goodnotes.zip) — Apple only**; **CSV/TSV — Apple only** (creates a study set); **Word (.doc/.docx) and PowerPoint (.ppt/.pptx) — iOS/iPadOS only** (internally converted to PDF; guide recommends importing PDF versions for better fidelity).

### Import methods
- Within app: New > Import. **Pro users**: Import from Cloud Storage (connect Google Drive/Dropbox/OneDrive/Box; manage via Goodnotes menu > Integrations > Cloud Storage). Non-Apple: +New → pick cloud storage.
- From an external app (Apple): Share/Open In… → Goodnotes → rename + choose Location → Import as New Document.
- Windows: import from File Explorer via Share → Goodnotes (lands in main library, not a specific folder).
- Drag & Drop via Split View / Snap (Apple/Windows/Android instructions given).
- Into an existing document: Add Page menu → position (Before/After/Last Page) → Import (Import to Current Document).
- **Import a folder (Apple only)**: zip it, import the .zip.
- From a computer: iTunes File Sharing; Finder (USB); AirDrop.
- Migrate from other note apps: export as PDF and import (PDFs not editable like native; recreate folder structure manually).

### PDF annotation
- Highlight/Strikeout PDF text (Apple): long-press word → adjust blue handles → Highlight or Strikeout.
- Full annotation with all writing/drawing/text tools.

### Outlines (table of contents)
- View: Sidebar > Outline tab (notebooks and Text Documents).
- Create manually (notebook): "Add Page to Outline" → title. Same page can be added to multiple outline items (organize by different criteria). Text Document outline = heading tags (H1/H2/H3).
- **Generate outline automatically (Apple only)**: Sidebar > Outlines > Generate Outline → adjust page range → review/expand/collapse → Insert in Sidebar. **Uses AI credits.** Not for Text Documents.
- Work with: jump to page (tap title), Rename/Delete (long-press — deleting removes only the nav link, not content), reorder (drag), nest (drag onto another; **up to 3 levels — Apple only**), unnest, expand/collapse, **Sort by Page Number (Apple only)** (restores page order, removes custom ordering).
- Imported PDF outlines shown; GN5 could not delete/edit PDF-sourced outlines (could filter them out).

### Export — supported formats
- PDF (all platforms); **Goodnotes (.goodnotes) — Apple only**; **Image — Apple only**.
- **Android/Windows/Web currently support only PDF and Link export** with simpler options; export is Flattened PDF only.

### Export options / editable vs flattened PDF (Apple)
- Export This Page / Export All; **Save changes to <cloud storage> PDF** (Pro — overwrites the imported PDF in its cloud folder); Print (AirPrint).
- **Editable PDF**: handwriting NOT searchable; objects selectable/movable/resizable in other viewers; **document outlines preserved**; **original PDF hyperlinks preserved**.
- **Flattened PDF** (only format non-Apple supports): handwriting searchable/selectable/copyable if "Enable Handwriting Recognition" is on (copies recognized characters); outlines NOT preserved; original hyperlinks NOT preserved; recommended for viewing.
- GN5 export options: Include Page Background, Include Annotation; Image → Export as Zip; Goodnotes → Include Comments; Link → Share Link to Collaborate / Open Document on Web. Folder export → single .zip preserving folder structure; re-importable.

---

## Images & stickers

### Image Tool
- Insert from: Recently Saved Images (Apple), Camera, Files/Photos. Non-Apple: "Insert an image." Animated GIFs insertable.
- Work with image: Move; **Object Alignment** (guide lines — dashed = centering, solid = edge alignment; toggle via More > Align Objects; added Aug 3 2026); Resize (side handles), Scale (corner handles; Shift = keep aspect ratio; Option/Alt = scale to center), Rotate.
- Manage: **Lock/Unlock** (prevent accidental moves; added Jan 26 2026), Create Element, Add Comment, **Crop Image** (rectangular via handles or Freehand closed area — GN5), **Add to Image Playground (Apple only)** (generate a new image).

### Stickers & Elements
- Stickers via Elements Tool (see Handwriting & ink > Elements). Marketplace stickers/collections.

### Scanning (Apple only)
- Scan Documents (from +New… or Add Page). Scanned pages' text is searchable (Apple only).
- Take Photo (camera) as a new document/page.

---

## Templates, paper & covers

### Built-in
- Covers and papers (collectively "templates"). Notebook creation sets: Name, Language (handwriting recognition), Cover (enable + choose), Size + orientation, Color, and a paper template.
- **Dynamic Templates**: customize built-in templates' **size** and **color** (Apple: "Custom" size, "Customize Colors" paper color).
- Whiteboard creation: Name, Language, Pattern, Color, optional built-in template.

### Custom templates
- Manage Notebook Templates → choose Cover or Paper → filter by Size, Color (paper only), Orientation → Import from Photos/Files (PDF recommended over image; A3 PDF beats an A3-pixel image; multi-page PDF → only first page used as template).
- Custom groups: create/rename/reorder (reorder Apple only; rename custom groups only on non-Apple); delete templates (custom can't be restored; **built-in can be restored from Settings**).
- Create a template from a page: export page as Flattened PDF → add to Notebook Templates.
- External template sites listed (printablepaper.net, gridzzly.com, incompetech, paperkit, intmath).
- GN5 extra free-template folder: grid/dot-grid, dark paper, Cornell, music, chemistry, isometric, planners, GoodNotes 4 templates.
- Change template of a page: Change Template → Paper → select → Apply. Change cover: go to first page → Change Template → Cover → Apply.
- **Typing-optimized templates** (green keyboard icon) ensure proper line spacing for full-page typing.

---

## Search, OCR & handwriting recognition

### What's searchable
- Handwriting (Pen Tool); typed text (Text Tool); text in imported PDFs (**only if the PDF already has an OCR layer — Goodnotes does NOT perform OCR on imports**); scanned-page text (Apple only); document outlines (Apple only); folder/document titles.

### Handwriting recognition languages
- Chinese China/Taiwan/Hong Kong (Apple only), Dutch, English (US/UK), French, German, Italian, **Japanese (Apple only)**, **Korean (Apple only)**, Portuguese (PT/BR), **Russian (Apple only)**, Spanish, **Thai (Apple only)**, Turkish.

### How search works
- **Library search**: Apple can search titles + content (Titles, Written Notes, PDFs, Document Outlines, Typed Notes subsections). **Android/Windows/Web: only library-item titles searchable from Library View**; content search only works inside an open document.
- Multiple space-separated keywords match ANY keyword. Recently Searched Keywords / Recently Opened Documents (Apple). Results row = document thumbnail + matching page thumbnails; "Show All <type>".
- **Document search**: magnifying glass → keywords; results by page (multiple matches on a page = one result); matches highlighted; Notes/Outlines tabs (Apple); change handwriting language at bottom.

### Handwriting → typed text
- Lasso handwriting → More menu → Convert > Text (Apple) / Convert Text (non-Apple). Edit converted text, Replace (Convert), Copy Text, re-convert in another language. Result text approximates original size; color = first letter's color.
- Recognition language set per document (Document properties > Recognition Language) — re-indexes.

---

## Math & AI features

### On-device AI (Apple only, no AI credits)
- **Spellcheck (Apple only)**: recognizes handwriting; red underline for misspellings; tap → suggestions → corrects while keeping your handwriting style (AI matches on-page handwriting; more content = more accurate). **Personal Dictionary** (Add to Dictionary). Languages: Dutch, English (US/UK), French, German, Italian, Portuguese (BR/PT), Spanish, Turkish. Disable per document via Pen tool > Check Handwriting Spelling.
- **Math Conversion (Apple only)**: handwriting → typeset equation + LaTeX; copy as image. Lasso equation → More > Convert > Math. Edit Equation (LaTeX editor; Copy LaTeX; Preview original handwriting; Report). macOS: Apple silicon only.
- **Math Assist (Apple only)**: on-device instant solutions. Enable via Pen > Math Assist > Suggestions. Write an equation with "=", it glows blue, tap → Solve. Live variable substitution. **Only in notebooks with language set to English.** Supported: arithmetic, substitution, simple/quadratic/cubic/quartic equations, systems, expansion/factorisation, trig, absolute values/±, summations/products, scientific notation, functions, limits, differentiation, integration, matrix algebra. **Not supported: differential equations, geometry, inequalities.**

### Advanced (cloud) Goodnotes AI — uses AI Credits
- **Ask mode** (info without changing page) vs **Create mode** (modify/generate content, incl. images). Create mode availability: Pro, AI Pass, CN-Essential, CN-Special Edition.
- Can: generate first drafts, paper templates, Whiteboard/mind-map layouts, diagrams/lists/study materials, summarize pages, locate details, restructure notes.
- **Limitations**: no auto date detection/insert; edits usually create new content (don't overwrite); styling limited to doc's options; no real-time external data; no file upload/download; complex requests slower.
- **AI Credits**: usage-based; allotted by plan; replenished on the 1st of each month; synced across devices. Guidance: 525 credits ≈ 3 hours; 6,300 credits ≈ 30 hours. Check balance via Goodnotes menu > profile or AI Sidebar. AI Pass add-on for more.
- Views: Window (Apple) / Floating / Sidebar; Response Language selectable. Privacy: keep conversations private (Apple) or share chat history.
- **Goodnotes AI for Math** (Wolfram|Alpha LLM API): **Solve** (detailed step-by-step) and **Teach Me** (guided practice/hints). Input: handwriting, typed LaTeX, or imported PDF worksheet.
- **Goodnotes AI for Meetings**: **Calendar Connection (Apple only; Pro/AI Pass)** — Google Calendar integration, auto-creates event-linked notes (folder path Calendar Event > {Event Name} > {Event Name} {Date}), reminders; **Live Summarization** (Pro/AI Pass/CN-Essential/CN-Special Edition; excluded regions: Afghanistan, Belarus, Iran, Macau, North Korea, Russia, Syria, Ukraine, Venezuela); **Automated Note-taking** (Generate Notes / Enhance Notes — max meeting 3 hours; Free = 20 min/notebook).

### Goodnotes in ChatGPT & Claude
- App on ChatGPT / connector on Claude. Generate Text Documents, Whiteboards (freeform), Diagrams (mindmaps/timelines/flowcharts) → import into Goodnotes. Uses ChatGPT/Claude model, NOT Goodnotes AI credits; available on ALL plans incl. Free. Diagram styles: Classic, Gray, Line. Creates NEW documents only (can't edit/analyze existing Goodnotes docs). Claude may need Pro/Team/Enterprise for connectors.

### Word complete / handwriting-to-text
- Handwriting-to-text via Lasso Convert (see Search section). Guide does not document a distinct "word complete" auto-completion feature by that name; "Notes Reorganization" (Edit Handwriting) adjusts handwriting as if typed.

---

## Study tools

### Study Set (Apple only)
- Digital flashcard collection (words, images, other info). Synced across devices via Cloud Sync.
- Two modes: **Practice Mode** (all cards, sequential or random) and **Smart Learning Mode** (spaced repetition — shows cards you're likely to forget at optimal intervals).
- Create: Study Set → title → edit Question/Answer sides. Card content types: **Text**, **Image** (image background), **Freeform** (any content incl. handwriting).
- Card ops: Add Card, Duplicate Card, Delete Card, navigate (swipe / arrow keys), Thumbnail View jump.
- Create from file: import app-exported study sets, or plain-text .txt/.csv/.tsv (question in col A, answer in col B, no headers).
- **Migration**: from Quizlet (export with Tab between term/definition, new line between rows → CSV/TSV) and Anki ("Notes in Plain Text").
- Review: Practice (flip = tap; Previous/Next; slider; **Speak** icon for text; Shuffle toggle; Flip Mode toggle). Smart Learn: rate **❌ Still Learning** / **✅ Knew It** (or flick card). App reminds when to study again; ratings optimize schedule.
- **Scratch Paper** button; Change Background; **Notifications** (Active/Paused) for review reminders.
- Manage cards (thumbnail view): reorder, insert before/after, duplicate, delete (single or multi; **deleted cards cannot be recovered**), move to another set.
- Export: **.goodnotes format only**.
- Keyboard shortcuts — Edit: Tab / Shift+Tab (next/prev field). Practice: ←/→ prev/next card, Spacebar flip. Smart Learn: ← Still Learning, → Knew It, Spacebar flip.

### Legacy Flashcards (GN5, experimental)
- Flashcard template (question top half / answer bottom half); Study Flashcards mode with **Again / Hard / Good / Easy** difficulty ratings (SM-style spaced repetition); reset learning progress; any template can be marked a flashcard template. Convert Flashcards to Study Set available.

---

## Sync, backup & offline

### Cloud Sync (Apple)
- **iCloud Sync**: auto-syncs across Apple devices on the same iCloud account (two-way). Enable per device: Settings app signed into same Apple Account + Goodnotes menu > Cloud & Backup > Cloud Sync > Use iCloud to Sync Documents.
- **Goodnotes Cloud Sync**: cross-platform (powers Android/Windows/Web); requires same Goodnotes account. **Availability: Goodnotes Pro.** Migration path from iCloud offered.
- Cloud Status menu: Sync Now, Back Up Now, Cloud & Backup Settings.

### Automatic Backup (Apple) — one-way to third-party cloud
- Targets: **Google Drive, Dropbox, OneDrive, WebDAV**. One-way (does NOT sync changes across devices).
- Triggers uploads on: create/import doc, create folder, recover item, page changes, template change, page reorder, rename. **No effect on cloud** for: delete doc/folder, favorite/unfavorite, custom outline changes. Move updates cloud folder structure.
- Settings: Auto Backup toggle, View Backup Queue, Pause/Resume, Empty Queue, Cloud Storage, Sign in, **Upload only over Wi-Fi and Bluetooth**, Destination Folder (path with "/"; no trailing "/"), File Format (PDF / Goodnotes / Goodnotes & PDF), Excluded Folder/File Names (comma-separated).
- Provider quirks: Dropbox restricted to `<root>/Apps/Goodnotes`; Google Drive only base-level folder (no custom destination); WebDAV — avoid folder collisions between users.
- Restart procedure documented (disable → Done → re-enable → watch queue to "Backup successfully completed").

### Manual Backup (Apple)
- Full library ZIP (Back Up Now) to Files/other apps; restore by importing the .zip.

### Goodnotes Cloud (Q&A)
- Encrypted; third-party providers (e.g., AWS); Goodnotes doesn't access note data without permission; only you (unless shared); retained while account active; **may delete after 2 years inactivity without payment** (per T&C 12.2, with reminder emails); data may be stored outside your country; transfer out via Manual Backup; disabling stops future sync (existing cloud files remain).
- **Locked notebooks are NOT included in Auto Backup** (use iCloud Sync or export copies).

### Offline
- Basic editing offline; AI + real-time collaboration require internet; edits sync when back online. Placed GIFs visible offline; new GIF search needs internet.

### Legacy GN5 backup
- iCloud Sync (two-way, encrypted, not user-accessible on server); Automatic Backup (Google Drive/Dropbox/OneDrive, one-way, files accessible); Manual backup & restore (ZIP). iCloud Drive NOT an Auto Backup option.

---

## Sharing, collaboration, comments, links

### Sharing a document
- All shared docs appear in the **Shared tab**.
- **Apple requirement**: iCloud Sync enabled for both sharing and accepting; changes sync near real-time (iCloud fallback).
- **Public link**: Share… > enable Shareable Link > Copy Link. Public — share only with trusted people.
- **Private sharing (Pro plan)**: turn off Shareable Link, invite collaborators by email; owner manages per-collaborator permissions (People with Access).
- Unshare: disable Shareable Link (revokes all access; re-enable restores same URL). Leave a shared document (still re-joinable via link if enabled).
- Add shared doc to your folders (Add to My Documents — organizational only; disappears if owner unshares; duplicate for a permanent copy).

### Real-time collaboration
- **Turbo Sync** (near-instant cross-device updates); **Real-Time Collaboration** (see collaborators' pen strokes, laser pointers, lasso selections live).
- Availability: **Essential** = join real-time sessions when invited; **Pro** = initiate collaboration by inviting.
- **Follow a collaborator (Apple only)**: tap their avatar in Currently Viewing to mirror their view/page/actions live.
- **Mark pages as seen (Apple only)**: blue badge on changed shared docs/pages; a page auto-marks seen after >1s view; bulk Mark as Seen.
- Recording is NOT shared via live collaboration (workaround: export in Goodnotes format).

### Comments
- Long-press (right-click on desktop) → Add Comment → type → Send. Threads represented by pins.
- Actions: Move (long-press pin + drag), Open (tap pin), Edit/Delete/Copy Link to Comment, **Resolve/Unresolve**, Copy Link. Delete all comments in a thread deletes the thread. Show/Hide Resolved Comments.
- **Edit and Resolve are NOT supported on Android/Windows/Web.**
- Non-Goodnotes users can comment on a doc opened on the web (must sign in with Apple/Google; no anonymous comments) — documented in GN5 section.

### Widgets (Apple only)
- QuickNote widget (one-tap QuickNote) and Favorites widget (up to 4 most recently modified favorites; open item, search, create QuickNote). Not available on Android/Windows/Web.

---

## Presentation mode, laser pointer, zoom window, multi-window/split view

### Presentation Mode (Apple only; not on macOS)
- Turns iPad/iPhone into a digital whiteboard via HDMI or AirPlay screen mirroring; hides UI from audience. Connect to same Wi-Fi as Apple TV / AirPlay 2 TV / Mac → Screen Mirroring → select display.
- Options: **Mirror Entire Screen** (exactly your device), **Mirror Presenter Page** (current page WITH zoom/page-switch animations; Split View apps hidden), **Mirror Full Page** (current page full width/height WITHOUT animations; Split View hidden).
- Requires an AirPlay receiver (Mac on Monterey+ works; else third-party like Zoom/Reflector). Best used with Laser Pointer.

### Laser Pointer
- Temporary annotations to focus attention during presentations/screen sharing. Screen Sharing (broadcast, e.g., Zoom/Meet/Teams) or Screen Mirroring (Apple/Android/Windows instructions given).
- Styles: **Dot** (red dot following touch) or **Line/Trail** (temporary trail, disappears after ~1s). If not visible, rotate to landscape.

### Zoom Window Tool (Apple only)
- Magnifies a small area (blue box) so you can write clearly; window auto-advances as you write.
- Reposition box (tap/drag/Back/Forward/Next Line), scale box (diagonal handle — smaller box = higher magnification), change box height (vertical handle), reposition window, pinch/spread to zoom, adjust left margin, change return height (points), enable/disable Auto Advance (Document Editing).

### Time Keeper (Apple only)
- Countdown Timer, Stopwatch with Laps, Session History. Timer: +1 min, exact fields, Start/Pause/Continue/End; **My Modes** presets (e.g., Focus 25 min, Break 5 min, Extended 50 min — Pomodoro). Stopwatch: Start/Pause/Continue/Lap/Reset. Runs in background; alert to save on tab close. Rename/delete sessions in History.

### Multi-window / Split View
- **Open in New Window (Apple only)** for documents, pages, boards, elements popover (Split View). Slide Over mode for elements.
- New Window shortcut: Cmd+N (Apple) / Ctrl+N (Android/Windows). Note: Zoom Window, Time Keeper NOT available on Android/Windows/Web.

---

## Stylus gestures & Apple Pencil settings

- **Apple Pencil Pro squeeze**: squeeze the Pencil to open the toolbar (supported iPad). Other stylus shortcuts (Samsung S Pen, Surface pen buttons) may work by device/platform.
- **Stylus & Palm Rejection (Apple only)**: accessible from document More menu and Settings (Stylus & Palm Rejection). (Wrist protection / palm rejection settings live here; guide references the setting group but does not enumerate sub-options in detail.)
- **Pen Gestures** (see Handwriting section): Scribble to Erase, Circle to Lasso.
- One-finger vs two-finger navigation differs by platform (see Platform differences).
- The guide does NOT document Apple Pencil double-tap or hover as distinct configurable features in the crawled text (squeeze is the documented Pencil shortcut).

---

## Keyboard shortcuts

Platform note from guide: if a shortcut works on both Apple and non-Apple, no label; labels flag platform-specific ones.

### File
- New Window: ⌘+N / Ctrl+N (Apple + Android/Windows only)
- New Notebook: ⌥+⌘+N / Ctrl+Shift+N (Apple only)
- New QuickNote: ⇧+⌘+N / Ctrl+Shift+Q (Apple only)
- New Text Document: ⇧+⌘+T / Ctrl+Shift+T (Apple only)
- New Whiteboard: ⇧+⌘+W / Ctrl+Shift+W (Apple only)
- Open: ⌘+O / Ctrl+O (Apple only)
- Close tab: ⌘+W / Ctrl+W (Apple only); Close all tabs: ⌥+⌘+W (iPadOS only)
- Rename: ⌘+R / Ctrl+R (Apple only)
- Export: ⇧+⌘+E / Ctrl+Shift+E (document view on non-Apple)
- Print: ⌘+P / Ctrl+P (Apple only)
- Share and Export: ⇧+⌘+S / Ctrl+Shift+S

### Edit
- Undo ⌘+Z / Ctrl+Z; Redo ⇧+⌘+Z / Ctrl+Shift+Z or Ctrl+Y
- Cut/Copy/Paste ⌘+X/C/V; Paste and Match Style ⌥+⇧+⌘+V (Apple only)
- Delete (Delete/Backspace); Select All ⌘+A / Ctrl+A (library/thumbnail items)
- Duplicate ⌘+D / Ctrl+D or Alt+D; Find ⌘+F / Ctrl+F; Find Next/Prev ⌘+G / ⇧+⌘+G (Apple only); Dismiss Search Esc (non-Apple only)

### View & navigation
- Enter Full Screen Fn+F (Apple + Web only); Zoom In/Out ⌘+/- ; Actual Size ⌘+0 (non-Apple); Zoom to Fit ⌘+9; Show/Hide Sidebar ⌃+⌘+S (Apple, Library View); Jump to Page ⌥+⌘+G (Apple only)

### Tools
- Pen P, Pencil 2, Highlighter H, Eraser E, Draw Shape/Shape D/S, Lasso V, Text T, Image I, Elements M, Tape A, Writing Tools W, Laser L, Sticky Notes N, Ruler R, Timer K (Apple only), Ask Goodnotes ⌥+⌘+A / Ctrl+Alt+A

### Formatting/text
- Align L/C/R ⌘+{ / ⌘+ / ⌘+} (Android/Windows only); Bold/Italic/Underline ⌘+B/I/U; Strikethrough ⇧+⌘+X; Add/Edit Link ⌘+K

### Text Document
- Highlight ⇧+⌘+H; Code Block ⌘+⌥+8; Exit block/Insert below ⌘+Enter; Insert block above ⇧+⌘+Enter; Turn Into ⌘+T; Insert Image block ⇧+⌘+I; delete word/paragraph, table nav, go to start/end, move/select word-by-word variations documented.

### Canvas & tabs
- Dismiss context Esc; Switch to Tab 1–9 ⌘+1–9 / Ctrl+1–9 (Apple only)
- iOS/iPadOS: long-press ⌘/Ctrl to show the shortcut list.

---

## Platform differences (Apple vs Android/Windows/Web — what non-Apple LACKS)

Non-Apple (Android, Windows, Web) is missing or limited compared to Apple:
- **Export**: only PDF and Link, Flattened only (no .goodnotes native export, no Image export, no Editable PDF).
- **Notebook creation UI**: different layout, fewer options/labels.
- **Full-page typing**: Apple only (non-Apple has movable text boxes only).
- **On-device AI**: Spellcheck, Math Conversion, Math Assist — Apple only.
- **Lock/Password Protection**: Apple only (locked status not transferable to Android/Windows/Web/GN5).
- **Cloud & Backup**: iCloud Sync, Automatic Backup (Drive/Dropbox/OneDrive/WebDAV), Manual ZIP backup — documented as Apple; non-Apple relies on Goodnotes Cloud (Pro).
- **Study Set** — Apple only.
- **Zoom Window Tool, Time Keeper** — not on Android/Windows/Web.
- **Presentation Mode** — Apple only (and not macOS).
- **Widgets** — Apple only.
- **Quick Record, Scan Documents** — Apple only.
- **Library content search** — non-Apple can search titles only from Library View; content search only inside an open doc.
- **Handwriting recognition languages** — Chinese, Japanese, Korean, Russian, Thai are Apple only.
- **Comments** — Edit and Resolve NOT supported on non-Apple.
- **Audio**: recording does NOT continue in background on Android (stops on app switch); audio-clip Export is Apple only; Notes Playback modes Apple only.
- **Convert handwriting**: path differs (Convert > Text vs Convert Text).
- **Move across page boundaries** with lasso — Apple only.
- **Follow a collaborator, Mark as Seen** — Apple only.
- **Calendar Connection** (AI for Meetings) — Apple only.
- **Filter menu in Library** — Apple only.
- **List view** — Apple only.
- **Auto outline generation** — Apple only.
- **Scrolling/pan**: iOS one-finger scroll regardless of tool + one-finger pan with Pencil; **Android/Windows/Web require Lasso tool for one-finger scroll, else two-finger**; two-finger pan is standard on non-Apple.
- **Scroll to top / double-tap fit-to-width** — Apple only.
- **Image Playground, Apple Intelligence Writing Tools** — Apple only.
- **Add to Dictionary/Personal Dictionary** — tied to Apple Spellcheck.
- Non-Apple gains: dedicated **Bookmarks tab**, **Duplicate Page** in current-page menu, Toolbar Customization visible in document settings.

---

## Settings & configuration

### Apple (Goodnotes menu > Settings)
- Document Editing (Scrolling Direction: Horizontal/Vertical; Zoom Window Auto Advance); Document Privacy (Password Protection setup); Stylus & Palm Rejection; Language; Handwriting Recognition; Writing Aids (Advanced Settings incl. default spellcheck for new docs); Notification Preferences; Email to Goodnotes; Feedback & Surveys; Troubleshooting.
- Per-document settings (More menu): Add Lock (Apple), Show Resolved Comments, Scrolling Direction, Sidebar position (Apple), Stylus & Palm Rejections (Apple), Document Editing (Apple), Toolbar Customization (non-Apple).
- Device Settings > Goodnotes: Allow Goodnotes to Access, Preferred Language, Goodnotes Settings.

### Android/Windows/Web (Settings > Preferences)
- Document Settings, Notification Preferences, Cookie Preferences, Other Settings (Scrolling Direction, Goodnotes AI Settings, app permissions via OS settings).

### Legacy GN5 settings
- Handwriting Recognition, Document Editing, Stylus & Palm Rejection, iCloud Settings, Email to GoodNotes, Back up Data, Automatic Backup, Search Indexing, Troubleshooting.

---

## Lock / password protection (Apple only)
- One **universal password** for all locked notebooks in the account (case-sensitive) + optional hint + Face ID/Touch ID.
- Locked notebook **relocks 2 minutes** after leaving app / locking device (configurable). Switching between already-open tabs keeps them unlocked.
- 3 wrong attempts → hint on 4th try. Exported files do NOT retain the lock (lock applies only inside Goodnotes).
- **Limitations**: one universal password; **folders cannot be locked**; locked docs can't be shared until unlocked; password tied to current Goodnotes account; **Goodnotes cannot recover/reset a forgotten password**; not included in Auto Backup; not transferable to GN5/Android/Windows/Web.

---

## Revision history (feature timeline from the modern guide)
- Aug 3 2026: choose content type to erase; Align Objects.
- Jul 20 2026: guide unified for Apple + Android/Windows/Web.
- Jun 2 2026: Delete Specific Items on a page.
- May 25 2026: shapes rounded by default; Rounded Rectangle.
- May 13 2026: GIPHY GIFs.
- May 12 2026: table improvements in Text Documents.
- May 8 2026: Notes Playback settings.
- Apr 24 2026 / Apr 10 2026: (added feature) / Goodnotes in ChatGPT & Claude.
- Mar 17 2026: Favorites widget.
- Jan 26 2026: lock objects in place.
- Jan 13 2026: search/filter/sort when moving/importing content.
- (GN5 revision history spans 2022–2023: comments-on-web, Study Sets, noise reduction, color slots, follow a collaborator, etc.)

---

## Pricing / plan mentions
- **Free plan**: notebook quota (GN5: 3-notebook limit; over the limit → no new notebooks + read-only editing); 20-min recording cap + 3-document transcription cap; can join (not initiate) real-time collaboration; GIPHY + ChatGPT/Claude integration included.
- **Essential**: no transcription caps; Create mode for Text Docs; join real-time collaboration; Basic Summarization. (Essential in China treated as Pro.)
- **Pro**: unlimited creation/import; import by email; import from cloud storage; Goodnotes Cloud sync; private (invite-only) sharing; initiate real-time collaboration; Save-to-cloud-PDF; Live Summarization; Calendar Connection; Automated Note-taking; Create mode + image generation.
- **AI Pass**: add-on for extra AI credits/capabilities.
- **CN-Essential / CN-Special Edition**: China-specific tiers for AI features.
- AI Credits: plan-allotted, refresh on the 1st monthly, synced; ~525 credits ≈ 3h, ~6,300 ≈ 30h.
- Subscriptions managed by the store of origin (App Store/Google Play/Galaxy/Microsoft/web-Paddle); cancel ≥1 day before renewal; annual plans auto-renew. Marketplace refunds handled by Apple, not Goodnotes.
- Education: Apple School Manager schools get full access free.
- Account deletion: 21-day grace period (immediate option available); cross-platform deletion caveats; export first.

---

## Accessibility mentions
- **Speak** (text-to-speech) icon in Study Set review for textual content.
- Handwriting-to-text conversion and Notes Reorganization aid legibility.
- Zoom Window aids users with large fingers / thick styli.
- Spellcheck + Personal Dictionary.
- Response Language / Recognition Language selection; Preferred Language app setting.
- Read-only Mode (distraction-free viewing).
- The guide does NOT document VoiceOver/screen-reader support, Dynamic Type, contrast/color-blind modes, or reduce-motion options — a gap for accessibility coverage.

---

## Table stakes Sane Notes must match
1. **Multi-style pen** (fountain/ball/brush) with pressure sensitivity, tip sharpness/flatness, and **stroke stabilization**; reorderable color slots with HEX + eyedropper; solid/dashed/dotted strokes.
2. **Three eraser modes** (precision/standard/stroke), erase-highlighter-only, auto-deselect, and **scribble-to-erase** gesture.
3. **Powerful lasso**: freehand + rectangular, per-type inclusion filters, move/resize/rotate, color, screenshot, convert-to-text, create-element, layering, and **circle-to-lasso** pen gesture.
4. **Highlighter, tape (active recall), shapes with smart connectors + AutoShape, ruler, sticky notes, elements/stickers library (incl. GIFs).**
5. **Text**: movable text boxes with full formatting + text-box styling; lists (bulleted/numbered/toggle/to-do); internal + external hyperlinks; a pageless typing document with tables/media.
6. **Import/annotate PDFs** (highlight/strikeout PDF text) and **export to PDF** (flattened + editable, with searchable-handwriting option), plus native + image export.
7. **Organization**: folders/sub-folders with colors/icons, tabs, favorites/bookmarks, collapsible multi-level outlines, robust page management, QuickNotes, Trash with recovery.
8. **Search** across handwriting, typed text, PDF text, titles, outlines; handwriting recognition in many languages; handwriting→text conversion.
9. **Audio**: record with note-linked playback, ±10s/seek/speed, transcription (on-device + cloud) and summaries.
10. **Cross-device sync** (own cloud) + third-party auto-backup (Drive/Dropbox/OneDrive/WebDAV) + manual ZIP; offline editing that syncs later.
11. **Real-time collaboration** with live strokes/cursors, comments with resolve, public + private/invite sharing.
12. **Study tools**: flashcards / study sets with **spaced repetition** and practice mode; import from Quizlet/Anki/CSV.
13. **Math**: handwriting→LaTeX/typeset conversion and step-by-step solving/teaching.
14. **AI**: ask + create modes, page summarize/restructure, outline generation, diagram/template generation, image generation.
15. **Presentation/laser pointer, zoom-writing window, multi-window/split view, keyboard shortcuts, stylus squeeze, palm rejection.**
16. **Templates**: rich built-in library + custom (PDF/image) templates and covers, dynamic size/color.
17. **Lock/password protection** for sensitive documents.

## Weaknesses / gaps observed in Goodnotes
1. **Severe Apple-vs-non-Apple feature gap** — Android/Windows/Web lack full-page typing, on-device AI (spellcheck/math), Study Sets, Zoom Window, Time Keeper, Presentation Mode, widgets, lock, native/image/editable export, library content search, several recognition languages, comment edit/resolve, and background audio recording (Android stops on app switch). A single, platform-parity product is a clear differentiator.
2. **No OCR on imported PDFs** — only PDFs that already carry an OCR layer are searchable. Sane Notes could OCR on import.
3. **Full-page typing is crippled**: Helvetica-only, no reflow between pages, manual page adds when full, no nested lists, can't export to Word/TXT, poor spacing on custom templates.
4. **Handwriting can't be hyperlinked**; no links to images/elements, page sub-sections, local files, phone/email; links only on typed text.
5. **Eraser can't erase images/objects**; tape/shape erasing needs mode toggles.
6. **Math Assist is English-only and notebook-language-gated**, and excludes differential equations, geometry, inequalities.
7. **Audio note capture is limited to the recording's starting page**; recordings aren't shared in live collaboration; Notes Playback modes don't sync cross-platform; noise reduction requires A16/M1+.
8. **Deleted Study Set cards cannot be recovered**; study sets export only as .goodnotes.
9. **One universal password** for all locked notebooks; folders can't be locked; no password recovery; locked notebooks excluded from Auto Backup.
10. **AI is credit-metered** with monthly caps and requires internet; on-device AI is Apple-only. Cloud transcription burns credits continuously.
11. **Auto Backup is one-way and provider-constrained** (Dropbox fixed subfolder; Google Drive base-level only); iCloud Drive unsupported as a backup target.
12. **Whiteboard minimap and convert-to-Whiteboard are Apple-only**; some Text Document AI (image gen) gated to Pro.
13. **Accessibility is thin** — no documented screen-reader, Dynamic Type, high-contrast/color-blind, or reduce-motion support.
14. **Goodnotes Cloud may delete data after 2 years of inactivity** without payment (with warnings) — a retention risk.
15. **Two overlapping flashcard systems** (legacy GN5 Flashcards vs. Study Sets) with a manual migration path — fragmented UX.
16. **No Apple Pencil double-tap/hover configuration documented** (only squeeze) — a missed stylus-integration surface.

## Sources
- /private/tmp/claude-501/-Users-lamp/00ef9431-8d8f-4a6b-892c-6ca12cd66682/scratchpad/research/goodnotes-userguide-full.md (full crawl of the official Goodnotes User Guide: Goodnotes 7.1.10+ on Apple; 316803.0l+ on Android/Windows/Web; plus the appended legacy GoodNotes 5 v1.96 guide).
