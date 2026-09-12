# Sane Notes — Design System

> Extracted verbatim from the Claude Design canvas bundle: `design/sane-data.js` (17 themed "looks", shared ink/highlighter/paper/tint tables, page size) and `design/Sane Notes Design Sheet.dc.html` (brand, typography, spacing, components, per-look rules). Machine-readable companion: [`tokens.json`](./tokens.json).
>
> Design sheet version: **v1 · September 2026**.

---

## 1. Brand

**Name.** The product is **Sane Notes**. "Sane" stands alone in the product (in-app chrome shows "Sane" alone); "Sane Notes" is the full name for stores, sign-in and documents.

**The promise.** *Sane* is the promise — calm, clear, **in your right mind during exam week**.

**The mark — the Sage.** The mark is the **Sage**: the registered character with a conical hat, a staff and closed eyes. It is a **fixed-color trademark**: never recolor, stretch, flip or crop it. It sits on the look's **accent-soft tile** so the tile, not the mark, changes with the theme.

- Source asset: `assets/sane-sage.png` (transparent), **779×776**.
- **Minimum mark size 24 px**; clear space equals the **hat brim height**.
- **App icon variants**: the Sage on four tile grounds — accent-soft (default), ink, paper, Cyberpunk night. The character stays identical; only the tile follows the look.

**Wordmark.** "Sane" at weight **600**, "Notes" at **400** in the muted ink, in the **display face of the active look**, tracking **−1%** (`-.01em`).

**Tagline.** **"Study smarter."** — keeps the initials **S·S** (Study Smarter). Rendered as `S`tudy `s`marter with the two leading letters in the accent.

**Voice.** Plain, warm, specific. Sentences, not labels. *"Everything you write is time-linked"* beats *"Audio sync enabled."* Numbers are honest ("5 imports a month"); limits are explained, never hidden. **No exclamation marks; one em dash is fine.** Sample microcopy: "Pick up where you left off", "Who's writing?", "Circle some ink to select it".

---

## 2. Foundations (shared across every look)

### Page size

| Token | Value |
|---|---|
| `W` (page width, units) | **800** |
| `H` (page height, units) | **1040** |
| Editor page render max width | **820 px** |
| Freeform canvas | **2400 × 2400** (grows, scrolls both ways) |

Pages are 800×1040 units of real vector ink; typed text is an HTML layer sized in container units.

### Ink palette (pen colors)

The pen colors are shared by every look and swap by light/dark.

`INK` (light):

| # | Hex | Role |
|---|---|---|
| 0 | `#1f1f24` | near-black (default pen) |
| 1 | `#2457c5` | blue |
| 2 | `#d33b3b` | red |
| 3 | `#2e8b57` | green |
| 4 | `#7a3ec9` | purple |
| 5 | `#e07b1c` | orange |

`DARK_INK` (dark mode equivalents, same order):

| # | Hex |
|---|---|
| 0 | `#f2efe8` |
| 1 | `#6f9cff` |
| 2 | `#ff7b7b` |
| 3 | `#5fd18a` |
| 4 | `#b48cff` |
| 5 | `#ffa14d` |

### Highlighter palette `HL`

`['#ffe45c', '#ff9ad5', '#9be47a', '#8fd3ff']` — yellow, pink, green, blue. Highlighter strokes render at ~50% opacity.

### Stroke widths `WIDTHS`

`[1.6, 2.6, 4.4]` — three pen widths (fine / medium / bold).

### Paper types `PAPER_FILL`

Each key maps to an SVG pattern fill (`url(#…)`) or `none`:

| Key | Fill |
|---|---|
| `lined` | `url(#ss-lined)` |
| `grid` | `url(#ss-grid)` |
| `dot` | `url(#ss-dot)` |
| `blank` | `none` |
| `cornell` | `url(#ss-lined)` |
| `music` | `url(#ss-music)` |
| `planner` | `url(#ss-grid)` |
| `flash` | `url(#ss-flash)` |
| `freeform` | `url(#ss-dot)` |

Template picker order (`TPLS`): Blank · Lined · Grid · Dotted · Cornell · Music staff · Weekly planner · Flashcards.

### Paper tints `TINT`

Overlay color washed over the page:

| Key | Overlay value | Swatch chip color (`TINTS`) |
|---|---|---|
| `none` (White) | `none` | `#ffffff` |
| `cream` | `rgba(255,214,140,.30)` | `#f7ecd2` |
| `yellow` | `rgba(255,232,110,.45)` | `#fff0a8` |
| `gray` | `rgba(110,120,140,.16)` | `#e6e8ee` |

### Wallpaper presets `WALLS`

Set behind a tinted veil; surfaces turn **84% translucent with a 22 px backdrop blur** so ink and text keep contrast. Uploads are down-sampled to **1600 px** and saved on device.

| Key | Name | CSS |
|---|---|---|
| `aurora` | Aurora | `radial-gradient(at 20% 20%, #a8c0ff, transparent 55%), radial-gradient(at 80% 30%, #ffc3a0, transparent 55%), radial-gradient(at 50% 95%, #c2ffd8, transparent 55%), linear-gradient(#f5f7fb, #e9edf7)` |
| `dusk` | Dusk | `linear-gradient(160deg, #2b1055 0%, #7597de 100%)` |
| `inkwash` | Ink wash | `radial-gradient(at 30% 30%, #6b7280, transparent 60%), radial-gradient(at 80% 80%, #111827, transparent 60%), linear-gradient(#374151, #1f2937)` |
| `sand` | Sand | `radial-gradient(at 70% 20%, #ffe8c2, transparent 55%), linear-gradient(180deg, #f6e7cf, #e2c9a3)` |
| `meadow` | Meadow | `radial-gradient(at 20% 80%, #b7f0c1, transparent 55%), radial-gradient(at 80% 20%, #fff2a8, transparent 55%), linear-gradient(#e9f7ec, #cfe9d6)` |
| `graphite` | Graphite | `repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 2px, transparent 2px 8px), linear-gradient(#2a2d34, #15171b)` |

