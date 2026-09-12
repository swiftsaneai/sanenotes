# Sane Notes — Screens & Flows Specification

> Product UI specification reverse-engineered from the Claude Design canvas bundle
> (`Sane Notes.dc.html` + `sane-logic.js` + `sane-data.js`). This is a **student
> note-taking app** ("handwriting, PDFs and lecture audio in one notebook — linked,
> searchable, yours"). The design demonstrates one product rendered across **17 visual
> "looks"** (themes), light/dark, and **free vs. Pro** plans, all driven from four canvas
> props. This document captures the intended product behaviour, not the theming machinery.

---

## 0. Design harness & global model

### Canvas props (the four knobs the mockup exposes)
Defined in the `data-props` attribute of the logic script. Changing a prop re-derives state
via `propsChanged`.

| Prop | Type | Default | Options | Section |
|---|---|---|---|---|
| `theme` | enum | `paper` | paper, minimal, pop, maximal, glass, neumorph, clay, brutal, neobrutal, skeuo, flat, material, bento, y2k, retro, cyber, editorial (17) | Look |
| `darkMode` | boolean | `false` | — | Look |
| `plan` | enum | `free` | free, pro | Behavior |
| `startScreen` | enum | `login` | login, profiles, onboarding, library, editor, search, settings | Behavior |

- A user-selected value (theme card, dark toggle, plan trial, screen nav) is held in
  `themeSel` / `darkSel` / `planSel` and **overrides** the prop until the prop changes again.
- `narrow` is set when `window.innerWidth < 900`; it collapses the sidebar to icon-only
  (68px vs 248px) and hides desktop-only affordances (page rail, subjects list).

### Brand
- Product name: **Sane** (full: **Sane Notes**). Sidebar/login wordmark reads "Sane".
- Logo/mascot: `sane-sage.png` — a cartoon sage in a conical straw hat (the "Sane sage").
- One screenshot shows an older working name "**SS Notes**" and an "SS Cloud" backup option;
  treat "Sane" as the current name. (See Open Questions.)

### Persona
- **Riya S.** — B.Tech student, Physics minor. Verified student (student pricing) "until Jun 2027".
  Email `riya.s@student.edu`. India locale: prices in ₹, phone auth is `+91`, greeting "Good afternoon, Riya".
- Two other profiles ship on her account: **Aarav** (sibling, Class 12 · JEE prep) and **Work** (workspace, internship notes).

### Theme system (context, not a screen)
17 "looks", each defined with light + dark palettes and "feel" tokens (button borders/shadows,
chip radius, casing, heading weight/style/scale, ground pattern). Grouped as **Warm** (Paper,
Skeuomorphism, Retro), **Clean** (Minimalism, Glassmorphism, Flat, Material, Bento), **Bold**
(Pop, Maximalism, Y2K, Cyberpunk), **Soft** (Neumorphism, Claymorphism), **Raw** (Brutalism,
Neo-Brutalism, Editorial). Every look restyles the entire app *including the notebook pages*.
Dark mode has a night version of each; **PDFs keep their original colours** even in dark mode.

---

## 1. Screen & surface inventory

### Full screens (`state.screen`, one visible at a time in `<main>`)
| Screen | Purpose |
|---|---|
| **Login** | First-run authentication (Google / Apple / Microsoft / phone-OTP). Full-bleed z-45 overlay. |
| **Profiles** ("Who's writing?") | Choose which profile on this device to open. Full-bleed z-45 overlay. |
| **Library** | Home. Greeting, "pick up where you left off", notebook grid/list, filters. |
| **Editor** | The core canvas: ink, PDF pages, audio bar, palette dock, page rail. |
| **Search** | Universal search across handwriting / typed / PDF / audio + "Ask my notes". |
| **Settings** | Six tabs of account & preferences. |

### Modals / overlays (`state.overlay`, dimmed backdrop, click-outside to close)
| Overlay | z | Purpose |
|---|---|---|
| **Onboarding** | 40 | 3-step first-run tour (value prop → subjects → look). Full-bleed. |
| **Templates** | 20 | "New notebook" or "Paper & template": page style, template, tint, size. |
| **Share** | 20 | Link toggle + permission, people/roles, invite, export. |
| **Import PDF** ("Import a PDF") | 20 | Source picker + recents + free-import meter. |
| **Upgrade** | 30 | Free vs Pro comparison, billing toggle, start trial. |

### Persistent / inline surfaces
| Surface | Where | Purpose |
|---|---|---|
| **Sidebar** | Left of every non-fullscreen screen | Nav, subjects, free-plan card, settings, profile switcher. Hidden in Editor by default (`sideOpen` starts false there). |
| **Audio recorder bar** | Editor, under toolbar | Record / play / scrub / speed. |
| **Selection action bar** | Editor | Appears when lasso has a selection: Convert to text / Delete / Solve math. |
| **Text edit bar** | Editor | Inline input when editing a text box. |
| **Palette dock (toolbar)** | Editor, floating | Tools, colours, widths, page nav; drag-to-dock to any edge. |
| **Page rail** | Editor right (or left if left-handed) | Page thumbnails + Add page. |
| **Ask my notes panel** | Search | Inline AI answer card (Pro preview). |
| **Toast** | Bottom-centre, any screen | Transient confirmation (2.4 s auto-dismiss). |
| **Focus-exit pill** | Editor top-right in focus mode | Leave focus mode. |

---

## 2. Sidebar (shared shell)

**Layout (top → bottom):** brand row (sage logo + "Sane" + plan label "Free · Student" / "Pro · Student")
→ search launcher button ("Search notes, PDFs, audio…" + ⌘K badge) → nav list → subjects (wide only)
→ bottom block (free-plan upsell card, Settings, profile switcher).

**Controls**
- **Search launcher** → opens Search screen.
- **Nav items:** All notebooks, Recent, Favorites, Shared, Trash. Each sets `navItem` and returns to
  Library with `libFilter` reset to All. Active item highlighted (`--acs` background, weight 700).
- **Subjects** (wide only): one row per subject with colour swatch + notebook count; click filters
  Library to that subject. Physics (blue), Mathematics (purple), Chemistry (green), Design (orange),
  Languages (pink), Personal (gray).
- **Free-plan card** (free + wide only): "Free plan · N of 5 PDF imports", progress bar (`importsUsed*20%`),
  **Upgrade · ₹83/mo** → Upgrade overlay.
- **Settings** → Settings screen. **Profile switcher** (avatar + name + note) → Profiles screen.

**States:** collapses to 68px icon rail when `narrow`; width 0 in Editor until `sideOpen` toggled.

---

## 3. Login screen

Two-column when wide (`showObArt`): left = dark marketing panel; right = auth form (max 520px, centred).
Marketing panel: sage logo, a tilted "Lecture 12" handwritten page card, a "Recording 04:12" pill (pulsing
red dot), a stacked-avatars pill, and headline **"Study smarter."** with subcopy
*"Sane Notes: handwriting, PDFs and lecture audio in one notebook — linked, searchable, yours."*

Form heading: **"Welcome back"** / *"Sign in to open your notebooks on this device."*

**`loginStep = 'methods'` (default)**
- **Continue with Google** → `screen: profiles`, toast "Signed in with Google".
- **Continue with Apple** → profiles, toast "Signed in with Apple".
- **Continue with Microsoft** → profiles, toast "Signed in with Microsoft".
- Divider "or".
- **Continue with mobile number** (primary/accent button) → `loginStep: 'phone'`.
- Fine print: *"By continuing you agree to the Terms and Privacy Policy. Handwriting recognition runs on your device."*

**`loginStep = 'phone'`**
- Label "Mobile number", fixed **+91** prefix, numeric input (`setPhone` strips non-digits, max 11 chars incl. space).
- **Send code** (`sendCode`): if `< 10` digits → toast "Enter a 10-digit mobile number"; else `loginStep: 'otp'`, toast "Code sent to +91 <phone>".
- **Other ways to sign in** → back to methods.

**`loginStep = 'otp'`**
- Copy "We sent a 6-digit code to **+91 <phone>**". OTP input (`setOtp` digits only, max 6), large letter-spaced.
- **Verify and continue** (`verifyOtp`): if `< 6` digits → toast "Enter the 6-digit code"; else → `screen: profiles` (resets loginStep/otp).
- **Change number** → methods. **Resend code** → re-runs `sendCode`.

---

## 4. Profiles screen — "Who's writing?"

Full-bleed centred. Sage logo, heading **"Who's writing?"** / *"One account, a private space for each of you."*

**Controls**
- **Profile tiles** (rounded-square avatar with initial, name, note). Click = `pickProfile(id)`:
  → `screen: library`; if `firstRun` (came via login) → also opens **Onboarding** overlay and clears firstRun.
  Active profile gets an accent ring + "Current" label; others "Switch".
- **Add profile** tile (dashed +): reveals an inline name input (`newProfile`, max 24 chars) → **Create**
  (`addProfile`) appends a profile with a rotating colour, role "Member", note "New profile"; toast "Profile added — <name>". **Cancel** dismisses.
- **Use a different account** → `signOut` (back to Login).

Seed profiles: **Riya** (Owner · B.Tech · Physics minor), **Aarav** (Sibling · Class 12 · JEE prep), **Work** (Workspace · Internship notes).

---

## 5. Onboarding overlay (3 steps)

Full-bleed, two-column when wide (art panel left = same "Lecture 12" page + recording pill + avatars pill).
Right column: sage logo, **progress dots** (active dot widens to 22px), step content, sticky footer
(**Skip** / **Continue**→**Start writing**).

- **Step 0 — "Every way you take notes, in one notebook."** Subcopy *"Write like it's paper, mark up the
  lecture's PDF, and record the room — all linked, all searchable."* Three feature rows:
  - **Ink that keeps up** — "Pressure, tilt, no lag — and it stays searchable."
  - **Slides and PDFs inside your notes** — "Highlight, annotate, then write on the next page."
  - **Audio linked to your ink** — "Tap any word you wrote to hear what was being said."
- **Step 1 — "What are you studying?"** *"We'll set up subjects and pick sensible paper for each. Change anything later."*
  Multi-select chips from `STUDY` (12): Physics, Mathematics, Chemistry, Biology, Computer Science, Economics,
  Design, Law, Medicine, Languages, History, Engineering. (`study` starts with Physics + Mathematics selected.)
- **Step 2 — "Pick your look."** *"Three looks, one app. This is also where dark mode lives."* Three theme cards
  + a **Dark mode** toggle. (Selecting a card sets `themeSel`.)

**Navigation:** `obNext` advances step 0→1→2, then on step 2 closes overlay and lands on Library.
`obSkip` closes immediately. Replayable from Settings → Account ("Replay the welcome tour").

---

## 6. Library screen

**Regions:** header (date + greeting + Import PDF / New notebook) → "Pick up where you left off" recents
(conditional) → notebook section (title + filter chips + grid/list toggle) → grid or list of notebook cards.

**Header**
- Eyebrow date "Tuesday, 8 September"; **"Good afternoon, Riya"** (greeting uses profile/persona).
- **Import PDF** → Import overlay (subject to free limit). **New notebook** → Templates overlay in `tplMode: 'new'`.

**"Pick up where you left off"** — shown only when `navItem = all` AND `libFilter = All`. Three most-recent
notebooks as horizontal cards (mini page thumbnail, title, "subject · page X of Y", updated time, Audio/PDF badges). Click opens the notebook in Editor.

**Notebook section**
- Title reflects nav: **Notebooks** (all), **Recent**, **Favorites**, **Shared**, **Trash**.
- **Filter chips:** All + the six subjects (active chip inverts to ink-on-surface). Sets `libFilter`.
- **Grid / List** toggle (`libView`). Grid = poster cards; List = dense rows with tags.
- **Notebook card (grid):** 3:4 thumbnail (rendered mini-strokes; PDF notebooks show a faux typeset page),
  coloured subject spine, favourite star (top-right), badges (Audio / PDF / Shared) bottom-left, title,
  "N pages · updated". **List row:** colour spine, title, "subject · N pages" + `#tags`, Audio/PDF badges, updated.
- Clicking a card = `openNb(id)` → Editor (page 0, sidebar closed, focus off).

**Seed notebooks (8):** Physics II — Waves (12 pp, audio+pdf+shared+fav), Calculus — Integration (31 pp, fav),
Organic Chemistry (18 pp, audio+pdf), Thesis reading — Superposition (46 pp, pdf+shared), Design History — Bauhaus (9 pp),
Statistics Lab (14 pp, pdf+shared), Spanish — Vocabulario (22 pp, audio), Semester planner (6 pp).

**States**
- **Empty (Trash):** "Trash is empty — deleted notebooks stay here for 30 days." (Trash always renders empty in this design.)
- **Empty (other):** "Nothing here yet."
- **Loading:** pre-logic fallback renders a minimal Library shell (sidebar widths, empty lists) — see `renderVals()` fallback.
- Free plan surfaces the import-usage card in the sidebar.

---

## 7. Editor screen (the core surface)

Vertical stack: **top toolbar** (unless focus) → optional **audio bar** → optional **selection bar** →
optional **text-edit bar** → **canvas + page rail** row → floating **palette dock**.

### 7.1 Top toolbar (hidden in focus mode)
Left group: **sidebar toggle**, **back to library**, title block ("<notebook> · page X of Y[ · PDF name]").
Right group: **Undo**, **Redo** (both dim to 0.35 opacity when their stack is empty), divider, **Bookmark**
(fills when page bookmarked; toast "Page bookmarked" / "Bookmark removed"), **Audio** (tinted while open/recording;
red glyph while recording), **Import PDF**, **Paper & templates**, **Share**, **Pages** (rail toggle, wide only),
**Focus mode**.

### 7.2 Canvas
- Renders the current page: paper fill pattern (lined/grid/dot/etc.), optional tint wash, PDF facsimile, strokes,
  live stroke, text layer, selection rectangle. Cornell adds divider rules; Music = staff lines; Flashcards = card outline.
- **Page geometry:** normal page 800×1040 (max 820px wide, drop shadow, 4px radius). **Freeform** page is 2400×2400,
  no max width, no shadow — an "endless board".
- **PDF page** draws a typeset facsimile ("CHAPTER 14 / Superposition and Standing Waves", greeked body bars,
  Figure 14.3 standing-wave diagram, page number 412) beneath the user's ink/highlights.
- Pointer input maps client coords into page coords (`ptr`), `touch-action:none`. Cursor changes per tool
  (crosshair / cell / text / copy).

### 7.3 Tool set (palette dock)
`tool ∈ {pen, hl, eraser, lasso, shape, text, image}`.

| Tool | Behaviour |
|---|---|
| **Pen** | Freehand stroke, smoothed (`smooth`), colour = `penColor` (INK palette), width = `WIDTHS[wIdx]`. Committed to page strokes; pushes undo. |
| **Highlighter** | Semi-transparent (opacity .5) wide stroke (fixed width 22), colour = `hlColor` (HL palette). Rendered *under* ink (highlights sorted first). |
| **Eraser** | Stroke-erase: removes any stroke it touches (`hit` test, radius ∝ width). Undo snapshot captured on pointer-down. Cursor "cell". |
| **Lasso** | Draw a loop; selects strokes whose bounding-box centre falls inside the loop bbox. Empty selection → toast "Circle some ink to select it". Shows dashed selection rect + selection bar. |
| **Shapes** | Drag from p0→p1 to draw a rectangle (axis-aligned, from the two corners). |
| **Text** | Tap to drop a text box at the point → enters inline edit (`editing`), text-edit bar appears. Empty boxes are discarded on Done. |
| **Image** | Opens the Import overlay (image/PDF insertion path). |

**Colour picker:** `swatches` shows the active palette — **INK** (6): near-black `#1f1f24`, blue `#2457c5`,
red `#d33b3b`, green `#2e8b57`, purple `#7a3ec9`, orange `#e07b1c` (dark mode maps to lighter `DARK_INK`),
or **HL** (4): yellow `#ffe45c`, pink `#ff9ad5`, green `#9be47a`, blue `#8fd3ff` when highlighter is active.
Selected swatch gets a double ring. Picking an ink colour while on eraser/lasso/image snaps tool back to pen.

**Width picker:** three dots for `WIDTHS = [1.6, 2.6, 4.4]` (rendered 5/9/13px). Selecting a width while
on the highlighter switches back to pen (highlighter has a fixed width).

**Page nav (in dock):** ‹ prev / "X / N" / next › (`gotoPage`, clamped).

**Grip / drag-to-dock:** the 6-dot grip (`gripDown`) drags the whole toolbar; while dragging, four edge
drop-zones light up and the nearest edge (`dockHint`) is chosen on release → `dock ∈ {bottom, top, left, right}`.
Bottom (default) & top lay the dock horizontally centred; left & right lay it vertically. Dock position is
also settable from Settings → Handwriting & stylus → "Toolbar position".

### 7.4 Selection bar (when lasso selection exists)
"N stroke(s) selected" + **Convert to text** (Pro) + **Delete** + **Solve math** (Pro).
- **Convert to text:** free → Upgrade overlay; Pro → deletes ink, drops a typed line
  ("Standing wave: two waves, same frequency, opposite directions"); toast "Handwriting converted to text".
- **Delete:** removes selected strokes; toast "Deleted N stroke(s)".
- **Solve math:** free → Upgrade; Pro → writes a worked solution under the ink
  ("f₂ = 2·v/2L = v/L → … f₂ ≈ 442 Hz"); toast "Solved — steps written under your ink".

### 7.5 Text-edit bar
Inline input (placeholder "Type your text…") + **Done** (`doneText` commits, discards if blank, snaps tool to pen).

### 7.6 Audio recorder bar (states)
Opened by the toolbar Audio button; auto-opens while recording. Three states:
- **Idle, no recording** (`audioIdleNoRec`): red **Record** button + copy *"Ink is time-linked to audio — later,
  tap anything you wrote to hear what was said."*
- **Recording** (`rec`): pulsing red dot, live timer (`mm:ss`, tick +0.25 s / 250 ms), animated bars, **Stop**.
  `startRec` toast "Recording — everything you write is time-linked". `stopRec` stores `audio.dur = round(t)`,
  toast "Recording saved · mm:ss". While recording, strokes are timestamped (`t`).
- **Has recording / playback** (`hasRec`): **play/pause** (`playPause`), current time, **waveform + scrubber**
  (`seek`, range over duration), total duration, **speed** button cycling **1× → 1.5× → 2×**, caption "Ink replays in sync".
  During playback, strokes recorded *after* the playhead dim to opacity .12 so ink "replays" in sync with audio.
- **Close** (×) hides the bar. **Free plan:** recordings capped at **30 minutes** (stated in plan copy; not hard-enforced in the mock).

### 7.7 Page rail / thumbnails
Shown when `showThumbs` AND wide AND not focus. 132px column of page thumbnails (current page ringed accent,
bookmarked pages flagged) + a dashed **+ Page** button (`addPage` clones the current paper/tint into a new page).
**Left-handed mode** (`prefs.leftHanded`) flips the editor to `row-reverse`, moving the rail to the left.

### 7.8 Focus mode
`toggleFocus` hides toolbar, bars, and rail — just the page. A floating **"Exit focus"** pill (top-right) returns.

### 7.9 Undo / redo
`undo`/`redo` stacks (max 60 snapshots of a page's strokes). `commit` pushes to undo and clears redo.
Eraser captures its snapshot on pointer-down. Undo/redo restore the affected page and clear selection.

---

## 8. Templates overlay (`tplMode` / `tplStyle` / `tplSel` / `tplTint` / `tplSize`)

Title is **"New notebook"** (`tplMode: 'new'`, from Library "New notebook") or **"Paper & template"**
(`tplMode: 'page'`, from Editor "Paper & templates" — preselects the current page's paper/tint).

**Controls**
- **Page style** segmented: **Pages** (`tplStyle: 'pages'`) or **Freeform canvas** (`'freeform'`).
  Choosing Freeform shows an explainer: *"An endless board instead of pages — it grows in every direction
  as you write, sketch and pin PDFs. Best for mind maps, problem-solving and group whiteboarding."*
- **Template** grid (Pages only), from `TPLS`: **Blank, Lined, Grid, Dotted, Cornell, Music staff,
  Weekly planner, Flashcards** (Cornell/Planner get preview rules). Sets `tplSel`.
- **Paper color** (tint) swatches, from `TINTS`: **White** (none), **Cream**, **Yellow**, **Gray**. Sets `tplTint`.
- **Page size** segmented (Pages only): **Auto / A4 / Letter**. Sets `tplSize`.
- Footer: **Cancel** / apply button labelled **"Create notebook"** (new) or **"Apply to this page"** (page).

**Apply (`applyTemplate`)**
- New + pages → creates a lined/etc. notebook (subject = current filter or "Personal"), opens it in Editor;
  toast "New notebook — start writing".
- New + freeform → creates an "Untitled canvas"; toast "Freeform canvas — it grows as you write".
- Page mode → re-papers the current page (PDF pages only take the tint), closes overlay.

---

## 9. Import PDF overlay ("Import a PDF")

**Sources** (`importSources`): **Files** ("Browse this device"), **Google Drive** ("Connected"),
**Scan with camera** ("Auto-crop & straighten"), **Paste a link** ("Course portal, arXiv, Drive").
**Recent** files: `chapter-15-doppler.pdf` (PHY-204 · 14 pages · 2.1 MB), `problem-set-6.pdf`
(PHY-204 · 3 pages · 240 KB), `kinetics-lecture-slides.pdf` (CHM-110 · 42 pages · 8.7 MB).

Picking any source/recent = `doImport(name)` → inserts a PDF page after the current one, switches tool to
**highlighter**, increments `importsUsed`; toast "<file> imported · highlighter ready".

**Free-plan meter** (free only): "N of 5 imports used this month" + progress bar + **"Unlimited with Pro"**.
**Gate:** `openImport` when free AND `importsUsed ≥ 5` → opens Upgrade overlay instead, toast "Free plan: 5 PDF imports a month".

---

## 10. Share overlay

Title **"Share "<notebook title>""**.

**Controls**
- **Anyone with the link** toggle (`linkOn`, default on) — "They see ink, PDFs and audio exactly as you do".
- When on: **permission** segmented **Can view / Can comment / Can edit** (`perm`, default "Can edit");
  read-only link field `sane.app/n/phy204-waves-8k2f` + **Copy link** (toast "Link copied — anyone with it can …").
- **People** list with avatar, name, role. Seed: **Riya S. (you) — Owner**, **Kabir Mehta — Can edit**,
  **Ananya Rao — Can comment**. Roles: **Owner / Can edit / Can comment** (and "Can view" as an invite permission).
- **Invite by email** input + **Invite** (`sendInvite`): derives a display name/initials from the email, adds
  the person at the current `perm`; toast "Invite sent to <email>".
  - **Free gate:** at `people.length ≥ 3` → Upgrade overlay, toast "Free plan: up to 3 people per notebook".
  - Free footnote: *"Free plan: up to 3 people per notebook. Pro removes the limit."*
- **Export** row: **PDF** ("Exporting PDF with ink & highlights…"), **Image** ("Exporting this page as PNG…"),
  **.sane (with audio)** ("Exporting .sane — keeps audio sync"). Each toasts.

---

## 11. Search screen

**Regions:** search field → filter chips + "Ask my notes" → optional Ask panel → result count → result list.

- **Search field:** big input, placeholder "Search handwriting, typed text, PDFs and audio". Clear (×) button.
  `query` starts pre-filled with "standing wave" for the demo.
- **Type filters** (`sFilter`): **All / Handwriting / Typed / PDFs / Audio**.
- **Ask my notes** button (accent) → toggles the **Ask panel**: "Answer from your notes" (labelled **PRO PREVIEW**
  on free), a synthesised paragraph about standing waves that cites "your audio at 04:12", plus source chips
  ("<notebook> · p.N"). Sources are the top matching results.
- **Result count** line: "N result(s) · handwriting is searched on-device".
- **Result card:** type icon (ink/PDF/audio/typed), notebook title, "Page N · <type>", for handwriting a rendered
  ink-scribble preview, a snippet with the matched term highlighted (`<mark>`), and the "when" timestamp.
  Click opens the notebook at that page (`openNb`).
- **Result types** (seed `RESULTS`): **Handwriting**, **PDF text**, **Audio · mm:ss**, **Typed text**.
- **No results:** "No matches for "<query>" — try a shorter word, or switch the filter to All."

---

## 12. Settings screen

Left tab nav (`S_TABS`) + right content (single column when narrow). Six tabs:

### Account & plan
- **Current plan** card: name (Free/Pro) + description. Free desc: "5 PDF imports a month · 30-min recordings ·
  3 people per notebook". Pro desc: "Unlimited imports & audio · handwriting to text · 50 GB backup".
  Free → **Upgrade to Pro · from ₹83/mo**; Pro → **Manage subscription** (toast "Opens your app-store subscription").
- **Details** rows: Name (Riya S.), Email (riya.s@student.edu), Student status (**Verified · until Jun 2027**).
- **Replay the welcome tour** → reopens Onboarding.
- **Profiles on this account** — "One sign-in, separate notebooks and looks for each person or context."
  Add/Create/Cancel a profile; list each profile with Current/Switch.
- **Sign out** (destructive) → Login.

### Sync & backup
- **Sync automatically** (`autoSync`, default on) — "Every page, on every device, within seconds".
- **Wi-Fi only** (`wifiOnly`, default off) — "Hold audio and PDF uploads on mobile data".
- **Back up to** segmented (`backup`, default **SS Cloud**): SS Cloud / iCloud / Google Drive.
- **Storage** meter: "1.8 GB of 5 GB" (36%) — "Audio recordings use most of it. Pro raises the limit to 50 GB."

### Handwriting & stylus
- **Palm rejection** (`palm`, on) — "Ignore your resting hand while you write".
- **Pressure sensitivity** (`pressure`, on) — "Thicker ink when you press harder".
- **Draw with finger** (`finger`, off) — "Off means fingers only scroll and pinch".
- **Left-handed mode** (`leftHanded`, off) — "Moves the page rail to the left so your hand never covers it".
- **Toolbar position** segmented (`dock`): Bottom / Top / Left / Right — "Or drag the toolbar by its grip to any edge".
- **Double-tap the pencil** segmented (`dblTap`, default **Eraser**): Eraser / Previous tool / Colors — "Apple Pencil and S Pen".

### Appearance
- **Look:** grid of **17 theme cards** (each previews its own surface, button shape, heading), sets `themeSel`.
  "Seventeen looks, from paper-quiet to neon. Every one restyles the whole app, including your notebooks."
- **Dark mode** toggle — "Every look has a night version; PDFs keep their original colors".
- **Wallpaper** card: **Upload photo** (`onWallFile`, downscaled to a data-URI, saved to `localStorage['sane.wall']`)
  + 6 presets (`WALLS`: **Aurora, Dusk, Ink wash, Sand, Meadow, Graphite**). When set: **Blur** slider (0–40px)
  + **Veil** slider (0–80%), a "Showing <name> — saved on this device" line, and **Remove**. Wallpaper sits behind
  everything blurred; panels become frosted glass. (Presets/uploads persist per-device via localStorage.)

### Notifications
- **Class reminders** (`reminders`, on) — "Open the right notebook 5 minutes before a lecture".
- **Shared notebook activity** (`sharedNotif`, on) — "When someone writes in a notebook you share".
- **Tips** (`tips`, off) — "One short tip a week, never more".

### Privacy & export
- **On-device handwriting recognition** (`onDevice`, on) — "Your ink never leaves the device to become searchable".
- **Export everything** → "PDF and .sane for every notebook — yours to keep, even on Free"
  (`exportAll`, toast "Preparing a ZIP of every notebook (PDF + .sane)…").

---

## 13. Upgrade overlay

Heading **"Everything, for the price of a chai a week"** / *"Student pricing. Free stays free — Pro removes the limits."*

- **Billing toggle** (`billing`): **Yearly · save 44%** (default) or **Monthly**.
  Pro price: **₹999** yearly ("per year · about ₹83 a month") / **₹149** monthly ("per month · cancel anytime").
- **Free card (₹0 forever):** Unlimited notebooks & pages · 5 PDF imports a month · Recordings up to 30 minutes ·
  3 people per notebook · Lined, grid, dotted paper.
- **Pro card** (badge **"MOST STUDENTS"**): Unlimited PDF imports & audio · Handwriting → text, searchable ·
  Audio transcripts · Unlimited people, live cursors · 50 GB cloud backup, every template.
  **Start 14-day free trial** (`startTrial`) → sets `planSel: 'pro'`, closes overlay, toast "Pro trial started — 14 days free".

---

## 14. Free vs Pro — plan differences (summary)

| Capability | Free | Pro |
|---|---|---|
| Notebooks & pages | Unlimited | Unlimited |
| PDF imports | **5 / month** (gate → Upgrade) | Unlimited |
| Audio recording length | **30 minutes** | Unlimited (+ transcripts) |
| People per shared notebook | **3** (gate → Upgrade) | Unlimited + live cursors |
| Handwriting → text ("Convert to text") | ✗ (Pro gate) | ✓ searchable |
| Solve math | ✗ (Pro gate) | ✓ |
| Ask my notes | Pro **preview** only | ✓ |
| Templates | Lined / grid / dotted | Every template |
| Cloud backup | 5 GB | 50 GB |
| Export everything (PDF + .sane) | ✓ (even on Free) | ✓ |
| Price | ₹0 | ₹999/yr (~₹83/mo) or ₹149/mo · 14-day trial |

---

## 15. Navigation map

```
Login ──Google/Apple/Microsoft──▶ Profiles
      └─phone▶ phone step ─send code▶ OTP step ─verify▶ Profiles

Profiles ──pick profile──▶ Library   (first run also opens Onboarding overlay)
         └─"Use a different account"─▶ Login (signOut)

Onboarding ─Continue×3 / Start writing─▶ Library ;  Skip─▶ (close, stay)

Sidebar nav ─▶ Library (All/Recent/Favorites/Shared/Trash) | Settings | Search(⌘K) | Profiles(avatar)
Sidebar Upgrade card ─▶ Upgrade overlay

Library card / recent ─open notebook─▶ Editor
Library "New notebook" ─▶ Templates(new) ─Create─▶ Editor
Library / Editor "Import PDF" ─▶ Import overlay ─pick─▶ Editor (+PDF page)   [free≥5 ⇒ Upgrade]

Editor: back ─▶ Library ; Share ─▶ Share overlay ; Paper&templates ─▶ Templates(page) ;
        Audio ─▶ recorder bar ; Focus ─▶ focus mode ; lasso Convert/Solve (Pro) ─▶ Upgrade if free
Editor Templates(new/create) ─▶ new Editor notebook

Search: result ─▶ Editor(notebook,page) ; Ask my notes ─▶ inline Ask panel

Settings: Upgrade ─▶ Upgrade overlay ; Replay tour ─▶ Onboarding ; Sign out ─▶ Login ;
          profile Switch ─▶ Library ; theme card ─▶ restyles app

Any overlay: click backdrop / × / Cancel ─▶ close (onboarding backdrop does not close it)
Upgrade "Start trial" ─▶ plan=pro, close
```

---

## 16. Copy & microcopy worth preserving

**Value proposition / marketing**
- "Study smarter."
- "Sane Notes: handwriting, PDFs and lecture audio in one notebook — linked, searchable, yours."
- "Every way you take notes, in one notebook." / "Write like it's paper, mark up the lecture's PDF, and record the room — all linked, all searchable."
- "Ink that keeps up" · "Slides and PDFs inside your notes" · "Audio linked to your ink"
- "Tap any word you wrote to hear what was being said."
- "Everything, for the price of a chai a week." / "Student pricing. Free stays free — Pro removes the limits."

**Onboarding / profiles**
- "Who's writing?" / "One account, a private space for each of you."
- "What are you studying?" / "We'll set up subjects and pick sensible paper for each. Change anything later."
- "Pick your look." / "Three looks, one app. This is also where dark mode lives."
- "Welcome back" / "Sign in to open your notebooks on this device."
- "By continuing you agree to the Terms and Privacy Policy. Handwriting recognition runs on your device."

**Editor / audio**
- "Ink is time-linked to audio — later, tap anything you wrote to hear what was said."
- "Recording — everything you write is time-linked" · "Recording saved · mm:ss" · "Ink replays in sync"
- "Circle some ink to select it" · "<file> imported · highlighter ready"
- "Focus mode — just the page" / "Exit focus"
- Freeform: "An endless board instead of pages — it grows in every direction as you write, sketch and pin PDFs. Best for mind maps, problem-solving and group whiteboarding."

**Search**
- Placeholder: "Search handwriting, typed text, PDFs and audio"
- "N results · handwriting is searched on-device"
- "No matches for "<query>" — try a shorter word, or switch the filter to All."

**Settings (preference descriptions)**
- "Sync automatically — Every page, on every device, within seconds"
- "Palm rejection — Ignore your resting hand while you write"
- "Pressure sensitivity — Thicker ink when you press harder"
- "Draw with finger — Off means fingers only scroll and pinch"
- "Left-handed mode — Moves the page rail to the left so your hand never covers it"
- "On-device handwriting recognition — Your ink never leaves the device to become searchable"
- "Class reminders — Open the right notebook 5 minutes before a lecture"
- "Every look has a night version; PDFs keep their original colors"
- Wallpaper: "Sits behind everything, softly blurred; panels turn to frosted glass so your notes stay legible."
- Export: "PDF and .sane for every notebook — yours to keep, even on Free"

**Plan limits**
- "Free plan: 5 PDF imports a month" · "Free plan: up to 3 people per notebook. Pro removes the limit."
- Storage: "Audio recordings use most of it. Pro raises the limit to 50 GB."
- Trial: "Start 14-day free trial" → "Pro trial started — 14 days free"

**Empty states**
- "Trash is empty — deleted notebooks stay here for 30 days." · "Nothing here yet."

---

## 17. Data model reference (seed)

- **Stroke:** `{ id, d (SVG path), color, w, op, kind (pen|hl|shape|erase), pts, bb, t (audio timestamp|null) }`.
- **Page:** `{ kind (paper|pdf|freeform), paper, tint, strokes[], texts[], audio?{dur}, bookmarked?, pdfName? }`.
- **Text box:** `{ id, x, y, text, size, weight, font (b|d), color (ink|mu|hex), italic? }`.
- **Notebook:** `{ id, title, subject, pages, lastPage, updated, paper, audio, pdf, shared, fav, seed, tags[] }`.
- **Profile:** `{ id, name, initials, color, role, note }`.
- **Subjects (6):** Physics `#2f6df6`, Mathematics `#7a3ec9`, Chemistry `#2e8b57`, Design `#e07b1c`, Languages `#d9488a`, Personal `#6b7280`.
- `makeDoc(nb)` builds pages (the Physics notebook has 3 authored pages incl. a standing-waves lecture with a 504-second linked recording, an imported `chapter-14.pdf`, and a grid problem-set page).

---

## Open design questions

1. **Product name inconsistency.** The live template says "Sane" / "Sane Notes", but a screenshot shows
   "**SS Notes**" and the backup option is "**SS Cloud**". Which is canonical? Should backup read "Sane Cloud"?
   *Resolved* in [`../product/prd-03-identity-sync-privacy-settings-billing.md`](../product/prd-03-identity-sync-privacy-settings-billing.md)
   §0.4: canonical name is **Sane Notes**; there is **no first-party cloud** (locked decision 3), so "SS Cloud"
   is removed (not renamed) — backup targets are the user's own iCloud Drive / Google Drive.
2. **Trash is non-functional.** `navItem: 'trash'` always renders empty ("stays here for 30 days"), and no
   notebook has a delete/restore action anywhere. How is a notebook deleted, restored, or purged? Is there a
   30-day auto-purge and a "restore" affordance?
3. **No rename / delete / move for notebooks.** Cards only open. Where do rename, change-subject, duplicate,
   favourite-toggle, move-to-trash, and archive live (long-press? context menu? overflow ⋯)?
4. **Favourite toggle.** Cards show a favourite star but there is no control to set/unset it. Where does the
   user favourite a notebook?
5. **Audio scope.** Recording attaches to a single page (`page.audio.dur`). Can one recording span multiple
   pages of a lecture? How is "tap a word to hear what was said" surfaced when *reviewing* (vs. during playback)?
6. **30-minute free recording limit** is stated but not enforced. What happens at 30:00 — hard stop, prompt to
   upgrade, or silent truncation?
7. **"Ask my notes" on free** is a "PRO PREVIEW" that still shows a full answer. Is the preview limited
   (N free asks, truncated answer, no follow-up), or is it always fully shown as a teaser?
8. **Convert-to-text / Solve-math outputs are canned** (hard-coded standing-wave strings). No indication of the
   real recognition/solve pipeline, error/low-confidence states, or how a user corrects a mis-recognised result.
9. **Shape tool is rectangle-only.** The icon implies triangle/rect/circle. Which shapes ship, and is there
   shape recognition (draw-a-rough-circle → clean circle)?
10. **Image tool routes to PDF import.** Inserting a photo/figure (vs. a PDF) has no distinct flow, sizing,
    cropping, or placement UI. How are inserted images positioned and resized on the page?
11. **Page reorder / delete.** The rail adds pages and navigates, but there's no reorder, delete, or duplicate
    page. Are those planned (drag in the rail? long-press menu)?
12. **Freeform canvas navigation.** A 2400×2400 endless board has no pan/zoom/minimap controls shown. How does
    the user navigate, and does the page rail even apply to freeform notebooks?
13. **Permission vs. role semantics.** Share shows link permission (Can view/comment/edit) and per-person roles.
    Can per-person roles be *changed* after invite (they render as static text)? Can the Owner be transferred?
    Is "Owner" assignable?
14. **Search result → page mapping.** Results carry `pg` but several seed results point to page 0 regardless of
    the human-readable "Page 4". How precisely does a result deep-link to the matched location (scroll-to-ink,
    highlight the match)?
15. **Multi-profile data isolation.** Profiles claim "separate notebooks and looks", but switching a profile only
    changes the avatar/greeting in the mock — the notebook set doesn't change. What is actually partitioned
    per-profile (notebooks, theme, wallpaper, prefs, plan)?
16. **Theme scope per profile vs. account.** Is the chosen look/dark-mode/wallpaper per-profile, per-device, or
    per-account? Wallpaper is explicitly "saved on this device"; the 17 looks are ambiguous.
17. **Backup vs. sync vs. export.** Three overlapping concepts (auto-sync, "back up to" provider, export ZIP).
    What's the source of truth, and what happens to backup choice when offline or when the provider is disconnected?
18. **Offline / error / loading states** are largely undefined. Only a minimal pre-logic Library shell exists.
    What do sync failures, failed PDF imports, failed invites, or a lost connection look like?
19. **Notifications delivery.** "Class reminders 5 min before a lecture" implies a timetable/calendar the app
    doesn't collect anywhere. Where does the schedule come from?
20. **Student verification.** "Verified · until Jun 2027" has no re-verification flow. What happens at expiry,
    and how is verification performed initially?
```
