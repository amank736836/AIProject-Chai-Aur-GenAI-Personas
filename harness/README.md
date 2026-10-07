# Project Harness — Persona LLM Chat (`next-llm-personas`)

> **What is this?** `harness/` is the single, organised place where this project is understood, specified,
> tested, evidenced and reported on. Entering this folder should be enough for a developer, a tester or an
> AI agent to answer: *what does this project do, what has been tested, how was it tested, what passed or
> failed, and how do I reproduce it?*

Everything in `harness/` is derived from the repository at commit `d24eb41` (branch
`arena/cd64d8d4-aiproject-chai-aur-genai-perso`) plus the executions recorded in
[`test-results/latest/`](test-results/latest/RUN-2026-001.md). Nothing is invented: unknown items are marked
`UNKNOWN / REQUIRES VALIDATION`, unexecuted items are marked `NOT_EXECUTED`.

---

## Quick start

```bash
# 1. install dependencies (once)
npm install

# 2. start the app the harness tests against
npm run dev -- -H 0.0.0.0 -p 3000

# 3. check the harness environment (prints whether provider keys are set, never their values)
bash harness/automation/scripts/env-check.sh

# 4. run everything: lint -> typecheck -> unit -> API -> UI smoke -> security -> performance
bash harness/automation/scripts/run-all.sh --start-server

# 5. read the results
#    harness/test-results/latest/RUN-<id>.md      <- human summary
#    harness/test-results/latest/raw/*.log        <- raw TAP / lint / perf output
```

Optional (LLM round trips only):

```bash
export GROQ_API_KEY=...                        # primary provider (Groq, llama-3.3-70b-versatile)
export GOOGLE_GENERATIVE_AI_API_KEY=...        # fallback provider (Gemini) — INFERRED name, see ARCHITECTURE.md
bash harness/automation/scripts/run-all.sh
```

Without credentials, 6 of the 57 automated cases self-skip and are reported as **BLOCKED (credentials)**;
nothing else needs the internet.

---

## Twelve questions, answered

| # | Question | Answer | Detail |
|---|---|---|---|
| 1 | What is this project? | "Persona LLM Chat" (`next-llm-personas` v0.1.0) — a Next.js 15 web app where you chat with three personas: Hitesh, Piyush, or a "HiPi" side-by-side mode, plus custom personas created from a name or a public `@handle`. | [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md) |
| 2 | What are the main features? | 14 features (`FEAT-001`…`FEAT-014`): persona selection & chat modes, HiPi comparison, single-persona chat, custom persona creation, avatar images, cookie history, prompt transparency, link rendering, scroll helpers, tone data & prompt building, provider fallback, error handling, clearing on unload, UI shell/a11y. | [`features/README.md`](features/README.md) |
| 3 | How does it work (architecture)? | Next.js 15 App Router on Vercel-style serverless; React 19 client components; three API route handlers; **no database** — state lives in browser cookies, persona tone is read from `data/*.json`; LLM via Groq with a Gemini fallback. | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| 4 | Which APIs and data stores exist? | `POST /api/chat`, `POST /api/create-persona`, `POST /api/fetch-image` (plus the `POST /api/clear-history` the UI calls but which does not exist — BUG-001). Stores: cookies (`chatHistory-*`, `personaData-*`, `custom_personas`) and read-only `data/*-tone.json`. No DB, no migrations, no auth. | [`ARCHITECTURE.md`](ARCHITECTURE.md) §APIs, [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md) §data |
| 5 | What are the requirements? | 34 functional (`REQ-*`), 14 non-functional (`NFR-*`), 12 business rules (`BR-*`) — each traced to scenarios and cases. | [`requirements/`](requirements/README.md) |
| 6 | What has been tested? | 82 cases catalogued, 44 PASS; 57 automated assertions (35 pass, 0 fail, 6 skipped, 16 documented TODO); lint/typecheck/unit/API/UI/perf suites all green in `RUN-2026-001`. | [`TESTING_STATUS.md`](TESTING_STATUS.md) §verified |
| 7 | What has **not** been tested? | Anything needing an LLM key (10 cases BLOCKED), the 8 browser-interaction cases (no browser runtime, KI-005), the production build/`next start` (offline fonts, KI-003), and deployed-host performance. | [`TESTING_STATUS.md`](TESTING_STATUS.md) §not verified |
| 8 | How were the tests designed? | 102 scenarios by type (smoke/functional/negative/edge/integration/api/ui/performance/security/regression) expanded into 82 cases with a fixed field template, then automated where possible. | [`TESTING_STRATEGY.md`](TESTING_STRATEGY.md), [`test-scenarios/`](test-scenarios/README.md), [`test-cases/`](test-cases/README.md) |
| 9 | How do I run the tests? | `bash harness/automation/scripts/run-all.sh --start-server` — or the individual `node --test` commands in the quick start below; prerequisites and expected output are in `test-tools/setup.md`. | [`automation/README.md`](automation/README.md), [`test-tools/setup.md`](test-tools/setup.md) |
| 10 | Where are the results and evidence? | `test-results/latest/RUN-2026-001.md` + `raw/` logs; curated proof (HTTP responses, audit, logs, performance) in `evidence/`. | [`test-results/`](test-results/README.md), [`evidence/`](evidence/README.md) |
| 11 | What is broken? | 18 bugs: 1 Critical (BUG-017 dependency advisories), 7 High (persistence BUG-002/003, custom tone BUG-006/007, silent persona creation BUG-012, HiPi history BUG-014), 7 Medium, 3 Low. | [`bugs/README.md`](bugs/README.md), [`bugs/open/`](bugs/open/) |
| 12 | Can it ship / how do I extend this harness? | Recommendation is **NOT READY** with a six-step path to READY WITH RISKS; extension rules (new feature, new case, new automation, new bug, new run) are in the README's "How do I…" section and `ai/test-agent-instructions.md`. | [`reports/release-readiness.md`](reports/release-readiness.md), [`ai/`](ai/README.md) |

