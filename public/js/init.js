// Runs synchronously in <head> before first paint to prevent a flash of the
// wrong theme and to let CSS know JavaScript is available.
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "light" || theme === "dark") root.dataset.theme = theme;
  } catch {
    // Storage unavailable (private mode, blocked cookies): follow the OS theme.
  }
})();
