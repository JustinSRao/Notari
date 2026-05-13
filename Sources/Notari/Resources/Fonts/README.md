# Fonts

This directory holds the two display/UI fonts Notari ships with:

| File | License | Source |
|------|---------|--------|
| `InstrumentSerif-Regular.ttf` | SIL Open Font License 1.1 | github.com/Instrument/instrument-serif |
| `IBMPlexSans-Regular.ttf` | SIL Open Font License 1.1 | github.com/IBM/plex |

The font binaries are **not committed to the repo**. Run one of these scripts once per machine before building:

```bash
# Mac / Linux
./scripts/fetch_fonts.sh

# Windows / PowerShell
./scripts/fetch_fonts.ps1
```

CI runs `scripts/fetch_fonts.sh` automatically before `xcodegen generate`.
