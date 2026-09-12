# Web Platform Capabilities for a Browser-Based Note App (2025–2026)

*Research compiled September 2026 from MDN, web.dev, Chrome for Developers, the WebKit blog, W3C/WICG specs, and vendor developer docs. Every substantive claim traces to a source listed in "## Sources". Items I could not fully confirm are marked "(unverified)".*

A pen-first, offline-capable note app is now buildable almost entirely on standardized web platform APIs. The strongest capabilities (low-latency ink, high-frequency stylus sampling, GPU rendering, large local storage, on-device speech) are best on Chromium; Safari on iPadOS has closed a lot of the stylus gap (hover, tilt, coalesced/predicted events) but remains the constraining target for PWA installability, background work, and local-disk file access. This report inventories each capability, its browser reality, and how it maps onto note-app features.

---

## 1. Stylus & Pointer Input

### Pointer Events (the core input model)

`PointerEvent` is the unified, **Baseline / widely available** input model (across browsers since July 2020) and is the correct foundation for a pen app — a single event stream covers pen, touch, and mouse via `pointerType` (`"pen"`, `"touch"`, `"mouse"`). Stylus-relevant properties:

- **`pressure`** — normalized 0–1 (0 = min, 1 = max hardware pressure). Drives stroke width/opacity.
- **`tangentialPressure`** — barrel/cylinder stress, −1 to 1, 0 = neutral (rarely populated on consumer hardware).
- **`tiltX` / `tiltY`** — −90° to 90°, the pen's lean relative to the Y–Z and X–Z planes.
- **`twist`** — 0–359°, rotation about the pen's major axis (for chisel/calligraphy brushes).
- **`altitudeAngle` / `azimuthAngle`** — the newer spherical representation of pen orientation (altitude = angle from the screen plane; azimuth = compass direction of the tilt). These are a cleaner alternative to tiltX/tiltY and were the last big Safari gap to close (see below).
- **`width` / `height`** — contact-geometry footprint in CSS px (touch/eraser size).
- **`pointerId`, `isPrimary`** — multi-touch/multi-pen disambiguation.

Use `element.setPointerCapture(pointerId)` so a stroke keeps receiving events even if the pointer leaves the canvas.

### High-frequency sampling: `getCoalescedEvents()` and prediction: `getPredictedEvents()`

Displays and digitizers sample far faster (120–240 Hz) than the ~60 Hz `pointermove` dispatch. Two methods on `PointerEvent` recover that fidelity:

- **`getCoalescedEvents()`** returns every un-coalesced position merged into the current `pointermove` (or `pointerrawupdate`) — essential for smooth curves that match fast pen motion. Requires a **secure context**.
- **`getPredictedEvents()`** returns the browser's *predicted* upcoming points, letting you draw slightly ahead of the pen to cut perceived latency (discard the prediction on the next real event).
- **`pointerrawupdate`** (a separate, secure-context event) delivers position updates at the highest rate the platform allows, ahead of the throttled `pointermove`, for the most latency-sensitive inking loops.

**Support:** Both coalesced/predicted methods are **not Baseline**. They shipped early in Chromium. Safari historically lacked `getCoalescedEvents()` (a long-standing complaint for iPad drawing apps) but **Safari 18.2 added both `getCoalescedEvents()` and `getPredictedEvents()`** — a major win for iPad note apps. Firefox supports coalesced events; predicted-event support is narrower.

### Apple Pencil hover & tilt in Safari (iPadOS 16.1 → 26)

- **Hover** landed with **Safari 16.1 / iPadOS 16** on the M2 iPad Pro: CSS `:hover` states, and pointer events fire before contact so you can show a brush preview/cursor. Apple routed it through existing hover/pointer interactions, so feature-detect hover rather than sniffing devices.
- **Tilt/orientation**: `altitudeAngle` and `azimuthAngle` were added to `PointerEvent` in **Safari 18.2** (first seen in Safari Technology Preview 202, Aug 2024), so orientation-aware brushes now work in Safari, not just Chromium.
- Net effect: on **iPadOS 17/18/26**, Safari now provides pressure, tilt (both tiltX/Y and altitude/azimuth in 18.2+), hover, coalesced + predicted events. This is close to feature parity with Chromium for inking, aside from the Ink API (below).

### Scribble