### Font stacks (`F`)

| Alias | Stack |
|---|---|
| `news` | `'Newsreader',Georgia,serif` |
| `karla` | `'Karla',system-ui,sans-serif` |
| `man` | `'Manrope',system-ui,sans-serif` |
| `bric` | `'Bricolage Grotesque',system-ui,sans-serif` |
| `dm` | `'DM Sans',system-ui,sans-serif` |
| `space` | `'Space Grotesk',system-ui,sans-serif` |
| `play` | `'Playfair Display',Georgia,serif` |
| `nun` | `'Nunito',system-ui,sans-serif` |
| `mono` | `'IBM Plex Mono',ui-monospace,monospace` |
| `syne` | `'Syne',system-ui,sans-serif` |
| `rubik` | `'Rubik',system-ui,sans-serif` |
| `arch` | `'Archivo',system-ui,sans-serif` |

---

## 3. Typography scale

Two roles only — **display** (headings, notebook titles, prices) and **body** (everything else). Sizes are fixed per role; the **family swaps with the look**.

| Role / step | Size | Weight | Line-height | Extra | Use |
|---|---|---|---|---|---|
| Display XL | 38 | 600 | 1.08 | tracking −.01em | hero ("Every way you take notes.") |
| Display L | 34 | 600 | 1.1 | — | greeting ("Good afternoon, Riya") |
| Display M | 20 | 600 | — | — | section ("Pick up where you left off") |
| Display S | 16 | 600 | — | — | notebook titles ("Physics II — Waves") |
| Body | 14 | 400 | 1.45 | — | paragraphs |
| Body strong | 14 | 600 | — | — | buttons |
| Muted | 12.5 | 400 | — | color `--mu` | meta ("page 4 of 12 · 12 min ago") |
| Label | 11 | 700 | — | tracking .08em, UPPERCASE | section labels |
| Mono | — | 700 | — | `tabular-nums` | timecodes ("04:12 / 08:24 · 1.5×") |

---

## 4. The 17 looks

Every look is **one token sheet**: 13 palette colors × light/dark, two fonts (display `fd` / body `fb`), two radii (`r` cards / `rs` controls), a border width `bw`, an elevation recipe, and — for some — a backdrop filter (`glass`) or background gradient/pattern (`bgi`). **Nothing in the app hard-codes a color.** Dark mode is a separate switch, so every look has a night version.

**Feel tokens** (shared shape, per-look overrides): `bw` border width · `glass` backdrop filter · `bgi`/`bgsz` root/ground image · `btnB` button border · `btnSh` button shadow · `btnBgi` button gloss fill · `cardSh` card shadow · `inset` pressed-inset shadow · `pill` chip/pill radius · `tf` text-transform · `ls` letter-spacing · `hw` heading weight · `hst` heading style · `hs` heading line-scale.

**Palette keys** (13): `bg` ground · `sf` surface · `sf2` surface-2 · `ink` text · `mu` muted text · `ln` line/border · `ac` accent · `aci` accent-ink (text on accent) · `acs` accent-soft (tinted accent bg) · `ac2` secondary accent · `pp` paper · `pl` paper-line · `sh` elevation shadow.

Groups: **Warm** (Paper, Skeuomorphism, Retro) · **Clean** (Minimalism, Glassmorphism, Flat, Material, Bento UI) · **Bold** (Pop, Maximalism, Y2K, Cyberpunk) · **Soft** (Neumorphism, Claymorphism) · **Raw** (Brutalism, Neo-Brutalism, Editorial).

---

### 4.1 Paper — *Warm*
> Cream ground, serif headings, tactile.

- **Fonts** display `'Newsreader',Georgia,serif` · body `'Karla',system-ui,sans-serif`
- **Radii** `--r 10px` / `--rs 7px` · **Border** `1px` · **Glass** none · **Pill** `999px`
- **Ground** `bgi: radial-gradient(rgba(70,50,20,.06) 1px, transparent 1.2px)` size `7px 7px` (dotted grain)
- **Buttons** border `0`, shadow none, gloss none · **Card shadow** `0 1px 0 rgba(70,50,20,.06)`
- **Heading** weight 600, normal, scale 1 · **Text-transform** none · **Letter-spacing** 0

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#eee5d2` | `#faf6ec` | `#f2eadb` | `#2a2318` | `#6f6350` | `rgba(70,50,20,.16)` | `#b5532c` | `#fff` | `rgba(181,83,44,.13)` | `#3f6b4f` | `#fcf9f1` | `rgba(120,90,50,.30)` | `0 10px 30px rgba(80,60,20,.13)` |
| Dark | `#1b1712` | `#26211a` | `#2f2921` | `#f1e9d9` | `#b0a28c` | `rgba(255,240,210,.12)` | `#e0805a` | `#1b1712` | `rgba(224,128,90,.2)` | `#8fbf9c` | `#2b251d` | `rgba(255,240,210,.16)` | `0 10px 30px rgba(0,0,0,.45)` |

---

### 4.2 Minimalism — *Clean*
> Mostly white, one blue, nothing extra.

