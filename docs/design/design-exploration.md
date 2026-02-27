# simple-todo — Design Exploration

## CONTEXT

**App:** A single-todo app that holds exactly one todo at a time — create, complete, delete, persist via localStorage, all in one vanilla-JS HTML file.

**Anti-patterns:**
- Overdesigned dashboards or multi-panel layouts — this is one todo, not a project manager.
- Tiny click targets or ambiguous icons — every action (create, complete, delete) must be instantly obvious.
- Heavy animation that masks the simplicity — transitions should feel snappy, not theatrical.
- Framework-aesthetic boilerplate (Material cards, Bootstrap grids) — the design should have a point of view, not look like a template.

---

## direction-1

**name:** "Midnight Orchid"

**philosophy:** "One thought, floating in the void — luxury through emptiness and a single, glowing accent."

**prompt:** "high-fidelity UI screenshot of a minimalist single-todo app, vertically and horizontally centered layout with a single frosted-glass card (240px wide, rounded 24px corners) floating on a solid dark background, one text input at the top of the card with a soft placeholder 'What is the one thing?', one todo item below showing 'Buy fresh sourdough' with a circular checkbox on the left and a small trash icon on the right, #09090f background #7c3aed primary accent #a78bfa secondary accent #1a1a24 card surface with 12% white-opacity glass border #e4e0ec text, typography: Playfair Display for the todo text at 500 weight and Inter for UI labels at 400 weight, surface: frosted glass card with subtle backdrop-blur over a faint radial purple glow centered behind the card, unique elements: a thin 1px animated gradient border on the card cycling between #7c3aed and #a78bfa and a perfectly circular violet delete button that pulses gently on hover. Photorealistic, actual content, no lorem ipsum, 16:9."

**size:** "16:9"

**output:** "docs/design/mockups/direction-1.png"

---

## direction-2

**name:** "Sun-Bleached Studio"

**philosophy:** "Warm paper, bold ink, one rubber stamp — productivity that feels handmade and tactile."

**prompt:** "high-fidelity UI screenshot of a minimalist single-todo app, left-aligned layout with content pinned to the upper-left quadrant leaving generous right and bottom whitespace, a full-width warm cream header strip (64px tall) with the app title 'simple todo' in lowercase bold lettering, below it a single todo row spanning 60% viewport width showing 'Buy fresh sourdough' with a hand-drawn-style circular checkbox on the left and a terracotta delete 'x' on the right, input field at the bottom styled as a flat underline with no box, #faf7f2 page background #e05d36 terracotta accent #2c2c2c text #f3ece3 header strip #d4c9b8 divider lines, typography: DM Sans at 700 weight for the title and 400 weight for body text with generous 1.6 line-height, surface: matte paper texture with no shadows no gloss no gradients, unique elements: a red rubber-stamp 'DONE' overlay rotated -12 degrees that appears over completed todos and a subtle dot-grid pattern (spacing 24px dots in #e8e0d4) on the page background. Photorealistic, actual content, no lorem ipsum, 16:9."

**size:** "16:9"

**output:** "docs/design/mockups/direction-2.png"

---

## Handoff

### Artifacts
- `docs/design/design-exploration.md` — this file
- `docs/design/mockups/direction-1.png` — to be generated from direction-1 prompt
- `docs/design/mockups/direction-2.png` — to be generated from direction-2 prompt

### Environment Variables / API Keys
- Architecture docs confirm: **no API keys or env vars are required.** The app is entirely client-side with `localStorage` persistence.
- Image generation from the prompts above requires an external image-generation service (e.g. DALL-E, Midjourney). No such API key is currently configured in the project.
- **BLOCKER:** No image-generation API key is available in the environment. Mockup PNGs cannot be auto-generated until a key (e.g. `OPENAI_API_KEY` for DALL-E) is provided. The prompts above are ready to paste into any image-generation tool manually or via API once a key is configured.

### Blockers
- **BLOCKER — Image generation API key missing.** Mockup images (`direction-1.png`, `direction-2.png`) must be generated manually or by adding an image-generation API key to the environment. The text prompts are complete and self-contained.
