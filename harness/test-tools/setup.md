# Setup

## 1. Prerequisites

| Requirement | Version used in RUN-2026-001 | How to check |
|---|---|---|
| Node.js | v22.22.3 (project requires 18+) | `node --version` |
| npm | 10.9.8 | `npm --version` |
| curl | present | `curl --version` |
| Optional: provider credentials | not set in RUN-2026-001 | `env-check.sh` |

## 2. Install

```bash
npm install            # 354 packages, ~13 s, no lockfile drift (TC-081)
```

## 3. Start the system under test

```bash
npm run dev -- -H 0.0.0.0 -p 3000     # Turbopack dev server, ready in ~6 s
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/   # expect 200
```

Notes

* `-H 0.0.0.0` is required when the app must be reachable from outside the container/preview proxy.
* The dev server logs `next/font` download warnings in an offline environment but keeps serving with fallback
  fonts (see `../evidence/logs/dev-server.log`).
* Running `npm run build` against the same `.next` directory while the dev server is running leaves the dev
  server in a broken state — stop the dev server first (observed during RUN-2026-001 and recovered by
  `rm -rf .next && npm run dev`).

## 4. Configure credentials (optional, only for LLM cases)

```bash
export GROQ_API_KEY=...                      # primary provider (required for reply-generation tests)
export GOOGLE_GENERATIVE_AI_API_KEY=...      # fallback provider — INFERRED name, see ../ARCHITECTURE.md
export BASE_URL=http://localhost:3000        # optional, defaults to localhost:3000
export HTTP_TIMEOUT_MS=15000                 # optional
export ITERATIONS=15                         # optional, performance probe iterations
```

Never commit these values — `.gitignore` excludes `.env*` and `TC-069` scans for key material. When the keys are
absent, 6 automated cases self-skip and are reported as BLOCKED (credentials) instead of failing.

## 5. Verify the harness environment

```bash
bash harness/automation/scripts/env-check.sh
```

Expected output (RUN-2026-001): node/npm present, `node_modules` present, server `reachable (HTTP 200)`,
`GROQ_API_KEY: NOT set`, `GOOGLE_GENERATIVE_AI_API_KEY: NOT set`.

## 6. Run the suites

```bash
bash harness/automation/scripts/run-all.sh --start-server       # everything
node --test "harness/automation/utilities/*.test.mjs"           # unit only
node --test "harness/automation/api/*.test.mjs"                 # API only
node --test "harness/automation/ui/*.test.mjs"                  # SSR UI smoke
node harness/automation/performance/api-latency.mjs             # latency probe
node harness/automation/utilities/repro-findings.mjs            # bug reproducer (no credentials needed)
```

## 7. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `server not reachable at http://localhost:3000` and all API cases SKIP | dev server not running | `npm run dev -- -H 0.0.0.0 -p 3000` or use `--start-server` |
| `next/font error: Failed to fetch 'Geist'` during `npm run build` | offline environment | build on a machine with access to `fonts.googleapis.com` (KI-003) |
| All LLM cases SKIP | provider keys absent | export the keys (see §4) |
| Dev server returns 500 for `/` | a `next build` ran while it was live | `rm -rf .next && npm run dev` |
| `MODULE_TYPELESS_PACKAGE_JSON` warning | importing `.ts`/ESM sources under a CJS package | harmless; produced by the harness loader utilities |