- **Fonts** display & body `'Manrope',system-ui,sans-serif`
- **Radii** `--r 12px` / `--rs 8px` · **Border** `1px` · **Glass** none · **Pill** `999px`
- **Ground** none · **Buttons** border 0, shadow none · **Card shadow** none
- **Heading** weight 600 · **Text-transform** none · **Letter-spacing** 0

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#f3f4f7` | `#ffffff` | `#eceef3` | `#15171c` | `#5f6575` | `rgba(20,24,40,.1)` | `#2f5ef6` | `#fff` | `rgba(47,94,246,.11)` | `#0fa3a3` | `#ffffff` | `rgba(60,80,140,.2)` | `0 12px 32px rgba(20,30,60,.09)` |
| Dark | `#111318` | `#191c23` | `#22262f` | `#eceef3` | `#9aa1b1` | `rgba(255,255,255,.1)` | `#6b8dff` | `#0e1014` | `rgba(107,141,255,.18)` | `#3fc9c9` | `#1c2029` | `rgba(255,255,255,.13)` | `0 12px 32px rgba(0,0,0,.5)` |

---

### 4.3 Pop — *Bold*
> Hot pink, peach ground, rounder shapes.

- **Fonts** display `'Bricolage Grotesque',system-ui,sans-serif` · body `'DM Sans',system-ui,sans-serif`
- **Radii** `--r 18px` / `--rs 12px` · **Border** `1px` · **Glass** none · **Pill** `999px`
- **Ground** none · **Buttons** border 0, shadow `0 5px 0 rgba(29,19,51,.14)` · **Card shadow** `0 6px 18px rgba(255,77,125,.08)`
- **Heading** weight 700 · **Text-transform** none · **Letter-spacing** 0

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#fff0e4` | `#ffffff` | `#ffe4d2` | `#1d1333` | `#665b7a` | `rgba(29,19,51,.12)` | `#ff4d7d` | `#fff` | `rgba(255,77,125,.14)` | `#ffc933` | `#fffdf8` | `rgba(120,80,160,.22)` | `0 14px 34px rgba(255,77,125,.15)` |
| Dark | `#150f26` | `#1e1636` | `#281e47` | `#f5f0ff` | `#b0a3cc` | `rgba(255,255,255,.1)` | `#ff6b95` | `#150f26` | `rgba(255,107,149,.2)` | `#ffd166` | `#221a3d` | `rgba(255,255,255,.14)` | `0 14px 34px rgba(0,0,0,.5)` |

---

### 4.4 Maximalism — *Bold*
> Layered color, big serif, generous shadows.

- **Fonts** display `'Playfair Display',Georgia,serif` · body `'DM Sans',system-ui,sans-serif`
- **Radii** `--r 20px` / `--rs 12px` · **Border** `1px` · **Glass** none · **Pill** `999px`
- **Ground** `bgi: radial-gradient(at 15% 10%, rgba(255,214,165,.9), transparent 55%), radial-gradient(at 90% 20%, rgba(255,175,204,.8), transparent 50%), radial-gradient(at 60% 100%, rgba(191,232,255,.8), transparent 55%)`
- **Buttons** border 0, gloss `linear-gradient(135deg, rgba(255,255,255,.28), transparent 60%)`, shadow `0 10px 24px rgba(194,24,91,.25)` · **Card shadow** `0 18px 44px rgba(194,24,91,.12)`
- **Heading** weight 700, **italic**, scale 1.15 · **Text-transform** none · **Letter-spacing** 0

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#fbe9dc` | `#fffaf3` | `#fde2cf` | `#2b1a2e` | `#7a5c6e` | `rgba(120,40,90,.16)` | `#c2185b` | `#fff` | `rgba(194,24,91,.13)` | `#f9a825` | `#fffdf8` | `rgba(160,70,120,.22)` | `0 18px 44px rgba(194,24,91,.18)` |
| Dark | `#1a0f18` | `#26151f` | `#321c2a` | `#eceef3` | `#9aa1b1` | `rgba(255,255,255,.1)` | `#ff5c9a` | `#1a0f18` | `rgba(255,92,154,.2)` | `#ffc247` | `#2a1822` | `rgba(255,255,255,.13)` | `0 12px 32px rgba(0,0,0,.5)` |

---

### 4.5 Glassmorphism — *Clean*
> Frosted panels over a soft gradient.

- **Fonts** display & body `'Manrope',system-ui,sans-serif`
- **Radii** `--r 16px` / `--rs 12px` · **Border** `1px` · **Glass** `blur(18px) saturate(1.3)` · **Pill** `999px`
- **Ground** `bgi: radial-gradient(at 20% 15%, #c9d6ff, transparent 50%), radial-gradient(at 80% 25%, #ffd6e0, transparent 50%), radial-gradient(at 50% 95%, #c8fff4, transparent 50%)`
- **Buttons** gloss `linear-gradient(180deg, rgba(255,255,255,.35), transparent)`, shadow `0 8px 24px rgba(91,108,255,.25)` · **Card shadow** `0 8px 30px rgba(60,70,140,.12), inset 0 1px 0 rgba(255,255,255,.7)`
- **Heading** weight 600 · Surfaces are translucent (`sf`/`sf2` use rgba)

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#dfe6f7` | `rgba(255,255,255,.62)` | `rgba(255,255,255,.42)` | `#171a2b` | `#5c6280` | `rgba(255,255,255,.7)` | `#5b6cff` | `#fff` | `rgba(91,108,255,.14)` | `#ff8fb1` | `rgba(255,255,255,.9)` | `rgba(80,90,160,.22)` | `0 14px 40px rgba(60,70,140,.16)` |
| Dark | `#161a2e` | `rgba(30,34,60,.6)` | `rgba(40,46,80,.55)` | `#eceef3` | `#9aa1b1` | `rgba(255,255,255,.14)` | `#8c9bff` | `#0f1220` | `rgba(140,155,255,.18)` | `#ff9fc0` | `rgba(28,32,54,.9)` | `rgba(255,255,255,.13)` | `0 12px 32px rgba(0,0,0,.5)` |

