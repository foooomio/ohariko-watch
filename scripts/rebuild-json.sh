#!/usr/bin/env bash

set -euo pipefail

read -rsp "API Token: " token < /dev/tty

echo

case "$1" in
  local) url="http://localhost:5173/api/rebuild-json" ;;
  remote) url="https://ohariko-watch.com/api/rebuild-json" ;;
  *) exit 1 ;;
esac

curl \
  -fsSL \
  -X POST \
  -i \
  -H "Authorization: Bearer $token" \
  "$url"

echo
