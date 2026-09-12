# Accessibility & Internationalization Requirements — Pen-First Note App (iPad, Android, Web)

This report specifies the accessibility (a11y) and internationalization (i18n) requirements for a
pen-first / ink-first note app shipping on **iPadOS, Android, and the web**. Because the core surface
is a **freeform ink canvas** (a bitmap or vector drawing surface that assistive technology cannot
introspect on its own), most standard "just use native widgets" guidance does **not** apply to the
drawing area — we must build a *parallel accessible model* on top of the canvas. Every claim below
traces to a fetched source listed in **Sources**; anything I could not confirm from a fetched page is
marked **(unverified)**.

---

## 1. Platform & standards matrix

| Concern | iPadOS | Android | Web |
| --- | --- | --- | --- |
| Screen reader | VoiceOver | TalkBack | NVDA/JAWS/VoiceOver/Narrator via ARIA |
| Switch input | Switch Control | Switch Access | keyboard/switch emulation |
| Voice input | Voice Control | Voice Access | native OS voice + keyboard |
| Custom-canvas semantics | UIAccessibilityElement + custom actions / rotor | AccessibilityNodeInfo via ExploreByTouchHelper | parallel DOM + ARIA |
| Cross-platform layer | (Flutter) Semantics | (Flutter) Semantics | (Flutter) Semantics → ARIA |
| Baseline conformance | **WCAG 2.2 AA** everywhere; plus EN 301 549 / Section 508 / ADA / EU EAA as applicable |

Flutter is assumed as the shared UI layer, so its `Semantics` model is the primary mechanism that
projects onto VoiceOver, TalkBack, and web ARIA.

---

## 2. WCAG 2.2 AA — success criteria most relevant to a canvas/ink app

WCAG 2.2 is the conformance target on every platform. The criteria below are the ones an ink app is
most likely to fail; thresholds are exact and testable.

### Perceivable
- **1.1.1 Non-text Content (A)** — Every non-text element needs an equivalent text alternative. For
  ink this means each note, page, sticker, image, and shape must expose a text description (title +
  OCR transcript + alt text), and *purely decorative* strokes must be marked so AT can skip them.
- **1.3.1 Info and Relationships (A)** — Structure conveyed visually (layers, groups, headings written
  in ink, checklist state) must be programmatically determinable.
- **1.4.1 Use of Color (A)** — Colour must never be the *only* way information is conveyed. Ink colour
  used to mean something (e.g. "red = correction") must be paired with a shape/label/pattern.
- **1.4.3 Contrast (Minimum) (AA)** — Text and images of text: **≥ 4.5:1**; large text (≥ 18pt or 14pt
  bold): **≥ 3:1**. Applies to all app chrome, labels, and any rendered text.
- **1.4.4 Resize Text (AA)** — Text resizable to **200%** without loss of content or function.
- **1.4.10 Reflow (AA)** — No loss of content/function, and no 2-D scrolling, when content is presented
  at **320 CSS px** width (or 256 px height). Tool palettes and dialogs must reflow on narrow viewports.
- **1.4.11 Non-text Contrast (AA)** — UI components, icons, and graphical objects (incl. **focus
  indicators** and tool-state indicators): **≥ 3:1** against adjacent colours.
- **1.4.12 Text Spacing (AA)** — No loss of content when users set line height **1.5×**, paragraph
  spacing **2×**, letter spacing **0.12×**, word spacing **0.16×** of font size.

### Operable
- **2.1.1 Keyboard (A)** — All functionality operable by keyboard (tool selection, colour, page nav,
  undo/redo, insert, export). Freehand path input itself is exempt as an "essential" analog gesture,
  but *choosing* tools and *placing/editing* objects must have keyboard paths.
- **2.1.2 No Keyboard Trap (A)** — Focus can always move away from any component via keyboard.
- **2.3.1 Three Flashes or Below Threshold (A)** — Nothing flashes more than 3×/second.
- **2.3.3 Animation from Interactions (AAA, target)** — Motion animation from interactions (brush
  fly-ins, page-turn, zoom) must be disableable; honour Reduce Motion. (AAA — treat as a stretch goal.)
