#!/usr/bin/env bash

set -euo pipefail

read -rsp "API Token: " token < /dev/tty

echo

case "$1" in
  local) url="http://localhost:5173/api/add-url" ;;
  remote) url="https://ohariko-watch.com/api/add-url" ;;
  *) exit 1 ;;
esac

while read -r line; do
  echo -n "$line "
  curl \
    -fsSL \
    -X POST \
    -H "Authorization: Bearer $token" \
    -H "Content-Type: application/json" \
    -d "{\"url\":\"$line\"}" \
    "$url"
  echo
done
