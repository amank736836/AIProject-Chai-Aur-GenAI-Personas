# FEAT-012 — Error handling & messaging

| Field | Value |
|---|---|
| Feature | FEAT-012 — Error handling & messaging |
| FEAT ID | FEAT-012 |
| Purpose | Keep the chat usable when input is invalid or the LLM provider fails, and tell the user what happened without leaking internals. |
| User | Every user (and the owner, who debugs from these messages) |
| Entry Point | Validation and `try/catch` blocks in `src/app/api/{chat,create-persona,fetch-image}/route.ts`; error rendering in `src/app/page.tsx` (`sendMessage` catch branches) and `ChatArea.tsx` |
| Dependencies | Next.js `NextResponse.json`, provider error messages from `src/lib/llm.js` |
| Inputs | Invalid bodies, provider failures, network failures, non-JSON responses |
| Outputs | `400` validation errors, `429 {rateLimit:true}` for provider throttling, `500 {error}` for anything else; in-UI placeholder text |
| Business Rules | BR-012 (no blocking dialogs; errors appear in the transcript) |
| Expected Behavior | Missing required fields → `400` with `{"error": <message>}`; malformed JSON → `400` JSON error; provider throttled → `429` with a retry hint; other failures → `500` with a **generic** message; the UI always re-enables input. |
| Error Handling | Server: `console.error("API /api/chat error:", err)` then classify. Client: four distinct fallbacks ("Sorry, there was a problem with the response.", rate-limit text, `data.error`, "Network error."). |
| Permissions | None. Error text is visible to anonymous callers. |
| Related APIs | All three POST routes |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | `ChatArea.tsx` (placeholder row), `MessageInput.tsx` (`disabled` reset), `page.tsx` state cleanup |
| Existing Tests | TC-001, TC-002, TC-003, TC-004, TC-005, TC-006, TC-015, TC-016, TC-017, TC-024, TC-068 (executed) |
| Missing Tests | Provider `429` end-to-end (TC-010, needs a real throttle), UI rendering of each error class (TC-046), timeout behaviour when a provider hangs. |
| Known Issues | Malformed JSON → 500 (BUG-010), whitespace-only message accepted (BUG-011), raw provider text leaked (BUG-013), silent success for persona creation (BUG-012). |

## Related documents
[`requirements.md`](requirements.md) · [`behavior.md`](behavior.md) · [`acceptance-criteria.md`](acceptance-criteria.md) ·
[`test-scenarios.md`](test-scenarios.md) · [`test-cases.md`](test-cases.md) · [`test-data.md`](test-data.md) · [`known-issues.md`](known-issues.md)
