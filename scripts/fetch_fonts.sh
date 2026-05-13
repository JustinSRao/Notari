#!/usr/bin/env bash
# Fetch the two display/UI fonts Notari ships with.
# Both fonts are SIL Open Font License 1.1 — free to bundle.
# Run this once on each machine before `xcodegen generate`.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FONT_DIR="$ROOT/Sources/Notari/Resources/Fonts"
mkdir -p "$FONT_DIR"

INSTRUMENT_SERIF_URL="https://github.com/Instrument/instrument-serif/raw/main/fonts/ttf/InstrumentSerif-Regular.ttf"
IBM_PLEX_SANS_URL="https://github.com/IBM/plex/raw/master/IBM-Plex-Sans/fonts/complete/ttf/IBMPlexSans-Regular.ttf"

curl_fetch() {
    local url="$1" dest="$2"
    if [ -f "$dest" ]; then
        echo "[fonts] already present: $(basename "$dest")"
        return
    fi
    echo "[fonts] fetching $(basename "$dest")..."
    curl -fSL --retry 3 -o "$dest" "$url"
}

curl_fetch "$INSTRUMENT_SERIF_URL" "$FONT_DIR/InstrumentSerif-Regular.ttf"
curl_fetch "$IBM_PLEX_SANS_URL"    "$FONT_DIR/IBMPlexSans-Regular.ttf"

echo "[fonts] done."
