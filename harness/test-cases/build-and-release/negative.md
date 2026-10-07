# build-and-release — blockers

### TC-078 — `npm run build` (production build) succeeds
| Field | Value |
|---|---|
| Test Case ID | TC-078 |
| Feature | build/deploy |
| Priority | P0 |
| Type | Quality gate |
| Preconditions | Workstation with network access (npm registry and `fonts.googleapis.com` reachable), repository checkout, `node_modules` present; the dev server must be stopped before `npm run build` (it replaces `.next`) |
| Steps | 1. `npm run build` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Successful production build (`next build`) |
| Actual Result | **FAILED**: `next/font` cannot fetch Geist/Geist Mono from `fonts.googleapis.com` (ECONNRESET, 3 retries) → "Failed to compile." This is an environment limitation of the offline sandbox, not a proven application defect |
| Status | BLOCKED (network access to Google Fonts required) |
| Automation | AUTOMATED (manual invocation) |
| Evidence | `../../evidence/logs/build.log` |
| Related Requirement | NFR-006 |
| Related Bug | KI-003 |
| Last Executed | 2026-10-07 (RUN-2026-001, blocked) |
### TC-079 — Production server (`npm run start`) serves the app
| Field | Value |
|---|---|
| Test Case ID | TC-079 |
| Feature | build/deploy |
| Priority | P1 |
| Type | Smoke |
| Preconditions | Workstation with network access (npm registry and `fonts.googleapis.com` reachable), repository checkout, `node_modules` present; the dev server must be stopped before `npm run build` (it replaces `.next`) |
| Steps | 1. `npm run build` (see TC-078) 2. `npm run start` 3. Repeat the smoke scenarios against the production server |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Production bundle serves `/` and the API routes |
| Actual Result | not run — depends on TC-078, which is blocked |
| Status | BLOCKED (depends on TC-078) |
| Automation | PLANNED |
| Evidence | — |
| Related Requirement | NFR-006 |
| Related Bug | KI-003 |
| Last Executed | NOT_EXECUTED |
