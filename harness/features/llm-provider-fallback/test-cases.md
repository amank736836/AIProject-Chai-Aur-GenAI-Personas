# FEAT-011 — Test cases

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-005 | Provider failure payload is generic and deterministic | [`../../test-cases/api-chat/negative.md`](../../test-cases/api-chat/negative.md) | FAIL (BUG-013 — payload leaks provider text) |
| TC-010 | Groq throttling produces `429 {rateLimit:true}` (fallback path) | [`../../test-cases/api-chat/positive.md`](../../test-cases/api-chat/positive.md) | BLOCKED (needs provider credentials) |
| TC-025 | Provider round trip works at all (hitesh happy path) | [`../../test-cases/api-chat/positive.md`](../../test-cases/api-chat/positive.md) | BLOCKED (needs provider credentials) |
| TC-012/TC-013 | Provider behaviour in custom/HiPi paths | [`../../test-cases/api-chat/edge-cases.md`](../../test-cases/api-chat/edge-cases.md) | BLOCKED |
