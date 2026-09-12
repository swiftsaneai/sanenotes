# Sane Notes — Secure Coding Checklist

> Audience: an autonomous coding agent (or engineer) writing or reviewing a PR. This is the
> **checklist every PR is reviewed against**. The condensed version is baked into
> [`../../.github/PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md); this doc
> is the full rationale and the exact rules. Items are **MUST** (gate — CI or reviewer blocks
> merge), **SHOULD** (strong default; deviation needs a one-line justification in the PR), or
> **MAY** (allowed).
>
> Cross-refs: [`threat-model.md`](threat-model.md) (the `TM-*` IDs each rule defends against),
> [`controls-matrix.md`](controls-matrix.md) (MASVS/ASVS mapping),
> [`devsecops-pipeline.md`](devsecops-pipeline.md) (which scanner enforces what),
> [`../architecture/overview.md`](../architecture/overview.md) (§7 build flavours, §8
> logging). Research: `research/security-standards-and-devsecops.md`,
> `research/local-first-sync-and-crdt.md`, `research/web-stylus-and-pwa-capabilities.md`.

**How to use it:** before opening a PR, walk the sections that your diff touches. A pure-UI
polish PR touches §1 and §11 only; a PR that adds a network call, a parser, or a native method
touches most sections. "None beyond baseline" is acceptable in an issue's Security section only
for pure UI polish that adds no data flow.

---

## 0. The three gate rules (never merge if violated)

These three are **failures, not review nits** (overview §9):

1. **No secrets in code.** No API keys, client secrets, tokens, passwords, or private keys in
   source, tests, fixtures, or committed config. Config comes from `--dart-define` / CI
   secrets / platform keychains (overview §7.1). Enforced by gitleaks + trufflehog +
   GitHub push protection.
2. **No PII / content in logs.** Never log note content, ink coordinates, decrypted data,
   keys, tokens, recovery codes, cloud file paths, email, or phone numbers (§7 below).
3. **No layering / boundary violations.** Respect the package DAG (overview §5) and the trust
   boundaries ([`threat-model.md`](threat-model.md) §3). A pure-Dart package must not import
   `package:flutter`; a plugin must not import `packages/`.

---

## 1. Input validation — every byte from outside the app is hostile (TB1/TB3)

Applies to: imported PDF/image/audio, `.sanenote` bundles, files opened from other apps, deep
links, clipboard, share-sheet payloads, network responses, QR/scanned content. Threats:
[`threat-model.md`](threat-model.md) TM-T-06, TM-D-01, TM-E-04, TM-I-06.

- **MUST** validate **before** use: type/MIME (don't trust the extension), size caps, and a
  schema check for structured input (manifest JSON, `.sanenote`). Reject unknown fields in
  strict-parse mode.
- **MUST** treat all parsing as untrusted and **fail closed**: a malformed input produces a
  user-safe `Failure` (overview §8.1), never a partial import, never a crash-to-exploit, never
  a thrown raw exception surfaced to the user.
- **MUST** cap resources before decompressing or decoding: max entries, max uncompressed size,
  max dimensions/duration, a wall-clock timeout. This blocks zip-bombs and decompression bombs
  (TM-D-01).
- **MUST** canonicalise and confine every path derived from file content (`.sanenote` entries,
  export targets): reject `..`, absolute paths, symlinks; write only under the app's chosen
  directory. Import into a **new isolated notebook by default**; never overwrite an existing
  note by a path taken from file content (TM-T-06).
- **MUST** run PDF/image/audio parsing **off the UI isolate** (overview §6) with bounded
  memory, so a hostile file cannot add a millisecond to ink latency or hang the UI.
- **SHOULD** prefer maintained, memory-safe decoders (pdfium pinned & patched; platform image
  decoders) over hand-rolled parsers, and keep them current (OSV-Scanner).
- **SHOULD** normalise text input (Unicode NFC), strip control characters that aren't meaningful,
  and bound field lengths before storage/search indexing.

### 1.1 URLs, deep links, App Links, Universal Links, URL schemes (TB1)

Threats: TM-S-04 (link forgery), TM-E-02 (intent redirection). Research:
`research/security-standards-and-devsecops.md` (MASVS-PLATFORM-1).

- **MUST** use **verified** deep links for anything sensitive: Android **App Links**
  (`android:autoVerify="true"` + hosted `assetlinks.json`) and iOS **Universal Links** (hosted
  AASA + Associated Domains). Do **not** rely on a custom URL scheme (`sanenotes://`) for
  security decisions — any app can register a scheme.
- **MUST** parse links with an allow-list of routes and parameters; reject unknown hosts,
  schemes, and paths. Validate and bound every query/path parameter before use.
- **MUST** make an inbound link land in a **view/confirm** context. A link **must never**
  auto-import, auto-share, auto-delete, mutate state, or send anything to the network without an
  explicit user action.
- **MUST** keep the wrapped share-key in the URL **fragment** (`#…`), which is never sent to a
  server; strip referrers on any outbound navigation (TM-I-09).
- **MUST NOT** pass a URL from untrusted input into a WebView, an external browser, or a
  network client without scheme allow-listing (`https` only for web; block `file:`, `javascript:`,
  `data:` for navigations) — this is SSRF/redirect surface.

### 1.2 Clipboard (TB1, TM-I-07)

- **MUST** treat pasted content as untrusted input (sanitise HTML/markdown before render — §6).
- **MUST NOT** auto-read the clipboard on launch or focus; read only on an explicit paste
  action.
- **SHOULD** offer a clipboard-clear timer for content copied out of a locked/secure note, and
  mark sensitive copies sensitive (Android `ClipDescription` `EXTRA_IS_SENSITIVE`).

---

## 2. Memory safety in native plugins (Swift / Kotlin / C interop) (TB3)

Applies to: `plugins/*` Swift & Kotlin, and any C/C++ (pdfium, native crypto, ink surface).
Threat: TM-E-04.

- **MUST** validate every argument crossing the platform channel (lengths, ranges, null,
  encoding) before use; a bad argument returns an error, never crashes the host.
- **MUST** bound-check all buffer/pointer arithmetic in any C/C++ interop; never trust a length
  field from file content.
- **MUST NOT** expose an FFI/platform-channel method that executes arbitrary code, loads
  arbitrary libraries, or evaluates strings.
- **SHOULD** keep native surface minimal and allow-listed (federated plugin platform-interface,
  ADR-0012), so review can enumerate every native entry point.
- **SHOULD** build native code with the platform's hardening flags (stack canaries, ASLR/PIE,
  `-D_FORTIFY_SOURCE`, ARC on Swift, no unmanaged pointers in Kotlin without justification).
