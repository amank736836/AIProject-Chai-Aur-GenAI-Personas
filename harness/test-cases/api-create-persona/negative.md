# api-create-persona — negative cases

### TC-015 — Missing `name` → 400 `Name required`
| Field | Value |
|---|---|
| Test Case ID | TC-015 |
| Feature | FEAT-012, FEAT-004 |
| Priority | P1 |
| Type | Negative |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/create-persona {}` 2. Inspect status/body |
| Test Data | [`invalid/create-persona-requests.json`](../../test-data/invalid/create-persona-requests.json) |
| Expected Result | `400 {"error":"Name required"}` |
| Actual Result | `400 {"error":"Name required"}` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-015-create-persona-missing-name.json` |
| Related Requirement | REQ-014 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-016 — Malformed JSON body → 400 (currently 500)
| Field | Value |
|---|---|
| Test Case ID | TC-016 |
| Feature | FEAT-012 |
| Priority | P1 |
| Type | Negative |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/create-persona` with body `}` |
| Test Data | [`invalid/create-persona-requests.json`](../../test-data/invalid/create-persona-requests.json) |
| Expected Result | `400` with a JSON error |
| Actual Result | `500` with an empty body |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-016-create-persona-invalid-json.txt` |
| Related Requirement | REQ-034 |
| Related Bug | BUG-010 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-017 — Provider failure must not be reported as success
| Field | Value |
|---|---|
| Test Case ID | TC-017 |
| Feature | FEAT-004, FEAT-012 |
| Priority | P1 |
| Type | Negative |
| Preconditions | No provider credentials (tone generation must fail) |
| Steps | 1. `POST /api/create-persona {"name":"Harness Probe"}` 2. Inspect status and `tone` |
| Test Data | [`invalid/create-persona-requests.json`](../../test-data/invalid/create-persona-requests.json) |
| Expected Result | An error status (or a documented degraded response) — never `success:true` with an empty persona |
| Actual Result | `200 {"success":true,"tone":""}` while `getLLMResponse` threw; the exception is swallowed and an empty tone is persisted in the cookie |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-017-create-persona-silent-failure.json` |
| Related Requirement | REQ-013 |
| Related Bug | BUG-012 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
