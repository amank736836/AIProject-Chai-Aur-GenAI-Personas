# Negative scenarios

| SCN | Scenario | Feature | Priority | Cases | Status |
|---|---|---|---|---|---|
| SCN-023 | Missing required fields (`message`, `name`) on all POST routes → `400` with a JSON error, no provider call. | FEAT-012 | P0 | TC-001, TC-015, TC-022 | PASS |
| SCN-024 | Malformed JSON body → `4xx` JSON error. | FEAT-012 | P1 | TC-002, TC-016, TC-024 | FAIL (BUG-010: 500 with empty body) |
| SCN-025 | Whitespace-only message is rejected. | FEAT-012 | P2 | TC-003 | FAIL (BUG-011) |
| SCN-026 | Wrong HTTP method (GET on a POST route) → `405`. | FEAT-012 | P2 | TC-004 | PASS |
| SCN-027 | Provider outage/misconfiguration → deterministic JSON error, no crash, generic message. | FEAT-011, FEAT-012 | P0 | TC-005 | FAIL (BUG-013 leaks provider text) |
| SCN-028 | Provider rate limit → `429 {rateLimit:true}` and the UI shows the retry hint. | FEAT-011, FEAT-012 | P1 | TC-010 | NOT_EXECUTED (needs live quota) |
| SCN-029 | Corrupt/absent history cookie → treated as empty history, no crash. | FEAT-006 | P1 | TC-060, TC-061 | PASS |
| SCN-030 | Custom persona whose tone is unusable (empty string) → conversation still works, prompt has no style. | FEAT-004, FEAT-010 | P1 | TC-032, TC-012 | FAIL (BUG-006 — no style at all) |
| SCN-031 | Unknown persona value → generic template, no crash. | FEAT-003, FEAT-010 | P2 | TC-034 | PASS |
| SCN-032 | Interacting before a custom persona is ready → input disabled, no request fired. | FEAT-001, FEAT-004 | P1 | TC-051 | NOT_EXECUTED (manual) |
| SCN-033 | Sending a second message while the first is pending → blocked by the disabled state. | FEAT-014 | P1 | TC-045 | NOT_EXECUTED (manual) |
| SCN-034 | Oversized request body → documented behaviour (no 413 today) and no server crash. | FEAT-012 | P2 | TC-006 | PASS (risk recorded) |
