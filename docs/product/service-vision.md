# Service Vision — Notari

## One-line pitch

A beautifully designed flashcard study app for Apple devices, with built-in notepads, AI study help, and optional online features for studying with friends.

## What Notari is

A native iOS/iPadOS/macOS study app, sold once on the Apple App Store for **$5 USD**, that:

- Lets users build decks of flashcards with optional images.
- Pairs every flashcard with a lined-paper notepad (voice-to-text supported).
- Flips cards with a real 3D animation users can customize (speed, size, shape, color).
- Offers a multi-provider AI chatbot for studying — works against the open internet or grounded in the user's own decks.
- Optionally unlocks "Online" features (study buddies, deck sharing, friend streaks, gift tokens) for a monthly subscription.

## Long-term vision

Notari should feel like a **considered, calm, native Apple app** — the antithesis of cluttered, ad-driven study tools. Three principles guide every decision:

1. **Native first, web second.** SwiftUI on Apple platforms — no React Native, no Electron. Animations and inputs should feel platform-native. Voice-to-text uses Apple Speech.
2. **Local by default, cloud by choice.** The free tier never requires an account or network. The Online tier is opt-in for users who want social/sync features.
3. **One-time purchase respected.** The $5 buyer gets a *complete* app — AI chatbot, all customization, all study features. The monthly tier adds social/cloud, not gates around the basics.

## Out of scope (explicitly)

- Android/Windows/Web versions in v1. SwiftUI-only.
- Spaced-repetition algorithms beyond the basics. (Initial release uses simple review queues, not SM-2/Anki-grade scheduling.)
- Marketplace/store for selling decks. Sharing is friend-to-friend only.
- Real-time co-study sessions (could be future).

## Design north star

Refer to `_design_reference/` (Claude Design mockups). Type system: **Instrument Serif** (display) + **IBM Plex Sans** (UI) + **SF** (native chrome). Palette: warm paper-cream in light mode, near-black in dark mode, 13 user-selectable accent colors.

❓ TBD — none in this phase. Vision is locked.
