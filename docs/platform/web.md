# Platform — Web (PWA)

> Audience: a coding agent building the Web/PWA surface of Sane Notes with **zero prior
> context**. Authoritative capability map, renderer decision, PWA integration list, and
> security-hardening checklist for the browser. Implements the locked decisions
> ([`docs/product/vision-and-principles.md`](../product/vision-and-principles.md)) and the
> two-tier ink architecture ([`docs/architecture/overview.md`](../architecture/overview.md)).
>
> Primary research source: `research/web-stylus-and-pwa-capabilities.md` (committed at
> [`../research/sources/web-stylus-and-pwa-capabilities.md`](../research/sources/web-stylus-and-pwa-capabilities.md))
> and `research/flutter-ink-stack.md`. Web-strategy ADR: [ADR-0010](../adr/0010-web-pwa-strategy.md).
> **(verify)** flags carried through; **MUST/SHOULD/MAY** are RFC-2119.

Web is a **first-class surface** (decision 1) but the **most constrained** one. The locked
decision is **Flutter Web (CanvasKit/skwasm)**, *not* a React DOM shell. The research
concluded a React DOM shell would be the better pen-first web fit; that recommendation is
**recorded here as a standing risk** (§11, R0) but the decision stands — Flutter Web keeps
five surfaces in lock-step from one codebase. Position web as **"view + light-edit + quick
capture"**, and push heavy inking sessions to the installed native apps. Web ink budget is
**≤ 30 ms pen-to-pixel on Chrome desktop** (decision 7); other browsers/devices are
best-effort.

---

## 1. Target browsers & devices

| Axis | Support |
|---|---|
| **Chrome / Edge** | **120+** (decision 7). Best surface: Ink API, `desynchronized` canvas, File System Access, on-device Web Speech. |
| **Safari** | **17+** (decision 7); Safari **18.2+** for `altitudeAngle`/`azimuthAngle` + coalesced/predicted events; Safari **26** for WebGPU. Constraining target for installability, background work, disk access. |
| **Firefox** | **125+** (decision 7). Coalesced yes, predicted narrow; no File System Access pickers; no Trusted Types yet. |
| **Samsung Internet** | Chromium-based; tracks Chrome with a lag (row parity **unverified**). |
| **Ink budget device** | Chrome on desktop (≤ 30 ms). Tablets/phones in-browser are best-effort. |

**Hard platform reality (decision-shaping):** Flutter compiled to WASM (**skwasm**) needs
**WasmGC**, which **no iOS/iPadOS browser supports** (all use WebKit). So on iPhone/iPad,
Flutter Web runs the **JS + CanvasKit** fallback, never skwasm. See §2 and R1.

---

## 2. Renderer: CanvasKit vs skwasm

Flutter Web renders only through Skia-on-WASM (the old HTML/DOM renderer was removed).

| Renderer | Thread | Requires | Use |
|---|---|---|---|
| **CanvasKit** | main thread | nothing special (~1.5 MB WASM + app) | **Default / universal fallback.** Consistent rendering everywhere, incl. iOS browsers. |
| **skwasm** | offloads paint to a **Web Worker** (multi-core) | **WasmGC** + **COOP/COEP** cross-origin isolation | Faster where supported: Chrome/Chromium 119+, Firefox 120+ (**(verify)** — noted buggy at research time). **Not on any iOS browser; Safari has a blocking WasmGC/Flutter bug.** |

**Build & runtime:** `flutter build web --wasm` emits **both** WASM and JS; at runtime, if
WasmGC is absent the app falls back to **JS/CanvasKit** automatically (needs Flutter 3.24+).
Deploy both. Enable COOP/COEP (§9) so skwasm and multithreaded WASM (whisper) can run where
supported; on iOS you get CanvasKit regardless. No Impeller on web today; watch Skia
**Graphite/WebGPU** as the future unifier (no timeline — treat WebGPU-class web ink as future,
not present).

---

## 3. Stylus & input on Flutter Web

