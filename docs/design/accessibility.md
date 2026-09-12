# Sane Notes — Accessibility

> WCAG 2.2 AA mapping for every screen, screen-reader behaviour for the ink canvas, keyboard navigation
> for web, **computed contrast across all 17 looks** (which looks need adjusted tokens, from
> `tokens.json`), reduce-motion, left-handed, and motor-assist requirements. Accessibility is a **build
> gate**, not a phase — a surface is not "done" until it passes the criteria here. For every builder.

Baseline conformance: **WCAG 2.2 AA on every platform** (iPadOS, Android, Web), plus EN 301 549 /
Section 508 / ADA / EU EAA where applicable, and the Apple App Store **Accessibility Nutrition Labels**
we intend to declare truthfully (LOCKED DECISION 10). Grounding:
`research/accessibility-i18n-and-inclusive-design.md` (the primary source — read in full),
`research/procreate.md §10` (Color Cards, single-touch companion, motion filtering),
[`design-system.md`](./design-system.md) + [`tokens.json`](./tokens.json) (tokens),
[`screens-and-flows.md`](./screens-and-flows.md) (screens), and
[`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md) (non-gesture alternatives).

The ink canvas is the hard part: a bitmap/vector drawing surface is **opaque to assistive technology**.
We must build a **parallel accessible model** on top of the canvas on every platform (§3). "Just use
native widgets" does not apply to the drawing area.

---

## 1. Standards matrix & platform mechanisms

| Concern | iPadOS | Android | Web |
|---|---|---|---|
| Screen reader | VoiceOver | TalkBack | NVDA/JAWS/VoiceOver/Narrator via ARIA |
| Switch input | Switch Control | Switch Access | keyboard/switch emulation |
| Voice input | Voice Control | Voice Access | OS voice + keyboard |
| Custom-canvas semantics | `UIAccessibilityElement` tree + custom actions + custom rotor | `ExploreByTouchHelper` virtual view hierarchy + custom actions | parallel accessible DOM + ARIA + `<canvas>` fallback |
| Cross-platform layer | Flutter `Semantics` / `CustomPaint.semanticsBuilder` | same | same → ARIA |
| Min target size | ≥ 44×44 pt | ≥ 48 dp | ≥ 24×24 CSS px (design to the larger) |
| Text contrast | 4.5:1 body / 3:1 large & UI | same | same |

Flutter's `Semantics` is the shared mechanism that projects onto VoiceOver, TalkBack, and web ARIA.
Use `CustomPaint.semanticsBuilder` → `CustomPainterSemantics` per canvas object, `MergeSemantics` for
icon+label clusters, `ExcludeSemantics`/`BlockSemantics` for decorative ink, and
`SemanticsService.announce(...)` for transient events.

---

## 2. WCAG 2.2 AA — the criteria an ink app is most likely to fail

Exact, testable thresholds. Full list in `research/accessibility-i18n-and-inclusive-design.md §2`.

| SC | Level | Requirement for Sane Notes |
|---|---|---|
| 1.1.1 Non-text Content | A | Every note/page/sticker/image/shape exposes a text alternative (title + OCR transcript + alt). Decorative strokes marked so AT skips them. |
| 1.3.1 Info & Relationships | A | Layers, groups, ink headings, checklist state programmatically determinable. |
| 1.4.1 Use of Color | A | Colour is never the only signal. Ink colour that means something (red = correction) pairs with a shape/label. Subject colours pair with names. |
| 1.4.3 Contrast (Min) | AA | Text ≥ 4.5:1; large text (≥18pt / 14pt bold) ≥ 3:1. Applies to all chrome & rendered text. (§4 computes this per look.) |
| 1.4.4 Resize Text | AA | Text scales to 200% without loss (Dynamic Type / sp / browser zoom). |
| 1.4.10 Reflow | AA | No 2-D scroll / loss at 320 CSS px width. Palettes & dialogs reflow. |
| 1.4.11 Non-text Contrast | AA | UI components, icons, tool-state indicators, focus rings ≥ 3:1 vs adjacent. |
| 1.4.12 Text Spacing | AA | No clipping at line-height 1.5×, para 2×, letter 0.12×, word 0.16×. |
| 2.1.1 / 2.1.2 Keyboard / No Trap | A | Tools, colour, page nav, undo/redo, insert, export all keyboard-operable; no traps. (Freehand path input is exempt as "essential"; *choosing* tools and *placing/editing* objects must have keyboard paths.) |
| 2.3.1 Three Flashes | A | Nothing flashes > 3×/s (recording dot pulses well under). |
| 2.3.3 Animation from Interactions | AAA (target) | All interaction motion disables under Reduce Motion (§6). Treat as required. |
| 2.4.7 / 2.4.11 Focus Visible / Not Obscured | AA | Visible focus on every control; focus never fully hidden by the sticky toolbar/floating palette/palm overlay. |
| 2.4.13 Focus Appearance | AAA (target) | Focus indicator ≥ 2 px, ≥ 3:1 focused/unfocused. Our focus ring is 2px accent, offset 2 — verify ≥ 3:1 per look. |
| 2.5.1 Pointer Gestures | A | Pinch-zoom/two-finger-undo/lasso/dwell have single-pointer alternatives. (See gestures doc.) |
| 2.5.2 Pointer Cancellation | A | Strokes commit on up-event; cancellable/undoable. |
| 2.5.7 Dragging Movements | AA | Move/resize/reorder/slider/dock-drag have non-drag alternatives (tap-select + nudge/numeric). |
| 2.5.8 Target Size (Min) | AA | ≥ 24×24 CSS px (web); ≥ 44 pt (iPadOS); ≥ 48 dp (Android). Our tool buttons 44, chrome 42, chips 34 — verify chips meet the platform floor with spacing. |
| 4.1.2 Name, Role, Value | A | Every custom-drawn control exposes name/role/state/value to the platform a11y API. |

---

## 3. Screen-reader behaviour for canvas content (the parallel model)

The canvas is opaque to AT, so each drawn object becomes an addressable a11y node in a **parallel tree**
kept in sync with the document model.

### 3.1 Per-platform

| Platform | Build |
|---|---|
| **iPadOS** | A tree of `UIAccessibilityElement`s — one per note object / stroke group / shape / image — each with `accessibilityLabel`, `accessibilityValue`, `accessibilityHint`, `accessibilityTraits`, `accessibilityFrameInContainerSpace`. Attach `UIAccessibilityCustomAction`s (delete, duplicate, change colour, bring-to-front, **convert-to-text**). Add a **custom rotor** (`UIAccessibilityCustomRotor`) to jump between object types ("headings", "images", "handwriting blocks"). Post layout/screen-changed/announcement notifications on canvas change. PencilKit does not describe strokes — this tree is required. |
| **Android** | `ExploreByTouchHelper` virtual view hierarchy → one `AccessibilityNodeInfo` per object with `contentDescription`, bounds, focusable, role/state, and custom `AccessibilityAction`s. Send `AccessibilityEvent`s on change. Compose: `Modifier.semantics { contentDescription; stateDescription; role; customActions }`, `mergeDescendants` for clusters, `contentDescription = null` for decorative ink. |
| **Web** | A parallel accessible DOM (real focusable button/list-item per object, positioned off-canvas or overlaid) synced to the model, with `role`/`aria-label`/`aria-describedby`. Provide `<canvas>` fallback content (a text description). Do **not** rely on deprecated canvas hit-regions. |
| **Flutter (all)** | `CustomPaint.semanticsBuilder` emits a `CustomPainterSemantics` per object (rect + label + actions); decorative ink wrapped in `ExcludeSemantics`; transient events via `SemanticsService.announce`. This is the single implementation projecting to all three. **Test Flutter web semantics explicitly** — it is historically the weakest surface. |

### 3.2 What each object announces

- **A handwriting block** → its **OCR transcript** ("Standing wave: two waves, same frequency…") as
  the label, position as the frame, and a `convert-to-text` custom action. OCR runs on-device (ML Kit
  Digital Ink primary, 300+ languages; Vision OCR fallback on iOS for rasterised pages) and is
  **user-editable** so a mis-recognition can be corrected. (WCAG 1.1.1 + §11 languages.)
- **A shape** → its recognised name ("rectangle", "arrow") + colour name.
- **An image** → its alt text (user-provided or AI-described), never "image".
- **A page** → title + "page X of Y" + a summarised OCR description; the whole page has an
  `aria-describedby`/`accessibilityValue` transcript.
- **Audio anchor** → "audio at 04:12" + a play action; ink linked to audio announces the link.
- **Decorative strokes** (a doodle, a divider) → excluded from AT (`ExcludeSemantics` / `null`
  contentDescription).

### 3.3 Transient announcements

Announce (VoiceOver/TalkBack/live region) on: "Saved", "Converted to text", "Deleted N strokes",
"Recording — everything you write is time-linked", "Recording saved · mm:ss", "Page 3 of 12",
"Link copied", "Pro trial started — 14 days free". These mirror the toasts (which are the visual
equivalent — `screens-and-flows.md §16`).

---

## 4. Contrast across the 17 looks (computed from tokens.json)

Contrast ratios computed from [`tokens.json`](./tokens.json) (translucent tokens composited over their
background; sRGB WCAG formula). Key text/UI pairs, per look × mode:

- **`ink/sf`** = body text on surface (needs **≥ 4.5**).
- **`mu/sf`** = muted meta text (12.5 px) on surface (needs **≥ 4.5**).
- **`aci/ac`** = button label on accent fill (14 px / 600 — needs **≥ 4.5**; not "large").
- **`ac/sf`** = accent used as an icon / active tool / link on surface (UI graphic — needs **≥ 3.0**;
  if used as *link text*, needs 4.5).

| Look | mode | ink/sf | mu/sf | aci/ac | ac/sf | Verdict |
|---|---|---|---|---|---|---|
| paper | light | 14.4 | 5.4 | 4.95 | 4.6 | pass |
| paper | dark | 13.2 | 6.4 | 6.3 | 5.6 | pass |
| minimal | light | 17.9 | 5.8 | 5.2 | 5.2 | pass |
| minimal | dark | 14.7 | 6.6 | 6.2 | 5.6 | pass |
| **pop** | **light** | 17.6 | 6.3 | **3.18** | **3.18** | ⚠ button text < 4.5 |
| pop | dark | 15.4 | 7.3 | 6.9 | 6.4 | pass |
| maximal | light | 15.7 | 5.6 | 5.9 | 5.7 | pass |
| maximal | dark | 15.0 | 6.7 | 6.4 | 6.0 | pass |
| **glass** | **light** | 15.9 | 5.5 | **4.17** | 3.85 | ⚠ button text < 4.5 |
| glass | dark | 14.0 | 6.3 | 7.3 | 6.4 | pass |
| **neumorph** | **light** | 10.7 | **3.95** | 4.81 | 3.96 | ⚠ muted text < 4.5 |
| neumorph | dark | 12.8 | 5.8 | 5.9 | 5.6 | pass |
| **clay** | **light** | 14.7 | 5.2 | **4.35** | 4.35 | ⚠ button text < 4.5 |
| clay | dark | 14.0 | 6.3 | 6.7 | 6.0 | pass |
| brutal | light | 21.0 | 9.7 | 8.6 | 8.6 | pass |
| brutal | dark | 18.1 | 8.1 | 5.2 | 5.2 | pass |
| **neobrutal** | **light** | 18.9 | 8.9 | 6.8 | **2.78** | ⚠ accent icon < 3.0 |
| neobrutal | dark | 13.5 | 6.1 | 7.8 | 6.5 | pass |
| skeuo | light | 11.3 | 4.53 | 7.1 | 6.1 | pass (mu tight) |
| skeuo | dark | 9.0 | 5.0 | 7.0 | 4.4 | pass |
| **flat** | **light** | 14.8 | 5.2 | **3.28** | 3.28 | ⚠ button text < 4.5 |
| flat | dark | 14.1 | 6.3 | 8.7 | 8.0 | pass |
| material | light | 17.1 | 9.3 | 6.4 | 6.4 | pass |
| material | dark | 13.2 | 10.0 | 7.7 | 10.0 | pass |
| bento | light | 18.9 | 5.3 | 18.9 | 18.9 | pass |
| bento | dark | 15.1 | 6.8 | 16.9 | 15.7 | pass |
| y2k | light | 15.4 | 5.5 | 5.8 | 5.6 | pass |
| y2k | dark | 14.0 | 6.3 | 7.2 | 6.3 | pass |
| retro | light | 12.9 | 5.4 | **4.04** | 3.67 | ⚠ button text < 4.5 |
| retro | dark | 12.8 | 6.4 | 6.7 | 6.0 | pass |
| **cyber** | **light** | 17.7 | 5.9 | **2.54** | **2.54** | ⚠ button text < 4.5 **and** accent icon < 3.0 |
| cyber | dark | 16.6 | 10.1 | 13.6 | 12.6 | pass |
| editorial | light | 18.9 | 6.7 | 18.9 | 18.9 | pass |
| editorial | dark | 16.3 | 7.3 | 16.9 | 16.9 | pass |

### 4.1 Findings & required fixes (MUST)

Body text (`ink/sf`) passes comfortably in **every** look and mode (min 9.0). The failures are narrow
and concentrated in **light mode**:

1. **Button-label contrast (`aci` on `ac`) below 4.5** in **Pop (3.18), Glass (4.17), Clay (4.35),
   Flat (3.28), Retro (4.04), Cyberpunk (2.54)** — light mode. **Fix:** for button labels these looks
   MUST use an **accessibility-adjusted `aci`** (darken/lighten the label until ≥ 4.5 against `ac`) or
   darken `ac` for filled buttons. Add a generated token `aciA11y` per (look, mode) and have
   `SaneButton` primary use it. Do **not** ship the raw pairing for filled-button text.
2. **Accent-as-icon/active-tool (`ac` on `sf`) below 3.0** in **Neo-Brutalism (2.78) and Cyberpunk
   (2.54)** — light mode. **Fix:** these looks MUST use an **adjusted accent (`acIconA11y`)** for icons,
   the active-tool tint, and any accent-coloured UI graphic (borders excepted — they read against a
   thick outline). Cyberpunk's neon cyan on white is the worst offender.
3. **Muted text (`mu` on `sf`) below 4.5** in **Neumorphism (3.95)** and **tight in Skeuomorphism light
   (4.53)**. Muted text is 12.5 px meta ("page 4 of 12 · 12 min ago") — small, needs 4.5. **Fix:**
   darken Neumorphism light `mu` to ≥ 4.5; keep Skeuo above 4.5 (it is, barely — do not regress).
4. **Accent as secondary/decorative (`ac2`)** falls well below 4.5 in many light looks — this is
   expected because `ac2` is a **decorative/subject colour** (spine, chip accent), **not text**. **Rule:
   never render text or an essential icon in `ac2`.** Where `ac2` labels something, pair it with a name.

### 4.2 Contrast rules (MUST)

- **Components read the a11y-adjusted token, not the raw palette,** wherever §4.1 defines one
  (`aciA11y`, `acIconA11y`, adjusted `mu`). The token codegen (`tokens.json → theme`) MUST emit these
  adjusted values; add them as a derived layer so the source palette stays the designer's intent and the
  build guarantees the AA floor. **CI MUST fail if any (look, mode) button-label or muted-text pair drops
  below 4.5, or any accent-icon pair below 3.0.**
- **Focus rings** (2 px accent, offset 2) MUST be ≥ 3:1 vs both the focused element and its surround —
  verify per look; where the accent is low-contrast (Cyberpunk, Neo-Brutalism light) the focus ring uses
  the adjusted accent or `--ink`.
- **Wallpaper mode:** surfaces become 84% translucent (22 px blur). Re-verify text contrast against the
  frosted surface over each wallpaper; if any pairing drops below 4.5, increase surface opacity behind
  text or add a scrim. The veil slider must not let the user push contrast below AA for chrome text
  (clamp the effective contrast).
- **Increase-Contrast / high-contrast OS settings:** provide a high-contrast variant when
  `UIAccessibility` increase-contrast / Android high-contrast is on — bump borders to `--ink`, remove
  translucency, raise `mu` toward `ink`.
- **The ink canvas is exempt from chrome contrast rules** (a user's own drawing is content), but the
  **default paper/line contrast** (`pl` on `pp`) and **default ink on paper** must be legible; ship the
  colour-blind guidance in §5.

---

## 5. Colour, colour-blindness, and "not by colour alone"

- **Default ink palette risk (recorded, decision kept).** `INK`/`HL` are the product's signature shared
  constants and are **not** Okabe–Ito colour-blind-optimised. Per LOCKED-DECISION rules we keep them and
  mitigate: (a) **every INK/HL swatch carries a colour name** in the picker (helps VoiceOver +
  colour-blind users, satisfies 1.4.1); (b) ship an **optional Okabe–Ito "colour-blind-safe" ink
  palette** the user can switch to (`#000000, #E69F00, #56B4E9, #009E73, #F0E442, #0072B2, #D55E00,
  #CC79A7` — **verify exact hex** against jfly source); (c) provide a **colour-blind preview** mode.
- **Never encode meaning in colour alone** (1.4.1). Subject colours (Physics blue, Maths purple, …)
  always pair with the subject **name**. A "red = correction" convention pairs with a label/shape.
  Active states pair the accent with weight/underline/fill, not colour only.
- **Avoid red-green pairings** for adjacent meaningful colours (use magenta + green).

---

## 6. Reduce Motion

Honour the OS setting on every platform: iOS `UIAccessibility.isReduceMotionEnabled`, Android's remove-
animations setting, web `prefers-reduced-motion`. When set:

- Replace directional/scale transitions (overlay slide, page turn, zoom) with **cross-fades**.
- **Disable** decorative motion: brush fly-ins, the audio-bar bar animation's flourish, dock edge-glow
  pulse. Keep **functional** state changes as static (the recording indicator becomes a steady red dot +
  "Recording" label, not a pulse — because motion must never be the only signal, 1.4.1/2.3.3).
- **Ink replay** (dimming strokes after the playhead) is functional but MAY be reduced to an instant
  reveal under Reduce Motion.
- Shorten remaining essential motion; never exceed the interaction thresholds.
- This lets us **truthfully declare "Reduced Motion"** in the Apple Accessibility Nutrition Label.

---

## 7. Dynamic Type / text scaling / spacing

- **iPadOS:** support Dynamic Type via `UIFontMetrics` (Apple guidance ≥ ~140% on iPad); default body
  17pt, 11pt minimum. **Android:** size all text in **sp**; layouts survive large scale. **Web:** text
  scales to 200% and reflows at 320 px.
- **Text-spacing overrides** (1.4.12) cause no clipping: line-height 1.5×, para 2×, letter 0.12×, word
  0.16×.
- The **fixed type scale** (`tokens.json typeScale`) is in px; the client MUST apply the OS scale factor
  on top (`MediaQuery.textScaler`). Chrome layouts must not break; use min/preferred sizing, not fixed
  heights that clip scaled text.
- **Reading font picker** (for typed text + OCR transcripts, **not** raw ink): include **OpenDyslexic**
  and **Lexend**, with user-adjustable size/spacing meeting 1.4.12.
- **Reading mode** (typed text + OCR transcript) offers Read Aloud (word highlight, speed, voice),
  spacing/theme/column controls, line focus, syllables, parts-of-speech, picture dictionary, translation
  — modelled on Immersive Reader (`research/accessibility-i18n-and-inclusive-design.md §7`).

---

## 8. Keyboard navigation (web + external keyboards)

Full keyboard operability is required (2.1.1) and is the backbone of Switch/Voice access.

- **Tab order** follows visual order; **visible focus** on every control (2.4.7); **no traps** (2.1.2);
  focus never fully obscured by the sticky toolbar/floating palette (2.4.11).
- **Tools, colour, page nav, undo/redo, insert, export** all have keyboard paths (see
  [`gestures-and-shortcuts.md` §6](./gestures-and-shortcuts.md) for the full map).
- **Canvas object navigation:** the parallel accessible DOM (§3) makes each object focusable; arrow keys
  **nudge** a selected object (the non-drag alternative, 2.5.7); Enter/Space activates; Escape cancels an
  in-progress action (2.5.2). A roving-tabindex or a "canvas objects" landmark lets a keyboard user step
  through strokes/shapes/images without a mouse.
- **Freehand drawing itself is exempt** (an "essential" analog gesture) — but *choosing* tools and
  *placing/editing* objects must be keyboard-operable.
- **Skip links / landmarks** on web (skip to canvas, skip to sidebar); ARIA landmarks for sidebar / main
  / toolbar.

---

## 9. Motor & handedness

- **Stroke stabilisation** slider (off by default) with **live preview**, independent for pen/finger,
  including a **Motion Filtering** mode marketed as a **tremor aid** (deletes wobble extremities) — see
  [`pen-and-brush-spec.md` §8](./pen-and-brush-spec.md). A genuinely inclusive, differentiating feature.
- **Single-touch gesture companion** (Procreate pattern): do undo/redo/zoom/pan with **one finger** for
  motor accessibility, as an alternative to multi-finger gestures.
- **Left-handed mode** mirrors primary controls (page rail, palette dock side, palm-rejection zone) —
  independent from RTL, must not break focus order or RTL logic (see gestures doc §8).
- **Every drag has a non-drag alternative** (2.5.7): move object → tap-select + arrow-nudge / numeric;
  resize handle → numeric entry ("type-to-resize"); reorder pages → move-up/down buttons; colour slider →
  numeric/HEX; dock drag → Settings toolbar-position segmented control.
- **Larger targets on request:** honour platform minimums (44 pt / 48 dp); the **Zoom writing window**
  (magnified writing box that auto-advances) aids users with large fingers / thick styli
  (`research/notability.md`, `research/goodnotes-userguide-inventory.md`).

---

## 10. Per-screen WCAG mapping

Each full screen/overlay from [`screens-and-flows.md`](./screens-and-flows.md), with the criteria most
at risk and the specific requirement.

| Screen / overlay | Key a11y requirements |
|---|---|
| **Login** (`§3`) | OTP input labelled; +91 prefix announced; errors as toasts announced to AT (not colour-only). Social buttons have accessible names ("Continue with Google"). Two-column art panel is decorative → `ExcludeSemantics`. Focus order: heading → methods → phone → OTP. Marketing "Recording 04:12" pill is decorative. |
| **Profiles "Who's writing?"** (`§4`) | Each tile is a button with name + role + note as the label ("Riya, Owner, B.Tech Physics minor"); "Current" state exposed as selected. Add-profile reveals a labelled text field. Avatar colour is decorative → pair with the name. |
| **Onboarding** (`§5`) | Progress dots expose "step 1 of 3"; subject chips are toggle buttons with state; theme cards are radio-group with names; Dark-mode toggle labelled. Skip/Continue always reachable; backdrop does not trap. |
| **Sidebar** (`§2`) | Nav items are a list with current item exposed as selected (not colour-only — weight + `aria-current`). Search launcher announces "⌘K". Subject rows expose colour **name** + count. Free-plan progress bar has an accessible value ("2 of 5 imports"). |
| **Library** (`§6`) | Greeting is a heading. Notebook cards are buttons labelled title + "subject · N pages · updated" + badges spoken ("Audio, PDF, Shared, Favourite"). Favourite star is a toggle with state. Filter chips = toggle group. Grid/List toggle labelled. Empty states have text. |
| **Editor** (`§7`) | **The hard screen.** Toolbar buttons labelled with state (Undo disabled when stack empty; Bookmark filled/empty). Tool palette: each tool a button with selected state; colour dots labelled by **name** + selected; width dots labelled S/M/L. Canvas uses the parallel a11y tree (§3). Audio bar: record/play/scrub/speed all labelled; scrubber is a slider with time value. Selection bar actions labelled; Pro-gated actions announce "Pro". Focus mode exit pill labelled and reachable. Page rail thumbnails are a list ("page 3 of 12, bookmarked"). |
| **Templates** (`§8`) | Segmented controls (Pages/Freeform, page size) expose selected; template grid = radio group with names; tint swatches labelled by name + colour name. |
| **Import PDF** (`§9`) | Source buttons labelled; recents list items labelled (name · course · pages · size); free-import meter has a value; gate routes to Upgrade with an announced reason. |
| **Share** (`§10`) | Link toggle labelled with state; permission segmented exposes selected; people list = list with name + role; role must be announced (not colour). Invite field labelled; export rows labelled. |
| **Search** (`§11`) | Search field labelled; filter chips = toggle group; result count is a live region; each result labelled type + notebook + page + matched snippet; matched term (`<mark>`) exposed (e.g. "match: standing wave"). Ask panel is a region; "PRO PREVIEW" announced. |
| **Settings** (`§12`) | Tab list with selected; every toggle labelled with its description as hint and state as value; segmented controls expose selected; theme grid = radio group of 17 named looks; wallpaper sliders are sliders with values; destructive Sign out announced as such. |
| **Upgrade** (`§13`) | Billing toggle labelled; plan cards are readable regions; "MOST STUDENTS" badge is decorative but its text is available; price announced with currency; "Start 14-day free trial" labelled. |
| **Toast** (global) | Mirror to `SemanticsService.announce` / ARIA live region (polite), 2.4 s, non-interruptive. The *only* inverted surface — verify its `ink`-on-`bg` contrast per look (it inverts, so it generally passes; verify Cyberpunk/Glass). |

---

## 11. OCR, captions, and i18n accessibility

- **OCR text alternative per ink page** (1.1.1): on-device (ML Kit Digital Ink primary — Devanagari,
  Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Punjabi, Odia for India priority, plus CJK and
  Arabic-script, downloadable on demand; Vision OCR fallback on iOS for rasterised pages). Announced to
  screen readers, shown in reading mode, **user-editable**.
- **Captions/transcripts for audio** (Apple + Flutter checklist): every recording offers time-synced
  captions + a searchable transcript (reuse the on-device speech pipeline); media controls
  (play/pause/stop, seek, speed) are keyboard/AT reachable.
- **RTL** mirrors chrome (Arabic/Hebrew/Urdu) via `Directionality`/`EdgeInsetsDirectional`; canvas
  unmirrored; RTL ⟂ left-handed compose correctly.
- **CI pseudo-locale build** (en-XA accents + en-XB bidi mirror, +40% expansion, delimiter wrapping)
  must render with no truncation/overlap/hard-coded English/broken mirroring before release.
- **Locale-aware `intl`** for dates/numbers; **₹** via `NumberFormat.simpleCurrency(locale:'en_IN'|'hi_IN')`
  with lakh/crore grouping; store price tiers set per storefront (verify on-device grouping output).

---

## 12. Store accessibility labels (what we must be able to declare)

Design so we can **truthfully** declare Apple's Accessibility Nutrition Labels (each gated on completing
**all** common tasks with that feature): **VoiceOver, Voice Control, Larger Text (200%+), Dark
Interface, Differentiate Without Color, Sufficient Contrast, Reduced Motion, Captions.** Google Play has
no equivalent formal label — substantiate via Play Console pre-launch accessibility reports +
Accessibility Scanner, and keep store copy's accessibility claims accurate.

