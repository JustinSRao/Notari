---
sprint: 1
title: "Project scaffolding"
type: infrastructure
epic: 1
status: in-progress
created: 2026-05-11T16:41:28Z
started: 2026-05-11T16:46:51Z
completed: null
hours: null
workflow_version: "3.1.0"

---

# Sprint 1: Project scaffolding

## Overview

| Field | Value |
|-------|-------|
| Sprint | 1 |
| Title | Project scaffolding |
| Type | infrastructure |
| Epic | 1 |
| Status | In Progress |
| Created | 2026-05-11 |
| Started | 2026-05-11 |
| Completed | - |

## Goal

Create the universal SwiftUI app target (iOS/iPadOS/macOS), set up dependencies, configure CI scaffolding, and produce a runnable hello-world build on all three platforms.

## Background

Notari is a universal Apple-only app developed primarily from a Windows host. Every subsequent sprint depends on a working buildable project: theme system (S2), navigation shell (S3), data models (S4), etc. We need a project layout that:

1. Is diff-friendly so it can be edited from a Windows host without touching brittle Xcode binary files (`XcodeGen` + `project.yml`).
2. Builds and tests automatically on every push (GitHub Actions on `macos-14` runner).
3. Proves the font pipeline works end-to-end (bundled `Instrument Serif` + `IBM Plex Sans` rendering on screen).
4. Establishes the testing baseline (`XCTest`) that future sprints will extend.

## Requirements

### Functional Requirements

- [ ] Single universal SwiftUI app target named `Notari` that builds for iOS 17.0+, iPadOS 17.0+, and macOS 14.0+.
- [ ] Hello-world screen displays: "Notari" wordmark in Instrument Serif, version string (`v0.1.0 (1)`) in IBM Plex Sans, and the current platform name (`iOS` / `iPadOS` / `macOS`) detected at runtime.
- [ ] Project generated from a committed `project.yml` via XcodeGen; the generated `.xcodeproj` is gitignored.
- [ ] GitHub Actions workflow (`.github/workflows/ci.yml`) builds and runs tests for all three destinations on every push/PR.
- [ ] 3 smoke tests pass: bundle ID matches, hello-world view renders without crashing, platform detector returns a non-empty string.

### Non-Functional Requirements

- [ ] No third-party Swift package dependencies in Sprint 1. SPM-only and zero external packages.
- [ ] All file paths use the project's storage conventions described in CLAUDE.md.
- [ ] Bundle identifier placeholder: `com.notari.app` (will change once an Apple Developer team ID exists).
- [ ] Marketing version `0.1.0`, build `1`.
- [ ] Test coverage threshold for infrastructure sprints: 60%.

## Dependencies

- **Sprints**: None (this is the foundation sprint).
- **External**:
  - `XcodeGen` (installed on the macOS CI runner via `brew install xcodegen`; not required on the Windows host).
  - GitHub Actions macOS runner (`macos-14`).
  - Public GitHub repo: https://github.com/JustinSRao/Notari.git

## Scope

### In Scope

- `project.yml` describing the universal `Notari` target and the `NotariTests` test target.
- `Sources/Notari/NotariApp.swift` — app entry point with `#if os(...)` scene declarations.
- `Sources/Notari/Views/HelloWorldView.swift` — the wordmark + version + platform display.
- `Sources/Notari/Platform/PlatformInfo.swift` — runtime platform detector.
- `Sources/Notari/Resources/Fonts/InstrumentSerif-Regular.ttf` + `IBMPlexSans-Regular.ttf`.
- `Sources/Notari/Resources/Assets.xcassets/` — stub app icon set + accent color stub.
- `Sources/Notari/Info.plist` — `UIAppFonts` registration for the two bundled fonts.
- `NotariTests/test_sprint1_scaffolding.swift` — 3 smoke tests.
- `.github/workflows/ci.yml` — build + test on iOS Simulator, iPadOS Simulator, macOS destinations.
- `.gitignore`, `README.md`, `LICENSE` (MIT placeholder), `.swiftlint.yml` (basic config).

### Out of Scope

- Any UI beyond the hello-world screen (theme system is S2, nav shell is S3).
- App Store assets / app icons beyond a 1024×1024 stub (S23).
- Code signing / provisioning profiles (deferred until Apple Developer account exists).
- Sign in with Apple, Supabase, AI proxy, networking — all deferred to later epics.
- Any production app icon design (placeholder only).

## Team Strategy

Sprint 1 is small enough to be implemented by a single `product-engineer` agent rather than the full backend/frontend/test split. Test files are written first, then implementation.

