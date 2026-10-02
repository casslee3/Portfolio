import { prefersReducedMotion } from "./motion.js";

const INTERVAL_MS = 4000;

/**
 * Rotating photo carousel (WAI-ARIA carousel pattern). Without JS the slides
 * show as a simple grid; this adds .is-ready, which stacks them and reveals the
 * previous / pause / next controls and slide dots. Auto-rotation pauses on hover
 * and focus, can be stopped with the pause button (WCAG 2.2.2) and never starts
 * when reduced motion is requested. Screen readers hear slide changes only when
 * the visitor drives the carousel themselves.
 */
export function initCarousel(root) {
  if (!root) return;

  const viewport = root.querySelector("[data-carousel-viewport]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const toggle = root.querySelector("[data-carousel-toggle]");
  const dotList = root.querySelector("[data-carousel-dots]");
  let index = 0;
  let timer;
  let userPaused = prefersReducedMotion();

  const dots = slides.map((slide, i) => {
    const item = document.createElement("li");
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.innerHTML = `<span class="sr-only">Show slide ${i + 1}: ${slide.dataset.slide}</span>`;
    dot.addEventListener("click", () => show(i));
    item.append(dot);
    dotList.append(item);
    return dot;
  });

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.toggleAttribute("data-active", n === index));
    dots.forEach((dot, n) =>
      n === index ? dot.setAttribute("aria-current", "true") : dot.removeAttribute("aria-current"),
    );
  }

  function play() {
    stop();
    timer = setInterval(() => show(index + 1), INTERVAL_MS);
    viewport.setAttribute("aria-live", "off");
  }

  function stop() {
    clearInterval(timer);
    timer = undefined;
    viewport.setAttribute("aria-live", "polite");
  }

  root.querySelector("[data-carousel-prev]").addEventListener("click", () => show(index - 1));
  root.querySelector("[data-carousel-next]").addEventListener("click", () => show(index + 1));
  toggle.addEventListener("click", () => {
    userPaused = !userPaused;
    toggle.toggleAttribute("data-paused", userPaused);
    if (userPaused) stop();
    else play();
  });

  // Hovering or focusing inside the carousel holds the current slide.
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", () => userPaused || play());
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => root.contains(event.relatedTarget) || userPaused || play());

  root.classList.add("is-ready");
  root.querySelectorAll("[data-carousel-controls]").forEach((el) => (el.hidden = false));
  toggle.toggleAttribute("data-paused", userPaused);
  if (prefersReducedMotion()) toggle.hidden = true;
  show(0);
  if (!userPaused) play();
}
