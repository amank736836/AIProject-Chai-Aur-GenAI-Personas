# FEAT-001 — Acceptance criteria

| # | Given / When / Then | Verified by | Status |
|---|---|---|---|
| AC-001-1 | Given the app is opened, when it has loaded, then the HiPi button is visually active and the empty chat shows "Start the conversation!". | TC-039, TC-040, TC-041 | PASS (SSR evidence) |
| AC-001-2 | Given a transcript exists, when another persona is selected, then the transcript is empty and the new persona's highlighting is active. | TC-044 | NOT_EXECUTED (manual) |
| AC-001-3 | Given the Custom button is selected, when no custom persona exists, then the message input and Send button are disabled. | TC-051 | NOT_EXECUTED (manual) |
| AC-001-4 | Given any persona is selected, when a message is sent, then the request body carries that persona and the reply renders in the persona's card. | TC-007/TC-008/TC-009 | BLOCKED (credentials) |
| AC-001-5 | Given a persona value the server does not know, when `/api/chat` is called, then the request is handled by the generic template and returns a JSON reply/error (never a crash). | TC-034 + TC-005 | PASS (unit) / BLOCKED (end-to-end) |
