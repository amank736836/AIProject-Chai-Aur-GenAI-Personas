# prompt-builder — edge cases

### TC-035 — No-greeting / answer-directly instruction is always present
| Field | Value |
|---|---|
| Test Case ID | TC-035 |
| Feature | FEAT-010 |
| Priority | P1 |
| Type | Edge |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Build prompts for `hitesh`, `piyush`, `both` 2. Assert each ends with `do NOT start with greetings or generic openers` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Present in every branch |
| Actual Result | present in all three |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-012, BR-008 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-036 — Repeated prompt builds do not crash the signature picker
| Field | Value |
|---|---|
| Test Case ID | TC-036 |
| Feature | FEAT-010 |
| Priority | P2 |
| Type | Edge |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Build 25 Hitesh prompts 2. Assert no exception and that the prompts vary (random signature line) |
| Test Data | [`edge-cases/edge-values.json`](../../test-data/edge-cases/edge-values.json) |
| Expected Result | No crash; variation observed in length/signature |
| Actual Result | no crash; lengths vary by the randomly chosen signature line |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-012 |
| Related Bug | RISK-008 (module-level state) |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-038 — Empty user message is tolerated at prompt level
| Field | Value |
|---|---|
| Test Case ID | TC-038 |
| Feature | FEAT-010, FEAT-012 |
| Priority | P2 |
| Type | Edge |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `buildPrompt("hitesh","","",[])` |
| Test Data | [`edge-cases/edge-values.json`](../../test-data/edge-cases/edge-values.json) |
| Expected Result | The prompt still builds (validation is the API's job); documents that whitespace/empty never reaches the provider legitimately |
| Actual Result | prompt built with `User: ` empty |
| Status | PASS (documents behaviour; the API-side gap is TC-003/BUG-011) |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-012 |
| Related Bug | BUG-011 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
