# FEAT-010 — Test cases

| TC | Title | Expected | Status in RUN-2026-001 |
|---|---|---|---|
| TC-027 | Built-in prompt embeds `systemPrompt` | prompt starts with the file's text | PASS |
| TC-028 | HiPi merges both personas and signs "HiPi" | both prompts + "Reply as if you are HiPi" | PASS |
| TC-029 | History serialised as `User:`/`<Persona>:` | ordered lines included | PASS |
| TC-030 | Link question injects the exact URL | URL from `links[]` present | PASS |
| TC-031 | Object-shaped cookie tone honoured | `tone.systemPrompt` in prompt | PASS |
| TC-032 | String-shaped cookie tone honoured | `tone` text in prompt | FAIL (BUG-006) |
| TC-033 | `@handle` tone found after `@`-strip | tone text in prompt | FAIL (BUG-007) |
| TC-034 | Unknown persona → generic template | `You are acting as <name>.` | PASS |
| TC-035 | No-greeting instruction always present | phrase present | PASS |
| TC-036 | Signature randomisation does not crash | 25 calls, no exception | PASS |
| TC-038 | Empty message tolerated at prompt level | prompt still built | PASS |
| TC-037 | Prompt-injection surface documented | user text appended verbatim | PASS (documented) |
| TC-047 | Prompt transparency shows the built prompt | panel populated | FAIL (BUG-004) |

All case bodies: [`../../test-cases/prompt-builder/`](../../test-cases/prompt-builder/) and
[`../../test-cases/ui-persona-and-chat/`](../../test-cases/ui-persona-and-chat/). Automation:
`harness/automation/utilities/prompt-builder.test.mjs`.
