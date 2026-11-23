// Briefly — DEMO MODE simulator (active ONLY with ?demo=1).
// Produces a plausible brief derived from the actual input text, so the full
// UI flow can be tested end-to-end without a Firebase project. It is NOT a
// fixed canned answer: the title, summary bullets, action items and key
// dates are all extracted from the notes the user pasted.
// No Firebase call is made in demo mode.

const ACTION_HINTS = /\b(todo|action|follow[- ]?up|assign|deadline|due|by\s+\w+day|please|need to|must|should|will)\b/i;
const DATE_RE =
  /\b(?:\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4}|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2}|(?:next\s+)?(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)|tomorrow|today|end of (?:week|month|quarter)|Q[1-4]\s*\d{2,4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?)\b/gi;

function splitSentences(text) {
  return String(text || "")
    .replace(/\r\n?/g, "\n")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.replace(/^[-*•\d.)\s]+/, "").trim())
    .filter((s) => s.length > 3);
}

const OWNER_STOPWORDS = new Set([
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Sept",
  "Oct", "Nov", "Dec", "January", "February", "March", "April", "June",
  "July", "August", "September", "October", "November", "December",
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  "Sunday", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
  "We", "The", "This", "That", "Next", "Team",
]);

function extractOwner(line) {
  // "… by Sarah …", "… @sarah …", "Sarah: …", "Sarah to …"
  const m =
    line.match(/\bby\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/) ||
    line.match(/@([A-Za-z][\w.]+)/) ||
    line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*[:–-]\s/) ||
    line.match(/\b([A-Z][a-z]+)\s+(?:to|will|should|must)\b/);
  if (!m) return "";
  const name = m[1].replace(/^@/, "");
  // "by Nov 25" is a date, not a person — never report a month/weekday as owner.
  if (OWNER_STOPWORDS.has(name.split(" ")[0])) return "";
  return name;
}

function extractDue(line) {
  const m = line.match(DATE_RE);
  return m ? m[0] : "";
}

function scoreSentence(s, idx) {
  // Prefer sentences with numbers, names, decisions and keywords.
  let score = 10 - Math.min(idx, 8);
  if (/\d/.test(s)) score += 3;
  if (/\b(decided|agreed|launch|deadline|budget|release|launch|important|key|main)\b/i.test(s)) score += 3;
  if (/\b(we|team|project|client|customer)\b/i.test(s)) score += 1;
  return score;
}

/**
 * Simulate a brief from the input notes. Returns the same shape as the real
 * path: { brief, source, latencyMs, wordCount }.
 * @param {string} notes
 * @param {"auto"|"on-device"|"cloud"} uiMode
 */
export async function generateDemoBrief(notes, uiMode, onProgress) {
  const startedAt = performance.now();
  const wordCount = (notes || "").trim().split(/\s+/).filter(Boolean).length;

  // Simulated work so progress UI is visible.
  onProgress?.("Simulating on-device inference…", undefined);
  await new Promise((r) => setTimeout(r, 350));
  onProgress?.("Simulating brief generation…", undefined);
  await new Promise((r) => setTimeout(r, 350));

  const sentences = splitSentences(notes);
  const lines = String(notes || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // Title: first meaningful line/sentence, trimmed to a title.
  let title = sentences[0] || "Untitled notes";
  title = title.replace(/\.$/, "");
  if (title.length > 72) title = title.slice(0, 69).trimEnd() + "…";
  title = title.charAt(0).toUpperCase() + title.slice(1);

  // Summary: top-scored sentences, 3–5, in original order.
  const ranked = sentences
    .map((s, i) => ({ s, i, score: scoreSentence(s, i) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .sort((a, b) => a.i - b.i)
    .map((x) => x.s);
  const summary = ranked.slice(0, Math.max(3, Math.min(5, ranked.length)));
  if (summary.length === 0) summary.push("No clear points could be extracted from these notes.");

  // Action items: lines/sentences mentioning TODO/action/by/due, etc.
  const actionItems = [];
  for (const line of [...lines, ...sentences]) {
    if (actionItems.length >= 8) break;
    if (!ACTION_HINTS.test(line)) continue;
    const task = line
      .replace(/^(todo|action)[:\s-]*/i, "")
      .replace(/\s+/g, " ")
      .trim();
    if (task.length < 4) continue;
    if (actionItems.some((a) => a.task.toLowerCase() === task.toLowerCase())) continue;
    actionItems.push({
      task: task.length > 140 ? task.slice(0, 137).trimEnd() + "…" : task,
      owner: extractOwner(line),
      due: extractDue(line),
    });
  }

  // Key dates: unique date-like strings found in the notes.
  const keyDates = [];
  for (const m of String(notes || "").matchAll(DATE_RE)) {
    if (!keyDates.includes(m[0])) keyDates.push(m[0]);
    if (keyDates.length >= 8) break;
  }

  // Simulated routing badge mirrors the real routing rule.
  const simulatedOnDevice =
    uiMode === "on-device" ||
    (uiMode === "auto" && wordCount <= 600);
  const source = simulatedOnDevice ? "on_device" : "in_cloud";

  return {
    brief: { title, summary, actionItems, keyDates },
    source,
    latencyMs: Math.round(performance.now() - startedAt),
    wordCount,
    simulated: true,
  };
}
