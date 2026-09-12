# Sane Notes — Design Documentation

> The design source of truth for Sane Notes and the index for every design doc in this folder.
> If a fact about visuals, tokens, screens, brushes, or interaction is in dispute, the order of
> authority is: **the `.dc.html` canvas bundle → `tokens.json` → `design-system.md` → the docs
> below**. Nothing in code may contradict `tokens.json`.

Audience: a future autonomous coding agent (or engineer) with zero prior context who must build
the app so that **every platform renders identically**. Read this file first, then the doc you need.

---

## 1. What is the design source of truth

The canonical design artifact is a **Claude Design canvas bundle** — a self-contained, interactive
HTML mockup of the whole product across all 17 looks, light/dark, and free/Pro. It is committed at
`design/` in the repo:

| File | Size | Role |
|---|---|---|
| `design/Sane Notes.dc.html` | ~137 KB | **The product canvas.** Renders login, profiles, onboarding, library, editor, templates, share, import, upgrade, search, settings, across all looks. This is the primary visual reference. |
| `design/Sane Notes Design Sheet.dc.html` | ~63 KB | **The design sheet.** Brand, typography, spacing, component specs, and per-look rules — the human-readable style guide. |
| `design/sane-data.js` | ~30 KB | Data tables: the 17 looks (13 palette colors × light/dark + feel tokens), ink/highlighter/paper/tint tables, page size, seed content. **`tokens.json` is a verbatim mirror of this file.** |
| `design/sane-logic.js` | ~41 KB | Interaction/state logic behind the mockup (screen routing, tool behavior, gating). `screens-and-flows.md` is reverse-engineered from this. |
| `design/doc-page.js`, `design/support.js` | — | Canvas harness / rendering support (not product logic). |
| `design/assets/sane-sage.png`, `sane-sage-icon.png` | ~396 KB each | The Sage mascot art used in the mockup. **See §6 — these are watermarked placeholders.** |
| `design/uploads/*.png` | — | Pasted reference screenshots used while authoring the canvas. Not product assets. |

**Claude Design share link** (the live, editable canvas — same content as the `.dc.html` files):
`https://claude.ai/design/p/ada47603-802d-4bc5-82f1-149092d8c483?file=Sane+Notes.dc.html&via=share`

Use the share link to *view* the intended design interactively; use the committed `.dc.html` files
as the offline, version-controlled record. If the two ever diverge, the committed files win for the
build, and the divergence MUST be raised as an issue.

### How to open / preview the `.dc.html` files

`.dc.html` files are ordinary self-contained HTML documents (a `.dc.html` extension is a Claude
Design convention; the content is plain HTML/JS/CSS with the data and logic scripts inlined or loaded
as siblings). To preview:

1. **Simplest:** open the file directly in a modern Chromium or Safari browser
   (`file:///…/design/Sane Notes.dc.html`). The sibling `sane-data.js` / `sane-logic.js` /
   `support.js` / `doc-page.js` must sit next to it (they do, in `design/`).
2. **If the browser blocks `file://` script loading** (some browsers refuse to run sibling scripts
   over `file://` due to module CORS), serve the folder over HTTP:
   `python3 -m http.server` inside `design/`, then open `http://localhost:8000/Sane Notes.dc.html`.
3. The canvas exposes four knobs (`theme`, `darkMode`, `plan`, `startScreen`) via a `data-props`
   attribute on the logic script — change these to re-render any look/mode/plan/screen. See
   [`screens-and-flows.md` §0](./screens-and-flows.md) for the full prop model.

**Do not treat the `.dc.html` as the shipping code.** It is a fidelity reference, not the Flutter
implementation. The build reads `tokens.json`, not the HTML.

---

## 2. Machine-readable tokens: `tokens.json`

[`tokens.json`](./tokens.json) is the **single source of truth for the build**. It mirrors
`design/sane-data.js` exactly. Every client (Flutter, web, native) compiles it into that platform's
theming primitive via one codegen step, and **CI MUST fail if any generated theme file drifts from
`tokens.json`**. This is what guarantees pixel-identical rendering across the five surfaces.

Top-level keys: `page`, `ink`, `hl`, `widths`, `paperFill`, `tint`, `tintSwatches`, `templates`,
`wallpapers`, `wallpaperRules`, `fonts`, `typeScale`, `spacingScale`, `componentSizes`, `profiles`
(seed), `subjects` (seed), `lookOrder`, and `looks`.

