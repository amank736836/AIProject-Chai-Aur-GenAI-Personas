# api-chat — negative cases

### TC-001 — Missing `message` → 400 `Message required`
| Field | Value |
|---|---|
| Test Case ID | TC-001 |
| Feature | FEAT-012 |
| Priority | P1 |
| Type | Negative |
| Preconditions | Dev server on `BASE_URL`; no provider keys needed (validation precedes the LLM call) |
| Steps | 1. `curl -X POST $BASE_URL/api/chat -H 'Content-Type: application/json' -d '{}'` 2. Inspect status/body |
| Test Data | `{}` — `../../test-data/invalid/chat-requests.json` |
| Expected Result | `400` and `{"error":"Message required"}`; no provider call in the server log |
| Actual Result | `400 {"error":"Message required"}` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-001-chat-missing-message.json` |
| Related Requirement | REQ-006 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-002 — Malformed JSON body → `400` JSON error (currently 500)
| Field | Value |
|---|---|
| Test Case ID | TC-002 |
| Feature | FEAT-012 |
| Priority | P1 |
| Type | Negative |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `curl -X POST $BASE_URL/api/chat -H 'Content-Type: application/json' -d 'not-json'` |
| Test Data | `not-json`, `}` — `../../test-data/invalid/chat-requests.json` |
| Expected Result | `400` with a JSON `error` field |
| Actual Result | `500` with an **empty body** (`req.json()` throws outside the try/catch) |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-002-chat-invalid-json.txt`, `../../evidence/logs/dev-server.log` |
| Related Requirement | REQ-034 |
| Related Bug | BUG-010 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-003 — Whitespace-only message is rejected
| Field | Value |
|---|---|
| Test Case ID | TC-003 |
| Feature | FEAT-012 |
| Priority | P2 |
| Type | Negative |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/chat {"message":"   ","persona":"hitesh"}` 2. Check whether a provider call was attempted |
| Test Data | `{"message":"   "}`, `{"message":"\t\n"}` |
| Expected Result | `400 {"error":"Message required"}` (message is semantically empty) |
| Actual Result | `500` from the provider layer — the value passed the truthiness check and was forwarded to Groq |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-003-chat-whitespace.json`, `../../evidence/logs/repro-findings.log` |
| Related Requirement | REQ-006 |
| Related Bug | BUG-011 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-004 — `GET /api/chat` → 405 Method Not Allowed
| Field | Value |
|---|---|
| Test Case ID | TC-004 |
| Feature | FEAT-012 |
| Priority | P2 |
| Type | Negative |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `curl -i $BASE_URL/api/chat` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `405` and an `allow: OPTIONS, POST` header |
| Actual Result | `405`, `allow: OPTIONS, POST` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-004-chat-get.txt` |
| Related Requirement | REQ-010 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-005 — Provider failure returns a generic error payload
| Field | Value |
|---|---|
| Test Case ID | TC-005 |
| Feature | FEAT-012, FEAT-011 |
| Priority | P0 |
| Type | Negative |
| Preconditions | No provider credentials set (reproduces the "provider unavailable" path deterministically) |
| Steps | 1. `POST /api/chat {"message":"hello","persona":"hitesh"}` 2. Inspect status and body |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | A 5xx JSON error whose text does **not** contain provider internals, env-var names or keys |
| Actual Result | `500 {"error":"Groq API key is missing. Pass it using the 'apiKey' parameter or the GROQ_API_KEY environment variable."}` |
| Status | FAIL (message guarantees request failure; only the leak is the defect) |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-005-chat-provider-error.json` |
| Related Requirement | REQ-010 |
| Related Bug | BUG-013 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
