// Sane Notes — seed data & ink helpers (ES module)
export const W = 800, H = 1040;
export const INK = ['#1f1f24', '#2457c5', '#d33b3b', '#2e8b57', '#7a3ec9', '#e07b1c'];
export const DARK_INK = ['#f2efe8', '#6f9cff', '#ff7b7b', '#5fd18a', '#b48cff', '#ffa14d'];
export const HL = ['#ffe45c', '#ff9ad5', '#9be47a', '#8fd3ff'];
export const WIDTHS = [1.6, 2.6, 4.4];
export const PAPER_FILL = { lined: 'url(#ss-lined)', grid: 'url(#ss-grid)', dot: 'url(#ss-dot)', blank: 'none', cornell: 'url(#ss-lined)', music: 'url(#ss-music)', planner: 'url(#ss-grid)', flash: 'url(#ss-flash)', freeform: 'url(#ss-dot)' };
export const TINT = { none: 'none', cream: 'rgba(255,214,140,.30)', yellow: 'rgba(255,232,110,.45)', gray: 'rgba(110,120,140,.16)' };

// 17 looks. Shared shape: fonts, radii, border width (bw), backdrop filter (glass), optional root background image (bgi), light/dark palettes.
const F = { news: "'Newsreader',Georgia,serif", karla: "'Karla',system-ui,sans-serif", man: "'Manrope',system-ui,sans-serif", bric: "'Bricolage Grotesque',system-ui,sans-serif", dm: "'DM Sans',system-ui,sans-serif", space: "'Space Grotesk',system-ui,sans-serif", play: "'Playfair Display',Georgia,serif", nun: "'Nunito',system-ui,sans-serif", mono: "'IBM Plex Mono',ui-monospace,monospace", syne: "'Syne',system-ui,sans-serif", rubik: "'Rubik',system-ui,sans-serif", arch: "'Archivo',system-ui,sans-serif" };
const DK = (ac, aci, ac2, o) => Object.assign({ bg: '#111318', sf: '#191c23', sf2: '#22262f', ink: '#eceef3', mu: '#9aa1b1', ln: 'rgba(255,255,255,.1)', pp: '#1c2029', pl: 'rgba(255,255,255,.13)', sh: '0 12px 32px rgba(0,0,0,.5)', ac, aci, ac2, acs: 'rgba(255,255,255,.1)' }, o || {});
const T = (name, group, desc, fd, fb, r, rs, light, dark, x) => Object.assign({ name, group, desc, fd, fb, r, rs, bw: '1px', glass: 'none', bgi: 'none', bgsz: 'auto', btnB: '0', btnSh: 'none', cardSh: 'none', pill: '999px', tf: 'none', ls: '0', hw: '600', hst: 'normal', hs: '1', btnBgi: 'none', inset: 'none', light, dark }, x || {});
export const THEMES = {
  paper: T('Paper', 'Warm', 'Cream ground, serif headings, tactile.', F.news, F.karla, '10px', '7px',
    { bg: '#eee5d2', sf: '#faf6ec', sf2: '#f2eadb', ink: '#2a2318', mu: '#6f6350', ln: 'rgba(70,50,20,.16)', ac: '#b5532c', aci: '#fff', acs: 'rgba(181,83,44,.13)', ac2: '#3f6b4f', pp: '#fcf9f1', pl: 'rgba(120,90,50,.30)', sh: '0 10px 30px rgba(80,60,20,.13)' },
    { bg: '#1b1712', sf: '#26211a', sf2: '#2f2921', ink: '#f1e9d9', mu: '#b0a28c', ln: 'rgba(255,240,210,.12)', ac: '#e0805a', aci: '#1b1712', acs: 'rgba(224,128,90,.2)', ac2: '#8fbf9c', pp: '#2b251d', pl: 'rgba(255,240,210,.16)', sh: '0 10px 30px rgba(0,0,0,.45)' }),
  minimal: T('Minimalism', 'Clean', 'Mostly white, one blue, nothing extra.', F.man, F.man, '12px', '8px',
    { bg: '#f3f4f7', sf: '#ffffff', sf2: '#eceef3', ink: '#15171c', mu: '#5f6575', ln: 'rgba(20,24,40,.1)', ac: '#2f5ef6', aci: '#fff', acs: 'rgba(47,94,246,.11)', ac2: '#0fa3a3', pp: '#ffffff', pl: 'rgba(60,80,140,.2)', sh: '0 12px 32px rgba(20,30,60,.09)' },
    DK('#6b8dff', '#0e1014', '#3fc9c9', { acs: 'rgba(107,141,255,.18)' })),
  pop: T('Pop', 'Bold', 'Hot pink, peach ground, rounder shapes.', F.bric, F.dm, '18px', '12px',
    { bg: '#fff0e4', sf: '#ffffff', sf2: '#ffe4d2', ink: '#1d1333', mu: '#665b7a', ln: 'rgba(29,19,51,.12)', ac: '#ff4d7d', aci: '#fff', acs: 'rgba(255,77,125,.14)', ac2: '#ffc933', pp: '#fffdf8', pl: 'rgba(120,80,160,.22)', sh: '0 14px 34px rgba(255,77,125,.15)' },
    { bg: '#150f26', sf: '#1e1636', sf2: '#281e47', ink: '#f5f0ff', mu: '#b0a3cc', ln: 'rgba(255,255,255,.1)', ac: '#ff6b95', aci: '#150f26', acs: 'rgba(255,107,149,.2)', ac2: '#ffd166', pp: '#221a3d', pl: 'rgba(255,255,255,.14)', sh: '0 14px 34px rgba(0,0,0,.5)' }),
  maximal: T('Maximalism', 'Bold', 'Layered color, big serif, generous shadows.', F.play, F.dm, '20px', '12px',
    { bg: '#fbe9dc', sf: '#fffaf3', sf2: '#fde2cf', ink: '#2b1a2e', mu: '#7a5c6e', ln: 'rgba(120,40,90,.16)', ac: '#c2185b', aci: '#fff', acs: 'rgba(194,24,91,.13)', ac2: '#f9a825', pp: '#fffdf8', pl: 'rgba(160,70,120,.22)', sh: '0 18px 44px rgba(194,24,91,.18)' },
    DK('#ff5c9a', '#1a0f18', '#ffc247', { bg: '#1a0f18', sf: '#26151f', sf2: '#321c2a', pp: '#2a1822', acs: 'rgba(255,92,154,.2)' }),
    { bgi: 'radial-gradient(at 15% 10%, rgba(255,214,165,.9), transparent 55%), radial-gradient(at 90% 20%, rgba(255,175,204,.8), transparent 50%), radial-gradient(at 60% 100%, rgba(191,232,255,.8), transparent 55%)' }),
  glass: T('Glassmorphism', 'Clean', 'Frosted panels over a soft gradient.', F.man, F.man, '16px', '12px',
    { bg: '#dfe6f7', sf: 'rgba(255,255,255,.62)', sf2: 'rgba(255,255,255,.42)', ink: '#171a2b', mu: '#5c6280', ln: 'rgba(255,255,255,.7)', ac: '#5b6cff', aci: '#fff', acs: 'rgba(91,108,255,.14)', ac2: '#ff8fb1', pp: 'rgba(255,255,255,.9)', pl: 'rgba(80,90,160,.22)', sh: '0 14px 40px rgba(60,70,140,.16)' },
    DK('#8c9bff', '#0f1220', '#ff9fc0', { bg: '#161a2e', sf: 'rgba(30,34,60,.6)', sf2: 'rgba(40,46,80,.55)', ln: 'rgba(255,255,255,.14)', pp: 'rgba(28,32,54,.9)', acs: 'rgba(140,155,255,.18)' }),
    { glass: 'blur(18px) saturate(1.3)', bgi: 'radial-gradient(at 20% 15%, #c9d6ff, transparent 50%), radial-gradient(at 80% 25%, #ffd6e0, transparent 50%), radial-gradient(at 50% 95%, #c8fff4, transparent 50%)' }),
  neumorph: T('Neumorphism', 'Soft', 'One surface color, shapes pressed out of it.', F.nun, F.nun, '18px', '14px',
    { bg: '#e6e9f0', sf: '#e6e9f0', sf2: '#dde1ea', ink: '#2c3140', mu: '#6b7285', ln: 'rgba(163,177,198,.25)', ac: '#5a67d8', aci: '#fff', acs: 'rgba(90,103,216,.14)', ac2: '#f6ad55', pp: '#eef0f5', pl: 'rgba(90,100,130,.2)', sh: '8px 8px 18px rgba(163,177,198,.55), -8px -8px 18px rgba(255,255,255,.95)' },
    DK('#8b95ff', '#1e2230', '#f6ad55', { bg: '#232733', sf: '#232733', sf2: '#1d212b', ln: 'rgba(255,255,255,.05)', pp: '#2a2f3d', sh: '8px 8px 18px rgba(0,0,0,.45), -8px -8px 18px rgba(255,255,255,.05)', acs: 'rgba(139,149,255,.18)' }),
    { bw: '0px' }),
  clay: T('Claymorphism', 'Soft', 'Puffy, rounded, playful depth.', F.nun, F.nun, '26px', '18px',
    { bg: '#f1edff', sf: '#ffffff', sf2: '#e9e2ff', ink: '#2a2150', mu: '#6f6790', ln: 'rgba(120,100,200,.14)', ac: '#7c5cff', aci: '#fff', acs: 'rgba(124,92,255,.14)', ac2: '#ffb86b', pp: '#fffdfa', pl: 'rgba(120,100,200,.2)', sh: '0 12px 0 rgba(120,100,200,.16), inset 0 -8px 14px rgba(120,100,200,.08), inset 0 6px 10px rgba(255,255,255,.9)' },
    DK('#a48cff', '#17122c', '#ffc27a', { bg: '#17122c', sf: '#221b3f', sf2: '#2c2452', pp: '#241d44', sh: '0 12px 0 rgba(0,0,0,.4), inset 0 -8px 14px rgba(0,0,0,.25), inset 0 6px 10px rgba(255,255,255,.06)', acs: 'rgba(164,140,255,.2)' }),
    { bw: '0px' }),
  brutal: T('Brutalism', 'Raw', 'Black rules, no radius, system honesty.', F.arch, F.space, '0px', '0px',
    { bg: '#ffffff', sf: '#ffffff', sf2: '#f2f2f2', ink: '#000000', mu: '#444444', ln: '#000000', ac: '#0000ff', aci: '#fff', acs: 'rgba(0,0,255,.08)', ac2: '#ff0000', pp: '#ffffff', pl: 'rgba(0,0,0,.35)', sh: 'none' },
    DK('#6b6bff', '#000', '#ff4d4d', { bg: '#000', sf: '#000', sf2: '#151515', ln: '#ffffff', pp: '#0a0a0a', sh: 'none', acs: 'rgba(107,107,255,.18)' }),
    { bw: '2px' }),
  neobrutal: T('Neo-Brutalism', 'Raw', 'Pastels, thick outlines, hard offset shadows.', F.space, F.space, '10px', '8px',
    { bg: '#fff7d6', sf: '#ffffff', sf2: '#ffe9a8', ink: '#111111', mu: '#4a4a4a', ln: '#111111', ac: '#ff6b6b', aci: '#111', acs: 'rgba(255,107,107,.18)', ac2: '#4ecdc4', pp: '#fffdf5', pl: 'rgba(0,0,0,.3)', sh: '4px 4px 0 #111111' },
    DK('#ff8080', '#111', '#5fe0d6', { bg: '#1c1a12', sf: '#26231a', sf2: '#332e1e', ln: '#f3f3f3', pp: '#2a2718', sh: '4px 4px 0 #f3f3f3', acs: 'rgba(255,128,128,.2)' }),
    { bw: '2px' }),
  skeuo: T('Skeuomorphism', 'Warm', 'Leather desk, paper sheets, stitched edges.', F.news, F.karla, '8px', '6px',
    { bg: '#cdb894', sf: '#f6eedb', sf2: '#eadfc6', ink: '#3b2f1e', mu: '#7a6a52', ln: 'rgba(90,60,20,.28)', ac: '#8b4513', aci: '#fff', acs: 'rgba(139,69,19,.14)', ac2: '#6b8e23', pp: '#fbf6e7', pl: 'rgba(120,90,50,.3)', sh: '0 2px 4px rgba(60,40,10,.35), inset 0 1px 0 rgba(255,255,255,.7)' },
    DK('#d9975a', '#221a10', '#9cbf4e', { bg: '#3a2c1c', sf: '#4a3a26', sf2: '#5a4830', ink: '#f3e8d2', mu: '#c2ad8a', ln: 'rgba(255,230,190,.2)', pp: '#5a4a32', pl: 'rgba(255,230,190,.16)', sh: '0 2px 4px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08)', acs: 'rgba(217,151,90,.2)' }),
    { bgi: 'repeating-linear-gradient(45deg, rgba(0,0,0,.025) 0 2px, transparent 2px 6px)' }),
  flat: T('Flat', 'Clean', 'Solid colors, no shadows, crisp edges.', F.dm, F.dm, '6px', '4px',
    { bg: '#f4f6f8', sf: '#ffffff', sf2: '#e9edf1', ink: '#1f2933', mu: '#616e7c', ln: 'rgba(31,41,51,.12)', ac: '#16a085', aci: '#fff', acs: 'rgba(22,160,133,.14)', ac2: '#f39c12', pp: '#ffffff', pl: 'rgba(31,41,51,.14)', sh: 'none' },
    DK('#2ecc9a', '#0f1a17', '#f5b041', { bg: '#12191c', sf: '#182126', sf2: '#212c32', pp: '#1c262b', sh: 'none', acs: 'rgba(46,204,154,.18)' })),
  material: T('Material', 'Clean', 'Tonal surfaces, pill buttons, layered elevation.', F.rubik, F.rubik, '16px', '20px',
    { bg: '#fef7ff', sf: '#ffffff', sf2: '#f3edf7', ink: '#1d1b20', mu: '#49454f', ln: 'rgba(121,116,126,.3)', ac: '#6750a4', aci: '#fff', acs: '#eaddff', ac2: '#7d5260', pp: '#fffbfe', pl: 'rgba(103,80,164,.2)', sh: '0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15)' },
    DK('#d0bcff', '#381e72', '#efb8c8', { bg: '#141218', sf: '#1d1b20', sf2: '#2b2930', ink: '#e6e0e9', mu: '#cac4d0', ln: 'rgba(147,143,153,.35)', pp: '#211f26', acs: 'rgba(208,188,255,.16)' })),
  bento: T('Bento UI', 'Clean', 'Tiles in a grid, one graphite accent.', F.man, F.man, '22px', '14px',
    { bg: '#ececf1', sf: '#ffffff', sf2: '#f4f4f7', ink: '#111114', mu: '#6a6a75', ln: 'rgba(0,0,0,.06)', ac: '#111114', aci: '#fff', acs: 'rgba(17,17,20,.08)', ac2: '#ff7a00', pp: '#ffffff', pl: 'rgba(0,0,0,.14)', sh: '0 1px 2px rgba(0,0,0,.04), 0 12px 28px rgba(0,0,0,.06)' },
    DK('#f2f2f5', '#111114', '#ff9a3d', { bg: '#0f0f12', sf: '#19191e', sf2: '#222229', ln: 'rgba(255,255,255,.06)', pp: '#1d1d23', acs: 'rgba(242,242,245,.1)' })),
  y2k: T('Y2K', 'Bold', 'Chrome gradients, bubble shapes, cyan on lilac.', F.syne, F.dm, '24px', '16px',
    { bg: '#e6ecff', sf: 'rgba(255,255,255,.78)', sf2: 'rgba(255,255,255,.55)', ink: '#241a4a', mu: '#6c5f96', ln: 'rgba(120,80,200,.3)', ac: '#7b2cff', aci: '#fff', acs: 'rgba(123,44,255,.14)', ac2: '#00e0c6', pp: 'rgba(255,255,255,.92)', pl: 'rgba(120,80,200,.22)', sh: '0 10px 28px rgba(120,80,200,.28), inset 0 1px 0 #ffffff' },
    DK('#b58cff', '#160f2e', '#3ffde6', { bg: '#160f2e', sf: 'rgba(40,28,80,.7)', sf2: 'rgba(60,44,110,.6)', ln: 'rgba(200,170,255,.25)', pp: 'rgba(36,26,70,.92)', acs: 'rgba(181,140,255,.2)' }),
    { glass: 'blur(12px)', bgi: 'linear-gradient(135deg, #dfe9ff 0%, #ffd1f7 55%, #c8fff4 100%)' }),
  retro: T('Retro', 'Warm', 'Seventies cream, burnt orange, mono details.', F.arch, F.mono, '4px', '3px',
    { bg: '#f4e9d8', sf: '#fbf3e6', sf2: '#efe1cb', ink: '#2e2a25', mu: '#6e6257', ln: 'rgba(80,60,40,.25)', ac: '#d4572a', aci: '#fff', acs: 'rgba(212,87,42,.14)', ac2: '#e8b04b', pp: '#fdf6e9', pl: 'rgba(80,60,40,.25)', sh: '0 2px 0 rgba(46,42,37,.25)' },
    DK('#ff7a45', '#1e1a16', '#f0be5a', { bg: '#1e1a16', sf: '#28231d', sf2: '#332c24', ink: '#f2e8d8', mu: '#b3a48f', pp: '#2c261f', sh: '0 2px 0 rgba(0,0,0,.6)', acs: 'rgba(255,122,69,.2)' })),
  cyber: T('Cyberpunk', 'Bold', 'Neon cyan and magenta on near-black.', F.space, F.mono, '4px', '3px',
    { bg: '#e8fbff', sf: '#ffffff', sf2: '#d8f6fb', ink: '#0b1a22', mu: '#3f6b78', ln: 'rgba(0,160,190,.35)', ac: '#00b3c6', aci: '#fff', acs: 'rgba(0,179,198,.14)', ac2: '#e600b8', pp: '#ffffff', pl: 'rgba(0,160,190,.2)', sh: '0 0 0 1px rgba(0,179,198,.25), 0 8px 24px rgba(0,179,198,.18)' },
    { bg: '#0b0f1a', sf: '#111827', sf2: '#1a2236', ink: '#e6fbff', mu: '#7fd0e0', ln: 'rgba(0,240,255,.35)', ac: '#00f0ff', aci: '#0b0f1a', acs: 'rgba(0,240,255,.14)', ac2: '#ff2bd6', pp: '#0f1524', pl: 'rgba(0,240,255,.15)', sh: '0 0 0 1px rgba(0,240,255,.3), 0 0 28px rgba(0,240,255,.2)' }),
  editorial: T('Editorial', 'Raw', 'Typography-led, hairlines, one red.', F.play, F.karla, '0px', '0px',
    { bg: '#ffffff', sf: '#ffffff', sf2: '#f5f4f0', ink: '#111111', mu: '#5c5c5c', ln: 'rgba(0,0,0,.35)', ac: '#111111', aci: '#fff', acs: 'rgba(0,0,0,.07)', ac2: '#c8102e', pp: '#ffffff', pl: 'rgba(0,0,0,.2)', sh: 'none' },
    DK('#f2f2f2', '#111', '#ff4d5e', { bg: '#111', sf: '#111', sf2: '#1c1c1c', ln: 'rgba(255,255,255,.4)', pp: '#141414', sh: 'none', acs: 'rgba(255,255,255,.08)' }))
};
// Per-look "feel" tokens: button borders/shadows, card shadows, chip shape, casing, heading weight/style/scale, glossy fills, pressed insets, ground pattern.
const FEEL = {
  paper: { bgi: 'radial-gradient(rgba(70,50,20,.06) 1px, transparent 1.2px)', bgsz: '7px 7px', cardSh: '0 1px 0 rgba(70,50,20,.06)' },
  pop: { hw: '700', btnSh: '0 5px 0 rgba(29,19,51,.14)', cardSh: '0 6px 18px rgba(255,77,125,.08)' },
  maximal: { hw: '700', hst: 'italic', hs: '1.15', cardSh: '0 18px 44px rgba(194,24,91,.12)', btnBgi: 'linear-gradient(135deg, rgba(255,255,255,.28), transparent 60%)', btnSh: '0 10px 24px rgba(194,24,91,.25)' },
  glass: { cardSh: '0 8px 30px rgba(60,70,140,.12), inset 0 1px 0 rgba(255,255,255,.7)', btnBgi: 'linear-gradient(180deg, rgba(255,255,255,.35), transparent)', btnSh: '0 8px 24px rgba(91,108,255,.25)' },
  neumorph: { hw: '800', btnSh: '6px 6px 12px rgba(163,177,198,.55), -6px -6px 12px rgba(255,255,255,.9)', cardSh: '8px 8px 18px rgba(163,177,198,.5), -8px -8px 18px rgba(255,255,255,.95)', inset: 'inset 4px 4px 8px rgba(163,177,198,.45), inset -4px -4px 8px rgba(255,255,255,.9)', pill: '14px' },
  clay: { hw: '800', btnSh: '0 8px 0 rgba(120,100,200,.25), inset 0 -6px 10px rgba(0,0,0,.08), inset 0 4px 6px rgba(255,255,255,.35)', cardSh: '0 12px 0 rgba(120,100,200,.14), inset 0 -8px 14px rgba(120,100,200,.08), inset 0 6px 10px rgba(255,255,255,.9)' },
  brutal: { btnB: '2px solid var(--ln)', pill: '0px', tf: 'uppercase', ls: '.05em', hw: '900', hs: '1.1' },
  neobrutal: { btnB: '2px solid var(--ln)', btnSh: '4px 4px 0 var(--ln)', cardSh: '4px 4px 0 var(--ln)', pill: '8px', hw: '800', bgi: 'radial-gradient(rgba(17,17,17,.18) 1px, transparent 1.3px)', bgsz: '22px 22px' },
  skeuo: { btnB: '1px solid rgba(60,40,10,.45)', btnBgi: 'linear-gradient(180deg, rgba(255,255,255,.3), rgba(0,0,0,.1))', btnSh: '0 1px 2px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.45)', cardSh: '0 2px 4px rgba(60,40,10,.3), inset 0 1px 0 rgba(255,255,255,.7)', inset: 'inset 0 2px 4px rgba(0,0,0,.18)' },
  flat: { pill: '4px' },
  material: { pill: '20px', hw: '500', cardSh: '0 1px 2px rgba(0,0,0,.08)' },
  bento: { hw: '800', cardSh: '0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)' },
  y2k: { hw: '800', btnBgi: 'linear-gradient(180deg, rgba(255,255,255,.6), rgba(255,255,255,0) 55%, rgba(0,0,0,.08))', btnSh: '0 6px 18px rgba(120,80,200,.3), inset 0 1px 0 #fff', cardSh: '0 10px 28px rgba(120,80,200,.18), inset 0 1px 0 #fff' },
  retro: { btnB: '2px solid var(--ink)', btnSh: '3px 3px 0 var(--ink)', cardSh: '3px 3px 0 rgba(46,42,37,.25)', pill: '4px', tf: 'uppercase', ls: '.06em', hw: '900', bgi: 'repeating-linear-gradient(0deg, rgba(46,42,37,.05) 0 1px, transparent 1px 12px)' },
  cyber: { btnB: '1px solid var(--ac)', btnSh: '0 0 14px rgba(0,240,255,.35)', cardSh: '0 0 0 1px var(--ln)', pill: '2px', tf: 'uppercase', ls: '.08em', hw: '700', bgi: 'linear-gradient(rgba(0,200,230,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,230,.07) 1px, transparent 1px)', bgsz: '32px 32px' },
  editorial: { btnB: '1px solid var(--ink)', pill: '0px', tf: 'uppercase', ls: '.08em', hw: '700', hs: '1.12' }
};
for (const k in FEEL) Object.assign(THEMES[k], FEEL[k]);
export const THEME_KEYS = Object.keys(THEMES);
// Wallpaper presets: CSS background-image values. Uploads become url(data:) at runtime.
export const WALLS = [
  { key: 'aurora', name: 'Aurora', css: 'radial-gradient(at 20% 20%, #a8c0ff, transparent 55%), radial-gradient(at 80% 30%, #ffc3a0, transparent 55%), radial-gradient(at 50% 95%, #c2ffd8, transparent 55%), linear-gradient(#f5f7fb, #e9edf7)' },
  { key: 'dusk', name: 'Dusk', css: 'linear-gradient(160deg, #2b1055 0%, #7597de 100%)' },
  { key: 'inkwash', name: 'Ink wash', css: 'radial-gradient(at 30% 30%, #6b7280, transparent 60%), radial-gradient(at 80% 80%, #111827, transparent 60%), linear-gradient(#374151, #1f2937)' },
  { key: 'sand', name: 'Sand', css: 'radial-gradient(at 70% 20%, #ffe8c2, transparent 55%), linear-gradient(180deg, #f6e7cf, #e2c9a3)' },
  { key: 'meadow', name: 'Meadow', css: 'radial-gradient(at 20% 80%, #b7f0c1, transparent 55%), radial-gradient(at 80% 20%, #fff2a8, transparent 55%), linear-gradient(#e9f7ec, #cfe9d6)' },
  { key: 'graphite', name: 'Graphite', css: 'repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 2px, transparent 2px 8px), linear-gradient(#2a2d34, #15171b)' }
];
export const PROFILES = [
  { id: 'riya', name: 'Riya', initials: 'R', color: '#2f6df6', role: 'Owner', note: 'B.Tech · Physics minor' },
  { id: 'aarav', name: 'Aarav', initials: 'A', color: '#7a3ec9', role: 'Sibling', note: 'Class 12 · JEE prep' },
  { id: 'work', name: 'Work', initials: 'W', color: '#2e8b57', role: 'Workspace', note: 'Internship notes' }
];

