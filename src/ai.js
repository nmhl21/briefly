// Briefly — all Firebase AI Logic code lives here.
// Hybrid inference: short notes -> on-device Gemini Nano, long notes ->
// cloud Gemini, with the SAME structured-output JSON schema on both paths.
//
// Verified against firebase@13.4.0 typings (@firebase/ai):
//   getAI(app, { backend: new GoogleAIBackend() })
//   getGenerativeModel(ai, { mode, inCloudParams, onDeviceParams })
//   model.initializeDeviceModel(progressCb)  — call from a user gesture,
//     BEFORE generateContent, when the on-device path may be used.
//   model.generateContent(prompt) -> result.response.text()
//   result.response.inferenceSource -> "on_device" | "in_cloud"

import { initializeApp } from "firebase/app";
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  InferenceMode,
  Schema,
} from "firebase/ai";
import { initializeAppCheck } from "firebase/app-check";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

export const ON_DEVICE_WORD_LIMIT = 600;
export const CLOUD_MODEL = "gemini-3-flash-preview";

/**
 * The ONE structured-output schema, used identically on both paths:
 *  - cloud: as a typed Schema (responseSchema)
 *  - on-device: as a plain JSON-schema object (responseConstraint)
 */
export const BRIEF_SCHEMA_JSON = {
  type: "object",
  properties: {
    title: { type: "string" },
    summary: { type: "array", items: { type: "string" } },
    actionItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          task: { type: "string" },
          owner: { type: "string" },
          due: { type: "string" },
        },
        required: ["task"],
      },
    },
    keyDates: { type: "array", items: { type: "string" } },
  },
  required: ["title", "summary", "actionItems"],
};

/** Cloud-side typed Schema built from the same shape as BRIEF_SCHEMA_JSON. */
export function buildCloudSchema() {
  return Schema.object({
    properties: {
      title: Schema.string(),
      summary: Schema.array({ items: Schema.string() }),
      actionItems: Schema.array({
        items: Schema.object({
          properties: {
            task: Schema.string(),
            owner: Schema.string(),
            due: Schema.string(),
          },
          // Only "task" is required; owner/due are optional.
          optionalProperties: ["owner", "due"],
        }),
      }),
      keyDates: Schema.array({ items: Schema.string() }),
    },
    // keyDates is optional; everything else is required.
    optionalProperties: ["keyDates"],
  });
}

export function countWords(text) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  return words.length;
}

const PROMPT_TEMPLATE = `Turn the messy notes below into a structured brief.
Return ONLY a JSON object matching this schema — no markdown fences, no extra text:
{
  "title": "short descriptive title",
  "summary": ["3-5 concise bullet points capturing the key points"],
  "actionItems": [{"task": "...", "owner": "person or empty string", "due": "date or empty string"}],
  "keyDates": ["any important dates mentioned, as written in the notes"]
}
Rules: summary must have 3-5 items. actionItems: extract every task, owner and
deadline you can find; use "" when owner or due is not stated. keyDates may be
empty. Do not invent facts that are not in the notes.

NOTES:
"""${"__NOTES__"}"""`;

let firebaseApp = null;
let ai = null;
let appCheckReady = false;

/** Debug surface for automated verification (see BUILD-VERIFY.md). */
export const debugState = {
  sdkLoaded: true,
  modelCreated: false,
  initializeDeviceModelIsFunction: false,
  lastInferenceSource: null,
  lastError: null,
};

if (typeof window !== "undefined") {
  window.__brieflyDebug = debugState;
}

function ensureFirebase() {
  if (firebaseApp) return;
  firebaseApp = initializeApp(firebaseConfig);
  // App Check debug provider for local dev. If VITE_APPCHECK_DEBUG_TOKEN
  // is set (local .env only, never committed), the SDK uses that
  // registered debug token; otherwise it auto-generates one and prints it
  // to the browser console. App Check is NOT enforced in this project
  // (left Unregistered by user decision 23 Nov 2026), so a debug token is
  // only for local testing — never set it for a deploy build.
  try {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN =
      import.meta.env.VITE_APPCHECK_DEBUG_TOKEN || true;
    initializeAppCheck(firebaseApp, { isTokenAutoRefreshEnabled: true });
    appCheckReady = true;
  } catch (err) {
    console.warn("[Briefly] App Check init skipped:", err);
  }
  ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
}

