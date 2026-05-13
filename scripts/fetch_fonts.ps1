#!/usr/bin/env pwsh
# Windows / cross-platform PowerShell version of fetch_fonts.sh.
# Both fonts are SIL Open Font License 1.1.
$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$fontDir = Join-Path $root "Sources/Notari/Resources/Fonts"
if (-not (Test-Path $fontDir)) { New-Item -ItemType Directory -Force $fontDir | Out-Null }

$fonts = @(
    @{ Url = "https://github.com/Instrument/instrument-serif/raw/main/fonts/ttf/InstrumentSerif-Regular.ttf"; Name = "InstrumentSerif-Regular.ttf" },
    @{ Url = "https://github.com/IBM/plex/raw/master/IBM-Plex-Sans/fonts/complete/ttf/IBMPlexSans-Regular.ttf"; Name = "IBMPlexSans-Regular.ttf" }
)

foreach ($f in $fonts) {
    $dest = Join-Path $fontDir $f.Name
    if (Test-Path $dest) {
        Write-Host "[fonts] already present: $($f.Name)"
        continue
    }
    Write-Host "[fonts] fetching $($f.Name)..."
    Invoke-WebRequest -Uri $f.Url -OutFile $dest
}

Write-Host "[fonts] done."
