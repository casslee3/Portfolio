/**
 * Mobile menu disclosure. The button controls the menu via aria-controls /
 * aria-expanded; Escape and choosing a link both close it and return focus.
 * On wide screens the menu is always visible via CSS, so this is a no-op there.
 */
export function initMobileNav(button) {
  if (!button) return;

  const menu = document.getElementById(button.getAttribute("aria-controls"));

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    menu.dataset.open = String(open);
  };

  button.addEventListener("click", () => setOpen(button.getAttribute("aria-expanded") !== "true"));

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || button.getAttribute("aria-expanded") !== "true") return;
    setOpen(false);
    button.focus();
  });
}
