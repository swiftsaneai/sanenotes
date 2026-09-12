# Security Policy

Sane Notes is built security-first: notes never touch our servers, all AI runs on-device by default, and every change goes through the DevSecOps pipeline described in `docs/security/`.

## Reporting a vulnerability

- Email: security@swiftsane.ai (PGP key to be published in `docs/security/pgp.txt`)
- Or open a **private** GitHub Security Advisory: https://github.com/swiftsaneai/sanenotes/security/advisories/new
- Do **not** open public issues for security bugs.

We aim to acknowledge within 48 hours, triage within 7 days, and fix critical issues within 30 days. We will credit reporters in release notes unless you prefer otherwise.

## Scope

- The Sane Notes apps (iPadOS, iOS, Android, Web/PWA) and shared packages in this repository
- The (minimal) relay/entitlement services under `services/` once they exist
- Build & release pipeline (`.github/workflows`)

Out of scope: third-party services (Apple iCloud, Google Drive, Microsoft identity), social-engineering, DoS.

## Security principles (summary — full detail in `docs/security/`)

1. **Local-first, zero-knowledge.** Note content is stored on the user's device and, only if the user opts in, in the user's own iCloud Drive / Google Drive — encrypted with keys we never hold.
2. **Shift-left.** Threat model (`docs/security/threat-model.md`) drives requirements; every issue carries a "Security & privacy" section; SAST/SCA/secret scanning run on every PR.
3. **Standards.** OWASP MASVS 2.x (mobile), OWASP ASVS 5.0 (web), OWASP Top 10, NIST SSDF, SLSA for the supply chain.
4. **Least privilege everywhere** — OS permissions requested lazily with in-context rationale; CI tokens read-only by default; pinned, hash-locked GitHub Actions.
5. **No secrets in the repo.** OAuth client IDs/secrets are injected at build time from CI secrets; the dev build uses an explicit, clearly-labelled auth bypass that cannot be compiled into release builds.

## Supported versions

Only the latest released minor version on each platform receives security fixes.
