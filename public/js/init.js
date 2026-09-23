// Runs synchronously in <head> before first paint to prevent a flash of the
// wrong theme when the visitor has chosen one explicitly.
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
  } catch {
    // Storage unavailable (private mode, blocked cookies): follow the OS theme.
  }
})();
