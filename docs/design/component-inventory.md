# Sane Notes — Component Inventory

> Every component that appears in [`screens-and-flows.md`](./screens-and-flows.md), with its states and
> variants, mapped to a `sane_ui` widget name. `packages/sane_ui` is the design-system package (tokens,
> the 17 looks, and these components) per [`../adr/0002-monorepo-layout.md`](../adr/0002-monorepo-layout.md).
> For the builder of `sane_ui` and every screen that consumes it.

**Widget names are proposed** (the `Sane*` convention) — align them with the package as it is built and
**verify** before treating a name as canonical. Every component:

- **Reads only tokens** ([`tokens.json`](./tokens.json)); no component hard-codes a colour or branches on
  look id (except honouring the feel tokens `glass`, `inset`, `btnSh`, `cardSh`, `bgi`, `tf`, `hst`,
  `hw`, `ls`, `pill`, `r`, `rs`, `bw`). See [`ux-principles.md` §9](./ux-principles.md).
- **Uses the a11y-adjusted tokens** (`aciA11y`, `acIconA11y`, adjusted `mu`) where
  [`accessibility.md` §4.1](./accessibility.md) requires them — never the raw pairing for filled-button
  text or accent icons.
- **Has fixed heights** (chrome 42, tool 44, chip 34, toggle 46×28, icon 40×40, record 38); radius and
  shadow change per look, size does not.
- **Exposes name/role/state/value** to the a11y API in every state (WCAG 4.1.2). Casing (uppercase) is
  visual only, never applied to the accessible name.

Reference sizes/tokens: `componentSizes` in [`tokens.json`](./tokens.json); component rules in
[`design-system.md` §5](./design-system.md).

---

## 1. Foundations & primitives

| Component | `sane_ui` widget | Variants / props | States | Tokens / notes |
|---|---|---|---|---|
| Themed root | `SaneLookScope` | `(lookId, mode)` | — | Provides `SaneLook` ThemeExtension; swaps look/mode by replacing the extension. Every widget reads `Theme.of(context).extension<SaneLook>()`. |
| Text | `SaneText` | role: displayXL/L/M/S, body, bodyStrong, muted, label, mono | — | Sizes fixed per `typeScale`; family = active look `fd`/`fb`. `label` is 11/700 uppercase; headings apply `hw`/`hst`/`hs`/`ls`. |
| Surface / card | `SaneSurface` | elevation: flat / `--sh` / `--cardSh`; glass on/off | hover-lift (3 px on interactive) | Radius `--r`; border `--bw --ln`; bg `--sf`/`--sf2`; applies `--glass` backdrop blur when set; honours wallpaper 84% translucency + 22 px blur. |
| Colour dot / swatch | `SaneSwatch` | palette: INK / HL / custom; size 22 | default / selected (double ring) | Reads shared `INK`/`DARK_INK`/`HL`; exposes colour **name** to AT. |
| Width dot | `SaneWidthDot` | S / M / L (per active pen) | default / selected | Renders ~5/9/13 px for `WIDTHS`; label "S/M/L". |
| Slider | `SaneSlider` | continuous / stepped; with numeric readout | default / focus / disabled | Non-drag alt: numeric entry (2.5.7). Track `--sf2`, fill `--ac`. |
| Progress bar | `SaneProgress` | determinate | — | Exposes value (e.g. "2 of 5 imports"). Used by free-plan card & storage meter. |
| Avatar | `SaneAvatar` | initial / photo; size 40 (result) / tile | default / current (accent ring) | Circle bg `--acs`, text `--ac`; colour paired with name for a11y. |
| Divider | `SaneDivider` | horizontal / labelled ("or") | — | `--ln`. |
| Icon | `SaneIcon` | glyph set | default / disabled (0.35 opacity) | Uses `--ink`/`--mu`/`acIconA11y`. |
| Mascot mark | `SaneSageMark` | tile ground: accent-soft (default) / ink / paper / cyber-night; size ≥ 24 | — | **Fixed-color trademark** — never recolor/stretch/flip/crop. Single asset indirection so the watermarked placeholder can be swapped in one place (see [`README.md` §6](./README.md)). |

