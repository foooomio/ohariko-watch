#!/usr/bin/env bash

set -euo pipefail

url='https://sgrkb.github.io/shigariko_button/ex/ohariko.html'
regexp='https://x.com/Shigariko_/status/\d+'

curl -fsSL "$url" | grep -o -E "$regexp" | grep -v '1803381639843860835'
