import "../css/main.css";
import { initThemeToggle } from "./theme.js";
import { initMobileNav } from "./nav.js";
import { initTypewriter } from "./typewriter.js";
import { initMarquees } from "./marquee.js";
import { initMixBowl } from "./mix-bowl.js";
import { initFlowersToggle } from "./flowers-toggle.js";
import { initCopyEmail } from "./copy-email.js";
import { initFlowerRain } from "./flower-rain.js";

initThemeToggle(document.querySelector("[data-theme-toggle]"));
initMobileNav(document.querySelector("[data-nav-toggle]"));
initTypewriter(document.querySelector("[data-typewriter]"));
initMarquees(document.querySelectorAll("[data-marquee]"));
initFlowersToggle(document.querySelector("[data-flowers-toggle]"));
initCopyEmail(document.querySelector("[data-copy-email]"));
initFlowerRain(document.querySelector("[data-flower-rain]"));
initMixBowl(document.querySelector("[data-mix]"));
