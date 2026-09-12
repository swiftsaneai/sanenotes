<div align="center">

# Sane Notes

**The pen-first, privacy-first note-taking app — one codebase for iPad, Android tablets, the Web, iPhone and Android phones.**

*Best-in-class handwriting UX. Your notes never touch our servers.*

Status: **pre-alpha — planning complete, implementation starting** ·
Repo: `swiftsaneai/sanenotes` · Made for students first, then professionals.

</div>

---

## Screenshots

> Placeholders — real captures land with the M1 Ink Editor Alpha. The intended design is live on the
> Claude Design canvas (link below) and committed at `design/Sane Notes.dc.html`.

| Library | Editor | Search | Settings |
|---|---|---|---|
| _(coming M1)_ | _(coming M1)_ | _(coming M3)_ | _(coming M4)_ |

---

## What it is

Sane Notes is a handwriting-first notebook app built around one idea: **lag-proof ink that feels like
paper, on every device, without your notes ever leaving your control.** You write with Apple Pencil,
S Pen, USI styluses or a finger; you import and annotate PDFs; you record lectures synced to your ink;
you search your own handwriting — and everything is stored locally, encrypted, and (only if you opt
in) synced through *your own* iCloud Drive or Google Drive. There is no Sane Notes note server. "Sane
Sage", the on-device assistant, summarises, answers questions over your notes, and makes flashcards
without sending anything to the cloud unless you explicitly ask, once, per request.

## Principles

- **UX first, then security first.** Wet-ink latency budgets are hard gates, not aspirations.
- **Local-first & zero-knowledge.** Your device is the system of record. Cloud copies are end-to-end
  encrypted with keys we never hold; we cannot read your notes.
- **Identity is optional.** Guest mode is first-class — you never need an account to take notes.
- **On-device AI by default.** Cloud inference is explicit, per-request, with a visible
  "data leaves device" indicator.
- **One codebase, five surfaces, in lock-step.** Platform inconsistency is competitors' biggest
  weakness; we refuse it.
- **Accessible and localised** from day one (WCAG 2.2 AA; English → Hindi and major Indian languages
  → more, including RTL Arabic).

## Platforms

iPadOS 17+ · iOS 17+ · Android 10+ (arm64-v8a, armeabi-v7a, x86_64) · Web/PWA on Chrome/Edge 120+,
Safari 17+, Firefox 125+, Samsung Internet · foldables & large-screen window classes · low-end
reference device: 4 GB Android / Snapdragon 680-class.

## Architecture in 10 lines

1. **Flutter + Dart 3**, single codebase, Impeller renderer on mobile; CanvasKit/skwasm on web.
2. Thin **native plugin layer** (Swift on Apple, Kotlin on Android) for the things Flutter can't do
   well: low-latency wet ink, stylus extras, secure key storage, on-device ML, cloud-drive access, PDF.
3. **Two inking tiers** chosen at runtime: a native front-buffer fast path (Metal / Jetpack Ink) and a
   pure-Flutter `CustomPainter` path — whichever meets the latency budget on the device.
4. Business logic lives in **12 pure/Flutter `sane_*` packages**; `app/` is only the composition root.
5. **Document model:** Workspace → Profiles → Notebooks → Pages → Layers → Objects, merged with **CRDT**
   semantics (add-wins ids + LWW registers + hybrid logical clocks).
6. **Local store:** SQLite (via drift) + a content-addressed blob store for ink/PDF/audio/images.
7. **Optional sync** writes append-only, **end-to-end-encrypted** op-log segments + snapshots to the
   *user's own* cloud drive; the cloud only ever holds ciphertext.
8. Open, documented **`.sanenote`** bundle format; exports to PDF/PNG/SVG/Markdown/JSON.
9. Heavy work (persistence, encryption, sync, indexing, PDF/ML) runs on **background isolates**; the UI
   isolate does input and paint only.
10. Optional, stateless **services** (entitlement verification, a ciphertext-only collaboration relay)
    that never see plaintext note content.

Full detail: [`docs/architecture/overview.md`](docs/architecture/overview.md) and the 16 ADRs in
[`docs/adr/`](docs/adr/).

## Repository layout

```
app/        Flutter app — one codebase, adaptive layouts (composition root)
packages/   12 reusable sane_* libraries (core, ink, render, brushes, sync, crypto,
            pdf, audio, search, ml, ui, billing)
plugins/    Federated Flutter plugins with Swift / Kotlin / web implementations
services/   Optional, minimal, stateless (never store note content)
website/    Marketing + docs + "try on web"
tools/      Perf harness, device-lab configs, scripts
docs/       Architecture, ADRs, PRDs, design, security, platform, research  ← start here
design/     Design source of truth (.dc.html canvas + design sheet + assets)
issues/     Machine-readable backlog (labels, milestones, schema, SN-*.json)
scripts/    Issue validate/publish/render tooling (Node 22)
```

## Running it

> `app/` and `packages/` are **not built yet** (pre-alpha). Once the M0 scaffold lands, the commands
> will be roughly:

```bash
# Prerequisites: Flutter (latest stable, Dart 3), Xcode (Apple targets), Android Studio (Android),
# Node 22 (issue scripts).
flutter pub get                              # resolve the workspace
flutter run --dart-define=SANE_FLAVOR=dev \
            --dart-define=SANE_AUTH_BYPASS=true   # dev flavour (bypass is inert in release)
flutter run -d chrome --dart-define=SANE_FLAVOR=dev   # web/PWA
dart format . && dart analyze --fatal-infos  # local gate
flutter test                                 # unit / widget / golden
```

Configuration is read from `--dart-define` — never hardcoded. See the flavour + define matrix in
[`docs/architecture/overview.md`](docs/architecture/overview.md) §7.

The backlog tooling works today:

```bash
node scripts/validate-issues.mjs --stats     # validate issues/*.json against the schema
./scripts/publish.sh                          # push + create labels/milestones/issues on GitHub (needs gh)
```

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md), then the agent manual [`CLAUDE.md`](CLAUDE.md)
(or [`AGENTS.md`](AGENTS.md) for non-Claude agents). Pick an `agent-ready` issue, branch as
`<type>/SN-<AREA>-<NNN>-<short-title>`, and open a PR against the
[template](.github/PULL_REQUEST_TEMPLATE.md). Every PR is reviewed against
[`docs/security/secure-coding-checklist.md`](docs/security/secure-coding-checklist.md).

## Security

Notes are local-first and zero-knowledge; cloud copies are end-to-end encrypted. Report
vulnerabilities per [`SECURITY.md`](SECURITY.md) — **never** open a public issue for a security bug.
Standards: OWASP MASVS 2.x L2, ASVS 5.0 L2, OWASP Top 10, NIST SSDF, SLSA (target L3), STRIDE + LINDDUN
threat model.

## License

**Not yet chosen** — to be decided by the maintainer before any public distribution. Until a `LICENSE`
file is added, no open-source rights are granted; treat the source as all-rights-reserved.

## Design

Live, interactive design canvas (view-only share):
<https://claude.ai/design/p/ada47603-802d-4bc5-82f1-149092d8c483?file=Sane+Notes.dc.html&via=share>
· committed at [`design/Sane Notes.dc.html`](design/Sane%20Notes.dc.html) · tokens in
[`docs/design/tokens.json`](docs/design/tokens.json) (17 looks, light/dark).

---

<div align="center">
Maintainer: Jatin Kumar Singh (<a href="https://github.com/jatinsingh1603">@jatinsingh1603</a>) ·
Mascot: <b>Sane Sage</b> 🧙
</div>
