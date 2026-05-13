# Solution Spec — Notari

This document specifies the full feature set and key technical decisions. It's the source of truth for what Notari does. Open decisions are marked `❓ TBD`.

## Tiering model

| Feature | Free (after $5 purchase) | Online (monthly subscription) |
|---------|--------------------------|-------------------------------|
| Unlimited decks, flashcards, notepads | ✅ | ✅ |
| Image attachments on flashcards | ✅ | ✅ |
| Voice-to-text in notepads | ✅ | ✅ |
| All customization (theme, accent, fonts, flip speed, card shape, etc.) | ✅ | ✅ |
| AI chatbot (internet + deck-grounded modes) | ✅ (token-gated) | ✅ (token-gated) |
| Local-only storage | ✅ | ✅ + cloud sync |
| Sign in / cloud account | — | ✅ |
| Study buddies / friend requests | — | ✅ |
| Share / request decks via messages | — | ✅ |
| Likes on decks | — | ✅ |
| Friend study streaks | — | ✅ |
| Gift Study Tokens to friends | — | ✅ |
| Backup/restore across devices | — | ✅ (via Supabase) |

## Data model

### Local storage layout

```
{ApplicationSupport}/Notari/
├── decks/
│   ├── {deck_uuid}.json         # Deck metadata + array of flashcards
│   └── {deck_uuid}_notes.json   # All notepads for cards in this deck (keyed by card_uuid)
├── images/
│   ├── {flashcard_uuid}.jpg     # Auto-renamed on import
│   └── {flashcard_uuid}.png
└── settings.json                 # User preferences (theme, customization, etc.)
```

### Deck schema (per `.json`)

