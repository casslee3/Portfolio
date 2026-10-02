import { prefersReducedMotion } from "./motion.js";

/**
 * Pause/play control for the drifting hero waves. The flowers keep moving by
 * design. When reduced motion is requested nothing moves, so the button stays
 * hidden.
 */
export function initWavesToggle(button) {
  if (!button || prefersReducedMotion()) return;

  button.hidden = false;

  button.addEventListener("click", () => {
    const paused = !button.hasAttribute("data-paused");
    button.toggleAttribute("data-paused", paused);
    document.documentElement.classList.toggle("waves-paused", paused);
  });
}
