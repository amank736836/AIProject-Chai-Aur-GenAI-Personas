# api-create-persona — positive cases

### TC-018 — Persona cookie is written with valid attributes
| Field | Value |
|---|---|
| Test Case ID | TC-018 |
| Feature | FEAT-004 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/create-persona {"name":"Harness Probe"}` 2. Inspect `Set-Cookie` |
| Test Data | [`sample-data/persona-names.json`](../../test-data/sample-data/persona-names.json) |
| Expected Result | `personaData-harness-probe=…; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` |
| Actual Result | exactly that header (payload URL-encoded JSON `{name,tone:"…"}`, tone empty offline) |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-018-create-persona-cookie.txt` |
| Related Requirement | REQ-016, BR-003, BR-005 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-020 — `@handle` enrichment produces a non-empty tone
| Field | Value |
|---|---|
| Test Case ID | TC-020 |
| Feature | FEAT-004 |
| Priority | P1 |
| Type | Positive (integration) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required; provider credentials exported (`GROQ_API_KEY`, optional `GOOGLE_GENERATIVE_AI_API_KEY`) — the case self-skips/blocks without them |
| Steps | 1. `POST /api/create-persona {"name":"@amank736836"}` 2. Verify `tone` is a meaningful description |
| Test Data | [`sample-data/persona-names.json`](../../test-data/sample-data/persona-names.json) |
| Expected Result | `200` with `tone` non-empty, ideally referencing profile facts |
| Actual Result | not run — the environment cannot reach the 10 profile hosts and has no provider keys (`tone:""` was returned instead) |
| Status | BLOCKED (network + credentials) |
| Automation | AUTOMATED (needs internet + credentials) |
| Evidence | — (`TC-020-create-persona-handle.json` when run) |
| Related Requirement | REQ-015 |
| Related Bug | BUG-012 (failure currently still reports success) |
| Last Executed | NOT_EXECUTED |
### TC-021 — Existing tone cookie short-circuits tone generation
| Field | Value |
|---|---|
| Test Case ID | TC-021 |
| Feature | FEAT-004 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/create-persona {"name":"Harness Reuse"}` with `Cookie: personaData-harness-reuse=<json with tone>` 2. Compare the returned tone |
| Test Data | `../../test-data/fixtures/cookies.json` |
| Expected Result | `200` and the tone from the cookie (`PRESET-TONE-FROM-COOKIE`) with **no** provider call |
| Actual Result | `200 {"success":true,"tone":"PRESET-TONE-FROM-COOKIE"}` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-021-create-persona-tone-reuse.json` |
| Related Requirement | REQ-016, BR-004 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
