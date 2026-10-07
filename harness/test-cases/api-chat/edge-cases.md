# api-chat — edge cases

### TC-006 — Oversized body (>50 KB) is accepted by the handler (documented risk)
| Field | Value |
|---|---|
| Test Case ID | TC-006 |
| Feature | FEAT-012 |
| Priority | P2 |
| Type | Edge |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/chat` with a 51,200-character message 2. Check the status |
| Test Data | `{"message":"A"*51200,"persona":"hitesh"}` — `../../test-data/edge-cases/edge-values.json` |
| Expected Result | No crash; the platform/app behaviour is documented (no 413 today) |
| Actual Result | `500` from the provider layer (`size_up=51237` bytes uploaded) — no `413` |
| Status | PASS (documents the absence of a payload cap) |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-006-chat-oversized-body.json` |
| Related Requirement | NFR-012 |
| Related Bug | RISK-002 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-011 — Custom-persona chat persists `chatHistory-<slug>` and replays it
| Field | Value |
|---|---|
| Test Case ID | TC-011 |
| Feature | FEAT-006, FEAT-004 |
| Priority | P1 |
| Type | Edge (custom branch) |
| Preconditions | Provider credentials; a custom persona already created (`personaData-<slug>` cookie) |
| Steps | 1. `POST /api/chat {"message":"hi","persona":"test-persona","customName":"Test Persona"}` 2. Repeat with the returned cookie 3. Inspect the prompt/history behaviour |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `200` with a `custom` reply; `chatHistory-test-persona` cookie written; second request replays the first turn |
| Actual Result | not run — no provider credentials; static review shows the write side exists but the read side is broken (`BUG-008`) |
| Status | BLOCKED (credentials) |
| Automation | PLANNED (credential-gated) |
| Evidence | — |
| Related Requirement | REQ-018 |
| Related Bug | BUG-008 |
| Last Executed | NOT_EXECUTED |
### TC-012 — Custom-persona tone reaches the prompt end-to-end
| Field | Value |
|---|---|
| Test Case ID | TC-012 |
| Feature | FEAT-004, FEAT-010 |
| Priority | P1 |
| Type | Edge (integration) |
| Preconditions | A persona created through the UI (`tone` stored as a **string**) |
| Steps | 1. Create persona `Test Persona` 2. Chat with it 3. Inspect the prompt (or the prompt panel once BUG-004 is fixed) |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | The generated tone description appears in the prompt |
| Actual Result | proven not to happen at unit level: `buildPrompt` requires `tone.systemPrompt`, so the string is dropped (TC-032 evidence) |
| Status | FAIL |
| Automation | PARTIAL (unit proxy: TC-032) |
| Evidence | `../../evidence/api-responses/TC-032-prompt-custom-tone.txt` (shared with TC-032) |
| Related Requirement | REQ-017 |
| Related Bug | BUG-006 |
| Last Executed | 2026-10-07 (unit proxy, RUN-2026-001) |
### TC-013 — HiPi issues exactly two provider calls and returns both replies
| Field | Value |
|---|---|
| Test Case ID | TC-013 |
| Feature | FEAT-002 |
| Priority | P1 |
| Type | Edge (concurrency) |
| Preconditions | Provider credentials and a way to observe provider traffic (rate limits or provider dashboard) |
| Steps | 1. `POST /api/chat {"message":"hi","persona":"both"}` 2. Confirm both fields and two provider invocations; compare wall-clock with a single-persona request |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Two calls; wall-clock ≈ slower single call, not the sum; both replies present |
| Actual Result | not run — no credentials |
| Status | BLOCKED (credentials) |
| Automation | PLANNED |
| Evidence | — |
| Related Requirement | REQ-008 |
| Related Bug | RISK-008, KI-007 |
| Last Executed | NOT_EXECUTED |
