# FEAT-006 — Chat history persistence (cookies)

| Field | Value |
|---|---|
| Feature | FEAT-006 — Chat history persistence (cookies) |
| FEAT ID | FEAT-006 |
| Purpose | Keep conversation context so follow-up questions work, without any server-side storage (serverless-friendly). |
| User | Demo visitor; indirectly the LLM (context) |
| Entry Point | Server: `src/app/api/chat/route.ts` (`getHistoryFromCookies`, `Set-Cookie` blocks). Client: `src/app/components/CookieManager.ts` + `page.tsx` (`loadChatFromCookie`, `saveChatToCookieWithData`) |
| Dependencies | Cookie transport only; `chatHistory-<persona>` (server, HttpOnly), `chatHistory` (client, JS-readable) |
| Inputs | Request `Cookie` header; chat state changes |
| Outputs | Updated `chatHistory-<persona>` response cookie; `chatHistory` browser cookie; prompt context |
| Business Rules | BR-005 (per-persona, 30-day), BR-006 (no server storage) |
| Expected Behavior | The last N turns are replayed as prompt context per persona and the transcript survives a reload; clearing cookies resets everything. |
| Error Handling | Malformed cookie JSON is caught and treated as empty history (`route.ts:19-23`, `CookieManager.ts` try/catch). |
| Permissions | Cookies are per browser; no auth. Cookie values are user-controlled → the client can inject arbitrary history into its own prompt (self-inflicted). |
| Related APIs | `POST /api/chat` |
| Related Database Tables | None — cookies are the only store (`test-scenarios/database.md`) |
| Related UI | `page.tsx` effects (`loadChatFromCookie`, `saveChatToCookieWithData`) |
| Existing Tests | TC-055, TC-056, TC-058, TC-059, TC-060, TC-061, TC-062 (unit, executed); TC-054 (endpoint missing); TC-011/TC-013 (blocked) |
| Missing Tests | Server-side history read/write round trip with a real provider; multi-tab concurrency; very large histories. |
| Known Issues | Client write/read formats differ (BUG-002); `btoa` throws on non-Latin1 text (BUG-003); custom persona history never read (BUG-008); `clear-history` endpoint missing (BUG-001); 4 KB cookie ceiling (KI-004). |

## Related documents
[`requirements.md`](requirements.md) · [`behavior.md`](behavior.md) · [`acceptance-criteria.md`](acceptance-criteria.md) ·
[`test-scenarios.md`](test-scenarios.md) · [`test-cases.md`](test-cases.md) · [`test-data.md`](test-data.md) · [`known-issues.md`](known-issues.md)
