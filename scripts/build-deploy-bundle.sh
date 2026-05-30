#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$ROOT/dist"
STAMP="$(date +%Y%m%d-%H%M%S)"
PACKAGE_DIR="$DIST/good-fruit-platform-$STAMP"
ZIP_FILE="$DIST/good-fruit-platform-$STAMP.zip"

cd "$ROOT"
node scripts/verify.mjs

rm -rf "$PACKAGE_DIR"
mkdir -p "$PACKAGE_DIR"

cp index.html home.html opportunities.html prayer.html needs.html connect.html marketplace.html learn.html bible.html profile.html "$PACKAGE_DIR/"
cp -R assets "$PACKAGE_DIR/assets"
cp -R api "$PACKAGE_DIR/api"
cp -R docs "$PACKAGE_DIR/docs"
cp -R supabase "$PACKAGE_DIR/supabase"
cp -R scripts "$PACKAGE_DIR/scripts"
cp .env.example .gitignore package.json vercel.json "$PACKAGE_DIR/"

(
  cd "$PACKAGE_DIR"
  find . \( -name ".DS_Store" -o -name "*.swp" -o -name "*.swo" \) -delete
)

rm -f "$ZIP_FILE"
(
  cd "$DIST"
  zip -qr "$(basename "$ZIP_FILE")" "$(basename "$PACKAGE_DIR")"
)

echo "Deploy bundle ready:"
echo "$ZIP_FILE"
