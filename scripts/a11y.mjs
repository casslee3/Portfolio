// Automated WCAG 2.2 AA audit (axe-core) of the built site, in light and dark mode.
// Usage: npm run build && npm run a11y
import { spawn } from "node:child_process";
import { chromium } from "playwright-core";
import { AxeBuilder } from "@axe-core/playwright";

const PORT = 4173;
const URL = `http://localhost:${PORT}/`;
const VIEWPORTS = { desktop: { width: 1280, height: 800 }, mobile: { width: 390, height: 844 } };
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
});
let failures = 0;

try {
  await waitForServer();
  for (const colorScheme of ["light", "dark"]) {
    for (const [device, viewport] of Object.entries(VIEWPORTS)) {
      const context = await browser.newContext({ colorScheme, viewport });
      const page = await context.newPage();
      await page.goto(URL);
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      console.log(`${colorScheme} / ${device}: ${violations.length} violation(s)`);
      for (const v of violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
        for (const node of v.nodes) console.log(`    ${node.target.join(" ")}`);
      }
      failures += violations.length;
      await context.close();
    }
  }
} finally {
  await browser.close();
  server.kill();
}

process.exitCode = failures ? 1 : 0;

async function waitForServer(retries = 50) {
  for (let i = 0; i < retries; i++) {
    try {
      if ((await fetch(URL)).ok) return;
    } catch {
      // Server not up yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Preview server did not start on ${URL}`);
}
