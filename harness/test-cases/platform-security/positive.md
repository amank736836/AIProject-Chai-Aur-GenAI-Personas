# platform-security — positive cases (posture that is correct)

### TC-066 — Cross-origin POST is not granted CORS access
| Field | Value |
|---|---|
| Test Case ID | TC-066 |
| Feature | platform |
| Priority | P1 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. `POST /api/chat` with `Origin: https://evil.example` 2. Inspect `Access-Control-Allow-Origin` |
| Test Data | [`authorization/anonymous-requests.json`](../../test-data/authorization/anonymous-requests.json) |
| Expected Result | No `ACAO` header (or not `*`) |
| Actual Result | no `ACAO` header returned → browsers cannot read the response cross-origin |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-066-cors-post.txt` |
| Related Requirement | NFR-012 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-067 — Preflight does not grant wildcard access
| Field | Value |
|---|---|
| Test Case ID | TC-067 |
| Feature | platform |
| Priority | P2 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. `OPTIONS /api/chat` with `Origin` + `Access-Control-Request-Method: POST` |
| Test Data | [`authorization/anonymous-requests.json`](../../test-data/authorization/anonymous-requests.json) |
| Expected Result | `204` with `allow: OPTIONS, POST` and no wildcard ACAO |
| Actual Result | `204`, `allow: OPTIONS, POST`, no ACAO |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-067-cors-preflight.txt` |
| Related Requirement | NFR-012 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-069 — No provider keys or `.env` files committed
| Field | Value |
|---|---|
| Test Case ID | TC-069 |
| Feature | platform |
| Priority | P0 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. Walk the repo (excluding `node_modules`, `.git`, `.next`, `harness`) 2. Flag `.env*` files and key patterns (`gsk_…`, `AIza…`) |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Zero findings |
| Actual Result | zero findings; `.gitignore` excludes `.env*` |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-069-secret-scan.json` |
| Related Requirement | NFR-011, BR-006 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-071 — Prompt-injection surface is documented (no filtering exists)
| Field | Value |
|---|---|
| Test Case ID | TC-071 |
| Feature | platform |
| Priority | P2 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. Build a prompt with an instruction-override message 2. Assert the text is appended verbatim |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Explicit, tested acknowledgement of the limitation (no silent claim of safety) |
| Actual Result | appended verbatim; mitigated only by the provider's own behaviour |
| Status | PASS (documentation guard) |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-071-prompt-injection.txt` |
| Related Requirement | NFR-012 |
| Related Bug | known limitation |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-074 — Server-set cookies carry `HttpOnly`, `SameSite`, `Path`, `Max-Age`
| Field | Value |
|---|---|
| Test Case ID | TC-074 |
| Feature | FEAT-006 |
| Priority | P1 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. `POST /api/chat` (or `/api/create-persona`) 2. Inspect `Set-Cookie` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `HttpOnly`, `SameSite=Lax`, `Path=/`, `Max-Age=2592000`; observation: no `Secure` attribute |
| Actual Result | all four present; no `Secure` (set by the platform when served over HTTPS, but not asserted by the app) |
| Status | PASS with observation |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-018-create-persona-cookie.txt` |
| Related Requirement | NFR-011 |
| Related Bug | RISK-003 (hardening) |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-082 — `.gitignore` covers secret-bearing paths
| Field | Value |
|---|---|
| Test Case ID | TC-082 |
| Feature | platform |
| Priority | P2 |
| Type | Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. Read `.gitignore` 2. Assert it covers `.env`, `node_modules`, `.next`, `coverage` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | All four patterns present |
| Actual Result | present (`# env files (can opt-in for committing if needed)` block, `/node_modules`, `/.next/`, `/coverage`) |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-082-gitignore.txt` |
| Related Requirement | NFR-011 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
