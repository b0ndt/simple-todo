const STORAGE_KEY = "simple-todo";
const DATA_SOURCE = "/public/data/todo.json";

const ROUTES = Object.freeze({
  EMPTY: "/",
  ACTIVE: "/todo/active",
  COMPLETED: "/todo/completed",
  ERROR: "/error",
});

const APP_STATUS = Object.freeze({
  LOADING: "loading",
  READY: "ready",
  ERROR: "error",
});

const state = {
  status: APP_STATUS.LOADING,
  todo: null,
  notice: null,
  route: ROUTES.EMPTY,
};

const elements = {
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  addBtn: document.getElementById("add-btn"),
  divider: document.getElementById("divider"),
  todoItem: document.getElementById("todo-item"),
  todoText: document.getElementById("todo-text"),
  checkbox: document.getElementById("checkbox"),
  deleteBtn: document.getElementById("delete-btn"),
  emptyHint: document.getElementById("empty-hint"),
  statusNote: document.getElementById("status-note"),
  routeChip: document.getElementById("route-chip"),
};

function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed.length ? trimmed : ROUTES.EMPTY;
}

function getCurrentPath() {
  return normalizePath(window.location.pathname);
}

function isKnownRoute(path) {
  return Object.values(ROUTES).includes(path);
}

function normalizeTodo(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const text = typeof value.text === "string" ? value.text.trim() : "";
  const completed = Boolean(value.completed);

  if (!text) {
    return null;
  }

  return { text, completed };
}

function readStoredTodo() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { todo: null, warning: null };
    }

    const parsed = JSON.parse(raw);
    const todo = normalizeTodo(parsed);

    if (!todo) {
      window.localStorage.removeItem(STORAGE_KEY);
      return {
        todo: null,
        warning: "Stored todo was invalid and has been cleared.",
      };
    }

    return { todo, warning: null };
  } catch (error) {
    return {
      todo: null,
      warning: "Could not read local data. Running with temporary state.",
    };
  }
}

function persistTodo(todo) {
  try {
    if (todo) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todo));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    return true;
  } catch (error) {
    setNotice(
      "error",
      "Could not persist todo to localStorage. Changes are in-memory only.",
    );
    return false;
  }
}

