#!/usr/bin/env bash

set -euo pipefail

url='https://assets.ohariko-watch.com/stats/posts.json'

curl -fsSL "$url" | jq -r '.payload[].url | select(. != null)'
