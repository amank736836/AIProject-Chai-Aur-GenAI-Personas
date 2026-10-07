# FEAT-006 — Requirements

| ID | Requirement | Source | Test case | Status |
|---|---|---|---|---|
| REQ-011 | Built-in persona history is stored in `chatHistory-<persona>` (`chatHistory-both` for HiPi) with `HttpOnly; SameSite=Lax; Max-Age=2592000` and replayed as context. | `chat/route.ts:79-91,146-160` | TC-011, TC-018 | PARTIAL |
| REQ-018 | Custom persona history is stored in `chatHistory-<slug>` **and read back** for context. | `chat/route.ts:5-25,158-160` | TC-063 | FAIL (read side, BUG-008) |
| REQ-031 | On unload the transcript is cleared via `/api/clear-history`. | `page.tsx:134-153` | TC-054 | FAIL (BUG-001) |
| — | The client mirrors the transcript to a `chatHistory` cookie so a reload restores the view. | `page.tsx:102`, `CookieManager.ts` | TC-055, TC-056 | FAIL (BUG-002) |
| BR-005 | 30-day expiry per persona. | `Max-Age=2592000` | TC-018 | PASS |
| BR-006 | No server-side persistence. | repository-wide | TC-069 | PASS |

Non-functional: NFR-002 (cookie-only persistence, ~4 KB per cookie), NFR-001 (serverless compatible).
