---
epic: 2
title: "Decks Foundation"
status: planning
created: 2026-05-11
started: null
completed: null
---

# Epic 02: Decks Foundation

## Overview

Make Notari useful by letting users actually create decks of flashcards. Implements the local-only data layer (per-deck .json files + dedicated images folder with auto-rename) and the polished Decks home view that matches the design mockups.

## Success Criteria

- [ ] User can create a new deck with a name and emoji.
- [ ] User can add images to flashcards; images auto-rename to {flashcard_id}.{ext}.
- [ ] Decks home view matches _design_reference/Navigation.html and Navigation_iPad.html.
- [ ] User can rename a deck — all its flashcards stay linked.
- [ ] User can delete a deck after a confirmation prompt; storage is cleaned up.
- [ ] All deck/flashcard data persists across app launches via local JSON files.

## Sprints

| Sprint | Title | Status |
|--------|-------|--------|
| 4 | Data models and local JSON store | planned |
| 5 | Image storage and auto-rename | planned |
| 6 | Decks home view | planned |
| 7 | Deck CRUD flows | planned |

## Notes

Created: 2026-05-11