export function rnd(seed) { let s = (seed * 2654435761) >>> 0 || 7; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
export const f1 = v => String(Math.round(v * 10) / 10);

// Greeked cursive: a run of loopy letters per word, word gaps as pen lifts.
export function scribble(x0, y, len, seed, h) {
  const r = rnd(seed); let x = x0, d = '', minY = y, maxY = y; const xe = x0 + len;
  while (x < xe - 12) {
    const n = 2 + Math.floor(r() * 6); d += ' M' + f1(x) + ' ' + f1(y);
    for (let i = 0; i < n && x < xe; i++) {
      const w = 7 + r() * 6, k = r();
      const top = k < .2 ? y - h * 1.9 : k < .32 ? y - h * 1.45 : y - h * (.85 + r() * .3);
      const bot = k > .86 ? y + h * .85 : y + r() * 2;
      minY = Math.min(minY, top); maxY = Math.max(maxY, bot);
      d += ' C' + f1(x + w * .1) + ' ' + f1(top) + ' ' + f1(x + w * .55) + ' ' + f1(top) + ' ' + f1(x + w * .65) + ' ' + f1(y - h * .35) + ' S' + f1(x + w * .95) + ' ' + f1(bot) + ' ' + f1(x + w) + ' ' + f1(y);
      x += w;
    }
    x += 13 + r() * 6;
  }
  return { d: d.trim(), bb: [x0, minY - 2, Math.min(x, xe), maxY + 2] };
}
export function sine(x0, yc, len, amp, periods, sign, seed) {
  const r = rnd(seed); let d = '';
  for (let x = x0; x <= x0 + len; x += 6) { const y = yc - sign * amp * Math.sin(2 * Math.PI * periods * (x - x0) / len) + (r() - .5) * 1.2; d += (x === x0 ? 'M' : ' L') + f1(x) + ' ' + f1(y); }
  return d;
}
export function smooth(pts) {
  if (pts.length < 2) return 'M' + f1(pts[0][0]) + ' ' + f1(pts[0][1]) + ' l0.1 0';
  let d = 'M' + f1(pts[0][0]) + ' ' + f1(pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) d += ' Q' + f1(pts[i][0]) + ' ' + f1(pts[i][1]) + ' ' + f1((pts[i][0] + pts[i + 1][0]) / 2) + ' ' + f1((pts[i][1] + pts[i + 1][1]) / 2);
  const l = pts[pts.length - 1]; return d + ' L' + f1(l[0]) + ' ' + f1(l[1]);
}
export function bbox(pts) { const a = [1e9, 1e9, -1e9, -1e9]; pts.forEach(p => { a[0] = Math.min(a[0], p[0]); a[1] = Math.min(a[1], p[1]); a[2] = Math.max(a[2], p[0]); a[3] = Math.max(a[3], p[1]); }); return a; }
export function hit(s, x, y) {
  if (s.pts && s.kind !== 'shape') { const r = Math.max(10, s.w * 2); return s.pts.some(p => Math.abs(p[0] - x) < r && Math.abs(p[1] - y) < r); }
  const b = s.bb || bbox(s.pts || []); return x >= b[0] - 6 && x <= b[2] + 6 && y >= b[1] - 6 && y <= b[3] + 6;
}
let SID = 1;
export const mk = o => Object.assign({ id: 's' + (SID++), w: 2.2, op: 1, kind: 'pen', color: INK[0], t: null }, o);
export function lines(rows, seed, color, t0, dt, h) { return rows.map((r, i) => { const s = scribble(r[0], r[1], r[2], seed + i * 7, h || 11); return mk({ d: s.d, bb: s.bb, color: color || INK[0], t: t0 == null ? null : t0 + i * dt }); }); }
export function fmt(t) { t = Math.max(0, Math.floor(t)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }

export const PDF_BARS = (() => { const r = rnd(99), o = []; for (let i = 0; i < 22; i++) { o.push({ x: 70, y: 176 + i * 18, w: i % 6 === 5 ? 150 + r() * 60 : 300 + r() * 20 }); o.push({ x: 410, y: 176 + i * 18, w: i % 5 === 4 ? 140 + r() * 80 : 300 + r() * 20 }); } for (let i = 0; i < 22; i++) o.push({ x: 70, y: 600 + i * 18, w: i % 6 === 5 ? 180 : 300 + r() * 20 }); for (let i = 0; i < 8; i++) o.push({ x: 410, y: 836 + i * 18, w: i === 7 ? 160 : 300 + r() * 20 }); return o.map(b => ({ x: b.x, y: b.y, w: Math.round(b.w) })); })();
export const PDF_FIG = sine(430, 690, 280, 42, 1.5, 1, 77);

export function pdfPage(seed, name) {
  const s = [];
  [3, 4, 5].forEach(k => s.push(mk({ d: 'M70 ' + (180 + k * 18) + ' L380 ' + (179 + k * 18), color: HL[0], w: 16, op: .5, kind: 'hl', bb: [70, 172 + k * 18, 380, 188 + k * 18] })));
  s.push(mk({ d: 'M410 360 L700 359', color: HL[1], w: 16, op: .5, kind: 'hl', bb: [410, 352, 700, 368] }));
  s.push(mk({ d: 'M398 226 C390 244 390 262 398 280', color: INK[2], w: 2.4, bb: [388, 226, 400, 280] }));
  s.push(mk({ d: 'M416 786 C416 772 738 772 738 788 C738 804 416 804 416 786', color: INK[1], w: 2.4, bb: [416, 772, 738, 804] }));
  const sc = scribble(600, 578, 120, seed, 8); s.push(mk({ d: sc.d, bb: sc.bb, color: INK[2], w: 2 }));
  return { kind: 'pdf', paper: 'blank', tint: 'none', strokes: s, texts: [], pdfName: name };
}
export function paperPage(paper, seed, title) {
  const r = rnd(seed); const rows = []; const n = 6 + Math.floor(r() * 4);
  for (let i = 0; i < n; i++) rows.push([70, 142 + i * 36, 260 + r() * 360]);
  const s = lines(rows, seed, INK[0], null, 0);
  s[2] = Object.assign({}, s[2], { color: INK[1 + Math.floor(r() * 3)] });
  const k = Math.floor(r() * n), yy = 142 + 36 * k - 4;
  s.push(mk({ d: 'M62 ' + yy + ' L' + Math.round(60 + rows[k][2]) + ' ' + (yy - 2), color: HL[Math.floor(r() * HL.length)], w: 24, op: .5, kind: 'hl', bb: [62, yy - 14, 60 + rows[k][2], yy + 12] }));
  const texts = title ? [{ id: 'tt', x: 70, y: 96, text: title, size: 28, weight: 600, font: 'd', color: 'ink' }, { id: 'td', x: 70, y: 120, text: 'Handwritten · synced', size: 13, weight: 500, font: 'b', color: 'mu' }] : [];
  return { kind: 'paper', paper, tint: 'none', strokes: s, texts };
}
export function physicsPages() {
  const s1 = [];
  s1.push(...lines([[70, 142, 520], [70, 178, 600], [70, 214, 470], [70, 250, 590], [70, 286, 380], [70, 322, 560], [70, 358, 610], [70, 394, 300]], 3, INK[0], 18, 34));
  s1.push(mk({ d: 'M62 246 L676 244', color: HL[0], w: 26, op: .5, kind: 'hl', t: 150, bb: [62, 232, 676, 258] }));
  s1.push(mk({ d: 'M98 428 C200 424 320 426 430 424 L434 484 C330 488 200 486 96 490 Z', color: INK[1], w: 2.4, kind: 'shape', t: 305, bb: [96, 424, 434, 490] }));
  s1.push(mk({ d: 'M90 640 L712 640 M700 633 L713 640 L700 647', t: 340, bb: [90, 633, 713, 647] }));
  s1.push(mk({ d: sine(110, 640, 580, 62, 2, 1, 5), color: INK[1], w: 2.6, t: 356, bb: [110, 578, 690, 702] }));
  s1.push(mk({ d: sine(110, 640, 580, 62, 2, -1, 9), color: INK[1], w: 2.6, op: .55, t: 372, bb: [110, 578, 690, 702] }));
  for (let k = 0; k < 5; k++) { const cx = 110 + k * 145; s1.push(mk({ d: 'M' + (cx - 5) + ' 640 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0', color: INK[2], w: 2.4, t: 384 + k * 4, bb: [cx - 6, 634, cx + 6, 646] })); }
  s1.push(...lines([[130, 712, 70], [330, 712, 60], [560, 712, 90]], 21, INK[2], 400, 6, 8));
  s1.push(...lines([[70, 754, 540], [70, 790, 610], [70, 826, 450], [70, 862, 580], [70, 898, 300]], 31, INK[0], 420, 32));
  const t1 = [
    { id: 't1', x: 70, y: 96, text: 'Standing waves & harmonics', size: 30, weight: 600, font: 'd', color: 'ink' },
    { id: 't2', x: 70, y: 120, text: 'Tue 8 Sep · Lecture 12 · PHY-204', size: 13, weight: 500, font: 'b', color: 'mu' },
    { id: 't3', x: 118, y: 466, text: 'fₙ = n · v / 2L    (n = 1, 2, 3 …)', size: 21, weight: 500, font: 'd', color: INK[1], italic: true },
    { id: 't4', x: 560, y: 588, text: 'λ / 2', size: 15, weight: 500, font: 'd', color: INK[1], italic: true }
  ];
  const p3 = [];
  p3.push(mk({ d: 'M120 200 H420 V330 H120 Z', color: INK[1], w: 2.4, kind: 'shape', bb: [120, 200, 420, 330] }));
  p3.push(mk({ d: 'M420 265 L600 265 M588 257 L602 265 L588 273', bb: [420, 257, 602, 273] }));
  p3.push(mk({ d: 'M270 330 L270 470 M262 458 L270 472 L278 458', bb: [262, 330, 278, 472] }));
  p3.push(...lines([[140, 272, 240]], 51, INK[0], null, 0, 10));
  p3.push(...lines([[70, 540, 500], [70, 576, 600], [70, 612, 430], [70, 648, 560]], 61, INK[0], null, 0));
  p3.push(mk({ d: 'M62 572 L680 570', color: HL[2], w: 26, op: .5, kind: 'hl', bb: [62, 558, 680, 584] }));
  return [
    { kind: 'paper', paper: 'lined', tint: 'none', strokes: s1, texts: t1, audio: { dur: 504 } },
    pdfPage(7, 'chapter-14.pdf'),
    { kind: 'paper', paper: 'grid', tint: 'none', strokes: p3, texts: [{ id: 't5', x: 70, y: 96, text: 'Problem set 6 — sketching', size: 26, weight: 600, font: 'd', color: 'ink' }] }
  ];
}
export function makeDoc(nb) {
  if (nb.id === 'phys') return { pages: physicsPages() };
  if (nb.paper === 'pdf') return { pages: [pdfPage(nb.seed, 'thesis-ch3.pdf'), paperPage('lined', nb.seed + 1, 'Notes on chapter 3')] };
  return { pages: [paperPage(nb.paper, nb.seed, nb.title), paperPage(nb.paper, nb.seed + 5)] };
}

export const SUBJECTS = [{ name: 'Physics', color: '#2f6df6' }, { name: 'Mathematics', color: '#7a3ec9' }, { name: 'Chemistry', color: '#2e8b57' }, { name: 'Design', color: '#e07b1c' }, { name: 'Languages', color: '#d9488a' }, { name: 'Personal', color: '#6b7280' }];
export const NOTEBOOKS = [
  { id: 'phys', tags: ['lecture', 'quiz-2'], title: 'Physics II — Waves', subject: 'Physics', pages: 12, lastPage: 4, updated: '12 min ago', paper: 'lined', audio: true, pdf: true, shared: true, fav: true, seed: 3 },
  { id: 'calc', tags: ['problem sets'], title: 'Calculus — Integration', subject: 'Mathematics', pages: 31, lastPage: 31, updated: '2 h ago', paper: 'grid', audio: false, pdf: false, shared: false, fav: true, seed: 11 },
  { id: 'ochem', tags: ['lab', 'lecture'], title: 'Organic Chemistry', subject: 'Chemistry', pages: 18, lastPage: 9, updated: 'Yesterday', paper: 'lined', audio: true, pdf: true, shared: false, fav: false, seed: 17 },
  { id: 'thesis', tags: ['reading'], title: 'Thesis reading — Superposition', subject: 'Physics', pages: 46, lastPage: 12, updated: 'Yesterday', paper: 'pdf', audio: false, pdf: true, shared: true, fav: false, seed: 23 },
  { id: 'design', tags: ['essay'], title: 'Design History — Bauhaus', subject: 'Design', pages: 9, lastPage: 9, updated: 'Mon', paper: 'dot', audio: false, pdf: false, shared: false, fav: false, seed: 29 },
  { id: 'stats', tags: ['lab'], title: 'Statistics Lab', subject: 'Mathematics', pages: 14, lastPage: 3, updated: 'Sun', paper: 'grid', audio: false, pdf: true, shared: true, fav: false, seed: 37 },
  { id: 'esp', tags: ['vocab'], title: 'Spanish — Vocabulario', subject: 'Languages', pages: 22, lastPage: 22, updated: 'Last week', paper: 'lined', audio: true, pdf: false, shared: false, fav: false, seed: 41 },
  { id: 'plan', tags: ['personal'], title: 'Semester planner', subject: 'Personal', pages: 6, lastPage: 2, updated: 'Last week', paper: 'dot', audio: false, pdf: false, shared: false, fav: false, seed: 43 }
];
export const RESULTS = [
  { nb: 'Physics II — Waves', page: 4, type: 'Handwriting', text: 'A standing wave forms when two waves of the same frequency travel in opposite directions', when: '12 min ago', nbId: 'phys', pg: 0, ink: true, seed: 4 },
  { nb: 'Thesis reading — Superposition', page: 12, type: 'PDF text', text: '…the standing wave pattern has nodes where the displacement is always zero…', when: 'Yesterday', nbId: 'thesis', pg: 0, pdf: true },
  { nb: 'Physics II — Waves', page: 4, type: 'Audio · 04:12', text: '“…so the standing wave only exists at these resonant frequencies — remember that for the quiz…”', when: '12 min ago', nbId: 'phys', pg: 0, audio: true },
  { nb: 'Physics II — Waves', page: 4, type: 'Typed text', text: 'fₙ = n·v / 2L — standing wave harmonics on a string fixed at both ends', when: '12 min ago', nbId: 'phys', pg: 0, typed: true },
  { nb: 'Organic Chemistry', page: 9, type: 'Handwriting', text: 'Resonance structures — electrons delocalised across the ring (not a standing wave, but analogous)', when: 'Yesterday', nbId: 'ochem', pg: 0, ink: true, seed: 8 },
  { nb: 'Statistics Lab', page: 3, type: 'PDF text', text: 'Second wave of sampling: the standard error shrinks with √n', when: 'Sun', nbId: 'stats', pg: 0, pdf: true },
  { nb: 'Spanish — Vocabulario', page: 22, type: 'Handwriting', text: 'la ola — wave; la onda — wave (physics); ondular — to undulate', when: 'Last week', nbId: 'esp', pg: 0, ink: true, seed: 12 }
];
export const WAVE = (() => { const r = rnd(5); const o = []; for (let i = 0; i < 72; i++) o.push(6 + Math.round(r() * 22)); return o; })();
export const OB_INK = lines([[40, 90, 200], [40, 126, 240], [40, 162, 170], [40, 198, 230], [40, 234, 120]], 71, INK[0], null, 0, 10);
export const TPLS = [{ key: 'blank', name: 'Blank' }, { key: 'lined', name: 'Lined' }, { key: 'grid', name: 'Grid' }, { key: 'dot', name: 'Dotted' }, { key: 'cornell', name: 'Cornell' }, { key: 'music', name: 'Music staff' }, { key: 'planner', name: 'Weekly planner' }, { key: 'flash', name: 'Flashcards' }];
export const TINTS = [{ key: 'none', name: 'White', color: '#ffffff' }, { key: 'cream', name: 'Cream', color: '#f7ecd2' }, { key: 'yellow', name: 'Yellow', color: '#fff0a8' }, { key: 'gray', name: 'Gray', color: '#e6e8ee' }];
export const STUDY = ['Physics', 'Mathematics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Design', 'Law', 'Medicine', 'Languages', 'History', 'Engineering'];
export const S_TABS = ['Account & plan', 'Sync & backup', 'Handwriting & stylus', 'Appearance', 'Notifications', 'Privacy & export'];
export const THEME_CARDS = THEME_KEYS.map(k => ({ key: k, name: THEMES[k].name, desc: THEMES[k].desc, group: THEMES[k].group }));