---

## 13. Per-platform acceptance checklist

- [ ] **All platforms:** body text ≥ 4.5:1, large/UI/focus ≥ 3:1 in **every look × mode** (with §4.1
      adjusted tokens); text scales to 200% & reflows at 320 px; text-spacing overrides don't clip; no
      colour-only info; targets ≥ 44 pt / 48 dp / 24 px; all path gestures & drags have alternatives;
      strokes commit on up-event & are undoable; full keyboard operability, no traps; visible focus never
      obscured; nothing flashes > 3×/s; Reduce-Motion disables interaction motion; every control exposes
      name/role/state/value; every object has a text alternative.
- [ ] **Canvas semantics:** iPadOS `UIAccessibilityElement` tree + custom actions + rotor; Android
      `ExploreByTouchHelper` hierarchy + actions + change events; Web parallel DOM + `<canvas>` fallback
      + ARIA; Flutter `CustomPaint.semanticsBuilder` per object, decorative ink excluded, transient events
      announced. **Flutter-web semantics tested explicitly.**
- [ ] **Verified with** VoiceOver, TalkBack, and a desktop screen reader (NVDA/JAWS) end-to-end for a
      common-task flow; and with Voice Control/Voice Access + Switch Control/Switch Access for
      tool-select + object-edit.
