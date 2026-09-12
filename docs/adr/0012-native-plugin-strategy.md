# ADR-0012 — Native plugin strategy

## Status

**Accepted** (M0 for the plugin skeleton and `sane_ink_surface`/`sane_secure_store`; other
plugins land with their features). Related: [ADR-0001](0001-flutter-single-codebase.md),
[ADR-0002](0002-monorepo-layout.md), [ADR-0010](0010-web-pwa-strategy.md),
[`docs/architecture/overview.md`](../architecture/overview.md) (§1.2 containers, §4 tree).
Research: `research/flutter-ink-stack.md`, `research/web-stylus-and-pwa-capabilities.md`.

## Context

Flutter delivers the app and most of the ink pipeline, but several capabilities require native
code the framework does not expose (locked decision 1):

- **Low-latency wet-ink surfaces:** Metal / `CAMetalLayer` front-buffer on Apple; **Jetpack
  Ink API + `androidx.graphics.lowlatency`** on Android — the **Tier A** fast path composited
  into Flutter via the **`Texture`** widget (`research/flutter-ink-stack.md`).
- **Stylus extras:** Apple Pencil Pro squeeze/barrel-roll/hover/haptics, S Pen, USI;
  coalesced/historical samples (`UITouch.coalescedTouches`, `MotionEvent.getHistorical*`) that
  Flutter does **not** surface at the framework layer.
- **Scribble** (iPadOS handwriting entry) — an OS feature, not a scriptable API; only works in
  real text fields.
- **On-device ML:** Apple Vision/Speech/Foundation Models; Android ML Kit / Gemini Nano (ML Kit
  digital-ink & text recognition are **mobile-only**, no web); Whisper on web/wasm.
- **Secure storage:** Keychain / Keystore / Secure Enclave / StrongBox; biometric gate.
- **User cloud drives:** iCloud Drive (ubiquity container / `NSFileCoordinator`), Google Drive
  (appDataFolder + a visible export folder).
- **PDF acceleration** where the platform renderer beats pdfium.

We need a consistent way to add native capability that (a) keeps **Dart the source of truth**,
(b) is **type-safe** across the method-channel boundary, (c) **degrades gracefully** when a
capability is absent (web, older OS, low-end device), (d) is **testable without a device**, and
(e) **contains the native attack surface** (channel payloads, deep links, cloud SDKs).

## Decision

**Expose each native capability as a federated Flutter plugin: a Dart *platform-interface*
package plus per-platform implementations (Swift for iOS/iPadOS, Kotlin for Android, JS-interop
for web). Use Pigeon-generated, type-safe channels for method calls, EventChannels for
streams, and `Texture`/`PlatformView` for native surfaces. Every plugin ships a mock
implementation and a capability probe.**

### Plugin set (one per capability)

| Plugin | Wraps (verify exact APIs at impl time) | Surfaces | Consumed by |
|---|---|---|---|
| `sane_ink_surface` | Metal/`CAMetalLayer` front-buffer (Apple); Jetpack Ink + `androidx.graphics.lowlatency` (Android); composited via `Texture` | iPad, Android; **absent on web** | `app/editor`, `sane_render` |
| `sane_stylus` | Apple Pencil Pro (squeeze/barrel-roll/hover/haptics), S Pen, USI; `coalescedTouches`/`getHistorical*` | iPad, Android; partial web (Pointer Events) | `sane_ink` |
| `sane_scribble` | Apple Scribble hooks (text-field only; not scriptable) | iPad; web = DOM text fields | `app/editor` (text entry) |
| `sane_secure_store` | Keychain / Keystore / Secure Enclave / StrongBox; `local_auth`-style biometric gate | all native; web = WebCrypto (weaker) | `sane_crypto` |
| `sane_cloud_drive` | iCloud Drive (ubiquity/`NSFileCoordinator`); Google Drive (`drive.file` scope, appDataFolder + export folder) | all; web = Drive Picker/JS | `sane_sync` |
| `sane_ml_native` | Vision/Speech/Foundation Models (Apple); ML Kit Digital Ink/Text, Gemini Nano (Android); Whisper-WASM (web) | all (paths differ) | `sane_ml` |
| `sane_pdfkit` | PDFKit render accel (Apple) where it beats pdfium; else `sane_pdf`/pdfium | Apple; others via `sane_pdf` | `sane_pdf` |

### Cross-cutting rules

1. **Federated shape:** `sane_x` (app-facing) → `sane_x_platform_interface` (the contract) →
   `sane_x_ios`/`sane_x_android`/`sane_x_web` (impls). Consumers depend on the **interface**,
   never a concrete impl (ADR-0002 rule 7).
