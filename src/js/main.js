import "../css/main.css";
import { initThemeToggle } from "./theme.js";
import { initMobileNav } from "./nav.js";
import { initTypewriter } from "./typewriter.js";
import { initPrinciples } from "./principles.js";
import { initWavesToggle } from "./waves.js";
import { initCopyEmail } from "./copy-email.js";
import { initFlowerRain } from "./flower-rain.js";

initThemeToggle(document.querySelector("[data-theme-toggle]"));
initMobileNav(document.querySelector("[data-nav-toggle]"));
initTypewriter(document.querySelector("[data-typewriter]"));
initPrinciples(document.querySelector("[data-principles]"));
initWavesToggle(document.querySelector("[data-waves-toggle]"));
initCopyEmail(document.querySelector("[data-copy-email]"));
initFlowerRain(document.querySelector("[data-flower-rain]"));
