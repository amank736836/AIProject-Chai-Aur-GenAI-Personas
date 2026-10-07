# Test Tools

Everything available to test this project, using **existing project tooling first**. The repository shipped
with no test framework, no test script and no CI, so the harness deliberately builds on what is already in the
dependency tree (Node.js, npm, ESLint, TypeScript, curl) plus Node's built-in test runner — **no new
dependency was added to `package.json`**.

| Tool | Purpose | Where | Status |
|---|---|---|---|
| `node:test` + `node:assert` (Node ≥18, built-in) | unit + API + SSR-smoke test execution, TAP output | `../automation/**/*.test.mjs` | **used** |
| `fetch` (global, built-in) | HTTP calls from tests | `../automation/utilities/http.mjs` | **used** |
| `node --experimental-strip-types` / native TS stripping (Node 22.18+) | import `src/app/components/CookieManager.ts` in unit tests | `../automation/utilities/load-source-module.mjs` | **used** |
| `curl` | ad-hoc API probes during analysis (evidence capture) | documented in each API case | **used** |
| ESLint 9 + `eslint-config-next` | static analysis / lint gate | `npm run lint` | **used** (13 warnings, 0 errors) |
| TypeScript 5 (`tsc --noEmit`) | type-safety gate | `npx tsc --noEmit` | **used** (clean) |
| `npm audit` | dependency vulnerability review | `npm audit [--omit=dev]` | **used** (28 advisories, 10 production) |
| Next.js dev server (`next dev --turbopack`) | system under test | `npm run dev` | **used** |
| Bash + Python 3 | glue: run scripts, payload generation, JSON summarising | `../automation/scripts/*.sh` | **used** |
| Playwright / Cypress / Puppeteer | browser UI automation | — | **NOT available** — browser binaries cannot be downloaded in this environment (`KI-005`); UI cases are manual today |
| AI SDK test doubles / nock-like HTTP stubbing | deterministic provider behaviour | — | **NOT used** — the suites instead rely on "no credentials" as the deterministic failure mode |
| `autocannon` / `k6` / `artillery` | load testing | — | **NOT used** — pointless without deployment ownership; provider quota would be consumed |
| OWASP ZAP / Burp | VAPT scanning | — | **NOT available** — security coverage is targeted probes + manual review (see `security/`) |
| Database tooling | — | — | **N/A** — the project has no database (`../test-scenarios/database.md`) |

## Tool reference cards (fixed fields)

Each tool the harness uses, with the eight required fields. The folder guides below add task-specific recipes;
[`setup.md`](setup.md) is the one-time setup.

### 1. `node:test` + `node:assert` (built-in)

| Field | Value |
|---|---|
| Tool | Node.js built-in test runner and assertion library |
| Purpose | Execute all 57 automated cases (unit, API, SSR smoke, security probes) and emit TAP output |
| Installation | none — ships with Node.js ≥18 (verified on v22.22.3) |
| Configuration | none; files are `harness/automation/**/*.test.mjs`, invoked with explicit globs (`node --test <dir>` is unsupported) |
| How to Run | `node --test "harness/automation/utilities/*.test.mjs"` (or `api`/`ui`), or everything via `bash harness/automation/scripts/run-all.sh` |
| Expected Output | TAP lines `ok <n> - TC-### [suite] …` / `not ok …`, plus `# tests/# pass/# fail/# skipped/# todo`; exit 0 = no failing assertions |
| Where results are stored | `harness/test-results/latest/raw/{unit,api,ui}-tests.log` (written by `run-all.sh`) |
| Known limitations | no browser/UI capability; provider-dependent tests self-skip without keys; `{ todo: "BUG-###" }` cases stay green by design |

### 2. `fetch` + harness HTTP helpers

