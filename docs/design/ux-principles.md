# Sane Notes — UX Principles

> Interaction principles for a pen-first, privacy-first note app across iPad, Android tablets/phones,
> iPhone, and Web (PWA). This doc governs behavior that the per-screen spec
> ([`screens-and-flows.md`](./screens-and-flows.md)) does not pin down. When a screen spec and this
> doc disagree on a concrete control, the screen spec wins; when the screen spec is silent, this doc is
> the decision. Written for a builder with zero context — prefer MUST / SHOULD / MAY.

Grounding sources: `research/procreate.md`, `research/concepts-linea-paper-fresco.md`,
`research/notability.md`, `research/goodnotes-userguide-inventory.md`,
`research/user-pain-points-and-market-gaps.md`, `research/accessibility-i18n-and-inclusive-design.md`,
plus [`design-system.md`](./design-system.md) and [`tokens.json`](./tokens.json).

---

## 0. The three-word brief

**Pen-first. Calm. Never lags.** Every decision below serves one of these. If a proposed interaction
adds latency, adds chrome the writing hand must fight, or adds anxiety during exam week, it is wrong.

The product's promise word is *Sane*: "in your right mind during exam week." The UX equivalent is:
the app is quiet, predictable, and out of the way; the page is the hero; nothing surprises the user;
every limit is stated plainly and never hidden.

---

## 1. Latency is the UX (the non-negotiable)

For a handwriting app, **perceived latency is the single most important UX property** — more than
features, more than looks. Procreate's entire reputation rests on ink that feels "attached to the pen
tip" (`research/procreate.md`); an app that lags on handwriting loses instantly. The performance
budgets are locked (LOCKED DECISION 7) and are treated here as **UX requirements**, not just engineering
targets:

| Surface | Pen-down → pixel | Steady frame rate | Cold start | Notes |
|---|---|---|---|---|
| ProMotion iPad | **≤ 16 ms** (native front-buffer) | 120 fps where display allows, 60 fps floor | < 1.5 s | Metal/CAMetalLayer front-buffer wet-ink path |
| Mid-range Android | **≤ 25 ms** (Ink API low-latency) | 60 fps floor | < 2 s | `androidx.graphics.lowlatency` front buffer |
| Web (Chrome desktop) | **≤ 30 ms** | 60 fps | < 3 s (cached PWA) | `desynchronized` canvas + coalesced/predicted events; Ink API where available |

**UX rules that follow from latency:**

