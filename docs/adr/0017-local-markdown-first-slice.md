# ADR-0017 — Runnable local Markdown first slice

## Status
Accepted for the maintainer-requested first usable application slice, 2026-09-13. This does not complete the broader M0–M8 roadmap.

## Context
The repository contained planning and 1,200 backlog entries but no application. The maintainer requested a finished local notes app, selected Flutter over the original React spec, and authorized direct commits to main. The explicit v1 features are note CRUD, Markdown preview, search, autosave and themes.

## Decision
Use Flutter with Riverpod and go_router in `app/`, pure Dart note values and repository contracts in `sane_core`, and presentation-only tokens in `sane_ui`. Use Drift SQLite on native and SQLite WASM in a browser worker on web. This replaces the original React-specific localStorage choice with the repository's durable-storage direction. Keep all database assets on the app origin and build Flutter with `--no-web-resources-cdn`.

This slice stores standalone Markdown drafts in its own versioned schema. These are explicitly not the final hierarchical CRDT documents or `.sanenote` bundles. Future migration must preserve drafts rather than silently reinterpret or discard them. Each individual mutation is persisted through a serialized queue; the UI reports pending and failed saves honestly. Deletion requires confirmation and offers undo.

Theme palettes and radii derive from the 17 committed looks. Material widgets provide adaptive, keyboard-accessible controls. Karla and Newsreader fonts are bundled locally under the OFL; other per-look fonts use these fallbacks; CSS-specific gradients, shadows and backdrop effects are not claimed as full design parity.

## Alternatives considered
Shared preferences/localStorage: simpler but inappropriate for durable note storage. Implementing all CRDT/crypto/ink/sync milestones before a usable app: much larger scope and requires device and external-service acceptance evidence.

## Consequences
No note-content network egress, account, analytics, or remote Markdown image fetch is introduced. Markdown links remain inert; remote images display an explanatory placeholder. Storage is local plaintext protected only by the OS/browser profile, not application-level encryption. No E2EE claim is made for this slice. Browser storage can be cleared or evicted; a readable export is required before relying on this for irreplaceable notes.

Text bounds: 160 title characters, 100,000 body characters. Failures do not log content or raw exception messages. Failed initialization must never overwrite an existing database.

## How to verify
Run format, strict analysis, pure Dart tests, storage and widget tests, browser and iPad smoke flows, and release builds. Verify no application request goes to a third-party host, including Markdown images. Physical-device latency, battery, full accessibility certification, and App Store/Play distribution remain separate acceptance gates.
