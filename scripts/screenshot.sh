#!/bin/bash
# 開発サーバのページをChrome（ヘッドレス）で撮影する。追加ライブラリ不要。
# Chromeは撮影後も終了しないことがあるため、ファイルができた時点で止める。
#
# 使い方: scripts/screenshot.sh <幅> <出力PNG> [パス] [高さ]
#   例) scripts/screenshot.sh 1440 /tmp/top-1440.png / 4000
#       scripts/screenshot.sh 375  /tmp/top-375.png  / 7000
# 開発サーバ（既定 http://localhost:3461）が起動している前提。BASE_URL で変更可。
set -u
WIDTH="$1"
OUT="$2"
PAGE="${3:-/}"
HEIGHT="${4:-4000}"
BASE_URL="${BASE_URL:-http://localhost:3461}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILE="$(mktemp -d)"

rm -f "$OUT"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$PROFILE" \
  --window-size="${WIDTH},${HEIGHT}" --virtual-time-budget=5000 \
  --screenshot="$OUT" "${BASE_URL}${PAGE}" >/dev/null 2>&1 &
PID=$!

for _ in $(seq 1 60); do
  if [ -s "$OUT" ]; then
    sleep 1
    break
  fi
  sleep 1
done
kill "$PID" 2>/dev/null
pkill -f "$PROFILE" 2>/dev/null
rm -rf "$PROFILE"

if [ -s "$OUT" ]; then
  echo "saved: $OUT (${WIDTH}x${HEIGHT})"
else
  echo "failed: screenshot was not written" >&2
  exit 1
fi
