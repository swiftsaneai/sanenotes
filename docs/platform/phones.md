# Platform — Phones (iPhone & Android phone)

> Audience: a coding agent adapting the tablet-first Sane Notes UX to **phone form
> factors** (iPhone and Android phone; the compact window size class) with **zero prior
> context**. This doc covers *how the tablet design changes on a phone* — navigation,
> palette, reading, quick capture, finger writing, one-handed use. Platform APIs, stylus
> tables, plugins, and store rules live in [`ipad.md`](ipad.md) (Apple) and
> [`android.md`](android.md) (Android); this doc does not repeat them.
>
> Sources: `research/apple-pencil-ipados-capabilities.md`, `research/android-stylus-capabilities.md`,
> `research/user-pain-points-and-market-gaps.md`, `research/accessibility-i18n-and-inclusive-design.md`.
> Design source of truth: [`design/screens-and-flows.md`](../design/screens-and-flows.md),
> [`design/design-system.md`](../design/design-system.md). **MUST/SHOULD/MAY** are RFC-2119.

Phones are a **first-class surface** (decision 1) but a **different job** from tablets. On a
phone the user is rarely doing a two-hour handwriting session; they are **capturing** (a
thought, a photo of the whiteboard, a voice memo), **reading/reviewing**, and **light editing**.
The persona is still Riya ([`screens-and-flows.md`](../design/screens-and-flows.md)) — a
student who takes notes on an iPad/Android tablet with a stylus and pulls out her phone to
capture and revise. The phone MUST feel like the same app, one-handed, thumb-first.

Design principle: **the phone is not a shrunken tablet — it is the same document model and
design tokens in a compact, thumb-reachable shell.** One codebase, adaptive layout (decision
1); the 17 looks, tokens, and Sane Sage are identical.

---

## 1. Target OS, devices & input

| Axis | iPhone | Android phone |
|---|---|---|
| **Min OS** | iOS 17+ (decision 7) | Android 10 (API 29)+ (decision 7) |
| **Window class** | Compact width (< 600 dp equivalent) | Compact (< 600 dp), incl. **cover display** of foldables |
| **Reference device** | iPhone 15-class (A16) | mid Android phone; **low-end 4 GB / Snapdragon 680-class** memory floor |
| **Primary input** | **Finger** (no Apple Pencil on iPhone — Pencil is iPad-only) | **Finger**; **S Pen** on Galaxy Note/S-Ultra/Fold; USI where present |
| **Latency budget** | steady 60 fps / 120 fps where ProMotion; finger-ink smooth | ≤ 25 ms where an active stylus exists; otherwise smooth finger-ink at 60 fps |

Key consequence: **on iPhone there is no stylus.** Finger writing is not a fallback — it is the
default and MUST be excellent. On Android phones a minority have an S Pen (Galaxy) or USI pen;
those get the full stylus stack from [`android.md`](android.md), but the phone UI MUST be
designed finger-first and treat the pen as an enhancement.

---

## 2. Navigation: compact shell

The tablet layout is **list + detail two-pane** (library rail + editor). On a phone the
window size class is **Compact**, so it MUST collapse to a **single-pane, stacked** flow.

| Element | Tablet | Phone (compact) |
|---|---|---|
| **Top-level nav** | Persistent side rail / library sidebar | **Bottom navigation bar** (thumb-reachable): Library · Search · Capture (center) · Study/Review · Settings/Profile. Follows platform bottom-nav conventions (iOS tab bar / Android M3 navigation bar). |
| **Library ↔ editor** | Side-by-side | **Push navigation** (library → notebook → page). Predictive back (Android 16, [`android.md`](android.md)) and the interactive-pop swipe (iOS) MUST work, with a discard-changes guard on unsaved edits. |
| **Notebook/page switch** | Rail + tabs | Bottom sheet page-picker; horizontal page swipe within a notebook. |
| **Deep links / routing** | `go_router` `ShellRoute` | Same routes, compact layout branch. URLs/deep links unchanged (matters for web + share-target hand-off). |

The bottom nav's **center "Capture" affordance** is the phone's signature: one thumb tap →
new note / new voice note / camera scan (see §5). Do not bury capture behind the library.

---

## 3. Tool palette on a phone

