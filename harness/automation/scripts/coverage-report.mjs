/**
 * Derives the coverage numbers published in reports/coverage.md from the documentation itself.
 * Usage: node harness/automation/scripts/coverage-report.mjs [--json]
 *
 * Counting rules (documented in reports/coverage.md):
 *  - test cases are counted from their `| Status | ... |` field in test-cases/<module>/*.md
 *  - scenarios are counted from the last column of their table row in test-scenarios/*.md
 *  - requirements are counted from the Status column of requirements/*.md
 *  - features are counted from features/README.md (documented) and the cases referenced by their test-cases.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HARNESS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p) => fs.readFileSync(p, "utf8");
const filesIn = (dir, ext = ".md") =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return filesIn(full, ext);
    return e.name.endsWith(ext) ? [full] : [];
  });

const bump = (obj, key) => (obj[key] = (obj[key] || 0) + 1);

/* ---------- test cases ---------- */
const caseStatuses = {};
const caseIds = new Set();
for (const file of filesIn(path.join(HARNESS, "test-cases"))) {
  const text = read(file);
  for (const m of text.matchAll(/^### (TC-\d+)\b.*$/gm)) caseIds.add(m[1]);
  const blocks = text.split(/^### /m).slice(1);
  for (const block of blocks) {
    const id = (block.match(/^(TC-\d+)/) || [])[1];
    if (!id) continue;
    const status = (block.match(/\|\s*Status\s*\|\s*([^|]+)\|/) || [])[1];
    if (!status) continue;
    const norm = /PASS/i.test(status) && !/FAIL|NOT_EXECUTED|BLOCKED/i.test(status)
      ? "PASS"
      : /FAIL/.test(status)
      ? "FAIL"
      : /BLOCKED/.test(status)
      ? "BLOCKED"
      : /NOT_EXECUTED/.test(status)
      ? "NOT_EXECUTED"
      : "OTHER:" + status.trim();
    caseStatuses[id] = norm;
    bump(caseStatuses, "_" + norm);
    if (process.env.DEBUG_COVERAGE) console.error("case", id, "->", JSON.stringify(status.trim()), "=>", norm);
  }
}
for (const key of Object.keys(caseStatuses)) if (key.startsWith("_")) delete caseStatuses[key];
const caseTotals = { PASS: 0, FAIL: 0, BLOCKED: 0, NOT_EXECUTED: 0, OTHER: 0 };
for (const [id, status] of Object.entries(caseStatuses)) {
  if (id.startsWith("_")) continue;
  caseTotals[status.startsWith("OTHER") ? "OTHER" : status]++;
}

/* ---------- scenarios ---------- */
const scnStatuses = {};
for (const file of filesIn(path.join(HARNESS, "test-scenarios"))) {
  const text = read(file);
  for (const line of text.split("\n")) {
    const m = line.match(/^\|\s*(SCN-\d+)\s*\|(.*)\|\s*$/);
    if (!m) continue;
    const cells = m[2].split("|").map((c) => c.trim());
    scnStatuses[m[1]] = cells[cells.length - 1] || "";
  }
}
const scnTotals = {};
for (const [id, s] of Object.entries(scnStatuses)) {
  const key = /PASS|MEASURED/.test(s) && !/FAIL|PARTIAL|BLOCKED|NOT_EXECUTED/.test(s)
    ? "PASS/MEASURED"
    : /FAIL/.test(s)
    ? "FAIL"
    : /PARTIAL/.test(s)
    ? "PARTIAL"
    : /BLOCKED/.test(s)
    ? "BLOCKED"
    : /NOT_EXECUTED/.test(s)
    ? "NOT_EXECUTED"
    : /UNKNOWN/.test(s)
    ? "UNKNOWN"
    : "OTHER";
  bump(scnTotals, key);
}

/* ---------- requirements ---------- */
const reqStatuses = {};
for (const file of ["functional-requirements.md", "non-functional-requirements.md"]) {
  const text = read(path.join(HARNESS, "requirements", file));
  for (const line of text.split("\n")) {
    const m = line.match(/^\|\s*((?:REQ|NFR)-\d+)\s*\|(.*)\|\s*$/);
    if (!m) continue;
    const cells = m[2].split("|").map((c) => c.trim());
    reqStatuses[m[1]] = cells[cells.length - 1];
  }
}
const reqTotals = {};
const normaliseReq = (raw) => {
  const token = String(raw).replace(/[`*]/g, "").trim().split(/[\s(:]/)[0].toUpperCase();
  const known = ["PASS", "FAIL", "PARTIAL", "COVERED", "BLOCKED", "NOT_EXECUTED", "GAP", "N/A"];
  return known.includes(token) ? token : raw.trim();
};
for (const s of Object.values(reqStatuses)) bump(reqTotals, normaliseReq(s));

/* ---------- features ---------- */
const features = fs.readdirSync(path.join(HARNESS, "features"), { withFileTypes: true })
  .filter((e) => e.isDirectory()).map((e) => e.name);
const featureCaseMap = {};
const automatedCaseIds = new Set();
for (const file of ["api", "ui", "utilities"].flatMap((d) => filesIn(path.join(HARNESS, "automation", d), ".test.mjs"))) {
  for (const m of read(file).matchAll(/"(TC-\d+)/g)) automatedCaseIds.add(m[1]);
}

for (const f of features) {
  const idx = path.join(HARNESS, "features", f, "test-cases.md");
  if (!fs.existsSync(idx)) continue;
  featureCaseMap[f] = [...new Set([...read(idx).matchAll(/TC-\d+/g)].map((m) => m[0]))];
}
const featuresWithCases = Object.keys(featureCaseMap).length;
const featuresWithAutomation = Object.values(featureCaseMap).filter((ids) =>
  ids.some((id) => automatedCaseIds.has(id))
).length;

/* ---------- business rules ---------- */
const brText = read(path.join(HARNESS, "requirements", "business-rules.md"));
const brRows = [...brText.matchAll(/^\|\s*(BR-\d+)\s*\|(.*)\|\s*$/gm)].map((m) => ({
  id: m[1],
  tested_by: m[2].split("|").map((c) => c.trim()).pop(),
}));
const brCovered = brRows.filter((r) => /TC-\d+/.test(r.tested_by)).length;

const report = {
  generated_at: new Date().toISOString(),
  test_cases: { total: Object.keys(caseStatuses).length, ...caseTotals },
  scenarios: { total: Object.keys(scnStatuses).length, ...scnTotals },
  requirements: { total: Object.keys(reqStatuses).length, ...reqTotals },
  features: {
    total: features.length,
    with_test_cases_index: featuresWithCases,
    with_automated_case: featuresWithAutomation,
  },
  business_rules: { total: brRows.length, with_linked_case: brCovered, without_case: brRows.length - brCovered },
  automated_cases_implemented: automatedCaseIds.size,
  automated_case_ids: [...automatedCaseIds].sort(),
  ids: { cases: [...caseIds].sort(), scenarios: Object.keys(scnStatuses).sort(), requirements: Object.keys(reqStatuses).sort() },
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("TEST CASES  ", report.test_cases);
  console.log("SCENARIOS   ", report.scenarios);
  console.log("REQUIREMENTS", report.requirements);
  console.log("FEATURES    ", report.features);
  console.log("BUSINESS RULES", report.business_rules);
  console.log("AUTOMATED CASES IMPLEMENTED:", report.automated_cases_implemented);
}
