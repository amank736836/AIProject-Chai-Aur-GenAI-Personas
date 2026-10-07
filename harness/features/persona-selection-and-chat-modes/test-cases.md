# FEAT-001 — Test cases

Case bodies live in the module files; this index keeps feature → case mapping in one place.

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-039 | GET / returns 200 and renders the app shell | [`../../test-cases/ui-persona-and-chat/positive.md`](../../test-cases/ui-persona-and-chat/positive.md) | PASS |
| TC-040 | Persona selector exposes HiPi / Hitesh / Piyush / Custom | [`../../test-cases/ui-persona-and-chat/positive.md`](../../test-cases/ui-persona-and-chat/positive.md) | PASS |
| TC-041 | Empty chat state shows the start prompt | [`../../test-cases/ui-persona-and-chat/positive.md`](../../test-cases/ui-persona-and-chat/positive.md) | PASS |
| TC-044 | Switching persona clears the transcript | [`../../test-cases/ui-persona-and-chat/positive.md`](../../test-cases/ui-persona-and-chat/positive.md) | NOT_EXECUTED (manual) |
| TC-045 | HiPi is the default persona on first load | [`../../test-cases/ui-persona-and-chat/positive.md`](../../test-cases/ui-persona-and-chat/positive.md) | NOT_EXECUTED (manual) |
| TC-052 | Keyboard-only operation of the persona selector | [`../../test-cases/ui-persona-and-chat/regression.md`](../../test-cases/ui-persona-and-chat/regression.md) | NOT_EXECUTED (manual) |
| TC-014 | Deterministic `/api/chat` contract unchanged (405 + 400) | [`../../test-cases/api-chat/regression.md`](../../test-cases/api-chat/regression.md) | PASS (same assertions as TC-001/TC-004) |

Automation: `harness/automation/ui/ssr-smoke.test.mjs` (TC-039…TC-042, TC-049).
