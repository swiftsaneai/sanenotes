# Repository review and implementation scope

Baseline: `a7ff150` on main. The repository was not empty: it contained architecture, design sources, CI security scans, publishing tools, and 1,200 issue specifications. It contained no Flutter application or domain packages. Issue validation: 114 files, 1,200 issues, zero errors or warnings.

## Session decisions

The maintainer explicitly selected Flutter and direct commits to main, overriding the earlier React spec and the repository branch/PR convention for this session. Existing backlog acceptance criteria remain authoritative for issue closure. Implemented slices do not imply completion of their larger parent issues.

The first usable slice is the originally requested guest-only local Markdown notes app, adapted to Flutter. The broader handwriting, native ink, PDF, CRDT, sync, AI, billing and distribution roadmap remains planned. No placeholders should masquerade as working features.

## Environment

Xcode 26.6 is selected at `/Applications/Xcode.app/Contents/Developer`. iOS 26.5 simulators include iPad Pro and iPad Air. Flutter is being installed via Homebrew. Git identity is repository-local. The HTTPS token is session-only and is never persisted in repository configuration.

## External acceptance criteria

Physical latency/battery certification, Apple/Google signing and store accounts, OAuth credentials, original licensed mascot artwork, legal review, and live operational services cannot be certified from an unattended simulator session. No issues depending on these are closed on the strength of a code stub.