- [ ] **Inclusive reading:** OpenDyslexic + Lexend picker; reading mode (Read Aloud/spacing/line
      focus/translation); Okabe–Ito optional ink palette; colour names on swatches; colour-blind preview.
- [ ] **Motor:** stabilisation slider off-by-default + live preview + tremor Motion-Filtering;
      single-touch companion; left/right-handed mirror without breaking focus/RTL.
- [ ] **OCR/audio:** on-device OCR transcript per page (announced, editable); audio captions +
      searchable transcript; media controls AT-reachable.
- [ ] **i18n:** RTL chrome mirroring (canvas unmirrored); India-priority + CJK + Arabic recognisers
      downloadable; platform IMEs work in all fields; `intl` dates/numbers/₹; CI pseudo-locale passes.
- [ ] **Store labels:** app truthfully declares the eight Apple nutrition-label features; Play pre-launch
      + Scanner clean.

---

## Cross-references

- Non-gesture alternatives & Switch/Voice control: [`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md)
- Tokens & the a11y-adjusted token layer: [`tokens.json`](./tokens.json), [`design-system.md`](./design-system.md)
- Reduce-motion & motion durations: [`ux-principles.md` §6](./ux-principles.md)
- Stabilisation / tremor aid / colour picker names: [`pen-and-brush-spec.md`](./pen-and-brush-spec.md)
- Screens referenced: [`screens-and-flows.md`](./screens-and-flows.md)
- Component a11y states: [`component-inventory.md`](./component-inventory.md)
