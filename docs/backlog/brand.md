# Backlog — area: brand

13 issues. Generated from `issues/*.json` by `scripts/render-issues.mjs`; do not edit by hand.

## Tree

- [SN-BRD-001](brand.md#sn-brd-001) **Brand & mascot: original Sage art, icons, wordmark, voice and asset licensing** (epic · M8 Launch & Growth)
  - [SN-BRD-002](brand.md#sn-brd-002) **Produce original Sane Sage master art to replace watermarked placeholders** · p0 · design · L · M8 Launch & Growth
  - [SN-BRD-003](brand.md#sn-brd-003) **Implement SaneSageMark with single-asset indirection and four tile grounds** · p1 · feature · M · M0 Foundations
  - [SN-BRD-004](brand.md#sn-brd-004) **Define Sage expression set and animation states for onboarding, empty states and AI** · p2 · design · M · M6 Collaboration, Sharing & Sage AI
  - [SN-BRD-005](brand.md#sn-brd-005) **Build app icon program: adaptive, monochrome, themed and PWA icons for all platforms** · p1 · feature · M · M8 Launch & Growth
  - [SN-BRD-006](brand.md#sn-brd-006) **Design logo and wordmark lockups for Sane and Sane Notes** · p2 · design · S · M8 Launch & Growth
  - [SN-BRD-007](brand.md#sn-brd-007) **Add splash and launch screens for iOS, iPadOS, Android and Web PWA** · p2 · feature · S · M8 Launch & Growth
  - [SN-BRD-008](brand.md#sn-brd-008) **Produce store screenshots and listing art for App Store, Play and web** · p2 · design · M · M8 Launch & Growth
  - [SN-BRD-009](brand.md#sn-brd-009) **Write the tone-of-voice and microcopy guide** · p2 · docs · S · M0 Foundations
  - [SN-BRD-010](brand.md#sn-brd-010) **Define the illustration and empty-state art style guide** · p3 · design · S · M8 Launch & Growth
  - [SN-BRD-011](brand.md#sn-brd-011) **Audit licensing and provenance of all fonts, icons and image assets** · p1 · security · M · M0 Foundations
  - [SN-BRD-012](brand.md#sn-brd-012) **Purge watermarked placeholder assets and add a CI guard against their return** · p1 · infra · S · M8 Launch & Growth
  - [SN-GUX-014](brand.md#sn-gux-014) **Implement Sage expression states and the one-mascot-per-surface rule** · p2 · feature · M · M6 Collaboration, Sharing & Sage AI

---

## Issues

### SN-BRD-001

<a id="sn-brd-001"></a>

**Brand & mascot: original Sage art, icons, wordmark, voice and asset licensing**

| Field | Value |
|---|---|
| GitHub | #7 |
| Type | epic |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | brand |
| Size | XL |
| SDLC | design |
| Parent | — |
| Depends on | — |
| Security controls | `OWASP-A08`, `MASVS-PRIVACY-1`, `MASVS-CODE-3` |
| Extra labels | sec: supply-chain |

#### Context
Sane Notes ships with a registered mascot — the **Sane Sage** (conical hat, staff, closed eyes) — but the art committed under `design/assets/*.png` (`sane-sage.png`, `sane-sage-icon.png`) is **watermarked stock** (VectorStock/Alamy) that MUST NOT ship in any binary, store listing, website, or exported document (`docs/design/README.md` §6; CLAUDE.md §9 and §13; roadmap M8 exit criterion "Original Sage mascot art shipped — a hard release blocker"). The clean interim reference is the repo file `sane notes.png`. This epic owns everything brand: replacing the placeholder art with original licensable artwork, the mascot expression/animation set, the full app-icon program (adaptive/monochrome/themed/PWA), logo and wordmark lockups, splash screens, store screenshots, the tone-of-voice guide, the illustration style, and a licensing audit of every font, icon and image. The brand is a warmth-and-trust asset (`docs/product/vision-and-principles.md` Principle 8), so it must be consistent across all 17 looks and both modes while the Sage itself stays a fixed-colour trademark that only its tile re-themes.

#### Scope
**In:** all sub-issues below — original master art, `SaneSageMark` indirection, expression/animation states, app icons, logo/wordmark, splash, store screenshots, voice guide, illustration style, licensing audit, and the CI guard that purges watermarked placeholders and blocks their return.
**Out:** the `sane_ui` component library beyond the mascot mark (see [SN-DS-001](design-system.md#sn-ds-001)), onboarding/login screen assembly (see [SN-ONB-001](onboarding.md#sn-onb-001)), the Sage **AI** assistant behaviour (see [SN-AI-001](ai.md#sn-ai-001)), the marketing website build (see [SN-SITE-001](website.md#sn-site-001)), and release signing/store submission mechanics (see [SN-REL-001](release.md#sn-rel-001)).

#### Acceptance criteria
- [ ] No shippable artifact embeds `design/assets/*.png`; a CI guard fails the build if it reappears ([SN-BRD-012](brand.md#sn-brd-012)).
- [ ] Original Sage master art exists (vector + transparent PNG ≥ 779×776) with recorded provenance/license ([SN-BRD-002](brand.md#sn-brd-002)).
- [ ] The mascot is referenced through the single `SaneSageMark` asset indirection everywhere ([SN-BRD-003](brand.md#sn-brd-003)).
- [ ] App icons, splash, wordmark, store screenshots, voice guide, illustration style and licensing ledger all delivered.

#### Technical notes
Mark indirection lives in `packages/sane_ui` as `SaneSageMark` (`docs/design/component-inventory.md` §1). Tiles read `acs`/`ink`/`pp` tokens per look from `docs/design/tokens.json`. Fonts (Newsreader, Karla, Manrope, Bricolage Grotesque, DM Sans, Space Grotesk, Playfair Display, Nunito, IBM Plex Mono, Syne, Rubik, Archivo) are enumerated in `docs/design/design-system.md` §2. Provenance ledger feeds the SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)).

#### Security & privacy
Baseline only for most children (no note content or PII in any asset, tokens-not-values). Cross-cutting controls: **asset provenance/integrity** (shipping unlicensed/watermarked art is a legal + integrity failure, OWASP-A08, MASVS-CODE-3), and **no real user data in store screenshots or marketing art** (MASVS-PRIVACY-1). Each child restates its baseline.

#### UX notes
Every brand surface must render correctly across all **17 looks** (`docs/design/README.md` §4) and light + dark. The Sage never recolours/stretches/flips/crops; only its `acs` tile changes with the look. Voice per `docs/design/design-system.md` §1 / `docs/design/ux-principles.md` §5: plain, warm, specific, no exclamation marks. a11y: mascot art is decorative and excluded from the a11y tree except where it carries meaning.

#### Test plan
Golden tests for `SaneSageMark` across looks/modes; icon-manifest lint; screenshot-content review; provenance-ledger validation script. Named per child issue.

#### Dependencies
[SN-DS-002](design-system.md#sn-ds-002) (tokens), [SN-FND-002](devx.md#sn-fnd-002) (scaffold). Children carry their own.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] All child issues closed; no build tagged not-releasable for a brand reason

---

### SN-BRD-002

<a id="sn-brd-002"></a>

**Produce original Sane Sage master art to replace watermarked placeholders**

| Field | Value |
|---|---|
| GitHub | #134 |
| Type | design |
| Priority | p0 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | brand |
| Size | L |
| SDLC | design |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | — |
| Security controls | `OWASP-A08` |
| Extra labels | needs-decision, needs-design, sec: supply-chain |

#### Context
The Sage art in `design/assets/sane-sage.png` and `design/assets/sane-sage-icon.png` is **watermarked stock** and is legally un-shippable; any build embedding it is tagged **not releasable** (`docs/design/README.md` §6; CLAUDE.md §9 and §13). The roadmap makes replacing it a **hard M8 release blocker** (`docs/roadmap.md` §M8 exit criteria). This issue produces the definitive original **master artwork** of the Sane Sage — the fixed-colour trademark character (conical hat, staff, closed eyes) — from the clean interim reference `sane notes.png`, at production fidelity, plus the vector master needed to derive icons, wordmark lockups and the 24 px minimum mark. Because the Sage is a registered character, the actual artwork must be **commissioned/approved by the maintainer** (this is why the issue is `needs-decision` + `needs-design`); this issue owns the spec, the acceptance bar, the integration path, and the provenance record so the commissioned art lands cleanly.

#### Scope
**In:** the character master as (a) a layered **vector master** (SVG/AI) for scaling and icon-tile derivation, (b) a transparent PNG at **≥ 779×776** (the spec size in `docs/design/design-system.md` §1), (c) a 1× reference render for `SaneSageMark`; recorded license/provenance; the file placement under a new `assets/brand/` (not `design/assets/`) so the watermarked source is never the shippable source.
**Out:** expression variants ([SN-BRD-004](brand.md#sn-brd-004)), app-icon tile composition ([SN-BRD-005](brand.md#sn-brd-005)), wordmark ([SN-BRD-006](brand.md#sn-brd-006)), the CI purge/guard ([SN-BRD-012](brand.md#sn-brd-012)), and any recolouring of the character (forbidden).

#### Acceptance criteria
- [ ] Vector master renders crisp from **24 px** (minimum mark) to app-icon size with no rasterisation artefacts.
- [ ] Transparent PNG is **≥ 779×776**, colour-identical to the approved character, alpha-clean at edges.
- [ ] Character is **never** recoloured/stretched/flipped/cropped; clear space equals the hat-brim height (`docs/design/README.md` §6).
- [ ] License and provenance recorded (author, license terms, date, source) in the asset ledger consumed by [SN-BRD-011](brand.md#sn-brd-011).
- [ ] Zero pixels trace to `design/assets/*.png` (watermarked source not reused).
- [ ] Art lives under `assets/brand/` and is the single source `SaneSageMark` points at via [SN-BRD-003](brand.md#sn-brd-003).

#### Technical notes
Character is fixed-colour; only the surrounding **tile** re-themes (reads `acs`/`ink`/`pp`/Cyberpunk-night per `docs/design/tokens.json`). Vector master must isolate the character on its own layer so icon tiles ([SN-BRD-005](brand.md#sn-brd-005)) and lockups ([SN-BRD-006](brand.md#sn-brd-006)) can composite it over any ground. Keep hat-brim height as a documented metric for clear-space math. Feeds `SaneSageMark` ([SN-BRD-003](brand.md#sn-brd-003)).

#### Security & privacy
**Threat:** shipping watermarked/unlicensed art = copyright infringement and a software-and-data-integrity failure (OWASP-A08). **Control:** original art only, provenance recorded, watermarked placeholders never used as the shippable source; the CI guard ([SN-BRD-012](brand.md#sn-brd-012)) enforces it. No note content or PII in the asset (baseline: no logging of content, tokens only).

#### UX notes
The Sage appears in login, onboarding, profiles and the Library first-run empty state (`docs/design/screens-and-flows.md`; `docs/design/component-inventory.md` §1). It must read warmly at 24 px and at hero size, and sit legibly on the `acs` tile in all 17 looks × light/dark. Decorative in most placements → excluded from the a11y tree (`ExcludeSemantics`) except where it labels a brand row.

#### Test plan
Manual design review against the character spec and the clean reference; a golden render of the master on the four icon tiles; an alpha-edge check; a provenance-ledger entry test in [SN-BRD-011](brand.md#sn-brd-011). No code paths beyond asset placement.

#### Dependencies
None hard (commission decision pending). Blocks [SN-BRD-003](brand.md#sn-brd-003), [SN-BRD-004](brand.md#sn-brd-004), [SN-BRD-005](brand.md#sn-brd-005), [SN-BRD-006](brand.md#sn-brd-006), [SN-BRD-007](brand.md#sn-brd-007).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md
- [ ] Provenance/license recorded; no build tagged not-releasable for mascot art

---

### SN-BRD-003

<a id="sn-brd-003"></a>

**Implement SaneSageMark with single-asset indirection and four tile grounds**

| Field | Value |
|---|---|
| GitHub | #135 |
| Type | feature |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | core |
| Areas | brand, design-system |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002), [SN-DS-002](design-system.md#sn-ds-002) |
| Security controls | `MASVS-PLATFORM-2` |
| Extra labels | agent-ready |

#### Context
The Sage is a trademark that shows up across login, onboarding, profiles, the brand row and the Library first-run empty state, so the design mandates it be referenced through **one** `sane_ui` asset so the watermarked placeholder can be swapped in exactly one place (`docs/design/README.md` §6; `docs/design/component-inventory.md` §1, `SaneSageMark`). This issue builds that `SaneSageMark` widget: a single indirection that renders the current Sage art on a look-driven tile, at any size down to the 24 px minimum, in all 17 looks × light/dark. It can land in M0 using the clean interim reference `sane notes.png` and later point at the original master from [SN-BRD-002](brand.md#sn-brd-002) with no call-site changes.

#### Scope
**In:** the `SaneSageMark` widget in `packages/sane_ui`; a `tile` prop (`accentSoft` default / `ink` / `paper` / `cyberNight`); a `size` param clamped to a **24 px minimum**; clear-space = hat-brim height; a single asset-path constant so the source swaps in one place; decorative-by-default a11y (`ExcludeSemantics`) with an opt-in `semanticLabel`.
**Out:** the master art itself ([SN-BRD-002](brand.md#sn-brd-002)), expression variants ([SN-BRD-004](brand.md#sn-brd-004)), app-icon files ([SN-BRD-005](brand.md#sn-brd-005)), the CI guard ([SN-BRD-012](brand.md#sn-brd-012)).

#### Acceptance criteria
- [ ] `SaneSageMark(tile: …, size: …)` renders the Sage on the correct token-driven tile for the active `(lookId, mode)` — `acs` for accent-soft, `ink`, `pp` for paper, Cyberpunk-night ground — reading only `docs/design/tokens.json` values.
- [ ] Requesting a size < 24 renders at 24 px (minimum-mark rule) and logs nothing.
- [ ] The character pixels are identical across all four tiles (only the tile changes); no recolour/flip/crop is possible through the API.
- [ ] Exactly one constant names the source asset; swapping it changes every call site.
- [ ] Default instance is excluded from the a11y tree; a `semanticLabel` (e.g. "Sane") is exposed only when passed.
- [ ] Golden tests pass for all 17 looks × 2 modes × 4 tiles.

#### Technical notes
Pure `sane_ui` leaf (Flutter), no model/feature imports (CLAUDE.md §3 DAG). Read the active `SaneLook` ThemeExtension from [SN-DS-002](design-system.md#sn-ds-002); do not hard-code colours. Asset bundled via `pubspec.yaml` assets; expose the path as a private const. Honour reduce-motion (this widget is static). Interim source is `sane notes.png` copied to `assets/brand/`; final source arrives via [SN-BRD-002](brand.md#sn-brd-002).

#### Security & privacy
None beyond baseline: no note content, coordinates, tokens, or PII touched or logged; the widget reads only design tokens and a bundled asset (MASVS-PLATFORM-2 — no sensitive data in UI). No network. No storage.

#### UX notes
Matches `docs/design/component-inventory.md` §1 (`SaneSageMark`): fixed-colour trademark, tile follows the look, ≥ 24 px, clear space = hat-brim height. Used sparingly in empty states (at most one Sage on Library first-run, `docs/design/ux-principles.md` §4.1). Must look correct on glass/neumorph/cyber grounds where the tile behaves differently.

#### Test plan
`packages/sane_ui/test/sane_sage_mark_test.dart` (API + min-size clamp + a11y exclusion); `packages/sane_ui/test/golden/sane_sage_mark_golden_test.dart` (17 looks × light/dark × 4 tiles). Widget test that swapping the source constant updates the rendered asset.

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (sane_ui package exists), [SN-DS-002](design-system.md#sn-ds-002) (SaneLook tokens). Interim art usable; [SN-BRD-002](brand.md#sn-brd-002) for final source.

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-004

<a id="sn-brd-004"></a>

**Define Sage expression set and animation states for onboarding, empty states and AI**

| Field | Value |
|---|---|
| GitHub | #136 |
| Type | design |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | brand, onboarding |
| Size | M |
| SDLC | design |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-BRD-003](brand.md#sn-brd-003) |
| Security controls | `MASVS-PLATFORM-2` |
| Extra labels | needs-design, innovation |

#### Context
The Sage gives the product its warmth (`docs/product/vision-and-principles.md` Principle 8) and appears at emotional moments: onboarding steps, the Library first-run empty state, and — as the on-device assistant persona — the Sane Sage AI surface ([SN-AI-001](ai.md#sn-ai-001)). The base master ([SN-BRD-002](brand.md#sn-brd-002)) is a single neutral pose; this issue defines a small, tasteful **expression set** and the **animation states** for those moments (e.g. thinking while an on-device answer streams, a calm idle, a subtle acknowledgement) without ever violating the fixed-colour trademark rule — expressions are additive art, never recolours or distortions of the character. Because these are new character depictions, they require maintainer/design approval (`needs-design`).

#### Scope
**In:** a spec + asset set for ~4–6 expressions (idle/neutral, welcoming, thinking, listening/recording, done/acknowledge); animation state definitions (durations, easing, reduce-motion fallbacks) reusing the master; a mapping of each expression to a usage moment (onboarding, empty state, AI thinking/answer, audio recording).
**Out:** the base master ([SN-BRD-002](brand.md#sn-brd-002)), the `SaneSageMark` widget wiring ([SN-BRD-003](brand.md#sn-brd-003)), the AI behaviour/inference ([SN-AI-001](ai.md#sn-ai-001)), general illustration style ([SN-BRD-010](brand.md#sn-brd-010)).

#### Acceptance criteria
- [ ] Each expression is derived from the approved master and keeps the character fixed-colour, un-stretched, un-flipped (only face/pose accents change per the trademark rules in `docs/design/README.md` §6).
- [ ] Animation states specify duration (≤ 350 ms for chrome-adjacent motion per `docs/design/ux-principles.md` §6), easing, loop behaviour, and a **reduce-motion static fallback** for every animated state.
- [ ] The "thinking" state is defined as a calm loop (no spinner theatrics) suitable for on-device AI latency, with the "data leaves device" indicator kept separate (never implied by the mascot).
- [ ] Every expression maps to a named usage moment and a `SaneSageMark`-compatible asset slot.
- [ ] Expressions are marked decorative for a11y; no state conveys information available only through the animation.

#### Technical notes
Assets follow the [SN-BRD-003](brand.md#sn-brd-003) single-asset indirection / vector-master layering so a pose is a swap of the character layer over the same tile; the final master art [SN-BRD-002](brand.md#sn-brd-002) (M8) is a later drop-in asset swap. Wire through [SN-BRD-003](brand.md#sn-brd-003) (add an `expression` prop later). Motion budgets and easing per `docs/design/ux-principles.md` §6; respect `MediaQuery.disableAnimations`. AI usage per [SN-AI-001](ai.md#sn-ai-001) / ADR-0016; onboarding per [SN-ONB-001](onboarding.md#sn-onb-001).

#### Security & privacy
None beyond baseline: decorative art, no note content/PII, no logging, no network (MASVS-PLATFORM-2). The mascot must **not** be used to imply a privacy state (e.g. never let a happy Sage stand in for the on-device vs cloud indicator, which is a separate required control per `docs/product/vision-and-principles.md` Principle 9).

#### UX notes
Sparing use — at most one Sage on the Library first-run empty state (`docs/design/ux-principles.md` §4.1); expressions add warmth without clutter. Must read in all 17 looks × dark. The recording expression pairs with `SaneAudioBar` moments but never replaces the record affordance. Voice pairing kept plain and specific (no exclamation marks).

#### Test plan
Design review against the trademark rules; golden renders of each expression on the four tiles across looks; a reduce-motion test asserting each animated state falls back to a static frame. Files: `packages/sane_ui/test/golden/sage_expressions_golden_test.dart`.

#### Dependencies
[SN-BRD-003](brand.md#sn-brd-003) (SaneSageMark single-asset indirection / master layering the expression set is defined against; replaces the dependency on the final master art [SN-BRD-002](brand.md#sn-brd-002), which is a later asset swap in M8). Consumed by [SN-ONB-001](onboarding.md#sn-onb-001) and [SN-AI-001](ai.md#sn-ai-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-005

<a id="sn-brd-005"></a>

**Build app icon program: adaptive, monochrome, themed and PWA icons for all platforms**

| Field | Value |
|---|---|
| GitHub | #137 |
| Type | feature |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | brand, release |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-BRD-002](brand.md#sn-brd-002) |
| Security controls | `OWASP-A08`, `MASVS-PLATFORM-2` |
| Extra labels | agent-ready |

#### Context
Every surface needs a launcher/app icon, and the Sage is the mark: the design specifies **four icon tile grounds** — accent-soft (default), ink, paper, and Cyberpunk night — with the character identical across all four, only the tile changing (`docs/design/README.md` §6; `docs/design/design-system.md` §1). Modern platforms also need **adaptive** icons (Android foreground/background layers), **monochrome/themed** icons (Android 13+ themed icons, iOS tinted/dark/clear variants), and **maskable** PWA icons. This issue produces the full icon program from the original master ([SN-BRD-002](brand.md#sn-brd-002)) and wires it into each platform's project so a real build shows the Sage, not the placeholder.

#### Scope
**In:** iOS/iPadOS app icon set (all required sizes + dark + tinted variants); Android adaptive icon (foreground + background layers) + **monochrome** layer for themed icons; Android legacy density mipmaps; Web/PWA icons incl. **maskable** and favicon; the default accent-soft tile plus the three alternate tiles as selectable/branding variants; generation tooling/config so icons regenerate from the vector master deterministically.
**Out:** splash/launch screens ([SN-BRD-007](brand.md#sn-brd-007)), store listing screenshots ([SN-BRD-008](brand.md#sn-brd-008)), signing/submission ([SN-REL-001](release.md#sn-rel-001)), the master art itself ([SN-BRD-002](brand.md#sn-brd-002)).

#### Acceptance criteria
- [ ] iOS/iPadOS asset catalog contains every required size with correct content and a dark + tinted variant; Xcode shows no missing-slot warnings.
- [ ] Android adaptive icon renders correctly under circle/squircle/rounded-square masks with safe-zone respected; a **monochrome** layer drives Android 13+ themed icons.
- [ ] PWA manifest references `any` and **`maskable`** purpose icons at 192/512; favicon present; installed PWA shows the Sage.
- [ ] The character is pixel-identical across the four tiles; tiles use the documented grounds; no recolour of the character.
- [ ] All icon assets derive from the [SN-BRD-002](brand.md#sn-brd-002) master (no `design/assets/*.png` bytes) and are listed in the provenance ledger ([SN-BRD-011](brand.md#sn-brd-011)).
- [ ] Icons regenerate reproducibly from a checked-in config (documented command).

#### Technical notes
Prefer a deterministic generator (e.g. `flutter_launcher_icons` config in `pubspec.yaml`, plus a script for the monochrome/maskable variants) reading the vector master. Android adaptive layers go in `mipmap-anydpi-v26`; monochrome via `<monochrome>` in the adaptive XML. iOS variants via the asset catalog's Any/Dark/Tinted appearances. PWA icons with a maskable `purpose` in the web manifest ([SN-SITE-001](website.md#sn-site-001) consumes the same). Keep the four tiles as documented in `docs/design/design-system.md` §1.

#### Security & privacy
**Threat:** shipping icons derived from watermarked/unlicensed art (OWASP-A08). **Control:** derive only from the original master; record provenance ([SN-BRD-011](brand.md#sn-brd-011)); the CI guard ([SN-BRD-012](brand.md#sn-brd-012)) blocks placeholder bytes. No PII in icons (MASVS-PLATFORM-2). No network.

#### UX notes
The accent-soft tile is the default identity; the ink/paper/cyber-night tiles are the sanctioned alternates. Monochrome/themed icons must stay legible as a single-colour silhouette (the Sage's hat/staff read at small sizes). Maskable icons keep the character inside the safe zone. Icon appearance is fixed brand — it does not follow the in-app 17 looks at runtime.

#### Test plan
Manual install on iOS, Android (with themed icons on), and an installed PWA; a mask-overlay check for the adaptive/maskable safe zone; a script asserting every declared icon slot is populated and none reference `design/assets/`. Config lint in CI. Files: `tools/scripts/verify_icon_manifest.mjs`.

#### Dependencies
[SN-BRD-002](brand.md#sn-brd-002) (master). Related: [SN-BRD-007](brand.md#sn-brd-007), [SN-REL-001](release.md#sn-rel-001), [SN-SITE-001](website.md#sn-site-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-006

<a id="sn-brd-006"></a>

**Design logo and wordmark lockups for Sane and Sane Notes**

| Field | Value |
|---|---|
| GitHub | #138 |
| Type | design |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | brand, design-system |
| Size | S |
| SDLC | design |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-DS-002](design-system.md#sn-ds-002), [SN-BRD-003](brand.md#sn-brd-003) |
| Security controls | `MASVS-PLATFORM-2` |
| Extra labels | agent-ready, good first issue |

#### Context
The brand uses "Sane" alone in-app chrome and "Sane Notes" as the full name for stores, sign-in and documents (`docs/design/design-system.md` §1). The wordmark is typographic: **"Sane" at weight 600, "Notes" at 400 in muted ink, in the display face of the active look, tracking −1% (`-.01em`)**. The tagline **"Study smarter."** keeps the S·S initials with the two leading letters in the accent. This issue defines the reusable **wordmark and lockup** components (wordmark alone; mark + wordmark horizontal lockup; stacked lockup; tagline lockup) so the brand row (`SaneBrandRow`), login, onboarding and export headers all render the name consistently and correctly per look.

#### Scope
**In:** a `SaneWordmark` widget/spec and lockup variants (wordmark; `SaneSageMark` + wordmark horizontal; stacked; with tagline); exact weights/tracking/colour-token bindings; clear-space rules composing with the mark's hat-brim clear space; a monochrome fallback for single-colour contexts.
**Out:** the mascot mark itself ([SN-BRD-003](brand.md#sn-brd-003)), app icons ([SN-BRD-005](brand.md#sn-brd-005)), store art ([SN-BRD-008](brand.md#sn-brd-008)), a bespoke drawn logotype (the wordmark is type-driven from the active look's display face, not a custom-drawn glyph set).

#### Acceptance criteria
- [ ] `SaneWordmark` renders "Sane" 600 + "Notes" 400 in `mu` (muted ink), display face `fd` of the active look, tracking `-.01em`, reading only tokens (`docs/design/tokens.json`).
- [ ] Tagline lockup renders "Study smarter." with the two leading `S`/`s` in the accent (`ac`), no exclamation mark.
- [ ] Horizontal and stacked lockups compose `SaneSageMark` + wordmark with clear space ≥ the hat-brim height on the mark side.
- [ ] All variants pass contrast (AA) across the 17 looks × light/dark and expose the accessible name "Sane Notes" (not the visual casing) to AT.
- [ ] A monochrome fallback exists for single-colour print/embossing contexts.

#### Technical notes
Pure `sane_ui` composition; no hard-coded colours or fonts — bind `fd`, `ink`, `mu`, `ac` from the `SaneLook` extension ([SN-DS-002](design-system.md#sn-ds-002)). Reuse `SaneText` roles from `docs/design/component-inventory.md` §1 where possible. Used by `SaneBrandRow`, login marketing panel, onboarding, and export/document headers.

#### Security & privacy
None beyond baseline: typographic composition reading tokens; no note content, PII, tokens/secrets, or logging; no network (MASVS-PLATFORM-2).

#### UX notes
Matches `docs/design/component-inventory.md` §3 `SaneBrandRow` and `docs/design/design-system.md` §1. Casing ("Sane"/"Notes") is visual; the a11y name stays "Sane Notes". Must survive +40% locale expansion and RTL mirroring (`docs/design/ux-principles.md` §5). Renders correctly on glass/cyber grounds.

#### Test plan
`packages/sane_ui/test/golden/sane_wordmark_golden_test.dart` (all looks × modes × variants); a widget test asserting the AT name is "Sane Notes" and the tagline has no exclamation mark; a contrast assertion test.

#### Dependencies
[SN-DS-002](design-system.md#sn-ds-002) (tokens), [SN-BRD-003](brand.md#sn-brd-003) (mark for lockups).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-007

<a id="sn-brd-007"></a>

**Add splash and launch screens for iOS, iPadOS, Android and Web PWA**

| Field | Value |
|---|---|
| GitHub | #139 |
| Type | feature |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | brand, release |
| Size | S |
| SDLC | implementation |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-BRD-002](brand.md#sn-brd-002), [SN-BRD-005](brand.md#sn-brd-005) |
| Security controls | `MASVS-PLATFORM-2` |
| Extra labels | agent-ready |

#### Context
Every surface shows a launch/splash frame before the first Flutter frame paints, and the cold-start budgets are tight (< 1.5 s iPad, < 2 s mid-Android, < 3 s cached web PWA — `docs/product/vision-and-principles.md` §7.3). The splash must present the Sage mark on a calm ground and hand off to the app without a visible flash or theme jump. This issue implements native splash/launch screens for iOS/iPadOS (LaunchScreen storyboard), Android 12+ (SplashScreen API + legacy), and the Web/PWA (manifest `background_color` + a lightweight pre-hydration splash), all using the original mark ([SN-BRD-002](brand.md#sn-brd-002)) and icon assets ([SN-BRD-005](brand.md#sn-brd-005)).

#### Scope
**In:** iOS LaunchScreen with the mark centred on a neutral brand ground; Android 12+ `SplashScreen` (icon + windowBackground) plus a pre-12 fallback; Web PWA `background_color`/`theme_color` + an inline pre-hydration splash that fades into the app; light + dark launch grounds; reduced flash on hand-off.
**Out:** onboarding ([SN-ONB-001](onboarding.md#sn-onb-001)), icons ([SN-BRD-005](brand.md#sn-brd-005)), store screenshots ([SN-BRD-008](brand.md#sn-brd-008)), any animation beyond a static mark + fade (keep cold start fast).

#### Acceptance criteria
- [ ] iOS/iPadOS LaunchScreen shows the Sage mark centred on the brand ground; no missing-image warnings; matches system light/dark.
- [ ] Android 12+ uses the `SplashScreen` API with the correct icon and window background; pre-12 devices get an equivalent static splash; no white/black flash between splash and first frame.
- [ ] Web PWA sets `background_color` and `theme_color`; a pre-hydration splash appears within the first paint and cross-fades to the app; cached cold start stays < 3 s.
- [ ] Splash never blocks input beyond the platform-mandated minimum and adds **zero** measurable regression to cold-start budgets.
- [ ] Uses only original mark/icon assets (no `design/assets/*.png`), listed in the provenance ledger ([SN-BRD-011](brand.md#sn-brd-011)).

#### Technical notes
Android: `androidx.core:core-splashscreen`, `windowSplashScreenBackground` + `windowSplashScreenAnimatedIcon`. iOS: `LaunchScreen.storyboard` referencing the launch image set. Web: `web/manifest.json` colours + an inline splash element in `web/index.html` removed on Flutter's first-frame callback. Keep the ground colours as fixed brand values (splash does not follow the 17 runtime looks). Coordinate flavours with [SN-FND-005](devx.md#sn-fnd-005) so beta/dev builds are visually distinguishable if desired.

#### Security & privacy
None beyond baseline: static brand art only; no note content, PII, tokens, or logging; no network at splash time (MASVS-PLATFORM-2). The splash must not display any user or account data.

#### UX notes
Calm and instant per `docs/design/ux-principles.md` §4.2/§6 — a static mark and a short fade, never a spinner-over-blank. Light and dark grounds match the system appearance so there is no jarring flip into the app's chosen look. Decorative → excluded from a11y; the launch frame carries no interactive elements.

#### Test plan
Manual cold-start capture on the three reference devices confirming no flash and budget adherence; an installed-PWA cold-start check; a build check asserting splash assets exist per platform and reference only `assets/brand/`. Integration hook: `app/integration_test/cold_start_test.dart` records the splash-to-first-frame gap.

#### Dependencies
[SN-BRD-002](brand.md#sn-brd-002) (mark), [SN-BRD-005](brand.md#sn-brd-005) (icons), [SN-FND-005](devx.md#sn-fnd-005) (flavours).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-008

<a id="sn-brd-008"></a>

**Produce store screenshots and listing art for App Store, Play and web**

| Field | Value |
|---|---|
| GitHub | #140 |
| Type | design |
| Priority | p2 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | brand, release |
| Size | M |
| SDLC | release |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-BRD-005](brand.md#sn-brd-005) |
| Security controls | `MASVS-PRIVACY-1`, `MASVS-PRIVACY-3`, `OWASP-A08` |
| Extra labels | needs-credentials, sec: privacy-by-design |

#### Context
Launching on the App Store, Google Play and the marketing site needs a screenshot and listing-art set that shows the product honestly and privately (`docs/roadmap.md` §M8). Because Sane Notes' promise is trust (`docs/product/vision-and-principles.md` Principle 2, §8), the store art must never contain real user notes, real PII, or a real person's data — it uses the fabricated design persona **"Riya"** and seed content only, and it must reflect the zero-knowledge, no-data-collected reality in the accompanying privacy declarations. This issue produces device-frame screenshots per required size, feature-callout art, and the listing thumbnails/hero, all reusing the icon program ([SN-BRD-005](brand.md#sn-brd-005)) and wordmark ([SN-BRD-006](brand.md#sn-brd-006)). It needs `needs-credentials` because uploading requires the maintainer's store accounts.

#### Scope
**In:** App Store screenshots (iPhone + iPad required sizes), Play screenshots (phone + tablet) + feature graphic, web listing hero/thumbnails; feature-callout overlays in brand voice; localisation-ready layouts (text as editable layers); a captured, consistent seed dataset (persona Riya, sample notebooks) for every shot.
**Out:** the actual store submission/metadata mechanics ([SN-REL-001](release.md#sn-rel-001)), privacy-label authoring ([SN-PRV-001](privacy.md#sn-prv-001)), the marketing website build ([SN-SITE-001](website.md#sn-site-001)), app icons ([SN-BRD-005](brand.md#sn-brd-005)).

#### Acceptance criteria
- [ ] Screenshots exist at every required App Store and Play size (phone + tablet) plus the Play feature graphic and web hero/thumbnails.
- [ ] **No real user data / PII** appears — only the fabricated Riya persona and seed content; a review checklist confirms this per asset.
- [ ] Callout copy follows the brand voice (plain, specific, **no exclamation marks**, honest numbers) per `docs/design/ux-principles.md` §5.
- [ ] Art shows a real supported look (from the 17) and both light/dark are represented across the set.
- [ ] Text lives on editable layers so locales can be swapped without re-shooting (Principle 10 localisation).
- [ ] All composited icon/mark art derives from originals ([SN-BRD-002](brand.md#sn-brd-002)/[SN-BRD-005](brand.md#sn-brd-005)); provenance recorded ([SN-BRD-011](brand.md#sn-brd-011)).

#### Technical notes
Generate device frames from real app captures on the reference devices; overlay callouts in a layered source (kept in `assets/marketing/`, never shipped in the app binary). Keep the seed dataset scripted so shots are reproducible. Coordinate required sizes/metadata with [SN-REL-001](release.md#sn-rel-001); privacy declarations with [SN-PRV-001](privacy.md#sn-prv-001).

#### Security & privacy
**Threats:** leaking real user content or PII in public store art (MASVS-PRIVACY-1/3, GDPR/DPDP); implying data collection that contradicts the zero-knowledge posture. **Controls:** fabricated persona + seed data only; a per-asset PII review gate; declarations reflect "no data collected except opt-in crash reports" (`docs/product/vision-and-principles.md` Principle 2). Original-art provenance guards against unlicensed imagery (OWASP-A08).

#### UX notes
Shots should read as calm and trustworthy — lead with the ink/latency and privacy story (§8 "why we will win"), not feature soup. Use the wordmark/tagline lockups ([SN-BRD-006](brand.md#sn-brd-006)). Represent multiple looks to show the 17-look delight without misrepresenting the default experience.

#### Test plan
Manual review gate (PII checklist + voice checklist) per asset; a size-manifest check that every required store slot is filled; a grep asserting marketing sources are excluded from the app bundle. Files: `tools/scripts/verify_store_assets.mjs`.

#### Dependencies
[SN-BRD-005](brand.md#sn-brd-005) (icons), [SN-BRD-006](brand.md#sn-brd-006) (wordmark). Related: [SN-REL-001](release.md#sn-rel-001), [SN-PRV-001](privacy.md#sn-prv-001), [SN-SITE-001](website.md#sn-site-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-009

<a id="sn-brd-009"></a>

**Write the tone-of-voice and microcopy guide**

| Field | Value |
|---|---|
| GitHub | #141 |
| Type | docs |
| Priority | p2 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | brand, docs |
| Size | S |
| SDLC | design |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | — |
| Security controls | `MASVS-PRIVACY-4` |
| Extra labels | agent-ready, good first issue |

#### Context
The brand voice is a load-bearing part of the product — "plain, warm, specific; sentences, not labels; numbers are honest; limits are explained, never hidden; **no exclamation marks; one em dash is fine**" (`docs/design/design-system.md` §1; `docs/design/ux-principles.md` §5). Today that guidance is spread across the design docs; this issue consolidates it into a single authoritative **`docs/brand/voice.md`** so every screen, toast, empty state, error, upsell and store line is written consistently, and so an autonomous agent building any surface can copy-check its microcopy in one place. It captures the do/don't table, the canonical reusable lines, the RFC-style rules, and the locale-sensitivity notes.

#### Scope
**In:** `docs/brand/voice.md` covering: voice principles; the do/don't table (verbatim from `ux-principles.md` §5); canonical lines to reuse verbatim ("Study smarter.", "Who's writing?", "Circle some ink to select it", "Ink replays in sync", "Pro removes the limits", etc.); rules (second person, present tense, active voice; explain limits + name what Pro does; privacy stated plainly; no chrome jargon like "CRDT"/"op-log"/"envelope encryption"); error/empty/upsell patterns; locale-specific line marking (e.g. "chai a week").
**Out:** implementing the strings in code (owned by each feature area), localisation/translation ([SN-I18N-001](i18n.md#sn-i18n-001) territory), the illustration style ([SN-BRD-010](brand.md#sn-brd-010)).

#### Acceptance criteria
- [ ] `docs/brand/voice.md` exists and states the voice principles, the do/don't table, the canonical reusable lines, and the numbered rules.
- [ ] It forbids exclamation marks in chrome and forbids surfacing jargon ("CRDT", "op-log", "envelope encryption") in the UI, with examples.
- [ ] It gives the limit/upsell pattern ("5 imports a month" + what Pro does, no pressure) and the error pattern (fact + recovery, no codes/blame) with examples.
- [ ] It marks locale-specific lines as non-global defaults and requires copy to survive +40% expansion and RTL.
- [ ] It cross-links `design-system.md` §1 and `ux-principles.md` §5 as the upstream sources and is added to the `docs/` index.

#### Technical notes
Markdown doc under a new `docs/brand/` folder; link it from `docs/README.md` and `docs/design/README.md` §5. Content is a consolidation, not an invention — quote the design docs and reconcile any drift by raising an issue (do not silently contradict, per CLAUDE.md). Feeds every microcopy string across `app/` and `sane_ui`.

#### Security & privacy
None beyond baseline for a docs file. It does, however, encode a **privacy-by-design microcopy rule** (MASVS-PRIVACY-4): privacy is stated plainly and honestly ("your ink never leaves the device to become searchable"), and copy must never overstate data collection or hide a limit. No secrets or PII in examples.

#### UX notes
The guide governs `SaneToast`, `SaneEmptyState`, upsell cards and every label; it must reflect the calm, no-exclamation voice across all 17 looks (voice is look-independent). Include the empty/error/offline copy defaults from `ux-principles.md` §4 so builders reuse them verbatim.

#### Test plan
Manual review against `design-system.md` §1 and `ux-principles.md` §5; a lightweight repo lint (optional) that flags "!" in user-facing string files and flags banned jargon tokens. Doc-link check that `docs/README.md` references the new file.

#### Dependencies
None (consolidates existing docs).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-010

<a id="sn-brd-010"></a>

**Define the illustration and empty-state art style guide**

| Field | Value |
|---|---|
| GitHub | #142 |
| Type | design |
| Priority | p3 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | brand, design-system |
| Size | S |
| SDLC | design |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-BRD-002](brand.md#sn-brd-002), [SN-BRD-004](brand.md#sn-brd-004) |
| Security controls | `MASVS-PLATFORM-2` |
| Extra labels | needs-design |

#### Context
Beyond the Sage itself, the product uses supporting illustration at emotional moments — onboarding art panels, the marketing/login panel, empty states, and feature callouts (`docs/design/screens-and-flows.md` §3/§5; `docs/design/component-inventory.md` §6/§7). Without a defined **illustration style** these drift into inconsistency and can clash with the 17 looks. This issue writes the illustration style guide: line quality, palette relationship to tokens, how supporting art coexists with the fixed-colour Sage, and the sparing-use rules so illustration adds warmth without clutter or latency. It is `needs-design` because it sets subjective visual direction requiring maintainer sign-off.

#### Scope
**In:** `docs/brand/illustration.md` (or a §in `docs/brand/`) defining style (line weight, fills, corner language, shadow use), the relationship between illustration colour and the look's tokens (illustration may be theme-neutral or token-tied — decide and document), Sage-plus-scene composition rules, empty-state art rules (at most one Sage on Library first-run), and reduce-motion/decorative-a11y requirements.
**Out:** the Sage master ([SN-BRD-002](brand.md#sn-brd-002)) and expressions ([SN-BRD-004](brand.md#sn-brd-004)), store art ([SN-BRD-008](brand.md#sn-brd-008)), the voice guide ([SN-BRD-009](brand.md#sn-brd-009)), actual per-screen illustration production (tracked per consuming screen).

#### Acceptance criteria
- [ ] The guide fixes line quality, fill/shadow language, and corner treatment consistent with the design sheet's feel tokens (`docs/design/design-system.md` §4 feel tokens).
- [ ] It states whether supporting illustration is theme-neutral or token-tied and how it must read on glass/cyber/dark grounds.
- [ ] It preserves the fixed-colour Sage rule when the mascot appears within a scene (no recolour/distortion).
- [ ] It encodes the sparing-use rule (at most one Sage on the Library first-run empty state; not on every empty list — `docs/design/ux-principles.md` §4.1).
- [ ] It requires all decorative art to be excluded from the a11y tree and to have reduce-motion static fallbacks.

#### Technical notes
Markdown under `docs/brand/`; link from `docs/design/README.md`. Reference the feel tokens (`glass`, `cardSh`, `r`, `bw`) so illustration composes with, not fights, the active look. Consumed by [SN-ONB-001](onboarding.md#sn-onb-001) (art panels), [SN-LIB-002](library.md#sn-lib-002) (empty states) and [SN-SITE-001](website.md#sn-site-001) (marketing).

#### Security & privacy
None beyond baseline: decorative art guidance only; no note content, PII, tokens, or logging (MASVS-PLATFORM-2). Reinforces that illustration must not depict real user data or imply data collection.

#### UX notes
Illustration is warmth, not decoration-for-its-own-sake (`docs/product/vision-and-principles.md` Principle 8). It must never add latency to the writing hot path (Principle 4 wins) and must degrade to a static frame under reduce-motion. Must look intentional in all 17 looks × dark.

#### Test plan
Design review against the feel tokens and the sparing-use rule; a sample empty-state golden using the guide's rules across a few representative looks; doc-link check. Files: `packages/sane_ui/test/golden/empty_state_illustration_golden_test.dart` (sample).

#### Dependencies
[SN-BRD-002](brand.md#sn-brd-002) (master), [SN-BRD-004](brand.md#sn-brd-004) (expressions). Consumed by [SN-ONB-001](onboarding.md#sn-onb-001), [SN-LIB-002](library.md#sn-lib-002), [SN-SITE-001](website.md#sn-site-001).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-011

<a id="sn-brd-011"></a>

**Audit licensing and provenance of all fonts, icons and image assets**

| Field | Value |
|---|---|
| GitHub | #143 |
| Type | security |
| Priority | p1 |
| Milestone | M0 Foundations |
| Platforms | all |
| Areas | brand, security |
| Size | M |
| SDLC | verification |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-FND-002](devx.md#sn-fnd-002) |
| Security controls | `OWASP-A08`, `MASVS-CODE-3`, `CWE-1104`, `MASVS-PRIVACY-1` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
Sane Notes bundles twelve display/body fonts (Newsreader, Karla, Manrope, Bricolage Grotesque, DM Sans, Space Grotesk, Playfair Display, Nunito, IBM Plex Mono, Syne, Rubik, Archivo — `docs/design/design-system.md` §2), an icon glyph set, the mascot art, and various images. Shipping any of these without a clear license is a legal and software-integrity risk, and the current mascot PNGs are explicitly **watermarked stock** that must never ship (`docs/design/README.md` §6). This issue produces an **asset provenance/licensing ledger** — a checked-in, machine-readable record of every font/icon/image bundled in a shippable build, its source, license, and redistribution terms — and confirms each is licensed for the app, stores, and website. It feeds the SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)) and gates release readiness.

#### Scope
**In:** enumerate every bundled asset (fonts, icon set, mascot/brand art, illustrations, wallpapers/patterns referenced by tokens); record source + license + terms in `docs/brand/asset-licenses.md` + a machine-readable `assets/ATTRIBUTIONS.json`; verify each font's license permits app + store + web embedding (Google Fonts OFL/Apache expected, but verify each); flag the watermarked `design/assets/*.png` as **non-shippable** and confirm they are excluded from any bundle; produce the required attributions/notices file.
**Out:** the CI enforcement guard ([SN-BRD-012](brand.md#sn-brd-012)), dependency/package SBOM for code ([SN-CI-004](ci-cd.md#sn-ci-004)), producing replacement mascot art ([SN-BRD-002](brand.md#sn-brd-002)).

#### Acceptance criteria
- [ ] Every bundled font/icon/image appears in `assets/ATTRIBUTIONS.json` with source URL, license id (SPDX where possible), version, and redistribution note.
- [ ] Each font's license is confirmed to permit app-embedding, store distribution, and web `@font-face`/self-hosting; any that does not is flagged with a replacement recommendation.
- [ ] The watermarked `design/assets/*.png` are recorded as **non-shippable** and confirmed absent from every shippable bundle/manifest.
- [ ] An end-user-visible attributions/notices surface is produced (or the data feeding it) per license requirements (e.g. OFL notice retention).
- [ ] The ledger is validated by a script and referenced from the SBOM process ([SN-CI-004](ci-cd.md#sn-ci-004)).
- [ ] The original mascot art from [SN-BRD-002](brand.md#sn-brd-002) is added to the ledger when it lands.

#### Technical notes
Store the human doc at `docs/brand/asset-licenses.md` and the machine record at `assets/ATTRIBUTIONS.json` (SPDX license ids). Cross-reference the font list in `docs/design/design-system.md` §2 and the token-referenced patterns/wallpapers in `tokens.json`. A `tools/scripts/verify_asset_licenses.mjs` validates that every asset declared in `pubspec.yaml`/web manifest has a ledger entry. This ledger is an input to the SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)) and DevSecOps supply-chain gates ([SN-CI-001](ci-cd.md#sn-ci-001)).

#### Security & privacy
**Threats:** shipping unlicensed/watermarked assets (OWASP-A08 software-and-data-integrity; MASVS-CODE-3 third-party components; CWE-1104 unmaintained/unverified third-party components). **Controls:** a complete provenance ledger, license verification per asset, and exclusion of non-shippable placeholders. Also confirms no bundled asset embeds tracking or PII (MASVS-PRIVACY-1). No note content touched.

#### UX notes
None beyond baseline UI: the attributions/notices may surface in Settings → About (plain, factual, brand voice — no exclamation marks). Ensure the notices screen is a11y-labelled and reachable, but its build is owned by the settings area; this issue provides the data.

#### Test plan
`tools/scripts/verify_asset_licenses.mjs` asserts (a) every declared asset has a ledger entry, (b) no ledger entry is marked non-shippable while also declared in a shippable manifest, (c) `assets/ATTRIBUTIONS.json` is valid and SPDX-tagged. Runs in CI (verification stage).

#### Dependencies
[SN-FND-002](devx.md#sn-fnd-002) (scaffold/pubspec). Feeds [SN-CI-004](ci-cd.md#sn-ci-004); enforced by [SN-BRD-012](brand.md#sn-brd-012).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-BRD-012

<a id="sn-brd-012"></a>

**Purge watermarked placeholder assets and add a CI guard against their return**

| Field | Value |
|---|---|
| GitHub | #144 |
| Type | infra |
| Priority | p1 |
| Milestone | M8 Launch & Growth |
| Platforms | all |
| Areas | brand, ci-cd |
| Size | S |
| SDLC | verification |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-BRD-002](brand.md#sn-brd-002), [SN-BRD-003](brand.md#sn-brd-003), [SN-BRD-011](brand.md#sn-brd-011), [SN-FND-003](ci-cd.md#sn-fnd-003) |
| Security controls | `OWASP-A08`, `MASVS-CODE-3` |
| Extra labels | agent-ready, sec: supply-chain |

#### Context
Any build embedding `design/assets/sane-sage.png` or `design/assets/sane-sage-icon.png` (watermarked stock) is tagged **not releasable** (`docs/design/README.md` §6; CLAUDE.md §9). Relying on humans to remember this is fragile; the guarantee must be enforced by CI. This issue removes the placeholders from every shippable path (the app now points at the original master via [SN-BRD-003](brand.md#sn-brd-003)/[SN-BRD-002](brand.md#sn-brd-002)) and adds a **CI guard** that fails the build if any watermarked placeholder — or any asset lacking a provenance-ledger entry ([SN-BRD-011](brand.md#sn-brd-011)) — is referenced by a shippable manifest. It closes the loop so the release blocker cannot silently regress.

#### Scope
**In:** confirm the app/icons/splash reference only `assets/brand/` originals; keep `design/assets/*.png` available to the design canvas but excluded from `pubspec.yaml` assets and all platform bundles; a CI check (in the DevSecOps workflow) that fails if (a) a watermarked placeholder path is declared shippable, or (b) any bundled asset has no ledger entry; a clear failure message naming the offending asset.
**Out:** producing the original art ([SN-BRD-002](brand.md#sn-brd-002)), the ledger itself ([SN-BRD-011](brand.md#sn-brd-011)), the `SaneSageMark` widget ([SN-BRD-003](brand.md#sn-brd-003)).

#### Acceptance criteria
- [ ] No shippable manifest (`pubspec.yaml` assets, iOS asset catalog, Android res, web manifest) references `design/assets/sane-sage*.png`.
- [ ] A CI job fails the pipeline with a named error if a watermarked placeholder is declared shippable.
- [ ] The same job fails if any bundled asset lacks an `assets/ATTRIBUTIONS.json` entry ([SN-BRD-011](brand.md#sn-brd-011)).
- [ ] The design canvas under `design/` still works (placeholders remain there for the mockup, just never bundled).
- [ ] The guard runs on every PR (wired into the DevSecOps workflow, [SN-FND-003](ci-cd.md#sn-fnd-003) / [SN-CI-001](ci-cd.md#sn-ci-001)) and is documented so a failure is self-explanatory.

#### Technical notes
Implement `tools/scripts/verify_no_watermarked_assets.mjs` invoked from `.github/workflows/devsecops.yml` (`docs/security/devsecops-pipeline.md`). It parses `pubspec.yaml`, the iOS asset catalog, Android `res/`, and `web/manifest.json`, and cross-checks against `assets/ATTRIBUTIONS.json`. Fail closed on any match to a denylist (the two placeholder basenames + a content-hash of the watermarked files) or any un-attributed bundled asset. Complements the licensing ledger ([SN-BRD-011](brand.md#sn-brd-011)) and SBOM ([SN-CI-004](ci-cd.md#sn-ci-004)).

#### Security & privacy
**Threat:** regression that re-introduces unlicensed/watermarked art into a shippable build (OWASP-A08 integrity failure; MASVS-CODE-3 third-party components). **Control:** a fail-closed CI gate keyed on both path/basename and file content-hash, plus the attribution cross-check, so the release blocker is machine-enforced, not memory-enforced. No note content or PII involved (baseline).

#### UX notes
None beyond baseline (CI/tooling issue, no user-facing UI). The only "UX" is a clear, actionable CI failure message in brand-neutral developer voice naming the offending file and the fix ("replace with the original master from SN-BRD-002 / add a ledger entry").

#### Test plan
Unit test for the script with fixtures: (a) a manifest referencing a placeholder → fails; (b) an un-attributed bundled asset → fails; (c) a clean manifest with all originals attributed → passes. A content-hash match test using the known watermarked file hashes. Files: `tools/scripts/verify_no_watermarked_assets.mjs` + `tools/scripts/verify_no_watermarked_assets.test.mjs`. Wired into CI and asserted green.

#### Dependencies
[SN-BRD-002](brand.md#sn-brd-002) (originals to point at), [SN-BRD-003](brand.md#sn-brd-003) (indirection in place), [SN-BRD-011](brand.md#sn-brd-011) (ledger), [SN-FND-003](ci-cd.md#sn-fnd-003) (CI workflow).

#### Definition of done
- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md

---

### SN-GUX-014

<a id="sn-gux-014"></a>

**Implement Sage expression states and the one-mascot-per-surface rule**

| Field | Value |
|---|---|
| GitHub | #1053 |
| Type | feature |
| Priority | p2 |
| Milestone | M6 Collaboration, Sharing & Sage AI |
| Platforms | all |
| Areas | brand, design-system, a11y |
| Size | M |
| SDLC | implementation |
| Parent | [SN-BRD-001](brand.md#sn-brd-001) |
| Depends on | [SN-BRD-003](brand.md#sn-brd-003), [SN-BRD-004](brand.md#sn-brd-004), [SN-DS-025](design-system.md#sn-ds-025) |
| Security controls | `MASVS-CODE-1` |
| Extra labels | agent-ready |

#### Context

[SN-BRD-004](brand.md#sn-brd-004) *defines* the Sage expression set (idle, welcoming, thinking, listening/recording, done) with animation states and their usage moments — it is a design deliverable producing a spec and art. [SN-BRD-003](brand.md#sn-brd-003) and [SN-DS-024](design-system.md#sn-ds-024) implement `SaneSageMark` with a single asset indirection and four tile grounds, but with no expression parameter. [SN-AI-018](ai.md#sn-ai-018) mentions mascot states only inside the Sage assistant overlay. So the expressions have nowhere to land in onboarding, empty states, the recorder or error moments, and nothing enforces the brand rules that `component-inventory.md` §1 states as absolutes — "**Fixed-color trademark** — never recolor/stretch/flip/crop", minimum 24 px, clear space equal to the hat brim — or the restraint rule from `ux-principles.md` §4.1: "at most one Sage on the Library first-run empty state; not on every empty list."

#### Scope

**In:** extending `SaneSageMark` with an `expression` enum and an asset map (preserving the single indirection so the placeholder swap stays a one-line change, per `docs/design/README.md` §6); a reduce-motion-aware transition between expressions (cross-fade at the `control` duration token, no looping idle animation when Reduce Motion is on — [SN-DS-025](design-system.md#sn-ds-025)); a usage registry mapping surface → permitted expression, with a debug assertion and a widget test that fails when two marks render in one screen subtree; semantics (decorative marks `ExcludeSemantics`; meaningful ones labelled, e.g. "Sage is thinking" during an AI request, so the state is not conveyed by picture alone); asset-missing fallback to idle rather than a broken image; and an API shaped so misuse is impossible — size only, no colour, no `Transform` hooks.

**Out:** producing the art ([SN-BRD-002](brand.md#sn-brd-002), [SN-BRD-004](brand.md#sn-brd-004)), the AI overlay's behaviour ([SN-AI-018](ai.md#sn-ai-018)), app icons and splash ([SN-BRD-005](brand.md#sn-brd-005), [SN-BRD-007](brand.md#sn-brd-007)), the illustration style guide ([SN-BRD-010](brand.md#sn-brd-010)), and the watermarked-placeholder purge ([SN-BRD-012](brand.md#sn-brd-012)).

#### Acceptance criteria

- [ ] `SaneSageMark(expression: …)` renders each defined expression on each of the four tile grounds (accent-soft, ink, paper, Cyberpunk night) in all 17 looks × light/dark.
- [ ] A widget test asserts the mark is never rendered below 24 px, never with a non-uniform or negative scale, and never with a colour filter — the API does not expose those knobs, and a fixture attempting them fails.
- [ ] Clear space equal to the hat-brim height is enforced by the widget's own padding, not by each caller.
- [ ] Rendering two marks in one screen subtree fails a test (and asserts in debug builds); the registry documents the single permitted placement per surface.
- [ ] With Reduce Motion on, expression changes cross-fade or snap, and no idle animation runs; a test asserts it.
- [ ] A meaningful mark exposes a text label to assistive technology; a decorative one exposes nothing, and the accompanying text carries the meaning.
- [ ] A missing expression asset falls back to idle and logs a redacted warning, never a broken box or an exception in release.

#### Technical notes

Keep the asset table in one place (`packages/sane_ui/lib/src/brand/sage_assets.dart`) so the master-art swap from [SN-BRD-002](brand.md#sn-brd-002) touches a single file; assets bundled, never fetched. Expression is a pure presentation input driven by the calling surface's state (onboarding step, empty state, recording, AI request) — the widget owns no business logic. Compose transitions with `AnimatedSwitcher` plus the `SaneMotion` tokens rather than bespoke durations.

#### Security & privacy

Brand assets are bundled and must never be loaded from the network or from user-writable storage — a remotely sourced mascot would be an unsigned-content injection path in the app's most trusted chrome (OWASP M8 / MASVS-CODE-1). The "Sage is thinking" label must not include the prompt, note content or a filename ([SN-SEC-021](security.md#sn-sec-021)). The mark must not be used as a status signal for anything security-relevant (for example encryption or lock state), which must remain text plus icon.

#### UX notes

References: `design-system.md` §1 (the mark rules, minimum size, clear space, tile grounds), `component-inventory.md` §1, `ux-principles.md` §4.1 (mascot restraint), [SN-BRD-004](brand.md#sn-brd-004) (the expression↔moment mapping). The Sage is a welcome, not a wallpaper — over-using it turns the calm brief into a cartoon. One per surface, at the moment it means something.

#### Test plan

`packages/sane_ui/test/brand/sage_expression_test.dart` (enum coverage, fallback, reduce-motion, semantics), `packages/sane_ui/test/brand/sage_usage_rules_test.dart` (min size, uniform scale, clear space, one-per-subtree), goldens `test/goldens/sage/<expression>-<ground>-<look>-<mode>.png` for a representative look per family. Manual: onboarding, Library first-run empty state, recording and an AI request on one device.

#### Dependencies

[SN-BRD-003](brand.md#sn-brd-003), [SN-BRD-004](brand.md#sn-brd-004), [SN-DS-025](design-system.md#sn-ds-025)

#### Definition of done

- [ ] Code + tests merged, CI green (lint, analyze, unit, security scans)
- [ ] Docs/ADR updated if behaviour or architecture changed
- [ ] Reviewed against docs/security/secure-coding-checklist.md


---

