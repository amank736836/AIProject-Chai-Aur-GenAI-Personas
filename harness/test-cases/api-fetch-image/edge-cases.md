# api-fetch-image — edge cases

### TC-026 — Primary upstream retired → the ui-avatars fallback is the effective path
| Field | Value |
|---|---|
| Test Case ID | TC-026 |
| Feature | FEAT-005 |
| Priority | P2 |
| Type | Edge |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/fetch-image {"name":"Hitesh"}` 2. Check which host the URL points at |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Ideally the primary source returns a real photo; today the fallback must at least return a valid URL |
| Actual Result | `ui-avatars.com` URL returned (the HEAD probe of `source.unsplash.com` failed). Unsplash retired `source.unsplash.com` in 2024, so the primary branch is effectively dead code |
| Status | PASS (fallback works) / upstream defect recorded as BUG-018 |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-026-fetch-image-fallback.txt` |
| Related Requirement | REQ-021 |
| Related Bug | BUG-018 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
**Other edge inputs worth adding when a browser is available:** empty name `""` (→ 400), 256-character name,
emoji-only name, name that url-encodes to a very long string. Regression for this module = TC-014 pattern
(contract unchanged) plus TC-023 re-run.
