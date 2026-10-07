# FEAT-006 — Test scenarios

| SCN | Type | Scenario | Test cases |
|---|---|---|---|
| SCN-014 | Functional | Multi-turn built-in chat keeps context via the server cookie. | TC-011, TC-013 |
| SCN-037 | Edge | Empty / corrupt / oversized / Unicode cookie payloads; cookie jar unavailable (private mode). | TC-056, TC-057, TC-058, TC-059, TC-060, TC-061 |
| SCN-049 | Integration | Client state → `chatHistory` cookie → reload → restore; server cookie → prompt context. | TC-055, TC-056, TC-011 |
| SCN-095 | Regression | Existing cookie formats keep working after any storage change. | TC-058, TC-062 |
| SCN-062 | Integration (unload) | `beforeunload` beacon → `/api/clear-history` → cookie cleared. | TC-054 |
| SCN-085 | Security | Cookie flags, client-readable transcript, user-controlled history injection into the own prompt. | TC-074, TC-069 |
