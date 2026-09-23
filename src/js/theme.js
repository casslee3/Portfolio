const STORAGE_KEY = "theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme() {
  return document.documentElement.dataset.theme ?? (darkQuery.matches ? "dark" : "light");
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable: the choice still applies for this page view.
  }
}

/**
 * Light/dark toggle. Exposed to assistive tech as a toggle button
 * ("Dark mode", pressed = dark) so its state is announced.
 */
export function initThemeToggle(button) {
  if (!button) return;

  const sync = () => button.setAttribute("aria-pressed", String(currentTheme() === "dark"));

  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    saveTheme(next);
    sync();
  });

  darkQuery.addEventListener("change", sync);
  sync();
}
