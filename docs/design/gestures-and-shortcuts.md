# Sane Notes — Gestures & Shortcuts

> The complete input map: stylus, touch, keyboard, and mouse, per platform, with palm-rejection rules,
> conflict resolution, and precedence. For the builder wiring input in the Editor and chrome across
> iPadOS/iOS, Android (phone/tablet, S Pen, USI), and Web (PWA). Adopt platform conventions users
> already know; keep the *result* of an action identical everywhere.

Grounding: `research/apple-pencil-ipados-capabilities.md` (Apple Pencil Pro squeeze/barrel-roll/hover,
UITouch, coalesced/predicted, PencilKit), `research/android-stylus-capabilities.md` (MotionEvent axes,
palm rejection, S Pen Remote SDK, USI), `research/web-stylus-and-pwa-capabilities.md` (Pointer Events,
touch-action, coalesced/predicted, Scribble), `research/procreate.md` &
`research/concepts-linea-paper-fresco.md` (the de-facto gesture grammar), `research/notability.md` &
`research/goodnotes-userguide-inventory.md` (double-tap/squeeze/scribble-to-erase, keyboard shortcuts),
and [`screens-and-flows.md`](./screens-and-flows.md) / [`ux-principles.md`](./ux-principles.md).

**Design intent:** the gesture language keeps the UI out of the way (Procreate model). Adopt the
industry-standard grammar (two-finger undo, three-finger redo, pinch-zoom, draw-and-hold) so users
arrive already trained, then make every gesture remappable for power users and give every gesture a
non-gesture alternative for accessibility (WCAG 2.5.1 / 2.5.7).

---

## 1. Global gesture grammar (all touch platforms)

These are the app-wide defaults. All are **remappable** (Settings → Handwriting & stylus / Gestures),
and each has a **button/menu alternative** so nothing is gesture-only.

