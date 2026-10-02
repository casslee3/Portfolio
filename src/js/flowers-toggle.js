import { prefersReducedMotion } from "./motion.js";

/**
 * Pause/play control for the falling and spinning flowers. The hero waves keep
 * drifting by design. When reduced motion is requested nothing moves, so the
 * button stays hidden.
 */
export function initFlowersToggle(button) {
  if (!button || prefersReducedMotion()) return;

  button.hidden = false;

  button.addEventListener("click", () => {
    const paused = !button.hasAttribute("data-paused");
    button.toggleAttribute("data-paused", paused);
    document.documentElement.classList.toggle("flowers-paused", paused);
  });
}