```json
{
  "id": "uuid",
  "name": "Spanish — A2 vocab",
  "emoji": "🇪🇸",
  "created_at": "2026-05-11T12:00:00Z",
  "updated_at": "2026-05-11T12:00:00Z",
  "cards": [
    {
      "id": "card_uuid",
      "front": "Ephemeral",
      "back": "Lasting for a very short time; fleeting.",
      "image_filename": "card_uuid.jpg",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### Notepad schema (per `{deck}_notes.json`)

```json
{
  "deck_id": "uuid",
  "notes": {
    "card_uuid_1": {
      "title": "Etymology",
      "body_html": "<p>From Greek <i>ephemeros</i>...</p>",
      "updated_at": "..."
    }
  }
}
```

### Cloud (Supabase) schema — Online tier only

When a user is on the Online tier, the local files are mirrored to Supabase:

| Table | Key columns |
|-------|-------------|
| `users` | id, apple_id, email, display_name, created_at |
| `decks` | id, owner_id, name, emoji, updated_at |
| `cards` | id, deck_id, front, back, image_url, position |
| `notes` | card_id, title, body_html, updated_at |
| `friendships` | user_id, friend_id, status (pending/accepted), created_at |
| `messages` | id, from_user, to_user, kind (text/deck_share/deck_request/token_gift), payload_json |
| `deck_likes` | deck_id, user_id |
| `streaks` | user_id, current_streak, longest_streak, last_studied_date |
| `friend_streaks` | user_a, user_b, current_streak, last_both_studied |
| `token_balance` | user_id, balance |
| `token_transactions` | id, user_id, delta, reason (purchase/spend/gift), created_at |

Images are stored in Supabase Storage with paths like `users/{user_id}/cards/{card_id}.jpg`.

## Sync model (Free → Online upgrade)

❓ **TBD — Sync behavior on upgrade**

When a user upgrades from Free to Online, we have three options:

1. **Auto-merge** — push all local decks to Supabase as-is. Simplest. (Recommended default.)
2. **Prompt selection** — user picks which decks to sync. More control, more friction.
3. **Re-clean import** — wipe Supabase, push local as fresh. Useful if user is re-subscribing.

Recommendation: **Auto-merge with a one-time "Sync your decks?" prompt at first sign-in.** Decks created locally before sign-in get their `owner_id` set to the new user account.

After initial sync, every local edit also goes to Supabase. We use a simple "last-write-wins" strategy keyed on `updated_at` for v1 — proper conflict resolution can come later if multi-device editing becomes problematic.

## AI chatbot

### Modes

1. **Internet mode** — full open-internet answers from the chosen LLM. Treats the deck as optional context but doesn't constrain itself.
2. **Deck-grounded mode (RAG)** — answers only from the selected deck(s). Refuses to answer if the decks don't contain the answer ("Based on your selected decks, I don't have information about X").

### Multi-deck context

User can select 1+ decks via a deck picker. The selected decks' flashcards (and optionally notepad contents) form the context for that conversation.

### Supported models

| Provider | Models exposed in v1 |
|----------|----------------------|
| OpenAI | `gpt-4o`, `gpt-4o-mini` |
| Anthropic | `claude-sonnet-4-6`, `claude-haiku-4-5` |
| Google | `gemini-2.5-pro`, `gemini-2.5-flash` |
| xAI | `grok-4` |
| DeepSeek | `deepseek-v3.5` |

❓ **TBD — Default model picks**
- For free users, what's the default? Probably a cheap model (e.g., `claude-haiku-4-5` or `gpt-4o-mini`) since they're more cost-sensitive.
- For online-tier users, any default? Or always remember last choice?

### Token pricing model (the "best way" you asked for)

Internal "Study Tokens" map to backend USD cost with a markup. The cost of a message is calculated **before sending** and shown to the user.

```
StudyTokenCost = ceil(
  ((input_tokens × input_rate) + (estimated_output_tokens × output_rate))
  × model_multiplier
  × markup
)
```

Where:
- `input_tokens` — counted with the provider's tokenizer before sending.
- `estimated_output_tokens` — set by a "Response length" selector the user picks: **Short (250 tok)**, **Medium (700 tok)**, **Long (1500 tok)**.
- `input_rate`, `output_rate` — per-1k-token USD rates from the provider's pricing page (stored server-side, updated as providers change pricing).
- `model_multiplier` — premium for higher-tier models (e.g., Opus = 2.0×, Sonnet = 1.0×, Haiku = 0.5×).
- `markup` — our margin. Recommended: **3.0×** (covers proxy infra, IAP fees, gross margin).
- Final cost is rounded up to the nearest whole token.

The UI shows: "~3 tokens for this message" (or whatever the estimate is) before send. After response, actual usage is reconciled from the API response — if actual > estimate, we debit the difference; if less, we don't refund (simpler accounting).

**Sanity check:** A typical "Short" answer to a 200-token question on Sonnet should cost ~1–2 tokens. A "Long" answer on Opus to a 1000-token deck-grounded prompt should cost ~10–15 tokens. Token packs (~50, ~300, ~700) buy roughly 25–500 messages depending on usage patterns.

### Server proxy responsibilities

A small backend (Node.js or Python — `❓ TBD`) hosted on `❓ TBD` (Fly.io? Railway? Supabase Edge Functions?) handles:

1. Validates the Apple receipt / user session.
2. Checks the user's token balance.
3. Counts input tokens, computes cost estimate, returns it to the client for pre-send confirmation.
4. On user confirm, forwards request to the selected provider with our API key.
5. Streams response back to client.
6. Debits actual tokens used.
7. Logs request metadata for analytics (not contents).

❓ **TBD — Backend hosting choice**
- Supabase Edge Functions (cheapest, but limited runtime) vs Fly.io / Railway (more flexible, costs more)?

## Friend / social model

### Discovery

**Decision (locked 2026-05-11):** **Username search + shareable invite link only.** No Contacts permission. No email lookup. Keeps the privacy story clean and avoids Contacts permission friction at signup.

### Friend request flow

1. User A searches for User B's username → sends request.
2. User B sees a notification + a row in Messages tab → accepts or declines.
3. Once accepted, both can share/request decks, gift tokens, build friend streaks.

### Messages tab

The Messages tab is a unified inbox for:
- Friend requests (pending acceptance).
- Deck share messages ("Alice shared 'Spanish A2' with you" → tap to import).
- Deck request messages ("Bob is asking to see 'Anatomy'").
- Token gifts ("Alice gifted you 50 Study Tokens 🎁").

**Decision (locked 2026-05-11):** **No free-text messaging in v1.** Messages tab is strictly transactional (friend requests, deck shares, deck requests, token gifts only). Simpler to ship, no content moderation surface area. Free-text could be added in v2.1+ if user demand justifies the moderation complexity.

### Streaks

Two streak types:

1. **Personal streak** — "You studied N days in a row." Resets if user misses a day.
2. **Friend streak** — "You and Alice both studied N days in a row." Tracks per-pair. Tracks days when both users had at least 1 study session.

❓ **TBD — Streak definition**
- What counts as a "study session"? Options:
  - (a) Opening the app — too easy.
  - (b) Reviewing at least 1 flashcard — minimal.
  - (c) Reviewing at least 10 flashcards — meaningful.
  - (d) Reviewing for at least 5 minutes — time-based.
- Recommendation: **(c) at least 10 flashcards reviewed**.

### Token gifting

User A sends N tokens to user B → A's balance debited immediately, B's balance credited. Shows in B's Messages tab as a gift item.

Anti-abuse: cap at 100 tokens/day gifting outbound per user to prevent token-laundering. ❓ TBD if cap needs.

## Customization

User-tunable settings:

| Setting | Range / options |
|---------|-----------------|
| Appearance | Light / Dark / Auto |
| Accent color | 13 swatches (see `_design_reference/project/theme-screens.jsx`) |
| App font | ❓ TBD list — at minimum: System (SF), Instrument Serif, IBM Plex Sans, Helvetica, Georgia |
| Flashcard flip speed | 150–2000 ms slider |
| Flashcard size | 0.5×–1.6× slider |
| Flashcard shape | Horizontal rectangle / Vertical rectangle / Square |
| Both sides visible at once | On / Off (when on, flip is replaced by both faces shown side by side or stacked) |
| Flashcard color palette | 6 curated palettes (paper/graphite/terracotta/sage/cobalt/plum) — same as design |
| Notepad paper color | 4 options (white/cream/eggshell/charcoal) |
| Notepad line color | 6 options (blue/pink/sage/amber/lavender/gray) |
| Notepad open animation | Pop / Rise / Fade / Flip |
| Notepad icon size | 8–64 px slider |
| Notepad icon corner | TL / TR / BL / BR |
| Daily streak goal | 5 / 10 / 20 / 50 cards |
| Notifications | On / Off |
| Haptics | On / Off |

## Voice-to-text

Apple Speech framework (`SFSpeechRecognizer`). Available in notepad editing mode via a mic button. Requires `NSSpeechRecognitionUsageDescription` in `Info.plist`. Available offline on devices with on-device speech recognition (iPhone XS+, M-series Macs).

## Deletion

All destructive actions require a confirmation step:

| Action | Confirmation prompt |
|--------|---------------------|
| Delete flashcard | "Delete this flashcard? Its notepad will also be deleted. This can't be undone." → Cancel / Delete |
| Delete deck | "Delete '{name}'? All N flashcards and their notepads will be deleted. This can't be undone." → Cancel / Delete |
| Sign out (Online tier) | "Sign out? Your local decks will remain on this device. Cloud sync will pause." → Cancel / Sign out |
| Cancel subscription | Handled by Apple — we don't show our own prompt |

## Out of scope for v1

- Spaced-repetition scheduling (SM-2 / Anki-style) — review queues are simple "due today" / "all cards" lists.
- Real-time co-study sessions or live multiplayer.
- Public deck marketplace.
- Web app version.
- Android.
- Image OCR (extracting flashcards from photos of textbooks).
- AI flashcard *generation* from notes (could be a v2 feature using existing tokens).

## Apple Developer / App Store

❓ **TBD until user obtains Apple Developer account.**

- Bundle ID: e.g., `com.{your_org}.notari` (decide once dev account exists).
- Capabilities: Sign in with Apple, Push Notifications (for friend activity), Speech Recognition, App Groups (if we share data between iOS app and a future widget/extension).
- IAP product IDs: TBD when account exists.