- **2.4.7 Focus Visible (AA)** — A visible keyboard focus indicator on every focusable control.
- **2.4.11 Focus Not Obscured (Minimum) (AA)** — A focused component is not *entirely* hidden by
  author content (sticky toolbars, floating tool pickers, palm-rest overlays). *(2.4.12 Enhanced /
  no part hidden is AAA.)*
- **2.4.13 Focus Appearance (AAA, target)** — Focus indicator ≥ 2 CSS px thick perimeter and ≥ 3:1
  contrast between focused/unfocused states.
- **2.5.1 Pointer Gestures (A)** — Multipoint/path-based gestures (pinch-zoom, two-finger undo,
  lasso) must have a single-pointer, non-path alternative (zoom buttons, undo button, tap-select).
- **2.5.2 Pointer Cancellation (A)** — For pointer actions, the action fires on the **up-event**, or is
  abortable/undoable. Strokes should commit on pen-lift and be cancellable.
- **2.5.7 Dragging Movements (AA)** — Any drag operation (move object, resize handle, reorder pages,
  colour slider) needs a non-dragging alternative (tap-to-select then move buttons, numeric entry).
- **2.5.8 Target Size (Minimum) (AA)** — Interactive targets **≥ 24×24 CSS px** (with spacing
  exceptions). Native platform minimums are larger (see below) — design to the larger value.

### Understandable & Robust
- **4.1.2 Name, Role, Value (A)** — Every control exposes an accessible name, role (button, toggle,
  slider, tab), state, and value to the platform a11y API. This is the crux for custom-drawn toolbars.

---

## 3. Apple (iPadOS) accessibility APIs & features

Apple's Human Interface Guidelines and UIKit expose the mechanisms below; Accessibility Inspector is
the primary audit tool.

### VoiceOver on drawn / custom-canvas content
- The canvas bitmap is opaque to VoiceOver, so expose a **parallel tree of `UIAccessibilityElement`s**
  (one per note object / stroke group / shape) with `accessibilityLabel`, `accessibilityValue`,
  `accessibilityHint`, `accessibilityTraits`, and `accessibilityFrame` (or `accessibilityFrameInContainerSpace`)
  so VoiceOver can focus and describe each object's location.
- Attach **`UIAccessibilityCustomAction`s** for object-level operations that would otherwise be gestures
  (delete, duplicate, change colour, bring-to-front, convert-to-text). VoiceOver surfaces these in the
  actions rotor.
- Consider a **custom rotor** (`UIAccessibilityCustomRotor`) to let VoiceOver users jump between object
  types (e.g. "headings", "images", "handwriting blocks").
- Post `UIAccessibility` notifications (layout-changed / screen-changed / announcement) when the canvas
  content changes so VoiceOver re-syncs.

### Motor / alternative input
- **Voice Control** — every interactive element must be *appropriately labelled* so users can say
  "tap Pen", "tap Undo", etc.; verbal text entry must reach note fields.
- **Full Keyboard Access** — support hardware-keyboard navigation and shortcuts for all app functions.
- **Switch Control** & **AssistiveTouch** — test that the whole app is reachable via scanning focus and
  the AssistiveTouch menu; ensure a logical focus order.

### Vision / cognition system settings (honour all)
- **Dynamic Type** — support text enlargement (Apple guidance: at least ~140% on iPad); use
  `UIFontMetrics`; default body 17pt / 11pt minimum recommended.
- **Reduce Motion** — read `UIAccessibility.isReduceMotionEnabled` and dampen page turns, zoom, and
  brush animations; prefer fades over directional transitions.
- **Increase Contrast** / **Darker System Colors** — provide a high-contrast variant when enabled.
- **Differentiate Without Color** — pair colour with shapes/labels.
- **Bold Text**, **Reduce Transparency**, and system colours that auto-adapt to light/dark and a11y
  settings should be honoured.

### Sizing & spacing (Apple targets, stricter than WCAG)
- **Minimum tap target 44×44 pt** (28×28 pt absolute floor); ~12 pt padding around bezel controls and
  ~24 pt around borderless controls to avoid mis-taps.
- Contrast per WCAG AA: 4.5:1 body text, 3:1 for ≥18pt and bold.

