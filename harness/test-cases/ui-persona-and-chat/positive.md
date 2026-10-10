# ui-persona-and-chat — positive cases

No browser runtime exists in the test environment (`KI-005`), so only server-rendered HTML/static evidence is
automated; interaction cases are manual and reference
[`../../test-tools/ui/manual-checklist.md`](../../test-tools/ui/manual-checklist.md).

### TC-039 — `GET /` returns 200 and renders the app shell
| Field | Value |
|---|---|
| Test Case ID | TC-039 |
| Feature | FEAT-001, FEAT-014 |
| Priority | P0 |
| Type | Positive (SSR) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. `GET http://localhost:3000/` 2. Assert 200 and a non-trivial HTML body containing the brand |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `200`, HTML > 5 KB, contains "Persona" |
| Actual Result | `200`, 22,274 bytes, p50 56 ms / p95 72 ms over 15 probe iterations (`../../evidence/performance/performance-latency.md`) |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-039-home-ssr.html`, `../../evidence/performance/performance-latency.md` |
| Related Requirement | REQ-001, NFR-007 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-040 — Persona selector exposes all four modes
| Field | Value |
|---|---|
| Test Case ID | TC-040 |
| Feature | FEAT-001 |
| Priority | P0 |
| Type | Positive (SSR) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. `GET /` 2. Assert `HiPi`, `Hitesh`, `Piyush`, `Custom` appear |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | All four labels present |
| Actual Result | all four present |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-039-home-ssr.html` |
| Related Requirement | REQ-001 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-041 — Empty chat shows the start prompt
| Field | Value |
|---|---|
| Test Case ID | TC-041 |
| Feature | FEAT-014 |
| Priority | P2 |
| Type | Positive (SSR) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. `GET /` 2. Assert "Start the conversation" is rendered |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Empty-state text present |
| Actual Result | present |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-039-home-ssr.html` |
| Related Requirement | REQ-029 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-042 — Message input is rendered with its placeholder
| Field | Value |
|---|---|
| Test Case ID | TC-042 |
| Feature | FEAT-014 |
| Priority | P2 |
| Type | Positive (SSR) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. `GET /` 2. Assert `placeholder="Type your message"` exists |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Input present and not disabled in the default state |
| Actual Result | placeholder present |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-039-home-ssr.html` |
| Related Requirement | REQ-027, REQ-028 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-044 — Switching persona clears the transcript
| Field | Value |
|---|---|
| Test Case ID | TC-044 |
| Feature | FEAT-001 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Browser at `/`, a couple of messages already exchanged |
| Steps | 1. Send two messages 2. Click "Hitesh" 3. Observe the transcript and the active styling 4. Repeat for Piyush and Custom |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Transcript empty; clicked persona ringed/glowing; input disabled for Custom until ready |
| Actual Result | not run — no browser in the test environment |
| Status | NOT_EXECUTED |
| Automation | MANUAL |
| Evidence | — (attach a screenshot to `evidence/screenshots/` when executed) |
| Related Requirement | REQ-002, BR-011 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
### TC-045 — Enter sends; input disabled while thinking
| Field | Value |
|---|---|
| Test Case ID | TC-045 |
| Feature | FEAT-014 |
| Priority | P1 |
| Type | Positive |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. Type a message, press Enter 2. While the reply is pending, try typing/clicking Send 3. Observe the spinning "Waiting…" button |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Enter sends once; input and button disabled until the reply arrives; focus/typing restored afterwards |
| Actual Result | not run — no browser |
| Status | NOT_EXECUTED |
| Automation | MANUAL |
| Evidence | — |
| Related Requirement | REQ-028, REQ-027 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
### TC-048 — Link copy and Visit affordances work in a reply
| Field | Value |
|---|---|
| Test Case ID | TC-048 |
| Feature | FEAT-008 |
| Priority | P2 |
| Type | Positive |
| Preconditions | A reply containing a URL (ask a persona for its GitHub link) |
| Steps | 1. Click the copy icon → expect "Copied!" for ~1.2 s and the URL on the clipboard 2. Click "Visit" → expect a new tab 3. Verify the copied text has no trailing punctuation |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Clipboard contains exactly the URL; new tab opens with `rel="noopener noreferrer"` |
| Actual Result | not run — no browser |
| Status | NOT_EXECUTED |
| Automation | MANUAL |
| Evidence | — |
| Related Requirement | REQ-024 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