| Gesture | Action | Non-gesture alternative | Notes |
|---|---|---|---|
| **Two-finger tap** | Undo | Undo button (toolbar); ⌘/Ctrl+Z | De-facto standard (Procreate/Concepts/Linea/Fresco). Tap-and-hold two fingers = rapid repeat undo. |
| **Three-finger tap** | Redo | Redo button; ⌘⇧Z / Ctrl+Y | Standard. |
| **Pinch** | Zoom the page/canvas | Zoom buttons; ⌘ +/− | `touch-action: none` region; pinch is a two-finger gesture, never draws. |
| **Pinch + twist** | Rotate canvas (freeform only; paged pages do not rotate) | (freeform) rotate control | Paged notebooks: rotation disabled; freeform: enabled. |
| **Quick pinch-in / long-press compass** | Fit-to-screen / re-centre | "Fit" button | Essential on freeform (2400×2400) and large notebooks. |
| **Two-finger pan** | Scroll / pan the page | Scrollbar; page nav; arrow keys | One-finger pan is reserved by tool (see §2 palm/finger rules). |
| **Three-finger swipe down** | Copy/Paste menu | Edit menu; ⌘/Ctrl+C/V | Procreate grammar (optional; verify it doesn't clash with OS). |
| **Three-finger scrub (side-to-side)** | Clear current selection / undo run | Delete button | Optional power gesture; off by default to avoid accidental clears. |
| **Four-finger tap** | Toggle Focus mode (hide/show chrome) | Focus button; Exit-focus pill; ⌘⇧F | Matches Procreate hide-UI + the mockup's Focus mode. |
| **Draw + hold (dwell)** | QuickShape / QuickLine snap | Shape tool | The single most valuable gesture for notes (see §5). Dwell time configurable. |
| **Tap-and-hold (pen)** | Eyedropper (sample colour) | Colour picker → eyedropper | With a loupe; also bindable to double-tap/squeeze. |
| **Second finger while writing** | Momentary Lasso/select, then back to pen | Lasso tool | Concepts pattern — select a chunk without a toolbar trip. Off by default (opt-in) to avoid conflicts. |

**Precedence:** a **two-or-more-finger** gesture always beats single-pointer ink. If a second finger
lands while a stroke is in progress, the app cancels/holds the stroke and interprets the multi-finger
gesture (zoom/pan/undo). See §7.

---

## 2. Stylus & finger roles, palm rejection

The core rule of a pen-first app: **the pen writes; the finger navigates.** This is the default and is
what makes palm rejection work.

### 2.1 Default input roles

| Input | Default role | Setting |
|---|---|---|
| **Stylus (pen down)** | Draw with the active tool | — |
| **Finger (single)** | Scroll / pan (does **not** draw) | Settings → Handwriting & stylus → **"Draw with finger"** (off by default): "Off means fingers only scroll and pinch." |
| **Finger (two+)** | Zoom / pan / undo-redo gestures | — |
| **Palm / resting hand** | Ignored | Settings → **"Palm rejection"** (on by default): "Ignore your resting hand while you write." |
| **Stylus eraser end (S Pen / inverted pencil)** | Erase | Auto (tool type = eraser) |
| **Stylus barrel button** | Modifier (default: eraser-while-held) | Remappable |

### 2.2 Palm rejection implementation, per platform

| Platform | Mechanism |
|---|---|
| **iPadOS/iOS** | PencilKit rejects palms automatically. Custom canvas: branch on `UITouch.type == .pencil` (draw) vs `.direct` (finger → gesture/scroll); use `PKCanvasViewDrawingPolicy.pencilOnly`-style logic; coordinate with `UIGestureRecognizer`s so two-finger pans scroll instead of drawing. Honour "Initial touch location" so the user's first touch is the one honoured. |
| **Android** | On `ACTION_CANCEL`, remove the stroke for `getPointerId(getActionIndex())` and re-render. **Android 13+**: check `FLAG_CANCELED` on pointer-up to undo an unintended touch (palm/grip). Branch on `getToolType()` (`TOOL_TYPE_STYLUS`/`TOOL_TYPE_ERASER` vs `TOOL_TYPE_FINGER`). Suppress edge-nav gestures during drawing (`WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE`). |
| **Web** | No native palm flag. Heuristic: treat `pointerType === "pen"` as authoritative and ignore/deprioritise concurrent `touch` pointers while a pen is active or hovering; use `width`/`height` (large contact ≈ palm) and `pressure` to filter; drop touch pointers that begin shortly after pen-down. `touch-action: none` on the canvas so the pen owns every pointer; **scope `touch-action: none` to the canvas only** (blocking page zoom app-wide violates WCAG 1.4.4). |

### 2.3 Finger-role setting (when a stylus is active)

Offer, per the Linea pattern, a **"Touch (finger) role"** setting for what the *finger* does while the
pen is active: **Scroll/pan (default) · Erase · Select · Nothing.** This makes finger input a feature,
not a nuisance, and composes with left-handed mode (§8).

---

## 3. Apple Pencil (iPadOS/iOS)

Four Pencil generations with different capability envelopes
(`research/apple-pencil-ipados-capabilities.md §1`). **Feature-detect capabilities; never assume by
device.**

| Capability | Pencil 1 | Pencil 2 | Pencil USB-C | Pencil Pro | API |
|---|---|---|---|---|---|
| Pressure (force) | ✅ | ✅ | ❌ | ✅ | `UITouch.force`, `PKStrokePoint.force` |
| Tilt (altitude) | ✅ | ✅ | ✅ | ✅ | `UITouch.altitudeAngle` |
| Azimuth | ✅ | ✅ | ✅ | ✅ | `azimuthAngle(in:)` |
| Barrel roll | ❌ | ❌ | ❌ | ✅ | `UITouch.rollAngle` (iPadOS 17.5+) |
| Double-tap | ❌ | ✅ | ❌ | ✅ | `UIPencilInteraction` / `onPencilDoubleTap`, `preferredTapAction` |
| Squeeze | ❌ | ❌ | ❌ | ✅ | `.onPencilSqueeze` / `didReceiveSqueeze:`, `preferredSqueezeAction` |
| Hover | ❌ | ✅ (M-iPads) | ✅ | ✅ (M-iPads) | `UIHoverGestureRecognizer`, `UIPencilHoverPose` |
| Haptics | ❌ | ❌ | ❌ | ✅ | `UICanvasFeedbackGenerator`, `.sensoryFeedback(.alignment/.pathComplete)` |

### 3.1 Double-tap (Pencil 2 / Pro)

- **Default action:** switch between current tool and **eraser** (the platform norm).
- **Remappable** (Settings → Handwriting & stylus → **"Double-tap the pencil"**, options **Eraser /
  Previous tool / Colors**, per the mockup; extend with Eyedropper / QuickMenu).
- Respect the user's **system** `preferredTapAction` where it is set, but the app's own mapping applies
  inside the Editor.

### 3.2 Squeeze (Pencil Pro only)

- **Default action:** open the **contextual QuickMenu / arc palette** (recent pens + colours + undo/redo
  + the 6 most-used actions), anchored at the pencil's hover pose. Notability's Arc menu / Fresco's
  squeeze toolbar model.
- If the user's system `preferredSqueezeAction` is `.runSystemShortcut`, the app does **not** receive the
  squeeze — do not rely on it as the only path to any action.
- Squeeze `phase` (`.began`/`.changed`/`.ended`) can also **confirm a QuickShape** or cycle a value.

### 3.3 Barrel roll (Pencil Pro)

- Rotates the **calligraphy/brush nib** and the **chisel highlighter/marker** live (`rollAngle` +
  `azimuth` combined for best responsiveness). Roll arrives estimated then refined over Bluetooth —
  implement `touchesEstimatedPropertiesUpdated(_:)` to capture final values (also for `force`).
- A **"Lock angle"** toggle on the calligraphy pen overrides barrel roll and uses the nib-angle slider
  (Notability model — for users who don't want the nib to rotate).
- Hover preview: the nib angle previews on hover before contact.

### 3.4 Hover (Pencil 2/Pro on M-iPads)

- Show the **brush cursor** (size/colour/shape) before touching — reduces "where will my mark land"
  when annotating dense text. Hover pinch/slide MAY adjust size/opacity (Procreate).
- Feature-detect hover; don't assume from device.

### 3.5 Haptics (Pencil Pro)

- Fire on **shape snap** (`pathCompleted` / `.sensoryFeedback(.pathComplete)`) and **snap-to-guide**
  (`alignmentOccurred` / `.alignment`) so the user feels confirmation without looking. Use the iOS 18
  view+point form so feedback is spatially contextual. Honour the system haptics setting; provide an
  in-app toggle.

### 3.6 Scribble

- Handwriting-to-typed-text in **text fields** works system-wide for free
  (`UIScribbleInteraction` to customise/suppress in specific fields). Use `UIIndirectScribbleInteraction`
  to enable "write anywhere" into custom text regions (e.g. the notebook title, search field, text
  boxes). The canvas ink path and the Scribble text-field path are **separate** — Scribble strokes do
  not become canvas ink.

---

## 4. Android stylus (S Pen, USI, generic)

Read pen data from `MotionEvent` (`research/android-stylus-capabilities.md §2`):

| Data | API |
|---|---|
| Pressure | `getPressure()` / `AXIS_PRESSURE` (0–1, normalise) |
| Tilt | `AXIS_TILT` (0 = perpendicular → π/2 flat) |
| Orientation (for chisel/brush) | `getOrientation()` / `AXIS_ORIENTATION` (±π) |
| Hover distance | `AXIS_DISTANCE` (0 at contact, higher as lifted) → hover cursor/size preview |
| Tool type | `getToolType()` → `TOOL_TYPE_STYLUS` / `TOOL_TYPE_ERASER` / `TOOL_TYPE_FINGER` |
| Barrel buttons | `getButtonState()` → `BUTTON_STYLUS_PRIMARY` / `BUTTON_STYLUS_SECONDARY` |

**Fidelity/latency:** `getHistorical*` for batched intermediate samples; `requestUnbufferedDispatch` for
immediate delivery; `MotionEventPredictor.record()/predict()` for draw-ahead (render predicted points
transiently, never in the final stroke). Draw with **Jetpack Ink API** + **low-latency graphics**
(`GLFrontBufferedRenderer` / `LowLatencyCanvasView`, ~4 ms) — do not hand-roll stroke rendering.

### 4.1 Barrel button (all Android styluses)

- **Primary barrel button held** = modifier; default **erase-while-held** (like Apple double-tap
  eraser). Remappable (eraser / previous tool / lasso / pan).
- `TOOL_TYPE_ERASER` (pen flipped, eraser end down) auto-selects the eraser.

### 4.2 S Pen (Samsung) — Air actions via S Pen Remote SDK

- **Button events:** single/double press of the BLE button. Map **single press → New note** or **Start
  recording** (constraint: **only one remote action per app** is honoured, configured via
  `remote_action.xml`). Choose the highest-value single action.
- **Air gestures** (on pens with accelerometer + gyro — Note 10/20, S22 Ultra, Tab S6/S7/S8, S Pen Pro):
  Up/Down/Left/Right/Clockwise/Counterclockwise → map to **page turns** (Left/Right → prev/next page)
  and tool cycling. Basic barrel-button presses also read through standard `MotionEvent` without the SDK.
- Feature-detect via `SpenRemote` (call `initialize(Context)`; query feature support). Degrade cleanly on
  pens without gyro.

### 4.3 USI (Chromebook / Pixel Tablet)

- USI 2.0 pens (up to 4096 pressure levels, tilt, hardware palm rejection) surface through the **same
  `MotionEvent` stylus axes** — no separate SDK. On ChromeOS, register as the default note-taker via an
  intent filter for `org.chromium.arc.intent.action.CREATE_NOTE` (blank-note / annotate-image entry
  points).

---

## 5. Draw-and-hold (dwell) — QuickShape / QuickLine

The dwell gesture (§1) is important enough to specify precisely; it must fire for diagrams and **never**
during normal handwriting.

- **Trigger:** finish a stroke, **keep the pen/finger held still** at the end for the dwell time
  (default ~0.5 s, configurable). The stroke snaps to a clean shape/line (see
  [`pen-and-brush-spec.md` §7](./pen-and-brush-spec.md)).
- **Not-during-writing rule:** dwell only arms when the stroke's geometry looks like a single line/shape
  (few direction changes) **and** the pen stops moving within a small radius. A word or a scribble
  (many direction changes, or continued motion) does not trigger it. If the user lifts before the dwell
  completes, nothing snaps.
- **Constrain / rotate:** a **second finger held** during dwell constrains to the perfect version
  (square/circle/equilateral) and gives 15° magnetic-rotate steps; drag while holding scales/rotates.
- **Edit after:** an **Edit Shape** affordance appears post-snap (draggable nodes).
- **Haptic** on snap (Pencil Pro); toast is not used (too noisy for a frequent gesture).
- **Configurable:** dwell time and on/off in Settings. Users who never want it can disable it and use the
  explicit Shape tool.

---

## 6. Keyboard & mouse (web, desktop windows, external keyboards on tablets)

A hardware keyboard is first-class on web/desktop and on tablets with a keyboard. Shortcuts follow the
**Notability/Goodnotes conventions** users already know (`research/notability.md`,
`research/goodnotes-userguide-inventory.md`), normalised across platforms. `⌘` on Apple = `Ctrl`
elsewhere.

### 6.1 Tools (single-key, when the Editor has focus and no text field is active)

| Key | Tool |
|---|---|
| `P` | Pen |
| `H` | Highlighter |
| `E` | Eraser |
| `V` (or `L`) | Lasso / select |
| `S` (or `D`) | Shape |
| `T` | Text |
| `I` | Image insert |
| `R` | Ruler |
| `Z` (hold) | Temporary eyedropper (verify no clash with undo) |

> Single-key tool switches MUST be suppressed while a text field / text box is being edited (the key
> should type the letter, not switch tools). Follow Goodnotes' `P/H/E/D/V/T/I/R` scheme.

### 6.2 Colours, widths

| Keys | Action |
|---|---|
| `⌥⌘1`–`⌥⌘8` / `Ctrl+Alt+1..8` | Select colour slot 1–8 |
| `⌥⌘9` / next, `⌥⌘0` / prev | Cycle colours |
| `⌃⌥1`–`⌃⌥3` | Width S / M / L |

### 6.3 Edit, file, navigation, view

| Keys | Action |
|---|---|
| `⌘Z` / `Ctrl+Z` | Undo |
| `⌘⇧Z` / `Ctrl+Shift+Z` or `Ctrl+Y` | Redo |
| `⌘X`/`⌘C`/`⌘V` | Cut / Copy / Paste |
| `⌘A` | Select all (on current page / selection context) |
| `⌘D` | Duplicate selection / page |
| `⌘F` / `Ctrl+F` | Find (in-note search); `⌘K` opens universal Search |
| `⌘K` | Universal search (the `⌘K` badge on the sidebar launcher) |
| `⌘N` | New notebook; `⌥⌘N` new from template |
| `⌘S` | (web/desktop) explicit save/checkpoint — local-first autosaves, but honour the muscle memory |
| `⌘P` | Print / export PDF |
| `⌘+` / `⌘−` / `⌘0` | Zoom in / out / actual size; `⌘9` fit-to-width |
| `Space` / `Shift+Space` | Page forward / back (view) |
| `⌘↑` / `⌘↓` | Top / bottom of notebook; next/prev page |
| `⌘⇧F` | Focus mode |
| `⌘R` | Start/stop audio recording |
| `⌘,` | Settings |
| `⌘/` | Show keyboard-shortcut cheat sheet |
| `⌘1`–`⌘9` | Switch to open notebook tab 1–9 (where document tabs exist) |
| `Esc` | Dismiss overlay / cancel in-progress action / exit search |

- **Long-press `⌘`/`Ctrl`** (iPad/desktop) shows the live shortcut cheat sheet (Notability/Goodnotes
  pattern).
- **Text formatting** (inside a text box): `⌘B`/`⌘I`/`⌘U` bold/italic/underline, `⌘⇧X` strikethrough,
  `⌘K` link, Tab/Shift+Tab indent/outdent.

### 6.4 Mouse / trackpad (web, ChromeOS, desktop)

| Input | Action |
|---|---|
| Left-drag with a tool | Draw / use the active tool (mouse acts as pointer, no pressure — velocity thinning still gives life) |
| Two-finger scroll / wheel | Scroll page |
| `Ctrl` + wheel | Zoom |
| Right-click | Context menu (object actions on a selection; page actions on empty canvas) |
| Hover | Tooltips, hover states, brush cursor preview |
| Middle-drag / Space-drag | Pan |

Right-click context menus are the desktop equivalent of long-press object menus; every long-press menu
MUST have a right-click equivalent.

---

## 7. Conflicts and precedence

When inputs collide, resolve in this fixed order (highest wins):

1. **System / OS gestures** (edge swipes, app switch, notification pull) — never override; suppress edge
   nav only within the canvas during active drawing where the platform allows.
2. **Multi-finger gestures** (2+ fingers: zoom, pan, undo, redo, focus) — beat single-pointer ink. A
   second finger during a stroke **cancels or holds** the wet stroke and interprets the gesture. On
   web, `pointercancel` / `FLAG_CANCELED` handling removes the aborted stroke.
3. **Stylus ink** — the pen writing beats a single finger (which is scroll/pan by default).
4. **Single-finger** — scroll/pan (or draw, only if "Draw with finger" is on).
5. **Palm / rejected touches** — always lowest; discarded.

**Specific conflict rules:**

- **Dwell vs writing:** dwell only arms on line/shape-like geometry with the pen stopped (§5); it never
  fires mid-word.
- **Scribble-to-erase vs writing:** the erase-scribble recogniser must require a tight, repeated
  back-and-forth over existing strokes; a normal scribble on blank canvas draws. Off-by-default if it
  proves error-prone; expose the toggle.
- **Double-tap/squeeze vs the stroke in progress:** Pencil interactions are separate events; they do not
  interrupt a committed stroke, but map them to non-destructive actions (tool swap, menu) so an
  accidental trigger mid-note is harmless.
- **Barrel-button-erase vs draw:** while the barrel button is held, the tool is the eraser; releasing
  returns to the pen. The button state is read per-event.
- **`touch-action` scope (web):** `none` only on the canvas element; chrome uses `manipulation` (keeps
  pan/pinch, drops the 300 ms tap delay). This preserves page-level zoom for accessibility off-canvas.
- **Text field vs tool keys:** when a text field/box is focused, single-key tool shortcuts type
  characters; only modified shortcuts (`⌘…`) act. `Esc` returns focus to the canvas.
- **Two-finger undo vs two-finger pan:** a two-finger **tap** (down+up, minimal movement) = undo; a
  two-finger **drag** = pan. Disambiguate by movement threshold and time.

---

## 8. Left-handed mode & RTL (independent settings)

- **Left-handed mode** (`prefs.leftHanded`, off by default) mirrors primary controls: it moves the
  **page rail to the left** so the writing hand never covers it (mockup: editor flips to
  `row-reverse`), and it relocates the **palm-rejection zone** and the default palette dock side. It
  does **not** mirror text or reading order.
- **RTL** (Arabic, Hebrew, Urdu, etc.) mirrors app **chrome** and reading order (via
  `Directionality`/`EdgeInsetsDirectional`), but the **ink canvas is not mirrored** (a drawing is a
  drawing).
- **Left-handed and RTL are independent and must compose correctly** — a right-handed Arabic user and a
  left-handed English user are different configurations. Left-handed mode must not break keyboard focus
  order or RTL mirroring logic (`research/accessibility-i18n-and-inclusive-design.md §8`, §11). See
  [`accessibility.md`](./accessibility.md).

---

## 9. Accessibility of gestures (non-gesture alternatives)

Every gesture in this doc has a documented button/menu/keyboard alternative (columns above), required by
WCAG 2.5.1 (Pointer Gestures) and 2.5.7 (Dragging Movements):

- **Multipoint/path gestures** (pinch-zoom, two-finger undo, lasso, dwell-snap) → single-pointer
  alternatives (zoom buttons, undo button, tap-select, Shape tool).
- **Drag operations** (move object, resize handle, reorder pages, colour slider, dock drag) →
  tap-to-select + nudge/arrow keys / numeric entry / Settings toolbar-position.
- **Pointer cancellation (2.5.2):** strokes commit on **pen-lift** (up-event) and are cancellable/undoable;
  a stroke aborted by a second finger or palm is removed, not committed.
- **Switch Control / Switch Access / Voice Control / Voice Access:** every tool/action reachable and
  labelled so it works by scanning focus and by voice ("tap Pen", "tap Undo"). See
  [`accessibility.md`](./accessibility.md).

---

## 10. Per-platform quick reference

| Capability | iPadOS/iOS | Android | Web |
|---|---|---|---|
| Pressure | Pencil (not USB-C) `UITouch.force` | `AXIS_PRESSURE` (USI 4096 levels) | PointerEvent `pressure` (mouse = none) |
| Tilt / azimuth | `altitudeAngle`/`azimuthAngle` | `AXIS_TILT`/`AXIS_ORIENTATION` | `tiltX/Y` + `altitude/azimuthAngle` (Safari 18.2+) |
| Barrel roll | `rollAngle` (Pencil Pro) | (n/a standard; S Pen has no roll) | `twist` (rarely populated) |
| Barrel button | (n/a Apple Pencil) | `BUTTON_STYLUS_PRIMARY/SECONDARY` | PointerEvent buttons |
| Squeeze | `.onPencilSqueeze` (Pro) | S Pen Remote button (BLE) | ❌ |
| Hover | `UIHoverGestureRecognizer` (M-iPads) | `AXIS_DISTANCE` | Safari 16.1+ hover; mouse hover |
| Haptics on snap | `UICanvasFeedbackGenerator` (Pro) | platform haptics | ❌ (no pen haptics) |
| High-Hz samples | `coalescedTouches` (240 Hz) | `getHistorical*` | `getCoalescedEvents()` (Safari 18.2+) |
| Predict-ahead | `predictedTouches` | `MotionEventPredictor` | `getPredictedEvents()` (Safari 18.2+; Chromium) |
| Low-latency render | Metal front-buffer / `UIUpdateLink` | `GLFrontBufferedRenderer` (~4 ms) | `desynchronized` canvas; Ink API (Chromium) |
| Palm rejection | PencilKit / `UITouch.type` | `ACTION_CANCEL`/`FLAG_CANCELED`/`getToolType` | pen-priority heuristics + `touch-action:none` |
| Handwriting→text field | Scribble (auto) | Stylus handwriting in `EditText`/`WebView` (Android 14+) | Scribble in DOM fields (auto, not scriptable) |
| Air/remote actions | (n/a) | S Pen Remote SDK (one action/app) | ❌ |
| Default note-taker | Quick Note (OS) | ChromeOS `CREATE_NOTE` intent | PWA share_target / file_handlers (Chromium) |

**Rules that follow:** feature-detect every capability (never sniff device); degrade cleanly (a USB-C
Pencil has no pressure — the Fountain Pen's velocity thinning keeps handwriting alive; a mouse has no
pressure — same); pin native brush/haptic behaviour and **verify** per OS version so identical rendering
and feel hold across platforms.

---

## Cross-references

- Tool behaviour, dwell-to-perfect detail, favourites/QuickMenu: [`pen-and-brush-spec.md`](./pen-and-brush-spec.md)
- Latency budgets & precedence rationale: [`ux-principles.md`](./ux-principles.md)
- Non-gesture alternatives, Switch/Voice control, contrast of controls: [`accessibility.md`](./accessibility.md)
- Editor surfaces (dock, page rail, focus mode): [`screens-and-flows.md` §7](./screens-and-flows.md)
- Settings that own these (palm/pressure/finger/left-handed/toolbar/double-tap): [`screens-and-flows.md` §12](./screens-and-flows.md)
