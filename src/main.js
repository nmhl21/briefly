// Briefly — UI wiring (single page, no framework).
// Flow: user pastes notes -> picks a mode -> Generate.
//   ?demo=1            -> simulated brief (demo.js), banner shown, no Firebase.
//   real Firebase config -> generateBrief() in ai.js (Firebase AI Logic).
//   no config, no demo  -> friendly setup guide, no crash.
import { generateBrief, detectOnDevice, countWords, isFirebaseConfigured, ON_DEVICE_WORD_LIMIT, createModel, debugState } from "./ai.js";
import { generateDemoBrief } from "./demo.js";

const $ = (sel) => document.querySelector(sel);

const params = new URLSearchParams(location.search);
export const DEMO_MODE = params.get("demo") === "1";

const HISTORY_KEY = "briefly.history.v1";
const MAX_HISTORY = 10;

const SAMPLE_SHORT = `Team sync — Nov 20, 2026
We agreed to launch the new onboarding flow on Dec 2. Sarah will finish the empty-state illustrations by Nov 25, and Budi will wire up the analytics events before the launch. TODO: Priya to confirm the pricing page copy with Legal by Friday. We also decided to pause the referral program until January because the fraud checks are not ready yet. Next sync is Monday, Nov 24 at 10:00.`;

const SAMPLE_LONG = `Lecture notes — Introduction to Distributed Systems (week 9)
Today the professor covered consensus and why it is hard. The main idea: in an asynchronous network with crash failures, you cannot guarantee both safety and liveness at the same time — that is the FLP impossibility result from 1985. Paxos was presented as the classic solution; Raft was introduced as the more understandable alternative that most real systems use today. The professor stressed that Raft elects a leader, replicates a log, and only commits an entry once a majority has stored it. We worked through an example where a leader crashes mid-replication and a new election starts; the key point was that the new leader must have the most up-to-date log or data can be lost. TODO: read the Raft paper (Ongaro & Ousterhout 2014) before Thursday's tutorial. The assignment is due Dec 12: implement a simplified Raft node in Go that handles leader election and log replication, with tests covering a crashed leader and a partitioned network. The professor also mentioned that the midterm is on Dec 5 and will cover chapters 4 to 7, with a focus on vector clocks and causal ordering. There was a question about the CAP theorem: the professor said to think of it as a spectrum, not a binary choice, and that most systems choose availability with eventual consistency. A student asked whether blockchain counts as a consensus protocol; the answer was yes, Nakamoto consensus is a probabilistic form of consensus that trades finality for openness. TODO: form study groups of three by Friday Nov 28 and post the group list on the course forum. Office hours move to Wednesday 14:00 from next week. The final exam is scheduled for Jan 20, 2027, and the project demo day is Jan 13. Remember to bring the lab report to the next session, and the teaching assistant will collect the homework on Monday.

The second half of the lecture moved to failure detection and membership. The professor explained that in a large cluster you cannot rely on a single coordinator to notice crashes, so systems use gossip protocols: every node periodically exchanges state with a few random peers, and information about a failed node spreads through the cluster in logarithmic time. We compared this with heartbeat-based detection, which is simpler but creates a bottleneck at the monitor. A student asked how long to wait before declaring a node dead; the professor said there is no perfect timeout, only a trade-off between false positives and slow detection, and that most systems use an adaptive timeout based on observed network delays. TODO: implement a simple gossip-based failure detector as an optional bonus in the assignment, due with the main submission on Dec 12. The professor then covered two-phase commit: the coordinator asks all participants to prepare, waits for yes votes, and then sends commit or abort. The key weakness is blocking — if the coordinator crashes after the prepare phase, participants are stuck holding locks until it recovers. Three-phase commit adds a pre-commit round to avoid blocking in some cases, but it still cannot survive network partitions, which is why modern systems prefer Paxos or Raft. The last topic was vector clocks: each node keeps a counter per node, stamps every event, and two events are concurrent when neither vector dominates the other. The professor gave an example with three nodes exchanging messages and asked us to compute the clock values on the whiteboard; most of the class got it right on the second try. TODO: solve the vector clock exercise in chapter 6 before the tutorial on Thursday. The reading list for next week is chapters 8 and 9, plus the Dynamo paper, and the professor reminded everyone that the lab machines will be down for maintenance on Saturday Dec 6 from 08:00 to 12:00. Bring your laptop to the lab session on Dec 8 because we will run the Raft demo on the cluster.`;

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showError(message) {
  const el = $("#errorBox");
  el.innerHTML = `<strong>Something went wrong.</strong><br>${escapeHtml(message)}`;
  el.hidden = false;
}

function hideError() {
  const el = $("#errorBox");
  el.hidden = true;
  el.textContent = "";
}