- **MAY** add AddressSanitizer builds of C/C++ parsers to the fuzzing job (verification stage).

---

## 3. Cryptography usage rules (TB2)

Owner package: `sane_crypto` (pure Dart, lowest layer, overview §5). Threats: TM-I-01/02/03,
TM-T-01/02. Design basis: `research/local-first-sync-and-crdt.md` §6.

- **MUST** use only approved primitives (MASVS-CRYPTO-1):
  - AEAD: **XChaCha20-Poly1305** (preferred; 192-bit random nonce) or **AES-256-GCM**.
  - Password KDF: **Argon2id** (reference: 64 MiB memory, 5 iterations, parallelism 1,
    128-bit random salt derived per user from a stored seed + user id).
  - Sub-key derivation: **HKDF**. Hash/content-address: SHA-256/BLAKE3.
  - Signatures (collab/entitlement): **Ed25519**.
- **MUST NOT** invent crypto, use ECB, use a static/zero IV, reuse an AES-GCM nonce, use MD5/SHA-1
  for security, use `Random` (non-CSPRNG) for keys/nonces/salts, or hardcode a key/salt.
- **MUST** generate nonces/salts/keys from a cryptographically secure RNG.
- **MUST** use **envelope encryption**: random content key per item → wrapped by items key →
  wrapped by master key. A passphrase change re-wraps items keys only, never re-encrypts note
  bytes.
- **MUST** verify the AEAD tag before using any decrypted bytes and **fail closed** on mismatch
  — no partial decrypt, no "best effort" (2025 OWASP A10; TM-T-01).
- **MUST** treat all cloud-bound bytes as ciphertext-only: encrypt **before** the write to the
  drive; the drive is dumb transport (TM-I-01).
- **SHOULD** stream/chunk-encrypt large attachments (per-chunk XChaCha20-Poly1305) so mobile
  never loads a whole file to encrypt (`research/local-first-sync-and-crdt.md` §8).
- **SHOULD** keep crypto constant-time where feasible and zeroise key buffers after use.

### 3.1 Key storage & lifecycle (TB2, MASVS-STORAGE-2 / CRYPTO-2)

- **MUST** store the master key and wrapped keys in the platform hardware store via
  `sane_secure_store`: **iOS/iPadOS** Keychain + Secure Enclave; **Android** Keystore /
  StrongBox (non-exportable), gated with `setUserAuthenticationRequired` (biometric) where the
  key protects note content.
