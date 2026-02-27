# simple-todo

Single-todo app (exactly one todo at a time) built in vanilla JS with:

- routing
- state management
- async data fetch bootstrap
- localStorage persistence
- error/fallback handling
- design-system token usage

## Project Structure

| Path | Purpose |
|---|---|
| `screens/index.html` | UI screen base (no redesign) |
| `screens/app.css` | Screen-level styles using theme tokens |
| `screens/app.js` | Routing, state, data fetching, persistence, error handling |
| `design-system/globals.css` | Design tokens and shared base styles |
| `design-system/components/ui/button.css` | Button primitive styles |
| `design-system/components/ui/card.css` | Card primitive styles |
| `public/logo.svg` | App logo |
| `public/favicon.svg` | Favicon |
| `public/og-image.svg` | Open Graph social image |
| `public/data/todo.json` | Mock seed data source for initial async fetch |
| `vercel.json` | SPA rewrite config for deployment |

## Requirements Coverage

- Create one todo
- Toggle complete/incomplete
- Delete todo
- Prevent second todo creation while one exists
- Persist todo across reloads

## Routing

Routes are canonical and derived from state:

- `/` -> empty state
- `/todo/active` -> todo exists, incomplete
- `/todo/completed` -> todo exists, complete
- `/error` -> fatal app error state

Unknown/mismatched routes are redirected to the canonical route with a user notice.

## Data Flow

1. Read todo from `localStorage` key: `simple-todo`
2. If not found, fetch seed payload from `public/data/todo.json`
3. If fetch fails, gracefully fall back to empty local state
4. Persist all mutations back to `localStorage`

## Error Handling + Component States

Handled states:

- loading (bootstrapping)
- empty
- active todo
- completed todo
- blocked second-create attempt
- recoverable storage/fetch warnings
- fatal error route

UI controls expose disabled, hover, focus, and active states via design-system components.

## Assets

The app uses `public/` assets directly:

- Logo rendered in-card
- Favicon in `<head>`
- OG image metadata (`og:image` + `twitter:image`)

## Environment Variables / API Keys

From `docs/architecture/00-system-overview.md`: **no API keys or env vars are required**.

- No required key is missing.
- Mock/fallback implemented for seed data fetch (`public/data/todo.json` -> empty state on failure).

## Handoff

- BLOCKER: None for runtime implementation scope.

## Local Run

No build step required.

- Serve the repository root with any static server and open `/`

## Vercel Deployment

`vercel.json` rewrites all routes to `screens/index.html`:

```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/((?!public/|design-system/|screens/).*)",
      "destination": "/screens/index.html"
    }
  ]
}
```