function setProgress(text, percent) {
  const bar = $("#progressBar");
  const label = $("#progressLabel");
  if (!text) {
    bar.hidden = true;
    label.textContent = "";
    return;
  }
  bar.hidden = false;
  label.textContent = text;
  const fill = $("#progressFill");
  if (typeof percent === "number") {
    fill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    label.textContent = `${text} (${percent}%)`;
  } else {
    fill.style.width = "100%";
    fill.classList.add("indeterminate");
  }
}

function clearProgress() {
  const bar = $("#progressBar");
  bar.hidden = true;
  $("#progressLabel").textContent = "";
  $("#progressFill").style.width = "0%";
  $("#progressFill").classList.remove("indeterminate");
}

function setBusy(busy) {
  $("#generateBtn").disabled = busy;
  $("#notes").disabled = busy;
}

function sourceBadge(source, simulated) {
  if (simulated) {
    return source === "on_device"
      ? "Simulated · On-device (demo)"
      : "Simulated · Cloud (demo)";
  }
  if (source === "on_device") return "On-device · Gemini Nano";
  if (source === "in_cloud") return "Cloud · Gemini";
  return `Inference: ${source}`;
}

function renderBrief(result) {
  const { brief, source, latencyMs, wordCount, simulated } = result;
  const badge = sourceBadge(source, simulated);
  const badgeClass = source === "on_device" ? "badge-device" : "badge-cloud";
  const el = $("#result");
  el.hidden = false;
  el.innerHTML = `
    <div class="result-head">
      <span class="source-badge ${badgeClass}">${escapeHtml(badge)}</span>
      <span class="meta">${escapeHtml(String(latencyMs))} ms · ${escapeHtml(String(wordCount))} words${simulated ? " · demo" : ""}</span>
    </div>
    <h2 class="brief-title">${escapeHtml(brief.title)}</h2>
    <h3>Summary</h3>
    <ul class="summary-list">
      ${brief.summary.map((s) => `<li>${escapeHtml(s)}</li>`).join("") || "<li>No summary points.</li>"}
    </ul>
    <h3>Action items</h3>
    ${
      brief.actionItems.length
        ? `<table class="actions-table">
            <thead><tr><th>Task</th><th>Owner</th><th>Due</th></tr></thead>
            <tbody>
              ${brief.actionItems
                .map(
                  (a) =>
                    `<tr><td>${escapeHtml(a.task)}</td><td>${escapeHtml(a.owner || "—")}</td><td>${escapeHtml(a.due || "—")}</td></tr>`
                )
                .join("")}
            </tbody>
          </table>`
        : "<p class=\"muted\">No action items found in these notes.</p>"
    }
    <h3>Key dates</h3>
    ${
      brief.keyDates.length
        ? `<ul class="dates-list">${brief.keyDates.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>`
        : "<p class=\"muted\">No key dates mentioned.</p>"
    }
    <div class="result-actions">
      <button id="copyMdBtn" type="button">Copy Markdown</button>
      <button id="copyJsonBtn" type="button">Copy JSON</button>
    </div>
    <details class="raw-json">
      <summary>Raw JSON</summary>
      <pre>${escapeHtml(JSON.stringify(brief, null, 2))}</pre>
    </details>
  `;
  $("#copyMdBtn").addEventListener("click", () => copyText(toMarkdown(brief)));
  $("#copyJsonBtn").addEventListener("click", () => copyText(JSON.stringify(brief, null, 2)));
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toMarkdown(brief) {
  const lines = [`# ${brief.title}`, "", "## Summary", ""];
  for (const s of brief.summary) lines.push(`- ${s}`);
  lines.push("", "## Action items", "");
  if (brief.actionItems.length) {
    lines.push("| Task | Owner | Due |", "| --- | --- | --- |");
    for (const a of brief.actionItems) {
      lines.push(`| ${a.task} | ${a.owner || "—"} | ${a.due || "—"} |`);
    }
  } else {
    lines.push("None.");
  }
  lines.push("", "## Key dates", "");
  if (brief.keyDates.length) for (const d of brief.keyDates) lines.push(`- ${d}`);
  else lines.push("None.");
  return lines.join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    const label = $("#copyStatus");
    label.textContent = "Copied to clipboard.";
    setTimeout(() => (label.textContent = ""), 2000);
  } catch {
    const label = $("#copyStatus");
    label.textContent = "Copy failed — select the text manually.";
  }
}

// ---------- History (localStorage, max 10) ----------
function loadHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveHistoryEntry(entry) {
  const history = loadHistory();
  history.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  const list = $("#historyList");
  const empty = $("#historyEmpty");
  if (!history.length) {
    list.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  list.innerHTML = history
    .map(
      (h, i) => `
      <li class="history-item">
        <button type="button" class="history-load" data-idx="${i}">
          <span class="history-title">${escapeHtml(h.title)}</span>
          <span class="history-meta">${escapeHtml(h.sourceLabel)} · ${escapeHtml(String(h.wordCount))} words · ${escapeHtml(h.when)}</span>
        </button>
      </li>`
    )
    .join("");
  list.querySelectorAll(".history-load").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entry = loadHistory()[Number(btn.dataset.idx)];
      if (!entry) return;
      $("#notes").value = entry.notes;
      updateWordCount();
      renderBrief({
        brief: entry.brief,
        source: entry.source,
        latencyMs: entry.latencyMs,
        wordCount: entry.wordCount,
        simulated: entry.simulated,
      });
      hideError();
    });
  });
}

