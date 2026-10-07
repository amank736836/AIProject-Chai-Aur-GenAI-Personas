# FEAT-007 — Test cases

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-043 | Built-in tone JSON is served from the public path (the data the panel is meant to explain) | [`../../test-cases/ui-persona-and-chat/negative.md`](../../test-cases/ui-persona-and-chat/negative.md) | FAIL (BUG-005) |
| TC-047 | Panel shows the exact prompt after a request | [`../../test-cases/ui-persona-and-chat/edge-cases.md`](../../test-cases/ui-persona-and-chat/edge-cases.md) | FAIL (BUG-004) — verified by code inspection + absence of `prompt` in API responses |
| TC-027/TC-028 | Prompts exist and are buildable for every mode (proxy that the panel *could* show content) | [`../../test-cases/prompt-builder/positive.md`](../../test-cases/prompt-builder/positive.md) | PASS |