### PencilKit & Scribble
- `PKCanvasView` (drawing surface) inherits `UIScrollView`'s standard UIKit accessibility, accepts
  Apple Pencil and finger input (finger input via a deprecated `allowsFingerDrawing`; use
  `drawingPolicy`), and supports **Scribble** (handwriting into text fields via `UIScribbleInteraction`
  / "Customizing Scribble with Interactions"). PencilKit does **not** itself publish a VoiceOver
  description of drawn strokes — the parallel accessibility tree above is required.
- Captions: provide captions/transcripts for any audio content in-app.

---

## 4. Android accessibility APIs & features

### Custom-view / canvas semantics
- For a custom drawing `View`, describe its logical children with a **virtual view hierarchy**. Use
  **`ExploreByTouchHelper`** (a ready-made `AccessibilityNodeProvider`) to map each note object/stroke
  group to an `AccessibilityNodeInfo` with `contentDescription`, bounds, `focusable`, role/state, and
  **custom accessibility actions** (`AccessibilityNodeInfo.AccessibilityAction`) for delete/move/etc.
- Send `AccessibilityEvent`s on state/content changes so TalkBack re-reads.
- In **Compose**, use `Modifier.semantics { contentDescription; stateDescription; role; customActions = listOf(CustomAccessibilityAction(...)) }`,
  `mergeDescendants` to group related controls, and `onLongClickLabel` to describe gestures.
- Decorative elements: `contentDescription = null` (Compose) so TalkBack skips them.

### Services to support & test against
- **TalkBack** (screen reader), **Switch Access** (motor), **Voice Access** (voice control). All app
  functions must be reachable and labelled for each.

### System settings to honour
- **Large text / font scaling** — size all text in **sp**; layouts must not break at large scales.
- **Colour correction** and **colour inversion** — do not rely on colour alone; test in colour-blind
  and grayscale modes.
- **Magnification** — layouts remain usable when magnified.
- Captions and media controls (pause/stop, volume) for any audio.

### Sizing
- **Minimum touch target 48dp** (Material guidance) — stricter than WCAG's 24 CSS px.
- Contrast: minimum 4.5:1 for text/controls vs background.

### Testing
- **Accessibility Scanner** (on-device audit) and Play Console pre-launch accessibility checks.

---

## 5. Flutter `Semantics` (shared layer, web + mobile)

Flutter builds a single semantics tree that maps to VoiceOver, TalkBack, and (on web) the DOM/ARIA.

- **`Semantics`** widget — set `label`, `value`, `hint`, `button`, `enabled`, `onTap`, `header`,
  `textField`, `slider`, etc. for every custom control.
- **Custom canvas** — `CustomPaint` supports a **`semanticsBuilder`** returning
  `CustomPainterSemantics` nodes, so each painted object (stroke group, shape, handle) becomes an
  addressable semantics node with its own rect, label, and actions — this is the Flutter equivalent of
  the iOS accessibility-element tree and Android virtual hierarchy.
- **`MergeSemantics`** — combine a cluster (icon + label) into one AT stop.
- **`ExcludeSemantics`** / `BlockSemantics` — hide decorative ink from AT.
- **`SemanticsService.announce(message, textDirection)`** — announce transient events ("Saved",
  "Converted to text", "Page 3 of 10").
- **Text scaling** — read `MediaQuery.textScaler` (formerly `textScaleFactor`) and keep layouts legible
  at large scale.
- **Flutter web** — Flutter emits a semantics DOM overlay for screen readers; verify keyboard focus and
  ARIA roles reach the browser AT (historically the weakest surface — test explicitly).
- **Release checklist (Flutter):** contrast ≥ 4.5:1; tap targets ≥ 48×48; every control describable to
  a screen reader; no unexpected context changes on input; test colour-blind/grayscale; important
  actions undoable; no no-op handlers.

---

## 6. Web app: keyboard-only navigation & accessible `<canvas>`

The HTML `<canvas>` bitmap is **invisible to assistive technology** — MDN explicitly advises avoiding
canvas for accessible content and, where unavoidable, building a parallel accessible structure.

Requirements:
- **Fallback content** between `<canvas>…</canvas>` tags: a text description that screen readers and
  no-JS/older browsers read.
- **Parallel accessible DOM / sub-DOM**: for each canvas object render a real, focusable DOM element
  (button/link/list item) positioned off-canvas or as an overlay, with correct roles and `aria-label`;
  keep it in sync with the drawing model. This is how keyboard and screen-reader users select, move,
  and edit objects.
