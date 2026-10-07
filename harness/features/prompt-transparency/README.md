# FEAT-007 — Prompt transparency panel

*Documentation depth: condensed (README + test-cases).*

| Field | Value |
|---|---|
| Feature | FEAT-007 — Prompt transparency panel |
| Purpose | Show the user the exact prompt sent to the LLM ("Prompt sent to AI"), for learning and debugging. |
| User | Demo visitor / learner / developer |
| Entry Point | `src/app/components/PromptDisplay.tsx`, fed by `lastPrompt` state in `page.tsx:241` (`if (data.prompt) setLastPrompt(data.prompt)`) |
| Dependencies | `/api/chat` must return a `prompt` field (`debugPrompt:true` is sent by the client) |
| Inputs | `lastPrompt` string |
| Outputs | A collapsible panel with a `<pre>` block (hidden while `lastPrompt` is empty) |
| Business Rules | — |
| Expected Behavior | After each request the panel shows the prompt that produced the answer; the header toggle collapses it (`aria-expanded`). |
| Error Handling | `lastPrompt` is cleared on error paths; the panel renders nothing when empty. |
| Permissions | None — prompts are visible to the anonymous user (by design, per README). |
| Related APIs | `POST /api/chat` (expected `debugPrompt` support) |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | `PromptDisplay.tsx` (yellow/pink gradient panel, `max-h-40` scroll area) |
| Existing Tests | TC-043 (data path, fails), TC-047 (panel population, manual) |
| Missing Tests | Panel content equality with the server-built prompt (impossible today, BUG-004); collapse/expand state (manual). |
| Known Issues | **The feature does not work**: no route ever returns a `prompt` field, so the panel never renders (BUG-004). Even if it did, HiPi mode would need two prompts (only one string is stored). |

**Requirement status:** REQ-023 FAIL (BUG-004) · REQ-032 NOT_EXECUTED (manual).

**Evidence of the gap:** `page.tsx` sends `debugPrompt:true`; the response shape documented in
[`../../ARCHITECTURE.md`](../../ARCHITECTURE.md) has no `prompt` key; the only `prompt` variable in the server
code is the local string passed to `getLLMResponse`, which is never serialised into the response.
