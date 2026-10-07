# api-fetch-image — negative cases

### TC-022 — Missing `name` → 400 `Name required`
| Field | Value |
|---|---|
| Test Case ID | TC-022 |
| Feature | FEAT-005, FEAT-012 |
| Priority | P2 |
| Type | Negative |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/fetch-image {}` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `400 {"error":"Name required"}` |
| Actual Result | `400 {"error":"Name required"}` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-022-fetch-image-missing-name.json` |
| Related Requirement | REQ-020 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-024 — Malformed JSON body → 400 (currently 500)
| Field | Value |
|---|---|
| Test Case ID | TC-024 |
| Feature | FEAT-012 |
| Priority | P2 |
| Type | Negative |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/fetch-image` with body `nope` |
| Test Data | [`invalid/chat-requests.json`](../../test-data/invalid/chat-requests.json) |
| Expected Result | `400` with a JSON error |
| Actual Result | `500` with an empty body |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-024-fetch-image-invalid-json.txt` |
| Related Requirement | REQ-034 |
| Related Bug | BUG-010 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