---

### 4.6 Neumorphism — *Soft*
> One surface color, shapes pressed out of it.

- **Fonts** display & body `'Nunito',system-ui,sans-serif`
- **Radii** `--r 18px` / `--rs 14px` · **Border** `0px` · **Glass** none · **Pill** `14px`
- **Ground** none · `bg` = `sf` (one surface color)
- **Buttons** border 0, shadow `6px 6px 12px rgba(163,177,198,.55), -6px -6px 12px rgba(255,255,255,.9)` · **Card shadow** `8px 8px 18px rgba(163,177,198,.5), -8px -8px 18px rgba(255,255,255,.95)` · **Inset (pressed)** `inset 4px 4px 8px rgba(163,177,198,.45), inset -4px -4px 8px rgba(255,255,255,.9)`
- **Heading** weight 800 · **Text-transform** none

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#e6e9f0` | `#e6e9f0` | `#dde1ea` | `#2c3140` | `#6b7285` | `rgba(163,177,198,.25)` | `#5a67d8` | `#fff` | `rgba(90,103,216,.14)` | `#f6ad55` | `#eef0f5` | `rgba(90,100,130,.2)` | `8px 8px 18px rgba(163,177,198,.55), -8px -8px 18px rgba(255,255,255,.95)` |
| Dark | `#232733` | `#232733` | `#1d212b` | `#eceef3` | `#9aa1b1` | `rgba(255,255,255,.05)` | `#8b95ff` | `#1e2230` | `rgba(139,149,255,.18)` | `#f6ad55` | `#2a2f3d` | `rgba(255,255,255,.13)` | `8px 8px 18px rgba(0,0,0,.45), -8px -8px 18px rgba(255,255,255,.05)` |

---

### 4.7 Claymorphism — *Soft*
> Puffy, rounded, playful depth.

- **Fonts** display & body `'Nunito',system-ui,sans-serif`
- **Radii** `--r 26px` / `--rs 18px` · **Border** `0px` · **Glass** none · **Pill** `999px`
- **Ground** none
- **Buttons** border 0, shadow `0 8px 0 rgba(120,100,200,.25), inset 0 -6px 10px rgba(0,0,0,.08), inset 0 4px 6px rgba(255,255,255,.35)` · **Card shadow** `0 12px 0 rgba(120,100,200,.14), inset 0 -8px 14px rgba(120,100,200,.08), inset 0 6px 10px rgba(255,255,255,.9)`
- **Heading** weight 800 · **Text-transform** none

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#f1edff` | `#ffffff` | `#e9e2ff` | `#2a2150` | `#6f6790` | `rgba(120,100,200,.14)` | `#7c5cff` | `#fff` | `rgba(124,92,255,.14)` | `#ffb86b` | `#fffdfa` | `rgba(120,100,200,.2)` | `0 12px 0 rgba(120,100,200,.16), inset 0 -8px 14px rgba(120,100,200,.08), inset 0 6px 10px rgba(255,255,255,.9)` |
| Dark | `#17122c` | `#221b3f` | `#2c2452` | `#eceef3` | `#9aa1b1` | `rgba(255,255,255,.1)` | `#a48cff` | `#17122c` | `rgba(164,140,255,.2)` | `#ffc27a` | `#241d44` | `rgba(255,255,255,.13)` | `0 12px 0 rgba(0,0,0,.4), inset 0 -8px 14px rgba(0,0,0,.25), inset 0 6px 10px rgba(255,255,255,.06)` |

---

### 4.8 Brutalism — *Raw*
> Black rules, no radius, system honesty.

- **Fonts** display `'Archivo',system-ui,sans-serif` · body `'Space Grotesk',system-ui,sans-serif`
- **Radii** `--r 0px` / `--rs 0px` · **Border** `2px` · **Glass** none · **Pill** `0px`
- **Ground** none · **Buttons** border `2px solid var(--ln)`, shadow none · **Card shadow** none
- **Heading** weight 900, scale 1.1 · **Text-transform** UPPERCASE · **Letter-spacing** .05em

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#ffffff` | `#ffffff` | `#f2f2f2` | `#000000` | `#444444` | `#000000` | `#0000ff` | `#fff` | `rgba(0,0,255,.08)` | `#ff0000` | `#ffffff` | `rgba(0,0,0,.35)` | `none` |
| Dark | `#000` | `#000` | `#151515` | `#eceef3` | `#9aa1b1` | `#ffffff` | `#6b6bff` | `#000` | `rgba(107,107,255,.18)` | `#ff4d4d` | `#0a0a0a` | `rgba(255,255,255,.13)` | `none` |

---

### 4.9 Neo-Brutalism — *Raw*
> Pastels, thick outlines, hard offset shadows.

- **Fonts** display & body `'Space Grotesk',system-ui,sans-serif`
- **Radii** `--r 10px` / `--rs 8px` · **Border** `2px` · **Glass** none · **Pill** `8px`
- **Ground** `bgi: radial-gradient(rgba(17,17,17,.18) 1px, transparent 1.3px)` size `22px 22px`
- **Buttons** border `2px solid var(--ln)`, shadow `4px 4px 0 var(--ln)` · **Card shadow** `4px 4px 0 var(--ln)`
- **Heading** weight 800 · **Text-transform** none

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#fff7d6` | `#ffffff` | `#ffe9a8` | `#111111` | `#4a4a4a` | `#111111` | `#ff6b6b` | `#111` | `rgba(255,107,107,.18)` | `#4ecdc4` | `#fffdf5` | `rgba(0,0,0,.3)` | `4px 4px 0 #111111` |
| Dark | `#1c1a12` | `#26231a` | `#332e1e` | `#eceef3` | `#9aa1b1` | `#f3f3f3` | `#ff8080` | `#111` | `rgba(255,128,128,.2)` | `#5fe0d6` | `#2a2718` | `rgba(255,255,255,.13)` | `4px 4px 0 #f3f3f3` |

