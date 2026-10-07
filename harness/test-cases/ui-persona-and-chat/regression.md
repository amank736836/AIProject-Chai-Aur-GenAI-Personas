# ui-persona-and-chat — regression cases

### TC-049 — External links keep `target="_blank"` + `rel="noopener noreferrer"` (static)
| Field | Value |
|---|---|
| Test Case ID | TC-049 |
| Feature | FEAT-008 |
| Priority | P1 |
| Type | Regression (security-relevant markup) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. Read `src/app/components/ChatArea.tsx` 2. Assert every `target="_blank"` anchor carries `rel="noopener noreferrer"` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | No reverse-tabnabbing surface |
| Actual Result | both anchors (`VisitButton`, `CopyableLink`) carry the attribute |
| Status | PASS |
| Automation | AUTOMATED (static) |
| Evidence | `../../evidence/api-responses/TC-049-link-rel.txt` |
| Related Requirement | REQ-024 |
| Related Bug | — |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-052 — Keyboard-only operation and visible focus
| Field | Value |
|---|---|
| Test Case ID | TC-052 |
| Feature | FEAT-014, FEAT-001 |
| Priority | P2 |
| Type | Regression (a11y) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. Tab through the page 2. Verify a visible focus ring on each persona button, the prompt toggle, the input, Send, the copy and Visit buttons 3. Activate the persona buttons with Enter/Space 4. Verify the selected persona is announced (currently not: no `aria-pressed`) |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Full keyboard operation with visible focus |
| Actual Result | static review: `focus-visible:ring-*` classes exist; no `aria-pressed`/`role` for selection state |
| Status | NOT_EXECUTED (manual) |
| Automation | MANUAL |
| Evidence | — |
| Related Requirement | NFR-010 |
| Related Bug | known a11y gap (FEAT-001 known-issues) |
| Last Executed | NOT_EXECUTED |
### TC-053 — Responsive layout at 375 / 768 / 1440 px
| Field | Value |
|---|---|
| Test Case ID | TC-053 |
| Feature | FEAT-014 |
| Priority | P1 |
| Type | Regression (layout) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); a browser with the app open (manual checklist: `../../test-tools/ui/manual-checklist.md`) |
| Steps | 1. Set the viewport to each width 2. Check the persona row wraps, the transcript stays readable, the composer remains usable, and scroll buttons do not overlap the composer 3. Repeat in dark mode |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | No horizontal overflow, no overlap, all controls reachable |
| Actual Result | not run — no browser |
| Status | NOT_EXECUTED |
| Automation | MANUAL |
| Evidence | — (screenshots go to `evidence/screenshots/`) |
| Related Requirement | NFR-009, REQ-029 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
**Re-run after:** any change to `ChatArea.tsx`, `MessageInput.tsx`, `PersonaSelector.tsx`, `page.tsx`,
`globals.css` or Tailwind configuration.
