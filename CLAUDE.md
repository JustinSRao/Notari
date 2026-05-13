# Project Instructions

## Workflow System

This project uses an **AI-assisted development workflow** with parallel agents, skills, and slash commands.

**Workflow Version**: See `.claude/WORKFLOW_VERSION` for current version.

### Quick Start

```bash
/sprint-new "Feature Name"    # Create a new sprint
/sprint-start <N>             # Initialize sprint, spawn Plan agent
/sprint-next                  # Advance to next step
/sprint-status                # Check progress and agent status
/sprint-complete              # Pre-flight checklist and finish
/sprint-postmortem            # Capture learnings
```

### How It Works

```
Phase 1: Planning (sequential)
├── Read sprint → Plan agent designs team → Clarify requirements

Phase 2: Implementation (PARALLEL)
├── Backend agent ──┐
├── Frontend agent ─┼── Run simultaneously
└── Test agent ─────┘

Phase 3: Validation (sequential)
├── Integrate → Run tests → Quality review → User approval

Phase 4: Complete (sequential)
├── Commit → Move to done → Postmortem
```

### Key Concepts

- **Agents**: Plan, product-engineer, quality-engineer, test-runner, devops-engineer
- **State Files**: `.claude/sprint-N-state.json` tracks each sprint
- **Sprint Counter**: `docs/sprints/next-sprint.txt` auto-assigns numbers

### Sprint Directories

| Directory | Purpose |
|-----------|---------|
| `docs/sprints/1-todo/` | Planned sprints waiting to start |
| `docs/sprints/2-in-progress/` | Currently active sprints |
| `docs/sprints/3-done/` | Completed sprints |
| `docs/sprints/5-aborted/` | Cancelled/abandoned sprints |

### Workflow Enforcement

The sprint workflow is enforced via hooks. Key rules:
- Cannot skip steps - must complete current before advancing
- Cannot commit without completing sprint
- All sprints require postmortem before completion
- Sprint numbers auto-assigned from counter file

### Epic Management

Group related sprints into epics:

```bash
/epic-new "Epic Name"         # Create new epic
/epic-start <N>               # Start working on epic
/sprint-new "Feature" --epic=N # Add sprint to epic
/epic-complete <N>            # Finish epic when all sprints done
```

---

## Project: Notari

**Notari** (no-TAR-ee) is a study/flashcard app for iOS, iPadOS, and macOS. Coined from "note" + classical Latin `-ari` ending — hints at notes/notebooks while sounding like an established brand.

### Distribution & Pricing

- **One-time purchase**: $5 USD on the Apple App Store (iOS, iPadOS, macOS — single universal purchase).
- **Free tier (post-purchase)**: All flashcards/notepads stored locally on device. Includes AI chatbot (token-gated).
- **Online tier (monthly subscription, TBD)**: Study buddies, friend requests, share/request decks, likes, study streaks with friends. Data syncs to Supabase.
- **Study Tokens**: In-app purchase, consumed by AI chatbot. Giftable between friends (shown in Messages tab).

### Tech Stack

| Layer | Choice |
|-------|--------|
| Platforms | iOS / iPadOS / macOS (universal Apple-only) |
| UI framework | **SwiftUI** (one codebase, platform-conditional UI for phone vs. iPad vs. Mac) |
| Voice-to-text | Apple Speech framework (native, free) |
| Backend (Online tier) | **Supabase** (Postgres + auth + storage + realtime) |
| Auth | Sign in with Apple + email/password |
| AI proxy | Small server backend that holds keys for OpenAI, Anthropic, Google, xAI, DeepSeek. Users never see raw keys. |
| Local storage | Per-deck `.json` files + dedicated `images/` folder. Image filenames mirror their flashcard ID. |
| Cloud storage | Supabase Storage for images on Online tier. |

### Core Features

- Decks containing flashcards with front/back text + optional image (thumbnail → click to enlarge).
- Per-flashcard notepad (lined-paper UI, voice-to-text input).
- 3D Y-axis flip animation, configurable speed/size/shape.
- "Both sides at once" view option.
- 13 accent themes + light/dark/auto mode.
- AI chatbot with two modes: (1) full internet research; (2) RAG over one or more selected decks.
- Multi-provider AI (ChatGPT, Claude, Gemini, Grok, DeepSeek) — user picks model, tokens cost varies by model.
- Customization: fonts, flip speed, flashcard size/shape/color, notebook line color, paper color.
- All deletes require confirmation.

### Design Reference

Original design mockups from Claude Design live in `_design_reference/`:
- `project/Navigation.html` + `nav-shell.jsx` — iPhone shell
- `project/Navigation_iPad.html` + `nav-shell-ipad.jsx` — iPad shell
- `project/Theme.html` + `theme-screens.jsx` — Settings + accent picker
- `project/Flashcard.html` — Flip animation + notepad modal

Fonts: **Instrument Serif** for display/serif, **IBM Plex Sans** for UI body, SF for native iOS chrome.

Accent palette IDs and hex values are defined in `_design_reference/project/theme-screens.jsx` (constant `ACCENTS`).

### Storage Conventions

```
{deck_id}.json          # one file per deck (flashcards + metadata)
{deck_id}_notes.json    # notepad data for all cards in the deck
images/
  {flashcard_id}.{ext}  # auto-renamed on import to match owning flashcard
```

### Code Standards

- Swift 5.10+, SwiftUI, async/await for concurrency.
- Use `#if os(...)` and `@Environment(\.horizontalSizeClass)` for platform/size adaptations rather than separate target apps.
- Prefer `Codable` for `.json` persistence; lean on `JSONEncoder.dateEncodingStrategy = .iso8601`.
- No third-party UI libraries unless strongly justified — SwiftUI native.
- Voice-to-text via `SFSpeechRecognizer` (request permission via `NSSpeechRecognitionUsageDescription`).

### Testing Requirements

- Sprint type defaults to **fullstack** (75% coverage threshold) unless sprint frontmatter specifies otherwise.
- XCTest for unit tests; XCUITest for E2E flows.
- Each sprint produces `tests/test_sprint{N}_*.swift` per Maestro convention.

### Apple Developer / App Store

- Apple Developer account ($99/yr) **not yet acquired**. Will be obtained when sprint reaches App Store submission.
- App ID, bundle identifier, Sign in with Apple capability, and IAP product IDs all TBD — block on developer account.
