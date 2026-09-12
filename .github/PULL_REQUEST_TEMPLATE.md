## What

Closes #<issue>. One-paragraph summary.

## Why

Link to the issue's Context. Note any deviation from the issue's Scope/Acceptance criteria and why.

## Security & privacy checklist (required — see docs/security/secure-coding-checklist.md)

- [ ] No new network calls, or each one is listed here with its purpose and data sent
- [ ] No note content, ink, audio, or PII leaves the device without an explicit user action
- [ ] Inputs from files/URLs/clipboard/other apps are validated (size, type, schema) — PDF/image parsers are sandboxed or limited
- [ ] Secrets: none added; config comes from CI secrets / platform keychains
- [ ] New dependencies: justified below, license-compatible, pinned, and OSV-clean
- [ ] Permissions: no new OS permission, or it is requested lazily with an in-context rationale
- [ ] Threat model updated (docs/security/threat-model.md) if a trust boundary changed

## UX checklist

- [ ] Matches the design (design/Sane Notes.dc.html or the Claude Design link in docs/design/README.md) or the deviation is explained
- [ ] Works in every one of the 17 looks and in dark mode
- [ ] Ink latency / frame budget unaffected (attach `flutter run --profile` timeline or perf test output for editor changes)
- [ ] Accessible: labels for screen readers, 44pt targets, contrast ≥ 4.5:1, keyboard reachable (web)
- [ ] Empty / loading / error / offline states handled

## Tests

- [ ] Unit / widget / golden / integration tests added or updated (list them)
- [ ] Manually verified on: <iPad / Android tablet / Web / iPhone / Android phone>

## Screenshots / recordings

<!-- Before/after for UI, or a short screen recording for editor interactions -->
