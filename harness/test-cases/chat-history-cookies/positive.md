# chat-history-cookies — positive cases

Unit-level, executed with `node --test "harness/automation/utilities/*.test.mjs"` against the real
`src/app/components/CookieManager.ts` (a minimal in-memory cookie fake is installed; no app code is modified).

### TC-055 — Saving a chat writes a `chatHistory` cookie
| Field | Value |
|---|---|
| Test Case ID | TC-055 |
| Feature | FEAT-006 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `saveChatToCookieWithData([{role:"user",text:"hello"}])` 2. Assert `document.cookie` contains `chatHistory=` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | A `chatHistory` cookie exists with a base64 payload |
| Actual Result | `chatHistory=W3sicm9sZSI6InVzZXIiLCJ0ZXh0IjoiaGVsbG8ifV0%3D; expires=…` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-011 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-056 — Saved chat can be loaded back (reload restore)
| Field | Value |
|---|---|
| Test Case ID | TC-056 |
| Feature | FEAT-006 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Save a 2-message transcript 2. Call `loadChatFromCookie()` 3. Assert deep equality |
| Test Data | [`valid/chat-history.json`](../../test-data/valid/chat-history.json) |
| Expected Result | The exact transcript array |
| Actual Result |  `loadChatFromCookie()` returns `null` — the saved transcript is not restored (deep-equality assertion fails; BUG-002) |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log`, `../../evidence/api-responses/repro-findings.txt` |
| Related Requirement | REQ-011 |
| Related Bug | BUG-002 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-062 — `setCookie`/`getCookie` round-trip special characters
| Field | Value |
|---|---|
| Test Case ID | TC-062 |
| Feature | FEAT-006 |
| Priority | P2 |
| Type | Positive |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `setCookie("personaData", '{"name":"Test Persona","tone":"a;b=c"}')` 2. `getCookie("personaData")` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Exact string match (encoding handles `;`, `=`, spaces) |
| Actual Result | equal |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-016 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
