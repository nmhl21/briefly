// Briefly end-to-end UI test — Playwright headless Chromium vs dist/.
// Serves dist/ with python http.server on :4173, then checks:
//  (a) page loads with no page errors and no external (non-localhost) requests
//  (b) ?demo=1: short sample -> rendered brief + simulated on-device badge;
//      long sample -> simulated cloud badge
//  (c) no demo & no Firebase config: Generate -> setup guide, no crash
//  (d) real SDK path: window.__brieflyDebug.probeModel proves
//      getGenerativeModel was called and model.initializeDeviceModel is a function
import { chromium } from '/home/hatch/workspace/makefun-token-radar/shot/node_modules/playwright-core/index.mjs';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 4173;
const BASE = `http://localhost:${PORT}/`;

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--directory', path.join(ROOT, 'dist')], {
  stdio: 'ignore',
});

async function waitForServer(tries = 30) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return true;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
}

let browser;
try {
  if (!(await waitForServer())) throw new Error('static server did not come up');
  if (!fs.existsSync(path.join(ROOT, 'dist', 'index.html'))) throw new Error('dist/index.html missing');

  browser = await chromium.launch({ headless: true });

  // ---- (a) plain load: no page errors, self-contained (no external requests)
  {
    const page = await browser.newPage();
    const errors = [];
    const external = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('request', (req) => {
      const url = req.url();
      if (!url.startsWith('http://localhost') && !url.startsWith('https://localhost') && !url.startsWith('data:')) {
        external.push(url);
      }
    });
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    const h1 = await page.textContent('h1');
    const badge = await page.textContent('#deviceBadge');
    check('a1 page loads, header present', h1 === 'Briefly', `h1=${h1}`);
    check('a2 no page errors', errors.length === 0, errors.join(' | ') || 'none');
    check('a3 no external requests (self-contained)', external.length === 0, external.join(', ') || 'none');
    check('a4 on-device badge reports Unavailable in headless Chromium',
      /Unavailable in this browser/.test(badge || ''), `badge="${badge}"`);
    await page.close();
  }

  // ---- (b) demo mode: short sample -> brief + simulated on-device badge
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(BASE + '?demo=1', { waitUntil: 'domcontentloaded' });
    const bannerVisible = await page.isVisible('#demoBanner');
    check('b1 demo banner visible', bannerVisible);
    await page.click('#loadShortBtn');
    await page.waitForTimeout(200);
    const wc = await page.textContent('#wordCount');
    await page.click('#generateBtn');
    await page.waitForSelector('.brief-title', { timeout: 15000 });
    const title = await page.textContent('.brief-title');
    const badge = await page.textContent('.source-badge');
    const summaryCount = await page.locator('.summary-list li').count();
    const actionRows = await page.locator('.actions-table tbody tr').count();
    check('b2 short sample: brief renders', !!title && title.length > 3, `title="${title}" words=${wc}`);
    check('b3 short sample: simulated on-device badge', /Simulated · On-device/.test(badge || ''), `badge="${badge}"`);
    check('b4 short sample: 3-5 summary bullets', summaryCount >= 3 && summaryCount <= 5, `${summaryCount} bullets`);
    check('b5 short sample: action items extracted', actionRows >= 1, `${actionRows} rows`);
    check('b6 demo flow: no page errors', errors.length === 0, errors.join(' | ') || 'none');
    // History recorded
    const histCount = await page.locator('.history-item').count();
    check('b7 history has 1 entry', histCount === 1, `${histCount} entries`);
    // Raw JSON collapsible present
    const rawJson = await page.textContent('.raw-json pre');
    check('b8 raw JSON shown', rawJson.includes('"title"'), rawJson.slice(0, 60));

    // Long sample -> simulated cloud badge
    await page.click('#loadLongBtn');
    await page.click('#generateBtn');
    await page.waitForFunction(
      () => document.querySelector('.source-badge')?.textContent.includes('Cloud'),
      { timeout: 15000 }
    );
    const badgeLong = await page.textContent('.source-badge');
    check('b9 long sample: simulated cloud badge', /Simulated · Cloud/.test(badgeLong || ''), `badge="${badgeLong}"`);
    await page.close();
  }

  // ---- (c) no demo, no config: Generate -> setup guide, no crash
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.click('#loadShortBtn');
    await page.click('#generateBtn');
    await page.waitForSelector('#setupGuide:visible', { timeout: 10000 });
    const guideText = await page.textContent('#setupGuide');
    check('c1 setup guide shown (no config)', /Set up Firebase AI Logic/.test(guideText || ''), guideText.slice(0, 80));
    check('c2 no page errors on no-config generate', errors.length === 0, errors.join(' | ') || 'none');
    check('c3 result panel stays hidden', await page.isHidden('#result'));
    await page.close();
  }

  // ---- (d) real SDK path via debug probe (placeholder config)
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const debug = await page.evaluate(() => window.__brieflyDebug);
    check('d1 window.__brieflyDebug exists, sdkLoaded', !!debug && debug.sdkLoaded === true, JSON.stringify(debug));
    const probe = await page.evaluate(() => window.__brieflyDebug.probeModel('auto', 10));
    check('d2 getGenerativeModel called (modelCreated)', probe.modelCreated === true, JSON.stringify(probe));
    check('d3 typeof model.initializeDeviceModel === function',
      probe.initializeDeviceModelIsFunction === true, JSON.stringify(probe));
    check('d4 probe did not crash page', errors.length === 0, errors.join(' | ') || 'none');
    // Also confirm generateContent with placeholder config fails gracefully in UI
    await page.click('#loadShortBtn');
    // Force the real path: temporarily pretend config exists is not possible
    // without editing config, so this only documents that (c) already covers
    // the graceful path. Placeholder generateContent failure is exercised via
    // probeModel + the error handling in ai.js (friendlyError) — see BUILD-VERIFY.
    await page.close();
  }
} catch (err) {
  check('test harness', false, String(err?.message || err));
} finally {
  if (browser) await browser.close();
  server.kill();
}

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed${failed ? ` — ${failed} FAILED` : ''}`);
process.exit(failed ? 1 : 0);
