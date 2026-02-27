# simple-todo

A single-todo app that holds exactly one todo at a time — create, complete, delete, persist via localStorage.

## Design System — Midnight Orchid

| Artifact | Path | Description |
|---|---|---|
| Approved Direction | `docs/design/approved-direction.md` | Selected direction + source prompt |
| Design Spec | `docs/design/design-spec.md` | Hex palette, type scale, spacing, component list |
| Tailwind Config | `design-system/tailwind.config.ts` | Full custom theme from spec tokens |
| Global CSS | `design-system/globals.css` | CSS vars, font imports, base reset, utilities |
| Button | `design-system/components/ui/Button.html` | All states: hover, focus, active, disabled |
| Card | `design-system/components/ui/Card.html` | Frosted glass card with animated border + glow |
| Primary Screen | `screens/index.html` | Pixel-intent mockup match — fully functional |

### Quick Start

Open `screens/index.html` in any browser. No build step required.

### Architecture

See `docs/architecture/00-system-overview.md` — single HTML file, vanilla JS, localStorage persistence.