## How is it organised?

| Folder | Purpose |
|---|---|
| [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md) | Purpose, users, workflows, stack, environments, dependencies |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Components, data flow, APIs, storage, deployment, risks |
| [`TESTING_STRATEGY.md`](TESTING_STRATEGY.md) | Test levels, priorities, tools, entry/exit criteria, conventions |
| [`TESTING_STATUS.md`](TESTING_STATUS.md) | Single-page current status: what has been tested and what has not |
| [`requirements/`](requirements/README.md) | `REQ-*` functional, `NFR-*` non-functional requirements and business rules |
| [`features/`](features/README.md) | One folder per feature (`FEAT-*`) with behaviour, acceptance criteria, cases, data, issues |
| [`test-scenarios/`](test-scenarios/README.md) | `SCN-*` scenarios by type: smoke, functional, negative, edge, integration, api, ui, perf, security, regression |
| [`test-cases/`](test-cases/README.md) | `TC-*` executable test cases grouped by module (positive/negative/edge/regression) |
| [`test-tools/`](test-tools/README.md) | Tools available for testing (existing ones first), setup and limitations |
| [`automation/`](automation/README.md) | Runnable suites: API, UI smoke, unit, performance, plus reproducer scripts |
| [`test-data/`](test-data/README.md) | Valid / invalid / edge-case / sample / fixture data and cookie fixtures |
| [`test-results/`](test-results/README.md) | `RUN-*` execution records: latest, historical, summaries |
| [`evidence/`](evidence/README.md) | Raw evidence: API responses, logs, performance measurements |
| [`bugs/`](bugs/README.md) | `BUG-*` reports (open/resolved) and known issues |
| [`reports/`](reports/README.md) | `traceability.md`, `coverage.md`, `test-summary.md`, `regression-report.md`, `release-readiness.md` |
| [`ai/`](ai/README.md) | Instructions, prompts and generation rules for AI testing agents |

### Where do I find…?

