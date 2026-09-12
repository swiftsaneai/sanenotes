# Contributing to Sane Notes

Thanks for helping build the world's best note-taking app. This guide is for **humans and autonomous
coding agents**. Agents: also read [`CLAUDE.md`](CLAUDE.md) (full operating manual) or
[`AGENTS.md`](AGENTS.md) (condensed) — they carry the rules this file only summarises. Every change is
reviewed against [`docs/security/secure-coding-checklist.md`](docs/security/secure-coding-checklist.md).

New here? Read, in order: [`README.md`](README.md) → [`docs/README.md`](docs/README.md) →
[`docs/architecture/overview.md`](docs/architecture/overview.md) → the PRD/ADR your issue cites.

---

## 1. Pick an issue

Work is tracked as GitHub issues generated from [`issues/`](issues/) (schema:
[`issues/SCHEMA.md`](issues/SCHEMA.md)). Filter to find something to do:

- **Label `agent-ready`** — fully specified; you can start with no further questions. **Start here.**
- **`good first issue`** — small, self-contained, good for a first PR.
- **`priority: p0/p1`** — most important; p0 blocks a milestone.
- **A milestone** (`M0 Foundations` … `M8 Launch & Growth`) — see [`docs/roadmap.md`](docs/roadmap.md)
  for scope and sequencing. Do work roughly in milestone order; respect each issue's `depends_on`.
- **An `area:` label** matching your interest (e.g. `area: ink`, `area: sync`, `area: a11y`).

**Do not pick up** issues labelled `blocked`, `needs-decision`, `needs-design`, or
`needs-credentials` — they are waiting on the maintainer (open decisions are listed in CLAUDE.md §13).
Comment to claim an issue before starting so two people don't collide.

Read the issue **in full** first: Context, Scope (In/Out), Acceptance criteria, Technical notes,
Security & privacy, UX notes, Test plan, Dependencies, Definition of done. A good issue lets you start
from the issue alone; if a section is empty, the issue isn't ready — flag it.

## 2. Set up your environment

| Tool | Version | For |
|---|---|---|
| **Flutter** | latest **stable**, Dart 3 | the app + packages (`app/`, `packages/`) |
| **Xcode** | current | iOS / iPadOS builds, Swift plugins |
| **Android Studio** + SDK | current, Android 10+ | Android builds, Kotlin plugins, emulators/AVDs |
| **Node** | **22** | the issue tooling in `scripts/` |
| **gh** (GitHub CLI), authenticated | current | publishing issues (`gh auth login`) |
| CocoaPods, JDK 17 | current | Apple / Android native toolchains |

> Pre-alpha note: `app/` and `packages/` don't exist yet — the M0 scaffold creates them. The `scripts/`
> tooling and all of `docs/`, `design/`, `issues/` are live today.

Common commands (once `app/` exists):

```bash
flutter pub get
dart format .                 # must be clean (CI runs --set-exit-if-changed)
dart analyze --fatal-infos    # must be clean; warnings are errors
flutter test                  # unit / widget / golden
node scripts/validate-issues.mjs   # after editing any issues/*.json
```

## 3. Branch, commit, PR

- **Branch off `main`:** `<type>/SN-<AREA>-<NNN>-<short-title>`. Map `<type>` from the issue's type —
  `feat` (feature), `fix` (bug), `chore` (task/chore), `docs`, `sec` (security), `infra`, `test`,
  `spike`, `design`. Example: `feat/SN-INK-012-pressure-curve-editor`. **Never push to `main`.**
- **Build in dependency order** (see [`docs/architecture/overview.md`](docs/architecture/overview.md)
  §10): model (`sane_core`) → logic (pure Dart, `Result<T,Failure>`) → native (plugin
  platform-interface + Swift/Kotlin/web) → render → state (Riverpod in `app/`) → UI (`sane_ui`) →
  persistence/sync → search/AI → tests → perf → security → docs. Never add a sideways package import;
  coordinate in `app/`.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/), imperative, scoped, with
  the issue key: `feat(sane_ink): add pressure curve editor (SN-INK-012)`. Keep commits small and
  focused. End each commit message with the attribution lines this project requires
  (`Co-Authored-By:` + `Claude-Session:`).
