# PRD-03 — Identity, Sync, Privacy, Settings & Billing

> **Status:** Draft v1 · **Owner:** Maintainer (Jatin Kumar Singh) · **Applies to:** all five surfaces (iPadOS, iOS, Android phone/tablet, Web PWA).
> **Scope:** everything the user touches *around* the note-taking surface — how they get in (onboarding, login, guest mode, profiles), how their notes leave the device safely (local storage, file format, backup, sync, E2EE keys), how they control the product (settings, privacy dashboard, notifications), and how they pay (billing, student verification, telemetry, app lock, data-leak protections, account deletion).
> **Out of scope (see sibling PRDs):** the editor/ink surface, library/notebook management, search, and AI features are specified in the editor/library/search/AI PRDs. This document references them by repo-relative path where a boundary matters.

This PRD is written for an autonomous coding agent with zero prior context. Every requirement is normative and testable. Read it alongside:

- `docs/design/screens-and-flows.md` — the reverse-engineered UI spec (the source of truth for screen structure, control names, copy, and every preference key).
- `docs/design/design-system.md` and `docs/design/tokens.json` — visual tokens (17 looks, light/dark).
- `docs/research/sources/local-first-sync-and-crdt.md` — sync/CRDT/E2EE research (cited below as `research/local-first-sync-and-crdt.md`).
- `docs/research/sources/pricing-monetization-and-student-verification.md` — billing/entitlement/student-verification research (`research/pricing-monetization-and-student-verification.md`).
- `docs/research/sources/security-standards-and-devsecops.md` — MASVS/ASVS/privacy-law/DevSecOps baselines (`research/security-standards-and-devsecops.md`).
- [`docs/adr/0001-flutter-single-codebase.md`](../adr/0001-flutter-single-codebase.md) (stack), [`docs/security/threat-model.md`](../security/threat-model.md) (STRIDE + LINDDUN), `.github/workflows/devsecops.yml` — referenced where they own a decision.

---

## 0. How to read this document

### 0.1 Requirement ID scheme
Every requirement has a stable ID `PRD-<AREA>-<NNN>`. The `<AREA>` code never changes even if this file is renumbered; agents and issues cite the full ID. Areas used here:

| Code | Area | Section |
|---|---|---|
| `AUTH` | Onboarding & login | §1 |
| `PROF` | Profiles | §2 |
| `STOR` | Local storage & file format | §3 |
| `BKP` | Backup & restore (local) | §4 |
| `SYNC` | Cloud sync | §5 |
| `KEY` | E2EE key management | §6 |
| `SET` | Settings & preferences | §7 |
| `PRIV` | Privacy dashboard & rights | §8 |
| `NOTIF` | Notifications & reminders | §9 |
| `BILL` | Billing & entitlements | §10 |
| `TEL` | Telemetry | §11 |
| `LOCK` | App lock | §12 |
| `LEAK` | Clipboard & screenshot protections | §13 |
| `DEL` | Account deletion | §14 |

### 0.2 Normative keywords & priority
**MUST** / **SHOULD** / **MAY** follow RFC 2119. Priority: **P0** = launch-blocking / risk-gated (M0–M1); **P1** = v1.0 ship; **P2** = a later milestone (M2+; real-time collab is M6). A requirement with no explicit priority is P1.

### 0.3 Global principles this PRD inherits (locked decisions)
1. **Local-first, zero-knowledge.** No Sane Notes server ever stores note content. Notes live on-device; optional sync uses the **user's own cloud** (iCloud Drive / Google Drive). Everything in the cloud is end-to-end encrypted. (`research/local-first-sync-and-crdt.md` §1, §6.)
2. **Identity is never required to take notes.** Guest mode is first-class; sign-in exists only for profile display, sharing/collab, and entitlements.
3. **Privacy by default.** Target OWASP **MASVS L2 + R** for clients, **ASVS 5.0 L2** for the web app and the (minimal, ciphertext-only) relay; Play Data Safety declares *no data collected* except opt-in crash reports; App Store privacy labels minimal. (`research/security-standards-and-devsecops.md` §1, §5.)

### 0.4 Naming correction (blocks implementation)
The design mock shows a first-party backup target **"SS Cloud"** and an older product name "SS Notes" (`docs/design/screens-and-flows.md` §0, §12 open questions 1 & 17). **A first-party "SS Cloud"/"Sane Cloud" backup target directly contradicts locked decision #3 (no Sane server stores note content).** Resolution for this PRD: **there is no first-party cloud.** All "back up to" targets are the user's own cloud. `SET` and `SYNC` requirements below replace the "SS Cloud" option accordingly and record the removed option as a migration note.

---

## 1. Onboarding & login (`AUTH`)

Screens: **Login** (`loginStep ∈ {methods, phone, otp}`), **Profiles**, **Onboarding** (3 steps). Copy and control names are fixed by `docs/design/screens-and-flows.md` §3, §4, §5 and MUST be preserved.

### 1.1 Sign-in methods