| Field | Value |
|---|---|
| Tool | global `fetch` (Node 18+) wrapped by [`../automation/utilities/http.mjs`](../automation/utilities/http.mjs) |
| Purpose | Call the running app from tests and write evidence files |
| Installation | none |
| Configuration | `BASE_URL` (default `http://localhost:3000`); helpers `postJson`, `getUrl`, `serverReachable`, `hasProviderKeys`, `writeEvidence` |
| How to Run | used by the API/UI suites: `node --test "harness/automation/api/*.test.mjs"` |
| Expected Output | JSON bodies + status codes asserted per case; failures name the expected/actual contract |
| Where results are stored | assertions in the TAP log; raw responses in `harness/evidence/api-responses/` |
| Known limitations | no built-in retry or mocking; a stopped dev server fails the suite fast (by design) |

### 3. Node native TypeScript stripping (source loader)

| Field | Value |
|---|---|
| Tool | `node --experimental-strip-types` capability (Node 22.18+ strips types natively) via [`../automation/utilities/load-source-module.mjs`](../automation/utilities/load-source-module.mjs) |
| Purpose | Import the real app modules (`CookieManager.ts`, `lib/prompt.js`, `lib/llm.js`) into unit tests without a transpiler |
| Installation | none (Node version requirement only) |
| Configuration | loader resolves `@/`-style paths and copies sources to a temp file when required |
| How to Run | `node --test "harness/automation/utilities/*.test.mjs"` |
| Expected Output | unit TAP results; `MODULE_TYPELESS_PACKAGE_JSON` warning is expected and filtered |
| Where results are stored | `harness/test-results/latest/raw/unit-tests.log` |
| Known limitations | relative imports from `/tmp` fail (use absolute paths); TS syntax not supported by the stripper would need a compiler |

### 4. `curl`

| Field | Value |
|---|---|
| Tool | curl (system) |
| Purpose | Ad-hoc request/response probes during analysis, evidence capture for single-purpose cases |
| Installation | preinstalled in the sandbox; any Linux/macOS/WSL curl works |
| Configuration | `BASE=http://localhost:3000`; `-D -` for headers, `-w '\nHTTP %{http_code}\n'` for status lines |
| How to Run | recipes per case in [`api/README.md`](api/README.md), [`security/README.md`](security/README.md) |
| Expected Output | raw HTTP response + status code, pasted into `evidence/` |
| Where results are stored | `harness/evidence/api-responses/`, `harness/evidence/logs/` |
| Known limitations | manual and therefore not re-run automatically; JSON bodies need careful quoting in shells |

### 5. ESLint 9 (`eslint-config-next`)

| Field | Value |
|---|---|
| Tool | ESLint with the Next.js config already in the project |
| Purpose | Static quality gate: dead variables, unsafe patterns, `no-img-element`, hook rules |
| Installation | in `devDependencies` — `npm install` |
| Configuration | `eslint.config.mjs` (repository root); no harness-specific rules |
| How to Run | `npm run lint` |
| Expected Output | `✔ No ESLint warnings or errors` or a list; RUN-2026-001: 0 errors, 13 warnings |
| Where results are stored | `harness/test-results/latest/raw/lint.log` |
| Known limitations | warnings do not fail the gate; 9 of the 13 are `no-img-element` (see BUG-005/BUG-018 context) |

### 6. TypeScript compiler (`tsc --noEmit`)

| Field | Value |
|---|---|
| Tool | TypeScript 5 from `devDependencies` |
| Purpose | Type-safety gate over `src/` (strict mode, `allowJs`) |
| Installation | `npm install` |
| Configuration | `tsconfig.json`; `noEmit` on the command line |
| How to Run | `npx tsc --noEmit` |
| Expected Output | no output, exit 0 (RUN-2026-001: clean) |
| Where results are stored | `harness/test-results/latest/raw/typecheck.log` |
| Known limitations | `allowJs` means the plain-JS modules (`lib/prompt.js`, route-level helpers) are only partially checked |

### 7. `npm audit`