2. **Type-safe channels via Pigeon.** Define the interface as a Pigeon schema; generate Dart +
   Swift + Kotlin stubs so payloads are typed on both sides. Hand-written `MethodChannel`
   strings are avoided (they're stringly-typed and error-prone). Streams use `EventChannel`.
3. **Dart is the source of truth.** Native code does the platform-specific work and returns
   data; document model, CRDT, decisions and orchestration stay in Dart. `flutter_rust_bridge`
   is **not** used for these plugins (it's reserved for the optional Rust ink/CRDT core,
   [ADR-0001](0001-flutter-single-codebase.md)); FFI is reserved for pure C/Rust libraries with
   no platform-UI surface.
4. **Capability probe + graceful degradation.** Every plugin exposes `isAvailable`/a capability
   descriptor; callers must handle "unavailable" (e.g. `sane_ink_surface` absent → editor uses
   Tier B; ML Kit absent on web → `sane_ml` uses the WASM/cloud path or hides the feature).
5. **Mock implementation for tests.** Each platform-interface ships a fake so `packages/` and
   `app/` unit/widget tests run **without a device**; `patrol` covers the real native path in
   integration tests (`research/flutter-ink-stack.md`).
6. **Least-privilege, lazy permissions.** Camera/mic/Drive/biometric permissions are requested
   **in-context with rationale**, never at launch (decision 8, `SECURITY.md`).

## Alternatives considered

| Option | Type safety | Testability off-device | Native surface composition | Fit for this app | Verdict |
|---|---|---|---|---|---|
| **Federated plugins + Pigeon + Texture/PlatformView (chosen)** | High (generated stubs) | High (mock impls) | `Texture` for front-buffer ink | Matches federated-plugin norm + Tier A fast path | **Chosen** |
| Hand-written `MethodChannel` per feature | Low (stringly-typed) | Medium | Same | Works but error-prone at scale | Rejected — Pigeon removes a whole class of bugs |
| `dart:ffi` direct to native libs for everything | Medium (manual bindings) | Low (needs the lib) | No UI/lifecycle integration | Wrong for platform-UI/SDK/lifecycle work | Rejected for capability plugins; **kept** for pure C/Rust libs |
| `flutter_rust_bridge` for all native work | High | Medium | No native-UI/SDK access | FRB can't call PencilKit/Keychain/Drive SDKs | Rejected — reserved for the Rust ink/CRDT core only |
| One monolithic "native" plugin | Low cohesion | Medium | Same | Couples unrelated capabilities; hard to test/own | Rejected — per-capability plugins isolate risk & ownership |

## Consequences

**Positive**

- Each native capability is isolated, independently testable (mock impl), and separately
  owned (CODEOWNERS per plugin).
- Pigeon-typed channels eliminate stringly-typed payload bugs and give compile-time contracts
  across Dart/Swift/Kotlin.
- `Texture`/front-buffer composition gives the Tier A latency path without leaving Flutter for
  the whole editor.
- Graceful degradation is designed in: the app works when a capability is missing (web, old
  OS, low-end device).

**Negative**

- **Native code multiplies the maintenance and security surface** (three impls per plugin) and
  needs platform expertise the Dart-centric team must keep.
- **Platform-channel round-trips have latency** — fine for commit/ML/storage, **never on the
  wet-ink hot loop**; the ink surface uses `Texture` (autonomous native repaint), not
  per-sample channel calls.
- **Pigeon/codegen adds a build step** and version coupling between the schema and generated
  stubs.
- Web parity is partial (no `sane_ink_surface`, ML Kit mobile-only) → the capability probe and
  Tier B fallback carry that weight.

## Security impact

- **The native bridge is real attack surface.** Every channel payload crossing Dart↔native is
  **untrusted input**: validate/parse it defensively on both sides (Pigeon types help but do
  not sanitise semantics). Fuzz channel inputs for the security-sensitive plugins.
- **Deep links / intents** handled by native code (share targets, file opens, OAuth redirects)
  must be validated before acting — a classic mobile vuln class (MASVS-PLATFORM). No implicit
  trust of incoming URLs/intents.
- **Secrets stay native.** `sane_secure_store` keeps keys in Keychain/Keystore/Secure
  Enclave/StrongBox; key material never crosses the channel in the clear, and never lands in a
  Dart-side log or long-lived provider (ADR-0003, overview §8.2). Biometric gate on
  key-unwrap.
- **Cloud SDKs run native with least scope:** Google Drive uses the **`drive.file`** scope
  (app-created/user-picked files only), not full-Drive; iCloud uses the app's ubiquity
  container. The relay never sees plaintext (services are ciphertext-only, ADR-0002).
- **SAST coverage is better here than in Dart:** the Swift/Kotlin/JS plugin code **is**
  CodeQL-analysable (unlike the Dart AOT snapshot), and MobSF sees the native manifest/
  permissions — so security-critical logic that benefits from SAST can live in the native
  layer where appropriate.
- Targets **MASVS L2** (mobile) and the platform/storage controls in
  `docs/security/threat-model.md`.

## How to verify

1. **Pigeon codegen is current:** CI regenerates stubs and fails if checked-in Dart/Swift/
   Kotlin stubs are stale.
2. **Mock impls exist and are used:** `packages/` and `app/` tests run green **without a
   device**, exercising each plugin through its fake.
3. **Capability probe works:** with `sane_ink_surface` reporting unavailable, the editor falls
   back to Tier B and still captures/renders ink (overview §2); with ML Kit unavailable
   (web), `sane_ml` uses the WASM/cloud path or hides the feature — no silent cloud send.
4. **Native SAST/scan:** CodeQL runs over Swift/Kotlin/JS; MobSF on release candidates flags
   permissions/manifest issues; no unexpected permission is declared.
5. **Channel-input validation tests / fuzz** for `sane_cloud_drive`, `sane_secure_store` and
   any deep-link/intent handler; malformed payloads are rejected, not acted upon.
6. **Least-privilege check:** permissions are requested in-context (not at launch); Google
   Drive scope is `drive.file`; secrets never appear in logs or channel payloads (grep +
   redaction tests).
7. **`patrol` integration tests** cover the real native path (permissions, biometric prompt,
   Drive round-trip) on iOS and Android in CI device runners.
