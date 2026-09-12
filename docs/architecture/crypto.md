# Sane Notes — End-to-End Encryption & Key Management

> **Audience:** an autonomous coding agent implementing `packages/sane_crypto` and the platform key plugins
> (Swift Keychain/Secure Enclave, Kotlin Keystore/StrongBox). Zero prior context assumed.
> **Status:** normative cryptographic specification. Do not deviate without a new ADR. Cryptography is one of
> the two things this project promises to get right (locked decision 8; product principle "security &
> privacy first *by architecture*").
> **Owns:** the key hierarchy, algorithms, KDFs, envelope encryption, key sources, recovery, and rotation.
> **Does not own:** where ciphertext sits on disk (→ [`./file-format.md`](./file-format.md) §6) or how it
> moves (→ [`./sync.md`](./sync.md)); those consume the primitives defined here.
> **Decision record:** [`../adr/0007-end-to-end-encryption-and-keys.md`](../adr/0007-end-to-end-encryption-and-keys.md).
> **Primary evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
> §5–6 (existing designs; envelope encryption; KDFs; key sources ladder; escrow),
> [`../research/sources/security-standards-and-devsecops.md`](../research/sources/security-standards-and-devsecops.md)
> (MASVS-CRYPTO/STORAGE, ASVS V11, store privacy labels),
> [`../research/sources/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md)
> §10 (Keychain/Secure Enclave/Data Protection),
> [`../research/sources/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md)
> §6 (Keystore/StrongBox, Jetpack Security deprecation).

---

## 0. Threat model in one paragraph

The cloud drive, the network, and any Sane Notes relay are **untrusted**. They must only ever hold or carry
**ciphertext** they cannot read (Ink & Switch ideal #6; research §6 "every byte written must already be
ciphertext"). The trusted boundary is the **unlocked device with the app authenticated**. We are
**zero-knowledge**: no vendor key can decrypt user notes, therefore no vendor password reset can recover
them — which makes user-held recovery (a recovery code) and platform key escrow (iCloud Keychain / Android
Keystore backup) mandatory, not optional (research §6 "Escrow / recovery"; "Lost device / lost passphrase =
permanent data loss").

---

## 1. Algorithms (approved set)

Locked to a small, modern, well-reviewed set (MASVS-CRYPTO-1 "approved algorithms and modes"; research §6).
No other primitives without an ADR.

| Purpose | Primitive | Params | Notes |
|---|---|---|---|
| **AEAD (bulk)** | **XChaCha20-Poly1305** | 256-bit key, **192-bit random nonce**, 128-bit tag | default; 192-bit nonce → random nonces are collision-safe across many independent files/devices/chunks (research §6, exactly our case). |
| AEAD (alt) | AES-256-GCM | 256-bit key, 96-bit **derived** nonce, 128-bit tag | permitted where HW acceleration matters; 96-bit nonce is derived (counter/HKDF), never random. One scheme per store. |
| **Password KDF** | **Argon2id** | **mem 64 MiB, iters 5, parallelism 1**, 128-bit salt, 256-bit out | memory-hard; Standard Notes params (research §6). Salt derived from a stored random seed so no shared/weak salts. |
| **Sub-key derivation** | **HKDF-SHA-256** | expand one secret into purpose-keyed 256-bit keys | one master secret → many purpose keys via distinct `info` labels. |
| **Content hashing** | **BLAKE3-256** | 256-bit | content-addressing + manifest hash tree (file-format §4.4). Fall back to SHA-256 if no maintained Dart BLAKE3. **verify** |
| **Device signing** | **Ed25519** | — | device identity; manifest/bundle signatures (file-format §4.4). |
| **Key agreement (sharing/collab)** | **X25519** | — | ECDH for sealing content keys to a recipient device/passkey (§7, ADR-0013). |
| **PRF secret (passkey)** | **WebAuthn `prf`** (HMAC-secret) | 32-byte output | passwordless key source (§4.1). |
| **Random** | platform CSPRNG | — | `SecRandomCopyBytes` / `SecureRandom` / `crypto.getRandomValues`; never Dart `Random`. |

**Do not** use: MD5/SHA-1, ECB/CBC-without-authenticated-MAC, PBKDF2 as the primary password KDF (Argon2id is
required; PBKDF2 only if a platform utterly lacks Argon2 — **verify**, and record as a risk), custom crypto,
or the **deprecated Android Jetpack Security** `EncryptedFile`/`EncryptedSharedPreferences`/`MasterKey`
(deprecated June 2025 — research; use Keystore AES-GCM directly).

---

## 2. Key hierarchy

Envelope (hierarchical) encryption, the Standard Notes / Notesnook blueprint (research §5–6): a passphrase or
platform secret unwraps the **master key**; the master key wraps **items keys**; items keys wrap per-page and
per-blob **content keys**; content keys do the bulk AEAD. A passphrase change or key rotation re-wraps only
keys, never the gigabytes of notes.

```
                       ┌─────────────────────────────────────────────────────────┐
   KEY SOURCE (one of) │  (A) Passkey PRF secret   (B) Platform keychain-held     │
   research §6 ladder  │      (WebAuthn prf)            wrapped master key         │
                       │  (C) Passphrase → Argon2id    (D) Recovery code (escrow)  │
                       └───────────────┬─────────────────────────────────────────┘
                                       │  HKDF-SHA-256 (info="sane/master/v1")
                                       ▼
                            ┌────────────────────┐
                            │   MASTER KEY (MK)   │  256-bit; never leaves device in the clear;
                            │   held only in RAM  │  wrapped copies escrowed (§5)
                            └─────────┬──────────┘
                    wraps (AEAD)      │
              ┌───────────────────────┼───────────────────────────┐
              ▼                       ▼                            ▼
      ┌───────────────┐       ┌───────────────┐            ┌───────────────┐
      │ ITEMS KEY IK₀ │       │ ITEMS KEY IK₁ │   ...      │ SHARE KEY SKₙ │  (per shared notebook)
      │ (per notebook)│       │ (per notebook)│            │ sealed to     │
      └──────┬────────┘       └──────┬────────┘            │ recipients    │
   wraps     │                       │                     └──────┬────────┘
        ┌────┴──────────┐            │                            │
        ▼               ▼            ▼                            ▼
 ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          ┌─────────────┐
 │ PAGE KEY PKₐ│ │ BLOB KEY BKₐ│ │ PAGE KEY PK_b│  ...     │ PAGE/BLOB…  │
 │ (per page)  │ │ (per blob)  │ │              │          │             │
 └──────┬──────┘ └──────┬──────┘ └─────────────┘          └─────────────┘
        │               │
        ▼               ▼
  AEAD of the      AEAD of the
  page's op-log    blob body
  records &        (chunked;
  snapshot         file-format §5.2)
  (file-format §3) 
```

| Key | Scope | Lifetime | Wrapped by | Used for |
|---|---|---|---|---|
| **Master key (MK)** | one per user | long-lived; rotates on passphrase change / recovery | key source (A–D) + escrow copies (§5) | wrapping items keys |
| **Items key (IK)** | one per notebook (or a small pool) | rotates on membership change / periodically | MK | wrapping page & blob keys |
| **Page key (PK)** | one per page | long-lived | IK | AEAD of that page's op-log records & snapshot body |
| **Blob key (BK)** | one per content-addressed blob | immutable (blob is immutable) | IK | AEAD of the blob body (chunked) |
| **Share key (SK)** | one per shared notebook | rotates on revoke | sealed (X25519) to each member | wraps the shared IK for collaborators (§7) |
| **Device signing key** | one per device | device lifetime | in Keychain/Keystore, non-exportable | Ed25519 manifest/bundle signatures, device identity |

Payoffs (research §6 "Envelope encryption"): a passphrase change re-wraps only IKs; sharing one notebook =
sealing one IK to a member; per-blob keys bound blast radius; rotating a page key re-encrypts one page.

### 2.1 Nonce & AAD discipline

- **XChaCha20-Poly1305:** fresh **random 192-bit nonce per message** (per op-log record, per snapshot body,
  per blob chunk). Collision-safe by construction — no counter state to corrupt.
- **AES-256-GCM (if chosen):** nonce = HKDF/counter-derived per message, **never random**; a repeated GCM
  nonce is catastrophic.
- **AAD binds context:** every AEAD message authenticates its position — op-log records bind
  `magic‖version‖deviceId‖segmentSeq‖recordIndex`; blob chunks bind `blobId‖chunkIndex` (→
  [`./file-format.md`](./file-format.md) §3.3, §5.2). This defeats cut-and-paste/reorder tampering by a
  malicious drive.

---

## 3. Where keys live (platform key stores)

Raw key material never touches disk in the clear. The MK lives in RAM while unlocked; wrapped copies live in
hardware-backed stores (research §6 "Platform keychains"; MASVS-STORAGE-2).

### Apple (iOS/iPadOS/macOS) — research
[`../research/sources/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md) §10

- **Keychain** (`SecItemAdd`/`CopyMatching`, class `kSecClassGenericPassword`) stores the **wrapped MK**.
  Accessibility `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` for the device-local copy;
  `kSecAttrSynchronizable = true` for the **iCloud Keychain**-escrowed copy (syncs to the user's other Apple
  devices, hardware-protected).
- **Secure Enclave** holds a **non-exportable P-256 key** (`kSecAttrTokenIDSecureEnclave`,
  `kSecAttrKeyTypeECSECPrimeRandom`) used to wrap/unwrap the MK via ECDH; the enclave key never leaves
  hardware. Gate it with `SecAccessControlCreateWithFlags(.privateKeyUsage, .biometryCurrentSet)` so the key
  invalidates if biometrics change ("note vault locked to current Face ID enrolment").
- **Data Protection:** note files get `NSFileProtectionComplete` (readable only while unlocked; key evicted
  shortly after lock) — defence-in-depth beneath our own E2EE.
- **LocalAuthentication** (`LAContext`, `.deviceOwnerAuthentication`) gates vault/app unlock and per-note lock.

### Android — research
[`../research/sources/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md) §6

- **Android Keystore** holds a non-exportable AES-256 (or EC) key that wraps the MK; request **StrongBox**
  (`setIsStrongBoxBacked(true)`) where available (dedicated secure element; check
  `KeyInfo.getSecurityLevel()`), else TEE.
- Bind to user auth via `setUserAuthenticationParameters(duration, AUTH_BIOMETRIC_STRONG |
  AUTH_DEVICE_CREDENTIAL)`, per-operation gating with a `BiometricPrompt.CryptoObject`. Use
  `setInvalidatedByBiometricEnrollment(false)` **only** for keys that must survive new enrolments; for the
  vault key prefer invalidate-on-enrolment for stronger binding (decide per feature).
- **Do NOT** use deprecated Jetpack Security `EncryptedFile`/`MasterKey` (research §6). Encrypt with **AES-GCM
  under a Keystore key** directly.
- **Escrow** to Android's backup (Google Password Manager / block-store) uses a wrapped copy; never back up
  raw key bytes.

### Web (PWA)

- No hardware keystore equivalent. Prefer **passkey PRF** (§4.1) so the secret is authenticator-held and
  synced by the platform, never stored by the page. Wrapped keys may sit in **IndexedDB** but only ever
  wrapped; the unwrapping secret comes from the passkey/passphrase each session. WebCrypto `SubtleCrypto` for
  AEAD/HKDF; **libsodium.js/WASM** for XChaCha20-Poly1305 + Argon2id (WebCrypto lacks both). **verify** perf
  of Argon2id in WASM on low-end devices; tune params or offer a passkey-only path.

---

## 4. Key sources (the ladder, best → fallback)

Offer the strongest source a device supports, fall back gracefully (research §6 "Where does the per-user key
come from?"). All sources ultimately yield the **MK** via HKDF.

### 4.1 (A) Passkey PRF — preferred (passwordless *and* E2EE)

- Use the **WebAuthn `prf` extension**: the authenticator evaluates a hardware-backed HMAC over
  `hash("WebAuthn PRF\0" ‖ salt)` and returns a stable **32-byte secret**; feed it through HKDF
  (`info="sane/master/v1"`) → MK. The secret is biometric-gated and **platform-synced** (iCloud Keychain /
  Google Password Manager) across the user's own devices — the best UX and best security together.
- **Rotation:** the `prf` extension supports two salts (`first`/`second`) per ceremony → evaluate current key
  with `first`, next with `second` to rotate without losing access (research §6).
- **Support (as of 2026, research §6; verify at build time):** Android (Chrome/Edge/Samsung + Google Password
  Manager), iCloud Keychain (Safari 18+, Chrome 132+, Firefox 139+), Windows Hello (Win11 25H2+); 1Password
  yes; Bitwarden fragmented. Where PRF is unavailable, fall to (B)/(C).

### 4.2 (B) Platform-keychain-held wrapped key

- Store the **wrapped MK** in iCloud Keychain / Android Keystore (§3). On a new device, the platform sync
  brings the wrapped MK; a hardware key unwraps it after biometric unlock. No password typed. This is the
  common "same-ecosystem second device" path.

### 4.3 (C) Passphrase + Argon2id — cross-platform fallback

- The classic: user passphrase → Argon2id (§1 params) → MK. Required for cross-ecosystem users and web
  without passkeys. Enforce a strength meter; never a "PIN" as the sole MK source.

### 4.4 (D) Recovery code — escrow, not a daily source

- A high-entropy code generated at setup that wraps an **escrow copy** of the MK (§5). Used to recover on a
  fresh device when (A)/(B) are unavailable and the passphrase is lost. Not used for routine unlock.

**First-run / guest note:** guest mode and note-taking never require any of these — notes are written to the
**local** encrypted store from first launch (locked decision 5; identity is only for sharing/entitlements).
E2EE key setup is prompted only when the user turns on **cloud sync** or **note lock**. Local-at-rest
encryption uses a device-local key from the platform keystore even before any cloud key ceremony.

---

## 5. Escrow & recovery

Zero-knowledge means **no vendor recovery** — so the user must hold recovery, and we must make losing it hard
(research §6 "Escrow / recovery"; "clear UX that recovery code loss is fatal").

Escrow copies of the MK (each an AEAD wrap under a different KEK):

1. **Recovery-code escrow:** `wrap(MK, KEK_recovery)` where `KEK_recovery = HKDF(recoveryCodeBytes)`. Stored
   in the sync store (`keys/`) as ciphertext; useless without the code.
2. **Platform escrow:** wrapped MK in iCloud Keychain / Android Keystore backup (§3) — recovers the user's
   *own* new device in the same ecosystem without typing anything.
3. **(Optional) Shamir split** or a sealed escrow to the user's own cloud — never to Sane Notes (research §6).

**No escrow ever leaves to a Sane Notes server.** There is no "email me a reset link." This is stated plainly
in onboarding.

### 5.1 Recovery code format

Requirements: high entropy, human-transcribable (no ambiguous glyphs), self-checking, versioned.

```
Entropy:      128-bit random recovery secret R  (the KEK material; R → HKDF → KEK_recovery)
Alphabet:     Crockford base32  (0-9 A-Z minus I L O U; case-insensitive; '-' as group sep)
Checksum:     2 base32 symbols = 10-bit checksum over the 128-bit payload (Crockford mod-37 style; verify)
Layout:       "SANE1-" prefix (version tag) + 26 payload symbols + 2 checksum symbols
Grouping:     groups of 4, e.g.

   SANE1-4H7Q-2K9M-8XR3-B0TW-6VN5-9C2D-QF   (7 groups; last group = 2 payload + 2 checksum)

Total typed:  ~30 alphanumerics; unambiguous; case-insensitive; hyphens optional on entry.
```

- **Encoding:** 128-bit R → 26 Crockford base32 symbols; append 2-symbol checksum; prepend `SANE1-` version.
  The reader strips separators, upcases, maps I/L→1, O→0 (Crockford leniency), validates checksum, rejects on
  mismatch (catches transcription errors before a doomed decrypt).
- **`SANE1`** is the format version so a future scheme (longer entropy, different KDF) is distinguishable.
- **Display:** shown once, printable, "store this offline; without it *and* your passphrase, your notes
  cannot be recovered by anyone, including us." Offer "download as PDF"/print. Never stored by us; never sent
  anywhere.
- **Optional stronger variant:** a 24-word **BIP-39-style** mnemonic (256-bit) as an alternative
  representation of the same escrow key for users who prefer words — **verify** wordlist licensing; the
  base32 code is the default.

---

## 6. Rotation & revocation

- **Passphrase change:** derive new KEK, re-wrap MK escrow copies; **no note re-encryption** (envelope
  payoff). Old escrow copies deleted.
- **MK rotation** (suspected compromise): generate MK′, re-wrap all IKs under MK′, publish new wrapped IKs,
  retire MK. IK/PK/BK bytes unchanged, so no bulk re-encryption; but a new **default IK** is minted so future
  writes use fresh keys (forward-secrecy flavour, Standard Notes-style — research §5).
- **IK rotation on membership change** (someone leaves a shared notebook): mint IK′ for the notebook, re-wrap
  its PKs/BKs under IK′, re-seal IK′ to remaining members only; the removed member keeps old ciphertext they
  already had but cannot read future writes (forward secrecy for the notebook). Content-key rotation for
  already-shared blobs is best-effort (they may have cached plaintext) — documented honestly.
- **Device revocation:** mark the device `revoked` in `Workspace.devices` (an op); peers reject its future
  ops (signature check against the retired key) and exclude it from GC causal-stability (→
  [`./document-model.md`](./document-model.md) §8). Rotate MK if the device may be compromised.

---

## 7. Sharing & collaboration keys (forward pointer)

Sharing a notebook = sealing its **items key** to each recipient via **X25519** (ECDH → wrap IK), or encoding
a **wrapped content key in a share link's URL fragment** (`#…`, never sent to any server — research §7). The
recipient joins a collab room and decrypts locally. Revocation = rotate the IK and re-seal to remaining
members (§6). Real-time transport (WebRTC data channels, ciphertext-only relay) is specified in
[ADR-0013](../adr/0013-collaboration-transport.md); this doc only guarantees that **the relay/TURN sees only
ciphertext** because the app-layer payload is E2E-encrypted under these keys.

---

## 8. Candidate Dart/Flutter libraries (name + verify)

Never hand-roll primitives. Candidate packages — **verify** maintenance, platform coverage, and FIPS/audit
status before committing; prefer libsodium-backed for the AEAD+Argon2 core:

| Need | Candidate | Notes / verify |
|---|---|---|
| XChaCha20-Poly1305, Argon2id, X25519, Ed25519, sealed boxes | **`sodium` + `sodium_libs`** (libsodium FFI) | strongest fit; libsodium is the Notesnook stack (research §5). **verify** desktop/web build story (`sodium.js` for web). |
| AEAD/HKDF/HMAC/X25519/Ed25519 pure-Dart+native | **`cryptography` / `cryptography_flutter`** | broad, well-known; **verify** it exposes **XChaCha20** and **Argon2id** (may need a plugin) and uses native accel on mobile. |
| Wrapped-key storage (Keychain/Keystore) | **`flutter_secure_storage`** | convenient, but **verify** it uses hardware-backed keys and lets us set accessibility/StrongBox; for Secure Enclave / StrongBox / biometric-gated keys write our own `plugins/sane_secure_store` (Swift + Kotlin). |
| Passkeys / WebAuthn PRF | platform channels (`ASAuthorization`… on Apple, Credential Manager on Android, WebAuthn on web) | **no turnkey Dart PRF package** — implement in the auth plugin (`plugins/sane_auth`, to be added to the ADR-0012 plugin set); **verify** PRF availability per platform at runtime. |
| BLAKE3 | **`blake3`** (FFI) | **verify** maintenance; fall back to SHA-256 multihash. |
| CSPRNG | platform (`SecRandomCopyBytes`/`SecureRandom`/WebCrypto) via plugin | never `dart:math` `Random`. |
| libsodium on web | **`sodium` (sodium.js)** / libsodium-wrappers WASM | **verify** bundle size + Argon2id perf on low-end (§3 web note). |

The `sane_crypto` package wraps whichever backend behind a stable interface (`Aead`, `Kdf`, `KeyStore`,
`Signer`, `KeyAgreement`) so a backend swap (e.g. to a Rust core via `flutter_rust_bridge`, matching
[ADR-0001](../adr/0001-flutter-single-codebase.md)'s Rust-core trigger) is a one-package change.

---

## 9. Compliance mapping (quick reference)

Ties crypto choices to the standards in
[`../research/sources/security-standards-and-devsecops.md`](../research/sources/security-standards-and-devsecops.md):

| Control | How this doc satisfies it |
|---|---|
| MASVS-CRYPTO-1 (approved algs/modes) | §1 approved set; no ECB/CBC-unauth, no MD5/SHA-1 |
| MASVS-CRYPTO-2 (key management) | §2 hierarchy; §6 rotation; §3 non-exportable HW keys |
| MASVS-STORAGE-1/2 (data at rest, keys in keystore) | §3 Keychain/Keystore/StrongBox; Data Protection |
| ASVS V11 (cryptography) | §1 primitives, §2 envelope, §2.1 nonce discipline |
| GDPR/DPDP data minimisation | E2EE + on-device (§0); enables "no data collected" store labels (research §5) |
| M10 Insufficient Cryptography | Argon2id (not PBKDF2), AEAD only, CSPRNG only |
| 2025 A10 / fail-closed | on any decrypt/AEAD failure: **fail closed**, surface error, never render partial/again-plaintext (research control checklist "Exceptional conditions") |

---

## 10. Open questions / verify list

- **Argon2id availability in the chosen Dart stack** (and web WASM perf on a 4 GB Android / low-end laptop):
  **verify**; tune params or gate the passphrase path behind a "this device is slow" fallback. Never lower
  below 64 MiB / 5 iters without an ADR.
- **XChaCha20 in `cryptography` package:** confirm native XChaCha20-Poly1305 exposure vs needing libsodium.
  **verify.**
- **`flutter_secure_storage` hardware backing & StrongBox control:** confirm; likely need a bespoke
  `plugins/sane_secure_store` for Secure Enclave/StrongBox + biometric-gated CryptoObjects. **verify.**
- **Recovery-code checksum scheme:** finalise the exact Crockford checksum (mod-37 vs CRC-10) and test
  transcription-error detection rate. **verify/decide.**
- **BIP-39 mnemonic option:** wordlist licensing + i18n (locked decision 10 localisation) before offering.
  **verify.**
- **Passkey PRF runtime detection:** build a capability probe per platform/browser; the support matrix in §4.1
  is a 2026 snapshot — **verify at build time**.
