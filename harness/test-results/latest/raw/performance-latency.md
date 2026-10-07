# Latency probe (RUN-2026-001)

- Base URL: http://localhost:3000
- Environment: dev server (next dev --turbopack), sandboxed single-core container
- Iterations per probe: 15
- Generated: 2026-10-07T04:18:08.742Z
- Caveat: Cold-start and network-dependent values vary; the LLM round trip is NOT measured (needs provider keys).

| Probe | Last status | p50 (ms) | p95 (ms) | min (ms) | max (ms) |
|---|---|---|---|---|---|
| GET / (SSR shell) | 200 | 49 | 58 | 45 | 58 |
| GET /data/hitesh-tone.json (static data) | 404 | 44 | 52 | 42 | 52 |
| POST /api/chat (validation error path) | 400 | 31 | 39 | 18 | 39 |
| POST /api/fetch-image (name=Hitesh) | 200 | 33 | 109 | 24 | 109 |
| POST /api/create-persona (missing name) | 400 | 20 | 25 | 19 | 25 |