---

### 4.10 Skeuomorphism — *Warm*
> Leather desk, paper sheets, stitched edges.

- **Fonts** display `'Newsreader',Georgia,serif` · body `'Karla',system-ui,sans-serif`
- **Radii** `--r 8px` / `--rs 6px` · **Border** `1px` · **Glass** none · **Pill** `999px`
- **Ground** `bgi: repeating-linear-gradient(45deg, rgba(0,0,0,.025) 0 2px, transparent 2px 6px)` (stitched texture)
- **Buttons** border `1px solid rgba(60,40,10,.45)`, gloss `linear-gradient(180deg, rgba(255,255,255,.3), rgba(0,0,0,.1))`, shadow `0 1px 2px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.45)` · **Card shadow** `0 2px 4px rgba(60,40,10,.3), inset 0 1px 0 rgba(255,255,255,.7)` · **Inset (pressed)** `inset 0 2px 4px rgba(0,0,0,.18)`
- **Heading** weight 600 · **Text-transform** none

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#cdb894` | `#f6eedb` | `#eadfc6` | `#3b2f1e` | `#7a6a52` | `rgba(90,60,20,.28)` | `#8b4513` | `#fff` | `rgba(139,69,19,.14)` | `#6b8e23` | `#fbf6e7` | `rgba(120,90,50,.3)` | `0 2px 4px rgba(60,40,10,.35), inset 0 1px 0 rgba(255,255,255,.7)` |
| Dark | `#3a2c1c` | `#4a3a26` | `#5a4830` | `#f3e8d2` | `#c2ad8a` | `rgba(255,230,190,.2)` | `#d9975a` | `#221a10` | `rgba(217,151,90,.2)` | `#9cbf4e` | `#5a4a32` | `rgba(255,230,190,.16)` | `0 2px 4px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08)` |

---

### 4.11 Flat — *Clean*
> Solid colors, no shadows, crisp edges.

- **Fonts** display & body `'DM Sans',system-ui,sans-serif`
- **Radii** `--r 6px` / `--rs 4px` · **Border** `1px` · **Glass** none · **Pill** `4px`
- **Ground** none · **Buttons** border 0, shadow none · **Card shadow** none
- **Heading** weight 600 · **Text-transform** none

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#f4f6f8` | `#ffffff` | `#e9edf1` | `#1f2933` | `#616e7c` | `rgba(31,41,51,.12)` | `#16a085` | `#fff` | `rgba(22,160,133,.14)` | `#f39c12` | `#ffffff` | `rgba(31,41,51,.14)` | `none` |
| Dark | `#12191c` | `#182126` | `#212c32` | `#eceef3` | `#9aa1b1` | `rgba(255,255,255,.1)` | `#2ecc9a` | `#0f1a17` | `rgba(46,204,154,.18)` | `#f5b041` | `#1c262b` | `rgba(255,255,255,.13)` | `none` |

---

### 4.12 Material — *Clean*
> Tonal surfaces, pill buttons, layered elevation.

- **Fonts** display & body `'Rubik',system-ui,sans-serif`
- **Radii** `--r 16px` / `--rs 20px` · **Border** `1px` · **Glass** none · **Pill** `20px`
- **Ground** none · **Buttons** border 0, shadow none · **Card shadow** `0 1px 2px rgba(0,0,0,.08)`
- **Heading** weight 500 · **Text-transform** none · Note: `acs` light is an opaque tonal color `#eaddff`

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#fef7ff` | `#ffffff` | `#f3edf7` | `#1d1b20` | `#49454f` | `rgba(121,116,126,.3)` | `#6750a4` | `#fff` | `#eaddff` | `#7d5260` | `#fffbfe` | `rgba(103,80,164,.2)` | `0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15)` |
| Dark | `#141218` | `#1d1b20` | `#2b2930` | `#e6e0e9` | `#cac4d0` | `rgba(147,143,153,.35)` | `#d0bcff` | `#381e72` | `rgba(208,188,255,.16)` | `#efb8c8` | `#211f26` | `rgba(255,255,255,.13)` | `0 12px 32px rgba(0,0,0,.5)` |

---

### 4.13 Bento UI — *Clean*
> Tiles in a grid, one graphite accent.

- **Fonts** display & body `'Manrope',system-ui,sans-serif`
- **Radii** `--r 22px` / `--rs 14px` · **Border** `1px` · **Glass** none · **Pill** `999px`
- **Ground** none · **Buttons** border 0, shadow none · **Card shadow** `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)`
- **Heading** weight 800 · Accent is graphite (`ac` = `ink`)

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#ececf1` | `#ffffff` | `#f4f4f7` | `#111114` | `#6a6a75` | `rgba(0,0,0,.06)` | `#111114` | `#fff` | `rgba(17,17,20,.08)` | `#ff7a00` | `#ffffff` | `rgba(0,0,0,.14)` | `0 1px 2px rgba(0,0,0,.04), 0 12px 28px rgba(0,0,0,.06)` |
| Dark | `#0f0f12` | `#19191e` | `#222229` | `#eceef3` | `#9aa1b1` | `rgba(255,255,255,.06)` | `#f2f2f5` | `#111114` | `rgba(242,242,245,.1)` | `#ff9a3d` | `#1d1d23` | `rgba(255,255,255,.13)` | `0 12px 32px rgba(0,0,0,.5)` |

---

### 4.14 Y2K — *Bold*
> Chrome gradients, bubble shapes, cyan on lilac.

