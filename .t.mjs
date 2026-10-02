import { spawn } from "node:child_process";
import { chromium } from "playwright-core";
const server = spawn("npx", ["vite", "preview", "--port", "4216", "--strictPort"], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 2000));
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const S=process.argv[2];
for (const [s,w,n] of [["light",1360,"sc-light"],["dark",390,"sc-mob"]]) {
const p = await (await b.newContext({ viewport:{width:w,height:1000}, colorScheme:s })).newPage();
await p.goto("http://localhost:4216/media/"); const a=p.locator("#solution-community"); await a.scrollIntoViewIfNeeded();
for (let i=0;i<20;i++){ if(await p.evaluate(()=>[...document.querySelectorAll("#solution-community img")].every(i=>i.complete&&i.naturalWidth>0))) break; await p.waitForTimeout(300);} await p.waitForTimeout(600);
await a.screenshot({path:`${S}/${n}.png`});
if (n==="sc-light"){ const v=p.locator("#solution-community video"); await v.evaluate(v=>v.play()); await p.waitForTimeout(1500); console.log("video", await v.evaluate(v=>[v.currentTime>0, v.videoWidth, v.paused])); }
console.log(n, await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
}
const p = await (await b.newContext({ viewport:{width:1360,height:1000} })).newPage();
await p.goto("http://localhost:4216/"); await p.evaluate(()=>document.querySelectorAll("img").forEach(i=>i.loading="eager")); await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>[...document.querySelectorAll("#media .case-card")].map(c=>Math.round(c.getBoundingClientRect().height))));
const c=p.locator('article[aria-labelledby="media-solution-community"]'); await c.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await c.screenshot({path:`${S}/sc-card.png`});
await p.locator('nav a[href="/media/"]').first().click(); await p.waitForLoadState(); console.log("extras ->", p.url());
await b.close(); server.kill();