- **ARIA**: `role="img"` + `aria-label` for a static illustration; `aria-describedby` linking to a
  longer text description / OCR transcript for note pages.
- **Keyboard**: full tab order, visible focus (WCAG 2.4.7/1.4.11), no traps (2.1.2), single-key or
  documented shortcuts for tools, arrow-key nudge as the non-drag alternative (2.5.7), and Escape to
  cancel an in-progress action (2.5.2).
- The deprecated canvas *hit-regions* API should **not** be relied on — use the parallel DOM instead.

---

## 7. Inclusive reading & vision features

### Dyslexia-friendly fonts
- **OpenDyslexic** — free typeface designed against common dyslexia symptoms (heavier "weighted"
  letter bottoms and more distinct letterforms to reduce flipping/swapping). Licensed **SIL Open Font
  License** (free for commercial, apps, ebooks, web). Downloadable and embeddable via standard
  `@font-face` / platform font APIs. Evidence of effectiveness is mixed/self-reported — offer it as an
  *option*, not a default.
- **Lexend** — variable font aimed at **reading proficiency and reduced visual stress** (Dr. Bonnie
  Shaver-Troup's research: reduce cognitive noise, improve character recognition, reduce crowding).
  Exposes an **`LXND` variable axis (0–100)** and seven presets (Deca…Zetta) to expand spacing/scale;
  open-source (on GitHub and Google Fonts, SIL OFL). A cited study of third-graders showed most read
  faster with Lexend than Times New Roman (~+19.8 WCPM; p≈0.014).
- **Requirement:** ship a **reading-font picker** including OpenDyslexic and Lexend, applied to typed
  text and OCR transcripts (not to the raw ink), with user-adjustable size and spacing that satisfy
  WCAG 1.4.12.

### Immersive Reader-like reading mode
Model an optional distraction-free reading view (for typed text and OCR transcripts of notes) on
Microsoft Immersive Reader's proven feature set:
- **Read Aloud** — text-to-speech with word highlighting, adjustable speed, voice choice.
- **Text preferences** — text size, increased character/word/line spacing, font choice, page/theme
  colours (reduced-eye-strain backgrounds), adjustable column width / line length.
- **Grammar options** — syllable breaking; parts-of-speech highlighting (nouns/verbs/adjectives/adverbs).
- **Reading preferences** — **Line Focus** (highlight 1/3/5 lines), **Picture Dictionary**, and
  **Translation** (word or whole document; Immersive Reader supports 100+ translation languages, 40+
  read-aloud).

### Colour-blind-safe ink palettes
Base the default multi-colour ink palette on a **Color Universal Design (Okabe–Ito)** set, which stays
distinguishable for protanopia/deuteranopia/tritanopia:
- Palette colours: **black, orange, sky blue, bluish green, yellow, blue, vermillion, reddish purple.**
- Commonly cited Okabe–Ito hex values (exact per-colour hex not returned by the fetched jfly table —
  **verify against source**): `#000000, #E69F00, #56B4E9, #009E73, #F0E442, #0072B2, #D55E00, #CC79A7`.
  The jfly source explicitly gives vermillion as RGB 100/32/0 (≈`#FF5100`/`#FF2000` context) — treat
  the hex list as canonical-community values pending verification.
- Design rules from the source: **do not use colour alone**; add shape/position/line-type/pattern
  redundancy and direct labels; **avoid red-green pairings** (use magenta + green instead).
- **Requirement:** default ink swatches are colour-blind-safe; provide colour *names/labels* in the
  picker (satisfies 1.4.1 and helps VoiceOver), and a colour-blind simulation/preview mode.

---

## 8. Motor & handedness features

### Stroke stabilisation (motor-impairment aid)
Offer selectable smoothing so shaky input still produces clean lines, modelled on Krita's freehand
brush modes:
- **No Smoothing** (raw), **Basic Smoothing** (light), **Weighted Smoothing** (adjustable distance /
  stroke-ending pull), and **Stabilizer** (averages recent input; the line "catches up" to a cursor
  that leads the stroke, with a **delay/dead-zone radius** for sharp corners).
- Additional levers: sample count scaled by speed (more smoothing when slow, less when fast), sensor
  averaging (pressure/tilt/speed), finish-line assurance.
- **Requirement:** a "line steadiness / stabilisation" slider in pen settings, off by default,
  independent of pen vs finger, with a live preview.

### Left-handed mode
- Provide a **left/right-handed interface toggle** that mirrors the tool sidebar / brush-size &
  opacity sliders / undo-redo to the opposite edge (Procreate pattern: *Actions → Prefs →
  Right-hand interface*, plus a movable sidebar for vertical placement).
- **Requirement:** a handedness setting that relocates primary controls and the palm-rejection zone;
  it must not break keyboard focus order or RTL mirroring logic.

---

## 9. Screen-reader description of handwritten notes via OCR

Turn ink into text so screen readers, search, and reading mode can consume notes.

- **Cross-platform / Android:** **ML Kit Digital Ink Recognition** transcribes strokes to text on-device
  across **300+ languages** plus emoji and shapes (see §11 for Indic/CJK coverage). Feed its output as
  the note's `contentDescription` / semantics label and into the reading-mode transcript.
- **iOS:** **Vision** `VNRecognizeTextRequest` performs on-device OCR of *rendered* images (accurate vs
  fast `recognitionLevel`; `supportedRecognitionLanguages(for:revision:)` enumerates languages;
  Chinese + English supported). Note: Vision's documented focus is **printed** text (handwriting not
  explicitly documented), so prefer digital-ink recognition on the live stroke data where available and
  fall back to Vision OCR on the rasterised page.