- **Fonts** display `'Syne',system-ui,sans-serif` · body `'DM Sans',system-ui,sans-serif`
- **Radii** `--r 24px` / `--rs 16px` · **Border** `1px` · **Glass** `blur(12px)` · **Pill** `999px`
- **Ground** `bgi: linear-gradient(135deg, #dfe9ff 0%, #ffd1f7 55%, #c8fff4 100%)`
- **Buttons** gloss `linear-gradient(180deg, rgba(255,255,255,.6), rgba(255,255,255,0) 55%, rgba(0,0,0,.08))`, shadow `0 6px 18px rgba(120,80,200,.3), inset 0 1px 0 #fff` · **Card shadow** `0 10px 28px rgba(120,80,200,.18), inset 0 1px 0 #fff`
- **Heading** weight 800 · Surfaces translucent (`sf`/`sf2` rgba)

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#e6ecff` | `rgba(255,255,255,.78)` | `rgba(255,255,255,.55)` | `#241a4a` | `#6c5f96` | `rgba(120,80,200,.3)` | `#7b2cff` | `#fff` | `rgba(123,44,255,.14)` | `#00e0c6` | `rgba(255,255,255,.92)` | `rgba(120,80,200,.22)` | `0 10px 28px rgba(120,80,200,.28), inset 0 1px 0 #ffffff` |
| Dark | `#160f2e` | `rgba(40,28,80,.7)` | `rgba(60,44,110,.6)` | `#eceef3` | `#9aa1b1` | `rgba(200,170,255,.25)` | `#b58cff` | `#160f2e` | `rgba(181,140,255,.2)` | `#3ffde6` | `rgba(36,26,70,.92)` | `rgba(255,255,255,.13)` | `0 12px 32px rgba(0,0,0,.5)` |

---

### 4.15 Retro — *Warm*
> Seventies cream, burnt orange, mono details.

- **Fonts** display `'Archivo',system-ui,sans-serif` · body `'IBM Plex Mono',ui-monospace,monospace`
- **Radii** `--r 4px` / `--rs 3px` · **Border** `1px` · **Glass** none · **Pill** `4px`
- **Ground** `bgi: repeating-linear-gradient(0deg, rgba(46,42,37,.05) 0 1px, transparent 1px 12px)` (ruled lines)
- **Buttons** border `2px solid var(--ink)`, shadow `3px 3px 0 var(--ink)` · **Card shadow** `3px 3px 0 rgba(46,42,37,.25)`
- **Heading** weight 900 · **Text-transform** UPPERCASE · **Letter-spacing** .06em

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#f4e9d8` | `#fbf3e6` | `#efe1cb` | `#2e2a25` | `#6e6257` | `rgba(80,60,40,.25)` | `#d4572a` | `#fff` | `rgba(212,87,42,.14)` | `#e8b04b` | `#fdf6e9` | `rgba(80,60,40,.25)` | `0 2px 0 rgba(46,42,37,.25)` |
| Dark | `#1e1a16` | `#28231d` | `#332c24` | `#f2e8d8` | `#b3a48f` | `rgba(255,255,255,.1)` | `#ff7a45` | `#1e1a16` | `rgba(255,122,69,.2)` | `#f0be5a` | `#2c261f` | `rgba(255,255,255,.13)` | `0 2px 0 rgba(0,0,0,.6)` |

---

### 4.16 Cyberpunk — *Bold*
> Neon cyan and magenta on near-black.

- **Fonts** display `'Space Grotesk',system-ui,sans-serif` · body `'IBM Plex Mono',ui-monospace,monospace`
- **Radii** `--r 4px` / `--rs 3px` · **Border** `1px` · **Glass** none · **Pill** `2px`
- **Ground** `bgi: linear-gradient(rgba(0,200,230,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,230,.07) 1px, transparent 1px)` size `32px 32px` (neon grid)
- **Buttons** border `1px solid var(--ac)`, shadow `0 0 14px rgba(0,240,255,.35)` (glow) · **Card shadow** `0 0 0 1px var(--ln)`
- **Heading** weight 700 · **Text-transform** UPPERCASE · **Letter-spacing** .08em
- Dark palette is a **hand-authored object** (not the shared `DK()` helper) — a true neon night.

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#e8fbff` | `#ffffff` | `#d8f6fb` | `#0b1a22` | `#3f6b78` | `rgba(0,160,190,.35)` | `#00b3c6` | `#fff` | `rgba(0,179,198,.14)` | `#e600b8` | `#ffffff` | `rgba(0,160,190,.2)` | `0 0 0 1px rgba(0,179,198,.25), 0 8px 24px rgba(0,179,198,.18)` |
| Dark | `#0b0f1a` | `#111827` | `#1a2236` | `#e6fbff` | `#7fd0e0` | `rgba(0,240,255,.35)` | `#00f0ff` | `#0b0f1a` | `rgba(0,240,255,.14)` | `#ff2bd6` | `#0f1524` | `rgba(0,240,255,.15)` | `0 0 0 1px rgba(0,240,255,.3), 0 0 28px rgba(0,240,255,.2)` |

---

### 4.17 Editorial — *Raw*
> Typography-led, hairlines, one red.

- **Fonts** display `'Playfair Display',Georgia,serif` · body `'Karla',system-ui,sans-serif`
- **Radii** `--r 0px` / `--rs 0px` · **Border** `1px` · **Glass** none · **Pill** `0px`
- **Ground** none · **Buttons** border `1px solid var(--ink)`, shadow none · **Card shadow** none
- **Heading** weight 700, scale 1.12 · **Text-transform** UPPERCASE · **Letter-spacing** .08em

