# Problem Brief — Notari

## The problem

Existing flashcard apps fall into two buckets, each with frustrating gaps:

**Bucket A — Free/cluttered apps (Quizlet, Anki Mobile, others):**
- Heavy ads or aggressive paywalls on basic features.
- Cluttered, dated UI that feels foreign on Apple devices.
- No good integration of *notes* with cards — notepad and flashcard live in separate worlds (or notepads don't exist).
- AI features are either bolt-on subscriptions or absent entirely.

**Bucket B — Premium niche apps (RemNote, Mochi):**
- Powerful but cognitively heavy — designed for power users.
- Web-first; native Apple experience is often a wrapper.
- Pricing is monthly/yearly subscription only — no "buy once, own it" option for users who just want a clean flashcard app.

## The Notari opportunity

A clean, native, Apple-first flashcard app that:

1. **Costs $5 once** for the full core experience (flashcards + notepads + customization + AI on tokens) — no subscription required.
2. **Pairs every flashcard with a notepad** as a first-class feature, not an afterthought.
3. **Feels like a real Apple app**, with native animations, voice-to-text via Apple Speech, and platform-appropriate UI on iPhone vs iPad vs Mac.
4. **Adds optional social** (study buddies, sharing, streaks) for users who want it, behind a fair monthly subscription — without locking core features behind it.

## Why now

- **Apple is consolidating its platforms** — SwiftUI now ships great cross-platform code from one codebase. Building universal apps is much more practical than 3 years ago.
- **AI study assistants are mainstream** — students expect AI help with their material. A multi-provider chatbot that grounds itself in the user's own decks is differentiated and useful.
- **The "buy once" market is undermonetized in education** — most competitors moved to subscription-only. A $5 flat price feels like a deal to users, and tokens/IAP capture additional revenue from heavy users.

## Who this is *not* for

- Users who want infinite free flashcards with no commitment. (They'll use Quizlet/Anki.)
- Spaced-repetition power users who need SM-2 scheduling or research-grade algorithms. (Use Anki.)
- Cross-platform users on Windows/Android. (Not our market in v1.)

## Risks

- **App Store discovery** is brutal for indie apps. We need strong screenshots, App Store keywords, and ideally some launch coverage.
- **AI cost overruns** — if token pricing isn't tuned, users could burn through tokens fast and complain. Margins on the AI proxy need to be conservative.
- **Subscription resistance** — the "buy once" pitch is strong, but selling the Online tier on top is still a hurdle. Free trial period? Friend-driven viral signup? ❓ TBD.
- **Sync correctness** — when a user upgrades from free → Online, their local decks need to sync without data loss. Conflict resolution is a real engineering problem.

❓ TBD — none blocking this phase.