- **MUST NOT** persist a decrypted master/content key to disk, logs, backups, or shared prefs;
  hold it transiently in RAM and scrub on lock/background (TM-I-03).
- **MUST** exclude key material from OS auto-backup (Android `allowBackup` rules / iOS
  exclude-from-backup) (TM-I-10).
- **MUST** support the key-source ladder: passkey-PRF (preferred) → platform-keychain-wrapped
  key → Argon2id passphrase; and escrow via a user-held **recovery code** (no vendor recovery).
- **SHOULD** support key rotation (two-salt passkey-PRF or re-wrap of items keys) and note
  revocation by content-key rotation (`research/local-first-sync-and-crdt.md` §6/§7).

---

## 4. Authentication, session & authorization

Threats: TM-S-01/02/05, TM-E-01. Standards: MASVS-AUTH, ASVS V6/V7/V9.

- **MUST** keep **guest mode first-class**: identity is never required to take notes (locked
  decision 5). Note access must not be derivable from identity — an account takeover yields no
  plaintext (TM-S-02).
- **MUST** use OIDC/OAuth with PKCE, `state`, and `nonce`; validate all three; use short-lived
  access tokens with refresh rotation; store tokens in `sane_secure_store`.
- **MUST** ensure the **dev auth bypass** (`SANE_AUTH_BYPASS`) is impossible in release: it lives
  behind `if (!kReleaseMode && _authBypass)` (tree-shaken out of release), plus
  `assertAuthBypassSafe()` throwing at startup, plus the CI reachability test
  `app/test/security/auth_bypass_test.dart` (overview §7.2, TM-E-01). **Never** weaken any of
  the three layers.
- **MUST** verify entitlement tokens against a pinned server public key; fail *open to the free
  tier*, never punitively (TM-S-05).
- **SHOULD** offer app-lock (biometric/passcode) with auto-lock timeout and RAM key-scrub on
  lock (PRD-03 `LOCK`).
- **SHOULD** rate-limit and lock out OTP attempts at the provider (TM-S-02).

---

## 5. Platform hardening — IPC, exported components, intents (TB1)

Android/iOS. Threats: TM-E-02, TM-S-04. Standard: MASVS-PLATFORM-1.

- **MUST** default every Android component to `exported=false`; export only what is required,
  and permission-guard it. Validate every incoming intent's action, data, and extras.
- **MUST NOT** ship a mutable `PendingIntent` that an attacker can fill in; set explicit
  component + `FLAG_IMMUTABLE`.
- **MUST** protect any `ContentProvider`/`FileProvider` with per-URI grants; never export a
  provider that can read arbitrary app files.
- **MUST** validate the caller for any inter-app entry point that performs a sensitive action.
- **SHOULD** avoid implicit intents for sensitive actions; use explicit component targets.

---

## 6. WebView & web (PWA) rules (TB4)

Applies to: any `WebView`/`WKWebView` in the mobile shells, and the Flutter Web / PWA render
surface. Threats: TM-I-06, TM-E-03. Research: `research/web-stylus-and-pwa-capabilities.md`
§10–11.

### 6.1 WebView (mobile shells)

- **MUST NOT** render untrusted HTML in an app-privileged WebView. If a WebView is used, load
  only bundled, trusted content or `https` origins you control.
- **MUST NOT** expose a broad JS bridge (`@JavascriptInterface` / message handler) to untrusted
  content. If a bridge exists, allow-list method names and validate all arguments (TM-E-03).
- **MUST** disable `allowFileAccessFromFileURLs` / `allowUniversalAccessFromFileURLs`, disable
  unnecessary `setJavaScriptEnabled`, and block navigations to `file:`/`javascript:`/`data:`.
- **MUST** verify TLS in the WebView (no `onReceivedSslError` → proceed).

### 6.2 Web headers & DOM (PWA / website)

- **MUST** serve a **strict, nonce-based CSP**: `script-src 'nonce-{random}' 'strict-dynamic';
  object-src 'none'; base-uri 'none'`. Add `'wasm-unsafe-eval'` where WASM is loaded. No host
  allow-lists as the primary defence, no `unsafe-inline`, no `unsafe-eval`.
