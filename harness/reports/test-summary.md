# Test Summary — RUN-2026-001

| Field | Value |
|---|---|
| Execution ID | RUN-2026-001 |
| Date (UTC) | 2026-10-07 |
| Commit | `d24eb41` (branch `arena/cd64d8d4-aiproject-chai-aur-genai-perso`) |
| Environment | offline Linux sandbox, Node v22.22.3, npm 10.9.8, Next.js 15.4.10 dev server (`next dev --turbopack`) on `http://localhost:3000` |
| Tester / Agent | Arena.ai agent (analysis + automated suites + manual curl probes) |
| Provider credentials | **none** (`GROQ_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY` unset) → reply-generation cases blocked |
| Browser runtime | none → interaction cases not executed |
| Suites run | lint, typecheck, unit, API, UI smoke, security probes, performance probe, findings reproducer, npm audit |

## Results

| Suite | Tests | Passed | Failed | Blocked (skip) | Documented TODO |
|---|---|---|---|---|---|
| `automation/utilities/*.test.mjs` | 19 | 15 | 0 | 0 | 4 |
| `automation/api/*.test.mjs` | 32 | 15 | 0 | 6 | 11 |
| `automation/ui/*.test.mjs` | 6 | 5 | 0 | 0 | 1 |
| **Automated total** | **57** | **35** | **0** | **6** | **16** |
| Performance probe | 5 probes × 15 iterations (all 90 requests answered) | — | — | — | — |
| Findings reproducer | 11 findings printed | 11 | 0 | — | — |
| Quality gates | `npm run lint` (0 errors, 13 warnings), `npx tsc --noEmit` (clean), `npm install` (354 pkgs, no lockfile drift) | 3 | 0 | 1 (`npm run build` blocked: offline fonts) | — |
| Dependency audit | 28 advisories total / 10 production (1 critical) | 0 | 1 gate | — | — |

**Pass rate of executed assertions: 35/35 (100 %).** Documented pass rate across the 82 case catalogue:
44 PASS / 82 (54 %), 20 FAIL (all with bug ids), 10 BLOCKED, 8 NOT_EXECUTED.

## Critical failures (blocking a release)

| Finding | Why it matters | Evidence |
|---|---|---|
| BUG-017 — 1 critical + 4 high advisories in production deps (`next@15.4.10`) | Known RCE/DoS advisories; fix available (`next@15.5.27`) | `../evidence/logs/npm-audit-summary.txt` |
| BUG-006 / BUG-007 — custom persona tone never reaches the prompt | The flagship "create your own persona" flow produces an unstyled generic assistant | `../evidence/api-responses/TC-032-prompt-custom-tone.txt` |
| BUG-012 — persona creation reports success after a provider failure | Users get a hollow persona with no error | `../evidence/api-responses/TC-017-create-persona-silent-failure.json` |
| BUG-002 / BUG-003 — chat persistence broken (format mismatch + Unicode crash) | History is lost on reload; non-Latin1 chats throw in the console | `../test-results/latest/raw/unit-tests.log` |
| BUG-014 — HiPi history keeps only the Hitesh reply | Half of every HiPi conversation is invisible to the model | code `chat/route.ts:62-65` |
| BUG-004 — prompt transparency is dead | Advertised README feature is unavailable | response shape / component review |
| BUG-001 — clear-history endpoint missing | Silent 404 on every page unload | `../evidence/api-responses/TC-054-clear-history.json` |

## Non-failing but important observations

* No authentication, no rate limiting, no payload cap on any route (RISK-001/RISK-002, TC-064/TC-065/TC-006).
* No security headers configured (RISK-003, TC-075).
* Malformed JSON returns an empty 500 on all three routes (BUG-010).
* Provider error text (including env-var names) is returned to anonymous callers (BUG-013).
* `npm run build` cannot be verified offline (KI-003) — needs a networked machine before any deploy claim.

## What could not be verified here

| Area | Reason | Cases |
|---|---|---|
| Any real LLM reply (single, HiPi, custom) | no provider credentials | TC-007, TC-008, TC-009, TC-011, TC-013, TC-020, TC-025 |
| Gemini fallback on throttling | needs a live quota/429 | TC-010 |
| Browser interactions (14 checklist steps) | no browser runtime | TC-044…TC-048, TC-050…TC-053 |
| Production build + `next start` | fonts host unreachable offline | TC-078, TC-079 |
| Public Vercel deployments | out of scope / no authorisation | — |

## Comparison with the previous run

None — this is the first recorded execution (the repository had no tests before this harness, `KI-001`).
Future runs append to [`../test-results/summaries/RUN-LOG.md`](../test-results/summaries/RUN-LOG.md).

## Interpretation guide

* The suites intentionally exit **0** while carrying 16 `# TODO` assertions for known defects. A green run means
  "no *new* breakage", **not** "the product is defect-free" — read
  [`../bugs/known-issues.md`](../bugs/known-issues.md) alongside it.
* Anything marked BLOCKED must be re-run with credentials before release; the exact commands are in
  [`../test-tools/setup.md`](../test-tools/setup.md) §6.
