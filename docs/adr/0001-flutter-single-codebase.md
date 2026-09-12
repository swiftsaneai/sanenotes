# ADR-0001 — Flutter single codebase for all five surfaces

## Status

**Accepted** (M0 Foundations). This is a *locked decision* (project decision 1). Research
that contradicts it (notably the corrected Goodnotes premise, below) is recorded as risk;
the decision stands, guarded by an explicit exit criterion.

Supersedes: none. Related: [ADR-0002](0002-monorepo-layout.md) (layout),
[ADR-0003](0003-state-management-and-app-structure.md) (app structure),
[ADR-0010](0010-web-pwa-strategy.md) (web), [ADR-0012](0012-native-plugin-strategy.md)
(plugins). See [`docs/architecture/overview.md`](../architecture/overview.md).

## Context

Sane Notes must ship on **five surfaces** — iPadOS, iOS, Android phone, Android tablet, and
Web (PWA) — with a *best-in-the-world* pen-first UX. The single biggest, most consistent
complaint about the incumbents (Goodnotes, Notability, OneNote, Samsung Notes) is
**platform inconsistency**: features and quality diverge across iPad, Android, Windows and
Web because each runs a different codebase or a different team. Our strategic wedge is the
opposite: **five surfaces in lock-step from one codebase.**

Constraints and forces:

- **Wet-ink latency is the product.** Perceived quality is dominated by pen-to-pixel latency
  (decision 7: ≤ 16 ms iPad, ≤ 25 ms mid-Android, ≤ 30 ms web Chrome). Whatever we choose
  must be able to hit these or degrade predictably.
- **We are agent-built.** The codebase is extended largely by autonomous coding agents. A
  single language with strong static analysis, hot reload, and a large training corpus is a
  real advantage. Dart qualifies.
- **Stylus telemetry must be first-class.** Pressure, tilt, orientation/azimuth, hover,
  distance, contact ellipse, barrel buttons — all needed for a serious brush engine.
- **Local-first, offline, cross-platform data** (CRDT op-log, SQLite, blob store) must run
  the same everywhere including web.
- **Team velocity:** one team, one language, hot reload beats N native teams racing each
  other (exactly the trap Goodnotes described avoiding).

What the research says (`research/flutter-ink-stack.md`):

- Flutter exposes the full stylus telemetry a pen app needs via `PointerEvent`/`PointerData`
  (pressure, tilt, orientation, distance, radius, `kind` incl. `stylus`/`invertedStylus`,
  barrel buttons). A raw `Listener` gives the uninterpreted stream.
- **Impeller** removes the historic shader-compilation jank that hurt ink apps (shaders are
  compiled offline at build time). On iOS Impeller is the only renderer; on Android it's
  default on API 29+ (Vulkan) with an automatic legacy-GL fallback.
- A **real, verifiable Flutter handwriting app exists**: **Saber** (open source, iOS/Android/
  Windows/macOS/Linux). Its maintainer also maintains the `perfect_freehand` Dart port — the
  leading pressure-stroke library is battle-tested inside a shipping handwriting app.
- A **native `Texture` fast-path** exists as an escape hatch: render the wet stroke in a
  native low-latency layer (Metal/CAMetalLayer on Apple; front-buffered/Jetpack Ink on
  Android) and composite it via the `Texture` widget, keeping the Dart core.
- **Fact correction (important):** the brief's premise that *Goodnotes uses Flutter / gave a
  "Flutter Forward 2023" talk* is **contradicted by the primary source.** Goodnotes' own
  web.dev case study says they **evaluated and rejected Flutter** and instead compiled their
  **Swift core to WebAssembly (SwiftWasm)** with a **TypeScript/React** UI shipped as a
  PWA/TWA. We therefore cite Goodnotes only as an *alternative considered* (shared core +
  per-platform UI), never as a Flutter precedent. Our real Flutter proof point is **Saber**.

