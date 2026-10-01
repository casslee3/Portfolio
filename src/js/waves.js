import { prefersReducedMotion } from "./motion.js";

/**
 * Pause/play control for the drifting hero waves (WCAG 2.2.2: moving content that
 * lasts more than 5 seconds needs a way to stop it). When reduced motion is
 * requested the waves never move, so the button stays hidden.
 */
export function initWavesToggle(button) {
  if (!button || prefersReducedMotion()) return;

  const scope = button.closest("section");
  button.hidden = false;

  button.addEventListener("click", () => {
    const paused = !button.hasAttribute("data-paused");
    button.toggleAttribute("data-paused", paused);
    scope.classList.toggle("waves-paused", paused);
  });
}
