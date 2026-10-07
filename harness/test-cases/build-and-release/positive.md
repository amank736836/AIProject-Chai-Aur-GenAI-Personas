# build-and-release — positive cases

### TC-076 — `npm run lint` passes with no errors
| Field | Value |
|---|---|
| Test Case ID | TC-076 |
| Feature | build |
| Priority | P0 |
| Type | Quality gate |
| Preconditions | Workstation with network access (npm registry and `fonts.googleapis.com` reachable), repository checkout, `node_modules` present; the dev server must be stopped before `npm run build` (it replaces `.next`) |
| Steps | 1. `npm run lint` 2. Count errors and warnings |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Exit code 0, zero errors |
| Actual Result | exit 0, **13 warnings** (6× `@next/next/no-img-element`, unused vars in `create-persona/route.ts:68`, `CookieManager.ts:34`, `page.tsx:163`) |
| Status | PASS with warnings |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/lint.log` |
| Related Requirement | NFR-005 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-077 — `npx tsc --noEmit` passes
| Field | Value |
|---|---|
| Test Case ID | TC-077 |
| Feature | build |
| Priority | P0 |
| Type | Quality gate |
| Preconditions | Workstation with network access (npm registry and `fonts.googleapis.com` reachable), repository checkout, `node_modules` present; the dev server must be stopped before `npm run build` (it replaces `.next`) |
| Steps | 1. `npx tsc --noEmit` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | No type errors under `strict: true` |
| Actual Result | no output, exit 0 |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../test-results/latest/raw/typecheck.log` |
| Related Requirement | NFR-004 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-080 — Dev server boots and serves the app
| Field | Value |
|---|---|
| Test Case ID | TC-080 |
| Feature | build |
| Priority | P0 |
| Type | Smoke |
| Preconditions | Workstation with network access (npm registry and `fonts.googleapis.com` reachable), repository checkout, `node_modules` present; the dev server must be stopped before `npm run build` (it replaces `.next`) |
| Steps | 1. `npm run dev -- -H 0.0.0.0 -p 3000` 2. `curl -o /dev/null -w '%{http_code}' localhost:3000` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Server listening; `200` |
| Actual Result | Turbopack dev server ready in ~6 s; `200` for `/`; `next/font` fetch attempts logged but the dev server tolerates them |
| Status | PASS |
| Automation | AUTOMATED (manual invocation) |
| Evidence | `../../evidence/logs/dev-server.log` |
| Related Requirement | NFR-003 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-081 — Dependencies install deterministically from the lockfile
| Field | Value |
|---|---|
| Test Case ID | TC-081 |
| Feature | build |
| Priority | P1 |
| Type | Quality gate |
| Preconditions | Workstation with network access (npm registry and `fonts.googleapis.com` reachable), repository checkout, `node_modules` present; the dev server must be stopped before `npm run build` (it replaces `.next`) |
| Steps | 1. `npm install --no-audit --no-fund` in a clean checkout 2. Check for lockfile drift (`git status`) |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Install succeeds without modifying `package-lock.json` |
| Actual Result | `added 354 packages in 13s`; `git status` showed no changes to `package-lock.json` |
| Status | PASS |
| Automation | AUTOMATED (manual invocation) |
| Evidence | `../../test-results/latest/raw/run-context.txt`, repository status output |
| Related Requirement | NFR-001 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