Scribble (handwriting-to-text with Apple Pencil) is an **OS-level iPadOS feature**, not a web API. In Safari it works automatically in standard editable fields (`<input>`, `<textarea>`, `contenteditable`) — the recognized text arrives as normal text input, so a note app gets it "for free" in DOM text fields but cannot script or intercept the recognition. There is no web API to invoke Scribble programmatically. (Historically, Scribble strokes did **not** produce PointerEvents on the canvas, so you can't build your own recognizer from them — treat DOM text fields and canvas ink as separate input paths.)

### touch-action & palm rejection

`touch-action` (CSS, **Baseline widely available**) tells the browser which native gestures to keep. For a drawing surface:

- **`touch-action: none`** on the canvas disables scroll/pan/pinch/double-tap-zoom so *every* pointer becomes yours; the browser then sends `pointermove`/`pointerup` instead of firing `pointercancel`.
- **`touch-action: manipulation`** keeps pan+pinch but drops the 300–500 ms double-tap-zoom delay (good for toolbars/UI chrome around the canvas).
- Directional values (`pan-x`, `pan-y`, `pinch-zoom`) let you allow one axis of scroll while capturing the other.

**Palm rejection on the web** is a heuristic you build on top of pointer data — the platform does not expose a "palm" flag. Common strategies: treat `pointerType === "pen"` as authoritative and ignore/deprioritize concurrent `touch` pointers while a pen is active or hovering; use `width`/`height` (large contact area ≈ palm) and `pressure` to filter; drop touch pointers that begin shortly after a pen-down. Hardware palm rejection exists on the digitizer for pen-priority devices, but `touch-action: none` plus pen-priority logic is the portable approach. Accessibility caveat: `touch-action: none` can block user zoom (WCAG 1.4.4) — scope it to the canvas only.

---

## 2. Low-Latency Ink Rendering

### Canvas 2D/WebGL `desynchronized` hint

`canvas.getContext('2d' | 'webgl' | 'webgl2', { desynchronized: true })` lets the browser bypass the normal DOM compositor queue and, where possible, push the canvas buffer closer to the display controller — cutting the input-to-photon latency that ruins hand-eye coordination above ~50 ms. Feature-detect via `ctx.getContextAttributes().desynchronized`. Caveats: context attributes are immutable after creation; for WebGL set `preserveDrawingBuffer: true` and draw to an offscreen framebuffer to avoid flicker; a desynchronized canvas can't have DOM elements composited above it. Best support is on Chromium/ChromeOS; it is a hint, so unsupported browsers silently ignore it.

### Ink API — delegated ink trails (`navigator.ink`)

The **Ink API** (`navigator.ink.requestPresenter({ presentationArea })` → `DelegatedInkTrailPresenter`) hands the *last leg* of an ink stroke to the OS compositor: on each `pointermove` you draw your committed stroke, then call `presenter.updateInkTrailStartPoint(event, { color, diameter })`, and the OS renders a trail ahead of the next JS frame in the given style. `expectedImprovement` reports the latency saved (ms). This is the lowest-latency inking primitive on the web — but it is **experimental, not Baseline**: shipped in Chromium/Edge, **not** in Safari or Firefox. Treat it as a progressive enhancement layered on top of your normal canvas renderer.

### OffscreenCanvas + Web Workers

`OffscreenCanvas` (via `canvas.transferControlToOffscreen()`) moves rendering off the main thread into a Worker — **Baseline / widely available since March 2023** (Chrome, Edge, Firefox, Safari 16.4+). For a note app this keeps ink rendering smooth while the main thread handles layout, autosave, and UI. Combine with a worker that owns the OPFS sync file handle for a fully off-main-thread render+persist loop.

### WebGL2 vs WebGPU for ink

- **WebGL2** — Baseline everywhere; the safe default for GPU-accelerated brush rendering, tessellated stroke geometry, and large canvases.
- **WebGPU** — as of late 2025 it is shipped by default in **all major browsers**: Chrome/Edge 113+ (Win/macOS/ChromeOS), Chrome 121+ on Android 12+, **Firefox 141+ (Windows), Firefox 145+ (Apple-Silicon macOS)**, and **Safari 26** (macOS Tahoe 26, iOS 26, iPadOS 26, visionOS 26). Caveats: Linux, Android (Firefox), and Intel Macs still lag. WebGPU gives compute shaders (for stroke smoothing, blending, ML brushes) and lower CPU overhead, but you must ship a WebGL2 fallback for older devices.

---

## 3. Local Storage & Files

### OPFS (Origin Private File System) — the performance tier

`navigator.storage.getDirectory()` returns the origin-private root (`FileSystemDirectoryHandle`). The key feature is **`fileHandle.createSyncAccessHandle()`** — a synchronous, in-place `read()/write()/truncate()/flush()/getSize()` API that is **Worker-only** and dramatically faster than IndexedDB, ideal for large ink/document blobs and for **WASM SQLite** (SQLite stores its whole DB in one file). Support: **Chrome/Edge 86+, Firefox 111+, Safari 15.2+** (OPFS itself is broadly available; sync access handles are the newer part). OPFS data is invisible to the user and evictable by default (see persistence).

### IndexedDB & Web Storage

- **IndexedDB** — the Baseline structured store for notes/metadata; large quotas (see below). Wrap writes in try/catch for `QuotaExceededError`. Libraries: Dexie.js (ergonomics), RxDB (reactive/sync).
- **`localStorage`/`sessionStorage`** — hard ~5 MiB each (10 MiB total), synchronous, string-only. Use only for small prefs, never note content.

### Quotas, eviction & persistent storage

Quotas are computed as a share of disk (to resist fingerprinting), *not* fixed megabytes on modern browsers:

- **Chrome/Edge**: up to ~60% of total disk per origin (best-effort and persistent).
- **Firefox**: best-effort = min(10% of disk, 10 GiB) per *site group*; persistent up to 50% of disk (cap 8 TiB).
- **Safari/WebKit (17.0+)**: browser apps get up to ~60% per origin / ~80% overall; **non-browser WebView apps get only ~15% / ~20% overall**; cross-origin frames get ~1/10 of the parent quota. Safari 17 removed the old storage-permission prompts and the legacy ~1 GB cap.

**Eviction**: best-effort storage is LRU-evicted under disk pressure (all of an origin's data is dropped together for consistency). WebKit additionally evicts script-writable storage for origins with **no user interaction for 7 days** (Intelligent Tracking Prevention). Mitigation: **`navigator.storage.persist()`** requests persistent mode (only the user can then clear it); WebKit grants it heuristically, notably for **Home-Screen web apps**. Best practice: call `persist()` from a user gesture *when saving critical data*, not on load; check headroom with **`navigator.storage.estimate()`** (`{usage, quota}`). Note: a widely-cited "50 MB / 7-day cache wipe" figure for iOS is **outdated** post–Safari 17 for installed/interacted web apps, though the 7-day ITP eviction still applies to un-interacted origins.

### File System Access API (local disk)

`showOpenFilePicker()`, `showSaveFilePicker()`, `showDirectoryPicker()` give read/write access to user-chosen files/folders on the real disk (with persistable permissions) — perfect for "open/save .md/.pdf, work in a folder" workflows. **Support is Chromium-only** (Chrome/Edge/Opera 86+, desktop): **Safari and Firefox do not implement the pickers** (they support only OPFS). For cross-browser save/open you need a fallback (`<input type=file>` + download, or the `browser-fs-access` ponyfill). Not available on mobile browsers.

---

## 4. PWA / Installability / OS Integration

- **Manifest + service worker + offline**: Baseline for installability and offline caching (Workbox is the standard SW toolkit for precache/runtime strategies). Works on Chromium (rich install UX with `beforeinstallprompt`) and, more manually, on Safari via "Add to Home Screen".
- **File Handling API** (`file_handlers` manifest member + `launchQueue.setConsumer` → `LaunchParams.files` of `FileSystemFileHandle`): register the PWA as the OS handler for `.md`, `.pdf`, etc. **Chromium desktop only.**
- **Launch Handler API** (`launch_handler` / `client_mode`): control focus-existing vs new-window on launch. Chromium.
- **Badging API** (`navigator.setAppBadge()`): unread/count badge on the app icon. Chromium desktop; **iOS 16.4+ supports it for installed web apps** (not in the EU alternative-browser regime).
- **Web Share Target** (`share_target` manifest member): receive shares from other apps (files need `method: POST`, `enctype: multipart/form-data`). Chromium/Android and installed PWAs; not Safari.
- **Web Share API** (`navigator.share()` / `navigator.canShare()`, incl. files): send content to the OS share sheet. Requires secure context + user gesture. Works on **Chrome (desktop+Android), Safari (macOS+iOS), Edge**; **Firefox limited**.
- **iOS/iPadOS PWA limits** (the binding constraints): no automatic install prompt (manual Add to Home Screen); **push notifications require iOS 16.4+ and Home-Screen install**; **no** Background Sync, Periodic Background Sync, Background Fetch, Web Bluetooth/NFC/USB/Serial, File System Access pickers, or Contact Picker; aggressive cache/storage eviction; EU (iOS 17.4+) has at times degraded standalone PWA behavior. Minimum for "real" PWA features on iOS is **16.4**.

---

## 5. Audio, Speech & Media

### Recording audio (Opus)

- **MediaRecorder** — Baseline for capturing mic to a container. Chrome/Firefox default to **`audio/webm; codecs=opus`** or `audio/ogg; codecs=opus`. **Safari added WebM/Opus recording in iOS/iPadOS/macOS 18.4 (March 2025)** (previously Safari preferred `audio/mp4`) — so `audio/webm;codecs=opus` now works cross-browser, but you should still **feature-test with `MediaRecorder.isTypeSupported()`** and fall back to `audio/mp4`.
- **WebCodecs** (`AudioEncoder`/`AudioDecoder`, Worker-only) — low-level, hardware-accelerated codec access (Opus, AAC; MP3 decode-only; PCM). Unlike MediaRecorder it does **not** mux to a playable file — you pair it with a muxer library (e.g. mediabunny/webm-muxer). Use it for precise Opus encoding, live streaming, trimming, or waveform processing of voice notes. Support: full in Chromium, good in Safari, emerging/limited in Firefox.

### Speech-to-text (dictation)

- **Web Speech API `SpeechRecognition`** (`webkitSpeechRecognition` prefix): `continuous`, `interimResults`, `lang`, `maxAlternatives`. **Not Baseline.** Traditionally Chrome sent audio to Google servers (no offline). Two shifts matter for a note app: **Safari supports on-device recognition** (14.1+ macOS / 14.5+ iOS, `webkitSpeechRecognition`) with the language pack installed, and **Chrome 139 added an on-device/offline Web Speech mode** with new `SpeechRecognition.available()` / `install()` and `processLocally` controls. Firefox support is minimal.
- **On-device via WASM** (privacy/offline guarantee): **whisper.cpp** compiles OpenAI Whisper to WebAssembly (`whisper.wasm`, `stream.wasm`), using WASM SIMD and threads. Tiny/base models (~270–390 MB RAM) are browser-feasible for offline transcription; threading needs **cross-origin isolation** (see COOP/COEP). This is the route for fully offline, private voice-note transcription independent of browser speech support.
- **SpeechSynthesis** (TTS) is broadly supported for reading notes aloud.

---

## 6. Clipboard, Handwriting-Adjacent I/O

**Async Clipboard API** (`navigator.clipboard`, secure context):

- `writeText()`/`readText()` — Baseline.
- `write([ClipboardItem])` / `read()` — supports **images** (`new ClipboardItem({ "image/png": blob })`) for pasting a note page as an image or pasting screenshots in. **Safari quirk**: it requires the `ClipboardItem` value to be a **Promise** resolving to the blob, and is strict about a direct **user gesture**; Chromium accepts blobs or promises and honors the Permissions API (`clipboard-read`/`clipboard-write`), which Safari/Firefox do not. Image write works in Chrome and Safari; image read is more limited in Safari/Firefox. Always run clipboard calls inside a user-activation handler.

---

## 7. Authentication & Identity

- **WebAuthn / passkeys** — Baseline (all major browsers since ~Sept 2021). `navigator.credentials.create/get`, platform (Touch ID/Face ID/Windows Hello) vs cross-platform (security keys) authenticators, **discoverable credentials** (passkeys), and **conditional mediation** (`mediation: "conditional"` + `autocomplete="username webauthn"`) for autofill-style passkey sign-in. Synced passkeys via iCloud Keychain / Google Password Manager / Microsoft. This is the recommended primary auth for a modern note app (phishing-resistant, passwordless).
- **Sign in with Google (Google Identity Services)** — the current SDK (replaces `gapi.auth2`). Splits **authentication** (returns an ID token / JWT, One Tap, personalized button, CSRF protection built in) from **authorization** (OAuth 2.0 code/access tokens for API access). 
- **MSAL.js** (`@azure/msal-browser`, plus `msal-react`/`msal-angular`) — Microsoft Entra ID / personal Microsoft account sign-in via PKCE auth-code flow; manages a token cache and silent refresh; used to obtain Microsoft Graph tokens (e.g., OneDrive). ADAL is end-of-life — MSAL only.
- **Sign in with Apple JS** (`AppleID.auth`) — button + popup/redirect flow returning an identity token (JWT). Requires an Apple Developer account, a **Services ID** as the client ID, a verified domain, and HTTPS. Feasible for web, but the heaviest setup of the three; Apple mandates offering it in some App Store contexts, less relevant for a pure web app.

---

## 8. User-Owned Cloud Storage

- **Google Drive API + Picker** — the Picker (`PickerBuilder`, client-side JS) is a polished "open from Drive" dialog; combined with the Drive API and the **`drive.file` scope** (access limited to files the app creates or the user explicitly opens via the Picker) it lets users keep notes in *their own* Drive without the app requesting full-Drive access. `drive.file` is the privacy-preserving, less-scrutinized scope; full `drive` scope triggers Google's restricted-scope security review. Strong fit for cross-platform user-owned storage.
- **OneDrive via MSAL + Microsoft Graph** — analogous: sign in with MSAL, request Graph `Files.*` scopes, read/write the user's OneDrive.
- **iCloud via CloudKit JS** — accesses a CloudKit container's **public/private databases** from JavaScript; user signs in with Apple ID; needs an Apple Developer account, a container, an API/web token, and domain allowlisting. Feasible as zero-backend user storage **but only for Apple-ID users** — poor fit as a primary cross-platform store, viable as an Apple-ecosystem option. (CloudKit JS has seen limited investment; treat long-term reliability as a risk — unverified.)

---

## 9. WebAssembly Building Blocks

- **PDF rendering: pdf.js** — Mozilla's HTML5/JS PDF engine (built into Firefox; `pdf.js` + `pdf.worker.js`), renders pages to canvas and provides an annotation/text layer. Broad browser support. For heavier fidelity, **PDFium compiled to WASM** is an alternative. Core for viewing/annotating PDFs in a note app.
- **OCR: tesseract.js** — Tesseract compiled to WASM, 100+ languages, runs in a Worker (`createWorker` → `recognize` → `terminate`); v5 cut file sizes (54% EN / 73% ZH) and ~50% first-run time. Extracts text from photographed pages/whiteboards (handwriting recognition is weak — for handwriting prefer Scribble/Ink-to-text services or a dedicated model). Does not handle PDFs directly.
- **Speech: whisper.cpp WASM** — see §5 (offline transcription; needs threads → cross-origin isolation).
- **Sync/collab: Yjs** — a CRDT (conflict-free replicated data type) exposing shared `Y.Text`/`Y.Array`/`Y.Map`/`Y.XmlFragment`. Providers separate concerns: **`y-indexeddb`** (offline persistence), **`y-websocket`** (server sync), **`y-webrtc`** (P2P), plus managed backends (Hocuspocus, Liveblocks). State-vector diffing syncs only deltas; updates are commutative/idempotent → offline-first, real-time collab merging without conflicts. JS-native, with Rust (`yrs`/`y-crdt`) bindings. The standard choice for collaborative + offline notes.
- Also relevant: **SQLite WASM** (official build) over OPFS sync handles for a real local DB.

---

## 10. Security Hardening

- **CSP** — prefer a **strict, nonce-based** policy (`script-src 'nonce-{random}' 'strict-dynamic'; object-src 'none'; base-uri 'none'`) over host allowlists. For WASM add **`'wasm-unsafe-eval'`**. `strict-dynamic` lets trusted scripts load their own chunks.
- **Trusted Types** (`require-trusted-types-for 'script'`, `trusted-types <policy>`) — forces DOM-sink writes (`innerHTML`, etc.) through a sanitizing policy (pair with DOMPurify); kills DOM-XSS, important when rendering user note HTML/markdown.
- **COOP + COEP** (`Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy: require-corp`) — establish **cross-origin isolation** (`self.crossOriginIsolated`), the prerequisite for **`SharedArrayBuffer`**, high-resolution timers, and **multithreaded WASM** (whisper.cpp threads, ffmpeg.wasm, skwasm). Cost: every cross-origin subresource must send CORP/CORS; deploy with `-Report-Only` first. This is a real deployment decision — isolate the app on its own origin.
- **SRI** (`integrity="sha384-…"` + `crossorigin`) — pin CDN scripts/styles/modulepreloads to a hash so a compromised CDN can't inject code; enforce fleet-wide with the newer `Integrity-Policy` header. Widely supported.

---

## 11. WebView Limitations

Running the note app inside a native shell (WKWebView on iOS, Android System WebView, Electron/Tauri) changes the rules:

- **iOS WKWebView** must use WebKit; it historically **lacked features Safari has** (some PWA/push/service-worker behaviors, IndexedDB quirks in older versions) and, per WebKit's storage policy, a **non-browser app's WebView gets only ~15% disk quota / ~20% overall** vs ~60%/80% for Safari and Home-Screen web apps — a hard storage disadvantage for a WebView-wrapped note app on iOS.
- **Android WebView** tracks Chromium closely but trails full Chrome; some capability APIs (File System Access, WebGPU availability, install prompts) may differ by device/OEM and update cadence.
- General WebView caveats: no PWA install/badging/file-handling, restricted background execution, inconsistent autofill/passkey UX, and the host app must grant camera/mic/clipboard bridges. For a pen-first app, prefer **Safari/Chrome as an installed PWA** over a thin WebView wrapper where possible; use Tauri/Electron (desktop) or Capacitor (mobile) only when you need native APIs, and budget for the WebView quota/feature gaps.

---

## Feature → API map

| Note-app feature | Primary API(s) | Notes / fallback |
|---|---|---|
| Pen strokes with pressure/tilt | Pointer Events (`pressure`, `tiltX/Y`, `twist`, `altitudeAngle`, `azimuthAngle`, `pointerType`) | Baseline; altitude/azimuth need Safari 18.2+ |
| Smooth high-Hz curves | `getCoalescedEvents()`, `pointerrawupdate` | Safari 18.2+, Chromium; secure context |
| Draw-ahead / low latency | `getPredictedEvents()`, Ink API `DelegatedInkTrailPresenter` | Ink API Chromium-only; canvas `desynchronized` hint everywhere it's honored |
| Lowest paint latency | `getContext('2d',{desynchronized:true})` | feature-detect via `getContextAttributes()` |
| Off-thread rendering | OffscreenCanvas + Worker | Baseline since 2023 |
| GPU ink | WebGL2 (default), WebGPU (Chrome/Edge/FF141+/Safari 26) | ship WebGL2 fallback |
| Disable scroll/zoom on canvas | CSS `touch-action: none`/`manipulation` | Baseline |
| Palm rejection | pen-priority heuristics on Pointer Events (`pointerType`, `width/height`, `pressure`) | no native palm flag |
| Handwriting→text (system) | Scribble (iPadOS, automatic in DOM text fields) | not scriptable |
| Handwriting/photo OCR | tesseract.js (WASM) | Worker; weak on cursive |
| Fast local file store | OPFS + `createSyncAccessHandle()` (Worker) | Chrome/Edge/FF111+/Safari 15.2+ |
| Structured store | IndexedDB (Dexie/RxDB), SQLite WASM on OPFS | Baseline |
| Big-quota persistence | `navigator.storage.persist()` + `estimate()` | guards against eviction |
| Open/save real files | File System Access (`show*Picker`) | Chromium desktop only; `browser-fs-access` fallback |
| Install / offline | Web App Manifest + Service Worker + Workbox | manual A2HS on iOS |
| Open file types via app | `file_handlers` + `launchQueue` | Chromium desktop |
| App icon badge | `navigator.setAppBadge()` | Chromium + iOS 16.4+ |
| Receive shares | `share_target` manifest | Chromium/Android PWAs |
| Send shares | `navigator.share()` / `canShare()` | Chrome/Safari/Edge; FF limited |
| Copy/paste images | Async Clipboard `write([ClipboardItem])` | Safari needs Promise value + gesture |
| Voice notes (record) | MediaRecorder (Opus), WebCodecs `AudioEncoder` | Safari WebM/Opus since 18.4; test `isTypeSupported()` |
| Dictation | Web Speech `SpeechRecognition`; whisper.cpp WASM (offline) | Chrome 139 + Safari on-device; whisper needs COOP/COEP |
| Read aloud | SpeechSynthesis | broad |
| PDF view/annotate | pdf.js / PDFium WASM | broad |
| Passwordless auth | WebAuthn passkeys + conditional mediation | Baseline |
| Google/MS/Apple sign-in | GIS, MSAL.js, Sign in with Apple JS | all web-capable |
| User-owned cloud | Drive Picker + `drive.file`; Graph/OneDrive; CloudKit JS | CloudKit = Apple-ID only |
| Real-time + offline collab | Yjs CRDT + y-indexeddb/y-websocket/y-webrtc | offline-first |
| XSS/supply-chain defense | strict CSP + Trusted Types + SRI; COOP/COEP for isolation | COOP/COEP required for WASM threads |

## Browser support matrix

Legend: ✅ supported · ⚠️ partial/limited/behind-flag · ❌ not supported. "Safari iPadOS" = current iPadOS 17/18/26 unless noted.

| Capability | Chrome/Edge | Safari (iPadOS) | Firefox | Samsung Internet |
|---|---|---|---|---|
| Pointer Events + pressure/tiltX/Y | ✅ | ✅ | ✅ | ✅ |
| altitudeAngle / azimuthAngle | ✅ | ✅ (18.2+) | ⚠️ | ⚠️ |
| getCoalescedEvents / getPredictedEvents | ✅ | ✅ (18.2+; coalesced+predicted) | ⚠️ coalesced; predicted ❌ | ⚠️ |
| Apple Pencil / stylus hover | n/a (mouse hover ✅) | ✅ (16.1+, M2 iPad) | n/a | ⚠️ |
| `touch-action` | ✅ | ✅ | ✅ | ✅ |
| Canvas `desynchronized` | ✅ | ⚠️ (honored inconsistently) | ⚠️ | ✅ |
| Ink API (delegated trails) | ✅ | ❌ | ❌ | ✅ (Chromium) |
| OffscreenCanvas | ✅ | ✅ (16.4+) | ✅ | ✅ |
| WebGL2 | ✅ | ✅ | ✅ | ✅ |
| WebGPU | ✅ | ✅ (26) | ✅ (141 Win / 145 macOS) | ⚠️ |
| OPFS + sync access handle | ✅ (86+) | ✅ (15.2+) | ✅ (111+) | ✅ |
| IndexedDB | ✅ | ✅ | ✅ | ✅ |
| `storage.persist()` / `estimate()` | ✅ | ✅ (heuristic grant; A2HS helps) | ✅ | ✅ |
| File System Access pickers | ✅ (desktop) | ❌ | ❌ | ⚠️ (Android partial) |
| PWA install + Service Worker | ✅ | ✅ (manual A2HS) | ✅ (Android) | ✅ |
| File Handling / Launch Handler | ✅ (desktop) | ❌ | ❌ | ⚠️ |
| Badging API | ✅ (desktop) | ✅ (iOS 16.4+ installed) | ❌ | ⚠️ |
| Web Share Target | ✅ | ❌ | ❌ | ✅ |
| Web Share (`navigator.share`) | ✅ | ✅ | ⚠️ | ✅ |
| Async Clipboard image write | ✅ | ✅ (Promise+gesture) | ⚠️ | ✅ |
| MediaRecorder Opus (WebM) | ✅ | ✅ (18.4+; else mp4) | ✅ | ✅ |
| WebCodecs AudioEncoder | ✅ | ✅ | ⚠️ | ✅ |
| Web Speech recognition | ✅ (139+ on-device) | ✅ (on-device, webkit prefix) | ❌/⚠️ | ⚠️ |
| WebAuthn / passkeys | ✅ | ✅ | ✅ | ✅ |
| Conditional mediation (autofill passkeys) | ✅ | ✅ | ⚠️ | ⚠️ |
| Trusted Types | ✅ | ❌ (not yet) | ❌ (not yet) | ✅ |
| COOP/COEP isolation | ✅ | ✅ | ✅ | ✅ |
| SRI | ✅ | ✅ | ✅ | ✅ |
| Push notifications | ✅ | ✅ (16.4+, installed) | ✅ | ✅ |

*Samsung Internet is Chromium-based and generally tracks Chrome, so ✅/⚠️ mostly mirror Chrome with a lag; specific version parity is (unverified) for several rows.*

---

## Flutter Web (CanvasKit/skwasm) vs React (DOM/Canvas) for a Pen-First App

**Flutter Web** now renders exclusively through Skia-on-WASM (the old HTML/DOM renderer was removed in recent releases; exact version details unverified):

- **CanvasKit** — Skia compiled to WASM+WebGL; the default. Adds a sizable runtime download (CanvasKit is on the order of ~1.5 MB, less over Brotli/CDN caching, plus the app's own compiled Dart). Consistent, high-quality rendering across browsers.
- **skwasm** — newer, lighter Skia-WASM path using multithreading; **requires cross-origin isolation (COOP+COEP)** to run, which is a hard deployment constraint (see §10).
- **Pros for pen apps**: pixel-consistent canvas rendering, one codebase for mobile+web, strong custom-paint performance. **Cons**: large initial bundle/first-paint cost; **text input and accessibility are the weak spots** — text is painted (not real DOM), so IME/Scribble/native text selection, screen-reader semantics, and SEO all need extra work (Flutter injects a semantics layer, but it's not native DOM); links, copy/paste of rich text, and form autofill are clumsier. Because everything is a canvas, you also can't easily mix in HTML rich-text editors.

**React (DOM + Canvas)**:

- **Pros**: native DOM text editing/IME/Scribble/selection/a11y "for free"; far smaller baseline bundle (React ~40–45 KB gzipped core; you add only what you use); direct access to *every* API in this report (Pointer Events, OPFS, File System Access, WebCodecs, Ink API, etc.) without a framework bridge; incremental hydration and code-splitting keep first paint fast. **Latency** is excellent because you drive the raw `<canvas>` (2D `desynchronized`/WebGL2/WebGPU) yourself and get Ink API/coalesced/predicted events directly.
- **Cons**: you build the ink engine, undo stack, and cross-browser quirk handling yourself; text+canvas coordination (e.g., text boxes overlaid on ink) is your responsibility.

**Recommendation for a pen-first note app**: **React DOM shell + hand-rolled canvas ink layer** is the better fit in 2025–2026. It gives native text input/Scribble/accessibility (critical for a note app that mixes typed and handwritten content), the smallest latency path to Pointer Events + Ink API + `desynchronized` canvas, smaller bundles, and unmediated access to OPFS/File System Access/WebCodecs. Choose **Flutter Web** only if you already have a Flutter mobile app and want maximal code reuse and pixel-identical rendering, and can accept the bundle size, the COOP/COEP requirement (for skwasm), and the extra work on text input and accessibility.

---

## Sources

Pages fetched and read in full:

- https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
- https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents
- https://developer.chrome.com/blog/desynchronized
- https://developer.mozilla.org/en-US/docs/Web/API/DelegatedInkTrailPresenter
- https://webkit.org/blog/13399/webkit-features-in-safari-16-1/
- https://webkit.org/blog/16301/webkit-features-in-safari-18-2/
- https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
- https://web.dev/blog/webgpu-supported-major-browsers
- https://web.dev/articles/origin-private-file-system
- https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- https://webkit.org/blog/14403/updates-to-storage-policy/
- https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide
- https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
- https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API
- https://developers.google.com/identity/gsi/web/guides/overview
- https://developers.google.com/workspace/drive/picker/guides/overview
- https://learn.microsoft.com/en-us/entra/identity-platform/msal-overview
- https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js
- https://developer.apple.com/documentation/cloudkitjs
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
- https://web.dev/articles/coop-coep
- https://docs.flutter.dev/platform-integration/web/renderers
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
- https://github.com/yjs/yjs
- https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Associate_files_with_your_PWA
- https://github.com/mozilla/pdf.js
- https://github.com/naptha/tesseract.js
- https://github.com/ggml-org/whisper.cpp

Pages referenced via search-result snippets (not fully fetched):

- https://w3c.github.io/pointerevents/
- https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerrawupdate_event
- https://web.dev/articles/persistent-storage
- https://developer.chrome.com/docs/capabilities/web-apis/file-system-access
- https://developer.mozilla.org/en-US/docs/Web/API/Launch_Handler_API
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/share_target
- https://webkit.org/blog/16574/ (WebKit features in Safari 18.4 — MediaRecorder WebM/Opus; via snippet)
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen
- https://webkit.org/blog/13966/webkit-features-in-safari-16-4/
