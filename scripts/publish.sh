#!/usr/bin/env bash
# One-command publish: pushes the repo and creates all labels/milestones/issues on GitHub.
# Prereq: `gh auth login` (scopes: repo, and `project` if you pass --project N).
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="${REPO:-swiftsaneai/sanenotes}"

echo "==> Checking gh auth"
gh auth status >/dev/null 2>&1 || { echo "Run: gh auth login   (then re-run this script)"; exit 2; }

echo "==> Validating issue files"
node scripts/validate-issues.mjs --stats

echo "==> Pushing repository to $REPO"
git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$REPO.git"
git push -u origin HEAD:main

echo "==> Publishing issues (this paces itself to GitHub's ~500 creates/hour secondary limit; safe to re-run)"
node scripts/publish-issues.mjs "$@"

echo "==> Done. Open https://github.com/$REPO/issues"
