import { prefersReducedMotion } from "./motion.js";

const INTERVAL_MS = 2200;

/**
 * Cycles a visual highlight through a list. All items stay in the DOM and
 * readable; only styling changes (via data-current). Auto-play can be paused
 * with the root's [data-cycle-toggle] button (WCAG 2.2.2) and never starts when
 * reduced motion is requested.
 */
export function initCycler(root) {
  if (!root) return;

  const items = [...root.querySelectorAll("[data-cycle-item]")];
  const button = root.querySelector("[data-cycle-toggle]");
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
    button.removeAttribute("data-paused");
  };

  const pause = () => {
    clearInterval(timer);
    timer = undefined;
    button.toggleAttribute("data-paused", true);
  };

  highlight();
  button.hidden = false;
  button.addEventListener("click", () => (timer ? pause() : play()));

  if (prefersReducedMotion()) pause();
  else play();
}