| Field | Value |
|---|---|
| Tool | npm's dependency vulnerability report |
| Purpose | Dependency risk gate feeding BUG-017 / RISK-007 |
| Installation | none |
| Configuration | `--omit=dev` for the production surface; `--json` for machine-readable output |
| How to Run | `npm audit` and `npm audit --omit=dev` (see [`security/README.md`](security/README.md)) |
| Expected Output | advisory table or JSON; RUN-2026-001: 28 advisories (10 production, 1 critical) |
| Where results are stored | `harness/evidence/logs/npm-audit.json`, `npm-audit-summary.txt` |
| Known limitations | the advisory database changes daily, so counts are only comparable inside one run; the gate cannot be made green without upgrading `next` (a source change) |

### 8. Next.js dev server (system under test)

| Field | Value |
|---|---|
| Tool | `next dev --turbopack` (Next.js 15.4.10) |
| Purpose | The running application every API/UI case talks to |
| Installation | `npm install` (already a dependency) |
| Configuration | `npm run dev -- -H 0.0.0.0 -p 3000`; provider keys via environment only; no `.env` file is committed |
| How to Run | as above, or let `run-all.sh --start-server` start it |
| Expected Output | `✓ Ready in ~1.6 s`; `GET /` returns 200 |
| Where results are stored | `harness/evidence/logs/dev-server.log` (labelled excerpt), `raw/dev-server.log` when the script starts it |
| Known limitations | running `npm run build` while it is live replaces `.next` and 500s the server; production behaviour differs from dev (never quote dev timings as production) |

### 9. Bash + Python 3 (glue)

| Field | Value |
|---|---|
| Tool | bash 5 and Python 3 (system) |
| Purpose | Orchestration (`run-all.sh`, `env-check.sh`), payload generation, JSON summarising, report counting |
| Installation | preinstalled |
| Configuration | environment variables `BASE_URL`, `RUN_ID`, `RESULTS_ROOT`, `ITERATIONS` |
| How to Run | `bash harness/automation/scripts/run-all.sh`, `python3` one-liners documented with the cases |
| Expected Output | script exit codes (0 = clean) and generated files |
| Where results are stored | `harness/test-results/latest/raw/`, `harness/evidence/` |
| Known limitations | no Windows support assumed; scripts are intentionally dependency-free rather than portable |

### 10. Browser automation (Playwright / Cypress) — **not available**

| Field | Value |
|---|---|
| Tool | browser automation frameworks |
| Purpose | would execute the 8 manual UI interaction cases automatically |
| Installation | **N/A** — browser binaries cannot be downloaded in this environment |
| Configuration | — |
| How to Run | — (manual checklist instead: [`ui/manual-checklist.md`](ui/manual-checklist.md)) |
| Expected Output | — |
| Where results are stored | `harness/evidence/screenshots/` when a human runs the checklist |
| Known limitations | `KI-005`: no browser runtime here, so UI interaction coverage stays documented-not-executed; adding one requires an approved download source and a new dependency decision |

## Folder guide

| Folder | Contents |
|---|---|
| [`setup.md`](setup.md) | one-time environment setup, how to start the system under test, provider credentials |
| [`api/`](api/README.md) | how the API is exercised (curl recipes + automated suite) |
| [`ui/`](ui/README.md) | manual UI checklist and the automation gap |
| [`performance/`](performance/README.md) | latency probe usage and interpretation |
| [`security/`](security/README.md) | probing recipes, audit commands and scope limits |

## Adding a tool — decision rules

1. Can an existing tool do the job? (e.g. `node:test` before Jest/Vitest; `curl` before Postman collections.)
2. Does it need a new entry in `package.json`? If yes, treat it as a change to the *application* and require
   review — the harness must stay runnable from a clean clone with `npm install` alone.
3. Does it need network access to an unapproved host (browser downloads, SaaS dashboards)? If yes, document the
   limitation instead of adding a broken dependency.
4. Document the tool here with: purpose, installation, configuration, how to run, expected output, where results
   are stored, known limitations.