function modeForRequest(uiMode, wordCount) {
  // uiMode: "auto" | "on-device" | "cloud"
  if (uiMode === "on-device") return InferenceMode.ONLY_ON_DEVICE;
  if (uiMode === "cloud") return InferenceMode.PREFER_IN_CLOUD;
  // Auto: short notes stay private + instant on-device; long notes go cloud.
  return wordCount <= ON_DEVICE_WORD_LIMIT
    ? InferenceMode.PREFER_ON_DEVICE
    : InferenceMode.PREFER_IN_CLOUD;
}

/**
 * Create the hybrid generative model for the given mode.
 * Exposed for verification: proves getGenerativeModel is really called and
 * that the returned model has initializeDeviceModel.
 */
export function createModel(uiMode, wordCount) {
  ensureFirebase();
  const mode = modeForRequest(uiMode, wordCount);
  const model = getGenerativeModel(ai, {
    mode,
    inCloudParams: {
      model: CLOUD_MODEL,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: buildCloudSchema(),
      },
    },
    onDeviceParams: {
      promptOptions: { responseConstraint: BRIEF_SCHEMA_JSON },
    },
  });
  debugState.modelCreated = true;
  debugState.initializeDeviceModelIsFunction =
    typeof model.initializeDeviceModel === "function";
  return { model, mode };
}

/**
 * Detect whether on-device (Gemini Nano / Prompt API) is available in this
 * browser. Headless Chromium has no Nano model, so this correctly reports
 * unavailable there. Never throws.
 * Returns { available: boolean, detail: string }.
 */
export async function detectOnDevice() {
  try {
    const LM = globalThis.LanguageModel;
    if (typeof LM === "undefined") {
      return {
        available: false,
        detail:
          "Prompt API not present in this browser (needs Chrome Desktop 139+ with the Gemini Nano flag enabled).",
      };
    }
    if (typeof LM.availability === "function") {
      const status = await LM.availability();
      // "available" | "downloadable" | "downloading" | "unavailable"
      if (status === "available") {
        return { available: true, detail: "Gemini Nano is ready on this device." };
      }
      if (status === "downloadable" || status === "downloading") {
        return {
          available: false,
          detail: `Gemini Nano model is ${status} — it will download on first use.`,
        };
      }
      return {
        available: false,
        detail: `Gemini Nano reports status "${status}" in this browser.`,
      };
    }
    return {
      available: false,
      detail: "Prompt API found but availability() is not exposed.",
    };
  } catch (err) {
    return {
      available: false,
      detail: `On-device check failed: ${err?.message || err}`,
    };
  }
}

function parseBriefJson(text) {
  const cleaned = String(text || "")
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const parsed = JSON.parse(cleaned);
  if (!parsed || typeof parsed !== "object") throw new Error("Model did not return an object.");
  return {
    title: typeof parsed.title === "string" ? parsed.title : "Untitled brief",
    summary: Array.isArray(parsed.summary)
      ? parsed.summary.filter((s) => typeof s === "string")
      : [],
    actionItems: Array.isArray(parsed.actionItems)
      ? parsed.actionItems
          .filter((a) => a && typeof a.task === "string")
          .map((a) => ({
            task: a.task,
            owner: typeof a.owner === "string" ? a.owner : "",
            due: typeof a.due === "string" ? a.due : "",
          }))
      : [],
    keyDates: Array.isArray(parsed.keyDates)
      ? parsed.keyDates.filter((d) => typeof d === "string")
      : [],
  };
}

