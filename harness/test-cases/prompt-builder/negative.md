# prompt-builder — negative cases

### TC-032 — Tone written by `/api/create-persona` (a string) is ignored
| Field | Value |
|---|---|
| Test Case ID | TC-032 |
| Feature | FEAT-010, FEAT-004 |
| Priority | P1 |
| Type | Negative |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Cookie `personaData-test-persona` = `{name:"Test Persona", tone:"You are a friendly mentor…"}` (exactly what the API writes) 2. `buildPrompt("test-persona","hello","Test Persona",[],cookies)` 3. Assert the tone text is used |
| Test Data | [`fixtures/cookies.json`](../../test-data/fixtures/cookies.json) |
| Expected Result | The tone description appears in the prompt (systemPrompt or tone guidelines) |
| Actual Result | `false` — the prompt is the generic template with **empty** tone guidelines (`You are acting as Test Persona.\n Tone guidelines:\n \n…`) |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-032-prompt-custom-tone.txt` (reproducer output) |
| Related Requirement | REQ-017 |
| Related Bug | BUG-006 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-033 — `@handle` tone lookup never matches the created cookie
| Field | Value |
|---|---|
| Test Case ID | TC-033 |
| Feature | FEAT-010, FEAT-004 |
| Priority | P1 |
| Type | Negative |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Cookie key `personaData-@amank736836` (as `create-persona` writes it) 2. `buildPrompt("amank736836", …)` (as `chat/route.ts` calls it after stripping `@`) 3. Assert the tone is found |
| Test Data | [`fixtures/cookies.json`](../../test-data/fixtures/cookies.json) |
| Expected Result | Tone found (`AT-HANDLE-TONE` present) |
| Actual Result | `false` — the lookup looks for `personaData-amank736836`, the cookie is `personaData-@amank736836` |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log`, `../../evidence/api-responses/repro-findings.txt` |
| Related Requirement | REQ-017 |
| Related Bug | BUG-007 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-034 — Unknown persona falls back to the generic template
| Field | Value |
|---|---|
| Test Case ID | TC-034 |
| Feature | FEAT-010, FEAT-003 |
| Priority | P2 |
| Type | Negative → tolerated |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `buildPrompt("someone-new","hello","Someone New",[],{})` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | No exception; generic `You are acting as …` template (documented degraded behaviour) |
| Actual Result | generic template with empty tone guidance |
| Status | PASS (behaviour is as coded; the degraded quality is tracked as a gap) |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-033 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