Hard rules (restated from [`design-system.md` §"Implementation guidance"](./design-system.md)):

- **Never hard-code a color.** Always read a palette key. Address every color as `(lookId, mode, key)`.
- **13 palette keys × 2 modes × 17 looks.** Light and dark are a *separate switch*, not a variant of
  one map — ship both maps for all 17 looks.
- **Colors are CSS color strings**, including `rgba(...)` and multi-stop values. Non-CSS renderers MUST
  parse `#rgb`/`#rrggbb`/`#rrggbbaa` and `rgba()`. A few "tint" keys are opaque hex where you'd expect
  a translucent value (e.g. Material light `acs = #eaddff`) — **parse, don't assume**.
- **`sh`, `cardSh`, `btnSh`, `inset` are full CSS shadow lists** (multi-layer, `inset`, `0 0 0 1px`
  rings, glows). CSS clients apply verbatim; Flutter pre-compiles each into a `List<BoxShadow>`.
- **`bgi` may reference SVG pattern ids** (`url(#ss-lined)` …) for paper and CSS gradients for grounds.
  Ship the SVG `<defs>` (`ss-lined`, `ss-grid`, `ss-dot`, `ss-music`, `ss-flash`) with every client.
- **`var(--ln)` / `var(--ac)` / `var(--ink)` inside `btnB`/`btnSh`/`cardSh`** are indirections to the
  active palette — resolve them against the current `(look, mode)` before handing to a non-CSS renderer.
- **Shared drawing constants** (`page.W/H`, `ink.INK`/`DARK_INK`, `hl`, `widths`, `paperFill`, `tint`)
  are look-independent. The ink layer reads these directly so the canvas renders pixel-for-pixel the
  same regardless of theme; only chrome reads the look. Ink color flips to `DARK_INK[i]` by index in
  dark mode.

The generated targets are: **web** (CSS custom properties on a `:root[data-look][data-mode]` block),
**Flutter** (`SaneLook extends ThemeExtension<SaneLook>`, 34 const instances), and **native**
(asset-catalog / resource map keyed by `(lookId, mode, tokenKey)`). Full codegen contract in
[`design-system.md`](./design-system.md).

---

## 3. The design docs in this folder

| Doc | What it defines | Read it when |
|---|---|---|
| [`design-system.md`](./design-system.md) | Brand, foundations, typography scale, all 17 look token sheets (prose), component rules, per-platform codegen. | You need the exact tokens/values for a look or component. |
| [`tokens.json`](./tokens.json) | The machine-readable token sheet the build compiles from. | You are writing codegen or reading a color/shadow programmatically. |
| [`screens-and-flows.md`](./screens-and-flows.md) | Every screen, overlay, and inline surface; controls; states; navigation map; seed data; copy; open questions. | You are building a screen or a flow. |
| [`ux-principles.md`](./ux-principles.md) | Interaction principles for a pen-first app: latency-as-UX, progressive disclosure, empty/loading/error/offline states, microcopy voice, motion, dark mode & ink inversion, adaptive layouts, how components behave across the 17 looks. | You are making an interaction/behavior decision not spelled out per-screen. |
| [`pen-and-brush-spec.md`](./pen-and-brush-spec.md) | The definitive default pen/brush/highlighter/eraser set with full parameters, the brush studio UI, favourites bar, quick palette, colour picker, and brush serialisation. | You are building the ink engine, brush studio, or colour tools. |
| [`gestures-and-shortcuts.md`](./gestures-and-shortcuts.md) | Complete stylus/touch/keyboard/mouse map per platform (Apple Pencil Pro, S Pen, USI, web pointer), palm rejection, conflicts and precedence. | You are wiring input handling on any platform. |
| [`accessibility.md`](./accessibility.md) | WCAG 2.2 AA mapping per screen, screen-reader behavior for canvas content, keyboard nav for web, computed contrast across the 17 looks, reduce-motion, left-handed, motor assist. | You are building any UI (a11y is a gate, not a phase). |
| [`component-inventory.md`](./component-inventory.md) | Every component from `screens-and-flows.md` with states/variants, mapped to `sane_ui` widget names. | You are building or naming a component. |