| I want to… | Go to |
|---|---|
| understand the app in 5 minutes | [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md) |
| know what a feature should do | [`features/<feature>/behavior.md`](features/README.md) |
| find a test case for a feature | [`features/<feature>/test-cases.md`](features/README.md) → [`test-cases/`](test-cases/README.md) |
| run the automated suite | [`automation/README.md`](automation/README.md) |
| see what passed/failed last run | [`TESTING_STATUS.md`](TESTING_STATUS.md), [`test-results/latest/`](test-results/latest/) |
| see proof of a result | [`evidence/`](evidence/README.md) |
| report or triage a bug | [`bugs/README.md`](bugs/README.md) |
| see requirement → test mapping | [`reports/traceability.md`](reports/traceability.md) |
| know if the project can ship | [`reports/release-readiness.md`](reports/release-readiness.md) |
| let an AI agent run testing | [`ai/test-agent-instructions.md`](ai/test-agent-instructions.md) |

---

## How do I…

**…run the test suite?**
`bash harness/automation/scripts/run-all.sh --start-server` (starts `npm run dev` if nothing answers on
`BASE_URL`). Individual suites:
`node --test "harness/automation/api/*.test.mjs"`, `node --test "harness/automation/utilities/*.test.mjs"`,
`node --test "harness/automation/ui/*.test.mjs"`,
`node harness/automation/performance/api-latency.mjs`,
`node harness/automation/utilities/repro-findings.mjs`.

**…add a new feature?**
1. Create `features/<nn>-<feature-name>/` from the template in [`features/README.md`](features/README.md).
2. Add requirements in [`requirements/functional-requirements.md`](requirements/functional-requirements.md)
   (`REQ-*`), business rules in [`requirements/business-rules.md`](requirements/business-rules.md) (`BR-*`).
3. Add scenarios in the matching [`test-scenarios/`](test-scenarios/README.md) file (`SCN-*`).
4. Add test cases in [`test-cases/<module>/`](test-cases/README.md) (`TC-*`), then link them from
   `features/<feature>/test-cases.md`.
5. Update [`reports/traceability.md`](reports/traceability.md) and [`reports/coverage.md`](reports/coverage.md).

**…add a new test?**
Add the case first (documentation), then implement it in `automation/<api|ui|utilities|performance>/` with the
`TC-*` id in the test name so raw output maps 1:1 to the case. Keep provider-dependent tests guarded by
`hasProviderKeys()` and expected-but-unmet behaviour marked `{ todo: "BUG-xxx" }`.

**…record a bug?**
Copy the template in [`bugs/README.md`](bugs/README.md) to `bugs/open/BUG-<next-id>.md`, set severity and
priority, attach evidence, and add a regression test case (see
[`test-cases/platform-security/regression.md`](test-cases/platform-security/regression.md) for the pattern).
Update the relevant `features/<feature>/known-issues.md`.

**…record an execution?**
Create `test-results/latest/RUN-<YYYY>-<nnn>.md` from the template in
[`test-results/README.md`](test-results/README.md), keep the raw logs in `test-results/latest/raw/`, append a
line to [`test-results/summaries/RUN-LOG.md`](test-results/summaries/RUN-LOG.md), and archive the previous
run under `test-results/historical/`.

**…update coverage?**
Re-count from the test-case files and run logs, then update [`reports/coverage.md`](reports/coverage.md) and
[`TESTING_STATUS.md`](TESTING_STATUS.md). Never copy stale numbers — see the counting recipe at the bottom of
`reports/coverage.md`.

**…have an AI agent use the harness?**
Point it at [`ai/test-agent-instructions.md`](ai/test-agent-instructions.md). The rule that overrides
everything: **never claim a test passed unless it was executed and evidence exists.**

---

## Conventions

* IDs: `REQ-*` (functional), `NFR-*` (non-functional), `BR-*` (business rule), `FEAT-*`, `SCN-*`, `TC-*`,
  `BUG-*`, `RUN-*`, plus `RISK-*` for accepted/observation-level risks and `KI-*` for known issues.
* Status vocabulary: `PASS`, `FAIL`, `BLOCKED`, `NOT_EXECUTED` (documentation) and `ok`, `not ok`, `# SKIP`,
  `# TODO` (node:test output). `# TODO` means "documented expectation not yet met, see the linked BUG".
* Documentation states intent; `test-results/` states what actually happened. Never edit a past run.
* No secrets in the harness: environment variables or `${PLACEHOLDER}` only.
* The harness must not change application behaviour. The only files it writes outside itself are in
  `harness/` and (by the app itself) `.next/`.
