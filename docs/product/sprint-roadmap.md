# Sprint Roadmap — Notari

This is the proposed sprint-and-epic breakdown that translates the [Solution Spec](./solution-spec.md) and [User Stories](./user-stories.md) into executable Maestro sprints.

## Release strategy

Three major releases, each shipped as a free update to existing $5 buyers:

| Release | Scope | Why |
|---------|-------|-----|
| **v1.0** | Full local app + AI chatbot + App Store launch | Ships the "buy once, get the full app" promise as advertised. Tokens are the only IAP. |
| **v2.0** | Online tier added (sign-in, sync, friends, messages, streaks, gifting) | Adds the monthly subscription as the second monetization vector once core app has reviews/users. |
| **v2.x+** | Polish, requested features, eventual second platform if it ever makes sense | Reactive to user feedback. |

**Release strategy decision (locked 2026-05-11):** **v1.0 ships with AI.** AI chatbot is a core differentiator and matches the "everything for $5" positioning. v2.0 adds the Online tier on top.

## v1.0 — App Store launch

### Epic 1: Foundation (3 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S1 | Project scaffolding | Create universal SwiftUI app target (iOS/iPadOS/macOS), set up dependencies, CI scaffolding, basic README | infrastructure |
| S2 | Theme & accent system | Implement light/dark/auto, 13-accent palette as `Theme` environment, CSS-variable-like token system in SwiftUI | frontend |
| S2.5 | Navigation shell | Tab bar (iPhone), `NavigationSplitView` sidebar (iPad/Mac), platform-aware routing | frontend |

### Epic 2: Decks Foundation (4 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S3 | Data models & local JSON store | `Deck` + `Flashcard` models, `DeckStore` service reading/writing per-deck `.json` files in Application Support | backend |
| S4 | Image storage & auto-rename | `ImageStore` service, auto-rename on import to `{flashcard_id}.{ext}`, thumbnail generation | backend |
| S5 | Decks home view (universal) | Implement the Decks tab matching `_design_reference/Navigation.html` (iPhone) and `Navigation_iPad.html` (iPad/Mac) | frontend |
| S6 | Deck CRUD flows | Create deck, rename deck (cascades to all flashcards), delete deck with confirmation | fullstack |

### Epic 3: Flashcard Editor & Study (4 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S7 | Flashcard editor | Create/edit flashcards — front/back text fields, image attach, notepad link | fullstack |
| S8 | Flashcard flip view & animation | 3D Y-axis flip matching `_design_reference/Flashcard.html`, configurable speed/size/shape | frontend |
| S9 | Study session navigation | Card-by-card navigation, progress bar, "Pick up where you left off" hero card | fullstack |
| S10 | Both-sides view + image popup | Both-sides toggle, tap-to-enlarge image popup on flashcard | frontend |

### Epic 4: Notepads (3 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S11 | Notepad data model & storage | `Note` model, `NoteStore` writing to per-deck `_notes.json` | backend |
| S12 | Notepad modal UI | Lined paper background, B/I/U/lists/checklist toolbar, open animation, configurable styling | frontend |
| S13 | Voice-to-text + Notes tab | `SFSpeechRecognizer` integration in notepad, Notes tab aggregated index view | fullstack |

### Epic 5: Settings & Customization (2 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S14 | Settings — Theme/Accent | Matches `_design_reference/Theme.html` — segmented control + accent grid + mode previews | frontend |
| S15 | Settings — Full customization | Font picker, flashcard customization, notepad customization, streak goal, notifications, haptics | frontend |

### Epic 6: Profile & Streaks (1 sprint)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S16 | Profile tab + personal streak | Profile header, stats (decks/cards mastered/streak), personal streak tracking (local), daily goal progress | fullstack |

### Epic 7: AI Backend & Proxy (3 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S17 | Server proxy infrastructure | Pick host (Supabase Edge Functions / Fly.io / Railway), deploy minimal proxy server, App Store receipt validation | backend |
| S18 | Multi-provider integrations | Endpoints for OpenAI, Anthropic, Google, xAI, DeepSeek. Streaming responses. Server-side key storage. | backend |
| S19 | Token cost calculation | Server-side tokenizer, cost estimation formula, token ledger (purchases + spends), receipt-verified token grants | backend |

