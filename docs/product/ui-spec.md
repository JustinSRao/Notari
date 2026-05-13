# UI Spec — Notari

## Source of truth

Authoritative design mockups live in `_design_reference/`. This document describes the **screen inventory**, **platform breakpoints**, and **screens we still need to invent** (not in the existing design files).

## Platform layouts

| Platform | Width | Layout |
|----------|-------|--------|
| iPhone (compact) | < 600pt | Single column. Floating 5-tab bar at bottom. Large titles. Stacked content. |
| iPad (regular) | 600–1100pt | Two columns. Left sidebar (collapsible: 240pt expanded → 76pt icon-only). Main content right. |
| iPad (wide) / Mac | > 1100pt | Same as iPad regular but sidebar always expanded. May add a right detail pane in some screens (e.g., deck list left, deck detail right). |

SwiftUI implementation: use `@Environment(\.horizontalSizeClass)` + `GeometryReader` for breakpoint logic. `NavigationSplitView` for iPad/Mac and `TabView` for iPhone.

## Tab inventory

In order on both layouts:

1. **Decks** — flashcard deck library
2. **Notes** — aggregated notepad view across all decks
3. **AI Chat** — chatbot tab
4. **Messages** — friend requests, deck shares/requests, token gifts (Online only — locked screen for free users)
5. **Profile** — user profile + Settings access

## Screen inventory

### ✅ Designed (in `_design_reference/`)

| Screen | Source file |
|--------|-------------|
| Decks home (iPhone) | `project/Navigation.html` + `nav-shell.jsx` |
| Decks home (iPad/Mac) | `project/Navigation_iPad.html` + `nav-shell-ipad.jsx` |
| Settings — Appearance/Accent | `project/Theme.html` + `theme-screens.jsx` |
| Flashcard (study view) + Notepad modal | `project/Flashcard.html` |

### ❓ Needs design — major screens

These screens are not in the existing mockups and need design treatment (in code, following the established visual language). Captured here so the sprints that build them can include design work.

#### Decks tab — secondary screens
- **Deck detail** — viewing a specific deck's cards (list view + study button)
- **Flashcard editor** — creating/editing a single flashcard (front text, back text, image attach, notepad link)
- **Deck creation flow** — name + emoji picker + first card
- **Deck rename / delete confirmations**

#### Notes tab
- **Notes index** — list/grid of all notepads, grouped by deck, with search
- **Note expanded view** — same notepad UI as the modal, but full-screen / standalone

#### AI Chat tab
- **Empty state** — explains modes, deck selector, model picker
- **Active conversation** — message list, model badge, token cost preview, response length picker
- **Deck context picker** — multi-select decks for grounded mode
- **Model picker** — list of providers with their models, descriptions, multipliers
- **Token balance & buy more** — shows current balance, IAP entry points

#### Messages tab (Online tier)
- **Inbox** — unified list of friend requests, deck shares, deck requests, token gifts
- **Friend request detail** — accept/decline
- **Deck share preview** — preview cards before importing
- **Deck request flow** — accept (sends deck) or decline
- **Token gift confirmation**
- **Send-to-friend selector** — used from a deck's "share" action

#### Profile tab
- **Profile header** — avatar (initials or photo), display name, username (Online only), streak counter
- **Stats** — total decks, cards mastered, streak, friends count (Online only)
- **Settings entry** — opens full Settings screen
- **Sign in / Sign up entry** (Free tier) or Account management (Online tier)

#### Settings — extended
- The existing `Theme.html` design covers Appearance + Accent. The full Settings screen also needs:
  - Font picker
  - Flashcard customization section (flip speed, size, shape, both-sides toggle, palette)
  - Notepad customization section (paper color, line color, animation, icon size/corner)
  - Notifications + Haptics + Streak goal
  - Subscription management (Online tier status, upgrade/cancel)
  - About / Version / Legal

#### Onboarding (first launch)
- **Welcome** — brand intro
- **What it does** — 2–3 swipeable cards explaining flashcards + notepads + AI
- **First deck** — guided creation of your first deck
- **(Free tier signup)** — skipped; just dropped into the app

#### Online tier signup flow
- **Sign in with Apple / email** screen
- **Username creation**
- **"Sync your local decks?" prompt** — auto-merge confirmation
- **Subscription purchase screen** — explains Online benefits, shows monthly price, IAP confirmation

#### IAP screens
- **Study Tokens shop** — small/medium/large packs, current balance
- **Online tier purchase** — explains tier benefits, monthly price

## Visual system

Pulled from `_design_reference/`:

| Token | Value |
|-------|-------|
| Display font | Instrument Serif (italics for accents) |
| UI body font | IBM Plex Sans (400, 500, 600 weights) |
| Native chrome font | SF (system) |
| Light mode background | `#F2F1EC` (warm cream) |
| Dark mode background | `#000` / `#1C1C1E` cards |
| Hairline separator (light) | `rgba(60,60,67,0.12)` |
| Hairline separator (dark) | `rgba(84,84,88,0.5)` |
| Card corner radius | 18pt (large), 10pt (small) |
| Tab bar | Floating, 28pt radius, blurred background |
| Primary action button | Pill, accent-filled, shadow with `accent + 55` alpha |
| Accent colors | 13 swatches — see `_design_reference/project/theme-screens.jsx` `ACCENTS` constant |

## Interaction patterns

- **Flashcard flip** — tap card or press Space (Mac/iPad keyboard) → Y-axis rotateY animation, configurable speed.
- **Notepad open** — tap notepad icon on card → modal opens with configurable animation (pop/rise/fade/flip).
- **Search** — pull-down search field on Decks home (iPhone) or sidebar search with ⌘K (iPad/Mac).
- **Long press** — context menu on a deck row (Rename / Share / Delete).
- **Swipe to delete** (iPhone) — on deck rows in list view.
- **Keyboard shortcuts (Mac/iPad with keyboard)** —
  - `⌘N` — new deck
  - `⌘F` — focus search
  - `Space` — flip current card
  - `→` / `←` — navigate cards in study mode
  - `⌘,` — open Settings

## Accessibility

- All screens support Dynamic Type (font scaling).
- VoiceOver labels on every interactive element.
- High-contrast mode respects accent color but boosts contrast ratios.
- Reduced Motion setting disables flip animation (instant face swap instead).
- Color is never the only signal — icons + text accompany state changes.

❓ **TBD — Design polish for unbuilt screens**

I'll propose visual treatments for each unbuilt screen during its respective sprint, drawing from the established design language. If you want to do more Claude Design mockups for any of these screens before that sprint begins, that's the best way to lock them in. The ones I'd prioritize for separate design treatment:

1. **Flashcard editor** — central UX, deserves intentional design
2. **AI Chat conversation** — needs clear mode/model/token affordances
3. **Onboarding** — first impression, sets the brand tone
