# FEAT-013 — Test cases

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-054 | `POST /api/clear-history` exists for the unload beacon | [`../../test-cases/chat-history-cookies/regression.md`](../../test-cases/chat-history-cookies/regression.md) | FAIL (BUG-001) — evidence: `evidence/api-responses/TC-054-clear-history.json` |
| TC-056 | Client transcript survives a reload (the visible symptom of a missing clear/restore) | [`../../test-cases/chat-history-cookies/positive.md`](../../test-cases/chat-history-cookies/positive.md) | FAIL (BUG-002) |
