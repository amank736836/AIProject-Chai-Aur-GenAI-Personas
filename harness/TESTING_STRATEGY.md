# Testing Strategy

## 1. Objectives

1. Prove the deterministic parts of the product work: API contracts, prompt construction, cookie handling,
   server-rendered UI surface, build & lint quality gates.
2. Make the *non-deterministic* parts (LLM replies) explicitly testable and honestly reported: they are only
   marked PASS when a provider key was available and a real round trip happened.
3. Give every future bug a reproducible artefact: raw log, API response, performance measurement.

## 2. Scope

**In scope:** the Next.js app in this repository — `src/app` UI, three route handlers, `src/lib/*`, `data/*.json`
persona data, configuration files.

**Out of scope (documented, not tested):** the three public Vercel deployments (no credentials/deploy access),
provider-side behaviour (Groq/Gemini internals), third-party services (Unsplash, ui-avatars, the 10 scraped
platforms), and anything requiring a real browser (no browser runtime is installed in this environment —
tracked as manual cases).

## 3. Test levels

| Level | What | Tooling | Where |
|---|---|---|---|
| L1 Static / quality gates | lint, TypeScript, secret scan, dependency audit | `eslint`, `tsc`, `npm audit`, node script | `automation/scripts/run-all.sh`, `test-cases/build-and-release/` |
| L2 Unit | prompt building, cookie manager | `node:test` + source loader | `automation/utilities/` |
| L3 API contract | all three routes: happy/negative/edge, headers, cookies | `node:test` + `fetch` | `automation/api/` |
| L4 UI smoke (SSR/DOM) | rendered HTML of `/` contains the expected surface; static checks of link attributes | `node:test` + `fetch` | `automation/ui/` |
| L5 UI interaction | persona switching, sending, copy/visit, scroll, custom-persona flow | **manual checklist** (browser not available here) | `test-tools/ui/manual-checklist.md` |
| L6 Performance | latency of deterministic paths | `automation/performance/api-latency.mjs` | `evidence/performance/` |
| L7 Security / VAPT | anonymous access, CORS, header posture, injection surface, dependency risk, secrets | `automation/api/security.api.test.mjs`, `npm audit`, manual review | `test-cases/platform-security/` |
| L8 LLM behaviour | tone adherence, link answers, history context, provider fallback | manual + credential-gated automated cases | `test-cases/api-chat/`, `test-data/` |

## 4. Priorities

| Priority | Meaning | Examples |
|---|---|---|
| P0 | Blocks the core chat flow if broken | `/api/chat` 200 with a reply; persona switching; provider fallback |
| P1 | Core-adjacent: persistence, custom persona, error paths | history cookie round trip, `400` validation, `429` handling |
| P2 | Polish, secondary environment, non-blocking gaps | scroll helpers, animation states, avatar fallbacks |
| P3 | Cosmetic / documentation-level | README accuracy, comments |

Execution order in a run: P0 → P1 → P2. Anything P0/P1 not executed must be called out in the run record.

## 5. Tools (existing first)

Only already-present tooling is used: Node's built-in `node:test` runner + `fetch` (Node ≥ 18), `npm`, `curl`,
`eslint`, `tsc`, `npm audit`. **No new test framework or dependency was added** — the project shipped with no
test tooling at all, and the built-in runner covers API/unit/UI-smoke needs without touching `package.json`.
Details and limitations: [`test-tools/README.md`](test-tools/README.md).

## 6. Conventions

* Every executed assertion carries a `TC-*` id in its name so raw output ↔ documentation is 1:1.
* Expected-but-currently-unmet behaviour is encoded as `node:test` `{ todo: "BUG-xxx" }` so the suite stays
  green while the gap stays visible in the log; the linked test case is still documented as `FAIL`.
* Provider credentials: tests using them are skipped when `GROQ_API_KEY`/`GOOGLE_GENERATIVE_AI_API_KEY` are
  absent, and reported as BLOCKED rather than failed. Never fabricate an LLM reply.
* Evidence is written by the tests themselves into `harness/evidence/` (API responses, headers, prompts).
* Deterministic tests must pass on a machine with no internet access except the app under test.
* The harness never edits application source; if a test needs a fixture, it lives in `test-data/`.

## 7. Entry / exit criteria

**Entry:** `npm install` done, dev server answering on `BASE_URL` (or `--start-server` used), run id declared.

**Exit (per run):**
* lint and typecheck have no errors;
* no regression in previously passing `TC-*`;
* every P0/P1 case is PASS, BLOCKED or has a `BUG-*` with evidence — never silently missing;
* raw logs saved under `test-results/latest/raw/`, summary written into `test-results/latest/RUN-<id>.md`,
  `TESTING_STATUS.md`, `reports/coverage.md` and `reports/release-readiness.md` refreshed.

## 8. Risk-based approach

Highest risk areas, in order: (1) provider failure handling and quota abuse on an unauthenticated public API,
(2) cookie-based persistence (fragile by design, three confirmed breakages), (3) custom-persona pipeline
(most moving parts: scraping + LLM + cookie + avatar), (4) prompt construction (every user-visible persona
behaviour depends on it), (5) dependency security posture (open critical advisories). Test effort follows that
order; see `reports/traceability.md` for the coverage of each risk.

## 9. What this strategy deliberately does *not* do

* No load/stress testing: no traffic model, no deployment ownership, and the provider quota would be consumed
  by design (documented as a future plan in `automation/README.md`).
* No database testing: the project has no database (`test-scenarios/database.md`).
* No visual regression: no browser/headless runtime available in this environment (`KI-005`).
