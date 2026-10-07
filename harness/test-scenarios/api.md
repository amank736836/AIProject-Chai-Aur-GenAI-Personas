# API scenarios

| SCN | Scenario | Endpoint | Priority | Cases | Status |
|---|---|---|---|---|---|
| SCN-057 | Request/response schema per route matches `ARCHITECTURE.md` (fields present, correct types, `null` semantics). | all | P0 | TC-007, TC-008, TC-009, TC-018, TC-023 | PARTIAL (blocked LLM fields) |
| SCN-058 | Status-code contract: 200/400/405/429/500 in the documented situations. | all | P0 | TC-001, TC-004, TC-005, TC-015, TC-022 | PARTIAL (429 unverified) |
| SCN-059 | Response headers/cookies: `Set-Cookie` names, flags, `Max-Age`; no CORS header. | `/api/chat`, `/api/create-persona` | P1 | TC-018, TC-066, TC-074 | PASS |
| SCN-060 | `debugPrompt` contract: client asks for the prompt, server must return it. | `/api/chat` | P1 | TC-047 | FAIL (BUG-004) |
| SCN-061 | Method handling: `POST` only; `OPTIONS` → 204 with `allow`; `GET` → 405. | `/api/chat` | P2 | TC-004, TC-067 | PASS |
| SCN-062 | Content-type handling: missing/`text/plain` bodies, non-JSON responses. | all | P2 | TC-002 | FAIL (BUG-010) |
| SCN-063 | Payload limits: small, medium, 50 KB+ bodies; no 413 today. | `/api/chat` | P2 | TC-006 | PASS (risk recorded) |
| SCN-064 | Duplicate/idempotent submissions: retrying the same message twice creates two turns. | `/api/chat` | P2 | TC-013 | BLOCKED (credentials) |
| SCN-065 | Cookie-driven requests: valid, corrupt and oversized history cookies. | `/api/chat` | P1 | TC-061, TC-059 | PASS |
| SCN-066 | Malformed JSON contract (documented 400 expectation vs actual). | all | P1 | TC-002, TC-016, TC-024 | FAIL (BUG-010) |
