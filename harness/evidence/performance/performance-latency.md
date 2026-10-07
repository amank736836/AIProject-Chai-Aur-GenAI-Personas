# Latency probe (RUN-2026-001)

- Base URL: http://localhost:3000
- Environment: dev server (next dev --turbopack), sandboxed single-core container
- Iterations per probe: 15
- Generated: 2026-10-07T04:11:44.607Z
- Caveat: Cold-start and network-dependent values vary; the LLM round trip is NOT measured (needs provider keys).

| Probe | Last status | p50 (ms) | p95 (ms) | min (ms) | max (ms) |
|---|---|---|---|---|---|
| GET / (SSR shell) | 200 | 56 | 72 | 50 | 72 |
| GET /data/hitesh-tone.json (static data) | 404 | 49 | 76 | 43 | 76 |
| POST /api/chat (validation error path) | 400 | 22 | 30 | 19 | 30 |
| POST /api/fetch-image (name=Hitesh) | 200 | 32 | 52 | 24 | 52 |
| POST /api/create-persona (missing name) | 400 | 21 | 30 | 20 | 30 |
