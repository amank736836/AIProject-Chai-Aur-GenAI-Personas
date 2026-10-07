# Coverage

All numbers below were produced by `node harness/automation/scripts/coverage-report.mjs` on 2026-10-07 from the
documentation in this harness plus the run logs in `../test-results/latest/raw/`. Nothing is estimated.

## Headline

```text
Features:        14   documented 14 · with test cases 14 · with an automated case 14
Requirements:    48   REQ 34 · NFR 14 · (business rules 12)
Scenarios:      102
Test cases:      82   PASS 44 · FAIL 20 · BLOCKED 10 · NOT_EXECUTED 8
Automated cases: 57   (implemented as assertions, embedded TC ids)
Automated tests: 57   RUN-2026-001: 35 pass · 0 fail · 6 skipped · 16 TODO
```

## Feature coverage

| Metric | Value |
|---|---|
| Features identified | 14 (see [`../features/README.md`](../features/README.md)) |
| Documented (README + case index) | 14 |
| With at least one case in PASS/FAIL state | 14 (for FEAT-009 the executed case is the shared SSR precondition TC-039; its own interaction case TC-050 is manual) |
| With an automated case referenced | 14 — but FEAT-009 only through the shared SSR case TC-039; 13 features have at least one automated case of their own |
| With at least one FAIL case (open defect) | 8 — FEAT-004, FEAT-005, FEAT-006, FEAT-007, FEAT-010, FEAT-011, FEAT-012, FEAT-013 |

## Requirement coverage

| Class | Total | With ≥1 case | COVERED | PASS | PARTIAL | FAIL | BLOCKED | NOT_EXECUTED |
|---|---|---|---|---|---|---|---|---|
| Functional (`REQ-*`) | 34 | 34 | 10 | — | 10 | 6 | 4 | 4 |
| Non-functional (`NFR-*`) | 14 | 14 | — | 8 | 2 | 2 | 1 | 1 |
| Business rules (`BR-*`) | 12 | 12 (linked) | — | 8 | — | 1 | 1 | 2 |

Notes: `COVERED` is the status used in `functional-requirements.md` for requirements whose verification exists
but is not uniformly passing; `PASS` is used for non-functional requirements that were actually measured or
executed. Every requirement has at least one scenario and one case pointing at it (verified by
`check-references.mjs` and the feature indexes). `BLOCKED`/`NOT_EXECUTED` requirements all belong to areas that
need provider credentials, a browser or a networked build.

Feature-level detail (cases per feature, with statuses) is in
[`../features/README.md`](../features/README.md) § feature inventory.

## Scenario coverage

| Status | Count | Share |
|---|---|---|
| PASS / MEASURED | 31 | 30 % |
| FAIL | 26 | 25 % |
| PARTIAL | 11 | 11 % |
| BLOCKED | 9 | 9 % |
| NOT_EXECUTED (manual/browser) | 24 | 24 % |
| UNKNOWN / REQUIRES VALIDATION | 1 | 1 % |
| **Total** | **102** | 100 % |

## Test-case coverage

| Module group | Total | PASS | FAIL | BLOCKED | NOT_EXECUTED |
|---|---|---|---|---|---|
| API contract (`api-chat`, `api-create-persona`, `api-fetch-image`) | 26 | 10 | 8 | 8 | 0 |
| Unit (`prompt-builder`, `chat-history-cookies`) | 22 | 16 | 6 | 0 | 0 |
| UI (`ui-persona-and-chat`) | 15 | 5 | 2 | 0 | 8 |
| Security / platform (`platform-security`) | 13 | 9 | 4 | 0 | 0 |
| Build / release (`build-and-release`) | 6 | 4 | 0 | 2 | 0 |
| **Total** | **82** | **44** | **20** | **10** | **8** |

## Automation coverage

| Metric | Value |
|---|---|
| Automated test cases (assertions implemented) | 57 of 82 (70 %) |
| Executed automatically in RUN-2026-001 | 51 (6 self-skipped for missing provider credentials) |
| Suites | 3 (`utilities`, `api`, `ui`) + 1 perf probe + 1 reproducer |
| Assertions in the last run | 57 (35 pass, 16 documented-TODO, 6 skipped, 0 failing) |
| Automated feature coverage | 14/14 features have at least one automated assertion |
| Not automatable today | 8 manual UI cases (no browser runtime, `KI-005`) + 4 credential-gated LLM cases |