async function fetchSeedTodo() {
  const response = await window.fetch(DATA_SOURCE, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Seed fetch failed (${response.status})`);
  }

  const payload = await response.json();
  return normalizeTodo(payload?.todo ?? null);
}

function setNotice(type, message) {
  state.notice = message ? { type, message } : null;
}

function clearNotice() {
  state.notice = null;
}

function getCanonicalRoute() {
  if (state.status === APP_STATUS.ERROR) {
    return ROUTES.ERROR;
  }

  if (!state.todo) {
    return ROUTES.EMPTY;
  }

  return state.todo.completed ? ROUTES.COMPLETED : ROUTES.ACTIVE;
}

function syncRoute({ replace = false } = {}) {
  const currentPath = getCurrentPath();

  if (!isKnownRoute(currentPath)) {
    setNotice("error", "Unknown route requested. Redirected to current state.");
  }

  const nextPath = getCanonicalRoute();
  const method = replace ? "replaceState" : "pushState";

  if (currentPath !== nextPath) {
    window.history[method]({}, "", nextPath);
  }

  state.route = nextPath;
}

function setFatalError(message) {
  state.status = APP_STATUS.ERROR;
  setNotice("error", message);
  syncRoute({ replace: true });
  render();
}

function updateAddButtonState() {
  const hasInput = elements.input.value.trim().length > 0;
  const isInteractive = state.status === APP_STATUS.READY && !state.todo;
  elements.addBtn.disabled = !(hasInput && isInteractive);
}

function render() {
  const hasTodo = Boolean(state.todo);
  const isLoading = state.status === APP_STATUS.LOADING;
  const isError = state.status === APP_STATUS.ERROR;

  elements.form.classList.toggle("is-hidden", hasTodo || isError);
  elements.divider.classList.toggle("is-hidden", !hasTodo);
  elements.todoItem.classList.toggle("is-hidden", !hasTodo);
  elements.emptyHint.classList.toggle("is-hidden", hasTodo || isError);

  elements.input.disabled = isLoading || hasTodo || isError;
  elements.checkbox.disabled = isLoading || !hasTodo || isError;
  elements.deleteBtn.disabled = isLoading || !hasTodo || isError;

  if (hasTodo) {
    elements.todoText.textContent = state.todo.text;
    elements.todoText.classList.toggle("completed", state.todo.completed);
    elements.checkbox.classList.toggle("checked", state.todo.completed);
    elements.checkbox.setAttribute(
      "aria-label",
      state.todo.completed ? "Mark as active" : "Mark as complete",
    );
  } else {
    elements.todoText.textContent = "";
    elements.todoText.classList.remove("completed");
    elements.checkbox.classList.remove("checked");
    elements.checkbox.setAttribute("aria-label", "Mark as complete");
  }

  if (isLoading) {
    elements.statusNote.textContent = "Loading todo data...";
    elements.statusNote.className = "status-note status-note--info";
  } else if (state.notice) {
    elements.statusNote.textContent = state.notice.message;
    elements.statusNote.className =
      state.notice.type === "error"
        ? "status-note status-note--error"
        : "status-note status-note--info";
  } else if (hasTodo) {
    elements.statusNote.textContent =
      "Delete the current todo before adding another one.";
    elements.statusNote.className = "status-note status-note--info";
  } else {
    elements.statusNote.textContent = "";
    elements.statusNote.className = "status-note";
  }

  elements.routeChip.textContent = state.route;
  updateAddButtonState();
}

function createTodo(text) {
  if (state.status !== APP_STATUS.READY) {
    return;
  }

  if (state.todo) {
    setNotice("error", "Only one todo is allowed. Delete the current todo first.");
    render();
    return;
  }

  state.todo = { text, completed: false };
  clearNotice();
  persistTodo(state.todo);
  syncRoute();
  render();
}

function toggleTodo() {
  if (state.status !== APP_STATUS.READY || !state.todo) {
    return;
  }

  state.todo = {
    ...state.todo,
    completed: !state.todo.completed,
  };

  clearNotice();
  persistTodo(state.todo);
  syncRoute();
  render();
}

function deleteTodo() {
  if (state.status !== APP_STATUS.READY || !state.todo) {
    return;
  }

  state.todo = null;
  setNotice("info", "Todo deleted. You can create a new one now.");
  persistTodo(null);
  syncRoute();
  render();
  elements.input.focus();
}

async function bootstrap() {
  render();

  try {
    const stored = readStoredTodo();

    if (stored.warning) {
      setNotice("error", stored.warning);
    }

    if (stored.todo) {
      state.todo = stored.todo;
      state.status = APP_STATUS.READY;
      syncRoute({ replace: true });
      render();
      return;
    }

    try {
      const fetchedTodo = await fetchSeedTodo();
      state.todo = fetchedTodo;
      if (fetchedTodo) {
        persistTodo(fetchedTodo);
      }
    } catch (error) {
      setNotice(
        "error",
        "Seed fetch unavailable. Falling back to local empty state.",
      );
      state.todo = null;
    }

    state.status = APP_STATUS.READY;
    syncRoute({ replace: true });
    render();

    if (!state.todo) {
      elements.input.focus();
    }
  } catch (error) {
    setFatalError("Unexpected initialization error. Please refresh the page.");
  }
}

function handleRouteChange() {
  syncRoute({ replace: true });
  render();
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = elements.input.value.trim();

  if (!text) {
    setNotice("error", "Enter a todo before submitting.");
    render();
    return;
  }

  createTodo(text);
  elements.input.value = "";
  updateAddButtonState();
});

elements.input.addEventListener("input", () => {
  if (state.notice && state.notice.type !== "error") {
    clearNotice();
  }
  updateAddButtonState();
});

elements.checkbox.addEventListener("click", () => {
  toggleTodo();
});

elements.deleteBtn.addEventListener("click", () => {
  deleteTodo();
});

window.addEventListener("popstate", () => {
  handleRouteChange();
});

bootstrap();
