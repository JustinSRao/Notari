# Flipcard Component

_Started 2026-05-07 20:44 UTC_

---

## User

Create me a flashcard for a study app that flips when the user clicks on it with their mouse, or when the user clicks the space bar on their laptop. The flashcard should have a flipping animation, as if the card is actually flipping

## Assistant

_[tool: list_files]_

_[tool: view_image]_

_[tool: write_file]_

I'll build a polished flashcard for a study app with a real 3D flip animation. Let me declare the design direction first:

**Direction:** Warm paper-cream background, deep ink for typography, single muted terracotta accent. Display type in Instrument Serif (for the term/definition — gives it that classic study/textbook feel), IBM Plex Sans for UI. Real perspective-based 3D flip on the Y-axis, with a subtle card lift on hover, deck context (counter, progress, knew-it/review-again rating after flip), and gentle paper texture on the card.

_[tool: done]_

_[tool: fork_verifier_agent]_

Built a flashcard for **Marginalia**, a study app — warm paper-cream surface with a real 3D Y-axis flip.

**Interactions**
- **Click** the card or press **Space** to flip (720ms perspective flip, both flip directions).
- After flipping to the answer, a rating row reveals (Again / Hard / Good / Easy) — keys **1–4** also rate.
- **→** advances to the next card with a slide-in transition.
- Hover lifts the card; mousedown gives a tactile press.

**Design notes**
- Instrument Serif for term + definition, IBM Plex Sans/Mono for UI — distinct from typical study-app type.
- Faux card stack behind the active card hints at the deck.
- Subtle paper grain (SVG noise) and warm radial tints on the page background.
- Deck progress bar, card counter, and a keyboard hint strip at the bottom.

Sample content is original GRE-style vocabulary (Ephemeral, Sycophant, Quotidian, Perfidious, Ineffable) so you can cycle through several cards with →.

## User

Can you remove everything on the Flashcard.html page except for the flashcard itself, but can you make it so I can choose what the flashcard says, speed of flip, size of it, and colour of it

## Assistant

_[tool: snip]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: write_file]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

The page is now just the flashcard, with a Tweaks panel for:

- **Content** — Front and Back text inputs
- **Motion** — Flip speed slider (150–2000 ms)
- **Size** — Scale slider (0.5×–1.6×) — resizes the card and its text together
- **Color** — Six curated palettes (paper, graphite, terracotta, sage, cobalt, plum) — each sets front, back, and ink color

Click the card or hit **Space** to flip. Toggle the Tweaks button in the toolbar to open the panel.

