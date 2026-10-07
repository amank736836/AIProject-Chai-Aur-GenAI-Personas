# FEAT-006 — Acceptance criteria

| # | Given / When / Then | Verified by | Status |
|---|---|---|---|
| AC-006-1 | Given a built-in persona conversation, when the response is received, then a `chatHistory-<persona>` HttpOnly cookie carries the transcript. | TC-011 (blocked), TC-018 (flags) | PARTIAL (flags PASS) |
| AC-006-2 | Given a HiPi turn, when the next message is sent, then the request replays only the Hitesh part of the history. | static review | FAIL (BUG-014) |
| AC-006-3 | Given the page is reloaded, then the previous transcript is restored. | TC-056 | FAIL (BUG-002) |
| AC-006-4 | Given a chat contains Hindi or emoji text, when it is persisted, then saving must not throw. | TC-057 | FAIL (BUG-003) |
| AC-006-5 | Given an unload event, then the history-clearing beacon returns success. | TC-054 | FAIL (BUG-001) |
| AC-006-6 | Given a custom persona conversation, when the next message is sent, then the stored `chatHistory-<slug>` is used as context. | TC-063 | FAIL (BUG-008) |