### File ownership

| Owner | Files |
|-------|-------|
| `product-engineer` | `project.yml`, `Sources/Notari/**/*.swift`, `Info.plist`, `Assets.xcassets/**` |
| `product-engineer` | `Sources/Notari/Resources/Fonts/*.ttf` (bundled, not generated) |
| `product-engineer` | `NotariTests/test_sprint1_scaffolding.swift` |
| `devops-engineer` | `.github/workflows/ci.yml`, `.swiftlint.yml`, `.gitignore` |
| `quality-engineer` | Review pass at the end of Phase 3 |

### Integration strategy

- All files in a single working tree on the Windows host.
- No actual Xcode build happens on Windows — `xcodebuild` runs only on GitHub Actions `macos-14` runner (or on the user's Mac when interactive UI debugging is required, starting Sprint 2).
- The `.xcodeproj` is generated by `xcodegen generate` from the committed `project.yml`; the resulting `.xcodeproj/` is gitignored so multiple contributors don't merge-conflict on it.
- Initial commit is created locally; pushing to https://github.com/JustinSRao/Notari.git is gated on user confirmation (Sprint 5.2).

### Parallelism

This sprint is sequential, not parallel. The work is too small and too interdependent (project.yml must exist before tests can be written that reference paths in it).

## Technical Approach

**Project generation**: `project.yml` lists one app target with three platform variants enabled via the `supportedDestinations` field. XcodeGen produces a single universal target, not three separate ones.

**Platform conditionals**: `NotariApp.swift` declares a `WindowGroup` body, but the scene wrappers differ via `#if os(macOS)` (windowed `Settings` scene allowed but not used yet) vs the default iOS/iPadOS `WindowGroup`.

**Font loading**: TTF files are added to the bundle. `Info.plist` registers them under `UIAppFonts` (iOS/iPadOS) and `ATSApplicationFontsPath` (macOS). A `Font` extension exposes `Font.instrumentSerif(size:)` and `Font.ibmPlexSans(size:)` so future sprints don't need to know font file names.

**CI**: GitHub Actions workflow runs three jobs in parallel — `build-ios`, `build-ipad`, `build-mac` — each invoking `xcodegen generate` followed by `xcodebuild build test`. A separate `lint` job runs SwiftLint on Linux (no Xcode needed).

**Testing strategy**: Smoke tests only in Sprint 1. Real feature tests start in S2.

## Tasks

### Phase 1: Planning

- [x] 1.1 Review requirements (sprint goal + epic context)
- [x] 1.2 Design architecture (Plan agent designed XcodeGen + universal target approach)
- [x] 1.3 Clarify requirements (locked Windows+GHA build strategy, public repo, iOS17/iPadOS17/macOS14, fonts shipped in S1)

### Phase 2: Implementation

- [ ] 2.1 Write tests (`NotariTests/test_sprint1_scaffolding.swift`)
- [ ] 2.2 Implement feature (`project.yml`, all `.swift` files, fonts, Info.plist, assets, CI workflow)
- [ ] 2.3 Fix test failures (push to GitHub Actions; iterate until green)

### Phase 3: Validation

- [ ] 3.1 Quality review (project layout, naming, comments, file structure)
- [ ] 3.2 Refactoring (cleanup pass)

### Phase 4: Documentation

- [ ] 4.1 Update README.md with build instructions for both Windows + Mac contributors

### Phase 5: Commit

- [ ] 5.1 Initial commit to local repo
- [ ] 5.2 Push to https://github.com/JustinSRao/Notari.git (manual step on Mac, or via Windows git client)

## Acceptance Criteria

- [ ] `project.yml` exists and is checked into git
- [ ] `xcodegen generate` (on Mac) produces a valid `Notari.xcodeproj`
- [ ] All three `xcodebuild` destinations build successfully on `macos-14` runner
- [ ] All 3 smoke tests pass on iOS Simulator, iPadOS Simulator, and macOS
- [ ] CI workflow green on a push to `main`
- [ ] README.md explains the dual-host (Windows authoring, Mac/GHA building) workflow

## Notes

Created: 2026-05-11
Clarifications locked: 2026-05-13
- Build host: Windows primary, Apple computer available for interactive work
- GitHub repo: https://github.com/JustinSRao/Notari.git (public)
- Min deployment: iOS 17.0 / iPadOS 17.0 / macOS 14.0
- App identity: Notari, v0.1.0 (1), bundle `com.notari.app`
- Fonts ship in Sprint 1 (Instrument Serif + IBM Plex Sans)
