# Test Cases

Executable, specific cases (`TC-###`). Each case uses the same template and records its own status, evidence
and traceability. Cases are grouped by module; the file name tells you the *type* of case inside.

```
test-cases/
├── api-chat/               TC-001 … TC-014   POST /api/chat contract & behaviour
├── api-create-persona/     TC-015 … TC-021   POST /api/create-persona
├── api-fetch-image/        TC-022 … TC-026   POST /api/fetch-image
├── prompt-builder/         TC-027 … TC-038   src/lib/prompt.js unit level
├── ui-persona-and-chat/    TC-039 … TC-053   rendered UI surface & interactions
├── chat-history-cookies/   TC-054 … TC-063   cookie persistence & clearing
├── platform-security/      TC-064 … TC-075   auth, CORS, headers, abuse, dependencies
└── build-and-release/      TC-076 … TC-082   lint, typecheck, build, install
```

## Template

Every case is a table with these fifteen rows, in this order (the heading above the table carries the title,
e.g. `### TC-032 — Tone written by create-persona (a string) is ignored`):

```markdown
| Field | Value |
|---|---|
| Test Case ID | TC-### |
| Feature | FEAT-### |
| Priority | P0 | P1 | P2 | P3 |
| Type | Positive | Negative | Edge | Integration | Regression | Performance | Security |
| Preconditions | environment/state needed before running (dev server, credentials, browser) |
| Steps | numbered, reproducible actions (commands where possible) |
| Test Data | inline values or a file under `../../test-data/` |
| Expected Result | observable, specific outcome |
| Actual Result | what actually happened (or `NOT_EXECUTED — <reason>`) |
| Status | PASS | FAIL | BLOCKED | NOT_EXECUTED |
| Automation | AUTOMATED | PARTIAL | MANUAL | PLANNED |
| Evidence | file under `../../evidence/` (only for executed cases) |
| Related Requirement | REQ-### / NFR-### / BR-### |
| Related Bug | BUG-### / RISK-### / — |
| Last Executed | date + RUN id, or `NOT_EXECUTED` |
```

Free-form notes may follow the table (re-run triggers, related cases) — they are not part of the template.

## Status meaning

| Status | Rule |
|---|---|
| PASS | executed; observed result matched the expectation (evidence linked) |
| FAIL | executed (or proven by unit/static evidence) and the expectation was **not** met; a `BUG-*` or `RISK-*` id is linked |
| BLOCKED | cannot run in this environment (provider credentials, outbound internet); needs a specific capability |
| NOT_EXECUTED | manual/browser/environment-dependent; a checklist exists but no run has been recorded |

## Automation mapping

| Suite | Cases | Command |
|---|---|---|
| `automation/api/*.test.mjs` | TC-001…TC-006, TC-015…TC-019, TC-021…TC-024, TC-026, TC-054, TC-064…TC-069, TC-071, TC-075, TC-082 | `node --test "harness/automation/api/*.test.mjs"` |
| `automation/utilities/*.test.mjs` | TC-027…TC-038, TC-055…TC-062 | `node --test "harness/automation/utilities/*.test.mjs"` |
| `automation/ui/ssr-smoke.test.mjs` | TC-039…TC-043, TC-049 | `node --test "harness/automation/ui/*.test.mjs"` |
| `automation/performance/api-latency.mjs` | supports TC-039, TC-001, TC-015 (SCN-077/078) | `node harness/automation/performance/api-latency.mjs` |

Every automated assertion embeds its `TC-*` id in the test name, so `test-results/*/raw/*.log` is a 1:1 map
of the status table. Cases marked `MARKED # TODO` in the logs are the documented FAILs (linked to a bug) —
see the convention note in [`../TESTING_STRATEGY.md`](../TESTING_STRATEGY.md).
