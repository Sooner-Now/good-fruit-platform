#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO="${GOOD_FRUIT_REPO:-git@github.com:Sooner-Now/good-fruit-platform.git}"
BRANCH="${GOOD_FRUIT_BRANCH:-main}"
TMPDIR="$(mktemp -d /private/tmp/good-fruit-platform-push.XXXXXX)"
MESSAGE="${1:-Update Good Fruit platform}"

cleanup() {
  if [[ "${KEEP_PUSH_TMP:-0}" != "1" ]]; then
    rm -rf "$TMPDIR"
  else
    echo "Kept temp checkout: $TMPDIR"
  fi
}
trap cleanup EXIT

cd "$ROOT"
node scripts/verify.mjs

echo "Checking GitHub reachability..."
if ! ssh -o ConnectTimeout=8 -T git@github.com >/tmp/good-fruit-github-check.log 2>&1; then
  if grep -qi "successfully authenticated" /tmp/good-fruit-github-check.log; then
    true
  else
    cat /tmp/good-fruit-github-check.log
    echo "GitHub is not reachable from this environment. Run bash scripts/build-deploy-bundle.sh for a manual Vercel upload package."
    exit 2
  fi
fi

git clone --depth 1 --branch "$BRANCH" "$REPO" "$TMPDIR"

rsync -a --delete \
  --exclude ".git" \
  --exclude "dist" \
  --exclude ".env" \
  --exclude ".env.local" \
  --exclude ".DS_Store" \
  --exclude "*.swp" \
  --exclude "*.swo" \
  "$ROOT/" "$TMPDIR/"

cd "$TMPDIR"
git config user.name "${GOOD_FRUIT_GIT_NAME:-Justin Van Patten}"
git config user.email "${GOOD_FRUIT_GIT_EMAIL:-justinvanpatten@users.noreply.github.com}"

if git diff --quiet && git diff --cached --quiet; then
  echo "No changes to push."
  exit 0
fi

git add .
git commit -m "$MESSAGE"
git push origin "$BRANCH"
echo "Pushed to $REPO on $BRANCH."
