# simple-todo — Requirements

> A todo app that holds exactly one todo at a time.

---

## MUST-1: Create a todo

**Given** no todo currently exists
**When** the user enters text and submits it
**Then** a single todo is created and displayed with the entered text

---

## MUST-2: Mark the todo as complete

**Given** an active (incomplete) todo exists
**When** the user marks it as complete
**Then** the todo is visually indicated as complete and no longer active

---

## MUST-3: Delete the todo

**Given** a todo exists (active or complete)
**When** the user deletes it
**Then** the todo is removed and the app returns to the empty state

---

## MUST-4: Prevent creating a second todo

**Given** a todo already exists (active or complete)
**When** the user attempts to create a new todo
**Then** the creation is blocked and the user is informed that the existing todo must be deleted first

---

## MUST-5: Persist the todo across page reloads

**Given** a todo exists
**When** the user reloads the page
**Then** the same todo (with its completion state) is displayed

---

## Handoff

### Artifacts
- `docs/requirements/01-requirements.md` — this file

### Open Questions
- None at this scope.

### Environment Variables / API Keys
- No external API keys or env vars are required. Persistence uses browser `localStorage`; no backend or database needed.

### Blockers
- None.
