// Briefly demo screenshots — Playwright headless against the dist/ server.
// Captures real app frames (demo mode) for the demo video (1280x720).
import { chromium } from '/home/hatch/workspace/makefun-token-radar/shot/node_modules/playwright-core/index.mjs';

const D = '/home/hatch/workspace/hybridai/video/shots';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log('pageerror:', String(e)));

await page.goto('http://localhost:4173/?demo=1', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(600);
await page.screenshot({ path: `${D}/shot-01-idle.png` });
console.log('shot-01 idle');

// Short sample -> on-device (demo)
await page.click('#loadShortBtn');
await page.waitForTimeout(300);
await page.screenshot({ path: `${D}/shot-02-short-loaded.png` });
console.log('shot-02 short loaded, words:', await page.locator('#wordCount').textContent());
await page.click('#generateBtn');
await page.waitForSelector('#result .brief, #result .result-card, #result h2, #result h3', { timeout: 15000 }).catch(() => console.log('result selector timeout, continuing'));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${D}/shot-03-short-result.png` });
console.log('shot-03 short result');

// Long sample -> cloud (demo)
await page.click('#loadLongBtn');
await page.waitForTimeout(300);
await page.click('#generateBtn');
await page.waitForTimeout(1500);
await page.locator('#result').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: `${D}/shot-04-long-result.png` });
console.log('shot-04 long result, words:', await page.locator('#wordCount').textContent());

await browser.close();
console.log('SHOTS DONE');