- **Requirement:** every ink page exposes an OCR-derived text alternative (WCAG 1.1.1); the transcript
  is announced/available to VoiceOver/TalkBack and shown in reading mode; OCR runs on-device
  (privacy); user can correct the transcript.

---

## 10. Captions for audio

Both Apple and the Flutter checklist require captions/transcripts for audio, and captions are a
declarable App Store label:
- Any audio note recording, embedded video, or tutorial must offer **time-synchronised captions**
  and/or a transcript.
- Provide standard media controls (play/pause/stop, volume) reachable by keyboard and AT (Android
  guidance).
- **Requirement:** audio recordings support live/after-the-fact transcription (reuse the on-device
  speech pipeline) surfaced as captions + searchable transcript.

---

## 11. Internationalization (i18n)

### RTL layouts
- Flutter's `flutter_localizations` auto-mirrors Material/Cupertino widgets for RTL locales (Arabic,
  Hebrew, Urdu, Persian). Use `Directionality` / `TextDirection`, and directional insets/alignment
  (`EdgeInsetsDirectional`, `AlignmentDirectional.centerStart`) instead of hard left/right.
- The **ink canvas itself is not mirrored** (a drawing is a drawing), but *chrome* around it, page
  order, and text runs must respect RTL. Left-handed mode and RTL mirroring must be independent
  settings that compose correctly.

### Indic-script & CJK handwriting recognition (coverage via ML Kit Digital Ink)
Confirmed BCP-47 coverage from ML Kit base models:
- **Devanagari family:** Hindi `hi`, Marathi `mr`, Nepali `ne`, Sanskrit `sa-Deva-IN`, Konkani `kok`,
  Dogri `doi-Deva`, Kashmiri `ks-Deva`, Santali `sat-Deva`, Sindhi `sd-Deva`.
- **Other Indic:** Bengali `bn`, Gujarati `gu`, Kannada `kn`, Malayalam `ml`, Punjabi/Gurmukhi `pa`,
  Odia `or`, Tamil `ta`, Telugu `te`.
- **CJK:** Chinese Simplified `zh-Hani-CN`, Traditional/HK/TW `zh-Hani-HK` / `zh-Hani-TW`, Japanese
  `ja`, Korean `ko`.
- **Arabic script (RTL):** Arabic `ar`, Persian `fa`, Urdu `ur`.
- **Non-language recognisers:** emoji `zxx-Zsye-x-emoji`, autodraw `zxx-Zsym-x-autodraw`, shapes
  `zxx-Zsym-x-shapes` (RECTANGLE/TRIANGLE/ARROW/ELLIPSE).
- **Requirement:** ship Devanagari + Tamil + Telugu + Bengali + Gujarati + Kannada + Malayalam +
  Punjabi + Odia (India priority), plus CJK and Arabic-script recognisers, downloadable on demand to
  keep binary size down.