Flutter Web consumes browser **Pointer Events** through the engine and surfaces them as
`PointerEvent`/`Listener` in Dart — the **same `sane_ink` capture path** as mobile. The rich
DOM stylus APIs below exist in the browser but are reached **through the Flutter engine**, not
directly; where Flutter does not forward a capability, `sane_ink_surface`'s web impl needs
**JS interop** (`dart:js_interop`) against the underlying canvas. This is the central web-ink
constraint (R2).

| Browser capability | DOM API | Reaches Flutter as | Notes |
|---|---|---|---|
| Pressure / tiltX,Y | `PointerEvent.pressure`, `tiltX/tiltY`, `twist` | `PointerEvent` pressure/tilt/orientation | Baseline |
| Altitude / azimuth | `altitudeAngle` / `azimuthAngle` | via engine | **Safari 18.2+**; cleaner than tiltX/Y |
| High-Hz samples | `getCoalescedEvents()` | **(verify)** whether Flutter forwards these | Safari 18.2+, Chromium; secure context. Flutter has no first-class coalesced array (L1) — may need JS interop |
| Draw-ahead | `getPredictedEvents()`, Ink API `DelegatedInkTrailPresenter` | JS interop only | Ink API **Chromium/Samsung only**, not Safari/Firefox |
| Hover | pointer events before contact | `onPointerHover` | Safari 16.1+ (M2 iPad); mouse hover everywhere |
| Disable scroll/zoom on canvas | CSS `touch-action: none`/`manipulation` | engine handles | scope to canvas; `none` can block user zoom (WCAG 1.4.4) |
| Palm rejection | heuristic on `pointerType`/`width`/`height`/`pressure` | Dart-side | **no native palm flag** on web; treat `pen` as authoritative, deprioritize concurrent `touch` |
| Handwriting → text | **Scribble** (iPadOS, automatic in DOM text fields) | not scriptable | works only in real DOM text inputs, not Flutter-painted text (L3) |

### Low-latency ink primitives (web)
- **`getContext('2d'|'webgl2', { desynchronized: true })`** — lowest paint latency; a hint,
  best on Chromium; feature-detect via `getContextAttributes().desynchronized`. Flutter owns
  its canvas context, so using this requires either the engine to opt in or a JS-interop
  side-canvas for the wet stroke (R2).
- **Ink API delegated trails** (`navigator.ink.requestPresenter`) — lowest-latency web
  primitive; **Chromium/Samsung only**; layer as progressive enhancement via JS interop, fall
  back to the normal canvas renderer everywhere else.
- **OffscreenCanvas + Worker**, **WebGL2** (default), **WebGPU** (Chrome/Edge, FF 141 Win /
  145 macOS, Safari 26) — Flutter's engine already uses WebGL/WebGPU internally; app code does
  not drive these directly.

**Practical web ink plan:** Tier B pure-Flutter path (`Listener` → `sane_ink` →
`CustomPainter`/CanvasKit) is the baseline everywhere. A **Chromium-only** wet-ink fast path
using the Ink API / `desynchronized` side-canvas via JS interop is an **optional progressive
enhancement**, validated by the SN-INK spike; do not block the web release on it.

---

## 4. Local storage & files

Local-first (decision 3) on web means the browser is the device store.

