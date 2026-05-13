# Notari

A study/flashcard app for **iOS**, **iPadOS**, and **macOS** — one universal SwiftUI codebase, one $5 universal App Store purchase.

> _Status: pre-alpha. Sprint 1 (project scaffolding) in progress. Not yet shippable._

---

## What is this?

Notari (no-TAR-ee) is a flashcard study tool with:

- Decks of front/back flashcards with optional images.
- Per-flashcard lined-paper notepads with voice-to-text.
- A 3D flip animation that's configurable for size/speed/shape.
- Built-in AI chatbot (multi-provider) for studying — with two modes: open-internet Q&A or RAG over your selected decks.
- 13 accent themes + light/dark/auto, plus deep typography and notebook-style customization.
- (v2.0) Sign-in + sync, friends + streaks, deck sharing, and giftable Study Tokens.

Designed Apple-first: one purchase covers all three platforms.

---

## Repo layout

```
Notari/
├── project.yml              # XcodeGen project definition (source of truth)
├── Sources/Notari/          # Swift sources (universal target)
│   ├── NotariApp.swift
│   ├── Views/
│   ├── Platform/
│   ├── Extensions/
│   └── Resources/           # Info.plist, Assets.xcassets, Fonts/
├── NotariTests/             # XCTest unit tests
├── scripts/
│   ├── fetch_fonts.sh       # download Instrument Serif + IBM Plex Sans (Mac/Linux)
│   └── fetch_fonts.ps1      # same, Windows/PowerShell
├── .github/workflows/ci.yml # GitHub Actions: build + test on macos-14
├── docs/                    # product docs + sprint plans
├── _design_reference/       # original Claude Design mockups
└── CLAUDE.md                # project-wide AI-assistant context
```

The `.xcodeproj/` is **not committed**. It is regenerated from `project.yml` via [XcodeGen](https://github.com/yonaskolb/XcodeGen) every build.

---

## Building Notari

You need a Mac (or a GitHub Actions macOS runner) to build SwiftUI. The repository is authored primarily from a Windows host with builds happening on CI.

### One-time setup (Mac)

```bash
brew install xcodegen swiftlint
./scripts/fetch_fonts.sh       # downloads Instrument Serif + IBM Plex Sans
xcodegen generate              # produces Notari.xcodeproj
open Notari.xcodeproj
```

### One-time setup (Windows authoring)

Windows can't compile or run SwiftUI, but it can author Swift files, run linters via CI, and commit changes. Fonts can be pre-fetched so the diff is clean:

```powershell
./scripts/fetch_fonts.ps1
```

You will not get a usable build on Windows. Push to GitHub and let CI build, or sync to a Mac.

### Running tests

```bash
# iOS Simulator
xcodebuild -project Notari.xcodeproj -scheme Notari \
  -destination 'platform=iOS Simulator,name=iPhone 15,OS=17.5' \
  test

# iPad Simulator
xcodebuild -project Notari.xcodeproj -scheme Notari \
  -destination 'platform=iOS Simulator,name=iPad Pro (12.9-inch) (6th generation),OS=17.5' \
  test

# macOS
xcodebuild -project Notari.xcodeproj -scheme Notari \
  -destination 'platform=macOS' \
  test
```

CI runs all three in parallel on every push.

---

## Deployment targets

| Platform | Minimum OS |
|----------|------------|
| iOS      | 17.0       |
| iPadOS   | 17.0       |
| macOS    | 14.0 (Sonoma) |

---

## Versioning

| Field                | Value      |
|----------------------|------------|
| Marketing version    | `0.1.0`    |
| Build number         | `1`        |
| Bundle identifier    | `com.notari.app` _(placeholder — will change when an Apple Developer team ID is assigned)_ |

---

## Workflow

This project follows a custom Maestro-style sprint workflow with parallel agents, slash commands, and per-sprint state files. See [`CLAUDE.md`](./CLAUDE.md) for the full description.

Quick reference:

| Command | Effect |
|---------|--------|
| `/sprint-new "..."` | Create a new sprint planning file |
| `/sprint-start N`   | Begin executing sprint N |
| `/sprint-next`      | Advance to the next workflow step |
| `/sprint-status`    | Show current progress |
| `/sprint-complete`  | Pre-flight checklist and finish |
| `/sprint-postmortem`| Capture learnings |

Sprint plans live in `docs/sprints/` (1-todo / 2-in-progress / 3-done / 5-aborted).

---

## License

MIT — see [LICENSE](./LICENSE).

Bundled fonts are licensed separately under SIL Open Font License 1.1:

- **Instrument Serif** by Instrument
- **IBM Plex Sans** by IBM

Neither is committed to the repo; both are fetched by `scripts/fetch_fonts.{sh,ps1}` from their upstream sources.
