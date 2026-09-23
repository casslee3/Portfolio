import "../css/main.css";
import { initThemeToggle } from "./theme.js";
import { initTabs } from "./tabs.js";
import { initCopyEmail } from "./copy-email.js";

initThemeToggle(document.querySelector("[data-theme-toggle]"));
initTabs(document.querySelector("[data-tabs]"));
initCopyEmail(document.querySelector("[data-copy-email]"));