- **Wet ink must be drawn on a low-latency layer** (front buffer / delegated ink trail), then committed
  to the document layer on pen-lift. The user must never see the stroke "catch up." Use
  `coalescedTouches`/`getCoalescedEvents` for fidelity and `predictedTouches`/`getPredictedEvents` to
  draw slightly ahead, discarding predictions on the next real sample. (See
  [`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md) and the platform-capability research.)
- **Never block the writing thread.** OCR, sync, autosave, thumbnailing, and AI run off the ink path.
  A stroke commit MUST NOT wait on a database write, a network call, or recognition.
- **No frame > 16.7 ms during writing.** Jank while writing is a P0 bug, not a polish item. Page turns,
  zoom, and PDF scroll have their own budgets (600-page PDF scroll at 60 fps; open a 1,000-page notebook
  < 1 s).
- **The latency spike (SN-INK) gates the architecture.** If the pure-Flutter canvas cannot meet these
  budgets, the editor surface pivots to native views with the Dart core kept — see
  [`../adr/0001-flutter-single-codebase.md`](../adr/0001-flutter-single-codebase.md). This is a UX
  exit criterion, not just a technical one.
- **Optimistic everything.** Every action commits locally and instantly; sync reconciles in the
  background (local-first, LOCKED DECISION 3). The UI never shows a spinner for something the device can
  do on its own.

---

## 2. The page is the hero; chrome is a guest

Competitors' biggest, most-cited weakness is platform inconsistency and cluttered chrome
(`research/user-pain-points-and-market-gaps.md`). Sane Notes inverts this:

- **The Editor opens with the sidebar closed** and, when the user wants it, a **Focus mode** that hides
  the toolbar, all bars, and the page rail — "just the page," exit via one floating pill
  (`screens-and-flows.md §7.8`). Self-hiding UI is a shared value of the best drawing apps (Paper,
  Linea, Tayasui — `research/concepts-linea-paper-fresco.md`).
- **The tool palette floats and docks.** It is draggable by a 6-dot grip and docks to the nearest edge
  on release (bottom/top = row, left/right = column). It is never a fixed wall of buttons. Default dock
  = bottom.
- **Chrome uses the look's surfaces; the canvas uses the shared ink/paper constants.** The page renders
  pixel-identically regardless of theme (see [`README.md` §2](./README.md)); only surfaces, chips, and
  buttons re-skin. A user switching looks must see their notebook's ink unchanged.
- **One inverted surface only: the toast.** Everything else is calm and low-contrast-of-chrome; the
  toast (ink-on-ground, pill, 2.4 s, bottom-center, above the palette) is the single element that
  inverts, because it must be seen and then leave.

---

## 3. Progressive disclosure

Show the fewest controls that let the user act; reveal depth on demand. This is how the app is both
approachable for "Riya" (a student, not an artist) and deep enough for power users.

**The default pen has exactly three visible controls: Size, Opacity, Smoothing** — each with a slider
plus four quick-preset chips (the Concepts model, `research/concepts-linea-paper-fresco.md`). Everything
else (pressure curve, taper, texture, tilt behavior) lives one layer down in the **Brush Studio**
([`pen-and-brush-spec.md`](./pen-and-brush-spec.md)). A student never has to open Brush Studio to write
beautifully; a power user can.

Disclosure layers, outermost first:

1. **Quick palette / favourites bar** — the 5–6 tools + recent colors + 3 widths a user actually
   reaches for. Always visible in the dock.
2. **Tool secondary options** — tapping the active tool opens its inline options (color slots, width,
   stroke style). Notability's "style tray" and Goodnotes' "Active Tool Menu" pattern.
3. **Brush Studio / full colour picker** — the deep parameter sets, opened deliberately.
4. **Settings** — global defaults (palm rejection, pressure, left-handed, toolbar position,
   double-tap action). Never needed to start; always available to tune.

**Rules:**

- A first-time user MUST be able to write, highlight, and erase without opening any menu beyond the
  dock.
- **Pro features are visible but honest.** "Convert to text" and "Solve math" appear for free users but
  route to the Upgrade overlay when tapped — the capability is discoverable, the limit is explained, the
  gate is never a dead end (`screens-and-flows.md §7.4`).
- **Do not preemptively teach.** No coach-marks storm on first launch. The 3-step onboarding
  (`screens-and-flows.md §5`) sets subjects and a look; everything else is learned by using it, with at
  most one gentle tip surface (Settings → Tips, off by default).

---

## 4. Empty, loading, error, and offline states

The mockup defines these only minimally (`screens-and-flows.md §6`, open question 18). This section is
the **decisive default** for each; it needs maintainer sign-off but is what a builder MUST implement
until overridden.

### 4.1 Empty states (voice: warm, actionable, never a dead end)

| Surface | Copy | Primary action |
|---|---|---|
| Library (no notebooks) | "Nothing here yet." + a one-line "Make your first notebook — write like it's paper." | **New notebook** (Templates overlay) |
| Trash (always empty in design) | "Trash is empty — deleted notebooks stay here for 30 days." | none |
| Search (no query) | Show recent searches + "Search handwriting, typed text, PDFs and audio." | — |
| Search (no results) | "No matches for "<query>" — try a shorter word, or switch the filter to All." | Reset filter to All |
| Favorites / Shared (empty) | "Nothing here yet." + one line explaining what lands here ("Star a notebook to keep it here"). | Go to All notebooks |
| A blank new page | The paper template renders; no placeholder text on the canvas. The page is an invitation, not a form. | — |

Empty states MUST use the mascot sparingly — at most one Sage on the Library first-run empty state; not
on every empty list.

### 4.2 Loading states (prefer content, then skeleton, then spinner — in that order)

- **Local content loads instantly** (local-first). There is essentially no "loading" for the user's own
  notes; render them.
- When a surface genuinely must wait (first sync pull, PDF render, AI answer, export ZIP), show a
  **skeleton** of the eventual layout (the pre-logic Library shell is the model — sidebar widths, empty
  lists), not a centered spinner over a blank screen.
- **Spinners are a last resort** and only inside the element that is waiting (an inline record row, an
  export row), never full-screen.
- **Long operations report progress**, not just motion: "Preparing a ZIP of every notebook (PDF +
  .sane)…", "Exporting PDF with ink & highlights…". Reuse the toast for completion.

### 4.3 Error states (toasts replace red error text everywhere)

The design's explicit rule: **"Toasts replace red error text everywhere."** (`design-system.md §"Screens"`).
Apply it uniformly.

- **Validation errors are toasts, not inline red.** E.g. "Enter a 10-digit mobile number", "Enter the
  6-digit code" (`screens-and-flows.md §3`). Field-level affordances (a shake, a focus ring) MAY
  accompany but the message is a toast.
- **Errors state the fact and the recovery.** "Couldn't import that PDF — check the file and try again."
  Never a code, never blame ("Invalid input").
- **Destructive/irreversible actions confirm first**, in the look's dialog, with the consequence named
  ("Delete Physics II — Waves? It moves to Trash for 30 days."). Sign out is destructive-styled.
- **No dead ends.** Every error offers the next step (retry, change file, upgrade, go back).

### 4.4 Offline states (offline is the default, not an error)

The app is local-first and **works fully offline** — taking notes never requires a network (LOCKED
DECISION 5, guest mode is first-class). Therefore:

- **Offline is silent for note-taking.** No "you are offline" banner while writing. The user owns the
  data on device.
- **Sync shows a quiet, honest status**, not an alarm. A small sync indicator (in Settings and,
  subtly, in the sidebar) reads: synced / syncing / paused (Wi-Fi only on mobile data) / waiting for
  network. Never a red modal.
- **Cloud-only actions degrade gracefully.** If a feature needs the network (real-time collaboration,
  cloud AI opt-in, share-link creation), it shows a plain, temporary "Needs a connection — we'll do it
  when you're back online" and queues where it can.
- **On-device AI keeps working offline.** Handwriting search, recognition, and on-device summaries are
  local by default (LOCKED DECISION 6). Only explicit cloud inference is gated on network, and it always
  shows the data-leaves-device indicator.
- **Conflict resolution is invisible by default.** CRDT merge is automatic; a user only ever sees a
  conflict UI in the rare unmergeable case, and then it is framed as "two versions — keep both?", never
  as data loss.

---

## 5. Microcopy voice

The brand voice (`design-system.md §1`): **plain, warm, specific. Sentences, not labels.** Numbers are
honest; limits are explained; **no exclamation marks; one em dash is fine.**

**Do / don't:**

| Instead of… | Write… |
|---|---|
| "Audio sync enabled" | "Everything you write is time-linked" |
| "Select an item" | "Circle some ink to select it" |
| "Error: invalid input" | "Enter a 10-digit mobile number" |
| "Upgrade now!" | "Pro removes the limit" |
| "No data" | "Nothing here yet" |
| "Choose profile" | "Who's writing?" |
| "Recording started" | "Recording — everything you write is time-linked" |
| "Premium feature" | "Handwriting → text, searchable" |

**Canonical voice samples to preserve** (from the design; reuse verbatim where the same moment recurs):

- "Study smarter." · "Pick up where you left off" · "Who's writing?" · "One account, a private space
  for each of you." · "Circle some ink to select it" · "Ink replays in sync" · "Focus mode — just the
  page" · "Handwriting recognition runs on your device." · "Everything, for the price of a chai a week."
  · "Free stays free — Pro removes the limits."

**Rules:**

- **Second person, present tense, active voice.** "Tap any word you wrote to hear what was being said."
- **Explain limits, never hide them.** "5 imports a month", "up to 3 people per notebook. Pro removes
  the limit." A limit line always names what Pro does, without pressure.
- **Privacy is stated as a feature, plainly.** "Your ink never leaves the device to become searchable."
- **No jargon in the chrome.** "CRDT", "op-log", "envelope encryption" never appear in the UI. They live
  in docs.
- **Localise for meaning, not words.** Copy must survive +40% expansion and RTL mirroring (see §9 and
  [`accessibility.md`](./accessibility.md)); avoid idioms that don't translate ("chai a week" is a
  deliberate India-locale line — mark such lines as locale-specific, not global defaults).

---

## 6. Motion guidelines

Motion clarifies, it never decorates. The app is calm; animation is short, purposeful, and interruptible.

**Defaults:**

- **Durations.** Micro-interactions (toggle knob, chip select, button press) **~150–200 ms**; the toggle
  is specified at exactly **18 px travel in 200 ms** (`design-system.md §"Chips · Segmented · Toggle"`).
  Surface transitions (overlay in, page turn) **~200–300 ms**. Nothing chrome-related exceeds ~350 ms.
- **Easing.** Standard ease-out for entrances, ease-in-out for moves. Material look MAY use its
  spring/emphasized motion; other looks use restrained curves. Never bounce chrome except where a look's
  identity demands it (Claymorphism/Pop MAY use a soft spring on press).
- **The toast** appears bottom-center, above the palette, and auto-dismisses at **2.4 s** with a fade +
  small rise. It never blocks input.
- **Recording indicator** pulses a red dot; the live timer ticks +0.25 s every 250 ms; audio bars
  animate. This is functional motion (shows "live"), permitted during writing.
- **Ink replay** dims strokes recorded after the playhead to opacity .12 as audio plays — motion that
  *is* the feature.
- **Palette dock drag** lights up edge drop-zones while dragging; the nearest edge highlights
  (`dockHint`). Snap on release.

**Rules:**

- **Never animate the ink path itself.** Wet ink is immediate; there is no easing between pen and pixel.
- **Respect Reduce Motion.** When the OS "Reduce Motion" is set (iOS `isReduceMotionEnabled`, Android
  setting, web `prefers-reduced-motion`), replace directional/scale transitions with **cross-fades**,
  disable page-turn and zoom animations, stop decorative pulses (keep the functional recording dot but
  as a steady state), and shorten or remove non-essential motion. This is WCAG 2.3.3 (target) +
  Apple/Play a11y labels — treat as a hard requirement, see [`accessibility.md`](./accessibility.md).
- **Motion is interruptible.** A user can start writing mid-animation; input always takes precedence
  over an in-flight transition.
- **No motion conveys information alone.** Anything a pulse/flash signals must also be a static state
  (color + label), for Reduce Motion and for 1.4.1 Use of Color.

---

## 7. Dark mode and ink inversion rules

Dark mode is a **separate switch**, not a look variant — every look ships a full night palette
(`tokens.json` `looks.<id>.dark`). Rules:

- **Chrome flips by token.** Surfaces, text, borders, accents all read the `dark` map. Nothing chrome
  hard-codes a color, so dark mode is automatic once the mode switch swaps the palette.
- **Ink flips by index, not by re-authoring.** In dark mode the pen palette maps to `DARK_INK[i]` by
  the same index (near-black `#1f1f24` → `#f2efe8`, blue `#2457c5` → `#6f9cff`, etc.). A stroke stores
  its *index/role*, and the renderer picks `INK` or `DARK_INK` at paint time — so a note authored in
  light mode reads correctly in dark mode and vice versa, and switching modes never rewrites the
  document.
- **Highlighters do not invert.** The `HL` palette is shared and renders at ~50% opacity over the page;
  highlights sit *under* ink. They read in both modes because the page ground itself changes.
- **PDFs keep their original colors even in dark mode** (`screens-and-flows.md §0`,
  Settings → Appearance copy: "Every look has a night version; PDFs keep their original colors"). A
  dark-mode reading aid MAY offer a per-user "dim PDF" overlay, but the PDF's own pixels are never
  recolored by the theme.
- **Wallpaper mode composits correctly in both modes.** Surfaces turn 84% translucent with a 22 px
  backdrop blur over the (blurred, tinted) wallpaper; the veil/blur sliders let the user keep ink
  legible. Ensure text contrast still passes against the frosted surface (see
  [`accessibility.md`](./accessibility.md)).
- **The page paper (`pp`) is a token**, so paper darkens in dark mode (e.g. Paper `#fcf9f1` →
  `#2b251d`). The paper-line (`pl`) follows. Do not force a white page in dark mode.
- **Do not auto-switch mode based on time of day** unless the user opts in; the mode follows the OS by
  default (system) or the user's explicit choice.

---

## 8. Adaptive layouts (tablet / phone / web / desktop-window)

One Flutter codebase, adaptive layouts (LOCKED DECISION 1–2). The layout adapts to **window size class**,
not device identity — a phone, a small window on a desktop, and a foldable-folded state all resolve to
the same compact layout. Use the design's own breakpoint plus platform size classes:

**Design breakpoint (from the mockup):** `narrow` when width **< 900 px** → sidebar collapses to a
**68 px icon rail** (vs 248 px wide), and desktop-only affordances (page rail, subjects list) hide.

**Recommended size-class map** (align to Android window size classes / iPad windowing; verify exact
breakpoints per platform):

| Class | Width | Layout |
|---|---|---|
| Compact (phone, small window) | < 600 dp | Single pane. Sidebar becomes a bottom sheet / drawer or the 68 px rail. Library = 1–2 column grid or list. Editor is full-bleed; page rail hidden; palette docks bottom. |
| Medium (small tablet, foldable open, half-screen) | 600–840 dp | Sidebar as 68 px rail or 248 px if room; Library 2–3 column grid; Editor shows page rail on wide-enough sub-range. |
| Expanded (tablet landscape, desktop) | 840–1200 dp | Full 248 px sidebar; Library 3–4 columns; Editor shows page rail + subjects; the mockup's reference frame is **1180×820 (iPad landscape)**. |
| Large / Extra-large (desktop, external display) | ≥ 1200 dp | Multi-pane; consider list/detail; support resizable/overlapping windows (iPadOS 26 windowing, ChromeOS desktop windowing) and **a new window per notebook** where the platform supports it. |

**Rules:**

- **The Editor canvas is fixed geometry, chrome is fluid.** A page is **800×1040 units**, rendered at
  **max 820 px wide** with a drop shadow and 4 px radius, centered; a **Freeform canvas is 2400×2400**,
  no max width, no shadow, scrolls both ways. These do not change with window size — only the surrounding
  chrome reflows.
- **Every layout must reflow at 320 CSS px** with no 2-D scroll and no loss of function (WCAG 1.4.10).
  Tool palettes and dialogs reflow/stack when narrow.
- **The palette dock respects handedness and size.** On compact widths it defaults to a bottom row; the
  user can still drag-dock. Left-handed mode moves the page rail (and the palm-rejection zone) to the
  left (`prefs.leftHanded`, `screens-and-flows.md §7.7`).
- **Touch targets scale to the platform minimum, not the web minimum.** ≥ 44×44 pt (iPadOS), ≥ 48 dp
  (Android), ≥ 24×24 CSS px floor (web) — design to the largest. Tool buttons are 44×44 (stylus target);
  chrome buttons 42; chips 34. See [`accessibility.md`](./accessibility.md).
- **Input adapts, not just size.** On desktop/web, support keyboard shortcuts, right-click context
  menus, hover states, and mouse; on tablets, stylus + touch; on phones, touch-first with stylus if
  present. The same action must be reachable by every input the platform offers
  ([`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md)).
- **Web text input is native DOM, not painted.** Typed text, Scribble, IME, and selection use real text
  fields overlaid on the canvas — Flutter Web's painted text is the weak spot; verify IME/Scribble/a11y
  on web explicitly (`research/web-stylus-and-pwa-capabilities.md`).

---

## 9. The 17 looks and component behavior

A single component set is authored in the **Paper** look and restyled by every look's token sheet
(`design-system.md §"Component rules"`). The behavior of a component MUST derive entirely from tokens —
**no component may branch on look id** except for the handful of look-defined *effects* below, which
are themselves driven by feel tokens (`glass`, `btnSh`, `cardSh`, `inset`, `bgi`, `tf`, `hst`, `hw`,
`ls`, `pill`, `r`, `rs`, `bw`).

### 9.1 What changes per look (all via tokens)

- **Radius.** `--r` (cards) and `--rs` (controls) range from **0 px** (Brutalism, Editorial) to
  **26 px** (Claymorphism). A card is the same widget; its corner radius is a token.
- **Border.** `--bw` is 0 px (Neumorphism, Claymorphism), 1 px (most), or 2 px (Brutalism,
  Neo-Brutalism). Buttons pick up `--btnB` (e.g. `2px solid var(--ln)` in Brutalism/Retro).
- **Elevation.** `--cardSh` / `--btnSh` / `--sh` range from `none` (Flat, Brutalism, Editorial) to
  multi-layer soft shadows (Minimalism, Bento), hard offset shadows (Neo-Brutalism `4px 4px 0`, Retro
  `3px 3px 0`), neon glows (Cyberpunk `0 0 14px …`), and neumorphic dual light/dark shadows.
- **Pressed state.** Neumorphism and Skeuomorphism define an **`inset`** shadow — pressing a control
  presses it *into* the surface. Other looks use `brightness(1.08)` (filled) / `--sf2` fill
  (outlined/ghost). A component MUST honor `inset` when present.
- **Glass.** Glassmorphism (`blur(18px) saturate(1.3)`) and Y2K (`blur(12px)`) set `--glass`; surfaces
  are translucent (`sf`/`sf2` are rgba). A component with a `--glass` value applies a backdrop blur;
  where `glass == none`, no filter. On Flutter, map to `BackdropFilter`; `saturate` needs a
  `ColorFilter.matrix` approximation.
- **Casing & headings.** `--tf` (`uppercase` in Brutalism, Retro, Cyberpunk, Editorial), `--ls`
  (letter-spacing), `--hw` (heading weight 500→900), `--hst` (Maximalism headings are **italic**),
  `--hs` (heading line-scale). Headings restyle; body text does not uppercase.
- **Ground.** `--bgi` (+ `--bgsz`) paints the app ground: Paper dotted grain (7px), Skeuomorphism 45°
  stitch, Neo-Brutalism dotted (22px), Retro horizontal rules, Cyberpunk neon grid (32px),
  Maximalism/Glassmorphism/Y2K gradient washes. All others `none`.
- **Fonts.** `--fd` (display) / `--fb` (body) swap per look (12 registered families). Type *sizes* are
  fixed per role; only the family changes.
- **Pill radius.** `--pill` sets chip/toggle/record-button rounding (2 px Cyberpunk → 999 px most).

### 9.2 Invariants that hold across all 17 looks (MUST)

- **Component heights are fixed:** chrome buttons 42, tool buttons 44, chips 34, toggle 46×28, icon
  button 40×40, record button 38. Radius and shadow change; size does not.
- **Semantics never change with look.** A toggle is a toggle, a button is a button, to every a11y API,
  in every look. Casing/uppercase is visual (`text-transform`), never applied to the accessible name.
- **Badges are facts, not decoration.** PRO / Audio / PDF / Shared badges mean something and render from
  tokens (`--ac`/`--aci`, `--acs`/`--ac`, `--sf2`/`--mu`). No look adds decorative badges.
- **The active tool reads `--ac`/`--aci`.** Selection state is the accent, in every look.
- **Contrast must hold in every look and mode.** Some looks' *button text* (`aci` on `ac`) and
  *accent-as-icon* (`ac` on `sf`) fall below WCAG thresholds in **light** mode (Pop, Glass, Clay, Flat,
  Retro, Cyberpunk for button text; Neo-Brutalism, Cyberpunk for accent icons) — these looks require
  adjusted tokens or a darkened accent for text/icon use. The exact failing pairs and the fix are
  computed in [`accessibility.md` §"Contrast across the 17 looks"](./accessibility.md). A component MUST
  use the accessibility-adjusted token where one is defined, not the raw `ac`.
- **Wallpaper mode overrides surfaces** (84% translucent + 22 px blur) independently of look; components
  must remain legible on the frosted surface.

### 9.3 Look-family guidance for new components

When a new component is added, test it in one look per family and it will hold across the family:
**Warm** (Paper) — serif headings, soft grain, gentle shadow; **Clean** (Minimalism) — flat, one
accent, hairline borders; **Bold** (Pop) — big radius, saturated accent, playful shadow; **Soft**
(Neumorphism) — no border, dual shadow, inset-on-press; **Raw** (Brutalism) — 0 radius, 2 px black
border, uppercase, no shadow. If it reads correctly in all five, it reads in all seventeen.

---

## 10. Cross-cutting principles (quick reference)

- **Guest mode is first-class.** Identity is only for profile, sharing/collab, and entitlements — never
  required to take notes. The whole app works signed-out. (LOCKED DECISION 5)
- **Privacy is visible.** On-device by default; any cloud inference is explicit, per-request opt-in,
  with a data-leaves-device indicator. (LOCKED DECISION 6, 8)
- **Undo is sacred.** Every destructive editor action is undoable (60-snapshot stack per page). Erase,
  convert, delete, template change — all reversible. Where an action can't be undone (permanent trash
  purge, sign out), confirm first.
- **Consistency across five surfaces beats platform-native flourishes.** The competitors' biggest gap is
  platform inconsistency; Sane Notes' identity is that a notebook looks and behaves the same everywhere.
  Adopt platform input conventions (gestures, shortcuts) but keep the visual system and behavior
  identical.
- **Every limit has a door.** A gate (5 imports, 3 people, Pro convert) always routes to a clear
  Upgrade explanation, never to a wall.

---

## Cross-references

- Per-screen behavior and copy: [`screens-and-flows.md`](./screens-and-flows.md)
- Tokens and look sheets: [`design-system.md`](./design-system.md), [`tokens.json`](./tokens.json)
- Ink/tools detail: [`pen-and-brush-spec.md`](./pen-and-brush-spec.md)
- Input map & precedence: [`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md)
- A11y requirements & computed contrast: [`accessibility.md`](./accessibility.md)
- Component states/variants → widget names: [`component-inventory.md`](./component-inventory.md)
- Stack & latency exit criterion: [`../adr/0001-flutter-single-codebase.md`](../adr/0001-flutter-single-codebase.md)
