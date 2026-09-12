# Platform — Performance Budgets & CI Gates

> Audience: a coding agent building the perf harness and CI gates for Sane Notes with **zero
> prior context**. This doc turns locked decision 7 ("lag-proof") into **numeric budgets, a
> measurement method per budget, and pass/fail CI gates**. "Lag-proof" is the product's core
> promise — the incumbents' most-cited failure (`research/user-pain-points-and-market-gaps.md`)
> is lag and jank while writing. These budgets are **release-blocking on Tier 1 devices**
> ([`compatibility-matrix.md`](compatibility-matrix.md)).
>
> The harness lives in `tools/perf_harness`; reference-device configs in `tools/device_lab`.
> **MUST/SHOULD/MAY** are RFC-2119. Where a measurement technique is not yet proven on Flutter,
> it is marked **(verify)** — build the harness to confirm it, don't assume it.

---

## 1. The budgets (locked decision 7)

| # | Budget | Target | Applies to | Tier-1 gate device |
|---|---|---|---|---|
| **B1** | Pen-down → pixel latency | **≤ 16 ms** | iPad (ProMotion, native front-buffer) | iPad-Pro-ProMotion |
| **B2** | Pen-down → pixel latency | **≤ 25 ms** | mid-range Android (Ink API low-latency) | Android-tablet-stylus |
| **B3** | Pen-down → pixel latency | **≤ 30 ms** | Web, Chrome desktop | Web-Chrome-desktop |
| **B4** | Steady frame rate | **≥ 60 fps** floor everywhere; **120 fps** where the display allows | all supported devices | all Tier 1 |
| **B5** | Jank while writing | **no frame > 16.7 ms** during a stroke | all | all Tier 1 |
| **B6** | Cold start | **< 1.5 s** iPad · **< 2 s** mid Android · **< 3 s** web (cached PWA) | per surface | iPad-Air / Android-lowend / Web-Chrome |
| **B7** | Open a 1,000-page notebook | **< 1 s** to interactive | all | Android-tablet-stylus + iPad |
| **B8** | Scroll a 600-page PDF | **60 fps** sustained | all | Android-lowend + iPad |
| **B9** | Memory ceiling | **< 300 MB** | 4 GB Android | Android-lowend |
| **B10** | Battery, 2-hour writing session | **≤ 12 %** drain | iPad Pro | iPad-Pro-ProMotion |

These are **maximums/minimums, not averages**. Where a distribution matters (latency, frame
time) the gate is a **high percentile** (p95/p99), because a note app is judged by its worst
moments, not its median.

---

## 2. How each budget is measured

### B1–B3 Pen-to-pixel latency
**Definition:** time from the physical pen contact/movement to the corresponding pixel lit on
screen. This is the single most important number and the hardest to measure honestly —
software timestamps alone **undercount** it (they miss display scan-out and panel latency).

- **Ground-truth method (release-qualifying):** a **high-speed camera rig** (240–1000 fps)
  films the pen tip and the screen; count frames between contact and first ink. `tools/device_lab`
  documents the rig. This is the number quoted for the budget and is measured on the
  reference devices at least once per release candidate. **(verify)** the exact rig/fps.
- **Proxy method (per-commit CI):** instrument the ink pipeline to timestamp
  `pointer-event-received → sample-committed → frame-presented` and add a **fixed
  display-latency constant** per device (derived once from the camera rig) to estimate the
  end-to-end number. Gate CI on the proxy; validate the proxy against the camera rig each
  release. On web, use `event.timeStamp` → `requestAnimationFrame` present timing; account for
  `desynchronized` where used.
- **Both ink tiers measured** (per [`architecture/overview.md`](../architecture/overview.md)):
  (a) pure-Flutter Tier B, (b) Flutter + native front-buffer Tier A. This is exactly the
  **SN-INK p0 spike** in M0: if the native path can't hit B1/B2, the editor pivots to native
  views (the [ADR-0001](../adr/0001-flutter-single-codebase.md) exit criterion). The spike
  MUST report both numbers on all three reference devices.
- **Gate:** p95 latency ≤ budget on the gate device.

