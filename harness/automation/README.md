# Automation

Runnable, dependency-free test automation for this project. Everything here uses Node's built-in test runner
and `fetch`; **no package was added to `package.json`** (see [`../test-tools/README.md`](../test-tools/README.md)).

```
automation/
├── scripts/
│   ├── run-all.sh        # quality gates -> unit -> API -> UI -> performance -> findings, with logs
│   └── env-check.sh      # prerequisites, server reachability, presence of provider keys (never values)
├── api/                  # HTTP contract suites (node:test)
│   ├── chat.api.test.mjs
│   ├── create-persona.api.test.mjs
│   ├── fetch-image.api.test.mjs
│   ├── security.api.test.mjs
│   └── app-endpoints.api.test.mjs
├── ui/
│   └── ssr-smoke.test.mjs   # server-rendered surface + static markup checks
├── utilities/
│   ├── http.mjs             # BASE_URL, postJson/getUrl, evidence writer
│   ├── load-source-module.mjs  # imports app sources without modifying them
│   ├── prompt-builder.test.mjs # unit tests for src/lib/prompt.js
│   ├── cookie-manager.test.mjs # unit tests for src/app/components/CookieManager.ts
│   └── repro-findings.mjs   # recreates every credential-free finding (bug reproducer)
├── performance/
│   └── api-latency.mjs      # p50/p95 latency probe for deterministic paths
└── database/                # NOT PRESENT — the project has no database
```

## How to run

```bash
# everything (starts the dev server if nothing answers on BASE_URL)
bash harness/automation/scripts/run-all.sh --start-server

# individual suites
node --test "harness/automation/utilities/*.test.mjs"
node --test "harness/automation/api/*.test.mjs"
node --test "harness/automation/ui/*.test.mjs"
node harness/automation/performance/api-latency.mjs
node harness/automation/utilities/repro-findings.mjs
```

Environment knobs: `BASE_URL` (default `http://localhost:3000`), `HTTP_TIMEOUT_MS` (15000),
`ITERATIONS` (15, performance), `RUN_ID` + `RESULTS_ROOT` (where `run-all.sh` writes logs, default
`harness/test-results/latest/raw/`).

## Test-case mapping

Each assertion name starts with its `TC-*` id, e.g.
`ok 1 - TC-001 [api-chat] POST /api/chat without message -> 400 Message required`.
That makes `test-results/latest/raw/*.log` a 1:1 status map for [`../test-cases/`](../test-cases/README.md).

## Suite results in RUN-2026-001

| Suite | Tests | Pass | Fail | Skip (BLOCKED) | TODO (documented FAIL) |
|---|---|---|---|---|---|
| `utilities/*.test.mjs` | 19 | 15 | 0 | 0 | 4 |
| `api/*.test.mjs` | 32 | 15 | 0 | 6 | 11 |
| `ui/*.test.mjs` | 6 | 5 | 0 | 0 | 1 |
| **Total** | **57** | **35** | **0** | **6** | **16** |

## Conventions (important)

* **`{ todo: "BUG-xxx" }`** — the case documents a contract the app does not yet meet. The suite stays green;
  the failure appears in the log as `not ok … # TODO BUG-xxx` and the case is recorded as `FAIL`. When a bug is
  fixed, remove the `todo` option so the assertion starts enforcing the fixed behaviour.
* **`# SKIP`** — the case needs something this environment lacks (provider credentials, outbound internet).
  It is reported as `BLOCKED` in the case documentation, never as a failure.
* **No mocking of the provider SDK.** The absence of credentials is used as the deterministic "provider down"
  path; real replies can only be asserted when keys are present. Never hand-write a fake reply.
* **Evidence first.** Suites call `writeEvidence()` so every executed case leaves a raw artefact in
  `../evidence/`.
* **No app modification.** `load-source-module.mjs` reads sources and re-points bare `fs`/`path` imports; it
  never rewrites files on disk. If a test needs a fixture, it lives in `../test-data/`.

## Adding automation

1. Write the `TC-*` case first (in `../test-cases/<module>/`), with expected result and evidence target.
2. Add the assertion with the `TC-*` id in the name; use `hasProviderKeys()`/`serverReachable()` guards.
3. If the expectation is not met yet, mark `{ todo: "BUG-xxx" }` and file the bug.
4. Run `run-all.sh`, attach the log, then update the case status + `../reports/coverage.md`.

## Deliberately not automated

| Area | Why |
|---|---|
| Browser interactions (10 manual cases) | no browser runtime available (`KI-005`) |
| LLM reply quality/tone adherence | non-deterministic and credential-gated; needs human judgement or an LLM judge (see `../ai/`) |
| Load/stress testing | no deployment ownership, provider quota consumption |
| Database tests | no database exists (`../test-scenarios/database.md`) |
