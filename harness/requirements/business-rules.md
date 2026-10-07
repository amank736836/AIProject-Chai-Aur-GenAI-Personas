# Business Rules

Rules the implementation enforces (or is supposed to). Each rule cites the code that implements it; the
"Tested by" column points to the case/scenario that would catch a violation.

| ID | Rule | Implemented in | Tested by |
|---|---|---|---|
| BR-001 | A built-in persona's identity is defined entirely by `systemPrompt` in `data/<persona>-tone.json`; changing that file changes the persona. | `prompt.js` (systemPrompt branch) | TC-027, TC-028 |
| BR-002 | HiPi mode merges both personas' tone data (system prompts, style notes, links) and instructs the model to reply as "HiPi". | `prompt.js` (`persona === "both"`) | TC-028 |
| BR-003 | A custom persona's storage slug is `name.toLowerCase().replace(/\s+/g, "-")`; the same slug is used for `personaData-*` and `chatHistory-*` cookies. | `create-persona/route.ts:41`, `chat/route.ts:29-31,150-156` | TC-018, TC-021 |
| BR-004 | A custom persona's tone is generated at most once per browser: an existing `personaData-<slug>.tone` short-circuits the LLM call. | `create-persona/route.ts:44-60` | TC-021 |
| BR-005 | Chat history is scoped per persona and expires after 30 days (`Max-Age=2592000`). | `chat/route.ts` `Set-Cookie` | TC-018 |
| BR-006 | The backend stores no user data: nothing is written to disk or to a database; the request's cookies are the only state. | repository-wide | TC-069, NFR-002 |
| BR-007 | Only publicly reachable profile pages may be read for enrichment, and only their `<meta name="description">` content. | `create-persona/route.ts` `fetchPublicProfile()` | TC-020 (blocked offline) |
| BR-008 | Replies must not open with greetings/openers; the answer comes first, tone is flavour only. | `prompt.js` (both branches) | TC-035 |
| BR-009 | Built-in personas must answer link questions with the exact URL from the tone JSON, without extra text. | `prompt.js` `getLinkInstructions()` + `data/*-tone.json` `links` | TC-030 |
| BR-010 | Custom personas must not invent links: only verified-reachable profiles may be offered. **Not enforced today.** | intended in `chat/route.ts:110-138` | TC-033, BUG-009 |
| BR-011 | Changing persona clears the visible chat but does not delete the server-side persona history cookie. | `page.tsx` `setPersona()`, `chat/route.ts` | TC-044 (manual) |
| BR-012 | Errors are reported inside the chat transcript placeholder for the pending reply; the app never uses blocking dialogs. | `page.tsx` error branches, `ChatArea.tsx` | TC-046, TC-051 |
