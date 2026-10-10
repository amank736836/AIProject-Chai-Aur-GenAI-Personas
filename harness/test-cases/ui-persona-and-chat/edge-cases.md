# ui-persona-and-chat — edge cases

### TC-046 — Every error class renders in the transcript (no dialogs)
| Field | Value |
|---|---|
| Test Case ID | TC-046 |
| Feature | FEAT-012, FEAT-014 |
| Priority | P1 |
| Type | Edge |
| Preconditions | Ability to force each failure: provider down (remove keys), 429 (throttle), network failure (dev-tools offline), non-JSON response (proxy) |
| Steps | 1. Trigger each failure class 2. Observe the placeholder text in the reply card and that the input is re-enabled 3. Confirm no `alert()`/modal appears |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | "Sorry, something went wrong." / rate-limit hint / "Network error." / "Sorry, there was a problem with the response." and a usable input |
| Actual Result | partially verified server-side (TC-005); UI rendering not exercised |
| Status | NOT_EXECUTED |
| Automation | MANUAL |
| Evidence | `../../evidence/api-responses/TC-005-chat-provider-error.json` (server half) |
| Related Requirement | REQ-010, BR-012 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
### TC-047 — "Prompt sent to AI" panel shows the prompt actually used
| Field | Value |
|---|---|
| Test Case ID | TC-047 |
| Feature | FEAT-007 |
| Priority | P1 |
| Type | Edge (feature contract) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. Send a message 2. Expect the panel to appear with the exact prompt 3. Collapse/expand it and check `aria-expanded` 4. In HiPi mode, check which prompt is shown |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Panel visible with the prompt text after the first reply |
| Actual Result | FAIL by construction: `page.tsx` sets `lastPrompt` from `data.prompt`, but no route ever returns a `prompt` field; the component renders `null` while `lastPrompt` is empty |
| Status | FAIL |
| Automation | MANUAL + static verification |
| Evidence | `../../evidence/api-responses/TC-005-chat-provider-error.json` (response shape has no `prompt` key) |
| Related Requirement | REQ-023, REQ-032 |
| Related Bug | BUG-004 |
| Last Executed | 2026-10-07 (static verification, RUN-2026-001) |
### TC-051 — Custom persona flow: create → wait → chat
| Field | Value |
|---|---|
| Test Case ID | TC-051 |
| Feature | FEAT-004, FEAT-001 |
| Priority | P1 |
| Type | Edge |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. Select Custom 2. Enter `Test Persona`, click *Create Persona* 3. Observe the "Creating persona…" state for ~2 s 4. Confirm the avatar appears and the chat input unlocks 5. Send a message |
| Test Data | [`sample-data/persona-names.json`](../../test-data/sample-data/persona-names.json) |
| Expected Result | Persona card appears; input unlocks; the reply reflects the created tone (currently not, BUG-006) |
| Actual Result | not run — no browser; server-side contract covered by TC-017/TC-018/TC-021 |
| Status | NOT_EXECUTED |
| Automation | MANUAL |
| Evidence | — |
| Related Requirement | REQ-002, REQ-013 |
| Related Bug | BUG-006, BUG-012, KI-008 |
| Last Executed | NOT_EXECUTED |
