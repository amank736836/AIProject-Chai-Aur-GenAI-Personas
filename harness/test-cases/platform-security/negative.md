# platform-security — negative cases (posture that is weak)

### TC-064 — API routes are reachable without authentication
| Field | Value |
|---|---|
| Test Case ID | TC-064 |
| Feature | platform |
| Priority | P0 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. `POST /api/chat {}` with no cookies/tokens 2. Confirm the request is processed (400 validation), not rejected as unauthenticated |
| Test Data | [`authorization/anonymous-requests.json`](../../test-data/authorization/anonymous-requests.json) |
| Expected Result | Either explicit public-by-design documentation or an access control; today: anonymous |
| Actual Result | `400 {"error":"Message required"}` — request processed anonymously; every route is open |
| Status | PASS as a finding (`RISK-001`) — the "expected" is a product decision, not a bug |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-064-anonymous-access.json` |
| Related Requirement | NFR-012 |
| Related Bug | RISK-001 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-065 — No rate limiting: 20 rapid requests are all processed
| Field | Value |
|---|---|
| Test Case ID | TC-065 |
| Feature | platform |
| Priority | P0 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. Send 20 consecutive `POST /api/chat {}` requests 2. Record statuses |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Documentation of the missing control (`RISK-002`) or a 429 |
| Actual Result | 20× `400`, none throttled |
| Status | PASS as a finding (`RISK-002`) |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-065-no-rate-limit.json` |
| Related Requirement | NFR-012 |
| Related Bug | RISK-002 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-068 — Error payloads must not disclose provider internals
| Field | Value |
|---|---|
| Test Case ID | TC-068 |
| Feature | FEAT-012 |
| Priority | P1 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. Trigger a provider failure 2. Assert the body contains no `GROQ_API_KEY` / `GOOGLE_GENERATIVE_AI_API_KEY` / `apiKey` references |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Generic message such as "The assistant is temporarily unavailable." |
| Actual Result | body contains `"Groq API key is missing. Pass it using the 'apiKey' parameter or the GROQ_API_KEY environment variable."` |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-068-security-provider-error.json` |
| Related Requirement | NFR-014 |
| Related Bug | BUG-013 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-075 — Security headers are present on `/`
| Field | Value |
|---|---|
| Test Case ID | TC-075 |
| Feature | platform |
| Priority | P1 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. `GET /` 2. Record `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | At least a CSP and `X-Content-Type-Options: nosniff` |
| Actual Result | none of the four headers are present (`next.config.ts` defines no `headers()`) |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-075-security-headers.json` |
| Related Requirement | NFR-012, RISK-003 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
