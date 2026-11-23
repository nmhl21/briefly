// Briefly wired-config verification — Playwright headless Chromium vs dist/.
// Runs against the build WITH the real Firebase config (project briefly-aa68d).
// Serves dist/ with python http.server on :4173, then checks:
//  (a) plain load: no page errors, header present, setup guide HIDDEN
//      (config is real now), no external requests on load
//  (b) real SDK path: probeModel -> modelCreated true,
//      initializeDeviceModel is a function
//  (c) real generate (cloud mode, short sample): the SDK really attempts a
//      call to firebasevertexai.googleapis.com; on this VM the egress proxy
//      blocks that host, so the UI must show a friendly network/API error
//      (no crash, no result panel, debugState.lastError set). A real success
//      here is NOT expected from the VM — see BUILD-VERIFY.md.
//  (d) demo mode regression: ?demo=1 short sample -> brief still renders
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

  // ---- (a) plain load with real config
  {
    const page = await browser.newPage();
    const errors = [];
    const external = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    // Console "error" events from failed resource loads are the VM egress
    // proxy refusing googleapis hosts (ERR_TUNNEL_CONNECTION_FAILED) — the
    // app handles that failure gracefully, so they are not app errors.
    page.on('console', (m) => {
      if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text());
    });
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
    const guideHidden = await page.isHidden('#setupGuide');
    check('a1 page loads, header present', h1 === 'Briefly', `h1=${h1}`);
    check('a2 no page errors on load', errors.length === 0, errors.join(' | ') || 'none');
    check('a3 no external requests on load (self-contained)', external.length === 0, external.join(', ') || 'none');
    check('a4 setup guide hidden (real config present)', guideHidden);
    check('a5 on-device badge reports Unavailable in headless Chromium',
      /Unavailable in this browser/.test(badge || ''), `badge="${badge}"`);
    await page.close();
  }

  // ---- (b) real SDK path via probeModel
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const probe = await page.evaluate(() => window.__brieflyDebug.probeModel('auto', 10));
    check('b1 getGenerativeModel called with real config (modelCreated)',
      probe.modelCreated === true, JSON.stringify(probe));
    check('b2 typeof model.initializeDeviceModel === function',
      probe.initializeDeviceModelIsFunction === true, JSON.stringify(probe));
    check('b3 probe did not crash page', errors.length === 0, errors.join(' | ') || 'none');
    await page.close();
  }

  // ---- (c) real generate, cloud mode: SDK must attempt the real API call;
  //      on this VM the egress proxy blocks firebasevertexai.googleapis.com,
  //      so a friendly error is the honest expected outcome.
  {
    const page = await browser.newPage();
    const errors = [];
    const apiCalls = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    // Console "error" events from failed resource loads are the VM egress
    // proxy refusing googleapis hosts (ERR_TUNNEL_CONNECTION_FAILED) — the
    // app handles that failure gracefully, so they are not app errors.
    page.on('console', (m) => {
      if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text());
    });
    page.on('request', (req) => {
      if (req.url().includes('firebasevertexai.googleapis.com') || req.url().includes('googleapis.com')) {
        apiCalls.push(req.url());
      }
    });
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.click('#loadShortBtn');
    await page.click('input[name="mode"][value="cloud"]');
    await page.click('#generateBtn');
    // Wait for either the error box or a (unexpected-here) result.
    await page.waitForFunction(
      () => !document.querySelector('#errorBox').hidden || !document.querySelector('#result').hidden,
      { timeout: 60000 }
    );
    const errorVisible = await page.isVisible('#errorBox');
    const errorText = errorVisible ? await page.textContent('#errorBox') : '';
    const resultVisible = await page.isVisible('#result');
    const debug = await page.evaluate(() => window.__brieflyDebug);
    check('c1 real SDK call attempted (request to googleapis)',
      apiCalls.length > 0, apiCalls.join(', ') || 'no googleapis request seen');
    if (resultVisible) {
      const badge = await page.textContent('.source-badge');
      check('c2 REAL generate succeeded (unexpected on this VM — record it)',
        true, `badge="${badge}"`);
    } else {
      check('c2 generate failed gracefully with friendly error (VM proxy blocks API)',
        errorVisible && /Network error|rejected|API key|Firebase/i.test(errorText || ''),
        (errorText || '').slice(0, 160));
    }
    check('c3 no page errors during real generate', errors.length === 0, errors.join(' | ') || 'none');
    check('c4 debugState.lastError recorded on failure (or null on success)',
      resultVisible ? debug.lastError === null : typeof debug.lastError === 'string' && debug.lastError.length > 0,
      `lastError=${String(debug.lastError || '').slice(0, 120)}`);
    check('c5 setup guide stays hidden (config path, not no-config path)',
      await page.isHidden('#setupGuide'));
    await page.close();
  }

  // ---- (d) demo mode regression
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(BASE + '?demo=1', { waitUntil: 'domcontentloaded' });
    await page.click('#loadShortBtn');
    await page.click('#generateBtn');
    await page.waitForSelector('.brief-title', { timeout: 15000 });
    const title = await page.textContent('.brief-title');
    check('d1 demo mode still renders a brief', !!title && title.length > 3, `title="${title}"`);
    check('d2 demo flow: no page errors', errors.length === 0, errors.join(' | ') || 'none');
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