function friendlyError(err, uiMode) {
  const msg = String(err?.message || err || "Unknown error");
  // The Firebase SDK wraps raw HTTP failures inside its message, e.g.
  // "... [404 Not Found] ...". Surface that status so a server rejection
  // is never disguised as a plain "Network error".
  const statusMatch = msg.match(/\[\d{3}[^\]]*\]/);
  const serverNote = statusMatch ? ` Server response: ${statusMatch[0]}.` : "";
  if (/api key|api-key|API_KEY|401|403|permission/i.test(msg)) {
    return "Firebase rejected the request (bad or missing API key / project not enabled for AI Logic). Check your Firebase config and that AI Logic is enabled for the Gemini Developer API.";
  }
  if (/on-device|device model|download|not available|unavailable/i.test(msg)) {
    if (uiMode === "on-device") {
      return "On-device model is not available in this browser (needs Chrome Desktop 139+ with Gemini Nano enabled). Try Auto or Cloud mode.";
    }
    return "On-device model could not start; the cloud path will be tried automatically in Auto mode.";
  }
  if (/network|fetch|failed to fetch|offline/i.test(msg)) {
    return `Network error while calling Firebase AI Logic. Check your connection and try again.${serverNote}`;
  }
  return `Brief generation failed: ${msg}${serverNote}`;
}

/**
 * Generate a structured brief from raw notes via Firebase AI Logic.
 *
 * @param {string} notes
 * @param {"auto"|"on-device"|"cloud"} uiMode
 * @param {(stage: string, progress?: number) => void} onProgress
 * @returns {Promise<{brief: object, source: string, latencyMs: number, wordCount: number, mode: string}>}
 * @throws Error with a user-friendly message (never crashes the page).
 */
export async function generateBrief(notes, uiMode, onProgress) {
  const startedAt = performance.now();
  const wordCount = countWords(notes);
  debugState.lastError = null;

  if (!isFirebaseConfigured()) {
    throw new Error(
      "SETUP_REQUIRED: Firebase is not configured yet. Follow the setup guide below to add your Firebase project config, then reload."
    );
  }

  const { model, mode } = createModel(uiMode, wordCount);
  const needsOnDevice =
    mode === InferenceMode.ONLY_ON_DEVICE ||
    mode === InferenceMode.PREFER_ON_DEVICE;

  // MUST be called from the user gesture (Generate click) and BEFORE
  // generateContent, when the on-device path may be used.
  if (needsOnDevice) {
    onProgress?.("Preparing on-device model…", undefined);
    try {
      await model.initializeDeviceModel((progress) => {
        // progress is 0..1 download fraction.
        onProgress?.("Downloading on-device model…", Math.round(progress * 100));
      });
    } catch (err) {
      if (mode === InferenceMode.ONLY_ON_DEVICE) {
        debugState.lastError = String(err?.message || err);
        throw new Error(friendlyError(err, uiMode));
      }
      // PREFER_ON_DEVICE: the SDK falls back to cloud automatically.
      console.warn("[Briefly] initializeDeviceModel failed, falling back to cloud:", err);
    }
  }

  onProgress?.("Generating brief…", undefined);
  let result;
  try {
    result = await model.generateContent(
      PROMPT_TEMPLATE.replace("__NOTES__", notes)
    );
  } catch (err) {
    debugState.lastError = String(err?.message || err);
    throw new Error(friendlyError(err, uiMode));
  }

  const text = result.response.text();
  const source = result.response.inferenceSource || "unknown";
  debugState.lastInferenceSource = source;

  let brief;
  try {
    brief = parseBriefJson(text);
  } catch (err) {
    debugState.lastError = `JSON parse failed: ${err?.message}`;
    throw new Error(
      "The model returned a response that could not be parsed as a brief. Please try again."
    );
  }

  return {
    brief,
    source,
    latencyMs: Math.round(performance.now() - startedAt),
    wordCount,
    mode: String(mode),
  };
}

export { isFirebaseConfigured, appCheckReady };
