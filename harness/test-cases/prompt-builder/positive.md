# prompt-builder — positive cases

All cases run through `harness/automation/utilities/prompt-builder.test.mjs` against the real
`src/lib/prompt.js` (loaded without modifying it). Fixtures are the shipped tone files.

### TC-027 — Built-in prompt embeds `systemPrompt` from `data/<persona>-tone.json`
| Field | Value |
|---|---|
| Test Case ID | TC-027 |
| Feature | FEAT-010 |
| Priority | P0 |
| Type | Positive |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `buildPrompt("hitesh","kya haal hai?","",[])` 2. Assert it contains the file's `systemPrompt` and ends with the direct-answer instruction |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Hitesh `systemPrompt` present; prompt length ≈7.9 KB |
| Actual Result | contains the system prompt; length 7,873–7,886 chars |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-003, BR-001 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-028 — HiPi merges both personas and signs as "HiPi"
| Field | Value |
|---|---|
| Test Case ID | TC-028 |
| Feature | FEAT-010, FEAT-002 |
| Priority | P0 |
| Type | Positive |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `buildPrompt("both","hello","",[])` 2. Assert both system prompts are present and the closing instruction says "HiPi" |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Both tone prompts present; `Reply as if you are HiPi`; length > single-persona prompt |
| Actual Result | both present; 14,043 chars vs 7.9 KB single |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | BR-002 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-029 — History serialised as `User:` / `Hitesh:` lines in order
| Field | Value |
|---|---|
| Test Case ID | TC-029 |
| Feature | FEAT-010, FEAT-006 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Build a prompt with a 2-turn history 2. Assert `User: pehla sawaal` and `Hitesh: pehla jawaab` appear in order |
| Test Data | [`valid/chat-history.json`](../../test-data/valid/chat-history.json) |
| Expected Result | Ordered history lines, then the new `User:` message |
| Actual Result | as expected |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-011 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-030 — Link question injects the exact URL from the tone JSON
| Field | Value |
|---|---|
| Test Case ID | TC-030 |
| Feature | FEAT-010 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `buildPrompt("hitesh","aapka LinkedIn link bhejo","",[])` 2. Assert the LinkedIn URL from `data/hitesh-tone.json` is present |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | The exact URL from `links[]` appears in the instruction |
| Actual Result | `https://www.linkedin.com/in/hiteshchoudhary` present |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-025, BR-009 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-031 — Cookie tone shaped as an object with `systemPrompt` is honoured
| Field | Value |
|---|---|
| Test Case ID | TC-031 |
| Feature | FEAT-010, FEAT-004 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Call `buildPrompt("test-persona","hello","Test Persona",[],{"personaData-test-persona": JSON with tone.systemPrompt})` 2. Assert the marker text is in the prompt |
| Test Data | [`fixtures/cookies.json`](../../test-data/fixtures/cookies.json) |
| Expected Result | `CUSTOM-TONE-SYSTEM-PROMPT` appears |
| Actual Result | present (this is the only shape that works) |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-017 |
| Related Bug | — (contrast with TC-032) |
| Last Executed | 2026-10-07 (RUN-2026-001) |
