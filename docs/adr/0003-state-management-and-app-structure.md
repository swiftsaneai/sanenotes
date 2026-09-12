# ADR-0003 — State management and app structure

## Status

**Accepted** (M0 Foundations). Related: [ADR-0001](0001-flutter-single-codebase.md),
[ADR-0002](0002-monorepo-layout.md),
[`docs/architecture/overview.md`](../architecture/overview.md) (§6 threading, §8 errors,
§9 coding standards).

## Context

`app/` is the composition root ([ADR-0002](0002-monorepo-layout.md)): it wires domain logic
from `packages/` to widgets, chooses adaptive layouts for five surfaces, and owns routing.
It needs a state/DI approach that:

- **Keeps the wet-ink path jank-free.** The active-stroke loop must not rebuild widget
  subtrees; repaints are driven by a `Listenable` on the canvas layer, not by global state
  churn ([overview §3](../architecture/overview.md#3-data-flow-a-pen-stroke-from-os-event-to-pixels-to-persistence-to-sync)).
- **Handles async cleanly** — notes load from disk, sync arrives from the cloud, ML runs on
  isolates; loading/error/data states are pervasive.
- **Is testable and compile-safe** — providers overridable in tests; no service locators that
  fail at runtime; strong typing an agent can rely on.
- **Supports the web target's URLs and deep links** — the browser back button, shareable note
  URLs, and file-handler launches all need real routing.
- **Enforces immutability and Result-typed errors** (overview §8–§9).

The research (`research/flutter-ink-stack.md`) identifies the mature, Flutter-Favorite
choices: **`flutter_riverpod` v3** (reactive, compile-safe, async loading/error,
codegen `@riverpod`) and **`go_router` v18** (declarative, URL-based, deep links,
`ShellRoute` persistent nav — "essential for the web target's URLs").

## Decision

**Use Riverpod v3 for state/DI, go_router v18 for routing, a feature-first layout inside
`app/`, immutable state objects, and `Result<T, Failure>` for expected errors.**

### App structure (feature-first)

```text
app/lib/
├── main.dart              bootstrap: flavour config, error/log handlers, ProviderScope, runApp
├── bootstrap.dart         install FlutterError.onError / PlatformDispatcher.onError / isolate handlers; assertAuthBypassSafe()
├── router/                go_router config, routes, ShellRoute (persistent library/editor nav), guards
├── app.dart              root MaterialApp.router; wires sane_ui theme (17 looks) to the router
├── features/
│   ├── editor/            widgets + Riverpod notifiers for the ink editor; owns the Listener→sane_ink wiring
│   ├── library/           notebooks/subjects/templates UI
│   ├── search/            search UI over sane_search
│   ├── auth/              sign-in flows; reads SANE_AUTH_BYPASS guard
│   ├── settings/          preferences, stylus, backup choices, diagnostics export
│   └── …                  one folder per screen-group (mirrors docs/design/screens-and-flows.md)
├── providers/             cross-feature providers (current profile, active notebook, sync status, entitlements)
└── config/                Flavour (dart-define reader), environment, feature flags
```

Each `features/<x>/` folder holds *its* widgets + notifiers/providers; it imports the logic
packages it needs and `sane_ui`. **Cross-feature coordination is a provider in
`app/providers/`, never a package-to-package import** (ADR-0002 rule 5).

### State rules

1. **Riverpod providers are the only DI mechanism.** No global singletons, no service
   locator. Repositories/services from `packages/` are exposed as providers and **overridden
   in tests**.
2. **State objects are immutable value objects** (freezed or hand-written). A transition
   returns a new instance; notifiers hold the current instance.
3. **Async state uses `AsyncValue`** (loading/error/data) — every screen renders all three
   states explicitly; no silent spinners-forever.
4. **The editor hot path bypasses provider rebuilds.** The active stroke is held in a
   `ChangeNotifier`/`ValueListenable` wired directly to the `CustomPainter`'s `repaint`; only
   *committed* strokes flow into Riverpod/document state. This keeps `PointerMoveEvent` off
   the widget-rebuild path (overview §3, §6).
5. **Expected errors are `Result<T, Failure>`** from `sane_core`, pattern-matched in
   notifiers; only programmer errors throw (overview §8.1).
6. **Routing is declarative** (`go_router`): typed routes, deep links, and a `ShellRoute` for
   persistent library/editor chrome; route guards check auth/entitlement where required.
   Web URLs are first-class (a note has a shareable URL).

### Auth-bypass wiring (p0)

The `auth` feature's sign-in provider reads the bypass through the flavour config, guarded so
it is **inert in release**
([overview §7.2](../architecture/overview.md#72-why-auth-bypass-is-impossible-in-release-p0)):
`bootstrap.dart` calls `assertAuthBypassSafe()`; the provider's bypass branch is
`if (!kReleaseMode && config.authBypass)` so it tree-shakes out of release; a test asserts
unreachability.

## Alternatives considered

| Option | Async ergonomics | Compile safety / testability | Hot-path fit | Web routing | Verdict |
|---|---|---|---|---|---|
| **Riverpod v3 + go_router v18 (chosen)** | First-class `AsyncValue`, codegen | Compile-safe, providers overridable, no runtime locator | Good — providers stay off the draw loop; canvas uses a `Listenable` | go_router is the web-URL standard | **Chosen** — Flutter-Favorite, matches research, best async+DI |
| Bloc / flutter_bloc | Good (streams/events) | Strong, testable | Good | pair with go_router | Rejected — more boilerplate per feature; event-sourcing overkill for most screens; fine for event-heavy teams |
| provider (Google) | Manual async handling | Weaker (runtime `ProviderNotFound`) | OK | pair with a router | Rejected — Riverpod is its compile-safe successor |
| `setState` + `InheritedWidget` only | Manual | Hard to test at scale | OK for tiny apps | manual | Rejected — doesn't scale to this app's async/DI needs |
| signals / other reactive libs | Good | Varies; smaller ecosystem | Good | pair with a router | Rejected — less mature/Flutter-Favorite than Riverpod for a multi-year, agent-built codebase |

## Consequences

**Positive**

- Compile-safe DI; every dependency is an overridable provider → fast, deterministic tests.
- `AsyncValue` forces explicit loading/error/data handling → fewer stuck spinners.
- go_router gives real web URLs, deep links and file-handler launches for free.
- The hot-path carve-out keeps wet-ink jank-free while the rest of the app is reactive.
- Feature-first folders mirror `docs/design/screens-and-flows.md`, so design↔code mapping is
  obvious to an agent.

**Negative**

- Riverpod v3 and go_router v18 are **fast-moving** (v3 is a redesign) → pin versions, gate
  upgrades behind integration tests (ADR-0002).
- Codegen (`@riverpod`) adds a build step → runner scripts in `tools/scripts/`.
- Discipline required: it's tempting to route hot-path state through providers; the carve-out
  must be reviewed for on every editor change.

## Security impact

- **Secrets/tokens never live in long-lived provider state.** Auth tokens and keys stay in
  `sane_secure_store` (Keychain/Keystore); providers hold only short-lived handles or an
  `isSignedIn` flag, and never log token contents (overview §8.2).
- **The auth-bypass guard is a p0 control** enforced here (structure) plus overview §7.2
  (mechanism) plus CI (test). Any refactor of the auth provider must preserve the
  `!kReleaseMode` guard and the startup assertion.
- **Route guards enforce entitlement/authorisation** for Pro/shared/collab screens
  server-authoritatively (client route guards are UX only; the entitlement service is the
  source of truth — ADR-0011 note on `services/`).
- **Immutable state reduces a class of bugs** (accidental shared-mutable-state races across
  isolates); cross-isolate messages carry immutable copies (overview §6).

## How to verify

1. **`dart analyze --fatal-infos` + `very_good_analysis` green**; `@riverpod` codegen is
   up to date (CI fails if generated files are stale).
2. **Provider-override tests exist** — a sample feature test overrides its repository provider
   with a fake and asserts loading/error/data rendering.
3. **Editor hot-path test:** an integration/golden test confirms drawing a stroke does not
   rebuild the library/shell widgets (rebuild-count assertion on the surrounding tree).
4. **`auth_bypass_test.dart` proves** the bypass path is unreachable in a release-mode build
   and that `assertAuthBypassSafe()` throws if `authBypass && kReleaseMode`.
5. **Router deep-link test:** a note URL and a file-handler launch resolve to the correct
   route on web.
6. **No global singletons / service locators** — arch-lint/grep check that state is obtained
   via Riverpod, and `print()` is absent (SaneLog only).