---

## 2. Buttons & controls

| Component | `sane_ui` widget | Variants | States | Tokens / notes |
|---|---|---|---|---|
| Button | `SaneButton` | **primary** (h42, bg `--ac`, text `aciA11y`) · **secondary** (h42, border `--ln`, bg `--sf`) · **ghost** (h42, transparent, `--mu`) · **icon** (40×40, bg `--sf2`) | default / hover (`brightness(1.08)` filled; `--sf2` fill outlined/ghost) / pressed (honours `--inset` in Neumorph/Skeuo) / focus (2px accent ring, offset 2) / disabled | Picks up `--btnB`/`--btnSh`/`--btnBgi` per look. Primary uses a11y-adjusted label token. |
| Record button | `SaneRecordButton` | — | idle / recording (pulsing dot) | h38, pill 999, bg `#e0443a`, text `#fff`, 700/13, white dot. The one fixed-colour control. |
| Chip | `SaneChip` | filter / choice; single / multi-select | inactive (`--sf` bg, `--ln` border) / active (`--ink` bg, `--bgs` text) | h34, radius `pill`. Subject filters, study chips, source chips. Toggle role + selected state. |
| Segmented control | `SaneSegmented` | 2–3+ segments | per-segment selected/unselected | Track `--sf2`; active segment `--sf` + `0 1px 3px`; inactive text `--mu`. Radius `--rs`. Page style / permission / page size / billing / backup / double-tap. |
| Toggle | `SaneToggle` | — | on (`--ac`) / off (`--ln`) | 46×28, knob 22 white, travels 18 px in 200 ms. Settings switches. |
| Badge | `SaneBadge` | **PRO** (`--ac`/`aci`, 800, .06em) · **Audio** (`--acs`/`--ac`) · **PDF** (`--sf2`/`--mu`) · **Shared** · **Favourite (star)** | — | Badges are **facts**, never decoration. Text available to AT ("Audio, PDF, Shared"). |
| Search launcher | `SaneSearchLauncher` | — | default / hover | Sidebar button, placeholder "Search notes, PDFs, audio…" + `⌘K` badge → opens Search. |
| Text field | `SaneTextField` | plain / prefixed (+91) / OTP (letter-spaced, max 6) / search (with clear ×) | empty / focus / error (toast, not red) | Label required for a11y. Phone strips non-digits (max 11 incl. space); OTP digits only. |

---

## 3. Shell & navigation

| Component | `sane_ui` widget | Variants | States | Where |
|---|---|---|---|---|
| Sidebar | `SaneSidebar` | wide (248) / narrow rail (68) / hidden (Editor) | collapsed / expanded | `narrow` when width < 900. Hidden in Editor until `sideOpen`. |
| Brand row | `SaneBrandRow` | with plan label | — | Sage mark + "Sane" wordmark + plan label ("Free · Student" / "Pro · Student"). |
| Nav item | `SaneNavItem` | All notebooks / Recent / Favorites / Shared / Trash | default / active (`--acs` bg, 700, `aria-current`) | Sidebar list. |
| Subject row | `SaneSubjectRow` | 6 subjects | default / active (filter) | Colour swatch + name + notebook count. Colour paired with name. Wide only. |
| Free-plan card | `SaneUpsellCard` | free only, wide only | — | "Free plan · N of 5 PDF imports" + `SaneProgress` + "Upgrade · ₹83/mo". |
| Profile switcher | `SaneProfileSwitcher` | — | — | Avatar + name + note → Profiles screen. |
| App header | `SaneScreenHeader` | Library variant (eyebrow date + greeting + actions) | — | "Tuesday, 8 September" eyebrow + "Good afternoon, Riya" (displayL) + Import/New actions. |
| Overlay scaffold | `SaneOverlay` | dimmed backdrop; z per overlay | open / closing | Click-outside to close (except Onboarding). Hosts Templates/Share/Import/Upgrade/Onboarding. |
| Toast | `SaneToast` | — | shown (2.4 s) / hidden | The **only** inverted surface: `--ink` on `--bgs`, pill 999, `--sh`, bottom-center above palette. Mirrors to AT live region. Replaces all red error text. |
| Tab nav (settings) | `SaneTabNav` | 6 tabs; vertical (wide) / horizontal (narrow) | per-tab selected | `S_TABS`. |