The design system's palette is a **dockable, reflowing** element (grip drags it; docks to an
edge; bottom/top → a **row**, left/right → a **column** —
[`design-system.md`](../design/design-system.md#tool-palette-dockable)). On a phone:

- Default the palette to a **single bottom row** within thumb reach, above the home
  indicator / gesture bar (respect safe-area insets; Android edge-to-edge is enforced at API
  36, [`android.md`](android.md)).
- **Collapse to essentials**: pen, highlighter, eraser, color, undo — with an expander (⋯) to a
  bottom-sheet full toolbox rather than a wide toolbar the thumb can't reach.
- Color/brush pickers open as **bottom sheets**, not side popovers.
- The palette MUST NOT dock left/right by default on a phone (a vertical column wastes the
  narrow width and is a two-handed reach). Allow it as an option; default bottom.
- Keep the same tokens and component styles — this is a **layout reflow**, not a redesign.

---

## 4. Reading & review mode

Reading is a primary phone activity. Provide a first-class **reading mode**:

- **Full-bleed page** with chrome auto-hidden (tap to toggle), pinch-zoom, and single-column
  reflow for text-heavy notes.
- **Continuous vertical scroll** across pages of a notebook / pages of a PDF at 60 fps
  (decision 7 requires scrolling a 600-page PDF at 60 fps — the phone is where this is felt).
- **OCR-backed text layer** so handwritten notes are selectable, searchable, and readable by
  TalkBack/VoiceOver (accessibility, decision 10). This reuses the handwriting-recognition
  path ([`ipad.md`](ipad.md) Vision / [`android.md`](android.md) ML Kit); on iPhone it is the
  main way handwritten content becomes accessible since there's no pen to re-edit with.
- **Study/Review** surface (flashcards, Q&A over notes — decision 6, see
  [`prd-04`](../product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md)) is especially
  phone-shaped: on the bus, one-handed, review generated flashcards. Give it a dedicated
  bottom-nav slot.

---

## 5. Quick capture (the phone's killer job)

Capture must be reachable **without opening the app to the library first**. Provide every fast
entry point the platform allows:

| Entry point | iPhone | Android phone |
|---|---|---|
| **In-app** | Center bottom-nav "Capture" → new note / voice / scan | Same |
| **Home-screen widget** | WidgetKit interactive widget (quick-note button backed by an `AppIntent`) | App widget (quick-note / voice-note) |
| **Lock screen / controls** | `ControlWidget` (Control Center / Lock Screen / Action Button) → "New note" / "New voice note" | Quick Settings tile; assistant/long-press shortcuts |
| **System quick note** | Quick Note deep-link back into a page (`NSUserActivity`, **verify**) | — |
| **Hardware** | Action Button (where present) → capture intent | **S Pen single click** → new note / start recording (S Pen Remote SDK, one action per app — [`android.md`](android.md)); Galaxy screen-off memo where available |
| **Share target** | `navigator.share` receive on installed PWA (limited on iOS); native share extension | Web share-target + native share; "Share to Sane Notes" a PDF/image/text |
| **Voice** | Siri via `AppShortcut` ("Sane Notes, new note") | Assistant intent |

Quick-capture notes land in a well-known **Inbox / Quick Notes** location and sync via the
user's cloud (decision 3) so they appear on the tablet. Capture MUST work in **guest mode**
(no sign-in) and offline.

---

## 6. Finger writing

Finger ink is the phone default (and the only ink on iPhone), so it MUST be first-class:

- **Enable finger-draw by default on phones.** On tablets the default is pencil-only (palm
  rejection); on phones, `PointerDeviceKind.touch` draws. This is a per-surface default, not a
  code fork — the ink capture path (`sane_ink`) is identical; only the drawing-policy default
  differs. On Apple this is the `PKCanvasViewDrawingPolicy`-style `.anyInput` equivalent
  ([`ipad.md`](ipad.md)); on Android, treat `TOOL_TYPE_FINGER` as ink.
- **Velocity-based width**: finger touches have no pressure (or a coarse estimate), so brushes
  MUST derive width/opacity from velocity (`perfect_freehand` `simulatePressure` /
  speed-thinning) so finger strokes still look like handwriting, not a uniform line.
- **Palm/gesture disambiguation without a pen**: since finger both draws and pans, use an
  explicit mode or a **two-finger pan / one-finger draw** convention (configurable). Provide a
  clear toggle; do not silently eat scroll.
- **Zoom-to-write**: a magnified writing box (write large with a finger, ink lands small on
  the page) — the standard phone finger-writing aid. Reuse the tablet zoom-write control if it
  exists; otherwise this is a phone-priority feature.

Where an S Pen or USI pen **is** present (Galaxy, some Android phones), the full stylus stack
applies and finger-draw can revert to pan.

---

## 7. One-handed & reachability

- **Thumb zone first**: primary actions (capture, save, undo, tool switch, send) live in the
  **bottom third** of the screen. Never put a required action only in a top corner.
- Respect iOS **Reachability** and Android's tall-display ergonomics; sheets and dialogs slide
  from the **bottom**.
- **Large tap targets** ≥ 44×44 pt (iOS) / 48×48 dp (Android) — also a WCAG 2.2 AA target-size
  requirement (decision 10).
- **Reduce reliance on hover** (no hover on touch phones): every hover affordance from
  tablet/desktop MUST have a tap/long-press equivalent.
- **Foldables**: on a fold, the **cover display** is Compact (phone layout); unfolding crosses
  into Medium/Expanded and MUST re-lay-out to the tablet two-pane **without losing editor
  state** (window-size-class change at runtime, [`android.md`](android.md)). Test the fold
  seam and hinge occlusion.

---

## 8. Performance & resource constraints on phones

Phones are the memory/thermal floor. The budgets in
[`performance-budgets.md`](performance-budgets.md) that bind hardest on phones:

- **Memory < 300 MB on a 4 GB Android** — the low-end reference device. Tile/raster caching in
  `sane_render` MUST cap memory; evict off-screen tiles; don't hold whole notebooks rasterized.
- **Cold start < 2 s (mid Android)** — code-split, defer heavy plugin init (ML, PDF) until used.
- **60 fps minimum, 120 fps where the display allows**; **no frame > 16.7 ms while writing**.
- **Battery**: a phone capture session is short, but background sync MUST be efficient; on iOS
  there is no reliable PWA background — sync while foregrounded (see [`web.md`](web.md) for the
  installed-PWA-on-phone case).

---

## 9. Phone-specific limitations & mitigations

| # | Limitation | Impact | Mitigation |
|---|---|---|---|
| **P1** | No Apple Pencil on iPhone | No pressure/tilt ink on iOS phone | Finger-first ink with velocity width + zoom-to-write; position iPhone as capture/read/light-edit, tablet for serious writing. |
| **P2** | Finger draws **and** pans (no pen to disambiguate) | Accidental strokes / eaten scroll | Explicit draw/pan mode or two-finger-pan convention, clearly signalled; per-user default. |
| **P3** | Small screen hides the full toolbox | Feature discoverability | Collapse palette to essentials + bottom-sheet toolbox; progressive disclosure. |
| **P4** | Compact memory/thermal envelope | Jank on low-end 4 GB devices | Memory-capped tile cache; low-end device is a CI gate; degrade effects before dropping frames. |
| **P5** | Foldable cover↔main transitions | State loss / broken layout | Adaptive relayout on size-class change; preserve editor state across the fold; test hinge insets. |
| **P6** | Handwritten notes unreadable by screen readers on a screen with no pen to edit | Accessibility | OCR text layer is mandatory on phone reading mode (decision 10). |

---

## 10. Testing devices

- **iPhone 15-class** (A16, iOS 17+) — finger ink, capture entry points, reading mode, share
  extension. (The team's iPhone 15 harness is un-jailbroken/stock — functional testing only.)
- **Mid Android phone** and the **low-end 4 GB / Snapdragon 680-class** reference — memory/fps
  floors, cold start, predictive back, edge-to-edge.
- **Samsung Galaxy (S Pen phone)** — pen-on-phone path + S Pen Remote single-click capture.
- **A foldable** (Galaxy Z Fold / Pixel Fold) — cover↔main relayout, hinge.
- Golden tests for compact layouts; `integration_test` + `patrol` for capture entry points,
  widgets, and share targets.

---

## 11. Cross-references

- Apple platform APIs / stylus / store: [`ipad.md`](ipad.md)
- Android platform APIs / stylus / store / foldables: [`android.md`](android.md)
- Web/PWA on phones: [`web.md`](web.md)
- Screens, flows, persona: [`design/screens-and-flows.md`](../design/screens-and-flows.md)
- Design tokens & palette/looks: [`design/design-system.md`](../design/design-system.md)
- Study/Review, AI, accessibility, i18n: [`prd-04`](../product/prd-04-sharing-collaboration-ai-study-a11y-i18n.md)
- Support tiers: [`compatibility-matrix.md`](compatibility-matrix.md)
- Budgets & gates: [`performance-budgets.md`](performance-budgets.md)
