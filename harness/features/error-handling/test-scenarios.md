# FEAT-012 — Test scenarios

| SCN | Type | Scenario | Test cases |
|---|---|---|---|
| SCN-005 | Smoke | Validation errors return JSON, not HTML/empty bodies, on all three routes. | TC-001, TC-015, TC-022 |
| SCN-026 | Negative | Malformed JSON, whitespace-only message, wrong types, oversized payload, wrong HTTP method. | TC-002, TC-003, TC-006, TC-004, TC-016, TC-024 |
| SCN-039 | Edge | Empty provider reply, provider hang, empty error string, non-JSON gateway response. | TC-005, TC-046 |
| SCN-051 | Integration | Failure inside the provider chain surfaces as exactly one mapped status code to the client. | TC-005, TC-010 |
| SCN-086 | Security | Error responses must not leak internals or enable enumeration. | TC-005, TC-068 |
| SCN-100 | Regression | Error mapping stays stable after provider/SDK changes. | TC-005 |