---

## 4. Library

| Component | `sane_ui` widget | Variants | States | Notes |
|---|---|---|---|---|
| Recents card | `SaneRecentCard` | horizontal | hover | Mini page thumbnail + title + "subject · page X of Y" + updated + Audio/PDF badges. Shown only when nav=all & filter=All. |
| Notebook card (grid) | `SaneNotebookCard` | grid poster | default / hover (lift 3 px) / favourite on-off | 3:4 cover (real ink thumbnail; PDF notebooks show faux typeset page), 6 px subject spine, favourite star (toggle), badges bottom-left, title (displayS), "N pages · updated". |
| Notebook row (list) | `SaneNotebookRow` | dense | default / hover | Colour spine + title + "subject · N pages" + `#tags` + badges + updated. |
| Filter chip bar | `SaneChipBar` | All + 6 subjects | active chip inverts | Wraps to available width. |
| Grid/List toggle | `SaneViewToggle` | grid / list | selected | `libView`. |
| Empty state | `SaneEmptyState` | trash / generic / favourites / shared | — | Text per [`ux-principles.md` §4.1](./ux-principles.md); at most one Sage on Library first-run. |
| Loading skeleton | `SaneSkeleton` | library shell / card / row / list | — | Pre-logic Library shell model; skeleton over spinner. |

---

## 5. Editor

| Component | `sane_ui` widget | Variants | States | Notes |
|---|---|---|---|---|
| Editor toolbar | `SaneEditorToolbar` | hidden in focus | — | Left: sidebar toggle, back, title block ("<notebook> · page X of Y[ · PDF]"). Right: undo/redo (dim 0.35 when empty), bookmark (filled when set), audio (tinted/red while recording), import, templates, share, pages (wide), focus. |
| Title block | `SaneTitleBlock` | with page/PDF meta | — | Notebook title + "page X of Y". |
| Canvas / page | `SaneCanvas` | paged (800×1040, max 820) / freeform (2400×2400) / PDF-backed | idle / drawing / selecting | Paper fill pattern + tint wash + PDF facsimile + strokes + live stroke + text layer + selection rect. `touch-action:none`; cursor per tool. Hosts the parallel a11y tree ([`accessibility.md` §3](./accessibility.md)). |
| Page thumbnail | `SanePageThumb` | in rail | current (accent ring) / bookmarked (flag) | 132 px column. |
| Add-page button | `SaneAddPageButton` | dashed | — | Clones current paper/tint into a new page. |
| Palette dock | `SaneToolPalette` | dock: bottom / top (row) · left / right (column) | docked / dragging (edge guides light) | Container pad 6, radius 18, bg `--sf`, border `--ln`, `--sh`. Order: tools · colours · widths · page nav. Grip = 6 dots. |
| Tool button | `SaneToolButton` | pen / hl / eraser / lasso / shape / text / image | default / active (`--ac`/`--aci`) | 44×44, radius `--rs`. |
| Colour row | `SaneColorRow` | INK (6) / HL (4) | per-swatch selected | Uses `SaneSwatch`; picking ink on non-pen tool → snaps to pen. |
| Width row | `SaneWidthRow` | 3 (S/M/L) | per-dot selected | Uses `SaneWidthDot`; picking width on hl → snaps to pen. |
| Page nav | `SanePageNav` | in dock | at-start / mid / at-end (clamped) | ‹ prev · "X / N" · next ›. |
| Selection bar | `SaneSelectionBar` | — | shown when lasso selection exists | "N stroke(s) selected" + Convert to text (Pro) + Delete + Solve math (Pro). Pro actions route to Upgrade when free. |
| Text-edit bar | `SaneTextEditBar` | — | editing / idle | Inline input "Type your text…" + Done; discards if blank; snaps to pen. |
| Audio recorder bar | `SaneAudioBar` | idle-no-rec / recording / has-rec | — | Idle: Record + copy. Recording: pulsing dot, live timer (mm:ss, +0.25s/250ms), animated bars, Stop. Has-rec: play/pause, current time, waveform+scrubber (slider), duration, speed (1×→1.5×→2×), "Ink replays in sync". Close ×. |
| Waveform scrubber | `SaneWaveformScrubber` | — | idle / playing (playhead) | Slider over duration; strokes after playhead dim to .12 during playback. |
| Focus-exit pill | `SaneFocusPill` | — | shown in focus mode | Top-right, "Exit focus". |
| Selection rect | `SaneSelectionRect` | dashed | — | Rendered on canvas; lasso bbox. |

