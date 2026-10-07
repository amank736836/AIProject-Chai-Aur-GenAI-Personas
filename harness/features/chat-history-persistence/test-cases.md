# FEAT-006 — Test cases

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-054 | `/api/clear-history` exists for the unload beacon | [`../../test-cases/chat-history-cookies/regression.md`](../../test-cases/chat-history-cookies/regression.md) | FAIL (BUG-001) |
| TC-055 | Saving writes a `chatHistory` cookie | [`../../test-cases/chat-history-cookies/positive.md`](../../test-cases/chat-history-cookies/positive.md) | PASS |
| TC-056 | Save → load round trip restores the transcript | [`../../test-cases/chat-history-cookies/positive.md`](../../test-cases/chat-history-cookies/positive.md) | FAIL (BUG-002) |
| TC-057 | Hindi/emoji text does not break saving | [`../../test-cases/chat-history-cookies/edge-cases.md`](../../test-cases/chat-history-cookies/edge-cases.md) | FAIL (BUG-003) |
| TC-058 | Loader ignores the format the writer produces | [`../../test-cases/chat-history-cookies/edge-cases.md`](../../test-cases/chat-history-cookies/edge-cases.md) | PASS (documents bug) |
| TC-059 | Transcripts above 4 KB cannot be stored | [`../../test-cases/chat-history-cookies/edge-cases.md`](../../test-cases/chat-history-cookies/edge-cases.md) | PASS (risk evidence) |
| TC-060 | No cookie → `null`, no crash | [`../../test-cases/chat-history-cookies/negative.md`](../../test-cases/chat-history-cookies/negative.md) | PASS |
| TC-061 | Corrupt base64 → `null`, no crash | [`../../test-cases/chat-history-cookies/negative.md`](../../test-cases/chat-history-cookies/negative.md) | PASS |
| TC-062 | Cookie round trip with special characters | [`../../test-cases/chat-history-cookies/positive.md`](../../test-cases/chat-history-cookies/positive.md) | PASS |
| TC-063 | Custom persona history is read back | [`../../test-cases/chat-history-cookies/negative.md`](../../test-cases/chat-history-cookies/negative.md) | FAIL (BUG-008, static) |
| TC-074 | Server-set cookie flags | [`../../test-cases/platform-security/negative.md`](../../test-cases/platform-security/negative.md) | PASS with observation |