- **Open a PR** and fill [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md)
  completely: the **Security & privacy** checklist, the **UX** checklist (all 17 looks + dark mode,
  ink/frame budget with a `flutter run --profile` timeline for editor work, a11y, empty/loading/error/
  offline states), and **Tests**. Use "Closes #<issue>". PR descriptions end with the required
  Generated-with attribution.

## 4. What CI (and your reviewer) checks

Your PR must be green and satisfy the Definition of Done
([`docs/security/ssdlc-process.md`](docs/security/ssdlc-process.md) §5):

- **Formatting & analysis:** `dart format`, `dart analyze --fatal-infos`, arch-lint (package DAG +
  `print()` ban).
- **Tests:** unit / widget / golden / integration, including **negative/abuse** tests and a
  **regression test** for any fixed bug.
- **Security scans:** Semgrep, mobsfscan, gitleaks + trufflehog (no secrets), OSV-Scanner +
  dependency-review (no vulnerable/disallowed deps). Release candidates also run MobSF, ZAP, parser
  fuzzing, and the **perf gate**.
- **Docs:** ADR added/updated for an architectural change; `docs/architecture/overview.md` updated in
  the same PR if you changed a package boundary, data flow, threading rule, or build flavour;
  `docs/security/threat-model.md` updated if a trust boundary / data flow / stored asset / dependency
  changed; PRD count updated if you added a requirement.
- **CODEOWNERS review** is required for security-critical paths: `/docs/security/`, `/.github/`,
  `/packages/sane_crypto/`, `/packages/sane_sync/`, `/app/lib/auth/`.

## 5. Reviewer checklist (also self-review before you request review)

1. Does the diff touch a **network call, parser, native method, WebView, deep link, exported
   component, crypto, or key storage**? → the matching secure-coding-checklist section **and** a
   threat-model row must be updated in this PR.
2. Any **string that looks like a secret**? → block; move to `--dart-define` / CI secret.
3. Any **`print(` / `Log.d` / `console.log`** of variable content? → block; route through `SaneLog`;
   confirm no PII/content.
4. Any **new dependency or GitHub Action**? → justified, pinned (Actions to a full commit SHA),
   OSV-clean, license-OK.
5. Any **`innerHTML`/DOM sink, string-built SQL, `Process.run`, dynamic deserialize, or force-unwrap on
   untrusted data**? → require the safe alternative.
6. Any **new asset/metadata written to the cloud**? → confirm it's encrypted *before* egress and
   metadata is minimised.
7. **UX:** matches the design (or the deviation is explained); works in all 17 looks + dark; ink
   latency/frame budget unaffected; accessible; empty/loading/error/offline states handled.
8. The PR template's Security & privacy and UX boxes are **honestly** ticked.

## 6. The non-negotiables

- No note content leaves the device except as ciphertext to the user's own cloud, on an explicit user
  action. · No secrets in the repo. · No PII/content in logs. · No new network call without an ADR +
  threat-model row. · Auth bypass stays impossible in release. · Respect the package DAG. · Approved
  crypto only. · Treat every byte from outside the app as hostile. Detail: CLAUDE.md §7 and the
  secure-coding checklist.

## 7. Code of conduct

Be kind, be rigorous, assume good faith. A formal `CODE_OF_CONDUCT.md` will be added; until then the
[Contributor Covenant](https://www.contributor-covenant.org/) applies — harassment or discrimination
is not tolerated. Report conduct concerns privately to the maintainer
([@jatinsingh1603](https://github.com/jatinsingh1603)); report **security** issues via
[`SECURITY.md`](SECURITY.md), never in a public issue.
