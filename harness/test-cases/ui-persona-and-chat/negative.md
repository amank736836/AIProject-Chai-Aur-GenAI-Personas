# ui-persona-and-chat — negative cases

### TC-043 — Built-in tone JSON must be reachable at `/data/<persona>-tone.json`
| Field | Value |
|---|---|
| Test Case ID | TC-043 |
| Feature | FEAT-007, FEAT-010 |
| Priority | P2 |
| Type | Negative |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. `GET /data/hitesh-tone.json` 2. Expect 200 JSON |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `200` with the tone document (the client fetches this path in `loadPersonaTone`) |
| Actual Result | `404` — `data/` is not a `public/` directory, so Next.js never serves it; the fetched `personaTone` is also unused by `ChatArea` |
| Status | FAIL |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-043-data-json.txt` |
| Related Requirement | REQ-003 |
| Related Bug | BUG-005 |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-050 — Scroll helpers hide/show at the documented thresholds
| Field | Value |
|---|---|
| Test Case ID | TC-050 |
| Feature | FEAT-009 |
| Priority | P2 |
| Type | Negative (state handling) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. Open a conversation long enough to scroll 2. Scroll to the top → up button hidden, down button visible 3. Scroll to the bottom → invert 4. Click each button and the jump-to-latest button |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Thresholds at 10 px; buttons move the container by 200 px; jump-to-latest animates to the newest reply |
| Actual Result | not run — no browser |
| Status | NOT_EXECUTED |
| Automation | MANUAL |
| Evidence | — |
| Related Requirement | REQ-030 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
