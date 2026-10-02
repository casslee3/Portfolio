import { prefersReducedMotion } from "./motion.js";

const COUNT = 16;
const PETAL = "M12 12C9 9.5 8.6 4.6 12 3c3.4 1.6 3 6.5 0 9Z";
const FLOWER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" focusable="false">${[
  0, 72, 144, 216, 288,
]
  .map((a) => `<path d="${PETAL}" transform="rotate(${a} 12 12)"/>`)
  .join("")}<circle cx="12" cy="12" r="2.4"/></svg>`;

const between = (min, max) => min + Math.random() * (max - min);

/**
 * Fills the decorative background layer with outlined flowers that drift down
 * the page. Each flower gets a random column, size, speed and sway. Nothing is
 * rendered when reduced motion is requested, and the hero pause button stops
 * the fall (WCAG 2.2.2).
 */
export function initFlowerRain(layer) {
  if (!layer || prefersReducedMotion()) return;

  for (let i = 0; i < COUNT; i++) {
    const flower = document.createElement("span");
    const duration = between(16, 30);
    flower.className = "flower-rain-item";
    flower.innerHTML = FLOWER;
    flower.style.cssText = [
      `left: ${between(0, 100)}%`,
      `--size: ${between(14, 30)}px`,
      `--drift: ${between(-12, 12)}vw`,
      `--turn: ${between(-360, 360)}deg`,
      `animation-duration: ${duration}s`,
      // A negative delay starts each flower part-way down, so the screen is never empty.
      `animation-delay: -${between(0, duration)}s`,
    ].join(";");
    layer.append(flower);
  }
}
