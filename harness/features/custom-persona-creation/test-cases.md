# FEAT-004 — Test cases

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-015 | Missing name → 400 | [`../../test-cases/api-create-persona/negative.md`](../../test-cases/api-create-persona/negative.md) | PASS |
| TC-016 | Malformed JSON → 400 (currently 500) | [`../../test-cases/api-create-persona/negative.md`](../../test-cases/api-create-persona/negative.md) | FAIL (BUG-010) |
| TC-017 | Provider failure must not be reported as success | [`../../test-cases/api-create-persona/negative.md`](../../test-cases/api-create-persona/negative.md) | FAIL (BUG-012) |
| TC-018 | HttpOnly `personaData-<slug>` cookie with valid attributes | [`../../test-cases/api-create-persona/positive.md`](../../test-cases/api-create-persona/positive.md) | PASS |
| TC-019 | Cookie name not sanitised against `;` | [`../../test-cases/api-create-persona/edge-cases.md`](../../test-cases/api-create-persona/edge-cases.md) | FAIL (BUG-015) |
| TC-020 | `@handle` enrichment produces a tone | [`../../test-cases/api-create-persona/positive.md`](../../test-cases/api-create-persona/positive.md) | BLOCKED (network + credentials) |
| TC-021 | Existing tone cookie short-circuits the LLM | [`../../test-cases/api-create-persona/positive.md`](../../test-cases/api-create-persona/positive.md) | PASS |
| TC-012 | Custom chat uses the stored tone end-to-end | [`../../test-cases/prompt-builder/edge-cases.md`](../../test-cases/prompt-builder/edge-cases.md) | FAIL (BUG-006) |
| TC-033 | `@handle` tone lookup mismatch (unit) | [`../../test-cases/prompt-builder/edge-cases.md`](../../test-cases/prompt-builder/edge-cases.md) | FAIL (BUG-007) |
| TC-051 | Custom persona flow in a browser | [`../../test-cases/ui-persona-and-chat/edge-cases.md`](../../test-cases/ui-persona-and-chat/edge-cases.md) | NOT_EXECUTED (manual) |
