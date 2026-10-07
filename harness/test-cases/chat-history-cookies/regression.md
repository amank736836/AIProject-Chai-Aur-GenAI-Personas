# chat-history-cookies — regression cases

### TC-054 — The unload beacon endpoint `/api/clear-history` exists
| Field | Value |
|---|---|
| Test Case ID | TC-054 |
| Feature | FEAT-013, FEAT-006 |
| Priority | P2 |
| Type | Regression (client-server contract) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/clear-history {"persona":"all"}` (exactly what `navigator.sendBeacon` sends) 2. Expect a 2xx/204 |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | The beacon is accepted and history cookies are cleared |
| Actual Result | `404` (Next.js 404 page) — no such route exists in `src/app/api/` |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-054-clear-history.json` |
| Related Requirement | REQ-031 |
| Related Bug | BUG-001 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
**Re-run after:** any change to `CookieManager.ts`, cookie names/flags in the route handlers, the
`beforeunload` handler, or the persona slug rules (BR-003). Related: TC-018 (server cookie flags),
TC-021 (persona tone reuse).
