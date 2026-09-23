import { prefersReducedMotion } from "./motion.js";

const CHAR_DELAY_MS = 45;

/**
 * Types the element's own text once. The full sentence ships in the HTML
 * (for SEO, no-JS and screen readers via the sr-only copy), so this is purely
 * decorative. It runs once and finishes in under 5 seconds, so no pause
 * control is needed (WCAG 2.2.2), and it is skipped for reduced motion.
 */
export function initTypewriter(el) {
  if (!el || prefersReducedMotion()) return;

  const text = el.textContent.trim();
  let i = 0;
  el.textContent = "";
  el.classList.add("caret");

  const tick = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, CHAR_DELAY_MS);
  };
  tick();
}
