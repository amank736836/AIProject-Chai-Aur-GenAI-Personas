# FEAT-004 — Test scenarios

| SCN | Type | Scenario | Test cases |
|---|---|---|---|
| SCN-012 | Functional | Create a persona from a plain name; cookie set; chat becomes usable. | TC-017, TC-018, TC-021, TC-051 |
| SCN-024 | Negative | Missing name → 400; malformed JSON → 4xx; provider outage → must not report success. | TC-015, TC-016, TC-017 |
| SCN-048 | Integration | `/api/create-persona` → cookie → `/api/chat` prompt → reply. | TC-012, TC-032 |
| SCN-084 | Security | Cookie-name injection via `;` / CRLF; regex metacharacters in the persona name; scraping used as an outbound proxy (SSRF surface). | TC-019, TC-070 |
| SCN-036 | Edge | `@handle` with no public profiles, non-existent handle, very long name, duplicate names, Unicode names. | TC-020, TC-033 |
| SCN-098 | Regression | Built-in personas unaffected by custom-persona changes. | TC-014 |
