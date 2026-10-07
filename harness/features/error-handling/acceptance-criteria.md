# FEAT-012 — Acceptance criteria

| # | Given / When / Then | Verified by | Status |
|---|---|---|---|
| AC-012-1 | Given a chat request without a message, when it is sent, then the response is `400` with `{"error":"Message required"}` and no LLM call is made. | TC-001 | PASS |
| AC-012-2 | Given a request body that is not valid JSON, when it is sent, then the response is `4xx` JSON with an `error` field. | TC-002, TC-016, TC-024 | FAIL (BUG-010) |
| AC-012-3 | Given a message consisting only of whitespace, when it is sent, then the API rejects it as empty. | TC-003 | FAIL (BUG-011) |
| AC-012-4 | Given the provider raises a quota error, when the fallback also fails, then the client receives `429` with `rateLimit:true`. | TC-010 | NOT_EXECUTED (needs a real throttle) |
| AC-012-5 | Given any provider failure, when the payload is returned, then it contains no API-key names, keys or stack traces. | TC-005, TC-068 | FAIL (BUG-013) |
| AC-012-6 | Given any failure, when the UI renders it, then the input is enabled again and the placeholder shows a human-readable message. | TC-046 | NOT_EXECUTED (manual) |
| AC-012-7 | Given `GET /api/chat`, when it is called, then `405` is returned. | TC-004 | PASS |