// ---------- Setup guide (no config, no demo) ----------
function showSetupGuide() {
  const el = $("#setupGuide");
  el.hidden = false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---------- On-device status badge ----------
async function updateDeviceBadge() {
  const badge = $("#deviceBadge");
  badge.textContent = "Checking on-device…";
  badge.className = "device-badge checking";
  const status = await detectOnDevice();
  if (status.available) {
    badge.textContent = "On-device: Available";
    badge.className = "device-badge available";
  } else {
    badge.textContent = "On-device: Unavailable in this browser";
    badge.className = "device-badge unavailable";
  }
  badge.title = status.detail;
  $("#deviceDetail").textContent = status.detail;
}

// ---------- Word count ----------
function updateWordCount() {
  const n = countWords($("#notes").value);
  $("#wordCount").textContent = `${n} word${n === 1 ? "" : "s"}`;
  const route =
    n <= ON_DEVICE_WORD_LIMIT
      ? `Auto routing: ≤ ${ON_DEVICE_WORD_LIMIT} words → on-device`
      : `Auto routing: > ${ON_DEVICE_WORD_LIMIT} words → cloud`;
  $("#routingHint").textContent = route;
}

// ---------- Generate ----------
async function onGenerate() {
  const notes = $("#notes").value.trim();
  hideError();
  $("#setupGuide").hidden = true;
  $("#result").hidden = true;
  if (!notes) {
    showError("Paste some notes first — the textarea is empty.");
    return;
  }
  const mode = document.querySelector('input[name="mode"]:checked').value;
  setBusy(true);
  try {
    let result;
    if (DEMO_MODE) {
      result = await generateDemoBrief(notes, mode, setProgress);
    } else if (!isFirebaseConfigured()) {
      showSetupGuide();
      return;
    } else {
      result = await generateBrief(notes, mode, setProgress);
    }
    renderBrief(result);
    saveHistoryEntry({
      title: result.brief.title,
      brief: result.brief,
      notes,
      source: result.source,
      sourceLabel: sourceBadge(result.source, result.simulated),
      latencyMs: result.latencyMs,
      wordCount: result.wordCount,
      simulated: !!result.simulated,
      when: new Date().toLocaleString(),
    });
  } catch (err) {
    const msg = String(err?.message || err);
    if (msg.startsWith("SETUP_REQUIRED")) {
      showSetupGuide();
    } else {
      showError(msg);
    }
  } finally {
    clearProgress();
    setBusy(false);
  }
}

// ---------- Init ----------
function init() {
  // Verification hook (see BUILD-VERIFY.md item 2d): proves the real SDK
  // path is wired — getGenerativeModel runs and the model exposes
  // initializeDeviceModel — even with placeholder config. It only builds
  // the model object; it never calls generateContent or the network.
  if (typeof window !== "undefined" && window.__brieflyDebug) {
    window.__brieflyDebug.probeModel = (mode, wordCount) => {
      try {
        createModel(mode || "auto", wordCount || 10);
        return { ok: true, ...debugState };
      } catch (err) {
        return { ok: false, error: String(err?.message || err), ...debugState };
      }
    };
  }
  if (DEMO_MODE) {
    $("#demoBanner").hidden = false;
    document.title = "Briefly (Demo) — structured briefs from messy notes";
  }
  $("#notes").addEventListener("input", updateWordCount);
  $("#generateBtn").addEventListener("click", onGenerate);
  $("#loadShortBtn").addEventListener("click", () => {
    $("#notes").value = SAMPLE_SHORT;
    updateWordCount();
    hideError();
  });
  $("#loadLongBtn").addEventListener("click", () => {
    $("#notes").value = SAMPLE_LONG;
    updateWordCount();
    hideError();
  });
  $("#clearBtn").addEventListener("click", () => {
    $("#notes").value = "";
    updateWordCount();
    $("#result").hidden = true;
    hideError();
  });
  $("#clearHistoryBtn").addEventListener("click", () => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  });
  updateWordCount();
  renderHistory();
  updateDeviceBadge();
}

document.addEventListener("DOMContentLoaded", init);
