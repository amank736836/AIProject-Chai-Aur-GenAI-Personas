# FEAT-003 — Single-persona chat (Hitesh / Piyush)

*Documentation depth: condensed (README + test-cases) — see [`../README.md`](../README.md).*

| Field | Value |
|---|---|
| Feature | FEAT-003 — Single-persona chat (Hitesh / Piyush) |
| Purpose | Let the visitor talk to one persona at a time with that persona's full tone specification. |
| User | Demo visitor |
| Entry Point | `POST /api/chat {persona:"hitesh"\|"piyush"}` — `src/app/api/chat/route.ts:66-78`; UI branch `ChatArea.tsx` |
| Dependencies | `src/lib/prompt.js` (systemPrompt branch), `src/lib/llm.js`, `data/<persona>-tone.json` |
| Inputs | `{message, persona, customName?}` (persona defaults to `hitesh` when omitted) |
| Outputs | `200 {hitesh|null, piyush|null, history}` + `chatHistory-<persona>` cookie; one reply card |
| Business Rules | BR-001, BR-005, BR-008, BR-009 |
| Expected Behavior | Only the selected persona's reply is non-null; the persona's `systemPrompt` drives tone; link questions return the exact URL from the tone JSON; history is kept per persona. |
| Error Handling | Same mapping as FEAT-012 (400/429/500); a missing tone file would throw → 500 (`UNKNOWN / REQUIRES VALIDATION`, not executed). |
| Permissions | None (anonymous). |
| Related APIs | `POST /api/chat` |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | `ChatArea.tsx` single-card layout, `PersonaSelector.tsx`, `MessageInput.tsx` |
| Existing Tests | TC-001, TC-004 (executed), TC-007, TC-009 (blocked without credentials) |
| Missing Tests | Actual tone adherence (response contains persona-specific vocabulary), history continuity across turns (TC-011), default-persona behaviour (REQ-007). |
| Known Issues | Replies are non-streamed so the user waits for the full generation (KI-014); default-persona behaviour is documented nowhere. |

**Requirement status:** REQ-005 BLOCKED (credentials) · REQ-006 PASS · REQ-007 PARTIAL · REQ-008 BLOCKED · REQ-012 PASS.