| ID | Pr | Requirement |
|---|---|---|
| `PRD-AUTH-001` | P0 | The Login screen **MUST** offer exactly these methods on `loginStep='methods'`: **Continue with Google**, **Continue with Apple**, **Continue with Microsoft**, a divider, then **Continue with mobile number** (accent/primary). Apple sign-in **MUST** be present on all Apple platforms (App Store requirement when other social logins exist). |
| `PRD-AUTH-002` | P0 | Each social method **MUST** use the platform's native SDK / OS account picker (Sign in with Apple via `ASAuthorization`; Google via the Credential Manager / GIS SDK; Microsoft via MSAL) behind the federated plugin layer, **never** an in-app web form collecting the provider password. On success → navigate to **Profiles**, show toast "Signed in with \<Provider\>". |
| `PRD-AUTH-003` | P0 | Phone OTP: `loginStep='phone'` shows a fixed **+91** prefix (locale-derived; MUST support other country codes at GA — verify list), numeric input stripped of non-digits. **Send code** rejects `<10` digits with toast "Enter a 10-digit mobile number"; otherwise advances to `otp` and toasts "Code sent to +91 \<phone\>". `loginStep='otp'` takes a 6-digit code; **Verify and continue** rejects `<6` digits, else navigates to **Profiles**. **Change number** and **Resend code** MUST be present. |
| `PRD-AUTH-004` | P1 | OTP delivery **MUST** rate-limit resends (≥ 30 s between sends, ≤ 5/hour/number) and expire codes (≤ 10 min). OTP verification is an **authentication** control (MASVS-AUTH-1, ASVS V6): codes MUST be single-use and server-verified by the auth provider, never validated client-side. |
| `PRD-AUTH-005` | P1 | The fine print "By continuing you agree to the Terms and Privacy Policy. Handwriting recognition runs on your device." **MUST** link Terms and Privacy Policy to live URLs and **MUST** remain literally true (on-device recognition is the default per locked decision #6). |
| `PRD-AUTH-006` | P1 | Tokens from any provider **MUST** be stored only in the platform secure store (Keychain / Keystore, MASVS-STORAGE-2) as short-lived access + refresh tokens; **MUST NOT** be written to the notes DB, logs, backups, or the synced cloud store. No identity token is required to open, create, or edit notes (see `PRD-AUTH-010`). |

### 1.2 Guest mode (first-class)

| ID | Pr | Requirement |
|---|---|---|
| `PRD-AUTH-007` | P0 | The Login screen **MUST** offer a **"Skip for now — take notes without an account"** action (tertiary link under the methods). *Design gap:* the mock has no such control (`docs/design/screens-and-flows.md` open questions). This PRD makes it mandatory to satisfy locked decision #2. Choosing it creates a local **Guest** profile and lands on **Library** (no Onboarding gate beyond the optional tour). |
| `PRD-AUTH-008` | P0 | Guest mode **MUST** provide the full note-taking experience: create/edit/organize notebooks, ink, PDF import (subject to Free limits), audio, on-device search, local export. It **MUST NOT** require any network call to function. |
| `PRD-AUTH-009` | P1 | Guest mode disables only account-bound features: cloud sync, sharing/collaboration, cross-device entitlement, and student verification. Each such surface **MUST** show a single inline "Sign in to \<benefit\>" affordance rather than blocking the whole screen. |
| `PRD-AUTH-010` | P0 | Signing in later **MUST** adopt (not discard) the existing guest data: the current local workspace is attached to the new identity in place. The app **MUST** show a one-line confirmation ("Your notes stay on this device and are now linked to \<account\>") and MUST NOT upload anything until sync is explicitly enabled (`PRD-SYNC-001`). |

### 1.3 Development auth bypass (P0 risk-tracked)

| ID | Pr | Requirement |
|---|---|---|
| `PRD-AUTH-011` | P0 | A compile-time flag `--dart-define=SANE_AUTH_BYPASS=true` **MAY** short-circuit login in **debug/profile** builds only, dropping straight to a seeded profile. It **MUST** be impossible to activate in a **release** build: the release entrypoint MUST `assert`/hard-fail at startup if the flag resolves true, and the value MUST be read only through a single `BuildConfig`-style accessor that returns a compile-time `false` in release mode. |
| `PRD-AUTH-012` | P0 | CI **MUST** fail the release job if `SANE_AUTH_BYPASS` (or any equivalent bypass string) is present in a release artifact's compiled defines or string table. This is tracked as a **P0 security risk** in `docs/security/threat-model.md` (STRIDE-Spoofing / MASVS-AUTH-1) and wired into `.github/workflows/devsecops.yml`. |
| `PRD-AUTH-013` | P1 | While bypass is active (non-release only), the app **MUST** render a persistent on-screen watermark "AUTH BYPASS — dev build" so a bypassed build can never be mistaken for production in screenshots or demos. |

### 1.4 Onboarding tour (3 steps) & subject picking

The tour is a full-bleed overlay opened after first profile pick on first run; it is replayable from **Settings → Account → "Replay the welcome tour"** (`docs/design/screens-and-flows.md` §5, §12).

| ID | Pr | Requirement |
|---|---|---|
| `PRD-AUTH-014` | P1 | Step 0 ("Every way you take notes, in one notebook.") **MUST** show the three feature rows verbatim: *Ink that keeps up*, *Slides and PDFs inside your notes*, *Audio linked to your ink*. It is informational only. |
| `PRD-AUTH-015` | P1 | Step 1 ("What are you studying?") **MUST** present the 12 subject chips from `STUDY` — Physics, Mathematics, Chemistry, Biology, Computer Science, Economics, Design, Law, Medicine, Languages, History, Engineering — multi-select, with **Physics + Mathematics preselected**. Selected subjects **MUST** seed matching subject entries (with the design's subject colours) and a sensible default paper per subject (verify defaults with the editor PRD). Copy: "We'll set up subjects and pick sensible paper for each. Change anything later." |
| `PRD-AUTH-016` | P1 | Step 2 ("Pick your look.") **MUST** show three theme cards + a **Dark mode** toggle; selecting a card sets the active look (`themeSel`). The full 17-look grid lives in Settings → Appearance, not here. |
| `PRD-AUTH-017` | P1 | Navigation: **Skip** closes immediately with no data loss; **Continue** advances 0→1→2; on step 2 the button reads **Start writing** and lands on Library. The onboarding backdrop **MUST NOT** dismiss the overlay on outside-click (unlike other overlays). |
| `PRD-AUTH-018` | P1 | The tour and all subject/look choices **MUST** be re-runnable and non-destructive: replaying never deletes existing subjects, only offers additions. Choices persist per profile (see `PROF` isolation, §2). |

---

## 2. Profiles (`PROF`)

"Who's writing?" — multiple **local** profiles on one device, one shared sign-in (`docs/design/screens-and-flows.md` §4, §12). Profiles are a Netflix-style local partition, not separate cloud accounts.

| ID | Pr | Requirement |
|---|---|---|
| `PRD-PROF-001` | P1 | The Profiles screen **MUST** list all local profiles as tiles (rounded-square avatar with initial, name, note). Tapping a tile activates it and opens Library; first run after login also opens Onboarding. The active profile shows an accent ring + "Current"; others show "Switch". |
| `PRD-PROF-002` | P1 | **Add profile** reveals an inline name input (max 24 chars) → **Create** appends a profile with a rotating colour, role "Member", note "New profile"; toast "Profile added — \<name\>". **Cancel** dismisses. The same add/switch flow MUST also exist under Settings → Account → "Profiles on this account". |
| `PRD-PROF-003` | P1 | **Use a different account** signs the whole device out (back to Login). Sign-out MUST NOT delete local note data by default; it clears identity tokens only. (Data deletion is `DEL`, §14.) |
| `PRD-PROF-004` | P0 | **Per-profile data isolation.** Each profile **MUST** own an isolated partition of: notebooks/pages/attachments, look/dark-mode/wallpaper, all `SET` preferences, sync configuration, and (where applicable) its own encryption sub-keys. Switching profiles MUST swap the entire visible dataset — resolving `docs/design/screens-and-flows.md` open questions 15 & 16 (in the mock, switching only changes the avatar; that is a mock limitation, not the spec). |
| `PRD-PROF-005` | P0 | **Per-profile lock (biometric).** A profile **MAY** be marked "locked". A locked profile **MUST** require device biometric (Face ID / Touch ID / Android BiometricPrompt class 3) or the device passcode as fallback before its tiles open. Locked-profile note content, thumbnails, and search index MUST remain encrypted-at-rest and unreadable until unlock (MASVS-STORAGE-1, MASVS-AUTH). See interaction with app-wide lock in `LOCK` §12. |
| `PRD-PROF-006` | P1 | Entitlement scope: a Pro entitlement is **account-scoped, shared across all profiles** on that signed-in account (matching the entitlement-provider model, `research/pricing-monetization-and-student-verification.md` §3). A **Guest** profile with no account gets Free limits. Document the family-plan interaction in `BILL` §10. |
| `PRD-PROF-007` | P2 | Profile management (rename, change note/colour, delete a profile, set/clear lock) **MUST** be reachable from Settings → Account. Deleting a profile MUST warn that it removes that profile's local notes (and prompt to export first), and MUST NOT touch other profiles. |

---

## 3. Local storage & file format (`STOR`)

Notes are stored on-device; sync (§5) is a separate, optional layer over the same data. Model per locked decisions #3, #4 and `research/local-first-sync-and-crdt.md` §3, §8, §9.

| ID | Pr | Requirement |
|---|---|---|
| `PRD-STOR-001` | P0 | Structured data (workspace → profiles → notebooks → pages → layers → objects, plus the search index) **MUST** persist in a local **SQLite database via `drift`**. Heavy immutable payloads — ink stroke sample blobs, PDF pages, audio, images — **MUST** be stored in a **content-addressed blob store** (`blobs/<hash>`), referenced from the DB by hash + metadata. |
| `PRD-STOR-002` | P0 | The document model **MUST** follow locked decision #4: Stroke (points with x,y,pressure,tilt,azimuth,timestamp, stored as compressed deltas), Text block (sequence-CRDT rich text), Image, Shape, Audio anchor, Link/backlink, Sticker, Table; CRDT semantics = add-wins set of object ids + LWW registers (HLC-stamped) per `research/local-first-sync-and-crdt.md` "Recommended data model". |
| `PRD-STOR-003` | P0 | **Local encryption at rest.** On a signed-in account with sync/E2EE enabled, the local DB and blob store **MUST** be encrypted at rest with keys held in Keychain/Keystore (MASVS-STORAGE-1/2, M9). For a pure-local Guest with no passphrase, at-rest encryption **SHOULD** still use a device-bound Keystore/Keychain key so a stolen unlocked-filesystem image does not trivially reveal notes; this is a device-protection layer, not zero-knowledge E2EE (which requires a user key source, §6). |
| `PRD-STOR-004` | P0 | **Open file format `.sanenote`.** The documented bundle **MUST** be: `manifest.json` (ids, schema version, HLC vector, content hashes), `note.json` (structure + rich text as portable Peritext/JSON), `strokes/` (open stroke format: points, pressure, tilt, azimuth, tool, colour, timestamps), and `attachments/` (original PDF/audio/image blobs). A published spec MUST accompany v1 (longevity ideal #5, `research/local-first-sync-and-crdt.md` §9). |
| `PRD-STOR-005` | P1 | Exports **MUST** support: `.sanenote` (lossless, keeps audio sync), **PDF** (renders ink + highlights + PDF layers), **PNG** (single page), **SVG**, **Markdown** (text-lossy), and **JSON**. Export from device is always **decrypted/cleartext** so ownership is real (`research/local-first-sync-and-crdt.md` §9). Export MUST be available **even on Free** (design: "Export everything … yours to keep, even on Free"). |
| `PRD-STOR-006` | P1 | **Trash & retention.** Deleting a notebook is a **tombstone op** (CRDT-friendly), not a destructive erase; it moves to **Trash** and is physically purged after **30 days** (design copy: "deleted notebooks stay here for 30 days"). Trash MUST offer restore before purge. *Design gap:* the mock's Trash is always empty and has no delete/restore control (open questions 2–4); this PRD makes delete/restore/30-day-purge required and delegates the control's placement (overflow ⋯ / long-press) to the library PRD. |
| `PRD-STOR-007` | P1 | Version history **MUST** derive from the op-log + periodic snapshots (bounded ring, e.g. hourly-for-a-day + daily-for-a-month). Unlimited history is a Pro capability; Free retains **7 days** (aligns with category norms in `research/pricing-monetization-and-student-verification.md` §1 and the plan matrix, §10). |
| `PRD-STOR-008` | P2 | Attachments are **content-addressed, immutable, per-blob encrypted** (§6). Unreferenced blobs are garbage-collected only after the trash/version retention window has passed (`research/local-first-sync-and-crdt.md` §8). |

---

## 4. Backup & restore — local (`BKP`)

"Backup" here = a **user-driven local archive** (device → user's own storage), distinct from continuous cloud **sync** (§5). This separates the three overlapping concepts the design conflates (open question 17): **sync** (continuous, cloud, per-op), **backup target** (which cloud sync writes to — folded into `SYNC`), and **export/backup archive** (a one-shot ZIP the user keeps).

| ID | Pr | Requirement |
|---|---|---|
| `PRD-BKP-001` | P1 | **Export everything** (Settings → Privacy & export) **MUST** produce a single ZIP containing every notebook of the *current profile* as both PDF and `.sanenote`, plus a top-level `manifest.json`. Toast "Preparing a ZIP of every notebook (PDF + .sane)…"; the archive is handed to the OS share/save sheet. Available on Free. |
| `PRD-BKP-002` | P1 | Export **MUST** run without any network and MUST decrypt content into the archive (the archive is the user's plaintext copy). The UI MUST warn once that the exported archive is unencrypted and is the user's responsibility to store safely (LINDDUN-Disclosure; `research/security-standards-and-devsecops.md` §4.2). |
| `PRD-BKP-003` | P1 | **Restore/import** of a `.sanenote` bundle or an exported ZIP **MUST** be supported: it re-creates notebooks under the current profile, merging (not overwriting) by object id via CRDT rules so a restore onto an existing dataset is idempotent and conflict-free. Import of a single PDF/image is the editor's import flow, not this restore path. |
| `PRD-BKP-004` | P2 | The app **SHOULD** offer a scheduled local auto-archive (e.g. weekly `.sanenote` snapshot to a user-chosen folder) as a belt-and-suspenders backup independent of cloud sync, off by default. |

---

## 5. Cloud sync (`SYNC`)

Sync is **opt-in**, over the **user's own cloud**, **end-to-end encrypted**, and built so the cloud is dumb ciphertext transport (`research/local-first-sync-and-crdt.md` §4, §6). Settings live under **Sync & backup** (`docs/design/screens-and-flows.md` §12).

### 5.1 Opt-in, provider choice, transport

| ID | Pr | Requirement |
|---|---|---|
| `PRD-SYNC-001` | P0 | Sync **MUST** be **off until the user turns it on**. Turning on **Sync automatically** (`autoSync`) is the master switch; when off, nothing leaves the device. The first enable MUST run the key-setup flow (§6) and provider-choice flow before any upload. |
| `PRD-SYNC-002` | P0 | **Back up to** (provider choice) **MUST** offer: **iCloud Drive** (Apple platforms only) and **Google Drive** (all platforms), with later OneDrive / Dropbox / WebDAV (P2). The mock's **"SS Cloud"** default **MUST be removed** (see §0.4). Default target: **iCloud Drive on Apple platforms, Google Drive elsewhere**; the user can change it. Exactly one active target per profile at a time. |
| `PRD-SYNC-003` | P0 | Everything written to any provider **MUST** already be ciphertext (XChaCha20-Poly1305 or AES-256-GCM, envelope-encrypted, §6). The provider MUST be usable purely as bytes-in/bytes-out; no Sane-operated server participates in note storage (locked decision #3). |
| `PRD-SYNC-004` | P0 | **Sync unit = single-writer append-only op-log segments + periodic compacted snapshots**, per note/page directory: `notes/<opaqueId>/ops/<deviceId>.<seq>.enc`, `notes/<opaqueId>/snap/<n>.enc`, `attachments/<hash>.enc`, `manifest.enc`. Because each file has a **single writer**, the cloud never needs to make a conflict copy (`research/local-first-sync-and-crdt.md` §4). All whole-file rewrites (snapshots) MUST be **atomic temp-write + fsync + rename**. |
| `PRD-SYNC-005` | P1 | **iCloud Drive** access **MUST** go through `NSFileCoordinator` + `NSFilePresenter`, observe state via `NSMetadataQuery`, handle placeholder eviction (`isUbiquitousItem`, `startDownloadingUbiquitousItem`), and **MUST NOT** assume it can force a sync (iOS schedules by network/battery/thermal). If a snapshot ever conflicts, resolve silently by CRDT-merging all `NSFileVersion` variants and writing one resolved snapshot — never surface a conflict file (`research/local-first-sync-and-crdt.md` §4). |
| `PRD-SYNC-006` | P1 | **Google Drive** **MUST** use a **visible app folder** (`drive.file` scope) for longevity (user keeps the encrypted bundle even after uninstall), reserving `appDataFolder` for device/config state only. Incremental change detection MUST use the **Changes API** (`startPageToken`) with **watch push** where available, backing off on 403/429 (`research/local-first-sync-and-crdt.md` §4). |
| `PRD-SYNC-007` | P1 | **Metadata minimization.** Note/file names in the cloud **MUST** be opaque ids; the human name→id map lives only inside encrypted payloads. Sizes SHOULD be padded/rounded. The PRD MUST document (in `docs/security/threat-model.md`, LINDDUN) exactly what metadata is intentionally cleartext (e.g. per-device segment counts) and why. |

### 5.2 Network policy, status UI, conflicts

| ID | Pr | Requirement |
|---|---|---|
| `PRD-SYNC-008` | P1 | **Wi-Fi only** (`wifiOnly`, default **off**) — when on, the app **MUST** hold **large uploads (audio, PDF, images)** until Wi-Fi/unmetered; small op-log text segments MAY still sync on cellular unless the user disables all cellular sync. Copy: "Hold audio and PDF uploads on mobile data." |
| `PRD-SYNC-009` | P1 | **Status UI.** The app **MUST** expose a per-notebook and global sync status with these states: **Up to date**, **Syncing…** (with progress for large blobs), **Waiting for Wi-Fi**, **Paused (no key)**, **Offline — will sync later**, **Attention needed** (auth expired / quota full / provider disconnected). A manual **"Sync now"** affordance MUST exist because iCloud/Drive cannot be force-synced (`research/local-first-sync-and-crdt.md` §4). Latency of seconds-to-hours MUST be tolerated without data-loss UX. |
| `PRD-SYNC-010` | P0 | **Conflict handling MUST be automatic and invisible.** Concurrent edits merge via CRDT (add-wins object set + LWW registers, HLC tie-broken by `deviceId`); ink strokes are immutable objects so two devices drawing at once simply create two strokes (`research/local-first-sync-and-crdt.md` §3). The app **MUST NEVER** show a "conflicted copy" file or a manual merge prompt. If a raw provider conflict copy appears (iCloud/Dropbox), it MUST be ingested as another replica, merged, and the extra deleted. |
| `PRD-SYNC-011` | P1 | **Quota/error resilience.** On provider quota exhaustion or throttling, the app **MUST** surface "storage full / \<provider\> unavailable", keep working locally, compact aggressively, dedupe attachments, and retry with exponential backoff. Auth expiry MUST prompt a single re-auth, not silent failure. |

### 5.3 Storage caps (Free vs Pro) — tension note

| ID | Pr | Requirement |
|---|---|---|
| `PRD-SYNC-012` | P1 | The design's "**5 GB** (Free) / **50 GB** (Pro) backup" and the storage meter ("1.8 GB of 5 GB") **MUST** be reinterpreted as an **app-enforced soft cap on how much encrypted data Sane will sync into the user's own cloud** — *not* Sane-hosted storage (there is none, decision #3). Beyond the Free cap, the client MUST pause syncing new large attachments and prompt Upgrade, while never blocking local note-taking. **Open decision for the maintainer:** whether to enforce any cap at all given the user owns the storage — see §15. |

### 5.4 Multi-device pairing

| ID | Pr | Requirement |
|---|---|---|
| `PRD-SYNC-013` | P0 | Adding a second device **MUST** reconcile via: (a) the same signed-in account choosing the same provider, then (b) obtaining the **master key** through one of the §6 sources — passkey-PRF or platform-keychain sync (iCloud Keychain / Google Password Manager) **or** manual **recovery-code** entry. Once keyed, the new device loads the latest snapshot + replays every device's op-log tail (`research/local-first-sync-and-crdt.md` §4, §6). |
| `PRD-SYNC-014` | P1 | The **Multi-device** screen **MUST** list paired devices (name, platform, last-seen), allow **naming** the current device, and allow **revoking** a device (which rotates the relevant wrapped keys so a lost device loses future access, §6.4). Each device has its own `deviceId` used in op-log filenames and HLC tie-breaks. |
| `PRD-SYNC-015` | P2 | Real-time collaboration (M6) is **out of scope for v1 sync** and specified in the collaboration PRD: WebRTC data channels + optional **ciphertext-only relay**, room-password-encrypted signaling, share links carrying a wrapped content key in the URL **fragment** (never sent to a server) (`research/local-first-sync-and-crdt.md` §7). This PRD only guarantees the file-based v1 layer that collab reconciles against when peers are offline. |

---

## 6. E2EE key management UX (`KEY`)

The hardest UX in the product: strong zero-knowledge encryption that ordinary students can actually recover. Scheme from `research/local-first-sync-and-crdt.md` §6 (Standard Notes / Notesnook envelope model).

### 6.1 Key hierarchy & sources

| ID | Pr | Requirement |
|---|---|---|
| `PRD-KEY-001` | P0 | **Envelope encryption MUST be used:** random **content key** per note/page/attachment → wrapped by an **items key** → wrapped by the user **master key**. A passphrase change re-wraps only items keys, never gigabytes of notes. AEAD = **XChaCha20-Poly1305** (preferred; 192-bit random nonce) or AES-256-GCM; sub-keys derived via **HKDF** (`research/local-first-sync-and-crdt.md` §6). |
| `PRD-KEY-002` | P0 | The master key **MUST** be obtainable through a best-to-fallback ladder, offered in this order: (1) **passkey PRF** (WebAuthn `prf`) — passwordless, hardware-gated, synced by the platform; (2) **platform keychain** storage of the wrapped master key (iCloud Keychain on Apple, Android Keystore/StrongBox, gated by `setUserAuthenticationRequired` biometrics); (3) **passphrase + Argon2id** (64 MiB memory, 5 iterations, parallelism 1, per-user random salt derived from a stored seed) (`research/local-first-sync-and-crdt.md` §6). The master key **MUST NEVER** be persisted in plaintext or leave the device unwrapped. |
| `PRD-KEY-003` | P0 | Turning on sync/E2EE for the first time **MUST** run a short setup: choose a key source (default to passkey where supported, else passphrase), then **immediately generate and force the user to save a recovery code** (`PRD-KEY-005`) before any data is encrypted for upload. |
| `PRD-KEY-004` | P1 | The E2EE setup and every key screen **MUST** state plainly, in student-readable language, that **Sane cannot recover their notes** if both the key source and the recovery code are lost ("There is no password reset. If you lose your recovery code and your devices, your notes cannot be recovered — not even by us."). This is the honest cost of true zero-knowledge (`research/local-first-sync-and-crdt.md` §6, threat "lost passphrase = permanent loss"). |

### 6.2 Recovery code UX

| ID | Pr | Requirement |
|---|---|---|
| `PRD-KEY-005` | P0 | At setup the app **MUST** generate a high-entropy **recovery code** that wraps an escrow copy of the master key. UX: display the code grouped/spaced, offer **Copy** and **Download/Save as PDF (printable)**, and require the user to **confirm they saved it** (re-enter a portion or tick an explicit confirmation) before continuing. The escrow blob (recovery-code-wrapped master key) MAY be stored in the user's own cloud; it MUST NEVER be stored by Sane. |
| `PRD-KEY-006` | P1 | The recovery code **MUST** be re-viewable/re-generatable later from **Settings → (Sync &) Security**, gated behind biometric/app-lock. Regenerating rotates the escrow wrapping and invalidates the old code. |
| `PRD-KEY-007` | P1 | Recovery flow on a new/wiped device: entering the recovery code **MUST** unwrap the master key and complete pairing (`PRD-SYNC-013`). Rate-limit/brute-force-harden the entry (memory-hard unwrap + attempt backoff). |

### 6.3 Passphrase / key change

| ID | Pr | Requirement |
|---|---|---|
| `PRD-KEY-008` | P1 | Changing the passphrase or rotating the passkey **MUST** re-wrap items keys only and issue a **new default items key** going forward (forward secrecy for future content), matching the Standard Notes model (`research/local-first-sync-and-crdt.md` §5, §6). Old content stays readable via retained wrapped items keys. |
| `PRD-KEY-009` | P1 | Key operations **MUST fail closed**: on any decrypt/keying error the app shows "Paused (no key)" and MUST NOT display partial or garbled note content, MUST NOT upload plaintext, and MUST NOT silently drop data (2025 OWASP A10 "mishandling exceptional conditions", `research/security-standards-and-devsecops.md` §1.2, control "Exceptional conditions"). |

### 6.4 Revocation

| ID | Pr | Requirement |
|---|---|---|
| `PRD-KEY-010` | P1 | Revoking a device (`PRD-SYNC-014`) or a collaborator (M6) **MUST** rotate the affected content/items keys and re-wrap for remaining members/devices, so the revoked party cannot decrypt data written after revocation (`research/local-first-sync-and-crdt.md` §7). Already-synced ciphertext they hold cannot be un-sent; the UI MUST say so honestly. |

---

## 7. Settings & preferences (`SET`)

Settings has six tabs (`docs/design/screens-and-flows.md` §12). Every preference below **MUST** exist with the stated key, default, label, and one-line description, and **MUST** persist per profile (§2, `PRD-PROF-004`) unless the "Scope" column says otherwise. Toggles are OS-styled switches; segmented controls are single-select.

### 7.1 Preference inventory (complete)

| ID | Key | Tab | Control | Default | Scope | Label / description (verbatim where quoted) |
|---|---|---|---|---|---|---|
| `PRD-SET-001` | `autoSync` | Sync & backup | toggle | **on** | profile | "Sync automatically — Every page, on every device, within seconds." Master sync switch (§5). |
| `PRD-SET-002` | `wifiOnly` | Sync & backup | toggle | **off** | profile | "Wi-Fi only — Hold audio and PDF uploads on mobile data." (`PRD-SYNC-008`.) |
| `PRD-SET-003` | `backup` | Sync & backup | segmented | **iCloud/Google Drive per platform** | profile | "Back up to" — provider target. **Replaces "SS Cloud"** (§0.4). Options: iCloud Drive (Apple only), Google Drive. |
| `PRD-SET-004` | — | Sync & backup | meter | — | profile | Storage meter (used/cap); reinterpreted per `PRD-SYNC-012`. "Audio recordings use most of it. Pro raises the limit to 50 GB." |
| `PRD-SET-005` | `palm` | Handwriting & stylus | toggle | **on** | profile | "Palm rejection — Ignore your resting hand while you write." |
| `PRD-SET-006` | `pressure` | Handwriting & stylus | toggle | **on** | profile | "Pressure sensitivity — Thicker ink when you press harder." |
| `PRD-SET-007` | `finger` | Handwriting & stylus | toggle | **off** | profile | "Draw with finger — Off means fingers only scroll and pinch." |
| `PRD-SET-008` | `leftHanded` | Handwriting & stylus | toggle | **off** | profile | "Left-handed mode — Moves the page rail to the left so your hand never covers it." |
| `PRD-SET-009` | `dock` | Handwriting & stylus | segmented | **bottom** | profile | "Toolbar position" — Bottom / Top / Left / Right; also settable by dragging the toolbar grip. |
| `PRD-SET-010` | `dblTap` | Handwriting & stylus | segmented | **Eraser** | profile | "Double-tap the pencil" — Eraser / Previous tool / Colors. "Apple Pencil and S Pen." |
| `PRD-SET-011` | `themeSel` (Look) | Appearance | 17-card grid | **paper** | profile | "Look" — 17 theme cards; each restyles the whole app including notebooks. |
| `PRD-SET-012` | `darkSel` | Appearance | toggle | **off (system)** | profile | "Dark mode — Every look has a night version; PDFs keep their original colors." |
| `PRD-SET-013` | `sane.wall` (wallpaper) | Appearance | upload + 6 presets + Blur/Veil | **none** | **device** | Wallpaper (Aurora, Dusk, Ink wash, Sand, Meadow, Graphite) + uploaded photo; Blur 0–40px, Veil 0–80%. Explicitly "saved on this device" (localStorage / device store). |
| `PRD-SET-014` | `reminders` | Notifications | toggle | **on** | profile | "Class reminders — Open the right notebook 5 minutes before a lecture." (§9.) |
| `PRD-SET-015` | `sharedNotif` | Notifications | toggle | **on** | profile | "Shared notebook activity — When someone writes in a notebook you share." |
| `PRD-SET-016` | `tips` | Notifications | toggle | **off** | profile | "Tips — One short tip a week, never more." |
| `PRD-SET-017` | `onDevice` | Privacy & export | toggle | **on** | profile | "On-device handwriting recognition — Your ink never leaves the device to become searchable." (§8.) |
| `PRD-SET-018` | `exportAll` | Privacy & export | action | — | profile | "Export everything" → ZIP of PDF + .sane (`BKP` §4). |

### 7.2 Settings behaviour requirements

| ID | Pr | Requirement |
|---|---|---|
| `PRD-SET-019` | P1 | Every toggle/segment change **MUST** apply immediately (no explicit Save), persist locally, and (where the setting is sync-relevant and sync is on) propagate as an LWW-registered op so preferences follow the profile across devices — **except** device-scoped settings (`sane.wall`) which stay local (design: "saved on this device"). |
| `PRD-SET-020` | P1 | **Account & plan** tab **MUST** contain: current-plan card (Free/Pro descriptions verbatim, §10), Upgrade / Manage-subscription CTA, Details rows (Name, Email, Student status "Verified · until \<date\>"), **Replay the welcome tour**, **Profiles on this account** (add/switch), and **Sign out** (destructive). |
| `PRD-SET-021` | P1 | **Appearance** changes MUST never alter PDF page colours even in dark mode (design invariant: "PDFs keep their original colors"). Wallpaper, when set, sits behind everything blurred and turns panels to frosted glass (respect `prefers-reduced-transparency` / accessibility, see the accessibility PRD). |
| `PRD-SET-022` | P1 | `onDevice=on` (default) **MUST** guarantee handwriting recognition/indexing runs locally; any cloud AI is a separate explicit per-request opt-in with a visible "data leaves device" indicator (locked decision #6). Turning `onDevice` off is not an invitation to silently send ink to the cloud — it only relaxes on-device indexing behaviour; cloud inference still requires its own consent. |
| `PRD-SET-023` | P2 | A **Security** area (may live under Sync & backup or its own row) **MUST** surface: app-lock config (`LOCK`), per-profile lock, recovery-code re-view/regenerate (`PRD-KEY-006`), paired devices (`PRD-SYNC-014`), and clipboard/screenshot protections (`LEAK`). |
| `PRD-SET-024` | P1 | **Stylus calibration.** Handwriting & stylus tab **MUST** provide a calibration/test affordance: a scratch area to preview pressure→width mapping and palm-rejection, plus (where the platform exposes it) a pressure-curve adjustment. This is the concrete home for tuning `pressure`/`palm`; exact curve UI is deferred to the editor/ink PRD. |

---

## 8. Privacy dashboard & rights (`PRIV`)

A single **Privacy** surface that makes the local-first/zero-knowledge promise legible and exercises legal rights. Backed by GDPR, India DPDP 2023, COPPA, CCPA (`research/security-standards-and-devsecops.md` §5) and MASVS-PRIVACY-1..4.

| ID | Pr | Requirement |
|---|---|---|
| `PRD-PRIV-001` | P1 | A **"What leaves this device"** panel **MUST** enumerate, truthfully and live: note content (never, unless sync on → then only ciphertext to the user's own cloud), handwriting recognition (on-device), any cloud AI request (only per explicit opt-in, with a running count), crash reports (only if opted in, §11), and identity tokens (to the auth provider only). Each row states destination + encryption state. |
| `PRD-PRIV-002` | P1 | A **Permissions** panel **MUST** list every OS permission the app can request (camera for scan, microphone for audio, photos, notifications, biometrics, cloud-drive access) with current grant state and a deep-link to OS settings. The app **MUST** request each permission **only at point of use**, with a purpose string (MASVS-PRIVACY-1, ASVS V14). |
| `PRD-PRIV-003` | P0 | **Data deletion / erasure.** The dashboard **MUST** offer: delete a notebook (→ Trash, `PRD-STOR-006`), wipe all local data for a profile, disconnect + delete the encrypted cloud store, and full **account deletion** (§14). Deletion MUST be self-service, MUST confirm scope, and MUST complete or clearly report partial completion (GDPR erasure, DPDP, CCPA delete). |
| `PRD-PRIV-004` | P1 | **DPDP/GDPR rights** **MUST** be exercisable in-app: **access/portability** = the Export-everything archive (§4) satisfies data portability; **rectification** = editing notes; **erasure** = deletion above; **withdraw consent** = toggling off sync/telemetry/AI at any time (DPDP: consent is withdrawable "as easily as given"); **objection** where applicable. A visible link to the Privacy Policy and a contact/redress channel MUST be present. |
| `PRD-PRIV-005` | P0 | **Age gate & children.** The app **MUST** implement a neutral age screen and, for users under the applicable threshold (**<13** COPPA, **<18** DPDP Rule 10), **MUST** require verifiable parental/guardian consent before any data collection and **MUST NOT** enable behavioural monitoring or targeted advertising to minors (there is none in this product by design). Age handling MUST be documented for store review. |
| `PRD-PRIV-006` | P1 | **Store privacy declarations MUST match reality:** Apple Privacy Nutrition Labels + a **Privacy Manifest** (`PrivacyInfo.xcprivacy`) declaring data use and Required-Reason API usage; Google Play **Data Safety** declaring *no data collected* except opt-in crash reports, encryption-in-transit, and user-requestable deletion (`research/security-standards-and-devsecops.md` §5.5). Third-party SDK data counts and MUST be minimized. |
| `PRD-PRIV-007` | P1 | **No third-party analytics/ad SDKs** ship in the client (MASVS-PRIVACY-4, CCPA "do not sell/share"). Any future SDK addition MUST be gated on a threat-model + privacy-label update (`docs/security/threat-model.md`). |

---

## 9. Notifications & reminders (`NOTIF`)

Preferences in `SET` §7 (`reminders`, `sharedNotif`, `tips`). Delivery mechanics below.

| ID | Pr | Requirement |
|---|---|---|
| `PRD-NOTIF-001` | P1 | Notifications **MUST** be off until the OS permission is granted at first relevant use; the three toggles gate categories, not the OS grant. Each notification MUST be actionable (open the relevant notebook/page) and MUST NOT include note content in the payload beyond a title the user authored (LINDDUN-Disclosure; lock-screen previews suppressed for locked profiles, `LEAK` §13). |
| `PRD-NOTIF-002` | P1 | **Class reminders** ("Open the right notebook 5 minutes before a lecture") require a **class schedule the app does not currently collect** (design open question 19). This PRD requires a lightweight **timetable source**: a manual class schedule editor (subject → day/time → notebook) and, optionally (P2), import from the device calendar with explicit consent. Reminders MUST be scheduled **locally** (local notifications), not via any server. |
| `PRD-NOTIF-003` | P2 | **Shared notebook activity** notifications depend on collaboration (M6). Until then the toggle exists but is inert/hidden; when live, activity signals MUST come through the ciphertext relay/WebRTC layer without exposing content to any server. |
| `PRD-NOTIF-004` | P1 | **Tips** (default off) **MUST** deliver at most one per week, be locally scheduled, contain no tracking, and be one tap to turn off from the notification itself. |

---

## 10. Billing & entitlements (`BILL`)

Zero-server monetization: sell/verify on iOS, Android, and web; unify behind a hosted entitlement provider keyed to a lightweight account (`research/pricing-monetization-and-student-verification.md` §3, §8, "Recommended entitlement architecture"). Screens: **Upgrade** overlay, **Account & plan** tab (`docs/design/screens-and-flows.md` §12, §13, §14).

### 10.1 Plan matrix (authoritative)

| Capability | Free | Pro | Req |
|---|---|---|---|
| Notebooks & pages | Unlimited | Unlimited | `PRD-BILL-001` |
| PDF imports | **5 / month** (gate → Upgrade) | Unlimited | `PRD-BILL-002` |
| Audio recording length | **30 minutes** | Unlimited (+ transcripts) | `PRD-BILL-003` |
| People per shared notebook | **3** (gate → Upgrade) | Unlimited + live cursors | `PRD-BILL-004` |
| Handwriting → text ("Convert to text") | ✗ (Pro gate) | ✓ searchable | `PRD-BILL-005` |
| Solve math | ✗ (Pro gate) | ✓ | `PRD-BILL-005` |
| Ask my notes | Pro **preview** only | ✓ | `PRD-BILL-005` |
| Templates | Lined / grid / dotted | Every template | `PRD-BILL-006` |
| Version history | 7 days | Unlimited | `PRD-STOR-007` |
| Cloud sync budget | 5 GB soft cap (`PRD-SYNC-012`) | 50 GB soft cap | `PRD-SYNC-012` |
| Export everything (PDF + .sane) | ✓ (even on Free) | ✓ | `PRD-STOR-005` |
| Price (India ref) | ₹0 | **₹999/yr (~₹83/mo)** or **₹149/mo**, 14-day trial | `PRD-BILL-007` |

### 10.2 Pricing, purchase, and legal path

| ID | Pr | Requirement |
|---|---|---|
| `PRD-BILL-001` | P1 | Free **MUST** allow **unlimited notebooks and pages** (deliberately more generous than GoodNotes' 3-notebook cap, the most-complained-about limit — `research/pricing-monetization-and-student-verification.md` §1, §"Recommended plan structure"). |
| `PRD-BILL-002` | P1 | The **PDF import** gate: on Free, the import overlay shows "N of 5 imports used this month"; at `importsUsed ≥ 5` opening import instead opens **Upgrade** with toast "Free plan: 5 PDF imports a month" (`docs/design/screens-and-flows.md` §9). Counter resets monthly. |
| `PRD-BILL-003` | P1 | The **30-minute** Free audio cap **MUST** be enforced (the mock only states it). Behaviour at 30:00: stop recording, save what exists, and surface an Upgrade prompt — **never silently truncate without saving** (resolves open question 6). |
| `PRD-BILL-004` | P1 | The **3-people** share gate: inviting a 4th person on Free opens Upgrade with toast "Free plan: up to 3 people per notebook" (`docs/design/screens-and-flows.md` §10). |
| `PRD-BILL-005` | P1 | Pro-gated actions (Convert to text, Solve math, full Ask-my-notes) **MUST** route Free users to the Upgrade overlay. "Ask my notes" on Free MAY show a labelled **PRO PREVIEW** teaser answer (resolve preview limits — N free asks vs always-teaser — per open question 7; default: a small monthly quota then Upgrade). |
| `PRD-BILL-006` | P1 | Free templates limited to **lined/grid/dotted**; other templates (Cornell, Music, Planner, Flashcards, etc.) are Pro. |
| `PRD-BILL-007` | P0 | Pricing **MUST** be store-localized, India-first: reference **₹999/yr (~₹83/mo)** and **₹149/mo**, yearly default with "save 44%", **14-day free trial**. Apple's 800 price points / Play localized INR MUST be used to hit round numbers; global pricing MAY differ (e.g. ~$2.99/mo, ~$19.99/yr) (`research/pricing-monetization-and-student-verification.md` §7.1, §"Recommended plan structure"). India **18% GST** applies. |
| `PRD-BILL-008` | P0 | **iOS purchases MUST use StoreKit 2 IAP.** Offline entitlement checks MUST use `Transaction.currentEntitlements` (Apple-signed **JWS**, verified on-device) so Pro works offline and cannot be trivially forged. Enroll the app in the **Small Business Program (15%)** and enable **Family Sharing** on the subscription (`research/pricing-monetization-and-student-verification.md` §2.2, §8.1). |
| `PRD-BILL-009` | P0 | **Android purchases MUST use Google Play Billing**, purchases acknowledged; add a lightweight **Play Integrity** app-integrity/licensing check with **tiered enforcement (degrade, never hard-lock)** to avoid false-positive lockouts (`research/pricing-monetization-and-student-verification.md` §9). In India, adopt **user-choice billing** to also offer Razorpay UPI and reduce the fee by 4%. |
| `PRD-BILL-010` | P1 | **Web checkout:** **Razorpay Subscriptions with UPI AutoPay** for India (many students have no card), **Stripe Billing** globally. A web purchase MUST unlock the mobile app under Apple **3.1.3(b) multiplatform** / Google cross-platform tolerance — which requires the same plan **also** be available via IAP/Play Billing. The app **MUST NOT** surface or deep-link the cheaper web price *inside* the iOS app except in the US storefront (post-Epic) or EU (DMA) (`research/pricing-monetization-and-student-verification.md` §4). |
| `PRD-BILL-011` | P0 | **Entitlement provider = RevenueCat** (recommended; free to $2,500 MTR then 1%) or equivalent (Adapty/Qonversion). It validates every transaction and shares one entitlement across iOS/Android/web for a signed-in account. The client **MUST** gate premium behind a **verified entitlement object** (cached last-known-good for offline grace), never a boolean on disk (`research/pricing-monetization-and-student-verification.md` §3, §9). The only "server" is this SaaS + the payment gateways. |
| `PRD-BILL-012` | P1 | **Restore purchases** **MUST** be a visible action (Account & plan and Upgrade) that re-reads entitlements from the provider/StoreKit and re-grants without re-charging. "Manage subscription" MUST deep-link the store's manage-subscription screen (design toast: "Opens your app-store subscription"). |
| `PRD-BILL-013` | P1 | **Family / household** plan (up to 6): enable **Apple Family Sharing** on the subscription (bonus, not the mechanism) and implement the household grant in the **entitlement provider layer** so it works identically on Android, where Play Family Library **cannot** share subscriptions (`research/pricing-monetization-and-student-verification.md` §5). |
| `PRD-BILL-014` | P2 | A one-time **"Lifetime"** hedge (e.g. ~₹1,999 / ~$49.99) **MAY** ship to defuse subscription backlash, excluding ongoing-cost features (heavy AI, sync beyond a cap) or making those a small add-on (`research/pricing-monetization-and-student-verification.md` §"Recommended plan structure"). Any future model/price change MUST **grandfather** existing subscribers at their old price and preserve one-time buyers' access. |

### 10.3 Student verification

| ID | Pr | Requirement |
|---|---|---|
| `PRD-BILL-015` | P1 | Student verification **MUST** be tiered: (1) instant **institutional-email** match against a curated allowlist (India `.ac.in`/`.edu.in`/university domains + global WHED list; free); (2) **SheerID** instant database match for anything not allowlisted; (3) SheerID **document upload** fallback. The discount **MUST** be granted as a **store promotional offer / offer code** (compliant with Apple 3.1.1 — never a hidden license key) (`research/pricing-monetization-and-student-verification.md` §6). |
| `PRD-BILL-016` | P1 | Verification **MUST** be time-boxed and **re-verified annually** so graduates roll off; the Account tab shows "Verified · until \<date\>" (design shows "until Jun 2027"). At expiry the app MUST prompt re-verification and, if not renewed, move the account to standard pricing without deleting notes (resolves open question 20). |

### 10.4 Anti-dark-pattern & accessibility of pricing UI

| ID | Pr | Requirement |
|---|---|---|
| `PRD-BILL-017` | P1 | Pricing UI **MUST** show the real recurring price, currency, and cadence *before* the CTA ("renews at ₹X/year, cancel anytime"), MUST make **cancel as easy as sign-up** (one tap to the store's manage-subscription / self-serve web portal), MUST have **no pre-selected add-ons or hidden auto-renew**, and MUST state trial first-charge date/amount clearly (`research/pricing-monetization-and-student-verification.md` §10 — FTC deceptive-design list + click-to-cancel best practice). |
| `PRD-BILL-018` | P1 | Pricing controls **MUST** meet accessibility basics: screen-reader labels on price/plan controls, no colour-only differentiation of the "recommended" plan, sufficient contrast, large tap targets (WCAG 2.2 AA per accessibility PRD). |
| `PRD-BILL-019` | P1 | **Refunds:** Apple/Google purchases are store-mediated (deep-link users to `reportaproblem.apple.com` / Play refund flow); for web (Stripe/Razorpay) purchases the app **MUST** offer a self-serve refund/cancel within a stated goodwill window since Sane controls those transactions. |

---

## 11. Telemetry (`TEL`)

| ID | Pr | Requirement |
|---|---|---|
| `PRD-TEL-001` | P0 | Telemetry **MUST** be **opt-in and off by default**. With it off, the app sends **no** usage or crash data. Play Data Safety therefore declares "no data collected" except when the user opts into crash reports (`research/security-standards-and-devsecops.md` §5.5). |
| `PRD-TEL-002` | P1 | When opted in, telemetry **MUST** be **aggregated on-device first** (counts/histograms, not raw events), stripped of note content and stable identifiers, and MUST NOT include any handwriting, text, PDF, or audio. Crash reports MUST scrub file paths, note titles, and tokens. |
| `PRD-TEL-003` | P1 | The telemetry toggle **MUST** live in the Privacy dashboard (§8) with a plain description of exactly what is sent, and be withdrawable at any time (DPDP consent withdrawal). Withdrawing MUST stop collection immediately and offer to delete already-sent aggregates where feasible. |
| `PRD-TEL-004` | P1 | Telemetry endpoints (if any) are the one narrow exception to "no Sane server for content" — they MUST be strictly separate infrastructure that never receives note content, documented in `docs/security/threat-model.md` (LINDDUN-Linkability/Identifiability). |

---

## 12. App lock (`LOCK`)

Distinct from per-profile lock (`PRD-PROF-005`): app lock guards the whole app on this device.

| ID | Pr | Requirement |
|---|---|---|
| `PRD-LOCK-001` | P1 | The app **MUST** offer an optional **App Lock** requiring device biometric (Face ID / Touch ID / Android BiometricPrompt class 3) or passcode fallback on launch and on return from background after a configurable timeout (Immediately / 1 min / 5 min / 15 min). Off by default. |
| `PRD-LOCK-002` | P1 | While locked, the app **MUST** show a lock screen (not note content), suppress content in the app switcher/recents snapshot (`LEAK` §13), and MUST NOT decrypt or index protected content. Failed biometric falls back to passcode; the app MUST NOT expose its own PIN that weakens the platform gate (MASVS-AUTH). |
| `PRD-LOCK-003` | P1 | App Lock and per-profile lock **MUST** compose predictably: unlocking the app does not auto-unlock a locked profile; each locked profile requires its own biometric confirmation when opened. |
| `PRD-LOCK-004` | P2 | The app **SHOULD** auto-lock on OS events that imply exposure risk (e.g. screen-recording start where detectable) and MUST re-lock on device lock. |
| `PRD-LOCK-005` | P1 | **Per-notebook & per-folder lock (gap-closure, 2026-09-13).** A user **MUST** be able to lock an individual **notebook or folder** with device biometric / passcode, independent of app lock (§12) and per-profile lock (`PRD-PROF-005`). A locked notebook's content, thumbnails, and search index **MUST** remain encrypted-at-rest and unreadable until unlock; locks **compose** — unlocking the app or the profile never auto-unlocks a locked notebook. Bar: Apple locked notes (E2EE), Goodnotes locked notebooks, Notability Locked Folders, OneNote section lock, Samsung note lock — and this project's own competitor-matrix target is "**v1** note lock (biometric)". _Refs: `docs/research/sources/apple-notes-freeform.md` §14; `docs/research/sources/notability.md` §Privacy; `docs/research/sources/goodnotes-userguide-inventory.md` §Lock; `docs/research/competitor-feature-matrix.md` §25._ |
| `PRD-LOCK-006` | P1 | **Locked-content behaviour.** While a notebook/folder is locked it **MUST** be excluded from global search results, Recent / "pick up where you left off", lock-screen and notification previews, and the app-switcher snapshot (`LEAK` §13); it **MUST NOT** be shareable or exportable until unlocked; unlock/recovery is tied to the key hierarchy (§6) with **no** separate weaker PIN that undercuts the platform gate. Locked items **MUST** still be captured in the owner's own local/cloud backup as **ciphertext** (`PRD-LEAK-005`). Counter Goodnotes (locked notebooks excluded from Auto Backup) and OneNote (locked sections excluded from search) as documented anti-patterns to avoid on the backup side while preserving the search/preview exclusion. _Refs: `docs/research/sources/goodnotes-userguide-inventory.md` §Lock; `docs/research/sources/onenote.md` §21._ |

---

## 13. Clipboard & screenshot protections (`LEAK`)

MASVS-PLATFORM-3 (screenshots, clipboard, notifications, backups) — `research/security-standards-and-devsecops.md` §1.4, control "Platform hardening".

| ID | Pr | Requirement |
|---|---|---|
| `PRD-LEAK-001` | P1 | A **"Hide contents when app is backgrounded"** setting **MUST** exist; when on (and always for locked profiles) the app **MUST** replace the app-switcher/recents snapshot with a blank/branded placeholder (Android `FLAG_SECURE` on secure surfaces; iOS overlay in `sceneWillResignActive`). |
| `PRD-LEAK-002` | P1 | For protected notes/profiles the app **MUST** offer screenshot/screen-record deterrence where the platform allows (Android `FLAG_SECURE`; iOS `UIScreen.capturedDidChangeNotification` to blur during capture). This MUST be a clearly-labelled option; the app MUST NOT claim it is unbreakable (best-effort deterrent). |
| `PRD-LEAK-003` | P1 | Copy-to-clipboard of note content **MUST** mark the clipboard item **sensitive** where supported (Android 13+ sensitive-content flag; avoid persistent pasteboard on iOS) and **SHOULD** auto-clear after a short interval. The app MUST NOT auto-copy content without user action. |
| `PRD-LEAK-004` | P1 | Notification payloads and lock-screen previews **MUST NOT** reveal protected note content (`PRD-NOTIF-001`); previews are suppressed for locked profiles. |
| `PRD-LEAK-005` | P1 | Local backups exposed to the OS (Android auto-backup, iOS device/iCloud backup) **MUST** exclude raw keys and, for E2EE data, contain only ciphertext; keys stay in Keychain/Keystore with backup-appropriate protection classes (MASVS-STORAGE-2). Android `allowBackup` MUST be configured to avoid leaking cleartext note data. |

---

## 14. Account deletion (`DEL`)

| ID | Pr | Requirement |
|---|---|---|
| `PRD-DEL-001` | P0 | The app **MUST** provide **self-service account deletion** reachable from Settings/Privacy (Apple requires an in-app account-deletion path when accounts exist). It MUST clearly distinguish three scopes and let the user choose: (a) **sign out** (keep local notes, drop tokens); (b) **delete cloud data** (wipe the encrypted store in the user's own cloud + disconnect provider); (c) **delete account** (revoke identity + entitlement association at the provider). |
| `PRD-DEL-002` | P0 | Account deletion **MUST** offer to **export everything first** (§4) and MUST require an explicit typed/confirmed consent. It MUST state plainly what is and isn't recoverable (zero-knowledge: once the cloud store and keys are gone, data is unrecoverable). |
| `PRD-DEL-003` | P1 | Deletion **MUST** propagate: identity/entitlement records at the auth and entitlement providers are removed or anonymized (GDPR/DPDP/CCPA erasure); any opt-in telemetry aggregates are deleted where feasible; local data for the profile is wiped and keys removed from Keychain/Keystore. Because notes are E2EE in the user's own cloud, Sane holds no note content to delete — deletion is the user removing their own cloud store + keys. |
| `PRD-DEL-004` | P1 | The app **MUST** confirm completion (or report partial completion with a retry) and MUST NOT leave orphaned entitlements that could block a future re-signup on the same email. Local files, thumbnails, caches, and the search index for the deleted scope MUST be securely removed. |

---

## 15. Open decisions for the maintainer

These block or shape implementation and need a product call (cross-referenced to `docs/design/screens-and-flows.md` open questions):

1. **Storage caps on the user's own cloud** (`PRD-SYNC-012`): since sync targets the user's *own* Drive/iCloud, is a 5 GB-vs-50 GB cap enforced at all, and if so how (client-side soft cap vs. drop the metaphor)? The zero-server model makes a Sane-imposed storage limit awkward.
2. **Product/backup naming** (§0.4, open question 1): confirm "Sane Notes"; confirm the backup target list drops "SS Cloud" entirely (this PRD assumes yes).
3. **"Ask my notes" Free preview** (`PRD-BILL-005`, open question 7): a fixed monthly quota of free asks, or an always-visible truncated teaser?
4. **Class-reminder schedule source** (`PRD-NOTIF-002`, open question 19): ship a manual timetable editor, calendar import, or both — and in which milestone?
5. **Guest→account key migration**: when a Guest later enables E2EE sync, confirm the one-time key-setup + recovery-code flow is acceptable friction (`PRD-AUTH-010`, `PRD-KEY-003`).
6. **Per-profile vs. per-account entitlement edge cases** (`PRD-PROF-006`): does a family/household plan grant Pro to all local profiles on a shared device, or only to the signed-in owner's profiles?
7. **Web PWA at-rest protection** (`PRD-STOR-003`): the web surface lacks Keychain/Keystore; confirm the reduced-guarantee posture (passphrase/passkey-derived key in memory, IndexedDB ciphertext, no hardware binding) is acceptable, and label it in the privacy dashboard.

---

## 16. Traceability summary

| Requirement group | Primary research/design sources |
|---|---|
| `AUTH`, `PROF` | `docs/design/screens-and-flows.md` §3–§5, §12; locked decisions #5, #2 |
| `STOR`, `BKP` | `research/local-first-sync-and-crdt.md` §3, §8, §9; locked decision #4 |
| `SYNC`, `KEY` | `research/local-first-sync-and-crdt.md` §4, §6, §7; locked decision #3 |
| `SET` | `docs/design/screens-and-flows.md` §12; `docs/design/tokens.json` |
| `PRIV`, `TEL`, `LOCK`, `LEAK`, `DEL` | `research/security-standards-and-devsecops.md` §1, §5; MASVS-PLATFORM-3, MASVS-PRIVACY-1..4 |
| `BILL` | `research/pricing-monetization-and-student-verification.md` §1–§10; `docs/design/screens-and-flows.md` §13, §14 |

All 100+ requirements above are individually addressable by ID for issue tracking, the DevSecOps checklist (`.github/workflows/devsecops.yml`), and the threat model (`docs/security/threat-model.md`).
