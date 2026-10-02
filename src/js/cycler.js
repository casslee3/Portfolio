import { prefersReducedMotion } from "./motion.js";

const DEFAULT_INTERVAL_MS = 2200;

/**
 * Cycles a visual highlight through a list. All items stay in the DOM and
 * readable; only styling changes (via data-current). Auto-play can be paused
 * with the root's [data-cycle-toggle] button (WCAG 2.2.2) and never starts when
 * reduced motion is requested. Set data-cycle-interval on the root to change
 * the speed.
 */
function initCycler(root) {
  const items = [...root.querySelectorAll("[data-cycle-item]")];
  const button = root.querySelector("[data-cycle-toggle]");
  const interval = Number(root.dataset.cycleInterval) || DEFAULT_INTERVAL_MS;
  let index = 0;
  let timer;

  const highlight = () => {
    items.forEach((item, i) => item.toggleAttribute("data-current", i === index));
  };

  const play = () => {
    timer = setInterval(() => {
      index = (index + 1) % items.length;
      highlight();
    }, interval);
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

/** Starts every [data-cycler] list on the page. */
export function initCyclers(roots) {
  roots.forEach(initCycler);
}
