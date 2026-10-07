# FEAT-012 — Requirements

| ID | Requirement | Test case | Status |
|---|---|---|---|
| REQ-006 | `/api/chat` without `message` → `400 {"error":"Message required"}` | TC-001 | PASS |
| REQ-014 | `/api/create-persona` without `name` → `400 {"error":"Name required"}` | TC-015 | PASS |
| REQ-020 (validation part) | `/api/fetch-image` without `name` → `400 {"error":"Name required"}` | TC-022 | PASS |
| REQ-010 | Provider throttling → `429 {error, rateLimit:true}`; other failures → `500 {error}` | TC-005, TC-010 | PARTIAL (500 verified) |
| REQ-034 | Malformed JSON → 4xx JSON, never an unhandled 5xx | TC-002, TC-016, TC-024 | FAIL (BUG-010) |
| — | Errors must not disclose provider internals or environment variable names | TC-005, TC-068 | FAIL (BUG-013) |
| BR-012 | Errors render inside the transcript; no blocking dialogs | TC-046 (manual) | NOT_EXECUTED |
| — | Input is re-enabled after any failure so the user can retry | TC-046 (manual) | NOT_EXECUTED |