| Need | API | Notes |
|---|---|---|
| **Fast blob/DB store** | **OPFS** (`navigator.storage.getDirectory()`) + **`createSyncAccessHandle()`** (Worker-only) | Chrome/Edge 86+, FF 111+, Safari 15.2+. The performance tier; hosts **SQLite WASM** (drift's web build) and ink/PDF/audio blobs. |
| **Structured store** | IndexedDB | Baseline; wrap writes in try/catch for `QuotaExceededError`. |
| **Small prefs** | `localStorage` (~5 MiB) | Prefs only, **never** note content. |
| **Persistence vs eviction** | `navigator.storage.persist()` + `estimate()` | Best-effort storage is LRU-evicted under disk pressure; WebKit also evicts un-interacted origins after **7 days** (ITP). Call `persist()` **from a user gesture when saving critical data**; installed/Home-Screen web apps are granted it heuristically. |
| **Quota** | share of disk (Chrome ~60%/origin; Safari ~60% browser / **~15% for non-browser WebView**) | Check headroom with `estimate()`; surface a low-space warning. |
| **Open/save real files** | File System Access `show*Picker()` | **Chromium desktop only**; Safari/Firefox → OPFS + `<input type=file>`/download fallback (`browser-fs-access` ponyfill). Not on mobile browsers. |

**Data-durability warning:** browser storage can be evicted. The web build MUST (a) request
persistence on first meaningful save, (b) encourage **sync to the user's cloud** (Drive) as
the durable copy, and (c) never treat OPFS/IndexedDB as the only copy of a note. This is a
correctness requirement, not a nicety.

---

## 5. PWA install, offline & OS integration

| Feature | API / manifest | Support | Sane Notes use |
|---|---|---|---|
| Install + offline | Web App Manifest + Service Worker (Workbox precache/runtime) | Chromium rich install (`beforeinstallprompt`); Safari manual **Add to Home Screen** | Installable PWA; full offline note-taking |
| Open files via app | `file_handlers` + `launchQueue.setConsumer` → `LaunchParams.files` | **Chromium desktop only** | Register `.sanenote`, `.pdf`, `.md` handlers |
| Launch focus behavior | `launch_handler` / `client_mode` | Chromium | Focus existing window vs new |
| App icon badge | `navigator.setAppBadge()` | Chromium desktop; **iOS 16.4+ installed** | Unread/sync badge |
| Receive shares | `share_target` manifest (files → `method: POST`, `multipart/form-data`) | Chromium / Android PWAs; not Safari | "Share to Sane Notes" (import PDF/image) |
| Send shares | `navigator.share()` / `canShare()` | Chrome/Safari/Edge; FF limited | Export/share a page (needs user gesture) |
| Push | Web Push | Safari **16.4+ installed only**; Chromium/FF broadly | Low priority (collab invites) |
| Keyboard-first | DOM focus / shortcuts | all | See §6 |

### iOS/iPadOS PWA limits (the binding constraints)
No automatic install prompt (manual A2HS); push needs iOS **16.4+ + Home-Screen install**;
**no** Background Sync, Periodic Background Sync, Background Fetch, Web Bluetooth/NFC/USB/
Serial, File System Access pickers, or Contact Picker; aggressive storage eviction. Minimum
for "real" PWA features on iOS is **16.4**. Design the web app so none of these are
load-bearing on iOS — sync happens **while the app is open**, not in the background.

### Keyboard-first & accessibility
The web app MUST be fully **keyboard-operable** (create/search/navigate/format/undo-redo via
shortcuts, visible focus rings, skip links) — desktop web users expect it, and it is a WCAG
2.2 AA requirement (decision 10). Because Flutter paints text and semantics (not native DOM),
Flutter injects an accessibility/semantics layer that emits `aria-*`; the app MUST
**hand-author `Semantics`** for custom-painted content (canvas, ink) and provide **OCR-backed
text alternatives** for handwritten content. Validate with a real screen reader (NVDA/
VoiceOver) — this is a known Flutter-web weak spot (R3) and an explicit accessibility gate.

---

## 6. Audio, speech & OCR on web

| Need | API | Notes |
|---|---|---|
| Record voice notes | **MediaRecorder** (Opus) | `audio/webm;codecs=opus` works cross-browser since **Safari 18.4**; feature-test `isTypeSupported()`, fall back to `audio/mp4`. |
| Precise encode | **WebCodecs** `AudioEncoder` (Worker) | Chromium full, Safari good, FF limited; needs a muxer library. |
| Dictation | **Web Speech** `SpeechRecognition` | **Not Baseline.** Chrome 139+ on-device mode; Safari on-device (webkit prefix); Firefox minimal. |
| Offline transcription | **whisper.cpp WASM** | Fully offline/private; needs **threads → COOP/COEP** (§9). The portable path independent of browser speech support. |
| Read aloud | SpeechSynthesis | broad |
| Photo/page OCR | **tesseract.js** (WASM, Worker) | Weak on cursive handwriting. |
| PDF view/annotate | **pdf.js** / PDFium WASM (`pdfrx` web) | broad |

**On-device handwriting recognition gap:** Google **ML Kit is mobile-only — no web**
(`research/flutter-ink-stack.md`). The web build has **no on-device digital-ink recognition**.
Options: a **Rust/WASM recognition core via `flutter_rust_bridge`** shared across platforms, or
a **cloud OCR/ink path** as an explicit per-request opt-in (decision 6, with the
data-leaves-device indicator). This is a real feature gap to resolve — record the choice in
[ADR-0010](../adr/0010-web-pwa-strategy.md).

---

## 7. Auth, cloud & user-owned storage

| Concern | API | Notes |
|---|---|---|
| **Passwordless** | **WebAuthn / passkeys** (Baseline) + conditional mediation | Recommended primary; synced via iCloud Keychain / Google / Microsoft. |
| **Google** | Google Identity Services (GIS) | ID token (auth) split from OAuth (authorization); One Tap. |
| **Microsoft** | MSAL.js (`@azure/msal-browser`) PKCE | For OneDrive/Graph tokens. ADAL is EOL — MSAL only. |
| **Apple** | Sign in with Apple JS (`AppleID.auth`) | Needs Services ID + verified domain + HTTPS; heaviest setup. |
| **User cloud (Drive)** | Drive Picker + `drive.file` scope | Privacy-preserving; app sees only files it creates/user opens. Cross-platform durable copy. |
| **OneDrive** | MSAL + Microsoft Graph `Files.*` | |
| **iCloud (CloudKit JS)** | CloudKit container from JS | **Apple-ID users only**; not a primary cross-platform store; long-term reliability risk **(unverified)**. |

Everything synced is **E2EE ciphertext** (decision 3); crypto runs client-side (`sane_crypto`,
WebCrypto/WASM). Guest mode is first-class; identity is never required to take notes.

Dart packages already chosen (`research/flutter-ink-stack.md`): `google_sign_in` (v7 redesign
— budget for it), `sign_in_with_apple` (web redirect flow), `aad_oauth` (MSAL browser on web),
`googleapis` (Drive). `flutter_secure_storage` web impl uses **experimental WebCrypto bound to
`localStorage`** — non-portable, HTTPS/localhost only; do **not** rely on it for the master key
(R4).

---

## 8. Web is not an app store — but it has release gates

There is no store review, but the web release MUST meet:

| Gate | Requirement |
|---|---|
| **HTTPS** | Everything is secure-context-only (Pointer coalesced events, OPFS sync handles, clipboard, WebAuthn, service worker). |
| **Own origin + isolation** | Serve the app on its **own origin** with **COOP/COEP** so skwasm + multithreaded WASM (whisper) can run (§9). |
| **CSP / Trusted Types / SRI** | §9 — hard requirement for ASVS 5.0 L2 (decision 8). |
| **Installability** | Valid manifest (name, icons, `display: standalone`, `start_url`, `scope`), registered service worker, offline fallback. |
| **Data durability UX** | `persist()` + cloud-sync prompt so a note is never single-copy in evictable storage (§4). |
| **Accessibility** | WCAG 2.2 AA; hand-authored `Semantics`; keyboard-first; screen-reader validated (§5). |

---

## 9. Security hardening (ASVS 5.0 L2)

Web/services target **OWASP ASVS 5.0 L2** (decision 8). Apply:

- **CSP** — strict, **nonce-based** (`script-src 'nonce-{random}' 'strict-dynamic';
  object-src 'none'; base-uri 'none'`). Add **`'wasm-unsafe-eval'`** for CanvasKit/skwasm/
  whisper WASM. Prefer nonces over host allowlists.
- **Trusted Types** (`require-trusted-types-for 'script'`) + DOMPurify for any user
  HTML/markdown rendering — kills DOM-XSS. **Not in Safari/Firefox yet**, so it hardens
  Chromium and is defense-in-depth, not sole reliance.
- **COOP + COEP** (`Cross-Origin-Opener-Policy: same-origin`,
  `Cross-Origin-Embedder-Policy: require-corp`) → cross-origin isolation
  (`self.crossOriginIsolated`), the prerequisite for **SharedArrayBuffer** and **multithreaded
  WASM** (skwasm, whisper.cpp, any ffmpeg.wasm). Every cross-origin subresource must send
  CORP/CORS; deploy with `-Report-Only` first. **This is why the app lives on its own isolated
  origin.**
- **SRI** (`integrity="sha384-…"` + `crossorigin`) on all CDN scripts/styles; enforce
  fleet-wide with `Integrity-Policy`.

---

## 10. Clipboard & sharing quirks

- **Async Clipboard** `write([ClipboardItem])` supports **images** (paste a page as PNG, paste
  screenshots in). **Safari** requires the `ClipboardItem` value to be a **Promise** resolving
  to the blob and a **direct user gesture**; Chromium accepts blobs or promises. Always run
  clipboard calls inside a user-activation handler.
- **Web Share** requires secure context + user gesture; Firefox support is limited.

---

## 11. Known Flutter-Web limitations & mitigations

| # | Limitation | Impact | Mitigation |
|---|---|---|---|
| **R0** | Research recommends a **React DOM shell** over Flutter Web for a pen-first app (native text/IME/Scribble/a11y, smaller bundle, direct API access) — the locked decision is Flutter | Web is the weakest surface | Decision stands for lock-step parity; position web as view/light-edit; keep Flutter-web risks visible; revisit only if the web experience becomes the top priority (would be an ADR supersession). |
| **R1** | **skwasm/WasmGC can't run in any iOS browser**; heavier download than a JS app | iPad/iPhone Safari web users get JS/CanvasKit (heavier, slower first paint) | Ship the automatic CanvasKit fallback; code-split; cache aggressively via service worker; push heavy inking to installed apps. |
| **R2** | Flutter owns its canvas; **Ink API / `desynchronized` / coalesced events** aren't first-class in Dart | Can't trivially hit the lowest web-ink latency | JS-interop wet-ink side-canvas on Chromium as progressive enhancement; Tier-B CanvasKit baseline everywhere; validate with SN-INK spike; ≤ 30 ms Chrome-desktop gate only. |
| **R3** | Flutter-web text input, IME, Scribble, selection, and **accessibility** are weak (painted, not DOM) | A11y/keyboard/typed-text quality | Hand-author `Semantics`; OCR alt-text for ink; real screen-reader gate; consider native DOM overlays for critical text fields **(verify feasibility in Flutter web)**. |
| **R4** | `flutter_secure_storage` web = experimental WebCrypto bound to `localStorage`, non-portable | Master-key handling | Do not hold the master key in browser storage unprotected; derive/wrap per session; durable key escrow via the user's cloud + recovery code (decision 3). |
| **R5** | No on-device ML Kit on web | No offline handwriting recognition | Rust/WASM recognition core (FRB) or cloud OCR opt-in (§6). |
| **R6** | Browser storage eviction | Data loss | `persist()` + mandatory cloud-sync durable copy (§4). |

---

## 12. Testing browsers & harness

- **Tier 1 (CI):** Chrome (desktop) — the ≤ 30 ms ink gate and functional/golden runs; a
  headless Chromium for automated PWA/offline/service-worker tests.
- **Tier 2 manual:** Safari on iPadOS (CanvasKit fallback path — verify ink + storage +
  install), Safari macOS, Firefox, Edge, Samsung Internet.
- **Screen-reader gate:** VoiceOver (Safari) + NVDA (Firefox/Chrome) on the core flows.
- **Storage/eviction test:** simulate quota pressure and the 7-day ITP eviction; confirm the
  cloud-sync durable copy recovers a note.
- `integration_test` for web + Playwright/`patrol` where native-browser automation is needed.

---

## 13. Cross-references

- Web-PWA strategy: [ADR-0010](../adr/0010-web-pwa-strategy.md)
- Single-codebase decision & exit criterion: [ADR-0001](../adr/0001-flutter-single-codebase.md)
- Ink tiers & threading: [`architecture/overview.md`](../architecture/overview.md)
- Identity / sync / crypto / privacy: [`prd-03`](../product/prd-03-identity-sync-privacy-settings-billing.md)
- Phone/web small-screen adaptation: [`phones.md`](phones.md)
- Support tiers & browser matrix: [`compatibility-matrix.md`](compatibility-matrix.md)
- Budgets & gates: [`performance-budgets.md`](performance-budgets.md)
- Research: `research/web-stylus-and-pwa-capabilities.md`, `research/flutter-ink-stack.md`
