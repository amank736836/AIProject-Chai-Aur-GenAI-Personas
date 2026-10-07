# api-create-persona — edge cases

### TC-019 — Cookie name is not sanitised against `;` (attribute injection)
| Field | Value |
|---|---|
| Test Case ID | TC-019 |
| Feature | FEAT-004 |
| Priority | P2 |
| Type | Edge + Security |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/create-persona {"name":"x; Path=/evil"}` 2. Inspect `Set-Cookie` |
| Test Data | `../../test-data/edge-cases/edge-values.json` (special-character names) |
| Expected Result | A valid cookie header whose **name** cannot contain a delimiter (`;`, `=`, whitespace, control chars) |
| Actual Result | `set-cookie: personaData-x;-path=/evil=…; Path=/; HttpOnly; …` — the `;` splits the header inside the cookie name |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-019-create-persona-cookie-injection.txt` |
| Related Requirement | NFR-011 |
| Related Bug | BUG-015 (see also BUG-016 regex use of the same input) |
| Last Executed | 2026-10-07 (RUN-2026-001) |
**Related cases (same module, other types):** TC-021 covers persona reuse (positive), TC-017 covers provider
failure (negative). Regression for this module = TC-014 and TC-033.