---

## 6. Overlays (Templates / Import / Share / Upgrade / Onboarding)

| Component | `sane_ui` widget | Variants | States | Notes |
|---|---|---|---|---|
| Templates overlay | `SaneTemplatesSheet` | mode: new / page | — | Title "New notebook" / "Paper & template". Page style segmented (Pages/Freeform + explainer), template grid, tint swatches, page-size segmented (Auto/A4/Letter), footer (Cancel / Create notebook / Apply to this page). |
| Template tile | `SaneTemplateTile` | Blank/Lined/Grid/Dotted/Cornell/Music/Planner/Flashcards | selected | Cornell/Planner show preview rules. Radio-group role. |
| Tint swatch | `SaneTintSwatch` | White/Cream/Yellow/Gray | selected | From `tintSwatches`; labelled by name. |
| Import overlay | `SaneImportSheet` | — | — | Source rows (Files, Google Drive, Scan, Paste link), recents rows, free-import meter, "Unlimited with Pro". Gate at ≥5 → Upgrade. |
| Source row | `SaneImportSource` | 4 sources | default / hover | Icon + name + subtitle. |
| Recent file row | `SaneRecentFileRow` | — | — | Name + "course · pages · size". |
| Import meter | `SaneImportMeter` | free only | — | "N of 5 imports used this month" + progress. |
| Share overlay | `SaneShareSheet` | — | — | Link toggle + permission segmented + link field + copy, people list, invite field, export rows. |
| Link field | `SaneLinkField` | read-only | — | `sane.app/n/…` + Copy link. |
| Person row | `SanePersonRow` | Owner / Can edit / Can comment / Can view | — | Avatar + name + role. Role announced (not colour-only). |
| Export row | `SaneExportRow` | PDF / Image / .sane | default / exporting | Each toasts on tap. |
| Upgrade overlay | `SaneUpgradeSheet` | — | — | Heading + billing toggle (Yearly save 44% / Monthly) + Free card + Pro card (badge "MOST STUDENTS") + Start 14-day trial. |
| Plan card | `SanePlanCard` | free / pro | current / selectable | Price + feature list; Pro badge. |
| Onboarding overlay | `SaneOnboarding` | 3 steps | step 0/1/2 | Art panel (decorative) + progress dots + step content + sticky footer (Skip / Continue → Start writing). Backdrop does **not** close. |
| Progress dots | `SaneProgressDots` | 3 | active (widens to 22) | "step N of 3" to AT. |
| Feature row | `SaneFeatureRow` | — | — | Icon + title + subtitle (onboarding step 0). |

---

## 7. Login & Profiles

| Component | `sane_ui` widget | Variants | States | Notes |
|---|---|---|---|---|
| Auth method button | `SaneAuthButton` | Google / Apple / Microsoft / mobile (primary) | default / loading | Social buttons secondary-styled; mobile is accent. Accessible names. |
| Marketing panel | `SaneMarketingPanel` | login / onboarding art | — | Sage + "Lecture 12" page card + "Recording 04:12" pill (pulsing) + avatars pill + headline "Study smarter." Decorative → `ExcludeSemantics`. |
| Phone step | `SanePhoneStep` | — | — | +91 prefix + numeric field + Send code + "Other ways to sign in". |
| OTP step | `SaneOtpStep` | — | — | 6-digit letter-spaced field + Verify + Change number + Resend. |
| Fine print | `SaneFinePrint` | — | — | "By continuing you agree… Handwriting recognition runs on your device." |
| Profile tile | `SaneProfileTile` | profile / add (dashed +) | current (accent ring + "Current") / switch | Rounded-square avatar + name + note. Add reveals name field (max 24) → Create. |