Weaknesses the research is candid about (carried as risks below): no Impeller on web
(CanvasKit/skwasm instead; skwasm/WasmGC can't run in any iOS browser); on-device ML Kit
handwriting/OCR is mobile-only (no web); Dart SAST tooling is weaker (CodeQL has no Dart;
Semgrep-Dart is experimental; MobSF can't see the Dart AOT snapshot); obfuscation only
renames symbols.

## Decision

**Build Sane Notes as one Flutter application (latest stable, Dart 3) covering iPadOS, iOS,
Android phone/tablet and Web (PWA), with a thin native plugin layer for the capabilities
Flutter cannot deliver well.**

Specifics:

1. **Renderer:** Impeller on iOS/Android/desktop; CanvasKit (default) with automatic
   JS-fallback, plus optional skwasm where cross-origin isolation is available, on web
   ([ADR-0010](0010-web-pwa-strategy.md)).
2. **Ink engine:** raw `Listener` → `sane_ink` (wrapping `perfect_freehand`) → `CustomPainter`
   inside a `RepaintBoundary`; finished strokes flattened into cached `Picture`/tiles. This
   is **Tier B** (pure-Flutter), available on every surface.
3. **Native wet-ink fast path (Tier A):** a federated plugin `sane_ink_surface` renders the
   *wet* stroke on a native front-buffer (Metal on Apple; Jetpack Ink + `androidx.graphics.
   lowlatency` on Android) composited via `Texture`, used where the latency budget demands it.
4. **Native plugin layer** (Swift/Kotlin/web-JS) for: low-latency ink surface, stylus extras,
   Scribble, on-device ML, secure storage, cloud-drive access, PDF acceleration
   ([ADR-0012](0012-native-plugin-strategy.md)).
5. **Rust core via `flutter_rust_bridge` v2 is an allowed *later* optimisation**, not an M0
   commitment, for CRDT and ink hot paths (see trigger conditions below).
6. **Risk gate (p0 spike `SN-INK`, milestone M0):** measure pen-to-pixel latency of (a) pure
   Flutter canvas (Tier B) and (b) Flutter + native wet-ink platform view (Tier A) on **three
   reference devices** (iPad ProMotion, mid-range Android, low-end 4 GB Android). **Exit
   criterion:** if the decision-7 budgets cannot be met by Tier A *or* Tier B on a target
   surface, that surface's **editor pivots to native views while the Dart core is kept**.
   This ADR is the record of that exit criterion.

**Rust-core trigger conditions** (revisit this ADR / open a new one if any holds): Dart CRDT
merge or stroke tessellation becomes a measured bottleneck against decision-7 budgets on the
low-end reference device; or we need to share a single ink/CRDT core with a non-Flutter
surface; or a mature Rust CRDT (Automerge/Loro) materially beats the Dart implementation on
memory/merge time. FRB v2 supports web via WASM, so a Rust core does not by itself break the
web target.

## Alternatives considered

| Option | Stylus telemetry | Wet-ink latency | Web story | Code sharing | DevSecOps (SAST) | Verdict |
|---|---|---|---|---|---|---|
| **Flutter + optional Rust core (chosen)** | Full via `PointerEvent`/`PointerData` | Very good with Impeller; native `Texture` fast-path in reserve | Yes (CanvasKit/skwasm) but heavy; no WasmGC in iOS browsers | **Highest** (UI + logic, one team) | Weaker: no CodeQL-Dart, Semgrep-Dart experimental, MobSF can't read Dart snapshot | **Chosen** — best reach-per-effort; Impeller kills classic ink jank; Saber proves feasibility; native fast-path de-risks latency |
| Expo / React Native + `@shopify/react-native-skia` | Via RN gesture/Skia; per-field pressure/tilt exposure thinner *(verify)* | Skia canvas capable; JS bridge/reconciler can add overhead at extreme ink rates | **Strong** (react-native-web + Skia); often the better *web* story | High (UI + logic) | Best: CodeQL + Semgrep GA + npm audit | Rejected — strongest only if web is #1 priority or team is JS-native; weaker native pen fidelity, bridge risk at high Hz |
| Native Swift/Kotlin UIs + shared Rust core | Best/most direct (PencilKit, Android `MotionEvent` coalesced/historical) | **Best** (front-buffered/PencilKit) | Separate web build entirely | **Lowest** (logic via Rust only; 2–3 UIs) | Best (CodeQL + MobSF full) | Rejected — best pen fidelity but most expensive to ship four+ surfaces; contradicts the lock-step wedge |
| Goodnotes-style Swift core → WebAssembly + per-platform UI (TS/React) | Native on Apple; web via JS pointer events | Good on Apple; web good | Yes (PWA/TWA, SwiftWasm) | Medium (shared core, N UIs) | Mixed | Rejected — heavy for a greenfield team without an existing Swift core; N UIs reintroduce the inconsistency we're attacking. *This is what Goodnotes actually did, per web.dev — cite here, not as a Flutter precedent* |
| Kotlin Multiplatform + Compose Multiplatform | Good on Android; iOS/desktop maturing | Good; iOS Compose newer | Compose-web/WASM immature for ink *(verify)* | High (logic; UI shared via Compose) | Kotlin CodeQL good | Rejected — iOS + web ink maturity behind Flutter today; smaller ink ecosystem; no Saber-equivalent proof point |

## Consequences

**Positive**

- One team, one language, hot reload; five surfaces move together — directly attacks the
  incumbents' inconsistency.
- Impeller removes first-use shader jank, the classic ink artifact.
- Dart's strong static analysis + large corpus suits agent-driven development.
- The native `Texture` fast-path and the FRB Rust-core option are **de-risking levers kept in
  reserve**, not up-front costs.
- The exit criterion means we can't be trapped: if Flutter ink can't hit budget somewhere, we
  pivot that surface's editor to native views without throwing away the Dart core.

**Negative / costs**

- **Web is a compromised ink target.** No Impeller; CanvasKit/skwasm are heavier downloads;
  WasmGC (skwasm) can't run in any iOS browser; the Ink API / `desynchronized` canvas /
  coalesced-event levers aren't directly reachable through Flutter's canvas. Web is "view +
  light-edit first" ([ADR-0010](0010-web-pwa-strategy.md)).
- **Flutter web text input & accessibility are weak** (painted text, injected semantics
  layer): IME, Scribble, native selection, screen-reader semantics all need extra work. The
  research explicitly preferred a React-DOM web shell for a pen app; we keep the Flutter
  decision for lock-step and record this as the top web risk.
- **On-device handwriting/OCR (ML Kit) is mobile-only** — web needs a separate Rust/WASM or
  cloud path ([ADR-0012](0012-native-plugin-strategy.md), `sane_ml`).
- **Weaker Dart SAST** — mitigations in Security impact.
- **Fast-moving deps** (google_sign_in v7, file_picker v12, riverpod v3) mean upgrade churn;
  pin versions and gate bumps behind integration tests.

**Neutral**

- Some pen fidelity ceiling below fully-native PencilKit is accepted in exchange for reach;
  the fast-path narrows the gap. We validate with our own iPad latency spike, not vendor
  claims.

## Security impact

- **Dart AOT is reversible; `--obfuscate` only renames symbols** (enum names survive; web
  can't obfuscate, only minify). Therefore: **no secrets in the client**, ever; server-
  authoritative checks; all config via `--dart-define`/CI secrets
  ([overview §7](../architecture/overview.md#7-build-flavours--the---dart-define-matrix)).
- **SAST gap:** CodeQL does not support Dart; Semgrep-Dart is Experimental; MobSF cannot read
  the Dart AOT snapshot (`libapp.so`). **Mitigation:** layer Semgrep with **custom Dart rules**
  (hardcoded secrets, insecure storage, deep-link handling), **OSV-Scanner** on `pubspec.lock`,
  `very_good_analysis` as a gate, CodeQL for the **Swift/Kotlin/JS** plugin+web layers, MobSF
  on release candidates (manifest/permission/secret findings only), and manual review of
  security-critical Dart (`sane_crypto`, `sane_sync`, auth).
- **Native plugin surface** (deep links, method-channel payloads, cloud SDKs) is real attack
  surface; validated in [ADR-0012](0012-native-plugin-strategy.md).
- Meets the intent of MASVS L2 / ASVS L2 (decision 8) provided the above compensating
  controls; recorded in `docs/security/threat-model.md`.

## How to verify

1. **The M0 `SN-INK` latency spike runs and is recorded.** `tools/perf_harness` reports
   pen-to-pixel latency for Tier A and Tier B on the three reference devices; a written
   decision (pass, or pivot-to-native for a surface) is committed. This ADR's exit criterion
   is satisfied only when that document exists.
2. **CI perf gate** enforces decision-7 budgets on every PR that touches the draw path
   (≤ 16 ms iPad / ≤ 25 ms mid-Android / ≤ 30 ms web Chrome; 60 fps floor; no frame > 16.7 ms
   while writing).
3. **Impeller confirmed active** on iOS/Android target builds (no unexpected Skia fallback on
   Android API 29+); web build produces both WASM and JS outputs with automatic fallback.
4. **`very_good_analysis` + `dart analyze --fatal-infos` + `dart format --set-exit-if-changed`
   are green**; OSV-Scanner and Semgrep (with custom Dart rules) run in CI; CodeQL covers the
   Swift/Kotlin/JS layers.
5. **No secret strings in the client** — gitleaks in CI, plus a release check that the app
   reads all IDs/secrets from `--dart-define`/CI secrets.
6. **A Tier-B path exists and works headless-of-native** — the editor renders and captures
   ink with `sane_ink_surface` reporting "unavailable," proving graceful degradation.
