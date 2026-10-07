/**
 * Latency probe (module: test-cases/platform-security + reports/coverage.md "Performance").
 * Measures the deterministic (non-LLM) request paths only: LLM latency depends on the
 * upstream provider and cannot be reproduced without provider credentials.
 *
 * Usage: BASE_URL=http://localhost:3000 node harness/automation/performance/api-latency.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { BASE_URL, REPO_ROOT, postJson, getUrl, serverReachable } from "../utilities/http.mjs";

const OUT_DIR = process.env.RESULT_DIR || path.join(REPO_ROOT, "harness", "test-results", "latest", "raw");
const ITERATIONS = Number(process.env.ITERATIONS || 15);

const percentile = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)];
const stats = (samples) => {
  const sorted = [...samples].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  return {
    n: sorted.length,
    min_ms: sorted[0],
    mean_ms: Math.round(sum / sorted.length),
    p50_ms: percentile(sorted, 50),
    p95_ms: percentile(sorted, 95),
    max_ms: sorted[sorted.length - 1],
  };
};

if (!(await serverReachable())) {
  console.error(`[perf] server not reachable at ${BASE_URL} - start it with "npm run dev"`);
  process.exit(2);
}

const probes = {
  "GET / (SSR shell)": () => getUrl("/"),
  "GET /data/hitesh-tone.json (static data)": () => getUrl("/data/hitesh-tone.json"),
  "POST /api/chat (validation error path)": () => postJson("/api/chat", {}),
  "POST /api/fetch-image (name=Hitesh)": () => postJson("/api/fetch-image", { name: "Hitesh" }),
  "POST /api/create-persona (missing name)": () => postJson("/api/create-persona", {}),
};

const results = {};
for (const [label, fn] of Object.entries(probes)) {
  const samples = [];
  let lastStatus = null;
  for (let i = 0; i < ITERATIONS; i++) {
    const res = await fn();
    samples.push(res.ms);
    lastStatus = res.status;
  }
  results[label] = { status: lastStatus, iterations: ITERATIONS, ...stats(samples) };
}

const report = {
  generated_at: new Date().toISOString(),
  base_url: BASE_URL,
  environment: "dev server (next dev --turbopack), sandboxed single-core container",
  caveat: "Cold-start and network-dependent values vary; the LLM round trip is NOT measured (needs provider keys).",
  results,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "performance-latency.json"), JSON.stringify(report, null, 2));

const rows = Object.entries(results)
  .map(([label, s]) => `| ${label} | ${s.status} | ${s.p50_ms} | ${s.p95_ms} | ${s.min_ms} | ${s.max_ms} |`)
  .join("\n");
const md = `# Latency probe (RUN-2026-001)

- Base URL: ${BASE_URL}
- Environment: ${report.environment}
- Iterations per probe: ${ITERATIONS}
- Generated: ${report.generated_at}
- Caveat: ${report.caveat}

| Probe | Last status | p50 (ms) | p95 (ms) | min (ms) | max (ms) |
|---|---|---|---|---|---|
${rows}
`;
fs.writeFileSync(path.join(OUT_DIR, "performance-latency.md"), md);
console.log(md);
