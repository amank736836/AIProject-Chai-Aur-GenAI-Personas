# platform-security — regression cases

### TC-072 — Dependency advisories (npm audit) stay at the documented level
| Field | Value |
|---|---|
| Test Case ID | TC-072 |
| Feature | platform |
| Priority | P1 |
| Type | Regression (supply chain) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. `npm audit --json` and `npm audit --omit=dev --json` 2. Compare with the recorded baseline |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Zero critical/high advisories in production dependencies |
| Actual Result | all: 28 (5 low, 2 moderate, 19 high, 2 critical); production only: 10 (5 low, 0 moderate, 4 high, 1 critical) — `next@15.4.10`, fix available in `next@15.5.27` |
| Status | FAIL |
| Automation | AUTOMATED (manual invocation) |
| Evidence | `../../evidence/logs/npm-audit.json`, `../../evidence/logs/npm-audit-summary.txt` |
| Related Requirement | NFR-013 |
| Related Bug | BUG-017 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-073 — Previously fixed advisories are not reintroduced
| Field | Value |
|---|---|
| Test Case ID | TC-073 |
| Feature | platform |
| Priority | P2 |
| Type | Regression |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. Confirm the installed `next` version matches the one delivered by the merged remediation PR (#2 "Fix React Server Components CVE vulnerabilities") 2. Confirm `package.json`/`package-lock.json` agree |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | The remediation stays in place (no downgrade) |
| Actual Result | `package.json` `next@^15.4.10`, lockfile `next@15.4.10`; PR #2 merged (default branch `master`). Newer advisories exist — see TC-072 |
| Status | PASS (for that specific remediation) |
| Automation | MANUAL (record check) |
| Evidence | `gh pr list --state all` output recorded in `../../evidence/logs/pr-history.txt` |
| Related Requirement | NFR-013 |
| Related Bug | BUG-017 (newer advisories) |
| Last Executed | 2026-10-07 (RUN-2026-001) |
