# ADR-0007: End-to-end encryption and key management

- **Status:** Accepted
- **Date:** 2026-09-13
- **Deciders:** Maintainer (Jatin Kumar Singh)
- **Relates to:** [ADR-0004 local-first](./0004-local-first-zero-server.md),
  [ADR-0006 sync over user cloud drives](./0006-sync-over-user-cloud-drives.md),
  [ADR-0013 collaboration transport](./0013-collaboration-transport.md); specified in
  [`../architecture/crypto.md`](../architecture/crypto.md).
- **Evidence:** [`../research/sources/local-first-sync-and-crdt.md`](../research/sources/local-first-sync-and-crdt.md)
  §5–6 (Standard Notes/Notesnook/Obsidian designs; envelope encryption; KDFs; key-source ladder; escrow);
  [`../research/sources/security-standards-and-devsecops.md`](../research/sources/security-standards-and-devsecops.md)
  (MASVS-CRYPTO/STORAGE, ASVS V11, store labels);
  [`../research/sources/apple-pencil-ipados-capabilities.md`](../research/sources/apple-pencil-ipados-capabilities.md) §10;
  [`../research/sources/android-stylus-capabilities.md`](../research/sources/android-stylus-capabilities.md) §6.

## Context

[ADR-0004](./0004-local-first-zero-server.md)/[ADR-0006](./0006-sync-over-user-cloud-drives.md) make the
cloud, network, and any relay **untrusted**: every byte they hold must be ciphertext they cannot read. We are
**zero-knowledge** — no vendor key decrypts notes, so no vendor reset can recover them, which forces
user-held recovery + platform escrow. The research gives a proven blueprint: **envelope (hierarchical)
encryption** (Standard Notes / Notesnook), **XChaCha20-Poly1305 + Argon2id**, hardware-backed key stores, and
a **key-source ladder** topped by **passkey PRF** for passwordless E2EE (research §5–6). Android's Jetpack
Security (`EncryptedFile`/`MasterKey`) is **deprecated** (June 2025) — use Keystore AES-GCM directly.

## Decision

1. **Approved primitives only** ([`../architecture/crypto.md`](../architecture/crypto.md) §1): **AEAD =
   XChaCha20-Poly1305** (AES-256-GCM permitted alt); **password KDF = Argon2id** (64 MiB / 5 iters / p=1);
   **sub-keys = HKDF-SHA-256**; **hashing = BLAKE3-256**; **signing = Ed25519**; **agreement = X25519**;
   platform CSPRNG only. No MD5/SHA-1, no unauthenticated modes, no PBKDF2-as-primary, no home-grown crypto,
   no deprecated Jetpack Security.
2. **Envelope key hierarchy** (ibid. §2): key source → **Master Key** → per-notebook **Items Keys** → per-page
   **Page Keys** + per-blob **Blob Keys** → bulk AEAD. A passphrase change or rotation re-wraps only keys, not
   note bytes.
3. **Nonce/AAD discipline:** random 192-bit XChaCha nonce per message; AES-GCM nonce derived (never random);
   AAD binds each message's position (segment/record index, blob/chunk index) to defeat cut-and-paste
   tampering (ibid. §2.1; [`../architecture/file-format.md`](../architecture/file-format.md) §3.3, §5.2).
4. **Keys live in hardware-backed stores** (ibid. §3): Apple **Keychain + Secure Enclave** (biometry-gated,
   `.biometryCurrentSet`) with `NSFileProtectionComplete` at rest; Android **Keystore + StrongBox** with
   `BiometricPrompt.CryptoObject` gating; web prefers **passkey PRF**, storing only wrapped keys in IndexedDB.
5. **Key-source ladder** (ibid. §4, best→fallback): (A) **passkey PRF** (passwordless + E2EE, platform-synced);
   (B) **platform-keychain-held wrapped MK**; (C) **passphrase + Argon2id**; (D) **recovery code** (escrow,
   not daily unlock).
6. **Escrow & recovery** with **no vendor recovery** (ibid. §5): recovery-code escrow + platform-keychain
   escrow (+ optional Shamir). A versioned, checksummed **recovery code** (`SANE1-` + 128-bit Crockford
   base32 + checksum) is generated once, shown once, never sent anywhere; blunt "lose it and it's gone" UX.
7. **Rotation & revocation** (ibid. §6): passphrase change re-wraps escrow only; MK/IK rotation re-wraps keys
   (no bulk re-encryption) and mints a fresh default IK (forward-secrecy flavour); notebook-membership change
   rotates the IK and re-seals to remaining members; device revocation flips a signed registry flag and
   rejects that device's future ops.
8. **Sharing seals an Items Key via X25519** or a **wrapped content key in a URL fragment** (never sent to a
   server); the relay/TURN sees only ciphertext ([ADR-0013](./0013-collaboration-transport.md)).
9. **Fail closed:** any AEAD/decrypt/KDF failure surfaces an error and never renders partial or fallback
   plaintext (2025 OWASP A10; research control checklist).