- **MUST** enable **Trusted Types** (`require-trusted-types-for 'script'`, `trusted-types
  <policy>`) and route every DOM-sink write (`innerHTML`, etc.) through a sanitising policy
  (DOMPurify) — this kills DOM-XSS when rendering user note HTML/markdown (TM-I-06). (Note:
  Trusted Types is Chromium-only today; still ship it, plus sanitise unconditionally for
  Safari/Firefox.)
- **MUST** set **COOP + COEP** (`Cross-Origin-Opener-Policy: same-origin`,
  `Cross-Origin-Embedder-Policy: require-corp`) to establish cross-origin isolation where
  multithreaded WASM (skwasm, whisper.cpp) is used; deploy `-Report-Only` first. Isolate the app
  on its own origin.
- **MUST** pin external subresources with **SRI** (`integrity="sha384-…"` + `crossorigin`);
  prefer self-hosting over CDNs. (Note: the artifact host allow-list is separate; for the
  shipped product, self-host.)
- **MUST** sanitise all note-derived HTML/markdown before it reaches the DOM, independent of CSP
  (defence in depth).
- **SHOULD** set `Referrer-Policy: no-referrer` (protects share-link fragments — TM-I-09),
  `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, and a restrictive
  `Permissions-Policy` (deny camera/mic/geolocation unless a feature needs it).
- **SHOULD** request `navigator.storage.persist()` from a user gesture when saving critical data,
  and check `estimate()` headroom (guards against eviction — availability, TM-D-*).

---

## 7. Logging & error handling (all surfaces) (TM-I-05, TM-R-02/03)

Owner: the `SaneLog` facade in `sane_core` (overview §8.2).

- **MUST NOT** log note content, ink coordinates, decrypted data, keys, tokens, recovery codes,
  cloud file paths, email addresses, or phone numbers. Object ids are logged as opaque short
  hashes, not raw ids. **This is a gate rule (§0).**
- **MUST** route all logging through `SaneLog`; **`print()` is banned** (lint + arch-check).
- **MUST** use structured fields (event name + typed key/values) with a redaction **allow-list**,
  so redaction is enforceable, not per-call discipline.
- **MUST** return expected/recoverable failures as `Result<T, Failure>` (sealed types); never
  surface a raw exception string to the user; never leak a stack trace or internal path in a
  user-facing message (ASVS V16).
- **MUST** ensure hot-path (draw loop) code does not log in profile/release.
- **SHOULD** keep service-side logs to connection metadata only, with retention limits (TM-R-02).
- **SHOULD** funnel uncaught errors through the sanitised crash recorder (`FlutterError.onError`,
  `PlatformDispatcher.onError`, per-isolate error listeners); crash reports are **opt-in** and
  redacted.

---

## 8. Secure defaults & configuration (ASVS V13, MASVS-PLATFORM-3)

- **MUST** ship privacy-preserving defaults: telemetry **off** (opt-in), cloud AI **off**
  (per-request opt-in), analytics SDKs **none linked** (overview §8.2), sync **off until the
  user picks a cloud**.
- **MUST** request OS permissions **lazily**, in-context, with a rationale; never at launch,
  never more than the feature needs (least privilege; SECURITY.md principle 4).
- **MUST** enforce TLS 1.2+ for every network call; certificate pinning on mobile for our own
  endpoints (relay/entitlement) (MASVS-NETWORK-1/2). No cleartext HTTP (Android
  `usesCleartextTraffic=false`; iOS ATS on).
- **MUST** protect secure/locked notes from OS-surface leakage: block screenshots where the user
  opts in, keep note excerpts out of notifications, and mark sensitive fields
  (`isSecureTextEntry` / FLAG_SECURE) (TM-I-07, PRD-03 `LEAK`).
- **SHOULD** disable debug features, verbose logging, and the auth bypass in any non-dev flavour
  (overview §7); assert their absence in CI.

---

## 9. Language-specific pitfalls

### 9.1 Dart / Flutter

- **MUST NOT** hardcode secrets in Dart — **Dart AOT is reversible** (`research/flutter-ink-stack.md`);
  read config from `--dart-define` (overview §7.1).
- **MUST NOT** use `dart:mirrors`, unbounded `dynamic`, or unsafe deserialization of untrusted
  data into arbitrary types (MASVS-CODE-4). Deserialize into explicit, validated models.
- **MUST** obfuscate release builds (`--obfuscate --split-debug-info`) (overview §7).
- **MUST NOT** pass untrusted data into `Process.run`, `dart:ffi` calls, or SQL string
  interpolation. Use **parameterised queries** via drift (never string-built SQL) — this closes
  injection (A03; TM-I-05 adjacency).
- **SHOULD** keep `very_good_analysis` clean with `dart analyze --fatal-infos`; warnings are CI
  errors (overview §9).
- **SHOULD** wrap all storage/quota calls in try/catch (web `QuotaExceededError`,
  eviction) and degrade gracefully.

### 9.2 Swift (iOS / iPadOS)

- **MUST** use Keychain with the least-permissive accessibility
  (`kSecAttrAccessibleWhenUnlockedThisDeviceOnly` for device-bound keys); use Secure Enclave for
  key generation where possible; never store keys in `UserDefaults`.
- **MUST** keep App Transport Security on (no arbitrary-loads exception).
- **MUST NOT** use `NSTemporaryDirectory`/caches for sensitive data without exclude-from-backup
  and Data Protection class.
- **SHOULD** avoid force-unwraps on untrusted data; validate platform-channel arguments; use ARC
  (no unmanaged pointers) unless justified.
- **SHOULD** ship a **Privacy Manifest** (`PrivacyInfo.xcprivacy`) declaring data use and
  Required-Reason API usage (store requirement; `research/security-standards-and-devsecops.md`
  §5.5).

### 9.3 Kotlin (Android)

- **MUST** use Android Keystore (StrongBox where available) for keys; set
  `setUserAuthenticationRequired` for content-protecting keys; never store keys in
  SharedPreferences.
- **MUST** set `android:allowBackup` rules to exclude key material and sensitive DBs; disable
  cleartext traffic; use `FLAG_SECURE` for secure-note screens.
- **MUST** mark components `exported=false` unless required; use `FLAG_IMMUTABLE` PendingIntents;
  validate all intent extras (§5).
- **MUST NOT** log via `Log.d`/`println` on sensitive paths; route through the platform-channel
  to `SaneLog` or a redacted native logger.
- **SHOULD** target current `compileSdk`/`targetSdk` (MASVS-CODE-1); avoid deprecated crypto
  providers; use `EncryptedFile`/AEAD, not `Cipher` with defaults.

---

## 10. Dependency policy (supply chain) (2025 OWASP A03; MASVS-CODE-2)

- **MUST** justify every new dependency in the PR (why, what it replaces, maintenance/health),
  confirm license compatibility, and confirm it is OSV-clean.
- **MUST** pin dependencies (lockfiles: `pubspec.lock`, Gradle, `package-lock.json`,
  `Package.resolved`) and **pin every GitHub Action to a full commit SHA**
  (`research/security-standards-and-devsecops.md` §7).
- **MUST NOT** add a dependency that pulls a network analytics/telemetry SDK, or one that
  requires broad OS permissions the app doesn't otherwise need.
- **SHOULD** prefer well-maintained, widely-used libraries with a security-response history;
  avoid abandoned packages (Scorecard Maintained).
- **SHOULD** keep the dependency count low; a note app's trusted computing base should stay
  small. Dependabot/Renovate PRs keep versions current; `dependency-review` blocks vulnerable or
  disallowed-license additions on PR.

---

## 11. UX-adjacent privacy controls (LINDDUN)

Threats: TM-P-06, TM-P-08. Even a UI PR can create a privacy regression.

- **MUST** show the "data leaves device" banner before any cloud AI request; no silent
  background egress (locked decision 6).
- **MUST** keep consent in-context, specific, and withdrawable; reflect actual behaviour in the
  privacy dashboard and store labels (PRD-03 `PRIV`).
- **SHOULD** avoid new persistent identifiers; if unavoidable, document them in the threat model
  and privacy dashboard.

---

## 12. Reviewer's fast pass (what to check on any PR)

1. Diff touches a **network call, parser, native method, WebView, deep link, exported
   component, crypto, or key storage**? → the matching section above **and** a
   [`threat-model.md`](threat-model.md) row must be updated in this PR.
2. Any **string that looks like a secret**? → block; move to `--dart-define`/CI secret.
3. Any **`print(`, `Log.d`, `console.log`** of variable content? → block; route through
   `SaneLog`; confirm no PII/content.
4. Any **new dependency or Action**? → justified, pinned (SHA for Actions), OSV-clean,
   license-OK.
5. Any **`innerHTML`/DOM sink, SQL string, `Process.run`, dynamic deserialize, force-unwrap on
   untrusted data**? → require the safe alternative.
6. Any **new stored asset or metadata written to the cloud**? → confirm it is encrypted before
   egress and that metadata is minimised (§3, TM-I-04).
7. **Security & privacy** and **UX** checklist boxes in the PR template are honestly ticked.
