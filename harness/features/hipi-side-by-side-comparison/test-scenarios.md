# FEAT-002 — Test scenarios

| SCN | Type | Scenario | Test cases |
|---|---|---|---|
| SCN-010 | Functional | HiPi happy path: one question → two persona replies. | TC-008 |
| SCN-047 | Integration | Client → `/api/chat` → prompt builder → two provider calls → JSON + cookie. | TC-008, TC-013 |
| SCN-058 | API | Response shape for `persona=both` (fields present, `history` array, cookie name `chatHistory-both`). | TC-008 |
| SCN-097 | Regression | HiPi still returns two replies after prompt/tone changes; single-persona modes unaffected. | TC-013, TC-014 |
