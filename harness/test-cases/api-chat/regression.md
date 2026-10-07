# api-chat — regression cases

### TC-014 — Deterministic `/api/chat` contract is unchanged (method guard + validation)
| Field | Value |
|---|---|
| Test Case ID | TC-014 |
| Feature | FEAT-002, FEAT-003, FEAT-004 |
| Priority | P0 |
| Type | Regression |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `GET /api/chat` → expect `405` 2. `POST {}` → expect `400 {"error":"Message required"}` 3. Confirm no provider call for either |
| Test Data | [`valid/chat-requests.json`](../../test-data/valid/chat-requests.json) |
| Expected Result | Both invariants hold regardless of persona/cookie/prompt changes |
| Actual Result | `405` and `400` verified in the same automation run (TC-001, TC-004) |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/api-tests.log` |
| Related Requirement | REQ-006, REQ-010 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
**Re-run after:** any edit to `src/app/api/chat/route.ts`, `src/lib/prompt.js`, cookie names, or the AI SDK.