### B4 Frame rate
- **Method:** drive a scripted **worst-case writing + scroll** workload; sample frame
  timestamps. On Flutter use `SchedulerBinding`/`FrameTiming` (`buildDuration` +
  `rasterDuration`) or `flutter run --profile` timeline; on web use `requestAnimationFrame`
  deltas / `PerformanceObserver` `long-animation-frame`. Report **fps distribution**, not just
  mean.
- **Gate:** ≥ 60 fps sustained (no sustained dip below) on every Tier 1 device; on a 120 Hz
  panel, ≥ 120 fps during the same workload.

### B5 Jank
- **Method:** from the same `FrameTiming` stream, count frames whose **total build+raster time
  exceeds the frame budget** (16.7 ms at 60 Hz; 8.3 ms at 120 Hz — **verify** whether the gate
  uses the display's budget or the fixed 16.7 ms from decision 7; decision 7 says "no frame >
  16.7 ms", so 16.7 ms is the absolute ceiling and 120 Hz devices additionally SHOULD hit
  8.3 ms). Impeller removes shader-compile jank (compiled offline), so any jank is app logic —
  investigate it.
- **Gate:** **zero** frames over 16.7 ms during a scripted stroke on Tier 1 devices (allow a
  tiny tolerance only for the very first frame after cold start, documented).

### B6 Cold start
- **Method:** time from process launch to **first interactive frame** (library usable /
  editor ready to ink), not just first pixel. Android: `adb shell am start -W` (`TotalTime`)
  plus a Flutter "first-usable-frame" trace marker; iOS: Instruments App Launch + a trace
  marker; web: `navigator.serviceWorker` cache warm, then Largest-Contentful-Paint / a custom
  "interactive" mark on a **cached** (repeat) load.
- **Gate:** median over N launches < budget (1.5 s iPad / 2 s mid Android / 3 s web cached).
  Web first-ever (uncached) load is measured and reported but **not** gated to 3 s (that budget
  is the cached PWA).

### B7 Open a 1,000-page notebook
- **Method:** a generated 1,000-page fixture notebook (mixed ink + text + a few PDFs). Time
  from "open" to **first page interactive** with lazy load of the rest. Reuses the local store
  (`drift`/SQLite) + content-addressed blob store; MUST NOT deserialize all pages eagerly.
- **Gate:** < 1 s to interactive on iPad + Android-tablet-stylus.

### B8 Scroll a 600-page PDF
- **Method:** a 600-page PDF fixture; scripted fling/continuous scroll; measure fps as B4 while
  pages render via `pdfrx`/pdfium (tile/page cache in `sane_pdf`/`sane_render`).
- **Gate:** 60 fps sustained on Android-lowend + iPad; no page-load stall > one frame budget
  visible as a blank page during a normal-speed scroll.

### B9 Memory
- **Method:** run a **long mixed session** (write, scroll a big PDF, open several notebooks) on
  the 4 GB Android reference; sample **PSS/RSS** (`adb shell dumpsys meminfo`) and Dart heap
  (`dart:developer`/observatory). Report peak. Tile caches in `sane_render` MUST be
  memory-capped and evict off-screen tiles.
- **Gate:** peak < 300 MB on Android-lowend during the scripted session. An OOM or
  low-memory-kill is an automatic fail.

### B10 Battery
- **Method:** a scripted **2-hour continuous writing** session on iPad Pro at fixed brightness;
  record battery % (Instruments Energy Log / `UIDevice.batteryLevel` sampling). Isolate the app
  by disabling background noise.
- **Gate:** ≤ 12 % drain over 2 hours. Measured per release candidate (too slow for per-commit
  CI); a nightly/weekly job.

---

## 3. CI gate structure

Two cadences, because some budgets are fast and some are slow.

| Cadence | Budgets | Where | Blocking? |
|---|---|---|---|
| **Per-commit / PR** | B1–B3 (proxy), B4, B5, B6, B7 | `tools/perf_harness` on Tier 1 devices (or the closest available; latency proxy) | **Yes** — a PR that regresses a budget fails the check |
| **Nightly** | B1–B3 (proxy, full device set), B4–B9, plus golden re-render | full `tools/device_lab` | Yes — a nightly regression opens a release-blocking issue |
| **Per release candidate** | **B1–B3 camera-rig ground truth**, B8, B9, **B10** | physical device lab, human-supervised where needed (camera rig, 2 h battery) | **Yes** — RC cannot ship if any fails |

