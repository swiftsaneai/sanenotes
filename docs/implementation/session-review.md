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

Local checks cover pure Dart domain behavior, repository persistence/reopen, failed saves, failed deletes, corrupt databases, schema migration, phone/wide interactions, all palette contrast and golden comparisons, and architectural boundaries. A real iPad simulator integration test passed using the production storage adapter. Release web and debug Android APK builds passed. Full Android runtime verification is pending: both existing and fresh emulators have remained offline on this host.

Pre-existing DevSecOps failures were repaired: Trivy's removed action tag, Scorecard's retired GCR image, and generic-key false positives for the literal public identifiers MASVS-CRYPTO-1/2. Both hosted workflows passed at commit 61ebec5. A dedicated Flutter application workflow now verifies and builds the application itself.

## Issue accounting

No milestone or epic is considered complete because the notes app runs. Larger foundation, ink, storage, security, sync, AI, accessibility and release issues retain their original acceptance criteria. The 1,200-item backlog is not complete; physical-device certification and external accounts remain substantive blockers for parts of it. See the maintainer decisions document for pending accounts and policy choices.
