import { prefersReducedMotion } from "./motion.js";

/**
 * Turns the About skills list into a looping marquee. A hidden, inert copy of
 * the list follows the original so the row scrolls seamlessly; screen readers
 * and keyboards only meet the original. Skipped when reduced motion is
 * requested (the list stays wrapped), and the pause button stops it (WCAG 2.2.2).
 */
export function initMarquee(root) {
  if (!root || prefersReducedMotion()) return;

  const track = root.querySelector(".marquee");
  const list = track.querySelector(".marquee-list");
  const button = root.querySelector("[data-marquee-toggle]");

  const copy = list.cloneNode(true);
  copy.setAttribute("aria-hidden", "true");
  copy.inert = true;
  track.append(copy);
  track.classList.add("is-scrolling");

  button.hidden = false;
  button.addEventListener("click", () => {
    const paused = !button.hasAttribute("data-paused");
    button.toggleAttribute("data-paused", paused);
    track.classList.toggle("is-paused", paused);
  });
}
