# Functional scenarios

Happy paths, alternate flows, validation-of-business-rules and persona-specific behaviour.

| SCN | Scenario | Feature | Priority | Cases | Status |
|---|---|---|---|---|---|
| SCN-009 | Switch persona (HiPi → Hitesh → Piyush → Custom) and confirm the transcript resets and the active styling follows. | FEAT-001 | P0 | TC-044 | NOT_EXECUTED (manual) |
| SCN-010 | HiPi mode answers one question with two independent persona replies in one response. | FEAT-002 | P0 | TC-008 | BLOCKED (credentials) |
| SCN-011 | Single-persona mode returns only that persona's reply (the other field stays `null`). | FEAT-003 | P0 | TC-007, TC-009 | BLOCKED (credentials) |
| SCN-012 | Create a custom persona from a plain name: cookie written, tone returned, chat unlocked. | FEAT-004 | P1 | TC-017, TC-018, TC-021 | FAIL (BUG-012: hollow success) |
| SCN-013 | Avatar resolution returns a usable image URL and the browser falls back to `/file.svg` when it fails. | FEAT-005 | P2 | TC-023, TC-026 | PASS (contract) |
| SCN-014 | Multi-turn conversation keeps context through the per-persona cookie. | FEAT-006 | P1 | TC-011 | BLOCKED (credentials) |
| SCN-015 | Prompt transparency panel shows the exact prompt sent to the model. | FEAT-007 | P1 | TC-047 | FAIL (BUG-004) |
| SCN-016 | URLs in replies render as clickable links with working copy and visit affordances. | FEAT-008 | P2 | TC-048 | NOT_EXECUTED (manual) |
| SCN-017 | Scroll helpers appear/hide correctly and move the transcript. | FEAT-009 | P2 | TC-050 | NOT_EXECUTED (manual) |
| SCN-018 | Prompt content rules hold: system prompt per persona, merged HiPi prompt, history lines, exact link URLs, no-greeting instruction. | FEAT-010 | P0 | TC-027, TC-028, TC-029, TC-030, TC-035 | PASS |
| SCN-019 | Leaving the page triggers the history-clear beacon successfully. | FEAT-013 | P2 | TC-054 | FAIL (BUG-001) |
| SCN-020 | UI states behave: waiting indicator while thinking, input disabled, responsive layout at mobile/desktop widths. | FEAT-014 | P1 | TC-045, TC-046, TC-053 | NOT_EXECUTED (manual) |
| SCN-021 | Enter sends the message; Send is disabled while a request is in flight. | FEAT-014 | P1 | TC-045 | NOT_EXECUTED (manual) |
| SCN-022 | Custom-persona chat uses the stored tone (business rule BR-010/REQ-017). | FEAT-004, FEAT-010 | P1 | TC-012, TC-032, TC-033 | FAIL (BUG-006, BUG-007) |
