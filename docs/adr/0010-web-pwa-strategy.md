# ADR-0010 — Web / PWA strategy

## Status

**Accepted** (targets M1 for the ink editor's web tier; PWA plumbing in M0/M1). Related:
[ADR-0001](0001-flutter-single-codebase.md) (single codebase),
[ADR-0011](0011-telemetry-and-diagnostics.md),
[ADR-0012](0012-native-plugin-strategy.md),
[`docs/architecture/overview.md`](../architecture/overview.md) (§2 tiers, §6 web isolates).
Primary research: `research/web-stylus-and-pwa-capabilities.md`,
`research/flutter-ink-stack.md`.

## Context

Web (PWA) is one of the five first-class surfaces (locked decision 1). But it is the
**constraining target**, and the honest research picture is mixed:

- **Flutter has no Impeller on web.** It renders through **CanvasKit** (Skia→WASM, main
  thread; default) or **skwasm** (Skia→WASM that can offload paint to a Worker but **requires
  WasmGC + cross-origin isolation**). The legacy HTML renderer is gone.
  (`research/flutter-ink-stack.md`.)
- **skwasm/WasmGC cannot run in any iOS browser** — every iOS browser uses WebKit, which
  lacks WasmGC. So iPad-Safari users of the web build get the **JS/CanvasKit** path
  automatically. `flutter build web --wasm` emits **both** WASM and JS and falls back at
  runtime (needs Flutter 3.24+). CanvasKit adds ~1.5 MB; skwasm ~1.1 MB — heavier first load
  than a hand-tuned JS app.
- **The web platform itself is capable** (`research/web-stylus-and-pwa-capabilities.md`):
  Pointer Events with pressure/tilt/`altitudeAngle`/`azimuthAngle` (Safari 18.2+),
  `getCoalescedEvents()`/`getPredictedEvents()` (Safari 18.2+, Chromium), the `desynchronized`
  canvas hint, the **Ink API** delegated-trail presenter (Chromium only), OffscreenCanvas,
  WebGL2/WebGPU, OPFS + sync access handles, IndexedDB, `storage.persist()`, WebAuthn, Web
  Speech, MediaRecorder/Opus, pdf.js, Yjs, whisper.cpp.
- **But most of those low-latency ink levers are not directly reachable through Flutter's
  canvas.** Flutter owns its rendering; we cannot trivially call the Ink API or set a
  `desynchronized` context on Flutter's internal canvas. So on web we largely get **Tier B**
  (pure-Flutter CanvasKit/skwasm) fidelity, targeting **≤ 30 ms on Chrome desktop**
  (decision 7) and best-effort elsewhere.
- **Flutter web's weak spots are text and accessibility:** text is *painted*, not real DOM, so
  IME, Apple Scribble (which only works in real DOM text fields), native selection,
  screen-reader semantics and SEO all need extra work. The research explicitly recommended a
  **React-DOM shell + hand-rolled canvas** for a pen-first web app. **We keep the locked
  Flutter decision for five-surface lock-step and record this as the top web risk**, with
  mitigations below.
- **iOS PWA limits are real:** manual Add-to-Home-Screen (no install prompt); push needs
  iOS 16.4+ **and** Home-Screen install; **no** Background Sync / Periodic Sync / Background
  Fetch / File System Access pickers; aggressive storage eviction. Minimum for "real" PWA
  features on iOS is 16.4.
- **Storage eviction threatens unsynced notes:** best-effort storage is LRU-evicted under disk
  pressure, and WebKit ITP evicts script-writable storage after **7 days without interaction**.

## Decision

**Ship the web target as a Flutter Web PWA (CanvasKit default, with automatic JS fallback,
and skwasm where cross-origin isolation is deployable), positioned as "view + light-edit
first," with an explicit hardening + persistence + accessibility plan. Heavy inking is
steered to the installed native apps; the web editor must still meet the ≤ 30 ms Chrome-
desktop budget on Tier B.**

Concrete choices:

1. **Build:** `flutter build web --wasm` → emits WASM (skwasm) **and** JS (CanvasKit);
   runtime picks skwasm only where WasmGC + cross-origin isolation are present, else
   CanvasKit/JS. This guarantees the app runs in every supported browser incl. iOS Safari.
2. **Cross-origin isolation:** serve the app on **its own origin** with
   `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp`
   (or `credentialless`) so skwasm multithreading, `SharedArrayBuffer`, and whisper.cpp
   threads are available where supported. Roll out with `-Report-Only` first; every
   cross-origin subresource must send CORP/CORS.
3. **Persistence:** local store = **drift on SQLite-WASM over OPFS sync access handles** (in a
   Worker) for notes/op-log/blobs; small prefs in IndexedDB. Call
   `navigator.storage.persist()` **from a user gesture when saving critical data**, and check
   `navigator.storage.estimate()` for headroom. **Warn the user that un-synced web notes can
   be evicted** (7-day ITP / disk pressure) and nudge toward sign-in + cloud sync or install.
4. **PWA plumbing:** Web App Manifest + Service Worker (Workbox) for installability and
   offline; `file_handlers` + `launchQueue` to open `.sanenote`/`.pdf`/`.md` (Chromium
   desktop); `share_target` (Chromium/Android) and `navigator.share()` (Chrome/Safari/Edge);
   Badging where supported. Treat all of these as **progressive enhancements** behind feature
   detection.
5. **Accessibility & text:** enable Flutter's semantics layer; hand-author `Semantics` for the
   custom-painted canvas and provide **OCR-backed text alternatives** for handwritten content
   (decision 10). For heavy typed-text entry, **verify** whether an `HtmlElementView`-hosted
   DOM text field improves IME/Scribble/selection on web; if the painted-text UX misses the
   WCAG 2.2 AA bar, escalate (this is the recorded risk).
6. **On-device AI on web:** ML Kit is mobile-only, so web recognition uses a **Rust/WASM or
   whisper.cpp-WASM path**, gated behind cross-origin isolation; otherwise the feature is
   hidden on web (never silently sent to the cloud — decision 6).
7. **Latency levers (future, `verify`):** the Ink API / `desynchronized` canvas / coalesced
   events are **not** wired today because Flutter owns the canvas. Track Flutter engine
   support (and Skia Graphite/WebGPU) as the route to lower web ink latency; do not promise
   it now.

## Alternatives considered

| Option | Ink latency on web | Text/IME/Scribble/a11y | Code reuse | iOS reach | Verdict |
|---|---|---|---|---|---|
| **Flutter Web PWA, CanvasKit+skwasm, JS fallback (chosen)** | Tier B; ≤ 30 ms Chrome desktop; no Impeller | **Weak** — painted text; needs Semantics + OCR alts | **Maximal** — same app | Runs on iOS Safari via JS/CanvasKit (no WasmGC) | **Chosen** — honours the single-codebase lock; accepts the web ink/text compromise |
| Separate React DOM shell + hand-rolled canvas (research-preferred) | **Best** — direct Pointer Events, Ink API, `desynchronized`, coalesced/predicted | **Native** DOM text/IME/Scribble/selection/a11y | **None** — a second codebase | Strong | Rejected by locked decision 1; **recorded as the strongest web-only alternative** and the fallback if Flutter web can't meet the a11y/latency bar |
| Flutter Web skwasm-only (no JS fallback) | Slightly better where supported | Same weakness | Maximal | **Breaks iOS browsers** (no WasmGC) | Rejected — abandons iOS Safari |
| No web app / native-wrapped WebView | n/a | n/a | n/a | WebView on iOS gets only ~15% storage quota | Rejected — "try on web" is a core acquisition path; WebView quota + feature gaps are worse than a PWA |
| Flutter Web CanvasKit-only (no `--wasm`) | Tier B, main-thread paint | Same | Maximal | Universal | Viable simplest start; adopt skwasm later once COOP/COEP is deployed |

## Consequences

**Positive**

- One codebase still covers web; a browser user can open, read and lightly edit notes and
  "try on web" with no install.
- Automatic JS fallback means **it runs everywhere**, including iPad Safari.
- OPFS + drift/SQLite-WASM gives a real local database, not a toy store.
- PWA install unlocks push (iOS 16.4+), better storage persistence, and file handling on
  capable browsers.

**Negative / risks (tracked)**

- **Ink latency and fidelity are lower on web** than native; heavy inking is explicitly a
  native-app experience. The Ink API/`desynchronized` wins are out of reach through Flutter
  today.
- **Text input & accessibility are the top risk.** Painted text hurts IME/Scribble/selection/
  screen-reader semantics. Mitigations (Semantics, OCR alts, possible `HtmlElementView`) are
  `verify`-flagged; if they miss WCAG 2.2 AA, we escalate to the React-shell alternative for
  web only.
- **Bundle size / first paint** is heavier (CanvasKit ~1.5 MB + compiled Dart) → target
  < 3 s cold start on cached PWA (decision 7); use Brotli/CDN, lazy-load, and cache
  aggressively.
- **Storage eviction can lose un-synced web notes** → persist()-on-save + explicit user
  warning + nudge to sync/install; never treat web local storage as durable without sync.
- **COOP/COEP is a real deployment constraint** (own origin; all subresources send
  CORP/CORS).

## Security impact

- **Strict, nonce-based CSP:** `script-src 'nonce-{random}' 'strict-dynamic'; object-src
  'none'; base-uri 'none'`, plus **`'wasm-unsafe-eval'`** for the WASM runtime. Prefer this
  over host allowlists.
- **Trusted Types** (`require-trusted-types-for 'script'`) to kill DOM-XSS when rendering any
  user note HTML/markdown — pair with DOMPurify. **Note:** Trusted Types is **not yet in
  Safari/Firefox**, so it hardens Chromium and must not be the *only* XSS defence; sanitise
  regardless.
- **SRI** (`integrity="sha384-…"`) on any CDN script/style; enforce fleet-wide with
  `Integrity-Policy` where available.
- **COOP + COEP** for cross-origin isolation (also the prerequisite for multithreaded WASM);
  deploy behind `-Report-Only` first.
- **Zero-knowledge holds on web too:** notes and op-log are E2E-encrypted before any cloud
  write (`sane_crypto`); OPFS content is origin-private but **not** a security boundary
  against local malware — the crypto is. `flutter_secure_storage` on web uses experimental
  WebCrypto bound to localStorage (non-portable, HTTPS/localhost only) — treat web key
  storage as weaker and prefer deriving/wrapping keys that never persist in the clear.
- **Eviction is an availability/privacy consideration**, handled by persist() + sync nudges,
  not a confidentiality one (encrypted at rest regardless).
- Targets **ASVS 5.0 L2** for the web app (decision 8); web-specific controls recorded in
  `docs/security/threat-model.md`.

## How to verify

1. **Cross-browser matrix passes** (Chrome/Edge, Safari iPadOS, Firefox, Samsung Internet):
   open/read/light-edit a note; confirm JS/CanvasKit fallback engages on iOS Safari and
   skwasm engages where COOP/COEP + WasmGC are present.
2. **Latency:** `tools/perf_harness` (web mode) shows ≤ 30 ms pen-to-pixel on Chrome desktop
   for Tier B; recorded per release.
3. **PWA audit:** Lighthouse PWA passes (installable, offline, manifest, SW); cold start
   < 3 s on a cached install (decision 7).
4. **Persistence:** OPFS + drift/SQLite-WASM round-trips notes in a Worker; `persist()` is
   requested from a user gesture on critical save; the eviction warning is shown to
   un-synced web users.
5. **Security headers present:** CSP (nonce + strict-dynamic + wasm-unsafe-eval), COOP/COEP,
   SRI on CDN assets; ZAP baseline scan clean (decision 8).
6. **Accessibility:** screen-reader pass (VoiceOver/TalkBack via browser) over chrome; OCR
   text alternatives exist for handwritten content; WCAG 2.2 AA audit of the web chrome. If
   the painted-text UX fails, the escalation to a DOM/React web shell is opened as a decision.
