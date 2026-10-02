import { prefersReducedMotion } from "./motion.js";

/**
 * Looping marquee used by the About skills and the Extras! photo strip. Hidden,
 * inert copies of the list follow the original until the row is wide enough to
 * loop seamlessly; screen readers and keyboards only meet the original. Skipped
 * when reduced motion is requested (the list stays static). Hovering pauses it,
 * and an optional [data-marquee-toggle] button stops it (WCAG 2.2.2).
 */
function initMarquee(root) {
  const track = root.querySelector(".marquee");
  const list = track.querySelector(".marquee-list");
  const button = root.querySelector("[data-marquee-toggle]");

  track.classList.add("is-scrolling");
  const listWidth = list.getBoundingClientRect().width;
  const copies = Math.max(1, Math.ceil(track.clientWidth / listWidth));
  for (let i = 0; i < copies; i++) {
    const copy = list.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    copy.inert = true;
    track.append(copy);
  }

  if (!button) return;
  button.hidden = false;
  button.addEventListener("click", () => {
    const paused = !button.hasAttribute("data-paused");
    button.toggleAttribute("data-paused", paused);
    track.classList.toggle("is-paused", paused);
  });
}

/** Starts every [data-marquee] on the page. */
export function initMarquees(roots) {
  if (prefersReducedMotion()) return;
  roots.forEach(initMarquee);
}
