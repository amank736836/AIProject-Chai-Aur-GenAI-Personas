# FEAT-012 — Behaviour

## Server classification (`chat/route.ts:163-189`)

| Condition | Result |
|---|---|
| `!message` (falsy: `""`, `undefined`, `null`, `0`) | `400 {"error":"Message required"}` |
| error text matches `rate limit` / `quota` / `TPD` / `overloaded` | `429 {"error":"All LLM providers are currently rate-limited or overloaded. Please try again in a few minutes.","rateLimit":true}` |
| anything else | `500 {"error": <raw message>}` |
| body is not valid JSON | **unhandled** `SyntaxError` in `req.json()` → framework-level `500` with an empty body (BUG-010) |
| wrong HTTP method | `405` with `allow: OPTIONS, POST` (Next.js guard) |

## Client fallbacks (`page.tsx`)

| Situation | Placeholder text |
|---|---|
| response not JSON | "Sorry, there was a problem with the response." (both persona bubbles) |
| `data.rateLimit` | rate-limit text from the server in both bubbles |
| non-OK or empty replies | `data.error` or "Sorry, something went wrong." |
| `fetch` rejects | "Network error." |

## Error paths that do **not** exist

* No request timeout/abort: a hanging provider keeps the request open (Next.js/Vercel limits apply).
* No retry/backoff beyond the Groq→Gemini switch, no circuit breaker.
* No 413 payload limit, no body-size validation (>50 KB accepted, TC-006).
* No error IDs / correlation identifiers for support (`UNKNOWN / REQUIRES VALIDATION`: whether logs are retained).
* No `error.tsx`/`not-found.tsx` in `src/app` — Next.js defaults are used.
