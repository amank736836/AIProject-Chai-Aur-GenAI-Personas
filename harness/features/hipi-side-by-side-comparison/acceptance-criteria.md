# FEAT-002 — Acceptance criteria

| # | Given / When / Then | Verified by | Status |
|---|---|---|---|
| AC-002-1 | Given HiPi is selected, when a message is sent, then the response contains a non-empty `hitesh` **and** a non-empty `piyush` reply. | TC-008 | BLOCKED (credentials) |
| AC-002-2 | Given HiPi is selected, when the request completes, then the transcript shows exactly one user bubble and a two-card reply row. | TC-048 (manual) | NOT_EXECUTED |
| AC-002-3 | Given both provider calls fail, when the error is rendered, then both cards show the same error text and the input becomes usable again. | TC-005 (unit-equivalent) | PASS (server behaviour) |
| AC-002-4 | Given a HiPi conversation continues, when the next message is sent, then the request carries the `chatHistory-both` cookie. | TC-011 | BLOCKED (credentials) |