---

## 8. Search & Settings

| Component | `sane_ui` widget | Variants | States | Notes |
|---|---|---|---|---|
| Search field | `SaneSearchField` | large | empty / with query (clear ×) | Placeholder "Search handwriting, typed text, PDFs and audio". |
| Ask-my-notes button | `SaneAskButton` | free (PRO PREVIEW) / pro | default / active | Toggles the Ask panel. |
| Ask panel | `SaneAskPanel` | — | — | "Answer from your notes" + synthesised paragraph (cites "your audio at 04:12") + source chips. Region role; "PRO PREVIEW" announced. |
| Result count | `SaneResultCount` | — | — | "N results · handwriting is searched on-device" — live region. |
| Search result | `SaneSearchResult` | handwriting / PDF / audio / typed | default / hover | Grid `40px / text / meta`; leading 40 avatar; matched text `<mark>` (`--acs`/`--ac`/700). Handwriting shows ink-scribble preview. Opens notebook at page. |
| No-results | `SaneEmptyState` (search) | — | — | "No matches for "<query>" — try a shorter word, or switch the filter to All." |
| Setting toggle row | `SaneSettingRow` | toggle / segmented / link / meter | — | Title + description as hint + control. Description read as a11y hint, state as value. |
| Plan card (settings) | `SanePlanSummary` | free / pro | — | Name + description + Upgrade / Manage subscription. |
| Detail row | `SaneDetailRow` | Name / Email / Student status | — | Student status badge "Verified · until Jun 2027". |
| Theme card grid | `SaneThemeGrid` | 17 cards, grouped | per-card selected | Each card previews its own surface/button/heading; radio-group of named looks; sets `themeSel`. |
| Theme card | `SaneThemeCard` | 1 of 17 | selected | Self-styled preview; name label. |
| Dark-mode toggle | `SaneToggle` | — | on / off | "Every look has a night version; PDFs keep their original colors." |
| Wallpaper card | `SaneWallpaperCard` | upload / 6 presets | none / set (blur+veil sliders + Remove) | Presets Aurora/Dusk/Ink wash/Sand/Meadow/Graphite; upload downscaled to 1600 px; "saved on this device". Blur 0–40, Veil 0–80. |
| Storage meter | `SaneProgress` (labelled) | — | — | "1.8 GB of 5 GB (36%)". |
| Sign out | `SaneButton` (destructive) | — | — | Confirms first (destructive). |

---

## 9. Cross-cutting states every component must handle

Per [`ux-principles.md` §4](./ux-principles.md) and [`accessibility.md`](./accessibility.md), each
interactive component MUST define:

| State | Requirement |
|---|---|
| default | Reads tokens; correct in all 17 looks × 2 modes. |
| hover (pointer platforms) | `brightness(1.08)` filled / `--sf2` fill outlined-ghost; cards lift 3 px. |
| pressed | Honour `--inset` (Neumorph/Skeuo) or brightness; commit on up-event (2.5.2). |
| focus (keyboard) | Visible 2 px accent ring, offset 2, ≥ 3:1 (adjusted accent where the raw fails); never obscured (2.4.11). |
| selected / active | Accent (`--ac`/`--aci` or `--acs`), plus a non-colour signal (weight/ring/`aria-current`) — never colour-only (1.4.1). |
| disabled | 0.35 opacity (undo/redo pattern); exposed as disabled to AT; not focusable if inert. |
| loading | Skeleton (preferred) or inline spinner; long ops report progress, not just motion. |
| error | Toast (never inline red); states fact + recovery; announced to AT. |
| empty | Text + a next step (never a dead end). |
| RTL | Mirrors via `EdgeInsetsDirectional`; composes with left-handed mode. |
| reduce-motion | Transitions cross-fade; decorative motion off; functional state stays as static color+label. |