## API coverage

| Endpoint | Contract cases | Happy path | Negative | Edge | Notes |
|---|---|---|---|---|---|
| `POST /api/chat` | TC-001…TC-014 | blocked (credentials) | 4 executed + 2 TODO | 3 executed + 1 blocked | validation + method guard automated |
| `POST /api/create-persona` | TC-015…TC-021 | 2 executed | 3 executed (1 TODO) | 1 failing (BUG-015) | tone-reuse path automated |
| `POST /api/fetch-image` | TC-022…TC-026 | 2 executed | 2 executed (1 TODO) | 1 executed | fallback path automated |
| `/api/clear-history` | TC-054 | — | 1 failing | — | route does not exist (BUG-001) |

## UI coverage

| Surface | Automated evidence | Manual cases |
|---|---|---|
| `/` SSR shell, persona labels, empty state, input | TC-039…TC-042 (HTML assertions) | TC-044, TC-045, TC-053 |
| Prompt panel | none (feature dead, BUG-004) | TC-047 |
| Links copy/visit | static markup (TC-049) | TC-048 |
| Scroll helpers | none | TC-050 |
| Custom persona flow | API-level only (TC-017/018/021) | TC-051 |
| Error rendering | server payloads (TC-005) | TC-046 |

## Database coverage

**N/A** — the project has no database ([`../test-scenarios/database.md`](../test-scenarios/database.md)). The
cookie-storage equivalents (shape, round trip, corruption, capacity, expiry, scoping, flags) are covered by
TC-018, TC-055…TC-063, TC-074.

## Performance coverage

| Path | Measured | Baseline |
|---|---|---|
| `GET /` | yes | p95 72 ms (budget 500 ms) — SCN-077 |
| Validation error paths | yes | p95 30 ms (budget 200 ms) — SCN-078 |
| `POST /api/fetch-image` | yes | p95 52 ms (fallback path) |
| LLM round trip / HiPi pair | no | requires credentials — SCN-079/080 |
| Cold start / memory / throughput | no | no deployment access — SCN-082 |

## Security coverage

| Area | Cases | Outcome |
|---|---|---|
| Authentication / authorization | TC-064 | no auth exists (RISK-001) |
| Rate limiting / abuse | TC-065 | none (RISK-002) |
| CORS | TC-066, TC-067 | correct (no wildcard) |
| Security headers | TC-075 | none configured (RISK-003) |
| Information disclosure | TC-005, TC-068 | leaks provider text (BUG-013) |
| Injection | TC-019, TC-070, TC-071 | cookie-name + regex surfaces, prompt injection documented |
| Secrets | TC-069, TC-082 | clean |
| Dependencies | TC-072, TC-073 | 28 advisories (10 production, 1 critical) — BUG-017 |
| SSRF surface | SCN-094 | review only, not executed |

## How to recount (recipe)

```bash
node harness/automation/scripts/coverage-report.mjs          # counts from the docs
node harness/automation/scripts/check-references.mjs         # id/link integrity
grep -E '^# (tests|pass|fail|skipped|todo)' harness/test-results/latest/raw/*.log   # suite totals
npm audit --json | python3 -c 'import json,sys;print(json.load(sys.stdin)["metadata"]["vulnerabilities"])'
```

Counting rules:

* a test case is counted once, keyed by its `### TC-###` heading and its `| Status |` field;
* a scenario is counted from the last column of its row in `test-scenarios/*.md`;
* a requirement is counted from its status cell in `requirements/*.md`;
* a feature counts as "covered" when its `test-cases.md` index references at least one case;
* automated = the id appears in `automation/**/*.test.mjs` assertion names.

## Gaps that matter most

1. **Provider-dependent behaviour is unverified**: no real LLM reply, tone adherence, fallback-on-throttle or
   HiPi two-reply assertion has ever run (4 cases BLOCKED, 1 scenario family blocked).
2. **Custom persona pipeline is effectively broken** (BUG-006/007/008/009/012) — the newest feature has the
   weakest verification.
3. **UI interaction coverage is documentation-only** (8 cases) because no browser runtime is available.
4. **Production build/deploy path is unverified** (`next build` blocked by fonts; no `next start` run).
5. **No CI**: the 57 automated cases only run when someone runs them (KI-002).