**Related docs outside this folder** (repo-relative): the stack rationale and the p0 latency exit
criterion live in [`../adr/0001-flutter-single-codebase.md`](../adr/0001-flutter-single-codebase.md);
the package layout (including `packages/sane_ui`) in
[`../adr/0002-monorepo-layout.md`](../adr/0002-monorepo-layout.md); product behavior in
[`../product/`](../product/); architecture in
[`../architecture/overview.md`](../architecture/overview.md). Research sources that back these docs are
committed under [`../research/sources/`](../research/sources/) and cited as `research/<file>.md`.

---

## 4. The 17 looks

Every look is one token sheet: 13 palette colors × light/dark, two fonts (display `fd` / body `fb`),
two radii (`r` cards / `rs` controls), a border width `bw`, an elevation recipe, and — for some — a
backdrop filter (`glass`) or a ground gradient/pattern (`bgi`). The user picks a look in onboarding
(three shown) and in Settings → Appearance (all 17 shown as theme cards). Dark mode is a separate
switch; every look has a night version.

`lookOrder` (the canonical order for the theme-card grid) and their groups:

| # | id | Name | Group | One-line character |
|---|---|---|---|---|
| 1 | `paper` | Paper | Warm | Cream ground, serif headings, tactile. |
| 2 | `minimal` | Minimalism | Clean | Mostly white, one blue, nothing extra. |
| 3 | `pop` | Pop | Bold | Hot pink, peach ground, rounder shapes. |
| 4 | `maximal` | Maximalism | Bold | Layered color, big italic serif, generous shadows. |
| 5 | `glass` | Glassmorphism | Clean | Frosted panels over a soft gradient. |
| 6 | `neumorph` | Neumorphism | Soft | One surface color, shapes pressed out of it. |
| 7 | `clay` | Claymorphism | Soft | Puffy, rounded, playful depth. |
| 8 | `brutal` | Brutalism | Raw | Black rules, no radius, system honesty. |
| 9 | `neobrutal` | Neo-Brutalism | Raw | Pastels, thick outlines, hard offset shadows. |
| 10 | `skeuo` | Skeuomorphism | Warm | Leather desk, paper sheets, stitched edges. |
| 11 | `flat` | Flat | Clean | Solid colors, no shadows, crisp edges. |
| 12 | `material` | Material | Clean | Tonal surfaces, pill buttons, layered elevation. |
| 13 | `bento` | Bento UI | Clean | Tiles in a grid, one graphite accent. |
| 14 | `y2k` | Y2K | Bold | Chrome gradients, bubble shapes, cyan on lilac. |
| 15 | `retro` | Retro | Warm | Seventies cream, burnt orange, mono details. |
| 16 | `cyber` | Cyberpunk | Bold | Neon cyan and magenta on near-black. |
| 17 | `editorial` | Editorial | Raw | Typography-led, hairlines, one red. |

Groups (for grouping the theme-card grid): **Warm** (Paper, Skeuomorphism, Retro) · **Clean**
(Minimalism, Glassmorphism, Flat, Material, Bento) · **Bold** (Pop, Maximalism, Y2K, Cyberpunk) ·
**Soft** (Neumorphism, Claymorphism) · **Raw** (Brutalism, Neo-Brutalism, Editorial).

Components are authored once (in the Paper look) and restyled from each look's token sheet — no
component hard-codes anything. How each component must behave across looks (glass blur, hard offset
shadows, uppercase casing, neumorphic inset-on-press, etc.) is specified in
[`ux-principles.md` §"The 17 looks and component behavior"](./ux-principles.md) and enforced per
component in [`component-inventory.md`](./component-inventory.md). Contrast implications of specific
looks (which need adjusted tokens to pass WCAG) are computed in
[`accessibility.md` §"Contrast across the 17 looks"](./accessibility.md).

---

## 5. Brand quick reference

Full brand rules are in [`design-system.md` §1](./design-system.md). The essentials a builder needs:

- **Name.** Product is **Sane Notes**; in-app chrome shows **"Sane"** alone. "Sane Notes" is the full
  name for stores, sign-in, and document/export naming.
