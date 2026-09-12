# Platform — Compatibility Matrix & Support Tiers

> Audience: a coding agent (and release manager) that needs to know, for any given
> **OS × architecture × stylus × refresh rate × screen class**, whether Sane Notes is
> **CI-tested, manually tested, or best-effort**, and what the minimum bar is. This is the
> single source of truth for "do we support X?". It implements the supported-platform list
> in locked decision 7. Per-surface detail lives in [`ipad.md`](ipad.md),
> [`android.md`](android.md), [`web.md`](web.md), [`phones.md`](phones.md); numeric budgets
> in [`performance-budgets.md`](performance-budgets.md).
>
> **MUST/SHOULD/MAY** are RFC-2119. Sources: the four platform research files under
> [`../research/sources/`](../research/sources/).

---

## 1. Support tier definitions

| Tier | Meaning | Guarantee |
|---|---|---|
| **Tier 1 — Tested in CI device lab** | On a physical device in `tools/device_lab`, every release. Perf gates ([`performance-budgets.md`](performance-budgets.md)) and the automated functional/golden/integration suites run here. | A regression on Tier 1 **blocks the release**. Budgets MUST pass. |
| **Tier 2 — Manual** | Smoke-tested by a human each release on representative hardware; not in the automated gate. | MUST be functional; known cosmetic/perf gaps are documented, not release-blocking. |
| **Tier 3 — Best-effort** | Not routinely tested; expected to run because it meets the minimum OS/arch. | MUST launch and take a note; no perf guarantee; bugs fixed opportunistically. |
| **Unsupported** | Below the minimum bar. | App MAY refuse to install/run or show an "update your OS/browser" wall. |

The **minimum bar** (decision 7): iPadOS 17+, iOS 17+, Android 10+ (arm64-v8a / armeabi-v7a /
x86_64), Chrome/Edge 120+, Safari 17+, Firefox 125+, Samsung Internet. Anything below is
**Unsupported**.

---

## 2. Reference devices (CI device lab)

`tools/device_lab` holds the exact configs. These are the **Tier 1** machines.

| Slot | Device class | Why it's the reference |
|---|---|---|
| **iPad-Pro-ProMotion** | M-series iPad Pro, 120 Hz, Apple Pencil Pro | ≤ 16 ms pen-to-pixel budget; native Metal front-buffer path; 120 fps |
| **iPad-Air** | iPad Air (M-series), 60 Hz, Apple Pencil Pro/2 | non-ProMotion Apple ink; 60 fps floor on Apple |
| **iPhone-ref** | iPhone 15-class (A16), iOS 17+ | finger ink, capture, phone cold-start/memory |
| **Android-tablet-stylus** | Mid-range tablet + S Pen or USI (Snapdragon 7-class) | ≤ 25 ms pen-to-pixel budget; Jetpack Ink front-buffer |
| **Android-lowend** | 4 GB RAM, Snapdragon 680-class, Android 10–13 | memory < 300 MB, 60 fps floor, cold start < 2 s, Impeller GL fallback |
| **Android-A16** | Any device on Android 16 (API 36) | predictive back, edge-to-edge, 16 KB pages, forced resizability |
| **Web-Chrome-desktop** | Chrome (desktop) | ≤ 30 ms web ink budget; PWA/offline gates |

**Tier 2 manual pool:** base iPad (60 Hz, USB-C Pencil), iPad mini (A17 Pro), Pixel Tablet
(USI), a foldable (Galaxy Z Fold / Pixel Fold), a Chromebook (USI + ChromeOS note-taker),
Samsung Galaxy Tab (S Pen), Samsung Galaxy S-Ultra/Fold (S Pen phone), Safari iPadOS, Safari
macOS, Firefox, Edge, Samsung Internet.

---

## 3. OS version × architecture

### Apple (iPadOS / iOS)

| OS | Arch | iPad tier | iPhone tier | Notes |
|---|---|---|---|---|
| iPadOS/iOS 26 | arm64 | **Tier 1** | Tier 1 (iPhone-ref) | AI features (Foundation Models, SpeechAnalyzer, Vision Docs) require AI-capable HW + region |
| iPadOS/iOS 18–25 | arm64 | Tier 1/2 | Tier 2 | full ink; AI degrades to Vision OCR only |
| iPadOS/iOS 17 | arm64 | **Tier 2** (min bar) | Tier 2 (min bar) | minimum supported; no iOS-26 AI APIs |
| ≤ iPadOS/iOS 16 | — | **Unsupported** | Unsupported | below decision-7 floor |

### Android

