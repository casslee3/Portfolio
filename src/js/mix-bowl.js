/**
 * "What's in the mix?" mixing bowl in the hero. Without JS the ingredient list
 * simply shows. With JS the list stays tucked in the bowl and spills out on
 * hover, keyboard focus or tap; Escape tucks it away again (WCAG 1.4.13).
 */
export function initMixBowl(root) {
  if (!root) return;

  const button = root.querySelector("[data-mix-toggle]");
  let pinned = false; // opened by click/tap, so it stays open after the pointer leaves

  const set = (open) => {
    root.toggleAttribute("data-open", open);
    button.setAttribute("aria-expanded", String(open));
  };

  root.classList.add("is-interactive");
  set(false);
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-ready")));

  button.addEventListener("click", () => {
    pinned = !pinned;
    set(pinned);
  });
  root.addEventListener("mouseenter", () => set(true));
  root.addEventListener("mouseleave", () => pinned || set(false));
  root.addEventListener("focusin", () => set(true));
  root.addEventListener("focusout", (event) => root.contains(event.relatedTarget) || pinned || set(false));
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !root.hasAttribute("data-open")) return;
    pinned = false;
    set(false);
  });
}
