# Briefly — BUILD & VERIFY report

Date: 2026-11-23 (WITA). App: `~/workspace/hybridai/` — Vite vanilla static app,
`firebase@13.4.0`. All verification below was run on this VM (headless
Chromium 159 via playwright-core 1.65.1).

## 1. `npm install` + `npm run build` — PASS

```bash
cd ~/workspace/hybridai
TMPDIR=$HOME/workspace/.tmp/pip-tmp npm install   # added 127 packages in 30s
npm run build
```

Output:

```text
vite v6.4.6 building for production...
✓ 19 modules transformed.
dist/index.html                6.27 kB │ gzip:  2.28 kB
dist/assets/index-5W97ZyGj.css 5.39 kB │ gzip:  1.71 kB
dist/assets/index-oyzZo82S.js 130.38 kB │ gzip: 31.21 kB
✓ built in 671ms
```

`dist/` contains only `index.html` + `assets/` (JS + CSS). No external CDN
dependency: the bundle is self-contained (verified by the request audit in 2a).

## 2. Playwright headless Chromium — 20/20 checks PASS

Command: `npm test` → `node scripts/test-ui.mjs` (serves `dist/` with
`python3 -m http.server 4173`). Full output:

```text
PASS  a1 page loads, header present — h1=Briefly
PASS  a2 no page errors — none
PASS  a3 no external requests (self-contained) — none
PASS  a4 on-device badge reports Unavailable in headless Chromium — badge="On-device: Unavailable in this browser"
PASS  b1 demo banner visible
PASS  b2 short sample: brief renders — title="Team sync — Nov 20, 2026" words=75 words
PASS  b3 short sample: simulated on-device badge — badge="Simulated · On-device (demo)"
PASS  b4 short sample: 3-5 summary bullets — 5 bullets
PASS  b5 short sample: action items extracted — 3 rows
PASS  b6 demo flow: no page errors — none
PASS  b7 history has 1 entry — 1 entries
PASS  b8 raw JSON shown — { "title": "Team sync — Nov 20, 2026", "summary": [ …
PASS  b9 long sample: simulated cloud badge — badge="Simulated · Cloud (demo)"
PASS  c1 setup guide shown (no config) — Set up Firebase AI Logic to generate real briefs
PASS  c2 no page errors on no-config generate — none
PASS  c3 result panel stays hidden
PASS  d1 window.__brieflyDebug exists, sdkLoaded — {"sdkLoaded":true,"modelCreated":false,...}
PASS  d2 getGenerativeModel called (modelCreated) — {"ok":true,"sdkLoaded":true,"modelCreated":true,"initializeDeviceModelIsFunction":true,...}
PASS  d3 typeof model.initializeDeviceModel === function — (same object as d2)
PASS  d4 probe did not crash page — none

20/20 checks passed
```

Notes on individual items:

- **2a — load:** header renders, zero `pageerror`/console-error events, zero
  requests to any non-localhost host (app is self-contained, no CDN).
- **2b — `?demo=1`:** yellow demo banner visible; short sample (75 words)
  renders a brief with title, 5 summary bullets, 3 action-item rows,
  raw-JSON collapsible, history entry, and the badge
  "Simulated · On-device (demo)". Long sample (659 words, > 600-word limit)
  renders the badge "Simulated · Cloud (demo)" — the routing rule works.
  The demo brief is derived from the input text (sentence extraction +
  TODO/action/by/due lines), not one hardcoded answer.
- **2c — no demo, no config:** Generate shows the Firebase setup guide
  (`src/firebase-config.js` still has `YOUR_...` placeholders), result panel
  stays hidden, no page errors, no crash.
- **2d — real SDK path:** `window.__brieflyDebug.probeModel('auto', 10)`
  (which calls the real `getGenerativeModel` with placeholder config) returns
  `modelCreated: true` and `initializeDeviceModelIsFunction: true`.
  Typings cross-check: `InferenceMode`, `initializeDeviceModel`,
  `inferenceSource`, `responseConstraint` all confirmed present in
  `@firebase/ai/dist/ai-public.d.ts` (firebase 13.4.0).

## 2e. Extra: `generateContent` with placeholder/fake config — PASS (graceful failure)

Run separately against `vite dev` with fake-but-real-looking env config
(`VITE_FIREBASE_API_KEY=AIzaFakeKeyForTestOnly…`, project
`fake-test-project`; **no real credentials used**):

- **Cloud-only mode:** the SDK really attempted the network call —
  `lastError: "AI: Error fetching from https://firebasevertexai.googleapis.com/v1beta/projects/fake-test-project/models/gemini-2.5-flash:generateContent: Failed to fetch (AI/error)"`.
  UI showed the friendly message *"Network error while calling Firebase AI
  Logic. Check your connection and try again."*, result stayed hidden, zero
  `pageerror` events. (The fetch itself fails in this VM because the egress
  proxy blocks `firebasevertexai.googleapis.com` — see "Not verifiable" below;
  the app handled the failure exactly as specified.)
- **Auto mode (short note):** `initializeDeviceModel` + fallback path ran and
  the UI showed a friendly error (*"Brief generation failed: The input is too
  large."* — the SDK's own message from the unavailable on-device path),
  zero `pageerror` events, no crash, no hang (answered within seconds).

## Files created

```text
~/workspace/hybridai/
  package.json            (scripts: dev, build, preview, test; firebase 13.4.0, vite ^6.3.5)
  vite.config.js          (static build, base "./", dist/)
  index.html
  src/main.js             (UI wiring, history, samples, demo/real routing)
  src/styles.css
  src/firebase-config.js  (PLACEHOLDER "YOUR_..." values only, no real secret)
  src/ai.js               (Firebase AI Logic: init, modes, initializeDeviceModel,
                           generateContent, same JSON schema both paths, debug surface)
  src/demo.js             (demo simulator, input-derived brief)
  scripts/test-ui.mjs     (Playwright test, 20 checks)
  README.md               (run/build/deploy/Firebase setup/demo mode)
  BUILD-VERIFY.md         (this file)
  .gitignore              (node_modules/, dist/, .env, firebase-config.local.js)
  LICENSE                 (MIT)
```

No git repo was created (coordinator's job). Nothing under
`~/workspace/kiroween/` was touched. No Firebase project was created, no
API key or real config was pasted anywhere.

## Not verified / cannot be verified on this VM

- **Real on-device Gemini Nano inference:** impossible here — headless
  Chromium has no Nano model. The app correctly detects this and reports
  "On-device: Unavailable in this browser". Needs Chrome Desktop 139+ with
  the Prompt API / Gemini Nano flag on a real machine.
- **Real cloud inference with a valid key:** needs a real Firebase project +
  API key (user-side setup per README). With a fake key the SDK call was
  proven to fire and fail gracefully (2e above), but a successful
  `generateContent` round-trip was not observed. Note the VM egress proxy
  blocks `firebasevertexai.googleapis.com` (`ERR_TUNNEL_CONNECTION_FAILED`),
  so even a real key would likely fail from this VM — cloud verification
  should be done from the user's machine / a network where the Firebase AI
  Logic endpoint is reachable.
- **App Check debug token flow:** code is in place (`self.FIREBASE_APPCHECK_DEBUG_TOKEN = true`
  before `initializeAppCheck`, wrapped in try/catch); the actual token
  registration step is user-side in the Firebase console.
