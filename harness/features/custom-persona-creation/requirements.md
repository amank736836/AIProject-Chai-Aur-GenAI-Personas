# FEAT-004 — Requirements

| ID | Requirement | Test case | Status |
|---|---|---|---|
| REQ-004 | Personas can be created from a name or `@handle`. | TC-015, TC-018 | PASS (contract) |
| REQ-013 | `POST /api/create-persona {name}` → `200 {success:true, tone}`. | TC-017 | FAIL (BUG-012) |
| REQ-014 | Missing `name` → `400 {"error":"Name required"}`. | TC-015 | PASS |
| REQ-015 | `@handle` triggers profile enrichment from 10 platforms. | TC-020 | BLOCKED (network + credentials) |
| REQ-016 | Tone is stored in `personaData-<slug>` and reused (one LLM call per browser). | TC-021 | PASS |
| REQ-017 | Chat must use the stored tone. | TC-031, TC-032, TC-033 | FAIL (BUG-006/007) |
| REQ-018 | Custom chat history uses `chatHistory-<slug>`. | TC-011, TC-063 | BLOCKED read-side (BUG-008) |
| REQ-019 | No server-side storage. | TC-069 | PASS |
| REQ-026 | Only verified-reachable links may be offered. | — | FAIL (BUG-009, no reachable code path) |