| | bg | sf | sf2 | ink | mu | ln | ac | aci | acs | ac2 | pp | pl | sh |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Light | `#ffffff` | `#ffffff` | `#f5f4f0` | `#111111` | `#5c5c5c` | `rgba(0,0,0,.35)` | `#111111` | `#fff` | `rgba(0,0,0,.07)` | `#c8102e` | `#ffffff` | `rgba(0,0,0,.2)` | `none` |
| Dark | `#111` | `#111` | `#1c1c1c` | `#eceef3` | `#9aa1b1` | `rgba(255,255,255,.4)` | `#f2f2f2` | `#111` | `rgba(255,255,255,.08)` | `#ff4d5e` | `#141414` | `rgba(255,255,255,.13)` | `none` |

---

## 5. Component rules

Components are authored in the **Paper** look but every look restyles them from its token sheet. Heights: **42** chrome buttons, **44** tool buttons (stylus target), **34** chips, **28×46** toggles. Radii come from `--r` (cards) and `--rs` (controls).

### Buttons
- **Primary** — h42, padding `0 18`, radius `--rs`, border `0` (per look, `--btnB`), bg `--ac`, color `--aci`, font `600 14 --fb`.
- **Secondary** — h42, padding `0 16`, radius `--rs`, border `1px solid --ln`, bg `--sf`, color `--ink`.
- **Ghost** — h42, padding `0 12`, transparent, color `--mu`.
- **Icon** — 40×40, radius `--rs`, bg `--sf2`, color `--ink`.
- **Record** — h38, pill `999px`, bg `#e0443a`, color `#fff`, font `700 13`, with a white dot.
- **Hover** — `brightness(1.08)` on filled; `--sf2` fill on outlined/ghost. **Focus ring** 2px accent, offset 2.
- Per look these also pick up `--btnB` (border), `--btnSh` (shadow), `--btnBgi` (gloss fill).

### Badges (facts, never decoration)
- **PRO** — bg `--ac`, color `--aci`, weight 800, tracking .06em.
- **Audio** — bg `--acs`, color `--ac`.
- **PDF** — bg `--sf2`, color `--mu`.

### Chips · Segmented · Toggle
- **Chips** — h34, `pill` radius (per look), border `1px`. Active = `--ink` bg with `--bgs` text; inactive = `--sf` bg, `--ln` border.
- **Segmented** — padding 3px, radius `--rs`, track bg `--sf2`; active segment `--sf` with `0 1px 3px rgba(0,0,0,.18)`; inactive text `--mu`.
- **Toggle** — 46×28, radius 14, bg `--ac` (on) / `--ln` (off); knob 22px white with `0 1px 3px rgba(0,0,0,.25)`; travels **18 px in 200 ms**.

### Tool palette (dockable)
- Container: padding 6px, radius **18px**, bg `--sf`, border `1px --ln`, shadow `--sh`.
- Grip (6 dots) drags the palette; on release it docks to the nearest edge — bottom/top keep a **row**, left/right flip to a **column**. Edge guides light up while dragging.
- Order: **tools · colors · widths · page nav**. 7 tools at **44×44** radius `--rs` (active = `--ac`/`--aci`); 6 color dots at **22px**; 3 widths; page nav.

### Notebook cover
- 3:4 cover, radius `--rs`, border `1px --ln`, shadow `--sh`, bg `--pp`. Shows the first page's **real ink** (thumbnail of the page SVG).
- Subject color is a **6 px spine** at the left edge. Badges are facts (audio / PDF / shared). **Hover lifts 3 px.**

### Search result · Toast
- **Result row** — grid `40px / text / meta`, border `1px --ln`, radius `--r`, bg `--sf`; leading 40px circle avatar bg `--acs`/color `--ac`; matched text uses `<mark>` bg `--acs`, color `--ac`, weight 700.
- **Toast** — the *only* inverted surface (`--ink` on `--bgs`), pill `999px`, shadow `--sh`. **2.4 s, bottom-center, above the palette.**

### Spacing · Radius · Elevation
- **Spacing scale:** `4 6 8 10 12 14 16 18 22 28 32`.
- **Radius:** `--r` cards · `--rs` controls · pill for chips.
- **Elevation:** flat by default; `--sh` only on floating things (palette, covers, dialogs, recents on hover).

### Ground patterns per look
Set via `--bgi` (+ `--bgsz`): Paper dotted grain (`7px 7px`) · Skeuomorphism 45° stitching · Neo-Brutalism dotted (`22px 22px`) · Retro horizontal rules · Cyberpunk neon grid (`32px 32px`) · Maximalism / Glassmorphism / Y2K soft radial or linear gradient washes. All others `none`.

### Screens (proven token sheets)
Login · Who's writing (profiles) · Onboarding · Library · Editor · Templates · Share/Import/Upgrade · Search · Settings. Live frames render at **1180×820** (iPad landscape). Editor page is 800×1040 units, max 820 px wide; freeform canvases are 2400×2400. Toasts replace red error text everywhere. **Wallpaper mode:** surfaces turn 84% translucent with a 22 px backdrop blur over a blurred, tinted wallpaper.

---

## Implementation guidance

Goal: **every platform renders identically** from one source of truth. `tokens.json` is that source; each client compiles it into the platform's native theming primitive.

### Source of truth: `docs/design/tokens.json`
The JSON mirrors `sane-data.js` exactly. Shape:

