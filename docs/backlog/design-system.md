# Backlog — area: design-system

39 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-DS-001](design-system.md#sn-ds-001) **Build the sane_ui design system (tokens, 17 looks, components)** (epic · M1 Ink Editor Alpha)
  - [SN-DS-002](design-system.md#sn-ds-002) **Encode tokens.json as Dart ThemeExtension for all 17 looks** · p0 · feature · L · M0 Foundations
    - [SN-DS-004](design-system.md#sn-ds-004) **Compile CSS shadow lists into Flutter BoxShadow lists** · p1 · task · S · M0 Foundations
    - [SN-DS-005](design-system.md#sn-ds-005) **Parse token colours, units and var() indirections to Dart types** · p1 · task · S · M0 Foundations
    - [SN-DS-006](design-system.md#sn-ds-006) **Derive accessibility-adjusted tokens (aciA11y, acIconA11y, mu)** · p1 · feature · M · M0 Foundations
    - [SN-DS-007](design-system.md#sn-ds-007) **Add CI gate for token drift and per-look contrast floors** · p1 · infra · M · M0 Foundations
    - [SN-DS-008](design-system.md#sn-ds-008) **Generate web CSS custom-properties theme from tokens.json** · p1 · feature · M · M0 Foundations
  - [SN-DS-009](design-system.md#sn-ds-009) **Bundle and register the 12 look font families as offline assets** · p1 · task · S · M0 Foundations
  - [SN-DS-010](design-system.md#sn-ds-010) **Implement SaneText with the fixed type scale and per-look families** · p1 · feature · M · M0 Foundations
  - [SN-DS-011](theming.md#sn-ds-011) **Implement SaneLookScope themed root with look and dark-mode switching** · p1 · feature · M · M0 Foundations
    - [SN-DS-012](theming.md#sn-ds-012) **Implement the glass backdrop-filter system for translucent looks** · p2 · task · S · M0 Foundations
    - [SN-DS-013](theming.md#sn-ds-013) **Implement the ground-pattern system and SVG paper defs** · p2 · feature · M · M0 Foundations
    - [SN-DS-014](theming.md#sn-ds-014) **Implement wallpaper surface mode with translucency, blur and veil** · p2 · feature · M · M1 Ink Editor Alpha
  - [SN-DS-015](theming.md#sn-ds-015) **Build the look switcher UI: theme-card grid, dark toggle, wallpaper card** · p2 · feature · M · M1 Ink Editor Alpha
  - [SN-DS-003](design-system.md#sn-ds-003) **Build core interactive controls: SaneButton variants and record button** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-DS-016](design-system.md#sn-ds-016) **Implement SaneSurface card primitive with elevation, border and glass** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-DS-017](design-system.md#sn-ds-017) **Implement chips, segmented control, toggle and fact badges** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-DS-018](design-system.md#sn-ds-018) **Implement text fields, slider and progress with non-drag alternatives** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-DS-019](design-system.md#sn-ds-019) **Implement toast, overlay scaffold, dialog and bottom sheet** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-DS-020](design-system.md#sn-ds-020) **Implement the navigation shell: sidebar, nav items and tab nav** · p1 · feature · M · M1 Ink Editor Alpha
    - [SN-DS-021](design-system.md#sn-ds-021) **Implement list rows, avatars, dividers and the icon primitive** · p2 · feature · S · M1 Ink Editor Alpha
    - [SN-DS-022](design-system.md#sn-ds-022) **Implement tooltips, empty states and loading skeletons** · p2 · feature · S · M1 Ink Editor Alpha
    - [SN-DS-027](design-system.md#sn-ds-027) **Add golden tests for every component across all 17 looks and dark mode** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-DS-023](design-system.md#sn-ds-023) **Author the sane_ui iconography glyph set** · p2 · design · L · M1 Ink Editor Alpha
  - [SN-DS-024](design-system.md#sn-ds-024) **Implement SaneSageMark mascot component with single asset indirection** · p2 · feature · S · M1 Ink Editor Alpha
  - [SN-DS-025](design-system.md#sn-ds-025) **Define motion tokens and reduce-motion behaviour** · p2 · design · S · M1 Ink Editor Alpha
  - [SN-DS-026](design-system.md#sn-ds-026) **Implement adaptive layout primitives and window size classes** · p1 · feature · M · M1 Ink Editor Alpha
  - [SN-DS-028](design-system.md#sn-ds-028) **Build the Widgetbook component gallery app** · p3 · infra · M · M1 Ink Editor Alpha
  - [SN-DS-029](a11y.md#sn-ds-029) **Add the component accessibility test suite (semantics, targets, focus)** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-GWEB-007](design-system.md#sn-gweb-007) **Deliver subset, self-hosted web fonts for the 17 looks and script fallbacks** · p2 · task · M · M1 Ink Editor Alpha
  - [SN-GUX-001](design-system.md#sn-gux-001) **Define the --bgs inverse-ground token and the inverted-surface rule** · p1 · task · S · M0 Foundations
  - [SN-GUX-002](design-system.md#sn-gux-002) **Gate tokens.json against the design canvas source with a drift check** · p2 · infra · S · M0 Foundations
  - [SN-GUX-004](design-system.md#sn-gux-004) **Ban look-id branching and colour literals outside the token layer** · p1 · infra · S · M1 Ink Editor Alpha
  - [SN-GUX-005](design-system.md#sn-gux-005) **Add the cross-look invariant test suite for sizes, semantics and selection** · p1 · test · M · M1 Ink Editor Alpha
  - [SN-GUX-006](design-system.md#sn-gux-006) **Add the component-inventory coverage gate** · p2 · infra · S · M1 Ink Editor Alpha
  - [SN-GUX-007](theming.md#sn-gux-007) **Decide which page pixels are look-independent and prove it in goldens** · p1 · design · S · M1 Ink Editor Alpha
  - [SN-GUX-009](design-system.md#sn-gux-009) **Author the cross-surface empty, loading, error and offline state matrix** · p1 · design · M · M2 Library & Documents
  - [SN-GUX-016](design-system.md#sn-gux-016) **Establish the design-fidelity review gate against the design canvas** · p2 · design · S · M2 Library & Documents

---

## Issues

### SN-DIM-004

<a id="sn-dim-004"></a>

**Forbid hardcoded device names and raw pixel-width branches via an arch test**

| Field | Value |
|---|---|
| GitHub | #1122 |
| Type | infra |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, compat, qa |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-DS-026](design-system.md#sn-ds-026) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Dimensional reliability collapses the moment one widget writes `if (width < 375)` or `if (Platform.isIOS && isIPhoneX)`. `docs/design/ux-principles.md` §8 and [SN-DS-026](design-system.md#sn-ds-026)/[SN-PHN-002](compat.md#sn-phn-002) establish that layout adapts to **window size class, not device identity**. This issue makes that rule enforceable: an arch/lint test fails the build when any widget outside the sanctioned layout system branches on a device name or a raw pixel width, so adaptivity stays consistent instead of decaying into per-device special-cases.

#### Scope
**In:** a rule in the existing arch-lint (`tools/scripts/arch_check`, ADR-0002) plus a custom analyzer/lint that flags, in `app/` and `packages/*` (excluding the sanctioned modules): (a) string/enum comparisons against device model identifiers, marketing names, or OS-model checks used for layout; (b) numeric comparisons of `MediaQuery` width/height against magic pixel literals; (c) direct `Platform.isX` used to choose a layout. Allowed only inside the size-class primitives ([SN-DS-026](design-system.md#sn-ds-026)), the resolver ([SN-PHN-002](compat.md#sn-phn-002)), the safe-area primitive ([SN-DIM-005](design-system.md#sn-dim-005)) and the matrix loader ([SN-DIM-002](compat.md#sn-dim-002)); those are the one place breakpoints live. An allow-list annotation (`// dimension-approved: <reason>`) covers the rare, reviewed exception (e.g. a documented platform quirk).
**Out:** the primitives themselves; runtime behaviour (this is a build-time gate).

#### Acceptance criteria
- [ ] A fixture widget branching on `MediaQuery.sizeOf(context).width < 900` outside the sanctioned modules fails the arch test with a message naming the file and pointing to [SN-DS-026](design-system.md#sn-ds-026).
- [ ] A fixture using a device-model / marketing-name string or `Platform.isIOS` to pick a layout fails; the same code inside [SN-DS-026](design-system.md#sn-ds-026)/[SN-PHN-002](compat.md#sn-phn-002) passes.
- [ ] The magic-number rule ignores non-layout constants (durations, opacities, token values) and only flags width/height comparisons derived from `MediaQuery`.
- [ ] An `// dimension-approved:` annotation with a reason suppresses a single flagged site and is surfaced in a report so exceptions stay auditable.
- [ ] The check runs in the standard analyze/verification CI job and is documented in `docs/architecture/overview.md` §5 (or an ADR) as a layering rule.

#### Technical notes
Implement as a `custom_lint`/analyzer plugin rule plus a source scan in `tools/scripts/arch_check` (mirror the `package:flutter` ban on pure-Dart packages). Detect `MediaQuery.sizeOf`/`.of(context).size` width/height reads compared to integer literals; whitelist the sanctioned files by path. This complements, not replaces, [SN-DS-026](design-system.md#sn-ds-026) and [SN-PHN-002](compat.md#sn-phn-002) — they own the breakpoints; this guarantees nobody else invents their own. Reference `CLAUDE.md` §6 (warnings are errors) so a violation blocks merge.

#### Security & privacy
None beyond baseline. MASVS-CODE-2 flavour: no unsafe/silent layout fallbacks — an unhandled size must resolve through the exhaustive size-class switch, never a stray device check. The analyzer logs nothing about content.

#### UX notes
No user surface, but it is what keeps the product's look consistent across five surfaces (`ux-principles.md` §10: consistency beats platform-native flourishes) and prevents the "works on my phone, broken on yours" regressions the maintainer wants eliminated.

#### Test plan
`tools/scripts/test/arch_check_dimensions_test.dart` and `app/test/lint/no_device_branch_test.dart` — positive fixtures (device name, magic width, Platform.isX) fail; negative fixtures (size-class use, annotated exception, sanctioned module) pass. Runs in CI analyze.

#### Dependencies
[SN-DS-026](design-system.md#sn-ds-026)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-005

<a id="sn-dim-005"></a>

**Build the cross-platform safe-area and inset resolver primitive**

| Field | Value |
|---|---|
| GitHub | #1124 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, compat, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-DS-026](design-system.md#sn-ds-026) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Notches, the Dynamic Island, the home indicator, rounded display corners, punch-hole/camera cutouts, Android display cutouts, and — on the installed web PWA — `env(safe-area-inset-*)` all steal edge space differently per device and orientation. Sane Notes needs one inset contract so every screen and the floating palette respect them identically, rather than each screen re-reading raw insets. This primitive is the single place safe-area maths lives; [SN-DIM-006](editor.md#sn-dim-006) (editor/palette) and platform issues ([SN-AND-015](compat.md#sn-and-015) edge-to-edge, [SN-GPHN-002](editor.md#sn-gphn-002) keyboard) consume it.

#### Scope
**In:** `packages/sane_ui/lib/src/layout/sane_insets.dart` — a `SaneInsets` model (safe-area, cutout, hinge, keyboard) resolved from `MediaQuery.viewPaddingOf`, `MediaQuery.viewInsetsOf` and `MediaQuery.of(context).displayFeatures`; a `SaneSafeArea` widget (a smarter `SafeArea` that can inset per-edge, honour the look's tokens, and optionally keep an edge bleeding for full-bleed canvas); and a `saneInsetsOf(context)` accessor. Web reads `env(safe-area-inset-*)` (requires `viewport-fit=cover`) surfaced through `MediaQuery` padding. Rounded-corner and cutout regions are exposed as a "keep-out" rect list.
**Out:** the editor/palette occlusion rules ([SN-DIM-006](editor.md#sn-dim-006)); fold/hinge reflow ([SN-DIM-022](compat.md#sn-dim-022)); on-screen-keyboard field-visibility ([SN-GPHN-002](editor.md#sn-gphn-002)); Android edge-to-edge enforcement config ([SN-AND-015](compat.md#sn-and-015), a consumer).

#### Acceptance criteria
- [ ] `saneInsetsOf` returns correct top/right/bottom/left safe-area insets for: iPhone 15 portrait (top 59 pt Dynamic Island, bottom 34 pt), iPhone 15 landscape (left/right 59/34 pt swapped, bottom 21 pt), iPad Pro 11" (uniform ~24 pt rounded-corner allowance), and an Android device with a top punch-hole (status-bar + cutout inset).
- [ ] On the installed web PWA in `display-mode: standalone` with `viewport-fit=cover`, `env(safe-area-inset-*)` values propagate into `SaneSafeArea` (verified with a 44 pt simulated inset).
- [ ] `SaneSafeArea` insets chrome away from all keep-out regions while allowing an explicitly opted-in edge (the canvas) to bleed under a rounded corner without placing any interactive control there.
- [ ] Insets update within one frame on rotation and on entering/leaving split-screen; no control lands under a cutout or the home indicator in any tested orientation.
- [ ] Values compose with RTL (`EdgeInsetsDirectional`) and left-handed mode without double-insetting.
- [ ] Overlays (Templates, Import, Share, Upgrade, Onboarding) inset their content and action rows through `SaneSafeArea` so no button falls under a cutout, hinge, or the home indicator on any edge; the resolver also exposes the hinge keep-out region consumed by fold-aware layout ([SN-DIM-022](compat.md#sn-dim-022)).

#### Technical notes
Pure `sane_ui` leaf (no shell/model imports, `overview.md` §5). Use `MediaQuery.viewPaddingOf` (unaffected by the keyboard) for structural insets and `viewInsetsOf` for the keyboard; `displayFeatures` for cutout/hinge bounds. Do not hardcode device insets — read them (enforced by [SN-DIM-004](design-system.md#sn-dim-004)). On web, the engine surfaces `env()` via padding only when the page sets `viewport-fit=cover` and the CSS variables are wired in `web/index.html`. Keep-out rects also cover `DisplayFeatureType` cutouts. Reference `docs/platform/android.md` §7 (edge-to-edge), `docs/platform/ipad.md` §7, `docs/platform/web.md` §5.

#### Security & privacy
None beyond baseline (geometry only). One relevant note: correct insets keep the "data leaves device" indicator and consent chrome fully visible and tappable rather than tucked under a cutout — a privacy-affordance correctness concern that [SN-DIM-013](qa.md#sn-dim-013) later gates.

#### UX notes
The page is the hero (`ux-principles.md` §2): the canvas may bleed to the physical edge for immersion, but no tool, toast, or control ever hides under the notch/island/home-indicator/corner. Toasts sit above the palette and inside the bottom safe area. Respects reduce-motion on the inset transition.

#### Test plan
`packages/sane_ui/test/layout/sane_insets_test.dart` — table-driven insets for the devices above via `MediaQueryData` overrides; `sane_safe_area_test.dart` — chrome stays inside keep-out rects while the canvas bleeds; a web-config test asserting `viewport-fit=cover` + `env()` wiring exists in `web/index.html`.

#### Dependencies
[SN-DS-026](design-system.md#sn-ds-026)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-011

<a id="sn-dim-011"></a>

**Keep the editor usable at the minimum supported viewport of 320x480**

| Field | Value |
|---|---|
| GitHub | #1117 |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, editor, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-DIM-005](design-system.md#sn-dim-005), [SN-DS-026](design-system.md#sn-ds-026) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
The floor of the matrix is a 4-inch budget phone (~320×533 dp), a small split-view window, and the WCAG 1.4.10 reflow requirement at 320 CSS px. `docs/design/ux-principles.md` §8 makes 320 px a hard target: every layout must reflow with no 2-D scroll and no loss of function. At this size the editor must still let a user open a note, pick a tool, write, and navigate pages — with touch targets at the platform floor. This is the smallest-dimension correctness case.

#### Scope
**In:** guarantee the Library, Editor, Search, Settings and every overlay are fully operable at 320×480 CSS px: single-pane, palette collapsed to essentials (pen, highlighter, eraser, colour, undo) with an overflow bottom-sheet for the rest per `docs/platform/phones.md` §3, page rail hidden, sidebar as drawer/bottom-nav; touch targets ≥ 44 pt / 48 dp / 24 CSS px; the fixed page fits width ([SN-DIM-008](pages-canvas.md#sn-dim-008)); dialogs stack. Verify at 320×480 in both portrait and a 480×320 landscape sliver.
**Out:** the phone compact shell build ([SN-PHN-001](compat.md#sn-phn-001) owns the full phone UX); the size-class primitive ([SN-DS-026](design-system.md#sn-ds-026)); text-scale at 320 px ([SN-DIM-041](compat.md#sn-dim-041)); occlusion ([SN-DIM-006](editor.md#sn-dim-006)).

#### Acceptance criteria
- [ ] At exactly 320×480 CSS px every screen shows no horizontal scrollbar and no clipped control (WCAG 1.4.10); a user can open a note, select pen, draw, switch page and reach undo without opening a hidden menu beyond the collapsed palette + overflow sheet.
- [ ] All interactive targets meet ≥ 44 pt (iOS) / 48 dp (Android) / 24 CSS px (web) with adequate spacing at this width.
- [ ] At a 480×320 landscape sliver the chrome shortens (uses the height class from [SN-PHN-002](compat.md#sn-phn-002)) instead of clipping; the toolbar and palette remain reachable.
- [ ] Every overlay (Templates, Import, Share, Upgrade, Onboarding) fits and scrolls within 320×480 with its primary action reachable without horizontal scroll.
- [ ] The 320×480 and 480×320 rows pass the overflow/clip/occlusion gate ([SN-DIM-013](qa.md#sn-dim-013)).

#### Technical notes
Reuse `SaneAdaptive`/size classes ([SN-DS-026](design-system.md#sn-ds-026)) and `saneInsetsOf` ([SN-DIM-005](design-system.md#sn-dim-005)); collapse the palette per `phones.md` §3; overlays become scrollable bottom sheets. No fixed heights that clip scaled text (compose with [SN-DIM-041](compat.md#sn-dim-041)). Enforce targets via the component sizes in `tokens.json` `componentSizes`. Reference `accessibility.md` §2 (1.4.10, 2.5.8) and `phones.md` §7 (thumb zone).

#### Security & privacy
None beyond baseline. At the smallest size, gated/PRO and consent chrome must still be visible and not pushed off-screen (the "every limit has a door" rule, `ux-principles.md` §10) — asserted by [SN-DIM-013](qa.md#sn-dim-013).

#### UX notes
Even on the smallest phone the app is calm and complete: essentials in the thumb zone, depth one tap away. No dead ends, no clipped buttons. This is the concrete proof of "no issue in the design" at the floor of the range.

#### Test plan
Golden: `app/test/goldens/min_viewport/min_320x480_test.dart` — all screens/overlays at 320×480 and 480×320. Widget: `app/test/layout/min_viewport_targets_test.dart` — target sizes and no-overflow assertions. Manual: operate the full open→draw→navigate flow at 320×480.

#### Dependencies
[SN-DIM-005](design-system.md#sn-dim-005), [SN-DS-026](design-system.md#sn-ds-026)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-016

<a id="sn-dim-016"></a>

**Ensure crisp rendering and hairline borders across device pixel ratios 1 to 4**

| Field | Value |
|---|---|
| GitHub | #1198 |
| Type | test |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, perf, compat |
| Size | M |
| SDLC | verification |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-DIM-012](qa.md#sn-dim-012), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
Density is part of "all the types of dimensions." The matrix spans DPR 1.0 (some Chromebooks / low-DPI Android) through 2.0 (older iPad), 2.625 (many Android), 3.0 (iPhone Pro) to 4.0 (high-density Android). Hairline borders (`--bw` 1 px), 4 px page radius, focus rings, and 1-device-pixel dividers must stay crisp and not vanish or blur across DPRs, and raster assets must be provided at sufficient resolution. This issue proves density correctness across the matrix.

#### Scope
**In:** verify across DPR 1.0–4.0 that: hairline borders/dividers render at ≥ 1 physical pixel and do not disappear at DPR 1.0 or blur at DPR 3–4; the page 4 px radius and drop shadow render crisply; focus rings (2 px, offset 2) stay ≥ 3:1 and visible; raster assets (mascot placeholder, any bitmap) are supplied/scaled for high DPR without softness; text AA is acceptable. Add a DPR axis to the golden harness ([SN-DIM-012](qa.md#sn-dim-012)) and a crispness check for 1-physical-pixel lines.
**Out:** colour/contrast per look ([SN-QA-005](qa.md#sn-qa-005), `accessibility.md` §4); wide-colour-gamut ink matching (Android is a separate concern); the harness ([SN-DIM-012](qa.md#sn-dim-012)).

#### Acceptance criteria
- [ ] A 1 px hairline divider is present and ≥ 1 physical pixel at DPR 1.0 and not blurred beyond one device pixel at DPR 4.0 (verified by sampling rendered pixels).
- [ ] The page 4 px radius and drop shadow render without stair-stepping at DPR 1.0, 2.0, 3.0 and 4.0 (golden per DPR).
- [ ] Focus rings remain visible and ≥ 3:1 at every DPR; a 2 px ring does not collapse at DPR 1.0.
- [ ] Any raster asset used in chrome is provided at (or generated to) the physical resolution needed at DPR 3–4 with no visible softness in the golden.
- [ ] The DPR axis is added to [SN-DIM-012](qa.md#sn-dim-012) so future screens inherit density coverage; two runs are deterministic.

#### Technical notes
Apply `MediaQueryData.devicePixelRatio` per matrix row; for 1-physical-pixel lines use `BorderSide(width: 1 / devicePixelRatio)` or a device-pixel-aware divider in `sane_ui` rather than a fixed logical px that vanishes at DPR 1.0. Prefer vector (icons via [SN-DS-002](design-system.md#sn-ds-002) token/glyph system) over raster. Reference `tokens.json` (`bw`, page radius) and `design-system.md`. Keep raster sizes within the app-size budget.

#### Security & privacy
None beyond baseline: rendering only; no PII. Golden fixtures synthetic.

#### UX notes
Crispness is part of "no issue in the design": a divider that disappears on a low-DPI Chromebook or a blurry mascot on a high-DPI phone both read as broken. The page must look like a clean physical sheet at every density.

#### Test plan
Golden: `app/test/goldens/density/dpr_matrix_test.dart` — chrome + a page across DPR 1.0/2.0/3.0/4.0. Unit: `packages/sane_ui/test/layout/hairline_test.dart` — device-pixel line width computation; a pixel-sampling assertion for line presence at DPR 1.0.

#### Dependencies
[SN-DIM-012](qa.md#sn-dim-012), [SN-DS-002](design-system.md#sn-ds-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-042

<a id="sn-dim-042"></a>

**Make sane_ui chrome reflow under text growth without truncating labels**

| Field | Value |
|---|---|
| GitHub | #1123 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-DS-026](design-system.md#sn-ds-026), [SN-A11Y-005](a11y.md#sn-a11y-005), [SN-DS-003](design-system.md#sn-ds-003) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
`docs/design/component-inventory.md` fixes component *heights* (chrome 42, tool 44, chip 34, toggle 46×28) but leaves *width* behaviour under large text unspecified. When OS text scale grows, a fixed-height row of buttons with fixed-width labels either clips or overflows. This issue defines the width-axis reflow contract for `sane_ui` so components grow, wrap, or collapse to an overflow affordance instead of truncating — the implementation half that [SN-DIM-041](compat.md#sn-dim-041) verifies. It extends [SN-DS-026](design-system.md#sn-ds-026) (window size classes) from the viewport axis to the text-growth axis.

#### Scope
**In:** width-axis reflow rules for `SaneChipBar`, `SaneSegmented`, `SaneTabNav`, `SaneToolPalette`, `SaneEditorToolbar`, `SaneButton` rows; a shared `SaneReflowRow`/`SaneOverflowBar` primitive in `packages/sane_ui`; the rule that essential labels never ellipsise.
**Out:** the scale-matrix gate ([SN-DIM-041](compat.md#sn-dim-041)), OS scale wiring ([SN-A11Y-005](a11y.md#sn-a11y-005)), the low-end effect degradation ([SN-DIM-050](design-system.md#sn-dim-050)).

#### Acceptance criteria
- [ ] Every listed component wraps to additional lines (`Wrap`) or collapses trailing items into a `⋯` overflow sheet when the sum of intrinsic child widths at the current `textScaler` exceeds the available width from `LayoutBuilder`.
- [ ] Fixed heights are preserved; only the width axis and line count change.
- [ ] Essential labels use `softWrap`/wrap, never `TextOverflow.ellipsis`; only decorative/numeric text may use `FittedBox` (floor 12 logical px).
- [ ] At `fontScale 2.0` on a 360 dp width, `SaneSegmented` with three segments stacks vertically rather than clipping the third label.
- [ ] Overflowed items remain keyboard- and screen-reader-reachable via the overflow sheet (name/role/state preserved).
- [ ] The primitive is used by all listed components (no per-component ad-hoc overflow logic).

#### Technical notes
Implement `SaneOverflowBar` in `packages/sane_ui/lib/src/layout/` using `LayoutBuilder` + a measuring pass (`Flow`/`CustomMultiChildLayout` or a two-phase `Wrap` with an overflow button); read scale via `MediaQuery.textScalerOf`. Do not branch on look id — reflow is layout, not theme. Compose feature widgets in `app/`, not `sane_ui` (per `docs/architecture/overview.md` §5). Respect `EdgeInsetsDirectional` so reflow composes with RTL and left-handed mode ([SN-A11Y-012](a11y.md#sn-a11y-012)).

#### Security & privacy
None beyond baseline (pure UI layout).

#### UX notes
Collapse order is least-to-most essential (page nav collapses before pen/colour). The overflow sheet reuses `SaneOverlay` bottom-sheet styling; the dock's `⋯` sits at the trailing edge. Follows `docs/design/ux-principles.md` §3 (progressive disclosure) and §9 (invariants across 17 looks).

#### Test plan
Widget tests `packages/sane_ui/test/layout/overflow_bar_test.dart` (wrap vs collapse thresholds); golden `app/test/golden/chrome_reflow_test.dart` across three looks × scale 1.0/1.5/2.0; semantics test that overflowed items stay reachable.

#### Dependencies
[SN-DS-026](design-system.md#sn-ds-026), [SN-A11Y-005](a11y.md#sn-a11y-005), [SN-DS-003](design-system.md#sn-ds-003).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DIM-050

<a id="sn-dim-050"></a>

**Define the reduced-effects look-degradation profile for the low-end layout tier**

| Field | Value |
|---|---|
| GitHub | #1150 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | all |
| Areas | design-system, perf, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DIM-001](compat.md#sn-dim-001) |
| Depends on | [SN-PERF-023](perf.md#sn-perf-023), [SN-DS-002](design-system.md#sn-ds-002), [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context
`docs/platform/performance-budgets.md` §5 and `docs/platform/android.md` (P4/L5) require that on low-end hardware the app **reduces blur/shadow/glass effects before it drops frames**. The 17 looks carry expensive feel tokens — Glassmorphism `blur(18px) saturate(1.3)`, Cyberpunk neon glows, Neumorphism dual shadows, Y2K `blur(12px)`, gradient/pattern grounds. This issue defines a documented, testable **effect-degradation profile**: a deterministic mapping from each look's costly tokens to cheaper equivalents that preserves the look's identity, driven by the [SN-PERF-023](perf.md#sn-perf-023) adaptive quality ladder. It is the design-system half of the ladder; [SN-PERF-023](perf.md#sn-perf-023) owns the tier-detection/ladder mechanism.

#### Scope
**In:** a per-look degradation map (which of `glass`, `btnSh`, `cardSh`, `sh`, `bgi`, `inset`, `hst` degrade to what) at each ladder tier; a `SaneLookScope` degradation flag consumed by `SaneSurface`/components; the rule that layout, sizes and semantics never change — only effects.
**Out:** ladder/tier detection and thermal/low-power triggers ([SN-PERF-023](perf.md#sn-perf-023), [SN-PERF-015](perf.md#sn-perf-015), [SN-GPRF-019](perf.md#sn-gprf-019)), the golden verification of degraded looks ([SN-DIM-051](qa.md#sn-dim-051)).

#### Acceptance criteria
- [ ] Each of the 17 looks defines an explicit reduced-effects variant: backdrop blur is dropped or reduced (e.g. Glass 18 px → 0, opaque `sf`), multi-layer/dual shadows collapse to a single 1 px hairline or none, neon glows become a solid accent border, gradient/pattern grounds fall back to the flat `bg`.
- [ ] Component *heights, radii, spacing, and semantics are unchanged* between full and reduced profiles — only paint effects differ.
- [ ] The reduced profile is selectable via a `SaneLookScope` flag set by the [SN-PERF-023](perf.md#sn-perf-023) ladder, not by look id or platform check.
- [ ] Each look's reduced variant still passes WCAG AA contrast in light and dark (per `docs/design/accessibility.md`).
- [ ] `BackdropFilter` and `ImageFilter` usage is fully removed (not merely hidden) in the reduced profile so no GPU cost is paid.
- [ ] Wallpaper mode's 22 px frosted blur degrades to a solid veil at the lowest tier while keeping text legible.

#### Technical notes
Extend the `SaneLook` ThemeExtension from [SN-DS-002](design-system.md#sn-ds-002) with a `reduced` boolean and pre-computed degraded token set; `SaneSurface` reads it and omits `BackdropFilter`/`ColorFilter.matrix` when set. Ladder wiring comes from [SN-PERF-023](perf.md#sn-perf-023). Keep it token-driven in `packages/sane_ui` (no per-component look branching, per `docs/design/ux-principles.md` §9). Document the map in `docs/design/design-system.md` and `docs/platform/performance-budgets.md` §5.

#### Security & privacy
None beyond baseline (visual effects only).

#### UX notes
A Paper look must still read as Paper on a 4 GB phone — degraded, not broken. Effects are the first thing to go, frames are never the thing to go (`docs/design/ux-principles.md` §1). The transition between full and reduced should cross-fade, respecting Reduce Motion.

#### Test plan
Golden `packages/sane_ui/test/golden/reduced_effects_profile_test.dart` (all 17 looks × light/dark, full vs reduced) — full verification matrix is [SN-DIM-051](qa.md#sn-dim-051); contrast unit tests reused from accessibility; an assertion that no `BackdropFilter` is built when `reduced` is set.

#### Dependencies
[SN-PERF-023](perf.md#sn-perf-023), [SN-DS-002](design-system.md#sn-ds-002), [SN-DS-011](theming.md#sn-ds-011).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-001

<a id="sn-ds-001"></a>

**Build the sane_ui design system (tokens, 17 looks, components)**

| Field | Value |
|---|---|
| GitHub | #12 |
| Type | epic |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, theming, a11y |
| Size | XL |
| SDLC | implementation |
| Parent | — |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-3`, `MASVS-CODE-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

`packages/sane_ui` is the design-system leaf package: the one place that turns `docs/design/tokens.json` into the app's visible skin on all five surfaces (iPad, Android tablet, Web/PWA, iPhone, Android phone). Per CLAUDE.md §9 and `docs/design/design-system.md` “Implementation guidance”, **nothing in the app may hard-code a colour, radius, shadow or type size** — every widget reads `(lookId, mode, tokenKey)` from the active `SaneLook` `ThemeExtension`. The design source of truth is `design/Sane Notes.dc.html` + `design/Sane Notes Design Sheet.dc.html` → `docs/design/tokens.json` (17 looks × light/dark) → `docs/design/design-system.md`. This epic delivers the token codegen, typography loading, the theme layer + look/dark switching, the effect systems (glass, ground patterns, wallpaper, shadow compiler), the full component library from `docs/design/component-inventory.md`, the look switcher UI, motion + adaptive-layout primitives, iconography, the Sage mascot mark, and the golden / Widgetbook / a11y test scaffolding. It is a hard dependency for M1 (the editor and every screen's chrome) and consumes the M0 token layer described in `docs/roadmap.md`. Per the package DAG in CLAUDE.md §3, `sane_ui` is a **pure leaf** (Flutter + tokens) and MUST NOT import any model or feature package; cross-feature coordination lives in `app/`.

#### Scope

**In:** the `packages/sane_ui` package end-to-end — token codegen to Dart/web/native, the 34 look×mode theme instances, typography, effect systems, every component in `component-inventory.md`, theming UI (theme grid, dark toggle, wallpaper), motion + adaptive primitives, iconography, `SaneSageMark`, golden + Widgetbook + a11y test harnesses.

**Out:** the editor canvas / ink rendering (`sane_ink`, `sane_render`), brush-studio UI (`sane_brushes`), screen composition and routing (`app/`), and business/state logic (Riverpod providers in `app/`). Those consume `sane_ui`; they are not built here.

#### Acceptance criteria

- [ ] Every child issue below is merged, CI green, and its own acceptance criteria met.
- [ ] No widget in `sane_ui` hard-codes a colour/radius/shadow/type size; an arch-lint/grep gate proves it.
- [ ] All 17 looks × light/dark render every component correctly, verified by golden tests.
- [ ] Every failing WCAG pair from `docs/design/accessibility.md` §4 uses the a11y-adjusted token; CI fails if any button-label or muted pair drops below 4.5:1 or any accent-icon pair below 3.0:1.
- [ ] The Widgetbook gallery renders every component across all looks/modes with live knobs.

#### Children

- [ ] [SN-DS-002](design-system.md#sn-ds-002) tokens.json → Dart `SaneLook` ThemeExtension (all 17 looks, light/dark)
- [ ] [SN-DS-004](design-system.md#sn-ds-004) CSS shadow-list → `List<BoxShadow>` compiler
- [ ] [SN-DS-005](design-system.md#sn-ds-005) Colour + unit + `var()` token parser
- [ ] [SN-DS-006](design-system.md#sn-ds-006) a11y-adjusted derived token layer (aciA11y, acIconA11y, adjusted mu)
- [ ] [SN-DS-007](design-system.md#sn-ds-007) CI token-drift + contrast gate
- [ ] [SN-DS-008](design-system.md#sn-ds-008) Web CSS custom-properties theme target
- [ ] [SN-DS-009](design-system.md#sn-ds-009) Bundle + register the 12 look font families
- [ ] [SN-DS-010](design-system.md#sn-ds-010) `SaneText` typography-scale widget
- [ ] [SN-DS-011](theming.md#sn-ds-011) `SaneLookScope` themed root + look/dark switching
- [ ] [SN-DS-012](theming.md#sn-ds-012) Glass / backdrop-filter system
- [ ] [SN-DS-013](theming.md#sn-ds-013) Ground-pattern system + SVG paper defs
- [ ] [SN-DS-014](theming.md#sn-ds-014) Wallpaper surface mode (translucency + blur)
- [ ] [SN-DS-015](theming.md#sn-ds-015) Look switcher UI (theme grid + dark toggle)
- [ ] [SN-DS-003](design-system.md#sn-ds-003) Core interactive controls (buttons, record button)
- [ ] [SN-DS-016](design-system.md#sn-ds-016) `SaneSurface` card / surface primitive
- [ ] [SN-DS-017](design-system.md#sn-ds-017) Chips, segmented control, toggle, badges
- [ ] [SN-DS-018](design-system.md#sn-ds-018) Inputs: text fields, slider, progress
- [ ] [SN-DS-019](design-system.md#sn-ds-019) Toast, overlay scaffold, dialog + sheet
- [ ] [SN-DS-020](design-system.md#sn-ds-020) Navigation shell: sidebar, nav item, tab nav
- [ ] [SN-DS-021](design-system.md#sn-ds-021) List rows, avatars, dividers, icon primitive
- [ ] [SN-DS-022](design-system.md#sn-ds-022) Tooltips, empty states, loading skeletons
- [ ] [SN-DS-023](design-system.md#sn-ds-023) Iconography glyph set
- [ ] [SN-DS-024](design-system.md#sn-ds-024) `SaneSageMark` mascot component
- [ ] [SN-DS-025](design-system.md#sn-ds-025) Motion tokens + reduce-motion
- [ ] [SN-DS-026](design-system.md#sn-ds-026) Adaptive layout primitives (window size classes)
- [ ] [SN-DS-027](design-system.md#sn-ds-027) Golden tests per look
- [ ] [SN-DS-028](design-system.md#sn-ds-028) Widgetbook component gallery app
- [ ] [SN-DS-029](a11y.md#sn-ds-029) Component a11y test suite

#### Technical notes

Package: `packages/sane_ui` (Flutter, per ADR-0002 `docs/adr/0002-monorepo-layout.md`). Theming applies through `ThemeData.extensions` and is read via `Theme.of(context).extension<SaneLook>()!` per ADR-0003 `docs/adr/0003-state-management-and-app-structure.md`. Codegen contract (`tokens.json → {dart, web css, native}`) and the `SaneLook` shape are specified in `docs/design/design-system.md` “Implementation guidance”. Component set + widget names in `docs/design/component-inventory.md`; behaviour across looks in `docs/design/ux-principles.md` §9; contrast in `docs/design/accessibility.md`.

#### Security & privacy

Baseline only for most of the surface: components never log note content, ink coordinates, tokens, emails or phone numbers (CWE-532, MASVS-PRIVACY-3); only design tokens flow through the theme layer. Real controls appear in children that decode untrusted input (wallpaper image, [SN-DS-014](theming.md#sn-ds-014)) and in build hygiene (the Widgetbook gallery must not ship in release, [SN-DS-028](design-system.md#sn-ds-028); MASVS-CODE-1). No network egress from `sane_ui`.

#### UX notes

Delivers the visible half of the whole product: the screens proven in `design/Sane Notes.dc.html` (Login, Profiles, Onboarding, Library, Editor, Templates, Share, Import, Upgrade, Search, Settings) all re-skin from these tokens across 17 looks + dark mode. A11y is a build gate, not a phase (`docs/design/accessibility.md`).

#### Test plan

Each child names its own tests. Epic-level gates: golden coverage across looks ([SN-DS-027](design-system.md#sn-ds-027)), the a11y suite ([SN-DS-029](a11y.md#sn-ds-029)), and the drift/contrast CI gate ([SN-DS-007](design-system.md#sn-ds-007)).

#### Dependencies

SN-FND-002 (monorepo scaffold) and SN-FND-004 (workspace + lints) must land first. Children have finer-grained `depends_on`.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, widget, golden, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-002

<a id="sn-ds-002"></a>

**Encode tokens.json as Dart ThemeExtension for all 17 looks**

| Field | Value |
|---|---|
| GitHub | #222 |
| Type | feature |
| Priority | p0 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | design-system, theming |
| Size | L |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-DS-005](design-system.md#sn-ds-005) |
| Security controls | `MASVS-CODE-1`, `CWE-532` |
| Extra labels | agent-ready, innovation |

#### Context

Every client must render pixel-identically from one source of truth. `docs/design/tokens.json` is that source (a verbatim mirror of `design/sane-data.js`), and `docs/design/design-system.md` “Implementation guidance” mandates a codegen step that turns it into each platform's theming primitive, with CI failing on drift. This issue delivers the **Flutter target**: a `SaneLook extends ThemeExtension<SaneLook>` carrying every token, and **34 const instances** (17 looks × light/dark) generated from `tokens.json` — not hand-typed hex. Without this nothing else in `sane_ui` can read a token; it is the foundation the whole design system stands on (CLAUDE.md §9: never hard-code a colour). The M0 exit criterion “design tokens usable from code” (`docs/roadmap.md`) is this issue.

#### Scope

**In:** the `SaneLook` ThemeExtension class (13 palette `Color`s: bg, sf, sf2, ink, mu, ln, ac, aci, acs, ac2, pp, pl, plus sh/cardSh/btnSh/inset as pre-parsed `List<BoxShadow>`; shape/type tokens r, rs, bw, pill as doubles; fd/fb/tf/hst as strings; ls/hs as doubles; hw as `FontWeight`; nullable effect strings glass/bgi/btnBgi; bgsz); the generator that emits 34 const instances from `tokens.json` into `packages/sane_ui/lib/src/theme/looks.g.dart`; `copyWith`; a `lerp` that **snaps** (does not interpolate) between looks; the shared drawing constants (`INK`, `DARK_INK`, `HL`, `WIDTHS`, page `W`/`H`) exposed look-independently.

**Out:** the CSS shadow parser ([SN-DS-004](design-system.md#sn-ds-004)), the colour/unit parser ([SN-DS-005](design-system.md#sn-ds-005)), the a11y-adjusted derived tokens ([SN-DS-006](design-system.md#sn-ds-006)), the CI drift gate ([SN-DS-007](design-system.md#sn-ds-007)), the web target ([SN-DS-008](design-system.md#sn-ds-008)), font asset registration ([SN-DS-009](design-system.md#sn-ds-009)).

#### Acceptance criteria

- [ ] `Theme.of(context).extension<SaneLook>()!` returns the correct token set for every `(lookId, mode)` in `tokens.json`.
- [ ] Exactly 34 const `SaneLook` instances are generated; the generator reads `tokens.json` and fails loudly on an unknown key or missing look.
- [ ] Regenerating produces byte-identical output (deterministic ordering) so CI drift checks are stable.
- [ ] `lerp` returns the target look at t≥0.5 and the source below (snap), never a blended colour — switching look does not animate a colour cross-fade of the whole palette.
- [ ] `var(--ln)`/`var(--ac)`/`var(--ink)` indirections inside btnB/btnSh/cardSh are resolved against the active `(look, mode)` at generation time, not left as strings.
- [ ] Shared drawing constants (`INK[i]`, `DARK_INK[i]`, `HL`, `WIDTHS`) are exposed and are identical across all looks.
- [ ] Opaque-hex “tint” values (e.g. Material light `acs = #eaddff`) parse correctly and are not assumed translucent.

#### Technical notes

Generator lives in `packages/sane_ui/tool/gen_looks.dart` (a Dart CLI run via the workspace), output to `lib/src/theme/looks.g.dart`, wired into `melos` scripts per SN-FND-004. Parse hex `#rgb/#rrggbb/#rrggbbaa` and `rgba()` via [SN-DS-005](design-system.md#sn-ds-005); parse each shadow string to `BoxShadow` via [SN-DS-004](design-system.md#sn-ds-004); `"10px" → 10.0`, `".05em" → 0.05`, `"600" → FontWeight.w600`. Read the JSON shape from `docs/design/design-system.md` (`looks.<id>.{light,dark}` + feel tokens) and `docs/design/README.md` §2. Follows ADR-0002 (`sane_ui` location) and ADR-0003 (`ThemeData.extensions`).

#### Security & privacy

None beyond baseline: the generated theme carries only design tokens — no secrets, credentials or PII (CLAUDE.md §7.2). Generated `.g.dart` is committed and reviewable; no dynamic code execution. The theme layer logs nothing (CWE-532). Supply-chain: the generator pins its inputs to the committed `tokens.json` (MASVS-CODE-1).

#### UX notes

This is the substrate for every look in `design/Sane Notes.dc.html`. It does not itself render UI, but correctness here is what makes all 17 looks + dark mode possible (`docs/design/design-system.md` §4). Ink colour must flip to `DARK_INK[i]` by index in dark mode (`docs/design/ux-principles.md` §7) — expose the index-addressable constants so the canvas can do that at paint time. No a11y surface directly, but downstream components depend on the adjusted-token layer ([SN-DS-006](design-system.md#sn-ds-006)).

#### Test plan

Unit: `packages/sane_ui/test/theme/sane_look_test.dart` (all 34 instances present; a spot-check of parsed colours/shadows against `tokens.json` values; `lerp` snap behaviour; `var()` resolution). Codegen: `packages/sane_ui/test/theme/gen_looks_golden_test.dart` regenerates and asserts the output matches the committed `looks.g.dart` (drift check seed for [SN-DS-007](design-system.md#sn-ds-007)).

#### Dependencies

[SN-DS-005](design-system.md#sn-ds-005) (parser); SN-FND-002 (scaffold), SN-FND-004 (workspace scripts).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-003

<a id="sn-ds-003"></a>

**Build core interactive controls: SaneButton variants and record button**

| Field | Value |
|---|---|
| GitHub | #223 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y, input-gestures |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-006](design-system.md#sn-ds-006), [SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

Buttons are the most-used control and the anchor of the `sane_ui` component library (`docs/design/component-inventory.md` §2, `design-system.md` §5 Buttons). `SaneButton` has four variants — **primary** (h42, bg `--ac`, text the a11y-adjusted label), **secondary** (h42, border `--ln`, bg `--sf`), **ghost** (h42, transparent, `--mu`), **icon** (40×40, bg `--sf2`) — each picking up per-look `--btnB`/`--btnSh`/`--btnBgi` and honouring `--inset` on press in Neumorphism/Skeuomorphism. `SaneRecordButton` is the one fixed-colour control (h38, pill 999, `#e0443a`, white dot). These set the state-machine and token-reading patterns every later component follows, so they land first.

#### Scope

**In:** `SaneButton` (primary/secondary/icon/ghost) with the full state set — default, hover (`brightness(1.08)` filled / `--sf2` fill outlined-ghost), pressed (inset where the look defines it, else brightness; commit on up-event), focus (2 px accent ring offset 2, ≥ 3:1, using the adjusted accent where the raw fails), disabled (0.35 opacity, exposed as disabled), loading (inline spinner) — reading gloss `--btnBgi`/shadow `--btnSh`/border `--btnB`, radius `--rs`; primary label uses `aciA11y` from [SN-DS-006](design-system.md#sn-ds-006); `SaneRecordButton` (idle/recording pulsing dot). Fixed heights per `componentSizes`.

**Out:** chips/segmented/toggle/badge ([SN-DS-017](design-system.md#sn-ds-017)), text fields ([SN-DS-018](design-system.md#sn-ds-018)), the auth/social buttons (`SaneAuthButton`, an app/login composition using `SaneButton`), and the record *bar* (editor audio bar).

#### Acceptance criteria

- [ ] Each variant renders correctly in all 17 looks × light/dark (golden), fixed at h42 / 40×40 / h38, radius `--rs`, picking up per-look border/shadow/gloss.
- [ ] Primary label uses the adjusted `aciA11y`; contrast ≥ 4.5:1 in the six looks that fail raw (Pop, Glass, Clay, Flat, Retro, Cyberpunk light) — asserted.
- [ ] Pressed state uses `--inset` in Neumorphism/Skeuomorphism and `brightness(1.08)` elsewhere; the action commits on the up-event and is cancellable (WCAG 2.5.2).
- [ ] Focus ring is visible (2 px, offset 2, ≥ 3:1), never obscured, and uses the adjusted accent/`ink` where the accent is low-contrast (Cyberpunk, Neo-Brutalism light).
- [ ] Disabled buttons are 0.35 opacity and exposed as disabled; hover only on pointer platforms.
- [ ] Every button exposes name/role/state (WCAG 4.1.2); the accessible name is never uppercased even when `--tf` uppercases the label; targets meet 44 pt/48 dp.
- [ ] `SaneRecordButton` stays `#e0443a`/white in every look; recording state is a static label + a pulse (pulse off under reduce-motion).

#### Technical notes

Files `packages/sane_ui/lib/src/controls/sane_button.dart`, `sane_record_button.dart`. Wrap in `Semantics(button: true, enabled:, focusable:)`; use `MaterialStates`/`WidgetStatesController` or a hand-rolled state to drive hover/press/focus; `FocusRing` via a shared focus decoration. Read tokens via `SaneText` ([SN-DS-010](design-system.md#sn-ds-010)) for labels and the look extension. Sizes from `tokens.json` `componentSizes`. Behaviour spec: `component-inventory.md` §2, §9; `ux-principles.md` §9.2.

#### Security & privacy

None beyond baseline: a button renders a label and fires a callback; it must not log the label or handler payload (which may be user content) — CWE-532/MASVS-PRIVACY-3. No network, no storage.

#### UX notes

Buttons appear on every screen in `design/Sane Notes.dc.html` (Continue, Create notebook, Upgrade, Export, Sign out). Primary = accent, secondary = outlined, ghost = quiet, icon = 40×40. Reduce-motion: press/hover are instant or cross-fade, the record pulse becomes a steady dot + “Recording” label (1.4.1/2.3.3). RTL mirrors icon/label order via `EdgeInsetsDirectional`.

#### Test plan

Widget: `packages/sane_ui/test/controls/sane_button_test.dart` (variants, states, commit-on-up, disabled semantics, adjusted-label contrast assertion, uppercase-visual-only name). Golden: `packages/sane_ui/test/goldens/sane_button_looks_test.dart` (all variants × 17 looks × light/dark, plus focus + pressed states). Record button golden across looks.

#### Dependencies

[SN-DS-006](design-system.md#sn-ds-006) (adjusted label), [SN-DS-010](design-system.md#sn-ds-010) (text), [SN-DS-011](theming.md#sn-ds-011) (scope).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-004

<a id="sn-ds-004"></a>

**Compile CSS shadow lists into Flutter BoxShadow lists**

| Field | Value |
|---|---|
| GitHub | #599 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | design-system, theming |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DS-002](design-system.md#sn-ds-002) |
| Depends on | — |
| Security controls | — |
| Extra labels | agent-ready, good first issue |

#### Context

The elevation tokens `sh`, `cardSh`, `btnSh` and `inset` in `docs/design/tokens.json` are full **CSS shadow lists** — some multi-layer, some `inset`, some `0 0 0 1px` rings, some neon glows (e.g. Cyberpunk `0 0 28px rgba(0,240,255,.2)`, Neo-Brutalism `4px 4px 0 #111111`, Neumorphism dual light/dark). `docs/design/design-system.md` “Implementation guidance” requires Flutter to pre-compile each into a `List<BoxShadow>`. This parser is a prerequisite of the ThemeExtension codegen ([SN-DS-002](design-system.md#sn-ds-002)) and must faithfully reproduce the design's elevation recipes so cards, buttons and the tool palette look right in every look.

#### Scope

**In:** a pure-Dart function `List<BoxShadow> parseShadowList(String css, SaneLook resolved)` that splits on top-level commas (respecting `rgba(…)` parens), parses `offsetX offsetY blur [spread] color`, maps `inset` layers to an inner-shadow marker/`BoxShadow` with the inset flag captured for the renderer, resolves `var(--…)` colour indirections, and returns `const []` for `none`. A small `SaneShadow` wrapper if inner/outer must be distinguished for `SaneSurface`.

**Out:** applying the shadows to widgets ([SN-DS-016](design-system.md#sn-ds-016)), the glass filter ([SN-DS-012](theming.md#sn-ds-012)), and the colour parser it calls ([SN-DS-005](design-system.md#sn-ds-005)).

#### Acceptance criteria

- [ ] `none` → empty list; a single shadow → one `BoxShadow`; a comma-list → N in order.
- [ ] Commas inside `rgba(…)` do not split a layer (e.g. `0 10px 30px rgba(80,60,20,.13)` is one shadow).
- [ ] Offset, blur and optional spread parse to logical pixels; missing spread defaults to 0.
- [ ] `inset` layers are flagged so the renderer draws an inner shadow (Neumorphism/Skeuomorphism pressed state, `docs/design/ux-principles.md` §9.1).
- [ ] `0 0 0 1px <color>` ring layers (Cyberpunk `cardSh`) round-trip to a visible hairline, not a blur.
- [ ] `var(--ln)` etc. resolve to the passed look's colour.

#### Technical notes

File `packages/sane_ui/lib/src/theme/shadow_parser.dart`. Flutter has no first-class inset `BoxShadow`; capture the inset flag and let [SN-DS-016](design-system.md#sn-ds-016) approximate it (inner `Container` decoration or a custom painter). Reuse the colour parser from [SN-DS-005](design-system.md#sn-ds-005). Referenced by the codegen in [SN-DS-002](design-system.md#sn-ds-002) so shadows are pre-parsed into the generated const instances.

#### Security & privacy

None beyond baseline: pure string→geometry transform, no I/O, no logging of anything but design values (CWE-532 not applicable to content). Reject malformed input by returning an empty list rather than throwing across the package boundary (CLAUDE.md §6 `Result`-style tolerance for parse failures on trusted design data).

#### UX notes

Gets the *feel* right across looks: flat looks (Flat, Brutalism, Editorial) resolve to `none`; soft looks (Minimalism, Bento) to layered blurs; raw looks to hard offsets; Cyberpunk to glows (`docs/design/design-system.md` §4, §5 Elevation). No direct a11y surface, but incorrect shadows can hurt non-text contrast (1.4.11) — keep ring layers crisp.

#### Test plan

Unit: `packages/sane_ui/test/theme/shadow_parser_test.dart` — table-driven over the distinct `sh`/`cardSh`/`btnSh`/`inset` strings from every look in `tokens.json` (none, single, multi, inset, ring, glow, `var()`), asserting layer count, offsets, spread and inset flag.

#### Dependencies

[SN-DS-005](design-system.md#sn-ds-005) (colour parser).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-005

<a id="sn-ds-005"></a>

**Parse token colours, units and var() indirections to Dart types**

| Field | Value |
|---|---|
| GitHub | #600 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | design-system, theming |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DS-002](design-system.md#sn-ds-002) |
| Depends on | — |
| Security controls | — |
| Extra labels | agent-ready, good first issue |

#### Context

`docs/design/tokens.json` stores colours as CSS strings (`#rgb`, `#rrggbb`, `#rrggbbaa`, `rgba(…)`, and multi-stop gradients for grounds), and shape/type tokens as CSS-ish strings (`"10px"`, `".05em"`, `"600"`). `docs/design/design-system.md` “Implementation guidance” warns that non-CSS renderers MUST parse these and that a few “tint” keys are **opaque hex where you'd expect a translucent value** (e.g. Material light `acs = #eaddff`) — “parse, don't assume”. This parser is the lowest layer of the codegen ([SN-DS-002](design-system.md#sn-ds-002)) and the shadow compiler ([SN-DS-004](design-system.md#sn-ds-004)); getting it exactly right is what keeps all five surfaces pixel-identical.

#### Scope

**In:** `Color parseCssColor(String)` handling `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb()/rgba()` with fractional and `%` alpha and integer channels; `double parsePx(String)` (`"10px" → 10.0`, `"0" → 0`); `double parseEm(String)` (`".05em" → 0.05`); `FontWeight parseWeight(String)`; and a `String resolveVar(String value, SaneLook resolved)` that rewrites `var(--ln|--ac|--ink|…)` to the resolved palette colour before a colour parse. Nullable handling for `none`/`null` effect tokens.

**Out:** shadow-list splitting ([SN-DS-004](design-system.md#sn-ds-004)), gradient/ground rendering ([SN-DS-013](theming.md#sn-ds-013)), and glass filter parsing ([SN-DS-012](theming.md#sn-ds-012)).

#### Acceptance criteria

- [ ] `#eaddff` parses to fully opaque (alpha 255); `#rrggbbaa` respects the alpha byte; `rgba(80,60,20,.13)` yields alpha ≈ 33/255.
- [ ] `%` and fractional alpha both parse; malformed input returns a documented sentinel or throws only on programmer error (invariant), never silently yields transparent.
- [ ] `parsePx`/`parseEm`/`parseWeight` cover every value present in `tokens.json` (`0`–26 px radii, `.05`–`.08 em`, weights 400–900).
- [ ] `resolveVar` substitutes the correct `(look, mode)` colour for each `var(--…)` and leaves non-var strings untouched.

#### Technical notes

File `packages/sane_ui/lib/src/theme/css_value_parser.dart`, pure Dart (no `package:flutter` beyond `dart:ui`/`Color` — acceptable in this Flutter package). Mirror the exact value set in `tokens.json` so `tokens.json` stays the single source. Used by [SN-DS-002](design-system.md#sn-ds-002) and [SN-DS-004](design-system.md#sn-ds-004). See `docs/design/README.md` §2 hard rules (“parse, don't assume”).

#### Security & privacy

None beyond baseline: pure parser over trusted committed design data; no logging, no network, no PII. If ever pointed at untrusted input, it must not allocate unbounded — but here inputs are the fixed token set (CLAUDE.md §7.8 applies only to untrusted input, which this is not).

#### UX notes

Invisible but load-bearing: a mis-parsed alpha would silently break Glassmorphism/Y2K translucent surfaces or Material's opaque tonal `acs`. No a11y surface directly; downstream contrast checks ([SN-DS-006](design-system.md#sn-ds-006)) depend on correct colour values.

#### Test plan

Unit: `packages/sane_ui/test/theme/css_value_parser_test.dart` — exhaustive over the distinct colour/unit strings extracted from `tokens.json` (a generated fixture list), plus explicit cases for the opaque-hex-tint trap (`#eaddff`), 8-digit hex alpha, and `var()` resolution.

#### Dependencies

None.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-006

<a id="sn-ds-006"></a>

**Derive accessibility-adjusted tokens (aciA11y, acIconA11y, mu)**

| Field | Value |
|---|---|
| GitHub | #601 |
| Type | feature |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | design-system, a11y, theming |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-002](design-system.md#sn-ds-002) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-PLATFORM-1` |
| Extra labels | agent-ready, innovation |

#### Context

`docs/design/accessibility.md` §4 computes WCAG contrast for every look×mode from `tokens.json` and finds narrow, concentrated failures in **light mode**: button-label `aci` on `ac` drops below 4.5:1 in Pop (3.18), Glass (4.17), Clay (4.35), Flat (3.28), Retro (4.04) and Cyberpunk (2.54); accent-as-icon `ac` on `sf` drops below 3.0:1 in Neo-Brutalism (2.78) and Cyberpunk (2.54); muted `mu` on `sf` drops below 4.5:1 in Neumorphism (3.95). §4.1/§4.2 mandate a **derived a11y token layer** (`aciA11y`, `acIconA11y`, adjusted `mu`) so components can read a contrast-safe value instead of the raw pairing, keeping the designer's palette intact while the build guarantees the AA floor. Auto-deriving contrast-safe tokens from the source palette is a genuine differentiator — most design systems ship the failing pairs.

#### Scope

**In:** a derivation step in the codegen that, per `(look, mode)`, computes WCAG relative-luminance contrast (translucent tokens composited over their background, sRGB formula) and produces: `aciA11y` (darken/lighten the label until ≥ 4.5:1 against `ac`, or darken `ac` for filled buttons — pick the minimal-ΔE fix and document which), `acIconA11y` (adjusted accent for icons/active-tool/accent UI graphics until ≥ 3.0:1 against `sf`), and an adjusted `mu` (≥ 4.5:1 against `sf`); expose these on `SaneLook`; a documented rule that `ac2` is never used for text/essential icons.

**Out:** the CI gate that fails the build ([SN-DS-007](design-system.md#sn-ds-007)); the optional Okabe–Ito colour-blind ink palette (tracked in a11y area, not here) and colour-blind preview; component wiring (each component issue reads the adjusted token).

#### Acceptance criteria

- [ ] For every look×mode, `contrast(aciA11y, ac) ≥ 4.5`, `contrast(acIconA11y, sf) ≥ 3.0`, `contrast(muAdjusted, sf) ≥ 4.5`.
- [ ] Looks that already pass are left unchanged (adjusted == raw), so passing looks keep the designer's intent exactly.
- [ ] The composite handles translucent tokens (Glass/Y2K rgba surfaces) by compositing over `bg`/wallpaper before measuring.
- [ ] The six failing button-text looks and the two failing accent-icon looks from `accessibility.md` §4 all pass after derivation; a unit test asserts the exact recomputed ratios cross the threshold.
- [ ] Focus-ring colour selection (per [SN-DS-025](design-system.md#sn-ds-025)/[SN-DS-029](a11y.md#sn-ds-029)) can read `acIconA11y` or `ink` where the raw accent is low-contrast (Cyberpunk, Neo-Brutalism light).

#### Technical notes

Extend `packages/sane_ui/tool/gen_looks.dart` with `packages/sane_ui/lib/src/theme/contrast.dart` (pure WCAG contrast + a bounded HSL-lightness search for the minimal adjustment). Emit the three derived fields onto every generated `SaneLook`. Threshold source and per-look expected ratios: `docs/design/accessibility.md` §4 table + §4.1 fixes. Do not mutate `tokens.json`; the derived layer sits on top so the source palette stays the designer's intent (§4.2).

#### Security & privacy

None beyond baseline (a11y computation over design tokens; no PII, no logging). MASVS-PLATFORM-1 is cited because accessible contrast is a platform-integration correctness control we must be able to declare truthfully in the Apple Accessibility Nutrition Label “Sufficient Contrast” (`accessibility.md` §12).

#### UX notes

Invisible to sighted users on passing looks; on failing looks the primary button label / active-tool tint shifts just enough to read (≥ 4.5 / ≥ 3.0). This is what lets Pop, Glass, Clay, Flat, Retro and Cyberpunk ship without an inaccessible primary button. Components MUST read the adjusted token, never the raw `ac`/`aci`/`mu`, per `docs/design/component-inventory.md` intro and `ux-principles.md` §9.2.

#### Test plan

Unit: `packages/sane_ui/test/theme/contrast_test.dart` recomputes every pair post-derivation and asserts ≥ thresholds for all 34 look×mode combos; a regression case pins the six/two/one known failures from `accessibility.md` §4 as now-passing. Feeds the CI gate [SN-DS-007](design-system.md#sn-ds-007).

#### Dependencies

[SN-DS-002](design-system.md#sn-ds-002) (the base `SaneLook` to extend).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-007

<a id="sn-ds-007"></a>

**Add CI gate for token drift and per-look contrast floors**

| Field | Value |
|---|---|
| GitHub | #602 |
| Type | infra |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | design-system, ci-cd, a11y |
| Size | M |
| SDLC | verification |
| Parent | [SN-DS-002](design-system.md#sn-ds-002) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-DS-006](design-system.md#sn-ds-006) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-CODE-1` |
| Extra labels | agent-ready |

#### Context

`docs/design/README.md` §2 and `design-system.md` “Codegen contract” require that **CI fail if any generated theme file drifts from `tokens.json`**, guaranteeing all platforms track a single edit. `docs/design/accessibility.md` §4.2 additionally requires that **CI fail if any (look, mode) button-label or muted pair drops below 4.5:1, or any accent-icon pair below 3.0:1**. This issue wires both gates so the token layer and its a11y guarantee cannot silently rot as looks or the derivation ([SN-DS-006](design-system.md#sn-ds-006)) change.

#### Scope

**In:** a CI job (extending `.github/workflows/devsecops.yml` / the Flutter CI from SN-FND-003) that (1) regenerates the Dart theme ([SN-DS-002](design-system.md#sn-ds-002)) and web CSS ([SN-DS-008](design-system.md#sn-ds-008)) from `tokens.json` and fails if the working tree differs from the committed generated files; (2) runs the contrast assertion over all 34 look×mode combos and fails on any threshold breach; (3) greps `packages/sane_ui/lib` for hard-coded colour/hex literals outside the generated files and the token layer, failing the “never hard-code a colour” rule.

**Out:** the derivation itself ([SN-DS-006](design-system.md#sn-ds-006)), the generators ([SN-DS-002](design-system.md#sn-ds-002), [SN-DS-008](design-system.md#sn-ds-008)), and golden-image CI ([SN-DS-027](design-system.md#sn-ds-027)).

#### Acceptance criteria

- [ ] Editing `tokens.json` without regenerating fails CI with a clear “run `melos gen:tokens`” message.
- [ ] Introducing a look whose `aci/ac` < 4.5, `mu/sf` < 4.5, or `ac/sf` < 3.0 (without an adjusted token) fails CI naming the look, mode and pair.
- [ ] A hard-coded `Color(0x…)` or `#hex` in a component file (outside `theme/*.g.dart` and the parser) fails CI.
- [ ] The job runs on every PR touching `packages/sane_ui/**` or `docs/design/tokens.json` and completes in under ~2 minutes.

#### Technical notes

Add `packages/sane_ui/tool/check_drift.dart` and `check_contrast.dart` (reusing [SN-DS-006](design-system.md#sn-ds-006)'s `contrast.dart`), invoked from a `melos` script and a workflow step. The hard-code grep is an arch-lint rule consistent with CLAUDE.md §6 (`print()` ban style). Gate wiring follows the DevSecOps pipeline (`docs/security/devsecops-pipeline.md`) and SN-FND-003 CI.

#### Security & privacy

Supply-chain/build-integrity control (MASVS-CODE-1): the gate guarantees the shipped theme is the one generated from the reviewed `tokens.json`, and the contrast gate is how we can truthfully declare “Sufficient Contrast” (MASVS-PLATFORM-1, `accessibility.md` §12). No secrets; the job logs only file paths and ratios, never content.

#### UX notes

No runtime UI. Protects the visible guarantee that every look in `design/Sane Notes.dc.html` renders from tokens and meets AA in both modes. A failing message must state the fact and the fix (a toast-voice principle applied to CI output).

#### Test plan

Unit/e2e of the checkers: `packages/sane_ui/test/tooling/drift_check_test.dart` (mutating a copy of a generated file is detected) and `contrast_gate_test.dart` (an intentionally-bad synthetic look trips the gate; the real 17 pass). A CI dry-run on a branch proves the workflow step fails and passes as expected.

#### Dependencies

[SN-DS-002](design-system.md#sn-ds-002), [SN-DS-006](design-system.md#sn-ds-006); SN-FND-003 (Flutter CI).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-008

<a id="sn-ds-008"></a>

**Generate web CSS custom-properties theme from tokens.json**

| Field | Value |
|---|---|
| GitHub | #604 |
| Type | feature |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | web |
| Areas | design-system, theming |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-002](design-system.md#sn-ds-002) |
| Depends on | [SN-DS-005](design-system.md#sn-ds-005) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

`docs/design/design-system.md` “Web / React” and `README.md` §2 require a web target that emits CSS custom properties on a theme root using **exactly the sheet's variable names** (`--bg --sf --sf2 --ink --mu --ln --ac --aci --acs --ac2 --pp --pl --sh` plus feel tokens `--r --rs --bw --glass --bgi --bgsz --btnB --btnSh --btnBgi --cardSh --inset --pill --tf --ls --hw --hst --hs --fd --fb` and `--bgs` for the ground-behind). A tiny build step turns `tokens.json` into one `:root[data-look][data-mode]{…}` stylesheet; switching look swaps `data-look`, switching mode swaps `data-mode`. Flutter Web renders via CanvasKit/skwasm (ADR-0010 `docs/adr/0010-web-pwa-strategy.md`), but native DOM chrome (text inputs, IME, a11y DOM) needs these variables, and the “try on web” marketing surface (M8) consumes the same stylesheet. Producing it from the same `tokens.json` is what keeps web identical to the app.

#### Scope

**In:** a generator (`packages/sane_ui/tool/gen_css.dart` or `tools/scripts/`) that reads `tokens.json` and emits `web/sane-theme.g.css` — one `:root[data-look="<id>"][data-mode="<m>"]` block per look×mode with all palette + feel variables, plus the a11y-adjusted variables (`--aci-a11y`, `--ac-icon-a11y`, `--mu` adjusted) from [SN-DS-006](design-system.md#sn-ds-006); the SVG paper `<defs>` (`ss-lined`, `ss-grid`, `ss-dot`, `ss-music`, `ss-flash`) emitted alongside so `bgi` `url(#…)` fills resolve ([SN-DS-013](theming.md#sn-ds-013) ships the same defs to Flutter).

**Out:** the Dart target ([SN-DS-002](design-system.md#sn-ds-002)), the drift gate ([SN-DS-007](design-system.md#sn-ds-007)), font `@font-face` loading (part of [SN-DS-009](design-system.md#sn-ds-009)), and any React component code (out of repo scope for v1).

#### Acceptance criteria

- [ ] The emitted CSS contains 34 blocks (17 looks × light/dark), each with all 13 palette vars + `--bgs` + every feel token, names matching the sheet exactly.
- [ ] Translucent and gradient values (`rgba(…)`, multi-stop `bgi`) are emitted verbatim (CSS applies them natively).
- [ ] `var(--ln)` etc. inside `btnB`/`btnSh`/`cardSh` are emitted as-is (CSS resolves them at runtime) — the web target does NOT pre-resolve, unlike the Dart target.
- [ ] Switching `data-look`/`data-mode` on the root re-skins with no reflow; the SVG defs are present so paper fills render.
- [ ] Output is deterministic and matches a committed `sane-theme.g.css` for the drift gate.

#### Technical notes

Generator shares the JSON read + adjusted-token derivation with the Dart path so both targets track one edit (codegen contract, `design-system.md`). Emit `--bgs` as the ground-behind used for inverse text on chips/toasts. Ship the SVG `<defs>` block (also consumed by [SN-DS-013](theming.md#sn-ds-013)). Follows ADR-0010 for the web/PWA context.

#### Security & privacy

None beyond baseline: static stylesheet of design tokens, no secrets, no PII, no script. Serve with a strict CSP on the web app (no inline style injection of untrusted values); the generated file is reviewed and committed (MASVS-CODE-1). No egress.

#### UX notes

Guarantees the web/PWA and “try on web” surfaces render the 17 looks + dark mode identically to the app (`design/Sane Notes.dc.html` reference frames at 1180×820). Web a11y is historically the weakest surface (`accessibility.md` §3.1) — these variables back the parallel accessible DOM's styling, and focus rings must use `--ac-icon-a11y`/`--ink` where the accent is low-contrast.

#### Test plan

Unit: `packages/sane_ui/test/tooling/gen_css_test.dart` asserts block count, variable presence, exact names, and verbatim rgba/gradient emission. A small `web/theme-preview.html` fixture (manual + a Playwright-style check if the web harness exists) flips `data-look`/`data-mode` and screenshots a swatch board.

#### Dependencies

[SN-DS-005](design-system.md#sn-ds-005) (parsing/derivation shared); consumes [SN-DS-006](design-system.md#sn-ds-006) adjusted tokens; pairs with [SN-DS-013](theming.md#sn-ds-013) SVG defs.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-009

<a id="sn-ds-009"></a>

**Bundle and register the 12 look font families as offline assets**

| Field | Value |
|---|---|
| GitHub | #224 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | design-system, i18n |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | — |
| Security controls | `MASVS-CODE-3`, `MASVS-NETWORK-1` |
| Extra labels | agent-ready |

#### Context

Each look sets a display (`fd`) and body (`fb`) family; across the 17 looks there are **12 families**: Newsreader, Karla, Manrope, Bricolage Grotesque, DM Sans, Space Grotesk, Playfair Display, Nunito, IBM Plex Mono, Syne, Rubik, Archivo (`docs/design/design-system.md` §2 font stacks, §4 per-look fonts). `design-system.md` “Flutter — ThemeExtension” requires registering all of them as **bundled assets so a look's `fd`/`fb` always resolve offline** — the app is local-first and must render every look with no network (CLAUDE.md §1, LOCKED DECISION). This issue vendors the fonts, wires `pubspec.yaml`, and records their licences.

#### Scope

**In:** download the exact weights each role needs (display 600/700/800/900 + italic for Maximalism; body 400/600; mono 700 `tabular-nums`), place under `packages/sane_ui/assets/fonts/<Family>/`, declare them in `packages/sane_ui/pubspec.yaml` with correct `family` names matching the `fonts` stack aliases, subset where safe, and add a `packages/sane_ui/assets/fonts/LICENSES.md` recording each family's SIL OFL (all twelve are OFL on Google Fonts — verify) with source + version + provenance for the SBOM.

**Out:** the `SaneText` widget that selects a family per role ([SN-DS-010](design-system.md#sn-ds-010)); the web `@font-face` emission (fold the file references into [SN-DS-008](design-system.md#sn-ds-008)'s stylesheet or a sibling); custom-font import at runtime (PRD-ED-184, a separate hardened-loader feature, not here).

#### Acceptance criteria

- [ ] All 12 families load from bundled assets with the app in airplane mode; no runtime font fetch occurs (verify no `google_fonts` network path is used in release).
- [ ] Each family exposes the weights the type scale needs; Maximalism's italic display and the mono `tabular-nums` figures render.
- [ ] Fallback stacks resolve to a real system fallback (Georgia/serif, system-ui/sans, ui-monospace) if an asset is missing, matching the `fonts` aliases.
- [ ] `LICENSES.md` names every family, its OFL text/version, and its download provenance; the SBOM step (SN-CI-004) can ingest it.
- [ ] Total added font payload is measured and recorded (budget-aware; subset to keep it reasonable).

#### Technical notes

Prefer bundling the static OFL files over the `google_fonts` runtime-fetch package (which downloads on first use — incompatible with offline-first and adds a network egress). Register in the package's `pubspec.yaml` `flutter: fonts:` section. Family names must match `docs/design/tokens.json` `fonts` values so [SN-DS-010](design-system.md#sn-ds-010) can map alias → family. See `design-system.md` “Flutter” bullet on bundled fonts.

#### Security & privacy

Bundling (not runtime-fetching) removes a network egress and a third-party CDN dependency at render time (MASVS-NETWORK-1: no cleartext/uncontrolled fetch; CLAUDE.md §7.4 “no new network call”). Vendored fonts are a supply-chain input: pin versions, record licences, feed the SBOM (MASVS-CODE-3). No PII; no logging.

#### UX notes

Typography *is* half of each look's identity (serif Paper/Editorial, mono Retro/Cyberpunk, geometric Manrope for Minimalism/Glass/Bento). Type sizes are fixed per role; only the family swaps (`design-system.md` §3). Must compose with OS text scaling (Dynamic Type / `MediaQuery.textScaler`, `accessibility.md` §7) — do not bake fixed line boxes that clip scaled text. Reading fonts (OpenDyslexic, Lexend) are a separate a11y feature, not these look fonts.

#### Test plan

Widget/golden: `packages/sane_ui/test/goldens/typography_families_test.dart` renders a specimen per family (display + body + mono) and golden-compares in one look each; a test asserts each declared family resolves (no fallback substitution) in a headless offline test env. Manual: airplane-mode smoke on device.

#### Dependencies

None (blocks [SN-DS-010](design-system.md#sn-ds-010)).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-010

<a id="sn-ds-010"></a>

**Implement SaneText with the fixed type scale and per-look families**

| Field | Value |
|---|---|
| GitHub | #225 |
| Type | feature |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | design-system, a11y, i18n |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-DS-009](design-system.md#sn-ds-009) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

`docs/design/component-inventory.md` §1 defines `SaneText` as the typography primitive: roles displayXL/L/M/S, body, bodyStrong, muted, label, mono, with sizes fixed per `typeScale` and the **family swapping with the active look** (`fd` for display roles, `fb` for body). Headings apply the look's `hw`/`hst`/`hs`/`ls`; `label` is 11 px / 700 / uppercase; casing is **visual only, never applied to the accessible name** (`ux-principles.md` §9.2, `accessibility.md` 4.1.2). Every other component renders text through `SaneText`, so it must be correct first.

#### Scope

**In:** `SaneText` widget with a `role` enum mapping to `typeScale` (displayXL 38/600/1.08, displayL 34/600/1.1, displayM 20/600, displayS 16/600, body 14/400/1.45, bodyStrong 14/600, muted 12.5/400 in `mu`, label 11/700 uppercase +.08em, mono 700 `tabular-nums`); family selection from the active `SaneLook` (`fd` for display, `fb` for body/muted/label, mono family for mono); heading roles apply `hw`/`hst` (italic for Maximalism)/`hs` (line-scale)/`ls`; `tf` uppercase applied as a visual transform only; OS text scaling via `MediaQuery.textScaler`; a `semanticsLabel` that is always the original-cased text.

**Out:** the wordmark composition (“Sane” 600 / “Notes” 400) and tagline styling (a brand widget, can live in [SN-DS-024](design-system.md#sn-ds-024) or app); reading-mode fonts (OpenDyslexic/Lexend, a11y feature elsewhere); rich text / markdown (editor text area).

#### Acceptance criteria

- [ ] Each role renders the exact size/weight/line-height from `tokens.json` `typeScale`, family from the active look.
- [ ] Heading roles pick up `hw` (500–900), `hst` (Maximalism italic), `hs` line-scale and `ls` letter-spacing; body never uppercases.
- [ ] `label`/uppercase looks (Brutalism, Retro, Cyberpunk, Editorial `tf`) render uppercase visually, but the exposed a11y name is the original casing (verified via a semantics test).
- [ ] Text scales to 200% (`textScaler`) and reflows without clipping at line-height 1.5× (WCAG 1.4.4/1.4.12); no fixed heights clip scaled text.
- [ ] `muted` uses the a11y-adjusted `mu` where [SN-DS-006](design-system.md#sn-ds-006) defines one (Neumorphism light), not the raw token.
- [ ] `mono` uses `tabular-nums` so timecodes (“04:12 / 08:24 · 1.5×”) don't jitter.

#### Technical notes

File `packages/sane_ui/lib/src/text/sane_text.dart`, reading `Theme.of(context).extension<SaneLook>()!`. Use `TextStyle(fontFamily: look.fd/fb, fontFeatures: [FontFeature.tabularFigures()] for mono)`. Fonts resolve from [SN-DS-009](design-system.md#sn-ds-009)'s bundled assets. Sizes from `typeScale` (`design-system.md` §3). Apply `MediaQuery.textScalerOf(context)`. RTL-neutral (text direction comes from `Directionality`).

#### Security & privacy

None beyond baseline: renders supplied strings; must not log rendered content (a note title or OCR transcript passed to `SaneText` is user content — CWE-532/MASVS-PRIVACY-3: no logging in the widget). No network, no storage.

#### UX notes

The backbone of every screen's text in `design/Sane Notes.dc.html`. Two roles only — display and body — with the family carrying the look's voice (`design-system.md` §3). Must survive +40% locale expansion and RTL mirroring (`accessibility.md` §11, `ux-principles.md` §5). Golden-test across a look per family to catch metric drift.

#### Test plan

Widget: `packages/sane_ui/test/text/sane_text_test.dart` (role → size/weight/family; uppercase visual vs semantic name; `textScaler` 2.0 no clip). Golden: `packages/sane_ui/test/goldens/sane_text_looks_test.dart` renders a role specimen across all 17 looks × light/dark. Semantics: assert `SemanticsData.label` is original-cased for a `label`/uppercase look.

#### Dependencies

[SN-DS-002](design-system.md#sn-ds-002) (tokens), [SN-DS-009](design-system.md#sn-ds-009) (fonts).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-016

<a id="sn-ds-016"></a>

**Implement SaneSurface card primitive with elevation, border and glass**

| Field | Value |
|---|---|
| GitHub | #609 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, theming |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-003](design-system.md#sn-ds-003) |
| Depends on | [SN-DS-004](design-system.md#sn-ds-004), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-012](theming.md#sn-ds-012) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

`SaneSurface` is the container primitive behind cards, sheets, the tool palette, notebook covers and every panel (`docs/design/component-inventory.md` §1). It reads radius `--r`, border `--bw --ln`, background `--sf`/`--sf2`, applies the `--glass` backdrop where set, honours wallpaper 84% translucency, and takes an elevation of flat / `--sh` / `--cardSh`; interactive surfaces **lift 3 px on hover** (`design-system.md` §5 Elevation, `component-inventory.md` §9). Because elevation is `none` in some looks (Flat, Brutalism, Editorial) and multi-layer/hard-offset/glow in others, this is where the shadow compiler ([SN-DS-004](design-system.md#sn-ds-004)) and glass ([SN-DS-012](theming.md#sn-ds-012)) are actually applied.

#### Scope

**In:** `SaneSurface` with `elevation` (flat/`sh`/`cardSh`), optional `glass`, optional interactive hover-lift (3 px), border from `--bw`/`--ln`, radius `--r`, bg `--sf`/`--sf2`, and the pre-parsed `List<BoxShadow>` from [SN-DS-004](design-system.md#sn-ds-004) including an inner-shadow approximation for `inset` looks; wallpaper-mode translucency hook ([SN-DS-014](theming.md#sn-ds-014)); a `SaneSurface.control` convenience using `--rs` radius for control-sized containers.

**Out:** notebook covers / recents / result rows (higher-level Library/Search components), the tool palette dock behaviour (editor), and dialogs/sheets ([SN-DS-019](design-system.md#sn-ds-019)) which compose `SaneSurface`.

#### Acceptance criteria

- [ ] Renders correct radius/border/bg/elevation for all 17 looks × light/dark: `none` looks are truly flat; hard-offset (Neo-Brutalism 4px, Retro 3px) and glow (Cyberpunk) render crisply; Neumorphism dual-shadow and inset-on-press look right.
- [ ] Glass surfaces apply the backdrop blur ([SN-DS-012](theming.md#sn-ds-012)); non-glass insert none.
- [ ] Interactive surfaces lift exactly 3 px on hover (pointer only); the lift is a shadow/offset change, not a layout shift that reflows siblings.
- [ ] In wallpaper mode the surface is 84% translucent with a 22 px blur and text on it stays legible.
- [ ] `inset` looks (Neumorphism, Skeuomorphism) show a pressed inner shadow when used as a pressed control container.
- [ ] Non-text contrast of the border/elevation vs adjacent ≥ 3:1 where the border is a functional edge (WCAG 1.4.11).

#### Technical notes

File `packages/sane_ui/lib/src/surface/sane_surface.dart`. Use `DecoratedBox`/`Container` with `BoxDecoration(boxShadow:)` from [SN-DS-004](design-system.md#sn-ds-004); approximate inset via an inner `BoxShadow` painter (Flutter lacks native inset shadow). Hover via `MouseRegion` + an `AnimatedContainer`/offset (respect reduce-motion). Glass via [SN-DS-012](theming.md#sn-ds-012). Wallpaper hook from [SN-DS-014](theming.md#sn-ds-014). Sizes/tokens from `design-system.md` §5.

#### Security & privacy

None beyond baseline: a visual container; no data flow, logging, network or storage.

#### UX notes

Every floating thing in `design/Sane Notes.dc.html` is a `SaneSurface` (palette, covers, dialogs, recents-on-hover). Elevation is used only on floating things; flat by default (`design-system.md` §5). Hover-lift is a pointer affordance; under reduce-motion the lift is instant/cross-fade. Decorative surfaces don't announce; content inside carries its own semantics.

#### Test plan

Golden: `packages/sane_ui/test/goldens/sane_surface_looks_test.dart` (flat/sh/cardSh, glass on/off, inset pressed, hover-lifted, across representative looks × light/dark, incl. wallpaper mode). Widget: `sane_surface_test.dart` (hover-lift only on pointer; no sibling reflow; inset flag applied for the right looks).

#### Dependencies

[SN-DS-004](design-system.md#sn-ds-004) (shadows), [SN-DS-011](theming.md#sn-ds-011) (scope), [SN-DS-012](theming.md#sn-ds-012) (glass); wallpaper [SN-DS-014](theming.md#sn-ds-014).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-017

<a id="sn-ds-017"></a>

**Implement chips, segmented control, toggle and fact badges**

| Field | Value |
|---|---|
| GitHub | #607 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-003](design-system.md#sn-ds-003) |
| Depends on | [SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

The selection controls — `SaneChip`, `SaneSegmented`, `SaneToggle` — and `SaneBadge` cover filters, options, settings switches and fact labels across Library, Editor, Templates, Share, Settings and Upgrade (`docs/design/component-inventory.md` §2, `design-system.md` §5). Their exact metrics are locked: chips h34 pill radius, segmented track `--sf2` with active segment `--sf` + `0 1px 3px`, toggle **46×28, knob 22 white, 18 px travel in 200 ms**, and badges as **facts, never decoration** (PRO `--ac`/`aci` 800 .06em; Audio `--acs`/`--ac`; PDF `--sf2`/`--mu`; Shared; Favourite star). Correct roles/states matter for a11y (toggle role, selected state, role announced not colour).

#### Scope

**In:** `SaneChip` (filter/choice, single/multi, active `--ink` bg + `--bgs` text / inactive `--sf`+`--ln`, toggle role + selected), `SaneSegmented` (2–3+ segments, track `--sf2`, active `--sf`+shadow, radius `--rs`, exposes per-segment selected), `SaneToggle` (46×28, knob travels 18 px in 200 ms, on `--ac`/off `--ln`), `SaneBadge` (PRO/Audio/PDF/Shared/Favourite variants, text available to AT). All read the a11y-adjusted tokens where §4.1 requires.

**Out:** buttons ([SN-DS-003](design-system.md#sn-ds-003)), the theme-card radio grid ([SN-DS-015](theming.md#sn-ds-015)), the settings row wrapper (`SaneSettingRow`, an app/settings composition), and progress/slider ([SN-DS-018](design-system.md#sn-ds-018)).

#### Acceptance criteria

- [ ] Chips: h34, `--pill` radius per look (2 px Cyberpunk → 999 px most); active inverts to `--ink` bg with `--bgs` text and adds a non-colour selected signal; multi-select and single-select both supported; toggle role + selected exposed to AT.
- [ ] Segmented: active segment reads `--sf` + `0 1px 3px`, inactive text `--mu`; exactly one selected; keyboard-arrow navigable; selected announced.
- [ ] Toggle: 46×28, knob 22 white, travels exactly 18 px in 200 ms; on/off colours `--ac`/`--ln`; under reduce-motion the knob snaps (no slide) but state stays clear; exposed as a switch with on/off value.
- [ ] Badges render as facts from tokens in all looks; PRO is 800/.06em `--ac`/`aci`; the badge text (“Audio”, “PDF”, “Shared”, “Favourite”) is available to AT, never colour-only.
- [ ] All four render correctly across 17 looks × light/dark and meet 44 pt/48 dp targets with spacing (chips 34 + spacing verified against the platform floor, `accessibility.md` §2 2.5.8).

#### Technical notes

Files under `packages/sane_ui/lib/src/controls/` (`sane_chip.dart`, `sane_segmented.dart`, `sane_toggle.dart`, `sane_badge.dart`). Toggle animation is a 200 ms `AnimationController` gated by reduce-motion ([SN-DS-025](design-system.md#sn-ds-025)). Use `Semantics(toggled:/selected:/inMutuallyExclusiveGroup:)`. Metrics from `tokens.json` `componentSizes`. Behaviour: `component-inventory.md` §2/§9, `design-system.md` §5.

#### Security & privacy

None beyond baseline: selection controls; must not log selected values that may reflect user content/labels (CWE-532). No network/storage.

#### UX notes

Subject filters (Library chip bar), page-style/permission/billing/backup segments, settings switches, and the fact badges on notebook covers all come from here (`design/Sane Notes.dc.html`). Selection always pairs accent with a non-colour signal (weight/ring), never colour alone (1.4.1). Reduce-motion kills the toggle slide but keeps the state label. RTL mirrors segmented order and toggle travel.

#### Test plan

Widget: `packages/sane_ui/test/controls/selection_controls_test.dart` (chip toggle role/selected; segmented single-selection + arrow keys; toggle 18 px/200 ms travel + switch semantics + reduce-motion snap; badge AT text). Golden: `packages/sane_ui/test/goldens/selection_controls_looks_test.dart` across 17 looks × light/dark.

#### Dependencies

[SN-DS-010](design-system.md#sn-ds-010) (text), [SN-DS-011](theming.md#sn-ds-011) (scope); motion [SN-DS-025](design-system.md#sn-ds-025).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-018

<a id="sn-ds-018"></a>

**Implement text fields, slider and progress with non-drag alternatives**

| Field | Value |
|---|---|
| GitHub | #608 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-003](design-system.md#sn-ds-003) |
| Depends on | [SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-019](design-system.md#sn-ds-019) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

Input primitives — `SaneTextField`, `SaneSlider`, `SaneProgress` — back login (phone/OTP), search, rename, the wallpaper/veil sliders and the free-plan/storage meters (`docs/design/component-inventory.md` §1–§2, §8). Design rules: text fields have plain / prefixed (+91) / OTP (letter-spaced, max 6) / search (clear ×) variants with **errors as toasts, not inline red**; sliders need a **numeric-entry alternative** (WCAG 2.5.7); progress bars **expose their value** (“2 of 5 imports”, “1.8 GB of 5 GB (36%)”). Every field needs a label for a11y.

#### Scope

**In:** `SaneTextField` (plain/prefixed/OTP/search; empty/focus/error states; phone strips non-digits max 11 incl. space; OTP digits-only max 6; required accessible label; clear ×), `SaneSlider` (continuous/stepped, numeric readout, non-drag numeric entry alternative, track `--sf2` fill `--ac`, focus/disabled), `SaneProgress` (determinate, exposes value string to AT). Errors surface via `SaneToast` ([SN-DS-019](design-system.md#sn-ds-019)), never inline red.

**Out:** the auth flow composition (`SanePhoneStep`/`SaneOtpStep`, app/login), the search field's results, and the audio waveform scrubber (editor slider variant). The IME/Scribble/native-DOM web text handling detail is flagged for the web platform work.

#### Acceptance criteria

- [ ] Text field variants render/behave per spec: phone prefixed “+91” announced, non-digits stripped (max 11 incl. space); OTP letter-spaced digits-only max 6; search shows a clear × that empties and refocuses.
- [ ] Validation errors show as a `SaneToast` with a fact + recovery (“Enter a 10-digit mobile number”), optionally with a focus-ring/shake, never inline red text (`ux-principles.md` §4.3).
- [ ] Slider is operable by drag AND by a numeric entry / stepper alternative and by keyboard arrows (2.5.7); value announced; focus visible.
- [ ] Progress exposes an accessible value string (“2 of 5 imports”, “36%”) and updates the live value.
- [ ] Every field has a programmatic label; targets ≥ 44 pt/48 dp; renders in all 17 looks × light/dark; text uses adjusted `mu` where relevant.

#### Technical notes

Files under `packages/sane_ui/lib/src/inputs/`. Use `TextField` with `inputFormatters` (digits-only, phone), `Semantics(textField:, label:, value:)`; slider via `Slider` + a coupled numeric field; progress via `LinearProgressIndicator` wrapped with `Semantics(value:)`. On web, typed text must be native DOM (not painted) — verify IME/Scribble/a11y (`ux-principles.md` §8, ADR-0010). Metrics/tokens from `design-system.md` §5.

#### Security & privacy

Input fields carry sensitive values (phone number, OTP): the widget MUST NOT log field content or echo it into diagnostics (CWE-532, MASVS-PRIVACY-3, CLAUDE.md §7.3). OTP fields should disable predictive/keyboard learning where the platform allows and not persist content; masking/paste behaviour follows platform norms. No network from the widget itself; validation is local.

#### UX notes

Matches `design/Sane Notes.dc.html` Login/Search/Settings fields. Toasts replace red error text everywhere (`design-system.md` §Screens). Sliders (wallpaper Blur/Veil, stabilisation) and meters (free-plan, storage) must announce values. Reduce-motion: no shake animation, keep the toast + focus ring. RTL mirrors prefix/clear positions.

#### Test plan

Widget: `packages/sane_ui/test/inputs/sane_text_field_test.dart` (variant behaviour, digit stripping, OTP max, error-as-toast not inline, no-content-logging assertion), `sane_slider_test.dart` (numeric alt + keyboard + announced value), `sane_progress_test.dart` (value string). Golden across looks. Web semantics smoke where the harness exists.

#### Dependencies

[SN-DS-010](design-system.md#sn-ds-010) (text), [SN-DS-011](theming.md#sn-ds-011) (scope), [SN-DS-019](design-system.md#sn-ds-019) (toast for errors).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-019

<a id="sn-ds-019"></a>

**Implement toast, overlay scaffold, dialog and bottom sheet**

| Field | Value |
|---|---|
| GitHub | #610 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-003](design-system.md#sn-ds-003) |
| Depends on | [SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016) |
| Security controls | `MASVS-PRIVACY-3`, `CWE-532` |
| Extra labels | agent-ready |

#### Context

The transient/overlay surfaces — `SaneToast`, `SaneOverlay`, and the dialog + sheet primitives — carry the app's messaging and modal flows (`docs/design/component-inventory.md` §3, §6, `design-system.md` §5). The toast is **the only inverted surface** (`--ink` on `--bgs`, pill 999, `--sh`, bottom-center above the palette, **2.4 s**, mirrored to an AT live region) and **replaces all red error text**. The overlay scaffold hosts Templates/Share/Import/Upgrade/Onboarding with a dimmed backdrop and click-outside-to-close (except Onboarding). Destructive actions confirm first in the look's dialog. These are foundational for error/empty/confirm states everywhere.

#### Scope

**In:** `SaneToast` (2.4 s auto-dismiss, fade + small rise, bottom-center above the palette, inverted surface, non-interruptive, mirrored to `SemanticsService.announce`/ARIA live-polite) and a toast controller/queue; `SaneOverlay` (dimmed backdrop, z-order, click-outside-to-close with an opt-out for Onboarding, focus-trap + Escape); a `SaneDialog` (look-styled confirm dialog naming the consequence, destructive variant) and a `SaneSheet` base (bottom/side sheet using [SN-DS-016](design-system.md#sn-ds-016)). Toasts state fact + recovery and never include codes/PII.

**Out:** the specific overlay contents (Templates/Share/Import/Upgrade/Onboarding sheets — app/screen compositions using these primitives), and the settings destructive Sign-out (an app flow using `SaneDialog`).

#### Acceptance criteria

- [ ] Toast auto-dismisses at 2.4 s, appears bottom-center above the palette, is the only inverted surface (verify `ink`-on-`bgs` contrast per look incl. Cyberpunk/Glass, `accessibility.md` §10), never blocks input, and is mirrored to an AT live region (polite).
- [ ] Toasts show a fact + a next step; they never render a raw error code, stack, token, path, email or phone (CWE-532) — an abuse test passes.
- [ ] Overlay dims the backdrop, traps focus, closes on click-outside and Escape (except Onboarding, whose backdrop does not close), and restores focus to the opener on close (WCAG 2.4.3/2.1.2).
- [ ] `SaneDialog` confirms destructive actions with the consequence named (“Delete Physics II — Waves? It moves to Trash for 30 days.”) and a destructive-styled primary.
- [ ] All surfaces render in 17 looks × light/dark; reduce-motion cross-fades instead of sliding/rising.

#### Technical notes

Files under `packages/sane_ui/lib/src/overlays/`. Toast via an `OverlayEntry` + a controller (single-flight queue); dialog/sheet via `showGeneralDialog`/`showModalBottomSheet` themed with `SaneSurface`. Live-region announce via `SemanticsService.announce` (Flutter → VoiceOver/TalkBack/ARIA). Copy voice + timing: `ux-principles.md` §4.3/§6, `design-system.md` §5 Toast. Focus management per `accessibility.md` §8.

#### Security & privacy

Toasts are a common leak vector: enforce a **redaction rule** — the toast API accepts a user-facing message only, and a lint/test forbids passing exceptions/paths/tokens/PII into it (CLAUDE.md §7.3, MASVS-PRIVACY-3, CWE-532). No content is logged when a toast is shown. No network/storage.

#### UX notes

The toast is central to the calm error model — “Toasts replace red error text everywhere” (`design-system.md` §Screens; `ux-principles.md` §2 “one inverted surface only”). Overlays host every modal in `design/Sane Notes.dc.html`. Confirm-first for irreversible actions (`ux-principles.md` §4.3). Reduce-motion and RTL respected.

#### Test plan

Widget: `packages/sane_ui/test/overlays/sane_toast_test.dart` (2.4 s dismiss, live-region announce, single inverted surface, redaction abuse test), `sane_overlay_test.dart` (focus-trap, click-outside, Onboarding opt-out, focus restore), `sane_dialog_test.dart` (destructive confirm). Golden: toast + dialog across looks (verify inverted-toast contrast).

#### Dependencies

[SN-DS-010](design-system.md#sn-ds-010) (text), [SN-DS-011](theming.md#sn-ds-011) (scope), [SN-DS-016](design-system.md#sn-ds-016) (surface).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-020

<a id="sn-ds-020"></a>

**Implement the navigation shell: sidebar, nav items and tab nav**

| Field | Value |
|---|---|
| GitHub | #611 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-003](design-system.md#sn-ds-003) |
| Depends on | [SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-026](design-system.md#sn-ds-026) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

The shell chrome — `SaneSidebar`, `SaneNavItem`, `SaneTabNav` — frames Library, Search, Settings and the Editor (`docs/design/component-inventory.md` §3, §8). The sidebar has three states: **wide (248 px) / narrow rail (68 px) / hidden (Editor until opened)**; it collapses to the rail when width < 900 px (`ux-principles.md` §8). Nav items (All notebooks / Recent / Favorites / Shared / Trash) show an active state via `--acs` bg + weight + `aria-current` (never colour alone). `SaneTabNav` is the Settings tab list (vertical wide / horizontal narrow). This is the adaptive backbone every top-level screen sits in.

#### Scope

**In:** `SaneSidebar` (wide/rail/hidden, driven by the window size class from [SN-DS-026](design-system.md#sn-ds-026) and an `app/` open/close state), `SaneNavItem` (default/active with `--acs` bg + weight + `aria-current`, icon + label, count), and `SaneTabNav` (vertical/horizontal by width, per-tab selected). Keyboard-navigable, screen-reader-labelled, targets ≥ 44 pt/48 dp.

**Out:** the sidebar *contents* that are their own components (`SaneBrandRow`, `SaneSearchLauncher`, `SaneSubjectRow`, `SaneUpsellCard`, `SaneProfileSwitcher` — app/library compositions), the Editor toolbar, and routing (go_router in `app/`).

#### Acceptance criteria

- [ ] Sidebar renders at 248 px (wide) and collapses to a 68 px icon rail below 900 px; the Editor variant is hidden until opened, then overlays/pushes per the size class.
- [ ] `SaneNavItem` active state uses `--acs` bg + heavier weight + `aria-current` (a non-colour signal), not colour alone (WCAG 1.4.1); inactive/hover states correct.
- [ ] `SaneTabNav` is vertical when wide, horizontal when narrow, and exposes the selected tab; keyboard arrow navigation works with no focus trap (2.1.2).
- [ ] All three render in 17 looks × light/dark; rail icons and labels meet target sizes; focus is visible and never obscured by the shell (2.4.11).
- [ ] Collapsing/expanding does not lose selection or scroll position; reduce-motion cross-fades the width change.

#### Technical notes

Files under `packages/sane_ui/lib/src/shell/`. Width class from [SN-DS-026](design-system.md#sn-ds-026); the sidebar reads it and an open/close flag (state in `app/`). Use `Semantics(selected:, header:)`, `NavigationRail`-like structure or hand-rolled. Breakpoint 900 px from `ux-principles.md` §8. Behaviour/mapping: `component-inventory.md` §3, `accessibility.md` §10 Sidebar.

#### Security & privacy

None beyond baseline: navigation chrome; no PII, no logging of nav targets beyond opaque route ids, no network/storage.

#### UX notes

The shell is the calm frame around the page (`ux-principles.md` §2 “chrome is a guest”; Editor opens with the sidebar closed). Matches `design/Sane Notes.dc.html` Sidebar/Settings. Narrow class hides desktop-only affordances. RTL mirrors the rail side and composes with left-handed mode. Reduce-motion applies to collapse.

#### Test plan

Widget: `packages/sane_ui/test/shell/sane_sidebar_test.dart` (three states, 900 px collapse, selection/scroll preserved), `sane_nav_item_test.dart` (active non-colour signal + `aria-current`), `sane_tab_nav_test.dart` (orientation by width, selected, keyboard). Golden across looks at wide + narrow widths.

#### Dependencies

[SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-026](design-system.md#sn-ds-026) (size classes).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-021

<a id="sn-ds-021"></a>

**Implement list rows, avatars, dividers and the icon primitive**

| Field | Value |
|---|---|
| GitHub | #614 |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DS-003](design-system.md#sn-ds-003) |
| Depends on | [SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016) |
| Security controls | — |
| Extra labels | agent-ready, good first issue |

#### Context

The smaller shared primitives — `SaneAvatar`, `SaneDivider`, `SaneIcon`, and a generic list-row scaffold — recur across Profiles, Search results, Share people lists, Settings detail rows and Import recents (`docs/design/component-inventory.md` §1, §7, §8). `SaneAvatar` is a 40 px circle (initial/photo, `--acs` bg / `--ac` text, current = accent ring) whose colour is **paired with the name** for a11y; `SaneIcon` uses `--ink`/`--mu`/`acIconA11y` and dims to 0.35 when disabled; `SaneDivider` is `--ln` (plain or labelled “or”). These are quick, self-contained, and unblock the higher-level rows.

#### Scope

**In:** `SaneAvatar` (initial/photo, sizes 40/tile, default/current-with-accent-ring, colour paired with name), `SaneDivider` (horizontal / labelled), `SaneIcon` (glyph set entry point using `--ink`/`--mu`/`acIconA11y`, disabled 0.35), and a `SaneListRow` scaffold (leading/title/meta/trailing grid, `--ln` border, `--r` radius, `--sf` bg, hover state) that Search/Share/Settings rows compose. Uses the adjusted accent-icon token where §4.1 requires.

**Out:** the specific rows with their own copy/logic (`SaneSearchResult`, `SanePersonRow`, `SaneDetailRow`, `SaneRecentFileRow` — app compositions), the glyph *set* itself ([SN-DS-023](design-system.md#sn-ds-023) authors the icons; this issue is the render primitive), and badges ([SN-DS-017](design-system.md#sn-ds-017)).

#### Acceptance criteria

- [ ] `SaneAvatar` renders an initial or photo, current-state accent ring, and exposes the person's **name** to AT (colour never the only signal, WCAG 1.4.1).
- [ ] `SaneIcon` uses `acIconA11y` (not raw `ac`) for accent-coloured icons in Neo-Brutalism/Cyberpunk light; disabled icons are 0.35 opacity and exposed disabled.
- [ ] `SaneDivider` renders `--ln`; the labelled variant centers its label with rules either side.
- [ ] `SaneListRow` lays out leading/title/meta/trailing, hovers per platform, renders in 17 looks × light/dark, and forwards semantics from its contents.
- [ ] All meet 44 pt/48 dp targets where interactive; non-text contrast of icons/dividers ≥ 3:1 where functional (1.4.11).

#### Technical notes

Files under `packages/sane_ui/lib/src/primitives/`. `SaneIcon` wraps the glyph set from [SN-DS-023](design-system.md#sn-ds-023) (an `IconData`/font or SVG source) and applies token colour. `SaneListRow` uses [SN-DS-016](design-system.md#sn-ds-016) for its surface. Avatar colour-name pairing per `accessibility.md` §10 Profiles. Tokens from `design-system.md` §5.

#### Security & privacy

None beyond baseline: avatars may show a user photo/initial — the render primitive must not log it and photo handling (if a user image) reuses the safe decode path (defer heavy decode to the caller). No network/storage here; no PII in logs (CWE-532).

#### UX notes

These quiet primitives appear in every list surface of `design/Sane Notes.dc.html`. Avatar colour always pairs with a name; icons follow the adjusted-accent rule; dividers stay hairline. Reduce-motion: row hover instant/cross-fade. RTL mirrors leading/trailing via `EdgeInsetsDirectional`.

#### Test plan

Widget: `packages/sane_ui/test/primitives/sane_avatar_test.dart` (name exposed, current ring), `sane_icon_test.dart` (adjusted accent used, disabled opacity + semantics), `sane_list_row_test.dart` (layout, hover, semantics forward). Golden across a few looks × light/dark.

#### Dependencies

[SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016); glyphs [SN-DS-023](design-system.md#sn-ds-023).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-022

<a id="sn-ds-022"></a>

**Implement tooltips, empty states and loading skeletons**

| Field | Value |
|---|---|
| GitHub | #612 |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DS-003](design-system.md#sn-ds-003) |
| Depends on | [SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-024](design-system.md#sn-ds-024) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

Three cross-cutting state components: `SaneTooltip` (pointer/keyboard hover help), `SaneEmptyState` (warm, actionable, never a dead end), and `SaneSkeleton` (the preferred loading placeholder). `ux-principles.md` §4 defines the decisive defaults: empty states have copy + a next step (Library first-run “Nothing here yet… write like it's paper” → New notebook; Trash “deleted notebooks stay here for 30 days”; Search no-results resets the filter), and loading prefers content → skeleton → spinner, with the pre-logic Library shell as the skeleton model (`component-inventory.md` §4). The mascot appears **sparingly** — at most one Sage on the Library first-run empty state.

#### Scope

**In:** `SaneTooltip` (delayed reveal on hover/focus, dismissible, non-modal, AT-described-by), `SaneEmptyState` (variants trash/generic/favourites/shared/search with copy slots + an optional primary action + optional single `SaneSageMark`), `SaneSkeleton` (shimmering placeholder blocks for shell/card/row/list, respecting reduce-motion by using a static placeholder instead of shimmer). All render in 17 looks × light/dark.

**Out:** the actual per-screen empty copy wiring (app screens pass copy in), spinners inside specific rows (record/export), and the mascot component itself ([SN-DS-024](design-system.md#sn-ds-024)).

#### Acceptance criteria

- [ ] `SaneEmptyState` shows copy + (where defined) a primary action; never a dead end; uses at most one `SaneSageMark` and only where the caller opts in (Library first-run) — not on every empty list.
- [ ] Empty copy is exposed to AT as text; the action is a labelled button.
- [ ] `SaneSkeleton` matches the eventual layout shape (shell/card/row/list) and shimmers; under reduce-motion it is a static placeholder (no shimmer), still conveying “loading” via an AT status.
- [ ] `SaneTooltip` reveals on hover AND keyboard focus, is dismissible (Escape), does not trap focus, and is exposed via `aria-describedby`/`Semantics(tooltip:)` (WCAG 1.4.13 content-on-hover).
- [ ] All three render correctly across 17 looks × light/dark; text uses adjusted `mu` where relevant.

#### Technical notes

Files under `packages/sane_ui/lib/src/states/`. Skeleton shimmer is a gradient sweep gated by reduce-motion ([SN-DS-025](design-system.md#sn-ds-025)); expose `Semantics(liveRegion:/label: 'Loading …')`. Tooltip via `Tooltip`-like overlay with focus support. Empty-state copy defaults per `ux-principles.md` §4.1; leave a `// DESIGN-OPEN-Q18:` link where copy is a proposed default awaiting sign-off (`README.md` §7). Mascot via [SN-DS-024](design-system.md#sn-ds-024).

#### Security & privacy

None beyond baseline: static state UI; no PII (empty/loading text is generic), no logging of any dynamic content, no network/storage.

#### UX notes

Implements the calm empty/loading model (`ux-principles.md` §4.1/§4.2). Skeleton over spinner; content first. Mascot sparingly. Voice: warm, specific, no exclamation marks. Reduce-motion kills shimmer; keeps the loading status. RTL mirrors layout. These are the empty/loading half of the “every component handles all states” rule (`component-inventory.md` §9).

#### Test plan

Widget: `packages/sane_ui/test/states/sane_empty_state_test.dart` (copy + action + single-mascot cap + AT text), `sane_skeleton_test.dart` (shape match, reduce-motion static + loading status), `sane_tooltip_test.dart` (hover+focus reveal, Escape dismiss, described-by). Golden across a couple of looks × light/dark.

#### Dependencies

[SN-DS-010](design-system.md#sn-ds-010), [SN-DS-011](theming.md#sn-ds-011), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-024](design-system.md#sn-ds-024) (mascot); motion [SN-DS-025](design-system.md#sn-ds-025).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-023

<a id="sn-ds-023"></a>

**Author the sane_ui iconography glyph set**

| Field | Value |
|---|---|
| GitHub | #228 |
| Type | design |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, brand, a11y |
| Size | L |
| SDLC | design |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

Every tool, toolbar action, nav item, source row and setting needs a glyph, and `SaneIcon` ([SN-DS-021](design-system.md#sn-ds-021)) renders them token-coloured. The design canvas (`design/Sane Notes.dc.html`) uses a consistent line-icon style; this issue authors a single coherent icon set covering the full inventory (pen/highlighter/eraser/lasso/shape/text/image tools; undo/redo, bookmark, audio, import, templates, share, pages, focus; sidebar nav; import sources; settings). A unified set keeps the calm, consistent identity that is the product's differentiator (`ux-principles.md` §10 “consistency across five surfaces”).

#### Scope

**In:** a vector icon set (SVG masters → an icon font or a Flutter `IconData`/SVG map) covering every glyph referenced in `component-inventory.md` (§3 shell, §5 editor tools + toolbar, §6 import sources, §8 settings) at a consistent grid/stroke; a naming scheme; the asset pipeline that feeds `SaneIcon`; light/dark neutrality (icons take token colour, not baked colour); provenance/licence recorded for the SBOM.

**Out:** the `SaneIcon` render widget ([SN-DS-021](design-system.md#sn-ds-021)), the Sage mascot (a trademark, [SN-DS-024](design-system.md#sn-ds-024)), and app-icon/store artwork (release area).

#### Acceptance criteria

- [ ] Every glyph named in `component-inventory.md` §3/§5/§6/§8 exists in the set at a consistent grid and stroke weight.
- [ ] Icons are monochrome/currentColor so they take `--ink`/`--mu`/`acIconA11y` from `SaneIcon`; none bakes a colour.
- [ ] Each icon has a stable name and a default accessible label suggestion; decorative uses can suppress it.
- [ ] The set renders crisply at tool-button size (44) and at 24 px; non-text contrast ≥ 3:1 when used as a functional icon (1.4.11).
- [ ] Provenance + licence recorded; no watermarked/unlicensed source; feeds the SBOM (supply-chain).

#### Technical notes

Assets under `packages/sane_ui/assets/icons/` (+ generated `SaneIcons` map). Prefer an icon font or a compiled SVG set for size/perf. Keep strokes on a 24 px grid so they align with the design's line style. Ship light/dark-neutral (currentColor). Record licence in `assets/icons/LICENSES.md`. Consumed by [SN-DS-021](design-system.md#sn-ds-021) `SaneIcon`. Style reference: `design/Sane Notes.dc.html` toolbar/tool glyphs.

#### Security & privacy

None beyond baseline at runtime. Supply-chain: icons are vendored assets — record source + licence, no unlicensed/watermarked art (MASVS-CODE-3 style provenance for the SBOM; mirrors the mascot watermark caution in `README.md` §6). No PII, no network.

#### UX notes

Icons must read at a glance and pair with labels (never icon-only where the meaning isn't obvious; a11y names required, `accessibility.md` §2 4.1.2). Consistent stroke/grid is what makes the chrome feel calm across all 17 looks (icons re-colour by token, so a single set serves every look × mode). Reduce-motion N/A (static). RTL: directional icons (back, next, share) provide a mirrored variant.

#### Test plan

Golden: `packages/sane_ui/test/goldens/icon_set_test.dart` renders the full set at 44 and 24 px in light + dark for one look, catching stroke/alignment drift. Unit: `icon_set_test.dart` asserts every name required by `component-inventory.md` resolves (a checklist fixture) and that no icon carries a baked colour.

#### Dependencies

[SN-DS-011](theming.md#sn-ds-011) (token colouring); consumed by [SN-DS-021](design-system.md#sn-ds-021).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-024

<a id="sn-ds-024"></a>

**Implement SaneSageMark mascot component with single asset indirection**

| Field | Value |
|---|---|
| GitHub | #229 |
| Type | feature |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, brand, a11y |
| Size | S |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | `MASVS-CODE-3` |
| Extra labels | agent-ready, good first issue |

#### Context

The Sage is a **fixed-colour registered trademark** that appears in login, onboarding, profiles and empty states (`docs/design/README.md` §6, `design-system.md` §1, `component-inventory.md` §1 `SaneSageMark`). Rules: never recolor/stretch/flip/crop/rotate; it sits on the look's **accent-soft (`acs`) tile** so the *tile* changes with the theme, not the character; minimum mark size 24 px; clear space = the hat-brim height; four app-icon tile grounds (accent-soft default, ink, paper, Cyberpunk night). Critically, the repo art (`design/assets/*.png`) is a **watermarked placeholder — not releasable**, so the mark MUST be referenced through **one `sane_ui` asset indirection** so the placeholder can be swapped in a single place when original art is commissioned.

#### Scope

**In:** `SaneSageMark` widget — one asset indirection (`assets/brand/sane_sage.png` placeholder) rendered on a themed tile (`acs` default, or ink/paper/cyber-night variants for app-icon use), enforcing minimum 24 px and hat-brim clear space, never transforming the character; a single constant that points at the current art file so a swap is one line; an accessible label (“Sane Sage”); a build-time marker/annotation that a build embedding the watermarked placeholder is tagged not-releasable.

**Out:** commissioning the original art (a maintainer/design blocker — this issue ships the indirection with the placeholder), the wordmark/tagline text (brand text, [SN-DS-010](design-system.md#sn-ds-010)/app), and store app-icon export (release area).

#### Acceptance criteria

- [ ] The Sage renders on the active look's `acs` tile; switching look changes only the tile, never the character (no recolor/flip/crop/scale-distortion).
- [ ] Minimum size 24 px enforced; clear space equals the hat-brim height; four tile grounds selectable for app-icon contexts.
- [ ] All art loads through **one** asset constant — a single edit swaps the placeholder for licensed art everywhere it appears.
- [ ] The component exposes the accessible name “Sane Sage”; decorative placements can wrap in `ExcludeSemantics`.
- [ ] A build/CI marker flags any build embedding the watermarked placeholder as **not releasable** (`README.md` §6, roadmap M8 blocker); a `// DESIGN-OPEN-Q2:` note links the art blocker.

#### Technical notes

File `packages/sane_ui/lib/src/brand/sane_sage_mark.dart` + `assets/brand/sane_sage.png` (placeholder). Tile via [SN-DS-016](design-system.md#sn-ds-016)/`acs` from the look. Do NOT expose any transform knobs (scale-to-fit only, preserving aspect). The single indirection is a `const _sageAsset` the whole app imports. Watermark caution + provenance: `README.md` §6.

#### Security & privacy

Supply-chain / IP integrity (MASVS-CODE-3): the placeholder is unlicensed/watermarked and MUST NOT ship; the single indirection + the not-releasable build marker enforce that until licensed art with recorded provenance replaces it. No PII, no logging, no network.

#### UX notes

The Sage is the brand's face on Login/Onboarding/Profiles/empty-states (`design/Sane Notes.dc.html`). It must always be the identical artwork on a theme-following tile. Used sparingly in empty states (one at most, per [SN-DS-022](design-system.md#sn-ds-022)). Reduce-motion N/A. The mark reads in both modes because the `acs` tile darkens with the look.

#### Test plan

Widget: `packages/sane_ui/test/brand/sane_sage_mark_test.dart` (tile follows look/`acs`, character asset unchanged across looks, min-size enforced, single asset constant, accessible name). Golden: mark on `acs`/ink/paper/cyber tiles in a few looks × light/dark. A test asserts the not-releasable marker is present when the placeholder asset is used.

#### Dependencies

[SN-DS-011](theming.md#sn-ds-011) (look/`acs` tile); tile surface [SN-DS-016](design-system.md#sn-ds-016).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-025

<a id="sn-ds-025"></a>

**Define motion tokens and reduce-motion behaviour**

| Field | Value |
|---|---|
| GitHub | #230 |
| Type | design |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, a11y |
| Size | S |
| SDLC | design |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

Motion in Sane Notes clarifies, never decorates (`docs/design/ux-principles.md` §6). The durations and curves are specified: micro-interactions ~150–200 ms (the toggle is exactly **18 px in 200 ms**), surface transitions ~200–300 ms, nothing chrome-related over ~350 ms; ease-out entrances, ease-in-out moves; the toast fades + rises and dismisses at 2.4 s. Crucially, all interaction motion MUST disable under Reduce Motion (`accessibility.md` §6, WCAG 2.3.3 target) — replaced by cross-fades — and **no motion may convey information alone** (a pulse must also be a static state). This issue centralises the motion tokens and the reduce-motion helper every component uses.

#### Scope

**In:** a `SaneMotion` token set (durations `micro`=175 ms, `control`=200 ms, `surface`=250 ms, `toastDwell`=2.4 s; curves ease-out/ease-in-out; the toggle 18 px/200 ms constant) and a `reduceMotion(context)` helper (from `MediaQuery.disableAnimations` / OS setting) plus an `AnimatedX` wrapper convention that cross-fades or snaps when reduce-motion is on; documentation of which motions are functional (recording dot → static dot + label; ink-replay dimming) vs decorative (dock edge-glow, skeleton shimmer, fly-ins).

**Out:** the actual animations inside components (each component uses these tokens — toggle [SN-DS-017](design-system.md#sn-ds-017), toast [SN-DS-019](design-system.md#sn-ds-019), skeleton [SN-DS-022](design-system.md#sn-ds-022)), the ink draw path (never animated, editor), and page-turn/zoom (editor/pages area).

#### Acceptance criteria

- [ ] Motion tokens exist and match the spec (toggle 18 px/200 ms; micro 150–200; surface 200–300; ≤ 350 chrome cap); components read them, not magic numbers.
- [ ] `reduceMotion` reflects the OS setting on iOS/Android/web and updates live.
- [ ] With reduce-motion on: directional/scale transitions become cross-fades; decorative pulses/shimmer/edge-glow stop; the recording indicator becomes a steady dot + “Recording” label; ink-replay may reduce to an instant reveal — verified via a matrix test.
- [ ] No component conveys state by motion alone; every animated state has a static colour+label equivalent (WCAG 1.4.1/2.3.3).
- [ ] Motion is interruptible (input takes precedence over an in-flight transition).

#### Technical notes

File `packages/sane_ui/lib/src/motion/sane_motion.dart`. Read `MediaQuery.of(context).disableAnimations` and platform reduce-motion. Provide `Duration`/`Curve` constants and a `SaneAnimatedSwitcher`/helper that swaps to `fade`/snap under reduce-motion. Values + rules: `ux-principles.md` §6, `accessibility.md` §6. Enables truthful “Reduced Motion” Apple nutrition label (§12).

#### Security & privacy

None beyond baseline: timing/curve tokens only; no data flow, logging, network or storage.

#### UX notes

Keeps the app calm and honest (`ux-principles.md` §0 “Calm”). The toast, toggle, overlay entrances, dock hints and skeleton all read from these tokens so timing is consistent across looks. Material look MAY use its emphasized motion; other looks stay restrained; Clay/Pop MAY use a soft spring on press. Reduce-motion is a hard requirement, not a nicety.

#### Test plan

Unit/widget: `packages/sane_ui/test/motion/sane_motion_test.dart` — token values; `reduceMotion` reflects a faked setting; a helper cross-fades/snaps under reduce-motion; a matrix test over toggle/toast/skeleton asserts the reduced variants and that each animated state has a static equivalent.

#### Dependencies

[SN-DS-011](theming.md#sn-ds-011) (context/scope); consumed by [SN-DS-017](design-system.md#sn-ds-017), [SN-DS-019](design-system.md#sn-ds-019), [SN-DS-022](design-system.md#sn-ds-022).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-026

<a id="sn-ds-026"></a>

**Implement adaptive layout primitives and window size classes**

| Field | Value |
|---|---|
| GitHub | #231 |
| Type | feature |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, perf, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-011](theming.md#sn-ds-011) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

One Flutter codebase adapts by **window size class, not device identity** — a phone, a small desktop window and a folded foldable all resolve to the compact layout (`docs/design/ux-principles.md` §8). The design's breakpoint is `narrow` < 900 px (sidebar → 68 px rail); the recommended size-class map is Compact < 600 dp, Medium 600–840, Expanded 840–1200, Large ≥ 1200. Every layout must reflow at **320 CSS px** with no 2-D scroll (WCAG 1.4.10). This issue provides the primitives (`SaneWindowClass`, `SaneAdaptive`, layout scaffolds) that the shell ([SN-DS-020](design-system.md#sn-ds-020)) and every screen build on, so adaptivity is consistent rather than ad-hoc per screen.

#### Scope

**In:** a `SaneWindowClass` enum + `windowClassOf(context)` (Compact/Medium/Expanded/Large from `MediaQuery.size`, aligned to Android window size classes / iPad windowing), the `narrow` < 900 px signal for sidebar collapse, a `SaneAdaptive`/`SaneLayoutBuilder` helper that selects a builder per class, and layout scaffolds (single-pane vs sidebar+content vs list/detail) with reflow rules (stack/wrap when narrow). Touch-target floors surfaced (≥ 44 pt / 48 dp / 24 px). Fixed editor geometry (page 800×1040 max 820 px; freeform 2400×2400) documented as chrome-fluid/canvas-fixed.

**Out:** the editor canvas itself (editor/`sane_render`), the sidebar widget ([SN-DS-020](design-system.md#sn-ds-020) consumes the class), foldable posture APIs (phones area, M5), and per-screen compositions (app screens).

#### Acceptance criteria

- [ ] `windowClassOf` returns Compact/Medium/Expanded/Large at the documented widths and updates on resize/rotation/fold without state loss.
- [ ] The `narrow` < 900 px signal drives sidebar collapse; desktop-only affordances hide below it.
- [ ] A `SaneAdaptive` example reflows at 320 CSS px with no horizontal scroll and no loss of function (WCAG 1.4.10); dialogs/palettes stack when narrow.
- [ ] Window-class changes do not reset scroll/selection/focus.
- [ ] Touch-target floors are exposed and honoured by consumers; the fixed-canvas / fluid-chrome rule is documented so the editor keeps page geometry while chrome reflows.

#### Technical notes

File `packages/sane_ui/lib/src/layout/sane_adaptive.dart`. Use `MediaQuery`/`LayoutBuilder`; align breakpoints to platform size classes (verify exact dp per `ux-principles.md` §8 table). Keep it a pure layout utility — state lives in `app/` (ADR-0003). Editor geometry note is documentation, not enforcement. Reflow rule per `accessibility.md` §2 (1.4.10).

#### Security & privacy

None beyond baseline: layout math only; no PII, no logging, no network/storage.

#### UX notes

Makes the same product feel right on a 400 px phone and a 1180×820 iPad (`design/Sane Notes.dc.html` reference frame). Palette dock defaults to a bottom row on compact; left-handed mode mirrors sides (composes with [SN-DS-020](design-system.md#sn-ds-020) and editor). Reduce-motion applies to the width-class transition. RTL mirrors panes. This is an M1 exit dependency (sidebar collapse, reflow).

#### Test plan

Widget: `packages/sane_ui/test/layout/sane_adaptive_test.dart` — class boundaries at 600/840/1200 and the 900 px narrow signal; a `SaneAdaptive` sample reflows at 320 px with no overflow; resize preserves scroll/selection/focus. Golden: a sample screen at Compact/Expanded widths.

#### Dependencies

[SN-DS-011](theming.md#sn-ds-011); consumed by [SN-DS-020](design-system.md#sn-ds-020).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-027

<a id="sn-ds-027"></a>

**Add golden tests for every component across all 17 looks and dark mode**

| Field | Value |
|---|---|
| GitHub | #613 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, qa, a11y |
| Size | M |
| SDLC | verification |
| Parent | [SN-DS-003](design-system.md#sn-ds-003) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-017](design-system.md#sn-ds-017), [SN-DS-018](design-system.md#sn-ds-018), [SN-DS-019](design-system.md#sn-ds-019) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

CLAUDE.md §9/§10 make golden tests mandatory for anything painted, across **all 17 looks and light + dark**. The design system is the biggest painted surface, so a systematic golden harness — every component × every look × both modes — is the regression net that keeps the token system honest as looks and components evolve. `ux-principles.md` §9.3 notes that testing one look per family (Warm/Clean/Bold/Soft/Raw) catches most issues, but the DS golden gate should cover all 17 for the component set since the whole promise is per-look fidelity.

#### Scope

**In:** a golden-test harness/utility (`pumpAcrossLooks`) that renders a given component widget in every `(lookId, mode)` and captures a golden; golden files for the core components (button/record, surface, chip/segmented/toggle/badge, text field/slider/progress, toast/dialog, nav item, avatar/icon/divider, empty/skeleton, theme card, mascot tile, ground); a documented update workflow (`--update-goldens`); font-loading in the test harness so goldens are deterministic; wiring into CI as a gate.

**Out:** ink/brush goldens (editor/`sane_render`), the drift/contrast CI gate ([SN-DS-007](design-system.md#sn-ds-007), a numeric gate, complementary to these pixel goldens), and the Widgetbook app ([SN-DS-028](design-system.md#sn-ds-028)).

#### Acceptance criteria

- [ ] `pumpAcrossLooks` renders any component in all 34 `(look, mode)` combos with the bundled fonts loaded (deterministic, no fallback substitution).
- [ ] Golden coverage exists for every core component listed in scope; a missing golden for a shipped component fails a coverage check.
- [ ] Goldens run headlessly in CI and fail on unintended pixel drift; the update workflow is documented.
- [ ] Goldens include the key states (default/hover/pressed/focus/disabled/selected) for at least the button and one selection control, and wallpaper-mode + glass surfaces.
- [ ] The harness pins device pixel ratio and text scale so goldens are stable across machines.

#### Technical notes

Files under `packages/sane_ui/test/goldens/` + `test/support/pump_across_looks.dart`. Use `flutter_test` `matchesGoldenFile` (or `alchemist`/`golden_toolkit` if adopted by SN-FND-004). Load fonts via a test `FontLoader` from [SN-DS-009](design-system.md#sn-ds-009) assets. Gate in the Flutter CI (SN-FND-003). Look list from `tokens.json` `lookOrder`.

#### Security & privacy

None beyond baseline: renders sample/fixture data only — no real note content in goldens (a fixture must never embed PII). No network/storage beyond the golden files.

#### UX notes

This is how “every look, both modes” (CLAUDE.md §9) becomes enforceable rather than aspirational. Goldens are the visual contract for the 17 looks shown in `design/Sane Notes.dc.html`. They also catch contrast-relevant regressions (though the numeric AA gate is [SN-DS-007](design-system.md#sn-ds-007)). A11y: goldens complement, not replace, the semantics suite ([SN-DS-029](a11y.md#sn-ds-029)).

#### Test plan

This issue **is** the test layer. Self-verification: a deliberate token tweak flips a golden (proving the net works) and is reverted; a coverage test lists shipped components and asserts each has a golden. CI runs the full set green.

#### Dependencies

[SN-DS-003](design-system.md#sn-ds-003), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-017](design-system.md#sn-ds-017), [SN-DS-018](design-system.md#sn-ds-018), [SN-DS-019](design-system.md#sn-ds-019) (the components to snapshot); fonts [SN-DS-009](design-system.md#sn-ds-009).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-DS-028

<a id="sn-ds-028"></a>

**Build the Widgetbook component gallery app**

| Field | Value |
|---|---|
| GitHub | #232 |
| Type | infra |
| Priority | p3 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, devx, qa |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-017](design-system.md#sn-ds-017) |
| Security controls | `MASVS-CODE-1`, `CWE-489` |
| Extra labels | agent-ready |

#### Context

A Storybook-like gallery lets designers and agents see every `sane_ui` component in every look, mode and state with live knobs — the fastest way to review the design system, catch look regressions, and hand components to screen builders. `docs/design/README.md` and the component inventory imply a single browsable catalogue; Widgetbook is the Flutter-native tool for it. It also doubles as the manual companion to the golden suite ([SN-DS-027](design-system.md#sn-ds-027)). Because it is a developer tool, it must never ship inside the product binary.

#### Scope

**In:** a Widgetbook app (`apps/gallery/` or `packages/sane_ui/widgetbook/`) with a use-case per component (buttons, record, surface, chips/segmented/toggle, badges, inputs, slider, progress, toast, dialog, nav, list row, avatar, icon set, empty/skeleton, tooltip, theme card, mascot, ground) and global addons/knobs for **look (17), mode (light/dark), text scale, and reduce-motion**; wired so switching the look addon swaps `SaneLookScope`; a build target separate from the app so it is excluded from release.

**Out:** the components themselves (their own issues), golden generation ([SN-DS-027](design-system.md#sn-ds-027)), and publishing the gallery as a hosted site (a website/devx follow-up).

#### Acceptance criteria

- [ ] Every core component has a Widgetbook use-case; the look/mode/text-scale/reduce-motion addons re-render it live.
- [ ] Switching the look addon across all 17 looks and toggling dark mode re-skins the previewed component correctly.
- [ ] The gallery builds and runs on desktop/web for review; it is a **separate build target** and cannot be compiled into or reached from the release app (verified).
- [ ] Text-scale and reduce-motion addons let a reviewer sanity-check 200% scaling and reduced motion per component.
- [ ] Adding a new component without a use-case is flagged (a lightweight coverage note or lint).

#### Technical notes

Add `widgetbook` (pin the version) as a dev-only dependency; app under `apps/gallery/` per ADR-0002 layout, importing only `packages/sane_ui`. Addons drive `SaneLookScope` ([SN-DS-011](theming.md#sn-ds-011)) and `MediaQuery` overrides for scale/reduce-motion. Keep it out of the app's dependency graph so tree-shaking/release cannot include it. Follows SN-FND-004 workspace config.

#### Security & privacy

Build hygiene (CWE-489 leftover debug/dev code; MASVS-CODE-1): the gallery is a dev tool and MUST NOT be linked into any release artifact — a separate target + a CI check enforce this. It renders only fixture data (no real note content, no PII). No network egress; no secrets.

#### UX notes

The gallery is the reference implementation of “every component in every look × mode × state” from `component-inventory.md` §9. It is the review surface for the 17-look promise and the onboarding aid for new builders (`design/Sane Notes.dc.html` is the fidelity reference; the gallery is the live one). Not user-facing; a11y of the gallery chrome itself is best-effort.

#### Test plan

Smoke: `apps/gallery/test/gallery_boots_test.dart` (the app builds and lists use-cases). CI: a check that the release app target does not depend on `widgetbook` or `apps/gallery`. Manual: switch every addon across a few components.

#### Dependencies

[SN-DS-003](design-system.md#sn-ds-003), [SN-DS-016](design-system.md#sn-ds-016), [SN-DS-017](design-system.md#sn-ds-017) (components to showcase); scope [SN-DS-011](theming.md#sn-ds-011).

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GPHN-006

<a id="sn-gphn-006"></a>

**Present the modal overlays as phone bottom sheets**

| Field | Value |
|---|---|
| GitHub | #1019 |
| Type | feature |
| Priority | p2 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | design-system, compat |
| Size | M |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-002](compat.md#sn-phn-002), [SN-DS-019](design-system.md#sn-ds-019), [SN-TPL-006](templates.md#sn-tpl-006) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PLATFORM-3` |
| Extra labels | agent-ready |

#### Context
The design's five modal overlays — Onboarding, Templates ("New notebook" / "Paper & template"), Share, Import PDF and Upgrade — render as centred, dimmed-backdrop dialogs sized for a tablet (docs/design/screens-and-flows.md §1 modals table). On a phone a centred dialog either overflows a 390 dp screen or wastes the thumb zone; docs/platform/phones.md §3 and §7 require these to open as bottom sheets that slide from the bottom, and ux-principles.md §8 requires all dialogs to reflow/stack when narrow. [SN-DS-019](design-system.md#sn-ds-019) provides the overlay scaffold, dialog and bottom-sheet primitives; each overlay is authored platform-agnostically. This issue makes the four large modal overlays present as full-height, drag-dismissible, safe-area-aware, scrollable bottom sheets on the compact class. (The palette's own colour/brush pickers are already sheets via [SN-PHN-004](editor.md#sn-phn-004), and Onboarding's compact form is owned by [SN-ONB-005](onboarding.md#sn-onb-005); both are out of scope here.)

#### Scope
**In:** the compact presentation of the Templates ([SN-TPL-006](templates.md#sn-tpl-006)), Share ([SN-SHR-014](sharing-export.md#sn-shr-014)), Import PDF (SN-PDF-006) and Upgrade ([SN-BILL-011](billing.md#sn-bill-011)) overlays as bottom sheets — drag handle mapped to the look's grip, full-height with internal scroll, safe-area insets, drag-to-dismiss with an unsaved-input guard where relevant, and keyboard coordination via [SN-GPHN-002](editor.md#sn-gphn-002) for their text fields; a shared `showSaneSheet` presentation policy the overlays adopt on the compact class.
**Out:** the overlay contents and behaviour themselves (owned by SN-TPL/SN-SHR/SN-PDF/SN-BILL); the colour/brush pickers ([SN-PHN-004](editor.md#sn-phn-004)); the onboarding tour ([SN-ONB-005](onboarding.md#sn-onb-005)); the OS share sheet OUT ([SN-SHR-010](sharing-export.md#sn-shr-010)); and native IAP presentation (SN-BILL-006/007).

#### Acceptance criteria
- [ ] On the compact class, Templates, Share, Import PDF and Upgrade each present as a bottom sheet that slides up from the bottom with the look's drag-handle treatment; on medium and above they present as the existing centred overlays.
- [ ] Each sheet is scrollable when its content exceeds the viewport and never clips its footer actions (Create notebook / Copy link / import source / Start trial).
- [ ] Sheets respect bottom and top safe-area insets and never sit under the home indicator or a display cutout.
- [ ] Drag-to-dismiss and backdrop-tap close the sheet, but a sheet with unsaved input (e.g. a typed invite email, a chosen template not yet applied) confirms before discarding, per ux-principles.md §4.3.
- [ ] Text fields inside a sheet (Share invite, paste-a-link) stay visible above the keyboard via [SN-GPHN-002](editor.md#sn-gphn-002).
- [ ] The free-plan gates still fire from within the sheets (Import >= 5 -> Upgrade; Share >= 3 people -> Upgrade), so the phone path cannot bypass a limit.
- [ ] Every control is >= 44x44 pt / 48x48 dp with `Semantics`; the sheet announces its title on open and traps focus while open.
- [ ] Opening/closing a sheet drops no frame at 60 fps on Android-lowend.
- [ ] All four sheets render correctly in all 17 looks and dark mode, including the glass/wallpaper surface treatments.

#### Technical notes
Add a `showSaneSheet` helper in `app/lib/shell/` wrapping `showModalBottomSheet` with `useSafeArea: true`, `isScrollControlled: true`, `showDragHandle` mapped to the look grip, and the unsaved-input guard; the four overlays choose sheet-vs-dialog presentation from the size class ([SN-PHN-002](compat.md#sn-phn-002)) at their call site, reusing their existing body widgets unchanged. Do not fork the overlay bodies — same widget, different host — so the 17 looks and behaviour are preserved (docs/design/component-inventory.md, CLAUDE.md §9). Keyboard handling from [SN-GPHN-002](editor.md#sn-gphn-002). Route/deep-link behaviour is unchanged (ADR-0003). Never branch on platform identity (CLAUDE.md §8). The shared `showSaneSheet` policy and the Templates/PDF/Upgrade adoptions ship in M5; [SN-SHR-014](sharing-export.md#sn-shr-014) (Share overlay, M6) adopts it at its own call site later.

#### Security & privacy
None beyond baseline, with one control. **T-SHEET-SNAPSHOT** — a Share sheet showing a link/permission or an Upgrade sheet is captured in the task-switcher snapshot; the shell-level screenshot/lock deterrent ([SN-PHN-015](security.md#sn-phn-015)) must cover sheets too, so a protected notebook's share link is not exposed (MASVS-PLATFORM-3, MASVS-PRIVACY-2, CWE-200). Baseline: no field values (invite emails, pasted links) logged (MASVS-PRIVACY-1, CWE-532); the paste-a-link import path stays behind the inbound-validation gate ([SN-PHN-014](notifications.md#sn-phn-014)) and this presentation change must not bypass it. No new permission or egress.

#### UX notes
Source: docs/design/screens-and-flows.md §8-§13 (Templates, Import, Share, Upgrade). Sheets slide from the bottom (phones.md §7), which is also where the thumb is; the calm, no-dead-end voice is unchanged (ux-principles.md §5) — e.g. Import errors are toasts with a recovery, gates route to a clear Upgrade explanation (§4.3, cross-cutting "every limit has a door"). Motion: sheet entrance 200-300 ms ease-out, cross-fade under Reduce Motion (§6). The dimmed backdrop remains. a11y: focus moves into the sheet on open and returns to the trigger on close; the sheet is a labelled dialog to assistive tech. Note the watermarked-mascot blocker: the Upgrade sheet must not ship placeholder Sage art in a store build (CLAUDE.md §9).

#### Test plan
- `app/test/shell/sane_sheet_test.dart` — compact presents a sheet, medium+ presents a dialog; safe-area insets; drag-to-dismiss with unsaved-input guard.
- `app/test/overlays/share_sheet_compact_test.dart` — Share as a sheet; invite field visible above the keyboard; 3-person free gate still fires.
- `app/test/overlays/import_upgrade_gate_test.dart` — Import sheet at 5 imports routes to Upgrade; Upgrade sheet Start-trial flow.
- `app/test/golden/phone/overlay_sheets_golden_test.dart` — goldens for all four sheets per look family, light and dark.
- `app/integration_test/phone_overlays_test.dart` — patrol run opening each overlay on a phone profile.

#### Dependencies
[SN-PHN-002](compat.md#sn-phn-002) (size class), [SN-DS-019](design-system.md#sn-ds-019) (sheet chrome), [SN-TPL-006](templates.md#sn-tpl-006) (Templates overlay adopting the sheet). The Share overlay [SN-SHR-014](sharing-export.md#sn-shr-014) (M6) adopts this `showSaneSheet` policy when it is built; it is a consumer, not a scheduling dependency.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GUX-001

<a id="sn-gux-001"></a>

**Define the --bgs inverse-ground token and the inverted-surface rule**

| Field | Value |
|---|---|
| GitHub | #1039 |
| Type | task |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | design-system, theming, a11y |
| Size | S |
| SDLC | design |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-DS-005](design-system.md#sn-ds-005), [SN-DS-006](design-system.md#sn-ds-006) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

`docs/design/design-system.md` defines exactly **13 palette keys** per look and mode (`bg sf sf2 ink mu ln ac aci acs ac2 pp pl sh`), and `docs/design/tokens.json` mirrors them. But two component rules consume a fourteenth token that nobody defines: the **active chip** is "`--ink` bg with `--bgs` text" (§5 "Chips · Segmented · Toggle") and the **toast** — the app's only inverted surface — is "`--ink` on `--bgs`" (§5 "Search result · Toast"). The web guidance even lists `--bgs` in the emitted custom-property set and glosses it as "the ground behind, used as inverse text on chips/toasts". So [SN-DS-008](design-system.md#sn-ds-008) must emit it, [SN-DS-017](design-system.md#sn-ds-017) and [SN-DS-019](design-system.md#sn-ds-019) must read it, and [SN-DS-002](design-system.md#sn-ds-002) has nothing to bind it to. Left undecided, five surfaces will each invent their own inverted text colour (usually a hard-coded `#fff`), which breaks the "never hard-code a colour" rule in `CLAUDE.md` §9 and silently fails contrast in the looks whose ground is light-on-light (Brutalism `#ffffff`, Editorial `#ffffff`, Minimalism `#f3f4f7`).

#### Scope

**In:** the decision and its encoding — whether `bgs` is derived (the look's `bg` for that mode) or authored per look×mode; the added key in `tokens.json` for all 34 look×mode combinations; the documentation update in `design-system.md` §4 (palette keys becomes 14, with the derivation rule stated); exposure through the Dart `SaneLook` ([SN-DS-002](design-system.md#sn-ds-002)), the web custom properties ([SN-DS-008](design-system.md#sn-ds-008)) and the native resource map; an accessibility-adjusted `bgsA11y` following the pattern of `aciA11y`/`acIconA11y` from [SN-DS-006](design-system.md#sn-ds-006) wherever `ink`-on-`bgs` falls below 4.5:1; and the contrast assertion wired into the gate in [SN-DS-007](design-system.md#sn-ds-007).

**Out:** the toast and chip widgets themselves ([SN-DS-019](design-system.md#sn-ds-019), [SN-DS-017](design-system.md#sn-ds-017)), the golden images ([SN-DS-027](design-system.md#sn-ds-027)), and any new inverted surface (the toast stays the only one, per `ux-principles.md` §2).

#### Acceptance criteria

- [ ] `tokens.json` carries an explicit `bgs` (and, where needed, `bgsA11y`) for every one of the 34 look×mode combinations, generated or authored by a documented rule — not hand-typed per look.
- [ ] `design-system.md` §4 states the rule and the palette-key count is corrected from 13 to 14 (or `bgs` is documented as derived, with the derivation formula).
- [ ] `SaneLook.bgs` exists in the generated Dart, `--bgs` is emitted by the web generator, and the native map includes it; regeneration is byte-identical.
- [ ] Active chip (`ink` background, `bgs` text) and toast (`ink` on `bgs`) both measure ≥ 4.5:1 in all 34 combinations; any failing pair resolves to the adjusted token, and the pair list is printed by the gate.
- [ ] A repository grep proves no widget hard-codes `#fff`/`Colors.white`/`Colors.black` for inverted text.
- [ ] The wallpaper case is covered: toast and active chip stay ≥ 4.5:1 over the frosted 84%-translucent surface at maximum veil ([SN-DS-014](theming.md#sn-ds-014)).

#### Technical notes

Touch `docs/design/tokens.json`, `docs/design/design-system.md`, `packages/sane_ui/tool/gen_looks.dart`, the generated `packages/sane_ui/lib/src/theme/looks.g.dart`, and the web generator from [SN-DS-008](design-system.md#sn-ds-008). Reuse the contrast maths and the adjustment strategy already specified for `aciA11y` in `docs/design/accessibility.md` §4.1 — do not invent a second algorithm. Note the parsing traps flagged in `design-system.md` "Implementation guidance": some grounds are translucent (`rgba(...)` in Glassmorphism and Y2K), so a derived `bgs` must be composited against the look's opaque base before it is used as a text colour.

#### Security & privacy

None beyond baseline — design tokens carry no secrets or personal data. One indirect control: the toast is the app's error channel ("toasts replace red error text everywhere"), so an unreadable toast is a security-usability failure — a user who cannot read "Couldn't import that PDF" cannot act on it. Keeping the inverted pair legible in every look is therefore part of the [SN-SEC-021](security.md#sn-sec-021) no-silent-failure posture.

#### UX notes

Design references: `docs/design/design-system.md` §5 (Chips, Toast), `docs/design/component-inventory.md` §2–3 (`SaneChip`, `SaneToast`), `docs/design/ux-principles.md` §2 ("One inverted surface only: the toast"). The toast must read as deliberately inverted in every look — including Brutalism and Editorial, where the ground is pure white and a naive `bgs = bg` yields white-on-black, which is correct, and Neumorphism, where ground and surface are the same colour and the inversion must still be visible.

#### Test plan

`packages/sane_ui/test/theme/bgs_contrast_test.dart` — iterate all 34 combinations, assert the two inverted pairings meet 4.5:1 using the shared contrast helper. `packages/sane_ui/test/theme/tokens_shape_test.dart` — assert every look exposes `bgs`. Golden: extend the toast and chip goldens in [SN-DS-027](design-system.md#sn-ds-027) so the inverted surface is captured per look and mode. Manual: switch through all 17 looks with a toast pinned open, in light, dark and wallpaper mode.

#### Dependencies

[SN-DS-002](design-system.md#sn-ds-002), [SN-DS-005](design-system.md#sn-ds-005), [SN-DS-006](design-system.md#sn-ds-006)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GUX-002

<a id="sn-gux-002"></a>

**Gate tokens.json against the design canvas source with a drift check**

| Field | Value |
|---|---|
| GitHub | #1040 |
| Type | infra |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | design-system, ci-cd, docs |
| Size | S |
| SDLC | verification |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-007](design-system.md#sn-ds-007) |
| Security controls | `CWE-94`, `OWASP-A08`, `sec-supply-chain` |
| Extra labels | agent-ready |

#### Context

`docs/design/design-system.md` opens by stating that the whole sheet is "extracted verbatim from the Claude Design canvas bundle: `design/sane-data.js` … and `design/Sane Notes Design Sheet.dc.html`", and that "the JSON mirrors `sane-data.js` exactly". Every downstream artefact is chained to that claim: `tokens.json` → generated Dart ([SN-DS-002](design-system.md#sn-ds-002)) → generated web CSS ([SN-DS-008](design-system.md#sn-ds-008)) → components → goldens. [SN-DS-007](design-system.md#sn-ds-007) gates the *downstream* half (generated files must match `tokens.json`), but nothing gates the *upstream* half. If a maintainer tweaks a look in the canvas — which is the artefact they actually design in — `tokens.json` silently diverges and every platform inherits a stale palette while CI stays green. This is the one link in the "single source of truth" chain with no check on it.

#### Scope

**In:** a Node script `scripts/check-design-tokens.mjs` that statically extracts the data tables from `design/sane-data.js` (17 look sheets with their light/dark maps and feel tokens, `INK`, `DARK_INK`, `HL`, `WIDTHS`, `PAPER_FILL`, `TINT`/`TINTS`, `WALLS`, the font stack aliases, page `W`/`H`/freeform) and compares them key-by-key against `docs/design/tokens.json`; a readable diff on failure (`looks.cyber.dark.ac: canvas "#00f0ff" vs tokens "#00e5ff"`); an allow-list file `docs/design/token-divergences.json` where a deliberate divergence is recorded with a reason and a date; a CI job wired next to the [SN-DS-007](design-system.md#sn-ds-007) gate; a "re-syncing from the canvas" section in `docs/design/README.md`.

**Out:** the downstream generator drift check ([SN-DS-007](design-system.md#sn-ds-007)), contrast floors ([SN-DS-006](design-system.md#sn-ds-006)/[SN-DS-007](design-system.md#sn-ds-007)), and any change to the canvas bundle itself.

#### Acceptance criteria

- [ ] The script compares every look × mode × palette key plus every feel token, and the shared drawing constants, and exits non-zero on any unrecorded difference.
- [ ] A seeded fixture with one altered hex fails the check and names the exact path.
- [ ] Divergences listed in `token-divergences.json` (path, canvas value, tokens value, reason, owner) pass, and the report prints them so they stay visible.
- [ ] The check never executes the design bundle: it parses it (a JS parser or a restricted extraction), and a test proves a bundle containing `process.exit(0)` or a network call does not run.
- [ ] Runs in under 10 s and is wired into the same workflow as the existing token gate; failure output is copy-pasteable.
- [ ] `docs/design/README.md` documents the re-sync flow: edit the canvas → run the extractor → review the diff → update `tokens.json` and regenerate.

#### Technical notes

`design/sane-data.js` is a plain data module; extract with a real parser (for example `acorn` walking top-level `const` declarations) rather than a regex, and never with `eval`, `vm.runInThisContext` or a dynamic `import()` — the file is a design artefact that can change shape at any time. Keep the script dependency-light and Node-only so it can run in the same job as `scripts/validate-issues.mjs`. Extend, don't fork, the CI job created by [SN-DS-007](design-system.md#sn-ds-007).

#### Security & privacy

This is a supply-chain control. Executing a design bundle in CI to read its values would turn a design edit into arbitrary code execution inside a workflow that holds a `GITHUB_TOKEN` (CWE-94; OWASP A08 Software and Data Integrity Failures). The static-parse requirement is the mitigation and must be asserted by a test. It also aligns with [SN-CI-009](ci-cd.md#sn-ci-009) (least-privilege token) — this job needs `contents: read` only.

#### UX notes

Not user-facing, but it protects the user-facing invariant that motivates the whole design system: every platform renders identically from one token sheet (`design-system.md` "Implementation guidance"). A silent upstream drift shows up to users as a notebook whose chrome changed colour after an update.

#### Test plan

`tools/test/check_design_tokens_test.mjs` (or the repo's Node test location): a fixture pair that matches (passes), a fixture with one changed value (fails with the right path), a fixture with a recorded divergence (passes and prints it), and a hostile fixture containing side-effecting code (proves no execution). CI: the job runs on every PR touching `design/**` or `docs/design/**`.

#### Dependencies

[SN-DS-007](design-system.md#sn-ds-007)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GUX-004

<a id="sn-gux-004"></a>

**Ban look-id branching and colour literals outside the token layer**

| Field | Value |
|---|---|
| GitHub | #1042 |
| Type | infra |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, ci-cd, theming |
| Size | S |
| SDLC | verification |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-007](design-system.md#sn-ds-007), [SN-FND-008](devx.md#sn-fnd-008) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

`docs/design/ux-principles.md` §9 states the rule as a MUST: "The behavior of a component MUST derive entirely from tokens — **no component may branch on look id**", with the feel tokens (`glass`, `inset`, `btnSh`, `cardSh`, `bgi`, `tf`, `hst`, `hw`, `ls`, `pill`, `r`, `rs`, `bw`) as the only sanctioned way a look changes behaviour. `component-inventory.md` repeats it. Today [SN-DS-007](design-system.md#sn-ds-007) greps **only `packages/sane_ui/lib`** for hex literals, and nothing anywhere forbids `if (look.id == 'cyber')`. The moment one screen in `app/` special-cases Cyberpunk or hard-codes `Color(0xFF1F1F24)`, the 17-look promise decays silently: goldens for that look still pass because they were captured after the branch was added, and the a11y-adjusted tokens ([SN-DS-006](design-system.md#sn-ds-006)) get bypassed exactly where they were needed.

#### Scope

**In:** two new rules in the existing arch-lint from [SN-FND-008](devx.md#sn-fnd-008), applied to `app/` and every `packages/*/lib` UI layer: (1) **no colour literals** — `Color(0x…)`, `Colors.*`, `#rrggbb` strings — with a machine-readable allow-list for the generated theme file, the fixed-colour record button (`#e0443a` on `#fff`, the one specified exception), the shared ink/highlighter constants (`INK`, `DARK_INK`, `HL`) and the wallpaper preset gradients; (2) **no look-id branching** — comparisons, switches or map lookups keyed on `SaneLook.id`, `lookId` or a look name string — outside `packages/sane_ui/lib/src/theme/`. Each violation reports the token to use instead. An `// sane-lint: allow-look-branch(reason)` escape hatch that CI counts and reports so the number can only go down.

**Out:** the token drift and contrast gate ([SN-DS-007](design-system.md#sn-ds-007)), the package-DAG rules already in [SN-FND-008](devx.md#sn-fnd-008), and golden coverage ([SN-DS-027](design-system.md#sn-ds-027), [SN-GUX-015](qa.md#sn-gux-015)).

#### Acceptance criteria

- [ ] A fixture containing `if (look.id == 'brutal')` in `app/` fails the lint with a message pointing at the feel tokens.
- [ ] A fixture containing `Colors.white` in a widget fails; the same literal inside the generated theme or the allow-listed record button passes.
- [ ] The allow-list is a checked-in file with a reason per entry, not an inline regex, and is printed in the CI summary.
- [ ] The lint runs in the same CI job as the existing arch-lint and adds under 15 s.
- [ ] The rules are documented in `CONTRIBUTING.md` and `CLAUDE.md` §9 next to the existing "never hard-code a colour" line.
- [ ] Escape-hatch usages are counted and the count is reported; a PR that raises it is flagged for review.

#### Technical notes

Extend `tools/arch_lint` (or wherever [SN-FND-008](devx.md#sn-fnd-008) landed) rather than adding a second tool, so contributors have one failure surface. Detect the ink constants by import rather than by value so a legitimate `INK[0]` use is not flagged. For Dart, walk the analyzer AST; for the web target from [SN-DS-008](design-system.md#sn-ds-008), the equivalent check is "no literal colour in CSS outside the generated theme block". Keep messages actionable: name the palette key (`use look.ac, not Colors.blue`).

#### Security & privacy

Indirect but real: look-id branching is how the accessibility-adjusted tokens get bypassed (`ux-principles.md` §9.2 — several looks fail contrast on raw `ac`/`aci` and MUST use the adjusted token), and a bypassed contrast floor is an accessibility defect with store-declaration consequences ([SN-A11Y-017](a11y.md#sn-a11y-017)). No secrets or data-flow impact otherwise.

#### UX notes

The rule exists so a new component can be authored once in the Paper look and trusted in all seventeen (`ux-principles.md` §9.3). The lint's error message should teach that: point the author at the feel token that expresses what they were trying to special-case (pressed state → `inset`; translucency → `glass`; uppercase → `tf`).

#### Test plan

`tools/arch_lint/test/look_purity_test.dart` — fixtures for each rule, each allow-list entry, and the escape hatch. A repository-wide run over the current tree must pass (or produce a recorded, reviewed allow-list) so the gate can be turned on immediately rather than "later".

#### Dependencies

[SN-DS-007](design-system.md#sn-ds-007), [SN-FND-008](devx.md#sn-fnd-008)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GUX-005

<a id="sn-gux-005"></a>

**Add the cross-look invariant test suite for sizes, semantics and selection**

| Field | Value |
|---|---|
| GitHub | #1043 |
| Type | test |
| Priority | p1 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, qa, a11y |
| Size | M |
| SDLC | verification |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-003](design-system.md#sn-ds-003), [SN-DS-027](design-system.md#sn-ds-027), [SN-DS-029](a11y.md#sn-ds-029) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

`docs/design/ux-principles.md` §9.2 lists the invariants that MUST hold across all 17 looks: component heights are fixed (chrome button 42, tool button 44, chip 34, toggle 46×28, icon button 40×40, record button 38) while radius and shadow change; **semantics never change with look** — a toggle is a toggle to every accessibility API, and casing (`tf: uppercase` in Brutalism, Retro, Cyberpunk, Editorial) is visual only and never applied to the accessible name; the active tool reads `--ac`/`--aci` in every look; badges are facts, not decoration. [SN-DS-027](design-system.md#sn-ds-027) captures golden images and [SN-DS-029](a11y.md#sn-ds-029) runs per-component accessibility checks, but neither asserts *sameness across looks* — a golden compares a look against its own previous image, so a look-specific regression (Cyberpunk's `pill: 2px` quietly shrinking a chip's height, or Editorial's uppercase transform leaking into `Semantics.label`) is captured as the new truth rather than failed.

#### Scope

**In:** a parameterised widget-test suite in `sane_ui` that, for every `(lookId, mode)` pair: measures the rendered size of each size-fixed component at default text scale and asserts equality with `componentSizes` in `tokens.json`; captures the `SemanticsNode` tree for a representative set (button, toggle, chip, segmented, nav item, tool button, badge, toast) and asserts role, label, state and value are identical across all 34 combinations; asserts that in an uppercase look the accessible name is *not* uppercased while the painted text is; asserts a selected/active element carries a non-colour signal (weight, ring, `selected`/`aria-current`) in every look; asserts the record button's fixed colours (`#e0443a`, `#fff`) are look-invariant; asserts each badge exposes its text ("Audio", "PDF", "Shared", "PRO") to the accessibility API.

**Out:** pixel goldens ([SN-DS-027](design-system.md#sn-ds-027)), the per-component a11y coverage suite ([SN-DS-029](a11y.md#sn-ds-029)), touch-target minimums ([SN-A11Y-002](a11y.md#sn-a11y-002)/[SN-PHN-019](a11y.md#sn-phn-019)), and the text-scale growth rule — [SN-A11Y-005](a11y.md#sn-a11y-005) owns how heights grow above default scale; this suite pins the value **at** default scale only and must be updated in lockstep if that rule lands.

#### Acceptance criteria

- [ ] The suite runs all 34 look×mode combinations for every listed component and fails with a message naming the look, the component and the measured vs expected value.
- [ ] Changing one look's `pill` or `rs` token does not change any measured height; a seeded mutation that does change a height fails the suite.
- [ ] An injected `.toUpperCase()` on an accessible name fails the suite.
- [ ] An injected colour-only selection state (accent fill with no weight/ring/flag change) fails the suite.
- [ ] Total runtime under 60 s in CI (no image capture, semantics and layout only) and wired into the standard test job, not the nightly one.
- [ ] The invariant list in the test file cites `ux-principles.md` §9.2 line by line so the two cannot drift.

#### Technical notes

Use `WidgetTester.getSize`, `tester.getSemantics` / `SemanticsTester`, and the `pumpAcrossLooks` helper from [SN-DS-027](design-system.md#sn-ds-027) / `goldenMatrix` from [SN-QA-005](qa.md#sn-qa-005) so there is one way to enumerate looks. Keep the component list data-driven from the same table the component inventory gate reads ([SN-GUX-006](design-system.md#sn-gux-006)) so a new component is covered by construction. Pin `textScaler` to 1.0 and `devicePixelRatio` explicitly.

#### Security & privacy

None beyond baseline. Indirectly supports the accessibility-conformance claims in [SN-A11Y-017](a11y.md#sn-a11y-017)/[SN-A11Y-018](a11y.md#sn-a11y-018), which are legal statements about the product, so a regression here has compliance consequences rather than security ones.

#### UX notes

This suite is the machine-readable form of "a single component set is authored in the Paper look and restyled by every look's token sheet" (`ux-principles.md` §9). It is also the guard for §9.3's family heuristic: if the invariants hold in Paper, Minimalism, Pop, Neumorphism and Brutalism, they hold everywhere — the suite proves that claim instead of trusting it.

#### Test plan

New: `packages/sane_ui/test/looks/invariants_size_test.dart`, `packages/sane_ui/test/looks/invariants_semantics_test.dart`, `packages/sane_ui/test/looks/invariants_selection_test.dart`. Each file is parameterised over the 17 looks × 2 modes. Include three negative fixtures (mutated height, uppercased name, colour-only selection) proving the suite can fail.

#### Dependencies

[SN-DS-003](design-system.md#sn-ds-003), [SN-DS-027](design-system.md#sn-ds-027), [SN-DS-029](a11y.md#sn-ds-029)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GUX-006

<a id="sn-gux-006"></a>

**Add the component-inventory coverage gate**

| Field | Value |
|---|---|
| GitHub | #1044 |
| Type | infra |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | all |
| Areas | design-system, qa, docs |
| Size | S |
| SDLC | verification |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-027](design-system.md#sn-ds-027), [SN-DS-029](a11y.md#sn-ds-029) |
| Security controls | — |
| Extra labels | agent-ready |

#### Context

`docs/design/component-inventory.md` is the contract for the design system: roughly seventy components across ten tables, each with a proposed `Sane*` widget name, its variants, its states and the screens it appears on, plus a §10 coverage map asserting "every component traces to a screen". The document itself warns that "**Widget names are proposed** … **verify** before treating a name as canonical". Nothing checks the built package against it. In practice this means a component can be renamed, merged away or never built, and the only signal is a human noticing a missing row months later — while every issue in the backlog keeps citing the inventory as if it were true.

#### Scope

**In:** `scripts/check-component-inventory.mjs` that parses the markdown tables into `(widget, table, screens)` tuples and asserts for each: the symbol is exported from `packages/sane_ui` (or appears in a checked-in `app-composition` allow-list that names the owning issue key, for the compositions the design system deliberately does not own, such as `SaneUpsellCard` or `SaneProfileSwitcher`); at least one golden file exists under the golden path convention from [SN-QA-005](qa.md#sn-qa-005); the widget appears in the accessibility suite from [SN-DS-029](a11y.md#sn-ds-029). Output: a coverage report artifact (`built / allow-listed / missing`, with percentages per table) plus a non-zero exit when a row is neither built nor allow-listed. A rename must update the doc and the code in the same PR — the gate is what makes that true.

**Out:** building the missing components (each area's own issues), the golden harness ([SN-QA-005](qa.md#sn-qa-005)), the a11y suite ([SN-DS-029](a11y.md#sn-ds-029)), and the screens-and-flows coverage side ([SN-GUX-016](design-system.md#sn-gux-016) covers screen-level fidelity review).

#### Acceptance criteria

- [ ] Every row in all ten inventory tables resolves to a built symbol, an allow-list entry with an issue key, or a failure.
- [ ] The gate reports golden and a11y coverage per component and fails when a built component has neither.
- [ ] Renaming `SaneSwatch` without touching the doc fails the gate; renaming both passes.
- [ ] The report is published as a CI artifact and summarised in the job output (e.g. "62/70 built, 6 allow-listed, 2 missing").
- [ ] The gate is advisory (warn) until the end of M1 and blocking from M2, with the switch a one-line config change.
- [ ] Parsing is resilient to table formatting changes (a malformed table fails loudly rather than silently covering nothing).

#### Technical notes

Node-only, next to `scripts/validate-issues.mjs` and `scripts/render-issues.mjs`, reusing their conventions (plain ESM, no dependencies, `--json` mode). Extract Dart exports by reading `packages/sane_ui/lib/sane_ui.dart` and its `export` directives rather than parsing every file. Golden discovery uses the structured path from [SN-QA-005](qa.md#sn-qa-005) (`test/goldens/<component>/<look>-<mode>.png`). Keep the allow-list at `docs/design/component-owners.json` so the inventory stays prose and the machine data stays JSON.

#### Security & privacy

None beyond baseline. The script reads repository files only and must not execute Dart or fetch anything, keeping it safe to run in a least-privilege job ([SN-CI-009](ci-cd.md#sn-ci-009)).

#### UX notes

The user-visible value is consistency: a component that exists in the inventory but not in the build becomes an ad-hoc reimplementation on one screen, which is precisely the "platform inconsistency" failure `ux-principles.md` §10 names as the competitors' biggest gap. The coverage report is also the fastest way for a new agent to see what is left to build in `sane_ui`.

#### Test plan

`tools/test/check_component_inventory_test.mjs` — fixtures: a matching doc/package pair passes; a renamed widget fails; an allow-listed row passes and is reported; a built component with no golden is reported as partial; a corrupted table fails loudly. CI: runs on PRs touching `docs/design/component-inventory.md` or `packages/sane_ui/**`.

#### Dependencies

[SN-DS-027](design-system.md#sn-ds-027), [SN-DS-029](a11y.md#sn-ds-029)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GUX-009

<a id="sn-gux-009"></a>

**Author the cross-surface empty, loading, error and offline state matrix**

| Field | Value |
|---|---|
| GitHub | #1047 |
| Type | design |
| Priority | p1 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | design-system, onboarding, a11y |
| Size | M |
| SDLC | design |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-022](design-system.md#sn-ds-022), [SN-LIB-008](library.md#sn-lib-008) |
| Security controls | `CWE-209`, `MASVS-PRIVACY-1` |
| Extra labels | needs-design |

#### Context

`docs/design/ux-principles.md` §4 writes the defaults for empty, loading, error and offline states and says in its own words that this section "needs maintainer sign-off but is what a builder MUST implement until overridden"; `screens-and-flows.md` open question 18 states plainly that "offline / error / loading states are largely undefined" and that only a minimal pre-logic Library shell exists. Three issues implement slices — [SN-LIB-008](library.md#sn-lib-008) (library empty/loading/error/offline), [SN-ONB-010](onboarding.md#sn-onb-010) (first-run tips and the Library/Search/Trash empty states), [SN-SYNC-020](sync.md#sn-sync-020) (nine sync states) — and [SN-DS-022](design-system.md#sn-ds-022) supplies the primitives. Everything else is uncovered: the Editor (no page, PDF still rendering, render failure, audio device busy), Search (no query, indexing in progress, index unavailable), all six Settings tabs, the five overlays, the Profiles and Login screens, the Ask panel, study and collaboration surfaces. Each of those will be invented separately by a different agent unless the matrix exists first.

#### Scope

**In:** `docs/design/states-matrix.md` — one row per surface from `screens-and-flows.md` §1 (six screens, five overlays, nine persistent/inline surfaces) × five columns: **empty**, **loading**, **error**, **offline**, **free-plan-limit**. Each cell states: the exact copy (as a key from the copy deck, [SN-GUX-003](i18n.md#sn-gux-003)), the next step offered, which primitive renders it (`SaneEmptyState` / `SaneSkeleton` / `SaneToast` / inline spinner / disabled control with a hint), whether and how it is announced to assistive technology, and the owning issue key. Plus the decision rules restated as testable checks (content → skeleton → spinner, never a full-screen spinner; toasts replace inline red everywhere; no dead ends; offline is silent for local work; destructive actions confirm with the consequence named) and a line added to the PR checklist.

**Out:** implementing any individual state (the owning area issues do that), the sync engine's state machine ([SN-SYNC-006](sync.md#sn-sync-006)), and the copy deck itself ([SN-GUX-003](i18n.md#sn-gux-003) — this matrix supplies its error/empty/limit rows).

#### Acceptance criteria

- [ ] Every surface listed in `screens-and-flows.md` §1 has all five cells filled, or an explicit "not applicable — because …".
- [ ] Every cell's copy passes the voice rules: second person, fact plus recovery, limits state what Pro does, no exclamation marks, no codes or paths.
- [ ] Each cell names the primitive and the owning issue; cells with no owner become follow-up issues filed in the same PR.
- [ ] The matrix states the announce behaviour per cell (polite live region for result counts and toasts; nothing for decorative skeletons).
- [ ] Maintainer sign-off is recorded in the document (date + who), satisfying the "needs sign-off" caveat in `ux-principles.md` §4.
- [ ] A checklist line ("states: empty / loading / error / offline / limit handled per states-matrix.md") is added to the PR template and the review checklist.

#### Technical notes

Keep it a single markdown table per surface group so it renders in the docs site ([SN-DOC-005](docs.md#sn-doc-005)) and diffs cleanly. Cross-link each row to its owning issue key using the same double-brace token convention the other docs use. Where a state depends on plan, record both the Free and Pro rendering. Where a state depends on profile lock or guest mode, say so — several surfaces must degrade differently for a locked profile ([SN-AUTH-014](auth.md#sn-auth-014)) and for guest ([SN-AUTH-010](auth.md#sn-auth-010)). The sync-status rows here are implemented by [SN-SYNC-020](sync.md#sn-sync-020) (M4), which consumes this matrix; the doc is authored in M2 independently.

#### Security & privacy

Error copy is a disclosure surface: the matrix must forbid leaking file paths, provider identifiers, tokens, sync URLs or note content in any error cell (CWE-209), and must state that locked-notebook and guest-mode surfaces show a neutral state rather than a count or a title ([SN-SEC-019](security.md#sn-sec-019)). Offline cells must never imply data loss — the app is local-first and the copy must say so, which is also the honest answer.

#### UX notes

References: `ux-principles.md` §4.1–4.4 (the decisive defaults), `component-inventory.md` §9 (the cross-cutting state table every component must handle), `screens-and-flows.md` §6 and open question 18. The mascot rule belongs here too: at most one Sage, on the Library first-run empty state — not on every empty list ([SN-GUX-014](brand.md#sn-gux-014) enforces it).

#### Test plan

Documentation-led, but verifiable: a `scripts/check-states-matrix.mjs` (or an extension of the component-inventory gate, [SN-GUX-006](design-system.md#sn-gux-006)) that asserts every surface in `screens-and-flows.md` §1 has a row and every non-N/A cell cites a copy key that exists in the ARB. Per-state widget tests stay with the owning issues; this issue adds the consistency check and the checklist.

#### Dependencies
[SN-DS-022](design-system.md#sn-ds-022), [SN-LIB-008](library.md#sn-lib-008). This authored matrix supplies the sync-status rows that [SN-SYNC-020](sync.md#sn-sync-020) (sync status UI, M4) implements; SYNC-020 consumes the doc and is not a scheduling dependency.

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GUX-016

<a id="sn-gux-016"></a>

**Establish the design-fidelity review gate against the design canvas**

| Field | Value |
|---|---|
| GitHub | #1052 |
| Type | design |
| Priority | p2 |
| Milestone | M2 Library & Documents |
| Platforms | all |
| Areas | design-system, qa, docs |
| Size | S |
| SDLC | verification |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-GUX-015](qa.md#sn-gux-015), [SN-GUX-003](i18n.md#sn-gux-003) |
| Security controls | `MASVS-RESILIENCE-4`, `OWASP-A05` |
| Extra labels | needs-design |

#### Context

Goldens prove the build matches *itself*; nothing proves the build matches the *design*. The canvas bundle (`design/Sane Notes.dc.html`, `design/Sane Notes Design Sheet.dc.html`, `design/sane-data.js`) and the four specs in `docs/design/` are the source of truth for what each screen should look like, and they carry explicit caveats that make drift the expected state: `component-inventory.md` says widget names are "proposed … **verify** before treating a name as canonical", and `screens-and-flows.md` closes with twenty open design questions. Without a review step, the first implementation of each screen silently becomes the specification, and the specs rot into fiction that later agents read as truth.

#### Scope

**In:** `docs/design/fidelity-checklist.md` — a per-screen checklist covering regions present and in order; spacing drawn only from the `4 6 8 10 12 14 16 18 22 28 32` scale; type roles used as specified (displayXL/L/M/S, body, muted, label, mono); the fixed component heights; copy verbatim from the copy deck ([SN-GUX-003](i18n.md#sn-gux-003)); all five states present per the state matrix ([SN-GUX-009](design-system.md#sn-gux-009)); accessibility hooks (labels, focus order, targets); look coverage evidence (the goldens from [SN-GUX-015](qa.md#sn-gux-015)). A sign-off table `docs/design/fidelity-signoff.md` (screen, reviewer, date, deviations with reasons, follow-up issue keys). A PR-template line for any change under `app/lib/features/**`. The standing rule: an intentional deviation **updates the spec in the same PR**; an unintentional one is filed as a bug.

**Out:** the goldens themselves ([SN-GUX-015](qa.md#sn-gux-015)), the component coverage gate ([SN-GUX-006](design-system.md#sn-gux-006)), the accessibility audit ([SN-A11Y-017](a11y.md#sn-a11y-017)), and answering the twenty open design questions (each belongs to its area epic).

#### Acceptance criteria

- [ ] The checklist exists, is short enough to actually use (one screen reviewable in ~10 minutes), and cites the doc section behind each item.
- [ ] The PR template gains the fidelity line and links the checklist.
- [ ] Every screen shipped by the end of M2 has a signed row or a recorded deviation with a reason and an owner.
- [ ] Each recorded deviation either updates the design doc in the same PR or has a filed issue key in the table — no orphan deviations.
- [ ] The review explicitly checks that no dev-only affordance (auth-bypass watermark, debug menu, placeholder art) is present on the reviewed screen.
- [ ] The sign-off table is rendered into the docs site ([SN-DOC-005](docs.md#sn-doc-005)) so the maintainer can see coverage at a glance.

#### Technical notes

Keep it markdown and human-run: an automated pixel comparison against a static HTML canvas would be brittle (different renderers, fonts and rasterisers) and would produce noise that trains reviewers to ignore it. The automatable parts are already covered — token drift ([SN-DS-007](design-system.md#sn-ds-007), [SN-GUX-002](design-system.md#sn-gux-002)), component coverage ([SN-GUX-006](design-system.md#sn-gux-006)), invariants ([SN-GUX-005](design-system.md#sn-gux-005)), goldens ([SN-GUX-015](qa.md#sn-gux-015)), copy ([SN-GUX-003](i18n.md#sn-gux-003)). This gate is the human layer that catches what none of those can: "this is technically compliant and still wrong."

#### Security & privacy

Two review items carry security weight: the reviewer confirms no development affordance ships in a reviewed screen ([SN-ONB-014](onboarding.md#sn-onb-014), [SN-FND-012](devx.md#sn-fnd-012) assertAuthBypassSafe), and that any screen showing user content honours the locked/guest redaction rules ([SN-SEC-019](security.md#sn-sec-019), [SN-AUTH-013](auth.md#sn-auth-013)) before sign-off. Deviations touching consent, plan gates or privacy copy must route to the privacy reviewer ([SN-PRV-013](privacy.md#sn-prv-013)) rather than being signed off in a design review.

#### UX notes

References: `docs/design/README.md` (how the specs relate to the canvas), `design-system.md` §"Screens", `component-inventory.md` §10 (component→screen map), `ux-principles.md` §0 ("Pen-first. Calm. Never lags."). The checklist's last question should stay qualitative and blunt: does this screen feel calm, and is the page still the hero?

#### Test plan

Process, verified by artifacts: a sample review of one already-built screen (Library) completed and signed before the gate turns on; a `scripts/check-fidelity-signoff.mjs` (or an extension of the states-matrix check) asserting every screen in `screens-and-flows.md` §1 that has a route in `app/` also has a sign-off row, warning in M2 and failing from M7 ([SN-QA-016](qa.md#sn-qa-016) release gate).

#### Dependencies

[SN-GUX-015](qa.md#sn-gux-015), [SN-GUX-003](i18n.md#sn-gux-003)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

### SN-GWEB-007

<a id="sn-gweb-007"></a>

**Deliver subset, self-hosted web fonts for the 17 looks and script fallbacks**

| Field | Value |
|---|---|
| GitHub | #1005 |
| Type | task |
| Priority | p2 |
| Milestone | M1 Ink Editor Alpha |
| Platforms | web |
| Areas | design-system, perf, i18n |
| Size | M |
| SDLC | implementation |
| Parent | [SN-DS-001](design-system.md#sn-ds-001) |
| Depends on | [SN-DS-009](design-system.md#sn-ds-009), [SN-WEB-003](perf.md#sn-web-003), [SN-GWEB-005](security.md#sn-gweb-005) |
| Security controls | `MASVS-PRIVACY-1`, `CWE-1104` |
| Extra labels | agent-ready |

#### Context

The design system ships **17 looks** built on 12 font families ([SN-DS-009](design-system.md#sn-ds-009)), plus CJK, Indic and Arabic fallback fonts for localisation ([SN-I18N-008](i18n.md#sn-i18n-008)). On iPad and Android those are bundled assets that cost install size once. On web they are **network payloads on first paint**, and Flutter web will happily download a full multi-weight family — often several hundred kilobytes per family, and megabytes for a CJK face — before the first frame settles. [SN-WEB-003](perf.md#sn-web-003) names "subset fonts" as a deferred lever with no owner, and [SN-DS-009](design-system.md#sn-ds-009) is written for bundled platform assets. Nothing decides the web delivery strategy: which faces load eagerly, how they are subset, what happens during the swap, and how a look change mid-session avoids a flash of unstyled or wrongly metricked text. This matters for both B6 (< 3 s cached cold start) and for the "no third-party requests" rule — Google Fonts is not an option.

#### Scope

**In:** a build step (`tools/fonts/`) that produces self-hosted **woff2** subsets per family and weight with `unicode-range` splits (Latin, Latin-Ext, Greek/Cyrillic, per-script fallback faces); generated `@font-face` declarations wired into the web CSS theme from [SN-DS-008](design-system.md#sn-ds-008); a policy of exactly one eagerly loaded face (the active look's primary text face) with the rest lazily fetched on look switch or script need; `font-display: swap` with a metric-compatible local fallback stack so reflow is minimal; preload hints for the eager face; service-worker precache for the eager face and runtime caching for the rest ([SN-WEB-011](compat.md#sn-web-011)); per-family budget lines in the web budget file ([SN-WEB-003](perf.md#sn-web-003)); and a licence/provenance check for every shipped subset ([SN-BRD-011](brand.md#sn-brd-011)).

**Out:** the token/type scale itself ([SN-DS-010](design-system.md#sn-ds-010)), bundling on native platforms ([SN-DS-009](design-system.md#sn-ds-009)), script fallback selection logic ([SN-I18N-008](i18n.md#sn-i18n-008)), and the look-switcher UI ([SN-DS-015](theming.md#sn-ds-015)).

#### Acceptance criteria

- [ ] First paint downloads **at most one** font file for the active look; total font transfer for a cold `/try` visit is ≤ **150 KB** Brotli, recorded in the budget file.
- [ ] Every font is served from the app origin with `CORP: same-origin`, covered by the integrity manifest, and never from Google Fonts or any other host ([SN-GWEB-005](security.md#sn-gweb-005), `PRD-PRIV-007`).
- [ ] Switching looks loads the new family lazily and swaps without a layout jump greater than one line-height; a CLS measurement in the Lighthouse run stays within budget ([SN-WEB-024](perf.md#sn-web-024)).
- [ ] Subsets preserve every glyph the UI can render for the supported locales: a pseudo-locale + per-locale render test shows **zero tofu** across all 17 looks ([SN-I18N-004](i18n.md#sn-i18n-004)).
- [ ] CJK/Indic/Arabic fallback faces load only when the content or locale needs them, and shaping is correct (RTL and conjunct rendering verified against [SN-I18N-013](i18n.md#sn-i18n-013)).
- [ ] The golden tests for all 17 looks pass on web with the subset fonts ([SN-DS-027](design-system.md#sn-ds-027)) — no look renders with a substituted family.
- [ ] A licence manifest lists each shipped font, its licence and its source; CI fails if a font without an entry appears in the build ([SN-BRD-011](brand.md#sn-brd-011)).

#### Technical notes

Use a deterministic subsetter (e.g. `fonttools`/`pyftsubset` pinned in `tools/`) driven by a checked-in glyph/unicode-range spec, so subsets are reproducible and reviewable rather than hand-made. Emit `@font-face` into the generated CSS from [SN-DS-008](design-system.md#sn-ds-008) so tokens stay the single source of truth. Pair each webfont with a metric-similar system fallback (`system-ui`, `-apple-system`, `Segoe UI`, `Noto Sans`) to keep swap reflow small. Handwriting/ink rendering is unaffected — this is UI chrome and typed text only ([SN-TXT-001](text.md#sn-txt-001)).

#### Security & privacy

Fonts are third-party binaries parsed by the browser and, for custom user fonts, by us ([SN-SEC-009](security.md#sn-sec-009)); shipping only vetted, hash-pinned, same-origin subsets keeps that surface small (CWE-1104, OWASP-A08). Serving fonts ourselves removes a third-party request that would expose user IP and User-Agent to a font CDN (MASVS-PRIVACY-1, `PRD-PRIV-007`). Licence provenance is a legal-compliance control tracked with the asset audit ([SN-BRD-011](brand.md#sn-brd-011)). No user data is involved.

#### UX notes

Text must never flash a different family at a different size: the fallback stack is chosen for metric similarity and `font-display: swap` is tuned so the first paint is readable immediately. The look switcher shows a subtle loading state on a theme card whose family is still downloading ([SN-DS-015](theming.md#sn-ds-015)), and an offline look switch to an uncached family falls back gracefully with an inline note rather than tofu.

#### Test plan

- `tools/fonts/test/subset_determinism_test.mjs` — same input produces byte-identical subsets.
- `app/test/design_system/font_coverage_test.dart` — no tofu across locales × looks (golden).
- `app/integration_test/web/font_transfer_test.dart` — first-paint font request count and bytes.
- CI: budget table from [SN-WEB-003](perf.md#sn-web-003); licence manifest check from [SN-BRD-011](brand.md#sn-brd-011).

#### Dependencies

[SN-DS-009](design-system.md#sn-ds-009) (family list and registration), [SN-DS-008](design-system.md#sn-ds-008) (web CSS theme), [SN-WEB-003](perf.md#sn-web-003) (budgets), [SN-GWEB-005](security.md#sn-gweb-005) (same-origin, pinned assets). Interacts with [SN-I18N-008](i18n.md#sn-i18n-008) and [SN-DS-027](design-system.md#sn-ds-027).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-PHN-003

<a id="sn-phn-003"></a>

**Build the compact phone shell with bottom navigation and push routing**

| Field | Value |
|---|---|
| GitHub | #847 |
| Type | feature |
| Priority | p1 |
| Milestone | M5 Phones & Platform Parity |
| Platforms | ios-phone, android-phone |
| Areas | design-system, compat |
| Size | L |
| SDLC | implementation |
| Parent | [SN-PHN-001](compat.md#sn-phn-001) |
| Depends on | [SN-PHN-002](compat.md#sn-phn-002), [SN-DS-003](design-system.md#sn-ds-003), [SN-LIB-002](library.md#sn-lib-002), [SN-ED-002](editor.md#sn-ed-002) |
| Security controls | `MASVS-PLATFORM-1`, `MASVS-PLATFORM-3`, `MASVS-PRIVACY-2`, `CWE-926` |
| Extra labels | agent-ready |

#### Context
The tablet layout is a two-pane list+detail (library rail + editor). On a phone the window class is Compact, so it MUST collapse to a single-pane stacked flow with a **bottom navigation bar** in thumb reach — Library, Search, Capture (centre), Study/Review, Settings/Profile — following platform conventions (iOS tab bar, Android M3 navigation bar). Library-to-editor becomes push navigation (library → notebook → page), and both predictive back on Android and the interactive-pop swipe on iOS MUST work, guarded by a discard-changes prompt on unsaved edits (docs/platform/phones.md §2).

The centre **Capture** affordance is called out as the phone's signature interaction: one thumb tap to a new note, voice note or camera scan — capture must never be buried behind the library. Its destination sheet is built in [SN-PHN-010](library.md#sn-phn-010); this issue builds the shell, the slot and the routing. Crucially, routes and deep links are **unchanged** from tablet — only the layout branch differs — because the same URLs back the web build and the share-target hand-off (phones.md §2, PRD-CO-276).

#### Scope
**In:** `SanePhoneShell` (bottom navigation + nested navigators), the compact branch of the `go_router` `ShellRoute`, push navigation for library → notebook → page, predictive-back and interactive-pop support with an unsaved-changes guard, bottom-sheet page picker plus horizontal page swipe inside a notebook, safe-area/edge-to-edge inset handling, and the Study/Review and Settings/Profile nav destinations wired to existing screens.
**Out:** the palette reflow ([SN-PHN-004](editor.md#sn-phn-004)), reading mode ([SN-PHN-008](pages-canvas.md#sn-phn-008)), the capture destination sheet itself ([SN-PHN-010](library.md#sn-phn-010)), foldable state preservation ([SN-PHN-017](compat.md#sn-phn-017)), and any new Library/Search/Settings screen content (those screens already exist from M2/M4).

#### Acceptance criteria
- [ ] In the compact class the sidebar is replaced by a 5-slot bottom navigation bar; in medium and above the existing sidebar/rail returns with no visual change.
- [ ] Each nav destination keeps its own navigation stack; re-tapping the active destination pops to its root, and switching destinations and back restores the previous stack position.
- [ ] Library → notebook → page is a push transition; the system back gesture pops one level, and Android **predictive back** renders the cross-activity/cross-fragment preview (docs/platform/android.md §7, API 36 default).
- [ ] With unsaved edits, back/interactive-pop shows the destructive-confirm dialog from docs/design/ux-principles.md §4.3 naming the consequence; cancelling leaves the editor exactly as it was, including the in-progress stroke buffer.
- [ ] Deep links resolve to the same routes as on tablet: a `sane.app/n/<slug>` link lands in a view/confirm context and never auto-mutates state (PRD-CO-276).
- [ ] The bottom bar respects safe-area insets and sits above the home indicator / gesture bar under enforced edge-to-edge (Android API 36).
- [ ] Every nav item is >= 48×48 dp / 44×44 pt with a `Semantics` label, an accessible selected state, and correct `aria-current`-equivalent semantics; TalkBack/VoiceOver announce position ('Library, tab 1 of 5').
- [ ] Switching destinations costs no dropped frame at 60 fps on the Android-lowend reference device.
- [ ] Rotating to landscape keeps the bar usable and does not clip content at 200% Dynamic Type.

#### Technical notes
Add `app/lib/shell/phone_shell.dart`, `app/lib/shell/phone_nav_destinations.dart` and the compact branch of `app/lib/router/app_router.dart`. Use `StatefulShellRoute.indexedStack` from go_router so each destination keeps its own `Navigator` (ADR-0003). Compose `SaneNavItem` from `packages/sane_ui` rather than raw `NavigationBar` so all 17 looks apply (docs/design/component-inventory.md §3). Predictive back needs the Android embedding migrated to `OnBackInvokedCallback` — `onBackPressed`/`KEYCODE_BACK` are no longer called at API 36 (docs/platform/android.md §7, risk L2: **verify** current Flutter engine support at implementation time and record the result in the PR). On iOS, keep `PopScope(canPop: false, onPopInvokedWithResult:)` for the guard so the interactive-pop gesture still previews. Insets: use `MediaQuery.viewPaddingOf` and never a hardcoded bar height. Consume `windowSizeClassProvider` from [SN-PHN-002](compat.md#sn-phn-002); do not branch on `Platform.isIOS`.

#### Security & privacy
Threats and controls: **T-DEEPLINK** — a forged or mis-scoped deep link reaching the phone shell could navigate into, or mutate, a notebook the user did not intend. Control: only verified App Links / Universal Links are accepted, route parameters are validated against the local document store before navigation, and a link always lands in a read/confirm context, never a mutation (CLAUDE.md §7.8; MASVS-PLATFORM-1, CWE-926, OWASP-A01). **T-TASKSNAP** — the OS task-switcher snapshot of the shell can expose note content on a shared phone. Control: when app-lock or a protected profile is active, apply the existing screenshot deterrent path (`FLAG_SECURE` on Android, blur on `UIScreen.capturedDidChangeNotification` on iOS) at the shell level so it covers every destination (PRD-LEAK-002, MASVS-PLATFORM-3). **T-NAVLOG** — navigation logging leaking notebook titles/ids. Control: route names log as opaque short hashes only, never titles (MASVS-PRIVACY-1). Baseline: no note content or tokens in logs; no new network egress.

#### UX notes
Destinations map to existing screens in docs/design/screens-and-flows.md: Library (§6), Search (§11), Capture (centre, §5-equivalent quick capture), Study/Review (phones.md §4 — a dedicated slot because review is the phone-shaped job), Settings/Profile (§12, §4). The active item uses the accent tokens (`--acs` background, weight 700) exactly as `SaneNavItem` does in the sidebar, so the look family is preserved across all 17 looks in light and dark. Bottom sheets slide from the bottom, never from the side (phones.md §7). Empty/loading/error states are inherited: local content renders immediately (no spinner — ux-principles.md §4.2); errors are toasts via `SaneToast`, not red inline text (§4.3); offline is silent for note-taking (§4.4). The Capture slot is visually distinguished (centre, accent fill) but is a normal button to assistive tech with the label 'Capture'.

#### Test plan
- `app/test/shell/phone_shell_test.dart` — widget tests for destination switching, per-destination stack retention, re-tap-to-root.
- `app/test/shell/phone_back_guard_test.dart` — unsaved-changes guard blocks pop, cancel restores state, confirm discards.
- `app/test/router/deep_link_compact_test.dart` — a forged/unknown slug lands on a safe view and mutates nothing (negative test).
- `app/integration_test/phone_navigation_test.dart` — patrol run on a phone profile: library → notebook → page → system back, predictive back preview present on API 36.
- `app/test/golden/phone/phone_shell_golden_test.dart` — goldens for the bar in a representative look per family (Paper, Minimalism, Pop, Neumorphism, Brutalism), light and dark.

#### Dependencies
[SN-PHN-002](compat.md#sn-phn-002), [SN-DS-003](design-system.md#sn-ds-003), [SN-LIB-002](library.md#sn-lib-002), [SN-ED-002](editor.md#sn-ed-002)

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