### CJK & complex-text input
- Support platform IMEs (Pinyin/Zhuyin, Kana/Kanji, Hangul) in all typed fields; do not intercept
  composition events. Declare `zh-Hans`/`zh-Hant` as distinct locales
  (`Locale.fromSubtags(languageCode:'zh', scriptCode:'Hans'|'Hant')`).
- Ensure fonts include full CJK + Indic glyph coverage; test line-breaking and vertical rhythm.

### Locale-aware dates, numbers & ₹ pricing
- Format via `intl` — `DateFormat` (yMd, yMMMMd, etc.) and `NumberFormat`
  (`decimalPattern`, `currency`, `simpleCurrency`, `compactCurrency`, `percentPattern`). Never
  hand-format dates/numbers.
- **₹ / India:** format currency with `NumberFormat.simpleCurrency(locale: 'hi_IN' | 'en_IN')` so the
  **₹** symbol and the **Indian digit grouping (lakh/crore, e.g. 1,00,000)** come from the locale
  rather than hard-coding — this is locale-driven in ICU/`intl` **(grouping behaviour is a property of
  the en_IN/hi_IN locale; confirm on-device output)**.
- **Store pricing:** set localized price tiers per storefront (App Store / Play Console) so Indian
  users see ₹ prices with local rounding, rather than an FX-converted USD figure.

### Flutter intl / ARB workflow
1. Add `flutter_localizations` (SDK) + `intl`; set `flutter: generate: true` in `pubspec.yaml`.
2. Create **`l10n.yaml`** (`arb-dir: lib/l10n`, `template-arb-file: app_en.arb`,
   `output-localization-file: app_localizations.dart`, `output-class: AppLocalizations`,
   `use-escaping: true`).
3. Author **ARB** files (`app_en.arb` template + `app_<locale>.arb`) with `@`-metadata,
   `placeholders` (typed, with `format` for dates/numbers/currency), ICU **plurals**
   (`{count, plural, =0{…} =1{…} other{…}}`) and **select/gender** (`{gender, select, …}`).
4. Generate with `flutter gen-l10n` (or `flutter run`).
5. Wire `localizationsDelegates` (`AppLocalizations.delegate` + Global Material/Cupertino/Widgets
   delegates) and `supportedLocales`; read strings via `AppLocalizations.of(context)!.key(args)`.
6. Track `untranslated-messages-file`; consider `use-deferred-loading: true` for web to lazy-load
   locales.

### Pseudo-localisation testing
Adopt pseudo-localisation early (before real translation) to catch i18n defects:
- **Expand** English strings by **~40%** (extremes 200–400%) to expose truncation/layout breaks;
  short 1–2 word strings grow proportionally more.
- **Accent/transform** Latin text (e.g. `a`→`αäáàāǎ`) and pad with Greek/Cyrillic/Asian/Indic glyphs to
  reveal font-coverage and clipping issues.
- **Wrap** each string in delimiters (e.g. `^…^`) to instantly reveal truncation and concatenation.
- **Pseudo-locales:** use ICU **`en-XA`** (accents) and **`en-XB`** (bidirectional/RTL mirror) — never
  hijack a real locale tag. Also test number/date/currency parsing with a challenging pseudo-locale.
- **Requirement:** a CI pseudo-locale build (en-XA/en-XB) that must render without truncation,
  overlap, hard-coded English, or broken mirroring before any release.

---

## 12. Store accessibility "nutrition" labels

### Apple App Store — Accessibility Nutrition Labels (2025)
Apple added **Accessibility Nutrition Labels** to App Store product pages. Developers can declare
support for a fixed set of features; the governing rule is that **users must be able to complete *all*
of the app's common tasks** (primary functionality, first-launch, login, purchases, settings) using
that feature before it may be claimed. The **nine declarable features**:
1. **VoiceOver** — navigate/explore via gestures, keyboard, braille, speech output.
2. **Voice Control** — tap/swipe/type by voice (n/a on tvOS/watchOS).
3. **Larger Text** — increases text to **200%+** (n/a on Mac).
4. **Dark Interface** — dark colour scheme.
5. **Differentiate Without Color Alone.**
6. **Sufficient Contrast.**
7. **Reduced Motion.**
8. **Captions** — time-synchronised text for audio/video.
9. **Audio Descriptions** — time-synchronised narration of video.
- **Requirement:** design so we can *truthfully* declare VoiceOver, Voice Control, Larger Text, Dark
  Interface, Differentiate Without Color, Sufficient Contrast, Reduced Motion, and Captions — each
  gated on completing all common tasks.

