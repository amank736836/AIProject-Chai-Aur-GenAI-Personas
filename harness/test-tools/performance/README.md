# Performance testing tools

## Probe

```bash
BASE_URL=http://localhost:3000 ITERATIONS=15 node harness/automation/performance/api-latency.mjs
```

Measures, for each probe, `min / mean / p50 / p95 / max` latency against a running server and writes:

* raw JSON → `../../test-results/latest/raw/performance-latency.json` (and a copy in `../../evidence/performance/`)
* markdown table → `../../test-results/latest/raw/performance-latency.md`

## Probes and RUN-2026-001 baseline (dev server, sandboxed single-core container)

| Probe | Status | p50 | p95 | min | max |
|---|---|---|---|---|---|
| `GET /` (SSR shell) | 200 | 56 ms | 72 ms | 50 ms | 72 ms |
| `GET /data/hitesh-tone.json` | 404 | 49 ms | 76 ms | 43 ms | 76 ms |
| `POST /api/chat` (validation path) | 400 | 22 ms | 30 ms | 19 ms | 30 ms |
| `POST /api/fetch-image` (fallback path) | 200 | 32 ms | 52 ms | 24 ms | 52 ms |
| `POST /api/create-persona` (validation path) | 400 | 21 ms | 30 ms | 20 ms | 30 ms |

The values above are the RUN-2026-001 capture stored in `../../evidence/performance/performance-latency.{md,json}`.
Latency is noisy — a repeat run of the same probe legitimately yields different numbers (the second capture of
RUN-2026-001 measured `GET /` at p50 49 / p95 58 ms). Always quote the file you link, and never compare numbers
from two different runs.

Interpretation: deterministic paths stay far below the NFR-007/NFR-008 budgets (500 ms / 200 ms). These are
**dev-build** numbers; production numbers and cold starts are unknown (`SCN-082`).

## Not measured (and why)

| Area | Reason |
|---|---|
| LLM round trip (single / HiPi) | requires provider credentials |
| `@handle` enrichment end-to-end | requires outbound internet to 10 hosts |
| Lambda/serverless cold start, memory, concurrency, throughput | no deployment access; `UNKNOWN / REQUIRES VALIDATION` |
| Load/stress (concurrent users) | would consume provider quota and has no traffic model to size against |

## If load testing becomes necessary

1. Size a target (e.g. 20 concurrent chat requests, p95 < 8 s including provider time).
2. Use a runner with `k6` or `autocannon` against a **mock provider** first (otherwise quota is burned).
3. Record cold-start and memory numbers from the hosting platform's metrics, not from the dev server.
4. Extend `reports/coverage.md` (Performance section) with the measured values and re-run `SCN-077…SCN-082`.
