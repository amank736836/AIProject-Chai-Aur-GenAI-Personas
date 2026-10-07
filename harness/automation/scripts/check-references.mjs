/**
 * Harness integrity checker: validates every ID reference and every relative markdown link.
 * Usage: node harness/automation/scripts/check-references.mjs   (exit 1 when problems are found)
 *
 * Why: the harness is a web of cross-references (REQ → FEAT → SCN → TC → BUG → RUN). A dangling id or a
 * broken relative link makes it unreliable for the next reader/agent, so it is checked mechanically.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HARNESS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const REPO = path.resolve(HARNESS, "..");

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.name === "raw") return []; // execution logs are not documentation
    if (e.isDirectory()) return walk(full);
    return [full];
  });

const mdFiles = walk(HARNESS).filter((f) => f.endsWith(".md"));
const scriptFiles = walk(path.join(HARNESS, "automation")).filter((f) => /\.(mjs|sh)$/.test(f));

/* ---------- 1. collect defined ids ---------- */
const defined = { TC: new Set(), SCN: new Set(), REQ: new Set(), NFR: new Set(), BR: new Set(), FEAT: new Set(), BUG: new Set(), RUN: new Set(), KI: new Set(), RISK: new Set() };

const addMatches = (set, text, regex) => {
  for (const m of text.matchAll(regex)) set.add(m[0].replace(/[^A-Z0-9-]/g, ""));
};

// TC + SCN from headings/tables; REQ/NFR from requirement tables and feature docs; FEAT from folder names
for (const f of mdFiles) {
  const text = fs.readFileSync(f, "utf8");
  addMatches(defined.TC, text, /^###\s+(TC-\d+)/gm);
  addMatches(defined.TC, text, /^\|\s*(TC-\d+)\s*\|/gm);
  addMatches(defined.SCN, text, /^\|\s*(SCN-\d+)\s*\|/gm);
  addMatches(defined.REQ, text, /^\|\s*(REQ-\d+)\s*\|/gm);
  addMatches(defined.NFR, text, /^\|\s*(NFR-\d+)\s*\|/gm);
  addMatches(defined.BR, text, /^\|\s*(BR-\d+)\s*\|/gm);
  addMatches(defined.KI, text, /^\|\s*(KI-\d+)\s*\|/gm);
  addMatches(defined.RISK, text, /(RISK-\d+)/g);
  addMatches(defined.BUG, text, /^\|\s*(BUG-\d+)\s*\|/gm);
  addMatches(defined.BUG, text, /^#\s+(BUG-\d+)/gm);
  addMatches(defined.RUN, text, /(RUN-\d{4}-\d+)/g);
}
for (const entry of fs.readdirSync(path.join(HARNESS, "features"), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const idx = path.join(HARNESS, "features", entry.name, "README.md");
  if (!fs.existsSync(idx)) continue;
  const id = (fs.readFileSync(idx, "utf8").match(/FEAT-\d{3}/) || [])[0];
  if (id) defined.FEAT.add(id);
}

/* ---------- 2. scan references ---------- */
const idPattern = /\b((?:TC|SCN|REQ|NFR|BR|FEAT|BUG|RUN|KI)-\d{3,4})\b/g;
const dangling = [];
for (const f of mdFiles) {
  const text = fs.readFileSync(f, "utf8");
  const rel = path.relative(HARNESS, f);
  // ignore the pattern definitions in the READMEs ("TC-###" style placeholders are not \d)
  for (const m of text.matchAll(idPattern)) {
    const [token, kind] = [m[0], m[1].slice(0, m[1].indexOf("-"))];
    const bucket = defined[kind] || defined.RUN;
    if (kind === "RUN") continue;
    if (bucket && !bucket.has(token)) dangling.push({ file: rel, token, kind });
  }
}
for (const f of scriptFiles) {
  const text = fs.readFileSync(f, "utf8");
  const rel = path.relative(HARNESS, f);
  for (const m of text.matchAll(idPattern)) {
    const token = m[0];
    const kind = token.slice(0, token.indexOf("-"));
    if (kind === "RUN") continue;
    if (defined[kind] && !defined[kind].has(token)) dangling.push({ file: rel, token, kind });
  }
}

/* ---------- 3. validate relative markdown links ---------- */
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
const brokenLinks = [];
for (const f of mdFiles) {
  const text = fs.readFileSync(f, "utf8");
  const rel = path.relative(HARNESS, f);
  for (const m of text.matchAll(linkPattern)) {
    const target = m[1].trim();
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const [filePart] = target.split("#");
    if (!filePart) continue;
    const resolved = path.resolve(path.dirname(f), filePart);
    if (!fs.existsSync(resolved)) brokenLinks.push({ file: rel, target });
  }
}

/* ---------- 4. report ---------- */
const counts = Object.fromEntries(
  Object.entries(defined).map(([k, v]) => [k, v.size])
);
console.log("defined ids:", counts);

if (dangling.length) {
  console.error(`\n✗ ${dangling.length} dangling id reference(s):`);
  for (const d of dangling.slice(0, 60)) console.error(`  ${d.file}: ${d.token}`);
} else {
  console.log("✓ no dangling id references");
}

if (brokenLinks.length) {
  console.error(`\n✗ ${brokenLinks.length} broken relative link(s):`);
  for (const b of brokenLinks.slice(0, 60)) console.error(`  ${b.file} -> ${b.target}`);
} else {
  console.log("✓ no broken relative links");
}

process.exit(dangling.length || brokenLinks.length ? 1 : 0);
