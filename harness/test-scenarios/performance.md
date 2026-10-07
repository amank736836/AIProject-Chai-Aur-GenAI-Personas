# Performance scenarios

Measurements come from `automation/performance/api-latency.mjs` on a **local dev server** in a sandboxed
single-core container (dev build, no CDN). They are useful as relative baselines, not as production SLAs.
Raw data: [`../evidence/performance/`](../evidence/performance/) and
`../test-results/latest/raw/performance-latency.md`.

| SCN | Scenario | Metric | Baseline (RUN-2026-001) | Case | Status |
|---|---|---|---|---|---|
| SCN-077 | Server-rendered shell latency | p95 of `GET /` | 72 ms (p50 56 ms, min 50 ms, max 72 ms, n=15) | TC-039 + perf probe | MEASURED (PASS vs NFR-007 < 500 ms) |
| SCN-078 | Deterministic API latency (validation error paths) | p95 of `/api/chat`, `/api/create-persona` 400 responses | 30 ms each (p50 22/21 ms, n=15) | TC-001, TC-015 | MEASURED (PASS vs NFR-008 < 200 ms) |
| SCN-079 | Single LLM round trip (provider latency) | wall-clock time of `POST /api/chat` with a reply | not measured — requires provider credentials | TC-025 | NOT_EXECUTED |
| SCN-080 | HiPi parallel round trip (2 provider calls) | wall-clock ≈ slower call, not the sum | not measured | TC-013 | NOT_EXECUTED |
| SCN-081 | Custom persona creation with `@handle` enrichment | wall-clock incl. 10 sequential profile fetches | not measured (offline) | TC-020 | NOT_EXECUTED |
| SCN-082 | Serverless cold start, memory, concurrency, API throughput | unknown — no deployment access | — | — | UNKNOWN / REQUIRES VALIDATION |

Non-measured risks: the HiPi prompt is ≈14 KB of characters per request (double the single-persona prompt);
`fs.readFileSync` runs per request; no caching layer exists; no streaming means the user waits for the whole
generation.
