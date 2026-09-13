# Backlog — area: theming

9 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree


---

## Issues

### SN-AND-016

<a id="sn-and-016"></a>

**Reconcile Material 3 dynamic colour with the 17 Sane Notes looks**

| Field | Value |
|---|---|
| GitHub | #69 |
| Type | feature |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | theming, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-AND-012](compat.md#sn-and-012) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Android 16 ships Material 3 Expressive with dynamic colour (wallpaper-derived), spring motion and shape morph. The Sane Notes visual identity — 17 looks, Sane Sage, tokens in docs/design/tokens.json — is the source of truth; M3 Expressive is the underlying motion/interaction grammar and the fallback for platform chrome (system dialogs, share sheets), NOT a re-skin of the brand (docs/platform/android.md §7). This issue defines exactly where dynamic colour is allowed to bleed in and where the looks win.

#### Scope
**In:** adopting M3 Expressive spring motion and component grammar where it does not conflict with the design system; letting dynamic colour theme only platform chrome (system dialogs, share sheets, notification styling); ensuring the 17 looks fully own the in-app surfaces regardless of the device's dynamic palette.
**Out:** the token->ThemeExtension encoding itself (SN-DS-002, consumed here); the look-switcher UI (SN-SET-*); non-Android theming.

#### Acceptance criteria
- [ ] In-app surfaces render strictly from the selected look's tokens (SN-DS-002) — the device's wallpaper-derived dynamic palette never changes an in-app colour.
- [ ] Platform chrome that Android themes automatically (share sheet, system dialogs, notification accents) may use dynamic colour without clashing with the active look.
- [ ] M3 Expressive spring motion is adopted for platform-consistent transitions only where it does not override a design-system-specified motion, and respects Reduce Motion.
- [ ] All 17 looks + light/dark render identically to the iPad/Web surfaces (golden parity); enabling Android dynamic colour system-wide does not alter any golden.
- [ ] The interplay is documented so future work knows what dynamic colour may and may not touch.

#### Technical notes
Dart theming from docs/design/tokens.json via the sane_ui ThemeExtension (SN-DS-002); do not derive in-app ColorScheme from dynamicColorScheme. Platform chrome uses the OS theme. M3 Expressive motion via the design system's motion tokens (docs/design/design-system.md). docs/platform/android.md §7.

#### Security & privacy
None beyond baseline: theming only, no secrets, no logging, no network egress.

#### UX notes
The brand stays consistent across every device and look — a user's Sane Notes looks like Sane Notes, not like their wallpaper (docs/platform/android.md §7). Platform surfaces still feel native. Contrast stays AA in every look; motion honours the user's Reduce Motion setting.

#### Test plan
app/test/theming/dynamic_colour_isolation_test.dart (in-app colours unaffected by a simulated dynamic palette); golden tests across all 17 looks + light/dark with dynamic colour toggled; a manual comparison of the share sheet vs an in-app surface on Android 16.

#### Dependencies
SN-DS-002 (tokens as ThemeExtension), SN-AND-012 (adaptive layout host).

#### Definition of done
- [ ] Code + tests merged, CI green (dart format, dart analyze --fatal-infos, arch-lint, unit/widget/golden, Semgrep, mobsfscan, gitleaks/trufflehog, OSV-Scanner)
- [ ] CodeQL runs over the Kotlin/native layer with no new high findings
- [ ] Docs/ADR updated if behaviour or architecture changed (docs/platform/android.md kept in sync)
- [ ] Reviewed against docs/security/secure-coding-checklist.md; Security & privacy section IDs filled

---

### SN-DS-011

<a id="sn-ds-011"></a>

**Implement SaneLookScope themed root with look and dark-mode switching**

| Field | Value |
|---|---|
| GitHub | #226 |
| Type | feature |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | theming, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

`docs/design/component-inventory.md` §1 defines `SaneLookScope` as the themed root: it provides the `SaneLook` `ThemeExtension` for `(lookId, mode)` and swaps look/mode by replacing the extension on `ThemeData`, so every descendant reads `Theme.of(context).extension<SaneLook>()`. `docs/design/ux-principles.md` §7 requires dark mode to be a **separate switch** (every look ships a full night palette) and ink to flip to `DARK_INK[i]` **by index at paint time**, never by rewriting the document. This scope is the single place look and mode are applied; without it no component can be themed.

#### Scope

**In:** `SaneLookScope` widget wrapping `MaterialApp`/`Theme` and installing the correct generated `SaneLook` into `ThemeData.extensions`; a `SaneLookController` (or accepting look/mode from an `app/` Riverpod provider — the scope only reads) exposing `lookId` and `mode` (light/dark/system); resolution of `system` mode from `MediaQuery.platformBrightness`; exposure of the shared drawing constants and an `inkColor(int index)` helper that returns `INK[i]` or `DARK_INK[i]` by current mode; a documented rule that switching look/mode does not animate a palette cross-fade (snap, per [SN-DS-002](design-system.md#sn-ds-002) `lerp`).

**Out:** the theme-picker UI ([SN-DS-015](theming.md#sn-ds-015)), persistence of the choice (an `app/`/settings concern), per-notebook theming scope, glass ([SN-DS-012](theming.md#sn-ds-012)), ground painting ([SN-DS-013](theming.md#sn-ds-013)) and wallpaper ([SN-DS-014](theming.md#sn-ds-014)) which this scope hosts but which are their own issues.

#### Acceptance criteria

- [ ] Setting `(lookId, mode)` re-skins the entire subtree; a widget reading `extension<SaneLook>()` sees the new tokens on the next build.
- [ ] `mode = system` follows OS brightness live and updates on OS change without a restart.
- [ ] `inkColor(i)` returns the light or dark ink for index i by current mode; switching mode does not mutate any stored stroke — the same document reads correctly in both modes (`ux-principles.md` §7).
- [ ] Highlighter colours do NOT invert (shared `HL`), verified.
- [ ] Look/mode change does not blend palettes (no whole-screen colour tween); transitions are handled per [SN-DS-025](design-system.md#sn-ds-025) (cross-fade under reduce-motion).
- [ ] `pp`/`pl` paper tokens darken in dark mode (no forced white page).

#### Technical notes

File `packages/sane_ui/lib/src/theme/sane_look_scope.dart`. Read the 34 generated const looks from [SN-DS-002](design-system.md#sn-ds-002). Do not own state beyond what's passed in — per ADR-0003 dependencies flow through Riverpod in `app/`; the scope is a pure reader/installer. `system` brightness via `MediaQuery`/`WidgetsBindingObserver`. Ink inversion contract from `ux-principles.md` §7 and `design-system.md` “Shared drawing constants”.

#### Security & privacy

None beyond baseline: applies design tokens only; no PII, no logging, no storage (persistence lives in settings/`app/`). No network.

#### UX notes

Enables every screen in `design/Sane Notes.dc.html` to render in any of the 17 looks and in light/dark. Dark mode must not recolor PDFs ([SN-DS-014](theming.md#sn-ds-014)/editor concern) and must keep highlights legible. Respect “do not auto-switch mode by time of day unless opted in” (`ux-principles.md` §7). A11y: mode/look changes must not move focus or reset scroll.

#### Test plan

Widget: `packages/sane_ui/test/theme/sane_look_scope_test.dart` — pump a probe widget, switch look/mode, assert the read tokens change and that `inkColor(i)` flips by mode while a stored index is unchanged; `system` mode reacts to a faked `platformBrightness`. Golden: a two-panel light/dark render of one probe surface per family.

#### Dependencies

[SN-DS-002](design-system.md#sn-ds-002).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-012

<a id="sn-ds-012"></a>

**Implement the glass backdrop-filter system for translucent looks**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | theming, design-system, perf |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DS-011](theming.md#sn-ds-011) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

Glassmorphism sets `glass: blur(18px) saturate(1.3)` and Y2K sets `blur(12px)`, with translucent `sf`/`sf2` (rgba) surfaces (`docs/design/design-system.md` §4.5, §4.14, §9.1). `design-system.md` “Flutter” requires mapping `glass` to a `BackdropFilter(ImageFilter.blur(...))`, approximating `saturate` with a `ColorFilter.matrix`, and applying **no filter where `glass == none`** (the other 15 looks). This is a shared helper every glass-capable surface uses so blur is consistent and performant.

#### Scope

**In:** a `SaneGlass` helper / `SaneSurface` mixin that parses the `glass` token to a blur sigma + optional saturation matrix and wraps content in a `BackdropFilter` clipped to the surface's rounded rect; a no-op fast path when `glass == none` (no `BackdropFilter` inserted, to avoid the cost); a saturation `ColorFilter.matrix` approximation; guarding blur behind a `RepaintBoundary` so it doesn't thrash unrelated layers.

**Out:** the surface widget itself ([SN-DS-016](design-system.md#sn-ds-016)), wallpaper-mode translucency ([SN-DS-014](theming.md#sn-ds-014), a distinct 84%/22px effect), and the web CSS `--glass` variable ([SN-DS-008](design-system.md#sn-ds-008) already emits it; CSS applies backdrop-filter natively).

#### Acceptance criteria

- [ ] Glassmorphism and Y2K surfaces show a real backdrop blur (18/12 px) over the ground; the 15 non-glass looks insert no `BackdropFilter`.
- [ ] `saturate(1.3)` is visibly approximated (a colour-matrix), not ignored.
- [ ] Blur is clipped to the surface radius `--r` (no bleed past corners).
- [ ] Adding glass does not drop the writing/scroll frame budget on a mid device — a `RepaintBoundary` isolates it; measured no regression beyond the perf budget (CLAUDE.md §8; `docs/platform/performance-budgets.md`).
- [ ] Falls back gracefully where backdrop filters are unsupported (web/older) — surface stays legible (raise `sf` opacity).

#### Technical notes

File `packages/sane_ui/lib/src/theme/sane_glass.dart`. Parse the `glass` string (`blur(Npx)` + optional `saturate(x)`); build `ImageFilter.blur(sigmaX/Y)` (sigma ≈ px/2 as a starting mapping — tune to match the mockup) and a saturation matrix. Impeller on mobile (ADR-0001). Keep the filter subtree small; never place it on the ink draw path (CLAUDE.md §8). See `design-system.md` “Flutter” glass bullet and `ux-principles.md` §9.1.

#### Security & privacy

None beyond baseline: a visual filter over already-visible content; no data flow, no logging, no network.

#### UX notes

Glass is core to two looks' identity (frosted panels over the soft gradient ground). Text on a frosted surface must still meet contrast — this composes with [SN-DS-006](design-system.md#sn-ds-006) adjusted tokens and the wallpaper contrast clamp ([SN-DS-014](theming.md#sn-ds-014)); `accessibility.md` §4.2 wallpaper rule. Under reduce-motion nothing here animates (blur is static). Verify Cyberpunk/Glass toast contrast (`accessibility.md` §10).

#### Test plan

Golden: `packages/sane_ui/test/goldens/glass_surface_test.dart` renders a glass surface over a gradient ground in Glass + Y2K (light/dark) and a non-glass look (asserting no blur). Perf: a `flutter test` frame-timing probe or a `tools/perf_harness` note that a glass panel over a scrolling list stays within budget.

#### Dependencies

[SN-DS-002](design-system.md#sn-ds-002).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-013

<a id="sn-ds-013"></a>

**Implement the ground-pattern system and SVG paper defs**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | theming, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-011](theming.md#sn-ds-011) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

Several looks paint an app **ground** via `bgi` (+ `bgsz`): Paper dotted grain (`7px 7px`), Skeuomorphism 45° stitching, Neo-Brutalism dotted (`22px 22px`), Retro horizontal rules, Cyberpunk neon grid (`32px 32px`), and Maximalism / Glassmorphism / Y2K soft radial or linear gradient washes; all others `none` (`docs/design/design-system.md` §5 “Ground patterns per look”, §4). Separately, the paper page fills reference **SVG pattern ids** (`url(#ss-lined)`, `#ss-grid`, `#ss-dot`, `#ss-music`, `#ss-flash`) that `design-system.md`/`README.md` §2 require shipping as `<defs>` with **every** client so paper fills resolve. This issue builds the ground painter and the shared SVG defs.

#### Scope

**In:** a `SaneGround` widget/painter that reads the active look's `bgi`/`bgsz` and paints it behind the app: repeating dot/line/stitch patterns (as `CustomPainter` tiles) and CSS gradient washes (`radial-gradient`/`linear-gradient` → Flutter `Gradient`); a `none` fast path; the five paper-pattern `<defs>` (`ss-lined`, `ss-grid`, `ss-dot`, `ss-music`, `ss-flash`) authored once and exposed so both the editor page renderer and the web target ([SN-DS-008](design-system.md#sn-ds-008)) resolve the same fills; parsing of multi-stop gradient strings.

**Out:** the page paper *tint* wash and the editor page background (an editor/`sane_render` concern that consumes these defs), wallpaper mode ([SN-DS-014](theming.md#sn-ds-014)), and glass ([SN-DS-012](theming.md#sn-ds-012)).

#### Acceptance criteria

- [ ] Each look's ground matches the mockup: Paper 7 px dot grain, Neo-Brutalism 22 px dots, Retro rules, Cyberpunk 32 px neon grid, Skeuo 45° stitch, and the three gradient washes; the ~9 `none` looks paint a flat `bg`.
- [ ] `bgsz` tile sizes are honoured (7/22/32 px etc.).
- [ ] The five SVG paper `<defs>` render identical lined/grid/dot/music/flash fills to what the design shows, and the same defs string is exported for the web target.
- [ ] Multi-stop `radial-gradient`/`linear-gradient` washes parse to the correct Flutter gradient (stops, angles, `at x% y%` centers approximated).
- [ ] Grounds cost nothing on `none` looks and are cached (a `Picture`/`RepaintBoundary`), not repainted per frame.

#### Technical notes

Files `packages/sane_ui/lib/src/theme/sane_ground.dart` and `assets/svg/paper_defs.svg` (or a Dart-encoded defs constant). Convert CSS gradients to `RadialGradient`/`LinearGradient`; `at 20% 20%` → `Alignment` center; `transparent 55%` → stop with 0 alpha. Repeating patterns as tiling painters. Ship the SVG defs to Flutter (via `flutter_svg` or a hand-rolled painter) and to web ([SN-DS-008](design-system.md#sn-ds-008)). See `design-system.md` §5 and `README.md` §2 (“Ship the SVG `<defs>` with every client”).

#### Security & privacy

None beyond baseline: the grounds and defs are **our own static assets**, not untrusted SVG — no external SVG is parsed here (avoiding SVG-parser attack surface). No data flow, no logging, no network. (Untrusted image handling is [SN-DS-014](theming.md#sn-ds-014)'s concern.)

#### UX notes

The ground is a big part of a look's character (`design/Sane Notes.dc.html` backgrounds). It sits behind chrome and page; it must never reduce text contrast — chrome surfaces sit on `sf`/`sf2` above the ground. Grounds are decorative → `ExcludeSemantics`. Under reduce-motion nothing animates (grounds are static). Dark mode uses the same `bgi` recipe over the dark `bg`.

#### Test plan

Golden: `packages/sane_ui/test/goldens/ground_looks_test.dart` renders the app ground for all 17 looks (light/dark) and diff-checks the patterned/gradient/none cases. Unit: `paper_defs_test.dart` asserts the five defs ids exist and the gradient parser maps a representative `bgi` correctly.

#### Dependencies

[SN-DS-002](design-system.md#sn-ds-002).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-014

<a id="sn-ds-014"></a>

**Implement wallpaper surface mode with translucency, blur and veil**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | theming, design-system, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-011](theming.md#sn-ds-011) |
| Depends on | [SN-DS-011](theming.md#sn-ds-011), [SN-DS-012](theming.md#sn-ds-012) |
| Security controls | `MASVS-STORAGE-2`, `MASVS-PLATFORM-3`, `CWE-400`, `CWE-409` |
| Extra labels | agent-ready, innovation |

#### Context

Wallpaper mode sets a wallpaper (6 presets Aurora/Dusk/Ink wash/Sand/Meadow/Graphite, or a user upload) behind a tinted veil; **surfaces turn 84% translucent with a 22 px backdrop blur** so ink and text keep contrast, and **uploads are down-sampled to 1600 px and saved on device** (`docs/design/design-system.md` §2 “Wallpaper presets”, §5 “Screens”; `docs/design/component-inventory.md` §8 `SaneWallpaperCard` with Blur 0–40, Veil 0–80 sliders). `accessibility.md` §4.2 requires re-verifying text contrast against the frosted surface and clamping the veil so chrome text never drops below AA. This is the surface-mode compositor; the picker card UI is [SN-DS-015](theming.md#sn-ds-015).

#### Scope

**In:** a wallpaper compositor that paints the active wallpaper (preset CSS gradient or the saved user image) behind the app, applies a tint veil (0–80) and a backdrop blur (0–40, default 22), and makes chrome surfaces 84% translucent over it (composing with [SN-DS-012](theming.md#sn-ds-012)'s glass helper); a contrast **clamp** that limits the effective veil/opacity so `ink`/`mu` on the frosted surface stays ≥ 4.5:1; the image-import path: validate MIME/type/size, decode **off the UI isolate**, resource-cap the decode, downscale to ≤ 1600 px, strip metadata, and save to the app's private storage (path-confined).

**Out:** the preset thumbnails + sliders UI card ([SN-DS-015](theming.md#sn-ds-015)), the settings persistence (`app/`/settings), and the editor page's own tint/paper (editor concern).

#### Acceptance criteria

- [ ] With a wallpaper set, chrome surfaces are 84% translucent with a 22 px blur; ink/text remain legible in all 17 looks × light/dark.
- [ ] The veil slider cannot push chrome text below 4.5:1 — the effective contrast is clamped and a test proves a max-veil setting still passes AA.
- [ ] A user upload is decoded off the UI isolate, capped so a decompression-bomb image cannot exhaust memory, downscaled to ≤ 1600 px, metadata-stripped, and stored in app-private storage; the original path from the picker is never trusted or persisted.
- [ ] A malformed/oversized/wrong-type image fails **closed** into a user-safe toast (“Couldn't use that image — try another”), never a crash.
- [ ] Removing the wallpaper restores the plain look ground ([SN-DS-013](theming.md#sn-ds-013)) with no residue.

#### Technical notes

Files `packages/sane_ui/lib/src/theme/sane_wallpaper.dart` (+ an isolate helper for decode/downscale). Decode via `Isolate.run` (CLAUDE.md §8 “never on the UI isolate”; §7.8 untrusted input: validate, cap, off-isolate, path-confine). Compose translucency with [SN-DS-012](theming.md#sn-ds-012). Contrast clamp reuses [SN-DS-006](design-system.md#sn-ds-006)'s `contrast.dart`. Presets are static CSS gradients from `tokens.json` `wallpapers`. Storage is app-private (a secure-store/file path via the platform, not a world-readable location).

#### Security & privacy

Untrusted-input handling is the crux (CLAUDE.md §7.8): validate type/MIME/size before decode; cap resources before decode (decompression bomb — CWE-400/CWE-409); parse off the UI isolate; strip EXIF/metadata (privacy — MASVS-PRIVACY); confine and canonicalise the storage path (MASVS-STORAGE-2, MASVS-PLATFORM-3); never persist the source URI. The saved wallpaper stays on device (local-first). No logging of the image bytes or path.

#### UX notes

Wallpaper mode is a differentiating calm-personalisation feature (`ux-principles.md` §7 “Wallpaper mode composits correctly in both modes”). The veil/blur sliders let users keep ink legible; the clamp protects them from an unreadable UI. Decorative wallpaper → `ExcludeSemantics`. Empty/error states as toasts, not red text. Must render correctly under both modes and compose with left-handed layout.

#### Test plan

Widget/golden: `packages/sane_ui/test/goldens/wallpaper_mode_test.dart` (a surface over each preset, light/dark, at min/max veil, asserting a legible render). Unit/abuse: `packages/sane_ui/test/theme/wallpaper_import_test.dart` — a hostile image (bomb, wrong MIME, huge) fails closed and does not run on the UI isolate; contrast clamp holds at max veil. Manual: import + set on device.

#### Dependencies

[SN-DS-011](theming.md#sn-ds-011) (scope), [SN-DS-012](theming.md#sn-ds-012) (glass).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-015

<a id="sn-ds-015"></a>

**Build the look switcher UI: theme-card grid, dark toggle, wallpaper card**

| Field | Value |
|---|---|
| GitHub | #227 |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | theming, design-system, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-017](design-system.md#sn-ds-017) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

Users pick a look in Settings → Appearance, shown as a grid of **17 theme cards** grouped by family, each previewing its own surface/button/heading, plus a **dark-mode toggle** and a **wallpaper card** (`docs/design/component-inventory.md` §8: `SaneThemeGrid`, `SaneThemeCard`, `SaneToggle`, `SaneWallpaperCard`). Onboarding shows three looks (`ux-principles.md` §3). The grid is a **radio group of named looks**; each card is **self-styled** — it renders in its own tokens so the user sees the look before choosing it. This is the primary discovery surface for the whole 17-look system.

#### Scope

**In:** `SaneThemeGrid` (17 cards grouped Warm/Clean/Bold/Soft/Raw per `lookOrder`), `SaneThemeCard` (a mini preview rendering a sample surface + button + heading in *that card's* tokens, name label, selected state with a non-colour signal), the dark-mode `SaneToggle` (“Every look has a night version; PDFs keep their original colors”), and `SaneWallpaperCard` (upload + 6 presets, Blur 0–40 / Veil 0–80 sliders, Remove) wiring to [SN-DS-014](theming.md#sn-ds-014). Selection updates the `(lookId, mode, wallpaper)` state (read by [SN-DS-011](theming.md#sn-ds-011)); persistence is delegated to `app/`.

**Out:** the compositing of wallpaper ([SN-DS-014](theming.md#sn-ds-014)), the theme scope ([SN-DS-011](theming.md#sn-ds-011)), settings persistence, and onboarding's 3-card variant (an onboarding surface that reuses `SaneThemeCard`).

#### Acceptance criteria

- [ ] All 17 cards render each in its own look's tokens (a Cyberpunk card looks neon, a Paper card looks cream) and are grouped by family with group labels.
- [ ] The grid is a radio group: exactly one selected; selection exposes `aria-current`/selected state and a non-colour signal (ring/weight), not colour alone (WCAG 1.4.1).
- [ ] Cards, labels and the toggle are keyboard-reachable and screen-reader-labelled by look **name** (not colour), with 44 pt/48 dp targets.
- [ ] Toggling dark mode re-skins the whole app live via [SN-DS-011](theming.md#sn-ds-011); the card previews also flip.
- [ ] The wallpaper card sets/removes a wallpaper and drives the Blur/Veil sliders (numeric-alt reachable), routing to [SN-DS-014](theming.md#sn-ds-014).
- [ ] The surface itself renders correctly in all 17 looks × light/dark.

#### Technical notes

Files under `packages/sane_ui/lib/src/theming/`. `SaneThemeCard` wraps its preview subtree in a nested `SaneLookScope` fixed to that card's `(look, mode)` so it self-styles independent of the app's active look. Uses [SN-DS-016](design-system.md#sn-ds-016) surface, [SN-DS-017](design-system.md#sn-ds-017) toggle, [SN-DS-018](design-system.md#sn-ds-018) sliders. Group order from `tokens.json` `lookOrder`. Settings screen mapping: `accessibility.md` §10 Settings row.

#### Security & privacy

None beyond baseline for the picker itself; the wallpaper upload's security lives in [SN-DS-014](theming.md#sn-ds-014). No PII, no logging of selections beyond opaque preference keys. No network.

#### UX notes

This is where the 17-look differentiator is sold; cards must be honest self-previews (`design/Sane Notes.dc.html` Settings screen; `component-inventory.md` §8 `SaneThemeGrid`). Voice for the dark toggle copy is fixed. Sliders need numeric alternatives (2.5.7). Reduce-motion: card selection cross-fades, no bounce. RTL mirrors the grid.

#### Test plan

Widget: `packages/sane_ui/test/theming/sane_theme_grid_test.dart` (radio semantics, keyboard nav, selection non-colour signal, name labels). Golden: `packages/sane_ui/test/goldens/theme_grid_test.dart` renders the full 17-card grid in a couple of host looks × light/dark. Semantics: each card exposes name + selected.

#### Dependencies

[SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-017](design-system.md#sn-ds-017); wallpaper compositing [SN-DS-014](theming.md#sn-ds-014).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GAND-021

<a id="sn-gand-021"></a>

**Define the Android wide-colour-gamut posture so ink colour matches across platforms**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | task |
| Priority | p3 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | android-tablet, android-phone |
| Areas | theming, ink, compat |
| Size | S |
| SDLC | design |
| Parent | [SN-AND-001](compat.md#sn-and-001) |
| Depends on | [SN-GIPAD-002](ink.md#sn-gipad-002), [SN-BRS-026](brushes.md#sn-brs-026), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-PRIVACY-1` |
| Extra labels | — |

#### Context
[SN-BRS-026](brushes.md#sn-brs-026) gates **cross-platform brush render parity** with goldens, and [SN-DS-007](design-system.md#sn-ds-007) gates per-look contrast floors — both assume a colour is a colour. It is not: modern iPads render Display P3 by default, many Android tablets and phones have wide-gamut panels that are only used if the app opts in, and Flutter/Impeller's wide-gamut behaviour differs per platform. The practical consequences for a note app are concrete: the same highlighter yellow looks duller on Android than on iPad (a brand and parity problem for the 17 looks), exported PDFs and PNGs may carry a different colour profile than what the user saw ([SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-004](sharing-export.md#sn-shr-004)), and the parity golden gate will produce failures nobody can explain because the two platforms are not even in the same colour space. The Apple side is being decided in [SN-GIPAD-002](ink.md#sn-gipad-002), whose scope explicitly defers "Android and web colour management (follow-ups once the ADR lands)" — this issue is that Android follow-up, and it must land before the parity goldens harden.

#### Scope
**In:** deciding and documenting the colour posture for Android — sRGB everywhere for determinism, or opt into wide gamut and manage conversion — with the decision and its rationale recorded in `docs/design/design-system.md` and `docs/platform/android.md`; implementing the chosen posture (window colour mode declaration, or an explicit statement that we do not opt in); making export colour handling explicit (which profile PDF/PNG/SVG exports embed, and that it matches what was on screen); adding a tolerance and colour-space note to the parity golden gate so [SN-BRS-026](brushes.md#sn-brs-026) compares like with like; a short check that the token palette ([SN-DS-002](design-system.md#sn-ds-002)) round-trips through the chosen space without clipping the saturated highlighter and ink colours.
**Out:** the token definitions ([SN-DS-002](design-system.md#sn-ds-002)) and contrast gates ([SN-DS-007](design-system.md#sn-ds-007)); the dark-mode ink inversion rule ([SN-INK-030](ink.md#sn-ink-030)); colour-blind palettes ([SN-A11Y-011](a11y.md#sn-a11y-011)); the colour picker UI ([SN-BRS-021](brushes.md#sn-brs-021)); iPad-side colour work.

#### Acceptance criteria
- [ ] A written decision exists (doc section or ADR) stating the Android colour posture, the reason, and the known trade-off, referenced from [SN-BRS-026](brushes.md#sn-brs-026).
- [ ] The chosen posture is implemented and verifiable at runtime (the app reports its colour mode in the debug/diagnostics panel, [SN-TEL-008](telemetry.md#sn-tel-008)).
- [ ] The same page rendered on the iPad Tier 1 device and the Android Tier 1 tablet produces highlighter and ink colours within a stated ΔE tolerance, measured once and recorded; the parity gate uses that tolerance rather than an arbitrary pixel threshold.
- [ ] PDF and PNG exports state and embed a defined colour profile; a round-trip check shows the exported swatch matches the on-screen swatch within the same tolerance.
- [ ] No look's token palette clips or bands on either a wide-gamut or an sRGB Android panel (visual check across the 17 looks, [SN-QA-005](qa.md#sn-qa-005) harness).
- [ ] If the decision is "sRGB only", the code contains no accidental wide-gamut opt-in and the doc says why the richer panel is deliberately not used.

#### Technical notes
Android opts in per window (`android:colorMode="wideColorGamut"` / `Window.setColorMode`) and only on capable displays (`Display.isWideColorGamut`); Impeller/Skia then needs a matching surface configuration — **(verify)** what the shipped Flutter engine actually supports on Android before choosing, since an unsupported opt-in silently changes nothing or, worse, changes only some surfaces. Exports go through the PDF/PNG writers ([SN-SHR-003](sharing-export.md#sn-shr-003), [SN-SHR-004](sharing-export.md#sn-shr-004)); pdfium and our SVG writer must be told the space explicitly rather than inheriting a default. Keep the native ink surface ([SN-AND-002](ink.md#sn-and-002)) and the Flutter layer in the same space or the wet→dry hand-off ([SN-INK-021](ink.md#sn-ink-021)) will show a colour seam — call that out as an acceptance risk.

#### Security & privacy
None beyond baseline; reading display capabilities uses no permission and must not be recorded as a device fingerprint in telemetry ([SN-TEL-002](telemetry.md#sn-tel-002), MASVS-PRIVACY-1).

#### UX notes
The user-visible requirement is simple and worth stating in the design system: "the same note looks the same on every device". Where a device cannot show a colour, degrade by clamping predictably rather than shifting hue. No user-facing setting.

#### Test plan
Measurement: photograph or screen-capture a reference swatch page on the iPad and Android Tier 1 devices; compute ΔE and record it. Golden: extend the parity gate ([SN-BRS-026](brushes.md#sn-brs-026)) with the tolerance and a colour-space assertion. Export: unit test asserting the profile declared in generated PDF/PNG. Visual: 17-look sweep on a wide-gamut Android panel. Files: decision section in `docs/design/design-system.md`, `test/brushes/colour_parity_tolerance_test.dart`.

#### Dependencies
[SN-GIPAD-002](ink.md#sn-gipad-002) (the colour-space ADR), [SN-BRS-026](brushes.md#sn-brs-026), [SN-DS-002](design-system.md#sn-ds-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GUX-007

<a id="sn-gux-007"></a>

**Decide which page pixels are look-independent and prove it in goldens**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | design |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | theming, pages-canvas, design-system |
| Size | S |
| SDLC | design |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-PG-004](pages-canvas.md#sn-pg-004), [SN-INK-030](ink.md#sn-ink-030) |
| Security controls | — |
| Extra labels | needs-decision |

#### Context

Two rules in the design corpus contradict each other, and five surfaces will each guess differently. `docs/design/ux-principles.md` §2 says: "Chrome uses the look's surfaces; the canvas uses the shared ink/paper constants. **The page renders pixel-identically regardless of theme** … A user switching looks must see their notebook's ink unchanged", and `design-system.md` "Shared drawing constants" repeats it: "the canvas renders pixel-for-pixel the same regardless of theme; only the chrome … reads the look". But `pp` (paper) and `pl` (paper-line) are two of the **13 per-look palette keys**, and they differ across looks in light mode alone — Paper `#fcf9f1`, Skeuomorphism `#fbf6e7`, Retro `#fdf6e9`, Minimalism `#ffffff`, Cyberpunk dark `#0f1524`. `ux-principles.md` §7 then leans the other way: "The page paper (`pp`) is a token, so paper darkens in dark mode (e.g. Paper `#fcf9f1` → `#2b251d`). … Do not force a white page in dark mode." Both cannot be true. Until someone decides, the editor, the thumbnail generator, the PDF/PNG exporters, the print path and the share recipient's device will disagree about what colour a page is.

#### Scope

**In:** a written decision — an ADR under `docs/adr/` plus amendments to `ux-principles.md` §2/§7 and `design-system.md` — that fixes, **per page layer**, whether it reads the look or a shared constant: page fill (`pp`), rule/grid/staff colour (`pl`), tint wash (`TINT`), ink (already settled: index into `INK`/`DARK_INK` at paint time, [SN-INK-030](ink.md#sn-ink-030)), highlighter (shared `HL`, never inverted), PDF pixels (never recoloured), page drop shadow and 4 px radius, and the freeform ground. The decision must also state what happens for derived artefacts: thumbnails, PDF/PNG/SVG export, print, and a page rendered on a recipient's device whose look differs ([SN-SHR-013](sharing-export.md#sn-shr-013)), plus how the per-notebook look override ([SN-LIB-022](library.md#sn-lib-022)) interacts.

**Out:** implementing the paper renderer ([SN-PG-004](pages-canvas.md#sn-pg-004), [SN-TPL-003](templates.md#sn-tpl-003)), the dark-ink mapping ([SN-INK-030](ink.md#sn-ink-030)), the night-filter reading aid for PDFs ([SN-PDF-027](pdf.md#sn-pdf-027)).

#### Acceptance criteria

- [ ] An ADR records the decision, the two conflicting sources, and the rationale; both design docs are amended in the same PR so the contradiction cannot be read again.
- [ ] `tokens.json` (or its README) marks each palette key as **chrome-only**, **canvas**, or **both**, so a builder can tell from the data which side a key belongs to.
- [ ] A golden test renders the same seeded page (lined paper, cream tint, six ink colours, one highlight) in all 17 looks and asserts the documented invariance: either byte-identical canvas pixels, or identity of every layer except the ones the ADR lists as look-driven.
- [ ] Export goldens prove a PDF/PNG of that page is identical regardless of the active look, so a shared or exported page never changes because of the sender's theme.
- [ ] Dark mode behaviour is stated explicitly (paper darkens by token vs. paper is constant and only ink inverts) and matches the golden.
- [ ] The notebook thumbnail path uses the same decision as the editor (no third rendering).

#### Technical notes

Touch `docs/adr/`, `docs/design/ux-principles.md`, `docs/design/design-system.md`, `docs/design/tokens.json` (metadata only), and the render entry points in `sane_render`/`sane_pdf` export. The cheapest coherent answer is likely "the canvas reads `pp`/`pl` from the **active look and mode** for on-screen rendering, but every exported or shared artefact renders against a canonical paper" — but that must be decided, written down and tested, not assumed. Whatever is chosen, the renderer needs a single `PageSurfaceResolver` so editor, thumbnail, export and print cannot diverge.

#### Security & privacy

None beyond baseline. One integrity note: exports and share links are artefacts other people receive, so making their appearance depend on the sender's local theme would make a document's rendering non-deterministic across devices — an integrity/reproducibility concern for the `.sanenote` format spec ([SN-DOC-009](docs.md#sn-doc-009)) rather than a confidentiality one.

#### UX notes

The user-facing promise at stake is "switching looks must never change your notes". Whatever the ADR decides, the UI must not surprise: if paper does follow the look, the look switcher ([SN-DS-015](theming.md#sn-ds-015)) should preview a page so the user sees it before committing; if it does not, dark mode still needs a legible page and the ink inversion rule carries that load.

#### Test plan

`packages/sane_render/test/goldens/page_look_invariance_test.dart` (all 17 looks × light/dark on one seeded page), `packages/sane_pdf/test/export_look_invariance_test.dart` (export under three looks must be identical bytes), and a unit test that thumbnail, editor and export all call the same resolver. Manual: switch looks with a notebook open and confirm the documented behaviour.

#### Dependencies

[SN-DS-002](design-system.md#sn-ds-002), [SN-PG-004](pages-canvas.md#sn-pg-004), [SN-INK-030](ink.md#sn-ink-030)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GWEB-013

<a id="sn-gweb-013"></a>

**Follow the browser colour scheme and keep installed-PWA chrome in sync**

| Field | Value |
|---|---|
| GitHub | not published yet |
| Type | feature |
| Priority | p3 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | theming, design-system, compat |
| Size | S |
| SDLC | implementation |
| Parent | [SN-WEB-001](compat.md#sn-web-001) |
| Depends on | [SN-WEB-010](compat.md#sn-web-010), [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | — |
| Extra labels | agent-ready, good first issue |

#### Context

Every look ships in light and dark ([SN-DS-011](theming.md#sn-ds-011)), and on native the OS tells the app which one the user wants. On web that signal is `prefers-color-scheme`, and there are three extra surfaces that native does not have: the `color-scheme` CSS property (which controls the colour of browser-painted UI such as scrollbars, form controls and the canvas backdrop before Flutter paints), the `theme-color` meta/manifest value (which tints the browser toolbar on Android Chrome and the status-bar area of an installed iOS PWA), and the background colour painted during launch before the engine boots. If these disagree with the active look, the user sees a white flash on a dark look at every cold start, light scrollbars framing a dark canvas, and an installed app whose title bar is the wrong colour. `prefers-color-scheme` appears in the marketing-site issues ([SN-SITE-004](website.md#sn-site-004)) and the docs site, but nowhere in the app's web surface; [SN-WEB-010](compat.md#sn-web-010) sets manifest theme colours once, statically, and cannot follow a look change at runtime.

#### Scope

**In:** a `WebAppearanceSync` in `app/lib/platform/web/theming/` that (a) bridges `matchMedia('(prefers-color-scheme: dark)')` into the app's theme mode when the user's preference is "System" ([SN-SET-009](settings.md#sn-set-009)), reacting to changes live; (b) sets the root `color-scheme` property so browser-painted UI matches; (c) updates the `theme-color` meta element when the look or mode changes, with light/dark `media` variants; (d) sets the pre-boot background colour in `index.html` from the last-used look so the launch flash matches instead of flashing white; and (e) keeps the manifest's static `theme_color`/`background_color` consistent with the default look ([SN-WEB-010](compat.md#sn-web-010)).

**Out:** the look system and token definitions ([SN-DS-002](design-system.md#sn-ds-002), [SN-DS-011](theming.md#sn-ds-011)), the appearance settings tab ([SN-SET-009](settings.md#sn-set-009)), splash/launch art ([SN-BRD-007](brand.md#sn-brd-007)), forced-colors and contrast handling ([SN-GWEB-008](a11y.md#sn-gweb-008)), and native theme following.

#### Acceptance criteria

- [ ] With appearance set to "System", toggling the OS dark mode switches the app within one frame without a reload, in Chrome, Safari and Firefox.
- [ ] Scrollbars, text-selection colour, form controls and the page backdrop match the active mode (`color-scheme` set correctly); no light scrollbar appears on a dark look.
- [ ] Changing the look updates `theme-color` immediately; on Android Chrome the toolbar tint and on an installed iOS PWA the status-bar area match the look's chrome colour.
- [ ] Cold start on a dark look shows **no white flash**: the pre-boot background matches the last-used look (persisted as a single non-content preference), and matches the manifest default on a first-ever visit.
- [ ] An explicit Light or Dark choice in Settings overrides the media query and survives reload and install ([SN-SET-009](settings.md#sn-set-009)).
- [ ] The stored preference contains only a look id and mode enum — no other state — and is excluded from anything that syncs content.
- [ ] Golden screenshots for two representative looks in both modes pass on web ([SN-DS-027](design-system.md#sn-ds-027)).

#### Technical notes

Use `dart:js_interop` with a `matchMedia` change listener registered once at app root; feed the result into the same `SaneLookScope` provider used on native so no widget reads the media query directly ([SN-DS-011](theming.md#sn-ds-011)). `theme-color` needs an element update rather than a manifest change at runtime — keep both in one place. The pre-boot colour lives in `web/index.html` and is written from `localStorage` (prefs only, never content — `docs/platform/web.md` §4) by a tiny inline-free bootstrap snippet that satisfies the nonce CSP ([SN-WEB-014](security.md#sn-web-014)).

#### Security & privacy

Minimal but not zero. The persisted appearance value is a **preference**, not content, and must stay in the prefs store that `docs/platform/web.md` §4 restricts to non-content keys (MASVS-STORAGE-1); it must not become a durable identifier or be included in any telemetry (MASVS-PRIVACY-1, `PRD-PRIV-007`). `prefers-color-scheme` is a fingerprinting signal, so it is read for rendering only and never logged or transmitted (CWE-532). The bootstrap snippet touches the DOM before the app loads, so it must carry the CSP nonce and write only a colour string — a test asserts it cannot be influenced by any URL parameter (CWE-79, Trusted Types per [SN-WEB-014](security.md#sn-web-014)).

#### UX notes

The felt result: launching the installed PWA on a dark look looks like launching a native app — no flash, no mismatched chrome. Appearance settings copy stays as specified in `docs/design/screens-and-flows.md` §Settings; "System" is the default. Look changes animate within the existing motion tokens and respect reduce-motion ([SN-DS-025](design-system.md#sn-ds-025), [SN-A11Y-006](a11y.md#sn-a11y-006)).

#### Test plan

- `app/test/platform/web/appearance_sync_test.dart` — media-query bridge, override precedence, preference schema.
- `app/integration_test/web/theme_color_test.dart` — `theme-color` and `color-scheme` update on look/mode change.
- `app/integration_test/web/cold_start_flash_test.dart` — first-frame pixel sample on a dark look is not white.
- Manual: installed PWA on Android Chrome and iPadOS Safari, recorded in the Tier 2 matrix ([SN-WEB-023](qa.md#sn-web-023)).

#### Dependencies

[SN-WEB-010](compat.md#sn-web-010) (manifest, installed-mode layout), [SN-DS-011](theming.md#sn-ds-011) (look scope and dark mode). Interacts with [SN-SET-009](settings.md#sn-set-009) and [SN-WEB-014](security.md#sn-web-014) (CSP nonce for the bootstrap snippet).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

