# Repository review and implementation scope

Baseline: `a7ff150` on main. The repository was not empty: it contained architecture, design sources, CI security scans, publishing tools, and 1,200 issue specifications. It contained no Flutter application or domain packages. Issue validation: 114 files, 1,200 issues, zero errors or warnings.

## Session decisions

The maintainer explicitly selected Flutter and direct commits to main, overriding the earlier React spec and the repository branch/PR convention for this session. Existing backlog acceptance criteria remain authoritative for issue closure. Implemented slices do not imply completion of their larger parent issues.

The first usable slice is the originally requested guest-only local Markdown notes app, adapted to Flutter. The broader handwriting, native ink, PDF, CRDT, sync, AI, billing and distribution roadmap remains planned. No placeholders should masquerade as working features.

## Environment

Xcode 26.6 is selected at `/Applications/Xcode.app/Contents/Developer`. iOS 26.5 simulators include iPad Pro and iPad Air. Flutter 3.47.4 / Dart 3.13.3 and CocoaPods 1.17.0 are installed via Homebrew. `flutter doctor` passes. Git identity is repository-local. The HTTPS token is session-only and is never persisted in repository configuration.

## External acceptance criteria

Physical latency/battery certification, Apple/Google signing and store accounts, OAuth credentials, original licensed mascot artwork, legal review, and live operational services cannot be certified from an unattended simulator session. No issues depending on these are closed on the strength of a code stub.

## Verified implementation

The local Markdown app implements CRUD, serialized autosave and recovery, live split preview on wider screens, title/body search, delete confirmation/undo, 17 palettes, light/dark preferences, and explicit clipboard export. A version-2 SQLite migration preserves old notes while keeping millisecond edit ordering.

Local checks cover pure Dart domain behavior, repository persistence/reopen, failed saves, failed deletes, corrupt databases, schema migration, phone/wide interactions, all palette contrast and golden comparisons, and architectural boundaries. A real iPad simulator integration test passed using the production storage adapter. Release web, release macOS, and debug Android APK builds passed. The normal app was restored to the iPad simulator after the integration test. Full Android runtime verification is pending: both existing and fresh emulators have remained offline on this host.

Pre-existing DevSecOps failures were repaired: Trivy's removed action tag, Scorecard's retired GCR image, and generic-key false positives for the literal public identifiers MASVS-CRYPTO-1/2. Both hosted workflows passed at commit 61ebec5. A dedicated Flutter application workflow now verifies and builds the application itself.

## Issue accounting

No milestone or epic is considered complete because the notes app runs. Larger foundation, ink, storage, security, sync, AI, accessibility and release issues retain their original acceptance criteria. The 1,200-item backlog is not complete; physical-device certification and external accounts remain substantive blockers for parts of it. See the maintainer decisions document for pending accounts and policy choices.

## Reproduction and handoff

- Run `./tools/scripts/verify.sh` from the repository root: 25 tests, strict analysis, format, architecture policy and bundled storage-asset verification.
- Run `cd app && flutter test integration_test/local_notes_test.dart -d F8494202-7328-425D-960A-4F8A4EDED5DD --no-pub` for the production SQLite reopen test on the configured iPad. One integration test passed.
- Run `python3 tools/scripts/serve_preview.py` after `flutter build web --release --no-web-resources-cdn` in `app/`. The local preview is `http://127.0.0.1:5173`; keep this origin/port to retain the same browser database.
- Android artifact: `app/build/app/outputs/flutter-apk/app-debug.apk` (development build, not a store release).
- macOS artifact: `app/build/macos/Build/Products/Release/sane_notes.app` (local unsigned distribution only).
- The selected iPad simulator runs the normal app. Android emulator runtime, real-device performance and store distribution remain unverified.

Golden comparisons use reviewed macOS 15 and macOS 26 reference images with zero tolerance. Hosted failure artifacts established a difference of 163 light / 162 dark font-edge pixels across 2,560,000 pixels; neither layout nor palette colors changed. CI selects its reference explicitly and preserves failure images for future review.

## Narrow issue evidence

`SN-FND-009` / #576 is the self-contained placeholder-layout task. All six required directories have purpose READMEs; both service READMEs state the stateless/ciphertext-only/no-note-content invariant; no service code exists. The performance README records the three required latency budgets and links the performance specification. `/services/` has an explicit CODEOWNERS rule. `tools/scripts/test/tree_layout_test.dart` verifies the directory, invariant and budget criteria. These placeholders introduce no network call, stored asset or new trust boundary; the security checklist's baseline no-content/no-secret requirements remain intact.

No claim of completing #256 (all-platform scaffold acceptance), #575 (the full architecture-lint issue and its dependencies), #577 (clean-machine toolchain provisioning), or the broader 1,200-item roadmap follows from this evidence. The architecture check, SDK pins and application are useful implemented slices with the remaining acceptance work still open.

Hosted verification at `a69bfd0` passed all three configured workflows: [Flutter application](https://github.com/swiftsaneai/sanenotes/actions/runs/34754332067), [DevSecOps](https://github.com/swiftsaneai/sanenotes/actions/runs/34754332056), and [OpenSSF Scorecard](https://github.com/swiftsaneai/sanenotes/actions/runs/34754332060). This evidence completes the narrow #576 task; other issues remain subject to their own acceptance criteria.