- **Promise / tagline.** *Sane* = calm, clear, "in your right mind during exam week." Tagline
  **"Study smarter."** — keep the S·S initials; render as `S`tudy `s`marter with the two leading
  letters in the accent.
- **Wordmark.** "Sane" at weight 600, "Notes" at 400 in muted ink, in the **display face of the active
  look**, tracking −1% (`-.01em`).
- **Voice.** Plain, warm, specific. Sentences, not labels. **No exclamation marks; one em dash is
  fine.** Numbers are honest ("5 imports a month"); limits are explained, never hidden. Full voice
  guide with examples in [`ux-principles.md` §"Microcopy voice"](./ux-principles.md).
- **Persona.** Design persona **"Riya"** — B.Tech, Physics minor, India locale (₹, +91, verified
  student). Students first, then professionals.

---

## 6. The Sage mascot — rules and the watermark problem

The mark is **the Sage** ("Sane Sage"): a registered character with a conical hat, a staff, and closed
eyes. It is a **fixed-color trademark**.

**Rules (MUST):**

- **Never** recolor, stretch, flip, crop, rotate, or add effects to the character. It is always the
  identical artwork.
- The Sage sits on the look's **accent-soft (`acs`) tile** — the *tile* changes with the theme, never
  the character.
- **Minimum mark size 24 px.** Clear space around it equals the **hat-brim height**.
- **App icon variants:** the Sage on four tile grounds — accent-soft (default), ink, paper, and
  Cyberpunk night. Character identical across all four; only the tile follows.
- Source asset spec: transparent PNG, **779×776** (per `design-system.md §1`).

**The watermark problem (MUST fix before any store/marketing release):**

The art currently in the repo is **not clean, licensable original art**:

- `design/assets/sane-sage.png` and `design/assets/sane-sage-icon.png` are **watermarked stock
  placeholders**. They are fine for the mockup/canvas but MUST NOT ship in the app binary, on stores,
  on the website, or in any exported document.
- The clean version referenced by the project is the repo file **`sane notes.png`** (the un-watermarked
  Sage). Treat that as the interim clean source until commissioned original art exists.
- **Action required:** commission original Sage artwork (transparent, ≥779×776, plus a vector master
  for the app-icon tiles and the 24 px minimum size), replace every placeholder, and record the asset
  provenance/license. Until then, tag any build that embeds `design/assets/*.png` as **not
  releasable**. This is tracked as a design blocker; see open questions below.

Because the Sage is a trademark and appears in login/onboarding/profiles/empty-states, a builder MUST
reference it through a single `sane_ui` asset (proposed `SaneSageMark`) so the placeholder can be
swapped in one place. See [`component-inventory.md`](./component-inventory.md).

---

## 7. Known open questions (design)

These are unresolved and MUST be decided by the maintainer before the affected surface ships. The full
list (20 items) is in [`screens-and-flows.md` §"Open design questions"](./screens-and-flows.md); the
highest-impact ones:

1. **Product-name inconsistency.** The canvas mostly says "Sane"/"Sane Notes" but one screen shows
   "SS Notes" and a backup option "SS Cloud". Canonical name is **Sane Notes**. **Resolved for the backup
   target** in [`../product/prd-03-identity-sync-privacy-settings-billing.md`](../product/prd-03-identity-sync-privacy-settings-billing.md)
   §0.4: there is **no first-party cloud** (locked decision 3 — no Sane Notes server ever stores note
   content), so "SS Cloud" is **removed**, not renamed to "Sane Cloud"; all "back up to" targets are the
   user's own iCloud Drive / Google Drive.
2. **Mascot art is watermarked** (§6) — replace with original art before release.
3. **Trash/rename/delete/favourite have no controls** in the mockup — the notebook context menu
   (rename, change subject, duplicate, favourite, move-to-trash, restore, 30-day purge) is undefined.
4. **Offline / error / loading states are largely undefined** beyond a minimal Library shell — see
   [`ux-principles.md`](./ux-principles.md) for the states this doc set *proposes*, which need sign-off.
5. **Multi-profile / theme scope** — what is partitioned per profile vs per device vs per account
   (notebooks, look, wallpaper, prefs, plan) is unspecified.

When you build a surface touching an open question, implement the decisive default proposed in the
relevant doc, and leave a `// DESIGN-OPEN-Qn:` comment linking the question so it can be revisited.
