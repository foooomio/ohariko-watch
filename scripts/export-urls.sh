#!/usr/bin/env bash

set -euo pipefail

sql='SELECT url FROM posts ORDER BY date'
regexp='https://x.com/Shigariko_/status/\d+'

pnpm wrangler d1 execute ohariko-db --"$1" --command="$sql" | grep -o -E "$regexp"
