# chat-history-cookies — negative cases

### TC-060 — No cookie → loader returns null without throwing
| Field | Value |
|---|---|
| Test Case ID | TC-060 |
| Feature | FEAT-006 |
| Priority | P2 |
| Type | Negative |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Clear the jar 2. `loadChatFromCookie()` |
| Test Data | [`invalid/chat-history.json`](../../test-data/invalid/chat-history.json) |
| Expected Result | `null`, no exception |
| Actual Result | `null` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-011 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-061 — Corrupt payload → loader returns null without throwing
| Field | Value |
|---|---|
| Test Case ID | TC-061 |
| Feature | FEAT-006 |
| Priority | P2 |
| Type | Negative |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `setCookie("chatHistory", btoa("not-json") + <literal pipe> + btoa("}"))` 2. `loadChatFromCookie()` 3. Assert it returns `null` and does not throw |
| Test Data | [`invalid/chat-history.json`](../../test-data/invalid/chat-history.json) |
| Expected Result | `null` (graceful) |
| Actual Result | `null` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-011 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-063 — Custom-persona history is read back from the request cookie
| Field | Value |
|---|---|
| Test Case ID | TC-063 |
| Feature | FEAT-006, FEAT-004 |
| Priority | P1 |
| Type | Negative |
| Preconditions | Provider credentials (to observe the prompt), or code review |
| Steps | 1. Send `persona:"test-persona"` with a valid `chatHistory-test-persona` cookie 2. Verify the previous turns appear in the prompt |
| Test Data | [`fixtures/cookies.json`](../../test-data/fixtures/cookies.json) |
| Expected Result | Previous turns replayed |
| Actual Result |  `history` is always `[]`: the route only builds a cookie name for the literal `custom` while the client sends the slug, and the `JSON.parse` of the wrong cookie throws and is swallowed (static proof; runtime confirmation needs credentials — BUG-008) |
| Status | FAIL (static evidence; runtime confirmation blocked without credentials) |
| Automation | PLANNED (static proof available) |
| Evidence | code reference `src/app/api/chat/route.ts:5-27`; documented in `../../bugs/open/BUG-008.md` |
| Related Requirement | REQ-018 |
| Related Bug | BUG-008 |
| Last Executed | NOT_EXECUTED (runtime), static review 2026-10-07 |
