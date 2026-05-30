#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Good Fruit GitHub doctor"
echo "Project: $ROOT"
echo

echo "1. Checking local site..."
node scripts/verify.mjs
echo

echo "2. Checking DNS for github.com..."
if dscacheutil -q host -a name github.com >/tmp/good-fruit-github-dns.log 2>&1 && grep -Eq "ip_address|ipv6_address" /tmp/good-fruit-github-dns.log; then
  cat /tmp/good-fruit-github-dns.log
else
  cat /tmp/good-fruit-github-dns.log || true
  echo
  echo "DNS lookup failed or returned no GitHub address. Try these in your normal Mac Terminal:"
  echo "  sudo dscacheutil -flushcache"
  echo "  sudo killall -HUP mDNSResponder"
  echo
  echo "If DNS is still broken, temporarily set DNS for Wi-Fi:"
  echo "  sudo networksetup -setdnsservers Wi-Fi 1.1.1.1 8.8.8.8"
  echo
  echo "Then rerun:"
  echo "  bash scripts/github-doctor.sh"
  exit 2
fi
echo

echo "3. Checking HTTPS reachability..."
if ! curl -I https://github.com --connect-timeout 10 >/tmp/good-fruit-github-https.log 2>&1; then
  cat /tmp/good-fruit-github-https.log
  echo
  echo "HTTPS to GitHub failed. Check Wi-Fi/VPN/firewall, then rerun this script."
  exit 3
fi
sed -n '1,5p' /tmp/good-fruit-github-https.log
echo

echo "4. Checking SSH authentication..."
set +e
ssh -o ConnectTimeout=10 -T git@github.com >/tmp/good-fruit-github-ssh.log 2>&1
ssh_status=$?
set -e
cat /tmp/good-fruit-github-ssh.log
if ! grep -qi "successfully authenticated" /tmp/good-fruit-github-ssh.log; then
  echo
  echo "SSH auth did not confirm GitHub access."
  echo "If needed, add your SSH key to GitHub or use the GitHub Desktop app to push."
  exit "$ssh_status"
fi
echo

echo "GitHub looks reachable. Pushing current Good Fruit changes..."
bash scripts/push-to-github.sh "Add Seedling advocate and production foundation"