```
{
  "page":   { "W": 800, "H": 1040, "editorMaxWidthPx": 820, "freeform": [2400,2400] },
  "ink":    { "INK": [...6], "DARK_INK": [...6] },
  "hl":     [...4],
  "widths": [1.6, 2.6, 4.4],
  "paperFill": { "lined": "url(#ss-lined)", ... },
  "tint":   { "none": "none", "cream": "rgba(...)", ... },
  "fonts":  { "news": "'Newsreader',Georgia,serif", ... },
  "typeScale": { "displayXL": {...}, "body": {...}, ... },
  "spacingScale": [4,6,8,...],
  "componentSizes": { "chromeButtonH": 42, ... },
  "looks": {
    "<id>": {
      "name","group","desc","fd","fb","r","rs","bw","glass","bgi","bgsz",
      "btnB","btnSh","btnBgi","cardSh","inset","pill","tf","ls","hw","hst","hs",
      "light": { bg,sf,sf2,ink,mu,ln,ac,aci,acs,ac2,pp,pl,sh },
      "dark":  { ...same 13 keys }
    }
  }
}
```

Rules for staying identical:
- **Never hard-code a color** in any client — always read a palette key. This is the sheet's own rule.
- **13 palette keys, 2 modes, per look** — treat `(lookId, mode)` as the addressing scheme. Light and dark are a *separate switch*, not a variant of one map, so ship both maps for all 17 looks.
- **Colors are stored as CSS color strings**, including `rgba(...)` and multi-stop values. Non-CSS renderers (Flutter, native) must parse `#rgb/#rrggbb/#rrggbbaa` and `rgba()`; a couple of values are opaque hex where you'd expect a tint (e.g. Material light `acs = #eaddff`) — parse, don't assume.
- **`sh`, `cardSh`, `btnSh`, `inset` are full CSS shadow lists** (some multi-layer, some `inset`, some `0 0 0 1px` rings, some glows). On CSS clients apply verbatim. On Flutter, pre-compile each into a `List<BoxShadow>` (split on top-level commas, map `inset` to inner-shadow handling or an approximation).
- **`bgi` may reference SVG pattern ids** for paper (`url(#ss-lined)` …) and CSS gradients for grounds. Ship the SVG `<defs>` (`ss-lined`, `ss-grid`, `ss-dot`, `ss-music`, `ss-flash`) with every client so paper fills resolve.
- **`var(--ln)` / `var(--ac)` / `var(--ink)` inside `btnB`/`btnSh`/`cardSh`** are indirections to the active palette — resolve them against the current `(look, mode)` before handing to a non-CSS renderer.

### Web / React
Emit CSS custom properties on a theme root, exactly the sheet's variable names: `--bg --bgs --sf --sf2 --ink --mu --ln --ac --aci --acs --ac2 --pp --pl --sh`, plus feel tokens `--r --rs --bw --glass --bgi --bgsz --btnB --btnSh --btnBgi --cardSh --inset --pill --tf --ls --hw --hst --hs --fd --fb`. Switch look by swapping the block; switch mode by choosing `light`/`dark`. (`--bgs` = the ground behind, used as inverse text on chips/toasts.) A tiny build step turns `tokens.json` into one `:root[data-look][data-mode]{…}` stylesheet.

### Flutter — `ThemeExtension`
Define a `SaneLook extends ThemeExtension<SaneLook>` carrying every token:

```dart
@immutable
class SaneLook extends ThemeExtension<SaneLook> {
  final String id, group;
  // palette (Color)
  final Color bg, sf, sf2, ink, mu, ln, ac, aci, acs, ac2, pp, pl;
  // elevation (pre-parsed)
  final List<BoxShadow> sh, cardSh, btnSh, inset;
  // shape & type
  final double r, rs, bw, pill;         // px from "10px" etc.
  final String fd, fb;                  // resolved font families
  final String tf, hst;                 // text-transform, heading style
  final double ls, hs;                  // letter-spacing (em), heading scale
  final FontWeight hw;                  // heading weight
  final String? glass, bgi, btnBgi;     // effects (nullable / "none")
  final String bgsz;
  const SaneLook({ /* ... */ });
  @override SaneLook copyWith({ /* ... */ }) => /* ... */;
  @override SaneLook lerp(ThemeExtension<SaneLook>? o, double t) => /* usually snap, not lerp */;
}
```

- Generate 34 const instances (17 looks × light/dark) from `tokens.json` in a codegen step so Dart and web read the *same* JSON — do not retype hex by hand.
- Parse `"10px" → 10.0`, `".05em" → 0.05`, `"600" → FontWeight.w600`, and each shadow string → `BoxShadow`.
- Map `glass: "blur(18px) saturate(1.3)"` to a `BackdropFilter(ImageFilter.blur(...))`; `saturate` needs a `ColorFilter.matrix` (approximate). Where `glass == "none"`, skip the filter.
- Read tokens with `Theme.of(context).extension<SaneLook>()!`; switch look/mode by swapping the extension on the `ThemeData`.
- Register the six fonts (Newsreader, Karla, Manrope, Bricolage Grotesque, DM Sans, Space Grotesk, Playfair Display, Nunito, IBM Plex Mono, Syne, Rubik, Archivo) as bundled assets so a look's `fd`/`fb` always resolve offline.

### Native (iOS/Android)
Compile `tokens.json` into an asset catalog / resource map keyed by `(lookId, mode, tokenKey)`. Keep the same 13 palette keys and feel tokens; resolve `var(--…)` indirections and shadow lists at build time.

### Shared drawing constants
`W/H`, `INK`/`DARK_INK`, `HL`, `WIDTHS`, `PAPER_FILL`, `TINT` are **cross-platform drawing constants**, independent of the look. The ink layer (pens, highlighters, page grid) reads these directly, so the canvas renders pixel-for-pixel the same regardless of theme; only the chrome (surfaces, chips, buttons) reads the look. Ink color flips to `DARK_INK[i]` in dark mode by index.

### Codegen contract
One generator, `tokens.json → { web css, dart, native }`. CI should fail if any generated file drifts from `tokens.json`, guaranteeing all platforms track a single edit to the token sheet.
