# FEAT-010 — Requirements

| ID | Requirement | Test case | Status |
|---|---|---|---|
| REQ-003 | Built-in tone data is read from `data/<persona>-tone.json`. | TC-027 | PASS |
| REQ-012 | Prompts end with a direct-answer, no-greeting instruction. | TC-035 | PASS |
| REQ-025 | Built-in link questions are answered with the exact URL from the tone JSON `links`. | TC-030 | PASS |
| REQ-033 | Unknown personas fall back to the generic template. | TC-034 | PASS |
| REQ-017 | Custom persona tone must shape the prompt. | TC-031, TC-032, TC-033 | PARTIAL (object only; BUG-006/007) |
| BR-002 | HiPi merges both personas and signs as "HiPi". | TC-028 | PASS |
| — | History is serialised as `User:` / `<Persona>:` lines in order. | TC-029 | PASS |
| — | Signature phrases avoid immediate repetition. | TC-036 | PASS (no crash; statistical check not made) |

**Tone schema** (from `data/*.json`, real keys): `systemPrompt`, `name`, `description`, `intro`,
`signature_phrases[]`, `vocab[]`, `links[{label,url}]`, `language`, `audience_intro_plural`,
`audience_intro_singular`. Note: `prompt.js` also looks for `styleNotes`, `introPhrases`, `signatureLines`,
`signatureQuotes` — keys that **do not exist** in either shipped file (`UNKNOWN / REQUIRES VALIDATION`: legacy
schema).
