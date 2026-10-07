# FEAT-010 — Acceptance criteria

| # | Given / When / Then | Verified by | Status |
|---|---|---|---|
| AC-010-1 | Given `persona="hitesh"`, when the prompt is built, then it starts with the Hitesh `systemPrompt` and ends with the direct-answer instruction. | TC-027, TC-035 | PASS |
| AC-010-2 | Given `persona="both"`, when the prompt is built, then both system prompts are present and the persona name is "HiPi". | TC-028 | PASS |
| AC-010-3 | Given prior turns, when the prompt is built, then they appear in order as `User:`/`<Persona>:` lines. | TC-029 | PASS |
| AC-010-4 | Given a user asks for a platform link, when the persona is built-in, then the exact URL from `data/*-tone.json` is in the prompt. | TC-030 | PASS |
| AC-010-5 | Given a custom persona whose cookie holds `tone:{systemPrompt}`, when the prompt is built, then that text is the system prompt. | TC-031 | PASS |
| AC-010-6 | Given a custom persona created through the UI (`tone` is a string), when the prompt is built, then that text must appear in the prompt. | TC-032 | FAIL (BUG-006) |
| AC-010-7 | Given an `@handle` persona, when the prompt is built, then its stored tone is found. | TC-033 | FAIL (BUG-007) |
| AC-010-8 | Given no tone data, when the prompt is built, then the generic template is used and no exception is thrown. | TC-034 | PASS |
