#!/usr/bin/env bash

set -euo pipefail

url='https://sgrkb.github.io/shigariko_button/ex/ohariko.html'
regexp='https://x.com/Shigariko_/status/\d+'

curl -fsSL "$url" | grep -o -E "$regexp" | sort \
  | grep -v -e 1803381639843860835 -e 1818531106796585218 -e 1842850368012906651
