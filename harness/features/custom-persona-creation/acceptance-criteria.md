# FEAT-004 — Acceptance criteria

| # | Given / When / Then | Verified by | Status |
|---|---|---|---|
| AC-004-1 | Given a name, when Create Persona is clicked, then a `personaData-<slug>` cookie with a non-empty tone is set and the response is `200 {success:true}`. | TC-017, TC-018 | FAIL (empty tone accepted as success, BUG-012) |
| AC-004-2 | Given an existing persona cookie, when the persona is created again, then the stored tone is returned and no LLM call is needed. | TC-021 | PASS |
| AC-004-3 | Given a persona was created, when the user chats with it, then the persona's tone text appears in the prompt. | TC-032 | FAIL (BUG-006) |
| AC-004-4 | Given an `@handle` persona, when the user chats with it, then its stored tone is applied. | TC-033 | FAIL (BUG-007) |
| AC-004-5 | Given a provider outage, when a persona is created, then the UI must not claim success. | TC-017 | FAIL (BUG-012) |
| AC-004-6 | Given any user input, when a cookie is set, then the cookie name/attributes are valid and cannot inject attributes. | TC-019 | FAIL (BUG-015) |