---

## 10. Component → screen coverage map

Confirms every component traces to a screen in [`screens-and-flows.md`](./screens-and-flows.md):

| Screen / surface | Components |
|---|---|
| Sidebar (§2) | `SaneSidebar`, `SaneBrandRow`, `SaneSearchLauncher`, `SaneNavItem`, `SaneSubjectRow`, `SaneUpsellCard`, `SaneProfileSwitcher`, `SaneSageMark` |
| Login (§3) | `SaneAuthButton`, `SaneDivider`, `SanePhoneStep`, `SaneOtpStep`, `SaneFinePrint`, `SaneMarketingPanel`, `SaneTextField` |
| Profiles (§4) | `SaneProfileTile`, `SaneAvatar`, `SaneTextField`, `SaneButton` |
| Onboarding (§5) | `SaneOnboarding`, `SaneProgressDots`, `SaneFeatureRow`, `SaneChip` (study), `SaneThemeCard`, `SaneToggle`, `SaneMarketingPanel` |
| Library (§6) | `SaneScreenHeader`, `SaneRecentCard`, `SaneNotebookCard`, `SaneNotebookRow`, `SaneChipBar`, `SaneViewToggle`, `SaneBadge`, `SaneEmptyState`, `SaneSkeleton` |
| Editor (§7) | `SaneEditorToolbar`, `SaneTitleBlock`, `SaneButton`(icon), `SaneCanvas`, `SanePageThumb`, `SaneAddPageButton`, `SaneToolPalette`, `SaneToolButton`, `SaneColorRow`, `SaneWidthRow`, `SanePageNav`, `SaneSelectionBar`, `SaneTextEditBar`, `SaneAudioBar`, `SaneWaveformScrubber`, `SaneRecordButton`, `SaneFocusPill` |
| Templates (§8) | `SaneTemplatesSheet`, `SaneSegmented`, `SaneTemplateTile`, `SaneTintSwatch`, `SaneButton` |
| Import (§9) | `SaneImportSheet`, `SaneImportSource`, `SaneRecentFileRow`, `SaneImportMeter` |
| Share (§10) | `SaneShareSheet`, `SaneToggle`, `SaneSegmented`, `SaneLinkField`, `SanePersonRow`, `SaneTextField`, `SaneExportRow` |
| Search (§11) | `SaneSearchField`, `SaneChipBar`, `SaneAskButton`, `SaneAskPanel`, `SaneResultCount`, `SaneSearchResult`, `SaneEmptyState` |
| Settings (§12) | `SaneTabNav`, `SanePlanSummary`, `SaneDetailRow`, `SaneSettingRow`, `SaneToggle`, `SaneSegmented`, `SaneThemeGrid`, `SaneThemeCard`, `SaneWallpaperCard`, `SaneProgress`, `SaneButton`(destructive) |
| Upgrade (§13) | `SaneUpgradeSheet`, `SaneSegmented`, `SanePlanCard`, `SaneBadge` |
| Global | `SaneToast`, `SaneOverlay`, `SaneLookScope`, `SaneText`, `SaneSurface`, `SaneIcon`, `SaneSageMark` |

---

## Cross-references

- Behaviour & states per component: [`ux-principles.md`](./ux-principles.md)
- Tokens, sizes, component rules: [`design-system.md` §5](./design-system.md), [`tokens.json`](./tokens.json)
- Where each component appears + copy: [`screens-and-flows.md`](./screens-and-flows.md)
- A11y states, contrast-adjusted tokens, per-screen mapping: [`accessibility.md`](./accessibility.md)
- Ink tools (palette/pens/pickers): [`pen-and-brush-spec.md`](./pen-and-brush-spec.md)
- Package layout for `sane_ui`: [`../adr/0002-monorepo-layout.md`](../adr/0002-monorepo-layout.md)
