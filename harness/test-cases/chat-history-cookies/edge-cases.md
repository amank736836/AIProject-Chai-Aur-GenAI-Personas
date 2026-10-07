# chat-history-cookies — edge cases

### TC-057 — Saving a chat with Hindi/emoji text must not throw
| Field | Value |
|---|---|
| Test Case ID | TC-057 |
| Feature | FEAT-006 |
| Priority | P1 |
| Type | Edge (Unicode) |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Save `[{role:"user",text:"बताओ क्या हाल है?"},{role:"compare",hitesh:"हाँजी, चाय पीते हैं!"}]` |
| Test Data | [`edge-cases/unicode-chat.json`](../../test-data/edge-cases/unicode-chat.json) |
| Expected Result | The cookie is written (or a documented, handled failure) |
| Actual Result | `InvalidCharacterError: Invalid character` thrown by `btoa` — the save effect aborts for any non-Latin1 transcript |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log`, `../../evidence/api-responses/repro-findings.txt` |
| Related Requirement | REQ-011 |
| Related Bug | BUG-003 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-058 — Loader rejects the very format the writer produces
| Field | Value |
|---|---|
| Test Case ID | TC-058 |
| Feature | FEAT-006 |
| Priority | P1 |
| Type | Edge (format contract) |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. `setCookie("chatHistory", btoa(json))` (writer format) 2. `loadChatFromCookie()` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Parsed transcript |
| Actual Result | `null` — the loader expects a `hash` + `encoded` payload that the writer never produces, so a fresh reload finds no history (BUG-002). The assertion deliberately locks this **current** behaviour in place so that fixing BUG-002 forces a case update. |
| Status | PASS (regression guard) |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | REQ-011 |
| Related Bug | BUG-002 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-059 — Transcripts above the ~4 KB cookie limit cannot be stored
| Field | Value |
|---|---|
| Test Case ID | TC-059 |
| Feature | FEAT-006 |
| Priority | P2 |
| Type | Edge (capacity) |
| Preconditions | Repository checkout with `node_modules` installed (`npm install`); no running server or credentials needed |
| Steps | 1. Save a 60-message synthetic transcript 2. Measure the encoded cookie length |
| Test Data | [`valid/chat-history.json`](../../test-data/valid/chat-history.json) |
| Expected Result | Documented capacity limit; ideally a strategy (truncation, IndexedDB, server store) |
| Actual Result | Encoded length > 4096 bytes → browsers silently drop such cookies; no truncation or warning exists |
| Status | PASS (evidence for KI-004) |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/unit-tests.log` |
| Related Requirement | NFR-002 |
| Related Bug | KI-004 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
