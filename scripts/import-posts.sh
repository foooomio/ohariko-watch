#!/usr/bin/env bash

set -euo pipefail

set -a
source "$1"
set +a

while read -r line; do
  echo -n "$line "
  curl \
    -fsSL \
    -X POST \
    -H "Authorization: Bearer $API_TOKEN_GOOGLE_FORM" \
    -d "$line" \
    http://localhost:5173/api/add-url
  echo
done
