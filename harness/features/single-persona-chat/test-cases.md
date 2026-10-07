# FEAT-003 — Test cases

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-007 | Happy path `persona=hitesh`: reply + history + cookie | [`../../test-cases/api-chat/positive.md`](../../test-cases/api-chat/positive.md) | BLOCKED (no provider keys) |
| TC-009 | `persona=piyush` leaves `hitesh` null | [`../../test-cases/api-chat/positive.md`](../../test-cases/api-chat/positive.md) | BLOCKED (no provider keys) |
| TC-001 | Missing message → 400 before any provider call | [`../../test-cases/api-chat/negative.md`](../../test-cases/api-chat/negative.md) | PASS |
| TC-014 | Deterministic contract intact (405 method guard, 400 validation) | [`../../test-cases/api-chat/regression.md`](../../test-cases/api-chat/regression.md) | PASS |
| TC-027/TC-030 | Persona tone and link instructions present in the prompt (unit proxy for tone adherence) | [`../../test-cases/prompt-builder/positive.md`](../../test-cases/prompt-builder/positive.md) | PASS |
