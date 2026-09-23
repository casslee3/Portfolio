import { prefersReducedMotion } from "./motion.js";

const INTERVAL_MS = 2200;

/**
 * Cycles a visual highlight through the design principles list. All items stay
 * in the DOM and readable; only styling changes. Auto-play can be paused
 * (WCAG 2.2.2) and never starts when reduced motion is requested.
 */
export function initPrinciples(root) {
  if (!root) return;

  const items = [...root.querySelectorAll("[data-principle]")];
  const button = root.querySelector("[data-principles-toggle]");
  let index = 0;
  let timer;

  const highlight = () => {
    items.forEach((item, i) => item.toggleAttribute("data-current", i === index));
  };

  const play = () => {
    timer = setInterval(() => {
      index = (index + 1) % items.length;
      highlight();
    }, INTERVAL_MS);
    button.setAttribute("aria-pressed", "false");
  };

  const pause = () => {
    clearInterval(timer);
    timer = undefined;
    button.setAttribute("aria-pressed", "true");
  };

  highlight();
  button.hidden = false;
  button.addEventListener("click", () => (timer ? pause() : play()));

  if (prefersReducedMotion()) pause();
  else play();
}
