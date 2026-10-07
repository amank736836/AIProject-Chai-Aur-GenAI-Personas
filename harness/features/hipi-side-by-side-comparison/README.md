# FEAT-002 — HiPi side-by-side comparison

| Field | Value |
|---|---|
| Feature | FEAT-002 — HiPi side-by-side comparison |
| FEAT ID | FEAT-002 |
| Purpose | Show Hitesh's and Piyush's answers to the same question next to each other, so the two personas can be compared in one screen. |
| User | Demo visitor / learner comparing teaching styles |
| Entry Point | `persona === 'both'` branch in `src/app/api/chat/route.ts:47-91`; UI branch in `src/app/components/ChatArea.tsx` (`persona === "both"`) |
| Dependencies | `src/lib/prompt.js` (both-mode merge), `src/lib/llm.js` (two provider calls), `page.tsx` (default persona) |
| Inputs | `POST /api/chat {message, persona:"both"}` |
| Outputs | `{hitesh: string, piyush: string, history: [...]}` + `chatHistory-both` cookie; two coloured reply cards |
| Business Rules | BR-001, BR-002, BR-005 |
| Expected Behavior | One user message produces two independent persona replies in parallel; both appear in separate cards; a single shared history cookie keeps context for the next turn. |
| Error Handling | `Promise.all` — if either provider call rejects, the whole request fails with the shared error mapping (429/500) and the UI prints the message in **both** cards. |
| Permissions | None (anonymous). |
| Related APIs | `POST /api/chat` |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | `ChatArea.tsx` two-column layout, `MessageInput.tsx` thinking state, `PromptDisplay.tsx` (last prompt only) |
| Existing Tests | TC-008 (needs credentials), TC-013 (needs credentials), TC-014 (deterministic contract) |
| Missing Tests | Behaviour when **one** provider call succeeds and the other fails; latency of the parallel pair; prompt-size limit for 2× tone data (≈14 KB) against provider token limits. |
| Known Issues | `history` returned for `both` stores only the Hitesh reply (`route.ts:62-65`) → the Piyush side of the context is lost on the next turn. |

## Related documents
[`requirements.md`](requirements.md) · [`behavior.md`](behavior.md) · [`acceptance-criteria.md`](acceptance-criteria.md) ·
[`test-scenarios.md`](test-scenarios.md) · [`test-cases.md`](test-cases.md) · [`test-data.md`](test-data.md) · [`known-issues.md`](known-issues.md)