### Google Play
Google Play has **no equivalent formal "accessibility nutrition label"** at time of writing
**(unverified)**; rely on Play Console **pre-launch accessibility reports** and **Accessibility
Scanner** to substantiate accessibility quality, and keep the store description's accessibility claims
accurate.

---

## Requirements checklist

Testable criteria; PASS/FAIL each per platform (iPadOS / Android / Web).

### WCAG 2.2 AA (all platforms)
- [ ] Body text contrast ≥ 4.5:1; large text (≥18pt/14pt bold) and UI/graphics/focus rings ≥ 3:1. *(1.4.3, 1.4.11)*
- [ ] Text scales to 200% and reflows at 320 CSS px width with no 2-D scroll or loss. *(1.4.4, 1.4.10)*
- [ ] Text-spacing overrides (LH 1.5×, para 2×, letter 0.12×, word 0.16×) cause no clipping. *(1.4.12)*
- [ ] No information conveyed by colour alone; ink colours are labelled/shaped. *(1.4.1)*
- [ ] Every interactive target ≥ 24×24 CSS px (web); ≥ 44×44 pt (iPadOS); ≥ 48dp (Android). *(2.5.8)*
- [ ] All multipoint/path gestures have single-pointer alternatives; all drag ops have non-drag
      alternatives (tap-select + nudge/numeric). *(2.5.1, 2.5.7)*
- [ ] Pointer actions commit on up-event and are cancellable/undoable. *(2.5.2)*
- [ ] Full keyboard operability for tools, colour, nav, edit, export; no keyboard traps. *(2.1.1, 2.1.2)*
- [ ] Visible focus indicator (≥2px, ≥3:1) on every control; focus never fully obscured by chrome. *(2.4.7, 2.4.11, 2.4.13 target)*
- [ ] Nothing flashes >3×/s; all interaction animations disable under Reduce Motion. *(2.3.1, 2.3.3 target)*
- [ ] Every control exposes name/role/state/value to the platform a11y API. *(4.1.2)*
- [ ] Every note/object/image has a text alternative (title + OCR transcript + alt). *(1.1.1, 1.3.1)*

### Canvas semantics
- [ ] iPadOS: parallel `UIAccessibilityElement` tree with frames, labels, and `UIAccessibilityCustomAction`s + custom rotor.
- [ ] Android: `ExploreByTouchHelper` virtual view hierarchy with per-object nodes + custom actions + change events.
- [ ] Web: parallel accessible DOM synced to the model + `<canvas>` fallback content + `role`/`aria-label`/`aria-describedby`.
- [ ] Flutter: `CustomPaint.semanticsBuilder` emits `CustomPainterSemantics` per object; decorative ink wrapped in `ExcludeSemantics`; transient events via `SemanticsService.announce`.

### Platform system-setting adoption
- [ ] iPadOS: Dynamic Type (≥140%), Reduce Motion, Increase/Darker Contrast, Differentiate Without Color, Bold Text, Reduce Transparency honoured; passes Accessibility Inspector.
- [ ] Android: text in sp scales without breakage; usable under colour correction/inversion, magnification; passes Accessibility Scanner.
- [ ] Verified with VoiceOver, TalkBack, and a desktop screen reader (NVDA/JAWS) end-to-end for a common-task flow.
- [ ] Verified with Voice Control/Voice Access and Switch Control/Switch Access for tool selection + object edit.

### Inclusive reading & vision
- [ ] Reading-font picker includes OpenDyslexic and Lexend (applied to typed text + OCR transcript), with size/spacing controls meeting 1.4.12.
- [ ] Reading mode offers Read Aloud (word highlight, speed, voice), spacing/theme/column controls, line focus, syllables, parts-of-speech, picture dictionary, translation.
- [ ] Default ink palette is Okabe–Ito colour-blind-safe; swatches show colour names; colour-blind preview available.