10. **Local-first, key-setup-deferred:** guest note-taking needs no key ceremony; local at-rest uses a
    device-local keystore key from launch; the E2EE ceremony (passkey/passphrase + recovery code) is prompted
    only when the user enables **cloud sync** or **note lock** (locked decisions 3, 5).

## Consequences

**Positive**
- Provider/network/relay breaches expose only ciphertext; enables honest "no data collected" labels
  ([ADR-0004](./0004-local-first-zero-server.md)).
- Envelope design makes passphrase changes, sharing, and rotation cheap (re-wrap keys, not gigabytes).
- Passkey-PRF path is passwordless *and* E2EE — best-in-class UX + security together.

**Negative / costs**
- **Zero-knowledge = unrecoverable on total secret loss.** Mandates recovery-code + escrow UX and clear,
  scary onboarding copy. **Accepted residual risk.**
- **Passkey PRF support is uneven** across browsers/authenticators (2026 snapshot); we must runtime-probe and
  fall back to passphrase, adding paths to test.
- **Argon2id on low-end web/Android** may be slow; needs tuning or a passkey-only path (**verify**).
- **Hardware-key nuances** (Secure Enclave P-256-only; StrongBox availability; biometric-enrolment
  invalidation) require a bespoke `plugins/sane_secure_store`, not just `flutter_secure_storage`.
- **Metadata is only partly hidden** — sizes/timing/structure leak unless padded/minimised (handled in
  file-format §6, but a residual).

**Neutral**
- The crypto interface (`Aead`/`Kdf`/`KeyStore`/`Signer`/`KeyAgreement`) abstracts the backend, so a later
  Rust-core swap ([ADR-0001](./0001-flutter-single-codebase.md)) is a one-package change.

## Alternatives considered

| Alternative | Verdict |
|---|---|
| **AES-256-GCM everywhere** | Fine and HW-accelerated, but 96-bit nonce needs careful derivation across many independent files/devices; XChaCha's 192-bit random nonce is safer for our many-files case. GCM kept as permitted alt. |
| **PBKDF2 password KDF** | Not memory-hard; weaker against GPU/ASIC cracking of stolen ciphertext. Argon2id required; PBKDF2 only as a last-resort platform gap (**verify**, record risk). |
| **Vendor-escrowed recovery** (server can reset) | Better UX on loss, but breaks zero-knowledge — the whole point. Rejected. |
| **Single global key (no envelope)** | Simplest, but a passphrase change re-encrypts everything and sharing/rotation is all-or-nothing. Rejected for envelope. |
| **Jetpack Security `EncryptedFile`/`MasterKey`** | Deprecated June 2025 (research §6). Rejected; use Keystore AES-GCM directly. |
| **Password-only (no passkey/keychain)** | Cross-platform but worse UX/security; the ladder keeps it as fallback (C), not the default. |

## Threats

| Threat | Class | Mitigation |
|---|---|---|
| Cloud/relay/network reads notes | Info disclosure | E2EE every byte; untrusted transport sees only ciphertext |
| Weak passphrase brute-forced from stolen ciphertext | Info disclosure | Argon2id (64 MiB/5 iters); per-user salt from a stored seed; prefer passkey PRF (no guessable secret) |
| Nonce reuse (esp. GCM) breaks confidentiality | Crypto failure | XChaCha random 192-bit nonce; GCM nonce derived, never random; one scheme per store |
| Malicious drive tampers/reorders ciphertext | Tampering | AEAD tags + position-bound AAD; manifest hash-chain |
| Lost passphrase **and** recovery code | Availability | platform-keychain escrow + recovery code + optional Shamir; **accepted residual** (no vendor reset) |
| Recovery code mistyped → silent wrong-key | Integrity/UX | versioned + checksummed recovery code; validate before attempting decrypt |
| Device compromised while unlocked | Elevation/Disclosure | hardware-backed keys gated by biometrics; auto-lock; don't persist MK in plaintext; Data Protection at rest |
| Stolen/rooted device extracts keys | Info disclosure | non-exportable Secure Enclave/StrongBox keys; biometric-enrolment invalidation for the vault key; Play Integrity/App Attest for premium/sync backends (research) |
| Ex-collaborator reads future edits after removal | Access control | IK rotation + re-seal to remaining members (forward secrecy per notebook) |
| Partial-decrypt / fallback-plaintext leak on error | Exceptional conditions | fail closed; never render partial or unencrypted fallback |
| Passkey/authenticator loss | Availability | passphrase + recovery-code fallback paths; PRF two-salt rotation |

## Notes / follow-ups

- **verify** (see [`../architecture/crypto.md`](../architecture/crypto.md) §10): Argon2id availability/perf in
  the Dart stack + web WASM; XChaCha20 exposure in `cryptography` vs needing `sodium`; hardware backing in
  `flutter_secure_storage` (likely need bespoke `plugins/sane_secure_store`); recovery-code checksum scheme; passkey
  PRF runtime support matrix; BIP-39 mnemonic option licensing/i18n.
- Add a CI crypto-lint (semgrep rules) forbidding banned primitives and `dart:math` `Random` in crypto paths.
- Never lower Argon2id below 64 MiB / 5 iters without a new ADR.
