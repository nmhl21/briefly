# Briefly — messy notes in, structured brief out

A static web app for **#BuildHybridAI 2026** that turns raw notes (meetings,
lectures, chat logs) into a structured brief — title, 3–5 summary points,
action items (task, owner, due) and key dates — as one JSON object produced
identically on both inference paths.

## Hybrid inference (Firebase AI Logic)

Routing is by note length, and the user can override it:

| Mode | SDK mode | When it runs |
| --- | --- | --- |
| Auto (recommended) | `PREFER_ON_DEVICE` / `PREFER_IN_CLOUD` | Short notes (≤ 600 words) → on-device Gemini Nano; long notes → cloud Gemini |
| On-device only | `ONLY_ON_DEVICE` | Always Nano |
| Cloud only | `PREFER_IN_CLOUD` | Always cloud Gemini (`gemini-2.5-flash`) |

Both paths use the **same structured-output schema**: `responseSchema`
(cloud, via `Schema.object(...)`) and `responseConstraint` (on-device, plain
JSON-schema object). The result badge shows the path that actually ran, from
`response.inferenceSource` (`on_device` / `in_cloud`), plus latency and word
count.

On-device requirements: Chrome Desktop 139+ with the Prompt API /
Gemini Nano flag enabled (`chrome://flags/#prompt-api-for-gemini-nano-multimodal-input`).
The app detects availability at load and shows the status in the header; in
browsers without Nano it honestly reports "Unavailable in this browser".

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & deploy (static)

```bash
npm run build    # outputs dist/
npm run preview  # serves dist/ at http://localhost:4173
```

`dist/` is plain static files — deploy it to any static host (Firebase
Hosting, GitHub Pages, Netlify, …). No backend, no database, no login.
History is stored only in the browser's localStorage (max 10 entries).

## Firebase setup

No real Firebase credentials are committed. To enable real inference:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Open **Build → AI Logic** → **Get started** → choose the **Gemini Developer API** backend.
3. In **Project settings → General**, copy your web app's config into
   `src/firebase-config.js`, replacing the `YOUR_...` placeholders — or set
   env vars before building (they take precedence):

   ```bash
   VITE_FIREBASE_API_KEY=... VITE_FIREBASE_AUTH_DOMAIN=... \
   VITE_FIREBASE_PROJECT_ID=... VITE_FIREBASE_STORAGE_BUCKET=... \
   VITE_FIREBASE_MESSAGING_SENDER_ID=... VITE_FIREBASE_APP_ID=... \
   npm run build
   ```

4. **App Check (local dev):** the app uses the debug provider. A debug
   token named `briefly-local` is already registered in Firebase console →
   **App Check → Apps → Manage debug tokens**. For local testing, put it in
   a local `.env` file (gitignored, never committed) as
   `VITE_APPCHECK_DEBUG_TOKEN=...` and rebuild — the app picks it up.
   Without it, the SDK auto-generates a token and prints it to the console.
   App Check is **left Unregistered** (no attestation provider) by decision
   23 Nov 2026 — the classic reCAPTCHA path is deprecated and the
   Enterprise/Fraud Defense path needs billing, so it was skipped. Do NOT
   set `VITE_APPCHECK_DEBUG_TOKEN` for a deploy build.

Without a config, the app shows a friendly setup guide instead of calling
Firebase — it never crashes.

## Demo mode

Add `?demo=1` to the URL to try the full UI flow without a Firebase project.
A yellow banner marks it clearly: **"DEMO MODE — simulated response, no
Firebase call."** The simulator derives the brief from the notes you paste
(naive sentence extraction + action items from lines mentioning
TODO/action/by/due) and simulates the same routing badge. Demo mode is never
the default; the real Firebase path is used as soon as a real config exists.

## Tests

```bash
npm test   # Playwright headless Chromium: load, demo flow, no-config flow, SDK debug surface
```

See [BUILD-VERIFY.md](./BUILD-VERIFY.md) for the verification results.

## License

MIT — see [LICENSE](./LICENSE).
