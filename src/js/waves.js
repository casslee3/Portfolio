import { prefersReducedMotion } from "./motion.js";

/**
 * Pause/play control for the drifting hero waves and the spinning flower icons
 * (WCAG 2.2.2: moving content that lasts more than 5 seconds needs a way to stop
 * it). When reduced motion is requested nothing moves, so the button stays hidden.
 */
export function initWavesToggle(button) {
  if (!button || prefersReducedMotion()) return;

  button.hidden = false;

  button.addEventListener("click", () => {
    const paused = !button.hasAttribute("data-paused");
    button.toggleAttribute("data-paused", paused);
    document.documentElement.classList.toggle("motion-paused", paused);
  });
}