### Epic 8: AI Chat UI (3 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S20 | AI Chat tab + conversation UI | Chat list, message bubbles, model picker, response length picker, token cost preview | frontend |
| S21 | Token shop IAP | StoreKit 2 setup, token packs (small/medium/large), balance display, "Buy more" flow | fullstack |
| S22 | Deck-grounded RAG mode | Deck multi-select picker, mode toggle (Internet vs Deck), client-side context building, server-side prompt assembly | fullstack |

### Epic 9: v1.0 App Store Launch (2 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S23 | App Store assets | App icons (all sizes for iOS/iPadOS/macOS), screenshots per platform, App Store description + keywords, privacy disclosures | infrastructure |
| S24 | TestFlight beta + submission | Crashlytics/Sentry setup, TestFlight build, beta feedback loop, App Store review submission | infrastructure |

**v1.0 total: 9 epics, 24 sprints.**

---

## v2.0 — Online Tier

### Epic 10: Online Auth & Sync (3 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S25 | Sign in with Apple + email/password | Auth UI, Supabase Auth integration, account row creation, sign-out flow | fullstack |
| S26 | Supabase schema & sync engine | Schema tables (users, decks, cards, notes, etc.), upload/download sync, last-write-wins resolution, first-sign-in merge prompt | fullstack |
| S27 | Subscription IAP + tier gating | StoreKit 2 subscription product, restore purchases, server-side entitlement verification, tier-locked UI states | fullstack |

### Epic 11: Online Social (4 sprints)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S28 | Username + friend requests | Username creation + uniqueness, search by username, invite link generation, request/accept/decline flow | fullstack |
| S29 | Messages tab + deck share/request | Messages inbox UI, deck share message (with preview), deck request message (with accept-and-send) | fullstack |
| S30 | Likes + friend streaks | Like button on deck rows, server-side like count, friend streak computation (per-pair both-studied tracking) | fullstack |
| S31 | Token gifting | Gift action from a friend's profile, balance debit/credit, gift message in recipient's Messages tab | fullstack |

### Epic 12: v2.0 Launch (1 sprint)

| Sprint | Title | Goal | Type |
|--------|-------|------|------|
| S32 | v2.0 App Store submission | Updated screenshots showing Online features, new subscription IAP product, App Store re-review | infrastructure |

**v2.0 total: 3 epics, 8 sprints.**

---

## Total: 12 epics, 32 sprints across v1.0 + v2.0.

---

## Dependency notes

- **S1 (project scaffolding)** must be first. Everything depends on it.
- **S2 (theme)** must come before any UI sprint.
- **S2.5 (nav shell)** must come before any tab-content sprint.
- **S3 (data models)** must come before any deck/card UI sprint.
- **S5–S6 (decks UI + CRUD)** can ship before flashcard editor (S7) — Decks tab works even if you can only see cards, not edit them.
- **S17 (server proxy)** must come before any AI UI sprint (S20+).
- **S21 (token IAP)** depends on the Apple Developer account being acquired.
- **S23/S24 (launch)** depend on Apple Developer account + tested IAPs.
- **S25 (auth)** must come before any other v2.0 sprint.
- **S26 (sync engine)** is the most complex sprint in v2.0 — budget extra time.

## Open decisions blocking specific sprints

| Sprint | Blocker | Required decision |
|--------|---------|-------------------|
| S15 | Font list | Which fonts do you want users to choose from? |
| S17 | Backend hosting | Supabase Edge Functions vs Fly.io vs Railway vs other |
| S19 | Token pack prices | Confirm or override the $0.99 / $4.99 / $9.99 structure |
| S20 | Default model | Which model is the default for new conversations? |
| S21 | Apple Dev account | Need account before IAP testing |
| S26 | Sync conflict policy | Confirm "last-write-wins" or pick stricter |
| S27 | Subscription price | Confirm $2.99/mo or override |
| ~~S28~~ | ~~Friend discovery~~ | ✅ Decided 2026-05-11: username + invite link only |
| ~~S29~~ | ~~Free-text messaging~~ | ✅ Decided 2026-05-11: no, strictly transactional Messages tab |
| S30 | Streak definition | "10 cards reviewed" or different threshold? |
| S31 | Gift cap | Cap on daily token gifting outbound? |

## Sprint type quick reference

These map to Maestro's `type:` field in sprint frontmatter:

- **infrastructure** (60% coverage): scaffolding, CI, App Store assets
- **backend** (85% coverage): data models, storage, server proxy
- **frontend** (70% coverage): SwiftUI views
- **fullstack** (75% coverage): features touching both
