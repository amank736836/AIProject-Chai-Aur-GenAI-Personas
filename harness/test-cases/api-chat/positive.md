# api-chat — positive cases

### TC-007 — Valid `hitesh` message produces a reply, history and history cookie
| Field | Value |
|---|---|
| Test Case ID | TC-007 |
| Feature | FEAT-003 |
| Priority | P0 |
| Type | Positive |
| Preconditions | Server running; `GROQ_API_KEY` (or Gemini fallback key) set |
| Steps | 1. `POST /api/chat {"message":"Say hi in one word","persona":"hitesh"}` 2. Inspect JSON and `Set-Cookie` |
| Test Data | `../../test-data/valid/chat-requests.json` (`hitesh` entry) |
| Expected Result | `200`; `hitesh` non-empty string; `piyush` null; `history` has user+assistant turns; `Set-Cookie` starts `chatHistory-hitesh=` with `HttpOnly; SameSite=Lax; Max-Age=2592000` |
| Actual Result | not run — no provider credentials |
| Status | BLOCKED (credentials) |
| Automation | AUTOMATED (credential-gated) |
| Evidence | — (test writes `evidence/api-responses/TC-007-chat-happy-hitesh.json` when run) |
| Related Requirement | REQ-005, REQ-008 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
### TC-008 — HiPi mode returns both replies
| Field | Value |
|---|---|
| Test Case ID | TC-008 |
| Feature | FEAT-002 |
| Priority | P0 |
| Type | Positive |
| Preconditions | Provider credentials set |
| Steps | 1. `POST /api/chat {"message":"Say hi in one word","persona":"both"}` 2. Check both fields |
| Test Data | `../../test-data/valid/chat-requests.json` (`both` entry) |
| Expected Result | `200`; `hitesh` and `piyush` both non-empty; `chatHistory-both` cookie set |
| Actual Result | not run — no provider credentials |
| Status | BLOCKED (credentials) |
| Automation | AUTOMATED (credential-gated) |
| Evidence | — (`TC-008-chat-happy-both.json` when run) |
| Related Requirement | REQ-008, BR-002 |
| Related Bug | BUG-014 (history keeps only the Hitesh reply) |
| Last Executed | NOT_EXECUTED |
### TC-009 — `piyush` mode leaves the `hitesh` field null
| Field | Value |
|---|---|
| Test Case ID | TC-009 |
| Feature | FEAT-003 |
| Priority | P0 |
| Type | Positive |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required; provider credentials exported (`GROQ_API_KEY`, optional `GOOGLE_GENERATIVE_AI_API_KEY`) — the case self-skips/blocks without them |
| Steps | 1. `POST /api/chat {"message":"Say hi in one word","persona":"piyush"}` |
| Test Data | [`valid/chat-requests.json`](../../test-data/valid/chat-requests.json) |
| Expected Result | `200`; `hitesh === null`; `piyush` non-empty; `chatHistory-piyush` cookie |
| Actual Result | not run — no provider credentials |
| Status | BLOCKED (credentials) |
| Automation | AUTOMATED (credential-gated) |
| Evidence | — (`TC-009-chat-happy-piyush.json`) |
| Related Requirement | REQ-008 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
### TC-010 — Provider throttling surfaces HTTP 429 with `rateLimit:true`
| Field | Value |
|---|---|
| Test Case ID | TC-010 |
| Feature | FEAT-011, FEAT-012 |
| Priority | P1 |
| Type | Positive (designed degradation) |
| Preconditions | Both providers throttled or quota-exhausted (needs a real throttle event) |
| Steps | 1. Send chat requests until the provider rate-limits 2. Inspect status/body |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `429` with `rateLimit:true` and the retry hint text; UI shows it in both persona bubbles |
| Actual Result | not run — the automated case self-skips when no provider key is present, so no throttle could be induced |
| Status | BLOCKED (credentials) |
| Automation | AUTOMATED (credential-gated) |
| Evidence | — |
| Related Requirement | REQ-010 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