| OS (API) | arm64-v8a | armeabi-v7a | x86_64 | Notes |
|---|---|---|---|---|
| Android 16 (36) | **Tier 1** | Tier 3 | Tier 2 (emulator/ChromeOS) | predictive back / edge-to-edge / 16 KB / forced resizability MUST be handled |
| Android 13–15 (33–35) | **Tier 1** | Tier 3 | Tier 2 | `FLAG_CANCELED` (13+), on-device `SpeechRecognizer` (13+), stylus handwriting (14+) |
| Android 10–12 (29–32) | **Tier 1** (low-end ref is here) | **Tier 3** | Tier 2 | min bar; Impeller Vulkan default; front-buffer available (29+) |
| ≤ Android 9 (≤28) | — | — | — | **Unsupported** (below API 29 floor) |

`arm64-v8a` is the primary 64-bit target and where the perf budgets are enforced.
`armeabi-v7a` (32-bit) is **Tier 3 best-effort** — it MUST run but has no perf guarantee and is
the most likely to hit the Impeller GL fallback. `x86_64` exists for emulators/ChromeOS.

### Web browsers

| Browser | Min | Renderer path | Ink | Tier |
|---|---|---|---|---|
| Chrome / Edge (desktop) | 120 | skwasm (WasmGC) where COOP/COEP set, else CanvasKit | ≤ 30 ms gate; Ink API + `desynchronized` progressive enhancement | **Tier 1** |
| Chrome (Android 12+) | 120 | CanvasKit (skwasm needs WasmGC + isolation) | best-effort | Tier 2 |
| Safari (iPadOS/iOS) | 17 | **CanvasKit only** (no WasmGC on WebKit) | Pointer + tilt (18.2+ altitude/azimuth); best-effort | Tier 2 |
| Safari (macOS) | 17 | CanvasKit | best-effort | Tier 2 |
| Firefox | 125 | CanvasKit (skwasm 120+ **(verify)**) | coalesced yes / predicted narrow; no FS Access; no Trusted Types | Tier 2 |
| Samsung Internet | current | Chromium-track | mirrors Chrome w/ lag (**unverified**) | Tier 2 |
| Other Chromium | — | CanvasKit | — | Tier 3 |
| IE / legacy / < min | — | — | — | **Unsupported** |

See [`web.md`](web.md) §2 for why iOS browsers never run skwasm.

---

## 4. Stylus types

| Stylus | Platform | Pressure | Tilt | Azimuth | Roll | Hover | Buttons | Tier |
|---|---|---|---|---|---|---|---|---|
| **Apple Pencil Pro** | iPad | ✅ | ✅ | ✅ | ✅ | ✅ | squeeze/double-tap | **Tier 1** |
| **Apple Pencil 2** | iPad | ✅ | ✅ | ✅ | ❌ | ✅ (M-iPad) | double-tap | **Tier 1** |
| **Apple Pencil USB-C** | iPad | ❌ **(verify)** | ✅ | ✅ **(verify)** | ❌ | ✅ | ❌ | Tier 2 |
| **Apple Pencil 1** | iPad | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | Tier 2 |
| **Samsung S Pen** | Android (Galaxy) | ✅ | ✅ | ✅ | ❌ | ✅ | barrel + BLE remote | **Tier 1** |
| **USI 2.0 pen** | Android / ChromeOS / Pixel Tablet | ✅ (up to 4096) | ✅ | ✅ | ❌ | ✅ **(verify per pen)** | varies | Tier 2 |
| **Generic active stylus** | Android | ✅ | varies | varies | ❌ | varies | varies | Tier 2/3 |
| **Finger** | all (default on phones) | ❌ (velocity width) | ❌ | ❌ | ❌ | ❌ | — | **Tier 1** |
| **Mouse/trackpad** | web/desktop/ChromeOS | ❌ | ❌ | ❌ | ❌ | hover | — | Tier 2 |

Brushes MUST feature-detect per connected stylus (see [`ipad.md`](ipad.md) §2,
[`android.md`](android.md) §4) and never assume a capability. Missing pressure → velocity-based
width.

---

## 5. Refresh rate × screen class

### Refresh rate

| Rate | Where | Budget | Tier |
|---|---|---|---|
| **120 Hz (ProMotion / high-refresh)** | iPad Pro, some Android tablets/phones | 120 fps target; ≤ 16 ms iPad ink | **Tier 1** (iPad Pro) |
| **90 Hz** | some Android | 90 fps; no frame > frame budget while writing | Tier 2 |
| **60 Hz** | base iPad, most phones/tablets, web | 60 fps **minimum floor**; ≤ 25 ms Android / ≤ 30 ms web ink | **Tier 1** |

