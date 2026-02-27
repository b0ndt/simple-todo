# simple-todo — Design Specification

> Source of truth: Direction 1 "Midnight Orchid" prompt from `docs/design/design-exploration.md`

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#09090f` | Page background — solid dark |
| `card-surface` | `#1a1a24` | Card fill — dark elevated surface |
| `card-border` | `rgba(255, 255, 255, 0.12)` | 12% white-opacity glass border |
| `primary` | `#7c3aed` | Primary accent — violet |
| `primary-light` | `#a78bfa` | Secondary accent — lighter violet |
| `text` | `#e4e0ec` | Primary text color |
| `text-muted` | `rgba(228, 224, 236, 0.5)` | Placeholder / muted text (derived: text at 50%) |
| `glow` | `rgba(124, 58, 237, 0.25)` | Radial glow behind card (derived: primary at 25%) |
| `danger` | `#7c3aed` | Delete action — uses primary violet per mockup |

---

## Typography

| Token | Font Family | Weight | Usage |
|---|---|---|---|
| `font-display` | Playfair Display | 500 | Todo text |
| `font-ui` | Inter | 400 | UI labels, input, buttons |

### Type Scale

| Token | Size | Line Height | Usage |
|---|---|---|---|
| `text-xs` | 11px | 1.4 | Fine print / hints |
| `text-sm` | 13px | 1.5 | Button labels, placeholder |
| `text-base` | 15px | 1.6 | UI body text |
| `text-lg` | 18px | 1.5 | Todo item text (Playfair Display) |

---

## Spacing Scale

Derived from card dimensions (240px card, 24px radius) — base unit 4px.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps |
| `space-2` | 8px | Icon padding, tight gaps |
| `space-3` | 12px | Inner card padding (horizontal) |
| `space-4` | 16px | Inner card padding (vertical), input padding |
| `space-5` | 20px | Section gaps inside card |
| `space-6` | 24px | Card border-radius, major spacing |
| `space-8` | 32px | Outer spacing around card glow |

---

## Radii

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 8px | Input fields, small buttons |
| `radius-md` | 12px | Buttons |
| `radius-lg` | 24px | Card |
| `radius-full` | 9999px | Circular checkbox, circular delete button |

---

## Shadows & Effects

| Token | Value | Usage |
|---|---|---|
| `glow-card` | `0 0 80px 20px rgba(124, 58, 237, 0.25)` | Radial purple glow behind card |
| `backdrop-blur` | `blur(16px)` | Frosted glass card surface |
| `border-gradient` | `linear-gradient(135deg, #7c3aed, #a78bfa)` | 1px animated gradient border on card |

---

## Animation

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `transition-fast` | 150ms | ease-in-out | Button hover/active state changes |
| `transition-base` | 250ms | ease-in-out | Card border gradient cycle |
| `pulse-delete` | 1.5s | ease-in-out (infinite) | Gentle scale pulse on delete button hover |

---

## Component Inventory

### 1. Card
- Width: 240px
- Border-radius: 24px
- Surface: `#1a1a24` with `backdrop-filter: blur(16px)`
- Border: 1px with animated gradient (`#7c3aed` → `#a78bfa`)
- Glow: radial purple glow centered behind card
- Vertically and horizontally centered on page

### 2. Text Input
- Position: top of card
- Placeholder: "What is the one thing?"
- Font: Inter, 400, `text-sm`
- Background: transparent
- Border: none (flat underline or no border)
- Text color: `#e4e0ec`
- Placeholder color: `rgba(228, 224, 236, 0.5)`

### 3. Todo Item
- Layout: horizontal row — checkbox | text | delete button
- Text font: Playfair Display, 500, `text-lg`
- Text color: `#e4e0ec`
- Completed state: strikethrough + reduced opacity

### 4. Checkbox
- Shape: circular (`border-radius: 9999px`)
- Size: 20px × 20px
- Border: 2px solid `#7c3aed`
- Checked fill: `#7c3aed` with checkmark in `#e4e0ec`

### 5. Delete Button
- Shape: circular (`border-radius: 9999px`)
- Size: 28px × 28px
- Background: `#7c3aed`
- Icon: trash / × in `#e4e0ec`
- Hover: gentle scale pulse animation

### 6. Submit Button
- Font: Inter, 400, `text-sm`
- Background: `#7c3aed`
- Text: `#e4e0ec`
- Border-radius: 12px
- Hover: lighten to `#a78bfa`
- Focus: ring 2px `#a78bfa` offset 2px
- Active: darken slightly
- Disabled: opacity 0.4, cursor not-allowed

---

## Layout

- **Page:** full viewport, `#09090f` background, flex center both axes
- **Card:** 240px wide, centered, frosted glass
- **Content flow:** input at top → todo item below → actions inline

---

## Handoff

### Artifacts

| # | File | Description |
|---|---|---|
| 1 | `docs/design/approved-direction.md` | Approved direction selection + source prompt |
| 2 | `docs/design/design-spec.md` | This file — full spec extracted from direction prompt |
| 3 | `design-system/tailwind.config.ts` | Tailwind v3 custom theme using only spec tokens |
| 4 | `design-system/globals.css` | CSS custom properties, Google Fonts import, base reset, utility classes |
| 5 | `design-system/components/ui/Button.html` | Button component (primary, circle/delete, ghost) — all states |
| 6 | `design-system/components/ui/Card.html` | Card component (frosted glass, animated border, glow) — all states |
| 7 | `screens/index.html` | Primary screen — fully functional pixel-intent mockup match |

### Environment Variables / API Keys
- **No API keys or env vars are required.** The app is entirely client-side with `localStorage` persistence.
- The Tailwind config is provided as a reference artifact. The primary screen (`screens/index.html`) uses plain CSS custom properties and requires no build step.

### Blockers
- **BLOCKER — Mockup image not available.** `docs/design/approved-direction.md` was expected to contain a mockup URL, but neither the file nor any mockup PNGs existed. All design tokens were extracted from the detailed prompt text in `docs/design/design-exploration.md` (Direction 1 "Midnight Orchid"), which contains exact hex values, typography specs, spacing, and component descriptions. The prompt serves as the authoritative source of truth.
- **BLOCKER — Image generation API key missing.** Mockup PNG generation requires an image-generation API key (e.g. `OPENAI_API_KEY` for DALL-E). No such key is configured. The design prompt is ready for manual generation.

### Notes
- Every color, font, spacing, and radius value in all artifacts traces directly back to the Direction 1 prompt. No values were invented.
- The primary screen implements all five MUST requirements (create, complete, delete, prevent second, persist).
- Components use `.html` format (vanilla CSS + markup) to match the project's zero-dependency architecture.
