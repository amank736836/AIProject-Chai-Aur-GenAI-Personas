# Edge-case scenarios

| SCN | Scenario | Feature | Priority | Cases | Status |
|---|---|---|---|---|---|
| SCN-035 | Empty values: `""` message/name, empty `customName`, empty cookie payload. | FEAT-012, FEAT-006 | P1 | TC-003, TC-060 | FAIL (BUG-011) / PASS (cookies) |
| SCN-036 | Boundary values: 1-character message, 50 KB message, 256-character persona name, name consisting only of spaces. | FEAT-012, FEAT-004 | P2 | TC-006, TC-019 | PASS (recorded) |
| SCN-037 | Unicode: Devanagari, emoji and RTL text in messages and persona names (client cookie encoding + prompt). | FEAT-006, FEAT-010 | P1 | TC-057, TC-038 | FAIL (BUG-003) |
| SCN-038 | Duplicate data: creating the same persona twice reuses the stored tone instead of regenerating. | FEAT-004 | P1 | TC-021 | PASS |
| SCN-039 | NULL values: `{"message":null}`, `{"name":null}`, cookie value `null`. | FEAT-012 | P2 | TC-001, TC-015, TC-060 | PASS (falsy check) |
| SCN-040 | Missing/corrupt tone data file in the working directory. | FEAT-010 | P2 | — | NOT_EXECUTED (would require editing `data/`; marked `UNKNOWN / REQUIRES VALIDATION`) |
| SCN-041 | Large datasets: 60-message transcript, 20-turn history prompt, cookie size ceiling. | FEAT-006 | P2 | TC-059, TC-029 | PASS (limit evidenced) |
| SCN-042 | Special characters in persona names (`;`, `=`, `*`, `.`, `%`) and in messages (HTML, quotes). | FEAT-004, FEAT-008 | P2 | TC-019, TC-070 | FAIL (BUG-015) / PASS (renderer escapes text) |
| SCN-043 | Concurrent requests: two parallel chats, HiPi's two provider calls, shared module state in `prompt.js`. | FEAT-002, FEAT-010 | P2 | TC-013 | BLOCKED (credentials) |
| SCN-044 | Zero/falsy values (`0`, `false` as `message`) are rejected rather than sent to the provider. | FEAT-012 | P2 | TC-001 | PASS (falsy check) |
| SCN-045 | Maximum prompt size (HiPi ≈14 KB) does not exceed provider limits or break the request. | FEAT-010, FEAT-011 | P2 | TC-028 | BLOCKED (credentials) |
| SCN-046 | Browser refuses cookies (private mode / blocked storage) → the app still works for a single turn. | FEAT-006 | P2 | — | NOT_EXECUTED (needs browser) |
