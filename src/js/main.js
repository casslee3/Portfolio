import "../css/main.css";
import { initThemeToggle } from "./theme.js";
import { initMobileNav } from "./nav.js";
import { initTypewriter } from "./typewriter.js";
import { initPrinciples } from "./principles.js";
import { initCopyEmail } from "./copy-email.js";

initThemeToggle(document.querySelector("[data-theme-toggle]"));
initMobileNav(document.querySelector("[data-nav-toggle]"));
initTypewriter(document.querySelector("[data-typewriter]"));
initPrinciples(document.querySelector("[data-principles]"));
initCopyEmail(document.querySelector("[data-copy-email]"));