Rules:
- **No silent averaging.** Gates use p95/p99 (latency, frame time) and peak (memory), per §1.
- **Regression budget, not just absolute.** A PR that keeps a metric under the absolute budget
  but regresses it > X% vs the baseline SHOULD warn (and fail on a larger threshold) — perf
  rots by a thousand small cuts. Store per-device baselines; update them deliberately.
- **Both ink tiers tracked** for B1–B3 so the Tier-A-vs-Tier-B gap stays visible and the
  ADR-0001 exit criterion is continuously evaluated, not just at M0.
- **Emulators/simulators MUST NOT be a latency or fps gate** — they don't reflect real display/
  input latency. They MAY run functional/golden checks only.
- Results are published as a **trend dashboard** (per device, per budget, over time) so
  regressions are visible before they reach a gate.

---

## 4. Per-surface notes

| Surface | Binding budgets | Notes |
|---|---|---|
| **iPad** | B1 (16 ms), B4 (120 fps), B5, B10 | Native Metal front-buffer + `UIUpdateLink` low-latency path; `predictedTouches` to hide latency; estimated-property reconciliation must not stall the frame ([`ipad.md`](ipad.md)). |
| **Android tablet** | B2 (25 ms), B4, B5 | Jetpack Ink / `GLFrontBufferedRenderer` front-buffer; `requestUnbufferedDispatch` + motion prediction; Vulkan Impeller vs GL fallback both measured ([`android.md`](android.md)). |
| **Android low-end** | B6 (2 s), B8, B9 (300 MB) | The memory/thermal/cold-start floor; GL fallback path; degrade effects before dropping frames. |
| **Web** | B3 (30 ms Chrome), B6 (3 s cached) | CanvasKit baseline; Chromium Ink-API/`desynchronized` progressive enhancement; skwasm needs COOP/COEP; iOS browsers = CanvasKit only, best-effort not gated to B3 ([`web.md`](web.md)). |
| **Phones** | B4, B5, B6, B9 | Finger-ink smoothness (velocity width); capture cold-start; memory. iPhone has no pen so B1 doesn't apply, but finger ink MUST stay at B4/B5 ([`phones.md`](phones.md)). |

---

## 5. What to do when a budget fails

1. **Latency (B1/B2)** fails on the native path → this is the **product-defining** failure.
   Confirm with the camera rig; if the native front-buffer genuinely can't hit it, invoke the
   [ADR-0001](../adr/0001-flutter-single-codebase.md) exit criterion (editor pivots to native
   views, Dart core kept). Do not ship a laggy pen.
2. **fps / jank (B4/B5)** → profile build vs raster (`FrameTiming`); move work off the UI
   isolate (SQL, encryption, PDF raster, ML run on other isolates/native threads per
   [`architecture/overview.md`](../architecture/overview.md)); cache completed strokes as
   `Picture`/tiles so only the wet stroke repaints.
3. **Cold start (B6)** → defer heavy plugin init (ML, PDF, cloud SDKs) until first use;
   code-split web; lazy-open the last notebook.
4. **Notebook/PDF (B7/B8)** → lazy load; tile/page cache; never eager-deserialize.
5. **Memory (B9)** → cap and evict tile caches; stream blobs; check for retained isolates/
   images.
6. **Battery (B10)** → reduce continuous repaint (only wet stroke), lower prediction overdraw,
   coalesce sync, respect ProMotion adaptive refresh (don't force 120 Hz when idle).

---

## 6. Cross-references

- Ink render tiers & isolate/thread model: [`architecture/overview.md`](../architecture/overview.md)
- Single-codebase decision & latency exit criterion: [ADR-0001](../adr/0001-flutter-single-codebase.md)
- Reference devices & support tiers: [`compatibility-matrix.md`](compatibility-matrix.md)
- Per-surface ink paths: [`ipad.md`](ipad.md), [`android.md`](android.md), [`web.md`](web.md), [`phones.md`](phones.md)
- Pain points that motivate "lag-proof": `research/user-pain-points-and-market-gaps.md`
