# FEAT-012 — Test cases

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-001 | Chat without message → 400 | [`../../test-cases/api-chat/negative.md`](../../test-cases/api-chat/negative.md) | PASS |
| TC-002 | Chat malformed JSON → 400 (actual 500) | [`../../test-cases/api-chat/negative.md`](../../test-cases/api-chat/negative.md) | FAIL (BUG-010) |
| TC-003 | Whitespace-only message rejected | [`../../test-cases/api-chat/negative.md`](../../test-cases/api-chat/negative.md) | FAIL (BUG-011) |
| TC-004 | GET /api/chat → 405 | [`../../test-cases/api-chat/negative.md`](../../test-cases/api-chat/negative.md) | PASS |
| TC-005 | Provider failure payload is generic | [`../../test-cases/api-chat/negative.md`](../../test-cases/api-chat/negative.md) | FAIL (BUG-013) |
| TC-006 | Oversized body behaviour recorded | [`../../test-cases/api-chat/edge-cases.md`](../../test-cases/api-chat/edge-cases.md) | PASS (risk evidence) |
| TC-015/TC-016 | create-persona validation / malformed JSON | [`../../test-cases/api-create-persona/negative.md`](../../test-cases/api-create-persona/negative.md) | PASS / FAIL (BUG-010) |
| TC-017 | Provider failure not reported as success | [`../../test-cases/api-create-persona/negative.md`](../../test-cases/api-create-persona/negative.md) | FAIL (BUG-012) |
| TC-024 | fetch-image malformed JSON → 4xx | [`../../test-cases/api-fetch-image/negative.md`](../../test-cases/api-fetch-image/negative.md) | FAIL (BUG-010) |
| TC-046 | UI render of each error class | [`../../test-cases/ui-persona-and-chat/edge-cases.md`](../../test-cases/ui-persona-and-chat/edge-cases.md) | NOT_EXECUTED (manual) |
