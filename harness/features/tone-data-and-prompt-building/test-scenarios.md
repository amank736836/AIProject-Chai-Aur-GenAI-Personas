# FEAT-010 — Test scenarios

| SCN | Type | Scenario | Test cases |
|---|---|---|---|
| SCN-003 | Smoke | Prompt builds for every supported persona key without throwing. | TC-027, TC-034 |
| SCN-018 | Functional | Tone adherence inputs: systemPrompt, merged HiPi, history, link instructions, signature lines. | TC-027 … TC-031, TC-035, TC-036 |
| SCN-038 | Edge | Empty history, empty message, unknown persona, missing/legacy tone keys, very long history, Unicode message. | TC-034, TC-038, TC-036 |
| SCN-060 | API/integration | Prompt actually sent equals the prompt built (blocked by BUG-004 for inspection). | TC-047 |
| SCN-099 | Regression | Tone file changes are reflected in the next prompt; built-in behaviour unchanged by custom-persona work. | TC-027, TC-030 |
| SCN-040 | Negative | Tone file missing/corrupt (different `cwd`), unknown persona, cookie tone of the wrong shape. | TC-034, TC-032 |