The 60 fps floor is universal (decision 7); 120 fps is required **where the display allows**.

### Screen class (window size class)

| Class | Width | Devices | Layout | Tier |
|---|---|---|---|---|
| **Compact** | < 600 dp | phones, foldable cover, small split-view/slide-over | single-pane, bottom nav ([`phones.md`](phones.md)) | **Tier 1** |
| **Medium** | 600–839 dp | tablet portrait, unfolded foldable | list/detail, adaptive | **Tier 1** |
| **Expanded** | 840–1199 dp | tablet landscape | two-pane + rail | **Tier 1** |
| **Large** | 1200–1599 dp | large tablet, desktop web window | two-pane + rail, wider canvas | Tier 2 |
| **Extra-large** | ≥ 1600 dp | desktop / connected display / Stage Manager external | multi-column, additive windows | Tier 2 |

The class changes **at runtime** (rotation, multi-window, fold/unfold, window resize,
iPadOS 26 windowing) and MUST re-lay-out **without losing editor state**.

---

## 6. Feature availability by surface (quick reference)

✅ available · ⚠️ partial / device-gated / progressive enhancement · ❌ not available.

| Capability | iPad | iPhone | Android tablet | Android phone | Web |
|---|---|---|---|---|---|
| Native low-latency wet-ink (Tier A) | ✅ Metal front-buffer | ⚠️ finger | ✅ Jetpack Ink | ⚠️ finger / S Pen | ⚠️ Chromium JS-interop only |
| Pressure/tilt stylus | ✅ | ❌ (no Pencil) | ✅ | ⚠️ S Pen/USI only | ⚠️ browser-dependent |
| On-device handwriting → text | ✅ Vision | ✅ Vision | ✅ ML Kit | ✅ ML Kit | ❌ (Rust/WASM or cloud) |
| On-device LLM (summarize/tags) | ⚠️ iPadOS 26 + AI HW | ⚠️ iOS 26 + AI HW | ⚠️ Gemini Nano flagships | ⚠️ flagships | ❌ (cloud opt-in) |
| On-device transcription | ⚠️ iPadOS 26 | ⚠️ iOS 26 | ⚠️ GenAI alpha / platform | ⚠️ | ⚠️ whisper WASM (COOP/COEP) |
| PDF view + annotate | ✅ PDFKit/pdfium | ✅ | ✅ androidx.pdf/pdfium | ✅ | ✅ pdf.js/pdfium WASM |
| Biometric note lock | ✅ Face/Touch ID | ✅ | ✅ BiometricPrompt | ✅ | ⚠️ WebAuthn (not file-lock) |
| Hardware-backed keys | ✅ Secure Enclave | ✅ | ✅ StrongBox/TEE | ✅ | ❌ (WebCrypto only) |
| User-cloud sync | iCloud + Drive | iCloud + Drive | Drive (+SAF) | Drive (+SAF) | Drive/OneDrive/CloudKit JS |
| Background sync | ⚠️ limited | ⚠️ limited | ✅ SyncAdapter | ✅ | ❌ iOS / ⚠️ Chromium |
| Install / offline | App Store | App Store | Play | Play | PWA (A2HS on iOS) |
| Multi-window | ✅ iPadOS 26 (**verify** Flutter) | ❌ | ✅ large screen | ❌ | ⚠️ browser tabs |
| Quick capture (widget/control/pen) | ✅ | ✅ | ✅ | ✅ | ⚠️ share-target |

---

## 7. Release gate summary

A release is blocked unless, on **every Tier 1 slot** (§2):
1. The automated functional + golden + integration suites pass.
2. The perf budgets in [`performance-budgets.md`](performance-budgets.md) pass (latency, fps,
   jank, cold start, memory, PDF scroll, notebook open).
3. Store-compliance gates pass for the store surfaces (iOS privacy manifest / required-reason
   APIs; Android data-safety / 16 KB / target SDK — [`ipad.md`](ipad.md) §9,
   [`android.md`](android.md) §9).

Tier 2 is smoke-tested and its known gaps documented; Tier 3 must at minimum launch and take a
note.

---

## 8. Cross-references

- Apple surface: [`ipad.md`](ipad.md) · Android surface: [`android.md`](android.md) · Web:
  [`web.md`](web.md) · Phones: [`phones.md`](phones.md)
- Budgets & CI gates: [`performance-budgets.md`](performance-budgets.md)
- Ink tiers: [`architecture/overview.md`](../architecture/overview.md)
- Single-codebase decision & exit criterion: [ADR-0001](../adr/0001-flutter-single-codebase.md)
- Research: [`../research/sources/`](../research/sources/)