### Motor & handedness
- [ ] Stroke-stabilisation slider (off by default) with live preview; independent for pen/finger.
- [ ] Left/right-handed toggle mirrors primary controls + palm-rejection zone without breaking focus order or RTL.

### OCR / audio
- [ ] On-device OCR transcript per ink page (ML Kit digital ink primary; Vision OCR fallback on iOS); announced to screen readers; user-editable.
- [ ] Audio recordings/video provide time-synced captions + searchable transcript; media controls keyboard/AT reachable.

### i18n
- [ ] RTL locales fully mirror app chrome (Directionality/EdgeInsetsDirectional); canvas content unmirrored; RTL ⟂ left-handed mode compose correctly.
- [ ] Handwriting recognisers shipped: Devanagari, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Punjabi, Odia, CJK, Arabic-script — downloadable on demand.
- [ ] Platform IMEs (Pinyin/Kana-Kanji/Hangul) work in all text fields; zh-Hans/zh-Hant distinct locales; full CJK+Indic glyph coverage.
- [ ] All dates/numbers via intl `DateFormat`/`NumberFormat`; ₹ via `simpleCurrency(locale:'en_IN'|'hi_IN')` with lakh/crore grouping; store price tiers set per-storefront.
- [ ] Flutter ARB/gen-l10n pipeline in place (l10n.yaml, typed placeholders, ICU plurals/select, untranslated-messages tracking).
- [ ] CI pseudo-locale build (en-XA + en-XB, +40% expansion, delimiter wrapping) passes with no truncation/overlap/hard-coded strings/broken mirroring.

### Store labels
- [ ] App can truthfully declare Apple Accessibility Nutrition Labels: VoiceOver, Voice Control, Larger Text, Dark Interface, Differentiate Without Color, Sufficient Contrast, Reduced Motion, Captions — each gated on completing all common tasks.
- [ ] Play: pre-launch accessibility report + Accessibility Scanner clean; store copy's accessibility claims accurate.

---

## Sources

- WCAG 2.2 (W3C Recommendation): https://www.w3.org/TR/WCAG22/
- Apple Human Interface Guidelines — Accessibility (via reader proxy): https://developer.apple.com/design/human-interface-guidelines/accessibility
- Apple PencilKit `PKCanvasView` (via reader proxy): https://developer.apple.com/documentation/pencilkit/pkcanvasview
- Apple Vision — Recognizing Text in Images (via reader proxy): https://developer.apple.com/documentation/vision/recognizing-text-in-images
- App Store Connect — Overview of Accessibility Nutrition Labels (via reader proxy): https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels/
- Android Developers — Make custom views more accessible: https://developer.android.com/guide/topics/ui/accessibility/custom-views
- Android Developers — Accessibility principles: https://developer.android.com/guide/topics/ui/accessibility/principles
- Flutter — Accessibility: https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility
- Flutter — Internationalization: https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization
- Google ML Kit — Digital Ink Recognition languages: https://developers.google.com/ml-kit/vision/digital-ink-recognition/languages
- Google ML Kit — Digital Ink Recognition base models: https://developers.google.com/ml-kit/vision/digital-ink-recognition/base-models
- Microsoft Learn — Immersive Reader product guide: https://learn.microsoft.com/en-us/training/educator-center/product-guides/immersive-reader/
- Microsoft Support — Use Immersive Reader in Word (via reader proxy): https://support.microsoft.com/en-us/office/use-immersive-reader-in-word-a857949f-c91e-4c97-977c-a4efcaf9b3c1
- Microsoft Learn — Pseudolocalization: https://learn.microsoft.com/en-us/globalization/methodology/pseudolocalization
- OpenDyslexic (via reader proxy): https://opendyslexic.org/
- Lexend (via reader proxy): https://www.lexend.com/
- Okabe & Ito — Color Universal Design / colorblind-safe palette: https://jfly.uni-koeln.de/color/
- Krita docs — Freehand brush (stabilizer/smoothing): https://docs.krita.org/en/reference_manual/tools/freehand_brush.html
- Procreate Handbook — Interface (left/right-handed) (via reader proxy): https://help.procreate.com/procreate/handbook/interface-gestures/interface
- MDN — HTML `<canvas>` element (accessibility): https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas
