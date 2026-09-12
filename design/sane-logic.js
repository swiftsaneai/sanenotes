// Sane Notes — logic module: state, handlers, and the values the template renders.
import * as D from './sane-data.js';

const W = 800, H = 1040;
const IDLE = { status: 'idle', t: 0, speed: 1 };
const asg = Object.assign;

export function initialState(c) {
  const ss = c.props.startScreen || 'login';
  const screen = ['login', 'profiles', 'library', 'editor', 'search', 'settings'].includes(ss) ? ss : 'library';
  return {
    ready: true, screen, overlay: ss === 'onboarding' ? 'onboarding' : null, obStep: 0, study: ['Physics', 'Mathematics'],
    sideOpen: ss !== 'editor', dock: 'bottom', drag: null, dockHint: null, focus: false, firstRun: ss === 'login', loginStep: 'methods', phone: '', otp: '',
    profiles: D.PROFILES, profileId: 'riya', addingProfile: false, newProfile: '', askOpen: false, wall: loadWall(), tplStyle: 'pages',
    themeSel: null, darkSel: null, planSel: null,
    navItem: 'all', libFilter: 'All', libView: 'grid', nbs: D.NOTEBOOKS, nbId: 'phys', docs: { phys: D.makeDoc(D.NOTEBOOKS[0]) }, page: 0,
    tool: 'pen', penColor: D.INK[0], hlColor: D.HL[0], wIdx: 1, undo: [], redo: [], live: null, selection: null, editing: null,
    showThumbs: true, audioOpen: false, audio: IDLE,
    query: 'standing wave', sFilter: 'All', linkOn: true, perm: 'Can edit', invite: '',
    people: [{ name: 'Riya S. (you)', initials: 'RS', role: 'Owner', color: '#2f6df6' }, { name: 'Kabir Mehta', initials: 'KM', role: 'Can edit', color: '#7a3ec9' }, { name: 'Ananya Rao', initials: 'AR', role: 'Can comment', color: '#2e8b57' }],
    sTab: c.props.settingsTab || 'Account & plan', prefs: { autoSync: true, wifiOnly: false, palm: true, pressure: true, finger: false, leftHanded: false, reminders: true, sharedNotif: true, tips: false, onDevice: true },
    backup: 'SS Cloud', dblTap: 'Eraser', billing: 'yearly', tplSel: 'lined', tplTint: 'none', tplSize: 'Auto', tplMode: 'page', toast: null, importsUsed: 3
  };
}

// ---- helpers bound to the component instance ------------------------------
const themeKey = c => c.state.themeSel || c.props.theme || 'paper';
const isDark = c => c.state.darkSel != null ? c.state.darkSel : !!c.props.darkMode;
const planKey = c => c.state.planSel || c.props.plan || 'free';
const set = (c, u) => c.setState(u);
const rgba = (col, a) => { if (!col || col[0] !== '#' || col.length < 7) return col; const n = parseInt(col.slice(1, 7), 16); return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')'; };
const DEF_WALL = { src: null, preset: null, blur: 14, dim: 35, name: '' };
function loadWall() { try { const w = JSON.parse(localStorage.getItem('sane.wall') || 'null'); if (w && typeof w === 'object') return asg({}, DEF_WALL, w); } catch (_) { } return asg({}, DEF_WALL); }
function setWall(c, w) { set(c, { wall: w }); try { localStorage.setItem('sane.wall', JSON.stringify(w)); } catch (_) { } }

function applyTheme(c) {
  const el = c.rootRef.current; if (!el) return;
  const T = D.THEMES[themeKey(c)] || D.THEMES.paper, k = T[isDark(c) ? 'dark' : 'light'], wall = c.state.wall && c.state.wall.src;
  const v = { '--bg': wall ? 'transparent' : k.bg, '--bgs': k.bg, '--ovbg': wall ? rgba(k.bg, .8) : k.bg, '--sf': wall ? rgba(k.sf, .84) : k.sf, '--sf2': wall ? rgba(k.sf2, .7) : k.sf2, '--ink': k.ink, '--mu': k.mu, '--ln': k.ln, '--ac': k.ac, '--aci': k.aci, '--acs': k.acs, '--ac2': k.ac2, '--pp': k.pp, '--pl': k.pl, '--sh': k.sh, '--fd': T.fd, '--fb': T.fb, '--r': T.r, '--rs': T.rs, '--bw': T.bw, '--glass': wall ? 'blur(22px) saturate(1.25)' : T.glass, '--bgi': wall ? 'none' : T.bgi, '--bgsz': T.bgsz, '--btn-b': T.btnB, '--btn-sh': T.btnSh, '--card-sh': T.cardSh, '--pill': T.pill, '--tf': T.tf, '--ls': T.ls, '--hw': T.hw, '--hst': T.hst, '--hs': T.hs, '--btn-bgi': T.btnBgi, '--inset': T.inset };
  for (const key in v) el.style.setProperty(key, v[key]);
  el.style.colorScheme = isDark(c) ? 'dark' : 'light';
}
function notify(c, msg) { clearTimeout(c.toastT); set(c, { toast: msg }); c.toastT = setTimeout(() => set(c, { toast: null }), 2400); }
function getDoc(c, id) { const s = c.state; if (s.docs[id]) return s.docs[id]; c.docCache = c.docCache || {}; if (!c.docCache[id]) { const nb = s.nbs.find(n => n.id === id); if (!nb) return null; c.docCache[id] = D.makeDoc(nb); } return c.docCache[id]; }
const curDoc = c => getDoc(c, c.state.nbId);
const curPage = c => { const d = curDoc(c); return d ? d.pages[c.state.page] : null; };
function withDoc(s, fn) { const doc = s.docs[s.nbId]; if (!doc) return null; const pages = doc.pages.slice(); const extra = fn(pages, s) || {}; return asg({ docs: asg({}, s.docs, { [s.nbId]: asg({}, doc, { pages }) }) }, extra); }
function setPage(c, fn) { c.setState(s => withDoc(s, pages => { pages[s.page] = fn(pages[s.page]); })); }
function commit(c, fn) { c.setState(s => withDoc(s, pages => { const pg = pages[s.page]; pages[s.page] = asg({}, pg, { strokes: fn(pg.strokes) }); return { undo: s.undo.concat([{ page: s.page, strokes: pg.strokes }]).slice(-60), redo: [] }; })); }
function ptr(c, e) { const r = c.svgRef.current.getBoundingClientRect(); const pg = curPage(c); const w = pg && pg.kind === 'freeform' ? 2400 : W, hh = pg && pg.kind === 'freeform' ? 2400 : H; return [(e.clientX - r.left) * w / r.width, (e.clientY - r.top) * hh / r.height]; }
function eraseAt(c, x, y) { setPage(c, p => { const keep = p.strokes.filter(s => !D.hit(s, x, y)); return keep.length === p.strokes.length ? p : asg({}, p, { strokes: keep }); }); }
function selBox(c, ids) { const b = [1e9, 1e9, -1e9, -1e9]; curPage(c).strokes.filter(s => ids.includes(s.id)).forEach(s => { const sb = s.bb || D.bbox(s.pts); b[0] = Math.min(b[0], sb[0]); b[1] = Math.min(b[1], sb[1]); b[2] = Math.max(b[2], sb[2]); b[3] = Math.max(b[3], sb[3]); }); return b; }
function gotoPage(c, i) { c.setState(s => { const doc = s.docs[s.nbId]; return { page: Math.max(0, Math.min(i, doc.pages.length - 1)), selection: null, editing: null, live: null, audio: IDLE }; }); }
function openNb(c, id, pg) { const doc = getDoc(c, id); if (!doc) return; c.setState(s => ({ docs: s.docs[id] ? s.docs : asg({}, s.docs, { [id]: doc }), nbId: id, page: pg || 0, screen: 'editor', overlay: null, selection: null, editing: null, live: null, undo: [], redo: [], audio: IDLE, audioOpen: false, sideOpen: false, focus: false })); }
function tick(c) {
  const a = c.state.audio;
  if (a.status === 'rec') set(c, { audio: asg({}, a, { t: a.t + 0.25 }) });
  else if (a.status === 'play') { const pg = curPage(c); const dur = pg && pg.audio ? pg.audio.dur : 0; const t = a.t + 0.25 * a.speed; set(c, { audio: asg({}, a, t >= dur ? { t: dur, status: 'pause' } : { t }) }); }
}
function doImport(c, name) {
  const file = /\.pdf$/i.test(name) ? name : name === 'Scan with camera' ? 'scan-2026-09-08.pdf' : 'imported.pdf';
  const doc = curDoc(c); if (!doc) return;
  c.setState(s => { const id = s.nbId; const base = s.docs[id] || doc; const pages = base.pages.slice(); const idx = Math.min(s.page + 1, pages.length); pages.splice(idx, 0, D.pdfPage((Date.now() % 50) + 1, file)); return { docs: asg({}, s.docs, { [id]: asg({}, base, { pages }) }), page: idx, screen: 'editor', overlay: null, selection: null, importsUsed: s.importsUsed + 1, audio: IDLE, tool: 'hl' }; });
  notify(c, file + ' imported · highlighter ready');
}

export function attach(c) {
  c.timer = setInterval(() => { if (c.state.ready) tick(c); }, 250);
  const h = c.h = {};
  h.goLibrary = () => set(c, { screen: 'library', overlay: null, selection: null, editing: null, live: null, sideOpen: true, focus: false });
  h.toggleSide = () => c.setState(s => ({ sideOpen: !s.sideOpen }));
  h.toggleFocus = () => c.setState(s => ({ focus: !s.focus }));
  h.toggleBookmark = () => { const pg = curPage(c); setPage(c, p => asg({}, p, { bookmarked: !p.bookmarked })); notify(c, pg && pg.bookmarked ? 'Bookmark removed' : 'Page bookmarked'); };
  h.toggleAsk = () => c.setState(s => ({ askOpen: !s.askOpen }));
  h.gripDown = e => {
    e.preventDefault(); const main = c.mainRef.current; if (!main) return; const r = main.getBoundingClientRect();
    const upd = ev => { const x = ev.clientX - r.left, y = ev.clientY - r.top; const d = { left: x, right: r.width - x, top: y, bottom: r.height - y }; const hint = Object.keys(d).sort((p, q) => d[p] - d[q])[0]; set(c, { drag: { x, y }, dockHint: hint }); };
    upd(e); const mv = ev => upd(ev); const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); c.setState(s => ({ dock: s.dockHint || s.dock, drag: null, dockHint: null })); };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
  };
  h.loginGoogle = () => { set(c, { screen: 'profiles' }); notify(c, 'Signed in with Google'); };
  h.loginApple = () => { set(c, { screen: 'profiles' }); notify(c, 'Signed in with Apple'); };
  h.loginMicrosoft = () => { set(c, { screen: 'profiles' }); notify(c, 'Signed in with Microsoft'); };
  h.loginPhone = () => set(c, { loginStep: 'phone' });
  h.backToMethods = () => set(c, { loginStep: 'methods', otp: '' });
  h.setPhone = e => set(c, { phone: e.target.value.replace(/[^\d ]/g, '').slice(0, 11) });
  h.sendCode = () => { if (c.state.phone.replace(/\D/g, '').length < 10) { notify(c, 'Enter a 10-digit mobile number'); return; } set(c, { loginStep: 'otp' }); notify(c, 'Code sent to +91 ' + c.state.phone); };
  h.setOtp = e => set(c, { otp: e.target.value.replace(/\D/g, '').slice(0, 6) });
  h.verifyOtp = () => { if (c.state.otp.length < 6) { notify(c, 'Enter the 6-digit code'); return; } set(c, { screen: 'profiles', loginStep: 'methods', otp: '' }); };
  h.goProfiles = () => set(c, { screen: 'profiles', overlay: null });
  h.signOut = () => set(c, { screen: 'login', overlay: null, loginStep: 'methods', sideOpen: true });
  h.startAddProfile = () => set(c, { addingProfile: true, newProfile: '' });
  h.cancelAddProfile = () => set(c, { addingProfile: false });
  h.setNewProfile = e => set(c, { newProfile: e.target.value.slice(0, 24) });
  h.addProfile = () => { const n = c.state.newProfile.trim(); if (!n) return; const colors = ['#e07b1c', '#d9488a', '#0fa3a3', '#7a3ec9', '#2f6df6']; const p = { id: 'p' + Date.now(), name: n, initials: n[0].toUpperCase(), color: colors[c.state.profiles.length % colors.length], role: 'Member', note: 'New profile' }; c.setState(s => ({ profiles: s.profiles.concat([p]), addingProfile: false, newProfile: '' })); notify(c, 'Profile added — ' + n); };
  h.pickWallFile = () => { const el = c.wallInputRef && c.wallInputRef.current; if (el) el.click(); };
  h.onWallFile = e => {
    const f = e.target.files && e.target.files[0]; if (!f) return; const url = URL.createObjectURL(f); const img = new Image();
    img.onload = () => { const k = Math.min(1, 1600 / Math.max(img.width, img.height)); const cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k); cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url); setWall(c, asg({}, c.state.wall, { src: 'url(' + cv.toDataURL('image/jpeg', .82) + ')', preset: null, name: f.name })); notify(c, 'Wallpaper set — ' + f.name); };
    img.src = url; e.target.value = '';
  };
  h.clearWall = () => setWall(c, asg({}, DEF_WALL));
  h.setBlur = e => setWall(c, asg({}, c.state.wall, { blur: +e.target.value }));
  h.setDim = e => setWall(c, asg({}, c.state.wall, { dim: +e.target.value }));
  h.pickWall = key => { const w = D.WALLS.find(x => x.key === key); if (w) setWall(c, asg({}, c.state.wall, { src: w.css, preset: key, name: w.name, blur: 0 })); };
  h.pickProfile = id => c.setState(s => ({ profileId: id, screen: 'library', overlay: s.firstRun ? 'onboarding' : null, firstRun: false, obStep: 0, sideOpen: true }));
  h.goSearch = () => set(c, { screen: 'search', overlay: null });
  h.openUpgrade = () => set(c, { overlay: 'upgrade' });
  h.openShare = () => set(c, { overlay: 'share' });
  h.openImport = () => { if (planKey(c) === 'free' && c.state.importsUsed >= 5) { set(c, { overlay: 'upgrade' }); notify(c, 'Free plan: 5 PDF imports a month'); return; } set(c, { overlay: 'import' }); };
  h.openTemplatesPage = () => { const pg = curPage(c); set(c, { overlay: 'templates', tplMode: 'page', tplStyle: pg && pg.kind === 'freeform' ? 'freeform' : 'pages', tplSel: pg && pg.kind === 'paper' ? pg.paper : 'lined', tplTint: (pg && pg.tint) || 'none' }); };
  h.newNotebook = () => set(c, { overlay: 'templates', tplMode: 'new', tplStyle: 'pages', tplSel: 'lined', tplTint: 'none' });
  h.closeOverlay = () => c.setState(s => s.overlay === 'onboarding' ? null : { overlay: null });
  h.stop = e => e.stopPropagation();
  h.toggleThumbs = () => c.setState(s => ({ showThumbs: !s.showThumbs }));
  h.setGrid = () => set(c, { libView: 'grid' }); h.setList = () => set(c, { libView: 'list' });
  h.setQuery = e => set(c, { query: e.target.value }); h.clearQuery = () => set(c, { query: '' });
  h.toggleDark = () => set(c, { darkSel: !isDark(c) });
  h.toggleLink = () => c.setState(s => ({ linkOn: !s.linkOn }));
  h.copyLink = () => notify(c, 'Link copied — anyone with it ' + c.state.perm.toLowerCase().replace('can ', 'can '));
  h.setInvite = e => set(c, { invite: e.target.value });
  h.sendInvite = () => { const v = c.state.invite.trim(); if (!v) return; if (planKey(c) === 'free' && c.state.people.length >= 3) { set(c, { overlay: 'upgrade' }); notify(c, 'Free plan: up to 3 people per notebook'); return; } const name = v.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase()); const ini = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(); c.setState(s => ({ people: s.people.concat([{ name, initials: ini, role: s.perm, color: '#e07b1c' }]), invite: '' })); notify(c, 'Invite sent to ' + v); };
  h.exportPdf = () => notify(c, 'Exporting PDF with ink & highlights…'); h.exportImg = () => notify(c, 'Exporting this page as PNG…'); h.exportFile = () => notify(c, 'Exporting .sane — keeps audio sync');
  h.exportAll = () => notify(c, 'Preparing a ZIP of every notebook (PDF + .sane)…');
  h.manageSub = () => notify(c, 'Opens your app-store subscription');
  h.startTrial = () => { set(c, { planSel: 'pro', overlay: null }); notify(c, 'Pro trial started — 14 days free'); };
  h.setMonthly = () => set(c, { billing: 'monthly' }); h.setYearly = () => set(c, { billing: 'yearly' });
  h.obNext = () => c.setState(s => s.obStep < 2 ? { obStep: s.obStep + 1 } : { overlay: null, obStep: 0, screen: 'library' });
  h.obSkip = () => set(c, { overlay: null, obStep: 0 });
  h.replayOnboarding = () => set(c, { overlay: 'onboarding', obStep: 0 });
  h.applyTemplate = () => {
    const st = c.state, free = st.tplStyle === 'freeform', paper = free ? 'freeform' : st.tplSel, kind = free ? 'freeform' : 'paper';
    if (st.tplMode === 'new') {
      const id = 'nb' + Date.now(); const nb = { id, title: free ? 'Untitled canvas' : 'Untitled notebook', subject: st.libFilter !== 'All' ? st.libFilter : 'Personal', pages: 1, lastPage: 1, updated: 'Just now', paper, audio: false, pdf: false, shared: false, fav: false, seed: 1 };
      const doc = { pages: [{ kind, paper, tint: st.tplTint, strokes: [], texts: [] }] };
      c.setState(s => ({ nbs: [nb].concat(s.nbs), docs: asg({}, s.docs, { [id]: doc }), nbId: id, page: 0, screen: 'editor', overlay: null, undo: [], redo: [], selection: null, audio: IDLE, audioOpen: false, sideOpen: false }));
      notify(c, free ? 'Freeform canvas — it grows as you write' : 'New notebook — start writing');
    } else { setPage(c, p => asg({}, p, p.kind === 'pdf' ? { tint: st.tplTint } : { paper, kind, tint: st.tplTint })); set(c, { overlay: null }); }
  };
  // editor
  h.undoFn = () => c.setState(s => { if (!s.undo.length) return null; const u = s.undo[s.undo.length - 1]; return withDoc(s, pages => { const cur = pages[u.page].strokes; pages[u.page] = asg({}, pages[u.page], { strokes: u.strokes }); return { undo: s.undo.slice(0, -1), redo: s.redo.concat([{ page: u.page, strokes: cur }]), page: u.page, selection: null }; }); });
  h.redoFn = () => c.setState(s => { if (!s.redo.length) return null; const u = s.redo[s.redo.length - 1]; return withDoc(s, pages => { const cur = pages[u.page].strokes; pages[u.page] = asg({}, pages[u.page], { strokes: u.strokes }); return { redo: s.redo.slice(0, -1), undo: s.undo.concat([{ page: u.page, strokes: cur }]), page: u.page, selection: null }; }); });
  h.addPage = () => c.setState(s => withDoc(s, pages => { const cur = pages[s.page]; pages.push({ kind: 'paper', paper: cur.kind === 'pdf' ? 'lined' : cur.paper, tint: cur.tint || 'none', strokes: [], texts: [] }); return { page: pages.length - 1, selection: null, editing: null, audio: IDLE }; }));
  h.prevPage = () => gotoPage(c, c.state.page - 1); h.nextPage = () => gotoPage(c, c.state.page + 1);
  h.deleteSel = () => { const sel = c.state.selection; if (!sel) return; commit(c, arr => arr.filter(s => !sel.ids.includes(s.id))); set(c, { selection: null }); notify(c, 'Deleted ' + sel.ids.length + (sel.ids.length === 1 ? ' stroke' : ' strokes')); };
  h.convertSel = () => { const sel = c.state.selection; if (!sel) return; if (planKey(c) === 'free') { set(c, { overlay: 'upgrade' }); return; } const b = sel.bb; commit(c, arr => arr.filter(s => !sel.ids.includes(s.id))); setPage(c, p => asg({}, p, { texts: p.texts.concat([{ id: 'tx' + Date.now(), x: b[0], y: b[1] + 20, text: 'Standing wave: two waves, same frequency, opposite directions', size: 17, weight: 500, font: 'b', color: 'ink' }]) })); set(c, { selection: null }); notify(c, 'Handwriting converted to text'); };
  h.solveSel = () => { const sel = c.state.selection; if (!sel) return; if (planKey(c) === 'free') { set(c, { overlay: 'upgrade' }); return; } const b = sel.bb; setPage(c, p => asg({}, p, { texts: p.texts.concat([{ id: 'tx' + Date.now(), x: b[0], y: b[3] + 26, text: 'f₂ = 2 · v / 2L = v / L  →  with v = 340 m/s, L = 0.77 m: f₂ ≈ 442 Hz', size: 16, weight: 500, font: 'b', color: '#2457c5' }]) })); set(c, { selection: null }); notify(c, 'Solved — steps written under your ink'); };
  h.setEditText = e => { const id = c.state.editing, v = e.target.value; setPage(c, p => asg({}, p, { texts: p.texts.map(t => t.id === id ? asg({}, t, { text: v }) : t) })); };
  h.doneText = () => { const id = c.state.editing; setPage(c, p => asg({}, p, { texts: p.texts.filter(t => t.id !== id || t.text.trim()) })); set(c, { editing: null, tool: 'pen' }); };
  h.onDown = e => {
    if (e.button > 0) return; const [x, y] = ptr(c, e); const st = c.state, tool = st.tool;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) { }
    if (st.selection) set(c, { selection: null });
    if (tool === 'text') { const id = 'tx' + Date.now(); setPage(c, p => asg({}, p, { texts: p.texts.concat([{ id, x, y, text: '', size: 18, weight: 500, font: 'b', color: st.penColor }]) })); set(c, { editing: id }); return; }
    if (tool === 'image') { set(c, { overlay: 'import' }); return; }
    if (tool === 'eraser') { c.setState(s => ({ undo: s.undo.concat([{ page: s.page, strokes: s.docs[s.nbId].pages[s.page].strokes }]).slice(-60), redo: [], live: { kind: 'erase' } })); eraseAt(c, x, y); return; }
    set(c, { live: { kind: tool, pts: [[x, y]] } });
  };
  h.onMove = e => { const live = c.state.live; if (!live) return; const [x, y] = ptr(c, e); if (live.kind === 'erase') { eraseAt(c, x, y); return; } const l = live.pts[live.pts.length - 1]; if (Math.abs(l[0] - x) + Math.abs(l[1] - y) < 1.2) return; set(c, { live: asg({}, live, { pts: live.pts.concat([[x, y]]) }) }); };
  h.onUp = () => {
    const live = c.state.live; if (!live) return;
    if (live.kind === 'erase') { set(c, { live: null }); return; }
    const st = c.state, pts = live.pts, bb = D.bbox(pts);
    if (live.kind === 'lasso') { const ids = curPage(c).strokes.filter(s => { const b = s.bb || D.bbox(s.pts || [[0, 0]]); const cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2; return cx >= bb[0] && cx <= bb[2] && cy >= bb[1] && cy <= bb[3]; }).map(s => s.id); set(c, { live: null, selection: ids.length ? { ids, bb: selBox(c, ids) } : null }); if (!ids.length) notify(c, 'Circle some ink to select it'); return; }
    const t = st.audio.status === 'rec' ? st.audio.t : null; let s;
    if (live.kind === 'shape') { const p0 = pts[0], p1 = pts[pts.length - 1]; s = D.mk({ d: 'M' + D.f1(p0[0]) + ' ' + D.f1(p0[1]) + ' H' + D.f1(p1[0]) + ' V' + D.f1(p1[1]) + ' H' + D.f1(p0[0]) + ' Z', color: st.penColor, w: D.WIDTHS[st.wIdx], kind: 'shape', pts: [p0, [p1[0], p0[1]], p1, [p0[0], p1[1]]], bb: D.bbox([p0, p1]), t }); }
    else if (live.kind === 'hl') s = D.mk({ d: D.smooth(pts), color: st.hlColor, w: 22, op: .5, kind: 'hl', pts, bb, t });
    else s = D.mk({ d: D.smooth(pts), color: st.penColor, w: D.WIDTHS[st.wIdx], kind: 'pen', pts, bb, t });
    commit(c, arr => arr.concat([s])); set(c, { live: null });
  };
  // audio
  h.toggleAudio = () => c.setState(s => ({ audioOpen: !s.audioOpen }));
  h.closeAudio = () => set(c, { audioOpen: false });
  h.startRec = () => { set(c, { audio: { status: 'rec', t: 0, speed: 1 }, audioOpen: true }); notify(c, 'Recording — everything you write is time-linked'); };
  h.stopRec = () => { const t = c.state.audio.t; setPage(c, p => asg({}, p, { audio: { dur: Math.max(1, Math.round(t)) } })); set(c, { audio: IDLE }); notify(c, 'Recording saved · ' + D.fmt(t)); };
  h.playPause = () => c.setState(s => { const a = s.audio, pg = s.docs[s.nbId].pages[s.page], dur = pg.audio ? pg.audio.dur : 0; return a.status === 'play' ? { audio: asg({}, a, { status: 'pause' }) } : { audio: asg({}, a, { status: 'play', t: a.t >= dur ? 0 : a.t }) }; });
  h.seek = e => { const v = +e.target.value; c.setState(s => ({ audio: asg({}, s.audio, { t: v, status: s.audio.status === 'play' ? 'play' : 'pause' }) })); };
  h.cycleSpeed = () => c.setState(s => ({ audio: asg({}, s.audio, { speed: s.audio.speed === 1 ? 1.5 : s.audio.speed === 1.5 ? 2 : 1 }) }));
  h.doImport = name => doImport(c, name);
}
export function detach(c) { clearInterval(c.timer); clearTimeout(c.toastT); }
export function propsChanged(c, prev) {
  const p = c.props;
  if (prev.theme !== p.theme) set(c, { themeSel: null });
  if (prev.darkMode !== p.darkMode) set(c, { darkSel: null });
  if (prev.plan !== p.plan) set(c, { planSel: null });
  if (prev.startScreen !== p.startScreen) { const ss = p.startScreen; set(c, ss === 'onboarding' ? { overlay: 'onboarding', obStep: 0, screen: 'library' } : { overlay: null, screen: ['login', 'profiles', 'library', 'editor', 'search', 'settings'].includes(ss) ? ss : 'library', sideOpen: ss !== 'editor' }); }
  applyTheme(c);
}

// ---- everything the template renders --------------------------------------
export function computeVals(c) {
  const st = c.state, h = c.h, wide = !st.narrow, dark = isDark(c), theme = themeKey(c), plan = planKey(c), isFree = plan === 'free';
  const ink = col => { const i = D.INK.indexOf(col); return dark && i >= 0 ? D.DARK_INK[i] : col; };
  const nb = st.nbs.find(n => n.id === st.nbId) || st.nbs[0] || { title: '', subject: '' };
  const doc = curDoc(c) || { pages: [] };
  const pg = doc.pages[st.page] || { kind: 'paper', paper: 'lined', tint: 'none', strokes: [], texts: [] };
  const a = st.audio, pgAudio = pg.audio, dur = pgAudio ? pgAudio.dur : 0;
  const audioActive = !!pgAudio && (a.status === 'play' || a.status === 'pause');
  const sortS = arr => arr.slice().sort((p, q) => (p.kind === 'hl' ? 0 : 1) - (q.kind === 'hl' ? 0 : 1));
  const strokes = sortS(pg.strokes).map(s => ({ d: s.d, color: ink(s.color), w: s.w, opacity: audioActive && s.t != null && s.t > a.t ? 0.12 : s.op }));
  const texts = pg.texts.map(t => ({ left: (t.x / 8).toFixed(2) + '%', top: ((t.y - t.size * 0.92) / 10.4).toFixed(2) + '%', fsz: (t.size / 8).toFixed(3) + 'cqw', weight: t.weight || 500, fs: t.italic ? 'italic' : 'normal', ff: t.font === 'd' ? 'var(--fd)' : 'var(--fb)', fill: t.color === 'ink' ? 'var(--ink)' : t.color === 'mu' ? 'var(--mu)' : ink(t.color), text: t.text || (t.id === st.editing ? 'Type…' : '') }));
  const live = st.live; let livePath = null, liveColor = '#000', liveW = 2, liveOp = 1, liveDash = 'none';
  if (live && live.kind !== 'erase' && live.pts) {
    if (live.kind === 'shape') { const p0 = live.pts[0], p1 = live.pts[live.pts.length - 1]; livePath = 'M' + D.f1(p0[0]) + ' ' + D.f1(p0[1]) + ' H' + D.f1(p1[0]) + ' V' + D.f1(p1[1]) + ' H' + D.f1(p0[0]) + ' Z'; } else livePath = D.smooth(live.pts);
    liveColor = live.kind === 'hl' ? st.hlColor : live.kind === 'lasso' ? 'var(--ac)' : ink(st.penColor); liveW = live.kind === 'hl' ? 22 : live.kind === 'lasso' ? 1.5 : D.WIDTHS[st.wIdx]; liveOp = live.kind === 'hl' ? .5 : 1; liveDash = live.kind === 'lasso' ? '6 5' : 'none';
  }
  const free = pg.kind === 'freeform', pw = free ? 2400 : 800, ph = free ? 2400 : 1040;
  const mini = p => { const fr = p.kind === 'freeform'; return { fill: p.kind === 'pdf' ? 'none' : (D.PAPER_FILL[p.paper] || 'none'), isPdf: p.kind === 'pdf', tintFill: D.TINT[p.tint || 'none'] || 'none', vb: fr ? '0 0 2400 2400' : '0 0 800 1040', pw: fr ? 2400 : 800, ph: fr ? 2400 : 1040, strokes: sortS(p.strokes).slice(0, 40).map(s => ({ d: s.d, color: ink(s.color), w: s.w * (fr ? 5 : 2.2), opacity: s.op })) }; };
  const nbCard = n => { const d = getDoc(c, n.id); const m = d ? mini(d.pages[0]) : { fill: 'none', isPdf: false, tintFill: 'none', strokes: [] }; const sub = D.SUBJECTS.find(x => x.name === n.subject) || D.SUBJECTS[5]; return asg({}, n, m, { color: sub.color, tagList: (n.tags || []).map(t => ({ t })), open: () => openNb(c, n.id) }); };
  let list = st.nbs, libTitle = 'Notebooks';
  if (st.navItem === 'fav') { list = list.filter(n => n.fav); libTitle = 'Favorites'; } else if (st.navItem === 'shared') { list = list.filter(n => n.shared); libTitle = 'Shared'; } else if (st.navItem === 'trash') { list = []; libTitle = 'Trash'; } else if (st.navItem === 'recent') libTitle = 'Recent';
  if (st.libFilter !== 'All') list = list.filter(n => n.subject === st.libFilter);
  const notebooks = list.map(nbCard), recents = st.nbs.slice(0, 3).map(nbCard);
  const chip = (n, active, pick) => ({ n, active, pick, bg: active ? 'var(--ink)' : 'var(--sf)', fg: active ? 'var(--bgs)' : 'var(--ink)', bd: active ? 'var(--ink)' : 'var(--ln)' });
  const libFilters = ['All'].concat(D.SUBJECTS.map(s => s.name)).map(n => chip(n, st.libFilter === n, () => set(c, { libFilter: n })));
  const subjects = D.SUBJECTS.map(s => ({ name: s.name, color: s.color, count: st.nbs.filter(n => n.subject === s.name).length, bg: st.screen === 'library' && st.libFilter === s.name ? 'var(--sf2)' : 'transparent', pick: () => set(c, { screen: 'library', libFilter: s.name, navItem: 'all', overlay: null }) }));
  const nav = {}, navBg = {}, navFw = {};
  ['all', 'recent', 'fav', 'shared', 'trash', 'settings'].forEach(k => { const active = k === 'settings' ? st.screen === 'settings' : (st.screen === 'library' && st.navItem === k); nav[k] = () => k === 'settings' ? set(c, { screen: 'settings', overlay: null }) : set(c, { screen: 'library', navItem: k, libFilter: 'All', overlay: null }); navBg[k] = active ? 'var(--acs)' : 'transparent'; navFw[k] = active ? 700 : 500; });
  const tb = {}, tc = {}, pick = {};
  ['pen', 'hl', 'eraser', 'lasso', 'shape', 'text', 'image'].forEach(t => { const act = st.tool === t; tb[t] = act ? 'var(--ac)' : 'transparent'; tc[t] = act ? 'var(--aci)' : 'var(--ink)'; pick[t] = () => set(c, { tool: t, selection: null, live: null }); });
  const isHl = st.tool === 'hl', pal = isHl ? D.HL : D.INK, cur = isHl ? st.hlColor : st.penColor;
  const swatches = pal.map(col => ({ c: isHl ? col : ink(col), ring: col === cur ? '0 0 0 2px var(--sf), 0 0 0 4px var(--ink)' : '0 0 0 1px var(--ln)', pick: () => set(c, isHl ? { hlColor: col } : { penColor: col, tool: ['eraser', 'lasso', 'image'].includes(st.tool) ? 'pen' : st.tool }) }));
  const widths = D.WIDTHS.map((w, i) => ({ size: (5 + i * 4) + 'px', bg: st.wIdx === i ? 'var(--ink)' : 'var(--mu)', ring: st.wIdx === i ? '0 0 0 2px var(--sf), 0 0 0 3px var(--ink)' : 'none', pick: () => set(c, { wIdx: i, tool: isHl ? 'pen' : st.tool }) }));
  const thumbs = doc.pages.map((p, i) => asg({ n: i + 1, border: i === st.page ? 'var(--ac)' : 'transparent', bookmarked: !!p.bookmarked, go: () => gotoPage(c, i) }, mini(p)));
  const bars = D.WAVE.map((hh, i) => ({ h: hh + 'px', bg: dur && i / D.WAVE.length <= a.t / dur ? 'var(--ac)' : 'var(--ln)', delay: ((i % 7) * 0.09).toFixed(2) + 's' }));
  const q = st.query.trim().toLowerCase(), qw = q.split(/\s+/).filter(Boolean);
  const typeOk = r => st.sFilter === 'All' || (st.sFilter === 'Handwriting' && r.ink) || (st.sFilter === 'Typed' && r.typed) || (st.sFilter === 'PDFs' && r.pdf) || (st.sFilter === 'Audio' && r.audio);
  const results = D.RESULTS.filter(r => typeOk(r) && (!q || r.text.toLowerCase().includes(q) || qw.every(w => r.text.toLowerCase().includes(w)))).map((r, i) => { const lt = r.text.toLowerCase(); let idx = q ? lt.indexOf(q) : -1, ql = q.length; if (idx < 0 && qw.length) { idx = lt.indexOf(qw[0]); ql = qw[0].length; } return { nb: r.nb, page: r.page, type: r.type, when: r.when, isInk: !!r.ink, isPdf: !!r.pdf, isAudio: !!r.audio, isText: !!r.typed, pre: idx >= 0 ? r.text.slice(0, idx) : r.text, match: idx >= 0 ? r.text.slice(idx, idx + ql) : '', post: idx >= 0 ? r.text.slice(idx + ql) : '', ink: D.scribble(4, 28, 480, r.seed || (i + 3) * 13, 10).d, open: () => openNb(c, r.nbId, r.pg) }; });
  const sFilters = ['All', 'Handwriting', 'Typed', 'PDFs', 'Audio'].map(n => chip(n, st.sFilter === n, () => set(c, { sFilter: n })));
  const tog = {}, knob = {}, kbg = {};
  Object.keys(st.prefs).forEach(k => { tog[k] = () => c.setState(s => ({ prefs: asg({}, s.prefs, { [k]: !s.prefs[k] }) })); knob[k] = st.prefs[k] ? 18 : 0; kbg[k] = st.prefs[k] ? 'var(--ac)' : 'var(--ln)'; });
  const seg = (opts, curv, setter) => opts.map(n => ({ n, bg: curv === n ? 'var(--sf)' : 'transparent', fg: curv === n ? 'var(--ink)' : 'var(--mu)', sh: curv === n ? '0 1px 3px rgba(0,0,0,.18)' : 'none', pick: () => setter(n) }));
  const sTabs = D.S_TABS.map(n => ({ n, bg: st.sTab === n ? 'var(--acs)' : 'transparent', fw: st.sTab === n ? 700 : 500, pick: () => set(c, { sTab: n }) }));
  const themeCards = D.THEME_CARDS.map(k => { const T = D.THEMES[k.key], L = T[dark ? 'dark' : 'light']; return { key: k.key, name: k.name, desc: k.desc, group: k.group, bg: L.bg, sf: L.sf, ac: L.ac, ink: L.ink, fd: T.fd, r: T.r, sh: L.sh, bw: T.bw, ln: L.ln, bgi: T.bgi, bgsz: T.bgsz, pill: T.pill, btnB: T.btnB === '0' ? '0' : T.btnB.split('var(--ln)').join(L.ln).split('var(--ink)').join(L.ink).split('var(--ac)').join(L.ac), btnSh: T.btnSh.split('var(--ln)').join(L.ln).split('var(--ink)').join(L.ink), hw: T.hw, hst: T.hst, border: theme === k.key ? 'var(--ac)' : 'var(--ln)', bw2: theme === k.key ? '2px' : '1px', pick: () => set(c, { themeSel: k.key }) }; });
  const dock = st.dock, vert = dock === 'left' || dock === 'right';
  const chromeH = st.focus ? 0 : 56 + ((st.audioOpen || st.audio.status === 'rec') ? 58 : 0) + (st.selection ? 48 : 0) + (st.editing ? 48 : 0);
  const palPos = st.drag ? 'left:' + Math.round(st.drag.x) + 'px;top:' + Math.round(st.drag.y) + 'px;transform:translate(-50%,-50%);opacity:.92' : dock === 'bottom' ? 'left:0;right:0;bottom:16px;justify-content:center' : dock === 'top' ? 'left:0;right:0;top:' + (chromeH + 12) + 'px;justify-content:center' : dock === 'left' ? 'left:14px;top:' + chromeH + 'px;bottom:0;align-items:center' : 'right:14px;top:' + chromeH + 'px;bottom:0;align-items:center';
  const zone = side => ({ bg: st.dockHint === side ? 'var(--ac)' : 'var(--ln)', op: st.drag ? 1 : 0 });
  const wall = st.wall || DEF_WALL, hasWall = !!wall.src, kk = (D.THEMES[theme] || D.THEMES.paper)[dark ? 'dark' : 'light'];
  const walls = D.WALLS.map(w => ({ key: w.key, name: w.name, css: w.css, ring: wall.preset === w.key ? '0 0 0 2px var(--sf), 0 0 0 4px var(--ac)' : '0 0 0 1px var(--ln)', pick: () => h.pickWall(w.key) }));
  const prof = st.profiles.find(p => p.id === st.profileId) || st.profiles[0];
  const profiles = st.profiles.map(p => ({ id: p.id, name: p.name, initials: p.initials, color: p.color, role: p.role, note: p.note, active: p.id === st.profileId, ring: p.id === st.profileId ? '0 0 0 3px var(--bgs), 0 0 0 6px var(--ac)' : 'none', label: p.id === st.profileId ? 'Current' : 'Switch', pick: () => h.pickProfile(p.id) }));
  const askSources = results.slice(0, 4).map(r => ({ nb: r.nb, page: r.page }));
  const ov = { templates: st.overlay === 'templates', share: st.overlay === 'share', import: st.overlay === 'import', upgrade: st.overlay === 'upgrade', onboarding: st.overlay === 'onboarding' };
  const studyChips = D.STUDY.map(n => chip(n, st.study.includes(n), () => c.setState(s => ({ study: s.study.includes(n) ? s.study.filter(x => x !== n) : s.study.concat([n]) }))));
  const obDots = [0, 1, 2].map(i => ({ bg: i === st.obStep ? 'var(--ac)' : 'var(--ln)', w: i === st.obStep ? '22px' : '8px' }));
  const tpls = D.TPLS.map(t => ({ key: t.key, name: t.name, fill: D.PAPER_FILL[t.key], isCornell: t.key === 'cornell', isPlanner: t.key === 'planner', border: st.tplSel === t.key ? 'var(--ac)' : 'var(--ln)', pick: () => set(c, { tplSel: t.key }) }));
  const tints = D.TINTS.map(t => ({ name: t.name, color: t.color, ring: st.tplTint === t.key ? '0 0 0 2px var(--sf), 0 0 0 4px var(--ac)' : '0 0 0 1px var(--ln)', pick: () => set(c, { tplTint: t.key }) }));
  const importSources = [{ name: 'Files', desc: 'Browse this device' }, { name: 'Google Drive', desc: 'Connected' }, { name: 'Scan with camera', desc: 'Auto-crop & straighten' }, { name: 'Paste a link', desc: 'Course portal, arXiv, Drive' }].map(s => asg(s, { pick: () => h.doImport(s.name) }));
  const recentFiles = [{ name: 'chapter-15-doppler.pdf', meta: 'PHY-204 · 14 pages · 2.1 MB' }, { name: 'problem-set-6.pdf', meta: 'PHY-204 · 3 pages · 240 KB' }, { name: 'kinetics-lecture-slides.pdf', meta: 'CHM-110 · 42 pages · 8.7 MB' }].map(f => asg(f, { pick: () => h.doImport(f.name) }));
  const sel = st.selection, editingItem = st.editing ? pg.texts.find(t => t.id === st.editing) : null, yearly = st.billing === 'yearly';
  return asg({}, h, {
    rootRef: c.rootRef, svgRef: c.svgRef, mainRef: c.mainRef, wallInputRef: c.wallInputRef, wide, sideW: st.sideOpen ? (wide ? '248px' : '68px') : '0px', sideBw: st.sideOpen ? 'var(--bw,1px)' : '0px', sideOpen: st.sideOpen, isFree, isPro: !isFree, planLabel: isFree ? 'Free · Student' : 'Pro · Student',
    isLogin: st.screen === 'login', isProfiles: st.screen === 'profiles', loginMethods: st.loginStep === 'methods', loginPhoneStep: st.loginStep === 'phone', loginOtpStep: st.loginStep === 'otp', phone: st.phone, otp: st.otp, profiles, profile: prof, addingProfile: st.addingProfile, newProfile: st.newProfile,
    focus: st.focus, notFocus: !st.focus, dock, palPos, palDir: vert ? 'column' : 'row', sepW: vert ? '26px' : '1px', sepH: vert ? '1px' : '26px', dragging: !!st.drag, zoneL: zone('left'), zoneR: zone('right'), zoneT: zone('top'), zoneB: zone('bottom'), dockOpts: seg(['Bottom', 'Top', 'Left', 'Right'], dock[0].toUpperCase() + dock.slice(1), n => set(c, { dock: n.toLowerCase() })),
    bookmarked: !!pg.bookmarked, bookmarkFill: pg.bookmarked ? 'currentColor' : 'none', askOpen: st.askOpen, askSources, askSummary: 'A standing wave forms when two waves of the same frequency travel in opposite directions and superpose. Nodes stay fixed; antinodes swing between extremes. On a string fixed at both ends only certain frequencies fit — fₙ = n·v / 2L — which is why your lecture called them resonant. Your audio at 04:12 flags this for the quiz.',
    hasWall, wallSrc: wall.src || 'none', wallBlur: wall.blur, wallVeil: 'linear-gradient(180deg, ' + rgba(kk.bg, Math.min(.92, wall.dim / 100 + .1)) + ', ' + rgba(kk.bg, Math.min(.96, wall.dim / 100 + .35)) + ')', wallBlurVal: wall.blur, wallDimVal: wall.dim, wallName: wall.name || 'Custom image', walls,
    isFreeform: free, pw, ph, svgVB: '0 0 ' + pw + ' ' + ph, svgW: free ? '2400px' : '100%', svgH: free ? '2400px' : 'auto', pageWidth: free ? '2400px' : 'auto', pageMax: free ? 'none' : '820px', pageShadow: free ? 'none' : 'var(--sh)', pageRadius: free ? '0' : '4px', pageOverflow: free ? 'visible' : 'hidden',
    isPagesTpl: st.tplStyle === 'pages', isFreeformTpl: st.tplStyle === 'freeform', pageStyles: seg(['Pages', 'Freeform canvas'], st.tplStyle === 'pages' ? 'Pages' : 'Freeform canvas', n => set(c, { tplStyle: n === 'Pages' ? 'pages' : 'freeform' })),
    isLibrary: st.screen === 'library', isEditor: st.screen === 'editor', isSearch: st.screen === 'search', isSettings: st.screen === 'settings',
    nav, navBg, navFw, subjects, importLabel: st.importsUsed + ' of 5 PDF imports', importPct: Math.min(100, st.importsUsed * 20) + '%',
    showRecents: st.navItem === 'all' && st.libFilter === 'All', recents, libTitle, libFilters, isGrid: st.libView === 'grid', isList: st.libView === 'list', gridBg: st.libView === 'grid' ? 'var(--sf2)' : 'transparent', listBg: st.libView === 'list' ? 'var(--sf2)' : 'transparent', notebooks, libEmpty: notebooks.length === 0, libEmptyText: st.navItem === 'trash' ? 'Trash is empty — deleted notebooks stay here for 30 days.' : 'Nothing here yet.', pdfBars: D.PDF_BARS, pdfFig: D.PDF_FIG,
    nbTitle: nb.title, nbSubject: nb.subject, pageNo: st.page + 1, pageCount: doc.pages.length, pageKind: pg.kind === 'pdf' ? ' · ' + (pg.pdfName || 'PDF') : '', undoOp: st.undo.length ? 1 : .35, redoOp: st.redo.length ? 1 : .35,
    audioBtnBg: st.audioOpen || a.status === 'rec' ? 'var(--acs)' : 'transparent', audioBtnFg: a.status === 'rec' ? '#e0443a' : 'var(--ink)',
    audioOpen: st.audioOpen || a.status === 'rec', audioIdleNoRec: a.status === 'idle' && !pgAudio, recording: a.status === 'rec', hasRec: !!pgAudio && a.status !== 'rec', playing: a.status === 'play', notPlaying: a.status !== 'play', audioTime: D.fmt(a.t), audioDur: D.fmt(dur), dur, audioT: a.t, bars, speedLabel: a.speed + '×',
    editorDir: st.prefs.leftHanded ? 'row-reverse' : 'row', hasSelection: !!sel, selCount: sel ? sel.ids.length + (sel.ids.length === 1 ? ' stroke selected' : ' strokes selected') : '', selX: sel ? sel.bb[0] - 8 : 0, selY: sel ? sel.bb[1] - 8 : 0, selW: sel ? sel.bb[2] - sel.bb[0] + 16 : 0, selH: sel ? sel.bb[3] - sel.bb[1] + 16 : 0,
    isEditingText: !!editingItem, editText: editingItem ? editingItem.text : '',
    cursor: st.tool === 'eraser' ? 'cell' : st.tool === 'text' ? 'text' : st.tool === 'image' ? 'copy' : 'crosshair',
    isPdf: pg.kind === 'pdf', notPdf: pg.kind !== 'pdf', paperFill: D.PAPER_FILL[pg.paper] || 'none', tintFill: D.TINT[pg.tint || 'none'] || 'none', isCornell: pg.paper === 'cornell', strokes, texts, hasLive: !!livePath, livePath, liveColor, liveW, liveOp, liveDash,
    showRail: st.showThumbs && wide && !st.focus, thumbs, tb, tc, pick, swatches, widths,
    query: st.query, hasQuery: !!st.query, sFilters, resultCount: results.length + (results.length === 1 ? ' result' : ' results'), results, noResults: results.length === 0,
    settingsCols: wide ? '220px minmax(0,1fr)' : 'minmax(0,1fr)', sTabs, tabAccount: st.sTab === 'Account & plan', tabSync: st.sTab === 'Sync & backup', tabStylus: st.sTab === 'Handwriting & stylus', tabAppearance: st.sTab === 'Appearance', tabNotif: st.sTab === 'Notifications', tabPrivacy: st.sTab === 'Privacy & export',
    planName: isFree ? 'Free' : 'Pro', planDesc: isFree ? '5 PDF imports a month · 30-min recordings · 3 people per notebook' : 'Unlimited imports & audio · handwriting to text · 50 GB backup', tog, knob, kbg,
    backups: seg(['SS Cloud', 'iCloud', 'Google Drive'], st.backup, n => set(c, { backup: n })), dblTaps: seg(['Eraser', 'Previous tool', 'Colors'], st.dblTap, n => set(c, { dblTap: n })), themeCards, isDark: dark, darkKnob: dark ? 18 : 0, darkBg: dark ? 'var(--ac)' : 'var(--ln)',
    ov, tpls, tints, sizes: seg(['Auto', 'A4', 'Letter'], st.tplSize, n => set(c, { tplSize: n })), tplApplyLabel: st.tplMode === 'new' ? 'Create notebook' : 'Apply to this page', tplTitle: st.tplMode === 'new' ? 'New notebook' : 'Paper & template',
    shareTitle: 'Share “' + nb.title + '”', linkOn: st.linkOn, linkKnob: st.linkOn ? 18 : 0, linkBg: st.linkOn ? 'var(--ac)' : 'var(--ln)', perms: seg(['Can view', 'Can comment', 'Can edit'], st.perm, n => set(c, { perm: n })), people: st.people, invite: st.invite,
    importSources, recentFiles, importUsedLabel: st.importsUsed + ' of 5 imports used this month',
    yearlyBg: yearly ? 'var(--sf)' : 'transparent', monthlyBg: yearly ? 'transparent' : 'var(--sf)', proPrice: yearly ? '₹999' : '₹149', proPer: yearly ? 'per year · about ₹83 a month' : 'per month · cancel anytime',
    obCols: wide ? 'minmax(0,1fr) minmax(0,1fr)' : 'minmax(0,1fr)', showObArt: wide, ob0: st.obStep === 0, ob1: st.obStep === 1, ob2: st.obStep === 2, obDots, obNextLabel: st.obStep < 2 ? 'Continue' : 'Start writing', studyChips, obInk: D.OB_INK.map(s => ({ d: s.d, color: ink(s.color) })),
    hasToast: !!st.toast, toast: st.toast
  });
}
